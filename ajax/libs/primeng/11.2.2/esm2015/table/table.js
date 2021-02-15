import { NgModule, Component, HostListener, Directive, Optional, Input, Output, EventEmitter, ElementRef, ContentChildren, ViewChild, NgZone, ChangeDetectorRef, ChangeDetectionStrategy, ViewEncapsulation, Renderer2 } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PrimeTemplate, SharedModule, FilterMatchMode, FilterOperator, PrimeNGConfig, TranslationKeys, FilterService } from 'primeng/api';
import { PaginatorModule } from 'primeng/paginator';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { SelectButtonModule } from 'primeng/selectbutton';
import { TriStateCheckboxModule } from 'primeng/tristatecheckbox';
import { CalendarModule } from 'primeng/calendar';
import { InputNumberModule } from 'primeng/inputnumber';
import { DropdownModule } from 'primeng/dropdown';
import { DomHandler, ConnectedOverlayScrollHandler } from 'primeng/dom';
import { ObjectUtils } from 'primeng/utils';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { ScrollingModule, CdkVirtualScrollViewport } from '@angular/cdk/scrolling';
import { trigger, style, transition, animate } from '@angular/animations';
export class TableService {
    constructor() {
        this.sortSource = new Subject();
        this.selectionSource = new Subject();
        this.contextMenuSource = new Subject();
        this.valueSource = new Subject();
        this.totalRecordsSource = new Subject();
        this.columnsSource = new Subject();
        this.sortSource$ = this.sortSource.asObservable();
        this.selectionSource$ = this.selectionSource.asObservable();
        this.contextMenuSource$ = this.contextMenuSource.asObservable();
        this.valueSource$ = this.valueSource.asObservable();
        this.totalRecordsSource$ = this.totalRecordsSource.asObservable();
        this.columnsSource$ = this.columnsSource.asObservable();
    }
    onSort(sortMeta) {
        this.sortSource.next(sortMeta);
    }
    onSelectionChange() {
        this.selectionSource.next();
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
TableService.decorators = [
    { type: Injectable }
];
export class Table {
    constructor(el, zone, tableService, cd, filterService) {
        this.el = el;
        this.zone = zone;
        this.tableService = tableService;
        this.cd = cd;
        this.filterService = filterService;
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
        this.virtualScrollDelay = 250;
        this.virtualRowHeight = 28;
        this.columnResizeMode = 'fit';
        this.loadingIcon = 'pi pi-spinner';
        this.showLoader = true;
        this.stateStorage = 'session';
        this.editMode = 'cell';
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
                case 'body':
                    this.bodyTemplate = item.template;
                    break;
                case 'loadingbody':
                    this.loadingBodyTemplate = item.template;
                    break;
                case 'footer':
                    this.footerTemplate = item.template;
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
        }
        if (simpleChange.columns) {
            this._columns = simpleChange.columns.currentValue;
            this.tableService.onColumnsChange(simpleChange.columns.currentValue);
            if (this._columns && this.isStateful() && this.reorderableColumns && !this.columnOrderStateRestored) {
                this.restoreColumnOrder();
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
            if (this.sortMode === 'multiple' && (this.initialized || !this.virtualScroll)) {
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
        this.filters = {};
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
        if (this.scrollableViewChild) {
            this.scrollableViewChild.scrollToVirtualIndex(index);
        }
        if (this.scrollableFrozenViewChild) {
            this.scrollableFrozenViewChild.scrollToVirtualIndex(index);
        }
    }
    scrollTo(options) {
        if (this.scrollableViewChild) {
            this.scrollableViewChild.scrollTo(options);
        }
        if (this.scrollableFrozenViewChild) {
            this.scrollableFrozenViewChild.scrollTo(options);
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
                if (this.editingCell && !this.editingCellClick && this.isEditingCellValid()) {
                    DomHandler.removeClass(this.editingCell, 'p-cell-editing');
                    this.editingCell = null;
                    this.onEditComplete.emit({ field: this.editingCellField, data: this.editingCellData, originalEvent: event, index: this.editingCellRowIndex });
                    this.editingCellField = null;
                    this.editingCellData = null;
                    this.editingCellRowIndex = null;
                    this.unbindDocumentEditListener();
                    this.cd.markForCheck();
                }
                this.editingCellClick = false;
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
    onColumnResizeEnd(event, column) {
        let delta = this.resizeHelperViewChild.nativeElement.offsetLeft - this.lastResizerHelperX;
        let columnWidth = column.offsetWidth;
        let minWidth = parseInt(column.style.minWidth || 15);
        if (columnWidth + delta < minWidth) {
            delta = minWidth - columnWidth;
        }
        const newColumnWidth = columnWidth + delta;
        if (newColumnWidth >= minWidth) {
            if (this.columnResizeMode === 'fit') {
                let nextColumn = column.nextElementSibling;
                while (!nextColumn.offsetParent) {
                    nextColumn = nextColumn.nextElementSibling;
                }
                if (nextColumn) {
                    let nextColumnWidth = nextColumn.offsetWidth - delta;
                    let nextColumnMinWidth = nextColumn.style.minWidth || 15;
                    if (newColumnWidth > 15 && nextColumnWidth > parseInt(nextColumnMinWidth)) {
                        if (this.scrollable) {
                            let scrollableView = this.findParentScrollableView(column);
                            let scrollableBodyTable = DomHandler.findSingle(scrollableView, '.p-datatable-scrollable-body table') || DomHandler.findSingle(scrollableView, '.p-datatable-virtual-scrollable-body table');
                            let scrollableHeaderTable = DomHandler.findSingle(scrollableView, 'table.p-datatable-scrollable-header-table');
                            let scrollableFooterTable = DomHandler.findSingle(scrollableView, 'table.p-datatable-scrollable-footer-table');
                            let resizeColumnIndex = DomHandler.index(column);
                            this.resizeColGroup(scrollableHeaderTable, resizeColumnIndex, newColumnWidth, nextColumnWidth);
                            this.resizeColGroup(scrollableBodyTable, resizeColumnIndex, newColumnWidth, nextColumnWidth);
                            this.resizeColGroup(scrollableFooterTable, resizeColumnIndex, newColumnWidth, nextColumnWidth);
                        }
                        else {
                            column.style.width = newColumnWidth + 'px';
                            if (nextColumn) {
                                nextColumn.style.width = nextColumnWidth + 'px';
                            }
                        }
                    }
                }
            }
            else if (this.columnResizeMode === 'expand') {
                if (newColumnWidth >= minWidth) {
                    if (this.scrollable) {
                        this.setScrollableItemsWidthOnExpandResize(column, newColumnWidth, delta);
                    }
                    else {
                        this.tableViewChild.nativeElement.style.width = this.tableViewChild.nativeElement.offsetWidth + delta + 'px';
                        column.style.width = newColumnWidth + 'px';
                        let containerWidth = this.tableViewChild.nativeElement.style.width;
                        this.containerViewChild.nativeElement.style.width = containerWidth + 'px';
                    }
                }
            }
            this.onColResize.emit({
                element: column,
                delta: delta
            });
            if (this.isStateful()) {
                this.saveState();
            }
        }
        this.resizeHelperViewChild.nativeElement.style.display = 'none';
        DomHandler.removeClass(this.containerViewChild.nativeElement, 'p-unselectable-text');
    }
    setScrollableItemsWidthOnExpandResize(column, newColumnWidth, delta) {
        let scrollableView = column ? this.findParentScrollableView(column) : this.containerViewChild.nativeElement;
        let scrollableBody = DomHandler.findSingle(scrollableView, '.p-datatable-scrollable-body') || DomHandler.findSingle(scrollableView, 'cdk-virtual-scroll-viewport');
        let scrollableHeader = DomHandler.findSingle(scrollableView, '.p-datatable-scrollable-header');
        let scrollableFooter = DomHandler.findSingle(scrollableView, '.p-datatable-scrollable-footer');
        let scrollableBodyTable = DomHandler.findSingle(scrollableBody, '.p-datatable-scrollable-body table') || DomHandler.findSingle(scrollableView, 'cdk-virtual-scroll-viewport table');
        let scrollableHeaderTable = DomHandler.findSingle(scrollableHeader, 'table.p-datatable-scrollable-header-table');
        let scrollableFooterTable = DomHandler.findSingle(scrollableFooter, 'table.p-datatable-scrollable-footer-table');
        const scrollableBodyTableWidth = column ? scrollableBodyTable.offsetWidth + delta : newColumnWidth;
        const scrollableHeaderTableWidth = column ? scrollableHeaderTable.offsetWidth + delta : newColumnWidth;
        const isContainerInViewport = this.containerViewChild.nativeElement.offsetWidth >= scrollableBodyTableWidth;
        let setWidth = (container, table, width, isContainerInViewport) => {
            if (container && table) {
                container.style.width = isContainerInViewport ? width + DomHandler.calculateScrollbarWidth(scrollableBody) + 'px' : 'auto';
                table.style.width = width + 'px';
            }
        };
        setWidth(scrollableBody, scrollableBodyTable, scrollableBodyTableWidth, isContainerInViewport);
        setWidth(scrollableHeader, scrollableHeaderTable, scrollableHeaderTableWidth, isContainerInViewport);
        setWidth(scrollableFooter, scrollableFooterTable, scrollableHeaderTableWidth, isContainerInViewport);
        if (column) {
            let resizeColumnIndex = DomHandler.index(column);
            this.resizeColGroup(scrollableHeaderTable, resizeColumnIndex, newColumnWidth, null);
            this.resizeColGroup(scrollableBodyTable, resizeColumnIndex, newColumnWidth, null);
            this.resizeColGroup(scrollableFooterTable, resizeColumnIndex, newColumnWidth, null);
        }
    }
    findParentScrollableView(column) {
        if (column) {
            let parent = column.parentElement;
            while (parent && !DomHandler.hasClass(parent, 'p-datatable-scrollable-view')) {
                parent = parent.parentElement;
            }
            return parent;
        }
        else {
            return null;
        }
    }
    resizeColGroup(table, resizeColumnIndex, newColumnWidth, nextColumnWidth) {
        if (table) {
            let colGroup = table.children[0].nodeName === 'COLGROUP' ? table.children[0] : null;
            if (colGroup) {
                let col = colGroup.children[resizeColumnIndex];
                let nextCol = col.nextElementSibling;
                col.style.width = newColumnWidth + 'px';
                if (nextCol && nextColumnWidth) {
                    nextCol.style.width = nextColumnWidth + 'px';
                }
            }
            else {
                throw "Scrollable tables require a colgroup to support resizable columns";
            }
        }
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
        if (Object.keys(state).length) {
            storage.setItem(this.stateKey, JSON.stringify(state));
        }
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
        if (stateString) {
            let state = JSON.parse(stateString);
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
        let headers = DomHandler.find(this.containerViewChild.nativeElement, '.p-datatable-thead > tr:first-child > th');
        headers.map(header => widths.push(DomHandler.getOuterWidth(header)));
        state.columnWidths = widths.join(',');
        if (this.columnResizeMode === 'expand') {
            state.tableWidth = this.scrollable ? DomHandler.findSingle(this.containerViewChild.nativeElement, '.p-datatable-scrollable-header-table').style.width :
                DomHandler.getOuterWidth(this.tableViewChild.nativeElement) + 'px';
        }
    }
    restoreColumnWidths() {
        if (this.columnWidthsState) {
            let widths = this.columnWidthsState.split(',');
            if (this.columnResizeMode === 'expand' && this.tableWidthState) {
                if (this.scrollable) {
                    this.setScrollableItemsWidthOnExpandResize(null, this.tableWidthState, 0);
                }
                else {
                    this.tableViewChild.nativeElement.style.width = this.tableWidthState;
                    this.containerViewChild.nativeElement.style.width = this.tableWidthState;
                }
            }
            if (this.scrollable) {
                let headerCols = DomHandler.find(this.containerViewChild.nativeElement, '.p-datatable-scrollable-header-table > colgroup > col');
                let bodyCols = this.virtualScroll ? DomHandler.find(this.containerViewChild.nativeElement, 'cdk-virtual-scroll-viewport table > colgroup > col') : DomHandler.find(this.containerViewChild.nativeElement, '.p-datatable-scrollable-body table > colgroup > col');
                headerCols.map((col, index) => col.style.width = widths[index] + 'px');
                bodyCols.map((col, index) => col.style.width = widths[index] + 'px');
            }
            else {
                let headers = DomHandler.find(this.tableViewChild.nativeElement, '.p-datatable-thead > tr:first-child > th');
                headers.map((header, index) => header.style.width = widths[index] + 'px');
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
    ngOnDestroy() {
        this.unbindDocumentEditListener();
        this.editingCell = null;
        this.initialized = null;
    }
}
Table.decorators = [
    { type: Component, args: [{
                selector: 'p-table',
                template: `
        <div #container [ngStyle]="style" [class]="styleClass" data-scrollselectors=".p-datatable-scrollable-body, .p-datatable-unfrozen-view .p-datatable-scrollable-body"
            [ngClass]="{'p-datatable p-component': true,
                'p-datatable-hoverable-rows': (rowHover||selectionMode),
                'p-datatable-auto-layout': autoLayout,
                'p-datatable-resizable': resizableColumns,
                'p-datatable-resizable-fit': (resizableColumns && columnResizeMode === 'fit'),
                'p-datatable-scrollable': scrollable,
                'p-datatable-flex-scrollable': (scrollable && scrollHeight === 'flex'),
                'p-datatable-responsive': responsive}">
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

            <div class="p-datatable-wrapper" *ngIf="!scrollable">
                <table role="grid" #table [ngClass]="tableStyleClass" [ngStyle]="tableStyle">
                    <ng-container *ngTemplateOutlet="colGroupTemplate; context {$implicit: columns}"></ng-container>
                    <thead class="p-datatable-thead">
                        <ng-container *ngTemplateOutlet="headerTemplate; context: {$implicit: columns}"></ng-container>
                    </thead>
                    <tbody class="p-datatable-tbody" [pTableBody]="columns" [pTableBodyTemplate]="bodyTemplate"></tbody>
                    <tfoot *ngIf="footerTemplate" class="p-datatable-tfoot">
                        <ng-container *ngTemplateOutlet="footerTemplate; context {$implicit: columns}"></ng-container>
                    </tfoot>
                </table>
            </div>

            <div class="p-datatable-scrollable-wrapper" *ngIf="scrollable">
               <div class="p-datatable-scrollable-view p-datatable-frozen-view" *ngIf="frozenColumns||frozenBodyTemplate" #scrollableFrozenView [pScrollableView]="frozenColumns" [frozen]="true" [ngStyle]="{width: frozenWidth}" [scrollHeight]="scrollHeight"></div>
               <div class="p-datatable-scrollable-view" #scrollableView [pScrollableView]="columns" [frozen]="false" [scrollHeight]="scrollHeight" [ngStyle]="{left: frozenWidth, width: 'calc(100% - '+frozenWidth+')'}"></div>
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
                styles: [".p-datatable{position:relative}.p-datatable table{border-collapse:collapse;table-layout:fixed;width:100%}.p-datatable .p-sortable-column{-ms-user-select:none;-webkit-user-select:none;cursor:pointer;user-select:none}.p-datatable .p-sortable-column .p-column-title,.p-datatable .p-sortable-column .p-sortable-column-badge,.p-datatable .p-sortable-column .p-sortable-column-icon{vertical-align:middle}.p-datatable .p-sortable-column .p-sortable-column-badge{align-items:center;display:inline-flex;justify-content:center}.p-datatable-auto-layout>.p-datatable-wrapper{overflow-x:auto}.p-datatable-auto-layout>.p-datatable-wrapper>table{table-layout:auto}.p-datatable-hoverable-rows .p-selectable-row{cursor:pointer}.p-datatable-scrollable-wrapper{position:relative}.p-datatable-scrollable-footer,.p-datatable-scrollable-header{overflow:hidden}.p-datatable-scrollable-body{overflow:auto;position:relative}.p-datatable-scrollable-body>table>.p-datatable-tbody>tr:first-child>td{border-top:0}.p-datatable-virtual-table{position:absolute}.p-datatable-frozen-view .p-datatable-scrollable-body{overflow:hidden}.p-datatable-frozen-view>.p-datatable-scrollable-body>table>.p-datatable-tbody>tr>td:last-child{border-right:0}.p-datatable-unfrozen-view{position:absolute;top:0}.p-datatable-flex-scrollable,.p-datatable-flex-scrollable .p-datatable-scrollable-view,.p-datatable-flex-scrollable .p-datatable-scrollable-wrapper{display:flex;flex:1;flex-direction:column;height:100%}.p-datatable-flex-scrollable .p-datatable-scrollable-body,.p-datatable-flex-scrollable .p-datatable-virtual-scrollable-body{flex:1}.p-datatable-resizable>.p-datatable-wrapper{overflow-x:auto}.p-datatable-resizable .p-datatable-tbody>tr>td,.p-datatable-resizable .p-datatable-tfoot>tr>td,.p-datatable-resizable .p-datatable-thead>tr>th{overflow:hidden;white-space:nowrap}.p-datatable-resizable .p-resizable-column{background-clip:padding-box;position:relative}.p-datatable-resizable-fit .p-resizable-column:last-child .p-column-resizer{display:none}.p-datatable .p-column-resizer{border:1px solid transparent;cursor:col-resize;display:block;height:100%;margin:0;padding:0;position:absolute!important;right:0;top:0;width:.5rem}.p-datatable .p-column-resizer-helper{display:none;position:absolute;width:1px;z-index:10}.p-datatable .p-row-editor-cancel,.p-datatable .p-row-editor-init,.p-datatable .p-row-editor-save,.p-datatable .p-row-toggler{align-items:center;display:inline-flex;justify-content:center;overflow:hidden;position:relative}.p-datatable-reorder-indicator-down,.p-datatable-reorder-indicator-up{display:none;position:absolute}.p-datatable-reorderablerow-handle,[pReorderableColumn]{cursor:move}.p-datatable .p-datatable-loading-overlay{align-items:center;display:flex;justify-content:center;position:absolute;z-index:2}.p-column-filter-row{align-items:center;display:flex;width:100%}.p-column-filter-menu{display:inline-flex}.p-column-filter-row p-columnfilterformelement{flex:1 1 auto;width:1%}.p-column-filter-clear-button,.p-column-filter-menu-button{align-items:center;cursor:pointer;display:inline-flex;justify-content:center;overflow:hidden;position:relative;text-decoration:none}.p-column-filter-overlay{position:absolute}.p-column-filter-row-items{list-style:none;margin:0;padding:0}.p-column-filter-row-item{cursor:pointer}.p-column-filter-add-button,.p-column-filter-remove-button{justify-content:center}.p-column-filter-add-button .p-button-label,.p-column-filter-remove-button .p-button-label{flex-grow:0}.p-column-filter-buttonbar{align-items:center;display:flex;justify-content:space-between}.p-column-filter-buttonbar .p-button{width:auto}.p-datatable.p-datatable-responsive .p-datatable-tbody>tr>td .p-column-title{display:none}cdk-virtual-scroll-viewport{outline:0 none}@media screen and (max-width:40em){.p-datatable.p-datatable-responsive .p-datatable-tfoot>tr>td,.p-datatable.p-datatable-responsive .p-datatable-thead>tr>th{display:none!important}.p-datatable.p-datatable-responsive .p-datatable-tbody>tr>td{border:0;clear:left;display:block;float:left;text-align:left;width:100%}.p-datatable.p-datatable-responsive .p-datatable-tbody>tr>td .p-column-title{display:inline-block;font-weight:700;margin:-.4em 1em -.4em -.4rem;min-width:30%;padding:.4rem}}"]
            },] }
];
Table.ctorParameters = () => [
    { type: ElementRef },
    { type: NgZone },
    { type: TableService },
    { type: ChangeDetectorRef },
    { type: FilterService }
];
Table.propDecorators = {
    frozenColumns: [{ type: Input }],
    frozenValue: [{ type: Input }],
    style: [{ type: Input }],
    styleClass: [{ type: Input }],
    tableStyle: [{ type: Input }],
    tableStyleClass: [{ type: Input }],
    paginator: [{ type: Input }],
    pageLinks: [{ type: Input }],
    rowsPerPageOptions: [{ type: Input }],
    alwaysShowPaginator: [{ type: Input }],
    paginatorPosition: [{ type: Input }],
    paginatorDropdownAppendTo: [{ type: Input }],
    paginatorDropdownScrollHeight: [{ type: Input }],
    currentPageReportTemplate: [{ type: Input }],
    showCurrentPageReport: [{ type: Input }],
    showJumpToPageDropdown: [{ type: Input }],
    showFirstLastIcon: [{ type: Input }],
    showPageLinks: [{ type: Input }],
    defaultSortOrder: [{ type: Input }],
    sortMode: [{ type: Input }],
    resetPageOnSort: [{ type: Input }],
    selectionMode: [{ type: Input }],
    selectionChange: [{ type: Output }],
    contextMenuSelection: [{ type: Input }],
    contextMenuSelectionChange: [{ type: Output }],
    contextMenuSelectionMode: [{ type: Input }],
    dataKey: [{ type: Input }],
    metaKeySelection: [{ type: Input }],
    rowTrackBy: [{ type: Input }],
    lazy: [{ type: Input }],
    lazyLoadOnInit: [{ type: Input }],
    compareSelectionBy: [{ type: Input }],
    csvSeparator: [{ type: Input }],
    exportFilename: [{ type: Input }],
    filters: [{ type: Input }],
    globalFilterFields: [{ type: Input }],
    filterDelay: [{ type: Input }],
    filterLocale: [{ type: Input }],
    expandedRowKeys: [{ type: Input }],
    editingRowKeys: [{ type: Input }],
    rowExpandMode: [{ type: Input }],
    scrollable: [{ type: Input }],
    scrollHeight: [{ type: Input }],
    virtualScroll: [{ type: Input }],
    virtualScrollDelay: [{ type: Input }],
    virtualRowHeight: [{ type: Input }],
    frozenWidth: [{ type: Input }],
    responsive: [{ type: Input }],
    contextMenu: [{ type: Input }],
    resizableColumns: [{ type: Input }],
    columnResizeMode: [{ type: Input }],
    reorderableColumns: [{ type: Input }],
    loading: [{ type: Input }],
    loadingIcon: [{ type: Input }],
    showLoader: [{ type: Input }],
    rowHover: [{ type: Input }],
    customSort: [{ type: Input }],
    autoLayout: [{ type: Input }],
    exportFunction: [{ type: Input }],
    stateKey: [{ type: Input }],
    stateStorage: [{ type: Input }],
    editMode: [{ type: Input }],
    minBufferPx: [{ type: Input }],
    maxBufferPx: [{ type: Input }],
    onRowSelect: [{ type: Output }],
    onRowUnselect: [{ type: Output }],
    onPage: [{ type: Output }],
    onSort: [{ type: Output }],
    onFilter: [{ type: Output }],
    onLazyLoad: [{ type: Output }],
    onRowExpand: [{ type: Output }],
    onRowCollapse: [{ type: Output }],
    onContextMenuSelect: [{ type: Output }],
    onColResize: [{ type: Output }],
    onColReorder: [{ type: Output }],
    onRowReorder: [{ type: Output }],
    onEditInit: [{ type: Output }],
    onEditComplete: [{ type: Output }],
    onEditCancel: [{ type: Output }],
    onHeaderCheckboxToggle: [{ type: Output }],
    sortFunction: [{ type: Output }],
    firstChange: [{ type: Output }],
    rowsChange: [{ type: Output }],
    onStateSave: [{ type: Output }],
    onStateRestore: [{ type: Output }],
    containerViewChild: [{ type: ViewChild, args: ['container',] }],
    resizeHelperViewChild: [{ type: ViewChild, args: ['resizeHelper',] }],
    reorderIndicatorUpViewChild: [{ type: ViewChild, args: ['reorderIndicatorUp',] }],
    reorderIndicatorDownViewChild: [{ type: ViewChild, args: ['reorderIndicatorDown',] }],
    tableViewChild: [{ type: ViewChild, args: ['table',] }],
    scrollableViewChild: [{ type: ViewChild, args: ['scrollableView',] }],
    scrollableFrozenViewChild: [{ type: ViewChild, args: ['scrollableFrozenView',] }],
    templates: [{ type: ContentChildren, args: [PrimeTemplate,] }],
    value: [{ type: Input }],
    columns: [{ type: Input }],
    first: [{ type: Input }],
    rows: [{ type: Input }],
    totalRecords: [{ type: Input }],
    sortField: [{ type: Input }],
    sortOrder: [{ type: Input }],
    multiSortMeta: [{ type: Input }],
    selection: [{ type: Input }]
};
export class TableBody {
    constructor(dt, tableService, cd) {
        this.dt = dt;
        this.tableService = tableService;
        this.cd = cd;
        this.subscription = this.dt.tableService.valueSource$.subscribe(() => {
            if (this.dt.virtualScroll) {
                this.cd.detectChanges();
            }
        });
    }
    ngOnDestroy() {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }
}
TableBody.decorators = [
    { type: Component, args: [{
                selector: '[pTableBody]',
                template: `
        <ng-container *ngIf="!dt.expandedRowTemplate && !dt.virtualScroll">
            <ng-template ngFor let-rowData let-rowIndex="index" [ngForOf]="(dt.paginator && !dt.lazy) ? ((dt.filteredValue||dt.value) | slice:dt.first:(dt.first + dt.rows)) : (dt.filteredValue||dt.value)" [ngForTrackBy]="dt.rowTrackBy">
                <ng-container *ngTemplateOutlet="template; context: {$implicit: rowData, rowIndex: dt.paginator ? (dt.first + rowIndex) : rowIndex, columns: columns, editing: (dt.editMode === 'row' && dt.isRowEditing(rowData))}"></ng-container>
            </ng-template>
        </ng-container>
        <ng-container *ngIf="!dt.expandedRowTemplate && dt.virtualScroll">
            <ng-template cdkVirtualFor let-rowData let-rowIndex="index" [cdkVirtualForOf]="dt.filteredValue||dt.value" [cdkVirtualForTrackBy]="dt.rowTrackBy" [cdkVirtualForTemplateCacheSize]="0">
                <ng-container *ngTemplateOutlet="rowData ? template: dt.loadingBodyTemplate; context: {$implicit: rowData, rowIndex: dt.paginator ? (dt.first + rowIndex) : rowIndex, columns: columns, editing: (dt.editMode === 'row' && dt.isRowEditing(rowData))}"></ng-container>
            </ng-template>
        </ng-container>
        <ng-container *ngIf="dt.expandedRowTemplate && !(frozen && dt.frozenExpandedRowTemplate)">
            <ng-template ngFor let-rowData let-rowIndex="index" [ngForOf]="(dt.paginator && !dt.lazy) ? ((dt.filteredValue||dt.value) | slice:dt.first:(dt.first + dt.rows)) : (dt.filteredValue||dt.value)" [ngForTrackBy]="dt.rowTrackBy">
                <ng-container *ngTemplateOutlet="template; context: {$implicit: rowData, rowIndex: dt.paginator ? (dt.first + rowIndex) : rowIndex, columns: columns, expanded: dt.isRowExpanded(rowData), editing: (dt.editMode === 'row' && dt.isRowEditing(rowData))}"></ng-container>
                <ng-container *ngIf="dt.isRowExpanded(rowData)">
                    <ng-container *ngTemplateOutlet="dt.expandedRowTemplate; context: {$implicit: rowData, rowIndex: dt.paginator ? (dt.first + rowIndex) : rowIndex, columns: columns}"></ng-container>
                </ng-container>
            </ng-template>
        </ng-container>
        <ng-container *ngIf="dt.frozenExpandedRowTemplate && frozen">
            <ng-template ngFor let-rowData let-rowIndex="index" [ngForOf]="(dt.paginator && !dt.lazy) ? ((dt.filteredValue||dt.value) | slice:dt.first:(dt.first + dt.rows)) : (dt.filteredValue||dt.value)" [ngForTrackBy]="dt.rowTrackBy">
                <ng-container *ngTemplateOutlet="template; context: {$implicit: rowData, rowIndex: dt.paginator ? (dt.first + rowIndex) : rowIndex, columns: columns, expanded: dt.isRowExpanded(rowData), editing: (dt.editMode === 'row' && dt.isRowEditing(rowData))}"></ng-container>
                <ng-container *ngIf="dt.isRowExpanded(rowData)">
                    <ng-container *ngTemplateOutlet="dt.frozenExpandedRowTemplate; context: {$implicit: rowData, rowIndex: dt.paginator ? (dt.first + rowIndex) : rowIndex, columns: columns}"></ng-container>
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
                encapsulation: ViewEncapsulation.None
            },] }
];
TableBody.ctorParameters = () => [
    { type: Table },
    { type: TableService },
    { type: ChangeDetectorRef }
];
TableBody.propDecorators = {
    columns: [{ type: Input, args: ["pTableBody",] }],
    template: [{ type: Input, args: ["pTableBodyTemplate",] }],
    frozen: [{ type: Input }]
};
export class ScrollableView {
    constructor(dt, el, zone) {
        this.dt = dt;
        this.el = el;
        this.zone = zone;
    }
    get scrollHeight() {
        return this._scrollHeight;
    }
    set scrollHeight(val) {
        this._scrollHeight = val;
        if (val != null && (val.includes('%') || val.includes('calc'))) {
            console.log('Percentage scroll height calculation is removed in favor of the more performant CSS based flex mode, use scrollHeight="flex" instead.');
        }
        if (this.dt.virtualScroll && this.virtualScrollBody) {
            this.virtualScrollBody.ngOnInit();
        }
    }
    ngAfterViewInit() {
        if (!this.frozen) {
            if (this.dt.frozenColumns || this.dt.frozenBodyTemplate) {
                DomHandler.addClass(this.el.nativeElement, 'p-datatable-unfrozen-view');
            }
            let frozenView = this.el.nativeElement.previousElementSibling;
            if (frozenView) {
                if (this.dt.virtualScroll)
                    this.frozenSiblingBody = DomHandler.findSingle(frozenView, '.p-datatable-virtual-scrollable-body');
                else
                    this.frozenSiblingBody = DomHandler.findSingle(frozenView, '.p-datatable-scrollable-body');
            }
            let scrollBarWidth = DomHandler.calculateScrollbarWidth();
            this.scrollHeaderBoxViewChild.nativeElement.style.paddingRight = scrollBarWidth + 'px';
            if (this.scrollFooterBoxViewChild && this.scrollFooterBoxViewChild.nativeElement) {
                this.scrollFooterBoxViewChild.nativeElement.style.paddingRight = scrollBarWidth + 'px';
            }
        }
        else {
            if (this.scrollableAlignerViewChild && this.scrollableAlignerViewChild.nativeElement) {
                this.scrollableAlignerViewChild.nativeElement.style.height = DomHandler.calculateScrollbarHeight() + 'px';
            }
        }
        this.bindEvents();
    }
    bindEvents() {
        this.zone.runOutsideAngular(() => {
            if (this.scrollHeaderViewChild && this.scrollHeaderViewChild.nativeElement) {
                this.headerScrollListener = this.onHeaderScroll.bind(this);
                this.scrollHeaderViewChild.nativeElement.addEventListener('scroll', this.headerScrollListener);
            }
            if (this.scrollFooterViewChild && this.scrollFooterViewChild.nativeElement) {
                this.footerScrollListener = this.onFooterScroll.bind(this);
                this.scrollFooterViewChild.nativeElement.addEventListener('scroll', this.footerScrollListener);
            }
            if (!this.frozen) {
                this.bodyScrollListener = this.onBodyScroll.bind(this);
                if (this.dt.virtualScroll)
                    this.virtualScrollBody.getElementRef().nativeElement.addEventListener('scroll', this.bodyScrollListener);
                else
                    this.scrollBodyViewChild.nativeElement.addEventListener('scroll', this.bodyScrollListener);
            }
        });
    }
    unbindEvents() {
        if (this.scrollHeaderViewChild && this.scrollHeaderViewChild.nativeElement) {
            this.scrollHeaderViewChild.nativeElement.removeEventListener('scroll', this.headerScrollListener);
        }
        if (this.scrollFooterViewChild && this.scrollFooterViewChild.nativeElement) {
            this.scrollFooterViewChild.nativeElement.removeEventListener('scroll', this.footerScrollListener);
        }
        if (this.scrollBodyViewChild && this.scrollBodyViewChild.nativeElement) {
            this.scrollBodyViewChild.nativeElement.removeEventListener('scroll', this.bodyScrollListener);
        }
        if (this.virtualScrollBody && this.virtualScrollBody.getElementRef()) {
            this.virtualScrollBody.getElementRef().nativeElement.removeEventListener('scroll', this.bodyScrollListener);
        }
    }
    onHeaderScroll() {
        const scrollLeft = this.scrollHeaderViewChild.nativeElement.scrollLeft;
        this.scrollBodyViewChild.nativeElement.scrollLeft = scrollLeft;
        if (this.scrollFooterViewChild && this.scrollFooterViewChild.nativeElement) {
            this.scrollFooterViewChild.nativeElement.scrollLeft = scrollLeft;
        }
        this.preventBodyScrollPropagation = true;
    }
    onFooterScroll() {
        const scrollLeft = this.scrollFooterViewChild.nativeElement.scrollLeft;
        this.scrollBodyViewChild.nativeElement.scrollLeft = scrollLeft;
        if (this.scrollHeaderViewChild && this.scrollHeaderViewChild.nativeElement) {
            this.scrollHeaderViewChild.nativeElement.scrollLeft = scrollLeft;
        }
        this.preventBodyScrollPropagation = true;
    }
    onBodyScroll(event) {
        if (this.preventBodyScrollPropagation) {
            this.preventBodyScrollPropagation = false;
            return;
        }
        if (this.scrollHeaderViewChild && this.scrollHeaderViewChild.nativeElement) {
            this.scrollHeaderBoxViewChild.nativeElement.style.marginLeft = -1 * event.target.scrollLeft + 'px';
        }
        if (this.scrollFooterViewChild && this.scrollFooterViewChild.nativeElement) {
            this.scrollFooterBoxViewChild.nativeElement.style.marginLeft = -1 * event.target.scrollLeft + 'px';
        }
        if (this.frozenSiblingBody) {
            this.frozenSiblingBody.scrollTop = event.target.scrollTop;
        }
    }
    onScrollIndexChange(index) {
        if (this.dt.lazy) {
            if (this.virtualScrollTimeout) {
                clearTimeout(this.virtualScrollTimeout);
            }
            this.virtualScrollTimeout = setTimeout(() => {
                let page = Math.floor(index / this.dt.rows);
                let virtualScrollOffset = page === 0 ? 0 : (page - 1) * this.dt.rows;
                let virtualScrollChunkSize = page === 0 ? this.dt.rows * 2 : this.dt.rows * 3;
                if (page !== this.virtualPage) {
                    this.virtualPage = page;
                    this.dt.onLazyLoad.emit({
                        first: virtualScrollOffset,
                        rows: virtualScrollChunkSize,
                        sortField: this.dt.sortField,
                        sortOrder: this.dt.sortOrder,
                        filters: this.dt.filters,
                        globalFilter: this.dt.filters && this.dt.filters['global'] ? this.dt.filters['global'].value : null,
                        multiSortMeta: this.dt.multiSortMeta
                    });
                }
            }, this.dt.virtualScrollDelay);
        }
    }
    getPageCount() {
        let dataToRender = this.dt.filteredValue || this.dt.value;
        let dataLength = dataToRender ? dataToRender.length : 0;
        return Math.ceil(dataLength / this.dt.rows);
    }
    scrollToVirtualIndex(index) {
        if (this.virtualScrollBody) {
            this.virtualScrollBody.scrollToIndex(index);
        }
    }
    scrollTo(options) {
        if (this.virtualScrollBody) {
            this.virtualScrollBody.scrollTo(options);
        }
        else {
            if (this.scrollBodyViewChild.nativeElement.scrollTo) {
                this.scrollBodyViewChild.nativeElement.scrollTo(options);
            }
            else {
                this.scrollBodyViewChild.nativeElement.scrollLeft = options.left;
                this.scrollBodyViewChild.nativeElement.scrollTop = options.top;
            }
        }
    }
    ngOnDestroy() {
        this.unbindEvents();
        this.frozenSiblingBody = null;
    }
}
ScrollableView.decorators = [
    { type: Component, args: [{
                selector: '[pScrollableView]',
                template: `
        <div #scrollHeader class="p-datatable-scrollable-header">
            <div #scrollHeaderBox class="p-datatable-scrollable-header-box">
                <table class="p-datatable-scrollable-header-table" [ngClass]="dt.tableStyleClass" [ngStyle]="dt.tableStyle">
                    <ng-container *ngTemplateOutlet="frozen ? dt.frozenColGroupTemplate||dt.colGroupTemplate : dt.colGroupTemplate; context {$implicit: columns}"></ng-container>
                    <thead class="p-datatable-thead">
                        <ng-container *ngTemplateOutlet="frozen ? dt.frozenHeaderTemplate||dt.headerTemplate : dt.headerTemplate; context {$implicit: columns}"></ng-container>
                    </thead>
                    <tbody class="p-datatable-tbody">
                        <ng-template ngFor let-rowData let-rowIndex="index" [ngForOf]="dt.frozenValue" [ngForTrackBy]="dt.rowTrackBy">
                            <ng-container *ngTemplateOutlet="dt.frozenRowsTemplate; context: {$implicit: rowData, rowIndex: rowIndex, columns: columns}"></ng-container>
                        </ng-template>
                    </tbody>
                </table>
            </div>
        </div>
        <ng-container *ngIf="!dt.virtualScroll; else virtualScrollTemplate">
            <div #scrollBody class="p-datatable-scrollable-body" [ngStyle]="{'max-height': dt.scrollHeight !== 'flex' ? scrollHeight : undefined, 'overflow-y': !frozen && dt.scrollHeight ? 'scroll' : undefined}">
                <table #scrollTable [class]="dt.tableStyleClass" [ngStyle]="dt.tableStyle">
                    <ng-container *ngTemplateOutlet="frozen ? dt.frozenColGroupTemplate||dt.colGroupTemplate : dt.colGroupTemplate; context {$implicit: columns}"></ng-container>
                    <tbody class="p-datatable-tbody" [pTableBody]="columns" [pTableBodyTemplate]="frozen ? dt.frozenBodyTemplate||dt.bodyTemplate : dt.bodyTemplate" [frozen]="frozen"></tbody>
                </table>
                <div #scrollableAligner style="background-color:transparent" *ngIf="frozen"></div>
            </div>
        </ng-container>
        <ng-template #virtualScrollTemplate>
            <cdk-virtual-scroll-viewport [itemSize]="dt.virtualRowHeight" tabindex="0" [style.height]="dt.scrollHeight !== 'flex' ? scrollHeight : undefined"
                    [minBufferPx]="dt.minBufferPx" [maxBufferPx]="dt.maxBufferPx" (scrolledIndexChange)="onScrollIndexChange($event)" class="p-datatable-virtual-scrollable-body">
                <table #scrollTable [class]="dt.tableStyleClass" [ngStyle]="dt.tableStyle">
                    <ng-container *ngTemplateOutlet="frozen ? dt.frozenColGroupTemplate||dt.colGroupTemplate : dt.colGroupTemplate; context {$implicit: columns}"></ng-container>
                    <tbody class="p-datatable-tbody" [pTableBody]="columns" [pTableBodyTemplate]="frozen ? dt.frozenBodyTemplate||dt.bodyTemplate : dt.bodyTemplate" [frozen]="frozen"></tbody>
                </table>
                <div #scrollableAligner style="background-color:transparent" *ngIf="frozen"></div>
            </cdk-virtual-scroll-viewport>
        </ng-template>
        <div #scrollFooter class="p-datatable-scrollable-footer">
            <div #scrollFooterBox class="p-datatable-scrollable-footer-box">
                <table class="p-datatable-scrollable-footer-table" [ngClass]="dt.tableStyleClass" [ngStyle]="dt.tableStyle">
                    <ng-container *ngTemplateOutlet="frozen ? dt.frozenColGroupTemplate||dt.colGroupTemplate : dt.colGroupTemplate; context {$implicit: columns}"></ng-container>
                    <tfoot class="p-datatable-tfoot">
                        <ng-container *ngTemplateOutlet="frozen ? dt.frozenFooterTemplate||dt.footerTemplate : dt.footerTemplate; context {$implicit: columns}"></ng-container>
                    </tfoot>
                </table>
            </div>
        </div>
    `,
                changeDetection: ChangeDetectionStrategy.Default,
                encapsulation: ViewEncapsulation.None
            },] }
];
ScrollableView.ctorParameters = () => [
    { type: Table },
    { type: ElementRef },
    { type: NgZone }
];
ScrollableView.propDecorators = {
    columns: [{ type: Input, args: ["pScrollableView",] }],
    frozen: [{ type: Input }],
    scrollHeaderViewChild: [{ type: ViewChild, args: ['scrollHeader',] }],
    scrollHeaderBoxViewChild: [{ type: ViewChild, args: ['scrollHeaderBox',] }],
    scrollBodyViewChild: [{ type: ViewChild, args: ['scrollBody',] }],
    scrollTableViewChild: [{ type: ViewChild, args: ['scrollTable',] }],
    scrollFooterViewChild: [{ type: ViewChild, args: ['scrollFooter',] }],
    scrollFooterBoxViewChild: [{ type: ViewChild, args: ['scrollFooterBox',] }],
    scrollableAlignerViewChild: [{ type: ViewChild, args: ['scrollableAligner',] }],
    virtualScrollBody: [{ type: ViewChild, args: [CdkVirtualScrollViewport,] }],
    scrollHeight: [{ type: Input }]
};
export class SortableColumn {
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
SortableColumn.decorators = [
    { type: Directive, args: [{
                selector: '[pSortableColumn]',
                host: {
                    '[class.p-sortable-column]': 'isEnabled()',
                    '[class.p-highlight]': 'sorted',
                    '[attr.tabindex]': 'isEnabled() ? "0" : null',
                    '[attr.role]': '"columnheader"',
                    '[attr.aria-sort]': 'sortOrder'
                }
            },] }
];
SortableColumn.ctorParameters = () => [
    { type: Table }
];
SortableColumn.propDecorators = {
    field: [{ type: Input, args: ["pSortableColumn",] }],
    pSortableColumnDisabled: [{ type: Input }],
    onClick: [{ type: HostListener, args: ['click', ['$event'],] }],
    onEnterKey: [{ type: HostListener, args: ['keydown.enter', ['$event'],] }]
};
export class SortIcon {
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
    ngOnDestroy() {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }
}
SortIcon.decorators = [
    { type: Component, args: [{
                selector: 'p-sortIcon',
                template: `
        <i class="p-sortable-column-icon pi pi-fw" [ngClass]="{'pi-sort-amount-up-alt': sortOrder === 1, 'pi-sort-amount-down': sortOrder === -1, 'pi-sort-alt': sortOrder === 0}"></i>
    `,
                changeDetection: ChangeDetectionStrategy.OnPush,
                encapsulation: ViewEncapsulation.None
            },] }
];
SortIcon.ctorParameters = () => [
    { type: Table },
    { type: ChangeDetectorRef }
];
SortIcon.propDecorators = {
    field: [{ type: Input }]
};
export class SelectableRow {
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
    onSpaceKeyDown(event) {
        event.preventDefault();
    }
    onPageDownKeyDown() {
        if (this.dt.virtualScroll) {
            DomHandler.findSingle(this.dt.scrollableViewChild.el.nativeElement, 'cdk-virtual-scroll-viewport').focus();
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
SelectableRow.decorators = [
    { type: Directive, args: [{
                selector: '[pSelectableRow]',
                host: {
                    '[class.p-selectable-row]': 'isEnabled()',
                    '[class.p-highlight]': 'selected',
                    '[attr.tabindex]': 'isEnabled() ? 0 : undefined'
                }
            },] }
];
SelectableRow.ctorParameters = () => [
    { type: Table },
    { type: TableService }
];
SelectableRow.propDecorators = {
    data: [{ type: Input, args: ["pSelectableRow",] }],
    index: [{ type: Input, args: ["pSelectableRowIndex",] }],
    pSelectableRowDisabled: [{ type: Input }],
    onClick: [{ type: HostListener, args: ['click', ['$event'],] }],
    onTouchEnd: [{ type: HostListener, args: ['touchend', ['$event'],] }],
    onArrowDownKeyDown: [{ type: HostListener, args: ['keydown.arrowdown', ['$event'],] }],
    onArrowUpKeyDown: [{ type: HostListener, args: ['keydown.arrowup', ['$event'],] }],
    onEnterKeyDown: [{ type: HostListener, args: ['keydown.enter', ['$event'],] }, { type: HostListener, args: ['keydown.shift.enter', ['$event'],] }, { type: HostListener, args: ['keydown.meta.enter', ['$event'],] }],
    onSpaceKeyDown: [{ type: HostListener, args: ['keydown.space', ['$event'],] }],
    onPageDownKeyDown: [{ type: HostListener, args: ['keydown.pagedown', ['$event'],] }, { type: HostListener, args: ['keydown.pageup', ['$event'],] }, { type: HostListener, args: ['keydown.home', ['$event'],] }, { type: HostListener, args: ['keydown.end', ['$event'],] }]
};
export class SelectableRowDblClick {
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
SelectableRowDblClick.decorators = [
    { type: Directive, args: [{
                selector: '[pSelectableRowDblClick]',
                host: {
                    '[class.p-selectable-row]': 'isEnabled()',
                    '[class.p-highlight]': 'selected'
                }
            },] }
];
SelectableRowDblClick.ctorParameters = () => [
    { type: Table },
    { type: TableService }
];
SelectableRowDblClick.propDecorators = {
    data: [{ type: Input, args: ["pSelectableRowDblClick",] }],
    index: [{ type: Input, args: ["pSelectableRowIndex",] }],
    pSelectableRowDisabled: [{ type: Input }],
    onClick: [{ type: HostListener, args: ['dblclick', ['$event'],] }]
};
export class ContextMenuRow {
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
ContextMenuRow.decorators = [
    { type: Directive, args: [{
                selector: '[pContextMenuRow]',
                host: {
                    '[class.p-highlight-contextmenu]': 'selected',
                    '[attr.tabindex]': 'isEnabled() ? 0 : undefined'
                }
            },] }
];
ContextMenuRow.ctorParameters = () => [
    { type: Table },
    { type: TableService },
    { type: ElementRef }
];
ContextMenuRow.propDecorators = {
    data: [{ type: Input, args: ["pContextMenuRow",] }],
    index: [{ type: Input, args: ["pContextMenuRowIndex",] }],
    pContextMenuRowDisabled: [{ type: Input }],
    onContextMenu: [{ type: HostListener, args: ['contextmenu', ['$event'],] }]
};
export class RowToggler {
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
RowToggler.decorators = [
    { type: Directive, args: [{
                selector: '[pRowToggler]'
            },] }
];
RowToggler.ctorParameters = () => [
    { type: Table }
];
RowToggler.propDecorators = {
    data: [{ type: Input, args: ['pRowToggler',] }],
    pRowTogglerDisabled: [{ type: Input }],
    onClick: [{ type: HostListener, args: ['click', ['$event'],] }]
};
export class ResizableColumn {
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
        this.dt.onColumnResizeEnd(event, this.el.nativeElement);
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
ResizableColumn.decorators = [
    { type: Directive, args: [{
                selector: '[pResizableColumn]'
            },] }
];
ResizableColumn.ctorParameters = () => [
    { type: Table },
    { type: ElementRef },
    { type: NgZone }
];
ResizableColumn.propDecorators = {
    pResizableColumnDisabled: [{ type: Input }]
};
export class ReorderableColumn {
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
ReorderableColumn.decorators = [
    { type: Directive, args: [{
                selector: '[pReorderableColumn]'
            },] }
];
ReorderableColumn.ctorParameters = () => [
    { type: Table },
    { type: ElementRef },
    { type: NgZone }
];
ReorderableColumn.propDecorators = {
    pReorderableColumnDisabled: [{ type: Input }],
    onDrop: [{ type: HostListener, args: ['drop', ['$event'],] }]
};
export class EditableColumn {
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
            this.dt.editingCellClick = true;
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
}
EditableColumn.decorators = [
    { type: Directive, args: [{
                selector: '[pEditableColumn]'
            },] }
];
EditableColumn.ctorParameters = () => [
    { type: Table },
    { type: ElementRef },
    { type: NgZone }
];
EditableColumn.propDecorators = {
    data: [{ type: Input, args: ["pEditableColumn",] }],
    field: [{ type: Input, args: ["pEditableColumnField",] }],
    rowIndex: [{ type: Input, args: ["pEditableColumnRowIndex",] }],
    pEditableColumnDisabled: [{ type: Input }],
    pFocusCellSelector: [{ type: Input }],
    onClick: [{ type: HostListener, args: ['click', ['$event'],] }],
    onEnterKeyDown: [{ type: HostListener, args: ['keydown.enter', ['$event'],] }],
    onEscapeKeyDown: [{ type: HostListener, args: ['keydown.escape', ['$event'],] }],
    onShiftKeyDown: [{ type: HostListener, args: ['keydown.tab', ['$event'],] }, { type: HostListener, args: ['keydown.shift.tab', ['$event'],] }, { type: HostListener, args: ['keydown.meta.tab', ['$event'],] }],
    onArrowDown: [{ type: HostListener, args: ['keydown.arrowdown', ['$event'],] }],
    onArrowUp: [{ type: HostListener, args: ['keydown.arrowup', ['$event'],] }],
    onArrowLeft: [{ type: HostListener, args: ['keydown.arrowleft', ['$event'],] }],
    onArrowRight: [{ type: HostListener, args: ['keydown.arrowright', ['$event'],] }]
};
export class EditableRow {
    constructor(el) {
        this.el = el;
    }
    isEnabled() {
        return this.pEditableRowDisabled !== true;
    }
}
EditableRow.decorators = [
    { type: Directive, args: [{
                selector: '[pEditableRow]'
            },] }
];
EditableRow.ctorParameters = () => [
    { type: ElementRef }
];
EditableRow.propDecorators = {
    data: [{ type: Input, args: ["pEditableRow",] }],
    pEditableRowDisabled: [{ type: Input }]
};
export class InitEditableRow {
    constructor(dt, editableRow) {
        this.dt = dt;
        this.editableRow = editableRow;
    }
    onClick(event) {
        this.dt.initRowEdit(this.editableRow.data);
        event.preventDefault();
    }
}
InitEditableRow.decorators = [
    { type: Directive, args: [{
                selector: '[pInitEditableRow]'
            },] }
];
InitEditableRow.ctorParameters = () => [
    { type: Table },
    { type: EditableRow }
];
InitEditableRow.propDecorators = {
    onClick: [{ type: HostListener, args: ['click', ['$event'],] }]
};
export class SaveEditableRow {
    constructor(dt, editableRow) {
        this.dt = dt;
        this.editableRow = editableRow;
    }
    onClick(event) {
        this.dt.saveRowEdit(this.editableRow.data, this.editableRow.el.nativeElement);
        event.preventDefault();
    }
}
SaveEditableRow.decorators = [
    { type: Directive, args: [{
                selector: '[pSaveEditableRow]'
            },] }
];
SaveEditableRow.ctorParameters = () => [
    { type: Table },
    { type: EditableRow }
];
SaveEditableRow.propDecorators = {
    onClick: [{ type: HostListener, args: ['click', ['$event'],] }]
};
export class CancelEditableRow {
    constructor(dt, editableRow) {
        this.dt = dt;
        this.editableRow = editableRow;
    }
    onClick(event) {
        this.dt.cancelRowEdit(this.editableRow.data);
        event.preventDefault();
    }
}
CancelEditableRow.decorators = [
    { type: Directive, args: [{
                selector: '[pCancelEditableRow]'
            },] }
];
CancelEditableRow.ctorParameters = () => [
    { type: Table },
    { type: EditableRow }
];
CancelEditableRow.propDecorators = {
    onClick: [{ type: HostListener, args: ['click', ['$event'],] }]
};
export class CellEditor {
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
CellEditor.decorators = [
    { type: Component, args: [{
                selector: 'p-cellEditor',
                template: `
        <ng-container *ngIf="editing">
            <ng-container *ngTemplateOutlet="inputTemplate"></ng-container>
        </ng-container>
        <ng-container *ngIf="!editing">
            <ng-container *ngTemplateOutlet="outputTemplate"></ng-container>
        </ng-container>
    `,
                encapsulation: ViewEncapsulation.None
            },] }
];
CellEditor.ctorParameters = () => [
    { type: Table },
    { type: EditableColumn, decorators: [{ type: Optional }] },
    { type: EditableRow, decorators: [{ type: Optional }] }
];
CellEditor.propDecorators = {
    templates: [{ type: ContentChildren, args: [PrimeTemplate,] }]
};
export class TableRadioButton {
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
TableRadioButton.decorators = [
    { type: Component, args: [{
                selector: 'p-tableRadioButton',
                template: `
        <div class="p-radiobutton p-component" (click)="onClick($event)">
            <div class="p-hidden-accessible">
                <input type="radio" [attr.id]="inputId" [attr.name]="name" [checked]="checked" (focus)="onFocus()" (blur)="onBlur()"
                [disabled]="disabled" [attr.aria-label]="ariaLabel">
            </div>
            <div #box [ngClass]="{'p-radiobutton-box p-component':true,
                'p-highlight':checked, 'p-disabled':disabled}" role="radio" [attr.aria-checked]="checked">
                <div class="p-radiobutton-icon"></div>
            </div>
        </div>
    `,
                changeDetection: ChangeDetectionStrategy.OnPush,
                encapsulation: ViewEncapsulation.None
            },] }
];
TableRadioButton.ctorParameters = () => [
    { type: Table },
    { type: TableService },
    { type: ChangeDetectorRef }
];
TableRadioButton.propDecorators = {
    disabled: [{ type: Input }],
    value: [{ type: Input }],
    index: [{ type: Input }],
    inputId: [{ type: Input }],
    name: [{ type: Input }],
    ariaLabel: [{ type: Input }],
    boxViewChild: [{ type: ViewChild, args: ['box',] }]
};
export class TableCheckbox {
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
TableCheckbox.decorators = [
    { type: Component, args: [{
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
                encapsulation: ViewEncapsulation.None
            },] }
];
TableCheckbox.ctorParameters = () => [
    { type: Table },
    { type: TableService },
    { type: ChangeDetectorRef }
];
TableCheckbox.propDecorators = {
    disabled: [{ type: Input }],
    value: [{ type: Input }],
    index: [{ type: Input }],
    inputId: [{ type: Input }],
    name: [{ type: Input }],
    required: [{ type: Input }],
    ariaLabel: [{ type: Input }],
    boxViewChild: [{ type: ViewChild, args: ['box',] }]
};
export class TableHeaderCheckbox {
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
        if (this.dt.filteredValue) {
            const val = this.dt.filteredValue;
            return (val && val.length > 0 && this.dt.selection && this.dt.selection.length > 0 && this.isAllFilteredValuesChecked());
        }
        else {
            const val = this.dt.value;
            return (val && val.length > 0 && this.dt.selection && this.dt.selection.length > 0 && this.dt.selection.length === val.length);
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
TableHeaderCheckbox.decorators = [
    { type: Component, args: [{
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
                encapsulation: ViewEncapsulation.None
            },] }
];
TableHeaderCheckbox.ctorParameters = () => [
    { type: Table },
    { type: TableService },
    { type: ChangeDetectorRef }
];
TableHeaderCheckbox.propDecorators = {
    boxViewChild: [{ type: ViewChild, args: ['box',] }],
    disabled: [{ type: Input }],
    inputId: [{ type: Input }],
    name: [{ type: Input }],
    ariaLabel: [{ type: Input }]
};
export class ReorderableRowHandle {
    constructor(el) {
        this.el = el;
    }
    ngAfterViewInit() {
        DomHandler.addClass(this.el.nativeElement, 'p-datatable-reorderablerow-handle');
    }
}
ReorderableRowHandle.decorators = [
    { type: Directive, args: [{
                selector: '[pReorderableRowHandle]'
            },] }
];
ReorderableRowHandle.ctorParameters = () => [
    { type: ElementRef }
];
ReorderableRowHandle.propDecorators = {
    index: [{ type: Input, args: ["pReorderableRowHandle",] }]
};
export class ReorderableRow {
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
ReorderableRow.decorators = [
    { type: Directive, args: [{
                selector: '[pReorderableRow]'
            },] }
];
ReorderableRow.ctorParameters = () => [
    { type: Table },
    { type: ElementRef },
    { type: NgZone }
];
ReorderableRow.propDecorators = {
    index: [{ type: Input, args: ["pReorderableRow",] }],
    pReorderableRowDisabled: [{ type: Input }],
    onDrop: [{ type: HostListener, args: ['drop', ['$event'],] }]
};
export class ColumnFilterFormElement {
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
ColumnFilterFormElement.decorators = [
    { type: Component, args: [{
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
                    [minFractionDigits]="minFractionDigits" [maxFractionDigits]="maxFractionDigits" [prefix]="prefix" [suffix]="suffix"
                    [mode]="currency ? 'currency' : 'decimal'" [locale]="locale" [localeMatcher]="localeMatcher" [currency]="currency" [currencyDisplay]="currencyDisplay" [useGrouping]="useGrouping"></p-inputNumber>
                <p-triStateCheckbox *ngSwitchCase="'boolean'" [ngModel]="filterConstraint?.value" (ngModelChange)="onModelChange($event)"></p-triStateCheckbox>
                <p-calendar *ngSwitchCase="'date'" [ngModel]="filterConstraint?.value" (ngModelChange)="onModelChange($event)"></p-calendar>
            </ng-container>
        </ng-template>
    `,
                encapsulation: ViewEncapsulation.None
            },] }
];
ColumnFilterFormElement.ctorParameters = () => [
    { type: Table }
];
ColumnFilterFormElement.propDecorators = {
    field: [{ type: Input }],
    type: [{ type: Input }],
    filterConstraint: [{ type: Input }],
    filterTemplate: [{ type: Input }],
    placeholder: [{ type: Input }],
    minFractionDigits: [{ type: Input }],
    maxFractionDigits: [{ type: Input }],
    prefix: [{ type: Input }],
    suffix: [{ type: Input }],
    locale: [{ type: Input }],
    localeMatcher: [{ type: Input }],
    currency: [{ type: Input }],
    currencyDisplay: [{ type: Input }],
    useGrouping: [{ type: Input }]
};
export class ColumnFilter {
    constructor(el, dt, renderer, config) {
        this.el = el;
        this.dt = dt;
        this.renderer = renderer;
        this.config = config;
        this.type = 'text';
        this.display = 'row';
        this.showMenu = true;
        this.operator = FilterOperator.AND;
        this.showOperator = true;
        this.showClearButton = true;
        this.showApplyButton = true;
        this.showMatchModes = true;
        this.showAddButton = true;
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
        this.generateMatchModeOptions();
        this.generateOperatorOptions();
    }
    generateMatchModeOptions() {
        var _a;
        this.matchModes = this.matchModeOptions || ((_a = this.config.filterMatchModeOptions[this.type]) === null || _a === void 0 ? void 0 : _a.map(key => {
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
    onOverlayAnimationStart(event) {
        switch (event.toState) {
            case 'visible':
                this.overlay = event.element;
                document.body.appendChild(this.overlay);
                this.overlay.style.zIndex = String(++DomHandler.zindex);
                DomHandler.absolutePosition(this.overlay, this.icon.nativeElement);
                this.bindDocumentClickListener();
                this.bindDocumentResizeListener();
                this.bindScrollListener();
                break;
            case 'void':
                this.onOverlayHide();
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
                if (this.isOutsideClicked(event)) {
                    this.hide();
                }
            });
        }
    }
    unbindDocumentClickListener() {
        if (this.documentClickListener) {
            this.documentClickListener();
            this.documentClickListener = null;
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
    }
    applyFilter() {
        this.dt._filter();
        this.hide();
    }
    ngOnDestroy() {
        if (this.overlay) {
            this.el.nativeElement.appendChild(this.overlay);
            this.onOverlayHide();
        }
        if (this.translationSubscription) {
            this.translationSubscription.unsubscribe();
        }
    }
}
ColumnFilter.decorators = [
    { type: Component, args: [{
                selector: 'p-columnFilter',
                template: `
        <div class="p-column-filter" [ngClass]="{'p-column-filter-row': display === 'row', 'p-column-filter-menu': display === 'menu'}">
            <p-columnFilterFormElement *ngIf="display === 'row'" class="p-fluid" [type]="type" [field]="field" [filterConstraint]="dt.filters[field]" [filterTemplate]="filterTemplate" [placeholder]="placeholder" [minFractionDigits]="minFractionDigits" [maxFractionDigits]="maxFractionDigits" [prefix]="prefix" [suffix]="suffix"
                                    [locale]="locale"  [localeMatcher]="localeMatcher" [currency]="currency" [currencyDisplay]="currencyDisplay" [useGrouping]="useGrouping"></p-columnFilterFormElement>
            <button #icon *ngIf="showMenuButton" type="button" class="p-column-filter-menu-button p-link" aria-haspopup="true" [attr.aria-expanded]="overlayVisible"
                [ngClass]="{'p-column-filter-menu-button-open': overlayVisible, 'p-column-filter-menu-button-active': hasFilter()}" 
                (click)="toggleMenu()" (keydown)="onToggleButtonKeyDown($event)"><span class="pi pi-filter-icon pi-filter"></span></button>
            <button #icon *ngIf="showMenuButton && display === 'row'" [ngClass]="{'p-hidden-space': !hasRowFilter()}" type="button" class="p-column-filter-clear-button p-link" (click)="clearFilter()"><span class="pi pi-filter-slash"></span></button>
            <div *ngIf="showMenu && overlayVisible" [ngClass]="{'p-column-filter-overlay p-component p-fluid': true, 'p-column-filter-overlay-menu': display === 'menu'}" 
                [@overlayAnimation]="'visible'" (@overlayAnimation.start)="onOverlayAnimationStart($event)" (keydown.escape)="onEscape()">
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
                        <button type="button" pButton class="p-button-outlined" (click)="clearFilter()" [label]="clearButtonLabel" pRipple></button>
                        <button type="button" pButton (click)="applyFilter()" [label]="applyButtonLabel" pRipple></button>
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
                encapsulation: ViewEncapsulation.None
            },] }
];
ColumnFilter.ctorParameters = () => [
    { type: ElementRef },
    { type: Table },
    { type: Renderer2 },
    { type: PrimeNGConfig }
];
ColumnFilter.propDecorators = {
    field: [{ type: Input }],
    type: [{ type: Input }],
    display: [{ type: Input }],
    showMenu: [{ type: Input }],
    matchMode: [{ type: Input }],
    operator: [{ type: Input }],
    showOperator: [{ type: Input }],
    showClearButton: [{ type: Input }],
    showApplyButton: [{ type: Input }],
    showMatchModes: [{ type: Input }],
    showAddButton: [{ type: Input }],
    placeholder: [{ type: Input }],
    matchModeOptions: [{ type: Input }],
    maxConstraints: [{ type: Input }],
    minFractionDigits: [{ type: Input }],
    maxFractionDigits: [{ type: Input }],
    prefix: [{ type: Input }],
    suffix: [{ type: Input }],
    locale: [{ type: Input }],
    localeMatcher: [{ type: Input }],
    currency: [{ type: Input }],
    currencyDisplay: [{ type: Input }],
    useGrouping: [{ type: Input }],
    icon: [{ type: ViewChild, args: ['icon',] }],
    templates: [{ type: ContentChildren, args: [PrimeTemplate,] }]
};
export class TableModule {
}
TableModule.decorators = [
    { type: NgModule, args: [{
                imports: [CommonModule, PaginatorModule, InputTextModule, DropdownModule, ScrollingModule, FormsModule, ButtonModule, SelectButtonModule, CalendarModule, InputNumberModule, TriStateCheckboxModule],
                exports: [Table, SharedModule, SortableColumn, SelectableRow, RowToggler, ContextMenuRow, ResizableColumn, ReorderableColumn, EditableColumn, CellEditor, SortIcon,
                    TableRadioButton, TableCheckbox, TableHeaderCheckbox, ReorderableRowHandle, ReorderableRow, SelectableRowDblClick, EditableRow, InitEditableRow, SaveEditableRow, CancelEditableRow, ScrollingModule, ColumnFilter],
                declarations: [Table, SortableColumn, SelectableRow, RowToggler, ContextMenuRow, ResizableColumn, ReorderableColumn, EditableColumn, CellEditor, TableBody, ScrollableView, SortIcon,
                    TableRadioButton, TableCheckbox, TableHeaderCheckbox, ReorderableRowHandle, ReorderableRow, SelectableRowDblClick, EditableRow, InitEditableRow, SaveEditableRow, CancelEditableRow, ColumnFilter, ColumnFilterFormElement]
            },] }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFibGUuanMiLCJzb3VyY2VSb290IjoiLi4vLi4vLi4vc3JjL2FwcC9jb21wb25lbnRzL3RhYmxlLyIsInNvdXJjZXMiOlsidGFibGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFFBQVEsRUFBRSxTQUFTLEVBQUUsWUFBWSxFQUFvQyxTQUFTLEVBQUUsUUFBUSxFQUM3RixLQUFLLEVBQUUsTUFBTSxFQUFFLFlBQVksRUFBRSxVQUFVLEVBQUUsZUFBZSxFQUEwQixTQUFTLEVBQUUsTUFBTSxFQUFFLGlCQUFpQixFQUE0Qix1QkFBdUIsRUFBUyxpQkFBaUIsRUFBRSxTQUFTLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFDek8sT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUM3QyxPQUFPLEVBQUUsYUFBYSxFQUFFLFlBQVksRUFBRSxlQUFlLEVBQUUsY0FBYyxFQUFjLGFBQWEsRUFBRSxlQUFlLEVBQUUsYUFBYSxFQUFFLE1BQU0sYUFBYSxDQUFDO0FBQ3RKLE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQztBQUNwRCxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sbUJBQW1CLENBQUM7QUFDcEQsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQzlDLE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBQzFELE9BQU8sRUFBRSxzQkFBc0IsRUFBRSxNQUFNLDBCQUEwQixDQUFDO0FBQ2xFLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSxrQkFBa0IsQ0FBQztBQUNsRCxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQUN4RCxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sa0JBQWtCLENBQUM7QUFDbEQsT0FBTyxFQUFFLFVBQVUsRUFBRSw2QkFBNkIsRUFB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LGlCQUFpQixFQUFDLGNBQWMsRUFBQyxVQUFVLEVBQUMsUUFBUTtvQkFDaEosZ0JBQWdCLEVBQUMsYUFBYSxFQUFDLG1CQUFtQixFQUFDLG9CQUFvQixFQUFDLGNBQWMsRUFBQyxxQkFBcUIsRUFBQyxXQUFXLEVBQUMsZUFBZSxFQUFDLGVBQWUsRUFBQyxpQkFBaUIsRUFBQyxlQUFlLEVBQUMsWUFBWSxDQUFDO2dCQUNoTixZQUFZLEVBQUUsQ0FBQyxLQUFLLEVBQUMsY0FBYyxFQUFDLGFBQWEsRUFBQyxVQUFVLEVBQUMsY0FBYyxFQUFDLGVBQWUsRUFBQyxpQkFBaUIsRUFBQyxjQUFjLEVBQUMsVUFBVSxFQUFDLFNBQVMsRUFBQyxjQUFjLEVBQUMsUUFBUTtvQkFDakssZ0JBQWdCLEVBQUMsYUFBYSxFQUFDLG1CQUFtQixFQUFDLG9CQUFvQixFQUFDLGNBQWMsRUFBQyxxQkFBcUIsRUFBQyxXQUFXLEVBQUMsZUFBZSxFQUFDLGVBQWUsRUFBQyxpQkFBaUIsRUFBQyxZQUFZLEVBQUMsdUJBQXVCLENBQUM7YUFDM04iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBOZ01vZHVsZSwgQ29tcG9uZW50LCBIb3N0TGlzdGVuZXIsIE9uSW5pdCwgT25EZXN0cm95LCBBZnRlclZpZXdJbml0LCBEaXJlY3RpdmUsIE9wdGlvbmFsLCBBZnRlckNvbnRlbnRJbml0LFxuICAgIElucHV0LCBPdXRwdXQsIEV2ZW50RW1pdHRlciwgRWxlbWVudFJlZiwgQ29udGVudENoaWxkcmVuLCBUZW1wbGF0ZVJlZiwgUXVlcnlMaXN0LCBWaWV3Q2hpbGQsIE5nWm9uZSwgQ2hhbmdlRGV0ZWN0b3JSZWYsIE9uQ2hhbmdlcywgU2ltcGxlQ2hhbmdlcywgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksIFF1ZXJ5LCBWaWV3RW5jYXBzdWxhdGlvbiwgUmVuZGVyZXIyfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBGb3Jtc01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7IFByaW1lVGVtcGxhdGUsIFNoYXJlZE1vZHVsZSwgRmlsdGVyTWF0Y2hNb2RlLCBGaWx0ZXJPcGVyYXRvciwgU2VsZWN0SXRlbSwgUHJpbWVOR0NvbmZpZywgVHJhbnNsYXRpb25LZXlzLCBGaWx0ZXJTZXJ2aWNlIH0gZnJvbSAncHJpbWVuZy9hcGknO1xuaW1wb3J0IHsgUGFnaW5hdG9yTW9kdWxlIH0gZnJvbSAncHJpbWVuZy9wYWdpbmF0b3InO1xuaW1wb3J0IHsgSW5wdXRUZXh0TW9kdWxlIH0gZnJvbSAncHJpbWVuZy9pbnB1dHRleHQnO1xuaW1wb3J0IHsgQnV0dG9uTW9kdWxlIH0gZnJvbSAncHJpbWVuZy9idXR0b24nO1xuaW1wb3J0IHsgU2VsZWN0QnV0dG9uTW9kdWxlIH0gZnJvbSAncHJpbWVuZy9zZWxlY3RidXR0b24nO1xuaW1wb3J0IHsgVHJpU3RhdGVDaGVja2JveE1vZHVsZSB9IGZyb20gJ3ByaW1lbmcvdHJpc3RhdGVjaGVja2JveCc7XG5pbXBvcnQgeyBDYWxlbmRhck1vZHVsZSB9IGZyb20gJ3ByaW1lbmcvY2FsZW5kYXInO1xuaW1wb3J0IHsgSW5wdXROdW1iZXJNb2R1bGUgfSBmcm9tICdwcmltZW5nL2lucHV0bnVtYmVyJztcbmltcG9ydCB7IERyb3Bkb3duTW9kdWxlIH0gZnJvbSAncHJpbWVuZy9kcm9wZG93bic7XG5pbXBvcnQgeyBEb21IYW5kbGVyLCBDb25uZWN0ZWRPdmVybGF5U2Nyb2xsSGFuZGxlciB9IGZyb20gJ3ByaW1lbmcvZG9tJztcbmltcG9ydCB7IE9iamVjdFV0aWxzIH0gZnJvbSAncHJpbWVuZy91dGlscyc7XG5pbXBvcnQgeyBTb3J0TWV0YSB9IGZyb20gJ3ByaW1lbmcvYXBpJztcbmltcG9ydCB7IFRhYmxlU3RhdGUgfSBmcm9tICdwcmltZW5nL2FwaSc7XG5pbXBvcnQgeyBGaWx0ZXJNZXRhZGF0YSB9IGZyb20gJ3ByaW1lbmcvYXBpJztcbmltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEJsb2NrYWJsZVVJIH0gZnJvbSAncHJpbWVuZy9hcGknO1xuaW1wb3J0IHsgU3ViamVjdCwgU3Vic2NyaXB0aW9uIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBTY3JvbGxpbmdNb2R1bGUsIENka1ZpcnR1YWxTY3JvbGxWaWV3cG9ydCB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9zY3JvbGxpbmcnO1xuaW1wb3J0IHt0cmlnZ2VyLHN0eWxlLHRyYW5zaXRpb24sYW5pbWF0ZSxBbmltYXRpb25FdmVudH0gZnJvbSAnQGFuZ3VsYXIvYW5pbWF0aW9ucyc7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBUYWJsZVNlcnZpY2Uge1xuXG4gICAgcHJpdmF0ZSBzb3J0U291cmNlID0gbmV3IFN1YmplY3Q8U29ydE1ldGF8U29ydE1ldGFbXT4oKTtcbiAgICBwcml2YXRlIHNlbGVjdGlvblNvdXJjZSA9IG5ldyBTdWJqZWN0KCk7XG4gICAgcHJpdmF0ZSBjb250ZXh0TWVudVNvdXJjZSA9IG5ldyBTdWJqZWN0PGFueT4oKTtcbiAgICBwcml2YXRlIHZhbHVlU291cmNlID0gbmV3IFN1YmplY3Q8YW55PigpO1xuICAgIHByaXZhdGUgdG90YWxSZWNvcmRzU291cmNlID0gbmV3IFN1YmplY3Q8YW55PigpO1xuICAgIHByaXZhdGUgY29sdW1uc1NvdXJjZSA9IG5ldyBTdWJqZWN0KCk7XG5cbiAgICBzb3J0U291cmNlJCA9IHRoaXMuc29ydFNvdXJjZS5hc09ic2VydmFibGUoKTtcbiAgICBzZWxlY3Rpb25Tb3VyY2UkID0gdGhpcy5zZWxlY3Rpb25Tb3VyY2UuYXNPYnNlcnZhYmxlKCk7XG4gICAgY29udGV4dE1lbnVTb3VyY2UkID0gdGhpcy5jb250ZXh0TWVudVNvdXJjZS5hc09ic2VydmFibGUoKTtcbiAgICB2YWx1ZVNvdXJjZSQgPSB0aGlzLnZhbHVlU291cmNlLmFzT2JzZXJ2YWJsZSgpO1xuICAgIHRvdGFsUmVjb3Jkc1NvdXJjZSQgPSB0aGlzLnRvdGFsUmVjb3Jkc1NvdXJjZS5hc09ic2VydmFibGUoKTtcbiAgICBjb2x1bW5zU291cmNlJCA9IHRoaXMuY29sdW1uc1NvdXJjZS5hc09ic2VydmFibGUoKTtcblxuICAgIG9uU29ydChzb3J0TWV0YTogU29ydE1ldGF8U29ydE1ldGFbXSkge1xuICAgICAgICB0aGlzLnNvcnRTb3VyY2UubmV4dChzb3J0TWV0YSk7XG4gICAgfVxuXG4gICAgb25TZWxlY3Rpb25DaGFuZ2UoKSB7XG4gICAgICAgIHRoaXMuc2VsZWN0aW9uU291cmNlLm5leHQoKTtcbiAgICB9XG5cbiAgICBvbkNvbnRleHRNZW51KGRhdGE6IGFueSkge1xuICAgICAgICB0aGlzLmNvbnRleHRNZW51U291cmNlLm5leHQoZGF0YSk7XG4gICAgfVxuXG4gICAgb25WYWx1ZUNoYW5nZSh2YWx1ZTogYW55KSB7XG4gICAgICAgIHRoaXMudmFsdWVTb3VyY2UubmV4dCh2YWx1ZSk7XG4gICAgfVxuXG4gICAgb25Ub3RhbFJlY29yZHNDaGFuZ2UodmFsdWU6IG51bWJlcikge1xuICAgICAgICB0aGlzLnRvdGFsUmVjb3Jkc1NvdXJjZS5uZXh0KHZhbHVlKTtcbiAgICB9XG5cbiAgICBvbkNvbHVtbnNDaGFuZ2UoY29sdW1uczogYW55W10pIHtcbiAgICAgICAgdGhpcy5jb2x1bW5zU291cmNlLm5leHQoY29sdW1ucyk7XG4gICAgfVxufVxuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ3AtdGFibGUnLFxuICAgIHRlbXBsYXRlOiBgXG4gICAgICAgIDxkaXYgI2NvbnRhaW5lciBbbmdTdHlsZV09XCJzdHlsZVwiIFtjbGFzc109XCJzdHlsZUNsYXNzXCIgZGF0YS1zY3JvbGxzZWxlY3RvcnM9XCIucC1kYXRhdGFibGUtc2Nyb2xsYWJsZS1ib2R5LCAucC1kYXRhdGFibGUtdW5mcm96ZW4tdmlldyAucC1kYXRhdGFibGUtc2Nyb2xsYWJsZS1ib2R5XCJcbiAgICAgICAgICAgIFtuZ0NsYXNzXT1cInsncC1kYXRhdGFibGUgcC1jb21wb25lbnQnOiB0cnVlLFxuICAgICAgICAgICAgICAgICdwLWRhdGF0YWJsZS1ob3ZlcmFibGUtcm93cyc6IChyb3dIb3Zlcnx8c2VsZWN0aW9uTW9kZSksXG4gICAgICAgICAgICAgICAgJ3AtZGF0YXRhYmxlLWF1dG8tbGF5b3V0JzogYXV0b0xheW91dCxcbiAgICAgICAgICAgICAgICAncC1kYXRhdGFibGUtcmVzaXphYmxlJzogcmVzaXphYmxlQ29sdW1ucyxcbiAgICAgICAgICAgICAgICAncC1kYXRhdGFibGUtcmVzaXphYmxlLWZpdCc6IChyZXNpemFibGVDb2x1bW5zICYmIGNvbHVtblJlc2l6ZU1vZGUgPT09ICdmaXQnKSxcbiAgICAgICAgICAgICAgICAncC1kYXRhdGFibGUtc2Nyb2xsYWJsZSc6IHNjcm9sbGFibGUsXG4gICAgICAgICAgICAgICAgJ3AtZGF0YXRhYmxlLWZsZXgtc2Nyb2xsYWJsZSc6IChzY3JvbGxhYmxlICYmIHNjcm9sbEhlaWdodCA9PT0gJ2ZsZXgnKSxcbiAgICAgICAgICAgICAgICAncC1kYXRhdGFibGUtcmVzcG9uc2l2ZSc6IHJlc3BvbnNpdmV9XCI+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwicC1kYXRhdGFibGUtbG9hZGluZy1vdmVybGF5IHAtY29tcG9uZW50LW92ZXJsYXlcIiAqbmdJZj1cImxvYWRpbmcgJiYgc2hvd0xvYWRlclwiPlxuICAgICAgICAgICAgICAgIDxpIFtjbGFzc109XCIncC1kYXRhdGFibGUtbG9hZGluZy1pY29uIHBpLXNwaW4gJyArIGxvYWRpbmdJY29uXCI+PC9pPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8ZGl2ICpuZ0lmPVwiY2FwdGlvblRlbXBsYXRlXCIgY2xhc3M9XCJwLWRhdGF0YWJsZS1oZWFkZXJcIj5cbiAgICAgICAgICAgICAgICA8bmctY29udGFpbmVyICpuZ1RlbXBsYXRlT3V0bGV0PVwiY2FwdGlvblRlbXBsYXRlXCI+PC9uZy1jb250YWluZXI+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDxwLXBhZ2luYXRvciBbcm93c109XCJyb3dzXCIgW2ZpcnN0XT1cImZpcnN0XCIgW3RvdGFsUmVjb3Jkc109XCJ0b3RhbFJlY29yZHNcIiBbcGFnZUxpbmtTaXplXT1cInBhZ2VMaW5rc1wiIHN0eWxlQ2xhc3M9XCJwLXBhZ2luYXRvci10b3BcIiBbYWx3YXlzU2hvd109XCJhbHdheXNTaG93UGFnaW5hdG9yXCJcbiAgICAgICAgICAgICAgICAob25QYWdlQ2hhbmdlKT1cIm9uUGFnZUNoYW5nZSgkZXZlbnQpXCIgW3Jvd3NQZXJQYWdlT3B0aW9uc109XCJyb3dzUGVyUGFnZU9wdGlvbnNcIiAqbmdJZj1cInBhZ2luYXRvciAmJiAocGFnaW5hdG9yUG9zaXRpb24gPT09ICd0b3AnIHx8IHBhZ2luYXRvclBvc2l0aW9uID09J2JvdGgnKVwiXG4gICAgICAgICAgICAgICAgW3RlbXBsYXRlTGVmdF09XCJwYWdpbmF0b3JMZWZ0VGVtcGxhdGVcIiBbdGVtcGxhdGVSaWdodF09XCJwYWdpbmF0b3JSaWdodFRlbXBsYXRlXCIgW2Ryb3Bkb3duQXBwZW5kVG9dPVwicGFnaW5hdG9yRHJvcGRvd25BcHBlbmRUb1wiIFtkcm9wZG93blNjcm9sbEhlaWdodF09XCJwYWdpbmF0b3JEcm9wZG93blNjcm9sbEhlaWdodFwiXG4gICAgICAgICAgICAgICAgW2N1cnJlbnRQYWdlUmVwb3J0VGVtcGxhdGVdPVwiY3VycmVudFBhZ2VSZXBvcnRUZW1wbGF0ZVwiIFtzaG93Rmlyc3RMYXN0SWNvbl09XCJzaG93Rmlyc3RMYXN0SWNvblwiIFtkcm9wZG93bkl0ZW1UZW1wbGF0ZV09XCJwYWdpbmF0b3JEcm9wZG93bkl0ZW1UZW1wbGF0ZVwiIFtzaG93Q3VycmVudFBhZ2VSZXBvcnRdPVwic2hvd0N1cnJlbnRQYWdlUmVwb3J0XCIgW3Nob3dKdW1wVG9QYWdlRHJvcGRvd25dPVwic2hvd0p1bXBUb1BhZ2VEcm9wZG93blwiIFtzaG93UGFnZUxpbmtzXT1cInNob3dQYWdlTGlua3NcIj48L3AtcGFnaW5hdG9yPlxuXG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwicC1kYXRhdGFibGUtd3JhcHBlclwiICpuZ0lmPVwiIXNjcm9sbGFibGVcIj5cbiAgICAgICAgICAgICAgICA8dGFibGUgcm9sZT1cImdyaWRcIiAjdGFibGUgW25nQ2xhc3NdPVwidGFibGVTdHlsZUNsYXNzXCIgW25nU3R5bGVdPVwidGFibGVTdHlsZVwiPlxuICAgICAgICAgICAgICAgICAgICA8bmctY29udGFpbmVyICpuZ1RlbXBsYXRlT3V0bGV0PVwiY29sR3JvdXBUZW1wbGF0ZTsgY29udGV4dCB7JGltcGxpY2l0OiBjb2x1bW5zfVwiPjwvbmctY29udGFpbmVyPlxuICAgICAgICAgICAgICAgICAgICA8dGhlYWQgY2xhc3M9XCJwLWRhdGF0YWJsZS10aGVhZFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdUZW1wbGF0ZU91dGxldD1cImhlYWRlclRlbXBsYXRlOyBjb250ZXh0OiB7JGltcGxpY2l0OiBjb2x1bW5zfVwiPjwvbmctY29udGFpbmVyPlxuICAgICAgICAgICAgICAgICAgICA8L3RoZWFkPlxuICAgICAgICAgICAgICAgICAgICA8dGJvZHkgY2xhc3M9XCJwLWRhdGF0YWJsZS10Ym9keVwiIFtwVGFibGVCb2R5XT1cImNvbHVtbnNcIiBbcFRhYmxlQm9keVRlbXBsYXRlXT1cImJvZHlUZW1wbGF0ZVwiPjwvdGJvZHk+XG4gICAgICAgICAgICAgICAgICAgIDx0Zm9vdCAqbmdJZj1cImZvb3RlclRlbXBsYXRlXCIgY2xhc3M9XCJwLWRhdGF0YWJsZS10Zm9vdFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdUZW1wbGF0ZU91dGxldD1cImZvb3RlclRlbXBsYXRlOyBjb250ZXh0IHskaW1wbGljaXQ6IGNvbHVtbnN9XCI+PC9uZy1jb250YWluZXI+XG4gICAgICAgICAgICAgICAgICAgIDwvdGZvb3Q+XG4gICAgICAgICAgICAgICAgPC90YWJsZT5cbiAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwicC1kYXRhdGFibGUtc2Nyb2xsYWJsZS13cmFwcGVyXCIgKm5nSWY9XCJzY3JvbGxhYmxlXCI+XG4gICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwicC1kYXRhdGFibGUtc2Nyb2xsYWJsZS12aWV3IHAtZGF0YXRhYmxlLWZyb3plbi12aWV3XCIgKm5nSWY9XCJmcm96ZW5Db2x1bW5zfHxmcm96ZW5Cb2R5VGVtcGxhdGVcIiAjc2Nyb2xsYWJsZUZyb3plblZpZXcgW3BTY3JvbGxhYmxlVmlld109XCJmcm96ZW5Db2x1bW5zXCIgW2Zyb3plbl09XCJ0cnVlXCIgW25nU3R5bGVdPVwie3dpZHRoOiBmcm96ZW5XaWR0aH1cIiBbc2Nyb2xsSGVpZ2h0XT1cInNjcm9sbEhlaWdodFwiPjwvZGl2PlxuICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInAtZGF0YXRhYmxlLXNjcm9sbGFibGUtdmlld1wiICNzY3JvbGxhYmxlVmlldyBbcFNjcm9sbGFibGVWaWV3XT1cImNvbHVtbnNcIiBbZnJvemVuXT1cImZhbHNlXCIgW3Njcm9sbEhlaWdodF09XCJzY3JvbGxIZWlnaHRcIiBbbmdTdHlsZV09XCJ7bGVmdDogZnJvemVuV2lkdGgsIHdpZHRoOiAnY2FsYygxMDAlIC0gJytmcm96ZW5XaWR0aCsnKSd9XCI+PC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgPHAtcGFnaW5hdG9yIFtyb3dzXT1cInJvd3NcIiBbZmlyc3RdPVwiZmlyc3RcIiBbdG90YWxSZWNvcmRzXT1cInRvdGFsUmVjb3Jkc1wiIFtwYWdlTGlua1NpemVdPVwicGFnZUxpbmtzXCIgc3R5bGVDbGFzcz1cInAtcGFnaW5hdG9yLWJvdHRvbVwiIFthbHdheXNTaG93XT1cImFsd2F5c1Nob3dQYWdpbmF0b3JcIlxuICAgICAgICAgICAgICAgIChvblBhZ2VDaGFuZ2UpPVwib25QYWdlQ2hhbmdlKCRldmVudClcIiBbcm93c1BlclBhZ2VPcHRpb25zXT1cInJvd3NQZXJQYWdlT3B0aW9uc1wiICpuZ0lmPVwicGFnaW5hdG9yICYmIChwYWdpbmF0b3JQb3NpdGlvbiA9PT0gJ2JvdHRvbScgfHwgcGFnaW5hdG9yUG9zaXRpb24gPT0nYm90aCcpXCJcbiAgICAgICAgICAgICAgICBbdGVtcGxhdGVMZWZ0XT1cInBhZ2luYXRvckxlZnRUZW1wbGF0ZVwiIFt0ZW1wbGF0ZVJpZ2h0XT1cInBhZ2luYXRvclJpZ2h0VGVtcGxhdGVcIiBbZHJvcGRvd25BcHBlbmRUb109XCJwYWdpbmF0b3JEcm9wZG93bkFwcGVuZFRvXCIgW2Ryb3Bkb3duU2Nyb2xsSGVpZ2h0XT1cInBhZ2luYXRvckRyb3Bkb3duU2Nyb2xsSGVpZ2h0XCJcbiAgICAgICAgICAgICAgICBbY3VycmVudFBhZ2VSZXBvcnRUZW1wbGF0ZV09XCJjdXJyZW50UGFnZVJlcG9ydFRlbXBsYXRlXCIgW3Nob3dGaXJzdExhc3RJY29uXT1cInNob3dGaXJzdExhc3RJY29uXCIgW2Ryb3Bkb3duSXRlbVRlbXBsYXRlXT1cInBhZ2luYXRvckRyb3Bkb3duSXRlbVRlbXBsYXRlXCIgW3Nob3dDdXJyZW50UGFnZVJlcG9ydF09XCJzaG93Q3VycmVudFBhZ2VSZXBvcnRcIiBbc2hvd0p1bXBUb1BhZ2VEcm9wZG93bl09XCJzaG93SnVtcFRvUGFnZURyb3Bkb3duXCIgW3Nob3dQYWdlTGlua3NdPVwic2hvd1BhZ2VMaW5rc1wiPjwvcC1wYWdpbmF0b3I+XG5cbiAgICAgICAgICAgIDxkaXYgKm5nSWY9XCJzdW1tYXJ5VGVtcGxhdGVcIiBjbGFzcz1cInAtZGF0YXRhYmxlLWZvb3RlclwiPlxuICAgICAgICAgICAgICAgIDxuZy1jb250YWluZXIgKm5nVGVtcGxhdGVPdXRsZXQ9XCJzdW1tYXJ5VGVtcGxhdGVcIj48L25nLWNvbnRhaW5lcj5cbiAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICA8ZGl2ICNyZXNpemVIZWxwZXIgY2xhc3M9XCJwLWNvbHVtbi1yZXNpemVyLWhlbHBlclwiIHN0eWxlPVwiZGlzcGxheTpub25lXCIgKm5nSWY9XCJyZXNpemFibGVDb2x1bW5zXCI+PC9kaXY+XG4gICAgICAgICAgICA8c3BhbiAjcmVvcmRlckluZGljYXRvclVwIGNsYXNzPVwicGkgcGktYXJyb3ctZG93biBwLWRhdGF0YWJsZS1yZW9yZGVyLWluZGljYXRvci11cFwiIHN0eWxlPVwiZGlzcGxheTpub25lXCIgKm5nSWY9XCJyZW9yZGVyYWJsZUNvbHVtbnNcIj48L3NwYW4+XG4gICAgICAgICAgICA8c3BhbiAjcmVvcmRlckluZGljYXRvckRvd24gY2xhc3M9XCJwaSBwaS1hcnJvdy11cCBwLWRhdGF0YWJsZS1yZW9yZGVyLWluZGljYXRvci1kb3duXCIgc3R5bGU9XCJkaXNwbGF5Om5vbmVcIiAqbmdJZj1cInJlb3JkZXJhYmxlQ29sdW1uc1wiPjwvc3Bhbj5cbiAgICAgICAgPC9kaXY+XG4gICAgYCxcbiAgICBwcm92aWRlcnM6IFtUYWJsZVNlcnZpY2VdLFxuICAgIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuRGVmYXVsdCxcbiAgICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lLFxuICAgIHN0eWxlVXJsczogWycuL3RhYmxlLmNzcyddXG59KVxuZXhwb3J0IGNsYXNzIFRhYmxlIGltcGxlbWVudHMgT25Jbml0LCBBZnRlclZpZXdJbml0LCBBZnRlckNvbnRlbnRJbml0LCBCbG9ja2FibGVVSSwgT25DaGFuZ2VzIHtcblxuICAgIEBJbnB1dCgpIGZyb3plbkNvbHVtbnM6IGFueVtdO1xuXG4gICAgQElucHV0KCkgZnJvemVuVmFsdWU6IGFueVtdO1xuXG4gICAgQElucHV0KCkgc3R5bGU6IGFueTtcblxuICAgIEBJbnB1dCgpIHN0eWxlQ2xhc3M6IHN0cmluZztcblxuICAgIEBJbnB1dCgpIHRhYmxlU3R5bGU6IGFueTtcblxuICAgIEBJbnB1dCgpIHRhYmxlU3R5bGVDbGFzczogc3RyaW5nO1xuXG4gICAgQElucHV0KCkgcGFnaW5hdG9yOiBib29sZWFuO1xuXG4gICAgQElucHV0KCkgcGFnZUxpbmtzOiBudW1iZXIgPSA1O1xuXG4gICAgQElucHV0KCkgcm93c1BlclBhZ2VPcHRpb25zOiBhbnlbXTtcblxuICAgIEBJbnB1dCgpIGFsd2F5c1Nob3dQYWdpbmF0b3I6IGJvb2xlYW4gPSB0cnVlO1xuXG4gICAgQElucHV0KCkgcGFnaW5hdG9yUG9zaXRpb246IHN0cmluZyA9ICdib3R0b20nO1xuXG4gICAgQElucHV0KCkgcGFnaW5hdG9yRHJvcGRvd25BcHBlbmRUbzogYW55O1xuXG4gICAgQElucHV0KCkgcGFnaW5hdG9yRHJvcGRvd25TY3JvbGxIZWlnaHQ6IHN0cmluZyA9ICcyMDBweCc7XG5cbiAgICBASW5wdXQoKSBjdXJyZW50UGFnZVJlcG9ydFRlbXBsYXRlOiBzdHJpbmcgPSAne2N1cnJlbnRQYWdlfSBvZiB7dG90YWxQYWdlc30nO1xuXG4gICAgQElucHV0KCkgc2hvd0N1cnJlbnRQYWdlUmVwb3J0OiBib29sZWFuO1xuXG4gICAgQElucHV0KCkgc2hvd0p1bXBUb1BhZ2VEcm9wZG93bjogYm9vbGVhbjtcblxuICAgIEBJbnB1dCgpIHNob3dGaXJzdExhc3RJY29uOiBib29sZWFuID0gdHJ1ZTtcblxuICAgIEBJbnB1dCgpIHNob3dQYWdlTGlua3M6IGJvb2xlYW4gPSB0cnVlO1xuXG4gICAgQElucHV0KCkgZGVmYXVsdFNvcnRPcmRlcjogbnVtYmVyID0gMTtcblxuICAgIEBJbnB1dCgpIHNvcnRNb2RlOiBzdHJpbmcgPSAnc2luZ2xlJztcblxuICAgIEBJbnB1dCgpIHJlc2V0UGFnZU9uU29ydDogYm9vbGVhbiA9IHRydWU7XG5cbiAgICBASW5wdXQoKSBzZWxlY3Rpb25Nb2RlOiBzdHJpbmc7XG5cbiAgICBAT3V0cHV0KCkgc2VsZWN0aW9uQ2hhbmdlOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICAgIEBJbnB1dCgpIGNvbnRleHRNZW51U2VsZWN0aW9uOiBhbnk7XG5cbiAgICBAT3V0cHV0KCkgY29udGV4dE1lbnVTZWxlY3Rpb25DaGFuZ2U6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG4gICAgQElucHV0KCkgY29udGV4dE1lbnVTZWxlY3Rpb25Nb2RlOiBzdHJpbmcgPSBcInNlcGFyYXRlXCI7XG5cbiAgICBASW5wdXQoKSBkYXRhS2V5OiBzdHJpbmc7XG5cbiAgICBASW5wdXQoKSBtZXRhS2V5U2VsZWN0aW9uOiBib29sZWFuO1xuXG4gICAgQElucHV0KCkgcm93VHJhY2tCeTogRnVuY3Rpb24gPSAoaW5kZXg6IG51bWJlciwgaXRlbTogYW55KSA9PiBpdGVtO1xuXG4gICAgQElucHV0KCkgbGF6eTogYm9vbGVhbiA9IGZhbHNlO1xuXG4gICAgQElucHV0KCkgbGF6eUxvYWRPbkluaXQ6IGJvb2xlYW4gPSB0cnVlO1xuXG4gICAgQElucHV0KCkgY29tcGFyZVNlbGVjdGlvbkJ5OiBzdHJpbmcgPSAnZGVlcEVxdWFscyc7XG5cbiAgICBASW5wdXQoKSBjc3ZTZXBhcmF0b3I6IHN0cmluZyA9ICcsJztcblxuICAgIEBJbnB1dCgpIGV4cG9ydEZpbGVuYW1lOiBzdHJpbmcgPSAnZG93bmxvYWQnO1xuXG4gICAgQElucHV0KCkgZmlsdGVyczogeyBbczogc3RyaW5nXTogRmlsdGVyTWV0YWRhdGEgfCBGaWx0ZXJNZXRhZGF0YVtdIH0gPSB7fTtcblxuICAgIEBJbnB1dCgpIGdsb2JhbEZpbHRlckZpZWxkczogc3RyaW5nW107XG5cbiAgICBASW5wdXQoKSBmaWx0ZXJEZWxheTogbnVtYmVyID0gMzAwO1xuXG4gICAgQElucHV0KCkgZmlsdGVyTG9jYWxlOiBzdHJpbmc7XG5cbiAgICBASW5wdXQoKSBleHBhbmRlZFJvd0tleXM6IHsgW3M6IHN0cmluZ106IGJvb2xlYW47IH0gPSB7fTtcblxuICAgIEBJbnB1dCgpIGVkaXRpbmdSb3dLZXlzOiB7IFtzOiBzdHJpbmddOiBib29sZWFuOyB9ID0ge307XG5cbiAgICBASW5wdXQoKSByb3dFeHBhbmRNb2RlOiBzdHJpbmcgPSAnbXVsdGlwbGUnO1xuXG4gICAgQElucHV0KCkgc2Nyb2xsYWJsZTogYm9vbGVhbjtcblxuICAgIEBJbnB1dCgpIHNjcm9sbEhlaWdodDogc3RyaW5nO1xuXG4gICAgQElucHV0KCkgdmlydHVhbFNjcm9sbDogYm9vbGVhbjtcblxuICAgIEBJbnB1dCgpIHZpcnR1YWxTY3JvbGxEZWxheTogbnVtYmVyID0gMjUwO1xuXG4gICAgQElucHV0KCkgdmlydHVhbFJvd0hlaWdodDogbnVtYmVyID0gMjg7XG5cbiAgICBASW5wdXQoKSBmcm96ZW5XaWR0aDogc3RyaW5nO1xuXG4gICAgQElucHV0KCkgcmVzcG9uc2l2ZTogYm9vbGVhbjtcblxuICAgIEBJbnB1dCgpIGNvbnRleHRNZW51OiBhbnk7XG5cbiAgICBASW5wdXQoKSByZXNpemFibGVDb2x1bW5zOiBib29sZWFuO1xuXG4gICAgQElucHV0KCkgY29sdW1uUmVzaXplTW9kZTogc3RyaW5nID0gJ2ZpdCc7XG5cbiAgICBASW5wdXQoKSByZW9yZGVyYWJsZUNvbHVtbnM6IGJvb2xlYW47XG5cbiAgICBASW5wdXQoKSBsb2FkaW5nOiBib29sZWFuO1xuXG4gICAgQElucHV0KCkgbG9hZGluZ0ljb246IHN0cmluZyA9ICdwaSBwaS1zcGlubmVyJztcblxuICAgIEBJbnB1dCgpIHNob3dMb2FkZXI6IGJvb2xlYW4gPSB0cnVlO1xuXG4gICAgQElucHV0KCkgcm93SG92ZXI6IGJvb2xlYW47XG5cbiAgICBASW5wdXQoKSBjdXN0b21Tb3J0OiBib29sZWFuO1xuXG4gICAgQElucHV0KCkgYXV0b0xheW91dDogYm9vbGVhbjtcblxuICAgIEBJbnB1dCgpIGV4cG9ydEZ1bmN0aW9uO1xuXG4gICAgQElucHV0KCkgc3RhdGVLZXk6IHN0cmluZztcblxuICAgIEBJbnB1dCgpIHN0YXRlU3RvcmFnZTogc3RyaW5nID0gJ3Nlc3Npb24nO1xuXG4gICAgQElucHV0KCkgZWRpdE1vZGU6IHN0cmluZyA9ICdjZWxsJztcblxuICAgIEBJbnB1dCgpIG1pbkJ1ZmZlclB4OiBudW1iZXI7XG5cbiAgICBASW5wdXQoKSBtYXhCdWZmZXJQeDogbnVtYmVyO1xuXG4gICAgQE91dHB1dCgpIG9uUm93U2VsZWN0OiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICAgIEBPdXRwdXQoKSBvblJvd1Vuc2VsZWN0OiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICAgIEBPdXRwdXQoKSBvblBhZ2U6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG4gICAgQE91dHB1dCgpIG9uU29ydDogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgICBAT3V0cHV0KCkgb25GaWx0ZXI6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG4gICAgQE91dHB1dCgpIG9uTGF6eUxvYWQ6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG4gICAgQE91dHB1dCgpIG9uUm93RXhwYW5kOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICAgIEBPdXRwdXQoKSBvblJvd0NvbGxhcHNlOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICAgIEBPdXRwdXQoKSBvbkNvbnRleHRNZW51U2VsZWN0OiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICAgIEBPdXRwdXQoKSBvbkNvbFJlc2l6ZTogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgICBAT3V0cHV0KCkgb25Db2xSZW9yZGVyOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICAgIEBPdXRwdXQoKSBvblJvd1Jlb3JkZXI6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG4gICAgQE91dHB1dCgpIG9uRWRpdEluaXQ6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG4gICAgQE91dHB1dCgpIG9uRWRpdENvbXBsZXRlOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICAgIEBPdXRwdXQoKSBvbkVkaXRDYW5jZWw6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG4gICAgQE91dHB1dCgpIG9uSGVhZGVyQ2hlY2tib3hUb2dnbGU6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG4gICAgQE91dHB1dCgpIHNvcnRGdW5jdGlvbjogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgICBAT3V0cHV0KCkgZmlyc3RDaGFuZ2U6IEV2ZW50RW1pdHRlcjxudW1iZXI+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG4gICAgQE91dHB1dCgpIHJvd3NDaGFuZ2U6IEV2ZW50RW1pdHRlcjxudW1iZXI+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG4gICAgQE91dHB1dCgpIG9uU3RhdGVTYXZlOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICAgIEBPdXRwdXQoKSBvblN0YXRlUmVzdG9yZTogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgICBAVmlld0NoaWxkKCdjb250YWluZXInKSBjb250YWluZXJWaWV3Q2hpbGQ6IEVsZW1lbnRSZWY7XG5cbiAgICBAVmlld0NoaWxkKCdyZXNpemVIZWxwZXInKSByZXNpemVIZWxwZXJWaWV3Q2hpbGQ6IEVsZW1lbnRSZWY7XG5cbiAgICBAVmlld0NoaWxkKCdyZW9yZGVySW5kaWNhdG9yVXAnKSByZW9yZGVySW5kaWNhdG9yVXBWaWV3Q2hpbGQ6IEVsZW1lbnRSZWY7XG5cbiAgICBAVmlld0NoaWxkKCdyZW9yZGVySW5kaWNhdG9yRG93bicpIHJlb3JkZXJJbmRpY2F0b3JEb3duVmlld0NoaWxkOiBFbGVtZW50UmVmO1xuXG4gICAgQFZpZXdDaGlsZCgndGFibGUnKSB0YWJsZVZpZXdDaGlsZDogRWxlbWVudFJlZjtcblxuICAgIEBWaWV3Q2hpbGQoJ3Njcm9sbGFibGVWaWV3Jykgc2Nyb2xsYWJsZVZpZXdDaGlsZDtcblxuICAgIEBWaWV3Q2hpbGQoJ3Njcm9sbGFibGVGcm96ZW5WaWV3Jykgc2Nyb2xsYWJsZUZyb3plblZpZXdDaGlsZDtcblxuICAgIEBDb250ZW50Q2hpbGRyZW4oUHJpbWVUZW1wbGF0ZSkgdGVtcGxhdGVzOiBRdWVyeUxpc3Q8UHJpbWVUZW1wbGF0ZT47XG5cbiAgICBfdmFsdWU6IGFueVtdID0gW107XG5cbiAgICBfY29sdW1uczogYW55W107XG5cbiAgICBfdG90YWxSZWNvcmRzOiBudW1iZXIgPSAwO1xuXG4gICAgX2ZpcnN0OiBudW1iZXIgPSAwO1xuXG4gICAgX3Jvd3M6IG51bWJlcjtcblxuICAgIGZpbHRlcmVkVmFsdWU6IGFueVtdO1xuXG4gICAgaGVhZGVyVGVtcGxhdGU6IFRlbXBsYXRlUmVmPGFueT47XG5cbiAgICBib2R5VGVtcGxhdGU6IFRlbXBsYXRlUmVmPGFueT47XG5cbiAgICBsb2FkaW5nQm9keVRlbXBsYXRlOiBUZW1wbGF0ZVJlZjxhbnk+O1xuXG4gICAgY2FwdGlvblRlbXBsYXRlOiBUZW1wbGF0ZVJlZjxhbnk+O1xuXG4gICAgZnJvemVuUm93c1RlbXBsYXRlOiBUZW1wbGF0ZVJlZjxhbnk+O1xuXG4gICAgZm9vdGVyVGVtcGxhdGU6IFRlbXBsYXRlUmVmPGFueT47XG5cbiAgICBzdW1tYXJ5VGVtcGxhdGU6IFRlbXBsYXRlUmVmPGFueT47XG5cbiAgICBjb2xHcm91cFRlbXBsYXRlOiBUZW1wbGF0ZVJlZjxhbnk+O1xuXG4gICAgZXhwYW5kZWRSb3dUZW1wbGF0ZTogVGVtcGxhdGVSZWY8YW55PjtcblxuICAgIGZyb3plbkV4cGFuZGVkUm93VGVtcGxhdGU6IFRlbXBsYXRlUmVmPGFueT47XG5cbiAgICBmcm96ZW5IZWFkZXJUZW1wbGF0ZTogVGVtcGxhdGVSZWY8YW55PjtcblxuICAgIGZyb3plbkJvZHlUZW1wbGF0ZTogVGVtcGxhdGVSZWY8YW55PjtcblxuICAgIGZyb3plbkZvb3RlclRlbXBsYXRlOiBUZW1wbGF0ZVJlZjxhbnk+O1xuXG4gICAgZnJvemVuQ29sR3JvdXBUZW1wbGF0ZTogVGVtcGxhdGVSZWY8YW55PjtcblxuICAgIGVtcHR5TWVzc2FnZVRlbXBsYXRlOiBUZW1wbGF0ZVJlZjxhbnk+O1xuXG4gICAgcGFnaW5hdG9yTGVmdFRlbXBsYXRlOiBUZW1wbGF0ZVJlZjxhbnk+O1xuXG4gICAgcGFnaW5hdG9yUmlnaHRUZW1wbGF0ZTogVGVtcGxhdGVSZWY8YW55PjtcblxuICAgIHBhZ2luYXRvckRyb3Bkb3duSXRlbVRlbXBsYXRlOiBUZW1wbGF0ZVJlZjxhbnk+O1xuXG4gICAgc2VsZWN0aW9uS2V5czogYW55ID0ge307XG5cbiAgICBsYXN0UmVzaXplckhlbHBlclg6IG51bWJlcjtcblxuICAgIHJlb3JkZXJJY29uV2lkdGg6IG51bWJlcjtcblxuICAgIHJlb3JkZXJJY29uSGVpZ2h0OiBudW1iZXI7XG5cbiAgICBkcmFnZ2VkQ29sdW1uOiBhbnk7XG5cbiAgICBkcmFnZ2VkUm93SW5kZXg6IG51bWJlcjtcblxuICAgIGRyb3BwZWRSb3dJbmRleDogbnVtYmVyO1xuXG4gICAgcm93RHJhZ2dpbmc6IGJvb2xlYW47XG5cbiAgICBkcm9wUG9zaXRpb246IG51bWJlcjtcblxuICAgIGVkaXRpbmdDZWxsOiBFbGVtZW50O1xuXG4gICAgZWRpdGluZ0NlbGxEYXRhOiBhbnk7XG5cbiAgICBlZGl0aW5nQ2VsbEZpZWxkOiBhbnk7XG5cbiAgICBlZGl0aW5nQ2VsbFJvd0luZGV4OiBudW1iZXI7XG5cbiAgICBlZGl0aW5nQ2VsbENsaWNrOiBib29sZWFuO1xuXG4gICAgZG9jdW1lbnRFZGl0TGlzdGVuZXI6IGFueTtcblxuICAgIF9tdWx0aVNvcnRNZXRhOiBTb3J0TWV0YVtdO1xuXG4gICAgX3NvcnRGaWVsZDogc3RyaW5nO1xuXG4gICAgX3NvcnRPcmRlcjogbnVtYmVyID0gMTtcblxuICAgIHByZXZlbnRTZWxlY3Rpb25TZXR0ZXJQcm9wYWdhdGlvbjogYm9vbGVhbjtcblxuICAgIF9zZWxlY3Rpb246IGFueTtcblxuICAgIGFuY2hvclJvd0luZGV4OiBudW1iZXI7XG5cbiAgICByYW5nZVJvd0luZGV4OiBudW1iZXI7XG5cbiAgICBmaWx0ZXJUaW1lb3V0OiBhbnk7XG5cbiAgICBpbml0aWFsaXplZDogYm9vbGVhbjtcblxuICAgIHJvd1RvdWNoZWQ6IGJvb2xlYW47XG5cbiAgICByZXN0b3JpbmdTb3J0OiBib29sZWFuO1xuXG4gICAgcmVzdG9yaW5nRmlsdGVyOiBib29sZWFuO1xuXG4gICAgc3RhdGVSZXN0b3JlZDogYm9vbGVhbjtcblxuICAgIGNvbHVtbk9yZGVyU3RhdGVSZXN0b3JlZDogYm9vbGVhbjtcblxuICAgIGNvbHVtbldpZHRoc1N0YXRlOiBzdHJpbmc7XG5cbiAgICB0YWJsZVdpZHRoU3RhdGU6IHN0cmluZztcblxuICAgIGNvbnN0cnVjdG9yKHB1YmxpYyBlbDogRWxlbWVudFJlZiwgcHVibGljIHpvbmU6IE5nWm9uZSwgcHVibGljIHRhYmxlU2VydmljZTogVGFibGVTZXJ2aWNlLCBwdWJsaWMgY2Q6IENoYW5nZURldGVjdG9yUmVmLCBwdWJsaWMgZmlsdGVyU2VydmljZTogRmlsdGVyU2VydmljZSkge31cblxuICAgIG5nT25Jbml0KCkge1xuICAgICAgICBpZiAodGhpcy5sYXp5ICYmIHRoaXMubGF6eUxvYWRPbkluaXQpIHtcbiAgICAgICAgICAgIGlmICghdGhpcy52aXJ0dWFsU2Nyb2xsKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5vbkxhenlMb2FkLmVtaXQodGhpcy5jcmVhdGVMYXp5TG9hZE1ldGFkYXRhKCkpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAodGhpcy5yZXN0b3JpbmdGaWx0ZXIpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnJlc3RvcmluZ0ZpbHRlciA9IGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5pbml0aWFsaXplZCA9IHRydWU7XG4gICAgfVxuXG4gICAgbmdBZnRlckNvbnRlbnRJbml0KCkge1xuICAgICAgICB0aGlzLnRlbXBsYXRlcy5mb3JFYWNoKChpdGVtKSA9PiB7XG4gICAgICAgICAgICBzd2l0Y2ggKGl0ZW0uZ2V0VHlwZSgpKSB7XG4gICAgICAgICAgICAgICAgY2FzZSAnY2FwdGlvbic6XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY2FwdGlvblRlbXBsYXRlID0gaXRlbS50ZW1wbGF0ZTtcbiAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgICAgIGNhc2UgJ2hlYWRlcic6XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaGVhZGVyVGVtcGxhdGUgPSBpdGVtLnRlbXBsYXRlO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICAgICAgY2FzZSAnYm9keSc6XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYm9keVRlbXBsYXRlID0gaXRlbS50ZW1wbGF0ZTtcbiAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgICAgIGNhc2UgJ2xvYWRpbmdib2R5JzpcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5sb2FkaW5nQm9keVRlbXBsYXRlID0gaXRlbS50ZW1wbGF0ZTtcbiAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgICAgIGNhc2UgJ2Zvb3Rlcic6XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZm9vdGVyVGVtcGxhdGUgPSBpdGVtLnRlbXBsYXRlO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICAgICAgY2FzZSAnc3VtbWFyeSc6XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc3VtbWFyeVRlbXBsYXRlID0gaXRlbS50ZW1wbGF0ZTtcbiAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgICAgIGNhc2UgJ2NvbGdyb3VwJzpcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jb2xHcm91cFRlbXBsYXRlID0gaXRlbS50ZW1wbGF0ZTtcbiAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgICAgIGNhc2UgJ3Jvd2V4cGFuc2lvbic6XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZXhwYW5kZWRSb3dUZW1wbGF0ZSA9IGl0ZW0udGVtcGxhdGU7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgICAgICBjYXNlICdmcm96ZW5yb3dzJzpcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5mcm96ZW5Sb3dzVGVtcGxhdGUgPSBpdGVtLnRlbXBsYXRlO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICAgICAgY2FzZSAnZnJvemVuaGVhZGVyJzpcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5mcm96ZW5IZWFkZXJUZW1wbGF0ZSA9IGl0ZW0udGVtcGxhdGU7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgICAgICBjYXNlICdmcm96ZW5ib2R5JzpcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5mcm96ZW5Cb2R5VGVtcGxhdGUgPSBpdGVtLnRlbXBsYXRlO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICAgICAgY2FzZSAnZnJvemVuZm9vdGVyJzpcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5mcm96ZW5Gb290ZXJUZW1wbGF0ZSA9IGl0ZW0udGVtcGxhdGU7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgICAgICBjYXNlICdmcm96ZW5jb2xncm91cCc6XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZnJvemVuQ29sR3JvdXBUZW1wbGF0ZSA9IGl0ZW0udGVtcGxhdGU7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgICAgICBjYXNlICdmcm96ZW5yb3dleHBhbnNpb24nOlxuICAgICAgICAgICAgICAgICAgICB0aGlzLmZyb3plbkV4cGFuZGVkUm93VGVtcGxhdGUgPSBpdGVtLnRlbXBsYXRlO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICAgICAgY2FzZSAnZW1wdHltZXNzYWdlJzpcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5lbXB0eU1lc3NhZ2VUZW1wbGF0ZSA9IGl0ZW0udGVtcGxhdGU7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgICAgICBjYXNlICdwYWdpbmF0b3JsZWZ0JzpcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5wYWdpbmF0b3JMZWZ0VGVtcGxhdGUgPSBpdGVtLnRlbXBsYXRlO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICAgICAgY2FzZSAncGFnaW5hdG9ycmlnaHQnOlxuICAgICAgICAgICAgICAgICAgICB0aGlzLnBhZ2luYXRvclJpZ2h0VGVtcGxhdGUgPSBpdGVtLnRlbXBsYXRlO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICAgICAgY2FzZSAncGFnaW5hdG9yZHJvcGRvd25pdGVtJzpcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5wYWdpbmF0b3JEcm9wZG93bkl0ZW1UZW1wbGF0ZSA9IGl0ZW0udGVtcGxhdGU7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIG5nQWZ0ZXJWaWV3SW5pdCgpIHtcbiAgICAgICAgaWYgKHRoaXMuaXNTdGF0ZWZ1bCgpICYmIHRoaXMucmVzaXphYmxlQ29sdW1ucykge1xuICAgICAgICAgICAgdGhpcy5yZXN0b3JlQ29sdW1uV2lkdGhzKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBuZ09uQ2hhbmdlcyhzaW1wbGVDaGFuZ2U6IFNpbXBsZUNoYW5nZXMpIHtcbiAgICAgICAgaWYgKHNpbXBsZUNoYW5nZS52YWx1ZSkge1xuICAgICAgICAgICAgaWYgKHRoaXMuaXNTdGF0ZWZ1bCgpICYmICF0aGlzLnN0YXRlUmVzdG9yZWQpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnJlc3RvcmVTdGF0ZSgpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB0aGlzLl92YWx1ZSA9IHNpbXBsZUNoYW5nZS52YWx1ZS5jdXJyZW50VmFsdWU7XG5cbiAgICAgICAgICAgIGlmICghdGhpcy5sYXp5KSB7XG4gICAgICAgICAgICAgICAgdGhpcy50b3RhbFJlY29yZHMgPSAodGhpcy5fdmFsdWUgPyB0aGlzLl92YWx1ZS5sZW5ndGggOiAwKTtcblxuICAgICAgICAgICAgICAgIGlmICh0aGlzLnNvcnRNb2RlID09ICdzaW5nbGUnICYmIHRoaXMuc29ydEZpZWxkKVxuICAgICAgICAgICAgICAgICAgICB0aGlzLnNvcnRTaW5nbGUoKTtcbiAgICAgICAgICAgICAgICBlbHNlIGlmICh0aGlzLnNvcnRNb2RlID09ICdtdWx0aXBsZScgJiYgdGhpcy5tdWx0aVNvcnRNZXRhKVxuICAgICAgICAgICAgICAgICAgICB0aGlzLnNvcnRNdWx0aXBsZSgpO1xuICAgICAgICAgICAgICAgIGVsc2UgaWYgKHRoaXMuaGFzRmlsdGVyKCkpICAgICAgIC8vc29ydCBhbHJlYWR5IGZpbHRlcnNcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fZmlsdGVyKCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHRoaXMudGFibGVTZXJ2aWNlLm9uVmFsdWVDaGFuZ2Uoc2ltcGxlQ2hhbmdlLnZhbHVlLmN1cnJlbnRWYWx1ZSk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoc2ltcGxlQ2hhbmdlLmNvbHVtbnMpIHtcbiAgICAgICAgICAgIHRoaXMuX2NvbHVtbnMgPSBzaW1wbGVDaGFuZ2UuY29sdW1ucy5jdXJyZW50VmFsdWU7XG4gICAgICAgICAgICB0aGlzLnRhYmxlU2VydmljZS5vbkNvbHVtbnNDaGFuZ2Uoc2ltcGxlQ2hhbmdlLmNvbHVtbnMuY3VycmVudFZhbHVlKTtcblxuICAgICAgICAgICAgaWYgKHRoaXMuX2NvbHVtbnMgJiYgdGhpcy5pc1N0YXRlZnVsKCkgJiYgdGhpcy5yZW9yZGVyYWJsZUNvbHVtbnMgJiYgIXRoaXMuY29sdW1uT3JkZXJTdGF0ZVJlc3RvcmVkICkge1xuICAgICAgICAgICAgICAgIHRoaXMucmVzdG9yZUNvbHVtbk9yZGVyKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoc2ltcGxlQ2hhbmdlLnNvcnRGaWVsZCkge1xuICAgICAgICAgICAgdGhpcy5fc29ydEZpZWxkID0gc2ltcGxlQ2hhbmdlLnNvcnRGaWVsZC5jdXJyZW50VmFsdWU7XG5cbiAgICAgICAgICAgIC8vYXZvaWQgdHJpZ2dlcmluZyBsYXp5IGxvYWQgcHJpb3IgdG8gbGF6eSBpbml0aWFsaXphdGlvbiBhdCBvbkluaXRcbiAgICAgICAgICAgIGlmICggIXRoaXMubGF6eSB8fCB0aGlzLmluaXRpYWxpemVkICkge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLnNvcnRNb2RlID09PSAnc2luZ2xlJykge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnNvcnRTaW5nbGUoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoc2ltcGxlQ2hhbmdlLnNvcnRPcmRlcikge1xuICAgICAgICAgICAgdGhpcy5fc29ydE9yZGVyID0gc2ltcGxlQ2hhbmdlLnNvcnRPcmRlci5jdXJyZW50VmFsdWU7XG5cbiAgICAgICAgICAgIC8vYXZvaWQgdHJpZ2dlcmluZyBsYXp5IGxvYWQgcHJpb3IgdG8gbGF6eSBpbml0aWFsaXphdGlvbiBhdCBvbkluaXRcbiAgICAgICAgICAgIGlmICggIXRoaXMubGF6eSB8fCB0aGlzLmluaXRpYWxpemVkICkge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLnNvcnRNb2RlID09PSAnc2luZ2xlJykge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnNvcnRTaW5nbGUoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoc2ltcGxlQ2hhbmdlLm11bHRpU29ydE1ldGEpIHtcbiAgICAgICAgICAgIHRoaXMuX211bHRpU29ydE1ldGEgPSBzaW1wbGVDaGFuZ2UubXVsdGlTb3J0TWV0YS5jdXJyZW50VmFsdWU7XG4gICAgICAgICAgICBpZiAodGhpcy5zb3J0TW9kZSA9PT0gJ211bHRpcGxlJyAmJiAodGhpcy5pbml0aWFsaXplZCB8fCAhdGhpcy52aXJ0dWFsU2Nyb2xsKSkge1xuICAgICAgICAgICAgICAgIHRoaXMuc29ydE11bHRpcGxlKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoc2ltcGxlQ2hhbmdlLnNlbGVjdGlvbikge1xuICAgICAgICAgICAgdGhpcy5fc2VsZWN0aW9uID0gc2ltcGxlQ2hhbmdlLnNlbGVjdGlvbi5jdXJyZW50VmFsdWU7XG5cbiAgICAgICAgICAgIGlmICghdGhpcy5wcmV2ZW50U2VsZWN0aW9uU2V0dGVyUHJvcGFnYXRpb24pIHtcbiAgICAgICAgICAgICAgICB0aGlzLnVwZGF0ZVNlbGVjdGlvbktleXMoKTtcbiAgICAgICAgICAgICAgICB0aGlzLnRhYmxlU2VydmljZS5vblNlbGVjdGlvbkNoYW5nZSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5wcmV2ZW50U2VsZWN0aW9uU2V0dGVyUHJvcGFnYXRpb24gPSBmYWxzZTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIEBJbnB1dCgpIGdldCB2YWx1ZSgpOiBhbnlbXSB7XG4gICAgICAgIHJldHVybiB0aGlzLl92YWx1ZTtcbiAgICB9XG4gICAgc2V0IHZhbHVlKHZhbDogYW55W10pIHtcbiAgICAgICAgdGhpcy5fdmFsdWUgPSB2YWw7XG4gICAgfVxuXG4gICAgQElucHV0KCkgZ2V0IGNvbHVtbnMoKTogYW55W10ge1xuICAgICAgICByZXR1cm4gdGhpcy5fY29sdW1ucztcbiAgICB9XG4gICAgc2V0IGNvbHVtbnMoY29sczogYW55W10pIHtcbiAgICAgICAgdGhpcy5fY29sdW1ucyA9IGNvbHM7XG4gICAgfVxuXG4gICAgQElucHV0KCkgZ2V0IGZpcnN0KCk6IG51bWJlciB7XG4gICAgICAgIHJldHVybiB0aGlzLl9maXJzdDtcbiAgICB9XG4gICAgc2V0IGZpcnN0KHZhbDogbnVtYmVyKSB7XG4gICAgICAgIHRoaXMuX2ZpcnN0ID0gdmFsO1xuICAgIH1cblxuICAgIEBJbnB1dCgpIGdldCByb3dzKCk6IG51bWJlciB7XG4gICAgICAgIHJldHVybiB0aGlzLl9yb3dzO1xuICAgIH1cbiAgICBzZXQgcm93cyh2YWw6IG51bWJlcikge1xuICAgICAgICB0aGlzLl9yb3dzID0gdmFsO1xuICAgIH1cblxuICAgIEBJbnB1dCgpIGdldCB0b3RhbFJlY29yZHMoKTogbnVtYmVyIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3RvdGFsUmVjb3JkcztcbiAgICB9XG4gICAgc2V0IHRvdGFsUmVjb3Jkcyh2YWw6IG51bWJlcikge1xuICAgICAgICB0aGlzLl90b3RhbFJlY29yZHMgPSB2YWw7XG4gICAgICAgIHRoaXMudGFibGVTZXJ2aWNlLm9uVG90YWxSZWNvcmRzQ2hhbmdlKHRoaXMuX3RvdGFsUmVjb3Jkcyk7XG4gICAgfVxuXG4gICAgQElucHV0KCkgZ2V0IHNvcnRGaWVsZCgpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gdGhpcy5fc29ydEZpZWxkO1xuICAgIH1cblxuICAgIHNldCBzb3J0RmllbGQodmFsOiBzdHJpbmcpIHtcbiAgICAgICAgdGhpcy5fc29ydEZpZWxkID0gdmFsO1xuICAgIH1cblxuICAgIEBJbnB1dCgpIGdldCBzb3J0T3JkZXIoKTogbnVtYmVyIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3NvcnRPcmRlcjtcbiAgICB9XG4gICAgc2V0IHNvcnRPcmRlcih2YWw6IG51bWJlcikge1xuICAgICAgICB0aGlzLl9zb3J0T3JkZXIgPSB2YWw7XG4gICAgfVxuXG4gICAgQElucHV0KCkgZ2V0IG11bHRpU29ydE1ldGEoKTogU29ydE1ldGFbXSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9tdWx0aVNvcnRNZXRhO1xuICAgIH1cblxuICAgIHNldCBtdWx0aVNvcnRNZXRhKHZhbDogU29ydE1ldGFbXSkge1xuICAgICAgICB0aGlzLl9tdWx0aVNvcnRNZXRhID0gdmFsO1xuICAgIH1cblxuICAgIEBJbnB1dCgpIGdldCBzZWxlY3Rpb24oKTogYW55IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3NlbGVjdGlvbjtcbiAgICB9XG5cbiAgICBzZXQgc2VsZWN0aW9uKHZhbDogYW55KSB7XG4gICAgICAgIHRoaXMuX3NlbGVjdGlvbiA9IHZhbDtcbiAgICB9XG5cbiAgICB1cGRhdGVTZWxlY3Rpb25LZXlzKCkge1xuICAgICAgICBpZiAodGhpcy5kYXRhS2V5ICYmIHRoaXMuX3NlbGVjdGlvbikge1xuICAgICAgICAgICAgdGhpcy5zZWxlY3Rpb25LZXlzID0ge307XG4gICAgICAgICAgICBpZiAoQXJyYXkuaXNBcnJheSh0aGlzLl9zZWxlY3Rpb24pKSB7XG4gICAgICAgICAgICAgICAgZm9yKGxldCBkYXRhIG9mIHRoaXMuX3NlbGVjdGlvbikge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnNlbGVjdGlvbktleXNbU3RyaW5nKE9iamVjdFV0aWxzLnJlc29sdmVGaWVsZERhdGEoZGF0YSwgdGhpcy5kYXRhS2V5KSldID0gMTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLnNlbGVjdGlvbktleXNbU3RyaW5nKE9iamVjdFV0aWxzLnJlc29sdmVGaWVsZERhdGEodGhpcy5fc2VsZWN0aW9uLCB0aGlzLmRhdGFLZXkpKV0gPSAxO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgb25QYWdlQ2hhbmdlKGV2ZW50KSB7XG4gICAgICAgIHRoaXMuZmlyc3QgPSBldmVudC5maXJzdDtcbiAgICAgICAgdGhpcy5yb3dzID0gZXZlbnQucm93cztcblxuICAgICAgICBpZiAodGhpcy5sYXp5KSB7XG4gICAgICAgICAgICB0aGlzLm9uTGF6eUxvYWQuZW1pdCh0aGlzLmNyZWF0ZUxhenlMb2FkTWV0YWRhdGEoKSk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLm9uUGFnZS5lbWl0KHtcbiAgICAgICAgICAgIGZpcnN0OiB0aGlzLmZpcnN0LFxuICAgICAgICAgICAgcm93czogdGhpcy5yb3dzXG4gICAgICAgIH0pO1xuXG4gICAgICAgIHRoaXMuZmlyc3RDaGFuZ2UuZW1pdCh0aGlzLmZpcnN0KTtcbiAgICAgICAgdGhpcy5yb3dzQ2hhbmdlLmVtaXQodGhpcy5yb3dzKTtcbiAgICAgICAgdGhpcy50YWJsZVNlcnZpY2Uub25WYWx1ZUNoYW5nZSh0aGlzLnZhbHVlKTtcblxuICAgICAgICBpZiAodGhpcy5pc1N0YXRlZnVsKCkpIHtcbiAgICAgICAgICAgIHRoaXMuc2F2ZVN0YXRlKCk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmFuY2hvclJvd0luZGV4ID0gbnVsbDtcblxuICAgICAgICBpZiAodGhpcy5zY3JvbGxhYmxlKSB7XG4gICAgICAgICAgICB0aGlzLnJlc2V0U2Nyb2xsVG9wKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBzb3J0KGV2ZW50KSB7XG4gICAgICAgIGxldCBvcmlnaW5hbEV2ZW50ID0gZXZlbnQub3JpZ2luYWxFdmVudDtcblxuICAgICAgICBpZiAodGhpcy5zb3J0TW9kZSA9PT0gJ3NpbmdsZScpIHtcbiAgICAgICAgICAgIHRoaXMuX3NvcnRPcmRlciA9ICh0aGlzLnNvcnRGaWVsZCA9PT0gZXZlbnQuZmllbGQpID8gdGhpcy5zb3J0T3JkZXIgKiAtMSA6IHRoaXMuZGVmYXVsdFNvcnRPcmRlcjtcbiAgICAgICAgICAgIHRoaXMuX3NvcnRGaWVsZCA9IGV2ZW50LmZpZWxkO1xuXG4gICAgICAgICAgICBpZiAodGhpcy5yZXNldFBhZ2VPblNvcnQpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9maXJzdCA9IDA7XG4gICAgICAgICAgICAgICAgdGhpcy5maXJzdENoYW5nZS5lbWl0KHRoaXMuX2ZpcnN0KTtcblxuICAgICAgICAgICAgICAgIGlmICh0aGlzLnNjcm9sbGFibGUpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5yZXNldFNjcm9sbFRvcCgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdGhpcy5zb3J0U2luZ2xlKCk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMuc29ydE1vZGUgPT09ICdtdWx0aXBsZScpIHtcbiAgICAgICAgICAgIGxldCBtZXRhS2V5ID0gb3JpZ2luYWxFdmVudC5tZXRhS2V5IHx8IG9yaWdpbmFsRXZlbnQuY3RybEtleTtcbiAgICAgICAgICAgIGxldCBzb3J0TWV0YSA9IHRoaXMuZ2V0U29ydE1ldGEoZXZlbnQuZmllbGQpO1xuXG4gICAgICAgICAgICBpZiAoc29ydE1ldGEpIHtcbiAgICAgICAgICAgICAgICBpZiAoIW1ldGFLZXkpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fbXVsdGlTb3J0TWV0YSA9IFt7IGZpZWxkOiBldmVudC5maWVsZCwgb3JkZXI6IHNvcnRNZXRhLm9yZGVyICogLTEgfV07XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMucmVzZXRQYWdlT25Tb3J0KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9maXJzdCA9IDA7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmZpcnN0Q2hhbmdlLmVtaXQodGhpcy5fZmlyc3QpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5zY3JvbGxhYmxlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5yZXNldFNjcm9sbFRvcCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBzb3J0TWV0YS5vcmRlciA9IHNvcnRNZXRhLm9yZGVyICogLTE7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgaWYgKCFtZXRhS2V5IHx8ICF0aGlzLm11bHRpU29ydE1ldGEpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fbXVsdGlTb3J0TWV0YSA9IFtdO1xuXG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLnJlc2V0UGFnZU9uU29ydCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fZmlyc3QgPSAwO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5maXJzdENoYW5nZS5lbWl0KHRoaXMuX2ZpcnN0KTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB0aGlzLl9tdWx0aVNvcnRNZXRhLnB1c2goeyBmaWVsZDogZXZlbnQuZmllbGQsIG9yZGVyOiB0aGlzLmRlZmF1bHRTb3J0T3JkZXIgfSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHRoaXMuc29ydE11bHRpcGxlKCk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5pc1N0YXRlZnVsKCkpIHtcbiAgICAgICAgICAgIHRoaXMuc2F2ZVN0YXRlKCk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmFuY2hvclJvd0luZGV4ID0gbnVsbDtcbiAgICB9XG5cbiAgICBzb3J0U2luZ2xlKCkge1xuICAgICAgICBpZiAodGhpcy5zb3J0RmllbGQgJiYgdGhpcy5zb3J0T3JkZXIpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLnJlc3RvcmluZ1NvcnQpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnJlc3RvcmluZ1NvcnQgPSBmYWxzZTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKHRoaXMubGF6eSkge1xuICAgICAgICAgICAgICAgIHRoaXMub25MYXp5TG9hZC5lbWl0KHRoaXMuY3JlYXRlTGF6eUxvYWRNZXRhZGF0YSgpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKHRoaXMudmFsdWUpIHtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5jdXN0b21Tb3J0KSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc29ydEZ1bmN0aW9uLmVtaXQoe1xuICAgICAgICAgICAgICAgICAgICAgICAgZGF0YTogdGhpcy52YWx1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIG1vZGU6IHRoaXMuc29ydE1vZGUsXG4gICAgICAgICAgICAgICAgICAgICAgICBmaWVsZDogdGhpcy5zb3J0RmllbGQsXG4gICAgICAgICAgICAgICAgICAgICAgICBvcmRlcjogdGhpcy5zb3J0T3JkZXJcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnZhbHVlLnNvcnQoKGRhdGExLCBkYXRhMikgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHZhbHVlMSA9IE9iamVjdFV0aWxzLnJlc29sdmVGaWVsZERhdGEoZGF0YTEsIHRoaXMuc29ydEZpZWxkKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCB2YWx1ZTIgPSBPYmplY3RVdGlscy5yZXNvbHZlRmllbGREYXRhKGRhdGEyLCB0aGlzLnNvcnRGaWVsZCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgcmVzdWx0ID0gbnVsbDtcblxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHZhbHVlMSA9PSBudWxsICYmIHZhbHVlMiAhPSBudWxsKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc3VsdCA9IC0xO1xuICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiAodmFsdWUxICE9IG51bGwgJiYgdmFsdWUyID09IG51bGwpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzdWx0ID0gMTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKHZhbHVlMSA9PSBudWxsICYmIHZhbHVlMiA9PSBudWxsKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc3VsdCA9IDA7XG4gICAgICAgICAgICAgICAgICAgICAgICBlbHNlIGlmICh0eXBlb2YgdmFsdWUxID09PSAnc3RyaW5nJyAmJiB0eXBlb2YgdmFsdWUyID09PSAnc3RyaW5nJylcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXN1bHQgPSB2YWx1ZTEubG9jYWxlQ29tcGFyZSh2YWx1ZTIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc3VsdCA9ICh2YWx1ZTEgPCB2YWx1ZTIpID8gLTEgOiAodmFsdWUxID4gdmFsdWUyKSA/IDEgOiAwO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gKHRoaXMuc29ydE9yZGVyICogcmVzdWx0KTtcbiAgICAgICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fdmFsdWUgPSBbLi4udGhpcy52YWx1ZV07XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuaGFzRmlsdGVyKCkpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fZmlsdGVyKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBsZXQgc29ydE1ldGE6IFNvcnRNZXRhID0ge1xuICAgICAgICAgICAgICAgIGZpZWxkOiB0aGlzLnNvcnRGaWVsZCxcbiAgICAgICAgICAgICAgICBvcmRlcjogdGhpcy5zb3J0T3JkZXJcbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIHRoaXMub25Tb3J0LmVtaXQoc29ydE1ldGEpO1xuICAgICAgICAgICAgdGhpcy50YWJsZVNlcnZpY2Uub25Tb3J0KHNvcnRNZXRhKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHNvcnRNdWx0aXBsZSgpIHtcbiAgICAgICAgaWYgKHRoaXMubXVsdGlTb3J0TWV0YSkge1xuICAgICAgICAgICAgaWYgKHRoaXMubGF6eSkge1xuICAgICAgICAgICAgICAgIHRoaXMub25MYXp5TG9hZC5lbWl0KHRoaXMuY3JlYXRlTGF6eUxvYWRNZXRhZGF0YSgpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKHRoaXMudmFsdWUpIHtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5jdXN0b21Tb3J0KSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc29ydEZ1bmN0aW9uLmVtaXQoe1xuICAgICAgICAgICAgICAgICAgICAgICAgZGF0YTogdGhpcy52YWx1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIG1vZGU6IHRoaXMuc29ydE1vZGUsXG4gICAgICAgICAgICAgICAgICAgICAgICBtdWx0aVNvcnRNZXRhOiB0aGlzLm11bHRpU29ydE1ldGFcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnZhbHVlLnNvcnQoKGRhdGExLCBkYXRhMikgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMubXVsdGlzb3J0RmllbGQoZGF0YTEsIGRhdGEyLCB0aGlzLm11bHRpU29ydE1ldGEsIDApO1xuICAgICAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgICAgICB0aGlzLl92YWx1ZSA9IFsuLi50aGlzLnZhbHVlXTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBpZiAodGhpcy5oYXNGaWx0ZXIoKSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9maWx0ZXIoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHRoaXMub25Tb3J0LmVtaXQoe1xuICAgICAgICAgICAgICAgIG11bHRpc29ydG1ldGE6IHRoaXMubXVsdGlTb3J0TWV0YVxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB0aGlzLnRhYmxlU2VydmljZS5vblNvcnQodGhpcy5tdWx0aVNvcnRNZXRhKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIG11bHRpc29ydEZpZWxkKGRhdGExLCBkYXRhMiwgbXVsdGlTb3J0TWV0YSwgaW5kZXgpIHtcbiAgICAgICAgbGV0IHZhbHVlMSA9IE9iamVjdFV0aWxzLnJlc29sdmVGaWVsZERhdGEoZGF0YTEsIG11bHRpU29ydE1ldGFbaW5kZXhdLmZpZWxkKTtcbiAgICAgICAgbGV0IHZhbHVlMiA9IE9iamVjdFV0aWxzLnJlc29sdmVGaWVsZERhdGEoZGF0YTIsIG11bHRpU29ydE1ldGFbaW5kZXhdLmZpZWxkKTtcbiAgICAgICAgbGV0IHJlc3VsdCA9IG51bGw7XG5cbiAgICAgICAgaWYgKHZhbHVlMSA9PSBudWxsICYmIHZhbHVlMiAhPSBudWxsKVxuICAgICAgICAgICAgcmVzdWx0ID0gLTE7XG4gICAgICAgIGVsc2UgaWYgKHZhbHVlMSAhPSBudWxsICYmIHZhbHVlMiA9PSBudWxsKVxuICAgICAgICAgICAgcmVzdWx0ID0gMTtcbiAgICAgICAgZWxzZSBpZiAodmFsdWUxID09IG51bGwgJiYgdmFsdWUyID09IG51bGwpXG4gICAgICAgICAgICByZXN1bHQgPSAwO1xuICAgICAgICBlbHNlIGlmICh0eXBlb2YgdmFsdWUxID09ICdzdHJpbmcnIHx8IHZhbHVlMSBpbnN0YW5jZW9mIFN0cmluZykge1xuICAgICAgICAgICAgaWYgKHZhbHVlMS5sb2NhbGVDb21wYXJlICYmICh2YWx1ZTEgIT0gdmFsdWUyKSkge1xuICAgICAgICAgICAgICAgIHJldHVybiAobXVsdGlTb3J0TWV0YVtpbmRleF0ub3JkZXIgKiB2YWx1ZTEubG9jYWxlQ29tcGFyZSh2YWx1ZTIpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHJlc3VsdCA9ICh2YWx1ZTEgPCB2YWx1ZTIpID8gLTEgOiAxO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHZhbHVlMSA9PSB2YWx1ZTIpIHtcbiAgICAgICAgICAgIHJldHVybiAobXVsdGlTb3J0TWV0YS5sZW5ndGggLSAxKSA+IChpbmRleCkgPyAodGhpcy5tdWx0aXNvcnRGaWVsZChkYXRhMSwgZGF0YTIsIG11bHRpU29ydE1ldGEsIGluZGV4ICsgMSkpIDogMDtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiAobXVsdGlTb3J0TWV0YVtpbmRleF0ub3JkZXIgKiByZXN1bHQpO1xuICAgIH1cblxuICAgIGdldFNvcnRNZXRhKGZpZWxkOiBzdHJpbmcpIHtcbiAgICAgICAgaWYgKHRoaXMubXVsdGlTb3J0TWV0YSAmJiB0aGlzLm11bHRpU29ydE1ldGEubGVuZ3RoKSB7XG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMubXVsdGlTb3J0TWV0YS5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLm11bHRpU29ydE1ldGFbaV0uZmllbGQgPT09IGZpZWxkKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLm11bHRpU29ydE1ldGFbaV07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuXG4gICAgaXNTb3J0ZWQoZmllbGQ6IHN0cmluZykge1xuICAgICAgICBpZiAodGhpcy5zb3J0TW9kZSA9PT0gJ3NpbmdsZScpIHtcbiAgICAgICAgICAgIHJldHVybiAodGhpcy5zb3J0RmllbGQgJiYgdGhpcy5zb3J0RmllbGQgPT09IGZpZWxkKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmICh0aGlzLnNvcnRNb2RlID09PSAnbXVsdGlwbGUnKSB7XG4gICAgICAgICAgICBsZXQgc29ydGVkID0gZmFsc2U7XG4gICAgICAgICAgICBpZiAodGhpcy5tdWx0aVNvcnRNZXRhKcKge1xuICAgICAgICAgICAgICAgIGZvcihsZXQgaSA9IDA7IGkgPCB0aGlzLm11bHRpU29ydE1ldGEubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMubXVsdGlTb3J0TWV0YVtpXS5maWVsZCA9PSBmaWVsZCnCoHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNvcnRlZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBzb3J0ZWQ7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBoYW5kbGVSb3dDbGljayhldmVudCkge1xuICAgICAgICBsZXQgdGFyZ2V0ID0gKDxIVE1MRWxlbWVudD4gZXZlbnQub3JpZ2luYWxFdmVudC50YXJnZXQpO1xuICAgICAgICBsZXQgdGFyZ2V0Tm9kZSA9IHRhcmdldC5ub2RlTmFtZTtcbiAgICAgICAgbGV0IHBhcmVudE5vZGUgPSB0YXJnZXQucGFyZW50RWxlbWVudCAmJiB0YXJnZXQucGFyZW50RWxlbWVudC5ub2RlTmFtZTtcbiAgICAgICAgaWYgKHRhcmdldE5vZGUgPT0gJ0lOUFVUJyB8fCB0YXJnZXROb2RlID09ICdCVVRUT04nIHx8IHRhcmdldE5vZGUgPT0gJ0EnIHx8XG4gICAgICAgICAgICBwYXJlbnROb2RlID09ICdJTlBVVCcgfHwgcGFyZW50Tm9kZSA9PSAnQlVUVE9OJyB8fCBwYXJlbnROb2RlID09ICdBJyB8fFxuICAgICAgICAgICAgKERvbUhhbmRsZXIuaGFzQ2xhc3MoZXZlbnQub3JpZ2luYWxFdmVudC50YXJnZXQsICdwLWNsaWNrYWJsZScpKSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMuc2VsZWN0aW9uTW9kZSkge1xuICAgICAgICAgICAgdGhpcy5wcmV2ZW50U2VsZWN0aW9uU2V0dGVyUHJvcGFnYXRpb24gPSB0cnVlO1xuICAgICAgICAgICAgaWYgKHRoaXMuaXNNdWx0aXBsZVNlbGVjdGlvbk1vZGUoKSAmJiBldmVudC5vcmlnaW5hbEV2ZW50LnNoaWZ0S2V5ICYmIHRoaXMuYW5jaG9yUm93SW5kZXggIT0gbnVsbCkge1xuICAgICAgICAgICAgICAgIERvbUhhbmRsZXIuY2xlYXJTZWxlY3Rpb24oKTtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5yYW5nZVJvd0luZGV4ICE9IG51bGwpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jbGVhclNlbGVjdGlvblJhbmdlKGV2ZW50Lm9yaWdpbmFsRXZlbnQpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHRoaXMucmFuZ2VSb3dJbmRleCA9IGV2ZW50LnJvd0luZGV4O1xuICAgICAgICAgICAgICAgIHRoaXMuc2VsZWN0UmFuZ2UoZXZlbnQub3JpZ2luYWxFdmVudCwgZXZlbnQucm93SW5kZXgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgbGV0IHJvd0RhdGEgPSBldmVudC5yb3dEYXRhO1xuICAgICAgICAgICAgICAgIGxldCBzZWxlY3RlZCA9IHRoaXMuaXNTZWxlY3RlZChyb3dEYXRhKTtcbiAgICAgICAgICAgICAgICBsZXQgbWV0YVNlbGVjdGlvbiA9IHRoaXMucm93VG91Y2hlZCA/IGZhbHNlIDogdGhpcy5tZXRhS2V5U2VsZWN0aW9uO1xuICAgICAgICAgICAgICAgIGxldCBkYXRhS2V5VmFsdWUgPSB0aGlzLmRhdGFLZXkgPyBTdHJpbmcoT2JqZWN0VXRpbHMucmVzb2x2ZUZpZWxkRGF0YShyb3dEYXRhLCB0aGlzLmRhdGFLZXkpKSA6IG51bGw7XG4gICAgICAgICAgICAgICAgdGhpcy5hbmNob3JSb3dJbmRleCA9IGV2ZW50LnJvd0luZGV4O1xuICAgICAgICAgICAgICAgIHRoaXMucmFuZ2VSb3dJbmRleCA9IGV2ZW50LnJvd0luZGV4O1xuXG4gICAgICAgICAgICAgICAgaWYgKG1ldGFTZWxlY3Rpb24pIHtcbiAgICAgICAgICAgICAgICAgICAgbGV0IG1ldGFLZXkgPSBldmVudC5vcmlnaW5hbEV2ZW50Lm1ldGFLZXl8fGV2ZW50Lm9yaWdpbmFsRXZlbnQuY3RybEtleTtcblxuICAgICAgICAgICAgICAgICAgICBpZiAoc2VsZWN0ZWQgJiYgbWV0YUtleSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuaXNTaW5nbGVTZWxlY3Rpb25Nb2RlKCkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9zZWxlY3Rpb24gPSBudWxsO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2VsZWN0aW9uS2V5cyA9IHt9O1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2VsZWN0aW9uQ2hhbmdlLmVtaXQobnVsbCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgc2VsZWN0aW9uSW5kZXggPSB0aGlzLmZpbmRJbmRleEluU2VsZWN0aW9uKHJvd0RhdGEpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX3NlbGVjdGlvbiA9IHRoaXMuc2VsZWN0aW9uLmZpbHRlcigodmFsLGkpID0+IGkhPXNlbGVjdGlvbkluZGV4KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNlbGVjdGlvbkNoYW5nZS5lbWl0KHRoaXMuc2VsZWN0aW9uKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoZGF0YUtleVZhbHVlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlbGV0ZSB0aGlzLnNlbGVjdGlvbktleXNbZGF0YUtleVZhbHVlXTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMub25Sb3dVbnNlbGVjdC5lbWl0KHtvcmlnaW5hbEV2ZW50OiBldmVudC5vcmlnaW5hbEV2ZW50LCBkYXRhOiByb3dEYXRhLCB0eXBlOiAncm93J30pO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuaXNTaW5nbGVTZWxlY3Rpb25Nb2RlKCkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9zZWxlY3Rpb24gPSByb3dEYXRhO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2VsZWN0aW9uQ2hhbmdlLmVtaXQocm93RGF0YSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGRhdGFLZXlWYWx1ZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNlbGVjdGlvbktleXMgPSB7fTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zZWxlY3Rpb25LZXlzW2RhdGFLZXlWYWx1ZV0gPSAxO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKHRoaXMuaXNNdWx0aXBsZVNlbGVjdGlvbk1vZGUoKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChtZXRhS2V5KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX3NlbGVjdGlvbiA9IHRoaXMuc2VsZWN0aW9ufHxbXTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX3NlbGVjdGlvbiA9IFtdO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNlbGVjdGlvbktleXMgPSB7fTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9zZWxlY3Rpb24gPSBbLi4udGhpcy5zZWxlY3Rpb24scm93RGF0YV07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zZWxlY3Rpb25DaGFuZ2UuZW1pdCh0aGlzLnNlbGVjdGlvbik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGRhdGFLZXlWYWx1ZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNlbGVjdGlvbktleXNbZGF0YUtleVZhbHVlXSA9IDE7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm9uUm93U2VsZWN0LmVtaXQoe29yaWdpbmFsRXZlbnQ6IGV2ZW50Lm9yaWdpbmFsRXZlbnQsIGRhdGE6IHJvd0RhdGEsIHR5cGU6ICdyb3cnLCBpbmRleDogZXZlbnQucm93SW5kZXh9KTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuc2VsZWN0aW9uTW9kZSA9PT0gJ3NpbmdsZScpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChzZWxlY3RlZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX3NlbGVjdGlvbiA9IG51bGw7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zZWxlY3Rpb25LZXlzID0ge307XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zZWxlY3Rpb25DaGFuZ2UuZW1pdCh0aGlzLnNlbGVjdGlvbik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5vblJvd1Vuc2VsZWN0LmVtaXQoeyBvcmlnaW5hbEV2ZW50OiBldmVudC5vcmlnaW5hbEV2ZW50LCBkYXRhOiByb3dEYXRhLCB0eXBlOiAncm93JywgaW5kZXg6IGV2ZW50LnJvd0luZGV4IH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fc2VsZWN0aW9uID0gcm93RGF0YTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNlbGVjdGlvbkNoYW5nZS5lbWl0KHRoaXMuc2VsZWN0aW9uKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm9uUm93U2VsZWN0LmVtaXQoeyBvcmlnaW5hbEV2ZW50OiBldmVudC5vcmlnaW5hbEV2ZW50LCBkYXRhOiByb3dEYXRhLCB0eXBlOiAncm93JywgaW5kZXg6IGV2ZW50LnJvd0luZGV4IH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChkYXRhS2V5VmFsdWUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zZWxlY3Rpb25LZXlzID0ge307XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2VsZWN0aW9uS2V5c1tkYXRhS2V5VmFsdWVdID0gMTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiAodGhpcy5zZWxlY3Rpb25Nb2RlID09PSAnbXVsdGlwbGUnKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoc2VsZWN0ZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgc2VsZWN0aW9uSW5kZXggPSB0aGlzLmZpbmRJbmRleEluU2VsZWN0aW9uKHJvd0RhdGEpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX3NlbGVjdGlvbiA9IHRoaXMuc2VsZWN0aW9uLmZpbHRlcigodmFsLCBpKSA9PiBpICE9IHNlbGVjdGlvbkluZGV4KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNlbGVjdGlvbkNoYW5nZS5lbWl0KHRoaXMuc2VsZWN0aW9uKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm9uUm93VW5zZWxlY3QuZW1pdCh7IG9yaWdpbmFsRXZlbnQ6IGV2ZW50Lm9yaWdpbmFsRXZlbnQsIGRhdGE6IHJvd0RhdGEsIHR5cGU6ICdyb3cnLCBpbmRleDogZXZlbnQucm93SW5kZXggfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGRhdGFLZXlWYWx1ZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZWxldGUgdGhpcy5zZWxlY3Rpb25LZXlzW2RhdGFLZXlWYWx1ZV07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fc2VsZWN0aW9uID0gdGhpcy5zZWxlY3Rpb24gPyBbLi4udGhpcy5zZWxlY3Rpb24sIHJvd0RhdGFdIDogW3Jvd0RhdGFdO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2VsZWN0aW9uQ2hhbmdlLmVtaXQodGhpcy5zZWxlY3Rpb24pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMub25Sb3dTZWxlY3QuZW1pdCh7IG9yaWdpbmFsRXZlbnQ6IGV2ZW50Lm9yaWdpbmFsRXZlbnQsIGRhdGE6IHJvd0RhdGEsIHR5cGU6ICdyb3cnLCBpbmRleDogZXZlbnQucm93SW5kZXggfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGRhdGFLZXlWYWx1ZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNlbGVjdGlvbktleXNbZGF0YUtleVZhbHVlXSA9IDE7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB0aGlzLnRhYmxlU2VydmljZS5vblNlbGVjdGlvbkNoYW5nZSgpO1xuXG4gICAgICAgICAgICBpZiAodGhpcy5pc1N0YXRlZnVsKCkpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnNhdmVTdGF0ZSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5yb3dUb3VjaGVkID0gZmFsc2U7XG4gICAgfVxuXG4gICAgaGFuZGxlUm93VG91Y2hFbmQoZXZlbnQpIHtcbiAgICAgICAgdGhpcy5yb3dUb3VjaGVkID0gdHJ1ZTtcbiAgICB9XG5cbiAgICBoYW5kbGVSb3dSaWdodENsaWNrKGV2ZW50KSB7XG4gICAgICAgIGlmICh0aGlzLmNvbnRleHRNZW51KSB7XG4gICAgICAgICAgICBjb25zdCByb3dEYXRhID0gZXZlbnQucm93RGF0YTtcblxuICAgICAgICAgICAgaWYgKHRoaXMuY29udGV4dE1lbnVTZWxlY3Rpb25Nb2RlID09PSAnc2VwYXJhdGUnKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5jb250ZXh0TWVudVNlbGVjdGlvbiA9IHJvd0RhdGE7XG4gICAgICAgICAgICAgICAgdGhpcy5jb250ZXh0TWVudVNlbGVjdGlvbkNoYW5nZS5lbWl0KHJvd0RhdGEpO1xuICAgICAgICAgICAgICAgIHRoaXMub25Db250ZXh0TWVudVNlbGVjdC5lbWl0KHtvcmlnaW5hbEV2ZW50OiBldmVudC5vcmlnaW5hbEV2ZW50LCBkYXRhOiByb3dEYXRhLCBpbmRleDogZXZlbnQucm93SW5kZXh9KTtcbiAgICAgICAgICAgICAgICB0aGlzLmNvbnRleHRNZW51LnNob3coZXZlbnQub3JpZ2luYWxFdmVudCk7XG4gICAgICAgICAgICAgICAgdGhpcy50YWJsZVNlcnZpY2Uub25Db250ZXh0TWVudShyb3dEYXRhKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKHRoaXMuY29udGV4dE1lbnVTZWxlY3Rpb25Nb2RlID09PSAnam9pbnQnKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5wcmV2ZW50U2VsZWN0aW9uU2V0dGVyUHJvcGFnYXRpb24gPSB0cnVlO1xuICAgICAgICAgICAgICAgIGxldCBzZWxlY3RlZCA9IHRoaXMuaXNTZWxlY3RlZChyb3dEYXRhKTtcbiAgICAgICAgICAgICAgICBsZXQgZGF0YUtleVZhbHVlID0gdGhpcy5kYXRhS2V5ID8gU3RyaW5nKE9iamVjdFV0aWxzLnJlc29sdmVGaWVsZERhdGEocm93RGF0YSwgdGhpcy5kYXRhS2V5KSkgOiBudWxsO1xuXG4gICAgICAgICAgICAgICAgaWYgKCFzZWxlY3RlZCkge1xuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5pc1NpbmdsZVNlbGVjdGlvbk1vZGUoKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zZWxlY3Rpb24gPSByb3dEYXRhO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zZWxlY3Rpb25DaGFuZ2UuZW1pdChyb3dEYXRhKTtcbiAgICBcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChkYXRhS2V5VmFsdWUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNlbGVjdGlvbktleXMgPSB7fTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNlbGVjdGlvbktleXNbZGF0YUtleVZhbHVlXSA9IDE7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiAodGhpcy5pc011bHRpcGxlU2VsZWN0aW9uTW9kZSgpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9zZWxlY3Rpb24gPSB0aGlzLnNlbGVjdGlvbiA/IFsuLi50aGlzLnNlbGVjdGlvbiwgcm93RGF0YV0gOiBbcm93RGF0YV07XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNlbGVjdGlvbkNoYW5nZS5lbWl0KHRoaXMuc2VsZWN0aW9uKTtcbiAgICBcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChkYXRhS2V5VmFsdWUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNlbGVjdGlvbktleXNbZGF0YUtleVZhbHVlXSA9IDE7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICB0aGlzLnRhYmxlU2VydmljZS5vblNlbGVjdGlvbkNoYW5nZSgpO1xuICAgICAgICAgICAgICAgIHRoaXMuY29udGV4dE1lbnUuc2hvdyhldmVudC5vcmlnaW5hbEV2ZW50KTtcbiAgICAgICAgICAgICAgICB0aGlzLm9uQ29udGV4dE1lbnVTZWxlY3QuZW1pdCh7b3JpZ2luYWxFdmVudDogZXZlbnQsIGRhdGE6IHJvd0RhdGEsIGluZGV4OiBldmVudC5yb3dJbmRleH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgc2VsZWN0UmFuZ2UoZXZlbnQ6IE1vdXNlRXZlbnQsIHJvd0luZGV4OiBudW1iZXIpIHtcbiAgICAgICAgbGV0IHJhbmdlU3RhcnQsIHJhbmdlRW5kO1xuXG4gICAgICAgIGlmICh0aGlzLmFuY2hvclJvd0luZGV4ID4gcm93SW5kZXgpIHtcbiAgICAgICAgICAgIHJhbmdlU3RhcnQgPSByb3dJbmRleDtcbiAgICAgICAgICAgIHJhbmdlRW5kID0gdGhpcy5hbmNob3JSb3dJbmRleDtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmICh0aGlzLmFuY2hvclJvd0luZGV4IDwgcm93SW5kZXgpIHtcbiAgICAgICAgICAgIHJhbmdlU3RhcnQgPSB0aGlzLmFuY2hvclJvd0luZGV4O1xuICAgICAgICAgICAgcmFuZ2VFbmQgPSByb3dJbmRleDtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHJhbmdlU3RhcnQgPSByb3dJbmRleDtcbiAgICAgICAgICAgIHJhbmdlRW5kID0gcm93SW5kZXg7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5sYXp5ICYmIHRoaXMucGFnaW5hdG9yKSB7XG4gICAgICAgICAgICByYW5nZVN0YXJ0IC09IHRoaXMuZmlyc3Q7XG4gICAgICAgICAgICByYW5nZUVuZCAtPSB0aGlzLmZpcnN0O1xuICAgICAgICB9XG5cbiAgICAgICAgbGV0IHJhbmdlUm93c0RhdGEgPSBbXTtcbiAgICAgICAgZm9yKGxldCBpID0gcmFuZ2VTdGFydDsgaSA8PSByYW5nZUVuZDsgaSsrKSB7XG4gICAgICAgICAgICBsZXQgcmFuZ2VSb3dEYXRhID0gdGhpcy5maWx0ZXJlZFZhbHVlID8gdGhpcy5maWx0ZXJlZFZhbHVlW2ldIDogdGhpcy52YWx1ZVtpXTtcbiAgICAgICAgICAgIGlmICghdGhpcy5pc1NlbGVjdGVkKHJhbmdlUm93RGF0YSkpIHtcbiAgICAgICAgICAgICAgICByYW5nZVJvd3NEYXRhLnB1c2gocmFuZ2VSb3dEYXRhKTtcbiAgICAgICAgICAgICAgICB0aGlzLl9zZWxlY3Rpb24gPSBbLi4udGhpcy5zZWxlY3Rpb24sIHJhbmdlUm93RGF0YV07XG4gICAgICAgICAgICAgICAgbGV0IGRhdGFLZXlWYWx1ZTogc3RyaW5nID0gdGhpcy5kYXRhS2V5ID8gU3RyaW5nKE9iamVjdFV0aWxzLnJlc29sdmVGaWVsZERhdGEocmFuZ2VSb3dEYXRhLCB0aGlzLmRhdGFLZXkpKSA6IG51bGw7XG4gICAgICAgICAgICAgICAgaWYgKGRhdGFLZXlWYWx1ZSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnNlbGVjdGlvbktleXNbZGF0YUtleVZhbHVlXSA9IDE7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHRoaXMuc2VsZWN0aW9uQ2hhbmdlLmVtaXQodGhpcy5zZWxlY3Rpb24pO1xuICAgICAgICB0aGlzLm9uUm93U2VsZWN0LmVtaXQoe29yaWdpbmFsRXZlbnQ6IGV2ZW50LCBkYXRhOiByYW5nZVJvd3NEYXRhLCB0eXBlOiAncm93J30pO1xuICAgIH1cblxuICAgIGNsZWFyU2VsZWN0aW9uUmFuZ2UoZXZlbnQ6IE1vdXNlRXZlbnQpIHtcbiAgICAgICAgbGV0IHJhbmdlU3RhcnQsIHJhbmdlRW5kO1xuXG4gICAgICAgIGlmICh0aGlzLnJhbmdlUm93SW5kZXggPiB0aGlzLmFuY2hvclJvd0luZGV4KSB7XG4gICAgICAgICAgICByYW5nZVN0YXJ0ID0gdGhpcy5hbmNob3JSb3dJbmRleDtcbiAgICAgICAgICAgIHJhbmdlRW5kID0gdGhpcy5yYW5nZVJvd0luZGV4O1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKHRoaXMucmFuZ2VSb3dJbmRleCA8IHRoaXMuYW5jaG9yUm93SW5kZXgpIHtcbiAgICAgICAgICAgIHJhbmdlU3RhcnQgPSB0aGlzLnJhbmdlUm93SW5kZXg7XG4gICAgICAgICAgICByYW5nZUVuZCA9IHRoaXMuYW5jaG9yUm93SW5kZXg7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICByYW5nZVN0YXJ0ID0gdGhpcy5yYW5nZVJvd0luZGV4O1xuICAgICAgICAgICAgcmFuZ2VFbmQgPSB0aGlzLnJhbmdlUm93SW5kZXg7XG4gICAgICAgIH1cblxuICAgICAgICBmb3IobGV0IGkgPSByYW5nZVN0YXJ0OyBpIDw9IHJhbmdlRW5kOyBpKyspIHtcbiAgICAgICAgICAgIGxldCByYW5nZVJvd0RhdGEgPSB0aGlzLnZhbHVlW2ldO1xuICAgICAgICAgICAgbGV0IHNlbGVjdGlvbkluZGV4ID0gdGhpcy5maW5kSW5kZXhJblNlbGVjdGlvbihyYW5nZVJvd0RhdGEpO1xuICAgICAgICAgICAgdGhpcy5fc2VsZWN0aW9uID0gdGhpcy5zZWxlY3Rpb24uZmlsdGVyKCh2YWwsaSkgPT4gaSE9c2VsZWN0aW9uSW5kZXgpO1xuICAgICAgICAgICAgbGV0IGRhdGFLZXlWYWx1ZTogc3RyaW5nID0gdGhpcy5kYXRhS2V5ID8gU3RyaW5nKE9iamVjdFV0aWxzLnJlc29sdmVGaWVsZERhdGEocmFuZ2VSb3dEYXRhLCB0aGlzLmRhdGFLZXkpKSA6IG51bGw7XG4gICAgICAgICAgICBpZiAoZGF0YUtleVZhbHVlKSB7XG4gICAgICAgICAgICAgICAgZGVsZXRlIHRoaXMuc2VsZWN0aW9uS2V5c1tkYXRhS2V5VmFsdWVdO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5vblJvd1Vuc2VsZWN0LmVtaXQoe29yaWdpbmFsRXZlbnQ6IGV2ZW50LCBkYXRhOiByYW5nZVJvd0RhdGEsIHR5cGU6ICdyb3cnfSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBpc1NlbGVjdGVkKHJvd0RhdGEpIHtcbiAgICAgICAgaWYgKHJvd0RhdGEgJiYgdGhpcy5zZWxlY3Rpb24pIHtcbiAgICAgICAgICAgIGlmICh0aGlzLmRhdGFLZXkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5zZWxlY3Rpb25LZXlzW09iamVjdFV0aWxzLnJlc29sdmVGaWVsZERhdGEocm93RGF0YSwgdGhpcy5kYXRhS2V5KV0gIT09IHVuZGVmaW5lZDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLnNlbGVjdGlvbiBpbnN0YW5jZW9mIEFycmF5KVxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5maW5kSW5kZXhJblNlbGVjdGlvbihyb3dEYXRhKSA+IC0xO1xuICAgICAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuZXF1YWxzKHJvd0RhdGEsIHRoaXMuc2VsZWN0aW9uKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICBmaW5kSW5kZXhJblNlbGVjdGlvbihyb3dEYXRhOiBhbnkpIHtcbiAgICAgICAgbGV0IGluZGV4OiBudW1iZXIgPSAtMTtcbiAgICAgICAgaWYgKHRoaXMuc2VsZWN0aW9uICYmIHRoaXMuc2VsZWN0aW9uLmxlbmd0aCkge1xuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLnNlbGVjdGlvbi5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLmVxdWFscyhyb3dEYXRhLCB0aGlzLnNlbGVjdGlvbltpXSkpIHtcbiAgICAgICAgICAgICAgICAgICAgaW5kZXggPSBpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gaW5kZXg7XG4gICAgfVxuXG4gICAgdG9nZ2xlUm93V2l0aFJhZGlvKGV2ZW50OiBhbnksIHJvd0RhdGE6YW55KSB7XG4gICAgICAgIHRoaXMucHJldmVudFNlbGVjdGlvblNldHRlclByb3BhZ2F0aW9uID0gdHJ1ZTtcblxuICAgICAgICBpZiAodGhpcy5zZWxlY3Rpb24gIT0gcm93RGF0YSkge1xuICAgICAgICAgICAgdGhpcy5fc2VsZWN0aW9uID0gcm93RGF0YTtcbiAgICAgICAgICAgIHRoaXMuc2VsZWN0aW9uQ2hhbmdlLmVtaXQodGhpcy5zZWxlY3Rpb24pO1xuICAgICAgICAgICAgdGhpcy5vblJvd1NlbGVjdC5lbWl0KHtvcmlnaW5hbEV2ZW50OiBldmVudC5vcmlnaW5hbEV2ZW50LCBpbmRleDogZXZlbnQucm93SW5kZXgsIGRhdGE6IHJvd0RhdGEsIHR5cGU6ICdyYWRpb2J1dHRvbid9KTtcblxuICAgICAgICAgICAgaWYgKHRoaXMuZGF0YUtleSkge1xuICAgICAgICAgICAgICAgIHRoaXMuc2VsZWN0aW9uS2V5cyA9IHt9O1xuICAgICAgICAgICAgICAgIHRoaXMuc2VsZWN0aW9uS2V5c1tTdHJpbmcoT2JqZWN0VXRpbHMucmVzb2x2ZUZpZWxkRGF0YShyb3dEYXRhLCB0aGlzLmRhdGFLZXkpKV0gPSAxO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5fc2VsZWN0aW9uID0gbnVsbDtcbiAgICAgICAgICAgIHRoaXMuc2VsZWN0aW9uQ2hhbmdlLmVtaXQodGhpcy5zZWxlY3Rpb24pO1xuICAgICAgICAgICAgdGhpcy5vblJvd1Vuc2VsZWN0LmVtaXQoe29yaWdpbmFsRXZlbnQ6IGV2ZW50Lm9yaWdpbmFsRXZlbnQsIGluZGV4OiBldmVudC5yb3dJbmRleCwgZGF0YTogcm93RGF0YSwgdHlwZTogJ3JhZGlvYnV0dG9uJ30pO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy50YWJsZVNlcnZpY2Uub25TZWxlY3Rpb25DaGFuZ2UoKTtcblxuICAgICAgICBpZiAodGhpcy5pc1N0YXRlZnVsKCkpIHtcbiAgICAgICAgICAgIHRoaXMuc2F2ZVN0YXRlKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICB0b2dnbGVSb3dXaXRoQ2hlY2tib3goZXZlbnQsIHJvd0RhdGE6IGFueSkge1xuICAgICAgICB0aGlzLnNlbGVjdGlvbiA9IHRoaXMuc2VsZWN0aW9ufHxbXTtcbiAgICAgICAgbGV0IHNlbGVjdGVkID0gdGhpcy5pc1NlbGVjdGVkKHJvd0RhdGEpO1xuICAgICAgICBsZXQgZGF0YUtleVZhbHVlID0gdGhpcy5kYXRhS2V5ID8gU3RyaW5nKE9iamVjdFV0aWxzLnJlc29sdmVGaWVsZERhdGEocm93RGF0YSwgdGhpcy5kYXRhS2V5KSkgOiBudWxsO1xuICAgICAgICB0aGlzLnByZXZlbnRTZWxlY3Rpb25TZXR0ZXJQcm9wYWdhdGlvbiA9IHRydWU7XG5cbiAgICAgICAgaWYgKHNlbGVjdGVkKSB7XG4gICAgICAgICAgICBsZXQgc2VsZWN0aW9uSW5kZXggPSB0aGlzLmZpbmRJbmRleEluU2VsZWN0aW9uKHJvd0RhdGEpO1xuICAgICAgICAgICAgdGhpcy5fc2VsZWN0aW9uID0gdGhpcy5zZWxlY3Rpb24uZmlsdGVyKCh2YWwsIGkpID0+IGkgIT0gc2VsZWN0aW9uSW5kZXgpO1xuICAgICAgICAgICAgdGhpcy5zZWxlY3Rpb25DaGFuZ2UuZW1pdCh0aGlzLnNlbGVjdGlvbik7XG4gICAgICAgICAgICB0aGlzLm9uUm93VW5zZWxlY3QuZW1pdCh7IG9yaWdpbmFsRXZlbnQ6IGV2ZW50Lm9yaWdpbmFsRXZlbnQsIGluZGV4OiBldmVudC5yb3dJbmRleCwgZGF0YTogcm93RGF0YSwgdHlwZTogJ2NoZWNrYm94JyB9KTtcbiAgICAgICAgICAgIGlmIChkYXRhS2V5VmFsdWUpIHtcbiAgICAgICAgICAgICAgICBkZWxldGUgdGhpcy5zZWxlY3Rpb25LZXlzW2RhdGFLZXlWYWx1ZV07XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0aGlzLl9zZWxlY3Rpb24gPSB0aGlzLnNlbGVjdGlvbiA/IFsuLi50aGlzLnNlbGVjdGlvbiwgcm93RGF0YV0gOiBbcm93RGF0YV07XG4gICAgICAgICAgICB0aGlzLnNlbGVjdGlvbkNoYW5nZS5lbWl0KHRoaXMuc2VsZWN0aW9uKTtcbiAgICAgICAgICAgIHRoaXMub25Sb3dTZWxlY3QuZW1pdCh7IG9yaWdpbmFsRXZlbnQ6IGV2ZW50Lm9yaWdpbmFsRXZlbnQsIGluZGV4OiBldmVudC5yb3dJbmRleCwgZGF0YTogcm93RGF0YSwgdHlwZTogJ2NoZWNrYm94JyB9KTtcbiAgICAgICAgICAgIGlmIChkYXRhS2V5VmFsdWUpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnNlbGVjdGlvbktleXNbZGF0YUtleVZhbHVlXSA9IDE7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLnRhYmxlU2VydmljZS5vblNlbGVjdGlvbkNoYW5nZSgpO1xuXG4gICAgICAgIGlmICh0aGlzLmlzU3RhdGVmdWwoKSkge1xuICAgICAgICAgICAgdGhpcy5zYXZlU3RhdGUoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHRvZ2dsZVJvd3NXaXRoQ2hlY2tib3goZXZlbnQ6IEV2ZW50LCBjaGVjazogYm9vbGVhbikge1xuICAgICAgICB0aGlzLl9zZWxlY3Rpb24gPSBjaGVjayA/IHRoaXMuZmlsdGVyZWRWYWx1ZSA/IHRoaXMuZmlsdGVyZWRWYWx1ZS5zbGljZSgpOiB0aGlzLnZhbHVlLnNsaWNlKCkgOiBbXTtcbiAgICAgICAgdGhpcy5wcmV2ZW50U2VsZWN0aW9uU2V0dGVyUHJvcGFnYXRpb24gPSB0cnVlO1xuICAgICAgICB0aGlzLnVwZGF0ZVNlbGVjdGlvbktleXMoKTtcbiAgICAgICAgdGhpcy5zZWxlY3Rpb25DaGFuZ2UuZW1pdCh0aGlzLl9zZWxlY3Rpb24pO1xuICAgICAgICB0aGlzLnRhYmxlU2VydmljZS5vblNlbGVjdGlvbkNoYW5nZSgpO1xuICAgICAgICB0aGlzLm9uSGVhZGVyQ2hlY2tib3hUb2dnbGUuZW1pdCh7b3JpZ2luYWxFdmVudDogZXZlbnQsIGNoZWNrZWQ6IGNoZWNrfSk7XG5cbiAgICAgICAgaWYgKHRoaXMuaXNTdGF0ZWZ1bCgpKSB7XG4gICAgICAgICAgICB0aGlzLnNhdmVTdGF0ZSgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZXF1YWxzKGRhdGExLCBkYXRhMikge1xuICAgICAgICByZXR1cm4gdGhpcy5jb21wYXJlU2VsZWN0aW9uQnkgPT09ICdlcXVhbHMnID8gKGRhdGExID09PSBkYXRhMikgOiBPYmplY3RVdGlscy5lcXVhbHMoZGF0YTEsIGRhdGEyLCB0aGlzLmRhdGFLZXkpO1xuICAgIH1cblxuICAgIC8qIExlZ2FjeSBGaWx0ZXJpbmcgZm9yIGN1c3RvbSBlbGVtZW50cyAqL1xuICAgIGZpbHRlcih2YWx1ZTogYW55LCBmaWVsZDogc3RyaW5nLCBtYXRjaE1vZGU6IHN0cmluZykge1xuICAgICAgICBpZiAodGhpcy5maWx0ZXJUaW1lb3V0KSB7XG4gICAgICAgICAgICBjbGVhclRpbWVvdXQodGhpcy5maWx0ZXJUaW1lb3V0KTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoIXRoaXMuaXNGaWx0ZXJCbGFuayh2YWx1ZSkpIHtcbiAgICAgICAgICAgIHRoaXMuZmlsdGVyc1tmaWVsZF0gPSB7IHZhbHVlOiB2YWx1ZSwgbWF0Y2hNb2RlOiBtYXRjaE1vZGUgfTtcbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLmZpbHRlcnNbZmllbGRdKSB7XG4gICAgICAgICAgICBkZWxldGUgdGhpcy5maWx0ZXJzW2ZpZWxkXTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuZmlsdGVyVGltZW91dCA9IHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5fZmlsdGVyKCk7XG4gICAgICAgICAgICB0aGlzLmZpbHRlclRpbWVvdXQgPSBudWxsO1xuICAgICAgICB9LCB0aGlzLmZpbHRlckRlbGF5KTtcblxuICAgICAgICB0aGlzLmFuY2hvclJvd0luZGV4ID0gbnVsbDtcbiAgICB9XG5cbiAgICBmaWx0ZXJHbG9iYWwodmFsdWUsIG1hdGNoTW9kZSkge1xuICAgICAgICB0aGlzLmZpbHRlcih2YWx1ZSwgJ2dsb2JhbCcsIG1hdGNoTW9kZSk7XG4gICAgfVxuXG4gICAgaXNGaWx0ZXJCbGFuayhmaWx0ZXI6IGFueSk6IGJvb2xlYW4ge1xuICAgICAgICBpZiAoZmlsdGVyICE9PSBudWxsICYmIGZpbHRlciAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICBpZiAoKHR5cGVvZiBmaWx0ZXIgPT09ICdzdHJpbmcnICYmIGZpbHRlci50cmltKCkubGVuZ3RoID09IDApIHx8IChmaWx0ZXIgaW5zdGFuY2VvZiBBcnJheSAmJiBmaWx0ZXIubGVuZ3RoID09IDApKVxuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG5cbiAgICBfZmlsdGVyKCkge1xuICAgICAgICBpZiAoIXRoaXMucmVzdG9yaW5nRmlsdGVyKSB7XG4gICAgICAgICAgICB0aGlzLmZpcnN0ID0gMDtcbiAgICAgICAgICAgIHRoaXMuZmlyc3RDaGFuZ2UuZW1pdCh0aGlzLmZpcnN0KTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLmxhenkpIHtcbiAgICAgICAgICAgIHRoaXMub25MYXp5TG9hZC5lbWl0KHRoaXMuY3JlYXRlTGF6eUxvYWRNZXRhZGF0YSgpKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGlmICghdGhpcy52YWx1ZSkge1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKCF0aGlzLmhhc0ZpbHRlcigpKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5maWx0ZXJlZFZhbHVlID0gbnVsbDtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5wYWdpbmF0b3IpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy50b3RhbFJlY29yZHMgPSB0aGlzLnZhbHVlID8gdGhpcy52YWx1ZS5sZW5ndGggOiAwO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIGxldCBnbG9iYWxGaWx0ZXJGaWVsZHNBcnJheTtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5maWx0ZXJzWydnbG9iYWwnXSkge1xuICAgICAgICAgICAgICAgICAgICBpZiAoIXRoaXMuY29sdW1ucyAmJiAhdGhpcy5nbG9iYWxGaWx0ZXJGaWVsZHMpXG4gICAgICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0dsb2JhbCBmaWx0ZXJpbmcgcmVxdWlyZXMgZHluYW1pYyBjb2x1bW5zIG9yIGdsb2JhbEZpbHRlckZpZWxkcyB0byBiZSBkZWZpbmVkLicpO1xuICAgICAgICAgICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgICAgICAgICAgICBnbG9iYWxGaWx0ZXJGaWVsZHNBcnJheSA9IHRoaXMuZ2xvYmFsRmlsdGVyRmllbGRzfHx0aGlzLmNvbHVtbnM7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgdGhpcy5maWx0ZXJlZFZhbHVlID0gW107XG5cbiAgICAgICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMudmFsdWUubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICAgICAgbGV0IGxvY2FsTWF0Y2ggPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICBsZXQgZ2xvYmFsTWF0Y2ggPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgbGV0IGxvY2FsRmlsdGVyZWQgPSBmYWxzZTtcblxuICAgICAgICAgICAgICAgICAgICBmb3IgKGxldCBwcm9wIGluIHRoaXMuZmlsdGVycykge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuZmlsdGVycy5oYXNPd25Qcm9wZXJ0eShwcm9wKSAmJiBwcm9wICE9PSAnZ2xvYmFsJykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxvY2FsRmlsdGVyZWQgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBmaWx0ZXJGaWVsZCA9IHByb3A7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGZpbHRlck1ldGEgPSB0aGlzLmZpbHRlcnNbZmlsdGVyRmllbGRdO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkoZmlsdGVyTWV0YSkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgbWV0YSBvZiBmaWx0ZXJNZXRhKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsb2NhbE1hdGNoID0gdGhpcy5leGVjdXRlTG9jYWxGaWx0ZXIoZmlsdGVyRmllbGQsIHRoaXMudmFsdWVbaV0sIG1ldGEpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoKG1ldGEub3BlcmF0b3IgPT09IEZpbHRlck9wZXJhdG9yLk9SICYmIGxvY2FsTWF0Y2gpIHx8IChtZXRhLm9wZXJhdG9yID09PSBGaWx0ZXJPcGVyYXRvci5BTkQgJiYgIWxvY2FsTWF0Y2gpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxvY2FsTWF0Y2ggPSB0aGlzLmV4ZWN1dGVMb2NhbEZpbHRlcihmaWx0ZXJGaWVsZCwgdGhpcy52YWx1ZVtpXSwgZmlsdGVyTWV0YSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICghbG9jYWxNYXRjaCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5maWx0ZXJzWydnbG9iYWwnXSAmJiAhZ2xvYmFsTWF0Y2ggJiYgZ2xvYmFsRmlsdGVyRmllbGRzQXJyYXkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvcihsZXQgaiA9IDA7IGogPCBnbG9iYWxGaWx0ZXJGaWVsZHNBcnJheS5sZW5ndGg7IGorKykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBnbG9iYWxGaWx0ZXJGaWVsZCA9IGdsb2JhbEZpbHRlckZpZWxkc0FycmF5W2pdLmZpZWxkfHxnbG9iYWxGaWx0ZXJGaWVsZHNBcnJheVtqXTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBnbG9iYWxNYXRjaCA9IHRoaXMuZmlsdGVyU2VydmljZS5maWx0ZXJzWyg8RmlsdGVyTWV0YWRhdGE+IHRoaXMuZmlsdGVyc1snZ2xvYmFsJ10pLm1hdGNoTW9kZV0oT2JqZWN0VXRpbHMucmVzb2x2ZUZpZWxkRGF0YSh0aGlzLnZhbHVlW2ldLCBnbG9iYWxGaWx0ZXJGaWVsZCksICg8RmlsdGVyTWV0YWRhdGE+IHRoaXMuZmlsdGVyc1snZ2xvYmFsJ10pLnZhbHVlLCB0aGlzLmZpbHRlckxvY2FsZSk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoZ2xvYmFsTWF0Y2gpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgbGV0IG1hdGNoZXM6IGJvb2xlYW47XG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLmZpbHRlcnNbJ2dsb2JhbCddKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBtYXRjaGVzID0gbG9jYWxGaWx0ZXJlZCA/IChsb2NhbEZpbHRlcmVkICYmIGxvY2FsTWF0Y2ggJiYgZ2xvYmFsTWF0Y2gpIDogZ2xvYmFsTWF0Y2g7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBtYXRjaGVzID0gbG9jYWxGaWx0ZXJlZCAmJiBsb2NhbE1hdGNoO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKG1hdGNoZXMpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZmlsdGVyZWRWYWx1ZS5wdXNoKHRoaXMudmFsdWVbaV0pO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuZmlsdGVyZWRWYWx1ZS5sZW5ndGggPT09IHRoaXMudmFsdWUubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZmlsdGVyZWRWYWx1ZSA9IG51bGw7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMucGFnaW5hdG9yKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMudG90YWxSZWNvcmRzID0gdGhpcy5maWx0ZXJlZFZhbHVlID8gdGhpcy5maWx0ZXJlZFZhbHVlLmxlbmd0aCA6IHRoaXMudmFsdWUgPyB0aGlzLnZhbHVlLmxlbmd0aCA6IDA7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5vbkZpbHRlci5lbWl0KHtcbiAgICAgICAgICAgIGZpbHRlcnM6IHRoaXMuZmlsdGVycyxcbiAgICAgICAgICAgIGZpbHRlcmVkVmFsdWU6IHRoaXMuZmlsdGVyZWRWYWx1ZSB8fCB0aGlzLnZhbHVlXG4gICAgICAgIH0pO1xuXG4gICAgICAgIHRoaXMudGFibGVTZXJ2aWNlLm9uVmFsdWVDaGFuZ2UodGhpcy52YWx1ZSk7XG5cbiAgICAgICAgaWYgKHRoaXMuaXNTdGF0ZWZ1bCgpICYmICF0aGlzLnJlc3RvcmluZ0ZpbHRlcikge1xuICAgICAgICAgICAgdGhpcy5zYXZlU3RhdGUoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLnJlc3RvcmluZ0ZpbHRlcikge1xuICAgICAgICAgICAgdGhpcy5yZXN0b3JpbmdGaWx0ZXIgPSBmYWxzZTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuY2QubWFya0ZvckNoZWNrKCk7XG5cbiAgICAgICAgaWYgKHRoaXMuc2Nyb2xsYWJsZSkge1xuICAgICAgICAgICAgdGhpcy5yZXNldFNjcm9sbFRvcCgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZXhlY3V0ZUxvY2FsRmlsdGVyKGZpZWxkOiBzdHJpbmcsIHJvd0RhdGE6IGFueSwgZmlsdGVyTWV0YTogRmlsdGVyTWV0YWRhdGEpOiBib29sZWFuIHtcbiAgICAgICAgbGV0IGZpbHRlclZhbHVlID0gZmlsdGVyTWV0YS52YWx1ZTtcbiAgICAgICAgbGV0IGZpbHRlck1hdGNoTW9kZSA9IGZpbHRlck1ldGEubWF0Y2hNb2RlIHx8IEZpbHRlck1hdGNoTW9kZS5TVEFSVFNfV0lUSDtcbiAgICAgICAgbGV0IGRhdGFGaWVsZFZhbHVlID0gT2JqZWN0VXRpbHMucmVzb2x2ZUZpZWxkRGF0YShyb3dEYXRhLCBmaWVsZCk7XG4gICAgICAgIGxldCBmaWx0ZXJDb25zdHJhaW50ID0gdGhpcy5maWx0ZXJTZXJ2aWNlLmZpbHRlcnNbZmlsdGVyTWF0Y2hNb2RlXTtcblxuICAgICAgICByZXR1cm4gZmlsdGVyQ29uc3RyYWludChkYXRhRmllbGRWYWx1ZSwgZmlsdGVyVmFsdWUsIHRoaXMuZmlsdGVyTG9jYWxlKTtcbiAgICB9XG5cbiAgICBoYXNGaWx0ZXIoKSB7XG4gICAgICAgIGxldCBlbXB0eSA9IHRydWU7XG4gICAgICAgIGZvciAobGV0IHByb3AgaW4gdGhpcy5maWx0ZXJzKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5maWx0ZXJzLmhhc093blByb3BlcnR5KHByb3ApKSB7XG4gICAgICAgICAgICAgICAgZW1wdHkgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiAhZW1wdHk7XG4gICAgfVxuXG4gICAgY3JlYXRlTGF6eUxvYWRNZXRhZGF0YSgpOiBhbnkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgZmlyc3Q6IHRoaXMuZmlyc3QsXG4gICAgICAgICAgICByb3dzOiB0aGlzLnJvd3MsXG4gICAgICAgICAgICBzb3J0RmllbGQ6IHRoaXMuc29ydEZpZWxkLFxuICAgICAgICAgICAgc29ydE9yZGVyOiB0aGlzLnNvcnRPcmRlcixcbiAgICAgICAgICAgIGZpbHRlcnM6IHRoaXMuZmlsdGVycyxcbiAgICAgICAgICAgIGdsb2JhbEZpbHRlcjogdGhpcy5maWx0ZXJzICYmIHRoaXMuZmlsdGVyc1snZ2xvYmFsJ10gPyAoPEZpbHRlck1ldGFkYXRhPiB0aGlzLmZpbHRlcnNbJ2dsb2JhbCddKS52YWx1ZSA6IG51bGwsXG4gICAgICAgICAgICBtdWx0aVNvcnRNZXRhOiB0aGlzLm11bHRpU29ydE1ldGFcbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICBwdWJsaWMgY2xlYXIoKSB7XG4gICAgICAgIHRoaXMuX3NvcnRGaWVsZCA9IG51bGw7XG4gICAgICAgIHRoaXMuX3NvcnRPcmRlciA9IHRoaXMuZGVmYXVsdFNvcnRPcmRlcjtcbiAgICAgICAgdGhpcy5fbXVsdGlTb3J0TWV0YSA9IG51bGw7XG4gICAgICAgIHRoaXMudGFibGVTZXJ2aWNlLm9uU29ydChudWxsKTtcblxuICAgICAgICB0aGlzLmZpbHRlcmVkVmFsdWUgPSBudWxsO1xuICAgICAgICB0aGlzLmZpbHRlcnMgPSB7fTtcblxuICAgICAgICB0aGlzLmZpcnN0ID0gMDtcbiAgICAgICAgdGhpcy5maXJzdENoYW5nZS5lbWl0KHRoaXMuZmlyc3QpO1xuXG4gICAgICAgIGlmICh0aGlzLmxhenkpIHtcbiAgICAgICAgICAgIHRoaXMub25MYXp5TG9hZC5lbWl0KHRoaXMuY3JlYXRlTGF6eUxvYWRNZXRhZGF0YSgpKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMudG90YWxSZWNvcmRzID0gKHRoaXMuX3ZhbHVlID8gdGhpcy5fdmFsdWUubGVuZ3RoIDogMCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwdWJsaWMgcmVzZXQoKSB7XG4gICAgICAgIHRoaXMuY2xlYXIoKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgZXhwb3J0Q1NWKG9wdGlvbnM/OiBhbnkpIHtcbiAgICAgICAgbGV0IGRhdGE7XG4gICAgICAgIGxldCBjc3YgPSAnJztcbiAgICAgICAgbGV0IGNvbHVtbnMgPSB0aGlzLmZyb3plbkNvbHVtbnMgPyBbLi4udGhpcy5mcm96ZW5Db2x1bW5zLCAuLi50aGlzLmNvbHVtbnNdIDogdGhpcy5jb2x1bW5zO1xuXG4gICAgICAgIGlmIChvcHRpb25zICYmIG9wdGlvbnMuc2VsZWN0aW9uT25seSkge1xuICAgICAgICAgICAgZGF0YSA9IHRoaXMuc2VsZWN0aW9uIHx8IFtdO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgZGF0YSA9IHRoaXMuZmlsdGVyZWRWYWx1ZSB8fCB0aGlzLnZhbHVlO1xuXG4gICAgICAgICAgICBpZiAodGhpcy5mcm96ZW5WYWx1ZSkge1xuICAgICAgICAgICAgICAgIGRhdGEgPSBkYXRhID8gWy4uLnRoaXMuZnJvemVuVmFsdWUsIC4uLmRhdGFdIDogdGhpcy5mcm96ZW5WYWx1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIC8vaGVhZGVyc1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGNvbHVtbnMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGxldCBjb2x1bW4gPSBjb2x1bW5zW2ldO1xuICAgICAgICAgICAgaWYgKGNvbHVtbi5leHBvcnRhYmxlICE9PSBmYWxzZSAmJiBjb2x1bW4uZmllbGQpIHtcbiAgICAgICAgICAgICAgICBjc3YgKz0gJ1wiJyArIChjb2x1bW4uaGVhZGVyIHx8IGNvbHVtbi5maWVsZCkgKyAnXCInO1xuXG4gICAgICAgICAgICAgICAgaWYgKGkgPCAoY29sdW1ucy5sZW5ndGggLSAxKSkge1xuICAgICAgICAgICAgICAgICAgICBjc3YgKz0gdGhpcy5jc3ZTZXBhcmF0b3I7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgLy9ib2R5XG4gICAgICAgIGRhdGEuZm9yRWFjaCgocmVjb3JkLCBpKSA9PiB7XG4gICAgICAgICAgICBjc3YgKz0gJ1xcbic7XG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGNvbHVtbnMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICBsZXQgY29sdW1uID0gY29sdW1uc1tpXTtcbiAgICAgICAgICAgICAgICBpZiAoY29sdW1uLmV4cG9ydGFibGUgIT09IGZhbHNlICYmIGNvbHVtbi5maWVsZCkge1xuICAgICAgICAgICAgICAgICAgICBsZXQgY2VsbERhdGEgPSBPYmplY3RVdGlscy5yZXNvbHZlRmllbGREYXRhKHJlY29yZCwgY29sdW1uLmZpZWxkKTtcblxuICAgICAgICAgICAgICAgICAgICBpZiAoY2VsbERhdGEgIT0gbnVsbCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuZXhwb3J0RnVuY3Rpb24pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjZWxsRGF0YSA9IHRoaXMuZXhwb3J0RnVuY3Rpb24oe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkYXRhOiBjZWxsRGF0YSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZmllbGQ6IGNvbHVtbi5maWVsZFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNlbGxEYXRhID0gU3RyaW5nKGNlbGxEYXRhKS5yZXBsYWNlKC9cIi9nLCAnXCJcIicpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgICAgICAgICAgIGNlbGxEYXRhID0gJyc7XG5cbiAgICAgICAgICAgICAgICAgICAgY3N2ICs9ICdcIicgKyBjZWxsRGF0YSArICdcIic7XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKGkgPCAoY29sdW1ucy5sZW5ndGggLSAxKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgY3N2ICs9IHRoaXMuY3N2U2VwYXJhdG9yO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICBsZXQgYmxvYiA9IG5ldyBCbG9iKFtjc3ZdLCB7XG4gICAgICAgICAgICB0eXBlOiAndGV4dC9jc3Y7Y2hhcnNldD11dGYtODsnXG4gICAgICAgIH0pO1xuXG4gICAgICAgIGlmICh3aW5kb3cubmF2aWdhdG9yLm1zU2F2ZU9yT3BlbkJsb2IpIHtcbiAgICAgICAgICAgIG5hdmlnYXRvci5tc1NhdmVPck9wZW5CbG9iKGJsb2IsIHRoaXMuZXhwb3J0RmlsZW5hbWUgKyAnLmNzdicpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgbGV0IGxpbmsgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYVwiKTtcbiAgICAgICAgICAgIGxpbmsuc3R5bGUuZGlzcGxheSA9ICdub25lJztcbiAgICAgICAgICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQobGluayk7XG4gICAgICAgICAgICBpZiAobGluay5kb3dubG9hZCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgbGluay5zZXRBdHRyaWJ1dGUoJ2hyZWYnLCBVUkwuY3JlYXRlT2JqZWN0VVJMKGJsb2IpKTtcbiAgICAgICAgICAgICAgICBsaW5rLnNldEF0dHJpYnV0ZSgnZG93bmxvYWQnLCB0aGlzLmV4cG9ydEZpbGVuYW1lICsgJy5jc3YnKTtcbiAgICAgICAgICAgICAgICBsaW5rLmNsaWNrKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBjc3YgPSAnZGF0YTp0ZXh0L2NzdjtjaGFyc2V0PXV0Zi04LCcgKyBjc3Y7XG4gICAgICAgICAgICAgICAgd2luZG93Lm9wZW4oZW5jb2RlVVJJKGNzdikpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZG9jdW1lbnQuYm9keS5yZW1vdmVDaGlsZChsaW5rKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHB1YmxpYyByZXNldFNjcm9sbFRvcCgpIHtcbiAgICAgICAgaWYgKHRoaXMudmlydHVhbFNjcm9sbClcbiAgICAgICAgICAgIHRoaXMuc2Nyb2xsVG9WaXJ0dWFsSW5kZXgoMCk7XG4gICAgICAgIGVsc2VcbiAgICAgICAgICAgIHRoaXMuc2Nyb2xsVG8oe3RvcDogMH0pO1xuICAgIH1cblxuICAgIHB1YmxpYyBzY3JvbGxUb1ZpcnR1YWxJbmRleChpbmRleDogbnVtYmVyKSB7XG4gICAgICAgIGlmICh0aGlzLnNjcm9sbGFibGVWaWV3Q2hpbGQpIHtcbiAgICAgICAgICAgIHRoaXMuc2Nyb2xsYWJsZVZpZXdDaGlsZC5zY3JvbGxUb1ZpcnR1YWxJbmRleChpbmRleCk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5zY3JvbGxhYmxlRnJvemVuVmlld0NoaWxkKSB7XG4gICAgICAgICAgICB0aGlzLnNjcm9sbGFibGVGcm96ZW5WaWV3Q2hpbGQuc2Nyb2xsVG9WaXJ0dWFsSW5kZXgoaW5kZXgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHVibGljIHNjcm9sbFRvKG9wdGlvbnMpIHtcbiAgICAgICAgaWYgKHRoaXMuc2Nyb2xsYWJsZVZpZXdDaGlsZCkge1xuICAgICAgICAgICAgdGhpcy5zY3JvbGxhYmxlVmlld0NoaWxkLnNjcm9sbFRvKG9wdGlvbnMpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMuc2Nyb2xsYWJsZUZyb3plblZpZXdDaGlsZCkge1xuICAgICAgICAgICAgdGhpcy5zY3JvbGxhYmxlRnJvemVuVmlld0NoaWxkLnNjcm9sbFRvKG9wdGlvbnMpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgdXBkYXRlRWRpdGluZ0NlbGwoY2VsbCwgZGF0YSwgZmllbGQsIGluZGV4KSB7XG4gICAgICAgIHRoaXMuZWRpdGluZ0NlbGwgPSBjZWxsO1xuICAgICAgICB0aGlzLmVkaXRpbmdDZWxsRGF0YSA9IGRhdGE7XG4gICAgICAgIHRoaXMuZWRpdGluZ0NlbGxGaWVsZCA9IGZpZWxkO1xuICAgICAgICB0aGlzLmVkaXRpbmdDZWxsUm93SW5kZXggPSBpbmRleDtcbiAgICAgICAgdGhpcy5iaW5kRG9jdW1lbnRFZGl0TGlzdGVuZXIoKTtcbiAgICB9XG5cbiAgICBpc0VkaXRpbmdDZWxsVmFsaWQoKSB7XG4gICAgICAgIHJldHVybiAodGhpcy5lZGl0aW5nQ2VsbCAmJiBEb21IYW5kbGVyLmZpbmQodGhpcy5lZGl0aW5nQ2VsbCwgJy5uZy1pbnZhbGlkLm5nLWRpcnR5JykubGVuZ3RoID09PSAwKTtcbiAgICB9XG5cbiAgICBiaW5kRG9jdW1lbnRFZGl0TGlzdGVuZXIoKSB7XG4gICAgICAgIGlmICghdGhpcy5kb2N1bWVudEVkaXRMaXN0ZW5lcikge1xuICAgICAgICAgICAgdGhpcy5kb2N1bWVudEVkaXRMaXN0ZW5lciA9IChldmVudCkgPT4ge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLmVkaXRpbmdDZWxsICYmICF0aGlzLmVkaXRpbmdDZWxsQ2xpY2sgJiYgdGhpcy5pc0VkaXRpbmdDZWxsVmFsaWQoKSkge1xuICAgICAgICAgICAgICAgICAgICBEb21IYW5kbGVyLnJlbW92ZUNsYXNzKHRoaXMuZWRpdGluZ0NlbGwsICdwLWNlbGwtZWRpdGluZycpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmVkaXRpbmdDZWxsID0gbnVsbDtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5vbkVkaXRDb21wbGV0ZS5lbWl0KHsgZmllbGQ6IHRoaXMuZWRpdGluZ0NlbGxGaWVsZCwgZGF0YTogdGhpcy5lZGl0aW5nQ2VsbERhdGEsIG9yaWdpbmFsRXZlbnQ6IGV2ZW50LCBpbmRleDogdGhpcy5lZGl0aW5nQ2VsbFJvd0luZGV4IH0pO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmVkaXRpbmdDZWxsRmllbGQgPSBudWxsO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmVkaXRpbmdDZWxsRGF0YSA9IG51bGw7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZWRpdGluZ0NlbGxSb3dJbmRleCA9IG51bGw7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMudW5iaW5kRG9jdW1lbnRFZGl0TGlzdGVuZXIoKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jZC5tYXJrRm9yQ2hlY2soKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICB0aGlzLmVkaXRpbmdDZWxsQ2xpY2sgPSBmYWxzZTtcbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdGhpcy5kb2N1bWVudEVkaXRMaXN0ZW5lcik7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICB1bmJpbmREb2N1bWVudEVkaXRMaXN0ZW5lcigpIHtcbiAgICAgICAgaWYgKHRoaXMuZG9jdW1lbnRFZGl0TGlzdGVuZXIpIHtcbiAgICAgICAgICAgIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdGhpcy5kb2N1bWVudEVkaXRMaXN0ZW5lcik7XG4gICAgICAgICAgICB0aGlzLmRvY3VtZW50RWRpdExpc3RlbmVyID0gbnVsbDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGluaXRSb3dFZGl0KHJvd0RhdGE6IGFueSkge1xuICAgICAgICBsZXQgZGF0YUtleVZhbHVlID0gU3RyaW5nKE9iamVjdFV0aWxzLnJlc29sdmVGaWVsZERhdGEocm93RGF0YSwgdGhpcy5kYXRhS2V5KSk7XG4gICAgICAgIHRoaXMuZWRpdGluZ1Jvd0tleXNbZGF0YUtleVZhbHVlXSA9IHRydWU7XG4gICAgfVxuXG4gICAgc2F2ZVJvd0VkaXQocm93RGF0YTogYW55LCByb3dFbGVtZW50OiBIVE1MVGFibGVSb3dFbGVtZW50KSB7XG4gICAgICAgIGlmIChEb21IYW5kbGVyLmZpbmQocm93RWxlbWVudCwgJy5uZy1pbnZhbGlkLm5nLWRpcnR5JykubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICBsZXQgZGF0YUtleVZhbHVlID0gU3RyaW5nKE9iamVjdFV0aWxzLnJlc29sdmVGaWVsZERhdGEocm93RGF0YSwgdGhpcy5kYXRhS2V5KSk7XG4gICAgICAgICAgICBkZWxldGUgdGhpcy5lZGl0aW5nUm93S2V5c1tkYXRhS2V5VmFsdWVdO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgY2FuY2VsUm93RWRpdChyb3dEYXRhOiBhbnkpIHtcbiAgICAgICAgbGV0IGRhdGFLZXlWYWx1ZSA9IFN0cmluZyhPYmplY3RVdGlscy5yZXNvbHZlRmllbGREYXRhKHJvd0RhdGEsIHRoaXMuZGF0YUtleSkpO1xuICAgICAgICBkZWxldGUgdGhpcy5lZGl0aW5nUm93S2V5c1tkYXRhS2V5VmFsdWVdO1xuICAgIH1cblxuICAgIHRvZ2dsZVJvdyhyb3dEYXRhOiBhbnksIGV2ZW50PzogRXZlbnQpIHtcbiAgICAgICAgaWYgKCF0aGlzLmRhdGFLZXkpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignZGF0YUtleSBtdXN0IGJlIGRlZmluZWQgdG8gdXNlIHJvdyBleHBhbnNpb24nKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGxldCBkYXRhS2V5VmFsdWUgPSBTdHJpbmcoT2JqZWN0VXRpbHMucmVzb2x2ZUZpZWxkRGF0YShyb3dEYXRhLCB0aGlzLmRhdGFLZXkpKTtcblxuICAgICAgICBpZiAodGhpcy5leHBhbmRlZFJvd0tleXNbZGF0YUtleVZhbHVlXSAhPSBudWxsKSB7XG4gICAgICAgICAgICBkZWxldGUgdGhpcy5leHBhbmRlZFJvd0tleXNbZGF0YUtleVZhbHVlXTtcbiAgICAgICAgICAgIHRoaXMub25Sb3dDb2xsYXBzZS5lbWl0KHtcbiAgICAgICAgICAgICAgICBvcmlnaW5hbEV2ZW50OiBldmVudCxcbiAgICAgICAgICAgICAgICBkYXRhOiByb3dEYXRhXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGlmICh0aGlzLnJvd0V4cGFuZE1vZGUgPT09ICdzaW5nbGUnKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5leHBhbmRlZFJvd0tleXMgPSB7fTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdGhpcy5leHBhbmRlZFJvd0tleXNbZGF0YUtleVZhbHVlXSA9IHRydWU7XG4gICAgICAgICAgICB0aGlzLm9uUm93RXhwYW5kLmVtaXQoe1xuICAgICAgICAgICAgICAgIG9yaWdpbmFsRXZlbnQ6IGV2ZW50LFxuICAgICAgICAgICAgICAgIGRhdGE6IHJvd0RhdGFcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGV2ZW50KSB7XG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMuaXNTdGF0ZWZ1bCgpKSB7XG4gICAgICAgICAgICB0aGlzLnNhdmVTdGF0ZSgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgaXNSb3dFeHBhbmRlZChyb3dEYXRhOiBhbnkpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZXhwYW5kZWRSb3dLZXlzW1N0cmluZyhPYmplY3RVdGlscy5yZXNvbHZlRmllbGREYXRhKHJvd0RhdGEsIHRoaXMuZGF0YUtleSkpXSA9PT0gdHJ1ZTtcbiAgICB9XG5cbiAgICBpc1Jvd0VkaXRpbmcocm93RGF0YTogYW55KTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiB0aGlzLmVkaXRpbmdSb3dLZXlzW1N0cmluZyhPYmplY3RVdGlscy5yZXNvbHZlRmllbGREYXRhKHJvd0RhdGEsIHRoaXMuZGF0YUtleSkpXSA9PT0gdHJ1ZTtcbiAgICB9XG5cbiAgICBpc1NpbmdsZVNlbGVjdGlvbk1vZGUoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnNlbGVjdGlvbk1vZGUgPT09ICdzaW5nbGUnO1xuICAgIH1cblxuICAgIGlzTXVsdGlwbGVTZWxlY3Rpb25Nb2RlKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5zZWxlY3Rpb25Nb2RlID09PSAnbXVsdGlwbGUnO1xuICAgIH1cblxuICAgIG9uQ29sdW1uUmVzaXplQmVnaW4oZXZlbnQpIHtcbiAgICAgICAgbGV0IGNvbnRhaW5lckxlZnQgPSBEb21IYW5kbGVyLmdldE9mZnNldCh0aGlzLmNvbnRhaW5lclZpZXdDaGlsZC5uYXRpdmVFbGVtZW50KS5sZWZ0O1xuICAgICAgICB0aGlzLmxhc3RSZXNpemVySGVscGVyWCA9IChldmVudC5wYWdlWCAtIGNvbnRhaW5lckxlZnQgKyB0aGlzLmNvbnRhaW5lclZpZXdDaGlsZC5uYXRpdmVFbGVtZW50LnNjcm9sbExlZnQpO1xuICAgICAgICB0aGlzLm9uQ29sdW1uUmVzaXplKGV2ZW50KTtcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICB9XG5cbiAgICBvbkNvbHVtblJlc2l6ZShldmVudCkge1xuICAgICAgICBsZXQgY29udGFpbmVyTGVmdCA9IERvbUhhbmRsZXIuZ2V0T2Zmc2V0KHRoaXMuY29udGFpbmVyVmlld0NoaWxkLm5hdGl2ZUVsZW1lbnQpLmxlZnQ7XG4gICAgICAgIERvbUhhbmRsZXIuYWRkQ2xhc3ModGhpcy5jb250YWluZXJWaWV3Q2hpbGQubmF0aXZlRWxlbWVudCwgJ3AtdW5zZWxlY3RhYmxlLXRleHQnKTtcbiAgICAgICAgdGhpcy5yZXNpemVIZWxwZXJWaWV3Q2hpbGQubmF0aXZlRWxlbWVudC5zdHlsZS5oZWlnaHQgPSB0aGlzLmNvbnRhaW5lclZpZXdDaGlsZC5uYXRpdmVFbGVtZW50Lm9mZnNldEhlaWdodCArICdweCc7XG4gICAgICAgIHRoaXMucmVzaXplSGVscGVyVmlld0NoaWxkLm5hdGl2ZUVsZW1lbnQuc3R5bGUudG9wID0gMCArICdweCc7XG4gICAgICAgIHRoaXMucmVzaXplSGVscGVyVmlld0NoaWxkLm5hdGl2ZUVsZW1lbnQuc3R5bGUubGVmdCA9IChldmVudC5wYWdlWCAtIGNvbnRhaW5lckxlZnQgKyB0aGlzLmNvbnRhaW5lclZpZXdDaGlsZC5uYXRpdmVFbGVtZW50LnNjcm9sbExlZnQpICsgJ3B4JztcblxuICAgICAgICB0aGlzLnJlc2l6ZUhlbHBlclZpZXdDaGlsZC5uYXRpdmVFbGVtZW50LnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snO1xuICAgIH1cblxuICAgIG9uQ29sdW1uUmVzaXplRW5kKGV2ZW50LCBjb2x1bW4pIHtcbiAgICAgICAgbGV0IGRlbHRhID0gdGhpcy5yZXNpemVIZWxwZXJWaWV3Q2hpbGQubmF0aXZlRWxlbWVudC5vZmZzZXRMZWZ0IC0gdGhpcy5sYXN0UmVzaXplckhlbHBlclg7XG4gICAgICAgIGxldCBjb2x1bW5XaWR0aCA9IGNvbHVtbi5vZmZzZXRXaWR0aDtcbiAgICAgICAgbGV0IG1pbldpZHRoID0gcGFyc2VJbnQoY29sdW1uLnN0eWxlLm1pbldpZHRoIHx8IDE1KTtcblxuICAgICAgICBpZiAoY29sdW1uV2lkdGggKyBkZWx0YSA8IG1pbldpZHRoKSB7XG4gICAgICAgICAgICBkZWx0YSA9IG1pbldpZHRoIC0gY29sdW1uV2lkdGg7XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBuZXdDb2x1bW5XaWR0aCA9IGNvbHVtbldpZHRoICsgZGVsdGE7XG5cbiAgICAgICAgaWYgKG5ld0NvbHVtbldpZHRoID49IG1pbldpZHRoKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5jb2x1bW5SZXNpemVNb2RlID09PSAnZml0Jykge1xuICAgICAgICAgICAgICAgIGxldCBuZXh0Q29sdW1uID0gY29sdW1uLm5leHRFbGVtZW50U2libGluZztcbiAgICAgICAgICAgICAgICB3aGlsZSAoIW5leHRDb2x1bW4ub2Zmc2V0UGFyZW50KSB7XG4gICAgICAgICAgICAgICAgICAgIG5leHRDb2x1bW4gPSBuZXh0Q29sdW1uLm5leHRFbGVtZW50U2libGluZztcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBpZiAobmV4dENvbHVtbikge1xuICAgICAgICAgICAgICAgICAgICBsZXQgbmV4dENvbHVtbldpZHRoID0gbmV4dENvbHVtbi5vZmZzZXRXaWR0aCAtIGRlbHRhO1xuICAgICAgICAgICAgICAgICAgICBsZXQgbmV4dENvbHVtbk1pbldpZHRoID0gbmV4dENvbHVtbi5zdHlsZS5taW5XaWR0aCB8fCAxNTtcblxuICAgICAgICAgICAgICAgICAgICBpZiAobmV3Q29sdW1uV2lkdGggPiAxNSAmJiBuZXh0Q29sdW1uV2lkdGggPiBwYXJzZUludChuZXh0Q29sdW1uTWluV2lkdGgpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5zY3JvbGxhYmxlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHNjcm9sbGFibGVWaWV3ID0gdGhpcy5maW5kUGFyZW50U2Nyb2xsYWJsZVZpZXcoY29sdW1uKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgc2Nyb2xsYWJsZUJvZHlUYWJsZSA9IERvbUhhbmRsZXIuZmluZFNpbmdsZShzY3JvbGxhYmxlVmlldywgJy5wLWRhdGF0YWJsZS1zY3JvbGxhYmxlLWJvZHkgdGFibGUnKSB8fCBEb21IYW5kbGVyLmZpbmRTaW5nbGUoc2Nyb2xsYWJsZVZpZXcsICcucC1kYXRhdGFibGUtdmlydHVhbC1zY3JvbGxhYmxlLWJvZHkgdGFibGUnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgc2Nyb2xsYWJsZUhlYWRlclRhYmxlID0gRG9tSGFuZGxlci5maW5kU2luZ2xlKHNjcm9sbGFibGVWaWV3LCAndGFibGUucC1kYXRhdGFibGUtc2Nyb2xsYWJsZS1oZWFkZXItdGFibGUnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgc2Nyb2xsYWJsZUZvb3RlclRhYmxlID0gRG9tSGFuZGxlci5maW5kU2luZ2xlKHNjcm9sbGFibGVWaWV3LCAndGFibGUucC1kYXRhdGFibGUtc2Nyb2xsYWJsZS1mb290ZXItdGFibGUnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgcmVzaXplQ29sdW1uSW5kZXggPSBEb21IYW5kbGVyLmluZGV4KGNvbHVtbik7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnJlc2l6ZUNvbEdyb3VwKHNjcm9sbGFibGVIZWFkZXJUYWJsZSwgcmVzaXplQ29sdW1uSW5kZXgsIG5ld0NvbHVtbldpZHRoLCBuZXh0Q29sdW1uV2lkdGgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucmVzaXplQ29sR3JvdXAoc2Nyb2xsYWJsZUJvZHlUYWJsZSwgcmVzaXplQ29sdW1uSW5kZXgsIG5ld0NvbHVtbldpZHRoLCBuZXh0Q29sdW1uV2lkdGgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucmVzaXplQ29sR3JvdXAoc2Nyb2xsYWJsZUZvb3RlclRhYmxlLCByZXNpemVDb2x1bW5JbmRleCwgbmV3Q29sdW1uV2lkdGgsIG5leHRDb2x1bW5XaWR0aCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb2x1bW4uc3R5bGUud2lkdGggPSBuZXdDb2x1bW5XaWR0aCArICdweCc7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG5leHRDb2x1bW4pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmV4dENvbHVtbi5zdHlsZS53aWR0aCA9IG5leHRDb2x1bW5XaWR0aCArICdweCc7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAodGhpcy5jb2x1bW5SZXNpemVNb2RlID09PSAnZXhwYW5kJykge1xuICAgICAgICAgICAgICAgIGlmIChuZXdDb2x1bW5XaWR0aCA+PSBtaW5XaWR0aCkge1xuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5zY3JvbGxhYmxlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNldFNjcm9sbGFibGVJdGVtc1dpZHRoT25FeHBhbmRSZXNpemUoY29sdW1uLCBuZXdDb2x1bW5XaWR0aCwgZGVsdGEpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy50YWJsZVZpZXdDaGlsZC5uYXRpdmVFbGVtZW50LnN0eWxlLndpZHRoID0gdGhpcy50YWJsZVZpZXdDaGlsZC5uYXRpdmVFbGVtZW50Lm9mZnNldFdpZHRoICsgZGVsdGEgKyAncHgnO1xuICAgICAgICAgICAgICAgICAgICAgICAgY29sdW1uLnN0eWxlLndpZHRoID0gbmV3Q29sdW1uV2lkdGggKyAncHgnO1xuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGNvbnRhaW5lcldpZHRoID0gdGhpcy50YWJsZVZpZXdDaGlsZC5uYXRpdmVFbGVtZW50LnN0eWxlLndpZHRoO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5jb250YWluZXJWaWV3Q2hpbGQubmF0aXZlRWxlbWVudC5zdHlsZS53aWR0aCA9IGNvbnRhaW5lcldpZHRoICsgJ3B4JztcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdGhpcy5vbkNvbFJlc2l6ZS5lbWl0KHtcbiAgICAgICAgICAgICAgICBlbGVtZW50OiBjb2x1bW4sXG4gICAgICAgICAgICAgICAgZGVsdGE6IGRlbHRhXG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgaWYgKHRoaXMuaXNTdGF0ZWZ1bCgpKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zYXZlU3RhdGUoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMucmVzaXplSGVscGVyVmlld0NoaWxkLm5hdGl2ZUVsZW1lbnQuc3R5bGUuZGlzcGxheSA9ICdub25lJztcbiAgICAgICAgRG9tSGFuZGxlci5yZW1vdmVDbGFzcyh0aGlzLmNvbnRhaW5lclZpZXdDaGlsZC5uYXRpdmVFbGVtZW50LCAncC11bnNlbGVjdGFibGUtdGV4dCcpO1xuICAgIH1cblxuICAgIHNldFNjcm9sbGFibGVJdGVtc1dpZHRoT25FeHBhbmRSZXNpemUoY29sdW1uLCBuZXdDb2x1bW5XaWR0aCwgZGVsdGEpIHtcbiAgICAgICAgbGV0IHNjcm9sbGFibGVWaWV3ID0gY29sdW1uID8gdGhpcy5maW5kUGFyZW50U2Nyb2xsYWJsZVZpZXcoY29sdW1uKSA6IHRoaXMuY29udGFpbmVyVmlld0NoaWxkLm5hdGl2ZUVsZW1lbnQ7XG4gICAgICAgIGxldCBzY3JvbGxhYmxlQm9keSA9IERvbUhhbmRsZXIuZmluZFNpbmdsZShzY3JvbGxhYmxlVmlldywgJy5wLWRhdGF0YWJsZS1zY3JvbGxhYmxlLWJvZHknKSB8fCBEb21IYW5kbGVyLmZpbmRTaW5nbGUoc2Nyb2xsYWJsZVZpZXcsICdjZGstdmlydHVhbC1zY3JvbGwtdmlld3BvcnQnKTtcbiAgICAgICAgbGV0IHNjcm9sbGFibGVIZWFkZXIgPSBEb21IYW5kbGVyLmZpbmRTaW5nbGUoc2Nyb2xsYWJsZVZpZXcsICcucC1kYXRhdGFibGUtc2Nyb2xsYWJsZS1oZWFkZXInKTtcbiAgICAgICAgbGV0IHNjcm9sbGFibGVGb290ZXIgPSBEb21IYW5kbGVyLmZpbmRTaW5nbGUoc2Nyb2xsYWJsZVZpZXcsICcucC1kYXRhdGFibGUtc2Nyb2xsYWJsZS1mb290ZXInKTtcbiAgICAgICAgbGV0IHNjcm9sbGFibGVCb2R5VGFibGUgPSBEb21IYW5kbGVyLmZpbmRTaW5nbGUoc2Nyb2xsYWJsZUJvZHksICcucC1kYXRhdGFibGUtc2Nyb2xsYWJsZS1ib2R5IHRhYmxlJykgfHwgRG9tSGFuZGxlci5maW5kU2luZ2xlKHNjcm9sbGFibGVWaWV3LCAnY2RrLXZpcnR1YWwtc2Nyb2xsLXZpZXdwb3J0IHRhYmxlJyk7XG4gICAgICAgIGxldCBzY3JvbGxhYmxlSGVhZGVyVGFibGUgPSBEb21IYW5kbGVyLmZpbmRTaW5nbGUoc2Nyb2xsYWJsZUhlYWRlciwgJ3RhYmxlLnAtZGF0YXRhYmxlLXNjcm9sbGFibGUtaGVhZGVyLXRhYmxlJyk7XG4gICAgICAgIGxldCBzY3JvbGxhYmxlRm9vdGVyVGFibGUgPSBEb21IYW5kbGVyLmZpbmRTaW5nbGUoc2Nyb2xsYWJsZUZvb3RlciwgJ3RhYmxlLnAtZGF0YXRhYmxlLXNjcm9sbGFibGUtZm9vdGVyLXRhYmxlJyk7XG5cbiAgICAgICAgY29uc3Qgc2Nyb2xsYWJsZUJvZHlUYWJsZVdpZHRoID0gY29sdW1uID8gc2Nyb2xsYWJsZUJvZHlUYWJsZS5vZmZzZXRXaWR0aCArIGRlbHRhIDogbmV3Q29sdW1uV2lkdGg7XG4gICAgICAgIGNvbnN0IHNjcm9sbGFibGVIZWFkZXJUYWJsZVdpZHRoID0gY29sdW1uID8gc2Nyb2xsYWJsZUhlYWRlclRhYmxlLm9mZnNldFdpZHRoICsgZGVsdGEgOiBuZXdDb2x1bW5XaWR0aDtcbiAgICAgICAgY29uc3QgaXNDb250YWluZXJJblZpZXdwb3J0ID0gdGhpcy5jb250YWluZXJWaWV3Q2hpbGQubmF0aXZlRWxlbWVudC5vZmZzZXRXaWR0aCA+PSBzY3JvbGxhYmxlQm9keVRhYmxlV2lkdGg7XG5cbiAgICAgICAgbGV0IHNldFdpZHRoID0gKGNvbnRhaW5lciwgdGFibGUsIHdpZHRoLCBpc0NvbnRhaW5lckluVmlld3BvcnQpID0+IHtcbiAgICAgICAgICAgIGlmIChjb250YWluZXIgJiYgdGFibGUpIHtcbiAgICAgICAgICAgICAgICBjb250YWluZXIuc3R5bGUud2lkdGggPSBpc0NvbnRhaW5lckluVmlld3BvcnQgPyB3aWR0aCArIERvbUhhbmRsZXIuY2FsY3VsYXRlU2Nyb2xsYmFyV2lkdGgoc2Nyb2xsYWJsZUJvZHkpICsgJ3B4JyA6ICdhdXRvJ1xuICAgICAgICAgICAgICAgIHRhYmxlLnN0eWxlLndpZHRoID0gd2lkdGggKyAncHgnO1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuXG4gICAgICAgIHNldFdpZHRoKHNjcm9sbGFibGVCb2R5LCBzY3JvbGxhYmxlQm9keVRhYmxlLCBzY3JvbGxhYmxlQm9keVRhYmxlV2lkdGgsIGlzQ29udGFpbmVySW5WaWV3cG9ydCk7XG4gICAgICAgIHNldFdpZHRoKHNjcm9sbGFibGVIZWFkZXIsIHNjcm9sbGFibGVIZWFkZXJUYWJsZSwgc2Nyb2xsYWJsZUhlYWRlclRhYmxlV2lkdGgsIGlzQ29udGFpbmVySW5WaWV3cG9ydCk7XG4gICAgICAgIHNldFdpZHRoKHNjcm9sbGFibGVGb290ZXIsIHNjcm9sbGFibGVGb290ZXJUYWJsZSwgc2Nyb2xsYWJsZUhlYWRlclRhYmxlV2lkdGgsIGlzQ29udGFpbmVySW5WaWV3cG9ydCk7XG5cbiAgICAgICAgaWYgKGNvbHVtbikge1xuICAgICAgICAgICAgbGV0IHJlc2l6ZUNvbHVtbkluZGV4ID0gRG9tSGFuZGxlci5pbmRleChjb2x1bW4pO1xuXG4gICAgICAgICAgICB0aGlzLnJlc2l6ZUNvbEdyb3VwKHNjcm9sbGFibGVIZWFkZXJUYWJsZSwgcmVzaXplQ29sdW1uSW5kZXgsIG5ld0NvbHVtbldpZHRoLCBudWxsKTtcbiAgICAgICAgICAgIHRoaXMucmVzaXplQ29sR3JvdXAoc2Nyb2xsYWJsZUJvZHlUYWJsZSwgcmVzaXplQ29sdW1uSW5kZXgsIG5ld0NvbHVtbldpZHRoLCBudWxsKTtcbiAgICAgICAgICAgIHRoaXMucmVzaXplQ29sR3JvdXAoc2Nyb2xsYWJsZUZvb3RlclRhYmxlLCByZXNpemVDb2x1bW5JbmRleCwgbmV3Q29sdW1uV2lkdGgsIG51bGwpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZmluZFBhcmVudFNjcm9sbGFibGVWaWV3KGNvbHVtbikge1xuICAgICAgICBpZiAoY29sdW1uKSB7XG4gICAgICAgICAgICBsZXQgcGFyZW50ID0gY29sdW1uLnBhcmVudEVsZW1lbnQ7XG4gICAgICAgICAgICB3aGlsZSAocGFyZW50ICYmICFEb21IYW5kbGVyLmhhc0NsYXNzKHBhcmVudCwgJ3AtZGF0YXRhYmxlLXNjcm9sbGFibGUtdmlldycpKSB7XG4gICAgICAgICAgICAgICAgcGFyZW50ID0gcGFyZW50LnBhcmVudEVsZW1lbnQ7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiBwYXJlbnQ7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJlc2l6ZUNvbEdyb3VwKHRhYmxlLCByZXNpemVDb2x1bW5JbmRleCwgbmV3Q29sdW1uV2lkdGgsIG5leHRDb2x1bW5XaWR0aCkge1xuICAgICAgICBpZiAodGFibGUpIHtcbiAgICAgICAgICAgIGxldCBjb2xHcm91cCA9IHRhYmxlLmNoaWxkcmVuWzBdLm5vZGVOYW1lID09PSAnQ09MR1JPVVAnID8gdGFibGUuY2hpbGRyZW5bMF0gOiBudWxsO1xuXG4gICAgICAgICAgICBpZiAoY29sR3JvdXApIHtcbiAgICAgICAgICAgICAgICBsZXQgY29sID0gY29sR3JvdXAuY2hpbGRyZW5bcmVzaXplQ29sdW1uSW5kZXhdO1xuICAgICAgICAgICAgICAgIGxldCBuZXh0Q29sID0gY29sLm5leHRFbGVtZW50U2libGluZztcbiAgICAgICAgICAgICAgICBjb2wuc3R5bGUud2lkdGggPSBuZXdDb2x1bW5XaWR0aCArICdweCc7XG5cbiAgICAgICAgICAgICAgICBpZiAobmV4dENvbCAmJiBuZXh0Q29sdW1uV2lkdGgpIHtcbiAgICAgICAgICAgICAgICAgICAgbmV4dENvbC5zdHlsZS53aWR0aCA9IG5leHRDb2x1bW5XaWR0aCArICdweCc7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgXCJTY3JvbGxhYmxlIHRhYmxlcyByZXF1aXJlIGEgY29sZ3JvdXAgdG8gc3VwcG9ydCByZXNpemFibGUgY29sdW1uc1wiO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgb25Db2x1bW5EcmFnU3RhcnQoZXZlbnQsIGNvbHVtbkVsZW1lbnQpIHtcbiAgICAgICAgdGhpcy5yZW9yZGVySWNvbldpZHRoID0gRG9tSGFuZGxlci5nZXRIaWRkZW5FbGVtZW50T3V0ZXJXaWR0aCh0aGlzLnJlb3JkZXJJbmRpY2F0b3JVcFZpZXdDaGlsZC5uYXRpdmVFbGVtZW50KTtcbiAgICAgICAgdGhpcy5yZW9yZGVySWNvbkhlaWdodCA9IERvbUhhbmRsZXIuZ2V0SGlkZGVuRWxlbWVudE91dGVySGVpZ2h0KHRoaXMucmVvcmRlckluZGljYXRvckRvd25WaWV3Q2hpbGQubmF0aXZlRWxlbWVudCk7XG4gICAgICAgIHRoaXMuZHJhZ2dlZENvbHVtbiA9IGNvbHVtbkVsZW1lbnQ7XG4gICAgICAgIGV2ZW50LmRhdGFUcmFuc2Zlci5zZXREYXRhKCd0ZXh0JywgJ2InKTsgICAgLy8gRm9yIGZpcmVmb3hcbiAgICB9XG5cbiAgICBvbkNvbHVtbkRyYWdFbnRlcihldmVudCwgZHJvcEhlYWRlcikge1xuICAgICAgICBpZiAodGhpcy5yZW9yZGVyYWJsZUNvbHVtbnMgJiYgdGhpcy5kcmFnZ2VkQ29sdW1uICYmIGRyb3BIZWFkZXIpIHtcbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICBsZXQgY29udGFpbmVyT2Zmc2V0ID0gRG9tSGFuZGxlci5nZXRPZmZzZXQodGhpcy5jb250YWluZXJWaWV3Q2hpbGQubmF0aXZlRWxlbWVudCk7XG4gICAgICAgICAgICBsZXQgZHJvcEhlYWRlck9mZnNldCA9IERvbUhhbmRsZXIuZ2V0T2Zmc2V0KGRyb3BIZWFkZXIpO1xuXG4gICAgICAgICAgICBpZiAodGhpcy5kcmFnZ2VkQ29sdW1uICE9IGRyb3BIZWFkZXIpIHtcbiAgICAgICAgICAgICAgICBsZXQgZHJhZ0luZGV4ID0gRG9tSGFuZGxlci5pbmRleFdpdGhpbkdyb3VwKHRoaXMuZHJhZ2dlZENvbHVtbiwgJ3ByZW9yZGVyYWJsZWNvbHVtbicpO1xuICAgICAgICAgICAgICAgIGxldCBkcm9wSW5kZXggPSBEb21IYW5kbGVyLmluZGV4V2l0aGluR3JvdXAoZHJvcEhlYWRlciwgJ3ByZW9yZGVyYWJsZWNvbHVtbicpO1xuICAgICAgICAgICAgICAgIGxldCB0YXJnZXRMZWZ0ID0gZHJvcEhlYWRlck9mZnNldC5sZWZ0IC0gY29udGFpbmVyT2Zmc2V0LmxlZnQ7XG4gICAgICAgICAgICAgICAgbGV0IHRhcmdldFRvcCA9IGNvbnRhaW5lck9mZnNldC50b3AgLSBkcm9wSGVhZGVyT2Zmc2V0LnRvcDtcbiAgICAgICAgICAgICAgICBsZXQgY29sdW1uQ2VudGVyID0gZHJvcEhlYWRlck9mZnNldC5sZWZ0ICsgZHJvcEhlYWRlci5vZmZzZXRXaWR0aCAvIDI7XG5cbiAgICAgICAgICAgICAgICB0aGlzLnJlb3JkZXJJbmRpY2F0b3JVcFZpZXdDaGlsZC5uYXRpdmVFbGVtZW50LnN0eWxlLnRvcCA9IGRyb3BIZWFkZXJPZmZzZXQudG9wIC0gY29udGFpbmVyT2Zmc2V0LnRvcCAtICh0aGlzLnJlb3JkZXJJY29uSGVpZ2h0IC0gMSkgKyAncHgnO1xuICAgICAgICAgICAgICAgIHRoaXMucmVvcmRlckluZGljYXRvckRvd25WaWV3Q2hpbGQubmF0aXZlRWxlbWVudC5zdHlsZS50b3AgPSBkcm9wSGVhZGVyT2Zmc2V0LnRvcCAtIGNvbnRhaW5lck9mZnNldC50b3AgKyBkcm9wSGVhZGVyLm9mZnNldEhlaWdodCArICdweCc7XG5cbiAgICAgICAgICAgICAgICBpZiAoZXZlbnQucGFnZVggPiBjb2x1bW5DZW50ZXIpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5yZW9yZGVySW5kaWNhdG9yVXBWaWV3Q2hpbGQubmF0aXZlRWxlbWVudC5zdHlsZS5sZWZ0ID0gKHRhcmdldExlZnQgKyBkcm9wSGVhZGVyLm9mZnNldFdpZHRoIC0gTWF0aC5jZWlsKHRoaXMucmVvcmRlckljb25XaWR0aCAvIDIpKSArICdweCc7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMucmVvcmRlckluZGljYXRvckRvd25WaWV3Q2hpbGQubmF0aXZlRWxlbWVudC5zdHlsZS5sZWZ0ID0gKHRhcmdldExlZnQgKyBkcm9wSGVhZGVyLm9mZnNldFdpZHRoIC0gTWF0aC5jZWlsKHRoaXMucmVvcmRlckljb25XaWR0aCAvIDIpKSArICdweCc7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZHJvcFBvc2l0aW9uID0gMTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMucmVvcmRlckluZGljYXRvclVwVmlld0NoaWxkLm5hdGl2ZUVsZW1lbnQuc3R5bGUubGVmdCA9ICh0YXJnZXRMZWZ0IC0gTWF0aC5jZWlsKHRoaXMucmVvcmRlckljb25XaWR0aCAvIDIpKSArICdweCc7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMucmVvcmRlckluZGljYXRvckRvd25WaWV3Q2hpbGQubmF0aXZlRWxlbWVudC5zdHlsZS5sZWZ0ID0gKHRhcmdldExlZnQgLSBNYXRoLmNlaWwodGhpcy5yZW9yZGVySWNvbldpZHRoIC8gMikpICsgJ3B4JztcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5kcm9wUG9zaXRpb24gPSAtMTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBpZiAoKGRyb3BJbmRleCAtIGRyYWdJbmRleCA9PT0gMSAmJiB0aGlzLmRyb3BQb3NpdGlvbiA9PT0gLTEpIHx8IChkcm9wSW5kZXggLSBkcmFnSW5kZXggPT09IC0xICYmIHRoaXMuZHJvcFBvc2l0aW9uID09PSAxKSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnJlb3JkZXJJbmRpY2F0b3JVcFZpZXdDaGlsZC5uYXRpdmVFbGVtZW50LnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMucmVvcmRlckluZGljYXRvckRvd25WaWV3Q2hpbGQubmF0aXZlRWxlbWVudC5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5yZW9yZGVySW5kaWNhdG9yVXBWaWV3Q2hpbGQubmF0aXZlRWxlbWVudC5zdHlsZS5kaXNwbGF5ID0gJ2Jsb2NrJztcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5yZW9yZGVySW5kaWNhdG9yRG93blZpZXdDaGlsZC5uYXRpdmVFbGVtZW50LnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIGV2ZW50LmRhdGFUcmFuc2Zlci5kcm9wRWZmZWN0ID0gJ25vbmUnO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgb25Db2x1bW5EcmFnTGVhdmUoZXZlbnQpIHtcbiAgICAgICAgaWYgKHRoaXMucmVvcmRlcmFibGVDb2x1bW5zICYmIHRoaXMuZHJhZ2dlZENvbHVtbikge1xuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgIHRoaXMucmVvcmRlckluZGljYXRvclVwVmlld0NoaWxkLm5hdGl2ZUVsZW1lbnQuc3R5bGUuZGlzcGxheSA9ICdub25lJztcbiAgICAgICAgICAgIHRoaXMucmVvcmRlckluZGljYXRvckRvd25WaWV3Q2hpbGQubmF0aXZlRWxlbWVudC5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgb25Db2x1bW5Ecm9wKGV2ZW50LCBkcm9wQ29sdW1uKSB7XG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIGlmICh0aGlzLmRyYWdnZWRDb2x1bW4pIHtcbiAgICAgICAgICAgIGxldCBkcmFnSW5kZXggPSBEb21IYW5kbGVyLmluZGV4V2l0aGluR3JvdXAodGhpcy5kcmFnZ2VkQ29sdW1uLCAncHJlb3JkZXJhYmxlY29sdW1uJyk7XG4gICAgICAgICAgICBsZXQgZHJvcEluZGV4ID0gRG9tSGFuZGxlci5pbmRleFdpdGhpbkdyb3VwKGRyb3BDb2x1bW4sICdwcmVvcmRlcmFibGVjb2x1bW4nKTtcbiAgICAgICAgICAgIGxldCBhbGxvd0Ryb3AgPSAoZHJhZ0luZGV4ICE9IGRyb3BJbmRleCk7XG4gICAgICAgICAgICBpZiAoYWxsb3dEcm9wICYmICgoZHJvcEluZGV4IC0gZHJhZ0luZGV4ID09IDEgJiYgdGhpcy5kcm9wUG9zaXRpb24gPT09IC0xKSB8fCAoZHJhZ0luZGV4IC0gZHJvcEluZGV4ID09IDEgJiYgdGhpcy5kcm9wUG9zaXRpb24gPT09IDEpKSkge1xuICAgICAgICAgICAgICAgIGFsbG93RHJvcCA9IGZhbHNlO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoYWxsb3dEcm9wICYmICgoZHJvcEluZGV4IDwgZHJhZ0luZGV4ICYmIHRoaXMuZHJvcFBvc2l0aW9uID09PSAxKSkpIHtcbiAgICAgICAgICAgICAgICBkcm9wSW5kZXggPSBkcm9wSW5kZXggKyAxO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoYWxsb3dEcm9wICYmICgoZHJvcEluZGV4ID4gZHJhZ0luZGV4ICYmIHRoaXMuZHJvcFBvc2l0aW9uID09PSAtMSkpKSB7XG4gICAgICAgICAgICAgICAgZHJvcEluZGV4ID0gZHJvcEluZGV4IC0gMTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKGFsbG93RHJvcCkge1xuICAgICAgICAgICAgICAgIE9iamVjdFV0aWxzLnJlb3JkZXJBcnJheSh0aGlzLmNvbHVtbnMsIGRyYWdJbmRleCwgZHJvcEluZGV4KTtcblxuICAgICAgICAgICAgICAgIHRoaXMub25Db2xSZW9yZGVyLmVtaXQoe1xuICAgICAgICAgICAgICAgICAgICBkcmFnSW5kZXg6IGRyYWdJbmRleCxcbiAgICAgICAgICAgICAgICAgICAgZHJvcEluZGV4OiBkcm9wSW5kZXgsXG4gICAgICAgICAgICAgICAgICAgIGNvbHVtbnM6IHRoaXMuY29sdW1uc1xuICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuaXNTdGF0ZWZ1bCgpKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuem9uZS5ydW5PdXRzaWRlQW5ndWxhcigoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNhdmVTdGF0ZSgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdGhpcy5yZW9yZGVySW5kaWNhdG9yVXBWaWV3Q2hpbGQubmF0aXZlRWxlbWVudC5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuICAgICAgICAgICAgdGhpcy5yZW9yZGVySW5kaWNhdG9yRG93blZpZXdDaGlsZC5uYXRpdmVFbGVtZW50LnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG4gICAgICAgICAgICB0aGlzLmRyYWdnZWRDb2x1bW4uZHJhZ2dhYmxlID0gZmFsc2U7XG4gICAgICAgICAgICB0aGlzLmRyYWdnZWRDb2x1bW4gPSBudWxsO1xuICAgICAgICAgICAgdGhpcy5kcm9wUG9zaXRpb24gPSBudWxsO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgb25Sb3dEcmFnU3RhcnQoZXZlbnQsIGluZGV4KSB7XG4gICAgICAgIHRoaXMucm93RHJhZ2dpbmcgPSB0cnVlO1xuICAgICAgICB0aGlzLmRyYWdnZWRSb3dJbmRleCA9IGluZGV4O1xuICAgICAgICBldmVudC5kYXRhVHJhbnNmZXIuc2V0RGF0YSgndGV4dCcsICdiJyk7ICAgIC8vIEZvciBmaXJlZm94XG4gICAgfVxuXG4gICAgb25Sb3dEcmFnT3ZlcihldmVudCwgaW5kZXgsIHJvd0VsZW1lbnQpIHtcbiAgICAgICAgaWYgKHRoaXMucm93RHJhZ2dpbmcgJiYgdGhpcy5kcmFnZ2VkUm93SW5kZXggIT09IGluZGV4KSB7XG4gICAgICAgICAgICBsZXQgcm93WSA9IERvbUhhbmRsZXIuZ2V0T2Zmc2V0KHJvd0VsZW1lbnQpLnRvcCArIERvbUhhbmRsZXIuZ2V0V2luZG93U2Nyb2xsVG9wKCk7XG4gICAgICAgICAgICBsZXQgcGFnZVkgPSBldmVudC5wYWdlWTtcbiAgICAgICAgICAgIGxldCByb3dNaWRZID0gcm93WSArIERvbUhhbmRsZXIuZ2V0T3V0ZXJIZWlnaHQocm93RWxlbWVudCkgLyAyO1xuICAgICAgICAgICAgbGV0IHByZXZSb3dFbGVtZW50ID0gcm93RWxlbWVudC5wcmV2aW91c0VsZW1lbnRTaWJsaW5nO1xuXG4gICAgICAgICAgICBpZiAocGFnZVkgPCByb3dNaWRZKSB7XG4gICAgICAgICAgICAgICAgRG9tSGFuZGxlci5yZW1vdmVDbGFzcyhyb3dFbGVtZW50LCAncC1kYXRhdGFibGUtZHJhZ3BvaW50LWJvdHRvbScpO1xuXG4gICAgICAgICAgICAgICAgdGhpcy5kcm9wcGVkUm93SW5kZXggPSBpbmRleDtcbiAgICAgICAgICAgICAgICBpZiAocHJldlJvd0VsZW1lbnQpXG4gICAgICAgICAgICAgICAgICAgIERvbUhhbmRsZXIuYWRkQ2xhc3MocHJldlJvd0VsZW1lbnQsICdwLWRhdGF0YWJsZS1kcmFncG9pbnQtYm90dG9tJyk7XG4gICAgICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAgICAgICBEb21IYW5kbGVyLmFkZENsYXNzKHJvd0VsZW1lbnQsICdwLWRhdGF0YWJsZS1kcmFncG9pbnQtdG9wJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBpZiAocHJldlJvd0VsZW1lbnQpXG4gICAgICAgICAgICAgICAgICAgIERvbUhhbmRsZXIucmVtb3ZlQ2xhc3MocHJldlJvd0VsZW1lbnQsICdwLWRhdGF0YWJsZS1kcmFncG9pbnQtYm90dG9tJyk7XG4gICAgICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAgICAgICBEb21IYW5kbGVyLmFkZENsYXNzKHJvd0VsZW1lbnQsICdwLWRhdGF0YWJsZS1kcmFncG9pbnQtdG9wJyk7XG5cbiAgICAgICAgICAgICAgICB0aGlzLmRyb3BwZWRSb3dJbmRleCA9IGluZGV4ICsgMTtcbiAgICAgICAgICAgICAgICBEb21IYW5kbGVyLmFkZENsYXNzKHJvd0VsZW1lbnQsICdwLWRhdGF0YWJsZS1kcmFncG9pbnQtYm90dG9tJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBvblJvd0RyYWdMZWF2ZShldmVudCwgcm93RWxlbWVudCkge1xuICAgICAgICBsZXQgcHJldlJvd0VsZW1lbnQgPSByb3dFbGVtZW50LnByZXZpb3VzRWxlbWVudFNpYmxpbmc7XG4gICAgICAgIGlmIChwcmV2Um93RWxlbWVudCkge1xuICAgICAgICAgICAgRG9tSGFuZGxlci5yZW1vdmVDbGFzcyhwcmV2Um93RWxlbWVudCwgJ3AtZGF0YXRhYmxlLWRyYWdwb2ludC1ib3R0b20nKTtcbiAgICAgICAgfVxuXG4gICAgICAgIERvbUhhbmRsZXIucmVtb3ZlQ2xhc3Mocm93RWxlbWVudCwgJ3AtZGF0YXRhYmxlLWRyYWdwb2ludC1ib3R0b20nKTtcbiAgICAgICAgRG9tSGFuZGxlci5yZW1vdmVDbGFzcyhyb3dFbGVtZW50LCAncC1kYXRhdGFibGUtZHJhZ3BvaW50LXRvcCcpO1xuICAgIH1cblxuICAgIG9uUm93RHJhZ0VuZChldmVudCkge1xuICAgICAgICB0aGlzLnJvd0RyYWdnaW5nID0gZmFsc2U7XG4gICAgICAgIHRoaXMuZHJhZ2dlZFJvd0luZGV4ID0gbnVsbDtcbiAgICAgICAgdGhpcy5kcm9wcGVkUm93SW5kZXggPSBudWxsO1xuICAgIH1cblxuICAgIG9uUm93RHJvcChldmVudCwgcm93RWxlbWVudCkge1xuICAgICAgICBpZiAodGhpcy5kcm9wcGVkUm93SW5kZXggIT0gbnVsbCkge1xuICAgICAgICAgICAgbGV0IGRyb3BJbmRleCA9ICh0aGlzLmRyYWdnZWRSb3dJbmRleCA+IHRoaXMuZHJvcHBlZFJvd0luZGV4KSA/IHRoaXMuZHJvcHBlZFJvd0luZGV4IDogKHRoaXMuZHJvcHBlZFJvd0luZGV4ID09PSAwKSA/IDAgOiB0aGlzLmRyb3BwZWRSb3dJbmRleCAtIDE7XG4gICAgICAgICAgICBPYmplY3RVdGlscy5yZW9yZGVyQXJyYXkodGhpcy52YWx1ZSwgdGhpcy5kcmFnZ2VkUm93SW5kZXgsIGRyb3BJbmRleCk7XG5cbiAgICAgICAgICAgIHRoaXMub25Sb3dSZW9yZGVyLmVtaXQoe1xuICAgICAgICAgICAgICAgIGRyYWdJbmRleDogdGhpcy5kcmFnZ2VkUm93SW5kZXgsXG4gICAgICAgICAgICAgICAgZHJvcEluZGV4OiBkcm9wSW5kZXhcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIC8vY2xlYW51cFxuICAgICAgICB0aGlzLm9uUm93RHJhZ0xlYXZlKGV2ZW50LCByb3dFbGVtZW50KTtcbiAgICAgICAgdGhpcy5vblJvd0RyYWdFbmQoZXZlbnQpO1xuICAgIH1cblxuICAgIGlzRW1wdHkoKSB7XG4gICAgICAgIGxldCBkYXRhID0gdGhpcy5maWx0ZXJlZFZhbHVlfHx0aGlzLnZhbHVlO1xuICAgICAgICByZXR1cm4gZGF0YSA9PSBudWxsIHx8IGRhdGEubGVuZ3RoID09IDA7XG4gICAgfVxuXG4gICAgZ2V0QmxvY2thYmxlRWxlbWVudCgpOiBIVE1MRWxlbWVudMKge1xuICAgICAgICByZXR1cm4gdGhpcy5lbC5uYXRpdmVFbGVtZW50LmNoaWxkcmVuWzBdO1xuICAgIH1cblxuICAgIGdldFN0b3JhZ2UoKSB7XG4gICAgICAgIHN3aXRjaCh0aGlzLnN0YXRlU3RvcmFnZSkge1xuICAgICAgICAgICAgY2FzZSAnbG9jYWwnOlxuICAgICAgICAgICAgICAgIHJldHVybiB3aW5kb3cubG9jYWxTdG9yYWdlO1xuXG4gICAgICAgICAgICBjYXNlICdzZXNzaW9uJzpcbiAgICAgICAgICAgICAgICByZXR1cm4gd2luZG93LnNlc3Npb25TdG9yYWdlO1xuXG4gICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcih0aGlzLnN0YXRlU3RvcmFnZSArICcgaXMgbm90IGEgdmFsaWQgdmFsdWUgZm9yIHRoZSBzdGF0ZSBzdG9yYWdlLCBzdXBwb3J0ZWQgdmFsdWVzIGFyZSBcImxvY2FsXCIgYW5kIFwic2Vzc2lvblwiLicpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgaXNTdGF0ZWZ1bCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuc3RhdGVLZXkgIT0gbnVsbDtcbiAgICB9XG5cbiAgICBzYXZlU3RhdGUoKSB7XG4gICAgICAgIGNvbnN0IHN0b3JhZ2UgPSB0aGlzLmdldFN0b3JhZ2UoKTtcbiAgICAgICAgbGV0IHN0YXRlOiBUYWJsZVN0YXRlID0ge307XG5cbiAgICAgICAgaWYgKHRoaXMucGFnaW5hdG9yKSB7XG4gICAgICAgICAgICBzdGF0ZS5maXJzdCA9IHRoaXMuZmlyc3Q7XG4gICAgICAgICAgICBzdGF0ZS5yb3dzID0gdGhpcy5yb3dzO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMuc29ydEZpZWxkKSB7XG4gICAgICAgICAgICBzdGF0ZS5zb3J0RmllbGQgPSB0aGlzLnNvcnRGaWVsZDtcbiAgICAgICAgICAgIHN0YXRlLnNvcnRPcmRlciA9IHRoaXMuc29ydE9yZGVyO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMubXVsdGlTb3J0TWV0YSkge1xuICAgICAgICAgICAgc3RhdGUubXVsdGlTb3J0TWV0YSA9IHRoaXMubXVsdGlTb3J0TWV0YTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLmhhc0ZpbHRlcigpKSB7XG4gICAgICAgICAgICBzdGF0ZS5maWx0ZXJzID0gdGhpcy5maWx0ZXJzO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMucmVzaXphYmxlQ29sdW1ucykge1xuICAgICAgICAgICAgdGhpcy5zYXZlQ29sdW1uV2lkdGhzKHN0YXRlKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLnJlb3JkZXJhYmxlQ29sdW1ucykge1xuICAgICAgICAgICAgdGhpcy5zYXZlQ29sdW1uT3JkZXIoc3RhdGUpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMuc2VsZWN0aW9uKSB7XG4gICAgICAgICAgICBzdGF0ZS5zZWxlY3Rpb24gPSB0aGlzLnNlbGVjdGlvbjtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChPYmplY3Qua2V5cyh0aGlzLmV4cGFuZGVkUm93S2V5cykubGVuZ3RoKSB7XG4gICAgICAgICAgICBzdGF0ZS5leHBhbmRlZFJvd0tleXMgPSB0aGlzLmV4cGFuZGVkUm93S2V5cztcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChPYmplY3Qua2V5cyhzdGF0ZSkubGVuZ3RoKSB7XG4gICAgICAgICAgICBzdG9yYWdlLnNldEl0ZW0odGhpcy5zdGF0ZUtleSwgSlNPTi5zdHJpbmdpZnkoc3RhdGUpKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMub25TdGF0ZVNhdmUuZW1pdChzdGF0ZSk7XG4gICAgfVxuXG4gICAgY2xlYXJTdGF0ZSgpIHtcbiAgICAgICAgY29uc3Qgc3RvcmFnZSA9IHRoaXMuZ2V0U3RvcmFnZSgpO1xuXG4gICAgICAgIGlmICh0aGlzLnN0YXRlS2V5KSB7XG4gICAgICAgICAgICBzdG9yYWdlLnJlbW92ZUl0ZW0odGhpcy5zdGF0ZUtleSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZXN0b3JlU3RhdGUoKSB7XG4gICAgICAgIGNvbnN0IHN0b3JhZ2UgPSB0aGlzLmdldFN0b3JhZ2UoKTtcbiAgICAgICAgY29uc3Qgc3RhdGVTdHJpbmcgPSBzdG9yYWdlLmdldEl0ZW0odGhpcy5zdGF0ZUtleSk7XG5cbiAgICAgICAgaWYgKHN0YXRlU3RyaW5nKSB7XG4gICAgICAgICAgICBsZXQgc3RhdGU6IFRhYmxlU3RhdGUgPSBKU09OLnBhcnNlKHN0YXRlU3RyaW5nKTtcblxuICAgICAgICAgICAgaWYgKHRoaXMucGFnaW5hdG9yKSB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuZmlyc3QgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmZpcnN0ID0gc3RhdGUuZmlyc3Q7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZmlyc3RDaGFuZ2UuZW1pdCh0aGlzLmZpcnN0KTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBpZiAodGhpcy5yb3dzICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5yb3dzID0gc3RhdGUucm93cztcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5yb3dzQ2hhbmdlLmVtaXQodGhpcy5yb3dzKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChzdGF0ZS5zb3J0RmllbGQpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnJlc3RvcmluZ1NvcnQgPSB0cnVlO1xuICAgICAgICAgICAgICAgIHRoaXMuX3NvcnRGaWVsZCA9IHN0YXRlLnNvcnRGaWVsZDtcbiAgICAgICAgICAgICAgICB0aGlzLl9zb3J0T3JkZXIgPSBzdGF0ZS5zb3J0T3JkZXI7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChzdGF0ZS5tdWx0aVNvcnRNZXRhKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5yZXN0b3JpbmdTb3J0ID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB0aGlzLl9tdWx0aVNvcnRNZXRhID0gc3RhdGUubXVsdGlTb3J0TWV0YTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKHN0YXRlLmZpbHRlcnMpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnJlc3RvcmluZ0ZpbHRlciA9IHRydWU7XG4gICAgICAgICAgICAgICAgdGhpcy5maWx0ZXJzID0gc3RhdGUuZmlsdGVycztcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKHRoaXMucmVzaXphYmxlQ29sdW1ucykge1xuICAgICAgICAgICAgICAgIHRoaXMuY29sdW1uV2lkdGhzU3RhdGUgPSBzdGF0ZS5jb2x1bW5XaWR0aHM7XG4gICAgICAgICAgICAgICAgdGhpcy50YWJsZVdpZHRoU3RhdGUgPSBzdGF0ZS50YWJsZVdpZHRoO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoc3RhdGUuZXhwYW5kZWRSb3dLZXlzKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5leHBhbmRlZFJvd0tleXMgPSBzdGF0ZS5leHBhbmRlZFJvd0tleXM7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChzdGF0ZS5zZWxlY3Rpb24pIHtcbiAgICAgICAgICAgICAgICBQcm9taXNlLnJlc29sdmUobnVsbCkudGhlbigoKSA9PiB0aGlzLnNlbGVjdGlvbkNoYW5nZS5lbWl0KHN0YXRlLnNlbGVjdGlvbikpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB0aGlzLnN0YXRlUmVzdG9yZWQgPSB0cnVlO1xuXG4gICAgICAgICAgICB0aGlzLm9uU3RhdGVSZXN0b3JlLmVtaXQoc3RhdGUpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgc2F2ZUNvbHVtbldpZHRocyhzdGF0ZSkge1xuICAgICAgICBsZXQgd2lkdGhzID0gW107XG4gICAgICAgIGxldCBoZWFkZXJzID0gRG9tSGFuZGxlci5maW5kKHRoaXMuY29udGFpbmVyVmlld0NoaWxkLm5hdGl2ZUVsZW1lbnQsICcucC1kYXRhdGFibGUtdGhlYWQgPiB0cjpmaXJzdC1jaGlsZCA+IHRoJyk7XG4gICAgICAgIGhlYWRlcnMubWFwKGhlYWRlciA9PiB3aWR0aHMucHVzaChEb21IYW5kbGVyLmdldE91dGVyV2lkdGgoaGVhZGVyKSkpO1xuICAgICAgICBzdGF0ZS5jb2x1bW5XaWR0aHMgPSB3aWR0aHMuam9pbignLCcpO1xuXG4gICAgICAgIGlmICh0aGlzLmNvbHVtblJlc2l6ZU1vZGUgPT09ICdleHBhbmQnKSB7XG4gICAgICAgICAgICBzdGF0ZS50YWJsZVdpZHRoID0gdGhpcy5zY3JvbGxhYmxlID8gRG9tSGFuZGxlci5maW5kU2luZ2xlKHRoaXMuY29udGFpbmVyVmlld0NoaWxkLm5hdGl2ZUVsZW1lbnQsICcucC1kYXRhdGFibGUtc2Nyb2xsYWJsZS1oZWFkZXItdGFibGUnKS5zdHlsZS53aWR0aCA6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBEb21IYW5kbGVyLmdldE91dGVyV2lkdGgodGhpcy50YWJsZVZpZXdDaGlsZC5uYXRpdmVFbGVtZW50KSArICdweCc7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZXN0b3JlQ29sdW1uV2lkdGhzKCkge1xuICAgICAgICBpZiAodGhpcy5jb2x1bW5XaWR0aHNTdGF0ZSkge1xuICAgICAgICAgICAgbGV0IHdpZHRocyA9IHRoaXMuY29sdW1uV2lkdGhzU3RhdGUuc3BsaXQoJywnKTtcblxuICAgICAgICAgICAgaWYgKHRoaXMuY29sdW1uUmVzaXplTW9kZSA9PT0gJ2V4cGFuZCcgJiYgdGhpcy50YWJsZVdpZHRoU3RhdGUpIHtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5zY3JvbGxhYmxlKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0U2Nyb2xsYWJsZUl0ZW1zV2lkdGhPbkV4cGFuZFJlc2l6ZShudWxsLCB0aGlzLnRhYmxlV2lkdGhTdGF0ZSwgMCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnRhYmxlVmlld0NoaWxkLm5hdGl2ZUVsZW1lbnQuc3R5bGUud2lkdGggPSB0aGlzLnRhYmxlV2lkdGhTdGF0ZTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jb250YWluZXJWaWV3Q2hpbGQubmF0aXZlRWxlbWVudC5zdHlsZS53aWR0aCA9IHRoaXMudGFibGVXaWR0aFN0YXRlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKHRoaXMuc2Nyb2xsYWJsZSkge1xuICAgICAgICAgICAgICAgIGxldCBoZWFkZXJDb2xzID0gRG9tSGFuZGxlci5maW5kKHRoaXMuY29udGFpbmVyVmlld0NoaWxkLm5hdGl2ZUVsZW1lbnQsICcucC1kYXRhdGFibGUtc2Nyb2xsYWJsZS1oZWFkZXItdGFibGUgPiBjb2xncm91cCA+IGNvbCcpO1xuICAgICAgICAgICAgICAgIGxldCBib2R5Q29scyA9IHRoaXMudmlydHVhbFNjcm9sbCA/IERvbUhhbmRsZXIuZmluZCh0aGlzLmNvbnRhaW5lclZpZXdDaGlsZC5uYXRpdmVFbGVtZW50LCAnY2RrLXZpcnR1YWwtc2Nyb2xsLXZpZXdwb3J0IHRhYmxlID4gY29sZ3JvdXAgPiBjb2wnKSA6IERvbUhhbmRsZXIuZmluZCh0aGlzLmNvbnRhaW5lclZpZXdDaGlsZC5uYXRpdmVFbGVtZW50LCAnLnAtZGF0YXRhYmxlLXNjcm9sbGFibGUtYm9keSB0YWJsZSA+IGNvbGdyb3VwID4gY29sJyk7XG5cbiAgICAgICAgICAgICAgICBoZWFkZXJDb2xzLm1hcCgoY29sLCBpbmRleCkgPT4gY29sLnN0eWxlLndpZHRoID0gd2lkdGhzW2luZGV4XSArICdweCcpO1xuICAgICAgICAgICAgICAgIGJvZHlDb2xzLm1hcCgoY29sLCBpbmRleCkgPT4gY29sLnN0eWxlLndpZHRoID0gd2lkdGhzW2luZGV4XSArICdweCcpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgbGV0IGhlYWRlcnMgPSBEb21IYW5kbGVyLmZpbmQodGhpcy50YWJsZVZpZXdDaGlsZC5uYXRpdmVFbGVtZW50LCAnLnAtZGF0YXRhYmxlLXRoZWFkID4gdHI6Zmlyc3QtY2hpbGQgPiB0aCcpO1xuICAgICAgICAgICAgICAgIGhlYWRlcnMubWFwKChoZWFkZXIsIGluZGV4KSA9PiBoZWFkZXIuc3R5bGUud2lkdGggPSB3aWR0aHNbaW5kZXhdICsgJ3B4Jyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBzYXZlQ29sdW1uT3JkZXIoc3RhdGUpIHtcbiAgICAgICAgaWYgKHRoaXMuY29sdW1ucykge1xuICAgICAgICAgICAgbGV0IGNvbHVtbk9yZGVyOiBzdHJpbmdbXSA9IFtdO1xuICAgICAgICAgICAgdGhpcy5jb2x1bW5zLm1hcChjb2x1bW4gPT4ge1xuICAgICAgICAgICAgICAgIGNvbHVtbk9yZGVyLnB1c2goY29sdW1uLmZpZWxkfHxjb2x1bW4ua2V5KVxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIHN0YXRlLmNvbHVtbk9yZGVyID0gY29sdW1uT3JkZXI7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZXN0b3JlQ29sdW1uT3JkZXIoKSB7XG4gICAgICAgIGNvbnN0IHN0b3JhZ2UgPSB0aGlzLmdldFN0b3JhZ2UoKTtcbiAgICAgICAgY29uc3Qgc3RhdGVTdHJpbmcgPSBzdG9yYWdlLmdldEl0ZW0odGhpcy5zdGF0ZUtleSk7XG4gICAgICAgIGlmIChzdGF0ZVN0cmluZykge1xuICAgICAgICAgICAgbGV0IHN0YXRlOiBUYWJsZVN0YXRlID0gSlNPTi5wYXJzZShzdGF0ZVN0cmluZyk7XG4gICAgICAgICAgICBsZXQgY29sdW1uT3JkZXIgPSBzdGF0ZS5jb2x1bW5PcmRlcjtcbiAgICAgICAgICAgIGlmIChjb2x1bW5PcmRlcikge1xuICAgICAgICAgICAgICAgIGxldCByZW9yZGVyZWRDb2x1bW5zID0gW107XG5cbiAgICAgICAgICAgICAgICBjb2x1bW5PcmRlci5tYXAoa2V5ID0+ICB7XG4gICAgICAgICAgICAgICAgICAgIGxldCBjb2wgPSB0aGlzLmZpbmRDb2x1bW5CeUtleShrZXkpO1xuICAgICAgICAgICAgICAgICAgICBpZiAoY29sKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZW9yZGVyZWRDb2x1bW5zLnB1c2goY29sKVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgdGhpcy5jb2x1bW5PcmRlclN0YXRlUmVzdG9yZWQgPSB0cnVlO1xuICAgICAgICAgICAgICAgIHRoaXMuY29sdW1ucyA9IHJlb3JkZXJlZENvbHVtbnM7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBmaW5kQ29sdW1uQnlLZXkoa2V5KSB7XG4gICAgICAgIGlmICh0aGlzLmNvbHVtbnMpIHtcbiAgICAgICAgICAgIGZvciAobGV0IGNvbCBvZiB0aGlzLmNvbHVtbnMpIHtcbiAgICAgICAgICAgICAgICBpZiAoY29sLmtleSA9PT0ga2V5IHx8IGNvbC5maWVsZCA9PT0ga2V5KVxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gY29sO1xuICAgICAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIG5nT25EZXN0cm95KCkge1xuICAgICAgICB0aGlzLnVuYmluZERvY3VtZW50RWRpdExpc3RlbmVyKCk7XG4gICAgICAgIHRoaXMuZWRpdGluZ0NlbGwgPSBudWxsO1xuICAgICAgICB0aGlzLmluaXRpYWxpemVkID0gbnVsbDtcbiAgICB9XG59XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAnW3BUYWJsZUJvZHldJyxcbiAgICB0ZW1wbGF0ZTogYFxuICAgICAgICA8bmctY29udGFpbmVyICpuZ0lmPVwiIWR0LmV4cGFuZGVkUm93VGVtcGxhdGUgJiYgIWR0LnZpcnR1YWxTY3JvbGxcIj5cbiAgICAgICAgICAgIDxuZy10ZW1wbGF0ZSBuZ0ZvciBsZXQtcm93RGF0YSBsZXQtcm93SW5kZXg9XCJpbmRleFwiIFtuZ0Zvck9mXT1cIihkdC5wYWdpbmF0b3IgJiYgIWR0LmxhenkpID8gKChkdC5maWx0ZXJlZFZhbHVlfHxkdC52YWx1ZSkgfCBzbGljZTpkdC5maXJzdDooZHQuZmlyc3QgKyBkdC5yb3dzKSkgOiAoZHQuZmlsdGVyZWRWYWx1ZXx8ZHQudmFsdWUpXCIgW25nRm9yVHJhY2tCeV09XCJkdC5yb3dUcmFja0J5XCI+XG4gICAgICAgICAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdUZW1wbGF0ZU91dGxldD1cInRlbXBsYXRlOyBjb250ZXh0OiB7JGltcGxpY2l0OiByb3dEYXRhLCByb3dJbmRleDogZHQucGFnaW5hdG9yID8gKGR0LmZpcnN0ICsgcm93SW5kZXgpIDogcm93SW5kZXgsIGNvbHVtbnM6IGNvbHVtbnMsIGVkaXRpbmc6IChkdC5lZGl0TW9kZSA9PT0gJ3JvdycgJiYgZHQuaXNSb3dFZGl0aW5nKHJvd0RhdGEpKX1cIj48L25nLWNvbnRhaW5lcj5cbiAgICAgICAgICAgIDwvbmctdGVtcGxhdGU+XG4gICAgICAgIDwvbmctY29udGFpbmVyPlxuICAgICAgICA8bmctY29udGFpbmVyICpuZ0lmPVwiIWR0LmV4cGFuZGVkUm93VGVtcGxhdGUgJiYgZHQudmlydHVhbFNjcm9sbFwiPlxuICAgICAgICAgICAgPG5nLXRlbXBsYXRlIGNka1ZpcnR1YWxGb3IgbGV0LXJvd0RhdGEgbGV0LXJvd0luZGV4PVwiaW5kZXhcIiBbY2RrVmlydHVhbEZvck9mXT1cImR0LmZpbHRlcmVkVmFsdWV8fGR0LnZhbHVlXCIgW2Nka1ZpcnR1YWxGb3JUcmFja0J5XT1cImR0LnJvd1RyYWNrQnlcIiBbY2RrVmlydHVhbEZvclRlbXBsYXRlQ2FjaGVTaXplXT1cIjBcIj5cbiAgICAgICAgICAgICAgICA8bmctY29udGFpbmVyICpuZ1RlbXBsYXRlT3V0bGV0PVwicm93RGF0YSA/IHRlbXBsYXRlOiBkdC5sb2FkaW5nQm9keVRlbXBsYXRlOyBjb250ZXh0OiB7JGltcGxpY2l0OiByb3dEYXRhLCByb3dJbmRleDogZHQucGFnaW5hdG9yID8gKGR0LmZpcnN0ICsgcm93SW5kZXgpIDogcm93SW5kZXgsIGNvbHVtbnM6IGNvbHVtbnMsIGVkaXRpbmc6IChkdC5lZGl0TW9kZSA9PT0gJ3JvdycgJiYgZHQuaXNSb3dFZGl0aW5nKHJvd0RhdGEpKX1cIj48L25nLWNvbnRhaW5lcj5cbiAgICAgICAgICAgIDwvbmctdGVtcGxhdGU+XG4gICAgICAgIDwvbmctY29udGFpbmVyPlxuICAgICAgICA8bmctY29udGFpbmVyICpuZ0lmPVwiZHQuZXhwYW5kZWRSb3dUZW1wbGF0ZSAmJiAhKGZyb3plbiAmJiBkdC5mcm96ZW5FeHBhbmRlZFJvd1RlbXBsYXRlKVwiPlxuICAgICAgICAgICAgPG5nLXRlbXBsYXRlIG5nRm9yIGxldC1yb3dEYXRhIGxldC1yb3dJbmRleD1cImluZGV4XCIgW25nRm9yT2ZdPVwiKGR0LnBhZ2luYXRvciAmJiAhZHQubGF6eSkgPyAoKGR0LmZpbHRlcmVkVmFsdWV8fGR0LnZhbHVlKSB8IHNsaWNlOmR0LmZpcnN0OihkdC5maXJzdCArIGR0LnJvd3MpKSA6IChkdC5maWx0ZXJlZFZhbHVlfHxkdC52YWx1ZSlcIiBbbmdGb3JUcmFja0J5XT1cImR0LnJvd1RyYWNrQnlcIj5cbiAgICAgICAgICAgICAgICA8bmctY29udGFpbmVyICpuZ1RlbXBsYXRlT3V0bGV0PVwidGVtcGxhdGU7IGNvbnRleHQ6IHskaW1wbGljaXQ6IHJvd0RhdGEsIHJvd0luZGV4OiBkdC5wYWdpbmF0b3IgPyAoZHQuZmlyc3QgKyByb3dJbmRleCkgOiByb3dJbmRleCwgY29sdW1uczogY29sdW1ucywgZXhwYW5kZWQ6IGR0LmlzUm93RXhwYW5kZWQocm93RGF0YSksIGVkaXRpbmc6IChkdC5lZGl0TW9kZSA9PT0gJ3JvdycgJiYgZHQuaXNSb3dFZGl0aW5nKHJvd0RhdGEpKX1cIj48L25nLWNvbnRhaW5lcj5cbiAgICAgICAgICAgICAgICA8bmctY29udGFpbmVyICpuZ0lmPVwiZHQuaXNSb3dFeHBhbmRlZChyb3dEYXRhKVwiPlxuICAgICAgICAgICAgICAgICAgICA8bmctY29udGFpbmVyICpuZ1RlbXBsYXRlT3V0bGV0PVwiZHQuZXhwYW5kZWRSb3dUZW1wbGF0ZTsgY29udGV4dDogeyRpbXBsaWNpdDogcm93RGF0YSwgcm93SW5kZXg6IGR0LnBhZ2luYXRvciA/IChkdC5maXJzdCArIHJvd0luZGV4KSA6IHJvd0luZGV4LCBjb2x1bW5zOiBjb2x1bW5zfVwiPjwvbmctY29udGFpbmVyPlxuICAgICAgICAgICAgICAgIDwvbmctY29udGFpbmVyPlxuICAgICAgICAgICAgPC9uZy10ZW1wbGF0ZT5cbiAgICAgICAgPC9uZy1jb250YWluZXI+XG4gICAgICAgIDxuZy1jb250YWluZXIgKm5nSWY9XCJkdC5mcm96ZW5FeHBhbmRlZFJvd1RlbXBsYXRlICYmIGZyb3plblwiPlxuICAgICAgICAgICAgPG5nLXRlbXBsYXRlIG5nRm9yIGxldC1yb3dEYXRhIGxldC1yb3dJbmRleD1cImluZGV4XCIgW25nRm9yT2ZdPVwiKGR0LnBhZ2luYXRvciAmJiAhZHQubGF6eSkgPyAoKGR0LmZpbHRlcmVkVmFsdWV8fGR0LnZhbHVlKSB8IHNsaWNlOmR0LmZpcnN0OihkdC5maXJzdCArIGR0LnJvd3MpKSA6IChkdC5maWx0ZXJlZFZhbHVlfHxkdC52YWx1ZSlcIiBbbmdGb3JUcmFja0J5XT1cImR0LnJvd1RyYWNrQnlcIj5cbiAgICAgICAgICAgICAgICA8bmctY29udGFpbmVyICpuZ1RlbXBsYXRlT3V0bGV0PVwidGVtcGxhdGU7IGNvbnRleHQ6IHskaW1wbGljaXQ6IHJvd0RhdGEsIHJvd0luZGV4OiBkdC5wYWdpbmF0b3IgPyAoZHQuZmlyc3QgKyByb3dJbmRleCkgOiByb3dJbmRleCwgY29sdW1uczogY29sdW1ucywgZXhwYW5kZWQ6IGR0LmlzUm93RXhwYW5kZWQocm93RGF0YSksIGVkaXRpbmc6IChkdC5lZGl0TW9kZSA9PT0gJ3JvdycgJiYgZHQuaXNSb3dFZGl0aW5nKHJvd0RhdGEpKX1cIj48L25nLWNvbnRhaW5lcj5cbiAgICAgICAgICAgICAgICA8bmctY29udGFpbmVyICpuZ0lmPVwiZHQuaXNSb3dFeHBhbmRlZChyb3dEYXRhKVwiPlxuICAgICAgICAgICAgICAgICAgICA8bmctY29udGFpbmVyICpuZ1RlbXBsYXRlT3V0bGV0PVwiZHQuZnJvemVuRXhwYW5kZWRSb3dUZW1wbGF0ZTsgY29udGV4dDogeyRpbXBsaWNpdDogcm93RGF0YSwgcm93SW5kZXg6IGR0LnBhZ2luYXRvciA/IChkdC5maXJzdCArIHJvd0luZGV4KSA6IHJvd0luZGV4LCBjb2x1bW5zOiBjb2x1bW5zfVwiPjwvbmctY29udGFpbmVyPlxuICAgICAgICAgICAgICAgIDwvbmctY29udGFpbmVyPlxuICAgICAgICAgICAgPC9uZy10ZW1wbGF0ZT5cbiAgICAgICAgPC9uZy1jb250YWluZXI+XG4gICAgICAgIDxuZy1jb250YWluZXIgKm5nSWY9XCJkdC5sb2FkaW5nXCI+XG4gICAgICAgICAgICA8bmctY29udGFpbmVyICpuZ1RlbXBsYXRlT3V0bGV0PVwiZHQubG9hZGluZ0JvZHlUZW1wbGF0ZTsgY29udGV4dDogeyRpbXBsaWNpdDogY29sdW1ucywgZnJvemVuOiBmcm96ZW59XCI+PC9uZy1jb250YWluZXI+XG4gICAgICAgIDwvbmctY29udGFpbmVyPlxuICAgICAgICA8bmctY29udGFpbmVyICpuZ0lmPVwiZHQuaXNFbXB0eSgpICYmICFkdC5sb2FkaW5nXCI+XG4gICAgICAgICAgICA8bmctY29udGFpbmVyICpuZ1RlbXBsYXRlT3V0bGV0PVwiZHQuZW1wdHlNZXNzYWdlVGVtcGxhdGU7IGNvbnRleHQ6IHskaW1wbGljaXQ6IGNvbHVtbnMsIGZyb3plbjogZnJvemVufVwiPjwvbmctY29udGFpbmVyPlxuICAgICAgICA8L25nLWNvbnRhaW5lcj5cbiAgICBgLFxuICAgIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuRGVmYXVsdCxcbiAgICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lXG59KVxuZXhwb3J0IGNsYXNzIFRhYmxlQm9keSBpbXBsZW1lbnRzIE9uRGVzdHJveSB7XG5cbiAgICBASW5wdXQoXCJwVGFibGVCb2R5XCIpIGNvbHVtbnM6IGFueVtdO1xuXG4gICAgQElucHV0KFwicFRhYmxlQm9keVRlbXBsYXRlXCIpIHRlbXBsYXRlOiBUZW1wbGF0ZVJlZjxhbnk+O1xuXG4gICAgQElucHV0KCkgZnJvemVuOiBib29sZWFuO1xuXG4gICAgc3Vic2NyaXB0aW9uOiBTdWJzY3JpcHRpb247XG5cbiAgICBjb25zdHJ1Y3RvcihwdWJsaWMgZHQ6IFRhYmxlLCBwdWJsaWMgdGFibGVTZXJ2aWNlOiBUYWJsZVNlcnZpY2UsIHB1YmxpYyBjZDogQ2hhbmdlRGV0ZWN0b3JSZWYpIHtcbiAgICAgICAgdGhpcy5zdWJzY3JpcHRpb24gPSB0aGlzLmR0LnRhYmxlU2VydmljZS52YWx1ZVNvdXJjZSQuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgICAgICAgIGlmICh0aGlzLmR0LnZpcnR1YWxTY3JvbGwpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmNkLmRldGVjdENoYW5nZXMoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgbmdPbkRlc3Ryb3koKSB7XG4gICAgICAgIGlmICh0aGlzLnN1YnNjcmlwdGlvbikge1xuICAgICAgICAgICAgdGhpcy5zdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcbiAgICAgICAgfVxuICAgIH1cbn1cblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICdbcFNjcm9sbGFibGVWaWV3XScsXG4gICAgdGVtcGxhdGU6IGBcbiAgICAgICAgPGRpdiAjc2Nyb2xsSGVhZGVyIGNsYXNzPVwicC1kYXRhdGFibGUtc2Nyb2xsYWJsZS1oZWFkZXJcIj5cbiAgICAgICAgICAgIDxkaXYgI3Njcm9sbEhlYWRlckJveCBjbGFzcz1cInAtZGF0YXRhYmxlLXNjcm9sbGFibGUtaGVhZGVyLWJveFwiPlxuICAgICAgICAgICAgICAgIDx0YWJsZSBjbGFzcz1cInAtZGF0YXRhYmxlLXNjcm9sbGFibGUtaGVhZGVyLXRhYmxlXCIgW25nQ2xhc3NdPVwiZHQudGFibGVTdHlsZUNsYXNzXCIgW25nU3R5bGVdPVwiZHQudGFibGVTdHlsZVwiPlxuICAgICAgICAgICAgICAgICAgICA8bmctY29udGFpbmVyICpuZ1RlbXBsYXRlT3V0bGV0PVwiZnJvemVuID8gZHQuZnJvemVuQ29sR3JvdXBUZW1wbGF0ZXx8ZHQuY29sR3JvdXBUZW1wbGF0ZSA6IGR0LmNvbEdyb3VwVGVtcGxhdGU7IGNvbnRleHQgeyRpbXBsaWNpdDogY29sdW1uc31cIj48L25nLWNvbnRhaW5lcj5cbiAgICAgICAgICAgICAgICAgICAgPHRoZWFkIGNsYXNzPVwicC1kYXRhdGFibGUtdGhlYWRcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxuZy1jb250YWluZXIgKm5nVGVtcGxhdGVPdXRsZXQ9XCJmcm96ZW4gPyBkdC5mcm96ZW5IZWFkZXJUZW1wbGF0ZXx8ZHQuaGVhZGVyVGVtcGxhdGUgOiBkdC5oZWFkZXJUZW1wbGF0ZTsgY29udGV4dCB7JGltcGxpY2l0OiBjb2x1bW5zfVwiPjwvbmctY29udGFpbmVyPlxuICAgICAgICAgICAgICAgICAgICA8L3RoZWFkPlxuICAgICAgICAgICAgICAgICAgICA8dGJvZHkgY2xhc3M9XCJwLWRhdGF0YWJsZS10Ym9keVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPG5nLXRlbXBsYXRlIG5nRm9yIGxldC1yb3dEYXRhIGxldC1yb3dJbmRleD1cImluZGV4XCIgW25nRm9yT2ZdPVwiZHQuZnJvemVuVmFsdWVcIiBbbmdGb3JUcmFja0J5XT1cImR0LnJvd1RyYWNrQnlcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8bmctY29udGFpbmVyICpuZ1RlbXBsYXRlT3V0bGV0PVwiZHQuZnJvemVuUm93c1RlbXBsYXRlOyBjb250ZXh0OiB7JGltcGxpY2l0OiByb3dEYXRhLCByb3dJbmRleDogcm93SW5kZXgsIGNvbHVtbnM6IGNvbHVtbnN9XCI+PC9uZy1jb250YWluZXI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L25nLXRlbXBsYXRlPlxuICAgICAgICAgICAgICAgICAgICA8L3Rib2R5PlxuICAgICAgICAgICAgICAgIDwvdGFibGU+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDxuZy1jb250YWluZXIgKm5nSWY9XCIhZHQudmlydHVhbFNjcm9sbDsgZWxzZSB2aXJ0dWFsU2Nyb2xsVGVtcGxhdGVcIj5cbiAgICAgICAgICAgIDxkaXYgI3Njcm9sbEJvZHkgY2xhc3M9XCJwLWRhdGF0YWJsZS1zY3JvbGxhYmxlLWJvZHlcIiBbbmdTdHlsZV09XCJ7J21heC1oZWlnaHQnOiBkdC5zY3JvbGxIZWlnaHQgIT09ICdmbGV4JyA/IHNjcm9sbEhlaWdodCA6IHVuZGVmaW5lZCwgJ292ZXJmbG93LXknOiAhZnJvemVuICYmIGR0LnNjcm9sbEhlaWdodCA/ICdzY3JvbGwnIDogdW5kZWZpbmVkfVwiPlxuICAgICAgICAgICAgICAgIDx0YWJsZSAjc2Nyb2xsVGFibGUgW2NsYXNzXT1cImR0LnRhYmxlU3R5bGVDbGFzc1wiIFtuZ1N0eWxlXT1cImR0LnRhYmxlU3R5bGVcIj5cbiAgICAgICAgICAgICAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdUZW1wbGF0ZU91dGxldD1cImZyb3plbiA/IGR0LmZyb3plbkNvbEdyb3VwVGVtcGxhdGV8fGR0LmNvbEdyb3VwVGVtcGxhdGUgOiBkdC5jb2xHcm91cFRlbXBsYXRlOyBjb250ZXh0IHskaW1wbGljaXQ6IGNvbHVtbnN9XCI+PC9uZy1jb250YWluZXI+XG4gICAgICAgICAgICAgICAgICAgIDx0Ym9keSBjbGFzcz1cInAtZGF0YXRhYmxlLXRib2R5XCIgW3BUYWJsZUJvZHldPVwiY29sdW1uc1wiIFtwVGFibGVCb2R5VGVtcGxhdGVdPVwiZnJvemVuID8gZHQuZnJvemVuQm9keVRlbXBsYXRlfHxkdC5ib2R5VGVtcGxhdGUgOiBkdC5ib2R5VGVtcGxhdGVcIiBbZnJvemVuXT1cImZyb3plblwiPjwvdGJvZHk+XG4gICAgICAgICAgICAgICAgPC90YWJsZT5cbiAgICAgICAgICAgICAgICA8ZGl2ICNzY3JvbGxhYmxlQWxpZ25lciBzdHlsZT1cImJhY2tncm91bmQtY29sb3I6dHJhbnNwYXJlbnRcIiAqbmdJZj1cImZyb3plblwiPjwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvbmctY29udGFpbmVyPlxuICAgICAgICA8bmctdGVtcGxhdGUgI3ZpcnR1YWxTY3JvbGxUZW1wbGF0ZT5cbiAgICAgICAgICAgIDxjZGstdmlydHVhbC1zY3JvbGwtdmlld3BvcnQgW2l0ZW1TaXplXT1cImR0LnZpcnR1YWxSb3dIZWlnaHRcIiB0YWJpbmRleD1cIjBcIiBbc3R5bGUuaGVpZ2h0XT1cImR0LnNjcm9sbEhlaWdodCAhPT0gJ2ZsZXgnID8gc2Nyb2xsSGVpZ2h0IDogdW5kZWZpbmVkXCJcbiAgICAgICAgICAgICAgICAgICAgW21pbkJ1ZmZlclB4XT1cImR0Lm1pbkJ1ZmZlclB4XCIgW21heEJ1ZmZlclB4XT1cImR0Lm1heEJ1ZmZlclB4XCIgKHNjcm9sbGVkSW5kZXhDaGFuZ2UpPVwib25TY3JvbGxJbmRleENoYW5nZSgkZXZlbnQpXCIgY2xhc3M9XCJwLWRhdGF0YWJsZS12aXJ0dWFsLXNjcm9sbGFibGUtYm9keVwiPlxuICAgICAgICAgICAgICAgIDx0YWJsZSAjc2Nyb2xsVGFibGUgW2NsYXNzXT1cImR0LnRhYmxlU3R5bGVDbGFzc1wiIFtuZ1N0eWxlXT1cImR0LnRhYmxlU3R5bGVcIj5cbiAgICAgICAgICAgICAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdUZW1wbGF0ZU91dGxldD1cImZyb3plbiA/IGR0LmZyb3plbkNvbEdyb3VwVGVtcGxhdGV8fGR0LmNvbEdyb3VwVGVtcGxhdGUgOiBkdC5jb2xHcm91cFRlbXBsYXRlOyBjb250ZXh0IHskaW1wbGljaXQ6IGNvbHVtbnN9XCI+PC9uZy1jb250YWluZXI+XG4gICAgICAgICAgICAgICAgICAgIDx0Ym9keSBjbGFzcz1cInAtZGF0YXRhYmxlLXRib2R5XCIgW3BUYWJsZUJvZHldPVwiY29sdW1uc1wiIFtwVGFibGVCb2R5VGVtcGxhdGVdPVwiZnJvemVuID8gZHQuZnJvemVuQm9keVRlbXBsYXRlfHxkdC5ib2R5VGVtcGxhdGUgOiBkdC5ib2R5VGVtcGxhdGVcIiBbZnJvemVuXT1cImZyb3plblwiPjwvdGJvZHk+XG4gICAgICAgICAgICAgICAgPC90YWJsZT5cbiAgICAgICAgICAgICAgICA8ZGl2ICNzY3JvbGxhYmxlQWxpZ25lciBzdHlsZT1cImJhY2tncm91bmQtY29sb3I6dHJhbnNwYXJlbnRcIiAqbmdJZj1cImZyb3plblwiPjwvZGl2PlxuICAgICAgICAgICAgPC9jZGstdmlydHVhbC1zY3JvbGwtdmlld3BvcnQ+XG4gICAgICAgIDwvbmctdGVtcGxhdGU+XG4gICAgICAgIDxkaXYgI3Njcm9sbEZvb3RlciBjbGFzcz1cInAtZGF0YXRhYmxlLXNjcm9sbGFibGUtZm9vdGVyXCI+XG4gICAgICAgICAgICA8ZGl2ICNzY3JvbGxGb290ZXJCb3ggY2xhc3M9XCJwLWRhdGF0YWJsZS1zY3JvbGxhYmxlLWZvb3Rlci1ib3hcIj5cbiAgICAgICAgICAgICAgICA8dGFibGUgY2xhc3M9XCJwLWRhdGF0YWJsZS1zY3JvbGxhYmxlLWZvb3Rlci10YWJsZVwiIFtuZ0NsYXNzXT1cImR0LnRhYmxlU3R5bGVDbGFzc1wiIFtuZ1N0eWxlXT1cImR0LnRhYmxlU3R5bGVcIj5cbiAgICAgICAgICAgICAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdUZW1wbGF0ZU91dGxldD1cImZyb3plbiA/IGR0LmZyb3plbkNvbEdyb3VwVGVtcGxhdGV8fGR0LmNvbEdyb3VwVGVtcGxhdGUgOiBkdC5jb2xHcm91cFRlbXBsYXRlOyBjb250ZXh0IHskaW1wbGljaXQ6IGNvbHVtbnN9XCI+PC9uZy1jb250YWluZXI+XG4gICAgICAgICAgICAgICAgICAgIDx0Zm9vdCBjbGFzcz1cInAtZGF0YXRhYmxlLXRmb290XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8bmctY29udGFpbmVyICpuZ1RlbXBsYXRlT3V0bGV0PVwiZnJvemVuID8gZHQuZnJvemVuRm9vdGVyVGVtcGxhdGV8fGR0LmZvb3RlclRlbXBsYXRlIDogZHQuZm9vdGVyVGVtcGxhdGU7IGNvbnRleHQgeyRpbXBsaWNpdDogY29sdW1uc31cIj48L25nLWNvbnRhaW5lcj5cbiAgICAgICAgICAgICAgICAgICAgPC90Zm9vdD5cbiAgICAgICAgICAgICAgICA8L3RhYmxlPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgIGAsXG4gICAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5EZWZhdWx0LFxuICAgIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmVcbn0pXG5leHBvcnQgY2xhc3MgU2Nyb2xsYWJsZVZpZXcgaW1wbGVtZW50cyBBZnRlclZpZXdJbml0LE9uRGVzdHJveSB7XG5cbiAgICBASW5wdXQoXCJwU2Nyb2xsYWJsZVZpZXdcIikgY29sdW1uczogYW55W107XG5cbiAgICBASW5wdXQoKSBmcm96ZW46IGJvb2xlYW47XG5cbiAgICBAVmlld0NoaWxkKCdzY3JvbGxIZWFkZXInKSBzY3JvbGxIZWFkZXJWaWV3Q2hpbGQ6IEVsZW1lbnRSZWY7XG5cbiAgICBAVmlld0NoaWxkKCdzY3JvbGxIZWFkZXJCb3gnKSBzY3JvbGxIZWFkZXJCb3hWaWV3Q2hpbGQ6IEVsZW1lbnRSZWY7XG5cbiAgICBAVmlld0NoaWxkKCdzY3JvbGxCb2R5Jykgc2Nyb2xsQm9keVZpZXdDaGlsZDogRWxlbWVudFJlZjtcblxuICAgIEBWaWV3Q2hpbGQoJ3Njcm9sbFRhYmxlJykgc2Nyb2xsVGFibGVWaWV3Q2hpbGQ6IEVsZW1lbnRSZWY7XG5cbiAgICBAVmlld0NoaWxkKCdzY3JvbGxGb290ZXInKSBzY3JvbGxGb290ZXJWaWV3Q2hpbGQ6IEVsZW1lbnRSZWY7XG5cbiAgICBAVmlld0NoaWxkKCdzY3JvbGxGb290ZXJCb3gnKSBzY3JvbGxGb290ZXJCb3hWaWV3Q2hpbGQ6IEVsZW1lbnRSZWY7XG5cbiAgICBAVmlld0NoaWxkKCdzY3JvbGxhYmxlQWxpZ25lcicpIHNjcm9sbGFibGVBbGlnbmVyVmlld0NoaWxkOiBFbGVtZW50UmVmO1xuXG4gICAgQFZpZXdDaGlsZChDZGtWaXJ0dWFsU2Nyb2xsVmlld3BvcnQpIHZpcnR1YWxTY3JvbGxCb2R5OiBDZGtWaXJ0dWFsU2Nyb2xsVmlld3BvcnQ7XG5cbiAgICBoZWFkZXJTY3JvbGxMaXN0ZW5lcjogYW55O1xuXG4gICAgYm9keVNjcm9sbExpc3RlbmVyOiBhbnk7XG5cbiAgICBmb290ZXJTY3JvbGxMaXN0ZW5lcjogYW55O1xuXG4gICAgZnJvemVuU2libGluZ0JvZHk6IEhUTUxEaXZFbGVtZW50O1xuXG4gICAgcHJldmVudEJvZHlTY3JvbGxQcm9wYWdhdGlvbjogYm9vbGVhbjtcblxuICAgIF9zY3JvbGxIZWlnaHQ6IHN0cmluZztcblxuICAgIHZpcnR1YWxTY3JvbGxUaW1lb3V0OiBhbnk7XG5cbiAgICB2aXJ0dWFsUGFnZTogbnVtYmVyO1xuXG4gICAgQElucHV0KCkgZ2V0IHNjcm9sbEhlaWdodCgpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gdGhpcy5fc2Nyb2xsSGVpZ2h0O1xuICAgIH1cbiAgICBzZXQgc2Nyb2xsSGVpZ2h0KHZhbDogc3RyaW5nKSB7XG4gICAgICAgIHRoaXMuX3Njcm9sbEhlaWdodCA9IHZhbDtcbiAgICAgICAgaWYgKHZhbCAhPSBudWxsICYmICh2YWwuaW5jbHVkZXMoJyUnKSB8fCB2YWwuaW5jbHVkZXMoJ2NhbGMnKSkpIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdQZXJjZW50YWdlIHNjcm9sbCBoZWlnaHQgY2FsY3VsYXRpb24gaXMgcmVtb3ZlZCBpbiBmYXZvciBvZiB0aGUgbW9yZSBwZXJmb3JtYW50IENTUyBiYXNlZCBmbGV4IG1vZGUsIHVzZSBzY3JvbGxIZWlnaHQ9XCJmbGV4XCIgaW5zdGVhZC4nKVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMuZHQudmlydHVhbFNjcm9sbCAmJiB0aGlzLnZpcnR1YWxTY3JvbGxCb2R5KSB7XG4gICAgICAgICAgICB0aGlzLnZpcnR1YWxTY3JvbGxCb2R5Lm5nT25Jbml0KCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBjb25zdHJ1Y3RvcihwdWJsaWMgZHQ6IFRhYmxlLCBwdWJsaWMgZWw6IEVsZW1lbnRSZWYsIHB1YmxpYyB6b25lOiBOZ1pvbmUpIHt9XG5cbiAgICBuZ0FmdGVyVmlld0luaXQoKSB7XG4gICAgICAgIGlmICghdGhpcy5mcm96ZW4pIHtcbiAgICAgICAgICAgIGlmICh0aGlzLmR0LmZyb3plbkNvbHVtbnMgfHwgdGhpcy5kdC5mcm96ZW5Cb2R5VGVtcGxhdGUpIHtcbiAgICAgICAgICAgICAgICBEb21IYW5kbGVyLmFkZENsYXNzKHRoaXMuZWwubmF0aXZlRWxlbWVudCwgJ3AtZGF0YXRhYmxlLXVuZnJvemVuLXZpZXcnKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgbGV0IGZyb3plblZpZXcgPSB0aGlzLmVsLm5hdGl2ZUVsZW1lbnQucHJldmlvdXNFbGVtZW50U2libGluZztcbiAgICAgICAgICAgIGlmIChmcm96ZW5WaWV3KSB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuZHQudmlydHVhbFNjcm9sbClcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5mcm96ZW5TaWJsaW5nQm9keSA9IERvbUhhbmRsZXIuZmluZFNpbmdsZShmcm96ZW5WaWV3LCAnLnAtZGF0YXRhYmxlLXZpcnR1YWwtc2Nyb2xsYWJsZS1ib2R5Jyk7XG4gICAgICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAgICAgICB0aGlzLmZyb3plblNpYmxpbmdCb2R5ID0gRG9tSGFuZGxlci5maW5kU2luZ2xlKGZyb3plblZpZXcsICcucC1kYXRhdGFibGUtc2Nyb2xsYWJsZS1ib2R5Jyk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGxldCBzY3JvbGxCYXJXaWR0aCA9IERvbUhhbmRsZXIuY2FsY3VsYXRlU2Nyb2xsYmFyV2lkdGgoKTtcbiAgICAgICAgICAgIHRoaXMuc2Nyb2xsSGVhZGVyQm94Vmlld0NoaWxkLm5hdGl2ZUVsZW1lbnQuc3R5bGUucGFkZGluZ1JpZ2h0ID0gc2Nyb2xsQmFyV2lkdGggKyAncHgnO1xuXG4gICAgICAgICAgICBpZiAodGhpcy5zY3JvbGxGb290ZXJCb3hWaWV3Q2hpbGQgJiYgdGhpcy5zY3JvbGxGb290ZXJCb3hWaWV3Q2hpbGQubmF0aXZlRWxlbWVudCkge1xuICAgICAgICAgICAgICAgIHRoaXMuc2Nyb2xsRm9vdGVyQm94Vmlld0NoaWxkLm5hdGl2ZUVsZW1lbnQuc3R5bGUucGFkZGluZ1JpZ2h0ID0gc2Nyb2xsQmFyV2lkdGggKyAncHgnO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgaWYgKHRoaXMuc2Nyb2xsYWJsZUFsaWduZXJWaWV3Q2hpbGQgJiYgdGhpcy5zY3JvbGxhYmxlQWxpZ25lclZpZXdDaGlsZC5uYXRpdmVFbGVtZW50KSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zY3JvbGxhYmxlQWxpZ25lclZpZXdDaGlsZC5uYXRpdmVFbGVtZW50LnN0eWxlLmhlaWdodCA9IERvbUhhbmRsZXIuY2FsY3VsYXRlU2Nyb2xsYmFySGVpZ2h0KCkgKyAncHgnO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5iaW5kRXZlbnRzKCk7XG4gICAgfVxuXG4gICAgYmluZEV2ZW50cygpIHtcbiAgICAgICAgdGhpcy56b25lLnJ1bk91dHNpZGVBbmd1bGFyKCgpID0+IHtcbiAgICAgICAgICAgIGlmICh0aGlzLnNjcm9sbEhlYWRlclZpZXdDaGlsZCAmJiB0aGlzLnNjcm9sbEhlYWRlclZpZXdDaGlsZC5uYXRpdmVFbGVtZW50KSB7XG4gICAgICAgICAgICAgICAgdGhpcy5oZWFkZXJTY3JvbGxMaXN0ZW5lciA9IHRoaXMub25IZWFkZXJTY3JvbGwuYmluZCh0aGlzKTtcbiAgICAgICAgICAgICAgICB0aGlzLnNjcm9sbEhlYWRlclZpZXdDaGlsZC5uYXRpdmVFbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ3Njcm9sbCcsIHRoaXMuaGVhZGVyU2Nyb2xsTGlzdGVuZXIpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAodGhpcy5zY3JvbGxGb290ZXJWaWV3Q2hpbGQgJiYgdGhpcy5zY3JvbGxGb290ZXJWaWV3Q2hpbGQubmF0aXZlRWxlbWVudCkge1xuICAgICAgICAgICAgICAgIHRoaXMuZm9vdGVyU2Nyb2xsTGlzdGVuZXIgPSB0aGlzLm9uRm9vdGVyU2Nyb2xsLmJpbmQodGhpcyk7XG4gICAgICAgICAgICAgICAgdGhpcy5zY3JvbGxGb290ZXJWaWV3Q2hpbGQubmF0aXZlRWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdzY3JvbGwnLCB0aGlzLmZvb3RlclNjcm9sbExpc3RlbmVyKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKCF0aGlzLmZyb3plbikge1xuICAgICAgICAgICAgICAgIHRoaXMuYm9keVNjcm9sbExpc3RlbmVyID0gdGhpcy5vbkJvZHlTY3JvbGwuYmluZCh0aGlzKTtcblxuICAgICAgICAgICAgICAgIGlmICh0aGlzLmR0LnZpcnR1YWxTY3JvbGwpXG4gICAgICAgICAgICAgICAgICAgIHRoaXMudmlydHVhbFNjcm9sbEJvZHkuZ2V0RWxlbWVudFJlZigpLm5hdGl2ZUVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignc2Nyb2xsJywgdGhpcy5ib2R5U2Nyb2xsTGlzdGVuZXIpO1xuICAgICAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zY3JvbGxCb2R5Vmlld0NoaWxkLm5hdGl2ZUVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignc2Nyb2xsJywgdGhpcy5ib2R5U2Nyb2xsTGlzdGVuZXIpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICB1bmJpbmRFdmVudHMoKSB7XG4gICAgICAgIGlmICh0aGlzLnNjcm9sbEhlYWRlclZpZXdDaGlsZCAmJiB0aGlzLnNjcm9sbEhlYWRlclZpZXdDaGlsZC5uYXRpdmVFbGVtZW50KSB7XG4gICAgICAgICAgICB0aGlzLnNjcm9sbEhlYWRlclZpZXdDaGlsZC5uYXRpdmVFbGVtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3Njcm9sbCcsIHRoaXMuaGVhZGVyU2Nyb2xsTGlzdGVuZXIpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMuc2Nyb2xsRm9vdGVyVmlld0NoaWxkICYmIHRoaXMuc2Nyb2xsRm9vdGVyVmlld0NoaWxkLm5hdGl2ZUVsZW1lbnQpIHtcbiAgICAgICAgICAgIHRoaXMuc2Nyb2xsRm9vdGVyVmlld0NoaWxkLm5hdGl2ZUVsZW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcignc2Nyb2xsJywgdGhpcy5mb290ZXJTY3JvbGxMaXN0ZW5lcik7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5zY3JvbGxCb2R5Vmlld0NoaWxkICYmIHRoaXMuc2Nyb2xsQm9keVZpZXdDaGlsZC5uYXRpdmVFbGVtZW50KSB7XG4gICAgICAgICAgICB0aGlzLnNjcm9sbEJvZHlWaWV3Q2hpbGQubmF0aXZlRWxlbWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdzY3JvbGwnLCB0aGlzLmJvZHlTY3JvbGxMaXN0ZW5lcik7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy52aXJ0dWFsU2Nyb2xsQm9keSAmJiB0aGlzLnZpcnR1YWxTY3JvbGxCb2R5LmdldEVsZW1lbnRSZWYoKSkge1xuICAgICAgICAgICAgdGhpcy52aXJ0dWFsU2Nyb2xsQm9keS5nZXRFbGVtZW50UmVmKCkubmF0aXZlRWxlbWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdzY3JvbGwnLCB0aGlzLmJvZHlTY3JvbGxMaXN0ZW5lcik7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBvbkhlYWRlclNjcm9sbCgpIHtcbiAgICAgICAgY29uc3Qgc2Nyb2xsTGVmdCA9IHRoaXMuc2Nyb2xsSGVhZGVyVmlld0NoaWxkLm5hdGl2ZUVsZW1lbnQuc2Nyb2xsTGVmdDtcblxuICAgICAgICB0aGlzLnNjcm9sbEJvZHlWaWV3Q2hpbGQubmF0aXZlRWxlbWVudC5zY3JvbGxMZWZ0ID0gc2Nyb2xsTGVmdDtcblxuICAgICAgICBpZiAodGhpcy5zY3JvbGxGb290ZXJWaWV3Q2hpbGQgJiYgdGhpcy5zY3JvbGxGb290ZXJWaWV3Q2hpbGQubmF0aXZlRWxlbWVudCkge1xuICAgICAgICAgICAgdGhpcy5zY3JvbGxGb290ZXJWaWV3Q2hpbGQubmF0aXZlRWxlbWVudC5zY3JvbGxMZWZ0ID0gc2Nyb2xsTGVmdDtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMucHJldmVudEJvZHlTY3JvbGxQcm9wYWdhdGlvbiA9IHRydWU7XG4gICAgfVxuXG4gICAgb25Gb290ZXJTY3JvbGwoKSB7XG4gICAgICAgIGNvbnN0IHNjcm9sbExlZnQgPSB0aGlzLnNjcm9sbEZvb3RlclZpZXdDaGlsZC5uYXRpdmVFbGVtZW50LnNjcm9sbExlZnQ7XG4gICAgICAgIHRoaXMuc2Nyb2xsQm9keVZpZXdDaGlsZC5uYXRpdmVFbGVtZW50LnNjcm9sbExlZnQgPSBzY3JvbGxMZWZ0O1xuXG4gICAgICAgIGlmICh0aGlzLnNjcm9sbEhlYWRlclZpZXdDaGlsZCAmJiB0aGlzLnNjcm9sbEhlYWRlclZpZXdDaGlsZC5uYXRpdmVFbGVtZW50KSB7XG4gICAgICAgICAgICB0aGlzLnNjcm9sbEhlYWRlclZpZXdDaGlsZC5uYXRpdmVFbGVtZW50LnNjcm9sbExlZnQgPSBzY3JvbGxMZWZ0O1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5wcmV2ZW50Qm9keVNjcm9sbFByb3BhZ2F0aW9uID0gdHJ1ZTtcbiAgICB9XG5cbiAgICBvbkJvZHlTY3JvbGwoZXZlbnQpIHtcbiAgICAgICAgaWYgKHRoaXMucHJldmVudEJvZHlTY3JvbGxQcm9wYWdhdGlvbikge1xuICAgICAgICAgICAgdGhpcy5wcmV2ZW50Qm9keVNjcm9sbFByb3BhZ2F0aW9uID0gZmFsc2U7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5zY3JvbGxIZWFkZXJWaWV3Q2hpbGQgJiYgdGhpcy5zY3JvbGxIZWFkZXJWaWV3Q2hpbGQubmF0aXZlRWxlbWVudCkge1xuICAgICAgICAgICAgdGhpcy5zY3JvbGxIZWFkZXJCb3hWaWV3Q2hpbGQubmF0aXZlRWxlbWVudC5zdHlsZS5tYXJnaW5MZWZ0ID0gLTEgKiBldmVudC50YXJnZXQuc2Nyb2xsTGVmdCArICdweCc7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5zY3JvbGxGb290ZXJWaWV3Q2hpbGQgJiYgdGhpcy5zY3JvbGxGb290ZXJWaWV3Q2hpbGQubmF0aXZlRWxlbWVudCkge1xuICAgICAgICAgICAgdGhpcy5zY3JvbGxGb290ZXJCb3hWaWV3Q2hpbGQubmF0aXZlRWxlbWVudC5zdHlsZS5tYXJnaW5MZWZ0ID0gLTEgKiBldmVudC50YXJnZXQuc2Nyb2xsTGVmdCArICdweCc7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5mcm96ZW5TaWJsaW5nQm9keSkge1xuICAgICAgICAgICAgdGhpcy5mcm96ZW5TaWJsaW5nQm9keS5zY3JvbGxUb3AgPSBldmVudC50YXJnZXQuc2Nyb2xsVG9wO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgb25TY3JvbGxJbmRleENoYW5nZShpbmRleDogbnVtYmVyKSB7XG4gICAgICAgIGlmICh0aGlzLmR0LmxhenkpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLnZpcnR1YWxTY3JvbGxUaW1lb3V0KSB7XG4gICAgICAgICAgICAgICAgY2xlYXJUaW1lb3V0KHRoaXMudmlydHVhbFNjcm9sbFRpbWVvdXQpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB0aGlzLnZpcnR1YWxTY3JvbGxUaW1lb3V0ID0gc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICAgICAgbGV0IHBhZ2UgPSBNYXRoLmZsb29yKGluZGV4IC8gdGhpcy5kdC5yb3dzKTtcbiAgICAgICAgICAgICAgICBsZXQgdmlydHVhbFNjcm9sbE9mZnNldCA9IHBhZ2UgPT09IDAgPyAwIDogKHBhZ2UgLSAxKSAqIHRoaXMuZHQucm93cztcbiAgICAgICAgICAgICAgICBsZXQgdmlydHVhbFNjcm9sbENodW5rU2l6ZSA9IHBhZ2UgPT09IDAgPyB0aGlzLmR0LnJvd3MgKiAyIDogdGhpcy5kdC5yb3dzICogMztcbiAgXG4gICAgICAgICAgICAgICAgaWYgKHBhZ2UgIT09IHRoaXMudmlydHVhbFBhZ2UpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy52aXJ0dWFsUGFnZSA9IHBhZ2U7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZHQub25MYXp5TG9hZC5lbWl0KHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGZpcnN0OiB2aXJ0dWFsU2Nyb2xsT2Zmc2V0LFxuICAgICAgICAgICAgICAgICAgICAgICAgcm93czogdmlydHVhbFNjcm9sbENodW5rU2l6ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHNvcnRGaWVsZDogdGhpcy5kdC5zb3J0RmllbGQsXG4gICAgICAgICAgICAgICAgICAgICAgICBzb3J0T3JkZXI6IHRoaXMuZHQuc29ydE9yZGVyLFxuICAgICAgICAgICAgICAgICAgICAgICAgZmlsdGVyczogdGhpcy5kdC5maWx0ZXJzLFxuICAgICAgICAgICAgICAgICAgICAgICAgZ2xvYmFsRmlsdGVyOiB0aGlzLmR0LmZpbHRlcnMgJiYgdGhpcy5kdC5maWx0ZXJzWydnbG9iYWwnXSA/ICg8RmlsdGVyTWV0YWRhdGE+IHRoaXMuZHQuZmlsdGVyc1snZ2xvYmFsJ10pLnZhbHVlIDogbnVsbCxcbiAgICAgICAgICAgICAgICAgICAgICAgIG11bHRpU29ydE1ldGE6IHRoaXMuZHQubXVsdGlTb3J0TWV0YVxuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LCB0aGlzLmR0LnZpcnR1YWxTY3JvbGxEZWxheSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBnZXRQYWdlQ291bnQoKSB7XG4gICAgICAgIGxldCBkYXRhVG9SZW5kZXIgPSB0aGlzLmR0LmZpbHRlcmVkVmFsdWUgfHwgdGhpcy5kdC52YWx1ZTtcbiAgICAgICAgbGV0IGRhdGFMZW5ndGggPSBkYXRhVG9SZW5kZXIgPyBkYXRhVG9SZW5kZXIubGVuZ3RoOiAwO1xuICAgICAgICByZXR1cm4gTWF0aC5jZWlsKGRhdGFMZW5ndGggLyB0aGlzLmR0LnJvd3MpO1xuICAgIH1cblxuICAgIHNjcm9sbFRvVmlydHVhbEluZGV4KGluZGV4OiBudW1iZXIpOiB2b2lkIHtcbiAgICAgICAgaWYgKHRoaXMudmlydHVhbFNjcm9sbEJvZHkpIHtcbiAgICAgICAgICAgIHRoaXMudmlydHVhbFNjcm9sbEJvZHkuc2Nyb2xsVG9JbmRleChpbmRleCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBzY3JvbGxUbyhvcHRpb25zKTogdm9pZCB7XG4gICAgICAgIGlmICh0aGlzLnZpcnR1YWxTY3JvbGxCb2R5KSB7XG4gICAgICAgICAgICB0aGlzLnZpcnR1YWxTY3JvbGxCb2R5LnNjcm9sbFRvKG9wdGlvbnMpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgaWYgKHRoaXMuc2Nyb2xsQm9keVZpZXdDaGlsZC5uYXRpdmVFbGVtZW50LnNjcm9sbFRvKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zY3JvbGxCb2R5Vmlld0NoaWxkLm5hdGl2ZUVsZW1lbnQuc2Nyb2xsVG8ob3B0aW9ucyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLnNjcm9sbEJvZHlWaWV3Q2hpbGQubmF0aXZlRWxlbWVudC5zY3JvbGxMZWZ0ID0gb3B0aW9ucy5sZWZ0O1xuICAgICAgICAgICAgICAgIHRoaXMuc2Nyb2xsQm9keVZpZXdDaGlsZC5uYXRpdmVFbGVtZW50LnNjcm9sbFRvcCA9IG9wdGlvbnMudG9wO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgbmdPbkRlc3Ryb3koKSB7XG4gICAgICAgIHRoaXMudW5iaW5kRXZlbnRzKCk7XG4gICAgICAgIHRoaXMuZnJvemVuU2libGluZ0JvZHkgPSBudWxsO1xuICAgIH1cbn1cblxuQERpcmVjdGl2ZSh7XG4gICAgc2VsZWN0b3I6ICdbcFNvcnRhYmxlQ29sdW1uXScsXG4gICAgaG9zdDoge1xuICAgICAgICAnW2NsYXNzLnAtc29ydGFibGUtY29sdW1uXSc6ICdpc0VuYWJsZWQoKScsXG4gICAgICAgICdbY2xhc3MucC1oaWdobGlnaHRdJzogJ3NvcnRlZCcsXG4gICAgICAgICdbYXR0ci50YWJpbmRleF0nOiAnaXNFbmFibGVkKCkgPyBcIjBcIiA6IG51bGwnLFxuICAgICAgICAnW2F0dHIucm9sZV0nOiAnXCJjb2x1bW5oZWFkZXJcIicsXG4gICAgICAgICdbYXR0ci5hcmlhLXNvcnRdJzogJ3NvcnRPcmRlcidcbiAgICB9XG59KVxuZXhwb3J0IGNsYXNzIFNvcnRhYmxlQ29sdW1uIGltcGxlbWVudHMgT25Jbml0LCBPbkRlc3Ryb3kge1xuXG4gICAgQElucHV0KFwicFNvcnRhYmxlQ29sdW1uXCIpIGZpZWxkOiBzdHJpbmc7XG5cbiAgICBASW5wdXQoKSBwU29ydGFibGVDb2x1bW5EaXNhYmxlZDogYm9vbGVhbjtcblxuICAgIHNvcnRlZDogYm9vbGVhbjtcblxuICAgIHNvcnRPcmRlcjogc3RyaW5nO1xuXG4gICAgc3Vic2NyaXB0aW9uOiBTdWJzY3JpcHRpb247XG5cbiAgICBjb25zdHJ1Y3RvcihwdWJsaWMgZHQ6IFRhYmxlKSB7XG4gICAgICAgIGlmICh0aGlzLmlzRW5hYmxlZCgpKSB7XG4gICAgICAgICAgICB0aGlzLnN1YnNjcmlwdGlvbiA9IHRoaXMuZHQudGFibGVTZXJ2aWNlLnNvcnRTb3VyY2UkLnN1YnNjcmliZShzb3J0TWV0YSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy51cGRhdGVTb3J0U3RhdGUoKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgbmdPbkluaXQoKSB7XG4gICAgICAgIGlmICh0aGlzLmlzRW5hYmxlZCgpKSB7XG4gICAgICAgICAgICB0aGlzLnVwZGF0ZVNvcnRTdGF0ZSgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgdXBkYXRlU29ydFN0YXRlKCkge1xuICAgICAgICB0aGlzLnNvcnRlZCA9IHRoaXMuZHQuaXNTb3J0ZWQodGhpcy5maWVsZCk7XG4gICAgICAgIHRoaXMuc29ydE9yZGVyID0gdGhpcy5zb3J0ZWQgPyAodGhpcy5kdC5zb3J0T3JkZXIgPT09IDEgPyAnYXNjZW5kaW5nJyA6ICdkZXNjZW5kaW5nJykgOiAnbm9uZSc7XG4gICAgfVxuXG4gICAgQEhvc3RMaXN0ZW5lcignY2xpY2snLCBbJyRldmVudCddKVxuICAgIG9uQ2xpY2soZXZlbnQ6IE1vdXNlRXZlbnQpIHtcbiAgICAgICAgaWYgKHRoaXMuaXNFbmFibGVkKCkgJiYgIXRoaXMuaXNGaWx0ZXJFbGVtZW50KDxIVE1MRWxlbWVudD4gZXZlbnQudGFyZ2V0KSkge1xuICAgICAgICAgICAgdGhpcy51cGRhdGVTb3J0U3RhdGUoKTtcbiAgICAgICAgICAgIHRoaXMuZHQuc29ydCh7XG4gICAgICAgICAgICAgICAgb3JpZ2luYWxFdmVudDogZXZlbnQsXG4gICAgICAgICAgICAgICAgZmllbGQ6IHRoaXMuZmllbGRcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICBEb21IYW5kbGVyLmNsZWFyU2VsZWN0aW9uKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBASG9zdExpc3RlbmVyKCdrZXlkb3duLmVudGVyJywgWyckZXZlbnQnXSlcbiAgICBvbkVudGVyS2V5KGV2ZW50OiBNb3VzZUV2ZW50KSB7XG4gICAgICAgIHRoaXMub25DbGljayhldmVudCk7XG4gICAgfVxuXG4gICAgaXNFbmFibGVkKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5wU29ydGFibGVDb2x1bW5EaXNhYmxlZCAhPT0gdHJ1ZTtcbiAgICB9XG5cbiAgICBpc0ZpbHRlckVsZW1lbnQoZWxlbWVudDogSFRNTEVsZW1lbnQpIHtcbiAgICAgICAgcmV0dXJuIERvbUhhbmRsZXIuaGFzQ2xhc3MoZWxlbWVudCwgJ3BpLWZpbHRlci1pY29uJykgfHwgRG9tSGFuZGxlci5oYXNDbGFzcyhlbGVtZW50LCAncC1jb2x1bW4tZmlsdGVyLW1lbnUtYnV0dG9uJyk7XG4gICAgfVxuXG4gICAgbmdPbkRlc3Ryb3koKSB7XG4gICAgICAgIGlmICh0aGlzLnN1YnNjcmlwdGlvbikge1xuICAgICAgICAgICAgdGhpcy5zdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcbiAgICAgICAgfVxuICAgIH1cblxufVxuXG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAncC1zb3J0SWNvbicsXG4gICAgdGVtcGxhdGU6IGBcbiAgICAgICAgPGkgY2xhc3M9XCJwLXNvcnRhYmxlLWNvbHVtbi1pY29uIHBpIHBpLWZ3XCIgW25nQ2xhc3NdPVwieydwaS1zb3J0LWFtb3VudC11cC1hbHQnOiBzb3J0T3JkZXIgPT09IDEsICdwaS1zb3J0LWFtb3VudC1kb3duJzogc29ydE9yZGVyID09PSAtMSwgJ3BpLXNvcnQtYWx0Jzogc29ydE9yZGVyID09PSAwfVwiPjwvaT5cbiAgICBgLFxuICAgIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxuICAgIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmVcbn0pXG5leHBvcnQgY2xhc3MgU29ydEljb24gaW1wbGVtZW50cyBPbkluaXQsIE9uRGVzdHJveSB7XG5cbiAgICBASW5wdXQoKSBmaWVsZDogc3RyaW5nO1xuXG4gICAgc3Vic2NyaXB0aW9uOiBTdWJzY3JpcHRpb247XG5cbiAgICBzb3J0T3JkZXI6IG51bWJlcjtcblxuICAgIGNvbnN0cnVjdG9yKHB1YmxpYyBkdDogVGFibGUsIHB1YmxpYyBjZDogQ2hhbmdlRGV0ZWN0b3JSZWYpIHtcbiAgICAgICAgdGhpcy5zdWJzY3JpcHRpb24gPSB0aGlzLmR0LnRhYmxlU2VydmljZS5zb3J0U291cmNlJC5zdWJzY3JpYmUoc29ydE1ldGEgPT4ge1xuICAgICAgICAgICAgdGhpcy51cGRhdGVTb3J0U3RhdGUoKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgbmdPbkluaXQoKSB7XG4gICAgICAgIHRoaXMudXBkYXRlU29ydFN0YXRlKCk7XG4gICAgfVxuXG4gICAgb25DbGljayhldmVudCl7XG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgfVxuXG4gICAgdXBkYXRlU29ydFN0YXRlKCkge1xuICAgICAgICBpZiAodGhpcy5kdC5zb3J0TW9kZSA9PT0gJ3NpbmdsZScpIHtcbiAgICAgICAgICAgIHRoaXMuc29ydE9yZGVyID0gdGhpcy5kdC5pc1NvcnRlZCh0aGlzLmZpZWxkKSA/IHRoaXMuZHQuc29ydE9yZGVyIDogMDtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmICh0aGlzLmR0LnNvcnRNb2RlID09PSAnbXVsdGlwbGUnKSB7XG4gICAgICAgICAgICBsZXQgc29ydE1ldGEgPSB0aGlzLmR0LmdldFNvcnRNZXRhKHRoaXMuZmllbGQpO1xuICAgICAgICAgICAgdGhpcy5zb3J0T3JkZXIgPSBzb3J0TWV0YSA/IHNvcnRNZXRhLm9yZGVyOiAwO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5jZC5tYXJrRm9yQ2hlY2soKTtcbiAgICB9XG5cbiAgICBuZ09uRGVzdHJveSgpIHtcbiAgICAgICAgaWYgKHRoaXMuc3Vic2NyaXB0aW9uKSB7XG4gICAgICAgICAgICB0aGlzLnN1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xuICAgICAgICB9XG4gICAgfVxufVxuXG5ARGlyZWN0aXZlKHtcbiAgICBzZWxlY3RvcjogJ1twU2VsZWN0YWJsZVJvd10nLFxuICAgIGhvc3Q6IHtcbiAgICAgICAgJ1tjbGFzcy5wLXNlbGVjdGFibGUtcm93XSc6ICdpc0VuYWJsZWQoKScsXG4gICAgICAgICdbY2xhc3MucC1oaWdobGlnaHRdJzogJ3NlbGVjdGVkJyxcbiAgICAgICAgJ1thdHRyLnRhYmluZGV4XSc6ICdpc0VuYWJsZWQoKSA/IDAgOiB1bmRlZmluZWQnXG4gICAgfVxufSlcbmV4cG9ydCBjbGFzcyBTZWxlY3RhYmxlUm93IGltcGxlbWVudHMgT25Jbml0LCBPbkRlc3Ryb3kge1xuXG4gICAgQElucHV0KFwicFNlbGVjdGFibGVSb3dcIikgZGF0YTogYW55O1xuXG4gICAgQElucHV0KFwicFNlbGVjdGFibGVSb3dJbmRleFwiKSBpbmRleDogbnVtYmVyO1xuXG4gICAgQElucHV0KCkgcFNlbGVjdGFibGVSb3dEaXNhYmxlZDogYm9vbGVhbjtcblxuICAgIHNlbGVjdGVkOiBib29sZWFuO1xuXG4gICAgc3Vic2NyaXB0aW9uOiBTdWJzY3JpcHRpb247XG5cbiAgICBjb25zdHJ1Y3RvcihwdWJsaWMgZHQ6IFRhYmxlLCBwdWJsaWMgdGFibGVTZXJ2aWNlOiBUYWJsZVNlcnZpY2UpIHtcbiAgICAgICAgaWYgKHRoaXMuaXNFbmFibGVkKCkpIHtcbiAgICAgICAgICAgIHRoaXMuc3Vic2NyaXB0aW9uID0gdGhpcy5kdC50YWJsZVNlcnZpY2Uuc2VsZWN0aW9uU291cmNlJC5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuc2VsZWN0ZWQgPSB0aGlzLmR0LmlzU2VsZWN0ZWQodGhpcy5kYXRhKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgbmdPbkluaXQoKSB7XG4gICAgICAgIGlmICh0aGlzLmlzRW5hYmxlZCgpKSB7XG4gICAgICAgICAgICB0aGlzLnNlbGVjdGVkID0gdGhpcy5kdC5pc1NlbGVjdGVkKHRoaXMuZGF0YSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBASG9zdExpc3RlbmVyKCdjbGljaycsIFsnJGV2ZW50J10pXG4gICAgb25DbGljayhldmVudDogRXZlbnQpIHtcbiAgICAgICAgaWYgKHRoaXMuaXNFbmFibGVkKCkpIHtcbiAgICAgICAgICAgIHRoaXMuZHQuaGFuZGxlUm93Q2xpY2soe1xuICAgICAgICAgICAgICAgIG9yaWdpbmFsRXZlbnQ6IGV2ZW50LFxuICAgICAgICAgICAgICAgIHJvd0RhdGE6IHRoaXMuZGF0YSxcbiAgICAgICAgICAgICAgICByb3dJbmRleDogdGhpcy5pbmRleFxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBASG9zdExpc3RlbmVyKCd0b3VjaGVuZCcsIFsnJGV2ZW50J10pXG4gICAgb25Ub3VjaEVuZChldmVudDogRXZlbnQpIHtcbiAgICAgICAgaWYgKHRoaXMuaXNFbmFibGVkKCkpIHtcbiAgICAgICAgICAgIHRoaXMuZHQuaGFuZGxlUm93VG91Y2hFbmQoZXZlbnQpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgQEhvc3RMaXN0ZW5lcigna2V5ZG93bi5hcnJvd2Rvd24nLCBbJyRldmVudCddKVxuICAgIG9uQXJyb3dEb3duS2V5RG93bihldmVudDogS2V5Ym9hcmRFdmVudCkge1xuICAgICAgICBpZiAoIXRoaXMuaXNFbmFibGVkKCkpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IHJvdyA9IDxIVE1MVGFibGVSb3dFbGVtZW50PmV2ZW50LmN1cnJlbnRUYXJnZXQ7XG4gICAgICAgIGNvbnN0IG5leHRSb3cgPSB0aGlzLmZpbmROZXh0U2VsZWN0YWJsZVJvdyhyb3cpO1xuXG4gICAgICAgIGlmIChuZXh0Um93KSB7XG4gICAgICAgICAgICBuZXh0Um93LmZvY3VzKCk7XG4gICAgICAgIH1cblxuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIH1cblxuICAgIEBIb3N0TGlzdGVuZXIoJ2tleWRvd24uYXJyb3d1cCcsIFsnJGV2ZW50J10pXG4gICAgb25BcnJvd1VwS2V5RG93bihldmVudDogS2V5Ym9hcmRFdmVudCkge1xuICAgICAgICBpZiAoIXRoaXMuaXNFbmFibGVkKCkpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IHJvdyA9IDxIVE1MVGFibGVSb3dFbGVtZW50PmV2ZW50LmN1cnJlbnRUYXJnZXQ7XG4gICAgICAgIGNvbnN0IHByZXZSb3cgPSB0aGlzLmZpbmRQcmV2U2VsZWN0YWJsZVJvdyhyb3cpO1xuXG4gICAgICAgIGlmIChwcmV2Um93KSB7XG4gICAgICAgICAgICBwcmV2Um93LmZvY3VzKCk7XG4gICAgICAgIH1cblxuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIH1cblxuICAgIEBIb3N0TGlzdGVuZXIoJ2tleWRvd24uZW50ZXInLCBbJyRldmVudCddKVxuICAgIEBIb3N0TGlzdGVuZXIoJ2tleWRvd24uc2hpZnQuZW50ZXInLCBbJyRldmVudCddKVxuICAgIEBIb3N0TGlzdGVuZXIoJ2tleWRvd24ubWV0YS5lbnRlcicsIFsnJGV2ZW50J10pXG4gICAgb25FbnRlcktleURvd24oZXZlbnQ6IEtleWJvYXJkRXZlbnQpIHtcbiAgICAgICAgaWYgKCF0aGlzLmlzRW5hYmxlZCgpKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmR0LmhhbmRsZVJvd0NsaWNrKHtcbiAgICAgICAgICAgIG9yaWdpbmFsRXZlbnQ6IGV2ZW50LFxuICAgICAgICAgICAgcm93RGF0YTogdGhpcy5kYXRhLFxuICAgICAgICAgICAgcm93SW5kZXg6IHRoaXMuaW5kZXhcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgQEhvc3RMaXN0ZW5lcigna2V5ZG93bi5zcGFjZScsIFsnJGV2ZW50J10pXG4gICAgb25TcGFjZUtleURvd24oZXZlbnQ6IEtleWJvYXJkRXZlbnQpIHtcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICB9XG5cbiAgICBASG9zdExpc3RlbmVyKCdrZXlkb3duLnBhZ2Vkb3duJywgWyckZXZlbnQnXSlcbiAgICBASG9zdExpc3RlbmVyKCdrZXlkb3duLnBhZ2V1cCcsIFsnJGV2ZW50J10pXG4gICAgQEhvc3RMaXN0ZW5lcigna2V5ZG93bi5ob21lJywgWyckZXZlbnQnXSlcbiAgICBASG9zdExpc3RlbmVyKCdrZXlkb3duLmVuZCcsIFsnJGV2ZW50J10pXG4gICAgb25QYWdlRG93bktleURvd24oKSB7XG4gICAgICAgIGlmICh0aGlzLmR0LnZpcnR1YWxTY3JvbGwpIHtcbiAgICAgICAgICAgIERvbUhhbmRsZXIuZmluZFNpbmdsZSh0aGlzLmR0LnNjcm9sbGFibGVWaWV3Q2hpbGQuZWwubmF0aXZlRWxlbWVudCwgJ2Nkay12aXJ0dWFsLXNjcm9sbC12aWV3cG9ydCcpLmZvY3VzKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBmaW5kTmV4dFNlbGVjdGFibGVSb3cocm93OiBIVE1MVGFibGVSb3dFbGVtZW50KTogSFRNTFRhYmxlUm93RWxlbWVudCB7XG4gICAgICAgIGxldCBuZXh0Um93ID0gPEhUTUxUYWJsZVJvd0VsZW1lbnQ+IHJvdy5uZXh0RWxlbWVudFNpYmxpbmc7XG4gICAgICAgIGlmIChuZXh0Um93KSB7XG4gICAgICAgICAgICBpZiAoRG9tSGFuZGxlci5oYXNDbGFzcyhuZXh0Um93LCAncC1zZWxlY3RhYmxlLXJvdycpKVxuICAgICAgICAgICAgICAgIHJldHVybiBuZXh0Um93O1xuICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmZpbmROZXh0U2VsZWN0YWJsZVJvdyhuZXh0Um93KTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZmluZFByZXZTZWxlY3RhYmxlUm93KHJvdzogSFRNTFRhYmxlUm93RWxlbWVudCk6IEhUTUxUYWJsZVJvd0VsZW1lbnQge1xuICAgICAgICBsZXQgcHJldlJvdyA9IDxIVE1MVGFibGVSb3dFbGVtZW50PiByb3cucHJldmlvdXNFbGVtZW50U2libGluZztcbiAgICAgICAgaWYgKHByZXZSb3cpIHtcbiAgICAgICAgICAgIGlmIChEb21IYW5kbGVyLmhhc0NsYXNzKHByZXZSb3csICdwLXNlbGVjdGFibGUtcm93JykpXG4gICAgICAgICAgICAgICAgcmV0dXJuIHByZXZSb3c7XG4gICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuZmluZFByZXZTZWxlY3RhYmxlUm93KHByZXZSb3cpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBpc0VuYWJsZWQoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnBTZWxlY3RhYmxlUm93RGlzYWJsZWQgIT09IHRydWU7XG4gICAgfVxuXG4gICAgbmdPbkRlc3Ryb3koKSB7XG4gICAgICAgIGlmICh0aGlzLnN1YnNjcmlwdGlvbikge1xuICAgICAgICAgICAgdGhpcy5zdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcbiAgICAgICAgfVxuICAgIH1cblxufVxuXG5ARGlyZWN0aXZlKHtcbiAgICBzZWxlY3RvcjogJ1twU2VsZWN0YWJsZVJvd0RibENsaWNrXScsXG4gICAgaG9zdDoge1xuICAgICAgICAnW2NsYXNzLnAtc2VsZWN0YWJsZS1yb3ddJzogJ2lzRW5hYmxlZCgpJyxcbiAgICAgICAgJ1tjbGFzcy5wLWhpZ2hsaWdodF0nOiAnc2VsZWN0ZWQnXG4gICAgfVxufSlcbmV4cG9ydCBjbGFzcyBTZWxlY3RhYmxlUm93RGJsQ2xpY2sgaW1wbGVtZW50cyBPbkluaXQsIE9uRGVzdHJveSB7XG5cbiAgICBASW5wdXQoXCJwU2VsZWN0YWJsZVJvd0RibENsaWNrXCIpIGRhdGE6IGFueTtcblxuICAgIEBJbnB1dChcInBTZWxlY3RhYmxlUm93SW5kZXhcIikgaW5kZXg6IG51bWJlcjtcblxuICAgIEBJbnB1dCgpIHBTZWxlY3RhYmxlUm93RGlzYWJsZWQ6IGJvb2xlYW47XG5cbiAgICBzZWxlY3RlZDogYm9vbGVhbjtcblxuICAgIHN1YnNjcmlwdGlvbjogU3Vic2NyaXB0aW9uO1xuXG4gICAgY29uc3RydWN0b3IocHVibGljIGR0OiBUYWJsZSwgcHVibGljIHRhYmxlU2VydmljZTogVGFibGVTZXJ2aWNlKSB7XG4gICAgICAgIGlmICh0aGlzLmlzRW5hYmxlZCgpKSB7XG4gICAgICAgICAgICB0aGlzLnN1YnNjcmlwdGlvbiA9IHRoaXMuZHQudGFibGVTZXJ2aWNlLnNlbGVjdGlvblNvdXJjZSQuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLnNlbGVjdGVkID0gdGhpcy5kdC5pc1NlbGVjdGVkKHRoaXMuZGF0YSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIG5nT25Jbml0KCkge1xuICAgICAgICBpZiAodGhpcy5pc0VuYWJsZWQoKSkge1xuICAgICAgICAgICAgdGhpcy5zZWxlY3RlZCA9IHRoaXMuZHQuaXNTZWxlY3RlZCh0aGlzLmRhdGEpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgQEhvc3RMaXN0ZW5lcignZGJsY2xpY2snLCBbJyRldmVudCddKVxuICAgIG9uQ2xpY2soZXZlbnQ6IEV2ZW50KSB7XG4gICAgICAgIGlmICh0aGlzLmlzRW5hYmxlZCgpKSB7XG4gICAgICAgICAgICB0aGlzLmR0LmhhbmRsZVJvd0NsaWNrKHtcbiAgICAgICAgICAgICAgICBvcmlnaW5hbEV2ZW50OiBldmVudCxcbiAgICAgICAgICAgICAgICByb3dEYXRhOiB0aGlzLmRhdGEsXG4gICAgICAgICAgICAgICAgcm93SW5kZXg6IHRoaXMuaW5kZXhcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgaXNFbmFibGVkKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5wU2VsZWN0YWJsZVJvd0Rpc2FibGVkICE9PSB0cnVlO1xuICAgIH1cblxuICAgIG5nT25EZXN0cm95KCkge1xuICAgICAgICBpZiAodGhpcy5zdWJzY3JpcHRpb24pIHtcbiAgICAgICAgICAgIHRoaXMuc3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbn1cblxuQERpcmVjdGl2ZSh7XG4gICAgc2VsZWN0b3I6ICdbcENvbnRleHRNZW51Um93XScsXG4gICAgaG9zdDoge1xuICAgICAgICAnW2NsYXNzLnAtaGlnaGxpZ2h0LWNvbnRleHRtZW51XSc6ICdzZWxlY3RlZCcsXG4gICAgICAgICdbYXR0ci50YWJpbmRleF0nOiAnaXNFbmFibGVkKCkgPyAwIDogdW5kZWZpbmVkJ1xuICAgIH1cbn0pXG5leHBvcnQgY2xhc3MgQ29udGV4dE1lbnVSb3cge1xuXG4gICAgQElucHV0KFwicENvbnRleHRNZW51Um93XCIpIGRhdGE6IGFueTtcblxuICAgIEBJbnB1dChcInBDb250ZXh0TWVudVJvd0luZGV4XCIpIGluZGV4OiBudW1iZXI7XG5cbiAgICBASW5wdXQoKSBwQ29udGV4dE1lbnVSb3dEaXNhYmxlZDogYm9vbGVhbjtcblxuICAgIHNlbGVjdGVkOiBib29sZWFuO1xuXG4gICAgc3Vic2NyaXB0aW9uOiBTdWJzY3JpcHRpb247XG5cbiAgICBjb25zdHJ1Y3RvcihwdWJsaWMgZHQ6IFRhYmxlLCBwdWJsaWMgdGFibGVTZXJ2aWNlOiBUYWJsZVNlcnZpY2UsIHByaXZhdGUgZWw6IEVsZW1lbnRSZWYpIHtcbiAgICAgICAgaWYgKHRoaXMuaXNFbmFibGVkKCkpIHtcbiAgICAgICAgICAgIHRoaXMuc3Vic2NyaXB0aW9uID0gdGhpcy5kdC50YWJsZVNlcnZpY2UuY29udGV4dE1lbnVTb3VyY2UkLnN1YnNjcmliZSgoZGF0YSkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuc2VsZWN0ZWQgPSB0aGlzLmR0LmVxdWFscyh0aGlzLmRhdGEsIGRhdGEpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBASG9zdExpc3RlbmVyKCdjb250ZXh0bWVudScsIFsnJGV2ZW50J10pXG4gICAgb25Db250ZXh0TWVudShldmVudDogRXZlbnQpIHtcbiAgICAgICAgaWYgKHRoaXMuaXNFbmFibGVkKCkpIHtcbiAgICAgICAgICAgIHRoaXMuZHQuaGFuZGxlUm93UmlnaHRDbGljayh7XG4gICAgICAgICAgICAgICAgb3JpZ2luYWxFdmVudDogZXZlbnQsXG4gICAgICAgICAgICAgICAgcm93RGF0YTogdGhpcy5kYXRhLFxuICAgICAgICAgICAgICAgIHJvd0luZGV4OiB0aGlzLmluZGV4XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgdGhpcy5lbC5uYXRpdmVFbGVtZW50LmZvY3VzKCk7XG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgaXNFbmFibGVkKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5wQ29udGV4dE1lbnVSb3dEaXNhYmxlZCAhPT0gdHJ1ZTtcbiAgICB9XG5cbiAgICBuZ09uRGVzdHJveSgpIHtcbiAgICAgICAgaWYgKHRoaXMuc3Vic2NyaXB0aW9uKSB7XG4gICAgICAgICAgICB0aGlzLnN1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xuICAgICAgICB9XG4gICAgfVxuXG59XG5cbkBEaXJlY3RpdmUoe1xuICAgIHNlbGVjdG9yOiAnW3BSb3dUb2dnbGVyXSdcbn0pXG5leHBvcnQgY2xhc3MgUm93VG9nZ2xlciB7XG5cbiAgICBASW5wdXQoJ3BSb3dUb2dnbGVyJykgZGF0YTogYW55O1xuXG4gICAgQElucHV0KCkgcFJvd1RvZ2dsZXJEaXNhYmxlZDogYm9vbGVhbjtcblxuICAgIGNvbnN0cnVjdG9yKHB1YmxpYyBkdDogVGFibGUpIHsgfVxuXG4gICAgQEhvc3RMaXN0ZW5lcignY2xpY2snLCBbJyRldmVudCddKVxuICAgIG9uQ2xpY2soZXZlbnQ6IEV2ZW50KSB7XG4gICAgICAgIGlmICh0aGlzLmlzRW5hYmxlZCgpKSB7XG4gICAgICAgICAgICB0aGlzLmR0LnRvZ2dsZVJvdyh0aGlzLmRhdGEsIGV2ZW50KTtcbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBpc0VuYWJsZWQoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnBSb3dUb2dnbGVyRGlzYWJsZWQgIT09IHRydWU7XG4gICAgfVxufVxuXG5ARGlyZWN0aXZlKHtcbiAgICBzZWxlY3RvcjogJ1twUmVzaXphYmxlQ29sdW1uXSdcbn0pXG5leHBvcnQgY2xhc3MgUmVzaXphYmxlQ29sdW1uIGltcGxlbWVudHMgQWZ0ZXJWaWV3SW5pdCwgT25EZXN0cm95IHtcblxuICAgIEBJbnB1dCgpIHBSZXNpemFibGVDb2x1bW5EaXNhYmxlZDogYm9vbGVhbjtcblxuICAgIHJlc2l6ZXI6IEhUTUxTcGFuRWxlbWVudDtcblxuICAgIHJlc2l6ZXJNb3VzZURvd25MaXN0ZW5lcjogYW55O1xuXG4gICAgZG9jdW1lbnRNb3VzZU1vdmVMaXN0ZW5lcjogYW55O1xuXG4gICAgZG9jdW1lbnRNb3VzZVVwTGlzdGVuZXI6IGFueTtcblxuICAgIGNvbnN0cnVjdG9yKHB1YmxpYyBkdDogVGFibGUsIHB1YmxpYyBlbDogRWxlbWVudFJlZiwgcHVibGljIHpvbmU6IE5nWm9uZSkgeyB9XG5cbiAgICBuZ0FmdGVyVmlld0luaXQoKSB7XG4gICAgICAgIGlmICh0aGlzLmlzRW5hYmxlZCgpKSB7XG4gICAgICAgICAgICBEb21IYW5kbGVyLmFkZENsYXNzKHRoaXMuZWwubmF0aXZlRWxlbWVudCwgJ3AtcmVzaXphYmxlLWNvbHVtbicpO1xuICAgICAgICAgICAgdGhpcy5yZXNpemVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xuICAgICAgICAgICAgdGhpcy5yZXNpemVyLmNsYXNzTmFtZSA9ICdwLWNvbHVtbi1yZXNpemVyJztcbiAgICAgICAgICAgIHRoaXMuZWwubmF0aXZlRWxlbWVudC5hcHBlbmRDaGlsZCh0aGlzLnJlc2l6ZXIpO1xuXG4gICAgICAgICAgICB0aGlzLnpvbmUucnVuT3V0c2lkZUFuZ3VsYXIoKCkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMucmVzaXplck1vdXNlRG93bkxpc3RlbmVyID0gdGhpcy5vbk1vdXNlRG93bi5iaW5kKHRoaXMpO1xuICAgICAgICAgICAgICAgIHRoaXMucmVzaXplci5hZGRFdmVudExpc3RlbmVyKCdtb3VzZWRvd24nLCB0aGlzLnJlc2l6ZXJNb3VzZURvd25MaXN0ZW5lcik7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGJpbmREb2N1bWVudEV2ZW50cygpIHtcbiAgICAgICAgdGhpcy56b25lLnJ1bk91dHNpZGVBbmd1bGFyKCgpID0+IHtcbiAgICAgICAgICAgIHRoaXMuZG9jdW1lbnRNb3VzZU1vdmVMaXN0ZW5lciA9IHRoaXMub25Eb2N1bWVudE1vdXNlTW92ZS5iaW5kKHRoaXMpO1xuICAgICAgICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignbW91c2Vtb3ZlJywgdGhpcy5kb2N1bWVudE1vdXNlTW92ZUxpc3RlbmVyKTtcblxuICAgICAgICAgICAgdGhpcy5kb2N1bWVudE1vdXNlVXBMaXN0ZW5lciA9IHRoaXMub25Eb2N1bWVudE1vdXNlVXAuYmluZCh0aGlzKTtcbiAgICAgICAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNldXAnLCB0aGlzLmRvY3VtZW50TW91c2VVcExpc3RlbmVyKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgdW5iaW5kRG9jdW1lbnRFdmVudHMoKSB7XG4gICAgICAgIGlmICh0aGlzLmRvY3VtZW50TW91c2VNb3ZlTGlzdGVuZXIpIHtcbiAgICAgICAgICAgIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ21vdXNlbW92ZScsIHRoaXMuZG9jdW1lbnRNb3VzZU1vdmVMaXN0ZW5lcik7XG4gICAgICAgICAgICB0aGlzLmRvY3VtZW50TW91c2VNb3ZlTGlzdGVuZXIgPSBudWxsO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMuZG9jdW1lbnRNb3VzZVVwTGlzdGVuZXIpIHtcbiAgICAgICAgICAgIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ21vdXNldXAnLCB0aGlzLmRvY3VtZW50TW91c2VVcExpc3RlbmVyKTtcbiAgICAgICAgICAgIHRoaXMuZG9jdW1lbnRNb3VzZVVwTGlzdGVuZXIgPSBudWxsO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgb25Nb3VzZURvd24oZXZlbnQ6IE1vdXNlRXZlbnQpIHtcbiAgICAgICAgaWYgKGV2ZW50LndoaWNoID09PSAxKSB7XG4gICAgICAgICAgICB0aGlzLmR0Lm9uQ29sdW1uUmVzaXplQmVnaW4oZXZlbnQpO1xuICAgICAgICAgICAgdGhpcy5iaW5kRG9jdW1lbnRFdmVudHMoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIG9uRG9jdW1lbnRNb3VzZU1vdmUoZXZlbnQ6IE1vdXNlRXZlbnQpIHtcbiAgICAgICAgdGhpcy5kdC5vbkNvbHVtblJlc2l6ZShldmVudCk7XG4gICAgfVxuXG4gICAgb25Eb2N1bWVudE1vdXNlVXAoZXZlbnQ6IE1vdXNlRXZlbnQpIHtcbiAgICAgICAgdGhpcy5kdC5vbkNvbHVtblJlc2l6ZUVuZChldmVudCwgdGhpcy5lbC5uYXRpdmVFbGVtZW50KTtcbiAgICAgICAgdGhpcy51bmJpbmREb2N1bWVudEV2ZW50cygpO1xuICAgIH1cblxuICAgIGlzRW5hYmxlZCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucFJlc2l6YWJsZUNvbHVtbkRpc2FibGVkICE9PSB0cnVlO1xuICAgIH1cblxuICAgIG5nT25EZXN0cm95KCkge1xuICAgICAgICBpZiAodGhpcy5yZXNpemVyTW91c2VEb3duTGlzdGVuZXIpIHtcbiAgICAgICAgICAgIHRoaXMucmVzaXplci5yZW1vdmVFdmVudExpc3RlbmVyKCdtb3VzZWRvd24nLCB0aGlzLnJlc2l6ZXJNb3VzZURvd25MaXN0ZW5lcik7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLnVuYmluZERvY3VtZW50RXZlbnRzKCk7XG4gICAgfVxufVxuXG5ARGlyZWN0aXZlKHtcbiAgICBzZWxlY3RvcjogJ1twUmVvcmRlcmFibGVDb2x1bW5dJ1xufSlcbmV4cG9ydCBjbGFzcyBSZW9yZGVyYWJsZUNvbHVtbiBpbXBsZW1lbnRzIEFmdGVyVmlld0luaXQsIE9uRGVzdHJveSB7XG5cbiAgICBASW5wdXQoKSBwUmVvcmRlcmFibGVDb2x1bW5EaXNhYmxlZDogYm9vbGVhbjtcblxuICAgIGRyYWdTdGFydExpc3RlbmVyOiBhbnk7XG5cbiAgICBkcmFnT3Zlckxpc3RlbmVyOiBhbnk7XG5cbiAgICBkcmFnRW50ZXJMaXN0ZW5lcjogYW55O1xuXG4gICAgZHJhZ0xlYXZlTGlzdGVuZXI6IGFueTtcblxuICAgIG1vdXNlRG93bkxpc3RlbmVyOiBhbnk7XG5cbiAgICBjb25zdHJ1Y3RvcihwdWJsaWMgZHQ6IFRhYmxlLCBwdWJsaWMgZWw6IEVsZW1lbnRSZWYsIHB1YmxpYyB6b25lOiBOZ1pvbmUpIHsgfVxuXG4gICAgbmdBZnRlclZpZXdJbml0KCkge1xuICAgICAgICBpZiAodGhpcy5pc0VuYWJsZWQoKSkge1xuICAgICAgICAgICAgdGhpcy5iaW5kRXZlbnRzKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBiaW5kRXZlbnRzKCkge1xuICAgICAgICB0aGlzLnpvbmUucnVuT3V0c2lkZUFuZ3VsYXIoKCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5tb3VzZURvd25MaXN0ZW5lciA9IHRoaXMub25Nb3VzZURvd24uYmluZCh0aGlzKTtcbiAgICAgICAgICAgIHRoaXMuZWwubmF0aXZlRWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZWRvd24nLCB0aGlzLm1vdXNlRG93bkxpc3RlbmVyKTtcblxuICAgICAgICAgICAgdGhpcy5kcmFnU3RhcnRMaXN0ZW5lciA9IHRoaXMub25EcmFnU3RhcnQuYmluZCh0aGlzKTtcbiAgICAgICAgICAgIHRoaXMuZWwubmF0aXZlRWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdkcmFnc3RhcnQnLCB0aGlzLmRyYWdTdGFydExpc3RlbmVyKTtcblxuICAgICAgICAgICAgdGhpcy5kcmFnT3Zlckxpc3RlbmVyID0gdGhpcy5vbkRyYWdFbnRlci5iaW5kKHRoaXMpO1xuICAgICAgICAgICAgdGhpcy5lbC5uYXRpdmVFbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2RyYWdvdmVyJywgdGhpcy5kcmFnT3Zlckxpc3RlbmVyKTtcblxuICAgICAgICAgICAgdGhpcy5kcmFnRW50ZXJMaXN0ZW5lciA9IHRoaXMub25EcmFnRW50ZXIuYmluZCh0aGlzKTtcbiAgICAgICAgICAgIHRoaXMuZWwubmF0aXZlRWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdkcmFnZW50ZXInLCB0aGlzLmRyYWdFbnRlckxpc3RlbmVyKTtcblxuICAgICAgICAgICAgdGhpcy5kcmFnTGVhdmVMaXN0ZW5lciA9IHRoaXMub25EcmFnTGVhdmUuYmluZCh0aGlzKTtcbiAgICAgICAgICAgIHRoaXMuZWwubmF0aXZlRWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdkcmFnbGVhdmUnLCB0aGlzLmRyYWdMZWF2ZUxpc3RlbmVyKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgdW5iaW5kRXZlbnRzKCkge1xuICAgICAgICBpZiAodGhpcy5tb3VzZURvd25MaXN0ZW5lcikge1xuICAgICAgICAgICAgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcignbW91c2Vkb3duJywgdGhpcy5tb3VzZURvd25MaXN0ZW5lcik7XG4gICAgICAgICAgICB0aGlzLm1vdXNlRG93bkxpc3RlbmVyID0gbnVsbDtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLmRyYWdPdmVyTGlzdGVuZXIpIHtcbiAgICAgICAgICAgIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2RyYWdvdmVyJywgdGhpcy5kcmFnT3Zlckxpc3RlbmVyKTtcbiAgICAgICAgICAgIHRoaXMuZHJhZ092ZXJMaXN0ZW5lciA9IG51bGw7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5kcmFnRW50ZXJMaXN0ZW5lcikge1xuICAgICAgICAgICAgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcignZHJhZ2VudGVyJywgdGhpcy5kcmFnRW50ZXJMaXN0ZW5lcik7XG4gICAgICAgICAgICB0aGlzLmRyYWdFbnRlckxpc3RlbmVyID0gbnVsbDtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLmRyYWdFbnRlckxpc3RlbmVyKSB7XG4gICAgICAgICAgICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdkcmFnZW50ZXInLCB0aGlzLmRyYWdFbnRlckxpc3RlbmVyKTtcbiAgICAgICAgICAgIHRoaXMuZHJhZ0VudGVyTGlzdGVuZXIgPSBudWxsO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMuZHJhZ0xlYXZlTGlzdGVuZXIpIHtcbiAgICAgICAgICAgIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2RyYWdsZWF2ZScsIHRoaXMuZHJhZ0xlYXZlTGlzdGVuZXIpO1xuICAgICAgICAgICAgdGhpcy5kcmFnTGVhdmVMaXN0ZW5lciA9IG51bGw7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBvbk1vdXNlRG93bihldmVudCkge1xuICAgICAgICBpZiAoZXZlbnQudGFyZ2V0Lm5vZGVOYW1lID09PSAnSU5QVVQnIHx8IGV2ZW50LnRhcmdldC5ub2RlTmFtZSA9PT0gJ1RFWFRBUkVBJyB8fCBEb21IYW5kbGVyLmhhc0NsYXNzKGV2ZW50LnRhcmdldCwgJ3AtY29sdW1uLXJlc2l6ZXInKSlcbiAgICAgICAgICAgIHRoaXMuZWwubmF0aXZlRWxlbWVudC5kcmFnZ2FibGUgPSBmYWxzZTtcbiAgICAgICAgZWxzZVxuICAgICAgICAgICAgdGhpcy5lbC5uYXRpdmVFbGVtZW50LmRyYWdnYWJsZSA9IHRydWU7XG4gICAgfVxuXG4gICAgb25EcmFnU3RhcnQoZXZlbnQpIHtcbiAgICAgICAgdGhpcy5kdC5vbkNvbHVtbkRyYWdTdGFydChldmVudCwgdGhpcy5lbC5uYXRpdmVFbGVtZW50KTtcbiAgICB9XG5cbiAgICBvbkRyYWdPdmVyKGV2ZW50KSB7XG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgfVxuXG4gICAgb25EcmFnRW50ZXIoZXZlbnQpIHtcbiAgICAgICAgdGhpcy5kdC5vbkNvbHVtbkRyYWdFbnRlcihldmVudCwgdGhpcy5lbC5uYXRpdmVFbGVtZW50KTtcbiAgICB9XG5cbiAgICBvbkRyYWdMZWF2ZShldmVudCkge1xuICAgICAgICB0aGlzLmR0Lm9uQ29sdW1uRHJhZ0xlYXZlKGV2ZW50KTtcbiAgICB9XG5cbiAgICBASG9zdExpc3RlbmVyKCdkcm9wJywgWyckZXZlbnQnXSlcbiAgICBvbkRyb3AoZXZlbnQpIHtcbiAgICAgICAgaWYgKHRoaXMuaXNFbmFibGVkKCkpIHtcbiAgICAgICAgICAgIHRoaXMuZHQub25Db2x1bW5Ecm9wKGV2ZW50LCB0aGlzLmVsLm5hdGl2ZUVsZW1lbnQpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgaXNFbmFibGVkKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5wUmVvcmRlcmFibGVDb2x1bW5EaXNhYmxlZCAhPT0gdHJ1ZTtcbiAgICB9XG5cbiAgICBuZ09uRGVzdHJveSgpIHtcbiAgICAgICAgdGhpcy51bmJpbmRFdmVudHMoKTtcbiAgICB9XG5cbn1cblxuQERpcmVjdGl2ZSh7XG4gICAgc2VsZWN0b3I6ICdbcEVkaXRhYmxlQ29sdW1uXSdcbn0pXG5leHBvcnQgY2xhc3MgRWRpdGFibGVDb2x1bW4gaW1wbGVtZW50cyBBZnRlclZpZXdJbml0IHtcblxuICAgIEBJbnB1dChcInBFZGl0YWJsZUNvbHVtblwiKSBkYXRhOiBhbnk7XG5cbiAgICBASW5wdXQoXCJwRWRpdGFibGVDb2x1bW5GaWVsZFwiKSBmaWVsZDogYW55O1xuXG4gICAgQElucHV0KFwicEVkaXRhYmxlQ29sdW1uUm93SW5kZXhcIikgcm93SW5kZXg6IG51bWJlcjtcblxuICAgIEBJbnB1dCgpIHBFZGl0YWJsZUNvbHVtbkRpc2FibGVkOiBib29sZWFuO1xuXG4gICAgQElucHV0KCkgcEZvY3VzQ2VsbFNlbGVjdG9yOiBzdHJpbmc7XG5cbiAgICBjb25zdHJ1Y3RvcihwdWJsaWMgZHQ6IFRhYmxlLCBwdWJsaWMgZWw6IEVsZW1lbnRSZWYsIHB1YmxpYyB6b25lOiBOZ1pvbmUpIHt9XG5cbiAgICBuZ0FmdGVyVmlld0luaXQoKSB7XG4gICAgICAgIGlmICh0aGlzLmlzRW5hYmxlZCgpKSB7XG4gICAgICAgICAgICBEb21IYW5kbGVyLmFkZENsYXNzKHRoaXMuZWwubmF0aXZlRWxlbWVudCwgJ3AtZWRpdGFibGUtY29sdW1uJyk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBASG9zdExpc3RlbmVyKCdjbGljaycsIFsnJGV2ZW50J10pXG4gICAgb25DbGljayhldmVudDogTW91c2VFdmVudCkge1xuICAgICAgICBpZiAodGhpcy5pc0VuYWJsZWQoKSkge1xuICAgICAgICAgICAgdGhpcy5kdC5lZGl0aW5nQ2VsbENsaWNrID0gdHJ1ZTtcblxuICAgICAgICAgICAgaWYgKHRoaXMuZHQuZWRpdGluZ0NlbGwpIHtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5kdC5lZGl0aW5nQ2VsbCAhPT0gdGhpcy5lbC5uYXRpdmVFbGVtZW50KSB7XG4gICAgICAgICAgICAgICAgICAgIGlmICghdGhpcy5kdC5pc0VkaXRpbmdDZWxsVmFsaWQoKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jbG9zZUVkaXRpbmdDZWxsKHRydWUsIGV2ZW50KTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5vcGVuQ2VsbCgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMub3BlbkNlbGwoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIG9wZW5DZWxsKCkge1xuICAgICAgICB0aGlzLmR0LnVwZGF0ZUVkaXRpbmdDZWxsKHRoaXMuZWwubmF0aXZlRWxlbWVudCwgdGhpcy5kYXRhLCB0aGlzLmZpZWxkLCB0aGlzLnJvd0luZGV4KTtcbiAgICAgICAgRG9tSGFuZGxlci5hZGRDbGFzcyh0aGlzLmVsLm5hdGl2ZUVsZW1lbnQsICdwLWNlbGwtZWRpdGluZycpO1xuICAgICAgICB0aGlzLmR0Lm9uRWRpdEluaXQuZW1pdCh7ZmllbGQ6IHRoaXMuZmllbGQsIGRhdGE6IHRoaXMuZGF0YSwgaW5kZXg6IHRoaXMucm93SW5kZXh9KTtcbiAgICAgICAgdGhpcy56b25lLnJ1bk91dHNpZGVBbmd1bGFyKCgpID0+IHtcbiAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgICAgIGxldCBmb2N1c0NlbGxTZWxlY3RvciA9IHRoaXMucEZvY3VzQ2VsbFNlbGVjdG9yIHx8ICdpbnB1dCwgdGV4dGFyZWEsIHNlbGVjdCc7XG4gICAgICAgICAgICAgICAgbGV0IGZvY3VzYWJsZUVsZW1lbnQgPSBEb21IYW5kbGVyLmZpbmRTaW5nbGUodGhpcy5lbC5uYXRpdmVFbGVtZW50LCBmb2N1c0NlbGxTZWxlY3Rvcik7XG5cbiAgICAgICAgICAgICAgICBpZiAoZm9jdXNhYmxlRWxlbWVudCkge1xuICAgICAgICAgICAgICAgICAgICBmb2N1c2FibGVFbGVtZW50LmZvY3VzKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSwgNTApO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBjbG9zZUVkaXRpbmdDZWxsKGNvbXBsZXRlZCwgZXZlbnQpIHtcbiAgICAgICAgaWYgKGNvbXBsZXRlZClcbiAgICAgICAgICAgIHRoaXMuZHQub25FZGl0Q29tcGxldGUuZW1pdCh7ZmllbGQ6IHRoaXMuZHQuZWRpdGluZ0NlbGxGaWVsZCwgZGF0YTogdGhpcy5kdC5lZGl0aW5nQ2VsbERhdGEsIG9yaWdpbmFsRXZlbnQ6IGV2ZW50LCBpbmRleDogdGhpcy5kdC5lZGl0aW5nQ2VsbFJvd0luZGV4fSk7XG4gICAgICAgIGVsc2VcbiAgICAgICAgICAgIHRoaXMuZHQub25FZGl0Q2FuY2VsLmVtaXQoe2ZpZWxkOiB0aGlzLmR0LmVkaXRpbmdDZWxsRmllbGQsIGRhdGE6IHRoaXMuZHQuZWRpdGluZ0NlbGxEYXRhLCBvcmlnaW5hbEV2ZW50OiBldmVudCwgaW5kZXg6IHRoaXMuZHQuZWRpdGluZ0NlbGxSb3dJbmRleH0pO1xuXG4gICAgICAgIERvbUhhbmRsZXIucmVtb3ZlQ2xhc3ModGhpcy5kdC5lZGl0aW5nQ2VsbCwgJ3AtY2VsbC1lZGl0aW5nJyk7XG4gICAgICAgIHRoaXMuZHQuZWRpdGluZ0NlbGwgPSBudWxsO1xuICAgICAgICB0aGlzLmR0LmVkaXRpbmdDZWxsRGF0YSA9IG51bGw7XG4gICAgICAgIHRoaXMuZHQuZWRpdGluZ0NlbGxGaWVsZCA9IG51bGw7XG4gICAgICAgIHRoaXMuZHQudW5iaW5kRG9jdW1lbnRFZGl0TGlzdGVuZXIoKTtcbiAgICB9XG5cbiAgICBASG9zdExpc3RlbmVyKCdrZXlkb3duLmVudGVyJywgWyckZXZlbnQnXSlcbiAgICBvbkVudGVyS2V5RG93bihldmVudDogS2V5Ym9hcmRFdmVudCkge1xuICAgICAgICBpZiAodGhpcy5pc0VuYWJsZWQoKSkge1xuICAgICAgICAgICAgaWYgKHRoaXMuZHQuaXNFZGl0aW5nQ2VsbFZhbGlkKCkpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmNsb3NlRWRpdGluZ0NlbGwodHJ1ZSwgZXZlbnQpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgQEhvc3RMaXN0ZW5lcigna2V5ZG93bi5lc2NhcGUnLCBbJyRldmVudCddKVxuICAgIG9uRXNjYXBlS2V5RG93bihldmVudDogS2V5Ym9hcmRFdmVudCkge1xuICAgICAgICBpZiAodGhpcy5pc0VuYWJsZWQoKSkge1xuICAgICAgICAgICAgaWYgKHRoaXMuZHQuaXNFZGl0aW5nQ2VsbFZhbGlkKCkpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmNsb3NlRWRpdGluZ0NlbGwoZmFsc2UsIGV2ZW50KTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIEBIb3N0TGlzdGVuZXIoJ2tleWRvd24udGFiJywgWyckZXZlbnQnXSlcbiAgICBASG9zdExpc3RlbmVyKCdrZXlkb3duLnNoaWZ0LnRhYicsIFsnJGV2ZW50J10pXG4gICAgQEhvc3RMaXN0ZW5lcigna2V5ZG93bi5tZXRhLnRhYicsIFsnJGV2ZW50J10pXG4gICAgb25TaGlmdEtleURvd24oZXZlbnQ6IEtleWJvYXJkRXZlbnQpIHtcbiAgICAgICAgaWYgKHRoaXMuaXNFbmFibGVkKCkpIHtcbiAgICAgICAgICAgIGlmIChldmVudC5zaGlmdEtleSlcbiAgICAgICAgICAgICAgICB0aGlzLm1vdmVUb1ByZXZpb3VzQ2VsbChldmVudCk7XG4gICAgICAgICAgICBlbHNle1xuICAgICAgICAgICAgICAgIHRoaXMubW92ZVRvTmV4dENlbGwoZXZlbnQpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICAgIEBIb3N0TGlzdGVuZXIoJ2tleWRvd24uYXJyb3dkb3duJywgWyckZXZlbnQnXSlcbiAgICBvbkFycm93RG93bihldmVudDogS2V5Ym9hcmRFdmVudCkge1xuICAgICAgICBpZiAodGhpcy5pc0VuYWJsZWQoKSkge1xuICAgICAgICAgICAgbGV0IGN1cnJlbnRDZWxsID0gdGhpcy5maW5kQ2VsbChldmVudC50YXJnZXQpO1xuICAgICAgICAgICAgaWYgKGN1cnJlbnRDZWxsKSB7XG4gICAgICAgICAgICAgICAgbGV0IGNlbGxJbmRleCA9IERvbUhhbmRsZXIuaW5kZXgoY3VycmVudENlbGwpO1xuICAgICAgICAgICAgICAgIGxldCB0YXJnZXRDZWxsID0gdGhpcy5maW5kTmV4dEVkaXRhYmxlQ29sdW1uQnlJbmRleChjdXJyZW50Q2VsbCwgY2VsbEluZGV4KTtcblxuICAgICAgICAgICAgICAgIGlmICh0YXJnZXRDZWxsKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLmR0LmlzRWRpdGluZ0NlbGxWYWxpZCgpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmNsb3NlRWRpdGluZ0NlbGwodHJ1ZSwgZXZlbnQpO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgRG9tSGFuZGxlci5pbnZva2VFbGVtZW50TWV0aG9kKGV2ZW50LnRhcmdldCwgJ2JsdXInKTtcbiAgICAgICAgICAgICAgICAgICAgRG9tSGFuZGxlci5pbnZva2VFbGVtZW50TWV0aG9kKHRhcmdldENlbGwsICdjbGljaycpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBASG9zdExpc3RlbmVyKCdrZXlkb3duLmFycm93dXAnLCBbJyRldmVudCddKVxuICAgIG9uQXJyb3dVcChldmVudDogS2V5Ym9hcmRFdmVudCkge1xuICAgICAgICBpZiAodGhpcy5pc0VuYWJsZWQoKSkge1xuICAgICAgICAgICAgbGV0IGN1cnJlbnRDZWxsID0gdGhpcy5maW5kQ2VsbChldmVudC50YXJnZXQpO1xuICAgICAgICAgICAgaWYgKGN1cnJlbnRDZWxsKSB7XG4gICAgICAgICAgICAgICAgbGV0IGNlbGxJbmRleCA9IERvbUhhbmRsZXIuaW5kZXgoY3VycmVudENlbGwpO1xuICAgICAgICAgICAgICAgIGxldCB0YXJnZXRDZWxsID0gdGhpcy5maW5kUHJldkVkaXRhYmxlQ29sdW1uQnlJbmRleChjdXJyZW50Q2VsbCwgY2VsbEluZGV4KTtcblxuICAgICAgICAgICAgICAgIGlmICh0YXJnZXRDZWxsKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLmR0LmlzRWRpdGluZ0NlbGxWYWxpZCgpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmNsb3NlRWRpdGluZ0NlbGwodHJ1ZSwgZXZlbnQpO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgRG9tSGFuZGxlci5pbnZva2VFbGVtZW50TWV0aG9kKGV2ZW50LnRhcmdldCwgJ2JsdXInKTtcbiAgICAgICAgICAgICAgICAgICAgRG9tSGFuZGxlci5pbnZva2VFbGVtZW50TWV0aG9kKHRhcmdldENlbGwsICdjbGljaycpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgQEhvc3RMaXN0ZW5lcigna2V5ZG93bi5hcnJvd2xlZnQnLCBbJyRldmVudCddKVxuICAgIG9uQXJyb3dMZWZ0KGV2ZW50OiBLZXlib2FyZEV2ZW50KSB7XG4gICAgICAgIGlmICh0aGlzLmlzRW5hYmxlZCgpKSB7XG4gICAgICAgICAgICB0aGlzLm1vdmVUb1ByZXZpb3VzQ2VsbChldmVudCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBASG9zdExpc3RlbmVyKCdrZXlkb3duLmFycm93cmlnaHQnLCBbJyRldmVudCddKVxuICAgIG9uQXJyb3dSaWdodChldmVudDogS2V5Ym9hcmRFdmVudCkge1xuICAgICAgICBpZiAodGhpcy5pc0VuYWJsZWQoKSkge1xuICAgICAgICAgICAgdGhpcy5tb3ZlVG9OZXh0Q2VsbChldmVudCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBmaW5kQ2VsbChlbGVtZW50KSB7XG4gICAgICAgIGlmIChlbGVtZW50KSB7XG4gICAgICAgICAgICBsZXQgY2VsbCA9IGVsZW1lbnQ7XG4gICAgICAgICAgICB3aGlsZSAoY2VsbCAmJiAhRG9tSGFuZGxlci5oYXNDbGFzcyhjZWxsLCAncC1jZWxsLWVkaXRpbmcnKSkge1xuICAgICAgICAgICAgICAgIGNlbGwgPSBjZWxsLnBhcmVudEVsZW1lbnQ7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiBjZWxsO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBtb3ZlVG9QcmV2aW91c0NlbGwoZXZlbnQ6IEtleWJvYXJkRXZlbnQpIHtcbiAgICAgICAgbGV0IGN1cnJlbnRDZWxsID0gdGhpcy5maW5kQ2VsbChldmVudC50YXJnZXQpO1xuICAgICAgICBpZiAoY3VycmVudENlbGwpIHtcbiAgICAgICAgICAgIGxldCB0YXJnZXRDZWxsID0gdGhpcy5maW5kUHJldmlvdXNFZGl0YWJsZUNvbHVtbihjdXJyZW50Q2VsbCk7XG5cbiAgICAgICAgICAgIGlmICh0YXJnZXRDZWxsKSB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuZHQuaXNFZGl0aW5nQ2VsbFZhbGlkKCkpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jbG9zZUVkaXRpbmdDZWxsKHRydWUsIGV2ZW50KTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBEb21IYW5kbGVyLmludm9rZUVsZW1lbnRNZXRob2QoZXZlbnQudGFyZ2V0LCAnYmx1cicpO1xuICAgICAgICAgICAgICAgIERvbUhhbmRsZXIuaW52b2tlRWxlbWVudE1ldGhvZCh0YXJnZXRDZWxsLCAnY2xpY2snKTtcbiAgICAgICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgbW92ZVRvTmV4dENlbGwoZXZlbnQ6IEtleWJvYXJkRXZlbnQpIHtcbiAgICAgICAgbGV0IGN1cnJlbnRDZWxsID0gdGhpcy5maW5kQ2VsbChldmVudC50YXJnZXQpO1xuICAgICAgICBpZiAoY3VycmVudENlbGwpIHtcbiAgICAgICAgICAgIGxldCB0YXJnZXRDZWxsID0gdGhpcy5maW5kTmV4dEVkaXRhYmxlQ29sdW1uKGN1cnJlbnRDZWxsKTtcblxuICAgICAgICAgICAgaWYgKHRhcmdldENlbGwpIHtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5kdC5pc0VkaXRpbmdDZWxsVmFsaWQoKSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmNsb3NlRWRpdGluZ0NlbGwodHJ1ZSwgZXZlbnQpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIERvbUhhbmRsZXIuaW52b2tlRWxlbWVudE1ldGhvZChldmVudC50YXJnZXQsICdibHVyJyk7XG4gICAgICAgICAgICAgICAgRG9tSGFuZGxlci5pbnZva2VFbGVtZW50TWV0aG9kKHRhcmdldENlbGwsICdjbGljaycpO1xuICAgICAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBmaW5kUHJldmlvdXNFZGl0YWJsZUNvbHVtbihjZWxsOiBFbGVtZW50KSB7XG4gICAgICAgIGxldCBwcmV2Q2VsbCA9IGNlbGwucHJldmlvdXNFbGVtZW50U2libGluZztcblxuICAgICAgICBpZiAoIXByZXZDZWxsKSB7XG4gICAgICAgICAgICBsZXQgcHJldmlvdXNSb3cgPSBjZWxsLnBhcmVudEVsZW1lbnQucHJldmlvdXNFbGVtZW50U2libGluZztcbiAgICAgICAgICAgIGlmIChwcmV2aW91c1Jvdykge1xuICAgICAgICAgICAgICAgIHByZXZDZWxsID0gcHJldmlvdXNSb3cubGFzdEVsZW1lbnRDaGlsZDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChwcmV2Q2VsbCkge1xuICAgICAgICAgICAgaWYgKERvbUhhbmRsZXIuaGFzQ2xhc3MocHJldkNlbGwsICdwLWVkaXRhYmxlLWNvbHVtbicpKVxuICAgICAgICAgICAgICAgIHJldHVybiBwcmV2Q2VsbDtcbiAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5maW5kUHJldmlvdXNFZGl0YWJsZUNvbHVtbihwcmV2Q2VsbCk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGZpbmROZXh0RWRpdGFibGVDb2x1bW4oY2VsbDogRWxlbWVudCkge1xuICAgICAgICBsZXQgbmV4dENlbGwgPSBjZWxsLm5leHRFbGVtZW50U2libGluZztcblxuICAgICAgICBpZiAoIW5leHRDZWxsKSB7XG4gICAgICAgICAgICBsZXQgbmV4dFJvdyA9IGNlbGwucGFyZW50RWxlbWVudC5uZXh0RWxlbWVudFNpYmxpbmc7XG4gICAgICAgICAgICBpZiAobmV4dFJvdykge1xuICAgICAgICAgICAgICAgIG5leHRDZWxsID0gbmV4dFJvdy5maXJzdEVsZW1lbnRDaGlsZDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChuZXh0Q2VsbCkge1xuICAgICAgICAgICAgaWYgKERvbUhhbmRsZXIuaGFzQ2xhc3MobmV4dENlbGwsICdwLWVkaXRhYmxlLWNvbHVtbicpKVxuICAgICAgICAgICAgICAgIHJldHVybiBuZXh0Q2VsbDtcbiAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5maW5kTmV4dEVkaXRhYmxlQ29sdW1uKG5leHRDZWxsKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZmluZE5leHRFZGl0YWJsZUNvbHVtbkJ5SW5kZXgoY2VsbDogRWxlbWVudCwgaW5kZXg6IG51bWJlcikge1xuICAgICAgICBsZXQgbmV4dFJvdyA9IGNlbGwucGFyZW50RWxlbWVudC5uZXh0RWxlbWVudFNpYmxpbmc7XG5cbiAgICAgICAgaWYgKG5leHRSb3cpIHtcbiAgICAgICAgICAgIGxldCBuZXh0Q2VsbCA9IG5leHRSb3cuY2hpbGRyZW5baW5kZXhdO1xuXG4gICAgICAgICAgICBpZiAobmV4dENlbGwgJiYgRG9tSGFuZGxlci5oYXNDbGFzcyhuZXh0Q2VsbCwgJ3AtZWRpdGFibGUtY29sdW1uJykpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gbmV4dENlbGw7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBmaW5kUHJldkVkaXRhYmxlQ29sdW1uQnlJbmRleChjZWxsOiBFbGVtZW50LCBpbmRleDogbnVtYmVyKSB7XG4gICAgICAgIGxldCBwcmV2Um93ID0gY2VsbC5wYXJlbnRFbGVtZW50LnByZXZpb3VzRWxlbWVudFNpYmxpbmc7XG5cbiAgICAgICAgaWYgKHByZXZSb3cpIHtcbiAgICAgICAgICAgIGxldCBwcmV2Q2VsbCA9IHByZXZSb3cuY2hpbGRyZW5baW5kZXhdO1xuXG4gICAgICAgICAgICBpZiAocHJldkNlbGwgJiYgRG9tSGFuZGxlci5oYXNDbGFzcyhwcmV2Q2VsbCwgJ3AtZWRpdGFibGUtY29sdW1uJykpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gcHJldkNlbGw7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBpc0VuYWJsZWQoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnBFZGl0YWJsZUNvbHVtbkRpc2FibGVkICE9PSB0cnVlO1xuICAgIH1cblxufVxuXG5ARGlyZWN0aXZlKHtcbiAgICBzZWxlY3RvcjogJ1twRWRpdGFibGVSb3ddJ1xufSlcbmV4cG9ydCBjbGFzcyBFZGl0YWJsZVJvdyB7XG5cbiAgICBASW5wdXQoXCJwRWRpdGFibGVSb3dcIikgZGF0YTogYW55O1xuXG4gICAgQElucHV0KCkgcEVkaXRhYmxlUm93RGlzYWJsZWQ6IGJvb2xlYW47XG5cbiAgICBjb25zdHJ1Y3RvcihwdWJsaWMgZWw6IEVsZW1lbnRSZWYpIHt9XG5cbiAgICBpc0VuYWJsZWQoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnBFZGl0YWJsZVJvd0Rpc2FibGVkICE9PSB0cnVlO1xuICAgIH1cblxufVxuXG5ARGlyZWN0aXZlKHtcbiAgICBzZWxlY3RvcjogJ1twSW5pdEVkaXRhYmxlUm93XSdcbn0pXG5leHBvcnQgY2xhc3MgSW5pdEVkaXRhYmxlUm93IHtcblxuICAgIGNvbnN0cnVjdG9yKHB1YmxpYyBkdDogVGFibGUsIHB1YmxpYyBlZGl0YWJsZVJvdzogRWRpdGFibGVSb3cpIHt9XG5cbiAgICBASG9zdExpc3RlbmVyKCdjbGljaycsIFsnJGV2ZW50J10pXG4gICAgb25DbGljayhldmVudDogRXZlbnQpIHtcbiAgICAgICAgdGhpcy5kdC5pbml0Um93RWRpdCh0aGlzLmVkaXRhYmxlUm93LmRhdGEpO1xuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIH1cblxufVxuXG5ARGlyZWN0aXZlKHtcbiAgICBzZWxlY3RvcjogJ1twU2F2ZUVkaXRhYmxlUm93XSdcbn0pXG5leHBvcnQgY2xhc3MgU2F2ZUVkaXRhYmxlUm93IHtcblxuICAgIGNvbnN0cnVjdG9yKHB1YmxpYyBkdDogVGFibGUsIHB1YmxpYyBlZGl0YWJsZVJvdzogRWRpdGFibGVSb3cpIHt9XG5cbiAgICBASG9zdExpc3RlbmVyKCdjbGljaycsIFsnJGV2ZW50J10pXG4gICAgb25DbGljayhldmVudDogRXZlbnQpIHtcbiAgICAgICAgdGhpcy5kdC5zYXZlUm93RWRpdCh0aGlzLmVkaXRhYmxlUm93LmRhdGEsIHRoaXMuZWRpdGFibGVSb3cuZWwubmF0aXZlRWxlbWVudCk7XG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgfVxufVxuXG5ARGlyZWN0aXZlKHtcbiAgICBzZWxlY3RvcjogJ1twQ2FuY2VsRWRpdGFibGVSb3ddJ1xufSlcbmV4cG9ydCBjbGFzcyBDYW5jZWxFZGl0YWJsZVJvdyB7XG5cbiAgICBjb25zdHJ1Y3RvcihwdWJsaWMgZHQ6IFRhYmxlLCBwdWJsaWMgZWRpdGFibGVSb3c6IEVkaXRhYmxlUm93KSB7fVxuXG4gICAgQEhvc3RMaXN0ZW5lcignY2xpY2snLCBbJyRldmVudCddKVxuICAgIG9uQ2xpY2soZXZlbnQ6IEV2ZW50KSB7XG4gICAgICAgIHRoaXMuZHQuY2FuY2VsUm93RWRpdCh0aGlzLmVkaXRhYmxlUm93LmRhdGEpO1xuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIH1cbn1cblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICdwLWNlbGxFZGl0b3InLFxuICAgIHRlbXBsYXRlOiBgXG4gICAgICAgIDxuZy1jb250YWluZXIgKm5nSWY9XCJlZGl0aW5nXCI+XG4gICAgICAgICAgICA8bmctY29udGFpbmVyICpuZ1RlbXBsYXRlT3V0bGV0PVwiaW5wdXRUZW1wbGF0ZVwiPjwvbmctY29udGFpbmVyPlxuICAgICAgICA8L25nLWNvbnRhaW5lcj5cbiAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdJZj1cIiFlZGl0aW5nXCI+XG4gICAgICAgICAgICA8bmctY29udGFpbmVyICpuZ1RlbXBsYXRlT3V0bGV0PVwib3V0cHV0VGVtcGxhdGVcIj48L25nLWNvbnRhaW5lcj5cbiAgICAgICAgPC9uZy1jb250YWluZXI+XG4gICAgYCxcbiAgICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lXG59KVxuZXhwb3J0IGNsYXNzIENlbGxFZGl0b3IgaW1wbGVtZW50cyBBZnRlckNvbnRlbnRJbml0IHtcblxuICAgIEBDb250ZW50Q2hpbGRyZW4oUHJpbWVUZW1wbGF0ZSkgdGVtcGxhdGVzOiBRdWVyeUxpc3Q8UHJpbWVUZW1wbGF0ZT47XG5cbiAgICBpbnB1dFRlbXBsYXRlOiBUZW1wbGF0ZVJlZjxhbnk+O1xuXG4gICAgb3V0cHV0VGVtcGxhdGU6IFRlbXBsYXRlUmVmPGFueT47XG5cbiAgICBjb25zdHJ1Y3RvcihwdWJsaWMgZHQ6IFRhYmxlLCBAT3B0aW9uYWwoKSBwdWJsaWMgZWRpdGFibGVDb2x1bW46IEVkaXRhYmxlQ29sdW1uLCBAT3B0aW9uYWwoKSBwdWJsaWMgZWRpdGFibGVSb3c6IEVkaXRhYmxlUm93KSB7IH1cblxuICAgIG5nQWZ0ZXJDb250ZW50SW5pdCgpIHtcbiAgICAgICAgdGhpcy50ZW1wbGF0ZXMuZm9yRWFjaCgoaXRlbSkgPT4ge1xuICAgICAgICAgICAgc3dpdGNoIChpdGVtLmdldFR5cGUoKSkge1xuICAgICAgICAgICAgICAgIGNhc2UgJ2lucHV0JzpcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5pbnB1dFRlbXBsYXRlID0gaXRlbS50ZW1wbGF0ZTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgICAgICBjYXNlICdvdXRwdXQnOlxuICAgICAgICAgICAgICAgICAgICB0aGlzLm91dHB1dFRlbXBsYXRlID0gaXRlbS50ZW1wbGF0ZTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGdldCBlZGl0aW5nKCk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gKHRoaXMuZHQuZWRpdGluZ0NlbGwgJiYgdGhpcy5lZGl0YWJsZUNvbHVtbiAmJiB0aGlzLmR0LmVkaXRpbmdDZWxsID09PSB0aGlzLmVkaXRhYmxlQ29sdW1uLmVsLm5hdGl2ZUVsZW1lbnQpIHx8XG4gICAgICAgICAgICAgICAgKHRoaXMuZWRpdGFibGVSb3cgJiYgdGhpcy5kdC5lZGl0TW9kZSA9PT0gJ3JvdycgJiYgdGhpcy5kdC5pc1Jvd0VkaXRpbmcodGhpcy5lZGl0YWJsZVJvdy5kYXRhKSk7XG4gICAgfVxuXG59XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAncC10YWJsZVJhZGlvQnV0dG9uJyxcbiAgICB0ZW1wbGF0ZTogYFxuICAgICAgICA8ZGl2IGNsYXNzPVwicC1yYWRpb2J1dHRvbiBwLWNvbXBvbmVudFwiIChjbGljayk9XCJvbkNsaWNrKCRldmVudClcIj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJwLWhpZGRlbi1hY2Nlc3NpYmxlXCI+XG4gICAgICAgICAgICAgICAgPGlucHV0IHR5cGU9XCJyYWRpb1wiIFthdHRyLmlkXT1cImlucHV0SWRcIiBbYXR0ci5uYW1lXT1cIm5hbWVcIiBbY2hlY2tlZF09XCJjaGVja2VkXCIgKGZvY3VzKT1cIm9uRm9jdXMoKVwiIChibHVyKT1cIm9uQmx1cigpXCJcbiAgICAgICAgICAgICAgICBbZGlzYWJsZWRdPVwiZGlzYWJsZWRcIiBbYXR0ci5hcmlhLWxhYmVsXT1cImFyaWFMYWJlbFwiPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8ZGl2ICNib3ggW25nQ2xhc3NdPVwieydwLXJhZGlvYnV0dG9uLWJveCBwLWNvbXBvbmVudCc6dHJ1ZSxcbiAgICAgICAgICAgICAgICAncC1oaWdobGlnaHQnOmNoZWNrZWQsICdwLWRpc2FibGVkJzpkaXNhYmxlZH1cIiByb2xlPVwicmFkaW9cIiBbYXR0ci5hcmlhLWNoZWNrZWRdPVwiY2hlY2tlZFwiPlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJwLXJhZGlvYnV0dG9uLWljb25cIj48L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICBgLFxuICAgIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxuICAgIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmVcbn0pXG5leHBvcnQgY2xhc3MgVGFibGVSYWRpb0J1dHRvbiAge1xuXG4gICAgQElucHV0KCkgZGlzYWJsZWQ6IGJvb2xlYW47XG5cbiAgICBASW5wdXQoKSB2YWx1ZTogYW55O1xuXG4gICAgQElucHV0KCkgaW5kZXg6IG51bWJlcjtcblxuICAgIEBJbnB1dCgpIGlucHV0SWQ6IHN0cmluZztcblxuICAgIEBJbnB1dCgpIG5hbWU6IHN0cmluZztcblxuICAgIEBJbnB1dCgpIGFyaWFMYWJlbDogc3RyaW5nO1xuXG4gICAgQFZpZXdDaGlsZCgnYm94JykgYm94Vmlld0NoaWxkOiBFbGVtZW50UmVmO1xuXG4gICAgY2hlY2tlZDogYm9vbGVhbjtcblxuICAgIHN1YnNjcmlwdGlvbjogU3Vic2NyaXB0aW9uO1xuXG4gICAgY29uc3RydWN0b3IocHVibGljIGR0OiBUYWJsZSwgcHVibGljIHRhYmxlU2VydmljZTogVGFibGVTZXJ2aWNlLCBwdWJsaWMgY2Q6IENoYW5nZURldGVjdG9yUmVmKSB7XG4gICAgICAgIHRoaXMuc3Vic2NyaXB0aW9uID0gdGhpcy5kdC50YWJsZVNlcnZpY2Uuc2VsZWN0aW9uU291cmNlJC5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5jaGVja2VkID0gdGhpcy5kdC5pc1NlbGVjdGVkKHRoaXMudmFsdWUpO1xuICAgICAgICAgICAgdGhpcy5jZC5tYXJrRm9yQ2hlY2soKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgbmdPbkluaXQoKSB7XG4gICAgICAgIHRoaXMuY2hlY2tlZCA9IHRoaXMuZHQuaXNTZWxlY3RlZCh0aGlzLnZhbHVlKTtcbiAgICB9XG5cbiAgICBvbkNsaWNrKGV2ZW50OiBFdmVudCkge1xuICAgICAgICBpZiAoIXRoaXMuZGlzYWJsZWQpIHtcbiAgICAgICAgICAgIHRoaXMuZHQudG9nZ2xlUm93V2l0aFJhZGlvKHtcbiAgICAgICAgICAgICAgICBvcmlnaW5hbEV2ZW50OiBldmVudCxcbiAgICAgICAgICAgICAgICByb3dJbmRleDogdGhpcy5pbmRleFxuICAgICAgICAgICAgfSwgdGhpcy52YWx1ZSk7XG4gICAgICAgIH1cbiAgICAgICAgRG9tSGFuZGxlci5jbGVhclNlbGVjdGlvbigpO1xuICAgIH1cblxuICAgIG9uRm9jdXMoKSB7XG4gICAgICAgIERvbUhhbmRsZXIuYWRkQ2xhc3ModGhpcy5ib3hWaWV3Q2hpbGQubmF0aXZlRWxlbWVudCwgJ3AtZm9jdXMnKTtcbiAgICB9XG5cbiAgICBvbkJsdXIoKSB7XG4gICAgICAgIERvbUhhbmRsZXIucmVtb3ZlQ2xhc3ModGhpcy5ib3hWaWV3Q2hpbGQubmF0aXZlRWxlbWVudCwgJ3AtZm9jdXMnKTtcbiAgICB9XG5cbiAgICBuZ09uRGVzdHJveSgpIHtcbiAgICAgICAgaWYgKHRoaXMuc3Vic2NyaXB0aW9uKSB7XG4gICAgICAgICAgICB0aGlzLnN1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xuICAgICAgICB9XG4gICAgfVxuXG59XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAncC10YWJsZUNoZWNrYm94JyxcbiAgICB0ZW1wbGF0ZTogYFxuICAgICAgICA8ZGl2IGNsYXNzPVwicC1jaGVja2JveCBwLWNvbXBvbmVudFwiIChjbGljayk9XCJvbkNsaWNrKCRldmVudClcIj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJwLWhpZGRlbi1hY2Nlc3NpYmxlXCI+XG4gICAgICAgICAgICAgICAgPGlucHV0IHR5cGU9XCJjaGVja2JveFwiIFthdHRyLmlkXT1cImlucHV0SWRcIiBbYXR0ci5uYW1lXT1cIm5hbWVcIiBbY2hlY2tlZF09XCJjaGVja2VkXCIgKGZvY3VzKT1cIm9uRm9jdXMoKVwiIChibHVyKT1cIm9uQmx1cigpXCIgW2Rpc2FibGVkXT1cImRpc2FibGVkXCJcbiAgICAgICAgICAgICAgICBbYXR0ci5yZXF1aXJlZF09XCJyZXF1aXJlZFwiIFthdHRyLmFyaWEtbGFiZWxdPVwiYXJpYUxhYmVsXCI+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDxkaXYgI2JveCBbbmdDbGFzc109XCJ7J3AtY2hlY2tib3gtYm94IHAtY29tcG9uZW50Jzp0cnVlLFxuICAgICAgICAgICAgICAgICdwLWhpZ2hsaWdodCc6Y2hlY2tlZCwgJ3AtZGlzYWJsZWQnOmRpc2FibGVkfVwiIHJvbGU9XCJjaGVja2JveFwiIFthdHRyLmFyaWEtY2hlY2tlZF09XCJjaGVja2VkXCI+XG4gICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJwLWNoZWNrYm94LWljb25cIiBbbmdDbGFzc109XCJ7J3BpIHBpLWNoZWNrJzpjaGVja2VkfVwiPjwvc3Bhbj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICBgLFxuICAgIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxuICAgIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmVcbn0pXG5leHBvcnQgY2xhc3MgVGFibGVDaGVja2JveCAge1xuXG4gICAgQElucHV0KCkgZGlzYWJsZWQ6IGJvb2xlYW47XG5cbiAgICBASW5wdXQoKSB2YWx1ZTogYW55O1xuXG4gICAgQElucHV0KCkgaW5kZXg6IG51bWJlcjtcblxuICAgIEBJbnB1dCgpIGlucHV0SWQ6IHN0cmluZztcblxuICAgIEBJbnB1dCgpIG5hbWU6IHN0cmluZztcblxuICAgIEBJbnB1dCgpIHJlcXVpcmVkOiBib29sZWFuO1xuXG4gICAgQElucHV0KCkgYXJpYUxhYmVsOiBzdHJpbmc7XG5cbiAgICBAVmlld0NoaWxkKCdib3gnKSBib3hWaWV3Q2hpbGQ6IEVsZW1lbnRSZWY7XG5cbiAgICBjaGVja2VkOiBib29sZWFuO1xuXG4gICAgc3Vic2NyaXB0aW9uOiBTdWJzY3JpcHRpb247XG5cbiAgICBjb25zdHJ1Y3RvcihwdWJsaWMgZHQ6IFRhYmxlLCBwdWJsaWMgdGFibGVTZXJ2aWNlOiBUYWJsZVNlcnZpY2UsIHB1YmxpYyBjZDogQ2hhbmdlRGV0ZWN0b3JSZWYpIHtcbiAgICAgICAgdGhpcy5zdWJzY3JpcHRpb24gPSB0aGlzLmR0LnRhYmxlU2VydmljZS5zZWxlY3Rpb25Tb3VyY2UkLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLmNoZWNrZWQgPSB0aGlzLmR0LmlzU2VsZWN0ZWQodGhpcy52YWx1ZSk7XG4gICAgICAgICAgICB0aGlzLmNkLm1hcmtGb3JDaGVjaygpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBuZ09uSW5pdCgpIHtcbiAgICAgICAgdGhpcy5jaGVja2VkID0gdGhpcy5kdC5pc1NlbGVjdGVkKHRoaXMudmFsdWUpO1xuICAgIH1cblxuICAgIG9uQ2xpY2soZXZlbnQ6IEV2ZW50KSB7XG4gICAgICAgIGlmICghdGhpcy5kaXNhYmxlZCkge1xuICAgICAgICAgICAgdGhpcy5kdC50b2dnbGVSb3dXaXRoQ2hlY2tib3goe1xuICAgICAgICAgICAgICAgIG9yaWdpbmFsRXZlbnQ6IGV2ZW50LFxuICAgICAgICAgICAgICAgIHJvd0luZGV4OiB0aGlzLmluZGV4XG4gICAgICAgICAgICB9LCB0aGlzLnZhbHVlKTtcbiAgICAgICAgfVxuICAgICAgICBEb21IYW5kbGVyLmNsZWFyU2VsZWN0aW9uKCk7XG4gICAgfVxuXG4gICAgb25Gb2N1cygpIHtcbiAgICAgICAgRG9tSGFuZGxlci5hZGRDbGFzcyh0aGlzLmJveFZpZXdDaGlsZC5uYXRpdmVFbGVtZW50LCAncC1mb2N1cycpO1xuICAgIH1cblxuICAgIG9uQmx1cigpIHtcbiAgICAgICAgRG9tSGFuZGxlci5yZW1vdmVDbGFzcyh0aGlzLmJveFZpZXdDaGlsZC5uYXRpdmVFbGVtZW50LCAncC1mb2N1cycpO1xuICAgIH1cblxuICAgIG5nT25EZXN0cm95KCkge1xuICAgICAgICBpZiAodGhpcy5zdWJzY3JpcHRpb24pIHtcbiAgICAgICAgICAgIHRoaXMuc3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbn1cblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICdwLXRhYmxlSGVhZGVyQ2hlY2tib3gnLFxuICAgIHRlbXBsYXRlOiBgXG4gICAgICAgIDxkaXYgY2xhc3M9XCJwLWNoZWNrYm94IHAtY29tcG9uZW50XCIgKGNsaWNrKT1cIm9uQ2xpY2soJGV2ZW50KVwiPlxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cInAtaGlkZGVuLWFjY2Vzc2libGVcIj5cbiAgICAgICAgICAgICAgICA8aW5wdXQgI2NiIHR5cGU9XCJjaGVja2JveFwiIFthdHRyLmlkXT1cImlucHV0SWRcIiBbYXR0ci5uYW1lXT1cIm5hbWVcIiBbY2hlY2tlZF09XCJjaGVja2VkXCIgKGZvY3VzKT1cIm9uRm9jdXMoKVwiIChibHVyKT1cIm9uQmx1cigpXCJcbiAgICAgICAgICAgICAgICBbZGlzYWJsZWRdPVwiaXNEaXNhYmxlZCgpXCIgW2F0dHIuYXJpYS1sYWJlbF09XCJhcmlhTGFiZWxcIj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPGRpdiAjYm94IFtuZ0NsYXNzXT1cInsncC1jaGVja2JveC1ib3gnOnRydWUsXG4gICAgICAgICAgICAgICAgJ3AtaGlnaGxpZ2h0JzpjaGVja2VkLCAncC1kaXNhYmxlZCc6IGlzRGlzYWJsZWQoKX1cIiByb2xlPVwiY2hlY2tib3hcIiBbYXR0ci5hcmlhLWNoZWNrZWRdPVwiY2hlY2tlZFwiPlxuICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwicC1jaGVja2JveC1pY29uXCIgW25nQ2xhc3NdPVwieydwaSBwaS1jaGVjayc6Y2hlY2tlZH1cIj48L3NwYW4+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgYCxcbiAgICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbiAgICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lXG59KVxuZXhwb3J0IGNsYXNzIFRhYmxlSGVhZGVyQ2hlY2tib3ggIHtcblxuICAgIEBWaWV3Q2hpbGQoJ2JveCcpIGJveFZpZXdDaGlsZDogRWxlbWVudFJlZjtcblxuICAgIEBJbnB1dCgpIGRpc2FibGVkOiBib29sZWFuO1xuXG4gICAgQElucHV0KCkgaW5wdXRJZDogc3RyaW5nO1xuXG4gICAgQElucHV0KCkgbmFtZTogc3RyaW5nO1xuXG4gICAgQElucHV0KCkgYXJpYUxhYmVsOiBzdHJpbmc7XG5cbiAgICBjaGVja2VkOiBib29sZWFuO1xuXG4gICAgc2VsZWN0aW9uQ2hhbmdlU3Vic2NyaXB0aW9uOiBTdWJzY3JpcHRpb247XG5cbiAgICB2YWx1ZUNoYW5nZVN1YnNjcmlwdGlvbjogU3Vic2NyaXB0aW9uO1xuXG4gICAgY29uc3RydWN0b3IocHVibGljIGR0OiBUYWJsZSwgcHVibGljIHRhYmxlU2VydmljZTogVGFibGVTZXJ2aWNlLCBwdWJsaWMgY2Q6IENoYW5nZURldGVjdG9yUmVmKSB7XG4gICAgICAgIHRoaXMudmFsdWVDaGFuZ2VTdWJzY3JpcHRpb24gPSB0aGlzLmR0LnRhYmxlU2VydmljZS52YWx1ZVNvdXJjZSQuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgICAgICAgIHRoaXMuY2hlY2tlZCA9IHRoaXMudXBkYXRlQ2hlY2tlZFN0YXRlKCk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHRoaXMuc2VsZWN0aW9uQ2hhbmdlU3Vic2NyaXB0aW9uID0gdGhpcy5kdC50YWJsZVNlcnZpY2Uuc2VsZWN0aW9uU291cmNlJC5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5jaGVja2VkID0gdGhpcy51cGRhdGVDaGVja2VkU3RhdGUoKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgbmdPbkluaXQoKSB7XG4gICAgICAgIHRoaXMuY2hlY2tlZCA9IHRoaXMudXBkYXRlQ2hlY2tlZFN0YXRlKCk7XG4gICAgfVxuXG4gICAgb25DbGljayhldmVudDogRXZlbnQpIHtcbiAgICAgICAgaWYgKCF0aGlzLmRpc2FibGVkKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5kdC52YWx1ZSAmJiB0aGlzLmR0LnZhbHVlLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgICB0aGlzLmR0LnRvZ2dsZVJvd3NXaXRoQ2hlY2tib3goZXZlbnQsICF0aGlzLmNoZWNrZWQpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgRG9tSGFuZGxlci5jbGVhclNlbGVjdGlvbigpO1xuICAgIH1cblxuICAgIG9uRm9jdXMoKSB7XG4gICAgICAgIERvbUhhbmRsZXIuYWRkQ2xhc3ModGhpcy5ib3hWaWV3Q2hpbGQubmF0aXZlRWxlbWVudCwgJ3AtZm9jdXMnKTtcbiAgICB9XG5cbiAgICBvbkJsdXIoKSB7XG4gICAgICAgIERvbUhhbmRsZXIucmVtb3ZlQ2xhc3ModGhpcy5ib3hWaWV3Q2hpbGQubmF0aXZlRWxlbWVudCwgJ3AtZm9jdXMnKTtcbiAgICB9XG5cbiAgICBpc0Rpc2FibGVkKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5kaXNhYmxlZCB8fCAhdGhpcy5kdC52YWx1ZSB8fCAhdGhpcy5kdC52YWx1ZS5sZW5ndGg7XG4gICAgfVxuXG4gICAgbmdPbkRlc3Ryb3koKSB7XG4gICAgICAgIGlmICh0aGlzLnNlbGVjdGlvbkNoYW5nZVN1YnNjcmlwdGlvbikge1xuICAgICAgICAgICAgdGhpcy5zZWxlY3Rpb25DaGFuZ2VTdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLnZhbHVlQ2hhbmdlU3Vic2NyaXB0aW9uKSB7XG4gICAgICAgICAgICB0aGlzLnZhbHVlQ2hhbmdlU3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICB1cGRhdGVDaGVja2VkU3RhdGUoKSB7XG4gICAgICAgIHRoaXMuY2QubWFya0ZvckNoZWNrKCk7XG5cbiAgICAgICAgaWYgKHRoaXMuZHQuZmlsdGVyZWRWYWx1ZSkge1xuICAgICAgICAgICAgY29uc3QgdmFsID0gdGhpcy5kdC5maWx0ZXJlZFZhbHVlO1xuICAgICAgICAgICAgcmV0dXJuICh2YWwgJiYgdmFsLmxlbmd0aCA+IDAgJiYgdGhpcy5kdC5zZWxlY3Rpb24gJiYgdGhpcy5kdC5zZWxlY3Rpb24ubGVuZ3RoID4gMCAmJiB0aGlzLmlzQWxsRmlsdGVyZWRWYWx1ZXNDaGVja2VkKCkpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgY29uc3QgdmFsID0gdGhpcy5kdC52YWx1ZTtcbiAgICAgICAgICAgIHJldHVybiAodmFsICYmIHZhbC5sZW5ndGggPiAwICYmIHRoaXMuZHQuc2VsZWN0aW9uICYmIHRoaXMuZHQuc2VsZWN0aW9uLmxlbmd0aCA+IDAgJiYgdGhpcy5kdC5zZWxlY3Rpb24ubGVuZ3RoID09PSB2YWwubGVuZ3RoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGlzQWxsRmlsdGVyZWRWYWx1ZXNDaGVja2VkKCkge1xuICAgICAgICBpZiAoIXRoaXMuZHQuZmlsdGVyZWRWYWx1ZSkge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgZm9yIChsZXQgcm93RGF0YSBvZiB0aGlzLmR0LmZpbHRlcmVkVmFsdWUpIHtcbiAgICAgICAgICAgICAgICBpZiAoIXRoaXMuZHQuaXNTZWxlY3RlZChyb3dEYXRhKSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICB9XG5cbn1cblxuQERpcmVjdGl2ZSh7XG4gICAgc2VsZWN0b3I6ICdbcFJlb3JkZXJhYmxlUm93SGFuZGxlXSdcbn0pXG5leHBvcnQgY2xhc3MgUmVvcmRlcmFibGVSb3dIYW5kbGUgaW1wbGVtZW50cyBBZnRlclZpZXdJbml0IHtcblxuICAgIEBJbnB1dChcInBSZW9yZGVyYWJsZVJvd0hhbmRsZVwiKSBpbmRleDogbnVtYmVyO1xuXG4gICAgY29uc3RydWN0b3IocHVibGljIGVsOiBFbGVtZW50UmVmKSB7fVxuXG4gICAgbmdBZnRlclZpZXdJbml0KCkge1xuICAgICAgICBEb21IYW5kbGVyLmFkZENsYXNzKHRoaXMuZWwubmF0aXZlRWxlbWVudCwgJ3AtZGF0YXRhYmxlLXJlb3JkZXJhYmxlcm93LWhhbmRsZScpO1xuICAgIH1cbn1cblxuQERpcmVjdGl2ZSh7XG4gICAgc2VsZWN0b3I6ICdbcFJlb3JkZXJhYmxlUm93XSdcbn0pXG5leHBvcnQgY2xhc3MgUmVvcmRlcmFibGVSb3cgaW1wbGVtZW50cyBBZnRlclZpZXdJbml0IHtcblxuICAgIEBJbnB1dChcInBSZW9yZGVyYWJsZVJvd1wiKSBpbmRleDogbnVtYmVyO1xuXG4gICAgQElucHV0KCkgcFJlb3JkZXJhYmxlUm93RGlzYWJsZWQ6IGJvb2xlYW47XG5cbiAgICBtb3VzZURvd25MaXN0ZW5lcjogYW55O1xuXG4gICAgZHJhZ1N0YXJ0TGlzdGVuZXI6IGFueTtcblxuICAgIGRyYWdFbmRMaXN0ZW5lcjogYW55O1xuXG4gICAgZHJhZ092ZXJMaXN0ZW5lcjogYW55O1xuXG4gICAgZHJhZ0xlYXZlTGlzdGVuZXI6IGFueTtcblxuICAgIGRyb3BMaXN0ZW5lcjogYW55O1xuXG4gICAgY29uc3RydWN0b3IocHVibGljIGR0OiBUYWJsZSwgcHVibGljIGVsOiBFbGVtZW50UmVmLCBwdWJsaWMgem9uZTogTmdab25lKSB7fVxuXG4gICAgbmdBZnRlclZpZXdJbml0KCkge1xuICAgICAgICBpZiAodGhpcy5pc0VuYWJsZWQoKSkge1xuICAgICAgICAgICAgdGhpcy5lbC5uYXRpdmVFbGVtZW50LmRyb3BwYWJsZSA9IHRydWU7XG4gICAgICAgICAgICB0aGlzLmJpbmRFdmVudHMoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGJpbmRFdmVudHMoKSB7XG4gICAgICAgIHRoaXMuem9uZS5ydW5PdXRzaWRlQW5ndWxhcigoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLm1vdXNlRG93bkxpc3RlbmVyID0gdGhpcy5vbk1vdXNlRG93bi5iaW5kKHRoaXMpO1xuICAgICAgICAgICAgdGhpcy5lbC5uYXRpdmVFbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlZG93bicsIHRoaXMubW91c2VEb3duTGlzdGVuZXIpO1xuXG4gICAgICAgICAgICB0aGlzLmRyYWdTdGFydExpc3RlbmVyID0gdGhpcy5vbkRyYWdTdGFydC5iaW5kKHRoaXMpO1xuICAgICAgICAgICAgdGhpcy5lbC5uYXRpdmVFbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2RyYWdzdGFydCcsIHRoaXMuZHJhZ1N0YXJ0TGlzdGVuZXIpO1xuXG4gICAgICAgICAgICB0aGlzLmRyYWdFbmRMaXN0ZW5lciA9IHRoaXMub25EcmFnRW5kLmJpbmQodGhpcyk7XG4gICAgICAgICAgICB0aGlzLmVsLm5hdGl2ZUVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignZHJhZ2VuZCcsIHRoaXMuZHJhZ0VuZExpc3RlbmVyKTtcblxuICAgICAgICAgICAgdGhpcy5kcmFnT3Zlckxpc3RlbmVyID0gdGhpcy5vbkRyYWdPdmVyLmJpbmQodGhpcyk7XG4gICAgICAgICAgICB0aGlzLmVsLm5hdGl2ZUVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignZHJhZ292ZXInLCB0aGlzLmRyYWdPdmVyTGlzdGVuZXIpO1xuXG4gICAgICAgICAgICB0aGlzLmRyYWdMZWF2ZUxpc3RlbmVyID0gdGhpcy5vbkRyYWdMZWF2ZS5iaW5kKHRoaXMpO1xuICAgICAgICAgICAgdGhpcy5lbC5uYXRpdmVFbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2RyYWdsZWF2ZScsIHRoaXMuZHJhZ0xlYXZlTGlzdGVuZXIpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICB1bmJpbmRFdmVudHMoKSB7XG4gICAgICAgIGlmICh0aGlzLm1vdXNlRG93bkxpc3RlbmVyKSB7XG4gICAgICAgICAgICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdtb3VzZWRvd24nLCB0aGlzLm1vdXNlRG93bkxpc3RlbmVyKTtcbiAgICAgICAgICAgIHRoaXMubW91c2VEb3duTGlzdGVuZXIgPSBudWxsO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMuZHJhZ1N0YXJ0TGlzdGVuZXIpIHtcbiAgICAgICAgICAgIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2RyYWdzdGFydCcsIHRoaXMuZHJhZ1N0YXJ0TGlzdGVuZXIpO1xuICAgICAgICAgICAgdGhpcy5kcmFnU3RhcnRMaXN0ZW5lciA9IG51bGw7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5kcmFnRW5kTGlzdGVuZXIpIHtcbiAgICAgICAgICAgIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2RyYWdlbmQnLCB0aGlzLmRyYWdFbmRMaXN0ZW5lcik7XG4gICAgICAgICAgICB0aGlzLmRyYWdFbmRMaXN0ZW5lciA9IG51bGw7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5kcmFnT3Zlckxpc3RlbmVyKSB7XG4gICAgICAgICAgICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdkcmFnb3ZlcicsIHRoaXMuZHJhZ092ZXJMaXN0ZW5lcik7XG4gICAgICAgICAgICB0aGlzLmRyYWdPdmVyTGlzdGVuZXIgPSBudWxsO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMuZHJhZ0xlYXZlTGlzdGVuZXIpIHtcbiAgICAgICAgICAgIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2RyYWdsZWF2ZScsIHRoaXMuZHJhZ0xlYXZlTGlzdGVuZXIpO1xuICAgICAgICAgICAgdGhpcy5kcmFnTGVhdmVMaXN0ZW5lciA9IG51bGw7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBvbk1vdXNlRG93bihldmVudCkge1xuICAgICAgICBpZiAoRG9tSGFuZGxlci5oYXNDbGFzcyhldmVudC50YXJnZXQsICdwLWRhdGF0YWJsZS1yZW9yZGVyYWJsZXJvdy1oYW5kbGUnKSlcbiAgICAgICAgICAgIHRoaXMuZWwubmF0aXZlRWxlbWVudC5kcmFnZ2FibGUgPSB0cnVlO1xuICAgICAgICBlbHNlXG4gICAgICAgICAgICB0aGlzLmVsLm5hdGl2ZUVsZW1lbnQuZHJhZ2dhYmxlID0gZmFsc2U7XG4gICAgfVxuXG4gICAgb25EcmFnU3RhcnQoZXZlbnQpIHtcbiAgICAgICAgdGhpcy5kdC5vblJvd0RyYWdTdGFydChldmVudCwgdGhpcy5pbmRleCk7XG4gICAgfVxuXG4gICAgb25EcmFnRW5kKGV2ZW50KSB7XG4gICAgICAgIHRoaXMuZHQub25Sb3dEcmFnRW5kKGV2ZW50KTtcbiAgICAgICAgdGhpcy5lbC5uYXRpdmVFbGVtZW50LmRyYWdnYWJsZSA9IGZhbHNlO1xuICAgIH1cblxuICAgIG9uRHJhZ092ZXIoZXZlbnQpIHtcbiAgICAgICAgdGhpcy5kdC5vblJvd0RyYWdPdmVyKGV2ZW50LCB0aGlzLmluZGV4LCB0aGlzLmVsLm5hdGl2ZUVsZW1lbnQpO1xuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIH1cblxuICAgIG9uRHJhZ0xlYXZlKGV2ZW50KSB7XG4gICAgICAgIHRoaXMuZHQub25Sb3dEcmFnTGVhdmUoZXZlbnQsIHRoaXMuZWwubmF0aXZlRWxlbWVudCk7XG4gICAgfVxuXG4gICAgaXNFbmFibGVkKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5wUmVvcmRlcmFibGVSb3dEaXNhYmxlZCAhPT0gdHJ1ZTtcbiAgICB9XG5cbiAgICBASG9zdExpc3RlbmVyKCdkcm9wJywgWyckZXZlbnQnXSlcbiAgICBvbkRyb3AoZXZlbnQpIHtcbiAgICAgICAgaWYgKHRoaXMuaXNFbmFibGVkKCkgJiYgdGhpcy5kdC5yb3dEcmFnZ2luZykge1xuICAgICAgICAgICAgdGhpcy5kdC5vblJvd0Ryb3AoZXZlbnQsIHRoaXMuZWwubmF0aXZlRWxlbWVudCk7XG4gICAgICAgIH1cblxuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpXG4gICAgfVxufVxuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ3AtY29sdW1uRmlsdGVyRm9ybUVsZW1lbnQnLFxuICAgIHRlbXBsYXRlOiBgXG4gICAgICAgIDxuZy1jb250YWluZXIgKm5nSWY9XCJmaWx0ZXJUZW1wbGF0ZTsgZWxzZSBidWlsdEluRWxlbWVudFwiPlxuICAgICAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdUZW1wbGF0ZU91dGxldD1cImZpbHRlclRlbXBsYXRlOyBjb250ZXh0OiB7JGltcGxpY2l0OiBmaWx0ZXJDb25zdHJhaW50LnZhbHVlLCBmaWx0ZXJDYWxsYmFjazogZmlsdGVyQ2FsbGJhY2t9XCI+PC9uZy1jb250YWluZXI+XG4gICAgICAgIDwvbmctY29udGFpbmVyPlxuICAgICAgICA8bmctdGVtcGxhdGUgI2J1aWx0SW5FbGVtZW50PlxuICAgICAgICAgICAgPG5nLWNvbnRhaW5lciBbbmdTd2l0Y2hdPVwidHlwZVwiPlxuICAgICAgICAgICAgICAgIDxpbnB1dCAqbmdTd2l0Y2hDYXNlPVwiJ3RleHQnXCIgdHlwZT1cInRleHRcIiBwSW5wdXRUZXh0IFt2YWx1ZV09XCJmaWx0ZXJDb25zdHJhaW50Py52YWx1ZVwiIChpbnB1dCk9XCJvbk1vZGVsQ2hhbmdlKCRldmVudC50YXJnZXQudmFsdWUpXCJcbiAgICAgICAgICAgICAgICAgICAgKGtleWRvd24uZW50ZXIpPVwib25UZXh0SW5wdXRFbnRlcktleURvd24oJGV2ZW50KVwiIFthdHRyLnBsYWNlaG9sZGVyXT1cInBsYWNlaG9sZGVyXCI+XG4gICAgICAgICAgICAgICAgPHAtaW5wdXROdW1iZXIgKm5nU3dpdGNoQ2FzZT1cIidudW1lcmljJ1wiIFtuZ01vZGVsXT1cImZpbHRlckNvbnN0cmFpbnQ/LnZhbHVlXCIgKG5nTW9kZWxDaGFuZ2UpPVwib25Nb2RlbENoYW5nZSgkZXZlbnQpXCIgKG9uS2V5RG93bik9XCJvbk51bWVyaWNJbnB1dEtleURvd24oJGV2ZW50KVwiIFtzaG93QnV0dG9uc109XCJ0cnVlXCIgW2F0dHIucGxhY2Vob2xkZXJdPVwicGxhY2Vob2xkZXJcIlxuICAgICAgICAgICAgICAgICAgICBbbWluRnJhY3Rpb25EaWdpdHNdPVwibWluRnJhY3Rpb25EaWdpdHNcIiBbbWF4RnJhY3Rpb25EaWdpdHNdPVwibWF4RnJhY3Rpb25EaWdpdHNcIiBbcHJlZml4XT1cInByZWZpeFwiIFtzdWZmaXhdPVwic3VmZml4XCJcbiAgICAgICAgICAgICAgICAgICAgW21vZGVdPVwiY3VycmVuY3kgPyAnY3VycmVuY3knIDogJ2RlY2ltYWwnXCIgW2xvY2FsZV09XCJsb2NhbGVcIiBbbG9jYWxlTWF0Y2hlcl09XCJsb2NhbGVNYXRjaGVyXCIgW2N1cnJlbmN5XT1cImN1cnJlbmN5XCIgW2N1cnJlbmN5RGlzcGxheV09XCJjdXJyZW5jeURpc3BsYXlcIiBbdXNlR3JvdXBpbmddPVwidXNlR3JvdXBpbmdcIj48L3AtaW5wdXROdW1iZXI+XG4gICAgICAgICAgICAgICAgPHAtdHJpU3RhdGVDaGVja2JveCAqbmdTd2l0Y2hDYXNlPVwiJ2Jvb2xlYW4nXCIgW25nTW9kZWxdPVwiZmlsdGVyQ29uc3RyYWludD8udmFsdWVcIiAobmdNb2RlbENoYW5nZSk9XCJvbk1vZGVsQ2hhbmdlKCRldmVudClcIj48L3AtdHJpU3RhdGVDaGVja2JveD5cbiAgICAgICAgICAgICAgICA8cC1jYWxlbmRhciAqbmdTd2l0Y2hDYXNlPVwiJ2RhdGUnXCIgW25nTW9kZWxdPVwiZmlsdGVyQ29uc3RyYWludD8udmFsdWVcIiAobmdNb2RlbENoYW5nZSk9XCJvbk1vZGVsQ2hhbmdlKCRldmVudClcIj48L3AtY2FsZW5kYXI+XG4gICAgICAgICAgICA8L25nLWNvbnRhaW5lcj5cbiAgICAgICAgPC9uZy10ZW1wbGF0ZT5cbiAgICBgLFxuICAgIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmVcbn0pXG5leHBvcnQgY2xhc3MgQ29sdW1uRmlsdGVyRm9ybUVsZW1lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuICAgIFxuICAgIEBJbnB1dCgpIGZpZWxkOiBzdHJpbmc7XG5cbiAgICBASW5wdXQoKSB0eXBlOiBzdHJpbmc7XG5cbiAgICBASW5wdXQoKSBmaWx0ZXJDb25zdHJhaW50OiBGaWx0ZXJNZXRhZGF0YTtcblxuICAgIEBJbnB1dCgpIGZpbHRlclRlbXBsYXRlOiBUZW1wbGF0ZVJlZjxhbnk+O1xuXG4gICAgQElucHV0KCkgcGxhY2Vob2xkZXI6IHN0cmluZztcblxuICAgIEBJbnB1dCgpIG1pbkZyYWN0aW9uRGlnaXRzOiBudW1iZXJcbiAgICBcbiAgICBASW5wdXQoKSBtYXhGcmFjdGlvbkRpZ2l0czogbnVtYmVyO1xuXG4gICAgQElucHV0KCkgcHJlZml4OiBzdHJpbmc7XG5cbiAgICBASW5wdXQoKSBzdWZmaXg6IHN0cmluZztcblxuICAgIEBJbnB1dCgpIGxvY2FsZTogc3RyaW5nO1xuXG4gICAgQElucHV0KCkgbG9jYWxlTWF0Y2hlcjogc3RyaW5nO1xuXG4gICAgQElucHV0KCkgY3VycmVuY3k6IHN0cmluZztcblxuICAgIEBJbnB1dCgpIGN1cnJlbmN5RGlzcGxheTogc3RyaW5nO1xuXG4gICAgQElucHV0KCkgdXNlR3JvdXBpbmc6IGJvb2xlYW4gPSB0cnVlO1xuXG4gICAgZmlsdGVyQ2FsbGJhY2s6IEZ1bmN0aW9uO1xuXG4gICAgY29uc3RydWN0b3IocHVibGljIGR0OiBUYWJsZSkge31cblxuICAgIG5nT25Jbml0KCkge1xuICAgICAgICB0aGlzLmZpbHRlckNhbGxiYWNrID0gdmFsdWUgPT4ge1xuICAgICAgICAgICAgdGhpcy5maWx0ZXJDb25zdHJhaW50LnZhbHVlID0gdmFsdWU7XG4gICAgICAgICAgICB0aGlzLmR0Ll9maWx0ZXIoKTtcbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICBvbk1vZGVsQ2hhbmdlKHZhbHVlOiBhbnkpIHtcbiAgICAgICAgdGhpcy5maWx0ZXJDb25zdHJhaW50LnZhbHVlID0gdmFsdWU7XG5cbiAgICAgICAgaWYgKHRoaXMudHlwZSA9PT0gJ2Jvb2xlYW4nIHx8IHZhbHVlID09PSAnJykge1xuICAgICAgICAgICAgdGhpcy5kdC5fZmlsdGVyKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBvblRleHRJbnB1dEVudGVyS2V5RG93bihldmVudDogS2V5Ym9hcmRFdmVudCkge1xuICAgICAgICB0aGlzLmR0Ll9maWx0ZXIoKTtcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICB9XG5cbiAgICBvbk51bWVyaWNJbnB1dEtleURvd24oZXZlbnQ6IEtleWJvYXJkRXZlbnQpIHtcbiAgICAgICAgaWYgKGV2ZW50LmtleSA9PT0gJ0VudGVyJykge1xuICAgICAgICAgICAgdGhpcy5kdC5fZmlsdGVyKCk7XG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICB9XG4gICAgfVxufVxuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ3AtY29sdW1uRmlsdGVyJyxcbiAgICB0ZW1wbGF0ZTogYFxuICAgICAgICA8ZGl2IGNsYXNzPVwicC1jb2x1bW4tZmlsdGVyXCIgW25nQ2xhc3NdPVwieydwLWNvbHVtbi1maWx0ZXItcm93JzogZGlzcGxheSA9PT0gJ3JvdycsICdwLWNvbHVtbi1maWx0ZXItbWVudSc6IGRpc3BsYXkgPT09ICdtZW51J31cIj5cbiAgICAgICAgICAgIDxwLWNvbHVtbkZpbHRlckZvcm1FbGVtZW50ICpuZ0lmPVwiZGlzcGxheSA9PT0gJ3JvdydcIiBjbGFzcz1cInAtZmx1aWRcIiBbdHlwZV09XCJ0eXBlXCIgW2ZpZWxkXT1cImZpZWxkXCIgW2ZpbHRlckNvbnN0cmFpbnRdPVwiZHQuZmlsdGVyc1tmaWVsZF1cIiBbZmlsdGVyVGVtcGxhdGVdPVwiZmlsdGVyVGVtcGxhdGVcIiBbcGxhY2Vob2xkZXJdPVwicGxhY2Vob2xkZXJcIiBbbWluRnJhY3Rpb25EaWdpdHNdPVwibWluRnJhY3Rpb25EaWdpdHNcIiBbbWF4RnJhY3Rpb25EaWdpdHNdPVwibWF4RnJhY3Rpb25EaWdpdHNcIiBbcHJlZml4XT1cInByZWZpeFwiIFtzdWZmaXhdPVwic3VmZml4XCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtsb2NhbGVdPVwibG9jYWxlXCIgIFtsb2NhbGVNYXRjaGVyXT1cImxvY2FsZU1hdGNoZXJcIiBbY3VycmVuY3ldPVwiY3VycmVuY3lcIiBbY3VycmVuY3lEaXNwbGF5XT1cImN1cnJlbmN5RGlzcGxheVwiIFt1c2VHcm91cGluZ109XCJ1c2VHcm91cGluZ1wiPjwvcC1jb2x1bW5GaWx0ZXJGb3JtRWxlbWVudD5cbiAgICAgICAgICAgIDxidXR0b24gI2ljb24gKm5nSWY9XCJzaG93TWVudUJ1dHRvblwiIHR5cGU9XCJidXR0b25cIiBjbGFzcz1cInAtY29sdW1uLWZpbHRlci1tZW51LWJ1dHRvbiBwLWxpbmtcIiBhcmlhLWhhc3BvcHVwPVwidHJ1ZVwiIFthdHRyLmFyaWEtZXhwYW5kZWRdPVwib3ZlcmxheVZpc2libGVcIlxuICAgICAgICAgICAgICAgIFtuZ0NsYXNzXT1cInsncC1jb2x1bW4tZmlsdGVyLW1lbnUtYnV0dG9uLW9wZW4nOiBvdmVybGF5VmlzaWJsZSwgJ3AtY29sdW1uLWZpbHRlci1tZW51LWJ1dHRvbi1hY3RpdmUnOiBoYXNGaWx0ZXIoKX1cIiBcbiAgICAgICAgICAgICAgICAoY2xpY2spPVwidG9nZ2xlTWVudSgpXCIgKGtleWRvd24pPVwib25Ub2dnbGVCdXR0b25LZXlEb3duKCRldmVudClcIj48c3BhbiBjbGFzcz1cInBpIHBpLWZpbHRlci1pY29uIHBpLWZpbHRlclwiPjwvc3Bhbj48L2J1dHRvbj5cbiAgICAgICAgICAgIDxidXR0b24gI2ljb24gKm5nSWY9XCJzaG93TWVudUJ1dHRvbiAmJiBkaXNwbGF5ID09PSAncm93J1wiIFtuZ0NsYXNzXT1cInsncC1oaWRkZW4tc3BhY2UnOiAhaGFzUm93RmlsdGVyKCl9XCIgdHlwZT1cImJ1dHRvblwiIGNsYXNzPVwicC1jb2x1bW4tZmlsdGVyLWNsZWFyLWJ1dHRvbiBwLWxpbmtcIiAoY2xpY2spPVwiY2xlYXJGaWx0ZXIoKVwiPjxzcGFuIGNsYXNzPVwicGkgcGktZmlsdGVyLXNsYXNoXCI+PC9zcGFuPjwvYnV0dG9uPlxuICAgICAgICAgICAgPGRpdiAqbmdJZj1cInNob3dNZW51ICYmIG92ZXJsYXlWaXNpYmxlXCIgW25nQ2xhc3NdPVwieydwLWNvbHVtbi1maWx0ZXItb3ZlcmxheSBwLWNvbXBvbmVudCBwLWZsdWlkJzogdHJ1ZSwgJ3AtY29sdW1uLWZpbHRlci1vdmVybGF5LW1lbnUnOiBkaXNwbGF5ID09PSAnbWVudSd9XCIgXG4gICAgICAgICAgICAgICAgW0BvdmVybGF5QW5pbWF0aW9uXT1cIid2aXNpYmxlJ1wiIChAb3ZlcmxheUFuaW1hdGlvbi5zdGFydCk9XCJvbk92ZXJsYXlBbmltYXRpb25TdGFydCgkZXZlbnQpXCIgKGtleWRvd24uZXNjYXBlKT1cIm9uRXNjYXBlKClcIj5cbiAgICAgICAgICAgICAgICA8bmctY29udGFpbmVyICpuZ1RlbXBsYXRlT3V0bGV0PVwiaGVhZGVyVGVtcGxhdGU7IGNvbnRleHQ6IHskaW1wbGljaXQ6IGZpZWxkfVwiPjwvbmctY29udGFpbmVyPlxuICAgICAgICAgICAgICAgIDx1bCAqbmdJZj1cImRpc3BsYXkgPT09ICdyb3cnOyBlbHNlIG1lbnVcIiBjbGFzcz1cInAtY29sdW1uLWZpbHRlci1yb3ctaXRlbXNcIj5cbiAgICAgICAgICAgICAgICAgICAgPGxpIGNsYXNzPVwicC1jb2x1bW4tZmlsdGVyLXJvdy1pdGVtXCIgKm5nRm9yPVwibGV0IG1hdGNoTW9kZSBvZiBtYXRjaE1vZGVzOyBsZXQgaSA9IGluZGV4O1wiIChjbGljayk9XCJvblJvd01hdGNoTW9kZUNoYW5nZShtYXRjaE1vZGUudmFsdWUpXCIgKGtleWRvd24pPVwib25Sb3dNYXRjaE1vZGVLZXlEb3duKCRldmVudClcIiAoa2V5ZG93bi5lbnRlcik9XCJ0aGlzLm9uUm93TWF0Y2hNb2RlQ2hhbmdlKG1hdGNoTW9kZS52YWx1ZSlcIlxuICAgICAgICAgICAgICAgICAgICAgICAgW25nQ2xhc3NdPVwieydwLWhpZ2hsaWdodCc6IGlzUm93TWF0Y2hNb2RlU2VsZWN0ZWQobWF0Y2hNb2RlLnZhbHVlKX1cIiBbYXR0ci50YWJpbmRleF09XCJpID09PSAwID8gJzAnIDogbnVsbFwiPnt7bWF0Y2hNb2RlLmxhYmVsfX08L2xpPlxuICAgICAgICAgICAgICAgICAgICA8bGkgY2xhc3M9XCJwLWNvbHVtbi1maWx0ZXItc2VwYXJhdG9yXCI+PC9saT5cbiAgICAgICAgICAgICAgICAgICAgPGxpIGNsYXNzPVwicC1jb2x1bW4tZmlsdGVyLXJvdy1pdGVtXCIgKGNsaWNrKT1cIm9uUm93Q2xlYXJJdGVtQ2xpY2soKVwiIChrZXlkb3duKT1cIm9uUm93TWF0Y2hNb2RlS2V5RG93bigkZXZlbnQpXCIgKGtleWRvd24uZW50ZXIpPVwib25Sb3dDbGVhckl0ZW1DbGljaygpXCI+e3tub0ZpbHRlckxhYmVsfX08L2xpPlxuICAgICAgICAgICAgICAgIDwvdWw+XG4gICAgICAgICAgICAgICAgPG5nLXRlbXBsYXRlICNtZW51PlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwicC1jb2x1bW4tZmlsdGVyLW9wZXJhdG9yXCIgKm5nSWY9XCJpc1Nob3dPcGVyYXRvclwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPHAtZHJvcGRvd24gW29wdGlvbnNdPVwib3BlcmF0b3JPcHRpb25zXCIgW25nTW9kZWxdPVwib3BlcmF0b3JcIiAobmdNb2RlbENoYW5nZSk9XCJvbk9wZXJhdG9yQ2hhbmdlKCRldmVudClcIiBzdHlsZUNsYXNzPVwicC1jb2x1bW4tZmlsdGVyLW9wZXJhdG9yLWRyb3Bkb3duXCI+PC9wLWRyb3Bkb3duPlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInAtY29sdW1uLWZpbHRlci1jb25zdHJhaW50c1wiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiAqbmdGb3I9XCJsZXQgZmllbGRDb25zdHJhaW50IG9mIGZpZWxkQ29uc3RyYWludHM7IGxldCBpID0gaW5kZXhcIiBjbGFzcz1cInAtY29sdW1uLWZpbHRlci1jb25zdHJhaW50XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHAtZHJvcGRvd24gICpuZ0lmPVwic2hvd01hdGNoTW9kZXMgJiYgbWF0Y2hNb2Rlc1wiIFtvcHRpb25zXT1cIm1hdGNoTW9kZXNcIiBbbmdNb2RlbF09XCJmaWVsZENvbnN0cmFpbnQubWF0Y2hNb2RlXCIgKG5nTW9kZWxDaGFuZ2UpPVwib25NZW51TWF0Y2hNb2RlQ2hhbmdlKCRldmVudCwgZmllbGRDb25zdHJhaW50KVwiIHN0eWxlQ2xhc3M9XCJwLWNvbHVtbi1maWx0ZXItbWF0Y2htb2RlLWRyb3Bkb3duXCI+PC9wLWRyb3Bkb3duPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxwLWNvbHVtbkZpbHRlckZvcm1FbGVtZW50IFt0eXBlXT1cInR5cGVcIiBbZmllbGRdPVwiZmllbGRcIiBbZmlsdGVyQ29uc3RyYWludF09XCJmaWVsZENvbnN0cmFpbnRcIiBbZmlsdGVyVGVtcGxhdGVdPVwiZmlsdGVyVGVtcGxhdGVcIiBbcGxhY2Vob2xkZXJdPVwicGxhY2Vob2xkZXJcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFttaW5GcmFjdGlvbkRpZ2l0c109XCJtaW5GcmFjdGlvbkRpZ2l0c1wiIFttYXhGcmFjdGlvbkRpZ2l0c109XCJtYXhGcmFjdGlvbkRpZ2l0c1wiIFtwcmVmaXhdPVwicHJlZml4XCIgW3N1ZmZpeF09XCJzdWZmaXhcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtsb2NhbGVdPVwibG9jYWxlXCIgIFtsb2NhbGVNYXRjaGVyXT1cImxvY2FsZU1hdGNoZXJcIiBbY3VycmVuY3ldPVwiY3VycmVuY3lcIiBbY3VycmVuY3lEaXNwbGF5XT1cImN1cnJlbmN5RGlzcGxheVwiIFt1c2VHcm91cGluZ109XCJ1c2VHcm91cGluZ1wiPjwvcC1jb2x1bW5GaWx0ZXJGb3JtRWxlbWVudD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8YnV0dG9uICpuZ0lmPVwic2hvd1JlbW92ZUljb25cIiB0eXBlPVwiYnV0dG9uXCIgcEJ1dHRvbiBpY29uPVwicGkgcGktdHJhc2hcIiBjbGFzcz1cInAtY29sdW1uLWZpbHRlci1yZW1vdmUtYnV0dG9uIHAtYnV0dG9uLXRleHQgcC1idXR0b24tZGFuZ2VyIHAtYnV0dG9uLXNtXCIgKGNsaWNrKT1cInJlbW92ZUNvbnN0cmFpbnQoZmllbGRDb25zdHJhaW50KVwiIHBSaXBwbGUgW2xhYmVsXT1cInJlbW92ZVJ1bGVCdXR0b25MYWJlbFwiPjwvYnV0dG9uPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwicC1jb2x1bW4tZmlsdGVyLWFkZC1ydWxlXCIgKm5nSWY9XCJpc1Nob3dBZGRDb25zdHJhaW50XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBwQnV0dG9uIFtsYWJlbF09XCJhZGRSdWxlQnV0dG9uTGFiZWxcIiBpY29uPVwicGkgcGktcGx1c1wiIGNsYXNzPVwicC1jb2x1bW4tZmlsdGVyLWFkZC1idXR0b24gcC1idXR0b24tdGV4dCBwLWJ1dHRvbi1zbVwiIChjbGljayk9XCJhZGRDb25zdHJhaW50KClcIiBwUmlwcGxlPjwvYnV0dG9uPlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInAtY29sdW1uLWZpbHRlci1idXR0b25iYXJcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxidXR0b24gdHlwZT1cImJ1dHRvblwiIHBCdXR0b24gY2xhc3M9XCJwLWJ1dHRvbi1vdXRsaW5lZFwiIChjbGljayk9XCJjbGVhckZpbHRlcigpXCIgW2xhYmVsXT1cImNsZWFyQnV0dG9uTGFiZWxcIiBwUmlwcGxlPjwvYnV0dG9uPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgcEJ1dHRvbiAoY2xpY2spPVwiYXBwbHlGaWx0ZXIoKVwiIFtsYWJlbF09XCJhcHBseUJ1dHRvbkxhYmVsXCIgcFJpcHBsZT48L2J1dHRvbj5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPC9uZy10ZW1wbGF0ZT5cbiAgICAgICAgICAgICAgICA8bmctY29udGFpbmVyICpuZ1RlbXBsYXRlT3V0bGV0PVwiZm9vdGVyVGVtcGxhdGU7IGNvbnRleHQ6IHskaW1wbGljaXQ6IGZpZWxkfVwiPjwvbmctY29udGFpbmVyPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgIGAsXG4gICAgYW5pbWF0aW9uczogW1xuICAgICAgICB0cmlnZ2VyKCdvdmVybGF5QW5pbWF0aW9uJywgW1xuICAgICAgICAgICAgdHJhbnNpdGlvbignOmVudGVyJywgW1xuICAgICAgICAgICAgICAgIHN0eWxlKHtvcGFjaXR5OiAwLCB0cmFuc2Zvcm06ICdzY2FsZVkoMC44KSd9KSxcbiAgICAgICAgICAgICAgICBhbmltYXRlKCcuMTJzIGN1YmljLWJlemllcigwLCAwLCAwLjIsIDEpJylcbiAgICAgICAgICAgIF0pLFxuICAgICAgICAgICAgdHJhbnNpdGlvbignOmxlYXZlJywgW1xuICAgICAgICAgICAgICAgIGFuaW1hdGUoJy4xcyBsaW5lYXInLCBzdHlsZSh7IG9wYWNpdHk6IDAgfSkpXG4gICAgICAgICAgICBdKVxuICAgICAgICBdKVxuICAgIF0sXG4gICAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZVxufSlcbmV4cG9ydCBjbGFzcyBDb2x1bW5GaWx0ZXIgaW1wbGVtZW50cyBBZnRlckNvbnRlbnRJbml0IHtcblxuICAgIEBJbnB1dCgpIGZpZWxkOiBzdHJpbmc7XG5cbiAgICBASW5wdXQoKSB0eXBlOiBzdHJpbmcgPSAndGV4dCc7XG5cbiAgICBASW5wdXQoKSBkaXNwbGF5OiBzdHJpbmcgPSAncm93JztcblxuICAgIEBJbnB1dCgpIHNob3dNZW51OiBib29sZWFuID0gdHJ1ZTtcblxuICAgIEBJbnB1dCgpIG1hdGNoTW9kZTogc3RyaW5nO1xuXG4gICAgQElucHV0KCkgb3BlcmF0b3I6IHN0cmluZyA9IEZpbHRlck9wZXJhdG9yLkFORDtcblxuICAgIEBJbnB1dCgpIHNob3dPcGVyYXRvcjogYm9vbGVhbiA9IHRydWU7XG5cbiAgICBASW5wdXQoKSBzaG93Q2xlYXJCdXR0b246IGJvb2xlYW4gPSB0cnVlO1xuXG4gICAgQElucHV0KCkgc2hvd0FwcGx5QnV0dG9uOiBib29sZWFuID0gdHJ1ZTtcblxuICAgIEBJbnB1dCgpIHNob3dNYXRjaE1vZGVzOiBib29sZWFuID0gdHJ1ZTtcblxuICAgIEBJbnB1dCgpIHNob3dBZGRCdXR0b246IGJvb2xlYW4gPSB0cnVlO1xuXG4gICAgQElucHV0KCkgcGxhY2Vob2xkZXI6IHN0cmluZztcblxuICAgIEBJbnB1dCgpIG1hdGNoTW9kZU9wdGlvbnM6IFNlbGVjdEl0ZW1bXTtcblxuICAgIEBJbnB1dCgpIG1heENvbnN0cmFpbnRzOiBudW1iZXIgPSAyO1xuXG4gICAgQElucHV0KCkgbWluRnJhY3Rpb25EaWdpdHM6IG51bWJlcjtcbiAgICBcbiAgICBASW5wdXQoKSBtYXhGcmFjdGlvbkRpZ2l0czogbnVtYmVyO1xuXG4gICAgQElucHV0KCkgcHJlZml4OiBzdHJpbmc7XG5cbiAgICBASW5wdXQoKSBzdWZmaXg6IHN0cmluZztcblxuICAgIEBJbnB1dCgpIGxvY2FsZTogc3RyaW5nO1xuXG4gICAgQElucHV0KCkgbG9jYWxlTWF0Y2hlcjogc3RyaW5nO1xuXG4gICAgQElucHV0KCkgY3VycmVuY3k6IHN0cmluZztcblxuICAgIEBJbnB1dCgpIGN1cnJlbmN5RGlzcGxheTogc3RyaW5nO1xuXG4gICAgQElucHV0KCkgdXNlR3JvdXBpbmc6IGJvb2xlYW4gPSB0cnVlO1xuXG4gICAgQFZpZXdDaGlsZCgnaWNvbicpIGljb246IEVsZW1lbnRSZWY7XG5cbiAgICBAQ29udGVudENoaWxkcmVuKFByaW1lVGVtcGxhdGUpIHRlbXBsYXRlczogUXVlcnlMaXN0PGFueT47XG5cbiAgICBjb25zdHJ1Y3RvcihwdWJsaWMgZWw6IEVsZW1lbnRSZWYsIHB1YmxpYyBkdDogVGFibGUsIHB1YmxpYyByZW5kZXJlcjogUmVuZGVyZXIyLCBwdWJsaWMgY29uZmlnOiBQcmltZU5HQ29uZmlnKSB7fVxuXG4gICAgaGVhZGVyVGVtcGxhdGU6IFRlbXBsYXRlUmVmPGFueT47XG5cbiAgICBmaWx0ZXJUZW1wbGF0ZTogVGVtcGxhdGVSZWY8YW55PjtcblxuICAgIGZvb3RlclRlbXBsYXRlOiBUZW1wbGF0ZVJlZjxhbnk+O1xuXG4gICAgb3BlcmF0b3JPcHRpb25zOiBhbnlbXTtcblxuICAgIG92ZXJsYXlWaXNpYmxlOiBib29sZWFuO1xuXG4gICAgb3ZlcmxheTogSFRNTEVsZW1lbnQ7XG5cbiAgICBzY3JvbGxIYW5kbGVyOiBhbnk7XG5cbiAgICBkb2N1bWVudENsaWNrTGlzdGVuZXI6IGFueTtcblxuICAgIGRvY3VtZW50UmVzaXplTGlzdGVuZXI6IGFueTtcblxuICAgIG1hdGNoTW9kZXM6IFNlbGVjdEl0ZW1bXTtcblxuICAgIHRyYW5zbGF0aW9uU3Vic2NyaXB0aW9uOiBTdWJzY3JpcHRpb247XG5cbiAgICBuZ09uSW5pdCgpIHtcbiAgICAgICAgaWYgKCF0aGlzLmR0LmZpbHRlcnNbdGhpcy5maWVsZF0pIHtcbiAgICAgICAgICAgIHRoaXMuaW5pdEZpZWxkRmlsdGVyQ29uc3RyYWludCgpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy50cmFuc2xhdGlvblN1YnNjcmlwdGlvbiA9IHRoaXMuY29uZmlnLnRyYW5zbGF0aW9uT2JzZXJ2ZXIuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgICAgICAgIHRoaXMuZ2VuZXJhdGVNYXRjaE1vZGVPcHRpb25zKCk7XG4gICAgICAgICAgICB0aGlzLmdlbmVyYXRlT3BlcmF0b3JPcHRpb25zKCk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHRoaXMuZ2VuZXJhdGVNYXRjaE1vZGVPcHRpb25zKCk7XG4gICAgICAgIHRoaXMuZ2VuZXJhdGVPcGVyYXRvck9wdGlvbnMoKTtcbiAgICB9XG5cbiAgICBnZW5lcmF0ZU1hdGNoTW9kZU9wdGlvbnMoKcKge1xuICAgICAgICB0aGlzLm1hdGNoTW9kZXMgPSB0aGlzLm1hdGNoTW9kZU9wdGlvbnMgfHwgXG4gICAgICAgIHRoaXMuY29uZmlnLmZpbHRlck1hdGNoTW9kZU9wdGlvbnNbdGhpcy50eXBlXT8ubWFwKGtleSA9PiB7XG4gICAgICAgICAgICByZXR1cm4ge2xhYmVsOiB0aGlzLmNvbmZpZy5nZXRUcmFuc2xhdGlvbihrZXkpLCB2YWx1ZToga2V5fVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBnZW5lcmF0ZU9wZXJhdG9yT3B0aW9ucygpwqB7XG4gICAgICAgIHRoaXMub3BlcmF0b3JPcHRpb25zID0gW1xuICAgICAgICAgICAge2xhYmVsOiB0aGlzLmNvbmZpZy5nZXRUcmFuc2xhdGlvbihUcmFuc2xhdGlvbktleXMuTUFUQ0hfQUxMKSwgdmFsdWU6IEZpbHRlck9wZXJhdG9yLkFORH0sXG4gICAgICAgICAgICB7bGFiZWw6IHRoaXMuY29uZmlnLmdldFRyYW5zbGF0aW9uKFRyYW5zbGF0aW9uS2V5cy5NQVRDSF9BTlkpLCB2YWx1ZTogRmlsdGVyT3BlcmF0b3IuT1J9XG4gICAgICAgIF07XG4gICAgfVxuXG4gICAgbmdBZnRlckNvbnRlbnRJbml0KCkge1xuICAgICAgICB0aGlzLnRlbXBsYXRlcy5mb3JFYWNoKChpdGVtKSA9PiB7XG4gICAgICAgICAgICBzd2l0Y2goaXRlbS5nZXRUeXBlKCkpIHtcbiAgICAgICAgICAgICAgICBjYXNlICdoZWFkZXInOlxuICAgICAgICAgICAgICAgICAgICB0aGlzLmhlYWRlclRlbXBsYXRlID0gaXRlbS50ZW1wbGF0ZTtcbiAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgICAgIGNhc2UgJ2ZpbHRlcic6XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZmlsdGVyVGVtcGxhdGUgPSBpdGVtLnRlbXBsYXRlO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIGNhc2UgJ2Zvb3Rlcic6XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZm9vdGVyVGVtcGxhdGUgPSBpdGVtLnRlbXBsYXRlO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5maWx0ZXJUZW1wbGF0ZSA9IGl0ZW0udGVtcGxhdGU7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGluaXRGaWVsZEZpbHRlckNvbnN0cmFpbnQoKSB7XG4gICAgICAgIGxldCBkZWZhdWx0TWF0Y2hNb2RlID0gdGhpcy5nZXREZWZhdWx0TWF0Y2hNb2RlKCk7XG4gICAgICAgIHRoaXMuZHQuZmlsdGVyc1t0aGlzLmZpZWxkXSA9IHRoaXMuZGlzcGxheSA9PSAncm93JyA/IHt2YWx1ZTogbnVsbCwgbWF0Y2hNb2RlOiBkZWZhdWx0TWF0Y2hNb2RlfSA6IFt7dmFsdWU6IG51bGwsIG1hdGNoTW9kZTogZGVmYXVsdE1hdGNoTW9kZSwgb3BlcmF0b3I6IHRoaXMub3BlcmF0b3J9XTtcbiAgICB9XG5cbiAgICBvbk1lbnVNYXRjaE1vZGVDaGFuZ2UodmFsdWU6IGFueSwgZmlsdGVyTWV0YTogRmlsdGVyTWV0YWRhdGEpIHtcbiAgICAgICAgZmlsdGVyTWV0YS5tYXRjaE1vZGUgPSB2YWx1ZTtcblxuICAgICAgICBpZiAoIXRoaXMuc2hvd0FwcGx5QnV0dG9uKSB7XG4gICAgICAgICAgICB0aGlzLmR0Ll9maWx0ZXIoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIG9uUm93TWF0Y2hNb2RlQ2hhbmdlKG1hdGNoTW9kZTogc3RyaW5nKSB7XG4gICAgICAgICg8RmlsdGVyTWV0YWRhdGE+IHRoaXMuZHQuZmlsdGVyc1t0aGlzLmZpZWxkXSkubWF0Y2hNb2RlID0gbWF0Y2hNb2RlO1xuICAgICAgICB0aGlzLmR0Ll9maWx0ZXIoKTtcbiAgICAgICAgdGhpcy5oaWRlKCk7XG4gICAgfVxuICAgIFxuICAgIG9uUm93TWF0Y2hNb2RlS2V5RG93bihldmVudDogS2V5Ym9hcmRFdmVudCkge1xuICAgICAgICBsZXQgaXRlbSA9IDxIVE1MTElFbGVtZW50PiBldmVudC50YXJnZXQ7XG5cbiAgICAgICAgc3dpdGNoKGV2ZW50LmtleSkgeyAgICAgICAgICAgIFxuICAgICAgICAgICAgY2FzZSAnQXJyb3dEb3duJzpcbiAgICAgICAgICAgICAgICB2YXIgbmV4dEl0ZW0gPSB0aGlzLmZpbmROZXh0SXRlbShpdGVtKTtcbiAgICAgICAgICAgICAgICBpZiAobmV4dEl0ZW0pIHtcbiAgICAgICAgICAgICAgICAgICAgaXRlbS5yZW1vdmVBdHRyaWJ1dGUoJ3RhYmluZGV4Jyk7XG4gICAgICAgICAgICAgICAgICAgIG5leHRJdGVtLnRhYkluZGV4ID0gJzAnO1xuICAgICAgICAgICAgICAgICAgICBuZXh0SXRlbS5mb2N1cygpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgY2FzZSAnQXJyb3dVcCc6XG4gICAgICAgICAgICAgICAgdmFyIHByZXZJdGVtID0gdGhpcy5maW5kUHJldkl0ZW0oaXRlbSk7XG4gICAgICAgICAgICAgICAgaWYgKHByZXZJdGVtKSB7XG4gICAgICAgICAgICAgICAgICAgIGl0ZW0ucmVtb3ZlQXR0cmlidXRlKCd0YWJpbmRleCcpO1xuICAgICAgICAgICAgICAgICAgICBwcmV2SXRlbS50YWJJbmRleCA9ICcwJztcbiAgICAgICAgICAgICAgICAgICAgcHJldkl0ZW0uZm9jdXMoKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBvblJvd0NsZWFySXRlbUNsaWNrKCkge1xuICAgICAgICB0aGlzLmNsZWFyRmlsdGVyKCk7XG4gICAgICAgIHRoaXMuaGlkZSgpO1xuICAgIH1cblxuICAgIGlzUm93TWF0Y2hNb2RlU2VsZWN0ZWQobWF0Y2hNb2RlOiBzdHJpbmcpIHtcbiAgICAgICAgcmV0dXJuICg8RmlsdGVyTWV0YWRhdGE+IHRoaXMuZHQuZmlsdGVyc1t0aGlzLmZpZWxkXSkubWF0Y2hNb2RlID09PSBtYXRjaE1vZGU7XG4gICAgfVxuXG4gICAgYWRkQ29uc3RyYWludCgpIHtcbiAgICAgICAgKDxGaWx0ZXJNZXRhZGF0YVtdPiB0aGlzLmR0LmZpbHRlcnNbdGhpcy5maWVsZF0pLnB1c2goe3ZhbHVlOiBudWxsLCBtYXRjaE1vZGU6IHRoaXMuZ2V0RGVmYXVsdE1hdGNoTW9kZSgpLCBvcGVyYXRvcjogdGhpcy5nZXREZWZhdWx0T3BlcmF0b3IoKX0pO1xuICAgICAgICB0aGlzLmR0Ll9maWx0ZXIoKTtcbiAgICB9XG5cbiAgICByZW1vdmVDb25zdHJhaW50KGZpbHRlck1ldGE6IEZpbHRlck1ldGFkYXRhKSB7XG4gICAgICAgIHRoaXMuZHQuZmlsdGVyc1t0aGlzLmZpZWxkXSA9ICg8RmlsdGVyTWV0YWRhdGFbXT4gdGhpcy5kdC5maWx0ZXJzW3RoaXMuZmllbGRdKS5maWx0ZXIobWV0YSA9PiBtZXRhICE9PSBmaWx0ZXJNZXRhKTtcbiAgICAgICAgdGhpcy5kdC5fZmlsdGVyKCk7XG4gICAgfVxuXG4gICAgb25PcGVyYXRvckNoYW5nZSh2YWx1ZSkge1xuICAgICAgICAoPEZpbHRlck1ldGFkYXRhW10+IHRoaXMuZHQuZmlsdGVyc1t0aGlzLmZpZWxkXSkuZm9yRWFjaChmaWx0ZXJNZXRhID0+IHtcbiAgICAgICAgICAgIGZpbHRlck1ldGEub3BlcmF0b3IgPSB2YWx1ZTtcbiAgICAgICAgICAgIHRoaXMub3BlcmF0b3IgPSB2YWx1ZTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaWYgKCF0aGlzLnNob3dBcHBseUJ1dHRvbikge1xuICAgICAgICAgICAgdGhpcy5kdC5fZmlsdGVyKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICB0b2dnbGVNZW51KCkge1xuICAgICAgICB0aGlzLm92ZXJsYXlWaXNpYmxlID0gIXRoaXMub3ZlcmxheVZpc2libGU7XG4gICAgfVxuXG4gICAgb25Ub2dnbGVCdXR0b25LZXlEb3duKGV2ZW50OiBLZXlib2FyZEV2ZW50KSB7XG4gICAgICAgIHN3aXRjaChldmVudC5rZXkpIHtcbiAgICAgICAgICAgIGNhc2UgJ0VzY2FwZSc6XG4gICAgICAgICAgICBjYXNlICdUYWInOlxuICAgICAgICAgICAgICAgIHRoaXMub3ZlcmxheVZpc2libGUgPSBmYWxzZTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgXG4gICAgICAgICAgICBjYXNlICdBcnJvd0Rvd24nOlxuICAgICAgICAgICAgICAgIGlmICh0aGlzLm92ZXJsYXlWaXNpYmxlKSB7XG4gICAgICAgICAgICAgICAgICAgIGxldCBmb2N1c2FibGUgPSBEb21IYW5kbGVyLmdldEZvY3VzYWJsZUVsZW1lbnRzKHRoaXMub3ZlcmxheSk7XG4gICAgICAgICAgICAgICAgICAgIGlmIChmb2N1c2FibGUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvY3VzYWJsZVswXS5mb2N1cygpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2UgaWYgKGV2ZW50LmFsdEtleSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLm92ZXJsYXlWaXNpYmxlID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgIH1cblxuICAgIG9uRXNjYXBlKCkge1xuICAgICAgICB0aGlzLm92ZXJsYXlWaXNpYmxlID0gZmFsc2U7XG4gICAgICAgIHRoaXMuaWNvbi5uYXRpdmVFbGVtZW50LmZvY3VzKCk7XG4gICAgfVxuXG4gICAgZmluZE5leHRJdGVtKGl0ZW06IEhUTUxMSUVsZW1lbnQpIHtcbiAgICAgICAgbGV0IG5leHRJdGVtID0gPEhUTUxMSUVsZW1lbnQ+IGl0ZW0ubmV4dEVsZW1lbnRTaWJsaW5nO1xuXG4gICAgICAgIGlmIChuZXh0SXRlbSlcbiAgICAgICAgICAgIHJldHVybiBEb21IYW5kbGVyLmhhc0NsYXNzKG5leHRJdGVtLCAncC1jb2x1bW4tZmlsdGVyLXNlcGFyYXRvcicpICA/IHRoaXMuZmluZE5leHRJdGVtKG5leHRJdGVtKSA6IG5leHRJdGVtO1xuICAgICAgICBlbHNlXG4gICAgICAgICAgICByZXR1cm4gaXRlbS5wYXJlbnRFbGVtZW50LmZpcnN0RWxlbWVudENoaWxkO1xuICAgIH1cblxuICAgIGZpbmRQcmV2SXRlbShpdGVtOiBIVE1MTElFbGVtZW50KSB7XG4gICAgICAgIGxldCBwcmV2SXRlbSA9IDxIVE1MTElFbGVtZW50PiBpdGVtLnByZXZpb3VzRWxlbWVudFNpYmxpbmc7XG5cbiAgICAgICAgaWYgKHByZXZJdGVtKVxuICAgICAgICAgICAgcmV0dXJuIERvbUhhbmRsZXIuaGFzQ2xhc3MocHJldkl0ZW0sICdwLWNvbHVtbi1maWx0ZXItc2VwYXJhdG9yJykgID8gdGhpcy5maW5kUHJldkl0ZW0ocHJldkl0ZW0pIDogcHJldkl0ZW07XG4gICAgICAgIGVsc2VcbiAgICAgICAgcmV0dXJuIGl0ZW0ucGFyZW50RWxlbWVudC5sYXN0RWxlbWVudENoaWxkO1xuICAgIH1cblxuICAgIG9uT3ZlcmxheUFuaW1hdGlvblN0YXJ0KGV2ZW50OiBBbmltYXRpb25FdmVudCkge1xuICAgICAgICBzd2l0Y2ggKGV2ZW50LnRvU3RhdGUpIHtcbiAgICAgICAgICAgIGNhc2UgJ3Zpc2libGUnOlxuICAgICAgICAgICAgICAgIHRoaXMub3ZlcmxheSA9IGV2ZW50LmVsZW1lbnQ7XG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZCh0aGlzLm92ZXJsYXkpO1xuICAgICAgICAgICAgICAgIHRoaXMub3ZlcmxheS5zdHlsZS56SW5kZXggPSBTdHJpbmcoKytEb21IYW5kbGVyLnppbmRleCk7XG4gICAgICAgICAgICAgICAgRG9tSGFuZGxlci5hYnNvbHV0ZVBvc2l0aW9uKHRoaXMub3ZlcmxheSwgdGhpcy5pY29uLm5hdGl2ZUVsZW1lbnQpXG4gICAgICAgICAgICAgICAgdGhpcy5iaW5kRG9jdW1lbnRDbGlja0xpc3RlbmVyKCk7XG4gICAgICAgICAgICAgICAgdGhpcy5iaW5kRG9jdW1lbnRSZXNpemVMaXN0ZW5lcigpO1xuICAgICAgICAgICAgICAgIHRoaXMuYmluZFNjcm9sbExpc3RlbmVyKCk7XG4gICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgY2FzZSAndm9pZCc6XG4gICAgICAgICAgICAgICAgdGhpcy5vbk92ZXJsYXlIaWRlKCk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGdldERlZmF1bHRNYXRjaE1vZGUoKTogc3RyaW5nIHtcbiAgICAgICAgaWYgKHRoaXMubWF0Y2hNb2RlKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5tYXRjaE1vZGU7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBpZiAodGhpcy50eXBlID09PSAndGV4dCcpXG4gICAgICAgICAgICAgICAgcmV0dXJuIEZpbHRlck1hdGNoTW9kZS5TVEFSVFNfV0lUSDtcbiAgICAgICAgICAgIGVsc2UgaWYgKHRoaXMudHlwZSA9PT0gJ251bWVyaWMnKVxuICAgICAgICAgICAgICAgIHJldHVybiBGaWx0ZXJNYXRjaE1vZGUuRVFVQUxTO1xuICAgICAgICAgICAgZWxzZSBpZiAodGhpcy50eXBlID09PSAnZGF0ZScpXG4gICAgICAgICAgICAgICAgcmV0dXJuIEZpbHRlck1hdGNoTW9kZS5EQVRFX0lTO1xuICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAgIHJldHVybiBGaWx0ZXJNYXRjaE1vZGUuQ09OVEFJTlM7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBnZXREZWZhdWx0T3BlcmF0b3IoKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZHQuZmlsdGVycyA/ICg8RmlsdGVyTWV0YWRhdGFbXT4gdGhpcy5kdC5maWx0ZXJzW3RoaXMuZmllbGRdKVswXS5vcGVyYXRvcjogdGhpcy5vcGVyYXRvcjtcbiAgICB9XG5cbiAgICBoYXNSb3dGaWx0ZXIoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmR0LmZpbHRlcnNbdGhpcy5maWVsZF0gJiYgIXRoaXMuZHQuaXNGaWx0ZXJCbGFuaygoPEZpbHRlck1ldGFkYXRhPnRoaXMuZHQuZmlsdGVyc1t0aGlzLmZpZWxkXSkudmFsdWUpO1xuICAgIH1cblxuICAgIGdldCBmaWVsZENvbnN0cmFpbnRzKCk6IEZpbHRlck1ldGFkYXRhW10ge1xuICAgICAgICByZXR1cm4gdGhpcy5kdC5maWx0ZXJzID8gPEZpbHRlck1ldGFkYXRhW10+IHRoaXMuZHQuZmlsdGVyc1t0aGlzLmZpZWxkXSA6IG51bGw7XG4gICAgfVxuXG4gICAgZ2V0IHNob3dSZW1vdmVJY29uKCk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gdGhpcy5maWVsZENvbnN0cmFpbnRzID8gdGhpcy5maWVsZENvbnN0cmFpbnRzLmxlbmd0aCA+IDEgOiBmYWxzZTtcbiAgICB9XG5cbiAgICBnZXQgc2hvd01lbnVCdXR0b24oKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiB0aGlzLnNob3dNZW51ICYmICh0aGlzLmRpc3BsYXkgPT09ICdyb3cnID8gdGhpcy50eXBlICE9PSAnYm9vbGVhbic6IHRydWUpO1xuICAgIH1cblxuICAgIGdldCBpc1Nob3dPcGVyYXRvcigpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuc2hvd09wZXJhdG9yICYmIHRoaXMudHlwZSAhPT0gJ2Jvb2xlYW4nO1xuICAgIH1cblxuICAgIGdldCBpc1Nob3dBZGRDb25zdHJhaW50KCk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gdGhpcy5zaG93QWRkQnV0dG9uICYmIHRoaXMudHlwZSAhPT0gJ2Jvb2xlYW4nICYmICh0aGlzLmZpZWxkQ29uc3RyYWludHMgJiYgdGhpcy5maWVsZENvbnN0cmFpbnRzLmxlbmd0aCA8IHRoaXMubWF4Q29uc3RyYWludHMpO1xuICAgIH1cblxuICAgIGdldCBhcHBseUJ1dHRvbkxhYmVsKCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiB0aGlzLmNvbmZpZy5nZXRUcmFuc2xhdGlvbihUcmFuc2xhdGlvbktleXMuQVBQTFkpO1xuICAgIH1cblxuICAgIGdldCBjbGVhckJ1dHRvbkxhYmVsKCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiB0aGlzLmNvbmZpZy5nZXRUcmFuc2xhdGlvbihUcmFuc2xhdGlvbktleXMuQ0xFQVIpO1xuICAgIH1cblxuICAgIGdldCBhZGRSdWxlQnV0dG9uTGFiZWwoKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuY29uZmlnLmdldFRyYW5zbGF0aW9uKFRyYW5zbGF0aW9uS2V5cy5BRERfUlVMRSk7XG4gICAgfVxuXG4gICAgZ2V0IHJlbW92ZVJ1bGVCdXR0b25MYWJlbCgpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gdGhpcy5jb25maWcuZ2V0VHJhbnNsYXRpb24oVHJhbnNsYXRpb25LZXlzLlJFTU9WRV9SVUxFKTtcbiAgICB9XG5cbiAgICBnZXQgbm9GaWx0ZXJMYWJlbCgpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gdGhpcy5jb25maWcuZ2V0VHJhbnNsYXRpb24oVHJhbnNsYXRpb25LZXlzLk5PX0ZJTFRFUik7XG4gICAgfVxuXG4gICAgaGFzRmlsdGVyKCk6IGJvb2xlYW4ge1xuICAgICAgICBsZXQgZmllbGRGaWx0ZXIgPSB0aGlzLmR0LmZpbHRlcnNbdGhpcy5maWVsZF07XG4gICAgICAgIGlmIChmaWVsZEZpbHRlcikge1xuICAgICAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkoZmllbGRGaWx0ZXIpKVxuICAgICAgICAgICAgICAgIHJldHVybiAhdGhpcy5kdC5pc0ZpbHRlckJsYW5rKCg8RmlsdGVyTWV0YWRhdGFbXT4gZmllbGRGaWx0ZXIpWzBdLnZhbHVlKTsgXG4gICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgICAgcmV0dXJuICF0aGlzLmR0LmlzRmlsdGVyQmxhbmsoZmllbGRGaWx0ZXIudmFsdWUpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIGlzT3V0c2lkZUNsaWNrZWQoZXZlbnQpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuICEodGhpcy5vdmVybGF5LmlzU2FtZU5vZGUoZXZlbnQudGFyZ2V0KSB8fCB0aGlzLm92ZXJsYXkuY29udGFpbnMoZXZlbnQudGFyZ2V0KSBcbiAgICAgICAgICAgIHx8IHRoaXMuaWNvbi5uYXRpdmVFbGVtZW50LmlzU2FtZU5vZGUoZXZlbnQudGFyZ2V0KSB8fCB0aGlzLmljb24ubmF0aXZlRWxlbWVudC5jb250YWlucyhldmVudC50YXJnZXQpXG4gICAgICAgICAgICB8fCBEb21IYW5kbGVyLmhhc0NsYXNzKGV2ZW50LnRhcmdldCwgJ3AtY29sdW1uLWZpbHRlci1hZGQtYnV0dG9uJykgfHwgRG9tSGFuZGxlci5oYXNDbGFzcyhldmVudC50YXJnZXQucGFyZW50RWxlbWVudCwgJ3AtY29sdW1uLWZpbHRlci1hZGQtYnV0dG9uJylcbiAgICAgICAgICAgIHx8IERvbUhhbmRsZXIuaGFzQ2xhc3MoZXZlbnQudGFyZ2V0LCAncC1jb2x1bW4tZmlsdGVyLXJlbW92ZS1idXR0b24nKSB8fCBEb21IYW5kbGVyLmhhc0NsYXNzKGV2ZW50LnRhcmdldC5wYXJlbnRFbGVtZW50LCAncC1jb2x1bW4tZmlsdGVyLXJlbW92ZS1idXR0b24nKSk7XG4gICAgfVxuXG4gICAgYmluZERvY3VtZW50Q2xpY2tMaXN0ZW5lcigpIHtcbiAgICAgICAgaWYgKCF0aGlzLmRvY3VtZW50Q2xpY2tMaXN0ZW5lcikge1xuICAgICAgICAgICAgY29uc3QgZG9jdW1lbnRUYXJnZXQ6IGFueSA9IHRoaXMuZWwgPyB0aGlzLmVsLm5hdGl2ZUVsZW1lbnQub3duZXJEb2N1bWVudCA6ICdkb2N1bWVudCc7XG5cbiAgICAgICAgICAgIHRoaXMuZG9jdW1lbnRDbGlja0xpc3RlbmVyID0gdGhpcy5yZW5kZXJlci5saXN0ZW4oZG9jdW1lbnRUYXJnZXQsICdtb3VzZWRvd24nLCBldmVudCA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuaXNPdXRzaWRlQ2xpY2tlZChldmVudCkpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5oaWRlKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICB1bmJpbmREb2N1bWVudENsaWNrTGlzdGVuZXIoKSB7XG4gICAgICAgIGlmICh0aGlzLmRvY3VtZW50Q2xpY2tMaXN0ZW5lcikge1xuICAgICAgICAgICAgdGhpcy5kb2N1bWVudENsaWNrTGlzdGVuZXIoKTtcbiAgICAgICAgICAgIHRoaXMuZG9jdW1lbnRDbGlja0xpc3RlbmVyID0gbnVsbDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGJpbmREb2N1bWVudFJlc2l6ZUxpc3RlbmVyKCkge1xuICAgICAgICB0aGlzLmRvY3VtZW50UmVzaXplTGlzdGVuZXIgPSAoKSA9PiB0aGlzLmhpZGUoKTtcbiAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsIHRoaXMuZG9jdW1lbnRSZXNpemVMaXN0ZW5lcik7XG4gICAgfVxuXG4gICAgdW5iaW5kRG9jdW1lbnRSZXNpemVMaXN0ZW5lcigpIHtcbiAgICAgICAgaWYgKHRoaXMuZG9jdW1lbnRSZXNpemVMaXN0ZW5lcikge1xuICAgICAgICAgICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsIHRoaXMuZG9jdW1lbnRSZXNpemVMaXN0ZW5lcik7XG4gICAgICAgICAgICB0aGlzLmRvY3VtZW50UmVzaXplTGlzdGVuZXIgPSBudWxsO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgYmluZFNjcm9sbExpc3RlbmVyKCkge1xuICAgICAgICBpZiAoIXRoaXMuc2Nyb2xsSGFuZGxlcikge1xuICAgICAgICAgICAgdGhpcy5zY3JvbGxIYW5kbGVyID0gbmV3IENvbm5lY3RlZE92ZXJsYXlTY3JvbGxIYW5kbGVyKHRoaXMuaWNvbi5uYXRpdmVFbGVtZW50LCAoKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMub3ZlcmxheVZpc2libGUpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5oaWRlKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLnNjcm9sbEhhbmRsZXIuYmluZFNjcm9sbExpc3RlbmVyKCk7XG4gICAgfVxuXG4gICAgdW5iaW5kU2Nyb2xsTGlzdGVuZXIoKSB7XG4gICAgICAgIGlmICh0aGlzLnNjcm9sbEhhbmRsZXIpIHtcbiAgICAgICAgICAgIHRoaXMuc2Nyb2xsSGFuZGxlci51bmJpbmRTY3JvbGxMaXN0ZW5lcigpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgaGlkZSgpIHtcbiAgICAgICAgdGhpcy5vdmVybGF5VmlzaWJsZSA9IGZhbHNlO1xuICAgIH1cblxuICAgIG9uT3ZlcmxheUhpZGUoKSB7XG4gICAgICAgIHRoaXMudW5iaW5kRG9jdW1lbnRDbGlja0xpc3RlbmVyKCk7XG4gICAgICAgIHRoaXMudW5iaW5kRG9jdW1lbnRSZXNpemVMaXN0ZW5lcigpO1xuICAgICAgICB0aGlzLnVuYmluZFNjcm9sbExpc3RlbmVyKCk7XG4gICAgICAgIHRoaXMub3ZlcmxheSA9IG51bGw7XG4gICAgfVxuXG4gICAgY2xlYXJGaWx0ZXIoKSB7XG4gICAgICAgIHRoaXMuaW5pdEZpZWxkRmlsdGVyQ29uc3RyYWludCgpO1xuICAgICAgICB0aGlzLmR0Ll9maWx0ZXIoKTtcbiAgICB9XG5cbiAgICBhcHBseUZpbHRlcigpIHtcbiAgICAgICAgdGhpcy5kdC5fZmlsdGVyKCk7XG4gICAgICAgIHRoaXMuaGlkZSgpO1xuICAgIH1cblxuICAgIG5nT25EZXN0cm95KCkge1xuICAgICAgICBpZiAodGhpcy5vdmVybGF5KSB7XG4gICAgICAgICAgICB0aGlzLmVsLm5hdGl2ZUVsZW1lbnQuYXBwZW5kQ2hpbGQodGhpcy5vdmVybGF5KTtcbiAgICAgICAgICAgIHRoaXMub25PdmVybGF5SGlkZSgpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMudHJhbnNsYXRpb25TdWJzY3JpcHRpb24pIHtcbiAgICAgICAgICAgIHRoaXMudHJhbnNsYXRpb25TdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcbiAgICAgICAgfVxuICAgIH1cbn1cblxuQE5nTW9kdWxlKHtcbiAgICBpbXBvcnRzOiBbQ29tbW9uTW9kdWxlLFBhZ2luYXRvck1vZHVsZSxJbnB1dFRleHRNb2R1bGUsRHJvcGRvd25Nb2R1bGUsU2Nyb2xsaW5nTW9kdWxlLEZvcm1zTW9kdWxlLEJ1dHRvbk1vZHVsZSxTZWxlY3RCdXR0b25Nb2R1bGUsQ2FsZW5kYXJNb2R1bGUsSW5wdXROdW1iZXJNb2R1bGUsVHJpU3RhdGVDaGVja2JveE1vZHVsZV0sXG4gICAgZXhwb3J0czogW1RhYmxlLFNoYXJlZE1vZHVsZSxTb3J0YWJsZUNvbHVtbixTZWxlY3RhYmxlUm93LFJvd1RvZ2dsZXIsQ29udGV4dE1lbnVSb3csUmVzaXphYmxlQ29sdW1uLFJlb3JkZXJhYmxlQ29sdW1uLEVkaXRhYmxlQ29sdW1uLENlbGxFZGl0b3IsU29ydEljb24sXG4gICAgICAgICAgICBUYWJsZVJhZGlvQnV0dG9uLFRhYmxlQ2hlY2tib3gsVGFibGVIZWFkZXJDaGVja2JveCxSZW9yZGVyYWJsZVJvd0hhbmRsZSxSZW9yZGVyYWJsZVJvdyxTZWxlY3RhYmxlUm93RGJsQ2xpY2ssRWRpdGFibGVSb3csSW5pdEVkaXRhYmxlUm93LFNhdmVFZGl0YWJsZVJvdyxDYW5jZWxFZGl0YWJsZVJvdyxTY3JvbGxpbmdNb2R1bGUsQ29sdW1uRmlsdGVyXSxcbiAgICBkZWNsYXJhdGlvbnM6IFtUYWJsZSxTb3J0YWJsZUNvbHVtbixTZWxlY3RhYmxlUm93LFJvd1RvZ2dsZXIsQ29udGV4dE1lbnVSb3csUmVzaXphYmxlQ29sdW1uLFJlb3JkZXJhYmxlQ29sdW1uLEVkaXRhYmxlQ29sdW1uLENlbGxFZGl0b3IsVGFibGVCb2R5LFNjcm9sbGFibGVWaWV3LFNvcnRJY29uLFxuICAgICAgICAgICAgVGFibGVSYWRpb0J1dHRvbixUYWJsZUNoZWNrYm94LFRhYmxlSGVhZGVyQ2hlY2tib3gsUmVvcmRlcmFibGVSb3dIYW5kbGUsUmVvcmRlcmFibGVSb3csU2VsZWN0YWJsZVJvd0RibENsaWNrLEVkaXRhYmxlUm93LEluaXRFZGl0YWJsZVJvdyxTYXZlRWRpdGFibGVSb3csQ2FuY2VsRWRpdGFibGVSb3csQ29sdW1uRmlsdGVyLENvbHVtbkZpbHRlckZvcm1FbGVtZW50XVxufSlcbmV4cG9ydCBjbGFzcyBUYWJsZU1vZHVsZSB7IH0iXX0=