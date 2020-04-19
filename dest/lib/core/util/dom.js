"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.hasClass = hasClass;
exports.addClass = addClass;
exports.removeClass = removeClass;
exports.getOffset = getOffset;
exports.getPageWidth = getPageWidth;
exports.getPageHeight = getPageHeight;
exports.getScroll = getScroll;
exports.getViewWidth = getViewWidth;
exports.getViewHeight = getViewHeight;
exports.getScrollTop = getScrollTop;
exports.getScrollLeft = getScrollLeft;
exports.getClientTop = getClientTop;
exports.getClientLeft = getClientLeft;
exports.contains = contains;
exports.getScrollBarSize = getScrollBarSize;
exports.off = exports.on = void 0;

/**
 * @file DOM相关基础库
 */
var isCompatMode = document.compatMode === 'BackCompat';

function getViewRoot() {
  return isCompatMode ? document.body : document.documentElement;
}

function hasClass(elements, cls) {
  return elements.className && typeof elements.className === 'string' && elements.className.match(new RegExp('(\\s|^)' + cls + '(\\s|$)'));
}

function addClass(ele, cls) {
  if (!hasClass(ele, cls)) {
    ele.className += ' ' + cls;
  }
}

function removeClass(ele, cls) {
  if (hasClass(ele, cls)) {
    var reg = new RegExp('(\\s|^)' + cls + '(\\s|$)');
    ele.className = ele.className.replace(reg, ' ');
  }
}
/**
 * 获取元素在页面中的位置和尺寸信息
 *
 * @param {HTMLElement} element 目标元素
 * @return {Object} 元素的尺寸和位置信息，
 * 包含`top`、`right`、`bottom`、`left`、`width`和`height`属性
 */


function getOffset(element) {
  if (!element) {
    return {
      top: 0,
      right: 0,
      bottom: 0,
      left: 0,
      width: 0,
      height: 0
    };
  }

  var rect = element.getBoundingClientRect();
  var clientTop = document.documentElement.clientTop || document.body.clientTop || 0;
  var clientLeft = document.documentElement.clientLeft || document.body.clientLeft || 0;
  var scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  var scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;
  return {
    top: rect.top + scrollTop - clientTop,
    right: rect.right + scrollLeft - clientLeft,
    bottom: rect.bottom + scrollTop - clientTop,
    left: rect.left + scrollLeft - clientLeft,
    width: rect.right - rect.left,
    height: rect.bottom - rect.top
  };
}
/**
 * 获取页面宽度
 *
 * @return {number} 页面宽度
 */


function getPageWidth() {
  var viewRoot = getViewRoot();
  return Math.max(document.documentElement ? document.documentElement.scrollWidth : 0, document.body ? document.body.scrollWidth : 0, viewRoot ? viewRoot.clientWidth : 0, 0);
}
/**
 * 获取页面高度
 *
 * @return {number} 页面高度
 */


function getPageHeight() {
  var viewRoot = getViewRoot();
  return Math.max(document.documentElement ? document.documentElement.scrollHeight : 0, document.body ? document.body.scrollHeight : 0, viewRoot ? viewRoot.clientHeight : 0, 0);
}

function getScroll(target, top) {
  if (typeof window === 'undefined') {
    return 0;
  }

  var prop = top ? 'pageYOffset' : 'pageXOffset';
  var method = top ? 'scrollTop' : 'scrollLeft';
  var isWindow = target === window;
  var ret = isWindow ? target[prop] : target[method]; // ie6,7,8 standard mode

  if (isWindow && typeof ret !== 'number') {
    ret = document.documentElement[method];
  }

  return ret;
}
/**
 * 获取页面视觉区域宽度
 *
 * @return {number} 页面视觉区域宽度
 */


function getViewWidth() {
  var viewRoot = getViewRoot();
  return viewRoot ? viewRoot.clientWidth : 0;
}
/**
 * 获取页面视觉区域高度
 *
 * @return {number} 页面视觉区域高度
 */


function getViewHeight() {
  var viewRoot = getViewRoot();
  return viewRoot ? viewRoot.clientHeight : 0;
}
/**
 * 获取纵向滚动量
 *
 * @return {number} 纵向滚动量
 */


function getScrollTop() {
  return window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
}
/**
 * 获取横向滚动量
 *
 * @return {number} 横向滚动量
 */


function getScrollLeft() {
  return window.pageXOffset || document.documentElement.scrollLeft || document.body.scrollLeft || 0;
}
/**
 * 获取页面纵向坐标
 *
 * @return {number}
 */


function getClientTop() {
  return document.documentElement.clientTop || document.body.clientTop || 0;
}
/**
 * 获取页面横向坐标
 *
 * @return {number}
 */


function getClientLeft() {
  return document.documentElement.clientLeft || document.body.clientLeft || 0;
}
/**
 * 封装addEventListener
 *
 * @return {function}
 */


var on = document.addEventListener ? function (element, event, handler) {
  if (element && event && handler) {
    element.addEventListener(event, handler, false);
  }
} : function (element, event, handler) {
  if (element && event && handler) {
    element.attachEvent('on' + event, handler);
  }
};
/**
 * 封装removeEventListener
 *
 * @return {function}
 */

exports.on = on;
var off = document.removeEventListener ? function (element, event, handler) {
  if (element && event) {
    element.removeEventListener(event, handler, false);
  }
} : function (element, event, handler) {
  if (element && event) {
    element.detachEvent('on' + event, handler);
  }
};
/**
 * 判断某个元素是否在外层元素中
 * @param root 外层元素
 * @param n 被检测的元素
 *
 * @return {boolean}
 */

exports.off = off;

function contains(root, n) {
  var node = n;

  while (node) {
    if (node === root) {
      return true;
    }

    node = node.parentNode;
  }

  return false;
}

var cached;

function getScrollBarSize(fresh) {
  if (fresh || cached === undefined) {
    var inner = document.createElement('div');
    inner.style.width = '100%';
    inner.style.height = '200px';
    var outer = document.createElement('div');
    var outerStyle = outer.style;
    outerStyle.position = 'absolute';
    outerStyle.top = 0;
    outerStyle.left = 0;
    outerStyle.pointerEvents = 'none';
    outerStyle.visibility = 'hidden';
    outerStyle.width = '200px';
    outerStyle.height = '150px';
    outerStyle.overflow = 'hidden';
    outer.appendChild(inner);
    document.body.appendChild(outer);
    var widthContained = inner.offsetWidth;
    outer.style.overflow = 'scroll';
    var widthScroll = inner.offsetWidth;

    if (widthContained === widthScroll) {
      widthScroll = outer.clientWidth;
    }

    document.body.removeChild(outer);
    cached = widthContained - widthScroll;
  }

  return cached;
}