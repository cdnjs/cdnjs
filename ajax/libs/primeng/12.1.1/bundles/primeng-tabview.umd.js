(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@angular/common'), require('primeng/tooltip'), require('primeng/ripple'), require('primeng/api'), require('primeng/dom')) :
    typeof define === 'function' && define.amd ? define('primeng/tabview', ['exports', '@angular/core', '@angular/common', 'primeng/tooltip', 'primeng/ripple', 'primeng/api', 'primeng/dom'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory((global.primeng = global.primeng || {}, global.primeng.tabview = {}), global.ng.core, global.ng.common, global.primeng.tooltip, global.primeng.ripple, global.primeng.api, global.primeng.dom));
}(this, (function (exports, i0, i1, i3, i2, api, dom) { 'use strict';

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
    var i1__namespace = /*#__PURE__*/_interopNamespace(i1);
    var i3__namespace = /*#__PURE__*/_interopNamespace(i3);
    var i2__namespace = /*#__PURE__*/_interopNamespace(i2);

    var idx = 0;
    var TabPanel = /** @class */ (function () {
        function TabPanel(tabView, viewContainer, cd) {
            this.viewContainer = viewContainer;
            this.cd = cd;
            this.cache = true;
            this.tooltipPosition = 'top';
            this.tooltipPositionStyle = 'absolute';
            this.id = "p-tabpanel-" + idx++;
            this.tabView = tabView;
        }
        TabPanel.prototype.ngAfterContentInit = function () {
            var _this = this;
            this.templates.forEach(function (item) {
                switch (item.getType()) {
                    case 'header':
                        _this.headerTemplate = item.template;
                        break;
                    case 'content':
                        _this.contentTemplate = item.template;
                        break;
                    default:
                        _this.contentTemplate = item.template;
                        break;
                }
            });
        };
        Object.defineProperty(TabPanel.prototype, "selected", {
            get: function () {
                return this._selected;
            },
            set: function (val) {
                this._selected = val;
                if (!this.loaded) {
                    this.cd.detectChanges();
                }
                if (val)
                    this.loaded = true;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(TabPanel.prototype, "disabled", {
            get: function () {
                return this._disabled;
            },
            set: function (disabled) {
                this._disabled = disabled;
                this.tabView.cd.markForCheck();
            },
            enumerable: false,
            configurable: true
        });
        ;
        Object.defineProperty(TabPanel.prototype, "header", {
            get: function () {
                return this._header;
            },
            set: function (header) {
                this._header = header;
                this.tabView.cd.markForCheck();
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(TabPanel.prototype, "leftIcon", {
            get: function () {
                return this._leftIcon;
            },
            set: function (leftIcon) {
                this._leftIcon = leftIcon;
                this.tabView.cd.markForCheck();
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(TabPanel.prototype, "rightIcon", {
            get: function () {
                return this._rightIcon;
            },
            set: function (rightIcon) {
                this._rightIcon = rightIcon;
                this.tabView.cd.markForCheck();
            },
            enumerable: false,
            configurable: true
        });
        TabPanel.prototype.ngOnDestroy = function () {
            this.view = null;
        };
        return TabPanel;
    }());
    TabPanel.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0__namespace, type: TabPanel, deps: [{ token: i0.forwardRef(function () { return TabView; }) }, { token: i0__namespace.ViewContainerRef }, { token: i0__namespace.ChangeDetectorRef }], target: i0__namespace.ɵɵFactoryTarget.Component });
    TabPanel.ɵcmp = i0__namespace.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.0.5", type: TabPanel, selector: "p-tabPanel", inputs: { closable: "closable", headerStyle: "headerStyle", headerStyleClass: "headerStyleClass", cache: "cache", tooltip: "tooltip", tooltipPosition: "tooltipPosition", tooltipPositionStyle: "tooltipPositionStyle", tooltipStyleClass: "tooltipStyleClass", selected: "selected", disabled: "disabled", header: "header", leftIcon: "leftIcon", rightIcon: "rightIcon" }, host: { classAttribute: "p-element" }, queries: [{ propertyName: "templates", predicate: api.PrimeTemplate }], ngImport: i0__namespace, template: "\n        <div [attr.id]=\"id\" class=\"p-tabview-panel\" [hidden]=\"!selected\"\n            role=\"tabpanel\" [attr.aria-hidden]=\"!selected\" [attr.aria-labelledby]=\"id + '-label'\" *ngIf=\"!closed\">\n            <ng-content></ng-content>\n            <ng-container *ngIf=\"contentTemplate && (cache ? loaded : selected)\">\n                <ng-container *ngTemplateOutlet=\"contentTemplate\"></ng-container>\n            </ng-container>\n        </div>\n    ", isInline: true, directives: [{ type: i1__namespace.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i1__namespace.NgTemplateOutlet, selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet"] }] });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0__namespace, type: TabPanel, decorators: [{
                type: i0.Component,
                args: [{
                        selector: 'p-tabPanel',
                        template: "\n        <div [attr.id]=\"id\" class=\"p-tabview-panel\" [hidden]=\"!selected\"\n            role=\"tabpanel\" [attr.aria-hidden]=\"!selected\" [attr.aria-labelledby]=\"id + '-label'\" *ngIf=\"!closed\">\n            <ng-content></ng-content>\n            <ng-container *ngIf=\"contentTemplate && (cache ? loaded : selected)\">\n                <ng-container *ngTemplateOutlet=\"contentTemplate\"></ng-container>\n            </ng-container>\n        </div>\n    ",
                        host: {
                            'class': 'p-element'
                        }
                    }]
            }], ctorParameters: function () {
            return [{ type: undefined, decorators: [{
                            type: i0.Inject,
                            args: [i0.forwardRef(function () { return TabView; })]
                        }] }, { type: i0__namespace.ViewContainerRef }, { type: i0__namespace.ChangeDetectorRef }];
        }, propDecorators: { closable: [{
                    type: i0.Input
                }], headerStyle: [{
                    type: i0.Input
                }], headerStyleClass: [{
                    type: i0.Input
                }], cache: [{
                    type: i0.Input
                }], tooltip: [{
                    type: i0.Input
                }], tooltipPosition: [{
                    type: i0.Input
                }], tooltipPositionStyle: [{
                    type: i0.Input
                }], tooltipStyleClass: [{
                    type: i0.Input
                }], templates: [{
                    type: i0.ContentChildren,
                    args: [api.PrimeTemplate]
                }], selected: [{
                    type: i0.Input
                }], disabled: [{
                    type: i0.Input
                }], header: [{
                    type: i0.Input
                }], leftIcon: [{
                    type: i0.Input
                }], rightIcon: [{
                    type: i0.Input
                }] } });
    var TabView = /** @class */ (function () {
        function TabView(el, cd) {
            this.el = el;
            this.cd = cd;
            this.orientation = 'top';
            this.onChange = new i0.EventEmitter();
            this.onClose = new i0.EventEmitter();
            this.activeIndexChange = new i0.EventEmitter();
            this.backwardIsDisabled = true;
            this.forwardIsDisabled = false;
        }
        TabView.prototype.ngAfterContentInit = function () {
            var _this = this;
            this.initTabs();
            this.tabPanels.changes.subscribe(function (_) {
                _this.initTabs();
            });
        };
        TabView.prototype.ngAfterViewChecked = function () {
            if (this.tabChanged) {
                this.updateInkBar();
                this.tabChanged = false;
            }
        };
        TabView.prototype.initTabs = function () {
            this.tabs = this.tabPanels.toArray();
            var selectedTab = this.findSelectedTab();
            if (!selectedTab && this.tabs.length) {
                if (this.activeIndex != null && this.tabs.length > this.activeIndex)
                    this.tabs[this.activeIndex].selected = true;
                else
                    this.tabs[0].selected = true;
                this.tabChanged = true;
            }
            this.cd.markForCheck();
        };
        TabView.prototype.open = function (event, tab) {
            if (tab.disabled) {
                if (event) {
                    event.preventDefault();
                }
                return;
            }
            if (!tab.selected) {
                var selectedTab = this.findSelectedTab();
                if (selectedTab) {
                    selectedTab.selected = false;
                }
                this.tabChanged = true;
                tab.selected = true;
                var selectedTabIndex = this.findTabIndex(tab);
                this.preventActiveIndexPropagation = true;
                this.activeIndexChange.emit(selectedTabIndex);
                this.onChange.emit({ originalEvent: event, index: selectedTabIndex });
                this.updateScrollBar(selectedTabIndex);
            }
            if (event) {
                event.preventDefault();
            }
        };
        TabView.prototype.close = function (event, tab) {
            var _this = this;
            if (this.controlClose) {
                this.onClose.emit({
                    originalEvent: event,
                    index: this.findTabIndex(tab),
                    close: function () {
                        _this.closeTab(tab);
                    }
                });
            }
            else {
                this.closeTab(tab);
                this.onClose.emit({
                    originalEvent: event,
                    index: this.findTabIndex(tab)
                });
            }
            event.stopPropagation();
        };
        TabView.prototype.closeTab = function (tab) {
            if (tab.disabled) {
                return;
            }
            if (tab.selected) {
                this.tabChanged = true;
                tab.selected = false;
                for (var i = 0; i < this.tabs.length; i++) {
                    var tabPanel = this.tabs[i];
                    if (!tabPanel.closed && !tab.disabled) {
                        tabPanel.selected = true;
                        break;
                    }
                }
            }
            tab.closed = true;
        };
        TabView.prototype.findSelectedTab = function () {
            for (var i = 0; i < this.tabs.length; i++) {
                if (this.tabs[i].selected) {
                    return this.tabs[i];
                }
            }
            return null;
        };
        TabView.prototype.findTabIndex = function (tab) {
            var index = -1;
            for (var i = 0; i < this.tabs.length; i++) {
                if (this.tabs[i] == tab) {
                    index = i;
                    break;
                }
            }
            return index;
        };
        TabView.prototype.getBlockableElement = function () {
            return this.el.nativeElement.children[0];
        };
        Object.defineProperty(TabView.prototype, "activeIndex", {
            get: function () {
                return this._activeIndex;
            },
            set: function (val) {
                this._activeIndex = val;
                if (this.preventActiveIndexPropagation) {
                    this.preventActiveIndexPropagation = false;
                    return;
                }
                if (this.tabs && this.tabs.length && this._activeIndex != null && this.tabs.length > this._activeIndex) {
                    this.findSelectedTab().selected = false;
                    this.tabs[this._activeIndex].selected = true;
                    this.tabChanged = true;
                    this.updateScrollBar(val);
                }
            },
            enumerable: false,
            configurable: true
        });
        TabView.prototype.updateInkBar = function () {
            var tabHeader = dom.DomHandler.findSingle(this.navbar.nativeElement, 'li.p-highlight');
            this.inkbar.nativeElement.style.width = dom.DomHandler.getWidth(tabHeader) + 'px';
            this.inkbar.nativeElement.style.left = dom.DomHandler.getOffset(tabHeader).left - dom.DomHandler.getOffset(this.navbar.nativeElement).left + 'px';
        };
        TabView.prototype.updateScrollBar = function (index) {
            var tabHeader = this.navbar.nativeElement.children[index];
            tabHeader.scrollIntoView({ block: 'nearest' });
        };
        TabView.prototype.updateButtonState = function () {
            var content = this.content.nativeElement;
            var scrollLeft = content.scrollLeft, scrollWidth = content.scrollWidth;
            var width = dom.DomHandler.getWidth(content);
            this.backwardIsDisabled = scrollLeft === 0;
            this.forwardIsDisabled = scrollLeft === scrollWidth - width;
        };
        TabView.prototype.onScroll = function (event) {
            this.scrollable && this.updateButtonState();
            event.preventDefault();
        };
        TabView.prototype.getVisibleButtonWidths = function () {
            var _a, _b;
            return [(_a = this.prevBtn) === null || _a === void 0 ? void 0 : _a.nativeElement, (_b = this.nextBtn) === null || _b === void 0 ? void 0 : _b.nativeElement].reduce(function (acc, el) { return el ? acc + dom.DomHandler.getWidth(el) : acc; }, 0);
        };
        TabView.prototype.navBackward = function () {
            var content = this.content.nativeElement;
            var width = dom.DomHandler.getWidth(content) - this.getVisibleButtonWidths();
            var pos = content.scrollLeft - width;
            content.scrollLeft = pos <= 0 ? 0 : pos;
        };
        TabView.prototype.navForward = function () {
            var content = this.content.nativeElement;
            var width = dom.DomHandler.getWidth(content) - this.getVisibleButtonWidths();
            var pos = content.scrollLeft + width;
            var lastPos = content.scrollWidth - width;
            content.scrollLeft = pos >= lastPos ? lastPos : pos;
        };
        return TabView;
    }());
    TabView.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0__namespace, type: TabView, deps: [{ token: i0__namespace.ElementRef }, { token: i0__namespace.ChangeDetectorRef }], target: i0__namespace.ɵɵFactoryTarget.Component });
    TabView.ɵcmp = i0__namespace.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.0.5", type: TabView, selector: "p-tabView", inputs: { orientation: "orientation", style: "style", styleClass: "styleClass", controlClose: "controlClose", scrollable: "scrollable", activeIndex: "activeIndex" }, outputs: { onChange: "onChange", onClose: "onClose", activeIndexChange: "activeIndexChange" }, host: { classAttribute: "p-element" }, queries: [{ propertyName: "tabPanels", predicate: TabPanel }], viewQueries: [{ propertyName: "content", first: true, predicate: ["content"], descendants: true }, { propertyName: "navbar", first: true, predicate: ["navbar"], descendants: true }, { propertyName: "prevBtn", first: true, predicate: ["prevBtn"], descendants: true }, { propertyName: "nextBtn", first: true, predicate: ["nextBtn"], descendants: true }, { propertyName: "inkbar", first: true, predicate: ["inkbar"], descendants: true }], ngImport: i0__namespace, template: "\n        <div [ngClass]=\"{'p-tabview p-component': true, 'p-tabview-scrollable': scrollable}\" [ngStyle]=\"style\" [class]=\"styleClass\">\n            <div class=\"p-tabview-nav-container\">\n                <button *ngIf=\"scrollable && !backwardIsDisabled\" #prevBtn class=\"p-tabview-nav-prev p-tabview-nav-btn p-link\" (click)=\"navBackward()\" type=\"button\" pRipple>\n                    <span class=\"pi pi-chevron-left\"></span>\n                </button>\n                <div #content class=\"p-tabview-nav-content\" (scroll)=\"onScroll($event)\">\n                    <ul #navbar class=\"p-tabview-nav\" role=\"tablist\">\n                        <ng-template ngFor let-tab [ngForOf]=\"tabs\">\n                            <li role=\"presentation\" [ngClass]=\"{'p-highlight': tab.selected, 'p-disabled': tab.disabled}\" [ngStyle]=\"tab.headerStyle\" [class]=\"tab.headerStyleClass\" *ngIf=\"!tab.closed\">\n                                <a role=\"tab\" class=\"p-tabview-nav-link\" [attr.id]=\"tab.id + '-label'\" [attr.aria-selected]=\"tab.selected\" [attr.aria-controls]=\"tab.id\" [pTooltip]=\"tab.tooltip\" [tooltipPosition]=\"tab.tooltipPosition\"\n                                    [attr.aria-selected]=\"tab.selected\" [positionStyle]=\"tab.tooltipPositionStyle\" [tooltipStyleClass]=\"tab.tooltipStyleClass\"\n                                    (click)=\"open($event,tab)\" (keydown.enter)=\"open($event,tab)\" pRipple [attr.tabindex]=\"tab.disabled ? null : '0'\">\n                                    <ng-container *ngIf=\"!tab.headerTemplate\">\n                                        <span class=\"p-tabview-left-icon\" [ngClass]=\"tab.leftIcon\" *ngIf=\"tab.leftIcon\"></span>\n                                        <span class=\"p-tabview-title\">{{tab.header}}</span>\n                                        <span class=\"p-tabview-right-icon\" [ngClass]=\"tab.rightIcon\" *ngIf=\"tab.rightIcon\"></span>\n                                    </ng-container>\n                                    <ng-container *ngTemplateOutlet=\"tab.headerTemplate\"></ng-container>\n                                    <span *ngIf=\"tab.closable\" class=\"p-tabview-close pi pi-times\" (click)=\"close($event,tab)\"></span>\n                                </a>\n                            </li>\n                        </ng-template>\n                        <li #inkbar class=\"p-tabview-ink-bar\"></li>\n                    </ul>\n                </div>\n                <button *ngIf=\"scrollable && !forwardIsDisabled\" #nextBtn class=\"p-tabview-nav-next p-tabview-nav-btn p-link\" (click)=\"navForward()\" type=\"button\" pRipple>\n                    <span class=\"pi pi-chevron-right\"></span>\n                </button>\n            </div>\n            <div class=\"p-tabview-panels\">\n                <ng-content></ng-content>\n            </div>\n        </div>\n    ", isInline: true, styles: [".p-tabview-nav-container{position:relative}.p-tabview-scrollable .p-tabview-nav-container{overflow:hidden}.p-tabview-nav-content{overflow-x:auto;overflow-y:hidden;scroll-behavior:smooth;scrollbar-width:none;-ms-scroll-chaining:contain auto;overscroll-behavior:contain auto}.p-tabview-nav{display:flex;margin:0;padding:0;list-style-type:none;flex:1 1 auto}.p-tabview-nav-link{cursor:pointer;-webkit-user-select:none;-ms-user-select:none;user-select:none;display:flex;align-items:center;position:relative;text-decoration:none;overflow:hidden}.p-tabview-ink-bar{display:none;z-index:1}.p-tabview-nav-link:focus{z-index:1}.p-tabview-title{line-height:1;white-space:nowrap}.p-tabview-nav-btn{position:absolute;top:0;z-index:2;height:100%;display:flex;align-items:center;justify-content:center}.p-tabview-nav-prev{left:0}.p-tabview-nav-next{right:0}.p-tabview-nav-content::-webkit-scrollbar{display:none}.p-tabview-close{z-index:1}"], directives: [{ type: i1__namespace.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { type: i1__namespace.NgStyle, selector: "[ngStyle]", inputs: ["ngStyle"] }, { type: i1__namespace.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i2__namespace.Ripple, selector: "[pRipple]" }, { type: i1__namespace.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { type: i3__namespace.Tooltip, selector: "[pTooltip]", inputs: ["tooltipPosition", "tooltipEvent", "appendTo", "positionStyle", "tooltipStyleClass", "tooltipZIndex", "escape", "showDelay", "hideDelay", "life", "positionTop", "positionLeft", "pTooltip", "tooltipDisabled", "tooltipOptions"] }, { type: i1__namespace.NgTemplateOutlet, selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet"] }], changeDetection: i0__namespace.ChangeDetectionStrategy.OnPush, encapsulation: i0__namespace.ViewEncapsulation.None });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0__namespace, type: TabView, decorators: [{
                type: i0.Component,
                args: [{
                        selector: 'p-tabView',
                        template: "\n        <div [ngClass]=\"{'p-tabview p-component': true, 'p-tabview-scrollable': scrollable}\" [ngStyle]=\"style\" [class]=\"styleClass\">\n            <div class=\"p-tabview-nav-container\">\n                <button *ngIf=\"scrollable && !backwardIsDisabled\" #prevBtn class=\"p-tabview-nav-prev p-tabview-nav-btn p-link\" (click)=\"navBackward()\" type=\"button\" pRipple>\n                    <span class=\"pi pi-chevron-left\"></span>\n                </button>\n                <div #content class=\"p-tabview-nav-content\" (scroll)=\"onScroll($event)\">\n                    <ul #navbar class=\"p-tabview-nav\" role=\"tablist\">\n                        <ng-template ngFor let-tab [ngForOf]=\"tabs\">\n                            <li role=\"presentation\" [ngClass]=\"{'p-highlight': tab.selected, 'p-disabled': tab.disabled}\" [ngStyle]=\"tab.headerStyle\" [class]=\"tab.headerStyleClass\" *ngIf=\"!tab.closed\">\n                                <a role=\"tab\" class=\"p-tabview-nav-link\" [attr.id]=\"tab.id + '-label'\" [attr.aria-selected]=\"tab.selected\" [attr.aria-controls]=\"tab.id\" [pTooltip]=\"tab.tooltip\" [tooltipPosition]=\"tab.tooltipPosition\"\n                                    [attr.aria-selected]=\"tab.selected\" [positionStyle]=\"tab.tooltipPositionStyle\" [tooltipStyleClass]=\"tab.tooltipStyleClass\"\n                                    (click)=\"open($event,tab)\" (keydown.enter)=\"open($event,tab)\" pRipple [attr.tabindex]=\"tab.disabled ? null : '0'\">\n                                    <ng-container *ngIf=\"!tab.headerTemplate\">\n                                        <span class=\"p-tabview-left-icon\" [ngClass]=\"tab.leftIcon\" *ngIf=\"tab.leftIcon\"></span>\n                                        <span class=\"p-tabview-title\">{{tab.header}}</span>\n                                        <span class=\"p-tabview-right-icon\" [ngClass]=\"tab.rightIcon\" *ngIf=\"tab.rightIcon\"></span>\n                                    </ng-container>\n                                    <ng-container *ngTemplateOutlet=\"tab.headerTemplate\"></ng-container>\n                                    <span *ngIf=\"tab.closable\" class=\"p-tabview-close pi pi-times\" (click)=\"close($event,tab)\"></span>\n                                </a>\n                            </li>\n                        </ng-template>\n                        <li #inkbar class=\"p-tabview-ink-bar\"></li>\n                    </ul>\n                </div>\n                <button *ngIf=\"scrollable && !forwardIsDisabled\" #nextBtn class=\"p-tabview-nav-next p-tabview-nav-btn p-link\" (click)=\"navForward()\" type=\"button\" pRipple>\n                    <span class=\"pi pi-chevron-right\"></span>\n                </button>\n            </div>\n            <div class=\"p-tabview-panels\">\n                <ng-content></ng-content>\n            </div>\n        </div>\n    ",
                        changeDetection: i0.ChangeDetectionStrategy.OnPush,
                        encapsulation: i0.ViewEncapsulation.None,
                        styleUrls: ['./tabview.css'],
                        host: {
                            'class': 'p-element'
                        }
                    }]
            }], ctorParameters: function () { return [{ type: i0__namespace.ElementRef }, { type: i0__namespace.ChangeDetectorRef }]; }, propDecorators: { orientation: [{
                    type: i0.Input
                }], style: [{
                    type: i0.Input
                }], styleClass: [{
                    type: i0.Input
                }], controlClose: [{
                    type: i0.Input
                }], scrollable: [{
                    type: i0.Input
                }], content: [{
                    type: i0.ViewChild,
                    args: ['content']
                }], navbar: [{
                    type: i0.ViewChild,
                    args: ['navbar']
                }], prevBtn: [{
                    type: i0.ViewChild,
                    args: ['prevBtn']
                }], nextBtn: [{
                    type: i0.ViewChild,
                    args: ['nextBtn']
                }], inkbar: [{
                    type: i0.ViewChild,
                    args: ['inkbar']
                }], tabPanels: [{
                    type: i0.ContentChildren,
                    args: [TabPanel]
                }], onChange: [{
                    type: i0.Output
                }], onClose: [{
                    type: i0.Output
                }], activeIndexChange: [{
                    type: i0.Output
                }], activeIndex: [{
                    type: i0.Input
                }] } });
    var TabViewModule = /** @class */ (function () {
        function TabViewModule() {
        }
        return TabViewModule;
    }());
    TabViewModule.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0__namespace, type: TabViewModule, deps: [], target: i0__namespace.ɵɵFactoryTarget.NgModule });
    TabViewModule.ɵmod = i0__namespace.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0__namespace, type: TabViewModule, declarations: [TabView, TabPanel], imports: [i1.CommonModule, api.SharedModule, i3.TooltipModule, i2.RippleModule], exports: [TabView, TabPanel, api.SharedModule] });
    TabViewModule.ɵinj = i0__namespace.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0__namespace, type: TabViewModule, imports: [[i1.CommonModule, api.SharedModule, i3.TooltipModule, i2.RippleModule], api.SharedModule] });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0__namespace, type: TabViewModule, decorators: [{
                type: i0.NgModule,
                args: [{
                        imports: [i1.CommonModule, api.SharedModule, i3.TooltipModule, i2.RippleModule],
                        exports: [TabView, TabPanel, api.SharedModule],
                        declarations: [TabView, TabPanel]
                    }]
            }] });

    /**
     * Generated bundle index. Do not edit.
     */

    exports.TabPanel = TabPanel;
    exports.TabView = TabView;
    exports.TabViewModule = TabViewModule;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=primeng-tabview.umd.js.map
