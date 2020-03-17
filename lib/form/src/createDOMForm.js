"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = _default;

var _domScrollIntoView = _interopRequireDefault(require("dom-scroll-into-view"));

var _createBaseForm = _interopRequireDefault(require("./createBaseForm"));

var _utils = require("./utils");

var _has = _interopRequireDefault(require("lodash/has"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var mixin = {
  validateFieldsAndScroll: function validateFieldsAndScroll(ns, opt, cb) {
    var _getParams = (0, _utils.getParams)(ns, opt, cb),
        names = _getParams.names,
        options = _getParams.options;

    var that = this;

    var newCb = function newCb(error, values) {
      if (error) {
        var fieldsStore = that.data.get('fieldsStore');
        var validNames = fieldsStore.getValidFieldsName();
        var firstNode;
        var firstTop;
        validNames.forEach(function (name) {
          if ((0, _has["default"])(error, name)) {
            var instance = that.getFieldInstance(name);

            if (instance) {
              var node = instance.el;
              var top = node.getBoundingClientRect().top;

              if (node.type !== 'hidden' && (firstTop === undefined || firstTop > top)) {
                firstTop = top;
                firstNode = node;
              }
            }
          }
        });

        if (firstNode) {
          var c = options.container || (0, _utils.getScrollableContainer)(firstNode);
          (0, _domScrollIntoView["default"])(firstNode, c, _objectSpread({
            onlyScrollIfNeeded: true
          }, options.scroll));
        }
      }
    };

    return this.validateFields(names, options, newCb);
  }
};

function _default(options) {
  return (0, _createBaseForm["default"])(_objectSpread({}, options), [mixin]);
}