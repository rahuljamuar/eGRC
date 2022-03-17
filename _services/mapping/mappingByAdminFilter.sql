-- Call stored procedure adminFilter

-- CREATE PROCEDURE adminFilter
-- @executing_month NVARCHAR(MAX),
-- @executing_year INT,
-- @country_id INT,
-- @control NVARCHAR(MAX),
-- @process NVARCHAR(MAX),
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
-- A.country_id, 
-- D.country_name,
-- A.control_id, 
-- A.control,
-- C.control_name,
-- C.control_description,
-- C.control_frequency,
-- C.Performance_locations,
-- E.master_desc AS status
-- from mapping_table A 
-- left join control_details C on C.control_id=A.control_id and C.control=A.control
-- left join country_details D on D.country_id=A.country_id
-- left join status_mapping_table E on E.id=A.status_id
-- where
-- (@executing_Month = '' OR @executing_Month = A.executing_Month)
-- and (@executing_year = 0 OR @executing_year = A.executing_year)
-- and (@country_id = 0 OR @country_id = A.country_id)
-- and (@control = '' OR @control = A.control)
-- and (@process = '' OR @process = A.process)
-- and (@status_id = 0 OR @status_id = A.status_id)
-- and A.freezed=@freezed
-- and C.is_active='Y'
-- and D.active='Y'
-- END


exec adminFilter @executing_month, @executing_year, @country_id, @control, @process, @status, @freezed