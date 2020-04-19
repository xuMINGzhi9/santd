"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setTwoToneColor = setTwoToneColor;
exports.getTwoToneColor = getTwoToneColor;

var _icon = _interopRequireDefault(require("./icon"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/**
 * @file Santd icon twoTonePrimaryColor
 * @author mayihui@baidu.com
 **/
function setTwoToneColor(primaryColor) {
  return _icon["default"].setTwoToneColors({
    primaryColor: primaryColor
  });
}

function getTwoToneColor() {
  var colors = _icon["default"].getTwoToneColors();

  return colors.primaryColor;
}