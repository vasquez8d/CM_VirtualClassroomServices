/**
 * UserAcademy.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  tableName: 'tbl_user_academy',
  attributes: {
    user_id: {
      primaryKey: true,
      unique: true,
      autoIncrement: true,
      type: 'integer'
    },
    user_pri_esp: 'string',
    user_seg_esp: 'string',
    user_pri_uni: 'string',
    user_seg_uni: 'string',
    user_flg_qto_sup : 'string',
    user_uni_prc : 'string',
    est_registro: {
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

