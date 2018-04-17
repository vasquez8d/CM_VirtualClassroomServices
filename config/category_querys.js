module.exports.category_querys = {
    list_query: "select ct.cat_cor_id, ct.cat_cor_name, count(tc.cor_id) num_cursos, ct.fec_registro, ct.est_registro from tbl_cat_course ct left join tbl_course tc on ct.cat_cor_id = tc.cat_cor_id group by ct.cat_cor_id, ct.cat_cor_name, ct.fec_registro, ct.est_registro",
    details_query: "select ct.cat_cor_id, ct.cat_color, ct.cat_cor_name, ct.cat_cor_desc, ct.usu_registro, count(tc.cor_id) num_cursos, ct.fec_registro, ct.est_registro from tbl_cat_course ct left join tbl_course tc on ct.cat_cor_id = tc.cat_cor_id where ct.cat_cor_id = ? group by ct.cat_cor_id, ct.cat_cor_name, ct.fec_registro, ct.est_registro, ct.cat_cor_desc, ct.usu_registro, ct.cat_color",
};
