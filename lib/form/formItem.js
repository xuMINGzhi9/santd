"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _san = _interopRequireWildcard(require("san"));

var _util = require("../core/util");

var _row = _interopRequireDefault(require("../row"));

var _col = _interopRequireDefault(require("../col"));

var _icon = _interopRequireDefault(require("../icon"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

var prefixCls = (0, _util.classCreator)('form')(); // 遍历子找到含有decorator的组件，拿到decorator的数据

function findDecoratorComponent(data) {
  var result = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
  data.forEach(function (item) {
    if (item.nodeType === 5 && item.data.get('decorator')) {
      result.push(item);
    }

    if (item.children && item.children.length) {
      findDecoratorComponent(item.children, result);
    }
  });
  return result;
}

var _default = _san["default"].defineComponent({
  dataTypes: {
    id: _san.DataTypes.string,
    label: _san.DataTypes.string,
    labelAlign: _san.DataTypes.oneOf(['left', 'right']),
    labelCol: _san.DataTypes.object,
    wrapperCol: _san.DataTypes.object,
    help: _san.DataTypes.oneOfType([_san.DataTypes.string, _san.DataTypes.array]),
    extra: _san.DataTypes.string,
    validateStatus: _san.DataTypes.oneOf(['success', 'warning', 'error', 'validating', '']),
    hasFeedback: _san.DataTypes.bool,
    required: _san.DataTypes.bool,
    colon: _san.DataTypes.bool,
    prop: _san.DataTypes.string,
    decorator: _san.DataTypes.object,
    htmlFor: _san.DataTypes.string
  },
  initData: function initData() {
    return {
      validateState: false,
      showMessage: true,
      fieldData: '',
      labelCol: {},
      wrapperCol: {}
    };
  },
  inited: function inited() {
    this.data.set('hasLabel', !!this.sourceSlots.named.label || this.data.get('label'));
    this.data.set('hasExtra', !!this.sourceSlots.named.extra || this.data.get('extra'));
    this.data.set('hasHelpSlot', !!this.sourceSlots.named.help);
  },
  components: {
    's-row': _row["default"],
    's-col': _col["default"],
    's-icon': _icon["default"]
  },
  computed: {
    isRequired: function isRequired() {
      var required = this.data.get('required');

      if (required !== undefined) {
        return required;
      }

      var name = this.data.get('name');
      var form = this.data.get('form');

      if (name && form) {
        var fieldMeta = form.fieldsStore.getFieldMeta(name) || {};
        var validate = fieldMeta.validate || [];
        return validate.filter(function (item) {
          return !!item.rules;
        }).some(function (item) {
          return item.rules.some(function (rule) {
            return rule.required;
          });
        });
      }

      return false;
    },
    labelClassName: function labelClassName() {
      var required = this.data.get('isRequired');
      var colon = this.data.get('colon');
      var classArr = [];
      required && classArr.push("".concat(prefixCls, "-item-required"));
      !colon && classArr.push("".concat(prefixCls, "-item-no-colon"));
      return classArr;
    },
    getValidateStatus: function getValidateStatus() {
      var name = this.data.get('name');
      var form = this.data.get('form');

      if (name && form) {
        var field = form.fieldsStore.getField(name) || {};
        var fieldMeta = form.fieldsStore.getFieldMeta(name) || {};

        if (field.validating) {
          return 'validating';
        }

        if (field.errors) {
          return 'error';
        }

        var fieldValue = 'value' in field ? field.value : fieldMeta.initialValue;

        if (fieldValue !== undefined && fieldValue !== null && fieldValue !== '') {
          return 'success';
        }
      }

      return '';
    },
    getHelpMessage: function getHelpMessage() {
      var name = this.data.get('name');
      var form = this.data.get('form');
      var help = this.data.get('help');

      if (help === undefined && name && form) {
        var field = form.fieldsStore.getField(name) || {};
        var errors = field.errors;

        if (errors) {
          return errors.map(function (e) {
            return e.message;
          }).reduce(function (current, item) {
            return [].concat(_toConsumableArray(current), [' ', item]);
          }, []).slice(1);
        }

        return '';
      }

      return help;
    },
    iconType: function iconType() {
      var propsValidateStatus = this.data.get('validateStatus');
      var validateStatus = propsValidateStatus === undefined ? this.data.get('getValidateStatus') : propsValidateStatus;
      var iconType = '';

      switch (validateStatus) {
        case 'success':
          iconType = 'check-circle';
          break;

        case 'warning':
          iconType = 'exclamation-circle';
          break;

        case 'error':
          iconType = 'close-circle';
          break;

        case 'validating':
          iconType = 'loading';
          break;

        default:
          iconType = '';
          break;
      }

      return iconType;
    },
    validateWrapperClassName: function validateWrapperClassName() {
      var propsValidateStatus = this.data.get('validateStatus');
      var validateStatus = propsValidateStatus === undefined ? this.data.get('getValidateStatus') : propsValidateStatus;
      var hasFeedback = this.data.get('hasFeedback');
      var classes = prefixCls + '-item-control';

      if (validateStatus) {
        var classArr = ["".concat(prefixCls, "-item-control")];
        (hasFeedback || validateStatus === 'validating') && classArr.push('has-feedback');
        validateStatus === 'success' && classArr.push('has-success');
        validateStatus === 'warning' && classArr.push('has-warning');
        validateStatus === 'error' && classArr.push('has-error');
        validateStatus === 'validating' && classArr.push('is-validating');
        return classArr;
      }

      return classes;
    }
  },
  attached: function attached() {
    var children = this.slotChildren;
    var decoratorComponents = findDecoratorComponent(children);
    this.data.set('decoratorComponents', decoratorComponents); // decorators有可能有多个，这里只写入第一个的name，否则没有办法做样式上的处理

    decoratorComponents[0] && this.data.set('name', decoratorComponents[0].data.get('decorator.name')); // 把当前的formitem给form去做处理

    this.dispatch('santd_formitem_add', this);
  },
  detached: function detached() {
    this.dispatch('santd_formitem_remove', this);
  },
  messages: {
    'UI:form-item-interact': function UIFormItemInteract(item) {
      var _this = this;

      var decoratorComponents = this.data.get('decoratorComponents') || [];
      decoratorComponents.forEach(function (decoratorComponent) {
        if (item.target === decoratorComponent) {
          _this.dispatch('santd_form_change', {
            name: decoratorComponent.data.get('decorator').name,
            value: item.value.fieldValue,
            action: item.value.type,
            e: item.value.e
          });
        }
      });
    }
  },
  template: "\n        <div key=\"row\" class=\"".concat(prefixCls, "-item {{getHelpMessage || hasHelpSlot ? '").concat(prefixCls, "-item-with-help' : ''}}\">\n            <s-row>\n                <s-col\n                    s-if=\"hasLabel\"\n                    class=\"").concat(prefixCls, "-item-label {{labelAlign === 'left' ? '").concat(prefixCls, "-item-label-left' : ''}}\"\n                    s-bind=\"{{labelCol || {}}}\"\n                >\n                    <label htmlFor=\"{{id || htmlFor}}\" title=\"{{hasLabel ? label || '' : ''}}\" class=\"{{labelClassName}}\">\n                        <slot name=\"label\" s-if=\"!label\" />\n                        <template s-else>{{label}}</template>\n                    </label>\n                </s-col>\n                <s-col s-bind=\"{{wrapperCol || {}}}\" class=\"").concat(prefixCls, "-item-control-wrapper\">\n                    <div class=\"{{validateWrapperClassName}}\">\n                        <div class=\"").concat(prefixCls, "-item-children\">\n                            <slot />\n                            <span s-if=\"hasFeedback && iconType\" class=\"").concat(prefixCls, "-item-children-icon\">\n                                <s-icon type=\"{{iconType}}\" theme=\"{{iconType === 'loading' ? 'outlined' : 'filled'}}\" />\n                            </span>\n                        </div>\n                        <div s-if=\"getHelpMessage || hasHelpSlot\" class=\"").concat(prefixCls, "-explain\" key=\"help\">\n                            <slot name=\"help\" s-if=\"hasHelpSlot\" />\n                            <template s-else>{{getHelpMessage}}</template>\n                        </div>\n                        <div s-if=\"hasExtra\" class=\"").concat(prefixCls, "-extra\">\n                            <slot name=\"extra\" s-if=\"!extra\" />\n                            <template s-else>{{extra}}</template>\n                        </div>\n                    </div>\n                </s-col>\n            </s-row>\n        </div>\n    ")
});

exports["default"] = _default;