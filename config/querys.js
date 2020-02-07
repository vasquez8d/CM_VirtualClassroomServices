module.exports.querys = {
    //Course
    course_list_query: "select co.cor_id, co.cor_name, count(c3.mat_id) num_alumnos, c2.cat_cor_name, (u.user_pri_nom || ' ' || u.user_ape_pat) user_full_name, co.fec_registro, co.est_registro from tbl_course co inner join tbl_users u on co.user_doc_id = u.user_id inner join tbl_cat_course c2 on co.cat_cor_id = c2.cat_cor_id left join tbl_mat_course c3 on co.cor_id = c3.cor_id group by co.cor_id, co.cor_name, c2.cat_cor_name, u.user_pri_nom, u.user_ape_pat, co.fec_registro, co.est_registro order by co.fec_registro desc",
    course_details_query: "select co.cor_photo, co.cor_id, co.cor_name, co.cor_des, co.cor_price, count(c3.mat_id) num_alumnos, c2.cat_cor_name, (u.user_pri_nom || ' ' || u.user_ape_pat) user_doc_name, co.user_doc_id, co.user_reg_id , (u2.user_pri_nom || ' ' || u2.user_ape_pat) user_reg_name, co.fec_registro, co.est_registro from tbl_course co inner join tbl_users u on co.user_doc_id = u.user_id inner join tbl_users u2 on u2.user_id = co.user_reg_id inner join tbl_cat_course c2 on co.cat_cor_id = c2.cat_cor_id left join tbl_mat_course c3 on co.cor_id = c3.cor_id where co.cor_id = ? group by co.cor_id, co.cor_name, c2.cat_cor_name, u.user_pri_nom, u.user_ape_pat, co.est_registro,co.cor_des, co.cor_price, u2.user_pri_nom , u2.user_ape_pat, co.user_doc_id, co.user_reg_id",
    crouse_list_x_user_query: "select c3.mat_state ,co.cor_slug ,co.cor_id, co.cor_name, co.cor_time, count(c3.mat_id) num_alumnos, c2.cat_cor_name, c2.cat_cor_id, c2.cat_color , (u.user_pri_nom || ' ' || u.user_ape_pat) user_full_name, co.fec_registro, co.est_registro from tbl_course co inner join tbl_users u on co.user_doc_id = u.user_id inner join tbl_cat_course c2 on co.cat_cor_id = c2.cat_cor_id left join tbl_mat_course c3 on co.cor_id = c3.cor_id where c3.user_alu_id = ? group by co.cor_id, co.cor_name, c2.cat_cor_name, u.user_pri_nom, u.user_ape_pat, co.fec_registro, co.est_registro, c2.cat_cor_id, co.cor_time, c2.cat_color, co.cor_slug, c3.mat_state, c3.fec_registro order by c3.fec_registro desc",
    course_list_dashboard: "select tcl.class_video_type, co.cor_photo, co.cor_id, co.cor_name, co.cor_time, co.cor_price, co.cor_intro, co.cor_slug, count(tcl.class_id) num_clases, c2.cat_cor_name, c2.cat_cor_id, c2.cat_color , (u.user_pri_nom || ' ' || u.user_ape_pat) user_full_name, co.fec_registro, co.est_registro from tbl_course co inner join tbl_users u on co.user_doc_id = u.user_id inner join tbl_cat_course c2 on co.cat_cor_id = c2.cat_cor_id left join tbl_mat_course c3 on co.cor_id = c3.cor_id inner join tbl_class tcl on co.cor_id = tcl.cor_id  where co.est_registro = 1 and co.cor_price > 0 group by co.cor_id, co.cor_name, c2.cat_cor_name, u.user_pri_nom, u.user_ape_pat, co.fec_registro, co.est_registro, c2.cat_cor_id, co.cor_time, c2.cat_color,co.cor_intro, co.cor_slug, co.cor_price, co.cor_photo order by co.fec_registro desc",
    course_list_dashboard_free: "select tcl.class_video_type, co.cor_photo, co.cor_id, co.cor_name, co.cor_time, co.cor_price, co.cor_intro, co.cor_slug, count(tcl.class_id) num_clases, c2.cat_cor_name, c2.cat_cor_id, c2.cat_color , (u.user_pri_nom || ' ' || u.user_ape_pat) user_full_name, co.fec_registro, co.est_registro from tbl_course co inner join tbl_users u on co.user_doc_id = u.user_id inner join tbl_cat_course c2 on co.cat_cor_id = c2.cat_cor_id left join tbl_mat_course c3 on co.cor_id = c3.cor_id inner join tbl_class tcl on co.cor_id = tcl.cor_id  where co.est_registro = 1 and co.cor_price = 0 group by co.cor_id, co.cor_name, c2.cat_cor_name, u.user_pri_nom, u.user_ape_pat, co.fec_registro, co.est_registro, c2.cat_cor_id, co.cor_time, c2.cat_color,co.cor_intro, co.cor_slug, co.cor_price, co.cor_photo order by co.fec_registro desc",
    crouse_list_users_x_course: "select tc.cor_name, tc.cor_id, u.user_id, (u.user_pri_nom || ' ' || u.user_ape_pat) user_full_name, c2.fec_registro, (u.user_dpt || '/' || u.user_prv || '/' || u.user_dst) user_ubigeo, u.user_reg_provider_photo from tbl_course tc inner join tbl_mat_course c2 ON tc.cor_id = c2.cor_id inner join tbl_users u ON c2.user_alu_id = u.user_id where tc.cor_id = ? order by c2.fec_registro desc",
    //Category
    category_list_query: "select ct.cat_cor_id, ct.cat_cor_name, count(tc.cor_id) num_cursos, ct.fec_registro, ct.est_registro from tbl_cat_course ct left join tbl_course tc on ct.cat_cor_id = tc.cat_cor_id group by ct.cat_cor_id, ct.cat_cor_name, ct.fec_registro, ct.est_registro order by ct.fec_registro desc",
    category_details_query: "select ct.cat_cor_id, ct.cat_color, ct.cat_cor_name, ct.cat_cor_desc, ct.usu_registro, count(tc.cor_id) num_cursos, ct.fec_registro, ct.est_registro from tbl_cat_course ct left join tbl_course tc on ct.cat_cor_id = tc.cat_cor_id where ct.cat_cor_id = ? group by ct.cat_cor_id, ct.cat_cor_name, ct.fec_registro, ct.est_registro, ct.cat_cor_desc, ct.usu_registro, ct.cat_color",
    //Class
    class_list_query: "SELECT cl.class_id, cl.class_tittle, cl.class_desc, cl.class_time, cl.fec_registro, cl.est_registro, tc.cor_name, cl.class_video_type FROM tbl_class cl inner join tbl_course tc on cl.cor_id = tc.cor_id where cl.cor_id = ? order by cl.fec_registro desc",
    class_details_query: "SELECT cl.class_id, cl.class_tittle, cl.class_desc, cl.class_time, cl.fec_registro, cl.est_registro, cl.class_video_embed, tc.cor_name, (u.user_pri_nom || ' ' || u.user_ape_pat) user_reg_name, count(com.com_id), cl.class_video_type FROM tbl_class cl left join tbl_comment com on cl.class_id = com.class_id inner join tbl_course tc on cl.cor_id = tc.cor_id left join tbl_users u ON cl.usu_reg_id = u.user_id where cl.class_id = ? group by cl.class_id, cl.class_tittle, cl.class_desc, cl.class_time, cl.fec_registro, cl.est_registro, cl.class_video_embed, tc.cor_name, u.user_pri_nom , u.user_ape_pat",
    class_list_enable_query: "SELECT cl.class_id, cl.class_tittle, cl.class_desc, cl.class_time, cl.fec_registro, cl.est_registro, tc.cor_name, cl.class_video_type FROM tbl_class cl inner join tbl_course tc on cl.cor_id = tc.cor_id where cl.cor_id = ? and cl.est_registro = 1 order by cl.fec_registro desc",
    class_list_query_start: "SELECT cl.class_file_flag , cl.class_file_name, cl.class_file, cl.class_id, cl.class_video_embed, cl.class_tittle, cl.class_desc, cl.class_time, cl.fec_registro, cl.est_registro, tc.cor_name, cl.class_video_type FROM tbl_class cl inner join tbl_course tc on cl.cor_id = tc.cor_id where cl.cor_id = ? and cl.est_registro = 1 order by cl.fec_registro asc",
    //Matricula
    mat_list_query: "select mt.mat_id, mt.cor_id, mt.fec_registro, mt.mat_state, tc.cor_name, tc.cor_price, (u.user_pri_nom || ' ' || u.user_ape_pat) usu_full_name, c2.cat_cor_name from tbl_mat_course mt inner join tbl_users u on mt.user_alu_id = u.user_id inner join tbl_course tc on mt.cor_id = tc.cor_id inner join tbl_cat_course c2 on tc.cat_cor_id = c2.cat_cor_id order by mt.fec_registro desc",
    mat_details_query: "select mt.mat_id, mt.cor_id, mt.mat_voucher_img, mt.fec_registro, mt.mat_state, tc.cor_name, tc.cor_price, (u.user_pri_nom || ' ' || u.user_ape_pat) usu_full_name, c2.cat_cor_name from tbl_mat_course mt inner join tbl_users u on mt.user_alu_id = u.user_id inner join tbl_course tc on mt.cor_id = tc.cor_id inner join tbl_cat_course c2 on tc.cat_cor_id = c2.cat_cor_id where mt.mat_id = ?",
    //Questions
    ques_list_query: "select * from tbl_data_questions_cab",
    ques_list_det_query: "select cab.data_id, cab.data_file_name, det.ques_id, det.ques_name, cat_cor_name, det.ques_question, det.est_registro det_est_registro, cab.est_registro cab_est_registro, det.fec_reistro from tbl_data_questions_cab cab inner join tbl_data_questions_det det on cab.data_id = det.data_id inner join tbl_cat_course cat on det.cat_cor_id = cat.cat_cor_id where det.data_id = ?",
    ques_upload_ques_details: "select cab.data_id, cab.data_file_name, det.cat_cor_id, det.ques_id, det.ques_name, cat_cor_name, det.ques_question, det.ques_res1, det.ques_res2, det.ques_res3, det.ques_res4, det.ques_res5, det.ques_ok, det.est_registro det_est_registro, cab.est_registro cab_est_registro, det.fec_reistro, det.usu_registro from tbl_data_questions_cab cab inner join tbl_data_questions_det det on cab.data_id = det.data_id inner join tbl_cat_course cat on det.cat_cor_id = cat.cat_cor_id where det.data_id = ? and det.ques_id = ??",
    //Comments
    com_list_x_class: "select cm.com_id, cm.com_text, cm.com_likes, cm.fec_registro, u.user_reg_provider_photo, u.user_id, (u.user_pri_nom || ' ' || u.user_ape_pat) user_full_name from tbl_comment cm INNER JOIN tbl_users u on cm.com_user_id = u.user_id where cm.class_id = ? and cm.est_registro = 1",
    //Tests
    test_list_x_user: "select ts.test_fec_start, ts.test_status, ts.test_id, ts.test_num_ques, ts.test_time, ts.test_result, ts.fec_registro, ts.test_fec_finaliza, cat.cat_cor_name from tbl_tests ts inner join tbl_cat_course cat on ts.test_type_id = cat.cat_cor_id where ts.user_id = ? order by ts.fec_registro desc;",
    test_details: "select ts.test_fec_start, ts.test_ques_ok, ts.test_ques_bad, ts.test_ques_blank ,ts.test_status, ts.test_id, ts.test_num_ques, ts.test_time, ts.test_result, ts.fec_registro, ts.test_fec_finaliza, cat.cat_cor_name from tbl_tests ts inner join tbl_cat_course cat on ts.test_type_id = cat.cat_cor_id where ts.test_id = ?"
};