-- Call stored procedure ownerFilter

-- CREATE PROCEDURE ownerFilter
-- @user_id NVARCHAR(MAX),
-- @executing_month NVARCHAR(MAX),
-- @executing_year INT,
-- @country_id INT,
-- @control NVARCHAR(MAX),
-- @status_id INT,
-- @freezed NVARCHAR(MAX)
-- AS
-- BEGIN

-- select distinct 
-- A.mapping_id,
-- A.user_id,
-- A.set_no,
-- A.status_id,
-- A.mgr_id,
-- A.executing_month,
-- A.executing_year, 
-- B.control_owner,
-- B.control_owner_email,
-- A.country_id, 
-- D.country_name,
-- A.control_id, 
-- A.control,
-- C.control_name,
-- C.control_description,
-- C.control_frequency
-- from mapping_table A left join user_details B on A.user_id=B.user_id
-- left join control_details C on C.control_id=A.control_id and C.control=A.control
-- left join country_details D on D.country_id=A.country_id
-- where
-- A.user_id=@user_id
-- and executing_Month=@executing_month
-- and executing_year=@executing_year
-- and (@country_id = 0 OR @country_id = A.country_id)
-- and (@control = '' OR @control = A.control)
-- and (@status_id = 0 OR @status_id = A.status_id)
-- and A.freezed=@freezed
-- and B.is_active='Y'
-- and C.is_active='Y'
-- and D.active='Y'

-- END
-- GO


exec ownerFilter @user_id, @executing_month, @executing_year, @country_id, @control, @status, @freezed