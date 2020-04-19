"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _san = _interopRequireDefault(require("san"));

var _utils = require("./utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var definitions = new _utils.MiniMap();
var twoToneColorPalette = {
  primaryColor: '#333',
  secondaryColor: '#E6E6E6'
};

var icon = _san["default"].defineComponent({
  computed: {
    target: function target() {
      var target;
      var primaryColor = this.data.get('primaryColor');
      var secondaryColor = this.data.get('secondaryColor');
      var type = this.data.get('type');
      var colors = twoToneColorPalette;

      if (primaryColor) {
        colors = {
          primaryColor: primaryColor,
          secondaryColor: secondaryColor || (0, _utils.getSecondaryColor)(primaryColor)
        };
      }

      if ((0, _utils.isIconDefinition)(type)) {
        target = type;
      } else if (typeof type === 'string') {
        target = icon.get(type, colors);

        if (!target) {
          return null;
        }
      }

      if (!target) {
        return null;
      }

      if (target && typeof target.icon === 'function') {
        target = _objectSpread({}, target, {
          icon: target.icon(colors.primaryColor, colors.secondaryColor)
        });
      }

      return target;
    }
  },
  template: "\n        <svg\n            key=\"svg-{{target.name}}\"\n            data-icon=\"{{target.name}}\"\n            width=\"1em\"\n            height=\"1em\"\n            fill=\"currentColor\"\n            aria-hidden=\"true\"\n            focusable=\"false\"\n            viewBox=\"{{target.icon.attrs.viewBox || '0 0 1024 1024'}}\"\n        >\n            <slot />\n            <path\n                s-for=\"p, index in target.icon.children\"\n                key=\"svg-{{target.name}}-path-{{index}}\"\n                s-bind=\"{{p.attrs}}\"\n            >\n            </path>\n        </svg>\n    "
});

icon.add = function (icons) {
  icons.forEach(function (icon) {
    definitions.set((0, _utils.withSuffix)(icon.name, icon.theme), icon);
  });
};

icon.clear = function () {
  definitions.clear();
};

icon.get = function (key, colors) {
  if (key) {
    var target = definitions.get(key);

    if (target && typeof target.icon === 'function') {
      target = _objectSpread({}, target, {
        icon: target.icon(colors.primaryColor, colors.secondaryColor)
      });
    }

    return target;
  }
};

icon.setTwoToneColors = function (twoToneColorPaletteSetter) {
  twoToneColorPalette.primaryColor = twoToneColorPaletteSetter.primaryColor;
  twoToneColorPalette.secondaryColor = twoToneColorPaletteSetter.secondaryColor || (0, _utils.getSecondaryColor)(twoToneColorPaletteSetter.primaryColor);
};

icon.getTwoToneColors = function () {
  return _objectSpread({}, twoToneColorPalette);
};

var _default = icon;
exports["default"] = _default;