import { NgModule, Component, EventEmitter, Input, Output, ChangeDetectionStrategy, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import * as i0 from "@angular/core";
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
Captcha.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0, type: Captcha, deps: [{ token: i0.ElementRef }, { token: i0.NgZone }, { token: i0.ChangeDetectorRef }], target: i0.ɵɵFactoryTarget.Component });
Captcha.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.0.5", type: Captcha, selector: "p-captcha", inputs: { siteKey: "siteKey", theme: "theme", type: "type", size: "size", tabindex: "tabindex", initCallback: "initCallback", language: "language" }, outputs: { onResponse: "onResponse", onExpire: "onExpire" }, ngImport: i0, template: `<div></div>`, isInline: true, changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0, type: Captcha, decorators: [{
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
export class CaptchaModule {
}
CaptchaModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0, type: CaptchaModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
CaptchaModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0, type: CaptchaModule, declarations: [Captcha], imports: [CommonModule], exports: [Captcha] });
CaptchaModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0, type: CaptchaModule, imports: [[CommonModule]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0, type: CaptchaModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule],
                    exports: [Captcha],
                    declarations: [Captcha]
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FwdGNoYS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9hcHAvY29tcG9uZW50cy9jYXB0Y2hhL2NhcHRjaGEudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFDLFFBQVEsRUFBZSxTQUFTLEVBQUMsWUFBWSxFQUFDLEtBQUssRUFBa0IsTUFBTSxFQUFZLHVCQUF1QixFQUFFLGlCQUFpQixFQUFvQixNQUFNLGVBQWUsQ0FBQztBQUNuTCxPQUFPLEVBQUMsWUFBWSxFQUFDLE1BQU0saUJBQWlCLENBQUM7O0FBUTdDLE1BQU0sT0FBTyxPQUFPO0lBZ0NoQixZQUFtQixFQUFjLEVBQVMsS0FBYSxFQUFTLEVBQXFCO1FBQWxFLE9BQUUsR0FBRixFQUFFLENBQVk7UUFBUyxVQUFLLEdBQUwsS0FBSyxDQUFRO1FBQVMsT0FBRSxHQUFGLEVBQUUsQ0FBbUI7UUE5QjVFLFlBQU8sR0FBVyxJQUFJLENBQUM7UUFFdkIsVUFBSyxHQUFHLE9BQU8sQ0FBQztRQUVoQixTQUFJLEdBQUcsT0FBTyxDQUFDO1FBRWYsU0FBSSxHQUFHLFFBQVEsQ0FBQztRQUVoQixhQUFRLEdBQUcsQ0FBQyxDQUFDO1FBRWIsaUJBQVksR0FBRyxlQUFlLENBQUM7UUFFOUIsZUFBVSxHQUFzQixJQUFJLFlBQVksRUFBRSxDQUFDO1FBRW5ELGFBQVEsR0FBc0IsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQUVuRCxjQUFTLEdBQVEsSUFBSSxDQUFDO1FBRXRCLGNBQVMsR0FBUSxJQUFJLENBQUM7SUFZMEQsQ0FBQztJQVR6RixJQUFhLFFBQVE7UUFDakIsT0FBTyxJQUFJLENBQUMsU0FBUyxDQUFDO0lBQzFCLENBQUM7SUFFRCxJQUFJLFFBQVEsQ0FBQyxRQUFnQjtRQUN6QixJQUFJLENBQUMsU0FBUyxHQUFHLFFBQVEsQ0FBQztRQUMxQixJQUFJLENBQUMsSUFBSSxFQUFFLENBQUM7SUFDaEIsQ0FBQztJQUlELGVBQWU7UUFDWCxJQUFVLE1BQU8s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c0JBQWhCLEtBQUs7Z0JBRUcsWUFBWTtzQkFBcEIsS0FBSztnQkFFSSxVQUFVO3NCQUFuQixNQUFNO2dCQUVHLFFBQVE7c0JBQWpCLE1BQU07Z0JBT00sUUFBUTtzQkFBcEIsS0FBSzs7QUErRVYsTUFBTSxPQUFPLGFBQWE7OzBHQUFiLGFBQWE7MkdBQWIsYUFBYSxpQkF0R2IsT0FBTyxhQWtHTixZQUFZLGFBbEdiLE9BQU87MkdBc0dQLGFBQWEsWUFKYixDQUFDLFlBQVksQ0FBQzsyRkFJZCxhQUFhO2tCQUx6QixRQUFRO21CQUFDO29CQUNOLE9BQU8sRUFBRSxDQUFDLFlBQVksQ0FBQztvQkFDdkIsT0FBTyxFQUFFLENBQUMsT0FBTyxDQUFDO29CQUNsQixZQUFZLEVBQUUsQ0FBQyxPQUFPLENBQUM7aUJBQzFCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtOZ01vZHVsZSxBZnRlclZpZXdJbml0LENvbXBvbmVudCxFdmVudEVtaXR0ZXIsSW5wdXQsTmdab25lLE9uRGVzdHJveSxPdXRwdXQsRWxlbWVudFJlZixDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSwgVmlld0VuY2Fwc3VsYXRpb24sIENoYW5nZURldGVjdG9yUmVmfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7Q29tbW9uTW9kdWxlfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ3AtY2FwdGNoYScsXG4gICAgdGVtcGxhdGU6IGA8ZGl2PjwvZGl2PmAsXG4gICAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG4gICAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZVxufSlcbmV4cG9ydCBjbGFzcyBDYXB0Y2hhIGltcGxlbWVudHMgQWZ0ZXJWaWV3SW5pdCxPbkRlc3Ryb3kge1xuXG4gICAgQElucHV0KCkgc2l0ZUtleTogc3RyaW5nID0gbnVsbDtcbiAgICAgICAgXG4gICAgQElucHV0KCkgdGhlbWUgPSAnbGlnaHQnO1xuICAgIFxuICAgIEBJbnB1dCgpIHR5cGUgPSAnaW1hZ2UnO1xuICAgIFxuICAgIEBJbnB1dCgpIHNpemUgPSAnbm9ybWFsJztcbiAgICBcbiAgICBASW5wdXQoKSB0YWJpbmRleCA9IDA7XG4gICAgIFxuICAgIEBJbnB1dCgpIGluaXRDYWxsYmFjayA9IFwiaW5pdFJlY2FwdGNoYVwiO1xuICAgIFxuICAgIEBPdXRwdXQoKSBvblJlc3BvbnNlOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgICBcbiAgICBAT3V0cHV0KCkgb25FeHBpcmU6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICAgIFxuICAgIHByaXZhdGUgX2luc3RhbmNlOiBhbnkgPSBudWxsO1xuXG4gICAgcHJpdmF0ZSBfbGFuZ3VhZ2U6IGFueSA9IG51bGw7XG5cblxuICAgIEBJbnB1dCgpIGdldCBsYW5ndWFnZSgpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gdGhpcy5fbGFuZ3VhZ2U7XG4gICAgfVxuXG4gICAgc2V0IGxhbmd1YWdlKGxhbmd1YWdlOiBzdHJpbmcpIHtcbiAgICAgICAgdGhpcy5fbGFuZ3VhZ2UgPSBsYW5ndWFnZTtcbiAgICAgICAgdGhpcy5pbml0KCk7XG4gICAgfVxuXG4gICAgY29uc3RydWN0b3IocHVibGljIGVsOiBFbGVtZW50UmVmLCBwdWJsaWMgX3pvbmU6IE5nWm9uZSwgcHVibGljIGNkOiBDaGFuZ2VEZXRlY3RvclJlZikge31cbiAgICBcbiAgICBuZ0FmdGVyVmlld0luaXQoKSB7XG4gICAgICAgIGlmICgoPGFueT53aW5kb3cpLmdyZWNhcHRjaGEpIHtcbiAgICAgICAgICAgIGlmICghKDxhbnk+d2luZG93KS5ncmVjYXB0Y2hhLnJlbmRlcil7XG4gICAgICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PntcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5pbml0KCk7XG4gICAgICAgICAgICAgICAgfSwxMDApXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLmluaXQoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICg8YW55PndpbmRvdylbdGhpcy5pbml0Q2FsbGJhY2tdID0gKCkgPT4ge1xuICAgICAgICAgICAgICB0aGlzLmluaXQoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBcbiAgICB9XG4gICAgXG4gICAgaW5pdCgpwqB7XG4gICAgICAgIHRoaXMuX2luc3RhbmNlID0gKDxhbnk+d2luZG93KS5ncmVjYXB0Y2hhLnJlbmRlcih0aGlzLmVsLm5hdGl2ZUVsZW1lbnQuY2hpbGRyZW5bMF0sIHtcbiAgICAgICAgICAgICdzaXRla2V5JzogdGhpcy5zaXRlS2V5LFxuICAgICAgICAgICAgJ3RoZW1lJzogdGhpcy50aGVtZSxcbiAgICAgICAgICAgICd0eXBlJzogdGhpcy50eXBlLFxuICAgICAgICAgICAgJ3NpemUnOiB0aGlzLnNpemUsXG4gICAgICAgICAgICAndGFiaW5kZXgnOiB0aGlzLnRhYmluZGV4LFxuICAgICAgICAgICAgJ2hsJzogdGhpcy5sYW5ndWFnZSxcbiAgICAgICAgICAgICdjYWxsYmFjayc6IChyZXNwb25zZTogc3RyaW5nKSA9PiB7dGhpcy5fem9uZS5ydW4oKCkgPT4gdGhpcy5yZWNhcHRjaGFDYWxsYmFjayhyZXNwb25zZSkpfSxcbiAgICAgICAgICAgICdleHBpcmVkLWNhbGxiYWNrJzogKCkgPT4ge3RoaXMuX3pvbmUucnVuKCgpID0+IHRoaXMucmVjYXB0Y2hhRXhwaXJlZENhbGxiYWNrKCkpfVxuICAgICAgICB9KTtcbiAgICB9XG4gICAgXG4gICAgcmVzZXQoKSB7XG4gICAgICAgIGlmICh0aGlzLl9pbnN0YW5jZSA9PT0gbnVsbClcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgXG4gICAgICAgICg8YW55PndpbmRvdykuZ3JlY2FwdGNoYS5yZXNldCh0aGlzLl9pbnN0YW5jZSk7XG4gICAgICAgIHRoaXMuY2QubWFya0ZvckNoZWNrKCk7XG4gICAgfVxuICAgIFxuICAgIGdldFJlc3BvbnNlKCk6IFN0cmluZyB7XG4gICAgICAgIGlmICh0aGlzLl9pbnN0YW5jZSA9PT0gbnVsbClcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICBcbiAgICAgICAgcmV0dXJuICg8YW55PndpbmRvdykuZ3JlY2FwdGNoYS5nZXRSZXNwb25zZSh0aGlzLl9pbnN0YW5jZSk7XG4gICAgfVxuICAgIFxuICAgIHJlY2FwdGNoYUNhbGxiYWNrKHJlc3BvbnNlOiBzdHJpbmcpIHtcbiAgICAgICAgdGhpcy5vblJlc3BvbnNlLmVtaXQoe1xuICAgICAgICAgICAgcmVzcG9uc2U6IHJlc3BvbnNlXG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHJlY2FwdGNoYUV4cGlyZWRDYWxsYmFjaygpIHtcbiAgICAgICAgdGhpcy5vbkV4cGlyZS5lbWl0KCk7XG4gICAgfVxuICAgIFxuICAgIG5nT25EZXN0cm95KCkge1xuICAgICAgICBpZiAodGhpcy5faW5zdGFuY2UgIT0gbnVsbCkge1xuICAgICAgICAgICg8YW55PndpbmRvdykuZ3JlY2FwdGNoYS5yZXNldCh0aGlzLl9pbnN0YW5jZSk7XG4gICAgICAgIH1cbiAgICB9XG59XG5cbkBOZ01vZHVsZSh7XG4gICAgaW1wb3J0czogW0NvbW1vbk1vZHVsZV0sXG4gICAgZXhwb3J0czogW0NhcHRjaGFdLFxuICAgIGRlY2xhcmF0aW9uczogW0NhcHRjaGFdXG59KVxuZXhwb3J0IGNsYXNzIENhcHRjaGFNb2R1bGUgeyB9XG4iXX0=