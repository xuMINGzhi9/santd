"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _san = _interopRequireWildcard(require("san"));

var _Col = _interopRequireDefault(require("./Col"));

var _util = require("../core/util");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var cc = (0, _util.classCreator)('row');
var baseClass = cc();
var enquire = null; // matchMedia polyfill for
// https://github.com/WickyNilliams/enquire.js/issues/82

if (typeof window !== 'undefined') {
  var matchMediaPolyfill = function matchMediaPolyfill(mediaQuery) {
    return {
      media: mediaQuery,
      matches: false,
      addListener: function addListener() {},
      removeListener: function removeListener() {}
    };
  };

  window.matchMedia = window.matchMedia || matchMediaPolyfill;
  enquire = require('enquire.js');
}

var responsiveMap = {
  xs: '(max-width: 575px)',
  sm: '(min-width: 576px)',
  md: '(min-width: 768px)',
  lg: '(min-width: 992px)',
  xl: '(min-width: 1200px)',
  xxl: '(min-width: 1600px)'
};
var responsiveArray = ['xxl', 'xl', 'lg', 'md', 'sm', 'xs'];

function loopCMPT(list, gutter) {
  list && list.length && list.forEach(function (item) {
    if (item instanceof _Col["default"]) {
      item.data.set('colStyle', "padding-left:".concat(gutter, "px;padding-right:").concat(gutter, "px;"));
    }

    loopCMPT(item.children, gutter);
  });
}

var _default = _san["default"].defineComponent({
  dataTypes: {
    type: _san.DataTypes.oneOf(['normal', 'flex']),
    align: _san.DataTypes.oneOf(['top', 'middle', 'bottom']),
    gutter: _san.DataTypes.oneOfType([_san.DataTypes.number, _san.DataTypes.string, _san.DataTypes.object]),
    justify: _san.DataTypes.oneOf(['start', 'end', 'center', 'space-around', 'space-between'])
  },
  computed: {
    classes: function classes() {
      var arr = [baseClass];
      var type = this.data.get('type');
      var align = this.data.get('align');
      var justify = this.data.get('justify');

      if (type === 'flex') {
        arr.push(cc(type));
        align && arr.push(cc("".concat(type, "-").concat(align)));
        justify && arr.push(cc("".concat(type, "-").concat(justify)));
      }

      return arr;
    }
  },
  inited: function inited() {
    var _this = this;

    this._calcStyles = function () {
      var gutter = +_this.getGutter();

      if (gutter) {
        gutter = gutter / -2;

        _this.data.set('styles', "margin-left: ".concat(gutter, "px; margin-right:").concat(gutter, "px;"));
      }
    };

    this._calcStyles();

    this.watch('gutter', this._calcStyles);
  },
  getGutter: function getGutter() {
    var gutter = this.data.get('gutter');

    if (_typeof(gutter) === 'object') {
      var screens = this.data.get('screens');

      for (var i = 0; i <= responsiveArray.length; i++) {
        var breakpoint = responsiveArray[i];

        if (screens[breakpoint] && gutter[breakpoint] != null) {
          return gutter[breakpoint];
        }
      }
    }

    return gutter;
  },
  attached: function attached() {
    var _this2 = this;

    var gutter = +this.getGutter();

    if (gutter) {
      var slots = this.slot();

      if (slots && slots.length) {
        gutter = gutter / 2;
        loopCMPT(slots, gutter);
      }
    }

    this.nextTick(function () {
      responsiveArray.forEach(function (screen) {
        return enquire.register(responsiveMap[screen], {
          match: function match() {
            var gutter = +_this2.data.get('gutter');

            if (!isNaN(gutter)) {
              _this2.data.merge('screens', _defineProperty({}, screen, true));
            }
          },
          unmatch: function unmatch() {
            var gutter = +_this2.data.get('gutter');

            if (!isNaN(+gutter)) {
              _this2.data.merge('screens', _defineProperty({}, screen, false));
            }
          },
          // Keep a empty destory to avoid triggering unmatch when unregister
          destroy: function destroy() {}
        });
      });
    });
  },
  disposed: function disposed() {
    responsiveArray.forEach(function (screen) {
      return enquire.unregister(responsiveMap[screen]);
    });
  },
  initData: function initData() {
    return {
      screens: {},
      type: 'normal',
      gutter: 0
    };
  },
  template: "\n        <div class=\"{{classes}}\" style=\"{{styles}}\">\n            <slot />\n        </div>\n    "
});

exports["default"] = _default;