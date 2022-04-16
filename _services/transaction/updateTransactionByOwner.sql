UPDATE [dbo].[transaction_details] SET       
[response_description] = @response_description,
[control_owner_response_comment] = @control_owner_response_comment,
[last_updated_by] = @last_updated_by,
[control_owner_comment_date] = @last_updated_date
WHERE
[transaction_id] = @transaction_id