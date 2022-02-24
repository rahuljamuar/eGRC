-- Insert all transaction data in Transaction table
INSERT INTO [dbo].[Transaction_Details]
    (
        [Mapping_ID],
        [Country_id],
        [User_id],
        [Control_id],
        [TaskNo],
        [Response_No],
        [Response_Description],
        [Control_Owner_Response_Comment],
        [Mgr_id],
        [Response_Date],
        [Executing_Month],
        [Executing_Year],
        [Last_updated_by],
        [Last_updated_date],
        [Is_Deleted]
    )
VALUES 
    (
        @mapping_id,
        @country_id,
        @user_id,
        @control_id,
        @task_no,
        @response_no,
        @response_description,
        @control_owner_response_comment,
        @mgr_id,
        @response_date,
        @executing_month,
        @executing_year,
        @last_updated_by,
        @last_updated_date,
        @is_deleted
    )

SELECT SCOPE_IDENTITY() AS Transaction_Id
