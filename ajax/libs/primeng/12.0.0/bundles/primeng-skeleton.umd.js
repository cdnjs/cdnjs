(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@angular/common')) :
    typeof define === 'function' && define.amd ? define('primeng/skeleton', ['exports', '@angular/core', '@angular/common'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory((global.primeng = global.primeng || {}, global.primeng.skeleton = {}), global.ng.core, global.ng.common));
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

    var Skeleton = /** @class */ (function () {
        function Skeleton() {
            this.shape = "rectangle";
            this.animation = "wave";
            this.borderRadius = null;
            this.size = null;
            this.width = "100%";
            this.height = "1rem";
        }
        Skeleton.prototype.containerClass = function () {
            return {
                'p-skeleton p-component': true,
                'p-skeleton-circle': this.shape === 'circle',
                'p-skeleton-none': this.animation === 'none'
            };
        };
        Skeleton.prototype.containerStyle = function () {
            if (this.size)
                return Object.assign(Object.assign({}, this.style), { width: this.size, height: this.size, borderRadius: this.borderRadius });
            else
                return Object.assign(Object.assign({}, this.style), { width: this.width, height: this.height, borderRadius: this.borderRadius });
        };
        return Skeleton;
    }());
    Skeleton.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.0.4", ngImport: i0__namespace, type: Skeleton, deps: [], target: i0__namespace.ɵɵFactoryTarget.Component });
    Skeleton.ɵcmp = i0__namespace.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.0.4", type: Skeleton, selector: "p-skeleton", inputs: { styleClass: "styleClass", style: "style", shape: "shape", animation: "animation", borderRadius: "borderRadius", size: "size", width: "width", height: "height" }, ngImport: i0__namespace, template: "\n        <div [ngClass]=\"containerClass()\" [class]=\"styleClass\" [ngStyle]=\"containerStyle()\">\n        </div>\n    ", isInline: true, styles: [".p-skeleton{position:relative;overflow:hidden}.p-skeleton:after{content:\"\";animation:p-skeleton-animation 1.2s infinite;height:100%;left:0;position:absolute;right:0;top:0;transform:translateX(-100%);z-index:1}.p-skeleton.p-skeleton-circle{border-radius:50%}.p-skeleton-none:after{animation:none}@keyframes p-skeleton-animation{0%{transform:translateX(-100%)}to{transform:translateX(100%)}}"], directives: [{ type: i1__namespace.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { type: i1__namespace.NgStyle, selector: "[ngStyle]", inputs: ["ngStyle"] }], changeDetection: i0__namespace.ChangeDetectionStrategy.OnPush, encapsulation: i0__namespace.ViewEncapsulation.None });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.0.4", ngImport: i0__namespace, type: Skeleton, decorators: [{
                type: i0.Component,
                args: [{
                        selector: 'p-skeleton',
                        template: "\n        <div [ngClass]=\"containerClass()\" [class]=\"styleClass\" [ngStyle]=\"containerStyle()\">\n        </div>\n    ",
                        changeDetection: i0.ChangeDetectionStrategy.OnPush,
                        encapsulation: i0.ViewEncapsulation.None,
                        styleUrls: ['./skeleton.css']
                    }]
            }], propDecorators: { styleClass: [{
                    type: i0.Input
                }], style: [{
                    type: i0.Input
                }], shape: [{
                    type: i0.Input
                }], animation: [{
                    type: i0.Input
                }], borderRadius: [{
                    type: i0.Input
                }], size: [{
                    type: i0.Input
                }], width: [{
                    type: i0.Input
                }], height: [{
                    type: i0.Input
                }] } });
    var SkeletonModule = /** @class */ (function () {
        function SkeletonModule() {
        }
        return SkeletonModule;
    }());
    SkeletonModule.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.0.4", ngImport: i0__namespace, type: SkeletonModule, deps: [], target: i0__namespace.ɵɵFactoryTarget.NgModule });
    SkeletonModule.ɵmod = i0__namespace.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.0.4", ngImport: i0__namespace, type: SkeletonModule, declarations: [Skeleton], imports: [i1.CommonModule], exports: [Skeleton] });
    SkeletonModule.ɵinj = i0__namespace.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.0.4", ngImport: i0__namespace, type: SkeletonModule, imports: [[i1.CommonModule]] });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.0.4", ngImport: i0__namespace, type: SkeletonModule, decorators: [{
                type: i0.NgModule,
                args: [{
                        imports: [i1.CommonModule],
                        exports: [Skeleton],
                        declarations: [Skeleton]
                    }]
            }] });

    /**
     * Generated bundle index. Do not edit.
     */

    exports.Skeleton = Skeleton;
    exports.SkeletonModule = SkeletonModule;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=primeng-skeleton.umd.js.map
