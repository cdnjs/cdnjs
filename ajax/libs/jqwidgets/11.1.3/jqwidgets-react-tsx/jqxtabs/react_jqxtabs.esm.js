import * as jqxcore from '../../jqwidgets/jqxcore';
import * as jqxbuttons from '../../jqwidgets/jqxbuttons';
import * as jqxtabs from '../../jqwidgets/jqxtabs';
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

var JqxTabs = /** @class */ (function (_super) {
    __extends(JqxTabs, _super);
    function JqxTabs(props) {
        var _this = _super.call(this, props) || this;
        /* tslint:disable:variable-name */
        _this._jqx = JQXLite;
        _this._id = 'JqxTabs' + _this._jqx.generateID();
        _this._componentSelector = '#' + _this._id;
        _this.state = { lastProps: props };
        return _this;
    }
    JqxTabs.getDerivedStateFromProps = function (props, state) {
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
    JqxTabs.prototype.componentDidMount = function () {
        var widgetOptions = this._manageProps();
        this._jqx(this._componentSelector).jqxTabs(widgetOptions);
        this._wireEvents();
    };
    JqxTabs.prototype.componentDidUpdate = function () {
        var widgetOptions = this._manageProps();
        this.setOptions(widgetOptions);
        this._wireEvents();
    };
    JqxTabs.prototype.render = function () {
        return (createElement("div", { id: this._id, className: this.props.className, style: this.props.style }, this.props.children));
    };
    JqxTabs.prototype.setOptions = function (options) {
        this._jqx(this._componentSelector).jqxTabs(options);
    };
    JqxTabs.prototype.getOptions = function (option) {
        return this._jqx(this._componentSelector).jqxTabs(option);
    };
    JqxTabs.prototype.addAt = function (index, title, content) {
        this._jqx(this._componentSelector).jqxTabs('addAt', index, title, content);
    };
    JqxTabs.prototype.addFirst = function (htmlElement1, htmlElement2) {
        this._jqx(this._componentSelector).jqxTabs('addFirst', htmlElement1, htmlElement2);
    };
    JqxTabs.prototype.addLast = function (htmlElement1, htmlElement2) {
        this._jqx(this._componentSelector).jqxTabs('addLast', htmlElement1, htmlElement2);
    };
    JqxTabs.prototype.collapse = function () {
        this._jqx(this._componentSelector).jqxTabs('collapse');
    };
    JqxTabs.prototype.disable = function () {
        this._jqx(this._componentSelector).jqxTabs('disable');
    };
    JqxTabs.prototype.disableAt = function (index) {
        this._jqx(this._componentSelector).jqxTabs('disableAt', index);
    };
    JqxTabs.prototype.destroy = function () {
        this._jqx(this._componentSelector).jqxTabs('destroy');
    };
    JqxTabs.prototype.ensureVisible = function (index) {
        this._jqx(this._componentSelector).jqxTabs('ensureVisible', index);
    };
    JqxTabs.prototype.enableAt = function (index) {
        this._jqx(this._componentSelector).jqxTabs('enableAt', index);
    };
    JqxTabs.prototype.expand = function () {
        this._jqx(this._componentSelector).jqxTabs('expand');
    };
    JqxTabs.prototype.enable = function () {
        this._jqx(this._componentSelector).jqxTabs('enable');
    };
    JqxTabs.prototype.focus = function () {
        this._jqx(this._componentSelector).jqxTabs('focus');
    };
    JqxTabs.prototype.getTitleAt = function (index) {
        return this._jqx(this._componentSelector).jqxTabs('getTitleAt', index);
    };
    JqxTabs.prototype.getContentAt = function (index) {
        return this._jqx(this._componentSelector).jqxTabs('getContentAt', index);
    };
    JqxTabs.prototype.getDisabledTabsCount = function () {
        return this._jqx(this._componentSelector).jqxTabs('getDisabledTabsCount');
    };
    JqxTabs.prototype.hideCloseButtonAt = function (index) {
        this._jqx(this._componentSelector).jqxTabs('hideCloseButtonAt', index);
    };
    JqxTabs.prototype.hideAllCloseButtons = function () {
        this._jqx(this._componentSelector).jqxTabs('hideAllCloseButtons');
    };
    JqxTabs.prototype.length = function () {
        return this._jqx(this._componentSelector).jqxTabs('length');
    };
    JqxTabs.prototype.removeAt = function (index) {
        this._jqx(this._componentSelector).jqxTabs('removeAt', index);
    };
    JqxTabs.prototype.removeFirst = function () {
        this._jqx(this._componentSelector).jqxTabs('removeFirst');
    };
    JqxTabs.prototype.removeLast = function () {
        this._jqx(this._componentSelector).jqxTabs('removeLast');
    };
    JqxTabs.prototype.select = function (index) {
        this._jqx(this._componentSelector).jqxTabs('select', index);
    };
    JqxTabs.prototype.setContentAt = function (index, htmlElement) {
        this._jqx(this._componentSelector).jqxTabs('setContentAt', index, htmlElement);
    };
    JqxTabs.prototype.setTitleAt = function (index, htmlElement) {
        this._jqx(this._componentSelector).jqxTabs('setTitleAt', index, htmlElement);
    };
    JqxTabs.prototype.showCloseButtonAt = function (index) {
        this._jqx(this._componentSelector).jqxTabs('showCloseButtonAt', index);
    };
    JqxTabs.prototype.showAllCloseButtons = function () {
        this._jqx(this._componentSelector).jqxTabs('showAllCloseButtons');
    };
    JqxTabs.prototype.val = function (value) {
        if (value) {
            this._jqx(this._componentSelector).jqxTabs('val', value);
        }
        else {
            return this._jqx(this._componentSelector).jqxTabs('val');
        }
    };
    JqxTabs.prototype._manageProps = function () {
        var widgetProps = ['animationType', 'autoHeight', 'closeButtonSize', 'collapsible', 'contentTransitionDuration', 'disabled', 'enabledHover', 'enableScrollAnimation', 'enableDropAnimation', 'height', 'initTabContent', 'keyboardNavigation', 'next', 'previous', 'position', 'reorder', 'rtl', 'scrollAnimationDuration', 'selectedItem', 'selectionTracker', 'scrollable', 'scrollPosition', 'scrollStep', 'showCloseButtons', 'toggleMode', 'theme', 'width'];
        var options = {};
        for (var prop in this.props) {
            if (widgetProps.indexOf(prop) !== -1) {
                options[prop] = this.props[prop];
            }
        }
        return options;
    };
    JqxTabs.prototype._wireEvents = function () {
        for (var prop in this.props) {
            if (prop.indexOf('on') === 0) {
                var originalEventName = prop.slice(2);
                originalEventName = originalEventName.charAt(0).toLowerCase() + originalEventName.slice(1);
                this._jqx(this._componentSelector).off(originalEventName);
                this._jqx(this._componentSelector).on(originalEventName, this.props[prop]);
            }
        }
    };
    return JqxTabs;
}(PureComponent));
var jqx = window.jqx;
var JQXLite = window.JQXLite;

export default JqxTabs;
export { jqx, JQXLite };
