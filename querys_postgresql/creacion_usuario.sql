CREATE TABLE tbl_users
(user_id INTEGER,
user_mail VARCHAR(100),
user_pw VARCHAR(100),
user_pri_nom VARCHAR(20),
user_seg_nom VARCHAR(20),
user_ape_pat VARCHAR(20),
user_ape_mat VARCHAR(20),
user_fec_nac TIMESTAMP,
user_ubigeo VARCHAR(6),
user_num_cell VARCHAR(20),
user_num_fijo VARCHAR(20),
user_ult_con TIMESTAMP,
user_desc VARCHAR(300),
rol_id INTEGER,
est_registro INTEGER,
fec_registro TIMESTAMP,
usu_registro VARCHAR(50),
CONSTRAINT pk_tbl_users PRIMARY KEY (user_id),
CONSTRAINT fk_user_rol_id FOREIGN KEY (rol_id) REFERENCES tbl_roles (rol_id));

CREATE TABLE tbl_roles
(rol_id INTEGER,
rol_name VARCHAR(50),
est_registro INTEGER,
fec_registro TIMESTAMP,
usu_registro VARCHAR(50),
CONSTRAINT pk_tbl_roles PRIMARY KEY (rol_id));

