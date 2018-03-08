/**
 * MessagesController
 *
 * @description :: Server-side logic for managing messages
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
                Messages
                    .create(dataCreate, function (err, response) {
                    if (err) {
                        dataResponse.res_service = "Error creando el mensaje.";
                        dataResponse.des_error = err;
                    } else {
                        if (response.length > 0) {
                            response.save();
                            dataResponse.data_result = response[0];
                            dataResponse.res_service = "ok";
                        } else {
                            dataResponse.res_service = 'No se creo el mensaje.';
                        }
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
                    msg_id: dataUpdate.msg_id
                }
                Messages
                    .update(filterUpdate, dataUpdate)
                    .then(function (response) {
                        if (response.length > 0) {
                            dataResponse.data_result = response[0];
                            dataResponse.res_service = "ok";
                            res.json(dataResponse)
                        } else {
                            dataResponse.res_service = 'No se actualizó el mensaje.';
                            res.json(dataResponse)
                        }
                    })
                    .catch(function (err) {
                        dataResponse.res_service = "Error actualizando el mensaje.";
                        dataResponse.des_error = err;
                        res.json(dataResponse)
                    });
            }
        });
    },
    updateview: function(req, res){
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
                    msg_flg_view : '0'
                }
                var filterUpdate = {
                    msg_id: dataUpdate.msg_id
                }
                Messages
                    .update(filterUpdate, dataUpdate)
                    .then(function (response) {
                        if (response.length > 0) {
                            dataResponse.data_result = response[0];
                            dataResponse.res_service = "ok";
                            res.json(dataResponse)
                        } else {
                            dataResponse.res_service = 'No se actualizó el mensaje visto.';
                            res.json(dataResponse)
                        }
                    })
                    .catch(function (err) {
                        dataResponse.res_service = "Error actualizando el mensaje visto.";
                        dataResponse.des_error = err;
                        res.json(dataResponse)
                    });
            }
        });
    },
    listusersed: function(req, res){
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
                Messages
                    .find({ est_registro : 1, user_sed: dataRequest.user_sed},
                          { select: ['msg_id', 'msg_text', 'msg_flg_view', 'user_sed', 'user_rec' ,'fec_registro'] })
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
                        dataResponse.res_service = "Error listando los mensajes.";
                        dataResponse.des_error = err;
                        res.json(dataResponse);
                    });
            }
        });
    },
    listuserrec: function(req, res){
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
                Messages
                    .find({ est_registro : 1, user_rec: dataRequest.user_rec},
                          { select: ['msg_id', 'msg_text', 'msg_flg_view', 'user_sed', 'user_rec' ,'fec_registro'] })
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
                        dataResponse.res_service = "Error listando los mensajes.";
                        dataResponse.des_error = err;
                        res.json(dataResponse);
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
                // console.log(decode);
                var dataRequest = req.allParams();
                var dataUpdate = {
                    est_registro : 0
                }
                var filterUpdate = {
                    msg_id: dataRequest.msg_id
                }
                Messages
                    .update(filterUpdate, dataUpdate)
                    .then(function (response) {
                        if (response.length > 0) {
                            dataResponse.res_service = "ok";
                            res.json(dataResponse)
                        } else {
                            dataResponse.res_service = 'No se eliminó el mensaje.';
                            res.json(dataResponse)
                        }
                    })
                    .catch(function (err) {
                        dataResponse.res_service = "Error elimando el mensaje.";
                        dataResponse.des_error = err;
                        res.json(dataResponse)
                    });
            }
        });
    }
};

