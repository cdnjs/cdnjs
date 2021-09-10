(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@angular/common')) :
    typeof define === 'function' && define.amd ? define('primeng/captcha', ['exports', '@angular/core', '@angular/common'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory((global.primeng = global.primeng || {}, global.primeng.captcha = {}), global.ng.core, global.ng.common));
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

    var Captcha = /** @class */ (function () {
        function Captcha(el, _zone, cd) {
            this.el = el;
            this._zone = _zone;
            this.cd = cd;
            this.siteKey = null;
            this.theme = 'light';
            this.type = 'image';
            this.size = 'normal';
            this.tabindex = 0;
            this.initCallback = "initRecaptcha";
            this.onResponse = new i0.EventEmitter();
            this.onExpire = new i0.EventEmitter();
            this._instance = null;
            this._language = null;
        }
        Object.defineProperty(Captcha.prototype, "language", {
            get: function () {
                return this._language;
            },
            set: function (language) {
                this._language = language;
                this.init();
            },
            enumerable: false,
            configurable: true
        });
        Captcha.prototype.ngAfterViewInit = function () {
            var _this = this;
            if (window.grecaptcha) {
                if (!window.grecaptcha.render) {
                    setTimeout(function () {
                        _this.init();
                    }, 100);
                }
                else {
                    this.init();
                }
            }
            else {
                window[this.initCallback] = function () {
                    _this.init();
                };
            }
        };
        Captcha.prototype.init = function () {
            var _this = this;
            this._instance = window.grecaptcha.render(this.el.nativeElement.children[0], {
                'sitekey': this.siteKey,
                'theme': this.theme,
                'type': this.type,
                'size': this.size,
                'tabindex': this.tabindex,
                'hl': this.language,
                'callback': function (response) { _this._zone.run(function () { return _this.recaptchaCallback(response); }); },
                'expired-callback': function () { _this._zone.run(function () { return _this.recaptchaExpiredCallback(); }); }
            });
        };
        Captcha.prototype.reset = function () {
            if (this._instance === null)
                return;
            window.grecaptcha.reset(this._instance);
            this.cd.markForCheck();
        };
        Captcha.prototype.getResponse = function () {
            if (this._instance === null)
                return null;
            return window.grecaptcha.getResponse(this._instance);
        };
        Captcha.prototype.recaptchaCallback = function (response) {
            this.onResponse.emit({
                response: response
            });
        };
        Captcha.prototype.recaptchaExpiredCallback = function () {
            this.onExpire.emit();
        };
        Captcha.prototype.ngOnDestroy = function () {
            if (this._instance != null) {
                window.grecaptcha.reset(this._instance);
            }
        };
        return Captcha;
    }());
    Captcha.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0__namespace, type: Captcha, deps: [{ token: i0__namespace.ElementRef }, { token: i0__namespace.NgZone }, { token: i0__namespace.ChangeDetectorRef }], target: i0__namespace.ɵɵFactoryTarget.Component });
    Captcha.ɵcmp = i0__namespace.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.0.5", type: Captcha, selector: "p-captcha", inputs: { siteKey: "siteKey", theme: "theme", type: "type", size: "size", tabindex: "tabindex", initCallback: "initCallback", language: "language" }, outputs: { onResponse: "onResponse", onExpire: "onExpire" }, host: { classAttribute: "p-element" }, ngImport: i0__namespace, template: "<div></div>", isInline: true, changeDetection: i0__namespace.ChangeDetectionStrategy.OnPush, encapsulation: i0__namespace.ViewEncapsulation.None });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0__namespace, type: Captcha, decorators: [{
                type: i0.Component,
                args: [{
                        selector: 'p-captcha',
                        template: "<div></div>",
                        changeDetection: i0.ChangeDetectionStrategy.OnPush,
                        encapsulation: i0.ViewEncapsulation.None,
                        host: {
                            'class': 'p-element'
                        }
                    }]
            }], ctorParameters: function () { return [{ type: i0__namespace.ElementRef }, { type: i0__namespace.NgZone }, { type: i0__namespace.ChangeDetectorRef }]; }, propDecorators: { siteKey: [{
                    type: i0.Input
                }], theme: [{
                    type: i0.Input
                }], type: [{
                    type: i0.Input
                }], size: [{
                    type: i0.Input
                }], tabindex: [{
                    type: i0.Input
                }], initCallback: [{
                    type: i0.Input
                }], onResponse: [{
                    type: i0.Output
                }], onExpire: [{
                    type: i0.Output
                }], language: [{
                    type: i0.Input
                }] } });
    var CaptchaModule = /** @class */ (function () {
        function CaptchaModule() {
        }
        return CaptchaModule;
    }());
    CaptchaModule.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0__namespace, type: CaptchaModule, deps: [], target: i0__namespace.ɵɵFactoryTarget.NgModule });
    CaptchaModule.ɵmod = i0__namespace.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0__namespace, type: CaptchaModule, declarations: [Captcha], imports: [common.CommonModule], exports: [Captcha] });
    CaptchaModule.ɵinj = i0__namespace.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0__namespace, type: CaptchaModule, imports: [[common.CommonModule]] });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0__namespace, type: CaptchaModule, decorators: [{
                type: i0.NgModule,
                args: [{
                        imports: [common.CommonModule],
                        exports: [Captcha],
                        declarations: [Captcha]
                    }]
            }] });

    /**
     * Generated bundle index. Do not edit.
     */

    exports.Captcha = Captcha;
    exports.CaptchaModule = CaptchaModule;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=primeng-captcha.umd.js.map
