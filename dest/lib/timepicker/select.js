"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _san = _interopRequireWildcard(require("san"));

var _getRequestAnimationFrame = _interopRequireDefault(require("../core/util/getRequestAnimationFrame"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

/**
 * @file Santd timepicker select file
 * @author mayihui@baidu.com
 **/
var raf = (0, _getRequestAnimationFrame["default"])();

var scrollTo = function scrollTo(element, to, duration) {
  // jump to target if duration zero
  if (duration <= 0) {
    raf(function () {
      element.scrollTop = to;
    });
    return;
  }

  var difference = to - element.scrollTop;
  var perTick = difference / duration * 10;
  raf(function () {
    element.scrollTop += perTick;

    if (element.scrollTop === to) {
      return;
    }

    scrollTo(element, to, duration - 10);
  });
};

var _default = _san["default"].defineComponent({
  dataTypes: {
    prefixCls: _san.DataTypes.string,
    options: _san.DataTypes.array,
    selectedIndex: _san.DataTypes.number,
    type: _san.DataTypes.string
  },
  initData: function initData() {
    return {
      active: false
    };
  },
  computed: {
    renderOptions: function renderOptions() {
      var options = this.data.get('options');
      var prefixCls = this.data.get('prefixCls');
      var selectedIndex = this.data.get('selectedIndex');
      return options.map(function (option, index) {
        var classArr = [];
        selectedIndex === index && classArr.push("".concat(prefixCls, "-select-option-selected"));
        option.disabled && classArr.push("".concat(prefixCls, "-select-option-disabled"));
        option.className = classArr.join(' ');
        return option;
      });
    }
  },
  attached: function attached() {
    var _this = this;

    this.watch('selectedIndex', function (val) {
      _this.scrollToSelected(120);
    });
    window.setTimeout(function () {
      _this.scrollToSelected(0);
    }, 0);
  },
  scrollToSelected: function scrollToSelected(duration) {
    var selectedIndex = this.data.get('selectedIndex');
    var select = this.el;
    var list = this.ref('list');

    if (!list) {
      return;
    }

    var index = selectedIndex;

    if (index < 0) {
      index = 0;
    }

    var topOption = list.children[index];
    var to = topOption.offsetTop;
    scrollTo(select, to, duration);
  },
  handleMouseEnter: function handleMouseEnter(e) {
    this.data.set('active', true);
    this.fire('mouseenter', e);
  },
  handleMouseLeave: function handleMouseLeave(e) {
    this.data.set('active', false);
    this.fire('mouseleave', e);
  },
  handleClick: function handleClick(itemValue) {
    var type = this.data.get('type');
    this.fire('select', {
      type: type,
      itemValue: itemValue
    });
  },
  template: "<div class=\"{{prefixCls}}-select {{active ? prefixCls + '-select-active' : ''}}\"\n        on-mouseenter=\"handleMouseEnter\"\n        on-mouseleave=\"handleMouseLeave\">\n        <ul s-ref=\"list\">\n            <li\n                s-for=\"option, index in renderOptions\"\n                role=\"button\"\n                on-click=\"handleClick(option.value)\"\n                class=\"{{option.className}}\"\n                disabled=\"{{option.disabled}}\"\n            >\n                {{option.value}}\n            </li>\n        </ul>\n    </div>"
});

exports["default"] = _default;