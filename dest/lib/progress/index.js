"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.ProgressSize = exports.ProgressType = void 0;

var _san = _interopRequireWildcard(require("san"));

var _util = require("../core/util");

var _icon = _interopRequireDefault(require("../icon"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

/**
 * @file 组件 progress
 * @author baozhixin <baozhixin@baidu.com>
 * @borrows https://ant.design/components/progress-cn/
 */
var prefixCls = (0, _util.classCreator)('progress')();

var validProgress = function validProgress(progress) {
  if (!progress || progress < 0) {
    return 0;
  }

  if (progress > 100) {
    return 100;
  }

  return progress;
};

var statusColorMap = {
  normal: '#108ee9',
  exception: '#ff5500',
  success: '#87d068'
};

var ProgressType = _san.DataTypes.oneOf(['line', 'circle', 'dashboard']);

exports.ProgressType = ProgressType;

var ProgressSize = _san.DataTypes.oneOf(['default', 'small']);

exports.ProgressSize = ProgressSize;

var ProgressInfo = _san["default"].defineComponent({
  template: "\n        <span class=\"".concat(prefixCls, "-text\" title=\"{{text}}\">\n            {{text}}\n            <s-icon s-if=\"showIcon\" type=\"{{icon}}\" theme=\"outlined\"/>\n        </span>\n    "),
  components: {
    's-icon': _icon["default"]
  }
});

var ProgressCirle = _san["default"].defineComponent({
  template: "\n        <svg\n            class=\"".concat(prefixCls, "-circle\"\n            viewBox=\"0 0 100 100\"\n            style=\"{{style}}\"\n        >\n            <path\n                class=\"").concat(prefixCls, "-circle-trail\"\n                d=\"{{pathString}}\"\n                stroke=\"{{trailColor}}\"\n                stroke-width=\"{{trailWidth || strokeWidth}}\"\n                fill-opacity=\"0\"\n                style=\"{{trailPathStyle}}\"\n            >\n            </path>\n            <path\n                class=\"").concat(prefixCls, "-circle-path\"\n                d=\"{{pathString}}\"\n                stroke-linecap=\"{{strokeLinecap}}\"\n                stroke-width=\"{{percent === 0 ? 0 : strokeWidth}}\"\n                fill-opacity=\"0\"\n                style=\"{{strokePathStyle}}\"\n            >\n            </path>\n        </svg>\n    "),
  initData: function initData() {
    return {
      gapPosition: 'top'
    };
  },
  computed: {
    pathStyles: function pathStyles() {
      var data = this.data;
      var percent = validProgress(data.get('percent'));
      var strokeWidth = data.get('strokeWidth');
      var strokeColor = data.get('strokeColor');
      var gapDegree = data.get('gapDegree') || 0;
      var gapPosition = data.get('gapPosition');
      var radius = 50 - strokeWidth / 2;
      var len = Math.PI * 2 * radius;
      var beginPositionX = 0;
      var beginPositionY = -radius;
      var endPositionX = 0;
      var endPositionY = -2 * radius;

      switch (gapPosition) {
        case 'left':
          beginPositionX = -radius;
          beginPositionY = 0;
          endPositionX = 2 * radius;
          endPositionY = 0;
          break;

        case 'right':
          beginPositionX = radius;
          beginPositionY = 0;
          endPositionX = -2 * radius;
          endPositionY = 0;
          break;

        case 'bottom':
          beginPositionY = radius;
          endPositionY = 2 * radius;
          break;

        default:
      }

      var pathString = "\n                M 50,50 m ".concat(beginPositionX, ",\n                ").concat(beginPositionY, " a ").concat(radius, ",\n                ").concat(radius, " 0 1 1 ").concat(endPositionX, ",\n                ").concat(-endPositionY, " a ").concat(radius, ",\n                ").concat(radius, " 0 1 1 ").concat(-endPositionX, ",\n                ").concat(endPositionY, "\n            ");
      var trailPathStyle = "\n                stroke-dasharray: ".concat(len - gapDegree, "px ").concat(len, "px;\n                stroke-dashoffset: -").concat(gapDegree / 2, "px;\n                transition: stroke-dashoffset .3s ease 0s, stroke-dasharray .3s ease 0s, stroke .3s;\n            ");
      var strokePathStyle = "\n                stroke: ".concat(strokeColor, ";\n                stroke-dasharray: ").concat(percent / 100 * (len - gapDegree), "px ").concat(len, "px;\n                stroke-dashoffset: -").concat(gapDegree / 2, "px;\n                transition: stroke-dashoffset .3s ease 0s,\n                    stroke-dasharray .3s ease 0s, stroke .3s,\n                    stroke-width .06s ease .3s;\n            ");
      return {
        pathString: pathString,
        trailPathStyle: trailPathStyle,
        strokePathStyle: strokePathStyle
      };
    },
    pathString: function pathString() {
      return this.data.get('pathStyles.pathString');
    },
    trailPathStyle: function trailPathStyle() {
      return this.data.get('pathStyles.trailPathStyle');
    },
    strokePathStyle: function strokePathStyle() {
      return this.data.get('pathStyles.strokePathStyle');
    }
  }
});

var _default = _san["default"].defineComponent({
  template: "\n        <div class=\"{{classes}}\">\n            <template s-if=\"type === 'line'\">\n                <div class=\"".concat(prefixCls, "-outer\">\n                    <div class=\"").concat(prefixCls, "-inner\">\n                        <div class=\"").concat(prefixCls, "-bg\" style=\"{{percentStyle}}\"></div>\n                        <div\n                            s-if=\"successPercent !== undefined\"\n                            class=\"").concat(prefixCls, "-success-bg\"\n                            style=\"{{successPercentStyle}}\"\n                        ></div>\n                    </div>\n                </div>\n                <s-info\n                    s-if=\"{{showInfo}}\"\n                    text=\"{{progressText}}\"\n                    icon=\"{{progressIcon}}\"\n                    showIcon=\"{{showIcon}}\"\n                />\n            </template>\n            <template s-elif=\"type === 'circle' || type === 'dashboard'\">\n                <div class=\"").concat(prefixCls, "-inner\" style=\"{{circleStyle}}\">\n                    <s-circle\n                        percent=\"{{percent}}\"\n                        strokeWidth=\"{{strokeWidth || 6}}\"\n                        trailWidth=\"{{strokeWidth || 6}}\"\n                        strokeColor=\"{{strokeColor || statusColorMap[progressStatus]}}\"\n                        strokeLinecap=\"{{strokeLinecap}}\"\n                        trailColor=\"{{trailColor}}\"\n                        gapDegree=\"{{gapDeg}}\"\n                        gapPosition=\"{{gapPos}}\"\n                    />\n                    <s-info\n                        s-if=\"{{showInfo}}\"\n                        text=\"{{progressText}}\"\n                        icon=\"{{progressIcon}}\"\n                        showIcon=\"{{showIcon}}\"\n                    />\n                </div>\n            </template>\n        </div>\n    "),
  dataTypes: {
    format: _san.DataTypes.func,
    gapDegree: _san.DataTypes.number,
    gapPosition: _san.DataTypes.oneOf(['top', 'bottom', 'left', 'right']),
    percent: _san.DataTypes.number,
    showInfo: _san.DataTypes.bool,
    size: ProgressSize,
    status: _san.DataTypes.oneOf(['success', 'active', 'exception']),
    strokeWidth: _san.DataTypes.number,
    strokeLinecap: _san.DataTypes.oneOf(['round', 'square']),
    strokeColor: _san.DataTypes.string,
    successPercent: _san.DataTypes.number,
    trailColor: _san.DataTypes.string,
    // mark
    type: ProgressType,
    width: _san.DataTypes.number
  },
  components: {
    's-info': ProgressInfo,
    's-circle': ProgressCirle
  },
  computed: {
    classes: function classes() {
      var data = this.data;
      var size = data.get('size');
      var showInfo = data.get('showInfo');
      var type = data.get('type');
      var progressStatus = data.get('progressStatus');
      var classArr = [prefixCls, "".concat(prefixCls, "-").concat(type === 'dashboard' && 'circle' || type), "".concat(prefixCls, "-status-").concat(progressStatus)];
      showInfo && classArr.push("".concat(prefixCls, "-show-info"));
      size && classArr.push("".concat(prefixCls, "-").concat(size));
      return classArr;
    },
    percentStyle: function percentStyle() {
      var data = this.data;
      var lineWidth = data.get('lineWidth');
      var lineHeight = data.get('lineHeight');
      var strokeLinecap = data.get('strokeLinecap');
      var borderRadius = strokeLinecap === 'square' ? 0 : 100;
      return "width: ".concat(lineWidth, "; height: ").concat(lineHeight, "; border-radius: ").concat(borderRadius, "px;");
    },
    successPercentStyle: function successPercentStyle() {
      var data = this.data;
      var successPercent = data.get('successPercent');
      var lineHeight = data.get('lineHeight');
      var strokeLinecap = data.get('strokeLinecap');
      var borderRadius = strokeLinecap === 'square' ? 0 : 100;
      return "width: ".concat(validProgress(successPercent), "%; height: ").concat(lineHeight, "; border-radius: ").concat(borderRadius, "px;");
    },
    lineWidth: function lineWidth() {
      return validProgress(this.data.get('percent')) + '%';
    },
    lineHeight: function lineHeight() {
      var data = this.data;
      var size = data.get('size');
      var strokeWidth = data.get('strokeWidth');
      return "".concat(strokeWidth || size === 'small' ? 6 : 8, "px");
    },
    progressStatus: function progressStatus() {
      var data = this.data;
      var status = data.get('status');
      var percent = data.get('percent');
      var successPercent = data.get('successPercent');
      return parseInt(successPercent ? successPercent.toString() : percent.toString(), 10) >= 100 && !status ? 'success' : status || 'normal';
    },
    progressText: function progressText() {
      var data = this.data;
      var format = data.get('format');
      var percent = data.get('percent');
      var successPercent = data.get('successPercent');
      var progressStatus = data.get('progressStatus');

      var textFormatter = format || function (percentNumber) {
        return "".concat(percentNumber, "%");
      };

      var text = '';

      if (format || progressStatus !== 'exception' && progressStatus !== 'success') {
        text = textFormatter(validProgress(percent), validProgress(successPercent));
      }

      return text;
    },
    progressIcon: function progressIcon() {
      var data = this.data;
      var showInfo = data.get('showInfo');
      var type = data.get('type');
      var progressStatus = data.get('progressStatus');
      var iconType = type === 'circle' || type === 'dashboard' ? '' : '-circle';
      var prefix = {
        exception: 'close',
        success: 'check'
      };
      var progressIcon = "".concat(prefix[progressStatus]).concat(iconType);
      return showInfo && progressIcon;
    },
    showIcon: function showIcon() {
      var data = this.data;
      var progressText = data.get('progressText');
      var progressStatus = data.get('progressStatus');
      return !progressText && !!~['exception', 'success'].indexOf(progressStatus);
    },
    circleStyle: function circleStyle() {
      var data = this.data;
      var circleSize = data.get('width') || 120;
      var fontSize = circleSize * 0.15 + 6;
      return "width: ".concat(circleSize, "px; height: ").concat(circleSize, "px; font-size: ").concat(fontSize, "px;");
    },
    gapPos: function gapPos() {
      var gapPosition = this.data.get('gapPosition');
      var type = this.data.get('type');
      return gapPosition || type === 'dashboard' && 'bottom' || 'top';
    },
    gapDeg: function gapDeg() {
      var gapDegree = this.data.get('gapDegree');
      var type = this.data.get('type');
      return gapDegree || type === 'dashboard' && 75;
    }
  },
  initData: function initData() {
    return {
      percent: 0,
      showInfo: true,
      size: 'default',
      strokeLinecap: 'round',
      successPercent: 0,
      trailColor: '#f3f3f3',
      type: 'line',
      width: 132,
      statusColorMap: statusColorMap
    };
  }
});

exports["default"] = _default;