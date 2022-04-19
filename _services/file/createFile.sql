INSERT INTO [dbo].[files]
    (
        [mapping_id],
        [file_name],
        [file_path],
        [mime_type],
        [uploaded_on],
        [uploaded_by]
    )
VALUES 
    (
        @mapping_id,
        @file_name,
        @file_path,
        @mime_type,
        @uploaded_on,
        @uploaded_by
    )