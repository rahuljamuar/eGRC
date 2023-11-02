const config = require('../config');
const createLogs = require('./createLogs');
const elapsedTime = require('./elapsedTime');
const fs = require('fs');
const { BlobServiceClient, BaseRequestPolicy, newPipeline, AnonymousCredential } = require("@azure/storage-blob");

const account = process.env.AZURE_STORAGE_ACCOUNT_NAME || "";
const SAS = process.env.SAS || "";


// Create a policy factory with create() method provided
class RequestIDPolicyFactory {
    // Constructor to accept parameters
    constructor(prefix) {
        this.prefix = prefix;
    }

    // create() method needs to create a new RequestIDPolicy object
    create(nextPolicy, options) {
        return new RequestIDPolicy(nextPolicy, options, this.prefix);
    }
}

// Create a policy by extending from BaseRequestPolicy
class RequestIDPolicy extends BaseRequestPolicy {
    constructor(nextPolicy, options, prefix) {
        super(nextPolicy, options);
        this.prefix = prefix;
    }

    // Customize HTTP requests and responses by overriding sendRequest
    // Parameter request is WebResource type
    async sendRequest(request) {
        // Customize client request ID header
        request.headers.set(
            "x-ms-version",
            `2021-06-08`
        );

        // response is HttpOperationResponse type
        const response = await this._nextPolicy.sendRequest(request);

        // Modify response here if needed

        return response;
    }
}

const pipeline = newPipeline(new AnonymousCredential());

// Inject customized factory into default pipeline
pipeline.factories.unshift(new RequestIDPolicyFactory("Prefix"));

const blobServiceClient = new BlobServiceClient(
    `https://${account}.blob.core.windows.net${SAS}`,
    pipeline
);

async function listContainers() {
    let i = 1;
    const containers = [];
    try {
        for await (const container of blobServiceClient.listContainers()) {
            console.log(`Container ${i++}: ${container.name}`);
            console.log(container);
            containers.push(container.name)
        }
    } catch (err) {
        console.error("err:::", err);
    }
}

async function createContainer(container_name) {

    try {
        createLogs("info", "createContainer", "FileHelper", "", "", "");
        var start = new Date();
        const containerClient = blobServiceClient.getContainerClient(container_name);
        await containerClient.create();
        elapsedTime(start, "createContainer", "FileHelper");
    } catch (error) {
        createLogs("error", "createContainer", "FileHelper", "", "", error.message);
        throw error;
    }
}

async function deleteContainer(container_name) {
    try {
        createLogs("info", "deleteContainer", "FileHelper", "", "", "");
        var start = new Date();
        const containerClient = blobServiceClient.getContainerClient(container_name);
        await containerClient.deleteIfExists();
        elapsedTime(start, "deleteContainer", "FileHelper");
    } catch (error) {
        createLogs("error", "deleteContainer", "FileHelper", "", "", error.message);
        throw error;
    }
}

async function listDirectories(container_name) {

    let result = [];
    const containerClient = blobServiceClient.getContainerClient(container_name);

    for await (const item of containerClient.listBlobsByHierarchy("/")) {
        if (item.kind === "prefix") {
            console.log(`\tBlobPrefix: ${item.name}`);
            result.push(item.name)
        } else {
            console.log(`\tBlobItem: name - ${item.name}, last modified - ${item.properties.lastModified}`);
        }
    }
    return result;
}

async function listAllFiles() {
    try {
        createLogs("info", "listAllFiles", "FileHelper", "", "", "");
        var start = new Date();
        let result = [];
        const container_name = process.env.CONTAINER;
        const containerClient = blobServiceClient.getContainerClient(container_name);
        let blobs = containerClient.listBlobsFlat();
        for await (const blob of blobs) {
            result.push(blob.name)
        }
        elapsedTime(start, "listAllFiles", "FileHelper");
        return result;
    } catch (error) {
        createLogs("error", "listAllFiles", "FileHelper", "", "", error.message);
    }

}

async function uploadFile(file_param, file_path) {

    try {
        createLogs("info", "uploadFile", "FileHelper", "", "", "");
        var start = new Date();
        const container_name = process.env.CONTAINER;
        var file_object = {};
        var size = file_param.size;
        if (size >= 1048576) {
            file_object.file_size = Math.round(size / (1024 * 1024)) + " MB";
        } else if (size > 1024 && size < 1048576) {
            file_object.file_size = Math.round(size / 1024) + " KB";
        }
        else {
            file_object.file_size = size + " Bytes";
        }
        file_object.file_name = file_param.name;
        file_object.mime_type = file_param.mimetype;

        const containerClient = blobServiceClient.getContainerClient(container_name);
        const blockBlobClient = containerClient.getBlockBlobClient(file_path + file_object.file_name);
        file_object.file_exist = await blockBlobClient.exists();
        await blockBlobClient.uploadData(file_param.data)
        elapsedTime(start, "uploadFile", "FileHelper");
        return file_object;
    } catch (error) {        
        createLogs("error", "uploadFile", "FileHelper", "", "", error);
        throw error;
    }

}


async function downloadFile(file_name, file_path, mime_type) {
    try {
        createLogs("info", "downloadFile", "FileHelper", "", "", "");
        var start = new Date();
        const container_name = process.env.CONTAINER;
        const containerClient = blobServiceClient.getContainerClient(container_name);
        const blobClient = containerClient.getBlobClient(file_path + file_name);


        const downloadBlockBlobResponse = await blobClient.download();
        var downloaded = (
            await streamToBase64(downloadBlockBlobResponse.readableStreamBody)
        );

        downloaded = "data:" + mime_type + ";base64," + downloaded;
        var file = {};
        file.file_name = file_name;
        file.content = downloaded
        elapsedTime(start, "downloadFile", "FileHelper");
        return file;
    } catch (error) {
        createLogs("error", "downloadFile", "FileHelper", "", "", error.message);
        throw error;
    }
}

async function deleteFile(file_name, file_path) {
    try {
        createLogs("info", "deleteFile", "FileHelper", "", "", "");
        var start = new Date();
        const container_name = process.env.CONTAINER;
        const containerClient = blobServiceClient.getContainerClient(container_name);
        const blobClient = containerClient.getBlobClient(file_path + file_name);
        await blobClient.deleteIfExists();
        elapsedTime(start, "deleteFile", "FileHelper");
        throw error;

    } catch (error) {
        createLogs("error", "deleteFile", "FileHelper", "", "", error.message);
    }
}

async function streamToBase64(readableStream) {
    return new Promise((resolve, reject) => {
        const chunks = [];
        readableStream.on("data", (data) => {
            chunks.push(data instanceof Buffer ? data : Buffer.from(data));
        });
        readableStream.on("end", () => {
            var result = Buffer.concat(chunks);
            resolve(result.toString('base64'));
        });
        readableStream.on("error", reject);
    });
}

async function upload_local(temp_file, file_name, dir_path, email) {
    //Storing the file temporarily on TMS Server 

    // await fs.promises.mkdir(dir_path, { recursive: true });

    fs.mkdir(dir_path, { recursive: true }, (err) => {
        if (err) {
            createLogs("error", "upload_local", "FileHelper", "", "", err);
            return console.error(err);
        }
        createLogs("info", "upload_local", "FileHelper", "Directory created successfully!", "", "");
    });

    return new Promise((resolve, reject) => {
        temp_file.mv(dir_path + '/' + file_name, async function (err) {
            if (err)
                return res.status(500).send(err);

            createLogs("info", "upload_local", "FileHelper", email, "File uploaded into user folder. Requested by " + email, "");
            resolve("Uploaded")
        });
    });

}

async function delete_local(file_name, dir_path, email) {    

    fs.unlink(dir_path + '/' + file_name, async function (err) {
        if (err) return console.log(err);
        createLogs("info", "delete_local", "FileHelper", email, "File deleted from user folder. Requested by " + email, "");        
    });

    /** below code to test on windows */
    // fs.rmdirSync(dir_path, { recursive: true }, async function (err) {
    //     if (err) return console.log(err);
    //     logger.info("File deleted from user folder. Requested by " + user_id);
    // });
}

module.exports = {
    listContainers,
    createContainer,
    deleteContainer,
    listDirectories,
    listAllFiles,
    uploadFile,
    downloadFile,
    deleteFile,
    upload_local,
    delete_local
}