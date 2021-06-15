(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@angular/animations'), require('@angular/common'), require('primeng/api')) :
    typeof define === 'function' && define.amd ? define('primeng/accordion', ['exports', '@angular/core', '@angular/animations', '@angular/common', 'primeng/api'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory((global.primeng = global.primeng || {}, global.primeng.accordion = {}), global.ng.core, global.ng.animations, global.ng.common, global.primeng.api));
}(this, (function (exports, i0, animations, i1, api) { 'use strict';

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

    var idx = 0;
    var AccordionTab = /** @class */ (function () {
        function AccordionTab(accordion, changeDetector) {
            this.changeDetector = changeDetector;
            this.cache = true;
            this.selectedChange = new i0.EventEmitter();
            this.transitionOptions = '400ms cubic-bezier(0.86, 0, 0.07, 1)';
            this.id = "p-accordiontab-" + idx++;
            this.accordion = accordion;
        }
        Object.defineProperty(AccordionTab.prototype, "selected", {
            get: function () {
                return this._selected;
            },
            set: function (val) {
                this._selected = val;
                if (!this.loaded) {
                    if (this._selected && this.cache) {
                        this.loaded = true;
                    }
                    this.changeDetector.detectChanges();
                }
            },
            enumerable: false,
            configurable: true
        });
        AccordionTab.prototype.ngAfterContentInit = function () {
            var _this = this;
            this.templates.forEach(function (item) {
                switch (item.getType()) {
                    case 'content':
                        _this.contentTemplate = item.template;
                        break;
                    case 'header':
                        _this.headerTemplate = item.template;
                        break;
                    default:
                        _this.contentTemplate = item.template;
                        break;
                }
            });
        };
        AccordionTab.prototype.toggle = function (event) {
            if (this.disabled) {
                return false;
            }
            var index = this.findTabIndex();
            if (this.selected) {
                this.selected = false;
                this.accordion.onClose.emit({ originalEvent: event, index: index });
            }
            else {
                if (!this.accordion.multiple) {
                    for (var i = 0; i < this.accordion.tabs.length; i++) {
                        this.accordion.tabs[i].selected = false;
                        this.accordion.tabs[i].selectedChange.emit(false);
                        this.accordion.tabs[i].changeDetector.markForCheck();
                    }
                }
                this.selected = true;
                this.loaded = true;
                this.accordion.onOpen.emit({ originalEvent: event, index: index });
            }
            this.selectedChange.emit(this.selected);
            this.accordion.updateActiveIndex();
            this.changeDetector.markForCheck();
            event.preventDefault();
        };
        AccordionTab.prototype.findTabIndex = function () {
            var index = -1;
            for (var i = 0; i < this.accordion.tabs.length; i++) {
                if (this.accordion.tabs[i] == this) {
                    index = i;
                    break;
                }
            }
            return index;
        };
        Object.defineProperty(AccordionTab.prototype, "hasHeaderFacet", {
            get: function () {
                return this.headerFacet && this.headerFacet.length > 0;
            },
            enumerable: false,
            configurable: true
        });
        AccordionTab.prototype.onKeydown = function (event) {
            if (event.which === 32 || event.which === 13) {
                this.toggle(event);
                event.preventDefault();
            }
        };
        AccordionTab.prototype.ngOnDestroy = function () {
            this.accordion.tabs.splice(this.findTabIndex(), 1);
        };
        return AccordionTab;
    }());
    AccordionTab.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.0.4", ngImport: i0__namespace, type: AccordionTab, deps: [{ token: i0.forwardRef(function () { return Accordion; }) }, { token: i0__namespace.ChangeDetectorRef }], target: i0__namespace.ɵɵFactoryTarget.Component });
    AccordionTab.ɵcmp = i0__namespace.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.0.4", type: AccordionTab, selector: "p-accordionTab", inputs: { header: "header", disabled: "disabled", cache: "cache", transitionOptions: "transitionOptions", selected: "selected" }, outputs: { selectedChange: "selectedChange" }, queries: [{ propertyName: "headerFacet", predicate: api.Header }, { propertyName: "templates", predicate: api.PrimeTemplate }], ngImport: i0__namespace, template: "\n        <div class=\"p-accordion-tab\" [ngClass]=\"{'p-accordion-tab-active': selected}\">\n            <div class=\"p-accordion-header\" [ngClass]=\"{'p-highlight': selected, 'p-disabled': disabled}\">\n                <a role=\"tab\" class=\"p-accordion-header-link\" (click)=\"toggle($event)\" (keydown)=\"onKeydown($event)\" [attr.tabindex]=\"disabled ? null : 0\"\n                    [attr.id]=\"id\" [attr.aria-controls]=\"id + '-content'\" [attr.aria-expanded]=\"selected\">\n                    <span class=\"p-accordion-toggle-icon\" [ngClass]=\"selected ? accordion.collapseIcon : accordion.expandIcon\"></span>\n                    <span class=\"p-accordion-header-text\" *ngIf=\"!hasHeaderFacet\">\n                        {{header}}\n                    </span>\n                    <ng-container *ngTemplateOutlet=\"headerTemplate\"></ng-container>\n                    <ng-content select=\"p-header\" *ngIf=\"hasHeaderFacet\"></ng-content>\n                </a>\n            </div>\n            <div [attr.id]=\"id + '-content'\" class=\"p-toggleable-content\" [@tabContent]=\"selected ? {value: 'visible', params: {transitionParams: transitionOptions}} : {value: 'hidden', params: {transitionParams: transitionOptions}}\"\n                role=\"region\" [attr.aria-hidden]=\"!selected\" [attr.aria-labelledby]=\"id\">\n                <div class=\"p-accordion-content\">\n                    <ng-content></ng-content>\n                    <ng-container *ngIf=\"contentTemplate && (cache ? loaded : selected)\">\n                        <ng-container *ngTemplateOutlet=\"contentTemplate\"></ng-container>\n                    </ng-container>\n                </div>\n            </div>\n        </div>\n    ", isInline: true, styles: [".p-accordion-header-link{cursor:pointer;display:flex;align-items:center;-webkit-user-select:none;-ms-user-select:none;user-select:none;position:relative;text-decoration:none}.p-accordion-header-link:focus{z-index:1}.p-accordion-header-text{line-height:1}"], directives: [{ type: i1__namespace.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { type: i1__namespace.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i1__namespace.NgTemplateOutlet, selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet"] }], animations: [
            animations.trigger('tabContent', [
                animations.state('hidden', animations.style({
                    height: '0',
                    overflow: 'hidden'
                })),
                animations.state('visible', animations.style({
                    height: '*'
                })),
                animations.transition('visible <=> hidden', [animations.style({ overflow: 'hidden' }), animations.animate('{{transitionParams}}')]),
                animations.transition('void => *', animations.animate(0))
            ])
        ], changeDetection: i0__namespace.ChangeDetectionStrategy.OnPush, encapsulation: i0__namespace.ViewEncapsulation.None });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.0.4", ngImport: i0__namespace, type: AccordionTab, decorators: [{
                type: i0.Component,
                args: [{
                        selector: 'p-accordionTab',
                        template: "\n        <div class=\"p-accordion-tab\" [ngClass]=\"{'p-accordion-tab-active': selected}\">\n            <div class=\"p-accordion-header\" [ngClass]=\"{'p-highlight': selected, 'p-disabled': disabled}\">\n                <a role=\"tab\" class=\"p-accordion-header-link\" (click)=\"toggle($event)\" (keydown)=\"onKeydown($event)\" [attr.tabindex]=\"disabled ? null : 0\"\n                    [attr.id]=\"id\" [attr.aria-controls]=\"id + '-content'\" [attr.aria-expanded]=\"selected\">\n                    <span class=\"p-accordion-toggle-icon\" [ngClass]=\"selected ? accordion.collapseIcon : accordion.expandIcon\"></span>\n                    <span class=\"p-accordion-header-text\" *ngIf=\"!hasHeaderFacet\">\n                        {{header}}\n                    </span>\n                    <ng-container *ngTemplateOutlet=\"headerTemplate\"></ng-container>\n                    <ng-content select=\"p-header\" *ngIf=\"hasHeaderFacet\"></ng-content>\n                </a>\n            </div>\n            <div [attr.id]=\"id + '-content'\" class=\"p-toggleable-content\" [@tabContent]=\"selected ? {value: 'visible', params: {transitionParams: transitionOptions}} : {value: 'hidden', params: {transitionParams: transitionOptions}}\"\n                role=\"region\" [attr.aria-hidden]=\"!selected\" [attr.aria-labelledby]=\"id\">\n                <div class=\"p-accordion-content\">\n                    <ng-content></ng-content>\n                    <ng-container *ngIf=\"contentTemplate && (cache ? loaded : selected)\">\n                        <ng-container *ngTemplateOutlet=\"contentTemplate\"></ng-container>\n                    </ng-container>\n                </div>\n            </div>\n        </div>\n    ",
                        animations: [
                            animations.trigger('tabContent', [
                                animations.state('hidden', animations.style({
                                    height: '0',
                                    overflow: 'hidden'
                                })),
                                animations.state('visible', animations.style({
                                    height: '*'
                                })),
                                animations.transition('visible <=> hidden', [animations.style({ overflow: 'hidden' }), animations.animate('{{transitionParams}}')]),
                                animations.transition('void => *', animations.animate(0))
                            ])
                        ],
                        changeDetection: i0.ChangeDetectionStrategy.OnPush,
                        encapsulation: i0.ViewEncapsulation.None,
                        styleUrls: ['./accordion.css']
                    }]
            }], ctorParameters: function () {
            return [{ type: undefined, decorators: [{
                            type: i0.Inject,
                            args: [i0.forwardRef(function () { return Accordion; })]
                        }] }, { type: i0__namespace.ChangeDetectorRef }];
        }, propDecorators: { header: [{
                    type: i0.Input
                }], disabled: [{
                    type: i0.Input
                }], cache: [{
                    type: i0.Input
                }], selectedChange: [{
                    type: i0.Output
                }], transitionOptions: [{
                    type: i0.Input
                }], headerFacet: [{
                    type: i0.ContentChildren,
                    args: [api.Header]
                }], templates: [{
                    type: i0.ContentChildren,
                    args: [api.PrimeTemplate]
                }], selected: [{
                    type: i0.Input
                }] } });
    var Accordion = /** @class */ (function () {
        function Accordion(el, changeDetector) {
            this.el = el;
            this.changeDetector = changeDetector;
            this.onClose = new i0.EventEmitter();
            this.onOpen = new i0.EventEmitter();
            this.expandIcon = 'pi pi-fw pi-chevron-right';
            this.collapseIcon = 'pi pi-fw pi-chevron-down';
            this.activeIndexChange = new i0.EventEmitter();
            this.tabs = [];
        }
        Accordion.prototype.ngAfterContentInit = function () {
            var _this = this;
            this.initTabs();
            this.tabListSubscription = this.tabList.changes.subscribe(function (_) {
                _this.initTabs();
            });
        };
        Accordion.prototype.initTabs = function () {
            this.tabs = this.tabList.toArray();
            this.updateSelectionState();
            this.changeDetector.markForCheck();
        };
        Accordion.prototype.getBlockableElement = function () {
            return this.el.nativeElement.children[0];
        };
        Object.defineProperty(Accordion.prototype, "activeIndex", {
            get: function () {
                return this._activeIndex;
            },
            set: function (val) {
                this._activeIndex = val;
                if (this.preventActiveIndexPropagation) {
                    this.preventActiveIndexPropagation = false;
                    return;
                }
                this.updateSelectionState();
            },
            enumerable: false,
            configurable: true
        });
        Accordion.prototype.updateSelectionState = function () {
            if (this.tabs && this.tabs.length && this._activeIndex != null) {
                for (var i = 0; i < this.tabs.length; i++) {
                    var selected = this.multiple ? this._activeIndex.includes(i) : (i === this._activeIndex);
                    var changed = selected !== this.tabs[i].selected;
                    if (changed) {
                        this.tabs[i].selected = selected;
                        this.tabs[i].selectedChange.emit(selected);
                        this.tabs[i].changeDetector.markForCheck();
                    }
                }
            }
        };
        Accordion.prototype.updateActiveIndex = function () {
            var _this = this;
            var index = this.multiple ? [] : null;
            this.tabs.forEach(function (tab, i) {
                if (tab.selected) {
                    if (_this.multiple) {
                        index.push(i);
                    }
                    else {
                        index = i;
                        return;
                    }
                }
            });
            this.preventActiveIndexPropagation = true;
            this.activeIndexChange.emit(index);
        };
        Accordion.prototype.ngOnDestroy = function () {
            if (this.tabListSubscription) {
                this.tabListSubscription.unsubscribe();
            }
        };
        return Accordion;
    }());
    Accordion.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.0.4", ngImport: i0__namespace, type: Accordion, deps: [{ token: i0__namespace.ElementRef }, { token: i0__namespace.ChangeDetectorRef }], target: i0__namespace.ɵɵFactoryTarget.Component });
    Accordion.ɵcmp = i0__namespace.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.0.4", type: Accordion, selector: "p-accordion", inputs: { multiple: "multiple", style: "style", styleClass: "styleClass", expandIcon: "expandIcon", collapseIcon: "collapseIcon", activeIndex: "activeIndex" }, outputs: { onClose: "onClose", onOpen: "onOpen", activeIndexChange: "activeIndexChange" }, queries: [{ propertyName: "tabList", predicate: AccordionTab }], ngImport: i0__namespace, template: "\n        <div [ngClass]=\"'p-accordion p-component'\" [ngStyle]=\"style\" [class]=\"styleClass\" role=\"tablist\">\n            <ng-content></ng-content>\n        </div>\n    ", isInline: true, directives: [{ type: i1__namespace.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { type: i1__namespace.NgStyle, selector: "[ngStyle]", inputs: ["ngStyle"] }], changeDetection: i0__namespace.ChangeDetectionStrategy.OnPush });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.0.4", ngImport: i0__namespace, type: Accordion, decorators: [{
                type: i0.Component,
                args: [{
                        selector: 'p-accordion',
                        template: "\n        <div [ngClass]=\"'p-accordion p-component'\" [ngStyle]=\"style\" [class]=\"styleClass\" role=\"tablist\">\n            <ng-content></ng-content>\n        </div>\n    ",
                        changeDetection: i0.ChangeDetectionStrategy.OnPush,
                    }]
            }], ctorParameters: function () { return [{ type: i0__namespace.ElementRef }, { type: i0__namespace.ChangeDetectorRef }]; }, propDecorators: { multiple: [{
                    type: i0.Input
                }], onClose: [{
                    type: i0.Output
                }], onOpen: [{
                    type: i0.Output
                }], style: [{
                    type: i0.Input
                }], styleClass: [{
                    type: i0.Input
                }], expandIcon: [{
                    type: i0.Input
                }], collapseIcon: [{
                    type: i0.Input
                }], activeIndexChange: [{
                    type: i0.Output
                }], tabList: [{
                    type: i0.ContentChildren,
                    args: [AccordionTab]
                }], activeIndex: [{
                    type: i0.Input
                }] } });
    var AccordionModule = /** @class */ (function () {
        function AccordionModule() {
        }
        return AccordionModule;
    }());
    AccordionModule.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.0.4", ngImport: i0__namespace, type: AccordionModule, deps: [], target: i0__namespace.ɵɵFactoryTarget.NgModule });
    AccordionModule.ɵmod = i0__namespace.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.0.4", ngImport: i0__namespace, type: AccordionModule, declarations: [Accordion, AccordionTab], imports: [i1.CommonModule], exports: [Accordion, AccordionTab, api.SharedModule] });
    AccordionModule.ɵinj = i0__namespace.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.0.4", ngImport: i0__namespace, type: AccordionModule, imports: [[i1.CommonModule], api.SharedModule] });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.0.4", ngImport: i0__namespace, type: AccordionModule, decorators: [{
                type: i0.NgModule,
                args: [{
                        imports: [i1.CommonModule],
                        exports: [Accordion, AccordionTab, api.SharedModule],
                        declarations: [Accordion, AccordionTab]
                    }]
            }] });

    /**
     * Generated bundle index. Do not edit.
     */

    exports.Accordion = Accordion;
    exports.AccordionModule = AccordionModule;
    exports.AccordionTab = AccordionTab;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=primeng-accordion.umd.js.map
