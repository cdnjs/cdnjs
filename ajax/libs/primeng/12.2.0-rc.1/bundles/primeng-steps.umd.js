(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@angular/common'), require('@angular/router'), require('primeng/tooltip')) :
    typeof define === 'function' && define.amd ? define('primeng/steps', ['exports', '@angular/core', '@angular/common', '@angular/router', 'primeng/tooltip'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory((global.primeng = global.primeng || {}, global.primeng.steps = {}), global.ng.core, global.ng.common, global.ng.router, global.primeng.tooltip));
}(this, (function (exports, i0, i2, i1, i3) { 'use strict';

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
    var i2__namespace = /*#__PURE__*/_interopNamespace(i2);
    var i1__namespace = /*#__PURE__*/_interopNamespace(i1);
    var i3__namespace = /*#__PURE__*/_interopNamespace(i3);

    var Steps = /** @class */ (function () {
        function Steps(router, route, cd) {
            this.router = router;
            this.route = route;
            this.cd = cd;
            this.activeIndex = 0;
            this.readonly = true;
            this.activeIndexChange = new i0.EventEmitter();
        }
        Steps.prototype.ngOnInit = function () {
            var _this = this;
            this.subscription = this.router.events.subscribe(function () { return _this.cd.markForCheck(); });
        };
        Steps.prototype.itemClick = function (event, item, i) {
            if (this.readonly || item.disabled) {
                event.preventDefault();
                return;
            }
            this.activeIndexChange.emit(i);
            if (!item.url) {
                event.preventDefault();
            }
            if (item.command) {
                item.command({
                    originalEvent: event,
                    item: item,
                    index: i
                });
            }
        };
        Steps.prototype.isClickableRouterLink = function (item) {
            return item.routerLink && !this.readonly && !item.disabled;
        };
        Steps.prototype.isActive = function (item, index) {
            if (item.routerLink)
                return this.router.isActive(item.routerLink, false) || this.router.isActive(this.router.createUrlTree([item.routerLink], { relativeTo: this.route }).toString(), false);
            else
                return index === this.activeIndex;
        };
        Steps.prototype.ngOnDestroy = function () {
            if (this.subscription) {
                this.subscription.unsubscribe();
            }
        };
        return Steps;
    }());
    Steps.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0__namespace, type: Steps, deps: [{ token: i1__namespace.Router }, { token: i1__namespace.ActivatedRoute }, { token: i0__namespace.ChangeDetectorRef }], target: i0__namespace.ɵɵFactoryTarget.Component });
    Steps.ɵcmp = i0__namespace.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.0.5", type: Steps, selector: "p-steps", inputs: { activeIndex: "activeIndex", model: "model", readonly: "readonly", style: "style", styleClass: "styleClass" }, outputs: { activeIndexChange: "activeIndexChange" }, host: { classAttribute: "p-element" }, ngImport: i0__namespace, template: "\n        <div [ngClass]=\"{'p-steps p-component':true,'p-readonly':readonly}\" [ngStyle]=\"style\" [class]=\"styleClass\">\n            <ul role=\"tablist\">\n                <li *ngFor=\"let item of model; let i = index\" class=\"p-steps-item\" #menuitem [ngStyle]=\"item.style\" [class]=\"item.styleClass\" role=\"tab\" [attr.aria-selected]=\"i === activeIndex\" [attr.aria-expanded]=\"i === activeIndex\" pTooltip [tooltipOptions]=\"item.tooltipOptions\"\n                    [ngClass]=\"{'p-highlight p-steps-current': isActive(item, i), 'p-disabled': item.disabled || (readonly && !isActive(item, i))}\">\n                    <a *ngIf=\"isClickableRouterLink(item); else elseBlock\" [routerLink]=\"item.routerLink\" [queryParams]=\"item.queryParams\" role=\"presentation\" [routerLinkActive]=\"'p-menuitem-link-active'\" [routerLinkActiveOptions]=\"item.routerLinkActiveOptions||{exact:false}\" class=\"p-menuitem-link\"\n                        (click)=\"itemClick($event, item, i)\" (keydown.enter)=\"itemClick($event, item, i)\" [attr.target]=\"item.target\" [attr.id]=\"item.id\" [attr.tabindex]=\"item.disabled || readonly ? null : (item.tabindex ? item.tabindex : '0')\"\n                        [fragment]=\"item.fragment\" [queryParamsHandling]=\"item.queryParamsHandling\" [preserveFragment]=\"item.preserveFragment\" [skipLocationChange]=\"item.skipLocationChange\" [replaceUrl]=\"item.replaceUrl\" [state]=\"item.state\">\n                        <span class=\"p-steps-number\">{{i + 1}}</span>\n                        <span class=\"p-steps-title\" *ngIf=\"item.escape !== false; else htmlLabel\">{{item.label}}</span>\n                        <ng-template #htmlLabel><span class=\"p-steps-title\" [innerHTML]=\"item.label\"></span></ng-template>\n                    </a>\n                    <ng-template #elseBlock>\n                        <a [attr.href]=\"item.url\" class=\"p-menuitem-link\" role=\"presentation\" (click)=\"itemClick($event, item, i)\" (keydown.enter)=\"itemClick($event, item, i)\" [attr.target]=\"item.target\" [attr.id]=\"item.id\"\n                            [attr.tabindex]=\"item.disabled||(i !== activeIndex && readonly) ? null : (item.tabindex ? item.tabindex : '0')\">\n                            <span class=\"p-steps-number\">{{i + 1}}</span>\n                            <span class=\"p-steps-title\" *ngIf=\"item.escape !== false; else htmlRouteLabel\">{{item.label}}</span>\n                            <ng-template #htmlRouteLabel><span class=\"p-steps-title\" [innerHTML]=\"item.label\"></span></ng-template>\n                        </a>\n                    </ng-template>\n                </li>\n            </ul>\n        </div>\n    ", isInline: true, styles: [".p-steps{position:relative}.p-steps ul{padding:0;margin:0;list-style-type:none;display:flex}.p-steps-item{position:relative;display:flex;justify-content:center;flex:1 1 auto}.p-steps-item .p-menuitem-link{display:inline-flex;flex-direction:column;align-items:center;overflow:hidden;text-decoration:none}.p-steps.p-steps-readonly .p-steps-item{cursor:auto}.p-steps-item.p-steps-current .p-menuitem-link{cursor:default}.p-steps-title{white-space:nowrap}.p-steps-number{display:flex;align-items:center;justify-content:center}.p-steps-title{display:block}"], directives: [{ type: i2__namespace.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { type: i2__namespace.NgStyle, selector: "[ngStyle]", inputs: ["ngStyle"] }, { type: i2__namespace.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { type: i3__namespace.Tooltip, selector: "[pTooltip]", inputs: ["tooltipPosition", "tooltipEvent", "appendTo", "positionStyle", "tooltipStyleClass", "tooltipZIndex", "escape", "showDelay", "hideDelay", "life", "positionTop", "positionLeft", "pTooltip", "tooltipDisabled", "tooltipOptions"] }, { type: i2__namespace.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i1__namespace.RouterLinkWithHref, selector: "a[routerLink],area[routerLink]", inputs: ["routerLink", "target", "queryParams", "fragment", "queryParamsHandling", "preserveFragment", "skipLocationChange", "replaceUrl", "state", "relativeTo"] }, { type: i1__namespace.RouterLinkActive, selector: "[routerLinkActive]", inputs: ["routerLinkActiveOptions", "routerLinkActive"], exportAs: ["routerLinkActive"] }], changeDetection: i0__namespace.ChangeDetectionStrategy.OnPush, encapsulation: i0__namespace.ViewEncapsulation.None });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0__namespace, type: Steps, decorators: [{
                type: i0.Component,
                args: [{
                        selector: 'p-steps',
                        template: "\n        <div [ngClass]=\"{'p-steps p-component':true,'p-readonly':readonly}\" [ngStyle]=\"style\" [class]=\"styleClass\">\n            <ul role=\"tablist\">\n                <li *ngFor=\"let item of model; let i = index\" class=\"p-steps-item\" #menuitem [ngStyle]=\"item.style\" [class]=\"item.styleClass\" role=\"tab\" [attr.aria-selected]=\"i === activeIndex\" [attr.aria-expanded]=\"i === activeIndex\" pTooltip [tooltipOptions]=\"item.tooltipOptions\"\n                    [ngClass]=\"{'p-highlight p-steps-current': isActive(item, i), 'p-disabled': item.disabled || (readonly && !isActive(item, i))}\">\n                    <a *ngIf=\"isClickableRouterLink(item); else elseBlock\" [routerLink]=\"item.routerLink\" [queryParams]=\"item.queryParams\" role=\"presentation\" [routerLinkActive]=\"'p-menuitem-link-active'\" [routerLinkActiveOptions]=\"item.routerLinkActiveOptions||{exact:false}\" class=\"p-menuitem-link\"\n                        (click)=\"itemClick($event, item, i)\" (keydown.enter)=\"itemClick($event, item, i)\" [attr.target]=\"item.target\" [attr.id]=\"item.id\" [attr.tabindex]=\"item.disabled || readonly ? null : (item.tabindex ? item.tabindex : '0')\"\n                        [fragment]=\"item.fragment\" [queryParamsHandling]=\"item.queryParamsHandling\" [preserveFragment]=\"item.preserveFragment\" [skipLocationChange]=\"item.skipLocationChange\" [replaceUrl]=\"item.replaceUrl\" [state]=\"item.state\">\n                        <span class=\"p-steps-number\">{{i + 1}}</span>\n                        <span class=\"p-steps-title\" *ngIf=\"item.escape !== false; else htmlLabel\">{{item.label}}</span>\n                        <ng-template #htmlLabel><span class=\"p-steps-title\" [innerHTML]=\"item.label\"></span></ng-template>\n                    </a>\n                    <ng-template #elseBlock>\n                        <a [attr.href]=\"item.url\" class=\"p-menuitem-link\" role=\"presentation\" (click)=\"itemClick($event, item, i)\" (keydown.enter)=\"itemClick($event, item, i)\" [attr.target]=\"item.target\" [attr.id]=\"item.id\"\n                            [attr.tabindex]=\"item.disabled||(i !== activeIndex && readonly) ? null : (item.tabindex ? item.tabindex : '0')\">\n                            <span class=\"p-steps-number\">{{i + 1}}</span>\n                            <span class=\"p-steps-title\" *ngIf=\"item.escape !== false; else htmlRouteLabel\">{{item.label}}</span>\n                            <ng-template #htmlRouteLabel><span class=\"p-steps-title\" [innerHTML]=\"item.label\"></span></ng-template>\n                        </a>\n                    </ng-template>\n                </li>\n            </ul>\n        </div>\n    ",
                        changeDetection: i0.ChangeDetectionStrategy.OnPush,
                        encapsulation: i0.ViewEncapsulation.None,
                        styleUrls: ['./steps.css'],
                        host: {
                            'class': 'p-element'
                        }
                    }]
            }], ctorParameters: function () { return [{ type: i1__namespace.Router }, { type: i1__namespace.ActivatedRoute }, { type: i0__namespace.ChangeDetectorRef }]; }, propDecorators: { activeIndex: [{
                    type: i0.Input
                }], model: [{
                    type: i0.Input
                }], readonly: [{
                    type: i0.Input
                }], style: [{
                    type: i0.Input
                }], styleClass: [{
                    type: i0.Input
                }], activeIndexChange: [{
                    type: i0.Output
                }] } });
    var StepsModule = /** @class */ (function () {
        function StepsModule() {
        }
        return StepsModule;
    }());
    StepsModule.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0__namespace, type: StepsModule, deps: [], target: i0__namespace.ɵɵFactoryTarget.NgModule });
    StepsModule.ɵmod = i0__namespace.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0__namespace, type: StepsModule, declarations: [Steps], imports: [i2.CommonModule, i1.RouterModule, i3.TooltipModule], exports: [Steps, i1.RouterModule, i3.TooltipModule] });
    StepsModule.ɵinj = i0__namespace.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0__namespace, type: StepsModule, imports: [[i2.CommonModule, i1.RouterModule, i3.TooltipModule], i1.RouterModule, i3.TooltipModule] });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0__namespace, type: StepsModule, decorators: [{
                type: i0.NgModule,
                args: [{
                        imports: [i2.CommonModule, i1.RouterModule, i3.TooltipModule],
                        exports: [Steps, i1.RouterModule, i3.TooltipModule],
                        declarations: [Steps]
                    }]
            }] });

    /**
     * Generated bundle index. Do not edit.
     */

    exports.Steps = Steps;
    exports.StepsModule = StepsModule;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=primeng-steps.umd.js.map
