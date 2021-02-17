import { NgModule, Component, ElementRef, Input, Output, ContentChildren, EventEmitter, ViewChild, ChangeDetectionStrategy, ViewEncapsulation, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { SharedModule, PrimeTemplate, FilterService } from 'primeng/api';
import { DomHandler } from 'primeng/dom';
import { RippleModule } from 'primeng/ripple';
import { ObjectUtils } from 'primeng/utils';
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
        this.SOURCE_LIST = -1;
        this.TARGET_LIST = 1;
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
    onDragStart(event, index, listType) {
        event.dataTransfer.setData('text', 'b'); // For firefox
        event.target.blur();
        this.dragging = true;
        this.fromListType = listType;
        if (listType === this.SOURCE_LIST)
            this.draggedItemIndexSource = index;
        else
            this.draggedItemIndexTarget = index;
    }
    onDragOver(event, index, listType) {
        if (this.dragging) {
            if (listType == this.SOURCE_LIST) {
                if (this.draggedItemIndexSource !== index && this.draggedItemIndexSource + 1 !== index || (this.fromListType === this.TARGET_LIST)) {
                    this.dragOverItemIndexSource = index;
                    event.preventDefault();
                }
            }
            else {
                if (this.draggedItemIndexTarget !== index && this.draggedItemIndexTarget + 1 !== index || (this.fromListType === this.SOURCE_LIST)) {
                    this.dragOverItemIndexTarget = index;
                    event.preventDefault();
                }
            }
            this.onListItemDroppoint = true;
        }
    }
    onDragLeave(event, listType) {
        this.dragOverItemIndexSource = null;
        this.dragOverItemIndexTarget = null;
        this.onListItemDroppoint = false;
    }
    onDrop(event, index, listType) {
        if (this.onListItemDroppoint) {
            if (listType === this.SOURCE_LIST) {
                if (this.fromListType === this.TARGET_LIST) {
                    this.insert(this.draggedItemIndexTarget, this.target, index, this.source, this.onMoveToSource);
                }
                else {
                    ObjectUtils.reorderArray(this.source, this.draggedItemIndexSource, (this.draggedItemIndexSource > index) ? index : (index === 0) ? 0 : index - 1);
                    this.onSourceReorder.emit({ items: this.source[this.draggedItemIndexSource] });
                }
                this.dragOverItemIndexSource = null;
            }
            else {
                if (this.fromListType === this.SOURCE_LIST) {
                    this.insert(this.draggedItemIndexSource, this.source, index, this.target, this.onMoveToTarget);
                }
                else {
                    ObjectUtils.reorderArray(this.target, this.draggedItemIndexTarget, (this.draggedItemIndexTarget > index) ? index : (index === 0) ? 0 : index - 1);
                    this.onTargetReorder.emit({ items: this.target[this.draggedItemIndexTarget] });
                }
                this.dragOverItemIndexTarget = null;
            }
            this.listHighlightTarget = false;
            this.listHighlightSource = false;
            event.preventDefault();
        }
    }
    onDragEnd(event) {
        this.dragging = false;
    }
    onListDrop(event, listType) {
        if (!this.onListItemDroppoint) {
            if (listType === this.SOURCE_LIST) {
                if (this.fromListType === this.TARGET_LIST) {
                    this.insert(this.draggedItemIndexTarget, this.target, null, this.source, this.onMoveToSource);
                }
            }
            else {
                if (this.fromListType === this.SOURCE_LIST) {
                    this.insert(this.draggedItemIndexSource, this.source, null, this.target, this.onMoveToTarget);
                }
            }
            this.listHighlightTarget = false;
            this.listHighlightSource = false;
            event.preventDefault();
        }
    }
    insert(fromIndex, fromList, toIndex, toList, callback) {
        const elementtomove = fromList[fromIndex];
        if (toIndex === null)
            toList.push(fromList.splice(fromIndex, 1)[0]);
        else
            toList.splice(toIndex, 0, fromList.splice(fromIndex, 1)[0]);
        callback.emit({
            items: [elementtomove]
        });
    }
    onListMouseMove(event, listType) {
        if (this.dragging) {
            let moveListType = (listType == 0 ? this.listViewSourceChild : this.listViewTargetChild);
            let offsetY = moveListType.nativeElement.getBoundingClientRect().top + document.body.scrollTop;
            let bottomDiff = (offsetY + moveListType.nativeElement.clientHeight) - event.pageY;
            let topDiff = (event.pageY - offsetY);
            if (bottomDiff < 25 && bottomDiff > 0)
                moveListType.nativeElement.scrollTop += 15;
            else if (topDiff < 25 && topDiff > 0)
                moveListType.nativeElement.scrollTop -= 15;
            if (listType === this.SOURCE_LIST) {
                if (this.fromListType === this.TARGET_LIST)
                    this.listHighlightSource = true;
            }
            else {
                if (this.fromListType === this.SOURCE_LIST)
                    this.listHighlightTarget = true;
            }
            event.preventDefault();
        }
    }
    onListDragLeave() {
        this.listHighlightTarget = false;
        this.listHighlightSource = false;
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
}
PickList.decorators = [
    { type: Component, args: [{
                selector: 'p-pickList',
                template: `
        <div [class]="styleClass" [ngStyle]="style" [ngClass]="'p-picklist p-component'">
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
                
                <ul #sourcelist class="p-picklist-list p-picklist-source" [ngClass]="{'p-picklist-list-highlight': listHighlightSource}"
                    [ngStyle]="sourceStyle" (dragover)="onListMouseMove($event,SOURCE_LIST)" (dragleave)="onListDragLeave()" (drop)="onListDrop($event, SOURCE_LIST)" role="listbox" aria-multiselectable="multiple">
                    <ng-template ngFor let-item [ngForOf]="source" [ngForTrackBy]="sourceTrackBy || trackBy" let-i="index" let-l="last">
                        <li class="p-picklist-droppoint" *ngIf="dragdrop" (dragover)="onDragOver($event, i, SOURCE_LIST)" (drop)="onDrop($event, i, SOURCE_LIST)" (dragleave)="onDragLeave($event, SOURCE_LIST)"
                        [ngClass]="{'p-picklist-droppoint-highlight': (i === dragOverItemIndexSource)}" [style.display]="isItemVisible(item, SOURCE_LIST) ? 'block' : 'none'"></li>
                        <li [ngClass]="{'p-picklist-item':true,'p-highlight':isSelected(item,selectedItemsSource),'p-disabled': disabled}" pRipple
                            (click)="onItemClick($event,item,selectedItemsSource,onSourceSelect)" (dblclick)="onSourceItemDblClick()" (touchend)="onItemTouchEnd($event)" (keydown)="onItemKeydown($event,item,selectedItemsSource,onSourceSelect)"
                            [style.display]="isItemVisible(item, SOURCE_LIST) ? 'block' : 'none'" tabindex="0" role="option" [attr.aria-selected]="isSelected(item, selectedItemsSource)"
                            [attr.draggable]="dragdrop" (dragstart)="onDragStart($event, i, SOURCE_LIST)" (dragend)="onDragEnd($event)">
                            <ng-container *ngTemplateOutlet="itemTemplate; context: {$implicit: item, index: i}"></ng-container>
                        </li>
                        <li class="p-picklist-droppoint" *ngIf="dragdrop&&l" (dragover)="onDragOver($event, i + 1, SOURCE_LIST)" (drop)="onDrop($event, i + 1, SOURCE_LIST)" (dragleave)="onDragLeave($event, SOURCE_LIST)"
                        [ngClass]="{'p-picklist-droppoint-highlight': (i + 1 === dragOverItemIndexSource)}"></li>
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
                <ul #targetlist class="p-picklist-list p-picklist-target" [ngClass]="{'p-picklist-list-highlight': listHighlightTarget}"
                    [ngStyle]="targetStyle" (dragover)="onListMouseMove($event,TARGET_LIST)" (dragleave)="onListDragLeave()" (drop)="onListDrop($event,TARGET_LIST)" role="listbox" aria-multiselectable="multiple">
                    <ng-template ngFor let-item [ngForOf]="target" [ngForTrackBy]="targetTrackBy || trackBy" let-i="index" let-l="last">
                        <li class="p-picklist-droppoint" *ngIf="dragdrop" (dragover)="onDragOver($event, i, TARGET_LIST)" (drop)="onDrop($event, i, TARGET_LIST)" (dragleave)="onDragLeave($event, TARGET_LIST)"
                        [ngClass]="{'p-picklist-droppoint-highlight': (i === dragOverItemIndexTarget)}" [style.display]="isItemVisible(item, TARGET_LIST) ? 'block' : 'none'"></li>
                        <li [ngClass]="{'p-picklist-item':true,'p-highlight':isSelected(item,selectedItemsTarget), 'p-disabled': disabled}" pRipple
                            (click)="onItemClick($event,item,selectedItemsTarget,onTargetSelect)" (dblclick)="onTargetItemDblClick()" (touchend)="onItemTouchEnd($event)" (keydown)="onItemKeydown($event,item,selectedItemsTarget,onTargetSelect)"
                            [style.display]="isItemVisible(item, TARGET_LIST) ? 'block' : 'none'" tabindex="0" role="option" [attr.aria-selected]="isSelected(item, selectedItemsTarget)"
                            [attr.draggable]="dragdrop" (dragstart)="onDragStart($event, i, TARGET_LIST)" (dragend)="onDragEnd($event)">
                            <ng-container *ngTemplateOutlet="itemTemplate; context: {$implicit: item, index: i}"></ng-container>
                        </li>
                        <li class="p-picklist-droppoint" *ngIf="dragdrop&&l" (dragover)="onDragOver($event, i + 1, TARGET_LIST)" (drop)="onDrop($event, i + 1, TARGET_LIST)" (dragleave)="onDragLeave($event, TARGET_LIST)"
                        [ngClass]="{'p-picklist-droppoint-highlight': (i + 1 === dragOverItemIndexTarget)}"></li>
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
                styles: [".p-picklist{display:flex}.p-picklist-buttons{display:flex;flex-direction:column;justify-content:center}.p-picklist-list-wrapper{flex:1 1 50%}.p-picklist-list{list-style-type:none;margin:0;max-height:24rem;min-height:12rem;overflow:auto;padding:0}.p-picklist-item{cursor:pointer;overflow:hidden;position:relative}.p-picklist-item[draggable=true]{cursor:move}.p-picklist-filter{position:relative}.p-picklist-filter-icon{margin-top:-.5rem;position:absolute;top:50%}.p-picklist-filter-input{width:100%}.p-picklist-droppoint{height:6px}"]
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
                imports: [CommonModule, ButtonModule, SharedModule, RippleModule],
                exports: [PickList, SharedModule],
                declarations: [PickList]
            },] }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGlja2xpc3QuanMiLCJzb3VyY2VSb290IjoiLi4vLi4vLi4vc3JjL2FwcC9jb21wb25lbnRzL3BpY2tsaXN0LyIsInNvdXJjZXMiOlsicGlja2xpc3QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFFBQVEsRUFBRSxTQUFTLEVBQUUsVUFBVSxFQUFzQyxLQUFLLEVBQUUsTUFBTSxFQUFFLGVBQWUsRUFBMEIsWUFBWSxFQUFFLFNBQVMsRUFBRSx1QkFBdUIsRUFBRSxpQkFBaUIsRUFBRSxpQkFBaUIsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUNuUCxPQUFPLEVBQUMsWUFBWSxFQUFDLE1BQU0saUJBQWlCLENBQUM7QUFDN0MsT0FBTyxFQUFDLFlBQVksRUFBQyxNQUFNLGdCQUFnQixDQUFDO0FBQzVDLE9BQU8sRUFBQyxZQUFZLEVBQUMsYUFBYSxFQUFDLGFBQWEsRUFBQyxNQUFNLGFBQWEsQ0FBQztBQUNyRSxPQUFPLEVBQUMsVUFBVSxFQUFDLE1BQU0sYUFBYSxDQUFDO0FBQ3ZDLE9BQU8sRUFBQyxZQUFZLEVBQUMsTUFBTSxnQkFBZ0IsQ0FBQztBQUM1QyxPQUFPLEVBQUMsV0FBVyxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBNkYxQyxNQUFNLE9BQU8sUUFBUTtJQXNJakIsWUFBbUIsRUFBYyxFQUFTLEVBQXFCLEVBQVMsYUFBNEI7UUFBakYsT0FBRSxHQUFGLEVBQUUsQ0FBWTtRQUFTLE9BQUUsR0FBRixFQUFFLENBQW1CO1FBQVMsa0JBQWEsR0FBYixhQUFhLENBQWU7UUF0SDNGLFlBQU8sR0FBYSxDQUFDLEtBQWEsRUFBRSxJQUFTLEVBQUUsRUFBRSxDQUFDLElBQUksQ0FBQztRQU12RCxxQkFBZ0IsR0FBWSxJQUFJLENBQUM7UUFFakMscUJBQWdCLEdBQVksSUFBSSxDQUFDO1FBRWpDLHFCQUFnQixHQUFZLElBQUksQ0FBQztRQVlqQyx1QkFBa0IsR0FBWSxJQUFJLENBQUM7UUFFbkMsdUJBQWtCLEdBQVksSUFBSSxDQUFDO1FB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Ozs7Ozs7Ozs7Ozs7S0FvRlQ7Z0JBQ0QsZUFBZSxFQUFFLHVCQUF1QixDQUFDLE1BQU07Z0JBQy9DLGFBQWEsRUFBRSxpQkFBaUIsQ0FBQyxJQUFJOzthQUV4Qzs7O1lBbEc2QixVQUFVO1lBQW1LLGlCQUFpQjtZQUd6TCxhQUFhOzs7cUJBa0czQyxLQUFLO3FCQUVMLEtBQUs7MkJBRUwsS0FBSzsyQkFFTCxLQUFLO3lCQUVMLEtBQUs7dUJBRUwsS0FBSzsyQkFFTCxLQUFLO3NCQUVMLEtBQUs7NEJBRUwsS0FBSzs0QkFFTCxLQUFLOytCQUVMLEtBQUs7K0JBRUwsS0FBSzsrQkFFTCxLQUFLO3VCQUVMLEtBQUs7b0JBRUwsS0FBSzt5QkFFTCxLQUFLOzBCQUVMLEtBQUs7MEJBRUwsS0FBSztpQ0FFTCxLQUFLO2lDQUVMLEtBQUs7c0NBRUwsS0FBSztzQ0FFTCxLQUFLO3VCQUVMLEtBQUs7b0NBRUwsS0FBSztvQ0FFTCxLQUFLOzhCQUVMLEtBQUs7NkJBRUwsTUFBTTtnQ0FFTixNQUFNO2dDQUVOLE1BQU07NkJBRU4sTUFBTTs4QkFFTixNQUFNOzhCQUVOLE1BQU07NkJBRU4sTUFBTTs2QkFFTixNQUFNOzZCQUVOLE1BQU07NkJBRU4sTUFBTTtrQ0FFTixTQUFTLFNBQUMsWUFBWTtrQ0FFdEIsU0FBUyxTQUFDLFlBQVk7b0NBRXRCLFNBQVMsU0FBQyxjQUFjO29DQUV4QixTQUFTLFNBQUMsY0FBYzt3QkFFeEIsZUFBZSxTQUFDLGFBQWE7O0FBcWxCbEMsTUFBTSxPQUFPLGNBQWM7OztZQUwxQixRQUFRLFNBQUM7Z0JBQ04sT0FBTyxFQUFFLENBQUMsWUFBWSxFQUFDLFlBQVksRUFBQyxZQUFZLEVBQUMsWUFBWSxDQUFDO2dCQUM5RCxPQUFPLEVBQUUsQ0FBQyxRQUFRLEVBQUMsWUFBWSxDQUFDO2dCQUNoQyxZQUFZLEVBQUUsQ0FBQyxRQUFRLENBQUM7YUFDM0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBOZ01vZHVsZSwgQ29tcG9uZW50LCBFbGVtZW50UmVmLCBBZnRlckNvbnRlbnRJbml0LCBBZnRlclZpZXdDaGVja2VkLCBJbnB1dCwgT3V0cHV0LCBDb250ZW50Q2hpbGRyZW4sIFF1ZXJ5TGlzdCwgVGVtcGxhdGVSZWYsIEV2ZW50RW1pdHRlciwgVmlld0NoaWxkLCBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSwgVmlld0VuY2Fwc3VsYXRpb24sIENoYW5nZURldGVjdG9yUmVmfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7Q29tbW9uTW9kdWxlfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHtCdXR0b25Nb2R1bGV9IGZyb20gJ3ByaW1lbmcvYnV0dG9uJztcbmltcG9ydCB7U2hhcmVkTW9kdWxlLFByaW1lVGVtcGxhdGUsRmlsdGVyU2VydmljZX0gZnJvbSAncHJpbWVuZy9hcGknO1xuaW1wb3J0IHtEb21IYW5kbGVyfSBmcm9tICdwcmltZW5nL2RvbSc7XG5pbXBvcnQge1JpcHBsZU1vZHVsZX0gZnJvbSAncHJpbWVuZy9yaXBwbGUnO1xuaW1wb3J0IHtPYmplY3RVdGlsc30gZnJvbSAncHJpbWVuZy91dGlscyc7XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAncC1waWNrTGlzdCcsXG4gICAgdGVtcGxhdGU6IGBcbiAgICAgICAgPGRpdiBbY2xhc3NdPVwic3R5bGVDbGFzc1wiIFtuZ1N0eWxlXT1cInN0eWxlXCIgW25nQ2xhc3NdPVwiJ3AtcGlja2xpc3QgcC1jb21wb25lbnQnXCI+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwicC1waWNrbGlzdC1idXR0b25zIHAtcGlja2xpc3Qtc291cmNlLWNvbnRyb2xzXCIgKm5nSWY9XCJzaG93U291cmNlQ29udHJvbHNcIj5cbiAgICAgICAgICAgICAgICA8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBwQnV0dG9uIHBSaXBwbGUgaWNvbj1cInBpIHBpLWFuZ2xlLXVwXCIgW2Rpc2FibGVkXT1cImRpc2FibGVkXCIgKGNsaWNrKT1cIm1vdmVVcChzb3VyY2VsaXN0LHNvdXJjZSxzZWxlY3RlZEl0ZW1zU291cmNlLG9uU291cmNlUmVvcmRlcilcIj48L2J1dHRvbj5cbiAgICAgICAgICAgICAgICA8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBwQnV0dG9uIHBSaXBwbGUgaWNvbj1cInBpIHBpLWFuZ2xlLWRvdWJsZS11cFwiIFtkaXNhYmxlZF09XCJkaXNhYmxlZFwiIChjbGljayk9XCJtb3ZlVG9wKHNvdXJjZWxpc3Qsc291cmNlLHNlbGVjdGVkSXRlbXNTb3VyY2Usb25Tb3VyY2VSZW9yZGVyKVwiPjwvYnV0dG9uPlxuICAgICAgICAgICAgICAgIDxidXR0b24gdHlwZT1cImJ1dHRvblwiIHBCdXR0b24gcFJpcHBsZSBpY29uPVwicGkgcGktYW5nbGUtZG93blwiIFtkaXNhYmxlZF09XCJkaXNhYmxlZFwiIChjbGljayk9XCJtb3ZlRG93bihzb3VyY2VsaXN0LHNvdXJjZSxzZWxlY3RlZEl0ZW1zU291cmNlLG9uU291cmNlUmVvcmRlcilcIj48L2J1dHRvbj5cbiAgICAgICAgICAgICAgICA8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBwQnV0dG9uIHBSaXBwbGUgaWNvbj1cInBpIHBpLWFuZ2xlLWRvdWJsZS1kb3duXCIgW2Rpc2FibGVkXT1cImRpc2FibGVkXCIgKGNsaWNrKT1cIm1vdmVCb3R0b20oc291cmNlbGlzdCxzb3VyY2Usc2VsZWN0ZWRJdGVtc1NvdXJjZSxvblNvdXJjZVJlb3JkZXIpXCI+PC9idXR0b24+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJwLXBpY2tsaXN0LWxpc3Qtd3JhcHBlciBwLXBpY2tsaXN0LXNvdXJjZS13cmFwcGVyXCI+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInAtcGlja2xpc3QtaGVhZGVyXCIgKm5nSWY9XCJzb3VyY2VIZWFkZXJcIj5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInAtcGlja2xpc3QtdGl0bGVcIj57e3NvdXJjZUhlYWRlcn19PC9kaXY+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInAtcGlja2xpc3QtZmlsdGVyLWNvbnRhaW5lclwiICpuZ0lmPVwiZmlsdGVyQnkgJiYgc2hvd1NvdXJjZUZpbHRlciAhPT0gZmFsc2VcIj5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInAtcGlja2xpc3QtZmlsdGVyXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8aW5wdXQgI3NvdXJjZUZpbHRlciB0eXBlPVwidGV4dFwiIHJvbGU9XCJ0ZXh0Ym94XCIgKGtleXVwKT1cIm9uRmlsdGVyKCRldmVudCxzb3VyY2UsU09VUkNFX0xJU1QpXCIgY2xhc3M9XCJwLXBpY2tsaXN0LWZpbHRlci1pbnB1dCBwLWlucHV0dGV4dCBwLWNvbXBvbmVudFwiIFtkaXNhYmxlZF09XCJkaXNhYmxlZFwiIFthdHRyLnBsYWNlaG9sZGVyXT1cInNvdXJjZUZpbHRlclBsYWNlaG9sZGVyXCIgW2F0dHIuYXJpYS1sYWJlbF09XCJhcmlhU291cmNlRmlsdGVyTGFiZWxcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwicC1waWNrbGlzdC1maWx0ZXItaWNvbiBwaSBwaS1zZWFyY2hcIj48L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIDx1bCAjc291cmNlbGlzdCBjbGFzcz1cInAtcGlja2xpc3QtbGlzdCBwLXBpY2tsaXN0LXNvdXJjZVwiIFtuZ0NsYXNzXT1cInsncC1waWNrbGlzdC1saXN0LWhpZ2hsaWdodCc6IGxpc3RIaWdobGlnaHRTb3VyY2V9XCJcbiAgICAgICAgICAgICAgICAgICAgW25nU3R5bGVdPVwic291cmNlU3R5bGVcIiAoZHJhZ292ZXIpPVwib25MaXN0TW91c2VNb3ZlKCRldmVudCxTT1VSQ0VfTElTVClcIiAoZHJhZ2xlYXZlKT1cIm9uTGlzdERyYWdMZWF2ZSgpXCIgKGRyb3ApPVwib25MaXN0RHJvcCgkZXZlbnQsIFNPVVJDRV9MSVNUKVwiIHJvbGU9XCJsaXN0Ym94XCIgYXJpYS1tdWx0aXNlbGVjdGFibGU9XCJtdWx0aXBsZVwiPlxuICAgICAgICAgICAgICAgICAgICA8bmctdGVtcGxhdGUgbmdGb3IgbGV0LWl0ZW0gW25nRm9yT2ZdPVwic291cmNlXCIgW25nRm9yVHJhY2tCeV09XCJzb3VyY2VUcmFja0J5IHx8IHRyYWNrQnlcIiBsZXQtaT1cImluZGV4XCIgbGV0LWw9XCJsYXN0XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8bGkgY2xhc3M9XCJwLXBpY2tsaXN0LWRyb3Bwb2ludFwiICpuZ0lmPVwiZHJhZ2Ryb3BcIiAoZHJhZ292ZXIpPVwib25EcmFnT3ZlcigkZXZlbnQsIGksIFNPVVJDRV9MSVNUKVwiIChkcm9wKT1cIm9uRHJvcCgkZXZlbnQsIGksIFNPVVJDRV9MSVNUKVwiIChkcmFnbGVhdmUpPVwib25EcmFnTGVhdmUoJGV2ZW50LCBTT1VSQ0VfTElTVClcIlxuICAgICAgICAgICAgICAgICAgICAgICAgW25nQ2xhc3NdPVwieydwLXBpY2tsaXN0LWRyb3Bwb2ludC1oaWdobGlnaHQnOiAoaSA9PT0gZHJhZ092ZXJJdGVtSW5kZXhTb3VyY2UpfVwiIFtzdHlsZS5kaXNwbGF5XT1cImlzSXRlbVZpc2libGUoaXRlbSwgU09VUkNFX0xJU1QpID8gJ2Jsb2NrJyA6ICdub25lJ1wiPjwvbGk+XG4gICAgICAgICAgICAgICAgICAgICAgICA8bGkgW25nQ2xhc3NdPVwieydwLXBpY2tsaXN0LWl0ZW0nOnRydWUsJ3AtaGlnaGxpZ2h0Jzppc1NlbGVjdGVkKGl0ZW0sc2VsZWN0ZWRJdGVtc1NvdXJjZSksJ3AtZGlzYWJsZWQnOiBkaXNhYmxlZH1cIiBwUmlwcGxlXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKGNsaWNrKT1cIm9uSXRlbUNsaWNrKCRldmVudCxpdGVtLHNlbGVjdGVkSXRlbXNTb3VyY2Usb25Tb3VyY2VTZWxlY3QpXCIgKGRibGNsaWNrKT1cIm9uU291cmNlSXRlbURibENsaWNrKClcIiAodG91Y2hlbmQpPVwib25JdGVtVG91Y2hFbmQoJGV2ZW50KVwiIChrZXlkb3duKT1cIm9uSXRlbUtleWRvd24oJGV2ZW50LGl0ZW0sc2VsZWN0ZWRJdGVtc1NvdXJjZSxvblNvdXJjZVNlbGVjdClcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtzdHlsZS5kaXNwbGF5XT1cImlzSXRlbVZpc2libGUoaXRlbSwgU09VUkNFX0xJU1QpID8gJ2Jsb2NrJyA6ICdub25lJ1wiIHRhYmluZGV4PVwiMFwiIHJvbGU9XCJvcHRpb25cIiBbYXR0ci5hcmlhLXNlbGVjdGVkXT1cImlzU2VsZWN0ZWQoaXRlbSwgc2VsZWN0ZWRJdGVtc1NvdXJjZSlcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFthdHRyLmRyYWdnYWJsZV09XCJkcmFnZHJvcFwiIChkcmFnc3RhcnQpPVwib25EcmFnU3RhcnQoJGV2ZW50LCBpLCBTT1VSQ0VfTElTVClcIiAoZHJhZ2VuZCk9XCJvbkRyYWdFbmQoJGV2ZW50KVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxuZy1jb250YWluZXIgKm5nVGVtcGxhdGVPdXRsZXQ9XCJpdGVtVGVtcGxhdGU7IGNvbnRleHQ6IHskaW1wbGljaXQ6IGl0ZW0sIGluZGV4OiBpfVwiPjwvbmctY29udGFpbmVyPlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9saT5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxsaSBjbGFzcz1cInAtcGlja2xpc3QtZHJvcHBvaW50XCIgKm5nSWY9XCJkcmFnZHJvcCYmbFwiIChkcmFnb3Zlcik9XCJvbkRyYWdPdmVyKCRldmVudCwgaSArIDEsIFNPVVJDRV9MSVNUKVwiIChkcm9wKT1cIm9uRHJvcCgkZXZlbnQsIGkgKyAxLCBTT1VSQ0VfTElTVClcIiAoZHJhZ2xlYXZlKT1cIm9uRHJhZ0xlYXZlKCRldmVudCwgU09VUkNFX0xJU1QpXCJcbiAgICAgICAgICAgICAgICAgICAgICAgIFtuZ0NsYXNzXT1cInsncC1waWNrbGlzdC1kcm9wcG9pbnQtaGlnaGxpZ2h0JzogKGkgKyAxID09PSBkcmFnT3Zlckl0ZW1JbmRleFNvdXJjZSl9XCI+PC9saT5cbiAgICAgICAgICAgICAgICAgICAgPC9uZy10ZW1wbGF0ZT5cbiAgICAgICAgICAgICAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdJZj1cIihzb3VyY2UgPT0gbnVsbCB8fCBzb3VyY2UubGVuZ3RoID09PSAwKSAmJiBlbXB0eU1lc3NhZ2VTb3VyY2VUZW1wbGF0ZVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGxpIGNsYXNzPVwicC1waWNrbGlzdC1lbXB0eS1tZXNzYWdlXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdUZW1wbGF0ZU91dGxldD1cImVtcHR5TWVzc2FnZVNvdXJjZVRlbXBsYXRlXCI+PC9uZy1jb250YWluZXI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L2xpPlxuICAgICAgICAgICAgICAgICAgICA8L25nLWNvbnRhaW5lcj5cbiAgICAgICAgICAgICAgICA8L3VsPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwicC1waWNrbGlzdC1idXR0b25zIHAtcGlja2xpc3QtdHJhbnNmZXItYnV0dG9uc1wiPlxuICAgICAgICAgICAgICAgIDxidXR0b24gdHlwZT1cImJ1dHRvblwiIHBCdXR0b24gcFJpcHBsZSBpY29uPVwicGkgcGktYW5nbGUtcmlnaHRcIiBbZGlzYWJsZWRdPVwiZGlzYWJsZWRcIiAoY2xpY2spPVwibW92ZVJpZ2h0KClcIj48L2J1dHRvbj5cbiAgICAgICAgICAgICAgICA8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBwQnV0dG9uIHBSaXBwbGUgaWNvbj1cInBpIHBpLWFuZ2xlLWRvdWJsZS1yaWdodFwiIFtkaXNhYmxlZF09XCJkaXNhYmxlZFwiIChjbGljayk9XCJtb3ZlQWxsUmlnaHQoKVwiPjwvYnV0dG9uPlxuICAgICAgICAgICAgICAgIDxidXR0b24gdHlwZT1cImJ1dHRvblwiIHBCdXR0b24gcFJpcHBsZSBpY29uPVwicGkgcGktYW5nbGUtbGVmdFwiIFtkaXNhYmxlZF09XCJkaXNhYmxlZFwiIChjbGljayk9XCJtb3ZlTGVmdCgpXCI+PC9idXR0b24+XG4gICAgICAgICAgICAgICAgPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgcEJ1dHRvbiBwUmlwcGxlIGljb249XCJwaSBwaS1hbmdsZS1kb3VibGUtbGVmdFwiIFtkaXNhYmxlZF09XCJkaXNhYmxlZFwiIChjbGljayk9XCJtb3ZlQWxsTGVmdCgpXCI+PC9idXR0b24+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJwLXBpY2tsaXN0LWxpc3Qtd3JhcHBlciBwLXBpY2tsaXN0LXRhcmdldC13cmFwcGVyXCI+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInAtcGlja2xpc3QtaGVhZGVyXCIgKm5nSWY9XCJ0YXJnZXRIZWFkZXJcIj5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInAtcGlja2xpc3QtdGl0bGVcIiAqbmdJZj1cInRhcmdldEhlYWRlclwiPnt7dGFyZ2V0SGVhZGVyfX08L2Rpdj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwicC1waWNrbGlzdC1maWx0ZXItY29udGFpbmVyXCIgKm5nSWY9XCJmaWx0ZXJCeSAmJiBzaG93VGFyZ2V0RmlsdGVyICE9PSBmYWxzZVwiPlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwicC1waWNrbGlzdC1maWx0ZXJcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxpbnB1dCAjdGFyZ2V0RmlsdGVyIHR5cGU9XCJ0ZXh0XCIgcm9sZT1cInRleHRib3hcIiAoa2V5dXApPVwib25GaWx0ZXIoJGV2ZW50LHRhcmdldCxUQVJHRVRfTElTVClcIiBjbGFzcz1cInAtcGlja2xpc3QtZmlsdGVyLWlucHV0IHAtaW5wdXR0ZXh0IHAtY29tcG9uZW50XCIgW2Rpc2FibGVkXT1cImRpc2FibGVkXCIgW2F0dHIucGxhY2Vob2xkZXJdPVwidGFyZ2V0RmlsdGVyUGxhY2Vob2xkZXJcIiBbYXR0ci5hcmlhLWxhYmVsXT1cImFyaWFUYXJnZXRGaWx0ZXJMYWJlbFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJwLXBpY2tsaXN0LWZpbHRlci1pY29uIHBpIHBpLXNlYXJjaFwiPjwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPHVsICN0YXJnZXRsaXN0IGNsYXNzPVwicC1waWNrbGlzdC1saXN0IHAtcGlja2xpc3QtdGFyZ2V0XCIgW25nQ2xhc3NdPVwieydwLXBpY2tsaXN0LWxpc3QtaGlnaGxpZ2h0JzogbGlzdEhpZ2hsaWdodFRhcmdldH1cIlxuICAgICAgICAgICAgICAgICAgICBbbmdTdHlsZV09XCJ0YXJnZXRTdHlsZVwiIChkcmFnb3Zlcik9XCJvbkxpc3RNb3VzZU1vdmUoJGV2ZW50LFRBUkdFVF9MSVNUKVwiIChkcmFnbGVhdmUpPVwib25MaXN0RHJhZ0xlYXZlKClcIiAoZHJvcCk9XCJvbkxpc3REcm9wKCRldmVudCxUQVJHRVRfTElTVClcIiByb2xlPVwibGlzdGJveFwiIGFyaWEtbXVsdGlzZWxlY3RhYmxlPVwibXVsdGlwbGVcIj5cbiAgICAgICAgICAgICAgICAgICAgPG5nLXRlbXBsYXRlIG5nRm9yIGxldC1pdGVtIFtuZ0Zvck9mXT1cInRhcmdldFwiIFtuZ0ZvclRyYWNrQnldPVwidGFyZ2V0VHJhY2tCeSB8fCB0cmFja0J5XCIgbGV0LWk9XCJpbmRleFwiIGxldC1sPVwibGFzdFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGxpIGNsYXNzPVwicC1waWNrbGlzdC1kcm9wcG9pbnRcIiAqbmdJZj1cImRyYWdkcm9wXCIgKGRyYWdvdmVyKT1cIm9uRHJhZ092ZXIoJGV2ZW50LCBpLCBUQVJHRVRfTElTVClcIiAoZHJvcCk9XCJvbkRyb3AoJGV2ZW50LCBpLCBUQVJHRVRfTElTVClcIiAoZHJhZ2xlYXZlKT1cIm9uRHJhZ0xlYXZlKCRldmVudCwgVEFSR0VUX0xJU1QpXCJcbiAgICAgICAgICAgICAgICAgICAgICAgIFtuZ0NsYXNzXT1cInsncC1waWNrbGlzdC1kcm9wcG9pbnQtaGlnaGxpZ2h0JzogKGkgPT09IGRyYWdPdmVySXRlbUluZGV4VGFyZ2V0KX1cIiBbc3R5bGUuZGlzcGxheV09XCJpc0l0ZW1WaXNpYmxlKGl0ZW0sIFRBUkdFVF9MSVNUKSA/ICdibG9jaycgOiAnbm9uZSdcIj48L2xpPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGxpIFtuZ0NsYXNzXT1cInsncC1waWNrbGlzdC1pdGVtJzp0cnVlLCdwLWhpZ2hsaWdodCc6aXNTZWxlY3RlZChpdGVtLHNlbGVjdGVkSXRlbXNUYXJnZXQpLCAncC1kaXNhYmxlZCc6IGRpc2FibGVkfVwiIHBSaXBwbGVcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAoY2xpY2spPVwib25JdGVtQ2xpY2soJGV2ZW50LGl0ZW0sc2VsZWN0ZWRJdGVtc1RhcmdldCxvblRhcmdldFNlbGVjdClcIiAoZGJsY2xpY2spPVwib25UYXJnZXRJdGVtRGJsQ2xpY2soKVwiICh0b3VjaGVuZCk9XCJvbkl0ZW1Ub3VjaEVuZCgkZXZlbnQpXCIgKGtleWRvd24pPVwib25JdGVtS2V5ZG93bigkZXZlbnQsaXRlbSxzZWxlY3RlZEl0ZW1zVGFyZ2V0LG9uVGFyZ2V0U2VsZWN0KVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgW3N0eWxlLmRpc3BsYXldPVwiaXNJdGVtVmlzaWJsZShpdGVtLCBUQVJHRVRfTElTVCkgPyAnYmxvY2snIDogJ25vbmUnXCIgdGFiaW5kZXg9XCIwXCIgcm9sZT1cIm9wdGlvblwiIFthdHRyLmFyaWEtc2VsZWN0ZWRdPVwiaXNTZWxlY3RlZChpdGVtLCBzZWxlY3RlZEl0ZW1zVGFyZ2V0KVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgW2F0dHIuZHJhZ2dhYmxlXT1cImRyYWdkcm9wXCIgKGRyYWdzdGFydCk9XCJvbkRyYWdTdGFydCgkZXZlbnQsIGksIFRBUkdFVF9MSVNUKVwiIChkcmFnZW5kKT1cIm9uRHJhZ0VuZCgkZXZlbnQpXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdUZW1wbGF0ZU91dGxldD1cIml0ZW1UZW1wbGF0ZTsgY29udGV4dDogeyRpbXBsaWNpdDogaXRlbSwgaW5kZXg6IGl9XCI+PC9uZy1jb250YWluZXI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L2xpPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGxpIGNsYXNzPVwicC1waWNrbGlzdC1kcm9wcG9pbnRcIiAqbmdJZj1cImRyYWdkcm9wJiZsXCIgKGRyYWdvdmVyKT1cIm9uRHJhZ092ZXIoJGV2ZW50LCBpICsgMSwgVEFSR0VUX0xJU1QpXCIgKGRyb3ApPVwib25Ecm9wKCRldmVudCwgaSArIDEsIFRBUkdFVF9MSVNUKVwiIChkcmFnbGVhdmUpPVwib25EcmFnTGVhdmUoJGV2ZW50LCBUQVJHRVRfTElTVClcIlxuICAgICAgICAgICAgICAgICAgICAgICAgW25nQ2xhc3NdPVwieydwLXBpY2tsaXN0LWRyb3Bwb2ludC1oaWdobGlnaHQnOiAoaSArIDEgPT09IGRyYWdPdmVySXRlbUluZGV4VGFyZ2V0KX1cIj48L2xpPlxuICAgICAgICAgICAgICAgICAgICA8L25nLXRlbXBsYXRlPlxuICAgICAgICAgICAgICAgICAgICA8bmctY29udGFpbmVyICpuZ0lmPVwiKHRhcmdldCA9PSBudWxsIHx8IHRhcmdldC5sZW5ndGggPT09IDApICYmIGVtcHR5TWVzc2FnZVRhcmdldFRlbXBsYXRlXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8bGkgY2xhc3M9XCJwLXBpY2tsaXN0LWVtcHR5LW1lc3NhZ2VcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8bmctY29udGFpbmVyICpuZ1RlbXBsYXRlT3V0bGV0PVwiZW1wdHlNZXNzYWdlVGFyZ2V0VGVtcGxhdGVcIj48L25nLWNvbnRhaW5lcj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvbGk+XG4gICAgICAgICAgICAgICAgICAgIDwvbmctY29udGFpbmVyPlxuICAgICAgICAgICAgICAgIDwvdWw+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJwLXBpY2tsaXN0LWJ1dHRvbnMgcC1waWNrbGlzdC10YXJnZXQtY29udHJvbHNcIiAqbmdJZj1cInNob3dUYXJnZXRDb250cm9sc1wiPlxuICAgICAgICAgICAgICAgIDxidXR0b24gdHlwZT1cImJ1dHRvblwiIHBCdXR0b24gcFJpcHBsZSBpY29uPVwicGkgcGktYW5nbGUtdXBcIiBbZGlzYWJsZWRdPVwiZGlzYWJsZWRcIiAoY2xpY2spPVwibW92ZVVwKHRhcmdldGxpc3QsdGFyZ2V0LHNlbGVjdGVkSXRlbXNUYXJnZXQsb25UYXJnZXRSZW9yZGVyKVwiPjwvYnV0dG9uPlxuICAgICAgICAgICAgICAgIDxidXR0b24gdHlwZT1cImJ1dHRvblwiIHBCdXR0b24gcFJpcHBsZSBpY29uPVwicGkgcGktYW5nbGUtZG91YmxlLXVwXCIgW2Rpc2FibGVkXT1cImRpc2FibGVkXCIgKGNsaWNrKT1cIm1vdmVUb3AodGFyZ2V0bGlzdCx0YXJnZXQsc2VsZWN0ZWRJdGVtc1RhcmdldCxvblRhcmdldFJlb3JkZXIpXCI+PC9idXR0b24+XG4gICAgICAgICAgICAgICAgPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgcEJ1dHRvbiBwUmlwcGxlIGljb249XCJwaSBwaS1hbmdsZS1kb3duXCIgW2Rpc2FibGVkXT1cImRpc2FibGVkXCIgKGNsaWNrKT1cIm1vdmVEb3duKHRhcmdldGxpc3QsdGFyZ2V0LHNlbGVjdGVkSXRlbXNUYXJnZXQsb25UYXJnZXRSZW9yZGVyKVwiPjwvYnV0dG9uPlxuICAgICAgICAgICAgICAgIDxidXR0b24gdHlwZT1cImJ1dHRvblwiIHBCdXR0b24gcFJpcHBsZSBpY29uPVwicGkgcGktYW5nbGUtZG91YmxlLWRvd25cIiBbZGlzYWJsZWRdPVwiZGlzYWJsZWRcIiAoY2xpY2spPVwibW92ZUJvdHRvbSh0YXJnZXRsaXN0LHRhcmdldCxzZWxlY3RlZEl0ZW1zVGFyZ2V0LG9uVGFyZ2V0UmVvcmRlcilcIj48L2J1dHRvbj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICBgLFxuICAgIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxuICAgIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmUsXG4gICAgc3R5bGVVcmxzOiBbJy4vcGlja2xpc3QuY3NzJ11cbn0pXG5leHBvcnQgY2xhc3MgUGlja0xpc3QgaW1wbGVtZW50cyBBZnRlclZpZXdDaGVja2VkLEFmdGVyQ29udGVudEluaXQge1xuXG4gICAgQElucHV0KCkgc291cmNlOiBhbnlbXTtcblxuICAgIEBJbnB1dCgpIHRhcmdldDogYW55W107XG5cbiAgICBASW5wdXQoKSBzb3VyY2VIZWFkZXI6IHN0cmluZztcblxuICAgIEBJbnB1dCgpIHRhcmdldEhlYWRlcjogc3RyaW5nO1xuXG4gICAgQElucHV0KCkgcmVzcG9uc2l2ZTogYm9vbGVhbjtcblxuICAgIEBJbnB1dCgpIGZpbHRlckJ5OiBzdHJpbmc7XG5cbiAgICBASW5wdXQoKSBmaWx0ZXJMb2NhbGU6IHN0cmluZztcblxuICAgIEBJbnB1dCgpIHRyYWNrQnk6IEZ1bmN0aW9uID0gKGluZGV4OiBudW1iZXIsIGl0ZW06IGFueSkgPT4gaXRlbTtcblxuICAgIEBJbnB1dCgpIHNvdXJjZVRyYWNrQnk6IEZ1bmN0aW9uO1xuXG4gICAgQElucHV0KCkgdGFyZ2V0VHJhY2tCeTogRnVuY3Rpb247XG5cbiAgICBASW5wdXQoKSBzaG93U291cmNlRmlsdGVyOiBib29sZWFuID0gdHJ1ZTtcblxuICAgIEBJbnB1dCgpIHNob3dUYXJnZXRGaWx0ZXI6IGJvb2xlYW4gPSB0cnVlO1xuXG4gICAgQElucHV0KCkgbWV0YUtleVNlbGVjdGlvbjogYm9vbGVhbiA9IHRydWU7XG5cbiAgICBASW5wdXQoKSBkcmFnZHJvcDogYm9vbGVhbjtcblxuICAgIEBJbnB1dCgpIHN0eWxlOiBhbnk7XG5cbiAgICBASW5wdXQoKSBzdHlsZUNsYXNzOiBzdHJpbmc7XG5cbiAgICBASW5wdXQoKSBzb3VyY2VTdHlsZTogYW55O1xuXG4gICAgQElucHV0KCkgdGFyZ2V0U3R5bGU6IGFueTtcblxuICAgIEBJbnB1dCgpIHNob3dTb3VyY2VDb250cm9sczogYm9vbGVhbiA9IHRydWU7XG5cbiAgICBASW5wdXQoKSBzaG93VGFyZ2V0Q29udHJvbHM6IGJvb2xlYW4gPSB0cnVlO1xuXG4gICAgQElucHV0KCkgc291cmNlRmlsdGVyUGxhY2Vob2xkZXI6IHN0cmluZztcblxuICAgIEBJbnB1dCgpIHRhcmdldEZpbHRlclBsYWNlaG9sZGVyOiBzdHJpbmc7XG5cbiAgICBASW5wdXQoKSBkaXNhYmxlZDogYm9vbGVhbiA9IGZhbHNlO1xuXG4gICAgQElucHV0KCkgYXJpYVNvdXJjZUZpbHRlckxhYmVsOiBzdHJpbmc7XG5cbiAgICBASW5wdXQoKSBhcmlhVGFyZ2V0RmlsdGVyTGFiZWw6IHN0cmluZztcblxuICAgIEBJbnB1dCgpIGZpbHRlck1hdGNoTW9kZTogc3RyaW5nID0gXCJjb250YWluc1wiO1xuXG4gICAgQE91dHB1dCgpIG9uTW92ZVRvU291cmNlOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICAgIEBPdXRwdXQoKSBvbk1vdmVBbGxUb1NvdXJjZTogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgICBAT3V0cHV0KCkgb25Nb3ZlQWxsVG9UYXJnZXQ6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG4gICAgQE91dHB1dCgpIG9uTW92ZVRvVGFyZ2V0OiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICAgIEBPdXRwdXQoKSBvblNvdXJjZVJlb3JkZXI6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG4gICAgQE91dHB1dCgpIG9uVGFyZ2V0UmVvcmRlcjogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgICBAT3V0cHV0KCkgb25Tb3VyY2VTZWxlY3Q6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG4gICAgQE91dHB1dCgpIG9uVGFyZ2V0U2VsZWN0OiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICAgIEBPdXRwdXQoKSBvblNvdXJjZUZpbHRlcjogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgICBAT3V0cHV0KCkgb25UYXJnZXRGaWx0ZXI6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG4gICAgQFZpZXdDaGlsZCgnc291cmNlbGlzdCcpIGxpc3RWaWV3U291cmNlQ2hpbGQ6IEVsZW1lbnRSZWY7XG5cbiAgICBAVmlld0NoaWxkKCd0YXJnZXRsaXN0JykgbGlzdFZpZXdUYXJnZXRDaGlsZDogRWxlbWVudFJlZjtcblxuICAgIEBWaWV3Q2hpbGQoJ3NvdXJjZUZpbHRlcicpIHNvdXJjZUZpbHRlclZpZXdDaGlsZDogRWxlbWVudFJlZjtcblxuICAgIEBWaWV3Q2hpbGQoJ3RhcmdldEZpbHRlcicpIHRhcmdldEZpbHRlclZpZXdDaGlsZDogRWxlbWVudFJlZjtcblxuICAgIEBDb250ZW50Q2hpbGRyZW4oUHJpbWVUZW1wbGF0ZSkgdGVtcGxhdGVzOiBRdWVyeUxpc3Q8YW55PjtcblxuICAgIHB1YmxpYyBpdGVtVGVtcGxhdGU6IFRlbXBsYXRlUmVmPGFueT47XG5cbiAgICBwdWJsaWMgdmlzaWJsZU9wdGlvbnNTb3VyY2U6IGFueVtdO1xuXG4gICAgcHVibGljIHZpc2libGVPcHRpb25zVGFyZ2V0OiBhbnlbXTtcblxuICAgIHNlbGVjdGVkSXRlbXNTb3VyY2U6IGFueVtdID0gW107XG5cbiAgICBzZWxlY3RlZEl0ZW1zVGFyZ2V0OiBhbnlbXSA9IFtdO1xuXG4gICAgcmVvcmRlcmVkTGlzdEVsZW1lbnQ6IGFueTtcblxuICAgIGRyYWdnZWRJdGVtSW5kZXhTb3VyY2U6IG51bWJlcjtcblxuICAgIGRyYWdnZWRJdGVtSW5kZXhUYXJnZXQ6IG51bWJlcjtcblxuICAgIGRyYWdPdmVySXRlbUluZGV4U291cmNlOiBudW1iZXI7XG5cbiAgICBkcmFnT3Zlckl0ZW1JbmRleFRhcmdldDogbnVtYmVyO1xuXG4gICAgZHJhZ2dpbmc6IGJvb2xlYW47XG5cbiAgICBtb3ZlZFVwOiBib29sZWFuO1xuXG4gICAgbW92ZWREb3duOiBib29sZWFuO1xuXG4gICAgaXRlbVRvdWNoZWQ6IGJvb2xlYW47XG5cbiAgICBmaWx0ZXJWYWx1ZVNvdXJjZTogc3RyaW5nO1xuXG4gICAgZmlsdGVyVmFsdWVUYXJnZXQ6IHN0cmluZztcblxuICAgIGZyb21MaXN0VHlwZTogbnVtYmVyO1xuXG4gICAgdG9MaXN0VHlwZTogbnVtYmVyO1xuXG4gICAgb25MaXN0SXRlbURyb3Bwb2ludDogYm9vbGVhbjtcblxuICAgIGxpc3RIaWdobGlnaHRUYXJnZXQ6IGJvb2xlYW47XG5cbiAgICBsaXN0SGlnaGxpZ2h0U291cmNlOiBib29sZWFuO1xuXG4gICAgZW1wdHlNZXNzYWdlU291cmNlVGVtcGxhdGU6IFRlbXBsYXRlUmVmPGFueT47XG5cbiAgICBlbXB0eU1lc3NhZ2VUYXJnZXRUZW1wbGF0ZTogVGVtcGxhdGVSZWY8YW55PjtcblxuICAgIHJlYWRvbmx5IFNPVVJDRV9MSVNUID0gLTE7XG5cbiAgICByZWFkb25seSBUQVJHRVRfTElTVCA9IDE7XG5cbiAgICBjb25zdHJ1Y3RvcihwdWJsaWMgZWw6IEVsZW1lbnRSZWYsIHB1YmxpYyBjZDogQ2hhbmdlRGV0ZWN0b3JSZWYsIHB1YmxpYyBmaWx0ZXJTZXJ2aWNlOiBGaWx0ZXJTZXJ2aWNlKSB7fVxuXG4gICAgbmdBZnRlckNvbnRlbnRJbml0KCkge1xuICAgICAgICB0aGlzLnRlbXBsYXRlcy5mb3JFYWNoKChpdGVtKSA9PiB7XG4gICAgICAgICAgICBzd2l0Y2goaXRlbS5nZXRUeXBlKCkpIHtcbiAgICAgICAgICAgICAgICBjYXNlICdpdGVtJzpcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5pdGVtVGVtcGxhdGUgPSBpdGVtLnRlbXBsYXRlO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICAgICAgY2FzZSAnZW1wdHltZXNzYWdlc291cmNlJzpcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5lbXB0eU1lc3NhZ2VTb3VyY2VUZW1wbGF0ZSA9IGl0ZW0udGVtcGxhdGU7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgICAgICBjYXNlICdlbXB0eW1lc3NhZ2V0YXJnZXQnOlxuICAgICAgICAgICAgICAgICAgICB0aGlzLmVtcHR5TWVzc2FnZVRhcmdldFRlbXBsYXRlID0gaXRlbS50ZW1wbGF0ZTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgICAgICB0aGlzLml0ZW1UZW1wbGF0ZSA9IGl0ZW0udGVtcGxhdGU7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIG5nQWZ0ZXJWaWV3Q2hlY2tlZCgpIHtcbiAgICAgICAgaWYgKHRoaXMubW92ZWRVcHx8dGhpcy5tb3ZlZERvd24pIHtcbiAgICAgICAgICAgIGxldCBsaXN0SXRlbXMgPSBEb21IYW5kbGVyLmZpbmQodGhpcy5yZW9yZGVyZWRMaXN0RWxlbWVudCwgJ2xpLnAtaGlnaGxpZ2h0Jyk7XG4gICAgICAgICAgICBsZXQgbGlzdEl0ZW07XG5cbiAgICAgICAgICAgIGlmICh0aGlzLm1vdmVkVXApXG4gICAgICAgICAgICAgICAgbGlzdEl0ZW0gPSBsaXN0SXRlbXNbMF07XG4gICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgICAgbGlzdEl0ZW0gPSBsaXN0SXRlbXNbbGlzdEl0ZW1zLmxlbmd0aCAtIDFdO1xuXG4gICAgICAgICAgICBEb21IYW5kbGVyLnNjcm9sbEluVmlldyh0aGlzLnJlb3JkZXJlZExpc3RFbGVtZW50LCBsaXN0SXRlbSk7XG4gICAgICAgICAgICB0aGlzLm1vdmVkVXAgPSBmYWxzZTtcbiAgICAgICAgICAgIHRoaXMubW92ZWREb3duID0gZmFsc2U7XG4gICAgICAgICAgICB0aGlzLnJlb3JkZXJlZExpc3RFbGVtZW50ID0gbnVsbDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIG9uSXRlbUNsaWNrKGV2ZW50LCBpdGVtOiBhbnksIHNlbGVjdGVkSXRlbXM6IGFueVtdLCBjYWxsYmFjazogRXZlbnRFbWl0dGVyPGFueT4pIHtcbiAgICAgICAgaWYgKHRoaXMuZGlzYWJsZWQpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGxldCBpbmRleCA9IHRoaXMuZmluZEluZGV4SW5TZWxlY3Rpb24oaXRlbSxzZWxlY3RlZEl0ZW1zKTtcbiAgICAgICAgbGV0IHNlbGVjdGVkID0gKGluZGV4ICE9IC0xKTtcbiAgICAgICAgbGV0IG1ldGFTZWxlY3Rpb24gPSB0aGlzLml0ZW1Ub3VjaGVkID8gZmFsc2UgOiB0aGlzLm1ldGFLZXlTZWxlY3Rpb247XG5cbiAgICAgICAgaWYgKG1ldGFTZWxlY3Rpb24pIHtcbiAgICAgICAgICAgIGxldCBtZXRhS2V5ID0gKGV2ZW50Lm1ldGFLZXl8fGV2ZW50LmN0cmxLZXl8fGV2ZW50LnNoaWZ0S2V5KTtcblxuICAgICAgICAgICAgaWYgKHNlbGVjdGVkICYmIG1ldGFLZXkpIHtcbiAgICAgICAgICAgICAgICBzZWxlY3RlZEl0ZW1zLnNwbGljZShpbmRleCwgMSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBpZiAoIW1ldGFLZXkpIHtcbiAgICAgICAgICAgICAgICAgICAgc2VsZWN0ZWRJdGVtcy5sZW5ndGggPSAwO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBzZWxlY3RlZEl0ZW1zLnB1c2goaXRlbSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBpZiAoc2VsZWN0ZWQpXG4gICAgICAgICAgICAgICAgc2VsZWN0ZWRJdGVtcy5zcGxpY2UoaW5kZXgsIDEpO1xuICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAgIHNlbGVjdGVkSXRlbXMucHVzaChpdGVtKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGNhbGxiYWNrLmVtaXQoe29yaWdpbmFsRXZlbnQ6IGV2ZW50LCBpdGVtczogc2VsZWN0ZWRJdGVtc30pO1xuXG4gICAgICAgIHRoaXMuaXRlbVRvdWNoZWQgPSBmYWxzZTtcbiAgICB9XG5cbiAgICBvblNvdXJjZUl0ZW1EYmxDbGljaygpIHtcbiAgICAgICAgaWYgKHRoaXMuZGlzYWJsZWQpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMubW92ZVJpZ2h0KCk7XG4gICAgfVxuXG4gICAgb25UYXJnZXRJdGVtRGJsQ2xpY2soKSB7XG4gICAgICAgIGlmICh0aGlzLmRpc2FibGVkKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLm1vdmVMZWZ0KCk7XG4gICAgfVxuXG4gICAgb25GaWx0ZXIoZXZlbnQ6IEtleWJvYXJkRXZlbnQsIGRhdGE6IGFueVtdLCBsaXN0VHlwZTogbnVtYmVyKSB7XG4gICAgICAgIGxldCBxdWVyeSA9ICgoPEhUTUxJbnB1dEVsZW1lbnQ+IGV2ZW50LnRhcmdldCkudmFsdWUudHJpbSgpIGFzIGFueSkudG9Mb2NhbGVMb3dlckNhc2UodGhpcy5maWx0ZXJMb2NhbGUpO1xuICAgICAgICB0aGlzLmZpbHRlcihxdWVyeSwgZGF0YSwgbGlzdFR5cGUpO1xuICAgIH1cblxuICAgIGZpbHRlcihxdWVyeTogc3RyaW5nLCBkYXRhOiBhbnlbXSwgbGlzdFR5cGU6IG51bWJlcikge1xuICAgICAgICBsZXQgc2VhcmNoRmllbGRzID0gdGhpcy5maWx0ZXJCeS5zcGxpdCgnLCcpO1xuXG4gICAgICAgIGlmIChsaXN0VHlwZSA9PT0gdGhpcy5TT1VSQ0VfTElTVCkge1xuICAgICAgICAgICAgdGhpcy5maWx0ZXJWYWx1ZVNvdXJjZSA9IHF1ZXJ5O1xuICAgICAgICAgICAgdGhpcy52aXNpYmxlT3B0aW9uc1NvdXJjZSA9IHRoaXMuZmlsdGVyU2VydmljZS5maWx0ZXIoZGF0YSwgc2VhcmNoRmllbGRzLCB0aGlzLmZpbHRlclZhbHVlU291cmNlLCB0aGlzLmZpbHRlck1hdGNoTW9kZSwgdGhpcy5maWx0ZXJMb2NhbGUpO1xuICAgICAgICAgICAgdGhpcy5vblNvdXJjZUZpbHRlci5lbWl0KHtxdWVyeTogdGhpcy5maWx0ZXJWYWx1ZVNvdXJjZSwgdmFsdWU6IHRoaXMudmlzaWJsZU9wdGlvbnNTb3VyY2V9KTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChsaXN0VHlwZSA9PT0gdGhpcy5UQVJHRVRfTElTVCkge1xuICAgICAgICAgICAgdGhpcy5maWx0ZXJWYWx1ZVRhcmdldCA9IHF1ZXJ5O1xuICAgICAgICAgICAgdGhpcy52aXNpYmxlT3B0aW9uc1RhcmdldCA9IHRoaXMuZmlsdGVyU2VydmljZS5maWx0ZXIoZGF0YSwgc2VhcmNoRmllbGRzLCB0aGlzLmZpbHRlclZhbHVlVGFyZ2V0LCB0aGlzLmZpbHRlck1hdGNoTW9kZSwgdGhpcy5maWx0ZXJMb2NhbGUpO1xuICAgICAgICAgICAgdGhpcy5vblRhcmdldEZpbHRlci5lbWl0KHtxdWVyeTogdGhpcy5maWx0ZXJWYWx1ZVRhcmdldCwgdmFsdWU6IHRoaXMudmlzaWJsZU9wdGlvbnNUYXJnZXR9KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGlzSXRlbVZpc2libGUoaXRlbTogYW55LCBsaXN0VHlwZTogbnVtYmVyKTogYm9vbGVhbiB7XG4gICAgICAgIGlmIChsaXN0VHlwZSA9PSB0aGlzLlNPVVJDRV9MSVNUKVxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuaXNWaXNpYmxlSW5MaXN0KHRoaXMudmlzaWJsZU9wdGlvbnNTb3VyY2UsIGl0ZW0sIHRoaXMuZmlsdGVyVmFsdWVTb3VyY2UpO1xuICAgICAgICBlbHNlXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5pc1Zpc2libGVJbkxpc3QodGhpcy52aXNpYmxlT3B0aW9uc1RhcmdldCwgaXRlbSwgdGhpcy5maWx0ZXJWYWx1ZVRhcmdldCk7XG4gICAgfVxuXG4gICAgaXNWaXNpYmxlSW5MaXN0KGRhdGE6IGFueVtdLCBpdGVtOiBhbnksIGZpbHRlclZhbHVlOiBzdHJpbmcpOiBib29sZWFuIHtcbiAgICAgICAgaWYgKGZpbHRlclZhbHVlICYmIGZpbHRlclZhbHVlLnRyaW0oKS5sZW5ndGgpIHtcbiAgICAgICAgICAgIGZvcihsZXQgaSA9IDA7IGkgPCBkYXRhLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgaWYgKGl0ZW0gPT0gZGF0YVtpXSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIG9uSXRlbVRvdWNoRW5kKGV2ZW50KSB7XG4gICAgICAgIGlmICh0aGlzLmRpc2FibGVkKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLml0ZW1Ub3VjaGVkID0gdHJ1ZTtcbiAgICB9XG5cbiAgICBwcml2YXRlIHNvcnRCeUluZGV4SW5MaXN0KGl0ZW1zOiBhbnlbXSwgbGlzdDogYW55KSB7XG4gICAgICAgIHJldHVybiBpdGVtcy5zb3J0KChpdGVtMSwgaXRlbTIpID0+XG4gICAgICAgICAgICB0aGlzLmZpbmRJbmRleEluTGlzdChpdGVtMSwgbGlzdCkgLSB0aGlzLmZpbmRJbmRleEluTGlzdChpdGVtMiwgbGlzdCkpO1xuICAgIH1cblxuICAgIG1vdmVVcChsaXN0RWxlbWVudCwgbGlzdCwgc2VsZWN0ZWRJdGVtcywgY2FsbGJhY2spIHtcbiAgICAgICAgaWYgKHNlbGVjdGVkSXRlbXMgJiYgc2VsZWN0ZWRJdGVtcy5sZW5ndGgpIHtcbiAgICAgICAgICAgIHNlbGVjdGVkSXRlbXMgPSB0aGlzLnNvcnRCeUluZGV4SW5MaXN0KHNlbGVjdGVkSXRlbXMsIGxpc3QpO1xuICAgICAgICAgICAgZm9yKGxldCBpID0gMDsgaSA8IHNlbGVjdGVkSXRlbXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICBsZXQgc2VsZWN0ZWRJdGVtID0gc2VsZWN0ZWRJdGVtc1tpXTtcbiAgICAgICAgICAgICAgICBsZXQgc2VsZWN0ZWRJdGVtSW5kZXg6IG51bWJlciA9IHRoaXMuZmluZEluZGV4SW5MaXN0KHNlbGVjdGVkSXRlbSwgbGlzdCk7XG5cbiAgICAgICAgICAgICAgICBpZiAoc2VsZWN0ZWRJdGVtSW5kZXggIT0gMCkge1xuICAgICAgICAgICAgICAgICAgICBsZXQgbW92ZWRJdGVtID0gbGlzdFtzZWxlY3RlZEl0ZW1JbmRleF07XG4gICAgICAgICAgICAgICAgICAgIGxldCB0ZW1wID0gbGlzdFtzZWxlY3RlZEl0ZW1JbmRleC0xXTtcbiAgICAgICAgICAgICAgICAgICAgbGlzdFtzZWxlY3RlZEl0ZW1JbmRleC0xXSA9IG1vdmVkSXRlbTtcbiAgICAgICAgICAgICAgICAgICAgbGlzdFtzZWxlY3RlZEl0ZW1JbmRleF0gPSB0ZW1wO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB0aGlzLm1vdmVkVXAgPSB0cnVlO1xuICAgICAgICAgICAgdGhpcy5yZW9yZGVyZWRMaXN0RWxlbWVudCA9IGxpc3RFbGVtZW50O1xuICAgICAgICAgICAgY2FsbGJhY2suZW1pdCh7aXRlbXM6IHNlbGVjdGVkSXRlbXN9KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIG1vdmVUb3AobGlzdEVsZW1lbnQsIGxpc3QsIHNlbGVjdGVkSXRlbXMsIGNhbGxiYWNrKSB7XG4gICAgICAgIGlmIChzZWxlY3RlZEl0ZW1zICYmIHNlbGVjdGVkSXRlbXMubGVuZ3RoKSB7XG4gICAgICAgICAgICBzZWxlY3RlZEl0ZW1zID0gdGhpcy5zb3J0QnlJbmRleEluTGlzdChzZWxlY3RlZEl0ZW1zLCBsaXN0KTtcbiAgICAgICAgICAgIGZvcihsZXQgaSA9IDA7IGkgPCBzZWxlY3RlZEl0ZW1zLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgbGV0IHNlbGVjdGVkSXRlbSA9IHNlbGVjdGVkSXRlbXNbaV07XG4gICAgICAgICAgICAgICAgbGV0IHNlbGVjdGVkSXRlbUluZGV4OiBudW1iZXIgPSB0aGlzLmZpbmRJbmRleEluTGlzdChzZWxlY3RlZEl0ZW0sIGxpc3QpO1xuXG4gICAgICAgICAgICAgICAgaWYgKHNlbGVjdGVkSXRlbUluZGV4ICE9IDApIHtcbiAgICAgICAgICAgICAgICAgICAgbGV0IG1vdmVkSXRlbSA9IGxpc3Quc3BsaWNlKHNlbGVjdGVkSXRlbUluZGV4LDEpWzBdO1xuICAgICAgICAgICAgICAgICAgICBsaXN0LnVuc2hpZnQobW92ZWRJdGVtKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgbGlzdEVsZW1lbnQuc2Nyb2xsVG9wID0gMDtcbiAgICAgICAgICAgIGNhbGxiYWNrLmVtaXQoe2l0ZW1zOiBzZWxlY3RlZEl0ZW1zfSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBtb3ZlRG93bihsaXN0RWxlbWVudCwgbGlzdCwgc2VsZWN0ZWRJdGVtcywgY2FsbGJhY2spIHtcbiAgICAgICAgaWYgKHNlbGVjdGVkSXRlbXMgJiYgc2VsZWN0ZWRJdGVtcy5sZW5ndGgpIHtcbiAgICAgICAgICAgIHNlbGVjdGVkSXRlbXMgPSB0aGlzLnNvcnRCeUluZGV4SW5MaXN0KHNlbGVjdGVkSXRlbXMsIGxpc3QpO1xuICAgICAgICAgICAgZm9yKGxldCBpID0gc2VsZWN0ZWRJdGVtcy5sZW5ndGggLSAxOyBpID49IDA7IGktLSkge1xuICAgICAgICAgICAgICAgIGxldCBzZWxlY3RlZEl0ZW0gPSBzZWxlY3RlZEl0ZW1zW2ldO1xuICAgICAgICAgICAgICAgIGxldCBzZWxlY3RlZEl0ZW1JbmRleDogbnVtYmVyID0gdGhpcy5maW5kSW5kZXhJbkxpc3Qoc2VsZWN0ZWRJdGVtLCBsaXN0KTtcblxuICAgICAgICAgICAgICAgIGlmIChzZWxlY3RlZEl0ZW1JbmRleCAhPSAobGlzdC5sZW5ndGggLSAxKSkge1xuICAgICAgICAgICAgICAgICAgICBsZXQgbW92ZWRJdGVtID0gbGlzdFtzZWxlY3RlZEl0ZW1JbmRleF07XG4gICAgICAgICAgICAgICAgICAgIGxldCB0ZW1wID0gbGlzdFtzZWxlY3RlZEl0ZW1JbmRleCsxXTtcbiAgICAgICAgICAgICAgICAgICAgbGlzdFtzZWxlY3RlZEl0ZW1JbmRleCsxXSA9IG1vdmVkSXRlbTtcbiAgICAgICAgICAgICAgICAgICAgbGlzdFtzZWxlY3RlZEl0ZW1JbmRleF0gPSB0ZW1wO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB0aGlzLm1vdmVkRG93biA9IHRydWU7XG4gICAgICAgICAgICB0aGlzLnJlb3JkZXJlZExpc3RFbGVtZW50ID0gbGlzdEVsZW1lbnQ7XG4gICAgICAgICAgICBjYWxsYmFjay5lbWl0KHtpdGVtczogc2VsZWN0ZWRJdGVtc30pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgbW92ZUJvdHRvbShsaXN0RWxlbWVudCwgbGlzdCwgc2VsZWN0ZWRJdGVtcywgY2FsbGJhY2spIHtcbiAgICAgICAgaWYgKHNlbGVjdGVkSXRlbXMgJiYgc2VsZWN0ZWRJdGVtcy5sZW5ndGgpIHtcbiAgICAgICAgICAgIHNlbGVjdGVkSXRlbXMgPSB0aGlzLnNvcnRCeUluZGV4SW5MaXN0KHNlbGVjdGVkSXRlbXMsIGxpc3QpO1xuICAgICAgICAgICAgZm9yKGxldCBpID0gc2VsZWN0ZWRJdGVtcy5sZW5ndGggLSAxOyBpID49IDA7IGktLSkge1xuICAgICAgICAgICAgICAgIGxldCBzZWxlY3RlZEl0ZW0gPSBzZWxlY3RlZEl0ZW1zW2ldO1xuICAgICAgICAgICAgICAgIGxldCBzZWxlY3RlZEl0ZW1JbmRleDogbnVtYmVyID0gdGhpcy5maW5kSW5kZXhJbkxpc3Qoc2VsZWN0ZWRJdGVtLCBsaXN0KTtcblxuICAgICAgICAgICAgICAgIGlmIChzZWxlY3RlZEl0ZW1JbmRleCAhPSAobGlzdC5sZW5ndGggLSAxKSkge1xuICAgICAgICAgICAgICAgICAgICBsZXQgbW92ZWRJdGVtID0gbGlzdC5zcGxpY2Uoc2VsZWN0ZWRJdGVtSW5kZXgsMSlbMF07XG4gICAgICAgICAgICAgICAgICAgIGxpc3QucHVzaChtb3ZlZEl0ZW0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBsaXN0RWxlbWVudC5zY3JvbGxUb3AgPSBsaXN0RWxlbWVudC5zY3JvbGxIZWlnaHQ7XG4gICAgICAgICAgICBjYWxsYmFjay5lbWl0KHtpdGVtczogc2VsZWN0ZWRJdGVtc30pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgbW92ZVJpZ2h0KCkge1xuICAgICAgICBpZiAodGhpcy5zZWxlY3RlZEl0ZW1zU291cmNlICYmIHRoaXMuc2VsZWN0ZWRJdGVtc1NvdXJjZS5sZW5ndGgpIHtcbiAgICAgICAgICAgIGZvcihsZXQgaSA9IDA7IGkgPCB0aGlzLnNlbGVjdGVkSXRlbXNTb3VyY2UubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICBsZXQgc2VsZWN0ZWRJdGVtID0gdGhpcy5zZWxlY3RlZEl0ZW1zU291cmNlW2ldO1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLmZpbmRJbmRleEluTGlzdChzZWxlY3RlZEl0ZW0sIHRoaXMudGFyZ2V0KSA9PSAtMSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnRhcmdldC5wdXNoKHRoaXMuc291cmNlLnNwbGljZSh0aGlzLmZpbmRJbmRleEluTGlzdChzZWxlY3RlZEl0ZW0sIHRoaXMuc291cmNlKSwxKVswXSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5vbk1vdmVUb1RhcmdldC5lbWl0KHtcbiAgICAgICAgICAgICAgICBpdGVtczogdGhpcy5zZWxlY3RlZEl0ZW1zU291cmNlXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHRoaXMuc2VsZWN0ZWRJdGVtc1NvdXJjZSA9IFtdO1xuXG4gICAgICAgICAgICBpZiAodGhpcy5maWx0ZXJWYWx1ZVRhcmdldCkge1xuICAgICAgICAgICAgICAgIHRoaXMuZmlsdGVyKHRoaXMuZmlsdGVyVmFsdWVUYXJnZXQsIHRoaXMudGFyZ2V0LCB0aGlzLlRBUkdFVF9MSVNUKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIG1vdmVBbGxSaWdodCgpIHtcbiAgICAgICAgaWYgKHRoaXMuc291cmNlKSB7XG4gICAgICAgICAgICBsZXQgbW92ZWRJdGVtcyA9IFtdO1xuXG4gICAgICAgICAgICBmb3IobGV0IGkgPSAwOyBpIDwgdGhpcy5zb3VyY2UubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5pc0l0ZW1WaXNpYmxlKHRoaXMuc291cmNlW2ldLCB0aGlzLlNPVVJDRV9MSVNUKSkge1xuICAgICAgICAgICAgICAgICAgICBsZXQgcmVtb3ZlZEl0ZW0gPSB0aGlzLnNvdXJjZS5zcGxpY2UoaSwgMSlbMF07XG4gICAgICAgICAgICAgICAgICAgIHRoaXMudGFyZ2V0LnB1c2gocmVtb3ZlZEl0ZW0pO1xuICAgICAgICAgICAgICAgICAgICBtb3ZlZEl0ZW1zLnB1c2gocmVtb3ZlZEl0ZW0pO1xuICAgICAgICAgICAgICAgICAgICBpLS07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB0aGlzLm9uTW92ZUFsbFRvVGFyZ2V0LmVtaXQoe1xuICAgICAgICAgICAgICAgIGl0ZW1zOiBtb3ZlZEl0ZW1zXG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgdGhpcy5zZWxlY3RlZEl0ZW1zU291cmNlID0gW107XG5cbiAgICAgICAgICAgIGlmICh0aGlzLmZpbHRlclZhbHVlVGFyZ2V0KSB7XG4gICAgICAgICAgICAgICAgdGhpcy5maWx0ZXIodGhpcy5maWx0ZXJWYWx1ZVRhcmdldCwgdGhpcy50YXJnZXQsIHRoaXMuVEFSR0VUX0xJU1QpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgbW92ZUxlZnQoKSB7XG4gICAgICAgIGlmICh0aGlzLnNlbGVjdGVkSXRlbXNUYXJnZXQgJiYgdGhpcy5zZWxlY3RlZEl0ZW1zVGFyZ2V0Lmxlbmd0aCkge1xuICAgICAgICAgICAgZm9yKGxldCBpID0gMDsgaSA8IHRoaXMuc2VsZWN0ZWRJdGVtc1RhcmdldC5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgIGxldCBzZWxlY3RlZEl0ZW0gPSB0aGlzLnNlbGVjdGVkSXRlbXNUYXJnZXRbaV07XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuZmluZEluZGV4SW5MaXN0KHNlbGVjdGVkSXRlbSwgdGhpcy5zb3VyY2UpID09IC0xKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc291cmNlLnB1c2godGhpcy50YXJnZXQuc3BsaWNlKHRoaXMuZmluZEluZGV4SW5MaXN0KHNlbGVjdGVkSXRlbSwgdGhpcy50YXJnZXQpLDEpWzBdKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLm9uTW92ZVRvU291cmNlLmVtaXQoe1xuICAgICAgICAgICAgICAgIGl0ZW1zOiB0aGlzLnNlbGVjdGVkSXRlbXNUYXJnZXRcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICB0aGlzLnNlbGVjdGVkSXRlbXNUYXJnZXQgPSBbXTtcblxuICAgICAgICAgICAgaWYgKHRoaXMuZmlsdGVyVmFsdWVTb3VyY2UpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmZpbHRlcih0aGlzLmZpbHRlclZhbHVlU291cmNlLCB0aGlzLnNvdXJjZSwgdGhpcy5TT1VSQ0VfTElTVCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBtb3ZlQWxsTGVmdCgpIHtcbiAgICAgICAgaWYgKHRoaXMudGFyZ2V0KSB7XG4gICAgICAgICAgICBsZXQgbW92ZWRJdGVtcyA9IFtdO1xuXG4gICAgICAgICAgICBmb3IobGV0IGkgPSAwOyBpIDwgdGhpcy50YXJnZXQubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5pc0l0ZW1WaXNpYmxlKHRoaXMudGFyZ2V0W2ldLCB0aGlzLlRBUkdFVF9MSVNUKSkge1xuICAgICAgICAgICAgICAgICAgICBsZXQgcmVtb3ZlZEl0ZW0gPSB0aGlzLnRhcmdldC5zcGxpY2UoaSwgMSlbMF07XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc291cmNlLnB1c2gocmVtb3ZlZEl0ZW0pO1xuICAgICAgICAgICAgICAgICAgICBtb3ZlZEl0ZW1zLnB1c2gocmVtb3ZlZEl0ZW0pO1xuICAgICAgICAgICAgICAgICAgICBpLS07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB0aGlzLm9uTW92ZUFsbFRvU291cmNlLmVtaXQoe1xuICAgICAgICAgICAgICAgIGl0ZW1zOiBtb3ZlZEl0ZW1zXG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgdGhpcy5zZWxlY3RlZEl0ZW1zVGFyZ2V0ID0gW107XG5cbiAgICAgICAgICAgIGlmICh0aGlzLmZpbHRlclZhbHVlU291cmNlKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5maWx0ZXIodGhpcy5maWx0ZXJWYWx1ZVNvdXJjZSwgdGhpcy5zb3VyY2UsIHRoaXMuU09VUkNFX0xJU1QpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgaXNTZWxlY3RlZChpdGVtOiBhbnksIHNlbGVjdGVkSXRlbXM6IGFueVtdKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmZpbmRJbmRleEluU2VsZWN0aW9uKGl0ZW0sIHNlbGVjdGVkSXRlbXMpICE9IC0xO1xuICAgIH1cblxuICAgIGZpbmRJbmRleEluU2VsZWN0aW9uKGl0ZW06IGFueSwgc2VsZWN0ZWRJdGVtczogYW55W10pOiBudW1iZXIge1xuICAgICAgICByZXR1cm4gdGhpcy5maW5kSW5kZXhJbkxpc3QoaXRlbSwgc2VsZWN0ZWRJdGVtcyk7XG4gICAgfVxuXG4gICAgZmluZEluZGV4SW5MaXN0KGl0ZW06IGFueSwgbGlzdDogYW55KTogbnVtYmVyIHtcbiAgICAgICAgbGV0IGluZGV4OiBudW1iZXIgPSAtMTtcblxuICAgICAgICBpZiAobGlzdCkge1xuICAgICAgICAgICAgZm9yKGxldCBpID0gMDsgaSA8IGxpc3QubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICBpZiAobGlzdFtpXSA9PSBpdGVtKSB7XG4gICAgICAgICAgICAgICAgICAgIGluZGV4ID0gaTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGluZGV4O1xuICAgIH1cblxuICAgIG9uRHJhZ1N0YXJ0KGV2ZW50OiBEcmFnRXZlbnQsIGluZGV4OiBudW1iZXIsIGxpc3RUeXBlOiBudW1iZXIpIHtcbiAgICAgICAgZXZlbnQuZGF0YVRyYW5zZmVyLnNldERhdGEoJ3RleHQnLCAnYicpOyAgICAvLyBGb3IgZmlyZWZveFxuICAgICAgICAoPEhUTUxMSUVsZW1lbnQ+IGV2ZW50LnRhcmdldCkuYmx1cigpO1xuICAgICAgICB0aGlzLmRyYWdnaW5nID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5mcm9tTGlzdFR5cGUgPSBsaXN0VHlwZTtcblxuICAgICAgICBpZiAobGlzdFR5cGUgPT09IHRoaXMuU09VUkNFX0xJU1QpXG4gICAgICAgICAgICB0aGlzLmRyYWdnZWRJdGVtSW5kZXhTb3VyY2UgPSBpbmRleDtcbiAgICAgICAgZWxzZVxuICAgICAgICAgICAgdGhpcy5kcmFnZ2VkSXRlbUluZGV4VGFyZ2V0ID0gaW5kZXg7XG4gICAgfVxuXG4gICAgb25EcmFnT3ZlcihldmVudDogRHJhZ0V2ZW50LCBpbmRleDogbnVtYmVyLCBsaXN0VHlwZTogbnVtYmVyKSB7XG4gICAgICAgIGlmICh0aGlzLmRyYWdnaW5nKSB7XG4gICAgICAgICAgICBpZiAobGlzdFR5cGUgPT0gdGhpcy5TT1VSQ0VfTElTVCkge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLmRyYWdnZWRJdGVtSW5kZXhTb3VyY2UgIT09IGluZGV4ICYmIHRoaXMuZHJhZ2dlZEl0ZW1JbmRleFNvdXJjZSArIDEgIT09IGluZGV4IHx8wqAodGhpcy5mcm9tTGlzdFR5cGUgPT09IHRoaXMuVEFSR0VUX0xJU1QpKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZHJhZ092ZXJJdGVtSW5kZXhTb3VyY2UgPSBpbmRleDtcbiAgICAgICAgICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5kcmFnZ2VkSXRlbUluZGV4VGFyZ2V0ICE9PSBpbmRleCAmJiB0aGlzLmRyYWdnZWRJdGVtSW5kZXhUYXJnZXQgKyAxICE9PSBpbmRleCB8fMKgKHRoaXMuZnJvbUxpc3RUeXBlID09PSB0aGlzLlNPVVJDRV9MSVNUKSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmRyYWdPdmVySXRlbUluZGV4VGFyZ2V0ID0gaW5kZXg7XG4gICAgICAgICAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5vbkxpc3RJdGVtRHJvcHBvaW50ID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIG9uRHJhZ0xlYXZlKGV2ZW50OiBEcmFnRXZlbnQsIGxpc3RUeXBlOiBudW1iZXIpIHtcbiAgICAgICAgdGhpcy5kcmFnT3Zlckl0ZW1JbmRleFNvdXJjZSA9IG51bGw7XG4gICAgICAgIHRoaXMuZHJhZ092ZXJJdGVtSW5kZXhUYXJnZXQgPSBudWxsO1xuICAgICAgICB0aGlzLm9uTGlzdEl0ZW1Ecm9wcG9pbnQgPSBmYWxzZTtcbiAgICB9XG5cbiAgICBvbkRyb3AoZXZlbnQ6IERyYWdFdmVudCwgaW5kZXg6IG51bWJlciwgbGlzdFR5cGU6IG51bWJlcikge1xuICAgICAgICBpZiAodGhpcy5vbkxpc3RJdGVtRHJvcHBvaW50KSB7XG4gICAgICAgICAgICBpZiAobGlzdFR5cGUgPT09IHRoaXMuU09VUkNFX0xJU1QpIHtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5mcm9tTGlzdFR5cGUgPT09IHRoaXMuVEFSR0VUX0xJU1QpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5pbnNlcnQodGhpcy5kcmFnZ2VkSXRlbUluZGV4VGFyZ2V0LCB0aGlzLnRhcmdldCwgaW5kZXgsIHRoaXMuc291cmNlLCB0aGlzLm9uTW92ZVRvU291cmNlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIE9iamVjdFV0aWxzLnJlb3JkZXJBcnJheSh0aGlzLnNvdXJjZSwgdGhpcy5kcmFnZ2VkSXRlbUluZGV4U291cmNlLCAodGhpcy5kcmFnZ2VkSXRlbUluZGV4U291cmNlID4gaW5kZXgpID8gaW5kZXggOiAoaW5kZXggPT09IDApID8gMCA6IGluZGV4IC0gMSk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMub25Tb3VyY2VSZW9yZGVyLmVtaXQoe2l0ZW1zOiB0aGlzLnNvdXJjZVt0aGlzLmRyYWdnZWRJdGVtSW5kZXhTb3VyY2VdfSk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgdGhpcy5kcmFnT3Zlckl0ZW1JbmRleFNvdXJjZSA9IG51bGw7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5mcm9tTGlzdFR5cGUgPT09IHRoaXMuU09VUkNFX0xJU1QpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5pbnNlcnQodGhpcy5kcmFnZ2VkSXRlbUluZGV4U291cmNlLCB0aGlzLnNvdXJjZSwgaW5kZXgsIHRoaXMudGFyZ2V0LCB0aGlzLm9uTW92ZVRvVGFyZ2V0KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIE9iamVjdFV0aWxzLnJlb3JkZXJBcnJheSh0aGlzLnRhcmdldCwgdGhpcy5kcmFnZ2VkSXRlbUluZGV4VGFyZ2V0LCAodGhpcy5kcmFnZ2VkSXRlbUluZGV4VGFyZ2V0ID4gaW5kZXgpID8gaW5kZXggOiAoaW5kZXggPT09IDApID8gMCA6IGluZGV4IC0gMSk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMub25UYXJnZXRSZW9yZGVyLmVtaXQoe2l0ZW1zOiB0aGlzLnRhcmdldFt0aGlzLmRyYWdnZWRJdGVtSW5kZXhUYXJnZXRdfSk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgdGhpcy5kcmFnT3Zlckl0ZW1JbmRleFRhcmdldCA9IG51bGw7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHRoaXMubGlzdEhpZ2hsaWdodFRhcmdldCA9IGZhbHNlO1xuICAgICAgICAgICAgdGhpcy5saXN0SGlnaGxpZ2h0U291cmNlID0gZmFsc2U7XG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgb25EcmFnRW5kKGV2ZW50OiBEcmFnRXZlbnQpIHtcbiAgICAgICAgdGhpcy5kcmFnZ2luZyA9IGZhbHNlO1xuICAgIH1cblxuICAgIG9uTGlzdERyb3AoZXZlbnQ6IERyYWdFdmVudCwgbGlzdFR5cGU6ICBudW1iZXIpIHtcbiAgICAgICAgaWYgKCF0aGlzLm9uTGlzdEl0ZW1Ecm9wcG9pbnQpIHtcbiAgICAgICAgICAgIGlmIChsaXN0VHlwZSA9PT0gdGhpcy5TT1VSQ0VfTElTVCkge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLmZyb21MaXN0VHlwZSA9PT0gdGhpcy5UQVJHRVRfTElTVCkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmluc2VydCh0aGlzLmRyYWdnZWRJdGVtSW5kZXhUYXJnZXQsIHRoaXMudGFyZ2V0LCBudWxsLCB0aGlzLnNvdXJjZSwgdGhpcy5vbk1vdmVUb1NvdXJjZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuZnJvbUxpc3RUeXBlID09PSB0aGlzLlNPVVJDRV9MSVNUKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaW5zZXJ0KHRoaXMuZHJhZ2dlZEl0ZW1JbmRleFNvdXJjZSwgdGhpcy5zb3VyY2UsIG51bGwsIHRoaXMudGFyZ2V0LCB0aGlzLm9uTW92ZVRvVGFyZ2V0KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHRoaXMubGlzdEhpZ2hsaWdodFRhcmdldCA9IGZhbHNlO1xuICAgICAgICAgICAgdGhpcy5saXN0SGlnaGxpZ2h0U291cmNlID0gZmFsc2U7XG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgaW5zZXJ0KGZyb21JbmRleCwgZnJvbUxpc3QsIHRvSW5kZXgsIHRvTGlzdCwgY2FsbGJhY2spIHtcbiAgICAgICAgY29uc3QgZWxlbWVudHRvbW92ZSA9IGZyb21MaXN0W2Zyb21JbmRleF07XG5cbiAgICAgICAgaWYgKHRvSW5kZXggPT09IG51bGwpXG4gICAgICAgICAgICB0b0xpc3QucHVzaChmcm9tTGlzdC5zcGxpY2UoZnJvbUluZGV4LCAxKVswXSk7XG4gICAgICAgIGVsc2VcbiAgICAgICAgICAgIHRvTGlzdC5zcGxpY2UodG9JbmRleCwgMCwgZnJvbUxpc3Quc3BsaWNlKGZyb21JbmRleCwgMSlbMF0pO1xuXG4gICAgICAgIGNhbGxiYWNrLmVtaXQoe1xuICAgICAgICAgICAgaXRlbXM6IFtlbGVtZW50dG9tb3ZlXVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBvbkxpc3RNb3VzZU1vdmUoZXZlbnQ6IE1vdXNlRXZlbnQsIGxpc3RUeXBlOiBudW1iZXIpIHtcbiAgICAgICAgaWYgKHRoaXMuZHJhZ2dpbmcpIHtcbiAgICAgICAgICAgIGxldCBtb3ZlTGlzdFR5cGUgPSAobGlzdFR5cGUgPT0gMCA/IHRoaXMubGlzdFZpZXdTb3VyY2VDaGlsZCA6IHRoaXMubGlzdFZpZXdUYXJnZXRDaGlsZCk7XG4gICAgICAgICAgICBsZXQgb2Zmc2V0WSA9IG1vdmVMaXN0VHlwZS5uYXRpdmVFbGVtZW50LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLnRvcCArIGRvY3VtZW50LmJvZHkuc2Nyb2xsVG9wO1xuICAgICAgICAgICAgbGV0IGJvdHRvbURpZmYgPSAob2Zmc2V0WSArIG1vdmVMaXN0VHlwZS5uYXRpdmVFbGVtZW50LmNsaWVudEhlaWdodCkgLSBldmVudC5wYWdlWTtcbiAgICAgICAgICAgIGxldCB0b3BEaWZmID0gKGV2ZW50LnBhZ2VZIC0gb2Zmc2V0WSk7XG5cbiAgICAgICAgICAgIGlmIChib3R0b21EaWZmIDwgMjUgJiYgYm90dG9tRGlmZiA+IDApXG4gICAgICAgICAgICAgICAgbW92ZUxpc3RUeXBlLm5hdGl2ZUVsZW1lbnQuc2Nyb2xsVG9wICs9IDE1O1xuICAgICAgICAgICAgZWxzZSBpZiAodG9wRGlmZiA8IDI1ICYmIHRvcERpZmYgPiAwKVxuICAgICAgICAgICAgICAgIG1vdmVMaXN0VHlwZS5uYXRpdmVFbGVtZW50LnNjcm9sbFRvcCAtPSAxNTtcblxuICAgICAgICAgICAgaWYgKGxpc3RUeXBlID09PSB0aGlzLlNPVVJDRV9MSVNUKSB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuZnJvbUxpc3RUeXBlID09PSB0aGlzLlRBUkdFVF9MSVNUKVxuICAgICAgICAgICAgICAgICAgICB0aGlzLmxpc3RIaWdobGlnaHRTb3VyY2UgPSB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuZnJvbUxpc3RUeXBlID09PSB0aGlzLlNPVVJDRV9MSVNUKVxuICAgICAgICAgICAgICAgICAgICB0aGlzLmxpc3RIaWdobGlnaHRUYXJnZXQgPSB0cnVlO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgb25MaXN0RHJhZ0xlYXZlKCkge1xuICAgICAgICB0aGlzLmxpc3RIaWdobGlnaHRUYXJnZXQgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5saXN0SGlnaGxpZ2h0U291cmNlID0gZmFsc2U7XG4gICAgfVxuXG4gICAgcmVzZXRGaWx0ZXIoKSB7XG4gICAgICAgIHRoaXMudmlzaWJsZU9wdGlvbnNTb3VyY2UgPSBudWxsO1xuICAgICAgICB0aGlzLmZpbHRlclZhbHVlU291cmNlID0gbnVsbDtcbiAgICAgICAgdGhpcy52aXNpYmxlT3B0aW9uc1RhcmdldCA9IG51bGw7XG4gICAgICAgIHRoaXMuZmlsdGVyVmFsdWVUYXJnZXQgPSBudWxsO1xuXG4gICAgICAgICg8SFRNTElucHV0RWxlbWVudD4gdGhpcy5zb3VyY2VGaWx0ZXJWaWV3Q2hpbGQubmF0aXZlRWxlbWVudCkudmFsdWUgPSAnJztcbiAgICAgICAgKDxIVE1MSW5wdXRFbGVtZW50PiB0aGlzLnRhcmdldEZpbHRlclZpZXdDaGlsZC5uYXRpdmVFbGVtZW50KS52YWx1ZSA9ICcnO1xuICAgIH1cblxuICAgIG9uSXRlbUtleWRvd24oZXZlbnQ6IEtleWJvYXJkRXZlbnQsIGl0ZW06IGFueSwgc2VsZWN0ZWRJdGVtczogYW55W10sIGNhbGxiYWNrOiBFdmVudEVtaXR0ZXI8YW55Pikge1xuICAgICAgICBsZXQgbGlzdEl0ZW0gPSA8SFRNTExJRWxlbWVudD4gZXZlbnQuY3VycmVudFRhcmdldDtcblxuICAgICAgICBzd2l0Y2goZXZlbnQud2hpY2gpIHtcbiAgICAgICAgICAgIC8vZG93blxuICAgICAgICAgICAgY2FzZSA0MDpcbiAgICAgICAgICAgICAgICB2YXIgbmV4dEl0ZW0gPSB0aGlzLmZpbmROZXh0SXRlbShsaXN0SXRlbSk7XG4gICAgICAgICAgICAgICAgaWYgKG5leHRJdGVtKSB7XG4gICAgICAgICAgICAgICAgICAgIG5leHRJdGVtLmZvY3VzKCk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICAvL3VwXG4gICAgICAgICAgICBjYXNlIDM4OlxuICAgICAgICAgICAgICAgIHZhciBwcmV2SXRlbSA9IHRoaXMuZmluZFByZXZJdGVtKGxpc3RJdGVtKTtcbiAgICAgICAgICAgICAgICBpZiAocHJldkl0ZW0pIHtcbiAgICAgICAgICAgICAgICAgICAgcHJldkl0ZW0uZm9jdXMoKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgIC8vZW50ZXJcbiAgICAgICAgICAgIGNhc2UgMTM6XG4gICAgICAgICAgICAgICAgdGhpcy5vbkl0ZW1DbGljayhldmVudCwgaXRlbSwgc2VsZWN0ZWRJdGVtcywgY2FsbGJhY2spO1xuICAgICAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGZpbmROZXh0SXRlbShpdGVtKSB7XG4gICAgICAgIGxldCBuZXh0SXRlbSA9IGl0ZW0ubmV4dEVsZW1lbnRTaWJsaW5nO1xuXG4gICAgICAgIGlmIChuZXh0SXRlbSlcbiAgICAgICAgICAgIHJldHVybiAhRG9tSGFuZGxlci5oYXNDbGFzcyhuZXh0SXRlbSwgJ3AtcGlja2xpc3QtaXRlbScpIHx8IERvbUhhbmRsZXIuaXNIaWRkZW4obmV4dEl0ZW0pID8gdGhpcy5maW5kTmV4dEl0ZW0obmV4dEl0ZW0pIDogbmV4dEl0ZW07XG4gICAgICAgIGVsc2VcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgIH1cblxuICAgIGZpbmRQcmV2SXRlbShpdGVtKSB7XG4gICAgICAgIGxldCBwcmV2SXRlbSA9IGl0ZW0ucHJldmlvdXNFbGVtZW50U2libGluZztcblxuICAgICAgICBpZiAocHJldkl0ZW0pXG4gICAgICAgICAgICByZXR1cm4gIURvbUhhbmRsZXIuaGFzQ2xhc3MocHJldkl0ZW0sICdwLXBpY2tsaXN0LWl0ZW0nKSB8fCBEb21IYW5kbGVyLmlzSGlkZGVuKHByZXZJdGVtKSA/IHRoaXMuZmluZFByZXZJdGVtKHByZXZJdGVtKSA6IHByZXZJdGVtO1xuICAgICAgICBlbHNlXG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG59XG5cbkBOZ01vZHVsZSh7XG4gICAgaW1wb3J0czogW0NvbW1vbk1vZHVsZSxCdXR0b25Nb2R1bGUsU2hhcmVkTW9kdWxlLFJpcHBsZU1vZHVsZV0sXG4gICAgZXhwb3J0czogW1BpY2tMaXN0LFNoYXJlZE1vZHVsZV0sXG4gICAgZGVjbGFyYXRpb25zOiBbUGlja0xpc3RdXG59KVxuZXhwb3J0IGNsYXNzIFBpY2tMaXN0TW9kdWxlIHsgfVxuIl19