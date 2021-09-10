(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@angular/common')) :
    typeof define === 'function' && define.amd ? define('primeng/chip', ['exports', '@angular/core', '@angular/common'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory((global.primeng = global.primeng || {}, global.primeng.chip = {}), global.ng.core, global.ng.common));
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

    var Chip = /** @class */ (function () {
        function Chip() {
            this.removeIcon = "pi pi-times-circle";
            this.onRemove = new i0.EventEmitter();
            this.visible = true;
        }
        Chip.prototype.containerClass = function () {
            return {
                'p-chip p-component': true,
                'p-chip-image': this.image != null
            };
        };
        Chip.prototype.close = function (event) {
            this.visible = false;
            this.onRemove.emit(event);
        };
        return Chip;
    }());
    Chip.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0__namespace, type: Chip, deps: [], target: i0__namespace.ɵɵFactoryTarget.Component });
    Chip.ɵcmp = i0__namespace.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.0.5", type: Chip, selector: "p-chip", inputs: { label: "label", icon: "icon", image: "image", style: "style", styleClass: "styleClass", removable: "removable", removeIcon: "removeIcon" }, outputs: { onRemove: "onRemove" }, host: { classAttribute: "p-element" }, ngImport: i0__namespace, template: "\n        <div [ngClass]=\"containerClass()\" [class]=\"styleClass\" [ngStyle]=\"style\" *ngIf=\"visible\">\n            <ng-content></ng-content>\n            <img [src]=\"image\" *ngIf=\"image;else iconTemplate\">\n            <ng-template #iconTemplate><span *ngIf=\"icon\" [class]=\"icon\" [ngClass]=\"'p-chip-icon'\"></span></ng-template>\n            <div class=\"p-chip-text\" *ngIf=\"label\">{{label}}</div>\n            <span *ngIf=\"removable\" tabindex=\"0\" [class]=\"removeIcon\" [ngClass]=\"'pi-chip-remove-icon'\" (click)=\"close($event)\" (keydown.enter)=\"close($event)\"></span>\n        </div>\n    ", isInline: true, styles: [".p-chip{display:inline-flex;align-items:center}.p-chip-icon.pi,.p-chip-text{line-height:1.5}.pi-chip-remove-icon{line-height:1.5;cursor:pointer}.p-chip img{border-radius:50%}"], directives: [{ type: i1__namespace.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i1__namespace.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { type: i1__namespace.NgStyle, selector: "[ngStyle]", inputs: ["ngStyle"] }], changeDetection: i0__namespace.ChangeDetectionStrategy.OnPush, encapsulation: i0__namespace.ViewEncapsulation.None });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0__namespace, type: Chip, decorators: [{
                type: i0.Component,
                args: [{
                        selector: 'p-chip',
                        template: "\n        <div [ngClass]=\"containerClass()\" [class]=\"styleClass\" [ngStyle]=\"style\" *ngIf=\"visible\">\n            <ng-content></ng-content>\n            <img [src]=\"image\" *ngIf=\"image;else iconTemplate\">\n            <ng-template #iconTemplate><span *ngIf=\"icon\" [class]=\"icon\" [ngClass]=\"'p-chip-icon'\"></span></ng-template>\n            <div class=\"p-chip-text\" *ngIf=\"label\">{{label}}</div>\n            <span *ngIf=\"removable\" tabindex=\"0\" [class]=\"removeIcon\" [ngClass]=\"'pi-chip-remove-icon'\" (click)=\"close($event)\" (keydown.enter)=\"close($event)\"></span>\n        </div>\n    ",
                        changeDetection: i0.ChangeDetectionStrategy.OnPush,
                        encapsulation: i0.ViewEncapsulation.None,
                        styleUrls: ['./chip.css'],
                        host: {
                            'class': 'p-element'
                        }
                    }]
            }], propDecorators: { label: [{
                    type: i0.Input
                }], icon: [{
                    type: i0.Input
                }], image: [{
                    type: i0.Input
                }], style: [{
                    type: i0.Input
                }], styleClass: [{
                    type: i0.Input
                }], removable: [{
                    type: i0.Input
                }], removeIcon: [{
                    type: i0.Input
                }], onRemove: [{
                    type: i0.Output
                }] } });
    var ChipModule = /** @class */ (function () {
        function ChipModule() {
        }
        return ChipModule;
    }());
    ChipModule.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0__namespace, type: ChipModule, deps: [], target: i0__namespace.ɵɵFactoryTarget.NgModule });
    ChipModule.ɵmod = i0__namespace.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0__namespace, type: ChipModule, declarations: [Chip], imports: [i1.CommonModule], exports: [Chip] });
    ChipModule.ɵinj = i0__namespace.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0__namespace, type: ChipModule, imports: [[i1.CommonModule]] });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0__namespace, type: ChipModule, decorators: [{
                type: i0.NgModule,
                args: [{
                        imports: [i1.CommonModule],
                        exports: [Chip],
                        declarations: [Chip]
                    }]
            }] });

    /**
     * Generated bundle index. Do not edit.
     */

    exports.Chip = Chip;
    exports.ChipModule = ChipModule;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=primeng-chip.umd.js.map
