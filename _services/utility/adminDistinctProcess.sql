SELECT DISTINCT B.process
from mapping_table A left join control_details B on A.control_id=B.control_id
WHERE A.status_id != 5