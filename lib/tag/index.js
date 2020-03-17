"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _san = _interopRequireWildcard(require("san"));

var _checkableTag = _interopRequireDefault(require("./checkableTag"));

var _util = require("../core/util");

var _wave = _interopRequireDefault(require("../core/util/wave"));

var _icon = _interopRequireDefault(require("../icon"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

/**
 * @file tag入口文件
 * @author fuqiangqiang@baidu.com
 */
var prefixCls = (0, _util.classCreator)('tag')();
var presetColorTypes = ['pink', 'red', 'yellow', 'orange', 'cyan', 'green', 'blue', 'purple', 'geekblue', 'magenta', 'volcano', 'gold', 'lime'];
var presetColorRegex = new RegExp("^(".concat(presetColorTypes.join('|'), ")(-inverse)?$"));

var Tag = _san["default"].defineComponent({
  dataTypes: {
    color: _san.DataTypes.string,
    closable: _san.DataTypes.bool,
    visible: _san.DataTypes.bool
  },
  computed: {
    classes: function classes() {
      var visible = this.data.get('visible');
      var color = this.data.get('color');
      var isPresetColor = this.data.get('isPresetColor');
      var classArr = [prefixCls];
      isPresetColor && classArr.push("".concat(prefixCls, "-").concat(color));
      color && !isPresetColor && classArr.push("".concat(prefixCls, "-has-color"));
      !visible && classArr.push("".concat(prefixCls, "-hidden"));
      return classArr;
    },
    isPresetColor: function isPresetColor() {
      var color = this.data.get('color');
      return color ? presetColorRegex.test(color) : false;
    }
  },
  initData: function initData() {
    return {
      closable: false,
      visible: true
    };
  },
  inited: function inited() {
    var nonameSlots = this.sourceSlots.noname;

    if (nonameSlots && nonameSlots[0].tagName === 'a') {
      this.data.set('isNeedWave', true);
    }
  },
  setVisible: function setVisible(visible, e) {
    this.fire('close', e);

    if (e.defaultPrevented) {
      return;
    }

    this.data.set('visible', visible);
  },
  handleIconClick: function handleIconClick(e) {
    this.setVisible(false, e);
  },
  handleClick: function handleClick(e) {
    this.fire('click', e);
  },
  components: {
    's-wave': _wave["default"],
    's-icon': _icon["default"]
  },
  template: "\n        <div class=\"{{classes}}\" style=\"{{color && !isPresetColor ? 'background-color:' + color : ''}}\" on-click=\"handleClick\">\n            <slot />\n            <s-icon type=\"close\" on-click=\"handleIconClick\" s-if=\"closable\" />\n            <s-wave s-if=\"isNeedWave\" />\n        </div>\n    "
});

Tag.CheckableTag = _checkableTag["default"];
var _default = Tag;
exports["default"] = _default;