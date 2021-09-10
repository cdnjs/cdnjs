(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@angular/common')) :
    typeof define === 'function' && define.amd ? define('primeng/progressbar', ['exports', '@angular/core', '@angular/common'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory((global.primeng = global.primeng || {}, global.primeng.progressbar = {}), global.ng.core, global.ng.common));
}(this, (function (exports, i0, i1) { 'use strict';

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

    var ProgressBar = /** @class */ (function () {
        function ProgressBar() {
            this.showValue = true;
            this.unit = '%';
            this.mode = 'determinate';
        }
        return ProgressBar;
    }());
    ProgressBar.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0__namespace, type: ProgressBar, deps: [], target: i0__namespace.ɵɵFactoryTarget.Component });
    ProgressBar.ɵcmp = i0__namespace.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.0.5", type: ProgressBar, selector: "p-progressBar", inputs: { value: "value", showValue: "showValue", style: "style", styleClass: "styleClass", unit: "unit", mode: "mode" }, host: { classAttribute: "p-element" }, ngImport: i0__namespace, template: "\n        <div [class]=\"styleClass\" [ngStyle]=\"style\" role=\"progressbar\" aria-valuemin=\"0\" [attr.aria-valuenow]=\"value\" aria-valuemax=\"100\"\n            [ngClass]=\"{'p-progressbar p-component': true, 'p-progressbar-determinate': (mode === 'determinate'), 'p-progressbar-indeterminate': (mode === 'indeterminate')}\">\n            <div *ngIf=\"mode === 'determinate'\" class=\"p-progressbar-value p-progressbar-value-animate\" [style.width]=\"value + '%'\" style=\"display:block\"></div>\n            <div *ngIf=\"mode === 'determinate' && showValue\" class=\"p-progressbar-label\" [style.display]=\"value != null ? 'block' : 'none'\">{{value}}{{unit}}</div>\n            <div *ngIf=\"mode === 'indeterminate'\" class=\"p-progressbar-indeterminate-container\">\n                <div class=\"p-progressbar-value p-progressbar-value-animate\"></div>\n            </div>\n        </div>\n    ", isInline: true, styles: [".p-progressbar{position:relative;overflow:hidden}.p-progressbar-determinate .p-progressbar-value{height:100%;width:0;position:absolute;display:none;border:0}.p-progressbar-determinate .p-progressbar-value-animate{transition:width 1s ease-in-out}.p-progressbar-determinate .p-progressbar-label{text-align:center;height:100%;width:100%;position:absolute;font-weight:700}.p-progressbar-indeterminate .p-progressbar-value:before{content:\"\";position:absolute;background-color:inherit;top:0;left:0;bottom:0;will-change:left,right;animation:p-progressbar-indeterminate-anim 2.1s cubic-bezier(.65,.815,.735,.395) infinite}.p-progressbar-indeterminate .p-progressbar-value:after{content:\"\";position:absolute;background-color:inherit;top:0;left:0;bottom:0;will-change:left,right;animation:p-progressbar-indeterminate-anim-short 2.1s cubic-bezier(.165,.84,.44,1) infinite;animation-delay:1.15s}@keyframes p-progressbar-indeterminate-anim{0%{left:-35%;right:100%}60%{left:100%;right:-90%}to{left:100%;right:-90%}}@keyframes p-progressbar-indeterminate-anim-short{0%{left:-200%;right:100%}60%{left:107%;right:-8%}to{left:107%;right:-8%}}"], directives: [{ type: i1__namespace.NgStyle, selector: "[ngStyle]", inputs: ["ngStyle"] }, { type: i1__namespace.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { type: i1__namespace.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }], changeDetection: i0__namespace.ChangeDetectionStrategy.OnPush, encapsulation: i0__namespace.ViewEncapsulation.None });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0__namespace, type: ProgressBar, decorators: [{
                type: i0.Component,
                args: [{
                        selector: 'p-progressBar',
                        template: "\n        <div [class]=\"styleClass\" [ngStyle]=\"style\" role=\"progressbar\" aria-valuemin=\"0\" [attr.aria-valuenow]=\"value\" aria-valuemax=\"100\"\n            [ngClass]=\"{'p-progressbar p-component': true, 'p-progressbar-determinate': (mode === 'determinate'), 'p-progressbar-indeterminate': (mode === 'indeterminate')}\">\n            <div *ngIf=\"mode === 'determinate'\" class=\"p-progressbar-value p-progressbar-value-animate\" [style.width]=\"value + '%'\" style=\"display:block\"></div>\n            <div *ngIf=\"mode === 'determinate' && showValue\" class=\"p-progressbar-label\" [style.display]=\"value != null ? 'block' : 'none'\">{{value}}{{unit}}</div>\n            <div *ngIf=\"mode === 'indeterminate'\" class=\"p-progressbar-indeterminate-container\">\n                <div class=\"p-progressbar-value p-progressbar-value-animate\"></div>\n            </div>\n        </div>\n    ",
                        changeDetection: i0.ChangeDetectionStrategy.OnPush,
                        encapsulation: i0.ViewEncapsulation.None,
                        styleUrls: ['./progressbar.css'],
                        host: {
                            'class': 'p-element'
                        }
                    }]
            }], propDecorators: { value: [{
                    type: i0.Input
                }], showValue: [{
                    type: i0.Input
                }], style: [{
                    type: i0.Input
                }], styleClass: [{
                    type: i0.Input
                }], unit: [{
                    type: i0.Input
                }], mode: [{
                    type: i0.Input
                }] } });
    var ProgressBarModule = /** @class */ (function () {
        function ProgressBarModule() {
        }
        return ProgressBarModule;
    }());
    ProgressBarModule.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0__namespace, type: ProgressBarModule, deps: [], target: i0__namespace.ɵɵFactoryTarget.NgModule });
    ProgressBarModule.ɵmod = i0__namespace.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0__namespace, type: ProgressBarModule, declarations: [ProgressBar], imports: [i1.CommonModule], exports: [ProgressBar] });
    ProgressBarModule.ɵinj = i0__namespace.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0__namespace, type: ProgressBarModule, imports: [[i1.CommonModule]] });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0__namespace, type: ProgressBarModule, decorators: [{
                type: i0.NgModule,
                args: [{
                        imports: [i1.CommonModule],
                        exports: [ProgressBar],
                        declarations: [ProgressBar]
                    }]
            }] });

    /**
     * Generated bundle index. Do not edit.
     */

    exports.ProgressBar = ProgressBar;
    exports.ProgressBarModule = ProgressBarModule;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=primeng-progressbar.umd.js.map
