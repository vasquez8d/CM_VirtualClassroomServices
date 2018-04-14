/**
 * Course.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {
  tableName: 'tbl_course',
  attributes: {
    cor_id: {
      primaryKey: true,
      unique: true,
      autoIncrement: true,
      type: "integer"
    },
    cor_name: 'string',
    cor_des: 'string',
    cor_fec_ini: {
      type: 'datetime'
    },
    cor_fec_fin: 'datetime',
    cor_price: 'decimal',
    cor_state: 'string',
    user_reg_id: 'integer',
    user_doc_id: 'integer',
    cat_cor_id: 'integer',
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
    },
    cor_photo: {
      type: 'string',
      defaultsTo: '/images/courses/default.jpg'
    },
    cor_intro: 'string'
  },
  autoCreatedAt: false,
  autoUpdatedAt: false
};

