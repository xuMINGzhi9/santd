"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _san = _interopRequireDefault(require("san"));

var _statistic = _interopRequireDefault(require("./statistic"));

var _moment = _interopRequireDefault(require("moment"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var timeUnits = [[/Y+/g, 1000 * 60 * 60 * 24 * 365], // years
[/M+/g, 1000 * 60 * 60 * 24 * 30], // months
[/D+/g, 1000 * 60 * 60 * 24], // days
[/H+/g, 1000 * 60 * 60], // hours
[/m+/g, 1000 * 60], // minutes
[/s+/g, 1000], // seconds
[/S+/g, 1] // million seconds
];
var REFRESH_INTERVAL = 33;

function padStart(string, length, chars) {
  var strLength = length ? string.length : 0;
  var l = length - strLength;
  var padding = ''; // 这里要判断l > 0，否则会死循环，因为l有可能算出来是-1

  while (l-- > 0) {
    padding += chars;
  }

  return length && strLength < length ? padding + string : string;
}

function formatTimeStr(duration, format) {
  var leftDuration = duration;
  timeUnits.forEach(function (_ref) {
    var _ref2 = _slicedToArray(_ref, 2),
        rule = _ref2[0],
        unit = _ref2[1];

    format = format.replace(rule, function (match) {
      var value = Math.floor(leftDuration / unit);
      leftDuration -= value * unit;
      return padStart('' + value, match.length, '0');
    });
  });
  return format;
}

var _default = _san["default"].defineComponent({
  initData: function initData() {
    return _objectSpread({}, _statistic["default"].prototype.initData(), {
      format: 'HH:mm:ss'
    });
  },
  inited: function inited() {
    _statistic["default"].prototype.inited.bind(this)();

    this.data.set('deadline', this.data.get('value'));
    this.data.set('value', this.getFormatValue());
    this.syncTimer();
  },
  getFormatValue: function getFormatValue() {
    var target = (0, _moment["default"])(this.data.get('deadline')).valueOf();
    var current = (0, _moment["default"])().valueOf();
    var diff = Math.max(target - current, 0);
    return formatTimeStr(diff, this.data.get('format'));
  },
  syncTimer: function syncTimer() {
    var value = this.data.get('deadline');
    var timestamp = (0, _moment["default"])(value).valueOf();

    if (timestamp >= Date.now()) {
      this.startTimer();
    } else {
      this.stopTimer();
      this.fire('finish');
    }
  },
  startTimer: function startTimer() {
    var _this = this;

    if (this.countdownId) {
      return;
    }

    this.countdownId = window.setInterval(function () {
      _this.data.set('value', _this.getFormatValue());

      _this.syncTimer();
    }, REFRESH_INTERVAL);
  },
  stopTimer: function stopTimer() {
    if (this.countdownId) {
      window.clearInterval(this.countdownId);
      this.countdownId = null;
    }
  }
}, _statistic["default"]);

exports["default"] = _default;