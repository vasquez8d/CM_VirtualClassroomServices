CREATE TABLE tbl_cat_course
(cat_cor_id INTEGER,
cat_cor_name VARCHAR(100),
est_registro INTEGER,
fec_registro TIMESTAMP,
usu_registro VARCHAR(50),
CONSTRAINT pk_tbl_cat_course PRIMARY KEY (cat_cor_id));

CREATE TABLE tbl_course
(cor_id INTEGER,
cor_name VARCHAR(100),
cor_des VARCHAR(200),
cor_fec_ini TIMESTAMP,
cor_fec_fin TIMESTAMP,
cor_price DECIMAL(10,2),
cor_state VARCHAR(10),
user_reg_id INTEGER,
user_doc_id INTEGER,
cat_cor_id INTEGER,
est_registro INTEGER,
fec_registro TIMESTAMP,
usu_registro VARCHAR(50),
CONSTRAINT pk_tbl_course PRIMARY KEY (cor_id),
CONSTRAINT fk_course_cat_cor_id FOREIGN KEY (cat_cor_id) REFERENCES tbl_cat_course(cat_cor_id),
CONSTRAINT fk_cor_user_doc_id FOREIGN KEY (user_doc_id) REFERENCES tbl_users (user_id),
CONSTRAINT fk_cor_user_reg_id FOREIGN KEY (user_reg_id) REFERENCES tbl_users (user_id));

CREATE TABLE tbl_mat_course
(mat_id INTEGER,
cor_id INTEGER,
user_alu_id INTEGER,
user_reg_id INTEGER,
mat_state VARCHAR(10),
est_registro INTEGER,
fec_registro TIMESTAMP,
usu_registro VARCHAR(50),
CONSTRAINT pk_tbl_mat_course PRIMARY KEY (mat_id),
CONSTRAINT fk_tbl_mat_course FOREIGN KEY (cor_id) REFERENCES tbl_course (cor_id),
CONSTRAINT fk_tbl_mat_user_reg FOREIGN KEY (user_reg_id) REFERENCES tbl_users (user_id),
CONSTRAINT fk_tbl_mat_user_alu FOREIGN KEY (user_alu_id) REFERENCES tbl_users(user_id));

CREATE TABLE tbl_parameters
(cod_tbl INTEGER,
cod_element INTEGER,
cod_parameter VARCHAR(10),
des_parameter VARCHAR(100),
val_parameter DECIMAL(10,2),
est_registro INTEGER,
fec_registro TIMESTAMP,
usu_registro VARCHAR(50),
CONSTRAINT pk_tbl_parameters PRIMARY KEY (cod_tbl));