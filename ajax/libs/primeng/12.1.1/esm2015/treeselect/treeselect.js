import { NgModule, Component, EventEmitter, Output, Input, ChangeDetectionStrategy, ViewEncapsulation, ContentChildren, forwardRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RippleModule } from 'primeng/ripple';
import { PrimeTemplate, SharedModule, TranslationKeys } from 'primeng/api';
import { animate, style, transition, trigger } from '@angular/animations';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { ConnectedOverlayScrollHandler, DomHandler } from 'primeng/dom';
import { TreeModule } from 'primeng/tree';
import { ZIndexUtils } from 'primeng/utils';
import * as i0 from "@angular/core";
import * as i1 from "primeng/api";
import * as i2 from "primeng/tree";
import * as i3 from "@angular/common";
export const TREESELECT_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => TreeSelect),
    multi: true
};
export class TreeSelect {
    constructor(config, cd, el, overlayService) {
        this.config = config;
        this.cd = cd;
        this.el = el;
        this.overlayService = overlayService;
        this.type = "button";
        this.scrollHeight = "400px";
        this.metaKeySelection = true;
        this.display = "comma";
        this.selectionMode = "single";
        this.propagateSelectionDown = true;
        this.propagateSelectionUp = true;
        this.showTransitionOptions = '.12s cubic-bezier(0, 0, 0.2, 1)';
        this.hideTransitionOptions = '.1s linear';
        this.onNodeExpand = new EventEmitter();
        this.onNodeCollapse = new EventEmitter();
        this.onShow = new EventEmitter();
        this.onHide = new EventEmitter();
        this.onNodeUnselect = new EventEmitter();
        this.onNodeSelect = new EventEmitter();
        this.expandedNodes = [];
        this.onModelChange = () => { };
        this.onModelTouched = () => { };
    }
    get options() {
        return this._options;
    }
    ;
    set options(options) {
        this._options = options;
        this.updateTreeState();
    }
    ngOnInit() {
        this.updateTreeState();
    }
    ngAfterContentInit() {
        this.templates.forEach((item) => {
            switch (item.getType()) {
                case 'value':
                    this.valueTemplate = item.template;
                    break;
                case 'header':
                    this.headerTemplate = item.template;
                    break;
                case 'empty':
                    this.emptyTemplate = item.template;
                    break;
                case 'footer':
                    this.footerTemplate = item.template;
                    break;
                default:
                    this.valueTemplate = item.template;
                    break;
            }
        });
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
    onSelectionChange(event) {
        this.value = event;
        this.onModelChange(this.value);
        this.cd.markForCheck();
    }
    onClick(event) {
        if (!this.disabled && (!this.overlayEl || !this.overlayEl.contains(event.target)) && !DomHandler.hasClass(event.target, 'p-treeselect-close')) {
            if (this.overlayVisible) {
                this.hide();
            }
            else
                this.show();
            this.focusInput.nativeElement.focus();
        }
    }
    onKeyDown(event) {
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
            //enter and escape
            case 13:
            case 27:
                if (this.overlayVisible) {
                    this.hide();
                    event.preventDefault();
                }
                break;
            //tab
            case 9:
                this.hide();
                break;
            default:
                break;
        }
    }
    show() {
        this.overlayVisible = true;
    }
    hide() {
        this.overlayVisible = false;
        this.cd.markForCheck();
    }
    onOverlayClick(event) {
        this.overlayService.add({
            originalEvent: event,
            target: this.el.nativeElement
        });
    }
    updateTreeState() {
        if (this.value) {
            let selectedNodes = this.selectionMode === "single" ? [this.value] : [...this.value];
            this.resetExpandedNodes();
            if (selectedNodes && this.options) {
                this.updateTreeBranchState(null, null, selectedNodes);
            }
        }
    }
    updateTreeBranchState(node, path, selectedNodes) {
        if (node) {
            if (this.isSelected(node)) {
                this.expandPath(path);
                selectedNodes.splice(selectedNodes.indexOf(node), 1);
            }
            if (selectedNodes.length > 0 && node.children) {
                for (let childNode of node.children) {
                    path.push(node);
                    this.updateTreeBranchState(childNode, path, selectedNodes);
                }
            }
        }
        else {
            for (let childNode of this.options) {
                this.updateTreeBranchState(childNode, [], selectedNodes);
            }
        }
    }
    expandPath(expandedNodes) {
        for (let node of expandedNodes) {
            node.expanded = true;
        }
        this.expandedNodes = [...expandedNodes];
    }
    nodeExpand(event) {
        this.onNodeExpand.emit(event);
        this.expandedNodes.push(event.node);
    }
    nodeCollapse(event) {
        this.onNodeCollapse.emit(event);
        this.expandedNodes.splice(this.expandedNodes.indexOf(event.node), 1);
    }
    resetExpandedNodes() {
        for (let node of this.expandedNodes) {
            node.expanded = false;
        }
        this.expandedNodes = [];
    }
    findSelectedNodes(node, keys, selectedNodes) {
        if (node) {
            if (this.isSelected(node)) {
                selectedNodes.push(node);
                delete keys[node.key];
            }
            if (Object.keys(keys).length && node.children) {
                for (let childNode of node.children) {
                    this.findSelectedNodes(childNode, keys, selectedNodes);
                }
            }
        }
        else {
            for (let childNode of this.options) {
                this.findSelectedNodes(childNode, keys, selectedNodes);
            }
        }
    }
    isSelected(node) {
        return this.findIndexInSelection(node) != -1;
    }
    findIndexInSelection(node) {
        let index = -1;
        if (this.value) {
            if (this.selectionMode === "single") {
                let areNodesEqual = (this.value.key && this.value.key === node.key) || this.value == node;
                index = areNodesEqual ? 0 : -1;
            }
            else {
                for (let i = 0; i < this.value.length; i++) {
                    let selectedNode = this.value[i];
                    let areNodesEqual = (selectedNode.key && selectedNode.key === node.key) || selectedNode == node;
                    if (areNodesEqual) {
                        index = i;
                        break;
                    }
                }
            }
        }
        return index;
    }
    onSelect(node) {
        this.onNodeSelect.emit(node);
        if (this.selectionMode === 'single') {
            this.hide();
        }
    }
    onUnselect(node) {
        this.onNodeUnselect.emit(node);
    }
    onOverlayEnter() {
        ZIndexUtils.set('overlay', this.overlayEl, this.config.zIndex.overlay);
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
        ZIndexUtils.clear(this.overlayEl);
        this.overlayEl = null;
        this.onHide.emit();
    }
    onFocus() {
        this.focused = true;
    }
    onBlur() {
        this.focused = false;
    }
    writeValue(value) {
        this.value = value;
        this.updateTreeState();
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
    ngOnDestroy() {
        this.restoreAppend();
        this.unbindOutsideClickListener();
        this.unbindResizeListener();
        if (this.scrollHandler) {
            this.scrollHandler.destroy();
            this.scrollHandler = null;
        }
        if (this.overlayEl) {
            ZIndexUtils.clear(this.overlayEl);
            this.overlayEl = null;
        }
    }
    containerClass() {
        return {
            'p-treeselect p-component p-inputwrapper': true,
            'p-treeselect-chip': this.display === 'chip',
            'p-disabled': this.disabled,
            'p-focus': this.focused
        };
    }
    labelClass() {
        return {
            'p-treeselect-label': true,
            'p-placeholder': this.label === this.placeholder,
            'p-treeselect-label-empty': !this.placeholder && this.emptyValue
        };
    }
    get emptyMessageText() {
        return this.emptyMessage || this.config.getTranslation(TranslationKeys.EMPTY_MESSAGE);
    }
    get emptyValue() {
        return !this.value || Object.keys(this.value).length === 0;
    }
    get emptyOptions() {
        return !this.options || this.options.length === 0;
    }
    get label() {
        let value = this.value || [];
        return value.length ? value.map(node => node.label).join(', ') : (this.selectionMode === "single" && this.value) ? value.label : this.placeholder;
    }
}
TreeSelect.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0, type: TreeSelect, deps: [{ token: i1.PrimeNGConfig }, { token: i0.ChangeDetectorRef }, { token: i0.ElementRef }, { token: i1.OverlayService }], target: i0.ɵɵFactoryTarget.Component });
TreeSelect.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.0.5", type: TreeSelect, selector: "p-treeSelect", inputs: { type: "type", inputId: "inputId", scrollHeight: "scrollHeight", disabled: "disabled", metaKeySelection: "metaKeySelection", display: "display", selectionMode: "selectionMode", tabindex: "tabindex", ariaLabelledBy: "ariaLabelledBy", placeholder: "placeholder", panelClass: "panelClass", emptyMessage: "emptyMessage", appendTo: "appendTo", propagateSelectionDown: "propagateSelectionDown", propagateSelectionUp: "propagateSelectionUp", options: "options", showTransitionOptions: "showTransitionOptions", hideTransitionOptions: "hideTransitionOptions" }, outputs: { onNodeExpand: "onNodeExpand", onNodeCollapse: "onNodeCollapse", onShow: "onShow", onHide: "onHide", onNodeUnselect: "onNodeUnselect", onNodeSelect: "onNodeSelect" }, host: { properties: { "class.p-inputwrapper-filled": "!emptyValue", "class.p-inputwrapper-focus": "focused || overlayVisible" }, classAttribute: "p-element p-inputwrapper" }, providers: [TREESELECT_VALUE_ACCESSOR], queries: [{ propertyName: "templates", predicate: PrimeTemplate }], viewQueries: [{ propertyName: "containerEl", first: true, predicate: ["container"], descendants: true }, { propertyName: "focusInput", first: true, predicate: ["focusInput"], descendants: true }], ngImport: i0, template: `
    <div #container [ngClass]="containerClass()" (click)="onClick($event)">
        <div class="p-hidden-accessible">
            <input #focusInput type="text" role="listbox" [attr.id]="inputId" readonly [disabled]="disabled" (focus)="onFocus()" (blur)="onBlur()" (keydown)="onKeyDown($event)" [attr.tabindex]="tabindex"
            aria-haspopup="true" [attr.aria-expanded]="overlayVisible" [attr.aria-labelledby]="ariaLabelledBy"/>
        </div>
        <div class="p-treeselect-label-container">
            <div [ngClass]="labelClass()">
                <ng-container *ngIf="valueTemplate;else defaultValueTemplate">
                        <ng-container *ngTemplateOutlet="valueTemplate; context: {$implicit: value, placeholder: placeholder}"></ng-container>
                </ng-container>
                <ng-template #defaultValueTemplate>
                    <ng-container *ngIf="display === 'comma';else chipsValueTemplate">
                        {{label || 'empty'}}
                    </ng-container>
                    <ng-template #chipsValueTemplate>
                        <div *ngFor="let node of value" class="p-treeselect-token">
                            <span class="p-treeselect-token-label">{{node.label}}</span>
                        </div>
                        <ng-container *ngIf="emptyValue">{{placeholder || 'empty'}}</ng-container>
                    </ng-template>
                </ng-template>
            </div>
        </div>
        <div class="p-treeselect-trigger">
            <span class="p-treeselect-trigger-icon pi pi-chevron-down"></span>
        </div>

        <div #overlayRef class="p-treeselect-panel p-component" *ngIf="overlayVisible" (click)="onOverlayClick($event)"
            [@overlayAnimation]="{value: 'visible', params: {showTransitionParams: showTransitionOptions, hideTransitionParams: hideTransitionOptions}}" (@overlayAnimation.start)="onOverlayAnimationStart($event)" (@overlayAnimation.done)="onOverlayAnimationDone($event)">
            <ng-container *ngTemplateOutlet="headerTemplate; context: {$implicit: value, options: options}"></ng-container>
            <div class="p-treeselect-items-wrapper" [ngStyle]="{'max-height': scrollHeight}">
                <p-tree [value]="options" [propagateSelectionDown]="propagateSelectionDown" [propagateSelectionUp]="propagateSelectionUp" [selectionMode]="selectionMode" (selectionChange)="onSelectionChange($event)" [selection]="value"
                    [metaKeySelection]="metaKeySelection" (onNodeExpand)="nodeExpand($event)" (onNodeCollapse)="nodeCollapse($event)"
                    (onNodeSelect)="onSelect($event)" (onNodeUnselect)="onUnselect($event)"></p-tree>
                <div *ngIf="emptyOptions" class="p-treeselect-empty-message">
                    <ng-container *ngIf="!emptyTemplate; else empty">
                        {{emptyMessageText}}
                    </ng-container>
                    <ng-container *ngTemplateOutlet="emptyTemplate;"></ng-container>
                </div>
            </div>
            <ng-container *ngTemplateOutlet="footerTemplate; context: {$implicit: value, options: options}"></ng-container>
        </div>
    </div>
    `, isInline: true, styles: [".p-treeselect{display:inline-flex;cursor:pointer;position:relative;-webkit-user-select:none;-ms-user-select:none;user-select:none}.p-treeselect-trigger{display:flex;align-items:center;justify-content:center;flex-shrink:0}.p-treeselect-label-container{overflow:hidden;flex:1 1 auto;cursor:pointer}.p-treeselect-label{display:block;white-space:nowrap;cursor:pointer;overflow:hidden;text-overflow:ellipsis}.p-treeselect-label-empty{overflow:hidden;visibility:hidden}.p-treeselect-token{cursor:default;display:inline-flex;align-items:center;flex:0 0 auto}.p-treeselect .p-treeselect-panel{min-width:100%}.p-treeselect-panel{position:absolute;top:0;left:0}.p-treeselect-items-wrapper{overflow:auto}.p-fluid .p-treeselect{display:flex}"], components: [{ type: i2.Tree, selector: "p-tree", inputs: ["value", "selectionMode", "selection", "style", "styleClass", "contextMenu", "layout", "draggableScope", "droppableScope", "draggableNodes", "droppableNodes", "metaKeySelection", "propagateSelectionUp", "propagateSelectionDown", "loading", "loadingIcon", "emptyMessage", "ariaLabel", "ariaLabelledBy", "validateDrop", "filter", "filterBy", "filterMode", "filterPlaceholder", "filterLocale", "scrollHeight", "virtualScroll", "virtualNodeHeight", "minBufferPx", "maxBufferPx", "indentation", "trackBy"], outputs: ["selectionChange", "onNodeSelect", "onNodeUnselect", "onNodeExpand", "onNodeCollapse", "onNodeContextMenuSelect", "onNodeDrop", "onFilter"] }], directives: [{ type: i3.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { type: i3.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i3.NgTemplateOutlet, selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet"] }, { type: i3.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { type: i3.NgStyle, selector: "[ngStyle]", inputs: ["ngStyle"] }], animations: [
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
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0, type: TreeSelect, decorators: [{
            type: Component,
            args: [{
                    selector: 'p-treeSelect',
                    template: `
    <div #container [ngClass]="containerClass()" (click)="onClick($event)">
        <div class="p-hidden-accessible">
            <input #focusInput type="text" role="listbox" [attr.id]="inputId" readonly [disabled]="disabled" (focus)="onFocus()" (blur)="onBlur()" (keydown)="onKeyDown($event)" [attr.tabindex]="tabindex"
            aria-haspopup="true" [attr.aria-expanded]="overlayVisible" [attr.aria-labelledby]="ariaLabelledBy"/>
        </div>
        <div class="p-treeselect-label-container">
            <div [ngClass]="labelClass()">
                <ng-container *ngIf="valueTemplate;else defaultValueTemplate">
                        <ng-container *ngTemplateOutlet="valueTemplate; context: {$implicit: value, placeholder: placeholder}"></ng-container>
                </ng-container>
                <ng-template #defaultValueTemplate>
                    <ng-container *ngIf="display === 'comma';else chipsValueTemplate">
                        {{label || 'empty'}}
                    </ng-container>
                    <ng-template #chipsValueTemplate>
                        <div *ngFor="let node of value" class="p-treeselect-token">
                            <span class="p-treeselect-token-label">{{node.label}}</span>
                        </div>
                        <ng-container *ngIf="emptyValue">{{placeholder || 'empty'}}</ng-container>
                    </ng-template>
                </ng-template>
            </div>
        </div>
        <div class="p-treeselect-trigger">
            <span class="p-treeselect-trigger-icon pi pi-chevron-down"></span>
        </div>

        <div #overlayRef class="p-treeselect-panel p-component" *ngIf="overlayVisible" (click)="onOverlayClick($event)"
            [@overlayAnimation]="{value: 'visible', params: {showTransitionParams: showTransitionOptions, hideTransitionParams: hideTransitionOptions}}" (@overlayAnimation.start)="onOverlayAnimationStart($event)" (@overlayAnimation.done)="onOverlayAnimationDone($event)">
            <ng-container *ngTemplateOutlet="headerTemplate; context: {$implicit: value, options: options}"></ng-container>
            <div class="p-treeselect-items-wrapper" [ngStyle]="{'max-height': scrollHeight}">
                <p-tree [value]="options" [propagateSelectionDown]="propagateSelectionDown" [propagateSelectionUp]="propagateSelectionUp" [selectionMode]="selectionMode" (selectionChange)="onSelectionChange($event)" [selection]="value"
                    [metaKeySelection]="metaKeySelection" (onNodeExpand)="nodeExpand($event)" (onNodeCollapse)="nodeCollapse($event)"
                    (onNodeSelect)="onSelect($event)" (onNodeUnselect)="onUnselect($event)"></p-tree>
                <div *ngIf="emptyOptions" class="p-treeselect-empty-message">
                    <ng-container *ngIf="!emptyTemplate; else empty">
                        {{emptyMessageText}}
                    </ng-container>
                    <ng-container *ngTemplateOutlet="emptyTemplate;"></ng-container>
                </div>
            </div>
            <ng-container *ngTemplateOutlet="footerTemplate; context: {$implicit: value, options: options}"></ng-container>
        </div>
    </div>
    `,
                    styleUrls: ['./treeselect.css'],
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
                        '[class.p-inputwrapper-filled]': '!emptyValue',
                        '[class.p-inputwrapper-focus]': 'focused || overlayVisible'
                    },
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    providers: [TREESELECT_VALUE_ACCESSOR],
                    encapsulation: ViewEncapsulation.None
                }]
        }], ctorParameters: function () { return [{ type: i1.PrimeNGConfig }, { type: i0.ChangeDetectorRef }, { type: i0.ElementRef }, { type: i1.OverlayService }]; }, propDecorators: { type: [{
                type: Input
            }], inputId: [{
                type: Input
            }], scrollHeight: [{
                type: Input
            }], disabled: [{
                type: Input
            }], metaKeySelection: [{
                type: Input
            }], display: [{
                type: Input
            }], selectionMode: [{
                type: Input
            }], tabindex: [{
                type: Input
            }], ariaLabelledBy: [{
                type: Input
            }], placeholder: [{
                type: Input
            }], panelClass: [{
                type: Input
            }], emptyMessage: [{
                type: Input
            }], appendTo: [{
                type: Input
            }], propagateSelectionDown: [{
                type: Input
            }], propagateSelectionUp: [{
                type: Input
            }], options: [{
                type: Input
            }], showTransitionOptions: [{
                type: Input
            }], hideTransitionOptions: [{
                type: Input
            }], templates: [{
                type: ContentChildren,
                args: [PrimeTemplate]
            }], containerEl: [{
                type: ViewChild,
                args: ['container']
            }], focusInput: [{
                type: ViewChild,
                args: ['focusInput']
            }], onNodeExpand: [{
                type: Output
            }], onNodeCollapse: [{
                type: Output
            }], onShow: [{
                type: Output
            }], onHide: [{
                type: Output
            }], onNodeUnselect: [{
                type: Output
            }], onNodeSelect: [{
                type: Output
            }] } });
export class TreeSelectModule {
}
TreeSelectModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0, type: TreeSelectModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
TreeSelectModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0, type: TreeSelectModule, declarations: [TreeSelect], imports: [CommonModule, RippleModule, SharedModule, TreeModule], exports: [TreeSelect, SharedModule, TreeModule] });
TreeSelectModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0, type: TreeSelectModule, imports: [[CommonModule, RippleModule, SharedModule, TreeModule], SharedModule, TreeModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0, type: TreeSelectModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule, RippleModule, SharedModule, TreeModule],
                    exports: [TreeSelect, SharedModule, TreeModule],
                    declarations: [TreeSelect]
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJlZXNlbGVjdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9hcHAvY29tcG9uZW50cy90cmVlc2VsZWN0L3RyZWVzZWxlY3QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFDLFFBQVEsRUFBQyxTQUFTLEVBQUMsWUFBWSxFQUFDLE1BQU0sRUFBQyxLQUFLLEVBQUMsdUJBQXVCLEVBQUUsaUJBQWlCLEVBQUUsZUFBZSxFQUE0QyxVQUFVLEVBQXFCLFNBQVMsRUFBYSxNQUFNLGVBQWUsQ0FBQztBQUN2TyxPQUFPLEVBQUMsWUFBWSxFQUFDLE1BQU0saUJBQWlCLENBQUM7QUFDN0MsT0FBTyxFQUFDLFlBQVksRUFBQyxNQUFNLGdCQUFnQixDQUFDO0FBQzVDLE9BQU8sRUFBZ0MsYUFBYSxFQUFFLFlBQVksRUFBRSxlQUFlLEVBQVcsTUFBTSxhQUFhLENBQUM7QUFDbEgsT0FBTyxFQUFDLE9BQU8sRUFBRSxLQUFLLEVBQUUsVUFBVSxFQUFFLE9BQU8sRUFBaUIsTUFBTSxxQkFBcUIsQ0FBQztBQUN4RixPQUFPLEVBQUMsaUJBQWlCLEVBQUMsTUFBTSxnQkFBZ0IsQ0FBQztBQUNqRCxPQUFPLEVBQUMsNkJBQTZCLEVBQUUsVUFBVSxFQUFDLE1BQU0sYUFBYSxDQUFDO0FBQ3RFLE9BQU8sRUFBQyxVQUFVLEVBQUMsTUFBTSxjQUFjLENBQUM7QUFDeEMsT0FBTyxFQUFDLFdBQVcsRUFBQyxNQUFNLGVBQWUsQ0FBQTs7Ozs7QUFHekMsTUFBTSxDQUFDLE1BQU0seUJBQXlCLEdBQVE7SUFDMUMsT0FBTyxFQUFFLGlCQUFpQjtJQUMxQixXQUFXLEVBQUUsVUFBVSxDQUFDLEdBQUcsRUFBRSxDQUFDLFVBQVUsQ0FBQztJQUN6QyxLQUFLLEVBQUUsSUFBSTtDQUNkLENBQUM7QUF1RUYsTUFBTSxPQUFPLFVBQVU7SUE4Rm5CLFlBQW1CLE1BQXFCLEVBQVMsRUFBcUIsRUFBUyxFQUFjLEVBQVMsY0FBOEI7UUFBakgs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TUFBTTtnQkFFRyxjQUFjO3NCQUF2QixNQUFNO2dCQUVHLE1BQU07c0JBQWYsTUFBTTtnQkFFRyxNQUFNO3NCQUFmLE1BQU07Z0JBRUcsY0FBYztzQkFBdkIsTUFBTTtnQkFFRyxZQUFZO3NCQUFyQixNQUFNOztBQXFjWCxNQUFNLE9BQU8sZ0JBQWdCOzs2R0FBaEIsZ0JBQWdCOzhHQUFoQixnQkFBZ0IsaUJBamdCaEIsVUFBVSxhQTZmVCxZQUFZLEVBQUMsWUFBWSxFQUFDLFlBQVksRUFBQyxVQUFVLGFBN2ZsRCxVQUFVLEVBOGZFLFlBQVksRUFBQyxVQUFVOzhHQUduQyxnQkFBZ0IsWUFKaEIsQ0FBQyxZQUFZLEVBQUMsWUFBWSxFQUFDLFlBQVksRUFBQyxVQUFVLENBQUMsRUFDdkMsWUFBWSxFQUFDLFVBQVU7MkZBR25DLGdCQUFnQjtrQkFMNUIsUUFBUTttQkFBQztvQkFDTixPQUFPLEVBQUUsQ0FBQyxZQUFZLEVBQUMsWUFBWSxFQUFDLFlBQVksRUFBQyxVQUFVLENBQUM7b0JBQzVELE9BQU8sRUFBRSxDQUFDLFVBQVUsRUFBQyxZQUFZLEVBQUMsVUFBVSxDQUFDO29CQUM3QyxZQUFZLEVBQUUsQ0FBQyxVQUFVLENBQUM7aUJBQzdCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtOZ01vZHVsZSxDb21wb25lbnQsRXZlbnRFbWl0dGVyLE91dHB1dCxJbnB1dCxDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSwgVmlld0VuY2Fwc3VsYXRpb24sIENvbnRlbnRDaGlsZHJlbiwgQWZ0ZXJDb250ZW50SW5pdCwgVGVtcGxhdGVSZWYsIFF1ZXJ5TGlzdCwgZm9yd2FyZFJlZiwgQ2hhbmdlRGV0ZWN0b3JSZWYsIFZpZXdDaGlsZCwgRWxlbWVudFJlZn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge0NvbW1vbk1vZHVsZX0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7UmlwcGxlTW9kdWxlfSBmcm9tICdwcmltZW5nL3JpcHBsZSc7XG5pbXBvcnQge092ZXJsYXlTZXJ2aWNlLCBQcmltZU5HQ29uZmlnLCBQcmltZVRlbXBsYXRlLCBTaGFyZWRNb2R1bGUsIFRyYW5zbGF0aW9uS2V5cywgVHJlZU5vZGV9IGZyb20gJ3ByaW1lbmcvYXBpJztcbmltcG9ydCB7YW5pbWF0ZSwgc3R5bGUsIHRyYW5zaXRpb24sIHRyaWdnZXIsIEFuaW1hdGlvbkV2ZW50fSBmcm9tICdAYW5ndWxhci9hbmltYXRpb25zJztcbmltcG9ydCB7TkdfVkFMVUVfQUNDRVNTT1J9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7Q29ubmVjdGVkT3ZlcmxheVNjcm9sbEhhbmRsZXIsIERvbUhhbmRsZXJ9IGZyb20gJ3ByaW1lbmcvZG9tJztcbmltcG9ydCB7VHJlZU1vZHVsZX0gZnJvbSAncHJpbWVuZy90cmVlJztcbmltcG9ydCB7WkluZGV4VXRpbHN9IGZyb20gJ3ByaW1lbmcvdXRpbHMnXG5cblxuZXhwb3J0IGNvbnN0IFRSRUVTRUxFQ1RfVkFMVUVfQUNDRVNTT1I6IGFueSA9IHtcbiAgICBwcm92aWRlOiBOR19WQUxVRV9BQ0NFU1NPUixcbiAgICB1c2VFeGlzdGluZzogZm9yd2FyZFJlZigoKSA9PiBUcmVlU2VsZWN0KSxcbiAgICBtdWx0aTogdHJ1ZVxufTtcblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICdwLXRyZWVTZWxlY3QnLFxuICAgIHRlbXBsYXRlOiBgXG4gICAgPGRpdiAjY29udGFpbmVyIFtuZ0NsYXNzXT1cImNvbnRhaW5lckNsYXNzKClcIiAoY2xpY2spPVwib25DbGljaygkZXZlbnQpXCI+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJwLWhpZGRlbi1hY2Nlc3NpYmxlXCI+XG4gICAgICAgICAgICA8aW5wdXQgI2ZvY3VzSW5wdXQgdHlwZT1cInRleHRcIiByb2xlPVwibGlzdGJveFwiIFthdHRyLmlkXT1cImlucHV0SWRcIiByZWFkb25seSBbZGlzYWJsZWRdPVwiZGlzYWJsZWRcIiAoZm9jdXMpPVwib25Gb2N1cygpXCIgKGJsdXIpPVwib25CbHVyKClcIiAoa2V5ZG93bik9XCJvbktleURvd24oJGV2ZW50KVwiIFthdHRyLnRhYmluZGV4XT1cInRhYmluZGV4XCJcbiAgICAgICAgICAgIGFyaWEtaGFzcG9wdXA9XCJ0cnVlXCIgW2F0dHIuYXJpYS1leHBhbmRlZF09XCJvdmVybGF5VmlzaWJsZVwiIFthdHRyLmFyaWEtbGFiZWxsZWRieV09XCJhcmlhTGFiZWxsZWRCeVwiLz5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJwLXRyZWVzZWxlY3QtbGFiZWwtY29udGFpbmVyXCI+XG4gICAgICAgICAgICA8ZGl2IFtuZ0NsYXNzXT1cImxhYmVsQ2xhc3MoKVwiPlxuICAgICAgICAgICAgICAgIDxuZy1jb250YWluZXIgKm5nSWY9XCJ2YWx1ZVRlbXBsYXRlO2Vsc2UgZGVmYXVsdFZhbHVlVGVtcGxhdGVcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxuZy1jb250YWluZXIgKm5nVGVtcGxhdGVPdXRsZXQ9XCJ2YWx1ZVRlbXBsYXRlOyBjb250ZXh0OiB7JGltcGxpY2l0OiB2YWx1ZSwgcGxhY2Vob2xkZXI6IHBsYWNlaG9sZGVyfVwiPjwvbmctY29udGFpbmVyPlxuICAgICAgICAgICAgICAgIDwvbmctY29udGFpbmVyPlxuICAgICAgICAgICAgICAgIDxuZy10ZW1wbGF0ZSAjZGVmYXVsdFZhbHVlVGVtcGxhdGU+XG4gICAgICAgICAgICAgICAgICAgIDxuZy1jb250YWluZXIgKm5nSWY9XCJkaXNwbGF5ID09PSAnY29tbWEnO2Vsc2UgY2hpcHNWYWx1ZVRlbXBsYXRlXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICB7e2xhYmVsIHx8ICdlbXB0eSd9fVxuICAgICAgICAgICAgICAgICAgICA8L25nLWNvbnRhaW5lcj5cbiAgICAgICAgICAgICAgICAgICAgPG5nLXRlbXBsYXRlICNjaGlwc1ZhbHVlVGVtcGxhdGU+XG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2ICpuZ0Zvcj1cImxldCBub2RlIG9mIHZhbHVlXCIgY2xhc3M9XCJwLXRyZWVzZWxlY3QtdG9rZW5cIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cInAtdHJlZXNlbGVjdC10b2tlbi1sYWJlbFwiPnt7bm9kZS5sYWJlbH19PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICA8bmctY29udGFpbmVyICpuZ0lmPVwiZW1wdHlWYWx1ZVwiPnt7cGxhY2Vob2xkZXIgfHwgJ2VtcHR5J319PC9uZy1jb250YWluZXI+XG4gICAgICAgICAgICAgICAgICAgIDwvbmctdGVtcGxhdGU+XG4gICAgICAgICAgICAgICAgPC9uZy10ZW1wbGF0ZT5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPGRpdiBjbGFzcz1cInAtdHJlZXNlbGVjdC10cmlnZ2VyXCI+XG4gICAgICAgICAgICA8c3BhbiBjbGFzcz1cInAtdHJlZXNlbGVjdC10cmlnZ2VyLWljb24gcGkgcGktY2hldnJvbi1kb3duXCI+PC9zcGFuPlxuICAgICAgICA8L2Rpdj5cblxuICAgICAgICA8ZGl2ICNvdmVybGF5UmVmIGNsYXNzPVwicC10cmVlc2VsZWN0LXBhbmVsIHAtY29tcG9uZW50XCIgKm5nSWY9XCJvdmVybGF5VmlzaWJsZVwiIChjbGljayk9XCJvbk92ZXJsYXlDbGljaygkZXZlbnQpXCJcbiAgICAgICAgICAgIFtAb3ZlcmxheUFuaW1hdGlvbl09XCJ7dmFsdWU6ICd2aXNpYmxlJywgcGFyYW1zOiB7c2hvd1RyYW5zaXRpb25QYXJhbXM6IHNob3dUcmFuc2l0aW9uT3B0aW9ucywgaGlkZVRyYW5zaXRpb25QYXJhbXM6IGhpZGVUcmFuc2l0aW9uT3B0aW9uc319XCIgKEBvdmVybGF5QW5pbWF0aW9uLnN0YXJ0KT1cIm9uT3ZlcmxheUFuaW1hdGlvblN0YXJ0KCRldmVudClcIiAoQG92ZXJsYXlBbmltYXRpb24uZG9uZSk9XCJvbk92ZXJsYXlBbmltYXRpb25Eb25lKCRldmVudClcIj5cbiAgICAgICAgICAgIDxuZy1jb250YWluZXIgKm5nVGVtcGxhdGVPdXRsZXQ9XCJoZWFkZXJUZW1wbGF0ZTsgY29udGV4dDogeyRpbXBsaWNpdDogdmFsdWUsIG9wdGlvbnM6IG9wdGlvbnN9XCI+PC9uZy1jb250YWluZXI+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwicC10cmVlc2VsZWN0LWl0ZW1zLXdyYXBwZXJcIiBbbmdTdHlsZV09XCJ7J21heC1oZWlnaHQnOiBzY3JvbGxIZWlnaHR9XCI+XG4gICAgICAgICAgICAgICAgPHAtdHJlZSBbdmFsdWVdPVwib3B0aW9uc1wiIFtwcm9wYWdhdGVTZWxlY3Rpb25Eb3duXT1cInByb3BhZ2F0ZVNlbGVjdGlvbkRvd25cIiBbcHJvcGFnYXRlU2VsZWN0aW9uVXBdPVwicHJvcGFnYXRlU2VsZWN0aW9uVXBcIiBbc2VsZWN0aW9uTW9kZV09XCJzZWxlY3Rpb25Nb2RlXCIgKHNlbGVjdGlvbkNoYW5nZSk9XCJvblNlbGVjdGlvbkNoYW5nZSgkZXZlbnQpXCIgW3NlbGVjdGlvbl09XCJ2YWx1ZVwiXG4gICAgICAgICAgICAgICAgICAgIFttZXRhS2V5U2VsZWN0aW9uXT1cIm1ldGFLZXlTZWxlY3Rpb25cIiAob25Ob2RlRXhwYW5kKT1cIm5vZGVFeHBhbmQoJGV2ZW50KVwiIChvbk5vZGVDb2xsYXBzZSk9XCJub2RlQ29sbGFwc2UoJGV2ZW50KVwiXG4gICAgICAgICAgICAgICAgICAgIChvbk5vZGVTZWxlY3QpPVwib25TZWxlY3QoJGV2ZW50KVwiIChvbk5vZGVVbnNlbGVjdCk9XCJvblVuc2VsZWN0KCRldmVudClcIj48L3AtdHJlZT5cbiAgICAgICAgICAgICAgICA8ZGl2ICpuZ0lmPVwiZW1wdHlPcHRpb25zXCIgY2xhc3M9XCJwLXRyZWVzZWxlY3QtZW1wdHktbWVzc2FnZVwiPlxuICAgICAgICAgICAgICAgICAgICA8bmctY29udGFpbmVyICpuZ0lmPVwiIWVtcHR5VGVtcGxhdGU7IGVsc2UgZW1wdHlcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIHt7ZW1wdHlNZXNzYWdlVGV4dH19XG4gICAgICAgICAgICAgICAgICAgIDwvbmctY29udGFpbmVyPlxuICAgICAgICAgICAgICAgICAgICA8bmctY29udGFpbmVyICpuZ1RlbXBsYXRlT3V0bGV0PVwiZW1wdHlUZW1wbGF0ZTtcIj48L25nLWNvbnRhaW5lcj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdUZW1wbGF0ZU91dGxldD1cImZvb3RlclRlbXBsYXRlOyBjb250ZXh0OiB7JGltcGxpY2l0OiB2YWx1ZSwgb3B0aW9uczogb3B0aW9uc31cIj48L25nLWNvbnRhaW5lcj5cbiAgICAgICAgPC9kaXY+XG4gICAgPC9kaXY+XG4gICAgYCxcbiAgICBzdHlsZVVybHM6IFsnLi90cmVlc2VsZWN0LmNzcyddLFxuICAgIGFuaW1hdGlvbnM6IFtcbiAgICAgICAgdHJpZ2dlcignb3ZlcmxheUFuaW1hdGlvbicsIFtcbiAgICAgICAgICAgIHRyYW5zaXRpb24oJzplbnRlcicsIFtcbiAgICAgICAgICAgICAgICBzdHlsZSh7b3BhY2l0eTogMCwgdHJhbnNmb3JtOiAnc2NhbGVZKDAuOCknfSksXG4gICAgICAgICAgICAgICAgYW5pbWF0ZSgne3tzaG93VHJhbnNpdGlvblBhcmFtc319JylcbiAgICAgICAgICAgICAgXSksXG4gICAgICAgICAgICAgIHRyYW5zaXRpb24oJzpsZWF2ZScsIFtcbiAgICAgICAgICAgICAgICBhbmltYXRlKCd7e2hpZGVUcmFuc2l0aW9uUGFyYW1zfX0nLCBzdHlsZSh7IG9wYWNpdHk6IDAgfSkpXG4gICAgICAgICAgICAgIF0pXG4gICAgICAgIF0pXG4gICAgXSxcbiAgICBob3N0OiB7XG4gICAgICAgICdjbGFzcyc6ICdwLWVsZW1lbnQgcC1pbnB1dHdyYXBwZXInLFxuICAgICAgICAnW2NsYXNzLnAtaW5wdXR3cmFwcGVyLWZpbGxlZF0nOiAnIWVtcHR5VmFsdWUnLFxuICAgICAgICAnW2NsYXNzLnAtaW5wdXR3cmFwcGVyLWZvY3VzXSc6ICdmb2N1c2VkIHx8IG92ZXJsYXlWaXNpYmxlJ1xuICAgIH0sXG4gICAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG4gICAgcHJvdmlkZXJzOiBbVFJFRVNFTEVDVF9WQUxVRV9BQ0NFU1NPUl0sXG4gICAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZVxufSlcbmV4cG9ydCBjbGFzcyBUcmVlU2VsZWN0IGltcGxlbWVudHMgQWZ0ZXJDb250ZW50SW5pdCB7XG5cbiAgICBASW5wdXQoKSB0eXBlOiBzdHJpbmcgPSBcImJ1dHRvblwiO1xuXG4gICAgQElucHV0KCkgaW5wdXRJZDogc3RyaW5nO1xuXG4gICAgQElucHV0KCkgc2Nyb2xsSGVpZ2h0OiBzdHJpbmcgPSBcIjQwMHB4XCI7XG5cbiAgICBASW5wdXQoKSBkaXNhYmxlZDogYm9vbGVhbjtcblxuICAgIEBJbnB1dCgpIG1ldGFLZXlTZWxlY3Rpb246IGJvb2xlYW4gPSB0cnVlO1xuXG4gICAgQElucHV0KCkgZGlzcGxheTogc3RyaW5nID0gXCJjb21tYVwiO1xuXG4gICAgQElucHV0KCkgc2VsZWN0aW9uTW9kZTogc3RyaW5nID0gXCJzaW5nbGVcIjtcblxuICAgIEBJbnB1dCgpIHRhYmluZGV4OiBzdHJpbmc7XG5cbiAgICBASW5wdXQoKSBhcmlhTGFiZWxsZWRCeTogc3RyaW5nO1xuXG4gICAgQElucHV0KCkgcGxhY2Vob2xkZXI6IHN0cmluZztcblxuICAgIEBJbnB1dCgpIHBhbmVsQ2xhc3M6IHN0cmluZztcblxuICAgIEBJbnB1dCgpIGVtcHR5TWVzc2FnZTogc3RyaW5nO1xuXG4gICAgQElucHV0KCkgYXBwZW5kVG86IGFueTtcblxuICAgIEBJbnB1dCgpIHByb3BhZ2F0ZVNlbGVjdGlvbkRvd246IGJvb2xlYW4gPSB0cnVlO1xuXG4gICAgQElucHV0KCkgcHJvcGFnYXRlU2VsZWN0aW9uVXA6IGJvb2xlYW4gPSB0cnVlO1xuXG4gICAgQElucHV0KCkgZ2V0IG9wdGlvbnMoKTogYW55W10ge1xuICAgICAgICByZXR1cm4gdGhpcy5fb3B0aW9ucztcbiAgICB9O1xuICAgIHNldCBvcHRpb25zKG9wdGlvbnMpIHtcbiAgICAgICAgdGhpcy5fb3B0aW9ucyA9IG9wdGlvbnM7XG4gICAgICAgIHRoaXMudXBkYXRlVHJlZVN0YXRlKCk7XG4gICAgfVxuXG4gICAgQElucHV0KCkgc2hvd1RyYW5zaXRpb25PcHRpb25zOiBzdHJpbmcgPSAnLjEycyBjdWJpYy1iZXppZXIoMCwgMCwgMC4yLCAxKSc7XG5cbiAgICBASW5wdXQoKSBoaWRlVHJhbnNpdGlvbk9wdGlvbnM6IHN0cmluZyA9ICcuMXMgbGluZWFyJztcblxuICAgIEBDb250ZW50Q2hpbGRyZW4oUHJpbWVUZW1wbGF0ZSkgdGVtcGxhdGVzOiBRdWVyeUxpc3Q8YW55PjtcblxuICAgIEBWaWV3Q2hpbGQoJ2NvbnRhaW5lcicpIGNvbnRhaW5lckVsOiBFbGVtZW50UmVmO1xuXG4gICAgQFZpZXdDaGlsZCgnZm9jdXNJbnB1dCcpIGZvY3VzSW5wdXQ6IEVsZW1lbnRSZWY7XG5cbiAgICBAT3V0cHV0KCkgb25Ob2RlRXhwYW5kOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICAgIEBPdXRwdXQoKSBvbk5vZGVDb2xsYXBzZTogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgICBAT3V0cHV0KCkgb25TaG93OiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICAgIEBPdXRwdXQoKSBvbkhpZGU6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG4gICAgQE91dHB1dCgpIG9uTm9kZVVuc2VsZWN0OiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICAgIEBPdXRwdXQoKSBvbk5vZGVTZWxlY3Q6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG4gICAgdmFsdWVUZW1wbGF0ZTogVGVtcGxhdGVSZWY8YW55PjtcblxuICAgIGhlYWRlclRlbXBsYXRlOiBUZW1wbGF0ZVJlZjxhbnk+O1xuXG4gICAgZW1wdHlUZW1wbGF0ZTogVGVtcGxhdGVSZWY8YW55PjtcblxuICAgIGZvb3RlclRlbXBsYXRlOiBUZW1wbGF0ZVJlZjxhbnk+O1xuXG4gICAgZm9jdXNlZDogYm9vbGVhbjtcblxuICAgIG92ZXJsYXlWaXNpYmxlOiBib29sZWFuO1xuXG4gICAgc2VsZkNoYW5nZTogYm9vbGVhbjtcblxuICAgIHZhbHVlO1xuXG4gICAgZXhwYW5kZWROb2RlczogYW55W10gPSBbXTtcblxuICAgIF9vcHRpb25zOiBhbnlbXTtcblxuICAgIG91dHNpZGVDbGlja0xpc3RlbmVyOiBhbnk7XG5cbiAgICBzY3JvbGxIYW5kbGVyOiBhbnk7XG5cbiAgICByZXNpemVMaXN0ZW5lcjogYW55O1xuXG4gICAgb3ZlcmxheUVsOiBhbnk7XG5cbiAgICBvbk1vZGVsQ2hhbmdlOiBGdW5jdGlvbiA9ICgpID0+IHt9O1xuXG4gICAgb25Nb2RlbFRvdWNoZWQ6IEZ1bmN0aW9uID0gKCkgPT4ge307XG5cbiAgICBjb25zdHJ1Y3RvcihwdWJsaWMgY29uZmlnOiBQcmltZU5HQ29uZmlnLCBwdWJsaWMgY2Q6IENoYW5nZURldGVjdG9yUmVmLCBwdWJsaWMgZWw6IEVsZW1lbnRSZWYsIHB1YmxpYyBvdmVybGF5U2VydmljZTogT3ZlcmxheVNlcnZpY2UpIHsgfVxuXG4gICAgbmdPbkluaXQoKSB7XG4gICAgICAgIHRoaXMudXBkYXRlVHJlZVN0YXRlKCk7XG4gICAgfVxuXG4gICAgbmdBZnRlckNvbnRlbnRJbml0KCkge1xuICAgICAgICB0aGlzLnRlbXBsYXRlcy5mb3JFYWNoKChpdGVtKSA9PiB7XG4gICAgICAgICAgICBzd2l0Y2goaXRlbS5nZXRUeXBlKCkpIHtcbiAgICAgICAgICAgICAgICBjYXNlICd2YWx1ZSc6XG4gICAgICAgICAgICAgICAgICAgIHRoaXMudmFsdWVUZW1wbGF0ZSA9IGl0ZW0udGVtcGxhdGU7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgICAgICBjYXNlICdoZWFkZXInOlxuICAgICAgICAgICAgICAgICAgICB0aGlzLmhlYWRlclRlbXBsYXRlID0gaXRlbS50ZW1wbGF0ZTtcbiAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgICAgIGNhc2UgJ2VtcHR5JzpcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5lbXB0eVRlbXBsYXRlID0gaXRlbS50ZW1wbGF0ZTtcbiAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgICAgIGNhc2UgJ2Zvb3Rlcic6XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZm9vdGVyVGVtcGxhdGUgPSBpdGVtLnRlbXBsYXRlO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICAgICAgdGhpcy52YWx1ZVRlbXBsYXRlID0gaXRlbS50ZW1wbGF0ZTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgb25PdmVybGF5QW5pbWF0aW9uU3RhcnQoZXZlbnQ6IEFuaW1hdGlvbkV2ZW50KSB7XG4gICAgICAgIHN3aXRjaCAoZXZlbnQudG9TdGF0ZSkge1xuICAgICAgICAgICAgY2FzZSAndmlzaWJsZSc6XG4gICAgICAgICAgICAgICAgdGhpcy5vdmVybGF5RWwgPSBldmVudC5lbGVtZW50O1xuICAgICAgICAgICAgICAgIHRoaXMub25PdmVybGF5RW50ZXIoKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgb25PdmVybGF5QW5pbWF0aW9uRG9uZShldmVudDogQW5pbWF0aW9uRXZlbnQpIHtcbiAgICAgICAgc3dpdGNoIChldmVudC50b1N0YXRlKSB7XG4gICAgICAgICAgICBjYXNlICd2b2lkJzpcbiAgICAgICAgICAgICAgICB0aGlzLm9uT3ZlcmxheUxlYXZlKCk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgIH1cblxuICAgIG9uU2VsZWN0aW9uQ2hhbmdlKGV2ZW50KSB7XG4gICAgICAgIHRoaXMudmFsdWUgPSBldmVudDtcbiAgICAgICAgdGhpcy5vbk1vZGVsQ2hhbmdlKHRoaXMudmFsdWUpO1xuICAgICAgICB0aGlzLmNkLm1hcmtGb3JDaGVjaygpO1xuICAgIH1cblxuICAgIG9uQ2xpY2soZXZlbnQpIHtcbiAgICAgICAgaWYgKCF0aGlzLmRpc2FibGVkICYmICghdGhpcy5vdmVybGF5RWwgfHwgIXRoaXMub3ZlcmxheUVsLmNvbnRhaW5zKGV2ZW50LnRhcmdldCkpICYmICFEb21IYW5kbGVyLmhhc0NsYXNzKGV2ZW50LnRhcmdldCwgJ3AtdHJlZXNlbGVjdC1jbG9zZScpKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5vdmVybGF5VmlzaWJsZSl7XG4gICAgICAgICAgICAgICAgdGhpcy5oaWRlKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgICAgdGhpcy5zaG93KCk7XG5cbiAgICAgICAgICAgIHRoaXMuZm9jdXNJbnB1dC5uYXRpdmVFbGVtZW50LmZvY3VzKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBvbktleURvd24oZXZlbnQpIHtcbiAgICAgICAgc3dpdGNoKGV2ZW50LndoaWNoKSB7XG4gICAgICAgICAgICAvL2Rvd25cbiAgICAgICAgICAgIGNhc2UgNDA6XG4gICAgICAgICAgICAgICAgaWYgKCF0aGlzLm92ZXJsYXlWaXNpYmxlICYmIGV2ZW50LmFsdEtleSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnNob3coKTtcbiAgICAgICAgICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgLy9zcGFjZVxuICAgICAgICAgICAgY2FzZSAzMjpcbiAgICAgICAgICAgICAgICBpZiAoIXRoaXMub3ZlcmxheVZpc2libGUpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zaG93KCk7XG4gICAgICAgICAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgIC8vZW50ZXIgYW5kIGVzY2FwZVxuICAgICAgICAgICAgY2FzZSAxMzpcbiAgICAgICAgICAgIGNhc2UgMjc6XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMub3ZlcmxheVZpc2libGUpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5oaWRlKCk7XG4gICAgICAgICAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgIC8vdGFiXG4gICAgICAgICAgICBjYXNlIDk6XG4gICAgICAgICAgICAgICAgdGhpcy5oaWRlKCk7XG4gICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgc2hvdygpIHtcbiAgICAgICAgdGhpcy5vdmVybGF5VmlzaWJsZSA9IHRydWU7XG4gICAgfVxuXG4gICAgaGlkZSgpIHtcbiAgICAgICAgdGhpcy5vdmVybGF5VmlzaWJsZSA9IGZhbHNlO1xuICAgICAgICB0aGlzLmNkLm1hcmtGb3JDaGVjaygpO1xuICAgIH1cblxuICAgIG9uT3ZlcmxheUNsaWNrKGV2ZW50KSB7XG4gICAgICAgIHRoaXMub3ZlcmxheVNlcnZpY2UuYWRkKHtcbiAgICAgICAgICAgIG9yaWdpbmFsRXZlbnQ6IGV2ZW50LFxuICAgICAgICAgICAgdGFyZ2V0OiB0aGlzLmVsLm5hdGl2ZUVsZW1lbnRcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgdXBkYXRlVHJlZVN0YXRlKCkge1xuICAgICAgICBpZiAodGhpcy52YWx1ZSkge1xuICAgICAgICAgICAgbGV0IHNlbGVjdGVkTm9kZXMgPSB0aGlzLnNlbGVjdGlvbk1vZGUgPT09IFwic2luZ2xlXCIgPyBbdGhpcy52YWx1ZV0gOiBbLi4udGhpcy52YWx1ZV07XG4gICAgICAgICAgICB0aGlzLnJlc2V0RXhwYW5kZWROb2RlcygpO1xuICAgICAgICAgICAgaWYgKHNlbGVjdGVkTm9kZXMgJiYgdGhpcy5vcHRpb25zKSB7XG4gICAgICAgICAgICAgICAgdGhpcy51cGRhdGVUcmVlQnJhbmNoU3RhdGUobnVsbCwgbnVsbCwgc2VsZWN0ZWROb2Rlcyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICB1cGRhdGVUcmVlQnJhbmNoU3RhdGUobm9kZSwgcGF0aCwgc2VsZWN0ZWROb2Rlcykge1xuICAgICAgICBpZiAobm9kZSkge1xuICAgICAgICAgICAgaWYgKHRoaXMuaXNTZWxlY3RlZChub2RlKSkge1xuICAgICAgICAgICAgICAgIHRoaXMuZXhwYW5kUGF0aChwYXRoKTtcbiAgICAgICAgICAgICAgICBzZWxlY3RlZE5vZGVzLnNwbGljZShzZWxlY3RlZE5vZGVzLmluZGV4T2Yobm9kZSksIDEpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoc2VsZWN0ZWROb2Rlcy5sZW5ndGggPiAwICYmIG5vZGUuY2hpbGRyZW4pIHtcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBjaGlsZE5vZGUgb2Ygbm9kZS5jaGlsZHJlbikge1xuICAgICAgICAgICAgICAgICAgICBwYXRoLnB1c2gobm9kZSk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMudXBkYXRlVHJlZUJyYW5jaFN0YXRlKGNoaWxkTm9kZSwgcGF0aCwgc2VsZWN0ZWROb2Rlcyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgZm9yIChsZXQgY2hpbGROb2RlIG9mIHRoaXMub3B0aW9ucykge1xuICAgICAgICAgICAgICAgIHRoaXMudXBkYXRlVHJlZUJyYW5jaFN0YXRlKGNoaWxkTm9kZSwgW10sIHNlbGVjdGVkTm9kZXMpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgZXhwYW5kUGF0aChleHBhbmRlZE5vZGVzKSB7XG4gICAgICAgIGZvciAobGV0IG5vZGUgb2YgZXhwYW5kZWROb2Rlcykge1xuICAgICAgICAgICAgbm9kZS5leHBhbmRlZCA9IHRydWU7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmV4cGFuZGVkTm9kZXMgPSBbLi4uZXhwYW5kZWROb2Rlc107XG4gICAgfVxuXG4gICAgbm9kZUV4cGFuZChldmVudCkge1xuICAgICAgICB0aGlzLm9uTm9kZUV4cGFuZC5lbWl0KGV2ZW50KTtcbiAgICAgICAgdGhpcy5leHBhbmRlZE5vZGVzLnB1c2goZXZlbnQubm9kZSk7XG4gICAgfVxuXG4gICAgbm9kZUNvbGxhcHNlKGV2ZW50KSB7XG4gICAgICAgIHRoaXMub25Ob2RlQ29sbGFwc2UuZW1pdChldmVudCk7XG4gICAgICAgIHRoaXMuZXhwYW5kZWROb2Rlcy5zcGxpY2UodGhpcy5leHBhbmRlZE5vZGVzLmluZGV4T2YoZXZlbnQubm9kZSksIDEpO1xuICAgIH1cblxuICAgIHJlc2V0RXhwYW5kZWROb2RlcygpIHtcbiAgICAgICAgZm9yIChsZXQgbm9kZSBvZiB0aGlzLmV4cGFuZGVkTm9kZXMpIHtcbiAgICAgICAgICAgIG5vZGUuZXhwYW5kZWQgPSBmYWxzZTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuZXhwYW5kZWROb2RlcyA9IFtdO1xuICAgIH1cblxuICAgIGZpbmRTZWxlY3RlZE5vZGVzKG5vZGUsIGtleXMsIHNlbGVjdGVkTm9kZXMpIHtcbiAgICAgICAgaWYgKG5vZGUpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLmlzU2VsZWN0ZWQobm9kZSkpIHtcbiAgICAgICAgICAgICAgICBzZWxlY3RlZE5vZGVzLnB1c2gobm9kZSk7XG4gICAgICAgICAgICAgICAgZGVsZXRlIGtleXNbbm9kZS5rZXldO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoT2JqZWN0LmtleXMoa2V5cykubGVuZ3RoICYmIG5vZGUuY2hpbGRyZW4pIHtcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBjaGlsZE5vZGUgb2Ygbm9kZS5jaGlsZHJlbikge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmZpbmRTZWxlY3RlZE5vZGVzKGNoaWxkTm9kZSwga2V5cywgc2VsZWN0ZWROb2Rlcyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgZm9yIChsZXQgY2hpbGROb2RlIG9mIHRoaXMub3B0aW9ucykge1xuICAgICAgICAgICAgICAgIHRoaXMuZmluZFNlbGVjdGVkTm9kZXMoY2hpbGROb2RlLCBrZXlzLCBzZWxlY3RlZE5vZGVzKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIGlzU2VsZWN0ZWQobm9kZTogVHJlZU5vZGUpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZmluZEluZGV4SW5TZWxlY3Rpb24obm9kZSkgIT0gLTE7XG4gICAgfVxuXG4gICAgZmluZEluZGV4SW5TZWxlY3Rpb24obm9kZTogVHJlZU5vZGUpIHtcbiAgICAgICAgbGV0IGluZGV4OiBudW1iZXIgPSAtMTtcblxuICAgICAgICBpZiAodGhpcy52YWx1ZSkge1xuICAgICAgICAgICAgaWYgKHRoaXMuc2VsZWN0aW9uTW9kZSA9PT0gXCJzaW5nbGVcIikge1xuICAgICAgICAgICAgICAgIGxldCBhcmVOb2Rlc0VxdWFsID0gKHRoaXMudmFsdWUua2V5ICYmIHRoaXMudmFsdWUua2V5ID09PSBub2RlLmtleSkgfHwgdGhpcy52YWx1ZSA9PSBub2RlO1xuICAgICAgICAgICAgICAgIGluZGV4ID0gYXJlTm9kZXNFcXVhbCA/IDAgOiAtIDE7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBmb3IobGV0IGkgPSAwOyBpICA8IHRoaXMudmFsdWUubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICAgICAgbGV0IHNlbGVjdGVkTm9kZSA9IHRoaXMudmFsdWVbaV07XG4gICAgICAgICAgICAgICAgICAgIGxldCBhcmVOb2Rlc0VxdWFsID0gKHNlbGVjdGVkTm9kZS5rZXkgJiYgc2VsZWN0ZWROb2RlLmtleSA9PT0gbm9kZS5rZXkpIHx8IHNlbGVjdGVkTm9kZSA9PSBub2RlO1xuICAgICAgICAgICAgICAgICAgICBpZiAoYXJlTm9kZXNFcXVhbCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgaW5kZXggPSBpO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gaW5kZXg7XG4gICAgfVxuXG4gICAgb25TZWxlY3Qobm9kZSkge1xuICAgICAgICB0aGlzLm9uTm9kZVNlbGVjdC5lbWl0KG5vZGUpO1xuXG4gICAgICAgIGlmICh0aGlzLnNlbGVjdGlvbk1vZGUgPT09ICdzaW5nbGUnKSB7XG4gICAgICAgICAgICB0aGlzLmhpZGUoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIG9uVW5zZWxlY3Qobm9kZSkge1xuICAgICAgICB0aGlzLm9uTm9kZVVuc2VsZWN0LmVtaXQobm9kZSk7XG4gICAgfVxuXG4gICAgb25PdmVybGF5RW50ZXIoKSB7XG4gICAgICAgIFpJbmRleFV0aWxzLnNldCgnb3ZlcmxheScsIHRoaXMub3ZlcmxheUVsLCB0aGlzLmNvbmZpZy56SW5kZXgub3ZlcmxheSk7XG4gICAgICAgIHRoaXMuYXBwZW5kQ29udGFpbmVyKCk7XG4gICAgICAgIHRoaXMuYWxpZ25PdmVybGF5KCk7XG4gICAgICAgIHRoaXMuYmluZE91dHNpZGVDbGlja0xpc3RlbmVyKCk7XG4gICAgICAgIHRoaXMuYmluZFNjcm9sbExpc3RlbmVyKCk7XG4gICAgICAgIHRoaXMuYmluZFJlc2l6ZUxpc3RlbmVyKCk7XG4gICAgICAgIHRoaXMub25TaG93LmVtaXQoKTtcbiAgICB9XG5cbiAgICBvbk92ZXJsYXlMZWF2ZSgpIHtcbiAgICAgICAgdGhpcy51bmJpbmRPdXRzaWRlQ2xpY2tMaXN0ZW5lcigpO1xuICAgICAgICB0aGlzLnVuYmluZFNjcm9sbExpc3RlbmVyKCk7XG4gICAgICAgIHRoaXMudW5iaW5kUmVzaXplTGlzdGVuZXIoKTtcbiAgICAgICAgWkluZGV4VXRpbHMuY2xlYXIodGhpcy5vdmVybGF5RWwpO1xuICAgICAgICB0aGlzLm92ZXJsYXlFbCA9IG51bGw7XG4gICAgICAgIHRoaXMub25IaWRlLmVtaXQoKTtcbiAgICB9XG5cbiAgICBvbkZvY3VzKCkge1xuICAgICAgICB0aGlzLmZvY3VzZWQgPSB0cnVlO1xuICAgIH1cblxuICAgIG9uQmx1cigpIHtcbiAgICAgICAgdGhpcy5mb2N1c2VkID0gZmFsc2U7XG4gICAgfVxuXG4gICAgd3JpdGVWYWx1ZSh2YWx1ZTogYW55KSA6IHZvaWQge1xuICAgICAgICB0aGlzLnZhbHVlID0gdmFsdWU7XG4gICAgICAgIHRoaXMudXBkYXRlVHJlZVN0YXRlKCk7XG4gICAgICAgIHRoaXMuY2QubWFya0ZvckNoZWNrKCk7XG4gICAgfVxuXG4gICAgcmVnaXN0ZXJPbkNoYW5nZShmbjogRnVuY3Rpb24pOiB2b2lkIHtcbiAgICAgICAgdGhpcy5vbk1vZGVsQ2hhbmdlID0gZm47XG4gICAgfVxuXG4gICAgcmVnaXN0ZXJPblRvdWNoZWQoZm46IEZ1bmN0aW9uKTogdm9pZCB7XG4gICAgICAgIHRoaXMub25Nb2RlbFRvdWNoZWQgPSBmbjtcbiAgICB9XG5cbiAgICBzZXREaXNhYmxlZFN0YXRlKHZhbDogYm9vbGVhbik6IHZvaWQge1xuICAgICAgICB0aGlzLmRpc2FibGVkID0gdmFsO1xuICAgICAgICB0aGlzLmNkLm1hcmtGb3JDaGVjaygpO1xuICAgIH1cblxuICAgIGFwcGVuZENvbnRhaW5lcigpIHtcbiAgICAgICAgaWYgKHRoaXMuYXBwZW5kVG8pIHtcbiAgICAgICAgICAgIGlmICh0aGlzLmFwcGVuZFRvID09PSAnYm9keScpXG4gICAgICAgICAgICAgICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZCh0aGlzLm92ZXJsYXlFbCk7XG4gICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQodGhpcy5hcHBlbmRUbykuYXBwZW5kQ2hpbGQodGhpcy5vdmVybGF5RWwpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmVzdG9yZUFwcGVuZCgpIHtcbiAgICAgICAgaWYgKHRoaXMub3ZlcmxheUVsICYmIHRoaXMuYXBwZW5kVG8pIHtcbiAgICAgICAgICAgIGlmICh0aGlzLmFwcGVuZFRvID09PSAnYm9keScpXG4gICAgICAgICAgICAgICAgZG9jdW1lbnQuYm9keS5yZW1vdmVDaGlsZCh0aGlzLm92ZXJsYXlFbCk7XG4gICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQodGhpcy5hcHBlbmRUbykucmVtb3ZlQ2hpbGQodGhpcy5vdmVybGF5RWwpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgYWxpZ25PdmVybGF5KCkge1xuICAgICAgICBpZiAodGhpcy5hcHBlbmRUbykge1xuICAgICAgICAgICAgRG9tSGFuZGxlci5hYnNvbHV0ZVBvc2l0aW9uKHRoaXMub3ZlcmxheUVsLCB0aGlzLmNvbnRhaW5lckVsLm5hdGl2ZUVsZW1lbnQpO1xuICAgICAgICAgICAgdGhpcy5vdmVybGF5RWwuc3R5bGUubWluV2lkdGggPSBEb21IYW5kbGVyLmdldE91dGVyV2lkdGgodGhpcy5jb250YWluZXJFbC5uYXRpdmVFbGVtZW50KSArICdweCc7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBEb21IYW5kbGVyLnJlbGF0aXZlUG9zaXRpb24odGhpcy5vdmVybGF5RWwsIHRoaXMuY29udGFpbmVyRWwubmF0aXZlRWxlbWVudCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBiaW5kT3V0c2lkZUNsaWNrTGlzdGVuZXIoKSB7XG4gICAgICAgIGlmICghdGhpcy5vdXRzaWRlQ2xpY2tMaXN0ZW5lcikge1xuICAgICAgICAgICAgdGhpcy5vdXRzaWRlQ2xpY2tMaXN0ZW5lciA9IChldmVudCkgPT4ge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLm92ZXJsYXlWaXNpYmxlICYmIHRoaXMub3ZlcmxheUVsICYmICF0aGlzLmNvbnRhaW5lckVsLm5hdGl2ZUVsZW1lbnQuY29udGFpbnMoZXZlbnQudGFyZ2V0KSAmJiAhdGhpcy5vdmVybGF5RWwuY29udGFpbnMoZXZlbnQudGFyZ2V0KSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmhpZGUoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0aGlzLm91dHNpZGVDbGlja0xpc3RlbmVyKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHVuYmluZE91dHNpZGVDbGlja0xpc3RlbmVyKCkge1xuICAgICAgICBpZiAodGhpcy5vdXRzaWRlQ2xpY2tMaXN0ZW5lcikge1xuICAgICAgICAgICAgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0aGlzLm91dHNpZGVDbGlja0xpc3RlbmVyKTtcbiAgICAgICAgICAgIHRoaXMub3V0c2lkZUNsaWNrTGlzdGVuZXIgPSBudWxsO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgYmluZFNjcm9sbExpc3RlbmVyKCkge1xuICAgICAgICBpZiAoIXRoaXMuc2Nyb2xsSGFuZGxlcikge1xuICAgICAgICAgICAgdGhpcy5zY3JvbGxIYW5kbGVyID0gbmV3IENvbm5lY3RlZE92ZXJsYXlTY3JvbGxIYW5kbGVyKHRoaXMuY29udGFpbmVyRWwubmF0aXZlRWxlbWVudCwgKCkgPT4ge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLm92ZXJsYXlWaXNpYmxlKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaGlkZSgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5zY3JvbGxIYW5kbGVyLmJpbmRTY3JvbGxMaXN0ZW5lcigpO1xuICAgIH1cblxuICAgIHVuYmluZFNjcm9sbExpc3RlbmVyKCkge1xuICAgICAgICBpZiAodGhpcy5zY3JvbGxIYW5kbGVyKSB7XG4gICAgICAgICAgICB0aGlzLnNjcm9sbEhhbmRsZXIudW5iaW5kU2Nyb2xsTGlzdGVuZXIoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGJpbmRSZXNpemVMaXN0ZW5lcigpIHtcbiAgICAgICAgaWYgKCF0aGlzLnJlc2l6ZUxpc3RlbmVyKSB7XG4gICAgICAgICAgICB0aGlzLnJlc2l6ZUxpc3RlbmVyID0gKCkgPT4ge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLm92ZXJsYXlWaXNpYmxlKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaGlkZSgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigncmVzaXplJywgdGhpcy5yZXNpemVMaXN0ZW5lcik7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICB1bmJpbmRSZXNpemVMaXN0ZW5lcigpIHtcbiAgICAgICAgaWYgKHRoaXMucmVzaXplTGlzdGVuZXIpIHtcbiAgICAgICAgICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKCdyZXNpemUnLCB0aGlzLnJlc2l6ZUxpc3RlbmVyKTtcbiAgICAgICAgICAgIHRoaXMucmVzaXplTGlzdGVuZXIgPSBudWxsO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgbmdPbkRlc3Ryb3koKSB7XG4gICAgICAgIHRoaXMucmVzdG9yZUFwcGVuZCgpO1xuICAgICAgICB0aGlzLnVuYmluZE91dHNpZGVDbGlja0xpc3RlbmVyKCk7XG4gICAgICAgIHRoaXMudW5iaW5kUmVzaXplTGlzdGVuZXIoKTtcblxuICAgICAgICBpZiAodGhpcy5zY3JvbGxIYW5kbGVyKSB7XG4gICAgICAgICAgICB0aGlzLnNjcm9sbEhhbmRsZXIuZGVzdHJveSgpO1xuICAgICAgICAgICAgdGhpcy5zY3JvbGxIYW5kbGVyID0gbnVsbDtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLm92ZXJsYXlFbCkge1xuICAgICAgICAgICAgWkluZGV4VXRpbHMuY2xlYXIodGhpcy5vdmVybGF5RWwpO1xuICAgICAgICAgICAgdGhpcy5vdmVybGF5RWwgPSBudWxsO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgY29udGFpbmVyQ2xhc3MoKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAncC10cmVlc2VsZWN0IHAtY29tcG9uZW50IHAtaW5wdXR3cmFwcGVyJzogdHJ1ZSxcbiAgICAgICAgICAgICdwLXRyZWVzZWxlY3QtY2hpcCc6IHRoaXMuZGlzcGxheSA9PT0gJ2NoaXAnLFxuICAgICAgICAgICAgJ3AtZGlzYWJsZWQnOiB0aGlzLmRpc2FibGVkLFxuICAgICAgICAgICAgJ3AtZm9jdXMnOiB0aGlzLmZvY3VzZWRcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGxhYmVsQ2xhc3MoKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAncC10cmVlc2VsZWN0LWxhYmVsJzogdHJ1ZSxcbiAgICAgICAgICAgICdwLXBsYWNlaG9sZGVyJzogdGhpcy5sYWJlbCA9PT0gdGhpcy5wbGFjZWhvbGRlcixcbiAgICAgICAgICAgICdwLXRyZWVzZWxlY3QtbGFiZWwtZW1wdHknOiAhdGhpcy5wbGFjZWhvbGRlciAmJiB0aGlzLmVtcHR5VmFsdWVcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGdldCBlbXB0eU1lc3NhZ2VUZXh0KCkge1xuICAgICAgICByZXR1cm4gdGhpcy5lbXB0eU1lc3NhZ2UgfHwgdGhpcy5jb25maWcuZ2V0VHJhbnNsYXRpb24oVHJhbnNsYXRpb25LZXlzLkVNUFRZX01FU1NBR0UpO1xuICAgIH1cblxuICAgIGdldCBlbXB0eVZhbHVlKCkge1xuICAgICAgICByZXR1cm4gIXRoaXMudmFsdWUgfHwgT2JqZWN0LmtleXModGhpcy52YWx1ZSkubGVuZ3RoID09PSAwO1xuICAgIH1cblxuICAgIGdldCBlbXB0eU9wdGlvbnMoKSB7XG4gICAgICAgIHJldHVybiAhdGhpcy5vcHRpb25zIHx8IHRoaXMub3B0aW9ucy5sZW5ndGggPT09IDA7XG4gICAgfVxuXG4gICAgZ2V0IGxhYmVsKCkge1xuICAgICAgICBsZXQgdmFsdWUgPSB0aGlzLnZhbHVlfHxbXTtcbiAgICAgICAgcmV0dXJuIHZhbHVlLmxlbmd0aCA/IHZhbHVlLm1hcChub2RlID0+IG5vZGUubGFiZWwpLmpvaW4oJywgJykgOiAodGhpcy5zZWxlY3Rpb25Nb2RlID09PSBcInNpbmdsZVwiICYmIHRoaXMudmFsdWUpID8gdmFsdWUubGFiZWwgOiB0aGlzLnBsYWNlaG9sZGVyO1xuICAgIH1cbn1cblxuQE5nTW9kdWxlKHtcbiAgICBpbXBvcnRzOiBbQ29tbW9uTW9kdWxlLFJpcHBsZU1vZHVsZSxTaGFyZWRNb2R1bGUsVHJlZU1vZHVsZV0sXG4gICAgZXhwb3J0czogW1RyZWVTZWxlY3QsU2hhcmVkTW9kdWxlLFRyZWVNb2R1bGVdLFxuICAgIGRlY2xhcmF0aW9uczogW1RyZWVTZWxlY3RdXG59KVxuZXhwb3J0IGNsYXNzIFRyZWVTZWxlY3RNb2R1bGUgeyB9XG4iXX0=