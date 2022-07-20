SELECT DISTINCT control
FROM [dbo].[mapping_table]
WHERE [mgr_id]=@mgr_id
AND [status_id] != 5