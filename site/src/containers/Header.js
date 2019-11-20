/**
 * @file header component
 * @author wangyongqing <wangyongqing01@baidu.com>
 */

import {Component} from 'san';
import {Icon, Col, Row, Menu, Badge, Select, Input} from 'santd';

export default class Header extends Component {
    // eslint-disable-next-line
    static template = /*html*/ `
        <header class="doc-header clearfix">
            <s-row>
                <s-col xs="24" sm="24" md="5" lg="5" xl="5" xxl="4">
                    <a class="doc-logo" href="/">
                        <span class="logo"></span>
                        <span class="text">santd</span>
                    </a>
                </s-col>
                <s-col xs="0" sm="0" md="19" lg="19" xl="19" xxl="20">
                    <div class="doc-search">
                        <s-icon type="search"></s-icon>
                        <s-select
                            showSearch
                            value="{{value}}"
                            showArrow="{{false}}"
                            filterOption="{{false}}"
                            notFoundContent="not found"
                            style="width: 200px;"
                            placeholder="input search text"
                            on-search="handleSearch"
                            on-select="handleSelect"
                        >
                            <s-select-option s-for="d in showOpts" value="{{d.key}}">
                                {{d.path}}
                            </s-select-option>
                        </s-select>
                    </div>
                    <s-menu
                        class="doc-nav"
                        mode="horizontal"
                        theme="light"
                        defaultSelectedKeys="{{['1']}}"
                        inlineCollapsed="{{false}}"
                        on-click="itemClick"
                    >
                        <s-menu-item key="1">
                            <a href="#/">
                                <span>组件</span>
                            </a>
                        </s-menu-item>
                        <s-menu-item key="2">
                            <a href="https://ant.design/docs/spec/introduce-cn" target="_blank">
                                <span>设计语言</span>
                            </a>
                        </s-menu-item>
                        <s-sub-menu key="3" title="生态" target="_blank">
                            <s-menu-item-group title="Item 1">
                                <s-menu-item key="4">
                                    <a href="http://pro.ant.design" class="header-link" target="_blank">
                                        Ant Design Pro v4
                                    </a>
                                </s-menu-item>
                                <s-menu-item key="5">
                                    <a href="http://ng.ant.design" class="header-link" target="_blank">
                                        Ant Design of Angular
                                    </a>
                                </s-menu-item>
                                <s-menu-item key="6">
                                    <a href="http://vue.ant.design" class="header-link" target="_blank">
                                        Ant Design of Vue
                                    </a>
                                </s-menu-item>
                                <s-menu-item key="7">
                                    <a href="https://www.yuque.com/ant-design/course" class="header-link" target="_blank">
                                        Ant Design 实战教程
                                    </a>
                                </s-menu-item>
                                <s-menu-item key="8">
                                    <a href="/" class="header-link">
                                        <s-badge dot>Ant Design of San</s-badge>
                                    </a>
                                </s-menu-item>
                            </s-menu-item-group>
                        </s-sub-menu>
                    </s-menu>
                </s-col>
            </s-row>
        </header>
    `;

    static components = {
        's-col': Col,
        's-row': Row,
        's-icon': Icon,
        's-menu': Menu,
        's-menu-item': Menu.Item,
        's-sub-menu': Menu.Sub,
        's-input': Input,
        's-badge': Badge,
        's-select': Select,
        's-select-option': Select.Option
    };
    initData() {
        return {
            opts: [],
            showOpts: [],
            value: ''
        };
    }
    created() {
        const routes = this.data.get('routes');
        const opts = this.getCom(routes);
        this.data.set('opts', opts);
        this.data.set('showOpts', opts);
    }
    getCom(arr) {
        return arr.reduce((pre, cur) => {
            if (cur.leaf) {
                return [...pre, ...cur.leaf];
            }
            return [...pre, ...(this.getCom(cur.list))];
        }, []);
    }
    handleSearch(value) {
        const opts = this.data.get('opts');
        let showOpts = value ? opts.filter(item => item.name.indexOf(value) > -1) : opts;
        this.data.set('showOpts', showOpts);
    }
    handleSelect(value) {
        this.fire('redirect', {key: value});
    }
}