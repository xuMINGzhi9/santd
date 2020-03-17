"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _san = _interopRequireWildcard(require("san"));

var _util = require("../core/util");

var _item = _interopRequireDefault(require("./item"));

var _icon = _interopRequireDefault(require("../icon"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

/**
 * @file 组件 timeline
 * @author chenkai13 <chenkai13@baidu.com>
 */
var prefixCls = (0, _util.classCreator)('timeline')();

var _default = _san["default"].defineComponent({
  dataTypes: {
    reverse: _san.DataTypes.bool,
    mode: _san.DataTypes.oneOf(['left', 'alternate', 'right'])
  },
  computed: {
    classes: function classes() {
      var hasPending = this.data.get('hasPending');
      var reverse = this.data.get('reverse');
      var mode = this.data.get('mode');
      var classArr = [prefixCls];
      hasPending && classArr.push("".concat(prefixCls, "-pending"));
      reverse && classArr.push("".concat(prefixCls, "-reverse"));
      mode && classArr.push("".concat(prefixCls, "-").concat(mode));
      return classArr;
    }
  },
  initData: function initData() {
    return {
      reverse: false,
      mode: 'left'
    };
  },
  updated: function updated() {
    var _this = this;

    var reverse = this.data.get('reverse');
    var hasPending = this.data.get('hasPending');
    var lastClasses = "".concat(prefixCls, "-item-last");
    this.items.forEach(function (child, index) {
      var className = [!reverse && !!hasPending ? index === _this.items.length - 2 ? lastClasses : '' : index === _this.items.length - 1 ? lastClasses : '', _this.getPositionCls(child, index)].join(' ');
      child.data.set('class', className);
    });
  },
  inited: function inited() {
    var _this2 = this;

    this.items = [];
    this.data.set('hasPending', !!this.sourceSlots.named.pending);
    this.data.set('hasPendingDot', !!this.sourceSlots.named.pendingDot);
    this.watch('reverse', function (val) {
      _this2.sourceSlots.noname = _this2.sourceSlots.noname.reverse();

      _this2._repaintChildren();
    });
  },
  attached: function attached() {
    this.updated();
  },
  getPositionCls: function getPositionCls(child, index) {
    var mode = this.data.get('mode');
    var position = child.data.get('position');

    if (mode) {
      return mode === 'alternate' ? position ? "".concat(prefixCls, "-item-").concat(position) : index % 2 === 0 ? "".concat(prefixCls, "-item-left") : "".concat(prefixCls, "-item-right") : "".concat(prefixCls, "-item-").concat(mode);
    }

    return position === 'right' ? "".concat(prefixCls, "-item-right") : '';
  },
  messages: {
    santd_timeline_addItem: function santd_timeline_addItem(payload) {
      this.items.push(payload.value);
    }
  },
  components: {
    's-item': _item["default"],
    's-icon': _icon["default"]
  },
  template: "\n        <ul class=\"{{classes}}\">\n            <template s-if=\"!reverse\">\n                <slot />\n                <s-item s-if=\"hasPending\" pending=\"{{hasPending}}\">\n                    <slot name=\"pending\" />\n                    <slot name=\"pendingDot\" slot=\"dot\" s-if=\"hasPendingDot\" />\n                    <s-icon type=\"loading\" slot=\"dot\" s-else />\n                </s-item>\n            </template>\n            <template s-else>\n                <s-item s-if=\"hasPending\" pending=\"{{hasPending}}\">\n                    <slot name=\"pending\" />\n                    <slot name=\"pendingDot\" slot=\"dot\" s-if=\"hasPendingDot\" />\n                    <s-icon type=\"loading\" slot=\"dot\" s-else />\n                </s-item>\n                <slot />\n            </template>\n        </ul>\n    "
});

exports["default"] = _default;