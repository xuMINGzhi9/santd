/**
* @file input-search 输入框search组件
* @author fuqiangqiang@baidu.com
*/

import san, {DataTypes} from 'san';
import {classCreator} from '../core/util';
import Icon from '../icon';
import Button from '../button';
import BaseInput from './base';
const prefixCls = classCreator('input')();

export default san.defineComponent({
    dataTypes: {
        ...BaseInput.prototype.dataTypes,
        enterButton: DataTypes.oneOfType([DataTypes.string, DataTypes.bool])
    },
    components: {
        's-icon': Icon,
        's-button': Button
    },
    searchClick() {
        const inputValue = this.ref('input').value;
        this.fire('search', inputValue);
    },
    computed: {
        classes() {
            const enterButton = this.data.get('enterButton');
            const size = this.data.get('size');
            let classArr = [`${prefixCls}-search`, `${prefixCls}-affix-wrapper`];

            !!enterButton && classArr.push(`${prefixCls}-search-enter-button`);
            !!size && classArr.push(`${prefixCls}-affix-wrapper-${size}`);

            return classArr;
        }
    },
    template: `
        <span class="{{classes}}">
            ${BaseInput.prototype.template}
            <span s-if="enterButton" class="${prefixCls}-suffix" on-click="searchClick()">
                <s-button type="primary" class="${prefixCls}-search-button" size="{{size}}">
                    <s-icon s-if="enterButton === true" type="search" />
                    <span s-else>{{enterButton}}</span>
                </s-button>
            </span>
            <span s-else class="${prefixCls}-suffix" on-click="searchClick()">
                <s-icon class="${prefixCls}-search-icon" type="search" />
            <span>
        </span>
    `
}, BaseInput);
