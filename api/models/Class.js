/**
 * Class.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {
  tableName: 'tbl_class',
  attributes: {
    class_id: {
      primaryKey: true,
      unique: true,
      autoIncrement: true,
      type: "integer"
    },
    class_tittle: 'string',
    class_desc: 'string',
    class_video_embed: 'string',
    cor_id: 'integer',
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
    },
    usu_reg_id: {
      type: 'integer'
    },
    class_time: 'decimal',
    class_file: 'string',
    class_file_flag: {
      type: 'integer',
      defaultsTo: 0
    },
    class_file_name: 'string',
    class_video_type: 'integer'
  },
  autoCreatedAt: false,
  autoUpdatedAt: false
};