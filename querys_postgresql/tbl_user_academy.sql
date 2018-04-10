CREATE TABLE tbl_user_academy
(user_id INTEGER,
user_pri_esp VARCHAR(150),
user_seg_esp VARCHAR(150),
user_pri_uni VARCHAR(150),
user_seg_uni VARCHAR(150),
user_flg_qto_sup VARCHAR(1),
est_registro INTEGER,
fec_registro TIMESTAMP,
usu_registro VARCHAR(100),
CONSTRAINT tlb_user_academy_pk PRIMARY KEY (user_id));