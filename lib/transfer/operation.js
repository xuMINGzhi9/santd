"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _san = _interopRequireDefault(require("san"));

var _button = _interopRequireDefault(require("../button"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/**
 * @file Santd transfer operation file
 * @author mayihui@baidu.com
 **/
var _default = _san["default"].defineComponent({
  handleMoveToRight: function handleMoveToRight() {
    this.fire('moveToRight');
  },
  handleMoveToLeft: function handleMoveToLeft() {
    this.fire('moveToLeft');
  },
  components: {
    's-button': _button["default"]
  },
  template: "\n        <div>\n            <s-button\n                type=\"primary\"\n                size=\"small\"\n                disabled=\"{{disabled || !rightActive}}\"\n                icon=\"right\"\n                on-click=\"handleMoveToRight\"\n            >\n                {{rightArrowText || ''}}\n            </s-button>\n            <s-button\n                type=\"primary\"\n                size=\"small\"\n                disabled=\"{{disabled || !leftActive}}\"\n                icon=\"left\"\n                on-click=\"handleMoveToLeft\"\n            >\n                {{leftArrowText || ''}}\n            </s-button>\n        </div>\n    "
});

exports["default"] = _default;