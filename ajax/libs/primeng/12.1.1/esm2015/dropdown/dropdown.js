import { ScrollingModule, CdkVirtualScrollViewport } from '@angular/cdk/scrolling';
import { NgModule, Component, Input, Output, EventEmitter, ContentChildren, ViewChild, forwardRef, ChangeDetectionStrategy, ViewEncapsulation } from '@angular/core';
import { trigger, style, transition, animate } from '@angular/animations';
import { CommonModule } from '@angular/common';
import { TranslationKeys } from 'primeng/api';
import { SharedModule, PrimeTemplate } from 'primeng/api';
import { DomHandler, ConnectedOverlayScrollHandler } from 'primeng/dom';
import { ObjectUtils, UniqueComponentId, ZIndexUtils } from 'primeng/utils';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { TooltipModule } from 'primeng/tooltip';
import { RippleModule } from 'primeng/ripple';
import * as i0 from "@angular/core";
import * as i1 from "primeng/ripple";
import * as i2 from "@angular/common";
import * as i3 from "primeng/api";
import * as i4 from "@angular/cdk/scrolling";
import * as i5 from "primeng/tooltip";
export const DROPDOWN_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => Dropdown),
    multi: true
};
export class DropdownItem {
    constructor() {
        this.onClick = new EventEmitter();
    }
    onOptionClick(event) {
        this.onClick.emit({
            originalEvent: event,
            option: this.option
        });
    }
}
DropdownItem.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0, type: DropdownItem, deps: [], target: i0.ɵɵFactoryTarget.Component });
DropdownItem.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.0.5", type: DropdownItem, selector: "p-dropdownItem", inputs: { option: "option", selected: "selected", label: "label", disabled: "disabled", visible: "visible", itemSize: "itemSize", template: "template" }, outputs: { onClick: "onClick" }, host: { classAttribute: "p-element" }, ngImport: i0, template: `
        <li (click)="onOptionClick($event)" role="option" pRipple
            [attr.aria-label]="label" [attr.aria-selected]="selected"
            [ngStyle]="{'height': itemSize + 'px'}" [id]="selected ? 'p-highlighted-option':''"
            [ngClass]="{'p-dropdown-item':true, 'p-highlight': selected, 'p-disabled': disabled}">
            <span *ngIf="!template">{{label||'empty'}}</span>
            <ng-container *ngTemplateOutlet="template; context: {$implicit: option}"></ng-container>
        </li>
    `, isInline: true, directives: [{ type: i1.Ripple, selector: "[pRipple]" }, { type: i2.NgStyle, selector: "[ngStyle]", inputs: ["ngStyle"] }, { type: i2.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { type: i2.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i2.NgTemplateOutlet, selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet"] }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0, type: DropdownItem, decorators: [{
            type: Component,
            args: [{
                    selector: 'p-dropdownItem',
                    template: `
        <li (click)="onOptionClick($event)" role="option" pRipple
            [attr.aria-label]="label" [attr.aria-selected]="selected"
            [ngStyle]="{'height': itemSize + 'px'}" [id]="selected ? 'p-highlighted-option':''"
            [ngClass]="{'p-dropdown-item':true, 'p-highlight': selected, 'p-disabled': disabled}">
            <span *ngIf="!template">{{label||'empty'}}</span>
            <ng-container *ngTemplateOutlet="template; context: {$implicit: option}"></ng-container>
        </li>
    `,
                    host: {
                        'class': 'p-element'
                    }
                }]
        }], propDecorators: { option: [{
                type: Input
            }], selected: [{
                type: Input
            }], label: [{
                type: Input
            }], disabled: [{
                type: Input
            }], visible: [{
                type: Input
            }], itemSize: [{
                type: Input
            }], template: [{
                type: Input
            }], onClick: [{
                type: Output
            }] } });
export class Dropdown {
    constructor(el, renderer, cd, zone, filterService, config, overlayService) {
        this.el = el;
        this.renderer = renderer;
        this.cd = cd;
        this.zone = zone;
        this.filterService = filterService;
        this.config = config;
        this.overlayService = overlayService;
        this.scrollHeight = '200px';
        this.appendTo = "body";
        this.resetFilterOnHide = false;
        this.dropdownIcon = 'pi pi-chevron-down';
        this.optionGroupChildren = "items";
        this.autoDisplayFirst = true;
        this.emptyFilterMessage = '';
        this.emptyMessage = '';
        this.autoZIndex = true;
        this.baseZIndex = 0;
        this.showTransitionOptions = '.12s cubic-bezier(0, 0, 0.2, 1)';
        this.hideTransitionOptions = '.1s linear';
        this.filterMatchMode = "contains";
        this.tooltip = '';
        this.tooltipPosition = 'right';
        this.tooltipPositionStyle = 'absolute';
        this.autofocusFilter = true;
        this.onChange = new EventEmitter();
        this.onFilter = new EventEmitter();
        this.onFocus = new EventEmitter();
        this.onBlur = new EventEmitter();
        this.onClick = new EventEmitter();
        this.onShow = new EventEmitter();
        this.onHide = new EventEmitter();
        this.onModelChange = () => { };
        this.onModelTouched = () => { };
        this.viewPortOffsetTop = 0;
        this.id = UniqueComponentId();
    }
    get disabled() {
        return this._disabled;
    }
    ;
    set disabled(_disabled) {
        if (_disabled) {
            this.focused = false;
            if (this.overlayVisible)
                this.hide();
        }
        this._disabled = _disabled;
        if (!this.cd.destroyed) {
            this.cd.detectChanges();
        }
    }
    ngAfterContentInit() {
        this.templates.forEach((item) => {
            switch (item.getType()) {
                case 'item':
                    this.itemTemplate = item.template;
                    break;
                case 'selectedItem':
                    this.selectedItemTemplate = item.template;
                    break;
                case 'header':
                    this.headerTemplate = item.template;
                    break;
                case 'footer':
                    this.footerTemplate = item.template;
                    break;
                case 'emptyfilter':
                    this.emptyFilterTemplate = item.template;
                    break;
                case 'empty':
                    this.emptyTemplate = item.template;
                    break;
                case 'group':
                    this.groupTemplate = item.template;
                    break;
                default:
                    this.itemTemplate = item.template;
                    break;
            }
        });
    }
    ngOnInit() {
        this.optionsToDisplay = this.options;
        this.updateSelectedOption(null);
        this.labelId = this.id + '_label';
    }
    get options() {
        return this._options;
    }
    set options(val) {
        this._options = val;
        this.optionsToDisplay = this._options;
        this.updateSelectedOption(this.value);
        this.optionsChanged = true;
        if (this._filterValue && this._filterValue.length) {
            this.activateFilter();
        }
    }
    get filterValue() {
        return this._filterValue;
    }
    set filterValue(val) {
        this._filterValue = val;
        this.activateFilter();
    }
    ngAfterViewInit() {
        if (this.editable) {
            this.updateEditableLabel();
        }
    }
    get label() {
        return this.selectedOption ? this.getOptionLabel(this.selectedOption) : null;
    }
    get emptyMessageLabel() {
        return this.emptyMessage || this.config.getTranslation(TranslationKeys.EMPTY_MESSAGE);
    }
    get emptyFilterMessageLabel() {
        return this.emptyFilterMessage || this.config.getTranslation(TranslationKeys.EMPTY_FILTER_MESSAGE);
    }
    get filled() {
        return this.value || this.value != null || this.value != undefined;
    }
    updateEditableLabel() {
        if (this.editableInputViewChild && this.editableInputViewChild.nativeElement) {
            this.editableInputViewChild.nativeElement.value = (this.selectedOption ? this.getOptionLabel(this.selectedOption) : this.value || '');
        }
    }
    getOptionLabel(option) {
        return this.optionLabel ? ObjectUtils.resolveFieldData(option, this.optionLabel) : (option.label != undefined ? option.label : option);
    }
    getOptionValue(option) {
        return this.optionValue ? ObjectUtils.resolveFieldData(option, this.optionValue) : (this.optionLabel || option.value === undefined ? option : option.value);
    }
    isOptionDisabled(option) {
        return this.optionDisabled ? ObjectUtils.resolveFieldData(option, this.optionDisabled) : (option.disabled !== undefined ? option.disabled : false);
    }
    getOptionGroupLabel(optionGroup) {
        return this.optionGroupLabel ? ObjectUtils.resolveFieldData(optionGroup, this.optionGroupLabel) : (optionGroup.label != undefined ? optionGroup.label : optionGroup);
    }
    getOptionGroupChildren(optionGroup) {
        return this.optionGroupChildren ? ObjectUtils.resolveFieldData(optionGroup, this.optionGroupChildren) : optionGroup.items;
    }
    onItemClick(event) {
        const option = event.option;
        if (!this.isOptionDisabled(option)) {
            this.selectItem(event, option);
            this.accessibleViewChild.nativeElement.focus();
        }
        setTimeout(() => {
            this.hide();
        }, 150);
    }
    selectItem(event, option) {
        if (this.selectedOption != option) {
            this.selectedOption = option;
            this.value = this.getOptionValue(option);
            this.onModelChange(this.value);
            this.updateEditableLabel();
            this.onChange.emit({
                originalEvent: event.originalEvent,
                value: this.value
            });
            if (this.virtualScroll) {
                setTimeout(() => {
                    this.viewPortOffsetTop = this.viewPort ? this.viewPort.measureScrollOffset() : 0;
                }, 1);
            }
        }
    }
    ngAfterViewChecked() {
        if (this.optionsChanged && this.overlayVisible) {
            this.optionsChanged = false;
            if (this.virtualScroll) {
                this.updateVirtualScrollSelectedIndex(true);
            }
            this.zone.runOutsideAngular(() => {
                setTimeout(() => {
                    this.alignOverlay();
                }, 1);
            });
        }
        if (this.selectedOptionUpdated && this.itemsWrapper) {
            if (this.virtualScroll && this.viewPort) {
                let range = this.viewPort.getRenderedRange();
                this.updateVirtualScrollSelectedIndex(false);
                if (range.start > this.virtualScrollSelectedIndex || range.end < this.virtualScrollSelectedIndex) {
                    this.viewPort.scrollToIndex(this.virtualScrollSelectedIndex);
                }
            }
            let selectedItem = DomHandler.findSingle(this.overlay, 'li.p-highlight');
            if (selectedItem) {
                DomHandler.scrollInView(this.itemsWrapper, DomHandler.findSingle(this.overlay, 'li.p-highlight'));
            }
            this.selectedOptionUpdated = false;
        }
    }
    writeValue(value) {
        if (this.filter) {
            this.resetFilter();
        }
        this.value = value;
        this.updateSelectedOption(value);
        this.updateEditableLabel();
        this.cd.markForCheck();
    }
    resetFilter() {
        this._filterValue = null;
        if (this.filterViewChild && this.filterViewChild.nativeElement) {
            this.filterViewChild.nativeElement.value = '';
        }
        this.optionsToDisplay = this.options;
    }
    updateSelectedOption(val) {
        this.selectedOption = this.findOption(val, this.optionsToDisplay);
        if (this.autoDisplayFirst && !this.placeholder && !this.selectedOption && this.optionsToDisplay && this.optionsToDisplay.length && !this.editable) {
            this.selectedOption = this.optionsToDisplay[0];
        }
        this.selectedOptionUpdated = true;
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
    onMouseclick(event) {
        if (this.disabled || this.readonly || this.isInputClick(event)) {
            return;
        }
        this.onClick.emit(event);
        this.accessibleViewChild.nativeElement.focus();
        if (this.overlayVisible)
            this.hide();
        else
            this.show();
        this.cd.detectChanges();
    }
    onOverlayClick(event) {
        this.overlayService.add({
            originalEvent: event,
            target: this.el.nativeElement
        });
    }
    isInputClick(event) {
        return DomHandler.hasClass(event.target, 'p-dropdown-clear-icon') ||
            event.target.isSameNode(this.accessibleViewChild.nativeElement) ||
            (this.editableInputViewChild && event.target.isSameNode(this.editableInputViewChild.nativeElement));
    }
    isOutsideClicked(event) {
        return !(this.el.nativeElement.isSameNode(event.target) || this.el.nativeElement.contains(event.target) || (this.overlay && this.overlay.contains(event.target)));
    }
    isEmpty() {
        return !this.optionsToDisplay || (this.optionsToDisplay && this.optionsToDisplay.length === 0);
    }
    onEditableInputClick() {
        this.bindDocumentClickListener();
    }
    onEditableInputFocus(event) {
        this.focused = true;
        this.hide();
        this.onFocus.emit(event);
    }
    onEditableInputChange(event) {
        this.value = event.target.value;
        this.updateSelectedOption(this.value);
        this.onModelChange(this.value);
        this.onChange.emit({
            originalEvent: event,
            value: this.value
        });
    }
    show() {
        this.overlayVisible = true;
    }
    onOverlayAnimationStart(event) {
        switch (event.toState) {
            case 'visible':
                this.overlay = event.element;
                let itemsWrapperSelector = this.virtualScroll ? '.cdk-virtual-scroll-viewport' : '.p-dropdown-items-wrapper';
                this.itemsWrapper = DomHandler.findSingle(this.overlay, itemsWrapperSelector);
                this.appendOverlay();
                if (this.autoZIndex) {
                    ZIndexUtils.set('overlay', this.overlay, this.config.zIndex.overlay);
                }
                this.alignOverlay();
                this.bindDocumentClickListener();
                this.bindDocumentResizeListener();
                this.bindScrollListener();
                if (this.options && this.options.length) {
                    if (!this.virtualScroll) {
                        let selectedListItem = DomHandler.findSingle(this.itemsWrapper, '.p-dropdown-item.p-highlight');
                        if (selectedListItem) {
                            DomHandler.scrollInView(this.itemsWrapper, selectedListItem);
                        }
                    }
                }
                if (this.filterViewChild && this.filterViewChild.nativeElement) {
                    this.preventModelTouched = true;
                    if (this.autofocusFilter) {
                        this.filterViewChild.nativeElement.focus();
                    }
                }
                this.onShow.emit(event);
                break;
            case 'void':
                this.onOverlayHide();
                this.onHide.emit(event);
                break;
        }
    }
    onOverlayAnimationEnd(event) {
        switch (event.toState) {
            case 'void':
                ZIndexUtils.clear(event.element);
                break;
        }
    }
    scrollToSelectedVirtualScrollElement() {
        if (!this.virtualAutoScrolled) {
            if (this.viewPortOffsetTop) {
                this.viewPort.scrollToOffset(this.viewPortOffsetTop);
            }
            else if (this.virtualScrollSelectedIndex > -1) {
                this.viewPort.scrollToIndex(this.virtualScrollSelectedIndex);
            }
        }
        this.virtualAutoScrolled = true;
    }
    updateVirtualScrollSelectedIndex(resetOffset) {
        if (this.selectedOption && this.optionsToDisplay && this.optionsToDisplay.length) {
            if (resetOffset) {
                this.viewPortOffsetTop = 0;
            }
            this.virtualScrollSelectedIndex = this.findOptionIndex(this.getOptionValue(this.selectedOption), this.optionsToDisplay);
        }
    }
    appendOverlay() {
        if (this.appendTo) {
            if (this.appendTo === 'body')
                document.body.appendChild(this.overlay);
            else
                DomHandler.appendChild(this.overlay, this.appendTo);
            if (!this.overlay.style.minWidth) {
                this.overlay.style.minWidth = DomHandler.getWidth(this.containerViewChild.nativeElement) + 'px';
            }
        }
    }
    restoreOverlayAppend() {
        if (this.overlay && this.appendTo) {
            this.el.nativeElement.appendChild(this.overlay);
        }
    }
    hide() {
        this.overlayVisible = false;
        if (this.filter && this.resetFilterOnHide) {
            this.resetFilter();
        }
        if (this.virtualScroll) {
            this.virtualAutoScrolled = false;
        }
        this.cd.markForCheck();
    }
    alignOverlay() {
        if (this.overlay) {
            if (this.appendTo)
                DomHandler.absolutePosition(this.overlay, this.containerViewChild.nativeElement);
            else
                DomHandler.relativePosition(this.overlay, this.containerViewChild.nativeElement);
        }
    }
    onInputFocus(event) {
        this.focused = true;
        this.onFocus.emit(event);
    }
    onInputBlur(event) {
        this.focused = false;
        this.onBlur.emit(event);
        if (!this.preventModelTouched) {
            this.onModelTouched();
        }
        this.preventModelTouched = false;
    }
    findPrevEnabledOption(index) {
        let prevEnabledOption;
        if (this.optionsToDisplay && this.optionsToDisplay.length) {
            for (let i = (index - 1); 0 <= i; i--) {
                let option = this.optionsToDisplay[i];
                if (option.disabled) {
                    continue;
                }
                else {
                    prevEnabledOption = option;
                    break;
                }
            }
            if (!prevEnabledOption) {
                for (let i = this.optionsToDisplay.length - 1; i >= index; i--) {
                    let option = this.optionsToDisplay[i];
                    if (this.isOptionDisabled(option)) {
                        continue;
                    }
                    else {
                        prevEnabledOption = option;
                        break;
                    }
                }
            }
        }
        return prevEnabledOption;
    }
    findNextEnabledOption(index) {
        let nextEnabledOption;
        if (this.optionsToDisplay && this.optionsToDisplay.length) {
            for (let i = (index + 1); i < this.optionsToDisplay.length; i++) {
                let option = this.optionsToDisplay[i];
                if (this.isOptionDisabled(option)) {
                    continue;
                }
                else {
                    nextEnabledOption = option;
                    break;
                }
            }
            if (!nextEnabledOption) {
                for (let i = 0; i < index; i++) {
                    let option = this.optionsToDisplay[i];
                    if (this.isOptionDisabled(option)) {
                        continue;
                    }
                    else {
                        nextEnabledOption = option;
                        break;
                    }
                }
            }
        }
        return nextEnabledOption;
    }
    onKeydown(event, search) {
        if (this.readonly || !this.optionsToDisplay || this.optionsToDisplay.length === null) {
            return;
        }
        switch (event.which) {
            //down
            case 40:
                if (!this.overlayVisible && event.altKey) {
                    this.show();
                }
                else {
                    if (this.group) {
                        let selectedItemIndex = this.selectedOption ? this.findOptionGroupIndex(this.getOptionValue(this.selectedOption), this.optionsToDisplay) : -1;
                        if (selectedItemIndex !== -1) {
                            let nextItemIndex = selectedItemIndex.itemIndex + 1;
                            if (nextItemIndex < (this.getOptionGroupChildren(this.optionsToDisplay[selectedItemIndex.groupIndex]).length)) {
                                this.selectItem(event, this.getOptionGroupChildren(this.optionsToDisplay[selectedItemIndex.groupIndex])[nextItemIndex]);
                                this.selectedOptionUpdated = true;
                            }
                            else if (this.optionsToDisplay[selectedItemIndex.groupIndex + 1]) {
                                this.selectItem(event, this.getOptionGroupChildren(this.optionsToDisplay[selectedItemIndex.groupIndex + 1])[0]);
                                this.selectedOptionUpdated = true;
                            }
                        }
                        else {
                            if (this.optionsToDisplay && this.optionsToDisplay.length > 0) {
                                this.selectItem(event, this.getOptionGroupChildren(this.optionsToDisplay[0])[0]);
                            }
                        }
                    }
                    else {
                        let selectedItemIndex = this.selectedOption ? this.findOptionIndex(this.getOptionValue(this.selectedOption), this.optionsToDisplay) : -1;
                        let nextEnabledOption = this.findNextEnabledOption(selectedItemIndex);
                        if (nextEnabledOption) {
                            this.selectItem(event, nextEnabledOption);
                            this.selectedOptionUpdated = true;
                        }
                    }
                }
                event.preventDefault();
                break;
            //up
            case 38:
                if (this.group) {
                    let selectedItemIndex = this.selectedOption ? this.findOptionGroupIndex(this.getOptionValue(this.selectedOption), this.optionsToDisplay) : -1;
                    if (selectedItemIndex !== -1) {
                        let prevItemIndex = selectedItemIndex.itemIndex - 1;
                        if (prevItemIndex >= 0) {
                            this.selectItem(event, this.getOptionGroupChildren(this.optionsToDisplay[selectedItemIndex.groupIndex])[prevItemIndex]);
                            this.selectedOptionUpdated = true;
                        }
                        else if (prevItemIndex < 0) {
                            let prevGroup = this.optionsToDisplay[selectedItemIndex.groupIndex - 1];
                            if (prevGroup) {
                                this.selectItem(event, this.getOptionGroupChildren(prevGroup)[this.getOptionGroupChildren(prevGroup).length - 1]);
                                this.selectedOptionUpdated = true;
                            }
                        }
                    }
                }
                else {
                    let selectedItemIndex = this.selectedOption ? this.findOptionIndex(this.getOptionValue(this.selectedOption), this.optionsToDisplay) : -1;
                    let prevEnabledOption = this.findPrevEnabledOption(selectedItemIndex);
                    if (prevEnabledOption) {
                        this.selectItem(event, prevEnabledOption);
                        this.selectedOptionUpdated = true;
                    }
                }
                event.preventDefault();
                break;
            //space
            case 32:
            case 32:
                if (!this.overlayVisible) {
                    this.show();
                }
                else {
                    this.hide();
                }
                event.preventDefault();
                break;
            //enter
            case 13:
                if (this.overlayVisible && (!this.filter || (this.optionsToDisplay && this.optionsToDisplay.length > 0))) {
                    this.hide();
                }
                else if (!this.overlayVisible) {
                    this.show();
                }
                event.preventDefault();
                break;
            //escape and tab
            case 27:
            case 9:
                this.hide();
                break;
            //search item based on keyboard input
            default:
                if (search && !event.metaKey) {
                    this.search(event);
                }
                break;
        }
    }
    search(event) {
        if (this.searchTimeout) {
            clearTimeout(this.searchTimeout);
        }
        const char = event.key;
        this.previousSearchChar = this.currentSearchChar;
        this.currentSearchChar = char;
        if (this.previousSearchChar === this.currentSearchChar)
            this.searchValue = this.currentSearchChar;
        else
            this.searchValue = this.searchValue ? this.searchValue + char : char;
        let newOption;
        if (this.group) {
            let searchIndex = this.selectedOption ? this.findOptionGroupIndex(this.getOptionValue(this.selectedOption), this.optionsToDisplay) : { groupIndex: 0, itemIndex: 0 };
            newOption = this.searchOptionWithinGroup(searchIndex);
        }
        else {
            let searchIndex = this.selectedOption ? this.findOptionIndex(this.getOptionValue(this.selectedOption), this.optionsToDisplay) : -1;
            newOption = this.searchOption(++searchIndex);
        }
        if (newOption && !this.isOptionDisabled(newOption)) {
            this.selectItem(event, newOption);
            this.selectedOptionUpdated = true;
        }
        this.searchTimeout = setTimeout(() => {
            this.searchValue = null;
        }, 250);
    }
    searchOption(index) {
        let option;
        if (this.searchValue) {
            option = this.searchOptionInRange(index, this.optionsToDisplay.length);
            if (!option) {
                option = this.searchOptionInRange(0, index);
            }
        }
        return option;
    }
    searchOptionInRange(start, end) {
        for (let i = start; i < end; i++) {
            let opt = this.optionsToDisplay[i];
            if (this.getOptionLabel(opt).toLocaleLowerCase(this.filterLocale).startsWith(this.searchValue.toLocaleLowerCase(this.filterLocale)) && !this.isOptionDisabled(opt)) {
                return opt;
            }
        }
        return null;
    }
    searchOptionWithinGroup(index) {
        let option;
        if (this.searchValue) {
            for (let i = index.groupIndex; i < this.optionsToDisplay.length; i++) {
                for (let j = (index.groupIndex === i) ? (index.itemIndex + 1) : 0; j < this.getOptionGroupChildren(this.optionsToDisplay[i]).length; j++) {
                    let opt = this.getOptionGroupChildren(this.optionsToDisplay[i])[j];
                    if (this.getOptionLabel(opt).toLocaleLowerCase(this.filterLocale).startsWith(this.searchValue.toLocaleLowerCase(this.filterLocale)) && !this.isOptionDisabled(opt)) {
                        return opt;
                    }
                }
            }
            if (!option) {
                for (let i = 0; i <= index.groupIndex; i++) {
                    for (let j = 0; j < ((index.groupIndex === i) ? index.itemIndex : this.getOptionGroupChildren(this.optionsToDisplay[i]).length); j++) {
                        let opt = this.getOptionGroupChildren(this.optionsToDisplay[i])[j];
                        if (this.getOptionLabel(opt).toLocaleLowerCase(this.filterLocale).startsWith(this.searchValue.toLocaleLowerCase(this.filterLocale)) && !this.isOptionDisabled(opt)) {
                            return opt;
                        }
                    }
                }
            }
        }
        return null;
    }
    findOptionIndex(val, opts) {
        let index = -1;
        if (opts) {
            for (let i = 0; i < opts.length; i++) {
                if ((val == null && this.getOptionValue(opts[i]) == null) || ObjectUtils.equals(val, this.getOptionValue(opts[i]), this.dataKey)) {
                    index = i;
                    break;
                }
            }
        }
        return index;
    }
    findOptionGroupIndex(val, opts) {
        let groupIndex, itemIndex;
        if (opts) {
            for (let i = 0; i < opts.length; i++) {
                groupIndex = i;
                itemIndex = this.findOptionIndex(val, this.getOptionGroupChildren(opts[i]));
                if (itemIndex !== -1) {
                    break;
                }
            }
        }
        if (itemIndex !== -1) {
            return { groupIndex: groupIndex, itemIndex: itemIndex };
        }
        else {
            return -1;
        }
    }
    findOption(val, opts, inGroup) {
        if (this.group && !inGroup) {
            let opt;
            if (opts && opts.length) {
                for (let optgroup of opts) {
                    opt = this.findOption(val, this.getOptionGroupChildren(optgroup), true);
                    if (opt) {
                        break;
                    }
                }
            }
            return opt;
        }
        else {
            let index = this.findOptionIndex(val, opts);
            return (index != -1) ? opts[index] : null;
        }
    }
    onFilterInputChange(event) {
        let inputValue = event.target.value;
        if (inputValue && inputValue.length) {
            this._filterValue = inputValue;
            this.activateFilter();
        }
        else {
            this._filterValue = null;
            this.optionsToDisplay = this.options;
        }
        this.optionsChanged = true;
        this.onFilter.emit({ originalEvent: event, filter: this._filterValue });
    }
    activateFilter() {
        let searchFields = (this.filterBy || this.optionLabel || 'label').split(',');
        if (this.options && this.options.length) {
            if (this.group) {
                let filteredGroups = [];
                for (let optgroup of this.options) {
                    let filteredSubOptions = this.filterService.filter(this.getOptionGroupChildren(optgroup), searchFields, this.filterValue, this.filterMatchMode, this.filterLocale);
                    if (filteredSubOptions && filteredSubOptions.length) {
                        filteredGroups.push(Object.assign(Object.assign({}, optgroup), { [this.optionGroupChildren]: filteredSubOptions }));
                    }
                }
                this.optionsToDisplay = filteredGroups;
            }
            else {
                this.optionsToDisplay = this.filterService.filter(this.options, searchFields, this.filterValue, this.filterMatchMode, this.filterLocale);
            }
            this.optionsChanged = true;
        }
    }
    applyFocus() {
        if (this.editable)
            DomHandler.findSingle(this.el.nativeElement, '.p-dropdown-label.p-inputtext').focus();
        else
            DomHandler.findSingle(this.el.nativeElement, 'input[readonly]').focus();
    }
    focus() {
        this.applyFocus();
    }
    bindDocumentClickListener() {
        if (!this.documentClickListener) {
            const documentTarget = this.el ? this.el.nativeElement.ownerDocument : 'document';
            this.documentClickListener = this.renderer.listen(documentTarget, 'click', (event) => {
                if (this.isOutsideClicked(event)) {
                    this.hide();
                    this.unbindDocumentClickListener();
                }
                this.cd.markForCheck();
            });
        }
    }
    unbindDocumentClickListener() {
        if (this.documentClickListener) {
            this.documentClickListener();
            this.documentClickListener = null;
        }
    }
    bindDocumentResizeListener() {
        this.documentResizeListener = this.onWindowResize.bind(this);
        window.addEventListener('resize', this.documentResizeListener);
    }
    unbindDocumentResizeListener() {
        if (this.documentResizeListener) {
            window.removeEventListener('resize', this.documentResizeListener);
            this.documentResizeListener = null;
        }
    }
    onWindowResize() {
        if (!DomHandler.isAndroid()) {
            this.hide();
        }
    }
    bindScrollListener() {
        if (!this.scrollHandler) {
            this.scrollHandler = new ConnectedOverlayScrollHandler(this.containerViewChild.nativeElement, (event) => {
                if (this.overlayVisible) {
                    this.hide();
                }
            });
        }
        this.scrollHandler.bindScrollListener();
    }
    unbindScrollListener() {
        if (this.scrollHandler) {
            this.scrollHandler.unbindScrollListener();
        }
    }
    clear(event) {
        this.value = null;
        this.onModelChange(this.value);
        this.onChange.emit({
            originalEvent: event,
            value: this.value
        });
        this.updateSelectedOption(this.value);
        this.updateEditableLabel();
    }
    onOverlayHide() {
        this.unbindDocumentClickListener();
        this.unbindDocumentResizeListener();
        this.unbindScrollListener();
        this.overlay = null;
        this.itemsWrapper = null;
        this.onModelTouched();
    }
    ngOnDestroy() {
        if (this.scrollHandler) {
            this.scrollHandler.destroy();
            this.scrollHandler = null;
        }
        if (this.overlay) {
            ZIndexUtils.clear(this.overlay);
        }
        this.restoreOverlayAppend();
        this.onOverlayHide();
    }
}
Dropdown.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0, type: Dropdown, deps: [{ token: i0.ElementRef }, { token: i0.Renderer2 }, { token: i0.ChangeDetectorRef }, { token: i0.NgZone }, { token: i3.FilterService }, { token: i3.PrimeNGConfig }, { token: i3.OverlayService }], target: i0.ɵɵFactoryTarget.Component });
Dropdown.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.0.5", type: Dropdown, selector: "p-dropdown", inputs: { scrollHeight: "scrollHeight", filter: "filter", name: "name", style: "style", panelStyle: "panelStyle", styleClass: "styleClass", panelStyleClass: "panelStyleClass", readonly: "readonly", required: "required", editable: "editable", appendTo: "appendTo", tabindex: "tabindex", placeholder: "placeholder", filterPlaceholder: "filterPlaceholder", filterLocale: "filterLocale", inputId: "inputId", selectId: "selectId", dataKey: "dataKey", filterBy: "filterBy", autofocus: "autofocus", resetFilterOnHide: "resetFilterOnHide", dropdownIcon: "dropdownIcon", optionLabel: "optionLabel", optionValue: "optionValue", optionDisabled: "optionDisabled", optionGroupLabel: "optionGroupLabel", optionGroupChildren: "optionGroupChildren", autoDisplayFirst: "autoDisplayFirst", group: "group", showClear: "showClear", emptyFilterMessage: "emptyFilterMessage", emptyMessage: "emptyMessage", virtualScroll: "virtualScroll", itemSize: "itemSize", autoZIndex: "autoZIndex", baseZIndex: "baseZIndex", showTransitionOptions: "showTransitionOptions", hideTransitionOptions: "hideTransitionOptions", ariaFilterLabel: "ariaFilterLabel", ariaLabelledBy: "ariaLabelledBy", filterMatchMode: "filterMatchMode", maxlength: "maxlength", tooltip: "tooltip", tooltipPosition: "tooltipPosition", tooltipPositionStyle: "tooltipPositionStyle", tooltipStyleClass: "tooltipStyleClass", autofocusFilter: "autofocusFilter", disabled: "disabled", options: "options", filterValue: "filterValue" }, outputs: { onChange: "onChange", onFilter: "onFilter", onFocus: "onFocus", onBlur: "onBlur", onClick: "onClick", onShow: "onShow", onHide: "onHide" }, host: { properties: { "class.p-inputwrapper-filled": "filled", "class.p-inputwrapper-focus": "focused || overlayVisible" }, classAttribute: "p-element p-inputwrapper" }, providers: [DROPDOWN_VALUE_ACCESSOR], queries: [{ propertyName: "templates", predicate: PrimeTemplate }], viewQueries: [{ propertyName: "containerViewChild", first: true, predicate: ["container"], descendants: true }, { propertyName: "filterViewChild", first: true, predicate: ["filter"], descendants: true }, { propertyName: "accessibleViewChild", first: true, predicate: ["in"], descendants: true }, { propertyName: "viewPort", first: true, predicate: CdkVirtualScrollViewport, descendants: true }, { propertyName: "editableInputViewChild", first: true, predicate: ["editableInput"], descendants: true }], ngImport: i0, template: `
         <div #container [ngClass]="{'p-dropdown p-component':true,
            'p-disabled':disabled, 'p-dropdown-open':overlayVisible, 'p-focus':focused, 'p-dropdown-clearable': showClear && !disabled}"
            (click)="onMouseclick($event)" [ngStyle]="style" [class]="styleClass">
            <div class="p-hidden-accessible">
                <input #in [attr.id]="inputId" type="text" readonly (focus)="onInputFocus($event)" aria-haspopup="listbox" [attr.placeholder]="placeholder"
                    aria-haspopup="listbox" [attr.aria-expanded]="overlayVisible" [attr.aria-labelledby]="ariaLabelledBy" (blur)="onInputBlur($event)" (keydown)="onKeydown($event, true)"
                    [disabled]="disabled" [attr.tabindex]="tabindex" [attr.autofocus]="autofocus" [attr.aria-activedescendant]="overlayVisible ? 'p-highlighted-option' : labelId" role="listbox">
            </div>
            <span [attr.id]="labelId" [ngClass]="{'p-dropdown-label p-inputtext':true,'p-dropdown-label-empty':(label == null || label.length === 0)}" *ngIf="!editable && (label != null)" [pTooltip]="tooltip" [tooltipPosition]="tooltipPosition" [positionStyle]="tooltipPositionStyle" [tooltipStyleClass]="tooltipStyleClass">
                <ng-container *ngIf="!selectedItemTemplate">{{label||'empty'}}</ng-container>
                <ng-container *ngTemplateOutlet="selectedItemTemplate; context: {$implicit: selectedOption}"></ng-container>
            </span>
            <span [ngClass]="{'p-dropdown-label p-inputtext p-placeholder':true,'p-dropdown-label-empty': (placeholder == null || placeholder.length === 0)}" *ngIf="!editable && (label == null)">{{placeholder||'empty'}}</span>
            <input #editableInput type="text" [attr.maxlength]="maxlength" class="p-dropdown-label p-inputtext" *ngIf="editable" [disabled]="disabled" [attr.placeholder]="placeholder"
                aria-haspopup="listbox" [attr.aria-expanded]="overlayVisible" (click)="onEditableInputClick()" (input)="onEditableInputChange($event)" (focus)="onEditableInputFocus($event)" (blur)="onInputBlur($event)">
            <i class="p-dropdown-clear-icon pi pi-times" (click)="clear($event)" *ngIf="value != null && showClear && !disabled"></i>
            <div class="p-dropdown-trigger" role="button" aria-haspopup="listbox" [attr.aria-expanded]="overlayVisible">
                <span class="p-dropdown-trigger-icon" [ngClass]="dropdownIcon"></span>
            </div>
            <div *ngIf="overlayVisible" [ngClass]="'p-dropdown-panel p-component'" (click)="onOverlayClick($event)" [@overlayAnimation]="{value: 'visible', params: {showTransitionParams: showTransitionOptions, hideTransitionParams: hideTransitionOptions}}" (@overlayAnimation.start)="onOverlayAnimationStart($event)" (@overlayAnimation.start)="onOverlayAnimationEnd($event)"onOverlayAnimationEnd [ngStyle]="panelStyle" [class]="panelStyleClass">
                <ng-container *ngTemplateOutlet="headerTemplate"></ng-container>
                <div class="p-dropdown-header" *ngIf="filter" >
                    <div class="p-dropdown-filter-container" (click)="$event.stopPropagation()">
                        <input #filter type="text" autocomplete="off" [value]="filterValue||''" class="p-dropdown-filter p-inputtext p-component" [attr.placeholder]="filterPlaceholder"
                        (keydown.enter)="$event.preventDefault()" (keydown)="onKeydown($event, false)" (input)="onFilterInputChange($event)" [attr.aria-label]="ariaFilterLabel" [attr.aria-activedescendant]="overlayVisible ? 'p-highlighted-option' : labelId">
                        <span class="p-dropdown-filter-icon pi pi-search"></span>
                    </div>
                </div>
                <div class="p-dropdown-items-wrapper" [style.max-height]="virtualScroll ? 'auto' : (scrollHeight||'auto')">
                    <ul class="p-dropdown-items" [ngClass]="{'p-dropdown-virtualscroll': virtualScroll}" role="listbox">
                        <ng-container *ngIf="group">
                            <ng-template ngFor let-optgroup [ngForOf]="optionsToDisplay">
                                <li class="p-dropdown-item-group">
                                    <span *ngIf="!groupTemplate">{{getOptionGroupLabel(optgroup)||'empty'}}</span>
                                    <ng-container *ngTemplateOutlet="groupTemplate; context: {$implicit: optgroup}"></ng-container>
                                </li>
                                <ng-container *ngTemplateOutlet="itemslist; context: {$implicit: getOptionGroupChildren(optgroup), selectedOption: selectedOption}"></ng-container>
                            </ng-template>
                        </ng-container>
                        <ng-container *ngIf="!group">
                            <ng-container *ngTemplateOutlet="itemslist; context: {$implicit: optionsToDisplay, selectedOption: selectedOption}"></ng-container>
                        </ng-container>
                        <ng-template #itemslist let-options let-selectedOption="selectedOption">
                            <ng-container *ngIf="!virtualScroll; else virtualScrollList">
                                <ng-template ngFor let-option let-i="index" [ngForOf]="options">
                                    <p-dropdownItem [option]="option" [selected]="selectedOption == option" [label]="getOptionLabel(option)" [disabled]="isOptionDisabled(option)"
                                                    (onClick)="onItemClick($event)"
                                                    [template]="itemTemplate"></p-dropdownItem>
                                </ng-template>
                            </ng-container>
                            <ng-template #virtualScrollList>
                                <cdk-virtual-scroll-viewport (scrolledIndexChange)="scrollToSelectedVirtualScrollElement()" #viewport [ngStyle]="{'height': scrollHeight}" [itemSize]="itemSize" *ngIf="virtualScroll && optionsToDisplay && optionsToDisplay.length">
                                    <ng-container *cdkVirtualFor="let option of options; let i = index; let c = count; let f = first; let l = last; let e = even; let o = odd">
                                        <p-dropdownItem [option]="option" [selected]="selectedOption == option" [label]="getOptionLabel(option)" [disabled]="isOptionDisabled(option)"
                                                                   (onClick)="onItemClick($event)"
                                                                   [template]="itemTemplate"></p-dropdownItem>
                                    </ng-container>
                                </cdk-virtual-scroll-viewport>
                            </ng-template>
                        </ng-template>
                        <li *ngIf="filterValue && isEmpty()" class="p-dropdown-empty-message">
                            <ng-container *ngIf="!emptyFilterTemplate && !emptyTemplate; else emptyFilter">
                                {{emptyFilterMessageLabel}}
                            </ng-container>
                            <ng-container #emptyFilter *ngTemplateOutlet="emptyFilterTemplate || emptyTemplate"></ng-container>
                        </li>
                        <li *ngIf="!filterValue && isEmpty()" class="p-dropdown-empty-message">
                            <ng-container *ngIf="!emptyTemplate; else empty">
                                {{emptyMessageLabel}}
                            </ng-container>
                            <ng-container #empty *ngTemplateOutlet="emptyTemplate"></ng-container>
                        </li>
                    </ul>
                </div>
                <ng-container *ngTemplateOutlet="footerTemplate"></ng-container>
            </div>
        </div>
    `, isInline: true, styles: [".p-dropdown{display:inline-flex;cursor:pointer;position:relative;-webkit-user-select:none;-ms-user-select:none;user-select:none}.p-dropdown-clear-icon{position:absolute;top:50%;margin-top:-.5rem}.p-dropdown-trigger{display:flex;align-items:center;justify-content:center;flex-shrink:0}.p-dropdown-label{display:block;white-space:nowrap;overflow:hidden;flex:1 1 auto;width:1%;text-overflow:ellipsis;cursor:pointer}.p-dropdown-label-empty{overflow:hidden;visibility:hidden}input.p-dropdown-label{cursor:default}.p-dropdown .p-dropdown-panel{min-width:100%}.p-dropdown-panel{position:absolute;top:0;left:0}.p-dropdown-items-wrapper{overflow:auto}.p-dropdown-item{cursor:pointer;font-weight:400;white-space:nowrap;position:relative;overflow:hidden}.p-dropdown-items{margin:0;padding:0;list-style-type:none}.p-dropdown-filter{width:100%}.p-dropdown-filter-container{position:relative}.p-dropdown-filter-icon{position:absolute;top:50%;margin-top:-.5rem}.p-fluid .p-dropdown{display:flex}.p-fluid .p-dropdown .p-dropdown-label{width:1%}"], components: [{ type: DropdownItem, selector: "p-dropdownItem", inputs: ["option", "selected", "label", "disabled", "visible", "itemSize", "template"], outputs: ["onClick"] }, { type: i4.CdkVirtualScrollViewport, selector: "cdk-virtual-scroll-viewport", inputs: ["orientation"], outputs: ["scrolledIndexChange"] }], directives: [{ type: i2.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { type: i2.NgStyle, selector: "[ngStyle]", inputs: ["ngStyle"] }, { type: i2.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i5.Tooltip, selector: "[pTooltip]", inputs: ["tooltipPosition", "tooltipEvent", "appendTo", "positionStyle", "tooltipStyleClass", "tooltipZIndex", "escape", "showDelay", "hideDelay", "life", "positionTop", "positionLeft", "pTooltip", "tooltipDisabled", "tooltipOptions"] }, { type: i2.NgTemplateOutlet, selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet"] }, { type: i2.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { type: i4.CdkFixedSizeVirtualScroll, selector: "cdk-virtual-scroll-viewport[itemSize]", inputs: ["itemSize", "minBufferPx", "maxBufferPx"] }, { type: i4.CdkVirtualForOf, selector: "[cdkVirtualFor][cdkVirtualForOf]", inputs: ["cdkVirtualForOf", "cdkVirtualForTrackBy", "cdkVirtualForTemplate", "cdkVirtualForTemplateCacheSize"] }], animations: [
        trigger('overlayAnimation', [
            transition(':enter', [
                style({ opacity: 0, transform: 'scaleY(0.8)' }),
                animate('{{showTransitionParams}}')
            ]),
            transition(':leave', [
                animate('{{hideTransitionParams}}', style({ opacity: 0 }))
            ])
        ])
    ], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0, type: Dropdown, decorators: [{
            type: Component,
            args: [{
                    selector: 'p-dropdown',
                    template: `
         <div #container [ngClass]="{'p-dropdown p-component':true,
            'p-disabled':disabled, 'p-dropdown-open':overlayVisible, 'p-focus':focused, 'p-dropdown-clearable': showClear && !disabled}"
            (click)="onMouseclick($event)" [ngStyle]="style" [class]="styleClass">
            <div class="p-hidden-accessible">
                <input #in [attr.id]="inputId" type="text" readonly (focus)="onInputFocus($event)" aria-haspopup="listbox" [attr.placeholder]="placeholder"
                    aria-haspopup="listbox" [attr.aria-expanded]="overlayVisible" [attr.aria-labelledby]="ariaLabelledBy" (blur)="onInputBlur($event)" (keydown)="onKeydown($event, true)"
                    [disabled]="disabled" [attr.tabindex]="tabindex" [attr.autofocus]="autofocus" [attr.aria-activedescendant]="overlayVisible ? 'p-highlighted-option' : labelId" role="listbox">
            </div>
            <span [attr.id]="labelId" [ngClass]="{'p-dropdown-label p-inputtext':true,'p-dropdown-label-empty':(label == null || label.length === 0)}" *ngIf="!editable && (label != null)" [pTooltip]="tooltip" [tooltipPosition]="tooltipPosition" [positionStyle]="tooltipPositionStyle" [tooltipStyleClass]="tooltipStyleClass">
                <ng-container *ngIf="!selectedItemTemplate">{{label||'empty'}}</ng-container>
                <ng-container *ngTemplateOutlet="selectedItemTemplate; context: {$implicit: selectedOption}"></ng-container>
            </span>
            <span [ngClass]="{'p-dropdown-label p-inputtext p-placeholder':true,'p-dropdown-label-empty': (placeholder == null || placeholder.length === 0)}" *ngIf="!editable && (label == null)">{{placeholder||'empty'}}</span>
            <input #editableInput type="text" [attr.maxlength]="maxlength" class="p-dropdown-label p-inputtext" *ngIf="editable" [disabled]="disabled" [attr.placeholder]="placeholder"
                aria-haspopup="listbox" [attr.aria-expanded]="overlayVisible" (click)="onEditableInputClick()" (input)="onEditableInputChange($event)" (focus)="onEditableInputFocus($event)" (blur)="onInputBlur($event)">
            <i class="p-dropdown-clear-icon pi pi-times" (click)="clear($event)" *ngIf="value != null && showClear && !disabled"></i>
            <div class="p-dropdown-trigger" role="button" aria-haspopup="listbox" [attr.aria-expanded]="overlayVisible">
                <span class="p-dropdown-trigger-icon" [ngClass]="dropdownIcon"></span>
            </div>
            <div *ngIf="overlayVisible" [ngClass]="'p-dropdown-panel p-component'" (click)="onOverlayClick($event)" [@overlayAnimation]="{value: 'visible', params: {showTransitionParams: showTransitionOptions, hideTransitionParams: hideTransitionOptions}}" (@overlayAnimation.start)="onOverlayAnimationStart($event)" (@overlayAnimation.start)="onOverlayAnimationEnd($event)"onOverlayAnimationEnd [ngStyle]="panelStyle" [class]="panelStyleClass">
                <ng-container *ngTemplateOutlet="headerTemplate"></ng-container>
                <div class="p-dropdown-header" *ngIf="filter" >
                    <div class="p-dropdown-filter-container" (click)="$event.stopPropagation()">
                        <input #filter type="text" autocomplete="off" [value]="filterValue||''" class="p-dropdown-filter p-inputtext p-component" [attr.placeholder]="filterPlaceholder"
                        (keydown.enter)="$event.preventDefault()" (keydown)="onKeydown($event, false)" (input)="onFilterInputChange($event)" [attr.aria-label]="ariaFilterLabel" [attr.aria-activedescendant]="overlayVisible ? 'p-highlighted-option' : labelId">
                        <span class="p-dropdown-filter-icon pi pi-search"></span>
                    </div>
                </div>
                <div class="p-dropdown-items-wrapper" [style.max-height]="virtualScroll ? 'auto' : (scrollHeight||'auto')">
                    <ul class="p-dropdown-items" [ngClass]="{'p-dropdown-virtualscroll': virtualScroll}" role="listbox">
                        <ng-container *ngIf="group">
                            <ng-template ngFor let-optgroup [ngForOf]="optionsToDisplay">
                                <li class="p-dropdown-item-group">
                                    <span *ngIf="!groupTemplate">{{getOptionGroupLabel(optgroup)||'empty'}}</span>
                                    <ng-container *ngTemplateOutlet="groupTemplate; context: {$implicit: optgroup}"></ng-container>
                                </li>
                                <ng-container *ngTemplateOutlet="itemslist; context: {$implicit: getOptionGroupChildren(optgroup), selectedOption: selectedOption}"></ng-container>
                            </ng-template>
                        </ng-container>
                        <ng-container *ngIf="!group">
                            <ng-container *ngTemplateOutlet="itemslist; context: {$implicit: optionsToDisplay, selectedOption: selectedOption}"></ng-container>
                        </ng-container>
                        <ng-template #itemslist let-options let-selectedOption="selectedOption">
                            <ng-container *ngIf="!virtualScroll; else virtualScrollList">
                                <ng-template ngFor let-option let-i="index" [ngForOf]="options">
                                    <p-dropdownItem [option]="option" [selected]="selectedOption == option" [label]="getOptionLabel(option)" [disabled]="isOptionDisabled(option)"
                                                    (onClick)="onItemClick($event)"
                                                    [template]="itemTemplate"></p-dropdownItem>
                                </ng-template>
                            </ng-container>
                            <ng-template #virtualScrollList>
                                <cdk-virtual-scroll-viewport (scrolledIndexChange)="scrollToSelectedVirtualScrollElement()" #viewport [ngStyle]="{'height': scrollHeight}" [itemSize]="itemSize" *ngIf="virtualScroll && optionsToDisplay && optionsToDisplay.length">
                                    <ng-container *cdkVirtualFor="let option of options; let i = index; let c = count; let f = first; let l = last; let e = even; let o = odd">
                                        <p-dropdownItem [option]="option" [selected]="selectedOption == option" [label]="getOptionLabel(option)" [disabled]="isOptionDisabled(option)"
                                                                   (onClick)="onItemClick($event)"
                                                                   [template]="itemTemplate"></p-dropdownItem>
                                    </ng-container>
                                </cdk-virtual-scroll-viewport>
                            </ng-template>
                        </ng-template>
                        <li *ngIf="filterValue && isEmpty()" class="p-dropdown-empty-message">
                            <ng-container *ngIf="!emptyFilterTemplate && !emptyTemplate; else emptyFilter">
                                {{emptyFilterMessageLabel}}
                            </ng-container>
                            <ng-container #emptyFilter *ngTemplateOutlet="emptyFilterTemplate || emptyTemplate"></ng-container>
                        </li>
                        <li *ngIf="!filterValue && isEmpty()" class="p-dropdown-empty-message">
                            <ng-container *ngIf="!emptyTemplate; else empty">
                                {{emptyMessageLabel}}
                            </ng-container>
                            <ng-container #empty *ngTemplateOutlet="emptyTemplate"></ng-container>
                        </li>
                    </ul>
                </div>
                <ng-container *ngTemplateOutlet="footerTemplate"></ng-container>
            </div>
        </div>
    `,
                    animations: [
                        trigger('overlayAnimation', [
                            transition(':enter', [
                                style({ opacity: 0, transform: 'scaleY(0.8)' }),
                                animate('{{showTransitionParams}}')
                            ]),
                            transition(':leave', [
                                animate('{{hideTransitionParams}}', style({ opacity: 0 }))
                            ])
                        ])
                    ],
                    host: {
                        'class': 'p-element p-inputwrapper',
                        '[class.p-inputwrapper-filled]': 'filled',
                        '[class.p-inputwrapper-focus]': 'focused || overlayVisible'
                    },
                    providers: [DROPDOWN_VALUE_ACCESSOR],
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    encapsulation: ViewEncapsulation.None,
                    styleUrls: ['./dropdown.css']
                }]
        }], ctorParameters: function () { return [{ type: i0.ElementRef }, { type: i0.Renderer2 }, { type: i0.ChangeDetectorRef }, { type: i0.NgZone }, { type: i3.FilterService }, { type: i3.PrimeNGConfig }, { type: i3.OverlayService }]; }, propDecorators: { scrollHeight: [{
                type: Input
            }], filter: [{
                type: Input
            }], name: [{
                type: Input
            }], style: [{
                type: Input
            }], panelStyle: [{
                type: Input
            }], styleClass: [{
                type: Input
            }], panelStyleClass: [{
                type: Input
            }], readonly: [{
                type: Input
            }], required: [{
                type: Input
            }], editable: [{
                type: Input
            }], appendTo: [{
                type: Input
            }], tabindex: [{
                type: Input
            }], placeholder: [{
                type: Input
            }], filterPlaceholder: [{
                type: Input
            }], filterLocale: [{
                type: Input
            }], inputId: [{
                type: Input
            }], selectId: [{
                type: Input
            }], dataKey: [{
                type: Input
            }], filterBy: [{
                type: Input
            }], autofocus: [{
                type: Input
            }], resetFilterOnHide: [{
                type: Input
            }], dropdownIcon: [{
                type: Input
            }], optionLabel: [{
                type: Input
            }], optionValue: [{
                type: Input
            }], optionDisabled: [{
                type: Input
            }], optionGroupLabel: [{
                type: Input
            }], optionGroupChildren: [{
                type: Input
            }], autoDisplayFirst: [{
                type: Input
            }], group: [{
                type: Input
            }], showClear: [{
                type: Input
            }], emptyFilterMessage: [{
                type: Input
            }], emptyMessage: [{
                type: Input
            }], virtualScroll: [{
                type: Input
            }], itemSize: [{
                type: Input
            }], autoZIndex: [{
                type: Input
            }], baseZIndex: [{
                type: Input
            }], showTransitionOptions: [{
                type: Input
            }], hideTransitionOptions: [{
                type: Input
            }], ariaFilterLabel: [{
                type: Input
            }], ariaLabelledBy: [{
                type: Input
            }], filterMatchMode: [{
                type: Input
            }], maxlength: [{
                type: Input
            }], tooltip: [{
                type: Input
            }], tooltipPosition: [{
                type: Input
            }], tooltipPositionStyle: [{
                type: Input
            }], tooltipStyleClass: [{
                type: Input
            }], autofocusFilter: [{
                type: Input
            }], onChange: [{
                type: Output
            }], onFilter: [{
                type: Output
            }], onFocus: [{
                type: Output
            }], onBlur: [{
                type: Output
            }], onClick: [{
                type: Output
            }], onShow: [{
                type: Output
            }], onHide: [{
                type: Output
            }], containerViewChild: [{
                type: ViewChild,
                args: ['container']
            }], filterViewChild: [{
                type: ViewChild,
                args: ['filter']
            }], accessibleViewChild: [{
                type: ViewChild,
                args: ['in']
            }], viewPort: [{
                type: ViewChild,
                args: [CdkVirtualScrollViewport]
            }], editableInputViewChild: [{
                type: ViewChild,
                args: ['editableInput']
            }], templates: [{
                type: ContentChildren,
                args: [PrimeTemplate]
            }], disabled: [{
                type: Input
            }], options: [{
                type: Input
            }], filterValue: [{
                type: Input
            }] } });
export class DropdownModule {
}
DropdownModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0, type: DropdownModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
DropdownModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0, type: DropdownModule, declarations: [Dropdown, DropdownItem], imports: [CommonModule, SharedModule, ScrollingModule, TooltipModule, RippleModule], exports: [Dropdown, SharedModule, ScrollingModule] });
DropdownModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0, type: DropdownModule, imports: [[CommonModule, SharedModule, ScrollingModule, TooltipModule, RippleModule], SharedModule, ScrollingModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0, type: DropdownModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule, SharedModule, ScrollingModule, TooltipModule, RippleModule],
                    exports: [Dropdown, SharedModule, ScrollingModule],
                    declarations: [Dropdown, DropdownItem]
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZHJvcGRvd24uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvYXBwL2NvbXBvbmVudHMvZHJvcGRvd24vZHJvcGRvd24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFDLGVBQWUsRUFBRSx3QkFBd0IsRUFBQyxNQUFNLHdCQUF3QixDQUFDO0FBQ2pGLE9BQU8sRUFBQyxRQUFRLEVBQUMsU0FBUyxFQUE2RSxLQUFLLEVBQUMsTUFBTSxFQUFXLFlBQVksRUFBQyxlQUFlLEVBQ3hJLFNBQVMsRUFBYSxVQUFVLEVBQWtDLHVCQUF1QixFQUFFLGlCQUFpQixFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQ3JKLE9BQU8sRUFBQyxPQUFPLEVBQUMsS0FBSyxFQUFDLFVBQVUsRUFBQyxPQUFPLEVBQWdCLE1BQU0scUJBQXFCLENBQUM7QUFDcEYsT0FBTyxFQUFDLFlBQVksRUFBQyxNQUFNLGlCQUFpQixDQUFDO0FBQzdDLE9BQU8sRUFBNEMsZUFBZSxFQUFDLE1BQU0sYUFBYSxDQUFDO0FBQ3ZGLE9BQU8sRUFBQyxZQUFZLEVBQUMsYUFBYSxFQUFnQixNQUFNLGFBQWEsQ0FBQztBQUN0RSxPQUFPLEVBQUMsVUFBVSxFQUFFLDZCQUE2QixFQUFDLE1BQU0sYUFBYSxDQUFDO0FBQ3RFLE9BQU8sRUFBQyxXQUFXLEVBQUMsaUJBQWlCLEVBQUMsV0FBVyxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQ3hFLE9BQU8sRUFBQyxpQkFBaUIsRUFBdUIsTUFBTSxnQkFBZ0IsQ0FBQztBQUN2RSxPQUFPLEVBQUMsYUFBYSxFQUFDLE1BQU0saUJBQWlCLENBQUM7QUFDOUMsT0FBTyxFQUFDLFlBQVksRUFBQyxNQUFNLGdCQUFnQixDQUFDOzs7Ozs7O0FBRTVDLE1BQU0sQ0FBQyxNQUFNLHVCQUF1QixHQUFRO0lBQzFDLE9BQU8sRUFBRSxpQkFBaUI7SUFDMUIsV0FBVyxFQUFFLFVBQVUsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxRQUFRLENBQUM7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QWEsRUFBQyxZQUFZLENBQUMsRUFDNUQsWUFBWSxFQUFDLGVBQWU7MkZBR3RDLGNBQWM7a0JBTDFCLFFBQVE7bUJBQUM7b0JBQ04sT0FBTyxFQUFFLENBQUMsWUFBWSxFQUFDLFlBQVksRUFBQyxlQUFlLEVBQUMsYUFBYSxFQUFDLFlBQVksQ0FBQztvQkFDL0UsT0FBTyxFQUFFLENBQUMsUUFBUSxFQUFDLFlBQVksRUFBQyxlQUFlLENBQUM7b0JBQ2hELFlBQVksRUFBRSxDQUFDLFFBQVEsRUFBQyxZQUFZLENBQUM7aUJBQ3hDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtTY3JvbGxpbmdNb2R1bGUsIENka1ZpcnR1YWxTY3JvbGxWaWV3cG9ydH0gZnJvbSAnQGFuZ3VsYXIvY2RrL3Njcm9sbGluZyc7XG5pbXBvcnQge05nTW9kdWxlLENvbXBvbmVudCxFbGVtZW50UmVmLE9uSW5pdCxBZnRlclZpZXdJbml0LEFmdGVyQ29udGVudEluaXQsQWZ0ZXJWaWV3Q2hlY2tlZCxPbkRlc3Ryb3ksSW5wdXQsT3V0cHV0LFJlbmRlcmVyMixFdmVudEVtaXR0ZXIsQ29udGVudENoaWxkcmVuLFxuICAgICAgICBRdWVyeUxpc3QsVmlld0NoaWxkLFRlbXBsYXRlUmVmLGZvcndhcmRSZWYsQ2hhbmdlRGV0ZWN0b3JSZWYsTmdab25lLFZpZXdSZWYsQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksIFZpZXdFbmNhcHN1bGF0aW9ufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7dHJpZ2dlcixzdHlsZSx0cmFuc2l0aW9uLGFuaW1hdGUsQW5pbWF0aW9uRXZlbnR9IGZyb20gJ0Bhbmd1bGFyL2FuaW1hdGlvbnMnO1xuaW1wb3J0IHtDb21tb25Nb2R1bGV9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQge092ZXJsYXlTZXJ2aWNlLCBQcmltZU5HQ29uZmlnLCBTZWxlY3RJdGVtLCBUcmFuc2xhdGlvbktleXN9IGZyb20gJ3ByaW1lbmcvYXBpJztcbmltcG9ydCB7U2hhcmVkTW9kdWxlLFByaW1lVGVtcGxhdGUsIEZpbHRlclNlcnZpY2V9IGZyb20gJ3ByaW1lbmcvYXBpJztcbmltcG9ydCB7RG9tSGFuZGxlciwgQ29ubmVjdGVkT3ZlcmxheVNjcm9sbEhhbmRsZXJ9IGZyb20gJ3ByaW1lbmcvZG9tJztcbmltcG9ydCB7T2JqZWN0VXRpbHMsVW5pcXVlQ29tcG9uZW50SWQsWkluZGV4VXRpbHN9IGZyb20gJ3ByaW1lbmcvdXRpbHMnO1xuaW1wb3J0IHtOR19WQUxVRV9BQ0NFU1NPUiwgQ29udHJvbFZhbHVlQWNjZXNzb3J9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7VG9vbHRpcE1vZHVsZX0gZnJvbSAncHJpbWVuZy90b29sdGlwJztcbmltcG9ydCB7UmlwcGxlTW9kdWxlfSBmcm9tICdwcmltZW5nL3JpcHBsZSc7XG5cbmV4cG9ydCBjb25zdCBEUk9QRE9XTl9WQUxVRV9BQ0NFU1NPUjogYW55ID0ge1xuICBwcm92aWRlOiBOR19WQUxVRV9BQ0NFU1NPUixcbiAgdXNlRXhpc3Rpbmc6IGZvcndhcmRSZWYoKCkgPT4gRHJvcGRvd24pLFxuICBtdWx0aTogdHJ1ZVxufTtcblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICdwLWRyb3Bkb3duSXRlbScsXG4gICAgdGVtcGxhdGU6IGBcbiAgICAgICAgPGxpIChjbGljayk9XCJvbk9wdGlvbkNsaWNrKCRldmVudClcIiByb2xlPVwib3B0aW9uXCIgcFJpcHBsZVxuICAgICAgICAgICAgW2F0dHIuYXJpYS1sYWJlbF09XCJsYWJlbFwiIFthdHRyLmFyaWEtc2VsZWN0ZWRdPVwic2VsZWN0ZWRcIlxuICAgICAgICAgICAgW25nU3R5bGVdPVwieydoZWlnaHQnOiBpdGVtU2l6ZSArICdweCd9XCIgW2lkXT1cInNlbGVjdGVkID8gJ3AtaGlnaGxpZ2h0ZWQtb3B0aW9uJzonJ1wiXG4gICAgICAgICAgICBbbmdDbGFzc109XCJ7J3AtZHJvcGRvd24taXRlbSc6dHJ1ZSwgJ3AtaGlnaGxpZ2h0Jzogc2VsZWN0ZWQsICdwLWRpc2FibGVkJzogZGlzYWJsZWR9XCI+XG4gICAgICAgICAgICA8c3BhbiAqbmdJZj1cIiF0ZW1wbGF0ZVwiPnt7bGFiZWx8fCdlbXB0eSd9fTwvc3Bhbj5cbiAgICAgICAgICAgIDxuZy1jb250YWluZXIgKm5nVGVtcGxhdGVPdXRsZXQ9XCJ0ZW1wbGF0ZTsgY29udGV4dDogeyRpbXBsaWNpdDogb3B0aW9ufVwiPjwvbmctY29udGFpbmVyPlxuICAgICAgICA8L2xpPlxuICAgIGAsXG4gICAgaG9zdDoge1xuICAgICAgICAnY2xhc3MnOiAncC1lbGVtZW50J1xuICAgIH1cbn0pXG5leHBvcnQgY2xhc3MgRHJvcGRvd25JdGVtIHtcblxuICAgIEBJbnB1dCgpIG9wdGlvbjogU2VsZWN0SXRlbTtcblxuICAgIEBJbnB1dCgpIHNlbGVjdGVkOiBib29sZWFuO1xuXG4gICAgQElucHV0KCkgbGFiZWw6IHN0cmluZztcblxuICAgIEBJbnB1dCgpIGRpc2FibGVkOiBib29sZWFuO1xuXG4gICAgQElucHV0KCkgdmlzaWJsZTogYm9vbGVhbjtcblxuICAgIEBJbnB1dCgpIGl0ZW1TaXplOiBudW1iZXI7XG5cbiAgICBASW5wdXQoKSB0ZW1wbGF0ZTogVGVtcGxhdGVSZWY8YW55PjtcblxuICAgIEBPdXRwdXQoKSBvbkNsaWNrOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICAgIG9uT3B0aW9uQ2xpY2soZXZlbnQ6IEV2ZW50KSB7XG4gICAgICAgIHRoaXMub25DbGljay5lbWl0KHtcbiAgICAgICAgICAgIG9yaWdpbmFsRXZlbnQ6IGV2ZW50LFxuICAgICAgICAgICAgb3B0aW9uOiB0aGlzLm9wdGlvblxuICAgICAgICB9KTtcbiAgICB9XG59XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAncC1kcm9wZG93bicsXG4gICAgdGVtcGxhdGU6IGBcbiAgICAgICAgIDxkaXYgI2NvbnRhaW5lciBbbmdDbGFzc109XCJ7J3AtZHJvcGRvd24gcC1jb21wb25lbnQnOnRydWUsXG4gICAgICAgICAgICAncC1kaXNhYmxlZCc6ZGlzYWJsZWQsICdwLWRyb3Bkb3duLW9wZW4nOm92ZXJsYXlWaXNpYmxlLCAncC1mb2N1cyc6Zm9jdXNlZCwgJ3AtZHJvcGRvd24tY2xlYXJhYmxlJzogc2hvd0NsZWFyICYmICFkaXNhYmxlZH1cIlxuICAgICAgICAgICAgKGNsaWNrKT1cIm9uTW91c2VjbGljaygkZXZlbnQpXCIgW25nU3R5bGVdPVwic3R5bGVcIiBbY2xhc3NdPVwic3R5bGVDbGFzc1wiPlxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cInAtaGlkZGVuLWFjY2Vzc2libGVcIj5cbiAgICAgICAgICAgICAgICA8aW5wdXQgI2luIFthdHRyLmlkXT1cImlucHV0SWRcIiB0eXBlPVwidGV4dFwiIHJlYWRvbmx5IChmb2N1cyk9XCJvbklucHV0Rm9jdXMoJGV2ZW50KVwiIGFyaWEtaGFzcG9wdXA9XCJsaXN0Ym94XCIgW2F0dHIucGxhY2Vob2xkZXJdPVwicGxhY2Vob2xkZXJcIlxuICAgICAgICAgICAgICAgICAgICBhcmlhLWhhc3BvcHVwPVwibGlzdGJveFwiIFthdHRyLmFyaWEtZXhwYW5kZWRdPVwib3ZlcmxheVZpc2libGVcIiBbYXR0ci5hcmlhLWxhYmVsbGVkYnldPVwiYXJpYUxhYmVsbGVkQnlcIiAoYmx1cik9XCJvbklucHV0Qmx1cigkZXZlbnQpXCIgKGtleWRvd24pPVwib25LZXlkb3duKCRldmVudCwgdHJ1ZSlcIlxuICAgICAgICAgICAgICAgICAgICBbZGlzYWJsZWRdPVwiZGlzYWJsZWRcIiBbYXR0ci50YWJpbmRleF09XCJ0YWJpbmRleFwiIFthdHRyLmF1dG9mb2N1c109XCJhdXRvZm9jdXNcIiBbYXR0ci5hcmlhLWFjdGl2ZWRlc2NlbmRhbnRdPVwib3ZlcmxheVZpc2libGUgPyAncC1oaWdobGlnaHRlZC1vcHRpb24nIDogbGFiZWxJZFwiIHJvbGU9XCJsaXN0Ym94XCI+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDxzcGFuIFthdHRyLmlkXT1cImxhYmVsSWRcIiBbbmdDbGFzc109XCJ7J3AtZHJvcGRvd24tbGFiZWwgcC1pbnB1dHRleHQnOnRydWUsJ3AtZHJvcGRvd24tbGFiZWwtZW1wdHknOihsYWJlbCA9PSBudWxsIHx8IGxhYmVsLmxlbmd0aCA9PT0gMCl9XCIgKm5nSWY9XCIhZWRpdGFibGUgJiYgKGxhYmVsICE9IG51bGwpXCIgW3BUb29sdGlwXT1cInRvb2x0aXBcIiBbdG9vbHRpcFBvc2l0aW9uXT1cInRvb2x0aXBQb3NpdGlvblwiIFtwb3NpdGlvblN0eWxlXT1cInRvb2x0aXBQb3NpdGlvblN0eWxlXCIgW3Rvb2x0aXBTdHlsZUNsYXNzXT1cInRvb2x0aXBTdHlsZUNsYXNzXCI+XG4gICAgICAgICAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdJZj1cIiFzZWxlY3RlZEl0ZW1UZW1wbGF0ZVwiPnt7bGFiZWx8fCdlbXB0eSd9fTwvbmctY29udGFpbmVyPlxuICAgICAgICAgICAgICAgIDxuZy1jb250YWluZXIgKm5nVGVtcGxhdGVPdXRsZXQ9XCJzZWxlY3RlZEl0ZW1UZW1wbGF0ZTsgY29udGV4dDogeyRpbXBsaWNpdDogc2VsZWN0ZWRPcHRpb259XCI+PC9uZy1jb250YWluZXI+XG4gICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICA8c3BhbiBbbmdDbGFzc109XCJ7J3AtZHJvcGRvd24tbGFiZWwgcC1pbnB1dHRleHQgcC1wbGFjZWhvbGRlcic6dHJ1ZSwncC1kcm9wZG93bi1sYWJlbC1lbXB0eSc6IChwbGFjZWhvbGRlciA9PSBudWxsIHx8IHBsYWNlaG9sZGVyLmxlbmd0aCA9PT0gMCl9XCIgKm5nSWY9XCIhZWRpdGFibGUgJiYgKGxhYmVsID09IG51bGwpXCI+e3twbGFjZWhvbGRlcnx8J2VtcHR5J319PC9zcGFuPlxuICAgICAgICAgICAgPGlucHV0ICNlZGl0YWJsZUlucHV0IHR5cGU9XCJ0ZXh0XCIgW2F0dHIubWF4bGVuZ3RoXT1cIm1heGxlbmd0aFwiIGNsYXNzPVwicC1kcm9wZG93bi1sYWJlbCBwLWlucHV0dGV4dFwiICpuZ0lmPVwiZWRpdGFibGVcIiBbZGlzYWJsZWRdPVwiZGlzYWJsZWRcIiBbYXR0ci5wbGFjZWhvbGRlcl09XCJwbGFjZWhvbGRlclwiXG4gICAgICAgICAgICAgICAgYXJpYS1oYXNwb3B1cD1cImxpc3Rib3hcIiBbYXR0ci5hcmlhLWV4cGFuZGVkXT1cIm92ZXJsYXlWaXNpYmxlXCIgKGNsaWNrKT1cIm9uRWRpdGFibGVJbnB1dENsaWNrKClcIiAoaW5wdXQpPVwib25FZGl0YWJsZUlucHV0Q2hhbmdlKCRldmVudClcIiAoZm9jdXMpPVwib25FZGl0YWJsZUlucHV0Rm9jdXMoJGV2ZW50KVwiIChibHVyKT1cIm9uSW5wdXRCbHVyKCRldmVudClcIj5cbiAgICAgICAgICAgIDxpIGNsYXNzPVwicC1kcm9wZG93bi1jbGVhci1pY29uIHBpIHBpLXRpbWVzXCIgKGNsaWNrKT1cImNsZWFyKCRldmVudClcIiAqbmdJZj1cInZhbHVlICE9IG51bGwgJiYgc2hvd0NsZWFyICYmICFkaXNhYmxlZFwiPjwvaT5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJwLWRyb3Bkb3duLXRyaWdnZXJcIiByb2xlPVwiYnV0dG9uXCIgYXJpYS1oYXNwb3B1cD1cImxpc3Rib3hcIiBbYXR0ci5hcmlhLWV4cGFuZGVkXT1cIm92ZXJsYXlWaXNpYmxlXCI+XG4gICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJwLWRyb3Bkb3duLXRyaWdnZXItaWNvblwiIFtuZ0NsYXNzXT1cImRyb3Bkb3duSWNvblwiPjwvc3Bhbj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPGRpdiAqbmdJZj1cIm92ZXJsYXlWaXNpYmxlXCIgW25nQ2xhc3NdPVwiJ3AtZHJvcGRvd24tcGFuZWwgcC1jb21wb25lbnQnXCIgKGNsaWNrKT1cIm9uT3ZlcmxheUNsaWNrKCRldmVudClcIiBbQG92ZXJsYXlBbmltYXRpb25dPVwie3ZhbHVlOiAndmlzaWJsZScsIHBhcmFtczoge3Nob3dUcmFuc2l0aW9uUGFyYW1zOiBzaG93VHJhbnNpdGlvbk9wdGlvbnMsIGhpZGVUcmFuc2l0aW9uUGFyYW1zOiBoaWRlVHJhbnNpdGlvbk9wdGlvbnN9fVwiIChAb3ZlcmxheUFuaW1hdGlvbi5zdGFydCk9XCJvbk92ZXJsYXlBbmltYXRpb25TdGFydCgkZXZlbnQpXCIgKEBvdmVybGF5QW5pbWF0aW9uLnN0YXJ0KT1cIm9uT3ZlcmxheUFuaW1hdGlvbkVuZCgkZXZlbnQpXCJvbk92ZXJsYXlBbmltYXRpb25FbmQgW25nU3R5bGVdPVwicGFuZWxTdHlsZVwiIFtjbGFzc109XCJwYW5lbFN0eWxlQ2xhc3NcIj5cbiAgICAgICAgICAgICAgICA8bmctY29udGFpbmVyICpuZ1RlbXBsYXRlT3V0bGV0PVwiaGVhZGVyVGVtcGxhdGVcIj48L25nLWNvbnRhaW5lcj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwicC1kcm9wZG93bi1oZWFkZXJcIiAqbmdJZj1cImZpbHRlclwiID5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInAtZHJvcGRvd24tZmlsdGVyLWNvbnRhaW5lclwiIChjbGljayk9XCIkZXZlbnQuc3RvcFByb3BhZ2F0aW9uKClcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxpbnB1dCAjZmlsdGVyIHR5cGU9XCJ0ZXh0XCIgYXV0b2NvbXBsZXRlPVwib2ZmXCIgW3ZhbHVlXT1cImZpbHRlclZhbHVlfHwnJ1wiIGNsYXNzPVwicC1kcm9wZG93bi1maWx0ZXIgcC1pbnB1dHRleHQgcC1jb21wb25lbnRcIiBbYXR0ci5wbGFjZWhvbGRlcl09XCJmaWx0ZXJQbGFjZWhvbGRlclwiXG4gICAgICAgICAgICAgICAgICAgICAgICAoa2V5ZG93bi5lbnRlcik9XCIkZXZlbnQucHJldmVudERlZmF1bHQoKVwiIChrZXlkb3duKT1cIm9uS2V5ZG93bigkZXZlbnQsIGZhbHNlKVwiIChpbnB1dCk9XCJvbkZpbHRlcklucHV0Q2hhbmdlKCRldmVudClcIiBbYXR0ci5hcmlhLWxhYmVsXT1cImFyaWFGaWx0ZXJMYWJlbFwiIFthdHRyLmFyaWEtYWN0aXZlZGVzY2VuZGFudF09XCJvdmVybGF5VmlzaWJsZSA/ICdwLWhpZ2hsaWdodGVkLW9wdGlvbicgOiBsYWJlbElkXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cInAtZHJvcGRvd24tZmlsdGVyLWljb24gcGkgcGktc2VhcmNoXCI+PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwicC1kcm9wZG93bi1pdGVtcy13cmFwcGVyXCIgW3N0eWxlLm1heC1oZWlnaHRdPVwidmlydHVhbFNjcm9sbCA/ICdhdXRvJyA6IChzY3JvbGxIZWlnaHR8fCdhdXRvJylcIj5cbiAgICAgICAgICAgICAgICAgICAgPHVsIGNsYXNzPVwicC1kcm9wZG93bi1pdGVtc1wiIFtuZ0NsYXNzXT1cInsncC1kcm9wZG93bi12aXJ0dWFsc2Nyb2xsJzogdmlydHVhbFNjcm9sbH1cIiByb2xlPVwibGlzdGJveFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdJZj1cImdyb3VwXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPG5nLXRlbXBsYXRlIG5nRm9yIGxldC1vcHRncm91cCBbbmdGb3JPZl09XCJvcHRpb25zVG9EaXNwbGF5XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxsaSBjbGFzcz1cInAtZHJvcGRvd24taXRlbS1ncm91cFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gKm5nSWY9XCIhZ3JvdXBUZW1wbGF0ZVwiPnt7Z2V0T3B0aW9uR3JvdXBMYWJlbChvcHRncm91cCl8fCdlbXB0eSd9fTwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxuZy1jb250YWluZXIgKm5nVGVtcGxhdGVPdXRsZXQ9XCJncm91cFRlbXBsYXRlOyBjb250ZXh0OiB7JGltcGxpY2l0OiBvcHRncm91cH1cIj48L25nLWNvbnRhaW5lcj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9saT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdUZW1wbGF0ZU91dGxldD1cIml0ZW1zbGlzdDsgY29udGV4dDogeyRpbXBsaWNpdDogZ2V0T3B0aW9uR3JvdXBDaGlsZHJlbihvcHRncm91cCksIHNlbGVjdGVkT3B0aW9uOiBzZWxlY3RlZE9wdGlvbn1cIj48L25nLWNvbnRhaW5lcj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L25nLXRlbXBsYXRlPlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9uZy1jb250YWluZXI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8bmctY29udGFpbmVyICpuZ0lmPVwiIWdyb3VwXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdUZW1wbGF0ZU91dGxldD1cIml0ZW1zbGlzdDsgY29udGV4dDogeyRpbXBsaWNpdDogb3B0aW9uc1RvRGlzcGxheSwgc2VsZWN0ZWRPcHRpb246IHNlbGVjdGVkT3B0aW9ufVwiPjwvbmctY29udGFpbmVyPlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9uZy1jb250YWluZXI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8bmctdGVtcGxhdGUgI2l0ZW1zbGlzdCBsZXQtb3B0aW9ucyBsZXQtc2VsZWN0ZWRPcHRpb249XCJzZWxlY3RlZE9wdGlvblwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxuZy1jb250YWluZXIgKm5nSWY9XCIhdmlydHVhbFNjcm9sbDsgZWxzZSB2aXJ0dWFsU2Nyb2xsTGlzdFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8bmctdGVtcGxhdGUgbmdGb3IgbGV0LW9wdGlvbiBsZXQtaT1cImluZGV4XCIgW25nRm9yT2ZdPVwib3B0aW9uc1wiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHAtZHJvcGRvd25JdGVtIFtvcHRpb25dPVwib3B0aW9uXCIgW3NlbGVjdGVkXT1cInNlbGVjdGVkT3B0aW9uID09IG9wdGlvblwiIFtsYWJlbF09XCJnZXRPcHRpb25MYWJlbChvcHRpb24pXCIgW2Rpc2FibGVkXT1cImlzT3B0aW9uRGlzYWJsZWQob3B0aW9uKVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKG9uQ2xpY2spPVwib25JdGVtQ2xpY2soJGV2ZW50KVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgW3RlbXBsYXRlXT1cIml0ZW1UZW1wbGF0ZVwiPjwvcC1kcm9wZG93bkl0ZW0+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvbmctdGVtcGxhdGU+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9uZy1jb250YWluZXI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPG5nLXRlbXBsYXRlICN2aXJ0dWFsU2Nyb2xsTGlzdD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGNkay12aXJ0dWFsLXNjcm9sbC12aWV3cG9ydCAoc2Nyb2xsZWRJbmRleENoYW5nZSk9XCJzY3JvbGxUb1NlbGVjdGVkVmlydHVhbFNjcm9sbEVsZW1lbnQoKVwiICN2aWV3cG9ydCBbbmdTdHlsZV09XCJ7J2hlaWdodCc6IHNjcm9sbEhlaWdodH1cIiBbaXRlbVNpemVdPVwiaXRlbVNpemVcIiAqbmdJZj1cInZpcnR1YWxTY3JvbGwgJiYgb3B0aW9uc1RvRGlzcGxheSAmJiBvcHRpb25zVG9EaXNwbGF5Lmxlbmd0aFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPG5nLWNvbnRhaW5lciAqY2RrVmlydHVhbEZvcj1cImxldCBvcHRpb24gb2Ygb3B0aW9uczsgbGV0IGkgPSBpbmRleDsgbGV0IGMgPSBjb3VudDsgbGV0IGYgPSBmaXJzdDsgbGV0IGwgPSBsYXN0OyBsZXQgZSA9IGV2ZW47IGxldCBvID0gb2RkXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHAtZHJvcGRvd25JdGVtIFtvcHRpb25dPVwib3B0aW9uXCIgW3NlbGVjdGVkXT1cInNlbGVjdGVkT3B0aW9uID09IG9wdGlvblwiIFtsYWJlbF09XCJnZXRPcHRpb25MYWJlbChvcHRpb24pXCIgW2Rpc2FibGVkXT1cImlzT3B0aW9uRGlzYWJsZWQob3B0aW9uKVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKG9uQ2xpY2spPVwib25JdGVtQ2xpY2soJGV2ZW50KVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgW3RlbXBsYXRlXT1cIml0ZW1UZW1wbGF0ZVwiPjwvcC1kcm9wZG93bkl0ZW0+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L25nLWNvbnRhaW5lcj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9jZGstdmlydHVhbC1zY3JvbGwtdmlld3BvcnQ+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9uZy10ZW1wbGF0ZT5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvbmctdGVtcGxhdGU+XG4gICAgICAgICAgICAgICAgICAgICAgICA8bGkgKm5nSWY9XCJmaWx0ZXJWYWx1ZSAmJiBpc0VtcHR5KClcIiBjbGFzcz1cInAtZHJvcGRvd24tZW1wdHktbWVzc2FnZVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxuZy1jb250YWluZXIgKm5nSWY9XCIhZW1wdHlGaWx0ZXJUZW1wbGF0ZSAmJiAhZW1wdHlUZW1wbGF0ZTsgZWxzZSBlbXB0eUZpbHRlclwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7e2VtcHR5RmlsdGVyTWVzc2FnZUxhYmVsfX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L25nLWNvbnRhaW5lcj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8bmctY29udGFpbmVyICNlbXB0eUZpbHRlciAqbmdUZW1wbGF0ZU91dGxldD1cImVtcHR5RmlsdGVyVGVtcGxhdGUgfHwgZW1wdHlUZW1wbGF0ZVwiPjwvbmctY29udGFpbmVyPlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9saT5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxsaSAqbmdJZj1cIiFmaWx0ZXJWYWx1ZSAmJiBpc0VtcHR5KClcIiBjbGFzcz1cInAtZHJvcGRvd24tZW1wdHktbWVzc2FnZVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxuZy1jb250YWluZXIgKm5nSWY9XCIhZW1wdHlUZW1wbGF0ZTsgZWxzZSBlbXB0eVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7e2VtcHR5TWVzc2FnZUxhYmVsfX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L25nLWNvbnRhaW5lcj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8bmctY29udGFpbmVyICNlbXB0eSAqbmdUZW1wbGF0ZU91dGxldD1cImVtcHR5VGVtcGxhdGVcIj48L25nLWNvbnRhaW5lcj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvbGk+XG4gICAgICAgICAgICAgICAgICAgIDwvdWw+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdUZW1wbGF0ZU91dGxldD1cImZvb3RlclRlbXBsYXRlXCI+PC9uZy1jb250YWluZXI+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgYCxcbiAgICBhbmltYXRpb25zOiBbXG4gICAgICAgIHRyaWdnZXIoJ292ZXJsYXlBbmltYXRpb24nLCBbXG4gICAgICAgICAgICB0cmFuc2l0aW9uKCc6ZW50ZXInLCBbXG4gICAgICAgICAgICAgICAgc3R5bGUoe29wYWNpdHk6IDAsIHRyYW5zZm9ybTogJ3NjYWxlWSgwLjgpJ30pLFxuICAgICAgICAgICAgICAgIGFuaW1hdGUoJ3t7c2hvd1RyYW5zaXRpb25QYXJhbXN9fScpXG4gICAgICAgICAgICBdKSxcbiAgICAgICAgICAgIHRyYW5zaXRpb24oJzpsZWF2ZScsIFtcbiAgICAgICAgICAgICAgICBhbmltYXRlKCd7e2hpZGVUcmFuc2l0aW9uUGFyYW1zfX0nLCBzdHlsZSh7IG9wYWNpdHk6IDAgfSkpXG4gICAgICAgICAgICBdKVxuICAgICAgICBdKVxuICAgIF0sXG4gICAgaG9zdDoge1xuICAgICAgICAnY2xhc3MnOiAncC1lbGVtZW50IHAtaW5wdXR3cmFwcGVyJyxcbiAgICAgICAgJ1tjbGFzcy5wLWlucHV0d3JhcHBlci1maWxsZWRdJzogJ2ZpbGxlZCcsXG4gICAgICAgICdbY2xhc3MucC1pbnB1dHdyYXBwZXItZm9jdXNdJzogJ2ZvY3VzZWQgfHwgb3ZlcmxheVZpc2libGUnXG4gICAgfSxcbiAgICBwcm92aWRlcnM6IFtEUk9QRE9XTl9WQUxVRV9BQ0NFU1NPUl0sXG4gICAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG4gICAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZSxcbiAgICBzdHlsZVVybHM6IFsnLi9kcm9wZG93bi5jc3MnXVxufSlcbmV4cG9ydCBjbGFzcyBEcm9wZG93biBpbXBsZW1lbnRzIE9uSW5pdCxBZnRlclZpZXdJbml0LEFmdGVyQ29udGVudEluaXQsQWZ0ZXJWaWV3Q2hlY2tlZCxPbkRlc3Ryb3ksQ29udHJvbFZhbHVlQWNjZXNzb3Ige1xuXG4gICAgQElucHV0KCkgc2Nyb2xsSGVpZ2h0OiBzdHJpbmcgPSAnMjAwcHgnO1xuXG4gICAgQElucHV0KCkgZmlsdGVyOiBib29sZWFuO1xuXG4gICAgQElucHV0KCkgbmFtZTogc3RyaW5nO1xuXG4gICAgQElucHV0KCkgc3R5bGU6IGFueTtcblxuICAgIEBJbnB1dCgpIHBhbmVsU3R5bGU6IGFueTtcblxuICAgIEBJbnB1dCgpIHN0eWxlQ2xhc3M6IHN0cmluZztcblxuICAgIEBJbnB1dCgpIHBhbmVsU3R5bGVDbGFzczogc3RyaW5nO1xuXG4gICAgQElucHV0KCkgcmVhZG9ubHk6IGJvb2xlYW47XG5cbiAgICBASW5wdXQoKSByZXF1aXJlZDogYm9vbGVhbjtcblxuICAgIEBJbnB1dCgpIGVkaXRhYmxlOiBib29sZWFuO1xuXG4gICAgQElucHV0KCkgYXBwZW5kVG86IGFueSA9IFwiYm9keVwiO1xuXG4gICAgQElucHV0KCkgdGFiaW5kZXg6IG51bWJlcjtcblxuICAgIEBJbnB1dCgpIHBsYWNlaG9sZGVyOiBzdHJpbmc7XG5cbiAgICBASW5wdXQoKSBmaWx0ZXJQbGFjZWhvbGRlcjogc3RyaW5nO1xuXG4gICAgQElucHV0KCkgZmlsdGVyTG9jYWxlOiBzdHJpbmc7XG5cbiAgICBASW5wdXQoKSBpbnB1dElkOiBzdHJpbmc7XG5cbiAgICBASW5wdXQoKSBzZWxlY3RJZDogc3RyaW5nO1xuXG4gICAgQElucHV0KCkgZGF0YUtleTogc3RyaW5nO1xuXG4gICAgQElucHV0KCkgZmlsdGVyQnk6IHN0cmluZztcblxuICAgIEBJbnB1dCgpIGF1dG9mb2N1czogYm9vbGVhbjtcblxuICAgIEBJbnB1dCgpIHJlc2V0RmlsdGVyT25IaWRlOiBib29sZWFuID0gZmFsc2U7XG5cbiAgICBASW5wdXQoKSBkcm9wZG93bkljb246IHN0cmluZyA9ICdwaSBwaS1jaGV2cm9uLWRvd24nO1xuXG4gICAgQElucHV0KCkgb3B0aW9uTGFiZWw6IHN0cmluZztcblxuICAgIEBJbnB1dCgpIG9wdGlvblZhbHVlOiBzdHJpbmc7XG5cbiAgICBASW5wdXQoKSBvcHRpb25EaXNhYmxlZDogc3RyaW5nO1xuXG4gICAgQElucHV0KCkgb3B0aW9uR3JvdXBMYWJlbDogc3RyaW5nO1xuXG4gICAgQElucHV0KCkgb3B0aW9uR3JvdXBDaGlsZHJlbjogc3RyaW5nID0gXCJpdGVtc1wiO1xuXG4gICAgQElucHV0KCkgYXV0b0Rpc3BsYXlGaXJzdDogYm9vbGVhbiA9IHRydWU7XG5cbiAgICBASW5wdXQoKSBncm91cDogYm9vbGVhbjtcblxuICAgIEBJbnB1dCgpIHNob3dDbGVhcjogYm9vbGVhbjtcblxuICAgIEBJbnB1dCgpIGVtcHR5RmlsdGVyTWVzc2FnZTogc3RyaW5nID0gJyc7XG5cbiAgICBASW5wdXQoKSBlbXB0eU1lc3NhZ2U6IHN0cmluZyA9ICcnO1xuXG4gICAgQElucHV0KCkgdmlydHVhbFNjcm9sbDogYm9vbGVhbjtcblxuICAgIEBJbnB1dCgpIGl0ZW1TaXplOiBudW1iZXI7XG5cbiAgICBASW5wdXQoKSBhdXRvWkluZGV4OiBib29sZWFuID0gdHJ1ZTtcblxuICAgIEBJbnB1dCgpIGJhc2VaSW5kZXg6IG51bWJlciA9IDA7XG5cbiAgICBASW5wdXQoKSBzaG93VHJhbnNpdGlvbk9wdGlvbnM6IHN0cmluZyA9ICcuMTJzIGN1YmljLWJlemllcigwLCAwLCAwLjIsIDEpJztcblxuICAgIEBJbnB1dCgpIGhpZGVUcmFuc2l0aW9uT3B0aW9uczogc3RyaW5nID0gJy4xcyBsaW5lYXInO1xuXG4gICAgQElucHV0KCkgYXJpYUZpbHRlckxhYmVsOiBzdHJpbmc7XG5cbiAgICBASW5wdXQoKSBhcmlhTGFiZWxsZWRCeTogc3RyaW5nO1xuXG4gICAgQElucHV0KCkgZmlsdGVyTWF0Y2hNb2RlOiBzdHJpbmcgPSBcImNvbnRhaW5zXCI7XG5cbiAgICBASW5wdXQoKSBtYXhsZW5ndGg6IG51bWJlcjtcblxuICAgIEBJbnB1dCgpIHRvb2x0aXA6IHN0cmluZyA9ICcnO1xuXG4gICAgQElucHV0KCkgdG9vbHRpcFBvc2l0aW9uOiBzdHJpbmcgPSAncmlnaHQnO1xuXG4gICAgQElucHV0KCkgdG9vbHRpcFBvc2l0aW9uU3R5bGU6IHN0cmluZyA9ICdhYnNvbHV0ZSc7XG5cbiAgICBASW5wdXQoKSB0b29sdGlwU3R5bGVDbGFzczogc3RyaW5nO1xuXG4gICAgQElucHV0KCkgYXV0b2ZvY3VzRmlsdGVyOiBib29sZWFuID0gdHJ1ZTtcblxuICAgIEBPdXRwdXQoKSBvbkNoYW5nZTogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgICBAT3V0cHV0KCkgb25GaWx0ZXI6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG4gICAgQE91dHB1dCgpIG9uRm9jdXM6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG4gICAgQE91dHB1dCgpIG9uQmx1cjogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgICBAT3V0cHV0KCkgb25DbGljazogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgICBAT3V0cHV0KCkgb25TaG93OiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICAgIEBPdXRwdXQoKSBvbkhpZGU6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG4gICAgQFZpZXdDaGlsZCgnY29udGFpbmVyJykgY29udGFpbmVyVmlld0NoaWxkOiBFbGVtZW50UmVmO1xuXG4gICAgQFZpZXdDaGlsZCgnZmlsdGVyJykgZmlsdGVyVmlld0NoaWxkOiBFbGVtZW50UmVmO1xuXG4gICAgQFZpZXdDaGlsZCgnaW4nKSBhY2Nlc3NpYmxlVmlld0NoaWxkOiBFbGVtZW50UmVmO1xuXG4gICAgQFZpZXdDaGlsZChDZGtWaXJ0dWFsU2Nyb2xsVmlld3BvcnQpIHZpZXdQb3J0OiBDZGtWaXJ0dWFsU2Nyb2xsVmlld3BvcnQ7XG5cbiAgICBAVmlld0NoaWxkKCdlZGl0YWJsZUlucHV0JykgZWRpdGFibGVJbnB1dFZpZXdDaGlsZDogRWxlbWVudFJlZjtcblxuICAgIEBDb250ZW50Q2hpbGRyZW4oUHJpbWVUZW1wbGF0ZSkgdGVtcGxhdGVzOiBRdWVyeUxpc3Q8YW55PjtcblxuICAgIHByaXZhdGUgX2Rpc2FibGVkOiBib29sZWFuO1xuXG4gICAgQElucHV0KCkgZ2V0IGRpc2FibGVkKCk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gdGhpcy5fZGlzYWJsZWQ7XG4gICAgfTtcblxuICAgIHNldCBkaXNhYmxlZChfZGlzYWJsZWQ6IGJvb2xlYW4pIHtcbiAgICAgICAgaWYgKF9kaXNhYmxlZCkge1xuICAgICAgICAgICAgdGhpcy5mb2N1c2VkID0gZmFsc2U7XG5cbiAgICAgICAgICAgIGlmICh0aGlzLm92ZXJsYXlWaXNpYmxlKVxuICAgICAgICAgICAgICAgIHRoaXMuaGlkZSgpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5fZGlzYWJsZWQgPSBfZGlzYWJsZWQ7XG4gICAgICAgIGlmICghKHRoaXMuY2QgYXMgVmlld1JlZikuZGVzdHJveWVkKSB7XG4gICAgICAgICAgICB0aGlzLmNkLmRldGVjdENoYW5nZXMoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIG92ZXJsYXk6IEhUTUxEaXZFbGVtZW50O1xuXG4gICAgaXRlbXNXcmFwcGVyOiBIVE1MRGl2RWxlbWVudDtcblxuICAgIGl0ZW1UZW1wbGF0ZTogVGVtcGxhdGVSZWY8YW55PjtcblxuICAgIGdyb3VwVGVtcGxhdGU6IFRlbXBsYXRlUmVmPGFueT47XG5cbiAgICBzZWxlY3RlZEl0ZW1UZW1wbGF0ZTogVGVtcGxhdGVSZWY8YW55PjtcblxuICAgIGhlYWRlclRlbXBsYXRlOiBUZW1wbGF0ZVJlZjxhbnk+O1xuXG4gICAgZm9vdGVyVGVtcGxhdGU6IFRlbXBsYXRlUmVmPGFueT47XG5cbiAgICBlbXB0eUZpbHRlclRlbXBsYXRlOiBUZW1wbGF0ZVJlZjxhbnk+O1xuXG4gICAgZW1wdHlUZW1wbGF0ZTogVGVtcGxhdGVSZWY8YW55PjtcblxuICAgIHNlbGVjdGVkT3B0aW9uOiBhbnk7XG5cbiAgICBfb3B0aW9uczogYW55W107XG5cbiAgICB2YWx1ZTogYW55O1xuXG4gICAgb25Nb2RlbENoYW5nZTogRnVuY3Rpb24gPSAoKSA9PiB7fTtcblxuICAgIG9uTW9kZWxUb3VjaGVkOiBGdW5jdGlvbiA9ICgpID0+IHt9O1xuXG4gICAgb3B0aW9uc1RvRGlzcGxheTogYW55W107XG5cbiAgICBob3ZlcjogYm9vbGVhbjtcblxuICAgIGZvY3VzZWQ6IGJvb2xlYW47XG5cbiAgICBvdmVybGF5VmlzaWJsZTogYm9vbGVhbjtcblxuICAgIGRvY3VtZW50Q2xpY2tMaXN0ZW5lcjogYW55O1xuXG4gICAgc2Nyb2xsSGFuZGxlcjogYW55O1xuXG4gICAgb3B0aW9uc0NoYW5nZWQ6IGJvb2xlYW47XG5cbiAgICBwYW5lbDogSFRNTERpdkVsZW1lbnQ7XG5cbiAgICBkaW1lbnNpb25zVXBkYXRlZDogYm9vbGVhbjtcblxuICAgIGhvdmVyZWRJdGVtOiBhbnk7XG5cbiAgICBzZWxlY3RlZE9wdGlvblVwZGF0ZWQ6IGJvb2xlYW47XG5cbiAgICBfZmlsdGVyVmFsdWU6IHN0cmluZztcblxuICAgIHNlYXJjaFZhbHVlOiBzdHJpbmc7XG5cbiAgICBzZWFyY2hJbmRleDogbnVtYmVyO1xuXG4gICAgc2VhcmNoVGltZW91dDogYW55O1xuXG4gICAgcHJldmlvdXNTZWFyY2hDaGFyOiBzdHJpbmc7XG5cbiAgICBjdXJyZW50U2VhcmNoQ2hhcjogc3RyaW5nO1xuXG4gICAgZG9jdW1lbnRSZXNpemVMaXN0ZW5lcjogYW55O1xuXG4gICAgdmlydHVhbEF1dG9TY3JvbGxlZDogYm9vbGVhbjtcblxuICAgIHZpcnR1YWxTY3JvbGxTZWxlY3RlZEluZGV4OiBudW1iZXI7XG5cbiAgICB2aWV3UG9ydE9mZnNldFRvcDogbnVtYmVyID0gMDtcblxuICAgIHByZXZlbnRNb2RlbFRvdWNoZWQ6IGJvb2xlYW47XG5cbiAgICBpZDogc3RyaW5nID0gVW5pcXVlQ29tcG9uZW50SWQoKTtcblxuICAgIGxhYmVsSWQ6IHN0cmluZztcblxuICAgIGNvbnN0cnVjdG9yKHB1YmxpYyBlbDogRWxlbWVudFJlZiwgcHVibGljIHJlbmRlcmVyOiBSZW5kZXJlcjIsIHB1YmxpYyBjZDogQ2hhbmdlRGV0ZWN0b3JSZWYsIHB1YmxpYyB6b25lOiBOZ1pvbmUsIHB1YmxpYyBmaWx0ZXJTZXJ2aWNlOiBGaWx0ZXJTZXJ2aWNlLCBwdWJsaWMgY29uZmlnOiBQcmltZU5HQ29uZmlnLCBwdWJsaWMgb3ZlcmxheVNlcnZpY2U6IE92ZXJsYXlTZXJ2aWNlKSB7fVxuXG4gICAgbmdBZnRlckNvbnRlbnRJbml0KCkge1xuICAgICAgICB0aGlzLnRlbXBsYXRlcy5mb3JFYWNoKChpdGVtKSA9PiB7XG4gICAgICAgICAgICBzd2l0Y2goaXRlbS5nZXRUeXBlKCkpIHtcbiAgICAgICAgICAgICAgICBjYXNlICdpdGVtJzpcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5pdGVtVGVtcGxhdGUgPSBpdGVtLnRlbXBsYXRlO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICAgICAgY2FzZSAnc2VsZWN0ZWRJdGVtJzpcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zZWxlY3RlZEl0ZW1UZW1wbGF0ZSA9IGl0ZW0udGVtcGxhdGU7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgICAgICBjYXNlICdoZWFkZXInOlxuICAgICAgICAgICAgICAgICAgICB0aGlzLmhlYWRlclRlbXBsYXRlID0gaXRlbS50ZW1wbGF0ZTtcbiAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgICAgIGNhc2UgJ2Zvb3Rlcic6XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZm9vdGVyVGVtcGxhdGUgPSBpdGVtLnRlbXBsYXRlO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICAgICAgY2FzZSAnZW1wdHlmaWx0ZXInOlxuICAgICAgICAgICAgICAgICAgICB0aGlzLmVtcHR5RmlsdGVyVGVtcGxhdGUgPSBpdGVtLnRlbXBsYXRlO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICAgICAgY2FzZSAnZW1wdHknOlxuICAgICAgICAgICAgICAgICAgICB0aGlzLmVtcHR5VGVtcGxhdGUgPSBpdGVtLnRlbXBsYXRlO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICAgICAgY2FzZSAnZ3JvdXAnOlxuICAgICAgICAgICAgICAgICAgICB0aGlzLmdyb3VwVGVtcGxhdGUgPSBpdGVtLnRlbXBsYXRlO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5pdGVtVGVtcGxhdGUgPSBpdGVtLnRlbXBsYXRlO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBuZ09uSW5pdCgpIHtcbiAgICAgICAgdGhpcy5vcHRpb25zVG9EaXNwbGF5ID0gdGhpcy5vcHRpb25zO1xuICAgICAgICB0aGlzLnVwZGF0ZVNlbGVjdGVkT3B0aW9uKG51bGwpO1xuICAgICAgICB0aGlzLmxhYmVsSWQgPSB0aGlzLmlkICsgJ19sYWJlbCdcbiAgICB9XG5cbiAgICBASW5wdXQoKSBnZXQgb3B0aW9ucygpOiBhbnlbXSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9vcHRpb25zO1xuICAgIH1cblxuICAgIHNldCBvcHRpb25zKHZhbDogYW55W10pIHtcbiAgICAgICAgdGhpcy5fb3B0aW9ucyA9IHZhbDtcbiAgICAgICAgdGhpcy5vcHRpb25zVG9EaXNwbGF5ID0gdGhpcy5fb3B0aW9ucztcbiAgICAgICAgdGhpcy51cGRhdGVTZWxlY3RlZE9wdGlvbih0aGlzLnZhbHVlKTtcbiAgICAgICAgdGhpcy5vcHRpb25zQ2hhbmdlZCA9IHRydWU7XG5cbiAgICAgICAgaWYgKHRoaXMuX2ZpbHRlclZhbHVlICYmIHRoaXMuX2ZpbHRlclZhbHVlLmxlbmd0aCkge1xuICAgICAgICAgICAgdGhpcy5hY3RpdmF0ZUZpbHRlcigpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgQElucHV0KCkgZ2V0IGZpbHRlclZhbHVlKCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiB0aGlzLl9maWx0ZXJWYWx1ZTtcbiAgICB9XG5cbiAgICBzZXQgZmlsdGVyVmFsdWUodmFsOiBzdHJpbmcpIHtcbiAgICAgICAgdGhpcy5fZmlsdGVyVmFsdWUgPSB2YWw7XG4gICAgICAgIHRoaXMuYWN0aXZhdGVGaWx0ZXIoKTtcbiAgICB9XG5cbiAgICBuZ0FmdGVyVmlld0luaXQoKcKge1xuICAgICAgICBpZiAodGhpcy5lZGl0YWJsZSkge1xuICAgICAgICAgICAgdGhpcy51cGRhdGVFZGl0YWJsZUxhYmVsKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBnZXQgbGFiZWwoKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuc2VsZWN0ZWRPcHRpb24gPyB0aGlzLmdldE9wdGlvbkxhYmVsKHRoaXMuc2VsZWN0ZWRPcHRpb24pIDogbnVsbDtcbiAgICB9XG5cbiAgICBnZXQgZW1wdHlNZXNzYWdlTGFiZWwoKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZW1wdHlNZXNzYWdlIHx8IHRoaXMuY29uZmlnLmdldFRyYW5zbGF0aW9uKFRyYW5zbGF0aW9uS2V5cy5FTVBUWV9NRVNTQUdFKTtcbiAgICB9XG5cbiAgICBnZXQgZW1wdHlGaWx0ZXJNZXNzYWdlTGFiZWwoKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZW1wdHlGaWx0ZXJNZXNzYWdlIHx8IHRoaXMuY29uZmlnLmdldFRyYW5zbGF0aW9uKFRyYW5zbGF0aW9uS2V5cy5FTVBUWV9GSUxURVJfTUVTU0FHRSk7XG4gICAgfVxuXG4gICAgZ2V0IGZpbGxlZCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMudmFsdWUgfHwgdGhpcy52YWx1ZSAhPSBudWxsIHx8IHRoaXMudmFsdWUgIT0gdW5kZWZpbmVkO1xuICAgIH1cblxuICAgIHVwZGF0ZUVkaXRhYmxlTGFiZWwoKTogdm9pZCB7XG4gICAgICAgIGlmICh0aGlzLmVkaXRhYmxlSW5wdXRWaWV3Q2hpbGQgJiYgdGhpcy5lZGl0YWJsZUlucHV0Vmlld0NoaWxkLm5hdGl2ZUVsZW1lbnQpIHtcbiAgICAgICAgICAgIHRoaXMuZWRpdGFibGVJbnB1dFZpZXdDaGlsZC5uYXRpdmVFbGVtZW50LnZhbHVlID0gKHRoaXMuc2VsZWN0ZWRPcHRpb24gPyB0aGlzLmdldE9wdGlvbkxhYmVsKHRoaXMuc2VsZWN0ZWRPcHRpb24pIDogdGhpcy52YWx1ZXx8JycpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZ2V0T3B0aW9uTGFiZWwob3B0aW9uOiBhbnkpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMub3B0aW9uTGFiZWwgPyBPYmplY3RVdGlscy5yZXNvbHZlRmllbGREYXRhKG9wdGlvbiwgdGhpcy5vcHRpb25MYWJlbCkgOiAob3B0aW9uLmxhYmVsICE9IHVuZGVmaW5lZCA/IG9wdGlvbi5sYWJlbCA6IG9wdGlvbik7XG4gICAgfVxuXG4gICAgZ2V0T3B0aW9uVmFsdWUob3B0aW9uOiBhbnkpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMub3B0aW9uVmFsdWUgPyBPYmplY3RVdGlscy5yZXNvbHZlRmllbGREYXRhKG9wdGlvbiwgdGhpcy5vcHRpb25WYWx1ZSkgOiAodGhpcy5vcHRpb25MYWJlbCB8fCBvcHRpb24udmFsdWUgPT09IHVuZGVmaW5lZCA/IG9wdGlvbiA6IG9wdGlvbi52YWx1ZSk7XG4gICAgfVxuXG4gICAgaXNPcHRpb25EaXNhYmxlZChvcHRpb246IGFueSkge1xuICAgICAgICByZXR1cm4gdGhpcy5vcHRpb25EaXNhYmxlZCA/IE9iamVjdFV0aWxzLnJlc29sdmVGaWVsZERhdGEob3B0aW9uLCB0aGlzLm9wdGlvbkRpc2FibGVkKSA6IChvcHRpb24uZGlzYWJsZWQgIT09IHVuZGVmaW5lZCA/IG9wdGlvbi5kaXNhYmxlZCA6IGZhbHNlKTtcbiAgICB9XG5cbiAgICBnZXRPcHRpb25Hcm91cExhYmVsKG9wdGlvbkdyb3VwOiBhbnkpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMub3B0aW9uR3JvdXBMYWJlbCA/IE9iamVjdFV0aWxzLnJlc29sdmVGaWVsZERhdGEob3B0aW9uR3JvdXAsIHRoaXMub3B0aW9uR3JvdXBMYWJlbCkgOiAob3B0aW9uR3JvdXAubGFiZWwgIT0gdW5kZWZpbmVkID8gb3B0aW9uR3JvdXAubGFiZWwgOiBvcHRpb25Hcm91cCk7XG4gICAgfVxuXG4gICAgZ2V0T3B0aW9uR3JvdXBDaGlsZHJlbihvcHRpb25Hcm91cDogYW55KSB7XG4gICAgICAgIHJldHVybiB0aGlzLm9wdGlvbkdyb3VwQ2hpbGRyZW4gPyBPYmplY3RVdGlscy5yZXNvbHZlRmllbGREYXRhKG9wdGlvbkdyb3VwLCB0aGlzLm9wdGlvbkdyb3VwQ2hpbGRyZW4pIDogb3B0aW9uR3JvdXAuaXRlbXM7XG4gICAgfVxuXG4gICAgb25JdGVtQ2xpY2soZXZlbnQpIHtcbiAgICAgICAgY29uc3Qgb3B0aW9uID0gZXZlbnQub3B0aW9uO1xuXG4gICAgICAgIGlmICghdGhpcy5pc09wdGlvbkRpc2FibGVkKG9wdGlvbikpIHtcbiAgICAgICAgICAgIHRoaXMuc2VsZWN0SXRlbShldmVudCwgb3B0aW9uKTtcbiAgICAgICAgICAgIHRoaXMuYWNjZXNzaWJsZVZpZXdDaGlsZC5uYXRpdmVFbGVtZW50LmZvY3VzKCk7XG4gICAgICAgIH1cblxuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgIHRoaXMuaGlkZSgpO1xuICAgICAgICB9LCAxNTApO1xuICAgIH1cblxuICAgIHNlbGVjdEl0ZW0oZXZlbnQsIG9wdGlvbikge1xuICAgICAgICBpZiAodGhpcy5zZWxlY3RlZE9wdGlvbiAhPSBvcHRpb24pIHtcbiAgICAgICAgICAgIHRoaXMuc2VsZWN0ZWRPcHRpb24gPSBvcHRpb247XG4gICAgICAgICAgICB0aGlzLnZhbHVlID0gdGhpcy5nZXRPcHRpb25WYWx1ZShvcHRpb24pO1xuXG4gICAgICAgICAgICB0aGlzLm9uTW9kZWxDaGFuZ2UodGhpcy52YWx1ZSk7XG4gICAgICAgICAgICB0aGlzLnVwZGF0ZUVkaXRhYmxlTGFiZWwoKTtcbiAgICAgICAgICAgIHRoaXMub25DaGFuZ2UuZW1pdCh7XG4gICAgICAgICAgICAgICAgb3JpZ2luYWxFdmVudDogZXZlbnQub3JpZ2luYWxFdmVudCxcbiAgICAgICAgICAgICAgICB2YWx1ZTogdGhpcy52YWx1ZVxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIGlmICh0aGlzLnZpcnR1YWxTY3JvbGwpIHtcbiAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy52aWV3UG9ydE9mZnNldFRvcCA9IHRoaXMudmlld1BvcnQgPyB0aGlzLnZpZXdQb3J0Lm1lYXN1cmVTY3JvbGxPZmZzZXQoKSA6IDA7XG4gICAgICAgICAgICAgICAgfSwgMSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBuZ0FmdGVyVmlld0NoZWNrZWQoKSB7XG4gICAgICAgIGlmICh0aGlzLm9wdGlvbnNDaGFuZ2VkICYmIHRoaXMub3ZlcmxheVZpc2libGUpIHtcbiAgICAgICAgICAgIHRoaXMub3B0aW9uc0NoYW5nZWQgPSBmYWxzZTtcblxuICAgICAgICAgICAgaWYgKHRoaXMudmlydHVhbFNjcm9sbCkge1xuICAgICAgICAgICAgICAgIHRoaXMudXBkYXRlVmlydHVhbFNjcm9sbFNlbGVjdGVkSW5kZXgodHJ1ZSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHRoaXMuem9uZS5ydW5PdXRzaWRlQW5ndWxhcigoKSA9PiB7XG4gICAgICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYWxpZ25PdmVybGF5KCk7XG4gICAgICAgICAgICAgICAgfSwgMSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLnNlbGVjdGVkT3B0aW9uVXBkYXRlZCAmJiB0aGlzLml0ZW1zV3JhcHBlcikge1xuICAgICAgICAgICAgaWYgKHRoaXMudmlydHVhbFNjcm9sbCAmJiB0aGlzLnZpZXdQb3J0KSB7XG4gICAgICAgICAgICAgICAgbGV0IHJhbmdlID0gdGhpcy52aWV3UG9ydC5nZXRSZW5kZXJlZFJhbmdlKCk7XG4gICAgICAgICAgICAgICAgdGhpcy51cGRhdGVWaXJ0dWFsU2Nyb2xsU2VsZWN0ZWRJbmRleChmYWxzZSk7XG5cbiAgICAgICAgICAgICAgICBpZiAocmFuZ2Uuc3RhcnQgPiB0aGlzLnZpcnR1YWxTY3JvbGxTZWxlY3RlZEluZGV4IHx8IHJhbmdlLmVuZCA8IHRoaXMudmlydHVhbFNjcm9sbFNlbGVjdGVkSW5kZXgpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy52aWV3UG9ydC5zY3JvbGxUb0luZGV4KHRoaXMudmlydHVhbFNjcm9sbFNlbGVjdGVkSW5kZXgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgbGV0IHNlbGVjdGVkSXRlbSA9IERvbUhhbmRsZXIuZmluZFNpbmdsZSh0aGlzLm92ZXJsYXksICdsaS5wLWhpZ2hsaWdodCcpO1xuICAgICAgICAgICAgaWYgKHNlbGVjdGVkSXRlbSkge1xuICAgICAgICAgICAgICAgIERvbUhhbmRsZXIuc2Nyb2xsSW5WaWV3KHRoaXMuaXRlbXNXcmFwcGVyLCBEb21IYW5kbGVyLmZpbmRTaW5nbGUodGhpcy5vdmVybGF5LCAnbGkucC1oaWdobGlnaHQnKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLnNlbGVjdGVkT3B0aW9uVXBkYXRlZCA9IGZhbHNlO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgd3JpdGVWYWx1ZSh2YWx1ZTogYW55KTogdm9pZCB7XG4gICAgICAgIGlmICh0aGlzLmZpbHRlcikge1xuICAgICAgICAgICAgdGhpcy5yZXNldEZpbHRlcigpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy52YWx1ZSA9IHZhbHVlO1xuICAgICAgICB0aGlzLnVwZGF0ZVNlbGVjdGVkT3B0aW9uKHZhbHVlKTtcbiAgICAgICAgdGhpcy51cGRhdGVFZGl0YWJsZUxhYmVsKCk7XG4gICAgICAgIHRoaXMuY2QubWFya0ZvckNoZWNrKCk7XG4gICAgfVxuXG4gICAgcmVzZXRGaWx0ZXIoKTogdm9pZCB7XG4gICAgICAgIHRoaXMuX2ZpbHRlclZhbHVlID0gbnVsbDtcblxuICAgICAgICBpZiAodGhpcy5maWx0ZXJWaWV3Q2hpbGQgJiYgdGhpcy5maWx0ZXJWaWV3Q2hpbGQubmF0aXZlRWxlbWVudCkge1xuICAgICAgICAgICAgdGhpcy5maWx0ZXJWaWV3Q2hpbGQubmF0aXZlRWxlbWVudC52YWx1ZSA9ICcnO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5vcHRpb25zVG9EaXNwbGF5ID0gdGhpcy5vcHRpb25zO1xuICAgIH1cblxuICAgIHVwZGF0ZVNlbGVjdGVkT3B0aW9uKHZhbDogYW55KTogdm9pZCB7XG4gICAgICAgIHRoaXMuc2VsZWN0ZWRPcHRpb24gPSB0aGlzLmZpbmRPcHRpb24odmFsLCB0aGlzLm9wdGlvbnNUb0Rpc3BsYXkpO1xuICAgICAgICBpZiAodGhpcy5hdXRvRGlzcGxheUZpcnN0ICYmICF0aGlzLnBsYWNlaG9sZGVyICYmICF0aGlzLnNlbGVjdGVkT3B0aW9uICYmIHRoaXMub3B0aW9uc1RvRGlzcGxheSAmJiB0aGlzLm9wdGlvbnNUb0Rpc3BsYXkubGVuZ3RoICYmICF0aGlzLmVkaXRhYmxlKSB7XG4gICAgICAgICAgICB0aGlzLnNlbGVjdGVkT3B0aW9uID0gdGhpcy5vcHRpb25zVG9EaXNwbGF5WzBdO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuc2VsZWN0ZWRPcHRpb25VcGRhdGVkID0gdHJ1ZTtcbiAgICB9XG5cbiAgICByZWdpc3Rlck9uQ2hhbmdlKGZuOiBGdW5jdGlvbik6IHZvaWQge1xuICAgICAgICB0aGlzLm9uTW9kZWxDaGFuZ2UgPSBmbjtcbiAgICB9XG5cbiAgICByZWdpc3Rlck9uVG91Y2hlZChmbjogRnVuY3Rpb24pOiB2b2lkIHtcbiAgICAgICAgdGhpcy5vbk1vZGVsVG91Y2hlZCA9IGZuO1xuICAgIH1cblxuICAgIHNldERpc2FibGVkU3RhdGUodmFsOiBib29sZWFuKTogdm9pZCB7XG4gICAgICAgIHRoaXMuZGlzYWJsZWQgPSB2YWw7XG4gICAgICAgIHRoaXMuY2QubWFya0ZvckNoZWNrKCk7XG4gICAgfVxuXG4gICAgb25Nb3VzZWNsaWNrKGV2ZW50KSB7XG4gICAgICAgIGlmICh0aGlzLmRpc2FibGVkIHx8IHRoaXMucmVhZG9ubHkgfHwgdGhpcy5pc0lucHV0Q2xpY2soZXZlbnQpKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLm9uQ2xpY2suZW1pdChldmVudCk7XG4gICAgICAgIHRoaXMuYWNjZXNzaWJsZVZpZXdDaGlsZC5uYXRpdmVFbGVtZW50LmZvY3VzKCk7XG5cbiAgICAgICAgaWYgKHRoaXMub3ZlcmxheVZpc2libGUpXG4gICAgICAgICAgICB0aGlzLmhpZGUoKTtcbiAgICAgICAgZWxzZVxuICAgICAgICAgICAgdGhpcy5zaG93KCk7XG5cbiAgICAgICAgdGhpcy5jZC5kZXRlY3RDaGFuZ2VzKCk7XG4gICAgfVxuXG4gICAgb25PdmVybGF5Q2xpY2soZXZlbnQpIHtcbiAgICAgICAgdGhpcy5vdmVybGF5U2VydmljZS5hZGQoe1xuICAgICAgICAgICAgb3JpZ2luYWxFdmVudDogZXZlbnQsXG4gICAgICAgICAgICB0YXJnZXQ6IHRoaXMuZWwubmF0aXZlRWxlbWVudFxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBpc0lucHV0Q2xpY2soZXZlbnQpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIERvbUhhbmRsZXIuaGFzQ2xhc3MoZXZlbnQudGFyZ2V0LCAncC1kcm9wZG93bi1jbGVhci1pY29uJykgfHxcbiAgICAgICAgICAgIGV2ZW50LnRhcmdldC5pc1NhbWVOb2RlKHRoaXMuYWNjZXNzaWJsZVZpZXdDaGlsZC5uYXRpdmVFbGVtZW50KSB8fFxuICAgICAgICAgICAgKHRoaXMuZWRpdGFibGVJbnB1dFZpZXdDaGlsZCAmJiBldmVudC50YXJnZXQuaXNTYW1lTm9kZSh0aGlzLmVkaXRhYmxlSW5wdXRWaWV3Q2hpbGQubmF0aXZlRWxlbWVudCkpO1xuICAgIH1cblxuICAgIGlzT3V0c2lkZUNsaWNrZWQoZXZlbnQ6IEV2ZW50KTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiAhKHRoaXMuZWwubmF0aXZlRWxlbWVudC5pc1NhbWVOb2RlKGV2ZW50LnRhcmdldCkgfHwgdGhpcy5lbC5uYXRpdmVFbGVtZW50LmNvbnRhaW5zKGV2ZW50LnRhcmdldCkgfHwgKHRoaXMub3ZlcmxheSAmJiB0aGlzLm92ZXJsYXkuY29udGFpbnMoPE5vZGU+IGV2ZW50LnRhcmdldCkpKTtcbiAgICB9XG5cbiAgICBpc0VtcHR5KCkge1xuICAgICAgICByZXR1cm4gIXRoaXMub3B0aW9uc1RvRGlzcGxheSB8fCAodGhpcy5vcHRpb25zVG9EaXNwbGF5ICYmIHRoaXMub3B0aW9uc1RvRGlzcGxheS5sZW5ndGggPT09IDApO1xuICAgIH1cblxuICAgIG9uRWRpdGFibGVJbnB1dENsaWNrKCkge1xuICAgICAgICB0aGlzLmJpbmREb2N1bWVudENsaWNrTGlzdGVuZXIoKTtcbiAgICB9XG5cbiAgICBvbkVkaXRhYmxlSW5wdXRGb2N1cyhldmVudCkge1xuICAgICAgICB0aGlzLmZvY3VzZWQgPSB0cnVlO1xuICAgICAgICB0aGlzLmhpZGUoKTtcbiAgICAgICAgdGhpcy5vbkZvY3VzLmVtaXQoZXZlbnQpO1xuICAgIH1cblxuICAgIG9uRWRpdGFibGVJbnB1dENoYW5nZShldmVudCkge1xuICAgICAgICB0aGlzLnZhbHVlID0gZXZlbnQudGFyZ2V0LnZhbHVlO1xuICAgICAgICB0aGlzLnVwZGF0ZVNlbGVjdGVkT3B0aW9uKHRoaXMudmFsdWUpO1xuICAgICAgICB0aGlzLm9uTW9kZWxDaGFuZ2UodGhpcy52YWx1ZSk7XG4gICAgICAgIHRoaXMub25DaGFuZ2UuZW1pdCh7XG4gICAgICAgICAgICBvcmlnaW5hbEV2ZW50OiBldmVudCxcbiAgICAgICAgICAgIHZhbHVlOiB0aGlzLnZhbHVlXG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHNob3coKSB7XG4gICAgICAgIHRoaXMub3ZlcmxheVZpc2libGUgPSB0cnVlO1xuICAgIH1cblxuICAgIG9uT3ZlcmxheUFuaW1hdGlvblN0YXJ0KGV2ZW50OiBBbmltYXRpb25FdmVudCkge1xuICAgICAgICBzd2l0Y2ggKGV2ZW50LnRvU3RhdGUpIHtcbiAgICAgICAgICAgIGNhc2UgJ3Zpc2libGUnOlxuICAgICAgICAgICAgICAgIHRoaXMub3ZlcmxheSA9IGV2ZW50LmVsZW1lbnQ7XG4gICAgICAgICAgICAgICAgbGV0IGl0ZW1zV3JhcHBlclNlbGVjdG9yID0gdGhpcy52aXJ0dWFsU2Nyb2xsID8gJy5jZGstdmlydHVhbC1zY3JvbGwtdmlld3BvcnQnIDogJy5wLWRyb3Bkb3duLWl0ZW1zLXdyYXBwZXInO1xuICAgICAgICAgICAgICAgIHRoaXMuaXRlbXNXcmFwcGVyID0gRG9tSGFuZGxlci5maW5kU2luZ2xlKHRoaXMub3ZlcmxheSwgaXRlbXNXcmFwcGVyU2VsZWN0b3IpO1xuICAgICAgICAgICAgICAgIHRoaXMuYXBwZW5kT3ZlcmxheSgpO1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLmF1dG9aSW5kZXgpIHtcbiAgICAgICAgICAgICAgICAgICAgWkluZGV4VXRpbHMuc2V0KCdvdmVybGF5JywgdGhpcy5vdmVybGF5LCB0aGlzLmNvbmZpZy56SW5kZXgub3ZlcmxheSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHRoaXMuYWxpZ25PdmVybGF5KCk7XG4gICAgICAgICAgICAgICAgdGhpcy5iaW5kRG9jdW1lbnRDbGlja0xpc3RlbmVyKCk7XG4gICAgICAgICAgICAgICAgdGhpcy5iaW5kRG9jdW1lbnRSZXNpemVMaXN0ZW5lcigpO1xuICAgICAgICAgICAgICAgIHRoaXMuYmluZFNjcm9sbExpc3RlbmVyKCk7XG5cbiAgICAgICAgICAgICAgICBpZiAodGhpcy5vcHRpb25zICYmIHRoaXMub3B0aW9ucy5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKCF0aGlzLnZpcnR1YWxTY3JvbGwpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBzZWxlY3RlZExpc3RJdGVtID0gRG9tSGFuZGxlci5maW5kU2luZ2xlKHRoaXMuaXRlbXNXcmFwcGVyLCAnLnAtZHJvcGRvd24taXRlbS5wLWhpZ2hsaWdodCcpO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHNlbGVjdGVkTGlzdEl0ZW0pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBEb21IYW5kbGVyLnNjcm9sbEluVmlldyh0aGlzLml0ZW1zV3JhcHBlciwgc2VsZWN0ZWRMaXN0SXRlbSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBpZiAodGhpcy5maWx0ZXJWaWV3Q2hpbGQgJiYgdGhpcy5maWx0ZXJWaWV3Q2hpbGQubmF0aXZlRWxlbWVudCkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnByZXZlbnRNb2RlbFRvdWNoZWQgPSB0cnVlO1xuXG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLmF1dG9mb2N1c0ZpbHRlcikge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5maWx0ZXJWaWV3Q2hpbGQubmF0aXZlRWxlbWVudC5mb2N1cygpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgdGhpcy5vblNob3cuZW1pdChldmVudCk7XG4gICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgY2FzZSAndm9pZCc6XG4gICAgICAgICAgICAgICAgdGhpcy5vbk92ZXJsYXlIaWRlKCk7XG4gICAgICAgICAgICAgICAgdGhpcy5vbkhpZGUuZW1pdChldmVudCk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgIH1cblxuICAgIG9uT3ZlcmxheUFuaW1hdGlvbkVuZChldmVudDogQW5pbWF0aW9uRXZlbnQpIHtcbiAgICAgICAgc3dpdGNoIChldmVudC50b1N0YXRlKSB7XG4gICAgICAgICAgICBjYXNlICd2b2lkJzpcbiAgICAgICAgICAgICAgICBaSW5kZXhVdGlscy5jbGVhcihldmVudC5lbGVtZW50KTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgc2Nyb2xsVG9TZWxlY3RlZFZpcnR1YWxTY3JvbGxFbGVtZW50KCkge1xuICAgICAgICBpZiAoIXRoaXMudmlydHVhbEF1dG9TY3JvbGxlZCkge1xuICAgICAgICAgICAgaWYgKHRoaXMudmlld1BvcnRPZmZzZXRUb3ApIHtcbiAgICAgICAgICAgICAgICB0aGlzLnZpZXdQb3J0LnNjcm9sbFRvT2Zmc2V0KHRoaXMudmlld1BvcnRPZmZzZXRUb3ApO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAodGhpcy52aXJ0dWFsU2Nyb2xsU2VsZWN0ZWRJbmRleCA+IC0xKSB7XG4gICAgICAgICAgICAgICAgdGhpcy52aWV3UG9ydC5zY3JvbGxUb0luZGV4KHRoaXMudmlydHVhbFNjcm9sbFNlbGVjdGVkSW5kZXgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy52aXJ0dWFsQXV0b1Njcm9sbGVkID0gdHJ1ZTtcbiAgICB9XG5cbiAgICB1cGRhdGVWaXJ0dWFsU2Nyb2xsU2VsZWN0ZWRJbmRleChyZXNldE9mZnNldCkge1xuICAgICAgICBpZiAodGhpcy5zZWxlY3RlZE9wdGlvbiAmJiB0aGlzLm9wdGlvbnNUb0Rpc3BsYXkgJiYgdGhpcy5vcHRpb25zVG9EaXNwbGF5Lmxlbmd0aCkge1xuICAgICAgICAgICAgaWYgKHJlc2V0T2Zmc2V0KSB7XG4gICAgICAgICAgICAgICAgdGhpcy52aWV3UG9ydE9mZnNldFRvcCA9IDA7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHRoaXMudmlydHVhbFNjcm9sbFNlbGVjdGVkSW5kZXggPSB0aGlzLmZpbmRPcHRpb25JbmRleCh0aGlzLmdldE9wdGlvblZhbHVlKHRoaXMuc2VsZWN0ZWRPcHRpb24pLCB0aGlzLm9wdGlvbnNUb0Rpc3BsYXkpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgYXBwZW5kT3ZlcmxheSgpIHtcbiAgICAgICAgaWYgKHRoaXMuYXBwZW5kVG8pIHtcbiAgICAgICAgICAgIGlmICh0aGlzLmFwcGVuZFRvID09PSAnYm9keScpXG4gICAgICAgICAgICAgICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZCh0aGlzLm92ZXJsYXkpO1xuICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAgIERvbUhhbmRsZXIuYXBwZW5kQ2hpbGQodGhpcy5vdmVybGF5LCB0aGlzLmFwcGVuZFRvKTtcblxuICAgICAgICAgICAgaWYgKCF0aGlzLm92ZXJsYXkuc3R5bGUubWluV2lkdGgpIHtcbiAgICAgICAgICAgICAgICB0aGlzLm92ZXJsYXkuc3R5bGUubWluV2lkdGggPSBEb21IYW5kbGVyLmdldFdpZHRoKHRoaXMuY29udGFpbmVyVmlld0NoaWxkLm5hdGl2ZUVsZW1lbnQpICsgJ3B4JztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJlc3RvcmVPdmVybGF5QXBwZW5kKCkge1xuICAgICAgICBpZiAodGhpcy5vdmVybGF5ICYmIHRoaXMuYXBwZW5kVG8pIHtcbiAgICAgICAgICAgIHRoaXMuZWwubmF0aXZlRWxlbWVudC5hcHBlbmRDaGlsZCh0aGlzLm92ZXJsYXkpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgaGlkZSgpIHtcbiAgICAgICAgdGhpcy5vdmVybGF5VmlzaWJsZSA9IGZhbHNlO1xuXG4gICAgICAgIGlmICh0aGlzLmZpbHRlciAmJiB0aGlzLnJlc2V0RmlsdGVyT25IaWRlKSB7XG4gICAgICAgICAgICB0aGlzLnJlc2V0RmlsdGVyKCk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy52aXJ0dWFsU2Nyb2xsKSB7XG4gICAgICAgICAgICB0aGlzLnZpcnR1YWxBdXRvU2Nyb2xsZWQgPSBmYWxzZTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuY2QubWFya0ZvckNoZWNrKCk7XG4gICAgfVxuXG4gICAgYWxpZ25PdmVybGF5KCkge1xuICAgICAgICBpZiAodGhpcy5vdmVybGF5KSB7XG4gICAgICAgICAgICBpZiAodGhpcy5hcHBlbmRUbylcbiAgICAgICAgICAgICAgICBEb21IYW5kbGVyLmFic29sdXRlUG9zaXRpb24odGhpcy5vdmVybGF5LCB0aGlzLmNvbnRhaW5lclZpZXdDaGlsZC5uYXRpdmVFbGVtZW50KTtcbiAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgICBEb21IYW5kbGVyLnJlbGF0aXZlUG9zaXRpb24odGhpcy5vdmVybGF5LCB0aGlzLmNvbnRhaW5lclZpZXdDaGlsZC5uYXRpdmVFbGVtZW50KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIG9uSW5wdXRGb2N1cyhldmVudCkge1xuICAgICAgICB0aGlzLmZvY3VzZWQgPSB0cnVlO1xuICAgICAgICB0aGlzLm9uRm9jdXMuZW1pdChldmVudCk7XG4gICAgfVxuXG4gICAgb25JbnB1dEJsdXIoZXZlbnQpIHtcbiAgICAgICAgdGhpcy5mb2N1c2VkID0gZmFsc2U7XG4gICAgICAgIHRoaXMub25CbHVyLmVtaXQoZXZlbnQpO1xuXG4gICAgICAgIGlmICghdGhpcy5wcmV2ZW50TW9kZWxUb3VjaGVkKSB7XG4gICAgICAgICAgICB0aGlzLm9uTW9kZWxUb3VjaGVkKCk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5wcmV2ZW50TW9kZWxUb3VjaGVkID0gZmFsc2U7XG4gICAgfVxuXG4gICAgZmluZFByZXZFbmFibGVkT3B0aW9uKGluZGV4KSB7XG4gICAgICAgIGxldCBwcmV2RW5hYmxlZE9wdGlvbjtcblxuICAgICAgICBpZiAodGhpcy5vcHRpb25zVG9EaXNwbGF5ICYmIHRoaXMub3B0aW9uc1RvRGlzcGxheS5sZW5ndGgpIHtcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAoaW5kZXggLSAxKTsgMCA8PSBpOyBpLS0pIHtcbiAgICAgICAgICAgICAgICBsZXQgb3B0aW9uID0gdGhpcy5vcHRpb25zVG9EaXNwbGF5W2ldO1xuICAgICAgICAgICAgICAgIGlmIChvcHRpb24uZGlzYWJsZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBwcmV2RW5hYmxlZE9wdGlvbiA9IG9wdGlvbjtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoIXByZXZFbmFibGVkT3B0aW9uKSB7XG4gICAgICAgICAgICAgICAgZm9yIChsZXQgaSA9IHRoaXMub3B0aW9uc1RvRGlzcGxheS5sZW5ndGggLSAxOyBpID49IGluZGV4IDsgaS0tKSB7XG4gICAgICAgICAgICAgICAgICAgIGxldCBvcHRpb24gPSB0aGlzLm9wdGlvbnNUb0Rpc3BsYXlbaV07XG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLmlzT3B0aW9uRGlzYWJsZWQob3B0aW9uKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBwcmV2RW5hYmxlZE9wdGlvbiA9IG9wdGlvbjtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHByZXZFbmFibGVkT3B0aW9uO1xuICAgIH1cblxuICAgIGZpbmROZXh0RW5hYmxlZE9wdGlvbihpbmRleCkge1xuICAgICAgICBsZXQgbmV4dEVuYWJsZWRPcHRpb247XG5cbiAgICAgICAgaWYgKHRoaXMub3B0aW9uc1RvRGlzcGxheSAmJiB0aGlzLm9wdGlvbnNUb0Rpc3BsYXkubGVuZ3RoKSB7XG4gICAgICAgICAgICBmb3IgKGxldCBpID0gKGluZGV4ICsgMSk7IGkgPCB0aGlzLm9wdGlvbnNUb0Rpc3BsYXkubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICBsZXQgb3B0aW9uID0gdGhpcy5vcHRpb25zVG9EaXNwbGF5W2ldO1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLmlzT3B0aW9uRGlzYWJsZWQob3B0aW9uKSkge1xuICAgICAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIG5leHRFbmFibGVkT3B0aW9uID0gb3B0aW9uO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmICghbmV4dEVuYWJsZWRPcHRpb24pIHtcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGluZGV4OyBpKyspIHtcbiAgICAgICAgICAgICAgICAgICAgbGV0IG9wdGlvbiA9IHRoaXMub3B0aW9uc1RvRGlzcGxheVtpXTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuaXNPcHRpb25EaXNhYmxlZChvcHRpb24pKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIG5leHRFbmFibGVkT3B0aW9uID0gb3B0aW9uO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gbmV4dEVuYWJsZWRPcHRpb247XG4gICAgfVxuXG4gICAgb25LZXlkb3duKGV2ZW50OiBLZXlib2FyZEV2ZW50LCBzZWFyY2g6IGJvb2xlYW4pIHtcbiAgICAgICAgaWYgKHRoaXMucmVhZG9ubHkgfHwgIXRoaXMub3B0aW9uc1RvRGlzcGxheSB8fCB0aGlzLm9wdGlvbnNUb0Rpc3BsYXkubGVuZ3RoID09PSBudWxsKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBzd2l0Y2goZXZlbnQud2hpY2gpIHtcbiAgICAgICAgICAgIC8vZG93blxuICAgICAgICAgICAgY2FzZSA0MDpcbiAgICAgICAgICAgICAgICBpZiAoIXRoaXMub3ZlcmxheVZpc2libGUgJiYgZXZlbnQuYWx0S2V5KSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2hvdygpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuZ3JvdXApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBzZWxlY3RlZEl0ZW1JbmRleCA9IHRoaXMuc2VsZWN0ZWRPcHRpb24gPyB0aGlzLmZpbmRPcHRpb25Hcm91cEluZGV4KHRoaXMuZ2V0T3B0aW9uVmFsdWUodGhpcy5zZWxlY3RlZE9wdGlvbiksIHRoaXMub3B0aW9uc1RvRGlzcGxheSkgOiAtMTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHNlbGVjdGVkSXRlbUluZGV4ICE9PSAtMSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBuZXh0SXRlbUluZGV4ID0gc2VsZWN0ZWRJdGVtSW5kZXguaXRlbUluZGV4ICsgMTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAobmV4dEl0ZW1JbmRleCA8ICh0aGlzLmdldE9wdGlvbkdyb3VwQ2hpbGRyZW4odGhpcy5vcHRpb25zVG9EaXNwbGF5W3NlbGVjdGVkSXRlbUluZGV4Lmdyb3VwSW5kZXhdKS5sZW5ndGgpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2VsZWN0SXRlbShldmVudCwgdGhpcy5nZXRPcHRpb25Hcm91cENoaWxkcmVuKHRoaXMub3B0aW9uc1RvRGlzcGxheVtzZWxlY3RlZEl0ZW1JbmRleC5ncm91cEluZGV4XSlbbmV4dEl0ZW1JbmRleF0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNlbGVjdGVkT3B0aW9uVXBkYXRlZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKHRoaXMub3B0aW9uc1RvRGlzcGxheVtzZWxlY3RlZEl0ZW1JbmRleC5ncm91cEluZGV4ICsgMV0pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zZWxlY3RJdGVtKGV2ZW50LCB0aGlzLmdldE9wdGlvbkdyb3VwQ2hpbGRyZW4odGhpcy5vcHRpb25zVG9EaXNwbGF5W3NlbGVjdGVkSXRlbUluZGV4Lmdyb3VwSW5kZXggKyAxXSlbMF0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNlbGVjdGVkT3B0aW9uVXBkYXRlZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMub3B0aW9uc1RvRGlzcGxheSAmJiB0aGlzLm9wdGlvbnNUb0Rpc3BsYXkubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNlbGVjdEl0ZW0oZXZlbnQsIHRoaXMuZ2V0T3B0aW9uR3JvdXBDaGlsZHJlbih0aGlzLm9wdGlvbnNUb0Rpc3BsYXlbMF0pWzBdKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgc2VsZWN0ZWRJdGVtSW5kZXggPSB0aGlzLnNlbGVjdGVkT3B0aW9uID8gdGhpcy5maW5kT3B0aW9uSW5kZXgodGhpcy5nZXRPcHRpb25WYWx1ZSh0aGlzLnNlbGVjdGVkT3B0aW9uKSwgdGhpcy5vcHRpb25zVG9EaXNwbGF5KSA6IC0xO1xuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IG5leHRFbmFibGVkT3B0aW9uID0gdGhpcy5maW5kTmV4dEVuYWJsZWRPcHRpb24oc2VsZWN0ZWRJdGVtSW5kZXgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG5leHRFbmFibGVkT3B0aW9uKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zZWxlY3RJdGVtKGV2ZW50LCBuZXh0RW5hYmxlZE9wdGlvbik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zZWxlY3RlZE9wdGlvblVwZGF0ZWQgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcblxuICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgIC8vdXBcbiAgICAgICAgICAgIGNhc2UgMzg6XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuZ3JvdXApIHtcbiAgICAgICAgICAgICAgICAgICAgbGV0IHNlbGVjdGVkSXRlbUluZGV4ID0gdGhpcy5zZWxlY3RlZE9wdGlvbiA/IHRoaXMuZmluZE9wdGlvbkdyb3VwSW5kZXgodGhpcy5nZXRPcHRpb25WYWx1ZSh0aGlzLnNlbGVjdGVkT3B0aW9uKSwgdGhpcy5vcHRpb25zVG9EaXNwbGF5KSA6IC0xO1xuICAgICAgICAgICAgICAgICAgICBpZiAoc2VsZWN0ZWRJdGVtSW5kZXggIT09IC0xKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgcHJldkl0ZW1JbmRleCA9IHNlbGVjdGVkSXRlbUluZGV4Lml0ZW1JbmRleCAtIDE7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAocHJldkl0ZW1JbmRleCA+PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zZWxlY3RJdGVtKGV2ZW50LCB0aGlzLmdldE9wdGlvbkdyb3VwQ2hpbGRyZW4odGhpcy5vcHRpb25zVG9EaXNwbGF5W3NlbGVjdGVkSXRlbUluZGV4Lmdyb3VwSW5kZXhdKVtwcmV2SXRlbUluZGV4XSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zZWxlY3RlZE9wdGlvblVwZGF0ZWQgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiAocHJldkl0ZW1JbmRleCA8IDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgcHJldkdyb3VwID0gdGhpcy5vcHRpb25zVG9EaXNwbGF5W3NlbGVjdGVkSXRlbUluZGV4Lmdyb3VwSW5kZXggLSAxXTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAocHJldkdyb3VwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2VsZWN0SXRlbShldmVudCwgdGhpcy5nZXRPcHRpb25Hcm91cENoaWxkcmVuKHByZXZHcm91cClbdGhpcy5nZXRPcHRpb25Hcm91cENoaWxkcmVuKHByZXZHcm91cCkubGVuZ3RoIC0gMV0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNlbGVjdGVkT3B0aW9uVXBkYXRlZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBsZXQgc2VsZWN0ZWRJdGVtSW5kZXggPSB0aGlzLnNlbGVjdGVkT3B0aW9uID8gdGhpcy5maW5kT3B0aW9uSW5kZXgodGhpcy5nZXRPcHRpb25WYWx1ZSh0aGlzLnNlbGVjdGVkT3B0aW9uKSwgdGhpcy5vcHRpb25zVG9EaXNwbGF5KSA6IC0xO1xuICAgICAgICAgICAgICAgICAgICBsZXQgcHJldkVuYWJsZWRPcHRpb24gPSB0aGlzLmZpbmRQcmV2RW5hYmxlZE9wdGlvbihzZWxlY3RlZEl0ZW1JbmRleCk7XG4gICAgICAgICAgICAgICAgICAgIGlmIChwcmV2RW5hYmxlZE9wdGlvbikge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zZWxlY3RJdGVtKGV2ZW50LCBwcmV2RW5hYmxlZE9wdGlvbik7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNlbGVjdGVkT3B0aW9uVXBkYXRlZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgIC8vc3BhY2VcbiAgICAgICAgICAgIGNhc2UgMzI6XG4gICAgICAgICAgICBjYXNlIDMyOlxuICAgICAgICAgICAgICAgIGlmICghdGhpcy5vdmVybGF5VmlzaWJsZSl7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2hvdygpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5oaWRlKCk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICAvL2VudGVyXG4gICAgICAgICAgICBjYXNlIDEzOlxuICAgICAgICAgICAgICAgIGlmICh0aGlzLm92ZXJsYXlWaXNpYmxlICYmICghdGhpcy5maWx0ZXIgfHwgKHRoaXMub3B0aW9uc1RvRGlzcGxheSAmJiB0aGlzLm9wdGlvbnNUb0Rpc3BsYXkubGVuZ3RoID4gMCkpKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaGlkZSgpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGVsc2UgaWYgKCF0aGlzLm92ZXJsYXlWaXNpYmxlKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2hvdygpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgLy9lc2NhcGUgYW5kIHRhYlxuICAgICAgICAgICAgY2FzZSAyNzpcbiAgICAgICAgICAgIGNhc2UgOTpcbiAgICAgICAgICAgICAgICB0aGlzLmhpZGUoKTtcbiAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICAvL3NlYXJjaCBpdGVtIGJhc2VkIG9uIGtleWJvYXJkIGlucHV0XG4gICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgIGlmIChzZWFyY2ggJiYgIWV2ZW50Lm1ldGFLZXkpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zZWFyY2goZXZlbnQpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgc2VhcmNoKGV2ZW50OiBLZXlib2FyZEV2ZW50KSB7XG4gICAgICAgIGlmICh0aGlzLnNlYXJjaFRpbWVvdXQpIHtcbiAgICAgICAgICAgIGNsZWFyVGltZW91dCh0aGlzLnNlYXJjaFRpbWVvdXQpO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgY2hhciA9IGV2ZW50LmtleTtcbiAgICAgICAgdGhpcy5wcmV2aW91c1NlYXJjaENoYXIgPSB0aGlzLmN1cnJlbnRTZWFyY2hDaGFyO1xuICAgICAgICB0aGlzLmN1cnJlbnRTZWFyY2hDaGFyID0gY2hhcjtcblxuICAgICAgICBpZiAodGhpcy5wcmV2aW91c1NlYXJjaENoYXIgPT09IHRoaXMuY3VycmVudFNlYXJjaENoYXIpXG4gICAgICAgICAgICB0aGlzLnNlYXJjaFZhbHVlID0gdGhpcy5jdXJyZW50U2VhcmNoQ2hhcjtcbiAgICAgICAgZWxzZVxuICAgICAgICAgICAgdGhpcy5zZWFyY2hWYWx1ZSA9IHRoaXMuc2VhcmNoVmFsdWUgPyB0aGlzLnNlYXJjaFZhbHVlICsgY2hhciA6IGNoYXI7XG5cbiAgICAgICAgbGV0IG5ld09wdGlvbjtcbiAgICAgICAgaWYgKHRoaXMuZ3JvdXApIHtcbiAgICAgICAgICAgIGxldCBzZWFyY2hJbmRleCA9IHRoaXMuc2VsZWN0ZWRPcHRpb24gPyB0aGlzLmZpbmRPcHRpb25Hcm91cEluZGV4KHRoaXMuZ2V0T3B0aW9uVmFsdWUodGhpcy5zZWxlY3RlZE9wdGlvbiksIHRoaXMub3B0aW9uc1RvRGlzcGxheSkgOiB7Z3JvdXBJbmRleDogMCwgaXRlbUluZGV4OiAwfTtcbiAgICAgICAgICAgIG5ld09wdGlvbiA9IHRoaXMuc2VhcmNoT3B0aW9uV2l0aGluR3JvdXAoc2VhcmNoSW5kZXgpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgbGV0IHNlYXJjaEluZGV4ID0gdGhpcy5zZWxlY3RlZE9wdGlvbiA/IHRoaXMuZmluZE9wdGlvbkluZGV4KHRoaXMuZ2V0T3B0aW9uVmFsdWUodGhpcy5zZWxlY3RlZE9wdGlvbiksIHRoaXMub3B0aW9uc1RvRGlzcGxheSkgOiAtMTtcbiAgICAgICAgICAgIG5ld09wdGlvbiA9IHRoaXMuc2VhcmNoT3B0aW9uKCsrc2VhcmNoSW5kZXgpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKG5ld09wdGlvbiAmJiAhdGhpcy5pc09wdGlvbkRpc2FibGVkKG5ld09wdGlvbikpIHtcbiAgICAgICAgICAgIHRoaXMuc2VsZWN0SXRlbShldmVudCwgbmV3T3B0aW9uKTtcbiAgICAgICAgICAgIHRoaXMuc2VsZWN0ZWRPcHRpb25VcGRhdGVkID0gdHJ1ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuc2VhcmNoVGltZW91dCA9IHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5zZWFyY2hWYWx1ZSA9IG51bGw7XG4gICAgICAgIH0sIDI1MCk7XG4gICAgfVxuXG4gICAgc2VhcmNoT3B0aW9uKGluZGV4KSB7XG4gICAgICAgIGxldCBvcHRpb247XG5cbiAgICAgICAgaWYgKHRoaXMuc2VhcmNoVmFsdWUpIHtcbiAgICAgICAgICAgIG9wdGlvbiA9IHRoaXMuc2VhcmNoT3B0aW9uSW5SYW5nZShpbmRleCwgdGhpcy5vcHRpb25zVG9EaXNwbGF5Lmxlbmd0aCk7XG5cbiAgICAgICAgICAgIGlmICghb3B0aW9uKSB7XG4gICAgICAgICAgICAgICAgb3B0aW9uID0gdGhpcy5zZWFyY2hPcHRpb25JblJhbmdlKDAsIGluZGV4KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBvcHRpb247XG4gICAgfVxuXG4gICAgc2VhcmNoT3B0aW9uSW5SYW5nZShzdGFydCwgZW5kKSB7XG4gICAgICAgIGZvciAobGV0IGkgPSBzdGFydDsgaSA8IGVuZDsgaSsrKSB7XG4gICAgICAgICAgICBsZXQgb3B0ID0gdGhpcy5vcHRpb25zVG9EaXNwbGF5W2ldO1xuICAgICAgICAgICAgaWYgKHRoaXMuZ2V0T3B0aW9uTGFiZWwob3B0KS50b0xvY2FsZUxvd2VyQ2FzZSh0aGlzLmZpbHRlckxvY2FsZSkuc3RhcnRzV2l0aCgodGhpcy5zZWFyY2hWYWx1ZSBhcyBhbnkpLnRvTG9jYWxlTG93ZXJDYXNlKHRoaXMuZmlsdGVyTG9jYWxlKSkgJiYgIXRoaXMuaXNPcHRpb25EaXNhYmxlZChvcHQpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIG9wdDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBudWxsO1xuICAgIH1cblxuICAgIHNlYXJjaE9wdGlvbldpdGhpbkdyb3VwKGluZGV4KSB7XG4gICAgICAgIGxldCBvcHRpb247XG5cbiAgICAgICAgaWYgKHRoaXMuc2VhcmNoVmFsdWUpIHtcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSBpbmRleC5ncm91cEluZGV4OyBpIDwgdGhpcy5vcHRpb25zVG9EaXNwbGF5Lmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgZm9yIChsZXQgaiA9IChpbmRleC5ncm91cEluZGV4ID09PSBpKSA/IChpbmRleC5pdGVtSW5kZXggKyAxKSA6IDA7IGogPCB0aGlzLmdldE9wdGlvbkdyb3VwQ2hpbGRyZW4odGhpcy5vcHRpb25zVG9EaXNwbGF5W2ldKS5sZW5ndGg7IGorKykge1xuICAgICAgICAgICAgICAgICAgICBsZXQgb3B0ID0gdGhpcy5nZXRPcHRpb25Hcm91cENoaWxkcmVuKHRoaXMub3B0aW9uc1RvRGlzcGxheVtpXSlbal07XG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLmdldE9wdGlvbkxhYmVsKG9wdCkudG9Mb2NhbGVMb3dlckNhc2UodGhpcy5maWx0ZXJMb2NhbGUpLnN0YXJ0c1dpdGgoKHRoaXMuc2VhcmNoVmFsdWUgYXMgYW55KS50b0xvY2FsZUxvd2VyQ2FzZSh0aGlzLmZpbHRlckxvY2FsZSkpICYmICF0aGlzLmlzT3B0aW9uRGlzYWJsZWQob3B0KSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG9wdDtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKCFvcHRpb24pIHtcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8PSBpbmRleC5ncm91cEluZGV4OyBpKyspIHtcbiAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCAoKGluZGV4Lmdyb3VwSW5kZXggPT09IGkpID8gaW5kZXguaXRlbUluZGV4IDogdGhpcy5nZXRPcHRpb25Hcm91cENoaWxkcmVuKHRoaXMub3B0aW9uc1RvRGlzcGxheVtpXSkubGVuZ3RoKTsgaisrKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgb3B0ID0gdGhpcy5nZXRPcHRpb25Hcm91cENoaWxkcmVuKHRoaXMub3B0aW9uc1RvRGlzcGxheVtpXSlbal07XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5nZXRPcHRpb25MYWJlbChvcHQpLnRvTG9jYWxlTG93ZXJDYXNlKHRoaXMuZmlsdGVyTG9jYWxlKS5zdGFydHNXaXRoKCh0aGlzLnNlYXJjaFZhbHVlIGFzIGFueSkudG9Mb2NhbGVMb3dlckNhc2UodGhpcy5maWx0ZXJMb2NhbGUpKSAmJiAhdGhpcy5pc09wdGlvbkRpc2FibGVkKG9wdCkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gb3B0O1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuXG4gICAgZmluZE9wdGlvbkluZGV4KHZhbDogYW55LCBvcHRzOiBhbnlbXSk6IG51bWJlciB7XG4gICAgICAgIGxldCBpbmRleDogbnVtYmVyID0gLTE7XG4gICAgICAgIGlmIChvcHRzKSB7XG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IG9wdHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICBpZiAoKHZhbCA9PSBudWxsICYmIHRoaXMuZ2V0T3B0aW9uVmFsdWUob3B0c1tpXSkgPT0gbnVsbCkgfHzCoE9iamVjdFV0aWxzLmVxdWFscyh2YWwsIHRoaXMuZ2V0T3B0aW9uVmFsdWUob3B0c1tpXSksIHRoaXMuZGF0YUtleSkpIHtcbiAgICAgICAgICAgICAgICAgICAgaW5kZXggPSBpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gaW5kZXg7XG4gICAgfVxuXG4gICAgZmluZE9wdGlvbkdyb3VwSW5kZXgodmFsOiBhbnksIG9wdHM6IGFueVtdKTogYW55IHtcbiAgICAgICAgbGV0IGdyb3VwSW5kZXgsIGl0ZW1JbmRleDtcblxuICAgICAgICBpZiAob3B0cykge1xuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBvcHRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgZ3JvdXBJbmRleCA9IGk7XG4gICAgICAgICAgICAgICAgaXRlbUluZGV4ID0gdGhpcy5maW5kT3B0aW9uSW5kZXgodmFsLCB0aGlzLmdldE9wdGlvbkdyb3VwQ2hpbGRyZW4ob3B0c1tpXSkpO1xuXG4gICAgICAgICAgICAgICAgaWYgKGl0ZW1JbmRleCAhPT0gLTEpIHtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGl0ZW1JbmRleCAhPT0gLTEpIHtcbiAgICAgICAgICAgIHJldHVybiB7Z3JvdXBJbmRleDogZ3JvdXBJbmRleCwgaXRlbUluZGV4OiBpdGVtSW5kZXh9O1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIC0xO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZmluZE9wdGlvbih2YWw6IGFueSwgb3B0czogYW55W10sIGluR3JvdXA/OiBib29sZWFuKTogU2VsZWN0SXRlbSB7XG4gICAgICAgIGlmICh0aGlzLmdyb3VwICYmICFpbkdyb3VwKSB7XG4gICAgICAgICAgICBsZXQgb3B0OiBTZWxlY3RJdGVtO1xuICAgICAgICAgICAgaWYgKG9wdHMgJiYgb3B0cy5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBvcHRncm91cCBvZiBvcHRzKSB7XG4gICAgICAgICAgICAgICAgICAgIG9wdCA9IHRoaXMuZmluZE9wdGlvbih2YWwsIHRoaXMuZ2V0T3B0aW9uR3JvdXBDaGlsZHJlbihvcHRncm91cCksIHRydWUpO1xuICAgICAgICAgICAgICAgICAgICBpZiAob3B0KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBvcHQ7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBsZXQgaW5kZXg6IG51bWJlciA9IHRoaXMuZmluZE9wdGlvbkluZGV4KHZhbCwgb3B0cyk7XG4gICAgICAgICAgICByZXR1cm4gKGluZGV4ICE9IC0xKSA/IG9wdHNbaW5kZXhdIDogbnVsbDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIG9uRmlsdGVySW5wdXRDaGFuZ2UoZXZlbnQpOiB2b2lkIHtcbiAgICAgICAgbGV0IGlucHV0VmFsdWUgPSBldmVudC50YXJnZXQudmFsdWU7XG4gICAgICAgIGlmIChpbnB1dFZhbHVlICYmIGlucHV0VmFsdWUubGVuZ3RoKSB7XG4gICAgICAgICAgICB0aGlzLl9maWx0ZXJWYWx1ZSA9IGlucHV0VmFsdWU7XG4gICAgICAgICAgICB0aGlzLmFjdGl2YXRlRmlsdGVyKCk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0aGlzLl9maWx0ZXJWYWx1ZSA9IG51bGw7XG4gICAgICAgICAgICB0aGlzLm9wdGlvbnNUb0Rpc3BsYXkgPSB0aGlzLm9wdGlvbnM7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLm9wdGlvbnNDaGFuZ2VkID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5vbkZpbHRlci5lbWl0KHtvcmlnaW5hbEV2ZW50OiBldmVudCwgZmlsdGVyOiB0aGlzLl9maWx0ZXJWYWx1ZX0pO1xuICAgIH1cblxuICAgIGFjdGl2YXRlRmlsdGVyKCkge1xuICAgICAgICBsZXQgc2VhcmNoRmllbGRzOiBzdHJpbmdbXSA9ICh0aGlzLmZpbHRlckJ5IHx8wqB0aGlzLm9wdGlvbkxhYmVsIHx8ICdsYWJlbCcpLnNwbGl0KCcsJyk7XG5cbiAgICAgICAgaWYgKHRoaXMub3B0aW9ucyAmJiB0aGlzLm9wdGlvbnMubGVuZ3RoKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5ncm91cCkge1xuICAgICAgICAgICAgICAgIGxldCBmaWx0ZXJlZEdyb3VwcyA9IFtdO1xuICAgICAgICAgICAgICAgIGZvciAobGV0IG9wdGdyb3VwIG9mIHRoaXMub3B0aW9ucykge1xuICAgICAgICAgICAgICAgICAgICBsZXQgZmlsdGVyZWRTdWJPcHRpb25zID0gdGhpcy5maWx0ZXJTZXJ2aWNlLmZpbHRlcih0aGlzLmdldE9wdGlvbkdyb3VwQ2hpbGRyZW4ob3B0Z3JvdXApLCBzZWFyY2hGaWVsZHMsIHRoaXMuZmlsdGVyVmFsdWUsIHRoaXMuZmlsdGVyTWF0Y2hNb2RlLCB0aGlzLmZpbHRlckxvY2FsZSk7XG4gICAgICAgICAgICAgICAgICAgIGlmIChmaWx0ZXJlZFN1Yk9wdGlvbnMgJiYgZmlsdGVyZWRTdWJPcHRpb25zLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgZmlsdGVyZWRHcm91cHMucHVzaCh7Li4ub3B0Z3JvdXAsIC4uLntbdGhpcy5vcHRpb25Hcm91cENoaWxkcmVuXTogZmlsdGVyZWRTdWJPcHRpb25zfX0pO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgdGhpcy5vcHRpb25zVG9EaXNwbGF5ID0gZmlsdGVyZWRHcm91cHM7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLm9wdGlvbnNUb0Rpc3BsYXkgPSB0aGlzLmZpbHRlclNlcnZpY2UuZmlsdGVyKHRoaXMub3B0aW9ucywgc2VhcmNoRmllbGRzLCB0aGlzLmZpbHRlclZhbHVlLCB0aGlzLmZpbHRlck1hdGNoTW9kZSwgdGhpcy5maWx0ZXJMb2NhbGUpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB0aGlzLm9wdGlvbnNDaGFuZ2VkID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGFwcGx5Rm9jdXMoKTogdm9pZCB7XG4gICAgICAgIGlmICh0aGlzLmVkaXRhYmxlKVxuICAgICAgICAgICAgRG9tSGFuZGxlci5maW5kU2luZ2xlKHRoaXMuZWwubmF0aXZlRWxlbWVudCwgJy5wLWRyb3Bkb3duLWxhYmVsLnAtaW5wdXR0ZXh0JykuZm9jdXMoKTtcbiAgICAgICAgZWxzZVxuICAgICAgICAgICAgRG9tSGFuZGxlci5maW5kU2luZ2xlKHRoaXMuZWwubmF0aXZlRWxlbWVudCwgJ2lucHV0W3JlYWRvbmx5XScpLmZvY3VzKCk7XG4gICAgfVxuXG4gICAgZm9jdXMoKTogdm9pZCB7XG4gICAgICAgIHRoaXMuYXBwbHlGb2N1cygpO1xuICAgIH1cblxuICAgIGJpbmREb2N1bWVudENsaWNrTGlzdGVuZXIoKSB7XG4gICAgICAgIGlmICghdGhpcy5kb2N1bWVudENsaWNrTGlzdGVuZXIpIHtcbiAgICAgICAgICAgIGNvbnN0IGRvY3VtZW50VGFyZ2V0OiBhbnkgPSB0aGlzLmVsID8gdGhpcy5lbC5uYXRpdmVFbGVtZW50Lm93bmVyRG9jdW1lbnQgOiAnZG9jdW1lbnQnO1xuXG4gICAgICAgICAgICB0aGlzLmRvY3VtZW50Q2xpY2tMaXN0ZW5lciA9IHRoaXMucmVuZGVyZXIubGlzdGVuKGRvY3VtZW50VGFyZ2V0LCAnY2xpY2snLCAoZXZlbnQpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5pc091dHNpZGVDbGlja2VkKGV2ZW50KSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmhpZGUoKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy51bmJpbmREb2N1bWVudENsaWNrTGlzdGVuZXIoKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICB0aGlzLmNkLm1hcmtGb3JDaGVjaygpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICB1bmJpbmREb2N1bWVudENsaWNrTGlzdGVuZXIoKSB7XG4gICAgICAgIGlmICh0aGlzLmRvY3VtZW50Q2xpY2tMaXN0ZW5lcikge1xuICAgICAgICAgICAgdGhpcy5kb2N1bWVudENsaWNrTGlzdGVuZXIoKTtcbiAgICAgICAgICAgIHRoaXMuZG9jdW1lbnRDbGlja0xpc3RlbmVyID0gbnVsbDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGJpbmREb2N1bWVudFJlc2l6ZUxpc3RlbmVyKCkge1xuICAgICAgICB0aGlzLmRvY3VtZW50UmVzaXplTGlzdGVuZXIgPSB0aGlzLm9uV2luZG93UmVzaXplLmJpbmQodGhpcyk7XG4gICAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdyZXNpemUnLCB0aGlzLmRvY3VtZW50UmVzaXplTGlzdGVuZXIpO1xuICAgIH1cblxuICAgIHVuYmluZERvY3VtZW50UmVzaXplTGlzdGVuZXIoKSB7XG4gICAgICAgIGlmICh0aGlzLmRvY3VtZW50UmVzaXplTGlzdGVuZXIpIHtcbiAgICAgICAgICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKCdyZXNpemUnLCB0aGlzLmRvY3VtZW50UmVzaXplTGlzdGVuZXIpO1xuICAgICAgICAgICAgdGhpcy5kb2N1bWVudFJlc2l6ZUxpc3RlbmVyID0gbnVsbDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIG9uV2luZG93UmVzaXplKCkge1xuICAgICAgICBpZiAoIURvbUhhbmRsZXIuaXNBbmRyb2lkKCkpIHtcbiAgICAgICAgICAgIHRoaXMuaGlkZSgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgYmluZFNjcm9sbExpc3RlbmVyKCkge1xuICAgICAgICBpZiAoIXRoaXMuc2Nyb2xsSGFuZGxlcikge1xuICAgICAgICAgICAgdGhpcy5zY3JvbGxIYW5kbGVyID0gbmV3IENvbm5lY3RlZE92ZXJsYXlTY3JvbGxIYW5kbGVyKHRoaXMuY29udGFpbmVyVmlld0NoaWxkLm5hdGl2ZUVsZW1lbnQsIChldmVudDogYW55KSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMub3ZlcmxheVZpc2libGUpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5oaWRlKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLnNjcm9sbEhhbmRsZXIuYmluZFNjcm9sbExpc3RlbmVyKCk7XG4gICAgfVxuXG4gICAgdW5iaW5kU2Nyb2xsTGlzdGVuZXIoKSB7XG4gICAgICAgIGlmICh0aGlzLnNjcm9sbEhhbmRsZXIpIHtcbiAgICAgICAgICAgIHRoaXMuc2Nyb2xsSGFuZGxlci51bmJpbmRTY3JvbGxMaXN0ZW5lcigpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgY2xlYXIoZXZlbnQ6IEV2ZW50KSB7XG4gICAgICAgIHRoaXMudmFsdWUgPSBudWxsO1xuICAgICAgICB0aGlzLm9uTW9kZWxDaGFuZ2UodGhpcy52YWx1ZSk7XG4gICAgICAgIHRoaXMub25DaGFuZ2UuZW1pdCh7XG4gICAgICAgICAgICBvcmlnaW5hbEV2ZW50OiBldmVudCxcbiAgICAgICAgICAgIHZhbHVlOiB0aGlzLnZhbHVlXG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLnVwZGF0ZVNlbGVjdGVkT3B0aW9uKHRoaXMudmFsdWUpO1xuICAgICAgICB0aGlzLnVwZGF0ZUVkaXRhYmxlTGFiZWwoKTtcbiAgICB9XG5cbiAgICBvbk92ZXJsYXlIaWRlKCkge1xuICAgICAgICB0aGlzLnVuYmluZERvY3VtZW50Q2xpY2tMaXN0ZW5lcigpO1xuICAgICAgICB0aGlzLnVuYmluZERvY3VtZW50UmVzaXplTGlzdGVuZXIoKTtcbiAgICAgICAgdGhpcy51bmJpbmRTY3JvbGxMaXN0ZW5lcigpO1xuICAgICAgICB0aGlzLm92ZXJsYXkgPSBudWxsO1xuICAgICAgICB0aGlzLml0ZW1zV3JhcHBlciA9IG51bGw7XG4gICAgICAgIHRoaXMub25Nb2RlbFRvdWNoZWQoKTtcbiAgICB9XG5cbiAgICBuZ09uRGVzdHJveSgpIHtcbiAgICAgICAgaWYgKHRoaXMuc2Nyb2xsSGFuZGxlcikge1xuICAgICAgICAgICAgdGhpcy5zY3JvbGxIYW5kbGVyLmRlc3Ryb3koKTtcbiAgICAgICAgICAgIHRoaXMuc2Nyb2xsSGFuZGxlciA9IG51bGw7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5vdmVybGF5KSB7XG4gICAgICAgICAgICBaSW5kZXhVdGlscy5jbGVhcih0aGlzLm92ZXJsYXkpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5yZXN0b3JlT3ZlcmxheUFwcGVuZCgpO1xuICAgICAgICB0aGlzLm9uT3ZlcmxheUhpZGUoKTtcbiAgICB9XG59XG5cbkBOZ01vZHVsZSh7XG4gICAgaW1wb3J0czogW0NvbW1vbk1vZHVsZSxTaGFyZWRNb2R1bGUsU2Nyb2xsaW5nTW9kdWxlLFRvb2x0aXBNb2R1bGUsUmlwcGxlTW9kdWxlXSxcbiAgICBleHBvcnRzOiBbRHJvcGRvd24sU2hhcmVkTW9kdWxlLFNjcm9sbGluZ01vZHVsZV0sXG4gICAgZGVjbGFyYXRpb25zOiBbRHJvcGRvd24sRHJvcGRvd25JdGVtXVxufSlcbmV4cG9ydCBjbGFzcyBEcm9wZG93bk1vZHVsZSB7IH1cbiJdfQ==