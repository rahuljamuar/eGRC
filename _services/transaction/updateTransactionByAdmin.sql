UPDATE [dbo].[transaction_details] SET       
[master_approval] = @admin_approval,
[final_approval] = @admin_approval,
[compliant_status] = @compliant_status,
[last_updated_by] = @last_updated_by,
[master_comment_date] = @last_updated_date,
[master_response_comment] = @admin_comment
[admin_compliance_comment] = @admin_compliance_comment
WHERE
[transaction_id] = @transaction_id