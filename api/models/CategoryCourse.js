/**
 * CategoryCourse.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {
  tableName: 'tbl_cat_course',
  attributes: {
    cat_cor_id: {
      primaryKey: true,
      unique: true,
      autoIncrement: true,
      type: "integer"
    },
    cat_cor_name: 'string',
    est_registro: 'integer',
    fec_registro: 'datetime',
    usu_registro: 'string'
  },
  autoCreatedAt: false,
  autoUpdatedAt: false
};

