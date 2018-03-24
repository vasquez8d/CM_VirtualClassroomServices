/**
 * User.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {
  // connection: "somePostgresqlServer",
  tableName: 'tbl_users',
  attributes: {
    user_id: {
      primaryKey: true,
      unique: true,
      autoIncrement: true,
      type: 'integer'
    },
    user_mail: {
      type: 'string',
      required: true,
      unique: true
    },
    user_pw: {
      type: 'string',
      required: true
    },
    user_pri_nom: {
      type: 'string',
      required: true
    },
    user_seg_nom: 'string',
    user_ape_pat: {
      type: 'string',
      required: true
    },
    user_ape_mat: 'string',
    user_fec_nac: 'datetime',
    user_ubigeo : 'string',
    user_num_cell: 'string',
    user_num_fijo: 'string',
    user_ult_con: 'datetime',
    user_desc: 'string',
    rol_id: {
      type: 'integer',
      required: true
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

