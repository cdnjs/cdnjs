import { NgModule, Component, ElementRef, Input, Output, ContentChildren, EventEmitter, ViewChild, ChangeDetectionStrategy, ViewEncapsulation, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { SharedModule, PrimeTemplate, FilterService } from 'primeng/api';
import { DomHandler } from 'primeng/dom';
import { RippleModule } from 'primeng/ripple';
import { DragDropModule, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { UniqueComponentId } from 'primeng/utils';
export class PickList {
    constructor(el, cd, filterService) {
        this.el = el;
        this.cd = cd;
        this.filterService = filterService;
        this.trackBy = (index, item) => item;
        this.showSourceFilter = true;
        this.showTargetFilter = true;
        this.metaKeySelection = true;
        this.showSourceControls = true;
        this.showTargetControls = true;
        this.disabled = false;
        this.filterMatchMode = "contains";
        this.breakpoint = "960px";
        this.onMoveToSource = new EventEmitter();
        this.onMoveAllToSource = new EventEmitter();
        this.onMoveAllToTarget = new EventEmitter();
        this.onMoveToTarget = new EventEmitter();
        this.onSourceReorder = new EventEmitter();
        this.onTargetReorder = new EventEmitter();
        this.onSourceSelect = new EventEmitter();
        this.onTargetSelect = new EventEmitter();
        this.onSourceFilter = new EventEmitter();
        this.onTargetFilter = new EventEmitter();
        this.selectedItemsSource = [];
        this.selectedItemsTarget = [];
        this.id = UniqueComponentId();
        this.SOURCE_LIST = -1;
        this.TARGET_LIST = 1;
    }
    ngOnInit() {
        if (this.responsive) {
            this.createStyle();
        }
    }
    ngAfterContentInit() {
        this.templates.forEach((item) => {
            switch (item.getType()) {
                case 'item':
                    this.itemTemplate = item.template;
                    break;
                case 'emptymessagesource':
                    this.emptyMessageSourceTemplate = item.template;
                    break;
                case 'emptymessagetarget':
                    this.emptyMessageTargetTemplate = item.template;
                    break;
                default:
                    this.itemTemplate = item.template;
                    break;
            }
        });
    }
    ngAfterViewChecked() {
        if (this.movedUp || this.movedDown) {
            let listItems = DomHandler.find(this.reorderedListElement, 'li.p-highlight');
            let listItem;
            if (this.movedUp)
                listItem = listItems[0];
            else
                listItem = listItems[listItems.length - 1];
            DomHandler.scrollInView(this.reorderedListElement, listItem);
            this.movedUp = false;
            this.movedDown = false;
            this.reorderedListElement = null;
        }
    }
    onItemClick(event, item, selectedItems, callback) {
        if (this.disabled) {
            return;
        }
        let index = this.findIndexInSelection(item, selectedItems);
        let selected = (index != -1);
        let metaSelection = this.itemTouched ? false : this.metaKeySelection;
        if (metaSelection) {
            let metaKey = (event.metaKey || event.ctrlKey || event.shiftKey);
            if (selected && metaKey) {
                selectedItems.splice(index, 1);
            }
            else {
                if (!metaKey) {
                    selectedItems.length = 0;
                }
                selectedItems.push(item);
            }
        }
        else {
            if (selected)
                selectedItems.splice(index, 1);
            else
                selectedItems.push(item);
        }
        callback.emit({ originalEvent: event, items: selectedItems });
        this.itemTouched = false;
    }
    onSourceItemDblClick() {
        if (this.disabled) {
            return;
        }
        this.moveRight();
    }
    onTargetItemDblClick() {
        if (this.disabled) {
            return;
        }
        this.moveLeft();
    }
    onFilter(event, data, listType) {
        let query = event.target.value.trim().toLocaleLowerCase(this.filterLocale);
        this.filter(query, data, listType);
    }
    filter(query, data, listType) {
        let searchFields = this.filterBy.split(',');
        if (listType === this.SOURCE_LIST) {
            this.filterValueSource = query;
            this.visibleOptionsSource = this.filterService.filter(data, searchFields, this.filterValueSource, this.filterMatchMode, this.filterLocale);
            this.onSourceFilter.emit({ query: this.filterValueSource, value: this.visibleOptionsSource });
        }
        else if (listType === this.TARGET_LIST) {
            this.filterValueTarget = query;
            this.visibleOptionsTarget = this.filterService.filter(data, searchFields, this.filterValueTarget, this.filterMatchMode, this.filterLocale);
            this.onTargetFilter.emit({ query: this.filterValueTarget, value: this.visibleOptionsTarget });
        }
    }
    isItemVisible(item, listType) {
        if (listType == this.SOURCE_LIST)
            return this.isVisibleInList(this.visibleOptionsSource, item, this.filterValueSource);
        else
            return this.isVisibleInList(this.visibleOptionsTarget, item, this.filterValueTarget);
    }
    isVisibleInList(data, item, filterValue) {
        if (filterValue && filterValue.trim().length) {
            for (let i = 0; i < data.length; i++) {
                if (item == data[i]) {
                    return true;
                }
            }
        }
        else {
            return true;
        }
    }
    onItemTouchEnd(event) {
        if (this.disabled) {
            return;
        }
        this.itemTouched = true;
    }
    sortByIndexInList(items, list) {
        return items.sort((item1, item2) => this.findIndexInList(item1, list) - this.findIndexInList(item2, list));
    }
    moveUp(listElement, list, selectedItems, callback) {
        if (selectedItems && selectedItems.length) {
            selectedItems = this.sortByIndexInList(selectedItems, list);
            for (let i = 0; i < selectedItems.length; i++) {
                let selectedItem = selectedItems[i];
                let selectedItemIndex = this.findIndexInList(selectedItem, list);
                if (selectedItemIndex != 0) {
                    let movedItem = list[selectedItemIndex];
                    let temp = list[selectedItemIndex - 1];
                    list[selectedItemIndex - 1] = movedItem;
                    list[selectedItemIndex] = temp;
                }
                else {
                    break;
                }
            }
            this.movedUp = true;
            this.reorderedListElement = listElement;
            callback.emit({ items: selectedItems });
        }
    }
    moveTop(listElement, list, selectedItems, callback) {
        if (selectedItems && selectedItems.length) {
            selectedItems = this.sortByIndexInList(selectedItems, list);
            for (let i = 0; i < selectedItems.length; i++) {
                let selectedItem = selectedItems[i];
                let selectedItemIndex = this.findIndexInList(selectedItem, list);
                if (selectedItemIndex != 0) {
                    let movedItem = list.splice(selectedItemIndex, 1)[0];
                    list.unshift(movedItem);
                }
                else {
                    break;
                }
            }
            listElement.scrollTop = 0;
            callback.emit({ items: selectedItems });
        }
    }
    moveDown(listElement, list, selectedItems, callback) {
        if (selectedItems && selectedItems.length) {
            selectedItems = this.sortByIndexInList(selectedItems, list);
            for (let i = selectedItems.length - 1; i >= 0; i--) {
                let selectedItem = selectedItems[i];
                let selectedItemIndex = this.findIndexInList(selectedItem, list);
                if (selectedItemIndex != (list.length - 1)) {
                    let movedItem = list[selectedItemIndex];
                    let temp = list[selectedItemIndex + 1];
                    list[selectedItemIndex + 1] = movedItem;
                    list[selectedItemIndex] = temp;
                }
                else {
                    break;
                }
            }
            this.movedDown = true;
            this.reorderedListElement = listElement;
            callback.emit({ items: selectedItems });
        }
    }
    moveBottom(listElement, list, selectedItems, callback) {
        if (selectedItems && selectedItems.length) {
            selectedItems = this.sortByIndexInList(selectedItems, list);
            for (let i = selectedItems.length - 1; i >= 0; i--) {
                let selectedItem = selectedItems[i];
                let selectedItemIndex = this.findIndexInList(selectedItem, list);
                if (selectedItemIndex != (list.length - 1)) {
                    let movedItem = list.splice(selectedItemIndex, 1)[0];
                    list.push(movedItem);
                }
                else {
                    break;
                }
            }
            listElement.scrollTop = listElement.scrollHeight;
            callback.emit({ items: selectedItems });
        }
    }
    moveRight() {
        if (this.selectedItemsSource && this.selectedItemsSource.length) {
            for (let i = 0; i < this.selectedItemsSource.length; i++) {
                let selectedItem = this.selectedItemsSource[i];
                if (this.findIndexInList(selectedItem, this.target) == -1) {
                    this.target.push(this.source.splice(this.findIndexInList(selectedItem, this.source), 1)[0]);
                }
            }
            this.onMoveToTarget.emit({
                items: this.selectedItemsSource
            });
            this.selectedItemsSource = [];
            if (this.filterValueTarget) {
                this.filter(this.filterValueTarget, this.target, this.TARGET_LIST);
            }
        }
    }
    moveAllRight() {
        if (this.source) {
            let movedItems = [];
            for (let i = 0; i < this.source.length; i++) {
                if (this.isItemVisible(this.source[i], this.SOURCE_LIST)) {
                    let removedItem = this.source.splice(i, 1)[0];
                    this.target.push(removedItem);
                    movedItems.push(removedItem);
                    i--;
                }
            }
            this.onMoveAllToTarget.emit({
                items: movedItems
            });
            this.selectedItemsSource = [];
            if (this.filterValueTarget) {
                this.filter(this.filterValueTarget, this.target, this.TARGET_LIST);
            }
        }
    }
    moveLeft() {
        if (this.selectedItemsTarget && this.selectedItemsTarget.length) {
            for (let i = 0; i < this.selectedItemsTarget.length; i++) {
                let selectedItem = this.selectedItemsTarget[i];
                if (this.findIndexInList(selectedItem, this.source) == -1) {
                    this.source.push(this.target.splice(this.findIndexInList(selectedItem, this.target), 1)[0]);
                }
            }
            this.onMoveToSource.emit({
                items: this.selectedItemsTarget
            });
            this.selectedItemsTarget = [];
            if (this.filterValueSource) {
                this.filter(this.filterValueSource, this.source, this.SOURCE_LIST);
            }
        }
    }
    moveAllLeft() {
        if (this.target) {
            let movedItems = [];
            for (let i = 0; i < this.target.length; i++) {
                if (this.isItemVisible(this.target[i], this.TARGET_LIST)) {
                    let removedItem = this.target.splice(i, 1)[0];
                    this.source.push(removedItem);
                    movedItems.push(removedItem);
                    i--;
                }
            }
            this.onMoveAllToSource.emit({
                items: movedItems
            });
            this.selectedItemsTarget = [];
            if (this.filterValueSource) {
                this.filter(this.filterValueSource, this.source, this.SOURCE_LIST);
            }
        }
    }
    isSelected(item, selectedItems) {
        return this.findIndexInSelection(item, selectedItems) != -1;
    }
    findIndexInSelection(item, selectedItems) {
        return this.findIndexInList(item, selectedItems);
    }
    findIndexInList(item, list) {
        let index = -1;
        if (list) {
            for (let i = 0; i < list.length; i++) {
                if (list[i] == item) {
                    index = i;
                    break;
                }
            }
        }
        return index;
    }
    onDrop(event, listType) {
        if (event.previousContainer === event.container) {
            moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
            if (listType == this.SOURCE_LIST)
                this.onSourceReorder.emit([event.item.data]);
            else
                this.onTargetReorder.emit([event.item.data]);
        }
        else {
            transferArrayItem(event.previousContainer.data, event.container.data, event.previousIndex, event.currentIndex);
            if (listType == this.SOURCE_LIST)
                this.onMoveToSource.emit([event.item.data]);
            else
                this.onMoveToTarget.emit([event.item.data]);
        }
    }
    resetFilter() {
        this.visibleOptionsSource = null;
        this.filterValueSource = null;
        this.visibleOptionsTarget = null;
        this.filterValueTarget = null;
        this.sourceFilterViewChild.nativeElement.value = '';
        this.targetFilterViewChild.nativeElement.value = '';
    }
    onItemKeydown(event, item, selectedItems, callback) {
        let listItem = event.currentTarget;
        switch (event.which) {
            //down
            case 40:
                var nextItem = this.findNextItem(listItem);
                if (nextItem) {
                    nextItem.focus();
                }
                event.preventDefault();
                break;
            //up
            case 38:
                var prevItem = this.findPrevItem(listItem);
                if (prevItem) {
                    prevItem.focus();
                }
                event.preventDefault();
                break;
            //enter
            case 13:
                this.onItemClick(event, item, selectedItems, callback);
                event.preventDefault();
                break;
        }
    }
    findNextItem(item) {
        let nextItem = item.nextElementSibling;
        if (nextItem)
            return !DomHandler.hasClass(nextItem, 'p-picklist-item') || DomHandler.isHidden(nextItem) ? this.findNextItem(nextItem) : nextItem;
        else
            return null;
    }
    findPrevItem(item) {
        let prevItem = item.previousElementSibling;
        if (prevItem)
            return !DomHandler.hasClass(prevItem, 'p-picklist-item') || DomHandler.isHidden(prevItem) ? this.findPrevItem(prevItem) : prevItem;
        else
            return null;
    }
    createStyle() {
        if (!this.styleElement) {
            this.el.nativeElement.children[0].setAttribute(this.id, '');
            this.styleElement = document.createElement('style');
            this.styleElement.type = 'text/css';
            document.head.appendChild(this.styleElement);
            let innerHTML = `
            @media screen and (max-width: ${this.breakpoint}) {
                .p-picklist[${this.id}] {
                    flex-direction: column;
                }
            
                .p-picklist[${this.id}] .p-picklist-buttons {
                    padding: var(--content-padding);
                    flex-direction: row;
                }
            
                .p-picklist[${this.id}] .p-picklist-buttons .p-button {
                    margin-right: var(--inline-spacing);
                    margin-bottom: 0;
                }
            
                .p-picklist[${this.id}] .p-picklist-buttons .p-button:last-child {
                    margin-right: 0;
                }
            
                .p-picklist[${this.id}] .pi-angle-right:before {
                    content: "\\e930"
                }
            
                .p-picklist[${this.id}] .pi-angle-double-right:before {
                    content: "\\e92c"
                }
            
                .p-picklist[${this.id}] .pi-angle-left:before {
                    content: "\\e933"
                }
            
                .p-picklist[${this.id}] .pi-angle-double-left:before {
                    content: "\\e92f"
                }
            }
            `;
            this.styleElement.innerHTML = innerHTML;
        }
    }
    destroyStyle() {
        if (this.styleElement) {
            document.head.removeChild(this.styleElement);
            this.styleElement = null;
            ``;
        }
    }
    ngOnDestroy() {
        this.destroyStyle();
    }
}
PickList.decorators = [
    { type: Component, args: [{
                selector: 'p-pickList',
                template: `
        <div [class]="styleClass" [ngStyle]="style" [ngClass]="'p-picklist p-component'" cdkDropListGroup>
            <div class="p-picklist-buttons p-picklist-source-controls" *ngIf="showSourceControls">
                <button type="button" pButton pRipple icon="pi pi-angle-up" [disabled]="disabled" (click)="moveUp(sourcelist,source,selectedItemsSource,onSourceReorder)"></button>
                <button type="button" pButton pRipple icon="pi pi-angle-double-up" [disabled]="disabled" (click)="moveTop(sourcelist,source,selectedItemsSource,onSourceReorder)"></button>
                <button type="button" pButton pRipple icon="pi pi-angle-down" [disabled]="disabled" (click)="moveDown(sourcelist,source,selectedItemsSource,onSourceReorder)"></button>
                <button type="button" pButton pRipple icon="pi pi-angle-double-down" [disabled]="disabled" (click)="moveBottom(sourcelist,source,selectedItemsSource,onSourceReorder)"></button>
            </div>
            <div class="p-picklist-list-wrapper p-picklist-source-wrapper">
                <div class="p-picklist-header" *ngIf="sourceHeader">
                    <div class="p-picklist-title">{{sourceHeader}}</div>
                </div>
                <div class="p-picklist-filter-container" *ngIf="filterBy && showSourceFilter !== false">
                    <div class="p-picklist-filter">
                        <input #sourceFilter type="text" role="textbox" (keyup)="onFilter($event,source,SOURCE_LIST)" class="p-picklist-filter-input p-inputtext p-component" [disabled]="disabled" [attr.placeholder]="sourceFilterPlaceholder" [attr.aria-label]="ariaSourceFilterLabel">
                        <span class="p-picklist-filter-icon pi pi-search"></span>
                    </div>
                </div>
                
                <ul #sourcelist class="p-picklist-list p-picklist-source" cdkDropList [cdkDropListData]="source" (cdkDropListDropped)="onDrop($event, SOURCE_LIST)"
                    [ngStyle]="sourceStyle" role="listbox" aria-multiselectable="multiple">
                    <ng-template ngFor let-item [ngForOf]="source" [ngForTrackBy]="sourceTrackBy || trackBy" let-i="index" let-l="last">
                        <li [ngClass]="{'p-picklist-item':true,'p-highlight':isSelected(item,selectedItemsSource),'p-disabled': disabled}" pRipple cdkDrag [cdkDragData]="item"
                            (click)="onItemClick($event,item,selectedItemsSource,onSourceSelect)" (dblclick)="onSourceItemDblClick()" (touchend)="onItemTouchEnd($event)" (keydown)="onItemKeydown($event,item,selectedItemsSource,onSourceSelect)"
                            [style.display]="isItemVisible(item, SOURCE_LIST) ? 'block' : 'none'" tabindex="0" role="option" [attr.aria-selected]="isSelected(item, selectedItemsSource)">
                            <ng-container *ngTemplateOutlet="itemTemplate; context: {$implicit: item, index: i}"></ng-container>
                        </li>
                    </ng-template>
                    <ng-container *ngIf="(source == null || source.length === 0) && emptyMessageSourceTemplate">
                        <li class="p-picklist-empty-message">
                            <ng-container *ngTemplateOutlet="emptyMessageSourceTemplate"></ng-container>
                        </li>
                    </ng-container>
                </ul>
            </div>
            <div class="p-picklist-buttons p-picklist-transfer-buttons">
                <button type="button" pButton pRipple icon="pi pi-angle-right" [disabled]="disabled" (click)="moveRight()"></button>
                <button type="button" pButton pRipple icon="pi pi-angle-double-right" [disabled]="disabled" (click)="moveAllRight()"></button>
                <button type="button" pButton pRipple icon="pi pi-angle-left" [disabled]="disabled" (click)="moveLeft()"></button>
                <button type="button" pButton pRipple icon="pi pi-angle-double-left" [disabled]="disabled" (click)="moveAllLeft()"></button>
            </div>
            <div class="p-picklist-list-wrapper p-picklist-target-wrapper">
                <div class="p-picklist-header" *ngIf="targetHeader">
                    <div class="p-picklist-title" *ngIf="targetHeader">{{targetHeader}}</div>
                </div>
                <div class="p-picklist-filter-container" *ngIf="filterBy && showTargetFilter !== false">
                    <div class="p-picklist-filter">
                        <input #targetFilter type="text" role="textbox" (keyup)="onFilter($event,target,TARGET_LIST)" class="p-picklist-filter-input p-inputtext p-component" [disabled]="disabled" [attr.placeholder]="targetFilterPlaceholder" [attr.aria-label]="ariaTargetFilterLabel">
                        <span class="p-picklist-filter-icon pi pi-search"></span>
                    </div>
                </div>
                <ul #targetlist class="p-picklist-list p-picklist-target" cdkDropList [cdkDropListData]="target" (cdkDropListDropped)="onDrop($event, TARGET_LIST)"
                    [ngStyle]="targetStyle" role="listbox" aria-multiselectable="multiple">
                    <ng-template ngFor let-item [ngForOf]="target" [ngForTrackBy]="targetTrackBy || trackBy" let-i="index" let-l="last">
                        <li [ngClass]="{'p-picklist-item':true,'p-highlight':isSelected(item,selectedItemsTarget), 'p-disabled': disabled}" pRipple cdkDrag [cdkDragData]="item"
                            (click)="onItemClick($event,item,selectedItemsTarget,onTargetSelect)" (dblclick)="onTargetItemDblClick()" (touchend)="onItemTouchEnd($event)" (keydown)="onItemKeydown($event,item,selectedItemsTarget,onTargetSelect)"
                            [style.display]="isItemVisible(item, TARGET_LIST) ? 'block' : 'none'" tabindex="0" role="option" [attr.aria-selected]="isSelected(item, selectedItemsTarget)">
                            <ng-container *ngTemplateOutlet="itemTemplate; context: {$implicit: item, index: i}"></ng-container>
                        </li>
                    </ng-template>
                    <ng-container *ngIf="(target == null || target.length === 0) && emptyMessageTargetTemplate">
                        <li class="p-picklist-empty-message">
                            <ng-container *ngTemplateOutlet="emptyMessageTargetTemplate"></ng-container>
                        </li>
                    </ng-container>
                </ul>
            </div>
            <div class="p-picklist-buttons p-picklist-target-controls" *ngIf="showTargetControls">
                <button type="button" pButton pRipple icon="pi pi-angle-up" [disabled]="disabled" (click)="moveUp(targetlist,target,selectedItemsTarget,onTargetReorder)"></button>
                <button type="button" pButton pRipple icon="pi pi-angle-double-up" [disabled]="disabled" (click)="moveTop(targetlist,target,selectedItemsTarget,onTargetReorder)"></button>
                <button type="button" pButton pRipple icon="pi pi-angle-down" [disabled]="disabled" (click)="moveDown(targetlist,target,selectedItemsTarget,onTargetReorder)"></button>
                <button type="button" pButton pRipple icon="pi pi-angle-double-down" [disabled]="disabled" (click)="moveBottom(targetlist,target,selectedItemsTarget,onTargetReorder)"></button>
            </div>
        </div>
    `,
                changeDetection: ChangeDetectionStrategy.OnPush,
                encapsulation: ViewEncapsulation.None,
                styles: [".p-picklist{display:flex}.p-picklist-buttons{display:flex;flex-direction:column;justify-content:center}.p-picklist-list-wrapper{flex:1 1 50%}.p-picklist-list{list-style-type:none;margin:0;min-height:12rem;overflow:auto;padding:0}.p-picklist-item{cursor:pointer;overflow:hidden;position:relative}.p-picklist-item:not(.cdk-drag-disabled){cursor:move}.p-picklist-item.cdk-drag-placeholder{opacity:0}.p-picklist-item.cdk-drag-animating{transition:transform .25s cubic-bezier(0,0,.2,1)}.p-picklist-filter{position:relative}.p-picklist-filter-icon{margin-top:-.5rem;position:absolute;top:50%}.p-picklist-filter-input{width:100%}.p-picklist-list.cdk-drop-list-dragging .p-picklist-item:not(.cdk-drag-placeholder){transition:transform .25s cubic-bezier(0,0,.2,1)}"]
            },] }
];
PickList.ctorParameters = () => [
    { type: ElementRef },
    { type: ChangeDetectorRef },
    { type: FilterService }
];
PickList.propDecorators = {
    source: [{ type: Input }],
    target: [{ type: Input }],
    sourceHeader: [{ type: Input }],
    targetHeader: [{ type: Input }],
    responsive: [{ type: Input }],
    filterBy: [{ type: Input }],
    filterLocale: [{ type: Input }],
    trackBy: [{ type: Input }],
    sourceTrackBy: [{ type: Input }],
    targetTrackBy: [{ type: Input }],
    showSourceFilter: [{ type: Input }],
    showTargetFilter: [{ type: Input }],
    metaKeySelection: [{ type: Input }],
    dragdrop: [{ type: Input }],
    style: [{ type: Input }],
    styleClass: [{ type: Input }],
    sourceStyle: [{ type: Input }],
    targetStyle: [{ type: Input }],
    showSourceControls: [{ type: Input }],
    showTargetControls: [{ type: Input }],
    sourceFilterPlaceholder: [{ type: Input }],
    targetFilterPlaceholder: [{ type: Input }],
    disabled: [{ type: Input }],
    ariaSourceFilterLabel: [{ type: Input }],
    ariaTargetFilterLabel: [{ type: Input }],
    filterMatchMode: [{ type: Input }],
    breakpoint: [{ type: Input }],
    onMoveToSource: [{ type: Output }],
    onMoveAllToSource: [{ type: Output }],
    onMoveAllToTarget: [{ type: Output }],
    onMoveToTarget: [{ type: Output }],
    onSourceReorder: [{ type: Output }],
    onTargetReorder: [{ type: Output }],
    onSourceSelect: [{ type: Output }],
    onTargetSelect: [{ type: Output }],
    onSourceFilter: [{ type: Output }],
    onTargetFilter: [{ type: Output }],
    listViewSourceChild: [{ type: ViewChild, args: ['sourcelist',] }],
    listViewTargetChild: [{ type: ViewChild, args: ['targetlist',] }],
    sourceFilterViewChild: [{ type: ViewChild, args: ['sourceFilter',] }],
    targetFilterViewChild: [{ type: ViewChild, args: ['targetFilter',] }],
    templates: [{ type: ContentChildren, args: [PrimeTemplate,] }]
};
export class PickListModule {
}
PickListModule.decorators = [
    { type: NgModule, args: [{
                imports: [CommonModule, ButtonModule, SharedModule, RippleModule, DragDropModule],
                exports: [PickList, SharedModule, DragDropModule],
                declarations: [PickList]
            },] }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGlja2xpc3QuanMiLCJzb3VyY2VSb290IjoiLi4vLi4vLi4vc3JjL2FwcC9jb21wb25lbnRzL3BpY2tsaXN0LyIsInNvdXJjZXMiOlsicGlja2xpc3QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFFBQVEsRUFBRSxTQUFTLEVBQUUsVUFBVSxFQUFzQyxLQUFLLEVBQUUsTUFBTSxFQUFFLGVBQWUsRUFBMEIsWUFBWSxFQUFFLFNBQVMsRUFBRSx1QkFBdUIsRUFBRSxpQkFBaUIsRUFBRSxpQkFBaUIsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUNuUCxPQUFPLEVBQUMsWUFBWSxFQUFDLE1BQU0saUJBQWlCLENBQUM7QUFDN0MsT0FBTyxFQUFDLFlBQVksRUFBQyxNQUFNLGdCQUFnQixDQUFDO0FBQzVDLE9BQU8sRUFBQyxZQUFZLEVBQUMsYUFBYSxFQUFDLGFBQWEsRUFBQyxNQUFNLGFBQWEsQ0FBQztBQUNyRSxPQUFPLEVBQUMsVUFBVSxFQUFDLE1BQU0sYUFBYSxDQUFDO0FBQ3ZDLE9BQU8sRUFBQyxZQUFZLEVBQUMsTUFBTSxnQkFBZ0IsQ0FBQztBQUM1QyxPQUFPLEVBQWMsY0FBYyxFQUFFLGVBQWUsRUFBRSxpQkFBaUIsRUFBQyxNQUFNLHdCQUF3QixDQUFDO0FBQ3ZHLE9BQU8sRUFBQyxpQkFBaUIsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQW1GaEQsTUFBTSxPQUFPLFFBQVE7SUEwSGpCLFlBQW1CLEVBQWMsRUFBUyxFQUFxQixFQUFTLGFBQTRCO1FBQWpGLE9BQUUsR0FBRixFQUFFLENBQVk7UUFBUyxPQUFFLEdBQUYsRUFBRSxDQUFtQjtRQUFTLGtCQUFhLEdBQWIsYUFBYSxDQUFlO1FBMUczRixZQUFPLEdBQWEsQ0FBQyxLQUFhLEVBQUUsSUFBUyxFQUFFLEVBQUUsQ0FBQyxJQUFJLENBQUM7UUFNdkQscUJBQWdCLEdBQVksSUFBSSxDQUFDO1FBRWpDLHFCQUFnQixHQUFZLElBQUksQ0FBQztRQUVqQyxxQkFBZ0IsR0FBWSxJ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QkFBaUI7WUFHekwsYUFBYTs7O3FCQXlGM0MsS0FBSztxQkFFTCxLQUFLOzJCQUVMLEtBQUs7MkJBRUwsS0FBSzt5QkFFTCxLQUFLO3VCQUVMLEtBQUs7MkJBRUwsS0FBSztzQkFFTCxLQUFLOzRCQUVMLEtBQUs7NEJBRUwsS0FBSzsrQkFFTCxLQUFLOytCQUVMLEtBQUs7K0JBRUwsS0FBSzt1QkFFTCxLQUFLO29CQUVMLEtBQUs7eUJBRUwsS0FBSzswQkFFTCxLQUFLOzBCQUVMLEtBQUs7aUNBRUwsS0FBSztpQ0FFTCxLQUFLO3NDQUVMLEtBQUs7c0NBRUwsS0FBSzt1QkFFTCxLQUFLO29DQUVMLEtBQUs7b0NBRUwsS0FBSzs4QkFFTCxLQUFLO3lCQUVMLEtBQUs7NkJBRUwsTUFBTTtnQ0FFTixNQUFNO2dDQUVOLE1BQU07NkJBRU4sTUFBTTs4QkFFTixNQUFNOzhCQUVOLE1BQU07NkJBRU4sTUFBTTs2QkFFTixNQUFNOzZCQUVOLE1BQU07NkJBRU4sTUFBTTtrQ0FFTixTQUFTLFNBQUMsWUFBWTtrQ0FFdEIsU0FBUyxTQUFDLFlBQVk7b0NBRXRCLFNBQVMsU0FBQyxjQUFjO29DQUV4QixTQUFTLFNBQUMsY0FBYzt3QkFFeEIsZUFBZSxTQUFDLGFBQWE7O0FBd2hCbEMsTUFBTSxPQUFPLGNBQWM7OztZQUwxQixRQUFRLFNBQUM7Z0JBQ04sT0FBTyxFQUFFLENBQUMsWUFBWSxFQUFDLFlBQVksRUFBQyxZQUFZLEVBQUMsWUFBWSxFQUFDLGNBQWMsQ0FBQztnQkFDN0UsT0FBTyxFQUFFLENBQUMsUUFBUSxFQUFDLFlBQVksRUFBQyxjQUFjLENBQUM7Z0JBQy9DLFlBQVksRUFBRSxDQUFDLFFBQVEsQ0FBQzthQUMzQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5nTW9kdWxlLCBDb21wb25lbnQsIEVsZW1lbnRSZWYsIEFmdGVyQ29udGVudEluaXQsIEFmdGVyVmlld0NoZWNrZWQsIElucHV0LCBPdXRwdXQsIENvbnRlbnRDaGlsZHJlbiwgUXVlcnlMaXN0LCBUZW1wbGF0ZVJlZiwgRXZlbnRFbWl0dGVyLCBWaWV3Q2hpbGQsIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LCBWaWV3RW5jYXBzdWxhdGlvbiwgQ2hhbmdlRGV0ZWN0b3JSZWZ9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtDb21tb25Nb2R1bGV9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQge0J1dHRvbk1vZHVsZX0gZnJvbSAncHJpbWVuZy9idXR0b24nO1xuaW1wb3J0IHtTaGFyZWRNb2R1bGUsUHJpbWVUZW1wbGF0ZSxGaWx0ZXJTZXJ2aWNlfSBmcm9tICdwcmltZW5nL2FwaSc7XG5pbXBvcnQge0RvbUhhbmRsZXJ9IGZyb20gJ3ByaW1lbmcvZG9tJztcbmltcG9ydCB7UmlwcGxlTW9kdWxlfSBmcm9tICdwcmltZW5nL3JpcHBsZSc7XG5pbXBvcnQge0Nka0RyYWdEcm9wLCBEcmFnRHJvcE1vZHVsZSwgbW92ZUl0ZW1JbkFycmF5LCB0cmFuc2ZlckFycmF5SXRlbX0gZnJvbSAnQGFuZ3VsYXIvY2RrL2RyYWctZHJvcCc7XG5pbXBvcnQge1VuaXF1ZUNvbXBvbmVudElkfSBmcm9tICdwcmltZW5nL3V0aWxzJztcblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICdwLXBpY2tMaXN0JyxcbiAgICB0ZW1wbGF0ZTogYFxuICAgICAgICA8ZGl2IFtjbGFzc109XCJzdHlsZUNsYXNzXCIgW25nU3R5bGVdPVwic3R5bGVcIiBbbmdDbGFzc109XCIncC1waWNrbGlzdCBwLWNvbXBvbmVudCdcIiBjZGtEcm9wTGlzdEdyb3VwPlxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cInAtcGlja2xpc3QtYnV0dG9ucyBwLXBpY2tsaXN0LXNvdXJjZS1jb250cm9sc1wiICpuZ0lmPVwic2hvd1NvdXJjZUNvbnRyb2xzXCI+XG4gICAgICAgICAgICAgICAgPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgcEJ1dHRvbiBwUmlwcGxlIGljb249XCJwaSBwaS1hbmdsZS11cFwiIFtkaXNhYmxlZF09XCJkaXNhYmxlZFwiIChjbGljayk9XCJtb3ZlVXAoc291cmNlbGlzdCxzb3VyY2Usc2VsZWN0ZWRJdGVtc1NvdXJjZSxvblNvdXJjZVJlb3JkZXIpXCI+PC9idXR0b24+XG4gICAgICAgICAgICAgICAgPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgcEJ1dHRvbiBwUmlwcGxlIGljb249XCJwaSBwaS1hbmdsZS1kb3VibGUtdXBcIiBbZGlzYWJsZWRdPVwiZGlzYWJsZWRcIiAoY2xpY2spPVwibW92ZVRvcChzb3VyY2VsaXN0LHNvdXJjZSxzZWxlY3RlZEl0ZW1zU291cmNlLG9uU291cmNlUmVvcmRlcilcIj48L2J1dHRvbj5cbiAgICAgICAgICAgICAgICA8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBwQnV0dG9uIHBSaXBwbGUgaWNvbj1cInBpIHBpLWFuZ2xlLWRvd25cIiBbZGlzYWJsZWRdPVwiZGlzYWJsZWRcIiAoY2xpY2spPVwibW92ZURvd24oc291cmNlbGlzdCxzb3VyY2Usc2VsZWN0ZWRJdGVtc1NvdXJjZSxvblNvdXJjZVJlb3JkZXIpXCI+PC9idXR0b24+XG4gICAgICAgICAgICAgICAgPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgcEJ1dHRvbiBwUmlwcGxlIGljb249XCJwaSBwaS1hbmdsZS1kb3VibGUtZG93blwiIFtkaXNhYmxlZF09XCJkaXNhYmxlZFwiIChjbGljayk9XCJtb3ZlQm90dG9tKHNvdXJjZWxpc3Qsc291cmNlLHNlbGVjdGVkSXRlbXNTb3VyY2Usb25Tb3VyY2VSZW9yZGVyKVwiPjwvYnV0dG9uPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwicC1waWNrbGlzdC1saXN0LXdyYXBwZXIgcC1waWNrbGlzdC1zb3VyY2Utd3JhcHBlclwiPlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJwLXBpY2tsaXN0LWhlYWRlclwiICpuZ0lmPVwic291cmNlSGVhZGVyXCI+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJwLXBpY2tsaXN0LXRpdGxlXCI+e3tzb3VyY2VIZWFkZXJ9fTwvZGl2PlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJwLXBpY2tsaXN0LWZpbHRlci1jb250YWluZXJcIiAqbmdJZj1cImZpbHRlckJ5ICYmIHNob3dTb3VyY2VGaWx0ZXIgIT09IGZhbHNlXCI+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJwLXBpY2tsaXN0LWZpbHRlclwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGlucHV0ICNzb3VyY2VGaWx0ZXIgdHlwZT1cInRleHRcIiByb2xlPVwidGV4dGJveFwiIChrZXl1cCk9XCJvbkZpbHRlcigkZXZlbnQsc291cmNlLFNPVVJDRV9MSVNUKVwiIGNsYXNzPVwicC1waWNrbGlzdC1maWx0ZXItaW5wdXQgcC1pbnB1dHRleHQgcC1jb21wb25lbnRcIiBbZGlzYWJsZWRdPVwiZGlzYWJsZWRcIiBbYXR0ci5wbGFjZWhvbGRlcl09XCJzb3VyY2VGaWx0ZXJQbGFjZWhvbGRlclwiIFthdHRyLmFyaWEtbGFiZWxdPVwiYXJpYVNvdXJjZUZpbHRlckxhYmVsXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cInAtcGlja2xpc3QtZmlsdGVyLWljb24gcGkgcGktc2VhcmNoXCI+PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICA8dWwgI3NvdXJjZWxpc3QgY2xhc3M9XCJwLXBpY2tsaXN0LWxpc3QgcC1waWNrbGlzdC1zb3VyY2VcIiBjZGtEcm9wTGlzdCBbY2RrRHJvcExpc3REYXRhXT1cInNvdXJjZVwiIChjZGtEcm9wTGlzdERyb3BwZWQpPVwib25Ecm9wKCRldmVudCwgU09VUkNFX0xJU1QpXCJcbiAgICAgICAgICAgICAgICAgICAgW25nU3R5bGVdPVwic291cmNlU3R5bGVcIiByb2xlPVwibGlzdGJveFwiIGFyaWEtbXVsdGlzZWxlY3RhYmxlPVwibXVsdGlwbGVcIj5cbiAgICAgICAgICAgICAgICAgICAgPG5nLXRlbXBsYXRlIG5nRm9yIGxldC1pdGVtIFtuZ0Zvck9mXT1cInNvdXJjZVwiIFtuZ0ZvclRyYWNrQnldPVwic291cmNlVHJhY2tCeSB8fCB0cmFja0J5XCIgbGV0LWk9XCJpbmRleFwiIGxldC1sPVwibGFzdFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGxpIFtuZ0NsYXNzXT1cInsncC1waWNrbGlzdC1pdGVtJzp0cnVlLCdwLWhpZ2hsaWdodCc6aXNTZWxlY3RlZChpdGVtLHNlbGVjdGVkSXRlbXNTb3VyY2UpLCdwLWRpc2FibGVkJzogZGlzYWJsZWR9XCIgcFJpcHBsZSBjZGtEcmFnIFtjZGtEcmFnRGF0YV09XCJpdGVtXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAoY2xpY2spPVwib25JdGVtQ2xpY2soJGV2ZW50LGl0ZW0sc2VsZWN0ZWRJdGVtc1NvdXJjZSxvblNvdXJjZVNlbGVjdClcIiAoZGJsY2xpY2spPVwib25Tb3VyY2VJdGVtRGJsQ2xpY2soKVwiICh0b3VjaGVuZCk9XCJvbkl0ZW1Ub3VjaEVuZCgkZXZlbnQpXCIgKGtleWRvd24pPVwib25JdGVtS2V5ZG93bigkZXZlbnQsaXRlbSxzZWxlY3RlZEl0ZW1zU291cmNlLG9uU291cmNlU2VsZWN0KVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgW3N0eWxlLmRpc3BsYXldPVwiaXNJdGVtVmlzaWJsZShpdGVtLCBTT1VSQ0VfTElTVCkgPyAnYmxvY2snIDogJ25vbmUnXCIgdGFiaW5kZXg9XCIwXCIgcm9sZT1cIm9wdGlvblwiIFthdHRyLmFyaWEtc2VsZWN0ZWRdPVwiaXNTZWxlY3RlZChpdGVtLCBzZWxlY3RlZEl0ZW1zU291cmNlKVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxuZy1jb250YWluZXIgKm5nVGVtcGxhdGVPdXRsZXQ9XCJpdGVtVGVtcGxhdGU7IGNvbnRleHQ6IHskaW1wbGljaXQ6IGl0ZW0sIGluZGV4OiBpfVwiPjwvbmctY29udGFpbmVyPlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9saT5cbiAgICAgICAgICAgICAgICAgICAgPC9uZy10ZW1wbGF0ZT5cbiAgICAgICAgICAgICAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdJZj1cIihzb3VyY2UgPT0gbnVsbCB8fCBzb3VyY2UubGVuZ3RoID09PSAwKSAmJiBlbXB0eU1lc3NhZ2VTb3VyY2VUZW1wbGF0ZVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGxpIGNsYXNzPVwicC1waWNrbGlzdC1lbXB0eS1tZXNzYWdlXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdUZW1wbGF0ZU91dGxldD1cImVtcHR5TWVzc2FnZVNvdXJjZVRlbXBsYXRlXCI+PC9uZy1jb250YWluZXI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L2xpPlxuICAgICAgICAgICAgICAgICAgICA8L25nLWNvbnRhaW5lcj5cbiAgICAgICAgICAgICAgICA8L3VsPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwicC1waWNrbGlzdC1idXR0b25zIHAtcGlja2xpc3QtdHJhbnNmZXItYnV0dG9uc1wiPlxuICAgICAgICAgICAgICAgIDxidXR0b24gdHlwZT1cImJ1dHRvblwiIHBCdXR0b24gcFJpcHBsZSBpY29uPVwicGkgcGktYW5nbGUtcmlnaHRcIiBbZGlzYWJsZWRdPVwiZGlzYWJsZWRcIiAoY2xpY2spPVwibW92ZVJpZ2h0KClcIj48L2J1dHRvbj5cbiAgICAgICAgICAgICAgICA8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBwQnV0dG9uIHBSaXBwbGUgaWNvbj1cInBpIHBpLWFuZ2xlLWRvdWJsZS1yaWdodFwiIFtkaXNhYmxlZF09XCJkaXNhYmxlZFwiIChjbGljayk9XCJtb3ZlQWxsUmlnaHQoKVwiPjwvYnV0dG9uPlxuICAgICAgICAgICAgICAgIDxidXR0b24gdHlwZT1cImJ1dHRvblwiIHBCdXR0b24gcFJpcHBsZSBpY29uPVwicGkgcGktYW5nbGUtbGVmdFwiIFtkaXNhYmxlZF09XCJkaXNhYmxlZFwiIChjbGljayk9XCJtb3ZlTGVmdCgpXCI+PC9idXR0b24+XG4gICAgICAgICAgICAgICAgPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgcEJ1dHRvbiBwUmlwcGxlIGljb249XCJwaSBwaS1hbmdsZS1kb3VibGUtbGVmdFwiIFtkaXNhYmxlZF09XCJkaXNhYmxlZFwiIChjbGljayk9XCJtb3ZlQWxsTGVmdCgpXCI+PC9idXR0b24+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJwLXBpY2tsaXN0LWxpc3Qtd3JhcHBlciBwLXBpY2tsaXN0LXRhcmdldC13cmFwcGVyXCI+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInAtcGlja2xpc3QtaGVhZGVyXCIgKm5nSWY9XCJ0YXJnZXRIZWFkZXJcIj5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInAtcGlja2xpc3QtdGl0bGVcIiAqbmdJZj1cInRhcmdldEhlYWRlclwiPnt7dGFyZ2V0SGVhZGVyfX08L2Rpdj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwicC1waWNrbGlzdC1maWx0ZXItY29udGFpbmVyXCIgKm5nSWY9XCJmaWx0ZXJCeSAmJiBzaG93VGFyZ2V0RmlsdGVyICE9PSBmYWxzZVwiPlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwicC1waWNrbGlzdC1maWx0ZXJcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxpbnB1dCAjdGFyZ2V0RmlsdGVyIHR5cGU9XCJ0ZXh0XCIgcm9sZT1cInRleHRib3hcIiAoa2V5dXApPVwib25GaWx0ZXIoJGV2ZW50LHRhcmdldCxUQVJHRVRfTElTVClcIiBjbGFzcz1cInAtcGlja2xpc3QtZmlsdGVyLWlucHV0IHAtaW5wdXR0ZXh0IHAtY29tcG9uZW50XCIgW2Rpc2FibGVkXT1cImRpc2FibGVkXCIgW2F0dHIucGxhY2Vob2xkZXJdPVwidGFyZ2V0RmlsdGVyUGxhY2Vob2xkZXJcIiBbYXR0ci5hcmlhLWxhYmVsXT1cImFyaWFUYXJnZXRGaWx0ZXJMYWJlbFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJwLXBpY2tsaXN0LWZpbHRlci1pY29uIHBpIHBpLXNlYXJjaFwiPjwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPHVsICN0YXJnZXRsaXN0IGNsYXNzPVwicC1waWNrbGlzdC1saXN0IHAtcGlja2xpc3QtdGFyZ2V0XCIgY2RrRHJvcExpc3QgW2Nka0Ryb3BMaXN0RGF0YV09XCJ0YXJnZXRcIiAoY2RrRHJvcExpc3REcm9wcGVkKT1cIm9uRHJvcCgkZXZlbnQsIFRBUkdFVF9MSVNUKVwiXG4gICAgICAgICAgICAgICAgICAgIFtuZ1N0eWxlXT1cInRhcmdldFN0eWxlXCIgcm9sZT1cImxpc3Rib3hcIiBhcmlhLW11bHRpc2VsZWN0YWJsZT1cIm11bHRpcGxlXCI+XG4gICAgICAgICAgICAgICAgICAgIDxuZy10ZW1wbGF0ZSBuZ0ZvciBsZXQtaXRlbSBbbmdGb3JPZl09XCJ0YXJnZXRcIiBbbmdGb3JUcmFja0J5XT1cInRhcmdldFRyYWNrQnkgfHwgdHJhY2tCeVwiIGxldC1pPVwiaW5kZXhcIiBsZXQtbD1cImxhc3RcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxsaSBbbmdDbGFzc109XCJ7J3AtcGlja2xpc3QtaXRlbSc6dHJ1ZSwncC1oaWdobGlnaHQnOmlzU2VsZWN0ZWQoaXRlbSxzZWxlY3RlZEl0ZW1zVGFyZ2V0KSwgJ3AtZGlzYWJsZWQnOiBkaXNhYmxlZH1cIiBwUmlwcGxlIGNka0RyYWcgW2Nka0RyYWdEYXRhXT1cIml0ZW1cIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIChjbGljayk9XCJvbkl0ZW1DbGljaygkZXZlbnQsaXRlbSxzZWxlY3RlZEl0ZW1zVGFyZ2V0LG9uVGFyZ2V0U2VsZWN0KVwiIChkYmxjbGljayk9XCJvblRhcmdldEl0ZW1EYmxDbGljaygpXCIgKHRvdWNoZW5kKT1cIm9uSXRlbVRvdWNoRW5kKCRldmVudClcIiAoa2V5ZG93bik9XCJvbkl0ZW1LZXlkb3duKCRldmVudCxpdGVtLHNlbGVjdGVkSXRlbXNUYXJnZXQsb25UYXJnZXRTZWxlY3QpXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBbc3R5bGUuZGlzcGxheV09XCJpc0l0ZW1WaXNpYmxlKGl0ZW0sIFRBUkdFVF9MSVNUKSA/ICdibG9jaycgOiAnbm9uZSdcIiB0YWJpbmRleD1cIjBcIiByb2xlPVwib3B0aW9uXCIgW2F0dHIuYXJpYS1zZWxlY3RlZF09XCJpc1NlbGVjdGVkKGl0ZW0sIHNlbGVjdGVkSXRlbXNUYXJnZXQpXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdUZW1wbGF0ZU91dGxldD1cIml0ZW1UZW1wbGF0ZTsgY29udGV4dDogeyRpbXBsaWNpdDogaXRlbSwgaW5kZXg6IGl9XCI+PC9uZy1jb250YWluZXI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L2xpPlxuICAgICAgICAgICAgICAgICAgICA8L25nLXRlbXBsYXRlPlxuICAgICAgICAgICAgICAgICAgICA8bmctY29udGFpbmVyICpuZ0lmPVwiKHRhcmdldCA9PSBudWxsIHx8IHRhcmdldC5sZW5ndGggPT09IDApICYmIGVtcHR5TWVzc2FnZVRhcmdldFRlbXBsYXRlXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8bGkgY2xhc3M9XCJwLXBpY2tsaXN0LWVtcHR5LW1lc3NhZ2VcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8bmctY29udGFpbmVyICpuZ1RlbXBsYXRlT3V0bGV0PVwiZW1wdHlNZXNzYWdlVGFyZ2V0VGVtcGxhdGVcIj48L25nLWNvbnRhaW5lcj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvbGk+XG4gICAgICAgICAgICAgICAgICAgIDwvbmctY29udGFpbmVyPlxuICAgICAgICAgICAgICAgIDwvdWw+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJwLXBpY2tsaXN0LWJ1dHRvbnMgcC1waWNrbGlzdC10YXJnZXQtY29udHJvbHNcIiAqbmdJZj1cInNob3dUYXJnZXRDb250cm9sc1wiPlxuICAgICAgICAgICAgICAgIDxidXR0b24gdHlwZT1cImJ1dHRvblwiIHBCdXR0b24gcFJpcHBsZSBpY29uPVwicGkgcGktYW5nbGUtdXBcIiBbZGlzYWJsZWRdPVwiZGlzYWJsZWRcIiAoY2xpY2spPVwibW92ZVVwKHRhcmdldGxpc3QsdGFyZ2V0LHNlbGVjdGVkSXRlbXNUYXJnZXQsb25UYXJnZXRSZW9yZGVyKVwiPjwvYnV0dG9uPlxuICAgICAgICAgICAgICAgIDxidXR0b24gdHlwZT1cImJ1dHRvblwiIHBCdXR0b24gcFJpcHBsZSBpY29uPVwicGkgcGktYW5nbGUtZG91YmxlLXVwXCIgW2Rpc2FibGVkXT1cImRpc2FibGVkXCIgKGNsaWNrKT1cIm1vdmVUb3AodGFyZ2V0bGlzdCx0YXJnZXQsc2VsZWN0ZWRJdGVtc1RhcmdldCxvblRhcmdldFJlb3JkZXIpXCI+PC9idXR0b24+XG4gICAgICAgICAgICAgICAgPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgcEJ1dHRvbiBwUmlwcGxlIGljb249XCJwaSBwaS1hbmdsZS1kb3duXCIgW2Rpc2FibGVkXT1cImRpc2FibGVkXCIgKGNsaWNrKT1cIm1vdmVEb3duKHRhcmdldGxpc3QsdGFyZ2V0LHNlbGVjdGVkSXRlbXNUYXJnZXQsb25UYXJnZXRSZW9yZGVyKVwiPjwvYnV0dG9uPlxuICAgICAgICAgICAgICAgIDxidXR0b24gdHlwZT1cImJ1dHRvblwiIHBCdXR0b24gcFJpcHBsZSBpY29uPVwicGkgcGktYW5nbGUtZG91YmxlLWRvd25cIiBbZGlzYWJsZWRdPVwiZGlzYWJsZWRcIiAoY2xpY2spPVwibW92ZUJvdHRvbSh0YXJnZXRsaXN0LHRhcmdldCxzZWxlY3RlZEl0ZW1zVGFyZ2V0LG9uVGFyZ2V0UmVvcmRlcilcIj48L2J1dHRvbj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICBgLFxuICAgIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxuICAgIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmUsXG4gICAgc3R5bGVVcmxzOiBbJy4vcGlja2xpc3QuY3NzJ11cbn0pXG5leHBvcnQgY2xhc3MgUGlja0xpc3QgaW1wbGVtZW50cyBBZnRlclZpZXdDaGVja2VkLEFmdGVyQ29udGVudEluaXQge1xuXG4gICAgQElucHV0KCkgc291cmNlOiBhbnlbXTtcblxuICAgIEBJbnB1dCgpIHRhcmdldDogYW55W107XG5cbiAgICBASW5wdXQoKSBzb3VyY2VIZWFkZXI6IHN0cmluZztcblxuICAgIEBJbnB1dCgpIHRhcmdldEhlYWRlcjogc3RyaW5nO1xuXG4gICAgQElucHV0KCkgcmVzcG9uc2l2ZTogYm9vbGVhbjtcblxuICAgIEBJbnB1dCgpIGZpbHRlckJ5OiBzdHJpbmc7XG5cbiAgICBASW5wdXQoKSBmaWx0ZXJMb2NhbGU6IHN0cmluZztcblxuICAgIEBJbnB1dCgpIHRyYWNrQnk6IEZ1bmN0aW9uID0gKGluZGV4OiBudW1iZXIsIGl0ZW06IGFueSkgPT4gaXRlbTtcblxuICAgIEBJbnB1dCgpIHNvdXJjZVRyYWNrQnk6IEZ1bmN0aW9uO1xuXG4gICAgQElucHV0KCkgdGFyZ2V0VHJhY2tCeTogRnVuY3Rpb247XG5cbiAgICBASW5wdXQoKSBzaG93U291cmNlRmlsdGVyOiBib29sZWFuID0gdHJ1ZTtcblxuICAgIEBJbnB1dCgpIHNob3dUYXJnZXRGaWx0ZXI6IGJvb2xlYW4gPSB0cnVlO1xuXG4gICAgQElucHV0KCkgbWV0YUtleVNlbGVjdGlvbjogYm9vbGVhbiA9IHRydWU7XG5cbiAgICBASW5wdXQoKSBkcmFnZHJvcDogYm9vbGVhbjtcblxuICAgIEBJbnB1dCgpIHN0eWxlOiBhbnk7XG5cbiAgICBASW5wdXQoKSBzdHlsZUNsYXNzOiBzdHJpbmc7XG5cbiAgICBASW5wdXQoKSBzb3VyY2VTdHlsZTogYW55O1xuXG4gICAgQElucHV0KCkgdGFyZ2V0U3R5bGU6IGFueTtcblxuICAgIEBJbnB1dCgpIHNob3dTb3VyY2VDb250cm9sczogYm9vbGVhbiA9IHRydWU7XG5cbiAgICBASW5wdXQoKSBzaG93VGFyZ2V0Q29udHJvbHM6IGJvb2xlYW4gPSB0cnVlO1xuXG4gICAgQElucHV0KCkgc291cmNlRmlsdGVyUGxhY2Vob2xkZXI6IHN0cmluZztcblxuICAgIEBJbnB1dCgpIHRhcmdldEZpbHRlclBsYWNlaG9sZGVyOiBzdHJpbmc7XG5cbiAgICBASW5wdXQoKSBkaXNhYmxlZDogYm9vbGVhbiA9IGZhbHNlO1xuXG4gICAgQElucHV0KCkgYXJpYVNvdXJjZUZpbHRlckxhYmVsOiBzdHJpbmc7XG5cbiAgICBASW5wdXQoKSBhcmlhVGFyZ2V0RmlsdGVyTGFiZWw6IHN0cmluZztcblxuICAgIEBJbnB1dCgpIGZpbHRlck1hdGNoTW9kZTogc3RyaW5nID0gXCJjb250YWluc1wiO1xuXG4gICAgQElucHV0KCkgYnJlYWtwb2ludDogc3RyaW5nID0gXCI5NjBweFwiO1xuXG4gICAgQE91dHB1dCgpIG9uTW92ZVRvU291cmNlOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICAgIEBPdXRwdXQoKSBvbk1vdmVBbGxUb1NvdXJjZTogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgICBAT3V0cHV0KCkgb25Nb3ZlQWxsVG9UYXJnZXQ6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG4gICAgQE91dHB1dCgpIG9uTW92ZVRvVGFyZ2V0OiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICAgIEBPdXRwdXQoKSBvblNvdXJjZVJlb3JkZXI6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG4gICAgQE91dHB1dCgpIG9uVGFyZ2V0UmVvcmRlcjogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgICBAT3V0cHV0KCkgb25Tb3VyY2VTZWxlY3Q6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG4gICAgQE91dHB1dCgpIG9uVGFyZ2V0U2VsZWN0OiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICAgIEBPdXRwdXQoKSBvblNvdXJjZUZpbHRlcjogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgICBAT3V0cHV0KCkgb25UYXJnZXRGaWx0ZXI6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG4gICAgQFZpZXdDaGlsZCgnc291cmNlbGlzdCcpIGxpc3RWaWV3U291cmNlQ2hpbGQ6IEVsZW1lbnRSZWY7XG5cbiAgICBAVmlld0NoaWxkKCd0YXJnZXRsaXN0JykgbGlzdFZpZXdUYXJnZXRDaGlsZDogRWxlbWVudFJlZjtcblxuICAgIEBWaWV3Q2hpbGQoJ3NvdXJjZUZpbHRlcicpIHNvdXJjZUZpbHRlclZpZXdDaGlsZDogRWxlbWVudFJlZjtcblxuICAgIEBWaWV3Q2hpbGQoJ3RhcmdldEZpbHRlcicpIHRhcmdldEZpbHRlclZpZXdDaGlsZDogRWxlbWVudFJlZjtcblxuICAgIEBDb250ZW50Q2hpbGRyZW4oUHJpbWVUZW1wbGF0ZSkgdGVtcGxhdGVzOiBRdWVyeUxpc3Q8YW55PjtcblxuICAgIHB1YmxpYyBpdGVtVGVtcGxhdGU6IFRlbXBsYXRlUmVmPGFueT47XG5cbiAgICBwdWJsaWMgdmlzaWJsZU9wdGlvbnNTb3VyY2U6IGFueVtdO1xuXG4gICAgcHVibGljIHZpc2libGVPcHRpb25zVGFyZ2V0OiBhbnlbXTtcblxuICAgIHNlbGVjdGVkSXRlbXNTb3VyY2U6IGFueVtdID0gW107XG5cbiAgICBzZWxlY3RlZEl0ZW1zVGFyZ2V0OiBhbnlbXSA9IFtdO1xuXG4gICAgcmVvcmRlcmVkTGlzdEVsZW1lbnQ6IGFueTtcblxuICAgIG1vdmVkVXA6IGJvb2xlYW47XG5cbiAgICBtb3ZlZERvd246IGJvb2xlYW47XG5cbiAgICBpdGVtVG91Y2hlZDogYm9vbGVhbjtcblxuICAgIHN0eWxlRWxlbWVudDogYW55O1xuXG4gICAgaWQ6IHN0cmluZyA9IFVuaXF1ZUNvbXBvbmVudElkKCk7XG5cbiAgICBmaWx0ZXJWYWx1ZVNvdXJjZTogc3RyaW5nO1xuXG4gICAgZmlsdGVyVmFsdWVUYXJnZXQ6IHN0cmluZztcblxuICAgIGZyb21MaXN0VHlwZTogbnVtYmVyO1xuXG4gICAgZW1wdHlNZXNzYWdlU291cmNlVGVtcGxhdGU6IFRlbXBsYXRlUmVmPGFueT47XG5cbiAgICBlbXB0eU1lc3NhZ2VUYXJnZXRUZW1wbGF0ZTogVGVtcGxhdGVSZWY8YW55PjtcblxuICAgIHJlYWRvbmx5IFNPVVJDRV9MSVNUID0gLTE7XG5cbiAgICByZWFkb25seSBUQVJHRVRfTElTVCA9IDE7XG5cbiAgICBjb25zdHJ1Y3RvcihwdWJsaWMgZWw6IEVsZW1lbnRSZWYsIHB1YmxpYyBjZDogQ2hhbmdlRGV0ZWN0b3JSZWYsIHB1YmxpYyBmaWx0ZXJTZXJ2aWNlOiBGaWx0ZXJTZXJ2aWNlKSB7fVxuXG5cbiAgICBuZ09uSW5pdCgpIHtcbiAgICAgICAgaWYgKHRoaXMucmVzcG9uc2l2ZSkge1xuICAgICAgICAgICAgdGhpcy5jcmVhdGVTdHlsZSgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgbmdBZnRlckNvbnRlbnRJbml0KCkge1xuICAgICAgICB0aGlzLnRlbXBsYXRlcy5mb3JFYWNoKChpdGVtKSA9PiB7XG4gICAgICAgICAgICBzd2l0Y2goaXRlbS5nZXRUeXBlKCkpIHtcbiAgICAgICAgICAgICAgICBjYXNlICdpdGVtJzpcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5pdGVtVGVtcGxhdGUgPSBpdGVtLnRlbXBsYXRlO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICAgICAgY2FzZSAnZW1wdHltZXNzYWdlc291cmNlJzpcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5lbXB0eU1lc3NhZ2VTb3VyY2VUZW1wbGF0ZSA9IGl0ZW0udGVtcGxhdGU7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgICAgICBjYXNlICdlbXB0eW1lc3NhZ2V0YXJnZXQnOlxuICAgICAgICAgICAgICAgICAgICB0aGlzLmVtcHR5TWVzc2FnZVRhcmdldFRlbXBsYXRlID0gaXRlbS50ZW1wbGF0ZTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgICAgICB0aGlzLml0ZW1UZW1wbGF0ZSA9IGl0ZW0udGVtcGxhdGU7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIG5nQWZ0ZXJWaWV3Q2hlY2tlZCgpIHtcbiAgICAgICAgaWYgKHRoaXMubW92ZWRVcHx8dGhpcy5tb3ZlZERvd24pIHtcbiAgICAgICAgICAgIGxldCBsaXN0SXRlbXMgPSBEb21IYW5kbGVyLmZpbmQodGhpcy5yZW9yZGVyZWRMaXN0RWxlbWVudCwgJ2xpLnAtaGlnaGxpZ2h0Jyk7XG4gICAgICAgICAgICBsZXQgbGlzdEl0ZW07XG5cbiAgICAgICAgICAgIGlmICh0aGlzLm1vdmVkVXApXG4gICAgICAgICAgICAgICAgbGlzdEl0ZW0gPSBsaXN0SXRlbXNbMF07XG4gICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgICAgbGlzdEl0ZW0gPSBsaXN0SXRlbXNbbGlzdEl0ZW1zLmxlbmd0aCAtIDFdO1xuXG4gICAgICAgICAgICBEb21IYW5kbGVyLnNjcm9sbEluVmlldyh0aGlzLnJlb3JkZXJlZExpc3RFbGVtZW50LCBsaXN0SXRlbSk7XG4gICAgICAgICAgICB0aGlzLm1vdmVkVXAgPSBmYWxzZTtcbiAgICAgICAgICAgIHRoaXMubW92ZWREb3duID0gZmFsc2U7XG4gICAgICAgICAgICB0aGlzLnJlb3JkZXJlZExpc3RFbGVtZW50ID0gbnVsbDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIG9uSXRlbUNsaWNrKGV2ZW50LCBpdGVtOiBhbnksIHNlbGVjdGVkSXRlbXM6IGFueVtdLCBjYWxsYmFjazogRXZlbnRFbWl0dGVyPGFueT4pIHtcbiAgICAgICAgaWYgKHRoaXMuZGlzYWJsZWQpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGxldCBpbmRleCA9IHRoaXMuZmluZEluZGV4SW5TZWxlY3Rpb24oaXRlbSxzZWxlY3RlZEl0ZW1zKTtcbiAgICAgICAgbGV0IHNlbGVjdGVkID0gKGluZGV4ICE9IC0xKTtcbiAgICAgICAgbGV0IG1ldGFTZWxlY3Rpb24gPSB0aGlzLml0ZW1Ub3VjaGVkID8gZmFsc2UgOiB0aGlzLm1ldGFLZXlTZWxlY3Rpb247XG5cbiAgICAgICAgaWYgKG1ldGFTZWxlY3Rpb24pIHtcbiAgICAgICAgICAgIGxldCBtZXRhS2V5ID0gKGV2ZW50Lm1ldGFLZXl8fGV2ZW50LmN0cmxLZXl8fGV2ZW50LnNoaWZ0S2V5KTtcblxuICAgICAgICAgICAgaWYgKHNlbGVjdGVkICYmIG1ldGFLZXkpIHtcbiAgICAgICAgICAgICAgICBzZWxlY3RlZEl0ZW1zLnNwbGljZShpbmRleCwgMSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBpZiAoIW1ldGFLZXkpIHtcbiAgICAgICAgICAgICAgICAgICAgc2VsZWN0ZWRJdGVtcy5sZW5ndGggPSAwO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBzZWxlY3RlZEl0ZW1zLnB1c2goaXRlbSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBpZiAoc2VsZWN0ZWQpXG4gICAgICAgICAgICAgICAgc2VsZWN0ZWRJdGVtcy5zcGxpY2UoaW5kZXgsIDEpO1xuICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAgIHNlbGVjdGVkSXRlbXMucHVzaChpdGVtKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGNhbGxiYWNrLmVtaXQoe29yaWdpbmFsRXZlbnQ6IGV2ZW50LCBpdGVtczogc2VsZWN0ZWRJdGVtc30pO1xuXG4gICAgICAgIHRoaXMuaXRlbVRvdWNoZWQgPSBmYWxzZTtcbiAgICB9XG5cbiAgICBvblNvdXJjZUl0ZW1EYmxDbGljaygpIHtcbiAgICAgICAgaWYgKHRoaXMuZGlzYWJsZWQpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMubW92ZVJpZ2h0KCk7XG4gICAgfVxuXG4gICAgb25UYXJnZXRJdGVtRGJsQ2xpY2soKSB7XG4gICAgICAgIGlmICh0aGlzLmRpc2FibGVkKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLm1vdmVMZWZ0KCk7XG4gICAgfVxuXG4gICAgb25GaWx0ZXIoZXZlbnQ6IEtleWJvYXJkRXZlbnQsIGRhdGE6IGFueVtdLCBsaXN0VHlwZTogbnVtYmVyKSB7XG4gICAgICAgIGxldCBxdWVyeSA9ICgoPEhUTUxJbnB1dEVsZW1lbnQ+IGV2ZW50LnRhcmdldCkudmFsdWUudHJpbSgpIGFzIGFueSkudG9Mb2NhbGVMb3dlckNhc2UodGhpcy5maWx0ZXJMb2NhbGUpO1xuICAgICAgICB0aGlzLmZpbHRlcihxdWVyeSwgZGF0YSwgbGlzdFR5cGUpO1xuICAgIH1cblxuICAgIGZpbHRlcihxdWVyeTogc3RyaW5nLCBkYXRhOiBhbnlbXSwgbGlzdFR5cGU6IG51bWJlcikge1xuICAgICAgICBsZXQgc2VhcmNoRmllbGRzID0gdGhpcy5maWx0ZXJCeS5zcGxpdCgnLCcpO1xuXG4gICAgICAgIGlmIChsaXN0VHlwZSA9PT0gdGhpcy5TT1VSQ0VfTElTVCkge1xuICAgICAgICAgICAgdGhpcy5maWx0ZXJWYWx1ZVNvdXJjZSA9IHF1ZXJ5O1xuICAgICAgICAgICAgdGhpcy52aXNpYmxlT3B0aW9uc1NvdXJjZSA9IHRoaXMuZmlsdGVyU2VydmljZS5maWx0ZXIoZGF0YSwgc2VhcmNoRmllbGRzLCB0aGlzLmZpbHRlclZhbHVlU291cmNlLCB0aGlzLmZpbHRlck1hdGNoTW9kZSwgdGhpcy5maWx0ZXJMb2NhbGUpO1xuICAgICAgICAgICAgdGhpcy5vblNvdXJjZUZpbHRlci5lbWl0KHtxdWVyeTogdGhpcy5maWx0ZXJWYWx1ZVNvdXJjZSwgdmFsdWU6IHRoaXMudmlzaWJsZU9wdGlvbnNTb3VyY2V9KTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChsaXN0VHlwZSA9PT0gdGhpcy5UQVJHRVRfTElTVCkge1xuICAgICAgICAgICAgdGhpcy5maWx0ZXJWYWx1ZVRhcmdldCA9IHF1ZXJ5O1xuICAgICAgICAgICAgdGhpcy52aXNpYmxlT3B0aW9uc1RhcmdldCA9IHRoaXMuZmlsdGVyU2VydmljZS5maWx0ZXIoZGF0YSwgc2VhcmNoRmllbGRzLCB0aGlzLmZpbHRlclZhbHVlVGFyZ2V0LCB0aGlzLmZpbHRlck1hdGNoTW9kZSwgdGhpcy5maWx0ZXJMb2NhbGUpO1xuICAgICAgICAgICAgdGhpcy5vblRhcmdldEZpbHRlci5lbWl0KHtxdWVyeTogdGhpcy5maWx0ZXJWYWx1ZVRhcmdldCwgdmFsdWU6IHRoaXMudmlzaWJsZU9wdGlvbnNUYXJnZXR9KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGlzSXRlbVZpc2libGUoaXRlbTogYW55LCBsaXN0VHlwZTogbnVtYmVyKTogYm9vbGVhbiB7XG4gICAgICAgIGlmIChsaXN0VHlwZSA9PSB0aGlzLlNPVVJDRV9MSVNUKVxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuaXNWaXNpYmxlSW5MaXN0KHRoaXMudmlzaWJsZU9wdGlvbnNTb3VyY2UsIGl0ZW0sIHRoaXMuZmlsdGVyVmFsdWVTb3VyY2UpO1xuICAgICAgICBlbHNlXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5pc1Zpc2libGVJbkxpc3QodGhpcy52aXNpYmxlT3B0aW9uc1RhcmdldCwgaXRlbSwgdGhpcy5maWx0ZXJWYWx1ZVRhcmdldCk7XG4gICAgfVxuXG4gICAgaXNWaXNpYmxlSW5MaXN0KGRhdGE6IGFueVtdLCBpdGVtOiBhbnksIGZpbHRlclZhbHVlOiBzdHJpbmcpOiBib29sZWFuIHtcbiAgICAgICAgaWYgKGZpbHRlclZhbHVlICYmIGZpbHRlclZhbHVlLnRyaW0oKS5sZW5ndGgpIHtcbiAgICAgICAgICAgIGZvcihsZXQgaSA9IDA7IGkgPCBkYXRhLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgaWYgKGl0ZW0gPT0gZGF0YVtpXSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIG9uSXRlbVRvdWNoRW5kKGV2ZW50KSB7XG4gICAgICAgIGlmICh0aGlzLmRpc2FibGVkKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLml0ZW1Ub3VjaGVkID0gdHJ1ZTtcbiAgICB9XG5cbiAgICBwcml2YXRlIHNvcnRCeUluZGV4SW5MaXN0KGl0ZW1zOiBhbnlbXSwgbGlzdDogYW55KSB7XG4gICAgICAgIHJldHVybiBpdGVtcy5zb3J0KChpdGVtMSwgaXRlbTIpID0+XG4gICAgICAgICAgICB0aGlzLmZpbmRJbmRleEluTGlzdChpdGVtMSwgbGlzdCkgLSB0aGlzLmZpbmRJbmRleEluTGlzdChpdGVtMiwgbGlzdCkpO1xuICAgIH1cblxuICAgIG1vdmVVcChsaXN0RWxlbWVudCwgbGlzdCwgc2VsZWN0ZWRJdGVtcywgY2FsbGJhY2spIHtcbiAgICAgICAgaWYgKHNlbGVjdGVkSXRlbXMgJiYgc2VsZWN0ZWRJdGVtcy5sZW5ndGgpIHtcbiAgICAgICAgICAgIHNlbGVjdGVkSXRlbXMgPSB0aGlzLnNvcnRCeUluZGV4SW5MaXN0KHNlbGVjdGVkSXRlbXMsIGxpc3QpO1xuICAgICAgICAgICAgZm9yKGxldCBpID0gMDsgaSA8IHNlbGVjdGVkSXRlbXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICBsZXQgc2VsZWN0ZWRJdGVtID0gc2VsZWN0ZWRJdGVtc1tpXTtcbiAgICAgICAgICAgICAgICBsZXQgc2VsZWN0ZWRJdGVtSW5kZXg6IG51bWJlciA9IHRoaXMuZmluZEluZGV4SW5MaXN0KHNlbGVjdGVkSXRlbSwgbGlzdCk7XG5cbiAgICAgICAgICAgICAgICBpZiAoc2VsZWN0ZWRJdGVtSW5kZXggIT0gMCkge1xuICAgICAgICAgICAgICAgICAgICBsZXQgbW92ZWRJdGVtID0gbGlzdFtzZWxlY3RlZEl0ZW1JbmRleF07XG4gICAgICAgICAgICAgICAgICAgIGxldCB0ZW1wID0gbGlzdFtzZWxlY3RlZEl0ZW1JbmRleC0xXTtcbiAgICAgICAgICAgICAgICAgICAgbGlzdFtzZWxlY3RlZEl0ZW1JbmRleC0xXSA9IG1vdmVkSXRlbTtcbiAgICAgICAgICAgICAgICAgICAgbGlzdFtzZWxlY3RlZEl0ZW1JbmRleF0gPSB0ZW1wO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB0aGlzLm1vdmVkVXAgPSB0cnVlO1xuICAgICAgICAgICAgdGhpcy5yZW9yZGVyZWRMaXN0RWxlbWVudCA9IGxpc3RFbGVtZW50O1xuICAgICAgICAgICAgY2FsbGJhY2suZW1pdCh7aXRlbXM6IHNlbGVjdGVkSXRlbXN9KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIG1vdmVUb3AobGlzdEVsZW1lbnQsIGxpc3QsIHNlbGVjdGVkSXRlbXMsIGNhbGxiYWNrKSB7XG4gICAgICAgIGlmIChzZWxlY3RlZEl0ZW1zICYmIHNlbGVjdGVkSXRlbXMubGVuZ3RoKSB7XG4gICAgICAgICAgICBzZWxlY3RlZEl0ZW1zID0gdGhpcy5zb3J0QnlJbmRleEluTGlzdChzZWxlY3RlZEl0ZW1zLCBsaXN0KTtcbiAgICAgICAgICAgIGZvcihsZXQgaSA9IDA7IGkgPCBzZWxlY3RlZEl0ZW1zLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgbGV0IHNlbGVjdGVkSXRlbSA9IHNlbGVjdGVkSXRlbXNbaV07XG4gICAgICAgICAgICAgICAgbGV0IHNlbGVjdGVkSXRlbUluZGV4OiBudW1iZXIgPSB0aGlzLmZpbmRJbmRleEluTGlzdChzZWxlY3RlZEl0ZW0sIGxpc3QpO1xuXG4gICAgICAgICAgICAgICAgaWYgKHNlbGVjdGVkSXRlbUluZGV4ICE9IDApIHtcbiAgICAgICAgICAgICAgICAgICAgbGV0IG1vdmVkSXRlbSA9IGxpc3Quc3BsaWNlKHNlbGVjdGVkSXRlbUluZGV4LDEpWzBdO1xuICAgICAgICAgICAgICAgICAgICBsaXN0LnVuc2hpZnQobW92ZWRJdGVtKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgbGlzdEVsZW1lbnQuc2Nyb2xsVG9wID0gMDtcbiAgICAgICAgICAgIGNhbGxiYWNrLmVtaXQoe2l0ZW1zOiBzZWxlY3RlZEl0ZW1zfSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBtb3ZlRG93bihsaXN0RWxlbWVudCwgbGlzdCwgc2VsZWN0ZWRJdGVtcywgY2FsbGJhY2spIHtcbiAgICAgICAgaWYgKHNlbGVjdGVkSXRlbXMgJiYgc2VsZWN0ZWRJdGVtcy5sZW5ndGgpIHtcbiAgICAgICAgICAgIHNlbGVjdGVkSXRlbXMgPSB0aGlzLnNvcnRCeUluZGV4SW5MaXN0KHNlbGVjdGVkSXRlbXMsIGxpc3QpO1xuICAgICAgICAgICAgZm9yKGxldCBpID0gc2VsZWN0ZWRJdGVtcy5sZW5ndGggLSAxOyBpID49IDA7IGktLSkge1xuICAgICAgICAgICAgICAgIGxldCBzZWxlY3RlZEl0ZW0gPSBzZWxlY3RlZEl0ZW1zW2ldO1xuICAgICAgICAgICAgICAgIGxldCBzZWxlY3RlZEl0ZW1JbmRleDogbnVtYmVyID0gdGhpcy5maW5kSW5kZXhJbkxpc3Qoc2VsZWN0ZWRJdGVtLCBsaXN0KTtcblxuICAgICAgICAgICAgICAgIGlmIChzZWxlY3RlZEl0ZW1JbmRleCAhPSAobGlzdC5sZW5ndGggLSAxKSkge1xuICAgICAgICAgICAgICAgICAgICBsZXQgbW92ZWRJdGVtID0gbGlzdFtzZWxlY3RlZEl0ZW1JbmRleF07XG4gICAgICAgICAgICAgICAgICAgIGxldCB0ZW1wID0gbGlzdFtzZWxlY3RlZEl0ZW1JbmRleCsxXTtcbiAgICAgICAgICAgICAgICAgICAgbGlzdFtzZWxlY3RlZEl0ZW1JbmRleCsxXSA9IG1vdmVkSXRlbTtcbiAgICAgICAgICAgICAgICAgICAgbGlzdFtzZWxlY3RlZEl0ZW1JbmRleF0gPSB0ZW1wO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB0aGlzLm1vdmVkRG93biA9IHRydWU7XG4gICAgICAgICAgICB0aGlzLnJlb3JkZXJlZExpc3RFbGVtZW50ID0gbGlzdEVsZW1lbnQ7XG4gICAgICAgICAgICBjYWxsYmFjay5lbWl0KHtpdGVtczogc2VsZWN0ZWRJdGVtc30pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgbW92ZUJvdHRvbShsaXN0RWxlbWVudCwgbGlzdCwgc2VsZWN0ZWRJdGVtcywgY2FsbGJhY2spIHtcbiAgICAgICAgaWYgKHNlbGVjdGVkSXRlbXMgJiYgc2VsZWN0ZWRJdGVtcy5sZW5ndGgpIHtcbiAgICAgICAgICAgIHNlbGVjdGVkSXRlbXMgPSB0aGlzLnNvcnRCeUluZGV4SW5MaXN0KHNlbGVjdGVkSXRlbXMsIGxpc3QpO1xuICAgICAgICAgICAgZm9yKGxldCBpID0gc2VsZWN0ZWRJdGVtcy5sZW5ndGggLSAxOyBpID49IDA7IGktLSkge1xuICAgICAgICAgICAgICAgIGxldCBzZWxlY3RlZEl0ZW0gPSBzZWxlY3RlZEl0ZW1zW2ldO1xuICAgICAgICAgICAgICAgIGxldCBzZWxlY3RlZEl0ZW1JbmRleDogbnVtYmVyID0gdGhpcy5maW5kSW5kZXhJbkxpc3Qoc2VsZWN0ZWRJdGVtLCBsaXN0KTtcblxuICAgICAgICAgICAgICAgIGlmIChzZWxlY3RlZEl0ZW1JbmRleCAhPSAobGlzdC5sZW5ndGggLSAxKSkge1xuICAgICAgICAgICAgICAgICAgICBsZXQgbW92ZWRJdGVtID0gbGlzdC5zcGxpY2Uoc2VsZWN0ZWRJdGVtSW5kZXgsMSlbMF07XG4gICAgICAgICAgICAgICAgICAgIGxpc3QucHVzaChtb3ZlZEl0ZW0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBsaXN0RWxlbWVudC5zY3JvbGxUb3AgPSBsaXN0RWxlbWVudC5zY3JvbGxIZWlnaHQ7XG4gICAgICAgICAgICBjYWxsYmFjay5lbWl0KHtpdGVtczogc2VsZWN0ZWRJdGVtc30pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgbW92ZVJpZ2h0KCkge1xuICAgICAgICBpZiAodGhpcy5zZWxlY3RlZEl0ZW1zU291cmNlICYmIHRoaXMuc2VsZWN0ZWRJdGVtc1NvdXJjZS5sZW5ndGgpIHtcbiAgICAgICAgICAgIGZvcihsZXQgaSA9IDA7IGkgPCB0aGlzLnNlbGVjdGVkSXRlbXNTb3VyY2UubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICBsZXQgc2VsZWN0ZWRJdGVtID0gdGhpcy5zZWxlY3RlZEl0ZW1zU291cmNlW2ldO1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLmZpbmRJbmRleEluTGlzdChzZWxlY3RlZEl0ZW0sIHRoaXMudGFyZ2V0KSA9PSAtMSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnRhcmdldC5wdXNoKHRoaXMuc291cmNlLnNwbGljZSh0aGlzLmZpbmRJbmRleEluTGlzdChzZWxlY3RlZEl0ZW0sIHRoaXMuc291cmNlKSwxKVswXSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5vbk1vdmVUb1RhcmdldC5lbWl0KHtcbiAgICAgICAgICAgICAgICBpdGVtczogdGhpcy5zZWxlY3RlZEl0ZW1zU291cmNlXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHRoaXMuc2VsZWN0ZWRJdGVtc1NvdXJjZSA9IFtdO1xuXG4gICAgICAgICAgICBpZiAodGhpcy5maWx0ZXJWYWx1ZVRhcmdldCkge1xuICAgICAgICAgICAgICAgIHRoaXMuZmlsdGVyKHRoaXMuZmlsdGVyVmFsdWVUYXJnZXQsIHRoaXMudGFyZ2V0LCB0aGlzLlRBUkdFVF9MSVNUKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIG1vdmVBbGxSaWdodCgpIHtcbiAgICAgICAgaWYgKHRoaXMuc291cmNlKSB7XG4gICAgICAgICAgICBsZXQgbW92ZWRJdGVtcyA9IFtdO1xuXG4gICAgICAgICAgICBmb3IobGV0IGkgPSAwOyBpIDwgdGhpcy5zb3VyY2UubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5pc0l0ZW1WaXNpYmxlKHRoaXMuc291cmNlW2ldLCB0aGlzLlNPVVJDRV9MSVNUKSkge1xuICAgICAgICAgICAgICAgICAgICBsZXQgcmVtb3ZlZEl0ZW0gPSB0aGlzLnNvdXJjZS5zcGxpY2UoaSwgMSlbMF07XG4gICAgICAgICAgICAgICAgICAgIHRoaXMudGFyZ2V0LnB1c2gocmVtb3ZlZEl0ZW0pO1xuICAgICAgICAgICAgICAgICAgICBtb3ZlZEl0ZW1zLnB1c2gocmVtb3ZlZEl0ZW0pO1xuICAgICAgICAgICAgICAgICAgICBpLS07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB0aGlzLm9uTW92ZUFsbFRvVGFyZ2V0LmVtaXQoe1xuICAgICAgICAgICAgICAgIGl0ZW1zOiBtb3ZlZEl0ZW1zXG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgdGhpcy5zZWxlY3RlZEl0ZW1zU291cmNlID0gW107XG5cbiAgICAgICAgICAgIGlmICh0aGlzLmZpbHRlclZhbHVlVGFyZ2V0KSB7XG4gICAgICAgICAgICAgICAgdGhpcy5maWx0ZXIodGhpcy5maWx0ZXJWYWx1ZVRhcmdldCwgdGhpcy50YXJnZXQsIHRoaXMuVEFSR0VUX0xJU1QpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgbW92ZUxlZnQoKSB7XG4gICAgICAgIGlmICh0aGlzLnNlbGVjdGVkSXRlbXNUYXJnZXQgJiYgdGhpcy5zZWxlY3RlZEl0ZW1zVGFyZ2V0Lmxlbmd0aCkge1xuICAgICAgICAgICAgZm9yKGxldCBpID0gMDsgaSA8IHRoaXMuc2VsZWN0ZWRJdGVtc1RhcmdldC5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgIGxldCBzZWxlY3RlZEl0ZW0gPSB0aGlzLnNlbGVjdGVkSXRlbXNUYXJnZXRbaV07XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuZmluZEluZGV4SW5MaXN0KHNlbGVjdGVkSXRlbSwgdGhpcy5zb3VyY2UpID09IC0xKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc291cmNlLnB1c2godGhpcy50YXJnZXQuc3BsaWNlKHRoaXMuZmluZEluZGV4SW5MaXN0KHNlbGVjdGVkSXRlbSwgdGhpcy50YXJnZXQpLDEpWzBdKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLm9uTW92ZVRvU291cmNlLmVtaXQoe1xuICAgICAgICAgICAgICAgIGl0ZW1zOiB0aGlzLnNlbGVjdGVkSXRlbXNUYXJnZXRcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICB0aGlzLnNlbGVjdGVkSXRlbXNUYXJnZXQgPSBbXTtcblxuICAgICAgICAgICAgaWYgKHRoaXMuZmlsdGVyVmFsdWVTb3VyY2UpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmZpbHRlcih0aGlzLmZpbHRlclZhbHVlU291cmNlLCB0aGlzLnNvdXJjZSwgdGhpcy5TT1VSQ0VfTElTVCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBtb3ZlQWxsTGVmdCgpIHtcbiAgICAgICAgaWYgKHRoaXMudGFyZ2V0KSB7XG4gICAgICAgICAgICBsZXQgbW92ZWRJdGVtcyA9IFtdO1xuXG4gICAgICAgICAgICBmb3IobGV0IGkgPSAwOyBpIDwgdGhpcy50YXJnZXQubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5pc0l0ZW1WaXNpYmxlKHRoaXMudGFyZ2V0W2ldLCB0aGlzLlRBUkdFVF9MSVNUKSkge1xuICAgICAgICAgICAgICAgICAgICBsZXQgcmVtb3ZlZEl0ZW0gPSB0aGlzLnRhcmdldC5zcGxpY2UoaSwgMSlbMF07XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc291cmNlLnB1c2gocmVtb3ZlZEl0ZW0pO1xuICAgICAgICAgICAgICAgICAgICBtb3ZlZEl0ZW1zLnB1c2gocmVtb3ZlZEl0ZW0pO1xuICAgICAgICAgICAgICAgICAgICBpLS07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB0aGlzLm9uTW92ZUFsbFRvU291cmNlLmVtaXQoe1xuICAgICAgICAgICAgICAgIGl0ZW1zOiBtb3ZlZEl0ZW1zXG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgdGhpcy5zZWxlY3RlZEl0ZW1zVGFyZ2V0ID0gW107XG5cbiAgICAgICAgICAgIGlmICh0aGlzLmZpbHRlclZhbHVlU291cmNlKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5maWx0ZXIodGhpcy5maWx0ZXJWYWx1ZVNvdXJjZSwgdGhpcy5zb3VyY2UsIHRoaXMuU09VUkNFX0xJU1QpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgaXNTZWxlY3RlZChpdGVtOiBhbnksIHNlbGVjdGVkSXRlbXM6IGFueVtdKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmZpbmRJbmRleEluU2VsZWN0aW9uKGl0ZW0sIHNlbGVjdGVkSXRlbXMpICE9IC0xO1xuICAgIH1cblxuICAgIGZpbmRJbmRleEluU2VsZWN0aW9uKGl0ZW06IGFueSwgc2VsZWN0ZWRJdGVtczogYW55W10pOiBudW1iZXIge1xuICAgICAgICByZXR1cm4gdGhpcy5maW5kSW5kZXhJbkxpc3QoaXRlbSwgc2VsZWN0ZWRJdGVtcyk7XG4gICAgfVxuXG4gICAgZmluZEluZGV4SW5MaXN0KGl0ZW06IGFueSwgbGlzdDogYW55KTogbnVtYmVyIHtcbiAgICAgICAgbGV0IGluZGV4OiBudW1iZXIgPSAtMTtcblxuICAgICAgICBpZiAobGlzdCkge1xuICAgICAgICAgICAgZm9yKGxldCBpID0gMDsgaSA8IGxpc3QubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICBpZiAobGlzdFtpXSA9PSBpdGVtKSB7XG4gICAgICAgICAgICAgICAgICAgIGluZGV4ID0gaTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGluZGV4O1xuICAgIH1cblxuICAgIG9uRHJvcChldmVudDogQ2RrRHJhZ0Ryb3A8c3RyaW5nW10+LCBsaXN0VHlwZTogbnVtYmVyKSB7XG4gICAgICAgIGlmIChldmVudC5wcmV2aW91c0NvbnRhaW5lciA9PT0gZXZlbnQuY29udGFpbmVyKSB7XG4gICAgICAgICAgICBtb3ZlSXRlbUluQXJyYXkoZXZlbnQuY29udGFpbmVyLmRhdGEsIGV2ZW50LnByZXZpb3VzSW5kZXgsIGV2ZW50LmN1cnJlbnRJbmRleCk7XG5cbiAgICAgICAgICAgIGlmIChsaXN0VHlwZSA9PSB0aGlzLlNPVVJDRV9MSVNUKVxuICAgICAgICAgICAgICAgIHRoaXMub25Tb3VyY2VSZW9yZGVyLmVtaXQoW2V2ZW50Lml0ZW0uZGF0YV0pO1xuICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAgIHRoaXMub25UYXJnZXRSZW9yZGVyLmVtaXQoW2V2ZW50Lml0ZW0uZGF0YV0pO1xuICAgICAgICB9IFxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRyYW5zZmVyQXJyYXlJdGVtKGV2ZW50LnByZXZpb3VzQ29udGFpbmVyLmRhdGEsIGV2ZW50LmNvbnRhaW5lci5kYXRhLCBldmVudC5wcmV2aW91c0luZGV4LCBldmVudC5jdXJyZW50SW5kZXgpO1xuXG4gICAgICAgICAgICBpZiAobGlzdFR5cGUgPT0gdGhpcy5TT1VSQ0VfTElTVClcbiAgICAgICAgICAgICAgICB0aGlzLm9uTW92ZVRvU291cmNlLmVtaXQoW2V2ZW50Lml0ZW0uZGF0YV0pO1xuICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAgIHRoaXMub25Nb3ZlVG9UYXJnZXQuZW1pdChbZXZlbnQuaXRlbS5kYXRhXSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZXNldEZpbHRlcigpIHtcbiAgICAgICAgdGhpcy52aXNpYmxlT3B0aW9uc1NvdXJjZSA9IG51bGw7XG4gICAgICAgIHRoaXMuZmlsdGVyVmFsdWVTb3VyY2UgPSBudWxsO1xuICAgICAgICB0aGlzLnZpc2libGVPcHRpb25zVGFyZ2V0ID0gbnVsbDtcbiAgICAgICAgdGhpcy5maWx0ZXJWYWx1ZVRhcmdldCA9IG51bGw7XG5cbiAgICAgICAgKDxIVE1MSW5wdXRFbGVtZW50PiB0aGlzLnNvdXJjZUZpbHRlclZpZXdDaGlsZC5uYXRpdmVFbGVtZW50KS52YWx1ZSA9ICcnO1xuICAgICAgICAoPEhUTUxJbnB1dEVsZW1lbnQ+IHRoaXMudGFyZ2V0RmlsdGVyVmlld0NoaWxkLm5hdGl2ZUVsZW1lbnQpLnZhbHVlID0gJyc7XG4gICAgfVxuXG4gICAgb25JdGVtS2V5ZG93bihldmVudDogS2V5Ym9hcmRFdmVudCwgaXRlbTogYW55LCBzZWxlY3RlZEl0ZW1zOiBhbnlbXSwgY2FsbGJhY2s6IEV2ZW50RW1pdHRlcjxhbnk+KSB7XG4gICAgICAgIGxldCBsaXN0SXRlbSA9IDxIVE1MTElFbGVtZW50PiBldmVudC5jdXJyZW50VGFyZ2V0O1xuXG4gICAgICAgIHN3aXRjaChldmVudC53aGljaCkge1xuICAgICAgICAgICAgLy9kb3duXG4gICAgICAgICAgICBjYXNlIDQwOlxuICAgICAgICAgICAgICAgIHZhciBuZXh0SXRlbSA9IHRoaXMuZmluZE5leHRJdGVtKGxpc3RJdGVtKTtcbiAgICAgICAgICAgICAgICBpZiAobmV4dEl0ZW0pIHtcbiAgICAgICAgICAgICAgICAgICAgbmV4dEl0ZW0uZm9jdXMoKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgIC8vdXBcbiAgICAgICAgICAgIGNhc2UgMzg6XG4gICAgICAgICAgICAgICAgdmFyIHByZXZJdGVtID0gdGhpcy5maW5kUHJldkl0ZW0obGlzdEl0ZW0pO1xuICAgICAgICAgICAgICAgIGlmIChwcmV2SXRlbSkge1xuICAgICAgICAgICAgICAgICAgICBwcmV2SXRlbS5mb2N1cygpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgLy9lbnRlclxuICAgICAgICAgICAgY2FzZSAxMzpcbiAgICAgICAgICAgICAgICB0aGlzLm9uSXRlbUNsaWNrKGV2ZW50LCBpdGVtLCBzZWxlY3RlZEl0ZW1zLCBjYWxsYmFjayk7XG4gICAgICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZmluZE5leHRJdGVtKGl0ZW0pIHtcbiAgICAgICAgbGV0IG5leHRJdGVtID0gaXRlbS5uZXh0RWxlbWVudFNpYmxpbmc7XG5cbiAgICAgICAgaWYgKG5leHRJdGVtKVxuICAgICAgICAgICAgcmV0dXJuICFEb21IYW5kbGVyLmhhc0NsYXNzKG5leHRJdGVtLCAncC1waWNrbGlzdC1pdGVtJykgfHwgRG9tSGFuZGxlci5pc0hpZGRlbihuZXh0SXRlbSkgPyB0aGlzLmZpbmROZXh0SXRlbShuZXh0SXRlbSkgOiBuZXh0SXRlbTtcbiAgICAgICAgZWxzZVxuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuXG4gICAgZmluZFByZXZJdGVtKGl0ZW0pIHtcbiAgICAgICAgbGV0IHByZXZJdGVtID0gaXRlbS5wcmV2aW91c0VsZW1lbnRTaWJsaW5nO1xuXG4gICAgICAgIGlmIChwcmV2SXRlbSlcbiAgICAgICAgICAgIHJldHVybiAhRG9tSGFuZGxlci5oYXNDbGFzcyhwcmV2SXRlbSwgJ3AtcGlja2xpc3QtaXRlbScpIHx8IERvbUhhbmRsZXIuaXNIaWRkZW4ocHJldkl0ZW0pID8gdGhpcy5maW5kUHJldkl0ZW0ocHJldkl0ZW0pIDogcHJldkl0ZW07XG4gICAgICAgIGVsc2VcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgIH1cblxuICAgIGNyZWF0ZVN0eWxlKCkge1xuICAgICAgICBpZiAoIXRoaXMuc3R5bGVFbGVtZW50KSB7XG4gICAgICAgICAgICB0aGlzLmVsLm5hdGl2ZUVsZW1lbnQuY2hpbGRyZW5bMF0uc2V0QXR0cmlidXRlKHRoaXMuaWQsICcnKTtcbiAgICAgICAgICAgIHRoaXMuc3R5bGVFbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3R5bGUnKTtcbiAgICAgICAgICAgIHRoaXMuc3R5bGVFbGVtZW50LnR5cGUgPSAndGV4dC9jc3MnO1xuICAgICAgICAgICAgZG9jdW1lbnQuaGVhZC5hcHBlbmRDaGlsZCh0aGlzLnN0eWxlRWxlbWVudCk7XG5cbiAgICAgICAgICAgIGxldCBpbm5lckhUTUwgPSBgXG4gICAgICAgICAgICBAbWVkaWEgc2NyZWVuIGFuZCAobWF4LXdpZHRoOiAke3RoaXMuYnJlYWtwb2ludH0pIHtcbiAgICAgICAgICAgICAgICAucC1waWNrbGlzdFske3RoaXMuaWR9XSB7XG4gICAgICAgICAgICAgICAgICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgLnAtcGlja2xpc3RbJHt0aGlzLmlkfV0gLnAtcGlja2xpc3QtYnV0dG9ucyB7XG4gICAgICAgICAgICAgICAgICAgIHBhZGRpbmc6IHZhcigtLWNvbnRlbnQtcGFkZGluZyk7XG4gICAgICAgICAgICAgICAgICAgIGZsZXgtZGlyZWN0aW9uOiByb3c7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgLnAtcGlja2xpc3RbJHt0aGlzLmlkfV0gLnAtcGlja2xpc3QtYnV0dG9ucyAucC1idXR0b24ge1xuICAgICAgICAgICAgICAgICAgICBtYXJnaW4tcmlnaHQ6IHZhcigtLWlubGluZS1zcGFjaW5nKTtcbiAgICAgICAgICAgICAgICAgICAgbWFyZ2luLWJvdHRvbTogMDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAucC1waWNrbGlzdFske3RoaXMuaWR9XSAucC1waWNrbGlzdC1idXR0b25zIC5wLWJ1dHRvbjpsYXN0LWNoaWxkIHtcbiAgICAgICAgICAgICAgICAgICAgbWFyZ2luLXJpZ2h0OiAwO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIC5wLXBpY2tsaXN0WyR7dGhpcy5pZH1dIC5waS1hbmdsZS1yaWdodDpiZWZvcmUge1xuICAgICAgICAgICAgICAgICAgICBjb250ZW50OiBcIlxcXFxlOTMwXCJcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAucC1waWNrbGlzdFske3RoaXMuaWR9XSAucGktYW5nbGUtZG91YmxlLXJpZ2h0OmJlZm9yZSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnRlbnQ6IFwiXFxcXGU5MmNcIlxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIC5wLXBpY2tsaXN0WyR7dGhpcy5pZH1dIC5waS1hbmdsZS1sZWZ0OmJlZm9yZSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnRlbnQ6IFwiXFxcXGU5MzNcIlxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIC5wLXBpY2tsaXN0WyR7dGhpcy5pZH1dIC5waS1hbmdsZS1kb3VibGUtbGVmdDpiZWZvcmUge1xuICAgICAgICAgICAgICAgICAgICBjb250ZW50OiBcIlxcXFxlOTJmXCJcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBgO1xuICAgICAgICAgICAgXG4gICAgICAgICAgICB0aGlzLnN0eWxlRWxlbWVudC5pbm5lckhUTUwgPSBpbm5lckhUTUw7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBkZXN0cm95U3R5bGUoKSB7XG4gICAgICAgIGlmICh0aGlzLnN0eWxlRWxlbWVudCkge1xuICAgICAgICAgICAgZG9jdW1lbnQuaGVhZC5yZW1vdmVDaGlsZCh0aGlzLnN0eWxlRWxlbWVudCk7XG4gICAgICAgICAgICB0aGlzLnN0eWxlRWxlbWVudCA9IG51bGw7YGBcbiAgICAgICAgfVxuICAgIH1cblxuICAgIG5nT25EZXN0cm95KCkge1xuICAgICAgICB0aGlzLmRlc3Ryb3lTdHlsZSgpO1xuICAgIH1cbn1cblxuQE5nTW9kdWxlKHtcbiAgICBpbXBvcnRzOiBbQ29tbW9uTW9kdWxlLEJ1dHRvbk1vZHVsZSxTaGFyZWRNb2R1bGUsUmlwcGxlTW9kdWxlLERyYWdEcm9wTW9kdWxlXSxcbiAgICBleHBvcnRzOiBbUGlja0xpc3QsU2hhcmVkTW9kdWxlLERyYWdEcm9wTW9kdWxlXSxcbiAgICBkZWNsYXJhdGlvbnM6IFtQaWNrTGlzdF1cbn0pXG5leHBvcnQgY2xhc3MgUGlja0xpc3RNb2R1bGUgeyB9XG4iXX0=