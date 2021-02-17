import { NgModule, Component, ChangeDetectionStrategy, ViewEncapsulation, Input, ContentChildren, ElementRef, Output, EventEmitter, ViewChild, forwardRef, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule, PrimeTemplate } from 'primeng/api';
import { ObjectUtils } from 'primeng/utils';
import { DomHandler } from 'primeng/dom';
import { trigger, style, transition, animate } from '@angular/animations';
import { ConnectedOverlayScrollHandler } from 'primeng/dom';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { RippleModule } from 'primeng/ripple';
export const CASCADESELECT_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => CascadeSelect),
    multi: true
};
export class CascadeSelectSub {
    constructor(el) {
        this.el = el;
        this.level = 0;
        this.onSelect = new EventEmitter();
        this.onGroupSelect = new EventEmitter();
        this.activeOption = null;
    }
    get parentActive() {
        return this._parentActive;
    }
    ;
    set parentActive(val) {
        if (!val) {
            this.activeOption = null;
        }
        this._parentActive = val;
    }
    ngOnInit() {
        if (this.selectionPath && this.options && !this.dirty) {
            for (let option of this.options) {
                if (this.selectionPath.includes(option)) {
                    this.activeOption = option;
                    break;
                }
            }
        }
        if (!this.root) {
            this.position();
        }
    }
    onOptionClick(event, option) {
        if (this.isOptionGroup(option)) {
            this.activeOption = (this.activeOption === option) ? null : option;
            this.onGroupSelect.emit({
                originalEvent: event,
                value: option
            });
        }
        else {
            this.onSelect.emit({
                originalEvent: event,
                value: this.getOptionValue(option)
            });
        }
    }
    onOptionSelect(event) {
        this.onSelect.emit(event);
    }
    onOptionGroupSelect(event) {
        this.onGroupSelect.emit(event);
    }
    getOptionLabel(option) {
        return this.optionLabel ? ObjectUtils.resolveFieldData(option, this.optionLabel) : option;
    }
    getOptionValue(option) {
        return this.optionValue ? ObjectUtils.resolveFieldData(option, this.optionValue) : option;
    }
    getOptionGroupLabel(optionGroup) {
        return this.optionGroupLabel ? ObjectUtils.resolveFieldData(optionGroup, this.optionGroupLabel) : null;
    }
    getOptionGroupChildren(optionGroup) {
        return ObjectUtils.resolveFieldData(optionGroup, this.optionGroupChildren[this.level]);
    }
    isOptionGroup(option) {
        return Object.prototype.hasOwnProperty.call(option, this.optionGroupChildren[this.level]);
    }
    getOptionLabelToRender(option) {
        return this.isOptionGroup(option) ? this.getOptionGroupLabel(option) : this.getOptionLabel(option);
    }
    getItemClass(option) {
        return {
            'p-cascadeselect-item': true,
            'p-cascadeselect-item-group': this.isOptionGroup(option),
            'p-cascadeselect-item-active p-highlight': this.isOptionActive(option)
        };
    }
    isOptionActive(option) {
        return this.activeOption === option;
    }
    onKeyDown(event, option, index) {
        let listItem = event.currentTarget.parentElement;
        switch (event.key) {
            case 'Down':
            case 'ArrowDown':
                var nextItem = this.el.nativeElement.children[0].children[index + 1];
                if (nextItem) {
                    nextItem.children[0].focus();
                }
                break;
            case 'Up':
            case 'ArrowUp':
                var prevItem = this.el.nativeElement.children[0].children[index - 1];
                if (prevItem) {
                    prevItem.children[0].focus();
                }
                break;
            case 'Right':
            case 'ArrowRight':
                if (this.isOptionGroup(option)) {
                    if (this.isOptionActive(option)) {
                        listItem.children[1].children[0].children[0].children[0].focus();
                    }
                    else {
                        this.activeOption = option;
                    }
                }
                break;
            case 'Left':
            case 'ArrowLeft':
                this.activeOption = null;
                var parentList = listItem.parentElement.parentElement.parentElement;
                if (parentList) {
                    parentList.children[0].focus();
                }
                break;
            case 'Enter':
                this.onOptionClick(event, option);
                break;
        }
        event.preventDefault();
    }
    position() {
        const parentItem = this.el.nativeElement.parentElement;
        const containerOffset = DomHandler.getOffset(parentItem);
        const viewport = DomHandler.getViewport();
        const sublistWidth = this.el.nativeElement.children[0].offsetParent ? this.el.nativeElement.children[0].offsetWidth : DomHandler.getHiddenElementOuterWidth(this.el.nativeElement.children[0]);
        const itemOuterWidth = DomHandler.getOuterWidth(parentItem.children[0]);
        if ((parseInt(containerOffset.left, 10) + itemOuterWidth + sublistWidth) > (viewport.width - DomHandler.calculateScrollbarWidth())) {
            this.el.nativeElement.children[0].style.left = '-200%';
        }
    }
}
CascadeSelectSub.decorators = [
    { type: Component, args: [{
                selector: 'p-cascadeSelectSub',
                template: `
        <ul class="p-cascadeselect-panel p-cascadeselect-items" [ngClass]="{'p-cascadeselect-panel-root': root}" role="listbox" aria-orientation="horizontal">
            <ng-template ngFor let-option [ngForOf]="options" let-i="index">
                <li [ngClass]="getItemClass(option)" role="none">
                    <div class="p-cascadeselect-item-content" (click)="onOptionClick($event, option)" tabindex="0" (keydown)="onKeyDown($event, option, i)" pRipple>
                        <ng-container *ngIf="optionTemplate;else defaultOptionTemplate">
                            <ng-container *ngTemplateOutlet="optionTemplate; context: {$implicit: option}"></ng-container>
                        </ng-container>
                        <ng-template #defaultOptionTemplate>
                            <span class="p-cascadeselect-item-text">{{getOptionLabelToRender(option)}}</span>
                        </ng-template>
                        <span class="p-cascadeselect-group-icon pi pi-angle-right" *ngIf="isOptionGroup(option)"></span>
                    </div>
                    <p-cascadeSelectSub *ngIf="isOptionGroup(option) && isOptionActive(option)" class="p-cascadeselect-sublist" [selectionPath]="selectionPath" [options]="getOptionGroupChildren(option)"
                        [optionLabel]="optionLabel" [optionValue]="optionValue" [level]="level + 1" (onSelect)="onOptionSelect($event)" (onOptionGroupSelect)="onOptionGroupSelect()"
                        [optionGroupLabel]="optionGroupLabel" [optionGroupChildren]="optionGroupChildren" [parentActive]="isOptionActive(option)" [dirty]="dirty" [optionTemplate]="optionTemplate">
                    </p-cascadeSelectSub>
                </li>
            </ng-template>
        </ul>
    `,
                encapsulation: ViewEncapsulation.None,
                changeDetection: ChangeDetectionStrategy.OnPush
            },] }
];
CascadeSelectSub.ctorParameters = () => [
    { type: ElementRef }
];
CascadeSelectSub.propDecorators = {
    selectionPath: [{ type: Input }],
    options: [{ type: Input }],
    optionGroupChildren: [{ type: Input }],
    optionTemplate: [{ type: Input }],
    level: [{ type: Input }],
    optionLabel: [{ type: Input }],
    optionValue: [{ type: Input }],
    optionGroupLabel: [{ type: Input }],
    dirty: [{ type: Input }],
    root: [{ type: Input }],
    onSelect: [{ type: Output }],
    onGroupSelect: [{ type: Output }],
    parentActive: [{ type: Input }]
};
export class CascadeSelect {
    constructor(el, cd) {
        this.el = el;
        this.cd = cd;
        this.showTransitionOptions = '.12s cubic-bezier(0, 0, 0.2, 1)';
        this.hideTransitionOptions = '.1s linear';
        this.onChange = new EventEmitter();
        this.onGroupChange = new EventEmitter();
        this.onShow = new EventEmitter();
        this.onHide = new EventEmitter();
        this.onBeforeShow = new EventEmitter();
        this.onBeforeHide = new EventEmitter();
        this.selectionPath = null;
        this.focused = false;
        this.filled = false;
        this.overlayVisible = false;
        this.dirty = false;
        this.onModelChange = () => { };
        this.onModelTouched = () => { };
    }
    ngOnInit() {
        this.updateSelectionPath();
    }
    ngAfterContentInit() {
        this.templates.forEach((item) => {
            switch (item.getType()) {
                case 'value':
                    this.valueTemplate = item.template;
                    break;
                case 'option':
                    this.optionTemplate = item.template;
                    break;
            }
        });
    }
    onOptionSelect(event) {
        this.value = event.value;
        this.updateSelectionPath();
        this.onModelChange(this.value);
        this.onChange.emit(event);
        this.hide();
        this.focusInputEl.nativeElement.focus();
    }
    onOptionGroupSelect(event) {
        this.dirty = true;
        this.onGroupChange.emit(event);
    }
    getOptionLabel(option) {
        return this.optionLabel ? ObjectUtils.resolveFieldData(option, this.optionLabel) : option;
    }
    getOptionValue(option) {
        return this.optionValue ? ObjectUtils.resolveFieldData(option, this.optionValue) : option;
    }
    getOptionGroupChildren(optionGroup, level) {
        return ObjectUtils.resolveFieldData(optionGroup, this.optionGroupChildren[level]);
    }
    isOptionGroup(option, level) {
        return Object.prototype.hasOwnProperty.call(option, this.optionGroupChildren[level]);
    }
    updateSelectionPath() {
        let path;
        if (this.value != null && this.options) {
            for (let option of this.options) {
                path = this.findModelOptionInGroup(option, 0);
                if (path) {
                    break;
                }
            }
        }
        this.selectionPath = path;
        this.updateFilledState();
    }
    updateFilledState() {
        this.filled = !(this.selectionPath == null || this.selectionPath.length == 0);
    }
    findModelOptionInGroup(option, level) {
        if (this.isOptionGroup(option, level)) {
            let selectedOption;
            for (let childOption of this.getOptionGroupChildren(option, level)) {
                selectedOption = this.findModelOptionInGroup(childOption, level + 1);
                if (selectedOption) {
                    selectedOption.unshift(option);
                    return selectedOption;
                }
            }
        }
        else if ((ObjectUtils.equals(this.value, this.getOptionValue(option), this.dataKey))) {
            return [option];
        }
        return null;
    }
    show() {
        this.onBeforeShow.emit();
        this.overlayVisible = true;
    }
    hide() {
        this.onBeforeHide.emit();
        this.overlayVisible = false;
        this.cd.markForCheck();
    }
    onClick(event) {
        if (this.disabled) {
            return;
        }
        if (!this.overlayEl || !this.overlayEl || !this.overlayEl.contains(event.target)) {
            if (this.overlayVisible) {
                this.hide();
            }
            else {
                this.show();
            }
            this.focusInputEl.nativeElement.focus();
        }
    }
    onFocus() {
        this.focused = true;
    }
    onBlur() {
        this.focused = false;
    }
    onOverlayAnimationStart(event) {
        switch (event.toState) {
            case 'visible':
                this.overlayEl = event.element;
                this.onOverlayEnter();
                break;
        }
    }
    onOverlayAnimationDone(event) {
        switch (event.toState) {
            case 'void':
                this.onOverlayLeave();
                break;
        }
    }
    onOverlayEnter() {
        this.overlayEl.style.zIndex = String(DomHandler.generateZIndex());
        this.appendContainer();
        this.alignOverlay();
        this.bindOutsideClickListener();
        this.bindScrollListener();
        this.bindResizeListener();
        this.onShow.emit();
    }
    onOverlayLeave() {
        this.unbindOutsideClickListener();
        this.unbindScrollListener();
        this.unbindResizeListener();
        this.onHide.emit();
        this.overlayEl = null;
        this.dirty = false;
    }
    writeValue(value) {
        this.value = value;
        this.updateSelectionPath();
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
    alignOverlay() {
        if (this.appendTo) {
            DomHandler.absolutePosition(this.overlayEl, this.containerEl.nativeElement);
            this.overlayEl.style.minWidth = DomHandler.getOuterWidth(this.containerEl.nativeElement) + 'px';
        }
        else {
            DomHandler.relativePosition(this.overlayEl, this.containerEl.nativeElement);
        }
    }
    bindOutsideClickListener() {
        if (!this.outsideClickListener) {
            this.outsideClickListener = (event) => {
                if (this.overlayVisible && this.overlayEl && !this.containerEl.nativeElement.contains(event.target) && !this.overlayEl.contains(event.target)) {
                    this.hide();
                }
            };
            document.addEventListener('click', this.outsideClickListener);
        }
    }
    unbindOutsideClickListener() {
        if (this.outsideClickListener) {
            document.removeEventListener('click', this.outsideClickListener);
            this.outsideClickListener = null;
        }
    }
    bindScrollListener() {
        if (!this.scrollHandler) {
            this.scrollHandler = new ConnectedOverlayScrollHandler(this.containerEl.nativeElement, () => {
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
    bindResizeListener() {
        if (!this.resizeListener) {
            this.resizeListener = () => {
                if (this.overlayVisible) {
                    this.hide();
                }
            };
            window.addEventListener('resize', this.resizeListener);
        }
    }
    unbindResizeListener() {
        if (this.resizeListener) {
            window.removeEventListener('resize', this.resizeListener);
            this.resizeListener = null;
        }
    }
    appendContainer() {
        if (this.appendTo) {
            if (this.appendTo === 'body')
                document.body.appendChild(this.overlayEl);
            else
                document.getElementById(this.appendTo).appendChild(this.overlayEl);
        }
    }
    restoreAppend() {
        if (this.overlayEl && this.appendTo) {
            if (this.appendTo === 'body')
                document.body.removeChild(this.overlayEl);
            else
                document.getElementById(this.appendTo).removeChild(this.overlayEl);
        }
    }
    label() {
        if (this.selectionPath)
            return this.getOptionLabel(this.selectionPath[this.selectionPath.length - 1]);
        else
            return this.placeholder || 'p-emptylabel';
    }
    onKeyDown(event) {
        switch (event.key) {
            case 'Down':
            case 'ArrowDown':
                if (this.overlayVisible) {
                    DomHandler.findSingle(this.overlayEl, '.p-cascadeselect-item').children[0].focus();
                }
                else if (event.altKey && this.options && this.options.length) {
                    this.show();
                }
                event.preventDefault();
                break;
            case 'Escape':
                if (this.overlayVisible) {
                    this.hide();
                    event.preventDefault();
                }
                break;
            case 'Tab':
                this.hide();
                break;
        }
    }
    containerClass() {
        return {
            'p-cascadeselect p-component p-inputwrapper': true,
            'p-disabled': this.disabled,
            'p-focus': this.focused
        };
    }
    labelClass() {
        return {
            'p-cascadeselect-label': true,
            'p-placeholder': this.label() === this.placeholder,
            'p-cascadeselect-label-empty': !this.value && (this.label() === 'p-emptylabel' || this.label().length === 0)
        };
    }
    ngOnDestroy() {
        this.restoreAppend();
        this.unbindOutsideClickListener();
        this.unbindResizeListener();
        if (this.scrollHandler) {
            this.scrollHandler.destroy();
            this.scrollHandler = null;
        }
        this.overlayEl = null;
    }
}
CascadeSelect.decorators = [
    { type: Component, args: [{
                selector: 'p-cascadeSelect',
                template: `
        <div #container [ngClass]="containerClass()" [class]="styleClass" [ngStyle]="style" (click)="onClick($event)">
            <div class="p-hidden-accessible">
                <input #focusInput type="text" [attr.id]="inputId" readonly [disabled]="disabled" (focus)="onFocus()" (blur)="onBlur()"  (keydown)="onKeyDown($event)" [attr.tabindex]="tabindex"
                    aria-haspopup="listbox" [attr.aria-expanded]="overlayVisible" [attr.aria-labelledby]="ariaLabelledBy">
            </div>
            <span [ngClass]="labelClass()">
                <ng-container *ngIf="valueTemplate;else defaultValueTemplate">
                        <ng-container *ngTemplateOutlet="valueTemplate; context: {$implicit: value, placeholder: placeholder}"></ng-container>
                </ng-container>
                <ng-template #defaultValueTemplate>
                    {{label()}}
                </ng-template>
            </span>
            <div class="p-cascadeselect-trigger" role="button" aria-haspopup="listbox" [attr.aria-expanded]="overlayVisible">
                <span class="p-cascadeselect-trigger-icon pi pi-chevron-down"></span>
            </div>
            <div class="p-cascadeselect-panel p-component" *ngIf="overlayVisible" 
                [@overlayAnimation]="{value: 'visible', params: {showTransitionParams: showTransitionOptions, hideTransitionParams: hideTransitionOptions}}" (@overlayAnimation.start)="onOverlayAnimationStart($event)" (@overlayAnimation.done)="onOverlayAnimationDone($event)">
                <div class="p-cascadeselect-items-wrapper">
                    <p-cascadeSelectSub [options]="options" [selectionPath]="selectionPath" class="p-cascadeselect-items" 
                        [optionLabel]="optionLabel" [optionValue]="optionValue" [level]="0" [optionTemplate]="optionTemplate"
                        [optionGroupLabel]="optionGroupLabel" [optionGroupChildren]="optionGroupChildren" 
                        (onSelect)="onOptionSelect($event)" (onGroupSelect)="onOptionGroupSelect()" [dirty]="dirty" [root]="true">
                    </p-cascadeSelectSub>
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
                    '[class.p-inputwrapper-filled]': 'filled',
                    '[class.p-inputwrapper-focus]': 'focused || overlayVisible'
                },
                providers: [CASCADESELECT_VALUE_ACCESSOR],
                changeDetection: ChangeDetectionStrategy.OnPush,
                encapsulation: ViewEncapsulation.None,
                styles: [".p-cascadeselect{-ms-user-select:none;-webkit-user-select:none;cursor:pointer;display:inline-flex;position:relative;user-select:none}.p-cascadeselect-trigger{align-items:center;display:flex;flex-shrink:0;justify-content:center}.p-cascadeselect-label{cursor:pointer;display:block;flex:1 1 auto;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;width:1%}.p-cascadeselect-label-empty{overflow:hidden;visibility:hidden}.p-cascadeselect .p-cascadeselect-panel{min-width:100%}.p-cascadeselect-panel{position:absolute}.p-cascadeselect-item{cursor:pointer;font-weight:400;white-space:nowrap}.p-cascadeselect-item-content{align-items:center;display:flex;overflow:hidden;position:relative}.p-cascadeselect-group-icon{margin-left:auto}.p-cascadeselect-items{list-style-type:none;margin:0;padding:0}.p-fluid .p-cascadeselect{display:flex}.p-fluid .p-cascadeselect .p-cascadeselect-label{width:1%}.p-cascadeselect-sublist{display:none;min-width:100%;position:absolute;z-index:1}.p-cascadeselect-item-active{overflow:visible!important}.p-cascadeselect-item-active>.p-cascadeselect-sublist{display:block;left:100%;top:0}"]
            },] }
];
CascadeSelect.ctorParameters = () => [
    { type: ElementRef },
    { type: ChangeDetectorRef }
];
CascadeSelect.propDecorators = {
    styleClass: [{ type: Input }],
    style: [{ type: Input }],
    options: [{ type: Input }],
    optionLabel: [{ type: Input }],
    optionValue: [{ type: Input }],
    optionGroupLabel: [{ type: Input }],
    optionGroupChildren: [{ type: Input }],
    placeholder: [{ type: Input }],
    value: [{ type: Input }],
    dataKey: [{ type: Input }],
    inputId: [{ type: Input }],
    tabindex: [{ type: Input }],
    ariaLabelledBy: [{ type: Input }],
    appendTo: [{ type: Input }],
    disabled: [{ type: Input }],
    rounded: [{ type: Input }],
    showTransitionOptions: [{ type: Input }],
    hideTransitionOptions: [{ type: Input }],
    focusInputEl: [{ type: ViewChild, args: ['focusInput',] }],
    containerEl: [{ type: ViewChild, args: ['container',] }],
    onChange: [{ type: Output }],
    onGroupChange: [{ type: Output }],
    onShow: [{ type: Output }],
    onHide: [{ type: Output }],
    onBeforeShow: [{ type: Output }],
    onBeforeHide: [{ type: Output }],
    templates: [{ type: ContentChildren, args: [PrimeTemplate,] }]
};
export class CascadeSelectModule {
}
CascadeSelectModule.decorators = [
    { type: NgModule, args: [{
                imports: [CommonModule, SharedModule, RippleModule],
                exports: [CascadeSelect, CascadeSelectSub, SharedModule],
                declarations: [CascadeSelect, CascadeSelectSub]
            },] }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FzY2FkZXNlbGVjdC5qcyIsInNvdXJjZVJvb3QiOiIuLi8uLi8uLi9zcmMvYXBwL2NvbXBvbmVudHMvY2FzY2FkZXNlbGVjdC8iLCJzb3VyY2VzIjpbImNhc2NhZGVzZWxlY3QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFFBQVEsRUFBRSxTQUFTLEVBQUUsdUJBQXVCLEVBQUUsaUJBQWlCLEVBQUUsS0FBSyxFQUFlLGVBQWUsRUFBYSxVQUFVLEVBQUUsTUFBTSxFQUFFLFlBQVksRUFBRSxTQUFTLEVBQUUsVUFBVSxFQUFFLGlCQUFpQixFQUFpRCxNQUFNLGVBQWUsQ0FBQztBQUMzUSxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUFFLFlBQVksRUFBRSxhQUFhLEVBQUUsTUFBTSxhQUFhLENBQUM7QUFDMUQsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUM1QyxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sYUFBYSxDQUFDO0FBQ3pDLE9BQU8sRUFBRSxPQUFPLEVBQUMsS0FBSyxFQUFDLFVBQVUsRUFBQyxPQUFPLEVBQWdCLE1BQU0scUJBQXFCLENBQUM7QUFDckYsT0FBTyxFQUFFLDZCQUE2QixFQUFFLE1BQU0sYUFBYSxDQUFDO0FBQzVELE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQ25ELE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUU5QyxNQUFNLENBQUMsTUFBTSw0QkFBNEIsR0FBUTtJQUM3QyxPQUFPLEVBQUUsaUJBQWlCO0lBQzFCLFdBQVcsRUFBRSxVQUFVLENBQUMsR0FBRyxFQUFFLENBQUMsYUFBYSxDQUFDO0lBQzVDLEtBQUssRUFBRSxJQUFJO0NBQ2QsQ0FBQztBQTRCRixNQUFNLE9BQU8sZ0JBQWdCO0lBeUN6QixZQUFvQixFQUFjO1FBQWQsT0FBRSxHQUFGLEVBQUUsQ0FBWTtRQS9CekIs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QUM7YUFDbEQiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBOZ01vZHVsZSwgQ29tcG9uZW50LCBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSwgVmlld0VuY2Fwc3VsYXRpb24sIElucHV0LCBUZW1wbGF0ZVJlZiwgQ29udGVudENoaWxkcmVuLCBRdWVyeUxpc3QsIEVsZW1lbnRSZWYsIE91dHB1dCwgRXZlbnRFbWl0dGVyLCBWaWV3Q2hpbGQsIGZvcndhcmRSZWYsIENoYW5nZURldGVjdG9yUmVmLCBSZW5kZXJlcjIsIE9uRGVzdHJveSwgT25Jbml0LCBBZnRlckNvbnRlbnRJbml0fSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBTaGFyZWRNb2R1bGUsIFByaW1lVGVtcGxhdGUgfSBmcm9tICdwcmltZW5nL2FwaSc7XG5pbXBvcnQgeyBPYmplY3RVdGlscyB9IGZyb20gJ3ByaW1lbmcvdXRpbHMnO1xuaW1wb3J0IHsgRG9tSGFuZGxlciB9IGZyb20gJ3ByaW1lbmcvZG9tJztcbmltcG9ydCB7IHRyaWdnZXIsc3R5bGUsdHJhbnNpdGlvbixhbmltYXRlLEFuaW1hdGlvbkV2ZW50fSBmcm9tICdAYW5ndWxhci9hbmltYXRpb25zJztcbmltcG9ydCB7IENvbm5lY3RlZE92ZXJsYXlTY3JvbGxIYW5kbGVyIH0gZnJvbSAncHJpbWVuZy9kb20nO1xuaW1wb3J0IHsgTkdfVkFMVUVfQUNDRVNTT1IgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQgeyBSaXBwbGVNb2R1bGUgfSBmcm9tICdwcmltZW5nL3JpcHBsZSc7XG5cbmV4cG9ydCBjb25zdCBDQVNDQURFU0VMRUNUX1ZBTFVFX0FDQ0VTU09SOiBhbnkgPSB7XG4gICAgcHJvdmlkZTogTkdfVkFMVUVfQUNDRVNTT1IsXG4gICAgdXNlRXhpc3Rpbmc6IGZvcndhcmRSZWYoKCkgPT4gQ2FzY2FkZVNlbGVjdCksXG4gICAgbXVsdGk6IHRydWVcbn07XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAncC1jYXNjYWRlU2VsZWN0U3ViJyxcbiAgICB0ZW1wbGF0ZTogYFxuICAgICAgICA8dWwgY2xhc3M9XCJwLWNhc2NhZGVzZWxlY3QtcGFuZWwgcC1jYXNjYWRlc2VsZWN0LWl0ZW1zXCIgW25nQ2xhc3NdPVwieydwLWNhc2NhZGVzZWxlY3QtcGFuZWwtcm9vdCc6IHJvb3R9XCIgcm9sZT1cImxpc3Rib3hcIiBhcmlhLW9yaWVudGF0aW9uPVwiaG9yaXpvbnRhbFwiPlxuICAgICAgICAgICAgPG5nLXRlbXBsYXRlIG5nRm9yIGxldC1vcHRpb24gW25nRm9yT2ZdPVwib3B0aW9uc1wiIGxldC1pPVwiaW5kZXhcIj5cbiAgICAgICAgICAgICAgICA8bGkgW25nQ2xhc3NdPVwiZ2V0SXRlbUNsYXNzKG9wdGlvbilcIiByb2xlPVwibm9uZVwiPlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwicC1jYXNjYWRlc2VsZWN0LWl0ZW0tY29udGVudFwiIChjbGljayk9XCJvbk9wdGlvbkNsaWNrKCRldmVudCwgb3B0aW9uKVwiIHRhYmluZGV4PVwiMFwiIChrZXlkb3duKT1cIm9uS2V5RG93bigkZXZlbnQsIG9wdGlvbiwgaSlcIiBwUmlwcGxlPlxuICAgICAgICAgICAgICAgICAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdJZj1cIm9wdGlvblRlbXBsYXRlO2Vsc2UgZGVmYXVsdE9wdGlvblRlbXBsYXRlXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdUZW1wbGF0ZU91dGxldD1cIm9wdGlvblRlbXBsYXRlOyBjb250ZXh0OiB7JGltcGxpY2l0OiBvcHRpb259XCI+PC9uZy1jb250YWluZXI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L25nLWNvbnRhaW5lcj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxuZy10ZW1wbGF0ZSAjZGVmYXVsdE9wdGlvblRlbXBsYXRlPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwicC1jYXNjYWRlc2VsZWN0LWl0ZW0tdGV4dFwiPnt7Z2V0T3B0aW9uTGFiZWxUb1JlbmRlcihvcHRpb24pfX08L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L25nLXRlbXBsYXRlPlxuICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJwLWNhc2NhZGVzZWxlY3QtZ3JvdXAtaWNvbiBwaSBwaS1hbmdsZS1yaWdodFwiICpuZ0lmPVwiaXNPcHRpb25Hcm91cChvcHRpb24pXCI+PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgPHAtY2FzY2FkZVNlbGVjdFN1YiAqbmdJZj1cImlzT3B0aW9uR3JvdXAob3B0aW9uKSAmJiBpc09wdGlvbkFjdGl2ZShvcHRpb24pXCIgY2xhc3M9XCJwLWNhc2NhZGVzZWxlY3Qtc3VibGlzdFwiIFtzZWxlY3Rpb25QYXRoXT1cInNlbGVjdGlvblBhdGhcIiBbb3B0aW9uc109XCJnZXRPcHRpb25Hcm91cENoaWxkcmVuKG9wdGlvbilcIlxuICAgICAgICAgICAgICAgICAgICAgICAgW29wdGlvbkxhYmVsXT1cIm9wdGlvbkxhYmVsXCIgW29wdGlvblZhbHVlXT1cIm9wdGlvblZhbHVlXCIgW2xldmVsXT1cImxldmVsICsgMVwiIChvblNlbGVjdCk9XCJvbk9wdGlvblNlbGVjdCgkZXZlbnQpXCIgKG9uT3B0aW9uR3JvdXBTZWxlY3QpPVwib25PcHRpb25Hcm91cFNlbGVjdCgpXCJcbiAgICAgICAgICAgICAgICAgICAgICAgIFtvcHRpb25Hcm91cExhYmVsXT1cIm9wdGlvbkdyb3VwTGFiZWxcIiBbb3B0aW9uR3JvdXBDaGlsZHJlbl09XCJvcHRpb25Hcm91cENoaWxkcmVuXCIgW3BhcmVudEFjdGl2ZV09XCJpc09wdGlvbkFjdGl2ZShvcHRpb24pXCIgW2RpcnR5XT1cImRpcnR5XCIgW29wdGlvblRlbXBsYXRlXT1cIm9wdGlvblRlbXBsYXRlXCI+XG4gICAgICAgICAgICAgICAgICAgIDwvcC1jYXNjYWRlU2VsZWN0U3ViPlxuICAgICAgICAgICAgICAgIDwvbGk+XG4gICAgICAgICAgICA8L25nLXRlbXBsYXRlPlxuICAgICAgICA8L3VsPlxuICAgIGAsXG4gICAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZSxcbiAgICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaFxufSlcbmV4cG9ydCBjbGFzcyBDYXNjYWRlU2VsZWN0U3ViIGltcGxlbWVudHMgT25Jbml0IHtcblxuICAgIEBJbnB1dCgpIHNlbGVjdGlvblBhdGg6IGFueVtdO1xuXG4gICAgQElucHV0KCkgb3B0aW9uczogYW55W107XG5cbiAgICBASW5wdXQoKSBvcHRpb25Hcm91cENoaWxkcmVuOiBhbnlbXTtcblxuICAgIEBJbnB1dCgpIG9wdGlvblRlbXBsYXRlOiBUZW1wbGF0ZVJlZjxhbnk+O1xuXG4gICAgQElucHV0KCkgbGV2ZWw6IG51bWJlciA9IDA7XG5cbiAgICBASW5wdXQoKSBvcHRpb25MYWJlbDogc3RyaW5nO1xuXG4gICAgQElucHV0KCkgb3B0aW9uVmFsdWU6IHN0cmluZztcblxuICAgIEBJbnB1dCgpIG9wdGlvbkdyb3VwTGFiZWw6IHN0cmluZztcblxuICAgIEBJbnB1dCgpIGRpcnR5OiBib29sZWFuO1xuXG4gICAgQElucHV0KCkgcm9vdDogYm9vbGVhbjtcblxuICAgIEBPdXRwdXQoKSBvblNlbGVjdDogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgICBAT3V0cHV0KCkgb25Hcm91cFNlbGVjdDogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgICBASW5wdXQoKSBnZXQgcGFyZW50QWN0aXZlKCk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gdGhpcy5fcGFyZW50QWN0aXZlO1xuICAgIH07XG4gICAgc2V0IHBhcmVudEFjdGl2ZSh2YWwpIHtcbiAgICAgICAgaWYgKCF2YWwpIHtcbiAgICAgICAgICAgIHRoaXMuYWN0aXZlT3B0aW9uID0gbnVsbDtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuX3BhcmVudEFjdGl2ZSA9IHZhbDtcbiAgICB9XG5cbiAgICBhY3RpdmVPcHRpb246IGFueSA9IG51bGw7XG5cbiAgICBfcGFyZW50QWN0aXZlOiBib29sZWFuO1xuXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBlbDogRWxlbWVudFJlZikgeyB9XG5cbiAgICBuZ09uSW5pdCgpIHtcbiAgICAgICAgaWYgKHRoaXMuc2VsZWN0aW9uUGF0aCAmJiB0aGlzLm9wdGlvbnMgJiYgIXRoaXMuZGlydHkpIHtcbiAgICAgICAgICAgIGZvciAobGV0IG9wdGlvbiBvZiB0aGlzLm9wdGlvbnMpIHtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5zZWxlY3Rpb25QYXRoLmluY2x1ZGVzKG9wdGlvbikpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5hY3RpdmVPcHRpb24gPSBvcHRpb247XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGlmICghdGhpcy5yb290KSB7XG4gICAgICAgICAgICB0aGlzLnBvc2l0aW9uKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBvbk9wdGlvbkNsaWNrKGV2ZW50LCBvcHRpb24pIHtcbiAgICAgICAgaWYgKHRoaXMuaXNPcHRpb25Hcm91cChvcHRpb24pKSB7XG4gICAgICAgICAgICB0aGlzLmFjdGl2ZU9wdGlvbiA9ICh0aGlzLmFjdGl2ZU9wdGlvbiA9PT0gb3B0aW9uKSA/IG51bGwgOiBvcHRpb247XG5cbiAgICAgICAgICAgIHRoaXMub25Hcm91cFNlbGVjdC5lbWl0KHtcbiAgICAgICAgICAgICAgICBvcmlnaW5hbEV2ZW50OiBldmVudCxcbiAgICAgICAgICAgICAgICB2YWx1ZTogb3B0aW9uXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMub25TZWxlY3QuZW1pdCh7XG4gICAgICAgICAgICAgICAgb3JpZ2luYWxFdmVudDogZXZlbnQsXG4gICAgICAgICAgICAgICAgdmFsdWU6IHRoaXMuZ2V0T3B0aW9uVmFsdWUob3B0aW9uKVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBvbk9wdGlvblNlbGVjdChldmVudCkge1xuICAgICAgICB0aGlzLm9uU2VsZWN0LmVtaXQoZXZlbnQpO1xuICAgIH1cblxuICAgIG9uT3B0aW9uR3JvdXBTZWxlY3QoZXZlbnQpIHtcbiAgICAgICAgdGhpcy5vbkdyb3VwU2VsZWN0LmVtaXQoZXZlbnQpO1xuICAgIH1cblxuICAgIGdldE9wdGlvbkxhYmVsKG9wdGlvbikge1xuICAgICAgICByZXR1cm4gdGhpcy5vcHRpb25MYWJlbCA/IE9iamVjdFV0aWxzLnJlc29sdmVGaWVsZERhdGEob3B0aW9uLCB0aGlzLm9wdGlvbkxhYmVsKSA6IG9wdGlvbjtcbiAgICB9XG5cbiAgICBnZXRPcHRpb25WYWx1ZShvcHRpb24pIHtcbiAgICAgICAgcmV0dXJuIHRoaXMub3B0aW9uVmFsdWUgPyBPYmplY3RVdGlscy5yZXNvbHZlRmllbGREYXRhKG9wdGlvbiwgdGhpcy5vcHRpb25WYWx1ZSkgOiBvcHRpb247XG4gICAgfVxuXG4gICAgZ2V0T3B0aW9uR3JvdXBMYWJlbChvcHRpb25Hcm91cCkge1xuICAgICAgICByZXR1cm4gdGhpcy5vcHRpb25Hcm91cExhYmVsID8gT2JqZWN0VXRpbHMucmVzb2x2ZUZpZWxkRGF0YShvcHRpb25Hcm91cCwgdGhpcy5vcHRpb25Hcm91cExhYmVsKSA6IG51bGw7XG4gICAgfVxuXG4gICAgZ2V0T3B0aW9uR3JvdXBDaGlsZHJlbihvcHRpb25Hcm91cCkge1xuICAgICAgICByZXR1cm4gT2JqZWN0VXRpbHMucmVzb2x2ZUZpZWxkRGF0YShvcHRpb25Hcm91cCwgdGhpcy5vcHRpb25Hcm91cENoaWxkcmVuW3RoaXMubGV2ZWxdKTtcbiAgICB9XG5cbiAgICBpc09wdGlvbkdyb3VwKG9wdGlvbikge1xuICAgICAgICByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9wdGlvbiwgdGhpcy5vcHRpb25Hcm91cENoaWxkcmVuW3RoaXMubGV2ZWxdKTtcbiAgICB9XG5cbiAgICBnZXRPcHRpb25MYWJlbFRvUmVuZGVyKG9wdGlvbikge1xuICAgICAgICByZXR1cm4gdGhpcy5pc09wdGlvbkdyb3VwKG9wdGlvbikgPyB0aGlzLmdldE9wdGlvbkdyb3VwTGFiZWwob3B0aW9uKSA6IHRoaXMuZ2V0T3B0aW9uTGFiZWwob3B0aW9uKTtcbiAgICB9XG5cbiAgICBnZXRJdGVtQ2xhc3Mob3B0aW9uKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAncC1jYXNjYWRlc2VsZWN0LWl0ZW0nOiB0cnVlLCBcbiAgICAgICAgICAgICdwLWNhc2NhZGVzZWxlY3QtaXRlbS1ncm91cCc6IHRoaXMuaXNPcHRpb25Hcm91cChvcHRpb24pLFxuICAgICAgICAgICAgJ3AtY2FzY2FkZXNlbGVjdC1pdGVtLWFjdGl2ZSBwLWhpZ2hsaWdodCc6IHRoaXMuaXNPcHRpb25BY3RpdmUob3B0aW9uKVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgaXNPcHRpb25BY3RpdmUob3B0aW9uKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmFjdGl2ZU9wdGlvbiA9PT0gb3B0aW9uO1xuICAgIH1cblxuICAgIG9uS2V5RG93bihldmVudCwgb3B0aW9uLCBpbmRleCkge1xuICAgICAgICBsZXQgbGlzdEl0ZW0gPSBldmVudC5jdXJyZW50VGFyZ2V0LnBhcmVudEVsZW1lbnQ7XG5cbiAgICAgICAgc3dpdGNoIChldmVudC5rZXkpIHtcbiAgICAgICAgICAgIGNhc2UgJ0Rvd24nOlxuICAgICAgICAgICAgY2FzZSAnQXJyb3dEb3duJzpcbiAgICAgICAgICAgICAgICB2YXIgbmV4dEl0ZW0gPSB0aGlzLmVsLm5hdGl2ZUVsZW1lbnQuY2hpbGRyZW5bMF0uY2hpbGRyZW5baW5kZXggKyAxXTtcbiAgICAgICAgICAgICAgICBpZiAobmV4dEl0ZW0pIHtcbiAgICAgICAgICAgICAgICAgICAgbmV4dEl0ZW0uY2hpbGRyZW5bMF0uZm9jdXMoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgY2FzZSAnVXAnOlxuICAgICAgICAgICAgY2FzZSAnQXJyb3dVcCc6XG4gICAgICAgICAgICAgICAgdmFyIHByZXZJdGVtID0gdGhpcy5lbC5uYXRpdmVFbGVtZW50LmNoaWxkcmVuWzBdLmNoaWxkcmVuW2luZGV4IC0gMV07XG4gICAgICAgICAgICAgICAgaWYgKHByZXZJdGVtKSB7XG4gICAgICAgICAgICAgICAgICAgIHByZXZJdGVtLmNoaWxkcmVuWzBdLmZvY3VzKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgIGNhc2UgJ1JpZ2h0JzpcbiAgICAgICAgICAgIGNhc2UgJ0Fycm93UmlnaHQnOlxuICAgICAgICAgICAgICAgIGlmICh0aGlzLmlzT3B0aW9uR3JvdXAob3B0aW9uKSkge1xuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5pc09wdGlvbkFjdGl2ZShvcHRpb24pKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBsaXN0SXRlbS5jaGlsZHJlblsxXS5jaGlsZHJlblswXS5jaGlsZHJlblswXS5jaGlsZHJlblswXS5mb2N1cygpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5hY3RpdmVPcHRpb24gPSBvcHRpb247XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgY2FzZSAnTGVmdCc6XG4gICAgICAgICAgICBjYXNlICdBcnJvd0xlZnQnOlxuICAgICAgICAgICAgICAgIHRoaXMuYWN0aXZlT3B0aW9uID0gbnVsbDtcblxuICAgICAgICAgICAgICAgIHZhciBwYXJlbnRMaXN0ID0gbGlzdEl0ZW0ucGFyZW50RWxlbWVudC5wYXJlbnRFbGVtZW50LnBhcmVudEVsZW1lbnQ7XG4gICAgICAgICAgICAgICAgaWYgKHBhcmVudExpc3QpIHtcbiAgICAgICAgICAgICAgICAgICAgcGFyZW50TGlzdC5jaGlsZHJlblswXS5mb2N1cygpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICBjYXNlICdFbnRlcic6XG4gICAgICAgICAgICAgICAgdGhpcy5vbk9wdGlvbkNsaWNrKGV2ZW50LCBvcHRpb24pO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cblxuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIH1cblxuICAgIHBvc2l0aW9uKCkge1xuICAgICAgICBjb25zdCBwYXJlbnRJdGVtID0gdGhpcy5lbC5uYXRpdmVFbGVtZW50LnBhcmVudEVsZW1lbnQ7XG4gICAgICAgIGNvbnN0IGNvbnRhaW5lck9mZnNldCA9IERvbUhhbmRsZXIuZ2V0T2Zmc2V0KHBhcmVudEl0ZW0pO1xuICAgICAgICBjb25zdCB2aWV3cG9ydCA9IERvbUhhbmRsZXIuZ2V0Vmlld3BvcnQoKTtcbiAgICAgICAgY29uc3Qgc3VibGlzdFdpZHRoID0gdGhpcy5lbC5uYXRpdmVFbGVtZW50LmNoaWxkcmVuWzBdLm9mZnNldFBhcmVudCA/IHRoaXMuZWwubmF0aXZlRWxlbWVudC5jaGlsZHJlblswXS5vZmZzZXRXaWR0aCA6IERvbUhhbmRsZXIuZ2V0SGlkZGVuRWxlbWVudE91dGVyV2lkdGgodGhpcy5lbC5uYXRpdmVFbGVtZW50LmNoaWxkcmVuWzBdKTtcbiAgICAgICAgY29uc3QgaXRlbU91dGVyV2lkdGggPSBEb21IYW5kbGVyLmdldE91dGVyV2lkdGgocGFyZW50SXRlbS5jaGlsZHJlblswXSk7XG5cbiAgICAgICAgaWYgKChwYXJzZUludChjb250YWluZXJPZmZzZXQubGVmdCwgMTApICsgaXRlbU91dGVyV2lkdGggKyBzdWJsaXN0V2lkdGgpID4gKHZpZXdwb3J0LndpZHRoIC0gRG9tSGFuZGxlci5jYWxjdWxhdGVTY3JvbGxiYXJXaWR0aCgpKSkge1xuICAgICAgICAgICAgdGhpcy5lbC5uYXRpdmVFbGVtZW50LmNoaWxkcmVuWzBdLnN0eWxlLmxlZnQgPSAnLTIwMCUnO1xuICAgICAgICB9XG4gICAgfVxufVxuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ3AtY2FzY2FkZVNlbGVjdCcsXG4gICAgdGVtcGxhdGU6IGBcbiAgICAgICAgPGRpdiAjY29udGFpbmVyIFtuZ0NsYXNzXT1cImNvbnRhaW5lckNsYXNzKClcIiBbY2xhc3NdPVwic3R5bGVDbGFzc1wiIFtuZ1N0eWxlXT1cInN0eWxlXCIgKGNsaWNrKT1cIm9uQ2xpY2soJGV2ZW50KVwiPlxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cInAtaGlkZGVuLWFjY2Vzc2libGVcIj5cbiAgICAgICAgICAgICAgICA8aW5wdXQgI2ZvY3VzSW5wdXQgdHlwZT1cInRleHRcIiBbYXR0ci5pZF09XCJpbnB1dElkXCIgcmVhZG9ubHkgW2Rpc2FibGVkXT1cImRpc2FibGVkXCIgKGZvY3VzKT1cIm9uRm9jdXMoKVwiIChibHVyKT1cIm9uQmx1cigpXCIgIChrZXlkb3duKT1cIm9uS2V5RG93bigkZXZlbnQpXCIgW2F0dHIudGFiaW5kZXhdPVwidGFiaW5kZXhcIlxuICAgICAgICAgICAgICAgICAgICBhcmlhLWhhc3BvcHVwPVwibGlzdGJveFwiIFthdHRyLmFyaWEtZXhwYW5kZWRdPVwib3ZlcmxheVZpc2libGVcIiBbYXR0ci5hcmlhLWxhYmVsbGVkYnldPVwiYXJpYUxhYmVsbGVkQnlcIj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPHNwYW4gW25nQ2xhc3NdPVwibGFiZWxDbGFzcygpXCI+XG4gICAgICAgICAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdJZj1cInZhbHVlVGVtcGxhdGU7ZWxzZSBkZWZhdWx0VmFsdWVUZW1wbGF0ZVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdUZW1wbGF0ZU91dGxldD1cInZhbHVlVGVtcGxhdGU7IGNvbnRleHQ6IHskaW1wbGljaXQ6IHZhbHVlLCBwbGFjZWhvbGRlcjogcGxhY2Vob2xkZXJ9XCI+PC9uZy1jb250YWluZXI+XG4gICAgICAgICAgICAgICAgPC9uZy1jb250YWluZXI+XG4gICAgICAgICAgICAgICAgPG5nLXRlbXBsYXRlICNkZWZhdWx0VmFsdWVUZW1wbGF0ZT5cbiAgICAgICAgICAgICAgICAgICAge3tsYWJlbCgpfX1cbiAgICAgICAgICAgICAgICA8L25nLXRlbXBsYXRlPlxuICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cInAtY2FzY2FkZXNlbGVjdC10cmlnZ2VyXCIgcm9sZT1cImJ1dHRvblwiIGFyaWEtaGFzcG9wdXA9XCJsaXN0Ym94XCIgW2F0dHIuYXJpYS1leHBhbmRlZF09XCJvdmVybGF5VmlzaWJsZVwiPlxuICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwicC1jYXNjYWRlc2VsZWN0LXRyaWdnZXItaWNvbiBwaSBwaS1jaGV2cm9uLWRvd25cIj48L3NwYW4+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJwLWNhc2NhZGVzZWxlY3QtcGFuZWwgcC1jb21wb25lbnRcIiAqbmdJZj1cIm92ZXJsYXlWaXNpYmxlXCIgXG4gICAgICAgICAgICAgICAgW0BvdmVybGF5QW5pbWF0aW9uXT1cInt2YWx1ZTogJ3Zpc2libGUnLCBwYXJhbXM6IHtzaG93VHJhbnNpdGlvblBhcmFtczogc2hvd1RyYW5zaXRpb25PcHRpb25zLCBoaWRlVHJhbnNpdGlvblBhcmFtczogaGlkZVRyYW5zaXRpb25PcHRpb25zfX1cIiAoQG92ZXJsYXlBbmltYXRpb24uc3RhcnQpPVwib25PdmVybGF5QW5pbWF0aW9uU3RhcnQoJGV2ZW50KVwiIChAb3ZlcmxheUFuaW1hdGlvbi5kb25lKT1cIm9uT3ZlcmxheUFuaW1hdGlvbkRvbmUoJGV2ZW50KVwiPlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJwLWNhc2NhZGVzZWxlY3QtaXRlbXMtd3JhcHBlclwiPlxuICAgICAgICAgICAgICAgICAgICA8cC1jYXNjYWRlU2VsZWN0U3ViIFtvcHRpb25zXT1cIm9wdGlvbnNcIiBbc2VsZWN0aW9uUGF0aF09XCJzZWxlY3Rpb25QYXRoXCIgY2xhc3M9XCJwLWNhc2NhZGVzZWxlY3QtaXRlbXNcIiBcbiAgICAgICAgICAgICAgICAgICAgICAgIFtvcHRpb25MYWJlbF09XCJvcHRpb25MYWJlbFwiIFtvcHRpb25WYWx1ZV09XCJvcHRpb25WYWx1ZVwiIFtsZXZlbF09XCIwXCIgW29wdGlvblRlbXBsYXRlXT1cIm9wdGlvblRlbXBsYXRlXCJcbiAgICAgICAgICAgICAgICAgICAgICAgIFtvcHRpb25Hcm91cExhYmVsXT1cIm9wdGlvbkdyb3VwTGFiZWxcIiBbb3B0aW9uR3JvdXBDaGlsZHJlbl09XCJvcHRpb25Hcm91cENoaWxkcmVuXCIgXG4gICAgICAgICAgICAgICAgICAgICAgICAob25TZWxlY3QpPVwib25PcHRpb25TZWxlY3QoJGV2ZW50KVwiIChvbkdyb3VwU2VsZWN0KT1cIm9uT3B0aW9uR3JvdXBTZWxlY3QoKVwiIFtkaXJ0eV09XCJkaXJ0eVwiIFtyb290XT1cInRydWVcIj5cbiAgICAgICAgICAgICAgICAgICAgPC9wLWNhc2NhZGVTZWxlY3RTdWI+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgYCxcbiAgICBhbmltYXRpb25zOiBbXG4gICAgICAgIHRyaWdnZXIoJ292ZXJsYXlBbmltYXRpb24nLCBbXG4gICAgICAgICAgICB0cmFuc2l0aW9uKCc6ZW50ZXInLCBbXG4gICAgICAgICAgICAgICAgc3R5bGUoe29wYWNpdHk6IDAsIHRyYW5zZm9ybTogJ3NjYWxlWSgwLjgpJ30pLFxuICAgICAgICAgICAgICAgIGFuaW1hdGUoJ3t7c2hvd1RyYW5zaXRpb25QYXJhbXN9fScpXG4gICAgICAgICAgICAgIF0pLFxuICAgICAgICAgICAgICB0cmFuc2l0aW9uKCc6bGVhdmUnLCBbXG4gICAgICAgICAgICAgICAgYW5pbWF0ZSgne3toaWRlVHJhbnNpdGlvblBhcmFtc319Jywgc3R5bGUoeyBvcGFjaXR5OiAwIH0pKVxuICAgICAgICAgICAgICBdKVxuICAgICAgICBdKVxuICAgIF0sXG4gICAgaG9zdDoge1xuICAgICAgICAnW2NsYXNzLnAtaW5wdXR3cmFwcGVyLWZpbGxlZF0nOiAnZmlsbGVkJyxcbiAgICAgICAgJ1tjbGFzcy5wLWlucHV0d3JhcHBlci1mb2N1c10nOiAnZm9jdXNlZCB8fCBvdmVybGF5VmlzaWJsZSdcbiAgICB9LFxuICAgIHByb3ZpZGVyczogW0NBU0NBREVTRUxFQ1RfVkFMVUVfQUNDRVNTT1JdLFxuICAgIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxuICAgIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmUsXG4gICAgc3R5bGVVcmxzOiBbJy4vY2FzY2FkZXNlbGVjdC5jc3MnXVxufSlcbmV4cG9ydCBjbGFzcyBDYXNjYWRlU2VsZWN0IGltcGxlbWVudHMgT25Jbml0LCBBZnRlckNvbnRlbnRJbml0LCBPbkRlc3Ryb3kge1xuXG4gICAgQElucHV0KCkgc3R5bGVDbGFzczogc3RyaW5nO1xuXG4gICAgQElucHV0KCkgc3R5bGU6IGFueTtcblxuICAgIEBJbnB1dCgpIG9wdGlvbnM6IGFueVtdO1xuXG4gICAgQElucHV0KCkgb3B0aW9uTGFiZWw6IHN0cmluZztcblxuICAgIEBJbnB1dCgpIG9wdGlvblZhbHVlOiBzdHJpbmc7XG5cbiAgICBASW5wdXQoKSBvcHRpb25Hcm91cExhYmVsOiBzdHJpbmc7XG5cbiAgICBASW5wdXQoKSBvcHRpb25Hcm91cENoaWxkcmVuOiBzdHJpbmc7XG5cbiAgICBASW5wdXQoKSBwbGFjZWhvbGRlcjogc3RyaW5nO1xuICAgIFxuICAgIEBJbnB1dCgpIHZhbHVlOiBzdHJpbmc7XG5cbiAgICBASW5wdXQoKSBkYXRhS2V5OiBzdHJpbmc7XG5cbiAgICBASW5wdXQoKSBpbnB1dElkOiBzdHJpbmc7XG5cbiAgICBASW5wdXQoKSB0YWJpbmRleDogc3RyaW5nO1xuICAgIFxuICAgIEBJbnB1dCgpIGFyaWFMYWJlbGxlZEJ5OiBzdHJpbmc7XG5cbiAgICBASW5wdXQoKSBhcHBlbmRUbzogYW55O1xuXG4gICAgQElucHV0KCkgZGlzYWJsZWQ6IGJvb2xlYW47XG5cbiAgICBASW5wdXQoKSByb3VuZGVkOiBib29sZWFuO1xuXG4gICAgQElucHV0KCkgc2hvd1RyYW5zaXRpb25PcHRpb25zOiBzdHJpbmcgPSAnLjEycyBjdWJpYy1iZXppZXIoMCwgMCwgMC4yLCAxKSc7XG5cbiAgICBASW5wdXQoKSBoaWRlVHJhbnNpdGlvbk9wdGlvbnM6IHN0cmluZyA9ICcuMXMgbGluZWFyJztcblxuICAgIEBWaWV3Q2hpbGQoJ2ZvY3VzSW5wdXQnKSBmb2N1c0lucHV0RWw6IEVsZW1lbnRSZWY7XG5cbiAgICBAVmlld0NoaWxkKCdjb250YWluZXInKSBjb250YWluZXJFbDogRWxlbWVudFJlZjtcblxuICAgIEBPdXRwdXQoKSBvbkNoYW5nZTogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgICBAT3V0cHV0KCkgb25Hcm91cENoYW5nZTogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgICBAT3V0cHV0KCkgb25TaG93OiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICAgIEBPdXRwdXQoKSBvbkhpZGU6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG4gICAgQE91dHB1dCgpIG9uQmVmb3JlU2hvdzogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgICBAT3V0cHV0KCkgb25CZWZvcmVIaWRlOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICAgIEBDb250ZW50Q2hpbGRyZW4oUHJpbWVUZW1wbGF0ZSkgdGVtcGxhdGVzOiBRdWVyeUxpc3Q8YW55PjtcblxuICAgIHNlbGVjdGlvblBhdGg6IGFueSA9IG51bGw7XG5cbiAgICBmb2N1c2VkOiBib29sZWFuID0gZmFsc2U7XG5cbiAgICBmaWxsZWQ6IGJvb2xlYW4gPSBmYWxzZTtcblxuICAgIG92ZXJsYXlWaXNpYmxlOiBib29sZWFuID0gZmFsc2U7XG5cbiAgICBkaXJ0eTogYm9vbGVhbiA9IGZhbHNlO1xuXG4gICAgdmFsdWVUZW1wbGF0ZTogVGVtcGxhdGVSZWY8YW55PjtcblxuICAgIG9wdGlvblRlbXBsYXRlOiBUZW1wbGF0ZVJlZjxhbnk+O1xuXG4gICAgb3V0c2lkZUNsaWNrTGlzdGVuZXI6IGFueTtcbiAgICBcbiAgICBzY3JvbGxIYW5kbGVyOiBhbnk7XG4gICAgXG4gICAgcmVzaXplTGlzdGVuZXI6IGFueTtcblxuICAgIG92ZXJsYXlFbDogYW55O1xuXG4gICAgb25Nb2RlbENoYW5nZTogRnVuY3Rpb24gPSAoKSA9PiB7fTtcblxuICAgIG9uTW9kZWxUb3VjaGVkOiBGdW5jdGlvbiA9ICgpID0+IHt9O1xuXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBlbDogRWxlbWVudFJlZiwgcHJpdmF0ZSBjZDogQ2hhbmdlRGV0ZWN0b3JSZWYpIHsgfVxuXG4gICAgbmdPbkluaXQoKSB7XG4gICAgICAgIHRoaXMudXBkYXRlU2VsZWN0aW9uUGF0aCgpO1xuICAgIH1cblxuICAgIG5nQWZ0ZXJDb250ZW50SW5pdCgpIHtcbiAgICAgICAgdGhpcy50ZW1wbGF0ZXMuZm9yRWFjaCgoaXRlbSkgPT4ge1xuICAgICAgICAgICAgc3dpdGNoKGl0ZW0uZ2V0VHlwZSgpKSB7XG4gICAgICAgICAgICAgICAgY2FzZSAndmFsdWUnOlxuICAgICAgICAgICAgICAgICAgICB0aGlzLnZhbHVlVGVtcGxhdGUgPSBpdGVtLnRlbXBsYXRlO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgJ29wdGlvbic6XG4gICAgICAgICAgICAgICAgICAgIHRoaXMub3B0aW9uVGVtcGxhdGUgPSBpdGVtLnRlbXBsYXRlO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBvbk9wdGlvblNlbGVjdChldmVudCkge1xuICAgICAgICB0aGlzLnZhbHVlID0gZXZlbnQudmFsdWU7XG4gICAgICAgIHRoaXMudXBkYXRlU2VsZWN0aW9uUGF0aCgpO1xuICAgICAgICB0aGlzLm9uTW9kZWxDaGFuZ2UodGhpcy52YWx1ZSk7XG4gICAgICAgIHRoaXMub25DaGFuZ2UuZW1pdChldmVudCk7XG4gICAgICAgIHRoaXMuaGlkZSgpO1xuICAgICAgICB0aGlzLmZvY3VzSW5wdXRFbC5uYXRpdmVFbGVtZW50LmZvY3VzKCk7XG4gICAgfVxuXG4gICAgb25PcHRpb25Hcm91cFNlbGVjdChldmVudCkge1xuICAgICAgICB0aGlzLmRpcnR5ID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5vbkdyb3VwQ2hhbmdlLmVtaXQoZXZlbnQpO1xuICAgIH1cblxuICAgIGdldE9wdGlvbkxhYmVsKG9wdGlvbikge1xuICAgICAgICByZXR1cm4gdGhpcy5vcHRpb25MYWJlbCA/IE9iamVjdFV0aWxzLnJlc29sdmVGaWVsZERhdGEob3B0aW9uLCB0aGlzLm9wdGlvbkxhYmVsKSA6IG9wdGlvbjtcbiAgICB9XG5cbiAgICBnZXRPcHRpb25WYWx1ZShvcHRpb24pIHtcbiAgICAgICAgcmV0dXJuIHRoaXMub3B0aW9uVmFsdWUgPyBPYmplY3RVdGlscy5yZXNvbHZlRmllbGREYXRhKG9wdGlvbiwgdGhpcy5vcHRpb25WYWx1ZSkgOiBvcHRpb247XG4gICAgfVxuXG4gICAgZ2V0T3B0aW9uR3JvdXBDaGlsZHJlbihvcHRpb25Hcm91cCwgbGV2ZWwpIHtcbiAgICAgICAgcmV0dXJuIE9iamVjdFV0aWxzLnJlc29sdmVGaWVsZERhdGEob3B0aW9uR3JvdXAsIHRoaXMub3B0aW9uR3JvdXBDaGlsZHJlbltsZXZlbF0pO1xuICAgIH1cblxuICAgIGlzT3B0aW9uR3JvdXAob3B0aW9uLCBsZXZlbCkge1xuICAgICAgICByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9wdGlvbiwgdGhpcy5vcHRpb25Hcm91cENoaWxkcmVuW2xldmVsXSk7XG4gICAgfVxuXG4gICAgdXBkYXRlU2VsZWN0aW9uUGF0aCgpIHtcbiAgICAgICAgbGV0IHBhdGg7XG4gICAgICAgIGlmICh0aGlzLnZhbHVlICE9IG51bGwgJiYgdGhpcy5vcHRpb25zKSB7XG4gICAgICAgICAgICBmb3IgKGxldCBvcHRpb24gb2YgdGhpcy5vcHRpb25zKSB7XG4gICAgICAgICAgICAgICAgcGF0aCA9IHRoaXMuZmluZE1vZGVsT3B0aW9uSW5Hcm91cChvcHRpb24sIDApO1xuICAgICAgICAgICAgICAgIGlmIChwYXRoKSB7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuc2VsZWN0aW9uUGF0aCA9IHBhdGg7ICAgXG4gICAgICAgIHRoaXMudXBkYXRlRmlsbGVkU3RhdGUoKTtcbiAgICB9XG5cbiAgICB1cGRhdGVGaWxsZWRTdGF0ZSgpIHtcbiAgICAgICAgdGhpcy5maWxsZWQgPSAhKHRoaXMuc2VsZWN0aW9uUGF0aCA9PSBudWxsIHx8IHRoaXMuc2VsZWN0aW9uUGF0aC5sZW5ndGggPT0gMCk7XG4gICAgfVxuXG4gICAgZmluZE1vZGVsT3B0aW9uSW5Hcm91cChvcHRpb24sIGxldmVsKSB7XG4gICAgICAgIGlmICh0aGlzLmlzT3B0aW9uR3JvdXAob3B0aW9uLCBsZXZlbCkpIHtcbiAgICAgICAgICAgIGxldCBzZWxlY3RlZE9wdGlvbjtcbiAgICAgICAgICAgIGZvciAobGV0IGNoaWxkT3B0aW9uIG9mIHRoaXMuZ2V0T3B0aW9uR3JvdXBDaGlsZHJlbihvcHRpb24sIGxldmVsKSkge1xuICAgICAgICAgICAgICAgIHNlbGVjdGVkT3B0aW9uID0gdGhpcy5maW5kTW9kZWxPcHRpb25Jbkdyb3VwKGNoaWxkT3B0aW9uLCBsZXZlbCArIDEpO1xuICAgICAgICAgICAgICAgIGlmIChzZWxlY3RlZE9wdGlvbikge1xuICAgICAgICAgICAgICAgICAgICBzZWxlY3RlZE9wdGlvbi51bnNoaWZ0KG9wdGlvbik7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBzZWxlY3RlZE9wdGlvbjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoKE9iamVjdFV0aWxzLmVxdWFscyh0aGlzLnZhbHVlLCB0aGlzLmdldE9wdGlvblZhbHVlKG9wdGlvbiksIHRoaXMuZGF0YUtleSkpKSB7XG4gICAgICAgICAgICByZXR1cm4gW29wdGlvbl07XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIHJldHVybiBudWxsO1xuICAgIH1cblxuICAgIHNob3coKSB7XG4gICAgICAgIHRoaXMub25CZWZvcmVTaG93LmVtaXQoKTtcbiAgICAgICAgdGhpcy5vdmVybGF5VmlzaWJsZSA9IHRydWU7XG4gICAgfVxuXG4gICAgaGlkZSgpIHtcbiAgICAgICAgdGhpcy5vbkJlZm9yZUhpZGUuZW1pdCgpO1xuICAgICAgICB0aGlzLm92ZXJsYXlWaXNpYmxlID0gZmFsc2U7XG4gICAgICAgIHRoaXMuY2QubWFya0ZvckNoZWNrKCk7XG4gICAgfVxuXG4gICAgb25DbGljayhldmVudCkge1xuICAgICAgICBpZiAodGhpcy5kaXNhYmxlZCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKCF0aGlzLm92ZXJsYXlFbCB8fCAhdGhpcy5vdmVybGF5RWwgfHwgIXRoaXMub3ZlcmxheUVsLmNvbnRhaW5zKGV2ZW50LnRhcmdldCkpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLm92ZXJsYXlWaXNpYmxlKXtcbiAgICAgICAgICAgICAgICB0aGlzLmhpZGUoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2V7XG4gICAgICAgICAgICAgICAgdGhpcy5zaG93KCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHRoaXMuZm9jdXNJbnB1dEVsLm5hdGl2ZUVsZW1lbnQuZm9jdXMoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIG9uRm9jdXMoKSB7XG4gICAgICAgIHRoaXMuZm9jdXNlZCA9IHRydWU7XG4gICAgfVxuXG4gICAgb25CbHVyKCkge1xuICAgICAgICB0aGlzLmZvY3VzZWQgPSBmYWxzZTtcbiAgICB9XG5cbiAgICBvbk92ZXJsYXlBbmltYXRpb25TdGFydChldmVudDogQW5pbWF0aW9uRXZlbnQpIHtcbiAgICAgICAgc3dpdGNoIChldmVudC50b1N0YXRlKSB7XG4gICAgICAgICAgICBjYXNlICd2aXNpYmxlJzpcbiAgICAgICAgICAgICAgICB0aGlzLm92ZXJsYXlFbCA9IGV2ZW50LmVsZW1lbnQ7XG4gICAgICAgICAgICAgICAgdGhpcy5vbk92ZXJsYXlFbnRlcigpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBvbk92ZXJsYXlBbmltYXRpb25Eb25lKGV2ZW50OiBBbmltYXRpb25FdmVudCkge1xuICAgICAgICBzd2l0Y2ggKGV2ZW50LnRvU3RhdGUpIHtcbiAgICAgICAgICAgIGNhc2UgJ3ZvaWQnOlxuICAgICAgICAgICAgICAgIHRoaXMub25PdmVybGF5TGVhdmUoKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgb25PdmVybGF5RW50ZXIoKSB7XG4gICAgICAgIHRoaXMub3ZlcmxheUVsLnN0eWxlLnpJbmRleCA9IFN0cmluZyhEb21IYW5kbGVyLmdlbmVyYXRlWkluZGV4KCkpO1xuICAgICAgICB0aGlzLmFwcGVuZENvbnRhaW5lcigpO1xuICAgICAgICB0aGlzLmFsaWduT3ZlcmxheSgpO1xuICAgICAgICB0aGlzLmJpbmRPdXRzaWRlQ2xpY2tMaXN0ZW5lcigpO1xuICAgICAgICB0aGlzLmJpbmRTY3JvbGxMaXN0ZW5lcigpO1xuICAgICAgICB0aGlzLmJpbmRSZXNpemVMaXN0ZW5lcigpO1xuICAgICAgICB0aGlzLm9uU2hvdy5lbWl0KCk7XG4gICAgfVxuXG4gICAgb25PdmVybGF5TGVhdmUoKSB7XG4gICAgICAgIHRoaXMudW5iaW5kT3V0c2lkZUNsaWNrTGlzdGVuZXIoKTtcbiAgICAgICAgdGhpcy51bmJpbmRTY3JvbGxMaXN0ZW5lcigpO1xuICAgICAgICB0aGlzLnVuYmluZFJlc2l6ZUxpc3RlbmVyKCk7XG4gICAgICAgIHRoaXMub25IaWRlLmVtaXQoKTtcbiAgICAgICAgdGhpcy5vdmVybGF5RWwgPSBudWxsO1xuICAgICAgICB0aGlzLmRpcnR5ID0gZmFsc2U7XG4gICAgfVxuXG4gICAgd3JpdGVWYWx1ZSh2YWx1ZTogYW55KSA6IHZvaWQge1xuICAgICAgICB0aGlzLnZhbHVlID0gdmFsdWU7XG4gICAgICAgIHRoaXMudXBkYXRlU2VsZWN0aW9uUGF0aCgpO1xuICAgICAgICB0aGlzLmNkLm1hcmtGb3JDaGVjaygpO1xuICAgIH1cblxuICAgIHJlZ2lzdGVyT25DaGFuZ2UoZm46IEZ1bmN0aW9uKTogdm9pZCB7XG4gICAgICAgIHRoaXMub25Nb2RlbENoYW5nZSA9IGZuO1xuICAgIH1cblxuICAgIHJlZ2lzdGVyT25Ub3VjaGVkKGZuOiBGdW5jdGlvbik6IHZvaWQge1xuICAgICAgICB0aGlzLm9uTW9kZWxUb3VjaGVkID0gZm47XG4gICAgfVxuXG4gICAgc2V0RGlzYWJsZWRTdGF0ZSh2YWw6IGJvb2xlYW4pOiB2b2lkIHtcbiAgICAgICAgdGhpcy5kaXNhYmxlZCA9IHZhbDtcbiAgICAgICAgdGhpcy5jZC5tYXJrRm9yQ2hlY2soKTtcbiAgICB9XG5cbiAgICBhbGlnbk92ZXJsYXkoKSB7XG4gICAgICAgIGlmICh0aGlzLmFwcGVuZFRvKSB7XG4gICAgICAgICAgICBEb21IYW5kbGVyLmFic29sdXRlUG9zaXRpb24odGhpcy5vdmVybGF5RWwsIHRoaXMuY29udGFpbmVyRWwubmF0aXZlRWxlbWVudCk7XG4gICAgICAgICAgICB0aGlzLm92ZXJsYXlFbC5zdHlsZS5taW5XaWR0aCA9IERvbUhhbmRsZXIuZ2V0T3V0ZXJXaWR0aCh0aGlzLmNvbnRhaW5lckVsLm5hdGl2ZUVsZW1lbnQpICsgJ3B4JztcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIERvbUhhbmRsZXIucmVsYXRpdmVQb3NpdGlvbih0aGlzLm92ZXJsYXlFbCwgdGhpcy5jb250YWluZXJFbC5uYXRpdmVFbGVtZW50KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGJpbmRPdXRzaWRlQ2xpY2tMaXN0ZW5lcigpIHtcbiAgICAgICAgaWYgKCF0aGlzLm91dHNpZGVDbGlja0xpc3RlbmVyKSB7XG4gICAgICAgICAgICB0aGlzLm91dHNpZGVDbGlja0xpc3RlbmVyID0gKGV2ZW50KSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMub3ZlcmxheVZpc2libGUgJiYgdGhpcy5vdmVybGF5RWwgJiYgIXRoaXMuY29udGFpbmVyRWwubmF0aXZlRWxlbWVudC5jb250YWlucyhldmVudC50YXJnZXQpICYmICF0aGlzLm92ZXJsYXlFbC5jb250YWlucyhldmVudC50YXJnZXQpKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaGlkZSgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHRoaXMub3V0c2lkZUNsaWNrTGlzdGVuZXIpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgdW5iaW5kT3V0c2lkZUNsaWNrTGlzdGVuZXIoKSB7XG4gICAgICAgIGlmICh0aGlzLm91dHNpZGVDbGlja0xpc3RlbmVyKSB7XG4gICAgICAgICAgICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdjbGljaycsIHRoaXMub3V0c2lkZUNsaWNrTGlzdGVuZXIpO1xuICAgICAgICAgICAgdGhpcy5vdXRzaWRlQ2xpY2tMaXN0ZW5lciA9IG51bGw7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBiaW5kU2Nyb2xsTGlzdGVuZXIoKSB7XG4gICAgICAgIGlmICghdGhpcy5zY3JvbGxIYW5kbGVyKSB7XG4gICAgICAgICAgICB0aGlzLnNjcm9sbEhhbmRsZXIgPSBuZXcgQ29ubmVjdGVkT3ZlcmxheVNjcm9sbEhhbmRsZXIodGhpcy5jb250YWluZXJFbC5uYXRpdmVFbGVtZW50LCAoKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMub3ZlcmxheVZpc2libGUpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5oaWRlKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLnNjcm9sbEhhbmRsZXIuYmluZFNjcm9sbExpc3RlbmVyKCk7XG4gICAgfVxuXG4gICAgdW5iaW5kU2Nyb2xsTGlzdGVuZXIoKSB7XG4gICAgICAgIGlmICh0aGlzLnNjcm9sbEhhbmRsZXIpIHtcbiAgICAgICAgICAgIHRoaXMuc2Nyb2xsSGFuZGxlci51bmJpbmRTY3JvbGxMaXN0ZW5lcigpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgYmluZFJlc2l6ZUxpc3RlbmVyKCkge1xuICAgICAgICBpZiAoIXRoaXMucmVzaXplTGlzdGVuZXIpIHtcbiAgICAgICAgICAgIHRoaXMucmVzaXplTGlzdGVuZXIgPSAoKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMub3ZlcmxheVZpc2libGUpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5oaWRlKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdyZXNpemUnLCB0aGlzLnJlc2l6ZUxpc3RlbmVyKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHVuYmluZFJlc2l6ZUxpc3RlbmVyKCkge1xuICAgICAgICBpZiAodGhpcy5yZXNpemVMaXN0ZW5lcikge1xuICAgICAgICAgICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsIHRoaXMucmVzaXplTGlzdGVuZXIpO1xuICAgICAgICAgICAgdGhpcy5yZXNpemVMaXN0ZW5lciA9IG51bGw7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBhcHBlbmRDb250YWluZXIoKSB7XG4gICAgICAgIGlmICh0aGlzLmFwcGVuZFRvKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5hcHBlbmRUbyA9PT0gJ2JvZHknKVxuICAgICAgICAgICAgICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQodGhpcy5vdmVybGF5RWwpO1xuICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKHRoaXMuYXBwZW5kVG8pLmFwcGVuZENoaWxkKHRoaXMub3ZlcmxheUVsKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJlc3RvcmVBcHBlbmQoKSB7XG4gICAgICAgIGlmICh0aGlzLm92ZXJsYXlFbCAmJiB0aGlzLmFwcGVuZFRvKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5hcHBlbmRUbyA9PT0gJ2JvZHknKVxuICAgICAgICAgICAgICAgIGRvY3VtZW50LmJvZHkucmVtb3ZlQ2hpbGQodGhpcy5vdmVybGF5RWwpO1xuICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKHRoaXMuYXBwZW5kVG8pLnJlbW92ZUNoaWxkKHRoaXMub3ZlcmxheUVsKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGxhYmVsKCkge1xuICAgICAgICBpZiAodGhpcy5zZWxlY3Rpb25QYXRoKVxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZ2V0T3B0aW9uTGFiZWwodGhpcy5zZWxlY3Rpb25QYXRoW3RoaXMuc2VsZWN0aW9uUGF0aC5sZW5ndGggLSAxXSk7XG4gICAgICAgIGVsc2VcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnBsYWNlaG9sZGVyfHwncC1lbXB0eWxhYmVsJztcbiAgICB9XG5cbiAgICBvbktleURvd24oZXZlbnQpIHtcbiAgICAgICAgc3dpdGNoKGV2ZW50LmtleSkge1xuICAgICAgICAgICAgY2FzZSAnRG93bic6XG4gICAgICAgICAgICBjYXNlICdBcnJvd0Rvd24nOlxuICAgICAgICAgICAgICAgIGlmICh0aGlzLm92ZXJsYXlWaXNpYmxlKSB7XG4gICAgICAgICAgICAgICAgICAgIERvbUhhbmRsZXIuZmluZFNpbmdsZSh0aGlzLm92ZXJsYXlFbCwgJy5wLWNhc2NhZGVzZWxlY3QtaXRlbScpLmNoaWxkcmVuWzBdLmZvY3VzKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2UgaWYgKGV2ZW50LmFsdEtleSAmJiB0aGlzLm9wdGlvbnMgJiYgdGhpcy5vcHRpb25zLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnNob3coKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICBjYXNlICdFc2NhcGUnOlxuICAgICAgICAgICAgICAgIGlmICh0aGlzLm92ZXJsYXlWaXNpYmxlKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaGlkZSgpO1xuICAgICAgICAgICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICBjYXNlICdUYWInOlxuICAgICAgICAgICAgICAgIHRoaXMuaGlkZSgpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBjb250YWluZXJDbGFzcygpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICdwLWNhc2NhZGVzZWxlY3QgcC1jb21wb25lbnQgcC1pbnB1dHdyYXBwZXInOiB0cnVlLFxuICAgICAgICAgICAgJ3AtZGlzYWJsZWQnOiB0aGlzLmRpc2FibGVkLFxuICAgICAgICAgICAgJ3AtZm9jdXMnOiB0aGlzLmZvY3VzZWRcbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICBsYWJlbENsYXNzKCkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgJ3AtY2FzY2FkZXNlbGVjdC1sYWJlbCc6IHRydWUsXG4gICAgICAgICAgICAncC1wbGFjZWhvbGRlcic6IHRoaXMubGFiZWwoKSA9PT0gdGhpcy5wbGFjZWhvbGRlcixcbiAgICAgICAgICAgICdwLWNhc2NhZGVzZWxlY3QtbGFiZWwtZW1wdHknOiAhdGhpcy52YWx1ZSAmJiAodGhpcy5sYWJlbCgpID09PSAncC1lbXB0eWxhYmVsJyB8fCB0aGlzLmxhYmVsKCkubGVuZ3RoID09PSAwKVxuICAgICAgICB9O1xuICAgIH1cblxuICAgIG5nT25EZXN0cm95KCkge1xuICAgICAgICB0aGlzLnJlc3RvcmVBcHBlbmQoKTtcbiAgICAgICAgdGhpcy51bmJpbmRPdXRzaWRlQ2xpY2tMaXN0ZW5lcigpO1xuICAgICAgICB0aGlzLnVuYmluZFJlc2l6ZUxpc3RlbmVyKCk7XG5cbiAgICAgICAgaWYgKHRoaXMuc2Nyb2xsSGFuZGxlcikge1xuICAgICAgICAgICAgdGhpcy5zY3JvbGxIYW5kbGVyLmRlc3Ryb3koKTtcbiAgICAgICAgICAgIHRoaXMuc2Nyb2xsSGFuZGxlciA9IG51bGw7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5vdmVybGF5RWwgPSBudWxsO1xuICAgIH1cbn1cblxuQE5nTW9kdWxlKHtcbiAgICBpbXBvcnRzOiBbQ29tbW9uTW9kdWxlLCBTaGFyZWRNb2R1bGUsIFJpcHBsZU1vZHVsZV0sXG4gICAgZXhwb3J0czogW0Nhc2NhZGVTZWxlY3QsIENhc2NhZGVTZWxlY3RTdWIsIFNoYXJlZE1vZHVsZV0sXG4gICAgZGVjbGFyYXRpb25zOiBbQ2FzY2FkZVNlbGVjdCwgQ2FzY2FkZVNlbGVjdFN1Yl1cbn0pXG5leHBvcnQgY2xhc3MgQ2FzY2FkZVNlbGVjdE1vZHVsZSB7IH1cbiJdfQ==