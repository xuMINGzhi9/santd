"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _san = _interopRequireWildcard(require("san"));

var _animate = _interopRequireDefault(require("../../core/util/animate"));

var _popupInner = _interopRequireDefault(require("./popupInner"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var _default = _san["default"].defineComponent({
  dataTypes: {
    visible: _san.DataTypes.bool,
    getClassNameFromAlign: _san.DataTypes.func,
    align: _san.DataTypes.object,
    destroyPopupOnHide: _san.DataTypes.bool,
    prefixCls: _san.DataTypes.string,
    point: _san.DataTypes.object
  },
  inited: function inited() {
    var _this = this;

    var destroyPopupOnHide = this.data.get('destroyPopupOnHide');
    this.data.set('destroy', true);
    this.watch('visible', function (val) {
      if (!val) {
        _this.data.set('currentAlignClassName', ''); // 这里先简单的设置一个timeout来保证动画结束后且destroyPopupOnHide为true时删除popup子节点


        window.setTimeout(function () {
          _this.data.set('destroy', !destroyPopupOnHide);
        }, 500);
      } else {
        _this.data.set('destroy', true);

        var rootNode = _this.data.get('getRootDomNode');

        if (rootNode && _this.data.get('stretch')) {
          _this.data.set('targetWidth', rootNode.offsetWidth);

          _this.data.set('targetHeight', rootNode.offsetHeight);
        }
      }
    });
  },
  computed: {
    classes: function classes() {
      var prefixCls = this.data.get('prefixCls');
      var currentAlignClassName = this.data.get('currentAlignClassName');
      var align = this.data.get('align');
      var getClassNameFromAlign = this.data.get('getClassNameFromAlign');
      var classArr = [prefixCls, currentAlignClassName || getClassNameFromAlign(align)];
      return classArr;
    },
    getPopupStyle: function getPopupStyle() {
      var targetWidth = this.data.get('targetWidth');
      var targetHeight = this.data.get('targetHeight');
      var stretch = this.data.get('stretch') || '';
      var popupStyle = this.data.get('popupStyle');
      var sizeStyle = {};

      if (stretch.indexOf('height') !== -1) {
        sizeStyle.height = "".concat(targetHeight, "px");
      } else if (stretch.indexOf('minHeight') !== -1) {
        sizeStyle['min-height'] = "".concat(targetHeight, "px");
      }

      if (stretch.indexOf('width') !== -1) {
        sizeStyle.width = "".concat(targetWidth, "px");
      } else if (stretch.indexOf('minWidth') !== -1) {
        sizeStyle['min-width'] = "".concat(targetWidth, "px");
      }

      return _objectSpread({}, sizeStyle, {}, popupStyle);
    }
  },
  getPopupDomNode: function getPopupDomNode() {
    var popupDomNode = this.ref('popupInstance');
    return popupDomNode && popupDomNode.el.querySelector('div');
  },
  handleAlign: function handleAlign(_ref) {
    var source = _ref.source,
        result = _ref.result;
    var getClassNameFromAlign = this.data.get('getClassNameFromAlign');
    var currentAlignClassName = getClassNameFromAlign(result);
    var prevCurrentAlignClassName = this.data.get('currentAlignClassName');

    if (prevCurrentAlignClassName !== currentAlignClassName) {
      this.data.set('currentAlignClassName', currentAlignClassName);
    }

    this.fire('align', {
      source: source,
      result: result
    });
  },
  attached: function attached() {
    this.dispatch('santd_popup_save', this);
  },
  handlePopupMouseEnter: function handlePopupMouseEnter(e) {
    this.dispatch('santd_popup_mouseEnter', e);
  },
  handlePopupMouseLeave: function handlePopupMouseLeave(e) {
    this.dispatch('santd_popup_mouseLeave', e);
  },
  handlePopupMouseDown: function handlePopupMouseDown(e) {
    this.dispatch('santd_popup_mouseDown', e);
  },
  refresh: function refresh() {
    this.ref('popupinner').forceAlign();
  },
  components: {
    's-animate': _animate["default"],
    's-popupinner': _popupInner["default"]
  },
  template: "\n        <div\n            on-mouseenter=\"handlePopupMouseEnter\"\n            on-mouseleave=\"handlePopupMouseLeave\"\n            on-mousedown=\"handlePopupMouseDown\"\n        >\n            <s-popupinner\n                target=\"{{point ? point : getRootDomNode}}\"\n                key=\"popup\"\n                monitorWindowResize=\"{{monitorWindowResize}}\"\n                align=\"{{align}}\"\n                on-align=\"handleAlign\"\n                class=\"{{classes}}\"\n                hiddenClassName=\"{{prefixCls}}-hidden\"\n                prefixCls=\"{{prefixCls}}\"\n                visible=\"{{visible}}\"\n                showProp=\"visible\"\n                transitionName=\"{{transitionName}}\"\n                popupStyle=\"{{getPopupStyle}}\"\n                popupClassName=\"{{popupClassName}}\"\n                s-ref=\"popupinner\"\n            >\n                <slot s-if=\"destroy\" />\n            </s-popupinner>\n        </div>\n    "
});

exports["default"] = _default;