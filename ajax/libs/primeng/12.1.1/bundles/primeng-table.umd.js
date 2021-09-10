(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@angular/common'), require('@angular/forms'), require('primeng/api'), require('primeng/paginator'), require('primeng/inputtext'), require('primeng/button'), require('primeng/selectbutton'), require('primeng/tristatecheckbox'), require('primeng/calendar'), require('primeng/inputnumber'), require('primeng/dropdown'), require('primeng/dom'), require('primeng/utils'), require('rxjs'), require('@angular/cdk/scrolling'), require('@angular/animations')) :
    typeof define === 'function' && define.amd ? define('primeng/table', ['exports', '@angular/core', '@angular/common', '@angular/forms', 'primeng/api', 'primeng/paginator', 'primeng/inputtext', 'primeng/button', 'primeng/selectbutton', 'primeng/tristatecheckbox', 'primeng/calendar', 'primeng/inputnumber', 'primeng/dropdown', 'primeng/dom', 'primeng/utils', 'rxjs', '@angular/cdk/scrolling', '@angular/animations'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory((global.primeng = global.primeng || {}, global.primeng.table = {}), global.ng.core, global.ng.common, global.ng.forms, global.primeng.api, global.primeng.paginator, global.primeng.inputtext, global.primeng.button, global.primeng.selectbutton, global.primeng.tristatecheckbox, global.primeng.calendar, global.primeng.inputnumber, global.primeng.dropdown, global.primeng.dom, global.primeng.utils, global.rxjs, global.ng.cdk.scrolling, global.ng.animations));
}(this, (function (exports, i0, i4, i9, i1, i2, i8, i11, selectbutton, i6, i7, i5, i10, dom, utils, rxjs, i3, animations) { 'use strict';

    function _interopNamespace(e) {
        if (e && e.__esModule) return e;
        var n = Object.create(null);
        if (e) {
            Object.keys(e).forEach(function (k) {
                if (k !== 'default') {
                    var d = Object.getOwnPropertyDescriptor(e, k);
                    Object.defineProperty(n, k, d.get ? d : {
                        enumerable: true,
                        get: function () {
                            return e[k];
                        }
                    });
                }
            });
        }
        n['default'] = e;
        return Object.freeze(n);
    }

    var i0__namespace = /*#__PURE__*/_interopNamespace(i0);
    var i4__namespace = /*#__PURE__*/_interopNamespace(i4);
    var i9__namespace = /*#__PURE__*/_interopNamespace(i9);
    var i1__namespace = /*#__PURE__*/_interopNamespace(i1);
    var i2__namespace = /*#__PURE__*/_interopNamespace(i2);
    var i8__namespace = /*#__PURE__*/_interopNamespace(i8);
    var i11__namespace = /*#__PURE__*/_interopNamespace(i11);
    var i6__namespace = /*#__PURE__*/_interopNamespace(i6);
    var i7__namespace = /*#__PURE__*/_interopNamespace(i7);
    var i5__namespace = /*#__PURE__*/_interopNamespace(i5);
    var i10__namespace = /*#__PURE__*/_interopNamespace(i10);
    var i3__namespace = /*#__PURE__*/_interopNamespace(i3);

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
    function __spreadArray(to, from, pack) {
        if (pack || arguments.length === 2)
            for (var i = 0, l = from.length, ar; i < l; i++) {
                if (ar || !(i in from)) {
                    if (!ar)
                        ar = Array.prototype.slice.call(from, 0, i);
                    ar[i] = from[i];
                }
            }
        return to.concat(ar || from);
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
    function __classPrivateFieldGet(receiver, state, kind, f) {
        if (kind === "a" && !f)
            throw new TypeError("Private accessor was defined without a getter");
        if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver))
            throw new TypeError("Cannot read private member from an object whose class did not declare it");
        return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
    }
    function __classPrivateFieldSet(receiver, state, value, kind, f) {
        if (kind === "m")
            throw new TypeError("Private method is not writable");
        if (kind === "a" && !f)
            throw new TypeError("Private accessor was defined without a setter");
        if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver))
            throw new TypeError("Cannot write private member to an object whose class did not declare it");
        return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
    }

    var TableService = /** @class */ (function () {
        function TableService() {
            this.sortSource = new rxjs.Subject();
            this.selectionSource = new rxjs.Subject();
            this.contextMenuSource = new rxjs.Subject();
            this.valueSource = new rxjs.Subject();
            this.totalRecordsSource = new rxjs.Subject();
            this.columnsSource = new rxjs.Subject();
            this.resetSource = new rxjs.Subject();
            this.sortSource$ = this.sortSource.asObservable();
            this.selectionSource$ = this.selectionSource.asObservable();
            this.contextMenuSource$ = this.contextMenuSource.asObservable();
            this.valueSource$ = this.valueSource.asObservable();
            this.totalRecordsSource$ = this.totalRecordsSource.asObservable();
            this.columnsSource$ = this.columnsSource.asObservable();
            this.resetSource$ = this.resetSource.asObservable();
        }
        TableService.prototype.onSort = function (sortMeta) {
            this.sortSource.next(sortMeta);
        };
        TableService.prototype.onSelectionChange = function () {
            this.selectionSource.next();
        };
        TableService.prototype.onResetChange = function () {
            this.resetSource.next();
        };
        TableService.prototype.onContextMenu = function (data) {
            this.contextMenuSource.next(data);
        };
        TableService.prototype.onValueChange = function (value) {
            this.valueSource.next(value);
        };
        TableService.prototype.onTotalRecordsChange = function (value) {
            this.totalRecordsSource.next(value);
        };
        TableService.prototype.onColumnsChange = function (columns) {
            this.columnsSource.next(columns);
        };
        return TableService;
    }());
    TableService.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0__namespace, type: TableService, deps: [], target: i0__namespace.ɵɵFactoryTarget.Injectable });
    TableService.ɵprov = i0__namespace.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0__namespace, type: TableService });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0__namespace, type: TableService, decorators: [{
                type: i0.Injectable
            }] });
    var Table = /** @class */ (function () {
        function Table(el, zone, tableService, cd, filterService, overlayService) {
            this.el = el;
            this.zone = zone;
            this.tableService = tableService;
            this.cd = cd;
            this.filterService = filterService;
            this.overlayService = overlayService;
            this.pageLinks = 5;
            this.alwaysShowPaginator = true;
            this.paginatorPosition = 'bottom';
            this.paginatorDropdownScrollHeight = '200px';
            this.currentPageReportTemplate = '{currentPage} of {totalPages}';
            this.showFirstLastIcon = true;
            this.showPageLinks = true;
            this.defaultSortOrder = 1;
            this.sortMode = 'single';
            this.resetPageOnSort = true;
            this.selectionChange = new i0.EventEmitter();
            this.contextMenuSelectionChange = new i0.EventEmitter();
            this.contextMenuSelectionMode = "separate";
            this.rowTrackBy = function (index, item) { return item; };
            this.lazy = false;
            this.lazyLoadOnInit = true;
            this.compareSelectionBy = 'deepEquals';
            this.csvSeparator = ',';
            this.exportFilename = 'download';
            this.filters = {};
            this.filterDelay = 300;
            this.expandedRowKeys = {};
            this.editingRowKeys = {};
            this.rowExpandMode = 'multiple';
            this.scrollDirection = "vertical";
            this.virtualScrollDelay = 250;
            this.virtualRowHeight = 28;
            this.columnResizeMode = 'fit';
            this.loadingIcon = 'pi pi-spinner';
            this.showLoader = true;
            this.showInitialSortBadge = true;
            this.stateStorage = 'session';
            this.editMode = 'cell';
            this.responsiveLayout = 'stack';
            this.breakpoint = '960px';
            this.onRowSelect = new i0.EventEmitter();
            this.onRowUnselect = new i0.EventEmitter();
            this.onPage = new i0.EventEmitter();
            this.onSort = new i0.EventEmitter();
            this.onFilter = new i0.EventEmitter();
            this.onLazyLoad = new i0.EventEmitter();
            this.onRowExpand = new i0.EventEmitter();
            this.onRowCollapse = new i0.EventEmitter();
            this.onContextMenuSelect = new i0.EventEmitter();
            this.onColResize = new i0.EventEmitter();
            this.onColReorder = new i0.EventEmitter();
            this.onRowReorder = new i0.EventEmitter();
            this.onEditInit = new i0.EventEmitter();
            this.onEditComplete = new i0.EventEmitter();
            this.onEditCancel = new i0.EventEmitter();
            this.onHeaderCheckboxToggle = new i0.EventEmitter();
            this.sortFunction = new i0.EventEmitter();
            this.firstChange = new i0.EventEmitter();
            this.rowsChange = new i0.EventEmitter();
            this.onStateSave = new i0.EventEmitter();
            this.onStateRestore = new i0.EventEmitter();
            this._value = [];
            this._totalRecords = 0;
            this._first = 0;
            this.selectionKeys = {};
            this._sortOrder = 1;
            this.columnResizing = false;
            this.rowGroupHeaderStyleObject = {};
            this.id = utils.UniqueComponentId();
        }
        Table.prototype.ngOnInit = function () {
            if (this.lazy && this.lazyLoadOnInit) {
                if (!this.virtualScroll) {
                    this.onLazyLoad.emit(this.createLazyLoadMetadata());
                }
                if (this.restoringFilter) {
                    this.restoringFilter = false;
                }
            }
            if (this.responsiveLayout === 'stack' && !this.scrollable) {
                this.createResponsiveStyle();
            }
            this.initialized = true;
        };
        Table.prototype.ngAfterContentInit = function () {
            var _this = this;
            this.templates.forEach(function (item) {
                switch (item.getType()) {
                    case 'caption':
                        _this.captionTemplate = item.template;
                        break;
                    case 'header':
                        _this.headerTemplate = item.template;
                        break;
                    case 'headergrouped':
                        _this.headerGroupedTemplate = item.template;
                        break;
                    case 'body':
                        _this.bodyTemplate = item.template;
                        break;
                    case 'loadingbody':
                        _this.loadingBodyTemplate = item.template;
                        break;
                    case 'footer':
                        _this.footerTemplate = item.template;
                        break;
                    case 'footergrouped':
                        _this.footerGroupedTemplate = item.template;
                        break;
                    case 'summary':
                        _this.summaryTemplate = item.template;
                        break;
                    case 'colgroup':
                        _this.colGroupTemplate = item.template;
                        break;
                    case 'rowexpansion':
                        _this.expandedRowTemplate = item.template;
                        break;
                    case 'groupheader':
                        _this.groupHeaderTemplate = item.template;
                        break;
                    case 'rowspan':
                        _this.rowspanTemplate = item.template;
                        break;
                    case 'groupfooter':
                        _this.groupFooterTemplate = item.template;
                        break;
                    case 'frozenrows':
                        _this.frozenRowsTemplate = item.template;
                        break;
                    case 'frozenheader':
                        _this.frozenHeaderTemplate = item.template;
                        break;
                    case 'frozenbody':
                        _this.frozenBodyTemplate = item.template;
                        break;
                    case 'frozenfooter':
                        _this.frozenFooterTemplate = item.template;
                        break;
                    case 'frozencolgroup':
                        _this.frozenColGroupTemplate = item.template;
                        break;
                    case 'frozenrowexpansion':
                        _this.frozenExpandedRowTemplate = item.template;
                        break;
                    case 'emptymessage':
                        _this.emptyMessageTemplate = item.template;
                        break;
                    case 'paginatorleft':
                        _this.paginatorLeftTemplate = item.template;
                        break;
                    case 'paginatorright':
                        _this.paginatorRightTemplate = item.template;
                        break;
                    case 'paginatordropdownitem':
                        _this.paginatorDropdownItemTemplate = item.template;
                        break;
                }
            });
        };
        Table.prototype.ngAfterViewInit = function () {
            var _this = this;
            if (this.isStateful() && this.resizableColumns) {
                this.restoreColumnWidths();
            }
            if (this.scrollable && (this.scrollDirection !== 'vertical' || this.rowGroupMode === 'subheader')) {
                this.updateScrollWidth();
            }
            if (this.scrollable && this.virtualScroll) {
                this.virtualScrollSubscription = this.virtualScrollBody.renderedRangeStream.subscribe(function (range) {
                    var top = range.start * _this.virtualRowHeight * -1;
                    _this.tableHeaderViewChild.nativeElement.style.top = top + 'px';
                });
            }
        };
        Table.prototype.ngOnChanges = function (simpleChange) {
            if (simpleChange.value) {
                if (this.isStateful() && !this.stateRestored) {
                    this.restoreState();
                }
                this._value = simpleChange.value.currentValue;
                if (!this.lazy) {
                    this.totalRecords = (this._value ? this._value.length : 0);
                    if (this.sortMode == 'single' && this.sortField)
                        this.sortSingle();
                    else if (this.sortMode == 'multiple' && this.multiSortMeta)
                        this.sortMultiple();
                    else if (this.hasFilter()) //sort already filters
                        this._filter();
                }
                this.tableService.onValueChange(simpleChange.value.currentValue);
                if (this.scrollable && (this.scrollDirection !== 'vertical' || this.rowGroupMode === 'subheader')) {
                    this.updateScrollWidth();
                }
            }
            if (simpleChange.columns) {
                this._columns = simpleChange.columns.currentValue;
                this.tableService.onColumnsChange(simpleChange.columns.currentValue);
                if (this._columns && this.isStateful() && this.reorderableColumns && !this.columnOrderStateRestored) {
                    this.restoreColumnOrder();
                }
                if (this.scrollable && (this.scrollDirection !== 'vertical' || this.rowGroupMode === 'subheader')) {
                    this.updateScrollWidth();
                }
            }
            if (simpleChange.sortField) {
                this._sortField = simpleChange.sortField.currentValue;
                //avoid triggering lazy load prior to lazy initialization at onInit
                if (!this.lazy || this.initialized) {
                    if (this.sortMode === 'single') {
                        this.sortSingle();
                    }
                }
            }
            if (simpleChange.sortOrder) {
                this._sortOrder = simpleChange.sortOrder.currentValue;
                //avoid triggering lazy load prior to lazy initialization at onInit
                if (!this.lazy || this.initialized) {
                    if (this.sortMode === 'single') {
                        this.sortSingle();
                    }
                }
            }
            if (simpleChange.multiSortMeta) {
                this._multiSortMeta = simpleChange.multiSortMeta.currentValue;
                if (this.sortMode === 'multiple' && (this.initialized || (!this.lazy && !this.virtualScroll))) {
                    this.sortMultiple();
                }
            }
            if (simpleChange.selection) {
                this._selection = simpleChange.selection.currentValue;
                if (!this.preventSelectionSetterPropagation) {
                    this.updateSelectionKeys();
                    this.tableService.onSelectionChange();
                }
                this.preventSelectionSetterPropagation = false;
            }
        };
        Object.defineProperty(Table.prototype, "value", {
            get: function () {
                return this._value;
            },
            set: function (val) {
                this._value = val;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Table.prototype, "columns", {
            get: function () {
                return this._columns;
            },
            set: function (cols) {
                this._columns = cols;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Table.prototype, "first", {
            get: function () {
                return this._first;
            },
            set: function (val) {
                this._first = val;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Table.prototype, "rows", {
            get: function () {
                return this._rows;
            },
            set: function (val) {
                this._rows = val;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Table.prototype, "totalRecords", {
            get: function () {
                return this._totalRecords;
            },
            set: function (val) {
                this._totalRecords = val;
                this.tableService.onTotalRecordsChange(this._totalRecords);
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Table.prototype, "sortField", {
            get: function () {
                return this._sortField;
            },
            set: function (val) {
                this._sortField = val;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Table.prototype, "sortOrder", {
            get: function () {
                return this._sortOrder;
            },
            set: function (val) {
                this._sortOrder = val;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Table.prototype, "multiSortMeta", {
            get: function () {
                return this._multiSortMeta;
            },
            set: function (val) {
                this._multiSortMeta = val;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Table.prototype, "selection", {
            get: function () {
                return this._selection;
            },
            set: function (val) {
                this._selection = val;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Table.prototype, "dataToRender", {
            get: function () {
                var data = this.filteredValue || this.value;
                return data ? ((this.paginator && !this.lazy) ? (data.slice(this.first, this.first + this.rows)) : data) : [];
            },
            enumerable: false,
            configurable: true
        });
        Table.prototype.updateSelectionKeys = function () {
            var e_1, _b;
            if (this.dataKey && this._selection) {
                this.selectionKeys = {};
                if (Array.isArray(this._selection)) {
                    try {
                        for (var _c = __values(this._selection), _d = _c.next(); !_d.done; _d = _c.next()) {
                            var data = _d.value;
                            this.selectionKeys[String(utils.ObjectUtils.resolveFieldData(data, this.dataKey))] = 1;
                        }
                    }
                    catch (e_1_1) { e_1 = { error: e_1_1 }; }
                    finally {
                        try {
                            if (_d && !_d.done && (_b = _c.return)) _b.call(_c);
                        }
                        finally { if (e_1) throw e_1.error; }
                    }
                }
                else {
                    this.selectionKeys[String(utils.ObjectUtils.resolveFieldData(this._selection, this.dataKey))] = 1;
                }
            }
        };
        Table.prototype.onPageChange = function (event) {
            this.first = event.first;
            this.rows = event.rows;
            if (this.lazy) {
                this.onLazyLoad.emit(this.createLazyLoadMetadata());
            }
            this.onPage.emit({
                first: this.first,
                rows: this.rows
            });
            this.firstChange.emit(this.first);
            this.rowsChange.emit(this.rows);
            this.tableService.onValueChange(this.value);
            if (this.isStateful()) {
                this.saveState();
            }
            this.anchorRowIndex = null;
            if (this.scrollable) {
                this.resetScrollTop();
            }
        };
        Table.prototype.sort = function (event) {
            var originalEvent = event.originalEvent;
            if (this.sortMode === 'single') {
                this._sortOrder = (this.sortField === event.field) ? this.sortOrder * -1 : this.defaultSortOrder;
                this._sortField = event.field;
                if (this.resetPageOnSort) {
                    this._first = 0;
                    this.firstChange.emit(this._first);
                    if (this.scrollable) {
                        this.resetScrollTop();
                    }
                }
                this.sortSingle();
            }
            if (this.sortMode === 'multiple') {
                var metaKey = originalEvent.metaKey || originalEvent.ctrlKey;
                var sortMeta = this.getSortMeta(event.field);
                if (sortMeta) {
                    if (!metaKey) {
                        this._multiSortMeta = [{ field: event.field, order: sortMeta.order * -1 }];
                        if (this.resetPageOnSort) {
                            this._first = 0;
                            this.firstChange.emit(this._first);
                            if (this.scrollable) {
                                this.resetScrollTop();
                            }
                        }
                    }
                    else {
                        sortMeta.order = sortMeta.order * -1;
                    }
                }
                else {
                    if (!metaKey || !this.multiSortMeta) {
                        this._multiSortMeta = [];
                        if (this.resetPageOnSort) {
                            this._first = 0;
                            this.firstChange.emit(this._first);
                        }
                    }
                    this._multiSortMeta.push({ field: event.field, order: this.defaultSortOrder });
                }
                this.sortMultiple();
            }
            if (this.isStateful()) {
                this.saveState();
            }
            this.anchorRowIndex = null;
        };
        Table.prototype.sortSingle = function () {
            var _this = this;
            if (this.sortField && this.sortOrder) {
                if (this.restoringSort) {
                    this.restoringSort = false;
                }
                if (this.lazy) {
                    this.onLazyLoad.emit(this.createLazyLoadMetadata());
                }
                else if (this.value) {
                    if (this.customSort) {
                        this.sortFunction.emit({
                            data: this.value,
                            mode: this.sortMode,
                            field: this.sortField,
                            order: this.sortOrder
                        });
                    }
                    else {
                        this.value.sort(function (data1, data2) {
                            var value1 = utils.ObjectUtils.resolveFieldData(data1, _this.sortField);
                            var value2 = utils.ObjectUtils.resolveFieldData(data2, _this.sortField);
                            var result = null;
                            if (value1 == null && value2 != null)
                                result = -1;
                            else if (value1 != null && value2 == null)
                                result = 1;
                            else if (value1 == null && value2 == null)
                                result = 0;
                            else if (typeof value1 === 'string' && typeof value2 === 'string')
                                result = value1.localeCompare(value2);
                            else
                                result = (value1 < value2) ? -1 : (value1 > value2) ? 1 : 0;
                            return (_this.sortOrder * result);
                        });
                        this._value = __spreadArray([], __read(this.value));
                    }
                    if (this.hasFilter()) {
                        this._filter();
                    }
                }
                var sortMeta = {
                    field: this.sortField,
                    order: this.sortOrder
                };
                this.onSort.emit(sortMeta);
                this.tableService.onSort(sortMeta);
            }
        };
        Table.prototype.sortMultiple = function () {
            var _this = this;
            if (this.multiSortMeta) {
                if (this.lazy) {
                    this.onLazyLoad.emit(this.createLazyLoadMetadata());
                }
                else if (this.value) {
                    if (this.customSort) {
                        this.sortFunction.emit({
                            data: this.value,
                            mode: this.sortMode,
                            multiSortMeta: this.multiSortMeta
                        });
                    }
                    else {
                        this.value.sort(function (data1, data2) {
                            return _this.multisortField(data1, data2, _this.multiSortMeta, 0);
                        });
                        this._value = __spreadArray([], __read(this.value));
                    }
                    if (this.hasFilter()) {
                        this._filter();
                    }
                }
                this.onSort.emit({
                    multisortmeta: this.multiSortMeta
                });
                this.tableService.onSort(this.multiSortMeta);
            }
        };
        Table.prototype.multisortField = function (data1, data2, multiSortMeta, index) {
            var value1 = utils.ObjectUtils.resolveFieldData(data1, multiSortMeta[index].field);
            var value2 = utils.ObjectUtils.resolveFieldData(data2, multiSortMeta[index].field);
            var result = null;
            if (value1 == null && value2 != null)
                result = -1;
            else if (value1 != null && value2 == null)
                result = 1;
            else if (value1 == null && value2 == null)
                result = 0;
            else if (typeof value1 == 'string' || value1 instanceof String) {
                if (value1.localeCompare && (value1 != value2)) {
                    return (multiSortMeta[index].order * value1.localeCompare(value2));
                }
            }
            else {
                result = (value1 < value2) ? -1 : 1;
            }
            if (value1 == value2) {
                return (multiSortMeta.length - 1) > (index) ? (this.multisortField(data1, data2, multiSortMeta, index + 1)) : 0;
            }
            return (multiSortMeta[index].order * result);
        };
        Table.prototype.getSortMeta = function (field) {
            if (this.multiSortMeta && this.multiSortMeta.length) {
                for (var i = 0; i < this.multiSortMeta.length; i++) {
                    if (this.multiSortMeta[i].field === field) {
                        return this.multiSortMeta[i];
                    }
                }
            }
            return null;
        };
        Table.prototype.isSorted = function (field) {
            if (this.sortMode === 'single') {
                return (this.sortField && this.sortField === field);
            }
            else if (this.sortMode === 'multiple') {
                var sorted = false;
                if (this.multiSortMeta) {
                    for (var i = 0; i < this.multiSortMeta.length; i++) {
                        if (this.multiSortMeta[i].field == field) {
                            sorted = true;
                            break;
                        }
                    }
                }
                return sorted;
            }
        };
        Table.prototype.handleRowClick = function (event) {
            var target = event.originalEvent.target;
            var targetNode = target.nodeName;
            var parentNode = target.parentElement && target.parentElement.nodeName;
            if (targetNode == 'INPUT' || targetNode == 'BUTTON' || targetNode == 'A' ||
                parentNode == 'INPUT' || parentNode == 'BUTTON' || parentNode == 'A' ||
                (dom.DomHandler.hasClass(event.originalEvent.target, 'p-clickable'))) {
                return;
            }
            if (this.selectionMode) {
                this.preventSelectionSetterPropagation = true;
                if (this.isMultipleSelectionMode() && event.originalEvent.shiftKey && this.anchorRowIndex != null) {
                    dom.DomHandler.clearSelection();
                    if (this.rangeRowIndex != null) {
                        this.clearSelectionRange(event.originalEvent);
                    }
                    this.rangeRowIndex = event.rowIndex;
                    this.selectRange(event.originalEvent, event.rowIndex);
                }
                else {
                    var rowData = event.rowData;
                    var selected = this.isSelected(rowData);
                    var metaSelection = this.rowTouched ? false : this.metaKeySelection;
                    var dataKeyValue = this.dataKey ? String(utils.ObjectUtils.resolveFieldData(rowData, this.dataKey)) : null;
                    this.anchorRowIndex = event.rowIndex;
                    this.rangeRowIndex = event.rowIndex;
                    if (metaSelection) {
                        var metaKey = event.originalEvent.metaKey || event.originalEvent.ctrlKey;
                        if (selected && metaKey) {
                            if (this.isSingleSelectionMode()) {
                                this._selection = null;
                                this.selectionKeys = {};
                                this.selectionChange.emit(null);
                            }
                            else {
                                var selectionIndex_1 = this.findIndexInSelection(rowData);
                                this._selection = this.selection.filter(function (val, i) { return i != selectionIndex_1; });
                                this.selectionChange.emit(this.selection);
                                if (dataKeyValue) {
                                    delete this.selectionKeys[dataKeyValue];
                                }
                            }
                            this.onRowUnselect.emit({ originalEvent: event.originalEvent, data: rowData, type: 'row' });
                        }
                        else {
                            if (this.isSingleSelectionMode()) {
                                this._selection = rowData;
                                this.selectionChange.emit(rowData);
                                if (dataKeyValue) {
                                    this.selectionKeys = {};
                                    this.selectionKeys[dataKeyValue] = 1;
                                }
                            }
                            else if (this.isMultipleSelectionMode()) {
                                if (metaKey) {
                                    this._selection = this.selection || [];
                                }
                                else {
                                    this._selection = [];
                                    this.selectionKeys = {};
                                }
                                this._selection = __spreadArray(__spreadArray([], __read(this.selection)), [rowData]);
                                this.selectionChange.emit(this.selection);
                                if (dataKeyValue) {
                                    this.selectionKeys[dataKeyValue] = 1;
                                }
                            }
                            this.onRowSelect.emit({ originalEvent: event.originalEvent, data: rowData, type: 'row', index: event.rowIndex });
                        }
                    }
                    else {
                        if (this.selectionMode === 'single') {
                            if (selected) {
                                this._selection = null;
                                this.selectionKeys = {};
                                this.selectionChange.emit(this.selection);
                                this.onRowUnselect.emit({ originalEvent: event.originalEvent, data: rowData, type: 'row', index: event.rowIndex });
                            }
                            else {
                                this._selection = rowData;
                                this.selectionChange.emit(this.selection);
                                this.onRowSelect.emit({ originalEvent: event.originalEvent, data: rowData, type: 'row', index: event.rowIndex });
                                if (dataKeyValue) {
                                    this.selectionKeys = {};
                                    this.selectionKeys[dataKeyValue] = 1;
                                }
                            }
                        }
                        else if (this.selectionMode === 'multiple') {
                            if (selected) {
                                var selectionIndex_2 = this.findIndexInSelection(rowData);
                                this._selection = this.selection.filter(function (val, i) { return i != selectionIndex_2; });
                                this.selectionChange.emit(this.selection);
                                this.onRowUnselect.emit({ originalEvent: event.originalEvent, data: rowData, type: 'row', index: event.rowIndex });
                                if (dataKeyValue) {
                                    delete this.selectionKeys[dataKeyValue];
                                }
                            }
                            else {
                                this._selection = this.selection ? __spreadArray(__spreadArray([], __read(this.selection)), [rowData]) : [rowData];
                                this.selectionChange.emit(this.selection);
                                this.onRowSelect.emit({ originalEvent: event.originalEvent, data: rowData, type: 'row', index: event.rowIndex });
                                if (dataKeyValue) {
                                    this.selectionKeys[dataKeyValue] = 1;
                                }
                            }
                        }
                    }
                }
                this.tableService.onSelectionChange();
                if (this.isStateful()) {
                    this.saveState();
                }
            }
            this.rowTouched = false;
        };
        Table.prototype.handleRowTouchEnd = function (event) {
            this.rowTouched = true;
        };
        Table.prototype.handleRowRightClick = function (event) {
            if (this.contextMenu) {
                var rowData = event.rowData;
                if (this.contextMenuSelectionMode === 'separate') {
                    this.contextMenuSelection = rowData;
                    this.contextMenuSelectionChange.emit(rowData);
                    this.onContextMenuSelect.emit({ originalEvent: event.originalEvent, data: rowData, index: event.rowIndex });
                    this.contextMenu.show(event.originalEvent);
                    this.tableService.onContextMenu(rowData);
                }
                else if (this.contextMenuSelectionMode === 'joint') {
                    this.preventSelectionSetterPropagation = true;
                    var selected = this.isSelected(rowData);
                    var dataKeyValue = this.dataKey ? String(utils.ObjectUtils.resolveFieldData(rowData, this.dataKey)) : null;
                    if (!selected) {
                        if (this.isSingleSelectionMode()) {
                            this.selection = rowData;
                            this.selectionChange.emit(rowData);
                            if (dataKeyValue) {
                                this.selectionKeys = {};
                                this.selectionKeys[dataKeyValue] = 1;
                            }
                        }
                        else if (this.isMultipleSelectionMode()) {
                            this._selection = this.selection ? __spreadArray(__spreadArray([], __read(this.selection)), [rowData]) : [rowData];
                            this.selectionChange.emit(this.selection);
                            if (dataKeyValue) {
                                this.selectionKeys[dataKeyValue] = 1;
                            }
                        }
                    }
                    this.tableService.onSelectionChange();
                    this.contextMenu.show(event.originalEvent);
                    this.onContextMenuSelect.emit({ originalEvent: event, data: rowData, index: event.rowIndex });
                }
            }
        };
        Table.prototype.selectRange = function (event, rowIndex) {
            var rangeStart, rangeEnd;
            if (this.anchorRowIndex > rowIndex) {
                rangeStart = rowIndex;
                rangeEnd = this.anchorRowIndex;
            }
            else if (this.anchorRowIndex < rowIndex) {
                rangeStart = this.anchorRowIndex;
                rangeEnd = rowIndex;
            }
            else {
                rangeStart = rowIndex;
                rangeEnd = rowIndex;
            }
            if (this.lazy && this.paginator) {
                rangeStart -= this.first;
                rangeEnd -= this.first;
            }
            var rangeRowsData = [];
            for (var i = rangeStart; i <= rangeEnd; i++) {
                var rangeRowData = this.filteredValue ? this.filteredValue[i] : this.value[i];
                if (!this.isSelected(rangeRowData)) {
                    rangeRowsData.push(rangeRowData);
                    this._selection = __spreadArray(__spreadArray([], __read(this.selection)), [rangeRowData]);
                    var dataKeyValue = this.dataKey ? String(utils.ObjectUtils.resolveFieldData(rangeRowData, this.dataKey)) : null;
                    if (dataKeyValue) {
                        this.selectionKeys[dataKeyValue] = 1;
                    }
                }
            }
            this.selectionChange.emit(this.selection);
            this.onRowSelect.emit({ originalEvent: event, data: rangeRowsData, type: 'row' });
        };
        Table.prototype.clearSelectionRange = function (event) {
            var rangeStart, rangeEnd;
            if (this.rangeRowIndex > this.anchorRowIndex) {
                rangeStart = this.anchorRowIndex;
                rangeEnd = this.rangeRowIndex;
            }
            else if (this.rangeRowIndex < this.anchorRowIndex) {
                rangeStart = this.rangeRowIndex;
                rangeEnd = this.anchorRowIndex;
            }
            else {
                rangeStart = this.rangeRowIndex;
                rangeEnd = this.rangeRowIndex;
            }
            var _loop_1 = function (i) {
                var rangeRowData = this_1.value[i];
                var selectionIndex = this_1.findIndexInSelection(rangeRowData);
                this_1._selection = this_1.selection.filter(function (val, i) { return i != selectionIndex; });
                var dataKeyValue = this_1.dataKey ? String(utils.ObjectUtils.resolveFieldData(rangeRowData, this_1.dataKey)) : null;
                if (dataKeyValue) {
                    delete this_1.selectionKeys[dataKeyValue];
                }
                this_1.onRowUnselect.emit({ originalEvent: event, data: rangeRowData, type: 'row' });
            };
            var this_1 = this;
            for (var i = rangeStart; i <= rangeEnd; i++) {
                _loop_1(i);
            }
        };
        Table.prototype.isSelected = function (rowData) {
            if (rowData && this.selection) {
                if (this.dataKey) {
                    return this.selectionKeys[utils.ObjectUtils.resolveFieldData(rowData, this.dataKey)] !== undefined;
                }
                else {
                    if (this.selection instanceof Array)
                        return this.findIndexInSelection(rowData) > -1;
                    else
                        return this.equals(rowData, this.selection);
                }
            }
            return false;
        };
        Table.prototype.findIndexInSelection = function (rowData) {
            var index = -1;
            if (this.selection && this.selection.length) {
                for (var i = 0; i < this.selection.length; i++) {
                    if (this.equals(rowData, this.selection[i])) {
                        index = i;
                        break;
                    }
                }
            }
            return index;
        };
        Table.prototype.toggleRowWithRadio = function (event, rowData) {
            this.preventSelectionSetterPropagation = true;
            if (this.selection != rowData) {
                this._selection = rowData;
                this.selectionChange.emit(this.selection);
                this.onRowSelect.emit({ originalEvent: event.originalEvent, index: event.rowIndex, data: rowData, type: 'radiobutton' });
                if (this.dataKey) {
                    this.selectionKeys = {};
                    this.selectionKeys[String(utils.ObjectUtils.resolveFieldData(rowData, this.dataKey))] = 1;
                }
            }
            else {
                this._selection = null;
                this.selectionChange.emit(this.selection);
                this.onRowUnselect.emit({ originalEvent: event.originalEvent, index: event.rowIndex, data: rowData, type: 'radiobutton' });
            }
            this.tableService.onSelectionChange();
            if (this.isStateful()) {
                this.saveState();
            }
        };
        Table.prototype.toggleRowWithCheckbox = function (event, rowData) {
            this.selection = this.selection || [];
            var selected = this.isSelected(rowData);
            var dataKeyValue = this.dataKey ? String(utils.ObjectUtils.resolveFieldData(rowData, this.dataKey)) : null;
            this.preventSelectionSetterPropagation = true;
            if (selected) {
                var selectionIndex_3 = this.findIndexInSelection(rowData);
                this._selection = this.selection.filter(function (val, i) { return i != selectionIndex_3; });
                this.selectionChange.emit(this.selection);
                this.onRowUnselect.emit({ originalEvent: event.originalEvent, index: event.rowIndex, data: rowData, type: 'checkbox' });
                if (dataKeyValue) {
                    delete this.selectionKeys[dataKeyValue];
                }
            }
            else {
                this._selection = this.selection ? __spreadArray(__spreadArray([], __read(this.selection)), [rowData]) : [rowData];
                this.selectionChange.emit(this.selection);
                this.onRowSelect.emit({ originalEvent: event.originalEvent, index: event.rowIndex, data: rowData, type: 'checkbox' });
                if (dataKeyValue) {
                    this.selectionKeys[dataKeyValue] = 1;
                }
            }
            this.tableService.onSelectionChange();
            if (this.isStateful()) {
                this.saveState();
            }
        };
        Table.prototype.toggleRowsWithCheckbox = function (event, check) {
            this._selection = check ? this.filteredValue ? this.filteredValue.slice() : this.value.slice() : [];
            this.preventSelectionSetterPropagation = true;
            this.updateSelectionKeys();
            this.selectionChange.emit(this._selection);
            this.tableService.onSelectionChange();
            this.onHeaderCheckboxToggle.emit({ originalEvent: event, checked: check });
            if (this.isStateful()) {
                this.saveState();
            }
        };
        Table.prototype.equals = function (data1, data2) {
            return this.compareSelectionBy === 'equals' ? (data1 === data2) : utils.ObjectUtils.equals(data1, data2, this.dataKey);
        };
        /* Legacy Filtering for custom elements */
        Table.prototype.filter = function (value, field, matchMode) {
            var _this = this;
            if (this.filterTimeout) {
                clearTimeout(this.filterTimeout);
            }
            if (!this.isFilterBlank(value)) {
                this.filters[field] = { value: value, matchMode: matchMode };
            }
            else if (this.filters[field]) {
                delete this.filters[field];
            }
            this.filterTimeout = setTimeout(function () {
                _this._filter();
                _this.filterTimeout = null;
            }, this.filterDelay);
            this.anchorRowIndex = null;
        };
        Table.prototype.filterGlobal = function (value, matchMode) {
            this.filter(value, 'global', matchMode);
        };
        Table.prototype.isFilterBlank = function (filter) {
            if (filter !== null && filter !== undefined) {
                if ((typeof filter === 'string' && filter.trim().length == 0) || (filter instanceof Array && filter.length == 0))
                    return true;
                else
                    return false;
            }
            return true;
        };
        Table.prototype._filter = function () {
            var e_2, _b;
            if (!this.restoringFilter) {
                this.first = 0;
                this.firstChange.emit(this.first);
            }
            if (this.lazy) {
                this.onLazyLoad.emit(this.createLazyLoadMetadata());
            }
            else {
                if (!this.value) {
                    return;
                }
                if (!this.hasFilter()) {
                    this.filteredValue = null;
                    if (this.paginator) {
                        this.totalRecords = this.value ? this.value.length : 0;
                    }
                }
                else {
                    var globalFilterFieldsArray = void 0;
                    if (this.filters['global']) {
                        if (!this.columns && !this.globalFilterFields)
                            throw new Error('Global filtering requires dynamic columns or globalFilterFields to be defined.');
                        else
                            globalFilterFieldsArray = this.globalFilterFields || this.columns;
                    }
                    this.filteredValue = [];
                    for (var i = 0; i < this.value.length; i++) {
                        var localMatch = true;
                        var globalMatch = false;
                        var localFiltered = false;
                        for (var prop in this.filters) {
                            if (this.filters.hasOwnProperty(prop) && prop !== 'global') {
                                localFiltered = true;
                                var filterField = prop;
                                var filterMeta = this.filters[filterField];
                                if (Array.isArray(filterMeta)) {
                                    try {
                                        for (var filterMeta_1 = (e_2 = void 0, __values(filterMeta)), filterMeta_1_1 = filterMeta_1.next(); !filterMeta_1_1.done; filterMeta_1_1 = filterMeta_1.next()) {
                                            var meta = filterMeta_1_1.value;
                                            localMatch = this.executeLocalFilter(filterField, this.value[i], meta);
                                            if ((meta.operator === i1.FilterOperator.OR && localMatch) || (meta.operator === i1.FilterOperator.AND && !localMatch)) {
                                                break;
                                            }
                                        }
                                    }
                                    catch (e_2_1) { e_2 = { error: e_2_1 }; }
                                    finally {
                                        try {
                                            if (filterMeta_1_1 && !filterMeta_1_1.done && (_b = filterMeta_1.return)) _b.call(filterMeta_1);
                                        }
                                        finally { if (e_2) throw e_2.error; }
                                    }
                                }
                                else {
                                    localMatch = this.executeLocalFilter(filterField, this.value[i], filterMeta);
                                }
                                if (!localMatch) {
                                    break;
                                }
                            }
                        }
                        if (this.filters['global'] && !globalMatch && globalFilterFieldsArray) {
                            for (var j = 0; j < globalFilterFieldsArray.length; j++) {
                                var globalFilterField = globalFilterFieldsArray[j].field || globalFilterFieldsArray[j];
                                globalMatch = this.filterService.filters[this.filters['global'].matchMode](utils.ObjectUtils.resolveFieldData(this.value[i], globalFilterField), this.filters['global'].value, this.filterLocale);
                                if (globalMatch) {
                                    break;
                                }
                            }
                        }
                        var matches = void 0;
                        if (this.filters['global']) {
                            matches = localFiltered ? (localFiltered && localMatch && globalMatch) : globalMatch;
                        }
                        else {
                            matches = localFiltered && localMatch;
                        }
                        if (matches) {
                            this.filteredValue.push(this.value[i]);
                        }
                    }
                    if (this.filteredValue.length === this.value.length) {
                        this.filteredValue = null;
                    }
                    if (this.paginator) {
                        this.totalRecords = this.filteredValue ? this.filteredValue.length : this.value ? this.value.length : 0;
                    }
                }
            }
            this.onFilter.emit({
                filters: this.filters,
                filteredValue: this.filteredValue || this.value
            });
            this.tableService.onValueChange(this.value);
            if (this.isStateful() && !this.restoringFilter) {
                this.saveState();
            }
            if (this.restoringFilter) {
                this.restoringFilter = false;
            }
            this.cd.markForCheck();
            if (this.scrollable) {
                this.resetScrollTop();
            }
        };
        Table.prototype.executeLocalFilter = function (field, rowData, filterMeta) {
            var filterValue = filterMeta.value;
            var filterMatchMode = filterMeta.matchMode || i1.FilterMatchMode.STARTS_WITH;
            var dataFieldValue = utils.ObjectUtils.resolveFieldData(rowData, field);
            var filterConstraint = this.filterService.filters[filterMatchMode];
            return filterConstraint(dataFieldValue, filterValue, this.filterLocale);
        };
        Table.prototype.hasFilter = function () {
            var empty = true;
            for (var prop in this.filters) {
                if (this.filters.hasOwnProperty(prop)) {
                    empty = false;
                    break;
                }
            }
            return !empty;
        };
        Table.prototype.createLazyLoadMetadata = function () {
            return {
                first: this.first,
                rows: this.rows,
                sortField: this.sortField,
                sortOrder: this.sortOrder,
                filters: this.filters,
                globalFilter: this.filters && this.filters['global'] ? this.filters['global'].value : null,
                multiSortMeta: this.multiSortMeta
            };
        };
        Table.prototype.clear = function () {
            this._sortField = null;
            this._sortOrder = this.defaultSortOrder;
            this._multiSortMeta = null;
            this.tableService.onSort(null);
            this.filteredValue = null;
            this.tableService.onResetChange();
            this.first = 0;
            this.firstChange.emit(this.first);
            if (this.lazy) {
                this.onLazyLoad.emit(this.createLazyLoadMetadata());
            }
            else {
                this.totalRecords = (this._value ? this._value.length : 0);
            }
        };
        Table.prototype.reset = function () {
            this.clear();
        };
        Table.prototype.exportCSV = function (options) {
            var _this = this;
            var data;
            var csv = '';
            var columns = this.frozenColumns ? __spreadArray(__spreadArray([], __read(this.frozenColumns)), __read(this.columns)) : this.columns;
            if (options && options.selectionOnly) {
                data = this.selection || [];
            }
            else {
                data = this.filteredValue || this.value;
                if (this.frozenValue) {
                    data = data ? __spreadArray(__spreadArray([], __read(this.frozenValue)), __read(data)) : this.frozenValue;
                }
            }
            //headers
            for (var i = 0; i < columns.length; i++) {
                var column = columns[i];
                if (column.exportable !== false && column.field) {
                    csv += '"' + (column.header || column.field) + '"';
                    if (i < (columns.length - 1)) {
                        csv += this.csvSeparator;
                    }
                }
            }
            //body
            data.forEach(function (record, i) {
                csv += '\n';
                for (var i_1 = 0; i_1 < columns.length; i_1++) {
                    var column = columns[i_1];
                    if (column.exportable !== false && column.field) {
                        var cellData = utils.ObjectUtils.resolveFieldData(record, column.field);
                        if (cellData != null) {
                            if (_this.exportFunction) {
                                cellData = _this.exportFunction({
                                    data: cellData,
                                    field: column.field
                                });
                            }
                            else
                                cellData = String(cellData).replace(/"/g, '""');
                        }
                        else
                            cellData = '';
                        csv += '"' + cellData + '"';
                        if (i_1 < (columns.length - 1)) {
                            csv += _this.csvSeparator;
                        }
                    }
                }
            });
            var blob = new Blob([csv], {
                type: 'text/csv;charset=utf-8;'
            });
            if (window.navigator.msSaveOrOpenBlob) {
                navigator.msSaveOrOpenBlob(blob, this.exportFilename + '.csv');
            }
            else {
                var link = document.createElement("a");
                link.style.display = 'none';
                document.body.appendChild(link);
                if (link.download !== undefined) {
                    link.setAttribute('href', URL.createObjectURL(blob));
                    link.setAttribute('download', this.exportFilename + '.csv');
                    link.click();
                }
                else {
                    csv = 'data:text/csv;charset=utf-8,' + csv;
                    window.open(encodeURI(csv));
                }
                document.body.removeChild(link);
            }
        };
        Table.prototype.resetScrollTop = function () {
            if (this.virtualScroll)
                this.scrollToVirtualIndex(0);
            else
                this.scrollTo({ top: 0 });
        };
        Table.prototype.scrollToVirtualIndex = function (index) {
            if (this.virtualScrollBody) {
                this.virtualScrollBody.scrollToIndex(index);
            }
        };
        Table.prototype.onScrollIndexChange = function (index) {
            var _this = this;
            if (this.lazy) {
                if (this.virtualScrollTimeout) {
                    clearTimeout(this.virtualScrollTimeout);
                }
                this.virtualScrollTimeout = setTimeout(function () {
                    var page = Math.floor(index / _this.rows);
                    var virtualScrollOffset = page === 0 ? 0 : (page - 1) * _this.rows;
                    var virtualScrollChunkSize = page === 0 ? _this.rows * 2 : _this.rows * 3;
                    if (page !== _this.virtualPage) {
                        _this.virtualPage = page;
                        _this.onLazyLoad.emit({
                            first: virtualScrollOffset,
                            rows: virtualScrollChunkSize,
                            sortField: _this.sortField,
                            sortOrder: _this.sortOrder,
                            filters: _this.filters,
                            globalFilter: _this.filters && _this.filters['global'] ? _this.filters['global'].value : null,
                            multiSortMeta: _this.multiSortMeta
                        });
                    }
                }, this.virtualScrollDelay);
            }
        };
        Table.prototype.scrollTo = function (options) {
            if (this.virtualScrollBody) {
                this.virtualScrollBody.scrollTo(options);
            }
            else {
                if (this.wrapperViewChild.nativeElement.scrollTo) {
                    this.wrapperViewChild.nativeElement.scrollTo(options);
                }
                else {
                    this.wrapperViewChild.nativeElement.scrollLeft = options.left;
                    this.wrapperViewChild.nativeElement.scrollTop = options.top;
                }
            }
        };
        Table.prototype.updateEditingCell = function (cell, data, field, index) {
            this.editingCell = cell;
            this.editingCellData = data;
            this.editingCellField = field;
            this.editingCellRowIndex = index;
            this.bindDocumentEditListener();
        };
        Table.prototype.isEditingCellValid = function () {
            return (this.editingCell && dom.DomHandler.find(this.editingCell, '.ng-invalid.ng-dirty').length === 0);
        };
        Table.prototype.bindDocumentEditListener = function () {
            var _this = this;
            if (!this.documentEditListener) {
                this.documentEditListener = function (event) {
                    if (_this.editingCell && !_this.selfClick && _this.isEditingCellValid()) {
                        dom.DomHandler.removeClass(_this.editingCell, 'p-cell-editing');
                        _this.editingCell = null;
                        _this.onEditComplete.emit({ field: _this.editingCellField, data: _this.editingCellData, originalEvent: event, index: _this.editingCellRowIndex });
                        _this.editingCellField = null;
                        _this.editingCellData = null;
                        _this.editingCellRowIndex = null;
                        _this.unbindDocumentEditListener();
                        _this.cd.markForCheck();
                        if (_this.overlaySubscription) {
                            _this.overlaySubscription.unsubscribe();
                        }
                    }
                    _this.selfClick = false;
                };
                document.addEventListener('click', this.documentEditListener);
            }
        };
        Table.prototype.unbindDocumentEditListener = function () {
            if (this.documentEditListener) {
                document.removeEventListener('click', this.documentEditListener);
                this.documentEditListener = null;
            }
        };
        Table.prototype.initRowEdit = function (rowData) {
            var dataKeyValue = String(utils.ObjectUtils.resolveFieldData(rowData, this.dataKey));
            this.editingRowKeys[dataKeyValue] = true;
        };
        Table.prototype.saveRowEdit = function (rowData, rowElement) {
            if (dom.DomHandler.find(rowElement, '.ng-invalid.ng-dirty').length === 0) {
                var dataKeyValue = String(utils.ObjectUtils.resolveFieldData(rowData, this.dataKey));
                delete this.editingRowKeys[dataKeyValue];
            }
        };
        Table.prototype.cancelRowEdit = function (rowData) {
            var dataKeyValue = String(utils.ObjectUtils.resolveFieldData(rowData, this.dataKey));
            delete this.editingRowKeys[dataKeyValue];
        };
        Table.prototype.toggleRow = function (rowData, event) {
            if (!this.dataKey) {
                throw new Error('dataKey must be defined to use row expansion');
            }
            var dataKeyValue = String(utils.ObjectUtils.resolveFieldData(rowData, this.dataKey));
            if (this.expandedRowKeys[dataKeyValue] != null) {
                delete this.expandedRowKeys[dataKeyValue];
                this.onRowCollapse.emit({
                    originalEvent: event,
                    data: rowData
                });
            }
            else {
                if (this.rowExpandMode === 'single') {
                    this.expandedRowKeys = {};
                }
                this.expandedRowKeys[dataKeyValue] = true;
                this.onRowExpand.emit({
                    originalEvent: event,
                    data: rowData
                });
            }
            if (event) {
                event.preventDefault();
            }
            if (this.isStateful()) {
                this.saveState();
            }
        };
        Table.prototype.isRowExpanded = function (rowData) {
            return this.expandedRowKeys[String(utils.ObjectUtils.resolveFieldData(rowData, this.dataKey))] === true;
        };
        Table.prototype.isRowEditing = function (rowData) {
            return this.editingRowKeys[String(utils.ObjectUtils.resolveFieldData(rowData, this.dataKey))] === true;
        };
        Table.prototype.isSingleSelectionMode = function () {
            return this.selectionMode === 'single';
        };
        Table.prototype.isMultipleSelectionMode = function () {
            return this.selectionMode === 'multiple';
        };
        Table.prototype.onColumnResizeBegin = function (event) {
            var containerLeft = dom.DomHandler.getOffset(this.containerViewChild.nativeElement).left;
            this.resizeColumnElement = event.target.parentElement;
            this.columnResizing = true;
            this.lastResizerHelperX = (event.pageX - containerLeft + this.containerViewChild.nativeElement.scrollLeft);
            this.onColumnResize(event);
            event.preventDefault();
        };
        Table.prototype.onColumnResize = function (event) {
            var containerLeft = dom.DomHandler.getOffset(this.containerViewChild.nativeElement).left;
            dom.DomHandler.addClass(this.containerViewChild.nativeElement, 'p-unselectable-text');
            this.resizeHelperViewChild.nativeElement.style.height = this.containerViewChild.nativeElement.offsetHeight + 'px';
            this.resizeHelperViewChild.nativeElement.style.top = 0 + 'px';
            this.resizeHelperViewChild.nativeElement.style.left = (event.pageX - containerLeft + this.containerViewChild.nativeElement.scrollLeft) + 'px';
            this.resizeHelperViewChild.nativeElement.style.display = 'block';
        };
        Table.prototype.onColumnResizeEnd = function () {
            var delta = this.resizeHelperViewChild.nativeElement.offsetLeft - this.lastResizerHelperX;
            var columnWidth = this.resizeColumnElement.offsetWidth;
            var newColumnWidth = columnWidth + delta;
            var minWidth = this.resizeColumnElement.style.minWidth || 15;
            if (newColumnWidth >= minWidth) {
                if (this.columnResizeMode === 'fit') {
                    var nextColumn = this.resizeColumnElement.nextElementSibling;
                    var nextColumnWidth = nextColumn.offsetWidth - delta;
                    if (newColumnWidth > 15 && nextColumnWidth > 15) {
                        if (!this.scrollable) {
                            this.resizeColumnElement.style.width = newColumnWidth + 'px';
                            if (nextColumn) {
                                nextColumn.style.width = nextColumnWidth + 'px';
                            }
                        }
                        else {
                            this.resizeTableCells(newColumnWidth, nextColumnWidth);
                        }
                    }
                }
                else if (this.columnResizeMode === 'expand') {
                    var tableWidth = this.tableViewChild.nativeElement.offsetWidth + delta;
                    if (!this.scrollable) {
                        this.tableViewChild.nativeElement.style.width = tableWidth + 'px';
                        this.resizeColumnElement.style.width = newColumnWidth + 'px';
                    }
                    else {
                        this.resizeTableCells(newColumnWidth, null);
                        var scrollbarWidth = dom.DomHandler.calculateScrollbarWidth(this.wrapperViewChild.nativeElement);
                        var isWrapperInViewport = this.containerViewChild.nativeElement.offsetWidth > tableWidth + scrollbarWidth;
                        this.tableViewChild.nativeElement.style.width = tableWidth + 'px';
                        this.wrapperViewChild.nativeElement.style.width = isWrapperInViewport ? tableWidth + scrollbarWidth + 'px' : 'auto';
                    }
                }
                this.onColResize.emit({
                    element: this.resizeColumnElement,
                    delta: delta
                });
                if (this.isStateful()) {
                    this.saveState();
                }
            }
            this.resizeHelperViewChild.nativeElement.style.display = 'none';
            dom.DomHandler.removeClass(this.containerViewChild.nativeElement, 'p-unselectable-text');
        };
        Table.prototype.resizeTableCells = function (newColumnWidth, nextColumnWidth) {
            var _this = this;
            var colIndex = dom.DomHandler.index(this.resizeColumnElement);
            var widths = [];
            var headers = dom.DomHandler.find(this.containerViewChild.nativeElement, '.p-datatable-thead > tr > th');
            headers.forEach(function (header) { return widths.push(dom.DomHandler.getOuterWidth(header)); });
            this.destroyStyleElement();
            this.createStyleElement();
            var innerHTML = '';
            widths.forEach(function (width, index) {
                var colWidth = index === colIndex ? newColumnWidth : (nextColumnWidth && index === colIndex + 1) ? nextColumnWidth : width;
                innerHTML += "\n                #" + _this.id + " .p-datatable-thead > tr > th:nth-child(" + (index + 1) + ") {\n                    flex: 0 0 " + colWidth + "px !important;\n                }\n\n                #" + _this.id + " .p-datatable-tbody > tr > td:nth-child(" + (index + 1) + ") {\n                    flex: 0 0 " + colWidth + "px !important;\n                }\n            ";
            });
            this.styleElement.innerHTML = innerHTML;
        };
        Table.prototype.onColumnDragStart = function (event, columnElement) {
            this.reorderIconWidth = dom.DomHandler.getHiddenElementOuterWidth(this.reorderIndicatorUpViewChild.nativeElement);
            this.reorderIconHeight = dom.DomHandler.getHiddenElementOuterHeight(this.reorderIndicatorDownViewChild.nativeElement);
            this.draggedColumn = columnElement;
            event.dataTransfer.setData('text', 'b'); // For firefox
        };
        Table.prototype.onColumnDragEnter = function (event, dropHeader) {
            if (this.reorderableColumns && this.draggedColumn && dropHeader) {
                event.preventDefault();
                var containerOffset = dom.DomHandler.getOffset(this.containerViewChild.nativeElement);
                var dropHeaderOffset = dom.DomHandler.getOffset(dropHeader);
                if (this.draggedColumn != dropHeader) {
                    var dragIndex = dom.DomHandler.indexWithinGroup(this.draggedColumn, 'preorderablecolumn');
                    var dropIndex = dom.DomHandler.indexWithinGroup(dropHeader, 'preorderablecolumn');
                    var targetLeft = dropHeaderOffset.left - containerOffset.left;
                    var targetTop = containerOffset.top - dropHeaderOffset.top;
                    var columnCenter = dropHeaderOffset.left + dropHeader.offsetWidth / 2;
                    this.reorderIndicatorUpViewChild.nativeElement.style.top = dropHeaderOffset.top - containerOffset.top - (this.reorderIconHeight - 1) + 'px';
                    this.reorderIndicatorDownViewChild.nativeElement.style.top = dropHeaderOffset.top - containerOffset.top + dropHeader.offsetHeight + 'px';
                    if (event.pageX > columnCenter) {
                        this.reorderIndicatorUpViewChild.nativeElement.style.left = (targetLeft + dropHeader.offsetWidth - Math.ceil(this.reorderIconWidth / 2)) + 'px';
                        this.reorderIndicatorDownViewChild.nativeElement.style.left = (targetLeft + dropHeader.offsetWidth - Math.ceil(this.reorderIconWidth / 2)) + 'px';
                        this.dropPosition = 1;
                    }
                    else {
                        this.reorderIndicatorUpViewChild.nativeElement.style.left = (targetLeft - Math.ceil(this.reorderIconWidth / 2)) + 'px';
                        this.reorderIndicatorDownViewChild.nativeElement.style.left = (targetLeft - Math.ceil(this.reorderIconWidth / 2)) + 'px';
                        this.dropPosition = -1;
                    }
                    if ((dropIndex - dragIndex === 1 && this.dropPosition === -1) || (dropIndex - dragIndex === -1 && this.dropPosition === 1)) {
                        this.reorderIndicatorUpViewChild.nativeElement.style.display = 'none';
                        this.reorderIndicatorDownViewChild.nativeElement.style.display = 'none';
                    }
                    else {
                        this.reorderIndicatorUpViewChild.nativeElement.style.display = 'block';
                        this.reorderIndicatorDownViewChild.nativeElement.style.display = 'block';
                    }
                }
                else {
                    event.dataTransfer.dropEffect = 'none';
                }
            }
        };
        Table.prototype.onColumnDragLeave = function (event) {
            if (this.reorderableColumns && this.draggedColumn) {
                event.preventDefault();
                this.reorderIndicatorUpViewChild.nativeElement.style.display = 'none';
                this.reorderIndicatorDownViewChild.nativeElement.style.display = 'none';
            }
        };
        Table.prototype.onColumnDrop = function (event, dropColumn) {
            var _this = this;
            event.preventDefault();
            if (this.draggedColumn) {
                var dragIndex = dom.DomHandler.indexWithinGroup(this.draggedColumn, 'preorderablecolumn');
                var dropIndex = dom.DomHandler.indexWithinGroup(dropColumn, 'preorderablecolumn');
                var allowDrop = (dragIndex != dropIndex);
                if (allowDrop && ((dropIndex - dragIndex == 1 && this.dropPosition === -1) || (dragIndex - dropIndex == 1 && this.dropPosition === 1))) {
                    allowDrop = false;
                }
                if (allowDrop && ((dropIndex < dragIndex && this.dropPosition === 1))) {
                    dropIndex = dropIndex + 1;
                }
                if (allowDrop && ((dropIndex > dragIndex && this.dropPosition === -1))) {
                    dropIndex = dropIndex - 1;
                }
                if (allowDrop) {
                    utils.ObjectUtils.reorderArray(this.columns, dragIndex, dropIndex);
                    this.onColReorder.emit({
                        dragIndex: dragIndex,
                        dropIndex: dropIndex,
                        columns: this.columns
                    });
                    if (this.isStateful()) {
                        this.zone.runOutsideAngular(function () {
                            setTimeout(function () {
                                _this.saveState();
                            });
                        });
                    }
                }
                this.reorderIndicatorUpViewChild.nativeElement.style.display = 'none';
                this.reorderIndicatorDownViewChild.nativeElement.style.display = 'none';
                this.draggedColumn.draggable = false;
                this.draggedColumn = null;
                this.dropPosition = null;
            }
        };
        Table.prototype.onRowDragStart = function (event, index) {
            this.rowDragging = true;
            this.draggedRowIndex = index;
            event.dataTransfer.setData('text', 'b'); // For firefox
        };
        Table.prototype.onRowDragOver = function (event, index, rowElement) {
            if (this.rowDragging && this.draggedRowIndex !== index) {
                var rowY = dom.DomHandler.getOffset(rowElement).top + dom.DomHandler.getWindowScrollTop();
                var pageY = event.pageY;
                var rowMidY = rowY + dom.DomHandler.getOuterHeight(rowElement) / 2;
                var prevRowElement = rowElement.previousElementSibling;
                if (pageY < rowMidY) {
                    dom.DomHandler.removeClass(rowElement, 'p-datatable-dragpoint-bottom');
                    this.droppedRowIndex = index;
                    if (prevRowElement)
                        dom.DomHandler.addClass(prevRowElement, 'p-datatable-dragpoint-bottom');
                    else
                        dom.DomHandler.addClass(rowElement, 'p-datatable-dragpoint-top');
                }
                else {
                    if (prevRowElement)
                        dom.DomHandler.removeClass(prevRowElement, 'p-datatable-dragpoint-bottom');
                    else
                        dom.DomHandler.addClass(rowElement, 'p-datatable-dragpoint-top');
                    this.droppedRowIndex = index + 1;
                    dom.DomHandler.addClass(rowElement, 'p-datatable-dragpoint-bottom');
                }
            }
        };
        Table.prototype.onRowDragLeave = function (event, rowElement) {
            var prevRowElement = rowElement.previousElementSibling;
            if (prevRowElement) {
                dom.DomHandler.removeClass(prevRowElement, 'p-datatable-dragpoint-bottom');
            }
            dom.DomHandler.removeClass(rowElement, 'p-datatable-dragpoint-bottom');
            dom.DomHandler.removeClass(rowElement, 'p-datatable-dragpoint-top');
        };
        Table.prototype.onRowDragEnd = function (event) {
            this.rowDragging = false;
            this.draggedRowIndex = null;
            this.droppedRowIndex = null;
        };
        Table.prototype.onRowDrop = function (event, rowElement) {
            if (this.droppedRowIndex != null) {
                var dropIndex = (this.draggedRowIndex > this.droppedRowIndex) ? this.droppedRowIndex : (this.droppedRowIndex === 0) ? 0 : this.droppedRowIndex - 1;
                utils.ObjectUtils.reorderArray(this.value, this.draggedRowIndex, dropIndex);
                this.onRowReorder.emit({
                    dragIndex: this.draggedRowIndex,
                    dropIndex: dropIndex
                });
            }
            //cleanup
            this.onRowDragLeave(event, rowElement);
            this.onRowDragEnd(event);
        };
        Table.prototype.isEmpty = function () {
            var data = this.filteredValue || this.value;
            return data == null || data.length == 0;
        };
        Table.prototype.getBlockableElement = function () {
            return this.el.nativeElement.children[0];
        };
        Table.prototype.getStorage = function () {
            switch (this.stateStorage) {
                case 'local':
                    return window.localStorage;
                case 'session':
                    return window.sessionStorage;
                default:
                    throw new Error(this.stateStorage + ' is not a valid value for the state storage, supported values are "local" and "session".');
            }
        };
        Table.prototype.isStateful = function () {
            return this.stateKey != null;
        };
        Table.prototype.saveState = function () {
            var storage = this.getStorage();
            var state = {};
            if (this.paginator) {
                state.first = this.first;
                state.rows = this.rows;
            }
            if (this.sortField) {
                state.sortField = this.sortField;
                state.sortOrder = this.sortOrder;
            }
            if (this.multiSortMeta) {
                state.multiSortMeta = this.multiSortMeta;
            }
            if (this.hasFilter()) {
                state.filters = this.filters;
            }
            if (this.resizableColumns) {
                this.saveColumnWidths(state);
            }
            if (this.reorderableColumns) {
                this.saveColumnOrder(state);
            }
            if (this.selection) {
                state.selection = this.selection;
            }
            if (Object.keys(this.expandedRowKeys).length) {
                state.expandedRowKeys = this.expandedRowKeys;
            }
            storage.setItem(this.stateKey, JSON.stringify(state));
            this.onStateSave.emit(state);
        };
        Table.prototype.clearState = function () {
            var storage = this.getStorage();
            if (this.stateKey) {
                storage.removeItem(this.stateKey);
            }
        };
        Table.prototype.restoreState = function () {
            var _this = this;
            var storage = this.getStorage();
            var stateString = storage.getItem(this.stateKey);
            var dateFormat = /\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z/;
            var reviver = function (key, value) {
                if (typeof value === "string" && dateFormat.test(value)) {
                    return new Date(value);
                }
                return value;
            };
            if (stateString) {
                var state_1 = JSON.parse(stateString, reviver);
                if (this.paginator) {
                    if (this.first !== undefined) {
                        this.first = state_1.first;
                        this.firstChange.emit(this.first);
                    }
                    if (this.rows !== undefined) {
                        this.rows = state_1.rows;
                        this.rowsChange.emit(this.rows);
                    }
                }
                if (state_1.sortField) {
                    this.restoringSort = true;
                    this._sortField = state_1.sortField;
                    this._sortOrder = state_1.sortOrder;
                }
                if (state_1.multiSortMeta) {
                    this.restoringSort = true;
                    this._multiSortMeta = state_1.multiSortMeta;
                }
                if (state_1.filters) {
                    this.restoringFilter = true;
                    this.filters = state_1.filters;
                }
                if (this.resizableColumns) {
                    this.columnWidthsState = state_1.columnWidths;
                    this.tableWidthState = state_1.tableWidth;
                    this.wrapperWidthState = state_1.wrapperWidth;
                }
                if (state_1.expandedRowKeys) {
                    this.expandedRowKeys = state_1.expandedRowKeys;
                }
                if (state_1.selection) {
                    Promise.resolve(null).then(function () { return _this.selectionChange.emit(state_1.selection); });
                }
                this.stateRestored = true;
                this.onStateRestore.emit(state_1);
            }
        };
        Table.prototype.saveColumnWidths = function (state) {
            var widths = [];
            var headers = dom.DomHandler.find(this.containerViewChild.nativeElement, '.p-datatable-thead > tr > th');
            headers.forEach(function (header) { return widths.push(dom.DomHandler.getOuterWidth(header)); });
            state.columnWidths = widths.join(',');
            if (this.columnResizeMode === 'expand') {
                state.tableWidth = dom.DomHandler.getOuterWidth(this.tableViewChild.nativeElement) + 'px';
                state.wrapperWidth = this.wrapperViewChild.nativeElement.style.width;
            }
        };
        Table.prototype.restoreColumnWidths = function () {
            var _this = this;
            if (this.columnWidthsState) {
                var widths_1 = this.columnWidthsState.split(',');
                if (this.columnResizeMode === 'expand') {
                    if (this.tableWidthState)
                        this.tableViewChild.nativeElement.style.width = this.tableWidthState;
                    if (this.wrapperWidthState)
                        this.wrapperViewChild.nativeElement.style.width = this.wrapperWidthState;
                }
                this.createStyleElement();
                if (this.scrollable && widths_1 && widths_1.length > 0) {
                    var innerHTML_1 = '';
                    widths_1.forEach(function (width, index) {
                        innerHTML_1 += "\n                            #" + _this.id + " .p-datatable-thead > tr > th:nth-child(" + (index + 1) + ") {\n                                flex: 0 0 " + width + "px;\n                            }\n\n                            #" + _this.id + " .p-datatable-tbody > tr > td:nth-child(" + (index + 1) + ") {\n                                flex: 0 0 " + width + "px;\n                            }\n                        ";
                    });
                    this.styleElement.innerHTML = innerHTML_1;
                }
                else {
                    dom.DomHandler.find(this.tableViewChild.nativeElement, '.p-datatable-thead > tr > th').forEach(function (header, index) {
                        header.style.width = widths_1[index] + 'px';
                    });
                }
            }
        };
        Table.prototype.saveColumnOrder = function (state) {
            if (this.columns) {
                var columnOrder_1 = [];
                this.columns.map(function (column) {
                    columnOrder_1.push(column.field || column.key);
                });
                state.columnOrder = columnOrder_1;
            }
        };
        Table.prototype.restoreColumnOrder = function () {
            var _this = this;
            var storage = this.getStorage();
            var stateString = storage.getItem(this.stateKey);
            if (stateString) {
                var state = JSON.parse(stateString);
                var columnOrder = state.columnOrder;
                if (columnOrder) {
                    var reorderedColumns_1 = [];
                    columnOrder.map(function (key) {
                        var col = _this.findColumnByKey(key);
                        if (col) {
                            reorderedColumns_1.push(col);
                        }
                    });
                    this.columnOrderStateRestored = true;
                    this.columns = reorderedColumns_1;
                }
            }
        };
        Table.prototype.updateScrollWidth = function () {
            if (this.tableViewChild && this.tableViewChild.nativeElement) {
                var parentElementHeight = dom.DomHandler.getWidth(this.tableViewChild.nativeElement.parentElement);
                if (this.tableViewChild.nativeElement.scrollWidth > parentElementHeight) {
                    this.tableViewChild.nativeElement.style.width = this.tableViewChild.nativeElement.scrollWidth + 'px';
                }
                else {
                    this.tableViewChild.nativeElement.style.width = (parentElementHeight - dom.DomHandler.calculateScrollbarHeight()) + 'px';
                }
            }
        };
        Table.prototype.findColumnByKey = function (key) {
            var e_3, _b;
            if (this.columns) {
                try {
                    for (var _c = __values(this.columns), _d = _c.next(); !_d.done; _d = _c.next()) {
                        var col = _d.value;
                        if (col.key === key || col.field === key)
                            return col;
                        else
                            continue;
                    }
                }
                catch (e_3_1) { e_3 = { error: e_3_1 }; }
                finally {
                    try {
                        if (_d && !_d.done && (_b = _c.return)) _b.call(_c);
                    }
                    finally { if (e_3) throw e_3.error; }
                }
            }
            else {
                return null;
            }
        };
        Table.prototype.createStyleElement = function () {
            this.styleElement = document.createElement('style');
            this.styleElement.type = 'text/css';
            document.head.appendChild(this.styleElement);
        };
        Table.prototype.createResponsiveStyle = function () {
            if (!this.responsiveStyleElement) {
                this.responsiveStyleElement = document.createElement('style');
                this.responsiveStyleElement.type = 'text/css';
                document.head.appendChild(this.responsiveStyleElement);
                var innerHTML = "\n@media screen and (max-width: " + this.breakpoint + ") {\n    #" + this.id + " .p-datatable-thead > tr > th,\n    #" + this.id + " .p-datatable-tfoot > tr > td {\n        display: none !important;\n    }\n\n    #" + this.id + " .p-datatable-tbody > tr > td {\n        display: flex;\n        width: 100% !important;\n        align-items: center;\n        justify-content: space-between;\n    }\n\n    #" + this.id + " .p-datatable-tbody > tr > td:not(:last-child) {\n        border: 0 none;\n    }\n\n    #" + this.id + ".p-datatable-gridlines .p-datatable-tbody > tr > td:last-child {\n        border-top: 0;\n        border-right: 0;\n        border-left: 0;\n    }\n\n    #" + this.id + " .p-datatable-tbody > tr > td > .p-column-title {\n        display: block;\n    }\n}\n";
                this.responsiveStyleElement.innerHTML = innerHTML;
            }
        };
        Table.prototype.destroyResponsiveStyle = function () {
            if (this.responsiveStyleElement) {
                document.head.removeChild(this.responsiveStyleElement);
                this.responsiveStyleElement = null;
            }
        };
        Table.prototype.destroyStyleElement = function () {
            if (this.styleElement) {
                document.head.removeChild(this.styleElement);
                this.styleElement = null;
            }
        };
        Table.prototype.ngOnDestroy = function () {
            this.unbindDocumentEditListener();
            this.editingCell = null;
            this.initialized = null;
            if (this.virtualScrollSubscription) {
                this.virtualScrollSubscription.unsubscribe();
            }
            this.destroyStyleElement();
            this.destroyResponsiveStyle();
        };
        return Table;
    }());
    Table.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0__namespace, type: Table, deps: [{ token: i0__namespace.ElementRef }, { token: i0__namespace.NgZone }, { token: TableService }, { token: i0__namespace.ChangeDetectorRef }, { token: i1__namespace.FilterService }, { token: i1__namespace.OverlayService }], target: i0__namespace.ɵɵFactoryTarget.Component });
    Table.ɵcmp = i0__namespace.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.0.5", type: Table, selector: "p-table", inputs: { frozenColumns: "frozenColumns", frozenValue: "frozenValue", style: "style", styleClass: "styleClass", tableStyle: "tableStyle", tableStyleClass: "tableStyleClass", paginator: "paginator", pageLinks: "pageLinks", rowsPerPageOptions: "rowsPerPageOptions", alwaysShowPaginator: "alwaysShowPaginator", paginatorPosition: "paginatorPosition", paginatorDropdownAppendTo: "paginatorDropdownAppendTo", paginatorDropdownScrollHeight: "paginatorDropdownScrollHeight", currentPageReportTemplate: "currentPageReportTemplate", showCurrentPageReport: "showCurrentPageReport", showJumpToPageDropdown: "showJumpToPageDropdown", showFirstLastIcon: "showFirstLastIcon", showPageLinks: "showPageLinks", defaultSortOrder: "defaultSortOrder", sortMode: "sortMode", resetPageOnSort: "resetPageOnSort", selectionMode: "selectionMode", contextMenuSelection: "contextMenuSelection", contextMenuSelectionMode: "contextMenuSelectionMode", dataKey: "dataKey", metaKeySelection: "metaKeySelection", rowTrackBy: "rowTrackBy", lazy: "lazy", lazyLoadOnInit: "lazyLoadOnInit", compareSelectionBy: "compareSelectionBy", csvSeparator: "csvSeparator", exportFilename: "exportFilename", filters: "filters", globalFilterFields: "globalFilterFields", filterDelay: "filterDelay", filterLocale: "filterLocale", expandedRowKeys: "expandedRowKeys", editingRowKeys: "editingRowKeys", rowExpandMode: "rowExpandMode", scrollable: "scrollable", scrollDirection: "scrollDirection", rowGroupMode: "rowGroupMode", scrollHeight: "scrollHeight", virtualScroll: "virtualScroll", virtualScrollDelay: "virtualScrollDelay", virtualRowHeight: "virtualRowHeight", frozenWidth: "frozenWidth", responsive: "responsive", contextMenu: "contextMenu", resizableColumns: "resizableColumns", columnResizeMode: "columnResizeMode", reorderableColumns: "reorderableColumns", loading: "loading", loadingIcon: "loadingIcon", showLoader: "showLoader", rowHover: "rowHover", customSort: "customSort", showInitialSortBadge: "showInitialSortBadge", autoLayout: "autoLayout", exportFunction: "exportFunction", stateKey: "stateKey", stateStorage: "stateStorage", editMode: "editMode", groupRowsBy: "groupRowsBy", minBufferPx: "minBufferPx", maxBufferPx: "maxBufferPx", responsiveLayout: "responsiveLayout", breakpoint: "breakpoint", value: "value", columns: "columns", first: "first", rows: "rows", totalRecords: "totalRecords", sortField: "sortField", sortOrder: "sortOrder", multiSortMeta: "multiSortMeta", selection: "selection" }, outputs: { selectionChange: "selectionChange", contextMenuSelectionChange: "contextMenuSelectionChange", onRowSelect: "onRowSelect", onRowUnselect: "onRowUnselect", onPage: "onPage", onSort: "onSort", onFilter: "onFilter", onLazyLoad: "onLazyLoad", onRowExpand: "onRowExpand", onRowCollapse: "onRowCollapse", onContextMenuSelect: "onContextMenuSelect", onColResize: "onColResize", onColReorder: "onColReorder", onRowReorder: "onRowReorder", onEditInit: "onEditInit", onEditComplete: "onEditComplete", onEditCancel: "onEditCancel", onHeaderCheckboxToggle: "onHeaderCheckboxToggle", sortFunction: "sortFunction", firstChange: "firstChange", rowsChange: "rowsChange", onStateSave: "onStateSave", onStateRestore: "onStateRestore" }, host: { classAttribute: "p-element" }, providers: [TableService], queries: [{ propertyName: "templates", predicate: i1.PrimeTemplate }], viewQueries: [{ propertyName: "containerViewChild", first: true, predicate: ["container"], descendants: true }, { propertyName: "resizeHelperViewChild", first: true, predicate: ["resizeHelper"], descendants: true }, { propertyName: "reorderIndicatorUpViewChild", first: true, predicate: ["reorderIndicatorUp"], descendants: true }, { propertyName: "reorderIndicatorDownViewChild", first: true, predicate: ["reorderIndicatorDown"], descendants: true }, { propertyName: "wrapperViewChild", first: true, predicate: ["wrapper"], descendants: true }, { propertyName: "tableViewChild", first: true, predicate: ["table"], descendants: true }, { propertyName: "tableHeaderViewChild", first: true, predicate: ["tableHeader"], descendants: true }, { propertyName: "virtualScrollBody", first: true, predicate: i3.CdkVirtualScrollViewport, descendants: true }], usesOnChanges: true, ngImport: i0__namespace, template: "\n        <div #container [ngStyle]=\"style\" [class]=\"styleClass\"\n            [ngClass]=\"{'p-datatable p-component': true,\n                'p-datatable-hoverable-rows': (rowHover||selectionMode),\n                'p-datatable-auto-layout': autoLayout,\n                'p-datatable-resizable': resizableColumns,\n                'p-datatable-resizable-fit': (resizableColumns && columnResizeMode === 'fit'),\n                'p-datatable-scrollable': scrollable,\n                'p-datatable-scrollable-vertical': scrollable && scrollDirection === 'vertical',\n                'p-datatable-scrollable-horizontal': scrollable && scrollDirection === 'horizontal',\n                'p-datatable-scrollable-both': scrollable && scrollDirection === 'both',\n                'p-datatable-flex-scrollable': (scrollable && scrollHeight === 'flex'),\n                'p-datatable-responsive-stack': responsiveLayout === 'stack',\n                'p-datatable-responsive-scroll': responsiveLayout === 'scroll',\n                'p-datatable-responsive': responsive,\n                'p-datatable-grouped-header': headerGroupedTemplate != null,\n                'p-datatable-grouped-footer': footerGroupedTemplate != null}\" [attr.id]=\"id\">\n            <div class=\"p-datatable-loading-overlay p-component-overlay\" *ngIf=\"loading && showLoader\">\n                <i [class]=\"'p-datatable-loading-icon pi-spin ' + loadingIcon\"></i>\n            </div>\n            <div *ngIf=\"captionTemplate\" class=\"p-datatable-header\">\n                <ng-container *ngTemplateOutlet=\"captionTemplate\"></ng-container>\n            </div>\n            <p-paginator [rows]=\"rows\" [first]=\"first\" [totalRecords]=\"totalRecords\" [pageLinkSize]=\"pageLinks\" styleClass=\"p-paginator-top\" [alwaysShow]=\"alwaysShowPaginator\"\n                (onPageChange)=\"onPageChange($event)\" [rowsPerPageOptions]=\"rowsPerPageOptions\" *ngIf=\"paginator && (paginatorPosition === 'top' || paginatorPosition =='both')\"\n                [templateLeft]=\"paginatorLeftTemplate\" [templateRight]=\"paginatorRightTemplate\" [dropdownAppendTo]=\"paginatorDropdownAppendTo\" [dropdownScrollHeight]=\"paginatorDropdownScrollHeight\"\n                [currentPageReportTemplate]=\"currentPageReportTemplate\" [showFirstLastIcon]=\"showFirstLastIcon\" [dropdownItemTemplate]=\"paginatorDropdownItemTemplate\" [showCurrentPageReport]=\"showCurrentPageReport\" [showJumpToPageDropdown]=\"showJumpToPageDropdown\" [showPageLinks]=\"showPageLinks\"></p-paginator>\n\n            <div #wrapper class=\"p-datatable-wrapper\" [ngStyle]=\"{height: scrollHeight}\">\n                <table #table *ngIf=\"!virtualScroll\" role=\"table\" class=\"p-datatable-table\" [ngClass]=\"tableStyleClass\" [ngStyle]=\"tableStyle\">\n                    <ng-container *ngTemplateOutlet=\"colGroupTemplate; context {$implicit: columns}\"></ng-container>\n                    <thead class=\"p-datatable-thead\">\n                        <ng-container *ngTemplateOutlet=\"headerGroupedTemplate||headerTemplate; context: {$implicit: columns}\"></ng-container>\n                    </thead>\n                    <tbody class=\"p-datatable-tbody p-datatable-frozen-tbody\" *ngIf=\"frozenValue||frozenBodyTemplate\" [value]=\"frozenValue\" [frozenRows]=\"true\" [pTableBody]=\"columns\" [pTableBodyTemplate]=\"frozenBodyTemplate\" [frozen]=\"true\"></tbody>\n                    <tbody class=\"p-datatable-tbody\" [value]=\"dataToRender\" [pTableBody]=\"columns\" [pTableBodyTemplate]=\"bodyTemplate\"></tbody>\n                    <tfoot *ngIf=\"footerGroupedTemplate||footerTemplate\" class=\"p-datatable-tfoot\">\n                        <ng-container *ngTemplateOutlet=\"footerGroupedTemplate||footerTemplate; context {$implicit: columns}\"></ng-container>\n                    </tfoot>\n                </table>\n                <cdk-virtual-scroll-viewport *ngIf=\"virtualScroll\" [itemSize]=\"virtualRowHeight\" tabindex=\"0\" [style.height]=\"scrollHeight !== 'flex' ? scrollHeight : undefined\" [minBufferPx]=\"minBufferPx\" [maxBufferPx]=\"maxBufferPx\" (scrolledIndexChange)=\"onScrollIndexChange($event)\" class=\"p-datatable-virtual-scrollable-body\">\n                    <table #table role=\"table\" class=\"p-datatable-table\" [ngClass]=\"tableStyleClass\" [ngStyle]=\"tableStyle\">\n                        <ng-container *ngTemplateOutlet=\"colGroupTemplate; context {$implicit: columns}\"></ng-container>\n                        <thead #tableHeader class=\"p-datatable-thead\">\n                            <ng-container *ngTemplateOutlet=\"headerGroupedTemplate||headerTemplate; context: {$implicit: columns}\"></ng-container>\n                        </thead>\n                        <tbody class=\"p-datatable-tbody p-datatable-frozen-tbody\" *ngIf=\"frozenValue||frozenBodyTemplate\" [value]=\"frozenValue\" [frozenRows]=\"true\" [pTableBody]=\"columns\" [pTableBodyTemplate]=\"bodyTemplate\" [frozen]=\"true\"></tbody>\n                        <tbody class=\"p-datatable-tbody\" [value]=\"dataToRender\" [pTableBody]=\"columns\" [pTableBodyTemplate]=\"bodyTemplate\"></tbody>\n                        <tfoot *ngIf=\"footerGroupedTemplate||footerTemplate\" class=\"p-datatable-tfoot\">\n                            <ng-container *ngTemplateOutlet=\"footerGroupedTemplate||footerTemplate; context {$implicit: columns}\"></ng-container>\n                        </tfoot>\n                    </table>\n                </cdk-virtual-scroll-viewport>\n            </div>\n\n            <p-paginator [rows]=\"rows\" [first]=\"first\" [totalRecords]=\"totalRecords\" [pageLinkSize]=\"pageLinks\" styleClass=\"p-paginator-bottom\" [alwaysShow]=\"alwaysShowPaginator\"\n                (onPageChange)=\"onPageChange($event)\" [rowsPerPageOptions]=\"rowsPerPageOptions\" *ngIf=\"paginator && (paginatorPosition === 'bottom' || paginatorPosition =='both')\"\n                [templateLeft]=\"paginatorLeftTemplate\" [templateRight]=\"paginatorRightTemplate\" [dropdownAppendTo]=\"paginatorDropdownAppendTo\" [dropdownScrollHeight]=\"paginatorDropdownScrollHeight\"\n                [currentPageReportTemplate]=\"currentPageReportTemplate\" [showFirstLastIcon]=\"showFirstLastIcon\" [dropdownItemTemplate]=\"paginatorDropdownItemTemplate\" [showCurrentPageReport]=\"showCurrentPageReport\" [showJumpToPageDropdown]=\"showJumpToPageDropdown\" [showPageLinks]=\"showPageLinks\"></p-paginator>\n\n            <div *ngIf=\"summaryTemplate\" class=\"p-datatable-footer\">\n                <ng-container *ngTemplateOutlet=\"summaryTemplate\"></ng-container>\n            </div>\n\n            <div #resizeHelper class=\"p-column-resizer-helper\" style=\"display:none\" *ngIf=\"resizableColumns\"></div>\n            <span #reorderIndicatorUp class=\"pi pi-arrow-down p-datatable-reorder-indicator-up\" style=\"display:none\" *ngIf=\"reorderableColumns\"></span>\n            <span #reorderIndicatorDown class=\"pi pi-arrow-up p-datatable-reorder-indicator-down\" style=\"display:none\" *ngIf=\"reorderableColumns\"></span>\n        </div>\n    ", isInline: true, styles: [".p-datatable{position:relative}.p-datatable table{border-collapse:collapse;width:100%;table-layout:fixed}.p-datatable .p-sortable-column{cursor:pointer;-webkit-user-select:none;-ms-user-select:none;user-select:none}.p-datatable .p-sortable-column .p-column-title,.p-datatable .p-sortable-column .p-sortable-column-badge,.p-datatable .p-sortable-column .p-sortable-column-icon{vertical-align:middle}.p-datatable .p-sortable-column .p-sortable-column-badge{display:inline-flex;align-items:center;justify-content:center}.p-datatable-auto-layout>.p-datatable-wrapper{overflow-x:auto}.p-datatable-auto-layout>.p-datatable-wrapper>table{table-layout:auto}.p-datatable-responsive-scroll>.p-datatable-wrapper{overflow-x:auto}.p-datatable-auto-layout>.p-datatable-wrapper>table,.p-datatable-responsive-scroll>.p-datatable-wrapper>table{table-layout:auto}.p-datatable-hoverable-rows .p-selectable-row{cursor:pointer}.p-datatable-scrollable .p-datatable-wrapper{position:relative;overflow:auto}.p-datatable-scrollable .p-datatable-table,.p-datatable-scrollable .p-datatable-tbody,.p-datatable-scrollable .p-datatable-tfoot,.p-datatable-scrollable .p-datatable-thead{display:block}.p-datatable-scrollable .p-datatable-tbody>tr,.p-datatable-scrollable .p-datatable-tfoot>tr,.p-datatable-scrollable .p-datatable-thead>tr{display:flex;flex-wrap:nowrap;width:100%}.p-datatable-scrollable .p-datatable-tbody>tr>td,.p-datatable-scrollable .p-datatable-tfoot>tr>td,.p-datatable-scrollable .p-datatable-thead>tr>th{display:flex;flex:1 1 0;align-items:center}.p-datatable-scrollable .p-datatable-thead{position:sticky;top:0;z-index:1}.p-datatable-scrollable .p-datatable-frozen-tbody{position:sticky;z-index:1}.p-datatable-scrollable .p-datatable-tfoot{position:sticky;bottom:0;z-index:1}.p-datatable-scrollable .p-frozen-column{position:sticky;background:inherit}.p-datatable-scrollable th.p-frozen-column{z-index:1}.p-datatable-scrollable-both .p-datatable-tbody>tr>td,.p-datatable-scrollable-both .p-datatable-tfoot>tr>td,.p-datatable-scrollable-both .p-datatable-thead>tr>th,.p-datatable-scrollable-horizontal .p-datatable-tfoot>tr>td,.p-datatable-scrollable-horizontal .p-datatable-thead>tr>th\n.p-datatable-scrollable-horizontal .p-datatable-tbody>tr>td{flex:0 0 auto}.p-datatable-flex-scrollable .p-datatable-wrapper{display:flex;flex-direction:column;flex:1;height:100%}.p-datatable-scrollable .p-rowgroup-header{position:sticky;z-index:1}.p-datatable-scrollable.p-datatable-grouped-footer .p-datatable-tfoot,.p-datatable-scrollable.p-datatable-grouped-header .p-datatable-thead{display:table;border-collapse:collapse;width:100%;table-layout:fixed}.p-datatable-scrollable.p-datatable-grouped-footer .p-datatable-tfoot>tr,.p-datatable-scrollable.p-datatable-grouped-header .p-datatable-thead>tr{display:table-row}.p-datatable-scrollable.p-datatable-grouped-footer .p-datatable-tfoot>tr>td,.p-datatable-scrollable.p-datatable-grouped-header .p-datatable-thead>tr>th{display:table-cell}.p-datatable-flex-scrollable{display:flex;flex-direction:column;flex:1;height:100%}.p-datatable-flex-scrollable .p-datatable-virtual-scrollable-body{flex:1}.p-datatable-resizable>.p-datatable-wrapper{overflow-x:auto}.p-datatable-resizable .p-datatable-tbody>tr>td,.p-datatable-resizable .p-datatable-tfoot>tr>td,.p-datatable-resizable .p-datatable-thead>tr>th{overflow:hidden;white-space:nowrap}.p-datatable-resizable .p-resizable-column{background-clip:padding-box;position:relative}.p-datatable-resizable-fit .p-resizable-column:last-child .p-column-resizer{display:none}.p-datatable .p-column-resizer{display:block;position:absolute!important;top:0;right:0;margin:0;width:.5rem;height:100%;padding:0;cursor:col-resize;border:1px solid transparent}.p-datatable .p-column-resizer-helper{width:1px;position:absolute;z-index:10;display:none}.p-datatable .p-row-editor-cancel,.p-datatable .p-row-editor-init,.p-datatable .p-row-editor-save,.p-datatable .p-row-toggler{display:inline-flex;align-items:center;justify-content:center;overflow:hidden;position:relative}.p-datatable-reorder-indicator-down,.p-datatable-reorder-indicator-up{position:absolute;display:none}.p-datatable-reorderablerow-handle,[pReorderableColumn]{cursor:move}.p-datatable .p-datatable-loading-overlay{position:absolute;display:flex;align-items:center;justify-content:center;z-index:2}.p-column-filter-row{display:flex;align-items:center;width:100%}.p-column-filter-menu{display:inline-flex}.p-column-filter-row p-columnfilterformelement{flex:1 1 auto;width:1%}.p-column-filter-clear-button,.p-column-filter-menu-button{display:inline-flex;justify-content:center;align-items:center;cursor:pointer;text-decoration:none;overflow:hidden;position:relative}.p-column-filter-overlay{position:absolute;top:0;left:0}.p-column-filter-row-items{margin:0;padding:0;list-style:none}.p-column-filter-row-item{cursor:pointer}.p-column-filter-add-button,.p-column-filter-remove-button{justify-content:center}.p-column-filter-add-button .p-button-label,.p-column-filter-remove-button .p-button-label{flex-grow:0}.p-column-filter-buttonbar{display:flex;align-items:center;justify-content:space-between}.p-column-filter-buttonbar .p-button{width:auto}.p-datatable .p-datatable-tbody>tr>td>.p-column-title{display:none}cdk-virtual-scroll-viewport{outline:0 none}"], components: [{ type: i0__namespace.forwardRef(function () { return i2__namespace.Paginator; }), selector: "p-paginator", inputs: ["pageLinkSize", "style", "styleClass", "alwaysShow", "templateLeft", "templateRight", "dropdownAppendTo", "dropdownScrollHeight", "currentPageReportTemplate", "showCurrentPageReport", "showFirstLastIcon", "totalRecords", "rows", "rowsPerPageOptions", "showJumpToPageDropdown", "showPageLinks", "dropdownItemTemplate", "first"], outputs: ["onPageChange"] }, { type: i0__namespace.forwardRef(function () { return TableBody; }), selector: "[pTableBody]", inputs: ["pTableBody", "pTableBodyTemplate", "value", "frozen", "frozenRows"] }, { type: i0__namespace.forwardRef(function () { return i3__namespace.CdkVirtualScrollViewport; }), selector: "cdk-virtual-scroll-viewport", inputs: ["orientation"], outputs: ["scrolledIndexChange"] }], directives: [{ type: i0__namespace.forwardRef(function () { return i4__namespace.NgStyle; }), selector: "[ngStyle]", inputs: ["ngStyle"] }, { type: i0__namespace.forwardRef(function () { return i4__namespace.NgClass; }), selector: "[ngClass]", inputs: ["class", "ngClass"] }, { type: i0__namespace.forwardRef(function () { return i4__namespace.NgIf; }), selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i0__namespace.forwardRef(function () { return i4__namespace.NgTemplateOutlet; }), selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet"] }, { type: i0__namespace.forwardRef(function () { return i3__namespace.CdkFixedSizeVirtualScroll; }), selector: "cdk-virtual-scroll-viewport[itemSize]", inputs: ["itemSize", "minBufferPx", "maxBufferPx"] }], changeDetection: i0__namespace.ChangeDetectionStrategy.Default, encapsulation: i0__namespace.ViewEncapsulation.None });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0__namespace, type: Table, decorators: [{
                type: i0.Component,
                args: [{
                        selector: 'p-table',
                        template: "\n        <div #container [ngStyle]=\"style\" [class]=\"styleClass\"\n            [ngClass]=\"{'p-datatable p-component': true,\n                'p-datatable-hoverable-rows': (rowHover||selectionMode),\n                'p-datatable-auto-layout': autoLayout,\n                'p-datatable-resizable': resizableColumns,\n                'p-datatable-resizable-fit': (resizableColumns && columnResizeMode === 'fit'),\n                'p-datatable-scrollable': scrollable,\n                'p-datatable-scrollable-vertical': scrollable && scrollDirection === 'vertical',\n                'p-datatable-scrollable-horizontal': scrollable && scrollDirection === 'horizontal',\n                'p-datatable-scrollable-both': scrollable && scrollDirection === 'both',\n                'p-datatable-flex-scrollable': (scrollable && scrollHeight === 'flex'),\n                'p-datatable-responsive-stack': responsiveLayout === 'stack',\n                'p-datatable-responsive-scroll': responsiveLayout === 'scroll',\n                'p-datatable-responsive': responsive,\n                'p-datatable-grouped-header': headerGroupedTemplate != null,\n                'p-datatable-grouped-footer': footerGroupedTemplate != null}\" [attr.id]=\"id\">\n            <div class=\"p-datatable-loading-overlay p-component-overlay\" *ngIf=\"loading && showLoader\">\n                <i [class]=\"'p-datatable-loading-icon pi-spin ' + loadingIcon\"></i>\n            </div>\n            <div *ngIf=\"captionTemplate\" class=\"p-datatable-header\">\n                <ng-container *ngTemplateOutlet=\"captionTemplate\"></ng-container>\n            </div>\n            <p-paginator [rows]=\"rows\" [first]=\"first\" [totalRecords]=\"totalRecords\" [pageLinkSize]=\"pageLinks\" styleClass=\"p-paginator-top\" [alwaysShow]=\"alwaysShowPaginator\"\n                (onPageChange)=\"onPageChange($event)\" [rowsPerPageOptions]=\"rowsPerPageOptions\" *ngIf=\"paginator && (paginatorPosition === 'top' || paginatorPosition =='both')\"\n                [templateLeft]=\"paginatorLeftTemplate\" [templateRight]=\"paginatorRightTemplate\" [dropdownAppendTo]=\"paginatorDropdownAppendTo\" [dropdownScrollHeight]=\"paginatorDropdownScrollHeight\"\n                [currentPageReportTemplate]=\"currentPageReportTemplate\" [showFirstLastIcon]=\"showFirstLastIcon\" [dropdownItemTemplate]=\"paginatorDropdownItemTemplate\" [showCurrentPageReport]=\"showCurrentPageReport\" [showJumpToPageDropdown]=\"showJumpToPageDropdown\" [showPageLinks]=\"showPageLinks\"></p-paginator>\n\n            <div #wrapper class=\"p-datatable-wrapper\" [ngStyle]=\"{height: scrollHeight}\">\n                <table #table *ngIf=\"!virtualScroll\" role=\"table\" class=\"p-datatable-table\" [ngClass]=\"tableStyleClass\" [ngStyle]=\"tableStyle\">\n                    <ng-container *ngTemplateOutlet=\"colGroupTemplate; context {$implicit: columns}\"></ng-container>\n                    <thead class=\"p-datatable-thead\">\n                        <ng-container *ngTemplateOutlet=\"headerGroupedTemplate||headerTemplate; context: {$implicit: columns}\"></ng-container>\n                    </thead>\n                    <tbody class=\"p-datatable-tbody p-datatable-frozen-tbody\" *ngIf=\"frozenValue||frozenBodyTemplate\" [value]=\"frozenValue\" [frozenRows]=\"true\" [pTableBody]=\"columns\" [pTableBodyTemplate]=\"frozenBodyTemplate\" [frozen]=\"true\"></tbody>\n                    <tbody class=\"p-datatable-tbody\" [value]=\"dataToRender\" [pTableBody]=\"columns\" [pTableBodyTemplate]=\"bodyTemplate\"></tbody>\n                    <tfoot *ngIf=\"footerGroupedTemplate||footerTemplate\" class=\"p-datatable-tfoot\">\n                        <ng-container *ngTemplateOutlet=\"footerGroupedTemplate||footerTemplate; context {$implicit: columns}\"></ng-container>\n                    </tfoot>\n                </table>\n                <cdk-virtual-scroll-viewport *ngIf=\"virtualScroll\" [itemSize]=\"virtualRowHeight\" tabindex=\"0\" [style.height]=\"scrollHeight !== 'flex' ? scrollHeight : undefined\" [minBufferPx]=\"minBufferPx\" [maxBufferPx]=\"maxBufferPx\" (scrolledIndexChange)=\"onScrollIndexChange($event)\" class=\"p-datatable-virtual-scrollable-body\">\n                    <table #table role=\"table\" class=\"p-datatable-table\" [ngClass]=\"tableStyleClass\" [ngStyle]=\"tableStyle\">\n                        <ng-container *ngTemplateOutlet=\"colGroupTemplate; context {$implicit: columns}\"></ng-container>\n                        <thead #tableHeader class=\"p-datatable-thead\">\n                            <ng-container *ngTemplateOutlet=\"headerGroupedTemplate||headerTemplate; context: {$implicit: columns}\"></ng-container>\n                        </thead>\n                        <tbody class=\"p-datatable-tbody p-datatable-frozen-tbody\" *ngIf=\"frozenValue||frozenBodyTemplate\" [value]=\"frozenValue\" [frozenRows]=\"true\" [pTableBody]=\"columns\" [pTableBodyTemplate]=\"bodyTemplate\" [frozen]=\"true\"></tbody>\n                        <tbody class=\"p-datatable-tbody\" [value]=\"dataToRender\" [pTableBody]=\"columns\" [pTableBodyTemplate]=\"bodyTemplate\"></tbody>\n                        <tfoot *ngIf=\"footerGroupedTemplate||footerTemplate\" class=\"p-datatable-tfoot\">\n                            <ng-container *ngTemplateOutlet=\"footerGroupedTemplate||footerTemplate; context {$implicit: columns}\"></ng-container>\n                        </tfoot>\n                    </table>\n                </cdk-virtual-scroll-viewport>\n            </div>\n\n            <p-paginator [rows]=\"rows\" [first]=\"first\" [totalRecords]=\"totalRecords\" [pageLinkSize]=\"pageLinks\" styleClass=\"p-paginator-bottom\" [alwaysShow]=\"alwaysShowPaginator\"\n                (onPageChange)=\"onPageChange($event)\" [rowsPerPageOptions]=\"rowsPerPageOptions\" *ngIf=\"paginator && (paginatorPosition === 'bottom' || paginatorPosition =='both')\"\n                [templateLeft]=\"paginatorLeftTemplate\" [templateRight]=\"paginatorRightTemplate\" [dropdownAppendTo]=\"paginatorDropdownAppendTo\" [dropdownScrollHeight]=\"paginatorDropdownScrollHeight\"\n                [currentPageReportTemplate]=\"currentPageReportTemplate\" [showFirstLastIcon]=\"showFirstLastIcon\" [dropdownItemTemplate]=\"paginatorDropdownItemTemplate\" [showCurrentPageReport]=\"showCurrentPageReport\" [showJumpToPageDropdown]=\"showJumpToPageDropdown\" [showPageLinks]=\"showPageLinks\"></p-paginator>\n\n            <div *ngIf=\"summaryTemplate\" class=\"p-datatable-footer\">\n                <ng-container *ngTemplateOutlet=\"summaryTemplate\"></ng-container>\n            </div>\n\n            <div #resizeHelper class=\"p-column-resizer-helper\" style=\"display:none\" *ngIf=\"resizableColumns\"></div>\n            <span #reorderIndicatorUp class=\"pi pi-arrow-down p-datatable-reorder-indicator-up\" style=\"display:none\" *ngIf=\"reorderableColumns\"></span>\n            <span #reorderIndicatorDown class=\"pi pi-arrow-up p-datatable-reorder-indicator-down\" style=\"display:none\" *ngIf=\"reorderableColumns\"></span>\n        </div>\n    ",
                        providers: [TableService],
                        changeDetection: i0.ChangeDetectionStrategy.Default,
                        encapsulation: i0.ViewEncapsulation.None,
                        styleUrls: ['./table.css'],
                        host: {
                            'class': 'p-element'
                        }
                    }]
            }], ctorParameters: function () { return [{ type: i0__namespace.ElementRef }, { type: i0__namespace.NgZone }, { type: TableService }, { type: i0__namespace.ChangeDetectorRef }, { type: i1__namespace.FilterService }, { type: i1__namespace.OverlayService }]; }, propDecorators: { frozenColumns: [{
                    type: i0.Input
                }], frozenValue: [{
                    type: i0.Input
                }], style: [{
                    type: i0.Input
                }], styleClass: [{
                    type: i0.Input
                }], tableStyle: [{
                    type: i0.Input
                }], tableStyleClass: [{
                    type: i0.Input
                }], paginator: [{
                    type: i0.Input
                }], pageLinks: [{
                    type: i0.Input
                }], rowsPerPageOptions: [{
                    type: i0.Input
                }], alwaysShowPaginator: [{
                    type: i0.Input
                }], paginatorPosition: [{
                    type: i0.Input
                }], paginatorDropdownAppendTo: [{
                    type: i0.Input
                }], paginatorDropdownScrollHeight: [{
                    type: i0.Input
                }], currentPageReportTemplate: [{
                    type: i0.Input
                }], showCurrentPageReport: [{
                    type: i0.Input
                }], showJumpToPageDropdown: [{
                    type: i0.Input
                }], showFirstLastIcon: [{
                    type: i0.Input
                }], showPageLinks: [{
                    type: i0.Input
                }], defaultSortOrder: [{
                    type: i0.Input
                }], sortMode: [{
                    type: i0.Input
                }], resetPageOnSort: [{
                    type: i0.Input
                }], selectionMode: [{
                    type: i0.Input
                }], selectionChange: [{
                    type: i0.Output
                }], contextMenuSelection: [{
                    type: i0.Input
                }], contextMenuSelectionChange: [{
                    type: i0.Output
                }], contextMenuSelectionMode: [{
                    type: i0.Input
                }], dataKey: [{
                    type: i0.Input
                }], metaKeySelection: [{
                    type: i0.Input
                }], rowTrackBy: [{
                    type: i0.Input
                }], lazy: [{
                    type: i0.Input
                }], lazyLoadOnInit: [{
                    type: i0.Input
                }], compareSelectionBy: [{
                    type: i0.Input
                }], csvSeparator: [{
                    type: i0.Input
                }], exportFilename: [{
                    type: i0.Input
                }], filters: [{
                    type: i0.Input
                }], globalFilterFields: [{
                    type: i0.Input
                }], filterDelay: [{
                    type: i0.Input
                }], filterLocale: [{
                    type: i0.Input
                }], expandedRowKeys: [{
                    type: i0.Input
                }], editingRowKeys: [{
                    type: i0.Input
                }], rowExpandMode: [{
                    type: i0.Input
                }], scrollable: [{
                    type: i0.Input
                }], scrollDirection: [{
                    type: i0.Input
                }], rowGroupMode: [{
                    type: i0.Input
                }], scrollHeight: [{
                    type: i0.Input
                }], virtualScroll: [{
                    type: i0.Input
                }], virtualScrollDelay: [{
                    type: i0.Input
                }], virtualRowHeight: [{
                    type: i0.Input
                }], frozenWidth: [{
                    type: i0.Input
                }], responsive: [{
                    type: i0.Input
                }], contextMenu: [{
                    type: i0.Input
                }], resizableColumns: [{
                    type: i0.Input
                }], columnResizeMode: [{
                    type: i0.Input
                }], reorderableColumns: [{
                    type: i0.Input
                }], loading: [{
                    type: i0.Input
                }], loadingIcon: [{
                    type: i0.Input
                }], showLoader: [{
                    type: i0.Input
                }], rowHover: [{
                    type: i0.Input
                }], customSort: [{
                    type: i0.Input
                }], showInitialSortBadge: [{
                    type: i0.Input
                }], autoLayout: [{
                    type: i0.Input
                }], exportFunction: [{
                    type: i0.Input
                }], stateKey: [{
                    type: i0.Input
                }], stateStorage: [{
                    type: i0.Input
                }], editMode: [{
                    type: i0.Input
                }], groupRowsBy: [{
                    type: i0.Input
                }], minBufferPx: [{
                    type: i0.Input
                }], maxBufferPx: [{
                    type: i0.Input
                }], responsiveLayout: [{
                    type: i0.Input
                }], breakpoint: [{
                    type: i0.Input
                }], onRowSelect: [{
                    type: i0.Output
                }], onRowUnselect: [{
                    type: i0.Output
                }], onPage: [{
                    type: i0.Output
                }], onSort: [{
                    type: i0.Output
                }], onFilter: [{
                    type: i0.Output
                }], onLazyLoad: [{
                    type: i0.Output
                }], onRowExpand: [{
                    type: i0.Output
                }], onRowCollapse: [{
                    type: i0.Output
                }], onContextMenuSelect: [{
                    type: i0.Output
                }], onColResize: [{
                    type: i0.Output
                }], onColReorder: [{
                    type: i0.Output
                }], onRowReorder: [{
                    type: i0.Output
                }], onEditInit: [{
                    type: i0.Output
                }], onEditComplete: [{
                    type: i0.Output
                }], onEditCancel: [{
                    type: i0.Output
                }], onHeaderCheckboxToggle: [{
                    type: i0.Output
                }], sortFunction: [{
                    type: i0.Output
                }], firstChange: [{
                    type: i0.Output
                }], rowsChange: [{
                    type: i0.Output
                }], onStateSave: [{
                    type: i0.Output
                }], onStateRestore: [{
                    type: i0.Output
                }], containerViewChild: [{
                    type: i0.ViewChild,
                    args: ['container']
                }], resizeHelperViewChild: [{
                    type: i0.ViewChild,
                    args: ['resizeHelper']
                }], reorderIndicatorUpViewChild: [{
                    type: i0.ViewChild,
                    args: ['reorderIndicatorUp']
                }], reorderIndicatorDownViewChild: [{
                    type: i0.ViewChild,
                    args: ['reorderIndicatorDown']
                }], wrapperViewChild: [{
                    type: i0.ViewChild,
                    args: ['wrapper']
                }], tableViewChild: [{
                    type: i0.ViewChild,
                    args: ['table']
                }], tableHeaderViewChild: [{
                    type: i0.ViewChild,
                    args: ['tableHeader']
                }], virtualScrollBody: [{
                    type: i0.ViewChild,
                    args: [i3.CdkVirtualScrollViewport]
                }], templates: [{
                    type: i0.ContentChildren,
                    args: [i1.PrimeTemplate]
                }], value: [{
                    type: i0.Input
                }], columns: [{
                    type: i0.Input
                }], first: [{
                    type: i0.Input
                }], rows: [{
                    type: i0.Input
                }], totalRecords: [{
                    type: i0.Input
                }], sortField: [{
                    type: i0.Input
                }], sortOrder: [{
                    type: i0.Input
                }], multiSortMeta: [{
                    type: i0.Input
                }], selection: [{
                    type: i0.Input
                }] } });
    var TableBody = /** @class */ (function () {
        function TableBody(dt, tableService, cd, el) {
            var _this = this;
            this.dt = dt;
            this.tableService = tableService;
            this.cd = cd;
            this.el = el;
            this.subscription = this.dt.tableService.valueSource$.subscribe(function () {
                if (_this.dt.virtualScroll) {
                    _this.cd.detectChanges();
                }
            });
        }
        Object.defineProperty(TableBody.prototype, "value", {
            get: function () {
                return this._value;
            },
            set: function (val) {
                this._value = val;
                if (this.frozenRows) {
                    this.updateFrozenRowStickyPosition();
                }
                if (this.dt.scrollable && this.dt.rowGroupMode === 'subheader') {
                    this.updateFrozenRowGroupHeaderStickyPosition();
                }
            },
            enumerable: false,
            configurable: true
        });
        TableBody.prototype.ngAfterViewInit = function () {
            if (this.frozenRows) {
                this.updateFrozenRowStickyPosition();
            }
            if (this.dt.scrollable && this.dt.rowGroupMode === 'subheader') {
                this.updateFrozenRowGroupHeaderStickyPosition();
            }
        };
        TableBody.prototype.shouldRenderRowGroupHeader = function (value, rowData, i) {
            var currentRowFieldData = utils.ObjectUtils.resolveFieldData(rowData, this.dt.groupRowsBy);
            var prevRowData = value[i - 1];
            if (prevRowData) {
                var previousRowFieldData = utils.ObjectUtils.resolveFieldData(prevRowData, this.dt.groupRowsBy);
                return currentRowFieldData !== previousRowFieldData;
            }
            else {
                return true;
            }
        };
        TableBody.prototype.shouldRenderRowGroupFooter = function (value, rowData, i) {
            var currentRowFieldData = utils.ObjectUtils.resolveFieldData(rowData, this.dt.groupRowsBy);
            var nextRowData = value[i + 1];
            if (nextRowData) {
                var nextRowFieldData = utils.ObjectUtils.resolveFieldData(nextRowData, this.dt.groupRowsBy);
                return currentRowFieldData !== nextRowFieldData;
            }
            else {
                return true;
            }
        };
        TableBody.prototype.shouldRenderRowspan = function (value, rowData, i) {
            var currentRowFieldData = utils.ObjectUtils.resolveFieldData(rowData, this.dt.groupRowsBy);
            var prevRowData = value[i - 1];
            if (prevRowData) {
                var previousRowFieldData = utils.ObjectUtils.resolveFieldData(prevRowData, this.dt.groupRowsBy);
                return currentRowFieldData !== previousRowFieldData;
            }
            else {
                return true;
            }
        };
        TableBody.prototype.calculateRowGroupSize = function (value, rowData, index) {
            var currentRowFieldData = utils.ObjectUtils.resolveFieldData(rowData, this.dt.groupRowsBy);
            var nextRowFieldData = currentRowFieldData;
            var groupRowSpan = 0;
            while (currentRowFieldData === nextRowFieldData) {
                groupRowSpan++;
                var nextRowData = value[++index];
                if (nextRowData) {
                    nextRowFieldData = utils.ObjectUtils.resolveFieldData(nextRowData, this.dt.groupRowsBy);
                }
                else {
                    break;
                }
            }
            return groupRowSpan === 1 ? null : groupRowSpan;
        };
        TableBody.prototype.ngOnDestroy = function () {
            if (this.subscription) {
                this.subscription.unsubscribe();
            }
        };
        TableBody.prototype.updateFrozenRowStickyPosition = function () {
            this.el.nativeElement.style.top = dom.DomHandler.getOuterHeight(this.el.nativeElement.previousElementSibling) + 'px';
        };
        TableBody.prototype.updateFrozenRowGroupHeaderStickyPosition = function () {
            if (this.el.nativeElement.previousElementSibling) {
                var tableHeaderHeight = dom.DomHandler.getOuterHeight(this.el.nativeElement.previousElementSibling);
                this.dt.rowGroupHeaderStyleObject.top = tableHeaderHeight + 'px';
            }
        };
        return TableBody;
    }());
    TableBody.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0__namespace, type: TableBody, deps: [{ token: Table }, { token: TableService }, { token: i0__namespace.ChangeDetectorRef }, { token: i0__namespace.ElementRef }], target: i0__namespace.ɵɵFactoryTarget.Component });
    TableBody.ɵcmp = i0__namespace.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.0.5", type: TableBody, selector: "[pTableBody]", inputs: { columns: ["pTableBody", "columns"], template: ["pTableBodyTemplate", "template"], value: "value", frozen: "frozen", frozenRows: "frozenRows" }, host: { classAttribute: "p-element" }, ngImport: i0__namespace, template: "\n        <ng-container *ngIf=\"!dt.expandedRowTemplate && !dt.virtualScroll\">\n            <ng-template ngFor let-rowData let-rowIndex=\"index\" [ngForOf]=\"value\" [ngForTrackBy]=\"dt.rowTrackBy\">\n                <ng-container *ngIf=\"dt.groupHeaderTemplate && dt.rowGroupMode === 'subheader' && shouldRenderRowGroupHeader(value, rowData, rowIndex)\" role=\"row\">\n                    <ng-container *ngTemplateOutlet=\"dt.groupHeaderTemplate; context: {$implicit: rowData, rowIndex: dt.paginator ? (dt.first + rowIndex) : rowIndex, columns: columns, editing: (dt.editMode === 'row' && dt.isRowEditing(rowData)), frozen: frozen}\"></ng-container>\n                </ng-container>\n                <ng-container *ngIf=\"dt.rowGroupMode !== 'rowspan'\">\n                    <ng-container *ngTemplateOutlet=\"template; context: {$implicit: rowData, rowIndex: dt.paginator ? (dt.first + rowIndex) : rowIndex, columns: columns, editing: (dt.editMode === 'row' && dt.isRowEditing(rowData)), frozen: frozen}\"></ng-container>\n                </ng-container>\n                <ng-container *ngIf=\"dt.rowGroupMode === 'rowspan'\">\n                    <ng-container *ngTemplateOutlet=\"template; context: {$implicit: rowData, rowIndex: dt.paginator ? (dt.first + rowIndex) : rowIndex, columns: columns, editing: (dt.editMode === 'row' && dt.isRowEditing(rowData)), frozen: frozen, rowgroup: shouldRenderRowspan(value, rowData, rowIndex), rowspan: calculateRowGroupSize(value, rowData, rowIndex)}\"></ng-container>\n                </ng-container>\n                <ng-container *ngIf=\"dt.groupFooterTemplate && dt.rowGroupMode === 'subheader' && shouldRenderRowGroupFooter(value, rowData, rowIndex)\" role=\"row\">\n                    <ng-container *ngTemplateOutlet=\"dt.groupFooterTemplate; context: {$implicit: rowData, rowIndex: dt.paginator ? (dt.first + rowIndex) : rowIndex, columns: columns, editing: (dt.editMode === 'row' && dt.isRowEditing(rowData)), frozen: frozen}\"></ng-container>\n                </ng-container>\n            </ng-template>\n        </ng-container>\n        <ng-container *ngIf=\"!dt.expandedRowTemplate && dt.virtualScroll\">\n            <ng-template cdkVirtualFor let-rowData let-rowIndex=\"index\" [cdkVirtualForOf]=\"value\" [cdkVirtualForTrackBy]=\"dt.rowTrackBy\" [cdkVirtualForTemplateCacheSize]=\"0\">\n                <ng-container *ngTemplateOutlet=\"rowData ? template: dt.loadingBodyTemplate; context: {$implicit: rowData, rowIndex: dt.paginator ? (dt.first + rowIndex) : rowIndex, columns: columns, editing: (dt.editMode === 'row' && dt.isRowEditing(rowData)), frozen: frozen}\"></ng-container>\n            </ng-template>\n        </ng-container>\n        <ng-container *ngIf=\"dt.expandedRowTemplate && !(frozen && dt.frozenExpandedRowTemplate)\">\n            <ng-template ngFor let-rowData let-rowIndex=\"index\" [ngForOf]=\"value\" [ngForTrackBy]=\"dt.rowTrackBy\">\n                <ng-container *ngIf=\"!dt.groupHeaderTemplate\">\n                    <ng-container *ngTemplateOutlet=\"template; context: {$implicit: rowData, rowIndex: dt.paginator ? (dt.first + rowIndex) : rowIndex, columns: columns, expanded: dt.isRowExpanded(rowData), editing: (dt.editMode === 'row' && dt.isRowEditing(rowData)), frozen: frozen}\"></ng-container>\n                </ng-container>\n                <ng-container *ngIf=\"dt.groupHeaderTemplate && dt.rowGroupMode === 'subheader' && shouldRenderRowGroupHeader(value, rowData, rowIndex)\" role=\"row\">\n                    <ng-container *ngTemplateOutlet=\"dt.groupHeaderTemplate; context: {$implicit: rowData, rowIndex: dt.paginator ? (dt.first + rowIndex) : rowIndex, columns: columns, expanded: dt.isRowExpanded(rowData), editing: (dt.editMode === 'row' && dt.isRowEditing(rowData)), frozen: frozen}\"></ng-container>\n                </ng-container>\n                <ng-container *ngIf=\"dt.isRowExpanded(rowData)\">\n                    <ng-container *ngTemplateOutlet=\"dt.expandedRowTemplate; context: {$implicit: rowData, rowIndex: dt.paginator ? (dt.first + rowIndex) : rowIndex, columns: columns, frozen: frozen}\"></ng-container>\n                    <ng-container *ngIf=\"dt.groupFooterTemplate && dt.rowGroupMode === 'subheader' && shouldRenderRowGroupFooter(value, rowData, rowIndex)\" role=\"row\">\n                        <ng-container *ngTemplateOutlet=\"dt.groupFooterTemplate; context: {$implicit: rowData, rowIndex: dt.paginator ? (dt.first + rowIndex) : rowIndex, columns: columns, expanded: dt.isRowExpanded(rowData), editing: (dt.editMode === 'row' && dt.isRowEditing(rowData)), frozen: frozen}\"></ng-container>\n                    </ng-container>\n                </ng-container>\n            </ng-template>\n        </ng-container>\n        <ng-container *ngIf=\"dt.frozenExpandedRowTemplate && frozen\">\n            <ng-template ngFor let-rowData let-rowIndex=\"index\" [ngForOf]=\"value\" [ngForTrackBy]=\"dt.rowTrackBy\">\n                <ng-container *ngTemplateOutlet=\"template; context: {$implicit: rowData, rowIndex: dt.paginator ? (dt.first + rowIndex) : rowIndex, columns: columns, expanded: dt.isRowExpanded(rowData), editing: (dt.editMode === 'row' && dt.isRowEditing(rowData)), frozen: frozen}\"></ng-container>\n                <ng-container *ngIf=\"dt.isRowExpanded(rowData)\">\n                    <ng-container *ngTemplateOutlet=\"dt.frozenExpandedRowTemplate; context: {$implicit: rowData, rowIndex: dt.paginator ? (dt.first + rowIndex) : rowIndex, columns: columns, frozen: frozen}\"></ng-container>\n                </ng-container>\n            </ng-template>\n        </ng-container>\n        <ng-container *ngIf=\"dt.loading\">\n            <ng-container *ngTemplateOutlet=\"dt.loadingBodyTemplate; context: {$implicit: columns, frozen: frozen}\"></ng-container>\n        </ng-container>\n        <ng-container *ngIf=\"dt.isEmpty() && !dt.loading\">\n            <ng-container *ngTemplateOutlet=\"dt.emptyMessageTemplate; context: {$implicit: columns, frozen: frozen}\"></ng-container>\n        </ng-container>\n    ", isInline: true, directives: [{ type: i4__namespace.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i4__namespace.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { type: i4__namespace.NgTemplateOutlet, selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet"] }, { type: i3__namespace.CdkVirtualForOf, selector: "[cdkVirtualFor][cdkVirtualForOf]", inputs: ["cdkVirtualForOf", "cdkVirtualForTrackBy", "cdkVirtualForTemplate", "cdkVirtualForTemplateCacheSize"] }], changeDetection: i0__namespace.ChangeDetectionStrategy.Default, encapsulation: i0__namespace.ViewEncapsulation.None });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0__namespace, type: TableBody, decorators: [{
                type: i0.Component,
                args: [{
                        selector: '[pTableBody]',
                        template: "\n        <ng-container *ngIf=\"!dt.expandedRowTemplate && !dt.virtualScroll\">\n            <ng-template ngFor let-rowData let-rowIndex=\"index\" [ngForOf]=\"value\" [ngForTrackBy]=\"dt.rowTrackBy\">\n                <ng-container *ngIf=\"dt.groupHeaderTemplate && dt.rowGroupMode === 'subheader' && shouldRenderRowGroupHeader(value, rowData, rowIndex)\" role=\"row\">\n                    <ng-container *ngTemplateOutlet=\"dt.groupHeaderTemplate; context: {$implicit: rowData, rowIndex: dt.paginator ? (dt.first + rowIndex) : rowIndex, columns: columns, editing: (dt.editMode === 'row' && dt.isRowEditing(rowData)), frozen: frozen}\"></ng-container>\n                </ng-container>\n                <ng-container *ngIf=\"dt.rowGroupMode !== 'rowspan'\">\n                    <ng-container *ngTemplateOutlet=\"template; context: {$implicit: rowData, rowIndex: dt.paginator ? (dt.first + rowIndex) : rowIndex, columns: columns, editing: (dt.editMode === 'row' && dt.isRowEditing(rowData)), frozen: frozen}\"></ng-container>\n                </ng-container>\n                <ng-container *ngIf=\"dt.rowGroupMode === 'rowspan'\">\n                    <ng-container *ngTemplateOutlet=\"template; context: {$implicit: rowData, rowIndex: dt.paginator ? (dt.first + rowIndex) : rowIndex, columns: columns, editing: (dt.editMode === 'row' && dt.isRowEditing(rowData)), frozen: frozen, rowgroup: shouldRenderRowspan(value, rowData, rowIndex), rowspan: calculateRowGroupSize(value, rowData, rowIndex)}\"></ng-container>\n                </ng-container>\n                <ng-container *ngIf=\"dt.groupFooterTemplate && dt.rowGroupMode === 'subheader' && shouldRenderRowGroupFooter(value, rowData, rowIndex)\" role=\"row\">\n                    <ng-container *ngTemplateOutlet=\"dt.groupFooterTemplate; context: {$implicit: rowData, rowIndex: dt.paginator ? (dt.first + rowIndex) : rowIndex, columns: columns, editing: (dt.editMode === 'row' && dt.isRowEditing(rowData)), frozen: frozen}\"></ng-container>\n                </ng-container>\n            </ng-template>\n        </ng-container>\n        <ng-container *ngIf=\"!dt.expandedRowTemplate && dt.virtualScroll\">\n            <ng-template cdkVirtualFor let-rowData let-rowIndex=\"index\" [cdkVirtualForOf]=\"value\" [cdkVirtualForTrackBy]=\"dt.rowTrackBy\" [cdkVirtualForTemplateCacheSize]=\"0\">\n                <ng-container *ngTemplateOutlet=\"rowData ? template: dt.loadingBodyTemplate; context: {$implicit: rowData, rowIndex: dt.paginator ? (dt.first + rowIndex) : rowIndex, columns: columns, editing: (dt.editMode === 'row' && dt.isRowEditing(rowData)), frozen: frozen}\"></ng-container>\n            </ng-template>\n        </ng-container>\n        <ng-container *ngIf=\"dt.expandedRowTemplate && !(frozen && dt.frozenExpandedRowTemplate)\">\n            <ng-template ngFor let-rowData let-rowIndex=\"index\" [ngForOf]=\"value\" [ngForTrackBy]=\"dt.rowTrackBy\">\n                <ng-container *ngIf=\"!dt.groupHeaderTemplate\">\n                    <ng-container *ngTemplateOutlet=\"template; context: {$implicit: rowData, rowIndex: dt.paginator ? (dt.first + rowIndex) : rowIndex, columns: columns, expanded: dt.isRowExpanded(rowData), editing: (dt.editMode === 'row' && dt.isRowEditing(rowData)), frozen: frozen}\"></ng-container>\n                </ng-container>\n                <ng-container *ngIf=\"dt.groupHeaderTemplate && dt.rowGroupMode === 'subheader' && shouldRenderRowGroupHeader(value, rowData, rowIndex)\" role=\"row\">\n                    <ng-container *ngTemplateOutlet=\"dt.groupHeaderTemplate; context: {$implicit: rowData, rowIndex: dt.paginator ? (dt.first + rowIndex) : rowIndex, columns: columns, expanded: dt.isRowExpanded(rowData), editing: (dt.editMode === 'row' && dt.isRowEditing(rowData)), frozen: frozen}\"></ng-container>\n                </ng-container>\n                <ng-container *ngIf=\"dt.isRowExpanded(rowData)\">\n                    <ng-container *ngTemplateOutlet=\"dt.expandedRowTemplate; context: {$implicit: rowData, rowIndex: dt.paginator ? (dt.first + rowIndex) : rowIndex, columns: columns, frozen: frozen}\"></ng-container>\n                    <ng-container *ngIf=\"dt.groupFooterTemplate && dt.rowGroupMode === 'subheader' && shouldRenderRowGroupFooter(value, rowData, rowIndex)\" role=\"row\">\n                        <ng-container *ngTemplateOutlet=\"dt.groupFooterTemplate; context: {$implicit: rowData, rowIndex: dt.paginator ? (dt.first + rowIndex) : rowIndex, columns: columns, expanded: dt.isRowExpanded(rowData), editing: (dt.editMode === 'row' && dt.isRowEditing(rowData)), frozen: frozen}\"></ng-container>\n                    </ng-container>\n                </ng-container>\n            </ng-template>\n        </ng-container>\n        <ng-container *ngIf=\"dt.frozenExpandedRowTemplate && frozen\">\n            <ng-template ngFor let-rowData let-rowIndex=\"index\" [ngForOf]=\"value\" [ngForTrackBy]=\"dt.rowTrackBy\">\n                <ng-container *ngTemplateOutlet=\"template; context: {$implicit: rowData, rowIndex: dt.paginator ? (dt.first + rowIndex) : rowIndex, columns: columns, expanded: dt.isRowExpanded(rowData), editing: (dt.editMode === 'row' && dt.isRowEditing(rowData)), frozen: frozen}\"></ng-container>\n                <ng-container *ngIf=\"dt.isRowExpanded(rowData)\">\n                    <ng-container *ngTemplateOutlet=\"dt.frozenExpandedRowTemplate; context: {$implicit: rowData, rowIndex: dt.paginator ? (dt.first + rowIndex) : rowIndex, columns: columns, frozen: frozen}\"></ng-container>\n                </ng-container>\n            </ng-template>\n        </ng-container>\n        <ng-container *ngIf=\"dt.loading\">\n            <ng-container *ngTemplateOutlet=\"dt.loadingBodyTemplate; context: {$implicit: columns, frozen: frozen}\"></ng-container>\n        </ng-container>\n        <ng-container *ngIf=\"dt.isEmpty() && !dt.loading\">\n            <ng-container *ngTemplateOutlet=\"dt.emptyMessageTemplate; context: {$implicit: columns, frozen: frozen}\"></ng-container>\n        </ng-container>\n    ",
                        changeDetection: i0.ChangeDetectionStrategy.Default,
                        encapsulation: i0.ViewEncapsulation.None,
                        host: {
                            'class': 'p-element'
                        }
                    }]
            }], ctorParameters: function () { return [{ type: Table }, { type: TableService }, { type: i0__namespace.ChangeDetectorRef }, { type: i0__namespace.ElementRef }]; }, propDecorators: { columns: [{
                    type: i0.Input,
                    args: ["pTableBody"]
                }], template: [{
                    type: i0.Input,
                    args: ["pTableBodyTemplate"]
                }], value: [{
                    type: i0.Input
                }], frozen: [{
                    type: i0.Input
                }], frozenRows: [{
                    type: i0.Input
                }] } });
    var RowGroupHeader = /** @class */ (function () {
        function RowGroupHeader(dt) {
            this.dt = dt;
        }
        Object.defineProperty(RowGroupHeader.prototype, "getFrozenRowGroupHeaderStickyPosition", {
            get: function () {
                return this.dt.rowGroupHeaderStyleObject ? this.dt.rowGroupHeaderStyleObject.top : '';
            },
            enumerable: false,
            configurable: true
        });
        return RowGroupHeader;
    }());
    RowGroupHeader.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0__namespace, type: RowGroupHeader, deps: [{ token: Table }], target: i0__namespace.ɵɵFactoryTarget.Directive });
    RowGroupHeader.ɵdir = i0__namespace.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "12.0.5", type: RowGroupHeader, selector: "[pRowGroupHeader]", host: { properties: { "style.top": "getFrozenRowGroupHeaderStickyPosition" }, classAttribute: "p-rowgroup-header p-element" }, ngImport: i0__namespace });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0__namespace, type: RowGroupHeader, decorators: [{
                type: i0.Directive,
                args: [{
                        selector: '[pRowGroupHeader]',
                        host: {
                            'class': 'p-rowgroup-header p-element',
                            '[style.top]': "getFrozenRowGroupHeaderStickyPosition"
                        }
                    }]
            }], ctorParameters: function () { return [{ type: Table }]; } });
    var FrozenColumn = /** @class */ (function () {
        function FrozenColumn(el) {
            this.el = el;
            this.alignFrozen = "left";
            this._frozen = true;
        }
        Object.defineProperty(FrozenColumn.prototype, "frozen", {
            get: function () {
                return this._frozen;
            },
            set: function (val) {
                this._frozen = val;
                this.updateStickyPosition();
            },
            enumerable: false,
            configurable: true
        });
        FrozenColumn.prototype.ngAfterViewInit = function () {
            this.updateStickyPosition();
        };
        FrozenColumn.prototype.updateStickyPosition = function () {
            if (this._frozen) {
                if (this.alignFrozen === 'right') {
                    var right = 0;
                    var next = this.el.nativeElement.nextElementSibling;
                    if (next) {
                        right = dom.DomHandler.getOuterWidth(next) + parseFloat(next.style.right);
                    }
                    this.el.nativeElement.style.right = right + 'px';
                }
                else {
                    var left = 0;
                    var prev = this.el.nativeElement.previousElementSibling;
                    if (prev) {
                        left = dom.DomHandler.getOuterWidth(prev) + parseFloat(prev.style.left);
                    }
                    this.el.nativeElement.style.left = left + 'px';
                }
                var filterRow = this.el.nativeElement.parentElement.nextElementSibling;
                if (filterRow) {
                    var index = dom.DomHandler.index(this.el.nativeElement);
                    filterRow.children[index].style.left = this.el.nativeElement.style.left;
                    filterRow.children[index].style.right = this.el.nativeElement.style.right;
                }
            }
        };
        return FrozenColumn;
    }());
    FrozenColumn.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0__namespace, type: FrozenColumn, deps: [{ token: i0__namespace.ElementRef }], target: i0__namespace.ɵɵFactoryTarget.Directive });
    FrozenColumn.ɵdir = i0__namespace.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "12.0.5", type: FrozenColumn, selector: "[pFrozenColumn]", inputs: { frozen: "frozen", alignFrozen: "alignFrozen" }, host: { properties: { "class.p-frozen-column": "frozen" }, classAttribute: "p-element" }, ngImport: i0__namespace });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0__namespace, type: FrozenColumn, decorators: [{
                type: i0.Directive,
                args: [{
                        selector: '[pFrozenColumn]',
                        host: {
                            'class': 'p-element',
                            '[class.p-frozen-column]': 'frozen'
                        }
                    }]
            }], ctorParameters: function () { return [{ type: i0__namespace.ElementRef }]; }, propDecorators: { frozen: [{
                    type: i0.Input
                }], alignFrozen: [{
                    type: i0.Input
                }] } });
    var SortableColumn = /** @class */ (function () {
        function SortableColumn(dt) {
            var _this = this;
            this.dt = dt;
            if (this.isEnabled()) {
                this.subscription = this.dt.tableService.sortSource$.subscribe(function (sortMeta) {
                    _this.updateSortState();
                });
            }
        }
        SortableColumn.prototype.ngOnInit = function () {
            if (this.isEnabled()) {
                this.updateSortState();
            }
        };
        SortableColumn.prototype.updateSortState = function () {
            this.sorted = this.dt.isSorted(this.field);
            this.sortOrder = this.sorted ? (this.dt.sortOrder === 1 ? 'ascending' : 'descending') : 'none';
        };
        SortableColumn.prototype.onClick = function (event) {
            if (this.isEnabled() && !this.isFilterElement(event.target)) {
                this.updateSortState();
                this.dt.sort({
                    originalEvent: event,
                    field: this.field
                });
                dom.DomHandler.clearSelection();
            }
        };
        SortableColumn.prototype.onEnterKey = function (event) {
            this.onClick(event);
        };
        SortableColumn.prototype.isEnabled = function () {
            return this.pSortableColumnDisabled !== true;
        };
        SortableColumn.prototype.isFilterElement = function (element) {
            return dom.DomHandler.hasClass(element, 'pi-filter-icon') || dom.DomHandler.hasClass(element, 'p-column-filter-menu-button');
        };
        SortableColumn.prototype.ngOnDestroy = function () {
            if (this.subscription) {
                this.subscription.unsubscribe();
            }
        };
        return SortableColumn;
    }());
    SortableColumn.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0__namespace, type: SortableColumn, deps: [{ token: Table }], target: i0__namespace.ɵɵFactoryTarget.Directive });
    SortableColumn.ɵdir = i0__namespace.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "12.0.5", type: SortableColumn, selector: "[pSortableColumn]", inputs: { field: ["pSortableColumn", "field"], pSortableColumnDisabled: "pSortableColumnDisabled" }, host: { listeners: { "click": "onClick($event)", "keydown.enter": "onEnterKey($event)" }, properties: { "class.p-sortable-column": "isEnabled()", "class.p-highlight": "sorted", "attr.tabindex": "isEnabled() ? \"0\" : null", "attr.role": "\"columnheader\"", "attr.aria-sort": "sortOrder" }, classAttribute: "p-element" }, ngImport: i0__namespace });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0__namespace, type: SortableColumn, decorators: [{
                type: i0.Directive,
                args: [{
                        selector: '[pSortableColumn]',
                        host: {
                            'class': 'p-element',
                            '[class.p-sortable-column]': 'isEnabled()',
                            '[class.p-highlight]': 'sorted',
                            '[attr.tabindex]': 'isEnabled() ? "0" : null',
                            '[attr.role]': '"columnheader"',
                            '[attr.aria-sort]': 'sortOrder'
                        }
                    }]
            }], ctorParameters: function () { return [{ type: Table }]; }, propDecorators: { field: [{
                    type: i0.Input,
                    args: ["pSortableColumn"]
                }], pSortableColumnDisabled: [{
                    type: i0.Input
                }], onClick: [{
                    type: i0.HostListener,
                    args: ['click', ['$event']]
                }], onEnterKey: [{
                    type: i0.HostListener,
                    args: ['keydown.enter', ['$event']]
                }] } });
    var SortIcon = /** @class */ (function () {
        function SortIcon(dt, cd) {
            var _this = this;
            this.dt = dt;
            this.cd = cd;
            this.subscription = this.dt.tableService.sortSource$.subscribe(function (sortMeta) {
                _this.updateSortState();
            });
        }
        SortIcon.prototype.ngOnInit = function () {
            this.updateSortState();
        };
        SortIcon.prototype.onClick = function (event) {
            event.preventDefault();
        };
        SortIcon.prototype.updateSortState = function () {
            if (this.dt.sortMode === 'single') {
                this.sortOrder = this.dt.isSorted(this.field) ? this.dt.sortOrder : 0;
            }
            else if (this.dt.sortMode === 'multiple') {
                var sortMeta = this.dt.getSortMeta(this.field);
                this.sortOrder = sortMeta ? sortMeta.order : 0;
            }
            this.cd.markForCheck();
        };
        SortIcon.prototype.getMultiSortMetaIndex = function () {
            var multiSortMeta = this.dt._multiSortMeta;
            var index = -1;
            if (multiSortMeta && this.dt.sortMode === 'multiple' && (this.dt.showInitialSortBadge || multiSortMeta.length > 1)) {
                for (var i = 0; i < multiSortMeta.length; i++) {
                    var meta = multiSortMeta[i];
                    if (meta.field === this.field || meta.field === this.field) {
                        index = i;
                        break;
                    }
                }
            }
            return index;
        };
        SortIcon.prototype.isMultiSorted = function () {
            return this.dt.sortMode === 'multiple' && this.getMultiSortMetaIndex() > -1;
        };
        SortIcon.prototype.ngOnDestroy = function () {
            if (this.subscription) {
                this.subscription.unsubscribe();
            }
        };
        return SortIcon;
    }());
    SortIcon.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0__namespace, type: SortIcon, deps: [{ token: Table }, { token: i0__namespace.ChangeDetectorRef }], target: i0__namespace.ɵɵFactoryTarget.Component });
    SortIcon.ɵcmp = i0__namespace.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.0.5", type: SortIcon, selector: "p-sortIcon", inputs: { field: "field" }, host: { classAttribute: "p-element" }, ngImport: i0__namespace, template: "\n        <i class=\"p-sortable-column-icon pi pi-fw\" [ngClass]=\"{'pi-sort-amount-up-alt': sortOrder === 1, 'pi-sort-amount-down': sortOrder === -1, 'pi-sort-alt': sortOrder === 0}\"></i>\n        <span *ngIf=\"isMultiSorted()\" class=\"p-sortable-column-badge\">{{getMultiSortMetaIndex() + 1}}</span>\n    ", isInline: true, directives: [{ type: i4__namespace.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { type: i4__namespace.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }], changeDetection: i0__namespace.ChangeDetectionStrategy.OnPush, encapsulation: i0__namespace.ViewEncapsulation.None });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0__namespace, type: SortIcon, decorators: [{
                type: i0.Component,
                args: [{
                        selector: 'p-sortIcon',
                        template: "\n        <i class=\"p-sortable-column-icon pi pi-fw\" [ngClass]=\"{'pi-sort-amount-up-alt': sortOrder === 1, 'pi-sort-amount-down': sortOrder === -1, 'pi-sort-alt': sortOrder === 0}\"></i>\n        <span *ngIf=\"isMultiSorted()\" class=\"p-sortable-column-badge\">{{getMultiSortMetaIndex() + 1}}</span>\n    ",
                        changeDetection: i0.ChangeDetectionStrategy.OnPush,
                        encapsulation: i0.ViewEncapsulation.None,
                        host: {
                            'class': 'p-element'
                        }
                    }]
            }], ctorParameters: function () { return [{ type: Table }, { type: i0__namespace.ChangeDetectorRef }]; }, propDecorators: { field: [{
                    type: i0.Input
                }] } });
    var SelectableRow = /** @class */ (function () {
        function SelectableRow(dt, tableService) {
            var _this = this;
            this.dt = dt;
            this.tableService = tableService;
            if (this.isEnabled()) {
                this.subscription = this.dt.tableService.selectionSource$.subscribe(function () {
                    _this.selected = _this.dt.isSelected(_this.data);
                });
            }
        }
        SelectableRow.prototype.ngOnInit = function () {
            if (this.isEnabled()) {
                this.selected = this.dt.isSelected(this.data);
            }
        };
        SelectableRow.prototype.onClick = function (event) {
            if (this.isEnabled()) {
                this.dt.handleRowClick({
                    originalEvent: event,
                    rowData: this.data,
                    rowIndex: this.index
                });
            }
        };
        SelectableRow.prototype.onTouchEnd = function (event) {
            if (this.isEnabled()) {
                this.dt.handleRowTouchEnd(event);
            }
        };
        SelectableRow.prototype.onArrowDownKeyDown = function (event) {
            if (!this.isEnabled()) {
                return;
            }
            var row = event.currentTarget;
            var nextRow = this.findNextSelectableRow(row);
            if (nextRow) {
                nextRow.focus();
            }
            event.preventDefault();
        };
        SelectableRow.prototype.onArrowUpKeyDown = function (event) {
            if (!this.isEnabled()) {
                return;
            }
            var row = event.currentTarget;
            var prevRow = this.findPrevSelectableRow(row);
            if (prevRow) {
                prevRow.focus();
            }
            event.preventDefault();
        };
        SelectableRow.prototype.onEnterKeyDown = function (event) {
            if (!this.isEnabled()) {
                return;
            }
            this.dt.handleRowClick({
                originalEvent: event,
                rowData: this.data,
                rowIndex: this.index
            });
        };
        SelectableRow.prototype.onPageDownKeyDown = function () {
            if (this.dt.virtualScroll) {
                this.dt.virtualScrollBody.elementRef.nativeElement.focus();
            }
        };
        SelectableRow.prototype.onSpaceKeydown = function () {
            if (this.dt.virtualScroll && !this.dt.editingCell) {
                this.dt.virtualScrollBody.elementRef.nativeElement.focus();
            }
        };
        SelectableRow.prototype.findNextSelectableRow = function (row) {
            var nextRow = row.nextElementSibling;
            if (nextRow) {
                if (dom.DomHandler.hasClass(nextRow, 'p-selectable-row'))
                    return nextRow;
                else
                    return this.findNextSelectableRow(nextRow);
            }
            else {
                return null;
            }
        };
        SelectableRow.prototype.findPrevSelectableRow = function (row) {
            var prevRow = row.previousElementSibling;
            if (prevRow) {
                if (dom.DomHandler.hasClass(prevRow, 'p-selectable-row'))
                    return prevRow;
                else
                    return this.findPrevSelectableRow(prevRow);
            }
            else {
                return null;
            }
        };
        SelectableRow.prototype.isEnabled = function () {
            return this.pSelectableRowDisabled !== true;
        };
        SelectableRow.prototype.ngOnDestroy = function () {
            if (this.subscription) {
                this.subscription.unsubscribe();
            }
        };
        return SelectableRow;
    }());
    SelectableRow.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0__namespace, type: SelectableRow, deps: [{ token: Table }, { token: TableService }], target: i0__namespace.ɵɵFactoryTarget.Directive });
    SelectableRow.ɵdir = i0__namespace.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "12.0.5", type: SelectableRow, selector: "[pSelectableRow]", inputs: { data: ["pSelectableRow", "data"], index: ["pSelectableRowIndex", "index"], pSelectableRowDisabled: "pSelectableRowDisabled" }, host: { listeners: { "click": "onClick($event)", "touchend": "onTouchEnd($event)", "keydown.arrowdown": "onArrowDownKeyDown($event)", "keydown.arrowup": "onArrowUpKeyDown($event)", "keydown.enter": "onEnterKeyDown($event)", "keydown.shift.enter": "onEnterKeyDown($event)", "keydown.meta.enter": "onEnterKeyDown($event)", "keydown.pagedown": "onPageDownKeyDown()", "keydown.pageup": "onPageDownKeyDown()", "keydown.home": "onPageDownKeyDown()", "keydown.end": "onPageDownKeyDown()", "keydown.space": "onSpaceKeydown()" }, properties: { "class.p-selectable-row": "isEnabled()", "class.p-highlight": "selected", "attr.tabindex": "isEnabled() ? 0 : undefined" }, classAttribute: "p-element" }, ngImport: i0__namespace });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0__namespace, type: SelectableRow, decorators: [{
                type: i0.Directive,
                args: [{
                        selector: '[pSelectableRow]',
                        host: {
                            'class': 'p-element',
                            '[class.p-selectable-row]': 'isEnabled()',
                            '[class.p-highlight]': 'selected',
                            '[attr.tabindex]': 'isEnabled() ? 0 : undefined'
                        }
                    }]
            }], ctorParameters: function () { return [{ type: Table }, { type: TableService }]; }, propDecorators: { data: [{
                    type: i0.Input,
                    args: ["pSelectableRow"]
                }], index: [{
                    type: i0.Input,
                    args: ["pSelectableRowIndex"]
                }], pSelectableRowDisabled: [{
                    type: i0.Input
                }], onClick: [{
                    type: i0.HostListener,
                    args: ['click', ['$event']]
                }], onTouchEnd: [{
                    type: i0.HostListener,
                    args: ['touchend', ['$event']]
                }], onArrowDownKeyDown: [{
                    type: i0.HostListener,
                    args: ['keydown.arrowdown', ['$event']]
                }], onArrowUpKeyDown: [{
                    type: i0.HostListener,
                    args: ['keydown.arrowup', ['$event']]
                }], onEnterKeyDown: [{
                    type: i0.HostListener,
                    args: ['keydown.enter', ['$event']]
                }, {
                    type: i0.HostListener,
                    args: ['keydown.shift.enter', ['$event']]
                }, {
                    type: i0.HostListener,
                    args: ['keydown.meta.enter', ['$event']]
                }], onPageDownKeyDown: [{
                    type: i0.HostListener,
                    args: ['keydown.pagedown']
                }, {
                    type: i0.HostListener,
                    args: ['keydown.pageup']
                }, {
                    type: i0.HostListener,
                    args: ['keydown.home']
                }, {
                    type: i0.HostListener,
                    args: ['keydown.end']
                }], onSpaceKeydown: [{
                    type: i0.HostListener,
                    args: ['keydown.space']
                }] } });
    var SelectableRowDblClick = /** @class */ (function () {
        function SelectableRowDblClick(dt, tableService) {
            var _this = this;
            this.dt = dt;
            this.tableService = tableService;
            if (this.isEnabled()) {
                this.subscription = this.dt.tableService.selectionSource$.subscribe(function () {
                    _this.selected = _this.dt.isSelected(_this.data);
                });
            }
        }
        SelectableRowDblClick.prototype.ngOnInit = function () {
            if (this.isEnabled()) {
                this.selected = this.dt.isSelected(this.data);
            }
        };
        SelectableRowDblClick.prototype.onClick = function (event) {
            if (this.isEnabled()) {
                this.dt.handleRowClick({
                    originalEvent: event,
                    rowData: this.data,
                    rowIndex: this.index
                });
            }
        };
        SelectableRowDblClick.prototype.isEnabled = function () {
            return this.pSelectableRowDisabled !== true;
        };
        SelectableRowDblClick.prototype.ngOnDestroy = function () {
            if (this.subscription) {
                this.subscription.unsubscribe();
            }
        };
        return SelectableRowDblClick;
    }());
    SelectableRowDblClick.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0__namespace, type: SelectableRowDblClick, deps: [{ token: Table }, { token: TableService }], target: i0__namespace.ɵɵFactoryTarget.Directive });
    SelectableRowDblClick.ɵdir = i0__namespace.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "12.0.5", type: SelectableRowDblClick, selector: "[pSelectableRowDblClick]", inputs: { data: ["pSelectableRowDblClick", "data"], index: ["pSelectableRowIndex", "index"], pSelectableRowDisabled: "pSelectableRowDisabled" }, host: { listeners: { "dblclick": "onClick($event)" }, properties: { "class.p-selectable-row": "isEnabled()", "class.p-highlight": "selected" }, classAttribute: "p-element" }, ngImport: i0__namespace });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0__namespace, type: SelectableRowDblClick, decorators: [{
                type: i0.Directive,
                args: [{
                        selector: '[pSelectableRowDblClick]',
                        host: {
                            'class': 'p-element',
                            '[class.p-selectable-row]': 'isEnabled()',
                            '[class.p-highlight]': 'selected'
                        }
                    }]
            }], ctorParameters: function () { return [{ type: Table }, { type: TableService }]; }, propDecorators: { data: [{
                    type: i0.Input,
                    args: ["pSelectableRowDblClick"]
                }], index: [{
                    type: i0.Input,
                    args: ["pSelectableRowIndex"]
                }], pSelectableRowDisabled: [{
                    type: i0.Input
                }], onClick: [{
                    type: i0.HostListener,
                    args: ['dblclick', ['$event']]
                }] } });
    var ContextMenuRow = /** @class */ (function () {
        function ContextMenuRow(dt, tableService, el) {
            var _this = this;
            this.dt = dt;
            this.tableService = tableService;
            this.el = el;
            if (this.isEnabled()) {
                this.subscription = this.dt.tableService.contextMenuSource$.subscribe(function (data) {
                    _this.selected = _this.dt.equals(_this.data, data);
                });
            }
        }
        ContextMenuRow.prototype.onContextMenu = function (event) {
            if (this.isEnabled()) {
                this.dt.handleRowRightClick({
                    originalEvent: event,
                    rowData: this.data,
                    rowIndex: this.index
                });
                this.el.nativeElement.focus();
                event.preventDefault();
            }
        };
        ContextMenuRow.prototype.isEnabled = function () {
            return this.pContextMenuRowDisabled !== true;
        };
        ContextMenuRow.prototype.ngOnDestroy = function () {
            if (this.subscription) {
                this.subscription.unsubscribe();
            }
        };
        return ContextMenuRow;
    }());
    ContextMenuRow.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0__namespace, type: ContextMenuRow, deps: [{ token: Table }, { token: TableService }, { token: i0__namespace.ElementRef }], target: i0__namespace.ɵɵFactoryTarget.Directive });
    ContextMenuRow.ɵdir = i0__namespace.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "12.0.5", type: ContextMenuRow, selector: "[pContextMenuRow]", inputs: { data: ["pContextMenuRow", "data"], index: ["pContextMenuRowIndex", "index"], pContextMenuRowDisabled: "pContextMenuRowDisabled" }, host: { listeners: { "contextmenu": "onContextMenu($event)" }, properties: { "class.p-highlight-contextmenu": "selected", "attr.tabindex": "isEnabled() ? 0 : undefined" }, classAttribute: "p-element" }, ngImport: i0__namespace });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0__namespace, type: ContextMenuRow, decorators: [{
                type: i0.Directive,
                args: [{
                        selector: '[pContextMenuRow]',
                        host: {
                            'class': 'p-element',
                            '[class.p-highlight-contextmenu]': 'selected',
                            '[attr.tabindex]': 'isEnabled() ? 0 : undefined'
                        }
                    }]
            }], ctorParameters: function () { return [{ type: Table }, { type: TableService }, { type: i0__namespace.ElementRef }]; }, propDecorators: { data: [{
                    type: i0.Input,
                    args: ["pContextMenuRow"]
                }], index: [{
                    type: i0.Input,
                    args: ["pContextMenuRowIndex"]
                }], pContextMenuRowDisabled: [{
                    type: i0.Input
                }], onContextMenu: [{
                    type: i0.HostListener,
                    args: ['contextmenu', ['$event']]
                }] } });
    var RowToggler = /** @class */ (function () {
        function RowToggler(dt) {
            this.dt = dt;
        }
        RowToggler.prototype.onClick = function (event) {
            if (this.isEnabled()) {
                this.dt.toggleRow(this.data, event);
                event.preventDefault();
            }
        };
        RowToggler.prototype.isEnabled = function () {
            return this.pRowTogglerDisabled !== true;
        };
        return RowToggler;
    }());
    RowToggler.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0__namespace, type: RowToggler, deps: [{ token: Table }], target: i0__namespace.ɵɵFactoryTarget.Directive });
    RowToggler.ɵdir = i0__namespace.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "12.0.5", type: RowToggler, selector: "[pRowToggler]", inputs: { data: ["pRowToggler", "data"], pRowTogglerDisabled: "pRowTogglerDisabled" }, host: { listeners: { "click": "onClick($event)" }, classAttribute: "p-element" }, ngImport: i0__namespace });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0__namespace, type: RowToggler, decorators: [{
                type: i0.Directive,
                args: [{
                        selector: '[pRowToggler]',
                        host: {
                            'class': 'p-element'
                        }
                    }]
            }], ctorParameters: function () { return [{ type: Table }]; }, propDecorators: { data: [{
                    type: i0.Input,
                    args: ['pRowToggler']
                }], pRowTogglerDisabled: [{
                    type: i0.Input
                }], onClick: [{
                    type: i0.HostListener,
                    args: ['click', ['$event']]
                }] } });
    var ResizableColumn = /** @class */ (function () {
        function ResizableColumn(dt, el, zone) {
            this.dt = dt;
            this.el = el;
            this.zone = zone;
        }
        ResizableColumn.prototype.ngAfterViewInit = function () {
            var _this = this;
            if (this.isEnabled()) {
                dom.DomHandler.addClass(this.el.nativeElement, 'p-resizable-column');
                this.resizer = document.createElement('span');
                this.resizer.className = 'p-column-resizer';
                this.el.nativeElement.appendChild(this.resizer);
                this.zone.runOutsideAngular(function () {
                    _this.resizerMouseDownListener = _this.onMouseDown.bind(_this);
                    _this.resizer.addEventListener('mousedown', _this.resizerMouseDownListener);
                });
            }
        };
        ResizableColumn.prototype.bindDocumentEvents = function () {
            var _this = this;
            this.zone.runOutsideAngular(function () {
                _this.documentMouseMoveListener = _this.onDocumentMouseMove.bind(_this);
                document.addEventListener('mousemove', _this.documentMouseMoveListener);
                _this.documentMouseUpListener = _this.onDocumentMouseUp.bind(_this);
                document.addEventListener('mouseup', _this.documentMouseUpListener);
            });
        };
        ResizableColumn.prototype.unbindDocumentEvents = function () {
            if (this.documentMouseMoveListener) {
                document.removeEventListener('mousemove', this.documentMouseMoveListener);
                this.documentMouseMoveListener = null;
            }
            if (this.documentMouseUpListener) {
                document.removeEventListener('mouseup', this.documentMouseUpListener);
                this.documentMouseUpListener = null;
            }
        };
        ResizableColumn.prototype.onMouseDown = function (event) {
            if (event.which === 1) {
                this.dt.onColumnResizeBegin(event);
                this.bindDocumentEvents();
            }
        };
        ResizableColumn.prototype.onDocumentMouseMove = function (event) {
            this.dt.onColumnResize(event);
        };
        ResizableColumn.prototype.onDocumentMouseUp = function (event) {
            this.dt.onColumnResizeEnd();
            this.unbindDocumentEvents();
        };
        ResizableColumn.prototype.isEnabled = function () {
            return this.pResizableColumnDisabled !== true;
        };
        ResizableColumn.prototype.ngOnDestroy = function () {
            if (this.resizerMouseDownListener) {
                this.resizer.removeEventListener('mousedown', this.resizerMouseDownListener);
            }
            this.unbindDocumentEvents();
        };
        return ResizableColumn;
    }());
    ResizableColumn.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0__namespace, type: ResizableColumn, deps: [{ token: Table }, { token: i0__namespace.ElementRef }, { token: i0__namespace.NgZone }], target: i0__namespace.ɵɵFactoryTarget.Directive });
    ResizableColumn.ɵdir = i0__namespace.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "12.0.5", type: ResizableColumn, selector: "[pResizableColumn]", inputs: { pResizableColumnDisabled: "pResizableColumnDisabled" }, host: { classAttribute: "p-element" }, ngImport: i0__namespace });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0__namespace, type: ResizableColumn, decorators: [{
                type: i0.Directive,
                args: [{
                        selector: '[pResizableColumn]',
                        host: {
                            'class': 'p-element'
                        }
                    }]
            }], ctorParameters: function () { return [{ type: Table }, { type: i0__namespace.ElementRef }, { type: i0__namespace.NgZone }]; }, propDecorators: { pResizableColumnDisabled: [{
                    type: i0.Input
                }] } });
    var ReorderableColumn = /** @class */ (function () {
        function ReorderableColumn(dt, el, zone) {
            this.dt = dt;
            this.el = el;
            this.zone = zone;
        }
        ReorderableColumn.prototype.ngAfterViewInit = function () {
            if (this.isEnabled()) {
                this.bindEvents();
            }
        };
        ReorderableColumn.prototype.bindEvents = function () {
            var _this = this;
            this.zone.runOutsideAngular(function () {
                _this.mouseDownListener = _this.onMouseDown.bind(_this);
                _this.el.nativeElement.addEventListener('mousedown', _this.mouseDownListener);
                _this.dragStartListener = _this.onDragStart.bind(_this);
                _this.el.nativeElement.addEventListener('dragstart', _this.dragStartListener);
                _this.dragOverListener = _this.onDragEnter.bind(_this);
                _this.el.nativeElement.addEventListener('dragover', _this.dragOverListener);
                _this.dragEnterListener = _this.onDragEnter.bind(_this);
                _this.el.nativeElement.addEventListener('dragenter', _this.dragEnterListener);
                _this.dragLeaveListener = _this.onDragLeave.bind(_this);
                _this.el.nativeElement.addEventListener('dragleave', _this.dragLeaveListener);
            });
        };
        ReorderableColumn.prototype.unbindEvents = function () {
            if (this.mouseDownListener) {
                document.removeEventListener('mousedown', this.mouseDownListener);
                this.mouseDownListener = null;
            }
            if (this.dragOverListener) {
                document.removeEventListener('dragover', this.dragOverListener);
                this.dragOverListener = null;
            }
            if (this.dragEnterListener) {
                document.removeEventListener('dragenter', this.dragEnterListener);
                this.dragEnterListener = null;
            }
            if (this.dragEnterListener) {
                document.removeEventListener('dragenter', this.dragEnterListener);
                this.dragEnterListener = null;
            }
            if (this.dragLeaveListener) {
                document.removeEventListener('dragleave', this.dragLeaveListener);
                this.dragLeaveListener = null;
            }
        };
        ReorderableColumn.prototype.onMouseDown = function (event) {
            if (event.target.nodeName === 'INPUT' || event.target.nodeName === 'TEXTAREA' || dom.DomHandler.hasClass(event.target, 'p-column-resizer'))
                this.el.nativeElement.draggable = false;
            else
                this.el.nativeElement.draggable = true;
        };
        ReorderableColumn.prototype.onDragStart = function (event) {
            this.dt.onColumnDragStart(event, this.el.nativeElement);
        };
        ReorderableColumn.prototype.onDragOver = function (event) {
            event.preventDefault();
        };
        ReorderableColumn.prototype.onDragEnter = function (event) {
            this.dt.onColumnDragEnter(event, this.el.nativeElement);
        };
        ReorderableColumn.prototype.onDragLeave = function (event) {
            this.dt.onColumnDragLeave(event);
        };
        ReorderableColumn.prototype.onDrop = function (event) {
            if (this.isEnabled()) {
                this.dt.onColumnDrop(event, this.el.nativeElement);
            }
        };
        ReorderableColumn.prototype.isEnabled = function () {
            return this.pReorderableColumnDisabled !== true;
        };
        ReorderableColumn.prototype.ngOnDestroy = function () {
            this.unbindEvents();
        };
        return ReorderableColumn;
    }());
    ReorderableColumn.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0__namespace, type: ReorderableColumn, deps: [{ token: Table }, { token: i0__namespace.ElementRef }, { token: i0__namespace.NgZone }], target: i0__namespace.ɵɵFactoryTarget.Directive });
    ReorderableColumn.ɵdir = i0__namespace.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "12.0.5", type: ReorderableColumn, selector: "[pReorderableColumn]", inputs: { pReorderableColumnDisabled: "pReorderableColumnDisabled" }, host: { listeners: { "drop": "onDrop($event)" }, classAttribute: "p-element" }, ngImport: i0__namespace });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0__namespace, type: ReorderableColumn, decorators: [{
                type: i0.Directive,
                args: [{
                        selector: '[pReorderableColumn]',
                        host: {
                            'class': 'p-element'
                        }
                    }]
            }], ctorParameters: function () { return [{ type: Table }, { type: i0__namespace.ElementRef }, { type: i0__namespace.NgZone }]; }, propDecorators: { pReorderableColumnDisabled: [{
                    type: i0.Input
                }], onDrop: [{
                    type: i0.HostListener,
                    args: ['drop', ['$event']]
                }] } });
    var EditableColumn = /** @class */ (function () {
        function EditableColumn(dt, el, zone) {
            this.dt = dt;
            this.el = el;
            this.zone = zone;
        }
        EditableColumn.prototype.ngAfterViewInit = function () {
            if (this.isEnabled()) {
                dom.DomHandler.addClass(this.el.nativeElement, 'p-editable-column');
            }
        };
        EditableColumn.prototype.onClick = function (event) {
            if (this.isEnabled()) {
                this.dt.selfClick = true;
                if (this.dt.editingCell) {
                    if (this.dt.editingCell !== this.el.nativeElement) {
                        if (!this.dt.isEditingCellValid()) {
                            return;
                        }
                        this.closeEditingCell(true, event);
                        this.openCell();
                    }
                }
                else {
                    this.openCell();
                }
            }
        };
        EditableColumn.prototype.openCell = function () {
            var _this = this;
            this.dt.updateEditingCell(this.el.nativeElement, this.data, this.field, this.rowIndex);
            dom.DomHandler.addClass(this.el.nativeElement, 'p-cell-editing');
            this.dt.onEditInit.emit({ field: this.field, data: this.data, index: this.rowIndex });
            this.zone.runOutsideAngular(function () {
                setTimeout(function () {
                    var focusCellSelector = _this.pFocusCellSelector || 'input, textarea, select';
                    var focusableElement = dom.DomHandler.findSingle(_this.el.nativeElement, focusCellSelector);
                    if (focusableElement) {
                        focusableElement.focus();
                    }
                }, 50);
            });
            this.overlayEventListener = function (e) {
                if (_this.el && _this.el.nativeElement.contains(e.target)) {
                    _this.dt.selfClick = true;
                }
            };
            this.dt.overlaySubscription = this.dt.overlayService.clickObservable.subscribe(this.overlayEventListener);
        };
        EditableColumn.prototype.closeEditingCell = function (completed, event) {
            if (completed)
                this.dt.onEditComplete.emit({ field: this.dt.editingCellField, data: this.dt.editingCellData, originalEvent: event, index: this.dt.editingCellRowIndex });
            else
                this.dt.onEditCancel.emit({ field: this.dt.editingCellField, data: this.dt.editingCellData, originalEvent: event, index: this.dt.editingCellRowIndex });
            dom.DomHandler.removeClass(this.dt.editingCell, 'p-cell-editing');
            this.dt.editingCell = null;
            this.dt.editingCellData = null;
            this.dt.editingCellField = null;
            this.dt.unbindDocumentEditListener();
            if (this.dt.overlaySubscription) {
                this.dt.overlaySubscription.unsubscribe();
            }
        };
        EditableColumn.prototype.onEnterKeyDown = function (event) {
            if (this.isEnabled()) {
                if (this.dt.isEditingCellValid()) {
                    this.closeEditingCell(true, event);
                }
                event.preventDefault();
            }
        };
        EditableColumn.prototype.onEscapeKeyDown = function (event) {
            if (this.isEnabled()) {
                if (this.dt.isEditingCellValid()) {
                    this.closeEditingCell(false, event);
                }
                event.preventDefault();
            }
        };
        EditableColumn.prototype.onShiftKeyDown = function (event) {
            if (this.isEnabled()) {
                if (event.shiftKey)
                    this.moveToPreviousCell(event);
                else {
                    this.moveToNextCell(event);
                }
            }
        };
        EditableColumn.prototype.onArrowDown = function (event) {
            if (this.isEnabled()) {
                var currentCell = this.findCell(event.target);
                if (currentCell) {
                    var cellIndex = dom.DomHandler.index(currentCell);
                    var targetCell = this.findNextEditableColumnByIndex(currentCell, cellIndex);
                    if (targetCell) {
                        if (this.dt.isEditingCellValid()) {
                            this.closeEditingCell(true, event);
                        }
                        dom.DomHandler.invokeElementMethod(event.target, 'blur');
                        dom.DomHandler.invokeElementMethod(targetCell, 'click');
                    }
                    event.preventDefault();
                }
            }
        };
        EditableColumn.prototype.onArrowUp = function (event) {
            if (this.isEnabled()) {
                var currentCell = this.findCell(event.target);
                if (currentCell) {
                    var cellIndex = dom.DomHandler.index(currentCell);
                    var targetCell = this.findPrevEditableColumnByIndex(currentCell, cellIndex);
                    if (targetCell) {
                        if (this.dt.isEditingCellValid()) {
                            this.closeEditingCell(true, event);
                        }
                        dom.DomHandler.invokeElementMethod(event.target, 'blur');
                        dom.DomHandler.invokeElementMethod(targetCell, 'click');
                    }
                    event.preventDefault();
                }
            }
        };
        EditableColumn.prototype.onArrowLeft = function (event) {
            if (this.isEnabled()) {
                this.moveToPreviousCell(event);
            }
        };
        EditableColumn.prototype.onArrowRight = function (event) {
            if (this.isEnabled()) {
                this.moveToNextCell(event);
            }
        };
        EditableColumn.prototype.findCell = function (element) {
            if (element) {
                var cell = element;
                while (cell && !dom.DomHandler.hasClass(cell, 'p-cell-editing')) {
                    cell = cell.parentElement;
                }
                return cell;
            }
            else {
                return null;
            }
        };
        EditableColumn.prototype.moveToPreviousCell = function (event) {
            var currentCell = this.findCell(event.target);
            if (currentCell) {
                var targetCell = this.findPreviousEditableColumn(currentCell);
                if (targetCell) {
                    if (this.dt.isEditingCellValid()) {
                        this.closeEditingCell(true, event);
                    }
                    dom.DomHandler.invokeElementMethod(event.target, 'blur');
                    dom.DomHandler.invokeElementMethod(targetCell, 'click');
                    event.preventDefault();
                }
            }
        };
        EditableColumn.prototype.moveToNextCell = function (event) {
            var currentCell = this.findCell(event.target);
            if (currentCell) {
                var targetCell = this.findNextEditableColumn(currentCell);
                if (targetCell) {
                    if (this.dt.isEditingCellValid()) {
                        this.closeEditingCell(true, event);
                    }
                    dom.DomHandler.invokeElementMethod(event.target, 'blur');
                    dom.DomHandler.invokeElementMethod(targetCell, 'click');
                    event.preventDefault();
                }
            }
        };
        EditableColumn.prototype.findPreviousEditableColumn = function (cell) {
            var prevCell = cell.previousElementSibling;
            if (!prevCell) {
                var previousRow = cell.parentElement.previousElementSibling;
                if (previousRow) {
                    prevCell = previousRow.lastElementChild;
                }
            }
            if (prevCell) {
                if (dom.DomHandler.hasClass(prevCell, 'p-editable-column'))
                    return prevCell;
                else
                    return this.findPreviousEditableColumn(prevCell);
            }
            else {
                return null;
            }
        };
        EditableColumn.prototype.findNextEditableColumn = function (cell) {
            var nextCell = cell.nextElementSibling;
            if (!nextCell) {
                var nextRow = cell.parentElement.nextElementSibling;
                if (nextRow) {
                    nextCell = nextRow.firstElementChild;
                }
            }
            if (nextCell) {
                if (dom.DomHandler.hasClass(nextCell, 'p-editable-column'))
                    return nextCell;
                else
                    return this.findNextEditableColumn(nextCell);
            }
            else {
                return null;
            }
        };
        EditableColumn.prototype.findNextEditableColumnByIndex = function (cell, index) {
            var nextRow = cell.parentElement.nextElementSibling;
            if (nextRow) {
                var nextCell = nextRow.children[index];
                if (nextCell && dom.DomHandler.hasClass(nextCell, 'p-editable-column')) {
                    return nextCell;
                }
                return null;
            }
            else {
                return null;
            }
        };
        EditableColumn.prototype.findPrevEditableColumnByIndex = function (cell, index) {
            var prevRow = cell.parentElement.previousElementSibling;
            if (prevRow) {
                var prevCell = prevRow.children[index];
                if (prevCell && dom.DomHandler.hasClass(prevCell, 'p-editable-column')) {
                    return prevCell;
                }
                return null;
            }
            else {
                return null;
            }
        };
        EditableColumn.prototype.isEnabled = function () {
            return this.pEditableColumnDisabled !== true;
        };
        EditableColumn.prototype.ngOnDestroy = function () {
            if (this.dt.overlaySubscription) {
                this.dt.overlaySubscription.unsubscribe();
            }
        };
        return EditableColumn;
    }());
    EditableColumn.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0__namespace, type: EditableColumn, deps: [{ token: Table }, { token: i0__namespace.ElementRef }, { token: i0__namespace.NgZone }], target: i0__namespace.ɵɵFactoryTarget.Directive });
    EditableColumn.ɵdir = i0__namespace.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "12.0.5", type: EditableColumn, selector: "[pEditableColumn]", inputs: { data: ["pEditableColumn", "data"], field: ["pEditableColumnField", "field"], rowIndex: ["pEditableColumnRowIndex", "rowIndex"], pEditableColumnDisabled: "pEditableColumnDisabled", pFocusCellSelector: "pFocusCellSelector" }, host: { listeners: { "click": "onClick($event)", "keydown.enter": "onEnterKeyDown($event)", "keydown.escape": "onEscapeKeyDown($event)", "keydown.tab": "onShiftKeyDown($event)", "keydown.shift.tab": "onShiftKeyDown($event)", "keydown.meta.tab": "onShiftKeyDown($event)", "keydown.arrowdown": "onArrowDown($event)", "keydown.arrowup": "onArrowUp($event)", "keydown.arrowleft": "onArrowLeft($event)", "keydown.arrowright": "onArrowRight($event)" }, classAttribute: "p-element" }, ngImport: i0__namespace });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0__namespace, type: EditableColumn, decorators: [{
                type: i0.Directive,
                args: [{
                        selector: '[pEditableColumn]',
                        host: {
                            'class': 'p-element'
                        }
                    }]
            }], ctorParameters: function () { return [{ type: Table }, { type: i0__namespace.ElementRef }, { type: i0__namespace.NgZone }]; }, propDecorators: { data: [{
                    type: i0.Input,
                    args: ["pEditableColumn"]
                }], field: [{
                    type: i0.Input,
                    args: ["pEditableColumnField"]
                }], rowIndex: [{
                    type: i0.Input,
                    args: ["pEditableColumnRowIndex"]
                }], pEditableColumnDisabled: [{
                    type: i0.Input
                }], pFocusCellSelector: [{
                    type: i0.Input
                }], onClick: [{
                    type: i0.HostListener,
                    args: ['click', ['$event']]
                }], onEnterKeyDown: [{
                    type: i0.HostListener,
                    args: ['keydown.enter', ['$event']]
                }], onEscapeKeyDown: [{
                    type: i0.HostListener,
                    args: ['keydown.escape', ['$event']]
                }], onShiftKeyDown: [{
                    type: i0.HostListener,
                    args: ['keydown.tab', ['$event']]
                }, {
                    type: i0.HostListener,
                    args: ['keydown.shift.tab', ['$event']]
                }, {
                    type: i0.HostListener,
                    args: ['keydown.meta.tab', ['$event']]
                }], onArrowDown: [{
                    type: i0.HostListener,
                    args: ['keydown.arrowdown', ['$event']]
                }], onArrowUp: [{
                    type: i0.HostListener,
                    args: ['keydown.arrowup', ['$event']]
                }], onArrowLeft: [{
                    type: i0.HostListener,
                    args: ['keydown.arrowleft', ['$event']]
                }], onArrowRight: [{
                    type: i0.HostListener,
                    args: ['keydown.arrowright', ['$event']]
                }] } });
    var EditableRow = /** @class */ (function () {
        function EditableRow(el) {
            this.el = el;
        }
        EditableRow.prototype.isEnabled = function () {
            return this.pEditableRowDisabled !== true;
        };
        return EditableRow;
    }());
    EditableRow.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0__namespace, type: EditableRow, deps: [{ token: i0__namespace.ElementRef }], target: i0__namespace.ɵɵFactoryTarget.Directive });
    EditableRow.ɵdir = i0__namespace.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "12.0.5", type: EditableRow, selector: "[pEditableRow]", inputs: { data: ["pEditableRow", "data"], pEditableRowDisabled: "pEditableRowDisabled" }, host: { classAttribute: "p-element" }, ngImport: i0__namespace });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0__namespace, type: EditableRow, decorators: [{
                type: i0.Directive,
                args: [{
                        selector: '[pEditableRow]',
                        host: {
                            'class': 'p-element'
                        }
                    }]
            }], ctorParameters: function () { return [{ type: i0__namespace.ElementRef }]; }, propDecorators: { data: [{
                    type: i0.Input,
                    args: ["pEditableRow"]
                }], pEditableRowDisabled: [{
                    type: i0.Input
                }] } });
    var InitEditableRow = /** @class */ (function () {
        function InitEditableRow(dt, editableRow) {
            this.dt = dt;
            this.editableRow = editableRow;
        }
        InitEditableRow.prototype.onClick = function (event) {
            this.dt.initRowEdit(this.editableRow.data);
            event.preventDefault();
        };
        return InitEditableRow;
    }());
    InitEditableRow.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0__namespace, type: InitEditableRow, deps: [{ token: Table }, { token: EditableRow }], target: i0__namespace.ɵɵFactoryTarget.Directive });
    InitEditableRow.ɵdir = i0__namespace.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "12.0.5", type: InitEditableRow, selector: "[pInitEditableRow]", host: { listeners: { "click": "onClick($event)" }, classAttribute: "p-element" }, ngImport: i0__namespace });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0__namespace, type: InitEditableRow, decorators: [{
                type: i0.Directive,
                args: [{
                        selector: '[pInitEditableRow]',
                        host: {
                            'class': 'p-element'
                        }
                    }]
            }], ctorParameters: function () { return [{ type: Table }, { type: EditableRow }]; }, propDecorators: { onClick: [{
                    type: i0.HostListener,
                    args: ['click', ['$event']]
                }] } });
    var SaveEditableRow = /** @class */ (function () {
        function SaveEditableRow(dt, editableRow) {
            this.dt = dt;
            this.editableRow = editableRow;
        }
        SaveEditableRow.prototype.onClick = function (event) {
            this.dt.saveRowEdit(this.editableRow.data, this.editableRow.el.nativeElement);
            event.preventDefault();
        };
        return SaveEditableRow;
    }());
    SaveEditableRow.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0__namespace, type: SaveEditableRow, deps: [{ token: Table }, { token: EditableRow }], target: i0__namespace.ɵɵFactoryTarget.Directive });
    SaveEditableRow.ɵdir = i0__namespace.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "12.0.5", type: SaveEditableRow, selector: "[pSaveEditableRow]", host: { listeners: { "click": "onClick($event)" }, classAttribute: "p-element" }, ngImport: i0__namespace });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0__namespace, type: SaveEditableRow, decorators: [{
                type: i0.Directive,
                args: [{
                        selector: '[pSaveEditableRow]',
                        host: {
                            'class': 'p-element'
                        }
                    }]
            }], ctorParameters: function () { return [{ type: Table }, { type: EditableRow }]; }, propDecorators: { onClick: [{
                    type: i0.HostListener,
                    args: ['click', ['$event']]
                }] } });
    var CancelEditableRow = /** @class */ (function () {
        function CancelEditableRow(dt, editableRow) {
            this.dt = dt;
            this.editableRow = editableRow;
        }
        CancelEditableRow.prototype.onClick = function (event) {
            this.dt.cancelRowEdit(this.editableRow.data);
            event.preventDefault();
        };
        return CancelEditableRow;
    }());
    CancelEditableRow.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0__namespace, type: CancelEditableRow, deps: [{ token: Table }, { token: EditableRow }], target: i0__namespace.ɵɵFactoryTarget.Directive });
    CancelEditableRow.ɵdir = i0__namespace.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "12.0.5", type: CancelEditableRow, selector: "[pCancelEditableRow]", host: { listeners: { "click": "onClick($event)" }, classAttribute: "p-element" }, ngImport: i0__namespace });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0__namespace, type: CancelEditableRow, decorators: [{
                type: i0.Directive,
                args: [{
                        selector: '[pCancelEditableRow]',
                        host: {
                            'class': 'p-element'
                        }
                    }]
            }], ctorParameters: function () { return [{ type: Table }, { type: EditableRow }]; }, propDecorators: { onClick: [{
                    type: i0.HostListener,
                    args: ['click', ['$event']]
                }] } });
    var CellEditor = /** @class */ (function () {
        function CellEditor(dt, editableColumn, editableRow) {
            this.dt = dt;
            this.editableColumn = editableColumn;
            this.editableRow = editableRow;
        }
        CellEditor.prototype.ngAfterContentInit = function () {
            var _this = this;
            this.templates.forEach(function (item) {
                switch (item.getType()) {
                    case 'input':
                        _this.inputTemplate = item.template;
                        break;
                    case 'output':
                        _this.outputTemplate = item.template;
                        break;
                }
            });
        };
        Object.defineProperty(CellEditor.prototype, "editing", {
            get: function () {
                return (this.dt.editingCell && this.editableColumn && this.dt.editingCell === this.editableColumn.el.nativeElement) ||
                    (this.editableRow && this.dt.editMode === 'row' && this.dt.isRowEditing(this.editableRow.data));
            },
            enumerable: false,
            configurable: true
        });
        return CellEditor;
    }());
    CellEditor.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0__namespace, type: CellEditor, deps: [{ token: Table }, { token: EditableColumn, optional: true }, { token: EditableRow, optional: true }], target: i0__namespace.ɵɵFactoryTarget.Component });
    CellEditor.ɵcmp = i0__namespace.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.0.5", type: CellEditor, selector: "p-cellEditor", host: { classAttribute: "p-element" }, queries: [{ propertyName: "templates", predicate: i1.PrimeTemplate }], ngImport: i0__namespace, template: "\n        <ng-container *ngIf=\"editing\">\n            <ng-container *ngTemplateOutlet=\"inputTemplate\"></ng-container>\n        </ng-container>\n        <ng-container *ngIf=\"!editing\">\n            <ng-container *ngTemplateOutlet=\"outputTemplate\"></ng-container>\n        </ng-container>\n    ", isInline: true, directives: [{ type: i4__namespace.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i4__namespace.NgTemplateOutlet, selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet"] }], encapsulation: i0__namespace.ViewEncapsulation.None });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0__namespace, type: CellEditor, decorators: [{
                type: i0.Component,
                args: [{
                        selector: 'p-cellEditor',
                        template: "\n        <ng-container *ngIf=\"editing\">\n            <ng-container *ngTemplateOutlet=\"inputTemplate\"></ng-container>\n        </ng-container>\n        <ng-container *ngIf=\"!editing\">\n            <ng-container *ngTemplateOutlet=\"outputTemplate\"></ng-container>\n        </ng-container>\n    ",
                        encapsulation: i0.ViewEncapsulation.None,
                        host: {
                            'class': 'p-element'
                        }
                    }]
            }], ctorParameters: function () {
            return [{ type: Table }, { type: EditableColumn, decorators: [{
                            type: i0.Optional
                        }] }, { type: EditableRow, decorators: [{
                            type: i0.Optional
                        }] }];
        }, propDecorators: { templates: [{
                    type: i0.ContentChildren,
                    args: [i1.PrimeTemplate]
                }] } });
    var TableRadioButton = /** @class */ (function () {
        function TableRadioButton(dt, tableService, cd) {
            var _this = this;
            this.dt = dt;
            this.tableService = tableService;
            this.cd = cd;
            this.subscription = this.dt.tableService.selectionSource$.subscribe(function () {
                _this.checked = _this.dt.isSelected(_this.value);
                _this.cd.markForCheck();
            });
        }
        TableRadioButton.prototype.ngOnInit = function () {
            this.checked = this.dt.isSelected(this.value);
        };
        TableRadioButton.prototype.onClick = function (event) {
            if (!this.disabled) {
                this.dt.toggleRowWithRadio({
                    originalEvent: event,
                    rowIndex: this.index
                }, this.value);
            }
            dom.DomHandler.clearSelection();
        };
        TableRadioButton.prototype.onFocus = function () {
            dom.DomHandler.addClass(this.boxViewChild.nativeElement, 'p-focus');
        };
        TableRadioButton.prototype.onBlur = function () {
            dom.DomHandler.removeClass(this.boxViewChild.nativeElement, 'p-focus');
        };
        TableRadioButton.prototype.ngOnDestroy = function () {
            if (this.subscription) {
                this.subscription.unsubscribe();
            }
        };
        return TableRadioButton;
    }());
    TableRadioButton.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0__namespace, type: TableRadioButton, deps: [{ token: Table }, { token: TableService }, { token: i0__namespace.ChangeDetectorRef }], target: i0__namespace.ɵɵFactoryTarget.Component });
    TableRadioButton.ɵcmp = i0__namespace.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.0.5", type: TableRadioButton, selector: "p-tableRadioButton", inputs: { disabled: "disabled", value: "value", index: "index", inputId: "inputId", name: "name", ariaLabel: "ariaLabel" }, host: { classAttribute: "p-element" }, viewQueries: [{ propertyName: "boxViewChild", first: true, predicate: ["box"], descendants: true }], ngImport: i0__namespace, template: "\n        <div class=\"p-radiobutton p-component\" (click)=\"onClick($event)\">\n            <div class=\"p-hidden-accessible\">\n                <input type=\"radio\" [attr.id]=\"inputId\" [attr.name]=\"name\" [checked]=\"checked\" (focus)=\"onFocus()\" (blur)=\"onBlur()\"\n                [disabled]=\"disabled\" [attr.aria-label]=\"ariaLabel\">\n            </div>\n            <div #box [ngClass]=\"{'p-radiobutton-box p-component':true, 'p-highlight':checked, 'p-disabled':disabled}\" role=\"radio\" [attr.aria-checked]=\"checked\">\n                <div class=\"p-radiobutton-icon\"></div>\n            </div>\n        </div>\n    ", isInline: true, directives: [{ type: i4__namespace.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }], changeDetection: i0__namespace.ChangeDetectionStrategy.OnPush, encapsulation: i0__namespace.ViewEncapsulation.None });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0__namespace, type: TableRadioButton, decorators: [{
                type: i0.Component,
                args: [{
                        selector: 'p-tableRadioButton',
                        template: "\n        <div class=\"p-radiobutton p-component\" (click)=\"onClick($event)\">\n            <div class=\"p-hidden-accessible\">\n                <input type=\"radio\" [attr.id]=\"inputId\" [attr.name]=\"name\" [checked]=\"checked\" (focus)=\"onFocus()\" (blur)=\"onBlur()\"\n                [disabled]=\"disabled\" [attr.aria-label]=\"ariaLabel\">\n            </div>\n            <div #box [ngClass]=\"{'p-radiobutton-box p-component':true, 'p-highlight':checked, 'p-disabled':disabled}\" role=\"radio\" [attr.aria-checked]=\"checked\">\n                <div class=\"p-radiobutton-icon\"></div>\n            </div>\n        </div>\n    ",
                        changeDetection: i0.ChangeDetectionStrategy.OnPush,
                        encapsulation: i0.ViewEncapsulation.None,
                        host: {
                            'class': 'p-element'
                        }
                    }]
            }], ctorParameters: function () { return [{ type: Table }, { type: TableService }, { type: i0__namespace.ChangeDetectorRef }]; }, propDecorators: { disabled: [{
                    type: i0.Input
                }], value: [{
                    type: i0.Input
                }], index: [{
                    type: i0.Input
                }], inputId: [{
                    type: i0.Input
                }], name: [{
                    type: i0.Input
                }], ariaLabel: [{
                    type: i0.Input
                }], boxViewChild: [{
                    type: i0.ViewChild,
                    args: ['box']
                }] } });
    var TableCheckbox = /** @class */ (function () {
        function TableCheckbox(dt, tableService, cd) {
            var _this = this;
            this.dt = dt;
            this.tableService = tableService;
            this.cd = cd;
            this.subscription = this.dt.tableService.selectionSource$.subscribe(function () {
                _this.checked = _this.dt.isSelected(_this.value);
                _this.cd.markForCheck();
            });
        }
        TableCheckbox.prototype.ngOnInit = function () {
            this.checked = this.dt.isSelected(this.value);
        };
        TableCheckbox.prototype.onClick = function (event) {
            if (!this.disabled) {
                this.dt.toggleRowWithCheckbox({
                    originalEvent: event,
                    rowIndex: this.index
                }, this.value);
            }
            dom.DomHandler.clearSelection();
        };
        TableCheckbox.prototype.onFocus = function () {
            dom.DomHandler.addClass(this.boxViewChild.nativeElement, 'p-focus');
        };
        TableCheckbox.prototype.onBlur = function () {
            dom.DomHandler.removeClass(this.boxViewChild.nativeElement, 'p-focus');
        };
        TableCheckbox.prototype.ngOnDestroy = function () {
            if (this.subscription) {
                this.subscription.unsubscribe();
            }
        };
        return TableCheckbox;
    }());
    TableCheckbox.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0__namespace, type: TableCheckbox, deps: [{ token: Table }, { token: TableService }, { token: i0__namespace.ChangeDetectorRef }], target: i0__namespace.ɵɵFactoryTarget.Component });
    TableCheckbox.ɵcmp = i0__namespace.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.0.5", type: TableCheckbox, selector: "p-tableCheckbox", inputs: { disabled: "disabled", value: "value", index: "index", inputId: "inputId", name: "name", required: "required", ariaLabel: "ariaLabel" }, host: { classAttribute: "p-element" }, viewQueries: [{ propertyName: "boxViewChild", first: true, predicate: ["box"], descendants: true }], ngImport: i0__namespace, template: "\n        <div class=\"p-checkbox p-component\" (click)=\"onClick($event)\">\n            <div class=\"p-hidden-accessible\">\n                <input type=\"checkbox\" [attr.id]=\"inputId\" [attr.name]=\"name\" [checked]=\"checked\" (focus)=\"onFocus()\" (blur)=\"onBlur()\" [disabled]=\"disabled\"\n                [attr.required]=\"required\" [attr.aria-label]=\"ariaLabel\">\n            </div>\n            <div #box [ngClass]=\"{'p-checkbox-box p-component':true,\n                'p-highlight':checked, 'p-disabled':disabled}\" role=\"checkbox\" [attr.aria-checked]=\"checked\">\n                <span class=\"p-checkbox-icon\" [ngClass]=\"{'pi pi-check':checked}\"></span>\n            </div>\n        </div>\n    ", isInline: true, directives: [{ type: i4__namespace.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }], changeDetection: i0__namespace.ChangeDetectionStrategy.OnPush, encapsulation: i0__namespace.ViewEncapsulation.None });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0__namespace, type: TableCheckbox, decorators: [{
                type: i0.Component,
                args: [{
                        selector: 'p-tableCheckbox',
                        template: "\n        <div class=\"p-checkbox p-component\" (click)=\"onClick($event)\">\n            <div class=\"p-hidden-accessible\">\n                <input type=\"checkbox\" [attr.id]=\"inputId\" [attr.name]=\"name\" [checked]=\"checked\" (focus)=\"onFocus()\" (blur)=\"onBlur()\" [disabled]=\"disabled\"\n                [attr.required]=\"required\" [attr.aria-label]=\"ariaLabel\">\n            </div>\n            <div #box [ngClass]=\"{'p-checkbox-box p-component':true,\n                'p-highlight':checked, 'p-disabled':disabled}\" role=\"checkbox\" [attr.aria-checked]=\"checked\">\n                <span class=\"p-checkbox-icon\" [ngClass]=\"{'pi pi-check':checked}\"></span>\n            </div>\n        </div>\n    ",
                        changeDetection: i0.ChangeDetectionStrategy.OnPush,
                        encapsulation: i0.ViewEncapsulation.None,
                        host: {
                            'class': 'p-element'
                        }
                    }]
            }], ctorParameters: function () { return [{ type: Table }, { type: TableService }, { type: i0__namespace.ChangeDetectorRef }]; }, propDecorators: { disabled: [{
                    type: i0.Input
                }], value: [{
                    type: i0.Input
                }], index: [{
                    type: i0.Input
                }], inputId: [{
                    type: i0.Input
                }], name: [{
                    type: i0.Input
                }], required: [{
                    type: i0.Input
                }], ariaLabel: [{
                    type: i0.Input
                }], boxViewChild: [{
                    type: i0.ViewChild,
                    args: ['box']
                }] } });
    var TableHeaderCheckbox = /** @class */ (function () {
        function TableHeaderCheckbox(dt, tableService, cd) {
            var _this = this;
            this.dt = dt;
            this.tableService = tableService;
            this.cd = cd;
            this.valueChangeSubscription = this.dt.tableService.valueSource$.subscribe(function () {
                _this.checked = _this.updateCheckedState();
            });
            this.selectionChangeSubscription = this.dt.tableService.selectionSource$.subscribe(function () {
                _this.checked = _this.updateCheckedState();
            });
        }
        TableHeaderCheckbox.prototype.ngOnInit = function () {
            this.checked = this.updateCheckedState();
        };
        TableHeaderCheckbox.prototype.onClick = function (event) {
            if (!this.disabled) {
                if (this.dt.value && this.dt.value.length > 0) {
                    this.dt.toggleRowsWithCheckbox(event, !this.checked);
                }
            }
            dom.DomHandler.clearSelection();
        };
        TableHeaderCheckbox.prototype.onFocus = function () {
            dom.DomHandler.addClass(this.boxViewChild.nativeElement, 'p-focus');
        };
        TableHeaderCheckbox.prototype.onBlur = function () {
            dom.DomHandler.removeClass(this.boxViewChild.nativeElement, 'p-focus');
        };
        TableHeaderCheckbox.prototype.isDisabled = function () {
            return this.disabled || !this.dt.value || !this.dt.value.length;
        };
        TableHeaderCheckbox.prototype.ngOnDestroy = function () {
            if (this.selectionChangeSubscription) {
                this.selectionChangeSubscription.unsubscribe();
            }
            if (this.valueChangeSubscription) {
                this.valueChangeSubscription.unsubscribe();
            }
        };
        TableHeaderCheckbox.prototype.updateCheckedState = function () {
            this.cd.markForCheck();
            if (this.dt.filteredValue && !this.dt.lazy) {
                var val = this.dt.filteredValue;
                return (val && val.length > 0 && this.dt.selection && this.dt.selection.length > 0 && this.isAllFilteredValuesChecked());
            }
            else {
                var val = this.dt.value;
                var length = this.dt.lazy ? this.dt._totalRecords : val ? val.length : 0;
                return (val && length > 0 && this.dt.selection && this.dt.selection.length > 0 && this.dt.selection.length === length);
            }
        };
        TableHeaderCheckbox.prototype.isAllFilteredValuesChecked = function () {
            var e_4, _b;
            if (!this.dt.filteredValue) {
                return false;
            }
            else {
                try {
                    for (var _c = __values(this.dt.filteredValue), _d = _c.next(); !_d.done; _d = _c.next()) {
                        var rowData = _d.value;
                        if (!this.dt.isSelected(rowData)) {
                            return false;
                        }
                    }
                }
                catch (e_4_1) { e_4 = { error: e_4_1 }; }
                finally {
                    try {
                        if (_d && !_d.done && (_b = _c.return)) _b.call(_c);
                    }
                    finally { if (e_4) throw e_4.error; }
                }
                return true;
            }
        };
        return TableHeaderCheckbox;
    }());
    TableHeaderCheckbox.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0__namespace, type: TableHeaderCheckbox, deps: [{ token: Table }, { token: TableService }, { token: i0__namespace.ChangeDetectorRef }], target: i0__namespace.ɵɵFactoryTarget.Component });
    TableHeaderCheckbox.ɵcmp = i0__namespace.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.0.5", type: TableHeaderCheckbox, selector: "p-tableHeaderCheckbox", inputs: { disabled: "disabled", inputId: "inputId", name: "name", ariaLabel: "ariaLabel" }, host: { classAttribute: "p-element" }, viewQueries: [{ propertyName: "boxViewChild", first: true, predicate: ["box"], descendants: true }], ngImport: i0__namespace, template: "\n        <div class=\"p-checkbox p-component\" (click)=\"onClick($event)\">\n            <div class=\"p-hidden-accessible\">\n                <input #cb type=\"checkbox\" [attr.id]=\"inputId\" [attr.name]=\"name\" [checked]=\"checked\" (focus)=\"onFocus()\" (blur)=\"onBlur()\"\n                [disabled]=\"isDisabled()\" [attr.aria-label]=\"ariaLabel\">\n            </div>\n            <div #box [ngClass]=\"{'p-checkbox-box':true,\n                'p-highlight':checked, 'p-disabled': isDisabled()}\" role=\"checkbox\" [attr.aria-checked]=\"checked\">\n                <span class=\"p-checkbox-icon\" [ngClass]=\"{'pi pi-check':checked}\"></span>\n            </div>\n        </div>\n    ", isInline: true, directives: [{ type: i4__namespace.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }], changeDetection: i0__namespace.ChangeDetectionStrategy.OnPush, encapsulation: i0__namespace.ViewEncapsulation.None });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0__namespace, type: TableHeaderCheckbox, decorators: [{
                type: i0.Component,
                args: [{
                        selector: 'p-tableHeaderCheckbox',
                        template: "\n        <div class=\"p-checkbox p-component\" (click)=\"onClick($event)\">\n            <div class=\"p-hidden-accessible\">\n                <input #cb type=\"checkbox\" [attr.id]=\"inputId\" [attr.name]=\"name\" [checked]=\"checked\" (focus)=\"onFocus()\" (blur)=\"onBlur()\"\n                [disabled]=\"isDisabled()\" [attr.aria-label]=\"ariaLabel\">\n            </div>\n            <div #box [ngClass]=\"{'p-checkbox-box':true,\n                'p-highlight':checked, 'p-disabled': isDisabled()}\" role=\"checkbox\" [attr.aria-checked]=\"checked\">\n                <span class=\"p-checkbox-icon\" [ngClass]=\"{'pi pi-check':checked}\"></span>\n            </div>\n        </div>\n    ",
                        changeDetection: i0.ChangeDetectionStrategy.OnPush,
                        encapsulation: i0.ViewEncapsulation.None,
                        host: {
                            'class': 'p-element'
                        }
                    }]
            }], ctorParameters: function () { return [{ type: Table }, { type: TableService }, { type: i0__namespace.ChangeDetectorRef }]; }, propDecorators: { boxViewChild: [{
                    type: i0.ViewChild,
                    args: ['box']
                }], disabled: [{
                    type: i0.Input
                }], inputId: [{
                    type: i0.Input
                }], name: [{
                    type: i0.Input
                }], ariaLabel: [{
                    type: i0.Input
                }] } });
    var ReorderableRowHandle = /** @class */ (function () {
        function ReorderableRowHandle(el) {
            this.el = el;
        }
        ReorderableRowHandle.prototype.ngAfterViewInit = function () {
            dom.DomHandler.addClass(this.el.nativeElement, 'p-datatable-reorderablerow-handle');
        };
        return ReorderableRowHandle;
    }());
    ReorderableRowHandle.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0__namespace, type: ReorderableRowHandle, deps: [{ token: i0__namespace.ElementRef }], target: i0__namespace.ɵɵFactoryTarget.Directive });
    ReorderableRowHandle.ɵdir = i0__namespace.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "12.0.5", type: ReorderableRowHandle, selector: "[pReorderableRowHandle]", inputs: { index: ["pReorderableRowHandle", "index"] }, host: { classAttribute: "p-element" }, ngImport: i0__namespace });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0__namespace, type: ReorderableRowHandle, decorators: [{
                type: i0.Directive,
                args: [{
                        selector: '[pReorderableRowHandle]',
                        host: {
                            'class': 'p-element'
                        }
                    }]
            }], ctorParameters: function () { return [{ type: i0__namespace.ElementRef }]; }, propDecorators: { index: [{
                    type: i0.Input,
                    args: ["pReorderableRowHandle"]
                }] } });
    var ReorderableRow = /** @class */ (function () {
        function ReorderableRow(dt, el, zone) {
            this.dt = dt;
            this.el = el;
            this.zone = zone;
        }
        ReorderableRow.prototype.ngAfterViewInit = function () {
            if (this.isEnabled()) {
                this.el.nativeElement.droppable = true;
                this.bindEvents();
            }
        };
        ReorderableRow.prototype.bindEvents = function () {
            var _this = this;
            this.zone.runOutsideAngular(function () {
                _this.mouseDownListener = _this.onMouseDown.bind(_this);
                _this.el.nativeElement.addEventListener('mousedown', _this.mouseDownListener);
                _this.dragStartListener = _this.onDragStart.bind(_this);
                _this.el.nativeElement.addEventListener('dragstart', _this.dragStartListener);
                _this.dragEndListener = _this.onDragEnd.bind(_this);
                _this.el.nativeElement.addEventListener('dragend', _this.dragEndListener);
                _this.dragOverListener = _this.onDragOver.bind(_this);
                _this.el.nativeElement.addEventListener('dragover', _this.dragOverListener);
                _this.dragLeaveListener = _this.onDragLeave.bind(_this);
                _this.el.nativeElement.addEventListener('dragleave', _this.dragLeaveListener);
            });
        };
        ReorderableRow.prototype.unbindEvents = function () {
            if (this.mouseDownListener) {
                document.removeEventListener('mousedown', this.mouseDownListener);
                this.mouseDownListener = null;
            }
            if (this.dragStartListener) {
                document.removeEventListener('dragstart', this.dragStartListener);
                this.dragStartListener = null;
            }
            if (this.dragEndListener) {
                document.removeEventListener('dragend', this.dragEndListener);
                this.dragEndListener = null;
            }
            if (this.dragOverListener) {
                document.removeEventListener('dragover', this.dragOverListener);
                this.dragOverListener = null;
            }
            if (this.dragLeaveListener) {
                document.removeEventListener('dragleave', this.dragLeaveListener);
                this.dragLeaveListener = null;
            }
        };
        ReorderableRow.prototype.onMouseDown = function (event) {
            if (dom.DomHandler.hasClass(event.target, 'p-datatable-reorderablerow-handle'))
                this.el.nativeElement.draggable = true;
            else
                this.el.nativeElement.draggable = false;
        };
        ReorderableRow.prototype.onDragStart = function (event) {
            this.dt.onRowDragStart(event, this.index);
        };
        ReorderableRow.prototype.onDragEnd = function (event) {
            this.dt.onRowDragEnd(event);
            this.el.nativeElement.draggable = false;
        };
        ReorderableRow.prototype.onDragOver = function (event) {
            this.dt.onRowDragOver(event, this.index, this.el.nativeElement);
            event.preventDefault();
        };
        ReorderableRow.prototype.onDragLeave = function (event) {
            this.dt.onRowDragLeave(event, this.el.nativeElement);
        };
        ReorderableRow.prototype.isEnabled = function () {
            return this.pReorderableRowDisabled !== true;
        };
        ReorderableRow.prototype.onDrop = function (event) {
            if (this.isEnabled() && this.dt.rowDragging) {
                this.dt.onRowDrop(event, this.el.nativeElement);
            }
            event.preventDefault();
        };
        return ReorderableRow;
    }());
    ReorderableRow.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0__namespace, type: ReorderableRow, deps: [{ token: Table }, { token: i0__namespace.ElementRef }, { token: i0__namespace.NgZone }], target: i0__namespace.ɵɵFactoryTarget.Directive });
    ReorderableRow.ɵdir = i0__namespace.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "12.0.5", type: ReorderableRow, selector: "[pReorderableRow]", inputs: { index: ["pReorderableRow", "index"], pReorderableRowDisabled: "pReorderableRowDisabled" }, host: { listeners: { "drop": "onDrop($event)" }, classAttribute: "p-element" }, ngImport: i0__namespace });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0__namespace, type: ReorderableRow, decorators: [{
                type: i0.Directive,
                args: [{
                        selector: '[pReorderableRow]',
                        host: {
                            'class': 'p-element'
                        }
                    }]
            }], ctorParameters: function () { return [{ type: Table }, { type: i0__namespace.ElementRef }, { type: i0__namespace.NgZone }]; }, propDecorators: { index: [{
                    type: i0.Input,
                    args: ["pReorderableRow"]
                }], pReorderableRowDisabled: [{
                    type: i0.Input
                }], onDrop: [{
                    type: i0.HostListener,
                    args: ['drop', ['$event']]
                }] } });
    var ColumnFilterFormElement = /** @class */ (function () {
        function ColumnFilterFormElement(dt) {
            this.dt = dt;
            this.useGrouping = true;
        }
        ColumnFilterFormElement.prototype.ngOnInit = function () {
            var _this = this;
            this.filterCallback = function (value) {
                _this.filterConstraint.value = value;
                _this.dt._filter();
            };
        };
        ColumnFilterFormElement.prototype.onModelChange = function (value) {
            this.filterConstraint.value = value;
            if (this.type === 'boolean' || value === '') {
                this.dt._filter();
            }
        };
        ColumnFilterFormElement.prototype.onTextInputEnterKeyDown = function (event) {
            this.dt._filter();
            event.preventDefault();
        };
        ColumnFilterFormElement.prototype.onNumericInputKeyDown = function (event) {
            if (event.key === 'Enter') {
                this.dt._filter();
                event.preventDefault();
            }
        };
        return ColumnFilterFormElement;
    }());
    ColumnFilterFormElement.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0__namespace, type: ColumnFilterFormElement, deps: [{ token: Table }], target: i0__namespace.ɵɵFactoryTarget.Component });
    ColumnFilterFormElement.ɵcmp = i0__namespace.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.0.5", type: ColumnFilterFormElement, selector: "p-columnFilterFormElement", inputs: { field: "field", type: "type", filterConstraint: "filterConstraint", filterTemplate: "filterTemplate", placeholder: "placeholder", minFractionDigits: "minFractionDigits", maxFractionDigits: "maxFractionDigits", prefix: "prefix", suffix: "suffix", locale: "locale", localeMatcher: "localeMatcher", currency: "currency", currencyDisplay: "currencyDisplay", useGrouping: "useGrouping" }, host: { classAttribute: "p-element" }, ngImport: i0__namespace, template: "\n        <ng-container *ngIf=\"filterTemplate; else builtInElement\">\n            <ng-container *ngTemplateOutlet=\"filterTemplate; context: {$implicit: filterConstraint.value, filterCallback: filterCallback}\"></ng-container>\n        </ng-container>\n        <ng-template #builtInElement>\n            <ng-container [ngSwitch]=\"type\">\n                <input *ngSwitchCase=\"'text'\" type=\"text\" pInputText [value]=\"filterConstraint?.value\" (input)=\"onModelChange($event.target.value)\"\n                    (keydown.enter)=\"onTextInputEnterKeyDown($event)\" [attr.placeholder]=\"placeholder\">\n                <p-inputNumber *ngSwitchCase=\"'numeric'\" [ngModel]=\"filterConstraint?.value\" (ngModelChange)=\"onModelChange($event)\" (onKeyDown)=\"onNumericInputKeyDown($event)\" [showButtons]=\"true\" [attr.placeholder]=\"placeholder\"\n                    [minFractionDigits]=\"minFractionDigits\" [maxFractionDigits]=\"maxFractionDigits\" [prefix]=\"prefix\" [suffix]=\"suffix\" [placeholder]=\"placeholder\"\n                    [mode]=\"currency ? 'currency' : 'decimal'\" [locale]=\"locale\" [localeMatcher]=\"localeMatcher\" [currency]=\"currency\" [currencyDisplay]=\"currencyDisplay\" [useGrouping]=\"useGrouping\"></p-inputNumber>\n                <p-triStateCheckbox *ngSwitchCase=\"'boolean'\" [ngModel]=\"filterConstraint?.value\" (ngModelChange)=\"onModelChange($event)\"></p-triStateCheckbox>\n                <p-calendar *ngSwitchCase=\"'date'\" [ngModel]=\"filterConstraint?.value\" (ngModelChange)=\"onModelChange($event)\"></p-calendar>\n            </ng-container>\n        </ng-template>\n    ", isInline: true, components: [{ type: i5__namespace.InputNumber, selector: "p-inputNumber", inputs: ["showButtons", "format", "buttonLayout", "inputId", "styleClass", "style", "placeholder", "size", "maxlength", "tabindex", "title", "ariaLabel", "ariaRequired", "name", "required", "autocomplete", "min", "max", "incrementButtonClass", "decrementButtonClass", "incrementButtonIcon", "decrementButtonIcon", "readonly", "step", "allowEmpty", "locale", "localeMatcher", "mode", "currency", "currencyDisplay", "useGrouping", "minFractionDigits", "maxFractionDigits", "prefix", "suffix", "inputStyle", "inputStyleClass", "disabled"], outputs: ["onInput", "onFocus", "onBlur", "onKeyDown"] }, { type: i6__namespace.TriStateCheckbox, selector: "p-triStateCheckbox", inputs: ["disabled", "name", "ariaLabelledBy", "tabindex", "inputId", "style", "styleClass", "label", "readonly", "checkboxTrueIcon", "checkboxFalseIcon"], outputs: ["onChange"] }, { type: i7__namespace.Calendar, selector: "p-calendar", inputs: ["style", "styleClass", "inputStyle", "inputId", "name", "inputStyleClass", "placeholder", "ariaLabelledBy", "disabled", "dateFormat", "multipleSeparator", "rangeSeparator", "inline", "showOtherMonths", "selectOtherMonths", "showIcon", "icon", "appendTo", "readonlyInput", "shortYearCutoff", "monthNavigator", "yearNavigator", "hourFormat", "timeOnly", "stepHour", "stepMinute", "stepSecond", "showSeconds", "required", "showOnFocus", "showWeek", "dataType", "selectionMode", "maxDateCount", "showButtonBar", "todayButtonStyleClass", "clearButtonStyleClass", "autoZIndex", "baseZIndex", "panelStyleClass", "panelStyle", "keepInvalid", "hideOnDateTimeSelect", "numberOfMonths", "view", "touchUI", "timeSeparator", "focusTrap", "firstDayOfWeek", "showTransitionOptions", "hideTransitionOptions", "tabindex", "defaultDate", "minDate", "maxDate", "disabledDates", "disabledDays", "yearRange", "showTime", "locale"], outputs: ["onFocus", "onBlur", "onClose", "onSelect", "onInput", "onTodayClick", "onClearClick", "onMonthChange", "onYearChange", "onClickOutside", "onShow"] }], directives: [{ type: i4__namespace.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i4__namespace.NgTemplateOutlet, selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet"] }, { type: i4__namespace.NgSwitch, selector: "[ngSwitch]", inputs: ["ngSwitch"] }, { type: i4__namespace.NgSwitchCase, selector: "[ngSwitchCase]", inputs: ["ngSwitchCase"] }, { type: i8__namespace.InputText, selector: "[pInputText]" }, { type: i9__namespace.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { type: i9__namespace.NgModel, selector: "[ngModel]:not([formControlName]):not([formControl])", inputs: ["name", "disabled", "ngModel", "ngModelOptions"], outputs: ["ngModelChange"], exportAs: ["ngModel"] }], encapsulation: i0__namespace.ViewEncapsulation.None });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0__namespace, type: ColumnFilterFormElement, decorators: [{
                type: i0.Component,
                args: [{
                        selector: 'p-columnFilterFormElement',
                        template: "\n        <ng-container *ngIf=\"filterTemplate; else builtInElement\">\n            <ng-container *ngTemplateOutlet=\"filterTemplate; context: {$implicit: filterConstraint.value, filterCallback: filterCallback}\"></ng-container>\n        </ng-container>\n        <ng-template #builtInElement>\n            <ng-container [ngSwitch]=\"type\">\n                <input *ngSwitchCase=\"'text'\" type=\"text\" pInputText [value]=\"filterConstraint?.value\" (input)=\"onModelChange($event.target.value)\"\n                    (keydown.enter)=\"onTextInputEnterKeyDown($event)\" [attr.placeholder]=\"placeholder\">\n                <p-inputNumber *ngSwitchCase=\"'numeric'\" [ngModel]=\"filterConstraint?.value\" (ngModelChange)=\"onModelChange($event)\" (onKeyDown)=\"onNumericInputKeyDown($event)\" [showButtons]=\"true\" [attr.placeholder]=\"placeholder\"\n                    [minFractionDigits]=\"minFractionDigits\" [maxFractionDigits]=\"maxFractionDigits\" [prefix]=\"prefix\" [suffix]=\"suffix\" [placeholder]=\"placeholder\"\n                    [mode]=\"currency ? 'currency' : 'decimal'\" [locale]=\"locale\" [localeMatcher]=\"localeMatcher\" [currency]=\"currency\" [currencyDisplay]=\"currencyDisplay\" [useGrouping]=\"useGrouping\"></p-inputNumber>\n                <p-triStateCheckbox *ngSwitchCase=\"'boolean'\" [ngModel]=\"filterConstraint?.value\" (ngModelChange)=\"onModelChange($event)\"></p-triStateCheckbox>\n                <p-calendar *ngSwitchCase=\"'date'\" [ngModel]=\"filterConstraint?.value\" (ngModelChange)=\"onModelChange($event)\"></p-calendar>\n            </ng-container>\n        </ng-template>\n    ",
                        encapsulation: i0.ViewEncapsulation.None,
                        host: {
                            'class': 'p-element'
                        }
                    }]
            }], ctorParameters: function () { return [{ type: Table }]; }, propDecorators: { field: [{
                    type: i0.Input
                }], type: [{
                    type: i0.Input
                }], filterConstraint: [{
                    type: i0.Input
                }], filterTemplate: [{
                    type: i0.Input
                }], placeholder: [{
                    type: i0.Input
                }], minFractionDigits: [{
                    type: i0.Input
                }], maxFractionDigits: [{
                    type: i0.Input
                }], prefix: [{
                    type: i0.Input
                }], suffix: [{
                    type: i0.Input
                }], locale: [{
                    type: i0.Input
                }], localeMatcher: [{
                    type: i0.Input
                }], currency: [{
                    type: i0.Input
                }], currencyDisplay: [{
                    type: i0.Input
                }], useGrouping: [{
                    type: i0.Input
                }] } });
    var ColumnFilter = /** @class */ (function () {
        function ColumnFilter(el, dt, renderer, config, overlayService) {
            this.el = el;
            this.dt = dt;
            this.renderer = renderer;
            this.config = config;
            this.overlayService = overlayService;
            this.type = 'text';
            this.display = 'row';
            this.showMenu = true;
            this.operator = i1.FilterOperator.AND;
            this.showOperator = true;
            this.showClearButton = true;
            this.showApplyButton = true;
            this.showMatchModes = true;
            this.showAddButton = true;
            this.hideOnClear = false;
            this.maxConstraints = 2;
            this.useGrouping = true;
        }
        ColumnFilter.prototype.ngOnInit = function () {
            var _this = this;
            if (!this.dt.filters[this.field]) {
                this.initFieldFilterConstraint();
            }
            this.translationSubscription = this.config.translationObserver.subscribe(function () {
                _this.generateMatchModeOptions();
                _this.generateOperatorOptions();
            });
            this.resetSubscription = this.dt.tableService.resetSource$.subscribe(function () {
                _this.clearFilter();
            });
            this.generateMatchModeOptions();
            this.generateOperatorOptions();
        };
        ColumnFilter.prototype.generateMatchModeOptions = function () {
            var _this = this;
            var _a;
            this.matchModes = this.matchModeOptions ||
                ((_a = this.config.filterMatchModeOptions[this.type]) === null || _a === void 0 ? void 0 : _a.map(function (key) {
                    return { label: _this.config.getTranslation(key), value: key };
                }));
        };
        ColumnFilter.prototype.generateOperatorOptions = function () {
            this.operatorOptions = [
                { label: this.config.getTranslation(i1.TranslationKeys.MATCH_ALL), value: i1.FilterOperator.AND },
                { label: this.config.getTranslation(i1.TranslationKeys.MATCH_ANY), value: i1.FilterOperator.OR }
            ];
        };
        ColumnFilter.prototype.ngAfterContentInit = function () {
            var _this = this;
            this.templates.forEach(function (item) {
                switch (item.getType()) {
                    case 'header':
                        _this.headerTemplate = item.template;
                        break;
                    case 'filter':
                        _this.filterTemplate = item.template;
                        break;
                    case 'footer':
                        _this.footerTemplate = item.template;
                        break;
                    default:
                        _this.filterTemplate = item.template;
                        break;
                }
            });
        };
        ColumnFilter.prototype.initFieldFilterConstraint = function () {
            var defaultMatchMode = this.getDefaultMatchMode();
            this.dt.filters[this.field] = this.display == 'row' ? { value: null, matchMode: defaultMatchMode } : [{ value: null, matchMode: defaultMatchMode, operator: this.operator }];
        };
        ColumnFilter.prototype.onMenuMatchModeChange = function (value, filterMeta) {
            filterMeta.matchMode = value;
            if (!this.showApplyButton) {
                this.dt._filter();
            }
        };
        ColumnFilter.prototype.onRowMatchModeChange = function (matchMode) {
            this.dt.filters[this.field].matchMode = matchMode;
            this.dt._filter();
            this.hide();
        };
        ColumnFilter.prototype.onRowMatchModeKeyDown = function (event) {
            var item = event.target;
            switch (event.key) {
                case 'ArrowDown':
                    var nextItem = this.findNextItem(item);
                    if (nextItem) {
                        item.removeAttribute('tabindex');
                        nextItem.tabIndex = '0';
                        nextItem.focus();
                    }
                    event.preventDefault();
                    break;
                case 'ArrowUp':
                    var prevItem = this.findPrevItem(item);
                    if (prevItem) {
                        item.removeAttribute('tabindex');
                        prevItem.tabIndex = '0';
                        prevItem.focus();
                    }
                    event.preventDefault();
                    break;
            }
        };
        ColumnFilter.prototype.onRowClearItemClick = function () {
            this.clearFilter();
            this.hide();
        };
        ColumnFilter.prototype.isRowMatchModeSelected = function (matchMode) {
            return this.dt.filters[this.field].matchMode === matchMode;
        };
        ColumnFilter.prototype.addConstraint = function () {
            this.dt.filters[this.field].push({ value: null, matchMode: this.getDefaultMatchMode(), operator: this.getDefaultOperator() });
            this.dt._filter();
        };
        ColumnFilter.prototype.removeConstraint = function (filterMeta) {
            this.dt.filters[this.field] = this.dt.filters[this.field].filter(function (meta) { return meta !== filterMeta; });
            this.dt._filter();
        };
        ColumnFilter.prototype.onOperatorChange = function (value) {
            var _this = this;
            this.dt.filters[this.field].forEach(function (filterMeta) {
                filterMeta.operator = value;
                _this.operator = value;
            });
            if (!this.showApplyButton) {
                this.dt._filter();
            }
        };
        ColumnFilter.prototype.toggleMenu = function () {
            this.overlayVisible = !this.overlayVisible;
        };
        ColumnFilter.prototype.onToggleButtonKeyDown = function (event) {
            switch (event.key) {
                case 'Escape':
                case 'Tab':
                    this.overlayVisible = false;
                    break;
                case 'ArrowDown':
                    if (this.overlayVisible) {
                        var focusable = dom.DomHandler.getFocusableElements(this.overlay);
                        if (focusable) {
                            focusable[0].focus();
                        }
                        event.preventDefault();
                    }
                    else if (event.altKey) {
                        this.overlayVisible = true;
                        event.preventDefault();
                    }
                    break;
            }
        };
        ColumnFilter.prototype.onEscape = function () {
            this.overlayVisible = false;
            this.icon.nativeElement.focus();
        };
        ColumnFilter.prototype.findNextItem = function (item) {
            var nextItem = item.nextElementSibling;
            if (nextItem)
                return dom.DomHandler.hasClass(nextItem, 'p-column-filter-separator') ? this.findNextItem(nextItem) : nextItem;
            else
                return item.parentElement.firstElementChild;
        };
        ColumnFilter.prototype.findPrevItem = function (item) {
            var prevItem = item.previousElementSibling;
            if (prevItem)
                return dom.DomHandler.hasClass(prevItem, 'p-column-filter-separator') ? this.findPrevItem(prevItem) : prevItem;
            else
                return item.parentElement.lastElementChild;
        };
        ColumnFilter.prototype.onContentClick = function () {
            this.selfClick = true;
        };
        ColumnFilter.prototype.onOverlayAnimationStart = function (event) {
            var _this = this;
            switch (event.toState) {
                case 'visible':
                    this.overlay = event.element;
                    document.body.appendChild(this.overlay);
                    utils.ZIndexUtils.set('overlay', this.overlay, this.config.zIndex.overlay);
                    dom.DomHandler.absolutePosition(this.overlay, this.icon.nativeElement);
                    this.bindDocumentClickListener();
                    this.bindDocumentResizeListener();
                    this.bindScrollListener();
                    this.overlayEventListener = function (e) {
                        if (_this.overlay && _this.overlay.contains(e.target)) {
                            _this.selfClick = true;
                        }
                    };
                    this.overlaySubscription = this.overlayService.clickObservable.subscribe(this.overlayEventListener);
                    break;
                case 'void':
                    this.onOverlayHide();
                    if (this.overlaySubscription) {
                        this.overlaySubscription.unsubscribe();
                    }
                    break;
            }
        };
        ColumnFilter.prototype.onOverlayAnimationEnd = function (event) {
            switch (event.toState) {
                case 'void':
                    utils.ZIndexUtils.clear(event.element);
                    break;
            }
        };
        ColumnFilter.prototype.getDefaultMatchMode = function () {
            if (this.matchMode) {
                return this.matchMode;
            }
            else {
                if (this.type === 'text')
                    return i1.FilterMatchMode.STARTS_WITH;
                else if (this.type === 'numeric')
                    return i1.FilterMatchMode.EQUALS;
                else if (this.type === 'date')
                    return i1.FilterMatchMode.DATE_IS;
                else
                    return i1.FilterMatchMode.CONTAINS;
            }
        };
        ColumnFilter.prototype.getDefaultOperator = function () {
            return this.dt.filters ? this.dt.filters[this.field][0].operator : this.operator;
        };
        ColumnFilter.prototype.hasRowFilter = function () {
            return this.dt.filters[this.field] && !this.dt.isFilterBlank(this.dt.filters[this.field].value);
        };
        Object.defineProperty(ColumnFilter.prototype, "fieldConstraints", {
            get: function () {
                return this.dt.filters ? this.dt.filters[this.field] : null;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(ColumnFilter.prototype, "showRemoveIcon", {
            get: function () {
                return this.fieldConstraints ? this.fieldConstraints.length > 1 : false;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(ColumnFilter.prototype, "showMenuButton", {
            get: function () {
                return this.showMenu && (this.display === 'row' ? this.type !== 'boolean' : true);
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(ColumnFilter.prototype, "isShowOperator", {
            get: function () {
                return this.showOperator && this.type !== 'boolean';
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(ColumnFilter.prototype, "isShowAddConstraint", {
            get: function () {
                return this.showAddButton && this.type !== 'boolean' && (this.fieldConstraints && this.fieldConstraints.length < this.maxConstraints);
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(ColumnFilter.prototype, "applyButtonLabel", {
            get: function () {
                return this.config.getTranslation(i1.TranslationKeys.APPLY);
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(ColumnFilter.prototype, "clearButtonLabel", {
            get: function () {
                return this.config.getTranslation(i1.TranslationKeys.CLEAR);
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(ColumnFilter.prototype, "addRuleButtonLabel", {
            get: function () {
                return this.config.getTranslation(i1.TranslationKeys.ADD_RULE);
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(ColumnFilter.prototype, "removeRuleButtonLabel", {
            get: function () {
                return this.config.getTranslation(i1.TranslationKeys.REMOVE_RULE);
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(ColumnFilter.prototype, "noFilterLabel", {
            get: function () {
                return this.config.getTranslation(i1.TranslationKeys.NO_FILTER);
            },
            enumerable: false,
            configurable: true
        });
        ColumnFilter.prototype.hasFilter = function () {
            var fieldFilter = this.dt.filters[this.field];
            if (fieldFilter) {
                if (Array.isArray(fieldFilter))
                    return !this.dt.isFilterBlank(fieldFilter[0].value);
                else
                    return !this.dt.isFilterBlank(fieldFilter.value);
            }
            return false;
        };
        ColumnFilter.prototype.isOutsideClicked = function (event) {
            return !(this.overlay.isSameNode(event.target) || this.overlay.contains(event.target)
                || this.icon.nativeElement.isSameNode(event.target) || this.icon.nativeElement.contains(event.target)
                || dom.DomHandler.hasClass(event.target, 'p-column-filter-add-button') || dom.DomHandler.hasClass(event.target.parentElement, 'p-column-filter-add-button')
                || dom.DomHandler.hasClass(event.target, 'p-column-filter-remove-button') || dom.DomHandler.hasClass(event.target.parentElement, 'p-column-filter-remove-button'));
        };
        ColumnFilter.prototype.bindDocumentClickListener = function () {
            var _this = this;
            if (!this.documentClickListener) {
                var documentTarget = this.el ? this.el.nativeElement.ownerDocument : 'document';
                this.documentClickListener = this.renderer.listen(documentTarget, 'mousedown', function (event) {
                    if (_this.overlayVisible && !_this.selfClick && _this.isOutsideClicked(event)) {
                        _this.hide();
                    }
                    _this.selfClick = false;
                });
            }
        };
        ColumnFilter.prototype.unbindDocumentClickListener = function () {
            if (this.documentClickListener) {
                this.documentClickListener();
                this.documentClickListener = null;
                this.selfClick = false;
            }
        };
        ColumnFilter.prototype.bindDocumentResizeListener = function () {
            var _this = this;
            this.documentResizeListener = function () { return _this.hide(); };
            window.addEventListener('resize', this.documentResizeListener);
        };
        ColumnFilter.prototype.unbindDocumentResizeListener = function () {
            if (this.documentResizeListener) {
                window.removeEventListener('resize', this.documentResizeListener);
                this.documentResizeListener = null;
            }
        };
        ColumnFilter.prototype.bindScrollListener = function () {
            var _this = this;
            if (!this.scrollHandler) {
                this.scrollHandler = new dom.ConnectedOverlayScrollHandler(this.icon.nativeElement, function () {
                    if (_this.overlayVisible) {
                        _this.hide();
                    }
                });
            }
            this.scrollHandler.bindScrollListener();
        };
        ColumnFilter.prototype.unbindScrollListener = function () {
            if (this.scrollHandler) {
                this.scrollHandler.unbindScrollListener();
            }
        };
        ColumnFilter.prototype.hide = function () {
            this.overlayVisible = false;
        };
        ColumnFilter.prototype.onOverlayHide = function () {
            this.unbindDocumentClickListener();
            this.unbindDocumentResizeListener();
            this.unbindScrollListener();
            this.overlay = null;
        };
        ColumnFilter.prototype.clearFilter = function () {
            this.initFieldFilterConstraint();
            this.dt._filter();
            if (this.hideOnClear)
                this.hide();
        };
        ColumnFilter.prototype.applyFilter = function () {
            this.dt._filter();
            this.hide();
        };
        ColumnFilter.prototype.ngOnDestroy = function () {
            if (this.overlay) {
                this.el.nativeElement.appendChild(this.overlay);
                utils.ZIndexUtils.clear(this.overlay);
                this.onOverlayHide();
            }
            if (this.translationSubscription) {
                this.translationSubscription.unsubscribe();
            }
            if (this.resetSubscription) {
                this.resetSubscription.unsubscribe();
            }
            if (this.overlaySubscription) {
                this.overlaySubscription.unsubscribe();
            }
        };
        return ColumnFilter;
    }());
    ColumnFilter.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0__namespace, type: ColumnFilter, deps: [{ token: i0__namespace.ElementRef }, { token: Table }, { token: i0__namespace.Renderer2 }, { token: i1__namespace.PrimeNGConfig }, { token: i1__namespace.OverlayService }], target: i0__namespace.ɵɵFactoryTarget.Component });
    ColumnFilter.ɵcmp = i0__namespace.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.0.5", type: ColumnFilter, selector: "p-columnFilter", inputs: { field: "field", type: "type", display: "display", showMenu: "showMenu", matchMode: "matchMode", operator: "operator", showOperator: "showOperator", showClearButton: "showClearButton", showApplyButton: "showApplyButton", showMatchModes: "showMatchModes", showAddButton: "showAddButton", hideOnClear: "hideOnClear", placeholder: "placeholder", matchModeOptions: "matchModeOptions", maxConstraints: "maxConstraints", minFractionDigits: "minFractionDigits", maxFractionDigits: "maxFractionDigits", prefix: "prefix", suffix: "suffix", locale: "locale", localeMatcher: "localeMatcher", currency: "currency", currencyDisplay: "currencyDisplay", useGrouping: "useGrouping" }, host: { classAttribute: "p-element" }, queries: [{ propertyName: "templates", predicate: i1.PrimeTemplate }], viewQueries: [{ propertyName: "icon", first: true, predicate: ["icon"], descendants: true }], ngImport: i0__namespace, template: "\n        <div class=\"p-column-filter\" [ngClass]=\"{'p-column-filter-row': display === 'row', 'p-column-filter-menu': display === 'menu'}\">\n            <p-columnFilterFormElement *ngIf=\"display === 'row'\" class=\"p-fluid\" [type]=\"type\" [field]=\"field\" [filterConstraint]=\"dt.filters[field]\" [filterTemplate]=\"filterTemplate\" [placeholder]=\"placeholder\" [minFractionDigits]=\"minFractionDigits\" [maxFractionDigits]=\"maxFractionDigits\" [prefix]=\"prefix\" [suffix]=\"suffix\"\n                                    [locale]=\"locale\"  [localeMatcher]=\"localeMatcher\" [currency]=\"currency\" [currencyDisplay]=\"currencyDisplay\" [useGrouping]=\"useGrouping\"></p-columnFilterFormElement>\n            <button #icon *ngIf=\"showMenuButton\" type=\"button\" class=\"p-column-filter-menu-button p-link\" aria-haspopup=\"true\" [attr.aria-expanded]=\"overlayVisible\"\n                [ngClass]=\"{'p-column-filter-menu-button-open': overlayVisible, 'p-column-filter-menu-button-active': hasFilter()}\"\n                (click)=\"toggleMenu()\" (keydown)=\"onToggleButtonKeyDown($event)\"><span class=\"pi pi-filter-icon pi-filter\"></span></button>\n            <button #icon *ngIf=\"showMenuButton && display === 'row'\" [ngClass]=\"{'p-hidden-space': !hasRowFilter()}\" type=\"button\" class=\"p-column-filter-clear-button p-link\" (click)=\"clearFilter()\"><span class=\"pi pi-filter-slash\"></span></button>\n            <div *ngIf=\"showMenu && overlayVisible\" [ngClass]=\"{'p-column-filter-overlay p-component p-fluid': true, 'p-column-filter-overlay-menu': display === 'menu'}\" (click)=\"onContentClick()\"\n                [@overlayAnimation]=\"'visible'\" (@overlayAnimation.start)=\"onOverlayAnimationStart($event)\" (@overlayAnimation.done)=\"onOverlayAnimationEnd($event)\" (keydown.escape)=\"onEscape()\">\n                <ng-container *ngTemplateOutlet=\"headerTemplate; context: {$implicit: field}\"></ng-container>\n                <ul *ngIf=\"display === 'row'; else menu\" class=\"p-column-filter-row-items\">\n                    <li class=\"p-column-filter-row-item\" *ngFor=\"let matchMode of matchModes; let i = index;\" (click)=\"onRowMatchModeChange(matchMode.value)\" (keydown)=\"onRowMatchModeKeyDown($event)\" (keydown.enter)=\"this.onRowMatchModeChange(matchMode.value)\"\n                        [ngClass]=\"{'p-highlight': isRowMatchModeSelected(matchMode.value)}\" [attr.tabindex]=\"i === 0 ? '0' : null\">{{matchMode.label}}</li>\n                    <li class=\"p-column-filter-separator\"></li>\n                    <li class=\"p-column-filter-row-item\" (click)=\"onRowClearItemClick()\" (keydown)=\"onRowMatchModeKeyDown($event)\" (keydown.enter)=\"onRowClearItemClick()\">{{noFilterLabel}}</li>\n                </ul>\n                <ng-template #menu>\n                    <div class=\"p-column-filter-operator\" *ngIf=\"isShowOperator\">\n                        <p-dropdown [options]=\"operatorOptions\" [ngModel]=\"operator\" (ngModelChange)=\"onOperatorChange($event)\" styleClass=\"p-column-filter-operator-dropdown\"></p-dropdown>\n                    </div>\n                    <div class=\"p-column-filter-constraints\">\n                        <div *ngFor=\"let fieldConstraint of fieldConstraints; let i = index\" class=\"p-column-filter-constraint\">\n                            <p-dropdown  *ngIf=\"showMatchModes && matchModes\" [options]=\"matchModes\" [ngModel]=\"fieldConstraint.matchMode\" (ngModelChange)=\"onMenuMatchModeChange($event, fieldConstraint)\" styleClass=\"p-column-filter-matchmode-dropdown\"></p-dropdown>\n                            <p-columnFilterFormElement [type]=\"type\" [field]=\"field\" [filterConstraint]=\"fieldConstraint\" [filterTemplate]=\"filterTemplate\" [placeholder]=\"placeholder\"\n                            [minFractionDigits]=\"minFractionDigits\" [maxFractionDigits]=\"maxFractionDigits\" [prefix]=\"prefix\" [suffix]=\"suffix\"\n                            [locale]=\"locale\"  [localeMatcher]=\"localeMatcher\" [currency]=\"currency\" [currencyDisplay]=\"currencyDisplay\" [useGrouping]=\"useGrouping\"></p-columnFilterFormElement>\n                            <div>\n                                <button *ngIf=\"showRemoveIcon\" type=\"button\" pButton icon=\"pi pi-trash\" class=\"p-column-filter-remove-button p-button-text p-button-danger p-button-sm\" (click)=\"removeConstraint(fieldConstraint)\" pRipple [label]=\"removeRuleButtonLabel\"></button>\n                            </div>\n                        </div>\n                    </div>\n                    <div class=\"p-column-filter-add-rule\" *ngIf=\"isShowAddConstraint\">\n                        <button type=\"button\" pButton [label]=\"addRuleButtonLabel\" icon=\"pi pi-plus\" class=\"p-column-filter-add-button p-button-text p-button-sm\" (click)=\"addConstraint()\" pRipple></button>\n                    </div>\n                    <div class=\"p-column-filter-buttonbar\">\n                        <button *ngIf=\"showClearButton\" type=\"button\" pButton class=\"p-button-outlined\" (click)=\"clearFilter()\" [label]=\"clearButtonLabel\" pRipple></button>\n                        <button *ngIf=\"showApplyButton\" type=\"button\" pButton (click)=\"applyFilter()\" [label]=\"applyButtonLabel\" pRipple></button>\n                    </div>\n                </ng-template>\n                <ng-container *ngTemplateOutlet=\"footerTemplate; context: {$implicit: field}\"></ng-container>\n            </div>\n        </div>\n    ", isInline: true, components: [{ type: ColumnFilterFormElement, selector: "p-columnFilterFormElement", inputs: ["field", "type", "filterConstraint", "filterTemplate", "placeholder", "minFractionDigits", "maxFractionDigits", "prefix", "suffix", "locale", "localeMatcher", "currency", "currencyDisplay", "useGrouping"] }, { type: i10__namespace.Dropdown, selector: "p-dropdown", inputs: ["scrollHeight", "filter", "name", "style", "panelStyle", "styleClass", "panelStyleClass", "readonly", "required", "editable", "appendTo", "tabindex", "placeholder", "filterPlaceholder", "filterLocale", "inputId", "selectId", "dataKey", "filterBy", "autofocus", "resetFilterOnHide", "dropdownIcon", "optionLabel", "optionValue", "optionDisabled", "optionGroupLabel", "optionGroupChildren", "autoDisplayFirst", "group", "showClear", "emptyFilterMessage", "emptyMessage", "virtualScroll", "itemSize", "autoZIndex", "baseZIndex", "showTransitionOptions", "hideTransitionOptions", "ariaFilterLabel", "ariaLabelledBy", "filterMatchMode", "maxlength", "tooltip", "tooltipPosition", "tooltipPositionStyle", "tooltipStyleClass", "autofocusFilter", "disabled", "options", "filterValue"], outputs: ["onChange", "onFilter", "onFocus", "onBlur", "onClick", "onShow", "onHide"] }], directives: [{ type: i4__namespace.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { type: i4__namespace.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i4__namespace.NgTemplateOutlet, selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet"] }, { type: i4__namespace.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { type: i9__namespace.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { type: i9__namespace.NgModel, selector: "[ngModel]:not([formControlName]):not([formControl])", inputs: ["name", "disabled", "ngModel", "ngModelOptions"], outputs: ["ngModelChange"], exportAs: ["ngModel"] }, { type: i11__namespace.ButtonDirective, selector: "[pButton]", inputs: ["iconPos", "loadingIcon", "label", "icon", "loading"] }], animations: [
            animations.trigger('overlayAnimation', [
                animations.transition(':enter', [
                    animations.style({ opacity: 0, transform: 'scaleY(0.8)' }),
                    animations.animate('.12s cubic-bezier(0, 0, 0.2, 1)')
                ]),
                animations.transition(':leave', [
                    animations.animate('.1s linear', animations.style({ opacity: 0 }))
                ])
            ])
        ], encapsulation: i0__namespace.ViewEncapsulation.None });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0__namespace, type: ColumnFilter, decorators: [{
                type: i0.Component,
                args: [{
                        selector: 'p-columnFilter',
                        template: "\n        <div class=\"p-column-filter\" [ngClass]=\"{'p-column-filter-row': display === 'row', 'p-column-filter-menu': display === 'menu'}\">\n            <p-columnFilterFormElement *ngIf=\"display === 'row'\" class=\"p-fluid\" [type]=\"type\" [field]=\"field\" [filterConstraint]=\"dt.filters[field]\" [filterTemplate]=\"filterTemplate\" [placeholder]=\"placeholder\" [minFractionDigits]=\"minFractionDigits\" [maxFractionDigits]=\"maxFractionDigits\" [prefix]=\"prefix\" [suffix]=\"suffix\"\n                                    [locale]=\"locale\"  [localeMatcher]=\"localeMatcher\" [currency]=\"currency\" [currencyDisplay]=\"currencyDisplay\" [useGrouping]=\"useGrouping\"></p-columnFilterFormElement>\n            <button #icon *ngIf=\"showMenuButton\" type=\"button\" class=\"p-column-filter-menu-button p-link\" aria-haspopup=\"true\" [attr.aria-expanded]=\"overlayVisible\"\n                [ngClass]=\"{'p-column-filter-menu-button-open': overlayVisible, 'p-column-filter-menu-button-active': hasFilter()}\"\n                (click)=\"toggleMenu()\" (keydown)=\"onToggleButtonKeyDown($event)\"><span class=\"pi pi-filter-icon pi-filter\"></span></button>\n            <button #icon *ngIf=\"showMenuButton && display === 'row'\" [ngClass]=\"{'p-hidden-space': !hasRowFilter()}\" type=\"button\" class=\"p-column-filter-clear-button p-link\" (click)=\"clearFilter()\"><span class=\"pi pi-filter-slash\"></span></button>\n            <div *ngIf=\"showMenu && overlayVisible\" [ngClass]=\"{'p-column-filter-overlay p-component p-fluid': true, 'p-column-filter-overlay-menu': display === 'menu'}\" (click)=\"onContentClick()\"\n                [@overlayAnimation]=\"'visible'\" (@overlayAnimation.start)=\"onOverlayAnimationStart($event)\" (@overlayAnimation.done)=\"onOverlayAnimationEnd($event)\" (keydown.escape)=\"onEscape()\">\n                <ng-container *ngTemplateOutlet=\"headerTemplate; context: {$implicit: field}\"></ng-container>\n                <ul *ngIf=\"display === 'row'; else menu\" class=\"p-column-filter-row-items\">\n                    <li class=\"p-column-filter-row-item\" *ngFor=\"let matchMode of matchModes; let i = index;\" (click)=\"onRowMatchModeChange(matchMode.value)\" (keydown)=\"onRowMatchModeKeyDown($event)\" (keydown.enter)=\"this.onRowMatchModeChange(matchMode.value)\"\n                        [ngClass]=\"{'p-highlight': isRowMatchModeSelected(matchMode.value)}\" [attr.tabindex]=\"i === 0 ? '0' : null\">{{matchMode.label}}</li>\n                    <li class=\"p-column-filter-separator\"></li>\n                    <li class=\"p-column-filter-row-item\" (click)=\"onRowClearItemClick()\" (keydown)=\"onRowMatchModeKeyDown($event)\" (keydown.enter)=\"onRowClearItemClick()\">{{noFilterLabel}}</li>\n                </ul>\n                <ng-template #menu>\n                    <div class=\"p-column-filter-operator\" *ngIf=\"isShowOperator\">\n                        <p-dropdown [options]=\"operatorOptions\" [ngModel]=\"operator\" (ngModelChange)=\"onOperatorChange($event)\" styleClass=\"p-column-filter-operator-dropdown\"></p-dropdown>\n                    </div>\n                    <div class=\"p-column-filter-constraints\">\n                        <div *ngFor=\"let fieldConstraint of fieldConstraints; let i = index\" class=\"p-column-filter-constraint\">\n                            <p-dropdown  *ngIf=\"showMatchModes && matchModes\" [options]=\"matchModes\" [ngModel]=\"fieldConstraint.matchMode\" (ngModelChange)=\"onMenuMatchModeChange($event, fieldConstraint)\" styleClass=\"p-column-filter-matchmode-dropdown\"></p-dropdown>\n                            <p-columnFilterFormElement [type]=\"type\" [field]=\"field\" [filterConstraint]=\"fieldConstraint\" [filterTemplate]=\"filterTemplate\" [placeholder]=\"placeholder\"\n                            [minFractionDigits]=\"minFractionDigits\" [maxFractionDigits]=\"maxFractionDigits\" [prefix]=\"prefix\" [suffix]=\"suffix\"\n                            [locale]=\"locale\"  [localeMatcher]=\"localeMatcher\" [currency]=\"currency\" [currencyDisplay]=\"currencyDisplay\" [useGrouping]=\"useGrouping\"></p-columnFilterFormElement>\n                            <div>\n                                <button *ngIf=\"showRemoveIcon\" type=\"button\" pButton icon=\"pi pi-trash\" class=\"p-column-filter-remove-button p-button-text p-button-danger p-button-sm\" (click)=\"removeConstraint(fieldConstraint)\" pRipple [label]=\"removeRuleButtonLabel\"></button>\n                            </div>\n                        </div>\n                    </div>\n                    <div class=\"p-column-filter-add-rule\" *ngIf=\"isShowAddConstraint\">\n                        <button type=\"button\" pButton [label]=\"addRuleButtonLabel\" icon=\"pi pi-plus\" class=\"p-column-filter-add-button p-button-text p-button-sm\" (click)=\"addConstraint()\" pRipple></button>\n                    </div>\n                    <div class=\"p-column-filter-buttonbar\">\n                        <button *ngIf=\"showClearButton\" type=\"button\" pButton class=\"p-button-outlined\" (click)=\"clearFilter()\" [label]=\"clearButtonLabel\" pRipple></button>\n                        <button *ngIf=\"showApplyButton\" type=\"button\" pButton (click)=\"applyFilter()\" [label]=\"applyButtonLabel\" pRipple></button>\n                    </div>\n                </ng-template>\n                <ng-container *ngTemplateOutlet=\"footerTemplate; context: {$implicit: field}\"></ng-container>\n            </div>\n        </div>\n    ",
                        animations: [
                            animations.trigger('overlayAnimation', [
                                animations.transition(':enter', [
                                    animations.style({ opacity: 0, transform: 'scaleY(0.8)' }),
                                    animations.animate('.12s cubic-bezier(0, 0, 0.2, 1)')
                                ]),
                                animations.transition(':leave', [
                                    animations.animate('.1s linear', animations.style({ opacity: 0 }))
                                ])
                            ])
                        ],
                        encapsulation: i0.ViewEncapsulation.None,
                        host: {
                            'class': 'p-element'
                        }
                    }]
            }], ctorParameters: function () { return [{ type: i0__namespace.ElementRef }, { type: Table }, { type: i0__namespace.Renderer2 }, { type: i1__namespace.PrimeNGConfig }, { type: i1__namespace.OverlayService }]; }, propDecorators: { field: [{
                    type: i0.Input
                }], type: [{
                    type: i0.Input
                }], display: [{
                    type: i0.Input
                }], showMenu: [{
                    type: i0.Input
                }], matchMode: [{
                    type: i0.Input
                }], operator: [{
                    type: i0.Input
                }], showOperator: [{
                    type: i0.Input
                }], showClearButton: [{
                    type: i0.Input
                }], showApplyButton: [{
                    type: i0.Input
                }], showMatchModes: [{
                    type: i0.Input
                }], showAddButton: [{
                    type: i0.Input
                }], hideOnClear: [{
                    type: i0.Input
                }], placeholder: [{
                    type: i0.Input
                }], matchModeOptions: [{
                    type: i0.Input
                }], maxConstraints: [{
                    type: i0.Input
                }], minFractionDigits: [{
                    type: i0.Input
                }], maxFractionDigits: [{
                    type: i0.Input
                }], prefix: [{
                    type: i0.Input
                }], suffix: [{
                    type: i0.Input
                }], locale: [{
                    type: i0.Input
                }], localeMatcher: [{
                    type: i0.Input
                }], currency: [{
                    type: i0.Input
                }], currencyDisplay: [{
                    type: i0.Input
                }], useGrouping: [{
                    type: i0.Input
                }], icon: [{
                    type: i0.ViewChild,
                    args: ['icon']
                }], templates: [{
                    type: i0.ContentChildren,
                    args: [i1.PrimeTemplate]
                }] } });
    var TableModule = /** @class */ (function () {
        function TableModule() {
        }
        return TableModule;
    }());
    TableModule.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0__namespace, type: TableModule, deps: [], target: i0__namespace.ɵɵFactoryTarget.NgModule });
    TableModule.ɵmod = i0__namespace.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0__namespace, type: TableModule, declarations: [Table, SortableColumn, FrozenColumn, RowGroupHeader, SelectableRow, RowToggler, ContextMenuRow, ResizableColumn, ReorderableColumn, EditableColumn, CellEditor, TableBody, SortIcon, TableRadioButton, TableCheckbox, TableHeaderCheckbox, ReorderableRowHandle, ReorderableRow, SelectableRowDblClick, EditableRow, InitEditableRow, SaveEditableRow, CancelEditableRow, ColumnFilter, ColumnFilterFormElement], imports: [i4.CommonModule, i2.PaginatorModule, i8.InputTextModule, i10.DropdownModule, i3.ScrollingModule, i9.FormsModule, i11.ButtonModule, selectbutton.SelectButtonModule, i7.CalendarModule, i5.InputNumberModule, i6.TriStateCheckboxModule], exports: [Table, i1.SharedModule, SortableColumn, FrozenColumn, RowGroupHeader, SelectableRow, RowToggler, ContextMenuRow, ResizableColumn, ReorderableColumn, EditableColumn, CellEditor, SortIcon, TableRadioButton, TableCheckbox, TableHeaderCheckbox, ReorderableRowHandle, ReorderableRow, SelectableRowDblClick, EditableRow, InitEditableRow, SaveEditableRow, CancelEditableRow, i3.ScrollingModule, ColumnFilter] });
    TableModule.ɵinj = i0__namespace.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0__namespace, type: TableModule, imports: [[i4.CommonModule, i2.PaginatorModule, i8.InputTextModule, i10.DropdownModule, i3.ScrollingModule, i9.FormsModule, i11.ButtonModule, selectbutton.SelectButtonModule, i7.CalendarModule, i5.InputNumberModule, i6.TriStateCheckboxModule], i1.SharedModule,
            i3.ScrollingModule] });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0__namespace, type: TableModule, decorators: [{
                type: i0.NgModule,
                args: [{
                        imports: [i4.CommonModule, i2.PaginatorModule, i8.InputTextModule, i10.DropdownModule, i3.ScrollingModule, i9.FormsModule, i11.ButtonModule, selectbutton.SelectButtonModule, i7.CalendarModule, i5.InputNumberModule, i6.TriStateCheckboxModule],
                        exports: [Table, i1.SharedModule, SortableColumn, FrozenColumn, RowGroupHeader, SelectableRow, RowToggler, ContextMenuRow, ResizableColumn, ReorderableColumn, EditableColumn, CellEditor, SortIcon,
                            TableRadioButton, TableCheckbox, TableHeaderCheckbox, ReorderableRowHandle, ReorderableRow, SelectableRowDblClick, EditableRow, InitEditableRow, SaveEditableRow, CancelEditableRow, i3.ScrollingModule, ColumnFilter],
                        declarations: [Table, SortableColumn, FrozenColumn, RowGroupHeader, SelectableRow, RowToggler, ContextMenuRow, ResizableColumn, ReorderableColumn, EditableColumn, CellEditor, TableBody, SortIcon,
                            TableRadioButton, TableCheckbox, TableHeaderCheckbox, ReorderableRowHandle, ReorderableRow, SelectableRowDblClick, EditableRow, InitEditableRow, SaveEditableRow, CancelEditableRow, ColumnFilter, ColumnFilterFormElement]
                    }]
            }] });

    /**
     * Generated bundle index. Do not edit.
     */

    exports.CancelEditableRow = CancelEditableRow;
    exports.CellEditor = CellEditor;
    exports.ColumnFilter = ColumnFilter;
    exports.ColumnFilterFormElement = ColumnFilterFormElement;
    exports.ContextMenuRow = ContextMenuRow;
    exports.EditableColumn = EditableColumn;
    exports.EditableRow = EditableRow;
    exports.FrozenColumn = FrozenColumn;
    exports.InitEditableRow = InitEditableRow;
    exports.ReorderableColumn = ReorderableColumn;
    exports.ReorderableRow = ReorderableRow;
    exports.ReorderableRowHandle = ReorderableRowHandle;
    exports.ResizableColumn = ResizableColumn;
    exports.RowGroupHeader = RowGroupHeader;
    exports.RowToggler = RowToggler;
    exports.SaveEditableRow = SaveEditableRow;
    exports.SelectableRow = SelectableRow;
    exports.SelectableRowDblClick = SelectableRowDblClick;
    exports.SortIcon = SortIcon;
    exports.SortableColumn = SortableColumn;
    exports.Table = Table;
    exports.TableBody = TableBody;
    exports.TableCheckbox = TableCheckbox;
    exports.TableHeaderCheckbox = TableHeaderCheckbox;
    exports.TableModule = TableModule;
    exports.TableRadioButton = TableRadioButton;
    exports.TableService = TableService;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=primeng-table.umd.js.map
