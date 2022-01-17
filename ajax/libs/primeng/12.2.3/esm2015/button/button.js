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
        if (this.icon || this.loading) {
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
        let iconClass = this.getIconClass();
        if (iconClass) {
            DomHandler.addMultipleClasses(iconElement, iconClass);
        }
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
            if (this.loading || this.icon) {
                this.setIconClass();
            }
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
ButtonDirective.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0, type: ButtonDirective, deps: [{ token: i0.ElementRef }], target: i0.ɵɵFactoryTarget.Directive });
ButtonDirective.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "12.0.5", type: ButtonDirective, selector: "[pButton]", inputs: { iconPos: "iconPos", loadingIcon: "loadingIcon", label: "label", icon: "icon", loading: "loading" }, host: { classAttribute: "p-element" }, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0, type: ButtonDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: '[pButton]',
                    host: {
                        'class': 'p-element'
                    }
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
Button.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0, type: Button, deps: [], target: i0.ɵɵFactoryTarget.Component });
Button.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.0.5", type: Button, selector: "p-button", inputs: { type: "type", iconPos: "iconPos", icon: "icon", badge: "badge", label: "label", disabled: "disabled", loading: "loading", loadingIcon: "loadingIcon", style: "style", styleClass: "styleClass", badgeClass: "badgeClass" }, outputs: { onClick: "onClick", onFocus: "onFocus", onBlur: "onBlur" }, host: { classAttribute: "p-element" }, queries: [{ propertyName: "templates", predicate: PrimeTemplate }], ngImport: i0, template: `
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
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0, type: Button, decorators: [{
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
                    encapsulation: ViewEncapsulation.None,
                    host: {
                        'class': 'p-element'
                    }
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
ButtonModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0, type: ButtonModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
ButtonModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0, type: ButtonModule, declarations: [ButtonDirective, Button], imports: [CommonModule, RippleModule], exports: [ButtonDirective, Button] });
ButtonModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0, type: ButtonModule, imports: [[CommonModule, RippleModule]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0, type: ButtonModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule, RippleModule],
                    exports: [ButtonDirective, Button],
                    declarations: [ButtonDirective, Button]
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnV0dG9uLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2FwcC9jb21wb25lbnRzL2J1dHRvbi9idXR0b24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFDLFFBQVEsRUFBQyxTQUFTLEVBQUMsU0FBUyxFQUFZLFlBQVksRUFBZSxNQUFNLEVBQVcsS0FBSyxFQUFDLHVCQUF1QixFQUFFLGlCQUFpQixFQUFFLGVBQWUsRUFBMkMsTUFBTSxlQUFlLENBQUM7QUFDOU4sT0FBTyxFQUFDLFVBQVUsRUFBQyxNQUFNLGFBQWEsQ0FBQztBQUN2QyxPQUFPLEVBQUMsWUFBWSxFQUFDLE1BQU0saUJBQWlCLENBQUM7QUFDN0MsT0FBTyxFQUFDLFlBQVksRUFBQyxNQUFNLGdCQUFnQixDQUFDO0FBQzVDLE9BQU8sRUFBQyxhQUFhLEVBQUMsTUFBTSxhQUFhLENBQUM7Ozs7QUFRMUMsTUFBTSxPQUFPLGVBQWU7SUFnQnhCLFlBQW1CLEVBQWM7UUFBZCxPQUFFLEdBQUYsRUFBRSxDQUFZO1FBZHhCLFlBQU8sR0FBd0MsTUFBTSxDQUFDO1FBRXRELGdCQUFXLEdBQVcsdUJBQXVCLENBQUM7UUFNaEQsYUFBUSxHQUFZLEtBQUssQ0FBQztJQU1HLENBQUM7SUFFckMsZUFBZTtRQUNYLElBQUksQ0FBQyxrQkFBa0IsR0FBRyxJQUFJLENBQUMsRUFBRSxDQUFDLGFBQWEsQ0FBQyxTQUFTLENBQUM7UUFDMUQsVUFBVSxDQUFDLGtCQUFrQixDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsYUFBYSxFQUFFLElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQyxDQUFDO1FBRTNFLElBQUksSUFBSSxDQUFDLElBQUksSUFBSSxJQUFJLENBQUMsT0FBTyxFQUFFO1lBQzNCLElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQztTQUN2QjtRQUVELElBQUksWUFBWSxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDbEQsSUFB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QkFBYixLQUFLO2dCQUVHLEtBQUs7c0JBQWIsS0FBSztnQkFFRyxRQUFRO3NCQUFoQixLQUFLO2dCQUVHLE9BQU87c0JBQWYsS0FBSztnQkFFRyxXQUFXO3NCQUFuQixLQUFLO2dCQUVHLEtBQUs7c0JBQWIsS0FBSztnQkFFRyxVQUFVO3NCQUFsQixLQUFLO2dCQUVHLFVBQVU7c0JBQWxCLEtBQUs7Z0JBSTBCLFNBQVM7c0JBQXhDLGVBQWU7dUJBQUMsYUFBYTtnQkFFcEIsT0FBTztzQkFBaEIsTUFBTTtnQkFFRyxPQUFPO3NCQUFoQixNQUFNO2dCQUVHLE1BQU07c0JBQWYsTUFBTTs7QUE2QlgsTUFBTSxPQUFPLFlBQVk7O3lHQUFaLFlBQVk7MEdBQVosWUFBWSxpQkF6UFosZUFBZSxFQTRMZixNQUFNLGFBeURMLFlBQVksRUFBQyxZQUFZLGFBclAxQixlQUFlLEVBNExmLE1BQU07MEdBNkROLFlBQVksWUFKWixDQUFDLFlBQVksRUFBQyxZQUFZLENBQUM7MkZBSTNCLFlBQVk7a0JBTHhCLFFBQVE7bUJBQUM7b0JBQ04sT0FBTyxFQUFFLENBQUMsWUFBWSxFQUFDLFlBQVksQ0FBQztvQkFDcEMsT0FBTyxFQUFFLENBQUMsZUFBZSxFQUFDLE1BQU0sQ0FBQztvQkFDakMsWUFBWSxFQUFFLENBQUMsZUFBZSxFQUFDLE1BQU0sQ0FBQztpQkFDekMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge05nTW9kdWxlLERpcmVjdGl2ZSxDb21wb25lbnQsRWxlbWVudFJlZixFdmVudEVtaXR0ZXIsQWZ0ZXJWaWV3SW5pdCxPdXRwdXQsT25EZXN0cm95LElucHV0LENoYW5nZURldGVjdGlvblN0cmF0ZWd5LCBWaWV3RW5jYXBzdWxhdGlvbiwgQ29udGVudENoaWxkcmVuLCBBZnRlckNvbnRlbnRJbml0LCBUZW1wbGF0ZVJlZiwgUXVlcnlMaXN0fSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7RG9tSGFuZGxlcn0gZnJvbSAncHJpbWVuZy9kb20nO1xuaW1wb3J0IHtDb21tb25Nb2R1bGV9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQge1JpcHBsZU1vZHVsZX0gZnJvbSAncHJpbWVuZy9yaXBwbGUnO1xuaW1wb3J0IHtQcmltZVRlbXBsYXRlfSBmcm9tICdwcmltZW5nL2FwaSc7XG5cbkBEaXJlY3RpdmUoe1xuICAgIHNlbGVjdG9yOiAnW3BCdXR0b25dJyxcbiAgICBob3N0OiB7XG4gICAgICAgICdjbGFzcyc6ICdwLWVsZW1lbnQnXG4gICAgfVxufSlcbmV4cG9ydCBjbGFzcyBCdXR0b25EaXJlY3RpdmUgaW1wbGVtZW50cyBBZnRlclZpZXdJbml0LCBPbkRlc3Ryb3kge1xuXG4gICAgQElucHV0KCkgaWNvblBvczogJ2xlZnQnIHwgJ3JpZ2h0JyB8ICd0b3AnIHwgJ2JvdHRvbScgPSAnbGVmdCc7XG5cbiAgICBASW5wdXQoKSBsb2FkaW5nSWNvbjogc3RyaW5nID0gXCJwaSBwaS1zcGlubmVyIHBpLXNwaW5cIjtcblxuICAgIHB1YmxpYyBfbGFiZWw6IHN0cmluZztcblxuICAgIHB1YmxpYyBfaWNvbjogc3RyaW5nO1xuXG4gICAgcHVibGljIF9sb2FkaW5nOiBib29sZWFuID0gZmFsc2U7XG5cbiAgICBwdWJsaWMgaW5pdGlhbGl6ZWQ6IGJvb2xlYW47XG5cbiAgICBwdWJsaWMgX2luaXRpYWxTdHlsZUNsYXNzOiBzdHJpbmc7XG5cbiAgICBjb25zdHJ1Y3RvcihwdWJsaWMgZWw6IEVsZW1lbnRSZWYpIHt9XG5cbiAgICBuZ0FmdGVyVmlld0luaXQoKSB7XG4gICAgICAgIHRoaXMuX2luaXRpYWxTdHlsZUNsYXNzID0gdGhpcy5lbC5uYXRpdmVFbGVtZW50LmNsYXNzTmFtZTtcbiAgICAgICAgRG9tSGFuZGxlci5hZGRNdWx0aXBsZUNsYXNzZXModGhpcy5lbC5uYXRpdmVFbGVtZW50LCB0aGlzLmdldFN0eWxlQ2xhc3MoKSk7XG5cbiAgICAgICAgaWYgKHRoaXMuaWNvbiB8fCB0aGlzLmxvYWRpbmcpIHtcbiAgICAgICAgICAgIHRoaXMuY3JlYXRlSWNvbkVsKCk7XG4gICAgICAgIH1cblxuICAgICAgICBsZXQgbGFiZWxFbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInNwYW5cIik7XG4gICAgICAgIGlmICh0aGlzLmljb24gJiYgIXRoaXMubGFiZWwpIHtcbiAgICAgICAgICAgIGxhYmVsRWxlbWVudC5zZXRBdHRyaWJ1dGUoJ2FyaWEtaGlkZGVuJywgJ3RydWUnKTtcbiAgICAgICAgfVxuICAgICAgICBsYWJlbEVsZW1lbnQuY2xhc3NOYW1lID0gJ3AtYnV0dG9uLWxhYmVsJztcblxuICAgICAgICBpZiAodGhpcy5sYWJlbClcbiAgICAgICAgICAgIGxhYmVsRWxlbWVudC5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZSh0aGlzLmxhYmVsKSk7XG4gICAgICAgIGVsc2VcbiAgICAgICAgICAgIGxhYmVsRWxlbWVudC5pbm5lckhUTUwgPSAnJm5ic3A7JztcblxuICAgICAgICB0aGlzLmVsLm5hdGl2ZUVsZW1lbnQuYXBwZW5kQ2hpbGQobGFiZWxFbGVtZW50KTtcbiAgICAgICAgdGhpcy5pbml0aWFsaXplZCA9IHRydWU7XG4gICAgfVxuXG4gICAgZ2V0U3R5bGVDbGFzcygpOiBzdHJpbmcge1xuICAgICAgICBsZXQgc3R5bGVDbGFzcyA9ICdwLWJ1dHRvbiBwLWNvbXBvbmVudCc7XG4gICAgICAgIGlmICh0aGlzLmljb24gJiYgIXRoaXMubGFiZWwpIHtcbiAgICAgICAgICAgIHN0eWxlQ2xhc3MgPSBzdHlsZUNsYXNzICsgJyBwLWJ1dHRvbi1pY29uLW9ubHknO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMubG9hZGluZykge1xuICAgICAgICAgICAgc3R5bGVDbGFzcyA9IHN0eWxlQ2xhc3MgKyAnIHAtZGlzYWJsZWQgcC1idXR0b24tbG9hZGluZyc7XG4gICAgICAgICAgICBpZiAoIXRoaXMuaWNvbiAmJiB0aGlzLmxhYmVsKVxuICAgICAgICAgICAgICAgIHN0eWxlQ2xhc3MgPSBzdHlsZUNsYXNzICsgJyBwLWJ1dHRvbi1sb2FkaW5nLWxhYmVsLW9ubHknO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHN0eWxlQ2xhc3M7XG4gICAgfVxuXG4gICAgc2V0U3R5bGVDbGFzcygpIHtcbiAgICAgICAgbGV0IHN0eWxlQ2xhc3MgPSB0aGlzLmdldFN0eWxlQ2xhc3MoKTtcbiAgICAgICAgdGhpcy5lbC5uYXRpdmVFbGVtZW50LmNsYXNzTmFtZSA9IHN0eWxlQ2xhc3MgKyAnICcgKyB0aGlzLl9pbml0aWFsU3R5bGVDbGFzcztcbiAgICB9XG5cbiAgICBjcmVhdGVJY29uRWwoKSB7XG4gICAgICAgIGxldCBpY29uRWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzcGFuXCIpO1xuICAgICAgICBpY29uRWxlbWVudC5jbGFzc05hbWUgPSAncC1idXR0b24taWNvbic7XG4gICAgICAgIGljb25FbGVtZW50LnNldEF0dHJpYnV0ZShcImFyaWEtaGlkZGVuXCIsIFwidHJ1ZVwiKTtcbiAgICAgICAgbGV0IGljb25Qb3NDbGFzcyA9IHRoaXMubGFiZWwgPyAncC1idXR0b24taWNvbi0nICsgdGhpcy5pY29uUG9zIDogbnVsbDtcblxuICAgICAgICBpZiAoaWNvblBvc0NsYXNzKSB7XG4gICAgICAgICAgICBEb21IYW5kbGVyLmFkZENsYXNzKGljb25FbGVtZW50LCBpY29uUG9zQ2xhc3MpO1xuICAgICAgICB9XG5cbiAgICAgICAgbGV0IGljb25DbGFzcyA9IHRoaXMuZ2V0SWNvbkNsYXNzKCk7XG5cbiAgICAgICAgaWYoaWNvbkNsYXNzKSB7XG4gICAgICAgICAgICBEb21IYW5kbGVyLmFkZE11bHRpcGxlQ2xhc3NlcyhpY29uRWxlbWVudCwgaWNvbkNsYXNzKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGxldCBsYWJlbEVsID0gRG9tSGFuZGxlci5maW5kU2luZ2xlKHRoaXMuZWwubmF0aXZlRWxlbWVudCwgJy5wLWJ1dHRvbi1sYWJlbCcpXG5cbiAgICAgICAgaWYgKGxhYmVsRWwpXG4gICAgICAgICAgICB0aGlzLmVsLm5hdGl2ZUVsZW1lbnQuaW5zZXJ0QmVmb3JlKGljb25FbGVtZW50LCBsYWJlbEVsKTtcbiAgICAgICAgZWxzZVxuICAgICAgICAgICAgdGhpcy5lbC5uYXRpdmVFbGVtZW50LmFwcGVuZENoaWxkKGljb25FbGVtZW50KVxuICAgIH1cblxuICAgIGdldEljb25DbGFzcygpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMubG9hZGluZyA/ICdwLWJ1dHRvbi1sb2FkaW5nLWljb24gJyArIHRoaXMubG9hZGluZ0ljb24gOiB0aGlzLl9pY29uO1xuICAgIH1cblxuICAgIHNldEljb25DbGFzcygpIHtcbiAgICAgICAgbGV0IGljb25FbGVtZW50ID0gRG9tSGFuZGxlci5maW5kU2luZ2xlKHRoaXMuZWwubmF0aXZlRWxlbWVudCwgJy5wLWJ1dHRvbi1pY29uJyk7XG4gICAgICAgIGlmIChpY29uRWxlbWVudCkge1xuICAgICAgICAgICAgaWYgKHRoaXMuaWNvblBvcylcbiAgICAgICAgICAgICAgICBpY29uRWxlbWVudC5jbGFzc05hbWUgPSAncC1idXR0b24taWNvbiBwLWJ1dHRvbi1pY29uLScgKyB0aGlzLmljb25Qb3MgKyAnICcgKyB0aGlzLmdldEljb25DbGFzcygpO1xuICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAgIGljb25FbGVtZW50LmNsYXNzTmFtZSA9ICdwLWJ1dHRvbi1pY29uICcgKyB0aGlzLmdldEljb25DbGFzcygpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5jcmVhdGVJY29uRWwoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJlbW92ZUljb25FbGVtZW50KCkge1xuICAgICAgICBsZXQgaWNvbkVsZW1lbnQgPSBEb21IYW5kbGVyLmZpbmRTaW5nbGUodGhpcy5lbC5uYXRpdmVFbGVtZW50LCAnLnAtYnV0dG9uLWljb24nKTtcbiAgICAgICAgdGhpcy5lbC5uYXRpdmVFbGVtZW50LnJlbW92ZUNoaWxkKGljb25FbGVtZW50KTtcbiAgICB9XG5cbiAgICBASW5wdXQoKSBnZXQgbGFiZWwoKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2xhYmVsO1xuICAgIH1cblxuICAgIHNldCBsYWJlbCh2YWw6IHN0cmluZykge1xuICAgICAgICB0aGlzLl9sYWJlbCA9IHZhbDtcblxuICAgICAgICBpZiAodGhpcy5pbml0aWFsaXplZCkge1xuICAgICAgICAgICAgRG9tSGFuZGxlci5maW5kU2luZ2xlKHRoaXMuZWwubmF0aXZlRWxlbWVudCwgJy5wLWJ1dHRvbi1sYWJlbCcpLnRleHRDb250ZW50ID0gdGhpcy5fbGFiZWwgfHwgJyZuYnNwOyc7XG5cbiAgICAgICAgICAgIGlmICh0aGlzLmxvYWRpbmcgfHwgdGhpcy5pY29uKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zZXRJY29uQ2xhc3MoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMuc2V0U3R5bGVDbGFzcygpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgQElucHV0KCkgZ2V0IGljb24oKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2ljb247XG4gICAgfVxuXG4gICAgc2V0IGljb24odmFsOiBzdHJpbmcpIHtcbiAgICAgICAgdGhpcy5faWNvbiA9IHZhbDtcblxuICAgICAgICBpZiAodGhpcy5pbml0aWFsaXplZCkge1xuICAgICAgICAgICAgdGhpcy5zZXRJY29uQ2xhc3MoKTtcbiAgICAgICAgICAgIHRoaXMuc2V0U3R5bGVDbGFzcygpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgQElucHV0KCkgZ2V0IGxvYWRpbmcoKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiB0aGlzLl9sb2FkaW5nO1xuICAgIH1cblxuICAgIHNldCBsb2FkaW5nKHZhbDogYm9vbGVhbikge1xuICAgICAgICB0aGlzLl9sb2FkaW5nID0gdmFsO1xuXG4gICAgICAgIGlmICh0aGlzLmluaXRpYWxpemVkKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5sb2FkaW5nIHx8IHRoaXMuaWNvbilcbiAgICAgICAgICAgICAgICB0aGlzLnNldEljb25DbGFzcygpO1xuICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAgIHRoaXMucmVtb3ZlSWNvbkVsZW1lbnQoKTtcblxuICAgICAgICAgICAgdGhpcy5zZXRTdHlsZUNsYXNzKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBuZ09uRGVzdHJveSgpIHtcbiAgICAgICAgdGhpcy5pbml0aWFsaXplZCA9IGZhbHNlO1xuICAgIH1cbn1cblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICdwLWJ1dHRvbicsXG4gICAgdGVtcGxhdGU6IGBcbiAgICAgICAgPGJ1dHRvbiBbYXR0ci50eXBlXT1cInR5cGVcIiBbY2xhc3NdPVwic3R5bGVDbGFzc1wiIFtuZ1N0eWxlXT1cInN0eWxlXCIgW2Rpc2FibGVkXT1cImRpc2FibGVkIHx8IGxvYWRpbmdcIlxuICAgICAgICAgICAgW25nQ2xhc3NdPVwieydwLWJ1dHRvbiBwLWNvbXBvbmVudCc6dHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICdwLWJ1dHRvbi1pY29uLW9ubHknOiAoaWNvbiAmJiAhbGFiZWwpLFxuICAgICAgICAgICAgICAgICAgICAgICAgJ3AtYnV0dG9uLXZlcnRpY2FsJzogKGljb25Qb3MgPT09ICd0b3AnIHx8IGljb25Qb3MgPT09ICdib3R0b20nKSAmJiBsYWJlbCxcbiAgICAgICAgICAgICAgICAgICAgICAgICdwLWRpc2FibGVkJzogdGhpcy5kaXNhYmxlZCB8fCB0aGlzLmxvYWRpbmcsXG4gICAgICAgICAgICAgICAgICAgICAgICAncC1idXR0b24tbG9hZGluZyc6IHRoaXMubG9hZGluZyxcbiAgICAgICAgICAgICAgICAgICAgICAgICdwLWJ1dHRvbi1sb2FkaW5nLWxhYmVsLW9ubHknOiB0aGlzLmxvYWRpbmcgJiYgIXRoaXMuaWNvbiAmJiB0aGlzLmxhYmVsfVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAoY2xpY2spPVwib25DbGljay5lbWl0KCRldmVudClcIiAoZm9jdXMpPVwib25Gb2N1cy5lbWl0KCRldmVudClcIiAoYmx1cik9XCJvbkJsdXIuZW1pdCgkZXZlbnQpXCIgcFJpcHBsZT5cbiAgICAgICAgICAgIDxuZy1jb250ZW50PjwvbmctY29udGVudD5cbiAgICAgICAgICAgIDxuZy1jb250YWluZXIgKm5nVGVtcGxhdGVPdXRsZXQ9XCJjb250ZW50VGVtcGxhdGVcIj48L25nLWNvbnRhaW5lcj5cbiAgICAgICAgICAgIDxzcGFuIFtuZ0NsYXNzXT1cInsncC1idXR0b24taWNvbic6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICAgICAncC1idXR0b24taWNvbi1sZWZ0JzogaWNvblBvcyA9PT0gJ2xlZnQnICYmIGxhYmVsLFxuICAgICAgICAgICAgICAgICAgICAgICAgJ3AtYnV0dG9uLWljb24tcmlnaHQnOiBpY29uUG9zID09PSAncmlnaHQnICYmIGxhYmVsLFxuICAgICAgICAgICAgICAgICAgICAgICAgJ3AtYnV0dG9uLWljb24tdG9wJzogaWNvblBvcyA9PT0gJ3RvcCcgJiYgbGFiZWwsXG4gICAgICAgICAgICAgICAgICAgICAgICAncC1idXR0b24taWNvbi1ib3R0b20nOiBpY29uUG9zID09PSAnYm90dG9tJyAmJiBsYWJlbH1cIlxuICAgICAgICAgICAgICAgICAgICAgICAgW2NsYXNzXT1cImxvYWRpbmcgPyAncC1idXR0b24tbG9hZGluZy1pY29uICcgKyBsb2FkaW5nSWNvbiA6IGljb25cIiAqbmdJZj1cIiFjb250ZW50VGVtcGxhdGUgJiYgKGljb258fGxvYWRpbmcpXCIgW2F0dHIuYXJpYS1oaWRkZW5dPVwidHJ1ZVwiPjwvc3Bhbj5cbiAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwicC1idXR0b24tbGFiZWxcIiBbYXR0ci5hcmlhLWhpZGRlbl09XCJpY29uICYmICFsYWJlbFwiICpuZ0lmPVwiIWNvbnRlbnRUZW1wbGF0ZVwiPnt7bGFiZWx8fCcmbmJzcDsnfX08L3NwYW4+XG4gICAgICAgICAgICA8c3BhbiBbbmdDbGFzc109XCJiYWRnZVN0eWxlQ2xhc3MoKVwiIFtjbGFzc109XCJiYWRnZUNsYXNzXCIgKm5nSWY9XCIhY29udGVudFRlbXBsYXRlICYmIGJhZGdlXCI+e3tiYWRnZX19PC9zcGFuPlxuICAgICAgICA8L2J1dHRvbj5cbiAgICBgLFxuICAgIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxuICAgIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmUsXG4gICAgaG9zdDoge1xuICAgICAgICAnY2xhc3MnOiAncC1lbGVtZW50J1xuICAgIH1cbn0pXG5leHBvcnQgY2xhc3MgQnV0dG9uIGltcGxlbWVudHMgQWZ0ZXJDb250ZW50SW5pdCB7XG5cbiAgICBASW5wdXQoKSB0eXBlOiBzdHJpbmcgPSBcImJ1dHRvblwiO1xuXG4gICAgQElucHV0KCkgaWNvblBvczogc3RyaW5nID0gJ2xlZnQnO1xuXG4gICAgQElucHV0KCkgaWNvbjogc3RyaW5nO1xuXG4gICAgQElucHV0KCkgYmFkZ2U6IHN0cmluZztcblxuICAgIEBJbnB1dCgpIGxhYmVsOiBzdHJpbmc7XG5cbiAgICBASW5wdXQoKSBkaXNhYmxlZDogYm9vbGVhbjtcblxuICAgIEBJbnB1dCgpIGxvYWRpbmc6IGJvb2xlYW4gPSBmYWxzZTtcblxuICAgIEBJbnB1dCgpIGxvYWRpbmdJY29uOiBzdHJpbmcgPSBcInBpIHBpLXNwaW5uZXIgcGktc3BpblwiO1xuXG4gICAgQElucHV0KCkgc3R5bGU6IGFueTtcblxuICAgIEBJbnB1dCgpIHN0eWxlQ2xhc3M6IHN0cmluZztcblxuICAgIEBJbnB1dCgpIGJhZGdlQ2xhc3M6IHN0cmluZztcblxuICAgIGNvbnRlbnRUZW1wbGF0ZTogVGVtcGxhdGVSZWY8YW55PjtcblxuICAgIEBDb250ZW50Q2hpbGRyZW4oUHJpbWVUZW1wbGF0ZSkgdGVtcGxhdGVzOiBRdWVyeUxpc3Q8YW55PjtcblxuICAgIEBPdXRwdXQoKSBvbkNsaWNrOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICAgIEBPdXRwdXQoKSBvbkZvY3VzOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICAgIEBPdXRwdXQoKSBvbkJsdXI6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG4gICAgbmdBZnRlckNvbnRlbnRJbml0KCkge1xuICAgICAgICB0aGlzLnRlbXBsYXRlcy5mb3JFYWNoKChpdGVtKSA9PiB7XG4gICAgICAgICAgICBzd2l0Y2goaXRlbS5nZXRUeXBlKCkpIHtcbiAgICAgICAgICAgICAgICBjYXNlICdjb250ZW50JzpcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jb250ZW50VGVtcGxhdGUgPSBpdGVtLnRlbXBsYXRlO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jb250ZW50VGVtcGxhdGUgPSBpdGVtLnRlbXBsYXRlO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBiYWRnZVN0eWxlQ2xhc3MoKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAncC1iYWRnZSBwLWNvbXBvbmVudCc6IHRydWUsXG4gICAgICAgICAgICAncC1iYWRnZS1uby1ndXR0ZXInOiB0aGlzLmJhZGdlICYmIFN0cmluZyh0aGlzLmJhZGdlKS5sZW5ndGggPT09IDFcbiAgICAgICAgfVxuICAgIH1cbn1cblxuQE5nTW9kdWxlKHtcbiAgICBpbXBvcnRzOiBbQ29tbW9uTW9kdWxlLFJpcHBsZU1vZHVsZV0sXG4gICAgZXhwb3J0czogW0J1dHRvbkRpcmVjdGl2ZSxCdXR0b25dLFxuICAgIGRlY2xhcmF0aW9uczogW0J1dHRvbkRpcmVjdGl2ZSxCdXR0b25dXG59KVxuZXhwb3J0IGNsYXNzIEJ1dHRvbk1vZHVsZSB7IH1cbiJdfQ==