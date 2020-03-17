"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = _default;

var _san = _interopRequireDefault(require("san"));

var _index = _interopRequireDefault(require("./index"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/**
 * @file Santd icon iconfont file
 * @author mayihui@baidu.com
 **/
var customCache = new Set();

function _default() {
  var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var scriptUrl = options.scriptUrl,
      _options$extraCommonP = options.extraCommonProps,
      extraCommonProps = _options$extraCommonP === void 0 ? {} : _options$extraCommonP;

  if (typeof document !== 'undefined' && typeof window !== 'undefined' && typeof document.createElement === 'function' && typeof scriptUrl === 'string' && scriptUrl.length && !customCache.has(scriptUrl)) {
    var script = document.createElement('script');
    script.setAttribute('src', scriptUrl);
    script.setAttribute('data-namespace', scriptUrl);
    customCache.add(scriptUrl);
    document.body.appendChild(script);
  }

  return _san["default"].defineComponent({
    components: {
      's-icon': _index["default"]
    },
    initData: function initData() {
      return {
        extraCommonProps: extraCommonProps
      };
    },
    attached: function attached() {
      var type = this.data.get('type');
      var useNode = this.el.querySelector('use');
      useNode.setAttributeNS('http://www.w3.org/1999/xlink', 'xlink:href', '#' + type);
    },
    template: "\n            <span>\n                <s-icon\n                    theme=\"{{theme}}\"\n                    spin=\"{{spin}}\"\n                    rotate=\"{{rotate}}\"\n                    bodyStyle=\"{{bodyStyle}}\"\n                    twoToneColor=\"{{twoToneColor}}\"\n                    viewBox=\"0 0 1024 1024\"\n                    s-bind=\"{{extraCommonProps}}\"\n                >\n                    <use></use>\n                </s-icon>\n            </span>\n        "
  });
}