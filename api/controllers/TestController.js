/**
 * TestController
 *
 * @description :: Server-side logic for managing Tests
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
var jwt = require('jsonwebtoken');

module.exports = {
    create: function (req, res) {
        var dataResponse = {
            data_result: "",
            res_service: "",
            des_error: ""
        };
        var jwtKey = sails.config.values.jwtkey;
        var dataToken = req.headers.authorization;
        jwt.verify(dataToken, jwtKey, function (err, decoded) {
            if (err) {
                dataResponse.res_service = "401 unauthorized";
                dataResponse.des_error = err;
                res.json(dataResponse);
            } else {
                var dataCreate = req.allParams();
                Test.create(dataCreate, function (err, response) {
                    if (err) {
                        dataResponse.res_service = "Error creando el examen.";
                        dataResponse.des_error = err;
                        res.json(dataResponse);
                    } else {
                        response.save();
                        dataResponse.data_result = response;
                        dataResponse.res_service = "ok";
                        res.json(dataResponse);
                    }
                });
            }
        });
    },
    finalize: function (req, res) {
        var dataResponse = {
            data_result: "",
            res_service: "",
            des_error: ""
        };
        var jwtKey = sails.config.values.jwtkey;
        var dataToken = req.headers.authorization;
        jwt.verify(dataToken, jwtKey, function (err, decoded) {
            if (err) {
                dataResponse.res_service = "401 unauthorized";
                dataResponse.des_error = err;
                res.json(dataResponse);
            } else {
                var dataUpdate = req.allParams();
                var filterUpdate = {
                    class_id: dataUpdate.class_id
                }
                Test.update(filterUpdate, dataUpdate)
                    .then(function (response) {
                        if (response.length > 0) {
                            dataResponse.data_result = response[0];
                            dataResponse.res_service = "ok";
                            res.json(dataResponse)
                        } else {
                            dataResponse.res_service = 'No se finalizo el examen.';
                            res.json(dataResponse)
                        }
                    })
                    .catch(function (err) {
                        dataResponse.res_service = "Error finalizo el examen.";
                        dataResponse.des_error = err;
                        res.json(dataResponse)
                    });
            }
        });
    },
    test: function(req, res){
        var dataResponse = {
            data_result: "",
            res_service: "",
            des_error: ""
        };
        var jwtKey = sails.config.values.jwtkey;
        var dataToken = req.headers.authorization;
        jwt.verify(dataToken, jwtKey, function (err, decoded) {
            if (err) {
                dataResponse.res_service = "401 unauthorized";
                dataResponse.des_error = err;
                res.json(dataResponse);
            } else {
                var dataTest = req.allParams();
                var dataTestFinal = [];

                if (dataTest.test_type_id == 1 || dataTest.test_type_id == 2){
                    
                    var numQuesSaludPublic = parseInt(dataTest.test_num_ques * 0.1);
                    var numQuesCiencBasics = parseInt(dataTest.test_num_ques * 0.1);
                    var numQuesGinecologia = parseInt(dataTest.test_num_ques * 0.2);
                    var numQuesPediatria   = parseInt(dataTest.test_num_ques * 0.2);
                    var numQuesCirugia     = parseInt(dataTest.test_num_ques * 0.2);
                    var numQuesMedicGenerl = parseInt(dataTest.test_num_ques * 0.2);
                    
                    var totQuestions = numQuesSaludPublic + numQuesCiencBasics + numQuesGinecologia +
                                       numQuesPediatria + numQuesCirugia + numQuesMedicGenerl;

                    if (totQuestions > dataTest.test_num_ques){
                        numQuesMedicGenerl = numQuesMedicGenerl - (totQuestions - dataTest.test_num_ques);
                    } else if (totQuestions < dataTest.test_num_ques){
                        numQuesMedicGenerl = numQuesMedicGenerl + (dataTest.test_num_ques - totQuestions);
                    }

                    var querySaludPublica = 'select * from tbl_data_questions_det p where p.cat_cor_id = 13 order by random() limit ' + numQuesSaludPublic;
                    var queryCienciBasics = 'select * from tbl_data_questions_det p where p.cat_cor_id = 10 order by random() limit ' + numQuesCiencBasics;
                    var queryGinecologia  = 'select * from tbl_data_questions_det p where p.cat_cor_id = 15 order by random() limit ' + numQuesGinecologia;
                    var queryPediatria    = 'select * from tbl_data_questions_det p where p.cat_cor_id = 16 order by random() limit ' + numQuesPediatria;
                    var queryCirugia      = 'select * from tbl_data_questions_det p where p.cat_cor_id = 17 order by random() limit ' + numQuesCirugia;
                    var queryMedicGeneral = 'select * from tbl_data_questions_det p where p.cat_cor_id = 18 order by random() limit ' + numQuesMedicGenerl;

                    for(var i=0 ; i<6 ; i++){

                        var queryTest = '';

                        switch(i){
                            case 0:
                                queryTest = querySaludPublica;
                                break;
                            case 1:
                                queryTest = queryCienciBasics;
                                break;
                            case 2:
                                queryTest = queryGinecologia;
                                break;
                            case 3:
                                queryTest = queryPediatria;
                                break;
                            case 4:
                                queryTest = queryCirugia;
                                break;
                            case 5:
                                queryTest = queryMedicGeneral;
                                break;
                        }

                        Questions.query(queryTest, function (err, result) {
                            if (err) {
                                dataResponse.res_service = "Error creando examen";
                                dataResponse.des_error = err;
                            }
                            if (result.rows.length > 0) {
                                result.rows.forEach(element => {
                                    dataTestFinal.push(element);
                                });
                            } else {
                                dataResponse.res_service = "No existe información.";
                            }
                        });
                    }
                    
                } else if(dataTest.test_type_id == 3) {
                    
                } else if (dataTest.test_type_id == 4) {

                } else if (dataTest.test_type_id == 5) {

                } else if (dataTest.test_type_id == 6) {

                } else if (dataTest.test_type_id == 7) {

                } else if (dataTest.test_type_id == 8) {

                }

                dataResponse.data_result = result.rows;
                dataResponse.res_service = "ok";
                res.json(dataResponse)
            }
        });
    }
};

