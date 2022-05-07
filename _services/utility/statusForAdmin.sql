SELECT DISTINCT A.status_id, B.master_desc
from mapping_table A left join status_mapping_table B on A.status_id=B.id
WHERE A.status_id != 5