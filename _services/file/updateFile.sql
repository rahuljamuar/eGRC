UPDATE [dbo].[files]
SET [updated_on] = @updated_on, [updated_by] = @updated_by
WHERE [mapping_id] = @mapping_id AND [file_name] = @file_name AND [file_path] = @file_path