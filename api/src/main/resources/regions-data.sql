-- Table --
-- CREATE TABLE "region" (
--   `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
--   `name` char(49) CHARACTER SET utf8 DEFAULT NULL,
--   `code` char(3) CHARACTER SET utf8 DEFAULT NULL,
--   `orientation` char(5) CHARACTER SET utf8 DEFAULT NULL,
--   PRIMARY KEY (`id`)
-- ) ENGINE=InnoDB  DEFAULT CHARSET=utf8 COLLATE=utf8_bin AUTO_INCREMENT=136 ;

-- Languages --
INSERT INTO "region" (id, version, created_at, updated_at, code, name)
VALUES (1, 0, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 'AF', 'Africa');
INSERT INTO "region" (id, version, created_at, updated_at, code, name)
VALUES (2, 0, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 'EU', 'Europe');
INSERT INTO "region" (id, version, created_at, updated_at, code, name)
VALUES (3, 0, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 'NA', 'North America');
INSERT INTO "region" (id, version, created_at, updated_at, code, name)
VALUES (4, 0, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 'OC', 'Oceanic');
INSERT INTO "region" (id, version, created_at, updated_at, code, name)
VALUES (5, 0, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 'SA', 'South America');
