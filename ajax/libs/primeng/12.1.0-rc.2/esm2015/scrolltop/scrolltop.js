import { NgModule, Component, ChangeDetectionStrategy, ViewEncapsulation, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { DomHandler } from 'primeng/dom';
import { ZIndexUtils } from 'primeng/utils';
import * as i0 from "@angular/core";
import * as i1 from "primeng/api";
import * as i2 from "@angular/common";
export class ScrollTop {
    constructor(el, cd, config) {
        this.el = el;
        this.cd = cd;
        this.config = config;
        this.target = "window";
        this.threshold = 400;
        this.icon = "pi pi-chevron-up";
        this.behavior = "smooth";
        this.showTransitionOptions = '.15s';
        this.hideTransitionOptions = '.15s';
        this.visible = false;
    }
    ngOnInit() {
        if (this.target === 'window')
            this.bindDocumentScrollListener();
        else if (this.target === 'parent')
            this.bindParentScrollListener();
    }
    onClick() {
        let scrollElement = this.target === 'window' ? window : this.el.nativeElement.parentElement;
        scrollElement.scroll({
            top: 0,
            behavior: this.behavior
        });
    }
    onEnter(event) {
        switch (event.toState) {
            case 'open':
                this.overlay = event.element;
                ZIndexUtils.set('overlay', this.overlay, this.config.zIndex.overlay);
                break;
            case 'void':
                this.overlay = null;
                break;
        }
    }
    onLeave(event) {
        switch (event.toState) {
            case 'void':
                ZIndexUtils.clear(event.element);
                break;
        }
    }
    checkVisibility(scrollY) {
        if (scrollY > this.threshold)
            this.visible = true;
        else
            this.visible = false;
        this.cd.markForCheck();
    }
    bindParentScrollListener() {
        this.scrollListener = () => {
            this.checkVisibility(this.el.nativeElement.parentElement.scrollTop);
        };
        this.el.nativeElement.parentElement.addEventListener('scroll', this.scrollListener);
    }
    bindDocumentScrollListener() {
        this.scrollListener = () => {
            this.checkVisibility(DomHandler.getWindowScrollTop());
        };
        window.addEventListener('scroll', this.scrollListener);
    }
    unbindParentScrollListener() {
        if (this.scrollListener) {
            this.el.nativeElement.parentElement.removeEventListener('scroll', this.scrollListener);
            this.scrollListener = null;
        }
    }
    unbindDocumentScrollListener() {
        if (this.scrollListener) {
            window.removeEventListener('scroll', this.scrollListener);
            this.scrollListener = null;
        }
    }
    containerClass() {
        return {
            'p-scrolltop p-link p-component': true,
            'p-scrolltop-sticky': this.target !== 'window'
        };
    }
    ngOnDestroy() {
        if (this.target === 'window')
            this.unbindDocumentScrollListener();
        else if (this.target === 'parent')
            this.unbindParentScrollListener();
        if (this.overlay) {
            ZIndexUtils.clear(this.overlay);
            this.overlay = null;
        }
    }
}
ScrollTop.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0, type: ScrollTop, deps: [{ token: i0.ElementRef }, { token: i0.ChangeDetectorRef }, { token: i1.PrimeNGConfig }], target: i0.ɵɵFactoryTarget.Component });
ScrollTop.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.0.5", type: ScrollTop, selector: "p-scrollTop", inputs: { styleClass: "styleClass", style: "style", target: "target", threshold: "threshold", icon: "icon", behavior: "behavior", showTransitionOptions: "showTransitionOptions", hideTransitionOptions: "hideTransitionOptions" }, ngImport: i0, template: `
        <button  *ngIf="visible" [@animation]="{value: 'open', params: {showTransitionParams: showTransitionOptions, hideTransitionParams: hideTransitionOptions}}" (@animation.start)="onEnter($event)" (@animation.done)="onLeave($event)"
            [ngClass]="containerClass()" (click)="onClick()" [class]="styleClass" [ngStyle]="style" type="button">
            <span [class]="icon" [ngClass]="'p-scrolltop-icon'"></span>
        </button>
    `, isInline: true, styles: [".p-scrolltop{position:fixed;bottom:20px;right:20px;display:flex;align-items:center;justify-content:center}.p-scrolltop-sticky{position:sticky}.p-scrolltop-sticky.p-link{margin-left:auto}"], directives: [{ type: i2.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i2.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { type: i2.NgStyle, selector: "[ngStyle]", inputs: ["ngStyle"] }], animations: [
        trigger('animation', [
            state('void', style({
                opacity: 0
            })),
            state('open', style({
                opacity: 1
            })),
            transition('void => open', animate('{{showTransitionParams}}')),
            transition('open => void', animate('{{hideTransitionParams}}')),
        ])
    ], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0, type: ScrollTop, decorators: [{
            type: Component,
            args: [{
                    selector: 'p-scrollTop',
                    template: `
        <button  *ngIf="visible" [@animation]="{value: 'open', params: {showTransitionParams: showTransitionOptions, hideTransitionParams: hideTransitionOptions}}" (@animation.start)="onEnter($event)" (@animation.done)="onLeave($event)"
            [ngClass]="containerClass()" (click)="onClick()" [class]="styleClass" [ngStyle]="style" type="button">
            <span [class]="icon" [ngClass]="'p-scrolltop-icon'"></span>
        </button>
    `,
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    encapsulation: ViewEncapsulation.None,
                    styleUrls: ['./scrolltop.css'],
                    animations: [
                        trigger('animation', [
                            state('void', style({
                                opacity: 0
                            })),
                            state('open', style({
                                opacity: 1
                            })),
                            transition('void => open', animate('{{showTransitionParams}}')),
                            transition('open => void', animate('{{hideTransitionParams}}')),
                        ])
                    ]
                }]
        }], ctorParameters: function () { return [{ type: i0.ElementRef }, { type: i0.ChangeDetectorRef }, { type: i1.PrimeNGConfig }]; }, propDecorators: { styleClass: [{
                type: Input
            }], style: [{
                type: Input
            }], target: [{
                type: Input
            }], threshold: [{
                type: Input
            }], icon: [{
                type: Input
            }], behavior: [{
                type: Input
            }], showTransitionOptions: [{
                type: Input
            }], hideTransitionOptions: [{
                type: Input
            }] } });
export class ScrollTopModule {
}
ScrollTopModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0, type: ScrollTopModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
ScrollTopModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0, type: ScrollTopModule, declarations: [ScrollTop], imports: [CommonModule], exports: [ScrollTop] });
ScrollTopModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0, type: ScrollTopModule, imports: [[CommonModule]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0, type: ScrollTopModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule],
                    exports: [ScrollTop],
                    declarations: [ScrollTop]
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2Nyb2xsdG9wLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2FwcC9jb21wb25lbnRzL3Njcm9sbHRvcC9zY3JvbGx0b3AudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFFBQVEsRUFBRSxTQUFTLEVBQUUsdUJBQXVCLEVBQUUsaUJBQWlCLEVBQUUsS0FBSyxFQUFtRCxNQUFNLGVBQWUsQ0FBQztBQUN4SixPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUFFLE9BQU8sRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLFVBQVUsRUFBRSxPQUFPLEVBQWtCLE1BQU0scUJBQXFCLENBQUM7QUFDakcsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGFBQWEsQ0FBQztBQUN6QyxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sZUFBZSxDQUFBOzs7O0FBMkIzQyxNQUFNLE9BQU8sU0FBUztJQXdCbEIsWUFBbUIsRUFBYyxFQUFVLEVBQXFCLEVBQVMsTUFBcUI7UUFBM0UsT0FBRSxHQUFGLEVBQUUsQ0FBWTtRQUFVLE9BQUUsR0FBRixFQUFFLENBQW1CO1FBQVMsV0FBTSxHQUFOLE1BQU0sQ0FBZTtRQWxCckYsV0FBTSxHQUFXLFFBQVEsQ0FBQztRQUUxQixjQUFTLEdBQVcsR0FBRyxDQUFDO1FBRXhCLFNBQUksR0FBVyxrQkFBa0IsQ0FBQztRQUVsQyxhQUFRLEdBQVcsUUFBUSxDQUFDO1FBRTVCLDBCQUFxQixHQUFXLE1BQU0sQ0FBQztRQUV2QywwQkFBcUIsR0FBVyxNQUFNLENBQUM7UUFJaEQsWUFBTyxHQUFZLEtBQUssQ0FBQztJQUl5RSxDQUFDO0lBRW5HLFFBQVE7UUFDSixJQUFJLElBQUksQ0FBQyxNQUFNLEtBQUssUUFBUTtZQUN4QixJQUFJLENBQUMsMEJBQTBCLEVBQUUsQ0FBQzthQUNqQyxJQUFJLElBQUksQ0FBQyxNQUFNLEtBQUssUUFBUTtZQUM3QixJQUFJ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QUMsQ0FBQzs0QkFDSCxLQUFLLENBQUMsTUFBTSxFQUFFLEtBQUssQ0FBQztnQ0FDaEIsT0FBTyxFQUFFLENBQUM7NkJBQ2IsQ0FBQyxDQUFDOzRCQUNILFVBQVUsQ0FBQyxjQUFjLEVBQUUsT0FBTyxDQUFDLDBCQUEwQixDQUFDLENBQUM7NEJBQy9ELFVBQVUsQ0FBQyxjQUFjLEVBQUUsT0FBTyxDQUFDLDBCQUEwQixDQUFDLENBQUM7eUJBQ2xFLENBQUM7cUJBQ0w7aUJBQ0o7NkpBR1ksVUFBVTtzQkFBbEIsS0FBSztnQkFFRyxLQUFLO3NCQUFiLEtBQUs7Z0JBRUcsTUFBTTtzQkFBZCxLQUFLO2dCQUVHLFNBQVM7c0JBQWpCLEtBQUs7Z0JBRUcsSUFBSTtzQkFBWixLQUFLO2dCQUVHLFFBQVE7c0JBQWhCLEtBQUs7Z0JBRUcscUJBQXFCO3NCQUE3QixLQUFLO2dCQUVHLHFCQUFxQjtzQkFBN0IsS0FBSzs7QUErR1YsTUFBTSxPQUFPLGVBQWU7OzRHQUFmLGVBQWU7NkdBQWYsZUFBZSxpQkEvSGYsU0FBUyxhQTJIUixZQUFZLGFBM0hiLFNBQVM7NkdBK0hULGVBQWUsWUFKZixDQUFDLFlBQVksQ0FBQzsyRkFJZCxlQUFlO2tCQUwzQixRQUFRO21CQUFDO29CQUNOLE9BQU8sRUFBRSxDQUFDLFlBQVksQ0FBQztvQkFDdkIsT0FBTyxFQUFFLENBQUMsU0FBUyxDQUFDO29CQUNwQixZQUFZLEVBQUUsQ0FBQyxTQUFTLENBQUM7aUJBQzVCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmdNb2R1bGUsIENvbXBvbmVudCwgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksIFZpZXdFbmNhcHN1bGF0aW9uLCBJbnB1dCwgT25Jbml0LCBPbkRlc3Ryb3ksIEVsZW1lbnRSZWYsIENoYW5nZURldGVjdG9yUmVmfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBhbmltYXRlLCBzdGF0ZSwgc3R5bGUsIHRyYW5zaXRpb24sIHRyaWdnZXIsIEFuaW1hdGlvbkV2ZW50IH0gZnJvbSAnQGFuZ3VsYXIvYW5pbWF0aW9ucyc7XG5pbXBvcnQgeyBEb21IYW5kbGVyIH0gZnJvbSAncHJpbWVuZy9kb20nO1xuaW1wb3J0IHsgWkluZGV4VXRpbHMgfSBmcm9tICdwcmltZW5nL3V0aWxzJ1xuaW1wb3J0IHsgUHJpbWVOR0NvbmZpZyB9IGZyb20gJ3ByaW1lbmcvYXBpJztcblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICdwLXNjcm9sbFRvcCcsXG4gICAgdGVtcGxhdGU6IGBcbiAgICAgICAgPGJ1dHRvbiAgKm5nSWY9XCJ2aXNpYmxlXCIgW0BhbmltYXRpb25dPVwie3ZhbHVlOiAnb3BlbicsIHBhcmFtczoge3Nob3dUcmFuc2l0aW9uUGFyYW1zOiBzaG93VHJhbnNpdGlvbk9wdGlvbnMsIGhpZGVUcmFuc2l0aW9uUGFyYW1zOiBoaWRlVHJhbnNpdGlvbk9wdGlvbnN9fVwiIChAYW5pbWF0aW9uLnN0YXJ0KT1cIm9uRW50ZXIoJGV2ZW50KVwiIChAYW5pbWF0aW9uLmRvbmUpPVwib25MZWF2ZSgkZXZlbnQpXCJcbiAgICAgICAgICAgIFtuZ0NsYXNzXT1cImNvbnRhaW5lckNsYXNzKClcIiAoY2xpY2spPVwib25DbGljaygpXCIgW2NsYXNzXT1cInN0eWxlQ2xhc3NcIiBbbmdTdHlsZV09XCJzdHlsZVwiIHR5cGU9XCJidXR0b25cIj5cbiAgICAgICAgICAgIDxzcGFuIFtjbGFzc109XCJpY29uXCIgW25nQ2xhc3NdPVwiJ3Atc2Nyb2xsdG9wLWljb24nXCI+PC9zcGFuPlxuICAgICAgICA8L2J1dHRvbj5cbiAgICBgLFxuICAgIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxuICAgIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmUsXG4gICAgc3R5bGVVcmxzOiBbJy4vc2Nyb2xsdG9wLmNzcyddLFxuICAgIGFuaW1hdGlvbnM6IFtcbiAgICAgICAgdHJpZ2dlcignYW5pbWF0aW9uJywgW1xuICAgICAgICAgICAgc3RhdGUoJ3ZvaWQnLCBzdHlsZSh7XG4gICAgICAgICAgICAgICAgb3BhY2l0eTogMFxuICAgICAgICAgICAgfSkpLFxuICAgICAgICAgICAgc3RhdGUoJ29wZW4nLCBzdHlsZSh7XG4gICAgICAgICAgICAgICAgb3BhY2l0eTogMVxuICAgICAgICAgICAgfSkpLFxuICAgICAgICAgICAgdHJhbnNpdGlvbigndm9pZCA9PiBvcGVuJywgYW5pbWF0ZSgne3tzaG93VHJhbnNpdGlvblBhcmFtc319JykpLFxuICAgICAgICAgICAgdHJhbnNpdGlvbignb3BlbiA9PiB2b2lkJywgYW5pbWF0ZSgne3toaWRlVHJhbnNpdGlvblBhcmFtc319JykpLFxuICAgICAgICBdKVxuICAgIF1cbn0pXG5leHBvcnQgY2xhc3MgU2Nyb2xsVG9wIGltcGxlbWVudHMgT25Jbml0LCBPbkRlc3Ryb3kge1xuXG4gICAgQElucHV0KCkgc3R5bGVDbGFzczogc3RyaW5nO1xuXG4gICAgQElucHV0KCkgc3R5bGU6IGFueTtcblxuICAgIEBJbnB1dCgpIHRhcmdldDogc3RyaW5nID0gXCJ3aW5kb3dcIjtcblxuICAgIEBJbnB1dCgpIHRocmVzaG9sZDogbnVtYmVyID0gNDAwO1xuXG4gICAgQElucHV0KCkgaWNvbjogc3RyaW5nID0gXCJwaSBwaS1jaGV2cm9uLXVwXCI7XG5cbiAgICBASW5wdXQoKSBiZWhhdmlvcjogc3RyaW5nID0gXCJzbW9vdGhcIjtcblxuICAgIEBJbnB1dCgpIHNob3dUcmFuc2l0aW9uT3B0aW9uczogc3RyaW5nID0gJy4xNXMnO1xuXG4gICAgQElucHV0KCkgaGlkZVRyYW5zaXRpb25PcHRpb25zOiBzdHJpbmcgPSAnLjE1cyc7XG5cbiAgICBzY3JvbGxMaXN0ZW5lcjogYW55O1xuXG4gICAgdmlzaWJsZTogYm9vbGVhbiA9IGZhbHNlO1xuXG4gICAgb3ZlcmxheTogYW55O1xuXG4gICAgY29uc3RydWN0b3IocHVibGljIGVsOiBFbGVtZW50UmVmLCBwcml2YXRlIGNkOiBDaGFuZ2VEZXRlY3RvclJlZiwgcHVibGljIGNvbmZpZzogUHJpbWVOR0NvbmZpZykgeyB9XG5cbiAgICBuZ09uSW5pdCgpIHtcbiAgICAgICAgaWYgKHRoaXMudGFyZ2V0ID09PSAnd2luZG93JylcbiAgICAgICAgICAgIHRoaXMuYmluZERvY3VtZW50U2Nyb2xsTGlzdGVuZXIoKTtcbiAgICAgICAgZWxzZSBpZiAodGhpcy50YXJnZXQgPT09ICdwYXJlbnQnKVxuICAgICAgICAgICAgdGhpcy5iaW5kUGFyZW50U2Nyb2xsTGlzdGVuZXIoKTtcbiAgICB9XG5cbiAgICBvbkNsaWNrKCkge1xuICAgICAgICBsZXQgc2Nyb2xsRWxlbWVudCA9IHRoaXMudGFyZ2V0ID09PSAnd2luZG93JyA/IHdpbmRvdyA6IHRoaXMuZWwubmF0aXZlRWxlbWVudC5wYXJlbnRFbGVtZW50O1xuICAgICAgICAgc2Nyb2xsRWxlbWVudC5zY3JvbGwoe1xuICAgICAgICAgICAgdG9wOiAwLFxuICAgICAgICAgICAgYmVoYXZpb3I6IHRoaXMuYmVoYXZpb3JcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgb25FbnRlcihldmVudDogQW5pbWF0aW9uRXZlbnQpIHtcblxuICAgICAgICBzd2l0Y2goZXZlbnQudG9TdGF0ZSkge1xuICAgICAgICAgICAgY2FzZSAnb3Blbic6XG4gICAgICAgICAgICAgICAgdGhpcy5vdmVybGF5ID0gZXZlbnQuZWxlbWVudDtcbiAgICAgICAgICAgICAgICBaSW5kZXhVdGlscy5zZXQoJ292ZXJsYXknLCB0aGlzLm92ZXJsYXksIHRoaXMuY29uZmlnLnpJbmRleC5vdmVybGF5KTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAndm9pZCc6XG4gICAgICAgICAgICAgICAgdGhpcy5vdmVybGF5ID0gbnVsbDtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgb25MZWF2ZShldmVudDogQW5pbWF0aW9uRXZlbnQpIHtcbiAgICAgICAgc3dpdGNoKGV2ZW50LnRvU3RhdGUpIHtcbiAgICAgICAgICAgIGNhc2UgJ3ZvaWQnOlxuICAgICAgICAgICAgICAgIFpJbmRleFV0aWxzLmNsZWFyKGV2ZW50LmVsZW1lbnQpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBjaGVja1Zpc2liaWxpdHkoc2Nyb2xsWSkge1xuICAgICAgICBpZiAoc2Nyb2xsWSA+IHRoaXMudGhyZXNob2xkKVxuICAgICAgICAgICAgdGhpcy52aXNpYmxlID0gdHJ1ZTtcbiAgICAgICAgZWxzZVxuICAgICAgICAgICAgdGhpcy52aXNpYmxlID0gZmFsc2U7XG5cbiAgICAgICAgdGhpcy5jZC5tYXJrRm9yQ2hlY2soKTtcbiAgICB9XG5cbiAgICBiaW5kUGFyZW50U2Nyb2xsTGlzdGVuZXIoKSB7XG4gICAgICAgIHRoaXMuc2Nyb2xsTGlzdGVuZXIgPSAoKSA9PiB7XG5cbiAgICAgICAgICAgIHRoaXMuY2hlY2tWaXNpYmlsaXR5KHRoaXMuZWwubmF0aXZlRWxlbWVudC5wYXJlbnRFbGVtZW50LnNjcm9sbFRvcCk7XG4gICAgICAgIH07XG5cbiAgICAgICAgdGhpcy5lbC5uYXRpdmVFbGVtZW50LnBhcmVudEVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignc2Nyb2xsJywgdGhpcy5zY3JvbGxMaXN0ZW5lcik7XG4gICAgfVxuXG4gICAgYmluZERvY3VtZW50U2Nyb2xsTGlzdGVuZXIoKSB7XG4gICAgICAgIHRoaXMuc2Nyb2xsTGlzdGVuZXIgPSAoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLmNoZWNrVmlzaWJpbGl0eShEb21IYW5kbGVyLmdldFdpbmRvd1Njcm9sbFRvcCgpKTtcbiAgICAgICAgfTtcblxuICAgICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignc2Nyb2xsJywgdGhpcy5zY3JvbGxMaXN0ZW5lcik7XG4gICAgfVxuXG4gICAgdW5iaW5kUGFyZW50U2Nyb2xsTGlzdGVuZXIoKSB7XG4gICAgICAgIGlmICh0aGlzLnNjcm9sbExpc3RlbmVyKSB7XG4gICAgICAgICAgICB0aGlzLmVsLm5hdGl2ZUVsZW1lbnQucGFyZW50RWxlbWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdzY3JvbGwnLCB0aGlzLnNjcm9sbExpc3RlbmVyKTtcbiAgICAgICAgICAgIHRoaXMuc2Nyb2xsTGlzdGVuZXIgPSBudWxsO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgdW5iaW5kRG9jdW1lbnRTY3JvbGxMaXN0ZW5lcigpIHtcbiAgICAgICAgaWYgKHRoaXMuc2Nyb2xsTGlzdGVuZXIpIHtcbiAgICAgICAgICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKCdzY3JvbGwnLCB0aGlzLnNjcm9sbExpc3RlbmVyKTtcbiAgICAgICAgICAgIHRoaXMuc2Nyb2xsTGlzdGVuZXIgPSBudWxsO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgY29udGFpbmVyQ2xhc3MoKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAncC1zY3JvbGx0b3AgcC1saW5rIHAtY29tcG9uZW50JzogdHJ1ZSxcbiAgICAgICAgICAgICdwLXNjcm9sbHRvcC1zdGlja3knOiB0aGlzLnRhcmdldCAhPT0gJ3dpbmRvdydcbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICBuZ09uRGVzdHJveSgpIHtcbiAgICAgICAgaWYgKHRoaXMudGFyZ2V0ID09PSAnd2luZG93JylcbiAgICAgICAgICAgIHRoaXMudW5iaW5kRG9jdW1lbnRTY3JvbGxMaXN0ZW5lcigpO1xuICAgICAgICBlbHNlIGlmICh0aGlzLnRhcmdldCA9PT0gJ3BhcmVudCcpXG4gICAgICAgICAgICB0aGlzLnVuYmluZFBhcmVudFNjcm9sbExpc3RlbmVyKCk7XG5cbiAgICAgICAgaWYgKHRoaXMub3ZlcmxheSkge1xuICAgICAgICAgICAgWkluZGV4VXRpbHMuY2xlYXIodGhpcy5vdmVybGF5KTtcbiAgICAgICAgICAgIHRoaXMub3ZlcmxheSA9IG51bGw7XG4gICAgICAgIH1cbiAgICB9XG59XG5cbkBOZ01vZHVsZSh7XG4gICAgaW1wb3J0czogW0NvbW1vbk1vZHVsZV0sXG4gICAgZXhwb3J0czogW1Njcm9sbFRvcF0sXG4gICAgZGVjbGFyYXRpb25zOiBbU2Nyb2xsVG9wXVxufSlcbmV4cG9ydCBjbGFzcyBTY3JvbGxUb3BNb2R1bGUgeyB9XG4iXX0=