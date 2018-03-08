/**
 * Messages.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {
  tableName: 'tbl_messages',
  attributes: {
    msg_id: {
      primaryKey: true,
      unique: true,
      autoIncrement: true,
      type: "integer"
    },
    msg_text: 'string',
    msg_flg_view: 'string',
    user_sed: 'integer', //Envia
    user_rec: 'integer', //Recibe
    est_registro: 'integer',
    fec_registro: 'datetime',
    usu_registro: 'string'
  },
  autoCreatedAt: false,
  autoUpdatedAt: false
};
