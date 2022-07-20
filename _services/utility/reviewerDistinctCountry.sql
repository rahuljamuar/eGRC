SELECT DISTINCT A.country_id, B.country_name
from mapping_table A left join country_details B on A.country_id=B.country_id
WHERE A.mgr_id=@mgr_id
AND A.status_id != 5