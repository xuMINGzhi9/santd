"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _san = _interopRequireWildcard(require("san"));

var _util = require("../core/util");

var _Row = _interopRequireDefault(require("./Row"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var cc = (0, _util.classCreator)('col');
var baseClass = cc();
var SUPPORT_PROPS = ['order', 'offset', 'pull', 'push'];
var SUPPORT_SCREENS = ['xs', 'sm', 'md', 'lg', 'xl', 'xxl'];

var _default = _san["default"].defineComponent({
  dataTypes: {
    span: _san.DataTypes.oneOfType([_san.DataTypes.string, _san.DataTypes.number]),
    order: _san.DataTypes.oneOfType([_san.DataTypes.string, _san.DataTypes.number]),
    offset: _san.DataTypes.oneOfType([_san.DataTypes.string, _san.DataTypes.number]),
    push: _san.DataTypes.oneOfType([_san.DataTypes.string, _san.DataTypes.number]),
    pull: _san.DataTypes.oneOfType([_san.DataTypes.string, _san.DataTypes.number]),
    xs: _san.DataTypes.oneOfType([_san.DataTypes.number, _san.DataTypes.string, _san.DataTypes.object]),
    sm: _san.DataTypes.oneOfType([_san.DataTypes.number, _san.DataTypes.string, _san.DataTypes.object]),
    md: _san.DataTypes.oneOfType([_san.DataTypes.number, _san.DataTypes.string, _san.DataTypes.object]),
    lg: _san.DataTypes.oneOfType([_san.DataTypes.number, _san.DataTypes.string, _san.DataTypes.object]),
    xl: _san.DataTypes.oneOfType([_san.DataTypes.number, _san.DataTypes.string, _san.DataTypes.object]),
    xxl: _san.DataTypes.oneOfType([_san.DataTypes.number, _san.DataTypes.string, _san.DataTypes.object])
  },
  computed: {
    classes: function classes() {
      var arr = [baseClass];
      var data = this.data;
      var span = data.get('span');
      span && arr.push(cc(span));

      for (var i = 0; i < SUPPORT_PROPS.length; i++) {
        var key = SUPPORT_PROPS[i];
        var value = data.get(key);
        value && arr.push(cc("".concat(key, "-").concat(value)));
      }

      for (var _i = 0; _i < SUPPORT_SCREENS.length; _i++) {
        var size = SUPPORT_SCREENS[_i];

        var _value = data.get(size);

        if (_value === undefined) {
          continue;
        }

        var sizeProps = _typeof(_value) === 'object' ? _value || {} : {
          span: +_value
        };
        sizeProps.span !== undefined && arr.push(cc("".concat(size, "-").concat(sizeProps.span)));

        for (var j = 0; j < SUPPORT_PROPS.length; j++) {
          var _key = SUPPORT_PROPS[j];

          if (sizeProps[_key] || +sizeProps[_key] === 0) {
            arr.push(cc("".concat(size, "-").concat(_key, "-").concat(sizeProps[_key])));
          }
        }
      }

      return arr;
    }
  },
  getGutter: function getGutter(data) {
    var gutter = data.get('gutter');

    if (_typeof(gutter) === 'object') {
      var screens = data.get('screens');

      for (var i = 0; i < SUPPORT_SCREENS.length; i++) {
        var breakpoint = SUPPORT_SCREENS[i];

        if (screens[breakpoint] && gutter[breakpoint] != null) {
          return gutter[breakpoint];
        }
      }
    }

    return gutter;
  },
  attached: function attached() {
    var parent = this.parent;

    while (parent && !(parent instanceof _Row["default"])) {
      parent = parent.parent;
    }

    if (parent && parent.data) {
      var gutter = +this.getGutter(parent.data);

      if (gutter) {
        gutter = gutter / 2;
        this.data.set('colStyle', "padding-left:".concat(gutter, ";padding-right:").concat(gutter, ";"));
      }
    }
  },
  template: "\n        <div class=\"{{classes}}\" style=\"{{colStyle}}\">\n            <slot />\n        </div>\n    "
});

exports["default"] = _default;