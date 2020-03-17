"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _san = _interopRequireDefault(require("san"));

var _zh_CN = _interopRequireDefault(require("./zh_CN"));

var moment = _interopRequireWildcard(require("moment"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/**
 * @file Santd locale provider file
 * @author mayihui@baidu.com
 **/
var _default = _san["default"].defineComponent({
  initData: function initData() {
    return {
      locale: _zh_CN["default"],
      localeProvider: true
    };
  },
  inited: function inited() {
    this.receivers = [];
    var locale = this.data.get('locale');

    if (locale && locale.locale) {
      moment.locale(locale.locale);
    } else {
      moment.locale('en');
    }
  },
  disposed: function disposed() {
    this.receivers = null;
  },
  updated: function updated() {
    var locale = this.data.get('locale');
    this.receivers.forEach(function (child) {
      child.data.set('localeContext', locale);
    });
  },
  messages: {
    santd_add_locale_receiver: function santd_add_locale_receiver(payload) {
      this.receivers.push(payload.value);
      this.updated();
    }
  },
  template: '<div><slot /></div>'
});

exports["default"] = _default;