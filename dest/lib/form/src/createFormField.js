"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isFormField = isFormField;
exports["default"] = createFormField;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * @file Santd form createFormField
 * @author mayihui@baidu.com
 **/
var Field = function Field(fields) {
  _classCallCheck(this, Field);

  Object.assign(this, fields);
};

function isFormField(field) {
  return field instanceof Field;
}

function createFormField(field) {
  if (isFormField(field)) {
    return field;
  }

  return new Field(field);
}