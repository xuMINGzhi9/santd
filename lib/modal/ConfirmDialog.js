"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _san = _interopRequireDefault(require("san"));

var _util = require("../core/util");

var _icon = _interopRequireDefault(require("../icon"));

var _Dialog = _interopRequireDefault(require("./Dialog"));

var _ActionButton = _interopRequireDefault(require("./ActionButton"));

var _receiver = _interopRequireDefault(require("../localeprovider/receiver"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var prefixCls = (0, _util.classCreator)('modal')();
var contentPrefixCls = "".concat(prefixCls, "-confirm"); // 判断是否SanComponent, 可能会随着san的版本迭代变更，参考依据如下：
// https://github.com/baidu/san/blob/36085399ab3d84df3ff8b741bb2f57c483b59acb/src/view/node-type.js
// https://github.com/baidu/san/blob/9a7cd2e74ecd4f307afd1733aa5b745707edc0c9/src/view/component.js#L278
// 改成使用传统方式判断 by erik at 2019-10-03

function isValidComponent(content) {
  return content && content.prototype instanceof _san["default"].Component;
} // 动态加载content组件


var contentFun;

var contentLoader = _san["default"].createComponentLoader(function () {
  return new Promise(function (resolve, reject) {
    contentFun = {
      resolve: resolve,
      reject: reject
    };
  });
});

var _default = _san["default"].defineComponent({
  template: "<template>\n        <s-dialog\n            prefixCls=\"{{prefixCls}}\"\n            className=\"".concat(contentPrefixCls, " ").concat(contentPrefixCls, "-{{type}} {{className}}\"\n            wrapClassName=\"{{!!centered ? ").concat(prefixCls, "-centered : ''}}\"\n            visible=\"{{visible}}\"\n            title=\"\"\n            hasFooter=\"{{false}}\"\n            transitionName=\"zoom\"\n            maskTransitionName=\"fade\"\n            maskClosable=\"{{maskClosable}}\"\n            maskStyle=\"{{maskStyle}}\"\n            style=\"{{style}}\"\n            width=\"{{width}}\"\n            zIndex=\"{{zIndex}}\"\n            keyboard=\"{{keyboard}}\"\n            centered=\"{{centered}}\"\n            getContainer=\"{{getContainer}}\"\n            onCancel=\"{{close.bind(this, {triggerCancel: true})}}\"\n            on-afterClose=\"afterClose\"\n        >\n            <div class=\"").concat(contentPrefixCls, "-body-wrapper\">\n                <div class=\"").concat(contentPrefixCls, "-body\">\n                    <s-icon type=\"{{iconType}}\"/>\n                    <span class=\"").concat(contentPrefixCls, "-title\">{{title}}</span>\n                    <div class=\"").concat(contentPrefixCls, "-content\">\n                        <template s-if=\"{{contentIsComponent}}\"><content-loader/></template>\n                        <template s-else>{{content}}</template>\n                    </div>\n                </div>\n                <div class=\"").concat(contentPrefixCls, "-btns\">\n                    <s-button\n                        s-if=\"{{okCancel}}\"\n                        actionFn=\"{{onCancel}}\"\n                        closeModal=\"{{close}}\"\n                        autoFocus=\"{{autoFocusButton === 'cancel'}}\"\n                        buttonProps=\"{{cancelButtonProps}}\"\n                    >\n                        {{cancelText || locale.cancelText}}\n                    </s-button>\n                    <s-button\n                        type=\"{{okType}}\"\n                        actionFn=\"{{onOk}}\"\n                        closeModal=\"{{close}}\"\n                        autoFocus=\"{{autoFocusButton === 'ok'}}\"\n                        buttonProps=\"{{okButtonProps}}\"\n                    >\n                        {{okText || (okCancel ? locale.okText : locale.justOkText)}}\n                    </s-button>\n                </div>\n            </div>\n        </s-dialog>\n    </template>"),
  components: {
    'content-loader': contentLoader,
    's-button': _ActionButton["default"],
    's-dialog': _Dialog["default"],
    's-icon': _icon["default"]
  },
  afterClose: function afterClose() {
    var afterCloseFn = this.data.get('afterClose');
    'function' === typeof afterCloseFn && afterCloseFn();
  },
  computed: _objectSpread(_objectSpread({}, _receiver["default"].computed), {}, {
    contentIsComponent: function contentIsComponent() {
      var content = this.data.get('content');
      return isValidComponent(content);
    }
  }),
  initData: function initData() {
    return {
      componentName: 'Modal',
      autoFocusButton: 'ok',
      iconType: 'question-circle',
      maskClosable: false,
      okCancel: true,
      okType: 'primary',
      width: 416
    };
  },
  inited: _receiver["default"].inited,
  attached: function attached() {
    // 处理content是san组件的情况
    var content = this.data.get('content');
    this.data.get('contentIsComponent') && contentFun.resolve(content);
  }
});

exports["default"] = _default;