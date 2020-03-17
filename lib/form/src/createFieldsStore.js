"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = createFieldsStore;

var _set = _interopRequireDefault(require("lodash/set"));

var _createFormField = _interopRequireWildcard(require("./createFormField"));

var _utils = require("./utils");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function partOf(a, b) {
  return b.indexOf(a) === 0 && ['.', '['].indexOf(b[a.length]) !== -1;
}

function internalFlattenFields(fields) {
  return (0, _utils.flattenFields)(fields, function (_, node) {
    return (0, _createFormField.isFormField)(node);
  }, 'You must wrap field data with `createFormField`.');
}

var FieldsStore = /*#__PURE__*/function () {
  function FieldsStore(fields) {
    _classCallCheck(this, FieldsStore);

    this.fields = internalFlattenFields(fields);
    this.fieldsMeta = {};
  }

  _createClass(FieldsStore, [{
    key: "updateFields",
    value: function updateFields(fields) {
      this.fields = internalFlattenFields(fields);
    }
  }, {
    key: "flattenRegisteredFields",
    value: function flattenRegisteredFields(fields) {
      var validFieldsName = this.getAllFieldsName();
      return (0, _utils.flattenFields)(fields, function (path) {
        return validFieldsName.indexOf(path) >= 0;
      }, 'You cannot set a form field before rendering a field associated with the value.');
    }
  }, {
    key: "setFieldsInitialValue",
    value: function setFieldsInitialValue(initialValues) {
      var _this = this;

      var flattenedInitialValues = this.flattenRegisteredFields(initialValues);
      var fieldsMeta = this.fieldsMeta;
      Object.keys(flattenedInitialValues).forEach(function (name) {
        if (fieldsMeta[name]) {
          _this.setFieldMeta(name, _objectSpread({}, _this.getFieldMeta(name), {
            initialValue: flattenedInitialValues[name]
          }));
        }
      });
    }
  }, {
    key: "setFields",
    value: function setFields(fields) {
      var _this2 = this;

      var fieldsMeta = this.fieldsMeta;

      var nowFields = _objectSpread({}, this.fields, {}, fields);

      var nowValues = {};
      Object.keys(fieldsMeta).forEach(function (f) {
        nowValues[f] = _this2.getValueFromFields(f, nowFields);
      });
      Object.keys(nowValues).forEach(function (f) {
        var value = nowValues[f];

        var fieldMeta = _this2.getFieldMeta(f);

        if (fieldMeta && fieldMeta.normalize) {
          var nowValue = fieldMeta.normalize(value, _this2.getValueFromFields(f, _this2.fields), nowValues);

          if (nowValue !== value) {
            nowFields[f] = _objectSpread({}, nowFields[f], {
              value: nowValue
            });
          }
        }
      });
      this.fields = nowFields;
    }
  }, {
    key: "resetFields",
    value: function resetFields(ns) {
      var fields = this.fields;
      var names = ns ? this.getValidFieldsFullName(ns) : this.getAllFieldsName();
      return names.reduce(function (acc, name) {
        var field = fields[name];

        if (field && 'value' in field) {
          acc[name] = {};
        }

        return acc;
      }, {});
    }
  }, {
    key: "setFieldMeta",
    value: function setFieldMeta(name, meta) {
      this.fieldsMeta[name] = meta;
    }
  }, {
    key: "setFieldsAsDirty",
    value: function setFieldsAsDirty() {
      var _this3 = this;

      Object.keys(this.fields).forEach(function (name) {
        var field = _this3.fields[name];
        var fieldMeta = _this3.fieldsMeta[name];

        if (field && fieldMeta && (0, _utils.hasRules)(fieldMeta.validate)) {
          _this3.fields[name] = _objectSpread({}, field, {
            dirty: true
          });
        }
      });
    }
  }, {
    key: "getFieldMeta",
    value: function getFieldMeta(name) {
      this.fieldsMeta[name] = this.fieldsMeta[name] || {};
      return this.fieldsMeta[name];
    }
  }, {
    key: "getValueFromFields",
    value: function getValueFromFields(name, fields) {
      var field = fields[name];

      if (field && 'value' in field) {
        return field.value;
      }

      var fieldMeta = this.getFieldMeta(name);
      return fieldMeta && fieldMeta.initialValue;
    }
  }, {
    key: "getAllValues",
    value: function getAllValues() {
      var _this4 = this;

      var fieldsMeta = this.fieldsMeta,
          fields = this.fields;
      return Object.keys(fieldsMeta).reduce(function (acc, name) {
        return (0, _set["default"])(acc, name, _this4.getValueFromFields(name, fields));
      }, {});
    }
  }, {
    key: "getValidFieldsName",
    value: function getValidFieldsName() {
      var _this5 = this;

      var fieldsMeta = this.fieldsMeta;
      return fieldsMeta ? Object.keys(fieldsMeta).filter(function (name) {
        return !_this5.getFieldMeta(name).hidden;
      }) : [];
    }
  }, {
    key: "getAllFieldsName",
    value: function getAllFieldsName() {
      var fieldsMeta = this.fieldsMeta;
      return fieldsMeta ? Object.keys(fieldsMeta) : [];
    }
  }, {
    key: "getValidFieldsFullName",
    value: function getValidFieldsFullName(maybePartialName) {
      var maybePartialNames = Array.isArray(maybePartialName) ? maybePartialName : [maybePartialName];
      return this.getValidFieldsName().filter(function (fullName) {
        return maybePartialNames.some(function (partialName) {
          return fullName === partialName || (0, _utils.startsWith)(fullName, partialName) && ['.', '['].indexOf(fullName[partialName.length]) >= 0;
        });
      });
    }
  }, {
    key: "getFieldValuePropValue",
    value: function getFieldValuePropValue(fieldMeta) {
      var name = fieldMeta.name,
          getValueProps = fieldMeta.getValueProps,
          valuePropName = fieldMeta.valuePropName;
      var field = this.getField(name);
      var fieldValue = 'value' in field ? field.value : fieldMeta.initialValue;

      if (getValueProps) {
        return getValueProps(fieldValue);
      }

      return _defineProperty({}, valuePropName, fieldValue);
    }
  }, {
    key: "getField",
    value: function getField(name) {
      return _objectSpread({}, this.fields[name], {
        name: name
      });
    }
  }, {
    key: "getNotCollectedFields",
    value: function getNotCollectedFields() {
      var _this6 = this;

      var fieldsName = this.getValidFieldsName();
      return fieldsName.filter(function (name) {
        return !_this6.fields[name];
      }).map(function (name) {
        return {
          name: name,
          dirty: false,
          value: _this6.getFieldMeta(name).initialValue
        };
      }).reduce(function (acc, field) {
        return (0, _set["default"])(acc, field.name, (0, _createFormField["default"])(field));
      }, {});
    }
  }, {
    key: "getNestedAllFields",
    value: function getNestedAllFields() {
      var _this7 = this;

      return Object.keys(this.fields).reduce(function (acc, name) {
        return (0, _set["default"])(acc, name, (0, _createFormField["default"])(_this7.fields[name]));
      }, this.getNotCollectedFields());
    }
  }, {
    key: "getFieldMember",
    value: function getFieldMember(name, member) {
      return this.getField(name)[member];
    }
  }, {
    key: "getNestedFields",
    value: function getNestedFields(names, getter) {
      var _this8 = this;

      var fields = names || this.getValidFieldsName();
      return fields.reduce(function (acc, f) {
        return (0, _set["default"])(acc, f, getter.bind(_this8)(f));
      }, {});
    }
  }, {
    key: "getNestedField",
    value: function getNestedField(name, getter) {
      var fullNames = this.getValidFieldsFullName(name);

      if (fullNames.length === 0 || fullNames.length === 1 && fullNames[0] === name // Name already is full name.
      ) {
          return getter(name);
        }

      var isArrayValue = fullNames[0][name.length] === '[';
      var suffixNameStartIndex = isArrayValue ? name.length : name.length + 1;
      return fullNames.reduce(function (acc, fullName) {
        return (0, _set["default"])(acc, fullName.slice(suffixNameStartIndex), getter(fullName));
      }, isArrayValue ? [] : {});
    }
  }, {
    key: "getFieldsValue",
    value: function getFieldsValue(names) {
      return this.getNestedFields(names, this.getFieldValue);
    }
  }, {
    key: "getFieldValue",
    value: function getFieldValue(name) {
      var _this9 = this;

      var fields = this.fields;
      return this.getNestedField(name, function (fullName) {
        return _this9.getValueFromFields(fullName, fields);
      });
    }
  }, {
    key: "getFieldsError",
    value: function getFieldsError(names) {
      names = Array.isArray(names) ? names : undefined;
      return this.getNestedFields(names, this.getFieldError);
    }
  }, {
    key: "getFieldError",
    value: function getFieldError(name) {
      var _this10 = this;

      return this.getNestedField(name, function (fullName) {
        return (0, _utils.getErrorStrs)(_this10.getFieldMember(fullName, 'errors'));
      });
    }
  }, {
    key: "isFieldValidating",
    value: function isFieldValidating(name) {
      return this.getFieldMember(name, 'validating');
    }
  }, {
    key: "isFieldsValidating",
    value: function isFieldsValidating(ns) {
      var _this11 = this;

      var names = ns || this.getValidFieldsName();
      return names.some(function (n) {
        return _this11.isFieldValidating(n);
      });
    }
  }, {
    key: "isFieldTouched",
    value: function isFieldTouched(name) {
      return this.getFieldMember(name, 'touched');
    }
  }, {
    key: "isFieldsTouched",
    value: function isFieldsTouched(ns) {
      var _this12 = this;

      var names = ns || this.getValidFieldsName();
      return names.some(function (n) {
        return _this12.isFieldTouched(n);
      });
    } // @private
    // BG: `a` and `a.b` cannot be use in the same form

  }, {
    key: "isValidNestedFieldName",
    value: function isValidNestedFieldName(name) {
      var names = this.getAllFieldsName();
      return names.every(function (n) {
        return !partOf(n, name) && !partOf(name, n);
      });
    }
  }, {
    key: "clearField",
    value: function clearField(name) {
      delete this.fields[name];
      delete this.fieldsMeta[name];
    }
  }]);

  return FieldsStore;
}();

function createFieldsStore(fields) {
  return new FieldsStore(fields);
}