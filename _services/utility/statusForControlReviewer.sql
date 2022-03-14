SELECT DISTINCT A.status_id, B.control_reviewer_desc
from mapping_table A left join status_mapping_table B on A.status_id=B.id
WHERE A.mgr_id=@mgr_id AND A.status_id != 5 AND A.status_id != 1  