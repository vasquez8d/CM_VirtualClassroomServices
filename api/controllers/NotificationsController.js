/**
 * NotificationsController
 *
 * @description :: Server-side logic for managing notifications
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
                Notifications
                    .create(dataCreate, function (err, response) {
                    if (err) {
                        dataResponse.res_service = "Error creando la notif.";
                        dataResponse.des_error = err;
                    } else {
                        if (response.length > 0) {
                            response.save();
                            dataResponse.data_result = response[0];
                            dataResponse.res_service = "ok";
                        } else {
                            dataResponse.res_service = 'No se creo la notif.';
                        }
                    }
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
                    notf_flg_view : '0'
                }
                var filterUpdate = {
                    notf_id: dataRequest.notf_id
                }
                Notifications
                    .update(filterUpdate, dataUpdate)
                    .then(function (response) {
                        if (response.length > 0) {
                            dataResponse.data_result = response[0];
                            dataResponse.res_service = "ok";
                            res.json(dataResponse)
                        } else {
                            dataResponse.res_service = 'No se actualizó la notif.';
                            res.json(dataResponse)
                        }
                    })
                    .catch(function (err) {
                        dataResponse.res_service = "Error actualizando la notif.";
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
                var dataRequest = req.allParams();
                Notifications
                    .find({ est_registro : 1, user_id: dataRequest.user_id},
                          { select: ['notf_id', 'notf_text', 'notf_flg_view', 'notf_redirect', 'notf_icon', 'fec_registro']})
                    .sort({ fec_registro: "DESC"})
                    .limit(5)
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
                        dataResponse.res_service = "Error listando las notif.";
                        dataResponse.des_error = err;
                        res.json(dataResponse);
                    });
            }
        });
    }
};

