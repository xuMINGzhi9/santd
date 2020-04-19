"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _san = _interopRequireWildcard(require("san"));

var _util = require("../core/util");

var _empty = _interopRequireDefault(require("./empty.svg"));

var _simple = _interopRequireDefault(require("./simple.svg"));

var _receiver = _interopRequireDefault(require("../localeprovider/receiver"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

/**
 * @file 组件 empty
 * @author chenkai13 <chenkai13@baidu.com>
 */
var prefixCls = (0, _util.classCreator)('empty')();

var Empty = _san["default"].defineComponent({
  dataTypes: {
    imageStyle: _san.DataTypes.oneOfType([_san.DataTypes.string, _san.DataTypes.object]),
    image: _san.DataTypes.string,
    description: _san.DataTypes.oneOfType([_san.DataTypes.string, _san.DataTypes.bool])
  },
  initData: function initData() {
    return {
      componentName: 'Empty',
      image: _empty["default"],
      simpleEmptyImg: _simple["default"]
    };
  },
  inited: function inited() {
    this.data.set('hasDescription', !!this.sourceSlots.named.description);

    _receiver["default"].inited.call(this);
  },
  computed: _receiver["default"].computed,
  template: "\n        <div class=\"".concat(prefixCls, "{{image === simpleEmptyImg ? ' ").concat(prefixCls, "-normal' : ''}}{{small ? ' ").concat(prefixCls, "-small' : ''}}\">\n            <div class=\"").concat(prefixCls, "-image\" style=\"{{imageStyle}}\">\n                <img s-if=\"image\" src=\"{{image}}\" alt=\"{{description || locale.description || 'empty'}}\" />\n            </div>\n            <p class=\"").concat(prefixCls, "-description\" s-if=\"hasDescription || description !== false\">\n                <slot name=\"description\" s-if=\"hasDescription\" />\n                <template s-else>\n                    {{description || locale.description}}\n                </template>\n            </p>\n        </div>\n    ")
});

Empty.PRESENTED_IMAGE_DFEAULT = _empty["default"];
Empty.PRESENTED_IMAGE_SIMPLE = _simple["default"];
var _default = Empty;
exports["default"] = _default;