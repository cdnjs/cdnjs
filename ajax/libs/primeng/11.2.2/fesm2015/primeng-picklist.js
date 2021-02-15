import { EventEmitter, Component, ChangeDetectionStrategy, ViewEncapsulation, ElementRef, ChangeDetectorRef, Input, Output, ViewChild, ContentChildren, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { FilterService, PrimeTemplate, SharedModule } from 'primeng/api';
import { DomHandler } from 'primeng/dom';
import { RippleModule } from 'primeng/ripple';
import { ObjectUtils } from 'primeng/utils';

class PickList {
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
class PickListModule {
}
PickListModule.decorators = [
    { type: NgModule, args: [{
                imports: [CommonModule, ButtonModule, SharedModule, RippleModule],
                exports: [PickList, SharedModule],
                declarations: [PickList]
            },] }
];

/**
 * Generated bundle index. Do not edit.
 */

export { PickList, PickListModule };
//# sourceMappingURL=primeng-picklist.js.map
