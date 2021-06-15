import * as i0 from '@angular/core';
import { Component, ChangeDetectionStrategy, ViewEncapsulation, Input, ContentChildren, ViewChild, NgModule } from '@angular/core';
import * as i1 from '@angular/common';
import { CommonModule } from '@angular/common';
import { DomHandler } from 'primeng/dom';
import { PrimeTemplate } from 'primeng/api';

class BlockUI {
    constructor(el, cd) {
        this.el = el;
        this.cd = cd;
        this.autoZIndex = true;
        this.baseZIndex = 0;
    }
    get blocked() {
        return this._blocked;
    }
    set blocked(val) {
        this._blocked = val;
        if (this.mask && this.mask.nativeElement) {
            if (this._blocked)
                this.block();
            else
                this.unblock();
        }
    }
    ngAfterViewInit() {
        if (this.target && !this.target.getBlockableElement) {
            throw 'Target of BlockUI must implement BlockableUI interface';
        }
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
    block() {
        if (this.target) {
            this.target.getBlockableElement().appendChild(this.mask.nativeElement);
            this.target.getBlockableElement().style.position = 'relative';
        }
        else {
            document.body.appendChild(this.mask.nativeElement);
        }
        if (this.autoZIndex) {
            this.mask.nativeElement.style.zIndex = String(this.baseZIndex + (++DomHandler.zindex));
        }
    }
    unblock() {
        this.el.nativeElement.appendChild(this.mask.nativeElement);
    }
    ngOnDestroy() {
        this.unblock();
    }
}
BlockUI.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.0.4", ngImport: i0, type: BlockUI, deps: [{ token: i0.ElementRef }, { token: i0.ChangeDetectorRef }], target: i0.ɵɵFactoryTarget.Component });
BlockUI.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.0.4", type: BlockUI, selector: "p-blockUI", inputs: { target: "target", autoZIndex: "autoZIndex", baseZIndex: "baseZIndex", styleClass: "styleClass", blocked: "blocked" }, queries: [{ propertyName: "templates", predicate: PrimeTemplate }], viewQueries: [{ propertyName: "mask", first: true, predicate: ["mask"], descendants: true }], ngImport: i0, template: `
        <div #mask [class]="styleClass" [ngClass]="{'p-blockui-document':!target, 'p-blockui p-component-overlay': true}" [ngStyle]="{display: blocked ? 'flex' : 'none'}">
            <ng-content></ng-content>
            <ng-container *ngTemplateOutlet="contentTemplate"></ng-container>
        </div>
    `, isInline: true, styles: [".p-blockui{top:0;left:0;width:100%;height:100%;background-color:transparent;transition-property:background-color;display:flex;align-items:center;justify-content:center}.p-blockui,.p-blockui.p-component-overlay{position:absolute}.p-blockui-document.p-component-overlay{position:fixed}.p-blockui-leave.p-component-overlay{background-color:transparent}"], directives: [{ type: i1.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { type: i1.NgStyle, selector: "[ngStyle]", inputs: ["ngStyle"] }, { type: i1.NgTemplateOutlet, selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.0.4", ngImport: i0, type: BlockUI, decorators: [{
            type: Component,
            args: [{
                    selector: 'p-blockUI',
                    template: `
        <div #mask [class]="styleClass" [ngClass]="{'p-blockui-document':!target, 'p-blockui p-component-overlay': true}" [ngStyle]="{display: blocked ? 'flex' : 'none'}">
            <ng-content></ng-content>
            <ng-container *ngTemplateOutlet="contentTemplate"></ng-container>
        </div>
    `,
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    encapsulation: ViewEncapsulation.None,
                    styleUrls: ['./blockui.css']
                }]
        }], ctorParameters: function () { return [{ type: i0.ElementRef }, { type: i0.ChangeDetectorRef }]; }, propDecorators: { target: [{
                type: Input
            }], autoZIndex: [{
                type: Input
            }], baseZIndex: [{
                type: Input
            }], styleClass: [{
                type: Input
            }], templates: [{
                type: ContentChildren,
                args: [PrimeTemplate]
            }], mask: [{
                type: ViewChild,
                args: ['mask']
            }], blocked: [{
                type: Input
            }] } });
class BlockUIModule {
}
BlockUIModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.0.4", ngImport: i0, type: BlockUIModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
BlockUIModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.0.4", ngImport: i0, type: BlockUIModule, declarations: [BlockUI], imports: [CommonModule], exports: [BlockUI] });
BlockUIModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.0.4", ngImport: i0, type: BlockUIModule, imports: [[CommonModule]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.0.4", ngImport: i0, type: BlockUIModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule],
                    exports: [BlockUI],
                    declarations: [BlockUI]
                }]
        }] });

/**
 * Generated bundle index. Do not edit.
 */

export { BlockUI, BlockUIModule };
//# sourceMappingURL=primeng-blockui.js.map
