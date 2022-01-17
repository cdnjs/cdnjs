import { NgModule, Component, Input, Output, EventEmitter, ContentChild, ChangeDetectionStrategy, ViewEncapsulation, ContentChildren } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule, Footer, PrimeTemplate } from 'primeng/api';
import { RippleModule } from 'primeng/ripple';
import { trigger, state, style, transition, animate } from '@angular/animations';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
import * as i2 from "primeng/ripple";
let idx = 0;
export class Panel {
    constructor(el) {
        this.el = el;
        this.collapsed = false;
        this.expandIcon = 'pi pi-plus';
        this.collapseIcon = 'pi pi-minus';
        this.showHeader = true;
        this.toggler = "icon";
        this.collapsedChange = new EventEmitter();
        this.onBeforeToggle = new EventEmitter();
        this.onAfterToggle = new EventEmitter();
        this.transitionOptions = '400ms cubic-bezier(0.86, 0, 0.07, 1)';
        this.id = `p-panel-${idx++}`;
    }
    ngAfterContentInit() {
        this.templates.forEach((item) => {
            switch (item.getType()) {
                case 'header':
                    this.headerTemplate = item.template;
                    break;
                case 'content':
                    this.contentTemplate = item.template;
                    break;
                case 'footer':
                    this.footerTemplate = item.template;
                    break;
                case 'icons':
                    this.iconTemplate = item.template;
                    break;
                default:
                    this.contentTemplate = item.template;
                    break;
            }
        });
    }
    onHeaderClick(event) {
        if (this.toggler === 'header') {
            this.toggle(event);
        }
    }
    onIconClick(event) {
        if (this.toggler === 'icon') {
            this.toggle(event);
        }
    }
    toggle(event) {
        if (this.animating) {
            return false;
        }
        this.animating = true;
        this.onBeforeToggle.emit({ originalEvent: event, collapsed: this.collapsed });
        if (this.toggleable) {
            if (this.collapsed)
                this.expand(event);
            else
                this.collapse(event);
        }
        event.preventDefault();
    }
    expand(event) {
        this.collapsed = false;
        this.collapsedChange.emit(this.collapsed);
    }
    collapse(event) {
        this.collapsed = true;
        this.collapsedChange.emit(this.collapsed);
    }
    getBlockableElement() {
        return this.el.nativeElement.children[0];
    }
    onToggleDone(event) {
        this.animating = false;
        this.onAfterToggle.emit({ originalEvent: event, collapsed: this.collapsed });
    }
}
Panel.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0, type: Panel, deps: [{ token: i0.ElementRef }], target: i0.ɵɵFactoryTarget.Component });
Panel.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.0.5", type: Panel, selector: "p-panel", inputs: { toggleable: "toggleable", header: "header", collapsed: "collapsed", style: "style", styleClass: "styleClass", expandIcon: "expandIcon", collapseIcon: "collapseIcon", showHeader: "showHeader", toggler: "toggler", transitionOptions: "transitionOptions" }, outputs: { collapsedChange: "collapsedChange", onBeforeToggle: "onBeforeToggle", onAfterToggle: "onAfterToggle" }, host: { classAttribute: "p-element" }, queries: [{ propertyName: "footerFacet", first: true, predicate: Footer, descendants: true }, { propertyName: "templates", predicate: PrimeTemplate }], ngImport: i0, template: `
        <div [attr.id]="id" [ngClass]="{'p-panel p-component': true, 'p-panel-toggleable': toggleable}" [ngStyle]="style" [class]="styleClass">
            <div class="p-panel-header" *ngIf="showHeader" (click)="onHeaderClick($event)" [attr.id]="id + '-titlebar'">
                <span class="p-panel-title" *ngIf="header" [attr.id]="id + '_header'">{{header}}</span>
                <ng-content select="p-header"></ng-content>
                <ng-container *ngTemplateOutlet="headerTemplate"></ng-container>
                <div class="p-panel-icons">
                    <ng-template *ngTemplateOutlet="iconTemplate"></ng-template>
                    <button *ngIf="toggleable" type="button" [attr.id]="id + '-label'" class="p-panel-header-icon p-panel-toggler p-link" pRipple
                        (click)="onIconClick($event)" (keydown.enter)="onIconClick($event)" [attr.aria-controls]="id + '-content'" role="tab" [attr.aria-expanded]="!collapsed">
                        <span [class]="collapsed ? expandIcon : collapseIcon"></span>
                    </button>
                </div>
            </div>
            <div [attr.id]="id + '-content'" class="p-toggleable-content" [@panelContent]="collapsed ? {value: 'hidden', params: {transitionParams: animating ? transitionOptions : '0ms', height: '0', opacity:'0'}} : {value: 'visible', params: {transitionParams: animating ? transitionOptions : '0ms', height: '*', opacity: '1'}}" (@panelContent.done)="onToggleDone($event)"
                role="region" [attr.aria-hidden]="collapsed" [attr.aria-labelledby]="id  + '-titlebar'">
                <div class="p-panel-content">
                    <ng-content></ng-content>
                    <ng-container *ngTemplateOutlet="contentTemplate"></ng-container>
                </div>

                <div class="p-panel-footer" *ngIf="footerFacet || footerTemplate">
                    <ng-content select="p-footer"></ng-content>
                    <ng-container *ngTemplateOutlet="footerTemplate"></ng-container>
                </div>
            </div>
        </div>
    `, isInline: true, styles: [".p-panel-header{display:flex;justify-content:space-between;align-items:center}.p-panel-title{line-height:1}.p-panel-header-icon{display:inline-flex;justify-content:center;align-items:center;cursor:pointer;text-decoration:none;overflow:hidden;position:relative}"], directives: [{ type: i1.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { type: i1.NgStyle, selector: "[ngStyle]", inputs: ["ngStyle"] }, { type: i1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i1.NgTemplateOutlet, selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet"] }, { type: i2.Ripple, selector: "[pRipple]" }], animations: [
        trigger('panelContent', [
            state('hidden', style({
                height: '0',
                overflow: 'hidden'
            })),
            state('void', style({
                height: '{{height}}'
            }), { params: { height: '0' } }),
            state('visible', style({
                height: '*'
            })),
            transition('visible <=> hidden', [style({ overflow: 'hidden' }), animate('{{transitionParams}}')]),
            transition('void => hidden', animate('{{transitionParams}}')),
            transition('void => visible', animate('{{transitionParams}}'))
        ])
    ], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0, type: Panel, decorators: [{
            type: Component,
            args: [{
                    selector: 'p-panel',
                    template: `
        <div [attr.id]="id" [ngClass]="{'p-panel p-component': true, 'p-panel-toggleable': toggleable}" [ngStyle]="style" [class]="styleClass">
            <div class="p-panel-header" *ngIf="showHeader" (click)="onHeaderClick($event)" [attr.id]="id + '-titlebar'">
                <span class="p-panel-title" *ngIf="header" [attr.id]="id + '_header'">{{header}}</span>
                <ng-content select="p-header"></ng-content>
                <ng-container *ngTemplateOutlet="headerTemplate"></ng-container>
                <div class="p-panel-icons">
                    <ng-template *ngTemplateOutlet="iconTemplate"></ng-template>
                    <button *ngIf="toggleable" type="button" [attr.id]="id + '-label'" class="p-panel-header-icon p-panel-toggler p-link" pRipple
                        (click)="onIconClick($event)" (keydown.enter)="onIconClick($event)" [attr.aria-controls]="id + '-content'" role="tab" [attr.aria-expanded]="!collapsed">
                        <span [class]="collapsed ? expandIcon : collapseIcon"></span>
                    </button>
                </div>
            </div>
            <div [attr.id]="id + '-content'" class="p-toggleable-content" [@panelContent]="collapsed ? {value: 'hidden', params: {transitionParams: animating ? transitionOptions : '0ms', height: '0', opacity:'0'}} : {value: 'visible', params: {transitionParams: animating ? transitionOptions : '0ms', height: '*', opacity: '1'}}" (@panelContent.done)="onToggleDone($event)"
                role="region" [attr.aria-hidden]="collapsed" [attr.aria-labelledby]="id  + '-titlebar'">
                <div class="p-panel-content">
                    <ng-content></ng-content>
                    <ng-container *ngTemplateOutlet="contentTemplate"></ng-container>
                </div>

                <div class="p-panel-footer" *ngIf="footerFacet || footerTemplate">
                    <ng-content select="p-footer"></ng-content>
                    <ng-container *ngTemplateOutlet="footerTemplate"></ng-container>
                </div>
            </div>
        </div>
    `,
                    animations: [
                        trigger('panelContent', [
                            state('hidden', style({
                                height: '0',
                                overflow: 'hidden'
                            })),
                            state('void', style({
                                height: '{{height}}'
                            }), { params: { height: '0' } }),
                            state('visible', style({
                                height: '*'
                            })),
                            transition('visible <=> hidden', [style({ overflow: 'hidden' }), animate('{{transitionParams}}')]),
                            transition('void => hidden', animate('{{transitionParams}}')),
                            transition('void => visible', animate('{{transitionParams}}'))
                        ])
                    ],
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    encapsulation: ViewEncapsulation.None,
                    styleUrls: ['./panel.css'],
                    host: {
                        'class': 'p-element'
                    }
                }]
        }], ctorParameters: function () { return [{ type: i0.ElementRef }]; }, propDecorators: { toggleable: [{
                type: Input
            }], header: [{
                type: Input
            }], collapsed: [{
                type: Input
            }], style: [{
                type: Input
            }], styleClass: [{
                type: Input
            }], expandIcon: [{
                type: Input
            }], collapseIcon: [{
                type: Input
            }], showHeader: [{
                type: Input
            }], toggler: [{
                type: Input
            }], collapsedChange: [{
                type: Output
            }], onBeforeToggle: [{
                type: Output
            }], onAfterToggle: [{
                type: Output
            }], transitionOptions: [{
                type: Input
            }], footerFacet: [{
                type: ContentChild,
                args: [Footer]
            }], templates: [{
                type: ContentChildren,
                args: [PrimeTemplate]
            }] } });
export class PanelModule {
}
PanelModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0, type: PanelModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
PanelModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0, type: PanelModule, declarations: [Panel], imports: [CommonModule, SharedModule, RippleModule], exports: [Panel, SharedModule] });
PanelModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0, type: PanelModule, imports: [[CommonModule, SharedModule, RippleModule], SharedModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0, type: PanelModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule, SharedModule, RippleModule],
                    exports: [Panel, SharedModule],
                    declarations: [Panel]
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFuZWwuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvYXBwL2NvbXBvbmVudHMvcGFuZWwvcGFuZWwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFDLFFBQVEsRUFBQyxTQUFTLEVBQUMsS0FBSyxFQUFDLE1BQU0sRUFBQyxZQUFZLEVBQVksWUFBWSxFQUFDLHVCQUF1QixFQUFFLGlCQUFpQixFQUFFLGVBQWUsRUFBMkMsTUFBTSxlQUFlLENBQUM7QUFDek0sT0FBTyxFQUFDLFlBQVksRUFBQyxNQUFNLGlCQUFpQixDQUFDO0FBQzdDLE9BQU8sRUFBQyxZQUFZLEVBQUMsTUFBTSxFQUFFLGFBQWEsRUFBQyxNQUFNLGFBQWEsQ0FBQztBQUUvRCxPQUFPLEVBQUMsWUFBWSxFQUFDLE1BQU0sZ0JBQWdCLENBQUM7QUFDNUMsT0FBTyxFQUFDLE9BQU8sRUFBQyxLQUFLLEVBQUMsS0FBSyxFQUFDLFVBQVUsRUFBQyxPQUFPLEVBQUMsTUFBTSxxQkFBcUIsQ0FBQzs7OztBQUUzRSxJQUFJLEdBQUcsR0FBVyxDQUFDLENBQUM7QUF3RHBCLE1BQU0sT0FBTyxLQUFLO0lBNENkLFlBQW9CLEVBQWM7UUFBZCxPQUFFLEdBQUYsRUFBRSxDQUFZO1FBdEN6QixjQUFTLEdBQVksS0FBSyxDQUFDO1FBTTNCLGVBQVUsR0FBVyxZQUFZLENBQUM7UUFFbEMsaUJBQVksR0FBVyxhQUFhLENBQUM7UUFFckMsZUFBVSxHQUFZLElBQUksQ0FBQztRQUUzQixZQUFPLEdBQVcsTUFBTSxDQUFDO1FBRXhCLG9CQUFlLEdBQXNCLElBQUksWUFBWSxFQUFFLENBQUM7UUFFeEQsbUJBQWMsR0FBc0IsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQUV2RCxrQkFBYSxHQUFzQixJQUFJLFlBQVksRUFBRSxDQUFDO1FBRXZELHNCQUFpQixHQUFXLHNDQUFzQyxDQUFDO1FBZ0I1RSxPQUFFLEdBQVcsV0FBVyxHQUFHLEVBQUUsRUFBRSxDQUFDO0lB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SEUsWUFBWTt5R0FHbkIsV0FBVyxZQUpYLENBQUMsWUFBWSxFQUFDLFlBQVksRUFBQyxZQUFZLENBQUMsRUFDakMsWUFBWTsyRkFHbkIsV0FBVztrQkFMdkIsUUFBUTttQkFBQztvQkFDTixPQUFPLEVBQUUsQ0FBQyxZQUFZLEVBQUMsWUFBWSxFQUFDLFlBQVksQ0FBQztvQkFDakQsT0FBTyxFQUFFLENBQUMsS0FBSyxFQUFDLFlBQVksQ0FBQztvQkFDN0IsWUFBWSxFQUFFLENBQUMsS0FBSyxDQUFDO2lCQUN4QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7TmdNb2R1bGUsQ29tcG9uZW50LElucHV0LE91dHB1dCxFdmVudEVtaXR0ZXIsRWxlbWVudFJlZixDb250ZW50Q2hpbGQsQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksIFZpZXdFbmNhcHN1bGF0aW9uLCBDb250ZW50Q2hpbGRyZW4sIFF1ZXJ5TGlzdCwgVGVtcGxhdGVSZWYsIEFmdGVyQ29udGVudEluaXR9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtDb21tb25Nb2R1bGV9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQge1NoYXJlZE1vZHVsZSxGb290ZXIsIFByaW1lVGVtcGxhdGV9IGZyb20gJ3ByaW1lbmcvYXBpJztcbmltcG9ydCB7QmxvY2thYmxlVUl9IGZyb20gJ3ByaW1lbmcvYXBpJztcbmltcG9ydCB7UmlwcGxlTW9kdWxlfSBmcm9tICdwcmltZW5nL3JpcHBsZSc7XG5pbXBvcnQge3RyaWdnZXIsc3RhdGUsc3R5bGUsdHJhbnNpdGlvbixhbmltYXRlfSBmcm9tICdAYW5ndWxhci9hbmltYXRpb25zJztcblxubGV0IGlkeDogbnVtYmVyID0gMDtcblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICdwLXBhbmVsJyxcbiAgICB0ZW1wbGF0ZTogYFxuICAgICAgICA8ZGl2IFthdHRyLmlkXT1cImlkXCIgW25nQ2xhc3NdPVwieydwLXBhbmVsIHAtY29tcG9uZW50JzogdHJ1ZSwgJ3AtcGFuZWwtdG9nZ2xlYWJsZSc6IHRvZ2dsZWFibGV9XCIgW25nU3R5bGVdPVwic3R5bGVcIiBbY2xhc3NdPVwic3R5bGVDbGFzc1wiPlxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cInAtcGFuZWwtaGVhZGVyXCIgKm5nSWY9XCJzaG93SGVhZGVyXCIgKGNsaWNrKT1cIm9uSGVhZGVyQ2xpY2soJGV2ZW50KVwiIFthdHRyLmlkXT1cImlkICsgJy10aXRsZWJhcidcIj5cbiAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cInAtcGFuZWwtdGl0bGVcIiAqbmdJZj1cImhlYWRlclwiIFthdHRyLmlkXT1cImlkICsgJ19oZWFkZXInXCI+e3toZWFkZXJ9fTwvc3Bhbj5cbiAgICAgICAgICAgICAgICA8bmctY29udGVudCBzZWxlY3Q9XCJwLWhlYWRlclwiPjwvbmctY29udGVudD5cbiAgICAgICAgICAgICAgICA8bmctY29udGFpbmVyICpuZ1RlbXBsYXRlT3V0bGV0PVwiaGVhZGVyVGVtcGxhdGVcIj48L25nLWNvbnRhaW5lcj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwicC1wYW5lbC1pY29uc1wiPlxuICAgICAgICAgICAgICAgICAgICA8bmctdGVtcGxhdGUgKm5nVGVtcGxhdGVPdXRsZXQ9XCJpY29uVGVtcGxhdGVcIj48L25nLXRlbXBsYXRlPlxuICAgICAgICAgICAgICAgICAgICA8YnV0dG9uICpuZ0lmPVwidG9nZ2xlYWJsZVwiIHR5cGU9XCJidXR0b25cIiBbYXR0ci5pZF09XCJpZCArICctbGFiZWwnXCIgY2xhc3M9XCJwLXBhbmVsLWhlYWRlci1pY29uIHAtcGFuZWwtdG9nZ2xlciBwLWxpbmtcIiBwUmlwcGxlXG4gICAgICAgICAgICAgICAgICAgICAgICAoY2xpY2spPVwib25JY29uQ2xpY2soJGV2ZW50KVwiIChrZXlkb3duLmVudGVyKT1cIm9uSWNvbkNsaWNrKCRldmVudClcIiBbYXR0ci5hcmlhLWNvbnRyb2xzXT1cImlkICsgJy1jb250ZW50J1wiIHJvbGU9XCJ0YWJcIiBbYXR0ci5hcmlhLWV4cGFuZGVkXT1cIiFjb2xsYXBzZWRcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIFtjbGFzc109XCJjb2xsYXBzZWQgPyBleHBhbmRJY29uIDogY29sbGFwc2VJY29uXCI+PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPGRpdiBbYXR0ci5pZF09XCJpZCArICctY29udGVudCdcIiBjbGFzcz1cInAtdG9nZ2xlYWJsZS1jb250ZW50XCIgW0BwYW5lbENvbnRlbnRdPVwiY29sbGFwc2VkID8ge3ZhbHVlOiAnaGlkZGVuJywgcGFyYW1zOiB7dHJhbnNpdGlvblBhcmFtczogYW5pbWF0aW5nID8gdHJhbnNpdGlvbk9wdGlvbnMgOiAnMG1zJywgaGVpZ2h0OiAnMCcsIG9wYWNpdHk6JzAnfX0gOiB7dmFsdWU6ICd2aXNpYmxlJywgcGFyYW1zOiB7dHJhbnNpdGlvblBhcmFtczogYW5pbWF0aW5nID8gdHJhbnNpdGlvbk9wdGlvbnMgOiAnMG1zJywgaGVpZ2h0OiAnKicsIG9wYWNpdHk6ICcxJ319XCIgKEBwYW5lbENvbnRlbnQuZG9uZSk9XCJvblRvZ2dsZURvbmUoJGV2ZW50KVwiXG4gICAgICAgICAgICAgICAgcm9sZT1cInJlZ2lvblwiIFthdHRyLmFyaWEtaGlkZGVuXT1cImNvbGxhcHNlZFwiIFthdHRyLmFyaWEtbGFiZWxsZWRieV09XCJpZCAgKyAnLXRpdGxlYmFyJ1wiPlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJwLXBhbmVsLWNvbnRlbnRcIj5cbiAgICAgICAgICAgICAgICAgICAgPG5nLWNvbnRlbnQ+PC9uZy1jb250ZW50PlxuICAgICAgICAgICAgICAgICAgICA8bmctY29udGFpbmVyICpuZ1RlbXBsYXRlT3V0bGV0PVwiY29udGVudFRlbXBsYXRlXCI+PC9uZy1jb250YWluZXI+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwicC1wYW5lbC1mb290ZXJcIiAqbmdJZj1cImZvb3RlckZhY2V0IHx8IGZvb3RlclRlbXBsYXRlXCI+XG4gICAgICAgICAgICAgICAgICAgIDxuZy1jb250ZW50IHNlbGVjdD1cInAtZm9vdGVyXCI+PC9uZy1jb250ZW50PlxuICAgICAgICAgICAgICAgICAgICA8bmctY29udGFpbmVyICpuZ1RlbXBsYXRlT3V0bGV0PVwiZm9vdGVyVGVtcGxhdGVcIj48L25nLWNvbnRhaW5lcj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICBgLFxuICAgIGFuaW1hdGlvbnM6IFtcbiAgICAgICAgdHJpZ2dlcigncGFuZWxDb250ZW50JywgW1xuICAgICAgICAgICAgc3RhdGUoJ2hpZGRlbicsIHN0eWxlKHtcbiAgICAgICAgICAgICAgICBoZWlnaHQ6ICcwJyxcbiAgICAgICAgICAgICAgICBvdmVyZmxvdzogJ2hpZGRlbidcbiAgICAgICAgICAgIH0pKSxcbiAgICAgICAgICAgIHN0YXRlKCd2b2lkJywgc3R5bGUoe1xuICAgICAgICAgICAgICAgIGhlaWdodDogJ3t7aGVpZ2h0fX0nXG4gICAgICAgICAgICB9KSwge3BhcmFtczoge2hlaWdodDogJzAnfX0pLFxuICAgICAgICAgICAgc3RhdGUoJ3Zpc2libGUnLCBzdHlsZSh7XG4gICAgICAgICAgICAgICAgaGVpZ2h0OiAnKidcbiAgICAgICAgICAgIH0pKSxcbiAgICAgICAgICAgIHRyYW5zaXRpb24oJ3Zpc2libGUgPD0+IGhpZGRlbicsIFtzdHlsZSh7IG92ZXJmbG93OiAnaGlkZGVuJ30pLCBhbmltYXRlKCd7e3RyYW5zaXRpb25QYXJhbXN9fScpXSksXG4gICAgICAgICAgICB0cmFuc2l0aW9uKCd2b2lkID0+IGhpZGRlbicsIGFuaW1hdGUoJ3t7dHJhbnNpdGlvblBhcmFtc319JykpLFxuICAgICAgICAgICAgdHJhbnNpdGlvbigndm9pZCA9PiB2aXNpYmxlJywgYW5pbWF0ZSgne3t0cmFuc2l0aW9uUGFyYW1zfX0nKSlcbiAgICAgICAgXSlcbiAgICBdLFxuICAgIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxuICAgIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmUsXG4gICAgc3R5bGVVcmxzOiBbJy4vcGFuZWwuY3NzJ10sXG4gICAgaG9zdDoge1xuICAgICAgICAnY2xhc3MnOiAncC1lbGVtZW50J1xuICAgIH1cbn0pXG5leHBvcnQgY2xhc3MgUGFuZWwgaW1wbGVtZW50cyBBZnRlckNvbnRlbnRJbml0LEJsb2NrYWJsZVVJIHtcblxuICAgIEBJbnB1dCgpIHRvZ2dsZWFibGU6IGJvb2xlYW47XG5cbiAgICBASW5wdXQoKSBoZWFkZXI6IHN0cmluZztcblxuICAgIEBJbnB1dCgpIGNvbGxhcHNlZDogYm9vbGVhbiA9IGZhbHNlO1xuXG4gICAgQElucHV0KCkgc3R5bGU6IGFueTtcblxuICAgIEBJbnB1dCgpIHN0eWxlQ2xhc3M6IHN0cmluZztcblxuICAgIEBJbnB1dCgpIGV4cGFuZEljb246IHN0cmluZyA9ICdwaSBwaS1wbHVzJztcblxuICAgIEBJbnB1dCgpIGNvbGxhcHNlSWNvbjogc3RyaW5nID0gJ3BpIHBpLW1pbnVzJztcblxuICAgIEBJbnB1dCgpIHNob3dIZWFkZXI6IGJvb2xlYW4gPSB0cnVlO1xuXG4gICAgQElucHV0KCkgdG9nZ2xlcjogc3RyaW5nID0gXCJpY29uXCI7XG5cbiAgICBAT3V0cHV0KCkgY29sbGFwc2VkQ2hhbmdlOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICAgIEBPdXRwdXQoKSBvbkJlZm9yZVRvZ2dsZTogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgICBAT3V0cHV0KCkgb25BZnRlclRvZ2dsZTogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgICBASW5wdXQoKSB0cmFuc2l0aW9uT3B0aW9uczogc3RyaW5nID0gJzQwMG1zIGN1YmljLWJlemllcigwLjg2LCAwLCAwLjA3LCAxKSc7XG5cbiAgICBAQ29udGVudENoaWxkKEZvb3RlcikgZm9vdGVyRmFjZXQ7XG5cbiAgICBAQ29udGVudENoaWxkcmVuKFByaW1lVGVtcGxhdGUpIHRlbXBsYXRlczogUXVlcnlMaXN0PGFueT47XG5cbiAgICBwdWJsaWMgaWNvblRlbXBsYXRlOiBUZW1wbGF0ZVJlZjxhbnk+O1xuXG4gICAgYW5pbWF0aW5nOiBib29sZWFuO1xuXG4gICAgaGVhZGVyVGVtcGxhdGU6IFRlbXBsYXRlUmVmPGFueT47XG5cbiAgICBjb250ZW50VGVtcGxhdGU6IFRlbXBsYXRlUmVmPGFueT47XG5cbiAgICBmb290ZXJUZW1wbGF0ZTogVGVtcGxhdGVSZWY8YW55PjtcblxuICAgIGlkOiBzdHJpbmcgPSBgcC1wYW5lbC0ke2lkeCsrfWA7XG5cbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIGVsOiBFbGVtZW50UmVmKSB7IH1cblxuICAgIG5nQWZ0ZXJDb250ZW50SW5pdCgpIHtcbiAgICAgICAgdGhpcy50ZW1wbGF0ZXMuZm9yRWFjaCgoaXRlbSkgPT4ge1xuICAgICAgICAgICAgc3dpdGNoKGl0ZW0uZ2V0VHlwZSgpKSB7XG4gICAgICAgICAgICAgICAgY2FzZSAnaGVhZGVyJzpcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5oZWFkZXJUZW1wbGF0ZSA9IGl0ZW0udGVtcGxhdGU7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgICAgICBjYXNlICdjb250ZW50JzpcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jb250ZW50VGVtcGxhdGUgPSBpdGVtLnRlbXBsYXRlO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICAgICAgY2FzZSAnZm9vdGVyJzpcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5mb290ZXJUZW1wbGF0ZSA9IGl0ZW0udGVtcGxhdGU7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgICAgICBjYXNlICdpY29ucyc6XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaWNvblRlbXBsYXRlID0gaXRlbS50ZW1wbGF0ZTtcbiAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY29udGVudFRlbXBsYXRlID0gaXRlbS50ZW1wbGF0ZTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgb25IZWFkZXJDbGljayhldmVudDogRXZlbnQpIHtcbiAgICAgICAgaWYgKHRoaXMudG9nZ2xlciA9PT0gJ2hlYWRlcicpIHtcbiAgICAgICAgICAgIHRoaXMudG9nZ2xlKGV2ZW50KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIG9uSWNvbkNsaWNrKGV2ZW50OiBFdmVudCkge1xuICAgICAgICBpZiAodGhpcy50b2dnbGVyID09PSAnaWNvbicpIHtcbiAgICAgICAgICAgIHRoaXMudG9nZ2xlKGV2ZW50KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHRvZ2dsZShldmVudDogRXZlbnQpIHtcbiAgICAgICAgaWYgKHRoaXMuYW5pbWF0aW5nKSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmFuaW1hdGluZyA9IHRydWU7XG4gICAgICAgIHRoaXMub25CZWZvcmVUb2dnbGUuZW1pdCh7b3JpZ2luYWxFdmVudDogZXZlbnQsIGNvbGxhcHNlZDogdGhpcy5jb2xsYXBzZWR9KTtcblxuICAgICAgICBpZiAodGhpcy50b2dnbGVhYmxlKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5jb2xsYXBzZWQpXG4gICAgICAgICAgICAgICAgdGhpcy5leHBhbmQoZXZlbnQpO1xuICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAgIHRoaXMuY29sbGFwc2UoZXZlbnQpO1xuICAgICAgICB9XG5cbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICB9XG5cbiAgICBleHBhbmQoZXZlbnQpIHtcbiAgICAgICAgdGhpcy5jb2xsYXBzZWQgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5jb2xsYXBzZWRDaGFuZ2UuZW1pdCh0aGlzLmNvbGxhcHNlZCk7XG4gICAgfVxuXG4gICAgY29sbGFwc2UoZXZlbnQpIHtcbiAgICAgICAgdGhpcy5jb2xsYXBzZWQgPSB0cnVlO1xuICAgICAgICB0aGlzLmNvbGxhcHNlZENoYW5nZS5lbWl0KHRoaXMuY29sbGFwc2VkKTtcbiAgICB9XG5cbiAgICBnZXRCbG9ja2FibGVFbGVtZW50KCk6IEhUTUxFbGVtZW50wqB7XG4gICAgICAgIHJldHVybiB0aGlzLmVsLm5hdGl2ZUVsZW1lbnQuY2hpbGRyZW5bMF07XG4gICAgfVxuXG4gICAgb25Ub2dnbGVEb25lKGV2ZW50OiBFdmVudCkge1xuICAgICAgICB0aGlzLmFuaW1hdGluZyA9IGZhbHNlO1xuICAgICAgICB0aGlzLm9uQWZ0ZXJUb2dnbGUuZW1pdCh7b3JpZ2luYWxFdmVudDogZXZlbnQsIGNvbGxhcHNlZDogdGhpcy5jb2xsYXBzZWR9KTtcbiAgICB9XG5cbn1cblxuQE5nTW9kdWxlKHtcbiAgICBpbXBvcnRzOiBbQ29tbW9uTW9kdWxlLFNoYXJlZE1vZHVsZSxSaXBwbGVNb2R1bGVdLFxuICAgIGV4cG9ydHM6IFtQYW5lbCxTaGFyZWRNb2R1bGVdLFxuICAgIGRlY2xhcmF0aW9uczogW1BhbmVsXVxufSlcbmV4cG9ydCBjbGFzcyBQYW5lbE1vZHVsZSB7IH1cbiJdfQ==