/**
 * ValidateMail.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  tableName: 'tbl_validate_mail',
  attributes: {
    val_id: {
      primaryKey: true,
      unique: true,
      autoIncrement: true,
      type: 'integer'
    },
    val_code: 'string',
    val_status: 'string',
    val_email: {
      type: 'string',
      required: true,
      unique: true
    },
    est_registro:  {
      type: 'integer',
      defaultsTo: 1
    },
    fec_registro: {
      type: 'datetime',
      defaultsTo: function () {
        return new Date();
      }
    },
    usu_registro: {
      type: 'string',
      required: true
    }
  },
  autoCreatedAt: false,
  autoUpdatedAt: false
};

