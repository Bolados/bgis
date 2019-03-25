INSERT INTO public.country(
	id, version, created_at, updated_at, shape, code2, code3, density,
	domain, name, phone_code, population, variant, region)
	VALUES (nextval('country_id_seq'),
			0, current_timestamp, current_timestamp,
			(select ST_GeomFromText(ST_AsText((select geom from "BEN_adm0" where id = 1)),4326)),
			'BJ', 'BEN', NULL, 'bj', 'Benin', 229, NULL, 'Danxome', 1);
