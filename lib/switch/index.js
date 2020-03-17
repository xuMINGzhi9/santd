"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _san = _interopRequireWildcard(require("san"));

var _icon = _interopRequireDefault(require("../icon"));

var _util = require("../core/util");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

/**
 * @file 组件 switch
 * @author panming <panming@baidu.com>
 */
var prefixCls = (0, _util.classCreator)('switch')();

var _default = _san["default"].defineComponent({
  dataTypes: {
    disabled: _san.DataTypes.bool,
    checkedChildren: _san.DataTypes.string,
    unCheckedChildren: _san.DataTypes.string,
    checked: _san.DataTypes.bool,
    defaultChecked: _san.DataTypes.bool,
    autoFocus: _san.DataTypes.bool,
    loading: _san.DataTypes.bool,
    tabIndex: _san.DataTypes.oneOfType([_san.DataTypes.string, _san.DataTypes.number])
  },
  components: {
    's-icon': _icon["default"]
  },
  initData: function initData() {
    return {
      sizeMap: {
        large: 'lg',
        small: 'small'
      },
      disabled: false,
      defaultChecked: false,
      checked: false,
      loading: false
    };
  },
  inited: function inited() {
    this.data.set('checked', this.data.get('checked') || this.data.get('defaultChecked'));
  },
  computed: {
    classes: function classes() {
      var data = this.data;
      var checked = data.get('checked');
      var disabled = data.get('disabled');
      var size = data.get('sizeMap')[data.get('size')];
      var loading = data.get('loading');
      var block = data.get('block');
      var classArr = [prefixCls];
      !!checked && classArr.push("".concat(prefixCls, "-checked"));
      !!disabled && classArr.push("".concat(prefixCls, "-disabled"));
      !!size && classArr.push("".concat(prefixCls, "-").concat(size));
      !!loading && classArr.push("".concat(prefixCls, "-loading"));
      !!block && classArr.push("".concat(prefixCls, "-block"));
      return classArr;
    }
  },
  attached: function attached() {
    var _this = this;

    this.nextTick(function () {
      var autoFocus = _this.data.get('autoFocus');

      var disabled = _this.data.get('disabled');

      if (autoFocus && !disabled) {
        _this.focus();
      }
    });
  },
  setChecked: function setChecked(checked) {
    if (this.data.get('disabled')) {
      return;
    }

    if (!this.data.get('disabled')) {
      this.data.set('checked', checked);
    }

    this.fire('change', checked);
    this.dispatch('UI:form-item-interact', {
      fieldValue: checked,
      type: 'change'
    });
  },
  toggle: function toggle() {
    var checked = !this.data.get('checked');
    this.setChecked(checked);
    this.fire('click', checked);
  },
  handleKeyDown: function handleKeyDown(e) {
    if (e.keyCode === 37) {
      // Left
      this.setChecked(false);
    } else if (e.keyCode === 39) {
      // Right
      this.setChecked(true);
    } else if (e.keyCode === 32 || e.keyCode === 13) {
      // Space, Enter
      this.toggle();
    }
  },
  focus: function focus() {
    this.el.focus();
  },
  blur: function blur() {
    this.el.blur();
  },
  handleMouseUp: function handleMouseUp(e) {
    this.el.blur();
    this.fire('mouseup', e);
  },
  template: "\n        <span\n            disabled=\"{{disabled}}\"\n            class=\"{{classes}}\"\n            on-click=\"toggle\"\n            on-keydown=\"handleKeyDown\"\n            on-mouseUp=\"handleMouseUp\"\n            tabIndex=\"{{disabled ? -1 : tabIndex || 0}}\"\n        >\n            <span class=\"".concat(prefixCls, "-handler\" s-if=\"{{loading}}\">\n                <s-icon type=\"loading\" />\n            </span>\n            <span class=\"").concat(prefixCls, "-inner\">\n                <template s-if=\"checked && checkedChildren\">{{checkedChildren}}</template>\n                <slot name=\"checkedChildren\" s-else-if=\"checked\" />\n                <template s-if=\"!checked && unCheckedChildren\">{{unCheckedChildren}}</template>\n                <slot name=\"unCheckedChildren\" s-else-if=\"!checked\" />\n            </span>\n        </span>\n    ")
});

exports["default"] = _default;