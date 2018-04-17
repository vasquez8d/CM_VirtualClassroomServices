create table tbl_class
(class_id integer,
class_tittle varchar(100),
class_desc varchar(200),
class_video_embed varchar(300),
cor_id integer,
est_registro integer,
fec_registro timestamp,
usu_registro varchar(50),
constraint tbl_class_pk primary key (class_id),
constraint cor_id_fk foreign key (cor_id) references tbl_course(cor_id));

create table tbl_comment
(com_id integer,
com_text varchar(300),
com_likes integer,
com_user_id integer,
class_id integer,
est_registro integer,
fec_registro timestamp,
usu_registro varchar(50),
constraint tbl_comment_pk primary key (com_id),
constraint class_id_fk foreign key (class_id) references tbl_class(class_id));

create table tbl_response_comment
(res_id integer,
res_text varchar(300),
res_likes integer,
res_user_id integer,
com_id integer,
est_registro integer,
fec_registro timestamp,
usu_registro varchar(50),
constraint tbl_response_comment_pk primary key (res_id),
constraint com_id_fk foreign key (com_id) references tbl_comment(com_id));

create sequence tbl_class_seq start with 1 increment by 1;
create sequence tbl_comment_seq start with 1 increment by 1;
create sequence tbl_response_comment_seq start with 1 increment by 1;