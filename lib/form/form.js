"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _san = _interopRequireWildcard(require("san"));

var _util = require("../core/util");

var _createFormField = _interopRequireDefault(require("./src/createFormField"));

var _domScrollIntoView = _interopRequireDefault(require("dom-scroll-into-view"));

var _createBaseForm = _interopRequireDefault(require("./src/createBaseForm"));

var _utils = require("./src/utils");

var _has = _interopRequireDefault(require("lodash/has"));

var _isEmpty = _interopRequireDefault(require("lodash/isEmpty"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var prefixCls = (0, _util.classCreator)('form')();

var form = _san["default"].defineComponent({
  dataTypes: {
    hideRequiredMark: _san.DataTypes.bool,
    layout: _san.DataTypes.oneOf(['inline', 'horizontal', 'vertical']),
    wrapperCol: _san.DataTypes.object,
    labelCol: _san.DataTypes.object,
    labelAlign: _san.DataTypes.string,
    colon: _san.DataTypes.bool
  },
  computed: {
    classes: function classes() {
      var layout = this.data.get('layout');
      var hideRequiredMark = this.data.get('hideRequiredMark');
      var classArr = [prefixCls];
      layout === 'horizontal' && classArr.push("".concat(prefixCls, "-horizontal"));
      layout === 'vertical' && classArr.push("".concat(prefixCls, "-vertical"));
      layout === 'inline' && classArr.push("".concat(prefixCls, "-inline"));
      hideRequiredMark && classArr.push("".concat(prefixCls, "-hide-required-mark"));
      return classArr;
    }
  },
  initData: function initData() {
    return {
      colon: true,
      layout: 'horizontal',
      hideRequiredMark: false,
      labelAlign: 'right'
    };
  },
  inited: function inited() {
    this.items = [];
  },
  handleSubmit: function handleSubmit(e) {
    this.fire('submit', e);
  },
  setFormProps: function setFormProps(formItem) {
    var labelAlign = formItem.data.get('labelAlign') || this.data.get('labelAlign');
    var labelCol = formItem.data.get('labelCol');
    (0, _isEmpty["default"])(labelCol) && (labelCol = this.data.get('labelCol'));
    var wrapperCol = formItem.data.get('wrapperCol');
    (0, _isEmpty["default"])(wrapperCol) && (wrapperCol = this.data.get('wrapperCol'));
    var colon = formItem.data.get('colon') || this.data.get('colon');
    formItem.data.set('labelAlign', labelAlign);
    formItem.data.set('labelCol', labelCol);
    formItem.data.set('wrapperCol', wrapperCol);
    formItem.data.set('colon', colon);
  },
  updated: function updated() {
    var _this = this;

    this.items.forEach(function (item) {
      item.data.set('form', _this.form || _this, {
        force: true
      });
    });
  },
  attached: function attached() {
    this.updated();
    this.dispatch('santd_form_add', this);
  },
  getForm: function getForm() {
    var component = this.parentComponent;
    var form;

    while (component) {
      if (component.fieldsStore) {
        form = component;
        break;
      }

      component = component.parentComponent;
    }

    return form;
  },
  messages: {
    santd_formitem_add: function santd_formitem_add(payload) {
      if (!this.form) {
        this.form = this.getForm();
      }

      var formItem = payload.value;
      this.setFormProps(formItem); // 判断如果父组件不是create出来的form，自己持有子组件

      if (!this.form) {
        this.items.push(formItem);
      } else {
        this.dispatch('santd_formitem_add', formItem);
      }
    }
  },
  template: "\n        <form\n            class=\"{{classes}}\"\n            on-submit=\"handleSubmit\"\n        >\n            <slot></slot>\n        </form>\n    "
});

var mixins = {
  validateFieldsAndScroll: function validateFieldsAndScroll(ns, opt, cb) {
    var _this2 = this;

    var _getParams = (0, _utils.getParams)(ns, opt, cb),
        names = _getParams.names,
        options = _getParams.options,
        callback = _getParams.callback;

    var newCb = function newCb(error, values) {
      if (error !== null) {
        var validNames = _this2.fieldsStore.getValidFieldsName();

        var firstNode;
        var firstTop;
        validNames.forEach(function (name) {
          if ((0, _has["default"])(error, name)) {
            var decoratorComponent = _this2.getDecoratorComponent(name);

            if (decoratorComponent) {
              var node = decoratorComponent.el;
              var top = node.getBoundingClientRect().top;

              if (node.type !== 'hidden' && (firstTop === undefined || firstTop > top)) {
                firstTop = top;
                firstNode = node;
              }
            }
          }
        });

        if (firstNode) {
          var c = options.container || (0, _utils.getScrollableContainer)(firstNode);
          (0, _domScrollIntoView["default"])(firstNode, c, _objectSpread({
            onlyScrollIfNeeded: true
          }, options.scroll));
        }
      } else {
        callback(error, values);
      }
    };

    return this.validateFields(names, options, newCb);
  }
};
form.createFormField = _createFormField["default"];

form.create = function (options) {
  return (0, _createBaseForm["default"])(_objectSpread(_objectSpread({}, options), {}, {
    fieldNameProps: 'id',
    fieldMetaProp: 'data-__meta',
    fieldDataProp: 'data-__field'
  }), mixins);
};

var _default = form;
exports["default"] = _default;