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
    },
    user_reg_provider: {
      type: 'string'
    },
    user_reg_provider_id : {
      type: 'string'
    },
    user_dpt : {
      type: 'string'
    },
    user_prv : {
      type: 'string'
    },
    user_dst : {
      type: 'string'
    },
    user_dir : {
      type: 'string'
    },
    user_tim_aca : {
      type: 'string'
    },
    user_est_civil : {
      type: 'string'
    },
    user_flg_hijos : {
      type: 'string'
    },
    user_flg_vsolo : {
      type: 'string'
    },
    user_flg_inter : {
      type: 'string'
    },
    user_reg_provider_photo : {
      type: 'string'
    }
  },
  autoCreatedAt: false,
  autoUpdatedAt: false
};

