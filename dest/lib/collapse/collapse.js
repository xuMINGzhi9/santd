"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _san = _interopRequireWildcard(require("san"));

var _util = require("../core/util");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

/**
 * @file Santd collapse collapse source file
 * @author mayihui@baidu.com
 **/
var prefixCls = (0, _util.classCreator)('collapse')();

var _default = _san["default"].defineComponent({
  dataTypes: {
    activeKey: _san.DataTypes.oneOfType([_san.DataTypes.string, _san.DataTypes.array]),
    defaultActiveKey: _san.DataTypes.oneOfType([_san.DataTypes.string, _san.DataTypes.array]),
    acordion: _san.DataTypes.bool,
    destroyInactivePanel: _san.DataTypes.bool
  },
  initData: function initData() {
    return {
      bordered: true,
      accordion: false,
      destroyInactivePanel: false
    };
  },
  inited: function inited() {
    this.panelChildren = [];
    var activeKey = this.data.get('activeKey') || this.data.get('defaultActiveKey');

    if (!(activeKey instanceof Array)) {
      activeKey = [activeKey];
    }

    this.data.set('activeKey', activeKey);
  },
  disposed: function disposed() {
    this.panelChildren = null;
  },
  updated: function updated() {
    var activeKey = this.data.get('activeKey');
    var accordion = this.data.get('accordion');
    this.panelChildren.forEach(function (child, index) {
      var key = child.data.get('key') || String(index);
      var isActive = accordion ? activeKey[0] === key : activeKey.includes(key);
      child.data.set('panelKey', key);
      child.data.set('isActive', isActive);
      child.data.set('accordion', accordion);
    });
  },
  messages: {
    santd_panel_add: function santd_panel_add(payload) {
      this.panelChildren.push(payload.value);
    },
    santd_panel_click: function santd_panel_click(payload) {
      var activeKey = this.data.get('activeKey');
      var accordion = this.data.get('accordion');
      var key = payload.value;

      if (accordion) {
        activeKey = activeKey[0] === key ? [] : [key];
      } else {
        activeKey = activeKey.slice(0);

        if (activeKey.includes(key)) {
          activeKey.splice(activeKey.indexOf(key), 1);
        } else {
          activeKey.push(key);
        }
      }

      this.data.set('activeKey', activeKey);
      this.fire('change', activeKey);
    }
  },
  attached: function attached() {
    this.updated();
  },
  template: "\n        <div class=\"".concat(prefixCls, " {{bordered ? '' : '").concat(prefixCls, "-borderless'}}\" role=\"{{accordion ? 'tablist' : ''}}\">\n            <slot />\n        </div>\n    ")
});

exports["default"] = _default;