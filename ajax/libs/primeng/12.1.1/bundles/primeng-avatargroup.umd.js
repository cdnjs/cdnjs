(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@angular/common')) :
    typeof define === 'function' && define.amd ? define('primeng/avatargroup', ['exports', '@angular/core', '@angular/common'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory((global.primeng = global.primeng || {}, global.primeng.avatargroup = {}), global.ng.core, global.ng.common));
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

    var AvatarGroup = /** @class */ (function () {
        function AvatarGroup() {
        }
        return AvatarGroup;
    }());
    AvatarGroup.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0__namespace, type: AvatarGroup, deps: [], target: i0__namespace.ɵɵFactoryTarget.Component });
    AvatarGroup.ɵcmp = i0__namespace.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.0.5", type: AvatarGroup, selector: "p-avatarGroup", inputs: { styleClass: "styleClass", style: "style" }, host: { classAttribute: "p-element" }, ngImport: i0__namespace, template: "\n        <div [ngClass]=\"'p-avatar-group p-component'\" [class]=\"styleClass\" [ngStyle]=\"style\">\n            <ng-content></ng-content>\n        </div>\n    ", isInline: true, styles: [".p-avatar-group p-avatar+p-avatar{margin-left:-1rem}.p-avatar-group{display:flex;align-items:center}"], directives: [{ type: i1__namespace.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { type: i1__namespace.NgStyle, selector: "[ngStyle]", inputs: ["ngStyle"] }], changeDetection: i0__namespace.ChangeDetectionStrategy.OnPush, encapsulation: i0__namespace.ViewEncapsulation.None });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0__namespace, type: AvatarGroup, decorators: [{
                type: i0.Component,
                args: [{
                        selector: 'p-avatarGroup',
                        template: "\n        <div [ngClass]=\"'p-avatar-group p-component'\" [class]=\"styleClass\" [ngStyle]=\"style\">\n            <ng-content></ng-content>\n        </div>\n    ",
                        changeDetection: i0.ChangeDetectionStrategy.OnPush,
                        encapsulation: i0.ViewEncapsulation.None,
                        styleUrls: ['./avatargroup.css'],
                        host: {
                            'class': 'p-element'
                        }
                    }]
            }], propDecorators: { styleClass: [{
                    type: i0.Input
                }], style: [{
                    type: i0.Input
                }] } });
    var AvatarGroupModule = /** @class */ (function () {
        function AvatarGroupModule() {
        }
        return AvatarGroupModule;
    }());
    AvatarGroupModule.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0__namespace, type: AvatarGroupModule, deps: [], target: i0__namespace.ɵɵFactoryTarget.NgModule });
    AvatarGroupModule.ɵmod = i0__namespace.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0__namespace, type: AvatarGroupModule, declarations: [AvatarGroup], imports: [i1.CommonModule], exports: [AvatarGroup] });
    AvatarGroupModule.ɵinj = i0__namespace.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0__namespace, type: AvatarGroupModule, imports: [[i1.CommonModule]] });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0__namespace, type: AvatarGroupModule, decorators: [{
                type: i0.NgModule,
                args: [{
                        imports: [i1.CommonModule],
                        exports: [AvatarGroup],
                        declarations: [AvatarGroup]
                    }]
            }] });

    /**
     * Generated bundle index. Do not edit.
     */

    exports.AvatarGroup = AvatarGroup;
    exports.AvatarGroupModule = AvatarGroupModule;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=primeng-avatargroup.umd.js.map
