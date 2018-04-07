
CREATE TABLE tbl_validate_mail
(val_id INTEGER,
 val_code VARCHAR(20),
 val_status VARCHAR(1),
 val_email VARCHAR(100),
 est_registro INTEGER,
 fec_registro TIMESTAMP,
 usu_registro VARCHAR(50),
 CONSTRAINT pk_tbl_validate_mail PRIMARY KEY (val_id)
);

SELECT * FROM tbl_validate_mail;

CREATE SEQUENCE tbl_validate_mail_seq INCREMENT BY 1 START WITH 1;
--nextval('tbl_validate_mail_seq'::regclass)
DROP TABLE tbl_validate_mail;