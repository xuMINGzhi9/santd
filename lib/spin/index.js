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
 * @file 组件 spin
 * @author baozhixin <baozhixin@baidu.com>
 * @borrows https://ant.design/components/spin-cn/
 */
var prefixCls = (0, _util.classCreator)('spin')(); // 默认加载器指示符

var defaultIndicator = null;

function shouldDelay(spinning, delay) {
  return !!spinning && !!delay && !isNaN(Number(delay));
} // 判断是否SanComponent, 可能会随着san的版本迭代变更，参考依据如下：
// https://github.com/baidu/san/blob/36085399ab3d84df3ff8b741bb2f57c483b59acb/src/view/node-type.js
// https://github.com/baidu/san/blob/9a7cd2e74ecd4f307afd1733aa5b745707edc0c9/src/view/component.js#L278


function isValidComponent(content) {
  if (typeof content === 'function' && 5 === content.prototype.nodeType) {
    return true;
  }

  return false;
}

var SpinDot = _san["default"].defineComponent({
  template: "\n        <span class=\"".concat(prefixCls, "-dot ").concat(prefixCls, "-dot-spin\">\n            <i/>\n            <i/>\n            <i/>\n            <i/>\n        </span>\n    ")
});

var IndicatorLoader = _san["default"].createComponentLoader(function () {
  var promise = new Promise(function (resolve) {
    resolve(isValidComponent(defaultIndicator) ? defaultIndicator : SpinDot);
  });
  return promise;
});

var Spin = _san["default"].defineComponent({
  template: "\n        <div class=\"{{hasContent ? '".concat(prefixCls, "-nested-loading ' + (wrapperClassName ? wrapperClassName : '') : spinClasses}}\">\n            <slot s-if=\"!hasContent\" name=\"indicator\">\n                <indicator />\n            </slot>\n            <spin-tip s-if=\"!hasContent\" tip=\"{{tip}}\"/>\n            <div s-if=\"hasContent && currentSpinning\">\n                <div class=\"{{spinClasses}}\">\n                    <slot name=\"indicator\">\n                        <indicator />\n                    </slot>\n                    <div class=\"").concat(prefixCls, "-text\">{{tip}}</div>\n                </div>\n            </div>\n            <div class=\"").concat(prefixCls, "-container {{currentSpinning ? '").concat(prefixCls, "-blur' : ''}}\">\n                <slot name=\"content\" />\n            </div>\n        </div>\n    "),
  dataTypes: {
    delay: _san.DataTypes.number,
    indicator: _san.DataTypes.any,
    size: _san.DataTypes.oneOf(['small', 'default', 'large']),
    spinning: _san.DataTypes.bool,
    tip: _san.DataTypes.string,
    wrapperClassName: _san.DataTypes.string
  },
  components: {
    indicator: IndicatorLoader // san >= 3.7

  },
  computed: {
    spinClasses: function spinClasses() {
      var size = this.data.get('size');
      var currentSpinning = this.data.get('currentSpinning');
      var tip = this.data.get('tip');
      var classArr = [prefixCls];
      size === 'small' && classArr.push("".concat(prefixCls, "-sm"));
      size === 'large' && classArr.push("".concat(prefixCls, "-lg"));
      currentSpinning && classArr.push("".concat(prefixCls, "-spinning"));
      !!tip && classArr.push("".concat(prefixCls, "-show-text"));
      return classArr;
    },
    currentSpinning: function currentSpinning() {
      var data = this.data;
      var delay = data.get('delay');
      var spinning = data.get('spinning');
      return spinning && !shouldDelay(spinning, delay);
    }
  },
  initData: function initData() {
    return {
      hasContent: false,
      size: 'default',
      spinning: true
    };
  },
  inited: function inited() {
    var _this = this;

    var data = this.data;
    var delay = data.get('delay');
    var currentSpinning = data.get('currentSpinning');
    this.data.set('hasContent', !!this.sourceSlots.named.content);
    this.watch('spinning', function (spinning) {
      if (currentSpinning === spinning) {
        return;
      }

      if (_this.debounceTimeout) {
        clearTimeout(_this.debounceTimeout);
      }

      if (currentSpinning && !spinning) {
        _this.debounceTimeout = window.setTimeout(function () {
          data.set('currentSpinning', spinning);
        }, 200);

        if (_this.delayTimeout) {
          clearTimeout(_this.delayTimeout);
          _this.delayTimeout = null;
        }
      } else {
        if (shouldDelay(spinning, delay)) {
          if (_this.delayTimeout) {
            clearTimeout(_this.delayTimeout);
            _this.delayTimeout = null;
          }

          _this.delayTimeout = window.setTimeout(_this.delayUpdateSpinning.bind(_this), delay);
        } else {
          data.set('currentSpinning', spinning);
        }
      }
    });
  },
  delayUpdateSpinning: function delayUpdateSpinning() {
    var data = this.data;
    var spinning = data.get('spinning');
    var currentSpinning = data.get('currentSpinning');

    if (currentSpinning !== spinning) {
      data.set('currentSpinning', spinning);
    }
  },
  debounceTimeout: null,
  delayTimeout: null
});

Spin.setDefaultIndicator = function (indicator) {
  defaultIndicator = indicator;
};

var _default = Spin;
exports["default"] = _default;