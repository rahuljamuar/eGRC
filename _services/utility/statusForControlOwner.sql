SELECT DISTINCT A.status_id, B.control_owner_desc
from mapping_table A left join status_mapping_table B on A.status_id=B.id
WHERE A.user_id=@user_id AND A.status_id != 5 AND A.status_id != 1  