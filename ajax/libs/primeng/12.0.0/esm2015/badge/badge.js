import { NgModule, Component, ChangeDetectionStrategy, ViewEncapsulation, Input, Directive } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'primeng/api';
import { DomHandler } from 'primeng/dom';
import { UniqueComponentId } from 'primeng/utils';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
export class BadgeDirective {
    constructor(el) {
        this.el = el;
        this.iconPos = 'left';
    }
    ngAfterViewInit() {
        this.id = UniqueComponentId() + '_badge';
        let el = this.el.nativeElement.nodeName.indexOf("-") != -1 ? this.el.nativeElement.firstChild : this.el.nativeElement;
        let badge = document.createElement('span');
        badge.id = this.id;
        badge.className = 'p-badge p-component';
        if (this.severity) {
            DomHandler.addClass(badge, 'p-badge-' + this.severity);
        }
        if (this.value != null) {
            badge.appendChild(document.createTextNode(this.value));
            if (String(this.value).length === 1) {
                DomHandler.addClass(badge, 'p-badge-no-gutter');
            }
        }
        else {
            DomHandler.addClass(badge, 'p-badge-dot');
        }
        DomHandler.addClass(el, 'p-overlay-badge');
        el.appendChild(badge);
        this.initialized = true;
    }
    get value() {
        return this._value;
    }
    set value(val) {
        if (val !== this._value) {
            this._value = val;
            if (this.initialized) {
                let badge = document.getElementById(this.id);
                if (this._value) {
                    if (DomHandler.hasClass(badge, 'p-badge-dot'))
                        DomHandler.removeClass(badge, 'p-badge-dot');
                    if (String(this._value).length === 1) {
                        DomHandler.addClass(badge, 'p-badge-no-gutter');
                    }
                    else {
                        DomHandler.removeClass(badge, 'p-badge-no-gutter');
                    }
                }
                else if (!this._value && !DomHandler.hasClass(badge, 'p-badge-dot')) {
                    DomHandler.addClass(badge, 'p-badge-dot');
                }
                badge.innerHTML = '';
                badge.appendChild(document.createTextNode(this._value));
            }
        }
    }
    ngOnDestroy() {
        this.initialized = false;
    }
}
BadgeDirective.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.0.4", ngImport: i0, type: BadgeDirective, deps: [{ token: i0.ElementRef }], target: i0.ɵɵFactoryTarget.Directive });
BadgeDirective.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "12.0.4", type: BadgeDirective, selector: "[pBadge]", inputs: { iconPos: "iconPos", value: "value", severity: "severity" }, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.0.4", ngImport: i0, type: BadgeDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: '[pBadge]'
                }]
        }], ctorParameters: function () { return [{ type: i0.ElementRef }]; }, propDecorators: { iconPos: [{
                type: Input
            }], value: [{
                type: Input
            }], severity: [{
                type: Input
            }] } });
export class Badge {
    containerClass() {
        return {
            'p-badge p-component': true,
            'p-badge-no-gutter': this.value != undefined && String(this.value).length === 1,
            'p-badge-lg': this.size === 'large',
            'p-badge-xl': this.size === 'xlarge',
            'p-badge-info': this.severity === 'info',
            'p-badge-success': this.severity === 'success',
            'p-badge-warning': this.severity === 'warning',
            'p-badge-danger': this.severity === 'danger'
        };
    }
}
Badge.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.0.4", ngImport: i0, type: Badge, deps: [], target: i0.ɵɵFactoryTarget.Component });
Badge.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.0.4", type: Badge, selector: "p-badge", inputs: { styleClass: "styleClass", style: "style", size: "size", severity: "severity", value: "value" }, ngImport: i0, template: `
        <span [ngClass]="containerClass()" [class]="styleClass" [ngStyle]="style">
                {{value}}
        </span>
    `, isInline: true, styles: [".p-badge{display:inline-block;border-radius:10px;text-align:center;padding:0 .5rem}.p-overlay-badge{position:relative}.p-overlay-badge .p-badge{position:absolute;top:0;right:0;transform:translate(50%,-50%);transform-origin:100% 0;margin:0}.p-badge-dot{width:.5rem;min-width:.5rem;height:.5rem}.p-badge-dot,.p-badge-no-gutter{border-radius:50%;padding:0}"], directives: [{ type: i1.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { type: i1.NgStyle, selector: "[ngStyle]", inputs: ["ngStyle"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.0.4", ngImport: i0, type: Badge, decorators: [{
            type: Component,
            args: [{
                    selector: 'p-badge',
                    template: `
        <span [ngClass]="containerClass()" [class]="styleClass" [ngStyle]="style">
                {{value}}
        </span>
    `,
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    encapsulation: ViewEncapsulation.None,
                    styleUrls: ['./badge.css']
                }]
        }], propDecorators: { styleClass: [{
                type: Input
            }], style: [{
                type: Input
            }], size: [{
                type: Input
            }], severity: [{
                type: Input
            }], value: [{
                type: Input
            }] } });
export class BadgeModule {
}
BadgeModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.0.4", ngImport: i0, type: BadgeModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
BadgeModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.0.4", ngImport: i0, type: BadgeModule, declarations: [Badge, BadgeDirective], imports: [CommonModule], exports: [Badge, BadgeDirective, SharedModule] });
BadgeModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.0.4", ngImport: i0, type: BadgeModule, imports: [[CommonModule], SharedModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.0.4", ngImport: i0, type: BadgeModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule],
                    exports: [Badge, BadgeDirective, SharedModule],
                    declarations: [Badge, BadgeDirective]
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmFkZ2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvYXBwL2NvbXBvbmVudHMvYmFkZ2UvYmFkZ2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFFBQVEsRUFBRSxTQUFTLEVBQUUsdUJBQXVCLEVBQUUsaUJBQWlCLEVBQUUsS0FBSyxFQUEyQyxTQUFTLEVBQXdDLE1BQU0sZUFBZSxDQUFDO0FBQ2pNLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMvQyxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sYUFBYSxDQUFDO0FBQzNDLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxhQUFhLENBQUM7QUFDekMsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sZUFBZSxDQUFDOzs7QUFLbEQsTUFBTSxPQUFPLGNBQWM7SUFVdkIsWUFBbUIsRUFBYztRQUFkLE9BQUUsR0FBRixFQUFFLENBQVk7UUFSeEIsWUFBTyxHQUF3QyxNQUFNLENBQUM7SUFRM0IsQ0FBQztJQUVyQyxlQUFlO1FBQ1gsSUFBSSxDQUFDLEVBQUUsR0FBRyxpQkFBaUIsRUFBRSxHQUFHLFFBQVEsQ0FBQztRQUN6QyxJQUFJLEVBQUUsR0FBRyxJQUFJLENBQUMsRUFBRSxDQUFDLGFBQWEsQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLGFBQWEsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsYUFBYSxDQUFDO1FBRXRILElBQUksS0FBSyxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDM0MsS0FBSyxDQUFDLEVBQUUsR0FBRyxJQUFJLENBQUMsRUFBRSxDQUFFO1FBQ3BCLEtBQUssQ0FBQyxTQUFTLEdBQUcscUJBQXFCLENBQUM7UUFFeEMsSUFBSSxJ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QyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5nTW9kdWxlLCBDb21wb25lbnQsIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LCBWaWV3RW5jYXBzdWxhdGlvbiwgSW5wdXQsIFF1ZXJ5TGlzdCwgQ29udGVudENoaWxkcmVuLCBUZW1wbGF0ZVJlZiwgRGlyZWN0aXZlLCBPbkRlc3Ryb3ksIEFmdGVyVmlld0luaXQsIEVsZW1lbnRSZWYgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBTaGFyZWRNb2R1bGUgfSBmcm9tICdwcmltZW5nL2FwaSc7XG5pbXBvcnQgeyBEb21IYW5kbGVyIH0gZnJvbSAncHJpbWVuZy9kb20nO1xuaW1wb3J0IHsgVW5pcXVlQ29tcG9uZW50SWQgfSBmcm9tICdwcmltZW5nL3V0aWxzJztcblxuQERpcmVjdGl2ZSh7XG4gICAgc2VsZWN0b3I6ICdbcEJhZGdlXSdcbn0pXG5leHBvcnQgY2xhc3MgQmFkZ2VEaXJlY3RpdmUgaW1wbGVtZW50cyBBZnRlclZpZXdJbml0LCBPbkRlc3Ryb3kge1xuXG4gICAgQElucHV0KCkgaWNvblBvczogJ2xlZnQnIHwgJ3JpZ2h0JyB8ICd0b3AnIHwgJ2JvdHRvbScgPSAnbGVmdCc7XG5cbiAgICBwdWJsaWMgX3ZhbHVlOiBzdHJpbmc7XG5cbiAgICBwdWJsaWMgaW5pdGlhbGl6ZWQ6IGJvb2xlYW47XG5cbiAgICBwcml2YXRlIGlkOiBzdHJpbmc7XG5cbiAgICBjb25zdHJ1Y3RvcihwdWJsaWMgZWw6IEVsZW1lbnRSZWYpIHt9XG5cbiAgICBuZ0FmdGVyVmlld0luaXQoKSB7XG4gICAgICAgIHRoaXMuaWQgPSBVbmlxdWVDb21wb25lbnRJZCgpICsgJ19iYWRnZSc7XG4gICAgICAgIGxldCBlbCA9IHRoaXMuZWwubmF0aXZlRWxlbWVudC5ub2RlTmFtZS5pbmRleE9mKFwiLVwiKSAhPSAtMSA/IHRoaXMuZWwubmF0aXZlRWxlbWVudC5maXJzdENoaWxkIDogdGhpcy5lbC5uYXRpdmVFbGVtZW50O1xuXG4gICAgICAgIGxldCBiYWRnZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTtcbiAgICAgICAgYmFkZ2UuaWQgPSB0aGlzLmlkIDtcbiAgICAgICAgYmFkZ2UuY2xhc3NOYW1lID0gJ3AtYmFkZ2UgcC1jb21wb25lbnQnO1xuXG4gICAgICAgIGlmICh0aGlzLnNldmVyaXR5KSB7XG4gICAgICAgICAgICBEb21IYW5kbGVyLmFkZENsYXNzKGJhZGdlLCAncC1iYWRnZS0nICsgdGhpcy5zZXZlcml0eSk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy52YWx1ZSAhPSBudWxsKSB7XG4gICAgICAgICAgICBiYWRnZS5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZSh0aGlzLnZhbHVlKSk7XG5cbiAgICAgICAgICAgIGlmIChTdHJpbmcodGhpcy52YWx1ZSkubGVuZ3RoID09PSAxKSB7XG4gICAgICAgICAgICAgICAgRG9tSGFuZGxlci5hZGRDbGFzcyhiYWRnZSwgJ3AtYmFkZ2Utbm8tZ3V0dGVyJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBEb21IYW5kbGVyLmFkZENsYXNzKGJhZGdlLCAncC1iYWRnZS1kb3QnKTtcbiAgICAgICAgfVxuXG4gICAgICAgIERvbUhhbmRsZXIuYWRkQ2xhc3MoZWwsICdwLW92ZXJsYXktYmFkZ2UnKTtcbiAgICAgICAgZWwuYXBwZW5kQ2hpbGQoYmFkZ2UpO1xuXG4gICAgICAgIHRoaXMuaW5pdGlhbGl6ZWQgPSB0cnVlO1xuICAgIH1cblxuICAgIEBJbnB1dCgpIGdldCB2YWx1ZSgpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gdGhpcy5fdmFsdWU7XG4gICAgfVxuXG4gICAgc2V0IHZhbHVlKHZhbDogc3RyaW5nKSB7XG4gICAgICAgIGlmICh2YWwgIT09IHRoaXMuX3ZhbHVlKSB7XG4gICAgICAgICAgICB0aGlzLl92YWx1ZSA9IHZhbDtcblxuICAgICAgICAgICAgaWYgKHRoaXMuaW5pdGlhbGl6ZWQpIHtcbiAgICAgICAgICAgICAgICBsZXQgYmFkZ2UgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCh0aGlzLmlkKTtcblxuICAgICAgICAgICAgICAgIGlmICh0aGlzLl92YWx1ZSkge1xuICAgICAgICAgICAgICAgICAgICBpZiAoRG9tSGFuZGxlci5oYXNDbGFzcyhiYWRnZSwgJ3AtYmFkZ2UtZG90JykpXG4gICAgICAgICAgICAgICAgICAgICAgICBEb21IYW5kbGVyLnJlbW92ZUNsYXNzKGJhZGdlLCAncC1iYWRnZS1kb3QnKTtcblxuICAgICAgICAgICAgICAgICAgICBpZiAoU3RyaW5nKHRoaXMuX3ZhbHVlKS5sZW5ndGggPT09IDEpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIERvbUhhbmRsZXIuYWRkQ2xhc3MoYmFkZ2UsICdwLWJhZGdlLW5vLWd1dHRlcicpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgRG9tSGFuZGxlci5yZW1vdmVDbGFzcyhiYWRnZSwgJ3AtYmFkZ2Utbm8tZ3V0dGVyJyk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSBpZiAoIXRoaXMuX3ZhbHVlICYmICFEb21IYW5kbGVyLmhhc0NsYXNzKGJhZGdlLCAncC1iYWRnZS1kb3QnKSkge1xuICAgICAgICAgICAgICAgICAgICBEb21IYW5kbGVyLmFkZENsYXNzKGJhZGdlLCAncC1iYWRnZS1kb3QnKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBiYWRnZS5pbm5lckhUTUwgPSAnJztcbiAgICAgICAgICAgICAgICBiYWRnZS5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZSh0aGlzLl92YWx1ZSkpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgQElucHV0KCkgc2V2ZXJpdHk6IHN0cmluZztcblxuICAgIG5nT25EZXN0cm95KCkge1xuICAgICAgICB0aGlzLmluaXRpYWxpemVkID0gZmFsc2U7XG4gICAgfVxufVxuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ3AtYmFkZ2UnLFxuICAgIHRlbXBsYXRlOiBgXG4gICAgICAgIDxzcGFuIFtuZ0NsYXNzXT1cImNvbnRhaW5lckNsYXNzKClcIiBbY2xhc3NdPVwic3R5bGVDbGFzc1wiIFtuZ1N0eWxlXT1cInN0eWxlXCI+XG4gICAgICAgICAgICAgICAge3t2YWx1ZX19XG4gICAgICAgIDwvc3Bhbj5cbiAgICBgLFxuICAgIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxuICAgIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmUsXG4gICAgc3R5bGVVcmxzOiBbJy4vYmFkZ2UuY3NzJ11cbn0pXG5leHBvcnQgY2xhc3MgQmFkZ2Uge1xuXG4gICAgQElucHV0KCkgc3R5bGVDbGFzczogc3RyaW5nO1xuXG4gICAgQElucHV0KCkgc3R5bGU6IGFueTtcblxuICAgIEBJbnB1dCgpIHNpemU6IHN0cmluZztcblxuICAgIEBJbnB1dCgpIHNldmVyaXR5OiBzdHJpbmc7XG5cbiAgICBASW5wdXQoKSB2YWx1ZTogc3RyaW5nO1xuXG4gICAgY29udGFpbmVyQ2xhc3MoKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAncC1iYWRnZSBwLWNvbXBvbmVudCc6IHRydWUsXG4gICAgICAgICAgICAncC1iYWRnZS1uby1ndXR0ZXInOiB0aGlzLnZhbHVlICE9IHVuZGVmaW5lZCAmJiBTdHJpbmcodGhpcy52YWx1ZSkubGVuZ3RoID09PSAxLFxuICAgICAgICAgICAgJ3AtYmFkZ2UtbGcnOiB0aGlzLnNpemUgPT09ICdsYXJnZScsXG4gICAgICAgICAgICAncC1iYWRnZS14bCc6IHRoaXMuc2l6ZSA9PT0gJ3hsYXJnZScsXG4gICAgICAgICAgICAncC1iYWRnZS1pbmZvJzogdGhpcy5zZXZlcml0eSA9PT0gJ2luZm8nLFxuICAgICAgICAgICAgJ3AtYmFkZ2Utc3VjY2Vzcyc6IHRoaXMuc2V2ZXJpdHkgPT09ICdzdWNjZXNzJyxcbiAgICAgICAgICAgICdwLWJhZGdlLXdhcm5pbmcnOiB0aGlzLnNldmVyaXR5ID09PSAnd2FybmluZycsXG4gICAgICAgICAgICAncC1iYWRnZS1kYW5nZXInOiB0aGlzLnNldmVyaXR5ID09PSAnZGFuZ2VyJ1xuICAgICAgICB9O1xuICAgIH1cbn1cblxuQE5nTW9kdWxlKHtcbiAgICBpbXBvcnRzOiBbQ29tbW9uTW9kdWxlXSxcbiAgICBleHBvcnRzOiBbQmFkZ2UsIEJhZGdlRGlyZWN0aXZlLCBTaGFyZWRNb2R1bGVdLFxuICAgIGRlY2xhcmF0aW9uczogW0JhZGdlLCBCYWRnZURpcmVjdGl2ZV1cbn0pXG5leHBvcnQgY2xhc3MgQmFkZ2VNb2R1bGUgeyB9XG4iXX0=