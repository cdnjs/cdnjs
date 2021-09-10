import * as i0 from '@angular/core';
import { Injectable, EventEmitter, Component, ChangeDetectionStrategy, ViewEncapsulation, Input, Output, ViewChild, ContentChildren, Directive, HostListener, Optional, NgModule } from '@angular/core';
import * as i4 from '@angular/common';
import { CommonModule } from '@angular/common';
import * as i9 from '@angular/forms';
import { FormsModule } from '@angular/forms';
import * as i1 from 'primeng/api';
import { FilterOperator, FilterMatchMode, PrimeTemplate, TranslationKeys, SharedModule } from 'primeng/api';
import * as i2 from 'primeng/paginator';
import { PaginatorModule } from 'primeng/paginator';
import * as i8 from 'primeng/inputtext';
import { InputTextModule } from 'primeng/inputtext';
import * as i11 from 'primeng/button';
import { ButtonModule } from 'primeng/button';
import { SelectButtonModule } from 'primeng/selectbutton';
import * as i6 from 'primeng/tristatecheckbox';
import { TriStateCheckboxModule } from 'primeng/tristatecheckbox';
import * as i7 from 'primeng/calendar';
import { CalendarModule } from 'primeng/calendar';
import * as i5 from 'primeng/inputnumber';
import { InputNumberModule } from 'primeng/inputnumber';
import * as i10 from 'primeng/dropdown';
import { DropdownModule } from 'primeng/dropdown';
import { DomHandler, ConnectedOverlayScrollHandler } from 'primeng/dom';
import { UniqueComponentId, ObjectUtils, ZIndexUtils } from 'primeng/utils';
import { Subject } from 'rxjs';
import * as i3 from '@angular/cdk/scrolling';
import { CdkVirtualScrollViewport, ScrollingModule } from '@angular/cdk/scrolling';
import { trigger, transition, style, animate } from '@angular/animations';

class TableService {
    constructor() {
        this.sortSource = new Subject();
        this.selectionSource = new Subject();
        this.contextMenuSource = new Subject();
        this.valueSource = new Subject();
        this.totalRecordsSource = new Subject();
        this.columnsSource = new Subject();
        this.resetSource = new Subject();
        this.sortSource$ = this.sortSource.asObservable();
        this.selectionSource$ = this.selectionSource.asObservable();
        this.contextMenuSource$ = this.contextMenuSource.asObservable();
        this.valueSource$ = this.valueSource.asObservable();
        this.totalRecordsSource$ = this.totalRecordsSource.asObservable();
        this.columnsSource$ = this.columnsSource.asObservable();
        this.resetSource$ = this.resetSource.asObservable();
    }
    onSort(sortMeta) {
        this.sortSource.next(sortMeta);
    }
    onSelectionChange() {
        this.selectionSource.next();
    }
    onResetChange() {
        this.resetSource.next();
    }
    onContextMenu(data) {
        this.contextMenuSource.next(data);
    }
    onValueChange(value) {
        this.valueSource.next(value);
    }
    onTotalRecordsChange(value) {
        this.totalRecordsSource.next(value);
    }
    onColumnsChange(columns) {
        this.columnsSource.next(columns);
    }
}
TableService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0, type: TableService, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
TableService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0, type: TableService });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0, type: TableService, decorators: [{
            type: Injectable
        }] });
class Table {
    constructor(el, zone, tableService, cd, filterService, overlayService) {
        this.el = el;
        this.zone = zone;
        this.tableService = tableService;
        this.cd = cd;
        this.filterService = filterService;
        this.overlayService = overlayService;
        this.pageLinks = 5;
        this.alwaysShowPaginator = true;
        this.paginatorPosition = 'bottom';
        this.paginatorDropdownScrollHeight = '200px';
        this.currentPageReportTemplate = '{currentPage} of {totalPages}';
        this.showFirstLastIcon = true;
        this.showPageLinks = true;
        this.defaultSortOrder = 1;
        this.sortMode = 'single';
        this.resetPageOnSort = true;
        this.selectionChange = new EventEmitter();
        this.contextMenuSelectionChange = new EventEmitter();
        this.contextMenuSelectionMode = "separate";
        this.rowTrackBy = (index, item) => item;
        this.lazy = false;
        this.lazyLoadOnInit = true;
        this.compareSelectionBy = 'deepEquals';
        this.csvSeparator = ',';
        this.exportFilename = 'download';
        this.filters = {};
        this.filterDelay = 300;
        this.expandedRowKeys = {};
        this.editingRowKeys = {};
        this.rowExpandMode = 'multiple';
        this.scrollDirection = "vertical";
        this.virtualScrollDelay = 250;
        this.virtualRowHeight = 28;
        this.columnResizeMode = 'fit';
        this.loadingIcon = 'pi pi-spinner';
        this.showLoader = true;
        this.showInitialSortBadge = true;
        this.stateStorage = 'session';
        this.editMode = 'cell';
        this.responsiveLayout = 'stack';
        this.breakpoint = '960px';
        this.onRowSelect = new EventEmitter();
        this.onRowUnselect = new EventEmitter();
        this.onPage = new EventEmitter();
        this.onSort = new EventEmitter();
        this.onFilter = new EventEmitter();
        this.onLazyLoad = new EventEmitter();
        this.onRowExpand = new EventEmitter();
        this.onRowCollapse = new EventEmitter();
        this.onContextMenuSelect = new EventEmitter();
        this.onColResize = new EventEmitter();
        this.onColReorder = new EventEmitter();
        this.onRowReorder = new EventEmitter();
        this.onEditInit = new EventEmitter();
        this.onEditComplete = new EventEmitter();
        this.onEditCancel = new EventEmitter();
        this.onHeaderCheckboxToggle = new EventEmitter();
        this.sortFunction = new EventEmitter();
        this.firstChange = new EventEmitter();
        this.rowsChange = new EventEmitter();
        this.onStateSave = new EventEmitter();
        this.onStateRestore = new EventEmitter();
        this._value = [];
        this._totalRecords = 0;
        this._first = 0;
        this.selectionKeys = {};
        this._sortOrder = 1;
        this.columnResizing = false;
        this.rowGroupHeaderStyleObject = {};
        this.id = UniqueComponentId();
    }
    ngOnInit() {
        if (this.lazy && this.lazyLoadOnInit) {
            if (!this.virtualScroll) {
                this.onLazyLoad.emit(this.createLazyLoadMetadata());
            }
            if (this.restoringFilter) {
                this.restoringFilter = false;
            }
        }
        if (this.responsiveLayout === 'stack' && !this.scrollable) {
            this.createResponsiveStyle();
        }
        this.initialized = true;
    }
    ngAfterContentInit() {
        this.templates.forEach((item) => {
            switch (item.getType()) {
                case 'caption':
                    this.captionTemplate = item.template;
                    break;
                case 'header':
                    this.headerTemplate = item.template;
                    break;
                case 'headergrouped':
                    this.headerGroupedTemplate = item.template;
                    break;
                case 'body':
                    this.bodyTemplate = item.template;
                    break;
                case 'loadingbody':
                    this.loadingBodyTemplate = item.template;
                    break;
                case 'footer':
                    this.footerTemplate = item.template;
                    break;
                case 'footergrouped':
                    this.footerGroupedTemplate = item.template;
                    break;
                case 'summary':
                    this.summaryTemplate = item.template;
                    break;
                case 'colgroup':
                    this.colGroupTemplate = item.template;
                    break;
                case 'rowexpansion':
                    this.expandedRowTemplate = item.template;
                    break;
                case 'groupheader':
                    this.groupHeaderTemplate = item.template;
                    break;
                case 'rowspan':
                    this.rowspanTemplate = item.template;
                    break;
                case 'groupfooter':
                    this.groupFooterTemplate = item.template;
                    break;
                case 'frozenrows':
                    this.frozenRowsTemplate = item.template;
                    break;
                case 'frozenheader':
                    this.frozenHeaderTemplate = item.template;
                    break;
                case 'frozenbody':
                    this.frozenBodyTemplate = item.template;
                    break;
                case 'frozenfooter':
                    this.frozenFooterTemplate = item.template;
                    break;
                case 'frozencolgroup':
                    this.frozenColGroupTemplate = item.template;
                    break;
                case 'frozenrowexpansion':
                    this.frozenExpandedRowTemplate = item.template;
                    break;
                case 'emptymessage':
                    this.emptyMessageTemplate = item.template;
                    break;
                case 'paginatorleft':
                    this.paginatorLeftTemplate = item.template;
                    break;
                case 'paginatorright':
                    this.paginatorRightTemplate = item.template;
                    break;
                case 'paginatordropdownitem':
                    this.paginatorDropdownItemTemplate = item.template;
                    break;
            }
        });
    }
    ngAfterViewInit() {
        if (this.isStateful() && this.resizableColumns) {
            this.restoreColumnWidths();
        }
        if (this.scrollable && (this.scrollDirection !== 'vertical' || this.rowGroupMode === 'subheader')) {
            this.updateScrollWidth();
        }
        if (this.scrollable && this.virtualScroll) {
            this.virtualScrollSubscription = this.virtualScrollBody.renderedRangeStream.subscribe(range => {
                let top = range.start * this.virtualRowHeight * -1;
                this.tableHeaderViewChild.nativeElement.style.top = top + 'px';
            });
        }
    }
    ngOnChanges(simpleChange) {
        if (simpleChange.value) {
            if (this.isStateful() && !this.stateRestored) {
                this.restoreState();
            }
            this._value = simpleChange.value.currentValue;
            if (!this.lazy) {
                this.totalRecords = (this._value ? this._value.length : 0);
                if (this.sortMode == 'single' && this.sortField)
                    this.sortSingle();
                else if (this.sortMode == 'multiple' && this.multiSortMeta)
                    this.sortMultiple();
                else if (this.hasFilter()) //sort already filters
                    this._filter();
            }
            this.tableService.onValueChange(simpleChange.value.currentValue);
            if (this.scrollable && (this.scrollDirection !== 'vertical' || this.rowGroupMode === 'subheader')) {
                this.updateScrollWidth();
            }
        }
        if (simpleChange.columns) {
            this._columns = simpleChange.columns.currentValue;
            this.tableService.onColumnsChange(simpleChange.columns.currentValue);
            if (this._columns && this.isStateful() && this.reorderableColumns && !this.columnOrderStateRestored) {
                this.restoreColumnOrder();
            }
            if (this.scrollable && (this.scrollDirection !== 'vertical' || this.rowGroupMode === 'subheader')) {
                this.updateScrollWidth();
            }
        }
        if (simpleChange.sortField) {
            this._sortField = simpleChange.sortField.currentValue;
            //avoid triggering lazy load prior to lazy initialization at onInit
            if (!this.lazy || this.initialized) {
                if (this.sortMode === 'single') {
                    this.sortSingle();
                }
            }
        }
        if (simpleChange.sortOrder) {
            this._sortOrder = simpleChange.sortOrder.currentValue;
            //avoid triggering lazy load prior to lazy initialization at onInit
            if (!this.lazy || this.initialized) {
                if (this.sortMode === 'single') {
                    this.sortSingle();
                }
            }
        }
        if (simpleChange.multiSortMeta) {
            this._multiSortMeta = simpleChange.multiSortMeta.currentValue;
            if (this.sortMode === 'multiple' && (this.initialized || (!this.lazy && !this.virtualScroll))) {
                this.sortMultiple();
            }
        }
        if (simpleChange.selection) {
            this._selection = simpleChange.selection.currentValue;
            if (!this.preventSelectionSetterPropagation) {
                this.updateSelectionKeys();
                this.tableService.onSelectionChange();
            }
            this.preventSelectionSetterPropagation = false;
        }
    }
    get value() {
        return this._value;
    }
    set value(val) {
        this._value = val;
    }
    get columns() {
        return this._columns;
    }
    set columns(cols) {
        this._columns = cols;
    }
    get first() {
        return this._first;
    }
    set first(val) {
        this._first = val;
    }
    get rows() {
        return this._rows;
    }
    set rows(val) {
        this._rows = val;
    }
    get totalRecords() {
        return this._totalRecords;
    }
    set totalRecords(val) {
        this._totalRecords = val;
        this.tableService.onTotalRecordsChange(this._totalRecords);
    }
    get sortField() {
        return this._sortField;
    }
    set sortField(val) {
        this._sortField = val;
    }
    get sortOrder() {
        return this._sortOrder;
    }
    set sortOrder(val) {
        this._sortOrder = val;
    }
    get multiSortMeta() {
        return this._multiSortMeta;
    }
    set multiSortMeta(val) {
        this._multiSortMeta = val;
    }
    get selection() {
        return this._selection;
    }
    set selection(val) {
        this._selection = val;
    }
    get dataToRender() {
        let data = this.filteredValue || this.value;
        return data ? ((this.paginator && !this.lazy) ? (data.slice(this.first, this.first + this.rows)) : data) : [];
    }
    updateSelectionKeys() {
        if (this.dataKey && this._selection) {
            this.selectionKeys = {};
            if (Array.isArray(this._selection)) {
                for (let data of this._selection) {
                    this.selectionKeys[String(ObjectUtils.resolveFieldData(data, this.dataKey))] = 1;
                }
            }
            else {
                this.selectionKeys[String(ObjectUtils.resolveFieldData(this._selection, this.dataKey))] = 1;
            }
        }
    }
    onPageChange(event) {
        this.first = event.first;
        this.rows = event.rows;
        if (this.lazy) {
            this.onLazyLoad.emit(this.createLazyLoadMetadata());
        }
        this.onPage.emit({
            first: this.first,
            rows: this.rows
        });
        this.firstChange.emit(this.first);
        this.rowsChange.emit(this.rows);
        this.tableService.onValueChange(this.value);
        if (this.isStateful()) {
            this.saveState();
        }
        this.anchorRowIndex = null;
        if (this.scrollable) {
            this.resetScrollTop();
        }
    }
    sort(event) {
        let originalEvent = event.originalEvent;
        if (this.sortMode === 'single') {
            this._sortOrder = (this.sortField === event.field) ? this.sortOrder * -1 : this.defaultSortOrder;
            this._sortField = event.field;
            if (this.resetPageOnSort) {
                this._first = 0;
                this.firstChange.emit(this._first);
                if (this.scrollable) {
                    this.resetScrollTop();
                }
            }
            this.sortSingle();
        }
        if (this.sortMode === 'multiple') {
            let metaKey = originalEvent.metaKey || originalEvent.ctrlKey;
            let sortMeta = this.getSortMeta(event.field);
            if (sortMeta) {
                if (!metaKey) {
                    this._multiSortMeta = [{ field: event.field, order: sortMeta.order * -1 }];
                    if (this.resetPageOnSort) {
                        this._first = 0;
                        this.firstChange.emit(this._first);
                        if (this.scrollable) {
                            this.resetScrollTop();
                        }
                    }
                }
                else {
                    sortMeta.order = sortMeta.order * -1;
                }
            }
            else {
                if (!metaKey || !this.multiSortMeta) {
                    this._multiSortMeta = [];
                    if (this.resetPageOnSort) {
                        this._first = 0;
                        this.firstChange.emit(this._first);
                    }
                }
                this._multiSortMeta.push({ field: event.field, order: this.defaultSortOrder });
            }
            this.sortMultiple();
        }
        if (this.isStateful()) {
            this.saveState();
        }
        this.anchorRowIndex = null;
    }
    sortSingle() {
        if (this.sortField && this.sortOrder) {
            if (this.restoringSort) {
                this.restoringSort = false;
            }
            if (this.lazy) {
                this.onLazyLoad.emit(this.createLazyLoadMetadata());
            }
            else if (this.value) {
                if (this.customSort) {
                    this.sortFunction.emit({
                        data: this.value,
                        mode: this.sortMode,
                        field: this.sortField,
                        order: this.sortOrder
                    });
                }
                else {
                    this.value.sort((data1, data2) => {
                        let value1 = ObjectUtils.resolveFieldData(data1, this.sortField);
                        let value2 = ObjectUtils.resolveFieldData(data2, this.sortField);
                        let result = null;
                        if (value1 == null && value2 != null)
                            result = -1;
                        else if (value1 != null && value2 == null)
                            result = 1;
                        else if (value1 == null && value2 == null)
                            result = 0;
                        else if (typeof value1 === 'string' && typeof value2 === 'string')
                            result = value1.localeCompare(value2);
                        else
                            result = (value1 < value2) ? -1 : (value1 > value2) ? 1 : 0;
                        return (this.sortOrder * result);
                    });
                    this._value = [...this.value];
                }
                if (this.hasFilter()) {
                    this._filter();
                }
            }
            let sortMeta = {
                field: this.sortField,
                order: this.sortOrder
            };
            this.onSort.emit(sortMeta);
            this.tableService.onSort(sortMeta);
        }
    }
    sortMultiple() {
        if (this.multiSortMeta) {
            if (this.lazy) {
                this.onLazyLoad.emit(this.createLazyLoadMetadata());
            }
            else if (this.value) {
                if (this.customSort) {
                    this.sortFunction.emit({
                        data: this.value,
                        mode: this.sortMode,
                        multiSortMeta: this.multiSortMeta
                    });
                }
                else {
                    this.value.sort((data1, data2) => {
                        return this.multisortField(data1, data2, this.multiSortMeta, 0);
                    });
                    this._value = [...this.value];
                }
                if (this.hasFilter()) {
                    this._filter();
                }
            }
            this.onSort.emit({
                multisortmeta: this.multiSortMeta
            });
            this.tableService.onSort(this.multiSortMeta);
        }
    }
    multisortField(data1, data2, multiSortMeta, index) {
        let value1 = ObjectUtils.resolveFieldData(data1, multiSortMeta[index].field);
        let value2 = ObjectUtils.resolveFieldData(data2, multiSortMeta[index].field);
        let result = null;
        if (value1 == null && value2 != null)
            result = -1;
        else if (value1 != null && value2 == null)
            result = 1;
        else if (value1 == null && value2 == null)
            result = 0;
        else if (typeof value1 == 'string' || value1 instanceof String) {
            if (value1.localeCompare && (value1 != value2)) {
                return (multiSortMeta[index].order * value1.localeCompare(value2));
            }
        }
        else {
            result = (value1 < value2) ? -1 : 1;
        }
        if (value1 == value2) {
            return (multiSortMeta.length - 1) > (index) ? (this.multisortField(data1, data2, multiSortMeta, index + 1)) : 0;
        }
        return (multiSortMeta[index].order * result);
    }
    getSortMeta(field) {
        if (this.multiSortMeta && this.multiSortMeta.length) {
            for (let i = 0; i < this.multiSortMeta.length; i++) {
                if (this.multiSortMeta[i].field === field) {
                    return this.multiSortMeta[i];
                }
            }
        }
        return null;
    }
    isSorted(field) {
        if (this.sortMode === 'single') {
            return (this.sortField && this.sortField === field);
        }
        else if (this.sortMode === 'multiple') {
            let sorted = false;
            if (this.multiSortMeta) {
                for (let i = 0; i < this.multiSortMeta.length; i++) {
                    if (this.multiSortMeta[i].field == field) {
                        sorted = true;
                        break;
                    }
                }
            }
            return sorted;
        }
    }
    handleRowClick(event) {
        let target = event.originalEvent.target;
        let targetNode = target.nodeName;
        let parentNode = target.parentElement && target.parentElement.nodeName;
        if (targetNode == 'INPUT' || targetNode == 'BUTTON' || targetNode == 'A' ||
            parentNode == 'INPUT' || parentNode == 'BUTTON' || parentNode == 'A' ||
            (DomHandler.hasClass(event.originalEvent.target, 'p-clickable'))) {
            return;
        }
        if (this.selectionMode) {
            this.preventSelectionSetterPropagation = true;
            if (this.isMultipleSelectionMode() && event.originalEvent.shiftKey && this.anchorRowIndex != null) {
                DomHandler.clearSelection();
                if (this.rangeRowIndex != null) {
                    this.clearSelectionRange(event.originalEvent);
                }
                this.rangeRowIndex = event.rowIndex;
                this.selectRange(event.originalEvent, event.rowIndex);
            }
            else {
                let rowData = event.rowData;
                let selected = this.isSelected(rowData);
                let metaSelection = this.rowTouched ? false : this.metaKeySelection;
                let dataKeyValue = this.dataKey ? String(ObjectUtils.resolveFieldData(rowData, this.dataKey)) : null;
                this.anchorRowIndex = event.rowIndex;
                this.rangeRowIndex = event.rowIndex;
                if (metaSelection) {
                    let metaKey = event.originalEvent.metaKey || event.originalEvent.ctrlKey;
                    if (selected && metaKey) {
                        if (this.isSingleSelectionMode()) {
                            this._selection = null;
                            this.selectionKeys = {};
                            this.selectionChange.emit(null);
                        }
                        else {
                            let selectionIndex = this.findIndexInSelection(rowData);
                            this._selection = this.selection.filter((val, i) => i != selectionIndex);
                            this.selectionChange.emit(this.selection);
                            if (dataKeyValue) {
                                delete this.selectionKeys[dataKeyValue];
                            }
                        }
                        this.onRowUnselect.emit({ originalEvent: event.originalEvent, data: rowData, type: 'row' });
                    }
                    else {
                        if (this.isSingleSelectionMode()) {
                            this._selection = rowData;
                            this.selectionChange.emit(rowData);
                            if (dataKeyValue) {
                                this.selectionKeys = {};
                                this.selectionKeys[dataKeyValue] = 1;
                            }
                        }
                        else if (this.isMultipleSelectionMode()) {
                            if (metaKey) {
                                this._selection = this.selection || [];
                            }
                            else {
                                this._selection = [];
                                this.selectionKeys = {};
                            }
                            this._selection = [...this.selection, rowData];
                            this.selectionChange.emit(this.selection);
                            if (dataKeyValue) {
                                this.selectionKeys[dataKeyValue] = 1;
                            }
                        }
                        this.onRowSelect.emit({ originalEvent: event.originalEvent, data: rowData, type: 'row', index: event.rowIndex });
                    }
                }
                else {
                    if (this.selectionMode === 'single') {
                        if (selected) {
                            this._selection = null;
                            this.selectionKeys = {};
                            this.selectionChange.emit(this.selection);
                            this.onRowUnselect.emit({ originalEvent: event.originalEvent, data: rowData, type: 'row', index: event.rowIndex });
                        }
                        else {
                            this._selection = rowData;
                            this.selectionChange.emit(this.selection);
                            this.onRowSelect.emit({ originalEvent: event.originalEvent, data: rowData, type: 'row', index: event.rowIndex });
                            if (dataKeyValue) {
                                this.selectionKeys = {};
                                this.selectionKeys[dataKeyValue] = 1;
                            }
                        }
                    }
                    else if (this.selectionMode === 'multiple') {
                        if (selected) {
                            let selectionIndex = this.findIndexInSelection(rowData);
                            this._selection = this.selection.filter((val, i) => i != selectionIndex);
                            this.selectionChange.emit(this.selection);
                            this.onRowUnselect.emit({ originalEvent: event.originalEvent, data: rowData, type: 'row', index: event.rowIndex });
                            if (dataKeyValue) {
                                delete this.selectionKeys[dataKeyValue];
                            }
                        }
                        else {
                            this._selection = this.selection ? [...this.selection, rowData] : [rowData];
                            this.selectionChange.emit(this.selection);
                            this.onRowSelect.emit({ originalEvent: event.originalEvent, data: rowData, type: 'row', index: event.rowIndex });
                            if (dataKeyValue) {
                                this.selectionKeys[dataKeyValue] = 1;
                            }
                        }
                    }
                }
            }
            this.tableService.onSelectionChange();
            if (this.isStateful()) {
                this.saveState();
            }
        }
        this.rowTouched = false;
    }
    handleRowTouchEnd(event) {
        this.rowTouched = true;
    }
    handleRowRightClick(event) {
        if (this.contextMenu) {
            const rowData = event.rowData;
            if (this.contextMenuSelectionMode === 'separate') {
                this.contextMenuSelection = rowData;
                this.contextMenuSelectionChange.emit(rowData);
                this.onContextMenuSelect.emit({ originalEvent: event.originalEvent, data: rowData, index: event.rowIndex });
                this.contextMenu.show(event.originalEvent);
                this.tableService.onContextMenu(rowData);
            }
            else if (this.contextMenuSelectionMode === 'joint') {
                this.preventSelectionSetterPropagation = true;
                let selected = this.isSelected(rowData);
                let dataKeyValue = this.dataKey ? String(ObjectUtils.resolveFieldData(rowData, this.dataKey)) : null;
                if (!selected) {
                    if (this.isSingleSelectionMode()) {
                        this.selection = rowData;
                        this.selectionChange.emit(rowData);
                        if (dataKeyValue) {
                            this.selectionKeys = {};
                            this.selectionKeys[dataKeyValue] = 1;
                        }
                    }
                    else if (this.isMultipleSelectionMode()) {
                        this._selection = this.selection ? [...this.selection, rowData] : [rowData];
                        this.selectionChange.emit(this.selection);
                        if (dataKeyValue) {
                            this.selectionKeys[dataKeyValue] = 1;
                        }
                    }
                }
                this.tableService.onSelectionChange();
                this.contextMenu.show(event.originalEvent);
                this.onContextMenuSelect.emit({ originalEvent: event, data: rowData, index: event.rowIndex });
            }
        }
    }
    selectRange(event, rowIndex) {
        let rangeStart, rangeEnd;
        if (this.anchorRowIndex > rowIndex) {
            rangeStart = rowIndex;
            rangeEnd = this.anchorRowIndex;
        }
        else if (this.anchorRowIndex < rowIndex) {
            rangeStart = this.anchorRowIndex;
            rangeEnd = rowIndex;
        }
        else {
            rangeStart = rowIndex;
            rangeEnd = rowIndex;
        }
        if (this.lazy && this.paginator) {
            rangeStart -= this.first;
            rangeEnd -= this.first;
        }
        let rangeRowsData = [];
        for (let i = rangeStart; i <= rangeEnd; i++) {
            let rangeRowData = this.filteredValue ? this.filteredValue[i] : this.value[i];
            if (!this.isSelected(rangeRowData)) {
                rangeRowsData.push(rangeRowData);
                this._selection = [...this.selection, rangeRowData];
                let dataKeyValue = this.dataKey ? String(ObjectUtils.resolveFieldData(rangeRowData, this.dataKey)) : null;
                if (dataKeyValue) {
                    this.selectionKeys[dataKeyValue] = 1;
                }
            }
        }
        this.selectionChange.emit(this.selection);
        this.onRowSelect.emit({ originalEvent: event, data: rangeRowsData, type: 'row' });
    }
    clearSelectionRange(event) {
        let rangeStart, rangeEnd;
        if (this.rangeRowIndex > this.anchorRowIndex) {
            rangeStart = this.anchorRowIndex;
            rangeEnd = this.rangeRowIndex;
        }
        else if (this.rangeRowIndex < this.anchorRowIndex) {
            rangeStart = this.rangeRowIndex;
            rangeEnd = this.anchorRowIndex;
        }
        else {
            rangeStart = this.rangeRowIndex;
            rangeEnd = this.rangeRowIndex;
        }
        for (let i = rangeStart; i <= rangeEnd; i++) {
            let rangeRowData = this.value[i];
            let selectionIndex = this.findIndexInSelection(rangeRowData);
            this._selection = this.selection.filter((val, i) => i != selectionIndex);
            let dataKeyValue = this.dataKey ? String(ObjectUtils.resolveFieldData(rangeRowData, this.dataKey)) : null;
            if (dataKeyValue) {
                delete this.selectionKeys[dataKeyValue];
            }
            this.onRowUnselect.emit({ originalEvent: event, data: rangeRowData, type: 'row' });
        }
    }
    isSelected(rowData) {
        if (rowData && this.selection) {
            if (this.dataKey) {
                return this.selectionKeys[ObjectUtils.resolveFieldData(rowData, this.dataKey)] !== undefined;
            }
            else {
                if (this.selection instanceof Array)
                    return this.findIndexInSelection(rowData) > -1;
                else
                    return this.equals(rowData, this.selection);
            }
        }
        return false;
    }
    findIndexInSelection(rowData) {
        let index = -1;
        if (this.selection && this.selection.length) {
            for (let i = 0; i < this.selection.length; i++) {
                if (this.equals(rowData, this.selection[i])) {
                    index = i;
                    break;
                }
            }
        }
        return index;
    }
    toggleRowWithRadio(event, rowData) {
        this.preventSelectionSetterPropagation = true;
        if (this.selection != rowData) {
            this._selection = rowData;
            this.selectionChange.emit(this.selection);
            this.onRowSelect.emit({ originalEvent: event.originalEvent, index: event.rowIndex, data: rowData, type: 'radiobutton' });
            if (this.dataKey) {
                this.selectionKeys = {};
                this.selectionKeys[String(ObjectUtils.resolveFieldData(rowData, this.dataKey))] = 1;
            }
        }
        else {
            this._selection = null;
            this.selectionChange.emit(this.selection);
            this.onRowUnselect.emit({ originalEvent: event.originalEvent, index: event.rowIndex, data: rowData, type: 'radiobutton' });
        }
        this.tableService.onSelectionChange();
        if (this.isStateful()) {
            this.saveState();
        }
    }
    toggleRowWithCheckbox(event, rowData) {
        this.selection = this.selection || [];
        let selected = this.isSelected(rowData);
        let dataKeyValue = this.dataKey ? String(ObjectUtils.resolveFieldData(rowData, this.dataKey)) : null;
        this.preventSelectionSetterPropagation = true;
        if (selected) {
            let selectionIndex = this.findIndexInSelection(rowData);
            this._selection = this.selection.filter((val, i) => i != selectionIndex);
            this.selectionChange.emit(this.selection);
            this.onRowUnselect.emit({ originalEvent: event.originalEvent, index: event.rowIndex, data: rowData, type: 'checkbox' });
            if (dataKeyValue) {
                delete this.selectionKeys[dataKeyValue];
            }
        }
        else {
            this._selection = this.selection ? [...this.selection, rowData] : [rowData];
            this.selectionChange.emit(this.selection);
            this.onRowSelect.emit({ originalEvent: event.originalEvent, index: event.rowIndex, data: rowData, type: 'checkbox' });
            if (dataKeyValue) {
                this.selectionKeys[dataKeyValue] = 1;
            }
        }
        this.tableService.onSelectionChange();
        if (this.isStateful()) {
            this.saveState();
        }
    }
    toggleRowsWithCheckbox(event, check) {
        this._selection = check ? this.filteredValue ? this.filteredValue.slice() : this.value.slice() : [];
        this.preventSelectionSetterPropagation = true;
        this.updateSelectionKeys();
        this.selectionChange.emit(this._selection);
        this.tableService.onSelectionChange();
        this.onHeaderCheckboxToggle.emit({ originalEvent: event, checked: check });
        if (this.isStateful()) {
            this.saveState();
        }
    }
    equals(data1, data2) {
        return this.compareSelectionBy === 'equals' ? (data1 === data2) : ObjectUtils.equals(data1, data2, this.dataKey);
    }
    /* Legacy Filtering for custom elements */
    filter(value, field, matchMode) {
        if (this.filterTimeout) {
            clearTimeout(this.filterTimeout);
        }
        if (!this.isFilterBlank(value)) {
            this.filters[field] = { value: value, matchMode: matchMode };
        }
        else if (this.filters[field]) {
            delete this.filters[field];
        }
        this.filterTimeout = setTimeout(() => {
            this._filter();
            this.filterTimeout = null;
        }, this.filterDelay);
        this.anchorRowIndex = null;
    }
    filterGlobal(value, matchMode) {
        this.filter(value, 'global', matchMode);
    }
    isFilterBlank(filter) {
        if (filter !== null && filter !== undefined) {
            if ((typeof filter === 'string' && filter.trim().length == 0) || (filter instanceof Array && filter.length == 0))
                return true;
            else
                return false;
        }
        return true;
    }
    _filter() {
        if (!this.restoringFilter) {
            this.first = 0;
            this.firstChange.emit(this.first);
        }
        if (this.lazy) {
            this.onLazyLoad.emit(this.createLazyLoadMetadata());
        }
        else {
            if (!this.value) {
                return;
            }
            if (!this.hasFilter()) {
                this.filteredValue = null;
                if (this.paginator) {
                    this.totalRecords = this.value ? this.value.length : 0;
                }
            }
            else {
                let globalFilterFieldsArray;
                if (this.filters['global']) {
                    if (!this.columns && !this.globalFilterFields)
                        throw new Error('Global filtering requires dynamic columns or globalFilterFields to be defined.');
                    else
                        globalFilterFieldsArray = this.globalFilterFields || this.columns;
                }
                this.filteredValue = [];
                for (let i = 0; i < this.value.length; i++) {
                    let localMatch = true;
                    let globalMatch = false;
                    let localFiltered = false;
                    for (let prop in this.filters) {
                        if (this.filters.hasOwnProperty(prop) && prop !== 'global') {
                            localFiltered = true;
                            let filterField = prop;
                            let filterMeta = this.filters[filterField];
                            if (Array.isArray(filterMeta)) {
                                for (let meta of filterMeta) {
                                    localMatch = this.executeLocalFilter(filterField, this.value[i], meta);
                                    if ((meta.operator === FilterOperator.OR && localMatch) || (meta.operator === FilterOperator.AND && !localMatch)) {
                                        break;
                                    }
                                }
                            }
                            else {
                                localMatch = this.executeLocalFilter(filterField, this.value[i], filterMeta);
                            }
                            if (!localMatch) {
                                break;
                            }
                        }
                    }
                    if (this.filters['global'] && !globalMatch && globalFilterFieldsArray) {
                        for (let j = 0; j < globalFilterFieldsArray.length; j++) {
                            let globalFilterField = globalFilterFieldsArray[j].field || globalFilterFieldsArray[j];
                            globalMatch = this.filterService.filters[this.filters['global'].matchMode](ObjectUtils.resolveFieldData(this.value[i], globalFilterField), this.filters['global'].value, this.filterLocale);
                            if (globalMatch) {
                                break;
                            }
                        }
                    }
                    let matches;
                    if (this.filters['global']) {
                        matches = localFiltered ? (localFiltered && localMatch && globalMatch) : globalMatch;
                    }
                    else {
                        matches = localFiltered && localMatch;
                    }
                    if (matches) {
                        this.filteredValue.push(this.value[i]);
                    }
                }
                if (this.filteredValue.length === this.value.length) {
                    this.filteredValue = null;
                }
                if (this.paginator) {
                    this.totalRecords = this.filteredValue ? this.filteredValue.length : this.value ? this.value.length : 0;
                }
            }
        }
        this.onFilter.emit({
            filters: this.filters,
            filteredValue: this.filteredValue || this.value
        });
        this.tableService.onValueChange(this.value);
        if (this.isStateful() && !this.restoringFilter) {
            this.saveState();
        }
        if (this.restoringFilter) {
            this.restoringFilter = false;
        }
        this.cd.markForCheck();
        if (this.scrollable) {
            this.resetScrollTop();
        }
    }
    executeLocalFilter(field, rowData, filterMeta) {
        let filterValue = filterMeta.value;
        let filterMatchMode = filterMeta.matchMode || FilterMatchMode.STARTS_WITH;
        let dataFieldValue = ObjectUtils.resolveFieldData(rowData, field);
        let filterConstraint = this.filterService.filters[filterMatchMode];
        return filterConstraint(dataFieldValue, filterValue, this.filterLocale);
    }
    hasFilter() {
        let empty = true;
        for (let prop in this.filters) {
            if (this.filters.hasOwnProperty(prop)) {
                empty = false;
                break;
            }
        }
        return !empty;
    }
    createLazyLoadMetadata() {
        return {
            first: this.first,
            rows: this.rows,
            sortField: this.sortField,
            sortOrder: this.sortOrder,
            filters: this.filters,
            globalFilter: this.filters && this.filters['global'] ? this.filters['global'].value : null,
            multiSortMeta: this.multiSortMeta
        };
    }
    clear() {
        this._sortField = null;
        this._sortOrder = this.defaultSortOrder;
        this._multiSortMeta = null;
        this.tableService.onSort(null);
        this.filteredValue = null;
        this.tableService.onResetChange();
        this.first = 0;
        this.firstChange.emit(this.first);
        if (this.lazy) {
            this.onLazyLoad.emit(this.createLazyLoadMetadata());
        }
        else {
            this.totalRecords = (this._value ? this._value.length : 0);
        }
    }
    reset() {
        this.clear();
    }
    exportCSV(options) {
        let data;
        let csv = '';
        let columns = this.frozenColumns ? [...this.frozenColumns, ...this.columns] : this.columns;
        if (options && options.selectionOnly) {
            data = this.selection || [];
        }
        else {
            data = this.filteredValue || this.value;
            if (this.frozenValue) {
                data = data ? [...this.frozenValue, ...data] : this.frozenValue;
            }
        }
        //headers
        for (let i = 0; i < columns.length; i++) {
            let column = columns[i];
            if (column.exportable !== false && column.field) {
                csv += '"' + (column.header || column.field) + '"';
                if (i < (columns.length - 1)) {
                    csv += this.csvSeparator;
                }
            }
        }
        //body
        data.forEach((record, i) => {
            csv += '\n';
            for (let i = 0; i < columns.length; i++) {
                let column = columns[i];
                if (column.exportable !== false && column.field) {
                    let cellData = ObjectUtils.resolveFieldData(record, column.field);
                    if (cellData != null) {
                        if (this.exportFunction) {
                            cellData = this.exportFunction({
                                data: cellData,
                                field: column.field
                            });
                        }
                        else
                            cellData = String(cellData).replace(/"/g, '""');
                    }
                    else
                        cellData = '';
                    csv += '"' + cellData + '"';
                    if (i < (columns.length - 1)) {
                        csv += this.csvSeparator;
                    }
                }
            }
        });
        let blob = new Blob([csv], {
            type: 'text/csv;charset=utf-8;'
        });
        if (window.navigator.msSaveOrOpenBlob) {
            navigator.msSaveOrOpenBlob(blob, this.exportFilename + '.csv');
        }
        else {
            let link = document.createElement("a");
            link.style.display = 'none';
            document.body.appendChild(link);
            if (link.download !== undefined) {
                link.setAttribute('href', URL.createObjectURL(blob));
                link.setAttribute('download', this.exportFilename + '.csv');
                link.click();
            }
            else {
                csv = 'data:text/csv;charset=utf-8,' + csv;
                window.open(encodeURI(csv));
            }
            document.body.removeChild(link);
        }
    }
    resetScrollTop() {
        if (this.virtualScroll)
            this.scrollToVirtualIndex(0);
        else
            this.scrollTo({ top: 0 });
    }
    scrollToVirtualIndex(index) {
        if (this.virtualScrollBody) {
            this.virtualScrollBody.scrollToIndex(index);
        }
    }
    onScrollIndexChange(index) {
        if (this.lazy) {
            if (this.virtualScrollTimeout) {
                clearTimeout(this.virtualScrollTimeout);
            }
            this.virtualScrollTimeout = setTimeout(() => {
                let page = Math.floor(index / this.rows);
                let virtualScrollOffset = page === 0 ? 0 : (page - 1) * this.rows;
                let virtualScrollChunkSize = page === 0 ? this.rows * 2 : this.rows * 3;
                if (page !== this.virtualPage) {
                    this.virtualPage = page;
                    this.onLazyLoad.emit({
                        first: virtualScrollOffset,
                        rows: virtualScrollChunkSize,
                        sortField: this.sortField,
                        sortOrder: this.sortOrder,
                        filters: this.filters,
                        globalFilter: this.filters && this.filters['global'] ? this.filters['global'].value : null,
                        multiSortMeta: this.multiSortMeta
                    });
                }
            }, this.virtualScrollDelay);
        }
    }
    scrollTo(options) {
        if (this.virtualScrollBody) {
            this.virtualScrollBody.scrollTo(options);
        }
        else {
            if (this.wrapperViewChild.nativeElement.scrollTo) {
                this.wrapperViewChild.nativeElement.scrollTo(options);
            }
            else {
                this.wrapperViewChild.nativeElement.scrollLeft = options.left;
                this.wrapperViewChild.nativeElement.scrollTop = options.top;
            }
        }
    }
    updateEditingCell(cell, data, field, index) {
        this.editingCell = cell;
        this.editingCellData = data;
        this.editingCellField = field;
        this.editingCellRowIndex = index;
        this.bindDocumentEditListener();
    }
    isEditingCellValid() {
        return (this.editingCell && DomHandler.find(this.editingCell, '.ng-invalid.ng-dirty').length === 0);
    }
    bindDocumentEditListener() {
        if (!this.documentEditListener) {
            this.documentEditListener = (event) => {
                if (this.editingCell && !this.selfClick && this.isEditingCellValid()) {
                    DomHandler.removeClass(this.editingCell, 'p-cell-editing');
                    this.editingCell = null;
                    this.onEditComplete.emit({ field: this.editingCellField, data: this.editingCellData, originalEvent: event, index: this.editingCellRowIndex });
                    this.editingCellField = null;
                    this.editingCellData = null;
                    this.editingCellRowIndex = null;
                    this.unbindDocumentEditListener();
                    this.cd.markForCheck();
                    if (this.overlaySubscription) {
                        this.overlaySubscription.unsubscribe();
                    }
                }
                this.selfClick = false;
            };
            document.addEventListener('click', this.documentEditListener);
        }
    }
    unbindDocumentEditListener() {
        if (this.documentEditListener) {
            document.removeEventListener('click', this.documentEditListener);
            this.documentEditListener = null;
        }
    }
    initRowEdit(rowData) {
        let dataKeyValue = String(ObjectUtils.resolveFieldData(rowData, this.dataKey));
        this.editingRowKeys[dataKeyValue] = true;
    }
    saveRowEdit(rowData, rowElement) {
        if (DomHandler.find(rowElement, '.ng-invalid.ng-dirty').length === 0) {
            let dataKeyValue = String(ObjectUtils.resolveFieldData(rowData, this.dataKey));
            delete this.editingRowKeys[dataKeyValue];
        }
    }
    cancelRowEdit(rowData) {
        let dataKeyValue = String(ObjectUtils.resolveFieldData(rowData, this.dataKey));
        delete this.editingRowKeys[dataKeyValue];
    }
    toggleRow(rowData, event) {
        if (!this.dataKey) {
            throw new Error('dataKey must be defined to use row expansion');
        }
        let dataKeyValue = String(ObjectUtils.resolveFieldData(rowData, this.dataKey));
        if (this.expandedRowKeys[dataKeyValue] != null) {
            delete this.expandedRowKeys[dataKeyValue];
            this.onRowCollapse.emit({
                originalEvent: event,
                data: rowData
            });
        }
        else {
            if (this.rowExpandMode === 'single') {
                this.expandedRowKeys = {};
            }
            this.expandedRowKeys[dataKeyValue] = true;
            this.onRowExpand.emit({
                originalEvent: event,
                data: rowData
            });
        }
        if (event) {
            event.preventDefault();
        }
        if (this.isStateful()) {
            this.saveState();
        }
    }
    isRowExpanded(rowData) {
        return this.expandedRowKeys[String(ObjectUtils.resolveFieldData(rowData, this.dataKey))] === true;
    }
    isRowEditing(rowData) {
        return this.editingRowKeys[String(ObjectUtils.resolveFieldData(rowData, this.dataKey))] === true;
    }
    isSingleSelectionMode() {
        return this.selectionMode === 'single';
    }
    isMultipleSelectionMode() {
        return this.selectionMode === 'multiple';
    }
    onColumnResizeBegin(event) {
        let containerLeft = DomHandler.getOffset(this.containerViewChild.nativeElement).left;
        this.resizeColumnElement = event.target.parentElement;
        this.columnResizing = true;
        this.lastResizerHelperX = (event.pageX - containerLeft + this.containerViewChild.nativeElement.scrollLeft);
        this.onColumnResize(event);
        event.preventDefault();
    }
    onColumnResize(event) {
        let containerLeft = DomHandler.getOffset(this.containerViewChild.nativeElement).left;
        DomHandler.addClass(this.containerViewChild.nativeElement, 'p-unselectable-text');
        this.resizeHelperViewChild.nativeElement.style.height = this.containerViewChild.nativeElement.offsetHeight + 'px';
        this.resizeHelperViewChild.nativeElement.style.top = 0 + 'px';
        this.resizeHelperViewChild.nativeElement.style.left = (event.pageX - containerLeft + this.containerViewChild.nativeElement.scrollLeft) + 'px';
        this.resizeHelperViewChild.nativeElement.style.display = 'block';
    }
    onColumnResizeEnd() {
        let delta = this.resizeHelperViewChild.nativeElement.offsetLeft - this.lastResizerHelperX;
        let columnWidth = this.resizeColumnElement.offsetWidth;
        let newColumnWidth = columnWidth + delta;
        let minWidth = this.resizeColumnElement.style.minWidth || 15;
        if (newColumnWidth >= minWidth) {
            if (this.columnResizeMode === 'fit') {
                let nextColumn = this.resizeColumnElement.nextElementSibling;
                let nextColumnWidth = nextColumn.offsetWidth - delta;
                if (newColumnWidth > 15 && nextColumnWidth > 15) {
                    if (!this.scrollable) {
                        this.resizeColumnElement.style.width = newColumnWidth + 'px';
                        if (nextColumn) {
                            nextColumn.style.width = nextColumnWidth + 'px';
                        }
                    }
                    else {
                        this.resizeTableCells(newColumnWidth, nextColumnWidth);
                    }
                }
            }
            else if (this.columnResizeMode === 'expand') {
                let tableWidth = this.tableViewChild.nativeElement.offsetWidth + delta;
                if (!this.scrollable) {
                    this.tableViewChild.nativeElement.style.width = tableWidth + 'px';
                    this.resizeColumnElement.style.width = newColumnWidth + 'px';
                }
                else {
                    this.resizeTableCells(newColumnWidth, null);
                    let scrollbarWidth = DomHandler.calculateScrollbarWidth(this.wrapperViewChild.nativeElement);
                    let isWrapperInViewport = this.containerViewChild.nativeElement.offsetWidth > tableWidth + scrollbarWidth;
                    this.tableViewChild.nativeElement.style.width = tableWidth + 'px';
                    this.wrapperViewChild.nativeElement.style.width = isWrapperInViewport ? tableWidth + scrollbarWidth + 'px' : 'auto';
                }
            }
            this.onColResize.emit({
                element: this.resizeColumnElement,
                delta: delta
            });
            if (this.isStateful()) {
                this.saveState();
            }
        }
        this.resizeHelperViewChild.nativeElement.style.display = 'none';
        DomHandler.removeClass(this.containerViewChild.nativeElement, 'p-unselectable-text');
    }
    resizeTableCells(newColumnWidth, nextColumnWidth) {
        let colIndex = DomHandler.index(this.resizeColumnElement);
        let widths = [];
        let headers = DomHandler.find(this.containerViewChild.nativeElement, '.p-datatable-thead > tr > th');
        headers.forEach(header => widths.push(DomHandler.getOuterWidth(header)));
        this.destroyStyleElement();
        this.createStyleElement();
        let innerHTML = '';
        widths.forEach((width, index) => {
            let colWidth = index === colIndex ? newColumnWidth : (nextColumnWidth && index === colIndex + 1) ? nextColumnWidth : width;
            innerHTML += `
                #${this.id} .p-datatable-thead > tr > th:nth-child(${index + 1}) {
                    flex: 0 0 ${colWidth}px !important;
                }

                #${this.id} .p-datatable-tbody > tr > td:nth-child(${index + 1}) {
                    flex: 0 0 ${colWidth}px !important;
                }
            `;
        });
        this.styleElement.innerHTML = innerHTML;
    }
    onColumnDragStart(event, columnElement) {
        this.reorderIconWidth = DomHandler.getHiddenElementOuterWidth(this.reorderIndicatorUpViewChild.nativeElement);
        this.reorderIconHeight = DomHandler.getHiddenElementOuterHeight(this.reorderIndicatorDownViewChild.nativeElement);
        this.draggedColumn = columnElement;
        event.dataTransfer.setData('text', 'b'); // For firefox
    }
    onColumnDragEnter(event, dropHeader) {
        if (this.reorderableColumns && this.draggedColumn && dropHeader) {
            event.preventDefault();
            let containerOffset = DomHandler.getOffset(this.containerViewChild.nativeElement);
            let dropHeaderOffset = DomHandler.getOffset(dropHeader);
            if (this.draggedColumn != dropHeader) {
                let dragIndex = DomHandler.indexWithinGroup(this.draggedColumn, 'preorderablecolumn');
                let dropIndex = DomHandler.indexWithinGroup(dropHeader, 'preorderablecolumn');
                let targetLeft = dropHeaderOffset.left - containerOffset.left;
                let targetTop = containerOffset.top - dropHeaderOffset.top;
                let columnCenter = dropHeaderOffset.left + dropHeader.offsetWidth / 2;
                this.reorderIndicatorUpViewChild.nativeElement.style.top = dropHeaderOffset.top - containerOffset.top - (this.reorderIconHeight - 1) + 'px';
                this.reorderIndicatorDownViewChild.nativeElement.style.top = dropHeaderOffset.top - containerOffset.top + dropHeader.offsetHeight + 'px';
                if (event.pageX > columnCenter) {
                    this.reorderIndicatorUpViewChild.nativeElement.style.left = (targetLeft + dropHeader.offsetWidth - Math.ceil(this.reorderIconWidth / 2)) + 'px';
                    this.reorderIndicatorDownViewChild.nativeElement.style.left = (targetLeft + dropHeader.offsetWidth - Math.ceil(this.reorderIconWidth / 2)) + 'px';
                    this.dropPosition = 1;
                }
                else {
                    this.reorderIndicatorUpViewChild.nativeElement.style.left = (targetLeft - Math.ceil(this.reorderIconWidth / 2)) + 'px';
                    this.reorderIndicatorDownViewChild.nativeElement.style.left = (targetLeft - Math.ceil(this.reorderIconWidth / 2)) + 'px';
                    this.dropPosition = -1;
                }
                if ((dropIndex - dragIndex === 1 && this.dropPosition === -1) || (dropIndex - dragIndex === -1 && this.dropPosition === 1)) {
                    this.reorderIndicatorUpViewChild.nativeElement.style.display = 'none';
                    this.reorderIndicatorDownViewChild.nativeElement.style.display = 'none';
                }
                else {
                    this.reorderIndicatorUpViewChild.nativeElement.style.display = 'block';
                    this.reorderIndicatorDownViewChild.nativeElement.style.display = 'block';
                }
            }
            else {
                event.dataTransfer.dropEffect = 'none';
            }
        }
    }
    onColumnDragLeave(event) {
        if (this.reorderableColumns && this.draggedColumn) {
            event.preventDefault();
            this.reorderIndicatorUpViewChild.nativeElement.style.display = 'none';
            this.reorderIndicatorDownViewChild.nativeElement.style.display = 'none';
        }
    }
    onColumnDrop(event, dropColumn) {
        event.preventDefault();
        if (this.draggedColumn) {
            let dragIndex = DomHandler.indexWithinGroup(this.draggedColumn, 'preorderablecolumn');
            let dropIndex = DomHandler.indexWithinGroup(dropColumn, 'preorderablecolumn');
            let allowDrop = (dragIndex != dropIndex);
            if (allowDrop && ((dropIndex - dragIndex == 1 && this.dropPosition === -1) || (dragIndex - dropIndex == 1 && this.dropPosition === 1))) {
                allowDrop = false;
            }
            if (allowDrop && ((dropIndex < dragIndex && this.dropPosition === 1))) {
                dropIndex = dropIndex + 1;
            }
            if (allowDrop && ((dropIndex > dragIndex && this.dropPosition === -1))) {
                dropIndex = dropIndex - 1;
            }
            if (allowDrop) {
                ObjectUtils.reorderArray(this.columns, dragIndex, dropIndex);
                this.onColReorder.emit({
                    dragIndex: dragIndex,
                    dropIndex: dropIndex,
                    columns: this.columns
                });
                if (this.isStateful()) {
                    this.zone.runOutsideAngular(() => {
                        setTimeout(() => {
                            this.saveState();
                        });
                    });
                }
            }
            this.reorderIndicatorUpViewChild.nativeElement.style.display = 'none';
            this.reorderIndicatorDownViewChild.nativeElement.style.display = 'none';
            this.draggedColumn.draggable = false;
            this.draggedColumn = null;
            this.dropPosition = null;
        }
    }
    onRowDragStart(event, index) {
        this.rowDragging = true;
        this.draggedRowIndex = index;
        event.dataTransfer.setData('text', 'b'); // For firefox
    }
    onRowDragOver(event, index, rowElement) {
        if (this.rowDragging && this.draggedRowIndex !== index) {
            let rowY = DomHandler.getOffset(rowElement).top + DomHandler.getWindowScrollTop();
            let pageY = event.pageY;
            let rowMidY = rowY + DomHandler.getOuterHeight(rowElement) / 2;
            let prevRowElement = rowElement.previousElementSibling;
            if (pageY < rowMidY) {
                DomHandler.removeClass(rowElement, 'p-datatable-dragpoint-bottom');
                this.droppedRowIndex = index;
                if (prevRowElement)
                    DomHandler.addClass(prevRowElement, 'p-datatable-dragpoint-bottom');
                else
                    DomHandler.addClass(rowElement, 'p-datatable-dragpoint-top');
            }
            else {
                if (prevRowElement)
                    DomHandler.removeClass(prevRowElement, 'p-datatable-dragpoint-bottom');
                else
                    DomHandler.addClass(rowElement, 'p-datatable-dragpoint-top');
                this.droppedRowIndex = index + 1;
                DomHandler.addClass(rowElement, 'p-datatable-dragpoint-bottom');
            }
        }
    }
    onRowDragLeave(event, rowElement) {
        let prevRowElement = rowElement.previousElementSibling;
        if (prevRowElement) {
            DomHandler.removeClass(prevRowElement, 'p-datatable-dragpoint-bottom');
        }
        DomHandler.removeClass(rowElement, 'p-datatable-dragpoint-bottom');
        DomHandler.removeClass(rowElement, 'p-datatable-dragpoint-top');
    }
    onRowDragEnd(event) {
        this.rowDragging = false;
        this.draggedRowIndex = null;
        this.droppedRowIndex = null;
    }
    onRowDrop(event, rowElement) {
        if (this.droppedRowIndex != null) {
            let dropIndex = (this.draggedRowIndex > this.droppedRowIndex) ? this.droppedRowIndex : (this.droppedRowIndex === 0) ? 0 : this.droppedRowIndex - 1;
            ObjectUtils.reorderArray(this.value, this.draggedRowIndex, dropIndex);
            this.onRowReorder.emit({
                dragIndex: this.draggedRowIndex,
                dropIndex: dropIndex
            });
        }
        //cleanup
        this.onRowDragLeave(event, rowElement);
        this.onRowDragEnd(event);
    }
    isEmpty() {
        let data = this.filteredValue || this.value;
        return data == null || data.length == 0;
    }
    getBlockableElement() {
        return this.el.nativeElement.children[0];
    }
    getStorage() {
        switch (this.stateStorage) {
            case 'local':
                return window.localStorage;
            case 'session':
                return window.sessionStorage;
            default:
                throw new Error(this.stateStorage + ' is not a valid value for the state storage, supported values are "local" and "session".');
        }
    }
    isStateful() {
        return this.stateKey != null;
    }
    saveState() {
        const storage = this.getStorage();
        let state = {};
        if (this.paginator) {
            state.first = this.first;
            state.rows = this.rows;
        }
        if (this.sortField) {
            state.sortField = this.sortField;
            state.sortOrder = this.sortOrder;
        }
        if (this.multiSortMeta) {
            state.multiSortMeta = this.multiSortMeta;
        }
        if (this.hasFilter()) {
            state.filters = this.filters;
        }
        if (this.resizableColumns) {
            this.saveColumnWidths(state);
        }
        if (this.reorderableColumns) {
            this.saveColumnOrder(state);
        }
        if (this.selection) {
            state.selection = this.selection;
        }
        if (Object.keys(this.expandedRowKeys).length) {
            state.expandedRowKeys = this.expandedRowKeys;
        }
        storage.setItem(this.stateKey, JSON.stringify(state));
        this.onStateSave.emit(state);
    }
    clearState() {
        const storage = this.getStorage();
        if (this.stateKey) {
            storage.removeItem(this.stateKey);
        }
    }
    restoreState() {
        const storage = this.getStorage();
        const stateString = storage.getItem(this.stateKey);
        const dateFormat = /\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z/;
        const reviver = function (key, value) {
            if (typeof value === "string" && dateFormat.test(value)) {
                return new Date(value);
            }
            return value;
        };
        if (stateString) {
            let state = JSON.parse(stateString, reviver);
            if (this.paginator) {
                if (this.first !== undefined) {
                    this.first = state.first;
                    this.firstChange.emit(this.first);
                }
                if (this.rows !== undefined) {
                    this.rows = state.rows;
                    this.rowsChange.emit(this.rows);
                }
            }
            if (state.sortField) {
                this.restoringSort = true;
                this._sortField = state.sortField;
                this._sortOrder = state.sortOrder;
            }
            if (state.multiSortMeta) {
                this.restoringSort = true;
                this._multiSortMeta = state.multiSortMeta;
            }
            if (state.filters) {
                this.restoringFilter = true;
                this.filters = state.filters;
            }
            if (this.resizableColumns) {
                this.columnWidthsState = state.columnWidths;
                this.tableWidthState = state.tableWidth;
                this.wrapperWidthState = state.wrapperWidth;
            }
            if (state.expandedRowKeys) {
                this.expandedRowKeys = state.expandedRowKeys;
            }
            if (state.selection) {
                Promise.resolve(null).then(() => this.selectionChange.emit(state.selection));
            }
            this.stateRestored = true;
            this.onStateRestore.emit(state);
        }
    }
    saveColumnWidths(state) {
        let widths = [];
        let headers = DomHandler.find(this.containerViewChild.nativeElement, '.p-datatable-thead > tr > th');
        headers.forEach(header => widths.push(DomHandler.getOuterWidth(header)));
        state.columnWidths = widths.join(',');
        if (this.columnResizeMode === 'expand') {
            state.tableWidth = DomHandler.getOuterWidth(this.tableViewChild.nativeElement) + 'px';
            state.wrapperWidth = this.wrapperViewChild.nativeElement.style.width;
        }
    }
    restoreColumnWidths() {
        if (this.columnWidthsState) {
            let widths = this.columnWidthsState.split(',');
            if (this.columnResizeMode === 'expand') {
                if (this.tableWidthState)
                    this.tableViewChild.nativeElement.style.width = this.tableWidthState;
                if (this.wrapperWidthState)
                    this.wrapperViewChild.nativeElement.style.width = this.wrapperWidthState;
            }
            this.createStyleElement();
            if (this.scrollable && widths && widths.length > 0) {
                let innerHTML = '';
                widths.forEach((width, index) => {
                    innerHTML += `
                            #${this.id} .p-datatable-thead > tr > th:nth-child(${index + 1}) {
                                flex: 0 0 ${width}px;
                            }

                            #${this.id} .p-datatable-tbody > tr > td:nth-child(${index + 1}) {
                                flex: 0 0 ${width}px;
                            }
                        `;
                });
                this.styleElement.innerHTML = innerHTML;
            }
            else {
                DomHandler.find(this.tableViewChild.nativeElement, '.p-datatable-thead > tr > th').forEach((header, index) => {
                    header.style.width = widths[index] + 'px';
                });
            }
        }
    }
    saveColumnOrder(state) {
        if (this.columns) {
            let columnOrder = [];
            this.columns.map(column => {
                columnOrder.push(column.field || column.key);
            });
            state.columnOrder = columnOrder;
        }
    }
    restoreColumnOrder() {
        const storage = this.getStorage();
        const stateString = storage.getItem(this.stateKey);
        if (stateString) {
            let state = JSON.parse(stateString);
            let columnOrder = state.columnOrder;
            if (columnOrder) {
                let reorderedColumns = [];
                columnOrder.map(key => {
                    let col = this.findColumnByKey(key);
                    if (col) {
                        reorderedColumns.push(col);
                    }
                });
                this.columnOrderStateRestored = true;
                this.columns = reorderedColumns;
            }
        }
    }
    updateScrollWidth() {
        if (this.tableViewChild && this.tableViewChild.nativeElement) {
            let parentElementHeight = DomHandler.getWidth(this.tableViewChild.nativeElement.parentElement);
            if (this.tableViewChild.nativeElement.scrollWidth > parentElementHeight) {
                this.tableViewChild.nativeElement.style.width = this.tableViewChild.nativeElement.scrollWidth + 'px';
            }
            else {
                this.tableViewChild.nativeElement.style.width = (parentElementHeight - DomHandler.calculateScrollbarHeight()) + 'px';
            }
        }
    }
    findColumnByKey(key) {
        if (this.columns) {
            for (let col of this.columns) {
                if (col.key === key || col.field === key)
                    return col;
                else
                    continue;
            }
        }
        else {
            return null;
        }
    }
    createStyleElement() {
        this.styleElement = document.createElement('style');
        this.styleElement.type = 'text/css';
        document.head.appendChild(this.styleElement);
    }
    createResponsiveStyle() {
        if (!this.responsiveStyleElement) {
            this.responsiveStyleElement = document.createElement('style');
            this.responsiveStyleElement.type = 'text/css';
            document.head.appendChild(this.responsiveStyleElement);
            let innerHTML = `
@media screen and (max-width: ${this.breakpoint}) {
    #${this.id} .p-datatable-thead > tr > th,
    #${this.id} .p-datatable-tfoot > tr > td {
        display: none !important;
    }

    #${this.id} .p-datatable-tbody > tr > td {
        display: flex;
        width: 100% !important;
        align-items: center;
        justify-content: space-between;
    }

    #${this.id} .p-datatable-tbody > tr > td:not(:last-child) {
        border: 0 none;
    }

    #${this.id}.p-datatable-gridlines .p-datatable-tbody > tr > td:last-child {
        border-top: 0;
        border-right: 0;
        border-left: 0;
    }

    #${this.id} .p-datatable-tbody > tr > td > .p-column-title {
        display: block;
    }
}
`;
            this.responsiveStyleElement.innerHTML = innerHTML;
        }
    }
    destroyResponsiveStyle() {
        if (this.responsiveStyleElement) {
            document.head.removeChild(this.responsiveStyleElement);
            this.responsiveStyleElement = null;
        }
    }
    destroyStyleElement() {
        if (this.styleElement) {
            document.head.removeChild(this.styleElement);
            this.styleElement = null;
        }
    }
    ngOnDestroy() {
        this.unbindDocumentEditListener();
        this.editingCell = null;
        this.initialized = null;
        if (this.virtualScrollSubscription) {
            this.virtualScrollSubscription.unsubscribe();
        }
        this.destroyStyleElement();
        this.destroyResponsiveStyle();
    }
}
Table.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0, type: Table, deps: [{ token: i0.ElementRef }, { token: i0.NgZone }, { token: TableService }, { token: i0.ChangeDetectorRef }, { token: i1.FilterService }, { token: i1.OverlayService }], target: i0.ɵɵFactoryTarget.Component });
Table.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.0.5", type: Table, selector: "p-table", inputs: { frozenColumns: "frozenColumns", frozenValue: "frozenValue", style: "style", styleClass: "styleClass", tableStyle: "tableStyle", tableStyleClass: "tableStyleClass", paginator: "paginator", pageLinks: "pageLinks", rowsPerPageOptions: "rowsPerPageOptions", alwaysShowPaginator: "alwaysShowPaginator", paginatorPosition: "paginatorPosition", paginatorDropdownAppendTo: "paginatorDropdownAppendTo", paginatorDropdownScrollHeight: "paginatorDropdownScrollHeight", currentPageReportTemplate: "currentPageReportTemplate", showCurrentPageReport: "showCurrentPageReport", showJumpToPageDropdown: "showJumpToPageDropdown", showFirstLastIcon: "showFirstLastIcon", showPageLinks: "showPageLinks", defaultSortOrder: "defaultSortOrder", sortMode: "sortMode", resetPageOnSort: "resetPageOnSort", selectionMode: "selectionMode", contextMenuSelection: "contextMenuSelection", contextMenuSelectionMode: "contextMenuSelectionMode", dataKey: "dataKey", metaKeySelection: "metaKeySelection", rowTrackBy: "rowTrackBy", lazy: "lazy", lazyLoadOnInit: "lazyLoadOnInit", compareSelectionBy: "compareSelectionBy", csvSeparator: "csvSeparator", exportFilename: "exportFilename", filters: "filters", globalFilterFields: "globalFilterFields", filterDelay: "filterDelay", filterLocale: "filterLocale", expandedRowKeys: "expandedRowKeys", editingRowKeys: "editingRowKeys", rowExpandMode: "rowExpandMode", scrollable: "scrollable", scrollDirection: "scrollDirection", rowGroupMode: "rowGroupMode", scrollHeight: "scrollHeight", virtualScroll: "virtualScroll", virtualScrollDelay: "virtualScrollDelay", virtualRowHeight: "virtualRowHeight", frozenWidth: "frozenWidth", responsive: "responsive", contextMenu: "contextMenu", resizableColumns: "resizableColumns", columnResizeMode: "columnResizeMode", reorderableColumns: "reorderableColumns", loading: "loading", loadingIcon: "loadingIcon", showLoader: "showLoader", rowHover: "rowHover", customSort: "customSort", showInitialSortBadge: "showInitialSortBadge", autoLayout: "autoLayout", exportFunction: "exportFunction", stateKey: "stateKey", stateStorage: "stateStorage", editMode: "editMode", groupRowsBy: "groupRowsBy", minBufferPx: "minBufferPx", maxBufferPx: "maxBufferPx", responsiveLayout: "responsiveLayout", breakpoint: "breakpoint", value: "value", columns: "columns", first: "first", rows: "rows", totalRecords: "totalRecords", sortField: "sortField", sortOrder: "sortOrder", multiSortMeta: "multiSortMeta", selection: "selection" }, outputs: { selectionChange: "selectionChange", contextMenuSelectionChange: "contextMenuSelectionChange", onRowSelect: "onRowSelect", onRowUnselect: "onRowUnselect", onPage: "onPage", onSort: "onSort", onFilter: "onFilter", onLazyLoad: "onLazyLoad", onRowExpand: "onRowExpand", onRowCollapse: "onRowCollapse", onContextMenuSelect: "onContextMenuSelect", onColResize: "onColResize", onColReorder: "onColReorder", onRowReorder: "onRowReorder", onEditInit: "onEditInit", onEditComplete: "onEditComplete", onEditCancel: "onEditCancel", onHeaderCheckboxToggle: "onHeaderCheckboxToggle", sortFunction: "sortFunction", firstChange: "firstChange", rowsChange: "rowsChange", onStateSave: "onStateSave", onStateRestore: "onStateRestore" }, host: { classAttribute: "p-element" }, providers: [TableService], queries: [{ propertyName: "templates", predicate: PrimeTemplate }], viewQueries: [{ propertyName: "containerViewChild", first: true, predicate: ["container"], descendants: true }, { propertyName: "resizeHelperViewChild", first: true, predicate: ["resizeHelper"], descendants: true }, { propertyName: "reorderIndicatorUpViewChild", first: true, predicate: ["reorderIndicatorUp"], descendants: true }, { propertyName: "reorderIndicatorDownViewChild", first: true, predicate: ["reorderIndicatorDown"], descendants: true }, { propertyName: "wrapperViewChild", first: true, predicate: ["wrapper"], descendants: true }, { propertyName: "tableViewChild", first: true, predicate: ["table"], descendants: true }, { propertyName: "tableHeaderViewChild", first: true, predicate: ["tableHeader"], descendants: true }, { propertyName: "virtualScrollBody", first: true, predicate: CdkVirtualScrollViewport, descendants: true }], usesOnChanges: true, ngImport: i0, template: `
        <div #container [ngStyle]="style" [class]="styleClass"
            [ngClass]="{'p-datatable p-component': true,
                'p-datatable-hoverable-rows': (rowHover||selectionMode),
                'p-datatable-auto-layout': autoLayout,
                'p-datatable-resizable': resizableColumns,
                'p-datatable-resizable-fit': (resizableColumns && columnResizeMode === 'fit'),
                'p-datatable-scrollable': scrollable,
                'p-datatable-scrollable-vertical': scrollable && scrollDirection === 'vertical',
                'p-datatable-scrollable-horizontal': scrollable && scrollDirection === 'horizontal',
                'p-datatable-scrollable-both': scrollable && scrollDirection === 'both',
                'p-datatable-flex-scrollable': (scrollable && scrollHeight === 'flex'),
                'p-datatable-responsive-stack': responsiveLayout === 'stack',
                'p-datatable-responsive-scroll': responsiveLayout === 'scroll',
                'p-datatable-responsive': responsive,
                'p-datatable-grouped-header': headerGroupedTemplate != null,
                'p-datatable-grouped-footer': footerGroupedTemplate != null}" [attr.id]="id">
            <div class="p-datatable-loading-overlay p-component-overlay" *ngIf="loading && showLoader">
                <i [class]="'p-datatable-loading-icon pi-spin ' + loadingIcon"></i>
            </div>
            <div *ngIf="captionTemplate" class="p-datatable-header">
                <ng-container *ngTemplateOutlet="captionTemplate"></ng-container>
            </div>
            <p-paginator [rows]="rows" [first]="first" [totalRecords]="totalRecords" [pageLinkSize]="pageLinks" styleClass="p-paginator-top" [alwaysShow]="alwaysShowPaginator"
                (onPageChange)="onPageChange($event)" [rowsPerPageOptions]="rowsPerPageOptions" *ngIf="paginator && (paginatorPosition === 'top' || paginatorPosition =='both')"
                [templateLeft]="paginatorLeftTemplate" [templateRight]="paginatorRightTemplate" [dropdownAppendTo]="paginatorDropdownAppendTo" [dropdownScrollHeight]="paginatorDropdownScrollHeight"
                [currentPageReportTemplate]="currentPageReportTemplate" [showFirstLastIcon]="showFirstLastIcon" [dropdownItemTemplate]="paginatorDropdownItemTemplate" [showCurrentPageReport]="showCurrentPageReport" [showJumpToPageDropdown]="showJumpToPageDropdown" [showPageLinks]="showPageLinks"></p-paginator>

            <div #wrapper class="p-datatable-wrapper" [ngStyle]="{height: scrollHeight}">
                <table #table *ngIf="!virtualScroll" role="table" class="p-datatable-table" [ngClass]="tableStyleClass" [ngStyle]="tableStyle">
                    <ng-container *ngTemplateOutlet="colGroupTemplate; context {$implicit: columns}"></ng-container>
                    <thead class="p-datatable-thead">
                        <ng-container *ngTemplateOutlet="headerGroupedTemplate||headerTemplate; context: {$implicit: columns}"></ng-container>
                    </thead>
                    <tbody class="p-datatable-tbody p-datatable-frozen-tbody" *ngIf="frozenValue||frozenBodyTemplate" [value]="frozenValue" [frozenRows]="true" [pTableBody]="columns" [pTableBodyTemplate]="frozenBodyTemplate" [frozen]="true"></tbody>
                    <tbody class="p-datatable-tbody" [value]="dataToRender" [pTableBody]="columns" [pTableBodyTemplate]="bodyTemplate"></tbody>
                    <tfoot *ngIf="footerGroupedTemplate||footerTemplate" class="p-datatable-tfoot">
                        <ng-container *ngTemplateOutlet="footerGroupedTemplate||footerTemplate; context {$implicit: columns}"></ng-container>
                    </tfoot>
                </table>
                <cdk-virtual-scroll-viewport *ngIf="virtualScroll" [itemSize]="virtualRowHeight" tabindex="0" [style.height]="scrollHeight !== 'flex' ? scrollHeight : undefined" [minBufferPx]="minBufferPx" [maxBufferPx]="maxBufferPx" (scrolledIndexChange)="onScrollIndexChange($event)" class="p-datatable-virtual-scrollable-body">
                    <table #table role="table" class="p-datatable-table" [ngClass]="tableStyleClass" [ngStyle]="tableStyle">
                        <ng-container *ngTemplateOutlet="colGroupTemplate; context {$implicit: columns}"></ng-container>
                        <thead #tableHeader class="p-datatable-thead">
                            <ng-container *ngTemplateOutlet="headerGroupedTemplate||headerTemplate; context: {$implicit: columns}"></ng-container>
                        </thead>
                        <tbody class="p-datatable-tbody p-datatable-frozen-tbody" *ngIf="frozenValue||frozenBodyTemplate" [value]="frozenValue" [frozenRows]="true" [pTableBody]="columns" [pTableBodyTemplate]="bodyTemplate" [frozen]="true"></tbody>
                        <tbody class="p-datatable-tbody" [value]="dataToRender" [pTableBody]="columns" [pTableBodyTemplate]="bodyTemplate"></tbody>
                        <tfoot *ngIf="footerGroupedTemplate||footerTemplate" class="p-datatable-tfoot">
                            <ng-container *ngTemplateOutlet="footerGroupedTemplate||footerTemplate; context {$implicit: columns}"></ng-container>
                        </tfoot>
                    </table>
                </cdk-virtual-scroll-viewport>
            </div>

            <p-paginator [rows]="rows" [first]="first" [totalRecords]="totalRecords" [pageLinkSize]="pageLinks" styleClass="p-paginator-bottom" [alwaysShow]="alwaysShowPaginator"
                (onPageChange)="onPageChange($event)" [rowsPerPageOptions]="rowsPerPageOptions" *ngIf="paginator && (paginatorPosition === 'bottom' || paginatorPosition =='both')"
                [templateLeft]="paginatorLeftTemplate" [templateRight]="paginatorRightTemplate" [dropdownAppendTo]="paginatorDropdownAppendTo" [dropdownScrollHeight]="paginatorDropdownScrollHeight"
                [currentPageReportTemplate]="currentPageReportTemplate" [showFirstLastIcon]="showFirstLastIcon" [dropdownItemTemplate]="paginatorDropdownItemTemplate" [showCurrentPageReport]="showCurrentPageReport" [showJumpToPageDropdown]="showJumpToPageDropdown" [showPageLinks]="showPageLinks"></p-paginator>

            <div *ngIf="summaryTemplate" class="p-datatable-footer">
                <ng-container *ngTemplateOutlet="summaryTemplate"></ng-container>
            </div>

            <div #resizeHelper class="p-column-resizer-helper" style="display:none" *ngIf="resizableColumns"></div>
            <span #reorderIndicatorUp class="pi pi-arrow-down p-datatable-reorder-indicator-up" style="display:none" *ngIf="reorderableColumns"></span>
            <span #reorderIndicatorDown class="pi pi-arrow-up p-datatable-reorder-indicator-down" style="display:none" *ngIf="reorderableColumns"></span>
        </div>
    `, isInline: true, styles: [".p-datatable{position:relative}.p-datatable table{border-collapse:collapse;width:100%;table-layout:fixed}.p-datatable .p-sortable-column{cursor:pointer;-webkit-user-select:none;-ms-user-select:none;user-select:none}.p-datatable .p-sortable-column .p-column-title,.p-datatable .p-sortable-column .p-sortable-column-badge,.p-datatable .p-sortable-column .p-sortable-column-icon{vertical-align:middle}.p-datatable .p-sortable-column .p-sortable-column-badge{display:inline-flex;align-items:center;justify-content:center}.p-datatable-auto-layout>.p-datatable-wrapper{overflow-x:auto}.p-datatable-auto-layout>.p-datatable-wrapper>table{table-layout:auto}.p-datatable-responsive-scroll>.p-datatable-wrapper{overflow-x:auto}.p-datatable-auto-layout>.p-datatable-wrapper>table,.p-datatable-responsive-scroll>.p-datatable-wrapper>table{table-layout:auto}.p-datatable-hoverable-rows .p-selectable-row{cursor:pointer}.p-datatable-scrollable .p-datatable-wrapper{position:relative;overflow:auto}.p-datatable-scrollable .p-datatable-table,.p-datatable-scrollable .p-datatable-tbody,.p-datatable-scrollable .p-datatable-tfoot,.p-datatable-scrollable .p-datatable-thead{display:block}.p-datatable-scrollable .p-datatable-tbody>tr,.p-datatable-scrollable .p-datatable-tfoot>tr,.p-datatable-scrollable .p-datatable-thead>tr{display:flex;flex-wrap:nowrap;width:100%}.p-datatable-scrollable .p-datatable-tbody>tr>td,.p-datatable-scrollable .p-datatable-tfoot>tr>td,.p-datatable-scrollable .p-datatable-thead>tr>th{display:flex;flex:1 1 0;align-items:center}.p-datatable-scrollable .p-datatable-thead{position:sticky;top:0;z-index:1}.p-datatable-scrollable .p-datatable-frozen-tbody{position:sticky;z-index:1}.p-datatable-scrollable .p-datatable-tfoot{position:sticky;bottom:0;z-index:1}.p-datatable-scrollable .p-frozen-column{position:sticky;background:inherit}.p-datatable-scrollable th.p-frozen-column{z-index:1}.p-datatable-scrollable-both .p-datatable-tbody>tr>td,.p-datatable-scrollable-both .p-datatable-tfoot>tr>td,.p-datatable-scrollable-both .p-datatable-thead>tr>th,.p-datatable-scrollable-horizontal .p-datatable-tfoot>tr>td,.p-datatable-scrollable-horizontal .p-datatable-thead>tr>th\n.p-datatable-scrollable-horizontal .p-datatable-tbody>tr>td{flex:0 0 auto}.p-datatable-flex-scrollable .p-datatable-wrapper{display:flex;flex-direction:column;flex:1;height:100%}.p-datatable-scrollable .p-rowgroup-header{position:sticky;z-index:1}.p-datatable-scrollable.p-datatable-grouped-footer .p-datatable-tfoot,.p-datatable-scrollable.p-datatable-grouped-header .p-datatable-thead{display:table;border-collapse:collapse;width:100%;table-layout:fixed}.p-datatable-scrollable.p-datatable-grouped-footer .p-datatable-tfoot>tr,.p-datatable-scrollable.p-datatable-grouped-header .p-datatable-thead>tr{display:table-row}.p-datatable-scrollable.p-datatable-grouped-footer .p-datatable-tfoot>tr>td,.p-datatable-scrollable.p-datatable-grouped-header .p-datatable-thead>tr>th{display:table-cell}.p-datatable-flex-scrollable{display:flex;flex-direction:column;flex:1;height:100%}.p-datatable-flex-scrollable .p-datatable-virtual-scrollable-body{flex:1}.p-datatable-resizable>.p-datatable-wrapper{overflow-x:auto}.p-datatable-resizable .p-datatable-tbody>tr>td,.p-datatable-resizable .p-datatable-tfoot>tr>td,.p-datatable-resizable .p-datatable-thead>tr>th{overflow:hidden;white-space:nowrap}.p-datatable-resizable .p-resizable-column{background-clip:padding-box;position:relative}.p-datatable-resizable-fit .p-resizable-column:last-child .p-column-resizer{display:none}.p-datatable .p-column-resizer{display:block;position:absolute!important;top:0;right:0;margin:0;width:.5rem;height:100%;padding:0;cursor:col-resize;border:1px solid transparent}.p-datatable .p-column-resizer-helper{width:1px;position:absolute;z-index:10;display:none}.p-datatable .p-row-editor-cancel,.p-datatable .p-row-editor-init,.p-datatable .p-row-editor-save,.p-datatable .p-row-toggler{display:inline-flex;align-items:center;justify-content:center;overflow:hidden;position:relative}.p-datatable-reorder-indicator-down,.p-datatable-reorder-indicator-up{position:absolute;display:none}.p-datatable-reorderablerow-handle,[pReorderableColumn]{cursor:move}.p-datatable .p-datatable-loading-overlay{position:absolute;display:flex;align-items:center;justify-content:center;z-index:2}.p-column-filter-row{display:flex;align-items:center;width:100%}.p-column-filter-menu{display:inline-flex}.p-column-filter-row p-columnfilterformelement{flex:1 1 auto;width:1%}.p-column-filter-clear-button,.p-column-filter-menu-button{display:inline-flex;justify-content:center;align-items:center;cursor:pointer;text-decoration:none;overflow:hidden;position:relative}.p-column-filter-overlay{position:absolute;top:0;left:0}.p-column-filter-row-items{margin:0;padding:0;list-style:none}.p-column-filter-row-item{cursor:pointer}.p-column-filter-add-button,.p-column-filter-remove-button{justify-content:center}.p-column-filter-add-button .p-button-label,.p-column-filter-remove-button .p-button-label{flex-grow:0}.p-column-filter-buttonbar{display:flex;align-items:center;justify-content:space-between}.p-column-filter-buttonbar .p-button{width:auto}.p-datatable .p-datatable-tbody>tr>td>.p-column-title{display:none}cdk-virtual-scroll-viewport{outline:0 none}"], components: [{ type: i0.forwardRef(function () { return i2.Paginator; }), selector: "p-paginator", inputs: ["pageLinkSize", "style", "styleClass", "alwaysShow", "templateLeft", "templateRight", "dropdownAppendTo", "dropdownScrollHeight", "currentPageReportTemplate", "showCurrentPageReport", "showFirstLastIcon", "totalRecords", "rows", "rowsPerPageOptions", "showJumpToPageDropdown", "showPageLinks", "dropdownItemTemplate", "first"], outputs: ["onPageChange"] }, { type: i0.forwardRef(function () { return TableBody; }), selector: "[pTableBody]", inputs: ["pTableBody", "pTableBodyTemplate", "value", "frozen", "frozenRows"] }, { type: i0.forwardRef(function () { return i3.CdkVirtualScrollViewport; }), selector: "cdk-virtual-scroll-viewport", inputs: ["orientation"], outputs: ["scrolledIndexChange"] }], directives: [{ type: i0.forwardRef(function () { return i4.NgStyle; }), selector: "[ngStyle]", inputs: ["ngStyle"] }, { type: i0.forwardRef(function () { return i4.NgClass; }), selector: "[ngClass]", inputs: ["class", "ngClass"] }, { type: i0.forwardRef(function () { return i4.NgIf; }), selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i0.forwardRef(function () { return i4.NgTemplateOutlet; }), selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet"] }, { type: i0.forwardRef(function () { return i3.CdkFixedSizeVirtualScroll; }), selector: "cdk-virtual-scroll-viewport[itemSize]", inputs: ["itemSize", "minBufferPx", "maxBufferPx"] }], changeDetection: i0.ChangeDetectionStrategy.Default, encapsulation: i0.ViewEncapsulation.None });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0, type: Table, decorators: [{
            type: Component,
            args: [{
                    selector: 'p-table',
                    template: `
        <div #container [ngStyle]="style" [class]="styleClass"
            [ngClass]="{'p-datatable p-component': true,
                'p-datatable-hoverable-rows': (rowHover||selectionMode),
                'p-datatable-auto-layout': autoLayout,
                'p-datatable-resizable': resizableColumns,
                'p-datatable-resizable-fit': (resizableColumns && columnResizeMode === 'fit'),
                'p-datatable-scrollable': scrollable,
                'p-datatable-scrollable-vertical': scrollable && scrollDirection === 'vertical',
                'p-datatable-scrollable-horizontal': scrollable && scrollDirection === 'horizontal',
                'p-datatable-scrollable-both': scrollable && scrollDirection === 'both',
                'p-datatable-flex-scrollable': (scrollable && scrollHeight === 'flex'),
                'p-datatable-responsive-stack': responsiveLayout === 'stack',
                'p-datatable-responsive-scroll': responsiveLayout === 'scroll',
                'p-datatable-responsive': responsive,
                'p-datatable-grouped-header': headerGroupedTemplate != null,
                'p-datatable-grouped-footer': footerGroupedTemplate != null}" [attr.id]="id">
            <div class="p-datatable-loading-overlay p-component-overlay" *ngIf="loading && showLoader">
                <i [class]="'p-datatable-loading-icon pi-spin ' + loadingIcon"></i>
            </div>
            <div *ngIf="captionTemplate" class="p-datatable-header">
                <ng-container *ngTemplateOutlet="captionTemplate"></ng-container>
            </div>
            <p-paginator [rows]="rows" [first]="first" [totalRecords]="totalRecords" [pageLinkSize]="pageLinks" styleClass="p-paginator-top" [alwaysShow]="alwaysShowPaginator"
                (onPageChange)="onPageChange($event)" [rowsPerPageOptions]="rowsPerPageOptions" *ngIf="paginator && (paginatorPosition === 'top' || paginatorPosition =='both')"
                [templateLeft]="paginatorLeftTemplate" [templateRight]="paginatorRightTemplate" [dropdownAppendTo]="paginatorDropdownAppendTo" [dropdownScrollHeight]="paginatorDropdownScrollHeight"
                [currentPageReportTemplate]="currentPageReportTemplate" [showFirstLastIcon]="showFirstLastIcon" [dropdownItemTemplate]="paginatorDropdownItemTemplate" [showCurrentPageReport]="showCurrentPageReport" [showJumpToPageDropdown]="showJumpToPageDropdown" [showPageLinks]="showPageLinks"></p-paginator>

            <div #wrapper class="p-datatable-wrapper" [ngStyle]="{height: scrollHeight}">
                <table #table *ngIf="!virtualScroll" role="table" class="p-datatable-table" [ngClass]="tableStyleClass" [ngStyle]="tableStyle">
                    <ng-container *ngTemplateOutlet="colGroupTemplate; context {$implicit: columns}"></ng-container>
                    <thead class="p-datatable-thead">
                        <ng-container *ngTemplateOutlet="headerGroupedTemplate||headerTemplate; context: {$implicit: columns}"></ng-container>
                    </thead>
                    <tbody class="p-datatable-tbody p-datatable-frozen-tbody" *ngIf="frozenValue||frozenBodyTemplate" [value]="frozenValue" [frozenRows]="true" [pTableBody]="columns" [pTableBodyTemplate]="frozenBodyTemplate" [frozen]="true"></tbody>
                    <tbody class="p-datatable-tbody" [value]="dataToRender" [pTableBody]="columns" [pTableBodyTemplate]="bodyTemplate"></tbody>
                    <tfoot *ngIf="footerGroupedTemplate||footerTemplate" class="p-datatable-tfoot">
                        <ng-container *ngTemplateOutlet="footerGroupedTemplate||footerTemplate; context {$implicit: columns}"></ng-container>
                    </tfoot>
                </table>
                <cdk-virtual-scroll-viewport *ngIf="virtualScroll" [itemSize]="virtualRowHeight" tabindex="0" [style.height]="scrollHeight !== 'flex' ? scrollHeight : undefined" [minBufferPx]="minBufferPx" [maxBufferPx]="maxBufferPx" (scrolledIndexChange)="onScrollIndexChange($event)" class="p-datatable-virtual-scrollable-body">
                    <table #table role="table" class="p-datatable-table" [ngClass]="tableStyleClass" [ngStyle]="tableStyle">
                        <ng-container *ngTemplateOutlet="colGroupTemplate; context {$implicit: columns}"></ng-container>
                        <thead #tableHeader class="p-datatable-thead">
                            <ng-container *ngTemplateOutlet="headerGroupedTemplate||headerTemplate; context: {$implicit: columns}"></ng-container>
                        </thead>
                        <tbody class="p-datatable-tbody p-datatable-frozen-tbody" *ngIf="frozenValue||frozenBodyTemplate" [value]="frozenValue" [frozenRows]="true" [pTableBody]="columns" [pTableBodyTemplate]="bodyTemplate" [frozen]="true"></tbody>
                        <tbody class="p-datatable-tbody" [value]="dataToRender" [pTableBody]="columns" [pTableBodyTemplate]="bodyTemplate"></tbody>
                        <tfoot *ngIf="footerGroupedTemplate||footerTemplate" class="p-datatable-tfoot">
                            <ng-container *ngTemplateOutlet="footerGroupedTemplate||footerTemplate; context {$implicit: columns}"></ng-container>
                        </tfoot>
                    </table>
                </cdk-virtual-scroll-viewport>
            </div>

            <p-paginator [rows]="rows" [first]="first" [totalRecords]="totalRecords" [pageLinkSize]="pageLinks" styleClass="p-paginator-bottom" [alwaysShow]="alwaysShowPaginator"
                (onPageChange)="onPageChange($event)" [rowsPerPageOptions]="rowsPerPageOptions" *ngIf="paginator && (paginatorPosition === 'bottom' || paginatorPosition =='both')"
                [templateLeft]="paginatorLeftTemplate" [templateRight]="paginatorRightTemplate" [dropdownAppendTo]="paginatorDropdownAppendTo" [dropdownScrollHeight]="paginatorDropdownScrollHeight"
                [currentPageReportTemplate]="currentPageReportTemplate" [showFirstLastIcon]="showFirstLastIcon" [dropdownItemTemplate]="paginatorDropdownItemTemplate" [showCurrentPageReport]="showCurrentPageReport" [showJumpToPageDropdown]="showJumpToPageDropdown" [showPageLinks]="showPageLinks"></p-paginator>

            <div *ngIf="summaryTemplate" class="p-datatable-footer">
                <ng-container *ngTemplateOutlet="summaryTemplate"></ng-container>
            </div>

            <div #resizeHelper class="p-column-resizer-helper" style="display:none" *ngIf="resizableColumns"></div>
            <span #reorderIndicatorUp class="pi pi-arrow-down p-datatable-reorder-indicator-up" style="display:none" *ngIf="reorderableColumns"></span>
            <span #reorderIndicatorDown class="pi pi-arrow-up p-datatable-reorder-indicator-down" style="display:none" *ngIf="reorderableColumns"></span>
        </div>
    `,
                    providers: [TableService],
                    changeDetection: ChangeDetectionStrategy.Default,
                    encapsulation: ViewEncapsulation.None,
                    styleUrls: ['./table.css'],
                    host: {
                        'class': 'p-element'
                    }
                }]
        }], ctorParameters: function () { return [{ type: i0.ElementRef }, { type: i0.NgZone }, { type: TableService }, { type: i0.ChangeDetectorRef }, { type: i1.FilterService }, { type: i1.OverlayService }]; }, propDecorators: { frozenColumns: [{
                type: Input
            }], frozenValue: [{
                type: Input
            }], style: [{
                type: Input
            }], styleClass: [{
                type: Input
            }], tableStyle: [{
                type: Input
            }], tableStyleClass: [{
                type: Input
            }], paginator: [{
                type: Input
            }], pageLinks: [{
                type: Input
            }], rowsPerPageOptions: [{
                type: Input
            }], alwaysShowPaginator: [{
                type: Input
            }], paginatorPosition: [{
                type: Input
            }], paginatorDropdownAppendTo: [{
                type: Input
            }], paginatorDropdownScrollHeight: [{
                type: Input
            }], currentPageReportTemplate: [{
                type: Input
            }], showCurrentPageReport: [{
                type: Input
            }], showJumpToPageDropdown: [{
                type: Input
            }], showFirstLastIcon: [{
                type: Input
            }], showPageLinks: [{
                type: Input
            }], defaultSortOrder: [{
                type: Input
            }], sortMode: [{
                type: Input
            }], resetPageOnSort: [{
                type: Input
            }], selectionMode: [{
                type: Input
            }], selectionChange: [{
                type: Output
            }], contextMenuSelection: [{
                type: Input
            }], contextMenuSelectionChange: [{
                type: Output
            }], contextMenuSelectionMode: [{
                type: Input
            }], dataKey: [{
                type: Input
            }], metaKeySelection: [{
                type: Input
            }], rowTrackBy: [{
                type: Input
            }], lazy: [{
                type: Input
            }], lazyLoadOnInit: [{
                type: Input
            }], compareSelectionBy: [{
                type: Input
            }], csvSeparator: [{
                type: Input
            }], exportFilename: [{
                type: Input
            }], filters: [{
                type: Input
            }], globalFilterFields: [{
                type: Input
            }], filterDelay: [{
                type: Input
            }], filterLocale: [{
                type: Input
            }], expandedRowKeys: [{
                type: Input
            }], editingRowKeys: [{
                type: Input
            }], rowExpandMode: [{
                type: Input
            }], scrollable: [{
                type: Input
            }], scrollDirection: [{
                type: Input
            }], rowGroupMode: [{
                type: Input
            }], scrollHeight: [{
                type: Input
            }], virtualScroll: [{
                type: Input
            }], virtualScrollDelay: [{
                type: Input
            }], virtualRowHeight: [{
                type: Input
            }], frozenWidth: [{
                type: Input
            }], responsive: [{
                type: Input
            }], contextMenu: [{
                type: Input
            }], resizableColumns: [{
                type: Input
            }], columnResizeMode: [{
                type: Input
            }], reorderableColumns: [{
                type: Input
            }], loading: [{
                type: Input
            }], loadingIcon: [{
                type: Input
            }], showLoader: [{
                type: Input
            }], rowHover: [{
                type: Input
            }], customSort: [{
                type: Input
            }], showInitialSortBadge: [{
                type: Input
            }], autoLayout: [{
                type: Input
            }], exportFunction: [{
                type: Input
            }], stateKey: [{
                type: Input
            }], stateStorage: [{
                type: Input
            }], editMode: [{
                type: Input
            }], groupRowsBy: [{
                type: Input
            }], minBufferPx: [{
                type: Input
            }], maxBufferPx: [{
                type: Input
            }], responsiveLayout: [{
                type: Input
            }], breakpoint: [{
                type: Input
            }], onRowSelect: [{
                type: Output
            }], onRowUnselect: [{
                type: Output
            }], onPage: [{
                type: Output
            }], onSort: [{
                type: Output
            }], onFilter: [{
                type: Output
            }], onLazyLoad: [{
                type: Output
            }], onRowExpand: [{
                type: Output
            }], onRowCollapse: [{
                type: Output
            }], onContextMenuSelect: [{
                type: Output
            }], onColResize: [{
                type: Output
            }], onColReorder: [{
                type: Output
            }], onRowReorder: [{
                type: Output
            }], onEditInit: [{
                type: Output
            }], onEditComplete: [{
                type: Output
            }], onEditCancel: [{
                type: Output
            }], onHeaderCheckboxToggle: [{
                type: Output
            }], sortFunction: [{
                type: Output
            }], firstChange: [{
                type: Output
            }], rowsChange: [{
                type: Output
            }], onStateSave: [{
                type: Output
            }], onStateRestore: [{
                type: Output
            }], containerViewChild: [{
                type: ViewChild,
                args: ['container']
            }], resizeHelperViewChild: [{
                type: ViewChild,
                args: ['resizeHelper']
            }], reorderIndicatorUpViewChild: [{
                type: ViewChild,
                args: ['reorderIndicatorUp']
            }], reorderIndicatorDownViewChild: [{
                type: ViewChild,
                args: ['reorderIndicatorDown']
            }], wrapperViewChild: [{
                type: ViewChild,
                args: ['wrapper']
            }], tableViewChild: [{
                type: ViewChild,
                args: ['table']
            }], tableHeaderViewChild: [{
                type: ViewChild,
                args: ['tableHeader']
            }], virtualScrollBody: [{
                type: ViewChild,
                args: [CdkVirtualScrollViewport]
            }], templates: [{
                type: ContentChildren,
                args: [PrimeTemplate]
            }], value: [{
                type: Input
            }], columns: [{
                type: Input
            }], first: [{
                type: Input
            }], rows: [{
                type: Input
            }], totalRecords: [{
                type: Input
            }], sortField: [{
                type: Input
            }], sortOrder: [{
                type: Input
            }], multiSortMeta: [{
                type: Input
            }], selection: [{
                type: Input
            }] } });
class TableBody {
    constructor(dt, tableService, cd, el) {
        this.dt = dt;
        this.tableService = tableService;
        this.cd = cd;
        this.el = el;
        this.subscription = this.dt.tableService.valueSource$.subscribe(() => {
            if (this.dt.virtualScroll) {
                this.cd.detectChanges();
            }
        });
    }
    get value() {
        return this._value;
    }
    set value(val) {
        this._value = val;
        if (this.frozenRows) {
            this.updateFrozenRowStickyPosition();
        }
        if (this.dt.scrollable && this.dt.rowGroupMode === 'subheader') {
            this.updateFrozenRowGroupHeaderStickyPosition();
        }
    }
    ngAfterViewInit() {
        if (this.frozenRows) {
            this.updateFrozenRowStickyPosition();
        }
        if (this.dt.scrollable && this.dt.rowGroupMode === 'subheader') {
            this.updateFrozenRowGroupHeaderStickyPosition();
        }
    }
    shouldRenderRowGroupHeader(value, rowData, i) {
        let currentRowFieldData = ObjectUtils.resolveFieldData(rowData, this.dt.groupRowsBy);
        let prevRowData = value[i - 1];
        if (prevRowData) {
            let previousRowFieldData = ObjectUtils.resolveFieldData(prevRowData, this.dt.groupRowsBy);
            return currentRowFieldData !== previousRowFieldData;
        }
        else {
            return true;
        }
    }
    shouldRenderRowGroupFooter(value, rowData, i) {
        let currentRowFieldData = ObjectUtils.resolveFieldData(rowData, this.dt.groupRowsBy);
        let nextRowData = value[i + 1];
        if (nextRowData) {
            let nextRowFieldData = ObjectUtils.resolveFieldData(nextRowData, this.dt.groupRowsBy);
            return currentRowFieldData !== nextRowFieldData;
        }
        else {
            return true;
        }
    }
    shouldRenderRowspan(value, rowData, i) {
        let currentRowFieldData = ObjectUtils.resolveFieldData(rowData, this.dt.groupRowsBy);
        let prevRowData = value[i - 1];
        if (prevRowData) {
            let previousRowFieldData = ObjectUtils.resolveFieldData(prevRowData, this.dt.groupRowsBy);
            return currentRowFieldData !== previousRowFieldData;
        }
        else {
            return true;
        }
    }
    calculateRowGroupSize(value, rowData, index) {
        let currentRowFieldData = ObjectUtils.resolveFieldData(rowData, this.dt.groupRowsBy);
        let nextRowFieldData = currentRowFieldData;
        let groupRowSpan = 0;
        while (currentRowFieldData === nextRowFieldData) {
            groupRowSpan++;
            let nextRowData = value[++index];
            if (nextRowData) {
                nextRowFieldData = ObjectUtils.resolveFieldData(nextRowData, this.dt.groupRowsBy);
            }
            else {
                break;
            }
        }
        return groupRowSpan === 1 ? null : groupRowSpan;
    }
    ngOnDestroy() {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }
    updateFrozenRowStickyPosition() {
        this.el.nativeElement.style.top = DomHandler.getOuterHeight(this.el.nativeElement.previousElementSibling) + 'px';
    }
    updateFrozenRowGroupHeaderStickyPosition() {
        if (this.el.nativeElement.previousElementSibling) {
            let tableHeaderHeight = DomHandler.getOuterHeight(this.el.nativeElement.previousElementSibling);
            this.dt.rowGroupHeaderStyleObject.top = tableHeaderHeight + 'px';
        }
    }
}
TableBody.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0, type: TableBody, deps: [{ token: Table }, { token: TableService }, { token: i0.ChangeDetectorRef }, { token: i0.ElementRef }], target: i0.ɵɵFactoryTarget.Component });
TableBody.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.0.5", type: TableBody, selector: "[pTableBody]", inputs: { columns: ["pTableBody", "columns"], template: ["pTableBodyTemplate", "template"], value: "value", frozen: "frozen", frozenRows: "frozenRows" }, host: { classAttribute: "p-element" }, ngImport: i0, template: `
        <ng-container *ngIf="!dt.expandedRowTemplate && !dt.virtualScroll">
            <ng-template ngFor let-rowData let-rowIndex="index" [ngForOf]="value" [ngForTrackBy]="dt.rowTrackBy">
                <ng-container *ngIf="dt.groupHeaderTemplate && dt.rowGroupMode === 'subheader' && shouldRenderRowGroupHeader(value, rowData, rowIndex)" role="row">
                    <ng-container *ngTemplateOutlet="dt.groupHeaderTemplate; context: {$implicit: rowData, rowIndex: dt.paginator ? (dt.first + rowIndex) : rowIndex, columns: columns, editing: (dt.editMode === 'row' && dt.isRowEditing(rowData)), frozen: frozen}"></ng-container>
                </ng-container>
                <ng-container *ngIf="dt.rowGroupMode !== 'rowspan'">
                    <ng-container *ngTemplateOutlet="template; context: {$implicit: rowData, rowIndex: dt.paginator ? (dt.first + rowIndex) : rowIndex, columns: columns, editing: (dt.editMode === 'row' && dt.isRowEditing(rowData)), frozen: frozen}"></ng-container>
                </ng-container>
                <ng-container *ngIf="dt.rowGroupMode === 'rowspan'">
                    <ng-container *ngTemplateOutlet="template; context: {$implicit: rowData, rowIndex: dt.paginator ? (dt.first + rowIndex) : rowIndex, columns: columns, editing: (dt.editMode === 'row' && dt.isRowEditing(rowData)), frozen: frozen, rowgroup: shouldRenderRowspan(value, rowData, rowIndex), rowspan: calculateRowGroupSize(value, rowData, rowIndex)}"></ng-container>
                </ng-container>
                <ng-container *ngIf="dt.groupFooterTemplate && dt.rowGroupMode === 'subheader' && shouldRenderRowGroupFooter(value, rowData, rowIndex)" role="row">
                    <ng-container *ngTemplateOutlet="dt.groupFooterTemplate; context: {$implicit: rowData, rowIndex: dt.paginator ? (dt.first + rowIndex) : rowIndex, columns: columns, editing: (dt.editMode === 'row' && dt.isRowEditing(rowData)), frozen: frozen}"></ng-container>
                </ng-container>
            </ng-template>
        </ng-container>
        <ng-container *ngIf="!dt.expandedRowTemplate && dt.virtualScroll">
            <ng-template cdkVirtualFor let-rowData let-rowIndex="index" [cdkVirtualForOf]="value" [cdkVirtualForTrackBy]="dt.rowTrackBy" [cdkVirtualForTemplateCacheSize]="0">
                <ng-container *ngTemplateOutlet="rowData ? template: dt.loadingBodyTemplate; context: {$implicit: rowData, rowIndex: dt.paginator ? (dt.first + rowIndex) : rowIndex, columns: columns, editing: (dt.editMode === 'row' && dt.isRowEditing(rowData)), frozen: frozen}"></ng-container>
            </ng-template>
        </ng-container>
        <ng-container *ngIf="dt.expandedRowTemplate && !(frozen && dt.frozenExpandedRowTemplate)">
            <ng-template ngFor let-rowData let-rowIndex="index" [ngForOf]="value" [ngForTrackBy]="dt.rowTrackBy">
                <ng-container *ngIf="!dt.groupHeaderTemplate">
                    <ng-container *ngTemplateOutlet="template; context: {$implicit: rowData, rowIndex: dt.paginator ? (dt.first + rowIndex) : rowIndex, columns: columns, expanded: dt.isRowExpanded(rowData), editing: (dt.editMode === 'row' && dt.isRowEditing(rowData)), frozen: frozen}"></ng-container>
                </ng-container>
                <ng-container *ngIf="dt.groupHeaderTemplate && dt.rowGroupMode === 'subheader' && shouldRenderRowGroupHeader(value, rowData, rowIndex)" role="row">
                    <ng-container *ngTemplateOutlet="dt.groupHeaderTemplate; context: {$implicit: rowData, rowIndex: dt.paginator ? (dt.first + rowIndex) : rowIndex, columns: columns, expanded: dt.isRowExpanded(rowData), editing: (dt.editMode === 'row' && dt.isRowEditing(rowData)), frozen: frozen}"></ng-container>
                </ng-container>
                <ng-container *ngIf="dt.isRowExpanded(rowData)">
                    <ng-container *ngTemplateOutlet="dt.expandedRowTemplate; context: {$implicit: rowData, rowIndex: dt.paginator ? (dt.first + rowIndex) : rowIndex, columns: columns, frozen: frozen}"></ng-container>
                    <ng-container *ngIf="dt.groupFooterTemplate && dt.rowGroupMode === 'subheader' && shouldRenderRowGroupFooter(value, rowData, rowIndex)" role="row">
                        <ng-container *ngTemplateOutlet="dt.groupFooterTemplate; context: {$implicit: rowData, rowIndex: dt.paginator ? (dt.first + rowIndex) : rowIndex, columns: columns, expanded: dt.isRowExpanded(rowData), editing: (dt.editMode === 'row' && dt.isRowEditing(rowData)), frozen: frozen}"></ng-container>
                    </ng-container>
                </ng-container>
            </ng-template>
        </ng-container>
        <ng-container *ngIf="dt.frozenExpandedRowTemplate && frozen">
            <ng-template ngFor let-rowData let-rowIndex="index" [ngForOf]="value" [ngForTrackBy]="dt.rowTrackBy">
                <ng-container *ngTemplateOutlet="template; context: {$implicit: rowData, rowIndex: dt.paginator ? (dt.first + rowIndex) : rowIndex, columns: columns, expanded: dt.isRowExpanded(rowData), editing: (dt.editMode === 'row' && dt.isRowEditing(rowData)), frozen: frozen}"></ng-container>
                <ng-container *ngIf="dt.isRowExpanded(rowData)">
                    <ng-container *ngTemplateOutlet="dt.frozenExpandedRowTemplate; context: {$implicit: rowData, rowIndex: dt.paginator ? (dt.first + rowIndex) : rowIndex, columns: columns, frozen: frozen}"></ng-container>
                </ng-container>
            </ng-template>
        </ng-container>
        <ng-container *ngIf="dt.loading">
            <ng-container *ngTemplateOutlet="dt.loadingBodyTemplate; context: {$implicit: columns, frozen: frozen}"></ng-container>
        </ng-container>
        <ng-container *ngIf="dt.isEmpty() && !dt.loading">
            <ng-container *ngTemplateOutlet="dt.emptyMessageTemplate; context: {$implicit: columns, frozen: frozen}"></ng-container>
        </ng-container>
    `, isInline: true, directives: [{ type: i4.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i4.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { type: i4.NgTemplateOutlet, selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet"] }, { type: i3.CdkVirtualForOf, selector: "[cdkVirtualFor][cdkVirtualForOf]", inputs: ["cdkVirtualForOf", "cdkVirtualForTrackBy", "cdkVirtualForTemplate", "cdkVirtualForTemplateCacheSize"] }], changeDetection: i0.ChangeDetectionStrategy.Default, encapsulation: i0.ViewEncapsulation.None });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0, type: TableBody, decorators: [{
            type: Component,
            args: [{
                    selector: '[pTableBody]',
                    template: `
        <ng-container *ngIf="!dt.expandedRowTemplate && !dt.virtualScroll">
            <ng-template ngFor let-rowData let-rowIndex="index" [ngForOf]="value" [ngForTrackBy]="dt.rowTrackBy">
                <ng-container *ngIf="dt.groupHeaderTemplate && dt.rowGroupMode === 'subheader' && shouldRenderRowGroupHeader(value, rowData, rowIndex)" role="row">
                    <ng-container *ngTemplateOutlet="dt.groupHeaderTemplate; context: {$implicit: rowData, rowIndex: dt.paginator ? (dt.first + rowIndex) : rowIndex, columns: columns, editing: (dt.editMode === 'row' && dt.isRowEditing(rowData)), frozen: frozen}"></ng-container>
                </ng-container>
                <ng-container *ngIf="dt.rowGroupMode !== 'rowspan'">
                    <ng-container *ngTemplateOutlet="template; context: {$implicit: rowData, rowIndex: dt.paginator ? (dt.first + rowIndex) : rowIndex, columns: columns, editing: (dt.editMode === 'row' && dt.isRowEditing(rowData)), frozen: frozen}"></ng-container>
                </ng-container>
                <ng-container *ngIf="dt.rowGroupMode === 'rowspan'">
                    <ng-container *ngTemplateOutlet="template; context: {$implicit: rowData, rowIndex: dt.paginator ? (dt.first + rowIndex) : rowIndex, columns: columns, editing: (dt.editMode === 'row' && dt.isRowEditing(rowData)), frozen: frozen, rowgroup: shouldRenderRowspan(value, rowData, rowIndex), rowspan: calculateRowGroupSize(value, rowData, rowIndex)}"></ng-container>
                </ng-container>
                <ng-container *ngIf="dt.groupFooterTemplate && dt.rowGroupMode === 'subheader' && shouldRenderRowGroupFooter(value, rowData, rowIndex)" role="row">
                    <ng-container *ngTemplateOutlet="dt.groupFooterTemplate; context: {$implicit: rowData, rowIndex: dt.paginator ? (dt.first + rowIndex) : rowIndex, columns: columns, editing: (dt.editMode === 'row' && dt.isRowEditing(rowData)), frozen: frozen}"></ng-container>
                </ng-container>
            </ng-template>
        </ng-container>
        <ng-container *ngIf="!dt.expandedRowTemplate && dt.virtualScroll">
            <ng-template cdkVirtualFor let-rowData let-rowIndex="index" [cdkVirtualForOf]="value" [cdkVirtualForTrackBy]="dt.rowTrackBy" [cdkVirtualForTemplateCacheSize]="0">
                <ng-container *ngTemplateOutlet="rowData ? template: dt.loadingBodyTemplate; context: {$implicit: rowData, rowIndex: dt.paginator ? (dt.first + rowIndex) : rowIndex, columns: columns, editing: (dt.editMode === 'row' && dt.isRowEditing(rowData)), frozen: frozen}"></ng-container>
            </ng-template>
        </ng-container>
        <ng-container *ngIf="dt.expandedRowTemplate && !(frozen && dt.frozenExpandedRowTemplate)">
            <ng-template ngFor let-rowData let-rowIndex="index" [ngForOf]="value" [ngForTrackBy]="dt.rowTrackBy">
                <ng-container *ngIf="!dt.groupHeaderTemplate">
                    <ng-container *ngTemplateOutlet="template; context: {$implicit: rowData, rowIndex: dt.paginator ? (dt.first + rowIndex) : rowIndex, columns: columns, expanded: dt.isRowExpanded(rowData), editing: (dt.editMode === 'row' && dt.isRowEditing(rowData)), frozen: frozen}"></ng-container>
                </ng-container>
                <ng-container *ngIf="dt.groupHeaderTemplate && dt.rowGroupMode === 'subheader' && shouldRenderRowGroupHeader(value, rowData, rowIndex)" role="row">
                    <ng-container *ngTemplateOutlet="dt.groupHeaderTemplate; context: {$implicit: rowData, rowIndex: dt.paginator ? (dt.first + rowIndex) : rowIndex, columns: columns, expanded: dt.isRowExpanded(rowData), editing: (dt.editMode === 'row' && dt.isRowEditing(rowData)), frozen: frozen}"></ng-container>
                </ng-container>
                <ng-container *ngIf="dt.isRowExpanded(rowData)">
                    <ng-container *ngTemplateOutlet="dt.expandedRowTemplate; context: {$implicit: rowData, rowIndex: dt.paginator ? (dt.first + rowIndex) : rowIndex, columns: columns, frozen: frozen}"></ng-container>
                    <ng-container *ngIf="dt.groupFooterTemplate && dt.rowGroupMode === 'subheader' && shouldRenderRowGroupFooter(value, rowData, rowIndex)" role="row">
                        <ng-container *ngTemplateOutlet="dt.groupFooterTemplate; context: {$implicit: rowData, rowIndex: dt.paginator ? (dt.first + rowIndex) : rowIndex, columns: columns, expanded: dt.isRowExpanded(rowData), editing: (dt.editMode === 'row' && dt.isRowEditing(rowData)), frozen: frozen}"></ng-container>
                    </ng-container>
                </ng-container>
            </ng-template>
        </ng-container>
        <ng-container *ngIf="dt.frozenExpandedRowTemplate && frozen">
            <ng-template ngFor let-rowData let-rowIndex="index" [ngForOf]="value" [ngForTrackBy]="dt.rowTrackBy">
                <ng-container *ngTemplateOutlet="template; context: {$implicit: rowData, rowIndex: dt.paginator ? (dt.first + rowIndex) : rowIndex, columns: columns, expanded: dt.isRowExpanded(rowData), editing: (dt.editMode === 'row' && dt.isRowEditing(rowData)), frozen: frozen}"></ng-container>
                <ng-container *ngIf="dt.isRowExpanded(rowData)">
                    <ng-container *ngTemplateOutlet="dt.frozenExpandedRowTemplate; context: {$implicit: rowData, rowIndex: dt.paginator ? (dt.first + rowIndex) : rowIndex, columns: columns, frozen: frozen}"></ng-container>
                </ng-container>
            </ng-template>
        </ng-container>
        <ng-container *ngIf="dt.loading">
            <ng-container *ngTemplateOutlet="dt.loadingBodyTemplate; context: {$implicit: columns, frozen: frozen}"></ng-container>
        </ng-container>
        <ng-container *ngIf="dt.isEmpty() && !dt.loading">
            <ng-container *ngTemplateOutlet="dt.emptyMessageTemplate; context: {$implicit: columns, frozen: frozen}"></ng-container>
        </ng-container>
    `,
                    changeDetection: ChangeDetectionStrategy.Default,
                    encapsulation: ViewEncapsulation.None,
                    host: {
                        'class': 'p-element'
                    }
                }]
        }], ctorParameters: function () { return [{ type: Table }, { type: TableService }, { type: i0.ChangeDetectorRef }, { type: i0.ElementRef }]; }, propDecorators: { columns: [{
                type: Input,
                args: ["pTableBody"]
            }], template: [{
                type: Input,
                args: ["pTableBodyTemplate"]
            }], value: [{
                type: Input
            }], frozen: [{
                type: Input
            }], frozenRows: [{
                type: Input
            }] } });
class RowGroupHeader {
    constructor(dt) {
        this.dt = dt;
    }
    get getFrozenRowGroupHeaderStickyPosition() {
        return this.dt.rowGroupHeaderStyleObject ? this.dt.rowGroupHeaderStyleObject.top : '';
    }
}
RowGroupHeader.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0, type: RowGroupHeader, deps: [{ token: Table }], target: i0.ɵɵFactoryTarget.Directive });
RowGroupHeader.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "12.0.5", type: RowGroupHeader, selector: "[pRowGroupHeader]", host: { properties: { "style.top": "getFrozenRowGroupHeaderStickyPosition" }, classAttribute: "p-rowgroup-header p-element" }, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0, type: RowGroupHeader, decorators: [{
            type: Directive,
            args: [{
                    selector: '[pRowGroupHeader]',
                    host: {
                        'class': 'p-rowgroup-header p-element',
                        '[style.top]': "getFrozenRowGroupHeaderStickyPosition"
                    }
                }]
        }], ctorParameters: function () { return [{ type: Table }]; } });
class FrozenColumn {
    constructor(el) {
        this.el = el;
        this.alignFrozen = "left";
        this._frozen = true;
    }
    get frozen() {
        return this._frozen;
    }
    set frozen(val) {
        this._frozen = val;
        this.updateStickyPosition();
    }
    ngAfterViewInit() {
        this.updateStickyPosition();
    }
    updateStickyPosition() {
        if (this._frozen) {
            if (this.alignFrozen === 'right') {
                let right = 0;
                let next = this.el.nativeElement.nextElementSibling;
                if (next) {
                    right = DomHandler.getOuterWidth(next) + parseFloat(next.style.right);
                }
                this.el.nativeElement.style.right = right + 'px';
            }
            else {
                let left = 0;
                let prev = this.el.nativeElement.previousElementSibling;
                if (prev) {
                    left = DomHandler.getOuterWidth(prev) + parseFloat(prev.style.left);
                }
                this.el.nativeElement.style.left = left + 'px';
            }
            let filterRow = this.el.nativeElement.parentElement.nextElementSibling;
            if (filterRow) {
                let index = DomHandler.index(this.el.nativeElement);
                filterRow.children[index].style.left = this.el.nativeElement.style.left;
                filterRow.children[index].style.right = this.el.nativeElement.style.right;
            }
        }
    }
}
FrozenColumn.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0, type: FrozenColumn, deps: [{ token: i0.ElementRef }], target: i0.ɵɵFactoryTarget.Directive });
FrozenColumn.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "12.0.5", type: FrozenColumn, selector: "[pFrozenColumn]", inputs: { frozen: "frozen", alignFrozen: "alignFrozen" }, host: { properties: { "class.p-frozen-column": "frozen" }, classAttribute: "p-element" }, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0, type: FrozenColumn, decorators: [{
            type: Directive,
            args: [{
                    selector: '[pFrozenColumn]',
                    host: {
                        'class': 'p-element',
                        '[class.p-frozen-column]': 'frozen'
                    }
                }]
        }], ctorParameters: function () { return [{ type: i0.ElementRef }]; }, propDecorators: { frozen: [{
                type: Input
            }], alignFrozen: [{
                type: Input
            }] } });
class SortableColumn {
    constructor(dt) {
        this.dt = dt;
        if (this.isEnabled()) {
            this.subscription = this.dt.tableService.sortSource$.subscribe(sortMeta => {
                this.updateSortState();
            });
        }
    }
    ngOnInit() {
        if (this.isEnabled()) {
            this.updateSortState();
        }
    }
    updateSortState() {
        this.sorted = this.dt.isSorted(this.field);
        this.sortOrder = this.sorted ? (this.dt.sortOrder === 1 ? 'ascending' : 'descending') : 'none';
    }
    onClick(event) {
        if (this.isEnabled() && !this.isFilterElement(event.target)) {
            this.updateSortState();
            this.dt.sort({
                originalEvent: event,
                field: this.field
            });
            DomHandler.clearSelection();
        }
    }
    onEnterKey(event) {
        this.onClick(event);
    }
    isEnabled() {
        return this.pSortableColumnDisabled !== true;
    }
    isFilterElement(element) {
        return DomHandler.hasClass(element, 'pi-filter-icon') || DomHandler.hasClass(element, 'p-column-filter-menu-button');
    }
    ngOnDestroy() {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }
}
SortableColumn.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0, type: SortableColumn, deps: [{ token: Table }], target: i0.ɵɵFactoryTarget.Directive });
SortableColumn.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "12.0.5", type: SortableColumn, selector: "[pSortableColumn]", inputs: { field: ["pSortableColumn", "field"], pSortableColumnDisabled: "pSortableColumnDisabled" }, host: { listeners: { "click": "onClick($event)", "keydown.enter": "onEnterKey($event)" }, properties: { "class.p-sortable-column": "isEnabled()", "class.p-highlight": "sorted", "attr.tabindex": "isEnabled() ? \"0\" : null", "attr.role": "\"columnheader\"", "attr.aria-sort": "sortOrder" }, classAttribute: "p-element" }, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0, type: SortableColumn, decorators: [{
            type: Directive,
            args: [{
                    selector: '[pSortableColumn]',
                    host: {
                        'class': 'p-element',
                        '[class.p-sortable-column]': 'isEnabled()',
                        '[class.p-highlight]': 'sorted',
                        '[attr.tabindex]': 'isEnabled() ? "0" : null',
                        '[attr.role]': '"columnheader"',
                        '[attr.aria-sort]': 'sortOrder'
                    }
                }]
        }], ctorParameters: function () { return [{ type: Table }]; }, propDecorators: { field: [{
                type: Input,
                args: ["pSortableColumn"]
            }], pSortableColumnDisabled: [{
                type: Input
            }], onClick: [{
                type: HostListener,
                args: ['click', ['$event']]
            }], onEnterKey: [{
                type: HostListener,
                args: ['keydown.enter', ['$event']]
            }] } });
class SortIcon {
    constructor(dt, cd) {
        this.dt = dt;
        this.cd = cd;
        this.subscription = this.dt.tableService.sortSource$.subscribe(sortMeta => {
            this.updateSortState();
        });
    }
    ngOnInit() {
        this.updateSortState();
    }
    onClick(event) {
        event.preventDefault();
    }
    updateSortState() {
        if (this.dt.sortMode === 'single') {
            this.sortOrder = this.dt.isSorted(this.field) ? this.dt.sortOrder : 0;
        }
        else if (this.dt.sortMode === 'multiple') {
            let sortMeta = this.dt.getSortMeta(this.field);
            this.sortOrder = sortMeta ? sortMeta.order : 0;
        }
        this.cd.markForCheck();
    }
    getMultiSortMetaIndex() {
        let multiSortMeta = this.dt._multiSortMeta;
        let index = -1;
        if (multiSortMeta && this.dt.sortMode === 'multiple' && (this.dt.showInitialSortBadge || multiSortMeta.length > 1)) {
            for (let i = 0; i < multiSortMeta.length; i++) {
                let meta = multiSortMeta[i];
                if (meta.field === this.field || meta.field === this.field) {
                    index = i;
                    break;
                }
            }
        }
        return index;
    }
    isMultiSorted() {
        return this.dt.sortMode === 'multiple' && this.getMultiSortMetaIndex() > -1;
    }
    ngOnDestroy() {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }
}
SortIcon.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0, type: SortIcon, deps: [{ token: Table }, { token: i0.ChangeDetectorRef }], target: i0.ɵɵFactoryTarget.Component });
SortIcon.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.0.5", type: SortIcon, selector: "p-sortIcon", inputs: { field: "field" }, host: { classAttribute: "p-element" }, ngImport: i0, template: `
        <i class="p-sortable-column-icon pi pi-fw" [ngClass]="{'pi-sort-amount-up-alt': sortOrder === 1, 'pi-sort-amount-down': sortOrder === -1, 'pi-sort-alt': sortOrder === 0}"></i>
        <span *ngIf="isMultiSorted()" class="p-sortable-column-badge">{{getMultiSortMetaIndex() + 1}}</span>
    `, isInline: true, directives: [{ type: i4.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { type: i4.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0, type: SortIcon, decorators: [{
            type: Component,
            args: [{
                    selector: 'p-sortIcon',
                    template: `
        <i class="p-sortable-column-icon pi pi-fw" [ngClass]="{'pi-sort-amount-up-alt': sortOrder === 1, 'pi-sort-amount-down': sortOrder === -1, 'pi-sort-alt': sortOrder === 0}"></i>
        <span *ngIf="isMultiSorted()" class="p-sortable-column-badge">{{getMultiSortMetaIndex() + 1}}</span>
    `,
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    encapsulation: ViewEncapsulation.None,
                    host: {
                        'class': 'p-element'
                    }
                }]
        }], ctorParameters: function () { return [{ type: Table }, { type: i0.ChangeDetectorRef }]; }, propDecorators: { field: [{
                type: Input
            }] } });
class SelectableRow {
    constructor(dt, tableService) {
        this.dt = dt;
        this.tableService = tableService;
        if (this.isEnabled()) {
            this.subscription = this.dt.tableService.selectionSource$.subscribe(() => {
                this.selected = this.dt.isSelected(this.data);
            });
        }
    }
    ngOnInit() {
        if (this.isEnabled()) {
            this.selected = this.dt.isSelected(this.data);
        }
    }
    onClick(event) {
        if (this.isEnabled()) {
            this.dt.handleRowClick({
                originalEvent: event,
                rowData: this.data,
                rowIndex: this.index
            });
        }
    }
    onTouchEnd(event) {
        if (this.isEnabled()) {
            this.dt.handleRowTouchEnd(event);
        }
    }
    onArrowDownKeyDown(event) {
        if (!this.isEnabled()) {
            return;
        }
        const row = event.currentTarget;
        const nextRow = this.findNextSelectableRow(row);
        if (nextRow) {
            nextRow.focus();
        }
        event.preventDefault();
    }
    onArrowUpKeyDown(event) {
        if (!this.isEnabled()) {
            return;
        }
        const row = event.currentTarget;
        const prevRow = this.findPrevSelectableRow(row);
        if (prevRow) {
            prevRow.focus();
        }
        event.preventDefault();
    }
    onEnterKeyDown(event) {
        if (!this.isEnabled()) {
            return;
        }
        this.dt.handleRowClick({
            originalEvent: event,
            rowData: this.data,
            rowIndex: this.index
        });
    }
    onPageDownKeyDown() {
        if (this.dt.virtualScroll) {
            this.dt.virtualScrollBody.elementRef.nativeElement.focus();
        }
    }
    onSpaceKeydown() {
        if (this.dt.virtualScroll && !this.dt.editingCell) {
            this.dt.virtualScrollBody.elementRef.nativeElement.focus();
        }
    }
    findNextSelectableRow(row) {
        let nextRow = row.nextElementSibling;
        if (nextRow) {
            if (DomHandler.hasClass(nextRow, 'p-selectable-row'))
                return nextRow;
            else
                return this.findNextSelectableRow(nextRow);
        }
        else {
            return null;
        }
    }
    findPrevSelectableRow(row) {
        let prevRow = row.previousElementSibling;
        if (prevRow) {
            if (DomHandler.hasClass(prevRow, 'p-selectable-row'))
                return prevRow;
            else
                return this.findPrevSelectableRow(prevRow);
        }
        else {
            return null;
        }
    }
    isEnabled() {
        return this.pSelectableRowDisabled !== true;
    }
    ngOnDestroy() {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }
}
SelectableRow.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0, type: SelectableRow, deps: [{ token: Table }, { token: TableService }], target: i0.ɵɵFactoryTarget.Directive });
SelectableRow.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "12.0.5", type: SelectableRow, selector: "[pSelectableRow]", inputs: { data: ["pSelectableRow", "data"], index: ["pSelectableRowIndex", "index"], pSelectableRowDisabled: "pSelectableRowDisabled" }, host: { listeners: { "click": "onClick($event)", "touchend": "onTouchEnd($event)", "keydown.arrowdown": "onArrowDownKeyDown($event)", "keydown.arrowup": "onArrowUpKeyDown($event)", "keydown.enter": "onEnterKeyDown($event)", "keydown.shift.enter": "onEnterKeyDown($event)", "keydown.meta.enter": "onEnterKeyDown($event)", "keydown.pagedown": "onPageDownKeyDown()", "keydown.pageup": "onPageDownKeyDown()", "keydown.home": "onPageDownKeyDown()", "keydown.end": "onPageDownKeyDown()", "keydown.space": "onSpaceKeydown()" }, properties: { "class.p-selectable-row": "isEnabled()", "class.p-highlight": "selected", "attr.tabindex": "isEnabled() ? 0 : undefined" }, classAttribute: "p-element" }, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0, type: SelectableRow, decorators: [{
            type: Directive,
            args: [{
                    selector: '[pSelectableRow]',
                    host: {
                        'class': 'p-element',
                        '[class.p-selectable-row]': 'isEnabled()',
                        '[class.p-highlight]': 'selected',
                        '[attr.tabindex]': 'isEnabled() ? 0 : undefined'
                    }
                }]
        }], ctorParameters: function () { return [{ type: Table }, { type: TableService }]; }, propDecorators: { data: [{
                type: Input,
                args: ["pSelectableRow"]
            }], index: [{
                type: Input,
                args: ["pSelectableRowIndex"]
            }], pSelectableRowDisabled: [{
                type: Input
            }], onClick: [{
                type: HostListener,
                args: ['click', ['$event']]
            }], onTouchEnd: [{
                type: HostListener,
                args: ['touchend', ['$event']]
            }], onArrowDownKeyDown: [{
                type: HostListener,
                args: ['keydown.arrowdown', ['$event']]
            }], onArrowUpKeyDown: [{
                type: HostListener,
                args: ['keydown.arrowup', ['$event']]
            }], onEnterKeyDown: [{
                type: HostListener,
                args: ['keydown.enter', ['$event']]
            }, {
                type: HostListener,
                args: ['keydown.shift.enter', ['$event']]
            }, {
                type: HostListener,
                args: ['keydown.meta.enter', ['$event']]
            }], onPageDownKeyDown: [{
                type: HostListener,
                args: ['keydown.pagedown']
            }, {
                type: HostListener,
                args: ['keydown.pageup']
            }, {
                type: HostListener,
                args: ['keydown.home']
            }, {
                type: HostListener,
                args: ['keydown.end']
            }], onSpaceKeydown: [{
                type: HostListener,
                args: ['keydown.space']
            }] } });
class SelectableRowDblClick {
    constructor(dt, tableService) {
        this.dt = dt;
        this.tableService = tableService;
        if (this.isEnabled()) {
            this.subscription = this.dt.tableService.selectionSource$.subscribe(() => {
                this.selected = this.dt.isSelected(this.data);
            });
        }
    }
    ngOnInit() {
        if (this.isEnabled()) {
            this.selected = this.dt.isSelected(this.data);
        }
    }
    onClick(event) {
        if (this.isEnabled()) {
            this.dt.handleRowClick({
                originalEvent: event,
                rowData: this.data,
                rowIndex: this.index
            });
        }
    }
    isEnabled() {
        return this.pSelectableRowDisabled !== true;
    }
    ngOnDestroy() {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }
}
SelectableRowDblClick.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0, type: SelectableRowDblClick, deps: [{ token: Table }, { token: TableService }], target: i0.ɵɵFactoryTarget.Directive });
SelectableRowDblClick.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "12.0.5", type: SelectableRowDblClick, selector: "[pSelectableRowDblClick]", inputs: { data: ["pSelectableRowDblClick", "data"], index: ["pSelectableRowIndex", "index"], pSelectableRowDisabled: "pSelectableRowDisabled" }, host: { listeners: { "dblclick": "onClick($event)" }, properties: { "class.p-selectable-row": "isEnabled()", "class.p-highlight": "selected" }, classAttribute: "p-element" }, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0, type: SelectableRowDblClick, decorators: [{
            type: Directive,
            args: [{
                    selector: '[pSelectableRowDblClick]',
                    host: {
                        'class': 'p-element',
                        '[class.p-selectable-row]': 'isEnabled()',
                        '[class.p-highlight]': 'selected'
                    }
                }]
        }], ctorParameters: function () { return [{ type: Table }, { type: TableService }]; }, propDecorators: { data: [{
                type: Input,
                args: ["pSelectableRowDblClick"]
            }], index: [{
                type: Input,
                args: ["pSelectableRowIndex"]
            }], pSelectableRowDisabled: [{
                type: Input
            }], onClick: [{
                type: HostListener,
                args: ['dblclick', ['$event']]
            }] } });
class ContextMenuRow {
    constructor(dt, tableService, el) {
        this.dt = dt;
        this.tableService = tableService;
        this.el = el;
        if (this.isEnabled()) {
            this.subscription = this.dt.tableService.contextMenuSource$.subscribe((data) => {
                this.selected = this.dt.equals(this.data, data);
            });
        }
    }
    onContextMenu(event) {
        if (this.isEnabled()) {
            this.dt.handleRowRightClick({
                originalEvent: event,
                rowData: this.data,
                rowIndex: this.index
            });
            this.el.nativeElement.focus();
            event.preventDefault();
        }
    }
    isEnabled() {
        return this.pContextMenuRowDisabled !== true;
    }
    ngOnDestroy() {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }
}
ContextMenuRow.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0, type: ContextMenuRow, deps: [{ token: Table }, { token: TableService }, { token: i0.ElementRef }], target: i0.ɵɵFactoryTarget.Directive });
ContextMenuRow.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "12.0.5", type: ContextMenuRow, selector: "[pContextMenuRow]", inputs: { data: ["pContextMenuRow", "data"], index: ["pContextMenuRowIndex", "index"], pContextMenuRowDisabled: "pContextMenuRowDisabled" }, host: { listeners: { "contextmenu": "onContextMenu($event)" }, properties: { "class.p-highlight-contextmenu": "selected", "attr.tabindex": "isEnabled() ? 0 : undefined" }, classAttribute: "p-element" }, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0, type: ContextMenuRow, decorators: [{
            type: Directive,
            args: [{
                    selector: '[pContextMenuRow]',
                    host: {
                        'class': 'p-element',
                        '[class.p-highlight-contextmenu]': 'selected',
                        '[attr.tabindex]': 'isEnabled() ? 0 : undefined'
                    }
                }]
        }], ctorParameters: function () { return [{ type: Table }, { type: TableService }, { type: i0.ElementRef }]; }, propDecorators: { data: [{
                type: Input,
                args: ["pContextMenuRow"]
            }], index: [{
                type: Input,
                args: ["pContextMenuRowIndex"]
            }], pContextMenuRowDisabled: [{
                type: Input
            }], onContextMenu: [{
                type: HostListener,
                args: ['contextmenu', ['$event']]
            }] } });
class RowToggler {
    constructor(dt) {
        this.dt = dt;
    }
    onClick(event) {
        if (this.isEnabled()) {
            this.dt.toggleRow(this.data, event);
            event.preventDefault();
        }
    }
    isEnabled() {
        return this.pRowTogglerDisabled !== true;
    }
}
RowToggler.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0, type: RowToggler, deps: [{ token: Table }], target: i0.ɵɵFactoryTarget.Directive });
RowToggler.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "12.0.5", type: RowToggler, selector: "[pRowToggler]", inputs: { data: ["pRowToggler", "data"], pRowTogglerDisabled: "pRowTogglerDisabled" }, host: { listeners: { "click": "onClick($event)" }, classAttribute: "p-element" }, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0, type: RowToggler, decorators: [{
            type: Directive,
            args: [{
                    selector: '[pRowToggler]',
                    host: {
                        'class': 'p-element'
                    }
                }]
        }], ctorParameters: function () { return [{ type: Table }]; }, propDecorators: { data: [{
                type: Input,
                args: ['pRowToggler']
            }], pRowTogglerDisabled: [{
                type: Input
            }], onClick: [{
                type: HostListener,
                args: ['click', ['$event']]
            }] } });
class ResizableColumn {
    constructor(dt, el, zone) {
        this.dt = dt;
        this.el = el;
        this.zone = zone;
    }
    ngAfterViewInit() {
        if (this.isEnabled()) {
            DomHandler.addClass(this.el.nativeElement, 'p-resizable-column');
            this.resizer = document.createElement('span');
            this.resizer.className = 'p-column-resizer';
            this.el.nativeElement.appendChild(this.resizer);
            this.zone.runOutsideAngular(() => {
                this.resizerMouseDownListener = this.onMouseDown.bind(this);
                this.resizer.addEventListener('mousedown', this.resizerMouseDownListener);
            });
        }
    }
    bindDocumentEvents() {
        this.zone.runOutsideAngular(() => {
            this.documentMouseMoveListener = this.onDocumentMouseMove.bind(this);
            document.addEventListener('mousemove', this.documentMouseMoveListener);
            this.documentMouseUpListener = this.onDocumentMouseUp.bind(this);
            document.addEventListener('mouseup', this.documentMouseUpListener);
        });
    }
    unbindDocumentEvents() {
        if (this.documentMouseMoveListener) {
            document.removeEventListener('mousemove', this.documentMouseMoveListener);
            this.documentMouseMoveListener = null;
        }
        if (this.documentMouseUpListener) {
            document.removeEventListener('mouseup', this.documentMouseUpListener);
            this.documentMouseUpListener = null;
        }
    }
    onMouseDown(event) {
        if (event.which === 1) {
            this.dt.onColumnResizeBegin(event);
            this.bindDocumentEvents();
        }
    }
    onDocumentMouseMove(event) {
        this.dt.onColumnResize(event);
    }
    onDocumentMouseUp(event) {
        this.dt.onColumnResizeEnd();
        this.unbindDocumentEvents();
    }
    isEnabled() {
        return this.pResizableColumnDisabled !== true;
    }
    ngOnDestroy() {
        if (this.resizerMouseDownListener) {
            this.resizer.removeEventListener('mousedown', this.resizerMouseDownListener);
        }
        this.unbindDocumentEvents();
    }
}
ResizableColumn.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0, type: ResizableColumn, deps: [{ token: Table }, { token: i0.ElementRef }, { token: i0.NgZone }], target: i0.ɵɵFactoryTarget.Directive });
ResizableColumn.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "12.0.5", type: ResizableColumn, selector: "[pResizableColumn]", inputs: { pResizableColumnDisabled: "pResizableColumnDisabled" }, host: { classAttribute: "p-element" }, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0, type: ResizableColumn, decorators: [{
            type: Directive,
            args: [{
                    selector: '[pResizableColumn]',
                    host: {
                        'class': 'p-element'
                    }
                }]
        }], ctorParameters: function () { return [{ type: Table }, { type: i0.ElementRef }, { type: i0.NgZone }]; }, propDecorators: { pResizableColumnDisabled: [{
                type: Input
            }] } });
class ReorderableColumn {
    constructor(dt, el, zone) {
        this.dt = dt;
        this.el = el;
        this.zone = zone;
    }
    ngAfterViewInit() {
        if (this.isEnabled()) {
            this.bindEvents();
        }
    }
    bindEvents() {
        this.zone.runOutsideAngular(() => {
            this.mouseDownListener = this.onMouseDown.bind(this);
            this.el.nativeElement.addEventListener('mousedown', this.mouseDownListener);
            this.dragStartListener = this.onDragStart.bind(this);
            this.el.nativeElement.addEventListener('dragstart', this.dragStartListener);
            this.dragOverListener = this.onDragEnter.bind(this);
            this.el.nativeElement.addEventListener('dragover', this.dragOverListener);
            this.dragEnterListener = this.onDragEnter.bind(this);
            this.el.nativeElement.addEventListener('dragenter', this.dragEnterListener);
            this.dragLeaveListener = this.onDragLeave.bind(this);
            this.el.nativeElement.addEventListener('dragleave', this.dragLeaveListener);
        });
    }
    unbindEvents() {
        if (this.mouseDownListener) {
            document.removeEventListener('mousedown', this.mouseDownListener);
            this.mouseDownListener = null;
        }
        if (this.dragOverListener) {
            document.removeEventListener('dragover', this.dragOverListener);
            this.dragOverListener = null;
        }
        if (this.dragEnterListener) {
            document.removeEventListener('dragenter', this.dragEnterListener);
            this.dragEnterListener = null;
        }
        if (this.dragEnterListener) {
            document.removeEventListener('dragenter', this.dragEnterListener);
            this.dragEnterListener = null;
        }
        if (this.dragLeaveListener) {
            document.removeEventListener('dragleave', this.dragLeaveListener);
            this.dragLeaveListener = null;
        }
    }
    onMouseDown(event) {
        if (event.target.nodeName === 'INPUT' || event.target.nodeName === 'TEXTAREA' || DomHandler.hasClass(event.target, 'p-column-resizer'))
            this.el.nativeElement.draggable = false;
        else
            this.el.nativeElement.draggable = true;
    }
    onDragStart(event) {
        this.dt.onColumnDragStart(event, this.el.nativeElement);
    }
    onDragOver(event) {
        event.preventDefault();
    }
    onDragEnter(event) {
        this.dt.onColumnDragEnter(event, this.el.nativeElement);
    }
    onDragLeave(event) {
        this.dt.onColumnDragLeave(event);
    }
    onDrop(event) {
        if (this.isEnabled()) {
            this.dt.onColumnDrop(event, this.el.nativeElement);
        }
    }
    isEnabled() {
        return this.pReorderableColumnDisabled !== true;
    }
    ngOnDestroy() {
        this.unbindEvents();
    }
}
ReorderableColumn.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0, type: ReorderableColumn, deps: [{ token: Table }, { token: i0.ElementRef }, { token: i0.NgZone }], target: i0.ɵɵFactoryTarget.Directive });
ReorderableColumn.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "12.0.5", type: ReorderableColumn, selector: "[pReorderableColumn]", inputs: { pReorderableColumnDisabled: "pReorderableColumnDisabled" }, host: { listeners: { "drop": "onDrop($event)" }, classAttribute: "p-element" }, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0, type: ReorderableColumn, decorators: [{
            type: Directive,
            args: [{
                    selector: '[pReorderableColumn]',
                    host: {
                        'class': 'p-element'
                    }
                }]
        }], ctorParameters: function () { return [{ type: Table }, { type: i0.ElementRef }, { type: i0.NgZone }]; }, propDecorators: { pReorderableColumnDisabled: [{
                type: Input
            }], onDrop: [{
                type: HostListener,
                args: ['drop', ['$event']]
            }] } });
class EditableColumn {
    constructor(dt, el, zone) {
        this.dt = dt;
        this.el = el;
        this.zone = zone;
    }
    ngAfterViewInit() {
        if (this.isEnabled()) {
            DomHandler.addClass(this.el.nativeElement, 'p-editable-column');
        }
    }
    onClick(event) {
        if (this.isEnabled()) {
            this.dt.selfClick = true;
            if (this.dt.editingCell) {
                if (this.dt.editingCell !== this.el.nativeElement) {
                    if (!this.dt.isEditingCellValid()) {
                        return;
                    }
                    this.closeEditingCell(true, event);
                    this.openCell();
                }
            }
            else {
                this.openCell();
            }
        }
    }
    openCell() {
        this.dt.updateEditingCell(this.el.nativeElement, this.data, this.field, this.rowIndex);
        DomHandler.addClass(this.el.nativeElement, 'p-cell-editing');
        this.dt.onEditInit.emit({ field: this.field, data: this.data, index: this.rowIndex });
        this.zone.runOutsideAngular(() => {
            setTimeout(() => {
                let focusCellSelector = this.pFocusCellSelector || 'input, textarea, select';
                let focusableElement = DomHandler.findSingle(this.el.nativeElement, focusCellSelector);
                if (focusableElement) {
                    focusableElement.focus();
                }
            }, 50);
        });
        this.overlayEventListener = (e) => {
            if (this.el && this.el.nativeElement.contains(e.target)) {
                this.dt.selfClick = true;
            }
        };
        this.dt.overlaySubscription = this.dt.overlayService.clickObservable.subscribe(this.overlayEventListener);
    }
    closeEditingCell(completed, event) {
        if (completed)
            this.dt.onEditComplete.emit({ field: this.dt.editingCellField, data: this.dt.editingCellData, originalEvent: event, index: this.dt.editingCellRowIndex });
        else
            this.dt.onEditCancel.emit({ field: this.dt.editingCellField, data: this.dt.editingCellData, originalEvent: event, index: this.dt.editingCellRowIndex });
        DomHandler.removeClass(this.dt.editingCell, 'p-cell-editing');
        this.dt.editingCell = null;
        this.dt.editingCellData = null;
        this.dt.editingCellField = null;
        this.dt.unbindDocumentEditListener();
        if (this.dt.overlaySubscription) {
            this.dt.overlaySubscription.unsubscribe();
        }
    }
    onEnterKeyDown(event) {
        if (this.isEnabled()) {
            if (this.dt.isEditingCellValid()) {
                this.closeEditingCell(true, event);
            }
            event.preventDefault();
        }
    }
    onEscapeKeyDown(event) {
        if (this.isEnabled()) {
            if (this.dt.isEditingCellValid()) {
                this.closeEditingCell(false, event);
            }
            event.preventDefault();
        }
    }
    onShiftKeyDown(event) {
        if (this.isEnabled()) {
            if (event.shiftKey)
                this.moveToPreviousCell(event);
            else {
                this.moveToNextCell(event);
            }
        }
    }
    onArrowDown(event) {
        if (this.isEnabled()) {
            let currentCell = this.findCell(event.target);
            if (currentCell) {
                let cellIndex = DomHandler.index(currentCell);
                let targetCell = this.findNextEditableColumnByIndex(currentCell, cellIndex);
                if (targetCell) {
                    if (this.dt.isEditingCellValid()) {
                        this.closeEditingCell(true, event);
                    }
                    DomHandler.invokeElementMethod(event.target, 'blur');
                    DomHandler.invokeElementMethod(targetCell, 'click');
                }
                event.preventDefault();
            }
        }
    }
    onArrowUp(event) {
        if (this.isEnabled()) {
            let currentCell = this.findCell(event.target);
            if (currentCell) {
                let cellIndex = DomHandler.index(currentCell);
                let targetCell = this.findPrevEditableColumnByIndex(currentCell, cellIndex);
                if (targetCell) {
                    if (this.dt.isEditingCellValid()) {
                        this.closeEditingCell(true, event);
                    }
                    DomHandler.invokeElementMethod(event.target, 'blur');
                    DomHandler.invokeElementMethod(targetCell, 'click');
                }
                event.preventDefault();
            }
        }
    }
    onArrowLeft(event) {
        if (this.isEnabled()) {
            this.moveToPreviousCell(event);
        }
    }
    onArrowRight(event) {
        if (this.isEnabled()) {
            this.moveToNextCell(event);
        }
    }
    findCell(element) {
        if (element) {
            let cell = element;
            while (cell && !DomHandler.hasClass(cell, 'p-cell-editing')) {
                cell = cell.parentElement;
            }
            return cell;
        }
        else {
            return null;
        }
    }
    moveToPreviousCell(event) {
        let currentCell = this.findCell(event.target);
        if (currentCell) {
            let targetCell = this.findPreviousEditableColumn(currentCell);
            if (targetCell) {
                if (this.dt.isEditingCellValid()) {
                    this.closeEditingCell(true, event);
                }
                DomHandler.invokeElementMethod(event.target, 'blur');
                DomHandler.invokeElementMethod(targetCell, 'click');
                event.preventDefault();
            }
        }
    }
    moveToNextCell(event) {
        let currentCell = this.findCell(event.target);
        if (currentCell) {
            let targetCell = this.findNextEditableColumn(currentCell);
            if (targetCell) {
                if (this.dt.isEditingCellValid()) {
                    this.closeEditingCell(true, event);
                }
                DomHandler.invokeElementMethod(event.target, 'blur');
                DomHandler.invokeElementMethod(targetCell, 'click');
                event.preventDefault();
            }
        }
    }
    findPreviousEditableColumn(cell) {
        let prevCell = cell.previousElementSibling;
        if (!prevCell) {
            let previousRow = cell.parentElement.previousElementSibling;
            if (previousRow) {
                prevCell = previousRow.lastElementChild;
            }
        }
        if (prevCell) {
            if (DomHandler.hasClass(prevCell, 'p-editable-column'))
                return prevCell;
            else
                return this.findPreviousEditableColumn(prevCell);
        }
        else {
            return null;
        }
    }
    findNextEditableColumn(cell) {
        let nextCell = cell.nextElementSibling;
        if (!nextCell) {
            let nextRow = cell.parentElement.nextElementSibling;
            if (nextRow) {
                nextCell = nextRow.firstElementChild;
            }
        }
        if (nextCell) {
            if (DomHandler.hasClass(nextCell, 'p-editable-column'))
                return nextCell;
            else
                return this.findNextEditableColumn(nextCell);
        }
        else {
            return null;
        }
    }
    findNextEditableColumnByIndex(cell, index) {
        let nextRow = cell.parentElement.nextElementSibling;
        if (nextRow) {
            let nextCell = nextRow.children[index];
            if (nextCell && DomHandler.hasClass(nextCell, 'p-editable-column')) {
                return nextCell;
            }
            return null;
        }
        else {
            return null;
        }
    }
    findPrevEditableColumnByIndex(cell, index) {
        let prevRow = cell.parentElement.previousElementSibling;
        if (prevRow) {
            let prevCell = prevRow.children[index];
            if (prevCell && DomHandler.hasClass(prevCell, 'p-editable-column')) {
                return prevCell;
            }
            return null;
        }
        else {
            return null;
        }
    }
    isEnabled() {
        return this.pEditableColumnDisabled !== true;
    }
    ngOnDestroy() {
        if (this.dt.overlaySubscription) {
            this.dt.overlaySubscription.unsubscribe();
        }
    }
}
EditableColumn.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0, type: EditableColumn, deps: [{ token: Table }, { token: i0.ElementRef }, { token: i0.NgZone }], target: i0.ɵɵFactoryTarget.Directive });
EditableColumn.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "12.0.5", type: EditableColumn, selector: "[pEditableColumn]", inputs: { data: ["pEditableColumn", "data"], field: ["pEditableColumnField", "field"], rowIndex: ["pEditableColumnRowIndex", "rowIndex"], pEditableColumnDisabled: "pEditableColumnDisabled", pFocusCellSelector: "pFocusCellSelector" }, host: { listeners: { "click": "onClick($event)", "keydown.enter": "onEnterKeyDown($event)", "keydown.escape": "onEscapeKeyDown($event)", "keydown.tab": "onShiftKeyDown($event)", "keydown.shift.tab": "onShiftKeyDown($event)", "keydown.meta.tab": "onShiftKeyDown($event)", "keydown.arrowdown": "onArrowDown($event)", "keydown.arrowup": "onArrowUp($event)", "keydown.arrowleft": "onArrowLeft($event)", "keydown.arrowright": "onArrowRight($event)" }, classAttribute: "p-element" }, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0, type: EditableColumn, decorators: [{
            type: Directive,
            args: [{
                    selector: '[pEditableColumn]',
                    host: {
                        'class': 'p-element'
                    }
                }]
        }], ctorParameters: function () { return [{ type: Table }, { type: i0.ElementRef }, { type: i0.NgZone }]; }, propDecorators: { data: [{
                type: Input,
                args: ["pEditableColumn"]
            }], field: [{
                type: Input,
                args: ["pEditableColumnField"]
            }], rowIndex: [{
                type: Input,
                args: ["pEditableColumnRowIndex"]
            }], pEditableColumnDisabled: [{
                type: Input
            }], pFocusCellSelector: [{
                type: Input
            }], onClick: [{
                type: HostListener,
                args: ['click', ['$event']]
            }], onEnterKeyDown: [{
                type: HostListener,
                args: ['keydown.enter', ['$event']]
            }], onEscapeKeyDown: [{
                type: HostListener,
                args: ['keydown.escape', ['$event']]
            }], onShiftKeyDown: [{
                type: HostListener,
                args: ['keydown.tab', ['$event']]
            }, {
                type: HostListener,
                args: ['keydown.shift.tab', ['$event']]
            }, {
                type: HostListener,
                args: ['keydown.meta.tab', ['$event']]
            }], onArrowDown: [{
                type: HostListener,
                args: ['keydown.arrowdown', ['$event']]
            }], onArrowUp: [{
                type: HostListener,
                args: ['keydown.arrowup', ['$event']]
            }], onArrowLeft: [{
                type: HostListener,
                args: ['keydown.arrowleft', ['$event']]
            }], onArrowRight: [{
                type: HostListener,
                args: ['keydown.arrowright', ['$event']]
            }] } });
class EditableRow {
    constructor(el) {
        this.el = el;
    }
    isEnabled() {
        return this.pEditableRowDisabled !== true;
    }
}
EditableRow.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0, type: EditableRow, deps: [{ token: i0.ElementRef }], target: i0.ɵɵFactoryTarget.Directive });
EditableRow.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "12.0.5", type: EditableRow, selector: "[pEditableRow]", inputs: { data: ["pEditableRow", "data"], pEditableRowDisabled: "pEditableRowDisabled" }, host: { classAttribute: "p-element" }, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0, type: EditableRow, decorators: [{
            type: Directive,
            args: [{
                    selector: '[pEditableRow]',
                    host: {
                        'class': 'p-element'
                    }
                }]
        }], ctorParameters: function () { return [{ type: i0.ElementRef }]; }, propDecorators: { data: [{
                type: Input,
                args: ["pEditableRow"]
            }], pEditableRowDisabled: [{
                type: Input
            }] } });
class InitEditableRow {
    constructor(dt, editableRow) {
        this.dt = dt;
        this.editableRow = editableRow;
    }
    onClick(event) {
        this.dt.initRowEdit(this.editableRow.data);
        event.preventDefault();
    }
}
InitEditableRow.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0, type: InitEditableRow, deps: [{ token: Table }, { token: EditableRow }], target: i0.ɵɵFactoryTarget.Directive });
InitEditableRow.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "12.0.5", type: InitEditableRow, selector: "[pInitEditableRow]", host: { listeners: { "click": "onClick($event)" }, classAttribute: "p-element" }, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0, type: InitEditableRow, decorators: [{
            type: Directive,
            args: [{
                    selector: '[pInitEditableRow]',
                    host: {
                        'class': 'p-element'
                    }
                }]
        }], ctorParameters: function () { return [{ type: Table }, { type: EditableRow }]; }, propDecorators: { onClick: [{
                type: HostListener,
                args: ['click', ['$event']]
            }] } });
class SaveEditableRow {
    constructor(dt, editableRow) {
        this.dt = dt;
        this.editableRow = editableRow;
    }
    onClick(event) {
        this.dt.saveRowEdit(this.editableRow.data, this.editableRow.el.nativeElement);
        event.preventDefault();
    }
}
SaveEditableRow.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0, type: SaveEditableRow, deps: [{ token: Table }, { token: EditableRow }], target: i0.ɵɵFactoryTarget.Directive });
SaveEditableRow.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "12.0.5", type: SaveEditableRow, selector: "[pSaveEditableRow]", host: { listeners: { "click": "onClick($event)" }, classAttribute: "p-element" }, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0, type: SaveEditableRow, decorators: [{
            type: Directive,
            args: [{
                    selector: '[pSaveEditableRow]',
                    host: {
                        'class': 'p-element'
                    }
                }]
        }], ctorParameters: function () { return [{ type: Table }, { type: EditableRow }]; }, propDecorators: { onClick: [{
                type: HostListener,
                args: ['click', ['$event']]
            }] } });
class CancelEditableRow {
    constructor(dt, editableRow) {
        this.dt = dt;
        this.editableRow = editableRow;
    }
    onClick(event) {
        this.dt.cancelRowEdit(this.editableRow.data);
        event.preventDefault();
    }
}
CancelEditableRow.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0, type: CancelEditableRow, deps: [{ token: Table }, { token: EditableRow }], target: i0.ɵɵFactoryTarget.Directive });
CancelEditableRow.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "12.0.5", type: CancelEditableRow, selector: "[pCancelEditableRow]", host: { listeners: { "click": "onClick($event)" }, classAttribute: "p-element" }, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0, type: CancelEditableRow, decorators: [{
            type: Directive,
            args: [{
                    selector: '[pCancelEditableRow]',
                    host: {
                        'class': 'p-element'
                    }
                }]
        }], ctorParameters: function () { return [{ type: Table }, { type: EditableRow }]; }, propDecorators: { onClick: [{
                type: HostListener,
                args: ['click', ['$event']]
            }] } });
class CellEditor {
    constructor(dt, editableColumn, editableRow) {
        this.dt = dt;
        this.editableColumn = editableColumn;
        this.editableRow = editableRow;
    }
    ngAfterContentInit() {
        this.templates.forEach((item) => {
            switch (item.getType()) {
                case 'input':
                    this.inputTemplate = item.template;
                    break;
                case 'output':
                    this.outputTemplate = item.template;
                    break;
            }
        });
    }
    get editing() {
        return (this.dt.editingCell && this.editableColumn && this.dt.editingCell === this.editableColumn.el.nativeElement) ||
            (this.editableRow && this.dt.editMode === 'row' && this.dt.isRowEditing(this.editableRow.data));
    }
}
CellEditor.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0, type: CellEditor, deps: [{ token: Table }, { token: EditableColumn, optional: true }, { token: EditableRow, optional: true }], target: i0.ɵɵFactoryTarget.Component });
CellEditor.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.0.5", type: CellEditor, selector: "p-cellEditor", host: { classAttribute: "p-element" }, queries: [{ propertyName: "templates", predicate: PrimeTemplate }], ngImport: i0, template: `
        <ng-container *ngIf="editing">
            <ng-container *ngTemplateOutlet="inputTemplate"></ng-container>
        </ng-container>
        <ng-container *ngIf="!editing">
            <ng-container *ngTemplateOutlet="outputTemplate"></ng-container>
        </ng-container>
    `, isInline: true, directives: [{ type: i4.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i4.NgTemplateOutlet, selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet"] }], encapsulation: i0.ViewEncapsulation.None });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0, type: CellEditor, decorators: [{
            type: Component,
            args: [{
                    selector: 'p-cellEditor',
                    template: `
        <ng-container *ngIf="editing">
            <ng-container *ngTemplateOutlet="inputTemplate"></ng-container>
        </ng-container>
        <ng-container *ngIf="!editing">
            <ng-container *ngTemplateOutlet="outputTemplate"></ng-container>
        </ng-container>
    `,
                    encapsulation: ViewEncapsulation.None,
                    host: {
                        'class': 'p-element'
                    }
                }]
        }], ctorParameters: function () { return [{ type: Table }, { type: EditableColumn, decorators: [{
                    type: Optional
                }] }, { type: EditableRow, decorators: [{
                    type: Optional
                }] }]; }, propDecorators: { templates: [{
                type: ContentChildren,
                args: [PrimeTemplate]
            }] } });
class TableRadioButton {
    constructor(dt, tableService, cd) {
        this.dt = dt;
        this.tableService = tableService;
        this.cd = cd;
        this.subscription = this.dt.tableService.selectionSource$.subscribe(() => {
            this.checked = this.dt.isSelected(this.value);
            this.cd.markForCheck();
        });
    }
    ngOnInit() {
        this.checked = this.dt.isSelected(this.value);
    }
    onClick(event) {
        if (!this.disabled) {
            this.dt.toggleRowWithRadio({
                originalEvent: event,
                rowIndex: this.index
            }, this.value);
        }
        DomHandler.clearSelection();
    }
    onFocus() {
        DomHandler.addClass(this.boxViewChild.nativeElement, 'p-focus');
    }
    onBlur() {
        DomHandler.removeClass(this.boxViewChild.nativeElement, 'p-focus');
    }
    ngOnDestroy() {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }
}
TableRadioButton.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0, type: TableRadioButton, deps: [{ token: Table }, { token: TableService }, { token: i0.ChangeDetectorRef }], target: i0.ɵɵFactoryTarget.Component });
TableRadioButton.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.0.5", type: TableRadioButton, selector: "p-tableRadioButton", inputs: { disabled: "disabled", value: "value", index: "index", inputId: "inputId", name: "name", ariaLabel: "ariaLabel" }, host: { classAttribute: "p-element" }, viewQueries: [{ propertyName: "boxViewChild", first: true, predicate: ["box"], descendants: true }], ngImport: i0, template: `
        <div class="p-radiobutton p-component" (click)="onClick($event)">
            <div class="p-hidden-accessible">
                <input type="radio" [attr.id]="inputId" [attr.name]="name" [checked]="checked" (focus)="onFocus()" (blur)="onBlur()"
                [disabled]="disabled" [attr.aria-label]="ariaLabel">
            </div>
            <div #box [ngClass]="{'p-radiobutton-box p-component':true, 'p-highlight':checked, 'p-disabled':disabled}" role="radio" [attr.aria-checked]="checked">
                <div class="p-radiobutton-icon"></div>
            </div>
        </div>
    `, isInline: true, directives: [{ type: i4.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0, type: TableRadioButton, decorators: [{
            type: Component,
            args: [{
                    selector: 'p-tableRadioButton',
                    template: `
        <div class="p-radiobutton p-component" (click)="onClick($event)">
            <div class="p-hidden-accessible">
                <input type="radio" [attr.id]="inputId" [attr.name]="name" [checked]="checked" (focus)="onFocus()" (blur)="onBlur()"
                [disabled]="disabled" [attr.aria-label]="ariaLabel">
            </div>
            <div #box [ngClass]="{'p-radiobutton-box p-component':true, 'p-highlight':checked, 'p-disabled':disabled}" role="radio" [attr.aria-checked]="checked">
                <div class="p-radiobutton-icon"></div>
            </div>
        </div>
    `,
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    encapsulation: ViewEncapsulation.None,
                    host: {
                        'class': 'p-element'
                    }
                }]
        }], ctorParameters: function () { return [{ type: Table }, { type: TableService }, { type: i0.ChangeDetectorRef }]; }, propDecorators: { disabled: [{
                type: Input
            }], value: [{
                type: Input
            }], index: [{
                type: Input
            }], inputId: [{
                type: Input
            }], name: [{
                type: Input
            }], ariaLabel: [{
                type: Input
            }], boxViewChild: [{
                type: ViewChild,
                args: ['box']
            }] } });
class TableCheckbox {
    constructor(dt, tableService, cd) {
        this.dt = dt;
        this.tableService = tableService;
        this.cd = cd;
        this.subscription = this.dt.tableService.selectionSource$.subscribe(() => {
            this.checked = this.dt.isSelected(this.value);
            this.cd.markForCheck();
        });
    }
    ngOnInit() {
        this.checked = this.dt.isSelected(this.value);
    }
    onClick(event) {
        if (!this.disabled) {
            this.dt.toggleRowWithCheckbox({
                originalEvent: event,
                rowIndex: this.index
            }, this.value);
        }
        DomHandler.clearSelection();
    }
    onFocus() {
        DomHandler.addClass(this.boxViewChild.nativeElement, 'p-focus');
    }
    onBlur() {
        DomHandler.removeClass(this.boxViewChild.nativeElement, 'p-focus');
    }
    ngOnDestroy() {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }
}
TableCheckbox.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0, type: TableCheckbox, deps: [{ token: Table }, { token: TableService }, { token: i0.ChangeDetectorRef }], target: i0.ɵɵFactoryTarget.Component });
TableCheckbox.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.0.5", type: TableCheckbox, selector: "p-tableCheckbox", inputs: { disabled: "disabled", value: "value", index: "index", inputId: "inputId", name: "name", required: "required", ariaLabel: "ariaLabel" }, host: { classAttribute: "p-element" }, viewQueries: [{ propertyName: "boxViewChild", first: true, predicate: ["box"], descendants: true }], ngImport: i0, template: `
        <div class="p-checkbox p-component" (click)="onClick($event)">
            <div class="p-hidden-accessible">
                <input type="checkbox" [attr.id]="inputId" [attr.name]="name" [checked]="checked" (focus)="onFocus()" (blur)="onBlur()" [disabled]="disabled"
                [attr.required]="required" [attr.aria-label]="ariaLabel">
            </div>
            <div #box [ngClass]="{'p-checkbox-box p-component':true,
                'p-highlight':checked, 'p-disabled':disabled}" role="checkbox" [attr.aria-checked]="checked">
                <span class="p-checkbox-icon" [ngClass]="{'pi pi-check':checked}"></span>
            </div>
        </div>
    `, isInline: true, directives: [{ type: i4.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0, type: TableCheckbox, decorators: [{
            type: Component,
            args: [{
                    selector: 'p-tableCheckbox',
                    template: `
        <div class="p-checkbox p-component" (click)="onClick($event)">
            <div class="p-hidden-accessible">
                <input type="checkbox" [attr.id]="inputId" [attr.name]="name" [checked]="checked" (focus)="onFocus()" (blur)="onBlur()" [disabled]="disabled"
                [attr.required]="required" [attr.aria-label]="ariaLabel">
            </div>
            <div #box [ngClass]="{'p-checkbox-box p-component':true,
                'p-highlight':checked, 'p-disabled':disabled}" role="checkbox" [attr.aria-checked]="checked">
                <span class="p-checkbox-icon" [ngClass]="{'pi pi-check':checked}"></span>
            </div>
        </div>
    `,
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    encapsulation: ViewEncapsulation.None,
                    host: {
                        'class': 'p-element'
                    }
                }]
        }], ctorParameters: function () { return [{ type: Table }, { type: TableService }, { type: i0.ChangeDetectorRef }]; }, propDecorators: { disabled: [{
                type: Input
            }], value: [{
                type: Input
            }], index: [{
                type: Input
            }], inputId: [{
                type: Input
            }], name: [{
                type: Input
            }], required: [{
                type: Input
            }], ariaLabel: [{
                type: Input
            }], boxViewChild: [{
                type: ViewChild,
                args: ['box']
            }] } });
class TableHeaderCheckbox {
    constructor(dt, tableService, cd) {
        this.dt = dt;
        this.tableService = tableService;
        this.cd = cd;
        this.valueChangeSubscription = this.dt.tableService.valueSource$.subscribe(() => {
            this.checked = this.updateCheckedState();
        });
        this.selectionChangeSubscription = this.dt.tableService.selectionSource$.subscribe(() => {
            this.checked = this.updateCheckedState();
        });
    }
    ngOnInit() {
        this.checked = this.updateCheckedState();
    }
    onClick(event) {
        if (!this.disabled) {
            if (this.dt.value && this.dt.value.length > 0) {
                this.dt.toggleRowsWithCheckbox(event, !this.checked);
            }
        }
        DomHandler.clearSelection();
    }
    onFocus() {
        DomHandler.addClass(this.boxViewChild.nativeElement, 'p-focus');
    }
    onBlur() {
        DomHandler.removeClass(this.boxViewChild.nativeElement, 'p-focus');
    }
    isDisabled() {
        return this.disabled || !this.dt.value || !this.dt.value.length;
    }
    ngOnDestroy() {
        if (this.selectionChangeSubscription) {
            this.selectionChangeSubscription.unsubscribe();
        }
        if (this.valueChangeSubscription) {
            this.valueChangeSubscription.unsubscribe();
        }
    }
    updateCheckedState() {
        this.cd.markForCheck();
        if (this.dt.filteredValue && !this.dt.lazy) {
            const val = this.dt.filteredValue;
            return (val && val.length > 0 && this.dt.selection && this.dt.selection.length > 0 && this.isAllFilteredValuesChecked());
        }
        else {
            const val = this.dt.value;
            const length = this.dt.lazy ? this.dt._totalRecords : val ? val.length : 0;
            return (val && length > 0 && this.dt.selection && this.dt.selection.length > 0 && this.dt.selection.length === length);
        }
    }
    isAllFilteredValuesChecked() {
        if (!this.dt.filteredValue) {
            return false;
        }
        else {
            for (let rowData of this.dt.filteredValue) {
                if (!this.dt.isSelected(rowData)) {
                    return false;
                }
            }
            return true;
        }
    }
}
TableHeaderCheckbox.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0, type: TableHeaderCheckbox, deps: [{ token: Table }, { token: TableService }, { token: i0.ChangeDetectorRef }], target: i0.ɵɵFactoryTarget.Component });
TableHeaderCheckbox.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.0.5", type: TableHeaderCheckbox, selector: "p-tableHeaderCheckbox", inputs: { disabled: "disabled", inputId: "inputId", name: "name", ariaLabel: "ariaLabel" }, host: { classAttribute: "p-element" }, viewQueries: [{ propertyName: "boxViewChild", first: true, predicate: ["box"], descendants: true }], ngImport: i0, template: `
        <div class="p-checkbox p-component" (click)="onClick($event)">
            <div class="p-hidden-accessible">
                <input #cb type="checkbox" [attr.id]="inputId" [attr.name]="name" [checked]="checked" (focus)="onFocus()" (blur)="onBlur()"
                [disabled]="isDisabled()" [attr.aria-label]="ariaLabel">
            </div>
            <div #box [ngClass]="{'p-checkbox-box':true,
                'p-highlight':checked, 'p-disabled': isDisabled()}" role="checkbox" [attr.aria-checked]="checked">
                <span class="p-checkbox-icon" [ngClass]="{'pi pi-check':checked}"></span>
            </div>
        </div>
    `, isInline: true, directives: [{ type: i4.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0, type: TableHeaderCheckbox, decorators: [{
            type: Component,
            args: [{
                    selector: 'p-tableHeaderCheckbox',
                    template: `
        <div class="p-checkbox p-component" (click)="onClick($event)">
            <div class="p-hidden-accessible">
                <input #cb type="checkbox" [attr.id]="inputId" [attr.name]="name" [checked]="checked" (focus)="onFocus()" (blur)="onBlur()"
                [disabled]="isDisabled()" [attr.aria-label]="ariaLabel">
            </div>
            <div #box [ngClass]="{'p-checkbox-box':true,
                'p-highlight':checked, 'p-disabled': isDisabled()}" role="checkbox" [attr.aria-checked]="checked">
                <span class="p-checkbox-icon" [ngClass]="{'pi pi-check':checked}"></span>
            </div>
        </div>
    `,
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    encapsulation: ViewEncapsulation.None,
                    host: {
                        'class': 'p-element'
                    }
                }]
        }], ctorParameters: function () { return [{ type: Table }, { type: TableService }, { type: i0.ChangeDetectorRef }]; }, propDecorators: { boxViewChild: [{
                type: ViewChild,
                args: ['box']
            }], disabled: [{
                type: Input
            }], inputId: [{
                type: Input
            }], name: [{
                type: Input
            }], ariaLabel: [{
                type: Input
            }] } });
class ReorderableRowHandle {
    constructor(el) {
        this.el = el;
    }
    ngAfterViewInit() {
        DomHandler.addClass(this.el.nativeElement, 'p-datatable-reorderablerow-handle');
    }
}
ReorderableRowHandle.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0, type: ReorderableRowHandle, deps: [{ token: i0.ElementRef }], target: i0.ɵɵFactoryTarget.Directive });
ReorderableRowHandle.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "12.0.5", type: ReorderableRowHandle, selector: "[pReorderableRowHandle]", inputs: { index: ["pReorderableRowHandle", "index"] }, host: { classAttribute: "p-element" }, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0, type: ReorderableRowHandle, decorators: [{
            type: Directive,
            args: [{
                    selector: '[pReorderableRowHandle]',
                    host: {
                        'class': 'p-element'
                    }
                }]
        }], ctorParameters: function () { return [{ type: i0.ElementRef }]; }, propDecorators: { index: [{
                type: Input,
                args: ["pReorderableRowHandle"]
            }] } });
class ReorderableRow {
    constructor(dt, el, zone) {
        this.dt = dt;
        this.el = el;
        this.zone = zone;
    }
    ngAfterViewInit() {
        if (this.isEnabled()) {
            this.el.nativeElement.droppable = true;
            this.bindEvents();
        }
    }
    bindEvents() {
        this.zone.runOutsideAngular(() => {
            this.mouseDownListener = this.onMouseDown.bind(this);
            this.el.nativeElement.addEventListener('mousedown', this.mouseDownListener);
            this.dragStartListener = this.onDragStart.bind(this);
            this.el.nativeElement.addEventListener('dragstart', this.dragStartListener);
            this.dragEndListener = this.onDragEnd.bind(this);
            this.el.nativeElement.addEventListener('dragend', this.dragEndListener);
            this.dragOverListener = this.onDragOver.bind(this);
            this.el.nativeElement.addEventListener('dragover', this.dragOverListener);
            this.dragLeaveListener = this.onDragLeave.bind(this);
            this.el.nativeElement.addEventListener('dragleave', this.dragLeaveListener);
        });
    }
    unbindEvents() {
        if (this.mouseDownListener) {
            document.removeEventListener('mousedown', this.mouseDownListener);
            this.mouseDownListener = null;
        }
        if (this.dragStartListener) {
            document.removeEventListener('dragstart', this.dragStartListener);
            this.dragStartListener = null;
        }
        if (this.dragEndListener) {
            document.removeEventListener('dragend', this.dragEndListener);
            this.dragEndListener = null;
        }
        if (this.dragOverListener) {
            document.removeEventListener('dragover', this.dragOverListener);
            this.dragOverListener = null;
        }
        if (this.dragLeaveListener) {
            document.removeEventListener('dragleave', this.dragLeaveListener);
            this.dragLeaveListener = null;
        }
    }
    onMouseDown(event) {
        if (DomHandler.hasClass(event.target, 'p-datatable-reorderablerow-handle'))
            this.el.nativeElement.draggable = true;
        else
            this.el.nativeElement.draggable = false;
    }
    onDragStart(event) {
        this.dt.onRowDragStart(event, this.index);
    }
    onDragEnd(event) {
        this.dt.onRowDragEnd(event);
        this.el.nativeElement.draggable = false;
    }
    onDragOver(event) {
        this.dt.onRowDragOver(event, this.index, this.el.nativeElement);
        event.preventDefault();
    }
    onDragLeave(event) {
        this.dt.onRowDragLeave(event, this.el.nativeElement);
    }
    isEnabled() {
        return this.pReorderableRowDisabled !== true;
    }
    onDrop(event) {
        if (this.isEnabled() && this.dt.rowDragging) {
            this.dt.onRowDrop(event, this.el.nativeElement);
        }
        event.preventDefault();
    }
}
ReorderableRow.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0, type: ReorderableRow, deps: [{ token: Table }, { token: i0.ElementRef }, { token: i0.NgZone }], target: i0.ɵɵFactoryTarget.Directive });
ReorderableRow.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "12.0.5", type: ReorderableRow, selector: "[pReorderableRow]", inputs: { index: ["pReorderableRow", "index"], pReorderableRowDisabled: "pReorderableRowDisabled" }, host: { listeners: { "drop": "onDrop($event)" }, classAttribute: "p-element" }, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0, type: ReorderableRow, decorators: [{
            type: Directive,
            args: [{
                    selector: '[pReorderableRow]',
                    host: {
                        'class': 'p-element'
                    }
                }]
        }], ctorParameters: function () { return [{ type: Table }, { type: i0.ElementRef }, { type: i0.NgZone }]; }, propDecorators: { index: [{
                type: Input,
                args: ["pReorderableRow"]
            }], pReorderableRowDisabled: [{
                type: Input
            }], onDrop: [{
                type: HostListener,
                args: ['drop', ['$event']]
            }] } });
class ColumnFilterFormElement {
    constructor(dt) {
        this.dt = dt;
        this.useGrouping = true;
    }
    ngOnInit() {
        this.filterCallback = value => {
            this.filterConstraint.value = value;
            this.dt._filter();
        };
    }
    onModelChange(value) {
        this.filterConstraint.value = value;
        if (this.type === 'boolean' || value === '') {
            this.dt._filter();
        }
    }
    onTextInputEnterKeyDown(event) {
        this.dt._filter();
        event.preventDefault();
    }
    onNumericInputKeyDown(event) {
        if (event.key === 'Enter') {
            this.dt._filter();
            event.preventDefault();
        }
    }
}
ColumnFilterFormElement.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0, type: ColumnFilterFormElement, deps: [{ token: Table }], target: i0.ɵɵFactoryTarget.Component });
ColumnFilterFormElement.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.0.5", type: ColumnFilterFormElement, selector: "p-columnFilterFormElement", inputs: { field: "field", type: "type", filterConstraint: "filterConstraint", filterTemplate: "filterTemplate", placeholder: "placeholder", minFractionDigits: "minFractionDigits", maxFractionDigits: "maxFractionDigits", prefix: "prefix", suffix: "suffix", locale: "locale", localeMatcher: "localeMatcher", currency: "currency", currencyDisplay: "currencyDisplay", useGrouping: "useGrouping" }, host: { classAttribute: "p-element" }, ngImport: i0, template: `
        <ng-container *ngIf="filterTemplate; else builtInElement">
            <ng-container *ngTemplateOutlet="filterTemplate; context: {$implicit: filterConstraint.value, filterCallback: filterCallback}"></ng-container>
        </ng-container>
        <ng-template #builtInElement>
            <ng-container [ngSwitch]="type">
                <input *ngSwitchCase="'text'" type="text" pInputText [value]="filterConstraint?.value" (input)="onModelChange($event.target.value)"
                    (keydown.enter)="onTextInputEnterKeyDown($event)" [attr.placeholder]="placeholder">
                <p-inputNumber *ngSwitchCase="'numeric'" [ngModel]="filterConstraint?.value" (ngModelChange)="onModelChange($event)" (onKeyDown)="onNumericInputKeyDown($event)" [showButtons]="true" [attr.placeholder]="placeholder"
                    [minFractionDigits]="minFractionDigits" [maxFractionDigits]="maxFractionDigits" [prefix]="prefix" [suffix]="suffix" [placeholder]="placeholder"
                    [mode]="currency ? 'currency' : 'decimal'" [locale]="locale" [localeMatcher]="localeMatcher" [currency]="currency" [currencyDisplay]="currencyDisplay" [useGrouping]="useGrouping"></p-inputNumber>
                <p-triStateCheckbox *ngSwitchCase="'boolean'" [ngModel]="filterConstraint?.value" (ngModelChange)="onModelChange($event)"></p-triStateCheckbox>
                <p-calendar *ngSwitchCase="'date'" [ngModel]="filterConstraint?.value" (ngModelChange)="onModelChange($event)"></p-calendar>
            </ng-container>
        </ng-template>
    `, isInline: true, components: [{ type: i5.InputNumber, selector: "p-inputNumber", inputs: ["showButtons", "format", "buttonLayout", "inputId", "styleClass", "style", "placeholder", "size", "maxlength", "tabindex", "title", "ariaLabel", "ariaRequired", "name", "required", "autocomplete", "min", "max", "incrementButtonClass", "decrementButtonClass", "incrementButtonIcon", "decrementButtonIcon", "readonly", "step", "allowEmpty", "locale", "localeMatcher", "mode", "currency", "currencyDisplay", "useGrouping", "minFractionDigits", "maxFractionDigits", "prefix", "suffix", "inputStyle", "inputStyleClass", "disabled"], outputs: ["onInput", "onFocus", "onBlur", "onKeyDown"] }, { type: i6.TriStateCheckbox, selector: "p-triStateCheckbox", inputs: ["disabled", "name", "ariaLabelledBy", "tabindex", "inputId", "style", "styleClass", "label", "readonly", "checkboxTrueIcon", "checkboxFalseIcon"], outputs: ["onChange"] }, { type: i7.Calendar, selector: "p-calendar", inputs: ["style", "styleClass", "inputStyle", "inputId", "name", "inputStyleClass", "placeholder", "ariaLabelledBy", "disabled", "dateFormat", "multipleSeparator", "rangeSeparator", "inline", "showOtherMonths", "selectOtherMonths", "showIcon", "icon", "appendTo", "readonlyInput", "shortYearCutoff", "monthNavigator", "yearNavigator", "hourFormat", "timeOnly", "stepHour", "stepMinute", "stepSecond", "showSeconds", "required", "showOnFocus", "showWeek", "dataType", "selectionMode", "maxDateCount", "showButtonBar", "todayButtonStyleClass", "clearButtonStyleClass", "autoZIndex", "baseZIndex", "panelStyleClass", "panelStyle", "keepInvalid", "hideOnDateTimeSelect", "numberOfMonths", "view", "touchUI", "timeSeparator", "focusTrap", "firstDayOfWeek", "showTransitionOptions", "hideTransitionOptions", "tabindex", "defaultDate", "minDate", "maxDate", "disabledDates", "disabledDays", "yearRange", "showTime", "locale"], outputs: ["onFocus", "onBlur", "onClose", "onSelect", "onInput", "onTodayClick", "onClearClick", "onMonthChange", "onYearChange", "onClickOutside", "onShow"] }], directives: [{ type: i4.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i4.NgTemplateOutlet, selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet"] }, { type: i4.NgSwitch, selector: "[ngSwitch]", inputs: ["ngSwitch"] }, { type: i4.NgSwitchCase, selector: "[ngSwitchCase]", inputs: ["ngSwitchCase"] }, { type: i8.InputText, selector: "[pInputText]" }, { type: i9.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { type: i9.NgModel, selector: "[ngModel]:not([formControlName]):not([formControl])", inputs: ["name", "disabled", "ngModel", "ngModelOptions"], outputs: ["ngModelChange"], exportAs: ["ngModel"] }], encapsulation: i0.ViewEncapsulation.None });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0, type: ColumnFilterFormElement, decorators: [{
            type: Component,
            args: [{
                    selector: 'p-columnFilterFormElement',
                    template: `
        <ng-container *ngIf="filterTemplate; else builtInElement">
            <ng-container *ngTemplateOutlet="filterTemplate; context: {$implicit: filterConstraint.value, filterCallback: filterCallback}"></ng-container>
        </ng-container>
        <ng-template #builtInElement>
            <ng-container [ngSwitch]="type">
                <input *ngSwitchCase="'text'" type="text" pInputText [value]="filterConstraint?.value" (input)="onModelChange($event.target.value)"
                    (keydown.enter)="onTextInputEnterKeyDown($event)" [attr.placeholder]="placeholder">
                <p-inputNumber *ngSwitchCase="'numeric'" [ngModel]="filterConstraint?.value" (ngModelChange)="onModelChange($event)" (onKeyDown)="onNumericInputKeyDown($event)" [showButtons]="true" [attr.placeholder]="placeholder"
                    [minFractionDigits]="minFractionDigits" [maxFractionDigits]="maxFractionDigits" [prefix]="prefix" [suffix]="suffix" [placeholder]="placeholder"
                    [mode]="currency ? 'currency' : 'decimal'" [locale]="locale" [localeMatcher]="localeMatcher" [currency]="currency" [currencyDisplay]="currencyDisplay" [useGrouping]="useGrouping"></p-inputNumber>
                <p-triStateCheckbox *ngSwitchCase="'boolean'" [ngModel]="filterConstraint?.value" (ngModelChange)="onModelChange($event)"></p-triStateCheckbox>
                <p-calendar *ngSwitchCase="'date'" [ngModel]="filterConstraint?.value" (ngModelChange)="onModelChange($event)"></p-calendar>
            </ng-container>
        </ng-template>
    `,
                    encapsulation: ViewEncapsulation.None,
                    host: {
                        'class': 'p-element'
                    }
                }]
        }], ctorParameters: function () { return [{ type: Table }]; }, propDecorators: { field: [{
                type: Input
            }], type: [{
                type: Input
            }], filterConstraint: [{
                type: Input
            }], filterTemplate: [{
                type: Input
            }], placeholder: [{
                type: Input
            }], minFractionDigits: [{
                type: Input
            }], maxFractionDigits: [{
                type: Input
            }], prefix: [{
                type: Input
            }], suffix: [{
                type: Input
            }], locale: [{
                type: Input
            }], localeMatcher: [{
                type: Input
            }], currency: [{
                type: Input
            }], currencyDisplay: [{
                type: Input
            }], useGrouping: [{
                type: Input
            }] } });
class ColumnFilter {
    constructor(el, dt, renderer, config, overlayService) {
        this.el = el;
        this.dt = dt;
        this.renderer = renderer;
        this.config = config;
        this.overlayService = overlayService;
        this.type = 'text';
        this.display = 'row';
        this.showMenu = true;
        this.operator = FilterOperator.AND;
        this.showOperator = true;
        this.showClearButton = true;
        this.showApplyButton = true;
        this.showMatchModes = true;
        this.showAddButton = true;
        this.hideOnClear = false;
        this.maxConstraints = 2;
        this.useGrouping = true;
    }
    ngOnInit() {
        if (!this.dt.filters[this.field]) {
            this.initFieldFilterConstraint();
        }
        this.translationSubscription = this.config.translationObserver.subscribe(() => {
            this.generateMatchModeOptions();
            this.generateOperatorOptions();
        });
        this.resetSubscription = this.dt.tableService.resetSource$.subscribe(() => {
            this.clearFilter();
        });
        this.generateMatchModeOptions();
        this.generateOperatorOptions();
    }
    generateMatchModeOptions() {
        var _a;
        this.matchModes = this.matchModeOptions ||
            ((_a = this.config.filterMatchModeOptions[this.type]) === null || _a === void 0 ? void 0 : _a.map(key => {
                return { label: this.config.getTranslation(key), value: key };
            }));
    }
    generateOperatorOptions() {
        this.operatorOptions = [
            { label: this.config.getTranslation(TranslationKeys.MATCH_ALL), value: FilterOperator.AND },
            { label: this.config.getTranslation(TranslationKeys.MATCH_ANY), value: FilterOperator.OR }
        ];
    }
    ngAfterContentInit() {
        this.templates.forEach((item) => {
            switch (item.getType()) {
                case 'header':
                    this.headerTemplate = item.template;
                    break;
                case 'filter':
                    this.filterTemplate = item.template;
                    break;
                case 'footer':
                    this.footerTemplate = item.template;
                    break;
                default:
                    this.filterTemplate = item.template;
                    break;
            }
        });
    }
    initFieldFilterConstraint() {
        let defaultMatchMode = this.getDefaultMatchMode();
        this.dt.filters[this.field] = this.display == 'row' ? { value: null, matchMode: defaultMatchMode } : [{ value: null, matchMode: defaultMatchMode, operator: this.operator }];
    }
    onMenuMatchModeChange(value, filterMeta) {
        filterMeta.matchMode = value;
        if (!this.showApplyButton) {
            this.dt._filter();
        }
    }
    onRowMatchModeChange(matchMode) {
        this.dt.filters[this.field].matchMode = matchMode;
        this.dt._filter();
        this.hide();
    }
    onRowMatchModeKeyDown(event) {
        let item = event.target;
        switch (event.key) {
            case 'ArrowDown':
                var nextItem = this.findNextItem(item);
                if (nextItem) {
                    item.removeAttribute('tabindex');
                    nextItem.tabIndex = '0';
                    nextItem.focus();
                }
                event.preventDefault();
                break;
            case 'ArrowUp':
                var prevItem = this.findPrevItem(item);
                if (prevItem) {
                    item.removeAttribute('tabindex');
                    prevItem.tabIndex = '0';
                    prevItem.focus();
                }
                event.preventDefault();
                break;
        }
    }
    onRowClearItemClick() {
        this.clearFilter();
        this.hide();
    }
    isRowMatchModeSelected(matchMode) {
        return this.dt.filters[this.field].matchMode === matchMode;
    }
    addConstraint() {
        this.dt.filters[this.field].push({ value: null, matchMode: this.getDefaultMatchMode(), operator: this.getDefaultOperator() });
        this.dt._filter();
    }
    removeConstraint(filterMeta) {
        this.dt.filters[this.field] = this.dt.filters[this.field].filter(meta => meta !== filterMeta);
        this.dt._filter();
    }
    onOperatorChange(value) {
        this.dt.filters[this.field].forEach(filterMeta => {
            filterMeta.operator = value;
            this.operator = value;
        });
        if (!this.showApplyButton) {
            this.dt._filter();
        }
    }
    toggleMenu() {
        this.overlayVisible = !this.overlayVisible;
    }
    onToggleButtonKeyDown(event) {
        switch (event.key) {
            case 'Escape':
            case 'Tab':
                this.overlayVisible = false;
                break;
            case 'ArrowDown':
                if (this.overlayVisible) {
                    let focusable = DomHandler.getFocusableElements(this.overlay);
                    if (focusable) {
                        focusable[0].focus();
                    }
                    event.preventDefault();
                }
                else if (event.altKey) {
                    this.overlayVisible = true;
                    event.preventDefault();
                }
                break;
        }
    }
    onEscape() {
        this.overlayVisible = false;
        this.icon.nativeElement.focus();
    }
    findNextItem(item) {
        let nextItem = item.nextElementSibling;
        if (nextItem)
            return DomHandler.hasClass(nextItem, 'p-column-filter-separator') ? this.findNextItem(nextItem) : nextItem;
        else
            return item.parentElement.firstElementChild;
    }
    findPrevItem(item) {
        let prevItem = item.previousElementSibling;
        if (prevItem)
            return DomHandler.hasClass(prevItem, 'p-column-filter-separator') ? this.findPrevItem(prevItem) : prevItem;
        else
            return item.parentElement.lastElementChild;
    }
    onContentClick() {
        this.selfClick = true;
    }
    onOverlayAnimationStart(event) {
        switch (event.toState) {
            case 'visible':
                this.overlay = event.element;
                document.body.appendChild(this.overlay);
                ZIndexUtils.set('overlay', this.overlay, this.config.zIndex.overlay);
                DomHandler.absolutePosition(this.overlay, this.icon.nativeElement);
                this.bindDocumentClickListener();
                this.bindDocumentResizeListener();
                this.bindScrollListener();
                this.overlayEventListener = (e) => {
                    if (this.overlay && this.overlay.contains(e.target)) {
                        this.selfClick = true;
                    }
                };
                this.overlaySubscription = this.overlayService.clickObservable.subscribe(this.overlayEventListener);
                break;
            case 'void':
                this.onOverlayHide();
                if (this.overlaySubscription) {
                    this.overlaySubscription.unsubscribe();
                }
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
    getDefaultMatchMode() {
        if (this.matchMode) {
            return this.matchMode;
        }
        else {
            if (this.type === 'text')
                return FilterMatchMode.STARTS_WITH;
            else if (this.type === 'numeric')
                return FilterMatchMode.EQUALS;
            else if (this.type === 'date')
                return FilterMatchMode.DATE_IS;
            else
                return FilterMatchMode.CONTAINS;
        }
    }
    getDefaultOperator() {
        return this.dt.filters ? this.dt.filters[this.field][0].operator : this.operator;
    }
    hasRowFilter() {
        return this.dt.filters[this.field] && !this.dt.isFilterBlank(this.dt.filters[this.field].value);
    }
    get fieldConstraints() {
        return this.dt.filters ? this.dt.filters[this.field] : null;
    }
    get showRemoveIcon() {
        return this.fieldConstraints ? this.fieldConstraints.length > 1 : false;
    }
    get showMenuButton() {
        return this.showMenu && (this.display === 'row' ? this.type !== 'boolean' : true);
    }
    get isShowOperator() {
        return this.showOperator && this.type !== 'boolean';
    }
    get isShowAddConstraint() {
        return this.showAddButton && this.type !== 'boolean' && (this.fieldConstraints && this.fieldConstraints.length < this.maxConstraints);
    }
    get applyButtonLabel() {
        return this.config.getTranslation(TranslationKeys.APPLY);
    }
    get clearButtonLabel() {
        return this.config.getTranslation(TranslationKeys.CLEAR);
    }
    get addRuleButtonLabel() {
        return this.config.getTranslation(TranslationKeys.ADD_RULE);
    }
    get removeRuleButtonLabel() {
        return this.config.getTranslation(TranslationKeys.REMOVE_RULE);
    }
    get noFilterLabel() {
        return this.config.getTranslation(TranslationKeys.NO_FILTER);
    }
    hasFilter() {
        let fieldFilter = this.dt.filters[this.field];
        if (fieldFilter) {
            if (Array.isArray(fieldFilter))
                return !this.dt.isFilterBlank(fieldFilter[0].value);
            else
                return !this.dt.isFilterBlank(fieldFilter.value);
        }
        return false;
    }
    isOutsideClicked(event) {
        return !(this.overlay.isSameNode(event.target) || this.overlay.contains(event.target)
            || this.icon.nativeElement.isSameNode(event.target) || this.icon.nativeElement.contains(event.target)
            || DomHandler.hasClass(event.target, 'p-column-filter-add-button') || DomHandler.hasClass(event.target.parentElement, 'p-column-filter-add-button')
            || DomHandler.hasClass(event.target, 'p-column-filter-remove-button') || DomHandler.hasClass(event.target.parentElement, 'p-column-filter-remove-button'));
    }
    bindDocumentClickListener() {
        if (!this.documentClickListener) {
            const documentTarget = this.el ? this.el.nativeElement.ownerDocument : 'document';
            this.documentClickListener = this.renderer.listen(documentTarget, 'mousedown', event => {
                if (this.overlayVisible && !this.selfClick && this.isOutsideClicked(event)) {
                    this.hide();
                }
                this.selfClick = false;
            });
        }
    }
    unbindDocumentClickListener() {
        if (this.documentClickListener) {
            this.documentClickListener();
            this.documentClickListener = null;
            this.selfClick = false;
        }
    }
    bindDocumentResizeListener() {
        this.documentResizeListener = () => this.hide();
        window.addEventListener('resize', this.documentResizeListener);
    }
    unbindDocumentResizeListener() {
        if (this.documentResizeListener) {
            window.removeEventListener('resize', this.documentResizeListener);
            this.documentResizeListener = null;
        }
    }
    bindScrollListener() {
        if (!this.scrollHandler) {
            this.scrollHandler = new ConnectedOverlayScrollHandler(this.icon.nativeElement, () => {
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
    hide() {
        this.overlayVisible = false;
    }
    onOverlayHide() {
        this.unbindDocumentClickListener();
        this.unbindDocumentResizeListener();
        this.unbindScrollListener();
        this.overlay = null;
    }
    clearFilter() {
        this.initFieldFilterConstraint();
        this.dt._filter();
        if (this.hideOnClear)
            this.hide();
    }
    applyFilter() {
        this.dt._filter();
        this.hide();
    }
    ngOnDestroy() {
        if (this.overlay) {
            this.el.nativeElement.appendChild(this.overlay);
            ZIndexUtils.clear(this.overlay);
            this.onOverlayHide();
        }
        if (this.translationSubscription) {
            this.translationSubscription.unsubscribe();
        }
        if (this.resetSubscription) {
            this.resetSubscription.unsubscribe();
        }
        if (this.overlaySubscription) {
            this.overlaySubscription.unsubscribe();
        }
    }
}
ColumnFilter.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0, type: ColumnFilter, deps: [{ token: i0.ElementRef }, { token: Table }, { token: i0.Renderer2 }, { token: i1.PrimeNGConfig }, { token: i1.OverlayService }], target: i0.ɵɵFactoryTarget.Component });
ColumnFilter.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.0.5", type: ColumnFilter, selector: "p-columnFilter", inputs: { field: "field", type: "type", display: "display", showMenu: "showMenu", matchMode: "matchMode", operator: "operator", showOperator: "showOperator", showClearButton: "showClearButton", showApplyButton: "showApplyButton", showMatchModes: "showMatchModes", showAddButton: "showAddButton", hideOnClear: "hideOnClear", placeholder: "placeholder", matchModeOptions: "matchModeOptions", maxConstraints: "maxConstraints", minFractionDigits: "minFractionDigits", maxFractionDigits: "maxFractionDigits", prefix: "prefix", suffix: "suffix", locale: "locale", localeMatcher: "localeMatcher", currency: "currency", currencyDisplay: "currencyDisplay", useGrouping: "useGrouping" }, host: { classAttribute: "p-element" }, queries: [{ propertyName: "templates", predicate: PrimeTemplate }], viewQueries: [{ propertyName: "icon", first: true, predicate: ["icon"], descendants: true }], ngImport: i0, template: `
        <div class="p-column-filter" [ngClass]="{'p-column-filter-row': display === 'row', 'p-column-filter-menu': display === 'menu'}">
            <p-columnFilterFormElement *ngIf="display === 'row'" class="p-fluid" [type]="type" [field]="field" [filterConstraint]="dt.filters[field]" [filterTemplate]="filterTemplate" [placeholder]="placeholder" [minFractionDigits]="minFractionDigits" [maxFractionDigits]="maxFractionDigits" [prefix]="prefix" [suffix]="suffix"
                                    [locale]="locale"  [localeMatcher]="localeMatcher" [currency]="currency" [currencyDisplay]="currencyDisplay" [useGrouping]="useGrouping"></p-columnFilterFormElement>
            <button #icon *ngIf="showMenuButton" type="button" class="p-column-filter-menu-button p-link" aria-haspopup="true" [attr.aria-expanded]="overlayVisible"
                [ngClass]="{'p-column-filter-menu-button-open': overlayVisible, 'p-column-filter-menu-button-active': hasFilter()}"
                (click)="toggleMenu()" (keydown)="onToggleButtonKeyDown($event)"><span class="pi pi-filter-icon pi-filter"></span></button>
            <button #icon *ngIf="showMenuButton && display === 'row'" [ngClass]="{'p-hidden-space': !hasRowFilter()}" type="button" class="p-column-filter-clear-button p-link" (click)="clearFilter()"><span class="pi pi-filter-slash"></span></button>
            <div *ngIf="showMenu && overlayVisible" [ngClass]="{'p-column-filter-overlay p-component p-fluid': true, 'p-column-filter-overlay-menu': display === 'menu'}" (click)="onContentClick()"
                [@overlayAnimation]="'visible'" (@overlayAnimation.start)="onOverlayAnimationStart($event)" (@overlayAnimation.done)="onOverlayAnimationEnd($event)" (keydown.escape)="onEscape()">
                <ng-container *ngTemplateOutlet="headerTemplate; context: {$implicit: field}"></ng-container>
                <ul *ngIf="display === 'row'; else menu" class="p-column-filter-row-items">
                    <li class="p-column-filter-row-item" *ngFor="let matchMode of matchModes; let i = index;" (click)="onRowMatchModeChange(matchMode.value)" (keydown)="onRowMatchModeKeyDown($event)" (keydown.enter)="this.onRowMatchModeChange(matchMode.value)"
                        [ngClass]="{'p-highlight': isRowMatchModeSelected(matchMode.value)}" [attr.tabindex]="i === 0 ? '0' : null">{{matchMode.label}}</li>
                    <li class="p-column-filter-separator"></li>
                    <li class="p-column-filter-row-item" (click)="onRowClearItemClick()" (keydown)="onRowMatchModeKeyDown($event)" (keydown.enter)="onRowClearItemClick()">{{noFilterLabel}}</li>
                </ul>
                <ng-template #menu>
                    <div class="p-column-filter-operator" *ngIf="isShowOperator">
                        <p-dropdown [options]="operatorOptions" [ngModel]="operator" (ngModelChange)="onOperatorChange($event)" styleClass="p-column-filter-operator-dropdown"></p-dropdown>
                    </div>
                    <div class="p-column-filter-constraints">
                        <div *ngFor="let fieldConstraint of fieldConstraints; let i = index" class="p-column-filter-constraint">
                            <p-dropdown  *ngIf="showMatchModes && matchModes" [options]="matchModes" [ngModel]="fieldConstraint.matchMode" (ngModelChange)="onMenuMatchModeChange($event, fieldConstraint)" styleClass="p-column-filter-matchmode-dropdown"></p-dropdown>
                            <p-columnFilterFormElement [type]="type" [field]="field" [filterConstraint]="fieldConstraint" [filterTemplate]="filterTemplate" [placeholder]="placeholder"
                            [minFractionDigits]="minFractionDigits" [maxFractionDigits]="maxFractionDigits" [prefix]="prefix" [suffix]="suffix"
                            [locale]="locale"  [localeMatcher]="localeMatcher" [currency]="currency" [currencyDisplay]="currencyDisplay" [useGrouping]="useGrouping"></p-columnFilterFormElement>
                            <div>
                                <button *ngIf="showRemoveIcon" type="button" pButton icon="pi pi-trash" class="p-column-filter-remove-button p-button-text p-button-danger p-button-sm" (click)="removeConstraint(fieldConstraint)" pRipple [label]="removeRuleButtonLabel"></button>
                            </div>
                        </div>
                    </div>
                    <div class="p-column-filter-add-rule" *ngIf="isShowAddConstraint">
                        <button type="button" pButton [label]="addRuleButtonLabel" icon="pi pi-plus" class="p-column-filter-add-button p-button-text p-button-sm" (click)="addConstraint()" pRipple></button>
                    </div>
                    <div class="p-column-filter-buttonbar">
                        <button *ngIf="showClearButton" type="button" pButton class="p-button-outlined" (click)="clearFilter()" [label]="clearButtonLabel" pRipple></button>
                        <button *ngIf="showApplyButton" type="button" pButton (click)="applyFilter()" [label]="applyButtonLabel" pRipple></button>
                    </div>
                </ng-template>
                <ng-container *ngTemplateOutlet="footerTemplate; context: {$implicit: field}"></ng-container>
            </div>
        </div>
    `, isInline: true, components: [{ type: ColumnFilterFormElement, selector: "p-columnFilterFormElement", inputs: ["field", "type", "filterConstraint", "filterTemplate", "placeholder", "minFractionDigits", "maxFractionDigits", "prefix", "suffix", "locale", "localeMatcher", "currency", "currencyDisplay", "useGrouping"] }, { type: i10.Dropdown, selector: "p-dropdown", inputs: ["scrollHeight", "filter", "name", "style", "panelStyle", "styleClass", "panelStyleClass", "readonly", "required", "editable", "appendTo", "tabindex", "placeholder", "filterPlaceholder", "filterLocale", "inputId", "selectId", "dataKey", "filterBy", "autofocus", "resetFilterOnHide", "dropdownIcon", "optionLabel", "optionValue", "optionDisabled", "optionGroupLabel", "optionGroupChildren", "autoDisplayFirst", "group", "showClear", "emptyFilterMessage", "emptyMessage", "virtualScroll", "itemSize", "autoZIndex", "baseZIndex", "showTransitionOptions", "hideTransitionOptions", "ariaFilterLabel", "ariaLabelledBy", "filterMatchMode", "maxlength", "tooltip", "tooltipPosition", "tooltipPositionStyle", "tooltipStyleClass", "autofocusFilter", "disabled", "options", "filterValue"], outputs: ["onChange", "onFilter", "onFocus", "onBlur", "onClick", "onShow", "onHide"] }], directives: [{ type: i4.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { type: i4.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i4.NgTemplateOutlet, selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet"] }, { type: i4.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { type: i9.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { type: i9.NgModel, selector: "[ngModel]:not([formControlName]):not([formControl])", inputs: ["name", "disabled", "ngModel", "ngModelOptions"], outputs: ["ngModelChange"], exportAs: ["ngModel"] }, { type: i11.ButtonDirective, selector: "[pButton]", inputs: ["iconPos", "loadingIcon", "label", "icon", "loading"] }], animations: [
        trigger('overlayAnimation', [
            transition(':enter', [
                style({ opacity: 0, transform: 'scaleY(0.8)' }),
                animate('.12s cubic-bezier(0, 0, 0.2, 1)')
            ]),
            transition(':leave', [
                animate('.1s linear', style({ opacity: 0 }))
            ])
        ])
    ], encapsulation: i0.ViewEncapsulation.None });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0, type: ColumnFilter, decorators: [{
            type: Component,
            args: [{
                    selector: 'p-columnFilter',
                    template: `
        <div class="p-column-filter" [ngClass]="{'p-column-filter-row': display === 'row', 'p-column-filter-menu': display === 'menu'}">
            <p-columnFilterFormElement *ngIf="display === 'row'" class="p-fluid" [type]="type" [field]="field" [filterConstraint]="dt.filters[field]" [filterTemplate]="filterTemplate" [placeholder]="placeholder" [minFractionDigits]="minFractionDigits" [maxFractionDigits]="maxFractionDigits" [prefix]="prefix" [suffix]="suffix"
                                    [locale]="locale"  [localeMatcher]="localeMatcher" [currency]="currency" [currencyDisplay]="currencyDisplay" [useGrouping]="useGrouping"></p-columnFilterFormElement>
            <button #icon *ngIf="showMenuButton" type="button" class="p-column-filter-menu-button p-link" aria-haspopup="true" [attr.aria-expanded]="overlayVisible"
                [ngClass]="{'p-column-filter-menu-button-open': overlayVisible, 'p-column-filter-menu-button-active': hasFilter()}"
                (click)="toggleMenu()" (keydown)="onToggleButtonKeyDown($event)"><span class="pi pi-filter-icon pi-filter"></span></button>
            <button #icon *ngIf="showMenuButton && display === 'row'" [ngClass]="{'p-hidden-space': !hasRowFilter()}" type="button" class="p-column-filter-clear-button p-link" (click)="clearFilter()"><span class="pi pi-filter-slash"></span></button>
            <div *ngIf="showMenu && overlayVisible" [ngClass]="{'p-column-filter-overlay p-component p-fluid': true, 'p-column-filter-overlay-menu': display === 'menu'}" (click)="onContentClick()"
                [@overlayAnimation]="'visible'" (@overlayAnimation.start)="onOverlayAnimationStart($event)" (@overlayAnimation.done)="onOverlayAnimationEnd($event)" (keydown.escape)="onEscape()">
                <ng-container *ngTemplateOutlet="headerTemplate; context: {$implicit: field}"></ng-container>
                <ul *ngIf="display === 'row'; else menu" class="p-column-filter-row-items">
                    <li class="p-column-filter-row-item" *ngFor="let matchMode of matchModes; let i = index;" (click)="onRowMatchModeChange(matchMode.value)" (keydown)="onRowMatchModeKeyDown($event)" (keydown.enter)="this.onRowMatchModeChange(matchMode.value)"
                        [ngClass]="{'p-highlight': isRowMatchModeSelected(matchMode.value)}" [attr.tabindex]="i === 0 ? '0' : null">{{matchMode.label}}</li>
                    <li class="p-column-filter-separator"></li>
                    <li class="p-column-filter-row-item" (click)="onRowClearItemClick()" (keydown)="onRowMatchModeKeyDown($event)" (keydown.enter)="onRowClearItemClick()">{{noFilterLabel}}</li>
                </ul>
                <ng-template #menu>
                    <div class="p-column-filter-operator" *ngIf="isShowOperator">
                        <p-dropdown [options]="operatorOptions" [ngModel]="operator" (ngModelChange)="onOperatorChange($event)" styleClass="p-column-filter-operator-dropdown"></p-dropdown>
                    </div>
                    <div class="p-column-filter-constraints">
                        <div *ngFor="let fieldConstraint of fieldConstraints; let i = index" class="p-column-filter-constraint">
                            <p-dropdown  *ngIf="showMatchModes && matchModes" [options]="matchModes" [ngModel]="fieldConstraint.matchMode" (ngModelChange)="onMenuMatchModeChange($event, fieldConstraint)" styleClass="p-column-filter-matchmode-dropdown"></p-dropdown>
                            <p-columnFilterFormElement [type]="type" [field]="field" [filterConstraint]="fieldConstraint" [filterTemplate]="filterTemplate" [placeholder]="placeholder"
                            [minFractionDigits]="minFractionDigits" [maxFractionDigits]="maxFractionDigits" [prefix]="prefix" [suffix]="suffix"
                            [locale]="locale"  [localeMatcher]="localeMatcher" [currency]="currency" [currencyDisplay]="currencyDisplay" [useGrouping]="useGrouping"></p-columnFilterFormElement>
                            <div>
                                <button *ngIf="showRemoveIcon" type="button" pButton icon="pi pi-trash" class="p-column-filter-remove-button p-button-text p-button-danger p-button-sm" (click)="removeConstraint(fieldConstraint)" pRipple [label]="removeRuleButtonLabel"></button>
                            </div>
                        </div>
                    </div>
                    <div class="p-column-filter-add-rule" *ngIf="isShowAddConstraint">
                        <button type="button" pButton [label]="addRuleButtonLabel" icon="pi pi-plus" class="p-column-filter-add-button p-button-text p-button-sm" (click)="addConstraint()" pRipple></button>
                    </div>
                    <div class="p-column-filter-buttonbar">
                        <button *ngIf="showClearButton" type="button" pButton class="p-button-outlined" (click)="clearFilter()" [label]="clearButtonLabel" pRipple></button>
                        <button *ngIf="showApplyButton" type="button" pButton (click)="applyFilter()" [label]="applyButtonLabel" pRipple></button>
                    </div>
                </ng-template>
                <ng-container *ngTemplateOutlet="footerTemplate; context: {$implicit: field}"></ng-container>
            </div>
        </div>
    `,
                    animations: [
                        trigger('overlayAnimation', [
                            transition(':enter', [
                                style({ opacity: 0, transform: 'scaleY(0.8)' }),
                                animate('.12s cubic-bezier(0, 0, 0.2, 1)')
                            ]),
                            transition(':leave', [
                                animate('.1s linear', style({ opacity: 0 }))
                            ])
                        ])
                    ],
                    encapsulation: ViewEncapsulation.None,
                    host: {
                        'class': 'p-element'
                    }
                }]
        }], ctorParameters: function () { return [{ type: i0.ElementRef }, { type: Table }, { type: i0.Renderer2 }, { type: i1.PrimeNGConfig }, { type: i1.OverlayService }]; }, propDecorators: { field: [{
                type: Input
            }], type: [{
                type: Input
            }], display: [{
                type: Input
            }], showMenu: [{
                type: Input
            }], matchMode: [{
                type: Input
            }], operator: [{
                type: Input
            }], showOperator: [{
                type: Input
            }], showClearButton: [{
                type: Input
            }], showApplyButton: [{
                type: Input
            }], showMatchModes: [{
                type: Input
            }], showAddButton: [{
                type: Input
            }], hideOnClear: [{
                type: Input
            }], placeholder: [{
                type: Input
            }], matchModeOptions: [{
                type: Input
            }], maxConstraints: [{
                type: Input
            }], minFractionDigits: [{
                type: Input
            }], maxFractionDigits: [{
                type: Input
            }], prefix: [{
                type: Input
            }], suffix: [{
                type: Input
            }], locale: [{
                type: Input
            }], localeMatcher: [{
                type: Input
            }], currency: [{
                type: Input
            }], currencyDisplay: [{
                type: Input
            }], useGrouping: [{
                type: Input
            }], icon: [{
                type: ViewChild,
                args: ['icon']
            }], templates: [{
                type: ContentChildren,
                args: [PrimeTemplate]
            }] } });
class TableModule {
}
TableModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0, type: TableModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
TableModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0, type: TableModule, declarations: [Table, SortableColumn, FrozenColumn, RowGroupHeader, SelectableRow, RowToggler, ContextMenuRow, ResizableColumn, ReorderableColumn, EditableColumn, CellEditor, TableBody, SortIcon, TableRadioButton, TableCheckbox, TableHeaderCheckbox, ReorderableRowHandle, ReorderableRow, SelectableRowDblClick, EditableRow, InitEditableRow, SaveEditableRow, CancelEditableRow, ColumnFilter, ColumnFilterFormElement], imports: [CommonModule, PaginatorModule, InputTextModule, DropdownModule, ScrollingModule, FormsModule, ButtonModule, SelectButtonModule, CalendarModule, InputNumberModule, TriStateCheckboxModule], exports: [Table, SharedModule, SortableColumn, FrozenColumn, RowGroupHeader, SelectableRow, RowToggler, ContextMenuRow, ResizableColumn, ReorderableColumn, EditableColumn, CellEditor, SortIcon, TableRadioButton, TableCheckbox, TableHeaderCheckbox, ReorderableRowHandle, ReorderableRow, SelectableRowDblClick, EditableRow, InitEditableRow, SaveEditableRow, CancelEditableRow, ScrollingModule, ColumnFilter] });
TableModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0, type: TableModule, imports: [[CommonModule, PaginatorModule, InputTextModule, DropdownModule, ScrollingModule, FormsModule, ButtonModule, SelectButtonModule, CalendarModule, InputNumberModule, TriStateCheckboxModule], SharedModule,
        ScrollingModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0, type: TableModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule, PaginatorModule, InputTextModule, DropdownModule, ScrollingModule, FormsModule, ButtonModule, SelectButtonModule, CalendarModule, InputNumberModule, TriStateCheckboxModule],
                    exports: [Table, SharedModule, SortableColumn, FrozenColumn, RowGroupHeader, SelectableRow, RowToggler, ContextMenuRow, ResizableColumn, ReorderableColumn, EditableColumn, CellEditor, SortIcon,
                        TableRadioButton, TableCheckbox, TableHeaderCheckbox, ReorderableRowHandle, ReorderableRow, SelectableRowDblClick, EditableRow, InitEditableRow, SaveEditableRow, CancelEditableRow, ScrollingModule, ColumnFilter],
                    declarations: [Table, SortableColumn, FrozenColumn, RowGroupHeader, SelectableRow, RowToggler, ContextMenuRow, ResizableColumn, ReorderableColumn, EditableColumn, CellEditor, TableBody, SortIcon,
                        TableRadioButton, TableCheckbox, TableHeaderCheckbox, ReorderableRowHandle, ReorderableRow, SelectableRowDblClick, EditableRow, InitEditableRow, SaveEditableRow, CancelEditableRow, ColumnFilter, ColumnFilterFormElement]
                }]
        }] });

/**
 * Generated bundle index. Do not edit.
 */

export { CancelEditableRow, CellEditor, ColumnFilter, ColumnFilterFormElement, ContextMenuRow, EditableColumn, EditableRow, FrozenColumn, InitEditableRow, ReorderableColumn, ReorderableRow, ReorderableRowHandle, ResizableColumn, RowGroupHeader, RowToggler, SaveEditableRow, SelectableRow, SelectableRowDblClick, SortIcon, SortableColumn, Table, TableBody, TableCheckbox, TableHeaderCheckbox, TableModule, TableRadioButton, TableService };
//# sourceMappingURL=primeng-table.js.map
