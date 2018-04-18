/**
 * ClassController
 *
 * @description :: Server-side logic for managing Classes
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
                Class.create(dataCreate, function (err, response) {
                    if (err) {
                        dataResponse.res_service = "Error creando la clase.";
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
    update: function (req, res) {
        console.log('update');
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
                    class_id: dataUpdate.class_id
                }
                console.log(filterUpdate);
                Class.update(filterUpdate, dataUpdate)
                    .then(function (response) {
                        if (response.length > 0) {
                            dataResponse.data_result = response[0];
                            dataResponse.res_service = "ok";
                            res.json(dataResponse)
                        } else {
                            dataResponse.res_service = 'No se actualizó la clase.';
                            res.json(dataResponse)
                        }
                    })
                    .catch(function (err) {
                        dataResponse.res_service = "Error actualizando la clase.";
                        dataResponse.des_error = err;
                        res.json(dataResponse)
                    });
            }
        });
    },
    listxcourse: function (req, res) {
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
                var dataRequest = req.allParams();            
                var query = sails.config.querys.class_list_query.replace('?', dataRequest.cor_id);
                Course.query(query, function (err, result) {
                    if (err) {
                        dataResponse.res_service = "Error listando las clases por curso.";
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
    details: function (req, res) {
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
                var query = sails.config.querys.class_details_query.replace('?', dataDetails.class_id);
                Course.query(query, function (err, result) {
                    if (err) {
                        dataResponse.res_service = "Error detalle clase.";
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
    delete: function (req, res) {
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
                var dataRequest = req.allParams();
                var dataUpdate = {
                    est_registro: 0
                }
                var filterUpdate = {
                    class_id: dataRequest.class_id
                }
                Class.update(filterUpdate, dataUpdate)
                    .then(function (response) {
                        if (response.length > 0) {
                            dataResponse.res_service = "ok";
                            res.json(dataResponse);
                        } else {
                            dataResponse.res_service = "No se eliminó la clase.";
                            res.json(dataResponse);
                        }
                    })
                    .catch(function (err) {
                        dataResponse.res_service = "Error eliminando la clase.";
                        dataResponse.des_error = err;
                        res.json(dataResponse);
                    });
            }
        });
    },
    enable: function(req, res){
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
                var dataRequest = req.allParams();
                var dataUpdate = {
                    est_registro: 1
                }
                var filterUpdate = {
                    class_id: dataRequest.class_id
                }
                Class.update(filterUpdate, dataUpdate)
                    .then(function (response) {
                        if (response.length > 0) {
                            dataResponse.res_service = "ok";
                            res.json(dataResponse);
                        } else {
                            dataResponse.res_service = "No se habilitado la clase.";
                            res.json(dataResponse);
                        }
                    })
                    .catch(function (err) {
                        dataResponse.res_service = "Error habilitando la clase.";
                        dataResponse.des_error = err;
                        res.json(dataResponse);
                    });
            }
        });
    }
};

