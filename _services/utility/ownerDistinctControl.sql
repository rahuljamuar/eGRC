SELECT DISTINCT control
FROM [dbo].[mapping_table]
WHERE [user_id]=@user_id
AND [status_id] != 1 AND [status_id] != 5