INSERT INTO [dbo].[country_details]
    (
        [country_id],
        [country_name],
        [bu],
        [mco],
        [cluster],
        [active]
    )
VALUES 
    (
        @country_id,
        @country_name,
        @bu,
        @mco,
        @cluster,
        @active
    )