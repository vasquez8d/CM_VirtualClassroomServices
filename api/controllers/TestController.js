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
                console.log(dataUpdate);
                var filterUpdate = {
                    test_id: dataUpdate.test_id
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

                var querySaludPublica = 'select * from tbl_data_questions_det p where p.cat_cor_id = 13 order by random() limit ';
                var queryCienciBasics = 'select * from tbl_data_questions_det p where p.cat_cor_id = 10 order by random() limit ';
                var queryGinecologia = 'select * from tbl_data_questions_det p where p.cat_cor_id = 15 order by random() limit ';
                var queryPediatria = 'select * from tbl_data_questions_det p where p.cat_cor_id = 16 order by random() limit ';
                var queryCirugia = 'select * from tbl_data_questions_det p where p.cat_cor_id = 17 order by random() limit ';
                var queryMedicGeneral = 'select * from tbl_data_questions_det p where p.cat_cor_id = 18 order by random() limit ';

                if (dataTest.test_type_id == 11 || dataTest.test_type_id == 19){
                    
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

                    var querySaludPublica = querySaludPublica + numQuesSaludPublic;
                    var queryCienciBasics = queryCienciBasics + numQuesCiencBasics;
                    var queryGinecologia  = queryGinecologia + numQuesGinecologia;
                    var queryPediatria    = queryPediatria + numQuesPediatria;
                    var queryCirugia      = queryCirugia + numQuesCirugia;
                    var queryMedicGeneral = queryMedicGeneral + numQuesMedicGenerl;
                    var queryTest = '';

                    var index = 0;

                    for(var i=0 ; i<6 ; i++){
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
                            index = index + 1;
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
                            if (index == 6) {
                                dataResponse.data_result = dataTestFinal;
                                dataResponse.res_service = "ok";
                                res.json(dataResponse);
                            }
                        });
                    }
                } else if(dataTest.test_type_id == 13) {
                    var querySaludPublica = querySaludPublica + dataTest.test_num_ques;
                    Questions.query(querySaludPublica, function (err, result) {
                        index = index + 1;
                        if (err) {
                            dataResponse.res_service = "Error creando examen";
                            dataResponse.des_error = err;
                            res.json(dataResponse);
                        }
                        if (result.rows.length > 0) {
                            result.rows.forEach(element => {
                                dataTestFinal.push(element);
                            });
                            dataResponse.data_result = dataTestFinal;
                            dataResponse.res_service = "ok";
                            res.json(dataResponse);
                        } else {
                            dataResponse.res_service = "No existe información.";
                            res.json(dataResponse);
                        }
                    });
                } else if (dataTest.test_type_id == 10) {
                    var queryCienciBasics = queryCienciBasics + dataTest.test_num_ques;
                    Questions.query(queryCienciBasics, function (err, result) {
                        index = index + 1;
                        if (err) {
                            dataResponse.res_service = "Error creando examen";
                            dataResponse.des_error = err;
                            res.json(dataResponse);
                        }
                        if (result.rows.length > 0) {
                            result.rows.forEach(element => {
                                dataTestFinal.push(element);
                            });
                            dataResponse.data_result = dataTestFinal;
                            dataResponse.res_service = "ok";
                            res.json(dataResponse);
                        } else {
                            dataResponse.res_service = "No existe información.";
                            res.json(dataResponse);
                        }
                    });
                } else if (dataTest.test_type_id == 15) {
                    var queryGinecologia = queryGinecologia + dataTest.test_num_ques;
                    Questions.query(queryGinecologia, function (err, result) {
                        index = index + 1;
                        if (err) {
                            dataResponse.res_service = "Error creando examen";
                            dataResponse.des_error = err;
                            res.json(dataResponse);
                        }
                        if (result.rows.length > 0) {
                            result.rows.forEach(element => {
                                dataTestFinal.push(element);
                            });
                            dataResponse.data_result = dataTestFinal;
                            dataResponse.res_service = "ok";
                            res.json(dataResponse);
                        } else {
                            dataResponse.res_service = "No existe información.";
                            res.json(dataResponse);
                        }
                    });
                } else if (dataTest.test_type_id == 16) {
                    var queryPediatria = queryPediatria + dataTest.test_num_ques;
                    Questions.query(queryPediatria, function (err, result) {
                        index = index + 1;
                        if (err) {
                            dataResponse.res_service = "Error creando examen";
                            dataResponse.des_error = err;
                            res.json(dataResponse);
                        }
                        if (result.rows.length > 0) {
                            result.rows.forEach(element => {
                                dataTestFinal.push(element);
                            });
                            dataResponse.data_result = dataTestFinal;
                            dataResponse.res_service = "ok";
                            res.json(dataResponse);
                        } else {
                            dataResponse.res_service = "No existe información.";
                            res.json(dataResponse);
                        }
                    });
                } else if (dataTest.test_type_id == 17) {
                    var queryCirugia = queryCirugia + dataTest.test_num_ques;
                    Questions.query(queryCirugia, function (err, result) {
                        index = index + 1;
                        if (err) {
                            dataResponse.res_service = "Error creando examen";
                            dataResponse.des_error = err;
                            res.json(dataResponse);
                        }
                        if (result.rows.length > 0) {
                            result.rows.forEach(element => {
                                dataTestFinal.push(element);
                            });
                            dataResponse.data_result = dataTestFinal;
                            dataResponse.res_service = "ok";
                            res.json(dataResponse);
                        } else {
                            dataResponse.res_service = "No existe información.";
                            res.json(dataResponse);
                        }
                    });
                } else if (dataTest.test_type_id == 18) {
                    var queryMedicGeneral = queryMedicGeneral + dataTest.test_num_ques;
                    Questions.query(queryMedicGeneral, function (err, result) {
                        index = index + 1;
                        if (err) {
                            dataResponse.res_service = "Error creando examen";
                            dataResponse.des_error = err;
                            res.json(dataResponse);
                        }
                        if (result.rows.length > 0) {
                            result.rows.forEach(element => {
                                dataTestFinal.push(element);
                            });
                            dataResponse.data_result = dataTestFinal;
                            dataResponse.res_service = "ok";
                            res.json(dataResponse);
                        } else {
                            dataResponse.res_service = "No existe información.";
                            res.json(dataResponse);
                        }
                    });
                }
            }
        });
    },
    status: function(req, res){
        var dataResponse = {
            data_result: "",
            res_service: "",
            des_error: ""
        };
        var dataToken = req.headers.authorization;
        var jwtKey = sails.config.values.jwtkey;
        jwt.verify(dataToken, jwtKey, function (err, decoded) {
            if (err) {
                dataResponse.res_service = "401 unauthorized";
                dataResponse.des_error = err;
                res.json(dataResponse);
            } else {
                var dataDetails = req.allParams();
                try {
                    Test.find({ test_id: dataDetails.test_id, est_registro: 1 })
                        .then(function (response) {
                            if (response.length > 0) {
                                dataResponse.data_result = response[0];
                                dataResponse.res_service = "ok";
                                res.json(dataResponse);
                            } else {
                                dataResponse.res_service = "No existen datos.";
                                res.json(dataResponse);
                            }
                        })
                        .catch(function (err) {
                            dataResponse.res_service = "Error obteniendo el detalle examen1";
                            dataResponse.des_error = err;
                            res.json(dataResponse);
                        });
                } catch (err) {
                    dataResponse.res_service = "Error obteniendo el detalle examen2";
                    dataResponse.des_error = err;
                    res.json(dataResponse);
                }
            }
        });
    },
    listxuser: function(req, res){
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
                var dataReq = req.allParams();
                var query = sails.config.querys.test_list_x_user.replace('?', dataReq.user_id);
                Test.query(query, function (err, result) {
                    if (err) {
                        dataResponse.res_service = "Error listando los examenes.";
                        dataResponse.des_error = err;
                        res.json(dataResponse)
                    }
                    if (result.rows.length > 0) {
                        dataResponse.data_result = result.rows;
                        dataResponse.res_service = "ok";
                        res.json(dataResponse)
                    } else {
                        dataResponse.res_service = "No existe información.";
                        res.json(dataResponse)
                    }
                });
            }
        });
    },
    details: function(req, res){
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
                var dataDetails = req.allParams();
                var query = sails.config.querys.test_details.replace('?', dataDetails.test_id);
                Test.query(query, function (err, result) {
                    if (err) {
                        dataResponse.res_service = "Error detalle examen.";
                        dataResponse.des_error = err;
                        res.json(dataResponse)
                    }
                    if (result.rows.length > 0) {
                        dataResponse.data_result = result.rows;
                        dataResponse.res_service = "ok";
                        res.json(dataResponse)
                    } else {
                        dataResponse.res_service = "No existe información.";
                        res.json(dataResponse)
                    }
                });
            }
        });
    }
};
