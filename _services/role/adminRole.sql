SELECT COUNT(*) AS role_count
FROM [dbo].[master_details]
WHERE master_email_id=@email_id 