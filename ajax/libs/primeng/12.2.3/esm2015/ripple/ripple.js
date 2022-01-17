import { NgModule, Directive, Optional } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DomHandler } from 'primeng/dom';
import * as i0 from "@angular/core";
import * as i1 from "primeng/api";
export class Ripple {
    constructor(el, zone, config) {
        this.el = el;
        this.zone = zone;
        this.config = config;
    }
    ngAfterViewInit() {
        if (this.config && this.config.ripple) {
            this.zone.runOutsideAngular(() => {
                this.create();
                this.mouseDownListener = this.onMouseDown.bind(this);
                this.el.nativeElement.addEventListener('mousedown', this.mouseDownListener);
            });
        }
    }
    onMouseDown(event) {
        let ink = this.getInk();
        if (!ink || getComputedStyle(ink, null).display === 'none') {
            return;
        }
        DomHandler.removeClass(ink, 'p-ink-active');
        if (!DomHandler.getHeight(ink) && !DomHandler.getWidth(ink)) {
            let d = Math.max(DomHandler.getOuterWidth(this.el.nativeElement), DomHandler.getOuterHeight(this.el.nativeElement));
            ink.style.height = d + 'px';
            ink.style.width = d + 'px';
        }
        let offset = DomHandler.getOffset(this.el.nativeElement);
        let x = event.pageX - offset.left + document.body.scrollTop - DomHandler.getWidth(ink) / 2;
        let y = event.pageY - offset.top + document.body.scrollLeft - DomHandler.getHeight(ink) / 2;
        ink.style.top = y + 'px';
        ink.style.left = x + 'px';
        DomHandler.addClass(ink, 'p-ink-active');
    }
    getInk() {
        for (let i = 0; i < this.el.nativeElement.children.length; i++) {
            if (this.el.nativeElement.children[i].className.indexOf('p-ink') !== -1) {
                return this.el.nativeElement.children[i];
            }
        }
        return null;
    }
    resetInk() {
        let ink = this.getInk();
        if (ink) {
            DomHandler.removeClass(ink, 'p-ink-active');
        }
    }
    onAnimationEnd(event) {
        DomHandler.removeClass(event.currentTarget, 'p-ink-active');
    }
    create() {
        let ink = document.createElement('span');
        ink.className = 'p-ink';
        this.el.nativeElement.appendChild(ink);
        this.animationListener = this.onAnimationEnd.bind(this);
        ink.addEventListener('animationend', this.animationListener);
    }
    remove() {
        let ink = this.getInk();
        if (ink) {
            this.el.nativeElement.removeEventListener('mousedown', this.mouseDownListener);
            ink.removeEventListener('animationend', this.animationListener);
            DomHandler.removeElement(ink);
        }
    }
    ngOnDestroy() {
        if (this.config && this.config.ripple) {
            this.remove();
        }
    }
}
Ripple.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0, type: Ripple, deps: [{ token: i0.ElementRef }, { token: i0.NgZone }, { token: i1.PrimeNGConfig, optional: true }], target: i0.ɵɵFactoryTarget.Directive });
Ripple.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "12.0.5", type: Ripple, selector: "[pRipple]", host: { classAttribute: "p-ripple p-element" }, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0, type: Ripple, decorators: [{
            type: Directive,
            args: [{
                    selector: '[pRipple]',
                    host: {
                        'class': 'p-ripple p-element'
                    }
                }]
        }], ctorParameters: function () { return [{ type: i0.ElementRef }, { type: i0.NgZone }, { type: i1.PrimeNGConfig, decorators: [{
                    type: Optional
                }] }]; } });
export class RippleModule {
}
RippleModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0, type: RippleModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
RippleModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0, type: RippleModule, declarations: [Ripple], imports: [CommonModule], exports: [Ripple] });
RippleModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0, type: RippleModule, imports: [[CommonModule]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0, type: RippleModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule],
                    exports: [Ripple],
                    declarations: [Ripple]
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmlwcGxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2FwcC9jb21wb25lbnRzL3JpcHBsZS9yaXBwbGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFFBQVEsRUFBRSxTQUFTLEVBQWdELFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUM1RyxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGFBQWEsQ0FBQzs7O0FBU3pDLE1BQU0sT0FBTyxNQUFNO0lBRWYsWUFBbUIsRUFBYyxFQUFTLElBQVksRUFBcUIsTUFBcUI7UUFBN0UsT0FBRSxHQUFGLEVBQUUsQ0FBWTtRQUFTLFNBQUksR0FBSixJQUFJLENBQVE7UUFBcUIsV0FBTSxHQUFOLE1BQU0sQ0FBZTtJQUFJLENBQUM7SUFNckcsZUFBZTtRQUNYLElBQUksSUFBSSxDQUFDLE1BQU0sSUFBSSxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sRUFBRTtZQUNuQyxJQUFJLENBQUMsSUFBSSxDQUFDLGlCQUFpQixDQUFDLEdBQUcsRUFBRTtnQkFDN0IsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDO2dCQUVkLElBQUksQ0FBQyxpQkFBaUIsR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztnQkFDckQsSUFBSSxDQUFDLEVBQUUsQ0FBQyxhQUFhLENBQUMsZ0JBQWdCLENBQUMsV0FBVyxFQUFFLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDO1lBQ2hGLENBQUMsQ0FBQyxDQUFDO1NBQ047SUFDTCxDQUFDO0lBRUQsV0FBVyxDQUFDLEtBQWlCO1FBQ3pCLElBQUksR0FBRyxHQUFHLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQztRQUN4QixJQUFJLENBQUMsR0FBRyxJQUFJLGdCQUFnQixDQUFDLEdBQUcsRUFBRSxJQUFJLENBQUMsQ0FBQyxP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ZXdJbml0LCBFbGVtZW50UmVmLCBOZ1pvbmUsIE9uRGVzdHJveSwgT3B0aW9uYWwgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBEb21IYW5kbGVyIH0gZnJvbSAncHJpbWVuZy9kb20nO1xuaW1wb3J0IHsgUHJpbWVOR0NvbmZpZyB9IGZyb20gJ3ByaW1lbmcvYXBpJztcblxuQERpcmVjdGl2ZSh7XG4gICAgc2VsZWN0b3I6ICdbcFJpcHBsZV0nLFxuICAgIGhvc3Q6IHtcbiAgICAgICAgJ2NsYXNzJzogJ3AtcmlwcGxlIHAtZWxlbWVudCdcbiAgICB9XG59KVxuZXhwb3J0IGNsYXNzIFJpcHBsZSBpbXBsZW1lbnRzIEFmdGVyVmlld0luaXQsIE9uRGVzdHJveSB7XG5cbiAgICBjb25zdHJ1Y3RvcihwdWJsaWMgZWw6IEVsZW1lbnRSZWYsIHB1YmxpYyB6b25lOiBOZ1pvbmUsIEBPcHRpb25hbCgpIHB1YmxpYyBjb25maWc6IFByaW1lTkdDb25maWcpIHsgfVxuXG4gICAgYW5pbWF0aW9uTGlzdGVuZXI6IGFueTtcblxuICAgIG1vdXNlRG93bkxpc3RlbmVyOiBhbnk7XG5cbiAgICBuZ0FmdGVyVmlld0luaXQoKSB7XG4gICAgICAgIGlmICh0aGlzLmNvbmZpZyAmJiB0aGlzLmNvbmZpZy5yaXBwbGUpIHtcbiAgICAgICAgICAgIHRoaXMuem9uZS5ydW5PdXRzaWRlQW5ndWxhcigoKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5jcmVhdGUoKTtcblxuICAgICAgICAgICAgICAgIHRoaXMubW91c2VEb3duTGlzdGVuZXIgPSB0aGlzLm9uTW91c2VEb3duLmJpbmQodGhpcyk7XG4gICAgICAgICAgICAgICAgdGhpcy5lbC5uYXRpdmVFbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlZG93bicsIHRoaXMubW91c2VEb3duTGlzdGVuZXIpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBvbk1vdXNlRG93bihldmVudDogTW91c2VFdmVudCkge1xuICAgICAgICBsZXQgaW5rID0gdGhpcy5nZXRJbmsoKTtcbiAgICAgICAgaWYgKCFpbmsgfHwgZ2V0Q29tcHV0ZWRTdHlsZShpbmssIG51bGwpLmRpc3BsYXkgPT09ICdub25lJykge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgRG9tSGFuZGxlci5yZW1vdmVDbGFzcyhpbmssICdwLWluay1hY3RpdmUnKTtcbiAgICAgICAgaWYgKCFEb21IYW5kbGVyLmdldEhlaWdodChpbmspICYmICFEb21IYW5kbGVyLmdldFdpZHRoKGluaykpIHtcbiAgICAgICAgICAgIGxldCBkID0gTWF0aC5tYXgoRG9tSGFuZGxlci5nZXRPdXRlcldpZHRoKHRoaXMuZWwubmF0aXZlRWxlbWVudCksIERvbUhhbmRsZXIuZ2V0T3V0ZXJIZWlnaHQodGhpcy5lbC5uYXRpdmVFbGVtZW50KSk7XG4gICAgICAgICAgICBpbmsuc3R5bGUuaGVpZ2h0ID0gZCArICdweCc7XG4gICAgICAgICAgICBpbmsuc3R5bGUud2lkdGggPSBkICsgJ3B4JztcbiAgICAgICAgfVxuXG4gICAgICAgIGxldCBvZmZzZXQgPSBEb21IYW5kbGVyLmdldE9mZnNldCh0aGlzLmVsLm5hdGl2ZUVsZW1lbnQpO1xuICAgICAgICBsZXQgeCA9IGV2ZW50LnBhZ2VYIC0gb2Zmc2V0LmxlZnQgKyBkb2N1bWVudC5ib2R5LnNjcm9sbFRvcCAtIERvbUhhbmRsZXIuZ2V0V2lkdGgoaW5rKSAvIDI7XG4gICAgICAgIGxldCB5ID0gZXZlbnQucGFnZVkgLSBvZmZzZXQudG9wICsgZG9jdW1lbnQuYm9keS5zY3JvbGxMZWZ0IC0gRG9tSGFuZGxlci5nZXRIZWlnaHQoaW5rKSAvIDI7XG5cbiAgICAgICAgaW5rLnN0eWxlLnRvcCA9IHkgKyAncHgnO1xuICAgICAgICBpbmsuc3R5bGUubGVmdCA9IHggKyAncHgnO1xuICAgICAgICBEb21IYW5kbGVyLmFkZENsYXNzKGluaywgJ3AtaW5rLWFjdGl2ZScpO1xuICAgIH1cblxuICAgIGdldEluaygpIHtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLmVsLm5hdGl2ZUVsZW1lbnQuY2hpbGRyZW4ubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGlmICh0aGlzLmVsLm5hdGl2ZUVsZW1lbnQuY2hpbGRyZW5baV0uY2xhc3NOYW1lLmluZGV4T2YoJ3AtaW5rJykgIT09IC0xKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuZWwubmF0aXZlRWxlbWVudC5jaGlsZHJlbltpXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG5cbiAgICByZXNldEluaygpIHtcbiAgICAgICAgbGV0IGluayA9IHRoaXMuZ2V0SW5rKCk7XG4gICAgICAgIGlmIChpbmspIHtcbiAgICAgICAgICAgIERvbUhhbmRsZXIucmVtb3ZlQ2xhc3MoaW5rLCAncC1pbmstYWN0aXZlJyk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBvbkFuaW1hdGlvbkVuZChldmVudCkge1xuICAgICAgICBEb21IYW5kbGVyLnJlbW92ZUNsYXNzKGV2ZW50LmN1cnJlbnRUYXJnZXQsICdwLWluay1hY3RpdmUnKTtcbiAgICB9XG5cbiAgICBjcmVhdGUoKSB7XG4gICAgICAgIGxldCBpbmsgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJyk7XG4gICAgICAgIGluay5jbGFzc05hbWUgPSAncC1pbmsnO1xuICAgICAgICB0aGlzLmVsLm5hdGl2ZUVsZW1lbnQuYXBwZW5kQ2hpbGQoaW5rKTtcblxuICAgICAgICB0aGlzLmFuaW1hdGlvbkxpc3RlbmVyID0gdGhpcy5vbkFuaW1hdGlvbkVuZC5iaW5kKHRoaXMpO1xuICAgICAgICBpbmsuYWRkRXZlbnRMaXN0ZW5lcignYW5pbWF0aW9uZW5kJywgdGhpcy5hbmltYXRpb25MaXN0ZW5lcik7XG4gICAgfVxuXG4gICAgcmVtb3ZlKCkge1xuICAgICAgICBsZXQgaW5rID0gdGhpcy5nZXRJbmsoKTtcbiAgICAgICAgaWYgKGluaykge1xuICAgICAgICAgICAgdGhpcy5lbC5uYXRpdmVFbGVtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ21vdXNlZG93bicsIHRoaXMubW91c2VEb3duTGlzdGVuZXIpO1xuICAgICAgICAgICAgaW5rLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2FuaW1hdGlvbmVuZCcsIHRoaXMuYW5pbWF0aW9uTGlzdGVuZXIpO1xuICAgICAgICAgICAgRG9tSGFuZGxlci5yZW1vdmVFbGVtZW50KGluayk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBuZ09uRGVzdHJveSgpIHtcbiAgICAgICAgaWYgKHRoaXMuY29uZmlnICYmIHRoaXMuY29uZmlnLnJpcHBsZSkge1xuICAgICAgICAgICAgdGhpcy5yZW1vdmUoKTtcbiAgICAgICAgfVxuICAgIH1cbn1cblxuQE5nTW9kdWxlKHtcbiAgICBpbXBvcnRzOiBbQ29tbW9uTW9kdWxlXSxcbiAgICBleHBvcnRzOiBbUmlwcGxlXSxcbiAgICBkZWNsYXJhdGlvbnM6IFtSaXBwbGVdXG59KVxuZXhwb3J0IGNsYXNzIFJpcHBsZU1vZHVsZSB7IH1cbiJdfQ==