import { NgModule, Component, EventEmitter, Input, NgZone, Output, ElementRef, ChangeDetectionStrategy, ViewEncapsulation, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
export class Captcha {
    constructor(el, _zone, cd) {
        this.el = el;
        this._zone = _zone;
        this.cd = cd;
        this.siteKey = null;
        this.theme = 'light';
        this.type = 'image';
        this.size = 'normal';
        this.tabindex = 0;
        this.language = null;
        this.initCallback = "initRecaptcha";
        this.onResponse = new EventEmitter();
        this.onExpire = new EventEmitter();
        this._instance = null;
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
Captcha.decorators = [
    { type: Component, args: [{
                selector: 'p-captcha',
                template: `<div></div>`,
                changeDetection: ChangeDetectionStrategy.OnPush,
                encapsulation: ViewEncapsulation.None
            },] }
];
Captcha.ctorParameters = () => [
    { type: ElementRef },
    { type: NgZone },
    { type: ChangeDetectorRef }
];
Captcha.propDecorators = {
    siteKey: [{ type: Input }],
    theme: [{ type: Input }],
    type: [{ type: Input }],
    size: [{ type: Input }],
    tabindex: [{ type: Input }],
    language: [{ type: Input }],
    initCallback: [{ type: Input }],
    onResponse: [{ type: Output }],
    onExpire: [{ type: Output }]
};
export class CaptchaModule {
}
CaptchaModule.decorators = [
    { type: NgModule, args: [{
                imports: [CommonModule],
                exports: [Captcha],
                declarations: [Captcha]
            },] }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FwdGNoYS5qcyIsInNvdXJjZVJvb3QiOiIuLi8uLi8uLi9zcmMvYXBwL2NvbXBvbmVudHMvY2FwdGNoYS8iLCJzb3VyY2VzIjpbImNhcHRjaGEudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFDLFFBQVEsRUFBZSxTQUFTLEVBQUMsWUFBWSxFQUFDLEtBQUssRUFBQyxNQUFNLEVBQVcsTUFBTSxFQUFDLFVBQVUsRUFBQyx1QkFBdUIsRUFBRSxpQkFBaUIsRUFBRSxpQkFBaUIsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUNuTCxPQUFPLEVBQUMsWUFBWSxFQUFDLE1BQU0saUJBQWlCLENBQUM7QUFRN0MsTUFBTSxPQUFPLE9BQU87SUFzQmhCLFlBQW1CLEVBQWMsRUFBUyxLQUFhLEVBQVMsRUFBcUI7UUFBbEUsT0FBRSxHQUFGLEVBQUUsQ0FBWTtRQUFTLFVBQUssR0FBTCxLQUFLLENBQVE7UUFBUyxPQUFFLEdBQUYsRUFBRSxDQUFtQjtRQXBCNUUsWUFBTyxHQUFXLElBQUksQ0FBQztRQUV2QixVQUFLLEdBQUcsT0FBTyxDQUFDO1FBRWhCLFNBQUksR0FBRyxPQUFPLENBQUM7UUFFZixTQUFJLEdBQUcsUUFBUSxDQUFDO1FBRWhCLGFBQVEsR0FBRyxDQUFDLENBQUM7UUFFYixhQUFRLEdBQVcsSUFBSSxDQUFDO1FBRXhCLGlCQUFZLEdBQUcsZUFBZSxDQUFDO1FBRTlCLGVBQVUsR0FBc0IsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQUVuRCxhQUFRLEdBQXNCLElBQUksWUFBWSxFQUFFLENBQUM7UUFFbkQsY0FBUyxHQUFRLElBQUksQ0FBQztJQUUwRCxDQUFDO0lBRXpGLGVBQWU7UUFDWCxJQUFVLE1BQU8sQ0FBQyxVQUFVLEVBQUU7WUFDMUIsSUFBSSxDQUFPLE1BQU8sQ0FBQyxVQUFVLENBQUMsTUFBTSxFQUFDO2dCQUNqQyxVQUFVLENBQUMsR0FBRyxFQUFFO29CQUNaLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQztnQkFDaEIsQ0FBQyxF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QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7TmdNb2R1bGUsQWZ0ZXJWaWV3SW5pdCxDb21wb25lbnQsRXZlbnRFbWl0dGVyLElucHV0LE5nWm9uZSxPbkRlc3Ryb3ksT3V0cHV0LEVsZW1lbnRSZWYsQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksIFZpZXdFbmNhcHN1bGF0aW9uLCBDaGFuZ2VEZXRlY3RvclJlZn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge0NvbW1vbk1vZHVsZX0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICdwLWNhcHRjaGEnLFxuICAgIHRlbXBsYXRlOiBgPGRpdj48L2Rpdj5gLFxuICAgIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxuICAgIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmVcbn0pXG5leHBvcnQgY2xhc3MgQ2FwdGNoYSBpbXBsZW1lbnRzIEFmdGVyVmlld0luaXQsT25EZXN0cm95IHtcblxuICAgIEBJbnB1dCgpIHNpdGVLZXk6IHN0cmluZyA9IG51bGw7XG4gICAgICAgIFxuICAgIEBJbnB1dCgpIHRoZW1lID0gJ2xpZ2h0JztcbiAgICBcbiAgICBASW5wdXQoKSB0eXBlID0gJ2ltYWdlJztcbiAgICBcbiAgICBASW5wdXQoKSBzaXplID0gJ25vcm1hbCc7XG4gICAgXG4gICAgQElucHV0KCkgdGFiaW5kZXggPSAwO1xuICAgIFxuICAgIEBJbnB1dCgpIGxhbmd1YWdlOiBzdHJpbmcgPSBudWxsO1xuICAgICBcbiAgICBASW5wdXQoKSBpbml0Q2FsbGJhY2sgPSBcImluaXRSZWNhcHRjaGFcIjtcbiAgICBcbiAgICBAT3V0cHV0KCkgb25SZXNwb25zZTogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gICAgXG4gICAgQE91dHB1dCgpIG9uRXhwaXJlOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgICBcbiAgICBwcml2YXRlIF9pbnN0YW5jZTogYW55ID0gbnVsbDtcblxuICAgIGNvbnN0cnVjdG9yKHB1YmxpYyBlbDogRWxlbWVudFJlZiwgcHVibGljIF96b25lOiBOZ1pvbmUsIHB1YmxpYyBjZDogQ2hhbmdlRGV0ZWN0b3JSZWYpIHt9XG4gICAgXG4gICAgbmdBZnRlclZpZXdJbml0KCkge1xuICAgICAgICBpZiAoKDxhbnk+d2luZG93KS5ncmVjYXB0Y2hhKSB7XG4gICAgICAgICAgICBpZiAoISg8YW55PndpbmRvdykuZ3JlY2FwdGNoYS5yZW5kZXIpe1xuICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT57XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaW5pdCgpO1xuICAgICAgICAgICAgICAgIH0sMTAwKVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5pbml0KCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAoPGFueT53aW5kb3cpW3RoaXMuaW5pdENhbGxiYWNrXSA9ICgpID0+IHtcbiAgICAgICAgICAgICAgdGhpcy5pbml0KCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gXG4gICAgfVxuICAgIFxuICAgIGluaXQoKcKge1xuICAgICAgICB0aGlzLl9pbnN0YW5jZSA9ICg8YW55PndpbmRvdykuZ3JlY2FwdGNoYS5yZW5kZXIodGhpcy5lbC5uYXRpdmVFbGVtZW50LmNoaWxkcmVuWzBdLCB7XG4gICAgICAgICAgICAnc2l0ZWtleSc6IHRoaXMuc2l0ZUtleSxcbiAgICAgICAgICAgICd0aGVtZSc6IHRoaXMudGhlbWUsXG4gICAgICAgICAgICAndHlwZSc6IHRoaXMudHlwZSxcbiAgICAgICAgICAgICdzaXplJzogdGhpcy5zaXplLFxuICAgICAgICAgICAgJ3RhYmluZGV4JzogdGhpcy50YWJpbmRleCxcbiAgICAgICAgICAgICdobCc6IHRoaXMubGFuZ3VhZ2UsXG4gICAgICAgICAgICAnY2FsbGJhY2snOiAocmVzcG9uc2U6IHN0cmluZykgPT4ge3RoaXMuX3pvbmUucnVuKCgpID0+IHRoaXMucmVjYXB0Y2hhQ2FsbGJhY2socmVzcG9uc2UpKX0sXG4gICAgICAgICAgICAnZXhwaXJlZC1jYWxsYmFjayc6ICgpID0+IHt0aGlzLl96b25lLnJ1bigoKSA9PiB0aGlzLnJlY2FwdGNoYUV4cGlyZWRDYWxsYmFjaygpKX1cbiAgICAgICAgfSk7XG4gICAgfVxuICAgIFxuICAgIHJlc2V0KCkge1xuICAgICAgICBpZiAodGhpcy5faW5zdGFuY2UgPT09IG51bGwpXG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIFxuICAgICAgICAoPGFueT53aW5kb3cpLmdyZWNhcHRjaGEucmVzZXQodGhpcy5faW5zdGFuY2UpO1xuICAgICAgICB0aGlzLmNkLm1hcmtGb3JDaGVjaygpO1xuICAgIH1cbiAgICBcbiAgICBnZXRSZXNwb25zZSgpOiBTdHJpbmcge1xuICAgICAgICBpZiAodGhpcy5faW5zdGFuY2UgPT09IG51bGwpXG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgXG4gICAgICAgIHJldHVybiAoPGFueT53aW5kb3cpLmdyZWNhcHRjaGEuZ2V0UmVzcG9uc2UodGhpcy5faW5zdGFuY2UpO1xuICAgIH1cbiAgICBcbiAgICByZWNhcHRjaGFDYWxsYmFjayhyZXNwb25zZTogc3RyaW5nKSB7XG4gICAgICAgIHRoaXMub25SZXNwb25zZS5lbWl0KHtcbiAgICAgICAgICAgIHJlc3BvbnNlOiByZXNwb25zZVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICByZWNhcHRjaGFFeHBpcmVkQ2FsbGJhY2soKSB7XG4gICAgICAgIHRoaXMub25FeHBpcmUuZW1pdCgpO1xuICAgIH1cbiAgICBcbiAgICBuZ09uRGVzdHJveSgpIHtcbiAgICAgICAgaWYgKHRoaXMuX2luc3RhbmNlICE9IG51bGwpIHtcbiAgICAgICAgICAoPGFueT53aW5kb3cpLmdyZWNhcHRjaGEucmVzZXQodGhpcy5faW5zdGFuY2UpO1xuICAgICAgICB9XG4gICAgfVxufVxuXG5ATmdNb2R1bGUoe1xuICAgIGltcG9ydHM6IFtDb21tb25Nb2R1bGVdLFxuICAgIGV4cG9ydHM6IFtDYXB0Y2hhXSxcbiAgICBkZWNsYXJhdGlvbnM6IFtDYXB0Y2hhXVxufSlcbmV4cG9ydCBjbGFzcyBDYXB0Y2hhTW9kdWxlIHsgfVxuIl19