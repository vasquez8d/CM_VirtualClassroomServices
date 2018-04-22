/**
 * MatCourse.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {
  tableName: 'tbl_mat_course',
  attributes: {
    mat_id: {
      primaryKey: true,
      unique: true,
      autoIncrement: true,
      type: "integer"
    },
    cor_id: 'integer',
    user_alu_id: 'integer',
    user_reg_id: 'integer',
    mat_state: {
      type: 'string',
      defaultsTo: 0
    },
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
    mat_voucher_img: 'string'
  },
  autoCreatedAt: false,
  autoUpdatedAt: false
};

