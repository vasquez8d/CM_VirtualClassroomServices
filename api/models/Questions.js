/**
 * Questions.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  tableName: 'tbl_data_questions_det',
  attributes: {
    ques_id: {
      primaryKey: true,
      unique: true,
      autoIncrement: true,
      type: "integer"
    },
    data_id: {
      type: "integer"
    },
    row_num: {
      type: "integer"
    },
    ques_name: 'string',
    cat_cor_id: 'integer',
    ques_question: 'string',
    ques_res1: 'string',
    ques_res2: 'string',
    ques_res3: 'string',
    ques_res4: 'string',
    ques_res5: 'string',
    ques_ok: 'string',
    est_registro: {
      type: 'integer',
      defaultsTo: 1
    },
    fec_reistro: {
      type: 'datetime',
      defaultsTo: function () {
        return new Date();
      }
    },
    usu_registro: {
      type: 'string',
      required: true
    }
  },
  autoCreatedAt: false,
  autoUpdatedAt: false
};

