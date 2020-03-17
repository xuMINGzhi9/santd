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

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var prefixCls = (0, _util.classCreator)('badge')();
var scrollNumberPrefixCls = (0, _util.classCreator)('scroll-number')();
var presetColorTypes = {
  pink: 1,
  red: 1,
  yellow: 1,
  orange: 1,
  cyan: 1,
  green: 1,
  blue: 1,
  purple: 1,
  geekblue: 1,
  magenta: 1,
  volcano: 1,
  gold: 1,
  lime: 1
};
var scrollNumberList = [];

for (var i = 0; i < 30; i++) {
  scrollNumberList.push(i % 10);
}

var ScrollNumber = _san["default"].defineComponent({
  dataTypes: {
    count: _san.DataTypes.oneOfType([_san.DataTypes.string, _san.DataTypes.number]),
    title: _san.DataTypes.oneOfType([_san.DataTypes.string, _san.DataTypes.object, _san.DataTypes.number])
  },
  template: "\n        <sup class=\"".concat(scrollNumberPrefixCls, "\" title=\"{{title || ''}}\" style=\"{{offsetStyle}}\">\n            <template s-if=\"isOverflow\">\n                {{count}}\n            </template>\n            <span\n                s-elif=\"numberStyles.length\"\n                s-for=\"numStyle, idx in numberStyles trackBy idx\"\n                class=\"").concat(scrollNumberPrefixCls, "-only\"\n                style=\"{{numStyle}};\"\n            >\n                <p s-for=\"item in scrollNumberList\">{{item}}</p>\n            </span>\n        </sup>\n    "),
  computed: {
    isOverflow: function isOverflow() {
      var count = +this.data.get('count');
      return !count;
    },
    numberStyles: function numberStyles() {
      var results = []; // 简单点，就不依赖 isOverflow 了

      var count = +this.data.get('count');

      if (count) {
        var nums = count.toString().split('');

        for (var _i = 0; _i < nums.length; _i++) {
          var num = +nums[_i];
          results.push('transform: translateY(' + (10 + num) * -100 + '%);');
        }
      }

      return results;
    }
  },
  getStyleArr: function getStyleArr() {
    var numberArray = this.data.get('numberArray');
    var styleArr = [];

    if (numberArray) {
      for (var _i2 = 0; _i2 < numberArray.length; _i2++) {
        var num = numberArray[_i2];
        styleArr.push('transform: translateY(' + (10 + num) * -100 + '%);');
      }
    }

    return styleArr;
  },
  initData: function initData() {
    return {
      scrollNumberList: scrollNumberList
    };
  }
});

var _default = _san["default"].defineComponent({
  autoFillStyleAndId: false,
  dataTypes: {
    count: _san.DataTypes.oneOfType([_san.DataTypes.string, _san.DataTypes.number]),
    showZero: _san.DataTypes.bool,
    overflowCount: _san.DataTypes.number,
    dot: _san.DataTypes.bool,
    status: _san.DataTypes.string,
    color: _san.DataTypes.string,
    offset: _san.DataTypes.array,
    title: _san.DataTypes.string
  },
  components: {
    's-scrollnumber': ScrollNumber
  },
  initData: function initData() {
    return {
      showZero: false,
      dot: false,
      overflowCount: 99,
      hasChild: this._hasChild
    };
  },
  attached: function attached() {
    this.slot('count')[0].children.forEach(function (children) {
      if (children instanceof _san["default"].Component) {
        children.data.set('class', scrollNumberPrefixCls + '-custom-component');
      }
    });
  },
  compiled: function compiled() {
    if (this.sourceSlots.noname || this.sourceSlots.named.count) {
      this._hasChild = true;
    }
  },
  computed: {
    classes: function classes() {
      var classArr = [];
      this.data.get('hasStatus') && classArr.push("".concat(prefixCls, "-status"));
      !this.data.get('hasChild') && classArr.push("".concat(prefixCls, "-not-a-wrapper"));
      return classArr;
    },
    mainStyles: function mainStyles() {
      var offset = this.data.get('offset');
      var style = this.data.get('style');
      var hasChild = this.data.get('hasChild');
      var hasStatus = this.data.get('hasStatus');

      if (!hasChild && hasStatus) {
        return offset ? _objectSpread({
          'right': -offset[0],
          'margin-top': offset[1]
        }, style) : style;
      }

      return '';
    },
    hasStatus: function hasStatus() {
      return this.data.get('status') || this.data.get('color');
    },
    statusClass: function statusClass() {
      var status = this.data.get('status');
      var color = this.data.get('color');
      var classArr = [];
      (status || color) && classArr.push("".concat(prefixCls, "-status-dot"));
      status && classArr.push("".concat(prefixCls, "-status-").concat(status));
      presetColorTypes[color] && classArr.push("".concat(prefixCls, "-status-").concat(color));
      return classArr;
    },
    displayCount: function displayCount() {
      var count = this.data.get('count');
      var overflowCount = this.data.get('overflowCount');
      return count > overflowCount ? overflowCount + '+' : count;
    },
    isZero: function isZero() {
      var count = +this.data.get('count');
      return count === 0;
    }
  },
  template: "\n        <span class=\"".concat(prefixCls, " {{classes}}\" style=\"{{mainStyles}}\">\n            <slot />\n            <span s-if=\"!hasChild && hasStatus\" class=\"{{statusClass}}\" style=\"{{color ? 'background:' + color : ''}}\">\n            </span>\n            <span\n                style=\"{{style && style.color ? 'color:' + color : ''}}\"\n                class=\"").concat(prefixCls, "-status-text\"\n                s-if=\"!hasChild && hasStatus\"\n            >{{text}}</span>\n            <s-scrollnumber\n                s-if=\"isZero ? showZero : (count || dot)\"\n                class=\"").concat(prefixCls, "-{{count || isZero && showZero ? 'count' : 'dot'}}\"\n                count=\"{{dot && count || hasStatus ? '' : displayCount}}\"\n                title=\"{{title || count}}\"\n                style=\"{{style}}\"\n            />\n            <slot name=\"count\" />\n        </span>\n    ")
});

exports["default"] = _default;