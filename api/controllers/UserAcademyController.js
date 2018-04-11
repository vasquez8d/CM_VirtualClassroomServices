/**
 * UserAcademyController
 *
 * @description :: Server-side logic for managing Useracademies
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

var jwt = require('jsonwebtoken');

module.exports = {
	detailsacademyupdate: function(req, res){
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
                    UserAcademy.find({ user_id: dataDetails.user_id, est_registro: 1 },
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

