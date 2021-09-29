import * as i0 from '@angular/core';
import { Component, ChangeDetectionStrategy, ViewEncapsulation, Input, NgModule } from '@angular/core';
import * as i1 from '@angular/common';
import { CommonModule } from '@angular/common';

class AvatarGroup {
}
AvatarGroup.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0, type: AvatarGroup, deps: [], target: i0.ɵɵFactoryTarget.Component });
AvatarGroup.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.0.5", type: AvatarGroup, selector: "p-avatarGroup", inputs: { styleClass: "styleClass", style: "style" }, host: { classAttribute: "p-element" }, ngImport: i0, template: `
        <div [ngClass]="'p-avatar-group p-component'" [class]="styleClass" [ngStyle]="style">
            <ng-content></ng-content>
        </div>
    `, isInline: true, styles: [".p-avatar-group p-avatar+p-avatar{margin-left:-1rem}.p-avatar-group{display:flex;align-items:center}"], directives: [{ type: i1.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { type: i1.NgStyle, selector: "[ngStyle]", inputs: ["ngStyle"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0, type: AvatarGroup, decorators: [{
            type: Component,
            args: [{
                    selector: 'p-avatarGroup',
                    template: `
        <div [ngClass]="'p-avatar-group p-component'" [class]="styleClass" [ngStyle]="style">
            <ng-content></ng-content>
        </div>
    `,
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    encapsulation: ViewEncapsulation.None,
                    styleUrls: ['./avatargroup.css'],
                    host: {
                        'class': 'p-element'
                    }
                }]
        }], propDecorators: { styleClass: [{
                type: Input
            }], style: [{
                type: Input
            }] } });
class AvatarGroupModule {
}
AvatarGroupModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0, type: AvatarGroupModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
AvatarGroupModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0, type: AvatarGroupModule, declarations: [AvatarGroup], imports: [CommonModule], exports: [AvatarGroup] });
AvatarGroupModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0, type: AvatarGroupModule, imports: [[CommonModule]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0, type: AvatarGroupModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule],
                    exports: [AvatarGroup],
                    declarations: [AvatarGroup]
                }]
        }] });

/**
 * Generated bundle index. Do not edit.
 */

export { AvatarGroup, AvatarGroupModule };
//# sourceMappingURL=primeng-avatargroup.js.map
