/**
 * @file 组件 affix
 * @author fuqiangqiang <fuqiangqiang@baidu.com>
 */

import san, {DataTypes} from 'san';
import {classCreator} from '../core/util';
import {on, off, getScrollTop, getOffset} from '../core/util/dom';
import './style/index';

const outerCls = classCreator('affix-outer')();
const innerCls = classCreator('affix')();

export default san.defineComponent({
    dataTypes: {
        offsetTop: DataTypes.oneOfType([DataTypes.string, DataTypes.number]),
        offsetBottom: DataTypes.oneOfType([DataTypes.string, DataTypes.number])
    },

    initData() {
        return {
            affix: false,
            styles: {},
            offsetTop: 0,
            pointStyles: {}
        };
    },

    attached() {
        if (!this._scroller) {
            this._scroller = this.handleScroll.bind(this);

            on(window, 'scroll', this._scroller);
            on(window, 'resize', this._scroller);
        }
    },

    disposed() {
        if (this._scroller) {
            off(window, 'scroll', this._scroller);
            off(window, 'resize', this._scroller);
            this._scroller = null;
        }
    },
    
    handleScroll() {
        const elOffset = getOffset(this.el);
        const scrollTop = getScrollTop();
        const innerEl = this.ref('inner');

        let offsetTop = +this.data.get('offsetTop');
        let offsetBottom = +this.data.get('offsetBottom');
        let isAffixBottom = offsetBottom >= 0;

        let affix = this.data.get('affix');
        let affixTo = null;
        let styles = {};
        let pointStyles = {};

        
        if (isAffixBottom) {
            let winBottomPos = window.innerHeight + scrollTop;
            let elBottomAffixPos = elOffset.top + offsetBottom + innerEl.offsetHeight;

            if (elBottomAffixPos > winBottomPos && !affix) {
                affixTo = true;
                styles = {
                    bottom: `${offsetBottom}px`
                };
            }
            else if (elBottomAffixPos < winBottomPos && affix) {
                affixTo = false;
            }
        }
        else {
            let elTopAffixPos = elOffset.top - offsetTop;

            if (elTopAffixPos <= scrollTop && !affix) {
                affixTo = true;
                styles = {
                    top: `${offsetTop}px`
                };
            }
            else if (elTopAffixPos > scrollTop && affix) {
                affixTo = false;
            }
        }


        if (affixTo != null) {
            if (affixTo === true) {
                pointStyles = {
                    width: innerEl.clientWidth + 'px',
                    height: innerEl.clientHeight + 'px'
                };
                styles.left = `${elOffset.left}px`;
                styles.width = `${elOffset.width}px`;
            }

            this.data.set('pointStyles', pointStyles);
            this.data.set('styles', styles);
            this.data.set('affix', affixTo);
            this.fire('change', affixTo);
        }
    },

    template: `
        <div class="${outerCls}" style="{{pointStyles}}">
            <div class="${innerCls}" style="{{styles}}" s-ref="inner">
                <slot></slot>
            </div>
        </div>
    `
});