-- Get all mapping where user_id = ?, execution_month = ?, execution_year = ?, status= Active
-- Get Control details
-- Get Country details

-- Get questions from the Set for selected mapping
-- Get attachments for selected mapping

select distinct 
A.mapping_id,
A.user_id,
A.set_no,
A.status_id,
A.mgr_id,
A.executing_month,
A.executing_year, 
B.control_owner,
B.control_owner_email,
A.country_id, 
D.country_name,
A.control_id, 
A.control,
A.Indentify_Homo,
C.control_name,
C.control_description,
C.control_frequency,
C.Performance_locations,
E.control_owner_desc AS status
from mapping_table A left join user_details B on A.user_id=B.user_id
left join control_details C on C.control_id=A.control_id and C.control=A.control
left join country_details D on D.country_id=A.country_id
left join status_mapping_table E on E.id=A.status_id
where executing_Month=@execution_month
and executing_year=@execution_year
and A.user_id=@user_id
and A.status_id=@status
and A.freezed=@freezed
and B.is_active='Y'
and C.is_active='Y'
and D.active='Y'