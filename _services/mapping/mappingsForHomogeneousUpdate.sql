SELECT mapping_id
FROM [dbo].[mapping_table]
WHERE [executing_month]=@executing_month AND [executing_year]=@executing_year AND [user_id]=@user_id AND [Indentify_Homo]=@identify_homo