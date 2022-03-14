UPDATE [dbo].[transaction_details] SET       
[control_review_approval] = @reviewer_approval,
[control_reviewer_response_comment] = @reviewer_comment,
[last_updated_by] = @last_updated_by,
[last_updated_date] = @last_updated_date
WHERE
[transaction_id] = @transaction_id