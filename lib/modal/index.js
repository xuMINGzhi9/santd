"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _Modal = _interopRequireDefault(require("./Modal"));

var _confirm = _interopRequireDefault(require("./confirm"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var iconMaps = {
  info: 'info-circle',
  success: 'check-circle',
  error: 'close-circle',
  warning: 'exclamation-circle'
};
['success', 'info', 'warning', 'error'].forEach(function (type) {
  _Modal["default"][type] = function (props) {
    var iconType = iconMaps[type];

    var config = _objectSpread({
      type: type,
      iconType: iconType,
      okCancel: false
    }, props);

    return (0, _confirm["default"])(config);
  };
});
_Modal["default"].warn = _Modal["default"].warning;

_Modal["default"].confirm = function (props) {
  var config = _objectSpread({
    type: 'confirm',
    okCancel: true
  }, props);

  return (0, _confirm["default"])(config);
};

var _default = _Modal["default"];
exports["default"] = _default;