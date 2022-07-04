SELECT COUNT(*) AS role_count
FROM [dbo].[control_manager_details]
WHERE control_manager_email_id=@email_id
AND is_active = 'Y' 