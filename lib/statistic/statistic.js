"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _san = _interopRequireWildcard(require("san"));

var _util = require("../core/util");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

/**
 * @file 组件 statistic
 * @author chenkai13 <chenkai13@baidu.com>
 */
var prefixCls = (0, _util.classCreator)('statistic')();

function padEnd(string, length, chars) {
  var strLength = length ? string.length : 0;
  var l = length - strLength;
  var padding = '';

  while (l--) {
    padding += chars;
  }

  return length && strLength < length ? string + padding : string;
}

var _default = _san["default"].defineComponent({
  dataTypes: {
    decimalSeparator: _san.DataTypes.string,
    formatter: _san.DataTypes.func,
    groupSeparator: _san.DataTypes.string,
    precision: _san.DataTypes.number,
    prefix: _san.DataTypes.string,
    suffix: _san.DataTypes.string,
    title: _san.DataTypes.string,
    value: _san.DataTypes.oneOfType([_san.DataTypes.string, _san.DataTypes.number])
  },
  template: "\n        <div class=\"".concat(prefixCls, "\">\n            <div class=\"").concat(prefixCls, "-title\" s-if=\"title\">{{title}}</div>\n            <div class=\"").concat(prefixCls, "-content\" style=\"{{valueStyle}}\">\n                <span s-if=\"hasPrefix\" class=\"").concat(prefixCls, "-content-prefix\">\n                    <slot name=\"prefix\" />{{prefix}}\n                </span>\n                <span class=\"").concat(prefixCls, "-content-value\">\n                    <span class=\"").concat(prefixCls, "-content-value-int\">{{showValue.int}}</span>\n                    <span class=\"").concat(prefixCls, "-content-value-decimal\"\n                        s-if=\"{{showValue.decimal}}\"\n                    >{{showValue.decimal}}</span>\n                </span>\n                <span s-if=\"hasSuffix\" class=\"").concat(prefixCls, "-content-suffix\">\n                    <slot name=\"suffix\" />{{suffix}}\n                </span>\n            </div>\n        </div>\n    "),
  initData: function initData() {
    return {
      groupSeparator: ',',
      value: 0,
      decimalSeparator: '.'
    };
  },
  inited: function inited() {
    this.data.set('hasPrefix', this.data.get('prefix') || !!this.sourceSlots.named.prefix);
    this.data.set('hasSuffix', this.data.get('suffix') || !!this.sourceSlots.named.suffix);
  },
  computed: {
    showValue: function showValue() {
      var value = this.data.get('value');
      var formatter = this.data.get('formatter');
      var groupSeparator = this.data.get('groupSeparator');
      var precision = this.data.get('precision');
      var decimalSeparator = this.data.get('decimalSeparator');

      if (formatter && typeof formatter === 'function') {
        return {
          "int": formatter(value)
        };
      }

      value = String(value);
      var cells = value.match(/^(-?)(\d*)(\.(\d+))?$/);

      if (!cells) {
        return {
          "int": value
        };
      }

      var negative = cells[1];

      var _int = cells[2] || '0';

      var decimal = cells[4] || '';
      _int = _int.replace(/\B(?=(\d{3})+(?!\d))/g, groupSeparator);

      if (typeof precision === 'number') {
        decimal = padEnd(decimal, precision, '0').slice(0, precision);
      }

      if (decimal) {
        decimal = "".concat(decimalSeparator).concat(decimal);
      }

      return {
        "int": negative + _int,
        decimal: decimal
      };
    }
  }
});

exports["default"] = _default;