import { NgModule, Component, Input, Output, EventEmitter, ContentChildren, ContentChild, forwardRef, ViewChild, ChangeDetectionStrategy, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule, PrimeTemplate, Footer, Header, TranslationKeys } from 'primeng/api';
import { DomHandler } from 'primeng/dom';
import { ObjectUtils } from 'primeng/utils';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { RippleModule } from 'primeng/ripple';
import * as i0 from "@angular/core";
import * as i1 from "primeng/api";
import * as i2 from "@angular/common";
import * as i3 from "primeng/ripple";
export const LISTBOX_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => Listbox),
    multi: true
};
export class Listbox {
    constructor(el, cd, filterService, config) {
        this.el = el;
        this.cd = cd;
        this.filterService = filterService;
        this.config = config;
        this.checkbox = false;
        this.filter = false;
        this.filterMatchMode = 'contains';
        this.metaKeySelection = true;
        this.showToggleAll = true;
        this.optionGroupChildren = "items";
        this.onChange = new EventEmitter();
        this.onClick = new EventEmitter();
        this.onDblClick = new EventEmitter();
        this.onModelChange = () => { };
        this.onModelTouched = () => { };
    }
    get options() {
        return this._options;
    }
    set options(val) {
        this._options = val;
        if (this.hasFilter())
            this.activateFilter();
    }
    get filterValue() {
        return this._filterValue;
    }
    set filterValue(val) {
        this._filterValue = val;
        this.activateFilter();
    }
    ngOnInit() {
        this.translationSubscription = this.config.translationObserver.subscribe(() => {
            this.cd.markForCheck();
        });
    }
    ngAfterContentInit() {
        this.templates.forEach((item) => {
            switch (item.getType()) {
                case 'item':
                    this.itemTemplate = item.template;
                    break;
                case 'group':
                    this.groupTemplate = item.template;
                    break;
                case 'header':
                    this.headerTemplate = item.template;
                    break;
                case 'footer':
                    this.footerTemplate = item.template;
                    break;
                case 'empty':
                    this.emptyTemplate = item.template;
                    break;
                case 'emptyfilter':
                    this.emptyFilterTemplate = item.template;
                    break;
                default:
                    this.itemTemplate = item.template;
                    break;
            }
        });
    }
    getOptionLabel(option) {
        return this.optionLabel ? ObjectUtils.resolveFieldData(option, this.optionLabel) : (option.label != undefined ? option.label : option);
    }
    getOptionGroupChildren(optionGroup) {
        return this.optionGroupChildren ? ObjectUtils.resolveFieldData(optionGroup, this.optionGroupChildren) : optionGroup.items;
    }
    getOptionGroupLabel(optionGroup) {
        return this.optionGroupLabel ? ObjectUtils.resolveFieldData(optionGroup, this.optionGroupLabel) : (optionGroup.label != undefined ? optionGroup.label : optionGroup);
    }
    getOptionValue(option) {
        return this.optionValue ? ObjectUtils.resolveFieldData(option, this.optionValue) : (this.optionLabel || option.value === undefined ? option : option.value);
    }
    isOptionDisabled(option) {
        return this.optionDisabled ? ObjectUtils.resolveFieldData(option, this.optionDisabled) : (option.disabled !== undefined ? option.disabled : false);
    }
    writeValue(value) {
        this.value = value;
        this.cd.markForCheck();
    }
    registerOnChange(fn) {
        this.onModelChange = fn;
    }
    registerOnTouched(fn) {
        this.onModelTouched = fn;
    }
    setDisabledState(val) {
        this.disabled = val;
        this.cd.markForCheck();
    }
    onOptionClick(event, option) {
        if (this.disabled || this.isOptionDisabled(option) || this.readonly) {
            return;
        }
        if (this.multiple) {
            if (this.checkbox)
                this.onOptionClickCheckbox(event, option);
            else
                this.onOptionClickMultiple(event, option);
        }
        else {
            this.onOptionClickSingle(event, option);
        }
        this.onClick.emit({
            originalEvent: event,
            option: option,
            value: this.value
        });
        this.optionTouched = false;
    }
    onOptionTouchEnd(option) {
        if (this.disabled || this.isOptionDisabled(option) || this.readonly) {
            return;
        }
        this.optionTouched = true;
    }
    onOptionDoubleClick(event, option) {
        if (this.disabled || this.isOptionDisabled(option) || this.readonly) {
            return;
        }
        this.onDblClick.emit({
            originalEvent: event,
            option: option,
            value: this.value
        });
    }
    onOptionClickSingle(event, option) {
        let selected = this.isSelected(option);
        let valueChanged = false;
        let metaSelection = this.optionTouched ? false : this.metaKeySelection;
        if (metaSelection) {
            let metaKey = (event.metaKey || event.ctrlKey);
            if (selected) {
                if (metaKey) {
                    this.value = null;
                    valueChanged = true;
                }
            }
            else {
                this.value = this.getOptionValue(option);
                valueChanged = true;
            }
        }
        else {
            this.value = selected ? null : this.getOptionValue(option);
            valueChanged = true;
        }
        if (valueChanged) {
            this.onModelChange(this.value);
            this.onChange.emit({
                originalEvent: event,
                value: this.value
            });
        }
    }
    onOptionClickMultiple(event, option) {
        let selected = this.isSelected(option);
        let valueChanged = false;
        let metaSelection = this.optionTouched ? false : this.metaKeySelection;
        if (metaSelection) {
            let metaKey = (event.metaKey || event.ctrlKey);
            if (selected) {
                if (metaKey) {
                    this.removeOption(option);
                }
                else {
                    this.value = [this.getOptionValue(option)];
                }
                valueChanged = true;
            }
            else {
                this.value = (metaKey) ? this.value || [] : [];
                this.value = [...this.value, this.getOptionValue(option)];
                valueChanged = true;
            }
        }
        else {
            if (selected) {
                this.removeOption(option);
            }
            else {
                this.value = [...this.value || [], this.getOptionValue(option)];
            }
            valueChanged = true;
        }
        if (valueChanged) {
            this.onModelChange(this.value);
            this.onChange.emit({
                originalEvent: event,
                value: this.value
            });
        }
    }
    onOptionClickCheckbox(event, option) {
        if (this.disabled || this.readonly) {
            return;
        }
        let selected = this.isSelected(option);
        if (selected) {
            this.removeOption(option);
        }
        else {
            this.value = this.value ? this.value : [];
            this.value = [...this.value, this.getOptionValue(option)];
        }
        this.onModelChange(this.value);
        this.onChange.emit({
            originalEvent: event,
            value: this.value
        });
    }
    removeOption(option) {
        this.value = this.value.filter(val => !ObjectUtils.equals(val, this.getOptionValue(option), this.dataKey));
    }
    isSelected(option) {
        let selected = false;
        let optionValue = this.getOptionValue(option);
        if (this.multiple) {
            if (this.value) {
                for (let val of this.value) {
                    if (ObjectUtils.equals(val, optionValue, this.dataKey)) {
                        selected = true;
                        break;
                    }
                }
            }
        }
        else {
            selected = ObjectUtils.equals(this.value, optionValue, this.dataKey);
        }
        return selected;
    }
    get allChecked() {
        let optionsToRender = this.optionsToRender;
        if (!optionsToRender || optionsToRender.length === 0) {
            return false;
        }
        else {
            let selectedDisabledItemsLength = 0;
            let unselectedDisabledItemsLength = 0;
            let selectedEnabledItemsLength = 0;
            let visibleOptionsLength = this.group ? 0 : this.optionsToRender.length;
            for (let option of optionsToRender) {
                if (!this.group) {
                    let disabled = this.isOptionDisabled(option);
                    let selected = this.isSelected(option);
                    if (disabled) {
                        if (selected)
                            selectedDisabledItemsLength++;
                        else
                            unselectedDisabledItemsLength++;
                    }
                    else {
                        if (selected)
                            selectedEnabledItemsLength++;
                        else
                            return false;
                    }
                }
                else {
                    for (let opt of this.getOptionGroupChildren(option)) {
                        let disabled = this.isOptionDisabled(opt);
                        let selected = this.isSelected(opt);
                        if (disabled) {
                            if (selected)
                                selectedDisabledItemsLength++;
                            else
                                unselectedDisabledItemsLength++;
                        }
                        else {
                            if (selected)
                                selectedEnabledItemsLength++;
                            else {
                                return false;
                            }
                        }
                        visibleOptionsLength++;
                    }
                }
            }
            return (visibleOptionsLength === selectedDisabledItemsLength
                || visibleOptionsLength === selectedEnabledItemsLength
                || selectedEnabledItemsLength && visibleOptionsLength === (selectedEnabledItemsLength + unselectedDisabledItemsLength + selectedDisabledItemsLength));
        }
    }
    get optionsToRender() {
        return this._filteredOptions || this.options;
    }
    get emptyMessageLabel() {
        return this.emptyMessage || this.config.getTranslation(TranslationKeys.EMPTY_MESSAGE);
    }
    get emptyFilterMessageLabel() {
        return this.emptyFilterMessage || this.config.getTranslation(TranslationKeys.EMPTY_FILTER_MESSAGE);
    }
    hasFilter() {
        return this._filterValue && this._filterValue.trim().length > 0;
    }
    isEmpty(optionsToDisplay) {
        return !optionsToDisplay || (optionsToDisplay && optionsToDisplay.length === 0);
    }
    onFilter(event) {
        this._filterValue = event.target.value;
        this.activateFilter();
    }
    activateFilter() {
        if (this.hasFilter() && this._options) {
            if (this.group) {
                let searchFields = (this.optionLabel || 'label').split(',');
                let filteredGroups = [];
                for (let optgroup of this.options) {
                    let filteredSubOptions = this.filterService.filter(this.getOptionGroupChildren(optgroup), searchFields, this.filterValue, this.filterMatchMode, this.filterLocale);
                    if (filteredSubOptions && filteredSubOptions.length) {
                        filteredGroups.push(Object.assign(Object.assign({}, optgroup), { [this.optionGroupChildren]: filteredSubOptions }));
                    }
                }
                this._filteredOptions = filteredGroups;
            }
            else {
                this._filteredOptions = this._options.filter(option => this.filterService.filters[this.filterMatchMode](this.getOptionLabel(option), this._filterValue, this.filterLocale));
            }
        }
        else {
            this._filteredOptions = null;
        }
    }
    get toggleAllDisabled() {
        let optionsToRender = this.optionsToRender;
        if (!optionsToRender || optionsToRender.length === 0) {
            return true;
        }
        else {
            for (let option of optionsToRender) {
                if (!this.isOptionDisabled(option))
                    return false;
            }
            return true;
        }
    }
    toggleAll(event) {
        if (this.disabled || this.toggleAllDisabled || this.readonly) {
            return;
        }
        let allChecked = this.allChecked;
        if (allChecked)
            this.uncheckAll();
        else
            this.checkAll();
        this.onModelChange(this.value);
        this.onChange.emit({ originalEvent: event, value: this.value });
        event.preventDefault();
    }
    checkAll() {
        let optionsToRender = this.optionsToRender;
        let val = [];
        optionsToRender.forEach(opt => {
            if (!this.group) {
                let optionDisabled = this.isOptionDisabled(opt);
                if (!optionDisabled || (optionDisabled && this.isSelected(opt))) {
                    val.push(this.getOptionValue(opt));
                }
            }
            else {
                let subOptions = this.getOptionGroupChildren(opt);
                if (subOptions) {
                    subOptions.forEach(option => {
                        let optionDisabled = this.isOptionDisabled(option);
                        if (!optionDisabled || (optionDisabled && this.isSelected(option))) {
                            val.push(this.getOptionValue(option));
                        }
                    });
                }
            }
        });
        this.value = val;
    }
    uncheckAll() {
        let optionsToRender = this.optionsToRender;
        let val = [];
        optionsToRender.forEach(opt => {
            if (!this.group) {
                let optionDisabled = this.isOptionDisabled(opt);
                if (optionDisabled && this.isSelected(opt)) {
                    val.push(this.getOptionValue(opt));
                }
            }
            else {
                if (opt.items) {
                    opt.items.forEach(option => {
                        let optionDisabled = this.isOptionDisabled(option);
                        if (optionDisabled && this.isSelected(option)) {
                            val.push(this.getOptionValue(option));
                        }
                    });
                }
            }
        });
        this.value = val;
    }
    onOptionKeyDown(event, option) {
        if (this.readonly) {
            return;
        }
        let item = event.currentTarget;
        switch (event.which) {
            //down
            case 40:
                var nextItem = this.findNextItem(item);
                if (nextItem) {
                    nextItem.focus();
                }
                event.preventDefault();
                break;
            //up
            case 38:
                var prevItem = this.findPrevItem(item);
                if (prevItem) {
                    prevItem.focus();
                }
                event.preventDefault();
                break;
            //enter
            case 13:
                this.onOptionClick(event, option);
                event.preventDefault();
                break;
        }
    }
    findNextItem(item) {
        let nextItem = item.nextElementSibling;
        if (nextItem)
            return DomHandler.hasClass(nextItem, 'p-disabled') || DomHandler.isHidden(nextItem) || DomHandler.hasClass(nextItem, 'p-listbox-item-group') ? this.findNextItem(nextItem) : nextItem;
        else
            return null;
    }
    findPrevItem(item) {
        let prevItem = item.previousElementSibling;
        if (prevItem)
            return DomHandler.hasClass(prevItem, 'p-disabled') || DomHandler.isHidden(prevItem) || DomHandler.hasClass(prevItem, 'p-listbox-item-group') ? this.findPrevItem(prevItem) : prevItem;
        else
            return null;
    }
    onHeaderCheckboxFocus() {
        this.headerCheckboxFocus = true;
    }
    onHeaderCheckboxBlur() {
        this.headerCheckboxFocus = false;
    }
    ngOnDestroy() {
        if (this.translationSubscription) {
            this.translationSubscription.unsubscribe();
        }
    }
}
Listbox.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0, type: Listbox, deps: [{ token: i0.ElementRef }, { token: i0.ChangeDetectorRef }, { token: i1.FilterService }, { token: i1.PrimeNGConfig }], target: i0.ɵɵFactoryTarget.Component });
Listbox.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.0.5", type: Listbox, selector: "p-listbox", inputs: { multiple: "multiple", style: "style", styleClass: "styleClass", listStyle: "listStyle", listStyleClass: "listStyleClass", readonly: "readonly", disabled: "disabled", checkbox: "checkbox", filter: "filter", filterMatchMode: "filterMatchMode", filterLocale: "filterLocale", metaKeySelection: "metaKeySelection", dataKey: "dataKey", showToggleAll: "showToggleAll", optionLabel: "optionLabel", optionValue: "optionValue", optionGroupChildren: "optionGroupChildren", optionGroupLabel: "optionGroupLabel", optionDisabled: "optionDisabled", ariaFilterLabel: "ariaFilterLabel", filterPlaceHolder: "filterPlaceHolder", emptyFilterMessage: "emptyFilterMessage", emptyMessage: "emptyMessage", group: "group", options: "options", filterValue: "filterValue" }, outputs: { onChange: "onChange", onClick: "onClick", onDblClick: "onDblClick" }, host: { classAttribute: "p-element" }, providers: [LISTBOX_VALUE_ACCESSOR], queries: [{ propertyName: "headerFacet", first: true, predicate: Header, descendants: true }, { propertyName: "footerFacet", first: true, predicate: Footer, descendants: true }, { propertyName: "templates", predicate: PrimeTemplate }], viewQueries: [{ propertyName: "headerCheckboxViewChild", first: true, predicate: ["headerchkbox"], descendants: true }], ngImport: i0, template: `
    <div [ngClass]="{'p-listbox p-component': true, 'p-disabled': disabled}" [ngStyle]="style" [class]="styleClass">
      <div class="p-listbox-header" *ngIf="headerFacet || headerTemplate">
        <ng-content select="p-header"></ng-content>
        <ng-container *ngTemplateOutlet="headerTemplate"></ng-container>
      </div>
      <div class="p-listbox-header" *ngIf="(checkbox && multiple && showToggleAll) || filter">
        <div class="p-checkbox p-component" *ngIf="checkbox && multiple && showToggleAll" [ngClass]="{'p-checkbox-disabled': disabled || toggleAllDisabled}">
          <div class="p-hidden-accessible">
            <input type="checkbox" readonly="readonly" [checked]="allChecked" (focus)="onHeaderCheckboxFocus()" (blur)="onHeaderCheckboxBlur()" (keydown.space)="toggleAll($event)" [attr.disabled]="disabled || toggleAllDisabled">
          </div>
          <div #headerchkbox class="p-checkbox-box" [ngClass]="{'p-highlight': allChecked, 'p-focus': headerCheckboxFocus, 'p-disabled': disabled || toggleAllDisabled}" (click)="toggleAll($event)">
            <span class="p-checkbox-icon" [ngClass]="{'pi pi-check':allChecked}"></span>
          </div>
        </div>
        <div class="p-listbox-filter-container" *ngIf="filter">
          <input type="text" [value]="filterValue||''" (input)="onFilter($event)" class="p-listbox-filter p-inputtext p-component" [disabled]="disabled" [attr.placeholder]="filterPlaceHolder" [attr.aria-label]="ariaFilterLabel">
          <span class="p-listbox-filter-icon pi pi-search"></span>
        </div>
      </div>
      <div [ngClass]="'p-listbox-list-wrapper'" [ngStyle]="listStyle" [class]="listStyleClass">
        <ul class="p-listbox-list" role="listbox" aria-multiselectable="multiple">
            <ng-container *ngIf="group">
                <ng-template ngFor let-optgroup [ngForOf]="optionsToRender">
                    <li class="p-listbox-item-group">
                        <span *ngIf="!groupTemplate">{{getOptionGroupLabel(optgroup)||'empty'}}</span>
                        <ng-container *ngTemplateOutlet="groupTemplate; context: {$implicit: optgroup}"></ng-container>
                    </li>
                    <ng-container *ngTemplateOutlet="itemslist; context: {$implicit: getOptionGroupChildren(optgroup)}"></ng-container>
                </ng-template>
            </ng-container>
            <ng-container *ngIf="!group">
                    <ng-container *ngTemplateOutlet="itemslist; context: {$implicit: optionsToRender}"></ng-container>
            </ng-container>
            <ng-template #itemslist let-optionsToDisplay>
                <li *ngFor="let option of optionsToDisplay; let i = index;" [attr.tabindex]="disabled || isOptionDisabled(option) ? null : '0'" pRipple
                    [ngClass]="{'p-listbox-item':true,'p-highlight':isSelected(option), 'p-disabled': this.isOptionDisabled(option)}" role="option" [attr.aria-label]="getOptionLabel(option)"
                    [attr.aria-selected]="isSelected(option)" (click)="onOptionClick($event,option)" (dblclick)="onOptionDoubleClick($event,option)" (touchend)="onOptionTouchEnd(option)" (keydown)="onOptionKeyDown($event,option)">
                    <div class="p-checkbox p-component" *ngIf="checkbox && multiple" [ngClass]="{'p-checkbox-disabled': disabled || isOptionDisabled(option)}">
                        <div class="p-checkbox-box" [ngClass]="{'p-highlight':isSelected(option)}">
                            <span class="p-checkbox-icon" [ngClass]="{'pi pi-check':isSelected(option)}"></span>
                        </div>
                    </div>
                    <span *ngIf="!itemTemplate">{{getOptionLabel(option)}}</span>
                    <ng-container *ngTemplateOutlet="itemTemplate; context: {$implicit: option, index: i}"></ng-container>
                </li>
                <li *ngIf="hasFilter() && isEmpty(optionsToDisplay)" class="p-listbox-empty-message">
                    <ng-container *ngIf="!emptyFilterTemplate && !emptyTemplate; else emptyFilter">
                        {{emptyFilterMessageLabel}}
                    </ng-container>
                    <ng-container #emptyFilter *ngTemplateOutlet="emptyFilterTemplate || emptyTemplate"></ng-container>
                </li>
                <li *ngIf="!hasFilter() && isEmpty(optionsToDisplay)" class="p-listbox-empty-message">
                    <ng-container *ngIf="!emptyTemplate; else empty">
                        {{emptyMessageLabel}}
                    </ng-container>
                    <ng-container #empty *ngTemplateOutlet="emptyTemplate"></ng-container>
                </li>
            </ng-template>
        </ul>
      </div>
      <div class="p-listbox-footer" *ngIf="footerFacet || footerTemplate">
        <ng-content select="p-footer"></ng-content>
        <ng-container *ngTemplateOutlet="footerTemplate"></ng-container>
      </div>
    </div>
  `, isInline: true, styles: [".p-listbox-list-wrapper{overflow:auto}.p-listbox-list{list-style-type:none;margin:0;padding:0}.p-listbox-item{cursor:pointer;position:relative;overflow:hidden;-webkit-user-select:none;-ms-user-select:none;user-select:none}.p-listbox-header,.p-listbox-item{display:flex;align-items:center}.p-listbox-filter-container{position:relative;flex:1 1 auto}.p-listbox-filter-icon{position:absolute;top:50%;margin-top:-.5rem}.p-listbox-filter{width:100%}"], directives: [{ type: i2.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { type: i2.NgStyle, selector: "[ngStyle]", inputs: ["ngStyle"] }, { type: i2.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i2.NgTemplateOutlet, selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet"] }, { type: i2.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { type: i3.Ripple, selector: "[pRipple]" }], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0, type: Listbox, decorators: [{
            type: Component,
            args: [{
                    selector: 'p-listbox',
                    template: `
    <div [ngClass]="{'p-listbox p-component': true, 'p-disabled': disabled}" [ngStyle]="style" [class]="styleClass">
      <div class="p-listbox-header" *ngIf="headerFacet || headerTemplate">
        <ng-content select="p-header"></ng-content>
        <ng-container *ngTemplateOutlet="headerTemplate"></ng-container>
      </div>
      <div class="p-listbox-header" *ngIf="(checkbox && multiple && showToggleAll) || filter">
        <div class="p-checkbox p-component" *ngIf="checkbox && multiple && showToggleAll" [ngClass]="{'p-checkbox-disabled': disabled || toggleAllDisabled}">
          <div class="p-hidden-accessible">
            <input type="checkbox" readonly="readonly" [checked]="allChecked" (focus)="onHeaderCheckboxFocus()" (blur)="onHeaderCheckboxBlur()" (keydown.space)="toggleAll($event)" [attr.disabled]="disabled || toggleAllDisabled">
          </div>
          <div #headerchkbox class="p-checkbox-box" [ngClass]="{'p-highlight': allChecked, 'p-focus': headerCheckboxFocus, 'p-disabled': disabled || toggleAllDisabled}" (click)="toggleAll($event)">
            <span class="p-checkbox-icon" [ngClass]="{'pi pi-check':allChecked}"></span>
          </div>
        </div>
        <div class="p-listbox-filter-container" *ngIf="filter">
          <input type="text" [value]="filterValue||''" (input)="onFilter($event)" class="p-listbox-filter p-inputtext p-component" [disabled]="disabled" [attr.placeholder]="filterPlaceHolder" [attr.aria-label]="ariaFilterLabel">
          <span class="p-listbox-filter-icon pi pi-search"></span>
        </div>
      </div>
      <div [ngClass]="'p-listbox-list-wrapper'" [ngStyle]="listStyle" [class]="listStyleClass">
        <ul class="p-listbox-list" role="listbox" aria-multiselectable="multiple">
            <ng-container *ngIf="group">
                <ng-template ngFor let-optgroup [ngForOf]="optionsToRender">
                    <li class="p-listbox-item-group">
                        <span *ngIf="!groupTemplate">{{getOptionGroupLabel(optgroup)||'empty'}}</span>
                        <ng-container *ngTemplateOutlet="groupTemplate; context: {$implicit: optgroup}"></ng-container>
                    </li>
                    <ng-container *ngTemplateOutlet="itemslist; context: {$implicit: getOptionGroupChildren(optgroup)}"></ng-container>
                </ng-template>
            </ng-container>
            <ng-container *ngIf="!group">
                    <ng-container *ngTemplateOutlet="itemslist; context: {$implicit: optionsToRender}"></ng-container>
            </ng-container>
            <ng-template #itemslist let-optionsToDisplay>
                <li *ngFor="let option of optionsToDisplay; let i = index;" [attr.tabindex]="disabled || isOptionDisabled(option) ? null : '0'" pRipple
                    [ngClass]="{'p-listbox-item':true,'p-highlight':isSelected(option), 'p-disabled': this.isOptionDisabled(option)}" role="option" [attr.aria-label]="getOptionLabel(option)"
                    [attr.aria-selected]="isSelected(option)" (click)="onOptionClick($event,option)" (dblclick)="onOptionDoubleClick($event,option)" (touchend)="onOptionTouchEnd(option)" (keydown)="onOptionKeyDown($event,option)">
                    <div class="p-checkbox p-component" *ngIf="checkbox && multiple" [ngClass]="{'p-checkbox-disabled': disabled || isOptionDisabled(option)}">
                        <div class="p-checkbox-box" [ngClass]="{'p-highlight':isSelected(option)}">
                            <span class="p-checkbox-icon" [ngClass]="{'pi pi-check':isSelected(option)}"></span>
                        </div>
                    </div>
                    <span *ngIf="!itemTemplate">{{getOptionLabel(option)}}</span>
                    <ng-container *ngTemplateOutlet="itemTemplate; context: {$implicit: option, index: i}"></ng-container>
                </li>
                <li *ngIf="hasFilter() && isEmpty(optionsToDisplay)" class="p-listbox-empty-message">
                    <ng-container *ngIf="!emptyFilterTemplate && !emptyTemplate; else emptyFilter">
                        {{emptyFilterMessageLabel}}
                    </ng-container>
                    <ng-container #emptyFilter *ngTemplateOutlet="emptyFilterTemplate || emptyTemplate"></ng-container>
                </li>
                <li *ngIf="!hasFilter() && isEmpty(optionsToDisplay)" class="p-listbox-empty-message">
                    <ng-container *ngIf="!emptyTemplate; else empty">
                        {{emptyMessageLabel}}
                    </ng-container>
                    <ng-container #empty *ngTemplateOutlet="emptyTemplate"></ng-container>
                </li>
            </ng-template>
        </ul>
      </div>
      <div class="p-listbox-footer" *ngIf="footerFacet || footerTemplate">
        <ng-content select="p-footer"></ng-content>
        <ng-container *ngTemplateOutlet="footerTemplate"></ng-container>
      </div>
    </div>
  `,
                    providers: [LISTBOX_VALUE_ACCESSOR],
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    encapsulation: ViewEncapsulation.None,
                    styleUrls: ['./listbox.css'],
                    host: {
                        'class': 'p-element'
                    }
                }]
        }], ctorParameters: function () { return [{ type: i0.ElementRef }, { type: i0.ChangeDetectorRef }, { type: i1.FilterService }, { type: i1.PrimeNGConfig }]; }, propDecorators: { multiple: [{
                type: Input
            }], style: [{
                type: Input
            }], styleClass: [{
                type: Input
            }], listStyle: [{
                type: Input
            }], listStyleClass: [{
                type: Input
            }], readonly: [{
                type: Input
            }], disabled: [{
                type: Input
            }], checkbox: [{
                type: Input
            }], filter: [{
                type: Input
            }], filterMatchMode: [{
                type: Input
            }], filterLocale: [{
                type: Input
            }], metaKeySelection: [{
                type: Input
            }], dataKey: [{
                type: Input
            }], showToggleAll: [{
                type: Input
            }], optionLabel: [{
                type: Input
            }], optionValue: [{
                type: Input
            }], optionGroupChildren: [{
                type: Input
            }], optionGroupLabel: [{
                type: Input
            }], optionDisabled: [{
                type: Input
            }], ariaFilterLabel: [{
                type: Input
            }], filterPlaceHolder: [{
                type: Input
            }], emptyFilterMessage: [{
                type: Input
            }], emptyMessage: [{
                type: Input
            }], group: [{
                type: Input
            }], onChange: [{
                type: Output
            }], onClick: [{
                type: Output
            }], onDblClick: [{
                type: Output
            }], headerCheckboxViewChild: [{
                type: ViewChild,
                args: ['headerchkbox']
            }], headerFacet: [{
                type: ContentChild,
                args: [Header]
            }], footerFacet: [{
                type: ContentChild,
                args: [Footer]
            }], templates: [{
                type: ContentChildren,
                args: [PrimeTemplate]
            }], options: [{
                type: Input
            }], filterValue: [{
                type: Input
            }] } });
export class ListboxModule {
}
ListboxModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0, type: ListboxModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
ListboxModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0, type: ListboxModule, declarations: [Listbox], imports: [CommonModule, SharedModule, RippleModule], exports: [Listbox, SharedModule] });
ListboxModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0, type: ListboxModule, imports: [[CommonModule, SharedModule, RippleModule], SharedModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0, type: ListboxModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule, SharedModule, RippleModule],
                    exports: [Listbox, SharedModule],
                    declarations: [Listbox]
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGlzdGJveC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9hcHAvY29tcG9uZW50cy9saXN0Ym94L2xpc3Rib3gudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFFBQVEsRUFBRSxTQUFTLEVBQWMsS0FBSyxFQUFFLE1BQU0sRUFBRSxZQUFZLEVBQW9CLGVBQWUsRUFBRSxZQUFZLEVBQXlCLFVBQVUsRUFBcUIsU0FBUyxFQUFFLHVCQUF1QixFQUFFLGlCQUFpQixFQUFxQixNQUFNLGVBQWUsQ0FBQztBQUM5USxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUFFLFlBQVksRUFBRSxhQUFhLEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFBaUIsZUFBZSxFQUFpQixNQUFNLGFBQWEsQ0FBQztBQUN6SCxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sYUFBYSxDQUFDO0FBQ3pDLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDNUMsT0FBTyxFQUFFLGlCQUFpQixFQUF3QixNQUFNLGdCQUFnQixDQUFDO0FBQ3pFLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQzs7Ozs7QUFHOUMsTUFBTSxDQUFDLE1BQU0sc0JBQXNCLEdBQVE7SUFDdkMsT0FBTyxFQUFFLGlCQUFpQjtJQUMxQixXQUFXLEVBQUUsVUFBVSxDQUFDLEdBQUcsRUFBRSxDQUFDLE9BQU8sQ0FBQztJQUN0QyxLQUFLLEVBQUUsSUFBSTtDQUNkLENBQUM7QUErRUYsTUFBTSxPQUFPLE9BQU87SUFrR2hCLFlBQW1CLEVBQWMsRUFBUyxFQUFxQixFQUFTLGFBQTRCLEVBQVMsTUFBcUI7UUFBL0csT0FBRSxHQUFGLEVBQUUsQ0FBWTtRQUFTLE9BQUUsR0FBRixFQUFFLENBQW1CO1FBQVMsa0JBQWEsR0FBYixhQUFhLENBQWU7UUFBUyxXQUFNLEdBQU4sTUFBTSxDQUFlO1FBbEZ6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QUMsWUFBWSxFQUFFLFlBQVksRUFBRSxZQUFZLENBQUMsRUFDaEMsWUFBWTsyRkFHdEIsYUFBYTtrQkFMekIsUUFBUTttQkFBQztvQkFDTixPQUFPLEVBQUUsQ0FBQyxZQUFZLEVBQUUsWUFBWSxFQUFFLFlBQVksQ0FBQztvQkFDbkQsT0FBTyxFQUFFLENBQUMsT0FBTyxFQUFFLFlBQVksQ0FBQztvQkFDaEMsWUFBWSxFQUFFLENBQUMsT0FBTyxDQUFDO2lCQUMxQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5nTW9kdWxlLCBDb21wb25lbnQsIEVsZW1lbnRSZWYsIElucHV0LCBPdXRwdXQsIEV2ZW50RW1pdHRlciwgQWZ0ZXJDb250ZW50SW5pdCwgQ29udGVudENoaWxkcmVuLCBDb250ZW50Q2hpbGQsIFF1ZXJ5TGlzdCwgVGVtcGxhdGVSZWYsZm9yd2FyZFJlZiwgQ2hhbmdlRGV0ZWN0b3JSZWYsIFZpZXdDaGlsZCwgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksIFZpZXdFbmNhcHN1bGF0aW9uLCBPbkluaXQsIE9uRGVzdHJveSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IFNoYXJlZE1vZHVsZSwgUHJpbWVUZW1wbGF0ZSwgRm9vdGVyLCBIZWFkZXIsIEZpbHRlclNlcnZpY2UsIFRyYW5zbGF0aW9uS2V5cywgUHJpbWVOR0NvbmZpZyB9IGZyb20gJ3ByaW1lbmcvYXBpJztcbmltcG9ydCB7IERvbUhhbmRsZXIgfSBmcm9tICdwcmltZW5nL2RvbSc7XG5pbXBvcnQgeyBPYmplY3RVdGlscyB9IGZyb20gJ3ByaW1lbmcvdXRpbHMnO1xuaW1wb3J0IHsgTkdfVkFMVUVfQUNDRVNTT1IsIENvbnRyb2xWYWx1ZUFjY2Vzc29yIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHsgUmlwcGxlTW9kdWxlIH0gZnJvbSAncHJpbWVuZy9yaXBwbGUnO1xuaW1wb3J0IHsgU3Vic2NyaXB0aW9uIH0gZnJvbSAncnhqcyc7XG5cbmV4cG9ydCBjb25zdCBMSVNUQk9YX1ZBTFVFX0FDQ0VTU09SOiBhbnkgPSB7XG4gICAgcHJvdmlkZTogTkdfVkFMVUVfQUNDRVNTT1IsXG4gICAgdXNlRXhpc3Rpbmc6IGZvcndhcmRSZWYoKCkgPT4gTGlzdGJveCksXG4gICAgbXVsdGk6IHRydWVcbn07XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAncC1saXN0Ym94JyxcbiAgICB0ZW1wbGF0ZTogYFxuICAgIDxkaXYgW25nQ2xhc3NdPVwieydwLWxpc3Rib3ggcC1jb21wb25lbnQnOiB0cnVlLCAncC1kaXNhYmxlZCc6IGRpc2FibGVkfVwiIFtuZ1N0eWxlXT1cInN0eWxlXCIgW2NsYXNzXT1cInN0eWxlQ2xhc3NcIj5cbiAgICAgIDxkaXYgY2xhc3M9XCJwLWxpc3Rib3gtaGVhZGVyXCIgKm5nSWY9XCJoZWFkZXJGYWNldCB8fCBoZWFkZXJUZW1wbGF0ZVwiPlxuICAgICAgICA8bmctY29udGVudCBzZWxlY3Q9XCJwLWhlYWRlclwiPjwvbmctY29udGVudD5cbiAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdUZW1wbGF0ZU91dGxldD1cImhlYWRlclRlbXBsYXRlXCI+PC9uZy1jb250YWluZXI+XG4gICAgICA8L2Rpdj5cbiAgICAgIDxkaXYgY2xhc3M9XCJwLWxpc3Rib3gtaGVhZGVyXCIgKm5nSWY9XCIoY2hlY2tib3ggJiYgbXVsdGlwbGUgJiYgc2hvd1RvZ2dsZUFsbCkgfHwgZmlsdGVyXCI+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJwLWNoZWNrYm94IHAtY29tcG9uZW50XCIgKm5nSWY9XCJjaGVja2JveCAmJiBtdWx0aXBsZSAmJiBzaG93VG9nZ2xlQWxsXCIgW25nQ2xhc3NdPVwieydwLWNoZWNrYm94LWRpc2FibGVkJzogZGlzYWJsZWQgfHwgdG9nZ2xlQWxsRGlzYWJsZWR9XCI+XG4gICAgICAgICAgPGRpdiBjbGFzcz1cInAtaGlkZGVuLWFjY2Vzc2libGVcIj5cbiAgICAgICAgICAgIDxpbnB1dCB0eXBlPVwiY2hlY2tib3hcIiByZWFkb25seT1cInJlYWRvbmx5XCIgW2NoZWNrZWRdPVwiYWxsQ2hlY2tlZFwiIChmb2N1cyk9XCJvbkhlYWRlckNoZWNrYm94Rm9jdXMoKVwiIChibHVyKT1cIm9uSGVhZGVyQ2hlY2tib3hCbHVyKClcIiAoa2V5ZG93bi5zcGFjZSk9XCJ0b2dnbGVBbGwoJGV2ZW50KVwiIFthdHRyLmRpc2FibGVkXT1cImRpc2FibGVkIHx8IHRvZ2dsZUFsbERpc2FibGVkXCI+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPGRpdiAjaGVhZGVyY2hrYm94IGNsYXNzPVwicC1jaGVja2JveC1ib3hcIiBbbmdDbGFzc109XCJ7J3AtaGlnaGxpZ2h0JzogYWxsQ2hlY2tlZCwgJ3AtZm9jdXMnOiBoZWFkZXJDaGVja2JveEZvY3VzLCAncC1kaXNhYmxlZCc6IGRpc2FibGVkIHx8IHRvZ2dsZUFsbERpc2FibGVkfVwiIChjbGljayk9XCJ0b2dnbGVBbGwoJGV2ZW50KVwiPlxuICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJwLWNoZWNrYm94LWljb25cIiBbbmdDbGFzc109XCJ7J3BpIHBpLWNoZWNrJzphbGxDaGVja2VkfVwiPjwvc3Bhbj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJwLWxpc3Rib3gtZmlsdGVyLWNvbnRhaW5lclwiICpuZ0lmPVwiZmlsdGVyXCI+XG4gICAgICAgICAgPGlucHV0IHR5cGU9XCJ0ZXh0XCIgW3ZhbHVlXT1cImZpbHRlclZhbHVlfHwnJ1wiIChpbnB1dCk9XCJvbkZpbHRlcigkZXZlbnQpXCIgY2xhc3M9XCJwLWxpc3Rib3gtZmlsdGVyIHAtaW5wdXR0ZXh0IHAtY29tcG9uZW50XCIgW2Rpc2FibGVkXT1cImRpc2FibGVkXCIgW2F0dHIucGxhY2Vob2xkZXJdPVwiZmlsdGVyUGxhY2VIb2xkZXJcIiBbYXR0ci5hcmlhLWxhYmVsXT1cImFyaWFGaWx0ZXJMYWJlbFwiPlxuICAgICAgICAgIDxzcGFuIGNsYXNzPVwicC1saXN0Ym94LWZpbHRlci1pY29uIHBpIHBpLXNlYXJjaFwiPjwvc3Bhbj5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICAgIDxkaXYgW25nQ2xhc3NdPVwiJ3AtbGlzdGJveC1saXN0LXdyYXBwZXInXCIgW25nU3R5bGVdPVwibGlzdFN0eWxlXCIgW2NsYXNzXT1cImxpc3RTdHlsZUNsYXNzXCI+XG4gICAgICAgIDx1bCBjbGFzcz1cInAtbGlzdGJveC1saXN0XCIgcm9sZT1cImxpc3Rib3hcIiBhcmlhLW11bHRpc2VsZWN0YWJsZT1cIm11bHRpcGxlXCI+XG4gICAgICAgICAgICA8bmctY29udGFpbmVyICpuZ0lmPVwiZ3JvdXBcIj5cbiAgICAgICAgICAgICAgICA8bmctdGVtcGxhdGUgbmdGb3IgbGV0LW9wdGdyb3VwIFtuZ0Zvck9mXT1cIm9wdGlvbnNUb1JlbmRlclwiPlxuICAgICAgICAgICAgICAgICAgICA8bGkgY2xhc3M9XCJwLWxpc3Rib3gtaXRlbS1ncm91cFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gKm5nSWY9XCIhZ3JvdXBUZW1wbGF0ZVwiPnt7Z2V0T3B0aW9uR3JvdXBMYWJlbChvcHRncm91cCl8fCdlbXB0eSd9fTwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxuZy1jb250YWluZXIgKm5nVGVtcGxhdGVPdXRsZXQ9XCJncm91cFRlbXBsYXRlOyBjb250ZXh0OiB7JGltcGxpY2l0OiBvcHRncm91cH1cIj48L25nLWNvbnRhaW5lcj5cbiAgICAgICAgICAgICAgICAgICAgPC9saT5cbiAgICAgICAgICAgICAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdUZW1wbGF0ZU91dGxldD1cIml0ZW1zbGlzdDsgY29udGV4dDogeyRpbXBsaWNpdDogZ2V0T3B0aW9uR3JvdXBDaGlsZHJlbihvcHRncm91cCl9XCI+PC9uZy1jb250YWluZXI+XG4gICAgICAgICAgICAgICAgPC9uZy10ZW1wbGF0ZT5cbiAgICAgICAgICAgIDwvbmctY29udGFpbmVyPlxuICAgICAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdJZj1cIiFncm91cFwiPlxuICAgICAgICAgICAgICAgICAgICA8bmctY29udGFpbmVyICpuZ1RlbXBsYXRlT3V0bGV0PVwiaXRlbXNsaXN0OyBjb250ZXh0OiB7JGltcGxpY2l0OiBvcHRpb25zVG9SZW5kZXJ9XCI+PC9uZy1jb250YWluZXI+XG4gICAgICAgICAgICA8L25nLWNvbnRhaW5lcj5cbiAgICAgICAgICAgIDxuZy10ZW1wbGF0ZSAjaXRlbXNsaXN0IGxldC1vcHRpb25zVG9EaXNwbGF5PlxuICAgICAgICAgICAgICAgIDxsaSAqbmdGb3I9XCJsZXQgb3B0aW9uIG9mIG9wdGlvbnNUb0Rpc3BsYXk7IGxldCBpID0gaW5kZXg7XCIgW2F0dHIudGFiaW5kZXhdPVwiZGlzYWJsZWQgfHwgaXNPcHRpb25EaXNhYmxlZChvcHRpb24pID8gbnVsbCA6ICcwJ1wiIHBSaXBwbGVcbiAgICAgICAgICAgICAgICAgICAgW25nQ2xhc3NdPVwieydwLWxpc3Rib3gtaXRlbSc6dHJ1ZSwncC1oaWdobGlnaHQnOmlzU2VsZWN0ZWQob3B0aW9uKSwgJ3AtZGlzYWJsZWQnOiB0aGlzLmlzT3B0aW9uRGlzYWJsZWQob3B0aW9uKX1cIiByb2xlPVwib3B0aW9uXCIgW2F0dHIuYXJpYS1sYWJlbF09XCJnZXRPcHRpb25MYWJlbChvcHRpb24pXCJcbiAgICAgICAgICAgICAgICAgICAgW2F0dHIuYXJpYS1zZWxlY3RlZF09XCJpc1NlbGVjdGVkKG9wdGlvbilcIiAoY2xpY2spPVwib25PcHRpb25DbGljaygkZXZlbnQsb3B0aW9uKVwiIChkYmxjbGljayk9XCJvbk9wdGlvbkRvdWJsZUNsaWNrKCRldmVudCxvcHRpb24pXCIgKHRvdWNoZW5kKT1cIm9uT3B0aW9uVG91Y2hFbmQob3B0aW9uKVwiIChrZXlkb3duKT1cIm9uT3B0aW9uS2V5RG93bigkZXZlbnQsb3B0aW9uKVwiPlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwicC1jaGVja2JveCBwLWNvbXBvbmVudFwiICpuZ0lmPVwiY2hlY2tib3ggJiYgbXVsdGlwbGVcIiBbbmdDbGFzc109XCJ7J3AtY2hlY2tib3gtZGlzYWJsZWQnOiBkaXNhYmxlZCB8fCBpc09wdGlvbkRpc2FibGVkKG9wdGlvbil9XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwicC1jaGVja2JveC1ib3hcIiBbbmdDbGFzc109XCJ7J3AtaGlnaGxpZ2h0Jzppc1NlbGVjdGVkKG9wdGlvbil9XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJwLWNoZWNrYm94LWljb25cIiBbbmdDbGFzc109XCJ7J3BpIHBpLWNoZWNrJzppc1NlbGVjdGVkKG9wdGlvbil9XCI+PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICA8c3BhbiAqbmdJZj1cIiFpdGVtVGVtcGxhdGVcIj57e2dldE9wdGlvbkxhYmVsKG9wdGlvbil9fTwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdUZW1wbGF0ZU91dGxldD1cIml0ZW1UZW1wbGF0ZTsgY29udGV4dDogeyRpbXBsaWNpdDogb3B0aW9uLCBpbmRleDogaX1cIj48L25nLWNvbnRhaW5lcj5cbiAgICAgICAgICAgICAgICA8L2xpPlxuICAgICAgICAgICAgICAgIDxsaSAqbmdJZj1cImhhc0ZpbHRlcigpICYmIGlzRW1wdHkob3B0aW9uc1RvRGlzcGxheSlcIiBjbGFzcz1cInAtbGlzdGJveC1lbXB0eS1tZXNzYWdlXCI+XG4gICAgICAgICAgICAgICAgICAgIDxuZy1jb250YWluZXIgKm5nSWY9XCIhZW1wdHlGaWx0ZXJUZW1wbGF0ZSAmJiAhZW1wdHlUZW1wbGF0ZTsgZWxzZSBlbXB0eUZpbHRlclwiPlxuICAgICAgICAgICAgICAgICAgICAgICAge3tlbXB0eUZpbHRlck1lc3NhZ2VMYWJlbH19XG4gICAgICAgICAgICAgICAgICAgIDwvbmctY29udGFpbmVyPlxuICAgICAgICAgICAgICAgICAgICA8bmctY29udGFpbmVyICNlbXB0eUZpbHRlciAqbmdUZW1wbGF0ZU91dGxldD1cImVtcHR5RmlsdGVyVGVtcGxhdGUgfHwgZW1wdHlUZW1wbGF0ZVwiPjwvbmctY29udGFpbmVyPlxuICAgICAgICAgICAgICAgIDwvbGk+XG4gICAgICAgICAgICAgICAgPGxpICpuZ0lmPVwiIWhhc0ZpbHRlcigpICYmIGlzRW1wdHkob3B0aW9uc1RvRGlzcGxheSlcIiBjbGFzcz1cInAtbGlzdGJveC1lbXB0eS1tZXNzYWdlXCI+XG4gICAgICAgICAgICAgICAgICAgIDxuZy1jb250YWluZXIgKm5nSWY9XCIhZW1wdHlUZW1wbGF0ZTsgZWxzZSBlbXB0eVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAge3tlbXB0eU1lc3NhZ2VMYWJlbH19XG4gICAgICAgICAgICAgICAgICAgIDwvbmctY29udGFpbmVyPlxuICAgICAgICAgICAgICAgICAgICA8bmctY29udGFpbmVyICNlbXB0eSAqbmdUZW1wbGF0ZU91dGxldD1cImVtcHR5VGVtcGxhdGVcIj48L25nLWNvbnRhaW5lcj5cbiAgICAgICAgICAgICAgICA8L2xpPlxuICAgICAgICAgICAgPC9uZy10ZW1wbGF0ZT5cbiAgICAgICAgPC91bD5cbiAgICAgIDwvZGl2PlxuICAgICAgPGRpdiBjbGFzcz1cInAtbGlzdGJveC1mb290ZXJcIiAqbmdJZj1cImZvb3RlckZhY2V0IHx8IGZvb3RlclRlbXBsYXRlXCI+XG4gICAgICAgIDxuZy1jb250ZW50IHNlbGVjdD1cInAtZm9vdGVyXCI+PC9uZy1jb250ZW50PlxuICAgICAgICA8bmctY29udGFpbmVyICpuZ1RlbXBsYXRlT3V0bGV0PVwiZm9vdGVyVGVtcGxhdGVcIj48L25nLWNvbnRhaW5lcj5cbiAgICAgIDwvZGl2PlxuICAgIDwvZGl2PlxuICBgLFxuICAgIHByb3ZpZGVyczogW0xJU1RCT1hfVkFMVUVfQUNDRVNTT1JdLFxuICAgIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxuICAgIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmUsXG4gICAgc3R5bGVVcmxzOiBbJy4vbGlzdGJveC5jc3MnXSxcbiAgICBob3N0OiB7XG4gICAgICAgICdjbGFzcyc6ICdwLWVsZW1lbnQnXG4gICAgfVxufSlcbmV4cG9ydCBjbGFzcyBMaXN0Ym94IGltcGxlbWVudHMgQWZ0ZXJDb250ZW50SW5pdCwgT25Jbml0LCBDb250cm9sVmFsdWVBY2Nlc3NvciwgT25EZXN0cm95IHtcblxuICAgIEBJbnB1dCgpIG11bHRpcGxlOiBib29sZWFuO1xuXG4gICAgQElucHV0KCkgc3R5bGU6IGFueTtcblxuICAgIEBJbnB1dCgpIHN0eWxlQ2xhc3M6IHN0cmluZztcblxuICAgIEBJbnB1dCgpIGxpc3RTdHlsZTogYW55O1xuXG4gICAgQElucHV0KCkgbGlzdFN0eWxlQ2xhc3M6IHN0cmluZztcblxuICAgIEBJbnB1dCgpIHJlYWRvbmx5OiBib29sZWFuO1xuXG4gICAgQElucHV0KCkgZGlzYWJsZWQ6IGJvb2xlYW47XG5cbiAgICBASW5wdXQoKSBjaGVja2JveDogYm9vbGVhbiA9IGZhbHNlO1xuXG4gICAgQElucHV0KCkgZmlsdGVyOiBib29sZWFuID0gZmFsc2U7XG5cbiAgICBASW5wdXQoKSBmaWx0ZXJNYXRjaE1vZGU6IHN0cmluZyA9ICdjb250YWlucyc7XG5cbiAgICBASW5wdXQoKSBmaWx0ZXJMb2NhbGU6IHN0cmluZztcblxuICAgIEBJbnB1dCgpIG1ldGFLZXlTZWxlY3Rpb246IGJvb2xlYW4gPSB0cnVlO1xuXG4gICAgQElucHV0KCkgZGF0YUtleTogc3RyaW5nO1xuXG4gICAgQElucHV0KCkgc2hvd1RvZ2dsZUFsbDogYm9vbGVhbiA9IHRydWU7XG5cbiAgICBASW5wdXQoKSBvcHRpb25MYWJlbDogc3RyaW5nO1xuXG4gICAgQElucHV0KCkgb3B0aW9uVmFsdWU6IHN0cmluZztcblxuICAgIEBJbnB1dCgpIG9wdGlvbkdyb3VwQ2hpbGRyZW46IHN0cmluZyA9IFwiaXRlbXNcIjtcblxuICAgIEBJbnB1dCgpIG9wdGlvbkdyb3VwTGFiZWw6IHN0cmluZztcblxuICAgIEBJbnB1dCgpIG9wdGlvbkRpc2FibGVkOiBzdHJpbmc7XG5cbiAgICBASW5wdXQoKSBhcmlhRmlsdGVyTGFiZWw6IHN0cmluZztcblxuICAgIEBJbnB1dCgpIGZpbHRlclBsYWNlSG9sZGVyOiBzdHJpbmc7XG5cbiAgICBASW5wdXQoKSBlbXB0eUZpbHRlck1lc3NhZ2U6IHN0cmluZztcblxuICAgIEBJbnB1dCgpIGVtcHR5TWVzc2FnZTogc3RyaW5nO1xuXG4gICAgQElucHV0KCkgZ3JvdXA6IGJvb2xlYW47XG5cbiAgICBAT3V0cHV0KCkgb25DaGFuZ2U6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG4gICAgQE91dHB1dCgpIG9uQ2xpY2s6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG4gICAgQE91dHB1dCgpIG9uRGJsQ2xpY2s6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG4gICAgQFZpZXdDaGlsZCgnaGVhZGVyY2hrYm94JykgaGVhZGVyQ2hlY2tib3hWaWV3Q2hpbGQ6IEVsZW1lbnRSZWY7XG5cbiAgICBAQ29udGVudENoaWxkKEhlYWRlcikgaGVhZGVyRmFjZXQ7XG5cbiAgICBAQ29udGVudENoaWxkKEZvb3RlcikgZm9vdGVyRmFjZXQ7XG5cbiAgICBAQ29udGVudENoaWxkcmVuKFByaW1lVGVtcGxhdGUpIHRlbXBsYXRlczogUXVlcnlMaXN0PGFueT47XG5cbiAgICBwdWJsaWMgX29wdGlvbnM6IGFueVtdO1xuXG4gICAgcHVibGljIGl0ZW1UZW1wbGF0ZTogVGVtcGxhdGVSZWY8YW55PjtcblxuICAgIHB1YmxpYyBncm91cFRlbXBsYXRlOiBUZW1wbGF0ZVJlZjxhbnk+O1xuXG4gICAgcHVibGljIGhlYWRlclRlbXBsYXRlOiBUZW1wbGF0ZVJlZjxhbnk+O1xuXG4gICAgcHVibGljIGZvb3RlclRlbXBsYXRlOiBUZW1wbGF0ZVJlZjxhbnk+O1xuXG4gICAgcHVibGljIGVtcHR5RmlsdGVyVGVtcGxhdGU6IFRlbXBsYXRlUmVmPGFueT47XG5cbiAgICBwdWJsaWMgZW1wdHlUZW1wbGF0ZTogVGVtcGxhdGVSZWY8YW55PjtcblxuICAgIHB1YmxpYyBfZmlsdGVyVmFsdWU6IHN0cmluZztcblxuICAgIHB1YmxpYyBfZmlsdGVyZWRPcHRpb25zOiBhbnlbXTtcblxuICAgIHB1YmxpYyBmaWx0ZXJlZDogYm9vbGVhbjtcblxuICAgIHB1YmxpYyB2YWx1ZTogYW55O1xuXG4gICAgcHVibGljIG9uTW9kZWxDaGFuZ2U6IEZ1bmN0aW9uID0gKCkgPT4geyB9O1xuXG4gICAgcHVibGljIG9uTW9kZWxUb3VjaGVkOiBGdW5jdGlvbiA9ICgpID0+IHsgfTtcblxuICAgIHB1YmxpYyBvcHRpb25Ub3VjaGVkOiBib29sZWFuO1xuXG4gICAgcHVibGljIGZvY3VzOiBib29sZWFuO1xuXG4gICAgcHVibGljIGhlYWRlckNoZWNrYm94Rm9jdXM6IGJvb2xlYW47XG5cbiAgICB0cmFuc2xhdGlvblN1YnNjcmlwdGlvbjogU3Vic2NyaXB0aW9uO1xuXG4gICAgY29uc3RydWN0b3IocHVibGljIGVsOiBFbGVtZW50UmVmLCBwdWJsaWMgY2Q6IENoYW5nZURldGVjdG9yUmVmLCBwdWJsaWMgZmlsdGVyU2VydmljZTogRmlsdGVyU2VydmljZSwgcHVibGljIGNvbmZpZzogUHJpbWVOR0NvbmZpZykgeyB9XG5cbiAgICBASW5wdXQoKSBnZXQgb3B0aW9ucygpOiBhbnlbXSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9vcHRpb25zO1xuICAgIH1cblxuICAgIHNldCBvcHRpb25zKHZhbDogYW55W10pIHtcbiAgICAgICAgdGhpcy5fb3B0aW9ucyA9IHZhbDtcblxuICAgICAgICBpZiAodGhpcy5oYXNGaWx0ZXIoKSlcbiAgICAgICAgICAgIHRoaXMuYWN0aXZhdGVGaWx0ZXIoKTtcbiAgICB9XG5cbiAgICBASW5wdXQoKSBnZXQgZmlsdGVyVmFsdWUoKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2ZpbHRlclZhbHVlO1xuICAgIH1cblxuICAgIHNldCBmaWx0ZXJWYWx1ZSh2YWw6IHN0cmluZykge1xuICAgICAgICB0aGlzLl9maWx0ZXJWYWx1ZSA9IHZhbDtcbiAgICAgICAgdGhpcy5hY3RpdmF0ZUZpbHRlcigpO1xuICAgIH1cblxuICAgIG5nT25Jbml0KCkge1xuICAgICAgICB0aGlzLnRyYW5zbGF0aW9uU3Vic2NyaXB0aW9uID0gdGhpcy5jb25maWcudHJhbnNsYXRpb25PYnNlcnZlci5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5jZC5tYXJrRm9yQ2hlY2soKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgbmdBZnRlckNvbnRlbnRJbml0KCkge1xuICAgICAgICB0aGlzLnRlbXBsYXRlcy5mb3JFYWNoKChpdGVtKSA9PiB7XG4gICAgICAgICAgICBzd2l0Y2ggKGl0ZW0uZ2V0VHlwZSgpKSB7XG4gICAgICAgICAgICAgICAgY2FzZSAnaXRlbSc6XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaXRlbVRlbXBsYXRlID0gaXRlbS50ZW1wbGF0ZTtcbiAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgICAgIGNhc2UgJ2dyb3VwJzpcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5ncm91cFRlbXBsYXRlID0gaXRlbS50ZW1wbGF0ZTtcbiAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgICAgIGNhc2UgJ2hlYWRlcic6XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaGVhZGVyVGVtcGxhdGUgPSBpdGVtLnRlbXBsYXRlO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICAgICAgY2FzZSAnZm9vdGVyJzpcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5mb290ZXJUZW1wbGF0ZSA9IGl0ZW0udGVtcGxhdGU7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgICAgICBjYXNlICdlbXB0eSc6XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZW1wdHlUZW1wbGF0ZSA9IGl0ZW0udGVtcGxhdGU7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgICAgICBjYXNlICdlbXB0eWZpbHRlcic6XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZW1wdHlGaWx0ZXJUZW1wbGF0ZSA9IGl0ZW0udGVtcGxhdGU7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgICAgICB0aGlzLml0ZW1UZW1wbGF0ZSA9IGl0ZW0udGVtcGxhdGU7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGdldE9wdGlvbkxhYmVsKG9wdGlvbjogYW55KSB7XG4gICAgICAgIHJldHVybiB0aGlzLm9wdGlvbkxhYmVsID8gT2JqZWN0VXRpbHMucmVzb2x2ZUZpZWxkRGF0YShvcHRpb24sIHRoaXMub3B0aW9uTGFiZWwpIDogKG9wdGlvbi5sYWJlbCAhPSB1bmRlZmluZWQgPyBvcHRpb24ubGFiZWwgOiBvcHRpb24pO1xuICAgIH1cblxuICAgIGdldE9wdGlvbkdyb3VwQ2hpbGRyZW4ob3B0aW9uR3JvdXA6IGFueSkge1xuICAgICAgICByZXR1cm4gdGhpcy5vcHRpb25Hcm91cENoaWxkcmVuID8gT2JqZWN0VXRpbHMucmVzb2x2ZUZpZWxkRGF0YShvcHRpb25Hcm91cCwgdGhpcy5vcHRpb25Hcm91cENoaWxkcmVuKSA6IG9wdGlvbkdyb3VwLml0ZW1zO1xuICAgIH1cblxuICAgIGdldE9wdGlvbkdyb3VwTGFiZWwob3B0aW9uR3JvdXA6IGFueSkge1xuICAgICAgICByZXR1cm4gdGhpcy5vcHRpb25Hcm91cExhYmVsID8gT2JqZWN0VXRpbHMucmVzb2x2ZUZpZWxkRGF0YShvcHRpb25Hcm91cCwgdGhpcy5vcHRpb25Hcm91cExhYmVsKSA6IChvcHRpb25Hcm91cC5sYWJlbCAhPSB1bmRlZmluZWQgPyBvcHRpb25Hcm91cC5sYWJlbCA6IG9wdGlvbkdyb3VwKTtcbiAgICB9XG5cbiAgICBnZXRPcHRpb25WYWx1ZShvcHRpb246IGFueSkge1xuICAgICAgICByZXR1cm4gdGhpcy5vcHRpb25WYWx1ZSA/IE9iamVjdFV0aWxzLnJlc29sdmVGaWVsZERhdGEob3B0aW9uLCB0aGlzLm9wdGlvblZhbHVlKSA6ICh0aGlzLm9wdGlvbkxhYmVsIHx8IG9wdGlvbi52YWx1ZSA9PT0gdW5kZWZpbmVkID8gb3B0aW9uIDogb3B0aW9uLnZhbHVlKTtcbiAgICB9XG5cbiAgICBpc09wdGlvbkRpc2FibGVkKG9wdGlvbjogYW55KSB7XG4gICAgICAgIHJldHVybiB0aGlzLm9wdGlvbkRpc2FibGVkID8gT2JqZWN0VXRpbHMucmVzb2x2ZUZpZWxkRGF0YShvcHRpb24sIHRoaXMub3B0aW9uRGlzYWJsZWQpIDogKG9wdGlvbi5kaXNhYmxlZCAhPT0gdW5kZWZpbmVkID8gb3B0aW9uLmRpc2FibGVkIDogZmFsc2UpO1xuICAgIH1cblxuICAgIHdyaXRlVmFsdWUodmFsdWU6IGFueSk6IHZvaWQge1xuICAgICAgICB0aGlzLnZhbHVlID0gdmFsdWU7XG4gICAgICAgIHRoaXMuY2QubWFya0ZvckNoZWNrKCk7XG4gICAgfVxuXG4gICAgcmVnaXN0ZXJPbkNoYW5nZShmbjogRnVuY3Rpb24pOiB2b2lkIHtcbiAgICAgICAgdGhpcy5vbk1vZGVsQ2hhbmdlID0gZm47XG4gICAgfVxuXG4gICAgcmVnaXN0ZXJPblRvdWNoZWQoZm46IEZ1bmN0aW9uKTogdm9pZCB7XG4gICAgICAgIHRoaXMub25Nb2RlbFRvdWNoZWQgPSBmbjtcbiAgICB9XG5cbiAgICBzZXREaXNhYmxlZFN0YXRlKHZhbDogYm9vbGVhbik6IHZvaWQge1xuICAgICAgICB0aGlzLmRpc2FibGVkID0gdmFsO1xuICAgICAgICB0aGlzLmNkLm1hcmtGb3JDaGVjaygpO1xuICAgIH1cblxuICAgIG9uT3B0aW9uQ2xpY2soZXZlbnQ6IEV2ZW50LCBvcHRpb246IGFueSkge1xuICAgICAgICBpZiAodGhpcy5kaXNhYmxlZCB8fCB0aGlzLmlzT3B0aW9uRGlzYWJsZWQob3B0aW9uKSB8fCB0aGlzLnJlYWRvbmx5KSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5tdWx0aXBsZSkge1xuICAgICAgICAgICAgaWYgKHRoaXMuY2hlY2tib3gpXG4gICAgICAgICAgICAgICAgdGhpcy5vbk9wdGlvbkNsaWNrQ2hlY2tib3goZXZlbnQsIG9wdGlvbik7XG4gICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgICAgdGhpcy5vbk9wdGlvbkNsaWNrTXVsdGlwbGUoZXZlbnQsIG9wdGlvbik7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0aGlzLm9uT3B0aW9uQ2xpY2tTaW5nbGUoZXZlbnQsIG9wdGlvbik7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5vbkNsaWNrLmVtaXQoe1xuICAgICAgICAgICAgb3JpZ2luYWxFdmVudDogZXZlbnQsXG4gICAgICAgICAgICBvcHRpb246IG9wdGlvbixcbiAgICAgICAgICAgIHZhbHVlOiB0aGlzLnZhbHVlXG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLm9wdGlvblRvdWNoZWQgPSBmYWxzZTtcbiAgICB9XG5cbiAgICBvbk9wdGlvblRvdWNoRW5kKG9wdGlvbjogYW55KSB7XG4gICAgICAgIGlmICh0aGlzLmRpc2FibGVkIHx8IHRoaXMuaXNPcHRpb25EaXNhYmxlZChvcHRpb24pIHx8IHRoaXMucmVhZG9ubHkpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMub3B0aW9uVG91Y2hlZCA9IHRydWU7XG4gICAgfVxuXG4gICAgb25PcHRpb25Eb3VibGVDbGljayhldmVudDogRXZlbnQsIG9wdGlvbjogYW55KTogYW55IHtcbiAgICAgICAgaWYgKHRoaXMuZGlzYWJsZWQgfHwgdGhpcy5pc09wdGlvbkRpc2FibGVkKG9wdGlvbikgfHwgdGhpcy5yZWFkb25seSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5vbkRibENsaWNrLmVtaXQoe1xuICAgICAgICAgICAgb3JpZ2luYWxFdmVudDogZXZlbnQsXG4gICAgICAgICAgICBvcHRpb246IG9wdGlvbixcbiAgICAgICAgICAgIHZhbHVlOiB0aGlzLnZhbHVlXG4gICAgICAgIH0pXG4gICAgfVxuXG4gICAgb25PcHRpb25DbGlja1NpbmdsZShldmVudCwgb3B0aW9uKSB7XG4gICAgICAgIGxldCBzZWxlY3RlZCA9IHRoaXMuaXNTZWxlY3RlZChvcHRpb24pO1xuICAgICAgICBsZXQgdmFsdWVDaGFuZ2VkID0gZmFsc2U7XG4gICAgICAgIGxldCBtZXRhU2VsZWN0aW9uID0gdGhpcy5vcHRpb25Ub3VjaGVkID8gZmFsc2UgOiB0aGlzLm1ldGFLZXlTZWxlY3Rpb247XG5cbiAgICAgICAgaWYgKG1ldGFTZWxlY3Rpb24pIHtcbiAgICAgICAgICAgIGxldCBtZXRhS2V5ID0gKGV2ZW50Lm1ldGFLZXkgfHwgZXZlbnQuY3RybEtleSk7XG5cbiAgICAgICAgICAgIGlmIChzZWxlY3RlZCkge1xuICAgICAgICAgICAgICAgIGlmIChtZXRhS2V5KSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMudmFsdWUgPSBudWxsO1xuICAgICAgICAgICAgICAgICAgICB2YWx1ZUNoYW5nZWQgPSB0cnVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMudmFsdWUgPSB0aGlzLmdldE9wdGlvblZhbHVlKG9wdGlvbik7XG4gICAgICAgICAgICAgICAgdmFsdWVDaGFuZ2VkID0gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMudmFsdWUgPSBzZWxlY3RlZCA/IG51bGwgOiB0aGlzLmdldE9wdGlvblZhbHVlKG9wdGlvbik7XG4gICAgICAgICAgICB2YWx1ZUNoYW5nZWQgPSB0cnVlO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHZhbHVlQ2hhbmdlZCkge1xuICAgICAgICAgICAgdGhpcy5vbk1vZGVsQ2hhbmdlKHRoaXMudmFsdWUpO1xuICAgICAgICAgICAgdGhpcy5vbkNoYW5nZS5lbWl0KHtcbiAgICAgICAgICAgICAgICBvcmlnaW5hbEV2ZW50OiBldmVudCxcbiAgICAgICAgICAgICAgICB2YWx1ZTogdGhpcy52YWx1ZVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBvbk9wdGlvbkNsaWNrTXVsdGlwbGUoZXZlbnQsIG9wdGlvbikge1xuICAgICAgICBsZXQgc2VsZWN0ZWQgPSB0aGlzLmlzU2VsZWN0ZWQob3B0aW9uKTtcbiAgICAgICAgbGV0IHZhbHVlQ2hhbmdlZCA9IGZhbHNlO1xuICAgICAgICBsZXQgbWV0YVNlbGVjdGlvbiA9IHRoaXMub3B0aW9uVG91Y2hlZCA/IGZhbHNlIDogdGhpcy5tZXRhS2V5U2VsZWN0aW9uO1xuXG4gICAgICAgIGlmIChtZXRhU2VsZWN0aW9uKSB7XG4gICAgICAgICAgICBsZXQgbWV0YUtleSA9IChldmVudC5tZXRhS2V5IHx8IGV2ZW50LmN0cmxLZXkpO1xuXG4gICAgICAgICAgICBpZiAoc2VsZWN0ZWQpIHtcbiAgICAgICAgICAgICAgICBpZiAobWV0YUtleSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnJlbW92ZU9wdGlvbihvcHRpb24pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy52YWx1ZSA9IFt0aGlzLmdldE9wdGlvblZhbHVlKG9wdGlvbildO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB2YWx1ZUNoYW5nZWQgPSB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy52YWx1ZSA9IChtZXRhS2V5KSA/IHRoaXMudmFsdWUgfHwgW10gOiBbXTtcbiAgICAgICAgICAgICAgICB0aGlzLnZhbHVlID0gWy4uLnRoaXMudmFsdWUsIHRoaXMuZ2V0T3B0aW9uVmFsdWUob3B0aW9uKV07XG4gICAgICAgICAgICAgICAgdmFsdWVDaGFuZ2VkID0gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGlmIChzZWxlY3RlZCkge1xuICAgICAgICAgICAgICAgIHRoaXMucmVtb3ZlT3B0aW9uKG9wdGlvbik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLnZhbHVlID0gWy4uLnRoaXMudmFsdWUgfHwgW10sIHRoaXMuZ2V0T3B0aW9uVmFsdWUob3B0aW9uKV07XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHZhbHVlQ2hhbmdlZCA9IHRydWU7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodmFsdWVDaGFuZ2VkKSB7XG4gICAgICAgICAgICB0aGlzLm9uTW9kZWxDaGFuZ2UodGhpcy52YWx1ZSk7XG4gICAgICAgICAgICB0aGlzLm9uQ2hhbmdlLmVtaXQoe1xuICAgICAgICAgICAgICAgIG9yaWdpbmFsRXZlbnQ6IGV2ZW50LFxuICAgICAgICAgICAgICAgIHZhbHVlOiB0aGlzLnZhbHVlXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIG9uT3B0aW9uQ2xpY2tDaGVja2JveChldmVudCwgb3B0aW9uKSB7XG4gICAgICAgIGlmICh0aGlzLmRpc2FibGVkIHx8IHRoaXMucmVhZG9ubHkpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGxldCBzZWxlY3RlZCA9IHRoaXMuaXNTZWxlY3RlZChvcHRpb24pO1xuXG4gICAgICAgIGlmIChzZWxlY3RlZCkge1xuICAgICAgICAgICAgdGhpcy5yZW1vdmVPcHRpb24ob3B0aW9uKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMudmFsdWUgPSB0aGlzLnZhbHVlID8gdGhpcy52YWx1ZSA6IFtdO1xuICAgICAgICAgICAgdGhpcy52YWx1ZSA9IFsuLi50aGlzLnZhbHVlLCB0aGlzLmdldE9wdGlvblZhbHVlKG9wdGlvbildO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5vbk1vZGVsQ2hhbmdlKHRoaXMudmFsdWUpO1xuICAgICAgICB0aGlzLm9uQ2hhbmdlLmVtaXQoe1xuICAgICAgICAgICAgb3JpZ2luYWxFdmVudDogZXZlbnQsXG4gICAgICAgICAgICB2YWx1ZTogdGhpcy52YWx1ZVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICByZW1vdmVPcHRpb24ob3B0aW9uOiBhbnkpOiB2b2lkIHtcbiAgICAgICAgdGhpcy52YWx1ZSA9IHRoaXMudmFsdWUuZmlsdGVyKHZhbCA9PiAhT2JqZWN0VXRpbHMuZXF1YWxzKHZhbCwgdGhpcy5nZXRPcHRpb25WYWx1ZShvcHRpb24pLCB0aGlzLmRhdGFLZXkpKTtcbiAgICB9XG5cbiAgICBpc1NlbGVjdGVkKG9wdGlvbjogYW55KSB7XG4gICAgICAgIGxldCBzZWxlY3RlZCA9IGZhbHNlO1xuICAgICAgICBsZXQgb3B0aW9uVmFsdWUgPSB0aGlzLmdldE9wdGlvblZhbHVlKG9wdGlvbik7XG5cbiAgICAgICAgaWYgKHRoaXMubXVsdGlwbGUpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLnZhbHVlKSB7XG4gICAgICAgICAgICAgICAgZm9yIChsZXQgdmFsIG9mIHRoaXMudmFsdWUpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKE9iamVjdFV0aWxzLmVxdWFscyh2YWwsIG9wdGlvblZhbHVlLCB0aGlzLmRhdGFLZXkpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxlY3RlZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHNlbGVjdGVkID0gT2JqZWN0VXRpbHMuZXF1YWxzKHRoaXMudmFsdWUsIG9wdGlvblZhbHVlLCB0aGlzLmRhdGFLZXkpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHNlbGVjdGVkO1xuICAgIH1cblxuICAgIGdldCBhbGxDaGVja2VkKCk6IGJvb2xlYW4ge1xuICAgICAgICBsZXQgb3B0aW9uc1RvUmVuZGVyID0gdGhpcy5vcHRpb25zVG9SZW5kZXI7XG4gICAgICAgIGlmICghb3B0aW9uc1RvUmVuZGVyIHx8IG9wdGlvbnNUb1JlbmRlci5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGxldCBzZWxlY3RlZERpc2FibGVkSXRlbXNMZW5ndGggPSAwO1xuICAgICAgICAgICAgbGV0IHVuc2VsZWN0ZWREaXNhYmxlZEl0ZW1zTGVuZ3RoID0gMDtcbiAgICAgICAgICAgIGxldCBzZWxlY3RlZEVuYWJsZWRJdGVtc0xlbmd0aCA9IDA7XG4gICAgICAgICAgICBsZXQgdmlzaWJsZU9wdGlvbnNMZW5ndGggPSB0aGlzLmdyb3VwID8gMCA6IHRoaXMub3B0aW9uc1RvUmVuZGVyLmxlbmd0aDtcblxuICAgICAgICAgICAgZm9yIChsZXQgb3B0aW9uIG9mIG9wdGlvbnNUb1JlbmRlcikge1xuICAgICAgICAgICAgICAgIGlmICghdGhpcy5ncm91cCkge1xuICAgICAgICAgICAgICAgICAgICBsZXQgZGlzYWJsZWQgPSB0aGlzLmlzT3B0aW9uRGlzYWJsZWQob3B0aW9uKTtcbiAgICAgICAgICAgICAgICAgICAgbGV0IHNlbGVjdGVkID0gdGhpcy5pc1NlbGVjdGVkKG9wdGlvbik7XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKGRpc2FibGVkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoc2VsZWN0ZWQpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VsZWN0ZWREaXNhYmxlZEl0ZW1zTGVuZ3RoKys7XG4gICAgICAgICAgICAgICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdW5zZWxlY3RlZERpc2FibGVkSXRlbXNMZW5ndGgrKztcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChzZWxlY3RlZClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWxlY3RlZEVuYWJsZWRJdGVtc0xlbmd0aCsrO1xuICAgICAgICAgICAgICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgb3B0IG9mIHRoaXMuZ2V0T3B0aW9uR3JvdXBDaGlsZHJlbihvcHRpb24pKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgZGlzYWJsZWQgPSB0aGlzLmlzT3B0aW9uRGlzYWJsZWQob3B0KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBzZWxlY3RlZCA9IHRoaXMuaXNTZWxlY3RlZChvcHQpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoZGlzYWJsZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoc2VsZWN0ZWQpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlbGVjdGVkRGlzYWJsZWRJdGVtc0xlbmd0aCsrO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdW5zZWxlY3RlZERpc2FibGVkSXRlbXNMZW5ndGgrKztcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChzZWxlY3RlZClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VsZWN0ZWRFbmFibGVkSXRlbXNMZW5ndGgrKztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAgICAgdmlzaWJsZU9wdGlvbnNMZW5ndGgrKztcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuICh2aXNpYmxlT3B0aW9uc0xlbmd0aCA9PT0gc2VsZWN0ZWREaXNhYmxlZEl0ZW1zTGVuZ3RoXG4gICAgICAgICAgICAgICAgICAgIHx8IHZpc2libGVPcHRpb25zTGVuZ3RoID09PSBzZWxlY3RlZEVuYWJsZWRJdGVtc0xlbmd0aFxuICAgICAgICAgICAgICAgICAgICB8fMKgc2VsZWN0ZWRFbmFibGVkSXRlbXNMZW5ndGggJiYgdmlzaWJsZU9wdGlvbnNMZW5ndGggPT09IChzZWxlY3RlZEVuYWJsZWRJdGVtc0xlbmd0aCArIHVuc2VsZWN0ZWREaXNhYmxlZEl0ZW1zTGVuZ3RoICsgc2VsZWN0ZWREaXNhYmxlZEl0ZW1zTGVuZ3RoKSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBnZXQgb3B0aW9uc1RvUmVuZGVyKCk6IGFueVtdIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2ZpbHRlcmVkT3B0aW9ucyB8fCB0aGlzLm9wdGlvbnM7XG4gICAgfVxuXG5cbiAgICBnZXQgZW1wdHlNZXNzYWdlTGFiZWwoKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZW1wdHlNZXNzYWdlIHx8IHRoaXMuY29uZmlnLmdldFRyYW5zbGF0aW9uKFRyYW5zbGF0aW9uS2V5cy5FTVBUWV9NRVNTQUdFKTtcbiAgICB9XG5cbiAgICBnZXQgZW1wdHlGaWx0ZXJNZXNzYWdlTGFiZWwoKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZW1wdHlGaWx0ZXJNZXNzYWdlIHx8IHRoaXMuY29uZmlnLmdldFRyYW5zbGF0aW9uKFRyYW5zbGF0aW9uS2V5cy5FTVBUWV9GSUxURVJfTUVTU0FHRSk7XG4gICAgfVxuXG4gICAgaGFzRmlsdGVyKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fZmlsdGVyVmFsdWUgJiYgdGhpcy5fZmlsdGVyVmFsdWUudHJpbSgpLmxlbmd0aCA+IDA7XG4gICAgfVxuXG4gICAgaXNFbXB0eShvcHRpb25zVG9EaXNwbGF5KSB7XG4gICAgICAgIHJldHVybiAhb3B0aW9uc1RvRGlzcGxheSB8fCAob3B0aW9uc1RvRGlzcGxheSAmJiBvcHRpb25zVG9EaXNwbGF5Lmxlbmd0aCA9PT0gMCk7XG4gICAgfVxuXG4gICAgb25GaWx0ZXIoZXZlbnQ6IEtleWJvYXJkRXZlbnQpIHtcbiAgICAgICAgdGhpcy5fZmlsdGVyVmFsdWUgPSAoPEhUTUxJbnB1dEVsZW1lbnQ+IGV2ZW50LnRhcmdldCkudmFsdWU7XG4gICAgICAgIHRoaXMuYWN0aXZhdGVGaWx0ZXIoKTtcbiAgICB9XG5cbiAgICBhY3RpdmF0ZUZpbHRlcigpIHtcbiAgICAgICAgaWYgKHRoaXMuaGFzRmlsdGVyKCkgJiYgdGhpcy5fb3B0aW9ucykge1xuICAgICAgICAgICAgaWYgKHRoaXMuZ3JvdXApIHtcbiAgICAgICAgICAgICAgICBsZXQgc2VhcmNoRmllbGRzOiBzdHJpbmdbXSA9ICh0aGlzLm9wdGlvbkxhYmVsIHx8ICdsYWJlbCcpLnNwbGl0KCcsJyk7XG5cbiAgICAgICAgICAgICAgICBsZXQgZmlsdGVyZWRHcm91cHMgPSBbXTtcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBvcHRncm91cCBvZiB0aGlzLm9wdGlvbnMpIHtcbiAgICAgICAgICAgICAgICAgICAgbGV0IGZpbHRlcmVkU3ViT3B0aW9ucyA9IHRoaXMuZmlsdGVyU2VydmljZS5maWx0ZXIodGhpcy5nZXRPcHRpb25Hcm91cENoaWxkcmVuKG9wdGdyb3VwKSwgc2VhcmNoRmllbGRzLCB0aGlzLmZpbHRlclZhbHVlLCB0aGlzLmZpbHRlck1hdGNoTW9kZSwgdGhpcy5maWx0ZXJMb2NhbGUpO1xuICAgICAgICAgICAgICAgICAgICBpZiAoZmlsdGVyZWRTdWJPcHRpb25zICYmIGZpbHRlcmVkU3ViT3B0aW9ucy5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGZpbHRlcmVkR3JvdXBzLnB1c2goey4uLm9wdGdyb3VwLCAuLi57W3RoaXMub3B0aW9uR3JvdXBDaGlsZHJlbl06IGZpbHRlcmVkU3ViT3B0aW9uc319KTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHRoaXMuX2ZpbHRlcmVkT3B0aW9ucyA9IGZpbHRlcmVkR3JvdXBzO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fZmlsdGVyZWRPcHRpb25zID0gdGhpcy5fb3B0aW9ucy5maWx0ZXIob3B0aW9uID0+IHRoaXMuZmlsdGVyU2VydmljZS5maWx0ZXJzW3RoaXMuZmlsdGVyTWF0Y2hNb2RlXSh0aGlzLmdldE9wdGlvbkxhYmVsKG9wdGlvbiksIHRoaXMuX2ZpbHRlclZhbHVlLCB0aGlzLmZpbHRlckxvY2FsZSkpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5fZmlsdGVyZWRPcHRpb25zID0gbnVsbDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGdldCB0b2dnbGVBbGxEaXNhYmxlZCgpOiBib29sZWFuIHtcbiAgICAgICAgbGV0IG9wdGlvbnNUb1JlbmRlciA9IHRoaXMub3B0aW9uc1RvUmVuZGVyO1xuICAgICAgICBpZiAoIW9wdGlvbnNUb1JlbmRlciB8fCBvcHRpb25zVG9SZW5kZXIubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGZvciAobGV0IG9wdGlvbiBvZiBvcHRpb25zVG9SZW5kZXIpIHtcbiAgICAgICAgICAgICAgICBpZiAoIXRoaXMuaXNPcHRpb25EaXNhYmxlZChvcHRpb24pKVxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgdG9nZ2xlQWxsKGV2ZW50KSB7XG4gICAgICAgIGlmICh0aGlzLmRpc2FibGVkIHx8IHRoaXMudG9nZ2xlQWxsRGlzYWJsZWQgfHwgdGhpcy5yZWFkb25seSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgbGV0IGFsbENoZWNrZWQgPSB0aGlzLmFsbENoZWNrZWQ7XG5cbiAgICAgICAgaWYgKGFsbENoZWNrZWQpXG4gICAgICAgICAgICB0aGlzLnVuY2hlY2tBbGwoKTtcbiAgICAgICAgZWxzZVxuICAgICAgICAgICAgdGhpcy5jaGVja0FsbCgpO1xuXG4gICAgICAgIHRoaXMub25Nb2RlbENoYW5nZSh0aGlzLnZhbHVlKTtcbiAgICAgICAgdGhpcy5vbkNoYW5nZS5lbWl0KHsgb3JpZ2luYWxFdmVudDogZXZlbnQsIHZhbHVlOiB0aGlzLnZhbHVlIH0pO1xuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIH1cblxuICAgIGNoZWNrQWxsKCkge1xuICAgICAgICBsZXQgb3B0aW9uc1RvUmVuZGVyID0gdGhpcy5vcHRpb25zVG9SZW5kZXI7XG4gICAgICAgIGxldCB2YWw6IGFueVtdID0gW107XG5cbiAgICAgICAgb3B0aW9uc1RvUmVuZGVyLmZvckVhY2gob3B0ID0+IHtcbiAgICAgICAgICAgIGlmICghdGhpcy5ncm91cCkge1xuICAgICAgICAgICAgICAgIGxldCBvcHRpb25EaXNhYmxlZCA9IHRoaXMuaXNPcHRpb25EaXNhYmxlZChvcHQpO1xuICAgICAgICAgICAgICAgIGlmICghb3B0aW9uRGlzYWJsZWQgfHwgKG9wdGlvbkRpc2FibGVkICYmIHRoaXMuaXNTZWxlY3RlZChvcHQpKSkge1xuICAgICAgICAgICAgICAgICAgICB2YWwucHVzaCh0aGlzLmdldE9wdGlvblZhbHVlKG9wdCkpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIGxldCBzdWJPcHRpb25zID0gdGhpcy5nZXRPcHRpb25Hcm91cENoaWxkcmVuKG9wdCk7XG5cbiAgICAgICAgICAgICAgICBpZiAoc3ViT3B0aW9ucykge1xuICAgICAgICAgICAgICAgICAgICBzdWJPcHRpb25zLmZvckVhY2gob3B0aW9uID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBvcHRpb25EaXNhYmxlZCA9IHRoaXMuaXNPcHRpb25EaXNhYmxlZChvcHRpb24pO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFvcHRpb25EaXNhYmxlZCB8fCAob3B0aW9uRGlzYWJsZWQgJiYgdGhpcy5pc1NlbGVjdGVkKG9wdGlvbikpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsLnB1c2godGhpcy5nZXRPcHRpb25WYWx1ZShvcHRpb24pKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICB0aGlzLnZhbHVlID0gdmFsO1xuICAgIH1cblxuICAgIHVuY2hlY2tBbGwoKSB7XG4gICAgICAgIGxldCBvcHRpb25zVG9SZW5kZXIgPSB0aGlzLm9wdGlvbnNUb1JlbmRlcjtcbiAgICAgICAgbGV0IHZhbDogYW55W10gPSBbXTtcblxuICAgICAgICBvcHRpb25zVG9SZW5kZXIuZm9yRWFjaChvcHQgPT4ge1xuICAgICAgICAgICAgaWYgKCF0aGlzLmdyb3VwKSB7XG4gICAgICAgICAgICAgICAgbGV0IG9wdGlvbkRpc2FibGVkID0gdGhpcy5pc09wdGlvbkRpc2FibGVkKG9wdCk7XG4gICAgICAgICAgICAgICAgaWYgKG9wdGlvbkRpc2FibGVkICYmIHRoaXMuaXNTZWxlY3RlZChvcHQpKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhbC5wdXNoKHRoaXMuZ2V0T3B0aW9uVmFsdWUob3B0KSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgaWYgKG9wdC5pdGVtcykge1xuICAgICAgICAgICAgICAgICAgICBvcHQuaXRlbXMuZm9yRWFjaChvcHRpb24gPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IG9wdGlvbkRpc2FibGVkID0gdGhpcy5pc09wdGlvbkRpc2FibGVkKG9wdGlvbik7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAob3B0aW9uRGlzYWJsZWQgJiYgdGhpcy5pc1NlbGVjdGVkKG9wdGlvbikpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWwucHVzaCh0aGlzLmdldE9wdGlvblZhbHVlKG9wdGlvbikpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHRoaXMudmFsdWUgPSB2YWw7XG4gICAgfVxuXG4gICAgb25PcHRpb25LZXlEb3duKGV2ZW50OktleWJvYXJkRXZlbnQsIG9wdGlvbikge1xuICAgICAgICBpZiAodGhpcy5yZWFkb25seSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgbGV0IGl0ZW0gPSA8SFRNTExJRWxlbWVudD4gZXZlbnQuY3VycmVudFRhcmdldDtcblxuICAgICAgICBzd2l0Y2goZXZlbnQud2hpY2gpIHtcbiAgICAgICAgICAgIC8vZG93blxuICAgICAgICAgICAgY2FzZSA0MDpcbiAgICAgICAgICAgICAgICB2YXIgbmV4dEl0ZW0gPSB0aGlzLmZpbmROZXh0SXRlbShpdGVtKTtcbiAgICAgICAgICAgICAgICBpZiAobmV4dEl0ZW0pIHtcbiAgICAgICAgICAgICAgICAgICAgbmV4dEl0ZW0uZm9jdXMoKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgIC8vdXBcbiAgICAgICAgICAgIGNhc2UgMzg6XG4gICAgICAgICAgICAgICAgdmFyIHByZXZJdGVtID0gdGhpcy5maW5kUHJldkl0ZW0oaXRlbSk7XG4gICAgICAgICAgICAgICAgaWYgKHByZXZJdGVtKSB7XG4gICAgICAgICAgICAgICAgICAgIHByZXZJdGVtLmZvY3VzKCk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICAvL2VudGVyXG4gICAgICAgICAgICBjYXNlIDEzOlxuICAgICAgICAgICAgICAgIHRoaXMub25PcHRpb25DbGljayhldmVudCwgb3B0aW9uKTtcbiAgICAgICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBmaW5kTmV4dEl0ZW0oaXRlbSkge1xuICAgICAgICBsZXQgbmV4dEl0ZW0gPSBpdGVtLm5leHRFbGVtZW50U2libGluZztcblxuICAgICAgICBpZiAobmV4dEl0ZW0pXG4gICAgICAgICAgICByZXR1cm4gRG9tSGFuZGxlci5oYXNDbGFzcyhuZXh0SXRlbSwgJ3AtZGlzYWJsZWQnKSB8fCBEb21IYW5kbGVyLmlzSGlkZGVuKG5leHRJdGVtKSB8fCBEb21IYW5kbGVyLmhhc0NsYXNzKG5leHRJdGVtLCAncC1saXN0Ym94LWl0ZW0tZ3JvdXAnKSA/IHRoaXMuZmluZE5leHRJdGVtKG5leHRJdGVtKSA6IG5leHRJdGVtO1xuICAgICAgICBlbHNlXG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG5cbiAgICBmaW5kUHJldkl0ZW0oaXRlbSkge1xuICAgICAgICBsZXQgcHJldkl0ZW0gPSBpdGVtLnByZXZpb3VzRWxlbWVudFNpYmxpbmc7XG5cbiAgICAgICAgaWYgKHByZXZJdGVtKVxuICAgICAgICAgICAgcmV0dXJuIERvbUhhbmRsZXIuaGFzQ2xhc3MocHJldkl0ZW0sICdwLWRpc2FibGVkJykgfHwgRG9tSGFuZGxlci5pc0hpZGRlbihwcmV2SXRlbSkgfHwgRG9tSGFuZGxlci5oYXNDbGFzcyhwcmV2SXRlbSwgJ3AtbGlzdGJveC1pdGVtLWdyb3VwJykgPyB0aGlzLmZpbmRQcmV2SXRlbShwcmV2SXRlbSkgOiBwcmV2SXRlbTtcbiAgICAgICAgZWxzZVxuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuXG4gICAgb25IZWFkZXJDaGVja2JveEZvY3VzKCkge1xuICAgICAgICB0aGlzLmhlYWRlckNoZWNrYm94Rm9jdXMgPSB0cnVlO1xuICAgIH1cblxuICAgIG9uSGVhZGVyQ2hlY2tib3hCbHVyKCkge1xuICAgICAgICB0aGlzLmhlYWRlckNoZWNrYm94Rm9jdXMgPSBmYWxzZTtcbiAgICB9XG5cbiAgICBuZ09uRGVzdHJveSgpIHtcbiAgICAgICAgaWYgKHRoaXMudHJhbnNsYXRpb25TdWJzY3JpcHRpb24pIHtcbiAgICAgICAgICAgIHRoaXMudHJhbnNsYXRpb25TdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcbiAgICAgICAgfVxuICAgIH1cbn1cblxuQE5nTW9kdWxlKHtcbiAgICBpbXBvcnRzOiBbQ29tbW9uTW9kdWxlLCBTaGFyZWRNb2R1bGUsIFJpcHBsZU1vZHVsZV0sXG4gICAgZXhwb3J0czogW0xpc3Rib3gsIFNoYXJlZE1vZHVsZV0sXG4gICAgZGVjbGFyYXRpb25zOiBbTGlzdGJveF1cbn0pXG5leHBvcnQgY2xhc3MgTGlzdGJveE1vZHVsZSB7IH1cblxuIl19