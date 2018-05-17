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
        .find({user_mail: dataLogin.user_mail, est_registro: 1}, 
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
                dataResponse.res_service = 'El usuario no existe o deshabilitado.';
                res.json(dataResponse);
            }
        })
        .catch(function(err){
            dataResponse.res_service = 'Error obteniendo el usuario.';
            dataResponse.des_error = err;
            res.json(dataResponse);
        });
    },
    checkuserprovider: function(req, res){
        var dataResponse = {
            data_result : "",
            res_service : "",
            des_error : "",
            type_error: ""
        };
        var dataCheck = req.allParams();
        User
        .find({user_mail: dataCheck.email, user_reg_provider: dataCheck.provider, user_reg_provider_id: dataCheck.id}, 
              {select: ['user_id', 'user_mail', 'user_pri_nom', 'user_pw', 'rol_id']})
        .then(function(registros){
            if(registros.length>0){
                dataResponse.data_result = registros[0];
                dataResponse.res_service = "ok";
                res.json(dataResponse);
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

                        // ENVIAR EMAIL DE BIENVENIDA
                        // SEND MAIL =========
                        var transporter = nodemailer.createTransport({
                            host: 'smtp.gmail.com',
                            auth: {
                                type: "OAuth2",
                                user: "vasquez9d@gmail.com",
                                clientId: "1032639250330-1vsu6lu6alsdahv1e5ommkhse3jcpi5i.apps.googleusercontent.com",
                                clientSecret: "osOOEMGnDunC2KqvtnOC046l",
                                refreshToken: "1/R0NDCxCzavaN5sQx4hMdWFsi-WXi4QpeP_rbrig-d5U"                              
                            }
                        })

                        var mailOptions = {
                            from: 'Clinical Medic - Seguridad <vasquez9d@gmail.com>',
                            to: dataValidate.user_mail,
                            subject: 'Validación de correo electrónico',
                            text: '¡Hola!, tu código de validación para la página web Studen Clinical Medic es: ' + randomCode + ', ingresa esté codigo para completar el registro.'
                        }
                        
                        transporter.sendMail(mailOptions, function (err, res) {
                            if(err){
                                console.log(err);
                                console.log('Error');
                            } else {
                                console.log('Email Sent to: '+ dataValidate.user_mail);
                            }
                        })
                        // ===================

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
                // console.log(userDecrypt.user);
                User.find({ user_mail: userDecrypt.user, est_registro: 1 },
                    { select: ['user_id', 'user_mail', 'user_pri_nom', 'user_seg_nom', 'user_ape_pat', 'rol_id', 'user_reg_provider_photo'] })
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
            data_result2 : "",
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
                var dataUpdate = req.allParams();

                var dataPersonalInfo = dataUpdate.personalInfo;
                var dataAcademyInfo = dataUpdate.academyInfo;

                var filterUpdate = {
                    user_id : dataUpdate.user_id
                }

                User.update(filterUpdate, dataPersonalInfo)
                    .then(function(response){
                        if(response.length>0){
                            if (dataAcademyInfo == null){
                                dataResponse.data_result = response[0];
                                dataResponse.res_service = "ok";
                                res.json(dataResponse)
                            }else{
                                UserAcademy.find({ user_id: dataUpdate.user_id, est_registro: 1 },
                                    { select: ['user_id'] })
                                    .then(function (responseFind) {

                                        if (responseFind.length > 0) {
                                            UserAcademy.update(filterUpdate, dataAcademyInfo)
                                                       .then(function (responseUpdate) {
                                                           dataResponse.data_result = response[0];
                                                           dataResponse.data_result2 = responseUpdate[0];
                                                           dataResponse.res_service = "ok";
                                                           res.json(dataResponse);
                                                       })
                                                       .catch(function (err) {
                                                           dataResponse.res_service = "Error actualizando el usuario academy.";
                                                           dataResponse.des_error = err;
                                                           res.json(dataResponse);
                                                       });
                                        } else {
                                            UserAcademy.create(dataAcademyInfo, function (err, responseCreate) {
                                                if (err) {
                                                    dataResponse.res_service = "Error creando el usuario.";
                                                    dataResponse.des_error = err;
                                                    res.json(dataResponse);
                                                } else {
                                                    if (responseCreate.user_id > 0) {
                                                        responseCreate.save();
                                                        dataResponse.data_result = response[0];
                                                        dataResponse.data_result2 = responseCreate;
                                                        dataResponse.res_service = "ok";
                                                        res.json(dataResponse);
                                                    } else {
                                                        dataResponse.res_service = 'No se creo el usuario academy.';
                                                        res.json(dataResponse);
                                                    }
                                                }
                                            });
                                        }
                                    })
                                    .catch(function (err) {
                                        dataResponse.res_service = "Error actualizando data academy";
                                        dataResponse.des_error = err;
                                        res.json(dataResponse);
                                    });
                            }
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
    enable: function(req, res){
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
                    est_registro : 1
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
                            dataResponse.res_service = 'No se habilitó el usuario.';
                            res.json(dataResponse)
                        }
                    })
                    .catch(function (err) {
                        dataResponse.res_service = "Error habilitando el usuario.";
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
                var query = "select p.user_id, r.rol_name, r.rol_id, p.user_mail, " +
                            "(p.user_pri_nom || ' ' ||  p.user_ape_pat || ' ' ||p.user_ape_mat) user_full_name, " +
                            "p.user_num_cell, p.est_registro  from tbl_users p inner join tbl_roles r " +
                            "on p.rol_id = r.rol_id";
                User.query(query, function (err, result) {
                    if (err) {
                        return res.serverError(err);
                    }
                    res.json(result.rows);
                });
            }
        });
    },
    listteachers: function(req, res){
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
                var query = "select p.user_id, (p.user_pri_nom || ' ' ||p.user_ape_pat) doc_full_name from tbl_users p where p.rol_id = 4 and p.est_registro = 1";
                User.query(query, function (err, result) {
                    if (err) {
                        dataResponse.res_service = "Error obteniendo listTeachers.";
                        dataResponse.des_error = err;
                        res.json(dataResponse);
                    }
                    dataResponse.data_result = result.rows;
                    dataResponse.res_service = "ok";
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
                var dataDetails = req.allParams();
                try{
                    User.find({ user_id: dataDetails.user_id, est_registro: 1 },
                        {
                            select: ['user_id', 'user_mail', 'user_pri_nom', 
                                     'user_seg_nom', 'user_ape_pat', 'user_ape_mat',
                                     'user_dpt', 'user_prv', 'user_dst',
                                     'user_num_cell', 'user_fec_nac', 'user_reg_provider_photo',
                                     'user_reg_provider',
                                     'user_desc']
                        })
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
                }catch(err){
                    console.log(err);
                }
            }
        });
    },
    detailsupdate: function(req, res){
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
                var dataDetails = req.allParams();
                try{
                    User.find({ user_id: dataDetails.user_id, est_registro: 1 },
                        {
                            exclude: 'user_pw'
                        })
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
                }catch(err){
                    console.log(err);
                }
            }
        });
    }
};