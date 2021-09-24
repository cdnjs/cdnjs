(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@angular/forms'), require('@angular/common'), require('primeng/dom'), require('rxjs')) :
    typeof define === 'function' && define.amd ? define('primeng/terminal', ['exports', '@angular/core', '@angular/forms', '@angular/common', 'primeng/dom', 'rxjs'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory((global.primeng = global.primeng || {}, global.primeng.terminal = {}), global.ng.core, global.ng.forms, global.ng.common, global.primeng.dom, global.rxjs));
}(this, (function (exports, i0, i3, i2, dom, rxjs) { 'use strict';

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
    var i3__namespace = /*#__PURE__*/_interopNamespace(i3);
    var i2__namespace = /*#__PURE__*/_interopNamespace(i2);

    var TerminalService = /** @class */ (function () {
        function TerminalService() {
            this.commandSource = new rxjs.Subject();
            this.responseSource = new rxjs.Subject();
            this.commandHandler = this.commandSource.asObservable();
            this.responseHandler = this.responseSource.asObservable();
        }
        TerminalService.prototype.sendCommand = function (command) {
            if (command) {
                this.commandSource.next(command);
            }
        };
        TerminalService.prototype.sendResponse = function (response) {
            if (response) {
                this.responseSource.next(response);
            }
        };
        return TerminalService;
    }());
    TerminalService.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0__namespace, type: TerminalService, deps: [], target: i0__namespace.ɵɵFactoryTarget.Injectable });
    TerminalService.ɵprov = i0__namespace.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0__namespace, type: TerminalService });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0__namespace, type: TerminalService, decorators: [{
                type: i0.Injectable
            }] });

    var Terminal = /** @class */ (function () {
        function Terminal(el, terminalService, cd) {
            var _this = this;
            this.el = el;
            this.terminalService = terminalService;
            this.cd = cd;
            this.commands = [];
            this.subscription = terminalService.responseHandler.subscribe(function (response) {
                _this.commands[_this.commands.length - 1].response = response;
                _this.commandProcessed = true;
            });
        }
        Terminal.prototype.ngAfterViewInit = function () {
            this.container = dom.DomHandler.find(this.el.nativeElement, '.p-terminal')[0];
        };
        Terminal.prototype.ngAfterViewChecked = function () {
            if (this.commandProcessed) {
                this.container.scrollTop = this.container.scrollHeight;
                this.commandProcessed = false;
            }
        };
        Object.defineProperty(Terminal.prototype, "response", {
            set: function (value) {
                if (value) {
                    this.commands[this.commands.length - 1].response = value;
                    this.commandProcessed = true;
                }
            },
            enumerable: false,
            configurable: true
        });
        Terminal.prototype.handleCommand = function (event) {
            if (event.keyCode == 13) {
                this.commands.push({ text: this.command });
                this.terminalService.sendCommand(this.command);
                this.command = '';
            }
        };
        Terminal.prototype.focus = function (element) {
            element.focus();
        };
        Terminal.prototype.ngOnDestroy = function () {
            if (this.subscription) {
                this.subscription.unsubscribe();
            }
        };
        return Terminal;
    }());
    Terminal.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0__namespace, type: Terminal, deps: [{ token: i0__namespace.ElementRef }, { token: TerminalService }, { token: i0__namespace.ChangeDetectorRef }], target: i0__namespace.ɵɵFactoryTarget.Component });
    Terminal.ɵcmp = i0__namespace.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.0.5", type: Terminal, selector: "p-terminal", inputs: { welcomeMessage: "welcomeMessage", prompt: "prompt", style: "style", styleClass: "styleClass", response: "response" }, host: { classAttribute: "p-element" }, ngImport: i0__namespace, template: "\n        <div [ngClass]=\"'p-terminal p-component'\" [ngStyle]=\"style\" [class]=\"styleClass\" (click)=\"focus(in)\">\n            <div *ngIf=\"welcomeMessage\">{{welcomeMessage}}</div>\n            <div class=\"p-terminal-content\">\n                <div *ngFor=\"let command of commands\">\n                    <span class=\"p-terminal-prompt\">{{prompt}}</span>\n                    <span class=\"p-terminal-command\">{{command.text}}</span>\n                    <div class=\"p-terminal-response\">{{command.response}}</div>\n                </div>\n            </div>\n            <div class=\"p-terminal-prompt-container\">\n                <span class=\"p-terminal-content-prompt\">{{prompt}}</span>\n                <input #in type=\"text\" [(ngModel)]=\"command\" class=\"p-terminal-input\" autocomplete=\"off\" (keydown)=\"handleCommand($event)\" autofocus>\n            </div>\n        </div>\n    ", isInline: true, styles: [".p-terminal{height:18rem;overflow:auto}.p-terminal-prompt-container{display:flex;align-items:center}.p-terminal-input{flex:1 1 auto;border:0;background-color:transparent;color:inherit;padding:0;outline:0 none}.p-terminal-input::-ms-clear{display:none}"], directives: [{ type: i2__namespace.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { type: i2__namespace.NgStyle, selector: "[ngStyle]", inputs: ["ngStyle"] }, { type: i2__namespace.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i2__namespace.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { type: i3__namespace.DefaultValueAccessor, selector: "input:not([type=checkbox])[formControlName],textarea[formControlName],input:not([type=checkbox])[formControl],textarea[formControl],input:not([type=checkbox])[ngModel],textarea[ngModel],[ngDefaultControl]" }, { type: i3__namespace.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { type: i3__namespace.NgModel, selector: "[ngModel]:not([formControlName]):not([formControl])", inputs: ["name", "disabled", "ngModel", "ngModelOptions"], outputs: ["ngModelChange"], exportAs: ["ngModel"] }], changeDetection: i0__namespace.ChangeDetectionStrategy.OnPush, encapsulation: i0__namespace.ViewEncapsulation.None });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0__namespace, type: Terminal, decorators: [{
                type: i0.Component,
                args: [{
                        selector: 'p-terminal',
                        template: "\n        <div [ngClass]=\"'p-terminal p-component'\" [ngStyle]=\"style\" [class]=\"styleClass\" (click)=\"focus(in)\">\n            <div *ngIf=\"welcomeMessage\">{{welcomeMessage}}</div>\n            <div class=\"p-terminal-content\">\n                <div *ngFor=\"let command of commands\">\n                    <span class=\"p-terminal-prompt\">{{prompt}}</span>\n                    <span class=\"p-terminal-command\">{{command.text}}</span>\n                    <div class=\"p-terminal-response\">{{command.response}}</div>\n                </div>\n            </div>\n            <div class=\"p-terminal-prompt-container\">\n                <span class=\"p-terminal-content-prompt\">{{prompt}}</span>\n                <input #in type=\"text\" [(ngModel)]=\"command\" class=\"p-terminal-input\" autocomplete=\"off\" (keydown)=\"handleCommand($event)\" autofocus>\n            </div>\n        </div>\n    ",
                        changeDetection: i0.ChangeDetectionStrategy.OnPush,
                        encapsulation: i0.ViewEncapsulation.None,
                        styleUrls: ['./terminal.css'],
                        host: {
                            'class': 'p-element'
                        }
                    }]
            }], ctorParameters: function () { return [{ type: i0__namespace.ElementRef }, { type: TerminalService }, { type: i0__namespace.ChangeDetectorRef }]; }, propDecorators: { welcomeMessage: [{
                    type: i0.Input
                }], prompt: [{
                    type: i0.Input
                }], style: [{
                    type: i0.Input
                }], styleClass: [{
                    type: i0.Input
                }], response: [{
                    type: i0.Input
                }] } });
    var TerminalModule = /** @class */ (function () {
        function TerminalModule() {
        }
        return TerminalModule;
    }());
    TerminalModule.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0__namespace, type: TerminalModule, deps: [], target: i0__namespace.ɵɵFactoryTarget.NgModule });
    TerminalModule.ɵmod = i0__namespace.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0__namespace, type: TerminalModule, declarations: [Terminal], imports: [i2.CommonModule, i3.FormsModule], exports: [Terminal] });
    TerminalModule.ɵinj = i0__namespace.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0__namespace, type: TerminalModule, imports: [[i2.CommonModule, i3.FormsModule]] });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0__namespace, type: TerminalModule, decorators: [{
                type: i0.NgModule,
                args: [{
                        imports: [i2.CommonModule, i3.FormsModule],
                        exports: [Terminal],
                        declarations: [Terminal]
                    }]
            }] });

    /**
     * Generated bundle index. Do not edit.
     */

    exports.Terminal = Terminal;
    exports.TerminalModule = TerminalModule;
    exports.TerminalService = TerminalService;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=primeng-terminal.umd.js.map
