-- Get all mapping where user_id = ?, execution_month = ?, execution_year = ?, status= ?, country = ?, control= ?
-- Get Control details
-- Get Country details

-- Get Transaction details for selected mapping
-- Get attachments for selected mapping
-- Get questions from the Set

select distinct 
A.mapping_id,
A.user_id,
A.set_no,
A.status_id,
A.executing_month,
A.executing_year, 
B.control_owner,
B.control_owner_email,
A.country_id, 
D.country_name,
A.control_id, 
A.control,
C.control_name,
C.control_description,
C.control_frequency
from mapping_table A left join user_details B on A.user_id=B.user_id
left join control_details C on C.control_id=A.control_id and C.control=A.control
left join country_details D on D.country_id=A.country_id
where executing_Month=@executing_month
and executing_year=@executing_year
and A.user_id=@user_id
and A.status_id=@status
and A.freezed=@freezed
and A.control=@control
and A.country_id=@country_id
and B.is_active='Y'
and C.is_active='Y'
and D.active='Y'