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
A.Indentify_Homo, 
B.control_manager,
B.control_manager_email_id,
A.country_id, 
D.country_name,
A.control_id, 
A.control,
C.control_name,
C.control_description,
C.control_frequency,
C.Performance_locations,
E.control_reviewer_desc AS status
from mapping_table A left join control_manager_details B on A.mgr_id=B.mgr_id
left join control_details C on C.control_id=A.control_id and C.control=A.control
left join country_details D on D.country_id=A.country_id
left join status_mapping_table E on E.id=A.status_id
where executing_Month=@execution_month
and executing_year=@execution_year
and A.mgr_id=@mgr_id
and A.status_id != 1
and A.status_id != 5
and A.freezed=@freezed
and B.is_active='Y'
and C.is_active='Y'
and D.active='Y'