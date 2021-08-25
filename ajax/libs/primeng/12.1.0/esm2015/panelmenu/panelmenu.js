import { NgModule, Component, Input, ChangeDetectionStrategy, ViewEncapsulation } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TooltipModule } from 'primeng/tooltip';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
import * as i2 from "primeng/tooltip";
import * as i3 from "@angular/router";
export class BasePanelMenuItem {
    constructor(ref) {
        this.ref = ref;
    }
    handleClick(event, item) {
        if (item.disabled) {
            event.preventDefault();
            return;
        }
        item.expanded = !item.expanded;
        this.ref.detectChanges();
        if (!item.url) {
            event.preventDefault();
        }
        if (item.command) {
            item.command({
                originalEvent: event,
                item: item
            });
        }
    }
}
export class PanelMenuSub extends BasePanelMenuItem {
    constructor(ref) {
        super(ref);
    }
}
PanelMenuSub.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0, type: PanelMenuSub, deps: [{ token: i0.ChangeDetectorRef }], target: i0.ɵɵFactoryTarget.Component });
PanelMenuSub.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.0.5", type: PanelMenuSub, selector: "p-panelMenuSub", inputs: { item: "item", expanded: "expanded", transitionOptions: "transitionOptions", root: "root" }, usesInheritance: true, ngImport: i0, template: `
        <ul [ngClass]="{'p-submenu-list': true, 'p-panelmenu-root-submenu': root}" [@submenu]="expanded ? {value: 'visible', params: {transitionParams: transitionOptions, height: '*'}} : {value: 'hidden', params: {transitionParams: transitionOptions, height: '0'}}" role="tree">
            <ng-template ngFor let-child [ngForOf]="item.items">
                <li *ngIf="child.separator" class="p-menu-separator" role="separator">
                <li *ngIf="!child.separator" class="p-menuitem" [ngClass]="child.styleClass" [class.p-hidden]="child.visible === false" [ngStyle]="child.style" pTooltip [tooltipOptions]="child.tooltipOptions">
                    <a *ngIf="!child.routerLink" [attr.href]="child.url" class="p-menuitem-link" [attr.tabindex]="!item.expanded ? null : child.disabled ? null : '0'" [attr.id]="child.id"
                        [ngClass]="{'p-disabled':child.disabled}" role="treeitem" [attr.aria-expanded]="child.expanded"
                        (click)="handleClick($event,child)" [attr.target]="child.target" [attr.title]="child.title">
                        <span class="p-panelmenu-icon pi pi-fw" [ngClass]="{'pi-angle-right':!child.expanded,'pi-angle-down':child.expanded}" *ngIf="child.items"></span>
                        <span class="p-menuitem-icon" [ngClass]="child.icon" *ngIf="child.icon"></span>
                        <span class="p-menuitem-text" *ngIf="child.escape !== false; else htmlLabel">{{child.label}}</span>
                        <ng-template #htmlLabel><span class="p-menuitem-text" [innerHTML]="child.label"></span></ng-template>
                    </a>
                    <a *ngIf="child.routerLink" [routerLink]="child.routerLink" [queryParams]="child.queryParams" [routerLinkActive]="'p-menuitem-link-active'" [routerLinkActiveOptions]="child.routerLinkActiveOptions||{exact:false}" class="p-menuitem-link"
                        [ngClass]="{'p-disabled':child.disabled}" [attr.tabindex]="!item.expanded ? null : child.disabled ? null : '0'" [attr.id]="child.id" role="treeitem" [attr.aria-expanded]="child.expanded"
                        (click)="handleClick($event,child)" [attr.target]="child.target" [attr.title]="child.title"
                        [fragment]="child.fragment" [queryParamsHandling]="child.queryParamsHandling" [preserveFragment]="child.preserveFragment" [skipLocationChange]="child.skipLocationChange" [replaceUrl]="child.replaceUrl" [state]="child.state">
                        <span class="p-panelmenu-icon pi pi-fw" [ngClass]="{'pi-angle-right':!child.expanded,'pi-angle-down':child.expanded}" *ngIf="child.items"></span>
                        <span class="p-menuitem-icon" [ngClass]="child.icon" *ngIf="child.icon"></span>
                        <span class="p-menuitem-text" *ngIf="child.escape !== false; else htmlRouteLabel">{{child.label}}</span>
                        <ng-template #htmlRouteLabel><span class="p-menuitem-text" [innerHTML]="child.label"></span></ng-template>
                    </a>
                    <p-panelMenuSub [item]="child" [expanded]="child.expanded" [transitionOptions]="transitionOptions" *ngIf="child.items"></p-panelMenuSub>
                </li>
            </ng-template>
        </ul>
    `, isInline: true, components: [{ type: PanelMenuSub, selector: "p-panelMenuSub", inputs: ["item", "expanded", "transitionOptions", "root"] }], directives: [{ type: i1.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { type: i1.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { type: i1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i2.Tooltip, selector: "[pTooltip]", inputs: ["tooltipPosition", "tooltipEvent", "appendTo", "positionStyle", "tooltipStyleClass", "tooltipZIndex", "escape", "showDelay", "hideDelay", "life", "positionTop", "positionLeft", "pTooltip", "tooltipDisabled", "tooltipOptions"] }, { type: i1.NgStyle, selector: "[ngStyle]", inputs: ["ngStyle"] }, { type: i3.RouterLinkWithHref, selector: "a[routerLink],area[routerLink]", inputs: ["routerLink", "target", "queryParams", "fragment", "queryParamsHandling", "preserveFragment", "skipLocationChange", "replaceUrl", "state", "relativeTo"] }, { type: i3.RouterLinkActive, selector: "[routerLinkActive]", inputs: ["routerLinkActiveOptions", "routerLinkActive"], exportAs: ["routerLinkActive"] }], animations: [
        trigger('submenu', [
            state('hidden', style({
                height: '0',
                overflow: 'hidden'
            })),
            state('visible', style({
                height: '*'
            })),
            transition('visible <=> hidden', [style({ overflow: 'hidden' }), animate('{{transitionParams}}')]),
            transition('void => *', animate(0))
        ])
    ], encapsulation: i0.ViewEncapsulation.None });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0, type: PanelMenuSub, decorators: [{
            type: Component,
            args: [{
                    selector: 'p-panelMenuSub',
                    template: `
        <ul [ngClass]="{'p-submenu-list': true, 'p-panelmenu-root-submenu': root}" [@submenu]="expanded ? {value: 'visible', params: {transitionParams: transitionOptions, height: '*'}} : {value: 'hidden', params: {transitionParams: transitionOptions, height: '0'}}" role="tree">
            <ng-template ngFor let-child [ngForOf]="item.items">
                <li *ngIf="child.separator" class="p-menu-separator" role="separator">
                <li *ngIf="!child.separator" class="p-menuitem" [ngClass]="child.styleClass" [class.p-hidden]="child.visible === false" [ngStyle]="child.style" pTooltip [tooltipOptions]="child.tooltipOptions">
                    <a *ngIf="!child.routerLink" [attr.href]="child.url" class="p-menuitem-link" [attr.tabindex]="!item.expanded ? null : child.disabled ? null : '0'" [attr.id]="child.id"
                        [ngClass]="{'p-disabled':child.disabled}" role="treeitem" [attr.aria-expanded]="child.expanded"
                        (click)="handleClick($event,child)" [attr.target]="child.target" [attr.title]="child.title">
                        <span class="p-panelmenu-icon pi pi-fw" [ngClass]="{'pi-angle-right':!child.expanded,'pi-angle-down':child.expanded}" *ngIf="child.items"></span>
                        <span class="p-menuitem-icon" [ngClass]="child.icon" *ngIf="child.icon"></span>
                        <span class="p-menuitem-text" *ngIf="child.escape !== false; else htmlLabel">{{child.label}}</span>
                        <ng-template #htmlLabel><span class="p-menuitem-text" [innerHTML]="child.label"></span></ng-template>
                    </a>
                    <a *ngIf="child.routerLink" [routerLink]="child.routerLink" [queryParams]="child.queryParams" [routerLinkActive]="'p-menuitem-link-active'" [routerLinkActiveOptions]="child.routerLinkActiveOptions||{exact:false}" class="p-menuitem-link"
                        [ngClass]="{'p-disabled':child.disabled}" [attr.tabindex]="!item.expanded ? null : child.disabled ? null : '0'" [attr.id]="child.id" role="treeitem" [attr.aria-expanded]="child.expanded"
                        (click)="handleClick($event,child)" [attr.target]="child.target" [attr.title]="child.title"
                        [fragment]="child.fragment" [queryParamsHandling]="child.queryParamsHandling" [preserveFragment]="child.preserveFragment" [skipLocationChange]="child.skipLocationChange" [replaceUrl]="child.replaceUrl" [state]="child.state">
                        <span class="p-panelmenu-icon pi pi-fw" [ngClass]="{'pi-angle-right':!child.expanded,'pi-angle-down':child.expanded}" *ngIf="child.items"></span>
                        <span class="p-menuitem-icon" [ngClass]="child.icon" *ngIf="child.icon"></span>
                        <span class="p-menuitem-text" *ngIf="child.escape !== false; else htmlRouteLabel">{{child.label}}</span>
                        <ng-template #htmlRouteLabel><span class="p-menuitem-text" [innerHTML]="child.label"></span></ng-template>
                    </a>
                    <p-panelMenuSub [item]="child" [expanded]="child.expanded" [transitionOptions]="transitionOptions" *ngIf="child.items"></p-panelMenuSub>
                </li>
            </ng-template>
        </ul>
    `,
                    animations: [
                        trigger('submenu', [
                            state('hidden', style({
                                height: '0',
                                overflow: 'hidden'
                            })),
                            state('visible', style({
                                height: '*'
                            })),
                            transition('visible <=> hidden', [style({ overflow: 'hidden' }), animate('{{transitionParams}}')]),
                            transition('void => *', animate(0))
                        ])
                    ],
                    encapsulation: ViewEncapsulation.None
                }]
        }], ctorParameters: function () { return [{ type: i0.ChangeDetectorRef }]; }, propDecorators: { item: [{
                type: Input
            }], expanded: [{
                type: Input
            }], transitionOptions: [{
                type: Input
            }], root: [{
                type: Input
            }] } });
export class PanelMenu extends BasePanelMenuItem {
    constructor(ref) {
        super(ref);
        this.multiple = true;
        this.transitionOptions = '400ms cubic-bezier(0.86, 0, 0.07, 1)';
    }
    collapseAll() {
        for (let item of this.model) {
            if (item.expanded) {
                item.expanded = false;
            }
        }
    }
    handleClick(event, item) {
        if (!this.multiple) {
            for (let modelItem of this.model) {
                if (item !== modelItem && modelItem.expanded) {
                    modelItem.expanded = false;
                }
            }
        }
        this.animating = true;
        super.handleClick(event, item);
    }
    onToggleDone() {
        this.animating = false;
    }
}
PanelMenu.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0, type: PanelMenu, deps: [{ token: i0.ChangeDetectorRef }], target: i0.ɵɵFactoryTarget.Component });
PanelMenu.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.0.5", type: PanelMenu, selector: "p-panelMenu", inputs: { model: "model", style: "style", styleClass: "styleClass", multiple: "multiple", transitionOptions: "transitionOptions" }, usesInheritance: true, ngImport: i0, template: `
        <div [class]="styleClass" [ngStyle]="style" [ngClass]="'p-panelmenu p-component'">
            <ng-container *ngFor="let item of model;let f=first;let l=last;">
                <div class="p-panelmenu-panel" [ngClass]="{'p-hidden': item.visible === false}">
                    <div [ngClass]="{'p-component p-panelmenu-header':true, 'p-highlight':item.expanded,'p-disabled':item.disabled}" [class]="item.styleClass" [ngStyle]="item.style" pTooltip [tooltipOptions]="item.tooltipOptions">
                        <a *ngIf="!item.routerLink" [attr.href]="item.url" (click)="handleClick($event,item)" [attr.tabindex]="item.disabled ? null : '0'" [attr.id]="item.id"
                           [attr.target]="item.target" [attr.title]="item.title" class="p-panelmenu-header-link" [attr.aria-expanded]="item.expanded" [attr.id]="item.id + '_header'" [attr.aria-controls]="item.id +'_content'">
                            <span *ngIf="item.items" class="p-panelmenu-icon pi" [ngClass]="{'pi-chevron-right':!item.expanded,'pi-chevron-down':item.expanded}"></span>
                            <span class="p-menuitem-icon" [ngClass]="item.icon" *ngIf="item.icon"></span>
                            <span class="p-menuitem-text" *ngIf="item.escape !== false; else htmlLabel">{{item.label}}</span>
                            <ng-template #htmlLabel><span class="p-menuitem-text" [innerHTML]="item.label"></span></ng-template>
                        </a>
                        <a *ngIf="item.routerLink" [routerLink]="item.routerLink" [queryParams]="item.queryParams" [routerLinkActive]="'p-menuitem-link-active'" [routerLinkActiveOptions]="item.routerLinkActiveOptions||{exact:false}"
                           (click)="handleClick($event,item)" [attr.target]="item.target" [attr.title]="item.title" class="p-panelmenu-header-link" [attr.id]="item.id" [attr.tabindex]="item.disabled ? null : '0'"
                           [fragment]="item.fragment" [queryParamsHandling]="item.queryParamsHandling" [preserveFragment]="item.preserveFragment" [skipLocationChange]="item.skipLocationChange" [replaceUrl]="item.replaceUrl" [state]="item.state">
                            <span *ngIf="item.items" class="p-panelmenu-icon pi" [ngClass]="{'pi-chevron-right':!item.expanded,'pi-chevron-down':item.expanded}"></span>
                            <span class="p-menuitem-icon" [ngClass]="item.icon" *ngIf="item.icon"></span>
                            <span class="p-menuitem-text" *ngIf="item.escape !== false; else htmlRouteLabel">{{item.label}}</span>
                            <ng-template #htmlRouteLabel><span class="p-menuitem-text" [innerHTML]="item.label"></span></ng-template>
                        </a>
                    </div>
                    <div *ngIf="item.items" class="p-toggleable-content" [@rootItem]="item.expanded ? {value: 'visible', params: {transitionParams: animating ? transitionOptions : '0ms', height: '*'}} : {value: 'hidden', params: {transitionParams: transitionOptions, height: '0'}}"  (@rootItem.done)="onToggleDone()">
                        <div class="p-panelmenu-content" role="region" [attr.id]="item.id +'_content' " [attr.aria-labelledby]="item.id +'_header'">
                            <p-panelMenuSub [item]="item" [expanded]="true" [transitionOptions]="transitionOptions" [root]="true"></p-panelMenuSub>
                        </div>
                    </div>
                </div>
            </ng-container>
        </div>
    `, isInline: true, styles: [".p-panelmenu .p-panelmenu-header-link{display:flex;align-items:center;-webkit-user-select:none;-ms-user-select:none;user-select:none;cursor:pointer;position:relative;text-decoration:none}.p-panelmenu .p-panelmenu-header-link:focus{z-index:1}.p-panelmenu .p-submenu-list{margin:0;padding:0;list-style:none}.p-panelmenu .p-menuitem-link{display:flex;align-items:center;-webkit-user-select:none;-ms-user-select:none;user-select:none;cursor:pointer;text-decoration:none}.p-panelmenu .p-menuitem-text{line-height:1}"], components: [{ type: PanelMenuSub, selector: "p-panelMenuSub", inputs: ["item", "expanded", "transitionOptions", "root"] }], directives: [{ type: i1.NgStyle, selector: "[ngStyle]", inputs: ["ngStyle"] }, { type: i1.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { type: i1.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { type: i2.Tooltip, selector: "[pTooltip]", inputs: ["tooltipPosition", "tooltipEvent", "appendTo", "positionStyle", "tooltipStyleClass", "tooltipZIndex", "escape", "showDelay", "hideDelay", "life", "positionTop", "positionLeft", "pTooltip", "tooltipDisabled", "tooltipOptions"] }, { type: i1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i3.RouterLinkWithHref, selector: "a[routerLink],area[routerLink]", inputs: ["routerLink", "target", "queryParams", "fragment", "queryParamsHandling", "preserveFragment", "skipLocationChange", "replaceUrl", "state", "relativeTo"] }, { type: i3.RouterLinkActive, selector: "[routerLinkActive]", inputs: ["routerLinkActiveOptions", "routerLinkActive"], exportAs: ["routerLinkActive"] }], animations: [
        trigger('rootItem', [
            state('hidden', style({
                height: '0',
                overflow: 'hidden'
            })),
            state('visible', style({
                height: '*'
            })),
            transition('visible <=> hidden', [style({ overflow: 'hidden' }), animate('{{transitionParams}}')]),
            transition('void => *', animate(0))
        ])
    ], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0, type: PanelMenu, decorators: [{
            type: Component,
            args: [{
                    selector: 'p-panelMenu',
                    template: `
        <div [class]="styleClass" [ngStyle]="style" [ngClass]="'p-panelmenu p-component'">
            <ng-container *ngFor="let item of model;let f=first;let l=last;">
                <div class="p-panelmenu-panel" [ngClass]="{'p-hidden': item.visible === false}">
                    <div [ngClass]="{'p-component p-panelmenu-header':true, 'p-highlight':item.expanded,'p-disabled':item.disabled}" [class]="item.styleClass" [ngStyle]="item.style" pTooltip [tooltipOptions]="item.tooltipOptions">
                        <a *ngIf="!item.routerLink" [attr.href]="item.url" (click)="handleClick($event,item)" [attr.tabindex]="item.disabled ? null : '0'" [attr.id]="item.id"
                           [attr.target]="item.target" [attr.title]="item.title" class="p-panelmenu-header-link" [attr.aria-expanded]="item.expanded" [attr.id]="item.id + '_header'" [attr.aria-controls]="item.id +'_content'">
                            <span *ngIf="item.items" class="p-panelmenu-icon pi" [ngClass]="{'pi-chevron-right':!item.expanded,'pi-chevron-down':item.expanded}"></span>
                            <span class="p-menuitem-icon" [ngClass]="item.icon" *ngIf="item.icon"></span>
                            <span class="p-menuitem-text" *ngIf="item.escape !== false; else htmlLabel">{{item.label}}</span>
                            <ng-template #htmlLabel><span class="p-menuitem-text" [innerHTML]="item.label"></span></ng-template>
                        </a>
                        <a *ngIf="item.routerLink" [routerLink]="item.routerLink" [queryParams]="item.queryParams" [routerLinkActive]="'p-menuitem-link-active'" [routerLinkActiveOptions]="item.routerLinkActiveOptions||{exact:false}"
                           (click)="handleClick($event,item)" [attr.target]="item.target" [attr.title]="item.title" class="p-panelmenu-header-link" [attr.id]="item.id" [attr.tabindex]="item.disabled ? null : '0'"
                           [fragment]="item.fragment" [queryParamsHandling]="item.queryParamsHandling" [preserveFragment]="item.preserveFragment" [skipLocationChange]="item.skipLocationChange" [replaceUrl]="item.replaceUrl" [state]="item.state">
                            <span *ngIf="item.items" class="p-panelmenu-icon pi" [ngClass]="{'pi-chevron-right':!item.expanded,'pi-chevron-down':item.expanded}"></span>
                            <span class="p-menuitem-icon" [ngClass]="item.icon" *ngIf="item.icon"></span>
                            <span class="p-menuitem-text" *ngIf="item.escape !== false; else htmlRouteLabel">{{item.label}}</span>
                            <ng-template #htmlRouteLabel><span class="p-menuitem-text" [innerHTML]="item.label"></span></ng-template>
                        </a>
                    </div>
                    <div *ngIf="item.items" class="p-toggleable-content" [@rootItem]="item.expanded ? {value: 'visible', params: {transitionParams: animating ? transitionOptions : '0ms', height: '*'}} : {value: 'hidden', params: {transitionParams: transitionOptions, height: '0'}}"  (@rootItem.done)="onToggleDone()">
                        <div class="p-panelmenu-content" role="region" [attr.id]="item.id +'_content' " [attr.aria-labelledby]="item.id +'_header'">
                            <p-panelMenuSub [item]="item" [expanded]="true" [transitionOptions]="transitionOptions" [root]="true"></p-panelMenuSub>
                        </div>
                    </div>
                </div>
            </ng-container>
        </div>
    `,
                    animations: [
                        trigger('rootItem', [
                            state('hidden', style({
                                height: '0',
                                overflow: 'hidden'
                            })),
                            state('visible', style({
                                height: '*'
                            })),
                            transition('visible <=> hidden', [style({ overflow: 'hidden' }), animate('{{transitionParams}}')]),
                            transition('void => *', animate(0))
                        ])
                    ],
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    encapsulation: ViewEncapsulation.None,
                    styleUrls: ['./panelmenu.css']
                }]
        }], ctorParameters: function () { return [{ type: i0.ChangeDetectorRef }]; }, propDecorators: { model: [{
                type: Input
            }], style: [{
                type: Input
            }], styleClass: [{
                type: Input
            }], multiple: [{
                type: Input
            }], transitionOptions: [{
                type: Input
            }] } });
export class PanelMenuModule {
}
PanelMenuModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0, type: PanelMenuModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
PanelMenuModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0, type: PanelMenuModule, declarations: [PanelMenu, PanelMenuSub], imports: [CommonModule, RouterModule, TooltipModule], exports: [PanelMenu, RouterModule, TooltipModule] });
PanelMenuModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0, type: PanelMenuModule, imports: [[CommonModule, RouterModule, TooltipModule], RouterModule, TooltipModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0, type: PanelMenuModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule, RouterModule, TooltipModule],
                    exports: [PanelMenu, RouterModule, TooltipModule],
                    declarations: [PanelMenu, PanelMenuSub]
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFuZWxtZW51LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2FwcC9jb21wb25lbnRzL3BhbmVsbWVudS9wYW5lbG1lbnUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFDLFFBQVEsRUFBQyxTQUFTLEVBQUMsS0FBSyxFQUFtQix1QkFBdUIsRUFBRSxpQkFBaUIsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUNwSCxPQUFPLEVBQUMsT0FBTyxFQUFDLEtBQUssRUFBQyxLQUFLLEVBQUMsVUFBVSxFQUFDLE9BQU8sRUFBQyxNQUFNLHFCQUFxQixDQUFDO0FBQzNFLE9BQU8sRUFBQyxZQUFZLEVBQUMsTUFBTSxpQkFBaUIsQ0FBQztBQUU3QyxPQUFPLEVBQUMsWUFBWSxFQUFDLE1BQU0saUJBQWlCLENBQUM7QUFDN0MsT0FBTyxFQUFDLGFBQWEsRUFBQyxNQUFNLGlCQUFpQixDQUFDOzs7OztBQUU5QyxNQUFNLE9BQU8saUJBQWlCO0lBRTFCLFlBQW9CLEdBQXNCO1FBQXRCLFFBQUcsR0FBSCxHQUFHLENBQW1CO0lBQUcsQ0FBQztJQUU5QyxXQUFXLENBQUMsS0FBSyxFQUFFLElBQUk7UUFDbkIsSUFBSSxJQUFJLENBQUMsUUFBUSxFQUFFO1lBQ2YsS0FBSyxDQUFDLGNBQWMsRUFBRSxDQUFDO1lBQ3ZCLE9BQU87U0FDVjtRQUVELElBQUksQ0FBQyxRQUFRLEdBQUcsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDO1FBQy9CLElBQUksQ0FBQyxHQUFHLENBQUMsYUFBYSxFQUFFLENBQUM7UUFFekIsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUU7WUFDWCxLQUFLLENBQUMsY0FBYyxFQUFFLENBQUM7U0FDMUI7UUFFRCxJQUFJLElBQUksQ0FBQyxPQUFPLEVBQUU7WUFDZCxJQUFJLENBQUMsT0FBTyxDQUFDO2dCQUNULGFBQWEsRUFBRSxLQUFLO2dCQUNwQixJQUFJLEVBQUUsSUFBSTthQUNiLENBQUMsQ0FB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QUFDLHNCQUFzQixDQUFDLENBQUMsQ0FBQzs0QkFDaEcsVUFBVSxDQUFDLFdBQVcsRUFBRSxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUM7eUJBQ3RDLENBQUM7cUJBQ0w7b0JBQ0YsZUFBZSxFQUFFLHVCQUF1QixDQUFDLE1BQU07b0JBQzlDLGFBQWEsRUFBRSxpQkFBaUIsQ0FBQyxJQUFJO29CQUNyQyxTQUFTLEVBQUUsQ0FBQyxpQkFBaUIsQ0FBQztpQkFDakM7d0dBR1ksS0FBSztzQkFBYixLQUFLO2dCQUVHLEtBQUs7c0JBQWIsS0FBSztnQkFFRyxVQUFVO3NCQUFsQixLQUFLO2dCQUVHLFFBQVE7c0JBQWhCLEtBQUs7Z0JBRUcsaUJBQWlCO3NCQUF6QixLQUFLOztBQXdDVixNQUFNLE9BQU8sZUFBZTs7NEdBQWYsZUFBZTs2R0FBZixlQUFlLGlCQWxEZixTQUFTLEVBaEVULFlBQVksYUE4R1gsWUFBWSxFQUFDLFlBQVksRUFBQyxhQUFhLGFBOUN4QyxTQUFTLEVBK0NFLFlBQVksRUFBQyxhQUFhOzZHQUdyQyxlQUFlLFlBSmYsQ0FBQyxZQUFZLEVBQUMsWUFBWSxFQUFDLGFBQWEsQ0FBQyxFQUM5QixZQUFZLEVBQUMsYUFBYTsyRkFHckMsZUFBZTtrQkFMM0IsUUFBUTttQkFBQztvQkFDTixPQUFPLEVBQUUsQ0FBQyxZQUFZLEVBQUMsWUFBWSxFQUFDLGFBQWEsQ0FBQztvQkFDbEQsT0FBTyxFQUFFLENBQUMsU0FBUyxFQUFDLFlBQVksRUFBQyxhQUFhLENBQUM7b0JBQy9DLFlBQVksRUFBRSxDQUFDLFNBQVMsRUFBQyxZQUFZLENBQUM7aUJBQ3pDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtOZ01vZHVsZSxDb21wb25lbnQsSW5wdXQsQ2hhbmdlRGV0ZWN0b3JSZWYsQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksIFZpZXdFbmNhcHN1bGF0aW9ufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7dHJpZ2dlcixzdGF0ZSxzdHlsZSx0cmFuc2l0aW9uLGFuaW1hdGV9IGZyb20gJ0Bhbmd1bGFyL2FuaW1hdGlvbnMnO1xuaW1wb3J0IHtDb21tb25Nb2R1bGV9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQge01lbnVJdGVtfSBmcm9tICdwcmltZW5nL2FwaSc7XG5pbXBvcnQge1JvdXRlck1vZHVsZX0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcbmltcG9ydCB7VG9vbHRpcE1vZHVsZX0gZnJvbSAncHJpbWVuZy90b29sdGlwJztcblxuZXhwb3J0IGNsYXNzIEJhc2VQYW5lbE1lbnVJdGVtIHtcblxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgcmVmOiBDaGFuZ2VEZXRlY3RvclJlZikge31cblxuICAgIGhhbmRsZUNsaWNrKGV2ZW50LCBpdGVtKSB7XG4gICAgICAgIGlmIChpdGVtLmRpc2FibGVkKSB7XG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgaXRlbS5leHBhbmRlZCA9ICFpdGVtLmV4cGFuZGVkO1xuICAgICAgICB0aGlzLnJlZi5kZXRlY3RDaGFuZ2VzKCk7XG5cbiAgICAgICAgaWYgKCFpdGVtLnVybCkge1xuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChpdGVtLmNvbW1hbmQpIHtcbiAgICAgICAgICAgIGl0ZW0uY29tbWFuZCh7XG4gICAgICAgICAgICAgICAgb3JpZ2luYWxFdmVudDogZXZlbnQsXG4gICAgICAgICAgICAgICAgaXRlbTogaXRlbVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9XG59XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAncC1wYW5lbE1lbnVTdWInLFxuICAgIHRlbXBsYXRlOiBgXG4gICAgICAgIDx1bCBbbmdDbGFzc109XCJ7J3Atc3VibWVudS1saXN0JzogdHJ1ZSwgJ3AtcGFuZWxtZW51LXJvb3Qtc3VibWVudSc6IHJvb3R9XCIgW0BzdWJtZW51XT1cImV4cGFuZGVkID8ge3ZhbHVlOiAndmlzaWJsZScsIHBhcmFtczoge3RyYW5zaXRpb25QYXJhbXM6IHRyYW5zaXRpb25PcHRpb25zLCBoZWlnaHQ6ICcqJ319IDoge3ZhbHVlOiAnaGlkZGVuJywgcGFyYW1zOiB7dHJhbnNpdGlvblBhcmFtczogdHJhbnNpdGlvbk9wdGlvbnMsIGhlaWdodDogJzAnfX1cIiByb2xlPVwidHJlZVwiPlxuICAgICAgICAgICAgPG5nLXRlbXBsYXRlIG5nRm9yIGxldC1jaGlsZCBbbmdGb3JPZl09XCJpdGVtLml0ZW1zXCI+XG4gICAgICAgICAgICAgICAgPGxpICpuZ0lmPVwiY2hpbGQuc2VwYXJhdG9yXCIgY2xhc3M9XCJwLW1lbnUtc2VwYXJhdG9yXCIgcm9sZT1cInNlcGFyYXRvclwiPlxuICAgICAgICAgICAgICAgIDxsaSAqbmdJZj1cIiFjaGlsZC5zZXBhcmF0b3JcIiBjbGFzcz1cInAtbWVudWl0ZW1cIiBbbmdDbGFzc109XCJjaGlsZC5zdHlsZUNsYXNzXCIgW2NsYXNzLnAtaGlkZGVuXT1cImNoaWxkLnZpc2libGUgPT09IGZhbHNlXCIgW25nU3R5bGVdPVwiY2hpbGQuc3R5bGVcIiBwVG9vbHRpcCBbdG9vbHRpcE9wdGlvbnNdPVwiY2hpbGQudG9vbHRpcE9wdGlvbnNcIj5cbiAgICAgICAgICAgICAgICAgICAgPGEgKm5nSWY9XCIhY2hpbGQucm91dGVyTGlua1wiIFthdHRyLmhyZWZdPVwiY2hpbGQudXJsXCIgY2xhc3M9XCJwLW1lbnVpdGVtLWxpbmtcIiBbYXR0ci50YWJpbmRleF09XCIhaXRlbS5leHBhbmRlZCA/IG51bGwgOiBjaGlsZC5kaXNhYmxlZCA/IG51bGwgOiAnMCdcIiBbYXR0ci5pZF09XCJjaGlsZC5pZFwiXG4gICAgICAgICAgICAgICAgICAgICAgICBbbmdDbGFzc109XCJ7J3AtZGlzYWJsZWQnOmNoaWxkLmRpc2FibGVkfVwiIHJvbGU9XCJ0cmVlaXRlbVwiIFthdHRyLmFyaWEtZXhwYW5kZWRdPVwiY2hpbGQuZXhwYW5kZWRcIlxuICAgICAgICAgICAgICAgICAgICAgICAgKGNsaWNrKT1cImhhbmRsZUNsaWNrKCRldmVudCxjaGlsZClcIiBbYXR0ci50YXJnZXRdPVwiY2hpbGQudGFyZ2V0XCIgW2F0dHIudGl0bGVdPVwiY2hpbGQudGl0bGVcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwicC1wYW5lbG1lbnUtaWNvbiBwaSBwaS1md1wiIFtuZ0NsYXNzXT1cInsncGktYW5nbGUtcmlnaHQnOiFjaGlsZC5leHBhbmRlZCwncGktYW5nbGUtZG93bic6Y2hpbGQuZXhwYW5kZWR9XCIgKm5nSWY9XCJjaGlsZC5pdGVtc1wiPjwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwicC1tZW51aXRlbS1pY29uXCIgW25nQ2xhc3NdPVwiY2hpbGQuaWNvblwiICpuZ0lmPVwiY2hpbGQuaWNvblwiPjwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwicC1tZW51aXRlbS10ZXh0XCIgKm5nSWY9XCJjaGlsZC5lc2NhcGUgIT09IGZhbHNlOyBlbHNlIGh0bWxMYWJlbFwiPnt7Y2hpbGQubGFiZWx9fTwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxuZy10ZW1wbGF0ZSAjaHRtbExhYmVsPjxzcGFuIGNsYXNzPVwicC1tZW51aXRlbS10ZXh0XCIgW2lubmVySFRNTF09XCJjaGlsZC5sYWJlbFwiPjwvc3Bhbj48L25nLXRlbXBsYXRlPlxuICAgICAgICAgICAgICAgICAgICA8L2E+XG4gICAgICAgICAgICAgICAgICAgIDxhICpuZ0lmPVwiY2hpbGQucm91dGVyTGlua1wiIFtyb3V0ZXJMaW5rXT1cImNoaWxkLnJvdXRlckxpbmtcIiBbcXVlcnlQYXJhbXNdPVwiY2hpbGQucXVlcnlQYXJhbXNcIiBbcm91dGVyTGlua0FjdGl2ZV09XCIncC1tZW51aXRlbS1saW5rLWFjdGl2ZSdcIiBbcm91dGVyTGlua0FjdGl2ZU9wdGlvbnNdPVwiY2hpbGQucm91dGVyTGlua0FjdGl2ZU9wdGlvbnN8fHtleGFjdDpmYWxzZX1cIiBjbGFzcz1cInAtbWVudWl0ZW0tbGlua1wiXG4gICAgICAgICAgICAgICAgICAgICAgICBbbmdDbGFzc109XCJ7J3AtZGlzYWJsZWQnOmNoaWxkLmRpc2FibGVkfVwiIFthdHRyLnRhYmluZGV4XT1cIiFpdGVtLmV4cGFuZGVkID8gbnVsbCA6IGNoaWxkLmRpc2FibGVkID8gbnVsbCA6ICcwJ1wiIFthdHRyLmlkXT1cImNoaWxkLmlkXCIgcm9sZT1cInRyZWVpdGVtXCIgW2F0dHIuYXJpYS1leHBhbmRlZF09XCJjaGlsZC5leHBhbmRlZFwiXG4gICAgICAgICAgICAgICAgICAgICAgICAoY2xpY2spPVwiaGFuZGxlQ2xpY2soJGV2ZW50LGNoaWxkKVwiIFthdHRyLnRhcmdldF09XCJjaGlsZC50YXJnZXRcIiBbYXR0ci50aXRsZV09XCJjaGlsZC50aXRsZVwiXG4gICAgICAgICAgICAgICAgICAgICAgICBbZnJhZ21lbnRdPVwiY2hpbGQuZnJhZ21lbnRcIiBbcXVlcnlQYXJhbXNIYW5kbGluZ109XCJjaGlsZC5xdWVyeVBhcmFtc0hhbmRsaW5nXCIgW3ByZXNlcnZlRnJhZ21lbnRdPVwiY2hpbGQucHJlc2VydmVGcmFnbWVudFwiIFtza2lwTG9jYXRpb25DaGFuZ2VdPVwiY2hpbGQuc2tpcExvY2F0aW9uQ2hhbmdlXCIgW3JlcGxhY2VVcmxdPVwiY2hpbGQucmVwbGFjZVVybFwiIFtzdGF0ZV09XCJjaGlsZC5zdGF0ZVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJwLXBhbmVsbWVudS1pY29uIHBpIHBpLWZ3XCIgW25nQ2xhc3NdPVwieydwaS1hbmdsZS1yaWdodCc6IWNoaWxkLmV4cGFuZGVkLCdwaS1hbmdsZS1kb3duJzpjaGlsZC5leHBhbmRlZH1cIiAqbmdJZj1cImNoaWxkLml0ZW1zXCI+PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJwLW1lbnVpdGVtLWljb25cIiBbbmdDbGFzc109XCJjaGlsZC5pY29uXCIgKm5nSWY9XCJjaGlsZC5pY29uXCI+PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJwLW1lbnVpdGVtLXRleHRcIiAqbmdJZj1cImNoaWxkLmVzY2FwZSAhPT0gZmFsc2U7IGVsc2UgaHRtbFJvdXRlTGFiZWxcIj57e2NoaWxkLmxhYmVsfX08L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICA8bmctdGVtcGxhdGUgI2h0bWxSb3V0ZUxhYmVsPjxzcGFuIGNsYXNzPVwicC1tZW51aXRlbS10ZXh0XCIgW2lubmVySFRNTF09XCJjaGlsZC5sYWJlbFwiPjwvc3Bhbj48L25nLXRlbXBsYXRlPlxuICAgICAgICAgICAgICAgICAgICA8L2E+XG4gICAgICAgICAgICAgICAgICAgIDxwLXBhbmVsTWVudVN1YiBbaXRlbV09XCJjaGlsZFwiIFtleHBhbmRlZF09XCJjaGlsZC5leHBhbmRlZFwiIFt0cmFuc2l0aW9uT3B0aW9uc109XCJ0cmFuc2l0aW9uT3B0aW9uc1wiICpuZ0lmPVwiY2hpbGQuaXRlbXNcIj48L3AtcGFuZWxNZW51U3ViPlxuICAgICAgICAgICAgICAgIDwvbGk+XG4gICAgICAgICAgICA8L25nLXRlbXBsYXRlPlxuICAgICAgICA8L3VsPlxuICAgIGAsXG4gICAgYW5pbWF0aW9uczogW1xuICAgICAgICB0cmlnZ2VyKCdzdWJtZW51JywgW1xuICAgICAgICAgICAgc3RhdGUoJ2hpZGRlbicsIHN0eWxlKHtcbiAgICAgICAgICAgICAgICBoZWlnaHQ6ICcwJyxcbiAgICAgICAgICAgICAgICBvdmVyZmxvdzogJ2hpZGRlbidcbiAgICAgICAgICAgIH0pKSxcbiAgICAgICAgICAgIHN0YXRlKCd2aXNpYmxlJywgc3R5bGUoe1xuICAgICAgICAgICAgICAgIGhlaWdodDogJyonXG4gICAgICAgICAgICB9KSksXG4gICAgICAgICAgICB0cmFuc2l0aW9uKCd2aXNpYmxlIDw9PiBoaWRkZW4nLCBbc3R5bGUoe292ZXJmbG93OiAnaGlkZGVuJ30pLCBhbmltYXRlKCd7e3RyYW5zaXRpb25QYXJhbXN9fScpXSksXG4gICAgICAgICAgICB0cmFuc2l0aW9uKCd2b2lkID0+IConLCBhbmltYXRlKDApKVxuICAgICAgICBdKVxuICAgIF0sXG4gICAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZVxufSlcbmV4cG9ydCBjbGFzcyBQYW5lbE1lbnVTdWIgZXh0ZW5kcyBCYXNlUGFuZWxNZW51SXRlbSB7XG5cbiAgICBASW5wdXQoKSBpdGVtOiBNZW51SXRlbTtcblxuICAgIEBJbnB1dCgpIGV4cGFuZGVkOiBib29sZWFuO1xuXG4gICAgQElucHV0KCkgdHJhbnNpdGlvbk9wdGlvbnM6IHN0cmluZztcblxuICAgIEBJbnB1dCgpIHJvb3Q6IGJvb2xlYW47XG5cbiAgICBjb25zdHJ1Y3RvcihyZWY6IENoYW5nZURldGVjdG9yUmVmKSB7XG4gICAgICAgIHN1cGVyKHJlZik7XG4gICAgfVxufVxuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ3AtcGFuZWxNZW51JyxcbiAgICB0ZW1wbGF0ZTogYFxuICAgICAgICA8ZGl2IFtjbGFzc109XCJzdHlsZUNsYXNzXCIgW25nU3R5bGVdPVwic3R5bGVcIiBbbmdDbGFzc109XCIncC1wYW5lbG1lbnUgcC1jb21wb25lbnQnXCI+XG4gICAgICAgICAgICA8bmctY29udGFpbmVyICpuZ0Zvcj1cImxldCBpdGVtIG9mIG1vZGVsO2xldCBmPWZpcnN0O2xldCBsPWxhc3Q7XCI+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInAtcGFuZWxtZW51LXBhbmVsXCIgW25nQ2xhc3NdPVwieydwLWhpZGRlbic6IGl0ZW0udmlzaWJsZSA9PT0gZmFsc2V9XCI+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgW25nQ2xhc3NdPVwieydwLWNvbXBvbmVudCBwLXBhbmVsbWVudS1oZWFkZXInOnRydWUsICdwLWhpZ2hsaWdodCc6aXRlbS5leHBhbmRlZCwncC1kaXNhYmxlZCc6aXRlbS5kaXNhYmxlZH1cIiBbY2xhc3NdPVwiaXRlbS5zdHlsZUNsYXNzXCIgW25nU3R5bGVdPVwiaXRlbS5zdHlsZVwiIHBUb29sdGlwIFt0b29sdGlwT3B0aW9uc109XCJpdGVtLnRvb2x0aXBPcHRpb25zXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8YSAqbmdJZj1cIiFpdGVtLnJvdXRlckxpbmtcIiBbYXR0ci5ocmVmXT1cIml0ZW0udXJsXCIgKGNsaWNrKT1cImhhbmRsZUNsaWNrKCRldmVudCxpdGVtKVwiIFthdHRyLnRhYmluZGV4XT1cIml0ZW0uZGlzYWJsZWQgPyBudWxsIDogJzAnXCIgW2F0dHIuaWRdPVwiaXRlbS5pZFwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICBbYXR0ci50YXJnZXRdPVwiaXRlbS50YXJnZXRcIiBbYXR0ci50aXRsZV09XCJpdGVtLnRpdGxlXCIgY2xhc3M9XCJwLXBhbmVsbWVudS1oZWFkZXItbGlua1wiIFthdHRyLmFyaWEtZXhwYW5kZWRdPVwiaXRlbS5leHBhbmRlZFwiIFthdHRyLmlkXT1cIml0ZW0uaWQgKyAnX2hlYWRlcidcIiBbYXR0ci5hcmlhLWNvbnRyb2xzXT1cIml0ZW0uaWQgKydfY29udGVudCdcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiAqbmdJZj1cIml0ZW0uaXRlbXNcIiBjbGFzcz1cInAtcGFuZWxtZW51LWljb24gcGlcIiBbbmdDbGFzc109XCJ7J3BpLWNoZXZyb24tcmlnaHQnOiFpdGVtLmV4cGFuZGVkLCdwaS1jaGV2cm9uLWRvd24nOml0ZW0uZXhwYW5kZWR9XCI+PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwicC1tZW51aXRlbS1pY29uXCIgW25nQ2xhc3NdPVwiaXRlbS5pY29uXCIgKm5nSWY9XCJpdGVtLmljb25cIj48L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJwLW1lbnVpdGVtLXRleHRcIiAqbmdJZj1cIml0ZW0uZXNjYXBlICE9PSBmYWxzZTsgZWxzZSBodG1sTGFiZWxcIj57e2l0ZW0ubGFiZWx9fTwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8bmctdGVtcGxhdGUgI2h0bWxMYWJlbD48c3BhbiBjbGFzcz1cInAtbWVudWl0ZW0tdGV4dFwiIFtpbm5lckhUTUxdPVwiaXRlbS5sYWJlbFwiPjwvc3Bhbj48L25nLXRlbXBsYXRlPlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9hPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGEgKm5nSWY9XCJpdGVtLnJvdXRlckxpbmtcIiBbcm91dGVyTGlua109XCJpdGVtLnJvdXRlckxpbmtcIiBbcXVlcnlQYXJhbXNdPVwiaXRlbS5xdWVyeVBhcmFtc1wiIFtyb3V0ZXJMaW5rQWN0aXZlXT1cIidwLW1lbnVpdGVtLWxpbmstYWN0aXZlJ1wiIFtyb3V0ZXJMaW5rQWN0aXZlT3B0aW9uc109XCJpdGVtLnJvdXRlckxpbmtBY3RpdmVPcHRpb25zfHx7ZXhhY3Q6ZmFsc2V9XCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgIChjbGljayk9XCJoYW5kbGVDbGljaygkZXZlbnQsaXRlbSlcIiBbYXR0ci50YXJnZXRdPVwiaXRlbS50YXJnZXRcIiBbYXR0ci50aXRsZV09XCJpdGVtLnRpdGxlXCIgY2xhc3M9XCJwLXBhbmVsbWVudS1oZWFkZXItbGlua1wiIFthdHRyLmlkXT1cIml0ZW0uaWRcIiBbYXR0ci50YWJpbmRleF09XCJpdGVtLmRpc2FibGVkID8gbnVsbCA6ICcwJ1wiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICBbZnJhZ21lbnRdPVwiaXRlbS5mcmFnbWVudFwiIFtxdWVyeVBhcmFtc0hhbmRsaW5nXT1cIml0ZW0ucXVlcnlQYXJhbXNIYW5kbGluZ1wiIFtwcmVzZXJ2ZUZyYWdtZW50XT1cIml0ZW0ucHJlc2VydmVGcmFnbWVudFwiIFtza2lwTG9jYXRpb25DaGFuZ2VdPVwiaXRlbS5za2lwTG9jYXRpb25DaGFuZ2VcIiBbcmVwbGFjZVVybF09XCJpdGVtLnJlcGxhY2VVcmxcIiBbc3RhdGVdPVwiaXRlbS5zdGF0ZVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuICpuZ0lmPVwiaXRlbS5pdGVtc1wiIGNsYXNzPVwicC1wYW5lbG1lbnUtaWNvbiBwaVwiIFtuZ0NsYXNzXT1cInsncGktY2hldnJvbi1yaWdodCc6IWl0ZW0uZXhwYW5kZWQsJ3BpLWNoZXZyb24tZG93bic6aXRlbS5leHBhbmRlZH1cIj48L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJwLW1lbnVpdGVtLWljb25cIiBbbmdDbGFzc109XCJpdGVtLmljb25cIiAqbmdJZj1cIml0ZW0uaWNvblwiPjwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cInAtbWVudWl0ZW0tdGV4dFwiICpuZ0lmPVwiaXRlbS5lc2NhcGUgIT09IGZhbHNlOyBlbHNlIGh0bWxSb3V0ZUxhYmVsXCI+e3tpdGVtLmxhYmVsfX08L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPG5nLXRlbXBsYXRlICNodG1sUm91dGVMYWJlbD48c3BhbiBjbGFzcz1cInAtbWVudWl0ZW0tdGV4dFwiIFtpbm5lckhUTUxdPVwiaXRlbS5sYWJlbFwiPjwvc3Bhbj48L25nLXRlbXBsYXRlPlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9hPlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiAqbmdJZj1cIml0ZW0uaXRlbXNcIiBjbGFzcz1cInAtdG9nZ2xlYWJsZS1jb250ZW50XCIgW0Byb290SXRlbV09XCJpdGVtLmV4cGFuZGVkID8ge3ZhbHVlOiAndmlzaWJsZScsIHBhcmFtczoge3RyYW5zaXRpb25QYXJhbXM6IGFuaW1hdGluZyA/IHRyYW5zaXRpb25PcHRpb25zIDogJzBtcycsIGhlaWdodDogJyonfX0gOiB7dmFsdWU6ICdoaWRkZW4nLCBwYXJhbXM6IHt0cmFuc2l0aW9uUGFyYW1zOiB0cmFuc2l0aW9uT3B0aW9ucywgaGVpZ2h0OiAnMCd9fVwiICAoQHJvb3RJdGVtLmRvbmUpPVwib25Ub2dnbGVEb25lKClcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJwLXBhbmVsbWVudS1jb250ZW50XCIgcm9sZT1cInJlZ2lvblwiIFthdHRyLmlkXT1cIml0ZW0uaWQgKydfY29udGVudCcgXCIgW2F0dHIuYXJpYS1sYWJlbGxlZGJ5XT1cIml0ZW0uaWQgKydfaGVhZGVyJ1wiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxwLXBhbmVsTWVudVN1YiBbaXRlbV09XCJpdGVtXCIgW2V4cGFuZGVkXT1cInRydWVcIiBbdHJhbnNpdGlvbk9wdGlvbnNdPVwidHJhbnNpdGlvbk9wdGlvbnNcIiBbcm9vdF09XCJ0cnVlXCI+PC9wLXBhbmVsTWVudVN1Yj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvbmctY29udGFpbmVyPlxuICAgICAgICA8L2Rpdj5cbiAgICBgLFxuICAgIGFuaW1hdGlvbnM6IFtcbiAgICAgICAgdHJpZ2dlcigncm9vdEl0ZW0nLCBbXG4gICAgICAgICAgICBzdGF0ZSgnaGlkZGVuJywgc3R5bGUoe1xuICAgICAgICAgICAgICAgIGhlaWdodDogJzAnLFxuICAgICAgICAgICAgICAgIG92ZXJmbG93OiAnaGlkZGVuJ1xuICAgICAgICAgICAgfSkpLFxuICAgICAgICAgICAgc3RhdGUoJ3Zpc2libGUnLCBzdHlsZSh7XG4gICAgICAgICAgICAgICAgaGVpZ2h0OiAnKidcbiAgICAgICAgICAgIH0pKSxcbiAgICAgICAgICAgIHRyYW5zaXRpb24oJ3Zpc2libGUgPD0+IGhpZGRlbicsIFtzdHlsZSh7b3ZlcmZsb3c6ICdoaWRkZW4nfSksIGFuaW1hdGUoJ3t7dHJhbnNpdGlvblBhcmFtc319JyldKSxcbiAgICAgICAgICAgIHRyYW5zaXRpb24oJ3ZvaWQgPT4gKicsIGFuaW1hdGUoMCkpXG4gICAgICAgIF0pXG4gICAgXSxcbiAgIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxuICAgIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmUsXG4gICAgc3R5bGVVcmxzOiBbJy4vcGFuZWxtZW51LmNzcyddXG59KVxuZXhwb3J0IGNsYXNzIFBhbmVsTWVudSBleHRlbmRzIEJhc2VQYW5lbE1lbnVJdGVtIHtcblxuICAgIEBJbnB1dCgpIG1vZGVsOiBNZW51SXRlbVtdO1xuXG4gICAgQElucHV0KCkgc3R5bGU6IGFueTtcblxuICAgIEBJbnB1dCgpIHN0eWxlQ2xhc3M6IHN0cmluZztcblxuICAgIEBJbnB1dCgpIG11bHRpcGxlOiBib29sZWFuID0gdHJ1ZTtcblxuICAgIEBJbnB1dCgpIHRyYW5zaXRpb25PcHRpb25zOiBzdHJpbmcgPSAnNDAwbXMgY3ViaWMtYmV6aWVyKDAuODYsIDAsIDAuMDcsIDEpJztcblxuICAgIHB1YmxpYyBhbmltYXRpbmc6IGJvb2xlYW47XG5cbiAgICBjb25zdHJ1Y3RvcihyZWY6IENoYW5nZURldGVjdG9yUmVmKSB7XG4gICAgICAgIHN1cGVyKHJlZik7XG4gICAgfVxuXG4gICAgY29sbGFwc2VBbGwoKSB7XG4gICAgXHRmb3IobGV0IGl0ZW0gb2YgdGhpcy5tb2RlbCkge1xuICAgIFx0XHRpZiAoaXRlbS5leHBhbmRlZCkge1xuICAgIFx0XHRcdGl0ZW0uZXhwYW5kZWQgPSBmYWxzZTtcbiAgICBcdFx0fVxuICAgIFx0fVxuICAgIH1cblxuICAgIGhhbmRsZUNsaWNrKGV2ZW50LCBpdGVtKSB7XG4gICAgXHRpZiAoIXRoaXMubXVsdGlwbGUpIHtcbiAgICAgICAgICAgIGZvcihsZXQgbW9kZWxJdGVtIG9mIHRoaXMubW9kZWwpIHtcbiAgICAgICAgXHRcdGlmIChpdGVtICE9PSBtb2RlbEl0ZW0gJiYgbW9kZWxJdGVtLmV4cGFuZGVkKSB7XG4gICAgICAgIFx0XHRcdG1vZGVsSXRlbS5leHBhbmRlZCA9IGZhbHNlO1xuICAgICAgICBcdFx0fVxuICAgICAgICBcdH1cbiAgICBcdH1cblxuICAgICAgICB0aGlzLmFuaW1hdGluZyA9IHRydWU7XG4gICAgICAgIHN1cGVyLmhhbmRsZUNsaWNrKGV2ZW50LCBpdGVtKTtcbiAgICB9XG5cbiAgICBvblRvZ2dsZURvbmUoKSB7XG4gICAgICAgIHRoaXMuYW5pbWF0aW5nID0gZmFsc2U7XG4gICAgfVxuXG59XG5cbkBOZ01vZHVsZSh7XG4gICAgaW1wb3J0czogW0NvbW1vbk1vZHVsZSxSb3V0ZXJNb2R1bGUsVG9vbHRpcE1vZHVsZV0sXG4gICAgZXhwb3J0czogW1BhbmVsTWVudSxSb3V0ZXJNb2R1bGUsVG9vbHRpcE1vZHVsZV0sXG4gICAgZGVjbGFyYXRpb25zOiBbUGFuZWxNZW51LFBhbmVsTWVudVN1Yl1cbn0pXG5leHBvcnQgY2xhc3MgUGFuZWxNZW51TW9kdWxlIHsgfVxuIl19