/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

var jwt = require('jsonwebtoken');
var CryptoJS = require('crypto-js');

module.exports = {
	login: function(req, res) {
        var dataResponse = {
            data_result : "",
            res_service : "",
            des_error : "",
            type_error: ""
        };
        var dataLogin = req.allParams();
        User
        .find({user_mail: dataLogin.user_mail}, 
            { select: ['user_id', 'user_mail', 'user_pri_nom', 'user_pw', 'rol_id']}
             )
        .then(function(registros){
            if(registros.length>0){
                    var CryptoJsKey = sails.config.values.cryptoJsKey;
                    const pwDBEncrypt = CryptoJS.AES.decrypt(registros[0].user_pw.toString(), CryptoJsKey);
                    const pwDBDecryptText = pwDBEncrypt.toString(CryptoJS.enc.Utf8);
                    const pwWSEncrypt = CryptoJS.AES.decrypt(dataLogin.user_pw.toString(), CryptoJsKey);
                    const pwWSDecryptText = pwWSEncrypt.toString(CryptoJS.enc.Utf8);
                    if (pwWSDecryptText == pwDBDecryptText){
                        dataResponse.data_result = registros[0];
                        var jwtKey = sails.config.values.jwtkey;
                        var _token = jwt.sign({ user: dataLogin.user_mail, password: dataLogin.user_pw }, jwtKey);
                        dataResponse.token = _token;
                        dataResponse.res_service = "ok";
                        res.json(dataResponse);
                    }else{
                        dataResponse.type_error = 'password';
                        dataResponse.res_service = 'La contraseña es incorrecta.';
                        res.json(dataResponse);
                    }
            }else{
                dataResponse.type_error = 'email';
                dataResponse.res_service = 'El usuario no existe.';
                res.json(dataResponse);
            }
        })
        .catch(function(err){
            dataResponse.res_service = 'Error obteniendo el usuario.';
            dataResponse.des_error = err;
            res.json(dataResponse);
        });
    },
    // ---Create users
    createwoauth: function(req, res){
        var dataResponse = {
            data_result: "",
            res_service: "",
            des_error: "",
            type_error: ""
        };
        var dataCreate = req.allParams();
        User.find({ user_mail: dataCreate.user_mail }, { select: ['user_mail'] })
            .then(function (responseEmail) {
                if (responseEmail.length > 0) {
                    dataResponse.type_error = 'email';
                    dataResponse.res_service = "El correo electrónico ya existe.";
                    res.json(dataResponse);
                } else {
                    User.create(dataCreate, function (err, response) {
                        if (err) {
                            dataResponse.res_service = "Error creando el usuario.";
                            dataResponse.des_error = err;
                            res.json(dataResponse);
                        } else {
                            if (response.user_id > 0) {
                                response.save();
                                var jwtKey = sails.config.values.jwtkey;
                                var _token = jwt.sign({ user: response.user_mail, password: response.user_pw }, jwtKey);
                                dataResponse.token = _token;

                                dataResponse.data_result = response;
                                dataResponse.res_service = "ok";

                                res.json(dataResponse);
                            } else {
                                dataResponse.res_service = 'No se creo el usuario.';
                                res.json(dataResponse);
                            }
                        }
                    });

                }
            })
            .catch(function (err) {
                dataResponse.res_service = "Error validando el correo electrónico.";
                dataResponse.des_error = err;
                res.json(dataResponse);
            });
    },
    userauth: function(req, res){
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
                var userDecrypt = decoded;
                console.log(userDecrypt.user);
                User.find({ user_mail: userDecrypt.user, est_registro: 1 },
                    { select: ['user_id', 'user_mail', 'user_pri_nom', 'user_seg_nom', 'user_ape_pat', 'rol_id'] })
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
                        dataResponse.res_service = "Error obteniendo el detalle de un usuario.";
                        dataResponse.des_error = err;
                        res.json(dataResponse);
                    });
            }
        });
    },
    create: function(req, res) {
        var dataResponse = {
            data_result : "",
            res_service : "",
            des_error : ""
        };
        var dataToken = req.headers.authorization;
        var jwtKey = sails.config.values.jwtkey;
        jwt.verify(dataToken, jwtKey, function(err, decoded) {
            if (err) {
                dataResponse.res_service = "401 unauthorized";
                dataResponse.des_error = err;
                res.json(dataResponse);
            }else{
                var dataCreate = req.allParams();
                User.find({ user_mail: dataCreate.user_mail }, { select: ['user_mail']})
                    .then(function (responseEmail) {
                        if (responseEmail.length > 0) {
                            dataResponse.res_service = "El correo electrónico ya existe.";
                            res.json(dataResponse);
                        } else {                            
                            User.create(dataCreate, function (err, response) {
                                if (err) {
                                    dataResponse.res_service = "Error creando el usuario.";
                                    dataResponse.des_error = err;
                                    res.json(dataResponse);
                                } else {                                
                                    if (response.user_id > 0) {
                                        response.save();
                                        dataResponse.data_result = response;
                                        dataResponse.res_service = "ok";
                                        res.json(dataResponse);
                                    } else {
                                        dataResponse.res_service = 'No se creo el usuario.';
                                        res.json(dataResponse);
                                    }
                                }
                            });
                            
                        }
                    })
                    .catch(function (err) {
                        dataResponse.res_service = "Error validando el correo electrónico.";
                        dataResponse.des_error = err;
                        res.json(dataResponse);
                    });
            }
        });
    },
    // --Update users
    update: function(req, res){
        var dataResponse = {
            data_result : "",
            res_service : "",
            des_error : ""
        };
        var dataToken = req.headers.authorization;
        var jwtKey = sails.config.values.jwtkey;
        jwt.verify(dataToken, jwtKey, function(err, decoded) {
            if (err) {
                dataResponse.res_service = "401 unauthorized";
                dataResponse.des_error = err;
                res.json(dataResponse);
            }else{
                // console.log(decoded);
                var dataUpdate = req.allParams();
                var filterUpdate = {
                    user_id : dataUpdate.user_id
                }
                User.update(filterUpdate, dataUpdate)
                    .then(function(response){
                        if(response.length>0){
                            dataResponse.data_result = response[0];
                            dataResponse.res_service = "ok";
                            res.json(dataResponse)
                        }else{
                            dataResponse.res_service = 'No se actualizó el usuario.';
                            res.json(dataResponse)
                        }
                    })
                    .catch(function(err){
                        dataResponse.res_service = "Error actualizando el usuario.";
                        dataResponse.des_error = err;
                        res.json(dataResponse)
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
                // console.log(decode);d
                var dataRequest = req.allParams();
                var dataUpdate = {
                    est_registro : 0
                }
                var filterUpdate = {
                    user_id: dataRequest.user_id
                }
                User.update(filterUpdate, dataUpdate)
                    .then(function (response) {
                        if (response.length > 0) {
                            dataResponse.res_service = "ok";
                            res.json(dataResponse)
                        } else {
                            dataResponse.res_service = 'No se eliminó el usuario.';
                            res.json(dataResponse)
                        }
                    })
                    .catch(function (err) {
                        dataResponse.res_service = "Error elimando el usuario.";
                        dataResponse.des_error = err;
                        res.json(dataResponse)
                    });
            }
        });
    },
    list: function(req, res){
        var dataResponse = {
            data_result : "",
            res_service : "",
            des_error : ""
        };
        var dataToken = req.headers.authorization;
        var jwtKey = sails.config.values.jwtkey;
        jwt.verify(dataToken, jwtKey, function(err, decoded) {
            if (err) {
                dataResponse.res_service = "401 unauthorized";
                dataResponse.des_error = err;
                res.json(dataResponse);
            }else{
                // console.log(decoded);
                User.find({select:['user_id','user_mail','user_pri_nom','user_seg_nom','user_ape_pat','user_ape_mat','user_num_cell']})
                .then(function(response){
                    if(response.length>0){
                       dataResponse.data_result = response;
                       dataResponse.res_service = "ok";
                       res.json(dataResponse);
                    }else{
                       dataResponse.res_service = "No existen datos.";
                       res.json(dataResponse);
                    }
                })
                .catch(function(err){
                    dataResponse.res_service = "Error listando los usuarios.";
                    dataResponse.des_error = err;
                    res.json(dataResponse);
                });
            }
        });
    },
    details: function(req, res){
        var dataResponse = {
            data_result : "",
            res_service : "",
            des_error : ""
        };
        var dataToken = req.headers.authorization;
        var jwtKey = sails.config.values.jwtkey;
        jwt.verify(dataToken, jwtKey, function(err, decoded) {
            if (err) {
                dataResponse.res_service = "401 unauthorized";
                dataResponse.des_error = err;
                res.json(dataResponse);
            }else{
                // console.log(decoded);
                var dataDetails = req.allParams();
                User.find({user_id : dataDetails.user_id, est_registro : 1},
                    { select: ['user_id', 'user_mail', 'user_pri_nom', 'user_seg_nom', 'user_ape_pat', 'user_ape_mat', 
                        'user_num_cell', 'user_fec_nac', 'user_ubigeo', 'user_num_cell', 'user_desc']})
                    .then(function(response){
                        if(response.length>0){
                            dataResponse.data_result = response[0];
                            dataResponse.res_service = "ok";
                            res.json(dataResponse);
                         }else{
                            dataResponse.res_service = "No existen datos.";
                            res.json(dataResponse);
                         }
                    })
                    .catch(function(err){
                        dataResponse.res_service = "Error obteniendo el detalle de un usuario.";
                        dataResponse.des_error = err;
                        res.json(dataResponse);
                    });
            }
        });
    }
};