create table tbl_data_questions_cab
(data_id INTEGER,
cat_cor_id integer,
data_file_name varchar(200),
data_rows integer,
est_registro integer,
usu_registro varchar(100),
fec_registro timestamp,
constraint tbl_data_questions_cab_pk primary key (data_id));

create table tbl_data_questions_det
(ques_id integer,
data_id integer,
ques_name varchar(150),
cat_cor_id integer,
ques_question varchar(300),
ques_res1 varchar(300),
ques_res2 varchar(300),
ques_res3 varchar(300),
ques_res4 varchar(300),
ques_res5 varchar(300),
ques_ok integer,
est_registro integer,
usu_registro varchar(100),
fec_reistro timestamp,
constraint tbl_data_questions_det_pk primary key (ques_id));
