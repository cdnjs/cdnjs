import * as i0 from '@angular/core';
import { forwardRef, EventEmitter, Component, ChangeDetectionStrategy, ViewEncapsulation, Input, ContentChildren, ViewChild, Output, NgModule } from '@angular/core';
import * as i3 from '@angular/common';
import { CommonModule } from '@angular/common';
import { RippleModule } from 'primeng/ripple';
import * as i1 from 'primeng/api';
import { TranslationKeys, PrimeTemplate, SharedModule } from 'primeng/api';
import { trigger, transition, style, animate } from '@angular/animations';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { DomHandler, ConnectedOverlayScrollHandler } from 'primeng/dom';
import * as i2 from 'primeng/tree';
import { TreeModule } from 'primeng/tree';
import { ZIndexUtils } from 'primeng/utils';

const TREESELECT_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => TreeSelect),
    multi: true
};
class TreeSelect {
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
class TreeSelectModule {
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

/**
 * Generated bundle index. Do not edit.
 */

export { TREESELECT_VALUE_ACCESSOR, TreeSelect, TreeSelectModule };
//# sourceMappingURL=primeng-treeselect.js.map
