"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = _default;

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * @file Santd inherits file
 * @author mayihui@baidu.com
 **/
function _default(subClass, superClass) {
  var newSubClassProto = subClass.prototype;

  for (var i in superClass.prototype) {
    if (superClass.prototype.hasOwnProperty(i) && i !== 'constructor') {
      (function () {
        var newProto = newSubClassProto[i];
        var superProto = superClass.prototype[i];

        if (typeof superProto === 'function') {
          newSubClassProto[i] = function () {
            var superProtoValue = superProto && superProto.bind(this).apply(void 0, arguments);
            var newProtoValue = newProto && newProto.bind(this).apply(void 0, arguments);

            if (Object.prototype.toString.call(superProtoValue) === '[object Object]') {
              return _objectSpread(_objectSpread({}, superProtoValue), newProtoValue);
            }

            return newProtoValue || superProtoValue;
          };
        } else if (_typeof(newProto) === 'object') {
          newSubClassProto[i] = _objectSpread(_objectSpread({}, superProto), newProto);
        } else {
          newSubClassProto[i] = superProto;
        }
      })();
    }
  }

  return subClass;
}