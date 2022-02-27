-- Get all mapping where user_id = ?, execution_month = ?, execution_year = ?, status= Active
-- Get Control details
-- Get Country details

-- Get questions from the Set for selected mapping
-- Get attachments for selected mapping

select distinct 
A.mapping_id,
A.User_id,
A.SetNo,
A.status,
A.executing_month,
A.executing_year, 
B.Control_Owner,
B.Control_Owner_email,
A.Country_id, 
D.Country_name,
A.Control_id, 
A.Control,
C.Control_name,
C.Control_Description,
C.Control_Frequency
from mapping_table A left join User_Details B on A.User_id=B.User_id
left join Control_Details C on C.Control_id=A.Control_id and C.Control=A.Control
left join country_details D on D.country_id=A.country_id
where executing_Month=@execution_month
and executing_year=@execution_year
and A.user_id=@user_id
and A.status=@status
and A.Freezed=@freezed
and B.Is_Active='Y'
and C.Is_Active='Y'
and D.Active='Y'