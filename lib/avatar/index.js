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
 * @file 组件 avatar
 * @author wangyongqing01 <wangyongqing01@baidu.com>
 */
var prefixCls = (0, _util.classCreator)('avatar')();

var _default = _san["default"].defineComponent({
  dataTypes: {
    shape: _san.DataTypes.oneOf(['circle', 'square']),
    size: _san.DataTypes.oneOfType([_san.DataTypes.string, _san.DataTypes.number])
  },
  components: {
    's-icon': _icon["default"]
  },
  initData: function initData() {
    return {
      prefixCls: prefixCls,
      shape: 'circle',
      size: 'default',
      isImgExist: true,
      scaleId: (0, _util.guid)(prefixCls)
    };
  },
  computed: {
    classes: function classes() {
      var isImgExist = this.data.get('isImgExist');
      var src = this.data.get('src');
      var size = this.data.get('size');
      var shape = this.data.get('shape');
      var icon = this.data.get('icon');
      var classArr = [prefixCls];
      size === 'large' && classArr.push("".concat(prefixCls, "-lg"));
      size === 'small' && classArr.push("".concat(prefixCls, "-sm"));
      shape && classArr.push("".concat(prefixCls, "-").concat(shape));
      src && isImgExist && classArr.push("".concat(prefixCls, "-image"));
      icon && classArr.push("".concat(prefixCls, "-icon"));
      return classArr;
    },
    styles: function styles() {
      var size = +this.data.get('size');
      var icon = this.data.get('icon');

      if (isNaN(size)) {
        return '';
      }

      return "width: ".concat(size, "px;height:").concat(size, "px; line-height:").concat(size, "px; font-size: ").concat(icon ? "".concat(size / 2, "px") : '18px');
    }
  },
  handleImgLoadError: function handleImgLoadError() {
    this.fire('error');
  },
  updated: function updated() {
    var childrenNode = document.getElementById(this.data.get('scaleId')); // update scaleStyle

    if (childrenNode) {
      var childrenWidth = childrenNode.offsetWidth;
      var avatarWidth = this.el.getBoundingClientRect().width;
      var scale = avatarWidth - 8 < childrenWidth ? (avatarWidth - 8) / childrenWidth : 1;
      var transformString = "scale(".concat(scale, ") translateX(-50%)");
      var scaleStyle = ["-ms-transform:".concat(transformString), "-webkit-transform:".concat(transformString), "transform:".concat(transformString)];
      var size = +this.data.get('size');

      if (!isNaN(size)) {
        scaleStyle.push("line-height: ".concat(size, "px"));
      }

      this.data.set('scaleStyle', scaleStyle.join(';'));
    }
  },
  inited: function inited() {
    if (this.sourceSlots.noname && this.sourceSlots.noname.length) {
      this.data.set('hasSlot', true);
    }
  },
  attached: function attached() {
    this.updated();
  },
  template: "\n        <span class=\"{{classes}}\" style=\"{{styles}}\">\n            <img s-if=\"src && isImgExist\"\n                src=\"{{src}}\"\n                srcset=\"{{srcSet}}\"\n                on-error=\"handleImgLoadError\"\n                alt=\"{{alt}}\"\n            />\n            <s-icon s-if=\"icon\" type=\"{{icon}}\"/>\n            <span\n                s-if=\"hasSlot\"\n                class=\"{{scaleStyle && hasSlot ? prefixCls + '-string' : ''}}\"\n                id=\"{{scaleId}}\"\n                style=\"{{scaleStyle}}\"\n            ><slot/></span>\n        </span>\n    "
});

exports["default"] = _default;