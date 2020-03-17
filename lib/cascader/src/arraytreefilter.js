"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

/**
 * @file Santd cascader array tree filter file
 **/
var _default = function _default(data, filterFn) {
  var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  options.childrenKeyName = options.childrenKeyName || 'children';
  var children = data || [];
  var result = [];
  var level = 0;

  do {
    var foundItem = children.filter(function (item) {
      return filterFn(item, level);
    })[0];

    if (!foundItem) {
      break;
    }

    result.push(foundItem);
    children = foundItem[options.childrenKeyName] || [];
    level += 1;
  } while (children.length > 0);

  return result;
};

exports["default"] = _default;