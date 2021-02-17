import { NgModule, Directive, Component, ElementRef, EventEmitter, Output, Input, ChangeDetectionStrategy, ViewEncapsulation, ContentChildren } from '@angular/core';
import { DomHandler } from 'primeng/dom';
import { CommonModule } from '@angular/common';
import { RippleModule } from 'primeng/ripple';
import { PrimeTemplate } from 'primeng/api';
export class ButtonDirective {
    constructor(el) {
        this.el = el;
        this.iconPos = 'left';
    }
    ngAfterViewInit() {
        this._initialStyleClass = this.el.nativeElement.className;
        DomHandler.addMultipleClasses(this.el.nativeElement, this.getStyleClass());
        if (this.icon) {
            let iconElement = document.createElement("span");
            iconElement.className = 'p-button-icon';
            iconElement.setAttribute("aria-hidden", "true");
            let iconPosClass = this.label ? 'p-button-icon-' + this.iconPos : null;
            if (iconPosClass) {
                DomHandler.addClass(iconElement, iconPosClass);
            }
            DomHandler.addMultipleClasses(iconElement, this.icon);
            this.el.nativeElement.appendChild(iconElement);
        }
        let labelElement = document.createElement("span");
        if (this.icon && !this.label) {
            labelElement.setAttribute('aria-hidden', 'true');
        }
        labelElement.className = 'p-button-label';
        labelElement.appendChild(document.createTextNode(this.label || '&nbsp;'));
        this.el.nativeElement.appendChild(labelElement);
        this.initialized = true;
    }
    getStyleClass() {
        let styleClass = 'p-button p-component';
        if (this.icon && !this.label) {
            styleClass = styleClass + ' p-button-icon-only';
        }
        return styleClass;
    }
    setStyleClass() {
        let styleClass = this.getStyleClass();
        this.el.nativeElement.className = styleClass + ' ' + this._initialStyleClass;
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
            if (this.iconPos)
                DomHandler.findSingle(this.el.nativeElement, '.p-button-icon').className = 'p-button-icon p-button-icon-' + this.iconPos + ' ' + this._icon;
            else
                DomHandler.findSingle(this.el.nativeElement, '.p-button-icon').className = 'p-button-icon ' + this._icon;
            this.setStyleClass();
        }
    }
    ngOnDestroy() {
        this.initialized = false;
    }
}
ButtonDirective.decorators = [
    { type: Directive, args: [{
                selector: '[pButton]'
            },] }
];
ButtonDirective.ctorParameters = () => [
    { type: ElementRef }
];
ButtonDirective.propDecorators = {
    iconPos: [{ type: Input }],
    label: [{ type: Input }],
    icon: [{ type: Input }]
};
export class Button {
    constructor() {
        this.type = "button";
        this.iconPos = 'left';
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
Button.decorators = [
    { type: Component, args: [{
                selector: 'p-button',
                template: `
        <button [attr.type]="type" [class]="styleClass" [ngStyle]="style" [disabled]="disabled"
            [ngClass]="{'p-button p-component':true,
                        'p-button-icon-only': (icon && !label),
                        'p-button-vertical': (iconPos === 'top' || iconPos === 'bottom') && label}"
                        (click)="onClick.emit($event)" (focus)="onFocus.emit($event)" (blur)="onBlur.emit($event)" pRipple>
            <ng-content></ng-content>
            <ng-container *ngTemplateOutlet="contentTemplate"></ng-container>
            <span [ngClass]="{'p-button-icon': true,
                        'p-button-icon-left': iconPos === 'left' && label,
                        'p-button-icon-right': iconPos === 'right' && label,
                        'p-button-icon-top': iconPos === 'top' && label,
                        'p-button-icon-bottom': iconPos === 'bottom' && label}"
                        [class]="icon" *ngIf="icon" [attr.aria-hidden]="true"></span>
            <span class="p-button-label" [attr.aria-hidden]="icon && !label">{{label||'&nbsp;'}}</span>
            <span [ngClass]="badgeStyleClass()" *ngIf="badge" [class]="badgeClass">{{badge}}</span>
        </button>
    `,
                changeDetection: ChangeDetectionStrategy.OnPush,
                encapsulation: ViewEncapsulation.None
            },] }
];
Button.propDecorators = {
    type: [{ type: Input }],
    iconPos: [{ type: Input }],
    icon: [{ type: Input }],
    badge: [{ type: Input }],
    label: [{ type: Input }],
    disabled: [{ type: Input }],
    style: [{ type: Input }],
    styleClass: [{ type: Input }],
    badgeClass: [{ type: Input }],
    templates: [{ type: ContentChildren, args: [PrimeTemplate,] }],
    onClick: [{ type: Output }],
    onFocus: [{ type: Output }],
    onBlur: [{ type: Output }]
};
export class ButtonModule {
}
ButtonModule.decorators = [
    { type: NgModule, args: [{
                imports: [CommonModule, RippleModule],
                exports: [ButtonDirective, Button],
                declarations: [ButtonDirective, Button]
            },] }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnV0dG9uLmpzIiwic291cmNlUm9vdCI6Ii4uLy4uLy4uL3NyYy9hcHAvY29tcG9uZW50cy9idXR0b24vIiwic291cmNlcyI6WyJidXR0b24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFDLFFBQVEsRUFBQyxTQUFTLEVBQUMsU0FBUyxFQUFDLFVBQVUsRUFBQyxZQUFZLEVBQWUsTUFBTSxFQUFXLEtBQUssRUFBQyx1QkFBdUIsRUFBRSxpQkFBaUIsRUFBRSxlQUFlLEVBQTJDLE1BQU0sZUFBZSxDQUFDO0FBQzlOLE9BQU8sRUFBQyxVQUFVLEVBQUMsTUFBTSxhQUFhLENBQUM7QUFDdkMsT0FBTyxFQUFDLFlBQVksRUFBQyxNQUFNLGlCQUFpQixDQUFDO0FBQzdDLE9BQU8sRUFBQyxZQUFZLEVBQUMsTUFBTSxnQkFBZ0IsQ0FBQztBQUM1QyxPQUFPLEVBQUMsYUFBYSxFQUFDLE1BQU0sYUFBYSxDQUFDO0FBSzFDLE1BQU0sT0FBTyxlQUFlO0lBWXhCLFlBQW1CLEVBQWM7UUFBZCxPQUFFLEdBQUYsRUFBRSxDQUFZO1FBVnhCLFlBQU8sR0FBd0MsTUFBTSxDQUFDO0lBVTNCLENBQUM7SUFFckMsZUFBZTtRQUNYLElBQUksQ0FBQyxrQkFBa0IsR0FBRyxJQUFJLENBQUMsRUFBRSxDQUFDLGFBQWEsQ0FBQyxTQUFTLENBQUM7UUFDMUQsVUFBVSxDQUFDLGtCQUFrQixDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsYUFBYSxFQUFFLElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQyxDQUFDO1FBRTNFLElBQUksSUFBSSxDQUFDLElBQUksRUFBRTtZQUNYLElBQUksV0FBVyxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsTUFBTSxDQUFDLENBQUM7WUFDakQsV0FBVyxDQUFDLFNBQVMsR0FBRyxlQUFlLENBQUM7WUFDeEMsV0FBVyxDQUFDLFlBQVksQ0FBQyxhQUFhLEVBQUUsTUFBTSxDQUFDLENBQUM7WUFDaEQsSUFBSSxZQUFZLEdBQUcsSUFBSSxD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L0MsYUFBYSxFQUFFLGlCQUFpQixDQUFDLElBQUk7YUFDeEM7OzttQkFHSSxLQUFLO3NCQUVMLEtBQUs7bUJBRUwsS0FBSztvQkFFTCxLQUFLO29CQUVMLEtBQUs7dUJBRUwsS0FBSztvQkFFTCxLQUFLO3lCQUVMLEtBQUs7eUJBRUwsS0FBSzt3QkFJTCxlQUFlLFNBQUMsYUFBYTtzQkFFN0IsTUFBTTtzQkFFTixNQUFNO3FCQUVOLE1BQU07O0FBNkJYLE1BQU0sT0FBTyxZQUFZOzs7WUFMeEIsUUFBUSxTQUFDO2dCQUNOLE9BQU8sRUFBRSxDQUFDLFlBQVksRUFBQyxZQUFZLENBQUM7Z0JBQ3BDLE9BQU8sRUFBRSxDQUFDLGVBQWUsRUFBQyxNQUFNLENBQUM7Z0JBQ2pDLFlBQVksRUFBRSxDQUFDLGVBQWUsRUFBQyxNQUFNLENBQUM7YUFDekMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge05nTW9kdWxlLERpcmVjdGl2ZSxDb21wb25lbnQsRWxlbWVudFJlZixFdmVudEVtaXR0ZXIsQWZ0ZXJWaWV3SW5pdCxPdXRwdXQsT25EZXN0cm95LElucHV0LENoYW5nZURldGVjdGlvblN0cmF0ZWd5LCBWaWV3RW5jYXBzdWxhdGlvbiwgQ29udGVudENoaWxkcmVuLCBBZnRlckNvbnRlbnRJbml0LCBUZW1wbGF0ZVJlZiwgUXVlcnlMaXN0fSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7RG9tSGFuZGxlcn0gZnJvbSAncHJpbWVuZy9kb20nO1xuaW1wb3J0IHtDb21tb25Nb2R1bGV9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQge1JpcHBsZU1vZHVsZX0gZnJvbSAncHJpbWVuZy9yaXBwbGUnOyBcbmltcG9ydCB7UHJpbWVUZW1wbGF0ZX0gZnJvbSAncHJpbWVuZy9hcGknOyBcblxuQERpcmVjdGl2ZSh7XG4gICAgc2VsZWN0b3I6ICdbcEJ1dHRvbl0nXG59KVxuZXhwb3J0IGNsYXNzIEJ1dHRvbkRpcmVjdGl2ZSBpbXBsZW1lbnRzIEFmdGVyVmlld0luaXQsIE9uRGVzdHJveSB7XG5cbiAgICBASW5wdXQoKSBpY29uUG9zOiAnbGVmdCcgfCAncmlnaHQnIHwgJ3RvcCcgfCAnYm90dG9tJyA9ICdsZWZ0JztcbiAgICAgICAgICAgIFxuICAgIHB1YmxpYyBfbGFiZWw6IHN0cmluZztcbiAgICBcbiAgICBwdWJsaWMgX2ljb246IHN0cmluZztcbiAgICAgICAgICAgIFxuICAgIHB1YmxpYyBpbml0aWFsaXplZDogYm9vbGVhbjtcbiAgICBcbiAgICBwdWJsaWMgX2luaXRpYWxTdHlsZUNsYXNzOiBzdHJpbmc7XG5cbiAgICBjb25zdHJ1Y3RvcihwdWJsaWMgZWw6IEVsZW1lbnRSZWYpIHt9XG4gICAgXG4gICAgbmdBZnRlclZpZXdJbml0KCkge1xuICAgICAgICB0aGlzLl9pbml0aWFsU3R5bGVDbGFzcyA9IHRoaXMuZWwubmF0aXZlRWxlbWVudC5jbGFzc05hbWU7XG4gICAgICAgIERvbUhhbmRsZXIuYWRkTXVsdGlwbGVDbGFzc2VzKHRoaXMuZWwubmF0aXZlRWxlbWVudCwgdGhpcy5nZXRTdHlsZUNsYXNzKCkpO1xuXG4gICAgICAgIGlmICh0aGlzLmljb24pIHtcbiAgICAgICAgICAgIGxldCBpY29uRWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzcGFuXCIpO1xuICAgICAgICAgICAgaWNvbkVsZW1lbnQuY2xhc3NOYW1lID0gJ3AtYnV0dG9uLWljb24nO1xuICAgICAgICAgICAgaWNvbkVsZW1lbnQuc2V0QXR0cmlidXRlKFwiYXJpYS1oaWRkZW5cIiwgXCJ0cnVlXCIpO1xuICAgICAgICAgICAgbGV0IGljb25Qb3NDbGFzcyA9IHRoaXMubGFiZWwgPyAncC1idXR0b24taWNvbi0nICsgdGhpcy5pY29uUG9zIDogbnVsbDtcbiAgICAgICAgICAgIGlmIChpY29uUG9zQ2xhc3MpIHtcbiAgICAgICAgICAgICAgICBEb21IYW5kbGVyLmFkZENsYXNzKGljb25FbGVtZW50LCBpY29uUG9zQ2xhc3MpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgRG9tSGFuZGxlci5hZGRNdWx0aXBsZUNsYXNzZXMoaWNvbkVsZW1lbnQsIHRoaXMuaWNvbik7XG4gICAgICAgICAgICB0aGlzLmVsLm5hdGl2ZUVsZW1lbnQuYXBwZW5kQ2hpbGQoaWNvbkVsZW1lbnQpO1xuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICBsZXQgbGFiZWxFbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInNwYW5cIik7XG4gICAgICAgIGlmICh0aGlzLmljb24gJiYgIXRoaXMubGFiZWwpIHtcbiAgICAgICAgICAgIGxhYmVsRWxlbWVudC5zZXRBdHRyaWJ1dGUoJ2FyaWEtaGlkZGVuJywgJ3RydWUnKTtcbiAgICAgICAgfVxuICAgICAgICBsYWJlbEVsZW1lbnQuY2xhc3NOYW1lID0gJ3AtYnV0dG9uLWxhYmVsJztcbiAgICAgICAgbGFiZWxFbGVtZW50LmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKHRoaXMubGFiZWx8fCcmbmJzcDsnKSk7XG4gICAgICAgIHRoaXMuZWwubmF0aXZlRWxlbWVudC5hcHBlbmRDaGlsZChsYWJlbEVsZW1lbnQpO1xuICAgICAgICB0aGlzLmluaXRpYWxpemVkID0gdHJ1ZTtcbiAgICB9XG4gICAgICAgIFxuICAgIGdldFN0eWxlQ2xhc3MoKTogc3RyaW5nIHtcbiAgICAgICAgbGV0IHN0eWxlQ2xhc3MgPSAncC1idXR0b24gcC1jb21wb25lbnQnO1xuICAgICAgICBpZiAodGhpcy5pY29uICYmICF0aGlzLmxhYmVsKSB7XG4gICAgICAgICAgICBzdHlsZUNsYXNzID0gc3R5bGVDbGFzcyArICcgcC1idXR0b24taWNvbi1vbmx5JztcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgcmV0dXJuIHN0eWxlQ2xhc3M7XG4gICAgfVxuXG4gICAgc2V0U3R5bGVDbGFzcygpIHtcbiAgICAgICAgbGV0IHN0eWxlQ2xhc3MgPSB0aGlzLmdldFN0eWxlQ2xhc3MoKTtcbiAgICAgICAgdGhpcy5lbC5uYXRpdmVFbGVtZW50LmNsYXNzTmFtZSA9IHN0eWxlQ2xhc3MgKyAnICcgKyB0aGlzLl9pbml0aWFsU3R5bGVDbGFzcztcbiAgICB9XG4gICAgXG4gICAgQElucHV0KCkgZ2V0IGxhYmVsKCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiB0aGlzLl9sYWJlbDtcbiAgICB9XG5cbiAgICBzZXQgbGFiZWwodmFsOiBzdHJpbmcpIHtcbiAgICAgICAgdGhpcy5fbGFiZWwgPSB2YWw7XG4gICAgICAgIFxuICAgICAgICBpZiAodGhpcy5pbml0aWFsaXplZCkge1xuICAgICAgICAgICAgRG9tSGFuZGxlci5maW5kU2luZ2xlKHRoaXMuZWwubmF0aXZlRWxlbWVudCwgJy5wLWJ1dHRvbi1sYWJlbCcpLnRleHRDb250ZW50ID0gdGhpcy5fbGFiZWwgfHwgJyZuYnNwOyc7XG4gICAgICAgICAgICB0aGlzLnNldFN0eWxlQ2xhc3MoKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBcbiAgICBASW5wdXQoKSBnZXQgaWNvbigpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gdGhpcy5faWNvbjtcbiAgICB9XG5cbiAgICBzZXQgaWNvbih2YWw6IHN0cmluZykge1xuICAgICAgICB0aGlzLl9pY29uID0gdmFsO1xuICAgICAgICBcbiAgICAgICAgaWYgKHRoaXMuaW5pdGlhbGl6ZWQpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLmljb25Qb3MpXG4gICAgICAgICAgICAgICAgRG9tSGFuZGxlci5maW5kU2luZ2xlKHRoaXMuZWwubmF0aXZlRWxlbWVudCwgJy5wLWJ1dHRvbi1pY29uJykuY2xhc3NOYW1lID0gJ3AtYnV0dG9uLWljb24gcC1idXR0b24taWNvbi0nICsgdGhpcy5pY29uUG9zICsgJyAnICsgdGhpcy5faWNvbjtcbiAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgICBEb21IYW5kbGVyLmZpbmRTaW5nbGUodGhpcy5lbC5uYXRpdmVFbGVtZW50LCAnLnAtYnV0dG9uLWljb24nKS5jbGFzc05hbWUgPSAncC1idXR0b24taWNvbiAnICsgdGhpcy5faWNvbjtcblxuICAgICAgICAgICAgdGhpcy5zZXRTdHlsZUNsYXNzKCk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgXG4gICAgbmdPbkRlc3Ryb3koKSB7XG4gICAgICAgIHRoaXMuaW5pdGlhbGl6ZWQgPSBmYWxzZTtcbiAgICB9XG59XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAncC1idXR0b24nLFxuICAgIHRlbXBsYXRlOiBgXG4gICAgICAgIDxidXR0b24gW2F0dHIudHlwZV09XCJ0eXBlXCIgW2NsYXNzXT1cInN0eWxlQ2xhc3NcIiBbbmdTdHlsZV09XCJzdHlsZVwiIFtkaXNhYmxlZF09XCJkaXNhYmxlZFwiXG4gICAgICAgICAgICBbbmdDbGFzc109XCJ7J3AtYnV0dG9uIHAtY29tcG9uZW50Jzp0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgJ3AtYnV0dG9uLWljb24tb25seSc6IChpY29uICYmICFsYWJlbCksXG4gICAgICAgICAgICAgICAgICAgICAgICAncC1idXR0b24tdmVydGljYWwnOiAoaWNvblBvcyA9PT0gJ3RvcCcgfHwgaWNvblBvcyA9PT0gJ2JvdHRvbScpICYmIGxhYmVsfVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAoY2xpY2spPVwib25DbGljay5lbWl0KCRldmVudClcIiAoZm9jdXMpPVwib25Gb2N1cy5lbWl0KCRldmVudClcIiAoYmx1cik9XCJvbkJsdXIuZW1pdCgkZXZlbnQpXCIgcFJpcHBsZT5cbiAgICAgICAgICAgIDxuZy1jb250ZW50PjwvbmctY29udGVudD5cbiAgICAgICAgICAgIDxuZy1jb250YWluZXIgKm5nVGVtcGxhdGVPdXRsZXQ9XCJjb250ZW50VGVtcGxhdGVcIj48L25nLWNvbnRhaW5lcj5cbiAgICAgICAgICAgIDxzcGFuIFtuZ0NsYXNzXT1cInsncC1idXR0b24taWNvbic6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICAgICAncC1idXR0b24taWNvbi1sZWZ0JzogaWNvblBvcyA9PT0gJ2xlZnQnICYmIGxhYmVsLFxuICAgICAgICAgICAgICAgICAgICAgICAgJ3AtYnV0dG9uLWljb24tcmlnaHQnOiBpY29uUG9zID09PSAncmlnaHQnICYmIGxhYmVsLFxuICAgICAgICAgICAgICAgICAgICAgICAgJ3AtYnV0dG9uLWljb24tdG9wJzogaWNvblBvcyA9PT0gJ3RvcCcgJiYgbGFiZWwsXG4gICAgICAgICAgICAgICAgICAgICAgICAncC1idXR0b24taWNvbi1ib3R0b20nOiBpY29uUG9zID09PSAnYm90dG9tJyAmJiBsYWJlbH1cIlxuICAgICAgICAgICAgICAgICAgICAgICAgW2NsYXNzXT1cImljb25cIiAqbmdJZj1cImljb25cIiBbYXR0ci5hcmlhLWhpZGRlbl09XCJ0cnVlXCI+PC9zcGFuPlxuICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJwLWJ1dHRvbi1sYWJlbFwiIFthdHRyLmFyaWEtaGlkZGVuXT1cImljb24gJiYgIWxhYmVsXCI+e3tsYWJlbHx8JyZuYnNwOyd9fTwvc3Bhbj5cbiAgICAgICAgICAgIDxzcGFuIFtuZ0NsYXNzXT1cImJhZGdlU3R5bGVDbGFzcygpXCIgKm5nSWY9XCJiYWRnZVwiIFtjbGFzc109XCJiYWRnZUNsYXNzXCI+e3tiYWRnZX19PC9zcGFuPlxuICAgICAgICA8L2J1dHRvbj5cbiAgICBgLFxuICAgIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxuICAgIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmVcbn0pXG5leHBvcnQgY2xhc3MgQnV0dG9uIGltcGxlbWVudHMgQWZ0ZXJDb250ZW50SW5pdCB7XG5cbiAgICBASW5wdXQoKSB0eXBlOiBzdHJpbmcgPSBcImJ1dHRvblwiO1xuXG4gICAgQElucHV0KCkgaWNvblBvczogc3RyaW5nID0gJ2xlZnQnO1xuXG4gICAgQElucHV0KCkgaWNvbjogc3RyaW5nO1xuXG4gICAgQElucHV0KCkgYmFkZ2U6IHN0cmluZztcblxuICAgIEBJbnB1dCgpIGxhYmVsOiBzdHJpbmc7XG5cbiAgICBASW5wdXQoKSBkaXNhYmxlZDogYm9vbGVhbjtcblxuICAgIEBJbnB1dCgpIHN0eWxlOiBhbnk7XG5cbiAgICBASW5wdXQoKSBzdHlsZUNsYXNzOiBzdHJpbmc7XG5cbiAgICBASW5wdXQoKSBiYWRnZUNsYXNzOiBzdHJpbmc7XG5cbiAgICBjb250ZW50VGVtcGxhdGU6IFRlbXBsYXRlUmVmPGFueT47XG5cbiAgICBAQ29udGVudENoaWxkcmVuKFByaW1lVGVtcGxhdGUpIHRlbXBsYXRlczogUXVlcnlMaXN0PGFueT47XG5cbiAgICBAT3V0cHV0KCkgb25DbGljazogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgICBAT3V0cHV0KCkgb25Gb2N1czogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgICBAT3V0cHV0KCkgb25CbHVyOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICAgIG5nQWZ0ZXJDb250ZW50SW5pdCgpIHtcbiAgICAgICAgdGhpcy50ZW1wbGF0ZXMuZm9yRWFjaCgoaXRlbSkgPT4ge1xuICAgICAgICAgICAgc3dpdGNoKGl0ZW0uZ2V0VHlwZSgpKSB7XG4gICAgICAgICAgICAgICAgY2FzZSAnY29udGVudCc6XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY29udGVudFRlbXBsYXRlID0gaXRlbS50ZW1wbGF0ZTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgICAgICB0aGlzLmNvbnRlbnRUZW1wbGF0ZSA9IGl0ZW0udGVtcGxhdGU7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGJhZGdlU3R5bGVDbGFzcygpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICdwLWJhZGdlIHAtY29tcG9uZW50JzogdHJ1ZSxcbiAgICAgICAgICAgICdwLWJhZGdlLW5vLWd1dHRlcic6IHRoaXMuYmFkZ2UgJiYgU3RyaW5nKHRoaXMuYmFkZ2UpLmxlbmd0aCA9PT0gMVxuICAgICAgICB9XG4gICAgfVxufVxuXG5ATmdNb2R1bGUoe1xuICAgIGltcG9ydHM6IFtDb21tb25Nb2R1bGUsUmlwcGxlTW9kdWxlXSxcbiAgICBleHBvcnRzOiBbQnV0dG9uRGlyZWN0aXZlLEJ1dHRvbl0sXG4gICAgZGVjbGFyYXRpb25zOiBbQnV0dG9uRGlyZWN0aXZlLEJ1dHRvbl1cbn0pXG5leHBvcnQgY2xhc3MgQnV0dG9uTW9kdWxlIHsgfVxuIl19