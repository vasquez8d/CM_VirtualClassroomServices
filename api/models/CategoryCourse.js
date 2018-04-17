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
    cat_cor_desc: 'string',
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
    cat_color: {
      type: 'string',
      defaultsTo: '#CEF6F5'
    }
  },
  autoCreatedAt: false,
  autoUpdatedAt: false
};

