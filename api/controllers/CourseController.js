/**
 * CourseController
 *
 * @description :: Server-side logic for managing courses
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
                Course.create(dataCreate, function (err, response) {
                    if (err) {
                        dataResponse.res_service = "Error creando el curso.";
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
    updatefilename: function(req, res){
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
                    cor_id: dataUpdate.cor_id
                }
                Course.update(filterUpdate, dataUpdate)
                    .then(function (response) {
                        if (response.length > 0) {
                            dataResponse.data_result = response[0];
                            dataResponse.res_service = "ok";
                            res.json(dataResponse)
                        } else {
                            dataResponse.res_service = 'No se actualizó la imagen del curso.';
                            res.json(dataResponse)
                        }
                    })
                    .catch(function (err) {
                        console.log(err);
                        dataResponse.res_service = "Error actualizando la imagen del curso.";
                        dataResponse.des_error = err;
                        res.json(dataResponse)
                    });
            }
        });
    },
    update: function(req, res)
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
                var dataUpdate = req.allParams();
                var filterUpdate = {
                    cor_id: dataUpdate.cor_id
                }
                Course.update(filterUpdate, dataUpdate)
                    .then(function (response) {
                        if (response.length > 0) {
                            dataResponse.data_result = response[0];
                            dataResponse.res_service = "ok";
                            res.json(dataResponse)
                        } else {
                            dataResponse.res_service = 'No se actualizó el curso.';
                            res.json(dataResponse)
                        }
                    })
                    .catch(function (err) {
                        console.log(err);
                        dataResponse.res_service = "Error actualizando el curso.";
                        dataResponse.des_error = err;
                        res.json(dataResponse)
                    });
            }
        });
    },
    uploadimage: function(req, res){
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
                if (req.file('image')._files.length > 0){
                    req.file('image').upload({
                        dirname: '../../assets/images/courses/',
                    }, function (err, file) {
                        if (err) {
                            dataResponse.res_service = "Error subiendo la imagen";
                            dataResponse.des_error = err;
                            res.json(dataResponse)
                        }
                        var pathFileName = file[0].fd.split('/').reverse()[0];
                        var filename = pathFileName.replace(/^.*[\\\/]/, '');
                        var cor_photo = '/images/courses/' + filename;
                        dataResponse.data_result = cor_photo;
                        dataResponse.res_service = "ok";
                        res.json(dataResponse)
                    });
                }else{
                    dataResponse.res_service = "No existe archivo";
                    res.json(dataResponse)
                }
            }
        });
    },  
    list: function(req, res)
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
                var query = sails.config.course_querys.list_query;
                Course.query(query, function (err, result) {
                    if (err) {
                        dataResponse.res_service = "Error listando los cursos.";
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
                var reqParams = req.allParams();
                var query = sails.config.course_querys.list_x_user_query.replace('?', reqParams.user_id);
                Course.query(query, function (err, result) {
                    if (err) {
                        dataResponse.res_service = "Error listando los cursos.";
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
    detailsupdate: function(req, res){
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
                var query = sails.config.course_querys.details_query;
                var query = 'select * from tbl_course p where p.cor_id = ' + dataDetails.cor_id;
                Course.query(query, function (err, result) {
                    if (err) {
                        dataResponse.res_service = "Error listando los cursos.";
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
    details: function(req, res)
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
                var dataDetails = req.allParams();
                var query = sails.config.course_querys.details_query;
                var query = query.replace('?', dataDetails.cor_id);
                Course.query(query, function (err, result) {
                    if (err) {
                        dataResponse.res_service = "Error listando los cursos.";
                        dataResponse.des_error = err;
                        res.json(dataResponse)
                    }
                    if(result.rows.length>0){
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
    listcateg: function(req, res)
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
                var dataDetails = req.allParams();
                Course.find({ est_registro: 1, cat_cor_id: dataDetails.cat_cor_id },
                    {
                        select: ['cor_id', 'cor_name', 'cor_des',
                            'cor_fec_ini', 'cor_fec_fin', 'cor_price',
                            'cor_state', 'user_reg_id', 'user_doc_id',
                            'cat_cor_id']
                    })
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
                        dataResponse.res_service = "Error listando los cursos por categoría.";
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
                    est_registro : 0
                }
                var filterUpdate = {
                    cor_id: dataRequest.cor_id
                }
                Course.update(filterUpdate, dataUpdate)
                    .then(function (response) {
                        if (response.length > 0) {
                            dataResponse.res_service = "ok";
                            res.json(dataResponse);
                        } else {
                            dataResponse.res_service = "No se eliminó el curso.";
                            res.json(dataResponse);
                        }
                    })
                    .catch(function (err) {
                        dataResponse.res_service = "Error eliminando el curso.";
                        dataResponse.des_error = err;
                        res.json(dataResponse);
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
                    cor_id: dataRequest.cor_id
                }
                Course.update(filterUpdate, dataUpdate)
                    .then(function (response) {
                        if (response.length > 0) {
                            dataResponse.res_service = "ok";
                            res.json(dataResponse);
                        } else {
                            dataResponse.res_service = "No se habilito el curso.";
                            res.json(dataResponse);
                        }
                    })
                    .catch(function (err) {
                        dataResponse.res_service = "Error habilito el curso.";
                        dataResponse.des_error = err;
                        res.json(dataResponse);
                    });
            }
        });
    },
};

