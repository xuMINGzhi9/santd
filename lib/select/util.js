"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.toTitle = toTitle;
exports.toArray = toArray;
exports.getPropValue = getPropValue;
exports.getMapKey = getMapKey;
exports.preventDefaultEvent = preventDefaultEvent;
exports.includesSeparators = includesSeparators;
exports.splitBySeparators = splitBySeparators;
exports.generateUUID = generateUUID;
exports.defaultFilterFn = defaultFilterFn;
exports.dropdownPrefixCls = exports.emptyPrefixCls = exports.prefixCls = void 0;

var _util = require("../core/util");

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var prefixCls = (0, _util.classCreator)('select')();
exports.prefixCls = prefixCls;
var emptyPrefixCls = (0, _util.classCreator)('empty')();
exports.emptyPrefixCls = emptyPrefixCls;
var dropdownPrefixCls = "".concat(prefixCls, "-dropdown");
exports.dropdownPrefixCls = dropdownPrefixCls;

function toTitle(title) {
  if (typeof title === 'string') {
    return title;
  }

  return '';
}

function toArray(value) {
  var ret = value;

  if (value === undefined) {
    ret = [];
  } else if (!Array.isArray(value)) {
    ret = [value];
  }

  return ret;
}

function getPropValue(child, prop) {
  if (prop === 'children') {
    return child.el.innerText;
  }

  return child.data.get(prop);
}

function getMapKey(value) {
  return "".concat(_typeof(value), "-").concat(value);
}

function preventDefaultEvent(e) {
  e.preventDefault();
}

function includesSeparators(str, separators) {
  for (var i = 0; i < separators.length; ++i) {
    if (str.lastIndexOf(separators[i]) > 0) {
      return true;
    }
  }

  return false;
}

function splitBySeparators(str, separators) {
  var reg = new RegExp("[".concat(separators.join(), "]"));
  return str.split(reg).filter(function (token) {
    return token;
  });
}

function generateUUID() {
  var d = new Date().getTime();
  var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    var r = (d + Math.random() * 16) % 16 | 0;
    d = Math.floor(d / 16);
    return (c === 'x' ? r : r & 0x7 | 0x8).toString(16);
  });
  return uuid;
}

function defaultFilterFn(input, child, optionFilterProp) {
  if (child.data.get('disabled')) {
    return false;
  }

  var value = getPropValue(child, optionFilterProp);
  return value.toLowerCase().indexOf(input.toLowerCase()) > -1;
}