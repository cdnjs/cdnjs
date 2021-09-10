(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@angular/common'), require('primeng/button'), require('primeng/menu')) :
    typeof define === 'function' && define.amd ? define('primeng/splitbutton', ['exports', '@angular/core', '@angular/common', 'primeng/button', 'primeng/menu'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory((global.primeng = global.primeng || {}, global.primeng.splitbutton = {}), global.ng.core, global.ng.common, global.primeng.button, global.primeng.menu));
}(this, (function (exports, i0, i2, i3, i1) { 'use strict';

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
    var i3__namespace = /*#__PURE__*/_interopNamespace(i3);
    var i1__namespace = /*#__PURE__*/_interopNamespace(i1);

    var SplitButton = /** @class */ (function () {
        function SplitButton() {
            this.iconPos = 'left';
            this.onClick = new i0.EventEmitter();
            this.onDropdownClick = new i0.EventEmitter();
            this.showTransitionOptions = '.12s cubic-bezier(0, 0, 0.2, 1)';
            this.hideTransitionOptions = '.1s linear';
        }
        SplitButton.prototype.onDefaultButtonClick = function (event) {
            this.onClick.emit(event);
        };
        SplitButton.prototype.onDropdownButtonClick = function (event) {
            this.onDropdownClick.emit(event);
            this.menu.toggle({ currentTarget: this.containerViewChild.nativeElement, relativeAlign: this.appendTo == null });
        };
        return SplitButton;
    }());
    SplitButton.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0__namespace, type: SplitButton, deps: [], target: i0__namespace.ɵɵFactoryTarget.Component });
    SplitButton.ɵcmp = i0__namespace.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.0.5", type: SplitButton, selector: "p-splitButton", inputs: { model: "model", icon: "icon", iconPos: "iconPos", label: "label", style: "style", styleClass: "styleClass", menuStyle: "menuStyle", menuStyleClass: "menuStyleClass", disabled: "disabled", tabindex: "tabindex", appendTo: "appendTo", dir: "dir", expandAriaLabel: "expandAriaLabel", showTransitionOptions: "showTransitionOptions", hideTransitionOptions: "hideTransitionOptions" }, outputs: { onClick: "onClick", onDropdownClick: "onDropdownClick" }, host: { classAttribute: "p-element" }, viewQueries: [{ propertyName: "containerViewChild", first: true, predicate: ["container"], descendants: true }, { propertyName: "buttonViewChild", first: true, predicate: ["defaultbtn"], descendants: true }, { propertyName: "menu", first: true, predicate: ["menu"], descendants: true }], ngImport: i0__namespace, template: "\n        <div #container [ngClass]=\"'p-splitbutton p-component'\" [ngStyle]=\"style\" [class]=\"styleClass\">\n            <button #defaultbtn class=\"p-splitbutton-defaultbutton\" type=\"button\" pButton [icon]=\"icon\" [iconPos]=\"iconPos\" [label]=\"label\" (click)=\"onDefaultButtonClick($event)\" [disabled]=\"disabled\" [attr.tabindex]=\"tabindex\"></button>\n            <button type=\"button\" pButton class=\"p-splitbutton-menubutton\" icon=\"pi pi-chevron-down\" (click)=\"onDropdownButtonClick($event)\" [disabled]=\"disabled\" [attr.aria-label]=\"expandAriaLabel\"></button>\n            <p-menu #menu [popup]=\"true\" [model]=\"model\" [style]=\"menuStyle\" [styleClass]=\"menuStyleClass\" [appendTo]=\"appendTo\"\n                    [showTransitionOptions]=\"showTransitionOptions\" [hideTransitionOptions]=\"hideTransitionOptions\"></p-menu>\n        </div>\n    ", isInline: true, styles: [".p-splitbutton{display:inline-flex;position:relative}.p-splitbutton .p-splitbutton-defaultbutton{flex:1 1 auto;border-top-right-radius:0;border-bottom-right-radius:0;border-right:0}.p-splitbutton-menubutton{display:flex;align-items:center;justify-content:center;border-top-left-radius:0;border-bottom-left-radius:0}.p-splitbutton .p-menu{min-width:100%}.p-fluid .p-splitbutton{display:flex}"], components: [{ type: i1__namespace.Menu, selector: "p-menu", inputs: ["model", "popup", "style", "styleClass", "appendTo", "autoZIndex", "baseZIndex", "showTransitionOptions", "hideTransitionOptions"], outputs: ["onShow", "onHide"] }], directives: [{ type: i2__namespace.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { type: i2__namespace.NgStyle, selector: "[ngStyle]", inputs: ["ngStyle"] }, { type: i3__namespace.ButtonDirective, selector: "[pButton]", inputs: ["iconPos", "loadingIcon", "label", "icon", "loading"] }], changeDetection: i0__namespace.ChangeDetectionStrategy.OnPush, encapsulation: i0__namespace.ViewEncapsulation.None });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0__namespace, type: SplitButton, decorators: [{
                type: i0.Component,
                args: [{
                        selector: 'p-splitButton',
                        template: "\n        <div #container [ngClass]=\"'p-splitbutton p-component'\" [ngStyle]=\"style\" [class]=\"styleClass\">\n            <button #defaultbtn class=\"p-splitbutton-defaultbutton\" type=\"button\" pButton [icon]=\"icon\" [iconPos]=\"iconPos\" [label]=\"label\" (click)=\"onDefaultButtonClick($event)\" [disabled]=\"disabled\" [attr.tabindex]=\"tabindex\"></button>\n            <button type=\"button\" pButton class=\"p-splitbutton-menubutton\" icon=\"pi pi-chevron-down\" (click)=\"onDropdownButtonClick($event)\" [disabled]=\"disabled\" [attr.aria-label]=\"expandAriaLabel\"></button>\n            <p-menu #menu [popup]=\"true\" [model]=\"model\" [style]=\"menuStyle\" [styleClass]=\"menuStyleClass\" [appendTo]=\"appendTo\"\n                    [showTransitionOptions]=\"showTransitionOptions\" [hideTransitionOptions]=\"hideTransitionOptions\"></p-menu>\n        </div>\n    ",
                        changeDetection: i0.ChangeDetectionStrategy.OnPush,
                        encapsulation: i0.ViewEncapsulation.None,
                        styleUrls: ['./splitbutton.css'],
                        host: {
                            'class': 'p-element'
                        }
                    }]
            }], propDecorators: { model: [{
                    type: i0.Input
                }], icon: [{
                    type: i0.Input
                }], iconPos: [{
                    type: i0.Input
                }], label: [{
                    type: i0.Input
                }], onClick: [{
                    type: i0.Output
                }], onDropdownClick: [{
                    type: i0.Output
                }], style: [{
                    type: i0.Input
                }], styleClass: [{
                    type: i0.Input
                }], menuStyle: [{
                    type: i0.Input
                }], menuStyleClass: [{
                    type: i0.Input
                }], disabled: [{
                    type: i0.Input
                }], tabindex: [{
                    type: i0.Input
                }], appendTo: [{
                    type: i0.Input
                }], dir: [{
                    type: i0.Input
                }], expandAriaLabel: [{
                    type: i0.Input
                }], showTransitionOptions: [{
                    type: i0.Input
                }], hideTransitionOptions: [{
                    type: i0.Input
                }], containerViewChild: [{
                    type: i0.ViewChild,
                    args: ['container']
                }], buttonViewChild: [{
                    type: i0.ViewChild,
                    args: ['defaultbtn']
                }], menu: [{
                    type: i0.ViewChild,
                    args: ['menu']
                }] } });
    var SplitButtonModule = /** @class */ (function () {
        function SplitButtonModule() {
        }
        return SplitButtonModule;
    }());
    SplitButtonModule.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0__namespace, type: SplitButtonModule, deps: [], target: i0__namespace.ɵɵFactoryTarget.NgModule });
    SplitButtonModule.ɵmod = i0__namespace.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0__namespace, type: SplitButtonModule, declarations: [SplitButton], imports: [i2.CommonModule, i3.ButtonModule, i1.MenuModule], exports: [SplitButton, i3.ButtonModule] });
    SplitButtonModule.ɵinj = i0__namespace.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0__namespace, type: SplitButtonModule, imports: [[i2.CommonModule, i3.ButtonModule, i1.MenuModule], i3.ButtonModule] });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0__namespace, type: SplitButtonModule, decorators: [{
                type: i0.NgModule,
                args: [{
                        imports: [i2.CommonModule, i3.ButtonModule, i1.MenuModule],
                        exports: [SplitButton, i3.ButtonModule],
                        declarations: [SplitButton]
                    }]
            }] });

    /**
     * Generated bundle index. Do not edit.
     */

    exports.SplitButton = SplitButton;
    exports.SplitButtonModule = SplitButtonModule;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=primeng-splitbutton.umd.js.map
