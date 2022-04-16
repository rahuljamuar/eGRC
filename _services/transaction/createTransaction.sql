-- Insert all transaction data in Transaction table
INSERT INTO [dbo].[transaction_details]
    (
        [mapping_id],
        [country_id],
        [user_id],
        [control_id],
        [taskno],
        [response_no],
        [response_description],
        [control_owner_response_comment],
        [mgr_id],
        [response_date],
        [executing_month],
        [executing_year],
        [last_updated_by],
        [control_owner_comment_date],
        [is_deleted]
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