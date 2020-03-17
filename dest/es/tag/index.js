/**
 * @file tag入口文件
 * @author fuqiangqiang@baidu.com
 */

import san, {DataTypes} from 'san';
import CheckableTag from './checkableTag';
import {classCreator} from '../core/util';
import Wave from '../core/util/wave';
import Icon from '../icon';

const prefixCls = classCreator('tag')();
const presetColorTypes = [
    'pink',
    'red',
    'yellow',
    'orange',
    'cyan',
    'green',
    'blue',
    'purple',
    'geekblue',
    'magenta',
    'volcano',
    'gold',
    'lime'
];
const presetColorRegex = new RegExp(`^(${presetColorTypes.join('|')})(-inverse)?$`);

const Tag = san.defineComponent({
    dataTypes: {
        color: DataTypes.string,
        closable: DataTypes.bool,
        visible: DataTypes.bool
    },

    computed: {
        classes() {
            const visible = this.data.get('visible');
            const color = this.data.get('color');
            const isPresetColor = this.data.get('isPresetColor');

            let classArr = [prefixCls];
            isPresetColor && classArr.push(`${prefixCls}-${color}`);
            color && !isPresetColor && classArr.push(`${prefixCls}-has-color`);
            !visible && classArr.push(`${prefixCls}-hidden`);
            return classArr;
        },

        isPresetColor() {
            const color = this.data.get('color');
            return color ? presetColorRegex.test(color) : false;
        }
    },

    initData() {
        return {
            closable: false,
            visible: true
        };
    },

    inited() {
        let nonameSlots = this.sourceSlots.noname;
        if (nonameSlots && nonameSlots[0].tagName === 'a') {
            this.data.set('isNeedWave', true);
        }
    },

    setVisible(visible, e) {
        this.fire('close', e);
        if (e.defaultPrevented) {
            return;
        }
        this.data.set('visible', visible);
    },

    handleIconClick(e) {
        this.setVisible(false, e);
    },

    handleClick(e) {
        this.fire('click', e);
    },

    components: {
        's-wave': Wave,
        's-icon': Icon
    },

    template: `
        <div class="{{classes}}" style="{{color && !isPresetColor ? 'background-color:' + color : ''}}" on-click="handleClick">
            <slot />
            <s-icon type="close" on-click="handleIconClick" s-if="closable" />
            <s-wave s-if="isNeedWave" />
        </div>
    `
});

Tag.CheckableTag = CheckableTag;
export default Tag;