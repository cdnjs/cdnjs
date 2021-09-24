(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@angular/common')) :
    typeof define === 'function' && define.amd ? define('primeng/tag', ['exports', '@angular/core', '@angular/common'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory((global.primeng = global.primeng || {}, global.primeng.tag = {}), global.ng.core, global.ng.common));
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

    var Tag = /** @class */ (function () {
        function Tag() {
        }
        Tag.prototype.containerClass = function () {
            return {
                'p-tag p-component': true,
                'p-tag-info': this.severity === 'info',
                'p-tag-success': this.severity === 'success',
                'p-tag-warning': this.severity === 'warning',
                'p-tag-danger': this.severity === 'danger',
                'p-tag-rounded': this.rounded
            };
        };
        return Tag;
    }());
    Tag.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0__namespace, type: Tag, deps: [], target: i0__namespace.ɵɵFactoryTarget.Component });
    Tag.ɵcmp = i0__namespace.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.0.5", type: Tag, selector: "p-tag", inputs: { styleClass: "styleClass", style: "style", severity: "severity", value: "value", icon: "icon", rounded: "rounded" }, host: { classAttribute: "p-element" }, ngImport: i0__namespace, template: "\n        <span [ngClass]=\"containerClass()\" [class]=\"styleClass\" [ngStyle]=\"style\">\n            <ng-content></ng-content>\n            <span class=\"p-tag-icon\" [ngClass]=\"icon\" *ngIf=\"icon\"></span>\n            <span class=\"p-tag-value\">{{value}}</span>\n        </span>\n    ", isInline: true, styles: [".p-tag{display:inline-flex;align-items:center;justify-content:center}.p-tag-icon,.p-tag-icon.pi,.p-tag-value{line-height:1.5}.p-tag.p-tag-rounded{border-radius:10rem}"], directives: [{ type: i1__namespace.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { type: i1__namespace.NgStyle, selector: "[ngStyle]", inputs: ["ngStyle"] }, { type: i1__namespace.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }], changeDetection: i0__namespace.ChangeDetectionStrategy.OnPush, encapsulation: i0__namespace.ViewEncapsulation.None });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0__namespace, type: Tag, decorators: [{
                type: i0.Component,
                args: [{
                        selector: 'p-tag',
                        template: "\n        <span [ngClass]=\"containerClass()\" [class]=\"styleClass\" [ngStyle]=\"style\">\n            <ng-content></ng-content>\n            <span class=\"p-tag-icon\" [ngClass]=\"icon\" *ngIf=\"icon\"></span>\n            <span class=\"p-tag-value\">{{value}}</span>\n        </span>\n    ",
                        changeDetection: i0.ChangeDetectionStrategy.OnPush,
                        encapsulation: i0.ViewEncapsulation.None,
                        styleUrls: ['./tag.css'],
                        host: {
                            'class': 'p-element'
                        }
                    }]
            }], propDecorators: { styleClass: [{
                    type: i0.Input
                }], style: [{
                    type: i0.Input
                }], severity: [{
                    type: i0.Input
                }], value: [{
                    type: i0.Input
                }], icon: [{
                    type: i0.Input
                }], rounded: [{
                    type: i0.Input
                }] } });
    var TagModule = /** @class */ (function () {
        function TagModule() {
        }
        return TagModule;
    }());
    TagModule.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0__namespace, type: TagModule, deps: [], target: i0__namespace.ɵɵFactoryTarget.NgModule });
    TagModule.ɵmod = i0__namespace.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0__namespace, type: TagModule, declarations: [Tag], imports: [i1.CommonModule], exports: [Tag] });
    TagModule.ɵinj = i0__namespace.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0__namespace, type: TagModule, imports: [[i1.CommonModule]] });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0__namespace, type: TagModule, decorators: [{
                type: i0.NgModule,
                args: [{
                        imports: [i1.CommonModule],
                        exports: [Tag],
                        declarations: [Tag]
                    }]
            }] });

    /**
     * Generated bundle index. Do not edit.
     */

    exports.Tag = Tag;
    exports.TagModule = TagModule;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=primeng-tag.umd.js.map
