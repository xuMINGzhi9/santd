"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _san = _interopRequireWildcard(require("san"));

var _util = require("../core/util");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

/**
 * @file 组件 divider
 */
var prefixCls = (0, _util.classCreator)('divider')();

var _default = _san["default"].defineComponent({
  dataTypes: {
    type: _san.DataTypes.oneOf(['horizontal', 'vertical']),
    orientation: _san.DataTypes.oneOf(['right', 'left', '']),
    dashed: _san.DataTypes.bool
  },
  initData: function initData() {
    return {
      type: 'horizontal'
    };
  },
  computed: {
    classes: function classes() {
      var dashed = this.data.get('dashed');
      var type = this.data.get('type');
      var orientation = this.data.get('orientation');
      var hasSlot = this.data.get('hasSlot');
      var classArr = [prefixCls];
      !!type && classArr.push("".concat(prefixCls, "-").concat(type));
      dashed && classArr.push("".concat(prefixCls, "-dashed"));
      hasSlot && !orientation && classArr.push("".concat(prefixCls, "-with-text"));
      hasSlot && orientation && classArr.push("".concat(prefixCls, "-with-text-").concat(orientation));
      return classArr;
    }
  },
  inited: function inited() {
    this.data.set('hasSlot', !!this.sourceSlots.noname);
  },
  template: "\n        <div class=\"{{classes}}\">\n            <span s-if=\"hasSlot\" class=\"".concat(prefixCls, "-inner-text\">\n                <slot />\n            </span>\n      </div>\n      ")
});

exports["default"] = _default;