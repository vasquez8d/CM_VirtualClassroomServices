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
    cor_price: 'double',
    cor_state: 'string',
    user_reg_id: 'integer',
    user_doc_id: 'integer',
    cat_cor_id: 'integer',
    est_registro: 'integer',
    fec_registro: 'datetime',
    usu_registro: 'string'
  },
  autoCreatedAt: false,
  autoUpdatedAt: false
};

