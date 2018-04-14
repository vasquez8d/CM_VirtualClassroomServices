/**
 * CategoryCourseController
 *
 * @description :: Server-side logic for managing Categorycourses
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
var jwt = require('jsonwebtoken');
module.exports = {
    create: function(req, res){
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
                CategoryCourse
                    .create(dataCreate, function (err, response) {
                    if (err) {
                        dataResponse.res_service = "Error creando la categoría.";
                        dataResponse.des_error = err;
                        res.json(dataResponse);
                    } else {
                        response.save();
                        dataResponse.data_result = response[0];
                        dataResponse.res_service = "ok";
                        res.json(dataResponse);
                    }
                });
            }
        });
    },
    update: function(req, res){
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
                    cat_cor_id: dataUpdate.cat_cor_id
                }
                CategoryCourse
                    .update(filterUpdate, dataUpdate)
                    .then(function (response) {
                        if (response.length > 0) {
                            dataResponse.data_result = response[0];
                            dataResponse.res_service = "ok";
                            res.json(dataResponse)
                        } else {
                            dataResponse.res_service = 'No se actualizó la categoría.';
                            res.json(dataResponse)
                        }
                    })
                    .catch(function (err) {
                        dataResponse.res_service = "Error actualizando la categoría.";
                        dataResponse.des_error = err;
                        res.json(dataResponse)
                    });
            }
        });
    },
    list: function(req, res){
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
                CategoryCourse.find({ est_registro : 1},
                          { select: ['cat_cor_id', 'cat_cor_name'] })
                    .then(function (response) {
                        if (response.length > 0) {
                            dataResponse.data_result = response;
                            dataResponse.res_service = "ok";
                            res.json(dataResponse);
                        } else {
                            dataResponse.res_service = "No existen datos.";
                            res.json(dataResponse);
                        }
                    })
                    .catch(function (err) {
                        dataResponse.res_service = "Error listando las categorías.";
                        dataResponse.des_error = err;
                        res.json(dataResponse);
                    });
            }
        });
    },
    listadvance: function(req, res){
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
                var query = sails.config.category_querys.list_query;
                CategoryCourse.query(query, function (err, result) {
                    if (err) {
                        dataResponse.res_service = "Error listando los cursos.";
                        dataResponse.des_error = err;
                        res.json(dataResponse)
                    }
                    if (result.rows.length > 0){
                        dataResponse.data_result = result.rows;
                        dataResponse.res_service = "ok";
                        res.json(dataResponse)
                    }else{
                        dataResponse.res_service = "No existe información.";
                        res.json(dataResponse) 
                    }
                });
            }
        });
    },
    delete: function(req, res)
    {
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

                var dataRequest = req.allParams();
                var dataUpdate = {
                    est_registro : 0
                }
                var filterUpdate = {
                    cat_cor_id: dataRequest.cat_cor_id
                }
                CategoryCourse
                    .update(filterUpdate, dataUpdate)
                    .then(function (response) {
                        if (response.length > 0) {
                            dataResponse.res_service = "ok";
                            res.json(dataResponse)
                        } else {
                            dataResponse.res_service = 'No se eliminó la categoría.';
                            res.json(dataResponse)
                        }
                    })
                    .catch(function (err) {
                        dataResponse.res_service = "Error elimando la categoría.";
                        dataResponse.des_error = err;
                        res.json(dataResponse)
                    });
            }
        });
    },
    enable: function (req, res) {
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

                var dataRequest = req.allParams();
                var dataUpdate = {
                    est_registro: 1
                }
                var filterUpdate = {
                    cat_cor_id: dataRequest.cat_cor_id
                }
                CategoryCourse
                    .update(filterUpdate, dataUpdate)
                    .then(function (response) {
                        if (response.length > 0) {
                            dataResponse.res_service = "ok";
                            res.json(dataResponse)
                        } else {
                            dataResponse.res_service = 'No se eliminó la categoría.';
                            res.json(dataResponse)
                        }
                    })
                    .catch(function (err) {
                        dataResponse.res_service = "Error elimando la categoría.";
                        dataResponse.des_error = err;
                        res.json(dataResponse)
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
                var dataFilter = req.allParams();
                var cat_cor_id = dataFilter.cat_cor_id;
                var query = sails.config.category_querys.details_query.replace('?', cat_cor_id);
                CategoryCourse.query(query, function (err, result) {
                    if (err) {
                        dataResponse.res_service = "Error listando los cursos.";
                        dataResponse.des_error = err;
                        res.json(dataResponse)
                    }

                    if (result.rows.length > 0){
                        dataResponse.data_result = result.rows[0];
                        dataResponse.res_service = "ok";
                        res.json(dataResponse)
                    }else{
                        dataResponse.res_service = "No existe información.";
                        res.json(dataResponse) 
                    }
                });
            }
        });
    }
};

