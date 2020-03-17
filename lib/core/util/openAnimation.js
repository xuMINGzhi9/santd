"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _cssAnimation = _interopRequireDefault(require("./css-animation/"));

var _index = require("./index");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/**
 * @file Santd open animation file
 **/
function animate(node, show) {
  var done = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : function () {};
  var height;
  var requestAnimationFrameId;
  return (0, _cssAnimation["default"])(node, 'san-motion-collapse-legacy', {
    start: function start() {
      if (!show) {
        node.style.height = "".concat(node.offsetHeight, "px");
        node.style.opacity = '1';
      } else {
        height = node.offsetHeight;
        node.style.height = '0px';
        node.style.opacity = '0';
      }
    },
    active: function active() {
      if (requestAnimationFrameId) {
        (0, _index.cancelAnimationTimeout)(requestAnimationFrameId);
      }

      requestAnimationFrameId = (0, _index.requestAnimationTimeout)(function () {
        node.style.height = "".concat(show ? height : 0, "px");
        node.style.opacity = show ? '1' : '0';
      }, 0);
    },
    end: function end() {
      if (requestAnimationFrameId) {
        (0, _index.cancelAnimationTimeout)(requestAnimationFrameId);
      }

      node.style.height = '';
      node.style.opacity = '';
      done();
    }
  });
}

var _default = {
  enter: function enter(node) {
    var done = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : function () {};
    return animate(node, true, done);
  },
  leave: function leave(node) {
    var done = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : function () {};
    return animate(node, false, done);
  },
  appear: function appear(node) {
    var done = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : function () {};
    return animate(node, true, done);
  }
};
exports["default"] = _default;