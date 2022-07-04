SELECT COUNT(*) AS role_count
FROM [dbo].[user_details] 
WHERE control_owner_email=@email_id
AND is_active = 'Y' 