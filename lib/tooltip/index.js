"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _san = _interopRequireDefault(require("san"));

var _trigger = _interopRequireDefault(require("../core/trigger"));

var _placements = _interopRequireDefault(require("./placements"));

var _util = require("../core/util");

var _util2 = require("./util");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/**
 * @file 组件 tooltip
 * @author zhangtingting12 <zhangtingting12@baidu.com>
 */
var prefixCls = (0, _util.classCreator)('tooltip')();

var _default = _san["default"].defineComponent({
  initData: function initData() {
    return {
      mouseEnterDelay: 0.1,
      destroyTooltipOnHide: false,
      mouseLeaveDelay: 0.1,
      popupAlign: {},
      builtinPlacements: _placements["default"],
      trigger: 'hover',
      placement: 'top',
      transitionName: 'zoom-big-fast',
      arrowPointAtCenter: false,
      autoAdjustOverflow: true,
      useDomNodeForce: false
    };
  },
  computed: {
    builtinPlacements: function builtinPlacements() {
      var builtinPlacements = this.data.get('placements');
      var arrowPointAtCenter = this.data.get('arrowPointAtCenter');
      var autoAdjustOverflow = this.data.get('autoAdjustOverflow');
      return builtinPlacements || (0, _util2.getPlacements)({
        arrowPointAtCenter: arrowPointAtCenter,
        verticalArrowShift: 8,
        autoAdjustOverflow: autoAdjustOverflow
      });
    }
  },
  components: {
    's-trigger': _trigger["default"]
  },
  handleVisibleChange: function handleVisibleChange(visible) {
    this.fire('visibleChange', visible);
  },
  refresh: function refresh() {
    this.ref('trigger').refresh();
  },
  template: "<span>\n        <s-trigger\n            prefixCls=\"".concat(prefixCls, "\"\n            builtinPlacements=\"{{builtinPlacements}}\"\n            popupPlacement=\"{{placement}}\"\n            popupAlign=\"{{popupAlign}}\"\n            popupTransitionName=\"{{transitionName}}\"\n            defaultPopupVisible=\"{{defaultVisible}}\"\n            getPopupContainer=\"{{getPopupContainer}}\"\n            mouseEnterDelay=\"{{mouseEnterDelay}}\"\n            mouseLeaveDelay=\"{{mouseLeaveDelay}}\"\n            popupClassName=\"{{overlayClassName}}\"\n            popupStyle=\"{{overlayStyle}}\"\n            rootDomNode=\"{{rootDomNode}}\"\n            useDomNodeForce=\"{{useDomNodeForce}}\"\n            style=\"{{tooltipStyle}}\"\n            action=\"{{trigger}}\"\n            visible=\"{{visible}}\"\n            on-visibleChange=\"handleVisibleChange\"\n            s-ref=\"trigger\"\n        >\n            <slot />\n            <template slot=\"popup\">\n                <div class=\"").concat(prefixCls, "-arrow\"></div>\n                <div class=\"").concat(prefixCls, "-inner\" id=\"{{id}}\" role=\"tooltip\">\n                    <slot name=\"title\" s-if=\"!title\" />\n                    <template s-else>{{title}}</template>\n                </div>\n            </template>\n        </s-trigger>\n    </span>")
});

exports["default"] = _default;