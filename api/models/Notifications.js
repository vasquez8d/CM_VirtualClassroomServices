/**
 * Notifications.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {
  tableName: 'tbl_notifications',
  attributes: {
    notf_id: {
      primaryKey: true,
      unique: true,
      autoIncrement: true,
      type: "integer"
    },
    notf_text: 'string',
    user_id: 'integer',
    notf_flg_view: 'string',
    notf_redirect: 'string',
    notf_icon: 'string',
    est_registro: 'integer',
    fec_registro: 'datetime',
    usu_registro: 'string'
  },
  autoCreatedAt: false,
  autoUpdatedAt: false
};
