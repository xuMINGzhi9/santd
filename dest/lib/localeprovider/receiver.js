"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _zh_CN = _interopRequireDefault(require("./zh_CN"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var _default = {
  computed: {
    locale: function locale() {
      var componentName = this.data.get('componentName') || 'global';
      var defaultLocale = this.data.get('defaultLocale');
      var locale = defaultLocale || _zh_CN["default"][componentName];

      var sanLocale = this.data.get('localeContext') || _zh_CN["default"];

      var localeFromContext = componentName && sanLocale ? sanLocale[componentName] : {};

      var result = _objectSpread({}, locale, {}, localeFromContext);

      return result;
    },
    localeCode: function localeCode() {
      var sanLocale = this.data.get('localeContext') || _zh_CN["default"];

      var localeCode = sanLocale && sanLocale.locale;

      if (sanLocale && sanLocale.exist && !localeCode) {
        return _zh_CN["default"].locale;
      }

      return localeCode;
    }
  },
  inited: function inited() {
    this.dispatch('santd_add_locale_receiver', this);
  }
};
exports["default"] = _default;