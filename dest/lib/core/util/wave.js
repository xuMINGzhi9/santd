"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _san = _interopRequireDefault(require("san"));

var _Event = _interopRequireDefault(require("./css-animation/Event"));

var _index = require("./index");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/**
 * @file 波纹效果，用在 button switch 等上面
 * @author wangyongqing01@baidu.com
 */
var cc = (0, _index.classCreator)('click-animating');

var _default = _san["default"].defineComponent({
  template: "\n        <ins style=\"display:none;\"></ins>\n    ",
  attached: function attached() {
    var _this = this;

    this.onTransitionEnd = this.onTransitionEnd.bind(this);
    this.nextTick(function () {
      var el = _this.el;

      if (_this.owner && _this.owner.el) {
        el = _this.owner.ref('ownerWave') || _this.owner.el;
      }

      _this.instance = _this.bindAnimationEvent(el);
    }); // 清理掉无用的标签。。。好无语的写法。。

    this.el.parentNode.removeChild(this.el);
  },
  disposed: function disposed() {
    if (this.instance) {
      this.instance.cancel();
    }
  },
  isNotGrey: function isNotGrey(color) {
    var match = (color || '').match(/rgba?\((\d*), (\d*), (\d*)(, [.\d]*)?\)/);

    if (match && match[1] && match[2] && match[3]) {
      return !(match[1] === match[2] && match[2] === match[3]);
    }

    return true;
  },
  onClick: function onClick(node, waveColor) {
    if (node.className.indexOf('-leave') >= 0) {
      return;
    }

    _Event["default"].addEndEventListener(node, this.onTransitionEnd);

    this.removeExtraStyleNode();
    var insertExtraNode = this.data.get('insertExtraNode');
    var extraNode = this.extraNode = document.createElement('div');
    extraNode.className = cc('node');
    var attributeName = this.getAttributeName();
    node.removeAttribute(attributeName);
    node.setAttribute(attributeName, 'true'); // Not white or transparnt or grey

    if (waveColor && waveColor !== '#ffffff' && waveColor !== 'rgb(255, 255, 255)' && this.isNotGrey(waveColor) && !/rgba\(\d*, \d*, \d*, 0\)/.test(waveColor) // any transparent rgba color
    && waveColor !== 'transparent') {
      extraNode.style.borderColor = waveColor;
      var styleForPesudo = this.styleForPesudo = document.createElement('style');
      styleForPesudo.innerHTML = "[".concat(cc('without-extra-node'), "]:after { border-color: ").concat(waveColor, "; }");
      document.body.appendChild(styleForPesudo);
    }

    if (insertExtraNode) {
      node.appendChild(extraNode);
    }
  },
  bindAnimationEvent: function bindAnimationEvent(node) {
    var _this2 = this;

    if (!node || !node.getAttribute || node.getAttribute('disabled') || node.className.indexOf('disabled') >= 0) {
      return;
    }

    var onClick = function onClick(e) {
      // Fix radio button click twice
      if (e.target.tagName === 'INPUT') {
        return;
      }

      _this2.resetEffect(node);

      var nodeStyle = window.getComputedStyle(node); // Get wave color from target

      var waveColor = nodeStyle.getPropertyValue('border-top-color') // Firefox Compatible
      || nodeStyle.getPropertyValue('border-color') || nodeStyle.getPropertyValue('background-color');
      _this2.clickWaveTimeoutId = window.setTimeout(function () {
        return _this2.onClick(node, waveColor);
      }, 0);
    };

    node.addEventListener('click', onClick, true);
    return {
      cancel: function cancel() {
        node.removeEventListener('click', onClick, true);
      }
    };
  },
  getAttributeName: function getAttributeName() {
    var insertExtraNode = this.data.get('insertExtraNode');
    return insertExtraNode ? cc() : cc('without-extra-node');
  },
  resetEffect: function resetEffect(node) {
    if (!node || node === this.extraNode) {
      return;
    }

    var insertExtraNode = this.data.get('insertExtraNode');
    var attributeName = this.getAttributeName();
    node.removeAttribute(attributeName);
    this.removeExtraStyleNode();

    if (insertExtraNode && this.extraNode && node.contains(this.extraNode)) {
      node.removeChild(this.extraNode);
    }

    _Event["default"].removeEndEventListener(node, this.onTransitionEnd);
  },
  onTransitionEnd: function onTransitionEnd(e) {
    if (!e || e.animationName !== 'fadeEffect') {
      return;
    }

    this.resetEffect(e.target);
  },
  removeExtraStyleNode: function removeExtraStyleNode() {
    if (this.styleForPesudo && document.body.contains(this.styleForPesudo)) {
      document.body.removeChild(this.styleForPesudo);
      this.styleForPesudo = null;
    }
  }
});

exports["default"] = _default;