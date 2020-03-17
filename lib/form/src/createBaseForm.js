"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = _default;

var _san = _interopRequireDefault(require("san"));

var _asyncValidator = _interopRequireDefault(require("async-validator"));

var _get = _interopRequireDefault(require("lodash/get"));

var _set = _interopRequireDefault(require("lodash/set"));

var _eq = _interopRequireDefault(require("lodash/eq"));

var _utils = require("./utils");

var _createFieldsStore = _interopRequireDefault(require("./createFieldsStore"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var noop = function noop() {};

function _default() {
  var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var mixins = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var validateMessages = options.validateMessages,
      onFieldsChange = options.onFieldsChange,
      onValuesChange = options.onValuesChange,
      mapPropsToFields = options.mapPropsToFields,
      fieldMetaProp = options.fieldMetaProp,
      fieldDataProp = options.fieldDataProp;
  return function (wrappedComponent) {
    return _san["default"].defineComponent(_objectSpread({
      initData: function initData() {
        var wrappedComponentInitData = wrappedComponent.initData || noop;
        return _objectSpread({}, wrappedComponentInitData.bind(this)(), {
          submiting: false
        });
      }
    }, mixins, {
      inited: function inited() {
        var _this = this;

        // 表单实例
        this.items = []; // 表单存储对象

        this.fieldsStore = {}; // 渲染的表单

        this.renderFields = {}; // 事件缓存

        this.cachedBind = {}; // 创建表单存储对象

        var fields = mapPropsToFields && mapPropsToFields(this) || {};
        this.fieldsStore = (0, _createFieldsStore["default"])(fields); // 附加fieldsStore上的方法给当前的form来用

        ['getFieldsValue', 'getFieldValue', 'setFieldsInitialValue', 'getFieldsError', 'getFieldError', 'isFieldValidating', 'isFieldsValidating', 'isFieldsTouched', 'isFieldTouched'].forEach(function (key) {
          _this[key] = function () {
            var _this$fieldsStore;

            return (_this$fieldsStore = _this.fieldsStore)[key].apply(_this$fieldsStore, arguments);
          };
        }); // 这里把form的实例写入供外部调用

        this.data.set('form', this);
        var wrappedComponentInited = wrappedComponent.inited;
        wrappedComponentInited && wrappedComponentInited.bind(this)();
      },
      getRules: function getRules(fieldMeta, action) {
        var actionRules = fieldMeta.validate.filter(function (item) {
          return !action || item.trigger.indexOf(action) >= 0;
        }).map(function (item) {
          return item.rules;
        });
        return (0, _utils.flattenArray)(actionRules);
      },
      setFields: function setFields(maybeNestedFields, callback) {
        var _this2 = this;

        var fields = this.fieldsStore.flattenRegisteredFields(maybeNestedFields);
        this.fieldsStore.setFields(fields);

        if (onFieldsChange) {
          var changedFields = Object.keys(fields).reduce(function (acc, name) {
            return (0, _set["default"])(acc, name, _this2.fieldsStore.getField(name));
          }, {});
          onFieldsChange(this, changedFields, this.fieldsStore.getNestedAllFields());
        }

        this.data.set('form', this, {
          force: true
        });
      },
      setFieldsValue: function setFieldsValue(changedValues, callback) {
        var _this3 = this;

        var fieldsMeta = this.fieldsStore.fieldsMeta;
        var values = this.fieldsStore.flattenRegisteredFields(changedValues);
        var newFields = Object.keys(values).reduce(function (acc, name) {
          var isRegistered = fieldsMeta[name];

          if (isRegistered) {
            var value = values[name];
            acc[name] = {
              value: value
            };
          }

          return acc;
        }, {});
        this.setFields(newFields, callback);

        if (onValuesChange) {
          var allValues = this.fieldsStore.getAllValues();
          onValuesChange(this, changedValues, allValues);
        }

        Object.keys(newFields).forEach(function (name) {
          var decoratorComponent = _this3.getDecoratorComponent(name);

          if (decoratorComponent && 'value' in newFields[name]) {
            decoratorComponent.data.set('value', newFields[name].value || '');
          }
        });
      },
      validateFieldsInternal: function validateFieldsInternal(fields, _ref, callback) {
        var _this4 = this;

        var fieldNames = _ref.fieldNames,
            action = _ref.action,
            _ref$options = _ref.options,
            options = _ref$options === void 0 ? {} : _ref$options;
        // 所有的校验规则
        var allRules = {}; // 所有值

        var allValues = {}; // 校验的表单

        var allFields = {}; // 已经有的错误

        var alreadyErrors = {};
        fields.forEach(function (field) {
          var name = field.name;

          if (options.force !== true && field.dirty === false) {
            if (field.errors) {
              (0, _set["default"])(alreadyErrors, name, {
                errors: field.errors
              });
            } // continue;


            return;
          }

          var fieldMeta = _this4.fieldsStore.getFieldMeta(name);

          var newField = _objectSpread({}, field, {
            errors: undefined,
            validating: true,
            dirty: true
          });

          allRules[name] = _this4.getRules(fieldMeta, action);
          allValues[name] = newField.value;
          allFields[name] = newField;
        });
        this.setFields(allFields);
        Object.keys(allValues).forEach(function (f) {
          allValues[f] = _this4.fieldsStore.getFieldValue(f);
        });

        if (callback && (0, _utils.isEmptyObject)(allFields)) {
          callback((0, _utils.isEmptyObject)(alreadyErrors) ? null : alreadyErrors, this.fieldsStore.getFieldsValue(fieldNames));
          return;
        }

        var validator = new _asyncValidator["default"](allRules);

        if (validateMessages) {
          validator.messages(validateMessages);
        }

        validator.validate(allValues, options, function (errors) {
          var errorsGroup = _objectSpread({}, alreadyErrors);

          if (errors && errors.length) {
            var _loop = function _loop(i) {
              var e = errors[i];
              var errorFieldName = e.field;
              var fieldName = errorFieldName; // Handle using array validation rule.

              Object.keys(allRules).some(function (ruleFieldName) {
                var rules = allRules[ruleFieldName] || []; // Exist if match rule

                if (ruleFieldName === errorFieldName) {
                  fieldName = ruleFieldName;
                  return true;
                } // Skip if not match array type


                if (rules.every(function (_ref2) {
                  var type = _ref2.type;
                  return type !== 'array';
                }) && errorFieldName.indexOf(ruleFieldName) !== 0) {
                  return false;
                } // Exist if match the field name


                var restPath = errorFieldName.slice(ruleFieldName.length + 1);

                if (/\d+/.test(restPath)) {
                  fieldName = ruleFieldName;
                  return true;
                }

                return false;
              });
              var field = (0, _get["default"])(errorsGroup, fieldName);

              if (_typeof(field) !== 'object' || Array.isArray(field)) {
                (0, _set["default"])(errorsGroup, fieldName, {
                  errors: []
                });
              }

              var fieldErrors = (0, _get["default"])(errorsGroup, fieldName.concat('.errors'));
              fieldErrors.push(e);
            };

            for (var i = 0; i < errors.length; i++) {
              _loop(i);
            }
          }

          var expired = [];
          var nowAllFields = {};
          Object.keys(allRules).forEach(function (name) {
            var fieldErrors = (0, _get["default"])(errorsGroup, name);

            var nowField = _this4.fieldsStore.getField(name); // avoid concurrency problems


            if (!(0, _eq["default"])(nowField.value, allValues[name])) {
              expired.push({
                name: name
              });
            } else {
              nowField.errors = fieldErrors && fieldErrors.errors;
              nowField.value = allValues[name];
              nowField.validating = false;
              nowField.dirty = false;
              nowAllFields[name] = nowField;
            }
          });

          _this4.setFields(nowAllFields);

          if (callback) {
            if (expired.length) {
              expired.forEach(function (_ref3) {
                var name = _ref3.name;
                var fieldErrors = [{
                  message: "".concat(name, " need to revalidate"),
                  field: name
                }];
                (0, _set["default"])(errorsGroup, name, {
                  expired: true,
                  errors: fieldErrors
                });
              });
            }

            callback((0, _utils.isEmptyObject)(errorsGroup) ? null : errorsGroup, _this4.fieldsStore.getFieldsValue(fieldNames));
          }
        });
      },
      // 表单校验方法
      validateFields: function validateFields(ns, opt, cb) {
        var _this5 = this;

        var pending = new Promise(function (resolve, reject) {
          var _getParams = (0, _utils.getParams)(ns, opt, cb),
              names = _getParams.names,
              options = _getParams.options,
              callback = _getParams.callback;

          var newCallback;

          if (!callback || typeof callback === 'function') {
            var oldCb = callback;

            newCallback = function newCallback(errors, values) {
              if (oldCb) {
                oldCb(errors, values);
              } else if (errors) {
                reject({
                  errors: errors,
                  values: values
                });
              } else {
                resolve(values);
              }
            };
          }

          var fieldNames = names ? _this5.fieldsStore.getValidFieldsFullName(names) : _this5.fieldsStore.getValidFieldsName();
          var fields = fieldNames.filter(function (name) {
            var fieldMeta = _this5.fieldsStore.getFieldMeta(name);

            return (0, _utils.hasRules)(fieldMeta.validate);
          }).map(function (name) {
            var field = _this5.fieldsStore.getField(name);

            field.value = _this5.fieldsStore.getFieldValue(name);
            return field;
          });

          if (!fields.length) {
            newCallback(null, _this5.fieldsStore.getFieldsValue(fieldNames));
            return;
          }

          if (!('firstFields' in options)) {
            options.firstFields = fieldNames.filter(function (name) {
              var fieldMeta = _this5.fieldsStore.getFieldMeta(name);

              return !!fieldMeta.validateFirst;
            });
          }

          _this5.validateFieldsInternal(fields, {
            fieldNames: fieldNames,
            options: options
          }, newCallback);
        });
        pending["catch"](function (e) {
          return e;
        });
        this.data.set('form', this, {
          force: true
        });
        return pending;
      },
      // 获取事件缓存
      getCacheBind: function getCacheBind(name, action, fn) {
        if (!this.cachedBind[name]) {
          this.cachedBind[name] = {};
        }

        var cache = this.cachedBind[name];

        if (!cache[action] || cache[action].oriFn !== fn) {
          cache[action] = {
            fn: fn.bind(this, name, action),
            oriFn: fn
          };
        }

        return cache[action].fn;
      },
      onCollectCommon: function onCollectCommon(name, action, args) {
        var fieldMeta = this.fieldsStore.getFieldMeta(name);

        if (fieldMeta[action]) {
          fieldMeta[action].apply(fieldMeta, _toConsumableArray(args));
        } else if (fieldMeta.originalProps && fieldMeta.originalProps[action]) {
          var _fieldMeta$originalPr;

          (_fieldMeta$originalPr = fieldMeta.originalProps)[action].apply(_fieldMeta$originalPr, _toConsumableArray(args));
        }

        var value = fieldMeta.getValueFromEvent ? fieldMeta.getValueFromEvent(args[2].e) : args[2].value;

        if (onValuesChange && value !== this.fieldsStore.getFieldValue(name)) {
          var valuesAll = this.fieldsStore.getAllValues();
          var valuesAllSet = {};
          valuesAll[name] = value;
          Object.keys(valuesAll).forEach(function (key) {
            return (0, _set["default"])(valuesAllSet, key, valuesAll[key]);
          });
          onValuesChange(this, (0, _set["default"])({}, name, value), valuesAllSet);
        }

        var field = this.fieldsStore.getField(name);
        return {
          name: name,
          field: _objectSpread({}, field, {
            value: value,
            touched: true
          }),
          fieldMeta: fieldMeta
        };
      },
      onCollectValidate: function onCollectValidate(name, action) {
        for (var _len = arguments.length, args = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
          args[_key - 2] = arguments[_key];
        }

        var _this$onCollectCommon = this.onCollectCommon(name, action, args),
            field = _this$onCollectCommon.field,
            fieldMeta = _this$onCollectCommon.fieldMeta;

        var newField = _objectSpread({}, field, {
          dirty: true
        });

        this.fieldsStore.setFieldsAsDirty();
        this.validateFieldsInternal([newField], {
          action: action,
          options: {
            firstFields: !!fieldMeta.validateFirst
          }
        });
      },
      onCollect: function onCollect(innerName, action) {
        for (var _len2 = arguments.length, args = new Array(_len2 > 2 ? _len2 - 2 : 0), _key2 = 2; _key2 < _len2; _key2++) {
          args[_key2 - 2] = arguments[_key2];
        }

        var _this$onCollectCommon2 = this.onCollectCommon(innerName, action, args),
            name = _this$onCollectCommon2.name,
            field = _this$onCollectCommon2.field,
            fieldMeta = _this$onCollectCommon2.fieldMeta;

        var validate = fieldMeta.validate;
        this.fieldsStore.setFieldsAsDirty();

        var newField = _objectSpread({}, field, {
          dirty: (0, _utils.hasRules)(validate)
        });

        this.setFields(_defineProperty({}, name, newField));
      },
      getFieldProps: function getFieldProps(name, options) {
        var _this6 = this;

        if (!name) {
          return;
        }

        var fieldOptions = _objectSpread({
          name: name,
          trigger: 'change',
          valuePropName: 'value',
          validate: []
        }, options);

        var rules = fieldOptions.rules,
            trigger = fieldOptions.trigger,
            _fieldOptions$validat = fieldOptions.validateTrigger,
            validateTrigger = _fieldOptions$validat === void 0 ? trigger : _fieldOptions$validat,
            validate = fieldOptions.validate;
        var fieldMeta = this.fieldsStore.getFieldMeta(name);

        if ('initialValue' in fieldOptions) {
          fieldMeta.initialValue = fieldOptions.initialValue;
        }

        var inputProps = _objectSpread({}, this.fieldsStore.getFieldValuePropValue(fieldOptions));

        var validateRules = (0, _utils.normalizeValidateRules)(validate, rules, validateTrigger);
        var validateTriggers = (0, _utils.getValidateTriggers)(validateRules); // 添加trigger时的validate事件

        validateTriggers.forEach(function (action) {
          if (inputProps[action]) {
            return;
          }

          inputProps[action] = _this6.getCacheBind(name, action, _this6.onCollectValidate);
        }); // 添加不在triggers里面的其他事件

        if (trigger && validateTriggers.indexOf(trigger) === -1) {
          inputProps[trigger] = this.getCacheBind(name, trigger, this.onCollect);
        }

        var meta = _objectSpread({}, fieldMeta, {}, fieldOptions, {
          validate: validateRules
        });

        this.fieldsStore.setFieldMeta(name, meta);

        if (fieldMetaProp) {
          inputProps[fieldMetaProp] = meta;
        }

        if (fieldDataProp) {
          inputProps[fieldDataProp] = this.fieldsStore.getField(name);
        } // This field is rendered, record it
        // this.data.set('renderFields.' + name, inputProps);


        this.renderFields[name] = inputProps;
        return inputProps;
      },
      getDecoratorComponent: function getDecoratorComponent(name) {
        var component;
        this.items.forEach(function (item) {
          var decoratorComponents = item.data.get('decoratorComponents') || [];
          decoratorComponents.forEach(function (decoratorComponent) {
            var decoratorName = decoratorComponent.data.get('decorator.name');

            if (name === decoratorName) {
              component = decoratorComponent;
            }
          });
        });
        return component;
      },
      resetFields: function resetFields(ns) {
        var _this7 = this;

        var newFields = this.fieldsStore.resetFields(ns);

        if (Object.keys(newFields).length > 0) {
          this.setFields(newFields);
        }

        Object.keys(newFields).forEach(function (field) {
          var props = newFields[field];

          var decoratorComponent = _this7.getDecoratorComponent(field);

          if (decoratorComponent) {
            decoratorComponent.data.set('value', props.value || '');
          }
        });
      },
      setDecoratorPropValue: function setDecoratorPropValue(decorator, decoratorComponent, options) {
        var props = this.getFieldProps(decorator.name, decorator);
        var name = options.name;

        if (name) {
          name += decorator.name ? "-".concat(decorator.name) : '';
          decoratorComponent.data.set('id', name);
        }

        var value = this.fieldsStore.getFieldValue(decorator.name);

        if (value === undefined) {
          return;
        }

        decoratorComponent.data.set('checked' in props ? 'checked' : 'value', value);
      },
      clearField: function clearField(name) {
        this.fieldsStore.clearField(name);
      },
      updated: function updated() {
        var _this8 = this;

        this.items.forEach(function (item) {
          item.data.set('form', _this8, {
            force: true
          });
        });
      },
      attached: function attached() {
        var wrappedComponentAttached = wrappedComponent.attached || noop;
        wrappedComponentAttached.bind(this)();
        this.updated();
      },
      messages: {
        santd_form_change: function santd_form_change(payload) {
          var _payload$value = payload.value,
              name = _payload$value.name,
              action = _payload$value.action;

          if (!name) {
            return;
          }

          var field = this.renderFields[name];

          if (field && field[action]) {
            field[action](name, action, payload.value);
          }
        },
        santd_formitem_add: function santd_formitem_add(payload) {
          var _this9 = this;

          var formItem = payload.value;
          this.items.push(formItem);
          var decoratorComponents = formItem.data.get('decoratorComponents'); // 如果有decoratorComponent，收集信息，加入到fieldStore里面去

          if (decoratorComponents && decoratorComponents.length) {
            decoratorComponents.forEach(function (decoratorComponent) {
              var decorator = decoratorComponent.data.get('decorator');

              _this9.setDecoratorPropValue(decorator, decoratorComponent, options);

              decoratorComponent.watch('decorator', function (val) {
                _this9.setDecoratorPropValue(val, decoratorComponent, options);
              });
            });
          }
        },
        santd_formitem_remove: function santd_formitem_remove(payload) {
          var _this10 = this;

          var formItem = payload.value;
          var decoratorComponents = formItem.data.get('decoratorComponents'); // 找到对应的decorator信息，从fieldsStore里删除

          if (decoratorComponents && decoratorComponents.length) {
            decoratorComponents.forEach(function (decoratorComponent) {
              var decorator = decoratorComponent.data.get('decorator');

              var fieldMeta = _this10.fieldsStore.getFieldMeta(decorator.name);

              if (!fieldMeta.preserve && decorator.name) {
                _this10.clearField(decorator.name);
              }
            });
          }
        }
      }
    }), _san["default"].defineComponent(wrappedComponent));
  };
}