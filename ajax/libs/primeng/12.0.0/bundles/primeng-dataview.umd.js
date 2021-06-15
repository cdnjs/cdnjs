(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@angular/common'), require('primeng/utils'), require('primeng/api'), require('primeng/paginator')) :
    typeof define === 'function' && define.amd ? define('primeng/dataview', ['exports', '@angular/core', '@angular/common', 'primeng/utils', 'primeng/api', 'primeng/paginator'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory((global.primeng = global.primeng || {}, global.primeng.dataview = {}), global.ng.core, global.ng.common, global.primeng.utils, global.primeng.api, global.primeng.paginator));
}(this, (function (exports, i0, i3, utils, i1, i2) { 'use strict';

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
    var i3__namespace = /*#__PURE__*/_interopNamespace(i3);
    var i1__namespace = /*#__PURE__*/_interopNamespace(i1);
    var i2__namespace = /*#__PURE__*/_interopNamespace(i2);

    var DataView = /** @class */ (function () {
        function DataView(el, cd, filterService, config) {
            this.el = el;
            this.cd = cd;
            this.filterService = filterService;
            this.config = config;
            this.pageLinks = 5;
            this.paginatorPosition = 'bottom';
            this.alwaysShowPaginator = true;
            this.paginatorDropdownScrollHeight = '200px';
            this.currentPageReportTemplate = '{currentPage} of {totalPages}';
            this.showFirstLastIcon = true;
            this.showPageLinks = true;
            this.emptyMessage = '';
            this.onLazyLoad = new i0.EventEmitter();
            this.trackBy = function (index, item) { return item; };
            this.loadingIcon = 'pi pi-spinner';
            this.first = 0;
            this.onPage = new i0.EventEmitter();
            this.onSort = new i0.EventEmitter();
            this.onChangeLayout = new i0.EventEmitter();
            this._layout = 'list';
        }
        Object.defineProperty(DataView.prototype, "layout", {
            get: function () {
                return this._layout;
            },
            set: function (layout) {
                this._layout = layout;
                if (this.initialized) {
                    this.changeLayout(layout);
                }
            },
            enumerable: false,
            configurable: true
        });
        DataView.prototype.ngOnInit = function () {
            var _this = this;
            if (this.lazy) {
                this.onLazyLoad.emit(this.createLazyLoadMetadata());
            }
            this.translationSubscription = this.config.translationObserver.subscribe(function () {
                _this.cd.markForCheck();
            });
            this.initialized = true;
        };
        DataView.prototype.ngOnChanges = function (simpleChanges) {
            if (simpleChanges.value) {
                this._value = simpleChanges.value.currentValue;
                this.updateTotalRecords();
                if (!this.lazy && this.hasFilter()) {
                    this.filter(this.filterValue);
                }
            }
            if (simpleChanges.sortField || simpleChanges.sortOrder) {
                //avoid triggering lazy load prior to lazy initialization at onInit
                if (!this.lazy || this.initialized) {
                    this.sort();
                }
            }
        };
        DataView.prototype.ngAfterContentInit = function () {
            var _this = this;
            this.templates.forEach(function (item) {
                switch (item.getType()) {
                    case 'listItem':
                        _this.listItemTemplate = item.template;
                        break;
                    case 'gridItem':
                        _this.gridItemTemplate = item.template;
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
                    case 'empty':
                        _this.emptyMessageTemplate = item.template;
                        break;
                    case 'header':
                        _this.headerTemplate = item.template;
                        break;
                    case 'footer':
                        _this.footerTemplate = item.template;
                        break;
                }
            });
            this.updateItemTemplate();
        };
        DataView.prototype.updateItemTemplate = function () {
            switch (this.layout) {
                case 'list':
                    this.itemTemplate = this.listItemTemplate;
                    break;
                case 'grid':
                    this.itemTemplate = this.gridItemTemplate;
                    break;
            }
        };
        DataView.prototype.changeLayout = function (layout) {
            this._layout = layout;
            this.onChangeLayout.emit({
                layout: this.layout
            });
            this.updateItemTemplate();
            this.cd.markForCheck();
        };
        DataView.prototype.updateTotalRecords = function () {
            this.totalRecords = this.lazy ? this.totalRecords : (this._value ? this._value.length : 0);
        };
        DataView.prototype.paginate = function (event) {
            this.first = event.first;
            this.rows = event.rows;
            if (this.lazy) {
                this.onLazyLoad.emit(this.createLazyLoadMetadata());
            }
            this.onPage.emit({
                first: this.first,
                rows: this.rows
            });
        };
        DataView.prototype.sort = function () {
            var _this = this;
            this.first = 0;
            if (this.lazy) {
                this.onLazyLoad.emit(this.createLazyLoadMetadata());
            }
            else if (this.value) {
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
                if (this.hasFilter()) {
                    this.filter(this.filterValue);
                }
            }
            this.onSort.emit({
                sortField: this.sortField,
                sortOrder: this.sortOrder
            });
        };
        DataView.prototype.isEmpty = function () {
            var data = this.filteredValue || this.value;
            return data == null || data.length == 0;
        };
        DataView.prototype.createLazyLoadMetadata = function () {
            return {
                first: this.first,
                rows: this.rows,
                sortField: this.sortField,
                sortOrder: this.sortOrder
            };
        };
        DataView.prototype.getBlockableElement = function () {
            return this.el.nativeElement.children[0];
        };
        Object.defineProperty(DataView.prototype, "emptyMessageLabel", {
            get: function () {
                return this.emptyMessage || this.config.getTranslation(i1.TranslationKeys.EMPTY_MESSAGE);
            },
            enumerable: false,
            configurable: true
        });
        DataView.prototype.filter = function (filter, filterMatchMode) {
            if (filterMatchMode === void 0) { filterMatchMode = "contains"; }
            this.filterValue = filter;
            if (this.value && this.value.length) {
                var searchFields = this.filterBy.split(',');
                this.filteredValue = this.filterService.filter(this.value, searchFields, filter, filterMatchMode, this.filterLocale);
                if (this.filteredValue.length === this.value.length) {
                    this.filteredValue = null;
                }
                if (this.paginator) {
                    this.first = 0;
                    this.totalRecords = this.filteredValue ? this.filteredValue.length : this.value ? this.value.length : 0;
                }
                this.cd.markForCheck();
            }
        };
        DataView.prototype.hasFilter = function () {
            return this.filterValue && this.filterValue.trim().length > 0;
        };
        DataView.prototype.ngOnDestroy = function () {
            if (this.translationSubscription) {
                this.translationSubscription.unsubscribe();
            }
        };
        return DataView;
    }());
    DataView.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.0.4", ngImport: i0__namespace, type: DataView, deps: [{ token: i0__namespace.ElementRef }, { token: i0__namespace.ChangeDetectorRef }, { token: i1__namespace.FilterService }, { token: i1__namespace.PrimeNGConfig }], target: i0__namespace.ɵɵFactoryTarget.Component });
    DataView.ɵcmp = i0__namespace.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.0.4", type: DataView, selector: "p-dataView", inputs: { paginator: "paginator", rows: "rows", totalRecords: "totalRecords", pageLinks: "pageLinks", rowsPerPageOptions: "rowsPerPageOptions", paginatorPosition: "paginatorPosition", alwaysShowPaginator: "alwaysShowPaginator", paginatorDropdownAppendTo: "paginatorDropdownAppendTo", paginatorDropdownScrollHeight: "paginatorDropdownScrollHeight", currentPageReportTemplate: "currentPageReportTemplate", showCurrentPageReport: "showCurrentPageReport", showJumpToPageDropdown: "showJumpToPageDropdown", showFirstLastIcon: "showFirstLastIcon", showPageLinks: "showPageLinks", lazy: "lazy", emptyMessage: "emptyMessage", style: "style", styleClass: "styleClass", trackBy: "trackBy", filterBy: "filterBy", filterLocale: "filterLocale", loading: "loading", loadingIcon: "loadingIcon", first: "first", sortField: "sortField", sortOrder: "sortOrder", value: "value", layout: "layout" }, outputs: { onLazyLoad: "onLazyLoad", onPage: "onPage", onSort: "onSort", onChangeLayout: "onChangeLayout" }, queries: [{ propertyName: "header", first: true, predicate: i1.Header, descendants: true }, { propertyName: "footer", first: true, predicate: i1.Footer, descendants: true }, { propertyName: "templates", predicate: i1.PrimeTemplate }], usesOnChanges: true, ngImport: i0__namespace, template: "\n        <div [ngClass]=\"{'p-dataview p-component': true, 'p-dataview-list': (layout === 'list'), 'p-dataview-grid': (layout === 'grid')}\" [ngStyle]=\"style\" [class]=\"styleClass\">\n            <div class=\"p-dataview-loading\" *ngIf=\"loading\">\n                <div class=\"p-dataview-loading-overlay p-component-overlay\">\n                    <i [class]=\"'p-dataview-loading-icon pi-spin ' + loadingIcon\"></i>\n                </div>\n            </div>\n            <div class=\"p-dataview-header\" *ngIf=\"header || headerTemplate\">\n                <ng-content select=\"p-header\"></ng-content>\n                <ng-container *ngTemplateOutlet=\"headerTemplate\"></ng-container>\n            </div>\n            <p-paginator [rows]=\"rows\" [first]=\"first\" [totalRecords]=\"totalRecords\" [pageLinkSize]=\"pageLinks\" [alwaysShow]=\"alwaysShowPaginator\"\n                (onPageChange)=\"paginate($event)\" styleClass=\"p-paginator-top\" [rowsPerPageOptions]=\"rowsPerPageOptions\" *ngIf=\"paginator && (paginatorPosition === 'top' || paginatorPosition =='both')\"\n                [dropdownAppendTo]=\"paginatorDropdownAppendTo\" [dropdownScrollHeight]=\"paginatorDropdownScrollHeight\" [templateLeft]=\"paginatorLeftTemplate\" [templateRight]=\"paginatorRightTemplate\"\n                [currentPageReportTemplate]=\"currentPageReportTemplate\" [showFirstLastIcon]=\"showFirstLastIcon\" [dropdownItemTemplate]=\"paginatorDropdownItemTemplate\" [showCurrentPageReport]=\"showCurrentPageReport\" [showJumpToPageDropdown]=\"showJumpToPageDropdown\" [showPageLinks]=\"showPageLinks\"></p-paginator>\n            <div class=\"p-dataview-content\">\n                <div class=\"p-grid p-nogutter\">\n                    <ng-template ngFor let-rowData let-rowIndex=\"index\" [ngForOf]=\"paginator ? ((filteredValue||value) | slice:(lazy ? 0 : first):((lazy ? 0 : first) + rows)) : (filteredValue||value)\" [ngForTrackBy]=\"trackBy\">\n                        <ng-container *ngTemplateOutlet=\"itemTemplate; context: {$implicit: rowData, rowIndex: rowIndex}\"></ng-container>\n                    </ng-template>\n                    <div *ngIf=\"isEmpty()\" class=\"p-col\">\n                            <div class=\"p-dataview-emptymessage\">\n                            <ng-container *ngIf=\"!emptyMessageTemplate; else emptyFilter\">\n                                    {{emptyMessageLabel}}\n                            </ng-container>\n                            <ng-container #emptyFilter *ngTemplateOutlet=\"emptyMessageTemplate\"></ng-container>\n                        </div>\n                    </div>\n                </div>\n            </div>\n            <p-paginator [rows]=\"rows\" [first]=\"first\" [totalRecords]=\"totalRecords\" [pageLinkSize]=\"pageLinks\" [alwaysShow]=\"alwaysShowPaginator\"\n                (onPageChange)=\"paginate($event)\" styleClass=\"p-paginator-bottom\" [rowsPerPageOptions]=\"rowsPerPageOptions\" *ngIf=\"paginator && (paginatorPosition === 'bottom' || paginatorPosition =='both')\"\n                [dropdownAppendTo]=\"paginatorDropdownAppendTo\" [dropdownScrollHeight]=\"paginatorDropdownScrollHeight\" [templateLeft]=\"paginatorLeftTemplate\" [templateRight]=\"paginatorRightTemplate\"\n                [currentPageReportTemplate]=\"currentPageReportTemplate\" [showFirstLastIcon]=\"showFirstLastIcon\" [dropdownItemTemplate]=\"paginatorDropdownItemTemplate\" [showCurrentPageReport]=\"showCurrentPageReport\" [showJumpToPageDropdown]=\"showJumpToPageDropdown\" [showPageLinks]=\"showPageLinks\"></p-paginator>\n            <div class=\"p-dataview-footer\" *ngIf=\"footer || footerTemplate\">\n                <ng-content select=\"p-footer\"></ng-content>\n                <ng-container *ngTemplateOutlet=\"footerTemplate\"></ng-container>\n            </div>\n        </div>\n    ", isInline: true, styles: [".p-dataview{position:relative}.p-dataview .p-dataview-loading-overlay{position:absolute;display:flex;align-items:center;justify-content:center;z-index:2}"], components: [{ type: i2__namespace.Paginator, selector: "p-paginator", inputs: ["pageLinkSize", "style", "styleClass", "alwaysShow", "templateLeft", "templateRight", "dropdownAppendTo", "dropdownScrollHeight", "currentPageReportTemplate", "showCurrentPageReport", "showFirstLastIcon", "totalRecords", "rows", "rowsPerPageOptions", "showJumpToPageDropdown", "showPageLinks", "dropdownItemTemplate", "first"], outputs: ["onPageChange"] }], directives: [{ type: i3__namespace.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { type: i3__namespace.NgStyle, selector: "[ngStyle]", inputs: ["ngStyle"] }, { type: i3__namespace.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i3__namespace.NgTemplateOutlet, selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet"] }, { type: i3__namespace.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }], pipes: { "slice": i3__namespace.SlicePipe }, changeDetection: i0__namespace.ChangeDetectionStrategy.OnPush, encapsulation: i0__namespace.ViewEncapsulation.None });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.0.4", ngImport: i0__namespace, type: DataView, decorators: [{
                type: i0.Component,
                args: [{
                        selector: 'p-dataView',
                        template: "\n        <div [ngClass]=\"{'p-dataview p-component': true, 'p-dataview-list': (layout === 'list'), 'p-dataview-grid': (layout === 'grid')}\" [ngStyle]=\"style\" [class]=\"styleClass\">\n            <div class=\"p-dataview-loading\" *ngIf=\"loading\">\n                <div class=\"p-dataview-loading-overlay p-component-overlay\">\n                    <i [class]=\"'p-dataview-loading-icon pi-spin ' + loadingIcon\"></i>\n                </div>\n            </div>\n            <div class=\"p-dataview-header\" *ngIf=\"header || headerTemplate\">\n                <ng-content select=\"p-header\"></ng-content>\n                <ng-container *ngTemplateOutlet=\"headerTemplate\"></ng-container>\n            </div>\n            <p-paginator [rows]=\"rows\" [first]=\"first\" [totalRecords]=\"totalRecords\" [pageLinkSize]=\"pageLinks\" [alwaysShow]=\"alwaysShowPaginator\"\n                (onPageChange)=\"paginate($event)\" styleClass=\"p-paginator-top\" [rowsPerPageOptions]=\"rowsPerPageOptions\" *ngIf=\"paginator && (paginatorPosition === 'top' || paginatorPosition =='both')\"\n                [dropdownAppendTo]=\"paginatorDropdownAppendTo\" [dropdownScrollHeight]=\"paginatorDropdownScrollHeight\" [templateLeft]=\"paginatorLeftTemplate\" [templateRight]=\"paginatorRightTemplate\"\n                [currentPageReportTemplate]=\"currentPageReportTemplate\" [showFirstLastIcon]=\"showFirstLastIcon\" [dropdownItemTemplate]=\"paginatorDropdownItemTemplate\" [showCurrentPageReport]=\"showCurrentPageReport\" [showJumpToPageDropdown]=\"showJumpToPageDropdown\" [showPageLinks]=\"showPageLinks\"></p-paginator>\n            <div class=\"p-dataview-content\">\n                <div class=\"p-grid p-nogutter\">\n                    <ng-template ngFor let-rowData let-rowIndex=\"index\" [ngForOf]=\"paginator ? ((filteredValue||value) | slice:(lazy ? 0 : first):((lazy ? 0 : first) + rows)) : (filteredValue||value)\" [ngForTrackBy]=\"trackBy\">\n                        <ng-container *ngTemplateOutlet=\"itemTemplate; context: {$implicit: rowData, rowIndex: rowIndex}\"></ng-container>\n                    </ng-template>\n                    <div *ngIf=\"isEmpty()\" class=\"p-col\">\n                            <div class=\"p-dataview-emptymessage\">\n                            <ng-container *ngIf=\"!emptyMessageTemplate; else emptyFilter\">\n                                    {{emptyMessageLabel}}\n                            </ng-container>\n                            <ng-container #emptyFilter *ngTemplateOutlet=\"emptyMessageTemplate\"></ng-container>\n                        </div>\n                    </div>\n                </div>\n            </div>\n            <p-paginator [rows]=\"rows\" [first]=\"first\" [totalRecords]=\"totalRecords\" [pageLinkSize]=\"pageLinks\" [alwaysShow]=\"alwaysShowPaginator\"\n                (onPageChange)=\"paginate($event)\" styleClass=\"p-paginator-bottom\" [rowsPerPageOptions]=\"rowsPerPageOptions\" *ngIf=\"paginator && (paginatorPosition === 'bottom' || paginatorPosition =='both')\"\n                [dropdownAppendTo]=\"paginatorDropdownAppendTo\" [dropdownScrollHeight]=\"paginatorDropdownScrollHeight\" [templateLeft]=\"paginatorLeftTemplate\" [templateRight]=\"paginatorRightTemplate\"\n                [currentPageReportTemplate]=\"currentPageReportTemplate\" [showFirstLastIcon]=\"showFirstLastIcon\" [dropdownItemTemplate]=\"paginatorDropdownItemTemplate\" [showCurrentPageReport]=\"showCurrentPageReport\" [showJumpToPageDropdown]=\"showJumpToPageDropdown\" [showPageLinks]=\"showPageLinks\"></p-paginator>\n            <div class=\"p-dataview-footer\" *ngIf=\"footer || footerTemplate\">\n                <ng-content select=\"p-footer\"></ng-content>\n                <ng-container *ngTemplateOutlet=\"footerTemplate\"></ng-container>\n            </div>\n        </div>\n    ",
                        changeDetection: i0.ChangeDetectionStrategy.OnPush,
                        encapsulation: i0.ViewEncapsulation.None,
                        styleUrls: ['./dataview.css']
                    }]
            }], ctorParameters: function () { return [{ type: i0__namespace.ElementRef }, { type: i0__namespace.ChangeDetectorRef }, { type: i1__namespace.FilterService }, { type: i1__namespace.PrimeNGConfig }]; }, propDecorators: { paginator: [{
                    type: i0.Input
                }], rows: [{
                    type: i0.Input
                }], totalRecords: [{
                    type: i0.Input
                }], pageLinks: [{
                    type: i0.Input
                }], rowsPerPageOptions: [{
                    type: i0.Input
                }], paginatorPosition: [{
                    type: i0.Input
                }], alwaysShowPaginator: [{
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
                }], lazy: [{
                    type: i0.Input
                }], emptyMessage: [{
                    type: i0.Input
                }], onLazyLoad: [{
                    type: i0.Output
                }], style: [{
                    type: i0.Input
                }], styleClass: [{
                    type: i0.Input
                }], trackBy: [{
                    type: i0.Input
                }], filterBy: [{
                    type: i0.Input
                }], filterLocale: [{
                    type: i0.Input
                }], loading: [{
                    type: i0.Input
                }], loadingIcon: [{
                    type: i0.Input
                }], first: [{
                    type: i0.Input
                }], sortField: [{
                    type: i0.Input
                }], sortOrder: [{
                    type: i0.Input
                }], value: [{
                    type: i0.Input
                }], onPage: [{
                    type: i0.Output
                }], onSort: [{
                    type: i0.Output
                }], onChangeLayout: [{
                    type: i0.Output
                }], header: [{
                    type: i0.ContentChild,
                    args: [i1.Header]
                }], footer: [{
                    type: i0.ContentChild,
                    args: [i1.Footer]
                }], templates: [{
                    type: i0.ContentChildren,
                    args: [i1.PrimeTemplate]
                }], layout: [{
                    type: i0.Input
                }] } });
    var DataViewLayoutOptions = /** @class */ (function () {
        function DataViewLayoutOptions(dv) {
            this.dv = dv;
        }
        DataViewLayoutOptions.prototype.changeLayout = function (event, layout) {
            this.dv.changeLayout(layout);
            event.preventDefault();
        };
        return DataViewLayoutOptions;
    }());
    DataViewLayoutOptions.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.0.4", ngImport: i0__namespace, type: DataViewLayoutOptions, deps: [{ token: DataView }], target: i0__namespace.ɵɵFactoryTarget.Component });
    DataViewLayoutOptions.ɵcmp = i0__namespace.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.0.4", type: DataViewLayoutOptions, selector: "p-dataViewLayoutOptions", inputs: { style: "style", styleClass: "styleClass" }, ngImport: i0__namespace, template: "\n        <div [ngClass]=\"'p-dataview-layout-options p-selectbutton p-buttonset'\" [ngStyle]=\"style\" [class]=\"styleClass\">\n            <button type=\"button\" class=\"p-button p-button-icon-only\" [ngClass]=\"{'p-highlight': dv.layout === 'list'}\" (click)=\"changeLayout($event, 'list')\" (keydown.enter)=\"changeLayout($event, 'list')\">\n                <i class=\"pi pi-bars\"></i>\n            </button><button type=\"button\" class=\"p-button p-button-icon-only\" [ngClass]=\"{'p-highlight': dv.layout === 'grid'}\" (click)=\"changeLayout($event, 'grid')\" (keydown.enter)=\"changeLayout($event, 'grid')\">\n                <i class=\"pi pi-th-large\"></i>\n            </button>\n        </div>\n    ", isInline: true, directives: [{ type: i3__namespace.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { type: i3__namespace.NgStyle, selector: "[ngStyle]", inputs: ["ngStyle"] }], encapsulation: i0__namespace.ViewEncapsulation.None });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.0.4", ngImport: i0__namespace, type: DataViewLayoutOptions, decorators: [{
                type: i0.Component,
                args: [{
                        selector: 'p-dataViewLayoutOptions',
                        template: "\n        <div [ngClass]=\"'p-dataview-layout-options p-selectbutton p-buttonset'\" [ngStyle]=\"style\" [class]=\"styleClass\">\n            <button type=\"button\" class=\"p-button p-button-icon-only\" [ngClass]=\"{'p-highlight': dv.layout === 'list'}\" (click)=\"changeLayout($event, 'list')\" (keydown.enter)=\"changeLayout($event, 'list')\">\n                <i class=\"pi pi-bars\"></i>\n            </button><button type=\"button\" class=\"p-button p-button-icon-only\" [ngClass]=\"{'p-highlight': dv.layout === 'grid'}\" (click)=\"changeLayout($event, 'grid')\" (keydown.enter)=\"changeLayout($event, 'grid')\">\n                <i class=\"pi pi-th-large\"></i>\n            </button>\n        </div>\n    ",
                        encapsulation: i0.ViewEncapsulation.None
                    }]
            }], ctorParameters: function () { return [{ type: DataView }]; }, propDecorators: { style: [{
                    type: i0.Input
                }], styleClass: [{
                    type: i0.Input
                }] } });
    var DataViewModule = /** @class */ (function () {
        function DataViewModule() {
        }
        return DataViewModule;
    }());
    DataViewModule.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.0.4", ngImport: i0__namespace, type: DataViewModule, deps: [], target: i0__namespace.ɵɵFactoryTarget.NgModule });
    DataViewModule.ɵmod = i0__namespace.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.0.4", ngImport: i0__namespace, type: DataViewModule, declarations: [DataView, DataViewLayoutOptions], imports: [i3.CommonModule, i1.SharedModule, i2.PaginatorModule], exports: [DataView, i1.SharedModule, DataViewLayoutOptions] });
    DataViewModule.ɵinj = i0__namespace.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.0.4", ngImport: i0__namespace, type: DataViewModule, imports: [[i3.CommonModule, i1.SharedModule, i2.PaginatorModule], i1.SharedModule] });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.0.4", ngImport: i0__namespace, type: DataViewModule, decorators: [{
                type: i0.NgModule,
                args: [{
                        imports: [i3.CommonModule, i1.SharedModule, i2.PaginatorModule],
                        exports: [DataView, i1.SharedModule, DataViewLayoutOptions],
                        declarations: [DataView, DataViewLayoutOptions]
                    }]
            }] });

    /**
     * Generated bundle index. Do not edit.
     */

    exports.DataView = DataView;
    exports.DataViewLayoutOptions = DataViewLayoutOptions;
    exports.DataViewModule = DataViewModule;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=primeng-dataview.umd.js.map
