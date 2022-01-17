import * as i0 from '@angular/core';
import { Component, EventEmitter, ChangeDetectionStrategy, ViewEncapsulation, Input, ContentChildren, Output, NgModule } from '@angular/core';
import * as i1 from '@angular/common';
import { CommonModule } from '@angular/common';
import * as i2 from 'primeng/button';
import { ButtonModule } from 'primeng/button';
import { PrimeTemplate } from 'primeng/api';

class InplaceDisplay {
}
InplaceDisplay.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0, type: InplaceDisplay, deps: [], target: i0.ɵɵFactoryTarget.Component });
InplaceDisplay.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.0.5", type: InplaceDisplay, selector: "p-inplaceDisplay", host: { classAttribute: "p-element" }, ngImport: i0, template: '<ng-content></ng-content>', isInline: true });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0, type: InplaceDisplay, decorators: [{
            type: Component,
            args: [{
                    selector: 'p-inplaceDisplay',
                    template: '<ng-content></ng-content>',
                    host: {
                        'class': 'p-element'
                    }
                }]
        }] });
class InplaceContent {
}
InplaceContent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0, type: InplaceContent, deps: [], target: i0.ɵɵFactoryTarget.Component });
InplaceContent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.0.5", type: InplaceContent, selector: "p-inplaceContent", host: { classAttribute: "p-element" }, ngImport: i0, template: '<ng-content></ng-content>', isInline: true });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0, type: InplaceContent, decorators: [{
            type: Component,
            args: [{
                    selector: 'p-inplaceContent',
                    template: '<ng-content></ng-content>',
                    host: {
                        'class': 'p-element'
                    }
                }]
        }] });
class Inplace {
    constructor(cd) {
        this.cd = cd;
        this.closeIcon = 'pi pi-times';
        this.onActivate = new EventEmitter();
        this.onDeactivate = new EventEmitter();
    }
    ngAfterContentInit() {
        this.templates.forEach((item) => {
            switch (item.getType()) {
                case 'display':
                    this.displayTemplate = item.template;
                    break;
                case 'content':
                    this.contentTemplate = item.template;
                    break;
            }
        });
    }
    onActivateClick(event) {
        if (!this.preventClick)
            this.activate(event);
    }
    onDeactivateClick(event) {
        if (!this.preventClick)
            this.deactivate(event);
    }
    activate(event) {
        if (!this.disabled) {
            this.active = true;
            this.onActivate.emit(event);
            this.cd.markForCheck();
        }
    }
    deactivate(event) {
        if (!this.disabled) {
            this.active = false;
            this.hover = false;
            this.onDeactivate.emit(event);
            this.cd.markForCheck();
        }
    }
    onKeydown(event) {
        if (event.which === 13) {
            this.activate(event);
            event.preventDefault();
        }
    }
}
Inplace.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0, type: Inplace, deps: [{ token: i0.ChangeDetectorRef }], target: i0.ɵɵFactoryTarget.Component });
Inplace.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.0.5", type: Inplace, selector: "p-inplace", inputs: { active: "active", closable: "closable", disabled: "disabled", preventClick: "preventClick", style: "style", styleClass: "styleClass", closeIcon: "closeIcon" }, outputs: { onActivate: "onActivate", onDeactivate: "onDeactivate" }, host: { classAttribute: "p-element" }, queries: [{ propertyName: "templates", predicate: PrimeTemplate }], ngImport: i0, template: `
        <div [ngClass]="{'p-inplace p-component': true, 'p-inplace-closable': closable}" [ngStyle]="style" [class]="styleClass">
            <div class="p-inplace-display" (click)="onActivateClick($event)" tabindex="0" (keydown)="onKeydown($event)"
                [ngClass]="{'p-disabled':disabled}" *ngIf="!active">
                <ng-content select="[pInplaceDisplay]"></ng-content>
                <ng-container *ngTemplateOutlet="displayTemplate"></ng-container>
            </div>
            <div class="p-inplace-content" *ngIf="active">
                <ng-content select="[pInplaceContent]"></ng-content>
                <ng-container *ngTemplateOutlet="contentTemplate"></ng-container>
                <button type="button" [icon]="closeIcon" pButton (click)="onDeactivateClick($event)" *ngIf="closable"></button>
            </div>
        </div>
    `, isInline: true, styles: [".p-inplace .p-inplace-display{display:inline;cursor:pointer}.p-inplace .p-inplace-content{display:inline}.p-fluid .p-inplace.p-inplace-closable .p-inplace-content{display:flex}.p-fluid .p-inplace.p-inplace-closable .p-inplace-content>.p-inputtext{flex:1 1 auto;width:1%}"], directives: [{ type: i1.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { type: i1.NgStyle, selector: "[ngStyle]", inputs: ["ngStyle"] }, { type: i1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i1.NgTemplateOutlet, selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet"] }, { type: i2.ButtonDirective, selector: "[pButton]", inputs: ["iconPos", "loadingIcon", "label", "icon", "loading"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0, type: Inplace, decorators: [{
            type: Component,
            args: [{
                    selector: 'p-inplace',
                    template: `
        <div [ngClass]="{'p-inplace p-component': true, 'p-inplace-closable': closable}" [ngStyle]="style" [class]="styleClass">
            <div class="p-inplace-display" (click)="onActivateClick($event)" tabindex="0" (keydown)="onKeydown($event)"
                [ngClass]="{'p-disabled':disabled}" *ngIf="!active">
                <ng-content select="[pInplaceDisplay]"></ng-content>
                <ng-container *ngTemplateOutlet="displayTemplate"></ng-container>
            </div>
            <div class="p-inplace-content" *ngIf="active">
                <ng-content select="[pInplaceContent]"></ng-content>
                <ng-container *ngTemplateOutlet="contentTemplate"></ng-container>
                <button type="button" [icon]="closeIcon" pButton (click)="onDeactivateClick($event)" *ngIf="closable"></button>
            </div>
        </div>
    `,
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    encapsulation: ViewEncapsulation.None,
                    styleUrls: ['./inplace.css'],
                    host: {
                        'class': 'p-element'
                    }
                }]
        }], ctorParameters: function () { return [{ type: i0.ChangeDetectorRef }]; }, propDecorators: { active: [{
                type: Input
            }], closable: [{
                type: Input
            }], disabled: [{
                type: Input
            }], preventClick: [{
                type: Input
            }], style: [{
                type: Input
            }], styleClass: [{
                type: Input
            }], closeIcon: [{
                type: Input
            }], templates: [{
                type: ContentChildren,
                args: [PrimeTemplate]
            }], onActivate: [{
                type: Output
            }], onDeactivate: [{
                type: Output
            }] } });
class InplaceModule {
}
InplaceModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0, type: InplaceModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
InplaceModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0, type: InplaceModule, declarations: [Inplace, InplaceDisplay, InplaceContent], imports: [CommonModule, ButtonModule], exports: [Inplace, InplaceDisplay, InplaceContent, ButtonModule] });
InplaceModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0, type: InplaceModule, imports: [[CommonModule, ButtonModule], ButtonModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0, type: InplaceModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule, ButtonModule],
                    exports: [Inplace, InplaceDisplay, InplaceContent, ButtonModule],
                    declarations: [Inplace, InplaceDisplay, InplaceContent]
                }]
        }] });

/**
 * Generated bundle index. Do not edit.
 */

export { Inplace, InplaceContent, InplaceDisplay, InplaceModule };
//# sourceMappingURL=primeng-inplace.js.map
