"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isIconDefinition = isIconDefinition;
exports.normalizeAttrs = normalizeAttrs;
exports.getSecondaryColor = getSecondaryColor;
exports.withSuffix = withSuffix;
exports.getThemeFromTypeName = getThemeFromTypeName;
exports.removeTypeTheme = removeTypeTheme;
exports.withThemeSuffix = withThemeSuffix;
exports.alias = alias;
exports.svgBaseProps = exports.MiniMap = void 0;

var _generate = _interopRequireDefault(require("./generate"));

var _svgBaseProps;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function isIconDefinition(target) {
  return _typeof(target) === 'object' && typeof target.name === 'string' && typeof target.theme === 'string' && (_typeof(target.icon) === 'object' || typeof target.icon === 'function');
}

function normalizeAttrs() {
  var attrs = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  return Object.keys(attrs).reduce(function (acc, key) {
    var val = attrs[key];

    switch (key) {
      case 'class':
        acc.className = val;
        delete acc["class"];
        break;

      default:
        acc[key] = val;
    }

    return acc;
  }, {});
}

var MiniMap = /*#__PURE__*/function () {
  function MiniMap() {
    _classCallCheck(this, MiniMap);

    this.collection = {};
  }

  _createClass(MiniMap, [{
    key: "clear",
    value: function clear() {
      this.collection = {};
    }
  }, {
    key: "delete",
    value: function _delete(key) {
      return delete this.collection[key];
    }
  }, {
    key: "get",
    value: function get(key) {
      return this.collection[key];
    }
  }, {
    key: "has",
    value: function has(key) {
      return Boolean(this.collection[key]);
    }
  }, {
    key: "set",
    value: function set(key, value) {
      this.collection[key] = value;
      return this;
    }
  }, {
    key: "size",
    get: function get() {
      return Object.keys(this.collection).length;
    }
  }]);

  return MiniMap;
}();

exports.MiniMap = MiniMap;

function getSecondaryColor(primaryColor) {
  // choose the second color
  return (0, _generate["default"])(primaryColor)[0];
}

function withSuffix(name, theme) {
  switch (theme) {
    case 'filled':
      return "".concat(name, "-fill");

    case 'outlined':
      return "".concat(name, "-o");

    case 'twotone':
      return "".concat(name, "-twotone");

    default:
      throw new TypeError("Unknown theme type: ".concat(theme, ", name: ").concat(name));
  }
}

var svgBaseProps = (_svgBaseProps = {
  width: '1em',
  height: '1em',
  fill: 'currentColor'
}, _defineProperty(_svgBaseProps, 'aria-hidden', 'true'), _defineProperty(_svgBaseProps, "focusable", 'false'), _svgBaseProps);
exports.svgBaseProps = svgBaseProps;
var fillTester = /-fill$/;
var outlineTester = /-o$/;
var twoToneTester = /-twotone$/;

function getThemeFromTypeName(type) {
  var result = null;

  if (fillTester.test(type)) {
    result = 'filled';
  } else if (outlineTester.test(type)) {
    result = 'outlined';
  } else if (twoToneTester.test(type)) {
    result = 'twoTone';
  }

  return result;
}

function removeTypeTheme(type) {
  return type.replace(fillTester, '').replace(outlineTester, '').replace(twoToneTester, '');
}

function withThemeSuffix(type, theme) {
  var result = type;

  if (theme === 'filled') {
    result += '-fill';
  } else if (theme === 'outlined') {
    result += '-o';
  } else if (theme === 'twoTone') {
    result += '-twotone';
  } else {
    console.warn(false, 'Icon', "This icon '".concat(type, "' has unknown theme '").concat(theme, "'"));
  }

  return result;
} // For alias or compatibility


function alias(type) {
  switch (type) {
    case 'cross':
      return 'close';

    default:
  }

  return type;
}