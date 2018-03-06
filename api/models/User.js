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
      type: "integer"
    },
    user_mail: 'string',
    user_pw: 'string',
    user_pri_nom: 'string',
    user_seg_nom: 'string',
    user_ape_pat: 'string',
    user_ape_mat: 'string',
    user_fec_nac: 'datetime',
    user_ubigeo : 'string',
    user_num_cell: 'string',
    user_num_fijo: 'string',
    user_ult_con: 'datetime',
    user_desc: 'string',
    rol_id: 'integer',
    est_registro: 'integer',
    fec_registro: 'datetime',
    usu_registro: 'string'
  },
  autoCreatedAt: false,
  autoUpdatedAt: false
};

