"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _san = _interopRequireDefault(require("san"));

var _util = require("../core/util");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/**
* @file layout.js
* @author fuqiangqiang@baidu.com
*/
var generator = function generator(_ref) {
  var suffixCls = _ref.suffixCls,
      tagName = _ref.tagName;
  var prefixCls = (0, _util.classCreator)(suffixCls)();
  var template = "\n        <".concat(tagName, " class=\"").concat(prefixCls, " {{hasSider || siders.length > 0 ? '").concat(prefixCls, "-has-sider' : ''}}\"><slot /></").concat(tagName, ">\n    ");

  var baseComponent = _san["default"].defineComponent({
    messages: {
      santd_layout_addSider: function santd_layout_addSider(payload) {
        this.data.push('siders', payload.value);
      },
      santd_layout_removeSider: function santd_layout_removeSider(payload) {
        var siders = this.data.get('siders');
        this.data.set('siders', siders.filter(function (sider) {
          return sider !== payload.value;
        }));
      }
    },
    initData: function initData() {
      return {
        siders: []
      };
    },
    template: template
  });

  return baseComponent;
};

var Layout = generator({
  suffixCls: 'layout',
  tagName: 'section'
});
var Header = generator({
  suffixCls: 'layout-header',
  tagName: 'header'
});
var Footer = generator({
  suffixCls: 'layout-footer',
  tagName: 'footer'
});
var Content = generator({
  suffixCls: 'layout-content',
  tagName: 'main'
});
Layout.Header = Header;
Layout.Footer = Footer;
Layout.Content = Content;
var _default = Layout;
exports["default"] = _default;