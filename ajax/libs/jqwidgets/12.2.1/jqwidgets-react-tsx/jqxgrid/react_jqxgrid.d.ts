import * as React from 'react';
declare class JqxGrid extends React.PureComponent<IGridProps, IState> {
    protected static getDerivedStateFromProps(props: IGridProps, state: IState): null | IState;
    private _jqx;
    private _id;
    private _componentSelector;
    constructor(props: IGridProps);
    componentDidMount(): void;
    componentDidUpdate(): void;
    render(): React.ReactNode;
    setOptions(options: IGridProps): void;
    getOptions(option: string): any;
    autoresizecolumns(type?: string): void;
    autoresizecolumn(dataField: string, type?: string): void;
    beginupdate(): void;
    clear(): void;
    createChart(type: string, dataSource?: any): void;
    destroy(): void;
    endupdate(): void;
    ensurerowvisible(rowBoundIndex: number): void;
    focus(): void;
    getcolumnindex(dataField: string): number;
    getcolumn(dataField: string): IGridGetColumn;
    getcolumnproperty(dataField: string, propertyName: string): any;
    getrowid(rowBoundIndex: number): string;
    getrowdata(rowBoundIndex: number): any;
    getrowdatabyid(rowID: string): any;
    getrowboundindexbyid(rowID: string): number;
    getrowboundindex(rowDisplayIndex: number): number;
    getrows(): any[];
    getboundrows(): any[];
    getdisplayrows(): any[];
    getdatainformation(): IGridGetDataInformation;
    getsortinformation(): IGridGetSortInformation;
    getpaginginformation(): IGridGetPagingInformation;
    hidecolumn(dataField: string): void;
    hideloadelement(): void;
    hiderowdetails(rowBoundIndex: number): void;
    iscolumnvisible(dataField: string): boolean;
    iscolumnpinned(dataField: string): boolean;
    localizestrings(localizationobject: IGridLocalizationobject): void;
    pincolumn(dataField: string): void;
    refreshdata(): void;
    refresh(): void;
    renderWidget(): void;
    scrolloffset(top: number, left: number): void;
    scrollposition(): IGridScrollPosition;
    showloadelement(): void;
    showrowdetails(rowBoundIndex: number): void;
    setcolumnindex(dataField: string, index: number): void;
    setcolumnproperty(dataField: string, propertyName: any, propertyValue: any): void;
    showcolumn(dataField: string): void;
    unpincolumn(dataField: string): void;
    updatebounddata(type?: any): void;
    updating(): boolean;
    getsortcolumn(): string;
    removesort(): void;
    sortby(dataField: string, sortOrder: string): void;
    addgroup(dataField: string): void;
    cleargroups(): void;
    collapsegroup(group: number | string): void;
    collapseallgroups(): void;
    expandallgroups(): void;
    expandgroup(group: number | string): void;
    getrootgroupscount(): number;
    getgroup(groupIndex: number): IGridGetGroup;
    insertgroup(groupIndex: number, dataField: string): void;
    iscolumngroupable(): boolean;
    removegroupat(groupIndex: number): void;
    removegroup(dataField: string): void;
    addfilter(dataField: string, filterGroup: any, refreshGrid?: boolean): void;
    applyfilters(): void;
    clearfilters(): void;
    getfilterinformation(): any;
    getcolumnat(index: number): any;
    removefilter(dataField: string, refreshGrid: boolean): void;
    refreshfilterrow(): void;
    gotopage(pagenumber: number): void;
    gotoprevpage(): void;
    gotonextpage(): void;
    addrow(rowIds: any, data: any, rowPosition?: any): void;
    begincelledit(rowBoundIndex: number, dataField: string): void;
    beginrowedit(rowBoundIndex: number): void;
    closemenu(): void;
    deleterow(rowIds: string | number | Array<number | string>): void;
    endcelledit(rowBoundIndex: number, dataField: string, confirmChanges: boolean): void;
    endrowedit(rowBoundIndex: number, confirmChanges: boolean): void;
    getcell(rowBoundIndex: number, datafield: string): IGridGetCell;
    getcellatposition(left: number, top: number): IGridGetCell;
    getcelltext(rowBoundIndex: number, dataField: string): string;
    getcelltextbyid(rowID: string, dataField: string): string;
    getcellvaluebyid(rowID: string, dataField: string): any;
    getcellvalue(rowBoundIndex: number, dataField: string): any;
    isBindingCompleted(): boolean;
    openmenu(dataField: string): void;
    setcellvalue(rowBoundIndex: number, dataField: string, value: any): void;
    setcellvaluebyid(rowID: string, dataField: string, value: any): void;
    showvalidationpopup(rowBoundIndex: number, dataField: string, validationMessage: string): void;
    updaterow(rowIds: string | number | Array<number | string>, data: any): void;
    clearselection(): void;
    getselectedrowindex(): number;
    getselectedrowindexes(): number[];
    getselectedcell(): IGridGetSelectedCell;
    getselectedcells(): IGridGetSelectedCell[];
    selectcell(rowBoundIndex: number, dataField: string): void;
    selectallrows(): void;
    selectrow(rowBoundIndex: number): void;
    unselectrow(rowBoundIndex: number): void;
    unselectcell(rowBoundIndex: number, dataField: string): void;
    getcolumnaggregateddata(dataField: string, aggregates: any[]): string;
    refreshaggregates(): void;
    renderaggregates(): void;
    exportdata(dataType: string, fileName?: string, exportHeader?: boolean, rows?: number[], exportHiddenColumns?: boolean, serverURL?: string, charSet?: string): any;
    exportview(dataType: string, fileName?: string): any;
    openColumnChooser(columns?: any, header?: string): void;
    getstate(): IGridGetState;
    loadstate(stateobject: any): void;
    savestate(): IGridGetState;
    private _manageProps;
    private _wireEvents;
}
export default JqxGrid;
export declare const jqx: any;
export declare const JQXLite: any;
interface IState {
    lastProps: object;
}
export interface IGridCharting {
    appendTo?: string;
    colorScheme?: string;
    dialog?: (width: number, height: number, header: string, position: any, enabled: boolean) => void;
    formatSettings?: any;
    ready?: any;
}
export interface IGridColumn {
    text?: string;
    datafield?: string;
    displayfield?: string;
    threestatecheckbox?: boolean;
    sortable?: boolean;
    filterable?: boolean;
    filter?: (cellValue?: any, rowData?: any, dataField?: string, filterGroup?: any, defaultFilterResult?: any) => any;
    buttonclick?: (row: number) => void;
    hideable?: boolean;
    hidden?: boolean;
    groupable?: boolean;
    menu?: boolean;
    exportable?: boolean;
    columngroup?: string;
    enabletooltips?: boolean;
    columntype?: 'number' | 'checkbox' | 'button' | 'numberinput' | 'dropdownlist' | 'combobox' | 'datetimeinput' | 'textbox' | 'rating' | 'progressbar' | 'template' | 'custom';
    renderer?: (defaultText?: string, alignment?: string, height?: number) => string;
    rendered?: (columnHeaderElement?: any) => void;
    cellsrenderer?: (row?: number, columnfield?: string, value?: any, defaulthtml?: string, columnproperties?: any, rowdata?: any) => string;
    aggregatesrenderer?: (aggregates?: any, column?: any, element?: any, summaryData?: any) => string;
    validation?: (cell?: any, value?: number) => any;
    createwidget?: (row: any, column: any, value: string, cellElement: any) => void;
    initwidget?: (row: number, column: string, value: string, cellElement: any) => void;
    createfilterwidget?: (column: any, htmlElement: HTMLElement, editor: any) => void;
    createfilterpanel?: (datafield: string, filterPanel: any) => void;
    initeditor?: (row: number, cellvalue: any, editor: any, celltext: any, pressedChar: string, callback: any) => void;
    createeditor?: (row: number, cellvalue: any, editor: any, celltext: any, cellwidth: any, cellheight: any) => void;
    destroyeditor?: (row: number, callback: any) => void;
    geteditorvalue?: (row: number, cellvalue: any, editor: any) => any;
    cellbeginedit?: (row: number, datafield: string, columntype: string, value: any) => boolean;
    cellendedit?: (row: number, datafield: string, columntype: string, oldvalue: any, newvalue: any) => boolean;
    cellvaluechanging?: (row: number, datafield: string, columntype: string, oldvalue: any, newvalue: any) => string | void;
    createeverpresentrowwidget?: (datafield: string, htmlElement: HTMLElement, popup: any, addRowCallback: any) => any;
    initeverpresentrowwidget?: (datafield: string, htmlElement: HTMLElement, popup: any) => void;
    reseteverpresentrowwidgetvalue?: (datafield: string, htmlElement: HTMLElement) => void;
    geteverpresentrowwidgetvalue?: (datafield: string, htmlElement: HTMLElement) => any;
    destroyeverpresentrowwidget?: (htmlElement: HTMLElement) => void;
    validateeverpresentrowwidgetvalue?: (datafield: string, value: any, rowValues: any) => boolean | object;
    cellsformat?: string;
    cellclassname?: any;
    aggregates?: any;
    align?: 'left' | 'center' | 'right';
    cellsalign?: 'left' | 'center' | 'right';
    width?: number | string;
    minwidth?: any;
    maxwidth?: any;
    resizable?: boolean;
    draggable?: boolean;
    editable?: boolean;
    classname?: string;
    pinned?: boolean;
    nullable?: boolean;
    filteritems?: any;
    filterdelay?: number;
    filtertype?: 'textbox' | 'input' | 'checkedlist' | 'list' | 'number' | 'bool' | 'date' | 'range' | 'custom';
    filtercondition?: 'EMPTY' | 'NOT_EMPTY' | 'CONTAINS' | 'CONTAINS_CASE_SENSITIVE' | 'DOES_NOT_CONTAIN' | 'DOES_NOT_CONTAIN_CASE_SENSITIVE' | 'STARTS_WITH' | 'STARTS_WITH_CASE_SENSITIVE' | 'ENDS_WITH' | 'ENDS_WITH_CASE_SENSITIVE' | 'EQUAL' | 'EQUAL_CASE_SENSITIVE' | 'NULL' | 'NOT_NULL' | 'EQUAL' | 'NOT_EQUAL' | 'LESS_THAN' | 'LESS_THAN_OR_EQUAL' | 'GREATER_THAN' | 'GREATER_THAN_OR_EQUAL' | 'NULL' | 'NOT_NULL';
}
export interface IGridSourceDataFields {
    name?: string;
    type?: 'string' | 'date' | 'int' | 'float' | 'number' | 'bool';
    format?: string;
    map?: string;
    id?: string;
    text?: string;
    source?: any[];
}
export interface IGridSource {
    url?: string;
    data?: any;
    localdata?: any;
    datatype?: 'xml' | 'json' | 'jsonp' | 'tsv' | 'csv' | 'local' | 'array' | 'observablearray';
    type?: 'GET' | 'POST';
    id?: string;
    root?: string;
    record?: string;
    datafields?: IGridSourceDataFields[];
    pagenum?: number;
    pagesize?: number;
    pager?: (pagenum?: number, pagesize?: number, oldpagenum?: number) => any;
    sortcolumn?: string;
    sortdirection?: 'asc' | 'desc';
    sort?: (column?: any, direction?: any) => void;
    filter?: (filters?: any, recordsArray?: any) => void;
    addrow?: (rowid?: any, rowdata?: any, position?: any, commit?: boolean) => void;
    deleterow?: (rowid?: any, commit?: boolean) => void;
    updaterow?: (rowid?: any, newdata?: any, commit?: any) => void;
    processdata?: (data: any) => void;
    formatdata?: (data: any) => any;
    async?: boolean;
    totalrecords?: number;
    unboundmode?: boolean;
}
export interface IGridGetColumn {
    datafield?: string;
    displayfield?: string;
    text?: string;
    sortable?: boolean;
    filterable?: boolean;
    exportable?: boolean;
    editable?: boolean;
    groupable?: boolean;
    resizable?: boolean;
    draggable?: boolean;
    classname?: string;
    cellclassname?: any;
    width?: number | string;
    menu?: boolean;
}
export interface IGridGetDataInformation {
    rowscount?: string;
    sortinformation?: any;
    sortcolumn?: any;
    sortdirection?: any;
    paginginformation?: any;
    pagenum?: any;
    pagesize?: any;
    pagescount?: any;
}
export interface IGridGetSortInformation {
    sortcolumn?: string;
    sortdirection?: any;
}
export interface IGridGetPagingInformation {
    pagenum?: string;
    pagesize?: any;
    pagescount?: any;
}
export interface IGridDateNaming {
    names?: string[];
    namesAbbr?: string[];
    namesShort?: string[];
}
export interface IGridLocalizationobject {
    filterstringcomparisonoperators?: any;
    filternumericcomparisonoperators?: any;
    filterdatecomparisonoperators?: any;
    filterbooleancomparisonoperators?: any;
    pagergotopagestring?: string;
    pagershowrowsstring?: string;
    pagerrangestring?: string;
    pagernextbuttonstring?: string;
    pagerpreviousbuttonstring?: string;
    sortascendingstring?: string;
    sortdescendingstring?: string;
    sortremovestring?: string;
    firstDay?: number;
    percentsymbol?: string;
    currencysymbol?: string;
    currencysymbolposition?: string;
    decimalseparator?: string;
    thousandsseparator?: string;
    days?: IGridDateNaming;
    months?: IGridDateNaming;
    addrowstring?: string;
    updaterowstring?: string;
    deleterowstring?: string;
    resetrowstring?: string;
    everpresentrowplaceholder?: string;
    emptydatastring?: string;
}
export interface IGridScrollPosition {
    top?: number;
    left?: number;
}
export interface IGridGetGroup {
    group?: number;
    level?: number;
    expanded?: number;
    subgroups?: number;
    subrows?: number;
}
export interface IGridGetCell {
    value?: number;
    row?: number;
    column?: number;
}
export interface IGridGetSelectedCell {
    rowindex?: number;
    datafield?: string;
}
export interface IGridGetStateColumns {
    width?: number | string;
    hidden?: boolean;
    index?: number;
    pinned?: boolean;
    groupable?: boolean;
    resizable?: boolean;
    draggable?: boolean;
    text?: string;
    align?: string;
    cellsalign?: string;
}
export interface IGridGetState {
    width?: number | string;
    height?: number | string;
    pagenum?: number;
    pagesize?: number;
    pagesizeoptions?: string[];
    sortcolumn?: any;
    sortdirection?: any;
    filters?: any;
    groups?: any;
    columns?: IGridGetStateColumns;
}
export interface IGridColumnmenuopening {
    menu?: any;
    datafield?: any;
    height?: any;
}
export interface IGridColumnmenuclosing {
    menu?: any;
    datafield?: any;
    height?: any;
}
export interface IGridCellhover {
    cellhtmlElement?: any;
    x?: any;
    y?: any;
}
export interface IGridGroupsrenderer {
    text?: string;
    group?: number;
    expanded?: boolean;
    data?: object;
}
export interface IGridGroupcolumnrenderer {
    text?: any;
}
export interface IGridHandlekeyboardnavigation {
    event?: any;
}
export interface IGridScrollfeedback {
    row?: object;
}
export interface IGridFilter {
    cellValue?: any;
    rowData?: any;
    dataField?: string;
    filterGroup?: any;
    defaultFilterResult?: boolean;
}
export interface IGridRendertoolbar {
    toolbar?: any;
}
export interface IGridRenderstatusbar {
    statusbar?: any;
}
interface IGridOptions {
    altrows?: boolean;
    altstart?: number;
    altstep?: number;
    autoshowloadelement?: boolean;
    autoshowfiltericon?: boolean;
    autoshowcolumnsmenubutton?: boolean;
    showcolumnlines?: boolean;
    showrowlines?: boolean;
    showcolumnheaderlines?: boolean;
    adaptive?: boolean;
    adaptivewidth?: number;
    clipboard?: boolean;
    closeablegroups?: boolean;
    columnsmenuwidth?: number;
    columnmenuopening?: (menu?: IGridColumnmenuopening['menu'], datafield?: IGridColumnmenuopening['datafield'], height?: IGridColumnmenuopening['height']) => boolean | void;
    columnmenuclosing?: (menu?: IGridColumnmenuclosing['menu'], datafield?: IGridColumnmenuclosing['datafield'], height?: IGridColumnmenuclosing['height']) => boolean;
    cellhover?: (cellhtmlElement?: IGridCellhover['cellhtmlElement'], x?: IGridCellhover['x'], y?: IGridCellhover['y']) => void;
    enablekeyboarddelete?: boolean;
    enableellipsis?: boolean;
    enablemousewheel?: boolean;
    enableanimations?: boolean;
    enabletooltips?: boolean;
    enablehover?: boolean;
    enablebrowserselection?: boolean;
    everpresentrowposition?: 'top' | 'bottom' | 'topAboveFilterRow';
    everpresentrowheight?: number;
    everpresentrowactions?: string;
    everpresentrowactionsmode?: 'popup' | 'columns';
    filterrowheight?: number;
    filtermode?: 'default' | 'excel';
    groupsrenderer?: (text?: IGridGroupsrenderer['text'], group?: IGridGroupsrenderer['group'], expanded?: IGridGroupsrenderer['expanded'], data?: IGridGroupsrenderer['data']) => string;
    groupcolumnrenderer?: (text?: IGridGroupcolumnrenderer['text']) => string;
    groupsexpandedbydefault?: boolean;
    handlekeyboardnavigation?: (event: IGridHandlekeyboardnavigation['event']) => boolean;
    pagerrenderer?: () => any[];
    rtl?: boolean;
    showdefaultloadelement?: boolean;
    showfiltercolumnbackground?: boolean;
    showfiltermenuitems?: boolean;
    showpinnedcolumnbackground?: boolean;
    showsortcolumnbackground?: boolean;
    showsortmenuitems?: boolean;
    showgroupmenuitems?: boolean;
    showrowdetailscolumn?: boolean;
    showheader?: boolean;
    showgroupsheader?: boolean;
    showaggregates?: boolean;
    showgroupaggregates?: boolean;
    showeverpresentrow?: boolean;
    showfilterrow?: boolean;
    showemptyrow?: boolean;
    showstatusbar?: boolean;
    statusbarheight?: number;
    showtoolbar?: boolean;
    showfilterbar?: boolean;
    filterbarmode?: string;
    selectionmode?: 'none' | 'singlerow' | 'multiplerows' | 'multiplerowsextended' | 'singlecell' | 'multiplecells' | 'multiplecellsextended' | 'multiplecellsadvanced' | 'checkbox';
    updatefilterconditions?: (type?: string, defaultconditions?: any) => any;
    updatefilterpanel?: (filtertypedropdown1?: any, filtertypedropdown2?: any, filteroperatordropdown?: any, filterinputfield1?: any, filterinputfield2?: any, filterbutton?: any, clearbutton?: any, columnfilter?: any, filtertype?: any, filterconditions?: any) => any;
    theme?: string;
    toolbarheight?: number;
    autoheight?: boolean;
    autorowheight?: boolean;
    columnsheight?: number;
    deferreddatafields?: string[];
    groupsheaderheight?: number;
    groupindentwidth?: number;
    height?: number | string;
    pagerheight?: number | string;
    rowsheight?: number;
    scrollbarsize?: number | string;
    scrollmode?: 'default' | 'logical' | 'deferred';
    scrollfeedback?: (row: IGridScrollfeedback['row']) => string;
    width?: string | number;
    autosavestate?: boolean;
    autoloadstate?: boolean;
    columns?: IGridColumn[];
    enableSanitize?: boolean;
    cardview?: boolean;
    cardviewcolumns?: any;
    cardheight?: number;
    cardsize?: number;
    columngroups?: any[];
    columnsmenu?: boolean;
    columnsresize?: boolean;
    columnsautoresize?: boolean;
    columnsreorder?: boolean;
    charting?: IGridCharting;
    disabled?: boolean;
    editable?: boolean;
    batcheditable?: boolean;
    editmode?: 'click' | 'selectedcell' | 'selectedrow' | 'dblclick' | 'programmatic';
    filter?: (cellValue?: IGridFilter['cellValue'], rowData?: IGridFilter['rowData'], dataField?: IGridFilter['dataField'], filterGroup?: IGridFilter['filterGroup'], defaultFilterResult?: IGridFilter['defaultFilterResult']) => any;
    filterable?: boolean;
    groupable?: boolean;
    groups?: string[];
    horizontalscrollbarstep?: number;
    horizontalscrollbarlargestep?: number;
    initrowdetails?: (index?: number, parentElement?: any, gridElement?: any, datarecord?: any) => void;
    keyboardnavigation?: boolean;
    localization?: IGridLocalizationobject;
    pagesize?: number;
    pagesizeoptions?: Array<number | string>;
    pagermode?: 'simple' | 'default' | 'material';
    pagerbuttonscount?: number;
    pageable?: boolean;
    autofill?: boolean;
    rowdetails?: boolean;
    rowdetailstemplate?: any;
    ready?: () => void;
    rendered?: (type: any) => void;
    renderstatusbar?: (statusbar?: IGridRenderstatusbar['statusbar']) => void;
    rendertoolbar?: (toolbar?: IGridRendertoolbar['toolbar']) => void;
    rendergridrows?: (params?: any) => any;
    sortable?: boolean;
    sortmode?: string;
    selectedrowindex?: number;
    selectedrowindexes?: number[];
    source?: IGridSource;
    sorttogglestates?: '0' | '1' | '2';
    updatedelay?: number;
    virtualmode?: boolean;
    verticalscrollbarstep?: number;
    verticalscrollbarlargestep?: number;
}
export interface IGridProps extends IGridOptions {
    className?: string;
    style?: React.CSSProperties;
    onBindingcomplete?: (e?: Event) => void;
    onColumnresized?: (e?: Event) => void;
    onColumnreordered?: (e?: Event) => void;
    onColumnclick?: (e?: Event) => void;
    onCellclick?: (e?: Event) => void;
    onCelldoubleclick?: (e?: Event) => void;
    onCellselect?: (e?: Event) => void;
    onCellunselect?: (e?: Event) => void;
    onCellvaluechanged?: (e?: Event) => void;
    onCellbeginedit?: (e?: Event) => void;
    onCellendedit?: (e?: Event) => void;
    onFilter?: (e?: Event) => void;
    onGroupschanged?: (e?: Event) => void;
    onGroupexpand?: (e?: Event) => void;
    onGroupcollapse?: (e?: Event) => void;
    onPagechanged?: (e?: Event) => void;
    onPagesizechanged?: (e?: Event) => void;
    onRowclick?: (e?: Event) => void;
    onRowdoubleclick?: (e?: Event) => void;
    onRowselect?: (e?: Event) => void;
    onRowunselect?: (e?: Event) => void;
    onRowexpand?: (e?: Event) => void;
    onRowcollapse?: (e?: Event) => void;
    onSort?: (e?: Event) => void;
}
