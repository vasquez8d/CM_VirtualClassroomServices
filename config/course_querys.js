module.exports.course_querys = {
    list_query: "select co.cor_id, co.cor_name, count(c3.mat_id) num_alumnos, c2.cat_cor_name, (u.user_pri_nom || ' ' || u.user_ape_pat) user_full_name, co.fec_registro, co.est_registro from tbl_course co inner join tbl_users u on co.user_doc_id = u.user_id inner join tbl_cat_course c2 on co.cat_cor_id = c2.cat_cor_id left join tbl_mat_course c3 on co.cor_id = c3.cor_id group by co.cor_id, co.cor_name, c2.cat_cor_name, u.user_pri_nom, u.user_ape_pat, co.fec_registro, co.est_registro",
    details_query: "select co.cor_id, co.cor_name, co.cor_des, co.cor_price, count(c3.mat_id) num_alumnos, c2.cat_cor_name, (u.user_pri_nom || ' ' || u.user_ape_pat) user_doc_name, co.user_doc_id, co.user_reg_id , (u2.user_pri_nom || ' ' || u2.user_ape_pat) user_reg_name, co.fec_registro, co.est_registro from tbl_course co inner join tbl_users u on co.user_doc_id = u.user_id inner join tbl_users u2 on u2.user_id = co.user_reg_id inner join tbl_cat_course c2 on co.cat_cor_id = c2.cat_cor_id left join tbl_mat_course c3 on co.cor_id = c3.cor_id where co.cor_id = ? group by co.cor_id, co.cor_name, c2.cat_cor_name, u.user_pri_nom, u.user_ape_pat, co.est_registro,co.cor_des, co.cor_price, u2.user_pri_nom , u2.user_ape_pat, co.user_doc_id, co.user_reg_id",
};