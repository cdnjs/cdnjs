(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@angular/common'), require('primeng/button'), require('primeng/api'), require('primeng/dom'), require('primeng/ripple'), require('@angular/cdk/drag-drop'), require('primeng/utils')) :
    typeof define === 'function' && define.amd ? define('primeng/picklist', ['exports', '@angular/core', '@angular/common', 'primeng/button', 'primeng/api', 'primeng/dom', 'primeng/ripple', '@angular/cdk/drag-drop', 'primeng/utils'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory((global.primeng = global.primeng || {}, global.primeng.picklist = {}), global.ng.core, global.ng.common, global.primeng.button, global.primeng.api, global.primeng.dom, global.primeng.ripple, global.ng.cdk.dragDrop, global.primeng.utils));
}(this, (function (exports, i0, i3, i4, i1, dom, i5, i2, utils) { 'use strict';

    function _interopNamespace(e) {
        if (e && e.__esModule) return e;
        var n = Object.create(null);
        if (e) {
            Object.keys(e).forEach(function (k) {
                if (k !== 'default') {
                    var d = Object.getOwnPropertyDescriptor(e, k);
                    Object.defineProperty(n, k, d.get ? d : {
                        enumerable: true,
                        get: function () {
                            return e[k];
                        }
                    });
                }
            });
        }
        n['default'] = e;
        return Object.freeze(n);
    }

    var i0__namespace = /*#__PURE__*/_interopNamespace(i0);
    var i3__namespace = /*#__PURE__*/_interopNamespace(i3);
    var i4__namespace = /*#__PURE__*/_interopNamespace(i4);
    var i1__namespace = /*#__PURE__*/_interopNamespace(i1);
    var i5__namespace = /*#__PURE__*/_interopNamespace(i5);
    var i2__namespace = /*#__PURE__*/_interopNamespace(i2);

    var PickList = /** @class */ (function () {
        function PickList(el, cd, filterService) {
            this.el = el;
            this.cd = cd;
            this.filterService = filterService;
            this.trackBy = function (index, item) { return item; };
            this.showSourceFilter = true;
            this.showTargetFilter = true;
            this.metaKeySelection = true;
            this.dragdrop = false;
            this.showSourceControls = true;
            this.showTargetControls = true;
            this.disabled = false;
            this.filterMatchMode = "contains";
            this.breakpoint = "960px";
            this.onMoveToSource = new i0.EventEmitter();
            this.onMoveAllToSource = new i0.EventEmitter();
            this.onMoveAllToTarget = new i0.EventEmitter();
            this.onMoveToTarget = new i0.EventEmitter();
            this.onSourceReorder = new i0.EventEmitter();
            this.onTargetReorder = new i0.EventEmitter();
            this.onSourceSelect = new i0.EventEmitter();
            this.onTargetSelect = new i0.EventEmitter();
            this.onSourceFilter = new i0.EventEmitter();
            this.onTargetFilter = new i0.EventEmitter();
            this.selectedItemsSource = [];
            this.selectedItemsTarget = [];
            this.id = utils.UniqueComponentId();
            this.SOURCE_LIST = -1;
            this.TARGET_LIST = 1;
        }
        PickList.prototype.ngOnInit = function () {
            if (this.responsive) {
                this.createStyle();
            }
        };
        PickList.prototype.ngAfterContentInit = function () {
            var _this = this;
            this.templates.forEach(function (item) {
                switch (item.getType()) {
                    case 'item':
                        _this.itemTemplate = item.template;
                        break;
                    case 'sourceHeader':
                        _this.sourceHeaderTemplate = item.template;
                        break;
                    case 'targetHeader':
                        _this.targetHeaderTemplate = item.template;
                        break;
                    case 'emptymessagesource':
                        _this.emptyMessageSourceTemplate = item.template;
                        break;
                    case 'emptyfiltermessagesource':
                        _this.emptyFilterMessageSourceTemplate = item.template;
                        break;
                    case 'emptymessagetarget':
                        _this.emptyMessageTargetTemplate = item.template;
                        break;
                    case 'emptyfiltermessagetarget':
                        _this.emptyFilterMessageTargetTemplate = item.template;
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
            if (listType === this.SOURCE_LIST)
                this.filterValueSource = query;
            else if (listType === this.TARGET_LIST)
                this.filterValueTarget = query;
            this.filter(data, listType);
        };
        PickList.prototype.filter = function (data, listType) {
            var searchFields = this.filterBy.split(',');
            if (listType === this.SOURCE_LIST) {
                this.visibleOptionsSource = this.filterService.filter(data, searchFields, this.filterValueSource, this.filterMatchMode, this.filterLocale);
                this.onSourceFilter.emit({ query: this.filterValueSource, value: this.visibleOptionsSource });
            }
            else if (listType === this.TARGET_LIST) {
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
        PickList.prototype.isEmpty = function (listType) {
            if (listType == this.SOURCE_LIST)
                return this.filterValueSource ? (!this.visibleOptionsSource || this.visibleOptionsSource.length === 0) : (!this.source || this.source.length === 0);
            else
                return this.filterValueTarget ? (!this.visibleOptionsTarget || this.visibleOptionsTarget.length === 0) : (!this.target || this.target.length === 0);
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
        PickList.prototype.onItemTouchEnd = function () {
            if (this.disabled) {
                return;
            }
            this.itemTouched = true;
        };
        PickList.prototype.sortByIndexInList = function (items, list) {
            return items.sort(function (item1, item2) { return utils.ObjectUtils.findIndexInList(item1, list) - utils.ObjectUtils.findIndexInList(item2, list); });
        };
        PickList.prototype.moveUp = function (listElement, list, selectedItems, callback, listType) {
            if (selectedItems && selectedItems.length) {
                selectedItems = this.sortByIndexInList(selectedItems, list);
                for (var i = 0; i < selectedItems.length; i++) {
                    var selectedItem = selectedItems[i];
                    var selectedItemIndex = utils.ObjectUtils.findIndexInList(selectedItem, list);
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
                if (this.dragdrop && ((this.filterValueSource && listType === this.SOURCE_LIST) || (this.filterValueTarget && listType === this.TARGET_LIST)))
                    this.filter(list, listType);
                this.movedUp = true;
                this.reorderedListElement = listElement;
                callback.emit({ items: selectedItems });
            }
        };
        PickList.prototype.moveTop = function (listElement, list, selectedItems, callback, listType) {
            if (selectedItems && selectedItems.length) {
                selectedItems = this.sortByIndexInList(selectedItems, list);
                for (var i = 0; i < selectedItems.length; i++) {
                    var selectedItem = selectedItems[i];
                    var selectedItemIndex = utils.ObjectUtils.findIndexInList(selectedItem, list);
                    if (selectedItemIndex != 0) {
                        var movedItem = list.splice(selectedItemIndex, 1)[0];
                        list.unshift(movedItem);
                    }
                    else {
                        break;
                    }
                }
                if (this.dragdrop && ((this.filterValueSource && listType === this.SOURCE_LIST) || (this.filterValueTarget && listType === this.TARGET_LIST)))
                    this.filter(list, listType);
                listElement.scrollTop = 0;
                callback.emit({ items: selectedItems });
            }
        };
        PickList.prototype.moveDown = function (listElement, list, selectedItems, callback, listType) {
            if (selectedItems && selectedItems.length) {
                selectedItems = this.sortByIndexInList(selectedItems, list);
                for (var i = selectedItems.length - 1; i >= 0; i--) {
                    var selectedItem = selectedItems[i];
                    var selectedItemIndex = utils.ObjectUtils.findIndexInList(selectedItem, list);
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
                if (this.dragdrop && ((this.filterValueSource && listType === this.SOURCE_LIST) || (this.filterValueTarget && listType === this.TARGET_LIST)))
                    this.filter(list, listType);
                this.movedDown = true;
                this.reorderedListElement = listElement;
                callback.emit({ items: selectedItems });
            }
        };
        PickList.prototype.moveBottom = function (listElement, list, selectedItems, callback, listType) {
            if (selectedItems && selectedItems.length) {
                selectedItems = this.sortByIndexInList(selectedItems, list);
                for (var i = selectedItems.length - 1; i >= 0; i--) {
                    var selectedItem = selectedItems[i];
                    var selectedItemIndex = utils.ObjectUtils.findIndexInList(selectedItem, list);
                    if (selectedItemIndex != (list.length - 1)) {
                        var movedItem = list.splice(selectedItemIndex, 1)[0];
                        list.push(movedItem);
                    }
                    else {
                        break;
                    }
                }
                if (this.dragdrop && ((this.filterValueSource && listType === this.SOURCE_LIST) || (this.filterValueTarget && listType === this.TARGET_LIST)))
                    this.filter(list, listType);
                listElement.scrollTop = listElement.scrollHeight;
                callback.emit({ items: selectedItems });
            }
        };
        PickList.prototype.moveRight = function () {
            if (this.selectedItemsSource && this.selectedItemsSource.length) {
                for (var i = 0; i < this.selectedItemsSource.length; i++) {
                    var selectedItem = this.selectedItemsSource[i];
                    if (utils.ObjectUtils.findIndexInList(selectedItem, this.target) == -1) {
                        this.target.push(this.source.splice(utils.ObjectUtils.findIndexInList(selectedItem, this.source), 1)[0]);
                        if (this.visibleOptionsSource)
                            this.visibleOptionsSource.splice(utils.ObjectUtils.findIndexInList(selectedItem, this.visibleOptionsSource), 1);
                    }
                }
                this.onMoveToTarget.emit({
                    items: this.selectedItemsSource
                });
                this.selectedItemsSource = [];
                if (this.filterValueTarget) {
                    this.filter(this.target, this.TARGET_LIST);
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
                    this.filter(this.target, this.TARGET_LIST);
                }
                this.visibleOptionsSource = [];
            }
        };
        PickList.prototype.moveLeft = function () {
            if (this.selectedItemsTarget && this.selectedItemsTarget.length) {
                for (var i = 0; i < this.selectedItemsTarget.length; i++) {
                    var selectedItem = this.selectedItemsTarget[i];
                    if (utils.ObjectUtils.findIndexInList(selectedItem, this.source) == -1) {
                        this.source.push(this.target.splice(utils.ObjectUtils.findIndexInList(selectedItem, this.target), 1)[0]);
                        if (this.visibleOptionsTarget)
                            this.visibleOptionsTarget.splice(utils.ObjectUtils.findIndexInList(selectedItem, this.visibleOptionsTarget), 1)[0];
                    }
                }
                this.onMoveToSource.emit({
                    items: this.selectedItemsTarget
                });
                this.selectedItemsTarget = [];
                if (this.filterValueSource) {
                    this.filter(this.source, this.SOURCE_LIST);
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
                    this.filter(this.source, this.SOURCE_LIST);
                }
                this.visibleOptionsTarget = [];
            }
        };
        PickList.prototype.isSelected = function (item, selectedItems) {
            return this.findIndexInSelection(item, selectedItems) != -1;
        };
        PickList.prototype.findIndexInSelection = function (item, selectedItems) {
            return utils.ObjectUtils.findIndexInList(item, selectedItems);
        };
        PickList.prototype.onDrop = function (event, listType) {
            var isTransfer = event.previousContainer !== event.container;
            var dropIndexes = this.getDropIndexes(event.previousIndex, event.currentIndex, listType, isTransfer, event.item.data);
            if (listType === this.SOURCE_LIST) {
                if (isTransfer) {
                    i2.transferArrayItem(event.previousContainer.data, event.container.data, dropIndexes.previousIndex, dropIndexes.currentIndex);
                    if (this.visibleOptionsTarget)
                        this.visibleOptionsTarget.splice(event.previousIndex, 1);
                    this.onMoveToSource.emit({ items: [event.item.data] });
                }
                else {
                    i2.moveItemInArray(event.container.data, dropIndexes.previousIndex, dropIndexes.currentIndex);
                    this.onSourceReorder.emit({ items: [event.item.data] });
                }
                if (this.filterValueSource) {
                    this.filter(this.source, this.SOURCE_LIST);
                }
            }
            else {
                if (isTransfer) {
                    i2.transferArrayItem(event.previousContainer.data, event.container.data, dropIndexes.previousIndex, dropIndexes.currentIndex);
                    if (this.visibleOptionsSource)
                        this.visibleOptionsSource.splice(event.previousIndex, 1);
                    this.onMoveToTarget.emit({ items: [event.item.data] });
                }
                else {
                    i2.moveItemInArray(event.container.data, dropIndexes.previousIndex, dropIndexes.currentIndex);
                    this.onTargetReorder.emit({ items: [event.item.data] });
                }
                if (this.filterValueTarget) {
                    this.filter(this.target, this.TARGET_LIST);
                }
            }
        };
        PickList.prototype.getDropIndexes = function (fromIndex, toIndex, droppedList, isTransfer, data) {
            var previousIndex, currentIndex;
            if (droppedList === this.SOURCE_LIST) {
                previousIndex = isTransfer ? this.filterValueTarget ? utils.ObjectUtils.findIndexInList(data, this.target) : fromIndex : this.filterValueSource ? utils.ObjectUtils.findIndexInList(data, this.source) : fromIndex;
                currentIndex = this.filterValueSource ? this.findFilteredCurrentIndex(this.visibleOptionsSource, toIndex, this.source) : toIndex;
            }
            else {
                previousIndex = isTransfer ? this.filterValueSource ? utils.ObjectUtils.findIndexInList(data, this.source) : fromIndex : this.filterValueTarget ? utils.ObjectUtils.findIndexInList(data, this.target) : fromIndex;
                currentIndex = this.filterValueTarget ? this.findFilteredCurrentIndex(this.visibleOptionsTarget, toIndex, this.target) : toIndex;
            }
            return { previousIndex: previousIndex, currentIndex: currentIndex };
        };
        PickList.prototype.findFilteredCurrentIndex = function (visibleOptions, index, options) {
            if (visibleOptions.length === index) {
                var toIndex = utils.ObjectUtils.findIndexInList(visibleOptions[index - 1], options);
                return toIndex + 1;
            }
            else {
                return utils.ObjectUtils.findIndexInList(visibleOptions[index], options);
            }
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
        PickList.prototype.createStyle = function () {
            if (!this.styleElement) {
                this.el.nativeElement.children[0].setAttribute(this.id, '');
                this.styleElement = document.createElement('style');
                this.styleElement.type = 'text/css';
                document.head.appendChild(this.styleElement);
                var innerHTML = "\n            @media screen and (max-width: " + this.breakpoint + ") {\n                .p-picklist[" + this.id + "] {\n                    flex-direction: column;\n                }\n\n                .p-picklist[" + this.id + "] .p-picklist-buttons {\n                    padding: var(--content-padding);\n                    flex-direction: row;\n                }\n\n                .p-picklist[" + this.id + "] .p-picklist-buttons .p-button {\n                    margin-right: var(--inline-spacing);\n                    margin-bottom: 0;\n                }\n\n                .p-picklist[" + this.id + "] .p-picklist-buttons .p-button:last-child {\n                    margin-right: 0;\n                }\n\n                .p-picklist[" + this.id + "] .pi-angle-right:before {\n                    content: \"\\e930\"\n                }\n\n                .p-picklist[" + this.id + "] .pi-angle-double-right:before {\n                    content: \"\\e92c\"\n                }\n\n                .p-picklist[" + this.id + "] .pi-angle-left:before {\n                    content: \"\\e933\"\n                }\n\n                .p-picklist[" + this.id + "] .pi-angle-double-left:before {\n                    content: \"\\e92f\"\n                }\n            }\n            ";
                this.styleElement.innerHTML = innerHTML;
            }
        };
        PickList.prototype.destroyStyle = function () {
            if (this.styleElement) {
                document.head.removeChild(this.styleElement);
                this.styleElement = null;
                "";
            }
        };
        PickList.prototype.ngOnDestroy = function () {
            this.destroyStyle();
        };
        return PickList;
    }());
    PickList.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0__namespace, type: PickList, deps: [{ token: i0__namespace.ElementRef }, { token: i0__namespace.ChangeDetectorRef }, { token: i1__namespace.FilterService }], target: i0__namespace.ɵɵFactoryTarget.Component });
    PickList.ɵcmp = i0__namespace.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.0.5", type: PickList, selector: "p-pickList", inputs: { source: "source", target: "target", sourceHeader: "sourceHeader", targetHeader: "targetHeader", responsive: "responsive", filterBy: "filterBy", filterLocale: "filterLocale", trackBy: "trackBy", sourceTrackBy: "sourceTrackBy", targetTrackBy: "targetTrackBy", showSourceFilter: "showSourceFilter", showTargetFilter: "showTargetFilter", metaKeySelection: "metaKeySelection", dragdrop: "dragdrop", style: "style", styleClass: "styleClass", sourceStyle: "sourceStyle", targetStyle: "targetStyle", showSourceControls: "showSourceControls", showTargetControls: "showTargetControls", sourceFilterPlaceholder: "sourceFilterPlaceholder", targetFilterPlaceholder: "targetFilterPlaceholder", disabled: "disabled", ariaSourceFilterLabel: "ariaSourceFilterLabel", ariaTargetFilterLabel: "ariaTargetFilterLabel", filterMatchMode: "filterMatchMode", breakpoint: "breakpoint" }, outputs: { onMoveToSource: "onMoveToSource", onMoveAllToSource: "onMoveAllToSource", onMoveAllToTarget: "onMoveAllToTarget", onMoveToTarget: "onMoveToTarget", onSourceReorder: "onSourceReorder", onTargetReorder: "onTargetReorder", onSourceSelect: "onSourceSelect", onTargetSelect: "onTargetSelect", onSourceFilter: "onSourceFilter", onTargetFilter: "onTargetFilter" }, host: { classAttribute: "p-element" }, queries: [{ propertyName: "templates", predicate: i1.PrimeTemplate }], viewQueries: [{ propertyName: "listViewSourceChild", first: true, predicate: ["sourcelist"], descendants: true }, { propertyName: "listViewTargetChild", first: true, predicate: ["targetlist"], descendants: true }, { propertyName: "sourceFilterViewChild", first: true, predicate: ["sourceFilter"], descendants: true }, { propertyName: "targetFilterViewChild", first: true, predicate: ["targetFilter"], descendants: true }], ngImport: i0__namespace, template: "\n        <div [class]=\"styleClass\" [ngStyle]=\"style\" [ngClass]=\"'p-picklist p-component'\" cdkDropListGroup>\n            <div class=\"p-picklist-buttons p-picklist-source-controls\" *ngIf=\"showSourceControls\">\n                <button type=\"button\" pButton pRipple icon=\"pi pi-angle-up\" [disabled]=\"disabled\" (click)=\"moveUp(sourcelist,source,selectedItemsSource,onSourceReorder,SOURCE_LIST)\"></button>\n                <button type=\"button\" pButton pRipple icon=\"pi pi-angle-double-up\" [disabled]=\"disabled\" (click)=\"moveTop(sourcelist,source,selectedItemsSource,onSourceReorder,SOURCE_LIST)\"></button>\n                <button type=\"button\" pButton pRipple icon=\"pi pi-angle-down\" [disabled]=\"disabled\" (click)=\"moveDown(sourcelist,source,selectedItemsSource,onSourceReorder,SOURCE_LIST)\"></button>\n                <button type=\"button\" pButton pRipple icon=\"pi pi-angle-double-down\" [disabled]=\"disabled\" (click)=\"moveBottom(sourcelist,source,selectedItemsSource,onSourceReorder,SOURCE_LIST)\"></button>\n            </div>\n            <div class=\"p-picklist-list-wrapper p-picklist-source-wrapper\">\n                <div class=\"p-picklist-header\" *ngIf=\"sourceHeader || sourceHeaderTemplate\">\n                    <div class=\"p-picklist-title\" *ngIf=\"!sourceHeaderTemplate\">{{sourceHeader}}</div>\n                    <ng-container *ngTemplateOutlet=\"sourceHeaderTemplate\"></ng-container>\n                </div>\n                <div class=\"p-picklist-filter-container\" *ngIf=\"filterBy && showSourceFilter !== false\">\n                    <div class=\"p-picklist-filter\">\n                        <input #sourceFilter type=\"text\" role=\"textbox\" (keyup)=\"onFilter($event,source,SOURCE_LIST)\" class=\"p-picklist-filter-input p-inputtext p-component\" [disabled]=\"disabled\" [attr.placeholder]=\"sourceFilterPlaceholder\" [attr.aria-label]=\"ariaSourceFilterLabel\">\n                        <span class=\"p-picklist-filter-icon pi pi-search\"></span>\n                    </div>\n                </div>\n\n                <ul #sourcelist class=\"p-picklist-list p-picklist-source\" cdkDropList [cdkDropListData]=\"source\" (cdkDropListDropped)=\"onDrop($event, SOURCE_LIST)\"\n                    [ngStyle]=\"sourceStyle\" role=\"listbox\" aria-multiselectable=\"multiple\">\n                    <ng-template ngFor let-item [ngForOf]=\"source\" [ngForTrackBy]=\"sourceTrackBy || trackBy\" let-i=\"index\" let-l=\"last\">\n                        <li [ngClass]=\"{'p-picklist-item':true,'p-highlight':isSelected(item,selectedItemsSource),'p-disabled': disabled}\" pRipple cdkDrag [cdkDragData]=\"item\" [cdkDragDisabled]=\"!dragdrop\"\n                            (click)=\"onItemClick($event,item,selectedItemsSource,onSourceSelect)\" (dblclick)=\"onSourceItemDblClick()\" (touchend)=\"onItemTouchEnd()\" (keydown)=\"onItemKeydown($event,item,selectedItemsSource,onSourceSelect)\"\n                            *ngIf=\"isItemVisible(item, SOURCE_LIST)\" tabindex=\"0\" role=\"option\" [attr.aria-selected]=\"isSelected(item, selectedItemsSource)\">\n                            <ng-container *ngTemplateOutlet=\"itemTemplate; context: {$implicit: item, index: i}\"></ng-container>\n                        </li>\n                    </ng-template>\n                    <ng-container *ngIf=\"isEmpty(SOURCE_LIST) && (emptyMessageSourceTemplate || emptyFilterMessageSourceTemplate)\">\n                        <li class=\"p-picklist-empty-message\" *ngIf=\"!filterValueSource || !emptyFilterMessageSourceTemplate\">\n                            <ng-container *ngTemplateOutlet=\"emptyMessageSourceTemplate\"></ng-container>\n                        </li>\n                        <li class=\"p-picklist-empty-message\" *ngIf=\"filterValueSource\">\n                            <ng-container *ngTemplateOutlet=\"emptyFilterMessageSourceTemplate\"></ng-container>\n                        </li>\n                    </ng-container>\n                </ul>\n            </div>\n            <div class=\"p-picklist-buttons p-picklist-transfer-buttons\">\n                <button type=\"button\" pButton pRipple icon=\"pi pi-angle-right\" [disabled]=\"disabled\" (click)=\"moveRight()\"></button>\n                <button type=\"button\" pButton pRipple icon=\"pi pi-angle-double-right\" [disabled]=\"disabled\" (click)=\"moveAllRight()\"></button>\n                <button type=\"button\" pButton pRipple icon=\"pi pi-angle-left\" [disabled]=\"disabled\" (click)=\"moveLeft()\"></button>\n                <button type=\"button\" pButton pRipple icon=\"pi pi-angle-double-left\" [disabled]=\"disabled\" (click)=\"moveAllLeft()\"></button>\n            </div>\n            <div class=\"p-picklist-list-wrapper p-picklist-target-wrapper\">\n                <div class=\"p-picklist-header\" *ngIf=\"targetHeader || targetHeaderTemplate\">\n                    <div class=\"p-picklist-title\" *ngIf=\"!targetHeaderTemplate\">{{targetHeader}}</div>\n                    <ng-container *ngTemplateOutlet=\"targetHeaderTemplate\"></ng-container>\n                </div>\n                <div class=\"p-picklist-filter-container\" *ngIf=\"filterBy && showTargetFilter !== false\">\n                    <div class=\"p-picklist-filter\">\n                        <input #targetFilter type=\"text\" role=\"textbox\" (keyup)=\"onFilter($event,target,TARGET_LIST)\" class=\"p-picklist-filter-input p-inputtext p-component\" [disabled]=\"disabled\" [attr.placeholder]=\"targetFilterPlaceholder\" [attr.aria-label]=\"ariaTargetFilterLabel\">\n                        <span class=\"p-picklist-filter-icon pi pi-search\"></span>\n                    </div>\n                </div>\n                <ul #targetlist class=\"p-picklist-list p-picklist-target\" cdkDropList [cdkDropListData]=\"target\" (cdkDropListDropped)=\"onDrop($event, TARGET_LIST)\"\n                    [ngStyle]=\"targetStyle\" role=\"listbox\" aria-multiselectable=\"multiple\">\n                    <ng-template ngFor let-item [ngForOf]=\"target\" [ngForTrackBy]=\"targetTrackBy || trackBy\" let-i=\"index\" let-l=\"last\">\n                        <li [ngClass]=\"{'p-picklist-item':true,'p-highlight':isSelected(item,selectedItemsTarget), 'p-disabled': disabled}\" pRipple cdkDrag [cdkDragData]=\"item\" [cdkDragDisabled]=\"!dragdrop\"\n                            (click)=\"onItemClick($event,item,selectedItemsTarget,onTargetSelect)\" (dblclick)=\"onTargetItemDblClick()\" (touchend)=\"onItemTouchEnd()\" (keydown)=\"onItemKeydown($event,item,selectedItemsTarget,onTargetSelect)\"\n                            *ngIf=\"isItemVisible(item, TARGET_LIST)\" tabindex=\"0\" role=\"option\" [attr.aria-selected]=\"isSelected(item, selectedItemsTarget)\">\n                            <ng-container *ngTemplateOutlet=\"itemTemplate; context: {$implicit: item, index: i}\"></ng-container>\n                        </li>\n                    </ng-template>\n                    <ng-container *ngIf=\"isEmpty(TARGET_LIST) && (emptyMessageTargetTemplate || emptyFilterMessageTargetTemplate)\">\n                        <li class=\"p-picklist-empty-message\" *ngIf=\"!filterValueTarget || !emptyFilterMessageTargetTemplate\">\n                            <ng-container *ngTemplateOutlet=\"emptyMessageTargetTemplate\"></ng-container>\n                        </li>\n                        <li class=\"p-picklist-empty-message\" *ngIf=\"filterValueTarget\">\n                            <ng-container *ngTemplateOutlet=\"emptyFilterMessageTargetTemplate\"></ng-container>\n                        </li>\n                    </ng-container>\n                </ul>\n            </div>\n            <div class=\"p-picklist-buttons p-picklist-target-controls\" *ngIf=\"showTargetControls\">\n                <button type=\"button\" pButton pRipple icon=\"pi pi-angle-up\" [disabled]=\"disabled\" (click)=\"moveUp(targetlist,target,selectedItemsTarget,onTargetReorder,TARGET_LIST)\"></button>\n                <button type=\"button\" pButton pRipple icon=\"pi pi-angle-double-up\" [disabled]=\"disabled\" (click)=\"moveTop(targetlist,target,selectedItemsTarget,onTargetReorder,TARGET_LIST)\"></button>\n                <button type=\"button\" pButton pRipple icon=\"pi pi-angle-down\" [disabled]=\"disabled\" (click)=\"moveDown(targetlist,target,selectedItemsTarget,onTargetReorder,TARGET_LIST)\"></button>\n                <button type=\"button\" pButton pRipple icon=\"pi pi-angle-double-down\" [disabled]=\"disabled\" (click)=\"moveBottom(targetlist,target,selectedItemsTarget,onTargetReorder,TARGET_LIST)\"></button>\n            </div>\n        </div>\n    ", isInline: true, styles: [".p-picklist{display:flex}.p-picklist-buttons{display:flex;flex-direction:column;justify-content:center}.p-picklist-list-wrapper{flex:1 1 50%}.p-picklist-list{list-style-type:none;margin:0;padding:0;overflow:auto;min-height:12rem}.p-picklist-item{display:block;cursor:pointer;overflow:hidden;position:relative}.p-picklist-item:not(.cdk-drag-disabled){cursor:move}.p-picklist-item.cdk-drag-placeholder{opacity:0}.p-picklist-item.cdk-drag-animating{transition:transform .25s cubic-bezier(0,0,.2,1)}.p-picklist-filter{position:relative}.p-picklist-filter-icon{position:absolute;top:50%;margin-top:-.5rem}.p-picklist-filter-input{width:100%}.p-picklist-list.cdk-drop-list-dragging .p-picklist-item:not(.cdk-drag-placeholder){transition:transform .25s cubic-bezier(0,0,.2,1)}"], directives: [{ type: i2__namespace.CdkDropListGroup, selector: "[cdkDropListGroup]", inputs: ["cdkDropListGroupDisabled"], exportAs: ["cdkDropListGroup"] }, { type: i3__namespace.NgStyle, selector: "[ngStyle]", inputs: ["ngStyle"] }, { type: i3__namespace.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { type: i3__namespace.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i4__namespace.ButtonDirective, selector: "[pButton]", inputs: ["iconPos", "loadingIcon", "label", "icon", "loading"] }, { type: i5__namespace.Ripple, selector: "[pRipple]" }, { type: i3__namespace.NgTemplateOutlet, selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet"] }, { type: i2__namespace.CdkDropList, selector: "[cdkDropList], cdk-drop-list", inputs: ["cdkDropListConnectedTo", "id", "cdkDropListEnterPredicate", "cdkDropListSortPredicate", "cdkDropListDisabled", "cdkDropListSortingDisabled", "cdkDropListAutoScrollDisabled", "cdkDropListOrientation", "cdkDropListLockAxis", "cdkDropListData", "cdkDropListAutoScrollStep"], outputs: ["cdkDropListDropped", "cdkDropListEntered", "cdkDropListExited", "cdkDropListSorted"], exportAs: ["cdkDropList"] }, { type: i3__namespace.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { type: i2__namespace.CdkDrag, selector: "[cdkDrag]", inputs: ["cdkDragDisabled", "cdkDragStartDelay", "cdkDragLockAxis", "cdkDragConstrainPosition", "cdkDragPreviewClass", "cdkDragBoundary", "cdkDragRootElement", "cdkDragPreviewContainer", "cdkDragData", "cdkDragFreeDragPosition"], outputs: ["cdkDragStarted", "cdkDragReleased", "cdkDragEnded", "cdkDragEntered", "cdkDragExited", "cdkDragDropped", "cdkDragMoved"], exportAs: ["cdkDrag"] }], changeDetection: i0__namespace.ChangeDetectionStrategy.OnPush, encapsulation: i0__namespace.ViewEncapsulation.None });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0__namespace, type: PickList, decorators: [{
                type: i0.Component,
                args: [{
                        selector: 'p-pickList',
                        template: "\n        <div [class]=\"styleClass\" [ngStyle]=\"style\" [ngClass]=\"'p-picklist p-component'\" cdkDropListGroup>\n            <div class=\"p-picklist-buttons p-picklist-source-controls\" *ngIf=\"showSourceControls\">\n                <button type=\"button\" pButton pRipple icon=\"pi pi-angle-up\" [disabled]=\"disabled\" (click)=\"moveUp(sourcelist,source,selectedItemsSource,onSourceReorder,SOURCE_LIST)\"></button>\n                <button type=\"button\" pButton pRipple icon=\"pi pi-angle-double-up\" [disabled]=\"disabled\" (click)=\"moveTop(sourcelist,source,selectedItemsSource,onSourceReorder,SOURCE_LIST)\"></button>\n                <button type=\"button\" pButton pRipple icon=\"pi pi-angle-down\" [disabled]=\"disabled\" (click)=\"moveDown(sourcelist,source,selectedItemsSource,onSourceReorder,SOURCE_LIST)\"></button>\n                <button type=\"button\" pButton pRipple icon=\"pi pi-angle-double-down\" [disabled]=\"disabled\" (click)=\"moveBottom(sourcelist,source,selectedItemsSource,onSourceReorder,SOURCE_LIST)\"></button>\n            </div>\n            <div class=\"p-picklist-list-wrapper p-picklist-source-wrapper\">\n                <div class=\"p-picklist-header\" *ngIf=\"sourceHeader || sourceHeaderTemplate\">\n                    <div class=\"p-picklist-title\" *ngIf=\"!sourceHeaderTemplate\">{{sourceHeader}}</div>\n                    <ng-container *ngTemplateOutlet=\"sourceHeaderTemplate\"></ng-container>\n                </div>\n                <div class=\"p-picklist-filter-container\" *ngIf=\"filterBy && showSourceFilter !== false\">\n                    <div class=\"p-picklist-filter\">\n                        <input #sourceFilter type=\"text\" role=\"textbox\" (keyup)=\"onFilter($event,source,SOURCE_LIST)\" class=\"p-picklist-filter-input p-inputtext p-component\" [disabled]=\"disabled\" [attr.placeholder]=\"sourceFilterPlaceholder\" [attr.aria-label]=\"ariaSourceFilterLabel\">\n                        <span class=\"p-picklist-filter-icon pi pi-search\"></span>\n                    </div>\n                </div>\n\n                <ul #sourcelist class=\"p-picklist-list p-picklist-source\" cdkDropList [cdkDropListData]=\"source\" (cdkDropListDropped)=\"onDrop($event, SOURCE_LIST)\"\n                    [ngStyle]=\"sourceStyle\" role=\"listbox\" aria-multiselectable=\"multiple\">\n                    <ng-template ngFor let-item [ngForOf]=\"source\" [ngForTrackBy]=\"sourceTrackBy || trackBy\" let-i=\"index\" let-l=\"last\">\n                        <li [ngClass]=\"{'p-picklist-item':true,'p-highlight':isSelected(item,selectedItemsSource),'p-disabled': disabled}\" pRipple cdkDrag [cdkDragData]=\"item\" [cdkDragDisabled]=\"!dragdrop\"\n                            (click)=\"onItemClick($event,item,selectedItemsSource,onSourceSelect)\" (dblclick)=\"onSourceItemDblClick()\" (touchend)=\"onItemTouchEnd()\" (keydown)=\"onItemKeydown($event,item,selectedItemsSource,onSourceSelect)\"\n                            *ngIf=\"isItemVisible(item, SOURCE_LIST)\" tabindex=\"0\" role=\"option\" [attr.aria-selected]=\"isSelected(item, selectedItemsSource)\">\n                            <ng-container *ngTemplateOutlet=\"itemTemplate; context: {$implicit: item, index: i}\"></ng-container>\n                        </li>\n                    </ng-template>\n                    <ng-container *ngIf=\"isEmpty(SOURCE_LIST) && (emptyMessageSourceTemplate || emptyFilterMessageSourceTemplate)\">\n                        <li class=\"p-picklist-empty-message\" *ngIf=\"!filterValueSource || !emptyFilterMessageSourceTemplate\">\n                            <ng-container *ngTemplateOutlet=\"emptyMessageSourceTemplate\"></ng-container>\n                        </li>\n                        <li class=\"p-picklist-empty-message\" *ngIf=\"filterValueSource\">\n                            <ng-container *ngTemplateOutlet=\"emptyFilterMessageSourceTemplate\"></ng-container>\n                        </li>\n                    </ng-container>\n                </ul>\n            </div>\n            <div class=\"p-picklist-buttons p-picklist-transfer-buttons\">\n                <button type=\"button\" pButton pRipple icon=\"pi pi-angle-right\" [disabled]=\"disabled\" (click)=\"moveRight()\"></button>\n                <button type=\"button\" pButton pRipple icon=\"pi pi-angle-double-right\" [disabled]=\"disabled\" (click)=\"moveAllRight()\"></button>\n                <button type=\"button\" pButton pRipple icon=\"pi pi-angle-left\" [disabled]=\"disabled\" (click)=\"moveLeft()\"></button>\n                <button type=\"button\" pButton pRipple icon=\"pi pi-angle-double-left\" [disabled]=\"disabled\" (click)=\"moveAllLeft()\"></button>\n            </div>\n            <div class=\"p-picklist-list-wrapper p-picklist-target-wrapper\">\n                <div class=\"p-picklist-header\" *ngIf=\"targetHeader || targetHeaderTemplate\">\n                    <div class=\"p-picklist-title\" *ngIf=\"!targetHeaderTemplate\">{{targetHeader}}</div>\n                    <ng-container *ngTemplateOutlet=\"targetHeaderTemplate\"></ng-container>\n                </div>\n                <div class=\"p-picklist-filter-container\" *ngIf=\"filterBy && showTargetFilter !== false\">\n                    <div class=\"p-picklist-filter\">\n                        <input #targetFilter type=\"text\" role=\"textbox\" (keyup)=\"onFilter($event,target,TARGET_LIST)\" class=\"p-picklist-filter-input p-inputtext p-component\" [disabled]=\"disabled\" [attr.placeholder]=\"targetFilterPlaceholder\" [attr.aria-label]=\"ariaTargetFilterLabel\">\n                        <span class=\"p-picklist-filter-icon pi pi-search\"></span>\n                    </div>\n                </div>\n                <ul #targetlist class=\"p-picklist-list p-picklist-target\" cdkDropList [cdkDropListData]=\"target\" (cdkDropListDropped)=\"onDrop($event, TARGET_LIST)\"\n                    [ngStyle]=\"targetStyle\" role=\"listbox\" aria-multiselectable=\"multiple\">\n                    <ng-template ngFor let-item [ngForOf]=\"target\" [ngForTrackBy]=\"targetTrackBy || trackBy\" let-i=\"index\" let-l=\"last\">\n                        <li [ngClass]=\"{'p-picklist-item':true,'p-highlight':isSelected(item,selectedItemsTarget), 'p-disabled': disabled}\" pRipple cdkDrag [cdkDragData]=\"item\" [cdkDragDisabled]=\"!dragdrop\"\n                            (click)=\"onItemClick($event,item,selectedItemsTarget,onTargetSelect)\" (dblclick)=\"onTargetItemDblClick()\" (touchend)=\"onItemTouchEnd()\" (keydown)=\"onItemKeydown($event,item,selectedItemsTarget,onTargetSelect)\"\n                            *ngIf=\"isItemVisible(item, TARGET_LIST)\" tabindex=\"0\" role=\"option\" [attr.aria-selected]=\"isSelected(item, selectedItemsTarget)\">\n                            <ng-container *ngTemplateOutlet=\"itemTemplate; context: {$implicit: item, index: i}\"></ng-container>\n                        </li>\n                    </ng-template>\n                    <ng-container *ngIf=\"isEmpty(TARGET_LIST) && (emptyMessageTargetTemplate || emptyFilterMessageTargetTemplate)\">\n                        <li class=\"p-picklist-empty-message\" *ngIf=\"!filterValueTarget || !emptyFilterMessageTargetTemplate\">\n                            <ng-container *ngTemplateOutlet=\"emptyMessageTargetTemplate\"></ng-container>\n                        </li>\n                        <li class=\"p-picklist-empty-message\" *ngIf=\"filterValueTarget\">\n                            <ng-container *ngTemplateOutlet=\"emptyFilterMessageTargetTemplate\"></ng-container>\n                        </li>\n                    </ng-container>\n                </ul>\n            </div>\n            <div class=\"p-picklist-buttons p-picklist-target-controls\" *ngIf=\"showTargetControls\">\n                <button type=\"button\" pButton pRipple icon=\"pi pi-angle-up\" [disabled]=\"disabled\" (click)=\"moveUp(targetlist,target,selectedItemsTarget,onTargetReorder,TARGET_LIST)\"></button>\n                <button type=\"button\" pButton pRipple icon=\"pi pi-angle-double-up\" [disabled]=\"disabled\" (click)=\"moveTop(targetlist,target,selectedItemsTarget,onTargetReorder,TARGET_LIST)\"></button>\n                <button type=\"button\" pButton pRipple icon=\"pi pi-angle-down\" [disabled]=\"disabled\" (click)=\"moveDown(targetlist,target,selectedItemsTarget,onTargetReorder,TARGET_LIST)\"></button>\n                <button type=\"button\" pButton pRipple icon=\"pi pi-angle-double-down\" [disabled]=\"disabled\" (click)=\"moveBottom(targetlist,target,selectedItemsTarget,onTargetReorder,TARGET_LIST)\"></button>\n            </div>\n        </div>\n    ",
                        changeDetection: i0.ChangeDetectionStrategy.OnPush,
                        encapsulation: i0.ViewEncapsulation.None,
                        styleUrls: ['./picklist.css'],
                        host: {
                            'class': 'p-element'
                        }
                    }]
            }], ctorParameters: function () { return [{ type: i0__namespace.ElementRef }, { type: i0__namespace.ChangeDetectorRef }, { type: i1__namespace.FilterService }]; }, propDecorators: { source: [{
                    type: i0.Input
                }], target: [{
                    type: i0.Input
                }], sourceHeader: [{
                    type: i0.Input
                }], targetHeader: [{
                    type: i0.Input
                }], responsive: [{
                    type: i0.Input
                }], filterBy: [{
                    type: i0.Input
                }], filterLocale: [{
                    type: i0.Input
                }], trackBy: [{
                    type: i0.Input
                }], sourceTrackBy: [{
                    type: i0.Input
                }], targetTrackBy: [{
                    type: i0.Input
                }], showSourceFilter: [{
                    type: i0.Input
                }], showTargetFilter: [{
                    type: i0.Input
                }], metaKeySelection: [{
                    type: i0.Input
                }], dragdrop: [{
                    type: i0.Input
                }], style: [{
                    type: i0.Input
                }], styleClass: [{
                    type: i0.Input
                }], sourceStyle: [{
                    type: i0.Input
                }], targetStyle: [{
                    type: i0.Input
                }], showSourceControls: [{
                    type: i0.Input
                }], showTargetControls: [{
                    type: i0.Input
                }], sourceFilterPlaceholder: [{
                    type: i0.Input
                }], targetFilterPlaceholder: [{
                    type: i0.Input
                }], disabled: [{
                    type: i0.Input
                }], ariaSourceFilterLabel: [{
                    type: i0.Input
                }], ariaTargetFilterLabel: [{
                    type: i0.Input
                }], filterMatchMode: [{
                    type: i0.Input
                }], breakpoint: [{
                    type: i0.Input
                }], onMoveToSource: [{
                    type: i0.Output
                }], onMoveAllToSource: [{
                    type: i0.Output
                }], onMoveAllToTarget: [{
                    type: i0.Output
                }], onMoveToTarget: [{
                    type: i0.Output
                }], onSourceReorder: [{
                    type: i0.Output
                }], onTargetReorder: [{
                    type: i0.Output
                }], onSourceSelect: [{
                    type: i0.Output
                }], onTargetSelect: [{
                    type: i0.Output
                }], onSourceFilter: [{
                    type: i0.Output
                }], onTargetFilter: [{
                    type: i0.Output
                }], listViewSourceChild: [{
                    type: i0.ViewChild,
                    args: ['sourcelist']
                }], listViewTargetChild: [{
                    type: i0.ViewChild,
                    args: ['targetlist']
                }], sourceFilterViewChild: [{
                    type: i0.ViewChild,
                    args: ['sourceFilter']
                }], targetFilterViewChild: [{
                    type: i0.ViewChild,
                    args: ['targetFilter']
                }], templates: [{
                    type: i0.ContentChildren,
                    args: [i1.PrimeTemplate]
                }] } });
    var PickListModule = /** @class */ (function () {
        function PickListModule() {
        }
        return PickListModule;
    }());
    PickListModule.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0__namespace, type: PickListModule, deps: [], target: i0__namespace.ɵɵFactoryTarget.NgModule });
    PickListModule.ɵmod = i0__namespace.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0__namespace, type: PickListModule, declarations: [PickList], imports: [i3.CommonModule, i4.ButtonModule, i1.SharedModule, i5.RippleModule, i2.DragDropModule], exports: [PickList, i1.SharedModule, i2.DragDropModule] });
    PickListModule.ɵinj = i0__namespace.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0__namespace, type: PickListModule, imports: [[i3.CommonModule, i4.ButtonModule, i1.SharedModule, i5.RippleModule, i2.DragDropModule], i1.SharedModule, i2.DragDropModule] });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0__namespace, type: PickListModule, decorators: [{
                type: i0.NgModule,
                args: [{
                        imports: [i3.CommonModule, i4.ButtonModule, i1.SharedModule, i5.RippleModule, i2.DragDropModule],
                        exports: [PickList, i1.SharedModule, i2.DragDropModule],
                        declarations: [PickList]
                    }]
            }] });

    /**
     * Generated bundle index. Do not edit.
     */

    exports.PickList = PickList;
    exports.PickListModule = PickListModule;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=primeng-picklist.umd.js.map
