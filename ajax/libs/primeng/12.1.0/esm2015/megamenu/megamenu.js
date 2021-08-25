import { NgModule, Component, Input, ChangeDetectionStrategy, ViewEncapsulation, ContentChildren } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrimeTemplate } from 'primeng/api';
import { RouterModule } from '@angular/router';
import { RippleModule } from 'primeng/ripple';
import { TooltipModule } from 'primeng/tooltip';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
import * as i2 from "primeng/tooltip";
import * as i3 from "primeng/ripple";
import * as i4 from "@angular/router";
export class MegaMenu {
    constructor(el, renderer, cd) {
        this.el = el;
        this.renderer = renderer;
        this.cd = cd;
        this.orientation = 'horizontal';
        this.autoZIndex = true;
        this.baseZIndex = 0;
    }
    ngAfterContentInit() {
        this.templates.forEach((item) => {
            switch (item.getType()) {
                case 'start':
                    this.startTemplate = item.template;
                    break;
                case 'end':
                    this.endTemplate = item.template;
                    break;
            }
        });
    }
    onCategoryMouseEnter(event, menuitem) {
        if (menuitem.disabled) {
            event.preventDefault();
            return;
        }
        if (this.activeItem) {
            this.activeItem = menuitem;
        }
    }
    onCategoryClick(event, item) {
        if (item.disabled) {
            event.preventDefault();
            return;
        }
        if (!item.url) {
            event.preventDefault();
        }
        if (item.command) {
            item.command({
                originalEvent: event,
                item: item
            });
        }
        if (item.items) {
            if (this.activeItem && this.activeItem === item) {
                this.activeItem = null;
                this.unbindDocumentClickListener();
            }
            else {
                this.activeItem = item;
                this.bindDocumentClickListener();
            }
        }
    }
    itemClick(event, item) {
        if (item.disabled) {
            event.preventDefault();
            return;
        }
        if (!item.url) {
            event.preventDefault();
        }
        if (item.command) {
            item.command({
                originalEvent: event,
                item: item
            });
        }
        this.activeItem = null;
    }
    getColumnClass(menuitem) {
        let length = menuitem.items ? menuitem.items.length : 0;
        let columnClass;
        switch (length) {
            case 2:
                columnClass = 'p-megamenu-col-6';
                break;
            case 3:
                columnClass = 'p-megamenu-col-4';
                break;
            case 4:
                columnClass = 'p-megamenu-col-3';
                break;
            case 6:
                columnClass = 'p-megamenu-col-2';
                break;
            default:
                columnClass = 'p-megamenu-col-12';
                break;
        }
        return columnClass;
    }
    bindDocumentClickListener() {
        if (!this.documentClickListener) {
            this.documentClickListener = (event) => {
                if (this.el && !this.el.nativeElement.contains(event.target)) {
                    this.activeItem = null;
                    this.unbindDocumentClickListener();
                    this.cd.markForCheck();
                }
            };
            document.addEventListener('click', this.documentClickListener);
        }
    }
    unbindDocumentClickListener() {
        if (this.documentClickListener) {
            document.removeEventListener('click', this.documentClickListener);
            this.documentClickListener = null;
        }
    }
}
MegaMenu.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0, type: MegaMenu, deps: [{ token: i0.ElementRef }, { token: i0.Renderer2 }, { token: i0.ChangeDetectorRef }], target: i0.ɵɵFactoryTarget.Component });
MegaMenu.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.0.5", type: MegaMenu, selector: "p-megaMenu", inputs: { model: "model", style: "style", styleClass: "styleClass", orientation: "orientation", autoZIndex: "autoZIndex", baseZIndex: "baseZIndex" }, queries: [{ propertyName: "templates", predicate: PrimeTemplate }], ngImport: i0, template: `
        <div [class]="styleClass" [ngStyle]="style"
            [ngClass]="{'p-megamenu p-component':true,'p-megamenu-horizontal': orientation == 'horizontal','p-megamenu-vertical': orientation == 'vertical'}">
            <div class="p-megamenu-start" *ngIf="startTemplate">
                <ng-container *ngTemplateOutlet="startTemplate"></ng-container>
            </div>
            <ul class="p-megamenu-root-list" role="menubar">
                <ng-template ngFor let-category [ngForOf]="model">
                    <li *ngIf="category.separator" class="p-menu-separator" [ngClass]="{'p-hidden': category.visible === false}">
                    <li *ngIf="!category.separator" [ngClass]="{'p-menuitem':true,'p-menuitem-active':category==activeItem, 'p-hidden': category.visible === false}" pTooltip [tooltipOptions]="category.tooltipOptions"
                        (mouseenter)="onCategoryMouseEnter($event, category)">
                        <a *ngIf="!category.routerLink" [href]="category.url||'#'" [attr.target]="category.target" [attr.title]="category.title" [attr.id]="category.id" (click)="onCategoryClick($event, category)" [attr.tabindex]="category.tabindex ? category.tabindex : '0'"
                            [ngClass]="{'p-menuitem-link':true,'p-disabled':category.disabled}" [ngStyle]="category.style" [class]="category.styleClass" pRipple>
                            <span class="p-menuitem-icon" *ngIf="category.icon" [ngClass]="category.icon"></span>
                            <span class="p-menuitem-text" *ngIf="category.escape !== false; else categoryHtmlLabel">{{category.label}}</span>
                            <ng-template #categoryHtmlLabel><span class="p-menuitem-text" [innerHTML]="category.label"></span></ng-template>
                            <span *ngIf="category.items" class="p-submenu-icon pi" [ngClass]="{'pi-angle-down':orientation=='horizontal','pi-angle-right':orientation=='vertical'}"></span>
                        </a>
                        <a *ngIf="category.routerLink" [routerLink]="category.routerLink" [queryParams]="category.queryParams" [routerLinkActive]="'p-menuitem-link-active'" [routerLinkActiveOptions]="category.routerLinkActiveOptions||{exact:false}" [attr.tabindex]="category.tabindex ? category.tabindex : '0'"
                            [attr.target]="category.target" [attr.title]="category.title" [attr.id]="category.id"
                            (click)="onCategoryClick($event, category)" [ngClass]="{'p-menuitem-link':true,'p-disabled':category.disabled}" [ngStyle]="category.style" [class]="category.styleClass"
                            [fragment]="category.fragment" [queryParamsHandling]="category.queryParamsHandling" [preserveFragment]="category.preserveFragment" [skipLocationChange]="category.skipLocationChange" [replaceUrl]="category.replaceUrl" [state]="category.state" pRipple>
                            <span class="p-menuitem-icon" *ngIf="category.icon" [ngClass]="category.icon"></span>
                            <span class="p-menuitem-text" *ngIf="category.escape !== false; else categoryHtmlRouteLabel">{{category.label}}</span>
                            <ng-template #categoryHtmlRouteLabel><span class="p-menuitem-text" [innerHTML]="category.label"></span></ng-template>
                        </a>
                        <div class="p-megamenu-panel" *ngIf="category.items">
                            <div class="p-megamenu-grid">
                                <ng-template ngFor let-column [ngForOf]="category.items">
                                    <div [class]="getColumnClass(category)">
                                        <ng-template ngFor let-submenu [ngForOf]="column">
                                            <ul class="p-megamenu-submenu" role="menu">
                                                <li class="p-megamenu-submenu-header">
                                                    <span *ngIf="submenu.escape !== false; else submenuHtmlLabel">{{submenu.label}}</span>
                                                    <ng-template #submenuHtmlLabel><span [innerHTML]="submenu.label"></span></ng-template>
                                                </li>
                                                <ng-template ngFor let-item [ngForOf]="submenu.items">
                                                    <li *ngIf="item.separator" class="p-menu-separator" [ngClass]="{'p-hidden': item.visible === false}" role="separator">
                                                    <li *ngIf="!item.separator" class="p-menuitem" [ngClass]="{'p-hidden': item.visible === false}" role="none" pTooltip [tooltipOptions]="item.tooltipOptions">
                                                        <a *ngIf="!item.routerLink" role="menuitem" [href]="item.url||'#'" class="p-menuitem-link" [attr.target]="item.target" [attr.title]="item.title" [attr.id]="item.id" [attr.tabindex]="item.tabindex ? item.tabindex : '0'"
                                                            [ngClass]="{'p-disabled':item.disabled}" (click)="itemClick($event, item)" pRipple>
                                                            <span class="p-menuitem-icon" *ngIf="item.icon" [ngClass]="item.icon"></span>
                                                            <span class="p-menuitem-text" *ngIf="item.escape !== false; else htmlLabel">{{item.label}}</span>
                                                            <ng-template #htmlLabel><span class="p-menuitem-text" [innerHTML]="item.label"></span></ng-template>
                                                        </a>
                                                        <a *ngIf="item.routerLink" role="menuitem" [routerLink]="item.routerLink" [queryParams]="item.queryParams" [routerLinkActive]="'p-menuitem-link-active'" [attr.tabindex]="item.tabindex ? item.tabindex : '0'"
                                                            [routerLinkActiveOptions]="item.routerLinkActiveOptions||{exact:false}" class="p-menuitem-link"
                                                             [attr.target]="item.target" [attr.title]="item.title" [attr.id]="item.id"
                                                            [ngClass]="{'p-disabled':item.disabled}" (click)="itemClick($event, item)"
                                                            [fragment]="item.fragment" [queryParamsHandling]="item.queryParamsHandling" [preserveFragment]="item.preserveFragment" [skipLocationChange]="item.skipLocationChange" [replaceUrl]="item.replaceUrl" [state]="item.state" pRipple>
                                                            <span class="p-menuitem-icon" *ngIf="item.icon" [ngClass]="item.icon"></span>
                                                            <span class="p-menuitem-text" *ngIf="item.escape !== false; else htmlRouteLabel">{{item.label}}</span>
                                                            <ng-template #htmlRouteLabel><span class="p-menuitem-text" [innerHTML]="item.label"></span></ng-template>
                                                        </a>
                                                    </li>
                                                </ng-template>
                                            </ul>
                                        </ng-template>
                                    </div>
                                </ng-template>
                            </div>
                        </div>
                    </li>
                </ng-template>
                <div class="p-megamenu-end" *ngIf="endTemplate; else legacy">
                    <ng-container *ngTemplateOutlet="endTemplate"></ng-container>
                </div>
                <ng-template #legacy>
                    <div class="p-megamenu-end">
                        <ng-content></ng-content>
                    </div>
                </ng-template>
            </ul>
        </div>
    `, isInline: true, styles: [".p-megamenu-root-list{margin:0;padding:0;list-style:none}.p-megamenu-root-list>.p-menuitem{position:relative}.p-megamenu .p-menuitem-link{cursor:pointer;display:flex;align-items:center;text-decoration:none;overflow:hidden;position:relative}.p-megamenu .p-menuitem-text{line-height:1}.p-megamenu-panel{display:none;position:absolute;width:auto;z-index:1}.p-megamenu-root-list>.p-menuitem-active>.p-megamenu-panel{display:block}.p-megamenu-submenu{margin:0;padding:0;list-style:none}.p-megamenu-horizontal .p-megamenu-root-list{display:flex;align-items:center;flex-wrap:wrap}.p-megamenu-vertical .p-megamenu-root-list{flex-direction:column}.p-megamenu-vertical .p-megamenu-root-list>.p-menuitem-active>.p-megamenu-panel{left:100%;top:0}.p-megamenu-vertical .p-megamenu-root-list>.p-menuitem>.p-menuitem-link>.p-submenu-icon{margin-left:auto}.p-megamenu-grid{display:flex}.p-megamenu-col-2,.p-megamenu-col-3,.p-megamenu-col-4,.p-megamenu-col-6,.p-megamenu-col-12{flex:0 0 auto;padding:.5rem}.p-megamenu-col-2{width:16.6667%}.p-megamenu-col-3{width:25%}.p-megamenu-col-4{width:33.3333%}.p-megamenu-col-6{width:50%}.p-megamenu-col-12{width:100%}"], directives: [{ type: i1.NgStyle, selector: "[ngStyle]", inputs: ["ngStyle"] }, { type: i1.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { type: i1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i1.NgTemplateOutlet, selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet"] }, { type: i1.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { type: i2.Tooltip, selector: "[pTooltip]", inputs: ["tooltipPosition", "tooltipEvent", "appendTo", "positionStyle", "tooltipStyleClass", "tooltipZIndex", "escape", "showDelay", "hideDelay", "life", "positionTop", "positionLeft", "pTooltip", "tooltipDisabled", "tooltipOptions"] }, { type: i3.Ripple, selector: "[pRipple]" }, { type: i4.RouterLinkWithHref, selector: "a[routerLink],area[routerLink]", inputs: ["routerLink", "target", "queryParams", "fragment", "queryParamsHandling", "preserveFragment", "skipLocationChange", "replaceUrl", "state", "relativeTo"] }, { type: i4.RouterLinkActive, selector: "[routerLinkActive]", inputs: ["routerLinkActiveOptions", "routerLinkActive"], exportAs: ["routerLinkActive"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0, type: MegaMenu, decorators: [{
            type: Component,
            args: [{
                    selector: 'p-megaMenu',
                    template: `
        <div [class]="styleClass" [ngStyle]="style"
            [ngClass]="{'p-megamenu p-component':true,'p-megamenu-horizontal': orientation == 'horizontal','p-megamenu-vertical': orientation == 'vertical'}">
            <div class="p-megamenu-start" *ngIf="startTemplate">
                <ng-container *ngTemplateOutlet="startTemplate"></ng-container>
            </div>
            <ul class="p-megamenu-root-list" role="menubar">
                <ng-template ngFor let-category [ngForOf]="model">
                    <li *ngIf="category.separator" class="p-menu-separator" [ngClass]="{'p-hidden': category.visible === false}">
                    <li *ngIf="!category.separator" [ngClass]="{'p-menuitem':true,'p-menuitem-active':category==activeItem, 'p-hidden': category.visible === false}" pTooltip [tooltipOptions]="category.tooltipOptions"
                        (mouseenter)="onCategoryMouseEnter($event, category)">
                        <a *ngIf="!category.routerLink" [href]="category.url||'#'" [attr.target]="category.target" [attr.title]="category.title" [attr.id]="category.id" (click)="onCategoryClick($event, category)" [attr.tabindex]="category.tabindex ? category.tabindex : '0'"
                            [ngClass]="{'p-menuitem-link':true,'p-disabled':category.disabled}" [ngStyle]="category.style" [class]="category.styleClass" pRipple>
                            <span class="p-menuitem-icon" *ngIf="category.icon" [ngClass]="category.icon"></span>
                            <span class="p-menuitem-text" *ngIf="category.escape !== false; else categoryHtmlLabel">{{category.label}}</span>
                            <ng-template #categoryHtmlLabel><span class="p-menuitem-text" [innerHTML]="category.label"></span></ng-template>
                            <span *ngIf="category.items" class="p-submenu-icon pi" [ngClass]="{'pi-angle-down':orientation=='horizontal','pi-angle-right':orientation=='vertical'}"></span>
                        </a>
                        <a *ngIf="category.routerLink" [routerLink]="category.routerLink" [queryParams]="category.queryParams" [routerLinkActive]="'p-menuitem-link-active'" [routerLinkActiveOptions]="category.routerLinkActiveOptions||{exact:false}" [attr.tabindex]="category.tabindex ? category.tabindex : '0'"
                            [attr.target]="category.target" [attr.title]="category.title" [attr.id]="category.id"
                            (click)="onCategoryClick($event, category)" [ngClass]="{'p-menuitem-link':true,'p-disabled':category.disabled}" [ngStyle]="category.style" [class]="category.styleClass"
                            [fragment]="category.fragment" [queryParamsHandling]="category.queryParamsHandling" [preserveFragment]="category.preserveFragment" [skipLocationChange]="category.skipLocationChange" [replaceUrl]="category.replaceUrl" [state]="category.state" pRipple>
                            <span class="p-menuitem-icon" *ngIf="category.icon" [ngClass]="category.icon"></span>
                            <span class="p-menuitem-text" *ngIf="category.escape !== false; else categoryHtmlRouteLabel">{{category.label}}</span>
                            <ng-template #categoryHtmlRouteLabel><span class="p-menuitem-text" [innerHTML]="category.label"></span></ng-template>
                        </a>
                        <div class="p-megamenu-panel" *ngIf="category.items">
                            <div class="p-megamenu-grid">
                                <ng-template ngFor let-column [ngForOf]="category.items">
                                    <div [class]="getColumnClass(category)">
                                        <ng-template ngFor let-submenu [ngForOf]="column">
                                            <ul class="p-megamenu-submenu" role="menu">
                                                <li class="p-megamenu-submenu-header">
                                                    <span *ngIf="submenu.escape !== false; else submenuHtmlLabel">{{submenu.label}}</span>
                                                    <ng-template #submenuHtmlLabel><span [innerHTML]="submenu.label"></span></ng-template>
                                                </li>
                                                <ng-template ngFor let-item [ngForOf]="submenu.items">
                                                    <li *ngIf="item.separator" class="p-menu-separator" [ngClass]="{'p-hidden': item.visible === false}" role="separator">
                                                    <li *ngIf="!item.separator" class="p-menuitem" [ngClass]="{'p-hidden': item.visible === false}" role="none" pTooltip [tooltipOptions]="item.tooltipOptions">
                                                        <a *ngIf="!item.routerLink" role="menuitem" [href]="item.url||'#'" class="p-menuitem-link" [attr.target]="item.target" [attr.title]="item.title" [attr.id]="item.id" [attr.tabindex]="item.tabindex ? item.tabindex : '0'"
                                                            [ngClass]="{'p-disabled':item.disabled}" (click)="itemClick($event, item)" pRipple>
                                                            <span class="p-menuitem-icon" *ngIf="item.icon" [ngClass]="item.icon"></span>
                                                            <span class="p-menuitem-text" *ngIf="item.escape !== false; else htmlLabel">{{item.label}}</span>
                                                            <ng-template #htmlLabel><span class="p-menuitem-text" [innerHTML]="item.label"></span></ng-template>
                                                        </a>
                                                        <a *ngIf="item.routerLink" role="menuitem" [routerLink]="item.routerLink" [queryParams]="item.queryParams" [routerLinkActive]="'p-menuitem-link-active'" [attr.tabindex]="item.tabindex ? item.tabindex : '0'"
                                                            [routerLinkActiveOptions]="item.routerLinkActiveOptions||{exact:false}" class="p-menuitem-link"
                                                             [attr.target]="item.target" [attr.title]="item.title" [attr.id]="item.id"
                                                            [ngClass]="{'p-disabled':item.disabled}" (click)="itemClick($event, item)"
                                                            [fragment]="item.fragment" [queryParamsHandling]="item.queryParamsHandling" [preserveFragment]="item.preserveFragment" [skipLocationChange]="item.skipLocationChange" [replaceUrl]="item.replaceUrl" [state]="item.state" pRipple>
                                                            <span class="p-menuitem-icon" *ngIf="item.icon" [ngClass]="item.icon"></span>
                                                            <span class="p-menuitem-text" *ngIf="item.escape !== false; else htmlRouteLabel">{{item.label}}</span>
                                                            <ng-template #htmlRouteLabel><span class="p-menuitem-text" [innerHTML]="item.label"></span></ng-template>
                                                        </a>
                                                    </li>
                                                </ng-template>
                                            </ul>
                                        </ng-template>
                                    </div>
                                </ng-template>
                            </div>
                        </div>
                    </li>
                </ng-template>
                <div class="p-megamenu-end" *ngIf="endTemplate; else legacy">
                    <ng-container *ngTemplateOutlet="endTemplate"></ng-container>
                </div>
                <ng-template #legacy>
                    <div class="p-megamenu-end">
                        <ng-content></ng-content>
                    </div>
                </ng-template>
            </ul>
        </div>
    `,
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    encapsulation: ViewEncapsulation.None,
                    styleUrls: ['./megamenu.css']
                }]
        }], ctorParameters: function () { return [{ type: i0.ElementRef }, { type: i0.Renderer2 }, { type: i0.ChangeDetectorRef }]; }, propDecorators: { model: [{
                type: Input
            }], style: [{
                type: Input
            }], styleClass: [{
                type: Input
            }], orientation: [{
                type: Input
            }], autoZIndex: [{
                type: Input
            }], baseZIndex: [{
                type: Input
            }], templates: [{
                type: ContentChildren,
                args: [PrimeTemplate]
            }] } });
export class MegaMenuModule {
}
MegaMenuModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0, type: MegaMenuModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
MegaMenuModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0, type: MegaMenuModule, declarations: [MegaMenu], imports: [CommonModule, RouterModule, RippleModule, TooltipModule], exports: [MegaMenu, RouterModule, TooltipModule] });
MegaMenuModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0, type: MegaMenuModule, imports: [[CommonModule, RouterModule, RippleModule, TooltipModule], RouterModule, TooltipModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0, type: MegaMenuModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule, RouterModule, RippleModule, TooltipModule],
                    exports: [MegaMenu, RouterModule, TooltipModule],
                    declarations: [MegaMenu]
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWVnYW1lbnUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvYXBwL2NvbXBvbmVudHMvbWVnYW1lbnUvbWVnYW1lbnUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFDLFFBQVEsRUFBQyxTQUFTLEVBQVksS0FBSyxFQUFXLHVCQUF1QixFQUFFLGlCQUFpQixFQUF1QyxlQUFlLEVBQXlCLE1BQU0sZUFBZSxDQUFDO0FBQ3JNLE9BQU8sRUFBQyxZQUFZLEVBQUMsTUFBTSxpQkFBaUIsQ0FBQztBQUM3QyxPQUFPLEVBQXdCLGFBQWEsRUFBQyxNQUFNLGFBQWEsQ0FBQztBQUNqRSxPQUFPLEVBQUMsWUFBWSxFQUFDLE1BQU0saUJBQWlCLENBQUM7QUFDN0MsT0FBTyxFQUFDLFlBQVksRUFBQyxNQUFNLGdCQUFnQixDQUFDO0FBQzVDLE9BQU8sRUFBQyxhQUFhLEVBQUMsTUFBTSxpQkFBaUIsQ0FBQzs7Ozs7O0FBbUY5QyxNQUFNLE9BQU8sUUFBUTtJQXdCakIsWUFBbUIsRUFBYyxFQUFTLFFBQW1CLEVBQVMsRUFBcUI7UUFBeEUsT0FBRSxHQUFGLEVBQUUsQ0FBWTtRQUFTLGFBQVEsR0FBUixRQUFRLENBQVc7UUFBUyxPQUFFLEdBQUYsRUFBRSxDQUFtQjtRQWhCbEYsZ0JBQVcsR0FBVyxZQUFZLENBQUM7UUFFbkMsZUFBVSxHQUFZLElBQUksQ0FBQztRQUUzQixlQUFVLEdBQVcsQ0FBQyxDQUFDO0lBWThELENBQUM7SUFFL0Ysa0JBQWtCO1FBQ2QsSUFBSSxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxJQUFJLEVBQUUsRUFBRTtZQUM1QixRQUFPLElBQUksQ0FBQyxPQUFPLEVBQUUsRUFBRTtnQkFDbkIsS0FBSyxPQUFPO29CQUNSLElBQUksQ0FBQyxhQUFhLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQztvQkFDdkMsTUFBTTtnQkFFTixLQUFLLEtBQUs7b0JBQ04sSUFBSSxDQUFDLFdBQVcsR0FB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Z0JBRUcsVUFBVTtzQkFBbEIsS0FBSztnQkFFMEIsU0FBUztzQkFBeEMsZUFBZTt1QkFBQyxhQUFhOztBQTZJbEMsTUFBTSxPQUFPLGNBQWM7OzJHQUFkLGNBQWM7NEdBQWQsY0FBYyxpQkEzSmQsUUFBUSxhQXVKUCxZQUFZLEVBQUMsWUFBWSxFQUFDLFlBQVksRUFBQyxhQUFhLGFBdkpyRCxRQUFRLEVBd0pFLFlBQVksRUFBQyxhQUFhOzRHQUdwQyxjQUFjLFlBSmQsQ0FBQyxZQUFZLEVBQUMsWUFBWSxFQUFDLFlBQVksRUFBQyxhQUFhLENBQUMsRUFDNUMsWUFBWSxFQUFDLGFBQWE7MkZBR3BDLGNBQWM7a0JBTDFCLFFBQVE7bUJBQUM7b0JBQ04sT0FBTyxFQUFFLENBQUMsWUFBWSxFQUFDLFlBQVksRUFBQyxZQUFZLEVBQUMsYUFBYSxDQUFDO29CQUMvRCxPQUFPLEVBQUUsQ0FBQyxRQUFRLEVBQUMsWUFBWSxFQUFDLGFBQWEsQ0FBQztvQkFDOUMsWUFBWSxFQUFFLENBQUMsUUFBUSxDQUFDO2lCQUMzQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7TmdNb2R1bGUsQ29tcG9uZW50LEVsZW1lbnRSZWYsSW5wdXQsUmVuZGVyZXIyLENoYW5nZURldGVjdGlvblN0cmF0ZWd5LCBWaWV3RW5jYXBzdWxhdGlvbiwgQ2hhbmdlRGV0ZWN0b3JSZWYsIEFmdGVyQ29udGVudEluaXQsIENvbnRlbnRDaGlsZHJlbiwgUXVlcnlMaXN0LCBUZW1wbGF0ZVJlZn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge0NvbW1vbk1vZHVsZX0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7TWVnYU1lbnVJdGVtLE1lbnVJdGVtLCBQcmltZVRlbXBsYXRlfSBmcm9tICdwcmltZW5nL2FwaSc7XG5pbXBvcnQge1JvdXRlck1vZHVsZX0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcbmltcG9ydCB7UmlwcGxlTW9kdWxlfSBmcm9tICdwcmltZW5nL3JpcHBsZSc7XG5pbXBvcnQge1Rvb2x0aXBNb2R1bGV9IGZyb20gJ3ByaW1lbmcvdG9vbHRpcCc7XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAncC1tZWdhTWVudScsXG4gICAgdGVtcGxhdGU6IGBcbiAgICAgICAgPGRpdiBbY2xhc3NdPVwic3R5bGVDbGFzc1wiIFtuZ1N0eWxlXT1cInN0eWxlXCJcbiAgICAgICAgICAgIFtuZ0NsYXNzXT1cInsncC1tZWdhbWVudSBwLWNvbXBvbmVudCc6dHJ1ZSwncC1tZWdhbWVudS1ob3Jpem9udGFsJzogb3JpZW50YXRpb24gPT0gJ2hvcml6b250YWwnLCdwLW1lZ2FtZW51LXZlcnRpY2FsJzogb3JpZW50YXRpb24gPT0gJ3ZlcnRpY2FsJ31cIj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJwLW1lZ2FtZW51LXN0YXJ0XCIgKm5nSWY9XCJzdGFydFRlbXBsYXRlXCI+XG4gICAgICAgICAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdUZW1wbGF0ZU91dGxldD1cInN0YXJ0VGVtcGxhdGVcIj48L25nLWNvbnRhaW5lcj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPHVsIGNsYXNzPVwicC1tZWdhbWVudS1yb290LWxpc3RcIiByb2xlPVwibWVudWJhclwiPlxuICAgICAgICAgICAgICAgIDxuZy10ZW1wbGF0ZSBuZ0ZvciBsZXQtY2F0ZWdvcnkgW25nRm9yT2ZdPVwibW9kZWxcIj5cbiAgICAgICAgICAgICAgICAgICAgPGxpICpuZ0lmPVwiY2F0ZWdvcnkuc2VwYXJhdG9yXCIgY2xhc3M9XCJwLW1lbnUtc2VwYXJhdG9yXCIgW25nQ2xhc3NdPVwieydwLWhpZGRlbic6IGNhdGVnb3J5LnZpc2libGUgPT09IGZhbHNlfVwiPlxuICAgICAgICAgICAgICAgICAgICA8bGkgKm5nSWY9XCIhY2F0ZWdvcnkuc2VwYXJhdG9yXCIgW25nQ2xhc3NdPVwieydwLW1lbnVpdGVtJzp0cnVlLCdwLW1lbnVpdGVtLWFjdGl2ZSc6Y2F0ZWdvcnk9PWFjdGl2ZUl0ZW0sICdwLWhpZGRlbic6IGNhdGVnb3J5LnZpc2libGUgPT09IGZhbHNlfVwiIHBUb29sdGlwIFt0b29sdGlwT3B0aW9uc109XCJjYXRlZ29yeS50b29sdGlwT3B0aW9uc1wiXG4gICAgICAgICAgICAgICAgICAgICAgICAobW91c2VlbnRlcik9XCJvbkNhdGVnb3J5TW91c2VFbnRlcigkZXZlbnQsIGNhdGVnb3J5KVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGEgKm5nSWY9XCIhY2F0ZWdvcnkucm91dGVyTGlua1wiIFtocmVmXT1cImNhdGVnb3J5LnVybHx8JyMnXCIgW2F0dHIudGFyZ2V0XT1cImNhdGVnb3J5LnRhcmdldFwiIFthdHRyLnRpdGxlXT1cImNhdGVnb3J5LnRpdGxlXCIgW2F0dHIuaWRdPVwiY2F0ZWdvcnkuaWRcIiAoY2xpY2spPVwib25DYXRlZ29yeUNsaWNrKCRldmVudCwgY2F0ZWdvcnkpXCIgW2F0dHIudGFiaW5kZXhdPVwiY2F0ZWdvcnkudGFiaW5kZXggPyBjYXRlZ29yeS50YWJpbmRleCA6ICcwJ1wiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgW25nQ2xhc3NdPVwieydwLW1lbnVpdGVtLWxpbmsnOnRydWUsJ3AtZGlzYWJsZWQnOmNhdGVnb3J5LmRpc2FibGVkfVwiIFtuZ1N0eWxlXT1cImNhdGVnb3J5LnN0eWxlXCIgW2NsYXNzXT1cImNhdGVnb3J5LnN0eWxlQ2xhc3NcIiBwUmlwcGxlPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwicC1tZW51aXRlbS1pY29uXCIgKm5nSWY9XCJjYXRlZ29yeS5pY29uXCIgW25nQ2xhc3NdPVwiY2F0ZWdvcnkuaWNvblwiPjwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cInAtbWVudWl0ZW0tdGV4dFwiICpuZ0lmPVwiY2F0ZWdvcnkuZXNjYXBlICE9PSBmYWxzZTsgZWxzZSBjYXRlZ29yeUh0bWxMYWJlbFwiPnt7Y2F0ZWdvcnkubGFiZWx9fTwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8bmctdGVtcGxhdGUgI2NhdGVnb3J5SHRtbExhYmVsPjxzcGFuIGNsYXNzPVwicC1tZW51aXRlbS10ZXh0XCIgW2lubmVySFRNTF09XCJjYXRlZ29yeS5sYWJlbFwiPjwvc3Bhbj48L25nLXRlbXBsYXRlPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuICpuZ0lmPVwiY2F0ZWdvcnkuaXRlbXNcIiBjbGFzcz1cInAtc3VibWVudS1pY29uIHBpXCIgW25nQ2xhc3NdPVwieydwaS1hbmdsZS1kb3duJzpvcmllbnRhdGlvbj09J2hvcml6b250YWwnLCdwaS1hbmdsZS1yaWdodCc6b3JpZW50YXRpb249PSd2ZXJ0aWNhbCd9XCI+PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9hPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGEgKm5nSWY9XCJjYXRlZ29yeS5yb3V0ZXJMaW5rXCIgW3JvdXRlckxpbmtdPVwiY2F0ZWdvcnkucm91dGVyTGlua1wiIFtxdWVyeVBhcmFtc109XCJjYXRlZ29yeS5xdWVyeVBhcmFtc1wiIFtyb3V0ZXJMaW5rQWN0aXZlXT1cIidwLW1lbnVpdGVtLWxpbmstYWN0aXZlJ1wiIFtyb3V0ZXJMaW5rQWN0aXZlT3B0aW9uc109XCJjYXRlZ29yeS5yb3V0ZXJMaW5rQWN0aXZlT3B0aW9uc3x8e2V4YWN0OmZhbHNlfVwiIFthdHRyLnRhYmluZGV4XT1cImNhdGVnb3J5LnRhYmluZGV4ID8gY2F0ZWdvcnkudGFiaW5kZXggOiAnMCdcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFthdHRyLnRhcmdldF09XCJjYXRlZ29yeS50YXJnZXRcIiBbYXR0ci50aXRsZV09XCJjYXRlZ29yeS50aXRsZVwiIFthdHRyLmlkXT1cImNhdGVnb3J5LmlkXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAoY2xpY2spPVwib25DYXRlZ29yeUNsaWNrKCRldmVudCwgY2F0ZWdvcnkpXCIgW25nQ2xhc3NdPVwieydwLW1lbnVpdGVtLWxpbmsnOnRydWUsJ3AtZGlzYWJsZWQnOmNhdGVnb3J5LmRpc2FibGVkfVwiIFtuZ1N0eWxlXT1cImNhdGVnb3J5LnN0eWxlXCIgW2NsYXNzXT1cImNhdGVnb3J5LnN0eWxlQ2xhc3NcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtmcmFnbWVudF09XCJjYXRlZ29yeS5mcmFnbWVudFwiIFtxdWVyeVBhcmFtc0hhbmRsaW5nXT1cImNhdGVnb3J5LnF1ZXJ5UGFyYW1zSGFuZGxpbmdcIiBbcHJlc2VydmVGcmFnbWVudF09XCJjYXRlZ29yeS5wcmVzZXJ2ZUZyYWdtZW50XCIgW3NraXBMb2NhdGlvbkNoYW5nZV09XCJjYXRlZ29yeS5za2lwTG9jYXRpb25DaGFuZ2VcIiBbcmVwbGFjZVVybF09XCJjYXRlZ29yeS5yZXBsYWNlVXJsXCIgW3N0YXRlXT1cImNhdGVnb3J5LnN0YXRlXCIgcFJpcHBsZT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cInAtbWVudWl0ZW0taWNvblwiICpuZ0lmPVwiY2F0ZWdvcnkuaWNvblwiIFtuZ0NsYXNzXT1cImNhdGVnb3J5Lmljb25cIj48L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJwLW1lbnVpdGVtLXRleHRcIiAqbmdJZj1cImNhdGVnb3J5LmVzY2FwZSAhPT0gZmFsc2U7IGVsc2UgY2F0ZWdvcnlIdG1sUm91dGVMYWJlbFwiPnt7Y2F0ZWdvcnkubGFiZWx9fTwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8bmctdGVtcGxhdGUgI2NhdGVnb3J5SHRtbFJvdXRlTGFiZWw+PHNwYW4gY2xhc3M9XCJwLW1lbnVpdGVtLXRleHRcIiBbaW5uZXJIVE1MXT1cImNhdGVnb3J5LmxhYmVsXCI+PC9zcGFuPjwvbmctdGVtcGxhdGU+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L2E+XG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwicC1tZWdhbWVudS1wYW5lbFwiICpuZ0lmPVwiY2F0ZWdvcnkuaXRlbXNcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwicC1tZWdhbWVudS1ncmlkXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxuZy10ZW1wbGF0ZSBuZ0ZvciBsZXQtY29sdW1uIFtuZ0Zvck9mXT1cImNhdGVnb3J5Lml0ZW1zXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IFtjbGFzc109XCJnZXRDb2x1bW5DbGFzcyhjYXRlZ29yeSlcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8bmctdGVtcGxhdGUgbmdGb3IgbGV0LXN1Ym1lbnUgW25nRm9yT2ZdPVwiY29sdW1uXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx1bCBjbGFzcz1cInAtbWVnYW1lbnUtc3VibWVudVwiIHJvbGU9XCJtZW51XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8bGkgY2xhc3M9XCJwLW1lZ2FtZW51LXN1Ym1lbnUtaGVhZGVyXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gKm5nSWY9XCJzdWJtZW51LmVzY2FwZSAhPT0gZmFsc2U7IGVsc2Ugc3VibWVudUh0bWxMYWJlbFwiPnt7c3VibWVudS5sYWJlbH19PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxuZy10ZW1wbGF0ZSAjc3VibWVudUh0bWxMYWJlbD48c3BhbiBbaW5uZXJIVE1MXT1cInN1Ym1lbnUubGFiZWxcIj48L3NwYW4+PC9uZy10ZW1wbGF0ZT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvbGk+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8bmctdGVtcGxhdGUgbmdGb3IgbGV0LWl0ZW0gW25nRm9yT2ZdPVwic3VibWVudS5pdGVtc1wiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxsaSAqbmdJZj1cIml0ZW0uc2VwYXJhdG9yXCIgY2xhc3M9XCJwLW1lbnUtc2VwYXJhdG9yXCIgW25nQ2xhc3NdPVwieydwLWhpZGRlbic6IGl0ZW0udmlzaWJsZSA9PT0gZmFsc2V9XCIgcm9sZT1cInNlcGFyYXRvclwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxsaSAqbmdJZj1cIiFpdGVtLnNlcGFyYXRvclwiIGNsYXNzPVwicC1tZW51aXRlbVwiIFtuZ0NsYXNzXT1cInsncC1oaWRkZW4nOiBpdGVtLnZpc2libGUgPT09IGZhbHNlfVwiIHJvbGU9XCJub25lXCIgcFRvb2x0aXAgW3Rvb2x0aXBPcHRpb25zXT1cIml0ZW0udG9vbHRpcE9wdGlvbnNcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGEgKm5nSWY9XCIhaXRlbS5yb3V0ZXJMaW5rXCIgcm9sZT1cIm1lbnVpdGVtXCIgW2hyZWZdPVwiaXRlbS51cmx8fCcjJ1wiIGNsYXNzPVwicC1tZW51aXRlbS1saW5rXCIgW2F0dHIudGFyZ2V0XT1cIml0ZW0udGFyZ2V0XCIgW2F0dHIudGl0bGVdPVwiaXRlbS50aXRsZVwiIFthdHRyLmlkXT1cIml0ZW0uaWRcIiBbYXR0ci50YWJpbmRleF09XCJpdGVtLnRhYmluZGV4ID8gaXRlbS50YWJpbmRleCA6ICcwJ1wiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBbbmdDbGFzc109XCJ7J3AtZGlzYWJsZWQnOml0ZW0uZGlzYWJsZWR9XCIgKGNsaWNrKT1cIml0ZW1DbGljaygkZXZlbnQsIGl0ZW0pXCIgcFJpcHBsZT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwicC1tZW51aXRlbS1pY29uXCIgKm5nSWY9XCJpdGVtLmljb25cIiBbbmdDbGFzc109XCJpdGVtLmljb25cIj48L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cInAtbWVudWl0ZW0tdGV4dFwiICpuZ0lmPVwiaXRlbS5lc2NhcGUgIT09IGZhbHNlOyBlbHNlIGh0bWxMYWJlbFwiPnt7aXRlbS5sYWJlbH19PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPG5nLXRlbXBsYXRlICNodG1sTGFiZWw+PHNwYW4gY2xhc3M9XCJwLW1lbnVpdGVtLXRleHRcIiBbaW5uZXJIVE1MXT1cIml0ZW0ubGFiZWxcIj48L3NwYW4+PC9uZy10ZW1wbGF0ZT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9hPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8YSAqbmdJZj1cIml0ZW0ucm91dGVyTGlua1wiIHJvbGU9XCJtZW51aXRlbVwiIFtyb3V0ZXJMaW5rXT1cIml0ZW0ucm91dGVyTGlua1wiIFtxdWVyeVBhcmFtc109XCJpdGVtLnF1ZXJ5UGFyYW1zXCIgW3JvdXRlckxpbmtBY3RpdmVdPVwiJ3AtbWVudWl0ZW0tbGluay1hY3RpdmUnXCIgW2F0dHIudGFiaW5kZXhdPVwiaXRlbS50YWJpbmRleCA/IGl0ZW0udGFiaW5kZXggOiAnMCdcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgW3JvdXRlckxpbmtBY3RpdmVPcHRpb25zXT1cIml0ZW0ucm91dGVyTGlua0FjdGl2ZU9wdGlvbnN8fHtleGFjdDpmYWxzZX1cIiBjbGFzcz1cInAtbWVudWl0ZW0tbGlua1wiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgW2F0dHIudGFyZ2V0XT1cIml0ZW0udGFyZ2V0XCIgW2F0dHIudGl0bGVdPVwiaXRlbS50aXRsZVwiIFthdHRyLmlkXT1cIml0ZW0uaWRcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgW25nQ2xhc3NdPVwieydwLWRpc2FibGVkJzppdGVtLmRpc2FibGVkfVwiIChjbGljayk9XCJpdGVtQ2xpY2soJGV2ZW50LCBpdGVtKVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBbZnJhZ21lbnRdPVwiaXRlbS5mcmFnbWVudFwiIFtxdWVyeVBhcmFtc0hhbmRsaW5nXT1cIml0ZW0ucXVlcnlQYXJhbXNIYW5kbGluZ1wiIFtwcmVzZXJ2ZUZyYWdtZW50XT1cIml0ZW0ucHJlc2VydmVGcmFnbWVudFwiIFtza2lwTG9jYXRpb25DaGFuZ2VdPVwiaXRlbS5za2lwTG9jYXRpb25DaGFuZ2VcIiBbcmVwbGFjZVVybF09XCJpdGVtLnJlcGxhY2VVcmxcIiBbc3RhdGVdPVwiaXRlbS5zdGF0ZVwiIHBSaXBwbGU+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cInAtbWVudWl0ZW0taWNvblwiICpuZ0lmPVwiaXRlbS5pY29uXCIgW25nQ2xhc3NdPVwiaXRlbS5pY29uXCI+PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJwLW1lbnVpdGVtLXRleHRcIiAqbmdJZj1cIml0ZW0uZXNjYXBlICE9PSBmYWxzZTsgZWxzZSBodG1sUm91dGVMYWJlbFwiPnt7aXRlbS5sYWJlbH19PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPG5nLXRlbXBsYXRlICNodG1sUm91dGVMYWJlbD48c3BhbiBjbGFzcz1cInAtbWVudWl0ZW0tdGV4dFwiIFtpbm5lckhUTUxdPVwiaXRlbS5sYWJlbFwiPjwvc3Bhbj48L25nLXRlbXBsYXRlPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2E+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9saT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvbmctdGVtcGxhdGU+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvdWw+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9uZy10ZW1wbGF0ZT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L25nLXRlbXBsYXRlPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIDwvbGk+XG4gICAgICAgICAgICAgICAgPC9uZy10ZW1wbGF0ZT5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwicC1tZWdhbWVudS1lbmRcIiAqbmdJZj1cImVuZFRlbXBsYXRlOyBlbHNlIGxlZ2FjeVwiPlxuICAgICAgICAgICAgICAgICAgICA8bmctY29udGFpbmVyICpuZ1RlbXBsYXRlT3V0bGV0PVwiZW5kVGVtcGxhdGVcIj48L25nLWNvbnRhaW5lcj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8bmctdGVtcGxhdGUgI2xlZ2FjeT5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInAtbWVnYW1lbnUtZW5kXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8bmctY29udGVudD48L25nLWNvbnRlbnQ+XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDwvbmctdGVtcGxhdGU+XG4gICAgICAgICAgICA8L3VsPlxuICAgICAgICA8L2Rpdj5cbiAgICBgLFxuICAgIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxuICAgIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmUsXG4gICAgc3R5bGVVcmxzOiBbJy4vbWVnYW1lbnUuY3NzJ11cbn0pXG5leHBvcnQgY2xhc3MgTWVnYU1lbnUgaW1wbGVtZW50cyBBZnRlckNvbnRlbnRJbml0IHtcblxuICAgIEBJbnB1dCgpIG1vZGVsOiBNZWdhTWVudUl0ZW1bXTtcblxuICAgIEBJbnB1dCgpIHN0eWxlOiBhbnk7XG5cbiAgICBASW5wdXQoKSBzdHlsZUNsYXNzOiBzdHJpbmc7XG5cbiAgICBASW5wdXQoKSBvcmllbnRhdGlvbjogc3RyaW5nID0gJ2hvcml6b250YWwnO1xuXG4gICAgQElucHV0KCkgYXV0b1pJbmRleDogYm9vbGVhbiA9IHRydWU7XG5cbiAgICBASW5wdXQoKSBiYXNlWkluZGV4OiBudW1iZXIgPSAwO1xuXG4gICAgQENvbnRlbnRDaGlsZHJlbihQcmltZVRlbXBsYXRlKSB0ZW1wbGF0ZXM6IFF1ZXJ5TGlzdDxhbnk+O1xuXG4gICAgYWN0aXZlSXRlbTogYW55O1xuXG4gICAgZG9jdW1lbnRDbGlja0xpc3RlbmVyOiBhbnk7XG5cbiAgICBzdGFydFRlbXBsYXRlOiBUZW1wbGF0ZVJlZjxhbnk+O1xuXG4gICAgZW5kVGVtcGxhdGU6IFRlbXBsYXRlUmVmPGFueT47XG5cbiAgICBjb25zdHJ1Y3RvcihwdWJsaWMgZWw6IEVsZW1lbnRSZWYsIHB1YmxpYyByZW5kZXJlcjogUmVuZGVyZXIyLCBwdWJsaWMgY2Q6IENoYW5nZURldGVjdG9yUmVmKSB7fVxuXG4gICAgbmdBZnRlckNvbnRlbnRJbml0KCkge1xuICAgICAgICB0aGlzLnRlbXBsYXRlcy5mb3JFYWNoKChpdGVtKSA9PiB7XG4gICAgICAgICAgICBzd2l0Y2goaXRlbS5nZXRUeXBlKCkpIHtcbiAgICAgICAgICAgICAgICBjYXNlICdzdGFydCc6XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc3RhcnRUZW1wbGF0ZSA9IGl0ZW0udGVtcGxhdGU7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgICAgICBjYXNlICdlbmQnOlxuICAgICAgICAgICAgICAgICAgICB0aGlzLmVuZFRlbXBsYXRlID0gaXRlbS50ZW1wbGF0ZTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgb25DYXRlZ29yeU1vdXNlRW50ZXIoZXZlbnQsIG1lbnVpdGVtOiBNZWdhTWVudUl0ZW0pIHtcbiAgICAgICAgaWYgKG1lbnVpdGVtLmRpc2FibGVkKSB7XG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMuYWN0aXZlSXRlbSkge1xuICAgICAgICAgICAgdGhpcy5hY3RpdmVJdGVtID0gbWVudWl0ZW07XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBvbkNhdGVnb3J5Q2xpY2soZXZlbnQsIGl0ZW06IE1lbnVJdGVtIHwgTWVnYU1lbnVJdGVtKSB7XG4gICAgICAgIGlmIChpdGVtLmRpc2FibGVkKSB7XG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKCFpdGVtLnVybCkge1xuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChpdGVtLmNvbW1hbmQpIHtcbiAgICAgICAgICAgIGl0ZW0uY29tbWFuZCh7XG4gICAgICAgICAgICAgICAgb3JpZ2luYWxFdmVudDogZXZlbnQsXG4gICAgICAgICAgICAgICAgaXRlbTogaXRlbVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoaXRlbS5pdGVtcykge1xuICAgICAgICAgICAgaWYgKHRoaXMuYWN0aXZlSXRlbSAmJiB0aGlzLmFjdGl2ZUl0ZW0gPT09IGl0ZW0pIHtcbiAgICAgICAgICAgICAgICB0aGlzLmFjdGl2ZUl0ZW0gPSBudWxsO1xuICAgICAgICAgICAgICAgIHRoaXMudW5iaW5kRG9jdW1lbnRDbGlja0xpc3RlbmVyKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLmFjdGl2ZUl0ZW0gPSBpdGVtO1xuICAgICAgICAgICAgICAgIHRoaXMuYmluZERvY3VtZW50Q2xpY2tMaXN0ZW5lcigpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgaXRlbUNsaWNrKGV2ZW50LCBpdGVtOiBNZW51SXRlbSB8IE1lZ2FNZW51SXRlbSnCoHtcbiAgICAgICAgaWYgKGl0ZW0uZGlzYWJsZWQpIHtcbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoIWl0ZW0udXJsKSB7XG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGl0ZW0uY29tbWFuZCkge1xuICAgICAgICAgICAgaXRlbS5jb21tYW5kKHtcbiAgICAgICAgICAgICAgICBvcmlnaW5hbEV2ZW50OiBldmVudCxcbiAgICAgICAgICAgICAgICBpdGVtOiBpdGVtXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuYWN0aXZlSXRlbSA9IG51bGw7XG4gICAgfVxuXG4gICAgZ2V0Q29sdW1uQ2xhc3MobWVudWl0ZW06IE1lZ2FNZW51SXRlbSkge1xuICAgICAgICBsZXQgbGVuZ3RoID0gbWVudWl0ZW0uaXRlbXMgPyBtZW51aXRlbS5pdGVtcy5sZW5ndGg6IDA7XG4gICAgICAgIGxldCBjb2x1bW5DbGFzcztcbiAgICAgICAgc3dpdGNoKGxlbmd0aCkge1xuICAgICAgICAgICAgY2FzZSAyOlxuICAgICAgICAgICAgICAgIGNvbHVtbkNsYXNzPSAncC1tZWdhbWVudS1jb2wtNic7XG4gICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgY2FzZSAzOlxuICAgICAgICAgICAgICAgIGNvbHVtbkNsYXNzPSAncC1tZWdhbWVudS1jb2wtNCc7XG4gICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgY2FzZSA0OlxuICAgICAgICAgICAgICAgIGNvbHVtbkNsYXNzPSAncC1tZWdhbWVudS1jb2wtMyc7XG4gICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgY2FzZSA2OlxuICAgICAgICAgICAgICAgIGNvbHVtbkNsYXNzPSAncC1tZWdhbWVudS1jb2wtMic7XG4gICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICBjb2x1bW5DbGFzcz0gJ3AtbWVnYW1lbnUtY29sLTEyJztcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGNvbHVtbkNsYXNzO1xuICAgIH1cblxuICAgIGJpbmREb2N1bWVudENsaWNrTGlzdGVuZXIoKSB7XG4gICAgICAgIGlmICghdGhpcy5kb2N1bWVudENsaWNrTGlzdGVuZXIpIHtcbiAgICAgICAgICAgIHRoaXMuZG9jdW1lbnRDbGlja0xpc3RlbmVyID0gKGV2ZW50KSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuZWwgJiYgIXRoaXMuZWwubmF0aXZlRWxlbWVudC5jb250YWlucyhldmVudC50YXJnZXQpKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYWN0aXZlSXRlbSA9IG51bGw7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMudW5iaW5kRG9jdW1lbnRDbGlja0xpc3RlbmVyKCk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY2QubWFya0ZvckNoZWNrKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0aGlzLmRvY3VtZW50Q2xpY2tMaXN0ZW5lcik7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICB1bmJpbmREb2N1bWVudENsaWNrTGlzdGVuZXIoKSB7XG4gICAgICAgIGlmICh0aGlzLmRvY3VtZW50Q2xpY2tMaXN0ZW5lcikge1xuICAgICAgICAgICAgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0aGlzLmRvY3VtZW50Q2xpY2tMaXN0ZW5lcik7XG4gICAgICAgICAgICB0aGlzLmRvY3VtZW50Q2xpY2tMaXN0ZW5lciA9IG51bGw7XG4gICAgICAgIH1cbiAgICB9XG59XG5cbkBOZ01vZHVsZSh7XG4gICAgaW1wb3J0czogW0NvbW1vbk1vZHVsZSxSb3V0ZXJNb2R1bGUsUmlwcGxlTW9kdWxlLFRvb2x0aXBNb2R1bGVdLFxuICAgIGV4cG9ydHM6IFtNZWdhTWVudSxSb3V0ZXJNb2R1bGUsVG9vbHRpcE1vZHVsZV0sXG4gICAgZGVjbGFyYXRpb25zOiBbTWVnYU1lbnVdXG59KVxuZXhwb3J0IGNsYXNzIE1lZ2FNZW51TW9kdWxlIHsgfVxuIl19