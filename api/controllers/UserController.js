/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	test: function(req, res) {
        User
        .find({select: ['user_mail']})
        .then(function(registros){
            res.json(registros);
        })
        .catch(function(err){
            res.negotiate(err);
        })
    }
};

