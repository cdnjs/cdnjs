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
ScrollTop.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.0.5", type: ScrollTop, selector: "p-scrollTop", inputs: { styleClass: "styleClass", style: "style", target: "target", threshold: "threshold", icon: "icon", behavior: "behavior", showTransitionOptions: "showTransitionOptions", hideTransitionOptions: "hideTransitionOptions" }, host: { classAttribute: "p-element" }, ngImport: i0, template: `
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
                    ],
                    host: {
                        'class': 'p-element'
                    }
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2Nyb2xsdG9wLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2FwcC9jb21wb25lbnRzL3Njcm9sbHRvcC9zY3JvbGx0b3AudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFFBQVEsRUFBRSxTQUFTLEVBQUUsdUJBQXVCLEVBQUUsaUJBQWlCLEVBQUUsS0FBSyxFQUFtRCxNQUFNLGVBQWUsQ0FBQztBQUN4SixPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUFFLE9BQU8sRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLFVBQVUsRUFBRSxPQUFPLEVBQWtCLE1BQU0scUJBQXFCLENBQUM7QUFDakcsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGFBQWEsQ0FBQztBQUN6QyxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sZUFBZSxDQUFBOzs7O0FBOEIzQyxNQUFNLE9BQU8sU0FBUztJQXdCbEIsWUFBbUIsRUFBYyxFQUFVLEVBQXFCLEVBQVMsTUFBcUI7UUFBM0UsT0FBRSxHQUFGLEVBQUUsQ0FBWTtRQUFVLE9BQUUsR0FBRixFQUFFLENBQW1CO1FBQVMsV0FBTSxHQUFOLE1BQU0sQ0FBZTtRQWxCckYsV0FBTSxHQUFXLFFBQVEsQ0FBQztRQUUxQixjQUFTLEdBQVcsR0FBRyxDQUFDO1FBRXhCLFNBQUksR0FBVyxrQkFBa0IsQ0FBQztRQUVsQyxhQUFRLEdBQVcsUUFBUSxDQUFDO1FBRTVCLDBCQUFxQixHQUFXLE1BQU0sQ0FBQztRQUV2QywwQkFBcUIsR0FBVyxNQUFNLENBQUM7UUFJaEQsWUFBTyxHQUFZLEtBQUssQ0FBQztJQUl5RSxDQUFDO0lBRW5HLFFBQVE7UUFDSixJQUFJLElBQUksQ0FBQyxNQUFNLEtBQUssUUFBUTtZQUN4QixJQUFJLENBQUMsMEJBQTBCLEVBQUUsQ0FBQzthQUNqQyxJQUFJLElBQUksQ0FBQyxNQUFNLEtBQUssUUFBUTtZQUM3QixJQUFJ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QUMsQ0FBQzs0QkFDSCxLQUFLLENBQUMsTUFBTSxFQUFFLEtBQUssQ0FBQztnQ0FDaEIsT0FBTyxFQUFFLENBQUM7NkJBQ2IsQ0FBQyxDQUFDOzRCQUNILFVBQVUsQ0FBQyxjQUFjLEVBQUUsT0FBTyxDQUFDLDBCQUEwQixDQUFDLENBQUM7NEJBQy9ELFVBQVUsQ0FBQyxjQUFjLEVBQUUsT0FBTyxDQUFDLDBCQUEwQixDQUFDLENBQUM7eUJBQ2xFLENBQUM7cUJBQ0w7b0JBQ0QsSUFBSSxFQUFFO3dCQUNGLE9BQU8sRUFBRSxXQUFXO3FCQUN2QjtpQkFDSjs2SkFHWSxVQUFVO3NCQUFsQixLQUFLO2dCQUVHLEtBQUs7c0JBQWIsS0FBSztnQkFFRyxNQUFNO3NCQUFkLEtBQUs7Z0JBRUcsU0FBUztzQkFBakIsS0FBSztnQkFFRyxJQUFJO3NCQUFaLEtBQUs7Z0JBRUcsUUFBUTtzQkFBaEIsS0FBSztnQkFFRyxxQkFBcUI7c0JBQTdCLEtBQUs7Z0JBRUcscUJBQXFCO3NCQUE3QixLQUFLOztBQStHVixNQUFNLE9BQU8sZUFBZTs7NEdBQWYsZUFBZTs2R0FBZixlQUFlLGlCQS9IZixTQUFTLGFBMkhSLFlBQVksYUEzSGIsU0FBUzs2R0ErSFQsZUFBZSxZQUpmLENBQUMsWUFBWSxDQUFDOzJGQUlkLGVBQWU7a0JBTDNCLFFBQVE7bUJBQUM7b0JBQ04sT0FBTyxFQUFFLENBQUMsWUFBWSxDQUFDO29CQUN2QixPQUFPLEVBQUUsQ0FBQyxTQUFTLENBQUM7b0JBQ3BCLFlBQVksRUFBRSxDQUFDLFNBQVMsQ0FBQztpQkFDNUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBOZ01vZHVsZSwgQ29tcG9uZW50LCBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSwgVmlld0VuY2Fwc3VsYXRpb24sIElucHV0LCBPbkluaXQsIE9uRGVzdHJveSwgRWxlbWVudFJlZiwgQ2hhbmdlRGV0ZWN0b3JSZWZ9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IGFuaW1hdGUsIHN0YXRlLCBzdHlsZSwgdHJhbnNpdGlvbiwgdHJpZ2dlciwgQW5pbWF0aW9uRXZlbnQgfSBmcm9tICdAYW5ndWxhci9hbmltYXRpb25zJztcbmltcG9ydCB7IERvbUhhbmRsZXIgfSBmcm9tICdwcmltZW5nL2RvbSc7XG5pbXBvcnQgeyBaSW5kZXhVdGlscyB9IGZyb20gJ3ByaW1lbmcvdXRpbHMnXG5pbXBvcnQgeyBQcmltZU5HQ29uZmlnIH0gZnJvbSAncHJpbWVuZy9hcGknO1xuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ3Atc2Nyb2xsVG9wJyxcbiAgICB0ZW1wbGF0ZTogYFxuICAgICAgICA8YnV0dG9uICAqbmdJZj1cInZpc2libGVcIiBbQGFuaW1hdGlvbl09XCJ7dmFsdWU6ICdvcGVuJywgcGFyYW1zOiB7c2hvd1RyYW5zaXRpb25QYXJhbXM6IHNob3dUcmFuc2l0aW9uT3B0aW9ucywgaGlkZVRyYW5zaXRpb25QYXJhbXM6IGhpZGVUcmFuc2l0aW9uT3B0aW9uc319XCIgKEBhbmltYXRpb24uc3RhcnQpPVwib25FbnRlcigkZXZlbnQpXCIgKEBhbmltYXRpb24uZG9uZSk9XCJvbkxlYXZlKCRldmVudClcIlxuICAgICAgICAgICAgW25nQ2xhc3NdPVwiY29udGFpbmVyQ2xhc3MoKVwiIChjbGljayk9XCJvbkNsaWNrKClcIiBbY2xhc3NdPVwic3R5bGVDbGFzc1wiIFtuZ1N0eWxlXT1cInN0eWxlXCIgdHlwZT1cImJ1dHRvblwiPlxuICAgICAgICAgICAgPHNwYW4gW2NsYXNzXT1cImljb25cIiBbbmdDbGFzc109XCIncC1zY3JvbGx0b3AtaWNvbidcIj48L3NwYW4+XG4gICAgICAgIDwvYnV0dG9uPlxuICAgIGAsXG4gICAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG4gICAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZSxcbiAgICBzdHlsZVVybHM6IFsnLi9zY3JvbGx0b3AuY3NzJ10sXG4gICAgYW5pbWF0aW9uczogW1xuICAgICAgICB0cmlnZ2VyKCdhbmltYXRpb24nLCBbXG4gICAgICAgICAgICBzdGF0ZSgndm9pZCcsIHN0eWxlKHtcbiAgICAgICAgICAgICAgICBvcGFjaXR5OiAwXG4gICAgICAgICAgICB9KSksXG4gICAgICAgICAgICBzdGF0ZSgnb3BlbicsIHN0eWxlKHtcbiAgICAgICAgICAgICAgICBvcGFjaXR5OiAxXG4gICAgICAgICAgICB9KSksXG4gICAgICAgICAgICB0cmFuc2l0aW9uKCd2b2lkID0+IG9wZW4nLCBhbmltYXRlKCd7e3Nob3dUcmFuc2l0aW9uUGFyYW1zfX0nKSksXG4gICAgICAgICAgICB0cmFuc2l0aW9uKCdvcGVuID0+IHZvaWQnLCBhbmltYXRlKCd7e2hpZGVUcmFuc2l0aW9uUGFyYW1zfX0nKSksXG4gICAgICAgIF0pXG4gICAgXSxcbiAgICBob3N0OiB7XG4gICAgICAgICdjbGFzcyc6ICdwLWVsZW1lbnQnXG4gICAgfVxufSlcbmV4cG9ydCBjbGFzcyBTY3JvbGxUb3AgaW1wbGVtZW50cyBPbkluaXQsIE9uRGVzdHJveSB7XG5cbiAgICBASW5wdXQoKSBzdHlsZUNsYXNzOiBzdHJpbmc7XG5cbiAgICBASW5wdXQoKSBzdHlsZTogYW55O1xuXG4gICAgQElucHV0KCkgdGFyZ2V0OiBzdHJpbmcgPSBcIndpbmRvd1wiO1xuXG4gICAgQElucHV0KCkgdGhyZXNob2xkOiBudW1iZXIgPSA0MDA7XG5cbiAgICBASW5wdXQoKSBpY29uOiBzdHJpbmcgPSBcInBpIHBpLWNoZXZyb24tdXBcIjtcblxuICAgIEBJbnB1dCgpIGJlaGF2aW9yOiBzdHJpbmcgPSBcInNtb290aFwiO1xuXG4gICAgQElucHV0KCkgc2hvd1RyYW5zaXRpb25PcHRpb25zOiBzdHJpbmcgPSAnLjE1cyc7XG5cbiAgICBASW5wdXQoKSBoaWRlVHJhbnNpdGlvbk9wdGlvbnM6IHN0cmluZyA9ICcuMTVzJztcblxuICAgIHNjcm9sbExpc3RlbmVyOiBhbnk7XG5cbiAgICB2aXNpYmxlOiBib29sZWFuID0gZmFsc2U7XG5cbiAgICBvdmVybGF5OiBhbnk7XG5cbiAgICBjb25zdHJ1Y3RvcihwdWJsaWMgZWw6IEVsZW1lbnRSZWYsIHByaXZhdGUgY2Q6IENoYW5nZURldGVjdG9yUmVmLCBwdWJsaWMgY29uZmlnOiBQcmltZU5HQ29uZmlnKSB7IH1cblxuICAgIG5nT25Jbml0KCkge1xuICAgICAgICBpZiAodGhpcy50YXJnZXQgPT09ICd3aW5kb3cnKVxuICAgICAgICAgICAgdGhpcy5iaW5kRG9jdW1lbnRTY3JvbGxMaXN0ZW5lcigpO1xuICAgICAgICBlbHNlIGlmICh0aGlzLnRhcmdldCA9PT0gJ3BhcmVudCcpXG4gICAgICAgICAgICB0aGlzLmJpbmRQYXJlbnRTY3JvbGxMaXN0ZW5lcigpO1xuICAgIH1cblxuICAgIG9uQ2xpY2soKSB7XG4gICAgICAgIGxldCBzY3JvbGxFbGVtZW50ID0gdGhpcy50YXJnZXQgPT09ICd3aW5kb3cnID8gd2luZG93IDogdGhpcy5lbC5uYXRpdmVFbGVtZW50LnBhcmVudEVsZW1lbnQ7XG4gICAgICAgICBzY3JvbGxFbGVtZW50LnNjcm9sbCh7XG4gICAgICAgICAgICB0b3A6IDAsXG4gICAgICAgICAgICBiZWhhdmlvcjogdGhpcy5iZWhhdmlvclxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBvbkVudGVyKGV2ZW50OiBBbmltYXRpb25FdmVudCkge1xuXG4gICAgICAgIHN3aXRjaChldmVudC50b1N0YXRlKSB7XG4gICAgICAgICAgICBjYXNlICdvcGVuJzpcbiAgICAgICAgICAgICAgICB0aGlzLm92ZXJsYXkgPSBldmVudC5lbGVtZW50O1xuICAgICAgICAgICAgICAgIFpJbmRleFV0aWxzLnNldCgnb3ZlcmxheScsIHRoaXMub3ZlcmxheSwgdGhpcy5jb25maWcuekluZGV4Lm92ZXJsYXkpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlICd2b2lkJzpcbiAgICAgICAgICAgICAgICB0aGlzLm92ZXJsYXkgPSBudWxsO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBvbkxlYXZlKGV2ZW50OiBBbmltYXRpb25FdmVudCkge1xuICAgICAgICBzd2l0Y2goZXZlbnQudG9TdGF0ZSkge1xuICAgICAgICAgICAgY2FzZSAndm9pZCc6XG4gICAgICAgICAgICAgICAgWkluZGV4VXRpbHMuY2xlYXIoZXZlbnQuZWxlbWVudCk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGNoZWNrVmlzaWJpbGl0eShzY3JvbGxZKSB7XG4gICAgICAgIGlmIChzY3JvbGxZID4gdGhpcy50aHJlc2hvbGQpXG4gICAgICAgICAgICB0aGlzLnZpc2libGUgPSB0cnVlO1xuICAgICAgICBlbHNlXG4gICAgICAgICAgICB0aGlzLnZpc2libGUgPSBmYWxzZTtcblxuICAgICAgICB0aGlzLmNkLm1hcmtGb3JDaGVjaygpO1xuICAgIH1cblxuICAgIGJpbmRQYXJlbnRTY3JvbGxMaXN0ZW5lcigpIHtcbiAgICAgICAgdGhpcy5zY3JvbGxMaXN0ZW5lciA9ICgpID0+IHtcblxuICAgICAgICAgICAgdGhpcy5jaGVja1Zpc2liaWxpdHkodGhpcy5lbC5uYXRpdmVFbGVtZW50LnBhcmVudEVsZW1lbnQuc2Nyb2xsVG9wKTtcbiAgICAgICAgfTtcblxuICAgICAgICB0aGlzLmVsLm5hdGl2ZUVsZW1lbnQucGFyZW50RWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdzY3JvbGwnLCB0aGlzLnNjcm9sbExpc3RlbmVyKTtcbiAgICB9XG5cbiAgICBiaW5kRG9jdW1lbnRTY3JvbGxMaXN0ZW5lcigpIHtcbiAgICAgICAgdGhpcy5zY3JvbGxMaXN0ZW5lciA9ICgpID0+IHtcbiAgICAgICAgICAgIHRoaXMuY2hlY2tWaXNpYmlsaXR5KERvbUhhbmRsZXIuZ2V0V2luZG93U2Nyb2xsVG9wKCkpO1xuICAgICAgICB9O1xuXG4gICAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdzY3JvbGwnLCB0aGlzLnNjcm9sbExpc3RlbmVyKTtcbiAgICB9XG5cbiAgICB1bmJpbmRQYXJlbnRTY3JvbGxMaXN0ZW5lcigpIHtcbiAgICAgICAgaWYgKHRoaXMuc2Nyb2xsTGlzdGVuZXIpIHtcbiAgICAgICAgICAgIHRoaXMuZWwubmF0aXZlRWxlbWVudC5wYXJlbnRFbGVtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3Njcm9sbCcsIHRoaXMuc2Nyb2xsTGlzdGVuZXIpO1xuICAgICAgICAgICAgdGhpcy5zY3JvbGxMaXN0ZW5lciA9IG51bGw7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICB1bmJpbmREb2N1bWVudFNjcm9sbExpc3RlbmVyKCkge1xuICAgICAgICBpZiAodGhpcy5zY3JvbGxMaXN0ZW5lcikge1xuICAgICAgICAgICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3Njcm9sbCcsIHRoaXMuc2Nyb2xsTGlzdGVuZXIpO1xuICAgICAgICAgICAgdGhpcy5zY3JvbGxMaXN0ZW5lciA9IG51bGw7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBjb250YWluZXJDbGFzcygpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICdwLXNjcm9sbHRvcCBwLWxpbmsgcC1jb21wb25lbnQnOiB0cnVlLFxuICAgICAgICAgICAgJ3Atc2Nyb2xsdG9wLXN0aWNreSc6IHRoaXMudGFyZ2V0ICE9PSAnd2luZG93J1xuICAgICAgICB9O1xuICAgIH1cblxuICAgIG5nT25EZXN0cm95KCkge1xuICAgICAgICBpZiAodGhpcy50YXJnZXQgPT09ICd3aW5kb3cnKVxuICAgICAgICAgICAgdGhpcy51bmJpbmREb2N1bWVudFNjcm9sbExpc3RlbmVyKCk7XG4gICAgICAgIGVsc2UgaWYgKHRoaXMudGFyZ2V0ID09PSAncGFyZW50JylcbiAgICAgICAgICAgIHRoaXMudW5iaW5kUGFyZW50U2Nyb2xsTGlzdGVuZXIoKTtcblxuICAgICAgICBpZiAodGhpcy5vdmVybGF5KSB7XG4gICAgICAgICAgICBaSW5kZXhVdGlscy5jbGVhcih0aGlzLm92ZXJsYXkpO1xuICAgICAgICAgICAgdGhpcy5vdmVybGF5ID0gbnVsbDtcbiAgICAgICAgfVxuICAgIH1cbn1cblxuQE5nTW9kdWxlKHtcbiAgICBpbXBvcnRzOiBbQ29tbW9uTW9kdWxlXSxcbiAgICBleHBvcnRzOiBbU2Nyb2xsVG9wXSxcbiAgICBkZWNsYXJhdGlvbnM6IFtTY3JvbGxUb3BdXG59KVxuZXhwb3J0IGNsYXNzIFNjcm9sbFRvcE1vZHVsZSB7IH1cbiJdfQ==