import { NgModule, Component, Input, Output, EventEmitter, Inject, forwardRef, ContentChildren, ChangeDetectionStrategy, ViewEncapsulation } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'primeng/api';
import { PrimeTemplate } from 'primeng/api';
import { Subject } from 'rxjs';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
export class OrganizationChartNode {
    constructor(chart, cd) {
        this.cd = cd;
        this.chart = chart;
        this.subscription = this.chart.selectionSource$.subscribe(() => {
            this.cd.markForCheck();
        });
    }
    get leaf() {
        return this.node.leaf == false ? false : !(this.node.children && this.node.children.length);
    }
    get colspan() {
        return (this.node.children && this.node.children.length) ? this.node.children.length * 2 : null;
    }
    onNodeClick(event, node) {
        this.chart.onNodeClick(event, node);
    }
    toggleNode(event, node) {
        node.expanded = !node.expanded;
        if (node.expanded)
            this.chart.onNodeExpand.emit({ originalEvent: event, node: this.node });
        else
            this.chart.onNodeCollapse.emit({ originalEvent: event, node: this.node });
        event.preventDefault();
    }
    isSelected() {
        return this.chart.isSelected(this.node);
    }
    ngOnDestroy() {
        this.subscription.unsubscribe();
    }
}
OrganizationChartNode.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.0.4", ngImport: i0, type: OrganizationChartNode, deps: [{ token: forwardRef(() => OrganizationChart) }, { token: i0.ChangeDetectorRef }], target: i0.ɵɵFactoryTarget.Component });
OrganizationChartNode.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.0.4", type: OrganizationChartNode, selector: "[pOrganizationChartNode]", inputs: { node: "node", root: "root", first: "first", last: "last" }, ngImport: i0, template: `
        <tbody *ngIf="node">
            <tr>
                <td [attr.colspan]="colspan">
                    <div [class]="node.styleClass" [ngClass]="{'p-organizationchart-node-content': true, 'p-organizationchart-selectable-node': chart.selectionMode && node.selectable !== false,'p-highlight':isSelected()}"
                        (click)="onNodeClick($event,node)">
                        <div *ngIf="!chart.getTemplateForNode(node)">{{node.label}}</div>
                        <div *ngIf="chart.getTemplateForNode(node)">
                            <ng-container *ngTemplateOutlet="chart.getTemplateForNode(node); context: {$implicit: node}"></ng-container>
                        </div>
                        <a *ngIf="!leaf" tabindex="0" class="p-node-toggler" (click)="toggleNode($event, node)" (keydown.enter)="toggleNode($event, node)">
                            <i class="p-node-toggler-icon pi" [ngClass]="{'pi-chevron-down': node.expanded, 'pi-chevron-up': !node.expanded}"></i>
                        </a>
                    </div>
                </td>
            </tr>
            <tr [ngClass]="!leaf&&node.expanded ? 'p-organizationchart-node-visible' : 'p-organizationchart-node-hidden'" class="p-organizationchart-lines" [@childState]="'in'">
                <td [attr.colspan]="colspan">
                    <div class="p-organizationchart-line-down"></div>
                </td>
            </tr>
            <tr [ngClass]="!leaf&&node.expanded ? 'p-organizationchart-node-visible' : 'p-organizationchart-node-hidden'" class="p-organizationchart-lines" [@childState]="'in'">
                <ng-container *ngIf="node.children && node.children.length === 1">
                    <td [attr.colspan]="colspan">
                        <div class="p-organizationchart-line-down"></div>
                    </td>
                </ng-container>
                <ng-container *ngIf="node.children && node.children.length > 1">
                    <ng-template ngFor let-child [ngForOf]="node.children" let-first="first" let-last="last">
                        <td class="p-organizationchart-line-left" [ngClass]="{'p-organizationchart-line-top':!first}">&nbsp;</td>
                        <td class="p-organizationchart-line-right" [ngClass]="{'p-organizationchart-line-top':!last}">&nbsp;</td>
                    </ng-template>
                </ng-container>
            </tr>
            <tr [ngClass]="!leaf&&node.expanded ? 'p-organizationchart-node-visible' : 'p-organizationchart-node-hidden'" class="p-organizationchart-nodes" [@childState]="'in'">
                <td *ngFor="let child of node.children" colspan="2">
                    <table class="p-organizationchart-table" pOrganizationChartNode [node]="child"></table>
                </td>
            </tr>
        </tbody>
    `, isInline: true, styles: [".p-organizationchart-table{border-spacing:0;border-collapse:separate;margin:0 auto}.p-organizationchart-table>tbody>tr>td{text-align:center;vertical-align:top;padding:0 .75rem}.p-organizationchart-node-content{display:inline-block;position:relative}.p-organizationchart-node-content .p-node-toggler{position:absolute;bottom:-.75rem;margin-left:-.75rem;z-index:2;left:50%;-webkit-user-select:none;-ms-user-select:none;user-select:none;cursor:pointer;width:1.5rem;height:1.5rem}.p-organizationchart-node-content .p-node-toggler .p-node-toggler-icon{position:relative;top:.25rem}.p-organizationchart-line-down{margin:0 auto;height:20px;width:1px}.p-organizationchart-line-left,.p-organizationchart-line-right{border-radius:0}.p-organizationchart-selectable-node{cursor:pointer}.p-organizationchart .p-organizationchart-node-hidden{display:none}.p-organizationchart-preservespace .p-organizationchart-node-hidden{visibility:hidden;display:inherit}"], components: [{ type: OrganizationChartNode, selector: "[pOrganizationChartNode]", inputs: ["node", "root", "first", "last"] }], directives: [{ type: i1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i1.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { type: i1.NgTemplateOutlet, selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet"] }, { type: i1.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }], animations: [
        trigger('childState', [
            state('in', style({ opacity: 1 })),
            transition('void => *', [
                style({ opacity: 0 }),
                animate(150)
            ]),
            transition('* => void', [
                animate(150, style({ opacity: 0 }))
            ])
        ])
    ], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.0.4", ngImport: i0, type: OrganizationChartNode, decorators: [{
            type: Component,
            args: [{
                    selector: '[pOrganizationChartNode]',
                    template: `
        <tbody *ngIf="node">
            <tr>
                <td [attr.colspan]="colspan">
                    <div [class]="node.styleClass" [ngClass]="{'p-organizationchart-node-content': true, 'p-organizationchart-selectable-node': chart.selectionMode && node.selectable !== false,'p-highlight':isSelected()}"
                        (click)="onNodeClick($event,node)">
                        <div *ngIf="!chart.getTemplateForNode(node)">{{node.label}}</div>
                        <div *ngIf="chart.getTemplateForNode(node)">
                            <ng-container *ngTemplateOutlet="chart.getTemplateForNode(node); context: {$implicit: node}"></ng-container>
                        </div>
                        <a *ngIf="!leaf" tabindex="0" class="p-node-toggler" (click)="toggleNode($event, node)" (keydown.enter)="toggleNode($event, node)">
                            <i class="p-node-toggler-icon pi" [ngClass]="{'pi-chevron-down': node.expanded, 'pi-chevron-up': !node.expanded}"></i>
                        </a>
                    </div>
                </td>
            </tr>
            <tr [ngClass]="!leaf&&node.expanded ? 'p-organizationchart-node-visible' : 'p-organizationchart-node-hidden'" class="p-organizationchart-lines" [@childState]="'in'">
                <td [attr.colspan]="colspan">
                    <div class="p-organizationchart-line-down"></div>
                </td>
            </tr>
            <tr [ngClass]="!leaf&&node.expanded ? 'p-organizationchart-node-visible' : 'p-organizationchart-node-hidden'" class="p-organizationchart-lines" [@childState]="'in'">
                <ng-container *ngIf="node.children && node.children.length === 1">
                    <td [attr.colspan]="colspan">
                        <div class="p-organizationchart-line-down"></div>
                    </td>
                </ng-container>
                <ng-container *ngIf="node.children && node.children.length > 1">
                    <ng-template ngFor let-child [ngForOf]="node.children" let-first="first" let-last="last">
                        <td class="p-organizationchart-line-left" [ngClass]="{'p-organizationchart-line-top':!first}">&nbsp;</td>
                        <td class="p-organizationchart-line-right" [ngClass]="{'p-organizationchart-line-top':!last}">&nbsp;</td>
                    </ng-template>
                </ng-container>
            </tr>
            <tr [ngClass]="!leaf&&node.expanded ? 'p-organizationchart-node-visible' : 'p-organizationchart-node-hidden'" class="p-organizationchart-nodes" [@childState]="'in'">
                <td *ngFor="let child of node.children" colspan="2">
                    <table class="p-organizationchart-table" pOrganizationChartNode [node]="child"></table>
                </td>
            </tr>
        </tbody>
    `,
                    animations: [
                        trigger('childState', [
                            state('in', style({ opacity: 1 })),
                            transition('void => *', [
                                style({ opacity: 0 }),
                                animate(150)
                            ]),
                            transition('* => void', [
                                animate(150, style({ opacity: 0 }))
                            ])
                        ])
                    ],
                    encapsulation: ViewEncapsulation.None,
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    styleUrls: ['./organizationchart.css']
                }]
        }], ctorParameters: function () { return [{ type: undefined, decorators: [{
                    type: Inject,
                    args: [forwardRef(() => OrganizationChart)]
                }] }, { type: i0.ChangeDetectorRef }]; }, propDecorators: { node: [{
                type: Input
            }], root: [{
                type: Input
            }], first: [{
                type: Input
            }], last: [{
                type: Input
            }] } });
export class OrganizationChart {
    constructor(el, cd) {
        this.el = el;
        this.cd = cd;
        this.preserveSpace = true;
        this.selectionChange = new EventEmitter();
        this.onNodeSelect = new EventEmitter();
        this.onNodeUnselect = new EventEmitter();
        this.onNodeExpand = new EventEmitter();
        this.onNodeCollapse = new EventEmitter();
        this.selectionSource = new Subject();
        this.selectionSource$ = this.selectionSource.asObservable();
    }
    get selection() {
        return this._selection;
    }
    set selection(val) {
        this._selection = val;
        if (this.initialized)
            this.selectionSource.next();
    }
    get root() {
        return this.value && this.value.length ? this.value[0] : null;
    }
    ngAfterContentInit() {
        if (this.templates.length) {
            this.templateMap = {};
        }
        this.templates.forEach((item) => {
            this.templateMap[item.getType()] = item.template;
        });
        this.initialized = true;
    }
    getTemplateForNode(node) {
        if (this.templateMap)
            return node.type ? this.templateMap[node.type] : this.templateMap['default'];
        else
            return null;
    }
    onNodeClick(event, node) {
        let eventTarget = event.target;
        if (eventTarget.className && (eventTarget.className.indexOf('p-node-toggler') !== -1 || eventTarget.className.indexOf('p-node-toggler-icon') !== -1)) {
            return;
        }
        else if (this.selectionMode) {
            if (node.selectable === false) {
                return;
            }
            let index = this.findIndexInSelection(node);
            let selected = (index >= 0);
            if (this.selectionMode === 'single') {
                if (selected) {
                    this.selection = null;
                    this.onNodeUnselect.emit({ originalEvent: event, node: node });
                }
                else {
                    this.selection = node;
                    this.onNodeSelect.emit({ originalEvent: event, node: node });
                }
            }
            else if (this.selectionMode === 'multiple') {
                if (selected) {
                    this.selection = this.selection.filter((val, i) => i != index);
                    this.onNodeUnselect.emit({ originalEvent: event, node: node });
                }
                else {
                    this.selection = [...this.selection || [], node];
                    this.onNodeSelect.emit({ originalEvent: event, node: node });
                }
            }
            this.selectionChange.emit(this.selection);
            this.selectionSource.next();
        }
    }
    findIndexInSelection(node) {
        let index = -1;
        if (this.selectionMode && this.selection) {
            if (this.selectionMode === 'single') {
                index = (this.selection == node) ? 0 : -1;
            }
            else if (this.selectionMode === 'multiple') {
                for (let i = 0; i < this.selection.length; i++) {
                    if (this.selection[i] == node) {
                        index = i;
                        break;
                    }
                }
            }
        }
        return index;
    }
    isSelected(node) {
        return this.findIndexInSelection(node) != -1;
    }
}
OrganizationChart.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.0.4", ngImport: i0, type: OrganizationChart, deps: [{ token: i0.ElementRef }, { token: i0.ChangeDetectorRef }], target: i0.ɵɵFactoryTarget.Component });
OrganizationChart.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.0.4", type: OrganizationChart, selector: "p-organizationChart", inputs: { value: "value", style: "style", styleClass: "styleClass", selectionMode: "selectionMode", preserveSpace: "preserveSpace", selection: "selection" }, outputs: { selectionChange: "selectionChange", onNodeSelect: "onNodeSelect", onNodeUnselect: "onNodeUnselect", onNodeExpand: "onNodeExpand", onNodeCollapse: "onNodeCollapse" }, queries: [{ propertyName: "templates", predicate: PrimeTemplate }], ngImport: i0, template: `
        <div [ngStyle]="style" [class]="styleClass" [ngClass]="{'p-organizationchart p-component': true, 'p-organizationchart-preservespace': preserveSpace}">
            <table class="p-organizationchart-table" pOrganizationChartNode [node]="root" *ngIf="root"></table>
        </div>
    `, isInline: true, components: [{ type: OrganizationChartNode, selector: "[pOrganizationChartNode]", inputs: ["node", "root", "first", "last"] }], directives: [{ type: i1.NgStyle, selector: "[ngStyle]", inputs: ["ngStyle"] }, { type: i1.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { type: i1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.0.4", ngImport: i0, type: OrganizationChart, decorators: [{
            type: Component,
            args: [{
                    selector: 'p-organizationChart',
                    template: `
        <div [ngStyle]="style" [class]="styleClass" [ngClass]="{'p-organizationchart p-component': true, 'p-organizationchart-preservespace': preserveSpace}">
            <table class="p-organizationchart-table" pOrganizationChartNode [node]="root" *ngIf="root"></table>
        </div>
    `,
                    changeDetection: ChangeDetectionStrategy.OnPush
                }]
        }], ctorParameters: function () { return [{ type: i0.ElementRef }, { type: i0.ChangeDetectorRef }]; }, propDecorators: { value: [{
                type: Input
            }], style: [{
                type: Input
            }], styleClass: [{
                type: Input
            }], selectionMode: [{
                type: Input
            }], preserveSpace: [{
                type: Input
            }], selection: [{
                type: Input
            }], selectionChange: [{
                type: Output
            }], onNodeSelect: [{
                type: Output
            }], onNodeUnselect: [{
                type: Output
            }], onNodeExpand: [{
                type: Output
            }], onNodeCollapse: [{
                type: Output
            }], templates: [{
                type: ContentChildren,
                args: [PrimeTemplate]
            }] } });
export class OrganizationChartModule {
}
OrganizationChartModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.0.4", ngImport: i0, type: OrganizationChartModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
OrganizationChartModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.0.4", ngImport: i0, type: OrganizationChartModule, declarations: [OrganizationChart, OrganizationChartNode], imports: [CommonModule], exports: [OrganizationChart, SharedModule] });
OrganizationChartModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.0.4", ngImport: i0, type: OrganizationChartModule, imports: [[CommonModule], SharedModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.0.4", ngImport: i0, type: OrganizationChartModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule],
                    exports: [OrganizationChart, SharedModule],
                    declarations: [OrganizationChart, OrganizationChartNode]
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3JnYW5pemF0aW9uY2hhcnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvYXBwL2NvbXBvbmVudHMvb3JnYW5pemF0aW9uY2hhcnQvb3JnYW5pemF0aW9uY2hhcnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFDLFFBQVEsRUFBQyxTQUFTLEVBQVksS0FBSyxFQUFDLE1BQU0sRUFBa0IsWUFBWSxFQUN4RSxNQUFNLEVBQUMsVUFBVSxFQUFDLGVBQWUsRUFBVyx1QkFBdUIsRUFBRSxpQkFBaUIsRUFBK0IsTUFBTSxlQUFlLENBQUM7QUFDbkosT0FBTyxFQUFDLE9BQU8sRUFBQyxLQUFLLEVBQUMsS0FBSyxFQUFDLFVBQVUsRUFBQyxPQUFPLEVBQUMsTUFBTSxxQkFBcUIsQ0FBQztBQUMzRSxPQUFPLEVBQUMsWUFBWSxFQUFDLE1BQU0saUJBQWlCLENBQUM7QUFDN0MsT0FBTyxFQUFDLFlBQVksRUFBQyxNQUFNLGFBQWEsQ0FBQztBQUV6QyxPQUFPLEVBQUMsYUFBYSxFQUFDLE1BQU0sYUFBYSxDQUFDO0FBQzFDLE9BQU8sRUFBRSxPQUFPLEVBQWdCLE1BQU0sTUFBTSxDQUFDOzs7QUE2RDdDLE1BQU0sT0FBTyxxQkFBcUI7SUFjOUIsWUFBeUQsS0FBSyxFQUFTLEVBQXFCO1FBQXJCLE9BQUUsR0FBRixFQUFFLENBQW1CO1FBQ3hGLElBQUksQ0FBQyxLQUFLLEdBQUcsS0FBMEIsQ0FBQztRQUN4QyxJQUFJLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsZ0JBQWdCLENBQUMsU0FBUyxDQUFDLEdBQUcsRUFBRTtZQUMzRCxJQUFJLENBQUMsRUFBRSxDQUFDLFlBQVksRUFBRSxDQUFDO1FBQzNCLENBQUMsQ0FBQyxDQUFBO0lBQ04sQ0FBQztJQUVELElBQUksSUFBSTtRQUNKLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLElBQUksS0FBSyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsSUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUM5RixDQUFDO0lBRUQsSUFBSSxPQUFPO1FBQ1AsT0FBTyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxJQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFBLENBQUMsQ0FBQyxJQUFJLENBQUM7SUFDbkcsQ0FBQztJQUVELFdBQVcsQ0FBQyxLQUFZLEVBQUUsSUFBYztRQUNwQyxJQUFJLENBQUMsS0FBSyxDQUFDLFdBQVcsQ0FBQyxLQUFLLEVBQUUsSUFBSSxDQUFDLENBQUE7SUFDdkMsQ0FBQztJQUVELFVBQVUsQ0FBQyxLQUFZLEVBQUUsSUFBYztRQUNuQyxJQUFJLENBQUMsUUFBUSxHQUFHLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQztRQUMvQixJQUFJLElBQUksQ0FBQyxRQUFRO1lBQ2IsSUFBSSxDQUFDLEtBQUssQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLEVBQUMsYUFBYSxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLElBQUksRUFBQyxDQUFDLENBQUM7O1lBRXRFLElBQUksQ0FBQyxLQUFLLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxFQUFDLGFBQWEsRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxJQUFJLEVBQUMsQ0FBQyxDQUFDO1FBRTVFLEtBQUssQ0FBQyxjQUFjLEVBQUUsQ0FBQztJQUMzQixDQUFDO0lBRUQsVUFBVTtRQUNOLE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQzVDLENBQUM7SUFFRCxXQUFXO1FBQ1AsSUFBSSxDQUFDLFlBQVksQ0FBQyxXQUFXLEVBQUUsQ0FBQztJQUNwQyxDQUFDOztrSEFqRFEscUJBQXFCLGtCQWNWLFVBQVUsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxpQkFBaUIsQ0FBQztzR0FkOUMscUJBQXFCLHNJQXpEcEI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7S0F3Q1QsbytCQWlCUSxxQkFBcUIsOGVBaEJsQjtRQUNSLE9BQU8sQ0FBQyxZQUFZLEVBQUU7WUFDbEIsS0FBSyxDQUFDLElBQUksRUFBRSxLQUFLLENBQUMsRUFBQyxPQUFPLEVBQUUsQ0FBQyxFQUFDLENBQUMsQ0FBQztZQUNqQyxVQUFVLENBQUMsV0FBVyxFQUFFO2dCQUN0QixLQUFLLENBQUMsRUFBQyxPQUFPLEVBQUUsQ0FBQyxFQUFDLENBQUM7Z0JBQ25CLE9BQU8sQ0FBQyxHQUFHLENBQUM7YUFDYixDQUFDO1lBQ0YsVUFBVSxDQUFDLFdBQVcsRUFBRTtnQkFDdEIsT0FBTyxDQUFDLEdBQUcsRUFBRSxLQUFLLENBQUMsRUFBQyxPQUFPLEVBQUMsQ0FBQyxFQUFDLENBQUMsQ0FBQzthQUNqQyxDQUFDO1NBQ0osQ0FBQztLQUNMOzJGQUtRLHFCQUFxQjtrQkEzRGpDLFNBQVM7bUJBQUM7b0JBQ1AsUUFBUSxFQUFFLDBCQUEwQjtvQkFDcEMsUUFBUSxFQUFFOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0tBd0NUO29CQUNELFVBQVUsRUFBRTt3QkFDUixPQUFPLENBQUMsWUFBWSxFQUFFOzRCQUNsQixLQUFLLENBQUMsSUFBSSxFQUFFLEtBQUssQ0FBQyxFQUFDLE9BQU8sRUFBRSxDQUFDLEVBQUMsQ0FBQyxDQUFDOzRCQUNqQyxVQUFVLENBQUMsV0FBVyxFQUFFO2dDQUN0QixLQUFLLENBQUMsRUFBQyxPQUFPLEVBQUUsQ0FBQyxFQUFDLENBQUM7Z0NBQ25CLE9BQU8sQ0FBQyxHQUFHLENBQUM7NkJBQ2IsQ0FBQzs0QkFDRixVQUFVLENBQUMsV0FBVyxFQUFFO2dDQUN0QixPQUFPLENBQUMsR0FBRyxFQUFFLEtBQUssQ0FBQyxFQUFDLE9BQU8sRUFBQyxDQUFDLEVBQUMsQ0FBQyxDQUFDOzZCQUNqQyxDQUFDO3lCQUNKLENBQUM7cUJBQ0w7b0JBQ0QsYUFBYSxFQUFFLGlCQUFpQixDQUFDLElBQUk7b0JBQ3JDLGVBQWUsRUFBRSx1QkFBdUIsQ0FBQyxNQUFNO29CQUMvQyxTQUFTLEVBQUUsQ0FBQyx5QkFBeUIsQ0FBQztpQkFDekM7OzBCQWVnQixNQUFNOzJCQUFDLFVBQVUsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxpQkFBaUIsQ0FBQzs0RUFaOUMsSUFBSTtzQkFBWixLQUFLO2dCQUVHLElBQUk7c0JBQVosS0FBSztnQkFFRyxLQUFLO3NCQUFiLEtBQUs7Z0JBRUcsSUFBSTtzQkFBWixLQUFLOztBQXFEVixNQUFNLE9BQU8saUJBQWlCO0lBNkMxQixZQUFtQixFQUFjLEVBQVMsRUFBb0I7UUFBM0MsT0FBRSxHQUFGLEVBQUUsQ0FBWTtRQUFTLE9BQUUsR0FBRixFQUFFLENBQWtCO1FBbkNyRCxrQkFBYSxHQUFZLElBQUksQ0FBQztRQWE3QixvQkFBZSxHQUFzQixJQUFJLFlBQVksRUFBRSxDQUFDO1FBRXhELGlCQUFZLEdBQXNCLElBQUksWUFBWSxFQUFFLENBQUM7UUFFckQsbUJBQWMsR0FBc0IsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQUV2RCxpQkFBWSxHQUFzQixJQUFJLFlBQVksRUFBRSxDQUFDO1FBRXJELG1CQUFjLEdBQXNCLElBQUksWUFBWSxFQUFFLENBQUM7UUFNekQsb0JBQWUsR0FBRyxJQUFJLE9BQU8sRUFBTyxDQUFDO1FBTTdDLHFCQUFnQixHQUFHLElBQUksQ0FBQyxlQUFlLENBQUMsWUFBWSxFQUFFLENBQUM7SUFFVSxDQUFDO0lBakNsRSxJQUFjLFNBQVM7UUFDbkIsT0FBTyxJQUFJLENBQUMsVUFBVSxDQUFDO0lBQzNCLENBQUM7SUFFRCxJQUFJLFNBQVMsQ0FBQyxHQUFPO1FBQ2pCLElBQUksQ0FBQyxVQUFVLEdBQUcsR0FBRyxDQUFDO1FBRXRCLElBQUksSUFBSSxDQUFDLFdBQVc7WUFDaEIsSUFBSSxDQUFDLGVBQWUsQ0FBQyxJQUFJLEVBQUUsQ0FBQztJQUNwQyxDQUFDO0lBMEJELElBQUksSUFBSTtRQUNKLE9BQU8sSUFBSSxDQUFDLEtBQUssSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDO0lBQ2xFLENBQUM7SUFFRCxrQkFBa0I7UUFDZCxJQUFJLElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxFQUFFO1lBQ3ZCLElBQUksQ0FBQyxXQUFXLEdBQUcsRUFBRSxDQUFDO1NBQ3pCO1FBRUQsSUFBSSxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxJQUFJLEVBQUUsRUFBRTtZQUM1QixJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQyxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUM7UUFDckQsQ0FBQyxDQUFDLENBQUM7UUFFSCxJQUFJLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQztJQUM1QixDQUFDO0lBRUQsa0JBQWtCLENBQUMsSUFBYztRQUM3QixJQUFJLElBQUksQ0FBQyxXQUFXO1lBQ2hCLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsU0FBUyxDQUFDLENBQUM7O1lBRTdFLE9BQU8sSUFBSSxDQUFDO0lBQ3BCLENBQUM7SUFFRCxXQUFXLENBQUMsS0FBWSxFQUFFLElBQWM7UUFDcEMsSUFBSSxXQUFXLEdBQWMsS0FBSyxDQUFDLE1BQU8sQ0FBQztRQUUzQyxJQUFJLFdBQVcsQ0FBQyxTQUFTLElBQUksQ0FBQyxXQUFXLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxnQkFBZ0IsQ0FBQyxLQUFLLENBQUMsQ0FBQyxJQUFJLFdBQVcsQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLHFCQUFxQixDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsRUFBRTtZQUNsSixPQUFPO1NBQ1Y7YUFDSSxJQUFJLElBQUksQ0FBQyxhQUFhLEVBQUU7WUFDekIsSUFBSSxJQUFJLENBQUMsVUFBVSxLQUFLLEtBQUssRUFBRTtnQkFDM0IsT0FBTzthQUNWO1lBRUQsSUFBSSxLQUFLLEdBQUcsSUFBSSxDQUFDLG9CQUFvQixDQUFDLElBQUksQ0FBQyxDQUFDO1lBQzVDLElBQUksUUFBUSxHQUFHLENBQUMsS0FBSyxJQUFJLENBQUMsQ0FBQyxDQUFDO1lBRTVCLElBQUksSUFBSSxDQUFDLGFBQWEsS0FBSyxRQUFRLEVBQUU7Z0JBQ2pDLElBQUksUUFBUSxFQUFFO29CQUNWLElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDO29CQUN0QixJQUFJLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxFQUFDLGFBQWEsRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBQyxDQUFDLENBQUM7aUJBQ2hFO3FCQUNJO29CQUNELElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDO29CQUN0QixJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxFQUFDLGFBQWEsRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBQyxDQUFDLENBQUM7aUJBQzlEO2FBQ0o7aUJBQ0ksSUFBSSxJQUFJLENBQUMsYUFBYSxLQUFLLFVBQVUsRUFBRTtnQkFDeEMsSUFBSSxRQUFRLEVBQUU7b0JBQ1YsSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxDQUFDLEdBQUcsRUFBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUMsSUFBRSxLQUFLLENBQUMsQ0FBQztvQkFDNUQsSUFBSSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsRUFBQyxhQUFhLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUMsQ0FBQyxDQUFDO2lCQUNoRTtxQkFDSTtvQkFDRCxJQUFJLENBQUMsU0FBUyxHQUFHLENBQUMsR0FBRyxJQUFJLENBQUMsU0FBUyxJQUFFLEVBQUUsRUFBQyxJQUFJLENBQUMsQ0FBQztvQkFDOUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsRUFBQyxhQUFhLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUMsQ0FBQyxDQUFDO2lCQUM5RDthQUNKO1lBRUQsSUFBSSxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1lBQzFDLElBQUksQ0FBQyxlQUFlLENBQUMsSUFBSSxFQUFFLENBQUM7U0FDL0I7SUFDTCxDQUFDO0lBRUQsb0JBQW9CLENBQUMsSUFBYztRQUMvQixJQUFJLEtBQUssR0FBVyxDQUFDLENBQUMsQ0FBQztRQUV2QixJQUFJLElBQUksQ0FBQyxhQUFhLElBQUksSUFBSSxDQUFDLFNBQVMsRUFBRTtZQUN0QyxJQUFJLElBQUksQ0FBQyxhQUFhLEtBQUssUUFBUSxFQUFFO2dCQUNqQyxLQUFLLEdBQUcsQ0FBQyxJQUFJLENBQUMsU0FBUyxJQUFJLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUUsQ0FBQyxDQUFDO2FBQzlDO2lCQUNJLElBQUksSUFBSSxDQUFDLGFBQWEsS0FBSyxVQUFVLEVBQUU7Z0JBQ3hDLEtBQUksSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBSSxJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRTtvQkFDNUMsSUFBSSxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxJQUFJLElBQUksRUFBRTt3QkFDM0IsS0FBSyxHQUFHLENBQUMsQ0FBQzt3QkFDVixNQUFNO3FCQUNUO2lCQUNKO2FBQ0o7U0FDSjtRQUVELE9BQU8sS0FBSyxDQUFDO0lBQ2pCLENBQUM7SUFFRCxVQUFVLENBQUMsSUFBYztRQUNyQixPQUFPLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztJQUNqRCxDQUFDOzs4R0FwSVEsaUJBQWlCO2tHQUFqQixpQkFBaUIsb2FBaUNULGFBQWEsNkJBeENwQjs7OztLQUlULHVDQTFEUSxxQkFBcUI7MkZBNkRyQixpQkFBaUI7a0JBVDdCLFNBQVM7bUJBQUM7b0JBQ1AsUUFBUSxFQUFFLHFCQUFxQjtvQkFDL0IsUUFBUSxFQUFFOzs7O0tBSVQ7b0JBQ0YsZUFBZSxFQUFFLHVCQUF1QixDQUFDLE1BQU07aUJBQ2pEO2lJQUdZLEtBQUs7c0JBQWIsS0FBSztnQkFFRyxLQUFLO3NCQUFiLEtBQUs7Z0JBRUcsVUFBVTtzQkFBbEIsS0FBSztnQkFFRyxhQUFhO3NCQUFyQixLQUFLO2dCQUVHLGFBQWE7c0JBQXJCLEtBQUs7Z0JBRVEsU0FBUztzQkFBdEIsS0FBSztnQkFXSSxlQUFlO3NCQUF4QixNQUFNO2dCQUVHLFlBQVk7c0JBQXJCLE1BQU07Z0JBRUcsY0FBYztzQkFBdkIsTUFBTTtnQkFFRyxZQUFZO3NCQUFyQixNQUFNO2dCQUVHLGNBQWM7c0JBQXZCLE1BQU07Z0JBRXlCLFNBQVM7c0JBQXhDLGVBQWU7dUJBQUMsYUFBYTs7QUEyR2xDLE1BQU0sT0FBTyx1QkFBdUI7O29IQUF2Qix1QkFBdUI7cUhBQXZCLHVCQUF1QixpQkE1SXZCLGlCQUFpQixFQTdEakIscUJBQXFCLGFBcU1wQixZQUFZLGFBeEliLGlCQUFpQixFQXlJRSxZQUFZO3FIQUcvQix1QkFBdUIsWUFKdkIsQ0FBQyxZQUFZLENBQUMsRUFDSyxZQUFZOzJGQUcvQix1QkFBdUI7a0JBTG5DLFFBQVE7bUJBQUM7b0JBQ04sT0FBTyxFQUFFLENBQUMsWUFBWSxDQUFDO29CQUN2QixPQUFPLEVBQUUsQ0FBQyxpQkFBaUIsRUFBQyxZQUFZLENBQUM7b0JBQ3pDLFlBQVksRUFBRSxDQUFDLGlCQUFpQixFQUFDLHFCQUFxQixDQUFDO2lCQUMxRCIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7TmdNb2R1bGUsQ29tcG9uZW50LEVsZW1lbnRSZWYsSW5wdXQsT3V0cHV0LEFmdGVyQ29udGVudEluaXQsRXZlbnRFbWl0dGVyLFRlbXBsYXRlUmVmLFxuICAgICAgICBJbmplY3QsZm9yd2FyZFJlZixDb250ZW50Q2hpbGRyZW4sUXVlcnlMaXN0LENoYW5nZURldGVjdGlvblN0cmF0ZWd5LCBWaWV3RW5jYXBzdWxhdGlvbiwgQ2hhbmdlRGV0ZWN0b3JSZWYsIE9uRGVzdHJveX0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge3RyaWdnZXIsc3RhdGUsc3R5bGUsdHJhbnNpdGlvbixhbmltYXRlfSBmcm9tICdAYW5ndWxhci9hbmltYXRpb25zJztcbmltcG9ydCB7Q29tbW9uTW9kdWxlfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHtTaGFyZWRNb2R1bGV9IGZyb20gJ3ByaW1lbmcvYXBpJztcbmltcG9ydCB7VHJlZU5vZGV9IGZyb20gJ3ByaW1lbmcvYXBpJztcbmltcG9ydCB7UHJpbWVUZW1wbGF0ZX0gZnJvbSAncHJpbWVuZy9hcGknO1xuaW1wb3J0IHsgU3ViamVjdCwgU3Vic2NyaXB0aW9uIH0gZnJvbSAncnhqcyc7XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAnW3BPcmdhbml6YXRpb25DaGFydE5vZGVdJyxcbiAgICB0ZW1wbGF0ZTogYFxuICAgICAgICA8dGJvZHkgKm5nSWY9XCJub2RlXCI+XG4gICAgICAgICAgICA8dHI+XG4gICAgICAgICAgICAgICAgPHRkIFthdHRyLmNvbHNwYW5dPVwiY29sc3BhblwiPlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IFtjbGFzc109XCJub2RlLnN0eWxlQ2xhc3NcIiBbbmdDbGFzc109XCJ7J3Atb3JnYW5pemF0aW9uY2hhcnQtbm9kZS1jb250ZW50JzogdHJ1ZSwgJ3Atb3JnYW5pemF0aW9uY2hhcnQtc2VsZWN0YWJsZS1ub2RlJzogY2hhcnQuc2VsZWN0aW9uTW9kZSAmJiBub2RlLnNlbGVjdGFibGUgIT09IGZhbHNlLCdwLWhpZ2hsaWdodCc6aXNTZWxlY3RlZCgpfVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAoY2xpY2spPVwib25Ob2RlQ2xpY2soJGV2ZW50LG5vZGUpXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2ICpuZ0lmPVwiIWNoYXJ0LmdldFRlbXBsYXRlRm9yTm9kZShub2RlKVwiPnt7bm9kZS5sYWJlbH19PC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2ICpuZ0lmPVwiY2hhcnQuZ2V0VGVtcGxhdGVGb3JOb2RlKG5vZGUpXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdUZW1wbGF0ZU91dGxldD1cImNoYXJ0LmdldFRlbXBsYXRlRm9yTm9kZShub2RlKTsgY29udGV4dDogeyRpbXBsaWNpdDogbm9kZX1cIj48L25nLWNvbnRhaW5lcj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgPGEgKm5nSWY9XCIhbGVhZlwiIHRhYmluZGV4PVwiMFwiIGNsYXNzPVwicC1ub2RlLXRvZ2dsZXJcIiAoY2xpY2spPVwidG9nZ2xlTm9kZSgkZXZlbnQsIG5vZGUpXCIgKGtleWRvd24uZW50ZXIpPVwidG9nZ2xlTm9kZSgkZXZlbnQsIG5vZGUpXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGkgY2xhc3M9XCJwLW5vZGUtdG9nZ2xlci1pY29uIHBpXCIgW25nQ2xhc3NdPVwieydwaS1jaGV2cm9uLWRvd24nOiBub2RlLmV4cGFuZGVkLCAncGktY2hldnJvbi11cCc6ICFub2RlLmV4cGFuZGVkfVwiPjwvaT5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvYT5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPC90ZD5cbiAgICAgICAgICAgIDwvdHI+XG4gICAgICAgICAgICA8dHIgW25nQ2xhc3NdPVwiIWxlYWYmJm5vZGUuZXhwYW5kZWQgPyAncC1vcmdhbml6YXRpb25jaGFydC1ub2RlLXZpc2libGUnIDogJ3Atb3JnYW5pemF0aW9uY2hhcnQtbm9kZS1oaWRkZW4nXCIgY2xhc3M9XCJwLW9yZ2FuaXphdGlvbmNoYXJ0LWxpbmVzXCIgW0BjaGlsZFN0YXRlXT1cIidpbidcIj5cbiAgICAgICAgICAgICAgICA8dGQgW2F0dHIuY29sc3Bhbl09XCJjb2xzcGFuXCI+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJwLW9yZ2FuaXphdGlvbmNoYXJ0LWxpbmUtZG93blwiPjwvZGl2PlxuICAgICAgICAgICAgICAgIDwvdGQ+XG4gICAgICAgICAgICA8L3RyPlxuICAgICAgICAgICAgPHRyIFtuZ0NsYXNzXT1cIiFsZWFmJiZub2RlLmV4cGFuZGVkID8gJ3Atb3JnYW5pemF0aW9uY2hhcnQtbm9kZS12aXNpYmxlJyA6ICdwLW9yZ2FuaXphdGlvbmNoYXJ0LW5vZGUtaGlkZGVuJ1wiIGNsYXNzPVwicC1vcmdhbml6YXRpb25jaGFydC1saW5lc1wiIFtAY2hpbGRTdGF0ZV09XCInaW4nXCI+XG4gICAgICAgICAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdJZj1cIm5vZGUuY2hpbGRyZW4gJiYgbm9kZS5jaGlsZHJlbi5sZW5ndGggPT09IDFcIj5cbiAgICAgICAgICAgICAgICAgICAgPHRkIFthdHRyLmNvbHNwYW5dPVwiY29sc3BhblwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInAtb3JnYW5pemF0aW9uY2hhcnQtbGluZS1kb3duXCI+PC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIDwvdGQ+XG4gICAgICAgICAgICAgICAgPC9uZy1jb250YWluZXI+XG4gICAgICAgICAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdJZj1cIm5vZGUuY2hpbGRyZW4gJiYgbm9kZS5jaGlsZHJlbi5sZW5ndGggPiAxXCI+XG4gICAgICAgICAgICAgICAgICAgIDxuZy10ZW1wbGF0ZSBuZ0ZvciBsZXQtY2hpbGQgW25nRm9yT2ZdPVwibm9kZS5jaGlsZHJlblwiIGxldC1maXJzdD1cImZpcnN0XCIgbGV0LWxhc3Q9XCJsYXN0XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8dGQgY2xhc3M9XCJwLW9yZ2FuaXphdGlvbmNoYXJ0LWxpbmUtbGVmdFwiIFtuZ0NsYXNzXT1cInsncC1vcmdhbml6YXRpb25jaGFydC1saW5lLXRvcCc6IWZpcnN0fVwiPiZuYnNwOzwvdGQ+XG4gICAgICAgICAgICAgICAgICAgICAgICA8dGQgY2xhc3M9XCJwLW9yZ2FuaXphdGlvbmNoYXJ0LWxpbmUtcmlnaHRcIiBbbmdDbGFzc109XCJ7J3Atb3JnYW5pemF0aW9uY2hhcnQtbGluZS10b3AnOiFsYXN0fVwiPiZuYnNwOzwvdGQ+XG4gICAgICAgICAgICAgICAgICAgIDwvbmctdGVtcGxhdGU+XG4gICAgICAgICAgICAgICAgPC9uZy1jb250YWluZXI+XG4gICAgICAgICAgICA8L3RyPlxuICAgICAgICAgICAgPHRyIFtuZ0NsYXNzXT1cIiFsZWFmJiZub2RlLmV4cGFuZGVkID8gJ3Atb3JnYW5pemF0aW9uY2hhcnQtbm9kZS12aXNpYmxlJyA6ICdwLW9yZ2FuaXphdGlvbmNoYXJ0LW5vZGUtaGlkZGVuJ1wiIGNsYXNzPVwicC1vcmdhbml6YXRpb25jaGFydC1ub2Rlc1wiIFtAY2hpbGRTdGF0ZV09XCInaW4nXCI+XG4gICAgICAgICAgICAgICAgPHRkICpuZ0Zvcj1cImxldCBjaGlsZCBvZiBub2RlLmNoaWxkcmVuXCIgY29sc3Bhbj1cIjJcIj5cbiAgICAgICAgICAgICAgICAgICAgPHRhYmxlIGNsYXNzPVwicC1vcmdhbml6YXRpb25jaGFydC10YWJsZVwiIHBPcmdhbml6YXRpb25DaGFydE5vZGUgW25vZGVdPVwiY2hpbGRcIj48L3RhYmxlPlxuICAgICAgICAgICAgICAgIDwvdGQ+XG4gICAgICAgICAgICA8L3RyPlxuICAgICAgICA8L3Rib2R5PlxuICAgIGAsXG4gICAgYW5pbWF0aW9uczogW1xuICAgICAgICB0cmlnZ2VyKCdjaGlsZFN0YXRlJywgW1xuICAgICAgICAgICAgc3RhdGUoJ2luJywgc3R5bGUoe29wYWNpdHk6IDF9KSksXG4gICAgICAgICAgIHRyYW5zaXRpb24oJ3ZvaWQgPT4gKicsIFtcbiAgICAgICAgICAgICBzdHlsZSh7b3BhY2l0eTogMH0pLFxuICAgICAgICAgICAgIGFuaW1hdGUoMTUwKVxuICAgICAgICAgICBdKSxcbiAgICAgICAgICAgdHJhbnNpdGlvbignKiA9PiB2b2lkJywgW1xuICAgICAgICAgICAgIGFuaW1hdGUoMTUwLCBzdHlsZSh7b3BhY2l0eTowfSkpXG4gICAgICAgICAgIF0pXG4gICAgICAgIF0pXG4gICAgXSxcbiAgICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lLFxuICAgIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxuICAgIHN0eWxlVXJsczogWycuL29yZ2FuaXphdGlvbmNoYXJ0LmNzcyddXG59KVxuZXhwb3J0IGNsYXNzIE9yZ2FuaXphdGlvbkNoYXJ0Tm9kZSBpbXBsZW1lbnRzIE9uRGVzdHJveXtcblxuICAgIEBJbnB1dCgpIG5vZGU6IFRyZWVOb2RlO1xuICAgICAgICBcbiAgICBASW5wdXQoKSByb290OiBib29sZWFuO1xuICAgIFxuICAgIEBJbnB1dCgpIGZpcnN0OiBib29sZWFuO1xuICAgIFxuICAgIEBJbnB1dCgpIGxhc3Q6IGJvb2xlYW47XG5cbiAgICBjaGFydDogT3JnYW5pemF0aW9uQ2hhcnQ7XG5cbiAgICBzdWJzY3JpcHRpb246IFN1YnNjcmlwdGlvbjtcbiAgICAgICAgXG4gICAgY29uc3RydWN0b3IoQEluamVjdChmb3J3YXJkUmVmKCgpID0+IE9yZ2FuaXphdGlvbkNoYXJ0KSkgY2hhcnQsIHB1YmxpYyBjZDogQ2hhbmdlRGV0ZWN0b3JSZWYpIHtcbiAgICAgICAgdGhpcy5jaGFydCA9IGNoYXJ0IGFzIE9yZ2FuaXphdGlvbkNoYXJ0O1xuICAgICAgICB0aGlzLnN1YnNjcmlwdGlvbiA9IHRoaXMuY2hhcnQuc2VsZWN0aW9uU291cmNlJC5zdWJzY3JpYmUoKCkgPT57XG4gICAgICAgICAgICB0aGlzLmNkLm1hcmtGb3JDaGVjaygpO1xuICAgICAgICB9KVxuICAgIH1cbiAgICAgICAgICAgICAgICBcbiAgICBnZXQgbGVhZigpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIHRoaXMubm9kZS5sZWFmID09IGZhbHNlID8gZmFsc2UgOiAhKHRoaXMubm9kZS5jaGlsZHJlbiYmdGhpcy5ub2RlLmNoaWxkcmVuLmxlbmd0aCk7XG4gICAgfVxuICAgIFxuICAgIGdldCBjb2xzcGFuKCkge1xuICAgICAgICByZXR1cm4gKHRoaXMubm9kZS5jaGlsZHJlbiAmJiB0aGlzLm5vZGUuY2hpbGRyZW4ubGVuZ3RoKSA/IHRoaXMubm9kZS5jaGlsZHJlbi5sZW5ndGggKiAyOiBudWxsO1xuICAgIH1cbiAgICBcbiAgICBvbk5vZGVDbGljayhldmVudDogRXZlbnQsIG5vZGU6IFRyZWVOb2RlKSB7XG4gICAgICAgIHRoaXMuY2hhcnQub25Ob2RlQ2xpY2soZXZlbnQsIG5vZGUpXG4gICAgfVxuICAgIFxuICAgIHRvZ2dsZU5vZGUoZXZlbnQ6IEV2ZW50LCBub2RlOiBUcmVlTm9kZSkge1xuICAgICAgICBub2RlLmV4cGFuZGVkID0gIW5vZGUuZXhwYW5kZWQ7XG4gICAgICAgIGlmIChub2RlLmV4cGFuZGVkKVxuICAgICAgICAgICAgdGhpcy5jaGFydC5vbk5vZGVFeHBhbmQuZW1pdCh7b3JpZ2luYWxFdmVudDogZXZlbnQsIG5vZGU6IHRoaXMubm9kZX0pO1xuICAgICAgICBlbHNlXG4gICAgICAgICAgICB0aGlzLmNoYXJ0Lm9uTm9kZUNvbGxhcHNlLmVtaXQoe29yaWdpbmFsRXZlbnQ6IGV2ZW50LCBub2RlOiB0aGlzLm5vZGV9KTtcbiAgICAgICAgICAgIFxuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIH1cbiAgICBcbiAgICBpc1NlbGVjdGVkKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5jaGFydC5pc1NlbGVjdGVkKHRoaXMubm9kZSk7XG4gICAgfVxuXG4gICAgbmdPbkRlc3Ryb3koKSB7XG4gICAgICAgIHRoaXMuc3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XG4gICAgfVxufVxuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ3Atb3JnYW5pemF0aW9uQ2hhcnQnLFxuICAgIHRlbXBsYXRlOiBgXG4gICAgICAgIDxkaXYgW25nU3R5bGVdPVwic3R5bGVcIiBbY2xhc3NdPVwic3R5bGVDbGFzc1wiIFtuZ0NsYXNzXT1cInsncC1vcmdhbml6YXRpb25jaGFydCBwLWNvbXBvbmVudCc6IHRydWUsICdwLW9yZ2FuaXphdGlvbmNoYXJ0LXByZXNlcnZlc3BhY2UnOiBwcmVzZXJ2ZVNwYWNlfVwiPlxuICAgICAgICAgICAgPHRhYmxlIGNsYXNzPVwicC1vcmdhbml6YXRpb25jaGFydC10YWJsZVwiIHBPcmdhbml6YXRpb25DaGFydE5vZGUgW25vZGVdPVwicm9vdFwiICpuZ0lmPVwicm9vdFwiPjwvdGFibGU+XG4gICAgICAgIDwvZGl2PlxuICAgIGAsXG4gICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaFxufSlcbmV4cG9ydCBjbGFzcyBPcmdhbml6YXRpb25DaGFydCBpbXBsZW1lbnRzIEFmdGVyQ29udGVudEluaXQge1xuICAgICAgICAgICAgXG4gICAgQElucHV0KCkgdmFsdWU6IFRyZWVOb2RlW107ICAgICAgICAgICAgXG5cbiAgICBASW5wdXQoKSBzdHlsZTogYW55O1xuXG4gICAgQElucHV0KCkgc3R5bGVDbGFzczogc3RyaW5nO1xuICAgIFxuICAgIEBJbnB1dCgpIHNlbGVjdGlvbk1vZGU6IHN0cmluZztcbiAgICBcbiAgICBASW5wdXQoKSBwcmVzZXJ2ZVNwYWNlOiBib29sZWFuID0gdHJ1ZTtcbiAgICBcbiAgICBASW5wdXQoKSAgZ2V0IHNlbGVjdGlvbigpOiBhbnkge1xuICAgICAgICByZXR1cm4gdGhpcy5fc2VsZWN0aW9uO1xuICAgIH1cblxuICAgIHNldCBzZWxlY3Rpb24odmFsOmFueSkge1xuICAgICAgICB0aGlzLl9zZWxlY3Rpb24gPSB2YWw7XG4gICAgICAgIFxuICAgICAgICBpZiAodGhpcy5pbml0aWFsaXplZClcbiAgICAgICAgICAgIHRoaXMuc2VsZWN0aW9uU291cmNlLm5leHQoKTtcbiAgICB9XG5cbiAgICBAT3V0cHV0KCkgc2VsZWN0aW9uQ2hhbmdlOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgICBcbiAgICBAT3V0cHV0KCkgb25Ob2RlU2VsZWN0OiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgICBcbiAgICBAT3V0cHV0KCkgb25Ob2RlVW5zZWxlY3Q6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG4gICAgQE91dHB1dCgpIG9uTm9kZUV4cGFuZDogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgICBAT3V0cHV0KCkgb25Ob2RlQ29sbGFwc2U6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICAgIFxuICAgIEBDb250ZW50Q2hpbGRyZW4oUHJpbWVUZW1wbGF0ZSkgdGVtcGxhdGVzOiBRdWVyeUxpc3Q8YW55PjtcbiAgICBcbiAgICBwdWJsaWMgdGVtcGxhdGVNYXA6IGFueTtcblxuICAgIHByaXZhdGUgc2VsZWN0aW9uU291cmNlID0gbmV3IFN1YmplY3Q8YW55PigpO1xuXG4gICAgX3NlbGVjdGlvbjogYW55O1xuXG4gICAgaW5pdGlhbGl6ZWQ6IGJvb2xlYW47XG5cbiAgICBzZWxlY3Rpb25Tb3VyY2UkID0gdGhpcy5zZWxlY3Rpb25Tb3VyY2UuYXNPYnNlcnZhYmxlKCk7XG4gICAgXG4gICAgY29uc3RydWN0b3IocHVibGljIGVsOiBFbGVtZW50UmVmLCBwdWJsaWMgY2Q6Q2hhbmdlRGV0ZWN0b3JSZWYpIHt9XG4gICAgXG4gICAgZ2V0IHJvb3QoKTogVHJlZU5vZGUge1xuICAgICAgICByZXR1cm4gdGhpcy52YWx1ZSAmJiB0aGlzLnZhbHVlLmxlbmd0aCA/IHRoaXMudmFsdWVbMF0gOiBudWxsO1xuICAgIH1cbiAgICBcbiAgICBuZ0FmdGVyQ29udGVudEluaXQoKSB7XG4gICAgICAgIGlmICh0aGlzLnRlbXBsYXRlcy5sZW5ndGgpIHtcbiAgICAgICAgICAgIHRoaXMudGVtcGxhdGVNYXAgPSB7fTtcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgdGhpcy50ZW1wbGF0ZXMuZm9yRWFjaCgoaXRlbSkgPT4ge1xuICAgICAgICAgICAgdGhpcy50ZW1wbGF0ZU1hcFtpdGVtLmdldFR5cGUoKV0gPSBpdGVtLnRlbXBsYXRlO1xuICAgICAgICB9KTtcblxuICAgICAgICB0aGlzLmluaXRpYWxpemVkID0gdHJ1ZTtcbiAgICB9XG4gICAgXG4gICAgZ2V0VGVtcGxhdGVGb3JOb2RlKG5vZGU6IFRyZWVOb2RlKTogVGVtcGxhdGVSZWY8YW55PiB7XG4gICAgICAgIGlmICh0aGlzLnRlbXBsYXRlTWFwKVxuICAgICAgICAgICAgcmV0dXJuIG5vZGUudHlwZSA/IHRoaXMudGVtcGxhdGVNYXBbbm9kZS50eXBlXSA6IHRoaXMudGVtcGxhdGVNYXBbJ2RlZmF1bHQnXTtcbiAgICAgICAgZWxzZVxuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICAgIFxuICAgIG9uTm9kZUNsaWNrKGV2ZW50OiBFdmVudCwgbm9kZTogVHJlZU5vZGUpIHtcbiAgICAgICAgbGV0IGV2ZW50VGFyZ2V0ID0gKDxFbGVtZW50PiBldmVudC50YXJnZXQpO1xuICAgICAgICBcbiAgICAgICAgaWYgKGV2ZW50VGFyZ2V0LmNsYXNzTmFtZSAmJiAoZXZlbnRUYXJnZXQuY2xhc3NOYW1lLmluZGV4T2YoJ3Atbm9kZS10b2dnbGVyJykgIT09IC0xIHx8wqBldmVudFRhcmdldC5jbGFzc05hbWUuaW5kZXhPZigncC1ub2RlLXRvZ2dsZXItaWNvbicpICE9PSAtMSkpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmICh0aGlzLnNlbGVjdGlvbk1vZGUpIHtcbiAgICAgICAgICAgIGlmIChub2RlLnNlbGVjdGFibGUgPT09IGZhbHNlKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgXG4gICAgICAgICAgICBsZXQgaW5kZXggPSB0aGlzLmZpbmRJbmRleEluU2VsZWN0aW9uKG5vZGUpO1xuICAgICAgICAgICAgbGV0IHNlbGVjdGVkID0gKGluZGV4ID49IDApO1xuICAgICAgICAgICAgXG4gICAgICAgICAgICBpZiAodGhpcy5zZWxlY3Rpb25Nb2RlID09PSAnc2luZ2xlJykge1xuICAgICAgICAgICAgICAgIGlmIChzZWxlY3RlZCkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnNlbGVjdGlvbiA9IG51bGw7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMub25Ob2RlVW5zZWxlY3QuZW1pdCh7b3JpZ2luYWxFdmVudDogZXZlbnQsIG5vZGU6IG5vZGV9KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2VsZWN0aW9uID0gbm9kZTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5vbk5vZGVTZWxlY3QuZW1pdCh7b3JpZ2luYWxFdmVudDogZXZlbnQsIG5vZGU6IG5vZGV9KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmICh0aGlzLnNlbGVjdGlvbk1vZGUgPT09ICdtdWx0aXBsZScpIHtcbiAgICAgICAgICAgICAgICBpZiAoc2VsZWN0ZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zZWxlY3Rpb24gPSB0aGlzLnNlbGVjdGlvbi5maWx0ZXIoKHZhbCxpKSA9PiBpIT1pbmRleCk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMub25Ob2RlVW5zZWxlY3QuZW1pdCh7b3JpZ2luYWxFdmVudDogZXZlbnQsIG5vZGU6IG5vZGV9KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2VsZWN0aW9uID0gWy4uLnRoaXMuc2VsZWN0aW9ufHxbXSxub2RlXTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5vbk5vZGVTZWxlY3QuZW1pdCh7b3JpZ2luYWxFdmVudDogZXZlbnQsIG5vZGU6IG5vZGV9KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIHRoaXMuc2VsZWN0aW9uQ2hhbmdlLmVtaXQodGhpcy5zZWxlY3Rpb24pO1xuICAgICAgICAgICAgdGhpcy5zZWxlY3Rpb25Tb3VyY2UubmV4dCgpO1xuICAgICAgICB9XG4gICAgfVxuICAgIFxuICAgIGZpbmRJbmRleEluU2VsZWN0aW9uKG5vZGU6IFRyZWVOb2RlKSB7XG4gICAgICAgIGxldCBpbmRleDogbnVtYmVyID0gLTE7XG5cbiAgICAgICAgaWYgKHRoaXMuc2VsZWN0aW9uTW9kZSAmJiB0aGlzLnNlbGVjdGlvbikge1xuICAgICAgICAgICAgaWYgKHRoaXMuc2VsZWN0aW9uTW9kZSA9PT0gJ3NpbmdsZScpIHtcbiAgICAgICAgICAgICAgICBpbmRleCA9ICh0aGlzLnNlbGVjdGlvbiA9PSBub2RlKSA/IDAgOiAtIDE7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmICh0aGlzLnNlbGVjdGlvbk1vZGUgPT09ICdtdWx0aXBsZScpIHtcbiAgICAgICAgICAgICAgICBmb3IobGV0IGkgPSAwOyBpICA8IHRoaXMuc2VsZWN0aW9uLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLnNlbGVjdGlvbltpXSA9PSBub2RlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpbmRleCA9IGk7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBpbmRleDtcbiAgICB9XG4gICAgXG4gICAgaXNTZWxlY3RlZChub2RlOiBUcmVlTm9kZSkge1xuICAgICAgICByZXR1cm4gdGhpcy5maW5kSW5kZXhJblNlbGVjdGlvbihub2RlKSAhPSAtMTsgICAgICAgICBcbiAgICB9XG59XG5cbkBOZ01vZHVsZSh7XG4gICAgaW1wb3J0czogW0NvbW1vbk1vZHVsZV0sXG4gICAgZXhwb3J0czogW09yZ2FuaXphdGlvbkNoYXJ0LFNoYXJlZE1vZHVsZV0sXG4gICAgZGVjbGFyYXRpb25zOiBbT3JnYW5pemF0aW9uQ2hhcnQsT3JnYW5pemF0aW9uQ2hhcnROb2RlXVxufSlcbmV4cG9ydCBjbGFzcyBPcmdhbml6YXRpb25DaGFydE1vZHVsZSB7IH0iXX0=