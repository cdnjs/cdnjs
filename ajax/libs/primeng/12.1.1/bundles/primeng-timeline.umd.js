(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@angular/common'), require('primeng/api')) :
    typeof define === 'function' && define.amd ? define('primeng/timeline', ['exports', '@angular/core', '@angular/common', 'primeng/api'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory((global.primeng = global.primeng || {}, global.primeng.timeline = {}), global.ng.core, global.ng.common, global.primeng.api));
}(this, (function (exports, i0, i1, api) { 'use strict';

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

    var Timeline = /** @class */ (function () {
        function Timeline(el) {
            this.el = el;
            this.align = 'left';
            this.layout = 'vertical';
        }
        Timeline.prototype.getBlockableElement = function () {
            return this.el.nativeElement.children[0];
        };
        Timeline.prototype.ngAfterContentInit = function () {
            var _this = this;
            this.templates.forEach(function (item) {
                switch (item.getType()) {
                    case 'content':
                        _this.contentTemplate = item.template;
                        break;
                    case 'opposite':
                        _this.oppositeTemplate = item.template;
                        break;
                    case 'marker':
                        _this.markerTemplate = item.template;
                        break;
                }
            });
        };
        return Timeline;
    }());
    Timeline.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0__namespace, type: Timeline, deps: [{ token: i0__namespace.ElementRef }], target: i0__namespace.ɵɵFactoryTarget.Component });
    Timeline.ɵcmp = i0__namespace.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.0.5", type: Timeline, selector: "p-timeline", inputs: { value: "value", style: "style", styleClass: "styleClass", align: "align", layout: "layout" }, host: { classAttribute: "p-element" }, queries: [{ propertyName: "templates", predicate: api.PrimeTemplate }], ngImport: i0__namespace, template: "\n        <div [class]=\"styleClass\" [ngStyle]=\"style\" [ngClass]=\"{'p-timeline p-component': true,\n                'p-timeline-left': align === 'left',\n                'p-timeline-right': align === 'right',\n                'p-timeline-top': align === 'top',\n                'p-timeline-bottom': align === 'bottom',\n                'p-timeline-alternate': align === 'alternate',\n                'p-timeline-vertical': layout === 'vertical',\n                'p-timeline-horizontal': layout === 'horizontal'}\">\n            <div *ngFor=\"let event of value; let last=last\" class=\"p-timeline-event\">\n                <div class=\"p-timeline-event-opposite\">\n                    <ng-container *ngTemplateOutlet=\"oppositeTemplate; context: {$implicit: event}\"></ng-container>\n                </div>\n                <div class=\"p-timeline-event-separator\">\n                    <ng-container *ngIf=\"markerTemplate; else marker\">\n                        <ng-container *ngTemplateOutlet=\"markerTemplate; context: {$implicit: event}\"></ng-container>\n                    </ng-container>\n                    <ng-template #marker>\n                        <div class=\"p-timeline-event-marker\"></div>\n                    </ng-template>\n                    <div *ngIf=\"!last\" class=\"p-timeline-event-connector\"></div>\n                </div>\n                <div class=\"p-timeline-event-content\">\n                    <ng-container *ngTemplateOutlet=\"contentTemplate; context: {$implicit: event}\"></ng-container>\n                </div>\n            </div>\n        </div>\n    ", isInline: true, styles: [".p-timeline{display:flex;flex-grow:1;flex-direction:column}.p-timeline-left .p-timeline-event-opposite{text-align:right}.p-timeline-left .p-timeline-event-content{text-align:left}.p-timeline-right .p-timeline-event{flex-direction:row-reverse}.p-timeline-right .p-timeline-event-opposite{text-align:left}.p-timeline-right .p-timeline-event-content{text-align:right}.p-timeline-vertical.p-timeline-alternate .p-timeline-event:nth-child(2n){flex-direction:row-reverse}.p-timeline-vertical.p-timeline-alternate .p-timeline-event:nth-child(odd) .p-timeline-event-opposite{text-align:right}.p-timeline-vertical.p-timeline-alternate .p-timeline-event:nth-child(2n) .p-timeline-event-opposite,.p-timeline-vertical.p-timeline-alternate .p-timeline-event:nth-child(odd) .p-timeline-event-content{text-align:left}.p-timeline-vertical.p-timeline-alternate .p-timeline-event:nth-child(2n) .p-timeline-event-content{text-align:right}.p-timeline-event{display:flex;position:relative;min-height:70px}.p-timeline-event:last-child{min-height:0}.p-timeline-event-content,.p-timeline-event-opposite{flex:1;padding:0 1rem}.p-timeline-event-separator{flex:0;display:flex;align-items:center;flex-direction:column}.p-timeline-event-marker{display:flex;align-self:baseline}.p-timeline-event-connector{flex-grow:1}.p-timeline-horizontal{flex-direction:row}.p-timeline-horizontal .p-timeline-event{flex-direction:column;flex:1}.p-timeline-horizontal .p-timeline-event:last-child{flex:0}.p-timeline-horizontal .p-timeline-event-separator{flex-direction:row}.p-timeline-horizontal .p-timeline-event-connector{width:100%}.p-timeline-bottom .p-timeline-event,.p-timeline-horizontal.p-timeline-alternate .p-timeline-event:nth-child(2n){flex-direction:column-reverse}"], directives: [{ type: i1__namespace.NgStyle, selector: "[ngStyle]", inputs: ["ngStyle"] }, { type: i1__namespace.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { type: i1__namespace.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { type: i1__namespace.NgTemplateOutlet, selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet"] }, { type: i1__namespace.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }], changeDetection: i0__namespace.ChangeDetectionStrategy.OnPush, encapsulation: i0__namespace.ViewEncapsulation.None });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0__namespace, type: Timeline, decorators: [{
                type: i0.Component,
                args: [{
                        selector: 'p-timeline',
                        template: "\n        <div [class]=\"styleClass\" [ngStyle]=\"style\" [ngClass]=\"{'p-timeline p-component': true,\n                'p-timeline-left': align === 'left',\n                'p-timeline-right': align === 'right',\n                'p-timeline-top': align === 'top',\n                'p-timeline-bottom': align === 'bottom',\n                'p-timeline-alternate': align === 'alternate',\n                'p-timeline-vertical': layout === 'vertical',\n                'p-timeline-horizontal': layout === 'horizontal'}\">\n            <div *ngFor=\"let event of value; let last=last\" class=\"p-timeline-event\">\n                <div class=\"p-timeline-event-opposite\">\n                    <ng-container *ngTemplateOutlet=\"oppositeTemplate; context: {$implicit: event}\"></ng-container>\n                </div>\n                <div class=\"p-timeline-event-separator\">\n                    <ng-container *ngIf=\"markerTemplate; else marker\">\n                        <ng-container *ngTemplateOutlet=\"markerTemplate; context: {$implicit: event}\"></ng-container>\n                    </ng-container>\n                    <ng-template #marker>\n                        <div class=\"p-timeline-event-marker\"></div>\n                    </ng-template>\n                    <div *ngIf=\"!last\" class=\"p-timeline-event-connector\"></div>\n                </div>\n                <div class=\"p-timeline-event-content\">\n                    <ng-container *ngTemplateOutlet=\"contentTemplate; context: {$implicit: event}\"></ng-container>\n                </div>\n            </div>\n        </div>\n    ",
                        changeDetection: i0.ChangeDetectionStrategy.OnPush,
                        encapsulation: i0.ViewEncapsulation.None,
                        styleUrls: ['./timeline.css'],
                        host: {
                            'class': 'p-element'
                        }
                    }]
            }], ctorParameters: function () { return [{ type: i0__namespace.ElementRef }]; }, propDecorators: { value: [{
                    type: i0.Input
                }], style: [{
                    type: i0.Input
                }], styleClass: [{
                    type: i0.Input
                }], align: [{
                    type: i0.Input
                }], layout: [{
                    type: i0.Input
                }], templates: [{
                    type: i0.ContentChildren,
                    args: [api.PrimeTemplate]
                }] } });
    var TimelineModule = /** @class */ (function () {
        function TimelineModule() {
        }
        return TimelineModule;
    }());
    TimelineModule.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0__namespace, type: TimelineModule, deps: [], target: i0__namespace.ɵɵFactoryTarget.NgModule });
    TimelineModule.ɵmod = i0__namespace.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0__namespace, type: TimelineModule, declarations: [Timeline], imports: [i1.CommonModule], exports: [Timeline, api.SharedModule] });
    TimelineModule.ɵinj = i0__namespace.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0__namespace, type: TimelineModule, imports: [[i1.CommonModule], api.SharedModule] });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0__namespace, type: TimelineModule, decorators: [{
                type: i0.NgModule,
                args: [{
                        imports: [i1.CommonModule],
                        exports: [Timeline, api.SharedModule],
                        declarations: [Timeline]
                    }]
            }] });

    /**
     * Generated bundle index. Do not edit.
     */

    exports.Timeline = Timeline;
    exports.TimelineModule = TimelineModule;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=primeng-timeline.umd.js.map
