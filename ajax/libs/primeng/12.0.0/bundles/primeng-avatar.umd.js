(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@angular/common')) :
    typeof define === 'function' && define.amd ? define('primeng/avatar', ['exports', '@angular/core', '@angular/common'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory((global.primeng = global.primeng || {}, global.primeng.avatar = {}), global.ng.core, global.ng.common));
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

    var Avatar = /** @class */ (function () {
        function Avatar() {
            this.size = "normal";
            this.shape = "square";
        }
        Avatar.prototype.containerClass = function () {
            return {
                'p-avatar p-component': true,
                'p-avatar-image': this.image != null,
                'p-avatar-circle': this.shape === 'circle',
                'p-avatar-lg': this.size === 'large',
                'p-avatar-xl': this.size === 'xlarge'
            };
        };
        return Avatar;
    }());
    Avatar.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.0.4", ngImport: i0__namespace, type: Avatar, deps: [], target: i0__namespace.ɵɵFactoryTarget.Component });
    Avatar.ɵcmp = i0__namespace.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.0.4", type: Avatar, selector: "p-avatar", inputs: { label: "label", icon: "icon", image: "image", size: "size", shape: "shape", style: "style", styleClass: "styleClass" }, ngImport: i0__namespace, template: "\n        <div [ngClass]=\"containerClass()\" [class]=\"styleClass\" [ngStyle]=\"style\">\n            <ng-content></ng-content>\n            <span class=\"p-avatar-text\" *ngIf=\"label; else iconTemplate\">{{label}}</span>\n            <ng-template #iconTemplate><span [class]=\"icon\" [ngClass]=\"'p-avatar-icon'\" *ngIf=\"icon; else imageTemplate\"></span></ng-template>\n            <ng-template #imageTemplate><img [src]=\"image\" *ngIf=\"image\"></ng-template>\n        </div>\n    ", isInline: true, styles: [".p-avatar{display:inline-flex;align-items:center;justify-content:center;width:2rem;height:2rem;font-size:1rem}.p-avatar.p-avatar-image{background-color:transparent}.p-avatar.p-avatar-circle{border-radius:50%;overflow:hidden}.p-avatar .p-avatar-icon{font-size:1rem}.p-avatar img{width:100%;height:100%}"], directives: [{ type: i1__namespace.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { type: i1__namespace.NgStyle, selector: "[ngStyle]", inputs: ["ngStyle"] }, { type: i1__namespace.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }], changeDetection: i0__namespace.ChangeDetectionStrategy.OnPush, encapsulation: i0__namespace.ViewEncapsulation.None });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.0.4", ngImport: i0__namespace, type: Avatar, decorators: [{
                type: i0.Component,
                args: [{
                        selector: 'p-avatar',
                        template: "\n        <div [ngClass]=\"containerClass()\" [class]=\"styleClass\" [ngStyle]=\"style\">\n            <ng-content></ng-content>\n            <span class=\"p-avatar-text\" *ngIf=\"label; else iconTemplate\">{{label}}</span>\n            <ng-template #iconTemplate><span [class]=\"icon\" [ngClass]=\"'p-avatar-icon'\" *ngIf=\"icon; else imageTemplate\"></span></ng-template>\n            <ng-template #imageTemplate><img [src]=\"image\" *ngIf=\"image\"></ng-template>\n        </div>\n    ",
                        changeDetection: i0.ChangeDetectionStrategy.OnPush,
                        encapsulation: i0.ViewEncapsulation.None,
                        styleUrls: ['./avatar.css']
                    }]
            }], propDecorators: { label: [{
                    type: i0.Input
                }], icon: [{
                    type: i0.Input
                }], image: [{
                    type: i0.Input
                }], size: [{
                    type: i0.Input
                }], shape: [{
                    type: i0.Input
                }], style: [{
                    type: i0.Input
                }], styleClass: [{
                    type: i0.Input
                }] } });
    var AvatarModule = /** @class */ (function () {
        function AvatarModule() {
        }
        return AvatarModule;
    }());
    AvatarModule.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.0.4", ngImport: i0__namespace, type: AvatarModule, deps: [], target: i0__namespace.ɵɵFactoryTarget.NgModule });
    AvatarModule.ɵmod = i0__namespace.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.0.4", ngImport: i0__namespace, type: AvatarModule, declarations: [Avatar], imports: [i1.CommonModule], exports: [Avatar] });
    AvatarModule.ɵinj = i0__namespace.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.0.4", ngImport: i0__namespace, type: AvatarModule, imports: [[i1.CommonModule]] });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.0.4", ngImport: i0__namespace, type: AvatarModule, decorators: [{
                type: i0.NgModule,
                args: [{
                        imports: [i1.CommonModule],
                        exports: [Avatar],
                        declarations: [Avatar]
                    }]
            }] });

    /**
     * Generated bundle index. Do not edit.
     */

    exports.Avatar = Avatar;
    exports.AvatarModule = AvatarModule;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=primeng-avatar.umd.js.map
