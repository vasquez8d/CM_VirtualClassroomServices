CREATE TABLE tbl_notifications
(notf_id INTEGER,
notf_text VARCHAR(200),
user_id INTEGER,
notf_flg_view VARCHAR(1),
notf_redirect VARCHAR(200),
notf_icon VARCHAR(20),
est_registro INTEGER,
fec_registro TIMESTAMP,
usu_registro VARCHAR(50),
CONSTRAINT pk_tbl_notifications PRIMARY KEY (notf_id),
CONSTRAINT fk_user_notifications FOREIGN KEY (user_id) REFERENCES tbl_users(user_id));

CREATE TABLE tbl_messages
(msg_id INTEGER,
msg_text VARCHAR(200),
msg_flg_view VARCHAR(1),
user_sed INTEGER,
user_rec INTEGER,
est_registro INTEGER,
fec_registro TIMESTAMP,
usu_registro VARCHAR(50),
CONSTRAINT pk_tbl_messages PRIMARY KEY (msg_id),
CONSTRAINT fk_messages_user_sed FOREIGN KEY (user_sed) REFERENCES tbl_users (user_id),
CONSTRAINT fk_messages_user_rec FOREIGN KEY (user_rec) REFERENCES tbl_users (user_id));