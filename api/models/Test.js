/**
 * Test.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  tableName: 'tbl_tests',
  attributes: {
    test_id: {
      primaryKey: true,
      unique: true,
      autoIncrement: true,
      type: "integer"
    },
    test_type_id: 'integer',
    test_num_ques: 'integer',
    test_time: 'integer',
    user_id: 'integer',
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
    test_result: 'decimal',
    test_time_end: 'integer',
    test_num_ques_end: 'integer'
  },
  autoCreatedAt: false,
  autoUpdatedAt: false
};
