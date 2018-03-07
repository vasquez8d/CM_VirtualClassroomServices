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
    mat_state: 'string',
    est_registro: 'integer',
    fec_registro: 'datetime',
    usu_registro: 'string'
  },
  autoCreatedAt: false,
  autoUpdatedAt: false
};

