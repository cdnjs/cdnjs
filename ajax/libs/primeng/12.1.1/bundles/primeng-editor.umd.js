(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@angular/common'), require('primeng/api'), require('primeng/dom'), require('@angular/forms'), require('quill')) :
    typeof define === 'function' && define.amd ? define('primeng/editor', ['exports', '@angular/core', '@angular/common', 'primeng/api', 'primeng/dom', '@angular/forms', 'quill'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory((global.primeng = global.primeng || {}, global.primeng.editor = {}), global.ng.core, global.ng.common, global.primeng.api, global.primeng.dom, global.ng.forms, global.Quill));
}(this, (function (exports, i0, i1, api, dom, forms, Quill) { 'use strict';

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
    var Quill__namespace = /*#__PURE__*/_interopNamespace(Quill);

    var EDITOR_VALUE_ACCESSOR = {
        provide: forms.NG_VALUE_ACCESSOR,
        useExisting: i0.forwardRef(function () { return Editor; }),
        multi: true
    };
    var Editor = /** @class */ (function () {
        function Editor(el) {
            this.el = el;
            this.onTextChange = new i0.EventEmitter();
            this.onSelectionChange = new i0.EventEmitter();
            this.onInit = new i0.EventEmitter();
            this.onModelChange = function () { };
            this.onModelTouched = function () { };
        }
        Editor.prototype.ngAfterViewInit = function () {
            var _this = this;
            var editorElement = dom.DomHandler.findSingle(this.el.nativeElement, 'div.p-editor-content');
            var toolbarElement = dom.DomHandler.findSingle(this.el.nativeElement, 'div.p-editor-toolbar');
            var defaultModule = { toolbar: toolbarElement };
            var modules = this.modules ? Object.assign(Object.assign({}, defaultModule), this.modules) : defaultModule;
            this.quill = new Quill__namespace(editorElement, {
                modules: modules,
                placeholder: this.placeholder,
                readOnly: this.readonly,
                theme: 'snow',
                formats: this.formats,
                bounds: this.bounds,
                debug: this.debug,
                scrollingContainer: this.scrollingContainer
            });
            if (this.value) {
                this.quill.setContents(this.quill.clipboard.convert(this.value));
            }
            this.quill.on('text-change', function (delta, oldContents, source) {
                if (source === 'user') {
                    var html = dom.DomHandler.findSingle(editorElement, '.ql-editor').innerHTML;
                    var text = _this.quill.getText().trim();
                    if (html === '<p><br></p>') {
                        html = null;
                    }
                    _this.onTextChange.emit({
                        htmlValue: html,
                        textValue: text,
                        delta: delta,
                        source: source
                    });
                    _this.onModelChange(html);
                    _this.onModelTouched();
                }
            });
            this.quill.on('selection-change', function (range, oldRange, source) {
                _this.onSelectionChange.emit({
                    range: range,
                    oldRange: oldRange,
                    source: source
                });
            });
            this.onInit.emit({
                editor: this.quill
            });
        };
        Editor.prototype.ngAfterContentInit = function () {
            var _this = this;
            this.templates.forEach(function (item) {
                switch (item.getType()) {
                    case 'header':
                        _this.headerTemplate = item.template;
                        break;
                }
            });
        };
        Editor.prototype.writeValue = function (value) {
            this.value = value;
            if (this.quill) {
                if (value)
                    this.quill.setContents(this.quill.clipboard.convert(value));
                else
                    this.quill.setText('');
            }
        };
        Editor.prototype.registerOnChange = function (fn) {
            this.onModelChange = fn;
        };
        Editor.prototype.registerOnTouched = function (fn) {
            this.onModelTouched = fn;
        };
        Editor.prototype.getQuill = function () {
            return this.quill;
        };
        Object.defineProperty(Editor.prototype, "readonly", {
            get: function () {
                return this._readonly;
            },
            set: function (val) {
                this._readonly = val;
                if (this.quill) {
                    if (this._readonly)
                        this.quill.disable();
                    else
                        this.quill.enable();
                }
            },
            enumerable: false,
            configurable: true
        });
        return Editor;
    }());
    Editor.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0__namespace, type: Editor, deps: [{ token: i0__namespace.ElementRef }], target: i0__namespace.ɵɵFactoryTarget.Component });
    Editor.ɵcmp = i0__namespace.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.0.5", type: Editor, selector: "p-editor", inputs: { style: "style", styleClass: "styleClass", placeholder: "placeholder", formats: "formats", modules: "modules", bounds: "bounds", scrollingContainer: "scrollingContainer", debug: "debug", readonly: "readonly" }, outputs: { onTextChange: "onTextChange", onSelectionChange: "onSelectionChange", onInit: "onInit" }, host: { classAttribute: "p-element" }, providers: [EDITOR_VALUE_ACCESSOR], queries: [{ propertyName: "toolbar", first: true, predicate: api.Header, descendants: true }, { propertyName: "templates", predicate: api.PrimeTemplate }], ngImport: i0__namespace, template: "\n        <div [ngClass]=\"'p-editor-container'\" [class]=\"styleClass\">\n            <div class=\"p-editor-toolbar\" *ngIf=\"toolbar || headerTemplate\">\n                <ng-content select=\"p-header\"></ng-content>\n                <ng-container *ngTemplateOutlet=\"headerTemplate\"></ng-container>\n            </div>\n            <div class=\"p-editor-toolbar\" *ngIf=\"!toolbar && !headerTemplate\">\n                <span class=\"ql-formats\">\n                    <select class=\"ql-header\">\n                      <option value=\"1\">Heading</option>\n                      <option value=\"2\">Subheading</option>\n                      <option selected>Normal</option>\n                    </select>\n                    <select class=\"ql-font\">\n                      <option selected>Sans Serif</option>\n                      <option value=\"serif\">Serif</option>\n                      <option value=\"monospace\">Monospace</option>\n                    </select>\n                </span>\n                <span class=\"ql-formats\">\n                    <button class=\"ql-bold\" aria-label=\"Bold\" type=\"button\"></button>\n                    <button class=\"ql-italic\" aria-label=\"Italic\" type=\"button\"></button>\n                    <button class=\"ql-underline\" aria-label=\"Underline\" type=\"button\"></button>\n                </span>\n                <span class=\"ql-formats\">\n                    <select class=\"ql-color\"></select>\n                    <select class=\"ql-background\"></select>\n                </span>\n                <span class=\"ql-formats\">\n                    <button class=\"ql-list\" value=\"ordered\" aria-label=\"Ordered List\" type=\"button\"></button>\n                    <button class=\"ql-list\" value=\"bullet\" aria-label=\"Unordered List\" type=\"button\"></button>\n                    <select class=\"ql-align\">\n                        <option selected></option>\n                        <option value=\"center\"></option>\n                        <option value=\"right\"></option>\n                        <option value=\"justify\"></option>\n                    </select>\n                </span>\n                <span class=\"ql-formats\">\n                    <button class=\"ql-link\" aria-label=\"Insert Link\" type=\"button\"></button>\n                    <button class=\"ql-image\" aria-label=\"Insert Image\" type=\"button\"></button>\n                    <button class=\"ql-code-block\" aria-label=\"Insert Code Block\" type=\"button\"></button>\n                </span>\n                <span class=\"ql-formats\">\n                    <button class=\"ql-clean\" aria-label=\"Remove Styles\" type=\"button\"></button>\n                </span>\n            </div>\n            <div class=\"p-editor-content\" [ngStyle]=\"style\"></div>\n        </div>\n    ", isInline: true, styles: [".p-editor-container .p-editor-toolbar.ql-snow .ql-picker.ql-expanded .ql-picker-options .ql-picker-item{width:auto;height:auto}"], directives: [{ type: i1__namespace.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { type: i1__namespace.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i1__namespace.NgTemplateOutlet, selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet"] }, { type: i1__namespace.NgStyle, selector: "[ngStyle]", inputs: ["ngStyle"] }], changeDetection: i0__namespace.ChangeDetectionStrategy.OnPush, encapsulation: i0__namespace.ViewEncapsulation.None });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0__namespace, type: Editor, decorators: [{
                type: i0.Component,
                args: [{
                        selector: 'p-editor',
                        template: "\n        <div [ngClass]=\"'p-editor-container'\" [class]=\"styleClass\">\n            <div class=\"p-editor-toolbar\" *ngIf=\"toolbar || headerTemplate\">\n                <ng-content select=\"p-header\"></ng-content>\n                <ng-container *ngTemplateOutlet=\"headerTemplate\"></ng-container>\n            </div>\n            <div class=\"p-editor-toolbar\" *ngIf=\"!toolbar && !headerTemplate\">\n                <span class=\"ql-formats\">\n                    <select class=\"ql-header\">\n                      <option value=\"1\">Heading</option>\n                      <option value=\"2\">Subheading</option>\n                      <option selected>Normal</option>\n                    </select>\n                    <select class=\"ql-font\">\n                      <option selected>Sans Serif</option>\n                      <option value=\"serif\">Serif</option>\n                      <option value=\"monospace\">Monospace</option>\n                    </select>\n                </span>\n                <span class=\"ql-formats\">\n                    <button class=\"ql-bold\" aria-label=\"Bold\" type=\"button\"></button>\n                    <button class=\"ql-italic\" aria-label=\"Italic\" type=\"button\"></button>\n                    <button class=\"ql-underline\" aria-label=\"Underline\" type=\"button\"></button>\n                </span>\n                <span class=\"ql-formats\">\n                    <select class=\"ql-color\"></select>\n                    <select class=\"ql-background\"></select>\n                </span>\n                <span class=\"ql-formats\">\n                    <button class=\"ql-list\" value=\"ordered\" aria-label=\"Ordered List\" type=\"button\"></button>\n                    <button class=\"ql-list\" value=\"bullet\" aria-label=\"Unordered List\" type=\"button\"></button>\n                    <select class=\"ql-align\">\n                        <option selected></option>\n                        <option value=\"center\"></option>\n                        <option value=\"right\"></option>\n                        <option value=\"justify\"></option>\n                    </select>\n                </span>\n                <span class=\"ql-formats\">\n                    <button class=\"ql-link\" aria-label=\"Insert Link\" type=\"button\"></button>\n                    <button class=\"ql-image\" aria-label=\"Insert Image\" type=\"button\"></button>\n                    <button class=\"ql-code-block\" aria-label=\"Insert Code Block\" type=\"button\"></button>\n                </span>\n                <span class=\"ql-formats\">\n                    <button class=\"ql-clean\" aria-label=\"Remove Styles\" type=\"button\"></button>\n                </span>\n            </div>\n            <div class=\"p-editor-content\" [ngStyle]=\"style\"></div>\n        </div>\n    ",
                        providers: [EDITOR_VALUE_ACCESSOR],
                        changeDetection: i0.ChangeDetectionStrategy.OnPush,
                        styleUrls: ['./editor.css'],
                        encapsulation: i0.ViewEncapsulation.None,
                        host: {
                            'class': 'p-element'
                        }
                    }]
            }], ctorParameters: function () { return [{ type: i0__namespace.ElementRef }]; }, propDecorators: { onTextChange: [{
                    type: i0.Output
                }], onSelectionChange: [{
                    type: i0.Output
                }], toolbar: [{
                    type: i0.ContentChild,
                    args: [api.Header]
                }], style: [{
                    type: i0.Input
                }], styleClass: [{
                    type: i0.Input
                }], placeholder: [{
                    type: i0.Input
                }], formats: [{
                    type: i0.Input
                }], modules: [{
                    type: i0.Input
                }], bounds: [{
                    type: i0.Input
                }], scrollingContainer: [{
                    type: i0.Input
                }], debug: [{
                    type: i0.Input
                }], onInit: [{
                    type: i0.Output
                }], templates: [{
                    type: i0.ContentChildren,
                    args: [api.PrimeTemplate]
                }], readonly: [{
                    type: i0.Input
                }] } });
    var EditorModule = /** @class */ (function () {
        function EditorModule() {
        }
        return EditorModule;
    }());
    EditorModule.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0__namespace, type: EditorModule, deps: [], target: i0__namespace.ɵɵFactoryTarget.NgModule });
    EditorModule.ɵmod = i0__namespace.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0__namespace, type: EditorModule, declarations: [Editor], imports: [i1.CommonModule], exports: [Editor, api.SharedModule] });
    EditorModule.ɵinj = i0__namespace.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0__namespace, type: EditorModule, imports: [[i1.CommonModule], api.SharedModule] });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0__namespace, type: EditorModule, decorators: [{
                type: i0.NgModule,
                args: [{
                        imports: [i1.CommonModule],
                        exports: [Editor, api.SharedModule],
                        declarations: [Editor]
                    }]
            }] });

    /**
     * Generated bundle index. Do not edit.
     */

    exports.EDITOR_VALUE_ACCESSOR = EDITOR_VALUE_ACCESSOR;
    exports.Editor = Editor;
    exports.EditorModule = EditorModule;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=primeng-editor.umd.js.map
