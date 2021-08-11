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
TreeSelect.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.0.5", type: TreeSelect, selector: "p-treeSelect", inputs: { type: "type", inputId: "inputId", scrollHeight: "scrollHeight", disabled: "disabled", metaKeySelection: "metaKeySelection", display: "display", selectionMode: "selectionMode", tabindex: "tabindex", ariaLabelledBy: "ariaLabelledBy", placeholder: "placeholder", panelClass: "panelClass", emptyMessage: "emptyMessage", appendTo: "appendTo", options: "options", showTransitionOptions: "showTransitionOptions", hideTransitionOptions: "hideTransitionOptions" }, outputs: { onNodeExpand: "onNodeExpand", onNodeCollapse: "onNodeCollapse", onShow: "onShow", onHide: "onHide", onNodeUnselect: "onNodeUnselect", onNodeSelect: "onNodeSelect" }, host: { properties: { "class.p-inputwrapper-filled": "!emptyValue", "class.p-inputwrapper-focus": "focused || overlayVisible" } }, providers: [TREESELECT_VALUE_ACCESSOR], queries: [{ propertyName: "templates", predicate: PrimeTemplate }], viewQueries: [{ propertyName: "containerEl", first: true, predicate: ["container"], descendants: true }, { propertyName: "focusInput", first: true, predicate: ["focusInput"], descendants: true }], ngImport: i0, template: `
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
                <p-tree [value]="options" [selectionMode]="selectionMode" (selectionChange)="onSelectionChange($event)" [selection]="value"
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
                <p-tree [value]="options" [selectionMode]="selectionMode" (selectionChange)="onSelectionChange($event)" [selection]="value"
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJlZXNlbGVjdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9hcHAvY29tcG9uZW50cy90cmVlc2VsZWN0L3RyZWVzZWxlY3QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFDLFFBQVEsRUFBQyxTQUFTLEVBQUMsWUFBWSxFQUFDLE1BQU0sRUFBQyxLQUFLLEVBQUMsdUJBQXVCLEVBQUUsaUJBQWlCLEVBQUUsZUFBZSxFQUE0QyxVQUFVLEVBQXFCLFNBQVMsRUFBYSxNQUFNLGVBQWUsQ0FBQztBQUN2TyxPQUFPLEVBQUMsWUFBWSxFQUFDLE1BQU0saUJBQWlCLENBQUM7QUFDN0MsT0FBTyxFQUFDLFlBQVksRUFBQyxNQUFNLGdCQUFnQixDQUFDO0FBQzVDLE9BQU8sRUFBZ0MsYUFBYSxFQUFFLFlBQVksRUFBRSxlQUFlLEVBQVcsTUFBTSxhQUFhLENBQUM7QUFDbEgsT0FBTyxFQUFDLE9BQU8sRUFBRSxLQUFLLEVBQUUsVUFBVSxFQUFFLE9BQU8sRUFBaUIsTUFBTSxxQkFBcUIsQ0FBQztBQUN4RixPQUFPLEVBQUMsaUJBQWlCLEVBQUMsTUFBTSxnQkFBZ0IsQ0FBQztBQUNqRCxPQUFPLEVBQUMsNkJBQTZCLEVBQUUsVUFBVSxFQUFDLE1BQU0sYUFBYSxDQUFDO0FBQ3RFLE9BQU8sRUFBQyxVQUFVLEVBQUMsTUFBTSxjQUFjLENBQUM7QUFDeEMsT0FBTyxFQUFDLFdBQVcsRUFBQyxNQUFNLGVBQWUsQ0FBQTs7Ozs7QUFHekMsTUFBTSxDQUFDLE1BQU0seUJBQXlCLEdBQVE7SUFDMUMsT0FBTyxFQUFFLGlCQUFpQjtJQUMxQixXQUFXLEVBQUUsVUFBVSxDQUFDLEdBQUcsRUFBRSxDQUFDLFVBQVUsQ0FBQztJQUN6QyxLQUFLLEVBQUUsSUFBSTtDQUNkLENBQUM7QUFzRUYsTUFBTSxPQUFPLFVBQVU7SUEwRm5CLFlBQW1CLE1BQXFCLEVBQVMsRUFBcUIsRUFBUyxFQUFjLEVBQVMsY0FBOEI7UUFBakgs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LE9BQU8sZ0JBQWdCOzs2R0FBaEIsZ0JBQWdCOzhHQUFoQixnQkFBZ0IsaUJBN2ZoQixVQUFVLGFBeWZULFlBQVksRUFBQyxZQUFZLEVBQUMsWUFBWSxFQUFDLFVBQVUsYUF6ZmxELFVBQVUsRUEwZkUsWUFBWSxFQUFDLFVBQVU7OEdBR25DLGdCQUFnQixZQUpoQixDQUFDLFlBQVksRUFBQyxZQUFZLEVBQUMsWUFBWSxFQUFDLFVBQVUsQ0FBQyxFQUN2QyxZQUFZLEVBQUMsVUFBVTsyRkFHbkMsZ0JBQWdCO2tCQUw1QixRQUFRO21CQUFDO29CQUNOLE9BQU8sRUFBRSxDQUFDLFlBQVksRUFBQyxZQUFZLEVBQUMsWUFBWSxFQUFDLFVBQVUsQ0FBQztvQkFDNUQsT0FBTyxFQUFFLENBQUMsVUFBVSxFQUFDLFlBQVksRUFBQyxVQUFVLENBQUM7b0JBQzdDLFlBQVksRUFBRSxDQUFDLFVBQVUsQ0FBQztpQkFDN0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge05nTW9kdWxlLENvbXBvbmVudCxFdmVudEVtaXR0ZXIsT3V0cHV0LElucHV0LENoYW5nZURldGVjdGlvblN0cmF0ZWd5LCBWaWV3RW5jYXBzdWxhdGlvbiwgQ29udGVudENoaWxkcmVuLCBBZnRlckNvbnRlbnRJbml0LCBUZW1wbGF0ZVJlZiwgUXVlcnlMaXN0LCBmb3J3YXJkUmVmLCBDaGFuZ2VEZXRlY3RvclJlZiwgVmlld0NoaWxkLCBFbGVtZW50UmVmfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7Q29tbW9uTW9kdWxlfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHtSaXBwbGVNb2R1bGV9IGZyb20gJ3ByaW1lbmcvcmlwcGxlJztcbmltcG9ydCB7T3ZlcmxheVNlcnZpY2UsIFByaW1lTkdDb25maWcsIFByaW1lVGVtcGxhdGUsIFNoYXJlZE1vZHVsZSwgVHJhbnNsYXRpb25LZXlzLCBUcmVlTm9kZX0gZnJvbSAncHJpbWVuZy9hcGknO1xuaW1wb3J0IHthbmltYXRlLCBzdHlsZSwgdHJhbnNpdGlvbiwgdHJpZ2dlciwgQW5pbWF0aW9uRXZlbnR9IGZyb20gJ0Bhbmd1bGFyL2FuaW1hdGlvbnMnO1xuaW1wb3J0IHtOR19WQUxVRV9BQ0NFU1NPUn0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHtDb25uZWN0ZWRPdmVybGF5U2Nyb2xsSGFuZGxlciwgRG9tSGFuZGxlcn0gZnJvbSAncHJpbWVuZy9kb20nO1xuaW1wb3J0IHtUcmVlTW9kdWxlfSBmcm9tICdwcmltZW5nL3RyZWUnO1xuaW1wb3J0IHtaSW5kZXhVdGlsc30gZnJvbSAncHJpbWVuZy91dGlscydcblxuXG5leHBvcnQgY29uc3QgVFJFRVNFTEVDVF9WQUxVRV9BQ0NFU1NPUjogYW55ID0ge1xuICAgIHByb3ZpZGU6IE5HX1ZBTFVFX0FDQ0VTU09SLFxuICAgIHVzZUV4aXN0aW5nOiBmb3J3YXJkUmVmKCgpID0+IFRyZWVTZWxlY3QpLFxuICAgIG11bHRpOiB0cnVlXG59O1xuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ3AtdHJlZVNlbGVjdCcsXG4gICAgdGVtcGxhdGU6IGBcbiAgICA8ZGl2ICNjb250YWluZXIgW25nQ2xhc3NdPVwiY29udGFpbmVyQ2xhc3MoKVwiIChjbGljayk9XCJvbkNsaWNrKCRldmVudClcIj5cbiAgICAgICAgPGRpdiBjbGFzcz1cInAtaGlkZGVuLWFjY2Vzc2libGVcIj5cbiAgICAgICAgICAgIDxpbnB1dCAjZm9jdXNJbnB1dCB0eXBlPVwidGV4dFwiIHJvbGU9XCJsaXN0Ym94XCIgW2F0dHIuaWRdPVwiaW5wdXRJZFwiIHJlYWRvbmx5IFtkaXNhYmxlZF09XCJkaXNhYmxlZFwiIChmb2N1cyk9XCJvbkZvY3VzKClcIiAoYmx1cik9XCJvbkJsdXIoKVwiIChrZXlkb3duKT1cIm9uS2V5RG93bigkZXZlbnQpXCIgW2F0dHIudGFiaW5kZXhdPVwidGFiaW5kZXhcIlxuICAgICAgICAgICAgYXJpYS1oYXNwb3B1cD1cInRydWVcIiBbYXR0ci5hcmlhLWV4cGFuZGVkXT1cIm92ZXJsYXlWaXNpYmxlXCIgW2F0dHIuYXJpYS1sYWJlbGxlZGJ5XT1cImFyaWFMYWJlbGxlZEJ5XCIvPlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPGRpdiBjbGFzcz1cInAtdHJlZXNlbGVjdC1sYWJlbC1jb250YWluZXJcIj5cbiAgICAgICAgICAgIDxkaXYgW25nQ2xhc3NdPVwibGFiZWxDbGFzcygpXCI+XG4gICAgICAgICAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdJZj1cInZhbHVlVGVtcGxhdGU7ZWxzZSBkZWZhdWx0VmFsdWVUZW1wbGF0ZVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdUZW1wbGF0ZU91dGxldD1cInZhbHVlVGVtcGxhdGU7IGNvbnRleHQ6IHskaW1wbGljaXQ6IHZhbHVlLCBwbGFjZWhvbGRlcjogcGxhY2Vob2xkZXJ9XCI+PC9uZy1jb250YWluZXI+XG4gICAgICAgICAgICAgICAgPC9uZy1jb250YWluZXI+XG4gICAgICAgICAgICAgICAgPG5nLXRlbXBsYXRlICNkZWZhdWx0VmFsdWVUZW1wbGF0ZT5cbiAgICAgICAgICAgICAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdJZj1cImRpc3BsYXkgPT09ICdjb21tYSc7ZWxzZSBjaGlwc1ZhbHVlVGVtcGxhdGVcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIHt7bGFiZWwgfHwgJ2VtcHR5J319XG4gICAgICAgICAgICAgICAgICAgIDwvbmctY29udGFpbmVyPlxuICAgICAgICAgICAgICAgICAgICA8bmctdGVtcGxhdGUgI2NoaXBzVmFsdWVUZW1wbGF0ZT5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgKm5nRm9yPVwibGV0IG5vZGUgb2YgdmFsdWVcIiBjbGFzcz1cInAtdHJlZXNlbGVjdC10b2tlblwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwicC10cmVlc2VsZWN0LXRva2VuLWxhYmVsXCI+e3tub2RlLmxhYmVsfX08L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxuZy1jb250YWluZXIgKm5nSWY9XCJlbXB0eVZhbHVlXCI+e3twbGFjZWhvbGRlciB8fCAnZW1wdHknfX08L25nLWNvbnRhaW5lcj5cbiAgICAgICAgICAgICAgICAgICAgPC9uZy10ZW1wbGF0ZT5cbiAgICAgICAgICAgICAgICA8L25nLXRlbXBsYXRlPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzPVwicC10cmVlc2VsZWN0LXRyaWdnZXJcIj5cbiAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwicC10cmVlc2VsZWN0LXRyaWdnZXItaWNvbiBwaSBwaS1jaGV2cm9uLWRvd25cIj48L3NwYW4+XG4gICAgICAgIDwvZGl2PlxuXG4gICAgICAgIDxkaXYgI292ZXJsYXlSZWYgY2xhc3M9XCJwLXRyZWVzZWxlY3QtcGFuZWwgcC1jb21wb25lbnRcIiAqbmdJZj1cIm92ZXJsYXlWaXNpYmxlXCIgKGNsaWNrKT1cIm9uT3ZlcmxheUNsaWNrKCRldmVudClcIlxuICAgICAgICAgICAgW0BvdmVybGF5QW5pbWF0aW9uXT1cInt2YWx1ZTogJ3Zpc2libGUnLCBwYXJhbXM6IHtzaG93VHJhbnNpdGlvblBhcmFtczogc2hvd1RyYW5zaXRpb25PcHRpb25zLCBoaWRlVHJhbnNpdGlvblBhcmFtczogaGlkZVRyYW5zaXRpb25PcHRpb25zfX1cIiAoQG92ZXJsYXlBbmltYXRpb24uc3RhcnQpPVwib25PdmVybGF5QW5pbWF0aW9uU3RhcnQoJGV2ZW50KVwiIChAb3ZlcmxheUFuaW1hdGlvbi5kb25lKT1cIm9uT3ZlcmxheUFuaW1hdGlvbkRvbmUoJGV2ZW50KVwiPlxuICAgICAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdUZW1wbGF0ZU91dGxldD1cImhlYWRlclRlbXBsYXRlOyBjb250ZXh0OiB7JGltcGxpY2l0OiB2YWx1ZSwgb3B0aW9uczogb3B0aW9uc31cIj48L25nLWNvbnRhaW5lcj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJwLXRyZWVzZWxlY3QtaXRlbXMtd3JhcHBlclwiIFtuZ1N0eWxlXT1cInsnbWF4LWhlaWdodCc6IHNjcm9sbEhlaWdodH1cIj5cbiAgICAgICAgICAgICAgICA8cC10cmVlIFt2YWx1ZV09XCJvcHRpb25zXCIgW3NlbGVjdGlvbk1vZGVdPVwic2VsZWN0aW9uTW9kZVwiIChzZWxlY3Rpb25DaGFuZ2UpPVwib25TZWxlY3Rpb25DaGFuZ2UoJGV2ZW50KVwiIFtzZWxlY3Rpb25dPVwidmFsdWVcIlxuICAgICAgICAgICAgICAgICAgICBbbWV0YUtleVNlbGVjdGlvbl09XCJtZXRhS2V5U2VsZWN0aW9uXCIgKG9uTm9kZUV4cGFuZCk9XCJub2RlRXhwYW5kKCRldmVudClcIiAob25Ob2RlQ29sbGFwc2UpPVwibm9kZUNvbGxhcHNlKCRldmVudClcIlxuICAgICAgICAgICAgICAgICAgICAob25Ob2RlU2VsZWN0KT1cIm9uU2VsZWN0KCRldmVudClcIiAob25Ob2RlVW5zZWxlY3QpPVwib25VbnNlbGVjdCgkZXZlbnQpXCI+PC9wLXRyZWU+XG4gICAgICAgICAgICAgICAgPGRpdiAqbmdJZj1cImVtcHR5T3B0aW9uc1wiIGNsYXNzPVwicC10cmVlc2VsZWN0LWVtcHR5LW1lc3NhZ2VcIj5cbiAgICAgICAgICAgICAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdJZj1cIiFlbXB0eVRlbXBsYXRlOyBlbHNlIGVtcHR5XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICB7e2VtcHR5TWVzc2FnZVRleHR9fVxuICAgICAgICAgICAgICAgICAgICA8L25nLWNvbnRhaW5lcj5cbiAgICAgICAgICAgICAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdUZW1wbGF0ZU91dGxldD1cImVtcHR5VGVtcGxhdGU7XCI+PC9uZy1jb250YWluZXI+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDxuZy1jb250YWluZXIgKm5nVGVtcGxhdGVPdXRsZXQ9XCJmb290ZXJUZW1wbGF0ZTsgY29udGV4dDogeyRpbXBsaWNpdDogdmFsdWUsIG9wdGlvbnM6IG9wdGlvbnN9XCI+PC9uZy1jb250YWluZXI+XG4gICAgICAgIDwvZGl2PlxuICAgIDwvZGl2PlxuICAgIGAsXG4gICAgc3R5bGVVcmxzOiBbJy4vdHJlZXNlbGVjdC5jc3MnXSxcbiAgICBhbmltYXRpb25zOiBbXG4gICAgICAgIHRyaWdnZXIoJ292ZXJsYXlBbmltYXRpb24nLCBbXG4gICAgICAgICAgICB0cmFuc2l0aW9uKCc6ZW50ZXInLCBbXG4gICAgICAgICAgICAgICAgc3R5bGUoe29wYWNpdHk6IDAsIHRyYW5zZm9ybTogJ3NjYWxlWSgwLjgpJ30pLFxuICAgICAgICAgICAgICAgIGFuaW1hdGUoJ3t7c2hvd1RyYW5zaXRpb25QYXJhbXN9fScpXG4gICAgICAgICAgICAgIF0pLFxuICAgICAgICAgICAgICB0cmFuc2l0aW9uKCc6bGVhdmUnLCBbXG4gICAgICAgICAgICAgICAgYW5pbWF0ZSgne3toaWRlVHJhbnNpdGlvblBhcmFtc319Jywgc3R5bGUoeyBvcGFjaXR5OiAwIH0pKVxuICAgICAgICAgICAgICBdKVxuICAgICAgICBdKVxuICAgIF0sXG4gICAgaG9zdDoge1xuICAgICAgICAnW2NsYXNzLnAtaW5wdXR3cmFwcGVyLWZpbGxlZF0nOiAnIWVtcHR5VmFsdWUnLFxuICAgICAgICAnW2NsYXNzLnAtaW5wdXR3cmFwcGVyLWZvY3VzXSc6ICdmb2N1c2VkIHx8IG92ZXJsYXlWaXNpYmxlJ1xuICAgIH0sXG4gICAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG4gICAgcHJvdmlkZXJzOiBbVFJFRVNFTEVDVF9WQUxVRV9BQ0NFU1NPUl0sXG4gICAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZVxufSlcbmV4cG9ydCBjbGFzcyBUcmVlU2VsZWN0IGltcGxlbWVudHMgQWZ0ZXJDb250ZW50SW5pdCB7XG5cbiAgICBASW5wdXQoKSB0eXBlOiBzdHJpbmcgPSBcImJ1dHRvblwiO1xuXG4gICAgQElucHV0KCkgaW5wdXRJZDogc3RyaW5nO1xuXG4gICAgQElucHV0KCkgc2Nyb2xsSGVpZ2h0OiBzdHJpbmcgPSBcIjQwMHB4XCI7XG5cbiAgICBASW5wdXQoKSBkaXNhYmxlZDogYm9vbGVhbjtcblxuICAgIEBJbnB1dCgpIG1ldGFLZXlTZWxlY3Rpb246IGJvb2xlYW4gPSB0cnVlO1xuXG4gICAgQElucHV0KCkgZGlzcGxheTogc3RyaW5nID0gXCJjb21tYVwiO1xuXG4gICAgQElucHV0KCkgc2VsZWN0aW9uTW9kZTogc3RyaW5nID0gXCJzaW5nbGVcIjtcblxuICAgIEBJbnB1dCgpIHRhYmluZGV4OiBzdHJpbmc7XG5cbiAgICBASW5wdXQoKSBhcmlhTGFiZWxsZWRCeTogc3RyaW5nO1xuXG4gICAgQElucHV0KCkgcGxhY2Vob2xkZXI6IHN0cmluZztcblxuICAgIEBJbnB1dCgpIHBhbmVsQ2xhc3M6IHN0cmluZztcblxuICAgIEBJbnB1dCgpIGVtcHR5TWVzc2FnZTogc3RyaW5nO1xuXG4gICAgQElucHV0KCkgYXBwZW5kVG86IGFueTtcblxuICAgIEBJbnB1dCgpIGdldCBvcHRpb25zKCk6IGFueVtdIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX29wdGlvbnM7XG4gICAgfTtcbiAgICBzZXQgb3B0aW9ucyhvcHRpb25zKSB7XG4gICAgICAgIHRoaXMuX29wdGlvbnMgPSBvcHRpb25zO1xuICAgICAgICB0aGlzLnVwZGF0ZVRyZWVTdGF0ZSgpO1xuICAgIH1cblxuICAgIEBJbnB1dCgpIHNob3dUcmFuc2l0aW9uT3B0aW9uczogc3RyaW5nID0gJy4xMnMgY3ViaWMtYmV6aWVyKDAsIDAsIDAuMiwgMSknO1xuXG4gICAgQElucHV0KCkgaGlkZVRyYW5zaXRpb25PcHRpb25zOiBzdHJpbmcgPSAnLjFzIGxpbmVhcic7XG5cbiAgICBAQ29udGVudENoaWxkcmVuKFByaW1lVGVtcGxhdGUpIHRlbXBsYXRlczogUXVlcnlMaXN0PGFueT47XG5cbiAgICBAVmlld0NoaWxkKCdjb250YWluZXInKSBjb250YWluZXJFbDogRWxlbWVudFJlZjtcblxuICAgIEBWaWV3Q2hpbGQoJ2ZvY3VzSW5wdXQnKSBmb2N1c0lucHV0OiBFbGVtZW50UmVmO1xuXG4gICAgQE91dHB1dCgpIG9uTm9kZUV4cGFuZDogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgICBAT3V0cHV0KCkgb25Ob2RlQ29sbGFwc2U6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG4gICAgQE91dHB1dCgpIG9uU2hvdzogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgICBAT3V0cHV0KCkgb25IaWRlOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICAgIEBPdXRwdXQoKSBvbk5vZGVVbnNlbGVjdDogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgICBAT3V0cHV0KCkgb25Ob2RlU2VsZWN0OiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICAgIHZhbHVlVGVtcGxhdGU6IFRlbXBsYXRlUmVmPGFueT47XG5cbiAgICBoZWFkZXJUZW1wbGF0ZTogVGVtcGxhdGVSZWY8YW55PjtcblxuICAgIGVtcHR5VGVtcGxhdGU6IFRlbXBsYXRlUmVmPGFueT47XG5cbiAgICBmb290ZXJUZW1wbGF0ZTogVGVtcGxhdGVSZWY8YW55PjtcblxuICAgIGZvY3VzZWQ6IGJvb2xlYW47XG5cbiAgICBvdmVybGF5VmlzaWJsZTogYm9vbGVhbjtcblxuICAgIHNlbGZDaGFuZ2U6IGJvb2xlYW47XG5cbiAgICB2YWx1ZTtcblxuICAgIGV4cGFuZGVkTm9kZXM6IGFueVtdID0gW107XG5cbiAgICBfb3B0aW9uczogYW55W107XG5cbiAgICBvdXRzaWRlQ2xpY2tMaXN0ZW5lcjogYW55O1xuXG4gICAgc2Nyb2xsSGFuZGxlcjogYW55O1xuXG4gICAgcmVzaXplTGlzdGVuZXI6IGFueTtcblxuICAgIG92ZXJsYXlFbDogYW55O1xuXG4gICAgb25Nb2RlbENoYW5nZTogRnVuY3Rpb24gPSAoKSA9PiB7fTtcblxuICAgIG9uTW9kZWxUb3VjaGVkOiBGdW5jdGlvbiA9ICgpID0+IHt9O1xuXG4gICAgY29uc3RydWN0b3IocHVibGljIGNvbmZpZzogUHJpbWVOR0NvbmZpZywgcHVibGljIGNkOiBDaGFuZ2VEZXRlY3RvclJlZiwgcHVibGljIGVsOiBFbGVtZW50UmVmLCBwdWJsaWMgb3ZlcmxheVNlcnZpY2U6IE92ZXJsYXlTZXJ2aWNlKSB7IH1cblxuICAgIG5nT25Jbml0KCkge1xuICAgICAgICB0aGlzLnVwZGF0ZVRyZWVTdGF0ZSgpO1xuICAgIH1cblxuICAgIG5nQWZ0ZXJDb250ZW50SW5pdCgpIHtcbiAgICAgICAgdGhpcy50ZW1wbGF0ZXMuZm9yRWFjaCgoaXRlbSkgPT4ge1xuICAgICAgICAgICAgc3dpdGNoKGl0ZW0uZ2V0VHlwZSgpKSB7XG4gICAgICAgICAgICAgICAgY2FzZSAndmFsdWUnOlxuICAgICAgICAgICAgICAgICAgICB0aGlzLnZhbHVlVGVtcGxhdGUgPSBpdGVtLnRlbXBsYXRlO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICAgICAgY2FzZSAnaGVhZGVyJzpcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5oZWFkZXJUZW1wbGF0ZSA9IGl0ZW0udGVtcGxhdGU7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgICAgICBjYXNlICdlbXB0eSc6XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZW1wdHlUZW1wbGF0ZSA9IGl0ZW0udGVtcGxhdGU7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgICAgICBjYXNlICdmb290ZXInOlxuICAgICAgICAgICAgICAgICAgICB0aGlzLmZvb3RlclRlbXBsYXRlID0gaXRlbS50ZW1wbGF0ZTtcbiAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgICAgIHRoaXMudmFsdWVUZW1wbGF0ZSA9IGl0ZW0udGVtcGxhdGU7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIG9uT3ZlcmxheUFuaW1hdGlvblN0YXJ0KGV2ZW50OiBBbmltYXRpb25FdmVudCkge1xuICAgICAgICBzd2l0Y2ggKGV2ZW50LnRvU3RhdGUpIHtcbiAgICAgICAgICAgIGNhc2UgJ3Zpc2libGUnOlxuICAgICAgICAgICAgICAgIHRoaXMub3ZlcmxheUVsID0gZXZlbnQuZWxlbWVudDtcbiAgICAgICAgICAgICAgICB0aGlzLm9uT3ZlcmxheUVudGVyKCk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgIH1cblxuICAgIG9uT3ZlcmxheUFuaW1hdGlvbkRvbmUoZXZlbnQ6IEFuaW1hdGlvbkV2ZW50KSB7XG4gICAgICAgIHN3aXRjaCAoZXZlbnQudG9TdGF0ZSkge1xuICAgICAgICAgICAgY2FzZSAndm9pZCc6XG4gICAgICAgICAgICAgICAgdGhpcy5vbk92ZXJsYXlMZWF2ZSgpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBvblNlbGVjdGlvbkNoYW5nZShldmVudCkge1xuICAgICAgICB0aGlzLnZhbHVlID0gZXZlbnQ7XG4gICAgICAgIHRoaXMub25Nb2RlbENoYW5nZSh0aGlzLnZhbHVlKTtcbiAgICAgICAgdGhpcy5jZC5tYXJrRm9yQ2hlY2soKTtcbiAgICB9XG5cbiAgICBvbkNsaWNrKGV2ZW50KSB7XG4gICAgICAgIGlmICghdGhpcy5kaXNhYmxlZCAmJiAoIXRoaXMub3ZlcmxheUVsIHx8ICF0aGlzLm92ZXJsYXlFbC5jb250YWlucyhldmVudC50YXJnZXQpKSAmJiAhRG9tSGFuZGxlci5oYXNDbGFzcyhldmVudC50YXJnZXQsICdwLXRyZWVzZWxlY3QtY2xvc2UnKSkge1xuICAgICAgICAgICAgaWYgKHRoaXMub3ZlcmxheVZpc2libGUpe1xuICAgICAgICAgICAgICAgIHRoaXMuaGlkZSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAgIHRoaXMuc2hvdygpO1xuXG4gICAgICAgICAgICB0aGlzLmZvY3VzSW5wdXQubmF0aXZlRWxlbWVudC5mb2N1cygpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgb25LZXlEb3duKGV2ZW50KSB7XG4gICAgICAgIHN3aXRjaChldmVudC53aGljaCkge1xuICAgICAgICAgICAgLy9kb3duXG4gICAgICAgICAgICBjYXNlIDQwOlxuICAgICAgICAgICAgICAgIGlmICghdGhpcy5vdmVybGF5VmlzaWJsZSAmJiBldmVudC5hbHRLZXkpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zaG93KCk7XG4gICAgICAgICAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgIC8vc3BhY2VcbiAgICAgICAgICAgIGNhc2UgMzI6XG4gICAgICAgICAgICAgICAgaWYgKCF0aGlzLm92ZXJsYXlWaXNpYmxlKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2hvdygpO1xuICAgICAgICAgICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICAvL2VudGVyIGFuZCBlc2NhcGVcbiAgICAgICAgICAgIGNhc2UgMTM6XG4gICAgICAgICAgICBjYXNlIDI3OlxuICAgICAgICAgICAgICAgIGlmICh0aGlzLm92ZXJsYXlWaXNpYmxlKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaGlkZSgpO1xuICAgICAgICAgICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICAvL3RhYlxuICAgICAgICAgICAgY2FzZSA5OlxuICAgICAgICAgICAgICAgIHRoaXMuaGlkZSgpO1xuICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHNob3coKSB7XG4gICAgICAgIHRoaXMub3ZlcmxheVZpc2libGUgPSB0cnVlO1xuICAgIH1cblxuICAgIGhpZGUoKSB7XG4gICAgICAgIHRoaXMub3ZlcmxheVZpc2libGUgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5jZC5tYXJrRm9yQ2hlY2soKTtcbiAgICB9XG5cbiAgICBvbk92ZXJsYXlDbGljayhldmVudCkge1xuICAgICAgICB0aGlzLm92ZXJsYXlTZXJ2aWNlLmFkZCh7XG4gICAgICAgICAgICBvcmlnaW5hbEV2ZW50OiBldmVudCxcbiAgICAgICAgICAgIHRhcmdldDogdGhpcy5lbC5uYXRpdmVFbGVtZW50XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHVwZGF0ZVRyZWVTdGF0ZSgpIHtcbiAgICAgICAgaWYgKHRoaXMudmFsdWUpIHtcbiAgICAgICAgICAgIGxldCBzZWxlY3RlZE5vZGVzID0gdGhpcy5zZWxlY3Rpb25Nb2RlID09PSBcInNpbmdsZVwiID8gW3RoaXMudmFsdWVdIDogWy4uLnRoaXMudmFsdWVdO1xuICAgICAgICAgICAgdGhpcy5yZXNldEV4cGFuZGVkTm9kZXMoKTtcbiAgICAgICAgICAgIGlmIChzZWxlY3RlZE5vZGVzICYmIHRoaXMub3B0aW9ucykge1xuICAgICAgICAgICAgICAgIHRoaXMudXBkYXRlVHJlZUJyYW5jaFN0YXRlKG51bGwsIG51bGwsIHNlbGVjdGVkTm9kZXMpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgdXBkYXRlVHJlZUJyYW5jaFN0YXRlKG5vZGUsIHBhdGgsIHNlbGVjdGVkTm9kZXMpIHtcbiAgICAgICAgaWYgKG5vZGUpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLmlzU2VsZWN0ZWQobm9kZSkpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmV4cGFuZFBhdGgocGF0aCk7XG4gICAgICAgICAgICAgICAgc2VsZWN0ZWROb2Rlcy5zcGxpY2Uoc2VsZWN0ZWROb2Rlcy5pbmRleE9mKG5vZGUpLCAxKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKHNlbGVjdGVkTm9kZXMubGVuZ3RoID4gMCAmJiBub2RlLmNoaWxkcmVuKSB7XG4gICAgICAgICAgICAgICAgZm9yIChsZXQgY2hpbGROb2RlIG9mIG5vZGUuY2hpbGRyZW4pIHtcbiAgICAgICAgICAgICAgICAgICAgcGF0aC5wdXNoKG5vZGUpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnVwZGF0ZVRyZWVCcmFuY2hTdGF0ZShjaGlsZE5vZGUsIHBhdGgsIHNlbGVjdGVkTm9kZXMpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGZvciAobGV0IGNoaWxkTm9kZSBvZiB0aGlzLm9wdGlvbnMpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnVwZGF0ZVRyZWVCcmFuY2hTdGF0ZShjaGlsZE5vZGUsIFtdLCBzZWxlY3RlZE5vZGVzKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIGV4cGFuZFBhdGgoZXhwYW5kZWROb2Rlcykge1xuICAgICAgICBmb3IgKGxldCBub2RlIG9mIGV4cGFuZGVkTm9kZXMpIHtcbiAgICAgICAgICAgIG5vZGUuZXhwYW5kZWQgPSB0cnVlO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5leHBhbmRlZE5vZGVzID0gWy4uLmV4cGFuZGVkTm9kZXNdO1xuICAgIH1cblxuICAgIG5vZGVFeHBhbmQoZXZlbnQpIHtcbiAgICAgICAgdGhpcy5vbk5vZGVFeHBhbmQuZW1pdChldmVudCk7XG4gICAgICAgIHRoaXMuZXhwYW5kZWROb2Rlcy5wdXNoKGV2ZW50Lm5vZGUpO1xuICAgIH1cblxuICAgIG5vZGVDb2xsYXBzZShldmVudCkge1xuICAgICAgICB0aGlzLm9uTm9kZUNvbGxhcHNlLmVtaXQoZXZlbnQpO1xuICAgICAgICB0aGlzLmV4cGFuZGVkTm9kZXMuc3BsaWNlKHRoaXMuZXhwYW5kZWROb2Rlcy5pbmRleE9mKGV2ZW50Lm5vZGUpLCAxKTtcbiAgICB9XG5cbiAgICByZXNldEV4cGFuZGVkTm9kZXMoKSB7XG4gICAgICAgIGZvciAobGV0IG5vZGUgb2YgdGhpcy5leHBhbmRlZE5vZGVzKSB7XG4gICAgICAgICAgICBub2RlLmV4cGFuZGVkID0gZmFsc2U7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmV4cGFuZGVkTm9kZXMgPSBbXTtcbiAgICB9XG5cbiAgICBmaW5kU2VsZWN0ZWROb2Rlcyhub2RlLCBrZXlzLCBzZWxlY3RlZE5vZGVzKSB7XG4gICAgICAgIGlmIChub2RlKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5pc1NlbGVjdGVkKG5vZGUpKSB7XG4gICAgICAgICAgICAgICAgc2VsZWN0ZWROb2Rlcy5wdXNoKG5vZGUpO1xuICAgICAgICAgICAgICAgIGRlbGV0ZSBrZXlzW25vZGUua2V5XTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKE9iamVjdC5rZXlzKGtleXMpLmxlbmd0aCAmJiBub2RlLmNoaWxkcmVuKSB7XG4gICAgICAgICAgICAgICAgZm9yIChsZXQgY2hpbGROb2RlIG9mIG5vZGUuY2hpbGRyZW4pIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5maW5kU2VsZWN0ZWROb2RlcyhjaGlsZE5vZGUsIGtleXMsIHNlbGVjdGVkTm9kZXMpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGZvciAobGV0IGNoaWxkTm9kZSBvZiB0aGlzLm9wdGlvbnMpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmZpbmRTZWxlY3RlZE5vZGVzKGNoaWxkTm9kZSwga2V5cywgc2VsZWN0ZWROb2Rlcyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBpc1NlbGVjdGVkKG5vZGU6IFRyZWVOb2RlKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmZpbmRJbmRleEluU2VsZWN0aW9uKG5vZGUpICE9IC0xO1xuICAgIH1cblxuICAgIGZpbmRJbmRleEluU2VsZWN0aW9uKG5vZGU6IFRyZWVOb2RlKSB7XG4gICAgICAgIGxldCBpbmRleDogbnVtYmVyID0gLTE7XG5cbiAgICAgICAgaWYgKHRoaXMudmFsdWUpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLnNlbGVjdGlvbk1vZGUgPT09IFwic2luZ2xlXCIpIHtcbiAgICAgICAgICAgICAgICBsZXQgYXJlTm9kZXNFcXVhbCA9ICh0aGlzLnZhbHVlLmtleSAmJiB0aGlzLnZhbHVlLmtleSA9PT0gbm9kZS5rZXkpIHx8IHRoaXMudmFsdWUgPT0gbm9kZTtcbiAgICAgICAgICAgICAgICBpbmRleCA9IGFyZU5vZGVzRXF1YWwgPyAwIDogLSAxO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgZm9yKGxldCBpID0gMDsgaSAgPCB0aGlzLnZhbHVlLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgICAgIGxldCBzZWxlY3RlZE5vZGUgPSB0aGlzLnZhbHVlW2ldO1xuICAgICAgICAgICAgICAgICAgICBsZXQgYXJlTm9kZXNFcXVhbCA9IChzZWxlY3RlZE5vZGUua2V5ICYmIHNlbGVjdGVkTm9kZS5rZXkgPT09IG5vZGUua2V5KSB8fCBzZWxlY3RlZE5vZGUgPT0gbm9kZTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGFyZU5vZGVzRXF1YWwpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGluZGV4ID0gaTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGluZGV4O1xuICAgIH1cblxuICAgIG9uU2VsZWN0KG5vZGUpIHtcbiAgICAgICAgdGhpcy5vbk5vZGVTZWxlY3QuZW1pdChub2RlKTtcblxuICAgICAgICBpZiAodGhpcy5zZWxlY3Rpb25Nb2RlID09PSAnc2luZ2xlJykge1xuICAgICAgICAgICAgdGhpcy5oaWRlKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBvblVuc2VsZWN0KG5vZGUpIHtcbiAgICAgICAgdGhpcy5vbk5vZGVVbnNlbGVjdC5lbWl0KG5vZGUpO1xuICAgIH1cblxuICAgIG9uT3ZlcmxheUVudGVyKCkge1xuICAgICAgICBaSW5kZXhVdGlscy5zZXQoJ292ZXJsYXknLCB0aGlzLm92ZXJsYXlFbCwgdGhpcy5jb25maWcuekluZGV4Lm92ZXJsYXkpO1xuICAgICAgICB0aGlzLmFwcGVuZENvbnRhaW5lcigpO1xuICAgICAgICB0aGlzLmFsaWduT3ZlcmxheSgpO1xuICAgICAgICB0aGlzLmJpbmRPdXRzaWRlQ2xpY2tMaXN0ZW5lcigpO1xuICAgICAgICB0aGlzLmJpbmRTY3JvbGxMaXN0ZW5lcigpO1xuICAgICAgICB0aGlzLmJpbmRSZXNpemVMaXN0ZW5lcigpO1xuICAgICAgICB0aGlzLm9uU2hvdy5lbWl0KCk7XG4gICAgfVxuXG4gICAgb25PdmVybGF5TGVhdmUoKSB7XG4gICAgICAgIHRoaXMudW5iaW5kT3V0c2lkZUNsaWNrTGlzdGVuZXIoKTtcbiAgICAgICAgdGhpcy51bmJpbmRTY3JvbGxMaXN0ZW5lcigpO1xuICAgICAgICB0aGlzLnVuYmluZFJlc2l6ZUxpc3RlbmVyKCk7XG4gICAgICAgIFpJbmRleFV0aWxzLmNsZWFyKHRoaXMub3ZlcmxheUVsKTtcbiAgICAgICAgdGhpcy5vdmVybGF5RWwgPSBudWxsO1xuICAgICAgICB0aGlzLm9uSGlkZS5lbWl0KCk7XG4gICAgfVxuXG4gICAgb25Gb2N1cygpIHtcbiAgICAgICAgdGhpcy5mb2N1c2VkID0gdHJ1ZTtcbiAgICB9XG5cbiAgICBvbkJsdXIoKSB7XG4gICAgICAgIHRoaXMuZm9jdXNlZCA9IGZhbHNlO1xuICAgIH1cblxuICAgIHdyaXRlVmFsdWUodmFsdWU6IGFueSkgOiB2b2lkIHtcbiAgICAgICAgdGhpcy52YWx1ZSA9IHZhbHVlO1xuICAgICAgICB0aGlzLnVwZGF0ZVRyZWVTdGF0ZSgpO1xuICAgICAgICB0aGlzLmNkLm1hcmtGb3JDaGVjaygpO1xuICAgIH1cblxuICAgIHJlZ2lzdGVyT25DaGFuZ2UoZm46IEZ1bmN0aW9uKTogdm9pZCB7XG4gICAgICAgIHRoaXMub25Nb2RlbENoYW5nZSA9IGZuO1xuICAgIH1cblxuICAgIHJlZ2lzdGVyT25Ub3VjaGVkKGZuOiBGdW5jdGlvbik6IHZvaWQge1xuICAgICAgICB0aGlzLm9uTW9kZWxUb3VjaGVkID0gZm47XG4gICAgfVxuXG4gICAgc2V0RGlzYWJsZWRTdGF0ZSh2YWw6IGJvb2xlYW4pOiB2b2lkIHtcbiAgICAgICAgdGhpcy5kaXNhYmxlZCA9IHZhbDtcbiAgICAgICAgdGhpcy5jZC5tYXJrRm9yQ2hlY2soKTtcbiAgICB9XG5cbiAgICBhcHBlbmRDb250YWluZXIoKSB7XG4gICAgICAgIGlmICh0aGlzLmFwcGVuZFRvKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5hcHBlbmRUbyA9PT0gJ2JvZHknKVxuICAgICAgICAgICAgICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQodGhpcy5vdmVybGF5RWwpO1xuICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKHRoaXMuYXBwZW5kVG8pLmFwcGVuZENoaWxkKHRoaXMub3ZlcmxheUVsKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJlc3RvcmVBcHBlbmQoKSB7XG4gICAgICAgIGlmICh0aGlzLm92ZXJsYXlFbCAmJiB0aGlzLmFwcGVuZFRvKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5hcHBlbmRUbyA9PT0gJ2JvZHknKVxuICAgICAgICAgICAgICAgIGRvY3VtZW50LmJvZHkucmVtb3ZlQ2hpbGQodGhpcy5vdmVybGF5RWwpO1xuICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKHRoaXMuYXBwZW5kVG8pLnJlbW92ZUNoaWxkKHRoaXMub3ZlcmxheUVsKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGFsaWduT3ZlcmxheSgpIHtcbiAgICAgICAgaWYgKHRoaXMuYXBwZW5kVG8pIHtcbiAgICAgICAgICAgIERvbUhhbmRsZXIuYWJzb2x1dGVQb3NpdGlvbih0aGlzLm92ZXJsYXlFbCwgdGhpcy5jb250YWluZXJFbC5uYXRpdmVFbGVtZW50KTtcbiAgICAgICAgICAgIHRoaXMub3ZlcmxheUVsLnN0eWxlLm1pbldpZHRoID0gRG9tSGFuZGxlci5nZXRPdXRlcldpZHRoKHRoaXMuY29udGFpbmVyRWwubmF0aXZlRWxlbWVudCkgKyAncHgnO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgRG9tSGFuZGxlci5yZWxhdGl2ZVBvc2l0aW9uKHRoaXMub3ZlcmxheUVsLCB0aGlzLmNvbnRhaW5lckVsLm5hdGl2ZUVsZW1lbnQpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgYmluZE91dHNpZGVDbGlja0xpc3RlbmVyKCkge1xuICAgICAgICBpZiAoIXRoaXMub3V0c2lkZUNsaWNrTGlzdGVuZXIpIHtcbiAgICAgICAgICAgIHRoaXMub3V0c2lkZUNsaWNrTGlzdGVuZXIgPSAoZXZlbnQpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5vdmVybGF5VmlzaWJsZSAmJiB0aGlzLm92ZXJsYXlFbCAmJiAhdGhpcy5jb250YWluZXJFbC5uYXRpdmVFbGVtZW50LmNvbnRhaW5zKGV2ZW50LnRhcmdldCkgJiYgIXRoaXMub3ZlcmxheUVsLmNvbnRhaW5zKGV2ZW50LnRhcmdldCkpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5oaWRlKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdGhpcy5vdXRzaWRlQ2xpY2tMaXN0ZW5lcik7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICB1bmJpbmRPdXRzaWRlQ2xpY2tMaXN0ZW5lcigpIHtcbiAgICAgICAgaWYgKHRoaXMub3V0c2lkZUNsaWNrTGlzdGVuZXIpIHtcbiAgICAgICAgICAgIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdGhpcy5vdXRzaWRlQ2xpY2tMaXN0ZW5lcik7XG4gICAgICAgICAgICB0aGlzLm91dHNpZGVDbGlja0xpc3RlbmVyID0gbnVsbDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGJpbmRTY3JvbGxMaXN0ZW5lcigpIHtcbiAgICAgICAgaWYgKCF0aGlzLnNjcm9sbEhhbmRsZXIpIHtcbiAgICAgICAgICAgIHRoaXMuc2Nyb2xsSGFuZGxlciA9IG5ldyBDb25uZWN0ZWRPdmVybGF5U2Nyb2xsSGFuZGxlcih0aGlzLmNvbnRhaW5lckVsLm5hdGl2ZUVsZW1lbnQsICgpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5vdmVybGF5VmlzaWJsZSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmhpZGUoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuc2Nyb2xsSGFuZGxlci5iaW5kU2Nyb2xsTGlzdGVuZXIoKTtcbiAgICB9XG5cbiAgICB1bmJpbmRTY3JvbGxMaXN0ZW5lcigpIHtcbiAgICAgICAgaWYgKHRoaXMuc2Nyb2xsSGFuZGxlcikge1xuICAgICAgICAgICAgdGhpcy5zY3JvbGxIYW5kbGVyLnVuYmluZFNjcm9sbExpc3RlbmVyKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBiaW5kUmVzaXplTGlzdGVuZXIoKSB7XG4gICAgICAgIGlmICghdGhpcy5yZXNpemVMaXN0ZW5lcikge1xuICAgICAgICAgICAgdGhpcy5yZXNpemVMaXN0ZW5lciA9ICgpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5vdmVybGF5VmlzaWJsZSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmhpZGUoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsIHRoaXMucmVzaXplTGlzdGVuZXIpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgdW5iaW5kUmVzaXplTGlzdGVuZXIoKSB7XG4gICAgICAgIGlmICh0aGlzLnJlc2l6ZUxpc3RlbmVyKSB7XG4gICAgICAgICAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcigncmVzaXplJywgdGhpcy5yZXNpemVMaXN0ZW5lcik7XG4gICAgICAgICAgICB0aGlzLnJlc2l6ZUxpc3RlbmVyID0gbnVsbDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIG5nT25EZXN0cm95KCkge1xuICAgICAgICB0aGlzLnJlc3RvcmVBcHBlbmQoKTtcbiAgICAgICAgdGhpcy51bmJpbmRPdXRzaWRlQ2xpY2tMaXN0ZW5lcigpO1xuICAgICAgICB0aGlzLnVuYmluZFJlc2l6ZUxpc3RlbmVyKCk7XG5cbiAgICAgICAgaWYgKHRoaXMuc2Nyb2xsSGFuZGxlcikge1xuICAgICAgICAgICAgdGhpcy5zY3JvbGxIYW5kbGVyLmRlc3Ryb3koKTtcbiAgICAgICAgICAgIHRoaXMuc2Nyb2xsSGFuZGxlciA9IG51bGw7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5vdmVybGF5RWwpIHtcbiAgICAgICAgICAgIFpJbmRleFV0aWxzLmNsZWFyKHRoaXMub3ZlcmxheUVsKTtcbiAgICAgICAgICAgIHRoaXMub3ZlcmxheUVsID0gbnVsbDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGNvbnRhaW5lckNsYXNzKCkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgJ3AtdHJlZXNlbGVjdCBwLWNvbXBvbmVudCBwLWlucHV0d3JhcHBlcic6IHRydWUsXG4gICAgICAgICAgICAncC10cmVlc2VsZWN0LWNoaXAnOiB0aGlzLmRpc3BsYXkgPT09ICdjaGlwJyxcbiAgICAgICAgICAgICdwLWRpc2FibGVkJzogdGhpcy5kaXNhYmxlZCxcbiAgICAgICAgICAgICdwLWZvY3VzJzogdGhpcy5mb2N1c2VkXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBsYWJlbENsYXNzKCkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgJ3AtdHJlZXNlbGVjdC1sYWJlbCc6IHRydWUsXG4gICAgICAgICAgICAncC1wbGFjZWhvbGRlcic6IHRoaXMubGFiZWwgPT09IHRoaXMucGxhY2Vob2xkZXIsXG4gICAgICAgICAgICAncC10cmVlc2VsZWN0LWxhYmVsLWVtcHR5JzogIXRoaXMucGxhY2Vob2xkZXIgJiYgdGhpcy5lbXB0eVZhbHVlXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBnZXQgZW1wdHlNZXNzYWdlVGV4dCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZW1wdHlNZXNzYWdlIHx8IHRoaXMuY29uZmlnLmdldFRyYW5zbGF0aW9uKFRyYW5zbGF0aW9uS2V5cy5FTVBUWV9NRVNTQUdFKTtcbiAgICB9XG5cbiAgICBnZXQgZW1wdHlWYWx1ZSgpIHtcbiAgICAgICAgcmV0dXJuICF0aGlzLnZhbHVlIHx8IE9iamVjdC5rZXlzKHRoaXMudmFsdWUpLmxlbmd0aCA9PT0gMDtcbiAgICB9XG5cbiAgICBnZXQgZW1wdHlPcHRpb25zKCkge1xuICAgICAgICByZXR1cm4gIXRoaXMub3B0aW9ucyB8fCB0aGlzLm9wdGlvbnMubGVuZ3RoID09PSAwO1xuICAgIH1cblxuICAgIGdldCBsYWJlbCgpIHtcbiAgICAgICAgbGV0IHZhbHVlID0gdGhpcy52YWx1ZXx8W107XG4gICAgICAgIHJldHVybiB2YWx1ZS5sZW5ndGggPyB2YWx1ZS5tYXAobm9kZSA9PiBub2RlLmxhYmVsKS5qb2luKCcsICcpIDogKHRoaXMuc2VsZWN0aW9uTW9kZSA9PT0gXCJzaW5nbGVcIiAmJiB0aGlzLnZhbHVlKSA/IHZhbHVlLmxhYmVsIDogdGhpcy5wbGFjZWhvbGRlcjtcbiAgICB9XG59XG5cbkBOZ01vZHVsZSh7XG4gICAgaW1wb3J0czogW0NvbW1vbk1vZHVsZSxSaXBwbGVNb2R1bGUsU2hhcmVkTW9kdWxlLFRyZWVNb2R1bGVdLFxuICAgIGV4cG9ydHM6IFtUcmVlU2VsZWN0LFNoYXJlZE1vZHVsZSxUcmVlTW9kdWxlXSxcbiAgICBkZWNsYXJhdGlvbnM6IFtUcmVlU2VsZWN0XVxufSlcbmV4cG9ydCBjbGFzcyBUcmVlU2VsZWN0TW9kdWxlIHsgfVxuIl19