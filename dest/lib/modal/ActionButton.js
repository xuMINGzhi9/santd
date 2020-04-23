"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _san = _interopRequireWildcard(require("san"));

var _button = _interopRequireDefault(require("../button"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

/**
 * @file 组件 modal/ActionButton
 * @author baozhixin <baozhixin@baidu.com>
 * @borrows https://ant.design/components/modal-cn/
 */
var _default = _san["default"].defineComponent({
  template: "\n        <template>\n            <s-button s-ref=\"button\"\n                s-bind=\"{{buttonProps}}\"\n                type=\"{{type}}\"\n                loading=\"{{loading}}\"\n                on-click=\"onClick\"\n            ><slot/></s-button>\n        </template>\n    ",
  dataTypes: {
    actionFn: _san.DataTypes.any,
    autoFocus: _san.DataTypes.bool,
    buttonProps: _san.DataTypes.object,
    closeModal: _san.DataTypes.func,
    loading: _san.DataTypes.bool,
    type: _san.DataTypes.string
  },
  components: {
    's-button': _button["default"]
  },
  initData: function initData() {
    return {
      loading: false
    };
  },
  attached: function attached() {
    var buttonNode = this.ref('button').el;
    var parentNode = this.el.parentNode;
    parentNode.replaceChild(buttonNode, this.el);

    if (this.data.get('autoFocus')) {
      this.timeoutId = setTimeout(function () {
        return buttonNode.focus();
      });
    }
  },
  detached: function detached() {
    clearTimeout(this.timeoutId);
  },
  onClick: function onClick() {
    var data = this.data;
    var actionFn = data.get('actionFn');
    var closeModal = data.get('closeModal');

    if (actionFn) {
      var ret;

      if (actionFn.length) {
        ret = actionFn(closeModal);
      } else {
        ret = actionFn();

        if (!ret) {
          closeModal();
        }
      }

      if (ret && ret.then) {
        data.set('loading', true);
        ret.then(function () {
          // It's unnecessary to set loading=false, for the Modal will be unmounted after close.
          // data.set('loading', false);
          closeModal.apply(void 0, arguments);
        }, function () {
          // See: https://github.com/ant-design/ant-design/issues/6183
          data.set('loading', false);
        });
      }
    } else {
      closeModal();
    }
  }
});

exports["default"] = _default;