const config = require('../config');
const createLogs = require('./createLogs');
const elapsedTime = require('./elapsedTime');
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

    let requestId = ''
    try {
        const containerClient = blobServiceClient.getContainerClient(container_name);
        const createContainerResponse = await containerClient.create();
        console.log(`Create container ${container_name} successfully`, createContainerResponse.requestId);
        requestId = createContainerResponse.requestId;
    } catch (err) {
        console.error("err:::", err);
    }
    return requestId;
}

async function deleteContainer(container_name) {

    let requestId = ''
    try {
        const containerClient = blobServiceClient.getContainerClient(container_name);
        const createContainerResponse = await containerClient.deleteIfExists();
        console.log(`Delete container ${container_name} successfully`, createContainerResponse.requestId);
        requestId = createContainerResponse.requestId;
    } catch (err) {
        console.error("err:::", err);
    }
    return requestId;
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
        // console.log(file_param.mimetype)
        file_object.file_name = file_param.name;
        file_object.mime_type = file_param.mimetype;
        const containerClient = blobServiceClient.getContainerClient(container_name);
        const blockBlobClient = containerClient.getBlockBlobClient(file_path + file_object.file_name);
        await blockBlobClient.uploadData(file_param.data)
        elapsedTime(start, "uploadFile", "FileHelper");
        return file_object;
    } catch (error) {
        createLogs("error", "uploadFile", "FileHelper", "", "", error.message);
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

module.exports = {
    listContainers,
    createContainer,
    deleteContainer,
    listDirectories,
    listAllFiles,
    uploadFile,
    downloadFile,
    deleteFile
}