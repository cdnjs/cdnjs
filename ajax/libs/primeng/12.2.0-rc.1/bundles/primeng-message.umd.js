(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@angular/common')) :
    typeof define === 'function' && define.amd ? define('primeng/message', ['exports', '@angular/core', '@angular/common'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory((global.primeng = global.primeng || {}, global.primeng.message = {}), global.ng.core, global.ng.common));
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

    var UIMessage = /** @class */ (function () {
        function UIMessage() {
            this.escape = true;
        }
        Object.defineProperty(UIMessage.prototype, "icon", {
            get: function () {
                var icon = null;
                if (this.severity) {
                    switch (this.severity) {
                        case 'success':
                            icon = 'pi pi-check';
                            break;
                        case 'info':
                            icon = 'pi pi-info-circle';
                            break;
                        case 'error':
                            icon = 'pi pi-times-circle';
                            break;
                        case 'warn':
                            icon = 'pi pi-exclamation-triangle';
                            break;
                        default:
                            icon = 'pi pi-info-circle';
                            break;
                    }
                }
                return icon;
            },
            enumerable: false,
            configurable: true
        });
        return UIMessage;
    }());
    UIMessage.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0__namespace, type: UIMessage, deps: [], target: i0__namespace.ɵɵFactoryTarget.Component });
    UIMessage.ɵcmp = i0__namespace.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.0.5", type: UIMessage, selector: "p-message", inputs: { severity: "severity", text: "text", escape: "escape", style: "style", styleClass: "styleClass" }, host: { classAttribute: "p-element" }, ngImport: i0__namespace, template: "\n        <div aria-live=\"polite\" class=\"p-inline-message p-component p-inline-message\" *ngIf=\"severity\" [ngStyle]=\"style\" [class]=\"styleClass\"\n        [ngClass]=\"{'p-inline-message-info': (severity === 'info'),\n                'p-inline-message-warn': (severity === 'warn'),\n                'p-inline-message-error': (severity === 'error'),\n                'p-inline-message-success': (severity === 'success'),\n                'p-inline-message-icon-only': this.text == null}\">\n            <span class=\"p-inline-message-icon\" [ngClass]=\"icon\"></span>\n            <div *ngIf=\"!escape; else escapeOut\">\n                <span *ngIf=\"!escape\" class=\"p-inline-message-text\" [innerHTML]=\"text\"></span>\n            </div>\n            <ng-template #escapeOut>\n                <span *ngIf=\"escape\" class=\"p-inline-message-text\">{{text}}</span>\n            </ng-template>\n        </div>\n    ", isInline: true, styles: [".p-inline-message{display:inline-flex;align-items:center;justify-content:center;vertical-align:top}.p-inline-message-icon-only .p-inline-message-text{visibility:hidden;width:0}.p-fluid .p-inline-message{display:flex}"], directives: [{ type: i1__namespace.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i1__namespace.NgStyle, selector: "[ngStyle]", inputs: ["ngStyle"] }, { type: i1__namespace.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }], changeDetection: i0__namespace.ChangeDetectionStrategy.OnPush, encapsulation: i0__namespace.ViewEncapsulation.None });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0__namespace, type: UIMessage, decorators: [{
                type: i0.Component,
                args: [{
                        selector: 'p-message',
                        template: "\n        <div aria-live=\"polite\" class=\"p-inline-message p-component p-inline-message\" *ngIf=\"severity\" [ngStyle]=\"style\" [class]=\"styleClass\"\n        [ngClass]=\"{'p-inline-message-info': (severity === 'info'),\n                'p-inline-message-warn': (severity === 'warn'),\n                'p-inline-message-error': (severity === 'error'),\n                'p-inline-message-success': (severity === 'success'),\n                'p-inline-message-icon-only': this.text == null}\">\n            <span class=\"p-inline-message-icon\" [ngClass]=\"icon\"></span>\n            <div *ngIf=\"!escape; else escapeOut\">\n                <span *ngIf=\"!escape\" class=\"p-inline-message-text\" [innerHTML]=\"text\"></span>\n            </div>\n            <ng-template #escapeOut>\n                <span *ngIf=\"escape\" class=\"p-inline-message-text\">{{text}}</span>\n            </ng-template>\n        </div>\n    ",
                        changeDetection: i0.ChangeDetectionStrategy.OnPush,
                        encapsulation: i0.ViewEncapsulation.None,
                        styleUrls: ['./message.css'],
                        host: {
                            'class': 'p-element'
                        }
                    }]
            }], propDecorators: { severity: [{
                    type: i0.Input
                }], text: [{
                    type: i0.Input
                }], escape: [{
                    type: i0.Input
                }], style: [{
                    type: i0.Input
                }], styleClass: [{
                    type: i0.Input
                }] } });
    var MessageModule = /** @class */ (function () {
        function MessageModule() {
        }
        return MessageModule;
    }());
    MessageModule.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0__namespace, type: MessageModule, deps: [], target: i0__namespace.ɵɵFactoryTarget.NgModule });
    MessageModule.ɵmod = i0__namespace.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0__namespace, type: MessageModule, declarations: [UIMessage], imports: [i1.CommonModule], exports: [UIMessage] });
    MessageModule.ɵinj = i0__namespace.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0__namespace, type: MessageModule, imports: [[i1.CommonModule]] });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0__namespace, type: MessageModule, decorators: [{
                type: i0.NgModule,
                args: [{
                        imports: [i1.CommonModule],
                        exports: [UIMessage],
                        declarations: [UIMessage]
                    }]
            }] });

    /**
     * Generated bundle index. Do not edit.
     */

    exports.MessageModule = MessageModule;
    exports.UIMessage = UIMessage;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=primeng-message.umd.js.map
