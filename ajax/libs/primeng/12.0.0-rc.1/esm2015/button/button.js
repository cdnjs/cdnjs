import { NgModule, Directive, Component, EventEmitter, Output, Input, ChangeDetectionStrategy, ViewEncapsulation, ContentChildren } from '@angular/core';
import { DomHandler } from 'primeng/dom';
import { CommonModule } from '@angular/common';
import { RippleModule } from 'primeng/ripple';
import { PrimeTemplate } from 'primeng/api';
import * as i0 from "@angular/core";
import * as i1 from "primeng/ripple";
import * as i2 from "@angular/common";
export class ButtonDirective {
    constructor(el) {
        this.el = el;
        this.iconPos = 'left';
        this.loadingIcon = "pi pi-spinner pi-spin";
        this._loading = false;
    }
    ngAfterViewInit() {
        this._initialStyleClass = this.el.nativeElement.className;
        DomHandler.addMultipleClasses(this.el.nativeElement, this.getStyleClass());
        if (this.icon) {
            this.createIconEl();
        }
        let labelElement = document.createElement("span");
        if (this.icon && !this.label) {
            labelElement.setAttribute('aria-hidden', 'true');
        }
        labelElement.className = 'p-button-label';
        if (this.label)
            labelElement.appendChild(document.createTextNode(this.label));
        else
            labelElement.innerHTML = '&nbsp;';
        this.el.nativeElement.appendChild(labelElement);
        this.initialized = true;
    }
    getStyleClass() {
        let styleClass = 'p-button p-component';
        if (this.icon && !this.label) {
            styleClass = styleClass + ' p-button-icon-only';
        }
        if (this.loading) {
            styleClass = styleClass + ' p-disabled p-button-loading';
            if (!this.icon && this.label)
                styleClass = styleClass + ' p-button-loading-label-only';
        }
        return styleClass;
    }
    setStyleClass() {
        let styleClass = this.getStyleClass();
        this.el.nativeElement.className = styleClass + ' ' + this._initialStyleClass;
    }
    createIconEl() {
        let iconElement = document.createElement("span");
        iconElement.className = 'p-button-icon';
        iconElement.setAttribute("aria-hidden", "true");
        let iconPosClass = this.label ? 'p-button-icon-' + this.iconPos : null;
        if (iconPosClass) {
            DomHandler.addClass(iconElement, iconPosClass);
        }
        DomHandler.addMultipleClasses(iconElement, this.getIconClass());
        let labelEl = DomHandler.findSingle(this.el.nativeElement, '.p-button-label');
        if (labelEl)
            this.el.nativeElement.insertBefore(iconElement, labelEl);
        else
            this.el.nativeElement.appendChild(iconElement);
    }
    getIconClass() {
        return this.loading ? 'p-button-loading-icon ' + this.loadingIcon : this._icon;
    }
    setIconClass() {
        let iconElement = DomHandler.findSingle(this.el.nativeElement, '.p-button-icon');
        if (iconElement) {
            if (this.iconPos)
                iconElement.className = 'p-button-icon p-button-icon-' + this.iconPos + ' ' + this.getIconClass();
            else
                iconElement.className = 'p-button-icon ' + this.getIconClass();
        }
        else {
            this.createIconEl();
        }
    }
    removeIconElement() {
        let iconElement = DomHandler.findSingle(this.el.nativeElement, '.p-button-icon');
        this.el.nativeElement.removeChild(iconElement);
    }
    get label() {
        return this._label;
    }
    set label(val) {
        this._label = val;
        if (this.initialized) {
            DomHandler.findSingle(this.el.nativeElement, '.p-button-label').textContent = this._label || '&nbsp;';
            this.setStyleClass();
        }
    }
    get icon() {
        return this._icon;
    }
    set icon(val) {
        this._icon = val;
        if (this.initialized) {
            this.setIconClass();
            this.setStyleClass();
        }
    }
    get loading() {
        return this._loading;
    }
    set loading(val) {
        this._loading = val;
        if (this.initialized) {
            if (this.loading || this.icon)
                this.setIconClass();
            else
                this.removeIconElement();
            this.setStyleClass();
        }
    }
    ngOnDestroy() {
        this.initialized = false;
    }
}
ButtonDirective.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.0.0", ngImport: i0, type: ButtonDirective, deps: [{ token: i0.ElementRef }], target: i0.ɵɵFactoryTarget.Directive });
ButtonDirective.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "12.0.0", type: ButtonDirective, selector: "[pButton]", inputs: { iconPos: "iconPos", loadingIcon: "loadingIcon", label: "label", icon: "icon", loading: "loading" }, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.0.0", ngImport: i0, type: ButtonDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: '[pButton]'
                }]
        }], ctorParameters: function () { return [{ type: i0.ElementRef }]; }, propDecorators: { iconPos: [{
                type: Input
            }], loadingIcon: [{
                type: Input
            }], label: [{
                type: Input
            }], icon: [{
                type: Input
            }], loading: [{
                type: Input
            }] } });
export class Button {
    constructor() {
        this.type = "button";
        this.iconPos = 'left';
        this.loading = false;
        this.loadingIcon = "pi pi-spinner pi-spin";
        this.onClick = new EventEmitter();
        this.onFocus = new EventEmitter();
        this.onBlur = new EventEmitter();
    }
    ngAfterContentInit() {
        this.templates.forEach((item) => {
            switch (item.getType()) {
                case 'content':
                    this.contentTemplate = item.template;
                    break;
                default:
                    this.contentTemplate = item.template;
                    break;
            }
        });
    }
    badgeStyleClass() {
        return {
            'p-badge p-component': true,
            'p-badge-no-gutter': this.badge && String(this.badge).length === 1
        };
    }
}
Button.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.0.0", ngImport: i0, type: Button, deps: [], target: i0.ɵɵFactoryTarget.Component });
Button.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.0.0", type: Button, selector: "p-button", inputs: { type: "type", iconPos: "iconPos", icon: "icon", badge: "badge", label: "label", disabled: "disabled", loading: "loading", loadingIcon: "loadingIcon", style: "style", styleClass: "styleClass", badgeClass: "badgeClass" }, outputs: { onClick: "onClick", onFocus: "onFocus", onBlur: "onBlur" }, queries: [{ propertyName: "templates", predicate: PrimeTemplate }], ngImport: i0, template: `
        <button [attr.type]="type" [class]="styleClass" [ngStyle]="style" [disabled]="disabled || loading"
            [ngClass]="{'p-button p-component':true,
                        'p-button-icon-only': (icon && !label),
                        'p-button-vertical': (iconPos === 'top' || iconPos === 'bottom') && label,
                        'p-disabled': this.disabled || this.loading,
                        'p-button-loading': this.loading,
                        'p-button-loading-label-only': this.loading && !this.icon && this.label}"
                        (click)="onClick.emit($event)" (focus)="onFocus.emit($event)" (blur)="onBlur.emit($event)" pRipple>
            <ng-content></ng-content>
            <ng-container *ngTemplateOutlet="contentTemplate"></ng-container>
            <span [ngClass]="{'p-button-icon': true,
                        'p-button-icon-left': iconPos === 'left' && label,
                        'p-button-icon-right': iconPos === 'right' && label,
                        'p-button-icon-top': iconPos === 'top' && label,
                        'p-button-icon-bottom': iconPos === 'bottom' && label}"
                        [class]="loading ? 'p-button-loading-icon ' + loadingIcon : icon" *ngIf="!contentTemplate && (icon||loading)" [attr.aria-hidden]="true"></span>
            <span class="p-button-label" [attr.aria-hidden]="icon && !label" *ngIf="!contentTemplate">{{label||'&nbsp;'}}</span>
            <span [ngClass]="badgeStyleClass()" [class]="badgeClass" *ngIf="!contentTemplate && badge">{{badge}}</span>
        </button>
    `, isInline: true, directives: [{ type: i1.Ripple, selector: "[pRipple]" }, { type: i2.NgStyle, selector: "[ngStyle]", inputs: ["ngStyle"] }, { type: i2.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { type: i2.NgTemplateOutlet, selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet"] }, { type: i2.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.0.0", ngImport: i0, type: Button, decorators: [{
            type: Component,
            args: [{
                    selector: 'p-button',
                    template: `
        <button [attr.type]="type" [class]="styleClass" [ngStyle]="style" [disabled]="disabled || loading"
            [ngClass]="{'p-button p-component':true,
                        'p-button-icon-only': (icon && !label),
                        'p-button-vertical': (iconPos === 'top' || iconPos === 'bottom') && label,
                        'p-disabled': this.disabled || this.loading,
                        'p-button-loading': this.loading,
                        'p-button-loading-label-only': this.loading && !this.icon && this.label}"
                        (click)="onClick.emit($event)" (focus)="onFocus.emit($event)" (blur)="onBlur.emit($event)" pRipple>
            <ng-content></ng-content>
            <ng-container *ngTemplateOutlet="contentTemplate"></ng-container>
            <span [ngClass]="{'p-button-icon': true,
                        'p-button-icon-left': iconPos === 'left' && label,
                        'p-button-icon-right': iconPos === 'right' && label,
                        'p-button-icon-top': iconPos === 'top' && label,
                        'p-button-icon-bottom': iconPos === 'bottom' && label}"
                        [class]="loading ? 'p-button-loading-icon ' + loadingIcon : icon" *ngIf="!contentTemplate && (icon||loading)" [attr.aria-hidden]="true"></span>
            <span class="p-button-label" [attr.aria-hidden]="icon && !label" *ngIf="!contentTemplate">{{label||'&nbsp;'}}</span>
            <span [ngClass]="badgeStyleClass()" [class]="badgeClass" *ngIf="!contentTemplate && badge">{{badge}}</span>
        </button>
    `,
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    encapsulation: ViewEncapsulation.None
                }]
        }], propDecorators: { type: [{
                type: Input
            }], iconPos: [{
                type: Input
            }], icon: [{
                type: Input
            }], badge: [{
                type: Input
            }], label: [{
                type: Input
            }], disabled: [{
                type: Input
            }], loading: [{
                type: Input
            }], loadingIcon: [{
                type: Input
            }], style: [{
                type: Input
            }], styleClass: [{
                type: Input
            }], badgeClass: [{
                type: Input
            }], templates: [{
                type: ContentChildren,
                args: [PrimeTemplate]
            }], onClick: [{
                type: Output
            }], onFocus: [{
                type: Output
            }], onBlur: [{
                type: Output
            }] } });
export class ButtonModule {
}
ButtonModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.0.0", ngImport: i0, type: ButtonModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
ButtonModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.0.0", ngImport: i0, type: ButtonModule, declarations: [ButtonDirective, Button], imports: [CommonModule, RippleModule], exports: [ButtonDirective, Button] });
ButtonModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.0.0", ngImport: i0, type: ButtonModule, imports: [[CommonModule, RippleModule]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.0.0", ngImport: i0, type: ButtonModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule, RippleModule],
                    exports: [ButtonDirective, Button],
                    declarations: [ButtonDirective, Button]
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnV0dG9uLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2FwcC9jb21wb25lbnRzL2J1dHRvbi9idXR0b24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFDLFFBQVEsRUFBQyxTQUFTLEVBQUMsU0FBUyxFQUFZLFlBQVksRUFBZSxNQUFNLEVBQVcsS0FBSyxFQUFDLHVCQUF1QixFQUFFLGlCQUFpQixFQUFFLGVBQWUsRUFBMkMsTUFBTSxlQUFlLENBQUM7QUFDOU4sT0FBTyxFQUFDLFVBQVUsRUFBQyxNQUFNLGFBQWEsQ0FBQztBQUN2QyxPQUFPLEVBQUMsWUFBWSxFQUFDLE1BQU0saUJBQWlCLENBQUM7QUFDN0MsT0FBTyxFQUFDLFlBQVksRUFBQyxNQUFNLGdCQUFnQixDQUFDO0FBQzVDLE9BQU8sRUFBQyxhQUFhLEVBQUMsTUFBTSxhQUFhLENBQUM7Ozs7QUFLMUMsTUFBTSxPQUFPLGVBQWU7SUFnQnhCLFlBQW1CLEVBQWM7UUFBZCxPQUFFLEdBQUYsRUFBRSxDQUFZO1FBZHhCLFlBQU8sR0FBd0MsTUFBTSxDQUFDO1FBRXRELGdCQUFXLEdBQVcsdUJBQXVCLENBQUM7UUFNaEQsYUFBUSxHQUFZLEtBQUssQ0FBQztJQU1HLENBQUM7SUFFckMsZUFBZTtRQUNYLElBQUksQ0FBQyxrQkFBa0IsR0FBRyxJQUFJLENBQUMsRUFBRSxDQUFDLGFBQWEsQ0FBQyxTQUFTLENBQUM7UUFDMUQsVUFBVSxDQUFDLGtCQUFrQixDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsYUFBYSxFQUFFLElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQyxDQUFDO1FBRTNFLElBQUksSUFBSSxDQUFDLElBQUksRUFBRTtZQUNYLElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQztTQUN2QjtRQUVELElBQUksWUFBWSxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDbEQsSUFBSSxJQUFJLENBQUMsSUFBSSxJQUFJ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RyxNQUFNO3NCQUFmLE1BQU07O0FBNkJYLE1BQU0sT0FBTyxZQUFZOzt5R0FBWixZQUFZOzBHQUFaLFlBQVksaUJBN09aLGVBQWUsRUFnTGYsTUFBTSxhQXlETCxZQUFZLEVBQUMsWUFBWSxhQXpPMUIsZUFBZSxFQWdMZixNQUFNOzBHQTZETixZQUFZLFlBSlosQ0FBQyxZQUFZLEVBQUMsWUFBWSxDQUFDOzJGQUkzQixZQUFZO2tCQUx4QixRQUFRO21CQUFDO29CQUNOLE9BQU8sRUFBRSxDQUFDLFlBQVksRUFBQyxZQUFZLENBQUM7b0JBQ3BDLE9BQU8sRUFBRSxDQUFDLGVBQWUsRUFBQyxNQUFNLENBQUM7b0JBQ2pDLFlBQVksRUFBRSxDQUFDLGVBQWUsRUFBQyxNQUFNLENBQUM7aUJBQ3pDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtOZ01vZHVsZSxEaXJlY3RpdmUsQ29tcG9uZW50LEVsZW1lbnRSZWYsRXZlbnRFbWl0dGVyLEFmdGVyVmlld0luaXQsT3V0cHV0LE9uRGVzdHJveSxJbnB1dCxDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSwgVmlld0VuY2Fwc3VsYXRpb24sIENvbnRlbnRDaGlsZHJlbiwgQWZ0ZXJDb250ZW50SW5pdCwgVGVtcGxhdGVSZWYsIFF1ZXJ5TGlzdH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge0RvbUhhbmRsZXJ9IGZyb20gJ3ByaW1lbmcvZG9tJztcbmltcG9ydCB7Q29tbW9uTW9kdWxlfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHtSaXBwbGVNb2R1bGV9IGZyb20gJ3ByaW1lbmcvcmlwcGxlJzsgXG5pbXBvcnQge1ByaW1lVGVtcGxhdGV9IGZyb20gJ3ByaW1lbmcvYXBpJzsgXG5cbkBEaXJlY3RpdmUoe1xuICAgIHNlbGVjdG9yOiAnW3BCdXR0b25dJ1xufSlcbmV4cG9ydCBjbGFzcyBCdXR0b25EaXJlY3RpdmUgaW1wbGVtZW50cyBBZnRlclZpZXdJbml0LCBPbkRlc3Ryb3kge1xuXG4gICAgQElucHV0KCkgaWNvblBvczogJ2xlZnQnIHwgJ3JpZ2h0JyB8ICd0b3AnIHwgJ2JvdHRvbScgPSAnbGVmdCc7XG4gICAgICAgICAgICBcbiAgICBASW5wdXQoKSBsb2FkaW5nSWNvbjogc3RyaW5nID0gXCJwaSBwaS1zcGlubmVyIHBpLXNwaW5cIjtcblxuICAgIHB1YmxpYyBfbGFiZWw6IHN0cmluZztcbiAgICBcbiAgICBwdWJsaWMgX2ljb246IHN0cmluZztcblxuICAgIHB1YmxpYyBfbG9hZGluZzogYm9vbGVhbiA9IGZhbHNlO1xuICAgICAgICAgICAgXG4gICAgcHVibGljIGluaXRpYWxpemVkOiBib29sZWFuO1xuICAgIFxuICAgIHB1YmxpYyBfaW5pdGlhbFN0eWxlQ2xhc3M6IHN0cmluZztcblxuICAgIGNvbnN0cnVjdG9yKHB1YmxpYyBlbDogRWxlbWVudFJlZikge31cbiAgICBcbiAgICBuZ0FmdGVyVmlld0luaXQoKSB7XG4gICAgICAgIHRoaXMuX2luaXRpYWxTdHlsZUNsYXNzID0gdGhpcy5lbC5uYXRpdmVFbGVtZW50LmNsYXNzTmFtZTtcbiAgICAgICAgRG9tSGFuZGxlci5hZGRNdWx0aXBsZUNsYXNzZXModGhpcy5lbC5uYXRpdmVFbGVtZW50LCB0aGlzLmdldFN0eWxlQ2xhc3MoKSk7XG5cbiAgICAgICAgaWYgKHRoaXMuaWNvbikge1xuICAgICAgICAgICAgdGhpcy5jcmVhdGVJY29uRWwoKTtcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgbGV0IGxhYmVsRWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzcGFuXCIpO1xuICAgICAgICBpZiAodGhpcy5pY29uICYmICF0aGlzLmxhYmVsKSB7XG4gICAgICAgICAgICBsYWJlbEVsZW1lbnQuc2V0QXR0cmlidXRlKCdhcmlhLWhpZGRlbicsICd0cnVlJyk7XG4gICAgICAgIH1cbiAgICAgICAgbGFiZWxFbGVtZW50LmNsYXNzTmFtZSA9ICdwLWJ1dHRvbi1sYWJlbCc7XG5cbiAgICAgICAgaWYgKHRoaXMubGFiZWwpXG4gICAgICAgICAgICBsYWJlbEVsZW1lbnQuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUodGhpcy5sYWJlbCkpO1xuICAgICAgICBlbHNlIFxuICAgICAgICAgICAgbGFiZWxFbGVtZW50LmlubmVySFRNTCA9ICcmbmJzcDsnO1xuICAgICAgICBcbiAgICAgICAgdGhpcy5lbC5uYXRpdmVFbGVtZW50LmFwcGVuZENoaWxkKGxhYmVsRWxlbWVudCk7XG4gICAgICAgIHRoaXMuaW5pdGlhbGl6ZWQgPSB0cnVlO1xuICAgIH1cbiAgICAgICAgXG4gICAgZ2V0U3R5bGVDbGFzcygpOiBzdHJpbmcge1xuICAgICAgICBsZXQgc3R5bGVDbGFzcyA9ICdwLWJ1dHRvbiBwLWNvbXBvbmVudCc7XG4gICAgICAgIGlmICh0aGlzLmljb24gJiYgIXRoaXMubGFiZWwpIHtcbiAgICAgICAgICAgIHN0eWxlQ2xhc3MgPSBzdHlsZUNsYXNzICsgJyBwLWJ1dHRvbi1pY29uLW9ubHknO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMubG9hZGluZykge1xuICAgICAgICAgICAgc3R5bGVDbGFzcyA9IHN0eWxlQ2xhc3MgKyAnIHAtZGlzYWJsZWQgcC1idXR0b24tbG9hZGluZyc7XG4gICAgICAgICAgICBpZiAoIXRoaXMuaWNvbiAmJiB0aGlzLmxhYmVsKVxuICAgICAgICAgICAgICAgIHN0eWxlQ2xhc3MgPSBzdHlsZUNsYXNzICsgJyBwLWJ1dHRvbi1sb2FkaW5nLWxhYmVsLW9ubHknO1xuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICByZXR1cm4gc3R5bGVDbGFzcztcbiAgICB9XG5cbiAgICBzZXRTdHlsZUNsYXNzKCkge1xuICAgICAgICBsZXQgc3R5bGVDbGFzcyA9IHRoaXMuZ2V0U3R5bGVDbGFzcygpO1xuICAgICAgICB0aGlzLmVsLm5hdGl2ZUVsZW1lbnQuY2xhc3NOYW1lID0gc3R5bGVDbGFzcyArICcgJyArIHRoaXMuX2luaXRpYWxTdHlsZUNsYXNzO1xuICAgIH1cblxuICAgIGNyZWF0ZUljb25FbCgpIHtcbiAgICAgICAgbGV0IGljb25FbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInNwYW5cIik7XG4gICAgICAgIGljb25FbGVtZW50LmNsYXNzTmFtZSA9ICdwLWJ1dHRvbi1pY29uJztcbiAgICAgICAgaWNvbkVsZW1lbnQuc2V0QXR0cmlidXRlKFwiYXJpYS1oaWRkZW5cIiwgXCJ0cnVlXCIpO1xuICAgICAgICBsZXQgaWNvblBvc0NsYXNzID0gdGhpcy5sYWJlbCA/ICdwLWJ1dHRvbi1pY29uLScgKyB0aGlzLmljb25Qb3MgOiBudWxsO1xuICAgICAgICBcbiAgICAgICAgaWYgKGljb25Qb3NDbGFzcykge1xuICAgICAgICAgICAgRG9tSGFuZGxlci5hZGRDbGFzcyhpY29uRWxlbWVudCwgaWNvblBvc0NsYXNzKTtcbiAgICAgICAgfVxuXG4gICAgICAgIERvbUhhbmRsZXIuYWRkTXVsdGlwbGVDbGFzc2VzKGljb25FbGVtZW50LCB0aGlzLmdldEljb25DbGFzcygpKTtcbiAgICAgICAgbGV0IGxhYmVsRWwgPSBEb21IYW5kbGVyLmZpbmRTaW5nbGUodGhpcy5lbC5uYXRpdmVFbGVtZW50LCAnLnAtYnV0dG9uLWxhYmVsJylcblxuICAgICAgICBpZiAobGFiZWxFbClcbiAgICAgICAgICAgIHRoaXMuZWwubmF0aXZlRWxlbWVudC5pbnNlcnRCZWZvcmUoaWNvbkVsZW1lbnQsIGxhYmVsRWwpO1xuICAgICAgICBlbHNlXG4gICAgICAgICAgICB0aGlzLmVsLm5hdGl2ZUVsZW1lbnQuYXBwZW5kQ2hpbGQoaWNvbkVsZW1lbnQpXG4gICAgfVxuXG4gICAgZ2V0SWNvbkNsYXNzKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5sb2FkaW5nID8gJ3AtYnV0dG9uLWxvYWRpbmctaWNvbiAnICsgdGhpcy5sb2FkaW5nSWNvbiA6IHRoaXMuX2ljb247XG4gICAgfVxuXG4gICAgc2V0SWNvbkNsYXNzKCkge1xuICAgICAgICBsZXQgaWNvbkVsZW1lbnQgPSBEb21IYW5kbGVyLmZpbmRTaW5nbGUodGhpcy5lbC5uYXRpdmVFbGVtZW50LCAnLnAtYnV0dG9uLWljb24nKTtcbiAgICAgICAgaWYgKGljb25FbGVtZW50KSB7XG4gICAgICAgICAgICBpZiAodGhpcy5pY29uUG9zKSBcbiAgICAgICAgICAgICAgICBpY29uRWxlbWVudC5jbGFzc05hbWUgPSAncC1idXR0b24taWNvbiBwLWJ1dHRvbi1pY29uLScgKyB0aGlzLmljb25Qb3MgKyAnICcgKyB0aGlzLmdldEljb25DbGFzcygpO1xuICAgICAgICAgICAgZWxzZSBcbiAgICAgICAgICAgICAgICBpY29uRWxlbWVudC5jbGFzc05hbWUgPSAncC1idXR0b24taWNvbiAnICsgdGhpcy5nZXRJY29uQ2xhc3MoKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuY3JlYXRlSWNvbkVsKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZW1vdmVJY29uRWxlbWVudCgpIHtcbiAgICAgICAgbGV0IGljb25FbGVtZW50ID0gRG9tSGFuZGxlci5maW5kU2luZ2xlKHRoaXMuZWwubmF0aXZlRWxlbWVudCwgJy5wLWJ1dHRvbi1pY29uJyk7XG4gICAgICAgIHRoaXMuZWwubmF0aXZlRWxlbWVudC5yZW1vdmVDaGlsZChpY29uRWxlbWVudClcbiAgICB9XG4gICAgXG4gICAgQElucHV0KCkgZ2V0IGxhYmVsKCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiB0aGlzLl9sYWJlbDtcbiAgICB9XG5cbiAgICBzZXQgbGFiZWwodmFsOiBzdHJpbmcpIHtcbiAgICAgICAgdGhpcy5fbGFiZWwgPSB2YWw7XG4gICAgICAgIFxuICAgICAgICBpZiAodGhpcy5pbml0aWFsaXplZCkge1xuICAgICAgICAgICAgRG9tSGFuZGxlci5maW5kU2luZ2xlKHRoaXMuZWwubmF0aXZlRWxlbWVudCwgJy5wLWJ1dHRvbi1sYWJlbCcpLnRleHRDb250ZW50ID0gdGhpcy5fbGFiZWwgfHwgJyZuYnNwOyc7XG4gICAgICAgICAgICB0aGlzLnNldFN0eWxlQ2xhc3MoKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBcbiAgICBASW5wdXQoKSBnZXQgaWNvbigpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gdGhpcy5faWNvbjtcbiAgICB9XG5cbiAgICBzZXQgaWNvbih2YWw6IHN0cmluZykge1xuICAgICAgICB0aGlzLl9pY29uID0gdmFsO1xuICAgICAgICBcbiAgICAgICAgaWYgKHRoaXMuaW5pdGlhbGl6ZWQpIHtcbiAgICAgICAgICAgIHRoaXMuc2V0SWNvbkNsYXNzKCk7XG4gICAgICAgICAgICB0aGlzLnNldFN0eWxlQ2xhc3MoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIEBJbnB1dCgpIGdldCBsb2FkaW5nKCk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gdGhpcy5fbG9hZGluZztcbiAgICB9XG5cbiAgICBzZXQgbG9hZGluZyh2YWw6IGJvb2xlYW4pIHtcbiAgICAgICAgdGhpcy5fbG9hZGluZyA9IHZhbDtcbiAgICAgICAgXG4gICAgICAgIGlmICh0aGlzLmluaXRpYWxpemVkKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5sb2FkaW5nIHx8IHRoaXMuaWNvbilcbiAgICAgICAgICAgICAgICB0aGlzLnNldEljb25DbGFzcygpO1xuICAgICAgICAgICAgZWxzZSBcbiAgICAgICAgICAgICAgICB0aGlzLnJlbW92ZUljb25FbGVtZW50KCk7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIHRoaXMuc2V0U3R5bGVDbGFzcygpO1xuICAgICAgICB9XG4gICAgfVxuICAgIFxuICAgIG5nT25EZXN0cm95KCkge1xuICAgICAgICB0aGlzLmluaXRpYWxpemVkID0gZmFsc2U7XG4gICAgfVxufVxuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ3AtYnV0dG9uJyxcbiAgICB0ZW1wbGF0ZTogYFxuICAgICAgICA8YnV0dG9uIFthdHRyLnR5cGVdPVwidHlwZVwiIFtjbGFzc109XCJzdHlsZUNsYXNzXCIgW25nU3R5bGVdPVwic3R5bGVcIiBbZGlzYWJsZWRdPVwiZGlzYWJsZWQgfHwgbG9hZGluZ1wiXG4gICAgICAgICAgICBbbmdDbGFzc109XCJ7J3AtYnV0dG9uIHAtY29tcG9uZW50Jzp0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgJ3AtYnV0dG9uLWljb24tb25seSc6IChpY29uICYmICFsYWJlbCksXG4gICAgICAgICAgICAgICAgICAgICAgICAncC1idXR0b24tdmVydGljYWwnOiAoaWNvblBvcyA9PT0gJ3RvcCcgfHwgaWNvblBvcyA9PT0gJ2JvdHRvbScpICYmIGxhYmVsLFxuICAgICAgICAgICAgICAgICAgICAgICAgJ3AtZGlzYWJsZWQnOiB0aGlzLmRpc2FibGVkIHx8IHRoaXMubG9hZGluZyxcbiAgICAgICAgICAgICAgICAgICAgICAgICdwLWJ1dHRvbi1sb2FkaW5nJzogdGhpcy5sb2FkaW5nLFxuICAgICAgICAgICAgICAgICAgICAgICAgJ3AtYnV0dG9uLWxvYWRpbmctbGFiZWwtb25seSc6IHRoaXMubG9hZGluZyAmJiAhdGhpcy5pY29uICYmIHRoaXMubGFiZWx9XCJcbiAgICAgICAgICAgICAgICAgICAgICAgIChjbGljayk9XCJvbkNsaWNrLmVtaXQoJGV2ZW50KVwiIChmb2N1cyk9XCJvbkZvY3VzLmVtaXQoJGV2ZW50KVwiIChibHVyKT1cIm9uQmx1ci5lbWl0KCRldmVudClcIiBwUmlwcGxlPlxuICAgICAgICAgICAgPG5nLWNvbnRlbnQ+PC9uZy1jb250ZW50PlxuICAgICAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdUZW1wbGF0ZU91dGxldD1cImNvbnRlbnRUZW1wbGF0ZVwiPjwvbmctY29udGFpbmVyPlxuICAgICAgICAgICAgPHNwYW4gW25nQ2xhc3NdPVwieydwLWJ1dHRvbi1pY29uJzogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICdwLWJ1dHRvbi1pY29uLWxlZnQnOiBpY29uUG9zID09PSAnbGVmdCcgJiYgbGFiZWwsXG4gICAgICAgICAgICAgICAgICAgICAgICAncC1idXR0b24taWNvbi1yaWdodCc6IGljb25Qb3MgPT09ICdyaWdodCcgJiYgbGFiZWwsXG4gICAgICAgICAgICAgICAgICAgICAgICAncC1idXR0b24taWNvbi10b3AnOiBpY29uUG9zID09PSAndG9wJyAmJiBsYWJlbCxcbiAgICAgICAgICAgICAgICAgICAgICAgICdwLWJ1dHRvbi1pY29uLWJvdHRvbSc6IGljb25Qb3MgPT09ICdib3R0b20nICYmIGxhYmVsfVwiXG4gICAgICAgICAgICAgICAgICAgICAgICBbY2xhc3NdPVwibG9hZGluZyA/ICdwLWJ1dHRvbi1sb2FkaW5nLWljb24gJyArIGxvYWRpbmdJY29uIDogaWNvblwiICpuZ0lmPVwiIWNvbnRlbnRUZW1wbGF0ZSAmJiAoaWNvbnx8bG9hZGluZylcIiBbYXR0ci5hcmlhLWhpZGRlbl09XCJ0cnVlXCI+PC9zcGFuPlxuICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJwLWJ1dHRvbi1sYWJlbFwiIFthdHRyLmFyaWEtaGlkZGVuXT1cImljb24gJiYgIWxhYmVsXCIgKm5nSWY9XCIhY29udGVudFRlbXBsYXRlXCI+e3tsYWJlbHx8JyZuYnNwOyd9fTwvc3Bhbj5cbiAgICAgICAgICAgIDxzcGFuIFtuZ0NsYXNzXT1cImJhZGdlU3R5bGVDbGFzcygpXCIgW2NsYXNzXT1cImJhZGdlQ2xhc3NcIiAqbmdJZj1cIiFjb250ZW50VGVtcGxhdGUgJiYgYmFkZ2VcIj57e2JhZGdlfX08L3NwYW4+XG4gICAgICAgIDwvYnV0dG9uPlxuICAgIGAsXG4gICAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG4gICAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZVxufSlcbmV4cG9ydCBjbGFzcyBCdXR0b24gaW1wbGVtZW50cyBBZnRlckNvbnRlbnRJbml0IHtcblxuICAgIEBJbnB1dCgpIHR5cGU6IHN0cmluZyA9IFwiYnV0dG9uXCI7XG5cbiAgICBASW5wdXQoKSBpY29uUG9zOiBzdHJpbmcgPSAnbGVmdCc7XG5cbiAgICBASW5wdXQoKSBpY29uOiBzdHJpbmc7XG5cbiAgICBASW5wdXQoKSBiYWRnZTogc3RyaW5nO1xuXG4gICAgQElucHV0KCkgbGFiZWw6IHN0cmluZztcblxuICAgIEBJbnB1dCgpIGRpc2FibGVkOiBib29sZWFuO1xuXG4gICAgQElucHV0KCkgbG9hZGluZzogYm9vbGVhbiA9IGZhbHNlO1xuXG4gICAgQElucHV0KCkgbG9hZGluZ0ljb246IHN0cmluZyA9IFwicGkgcGktc3Bpbm5lciBwaS1zcGluXCI7XG5cbiAgICBASW5wdXQoKSBzdHlsZTogYW55O1xuXG4gICAgQElucHV0KCkgc3R5bGVDbGFzczogc3RyaW5nO1xuXG4gICAgQElucHV0KCkgYmFkZ2VDbGFzczogc3RyaW5nO1xuXG4gICAgY29udGVudFRlbXBsYXRlOiBUZW1wbGF0ZVJlZjxhbnk+O1xuXG4gICAgQENvbnRlbnRDaGlsZHJlbihQcmltZVRlbXBsYXRlKSB0ZW1wbGF0ZXM6IFF1ZXJ5TGlzdDxhbnk+O1xuXG4gICAgQE91dHB1dCgpIG9uQ2xpY2s6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG4gICAgQE91dHB1dCgpIG9uRm9jdXM6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG4gICAgQE91dHB1dCgpIG9uQmx1cjogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgICBuZ0FmdGVyQ29udGVudEluaXQoKSB7XG4gICAgICAgIHRoaXMudGVtcGxhdGVzLmZvckVhY2goKGl0ZW0pID0+IHtcbiAgICAgICAgICAgIHN3aXRjaChpdGVtLmdldFR5cGUoKSkge1xuICAgICAgICAgICAgICAgIGNhc2UgJ2NvbnRlbnQnOlxuICAgICAgICAgICAgICAgICAgICB0aGlzLmNvbnRlbnRUZW1wbGF0ZSA9IGl0ZW0udGVtcGxhdGU7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jb250ZW50VGVtcGxhdGUgPSBpdGVtLnRlbXBsYXRlO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBiYWRnZVN0eWxlQ2xhc3MoKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAncC1iYWRnZSBwLWNvbXBvbmVudCc6IHRydWUsXG4gICAgICAgICAgICAncC1iYWRnZS1uby1ndXR0ZXInOiB0aGlzLmJhZGdlICYmIFN0cmluZyh0aGlzLmJhZGdlKS5sZW5ndGggPT09IDFcbiAgICAgICAgfVxuICAgIH1cbn1cblxuQE5nTW9kdWxlKHtcbiAgICBpbXBvcnRzOiBbQ29tbW9uTW9kdWxlLFJpcHBsZU1vZHVsZV0sXG4gICAgZXhwb3J0czogW0J1dHRvbkRpcmVjdGl2ZSxCdXR0b25dLFxuICAgIGRlY2xhcmF0aW9uczogW0J1dHRvbkRpcmVjdGl2ZSxCdXR0b25dXG59KVxuZXhwb3J0IGNsYXNzIEJ1dHRvbk1vZHVsZSB7IH1cbiJdfQ==