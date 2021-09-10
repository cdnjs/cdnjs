import * as i0 from '@angular/core';
import { forwardRef, EventEmitter, Component, ViewEncapsulation, Input, Output, ChangeDetectionStrategy, ViewChild, ContentChild, ContentChildren, NgModule } from '@angular/core';
import { trigger, transition, style, animate } from '@angular/animations';
import * as i2 from '@angular/common';
import { CommonModule } from '@angular/common';
import { DomHandler, ConnectedOverlayScrollHandler } from 'primeng/dom';
import { ObjectUtils, ZIndexUtils } from 'primeng/utils';
import * as i3 from 'primeng/api';
import { TranslationKeys, Footer, Header, PrimeTemplate, SharedModule } from 'primeng/api';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import * as i4 from '@angular/cdk/scrolling';
import { ScrollingModule } from '@angular/cdk/scrolling';
import * as i5 from 'primeng/tooltip';
import { TooltipModule } from 'primeng/tooltip';
import * as i1 from 'primeng/ripple';
import { RippleModule } from 'primeng/ripple';

const MULTISELECT_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => MultiSelect),
    multi: true
};
class MultiSelectItem {
    constructor() {
        this.onClick = new EventEmitter();
        this.onKeydown = new EventEmitter();
    }
    onOptionClick(event) {
        this.onClick.emit({
            originalEvent: event,
            option: this.option
        });
    }
    onOptionKeydown(event) {
        this.onKeydown.emit({
            originalEvent: event,
            option: this.option
        });
    }
}
MultiSelectItem.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0, type: MultiSelectItem, deps: [], target: i0.ɵɵFactoryTarget.Component });
MultiSelectItem.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.0.5", type: MultiSelectItem, selector: "p-multiSelectItem", inputs: { option: "option", selected: "selected", label: "label", disabled: "disabled", itemSize: "itemSize", template: "template" }, outputs: { onClick: "onClick", onKeydown: "onKeydown" }, host: { classAttribute: "p-element" }, ngImport: i0, template: `
        <li class="p-multiselect-item" (click)="onOptionClick($event)" (keydown)="onOptionKeydown($event)" [attr.aria-label]="label"
            [attr.tabindex]="disabled ? null : '0'" [ngStyle]="{'height': itemSize + 'px'}"
            [ngClass]="{'p-highlight': selected, 'p-disabled': disabled}" pRipple>
            <div class="p-checkbox p-component">
                <div class="p-checkbox-box" [ngClass]="{'p-highlight': selected}">
                    <span class="p-checkbox-icon" [ngClass]="{'pi pi-check': selected}"></span>
                </div>
            </div>
            <span *ngIf="!template">{{label}}</span>
            <ng-container *ngTemplateOutlet="template; context: {$implicit: option}"></ng-container>
        </li>
    `, isInline: true, directives: [{ type: i1.Ripple, selector: "[pRipple]" }, { type: i2.NgStyle, selector: "[ngStyle]", inputs: ["ngStyle"] }, { type: i2.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { type: i2.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i2.NgTemplateOutlet, selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet"] }], encapsulation: i0.ViewEncapsulation.None });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0, type: MultiSelectItem, decorators: [{
            type: Component,
            args: [{
                    selector: 'p-multiSelectItem',
                    template: `
        <li class="p-multiselect-item" (click)="onOptionClick($event)" (keydown)="onOptionKeydown($event)" [attr.aria-label]="label"
            [attr.tabindex]="disabled ? null : '0'" [ngStyle]="{'height': itemSize + 'px'}"
            [ngClass]="{'p-highlight': selected, 'p-disabled': disabled}" pRipple>
            <div class="p-checkbox p-component">
                <div class="p-checkbox-box" [ngClass]="{'p-highlight': selected}">
                    <span class="p-checkbox-icon" [ngClass]="{'pi pi-check': selected}"></span>
                </div>
            </div>
            <span *ngIf="!template">{{label}}</span>
            <ng-container *ngTemplateOutlet="template; context: {$implicit: option}"></ng-container>
        </li>
    `,
                    encapsulation: ViewEncapsulation.None,
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
            }], itemSize: [{
                type: Input
            }], template: [{
                type: Input
            }], onClick: [{
                type: Output
            }], onKeydown: [{
                type: Output
            }] } });
class MultiSelect {
    constructor(el, renderer, cd, filterService, config, overlayService) {
        this.el = el;
        this.renderer = renderer;
        this.cd = cd;
        this.filterService = filterService;
        this.config = config;
        this.overlayService = overlayService;
        this.filter = true;
        this.displaySelectedLabel = true;
        this.maxSelectedLabels = 3;
        this.selectedItemsLabel = 'ellipsis';
        this.showToggleAll = true;
        this.emptyFilterMessage = '';
        this.emptyMessage = '';
        this.resetFilterOnHide = false;
        this.dropdownIcon = 'pi pi-chevron-down';
        this.optionGroupChildren = "items";
        this.showHeader = true;
        this.autoZIndex = true;
        this.baseZIndex = 0;
        this.showTransitionOptions = '.12s cubic-bezier(0, 0, 0.2, 1)';
        this.hideTransitionOptions = '.1s linear';
        this.filterMatchMode = "contains";
        this.tooltip = '';
        this.tooltipPosition = 'right';
        this.tooltipPositionStyle = 'absolute';
        this.autofocusFilter = true;
        this.display = 'comma';
        this.onChange = new EventEmitter();
        this.onFilter = new EventEmitter();
        this.onFocus = new EventEmitter();
        this.onBlur = new EventEmitter();
        this.onClick = new EventEmitter();
        this.onPanelShow = new EventEmitter();
        this.onPanelHide = new EventEmitter();
        this.scrollHeight = '200px';
        this.onModelChange = () => { };
        this.onModelTouched = () => { };
    }
    set defaultLabel(val) {
        this._defaultLabel = val;
        this.updateLabel();
    }
    get defaultLabel() {
        return this._defaultLabel;
    }
    set placeholder(val) {
        this._placeholder = val;
        this.updateLabel();
    }
    get placeholder() {
        return this._placeholder;
    }
    get options() {
        return this._options;
    }
    set options(val) {
        this._options = val;
        this.updateLabel();
    }
    get filterValue() {
        return this._filterValue;
    }
    set filterValue(val) {
        this._filterValue = val;
        this.activateFilter();
    }
    ngOnInit() {
        this.updateLabel();
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
                case 'selectedItems':
                    this.selectedItemsTemplate = item.template;
                    break;
                case 'header':
                    this.headerTemplate = item.template;
                    break;
                case 'emptyfilter':
                    this.emptyFilterTemplate = item.template;
                    break;
                case 'empty':
                    this.emptyTemplate = item.template;
                    break;
                case 'footer':
                    this.footerTemplate = item.template;
                    break;
                default:
                    this.itemTemplate = item.template;
                    break;
            }
        });
    }
    ngAfterViewInit() {
        if (this.overlayVisible) {
            this.show();
        }
    }
    ngAfterViewChecked() {
        if (this.filtered) {
            this.alignOverlay();
            this.filtered = false;
        }
    }
    getOptionLabel(option) {
        return this.optionLabel ? ObjectUtils.resolveFieldData(option, this.optionLabel) : (option.label != undefined ? option.label : option);
    }
    getOptionValue(option) {
        return this.optionValue ? ObjectUtils.resolveFieldData(option, this.optionValue) : (this.optionLabel || option.value === undefined ? option : option.value);
    }
    getOptionGroupLabel(optionGroup) {
        return this.optionGroupLabel ? ObjectUtils.resolveFieldData(optionGroup, this.optionGroupLabel) : (optionGroup.label != undefined ? optionGroup.label : optionGroup);
    }
    getOptionGroupChildren(optionGroup) {
        return this.optionGroupChildren ? ObjectUtils.resolveFieldData(optionGroup, this.optionGroupChildren) : optionGroup.items;
    }
    isOptionDisabled(option) {
        let disabled = this.optionDisabled ? ObjectUtils.resolveFieldData(option, this.optionDisabled) : (option.disabled !== undefined ? option.disabled : false);
        return (disabled || (this.maxSelectionLimitReached && !this.isSelected(option)));
    }
    writeValue(value) {
        this.value = value;
        this.updateLabel();
        this.updateFilledState();
        this.checkSelectionLimit();
        this.cd.markForCheck();
    }
    checkSelectionLimit() {
        if (this.selectionLimit && (this.value && this.value.length === this.selectionLimit)) {
            this.maxSelectionLimitReached = true;
        }
        else {
            this.maxSelectionLimitReached = false;
        }
    }
    updateFilledState() {
        this.filled = (this.value && this.value.length > 0);
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
    onOptionClick(event) {
        let option = event.option;
        if (this.isOptionDisabled(option)) {
            return;
        }
        let optionValue = this.getOptionValue(option);
        let selectionIndex = this.findSelectionIndex(optionValue);
        if (selectionIndex != -1) {
            this.value = this.value.filter((val, i) => i != selectionIndex);
            if (this.selectionLimit) {
                this.maxSelectionLimitReached = false;
            }
        }
        else {
            if (!this.selectionLimit || (!this.value || this.value.length < this.selectionLimit)) {
                this.value = [...this.value || [], optionValue];
            }
            this.checkSelectionLimit();
        }
        this.onModelChange(this.value);
        this.onChange.emit({ originalEvent: event.originalEvent, value: this.value, itemValue: optionValue });
        this.updateLabel();
        this.updateFilledState();
    }
    isSelected(option) {
        return this.findSelectionIndex(this.getOptionValue(option)) != -1;
    }
    findSelectionIndex(val) {
        let index = -1;
        if (this.value) {
            for (let i = 0; i < this.value.length; i++) {
                if (ObjectUtils.equals(this.value[i], val, this.dataKey)) {
                    index = i;
                    break;
                }
            }
        }
        return index;
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
        this.updateFilledState();
        this.updateLabel();
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
    show() {
        if (!this.overlayVisible) {
            this.overlayVisible = true;
        }
    }
    onOverlayClick(event) {
        this.overlayService.add({
            originalEvent: event,
            target: this.el.nativeElement
        });
    }
    onOverlayAnimationStart(event) {
        switch (event.toState) {
            case 'visible':
                this.overlay = event.element;
                this.appendOverlay();
                if (this.autoZIndex) {
                    ZIndexUtils.set('overlay', this.overlay, this.config.zIndex.overlay);
                }
                this.alignOverlay();
                this.bindDocumentClickListener();
                this.bindDocumentResizeListener();
                this.bindScrollListener();
                if (this.filterInputChild && this.filterInputChild.nativeElement) {
                    this.preventModelTouched = true;
                    if (this.autofocusFilter) {
                        this.filterInputChild.nativeElement.focus();
                    }
                }
                this.onPanelShow.emit();
                break;
            case 'void':
                this.onOverlayHide();
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
    alignOverlay() {
        if (this.overlay) {
            if (this.appendTo)
                DomHandler.absolutePosition(this.overlay, this.containerViewChild.nativeElement);
            else
                DomHandler.relativePosition(this.overlay, this.containerViewChild.nativeElement);
        }
    }
    hide() {
        this.overlayVisible = false;
        this.unbindDocumentClickListener();
        if (this.resetFilterOnHide) {
            this.filterInputChild.nativeElement.value = '';
            this._filterValue = null;
            this._filteredOptions = null;
        }
        this.onPanelHide.emit();
        this.cd.markForCheck();
    }
    close(event) {
        this.hide();
        event.preventDefault();
        event.stopPropagation();
    }
    onMouseclick(event, input) {
        if (this.disabled || this.readonly || event.target.isSameNode(this.accessibleViewChild.nativeElement)) {
            return;
        }
        this.onClick.emit(event);
        if (!this.isOverlayClick(event) && !DomHandler.hasClass(event.target, 'p-multiselect-token-icon')) {
            if (this.overlayVisible) {
                this.hide();
            }
            else {
                input.focus();
                this.show();
            }
        }
    }
    removeChip(chip, event) {
        this.value = this.value.filter(val => !ObjectUtils.equals(val, chip, this.dataKey));
        this.onModelChange(this.value);
        this.onChange.emit({ originalEvent: event, value: this.value });
        this.updateLabel();
        this.updateFilledState();
    }
    isOverlayClick(event) {
        let targetNode = event.target;
        return this.overlay ? (this.overlay.isSameNode(targetNode) || this.overlay.contains(targetNode)) : false;
    }
    isOutsideClicked(event) {
        return !(this.el.nativeElement.isSameNode(event.target) || this.el.nativeElement.contains(event.target) || this.isOverlayClick(event));
    }
    onInputFocus(event) {
        this.focus = true;
        this.onFocus.emit({ originalEvent: event });
    }
    onInputBlur(event) {
        this.focus = false;
        this.onBlur.emit({ originalEvent: event });
        if (!this.preventModelTouched) {
            this.onModelTouched();
        }
        this.preventModelTouched = false;
    }
    onOptionKeydown(event) {
        if (this.readonly) {
            return;
        }
        switch (event.originalEvent.which) {
            //down
            case 40:
                var nextItem = this.findNextItem(event.originalEvent.target.parentElement);
                if (nextItem) {
                    nextItem.focus();
                }
                event.originalEvent.preventDefault();
                break;
            //up
            case 38:
                var prevItem = this.findPrevItem(event.originalEvent.target.parentElement);
                if (prevItem) {
                    prevItem.focus();
                }
                event.originalEvent.preventDefault();
                break;
            //enter
            case 13:
                this.onOptionClick(event);
                event.originalEvent.preventDefault();
                break;
        }
    }
    findNextItem(item) {
        let nextItem = item.nextElementSibling;
        if (nextItem)
            return DomHandler.hasClass(nextItem.children[0], 'p-disabled') || DomHandler.isHidden(nextItem.children[0]) || DomHandler.hasClass(nextItem, 'p-multiselect-item-group') ? this.findNextItem(nextItem) : nextItem.children[0];
        else
            return null;
    }
    findPrevItem(item) {
        let prevItem = item.previousElementSibling;
        if (prevItem)
            return DomHandler.hasClass(prevItem.children[0], 'p-disabled') || DomHandler.isHidden(prevItem.children[0]) || DomHandler.hasClass(prevItem, 'p-multiselect-item-group') ? this.findPrevItem(prevItem) : prevItem.children[0];
        else
            return null;
    }
    onKeydown(event) {
        switch (event.which) {
            //down
            case 40:
                if (!this.overlayVisible && event.altKey) {
                    this.show();
                    event.preventDefault();
                }
                break;
            //space
            case 32:
                if (!this.overlayVisible) {
                    this.show();
                    event.preventDefault();
                }
                break;
            //escape
            case 27:
                this.hide();
                break;
        }
    }
    updateLabel() {
        if (this.value && this.options && this.value.length && this.displaySelectedLabel) {
            let label = '';
            for (let i = 0; i < this.value.length; i++) {
                let itemLabel = this.findLabelByValue(this.value[i]);
                if (itemLabel) {
                    if (label.length > 0) {
                        label = label + ', ';
                    }
                    label = label + itemLabel;
                }
            }
            if (this.value.length <= this.maxSelectedLabels || this.selectedItemsLabel === 'ellipsis') {
                this.valuesAsString = label;
            }
            else {
                let pattern = /{(.*?)}/;
                if (pattern.test(this.selectedItemsLabel)) {
                    this.valuesAsString = this.selectedItemsLabel.replace(this.selectedItemsLabel.match(pattern)[0], this.value.length + '');
                }
                else {
                    this.valuesAsString = this.selectedItemsLabel;
                }
            }
        }
        else {
            this.valuesAsString = this.placeholder || this.defaultLabel;
        }
    }
    findLabelByValue(val) {
        if (this.group) {
            let label = null;
            for (let i = 0; i < this.options.length; i++) {
                let subOptions = this.getOptionGroupChildren(this.options[i]);
                if (subOptions) {
                    label = this.searchLabelByValue(val, subOptions);
                    if (label) {
                        break;
                    }
                }
            }
            return label;
        }
        else {
            return this.searchLabelByValue(val, this.options);
        }
    }
    searchLabelByValue(val, options) {
        let label = null;
        for (let i = 0; i < options.length; i++) {
            let option = options[i];
            let optionValue = this.getOptionValue(option);
            if (val == null && optionValue == null || ObjectUtils.equals(val, optionValue, this.dataKey)) {
                label = this.getOptionLabel(option);
                break;
            }
        }
        return label;
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
    get emptyOptions() {
        let optionsToRender = this.optionsToRender;
        return !optionsToRender || optionsToRender.length === 0;
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
    onFilterInputChange(event) {
        this._filterValue = event.target.value;
        this.activateFilter();
        this.onFilter.emit({ originalEvent: event, filter: this._filterValue });
    }
    activateFilter() {
        if (this.hasFilter() && this._options) {
            let searchFields = (this.filterBy || this.optionLabel || 'label').split(',');
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
                this._filteredOptions = this.filterService.filter(this.options, searchFields, this._filterValue, this.filterMatchMode, this.filterLocale);
            }
        }
        else {
            this._filteredOptions = null;
        }
    }
    onHeaderCheckboxFocus() {
        this.headerCheckboxFocus = true;
    }
    onHeaderCheckboxBlur() {
        this.headerCheckboxFocus = false;
    }
    bindDocumentClickListener() {
        if (!this.documentClickListener) {
            const documentTarget = this.el ? this.el.nativeElement.ownerDocument : 'document';
            this.documentClickListener = this.renderer.listen(documentTarget, 'click', (event) => {
                if (this.isOutsideClicked(event)) {
                    this.hide();
                }
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
            this.scrollHandler = new ConnectedOverlayScrollHandler(this.containerViewChild.nativeElement, () => {
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
    onOverlayHide() {
        this.unbindDocumentClickListener();
        this.unbindDocumentResizeListener();
        this.unbindScrollListener();
        this.overlay = null;
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
MultiSelect.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0, type: MultiSelect, deps: [{ token: i0.ElementRef }, { token: i0.Renderer2 }, { token: i0.ChangeDetectorRef }, { token: i3.FilterService }, { token: i3.PrimeNGConfig }, { token: i3.OverlayService }], target: i0.ɵɵFactoryTarget.Component });
MultiSelect.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.0.5", type: MultiSelect, selector: "p-multiSelect", inputs: { style: "style", styleClass: "styleClass", panelStyle: "panelStyle", panelStyleClass: "panelStyleClass", inputId: "inputId", disabled: "disabled", readonly: "readonly", group: "group", filter: "filter", filterPlaceHolder: "filterPlaceHolder", filterLocale: "filterLocale", overlayVisible: "overlayVisible", tabindex: "tabindex", appendTo: "appendTo", dataKey: "dataKey", name: "name", ariaLabelledBy: "ariaLabelledBy", displaySelectedLabel: "displaySelectedLabel", maxSelectedLabels: "maxSelectedLabels", selectionLimit: "selectionLimit", selectedItemsLabel: "selectedItemsLabel", showToggleAll: "showToggleAll", emptyFilterMessage: "emptyFilterMessage", emptyMessage: "emptyMessage", resetFilterOnHide: "resetFilterOnHide", dropdownIcon: "dropdownIcon", optionLabel: "optionLabel", optionValue: "optionValue", optionDisabled: "optionDisabled", optionGroupLabel: "optionGroupLabel", optionGroupChildren: "optionGroupChildren", showHeader: "showHeader", autoZIndex: "autoZIndex", baseZIndex: "baseZIndex", filterBy: "filterBy", virtualScroll: "virtualScroll", itemSize: "itemSize", showTransitionOptions: "showTransitionOptions", hideTransitionOptions: "hideTransitionOptions", ariaFilterLabel: "ariaFilterLabel", filterMatchMode: "filterMatchMode", tooltip: "tooltip", tooltipPosition: "tooltipPosition", tooltipPositionStyle: "tooltipPositionStyle", tooltipStyleClass: "tooltipStyleClass", autofocusFilter: "autofocusFilter", display: "display", scrollHeight: "scrollHeight", defaultLabel: "defaultLabel", placeholder: "placeholder", options: "options", filterValue: "filterValue" }, outputs: { onChange: "onChange", onFilter: "onFilter", onFocus: "onFocus", onBlur: "onBlur", onClick: "onClick", onPanelShow: "onPanelShow", onPanelHide: "onPanelHide" }, host: { properties: { "class.p-inputwrapper-filled": "filled", "class.p-inputwrapper-focus": "focus || overlayVisible" }, classAttribute: "p-element p-inputwrapper" }, providers: [MULTISELECT_VALUE_ACCESSOR], queries: [{ propertyName: "footerFacet", first: true, predicate: Footer, descendants: true }, { propertyName: "headerFacet", first: true, predicate: Header, descendants: true }, { propertyName: "templates", predicate: PrimeTemplate }], viewQueries: [{ propertyName: "containerViewChild", first: true, predicate: ["container"], descendants: true }, { propertyName: "filterInputChild", first: true, predicate: ["filterInput"], descendants: true }, { propertyName: "accessibleViewChild", first: true, predicate: ["in"], descendants: true }], ngImport: i0, template: `
        <div #container [ngClass]="{'p-multiselect p-component':true,
            'p-multiselect-open':overlayVisible,
            'p-multiselect-chip': display === 'chip',
            'p-focus':focus,
            'p-disabled': disabled}" [ngStyle]="style" [class]="styleClass"
            (click)="onMouseclick($event,in)">
            <div class="p-hidden-accessible">
                <input #in type="text" readonly="readonly" [attr.id]="inputId" [attr.name]="name" (focus)="onInputFocus($event)" (blur)="onInputBlur($event)"
                       [disabled]="disabled" [attr.tabindex]="tabindex" (keydown)="onKeydown($event)" aria-haspopup="listbox" [attr.aria-expanded]="overlayVisible"
                       [attr.aria-labelledby]="ariaLabelledBy" role="listbox">
            </div>
            <div class="p-multiselect-label-container" [pTooltip]="tooltip" [tooltipPosition]="tooltipPosition" [positionStyle]="tooltipPositionStyle" [tooltipStyleClass]="tooltipStyleClass">
                <div class="p-multiselect-label" [ngClass]="{'p-placeholder': valuesAsString === (defaultLabel || placeholder), 'p-multiselect-label-empty': ((valuesAsString == null || valuesAsString.length === 0) && (placeholder == null || placeholder.length === 0))}">
                    <ng-container *ngIf="!selectedItemsTemplate">
                        <ng-container *ngIf="display === 'comma'">{{valuesAsString || 'empty'}}</ng-container>
                        <ng-container *ngIf="display === 'chip'">
                            <div #token *ngFor="let item of value; let i = index;" class="p-multiselect-token">
                                <span class="p-multiselect-token-label">{{findLabelByValue(item)}}</span>
                                <span *ngIf="!disabled" class="p-multiselect-token-icon pi pi-times-circle" (click)="removeChip(item, $event)"></span>
                            </div>
                            <ng-container *ngIf="!value || value.length === 0">{{placeholder || defaultLabel || 'empty'}}</ng-container>
                        </ng-container>
                    </ng-container>
                    <ng-container *ngTemplateOutlet="selectedItemsTemplate; context: {$implicit: value}"></ng-container>
                </div>
            </div>
            <div [ngClass]="{'p-multiselect-trigger':true}">
                <span class="p-multiselect-trigger-icon" [ngClass]="dropdownIcon"></span>
            </div>
            <div *ngIf="overlayVisible" [ngClass]="['p-multiselect-panel p-component']" [@overlayAnimation]="{value: 'visible', params: {showTransitionParams: showTransitionOptions, hideTransitionParams: hideTransitionOptions}}" (@overlayAnimation.start)="onOverlayAnimationStart($event)"onOverlayAnimationEnd
                (@overlayAnimation.done)="onOverlayAnimationEnd($event)" [ngStyle]="panelStyle" [class]="panelStyleClass" (keydown)="onKeydown($event)" (click)="onOverlayClick($event)" >
                <div class="p-multiselect-header" *ngIf="showHeader">
                    <ng-content select="p-header"></ng-content>
                    <ng-container *ngTemplateOutlet="headerTemplate"></ng-container>
                    <div class="p-checkbox p-component" *ngIf="showToggleAll && !selectionLimit" [ngClass]="{'p-checkbox-disabled': disabled || toggleAllDisabled}">
                        <div class="p-hidden-accessible">
                            <input type="checkbox" readonly="readonly" [checked]="allChecked" (focus)="onHeaderCheckboxFocus()" (blur)="onHeaderCheckboxBlur()" (keydown.space)="toggleAll($event)" [attr.disabled]="disabled || toggleAllDisabled">
                        </div>
                        <div class="p-checkbox-box" role="checkbox" [attr.aria-checked]="allChecked" [ngClass]="{'p-highlight':allChecked, 'p-focus': headerCheckboxFocus, 'p-disabled': disabled || toggleAllDisabled}" (click)="toggleAll($event)">
                            <span class="p-checkbox-icon" [ngClass]="{'pi pi-check':allChecked}"></span>
                        </div>
                    </div>
                    <div class="p-multiselect-filter-container" *ngIf="filter">
                        <input #filterInput type="text" role="textbox" [value]="filterValue||''" (input)="onFilterInputChange($event)" class="p-multiselect-filter p-inputtext p-component" [disabled]="disabled" [attr.placeholder]="filterPlaceHolder" [attr.aria-label]="ariaFilterLabel">
                        <span class="p-multiselect-filter-icon pi pi-search"></span>
                    </div>
                    <button class="p-multiselect-close p-link" type="button" (click)="close($event)" pRipple>
                        <span class="p-multiselect-close-icon pi pi-times"></span>
                    </button>
                </div>
                <div class="p-multiselect-items-wrapper" [style.max-height]="virtualScroll ? 'auto' : (scrollHeight||'auto')">
                    <ul class="p-multiselect-items p-component" [ngClass]="{'p-multiselect-virtualscroll': virtualScroll}" role="listbox" aria-multiselectable="true">
                        <ng-container *ngIf="group">
                            <ng-template ngFor let-optgroup [ngForOf]="optionsToRender">
                                <li class="p-multiselect-item-group">
                                    <span *ngIf="!groupTemplate">{{getOptionGroupLabel(optgroup)||'empty'}}</span>
                                    <ng-container *ngTemplateOutlet="groupTemplate; context: {$implicit: optgroup}"></ng-container>
                                </li>
                                <ng-container *ngTemplateOutlet="itemslist; context: {$implicit: getOptionGroupChildren(optgroup)}"></ng-container>
                            </ng-template>
                        </ng-container>
                        <ng-container *ngIf="!group">
                            <ng-container *ngTemplateOutlet="itemslist; context: {$implicit: optionsToRender}"></ng-container>
                        </ng-container>
                        <ng-template #itemslist let-optionsToDisplay let-selectedOption="selectedOption">
                            <ng-container *ngIf="!virtualScroll; else virtualScrollList">
                                <ng-template ngFor let-option let-i="index" [ngForOf]="optionsToDisplay">
                                    <p-multiSelectItem [option]="option" [selected]="isSelected(option)" [label]="getOptionLabel(option)" [disabled]="isOptionDisabled(option)" (onClick)="onOptionClick($event)" (onKeydown)="onOptionKeydown($event)"
                                            [template]="itemTemplate"></p-multiSelectItem>
                                </ng-template>
                            </ng-container>
                            <ng-template #virtualScrollList>
                                <cdk-virtual-scroll-viewport #viewport [ngStyle]="{'height': scrollHeight}" [itemSize]="itemSize" *ngIf="virtualScroll && !emptyOptions">
                                    <ng-container *cdkVirtualFor="let option of optionsToDisplay; let i = index; let c = count; let f = first; let l = last; let e = even; let o = odd">
                                        <p-multiSelectItem [option]="option" [selected]="isSelected(option)" [label]="getOptionLabel(option)" [disabled]="isOptionDisabled(option)" (onClick)="onOptionClick($event)" (onKeydown)="onOptionKeydown($event)"
                                            [template]="itemTemplate" [itemSize]="itemSize"></p-multiSelectItem>
                                    </ng-container>
                                </cdk-virtual-scroll-viewport>
                            </ng-template>
                            <li *ngIf="hasFilter() && emptyOptions" class="p-multiselect-empty-message">
                                <ng-container *ngIf="!emptyFilterTemplate && !emptyTemplate; else emptyFilter">
                                    {{emptyFilterMessageLabel}}
                                </ng-container>
                                <ng-container #emptyFilter *ngTemplateOutlet="emptyFilterTemplate || emptyTemplate"></ng-container>
                            </li>
                            <li *ngIf="!hasFilter() && emptyOptions" class="p-multiselect-empty-message">
                                <ng-container *ngIf="!emptyTemplate; else empty">
                                    {{emptyMessageLabel}}
                                </ng-container>
                                <ng-container #empty *ngTemplateOutlet="emptyTemplate"></ng-container>
                            </li>
                        </ng-template>
                    </ul>
                </div>
                <div class="p-multiselect-footer" *ngIf="footerFacet || footerTemplate">
                    <ng-content select="p-footer"></ng-content>
                    <ng-container *ngTemplateOutlet="footerTemplate"></ng-container>
                </div>
            </div>
        </div>
    `, isInline: true, styles: [".p-multiselect{display:inline-flex;cursor:pointer;position:relative;-webkit-user-select:none;-ms-user-select:none;user-select:none}.p-multiselect-trigger{display:flex;align-items:center;justify-content:center;flex-shrink:0}.p-multiselect-label-container{overflow:hidden;flex:1 1 auto;cursor:pointer}.p-multiselect-label{display:block;white-space:nowrap;cursor:pointer;overflow:hidden;text-overflow:ellipsis}.p-multiselect-label-empty{overflow:hidden;visibility:hidden}.p-multiselect-token{cursor:default;display:inline-flex;align-items:center;flex:0 0 auto}.p-multiselect-token-icon{cursor:pointer}.p-multiselect .p-multiselect-panel{min-width:100%}.p-multiselect-panel{position:absolute;top:0;left:0}.p-multiselect-items-wrapper{overflow:auto}.p-multiselect-items{margin:0;padding:0;list-style-type:none}.p-multiselect-item{cursor:pointer;display:flex;align-items:center;font-weight:400;white-space:nowrap;position:relative;overflow:hidden}.p-multiselect-header{display:flex;align-items:center;justify-content:space-between}.p-multiselect-filter-container{position:relative;flex:1 1 auto}.p-multiselect-filter-icon{position:absolute;top:50%;margin-top:-.5rem}.p-multiselect-filter-container .p-inputtext{width:100%}.p-multiselect-close{display:flex;align-items:center;justify-content:center;flex-shrink:0;overflow:hidden;position:relative}.p-fluid .p-multiselect{display:flex}"], components: [{ type: MultiSelectItem, selector: "p-multiSelectItem", inputs: ["option", "selected", "label", "disabled", "itemSize", "template"], outputs: ["onClick", "onKeydown"] }, { type: i4.CdkVirtualScrollViewport, selector: "cdk-virtual-scroll-viewport", inputs: ["orientation"], outputs: ["scrolledIndexChange"] }], directives: [{ type: i2.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { type: i2.NgStyle, selector: "[ngStyle]", inputs: ["ngStyle"] }, { type: i5.Tooltip, selector: "[pTooltip]", inputs: ["tooltipPosition", "tooltipEvent", "appendTo", "positionStyle", "tooltipStyleClass", "tooltipZIndex", "escape", "showDelay", "hideDelay", "life", "positionTop", "positionLeft", "pTooltip", "tooltipDisabled", "tooltipOptions"] }, { type: i2.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i2.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { type: i2.NgTemplateOutlet, selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet"] }, { type: i1.Ripple, selector: "[pRipple]" }, { type: i4.CdkFixedSizeVirtualScroll, selector: "cdk-virtual-scroll-viewport[itemSize]", inputs: ["itemSize", "minBufferPx", "maxBufferPx"] }, { type: i4.CdkVirtualForOf, selector: "[cdkVirtualFor][cdkVirtualForOf]", inputs: ["cdkVirtualForOf", "cdkVirtualForTrackBy", "cdkVirtualForTemplate", "cdkVirtualForTemplateCacheSize"] }], animations: [
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
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0, type: MultiSelect, decorators: [{
            type: Component,
            args: [{
                    selector: 'p-multiSelect',
                    template: `
        <div #container [ngClass]="{'p-multiselect p-component':true,
            'p-multiselect-open':overlayVisible,
            'p-multiselect-chip': display === 'chip',
            'p-focus':focus,
            'p-disabled': disabled}" [ngStyle]="style" [class]="styleClass"
            (click)="onMouseclick($event,in)">
            <div class="p-hidden-accessible">
                <input #in type="text" readonly="readonly" [attr.id]="inputId" [attr.name]="name" (focus)="onInputFocus($event)" (blur)="onInputBlur($event)"
                       [disabled]="disabled" [attr.tabindex]="tabindex" (keydown)="onKeydown($event)" aria-haspopup="listbox" [attr.aria-expanded]="overlayVisible"
                       [attr.aria-labelledby]="ariaLabelledBy" role="listbox">
            </div>
            <div class="p-multiselect-label-container" [pTooltip]="tooltip" [tooltipPosition]="tooltipPosition" [positionStyle]="tooltipPositionStyle" [tooltipStyleClass]="tooltipStyleClass">
                <div class="p-multiselect-label" [ngClass]="{'p-placeholder': valuesAsString === (defaultLabel || placeholder), 'p-multiselect-label-empty': ((valuesAsString == null || valuesAsString.length === 0) && (placeholder == null || placeholder.length === 0))}">
                    <ng-container *ngIf="!selectedItemsTemplate">
                        <ng-container *ngIf="display === 'comma'">{{valuesAsString || 'empty'}}</ng-container>
                        <ng-container *ngIf="display === 'chip'">
                            <div #token *ngFor="let item of value; let i = index;" class="p-multiselect-token">
                                <span class="p-multiselect-token-label">{{findLabelByValue(item)}}</span>
                                <span *ngIf="!disabled" class="p-multiselect-token-icon pi pi-times-circle" (click)="removeChip(item, $event)"></span>
                            </div>
                            <ng-container *ngIf="!value || value.length === 0">{{placeholder || defaultLabel || 'empty'}}</ng-container>
                        </ng-container>
                    </ng-container>
                    <ng-container *ngTemplateOutlet="selectedItemsTemplate; context: {$implicit: value}"></ng-container>
                </div>
            </div>
            <div [ngClass]="{'p-multiselect-trigger':true}">
                <span class="p-multiselect-trigger-icon" [ngClass]="dropdownIcon"></span>
            </div>
            <div *ngIf="overlayVisible" [ngClass]="['p-multiselect-panel p-component']" [@overlayAnimation]="{value: 'visible', params: {showTransitionParams: showTransitionOptions, hideTransitionParams: hideTransitionOptions}}" (@overlayAnimation.start)="onOverlayAnimationStart($event)"onOverlayAnimationEnd
                (@overlayAnimation.done)="onOverlayAnimationEnd($event)" [ngStyle]="panelStyle" [class]="panelStyleClass" (keydown)="onKeydown($event)" (click)="onOverlayClick($event)" >
                <div class="p-multiselect-header" *ngIf="showHeader">
                    <ng-content select="p-header"></ng-content>
                    <ng-container *ngTemplateOutlet="headerTemplate"></ng-container>
                    <div class="p-checkbox p-component" *ngIf="showToggleAll && !selectionLimit" [ngClass]="{'p-checkbox-disabled': disabled || toggleAllDisabled}">
                        <div class="p-hidden-accessible">
                            <input type="checkbox" readonly="readonly" [checked]="allChecked" (focus)="onHeaderCheckboxFocus()" (blur)="onHeaderCheckboxBlur()" (keydown.space)="toggleAll($event)" [attr.disabled]="disabled || toggleAllDisabled">
                        </div>
                        <div class="p-checkbox-box" role="checkbox" [attr.aria-checked]="allChecked" [ngClass]="{'p-highlight':allChecked, 'p-focus': headerCheckboxFocus, 'p-disabled': disabled || toggleAllDisabled}" (click)="toggleAll($event)">
                            <span class="p-checkbox-icon" [ngClass]="{'pi pi-check':allChecked}"></span>
                        </div>
                    </div>
                    <div class="p-multiselect-filter-container" *ngIf="filter">
                        <input #filterInput type="text" role="textbox" [value]="filterValue||''" (input)="onFilterInputChange($event)" class="p-multiselect-filter p-inputtext p-component" [disabled]="disabled" [attr.placeholder]="filterPlaceHolder" [attr.aria-label]="ariaFilterLabel">
                        <span class="p-multiselect-filter-icon pi pi-search"></span>
                    </div>
                    <button class="p-multiselect-close p-link" type="button" (click)="close($event)" pRipple>
                        <span class="p-multiselect-close-icon pi pi-times"></span>
                    </button>
                </div>
                <div class="p-multiselect-items-wrapper" [style.max-height]="virtualScroll ? 'auto' : (scrollHeight||'auto')">
                    <ul class="p-multiselect-items p-component" [ngClass]="{'p-multiselect-virtualscroll': virtualScroll}" role="listbox" aria-multiselectable="true">
                        <ng-container *ngIf="group">
                            <ng-template ngFor let-optgroup [ngForOf]="optionsToRender">
                                <li class="p-multiselect-item-group">
                                    <span *ngIf="!groupTemplate">{{getOptionGroupLabel(optgroup)||'empty'}}</span>
                                    <ng-container *ngTemplateOutlet="groupTemplate; context: {$implicit: optgroup}"></ng-container>
                                </li>
                                <ng-container *ngTemplateOutlet="itemslist; context: {$implicit: getOptionGroupChildren(optgroup)}"></ng-container>
                            </ng-template>
                        </ng-container>
                        <ng-container *ngIf="!group">
                            <ng-container *ngTemplateOutlet="itemslist; context: {$implicit: optionsToRender}"></ng-container>
                        </ng-container>
                        <ng-template #itemslist let-optionsToDisplay let-selectedOption="selectedOption">
                            <ng-container *ngIf="!virtualScroll; else virtualScrollList">
                                <ng-template ngFor let-option let-i="index" [ngForOf]="optionsToDisplay">
                                    <p-multiSelectItem [option]="option" [selected]="isSelected(option)" [label]="getOptionLabel(option)" [disabled]="isOptionDisabled(option)" (onClick)="onOptionClick($event)" (onKeydown)="onOptionKeydown($event)"
                                            [template]="itemTemplate"></p-multiSelectItem>
                                </ng-template>
                            </ng-container>
                            <ng-template #virtualScrollList>
                                <cdk-virtual-scroll-viewport #viewport [ngStyle]="{'height': scrollHeight}" [itemSize]="itemSize" *ngIf="virtualScroll && !emptyOptions">
                                    <ng-container *cdkVirtualFor="let option of optionsToDisplay; let i = index; let c = count; let f = first; let l = last; let e = even; let o = odd">
                                        <p-multiSelectItem [option]="option" [selected]="isSelected(option)" [label]="getOptionLabel(option)" [disabled]="isOptionDisabled(option)" (onClick)="onOptionClick($event)" (onKeydown)="onOptionKeydown($event)"
                                            [template]="itemTemplate" [itemSize]="itemSize"></p-multiSelectItem>
                                    </ng-container>
                                </cdk-virtual-scroll-viewport>
                            </ng-template>
                            <li *ngIf="hasFilter() && emptyOptions" class="p-multiselect-empty-message">
                                <ng-container *ngIf="!emptyFilterTemplate && !emptyTemplate; else emptyFilter">
                                    {{emptyFilterMessageLabel}}
                                </ng-container>
                                <ng-container #emptyFilter *ngTemplateOutlet="emptyFilterTemplate || emptyTemplate"></ng-container>
                            </li>
                            <li *ngIf="!hasFilter() && emptyOptions" class="p-multiselect-empty-message">
                                <ng-container *ngIf="!emptyTemplate; else empty">
                                    {{emptyMessageLabel}}
                                </ng-container>
                                <ng-container #empty *ngTemplateOutlet="emptyTemplate"></ng-container>
                            </li>
                        </ng-template>
                    </ul>
                </div>
                <div class="p-multiselect-footer" *ngIf="footerFacet || footerTemplate">
                    <ng-content select="p-footer"></ng-content>
                    <ng-container *ngTemplateOutlet="footerTemplate"></ng-container>
                </div>
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
                        '[class.p-inputwrapper-focus]': 'focus || overlayVisible'
                    },
                    providers: [MULTISELECT_VALUE_ACCESSOR],
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    encapsulation: ViewEncapsulation.None,
                    styleUrls: ['./multiselect.css']
                }]
        }], ctorParameters: function () { return [{ type: i0.ElementRef }, { type: i0.Renderer2 }, { type: i0.ChangeDetectorRef }, { type: i3.FilterService }, { type: i3.PrimeNGConfig }, { type: i3.OverlayService }]; }, propDecorators: { style: [{
                type: Input
            }], styleClass: [{
                type: Input
            }], panelStyle: [{
                type: Input
            }], panelStyleClass: [{
                type: Input
            }], inputId: [{
                type: Input
            }], disabled: [{
                type: Input
            }], readonly: [{
                type: Input
            }], group: [{
                type: Input
            }], filter: [{
                type: Input
            }], filterPlaceHolder: [{
                type: Input
            }], filterLocale: [{
                type: Input
            }], overlayVisible: [{
                type: Input
            }], tabindex: [{
                type: Input
            }], appendTo: [{
                type: Input
            }], dataKey: [{
                type: Input
            }], name: [{
                type: Input
            }], ariaLabelledBy: [{
                type: Input
            }], displaySelectedLabel: [{
                type: Input
            }], maxSelectedLabels: [{
                type: Input
            }], selectionLimit: [{
                type: Input
            }], selectedItemsLabel: [{
                type: Input
            }], showToggleAll: [{
                type: Input
            }], emptyFilterMessage: [{
                type: Input
            }], emptyMessage: [{
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
            }], showHeader: [{
                type: Input
            }], autoZIndex: [{
                type: Input
            }], baseZIndex: [{
                type: Input
            }], filterBy: [{
                type: Input
            }], virtualScroll: [{
                type: Input
            }], itemSize: [{
                type: Input
            }], showTransitionOptions: [{
                type: Input
            }], hideTransitionOptions: [{
                type: Input
            }], ariaFilterLabel: [{
                type: Input
            }], filterMatchMode: [{
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
            }], display: [{
                type: Input
            }], containerViewChild: [{
                type: ViewChild,
                args: ['container']
            }], filterInputChild: [{
                type: ViewChild,
                args: ['filterInput']
            }], accessibleViewChild: [{
                type: ViewChild,
                args: ['in']
            }], footerFacet: [{
                type: ContentChild,
                args: [Footer]
            }], headerFacet: [{
                type: ContentChild,
                args: [Header]
            }], templates: [{
                type: ContentChildren,
                args: [PrimeTemplate]
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
            }], onPanelShow: [{
                type: Output
            }], onPanelHide: [{
                type: Output
            }], scrollHeight: [{
                type: Input
            }], defaultLabel: [{
                type: Input
            }], placeholder: [{
                type: Input
            }], options: [{
                type: Input
            }], filterValue: [{
                type: Input
            }] } });
class MultiSelectModule {
}
MultiSelectModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0, type: MultiSelectModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
MultiSelectModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0, type: MultiSelectModule, declarations: [MultiSelect, MultiSelectItem], imports: [CommonModule, SharedModule, ScrollingModule, TooltipModule, RippleModule], exports: [MultiSelect, SharedModule, ScrollingModule] });
MultiSelectModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0, type: MultiSelectModule, imports: [[CommonModule, SharedModule, ScrollingModule, TooltipModule, RippleModule], SharedModule, ScrollingModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0, type: MultiSelectModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule, SharedModule, ScrollingModule, TooltipModule, RippleModule],
                    exports: [MultiSelect, SharedModule, ScrollingModule],
                    declarations: [MultiSelect, MultiSelectItem]
                }]
        }] });

/**
 * Generated bundle index. Do not edit.
 */

export { MULTISELECT_VALUE_ACCESSOR, MultiSelect, MultiSelectItem, MultiSelectModule };
//# sourceMappingURL=primeng-multiselect.js.map
