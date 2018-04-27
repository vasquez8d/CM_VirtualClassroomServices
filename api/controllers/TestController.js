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
};

