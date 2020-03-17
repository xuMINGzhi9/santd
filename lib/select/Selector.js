"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _san = _interopRequireWildcard(require("san"));

var _icon = _interopRequireDefault(require("../icon"));

var _Input = _interopRequireDefault(require("./Input"));

var _MultipleSelector = _interopRequireDefault(require("./MultipleSelector"));

var _SingleSelector = _interopRequireDefault(require("./SingleSelector"));

var _util = require("./util");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

/**
 * @file select/Selector
 * @author
 */
var _default = _san["default"].defineComponent({
  template: "\n        <div class=\"".concat(_util.prefixCls, "-selection__rendered\">\n            <div\n                s-if=\"context.placeholder\"\n                class=\"").concat(_util.prefixCls, "-selection__placeholder ").concat(_util.prefixCls, "-unselectable\"\n                style=\"display: {{hidePlaceholder ? 'none' : 'block'}};\"\n                unselectable=\"on\"\n                on-click=\"handlePlaceholderClick\"\n                on-mousedown=\"preventDefaultEvent\"\n            >\n                {{context.placeholder}}\n            </div>\n            <template s-if=\"context.modeConfig.single\">\n                <s-single-selector\n                    s-if=\"context.value.length\"\n                    context=\"{{context}}\"\n                    inputValue=\"{{inputValue}}\"\n                />\n                <div\n                    s-if=\"context.showSearch\"\n                    class=\"").concat(_util.prefixCls, "-search ").concat(_util.prefixCls, "-search--inline\"\n                    style=\"display: {{context.open ? 'block' : 'none'}}\"\n                >\n                    <s-input context=\"{{context}}\" inputValue=\"{=inputValue=}\" />\n                </div>\n            </template>\n            <template s-else>\n                <s-multiple-selector\n                    context=\"{{context}}\"\n                    on-change=\"handleChange\"\n                    on-deselect=\"handleDeselect\"\n                >\n                    <slot name=\"removeIcon\" slot=\"removeIcon\">\n                        <s-icon type=\"close\" class=\"").concat(_util.prefixCls, "-remove-icon\"/>\n                    </slot>\n                    <s-input slot=\"input\" context=\"{{context}}\" inputValue=\"{=inputValue=}\" />\n                </s-multiple-selector>\n            </template>\n        </div>\n    "),
  components: {
    's-icon': _icon["default"],
    's-input': _Input["default"],
    's-single-selector': _SingleSelector["default"],
    's-multiple-selector': _MultipleSelector["default"]
  },
  dataTypes: {
    context: _san.DataTypes.object,
    inputValue: _san.DataTypes.string
  },
  computed: {
    hidePlaceholder: function hidePlaceholder() {
      var hidden = false;
      var inputValue = this.data.get('inputValue');

      var _this$data$get = this.data.get('context'),
          _this$data$get$value = _this$data$get.value,
          value = _this$data$get$value === void 0 ? '' : _this$data$get$value,
          modeConfig = _this$data$get.modeConfig;

      if (inputValue || value.length) {
        hidden = true;
      }

      if (modeConfig.combobox && value.length === 1 && value && !value[0]) {
        hidden = false;
      }

      return hidden;
    }
  },
  initData: function initData() {
    return {
      context: {},
      inputValue: ''
    };
  },
  handleChange: function handleChange(value) {
    this.owner.fireChange(value);
  },
  handleDeselect: function handleDeselect(value) {
    this.owner.fire('deselect', value);
  },
  handlePlaceholderClick: function handlePlaceholderClick(e) {
    this.owner.handlePlaceholderClick(e);
  },
  preventDefaultEvent: _util.preventDefaultEvent
});

exports["default"] = _default;