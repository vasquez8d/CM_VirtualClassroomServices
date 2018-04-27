/**
 * MatCourseController
 *
 * @description :: Server-side logic for managing Matcourses
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
var jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');

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
                MatCourse.create(dataCreate, function (err, response) {
                    if (err) {
                        dataResponse.res_service = "Error creando la matricula.";
                        dataResponse.des_error = err;
                        res.json(dataResponse);
                    } else {
                        response.save();
                        dataResponse.data_result = response;
                        dataResponse.res_service = "ok";

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
                            from: 'Clinical Medic - Información <vasquez9d@gmail.com>',
                            to: 'vasquez8d@gmail.com',
                            subject: 'Nuevo registro de matricular pendiente',
                            text: '¡Hola!, un usuario trata de comprar un curso y necesita que valides su voucher.'
                        }

                        transporter.sendMail(mailOptions, function (err, res) {
                            if (err) {
                                console.log(err);
                                console.log('Error');
                            } else {
                                console.log('Email Sent to: ' + dataValidate.user_mail);
                            }
                        })
                        // ===================

                        res.json(dataResponse);
                    }
                });
            }
        });
    },
    createfree: function(req, res) {
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
                MatCourse.create(dataCreate, function (err, response) {
                    if (err) {
                        dataResponse.res_service = "Error creando la matricula.";
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
    approve: function(req, res)
    {
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
                    mat_state: 1
                }
                var filterUpdate = {
                    mat_id: dataRequest.mat_id
                }
                MatCourse.update(filterUpdate, dataUpdate)
                    .then(function (response) {
                        if (response.length > 0) {
                            dataResponse.res_service = "ok";
                            res.json(dataResponse);
                        } else {
                            dataResponse.res_service = "No se aprobo la compra.";
                            res.json(dataResponse);
                        }
                    })
                    .catch(function (err) {
                        dataResponse.res_service = "Error aprobo la compra.";
                        dataResponse.des_error = err;
                        res.json(dataResponse);
                    });
            }
        });
    },
    disapprove: function(req, res)
    {
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
                    mat_state: 2
                }
                var filterUpdate = {
                    mat_id: dataRequest.mat_id
                }
                MatCourse.update(filterUpdate, dataUpdate)
                    .then(function (response) {
                        if (response.length > 0) {
                            dataResponse.res_service = "ok";
                            res.json(dataResponse);
                        } else {
                            dataResponse.res_service = "No se disapprove la compra.";
                            res.json(dataResponse);
                        }
                    })
                    .catch(function (err) {
                        dataResponse.res_service = "Error disapprove la compra.";
                        dataResponse.des_error = err;
                        res.json(dataResponse);
                    });
            }
        });
    },
    uploadimage: function (req, res) {
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
                if (req.file('image')._files.length > 0) {
                    req.file('image').upload({
                        dirname: '../../assets/images/mat/',
                    }, function (err, file) {
                        if (err) {
                            dataResponse.res_service = "Error subiendo la imagen";
                            dataResponse.des_error = err;
                            res.json(dataResponse)
                        }
                        var pathFileName = file[0].fd.split('/').reverse()[0];
                        var filename = pathFileName.replace(/^.*[\\\/]/, '');
                        var cor_photo = '/images/mat/' + filename;
                        dataResponse.data_result = cor_photo;
                        dataResponse.res_service = "ok";
                        res.json(dataResponse)
                    });
                } else {
                    dataResponse.res_service = "No existe archivo";
                    res.json(dataResponse)
                }
            }
        });
    },
    list: function (req, res) {
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
                var query = sails.config.querys.mat_list_query;
                MatCourse.query(query, function (err, result) {
                    if (err) {
                        dataResponse.res_service = "Error listando las matriculas.";
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
                var query = sails.config.querys.mat_details_query;
                var query = query.replace('?', dataDetails.mat_id);
                MatCourse.query(query, function (err, result) {
                    if (err) {
                        dataResponse.res_service = "Error detalle de la matricula.";
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
};
