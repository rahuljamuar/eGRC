-- Get all mapping where user_id = ?, execution_month = current_month, execution_year = current_year, status= Active
-- Get questions from the Set
-- Get Control details
-- Get Country details

SELECT *
FROM [dbo].[control_details]
WHERE [control_id]=@control_id