require('../../jqwidgets/jqxcore');
require('../../jqwidgets/jqxdata');
require('../../jqwidgets/jqxbuttons');
require('../../jqwidgets/jqxscrollbar');
require('../../jqwidgets/jqxlistbox');
require('../../jqwidgets/jqxdropdownlist');
(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('react')) :
    typeof define === 'function' && define.amd ? define(['exports', 'react'], factory) :
    (factory((global.react_jqxdropdownlist = {}),global.React));
}(this, (function (exports,React) { 'use strict';

    /*! *****************************************************************************
    Copyright (c) Microsoft Corporation. All rights reserved.
    Licensed under the Apache License, Version 2.0 (the "License"); you may not use
    this file except in compliance with the License. You may obtain a copy of the
    License at http://www.apache.org/licenses/LICENSE-2.0

    THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
    KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
    WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
    MERCHANTABLITY OR NON-INFRINGEMENT.

    See the Apache Version 2.0 License for specific language governing permissions
    and limitations under the License.
    ***************************************************************************** */
    /* global Reflect, Promise */

    var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };

    function __extends(d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    }

    var JqxDropDownList = /** @class */ (function (_super) {
        __extends(JqxDropDownList, _super);
        function JqxDropDownList(props) {
            var _this = _super.call(this, props) || this;
            /* tslint:disable:variable-name */
            _this._jqx = JQXLite;
            _this._id = 'JqxDropDownList' + _this._jqx.generateID();
            _this._componentSelector = '#' + _this._id;
            _this.state = { lastProps: props };
            return _this;
        }
        JqxDropDownList.getDerivedStateFromProps = function (props, state) {
            if (!Object.is) {
                Object.is = function (x, y) {
                    if (x === y) {
                        return x !== 0 || 1 / x === 1 / y;
                    }
                    else {
                        return x !== x && y !== y;
                    }
                };
            }
            var areEqual = Object.is(props, state.lastProps);
            if (!areEqual) {
                var newState = { lastProps: props };
                return newState;
            }
            return null;
        };
        JqxDropDownList.prototype.componentDidMount = function () {
            var widgetOptions = this._manageProps();
            this._jqx(this._componentSelector).jqxDropDownList(widgetOptions);
            this._wireEvents();
        };
        JqxDropDownList.prototype.componentDidUpdate = function () {
            var widgetOptions = this._manageProps();
            this.setOptions(widgetOptions);
            this._wireEvents();
        };
        JqxDropDownList.prototype.render = function () {
            return (React.createElement("div", { id: this._id, className: this.props.className, style: this.props.style }, this.props.children));
        };
        JqxDropDownList.prototype.setOptions = function (options) {
            this._jqx(this._componentSelector).jqxDropDownList(options);
        };
        JqxDropDownList.prototype.getOptions = function (option) {
            return this._jqx(this._componentSelector).jqxDropDownList(option);
        };
        JqxDropDownList.prototype.addItem = function (item) {
            return this._jqx(this._componentSelector).jqxDropDownList('addItem', item);
        };
        JqxDropDownList.prototype.clearSelection = function () {
            this._jqx(this._componentSelector).jqxDropDownList('clearSelection');
        };
        JqxDropDownList.prototype.clear = function () {
            this._jqx(this._componentSelector).jqxDropDownList('clear');
        };
        JqxDropDownList.prototype.close = function () {
            this._jqx(this._componentSelector).jqxDropDownList('close');
        };
        JqxDropDownList.prototype.checkIndex = function (index) {
            this._jqx(this._componentSelector).jqxDropDownList('checkIndex', index);
        };
        JqxDropDownList.prototype.checkItem = function (item) {
            this._jqx(this._componentSelector).jqxDropDownList('checkItem', item);
        };
        JqxDropDownList.prototype.checkAll = function () {
            this._jqx(this._componentSelector).jqxDropDownList('checkAll');
        };
        JqxDropDownList.prototype.clearFilter = function () {
            this._jqx(this._componentSelector).jqxDropDownList('clearFilter');
        };
        JqxDropDownList.prototype.destroy = function () {
            this._jqx(this._componentSelector).jqxDropDownList('destroy');
        };
        JqxDropDownList.prototype.disableItem = function (item) {
            this._jqx(this._componentSelector).jqxDropDownList('disableItem', item);
        };
        JqxDropDownList.prototype.disableAt = function (index) {
            this._jqx(this._componentSelector).jqxDropDownList('disableAt', index);
        };
        JqxDropDownList.prototype.enableItem = function (item) {
            this._jqx(this._componentSelector).jqxDropDownList('enableItem', item);
        };
        JqxDropDownList.prototype.enableAt = function (index) {
            this._jqx(this._componentSelector).jqxDropDownList('enableAt', index);
        };
        JqxDropDownList.prototype.ensureVisible = function (index) {
            this._jqx(this._componentSelector).jqxDropDownList('ensureVisible', index);
        };
        JqxDropDownList.prototype.focus = function () {
            this._jqx(this._componentSelector).jqxDropDownList('focus');
        };
        JqxDropDownList.prototype.getItem = function (index) {
            return this._jqx(this._componentSelector).jqxDropDownList('getItem', index);
        };
        JqxDropDownList.prototype.getItemByValue = function (itemValue) {
            return this._jqx(this._componentSelector).jqxDropDownList('getItemByValue', itemValue);
        };
        JqxDropDownList.prototype.getItems = function () {
            return this._jqx(this._componentSelector).jqxDropDownList('getItems');
        };
        JqxDropDownList.prototype.getCheckedItems = function () {
            return this._jqx(this._componentSelector).jqxDropDownList('getCheckedItems');
        };
        JqxDropDownList.prototype.getSelectedItem = function () {
            return this._jqx(this._componentSelector).jqxDropDownList('getSelectedItem');
        };
        JqxDropDownList.prototype.getSelectedIndex = function () {
            return this._jqx(this._componentSelector).jqxDropDownList('getSelectedIndex');
        };
        JqxDropDownList.prototype.insertAt = function (item, index) {
            this._jqx(this._componentSelector).jqxDropDownList('insertAt', item, index);
        };
        JqxDropDownList.prototype.isOpened = function () {
            return this._jqx(this._componentSelector).jqxDropDownList('isOpened');
        };
        JqxDropDownList.prototype.indeterminateIndex = function (index) {
            this._jqx(this._componentSelector).jqxDropDownList('indeterminateIndex', index);
        };
        JqxDropDownList.prototype.indeterminateItem = function (item) {
            this._jqx(this._componentSelector).jqxDropDownList('indeterminateItem', item);
        };
        JqxDropDownList.prototype.loadFromSelect = function (arg) {
            this._jqx(this._componentSelector).jqxDropDownList('loadFromSelect', arg);
        };
        JqxDropDownList.prototype.open = function () {
            this._jqx(this._componentSelector).jqxDropDownList('open');
        };
        JqxDropDownList.prototype.removeItem = function (item) {
            this._jqx(this._componentSelector).jqxDropDownList('removeItem', item);
        };
        JqxDropDownList.prototype.removeAt = function (index) {
            this._jqx(this._componentSelector).jqxDropDownList('removeAt', index);
        };
        JqxDropDownList.prototype.selectIndex = function (index) {
            this._jqx(this._componentSelector).jqxDropDownList('selectIndex', index);
        };
        JqxDropDownList.prototype.selectItem = function (item) {
            this._jqx(this._componentSelector).jqxDropDownList('selectItem', item);
        };
        JqxDropDownList.prototype.setContent = function (content) {
            this._jqx(this._componentSelector).jqxDropDownList('setContent', content);
        };
        JqxDropDownList.prototype.updateItem = function (newItem, item) {
            this._jqx(this._componentSelector).jqxDropDownList('updateItem', newItem, item);
        };
        JqxDropDownList.prototype.updateAt = function (item, index) {
            this._jqx(this._componentSelector).jqxDropDownList('updateAt', item, index);
        };
        JqxDropDownList.prototype.unselectIndex = function (index) {
            this._jqx(this._componentSelector).jqxDropDownList('unselectIndex', index);
        };
        JqxDropDownList.prototype.unselectItem = function (item) {
            this._jqx(this._componentSelector).jqxDropDownList('unselectItem', item);
        };
        JqxDropDownList.prototype.uncheckIndex = function (index) {
            this._jqx(this._componentSelector).jqxDropDownList('uncheckIndex', index);
        };
        JqxDropDownList.prototype.uncheckItem = function (item) {
            this._jqx(this._componentSelector).jqxDropDownList('uncheckItem', item);
        };
        JqxDropDownList.prototype.uncheckAll = function () {
            this._jqx(this._componentSelector).jqxDropDownList('uncheckAll');
        };
        JqxDropDownList.prototype.val = function (value) {
            if (value) {
                this._jqx(this._componentSelector).jqxDropDownList('val', value);
            }
            else {
                return this._jqx(this._componentSelector).jqxDropDownList('val');
            }
        };
        JqxDropDownList.prototype._manageProps = function () {
            var widgetProps = ['autoOpen', 'autoDropDownHeight', 'animationType', 'checkboxes', 'closeDelay', 'disabled', 'displayMember', 'dropDownHorizontalAlignment', 'dropDownVerticalAlignment', 'dropDownHeight', 'dropDownWidth', 'enableSelection', 'enableBrowserBoundsDetection', 'enableHover', 'filterable', 'filterHeight', 'filterDelay', 'filterPlaceHolder', 'height', 'incrementalSearch', 'incrementalSearchDelay', 'itemHeight', 'openDelay', 'placeHolder', 'popupZIndex', 'rtl', 'renderer', 'selectionRenderer', 'searchMode', 'source', 'selectedIndex', 'scrollBarSize', 'theme', 'template', 'valueMember', 'width'];
            var options = {};
            for (var prop in this.props) {
                if (widgetProps.indexOf(prop) !== -1) {
                    options[prop] = this.props[prop];
                }
            }
            return options;
        };
        JqxDropDownList.prototype._wireEvents = function () {
            for (var prop in this.props) {
                if (prop.indexOf('on') === 0) {
                    var originalEventName = prop.slice(2);
                    originalEventName = originalEventName.charAt(0).toLowerCase() + originalEventName.slice(1);
                    this._jqx(this._componentSelector).off(originalEventName);
                    this._jqx(this._componentSelector).on(originalEventName, this.props[prop]);
                }
            }
        };
        return JqxDropDownList;
    }(React.PureComponent));
    var jqx = window.jqx;
    var JQXLite = window.JQXLite;

    exports.default = JqxDropDownList;
    exports.jqx = jqx;
    exports.JQXLite = JQXLite;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
