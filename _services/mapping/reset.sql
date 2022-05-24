update mapping_table
set status_id = 1, Submitted_Homo_control = 0 where status_id != 5 and status_id != 1

truncate table transaction_details

truncate table files