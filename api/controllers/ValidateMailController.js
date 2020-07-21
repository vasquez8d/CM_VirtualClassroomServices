/**
 * ValidateMailController
 *
 * @description :: Server-side logic for managing Validatemails
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

const nodemailer = require('nodemailer');
const handlebars = require('handlebars');
const fs = require('fs');

module.exports = {
    validatemailwoauth: function(req, res){
        var dataResponse = {
            data_result: "",
            res_service: "",
            des_error: ""
        };
        var dataValidate = req.allParams();
        try{
            var randomCode = Math.floor(100000 + Math.random() * 900000);
            var dataCreateValidate = {
                'val_code' : randomCode,
                'val_status' : '0',
                'val_email' : dataValidate.user_mail,
                'usu_registro' : 'web'
            }
            ValidateMail.create(dataCreateValidate, function (err, response) {
                if (err) {
                    dataResponse.res_service = "Error registrando la validación.";
                    dataResponse.des_error = err;
                    res.json(dataResponse);
                } else {
                    if (response.val_id > 0) {
                        response.save();
                        dataResponse.data_result = response;
                        dataResponse.res_service = "ok";
                        
                        // SEND MAIL =========
                        var readHTMLFile = function(path, callback) {
                            fs.readFile(path, {encoding: 'utf-8'}, function (err, html) {
                                if (err) {
                                    throw err;
                                }
                                else {
                                    callback(null, html);
                                }
                            });
                        };
                        // var transporter = nodemailer.createTransport({
                        //     host: 'smtp.gmail.com',
                        //     auth: {
                        //         type: "OAuth2",
                        //         user: "vasquez9d@gmail.com",
                        //         clientId: "1032639250330-1vsu6lu6alsdahv1e5ommkhse3jcpi5i.apps.googleusercontent.com",
                        //         clientSecret: "osOOEMGnDunC2KqvtnOC046l",
                        //         refreshToken: "1/R0NDCxCzavaN5sQx4hMdWFsi-WXi4QpeP_rbrig-d5U"                              
                        //     }
                        // });
                        const transporter = nodemailer.createTransport({
                            service: 'gmail',
                            auth: {
                              user: 'vasquez9d@gmail.com',
                              pass: 'jdqlmorogwcytslu' // naturally, replace both with your real credentials or an application-specific password
                            }
                          });

                        readHTMLFile('assets/templates/tmp_velidacion_mail.html', 
                            function(err, html) {
                                var template = handlebars.compile(html);
                                var replacements = {
                                    codigo: randomCode
                                };
                                var htmlToSend = template(replacements);
                                var mailOptions = {
                                    from: 'Clinical Medic - Seguridad <vasquez9d@gmail.com>',
                                    to: dataValidate.user_mail,
                                    subject: 'Validación de correo electrónico',
                                    html: htmlToSend
                                };
                                transporter.sendMail(mailOptions, function (error, response) {
                                    if (error) {
                                        callback(error);
                                    }
                                });
                            });
                        // ===================
                        res.json(dataResponse);
                    } else {
                        dataResponse.res_service = 'No se registró la validación.';
                        res.json(dataResponse);
                    }
                }
            });
        }catch(err){
            res.json(err);
        }
    }
};

