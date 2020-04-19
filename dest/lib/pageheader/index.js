"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _san = _interopRequireDefault(require("san"));

var _util = require("../core/util");

var _icon = _interopRequireDefault(require("../icon"));

var _divider = _interopRequireDefault(require("../divider"));

var _breadcrumb = _interopRequireDefault(require("../breadcrumb"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/**
 * @file 组件 pageheader
 * @author chenkai13 <chenkai13@baidu.com>
 */
var prefixCls = (0, _util.classCreator)('page-header')();

var _default = _san["default"].defineComponent({
  template: "\n    \t<div class=\"".concat(prefixCls, "\">\n            <s-breadcrumb separator=\"/\" s-if=\"{{showBread(breadcrumb)}}\" s-bind=\"{{breadcrumb}}\" />\n            <div class=\"").concat(prefixCls, "-back-icon\" on-click=\"handleBack\" s-if=\"{{showBackIcon(breadcrumb, backIcon)}}\">\n                <s-icon type=\"{{backIcon}}\" />\n                <s-divider type=\"vertical\" />\n            </div>\n            <div class=\"").concat(prefixCls, "-title-view\">\n                <span class=\"").concat(prefixCls, "-title-view-title\">{{title}}</span>\n                <span class=\"").concat(prefixCls, "-title-view-sub-title\">{{subTitle}}</span>\n                <span class=\"").concat(prefixCls, "-title-view-tags\">\n                    <slot name=\"tags\" />\n                </span>\n                <span class=\"").concat(prefixCls, "-title-view-extra\">\n                    <slot name=\"extraa \"/>\n                </span>\n            </div>\n            <div class=\"").concat(prefixCls, "-content-view\" s-if=\"{{hasContent}}\">\n                <slot />\n            </div>\n            <div class=\"").concat(prefixCls, "-footer\" s-if=\"{{hasFooter}}\">\n                <slot name=\"footer\" />\n            </div>\n        </div>\n    "),
  initData: function initData() {
    return {
      backIcon: 'arrow-left'
    };
  },
  components: {
    's-icon': _icon["default"],
    's-divider': _divider["default"],
    's-breadcrumb': _breadcrumb["default"],
    's-brcrumbitem': _breadcrumb["default"].BrcrumbItem
  },
  showBread: function showBread(breadcrumb) {
    return breadcrumb && breadcrumb.routes && breadcrumb.routes.length > 2;
  },
  showBackIcon: function showBackIcon(breadcrumb, backIcon) {
    return backIcon !== false && !this.showBread(breadcrumb);
  },
  handleBack: function handleBack() {
    var onBack = this.data.get('onBack');

    if (onBack && typeof onBack === 'function') {
      onBack();
    } else {
      history.back();
    }
  },
  inited: function inited() {
    this.data.set('hasContent', !!this.sourceSlots.noname);
    this.data.set('hasFooter', !!this.sourceSlots.named.footer);
  }
});

exports["default"] = _default;