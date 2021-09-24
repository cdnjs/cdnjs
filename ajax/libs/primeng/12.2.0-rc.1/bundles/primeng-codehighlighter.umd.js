(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@angular/common')) :
    typeof define === 'function' && define.amd ? define('primeng/codehighlighter', ['exports', '@angular/core', '@angular/common'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory((global.primeng = global.primeng || {}, global.primeng.codehighlighter = {}), global.ng.core, global.ng.common));
}(this, (function (exports, i0, common) { 'use strict';

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

    var CodeHighlighter = /** @class */ (function () {
        function CodeHighlighter(el) {
            this.el = el;
        }
        CodeHighlighter.prototype.ngAfterViewInit = function () {
            if (window['Prism']) {
                window['Prism'].highlightElement(this.el.nativeElement);
            }
        };
        return CodeHighlighter;
    }());
    CodeHighlighter.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0__namespace, type: CodeHighlighter, deps: [{ token: i0__namespace.ElementRef }], target: i0__namespace.ɵɵFactoryTarget.Directive });
    CodeHighlighter.ɵdir = i0__namespace.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "12.0.5", type: CodeHighlighter, selector: "[pCode]", host: { classAttribute: "p-element" }, ngImport: i0__namespace });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0__namespace, type: CodeHighlighter, decorators: [{
                type: i0.Directive,
                args: [{
                        selector: '[pCode]',
                        host: {
                            'class': 'p-element'
                        }
                    }]
            }], ctorParameters: function () { return [{ type: i0__namespace.ElementRef }]; } });
    var CodeHighlighterModule = /** @class */ (function () {
        function CodeHighlighterModule() {
        }
        return CodeHighlighterModule;
    }());
    CodeHighlighterModule.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0__namespace, type: CodeHighlighterModule, deps: [], target: i0__namespace.ɵɵFactoryTarget.NgModule });
    CodeHighlighterModule.ɵmod = i0__namespace.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0__namespace, type: CodeHighlighterModule, declarations: [CodeHighlighter], imports: [common.CommonModule], exports: [CodeHighlighter] });
    CodeHighlighterModule.ɵinj = i0__namespace.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0__namespace, type: CodeHighlighterModule, imports: [[common.CommonModule]] });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0__namespace, type: CodeHighlighterModule, decorators: [{
                type: i0.NgModule,
                args: [{
                        imports: [common.CommonModule],
                        exports: [CodeHighlighter],
                        declarations: [CodeHighlighter]
                    }]
            }] });

    /**
     * Generated bundle index. Do not edit.
     */

    exports.CodeHighlighter = CodeHighlighter;
    exports.CodeHighlighterModule = CodeHighlighterModule;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=primeng-codehighlighter.umd.js.map
