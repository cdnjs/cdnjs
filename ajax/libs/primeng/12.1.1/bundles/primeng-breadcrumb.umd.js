(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@angular/common'), require('@angular/router'), require('primeng/tooltip')) :
    typeof define === 'function' && define.amd ? define('primeng/breadcrumb', ['exports', '@angular/core', '@angular/common', '@angular/router', 'primeng/tooltip'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory((global.primeng = global.primeng || {}, global.primeng.breadcrumb = {}), global.ng.core, global.ng.common, global.ng.router, global.primeng.tooltip));
}(this, (function (exports, i0, i1, i3, i2) { 'use strict';

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

    var Breadcrumb = /** @class */ (function () {
        function Breadcrumb() {
            this.onItemClick = new i0.EventEmitter();
        }
        Breadcrumb.prototype.itemClick = function (event, item) {
            if (item.disabled) {
                event.preventDefault();
                return;
            }
            if (!item.url) {
                event.preventDefault();
            }
            if (item.command) {
                item.command({
                    originalEvent: event,
                    item: item
                });
            }
            this.onItemClick.emit({
                originalEvent: event,
                item: item
            });
        };
        Breadcrumb.prototype.onHomeClick = function (event) {
            if (this.home) {
                this.itemClick(event, this.home);
            }
        };
        return Breadcrumb;
    }());
    Breadcrumb.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0__namespace, type: Breadcrumb, deps: [], target: i0__namespace.ɵɵFactoryTarget.Component });
    Breadcrumb.ɵcmp = i0__namespace.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.0.5", type: Breadcrumb, selector: "p-breadcrumb", inputs: { model: "model", style: "style", styleClass: "styleClass", home: "home" }, outputs: { onItemClick: "onItemClick" }, host: { classAttribute: "p-element" }, ngImport: i0__namespace, template: "\n        <div [class]=\"styleClass\" [ngStyle]=\"style\" [ngClass]=\"'p-breadcrumb p-component'\">\n            <ul>\n                <li [class]=\"home.styleClass\" [ngClass]=\"{'p-breadcrumb-home': true, 'p-disabled':home.disabled}\" [ngStyle]=\"home.style\" *ngIf=\"home\" pTooltip [tooltipOptions]=\"home.tooltipOptions\">\n                    <a *ngIf=\"!home.routerLink\" [href]=\"home.url ? home.url : null\" class=\"p-menuitem-link\" (click)=\"itemClick($event, home)\"\n                        [attr.target]=\"home.target\" [attr.title]=\"home.title\" [attr.id]=\"home.id\" [attr.tabindex]=\"home.disabled ? null : '0'\">\n                        <span *ngIf=\"home.icon\" class=\"p-menuitem-icon\" [ngClass]=\"home.icon||'pi pi-home'\"></span>\n                        <ng-container *ngIf=\"home.label\">\n                            <span *ngIf=\"home.escape !== false; else htmlHomeLabel\" class=\"p-menuitem-text\">{{home.label}}</span>\n                            <ng-template #htmlHomeLabel><span class=\"p-menuitem-text\" [innerHTML]=\"home.label\"></span></ng-template>\n                        </ng-container>\n                    </a>\n                    <a *ngIf=\"home.routerLink\" [routerLink]=\"home.routerLink\" [queryParams]=\"home.queryParams\" [routerLinkActive]=\"'p-menuitem-link-active'\" [routerLinkActiveOptions]=\"home.routerLinkActiveOptions||{exact:false}\" class=\"p-menuitem-link\" (click)=\"itemClick($event, home)\"\n                        [attr.target]=\"home.target\" [attr.title]=\"home.title\" [attr.id]=\"home.id\" [attr.tabindex]=\"home.disabled ? null : '0'\"\n                        [fragment]=\"home.fragment\" [queryParamsHandling]=\"home.queryParamsHandling\" [preserveFragment]=\"home.preserveFragment\" [skipLocationChange]=\"home.skipLocationChange\" [replaceUrl]=\"home.replaceUrl\" [state]=\"home.state\">\n                        <span *ngIf=\"home.icon\" class=\"p-menuitem-icon\" [ngClass]=\"home.icon||'pi pi-home'\"></span>\n                        <ng-container *ngIf=\"home.label\">\n                            <span *ngIf=\"home.escape !== false; else htmlHomeRouteLabel\" class=\"p-menuitem-text\">{{home.label}}</span>\n                            <ng-template #htmlHomeRouteLabel><span class=\"p-menuitem-text\" [innerHTML]=\"home.label\"></span></ng-template>\n                        </ng-container>\n                    </a>\n                </li>\n                <li class=\"p-breadcrumb-chevron pi pi-chevron-right\" *ngIf=\"model&&home\"></li>\n                <ng-template ngFor let-item let-end=\"last\" [ngForOf]=\"model\">\n                    <li [class]=\"item.styleClass\" [ngStyle]=\"item.style\" [ngClass]=\"{'p-disabled':item.disabled}\">\n                        <a *ngIf=\"!item.routerLink\" [attr.href]=\"item.url ? item.url : null\" class=\"p-menuitem-link\" (click)=\"itemClick($event, item)\" pTooltip [tooltipOptions]=\"item.tooltipOptions\"\n                            [attr.target]=\"item.target\" [attr.title]=\"item.title\" [attr.id]=\"item.id\" [attr.tabindex]=\"item.disabled ? null : '0'\">\n                            <span *ngIf=\"item.icon\" class=\"p-menuitem-icon\" [ngClass]=\"item.icon\"></span>\n                            <ng-container *ngIf=\"item.label\">\n                                <span *ngIf=\"item.escape !== false; else htmlLabel\" class=\"p-menuitem-text\">{{item.label}}</span>\n                                <ng-template #htmlLabel><span class=\"p-menuitem-text\" [innerHTML]=\"item.label\"></span></ng-template>\n                            </ng-container>\n                        </a>\n                        <a *ngIf=\"item.routerLink\" [routerLink]=\"item.routerLink\" [queryParams]=\"item.queryParams\" [routerLinkActive]=\"'p-menuitem-link-active'\"  [routerLinkActiveOptions]=\"item.routerLinkActiveOptions||{exact:false}\" class=\"p-menuitem-link\" (click)=\"itemClick($event, item)\"\n                            [attr.target]=\"item.target\" [attr.title]=\"item.title\" [attr.id]=\"item.id\" [attr.tabindex]=\"item.disabled ? null : '0'\"\n                            [fragment]=\"item.fragment\" [queryParamsHandling]=\"item.queryParamsHandling\" [preserveFragment]=\"item.preserveFragment\" [skipLocationChange]=\"item.skipLocationChange\" [replaceUrl]=\"item.replaceUrl\" [state]=\"item.state\">\n                            <span *ngIf=\"item.icon\" class=\"p-menuitem-icon\" [ngClass]=\"item.icon\"></span>\n                            <ng-container *ngIf=\"item.label\">\n                                <span *ngIf=\"item.escape !== false; else htmlRouteLabel\" class=\"p-menuitem-text\">{{item.label}}</span>\n                                <ng-template #htmlRouteLabel><span class=\"p-menuitem-text\" [innerHTML]=\"item.label\"></span></ng-template>\n                            </ng-container>\n                        </a>\n                    </li>\n                    <li class=\"p-breadcrumb-chevron pi pi-chevron-right\" *ngIf=\"!end\"></li>\n                </ng-template>\n            </ul>\n        </div>\n    ", isInline: true, styles: [".p-breadcrumb{overflow-x:auto}.p-breadcrumb ul{margin:0;padding:0;list-style-type:none;display:flex;align-items:center;flex-wrap:nowrap}.p-breadcrumb .p-menuitem-text{line-height:1}.p-breadcrumb .p-menuitem-link{text-decoration:none}"], directives: [{ type: i1__namespace.NgStyle, selector: "[ngStyle]", inputs: ["ngStyle"] }, { type: i1__namespace.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { type: i1__namespace.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i2__namespace.Tooltip, selector: "[pTooltip]", inputs: ["tooltipPosition", "tooltipEvent", "appendTo", "positionStyle", "tooltipStyleClass", "tooltipZIndex", "escape", "showDelay", "hideDelay", "life", "positionTop", "positionLeft", "pTooltip", "tooltipDisabled", "tooltipOptions"] }, { type: i3__namespace.RouterLinkWithHref, selector: "a[routerLink],area[routerLink]", inputs: ["routerLink", "target", "queryParams", "fragment", "queryParamsHandling", "preserveFragment", "skipLocationChange", "replaceUrl", "state", "relativeTo"] }, { type: i3__namespace.RouterLinkActive, selector: "[routerLinkActive]", inputs: ["routerLinkActiveOptions", "routerLinkActive"], exportAs: ["routerLinkActive"] }, { type: i1__namespace.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }], changeDetection: i0__namespace.ChangeDetectionStrategy.OnPush, encapsulation: i0__namespace.ViewEncapsulation.None });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0__namespace, type: Breadcrumb, decorators: [{
                type: i0.Component,
                args: [{
                        selector: 'p-breadcrumb',
                        template: "\n        <div [class]=\"styleClass\" [ngStyle]=\"style\" [ngClass]=\"'p-breadcrumb p-component'\">\n            <ul>\n                <li [class]=\"home.styleClass\" [ngClass]=\"{'p-breadcrumb-home': true, 'p-disabled':home.disabled}\" [ngStyle]=\"home.style\" *ngIf=\"home\" pTooltip [tooltipOptions]=\"home.tooltipOptions\">\n                    <a *ngIf=\"!home.routerLink\" [href]=\"home.url ? home.url : null\" class=\"p-menuitem-link\" (click)=\"itemClick($event, home)\"\n                        [attr.target]=\"home.target\" [attr.title]=\"home.title\" [attr.id]=\"home.id\" [attr.tabindex]=\"home.disabled ? null : '0'\">\n                        <span *ngIf=\"home.icon\" class=\"p-menuitem-icon\" [ngClass]=\"home.icon||'pi pi-home'\"></span>\n                        <ng-container *ngIf=\"home.label\">\n                            <span *ngIf=\"home.escape !== false; else htmlHomeLabel\" class=\"p-menuitem-text\">{{home.label}}</span>\n                            <ng-template #htmlHomeLabel><span class=\"p-menuitem-text\" [innerHTML]=\"home.label\"></span></ng-template>\n                        </ng-container>\n                    </a>\n                    <a *ngIf=\"home.routerLink\" [routerLink]=\"home.routerLink\" [queryParams]=\"home.queryParams\" [routerLinkActive]=\"'p-menuitem-link-active'\" [routerLinkActiveOptions]=\"home.routerLinkActiveOptions||{exact:false}\" class=\"p-menuitem-link\" (click)=\"itemClick($event, home)\"\n                        [attr.target]=\"home.target\" [attr.title]=\"home.title\" [attr.id]=\"home.id\" [attr.tabindex]=\"home.disabled ? null : '0'\"\n                        [fragment]=\"home.fragment\" [queryParamsHandling]=\"home.queryParamsHandling\" [preserveFragment]=\"home.preserveFragment\" [skipLocationChange]=\"home.skipLocationChange\" [replaceUrl]=\"home.replaceUrl\" [state]=\"home.state\">\n                        <span *ngIf=\"home.icon\" class=\"p-menuitem-icon\" [ngClass]=\"home.icon||'pi pi-home'\"></span>\n                        <ng-container *ngIf=\"home.label\">\n                            <span *ngIf=\"home.escape !== false; else htmlHomeRouteLabel\" class=\"p-menuitem-text\">{{home.label}}</span>\n                            <ng-template #htmlHomeRouteLabel><span class=\"p-menuitem-text\" [innerHTML]=\"home.label\"></span></ng-template>\n                        </ng-container>\n                    </a>\n                </li>\n                <li class=\"p-breadcrumb-chevron pi pi-chevron-right\" *ngIf=\"model&&home\"></li>\n                <ng-template ngFor let-item let-end=\"last\" [ngForOf]=\"model\">\n                    <li [class]=\"item.styleClass\" [ngStyle]=\"item.style\" [ngClass]=\"{'p-disabled':item.disabled}\">\n                        <a *ngIf=\"!item.routerLink\" [attr.href]=\"item.url ? item.url : null\" class=\"p-menuitem-link\" (click)=\"itemClick($event, item)\" pTooltip [tooltipOptions]=\"item.tooltipOptions\"\n                            [attr.target]=\"item.target\" [attr.title]=\"item.title\" [attr.id]=\"item.id\" [attr.tabindex]=\"item.disabled ? null : '0'\">\n                            <span *ngIf=\"item.icon\" class=\"p-menuitem-icon\" [ngClass]=\"item.icon\"></span>\n                            <ng-container *ngIf=\"item.label\">\n                                <span *ngIf=\"item.escape !== false; else htmlLabel\" class=\"p-menuitem-text\">{{item.label}}</span>\n                                <ng-template #htmlLabel><span class=\"p-menuitem-text\" [innerHTML]=\"item.label\"></span></ng-template>\n                            </ng-container>\n                        </a>\n                        <a *ngIf=\"item.routerLink\" [routerLink]=\"item.routerLink\" [queryParams]=\"item.queryParams\" [routerLinkActive]=\"'p-menuitem-link-active'\"  [routerLinkActiveOptions]=\"item.routerLinkActiveOptions||{exact:false}\" class=\"p-menuitem-link\" (click)=\"itemClick($event, item)\"\n                            [attr.target]=\"item.target\" [attr.title]=\"item.title\" [attr.id]=\"item.id\" [attr.tabindex]=\"item.disabled ? null : '0'\"\n                            [fragment]=\"item.fragment\" [queryParamsHandling]=\"item.queryParamsHandling\" [preserveFragment]=\"item.preserveFragment\" [skipLocationChange]=\"item.skipLocationChange\" [replaceUrl]=\"item.replaceUrl\" [state]=\"item.state\">\n                            <span *ngIf=\"item.icon\" class=\"p-menuitem-icon\" [ngClass]=\"item.icon\"></span>\n                            <ng-container *ngIf=\"item.label\">\n                                <span *ngIf=\"item.escape !== false; else htmlRouteLabel\" class=\"p-menuitem-text\">{{item.label}}</span>\n                                <ng-template #htmlRouteLabel><span class=\"p-menuitem-text\" [innerHTML]=\"item.label\"></span></ng-template>\n                            </ng-container>\n                        </a>\n                    </li>\n                    <li class=\"p-breadcrumb-chevron pi pi-chevron-right\" *ngIf=\"!end\"></li>\n                </ng-template>\n            </ul>\n        </div>\n    ",
                        changeDetection: i0.ChangeDetectionStrategy.OnPush,
                        encapsulation: i0.ViewEncapsulation.None,
                        styleUrls: ['./breadcrumb.css'],
                        host: {
                            'class': 'p-element'
                        }
                    }]
            }], propDecorators: { model: [{
                    type: i0.Input
                }], style: [{
                    type: i0.Input
                }], styleClass: [{
                    type: i0.Input
                }], home: [{
                    type: i0.Input
                }], onItemClick: [{
                    type: i0.Output
                }] } });
    var BreadcrumbModule = /** @class */ (function () {
        function BreadcrumbModule() {
        }
        return BreadcrumbModule;
    }());
    BreadcrumbModule.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0__namespace, type: BreadcrumbModule, deps: [], target: i0__namespace.ɵɵFactoryTarget.NgModule });
    BreadcrumbModule.ɵmod = i0__namespace.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0__namespace, type: BreadcrumbModule, declarations: [Breadcrumb], imports: [i1.CommonModule, i3.RouterModule, i2.TooltipModule], exports: [Breadcrumb, i3.RouterModule, i2.TooltipModule] });
    BreadcrumbModule.ɵinj = i0__namespace.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0__namespace, type: BreadcrumbModule, imports: [[i1.CommonModule, i3.RouterModule, i2.TooltipModule], i3.RouterModule, i2.TooltipModule] });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0__namespace, type: BreadcrumbModule, decorators: [{
                type: i0.NgModule,
                args: [{
                        imports: [i1.CommonModule, i3.RouterModule, i2.TooltipModule],
                        exports: [Breadcrumb, i3.RouterModule, i2.TooltipModule],
                        declarations: [Breadcrumb]
                    }]
            }] });

    /**
     * Generated bundle index. Do not edit.
     */

    exports.Breadcrumb = Breadcrumb;
    exports.BreadcrumbModule = BreadcrumbModule;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=primeng-breadcrumb.umd.js.map
