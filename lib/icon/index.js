"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _san = _interopRequireWildcard(require("san"));

var allIcons = _interopRequireWildcard(require("@ant-design/icons-svg"));

var _util = require("../core/util");

var _icon = _interopRequireDefault(require("./icon"));

var _iconfont = _interopRequireDefault(require("./iconfont"));

var _utils = require("./utils");

var _twoTonePrimaryColor = require("./twoTonePrimaryColor");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var prefixCls = (0, _util.classCreator)('icon')();

_icon["default"].add(Object.keys(allIcons).map(function (key) {
  return allIcons[key];
}));

(0, _twoTonePrimaryColor.setTwoToneColor)('#1890ff');

var icon = _san["default"].defineComponent({
  components: {
    's-icon': _icon["default"]
  },
  dataTypes: {
    tabIndex: _san.DataTypes.number
  },
  computed: {
    classes: function classes() {
      var type = this.data.get('type');
      var classArr = [prefixCls];
      Boolean(type) && classArr.push("".concat(prefixCls, "-").concat(type));
      return classArr;
    },
    innerSvgProps: function innerSvgProps() {
      var spin = this.data.get('spin');
      var type = this.data.get('type');
      var rotate = this.data.get('rotate');
      var viewBox = this.data.get('viewBox');
      var theme = this.data.get('theme');
      var svgStyle = rotate ? {
        msTransform: "rotate(".concat(rotate, "deg)"),
        transform: "rotate(".concat(rotate, "deg)")
      } : undefined;

      var innerSvgProps = _objectSpread(_objectSpread({}, _utils.svgBaseProps), {}, {
        "class": !!spin || type === 'loading' ? "".concat(prefixCls, "-spin") : '',
        style: svgStyle,
        viewBox: viewBox
      });

      if (!viewBox) {
        delete innerSvgProps.viewBox;
      }

      if (typeof type === 'string') {
        var computedType = type;
        computedType = (0, _utils.withThemeSuffix)((0, _utils.removeTypeTheme)((0, _utils.alias)(computedType)), theme || 'outlined');
        innerSvgProps.computedType = computedType;
      }

      return innerSvgProps;
    }
  },
  inited: function inited() {
    this.data.set('hasComponent', !!this.sourceSlots.named.component);
    var iconTabIndex = this.data.get('tabIndex');

    if (iconTabIndex === undefined && this.listeners.click) {
      this.data.set('iconTabIndex', -1);
    }
  },
  handleClick: function handleClick(e) {
    this.fire('click', e);
  },
  template: "<i\n        aria-label=\"{{type && '\u56FE\u6807: ' + type}}\"\n        tabindex=\"{{iconTabIndex}}\"\n        on-click=\"handleClick\"\n        class=\"{{classes}}\"\n    >\n        <slot name=\"component\" s-if=\"{{hasComponent}}\" />\n        <s-icon\n            s-else\n            style=\"{{innerSvgProps.style}}\"\n            class=\"{{innerSvgProps.class}}\"\n            type=\"{{innerSvgProps.computedType}}\"\n            primaryColor=\"{{twoToneColor}}\"\n            theme=\"{{theme}}\"\n            spin=\"{{spin}}\"\n            rotate=\"{{rotate}}\"\n        >\n            <slot />\n        </s-icon>\n    </i>"
});

icon.createFromIconfontCN = _iconfont["default"];
icon.getTwoToneColor = _twoTonePrimaryColor.getTwoToneColor;
icon.setTwoToneColor = _twoTonePrimaryColor.setTwoToneColor;
var _default = icon;
exports["default"] = _default;