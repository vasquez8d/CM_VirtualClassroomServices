module.exports.querys = {
    //Course
    course_list_query: "select co.cor_id, co.cor_name, count(c3.mat_id) num_alumnos, c2.cat_cor_name, (u.user_pri_nom || ' ' || u.user_ape_pat) user_full_name, co.fec_registro, co.est_registro from tbl_course co inner join tbl_users u on co.user_doc_id = u.user_id inner join tbl_cat_course c2 on co.cat_cor_id = c2.cat_cor_id left join tbl_mat_course c3 on co.cor_id = c3.cor_id group by co.cor_id, co.cor_name, c2.cat_cor_name, u.user_pri_nom, u.user_ape_pat, co.fec_registro, co.est_registro",
    course_details_query: "select co.cor_id, co.cor_name, co.cor_des, co.cor_price, count(c3.mat_id) num_alumnos, c2.cat_cor_name, (u.user_pri_nom || ' ' || u.user_ape_pat) user_doc_name, co.user_doc_id, co.user_reg_id , (u2.user_pri_nom || ' ' || u2.user_ape_pat) user_reg_name, co.fec_registro, co.est_registro from tbl_course co inner join tbl_users u on co.user_doc_id = u.user_id inner join tbl_users u2 on u2.user_id = co.user_reg_id inner join tbl_cat_course c2 on co.cat_cor_id = c2.cat_cor_id left join tbl_mat_course c3 on co.cor_id = c3.cor_id where co.cor_id = ? group by co.cor_id, co.cor_name, c2.cat_cor_name, u.user_pri_nom, u.user_ape_pat, co.est_registro,co.cor_des, co.cor_price, u2.user_pri_nom , u2.user_ape_pat, co.user_doc_id, co.user_reg_id",
    crouse_list_x_user_query: "select co.cor_id, co.cor_name, co.cor_time, count(c3.mat_id) num_alumnos, c2.cat_cor_name, c2.cat_cor_id, c2.cat_color , (u.user_pri_nom || ' ' || u.user_ape_pat) user_full_name, co.fec_registro, co.est_registro from tbl_course co inner join tbl_users u on co.user_doc_id = u.user_id inner join tbl_cat_course c2 on co.cat_cor_id = c2.cat_cor_id left join tbl_mat_course c3 on co.cor_id = c3.cor_id where c3.user_alu_id = ? group by co.cor_id, co.cor_name, c2.cat_cor_name, u.user_pri_nom, u.user_ape_pat, co.fec_registro, co.est_registro, c2.cat_cor_id, co.cor_time, c2.cat_color",
    course_list_dashboard: "select co.cor_id, co.cor_name, co.cor_time, co.cor_price, co.cor_intro, co.cor_slug, count(c3.mat_id) num_alumnos, c2.cat_cor_name, c2.cat_cor_id, c2.cat_color , (u.user_pri_nom || ' ' || u.user_ape_pat) user_full_name, co.fec_registro, co.est_registro from tbl_course co inner join tbl_users u on co.user_doc_id = u.user_id inner join tbl_cat_course c2 on co.cat_cor_id = c2.cat_cor_id left join tbl_mat_course c3 on co.cor_id = c3.cor_id where co.est_registro = 1 and co.cor_price > 0 group by co.cor_id, co.cor_name, c2.cat_cor_name, u.user_pri_nom, u.user_ape_pat, co.fec_registro, co.est_registro, c2.cat_cor_id, co.cor_time, c2.cat_color,co.cor_intro, co.cor_slug, co.cor_price",
    course_list_dashboard_free: "select co.cor_id, co.cor_name, co.cor_time, co.cor_price, co.cor_intro, co.cor_slug, count(c3.mat_id) num_alumnos, c2.cat_cor_name, c2.cat_cor_id, c2.cat_color , (u.user_pri_nom || ' ' || u.user_ape_pat) user_full_name, co.fec_registro, co.est_registro from tbl_course co inner join tbl_users u on co.user_doc_id = u.user_id inner join tbl_cat_course c2 on co.cat_cor_id = c2.cat_cor_id left join tbl_mat_course c3 on co.cor_id = c3.cor_id where co.est_registro = 1 and co.cor_price = 0 group by co.cor_id, co.cor_name, c2.cat_cor_name, u.user_pri_nom, u.user_ape_pat, co.fec_registro, co.est_registro, c2.cat_cor_id, co.cor_time, c2.cat_color,co.cor_intro, co.cor_slug, co.cor_price",
    //Category
    category_list_query: "select ct.cat_cor_id, ct.cat_cor_name, count(tc.cor_id) num_cursos, ct.fec_registro, ct.est_registro from tbl_cat_course ct left join tbl_course tc on ct.cat_cor_id = tc.cat_cor_id group by ct.cat_cor_id, ct.cat_cor_name, ct.fec_registro, ct.est_registro",
    category_details_query: "select ct.cat_cor_id, ct.cat_color, ct.cat_cor_name, ct.cat_cor_desc, ct.usu_registro, count(tc.cor_id) num_cursos, ct.fec_registro, ct.est_registro from tbl_cat_course ct left join tbl_course tc on ct.cat_cor_id = tc.cat_cor_id where ct.cat_cor_id = ? group by ct.cat_cor_id, ct.cat_cor_name, ct.fec_registro, ct.est_registro, ct.cat_cor_desc, ct.usu_registro, ct.cat_color",
    //Class
    class_list_query : "SELECT cl.class_id, cl.class_tittle, cl.class_desc, cl.class_time, cl.fec_registro, cl.est_registro, tc.cor_name FROM tbl_class cl inner join tbl_course tc on cl.cor_id = tc.cor_id where cl.cor_id = ?",
    class_details_query: "SELECT cl.class_id, cl.class_tittle, cl.class_desc, cl.class_time, cl.fec_registro, cl.est_registro, cl.class_video_embed, tc.cor_name, (u.user_pri_nom || ' ' || u.user_ape_pat) user_reg_name, count(com.com_id) FROM tbl_class cl left join tbl_comment com on cl.class_id = com.class_id inner join tbl_course tc on cl.cor_id = tc.cor_id inner join tbl_users u ON cl.usu_reg_id = u.user_id where cl.class_id = ? group by cl.class_id, cl.class_tittle, cl.class_desc, cl.class_time, cl.fec_registro, cl.est_registro, cl.class_video_embed, tc.cor_name, u.user_pri_nom , u.user_ape_pat"
};