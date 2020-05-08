"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.requestAnimationTimeout = exports.cancelAnimationTimeout = exports.getComponentChildren = exports.deepCopy = exports.type = exports.classCreator = exports.guid = exports.removeClass = exports.addClass = exports.hasClass = void 0;

var _constants = require("../constants");

var _getRequestAnimationFrame = _interopRequireWildcard(require("./getRequestAnimationFrame"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _createForOfIteratorHelper(o) { if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (o = _unsupportedIterableToArray(o))) { var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var it, normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var raf = (0, _getRequestAnimationFrame["default"])();

var hasClass = function hasClass(elements, cName) {
  return !!elements.className.match(new RegExp('(\\s|^)' + cName + '(\\s|$)'));
};

exports.hasClass = hasClass;

var addClass = function addClass(ele, cls) {
  if (!hasClass(ele, cls)) {
    ele.className += ' ' + cls;
  }
};

exports.addClass = addClass;

var removeClass = function removeClass(ele, cls) {
  if (hasClass(ele, cls)) {
    var reg = new RegExp('(\\s|^)' + cls + '(\\s|$)');
    ele.className = ele.className.replace(reg, ' ');
  }
};
/**
 * 获取唯一 class id
 *
 * @param {string} prefix classname prefix
 * @return {string} guid
 */


exports.removeClass = removeClass;

var guid = function guid() {
  var prefix = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : _constants.CLASSNAME_PREFIX;
  var id = (+(Math.random() + '').substr(2, 16)).toString(36);
  return "".concat(prefix, "-").concat(id);
};
/**
 * 获取 class
 *
 * @param {string} prefix string
 * @return {Function} creator
 */


exports.guid = guid;

var classCreator = function classCreator(prefix) {
  return function (part) {
    return part ? "".concat(_constants.CLASSNAME_PREFIX, "-").concat(prefix, "-").concat(part) : "".concat(_constants.CLASSNAME_PREFIX, "-").concat(prefix);
  };
};

exports.classCreator = classCreator;

var type = function type(o, s) {
  return _typeof(o) === s;
};

exports.type = type;

var deepCopy = function deepCopy(target) {
  var copyed_objs = [];

  function _deepCopy(target) {
    if (_typeof(target) !== 'object' || !target) {
      return target;
    }

    for (var i = 0; i < copyed_objs.length; i++) {
      if (copyed_objs[i].target === target) {
        return copyed_objs[i].copyTarget;
      }
    }

    var obj = {};

    if (Array.isArray(target)) {
      obj = [];
    }

    copyed_objs.push({
      target: target,
      copyTarget: obj
    });
    Object.keys(target).forEach(function (key) {
      if (obj[key]) {
        return;
      }

      obj[key] = _deepCopy(target[key]);
    });
    return obj;
  }

  return _deepCopy(target);
};
/**
 * 获取list下的所有san components
 *
 * @param  {Array} list 递归遍历该list
 * @param  {Function} conditionFn 判断条件
 * @param  {number} dep 递归深度
 * @return {Array}      component children
 */


exports.deepCopy = deepCopy;

var getComponentChildren = function getComponentChildren(list, conditionFn) {
  var dep = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 100;
  var itemlist = [];
  var step = 0;

  var loopCMPT = function loopCMPT(list) {
    step++;

    if (step > dep) {
      return;
    }

    if (list && list.length) {
      var _iterator = _createForOfIteratorHelper(list),
          _step;

      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var item = _step.value;

          if (conditionFn(item, step)) {
            itemlist.push(item);
          }

          loopCMPT(item.children);
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }
    }

    step--;
  };

  loopCMPT(list);
  return itemlist;
};

exports.getComponentChildren = getComponentChildren;

var cancelAnimationTimeout = function cancelAnimationTimeout(frame) {
  return (0, _getRequestAnimationFrame.cancelRequestAnimationFrame)(frame.id);
};

exports.cancelAnimationTimeout = cancelAnimationTimeout;

var requestAnimationTimeout = function requestAnimationTimeout(callback, delay) {
  var start = Date.now();
  /* eslint-disable fecs-use-computed-property */

  var frame = {};

  function timeout() {
    if (Date.now() - start >= delay) {
      callback.call();
    } else {
      frame.id = raf(timeout);
    }
  }

  frame.id = raf(timeout);
  return frame;
};

exports.requestAnimationTimeout = requestAnimationTimeout;