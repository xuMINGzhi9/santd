/**
 * @file 组件 radio
 * @author chenkai13 <chenkai13@baidu.com>
 */

import san from 'san';
import {classCreator} from '../core/util';
import Radio from './radio';
const prefixCls = classCreator('radio-button')();

export default san.defineComponent({
    initData() {
        return {
            ...Radio.prototype.initData(),
            prefixCls
        };
    }
}, Radio);
