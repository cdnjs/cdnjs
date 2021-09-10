(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@angular/common'), require('@fullcalendar/core')) :
    typeof define === 'function' && define.amd ? define('primeng/fullcalendar', ['exports', '@angular/core', '@angular/common', '@fullcalendar/core'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory((global.primeng = global.primeng || {}, global.primeng.fullcalendar = {}), global.ng.core, global.ng.common, global.core));
}(this, (function (exports, i0, i1, core) { 'use strict';

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

    var FullCalendar = /** @class */ (function () {
        function FullCalendar(el) {
            this.el = el;
        }
        FullCalendar.prototype.ngOnInit = function () {
            this.config = {
                theme: true
            };
            if (this.options) {
                for (var prop in this.options) {
                    this.config[prop] = this.options[prop];
                }
            }
        };
        FullCalendar.prototype.ngAfterViewChecked = function () {
            if (!this.initialized && this.el.nativeElement.offsetParent) {
                this.initialize();
            }
        };
        Object.defineProperty(FullCalendar.prototype, "events", {
            get: function () {
                return this._events;
            },
            set: function (value) {
                this._events = value;
                if (this._events && this.calendar) {
                    this.calendar.removeAllEventSources();
                    this.calendar.addEventSource(this._events);
                }
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(FullCalendar.prototype, "options", {
            get: function () {
                return this._options;
            },
            set: function (value) {
                this._options = value;
                if (this._options && this.calendar) {
                    for (var prop in this._options) {
                        var optionValue = this._options[prop];
                        this.config[prop] = optionValue;
                        this.calendar.setOption(prop, optionValue);
                    }
                }
            },
            enumerable: false,
            configurable: true
        });
        FullCalendar.prototype.initialize = function () {
            this.calendar = new core.Calendar(this.el.nativeElement.children[0], this.config);
            this.calendar.render();
            this.initialized = true;
            if (this.events) {
                this.calendar.removeAllEventSources();
                this.calendar.addEventSource(this.events);
            }
        };
        FullCalendar.prototype.getCalendar = function () {
            return this.calendar;
        };
        FullCalendar.prototype.ngOnDestroy = function () {
            if (this.calendar) {
                this.calendar.destroy();
                this.initialized = false;
                this.calendar = null;
            }
        };
        return FullCalendar;
    }());
    FullCalendar.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0__namespace, type: FullCalendar, deps: [{ token: i0__namespace.ElementRef }], target: i0__namespace.ɵɵFactoryTarget.Component });
    FullCalendar.ɵcmp = i0__namespace.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.0.5", type: FullCalendar, selector: "p-fullCalendar", inputs: { style: "style", styleClass: "styleClass", events: "events", options: "options" }, host: { classAttribute: "p-element" }, ngImport: i0__namespace, template: '<div [ngStyle]="style" [class]="styleClass"></div>', isInline: true, directives: [{ type: i1__namespace.NgStyle, selector: "[ngStyle]", inputs: ["ngStyle"] }], changeDetection: i0__namespace.ChangeDetectionStrategy.OnPush, encapsulation: i0__namespace.ViewEncapsulation.None });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0__namespace, type: FullCalendar, decorators: [{
                type: i0.Component,
                args: [{
                        selector: 'p-fullCalendar',
                        template: '<div [ngStyle]="style" [class]="styleClass"></div>',
                        changeDetection: i0.ChangeDetectionStrategy.OnPush,
                        encapsulation: i0.ViewEncapsulation.None,
                        host: {
                            'class': 'p-element'
                        }
                    }]
            }], ctorParameters: function () { return [{ type: i0__namespace.ElementRef }]; }, propDecorators: { style: [{
                    type: i0.Input
                }], styleClass: [{
                    type: i0.Input
                }], events: [{
                    type: i0.Input
                }], options: [{
                    type: i0.Input
                }] } });
    var FullCalendarModule = /** @class */ (function () {
        function FullCalendarModule() {
        }
        return FullCalendarModule;
    }());
    FullCalendarModule.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0__namespace, type: FullCalendarModule, deps: [], target: i0__namespace.ɵɵFactoryTarget.NgModule });
    FullCalendarModule.ɵmod = i0__namespace.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0__namespace, type: FullCalendarModule, declarations: [FullCalendar], imports: [i1.CommonModule], exports: [FullCalendar] });
    FullCalendarModule.ɵinj = i0__namespace.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0__namespace, type: FullCalendarModule, imports: [[i1.CommonModule]] });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0__namespace, type: FullCalendarModule, decorators: [{
                type: i0.NgModule,
                args: [{
                        imports: [i1.CommonModule],
                        exports: [FullCalendar],
                        declarations: [FullCalendar]
                    }]
            }] });

    /**
     * Generated bundle index. Do not edit.
     */

    exports.FullCalendar = FullCalendar;
    exports.FullCalendarModule = FullCalendarModule;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=primeng-fullcalendar.umd.js.map
