"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _san = _interopRequireWildcard(require("san"));

var _util = require("../core/util");

var _isNumber = _interopRequireDefault(require("lodash/isNumber"));

var _icon = _interopRequireDefault(require("../icon"));

var _Dialog = _interopRequireDefault(require("../modal/Dialog"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

/**
 * @file 组件 drawer
 * @author baozhixin <baozhixin@baidu.com>
 * @borrows https://ant.design/components/drawer-cn/
 *
 * @todo API: destroyOnClose
 * @todo API: getContainer
 */
var prefixCls = (0, _util.classCreator)('drawer')();

var placementType = _san.DataTypes.oneOf(['top', 'right', 'bottom', 'left']);

var styleType = _san.DataTypes.oneOfType([_san.DataTypes.string, _san.DataTypes.object]);

var _default = _san["default"].defineComponent({
  template: "\n        <div class=\"".concat(prefixCls, " ").concat(prefixCls, "-{{placement}} {{visible ? '").concat(prefixCls, "-open' : ''}}\" style=\"z-index:{{zIndex}};\">\n            <div s-if=\"{{mask}}\" class=\"").concat(prefixCls, "-mask\" style=\"{{maskStyle}}\" on-click=\"onMaskClick\"></div>\n            <div class=\"").concat(prefixCls, "-content-wrapper\" style=\"{{wrapStyle}}\">\n                <div class=\"").concat(prefixCls, "-content\">\n                    <div class=\"").concat(prefixCls, "-wrapper-body\" style=\"{{containerStyle}}\">\n                        <div s-if=\"{{title}}\" class=\"").concat(prefixCls, "-header\">\n                            <div class=\"").concat(prefixCls, "-title\">{{title}}</div>\n                        </div>\n                        <button\n                            s-if=\"{{closable}}\"\n                            on-click=\"close\"\n                            aria-label=\"Close\"\n                            class=\"").concat(prefixCls, "-close\"\n                        >\n                            <span class=\"").concat(prefixCls, "-close-x\">\n                                <s-icon type=\"close\" />\n                            </span>\n                        </button>\n                        <div class=\"").concat(prefixCls, "-body\" style=\"{{bodyStyle}}\">\n                            <slot />\n                        </div>\n                    </div>\n                </div>\n            </div>\n        </div>\n    "),
  dataTypes: {
    bodyStyle: styleType,
    // 原来的参数是style，但是san会把样式添加到根节点，所以改为了bodyStyle
    closable: _san.DataTypes.bool,
    destroyOnClose: _san.DataTypes.bool,
    getContainer: _san.DataTypes.string,
    mask: _san.DataTypes.bool,
    maskClosable: _san.DataTypes.bool,
    maskStyle: styleType,
    width: _san.DataTypes.number,
    height: _san.DataTypes.number,
    placement: placementType,
    title: _san.DataTypes.string,
    visible: _san.DataTypes.bool,
    zIndex: _san.DataTypes.number
  },
  components: {
    's-icon': _icon["default"]
  },
  computed: {
    wrapStyle: function wrapStyle() {
      var placement = this.data.get('placement');
      var isHorizontal = placement === 'left' || placement === 'right';
      var placementName = "translate".concat(isHorizontal ? 'X' : 'Y');
      var placementPos = placement === 'left' || placement === 'top' ? '-100%' : '100%';
      var width = isHorizontal && this.data.get('width');
      var height = !isHorizontal && this.data.get('height');
      var transform = this.data.get('visible') ? '' : "".concat(placementName, "(").concat(placementPos, ")");
      return {
        transform: transform,
        msTransform: transform,
        width: (0, _isNumber["default"])(width) ? "".concat(width, "px") : width,
        height: (0, _isNumber["default"])(height) ? "".concat(height, "px") : height
      };
    }
  },
  filters: _Dialog["default"],
  initData: function initData() {
    return {
      closable: true,
      destroyOnClose: false,
      getContainer: 'body',
      mask: true,
      maskClosable: true,
      maskStyle: {},
      width: 256,
      height: 256,
      placement: 'right'
    };
  },
  onMaskClick: function onMaskClick(e) {
    if (!this.data.get('maskClosable')) {
      return;
    }

    this.close(e);
  },
  close: function close(e) {
    if (this.data.get('visible') !== undefined) {
      this.fire('close', e);
    }

    this.data.set('visible', false);
  }
});

exports["default"] = _default;