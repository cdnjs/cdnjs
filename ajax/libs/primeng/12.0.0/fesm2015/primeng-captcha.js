import * as i0 from '@angular/core';
import { EventEmitter, Component, ChangeDetectionStrategy, ViewEncapsulation, Input, Output, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

class Captcha {
    constructor(el, _zone, cd) {
        this.el = el;
        this._zone = _zone;
        this.cd = cd;
        this.siteKey = null;
        this.theme = 'light';
        this.type = 'image';
        this.size = 'normal';
        this.tabindex = 0;
        this.initCallback = "initRecaptcha";
        this.onResponse = new EventEmitter();
        this.onExpire = new EventEmitter();
        this._instance = null;
        this._language = null;
    }
    get language() {
        return this._language;
    }
    set language(language) {
        this._language = language;
        this.init();
    }
    ngAfterViewInit() {
        if (window.grecaptcha) {
            if (!window.grecaptcha.render) {
                setTimeout(() => {
                    this.init();
                }, 100);
            }
            else {
                this.init();
            }
        }
        else {
            window[this.initCallback] = () => {
                this.init();
            };
        }
    }
    init() {
        this._instance = window.grecaptcha.render(this.el.nativeElement.children[0], {
            'sitekey': this.siteKey,
            'theme': this.theme,
            'type': this.type,
            'size': this.size,
            'tabindex': this.tabindex,
            'hl': this.language,
            'callback': (response) => { this._zone.run(() => this.recaptchaCallback(response)); },
            'expired-callback': () => { this._zone.run(() => this.recaptchaExpiredCallback()); }
        });
    }
    reset() {
        if (this._instance === null)
            return;
        window.grecaptcha.reset(this._instance);
        this.cd.markForCheck();
    }
    getResponse() {
        if (this._instance === null)
            return null;
        return window.grecaptcha.getResponse(this._instance);
    }
    recaptchaCallback(response) {
        this.onResponse.emit({
            response: response
        });
    }
    recaptchaExpiredCallback() {
        this.onExpire.emit();
    }
    ngOnDestroy() {
        if (this._instance != null) {
            window.grecaptcha.reset(this._instance);
        }
    }
}
Captcha.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.0.4", ngImport: i0, type: Captcha, deps: [{ token: i0.ElementRef }, { token: i0.NgZone }, { token: i0.ChangeDetectorRef }], target: i0.ɵɵFactoryTarget.Component });
Captcha.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.0.4", type: Captcha, selector: "p-captcha", inputs: { siteKey: "siteKey", theme: "theme", type: "type", size: "size", tabindex: "tabindex", initCallback: "initCallback", language: "language" }, outputs: { onResponse: "onResponse", onExpire: "onExpire" }, ngImport: i0, template: `<div></div>`, isInline: true, changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.0.4", ngImport: i0, type: Captcha, decorators: [{
            type: Component,
            args: [{
                    selector: 'p-captcha',
                    template: `<div></div>`,
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    encapsulation: ViewEncapsulation.None
                }]
        }], ctorParameters: function () { return [{ type: i0.ElementRef }, { type: i0.NgZone }, { type: i0.ChangeDetectorRef }]; }, propDecorators: { siteKey: [{
                type: Input
            }], theme: [{
                type: Input
            }], type: [{
                type: Input
            }], size: [{
                type: Input
            }], tabindex: [{
                type: Input
            }], initCallback: [{
                type: Input
            }], onResponse: [{
                type: Output
            }], onExpire: [{
                type: Output
            }], language: [{
                type: Input
            }] } });
class CaptchaModule {
}
CaptchaModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.0.4", ngImport: i0, type: CaptchaModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
CaptchaModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.0.4", ngImport: i0, type: CaptchaModule, declarations: [Captcha], imports: [CommonModule], exports: [Captcha] });
CaptchaModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.0.4", ngImport: i0, type: CaptchaModule, imports: [[CommonModule]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.0.4", ngImport: i0, type: CaptchaModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule],
                    exports: [Captcha],
                    declarations: [Captcha]
                }]
        }] });

/**
 * Generated bundle index. Do not edit.
 */

export { Captcha, CaptchaModule };
//# sourceMappingURL=primeng-captcha.js.map
