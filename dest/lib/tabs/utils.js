"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getActiveIndex = getActiveIndex;
exports.getActiveKey = getActiveKey;
exports.setTransform = setTransform;
exports.isTransform3dSupported = isTransform3dSupported;
exports.setTransition = setTransition;
exports.getTransformPropValue = getTransformPropValue;
exports.isVertical = isVertical;
exports.getTransformByIndex = getTransformByIndex;
exports.getMarginStyle = getMarginStyle;
exports.getStyle = getStyle;
exports.setPxStyle = setPxStyle;
exports.getDataAttr = getDataAttr;
exports.getLeft = getLeft;
exports.getTop = getTop;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * @file Santd tabs utils file
 * @author mayihui@baidu.com
 */
function getActiveIndex(children, activeKey) {
  // const c = toArray(children);
  for (var i = 0; i < children.length; i++) {
    if (children[i].data.get('key') === activeKey) {
      return i;
    }
  }

  return -1;
}

function getActiveKey(children, index) {
  // const c = toArray(children);
  return children[index].key;
}

function setTransform(style, v) {
  style.transform = v;
  style.webkitTransform = v;
  style.mozTransform = v;
}

function isTransform3dSupported(style) {
  return ('transform' in style || 'webkitTransform' in style || 'MozTransform' in style) && window.atob;
}

function setTransition(style, v) {
  style.transition = v;
  style.webkitTransition = v;
  style.MozTransition = v;
}

function getTransformPropValue(v) {
  return {
    transform: v,
    WebkitTransform: v,
    MozTransform: v
  };
}

function isVertical(tabBarPosition) {
  return tabBarPosition === 'left' || tabBarPosition === 'right';
}

function getTransformByIndex(index, tabBarPosition) {
  var translate = isVertical(tabBarPosition) ? 'translateY' : 'translateX';
  return "".concat(translate, "(").concat(-index * 100, "%) translateZ(0)");
}

function getMarginStyle(index, tabBarPosition) {
  var marginDirection = isVertical(tabBarPosition) ? 'margin-top' : 'margin-left';
  return _defineProperty({}, marginDirection, "".concat(-index * 100, "%"));
}

function getStyle(el, property) {
  return +window.getComputedStyle(el).getPropertyValue(property).replace('px', '');
}

function setPxStyle(el, value, vertical) {
  value = vertical ? "0px, ".concat(value, "px, 0px") : "".concat(value, "px, 0px, 0px");
  setTransform(el.style, "translate3d(".concat(value, ")"));
}

function getDataAttr(props) {
  return Object.keys(props).reduce(function (prev, key) {
    if (key.substr(0, 5) === 'aria-' || key.substr(0, 5) === 'data-' || key === 'role') {
      prev[key] = props[key];
    }

    return prev;
  }, {});
}

function toNum(style, property) {
  return +style.getPropertyValue(property).replace('px', '');
}

function getTypeValue(start, current, end, tabNode, wrapperNode) {
  var total = getStyle(wrapperNode, "padding-".concat(start));

  if (!tabNode || !tabNode.parentNode) {
    return total;
  }

  var childNodes = tabNode.parentNode.childNodes;
  Array.prototype.some.call(childNodes, function (node) {
    if (node.nodeType !== 1) {
      return false;
    }

    var style = window.getComputedStyle(node);

    if (node !== tabNode) {
      total += toNum(style, "margin-".concat(start));
      total += node[current];
      total += toNum(style, "margin-".concat(end));

      if (style.boxSizing === 'content-box') {
        total += toNum(style, "border-".concat(start, "-width")) + toNum(style, "border-".concat(end, "-width"));
      }

      return false;
    } // We need count current node margin
    // ref: https://github.com/react-component/tabs/pull/139#issuecomment-431005262


    total += toNum(style, "margin-".concat(start));
    return true;
  });
  return total;
}

function getLeft(tabNode, wrapperNode) {
  return getTypeValue('left', 'offsetWidth', 'right', tabNode, wrapperNode);
}

function getTop(tabNode, wrapperNode) {
  return getTypeValue('top', 'offsetHeight', 'bottom', tabNode, wrapperNode);
}