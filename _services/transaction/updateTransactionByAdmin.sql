UPDATE [dbo].[transaction_details] SET       
[master_approval] = @admin_approval,
[final_approval] = @admin_approval,
[compliant_status] = @compliant_status,
[last_updated_by] = @last_updated_by,
[last_updated_date] = @last_updated_date
WHERE
[transaction_id] = @transaction_id