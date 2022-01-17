import { NgModule, Component, Input, Output, EventEmitter, ChangeDetectionStrategy, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { RippleModule } from 'primeng/ripple';
import { SharedModule } from 'primeng/api';
import { InputNumberModule } from 'primeng/inputnumber';
import * as i0 from "@angular/core";
import * as i1 from "primeng/dropdown";
import * as i2 from "primeng/inputnumber";
import * as i3 from "@angular/common";
import * as i4 from "primeng/ripple";
import * as i5 from "@angular/forms";
import * as i6 from "primeng/api";
export class Paginator {
    constructor(cd) {
        this.cd = cd;
        this.pageLinkSize = 5;
        this.onPageChange = new EventEmitter();
        this.alwaysShow = true;
        this.dropdownScrollHeight = '200px';
        this.currentPageReportTemplate = '{currentPage} of {totalPages}';
        this.showFirstLastIcon = true;
        this.totalRecords = 0;
        this.rows = 0;
        this.showPageLinks = true;
        this._first = 0;
        this._page = 0;
    }
    ngOnInit() {
        this.updatePaginatorState();
    }
    ngOnChanges(simpleChange) {
        if (simpleChange.totalRecords) {
            this.updatePageLinks();
            this.updatePaginatorState();
            this.updateFirst();
            this.updateRowsPerPageOptions();
        }
        if (simpleChange.first) {
            this._first = simpleChange.first.currentValue;
            this.updatePageLinks();
            this.updatePaginatorState();
        }
        if (simpleChange.rows) {
            this.updatePageLinks();
            this.updatePaginatorState();
        }
        if (simpleChange.rowsPerPageOptions) {
            this.updateRowsPerPageOptions();
        }
    }
    get first() {
        return this._first;
    }
    set first(val) {
        this._first = val;
    }
    updateRowsPerPageOptions() {
        if (this.rowsPerPageOptions) {
            this.rowsPerPageItems = [];
            for (let opt of this.rowsPerPageOptions) {
                if (typeof opt == 'object' && opt['showAll']) {
                    this.rowsPerPageItems.unshift({ label: opt['showAll'], value: this.totalRecords });
                }
                else {
                    this.rowsPerPageItems.push({ label: String(opt), value: opt });
                }
            }
        }
    }
    isFirstPage() {
        return this.getPage() === 0;
    }
    isLastPage() {
        return this.getPage() === this.getPageCount() - 1;
    }
    getPageCount() {
        return Math.ceil(this.totalRecords / this.rows);
    }
    calculatePageLinkBoundaries() {
        let numberOfPages = this.getPageCount(), visiblePages = Math.min(this.pageLinkSize, numberOfPages);
        //calculate range, keep current in middle if necessary
        let start = Math.max(0, Math.ceil(this.getPage() - ((visiblePages) / 2))), end = Math.min(numberOfPages - 1, start + visiblePages - 1);
        //check when approaching to last page
        var delta = this.pageLinkSize - (end - start + 1);
        start = Math.max(0, start - delta);
        return [start, end];
    }
    updatePageLinks() {
        this.pageLinks = [];
        let boundaries = this.calculatePageLinkBoundaries(), start = boundaries[0], end = boundaries[1];
        for (let i = start; i <= end; i++) {
            this.pageLinks.push(i + 1);
        }
        if (this.showJumpToPageDropdown) {
            this.pageItems = [];
            for (let i = 0; i < this.getPageCount(); i++) {
                this.pageItems.push({ label: String(i + 1), value: i });
            }
        }
    }
    changePage(p) {
        var pc = this.getPageCount();
        if (p >= 0 && p < pc) {
            this._first = this.rows * p;
            var state = {
                page: p,
                first: this.first,
                rows: this.rows,
                pageCount: pc
            };
            this.updatePageLinks();
            this.onPageChange.emit(state);
            this.updatePaginatorState();
        }
    }
    updateFirst() {
        const page = this.getPage();
        if (page > 0 && this.totalRecords && (this.first >= this.totalRecords)) {
            Promise.resolve(null).then(() => this.changePage(page - 1));
        }
    }
    getPage() {
        return Math.floor(this.first / this.rows);
    }
    changePageToFirst(event) {
        if (!this.isFirstPage()) {
            this.changePage(0);
        }
        event.preventDefault();
    }
    changePageToPrev(event) {
        this.changePage(this.getPage() - 1);
        event.preventDefault();
    }
    changePageToNext(event) {
        this.changePage(this.getPage() + 1);
        event.preventDefault();
    }
    changePageToLast(event) {
        if (!this.isLastPage()) {
            this.changePage(this.getPageCount() - 1);
        }
        event.preventDefault();
    }
    onPageLinkClick(event, page) {
        this.changePage(page);
        event.preventDefault();
    }
    onRppChange(event) {
        this.changePage(this.getPage());
    }
    onPageDropdownChange(event) {
        this.changePage(event.value);
    }
    updatePaginatorState() {
        this.paginatorState = {
            page: this.getPage(),
            pageCount: this.getPageCount(),
            rows: this.rows,
            first: this.first,
            totalRecords: this.totalRecords
        };
    }
    empty() {
        return this.getPageCount() === 0;
    }
    currentPage() {
        return this.getPageCount() > 0 ? this.getPage() + 1 : 0;
    }
    get currentPageReport() {
        return this.currentPageReportTemplate
            .replace("{currentPage}", String(this.currentPage()))
            .replace("{totalPages}", String(this.getPageCount()))
            .replace("{first}", String((this.totalRecords > 0) ? this._first + 1 : 0))
            .replace("{last}", String(Math.min(this._first + this.rows, this.totalRecords)))
            .replace("{rows}", String(this.rows))
            .replace("{totalRecords}", String(this.totalRecords));
    }
}
Paginator.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0, type: Paginator, deps: [{ token: i0.ChangeDetectorRef }], target: i0.ɵɵFactoryTarget.Component });
Paginator.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.0.5", type: Paginator, selector: "p-paginator", inputs: { pageLinkSize: "pageLinkSize", style: "style", styleClass: "styleClass", alwaysShow: "alwaysShow", templateLeft: "templateLeft", templateRight: "templateRight", dropdownAppendTo: "dropdownAppendTo", dropdownScrollHeight: "dropdownScrollHeight", currentPageReportTemplate: "currentPageReportTemplate", showCurrentPageReport: "showCurrentPageReport", showFirstLastIcon: "showFirstLastIcon", totalRecords: "totalRecords", rows: "rows", rowsPerPageOptions: "rowsPerPageOptions", showJumpToPageDropdown: "showJumpToPageDropdown", showJumpToPageInput: "showJumpToPageInput", showPageLinks: "showPageLinks", dropdownItemTemplate: "dropdownItemTemplate", first: "first" }, outputs: { onPageChange: "onPageChange" }, host: { classAttribute: "p-element" }, usesOnChanges: true, ngImport: i0, template: `
        <div [class]="styleClass" [ngStyle]="style" [ngClass]="'p-paginator p-component'" *ngIf="alwaysShow ? true : (pageLinks && pageLinks.length > 1)">
            <div class="p-paginator-left-content" *ngIf="templateLeft">
                <ng-container *ngTemplateOutlet="templateLeft; context: {$implicit: paginatorState}"></ng-container>
            </div>
            <span class="p-paginator-current" *ngIf="showCurrentPageReport">{{currentPageReport}}</span>
            <button *ngIf="showFirstLastIcon" type="button" [disabled]="isFirstPage() || empty()" (click)="changePageToFirst($event)" pRipple
                    class="p-paginator-first p-paginator-element p-link" [ngClass]="{'p-disabled':isFirstPage() || empty()}">
                <span class="p-paginator-icon pi pi-angle-double-left"></span>
            </button>
            <button type="button" [disabled]="isFirstPage() || empty()" (click)="changePageToPrev($event)" pRipple
                    class="p-paginator-prev p-paginator-element p-link" [ngClass]="{'p-disabled':isFirstPage() || empty()}">
                <span class="p-paginator-icon pi pi-angle-left"></span>
            </button>
            <span class="p-paginator-pages" *ngIf="showPageLinks">
                <button type="button" *ngFor="let pageLink of pageLinks" class="p-paginator-page p-paginator-element p-link" [ngClass]="{'p-highlight': (pageLink-1 == getPage())}"
                    (click)="onPageLinkClick($event, pageLink - 1)" pRipple>{{pageLink}}</button>
            </span>
            <p-dropdown [options]="pageItems" [ngModel]="getPage()" *ngIf="showJumpToPageDropdown" [disabled]="empty()" styleClass="p-paginator-page-options"
                (onChange)="onPageDropdownChange($event)" [appendTo]="dropdownAppendTo" [scrollHeight]="dropdownScrollHeight">
                <ng-template pTemplate="selectedItem">{{currentPageReport}}</ng-template>
            </p-dropdown>
            <button type="button" [disabled]="isLastPage() || empty()" (click)="changePageToNext($event)" pRipple
                    class="p-paginator-next p-paginator-element p-link" [ngClass]="{'p-disabled':isLastPage() || empty()}">
                <span class="p-paginator-icon pi pi-angle-right"></span>
            </button>
            <button *ngIf="showFirstLastIcon" type="button" [disabled]="isLastPage() || empty()" (click)="changePageToLast($event)" pRipple
                    class="p-paginator-last p-paginator-element p-link" [ngClass]="{'p-disabled':isLastPage() || empty()}">
                <span class="p-paginator-icon pi pi-angle-double-right"></span>
            </button>
            <p-inputNumber *ngIf="showJumpToPageInput" [ngModel]="currentPage()" class="p-paginator-page-input" [disabled]="empty()" (ngModelChange)="changePage($event - 1)"></p-inputNumber>
            <p-dropdown [options]="rowsPerPageItems" [(ngModel)]="rows" *ngIf="rowsPerPageOptions" styleClass="p-paginator-rpp-options" [disabled]="empty()"
                (onChange)="onRppChange($event)" [appendTo]="dropdownAppendTo" [scrollHeight]="dropdownScrollHeight">
                <ng-container *ngIf="dropdownItemTemplate">
                    <ng-template let-item pTemplate="item">
                        <ng-container *ngTemplateOutlet="dropdownItemTemplate; context: {$implicit: item}">
                        </ng-container>
                    </ng-template>
                </ng-container>
            </p-dropdown>
            <div class="p-paginator-right-content" *ngIf="templateRight">
                <ng-container *ngTemplateOutlet="templateRight; context: {$implicit: paginatorState}"></ng-container>
            </div>
        </div>
    `, isInline: true, styles: [".p-paginator{display:flex;align-items:center;justify-content:center;flex-wrap:wrap}.p-paginator-left-content{margin-right:auto}.p-paginator-right-content{margin-left:auto}.p-paginator-current,.p-paginator-first,.p-paginator-last,.p-paginator-next,.p-paginator-page,.p-paginator-prev{cursor:pointer;display:inline-flex;align-items:center;justify-content:center;line-height:1;-webkit-user-select:none;-ms-user-select:none;user-select:none;overflow:hidden;position:relative}.p-paginator-element:focus{z-index:1;position:relative}"], components: [{ type: i1.Dropdown, selector: "p-dropdown", inputs: ["scrollHeight", "filter", "name", "style", "panelStyle", "styleClass", "panelStyleClass", "readonly", "required", "editable", "appendTo", "tabindex", "placeholder", "filterPlaceholder", "filterLocale", "inputId", "selectId", "dataKey", "filterBy", "autofocus", "resetFilterOnHide", "dropdownIcon", "optionLabel", "optionValue", "optionDisabled", "optionGroupLabel", "optionGroupChildren", "autoDisplayFirst", "group", "showClear", "emptyFilterMessage", "emptyMessage", "virtualScroll", "itemSize", "autoZIndex", "baseZIndex", "showTransitionOptions", "hideTransitionOptions", "ariaFilterLabel", "ariaLabelledBy", "filterMatchMode", "maxlength", "tooltip", "tooltipPosition", "tooltipPositionStyle", "tooltipStyleClass", "autofocusFilter", "disabled", "options", "filterValue"], outputs: ["onChange", "onFilter", "onFocus", "onBlur", "onClick", "onShow", "onHide", "onClear"] }, { type: i2.InputNumber, selector: "p-inputNumber", inputs: ["showButtons", "format", "buttonLayout", "inputId", "styleClass", "style", "placeholder", "size", "maxlength", "tabindex", "title", "ariaLabel", "ariaRequired", "name", "required", "autocomplete", "min", "max", "incrementButtonClass", "decrementButtonClass", "incrementButtonIcon", "decrementButtonIcon", "readonly", "step", "allowEmpty", "locale", "localeMatcher", "mode", "currency", "currencyDisplay", "useGrouping", "minFractionDigits", "maxFractionDigits", "prefix", "suffix", "inputStyle", "inputStyleClass", "disabled"], outputs: ["onInput", "onFocus", "onBlur", "onKeyDown"] }], directives: [{ type: i3.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i3.NgStyle, selector: "[ngStyle]", inputs: ["ngStyle"] }, { type: i3.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { type: i3.NgTemplateOutlet, selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet"] }, { type: i4.Ripple, selector: "[pRipple]" }, { type: i3.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { type: i5.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { type: i5.NgModel, selector: "[ngModel]:not([formControlName]):not([formControl])", inputs: ["name", "disabled", "ngModel", "ngModelOptions"], outputs: ["ngModelChange"], exportAs: ["ngModel"] }, { type: i6.PrimeTemplate, selector: "[pTemplate]", inputs: ["type", "pTemplate"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0, type: Paginator, decorators: [{
            type: Component,
            args: [{
                    selector: 'p-paginator',
                    template: `
        <div [class]="styleClass" [ngStyle]="style" [ngClass]="'p-paginator p-component'" *ngIf="alwaysShow ? true : (pageLinks && pageLinks.length > 1)">
            <div class="p-paginator-left-content" *ngIf="templateLeft">
                <ng-container *ngTemplateOutlet="templateLeft; context: {$implicit: paginatorState}"></ng-container>
            </div>
            <span class="p-paginator-current" *ngIf="showCurrentPageReport">{{currentPageReport}}</span>
            <button *ngIf="showFirstLastIcon" type="button" [disabled]="isFirstPage() || empty()" (click)="changePageToFirst($event)" pRipple
                    class="p-paginator-first p-paginator-element p-link" [ngClass]="{'p-disabled':isFirstPage() || empty()}">
                <span class="p-paginator-icon pi pi-angle-double-left"></span>
            </button>
            <button type="button" [disabled]="isFirstPage() || empty()" (click)="changePageToPrev($event)" pRipple
                    class="p-paginator-prev p-paginator-element p-link" [ngClass]="{'p-disabled':isFirstPage() || empty()}">
                <span class="p-paginator-icon pi pi-angle-left"></span>
            </button>
            <span class="p-paginator-pages" *ngIf="showPageLinks">
                <button type="button" *ngFor="let pageLink of pageLinks" class="p-paginator-page p-paginator-element p-link" [ngClass]="{'p-highlight': (pageLink-1 == getPage())}"
                    (click)="onPageLinkClick($event, pageLink - 1)" pRipple>{{pageLink}}</button>
            </span>
            <p-dropdown [options]="pageItems" [ngModel]="getPage()" *ngIf="showJumpToPageDropdown" [disabled]="empty()" styleClass="p-paginator-page-options"
                (onChange)="onPageDropdownChange($event)" [appendTo]="dropdownAppendTo" [scrollHeight]="dropdownScrollHeight">
                <ng-template pTemplate="selectedItem">{{currentPageReport}}</ng-template>
            </p-dropdown>
            <button type="button" [disabled]="isLastPage() || empty()" (click)="changePageToNext($event)" pRipple
                    class="p-paginator-next p-paginator-element p-link" [ngClass]="{'p-disabled':isLastPage() || empty()}">
                <span class="p-paginator-icon pi pi-angle-right"></span>
            </button>
            <button *ngIf="showFirstLastIcon" type="button" [disabled]="isLastPage() || empty()" (click)="changePageToLast($event)" pRipple
                    class="p-paginator-last p-paginator-element p-link" [ngClass]="{'p-disabled':isLastPage() || empty()}">
                <span class="p-paginator-icon pi pi-angle-double-right"></span>
            </button>
            <p-inputNumber *ngIf="showJumpToPageInput" [ngModel]="currentPage()" class="p-paginator-page-input" [disabled]="empty()" (ngModelChange)="changePage($event - 1)"></p-inputNumber>
            <p-dropdown [options]="rowsPerPageItems" [(ngModel)]="rows" *ngIf="rowsPerPageOptions" styleClass="p-paginator-rpp-options" [disabled]="empty()"
                (onChange)="onRppChange($event)" [appendTo]="dropdownAppendTo" [scrollHeight]="dropdownScrollHeight">
                <ng-container *ngIf="dropdownItemTemplate">
                    <ng-template let-item pTemplate="item">
                        <ng-container *ngTemplateOutlet="dropdownItemTemplate; context: {$implicit: item}">
                        </ng-container>
                    </ng-template>
                </ng-container>
            </p-dropdown>
            <div class="p-paginator-right-content" *ngIf="templateRight">
                <ng-container *ngTemplateOutlet="templateRight; context: {$implicit: paginatorState}"></ng-container>
            </div>
        </div>
    `,
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    encapsulation: ViewEncapsulation.None,
                    styleUrls: ['./paginator.css'],
                    host: {
                        'class': 'p-element'
                    }
                }]
        }], ctorParameters: function () { return [{ type: i0.ChangeDetectorRef }]; }, propDecorators: { pageLinkSize: [{
                type: Input
            }], onPageChange: [{
                type: Output
            }], style: [{
                type: Input
            }], styleClass: [{
                type: Input
            }], alwaysShow: [{
                type: Input
            }], templateLeft: [{
                type: Input
            }], templateRight: [{
                type: Input
            }], dropdownAppendTo: [{
                type: Input
            }], dropdownScrollHeight: [{
                type: Input
            }], currentPageReportTemplate: [{
                type: Input
            }], showCurrentPageReport: [{
                type: Input
            }], showFirstLastIcon: [{
                type: Input
            }], totalRecords: [{
                type: Input
            }], rows: [{
                type: Input
            }], rowsPerPageOptions: [{
                type: Input
            }], showJumpToPageDropdown: [{
                type: Input
            }], showJumpToPageInput: [{
                type: Input
            }], showPageLinks: [{
                type: Input
            }], dropdownItemTemplate: [{
                type: Input
            }], first: [{
                type: Input
            }] } });
export class PaginatorModule {
}
PaginatorModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0, type: PaginatorModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
PaginatorModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0, type: PaginatorModule, declarations: [Paginator], imports: [CommonModule, DropdownModule, InputNumberModule, FormsModule, SharedModule, RippleModule], exports: [Paginator, DropdownModule, InputNumberModule, FormsModule, SharedModule] });
PaginatorModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0, type: PaginatorModule, imports: [[CommonModule, DropdownModule, InputNumberModule, FormsModule, SharedModule, RippleModule], DropdownModule, InputNumberModule, FormsModule, SharedModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0, type: PaginatorModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule, DropdownModule, InputNumberModule, FormsModule, SharedModule, RippleModule],
                    exports: [Paginator, DropdownModule, InputNumberModule, FormsModule, SharedModule],
                    declarations: [Paginator]
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFnaW5hdG9yLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2FwcC9jb21wb25lbnRzL3BhZ2luYXRvci9wYWdpbmF0b3IudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFDLFFBQVEsRUFBQyxTQUFTLEVBQVEsS0FBSyxFQUFDLE1BQU0sRUFBbUIsWUFBWSxFQUFxQyx1QkFBdUIsRUFBRSxpQkFBaUIsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUNuTCxPQUFPLEVBQUMsWUFBWSxFQUFDLE1BQU0saUJBQWlCLENBQUM7QUFDN0MsT0FBTyxFQUFDLFdBQVcsRUFBQyxNQUFNLGdCQUFnQixDQUFDO0FBQzNDLE9BQU8sRUFBQyxjQUFjLEVBQUMsTUFBTSxrQkFBa0IsQ0FBQztBQUVoRCxPQUFPLEVBQUMsWUFBWSxFQUFDLE1BQU0sZ0JBQWdCLENBQUM7QUFDNUMsT0FBTyxFQUFDLFlBQVksRUFBQyxNQUFNLGFBQWEsQ0FBQztBQUN6QyxPQUFPLEVBQUMsaUJBQWlCLEVBQUMsTUFBTSxxQkFBcUIsQ0FBQzs7Ozs7Ozs7QUF3RHRELE1BQU0sT0FBTyxTQUFTO0lBb0RsQixZQUFvQixFQUFxQjtRQUFyQixPQUFFLEdBQUYsRUFBRSxDQUFtQjtRQWxEaEMsaUJBQVksR0FBVyxDQUFDLENBQUM7UUFFeEIsaUJBQVksR0FBc0IsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQU10RCxlQUFVLEdBQVksSUFBSSxDQUFDO1FBUTNCLHlCQUFvQixHQUFXLE9BQU8sQ0FBQztRQUV2Qyw4QkFBeUIsR0FBVywrQkFBK0IsQ0FBQztRQUlwRSxzQkFBaUIsR0FBWSxJQUFJLENBQUM7UUFFbEMsaUJBQVksR0FBVyxDQUFDLENBQUM7UUFFekIsU0FBSSxHQUFXLENBQUMsQ0FBQztRQVFqQixrQkFBYSxHQUFZLElBQUksQ0FBQztRQVl2QyxXQUFNLEdBQVcsQ0FBQyxDQUFDO1FBRW5CLFVBQUssR0FBVyxDQUFDLENBQUM7SUFFMEIsQ0FBQztJ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QUdwRSxlQUFlLFlBSmYsQ0FBQyxZQUFZLEVBQUMsY0FBYyxFQUFDLGlCQUFpQixFQUFDLFdBQVcsRUFBQyxZQUFZLEVBQUMsWUFBWSxDQUFDLEVBQzFFLGNBQWMsRUFBQyxpQkFBaUIsRUFBQyxXQUFXLEVBQUMsWUFBWTsyRkFHcEUsZUFBZTtrQkFMM0IsUUFBUTttQkFBQztvQkFDTixPQUFPLEVBQUUsQ0FBQyxZQUFZLEVBQUMsY0FBYyxFQUFDLGlCQUFpQixFQUFDLFdBQVcsRUFBQyxZQUFZLEVBQUMsWUFBWSxDQUFDO29CQUM5RixPQUFPLEVBQUUsQ0FBQyxTQUFTLEVBQUMsY0FBYyxFQUFDLGlCQUFpQixFQUFDLFdBQVcsRUFBQyxZQUFZLENBQUM7b0JBQzlFLFlBQVksRUFBRSxDQUFDLFNBQVMsQ0FBQztpQkFDNUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge05nTW9kdWxlLENvbXBvbmVudCxPbkluaXQsSW5wdXQsT3V0cHV0LENoYW5nZURldGVjdG9yUmVmLEV2ZW50RW1pdHRlcixUZW1wbGF0ZVJlZixPbkNoYW5nZXMsU2ltcGxlQ2hhbmdlcyxDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSwgVmlld0VuY2Fwc3VsYXRpb259IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtDb21tb25Nb2R1bGV9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQge0Zvcm1zTW9kdWxlfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQge0Ryb3Bkb3duTW9kdWxlfSBmcm9tICdwcmltZW5nL2Ryb3Bkb3duJztcbmltcG9ydCB7U2VsZWN0SXRlbX0gZnJvbSAncHJpbWVuZy9hcGknO1xuaW1wb3J0IHtSaXBwbGVNb2R1bGV9IGZyb20gJ3ByaW1lbmcvcmlwcGxlJztcbmltcG9ydCB7U2hhcmVkTW9kdWxlfSBmcm9tICdwcmltZW5nL2FwaSc7XG5pbXBvcnQge0lucHV0TnVtYmVyTW9kdWxlfSBmcm9tICdwcmltZW5nL2lucHV0bnVtYmVyJztcblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICdwLXBhZ2luYXRvcicsXG4gICAgdGVtcGxhdGU6IGBcbiAgICAgICAgPGRpdiBbY2xhc3NdPVwic3R5bGVDbGFzc1wiIFtuZ1N0eWxlXT1cInN0eWxlXCIgW25nQ2xhc3NdPVwiJ3AtcGFnaW5hdG9yIHAtY29tcG9uZW50J1wiICpuZ0lmPVwiYWx3YXlzU2hvdyA/IHRydWUgOiAocGFnZUxpbmtzICYmIHBhZ2VMaW5rcy5sZW5ndGggPiAxKVwiPlxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cInAtcGFnaW5hdG9yLWxlZnQtY29udGVudFwiICpuZ0lmPVwidGVtcGxhdGVMZWZ0XCI+XG4gICAgICAgICAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdUZW1wbGF0ZU91dGxldD1cInRlbXBsYXRlTGVmdDsgY29udGV4dDogeyRpbXBsaWNpdDogcGFnaW5hdG9yU3RhdGV9XCI+PC9uZy1jb250YWluZXI+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwicC1wYWdpbmF0b3ItY3VycmVudFwiICpuZ0lmPVwic2hvd0N1cnJlbnRQYWdlUmVwb3J0XCI+e3tjdXJyZW50UGFnZVJlcG9ydH19PC9zcGFuPlxuICAgICAgICAgICAgPGJ1dHRvbiAqbmdJZj1cInNob3dGaXJzdExhc3RJY29uXCIgdHlwZT1cImJ1dHRvblwiIFtkaXNhYmxlZF09XCJpc0ZpcnN0UGFnZSgpIHx8IGVtcHR5KClcIiAoY2xpY2spPVwiY2hhbmdlUGFnZVRvRmlyc3QoJGV2ZW50KVwiIHBSaXBwbGVcbiAgICAgICAgICAgICAgICAgICAgY2xhc3M9XCJwLXBhZ2luYXRvci1maXJzdCBwLXBhZ2luYXRvci1lbGVtZW50IHAtbGlua1wiIFtuZ0NsYXNzXT1cInsncC1kaXNhYmxlZCc6aXNGaXJzdFBhZ2UoKSB8fCBlbXB0eSgpfVwiPlxuICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwicC1wYWdpbmF0b3ItaWNvbiBwaSBwaS1hbmdsZS1kb3VibGUtbGVmdFwiPjwvc3Bhbj5cbiAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgW2Rpc2FibGVkXT1cImlzRmlyc3RQYWdlKCkgfHwgZW1wdHkoKVwiIChjbGljayk9XCJjaGFuZ2VQYWdlVG9QcmV2KCRldmVudClcIiBwUmlwcGxlXG4gICAgICAgICAgICAgICAgICAgIGNsYXNzPVwicC1wYWdpbmF0b3ItcHJldiBwLXBhZ2luYXRvci1lbGVtZW50IHAtbGlua1wiIFtuZ0NsYXNzXT1cInsncC1kaXNhYmxlZCc6aXNGaXJzdFBhZ2UoKSB8fCBlbXB0eSgpfVwiPlxuICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwicC1wYWdpbmF0b3ItaWNvbiBwaSBwaS1hbmdsZS1sZWZ0XCI+PC9zcGFuPlxuICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICA8c3BhbiBjbGFzcz1cInAtcGFnaW5hdG9yLXBhZ2VzXCIgKm5nSWY9XCJzaG93UGFnZUxpbmtzXCI+XG4gICAgICAgICAgICAgICAgPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgKm5nRm9yPVwibGV0IHBhZ2VMaW5rIG9mIHBhZ2VMaW5rc1wiIGNsYXNzPVwicC1wYWdpbmF0b3ItcGFnZSBwLXBhZ2luYXRvci1lbGVtZW50IHAtbGlua1wiIFtuZ0NsYXNzXT1cInsncC1oaWdobGlnaHQnOiAocGFnZUxpbmstMSA9PSBnZXRQYWdlKCkpfVwiXG4gICAgICAgICAgICAgICAgICAgIChjbGljayk9XCJvblBhZ2VMaW5rQ2xpY2soJGV2ZW50LCBwYWdlTGluayAtIDEpXCIgcFJpcHBsZT57e3BhZ2VMaW5rfX08L2J1dHRvbj5cbiAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgIDxwLWRyb3Bkb3duIFtvcHRpb25zXT1cInBhZ2VJdGVtc1wiIFtuZ01vZGVsXT1cImdldFBhZ2UoKVwiICpuZ0lmPVwic2hvd0p1bXBUb1BhZ2VEcm9wZG93blwiIFtkaXNhYmxlZF09XCJlbXB0eSgpXCIgc3R5bGVDbGFzcz1cInAtcGFnaW5hdG9yLXBhZ2Utb3B0aW9uc1wiXG4gICAgICAgICAgICAgICAgKG9uQ2hhbmdlKT1cIm9uUGFnZURyb3Bkb3duQ2hhbmdlKCRldmVudClcIiBbYXBwZW5kVG9dPVwiZHJvcGRvd25BcHBlbmRUb1wiIFtzY3JvbGxIZWlnaHRdPVwiZHJvcGRvd25TY3JvbGxIZWlnaHRcIj5cbiAgICAgICAgICAgICAgICA8bmctdGVtcGxhdGUgcFRlbXBsYXRlPVwic2VsZWN0ZWRJdGVtXCI+e3tjdXJyZW50UGFnZVJlcG9ydH19PC9uZy10ZW1wbGF0ZT5cbiAgICAgICAgICAgIDwvcC1kcm9wZG93bj5cbiAgICAgICAgICAgIDxidXR0b24gdHlwZT1cImJ1dHRvblwiIFtkaXNhYmxlZF09XCJpc0xhc3RQYWdlKCkgfHwgZW1wdHkoKVwiIChjbGljayk9XCJjaGFuZ2VQYWdlVG9OZXh0KCRldmVudClcIiBwUmlwcGxlXG4gICAgICAgICAgICAgICAgICAgIGNsYXNzPVwicC1wYWdpbmF0b3ItbmV4dCBwLXBhZ2luYXRvci1lbGVtZW50IHAtbGlua1wiIFtuZ0NsYXNzXT1cInsncC1kaXNhYmxlZCc6aXNMYXN0UGFnZSgpIHx8IGVtcHR5KCl9XCI+XG4gICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJwLXBhZ2luYXRvci1pY29uIHBpIHBpLWFuZ2xlLXJpZ2h0XCI+PC9zcGFuPlxuICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICA8YnV0dG9uICpuZ0lmPVwic2hvd0ZpcnN0TGFzdEljb25cIiB0eXBlPVwiYnV0dG9uXCIgW2Rpc2FibGVkXT1cImlzTGFzdFBhZ2UoKSB8fCBlbXB0eSgpXCIgKGNsaWNrKT1cImNoYW5nZVBhZ2VUb0xhc3QoJGV2ZW50KVwiIHBSaXBwbGVcbiAgICAgICAgICAgICAgICAgICAgY2xhc3M9XCJwLXBhZ2luYXRvci1sYXN0IHAtcGFnaW5hdG9yLWVsZW1lbnQgcC1saW5rXCIgW25nQ2xhc3NdPVwieydwLWRpc2FibGVkJzppc0xhc3RQYWdlKCkgfHwgZW1wdHkoKX1cIj5cbiAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cInAtcGFnaW5hdG9yLWljb24gcGkgcGktYW5nbGUtZG91YmxlLXJpZ2h0XCI+PC9zcGFuPlxuICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICA8cC1pbnB1dE51bWJlciAqbmdJZj1cInNob3dKdW1wVG9QYWdlSW5wdXRcIiBbbmdNb2RlbF09XCJjdXJyZW50UGFnZSgpXCIgY2xhc3M9XCJwLXBhZ2luYXRvci1wYWdlLWlucHV0XCIgW2Rpc2FibGVkXT1cImVtcHR5KClcIiAobmdNb2RlbENoYW5nZSk9XCJjaGFuZ2VQYWdlKCRldmVudCAtIDEpXCI+PC9wLWlucHV0TnVtYmVyPlxuICAgICAgICAgICAgPHAtZHJvcGRvd24gW29wdGlvbnNdPVwicm93c1BlclBhZ2VJdGVtc1wiIFsobmdNb2RlbCldPVwicm93c1wiICpuZ0lmPVwicm93c1BlclBhZ2VPcHRpb25zXCIgc3R5bGVDbGFzcz1cInAtcGFnaW5hdG9yLXJwcC1vcHRpb25zXCIgW2Rpc2FibGVkXT1cImVtcHR5KClcIlxuICAgICAgICAgICAgICAgIChvbkNoYW5nZSk9XCJvblJwcENoYW5nZSgkZXZlbnQpXCIgW2FwcGVuZFRvXT1cImRyb3Bkb3duQXBwZW5kVG9cIiBbc2Nyb2xsSGVpZ2h0XT1cImRyb3Bkb3duU2Nyb2xsSGVpZ2h0XCI+XG4gICAgICAgICAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdJZj1cImRyb3Bkb3duSXRlbVRlbXBsYXRlXCI+XG4gICAgICAgICAgICAgICAgICAgIDxuZy10ZW1wbGF0ZSBsZXQtaXRlbSBwVGVtcGxhdGU9XCJpdGVtXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8bmctY29udGFpbmVyICpuZ1RlbXBsYXRlT3V0bGV0PVwiZHJvcGRvd25JdGVtVGVtcGxhdGU7IGNvbnRleHQ6IHskaW1wbGljaXQ6IGl0ZW19XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L25nLWNvbnRhaW5lcj5cbiAgICAgICAgICAgICAgICAgICAgPC9uZy10ZW1wbGF0ZT5cbiAgICAgICAgICAgICAgICA8L25nLWNvbnRhaW5lcj5cbiAgICAgICAgICAgIDwvcC1kcm9wZG93bj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJwLXBhZ2luYXRvci1yaWdodC1jb250ZW50XCIgKm5nSWY9XCJ0ZW1wbGF0ZVJpZ2h0XCI+XG4gICAgICAgICAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdUZW1wbGF0ZU91dGxldD1cInRlbXBsYXRlUmlnaHQ7IGNvbnRleHQ6IHskaW1wbGljaXQ6IHBhZ2luYXRvclN0YXRlfVwiPjwvbmctY29udGFpbmVyPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgIGAsXG4gICAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG4gICAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZSxcbiAgICBzdHlsZVVybHM6IFsnLi9wYWdpbmF0b3IuY3NzJ10sXG4gICAgaG9zdDoge1xuICAgICAgICAnY2xhc3MnOiAncC1lbGVtZW50J1xuICAgIH1cbn0pXG5leHBvcnQgY2xhc3MgUGFnaW5hdG9yIGltcGxlbWVudHMgT25Jbml0LCBPbkNoYW5nZXMge1xuXG4gICAgQElucHV0KCkgcGFnZUxpbmtTaXplOiBudW1iZXIgPSA1O1xuXG4gICAgQE91dHB1dCgpIG9uUGFnZUNoYW5nZTogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgICBASW5wdXQoKSBzdHlsZTogYW55O1xuXG4gICAgQElucHV0KCkgc3R5bGVDbGFzczogc3RyaW5nO1xuXG4gICAgQElucHV0KCkgYWx3YXlzU2hvdzogYm9vbGVhbiA9IHRydWU7XG5cbiAgICBASW5wdXQoKSB0ZW1wbGF0ZUxlZnQ6IFRlbXBsYXRlUmVmPGFueT47XG5cbiAgICBASW5wdXQoKSB0ZW1wbGF0ZVJpZ2h0OiBUZW1wbGF0ZVJlZjxhbnk+O1xuXG4gICAgQElucHV0KCkgZHJvcGRvd25BcHBlbmRUbzogYW55O1xuXG4gICAgQElucHV0KCkgZHJvcGRvd25TY3JvbGxIZWlnaHQ6IHN0cmluZyA9ICcyMDBweCc7XG5cbiAgICBASW5wdXQoKSBjdXJyZW50UGFnZVJlcG9ydFRlbXBsYXRlOiBzdHJpbmcgPSAne2N1cnJlbnRQYWdlfSBvZiB7dG90YWxQYWdlc30nO1xuXG4gICAgQElucHV0KCkgc2hvd0N1cnJlbnRQYWdlUmVwb3J0OiBib29sZWFuO1xuXG4gICAgQElucHV0KCkgc2hvd0ZpcnN0TGFzdEljb246IGJvb2xlYW4gPSB0cnVlO1xuXG4gICAgQElucHV0KCkgdG90YWxSZWNvcmRzOiBudW1iZXIgPSAwO1xuXG4gICAgQElucHV0KCkgcm93czogbnVtYmVyID0gMDtcblxuICAgIEBJbnB1dCgpIHJvd3NQZXJQYWdlT3B0aW9uczogYW55W107XG5cbiAgICBASW5wdXQoKSBzaG93SnVtcFRvUGFnZURyb3Bkb3duOiBib29sZWFuO1xuXG4gICAgQElucHV0KCkgc2hvd0p1bXBUb1BhZ2VJbnB1dDogYm9vbGVhbjtcblxuICAgIEBJbnB1dCgpIHNob3dQYWdlTGlua3M6IGJvb2xlYW4gPSB0cnVlO1xuXG4gICAgQElucHV0KCkgZHJvcGRvd25JdGVtVGVtcGxhdGU6IFRlbXBsYXRlUmVmPGFueT47XG5cbiAgICBwYWdlTGlua3M6IG51bWJlcltdO1xuXG4gICAgcGFnZUl0ZW1zOiBTZWxlY3RJdGVtW107XG5cbiAgICByb3dzUGVyUGFnZUl0ZW1zOiBTZWxlY3RJdGVtW107XG5cbiAgICBwYWdpbmF0b3JTdGF0ZTogYW55O1xuXG4gICAgX2ZpcnN0OiBudW1iZXIgPSAwO1xuXG4gICAgX3BhZ2U6IG51bWJlciA9IDA7XG5cbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIGNkOiBDaGFuZ2VEZXRlY3RvclJlZikge31cblxuICAgIG5nT25Jbml0KCkge1xuICAgICAgICB0aGlzLnVwZGF0ZVBhZ2luYXRvclN0YXRlKCk7XG4gICAgfVxuXG4gICAgbmdPbkNoYW5nZXMoc2ltcGxlQ2hhbmdlOiBTaW1wbGVDaGFuZ2VzKSB7XG4gICAgICAgIGlmIChzaW1wbGVDaGFuZ2UudG90YWxSZWNvcmRzKSB7XG4gICAgICAgICAgICB0aGlzLnVwZGF0ZVBhZ2VMaW5rcygpO1xuICAgICAgICAgICAgdGhpcy51cGRhdGVQYWdpbmF0b3JTdGF0ZSgpO1xuICAgICAgICAgICAgdGhpcy51cGRhdGVGaXJzdCgpO1xuICAgICAgICAgICAgdGhpcy51cGRhdGVSb3dzUGVyUGFnZU9wdGlvbnMoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChzaW1wbGVDaGFuZ2UuZmlyc3QpIHtcbiAgICAgICAgICAgIHRoaXMuX2ZpcnN0ID0gc2ltcGxlQ2hhbmdlLmZpcnN0LmN1cnJlbnRWYWx1ZTtcbiAgICAgICAgICAgIHRoaXMudXBkYXRlUGFnZUxpbmtzKCk7XG4gICAgICAgICAgICB0aGlzLnVwZGF0ZVBhZ2luYXRvclN0YXRlKCk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoc2ltcGxlQ2hhbmdlLnJvd3MpIHtcbiAgICAgICAgICAgIHRoaXMudXBkYXRlUGFnZUxpbmtzKCk7XG4gICAgICAgICAgICB0aGlzLnVwZGF0ZVBhZ2luYXRvclN0YXRlKCk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoc2ltcGxlQ2hhbmdlLnJvd3NQZXJQYWdlT3B0aW9ucykge1xuICAgICAgICAgICAgdGhpcy51cGRhdGVSb3dzUGVyUGFnZU9wdGlvbnMoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIEBJbnB1dCgpIGdldCBmaXJzdCgpOiBudW1iZXIge1xuICAgICAgICByZXR1cm4gdGhpcy5fZmlyc3Q7XG4gICAgfVxuICAgIHNldCBmaXJzdCh2YWw6bnVtYmVyKSB7XG4gICAgICAgIHRoaXMuX2ZpcnN0ID0gdmFsO1xuICAgIH1cblxuICAgIHVwZGF0ZVJvd3NQZXJQYWdlT3B0aW9ucygpIHtcbiAgICAgICAgaWYgKHRoaXMucm93c1BlclBhZ2VPcHRpb25zKSB7XG4gICAgICAgICAgICB0aGlzLnJvd3NQZXJQYWdlSXRlbXMgPSBbXTtcbiAgICAgICAgICAgIGZvciAobGV0IG9wdCBvZiB0aGlzLnJvd3NQZXJQYWdlT3B0aW9ucykge1xuICAgICAgICAgICAgICAgIGlmICh0eXBlb2Ygb3B0ID09ICdvYmplY3QnICYmIG9wdFsnc2hvd0FsbCddKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMucm93c1BlclBhZ2VJdGVtcy51bnNoaWZ0KHtsYWJlbDogb3B0WydzaG93QWxsJ10sIHZhbHVlOiB0aGlzLnRvdGFsUmVjb3Jkc30pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5yb3dzUGVyUGFnZUl0ZW1zLnB1c2goe2xhYmVsOiBTdHJpbmcob3B0KSwgdmFsdWU6IG9wdH0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIGlzRmlyc3RQYWdlKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5nZXRQYWdlKCkgPT09IDA7XG4gICAgfVxuXG4gICAgaXNMYXN0UGFnZSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0UGFnZSgpID09PSB0aGlzLmdldFBhZ2VDb3VudCgpIC0gMTtcbiAgICB9XG5cbiAgICBnZXRQYWdlQ291bnQoKSB7XG4gICAgICAgIHJldHVybiBNYXRoLmNlaWwodGhpcy50b3RhbFJlY29yZHMvdGhpcy5yb3dzKTtcbiAgICB9XG5cbiAgICBjYWxjdWxhdGVQYWdlTGlua0JvdW5kYXJpZXMoKSB7XG4gICAgICAgIGxldCBudW1iZXJPZlBhZ2VzID0gdGhpcy5nZXRQYWdlQ291bnQoKSxcbiAgICAgICAgdmlzaWJsZVBhZ2VzID0gTWF0aC5taW4odGhpcy5wYWdlTGlua1NpemUsIG51bWJlck9mUGFnZXMpO1xuXG4gICAgICAgIC8vY2FsY3VsYXRlIHJhbmdlLCBrZWVwIGN1cnJlbnQgaW4gbWlkZGxlIGlmIG5lY2Vzc2FyeVxuICAgICAgICBsZXQgc3RhcnQgPSBNYXRoLm1heCgwLCBNYXRoLmNlaWwodGhpcy5nZXRQYWdlKCkgLSAoKHZpc2libGVQYWdlcykgLyAyKSkpLFxuICAgICAgICBlbmQgPSBNYXRoLm1pbihudW1iZXJPZlBhZ2VzIC0gMSwgc3RhcnQgKyB2aXNpYmxlUGFnZXMgLSAxKTtcblxuICAgICAgICAvL2NoZWNrIHdoZW4gYXBwcm9hY2hpbmcgdG8gbGFzdCBwYWdlXG4gICAgICAgIHZhciBkZWx0YSA9IHRoaXMucGFnZUxpbmtTaXplIC0gKGVuZCAtIHN0YXJ0ICsgMSk7XG4gICAgICAgIHN0YXJ0ID0gTWF0aC5tYXgoMCwgc3RhcnQgLSBkZWx0YSk7XG5cbiAgICAgICAgcmV0dXJuIFtzdGFydCwgZW5kXTtcbiAgICB9XG5cbiAgICB1cGRhdGVQYWdlTGlua3MoKSB7XG4gICAgICAgIHRoaXMucGFnZUxpbmtzID0gW107XG4gICAgICAgIGxldCBib3VuZGFyaWVzID0gdGhpcy5jYWxjdWxhdGVQYWdlTGlua0JvdW5kYXJpZXMoKSxcbiAgICAgICAgc3RhcnQgPSBib3VuZGFyaWVzWzBdLFxuICAgICAgICBlbmQgPSBib3VuZGFyaWVzWzFdO1xuXG4gICAgICAgIGZvcihsZXQgaSA9IHN0YXJ0OyBpIDw9IGVuZDsgaSsrKSB7XG4gICAgICAgICAgICB0aGlzLnBhZ2VMaW5rcy5wdXNoKGkgKyAxKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLnNob3dKdW1wVG9QYWdlRHJvcGRvd24pIHtcbiAgICAgICAgICAgIHRoaXMucGFnZUl0ZW1zID0gW107XG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuZ2V0UGFnZUNvdW50KCk7IGkrKykge1xuICAgICAgICAgICAgICAgIHRoaXMucGFnZUl0ZW1zLnB1c2goe2xhYmVsOiBTdHJpbmcoaSArIDEpLCB2YWx1ZTogaX0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgY2hhbmdlUGFnZShwIDpudW1iZXIpIHtcbiAgICAgICAgdmFyIHBjID0gdGhpcy5nZXRQYWdlQ291bnQoKTtcblxuICAgICAgICBpZiAocCA+PSAwICYmIHAgPCBwYykge1xuICAgICAgICAgICAgdGhpcy5fZmlyc3QgPSB0aGlzLnJvd3MgKiBwO1xuICAgICAgICAgICAgdmFyIHN0YXRlID0ge1xuICAgICAgICAgICAgICAgIHBhZ2U6IHAsXG4gICAgICAgICAgICAgICAgZmlyc3Q6IHRoaXMuZmlyc3QsXG4gICAgICAgICAgICAgICAgcm93czogdGhpcy5yb3dzLFxuICAgICAgICAgICAgICAgIHBhZ2VDb3VudDogcGNcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICB0aGlzLnVwZGF0ZVBhZ2VMaW5rcygpO1xuXG4gICAgICAgICAgICB0aGlzLm9uUGFnZUNoYW5nZS5lbWl0KHN0YXRlKTtcbiAgICAgICAgICAgIHRoaXMudXBkYXRlUGFnaW5hdG9yU3RhdGUoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHVwZGF0ZUZpcnN0KCkge1xuICAgICAgICBjb25zdCBwYWdlID0gdGhpcy5nZXRQYWdlKCk7XG4gICAgICAgIGlmIChwYWdlID4gMCAmJiB0aGlzLnRvdGFsUmVjb3JkcyAmJiAodGhpcy5maXJzdCA+PSB0aGlzLnRvdGFsUmVjb3JkcykpIHtcbiAgICAgICAgICAgIFByb21pc2UucmVzb2x2ZShudWxsKS50aGVuKCgpID0+IHRoaXMuY2hhbmdlUGFnZShwYWdlIC0gMSkpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZ2V0UGFnZSgpOiBudW1iZXIge1xuICAgICAgICByZXR1cm4gTWF0aC5mbG9vcih0aGlzLmZpcnN0IC8gdGhpcy5yb3dzKTtcbiAgICB9XG5cbiAgICBjaGFuZ2VQYWdlVG9GaXJzdChldmVudCkge1xuICAgICAgaWYgKCF0aGlzLmlzRmlyc3RQYWdlKCkpe1xuICAgICAgICAgIHRoaXMuY2hhbmdlUGFnZSgwKTtcbiAgICAgIH1cblxuICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICB9XG5cbiAgICBjaGFuZ2VQYWdlVG9QcmV2KGV2ZW50KSB7XG4gICAgICAgIHRoaXMuY2hhbmdlUGFnZSh0aGlzLmdldFBhZ2UoKSAtIDEpO1xuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIH1cblxuICAgIGNoYW5nZVBhZ2VUb05leHQoZXZlbnQpIHtcbiAgICAgICAgdGhpcy5jaGFuZ2VQYWdlKHRoaXMuZ2V0UGFnZSgpICArIDEpO1xuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIH1cblxuICAgIGNoYW5nZVBhZ2VUb0xhc3QoZXZlbnQpIHtcbiAgICAgIGlmICghdGhpcy5pc0xhc3RQYWdlKCkpe1xuICAgICAgICAgIHRoaXMuY2hhbmdlUGFnZSh0aGlzLmdldFBhZ2VDb3VudCgpIC0gMSk7XG4gICAgICB9XG5cbiAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgfVxuXG4gICAgb25QYWdlTGlua0NsaWNrKGV2ZW50LCBwYWdlKSB7XG4gICAgICAgIHRoaXMuY2hhbmdlUGFnZShwYWdlKTtcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICB9XG5cbiAgICBvblJwcENoYW5nZShldmVudCkge1xuICAgICAgICB0aGlzLmNoYW5nZVBhZ2UodGhpcy5nZXRQYWdlKCkpO1xuICAgIH1cblxuICAgIG9uUGFnZURyb3Bkb3duQ2hhbmdlKGV2ZW50KSB7XG4gICAgICAgIHRoaXMuY2hhbmdlUGFnZShldmVudC52YWx1ZSk7XG4gICAgfVxuXG4gICAgdXBkYXRlUGFnaW5hdG9yU3RhdGUoKSB7XG4gICAgICAgIHRoaXMucGFnaW5hdG9yU3RhdGUgPSB7XG4gICAgICAgICAgICBwYWdlOiB0aGlzLmdldFBhZ2UoKSxcbiAgICAgICAgICAgIHBhZ2VDb3VudDogdGhpcy5nZXRQYWdlQ291bnQoKSxcbiAgICAgICAgICAgIHJvd3M6IHRoaXMucm93cyxcbiAgICAgICAgICAgIGZpcnN0OiB0aGlzLmZpcnN0LFxuICAgICAgICAgICAgdG90YWxSZWNvcmRzOiB0aGlzLnRvdGFsUmVjb3Jkc1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZW1wdHkoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmdldFBhZ2VDb3VudCgpID09PSAwO1xuICAgIH1cblxuICAgIGN1cnJlbnRQYWdlKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5nZXRQYWdlQ291bnQoKSA+IDAgPyB0aGlzLmdldFBhZ2UoKSArIDEgOiAwO1xuICAgIH1cblxuICAgIGdldCBjdXJyZW50UGFnZVJlcG9ydCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuY3VycmVudFBhZ2VSZXBvcnRUZW1wbGF0ZVxuICAgICAgICAgICAgICAgIC5yZXBsYWNlKFwie2N1cnJlbnRQYWdlfVwiLCBTdHJpbmcodGhpcy5jdXJyZW50UGFnZSgpKSlcbiAgICAgICAgICAgICAgICAucmVwbGFjZShcInt0b3RhbFBhZ2VzfVwiLCBTdHJpbmcodGhpcy5nZXRQYWdlQ291bnQoKSkpXG4gICAgICAgICAgICAgICAgLnJlcGxhY2UoXCJ7Zmlyc3R9XCIsIFN0cmluZygodGhpcy50b3RhbFJlY29yZHMgPiAwKSA/IHRoaXMuX2ZpcnN0ICsgMSA6IDApKVxuICAgICAgICAgICAgICAgIC5yZXBsYWNlKFwie2xhc3R9XCIsIFN0cmluZyhNYXRoLm1pbih0aGlzLl9maXJzdCArIHRoaXMucm93cywgdGhpcy50b3RhbFJlY29yZHMpKSlcbiAgICAgICAgICAgICAgICAucmVwbGFjZShcIntyb3dzfVwiLCBTdHJpbmcodGhpcy5yb3dzKSlcbiAgICAgICAgICAgICAgICAucmVwbGFjZShcInt0b3RhbFJlY29yZHN9XCIsIFN0cmluZyh0aGlzLnRvdGFsUmVjb3JkcykpO1xuICAgIH1cbn1cblxuQE5nTW9kdWxlKHtcbiAgICBpbXBvcnRzOiBbQ29tbW9uTW9kdWxlLERyb3Bkb3duTW9kdWxlLElucHV0TnVtYmVyTW9kdWxlLEZvcm1zTW9kdWxlLFNoYXJlZE1vZHVsZSxSaXBwbGVNb2R1bGVdLFxuICAgIGV4cG9ydHM6IFtQYWdpbmF0b3IsRHJvcGRvd25Nb2R1bGUsSW5wdXROdW1iZXJNb2R1bGUsRm9ybXNNb2R1bGUsU2hhcmVkTW9kdWxlXSxcbiAgICBkZWNsYXJhdGlvbnM6IFtQYWdpbmF0b3JdXG59KVxuZXhwb3J0IGNsYXNzIFBhZ2luYXRvck1vZHVsZSB7IH1cbiJdfQ==