"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.requestAnimationTimeout = exports.cancelAnimationTimeout = exports.getComponentChildren = exports.deepCopy = exports.type = exports.classCreator = exports.guid = exports.removeClass = exports.addClass = exports.hasClass = void 0;

var _constants = require("../constants");

var _getRequestAnimationFrame = _interopRequireWildcard(require("./getRequestAnimationFrame"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

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
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = list[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var item = _step.value;

          if (conditionFn(item, step)) {
            itemlist.push(item);
          }

          loopCMPT(item.children);
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator["return"] != null) {
            _iterator["return"]();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
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