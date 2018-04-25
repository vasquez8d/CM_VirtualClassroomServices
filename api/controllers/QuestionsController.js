/**
 * QuestionsController
 *
 * @description :: Server-side logic for managing Questions
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

var excel2Json = require('node-excel-to-json');
var jwt = require('jsonwebtoken');
var fs = require('fs');

module.exports = {
    upload: function (req, res) {
        var dataResponse = {
            data_result: "",
            res_service: "ok",
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
                        dirname: '../../assets/temp_data/',
                    }, function (err, file) {
                        if (err) {
                            dataResponse.res_service = "Error subiendo el excel";
                            dataResponse.des_error = err;
                            res.json(dataResponse)
                        }
                        var pathFileName = file[0].fd.split('/').reverse()[0];
                        var filename = pathFileName.replace(/^.*[\\\/]/, '');
                        var cor_photo = '../../../assets/temp_data/' + filename;
                        var deleted_file_path = 'assets/temp_data/' + filename;
                        excel2Json(cor_photo, {
                            'convert_all_sheet': false,
                            'return_type': 'Object',
                            'sheetName': 'survey'
                        }, function (err, output) {

                            if (err) {
                                dataResponse.res_service = "Error";
                                res.json(dataResponse)
                            }
                            var DataUpload = {
                                data_file_name: req.file('image')._files[0].stream.filename,
                                data_rows : output.length,
                                usu_registro : 'web'
                            }
                            var index = 0;
                            QuestionsUpload.create(DataUpload, function (err, responseHeader) {
                                if (err) {
                                    dataResponse.res_service = "Error insertando el banco de preguntas cabecera";
                                    dataResponse.des_error = err;
                                    res.json(dataResponse);
                                } else {
                                    responseHeader.save();                                  
                                    output.forEach(element => {
                                        index = index + 1;
                                        element["usu_registro"] = "web"; 
                                        element["row_num"] = index;
                                        element["data_id"] = responseHeader.data_id;                                     
                                        Questions.create(element, function (err, response) {
                                            if (err) {
                                                dataResponse.res_service = "Error insertando el banco de preguntas detalle";
                                                dataResponse.des_error = err;
                                            } else {                                                
                                                response.save();
                                            }
                                        });
                                    });
                                }
                            });

                            dataResponse.data_result = output;
                            fs.unlinkSync(deleted_file_path);
                            res.json(dataResponse);
                        });
                    });
                } else {
                    dataResponse.res_service = "No existe archivo";
                    res.json(dataResponse)
                }
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
                    data_id: dataUpdate.data_id,
                    ques_id: dataUpdate.ques_id
                }
                Questions.update(filterUpdate, dataUpdate)
                    .then(function (response) {
                        if (response.length > 0) {
                            dataResponse.data_result = response[0];
                            dataResponse.res_service = "ok";
                            res.json(dataResponse)
                        } else {
                            dataResponse.res_service = 'No se actualizó la pregunta.';
                            res.json(dataResponse)
                        }
                    })
                    .catch(function (err) {
                        console.log(err);
                        dataResponse.res_service = "Error actualizando la pregunta.";
                        dataResponse.des_error = err;
                        res.json(dataResponse)
                    });
            }
        });
    },
    listuploads: function(req, res){
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
                var query = sails.config.querys.ques_list_query;
                Course.query(query, function (err, result) {
                    if (err) {
                        dataResponse.res_service = "Error listando las cargas.";
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
    listuploadsdetails: function(req, res){
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
                var query = sails.config.querys.ques_list_det_query.replace('?', dataReq.data_id);
                Course.query(query, function (err, result) {
                    if (err) {
                        dataResponse.res_service = "Error listando las cargas detalle.";
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
    uploaddetails: function(req, res){
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
                var query = sails.config.querys.ques_upload_ques_details.replace('?', dataReq.data_id).replace('??', dataReq.ques_id);
                Course.query(query, function (err, result) {
                    if (err) {
                        dataResponse.res_service = "Error listando las cargas detalle.";
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
    disableupload: function(req, res){
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
                    data_id: dataRequest.data_id
                }
                QuestionsUpload.update(filterUpdate, dataUpdate)
                    .then(function (response) {
                        if (response.length > 0) {
                            dataResponse.res_service = "ok";
                            res.json(dataResponse);
                        } else {
                            dataResponse.res_service = "No se eliminó la carga.";
                            res.json(dataResponse);
                        }
                    })
                    .catch(function (err) {
                        dataResponse.res_service = "Error eliminando la carga.";
                        dataResponse.des_error = err;
                        res.json(dataResponse);
                    });
            }
        });
    },
    enableupload: function(req, res){
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
                    data_id: dataRequest.data_id
                }
                QuestionsUpload.update(filterUpdate, dataUpdate)
                    .then(function (response) {
                        if (response.length > 0) {
                            dataResponse.res_service = "ok";
                            res.json(dataResponse);
                        } else {
                            dataResponse.res_service = "No se habilitó la carga.";
                            res.json(dataResponse);
                        }
                    })
                    .catch(function (err) {
                        dataResponse.res_service = "Error habilitó la carga.";
                        dataResponse.des_error = err;
                        res.json(dataResponse);
                    });
            }
        });
    },
    disableuploaddet: function (req, res) {
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
                    data_id: dataRequest.data_id,
                    ques_id: dataRequest.ques_id
                }
                Questions.update(filterUpdate, dataUpdate)
                    .then(function (response) {
                        if (response.length > 0) {
                            dataResponse.res_service = "ok";
                            res.json(dataResponse);
                        } else {
                            dataResponse.res_service = "No se eliminó la carga.";
                            res.json(dataResponse);
                        }
                    })
                    .catch(function (err) {
                        dataResponse.res_service = "Error eliminando la carga.";
                        dataResponse.des_error = err;
                        res.json(dataResponse);
                    });
            }
        });
    },
    enableuploaddet: function (req, res) {
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
                    data_id: dataRequest.data_id,
                    ques_id: dataRequest.ques_id
                }
                Questions.update(filterUpdate, dataUpdate)
                    .then(function (response) {
                        if (response.length > 0) {
                            dataResponse.res_service = "ok";
                            res.json(dataResponse);
                        } else {
                            dataResponse.res_service = "No se habilitó la carga.";
                            res.json(dataResponse);
                        }
                    })
                    .catch(function (err) {
                        dataResponse.res_service = "Error habilitó la carga.";
                        dataResponse.des_error = err;
                        res.json(dataResponse);
                    });
            }
        });
    }
};
