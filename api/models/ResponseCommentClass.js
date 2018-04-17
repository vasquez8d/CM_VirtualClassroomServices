/**
 * ResponseCommentClass.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {
  tableName: 'tbl_response_comment',
  attributes: {
    res_id: {
      primaryKey: true,
      unique: true,
      autoIncrement: true,
      type: "integer"
    },
    res_text: 'string',
    res_likes: 'string',
    res_user_id: 'string',
    com_id: 'integer',
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
  },
  autoCreatedAt: false,
  autoUpdatedAt: false
};
