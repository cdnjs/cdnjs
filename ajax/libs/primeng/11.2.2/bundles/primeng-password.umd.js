(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@angular/common'), require('primeng/dom')) :
    typeof define === 'function' && define.amd ? define('primeng/password', ['exports', '@angular/core', '@angular/common', 'primeng/dom'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory((global.primeng = global.primeng || {}, global.primeng.password = {}), global.ng.core, global.ng.common, global.primeng.dom));
}(this, (function (exports, core, common, dom) { 'use strict';

    var Password = /** @class */ (function () {
        function Password(el, zone) {
            this.el = el;
            this.zone = zone;
            this.promptLabel = 'Enter a password';
            this.weakLabel = 'Weak';
            this.mediumLabel = 'Medium';
            this.strongLabel = 'Strong';
            this.feedback = true;
        }
        Object.defineProperty(Password.prototype, "showPassword", {
            set: function (show) {
                this.el.nativeElement.type = show ? 'text' : 'password';
            },
            enumerable: false,
            configurable: true
        });
        Password.prototype.ngDoCheck = function () {
            this.updateFilledState();
        };
        Password.prototype.onInput = function (e) {
            this.updateFilledState();
        };
        Password.prototype.updateFilledState = function () {
            this.filled = this.el.nativeElement.value && this.el.nativeElement.value.length;
        };
        Password.prototype.createPanel = function () {
            this.panel = document.createElement('div');
            this.panel.className = 'p-password-panel p-component p-password-panel-overlay p-connected-overlay';
            this.meter = document.createElement('div');
            this.meter.className = 'p-password-meter';
            this.info = document.createElement('div');
            this.info.className = 'p-password-info';
            this.info.textContent = this.promptLabel;
            this.panel.appendChild(this.meter);
            this.panel.appendChild(this.info);
            this.panel.style.minWidth = dom.DomHandler.getOuterWidth(this.el.nativeElement) + 'px';
            document.body.appendChild(this.panel);
        };
        Password.prototype.showOverlay = function () {
            var _this = this;
            if (this.feedback) {
                if (!this.panel) {
                    this.createPanel();
                }
                this.panel.style.zIndex = String(++dom.DomHandler.zindex);
                this.panel.style.display = 'block';
                this.zone.runOutsideAngular(function () {
                    setTimeout(function () {
                        dom.DomHandler.addClass(_this.panel, 'p-connected-overlay-visible');
                        _this.bindScrollListener();
                        _this.bindDocumentResizeListener();
                    }, 1);
                });
                dom.DomHandler.absolutePosition(this.panel, this.el.nativeElement);
            }
        };
        Password.prototype.hideOverlay = function () {
            var _this = this;
            if (this.feedback && this.panel) {
                dom.DomHandler.addClass(this.panel, 'p-connected-overlay-hidden');
                dom.DomHandler.removeClass(this.panel, 'p-connected-overlay-visible');
                this.unbindScrollListener();
                this.unbindDocumentResizeListener();
                this.zone.runOutsideAngular(function () {
                    setTimeout(function () {
                        _this.ngOnDestroy();
                    }, 150);
                });
            }
        };
        Password.prototype.onFocus = function () {
            this.showOverlay();
        };
        Password.prototype.onBlur = function () {
            this.hideOverlay();
        };
        Password.prototype.onKeyup = function (e) {
            if (this.feedback) {
                var value = e.target.value, label = null, meterPos = null;
                if (value.length === 0) {
                    label = this.promptLabel;
                    meterPos = '0px 0px';
                }
                else {
                    var score = this.testStrength(value);
                    if (score < 30) {
                        label = this.weakLabel;
                        meterPos = '0px -10px';
                    }
                    else if (score >= 30 && score < 80) {
                        label = this.mediumLabel;
                        meterPos = '0px -20px';
                    }
                    else if (score >= 80) {
                        label = this.strongLabel;
                        meterPos = '0px -30px';
                    }
                }
                if (!this.panel || !dom.DomHandler.hasClass(this.panel, 'p-connected-overlay-visible')) {
                    this.showOverlay();
                }
                this.meter.style.backgroundPosition = meterPos;
                this.info.textContent = label;
            }
        };
        Password.prototype.testStrength = function (str) {
            var grade = 0;
            var val;
            val = str.match('[0-9]');
            grade += this.normalize(val ? val.length : 1 / 4, 1) * 25;
            val = str.match('[a-zA-Z]');
            grade += this.normalize(val ? val.length : 1 / 2, 3) * 10;
            val = str.match('[!@#$%^&*?_~.,;=]');
            grade += this.normalize(val ? val.length : 1 / 6, 1) * 35;
            val = str.match('[A-Z]');
            grade += this.normalize(val ? val.length : 1 / 6, 1) * 30;
            grade *= str.length / 8;
            return grade > 100 ? 100 : grade;
        };
        Password.prototype.normalize = function (x, y) {
            var diff = x - y;
            if (diff <= 0)
                return x / y;
            else
                return 1 + 0.5 * (x / (x + y / 4));
        };
        Object.defineProperty(Password.prototype, "disabled", {
            get: function () {
                return this.el.nativeElement.disabled;
            },
            enumerable: false,
            configurable: true
        });
        Password.prototype.bindScrollListener = function () {
            var _this = this;
            if (!this.scrollHandler) {
                this.scrollHandler = new dom.ConnectedOverlayScrollHandler(this.el.nativeElement, function () {
                    if (dom.DomHandler.hasClass(_this.panel, 'p-connected-overlay-visible')) {
                        _this.hideOverlay();
                    }
                });
            }
            this.scrollHandler.bindScrollListener();
        };
        Password.prototype.unbindScrollListener = function () {
            if (this.scrollHandler) {
                this.scrollHandler.unbindScrollListener();
            }
        };
        Password.prototype.bindDocumentResizeListener = function () {
            this.documentResizeListener = this.onWindowResize.bind(this);
            window.addEventListener('resize', this.documentResizeListener);
        };
        Password.prototype.unbindDocumentResizeListener = function () {
            if (this.documentResizeListener) {
                window.removeEventListener('resize', this.documentResizeListener);
                this.documentResizeListener = null;
            }
        };
        Password.prototype.onWindowResize = function () {
            this.hideOverlay();
        };
        Password.prototype.ngOnDestroy = function () {
            if (this.panel) {
                if (this.scrollHandler) {
                    this.scrollHandler.destroy();
                    this.scrollHandler = null;
                }
                this.unbindDocumentResizeListener();
                document.body.removeChild(this.panel);
                this.panel = null;
                this.meter = null;
                this.info = null;
            }
        };
        return Password;
    }());
    Password.decorators = [
        { type: core.Directive, args: [{
                    selector: '[pPassword]',
                    host: {
                        '[class.p-inputtext]': 'true',
                        '[class.p-component]': 'true',
                        '[class.p-filled]': 'filled'
                    }
                },] }
    ];
    Password.ctorParameters = function () { return [
        { type: core.ElementRef },
        { type: core.NgZone }
    ]; };
    Password.propDecorators = {
        promptLabel: [{ type: core.Input }],
        weakLabel: [{ type: core.Input }],
        mediumLabel: [{ type: core.Input }],
        strongLabel: [{ type: core.Input }],
        feedback: [{ type: core.Input }],
        showPassword: [{ type: core.Input }],
        onInput: [{ type: core.HostListener, args: ['input', ['$event'],] }],
        onFocus: [{ type: core.HostListener, args: ['focus',] }],
        onBlur: [{ type: core.HostListener, args: ['blur',] }],
        onKeyup: [{ type: core.HostListener, args: ['keyup', ['$event'],] }]
    };
    var PasswordModule = /** @class */ (function () {
        function PasswordModule() {
        }
        return PasswordModule;
    }());
    PasswordModule.decorators = [
        { type: core.NgModule, args: [{
                    imports: [common.CommonModule],
                    exports: [Password],
                    declarations: [Password]
                },] }
    ];

    /**
     * Generated bundle index. Do not edit.
     */

    exports.Password = Password;
    exports.PasswordModule = PasswordModule;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=primeng-password.umd.js.map
