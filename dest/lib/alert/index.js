"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _san = _interopRequireWildcard(require("san"));

var _util = require("../core/util");

var _dom = require("../core/util/dom");

var _icon = _interopRequireDefault(require("../icon"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

/**
 * @file 组件 alert
 * @author baozhixin <baozhixin@baidu.com>
 * @borrows https://ant.design/components/alert-cn/
 */
var prefixCls = (0, _util.classCreator)('alert')();
var iconMap = {
  success: 'check-circle',
  info: 'info-circle',
  error: 'close-circle',
  warning: 'exclamation-circle'
};

var _default = _san["default"].defineComponent({
  template: "\n        <div class=\"{{classes}}\" on-animationend=\"animationEnd\" style=\"{{elStyle}}\">\n            <slot s-if=\"{{showIcon}}\" name=\"icon\">\n                <s-icon\n                    class=\"".concat(prefixCls, "-icon\"\n                    type=\"{{icon || iconMap[type] || 'smile'}}\"\n                    theme=\"{{description ? 'outlined' : 'filled'}}\"\n                />\n            </slot>\n            <span class=\"").concat(prefixCls, "-message\">{{message}}</span>\n            <span class=\"").concat(prefixCls, "-description\">{{description}}</span>\n            <a s-if=\"{{closable}}\" on-click=\"handleClose\" class=\"").concat(prefixCls, "-close-icon\">\n                {{closeText}}\n                <s-icon s-if=\"{{!closeText}}\" type=\"close\" />\n            </a>\n        </div>\n    "),
  dataTypes: {
    banner: _san.DataTypes.bool,
    closable: _san.DataTypes.bool,
    closeText: _san.DataTypes.string,
    description: _san.DataTypes.string,
    icon: _san.DataTypes.string,
    message: _san.DataTypes.string,
    showIcon: _san.DataTypes.bool,
    type: _san.DataTypes.oneOf(['success', 'info', 'error', 'warning'])
  },
  components: {
    's-icon': _icon["default"]
  },
  computed: {
    classes: function classes() {
      var data = this.data;
      var type = data.get('type');
      var closing = data.get('closing');
      var closable = data.get('closable');
      var description = data.get('description');
      var showIcon = data.get('showIcon');
      var banner = data.get('banner');
      var classArr = [prefixCls, "".concat(prefixCls, "-").concat(type)];
      !closing && classArr.push("".concat(prefixCls, "-close"), "".concat(prefixCls, "-slide-up-leave"));
      description && classArr.push("".concat(prefixCls, "-with-description"));
      !showIcon && classArr.push("".concat(prefixCls, "-no-icon"));
      banner && classArr.push("".concat(prefixCls, "-banner"));
      closable && classArr.push("".concat(prefixCls, "-closable"));
      return classArr;
    }
  },
  initData: function initData() {
    return {
      closing: true,
      iconMap: iconMap
    };
  },
  inited: function inited() {
    var data = this.data;
    var type = data.get('type'); // 有closeText时可关闭

    data.get('closeText') && data.set('closable', true); // banner模式

    if (data.get('banner')) {
      // 默认显示icon
      false !== data.get('showIcon') && data.set('showIcon', true); // 默认类型warning

      undefined === type && data.set('type', type = 'warning');
    } // 默认类型info


    undefined === type && data.set('type', 'info');
  },
  attached: function attached() {
    var customIcon = this.slot('icon')[0];

    if (customIcon && customIcon.isInserted) {
      customIcon.children.forEach(function (item) {
        (0, _dom.addClass)(item.el, "".concat(prefixCls, "-icon")); // 自定义icon添加class
      });
    } // 确定有关闭按钮时添加高度，保证动画效果


    if (this.data.get('closable')) {
      this.data.set('elStyle', "height: ".concat(this.el.offsetHeight, "px"));
    }
  },
  handleClose: function handleClose(e) {
    e.preventDefault();
    this.data.set('closing', false);
    this.fire('close', e);
  },
  animationEnd: function animationEnd() {
    this.data.set('closing', true);
    this.fire('afterClose');
    this.el.remove();
  }
});

exports["default"] = _default;