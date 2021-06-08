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
BadgeDirective.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.0.0", ngImport: i0, type: BadgeDirective, deps: [{ token: i0.ElementRef }], target: i0.ɵɵFactoryTarget.Directive });
BadgeDirective.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "12.0.0", type: BadgeDirective, selector: "[pBadge]", inputs: { iconPos: "iconPos", value: "value", severity: "severity" }, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.0.0", ngImport: i0, type: BadgeDirective, decorators: [{
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
            'p-badge-no-gutter': this.value && String(this.value).length === 1,
            'p-badge-lg': this.size === 'large',
            'p-badge-xl': this.size === 'xlarge',
            'p-badge-info': this.severity === 'info',
            'p-badge-success': this.severity === 'success',
            'p-badge-warning': this.severity === 'warning',
            'p-badge-danger': this.severity === 'danger'
        };
    }
}
Badge.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.0.0", ngImport: i0, type: Badge, deps: [], target: i0.ɵɵFactoryTarget.Component });
Badge.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.0.0", type: Badge, selector: "p-badge", inputs: { styleClass: "styleClass", style: "style", size: "size", severity: "severity", value: "value" }, ngImport: i0, template: `
        <span [ngClass]="containerClass()" [class]="styleClass" [ngStyle]="style">
                {{value}}
        </span>
    `, isInline: true, styles: [".p-badge{display:inline-block;border-radius:10px;text-align:center;padding:0 .5rem}.p-overlay-badge{position:relative}.p-overlay-badge .p-badge{position:absolute;top:0;right:0;transform:translate(50%,-50%);transform-origin:100% 0;margin:0}.p-badge-dot{width:.5rem;min-width:.5rem;height:.5rem}.p-badge-dot,.p-badge-no-gutter{border-radius:50%;padding:0}"], directives: [{ type: i1.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { type: i1.NgStyle, selector: "[ngStyle]", inputs: ["ngStyle"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.0.0", ngImport: i0, type: Badge, decorators: [{
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
BadgeModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.0.0", ngImport: i0, type: BadgeModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
BadgeModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.0.0", ngImport: i0, type: BadgeModule, declarations: [Badge, BadgeDirective], imports: [CommonModule], exports: [Badge, BadgeDirective, SharedModule] });
BadgeModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.0.0", ngImport: i0, type: BadgeModule, imports: [[CommonModule], SharedModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.0.0", ngImport: i0, type: BadgeModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule],
                    exports: [Badge, BadgeDirective, SharedModule],
                    declarations: [Badge, BadgeDirective]
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmFkZ2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvYXBwL2NvbXBvbmVudHMvYmFkZ2UvYmFkZ2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFFBQVEsRUFBRSxTQUFTLEVBQUUsdUJBQXVCLEVBQUUsaUJBQWlCLEVBQUUsS0FBSyxFQUEyQyxTQUFTLEVBQXdDLE1BQU0sZUFBZSxDQUFDO0FBQ2pNLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMvQyxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sYUFBYSxDQUFDO0FBQzNDLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxhQUFhLENBQUM7QUFDekMsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sZUFBZSxDQUFDOzs7QUFLbEQsTUFBTSxPQUFPLGNBQWM7SUFVdkIsWUFBbUIsRUFBYztRQUFkLE9BQUUsR0FBRixFQUFFLENBQVk7UUFSeEIsWUFBTyxHQUF3QyxNQUFNLENBQUM7SUFRM0IsQ0FBQztJQUVyQyxlQUFlO1FBQ1gsSUFBSSxDQUFDLEVBQUUsR0FBRyxpQkFBaUIsRUFBRSxHQUFHLFFBQVEsQ0FBQztRQUN6QyxJQUFJLEVBQUUsR0FBRyxJQUFJLENBQUMsRUFBRSxDQUFDLGFBQWEsQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLGFBQWEsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsYUFBYSxDQUFDO1FBRXRILElBQUksS0FBSyxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDM0MsS0FBSyxDQUFDLEVBQUUsR0FBRyxJQUFJLENBQUMsRUFBRSxDQUFFO1FBQ3BCLEtBQUssQ0FBQyxTQUFTLEdBQUcscUJBQXFCLENBQUM7UUFFeEMsSUFBSSxJ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c0NvbnRlbnQiOlsiaW1wb3J0IHsgTmdNb2R1bGUsIENvbXBvbmVudCwgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksIFZpZXdFbmNhcHN1bGF0aW9uLCBJbnB1dCwgUXVlcnlMaXN0LCBDb250ZW50Q2hpbGRyZW4sIFRlbXBsYXRlUmVmLCBEaXJlY3RpdmUsIE9uRGVzdHJveSwgQWZ0ZXJWaWV3SW5pdCwgRWxlbWVudFJlZiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IFNoYXJlZE1vZHVsZSB9IGZyb20gJ3ByaW1lbmcvYXBpJztcbmltcG9ydCB7IERvbUhhbmRsZXIgfSBmcm9tICdwcmltZW5nL2RvbSc7XG5pbXBvcnQgeyBVbmlxdWVDb21wb25lbnRJZCB9IGZyb20gJ3ByaW1lbmcvdXRpbHMnO1xuXG5ARGlyZWN0aXZlKHtcbiAgICBzZWxlY3RvcjogJ1twQmFkZ2VdJ1xufSlcbmV4cG9ydCBjbGFzcyBCYWRnZURpcmVjdGl2ZSBpbXBsZW1lbnRzIEFmdGVyVmlld0luaXQsIE9uRGVzdHJveSB7XG5cbiAgICBASW5wdXQoKSBpY29uUG9zOiAnbGVmdCcgfCAncmlnaHQnIHwgJ3RvcCcgfCAnYm90dG9tJyA9ICdsZWZ0JztcbiAgICAgICAgICAgIFxuICAgIHB1YmxpYyBfdmFsdWU6IHN0cmluZztcbiAgICAgICAgICAgIFxuICAgIHB1YmxpYyBpbml0aWFsaXplZDogYm9vbGVhbjtcblxuICAgIHByaXZhdGUgaWQ6IHN0cmluZztcbiAgICBcbiAgICBjb25zdHJ1Y3RvcihwdWJsaWMgZWw6IEVsZW1lbnRSZWYpIHt9XG4gICAgXG4gICAgbmdBZnRlclZpZXdJbml0KCkge1xuICAgICAgICB0aGlzLmlkID0gVW5pcXVlQ29tcG9uZW50SWQoKSArICdfYmFkZ2UnO1xuICAgICAgICBsZXQgZWwgPSB0aGlzLmVsLm5hdGl2ZUVsZW1lbnQubm9kZU5hbWUuaW5kZXhPZihcIi1cIikgIT0gLTEgPyB0aGlzLmVsLm5hdGl2ZUVsZW1lbnQuZmlyc3RDaGlsZCA6IHRoaXMuZWwubmF0aXZlRWxlbWVudDsgXG5cbiAgICAgICAgbGV0IGJhZGdlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xuICAgICAgICBiYWRnZS5pZCA9IHRoaXMuaWQgO1xuICAgICAgICBiYWRnZS5jbGFzc05hbWUgPSAncC1iYWRnZSBwLWNvbXBvbmVudCc7XG5cbiAgICAgICAgaWYgKHRoaXMuc2V2ZXJpdHkpIHtcbiAgICAgICAgICAgIERvbUhhbmRsZXIuYWRkQ2xhc3MoYmFkZ2UsICdwLWJhZGdlLScgKyB0aGlzLnNldmVyaXR5KTtcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgaWYgKHRoaXMudmFsdWUgIT0gbnVsbCkge1xuICAgICAgICAgICAgYmFkZ2UuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUodGhpcy52YWx1ZSkpO1xuICAgICAgICAgICAgXG4gICAgICAgICAgICBpZiAoU3RyaW5nKHRoaXMudmFsdWUpLmxlbmd0aCA9PT0gMSkge1xuICAgICAgICAgICAgICAgIERvbUhhbmRsZXIuYWRkQ2xhc3MoYmFkZ2UsICdwLWJhZGdlLW5vLWd1dHRlcicpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgRG9tSGFuZGxlci5hZGRDbGFzcyhiYWRnZSwgJ3AtYmFkZ2UtZG90Jyk7XG4gICAgICAgIH1cblxuICAgICAgICBEb21IYW5kbGVyLmFkZENsYXNzKGVsLCAncC1vdmVybGF5LWJhZGdlJyk7XG4gICAgICAgIGVsLmFwcGVuZENoaWxkKGJhZGdlKTtcblxuICAgICAgICB0aGlzLmluaXRpYWxpemVkID0gdHJ1ZTtcbiAgICB9XG5cbiAgICBASW5wdXQoKSBnZXQgdmFsdWUoKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3ZhbHVlO1xuICAgIH1cblxuICAgIHNldCB2YWx1ZSh2YWw6IHN0cmluZykge1xuICAgICAgICBpZiAodmFsICE9PSB0aGlzLl92YWx1ZSkge1xuICAgICAgICAgICAgdGhpcy5fdmFsdWUgPSB2YWw7XG5cbiAgICAgICAgICAgIGlmICh0aGlzLmluaXRpYWxpemVkKSB7XG4gICAgICAgICAgICAgICAgbGV0IGJhZGdlID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQodGhpcy5pZCk7XG5cbiAgICAgICAgICAgICAgICBpZiAodGhpcy5fdmFsdWUpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKERvbUhhbmRsZXIuaGFzQ2xhc3MoYmFkZ2UsICdwLWJhZGdlLWRvdCcpKVxuICAgICAgICAgICAgICAgICAgICAgICAgRG9tSGFuZGxlci5yZW1vdmVDbGFzcyhiYWRnZSwgJ3AtYmFkZ2UtZG90Jyk7XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKFN0cmluZyh0aGlzLl92YWx1ZSkubGVuZ3RoID09PSAxKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBEb21IYW5kbGVyLmFkZENsYXNzKGJhZGdlLCAncC1iYWRnZS1uby1ndXR0ZXInKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIERvbUhhbmRsZXIucmVtb3ZlQ2xhc3MoYmFkZ2UsICdwLWJhZGdlLW5vLWd1dHRlcicpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2UgaWYgKCF0aGlzLl92YWx1ZSAmJiAhRG9tSGFuZGxlci5oYXNDbGFzcyhiYWRnZSwgJ3AtYmFkZ2UtZG90JykpIHtcbiAgICAgICAgICAgICAgICAgICAgRG9tSGFuZGxlci5hZGRDbGFzcyhiYWRnZSwgJ3AtYmFkZ2UtZG90Jyk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgYmFkZ2UuaW5uZXJIVE1MID0gJyc7XG4gICAgICAgICAgICAgICAgYmFkZ2UuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUodGhpcy5fdmFsdWUpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIEBJbnB1dCgpIHNldmVyaXR5OiBzdHJpbmc7XG4gICAgICAgIFxuICAgIG5nT25EZXN0cm95KCkge1xuICAgICAgICB0aGlzLmluaXRpYWxpemVkID0gZmFsc2U7XG4gICAgfVxufVxuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ3AtYmFkZ2UnLFxuICAgIHRlbXBsYXRlOiBgXG4gICAgICAgIDxzcGFuIFtuZ0NsYXNzXT1cImNvbnRhaW5lckNsYXNzKClcIiBbY2xhc3NdPVwic3R5bGVDbGFzc1wiIFtuZ1N0eWxlXT1cInN0eWxlXCI+XG4gICAgICAgICAgICAgICAge3t2YWx1ZX19XG4gICAgICAgIDwvc3Bhbj5cbiAgICBgLFxuICAgIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxuICAgIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmUsXG4gICAgc3R5bGVVcmxzOiBbJy4vYmFkZ2UuY3NzJ11cbn0pXG5leHBvcnQgY2xhc3MgQmFkZ2Uge1xuXG4gICAgQElucHV0KCkgc3R5bGVDbGFzczogc3RyaW5nO1xuXG4gICAgQElucHV0KCkgc3R5bGU6IGFueTtcblxuICAgIEBJbnB1dCgpIHNpemU6IHN0cmluZztcbiAgICBcbiAgICBASW5wdXQoKSBzZXZlcml0eTogc3RyaW5nO1xuICAgIFxuICAgIEBJbnB1dCgpIHZhbHVlOiBzdHJpbmc7XG4gICAgXG4gICAgY29udGFpbmVyQ2xhc3MoKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAncC1iYWRnZSBwLWNvbXBvbmVudCc6IHRydWUsXG4gICAgICAgICAgICAncC1iYWRnZS1uby1ndXR0ZXInOiB0aGlzLnZhbHVlICYmIFN0cmluZyh0aGlzLnZhbHVlKS5sZW5ndGggPT09IDEsXG4gICAgICAgICAgICAncC1iYWRnZS1sZyc6IHRoaXMuc2l6ZSA9PT0gJ2xhcmdlJyxcbiAgICAgICAgICAgICdwLWJhZGdlLXhsJzogdGhpcy5zaXplID09PSAneGxhcmdlJyxcbiAgICAgICAgICAgICdwLWJhZGdlLWluZm8nOiB0aGlzLnNldmVyaXR5ID09PSAnaW5mbycsXG4gICAgICAgICAgICAncC1iYWRnZS1zdWNjZXNzJzogdGhpcy5zZXZlcml0eSA9PT0gJ3N1Y2Nlc3MnLFxuICAgICAgICAgICAgJ3AtYmFkZ2Utd2FybmluZyc6IHRoaXMuc2V2ZXJpdHkgPT09ICd3YXJuaW5nJyxcbiAgICAgICAgICAgICdwLWJhZGdlLWRhbmdlcic6IHRoaXMuc2V2ZXJpdHkgPT09ICdkYW5nZXInXG4gICAgICAgIH07XG4gICAgfVxufVxuXG5ATmdNb2R1bGUoe1xuICAgIGltcG9ydHM6IFtDb21tb25Nb2R1bGVdLFxuICAgIGV4cG9ydHM6IFtCYWRnZSwgQmFkZ2VEaXJlY3RpdmUsIFNoYXJlZE1vZHVsZV0sXG4gICAgZGVjbGFyYXRpb25zOiBbQmFkZ2UsIEJhZGdlRGlyZWN0aXZlXVxufSlcbmV4cG9ydCBjbGFzcyBCYWRnZU1vZHVsZSB7IH1cbiJdfQ==