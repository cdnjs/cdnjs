(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@angular/common'), require('primeng/button'), require('primeng/api'), require('primeng/dom'), require('primeng/utils'), require('primeng/ripple')) :
    typeof define === 'function' && define.amd ? define('primeng/orderlist', ['exports', '@angular/core', '@angular/common', 'primeng/button', 'primeng/api', 'primeng/dom', 'primeng/utils', 'primeng/ripple'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory((global.primeng = global.primeng || {}, global.primeng.orderlist = {}), global.ng.core, global.ng.common, global.primeng.button, global.primeng.api, global.primeng.dom, global.primeng.utils, global.primeng.ripple));
}(this, (function (exports, core, common, button, api, dom, utils, ripple) { 'use strict';

    /*! *****************************************************************************
    Copyright (c) Microsoft Corporation.

    Permission to use, copy, modify, and/or distribute this software for any
    purpose with or without fee is hereby granted.

    THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
    REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
    AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
    INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
    LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
    OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
    PERFORMANCE OF THIS SOFTWARE.
    ***************************************************************************** */
    /* global Reflect, Promise */
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b)
                if (Object.prototype.hasOwnProperty.call(b, p))
                    d[p] = b[p]; };
        return extendStatics(d, b);
    };
    function __extends(d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    }
    var __assign = function () {
        __assign = Object.assign || function __assign(t) {
            for (var s, i = 1, n = arguments.length; i < n; i++) {
                s = arguments[i];
                for (var p in s)
                    if (Object.prototype.hasOwnProperty.call(s, p))
                        t[p] = s[p];
            }
            return t;
        };
        return __assign.apply(this, arguments);
    };
    function __rest(s, e) {
        var t = {};
        for (var p in s)
            if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
                t[p] = s[p];
        if (s != null && typeof Object.getOwnPropertySymbols === "function")
            for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
                if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                    t[p[i]] = s[p[i]];
            }
        return t;
    }
    function __decorate(decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
            r = Reflect.decorate(decorators, target, key, desc);
        else
            for (var i = decorators.length - 1; i >= 0; i--)
                if (d = decorators[i])
                    r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    }
    function __param(paramIndex, decorator) {
        return function (target, key) { decorator(target, key, paramIndex); };
    }
    function __metadata(metadataKey, metadataValue) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function")
            return Reflect.metadata(metadataKey, metadataValue);
    }
    function __awaiter(thisArg, _arguments, P, generator) {
        function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
        return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) { try {
                step(generator.next(value));
            }
            catch (e) {
                reject(e);
            } }
            function rejected(value) { try {
                step(generator["throw"](value));
            }
            catch (e) {
                reject(e);
            } }
            function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
            step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
    }
    function __generator(thisArg, body) {
        var _ = { label: 0, sent: function () { if (t[0] & 1)
                throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
        return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function () { return this; }), g;
        function verb(n) { return function (v) { return step([n, v]); }; }
        function step(op) {
            if (f)
                throw new TypeError("Generator is already executing.");
            while (_)
                try {
                    if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done)
                        return t;
                    if (y = 0, t)
                        op = [op[0] & 2, t.value];
                    switch (op[0]) {
                        case 0:
                        case 1:
                            t = op;
                            break;
                        case 4:
                            _.label++;
                            return { value: op[1], done: false };
                        case 5:
                            _.label++;
                            y = op[1];
                            op = [0];
                            continue;
                        case 7:
                            op = _.ops.pop();
                            _.trys.pop();
                            continue;
                        default:
                            if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
                                _ = 0;
                                continue;
                            }
                            if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) {
                                _.label = op[1];
                                break;
                            }
                            if (op[0] === 6 && _.label < t[1]) {
                                _.label = t[1];
                                t = op;
                                break;
                            }
                            if (t && _.label < t[2]) {
                                _.label = t[2];
                                _.ops.push(op);
                                break;
                            }
                            if (t[2])
                                _.ops.pop();
                            _.trys.pop();
                            continue;
                    }
                    op = body.call(thisArg, _);
                }
                catch (e) {
                    op = [6, e];
                    y = 0;
                }
                finally {
                    f = t = 0;
                }
            if (op[0] & 5)
                throw op[1];
            return { value: op[0] ? op[1] : void 0, done: true };
        }
    }
    var __createBinding = Object.create ? (function (o, m, k, k2) {
        if (k2 === undefined)
            k2 = k;
        Object.defineProperty(o, k2, { enumerable: true, get: function () { return m[k]; } });
    }) : (function (o, m, k, k2) {
        if (k2 === undefined)
            k2 = k;
        o[k2] = m[k];
    });
    function __exportStar(m, o) {
        for (var p in m)
            if (p !== "default" && !Object.prototype.hasOwnProperty.call(o, p))
                __createBinding(o, m, p);
    }
    function __values(o) {
        var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
        if (m)
            return m.call(o);
        if (o && typeof o.length === "number")
            return {
                next: function () {
                    if (o && i >= o.length)
                        o = void 0;
                    return { value: o && o[i++], done: !o };
                }
            };
        throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
    }
    function __read(o, n) {
        var m = typeof Symbol === "function" && o[Symbol.iterator];
        if (!m)
            return o;
        var i = m.call(o), r, ar = [], e;
        try {
            while ((n === void 0 || n-- > 0) && !(r = i.next()).done)
                ar.push(r.value);
        }
        catch (error) {
            e = { error: error };
        }
        finally {
            try {
                if (r && !r.done && (m = i["return"]))
                    m.call(i);
            }
            finally {
                if (e)
                    throw e.error;
            }
        }
        return ar;
    }
    /** @deprecated */
    function __spread() {
        for (var ar = [], i = 0; i < arguments.length; i++)
            ar = ar.concat(__read(arguments[i]));
        return ar;
    }
    /** @deprecated */
    function __spreadArrays() {
        for (var s = 0, i = 0, il = arguments.length; i < il; i++)
            s += arguments[i].length;
        for (var r = Array(s), k = 0, i = 0; i < il; i++)
            for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
                r[k] = a[j];
        return r;
    }
    function __spreadArray(to, from) {
        for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
            to[j] = from[i];
        return to;
    }
    function __await(v) {
        return this instanceof __await ? (this.v = v, this) : new __await(v);
    }
    function __asyncGenerator(thisArg, _arguments, generator) {
        if (!Symbol.asyncIterator)
            throw new TypeError("Symbol.asyncIterator is not defined.");
        var g = generator.apply(thisArg, _arguments || []), i, q = [];
        return i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i;
        function verb(n) { if (g[n])
            i[n] = function (v) { return new Promise(function (a, b) { q.push([n, v, a, b]) > 1 || resume(n, v); }); }; }
        function resume(n, v) { try {
            step(g[n](v));
        }
        catch (e) {
            settle(q[0][3], e);
        } }
        function step(r) { r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r); }
        function fulfill(value) { resume("next", value); }
        function reject(value) { resume("throw", value); }
        function settle(f, v) { if (f(v), q.shift(), q.length)
            resume(q[0][0], q[0][1]); }
    }
    function __asyncDelegator(o) {
        var i, p;
        return i = {}, verb("next"), verb("throw", function (e) { throw e; }), verb("return"), i[Symbol.iterator] = function () { return this; }, i;
        function verb(n, f) { i[n] = o[n] ? function (v) { return (p = !p) ? { value: __await(o[n](v)), done: n === "return" } : f ? f(v) : v; } : f; }
    }
    function __asyncValues(o) {
        if (!Symbol.asyncIterator)
            throw new TypeError("Symbol.asyncIterator is not defined.");
        var m = o[Symbol.asyncIterator], i;
        return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
        function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
        function settle(resolve, reject, d, v) { Promise.resolve(v).then(function (v) { resolve({ value: v, done: d }); }, reject); }
    }
    function __makeTemplateObject(cooked, raw) {
        if (Object.defineProperty) {
            Object.defineProperty(cooked, "raw", { value: raw });
        }
        else {
            cooked.raw = raw;
        }
        return cooked;
    }
    ;
    var __setModuleDefault = Object.create ? (function (o, v) {
        Object.defineProperty(o, "default", { enumerable: true, value: v });
    }) : function (o, v) {
        o["default"] = v;
    };
    function __importStar(mod) {
        if (mod && mod.__esModule)
            return mod;
        var result = {};
        if (mod != null)
            for (var k in mod)
                if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k))
                    __createBinding(result, mod, k);
        __setModuleDefault(result, mod);
        return result;
    }
    function __importDefault(mod) {
        return (mod && mod.__esModule) ? mod : { default: mod };
    }
    function __classPrivateFieldGet(receiver, privateMap) {
        if (!privateMap.has(receiver)) {
            throw new TypeError("attempted to get private field on non-instance");
        }
        return privateMap.get(receiver);
    }
    function __classPrivateFieldSet(receiver, privateMap, value) {
        if (!privateMap.has(receiver)) {
            throw new TypeError("attempted to set private field on non-instance");
        }
        privateMap.set(receiver, value);
        return value;
    }

    var OrderList = /** @class */ (function () {
        function OrderList(el, cd, filterService) {
            this.el = el;
            this.cd = cd;
            this.filterService = filterService;
            this.metaKeySelection = true;
            this.controlsPosition = 'left';
            this.filterMatchMode = "contains";
            this.selectionChange = new core.EventEmitter();
            this.trackBy = function (index, item) { return item; };
            this.onReorder = new core.EventEmitter();
            this.onSelectionChange = new core.EventEmitter();
            this.onFilterEvent = new core.EventEmitter();
        }
        Object.defineProperty(OrderList.prototype, "selection", {
            get: function () {
                return this._selection;
            },
            set: function (val) {
                this._selection = val;
            },
            enumerable: false,
            configurable: true
        });
        OrderList.prototype.ngAfterContentInit = function () {
            var _this = this;
            this.templates.forEach(function (item) {
                switch (item.getType()) {
                    case 'item':
                        _this.itemTemplate = item.template;
                        break;
                    default:
                        _this.itemTemplate = item.template;
                        break;
                }
            });
        };
        OrderList.prototype.ngAfterViewChecked = function () {
            if (this.movedUp || this.movedDown) {
                var listItems = dom.DomHandler.find(this.listViewChild.nativeElement, 'li.p-highlight');
                var listItem = void 0;
                if (listItems.length > 0) {
                    if (this.movedUp)
                        listItem = listItems[0];
                    else
                        listItem = listItems[listItems.length - 1];
                    dom.DomHandler.scrollInView(this.listViewChild.nativeElement, listItem);
                }
                this.movedUp = false;
                this.movedDown = false;
            }
        };
        Object.defineProperty(OrderList.prototype, "value", {
            get: function () {
                return this._value;
            },
            set: function (val) {
                this._value = val;
                if (this.filterValue) {
                    this.filter();
                }
            },
            enumerable: false,
            configurable: true
        });
        OrderList.prototype.onItemClick = function (event, item, index) {
            this.itemTouched = false;
            var selectedIndex = utils.ObjectUtils.findIndexInList(item, this.selection);
            var selected = (selectedIndex != -1);
            var metaSelection = this.itemTouched ? false : this.metaKeySelection;
            if (metaSelection) {
                var metaKey = (event.metaKey || event.ctrlKey || event.shiftKey);
                if (selected && metaKey) {
                    this._selection = this._selection.filter(function (val, index) { return index !== selectedIndex; });
                }
                else {
                    this._selection = (metaKey) ? this._selection ? __spread(this._selection) : [] : [];
                    utils.ObjectUtils.insertIntoOrderedArray(item, index, this._selection, this.value);
                }
            }
            else {
                if (selected) {
                    this._selection = this._selection.filter(function (val, index) { return index !== selectedIndex; });
                }
                else {
                    this._selection = this._selection ? __spread(this._selection) : [];
                    utils.ObjectUtils.insertIntoOrderedArray(item, index, this._selection, this.value);
                }
            }
            //binding
            this.selectionChange.emit(this._selection);
            //event
            this.onSelectionChange.emit({ originalEvent: event, value: this._selection });
        };
        OrderList.prototype.onFilterKeyup = function (event) {
            this.filterValue = event.target.value.trim().toLocaleLowerCase(this.filterLocale);
            this.filter();
            this.onFilterEvent.emit({
                originalEvent: event,
                value: this.visibleOptions
            });
        };
        OrderList.prototype.filter = function () {
            var searchFields = this.filterBy.split(',');
            this.visibleOptions = this.filterService.filter(this.value, searchFields, this.filterValue, this.filterMatchMode, this.filterLocale);
        };
        OrderList.prototype.isItemVisible = function (item) {
            if (this.filterValue && this.filterValue.trim().length) {
                for (var i = 0; i < this.visibleOptions.length; i++) {
                    if (item == this.visibleOptions[i]) {
                        return true;
                    }
                }
            }
            else {
                return true;
            }
        };
        OrderList.prototype.onItemTouchEnd = function (event) {
            this.itemTouched = true;
        };
        OrderList.prototype.isSelected = function (item) {
            return utils.ObjectUtils.findIndexInList(item, this.selection) != -1;
        };
        OrderList.prototype.moveUp = function (event) {
            if (this.selection) {
                for (var i = 0; i < this.selection.length; i++) {
                    var selectedItem = this.selection[i];
                    var selectedItemIndex = utils.ObjectUtils.findIndexInList(selectedItem, this.value);
                    if (selectedItemIndex != 0) {
                        var movedItem = this.value[selectedItemIndex];
                        var temp = this.value[selectedItemIndex - 1];
                        this.value[selectedItemIndex - 1] = movedItem;
                        this.value[selectedItemIndex] = temp;
                    }
                    else {
                        break;
                    }
                }
                this.movedUp = true;
                this.onReorder.emit(event);
            }
        };
        OrderList.prototype.moveTop = function (event) {
            if (this.selection) {
                for (var i = this.selection.length - 1; i >= 0; i--) {
                    var selectedItem = this.selection[i];
                    var selectedItemIndex = utils.ObjectUtils.findIndexInList(selectedItem, this.value);
                    if (selectedItemIndex != 0) {
                        var movedItem = this.value.splice(selectedItemIndex, 1)[0];
                        this.value.unshift(movedItem);
                    }
                    else {
                        break;
                    }
                }
                this.onReorder.emit(event);
                this.listViewChild.nativeElement.scrollTop = 0;
            }
        };
        OrderList.prototype.moveDown = function (event) {
            if (this.selection) {
                for (var i = this.selection.length - 1; i >= 0; i--) {
                    var selectedItem = this.selection[i];
                    var selectedItemIndex = utils.ObjectUtils.findIndexInList(selectedItem, this.value);
                    if (selectedItemIndex != (this.value.length - 1)) {
                        var movedItem = this.value[selectedItemIndex];
                        var temp = this.value[selectedItemIndex + 1];
                        this.value[selectedItemIndex + 1] = movedItem;
                        this.value[selectedItemIndex] = temp;
                    }
                    else {
                        break;
                    }
                }
                this.movedDown = true;
                this.onReorder.emit(event);
            }
        };
        OrderList.prototype.moveBottom = function (event) {
            if (this.selection) {
                for (var i = 0; i < this.selection.length; i++) {
                    var selectedItem = this.selection[i];
                    var selectedItemIndex = utils.ObjectUtils.findIndexInList(selectedItem, this.value);
                    if (selectedItemIndex != (this.value.length - 1)) {
                        var movedItem = this.value.splice(selectedItemIndex, 1)[0];
                        this.value.push(movedItem);
                    }
                    else {
                        break;
                    }
                }
                this.onReorder.emit(event);
                this.listViewChild.nativeElement.scrollTop = this.listViewChild.nativeElement.scrollHeight;
            }
        };
        OrderList.prototype.onDragStart = function (event, index) {
            event.dataTransfer.setData('text', 'b'); // For firefox
            event.target.blur();
            this.dragging = true;
            this.draggedItemIndex = index;
        };
        OrderList.prototype.onDragOver = function (event, index) {
            if (this.dragging && this.draggedItemIndex !== index && this.draggedItemIndex + 1 !== index) {
                this.dragOverItemIndex = index;
                event.preventDefault();
            }
        };
        OrderList.prototype.onDragLeave = function (event) {
            this.dragOverItemIndex = null;
        };
        OrderList.prototype.onDrop = function (event, index) {
            var dropIndex = (this.draggedItemIndex > index) ? index : (index === 0) ? 0 : index - 1;
            utils.ObjectUtils.reorderArray(this.value, this.draggedItemIndex, dropIndex);
            this.dragOverItemIndex = null;
            this.onReorder.emit(event);
            event.preventDefault();
        };
        OrderList.prototype.onDragEnd = function (event) {
            this.dragging = false;
        };
        OrderList.prototype.onListMouseMove = function (event) {
            if (this.dragging) {
                var offsetY = this.listViewChild.nativeElement.getBoundingClientRect().top + document.body.scrollTop;
                var bottomDiff = (offsetY + this.listViewChild.nativeElement.clientHeight) - event.pageY;
                var topDiff = (event.pageY - offsetY);
                if (bottomDiff < 25 && bottomDiff > 0)
                    this.listViewChild.nativeElement.scrollTop += 15;
                else if (topDiff < 25 && topDiff > 0)
                    this.listViewChild.nativeElement.scrollTop -= 15;
            }
        };
        OrderList.prototype.onItemKeydown = function (event, item, index) {
            var listItem = event.currentTarget;
            switch (event.which) {
                //down
                case 40:
                    var nextItem = this.findNextItem(listItem);
                    if (nextItem) {
                        nextItem.focus();
                    }
                    event.preventDefault();
                    break;
                //up
                case 38:
                    var prevItem = this.findPrevItem(listItem);
                    if (prevItem) {
                        prevItem.focus();
                    }
                    event.preventDefault();
                    break;
                //enter
                case 13:
                    this.onItemClick(event, item, index);
                    event.preventDefault();
                    break;
            }
        };
        OrderList.prototype.findNextItem = function (item) {
            var nextItem = item.nextElementSibling;
            if (nextItem)
                return !dom.DomHandler.hasClass(nextItem, 'p-orderlist-item') || dom.DomHandler.isHidden(nextItem) ? this.findNextItem(nextItem) : nextItem;
            else
                return null;
        };
        OrderList.prototype.findPrevItem = function (item) {
            var prevItem = item.previousElementSibling;
            if (prevItem)
                return !dom.DomHandler.hasClass(prevItem, 'p-orderlist-item') || dom.DomHandler.isHidden(prevItem) ? this.findPrevItem(prevItem) : prevItem;
            else
                return null;
        };
        return OrderList;
    }());
    OrderList.decorators = [
        { type: core.Component, args: [{
                    selector: 'p-orderList',
                    template: "\n        <div [ngClass]=\"{'p-orderlist p-component': true, 'p-orderlist-controls-left': controlsPosition === 'left',\n                    'p-orderlist-controls-right': controlsPosition === 'right'}\" [ngStyle]=\"style\" [class]=\"styleClass\">\n            <div class=\"p-orderlist-controls\">\n                <button type=\"button\" pButton pRipple icon=\"pi pi-angle-up\" (click)=\"moveUp($event)\"></button>\n                <button type=\"button\" pButton pRipple icon=\"pi pi-angle-double-up\" (click)=\"moveTop($event)\"></button>\n                <button type=\"button\" pButton pRipple icon=\"pi pi-angle-down\" (click)=\"moveDown($event)\"></button>\n                <button type=\"button\" pButton pRipple icon=\"pi pi-angle-double-down\" (click)=\"moveBottom($event)\"></button>\n            </div>\n            <div class=\"p-orderlist-list-container\">\n                <div class=\"p-orderlist-header\" *ngIf=\"header\">\n                    <div class=\"p-orderlist-title\">{{header}}</div>\n                </div>\n                <div class=\"p-orderlist-filter-container\" *ngIf=\"filterBy\">\n                    <div class=\"p-orderlist-filter\">\n                        <input type=\"text\" role=\"textbox\" (keyup)=\"onFilterKeyup($event)\" class=\"p-orderlist-filter-input p-inputtext p-component\" [attr.placeholder]=\"filterPlaceholder\" [attr.aria-label]=\"ariaFilterLabel\">\n                        <span class=\"p-orderlist-filter-icon pi pi-search\"></span>\n                    </div>\n                </div>\n                <ul #listelement class=\"p-orderlist-list\" [ngStyle]=\"listStyle\" (dragover)=\"onListMouseMove($event)\">\n                    <ng-template ngFor [ngForTrackBy]=\"trackBy\" let-item [ngForOf]=\"value\" let-i=\"index\" let-l=\"last\">\n                        <li class=\"p-orderlist-droppoint\" *ngIf=\"dragdrop && isItemVisible(item)\" (dragover)=\"onDragOver($event, i)\" (drop)=\"onDrop($event, i)\" (dragleave)=\"onDragLeave($event)\"\n                            [ngClass]=\"{'p-orderlist-droppoint-highlight': (i === dragOverItemIndex)}\"></li>\n                        <li class=\"p-orderlist-item\" tabindex=\"0\" [ngClass]=\"{'p-highlight':isSelected(item)}\" pRipple\n                            (click)=\"onItemClick($event,item,i)\" (touchend)=\"onItemTouchEnd($event)\" (keydown)=\"onItemKeydown($event,item,i)\"\n                            [style.display]=\"isItemVisible(item) ? 'block' : 'none'\" role=\"option\" [attr.aria-selected]=\"isSelected(item)\"\n                            [attr.draggable]=\"dragdrop\" (dragstart)=\"onDragStart($event, i)\" (dragend)=\"onDragEnd($event)\">\n                            <ng-container *ngTemplateOutlet=\"itemTemplate; context: {$implicit: item, index: i}\"></ng-container>\n                        </li>\n                        <li class=\"p-orderlist-droppoint\" *ngIf=\"dragdrop && l\" (dragover)=\"onDragOver($event, i + 1)\" (drop)=\"onDrop($event, i + 1)\" (dragleave)=\"onDragLeave($event)\"\n                            [ngClass]=\"{'p-orderlist-droppoint-highlight': (i + 1 === dragOverItemIndex)}\"></li>\n                    </ng-template>\n                </ul>\n            </div>\n        </div>\n    ",
                    changeDetection: core.ChangeDetectionStrategy.OnPush,
                    encapsulation: core.ViewEncapsulation.None,
                    styles: [".p-orderlist{display:flex}.p-orderlist-controls{display:flex;flex-direction:column;justify-content:center}.p-orderlist-list-container{flex:1 1 auto}.p-orderlist-list{list-style-type:none;margin:0;max-height:24rem;min-height:12rem;overflow:auto;padding:0}.p-orderlist-item{cursor:pointer;overflow:hidden;position:relative}.p-orderlist-item[draggable=true]{cursor:move}.p-orderlist.p-state-disabled .p-button,.p-orderlist.p-state-disabled .p-orderlist-item{cursor:default}.p-orderlist.p-state-disabled .p-orderlist-list{overflow:hidden}.p-orderlist-filter{position:relative}.p-orderlist-filter-icon{margin-top:-.5rem;position:absolute;top:50%}.p-orderlist-filter-input{width:100%}.p-orderlist-controls-right .p-orderlist-controls{order:2}.p-orderlist-controls-right .p-orderlist-list-container{order:1}.p-orderlist-droppoint{height:6px}"]
                },] }
    ];
    OrderList.ctorParameters = function () { return [
        { type: core.ElementRef },
        { type: core.ChangeDetectorRef },
        { type: api.FilterService }
    ]; };
    OrderList.propDecorators = {
        header: [{ type: core.Input }],
        style: [{ type: core.Input }],
        styleClass: [{ type: core.Input }],
        listStyle: [{ type: core.Input }],
        responsive: [{ type: core.Input }],
        filterBy: [{ type: core.Input }],
        filterPlaceholder: [{ type: core.Input }],
        filterLocale: [{ type: core.Input }],
        metaKeySelection: [{ type: core.Input }],
        dragdrop: [{ type: core.Input }],
        controlsPosition: [{ type: core.Input }],
        ariaFilterLabel: [{ type: core.Input }],
        filterMatchMode: [{ type: core.Input }],
        selectionChange: [{ type: core.Output }],
        trackBy: [{ type: core.Input }],
        onReorder: [{ type: core.Output }],
        onSelectionChange: [{ type: core.Output }],
        onFilterEvent: [{ type: core.Output }],
        listViewChild: [{ type: core.ViewChild, args: ['listelement',] }],
        templates: [{ type: core.ContentChildren, args: [api.PrimeTemplate,] }],
        selection: [{ type: core.Input }],
        value: [{ type: core.Input }]
    };
    var OrderListModule = /** @class */ (function () {
        function OrderListModule() {
        }
        return OrderListModule;
    }());
    OrderListModule.decorators = [
        { type: core.NgModule, args: [{
                    imports: [common.CommonModule, button.ButtonModule, api.SharedModule, ripple.RippleModule],
                    exports: [OrderList, api.SharedModule],
                    declarations: [OrderList]
                },] }
    ];

    /**
     * Generated bundle index. Do not edit.
     */

    exports.OrderList = OrderList;
    exports.OrderListModule = OrderListModule;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=primeng-orderlist.umd.js.map
