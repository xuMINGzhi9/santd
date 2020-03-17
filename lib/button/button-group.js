"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _san = _interopRequireWildcard(require("san"));

var _index = require("../core/util/index");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

/**
 * @file button group
 * @author fuqiangqiang@baidu.com
 */
var PREFIX_CLASS = (0, _index.classCreator)('btn-group')();

var _default = _san["default"].defineComponent({
  dataTypes: {
    size: _san.DataTypes.string
  },
  initData: function initData() {
    return {
      sizeMap: {
        large: 'lg',
        small: 'sm'
      }
    };
  },
  computed: {
    classes: function classes() {
      var arr = [PREFIX_CLASS];
      var size = this.data.get('sizeMap')[this.data.get('size')];
      size && arr.push("".concat(PREFIX_CLASS, "-").concat(size));
      return arr;
    }
  },
  template: "\n        <div class=\"{{classes}}\" style=\"font-size:0;\"><slot/></div>\n    "
});

exports["default"] = _default;