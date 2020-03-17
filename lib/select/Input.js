"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _san = _interopRequireWildcard(require("san"));

var _util = require("./util");

var _keyCode = _interopRequireDefault(require("../core/util/keyCode"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

/**
 * @file select/Input
 * @author
 */
var _default = _san["default"].defineComponent({
  template: "\n        <div class=\"".concat(_util.prefixCls, "-search__field__wrap\">\n            <input\n                s-ref=\"input\"\n                id=\"{{context.id}}\"\n                auto-complete=\"off\"\n                class=\"").concat(_util.prefixCls, "-search__field\"\n                disabled=\"{{context.disabled}}\"\n                value=\"{=inputValue=}\"\n                on-change=\"handleInputChange\"\n                on-input=\"handleInputChange\"\n                on-keydown=\"handleInputKeyDown\"\n            />\n            <span\n                s-ref=\"inputMirror\"\n                class=\"").concat(_util.prefixCls, "-search__field__mirror\"\n            >{{inputValue}}{{'&nbsp;'|raw}}</span>\n        </div>\n    "),
  dataTypes: {
    context: _san.DataTypes.object,
    inputValue: _san.DataTypes.string
  },
  initData: function initData() {
    return {
      context: {},
      inputValue: ''
    };
  },
  attached: function attached() {
    var _this = this;

    var $input = this.ref('input');
    var $inputMirror = this.ref('inputMirror');
    var modeConfig = this.data.get('context.modeConfig');

    if (modeConfig.multiple || modeConfig.tags) {
      this.watch('inputValue', function (value) {
        _this.nextTick(function () {
          if (value && $input && $inputMirror) {
            $input.style.width = "".concat($inputMirror.clientWidth, "px");
          } else if ($input) {
            $input.style.width = '';
          }
        });
      });
    }

    this.dispatch('select:setInputElement', $input);
  },
  handleInputChange: function handleInputChange(e) {
    this.dispatch('select:inputChange', e);
  },
  handleInputKeyDown: function handleInputKeyDown(e) {
    var _this$data$get = this.data.get('context'),
        modeConfig = _this$data$get.modeConfig,
        realOpen = _this$data$get.realOpen;

    if (e.keyCode === _keyCode["default"].ENTER) {
      if (modeConfig.single && realOpen || !modeConfig.single && !realOpen) {
        e.stopPropagation();
      }
    }

    this.dispatch('select:inputKeyDown', e);
  }
});

exports["default"] = _default;