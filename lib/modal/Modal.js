"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _san = _interopRequireWildcard(require("san"));

var _util = require("../core/util");

var _Dialog = _interopRequireDefault(require("./Dialog"));

var _button = _interopRequireDefault(require("../button"));

var _receiver = _interopRequireDefault(require("../localeprovider/receiver"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var prefixCls = (0, _util.classCreator)('modal')();

var _default = _san["default"].defineComponent({
  dataTypes: {
    okText: _san.DataTypes.string,
    cancelText: _san.DataTypes.string,
    centered: _san.DataTypes.bool,
    width: _san.DataTypes.oneOfType([_san.DataTypes.number, _san.DataTypes.string]),
    confirmLoading: _san.DataTypes.bool,
    visible: _san.DataTypes.bool,
    closable: _san.DataTypes.bool,
    getContainer: _san.DataTypes.func
  },
  components: {
    's-button': _button["default"]
  },
  computed: _objectSpread(_objectSpread({}, _receiver["default"].computed), {}, {
    wrapClass: function wrapClass() {
      var centered = this.data.get('centered');
      var wrapClassName = this.data.get('wrapClassName');
      var classArr = [wrapClassName];
      !!centered && classArr.push("".concat(prefixCls, "-centered"));
      return classArr.join(' ');
    }
  }),
  initData: function initData() {
    return {
      componentName: 'Modal',
      width: 520,
      transitionName: 'zoom',
      maskTransitionName: 'fade',
      confirmLoading: false,
      visible: false,
      okType: 'primary'
    };
  },
  inited: _receiver["default"].inited,
  attached: function attached() {
    if (!this.dialog) {
      var _this$data$get = this.data.get(),
          getContainer = _this$data$get.getContainer,
          props = _objectWithoutProperties(_this$data$get, ["getContainer"]);

      this.data.set('_PROPS_', props);
      this.dialog = new _Dialog["default"]({
        owner: this,
        source: "\n                    <s-dialog s-bind=\"{{_PROPS_}}\"\n                        title=\"{=title=}\"\n                        visible=\"{=visible=}\"\n                        wrapClassName=\"{{wrapClass}}\"\n                        on-close=\"handleCancel\"\n                        on-afterClose=\"afterClose\"\n                    >\n                        <slot/>\n                        <slot name=\"footer\" slot=\"footer\">\n                            <s-button s-bind=\"{{cancelButtonProps}}\"\n                                on-click=\"handleCancel\"\n                            >{{cancelText || locale.cancelText}}</s-button>\n                            <s-button s-bind=\"{{okButtonProps}}\"\n                                type=\"{{okType}}\"\n                                loading=\"{{confirmLoading}}\"\n                                on-click=\"handleOk\"\n                            >{{okText || locale.okText}}</s-button>\n                        </slot>\n                    </s-dialog>\n                "
      });
      var container = getContainer ? getContainer() : document.body;
      this.dialog.attach(container);
    }
  },
  handleCancel: function handleCancel(e) {
    this.fire('cancel', e);
  },
  handleOk: function handleOk(e) {
    this.fire('ok', e);
  },
  afterClose: function afterClose() {
    this.fire('afterClose');
  },
  template: '<div />'
});

exports["default"] = _default;