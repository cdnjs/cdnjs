import * as jqxcore from '../../jqwidgets/jqxcore';
import * as jqxdata from '../../jqwidgets/jqxdata';
import * as jqxbuttons from '../../jqwidgets/jqxbuttons';
import * as jqxscrollbar from '../../jqwidgets/jqxscrollbar';
import * as jqxpanel from '../../jqwidgets/jqxpanel';
import * as jqxdragdrop from '../../jqwidgets/jqxdragdrop';
import * as jqxtree from '../../jqwidgets/jqxtree';
import * as jqxcheckbox from '../../jqwidgets/jqxcheckbox';
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

var JqxTree = /** @class */ (function (_super) {
    __extends(JqxTree, _super);
    function JqxTree(props) {
        var _this = _super.call(this, props) || this;
        /* tslint:disable:variable-name */
        _this._jqx = JQXLite;
        _this._id = 'JqxTree' + _this._jqx.generateID();
        _this._componentSelector = '#' + _this._id;
        _this.state = { lastProps: props };
        return _this;
    }
    JqxTree.getDerivedStateFromProps = function (props, state) {
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
    JqxTree.prototype.componentDidMount = function () {
        var widgetOptions = this._manageProps();
        this._jqx(this._componentSelector).jqxTree(widgetOptions);
        this._wireEvents();
    };
    JqxTree.prototype.componentDidUpdate = function () {
        var widgetOptions = this._manageProps();
        this.setOptions(widgetOptions);
        this._wireEvents();
    };
    JqxTree.prototype.render = function () {
        return (createElement("div", { id: this._id, className: this.props.className, style: this.props.style }, this.props.children));
    };
    JqxTree.prototype.setOptions = function (options) {
        this._jqx(this._componentSelector).jqxTree(options);
    };
    JqxTree.prototype.getOptions = function (option) {
        return this._jqx(this._componentSelector).jqxTree(option);
    };
    JqxTree.prototype.addBefore = function (item, id) {
        this._jqx(this._componentSelector).jqxTree('addBefore', item, id);
    };
    JqxTree.prototype.addAfter = function (item, id) {
        this._jqx(this._componentSelector).jqxTree('addAfter', item, id);
    };
    JqxTree.prototype.addTo = function (item, id) {
        this._jqx(this._componentSelector).jqxTree('addTo', item, id);
    };
    JqxTree.prototype.clear = function () {
        this._jqx(this._componentSelector).jqxTree('clear');
    };
    JqxTree.prototype.checkAll = function () {
        this._jqx(this._componentSelector).jqxTree('checkAll');
    };
    JqxTree.prototype.checkItem = function (item, checked) {
        this._jqx(this._componentSelector).jqxTree('checkItem', item, checked);
    };
    JqxTree.prototype.collapseAll = function () {
        this._jqx(this._componentSelector).jqxTree('collapseAll');
    };
    JqxTree.prototype.collapseItem = function (item) {
        this._jqx(this._componentSelector).jqxTree('collapseItem', item);
    };
    JqxTree.prototype.destroy = function () {
        this._jqx(this._componentSelector).jqxTree('destroy');
    };
    JqxTree.prototype.disableItem = function (item) {
        this._jqx(this._componentSelector).jqxTree('disableItem', item);
    };
    JqxTree.prototype.ensureVisible = function (item) {
        this._jqx(this._componentSelector).jqxTree('ensureVisible', item);
    };
    JqxTree.prototype.enableItem = function (item) {
        this._jqx(this._componentSelector).jqxTree('enableItem', item);
    };
    JqxTree.prototype.enableAll = function () {
        this._jqx(this._componentSelector).jqxTree('enableAll');
    };
    JqxTree.prototype.expandAll = function () {
        this._jqx(this._componentSelector).jqxTree('expandAll');
    };
    JqxTree.prototype.expandItem = function (item) {
        this._jqx(this._componentSelector).jqxTree('expandItem', item);
    };
    JqxTree.prototype.focus = function () {
        this._jqx(this._componentSelector).jqxTree('focus');
    };
    JqxTree.prototype.getCheckedItems = function () {
        return this._jqx(this._componentSelector).jqxTree('getCheckedItems');
    };
    JqxTree.prototype.getUncheckedItems = function () {
        return this._jqx(this._componentSelector).jqxTree('getUncheckedItems');
    };
    JqxTree.prototype.getItems = function () {
        return this._jqx(this._componentSelector).jqxTree('getItems');
    };
    JqxTree.prototype.getItem = function (element) {
        return this._jqx(this._componentSelector).jqxTree('getItem', element);
    };
    JqxTree.prototype.getSelectedItem = function () {
        return this._jqx(this._componentSelector).jqxTree('getSelectedItem');
    };
    JqxTree.prototype.getPrevItem = function (item) {
        return this._jqx(this._componentSelector).jqxTree('getPrevItem', item);
    };
    JqxTree.prototype.getNextItem = function (item) {
        return this._jqx(this._componentSelector).jqxTree('getNextItem', item);
    };
    JqxTree.prototype.hitTest = function (left, top) {
        return this._jqx(this._componentSelector).jqxTree('hitTest', left, top);
    };
    JqxTree.prototype.removeItem = function (item) {
        this._jqx(this._componentSelector).jqxTree('removeItem', item);
    };
    JqxTree.prototype.renderWidget = function () {
        this._jqx(this._componentSelector).jqxTree('render');
    };
    JqxTree.prototype.refresh = function () {
        this._jqx(this._componentSelector).jqxTree('refresh');
    };
    JqxTree.prototype.selectItem = function (item) {
        this._jqx(this._componentSelector).jqxTree('selectItem', item);
    };
    JqxTree.prototype.uncheckAll = function () {
        this._jqx(this._componentSelector).jqxTree('uncheckAll');
    };
    JqxTree.prototype.uncheckItem = function (item) {
        this._jqx(this._componentSelector).jqxTree('uncheckItem', item);
    };
    JqxTree.prototype.updateItem = function (item, newItem) {
        this._jqx(this._componentSelector).jqxTree('updateItem', item, newItem);
    };
    JqxTree.prototype.val = function (value) {
        if (value) {
            this._jqx(this._componentSelector).jqxTree('val', value);
        }
        else {
            return this._jqx(this._componentSelector).jqxTree('val');
        }
    };
    JqxTree.prototype._manageProps = function () {
        var widgetProps = ['animationShowDuration', 'animationHideDuration', 'allowDrag', 'allowDrop', 'checkboxes', 'dragStart', 'dragEnd', 'disabled', 'easing', 'enableHover', 'height', 'hasThreeStates', 'incrementalSearch', 'keyboardNavigation', 'rtl', 'source', 'toggleIndicatorSize', 'toggleMode', 'theme', 'width'];
        var options = {};
        for (var prop in this.props) {
            if (widgetProps.indexOf(prop) !== -1) {
                options[prop] = this.props[prop];
            }
        }
        return options;
    };
    JqxTree.prototype._wireEvents = function () {
        for (var prop in this.props) {
            if (prop.indexOf('on') === 0) {
                var originalEventName = prop.slice(2);
                originalEventName = originalEventName.charAt(0).toLowerCase() + originalEventName.slice(1);
                this._jqx(this._componentSelector).off(originalEventName);
                this._jqx(this._componentSelector).on(originalEventName, this.props[prop]);
            }
        }
    };
    return JqxTree;
}(PureComponent));
var jqx = window.jqx;
var JQXLite = window.JQXLite;

export default JqxTree;
export { jqx, JQXLite };
