UPDATE [dbo].[mapping_table]
SET [status_id]=@status, [last_updated_date]=@last_updated_date, [last_updated_by]=@last_updated_by
WHERE [mapping_id]=@mapping_id