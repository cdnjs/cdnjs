import * as i0 from '@angular/core';
import { Component, ChangeDetectionStrategy, ViewEncapsulation, Input, NgModule } from '@angular/core';
import * as i1 from '@angular/common';
import { CommonModule } from '@angular/common';

class Skeleton {
    constructor() {
        this.shape = "rectangle";
        this.animation = "wave";
        this.borderRadius = null;
        this.size = null;
        this.width = "100%";
        this.height = "1rem";
    }
    containerClass() {
        return {
            'p-skeleton p-component': true,
            'p-skeleton-circle': this.shape === 'circle',
            'p-skeleton-none': this.animation === 'none'
        };
    }
    containerStyle() {
        if (this.size)
            return Object.assign(Object.assign({}, this.style), { width: this.size, height: this.size, borderRadius: this.borderRadius });
        else
            return Object.assign(Object.assign({}, this.style), { width: this.width, height: this.height, borderRadius: this.borderRadius });
    }
}
Skeleton.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.0.4", ngImport: i0, type: Skeleton, deps: [], target: i0.ɵɵFactoryTarget.Component });
Skeleton.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.0.4", type: Skeleton, selector: "p-skeleton", inputs: { styleClass: "styleClass", style: "style", shape: "shape", animation: "animation", borderRadius: "borderRadius", size: "size", width: "width", height: "height" }, ngImport: i0, template: `
        <div [ngClass]="containerClass()" [class]="styleClass" [ngStyle]="containerStyle()">
        </div>
    `, isInline: true, styles: [".p-skeleton{position:relative;overflow:hidden}.p-skeleton:after{content:\"\";animation:p-skeleton-animation 1.2s infinite;height:100%;left:0;position:absolute;right:0;top:0;transform:translateX(-100%);z-index:1}.p-skeleton.p-skeleton-circle{border-radius:50%}.p-skeleton-none:after{animation:none}@keyframes p-skeleton-animation{0%{transform:translateX(-100%)}to{transform:translateX(100%)}}"], directives: [{ type: i1.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { type: i1.NgStyle, selector: "[ngStyle]", inputs: ["ngStyle"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.0.4", ngImport: i0, type: Skeleton, decorators: [{
            type: Component,
            args: [{
                    selector: 'p-skeleton',
                    template: `
        <div [ngClass]="containerClass()" [class]="styleClass" [ngStyle]="containerStyle()">
        </div>
    `,
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    encapsulation: ViewEncapsulation.None,
                    styleUrls: ['./skeleton.css']
                }]
        }], propDecorators: { styleClass: [{
                type: Input
            }], style: [{
                type: Input
            }], shape: [{
                type: Input
            }], animation: [{
                type: Input
            }], borderRadius: [{
                type: Input
            }], size: [{
                type: Input
            }], width: [{
                type: Input
            }], height: [{
                type: Input
            }] } });
class SkeletonModule {
}
SkeletonModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.0.4", ngImport: i0, type: SkeletonModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
SkeletonModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.0.4", ngImport: i0, type: SkeletonModule, declarations: [Skeleton], imports: [CommonModule], exports: [Skeleton] });
SkeletonModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.0.4", ngImport: i0, type: SkeletonModule, imports: [[CommonModule]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.0.4", ngImport: i0, type: SkeletonModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule],
                    exports: [Skeleton],
                    declarations: [Skeleton]
                }]
        }] });

/**
 * Generated bundle index. Do not edit.
 */

export { Skeleton, SkeletonModule };
//# sourceMappingURL=primeng-skeleton.js.map
