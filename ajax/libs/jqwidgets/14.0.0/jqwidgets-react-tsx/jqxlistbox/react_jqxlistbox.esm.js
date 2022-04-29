import * as jqxcore from '../../jqwidgets/jqxcore';
import * as jqxdata from '../../jqwidgets/jqxdata';
import * as jqxbuttons from '../../jqwidgets/jqxbuttons';
import * as jqxscrollbar from '../../jqwidgets/jqxscrollbar';
import * as jqxlistbox from '../../jqwidgets/jqxlistbox';
import * as jqxdragdrop from '../../jqwidgets/jqxdragdrop';
import { createElement, PureComponent } from 'react';

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

var JqxListBox = /** @class */ (function (_super) {
    __extends(JqxListBox, _super);
    function JqxListBox(props) {
        var _this = _super.call(this, props) || this;
        /* tslint:disable:variable-name */
        _this._jqx = JQXLite;
        _this._id = 'JqxListBox' + _this._jqx.generateID();
        _this._componentSelector = '#' + _this._id;
        _this.state = { lastProps: props };
        return _this;
    }
    JqxListBox.getDerivedStateFromProps = function (props, state) {
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
    JqxListBox.prototype.componentDidMount = function () {
        var widgetOptions = this._manageProps();
        this._jqx(this._componentSelector).jqxListBox(widgetOptions);
        this._wireEvents();
    };
    JqxListBox.prototype.componentDidUpdate = function () {
        var widgetOptions = this._manageProps();
        this.setOptions(widgetOptions);
        this._wireEvents();
    };
    JqxListBox.prototype.render = function () {
        return (createElement("div", { id: this._id, className: this.props.className, style: this.props.style }, this.props.children));
    };
    JqxListBox.prototype.setOptions = function (options) {
        this._jqx(this._componentSelector).jqxListBox(options);
    };
    JqxListBox.prototype.getOptions = function (option) {
        return this._jqx(this._componentSelector).jqxListBox(option);
    };
    JqxListBox.prototype.addItem = function (Item) {
        return this._jqx(this._componentSelector).jqxListBox('addItem', Item);
    };
    JqxListBox.prototype.beginUpdate = function () {
        this._jqx(this._componentSelector).jqxListBox('beginUpdate');
    };
    JqxListBox.prototype.clear = function () {
        this._jqx(this._componentSelector).jqxListBox('clear');
    };
    JqxListBox.prototype.clearSelection = function () {
        this._jqx(this._componentSelector).jqxListBox('clearSelection');
    };
    JqxListBox.prototype.checkIndex = function (Index) {
        this._jqx(this._componentSelector).jqxListBox('checkIndex', Index);
    };
    JqxListBox.prototype.checkItem = function (Item) {
        this._jqx(this._componentSelector).jqxListBox('checkItem', Item);
    };
    JqxListBox.prototype.checkAll = function () {
        this._jqx(this._componentSelector).jqxListBox('checkAll');
    };
    JqxListBox.prototype.clearFilter = function () {
        this._jqx(this._componentSelector).jqxListBox('clearFilter');
    };
    JqxListBox.prototype.destroy = function () {
        this._jqx(this._componentSelector).jqxListBox('destroy');
    };
    JqxListBox.prototype.disableItem = function (Item) {
        this._jqx(this._componentSelector).jqxListBox('disableItem', Item);
    };
    JqxListBox.prototype.disableAt = function (Index) {
        this._jqx(this._componentSelector).jqxListBox('disableAt', Index);
    };
    JqxListBox.prototype.enableItem = function (Item) {
        this._jqx(this._componentSelector).jqxListBox('enableItem', Item);
    };
    JqxListBox.prototype.enableAt = function (Index) {
        this._jqx(this._componentSelector).jqxListBox('enableAt', Index);
    };
    JqxListBox.prototype.ensureVisible = function (item) {
        this._jqx(this._componentSelector).jqxListBox('ensureVisible', item);
    };
    JqxListBox.prototype.endUpdate = function () {
        this._jqx(this._componentSelector).jqxListBox('endUpdate');
    };
    JqxListBox.prototype.focus = function () {
        this._jqx(this._componentSelector).jqxListBox('focus');
    };
    JqxListBox.prototype.getItems = function () {
        return this._jqx(this._componentSelector).jqxListBox('getItems');
    };
    JqxListBox.prototype.getSelectedItems = function () {
        return this._jqx(this._componentSelector).jqxListBox('getSelectedItems');
    };
    JqxListBox.prototype.getCheckedItems = function () {
        return this._jqx(this._componentSelector).jqxListBox('getCheckedItems');
    };
    JqxListBox.prototype.getItem = function (Index) {
        return this._jqx(this._componentSelector).jqxListBox('getItem', Index);
    };
    JqxListBox.prototype.getItemByValue = function (Item) {
        return this._jqx(this._componentSelector).jqxListBox('getItemByValue', Item);
    };
    JqxListBox.prototype.getSelectedItem = function () {
        return this._jqx(this._componentSelector).jqxListBox('getSelectedItem');
    };
    JqxListBox.prototype.getSelectedIndex = function () {
        return this._jqx(this._componentSelector).jqxListBox('getSelectedIndex');
    };
    JqxListBox.prototype.insertAt = function (Item, Index) {
        this._jqx(this._componentSelector).jqxListBox('insertAt', Item, Index);
    };
    JqxListBox.prototype.invalidate = function () {
        this._jqx(this._componentSelector).jqxListBox('invalidate');
    };
    JqxListBox.prototype.indeterminateItem = function (Item) {
        this._jqx(this._componentSelector).jqxListBox('indeterminateItem', Item);
    };
    JqxListBox.prototype.indeterminateIndex = function (Index) {
        this._jqx(this._componentSelector).jqxListBox('indeterminateIndex', Index);
    };
    JqxListBox.prototype.loadFromSelect = function (selector) {
        this._jqx(this._componentSelector).jqxListBox('loadFromSelect', selector);
    };
    JqxListBox.prototype.removeItem = function (Item) {
        this._jqx(this._componentSelector).jqxListBox('removeItem', Item);
    };
    JqxListBox.prototype.removeAt = function (Index) {
        this._jqx(this._componentSelector).jqxListBox('removeAt', Index);
    };
    JqxListBox.prototype.renderWidget = function () {
        this._jqx(this._componentSelector).jqxListBox('render');
    };
    JqxListBox.prototype.refresh = function () {
        this._jqx(this._componentSelector).jqxListBox('refresh');
    };
    JqxListBox.prototype.selectItem = function (Item) {
        this._jqx(this._componentSelector).jqxListBox('selectItem', Item);
    };
    JqxListBox.prototype.selectIndex = function (Index) {
        this._jqx(this._componentSelector).jqxListBox('selectIndex', Index);
    };
    JqxListBox.prototype.updateItem = function (Item, Value) {
        this._jqx(this._componentSelector).jqxListBox('updateItem', Item, Value);
    };
    JqxListBox.prototype.updateAt = function (item, index) {
        this._jqx(this._componentSelector).jqxListBox('updateAt', item, index);
    };
    JqxListBox.prototype.unselectIndex = function (index) {
        this._jqx(this._componentSelector).jqxListBox('unselectIndex', index);
    };
    JqxListBox.prototype.unselectItem = function (item) {
        this._jqx(this._componentSelector).jqxListBox('unselectItem', item);
    };
    JqxListBox.prototype.uncheckIndex = function (index) {
        this._jqx(this._componentSelector).jqxListBox('uncheckIndex', index);
    };
    JqxListBox.prototype.uncheckItem = function (item) {
        this._jqx(this._componentSelector).jqxListBox('uncheckItem', item);
    };
    JqxListBox.prototype.uncheckAll = function () {
        this._jqx(this._componentSelector).jqxListBox('uncheckAll');
    };
    JqxListBox.prototype.val = function (value) {
        if (value) {
            this._jqx(this._componentSelector).jqxListBox('val', value);
        }
        else {
            return this._jqx(this._componentSelector).jqxListBox('val');
        }
    };
    JqxListBox.prototype._manageProps = function () {
        var widgetProps = ['autoHeight', 'allowDrag', 'allowDrop', 'checkboxes', 'disabled', 'displayMember', 'dropAction', 'dragStart', 'dragEnd', 'enableHover', 'enableSelection', 'equalItemsWidth', 'filterable', 'filterHeight', 'filterDelay', 'filterPlaceHolder', 'height', 'hasThreeStates', 'itemHeight', 'incrementalSearch', 'incrementalSearchDelay', 'multiple', 'multipleextended', 'renderer', 'rendered', 'rtl', 'selectedIndex', 'selectedIndexes', 'source', 'scrollBarSize', 'searchMode', 'theme', 'valueMember', 'width'];
        var options = {};
        for (var prop in this.props) {
            if (widgetProps.indexOf(prop) !== -1) {
                options[prop] = this.props[prop];
            }
        }
        return options;
    };
    JqxListBox.prototype._wireEvents = function () {
        for (var prop in this.props) {
            if (prop.indexOf('on') === 0) {
                var originalEventName = prop.slice(2);
                originalEventName = originalEventName.charAt(0).toLowerCase() + originalEventName.slice(1);
                this._jqx(this._componentSelector).off(originalEventName);
                this._jqx(this._componentSelector).on(originalEventName, this.props[prop]);
            }
        }
    };
    return JqxListBox;
}(PureComponent));
var jqx = window.jqx;
var JQXLite = window.JQXLite;

export default JqxListBox;
export { jqx, JQXLite };
