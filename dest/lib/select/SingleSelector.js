"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _san = _interopRequireWildcard(require("san"));

var _util = require("./util");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

/**
 * @file select/SingleSelector
 * @author
 */
var _default = _san["default"].defineComponent({
  template: "\n        <div title=\"{{optionInfo.title}}\"\n            class=\"".concat(_util.prefixCls, "-selection-selected-value\"\n            style=\"{{style}}\"\n        >\n            {{optionInfo.label}}\n        </div>\n    "),
  computed: {
    optionInfo: function optionInfo() {
      var _this$data$get = this.data.get('context'),
          _this$data$get$option = _this$data$get.optionsInfo,
          optionsInfo = _this$data$get$option === void 0 ? {} : _this$data$get$option,
          value = _this$data$get.value;

      var singleValue = (0, _util.toArray)(value)[0];
      var info = optionsInfo[(0, _util.getMapKey)(singleValue)];

      if (info) {
        info.title = (0, _util.toTitle)(info.title || info.label);
        return info;
      }

      return {
        label: this.data.get('inputValue')
      };
    },
    style: function style() {
      var showSelectedValue = false;
      var opacity = 1;
      var inputValue = this.data.get('inputValue');

      var _this$data$get2 = this.data.get('context'),
          open = _this$data$get2.open,
          showSearch = _this$data$get2.showSearch;

      if (!showSearch) {
        showSelectedValue = true;
      } else if (open) {
        showSelectedValue = !inputValue;

        if (showSelectedValue) {
          opacity = 0.4;
        }
      } else {
        showSelectedValue = true;
      }

      return {
        display: showSelectedValue ? 'block' : 'none',
        opacity: opacity
      };
    }
  },
  dataTypes: {
    context: _san.DataTypes.object,
    inputValue: _san.DataTypes.string
  },
  initData: function initData() {
    return {
      context: {},
      inputValue: ''
    };
  }
});

exports["default"] = _default;