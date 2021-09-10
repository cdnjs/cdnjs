(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@angular/common'), require('@angular/forms')) :
    typeof define === 'function' && define.amd ? define('primeng/rating', ['exports', '@angular/core', '@angular/common', '@angular/forms'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory((global.primeng = global.primeng || {}, global.primeng.rating = {}), global.ng.core, global.ng.common, global.ng.forms));
}(this, (function (exports, i0, i1, forms) { 'use strict';

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

    var RATING_VALUE_ACCESSOR = {
        provide: forms.NG_VALUE_ACCESSOR,
        useExisting: i0.forwardRef(function () { return Rating; }),
        multi: true
    };
    var Rating = /** @class */ (function () {
        function Rating(cd) {
            this.cd = cd;
            this.stars = 5;
            this.cancel = true;
            this.iconOnClass = 'pi pi-star';
            this.iconOffClass = 'pi pi-star-o';
            this.iconCancelClass = 'pi pi-ban';
            this.onRate = new i0.EventEmitter();
            this.onCancel = new i0.EventEmitter();
            this.onModelChange = function () { };
            this.onModelTouched = function () { };
        }
        Rating.prototype.ngOnInit = function () {
            this.starsArray = [];
            for (var i = 0; i < this.stars; i++) {
                this.starsArray[i] = i;
            }
        };
        Rating.prototype.rate = function (event, i) {
            if (!this.readonly && !this.disabled) {
                this.value = (i + 1);
                this.onModelChange(this.value);
                this.onModelTouched();
                this.onRate.emit({
                    originalEvent: event,
                    value: (i + 1)
                });
            }
            event.preventDefault();
        };
        Rating.prototype.clear = function (event) {
            if (!this.readonly && !this.disabled) {
                this.value = null;
                this.onModelChange(this.value);
                this.onModelTouched();
                this.onCancel.emit(event);
            }
            event.preventDefault();
        };
        Rating.prototype.writeValue = function (value) {
            this.value = value;
            this.cd.detectChanges();
        };
        Rating.prototype.registerOnChange = function (fn) {
            this.onModelChange = fn;
        };
        Rating.prototype.registerOnTouched = function (fn) {
            this.onModelTouched = fn;
        };
        Rating.prototype.setDisabledState = function (val) {
            this.disabled = val;
            this.cd.markForCheck();
        };
        return Rating;
    }());
    Rating.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0__namespace, type: Rating, deps: [{ token: i0__namespace.ChangeDetectorRef }], target: i0__namespace.ɵɵFactoryTarget.Component });
    Rating.ɵcmp = i0__namespace.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.0.5", type: Rating, selector: "p-rating", inputs: { disabled: "disabled", readonly: "readonly", stars: "stars", cancel: "cancel", iconOnClass: "iconOnClass", iconOnStyle: "iconOnStyle", iconOffClass: "iconOffClass", iconOffStyle: "iconOffStyle", iconCancelClass: "iconCancelClass", iconCancelStyle: "iconCancelStyle" }, outputs: { onRate: "onRate", onCancel: "onCancel" }, host: { classAttribute: "p-element" }, providers: [RATING_VALUE_ACCESSOR], ngImport: i0__namespace, template: "\n        <div class=\"p-rating\" [ngClass]=\"{'p-readonly': readonly, 'p-disabled': disabled}\">\n            <span [attr.tabindex]=\"(disabled || readonly) ? null : '0'\" *ngIf=\"cancel\" (click)=\"clear($event)\" (keydown.enter)=\"clear($event)\" class=\"p-rating-icon p-rating-cancel\" [ngClass]=\"iconCancelClass\" [ngStyle]=\"iconCancelStyle\"></span>\n            <span *ngFor=\"let star of starsArray;let i=index\" class=\"p-rating-icon\" [attr.tabindex]=\"(disabled || readonly) ? null : '0'\"  (click)=\"rate($event,i)\" (keydown.enter)=\"rate($event,i)\"\n                [ngClass]=\"(!value || i >= value) ? iconOffClass : iconOnClass\"\n                [ngStyle]=\"(!value || i >= value) ? iconOffStyle : iconOnStyle\"></span>\n        </div>\n    ", isInline: true, styles: [".p-rating-icon{cursor:pointer}.p-rating.p-rating-readonly .p-rating-icon{cursor:default}"], directives: [{ type: i1__namespace.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { type: i1__namespace.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i1__namespace.NgStyle, selector: "[ngStyle]", inputs: ["ngStyle"] }, { type: i1__namespace.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }], changeDetection: i0__namespace.ChangeDetectionStrategy.OnPush, encapsulation: i0__namespace.ViewEncapsulation.None });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0__namespace, type: Rating, decorators: [{
                type: i0.Component,
                args: [{
                        selector: 'p-rating',
                        template: "\n        <div class=\"p-rating\" [ngClass]=\"{'p-readonly': readonly, 'p-disabled': disabled}\">\n            <span [attr.tabindex]=\"(disabled || readonly) ? null : '0'\" *ngIf=\"cancel\" (click)=\"clear($event)\" (keydown.enter)=\"clear($event)\" class=\"p-rating-icon p-rating-cancel\" [ngClass]=\"iconCancelClass\" [ngStyle]=\"iconCancelStyle\"></span>\n            <span *ngFor=\"let star of starsArray;let i=index\" class=\"p-rating-icon\" [attr.tabindex]=\"(disabled || readonly) ? null : '0'\"  (click)=\"rate($event,i)\" (keydown.enter)=\"rate($event,i)\"\n                [ngClass]=\"(!value || i >= value) ? iconOffClass : iconOnClass\"\n                [ngStyle]=\"(!value || i >= value) ? iconOffStyle : iconOnStyle\"></span>\n        </div>\n    ",
                        providers: [RATING_VALUE_ACCESSOR],
                        changeDetection: i0.ChangeDetectionStrategy.OnPush,
                        encapsulation: i0.ViewEncapsulation.None,
                        styleUrls: ['./rating.css'],
                        host: {
                            'class': 'p-element'
                        }
                    }]
            }], ctorParameters: function () { return [{ type: i0__namespace.ChangeDetectorRef }]; }, propDecorators: { disabled: [{
                    type: i0.Input
                }], readonly: [{
                    type: i0.Input
                }], stars: [{
                    type: i0.Input
                }], cancel: [{
                    type: i0.Input
                }], iconOnClass: [{
                    type: i0.Input
                }], iconOnStyle: [{
                    type: i0.Input
                }], iconOffClass: [{
                    type: i0.Input
                }], iconOffStyle: [{
                    type: i0.Input
                }], iconCancelClass: [{
                    type: i0.Input
                }], iconCancelStyle: [{
                    type: i0.Input
                }], onRate: [{
                    type: i0.Output
                }], onCancel: [{
                    type: i0.Output
                }] } });
    var RatingModule = /** @class */ (function () {
        function RatingModule() {
        }
        return RatingModule;
    }());
    RatingModule.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0__namespace, type: RatingModule, deps: [], target: i0__namespace.ɵɵFactoryTarget.NgModule });
    RatingModule.ɵmod = i0__namespace.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0__namespace, type: RatingModule, declarations: [Rating], imports: [i1.CommonModule], exports: [Rating] });
    RatingModule.ɵinj = i0__namespace.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0__namespace, type: RatingModule, imports: [[i1.CommonModule]] });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0__namespace, type: RatingModule, decorators: [{
                type: i0.NgModule,
                args: [{
                        imports: [i1.CommonModule],
                        exports: [Rating],
                        declarations: [Rating]
                    }]
            }] });

    /**
     * Generated bundle index. Do not edit.
     */

    exports.RATING_VALUE_ACCESSOR = RATING_VALUE_ACCESSOR;
    exports.Rating = Rating;
    exports.RatingModule = RatingModule;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=primeng-rating.umd.js.map
