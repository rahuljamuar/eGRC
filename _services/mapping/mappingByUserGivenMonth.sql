-- Get all mapping where user_id = ?, execution_month = ?, execution_year = ?, status= Active
-- Get Control details
-- Get Country details

-- Get questions from the Set for selected mapping
-- Get attachments for selected mapping

SELECT *
FROM [dbo].[Mapping_Table]
WHERE [User_id]=@user_id AND
[Executing_Month]=@execution_month AND
[Executing_Year]=@execution_year AND
[Status]=@status AND
[Is_Active]=@is_active