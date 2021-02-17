(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@angular/common'), require('primeng/button'), require('primeng/api'), require('primeng/dom'), require('primeng/ripple'), require('primeng/utils')) :
    typeof define === 'function' && define.amd ? define('primeng/picklist', ['exports', '@angular/core', '@angular/common', 'primeng/button', 'primeng/api', 'primeng/dom', 'primeng/ripple', 'primeng/utils'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory((global.primeng = global.primeng || {}, global.primeng.picklist = {}), global.ng.core, global.ng.common, global.primeng.button, global.primeng.api, global.primeng.dom, global.primeng.ripple, global.primeng.utils));
}(this, (function (exports, core, common, button, api, dom, ripple, utils) { 'use strict';

    var PickList = /** @class */ (function () {
        function PickList(el, cd, filterService) {
            this.el = el;
            this.cd = cd;
            this.filterService = filterService;
            this.trackBy = function (index, item) { return item; };
            this.showSourceFilter = true;
            this.showTargetFilter = true;
            this.metaKeySelection = true;
            this.showSourceControls = true;
            this.showTargetControls = true;
            this.disabled = false;
            this.filterMatchMode = "contains";
            this.onMoveToSource = new core.EventEmitter();
            this.onMoveAllToSource = new core.EventEmitter();
            this.onMoveAllToTarget = new core.EventEmitter();
            this.onMoveToTarget = new core.EventEmitter();
            this.onSourceReorder = new core.EventEmitter();
            this.onTargetReorder = new core.EventEmitter();
            this.onSourceSelect = new core.EventEmitter();
            this.onTargetSelect = new core.EventEmitter();
            this.onSourceFilter = new core.EventEmitter();
            this.onTargetFilter = new core.EventEmitter();
            this.selectedItemsSource = [];
            this.selectedItemsTarget = [];
            this.SOURCE_LIST = -1;
            this.TARGET_LIST = 1;
        }
        PickList.prototype.ngAfterContentInit = function () {
            var _this = this;
            this.templates.forEach(function (item) {
                switch (item.getType()) {
                    case 'item':
                        _this.itemTemplate = item.template;
                        break;
                    case 'emptymessagesource':
                        _this.emptyMessageSourceTemplate = item.template;
                        break;
                    case 'emptymessagetarget':
                        _this.emptyMessageTargetTemplate = item.template;
                        break;
                    default:
                        _this.itemTemplate = item.template;
                        break;
                }
            });
        };
        PickList.prototype.ngAfterViewChecked = function () {
            if (this.movedUp || this.movedDown) {
                var listItems = dom.DomHandler.find(this.reorderedListElement, 'li.p-highlight');
                var listItem = void 0;
                if (this.movedUp)
                    listItem = listItems[0];
                else
                    listItem = listItems[listItems.length - 1];
                dom.DomHandler.scrollInView(this.reorderedListElement, listItem);
                this.movedUp = false;
                this.movedDown = false;
                this.reorderedListElement = null;
            }
        };
        PickList.prototype.onItemClick = function (event, item, selectedItems, callback) {
            if (this.disabled) {
                return;
            }
            var index = this.findIndexInSelection(item, selectedItems);
            var selected = (index != -1);
            var metaSelection = this.itemTouched ? false : this.metaKeySelection;
            if (metaSelection) {
                var metaKey = (event.metaKey || event.ctrlKey || event.shiftKey);
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
        };
        PickList.prototype.onSourceItemDblClick = function () {
            if (this.disabled) {
                return;
            }
            this.moveRight();
        };
        PickList.prototype.onTargetItemDblClick = function () {
            if (this.disabled) {
                return;
            }
            this.moveLeft();
        };
        PickList.prototype.onFilter = function (event, data, listType) {
            var query = event.target.value.trim().toLocaleLowerCase(this.filterLocale);
            this.filter(query, data, listType);
        };
        PickList.prototype.filter = function (query, data, listType) {
            var searchFields = this.filterBy.split(',');
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
        };
        PickList.prototype.isItemVisible = function (item, listType) {
            if (listType == this.SOURCE_LIST)
                return this.isVisibleInList(this.visibleOptionsSource, item, this.filterValueSource);
            else
                return this.isVisibleInList(this.visibleOptionsTarget, item, this.filterValueTarget);
        };
        PickList.prototype.isVisibleInList = function (data, item, filterValue) {
            if (filterValue && filterValue.trim().length) {
                for (var i = 0; i < data.length; i++) {
                    if (item == data[i]) {
                        return true;
                    }
                }
            }
            else {
                return true;
            }
        };
        PickList.prototype.onItemTouchEnd = function (event) {
            if (this.disabled) {
                return;
            }
            this.itemTouched = true;
        };
        PickList.prototype.sortByIndexInList = function (items, list) {
            var _this = this;
            return items.sort(function (item1, item2) { return _this.findIndexInList(item1, list) - _this.findIndexInList(item2, list); });
        };
        PickList.prototype.moveUp = function (listElement, list, selectedItems, callback) {
            if (selectedItems && selectedItems.length) {
                selectedItems = this.sortByIndexInList(selectedItems, list);
                for (var i = 0; i < selectedItems.length; i++) {
                    var selectedItem = selectedItems[i];
                    var selectedItemIndex = this.findIndexInList(selectedItem, list);
                    if (selectedItemIndex != 0) {
                        var movedItem = list[selectedItemIndex];
                        var temp = list[selectedItemIndex - 1];
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
        };
        PickList.prototype.moveTop = function (listElement, list, selectedItems, callback) {
            if (selectedItems && selectedItems.length) {
                selectedItems = this.sortByIndexInList(selectedItems, list);
                for (var i = 0; i < selectedItems.length; i++) {
                    var selectedItem = selectedItems[i];
                    var selectedItemIndex = this.findIndexInList(selectedItem, list);
                    if (selectedItemIndex != 0) {
                        var movedItem = list.splice(selectedItemIndex, 1)[0];
                        list.unshift(movedItem);
                    }
                    else {
                        break;
                    }
                }
                listElement.scrollTop = 0;
                callback.emit({ items: selectedItems });
            }
        };
        PickList.prototype.moveDown = function (listElement, list, selectedItems, callback) {
            if (selectedItems && selectedItems.length) {
                selectedItems = this.sortByIndexInList(selectedItems, list);
                for (var i = selectedItems.length - 1; i >= 0; i--) {
                    var selectedItem = selectedItems[i];
                    var selectedItemIndex = this.findIndexInList(selectedItem, list);
                    if (selectedItemIndex != (list.length - 1)) {
                        var movedItem = list[selectedItemIndex];
                        var temp = list[selectedItemIndex + 1];
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
        };
        PickList.prototype.moveBottom = function (listElement, list, selectedItems, callback) {
            if (selectedItems && selectedItems.length) {
                selectedItems = this.sortByIndexInList(selectedItems, list);
                for (var i = selectedItems.length - 1; i >= 0; i--) {
                    var selectedItem = selectedItems[i];
                    var selectedItemIndex = this.findIndexInList(selectedItem, list);
                    if (selectedItemIndex != (list.length - 1)) {
                        var movedItem = list.splice(selectedItemIndex, 1)[0];
                        list.push(movedItem);
                    }
                    else {
                        break;
                    }
                }
                listElement.scrollTop = listElement.scrollHeight;
                callback.emit({ items: selectedItems });
            }
        };
        PickList.prototype.moveRight = function () {
            if (this.selectedItemsSource && this.selectedItemsSource.length) {
                for (var i = 0; i < this.selectedItemsSource.length; i++) {
                    var selectedItem = this.selectedItemsSource[i];
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
        };
        PickList.prototype.moveAllRight = function () {
            if (this.source) {
                var movedItems = [];
                for (var i = 0; i < this.source.length; i++) {
                    if (this.isItemVisible(this.source[i], this.SOURCE_LIST)) {
                        var removedItem = this.source.splice(i, 1)[0];
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
        };
        PickList.prototype.moveLeft = function () {
            if (this.selectedItemsTarget && this.selectedItemsTarget.length) {
                for (var i = 0; i < this.selectedItemsTarget.length; i++) {
                    var selectedItem = this.selectedItemsTarget[i];
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
        };
        PickList.prototype.moveAllLeft = function () {
            if (this.target) {
                var movedItems = [];
                for (var i = 0; i < this.target.length; i++) {
                    if (this.isItemVisible(this.target[i], this.TARGET_LIST)) {
                        var removedItem = this.target.splice(i, 1)[0];
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
        };
        PickList.prototype.isSelected = function (item, selectedItems) {
            return this.findIndexInSelection(item, selectedItems) != -1;
        };
        PickList.prototype.findIndexInSelection = function (item, selectedItems) {
            return this.findIndexInList(item, selectedItems);
        };
        PickList.prototype.findIndexInList = function (item, list) {
            var index = -1;
            if (list) {
                for (var i = 0; i < list.length; i++) {
                    if (list[i] == item) {
                        index = i;
                        break;
                    }
                }
            }
            return index;
        };
        PickList.prototype.onDragStart = function (event, index, listType) {
            event.dataTransfer.setData('text', 'b'); // For firefox
            event.target.blur();
            this.dragging = true;
            this.fromListType = listType;
            if (listType === this.SOURCE_LIST)
                this.draggedItemIndexSource = index;
            else
                this.draggedItemIndexTarget = index;
        };
        PickList.prototype.onDragOver = function (event, index, listType) {
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
        };
        PickList.prototype.onDragLeave = function (event, listType) {
            this.dragOverItemIndexSource = null;
            this.dragOverItemIndexTarget = null;
            this.onListItemDroppoint = false;
        };
        PickList.prototype.onDrop = function (event, index, listType) {
            if (this.onListItemDroppoint) {
                if (listType === this.SOURCE_LIST) {
                    if (this.fromListType === this.TARGET_LIST) {
                        this.insert(this.draggedItemIndexTarget, this.target, index, this.source, this.onMoveToSource);
                    }
                    else {
                        utils.ObjectUtils.reorderArray(this.source, this.draggedItemIndexSource, (this.draggedItemIndexSource > index) ? index : (index === 0) ? 0 : index - 1);
                        this.onSourceReorder.emit({ items: this.source[this.draggedItemIndexSource] });
                    }
                    this.dragOverItemIndexSource = null;
                }
                else {
                    if (this.fromListType === this.SOURCE_LIST) {
                        this.insert(this.draggedItemIndexSource, this.source, index, this.target, this.onMoveToTarget);
                    }
                    else {
                        utils.ObjectUtils.reorderArray(this.target, this.draggedItemIndexTarget, (this.draggedItemIndexTarget > index) ? index : (index === 0) ? 0 : index - 1);
                        this.onTargetReorder.emit({ items: this.target[this.draggedItemIndexTarget] });
                    }
                    this.dragOverItemIndexTarget = null;
                }
                this.listHighlightTarget = false;
                this.listHighlightSource = false;
                event.preventDefault();
            }
        };
        PickList.prototype.onDragEnd = function (event) {
            this.dragging = false;
        };
        PickList.prototype.onListDrop = function (event, listType) {
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
        };
        PickList.prototype.insert = function (fromIndex, fromList, toIndex, toList, callback) {
            var elementtomove = fromList[fromIndex];
            if (toIndex === null)
                toList.push(fromList.splice(fromIndex, 1)[0]);
            else
                toList.splice(toIndex, 0, fromList.splice(fromIndex, 1)[0]);
            callback.emit({
                items: [elementtomove]
            });
        };
        PickList.prototype.onListMouseMove = function (event, listType) {
            if (this.dragging) {
                var moveListType = (listType == 0 ? this.listViewSourceChild : this.listViewTargetChild);
                var offsetY = moveListType.nativeElement.getBoundingClientRect().top + document.body.scrollTop;
                var bottomDiff = (offsetY + moveListType.nativeElement.clientHeight) - event.pageY;
                var topDiff = (event.pageY - offsetY);
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
        };
        PickList.prototype.onListDragLeave = function () {
            this.listHighlightTarget = false;
            this.listHighlightSource = false;
        };
        PickList.prototype.resetFilter = function () {
            this.visibleOptionsSource = null;
            this.filterValueSource = null;
            this.visibleOptionsTarget = null;
            this.filterValueTarget = null;
            this.sourceFilterViewChild.nativeElement.value = '';
            this.targetFilterViewChild.nativeElement.value = '';
        };
        PickList.prototype.onItemKeydown = function (event, item, selectedItems, callback) {
            var listItem = event.currentTarget;
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
        };
        PickList.prototype.findNextItem = function (item) {
            var nextItem = item.nextElementSibling;
            if (nextItem)
                return !dom.DomHandler.hasClass(nextItem, 'p-picklist-item') || dom.DomHandler.isHidden(nextItem) ? this.findNextItem(nextItem) : nextItem;
            else
                return null;
        };
        PickList.prototype.findPrevItem = function (item) {
            var prevItem = item.previousElementSibling;
            if (prevItem)
                return !dom.DomHandler.hasClass(prevItem, 'p-picklist-item') || dom.DomHandler.isHidden(prevItem) ? this.findPrevItem(prevItem) : prevItem;
            else
                return null;
        };
        return PickList;
    }());
    PickList.decorators = [
        { type: core.Component, args: [{
                    selector: 'p-pickList',
                    template: "\n        <div [class]=\"styleClass\" [ngStyle]=\"style\" [ngClass]=\"'p-picklist p-component'\">\n            <div class=\"p-picklist-buttons p-picklist-source-controls\" *ngIf=\"showSourceControls\">\n                <button type=\"button\" pButton pRipple icon=\"pi pi-angle-up\" [disabled]=\"disabled\" (click)=\"moveUp(sourcelist,source,selectedItemsSource,onSourceReorder)\"></button>\n                <button type=\"button\" pButton pRipple icon=\"pi pi-angle-double-up\" [disabled]=\"disabled\" (click)=\"moveTop(sourcelist,source,selectedItemsSource,onSourceReorder)\"></button>\n                <button type=\"button\" pButton pRipple icon=\"pi pi-angle-down\" [disabled]=\"disabled\" (click)=\"moveDown(sourcelist,source,selectedItemsSource,onSourceReorder)\"></button>\n                <button type=\"button\" pButton pRipple icon=\"pi pi-angle-double-down\" [disabled]=\"disabled\" (click)=\"moveBottom(sourcelist,source,selectedItemsSource,onSourceReorder)\"></button>\n            </div>\n            <div class=\"p-picklist-list-wrapper p-picklist-source-wrapper\">\n                <div class=\"p-picklist-header\" *ngIf=\"sourceHeader\">\n                    <div class=\"p-picklist-title\">{{sourceHeader}}</div>\n                </div>\n                <div class=\"p-picklist-filter-container\" *ngIf=\"filterBy && showSourceFilter !== false\">\n                    <div class=\"p-picklist-filter\">\n                        <input #sourceFilter type=\"text\" role=\"textbox\" (keyup)=\"onFilter($event,source,SOURCE_LIST)\" class=\"p-picklist-filter-input p-inputtext p-component\" [disabled]=\"disabled\" [attr.placeholder]=\"sourceFilterPlaceholder\" [attr.aria-label]=\"ariaSourceFilterLabel\">\n                        <span class=\"p-picklist-filter-icon pi pi-search\"></span>\n                    </div>\n                </div>\n                \n                <ul #sourcelist class=\"p-picklist-list p-picklist-source\" [ngClass]=\"{'p-picklist-list-highlight': listHighlightSource}\"\n                    [ngStyle]=\"sourceStyle\" (dragover)=\"onListMouseMove($event,SOURCE_LIST)\" (dragleave)=\"onListDragLeave()\" (drop)=\"onListDrop($event, SOURCE_LIST)\" role=\"listbox\" aria-multiselectable=\"multiple\">\n                    <ng-template ngFor let-item [ngForOf]=\"source\" [ngForTrackBy]=\"sourceTrackBy || trackBy\" let-i=\"index\" let-l=\"last\">\n                        <li class=\"p-picklist-droppoint\" *ngIf=\"dragdrop\" (dragover)=\"onDragOver($event, i, SOURCE_LIST)\" (drop)=\"onDrop($event, i, SOURCE_LIST)\" (dragleave)=\"onDragLeave($event, SOURCE_LIST)\"\n                        [ngClass]=\"{'p-picklist-droppoint-highlight': (i === dragOverItemIndexSource)}\" [style.display]=\"isItemVisible(item, SOURCE_LIST) ? 'block' : 'none'\"></li>\n                        <li [ngClass]=\"{'p-picklist-item':true,'p-highlight':isSelected(item,selectedItemsSource),'p-disabled': disabled}\" pRipple\n                            (click)=\"onItemClick($event,item,selectedItemsSource,onSourceSelect)\" (dblclick)=\"onSourceItemDblClick()\" (touchend)=\"onItemTouchEnd($event)\" (keydown)=\"onItemKeydown($event,item,selectedItemsSource,onSourceSelect)\"\n                            [style.display]=\"isItemVisible(item, SOURCE_LIST) ? 'block' : 'none'\" tabindex=\"0\" role=\"option\" [attr.aria-selected]=\"isSelected(item, selectedItemsSource)\"\n                            [attr.draggable]=\"dragdrop\" (dragstart)=\"onDragStart($event, i, SOURCE_LIST)\" (dragend)=\"onDragEnd($event)\">\n                            <ng-container *ngTemplateOutlet=\"itemTemplate; context: {$implicit: item, index: i}\"></ng-container>\n                        </li>\n                        <li class=\"p-picklist-droppoint\" *ngIf=\"dragdrop&&l\" (dragover)=\"onDragOver($event, i + 1, SOURCE_LIST)\" (drop)=\"onDrop($event, i + 1, SOURCE_LIST)\" (dragleave)=\"onDragLeave($event, SOURCE_LIST)\"\n                        [ngClass]=\"{'p-picklist-droppoint-highlight': (i + 1 === dragOverItemIndexSource)}\"></li>\n                    </ng-template>\n                    <ng-container *ngIf=\"(source == null || source.length === 0) && emptyMessageSourceTemplate\">\n                        <li class=\"p-picklist-empty-message\">\n                            <ng-container *ngTemplateOutlet=\"emptyMessageSourceTemplate\"></ng-container>\n                        </li>\n                    </ng-container>\n                </ul>\n            </div>\n            <div class=\"p-picklist-buttons p-picklist-transfer-buttons\">\n                <button type=\"button\" pButton pRipple icon=\"pi pi-angle-right\" [disabled]=\"disabled\" (click)=\"moveRight()\"></button>\n                <button type=\"button\" pButton pRipple icon=\"pi pi-angle-double-right\" [disabled]=\"disabled\" (click)=\"moveAllRight()\"></button>\n                <button type=\"button\" pButton pRipple icon=\"pi pi-angle-left\" [disabled]=\"disabled\" (click)=\"moveLeft()\"></button>\n                <button type=\"button\" pButton pRipple icon=\"pi pi-angle-double-left\" [disabled]=\"disabled\" (click)=\"moveAllLeft()\"></button>\n            </div>\n            <div class=\"p-picklist-list-wrapper p-picklist-target-wrapper\">\n                <div class=\"p-picklist-header\" *ngIf=\"targetHeader\">\n                    <div class=\"p-picklist-title\" *ngIf=\"targetHeader\">{{targetHeader}}</div>\n                </div>\n                <div class=\"p-picklist-filter-container\" *ngIf=\"filterBy && showTargetFilter !== false\">\n                    <div class=\"p-picklist-filter\">\n                        <input #targetFilter type=\"text\" role=\"textbox\" (keyup)=\"onFilter($event,target,TARGET_LIST)\" class=\"p-picklist-filter-input p-inputtext p-component\" [disabled]=\"disabled\" [attr.placeholder]=\"targetFilterPlaceholder\" [attr.aria-label]=\"ariaTargetFilterLabel\">\n                        <span class=\"p-picklist-filter-icon pi pi-search\"></span>\n                    </div>\n                </div>\n                <ul #targetlist class=\"p-picklist-list p-picklist-target\" [ngClass]=\"{'p-picklist-list-highlight': listHighlightTarget}\"\n                    [ngStyle]=\"targetStyle\" (dragover)=\"onListMouseMove($event,TARGET_LIST)\" (dragleave)=\"onListDragLeave()\" (drop)=\"onListDrop($event,TARGET_LIST)\" role=\"listbox\" aria-multiselectable=\"multiple\">\n                    <ng-template ngFor let-item [ngForOf]=\"target\" [ngForTrackBy]=\"targetTrackBy || trackBy\" let-i=\"index\" let-l=\"last\">\n                        <li class=\"p-picklist-droppoint\" *ngIf=\"dragdrop\" (dragover)=\"onDragOver($event, i, TARGET_LIST)\" (drop)=\"onDrop($event, i, TARGET_LIST)\" (dragleave)=\"onDragLeave($event, TARGET_LIST)\"\n                        [ngClass]=\"{'p-picklist-droppoint-highlight': (i === dragOverItemIndexTarget)}\" [style.display]=\"isItemVisible(item, TARGET_LIST) ? 'block' : 'none'\"></li>\n                        <li [ngClass]=\"{'p-picklist-item':true,'p-highlight':isSelected(item,selectedItemsTarget), 'p-disabled': disabled}\" pRipple\n                            (click)=\"onItemClick($event,item,selectedItemsTarget,onTargetSelect)\" (dblclick)=\"onTargetItemDblClick()\" (touchend)=\"onItemTouchEnd($event)\" (keydown)=\"onItemKeydown($event,item,selectedItemsTarget,onTargetSelect)\"\n                            [style.display]=\"isItemVisible(item, TARGET_LIST) ? 'block' : 'none'\" tabindex=\"0\" role=\"option\" [attr.aria-selected]=\"isSelected(item, selectedItemsTarget)\"\n                            [attr.draggable]=\"dragdrop\" (dragstart)=\"onDragStart($event, i, TARGET_LIST)\" (dragend)=\"onDragEnd($event)\">\n                            <ng-container *ngTemplateOutlet=\"itemTemplate; context: {$implicit: item, index: i}\"></ng-container>\n                        </li>\n                        <li class=\"p-picklist-droppoint\" *ngIf=\"dragdrop&&l\" (dragover)=\"onDragOver($event, i + 1, TARGET_LIST)\" (drop)=\"onDrop($event, i + 1, TARGET_LIST)\" (dragleave)=\"onDragLeave($event, TARGET_LIST)\"\n                        [ngClass]=\"{'p-picklist-droppoint-highlight': (i + 1 === dragOverItemIndexTarget)}\"></li>\n                    </ng-template>\n                    <ng-container *ngIf=\"(target == null || target.length === 0) && emptyMessageTargetTemplate\">\n                        <li class=\"p-picklist-empty-message\">\n                            <ng-container *ngTemplateOutlet=\"emptyMessageTargetTemplate\"></ng-container>\n                        </li>\n                    </ng-container>\n                </ul>\n            </div>\n            <div class=\"p-picklist-buttons p-picklist-target-controls\" *ngIf=\"showTargetControls\">\n                <button type=\"button\" pButton pRipple icon=\"pi pi-angle-up\" [disabled]=\"disabled\" (click)=\"moveUp(targetlist,target,selectedItemsTarget,onTargetReorder)\"></button>\n                <button type=\"button\" pButton pRipple icon=\"pi pi-angle-double-up\" [disabled]=\"disabled\" (click)=\"moveTop(targetlist,target,selectedItemsTarget,onTargetReorder)\"></button>\n                <button type=\"button\" pButton pRipple icon=\"pi pi-angle-down\" [disabled]=\"disabled\" (click)=\"moveDown(targetlist,target,selectedItemsTarget,onTargetReorder)\"></button>\n                <button type=\"button\" pButton pRipple icon=\"pi pi-angle-double-down\" [disabled]=\"disabled\" (click)=\"moveBottom(targetlist,target,selectedItemsTarget,onTargetReorder)\"></button>\n            </div>\n        </div>\n    ",
                    changeDetection: core.ChangeDetectionStrategy.OnPush,
                    encapsulation: core.ViewEncapsulation.None,
                    styles: [".p-picklist{display:flex}.p-picklist-buttons{display:flex;flex-direction:column;justify-content:center}.p-picklist-list-wrapper{flex:1 1 50%}.p-picklist-list{list-style-type:none;margin:0;max-height:24rem;min-height:12rem;overflow:auto;padding:0}.p-picklist-item{cursor:pointer;overflow:hidden;position:relative}.p-picklist-item[draggable=true]{cursor:move}.p-picklist-filter{position:relative}.p-picklist-filter-icon{margin-top:-.5rem;position:absolute;top:50%}.p-picklist-filter-input{width:100%}.p-picklist-droppoint{height:6px}"]
                },] }
    ];
    PickList.ctorParameters = function () { return [
        { type: core.ElementRef },
        { type: core.ChangeDetectorRef },
        { type: api.FilterService }
    ]; };
    PickList.propDecorators = {
        source: [{ type: core.Input }],
        target: [{ type: core.Input }],
        sourceHeader: [{ type: core.Input }],
        targetHeader: [{ type: core.Input }],
        responsive: [{ type: core.Input }],
        filterBy: [{ type: core.Input }],
        filterLocale: [{ type: core.Input }],
        trackBy: [{ type: core.Input }],
        sourceTrackBy: [{ type: core.Input }],
        targetTrackBy: [{ type: core.Input }],
        showSourceFilter: [{ type: core.Input }],
        showTargetFilter: [{ type: core.Input }],
        metaKeySelection: [{ type: core.Input }],
        dragdrop: [{ type: core.Input }],
        style: [{ type: core.Input }],
        styleClass: [{ type: core.Input }],
        sourceStyle: [{ type: core.Input }],
        targetStyle: [{ type: core.Input }],
        showSourceControls: [{ type: core.Input }],
        showTargetControls: [{ type: core.Input }],
        sourceFilterPlaceholder: [{ type: core.Input }],
        targetFilterPlaceholder: [{ type: core.Input }],
        disabled: [{ type: core.Input }],
        ariaSourceFilterLabel: [{ type: core.Input }],
        ariaTargetFilterLabel: [{ type: core.Input }],
        filterMatchMode: [{ type: core.Input }],
        onMoveToSource: [{ type: core.Output }],
        onMoveAllToSource: [{ type: core.Output }],
        onMoveAllToTarget: [{ type: core.Output }],
        onMoveToTarget: [{ type: core.Output }],
        onSourceReorder: [{ type: core.Output }],
        onTargetReorder: [{ type: core.Output }],
        onSourceSelect: [{ type: core.Output }],
        onTargetSelect: [{ type: core.Output }],
        onSourceFilter: [{ type: core.Output }],
        onTargetFilter: [{ type: core.Output }],
        listViewSourceChild: [{ type: core.ViewChild, args: ['sourcelist',] }],
        listViewTargetChild: [{ type: core.ViewChild, args: ['targetlist',] }],
        sourceFilterViewChild: [{ type: core.ViewChild, args: ['sourceFilter',] }],
        targetFilterViewChild: [{ type: core.ViewChild, args: ['targetFilter',] }],
        templates: [{ type: core.ContentChildren, args: [api.PrimeTemplate,] }]
    };
    var PickListModule = /** @class */ (function () {
        function PickListModule() {
        }
        return PickListModule;
    }());
    PickListModule.decorators = [
        { type: core.NgModule, args: [{
                    imports: [common.CommonModule, button.ButtonModule, api.SharedModule, ripple.RippleModule],
                    exports: [PickList, api.SharedModule],
                    declarations: [PickList]
                },] }
    ];

    /**
     * Generated bundle index. Do not edit.
     */

    exports.PickList = PickList;
    exports.PickListModule = PickListModule;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=primeng-picklist.umd.js.map
