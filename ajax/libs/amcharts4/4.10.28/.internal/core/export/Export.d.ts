/**
 * Export module.
 *
 * Parts of Export functionality rely on the following third party libraries:
 *
 * [canvg.js](https://github.com/canvg/canvg)
 * Copyright (c) Gabe Lerner
 * Licensed under [MIT](https://github.com/canvg/canvg/blob/master/LICENSE)
 *
 * [pdfmake](http://pdfmake.org/)
 * Copyright (c) 2014 bpampuch
 * Licensed under [MIT](https://github.com/bpampuch/pdfmake/blob/master/LICENSE)
 *
 * [SheetJS Community Edition](https://github.com/sheetjs/js-xlsx)
 * Licensed under [Apache License 2.0](https://github.com/SheetJS/js-xlsx/blob/master/LICENSE)
 *
 * [JSZip](http://stuartk.com/jszip)
 * Copyright (c) Stuart Knightley
 * Dual licenced under the [MIT license or GPLv3](https://raw.githubusercontent.com/Stuk/jszip/master/LICENSE.markdown).
 */
/**
 * ============================================================================
 * IMPORTS
 * ============================================================================
 * @hidden
 */
import { ExportMenu } from "./ExportMenu";
import { Adapter } from "../utils/Adapter";
import { Sprite } from "../Sprite";
import { Preloader } from "../elements/Preloader";
import { Modal } from "../elements/Modal";
import { List } from "../utils/List";
import { Dictionary } from "../utils/Dictionary";
import { IDisposer } from "../utils/Disposer";
import { DateFormatter } from "../formatters/DateFormatter";
import { DurationFormatter } from "../formatters/DurationFormatter";
import { NumberFormatter } from "../formatters/NumberFormatter";
import { Language } from "../utils/Language";
import { Validatable } from "../utils/Validatable";
import { Color } from "../utils/Color";
import { Align } from "../defs/Align";
import * as $type from "../utils/Type";
export interface IFile {
    path: string;
    bytes: string;
}
export interface IFont {
    name: string;
    normal: IFile;
    bold?: IFile;
    italics?: IFile;
    bolditalics?: IFile;
}
/**
 * ============================================================================
 * REQUISITES
 * ============================================================================
 * @hidden
 */
/**
 * Represents an Event object that comes from [[Export]].
 */
export declare type ExportOperation = {
    format?: string;
    options?: any;
};
/**
 * Defines image formats available for export.
 */
export declare type imageFormats = "png" | "gif" | "jpg";
/**
 * An interface describing extra elements to include in export.
 *
 * @since 4.2.0
 */
export interface IExportCanvas {
    /**
     * Top margin in pixels.
     */
    marginTop?: number;
    /**
     * Right margin in pixels.
     */
    marginRight?: number;
    /**
     * Bottom margin in pixels.
     */
    marginBottom?: number;
    /**
     * Left margin in pixels.
     */
    marginLeft?: number;
    /**
     * Position to put extra element in relation to main chart.
     */
    position?: "left" | "right" | "top" | "bottom";
    /**
     * Reference to element.
     */
    sprite?: Sprite;
    /**
     * If this is set to `true` and extra element is higher/wider than main
     * chart element, the extra element will be cropped.
     *
     * @default false
     * @since 4.6.1
     */
    crop?: boolean;
}
/**
 * Represents options for image export.
 */
export interface IExportImageOptions {
    /**
     * Quality of the exported image. (0-1)
     */
    quality?: number;
    /**
     * Rescale image.
     *
     * Number less than 1 will shrink the image.
     *
     * Number bigger than 1 will scale up the image.
     *
     * @default 1
     */
    scale?: number;
    /**
     * Minimum width in pixels of the exported image. If source chart is smaller
     * thank this, it will be scaled up.
     *
     * @since 4.9.24
     */
    minWidth?: number;
    /**
     * Minimum height in pixels of the exported image. If source chart is smaller
     * thank this, it will be scaled up.
     *
     * @since 4.9.24
     */
    minHeight?: number;
    /**
     * Maximum width in pixels of the exported image. If source chart is bigger
     * thank this, it will be scaled down.
     *
     * NOTE: this setting might be overidden by `minWidth`.
     *
     * @since 4.9.24
     */
    maxWidth?: number;
    /**
     * Maximum height in pixels of the exported image. If source chart is bigger
     * thank this, it will be scaled down.
     *
     * NOTE: this setting might be overidden by `minHeight`.
     *
     * @since 4.9.24
     */
    maxHeight?: number;
    /**
     * Normally, Export removes "tainted" images (images that are loaded from
     * other host than the chart itself) before export.
     *
     * Set this to `true` to disable it.
     *
     * Please note that removal of tainted images might trigger cross-origin
     * security restrictions in browser and prevent the whole export operation,
     * so use with caution.
     *
     * @default false
     */
    keepTainted?: boolean;
    /**
     * Set this option to `disabled` for a format to not show up in [[ExportMenu]].
     *
     * @since 4.9.11
     */
    disabled?: boolean;
}
/**
 * Represents options for SVG export.
 */
export interface IExportSVGOptions {
    /**
     * Set this option to `disabled` for a format to not show up in [[ExportMenu]].
     *
     * @since 4.9.11
     */
    disabled?: boolean;
    /**
     * Rescale image.
     *
     * Number less than 1 will shrink the image.
     *
     * Number bigger than 1 will scale up the image.
     *
     * @default 1
     * @since 4.10.06
     */
    scale?: number;
    /**
     * Minimum width in pixels of the exported image. If source chart is smaller
     * thank this, it will be scaled up.
     *
     * @since 4.10.06
     */
    minWidth?: number;
    /**
     * Minimum height in pixels of the exported image. If source chart is smaller
     * thank this, it will be scaled up.
     *
     * @since 4.10.06
     */
    minHeight?: number;
    /**
     * Maximum width in pixels of the exported image. If source chart is bigger
     * thank this, it will be scaled down.
     *
     * NOTE: this setting might be overidden by `minWidth`.
     *
     * @since 4.10.06
     */
    maxWidth?: number;
    /**
     * Maximum height in pixels of the exported image. If source chart is bigger
     * thank this, it will be scaled down.
     *
     * NOTE: this setting might be overidden by `minHeight`.
     *
     * @since 4.10.06
     */
    maxHeight?: number;
}
/**
 * Available PDF page sizes.
 */
export declare type pageSizes = "4A0" | "2A0" | "A0" | "A1" | "A2" | "A3" | "A4" | "A5" | "A6" | "A7" | "A8" | "A9" | "A10" | "B0" | "B1" | "B2" | "B3" | "B4" | "B5" | "B6" | "B7" | "B8" | "B9" | "B10" | "C0" | "C1" | "C2" | "C3" | "C4" | "C5" | "C6" | "C7" | "C8" | "C9" | "C10" | "RA0" | "RA1" | "RA2" | "RA3" | "RA4" | "SRA0" | "SRA1" | "SRA2" | "SRA3" | "SRA4" | "EXECUTIVE" | "FOLIO" | "LEGAL" | "LETTER" | "TABLOID";
/**
 * Represents options for PDF export.
 */
export interface IExportPDFOptions extends IExportImageOptions {
    /**
     * Font size to use for all texts.
     */
    fontSize?: number;
    /**
     * An image format to use for embedded images in PDF.
     *
     * See `imageFormats` in [[Export_module]].
     */
    imageFormat?: imageFormats;
    /**
     * Whether to add a URL of the web page the chart has been exported from.
     *
     * @default true
     */
    addURL?: boolean;
    /**
     * Page size of the exported PDF.
     */
    pageSize?: pageSizes;
    /**
     * Page orientation.
     */
    pageOrientation?: "landscape" | "portrait";
    /**
     * Alignment of the chart image in PDF.
     *
     * Supported options: `"left"` (default), `"center"`, `"right"`.
     *
     * @since 4.9.14
     * @default left
     */
    align?: Align;
    /**
     * Page margins.
     *
     * Can be one of the following:
     *
     * A single number, in which case it will act as margin setting
     * for all four edges of the page.
     *
     * An array of two numbers `[ horizontal, vertical ]`.
     *
     * An array of four numbers `[ left, top, right, bottom ]`.
     */
    pageMargins?: number | number[];
    /**
     * Should data table be included together with the image?
     *
     * Use "pdfdata" options to configure table output.
     *
     * @default false
     * @since 4.7.0
     */
    addData?: boolean;
    /**
     * Add column names in first row?
     *
     * Export will try to use user-friendly column names where possible, either
     * from Export's `dataFields` or deduced from chart's series' names that are
     * bound to specific data fields.
     *
     * @default true
     * @since 4.7.0
     */
    addColumnNames?: boolean;
    /**
     * Use timestamps instead of formatted date/time values.
     *
     * @default false
     * @since 4.7.0
     */
    useTimestamps?: boolean;
    /**
     * Will try to format numbers and date/time according to user's locale
     * settings.
     *
     * @default true
     * @since 4.7.0
     */
    useLocale?: boolean;
    /**
     * Replace missing values with this.
     *
     * @default "" (empty string)
     * @since 4.7.0
     */
    emptyAs?: any;
    /**
     * If set to `true` will export data as pivoted (column names in first column;
     * values in rows).
     *
     * @default false
     * @since 4.7.0
     */
    pivot?: boolean;
    /**
     * Set this option to `disabled` for a format to not show up in [[ExportMenu]].
     *
     * @since 4.9.11
     */
    disabled?: boolean;
    /**
     * Font which should be used for the export.
     *
     * Default font used for PDF includes only Latin-based and Cyrilic
     * characters. If you are exporting text in other languages, you might need
     * to use some other export font.
     *
     * @since 4.9.19
     * @see {@link https://www.amcharts.com/docs/v4/tutorials/using-pdf-export-fonts/}
     */
    font?: IFont;
    /**
     * Additional optional fonts which can be used on individual elements.
     *
     * @since 4.9.19
     * @see {@link https://www.amcharts.com/docs/v4/tutorials/using-pdf-export-fonts/}
     */
    extraFonts?: Array<IFont>;
    /**
     * Rescale image.
     *
     * Number less than 1 will shrink the image.
     *
     * Number bigger than 1 will scale up the image.
     *
     * @default 1
     * @since 4.10.13
     */
    scale?: number;
    /**
     * Minimum width in pixels of the exported image. If source chart is smaller
     * thank this, it will be scaled up.
     *
     * @since 4.10.13
     */
    minWidth?: number;
    /**
     * Minimum height in pixels of the exported image. If source chart is smaller
     * thank this, it will be scaled up.
     *
     * @since 4.10.13
     */
    minHeight?: number;
    /**
     * Maximum width in pixels of the exported image. If source chart is bigger
     * thank this, it will be scaled down.
     *
     * NOTE: this setting might be overidden by `minWidth`.
     *
     * @since 4.10.13
     */
    maxWidth?: number;
    /**
     * Maximum height in pixels of the exported image. If source chart is bigger
     * thank this, it will be scaled down.
     *
     * NOTE: this setting might be overidden by `minHeight`.
     *
     * @since 4.10.13
     */
    maxHeight?: number;
}
/**
 * Represents options for CSV export.
 */
export interface IExportCSVOptions {
    /**
     * Separator string to separate columns with.
     *
     * @default ","
     */
    separator?: string;
    /**
     * CSV format does not require enclosing values in quotes, unless it
     * contains strings.
     *
     * This setting can be used to enforce enclosing of all values in CSV with
     * quotes.
     *
     * @default false
     */
    forceQuotes?: boolean;
    /**
     * Add column names in first row?
     *
     * Export will try to use user-friendly column names where possible, either
     * from Export's `dataFields` or deduced from chart's series' names that are
     * bound to specific data fields.
     *
     * @default true
     */
    addColumnNames?: boolean;
    /**
     * Add rows in reverse order.
     *
     * @default false
     */
    reverse?: boolean;
    /**
     * Use timestamps instead of formatted date/time values.
     *
     * @default false
     */
    useTimestamps?: boolean;
    /**
     * Will try to format numbers and date/time according to user's locale
     * settings.
     *
     * @default true
     */
    useLocale?: boolean;
    /**
     * Replace missing values with this.
     *
     * @default "" (empty string)
     */
    emptyAs?: any;
    /**
     * If set to `true` will export data as pivoted (column names in first column;
     * values in rows).
     *
     * @default false
     * @since 4.6.8
     */
    pivot?: boolean;
    /**
     * Set this option to `disabled` for a format to not show up in [[ExportMenu]].
     *
     * @since 4.9.11
     */
    disabled?: boolean;
    /**
     * Add BOM character to output file, so that it can be used with UTF-8
     * characters properly in Excel.
     *
     * @default false
     * @since 4.10.21
     */
    addBOM?: boolean;
}
/**
 * Represents options for JSON export
 */
export interface IExportJSONOptions {
    /**
     * Use timestamps instead of formatted date/time values.
     *
     * @default false
     */
    useTimestamps?: boolean;
    /**
     * Will try to format numbers and date/time according to user's locale
     * settings.
     *
     * @default true
     */
    useLocale?: boolean;
    /**
     * Sets indent size for each hierarchical elements.
     *
     * @default "  "
     */
    indent?: number;
    /**
     * Set this option to `disabled` for a format to not show up in [[ExportMenu]].
     *
     * @since 4.9.11
     */
    disabled?: boolean;
}
/**
 * Represents options for XLSX export.
 */
export interface IExportExcelOptions {
    /**
     * Add column names in first row?
     *
     * Export will try to use user-friendly column names where possible, either
     * from Export's `dataFields` or deduced from chart's series' names that are
     * bound to specific data fields.
     *
     * @default true
     */
    addColumnNames?: boolean;
    /**
     * Use timestamps instead of formatted date/time values.
     *
     * @default false
     */
    useTimestamps?: boolean;
    /**
     * Will try to format numbers and date/time according to user's locale
     * settings.
     *
     * @default true
     */
    useLocale?: boolean;
    /**
     * Replace missing values with this.
     *
     * @default "" (empty string)
     */
    emptyAs?: any;
    /**
     * If set to `true` will export data as pivoted (column names in first column;
     * values in rows).
     *
     * @default false
     * @since 4.6.8
     */
    pivot?: boolean;
    /**
     * Set this option to `disabled` for a format to not show up in [[ExportMenu]].
     *
     * @since 4.9.11
     */
    disabled?: boolean;
}
/**
 * Represents options for HTML export.
 * @since 4.7.0
 */
export interface IExportHTMLOptions {
    /**
     * Add column names in first row?
     *
     * Export will try to use user-friendly column names where possible, either
     * from Export's `dataFields` or deduced from chart's series' names that are
     * bound to specific data fields.
     *
     * @default true
     */
    addColumnNames?: boolean;
    /**
     * Use timestamps instead of formatted date/time values.
     *
     * @default false
     */
    useTimestamps?: boolean;
    /**
     * Will try to format numbers and date/time according to user's locale
     * settings.
     *
     * @default true
     */
    useLocale?: boolean;
    /**
     * Replace missing values with this.
     *
     * @default "" (empty string)
     */
    emptyAs?: any;
    /**
     * If set to `true` will export data as pivoted (column names in first column;
     * values in rows).
     *
     * @default false
     */
    pivot?: boolean;
    /**
     * A class name to add to table.
     */
    tableClass?: string;
    /**
     * A class name to add to table headers.
     */
    rowClass?: string;
    /**
     * A class name to add to table headers.
     */
    headerClass?: string;
    /**
     * A class name to add to table cells.
     */
    cellClass?: string;
    /**
     * Set this option to `disabled` for a format to not show up in [[ExportMenu]].
     *
     * @since 4.9.11
     */
    disabled?: boolean;
}
/**
 * Represents options for print.
 */
export interface IExportPrintOptions extends IExportImageOptions {
    /**
     * A delay in milliseconds to wait before initiating print.
     *
     * This delay is necessary to ensure DOM is prepared and repainted before
     * print dialog kicks in.
     *
     * @default 500
     */
    delay?: number;
    /**
     * Method to use for printing.
     *
     * If one fails for your particular setup, try the other.
     *
     * "css" - inserts dynamic CSS that hides everything, except the image being printed.
     * "iframe" - creates a dynamic `<iframe>` with the image, then prints it.
     *
     * @default "iframe"
     */
    printMethod?: "css" | "iframe";
    /**
     * Set this option to `disabled` for a format to not show up in [[ExportMenu]].
     *
     * @since 4.9.11
     */
    disabled?: boolean;
}
/**
 * Represents options for custom menu items.
 */
export interface IExportCustomOptions {
    /**
     * A callback function reference that will be called when this custom item
     * is clicked.
     */
    callback?: (branch?: any) => any;
    /**
     * A target which will be `this` context for callback calls.
     */
    callbackTarget?: any;
    /**
     * Set this option to `disabled` for a format to not show up in [[ExportMenu]].
     *
     * @since 4.9.11
     */
    disabled?: boolean;
}
/**
 * Represents interface for a temporarily removed image.
 */
export interface IExportRemovedObject {
    /**
     * Element that was removed out of DOM.
     */
    element: Node;
    /**
     * A placeholder element that was placed instead of removed element so that
     * we know where to put removed element back in.
     */
    placeholder: Node;
}
/**
 * Represents all available options for all export operations.
 */
export interface IExportOptions {
    png: IExportImageOptions;
    gif: IExportImageOptions;
    jpg: IExportImageOptions;
    svg: IExportSVGOptions;
    pdf: IExportPDFOptions;
    xlsx: IExportExcelOptions;
    csv: IExportCSVOptions;
    json: IExportJSONOptions;
    pdfdata: IExportPDFOptions;
    html: IExportHTMLOptions;
    print: IExportPrintOptions;
    custom: IExportCustomOptions;
}
/**
 * All export options as a type.
 *
 * @ignore Exclude from docs
 */
export declare type ExportOptions = IExportImageOptions | IExportSVGOptions | IExportPDFOptions | IExportExcelOptions | IExportCSVOptions | IExportJSONOptions | IExportHTMLOptions | IExportPrintOptions;
/**
 * Defines events for export operations.
 */
export interface IExportEvents {
    /**
     * Invoked when Export initializes.
     */
    inited: {};
    /**
     * Invoked when Export menu is created.
     */
    menucreated: {};
    /**
     * Invoked when the Export starts export procedure.
     *
     * You can use event handlers here to modify config before actual export
     * starts.
     */
    exportstarted: ExportOperation;
    /**
     * Invoked when export operation finishes.
     */
    exportfinished: ExportOperation;
    /**
     * Invoked when export operation encounters error.
     */
    error: ExportOperation;
    /**
     * Invoked when export operation times out.
     *
     * Use Export's `timeoutDelay` setting to set timeout. (default: 2000ms)
     */
    exporttimedout: ExportOperation;
}
/**
 * @ignore Exclude from docs
 */
export declare type Keys = keyof IExportOptions;
/**
 * Represents a list of available adapters for [[Export]].
 */
export interface IExportAdapters {
    supported: {
        supported: boolean;
        type: Keys;
        options?: IExportOptions[Keys];
    };
    exportFunction: {
        func: <Key extends keyof IExportOptions>(type: Key, options?: IExportOptions[Key]) => Promise<any>;
        type: Keys;
        options?: IExportOptions[Keys];
    };
    options: {
        options: IExportOptions[Keys];
        type?: Keys;
    };
    title: {
        title: $type.Optional<string>;
        options?: IExportOptions[Keys];
    };
    charset: {
        charset: string;
        type?: Keys;
        options?: IExportOptions[Keys];
    };
    svgToDataURI: {
        data: string;
        options?: IExportOptions[Keys];
    };
    getSVG: {
        data: string;
        options?: IExportOptions[Keys];
    };
    normalizeSVG: {
        data: string;
        options?: IExportOptions[Keys];
    };
    getCSV: {
        data: string;
        options?: IExportOptions[Keys];
    };
    getJSON: {
        data: string;
        options?: IExportOptions[Keys];
    };
    getExcel: {
        data: string;
        options?: IExportOptions[Keys];
    };
    getHTML: {
        data: string;
        options?: IExportOptions[Keys];
    };
    pdfmakeDocument: {
        doc: any;
        options?: IExportOptions[Keys];
    };
    pdfmakeTable: {
        table: any;
        options?: IExportOptions[Keys];
    };
    container: {
        container: HTMLElement;
    };
    sprite: {
        sprite: Sprite;
    };
    extraSprites: {
        extraSprites: Array<Sprite | IExportCanvas>;
    };
    validateSprites: {
        validateSprites: Array<Sprite>;
    };
    data: {
        data: Array<any>;
    };
    dataFields: {
        dataFields: any;
    };
    formatDataFields: {
        dataFields: any;
        format: string;
    };
    dataFieldsOrder: {
        dataFieldsOrder: string[];
        format: string;
    };
    dateFormatter: {
        dateFormatter: DateFormatter;
    };
    dateFormat: {
        dateFormat: $type.Optional<string | Intl.DateTimeFormatOptions>;
    };
    dateFields: {
        dateFields: any;
    };
    numberFormatter: {
        numberFormatter: NumberFormatter;
    };
    numberFormat: {
        numberFormat: $type.Optional<string>;
    };
    numberFields: {
        numberFields: any;
    };
    durationFormatter: {
        durationFormatter: DurationFormatter;
    };
    durationFormat: {
        durationFormat: $type.Optional<string>;
    };
    durationFields: {
        durationFields: any;
    };
    dataFieldName: {
        name: string;
        field: string;
    };
    isDateField: {
        isDateField: boolean;
        field: string;
    };
    isNumberField: {
        isNumberField: boolean;
        field: string;
    };
    isDurationField: {
        isDurationField: boolean;
        field: string;
    };
    contentType: {
        contentType: string;
        type: Keys;
    };
    filePrefix: {
        filePrefix: string;
    };
    backgroundColor: {
        backgroundColor: $type.Optional<Color>;
    };
    timeoutMessage: {
        message: string;
    };
    xlsxWorkbookOptions: {
        options: any;
        xlsx: any;
    };
    xlsxSheetName: {
        name: string;
        xlsx: any;
    };
    /**
     * @since 4.9.28
     */
    xlsxWorkbook: {
        workbook: any;
        xlsx: any;
        options?: IExportOptions[Keys];
    };
}
/**
 * ============================================================================
 * MAIN CLASS
 * ============================================================================
 * @hidden
 */
/**
 * [[Export]] allows downloading of current snapshot of the chart as an
 * image, PDF, or its data in various formats.
 *
 * The export functionality is enabled by default in charts and is accessible
 * via API or optional export menu.
 *
 * To enable menu, simply access export's `menu` property. E.g.:
 *
 * ```TypeScript
 * chart.exporting.menu = new am4core.ExportMenu();
 * ```
 * ```JavaScript
 * chart.exporting.menu = new am4core.ExportMenu();
 * ```
 * ```JSON
 * {
 *   // ...
 *   "exporting": {
 *     "menu": {}
 *   }
 * }
 * ```
 *
 * To export via API, use `export()` method:
 *
 * ```TypeScript
 * chart.exporting.export(type, [options]);
 * ```
 * ```JavaScript
 * chart.exporting.export(type, [options]);
 * ```
 *
 * E.g.:
 *
 * ```TypeScript
 * chart.exporting.export("png");
 * ```
 * ```JavaScript
 * chart.exporting.export("png");
 * ```
 *
 * @todo Better loading indicator?
 * @todo Implement multiplier option
 * @todo Handling of hanged exports
 * @important
 */
export declare class Export extends Validatable {
    /**
     * XLINK namespace definition.
     *
     * @ignore Exclude from docs
     */
    static XLINK: string;
    /**
     * Defines available events.
     */
    _events: IExportEvents;
    /**
     * Defines available adapters.
     */
    _adapter: IExportAdapters;
    /**
     * Adapter.
     */
    adapter: Adapter<Export, IExportAdapters>;
    /**
     * Holds options for each format.
     *
     * @ignore Exclude from docs
     */
    private _formatOptions;
    /**
     * An instance of [[Language]].
     *
     * @ignore Exclude from docs
     */
    protected _language: $type.Optional<Language>;
    /**
     * An instance of [[ExportMenu]].
     *
     * @ignore Exclude from docs
     */
    protected _menu: $type.Optional<ExportMenu>;
    /**
     * Reference to main container to place menu in.
     */
    protected _container: HTMLElement;
    /**
     * [[Sprite]] instance to be used when converting to image.
     */
    protected _sprite: $type.Optional<Sprite>;
    /**
     * Extra [[Sprite]] elements to include in exports.
     */
    protected _extraSprites: Array<Sprite | IExportCanvas>;
    /**
     * A list of [[Sprite]] elements that need to be valid before export
     * commences.
     */
    protected _validateSprites: Array<Sprite>;
    /**
     * Data storage to be used when exporting to data formats.
     */
    protected _data: any;
    /**
     * Holds an object of field key / field name used to name columns when
     * exporting to data formats.
     */
    protected _dataFields: any;
    /**
     * Holds an array of data field names. If set, exported data fields will try
     * to maintain this order.
     *
     * If not set (default), the export will try to maintain the same order as
     * in source data, or as in `dataFields` (if set).
     *
     * @since 4.9.7
     */
    dataFieldsOrder: string[];
    /**
     * Indicates whether data fields were generated dynamically (`true`) or
     * if they were pre-set by the user (`false`).
     */
    protected _dynamicDataFields: boolean;
    /**
     * A reference to [[DateFormatter]].
     *
     * @ignore Exclude from docs
     */
    protected _dateFormatter: $type.Optional<DateFormatter>;
    /**
     * A Date format to be used when formatting dates in string-based data
     * formats.
     *
     * @ignore Exclude from docs
     */
    protected _dateFormat: $type.Optional<string | Intl.DateTimeFormatOptions>;
    /**
     * A list of column keys that hold date values.
     *
     * @ignore Exclude from docs
     */
    protected _dateFields: $type.Optional<List<string>>;
    /**
     * A reference to [[DurationFormatter]].
     *
     * @ignore Exclude from docs
     */
    protected _durationFormatter: $type.Optional<DurationFormatter>;
    /**
     * A duration format to be used when formatting numeric values.
     *
     * @ignore Exclude from docs
     */
    protected _durationFormat: $type.Optional<string>;
    /**
     * A list of column keys that hold duration values.
     *
     * @ignore Exclude from docs
     */
    protected _durationFields: $type.Optional<List<string>>;
    /**
     * A reference to [[NumberFormatter]].
     *
     * @ignore Exclude from docs
     */
    protected _numberFormatter: $type.Optional<NumberFormatter>;
    /**
     * A number format to be used when formatting numbers in string-based data
     * formats.
     *
     * @ignore Exclude from docs
     */
    protected _numberFormat: $type.Optional<string>;
    /**
     * A list of column keys that hold number values.
     *
     * @ignore Exclude from docs
     */
    protected _numberFields: $type.Optional<List<string>>;
    /**
     * Holds a list of objects that were temporarily removed from the DOM while
     * exporting. Those most probably are tainted images, or foreign objects that
     * would otherwise prevent SVG to be converted to canvas.
     *
     * @ignore Exclude from docs
     */
    protected _removedObjects: List<IExportRemovedObject>;
    /**
     * Holds references to the objects that were temporarily hidden when export
     * started, so that we can reveal them back when export ends.
     */
    protected _hiddenObjects: Sprite[];
    /**
     * Indicates if non-exportable objects are now hidden;
     */
    protected _objectsAlreadyHidden: boolean;
    /**
     * Exported files will be prefixed with whatever it is set here.
     *
     * @ignore Exclude from docs
     */
    protected _filePrefix: string;
    /**
     * Export will try to determine proper background color itself. If you want to
     * override it and use some other color, set this property.
     *
     * @ignore Exclude from docs
     */
    protected _backgroundColor: $type.Optional<Color>;
    /**
     * A title to use for some document exports, mainly for print.
     * A document.title will be used if not set.
     *
     * @ignore Exclude from docs
     */
    protected _title: $type.Optional<string>;
    /**
     * If you are using web fonts (such as Google Fonts), your chart might be
     * using them as well.
     *
     * Normally, exporting to image will require to download these fonts so the
     * are carried over to exported image.
     *
     * This setting can be used to disable or enable this functionality.
     *
     * @default true
     */
    useWebFonts: boolean;
    /**
     * A regular expression that will be matched against each URL of an external
     * font being loaded. Font will only be loaded of regular expression matches.
     *
     * Has no effect of `useWebFonts` is set to `false`.
     *
     * ```TypeScript
     * chart.exporting.webFontFilter = /pacifico|roboto/;
     * ```
     * ```JavaScript
     * chart.exporting.webFontFilter = /pacifico|roboto/;
     * ```
     * ```JSON
     * {
     *   // ...
     *   "exporting": {
     *     // ...
     *     "webFontFilter": /pacifico|roboto/
     *   }
     * }
     * ```
     *
     * @since 4.10.17
     */
    webFontFilter: RegExp;
    /**
     * Many modern displays have use more actual pixels per displayed pixel. This
     * results in sharper images on screen. Unfortunately, when exported to a
     * bitmap image of the sam width/height size it will lose those extra pixels,
     * resulting in somewhat blurry image.
     *
     * This is why we are going to export images larger than they are, so that we
     * don't lose any details.
     *
     * If you'd rather export images without change in size, set this to `false`.
     *
     * @default true
     */
    useRetina: boolean;
    /**
     * By default Export will try to use built-in method for transforming chart
     * into an image for download, then fallback to external library (canvg) for
     * conversion if failed.
     *
     * Setting this to `false` will force use of external library for all export
     * operations.
     *
     * It might be useful to turn off simplified export if you are using strict
     * content security policies, that disallow images with blobs as their
     * source.
     *
     * @default true
     * @since 4.2.5
     */
    useSimplifiedExport: boolean;
    /**
     * If export operation takes longer than milliseconds in this second, we will
     * show a modal saying export operation took longer than expected.
     */
    timeoutDelay: number;
    /**
     * A reference to export timeout.
     *
     * @ignore Exclude from docs
     */
    protected _timeoutTimeout: $type.Optional<IDisposer>;
    /**
     * Holds reference to [[Modal]] instance.
     *
     * @ignore Exclude from docs
     */
    protected _modal: $type.Optional<Modal>;
    /**
     * Used to log original value of `interactionsEnabled` so that it can be restored
     * after temporarily disabling it.
     */
    private _spriteInteractionsEnabled;
    private _exportRunning;
    /**
     * Indicator used by [[Component]].
     *
     * @ignore
     */
    private _prevHasData;
    /**
     * Constructor
     */
    constructor(container: HTMLElement);
    /**
     * An instance of [[ExportMenu]].
     *
     * To add an export menu to a chart, set this to a new instance of
     * [[ExportMenu]].
     *
     * ```TypeScript
     * chart.exporting.menu = new am4core.ExportMenu();
     * ```
     * ```JavaScript
     * chart.exporting.menu = new am4core.ExportMenu();
     * ```
     * ```JSON
     * {
     *   // ...
     *   "exporting": {
     *     "menu": {}
     *   }
     * }
     * ```
     *
     * @param menu  ExportMenu instance
     */
    /**
    * @return ExportMenu instance
    */
    menu: $type.Optional<ExportMenu>;
    /**
     * Checks if this specific menu item type is supported by current system.
     *
     * @param type  Menu item type
     * @return `false` if not supported
     */
    typeSupported<Key extends keyof IExportOptions>(type: Key): boolean;
    /**
     * Checks if data is available.
     *
     * @return Has data?
     */
    private _hasData;
    /**
     * Get function to handle export for particular format.
     *
     * @ignore Exclude from docs
     */
    private _getFunction;
    /**
     * Initiates export procedure.
     *
     * @param type     Export type
     * @param options  Options
     * @return `true` if export was successful
     * @async
     */
    export<Key extends keyof IExportOptions>(type: Key, options?: IExportOptions[Key]): Promise<boolean>;
    /**
     * A function that should handle unsupported export types.
     *
     * @ignore Exclude from docs
     * @param type     Export type
     * @param options  Options
     * @return Promise
     * @async
     */
    unsupported<Key extends keyof IExportOptions>(type: Key, options?: IExportOptions[Key]): Promise<string>;
    /**
     * Handles click on a "custom" menu item.
     *
     * Basically, if it has "callback" enabled, it will be called. Nothing else.
     *
     * @ignore Exclude from docs
     * @param options  Options
     */
    handleCustom(options: IExportCustomOptions): void;
    /**
     * Requests a Print of the chart.
     *
     * @param type     Export type
     * @param options  Options
     * @return Promise
     * @async
     */
    getPrint(type: string, options?: IExportPrintOptions): Promise<string>;
    /**
     * A function that returns data: URI encoded @font-family, so that way it can be embedded into SVG.
     *
     * @ignore Exclude from docs
     * @return String which can be embedded directly into a <style> element.
     * @async
     */
    getFontFamilies(): Promise<{
        blobs: Array<string>;
        cssText: string;
    }>;
    /**
     * Produces image output from the element.
     *
     * Converts to a `Canvas` first, then produces an image to download.
     *
     * This is an asynchronous function. Rather than returning a result, it
     * returns a Promise.
     *
     * You can use `await` notion from other async functions, or `then()`
     * anywhere else.
     *
     * ```TypeScript
     * let img;
     *
     * // Async
     * img = await chart.exporting.getImage( "png" );
     *
     * // Sync
     * chart.exporting.getImage( "png" ).then( ( data ) => {
     *   img = data;
     * } );
     * ```
     * ```JavaScript
     * var img;
     * chart.exporting.getImage( "png" ).then( ( data ) => {
     *   img = data;
     * } );
     * ```
     *
     * @param  type           Image format
     * @param  options        Options
     * @param  includeExtras  Should extra sprites be included if set?
     * @return Promise
     */
    getImage<Key extends imageFormats>(type: Key, options?: IExportImageOptions, includeExtras?: boolean): Promise<string>;
    /**
     * Adds extra elements to the canvas.
     *
     * @param  canvas   Original canvas
     * @param  options  Options
     */
    private addExtras;
    /**
     * Returns canvas representation of the [[Sprite]].
     *
     * @param   options  Options
     * @return           Canvas
     */
    getCanvas(options?: IExportImageOptions): Promise<HTMLCanvasElement>;
    /**
     * Returns canvas representation of the [[Sprite]] using canvg.
     *
     * @param   options  Options
     * @return           Canvas
     */
    getCanvasAdvanced(options?: IExportImageOptions): Promise<HTMLCanvasElement>;
    /**
     * Tries to dynamically load [canvg.js](https://github.com/canvg/canvg) and
     * export an image using its functions.
     *
     * This is an asynchronous function. Check the description of `getImage()`
     * for description and example usage.
     *
     * @param type     Image format
     * @param options  Options
     * @return Data uri
     */
    getImageAdvanced(type: imageFormats, options?: IExportImageOptions, includeExtras?: boolean): Promise<string>;
    /**
     * Creates a `<canvas>` element and returns it.
     *
     * @return Canvas element
     */
    protected getDisposableCanvas(): HTMLCanvasElement;
    /**
     * Removes canvas.
     *
     * @param canvas  Canvas element
     */
    protected disposeCanvas(canvas: HTMLCanvasElement): void;
    /**
     * Returns pixel ratio for retina displays.
     *
     * @return Pixel ratio
     */
    protected getPixelRatio(options?: IExportImageOptions): number;
    /**
     * Calculates adjusted scale if image does not fit or is larger than min/max
     * settings.
     *
     * @param   width    Width of the source image
     * @param   height   Height of the source image
     * @param   scale    Current scale
     * @param   options  Options
     * @return           Adjusted scale
     */
    protected getAdjustedScale(width: number, height: number, scale: number, options?: IExportImageOptions): number;
    /**
     * Converts all `<image>` tags in SVG to use data uris instead of external
     * URLs
     *
     * This is an asynchronous function. Check the description of `getImage()`
     * for description and example usage.
     *
     * @ignore Exclude from docs
     * @param el       SVG node
     * @param options  Options
     * @return Promise
     */
    imagesToDataURI(el: SVGSVGElement, options?: IExportImageOptions): Promise<void>;
    /**
     * `foreignObject` elements cannot be exported. This function hides them
     * temprarily. In the future it might try to convert them to SVG to make them
     * exportable.
     *
     * This is an asynchronous function. Check the description of `getImage()`
     * for description and example usage.
     *
     * @ignore Exclude from docs
     * @param el       SVG node
     * @param options  Options
     * @return Promise
     */
    prepForeignObjects(el: SVGSVGElement, options?: IExportImageOptions): Promise<void>;
    /**
     * Converts an SVG `<image>` to use its data uri for `href` instead of
     * external file.
     *
     * This is an asynchronous function. Check the description of `getImage()`
     * for description and example usage.
     *
     * @ignore Exclude from docs
     * @param el       SVG element
     * @param options  Options
     */
    imageToDataURI(el: SVGImageElement, options?: IExportImageOptions): Promise<string>;
    /**
     * Converts `<image>` with external SVG source to data uri. Loads external SVG
     * file, then converts it to data uri and replaces the `xlink:href` parameter.
     *
     * This is an asynchronous function. Check the description of `getImage()`
     * for description and example usage.
     *
     * @ignore Exclude from docs
     * @param el        An SVG element
     * @param options   Options
     */
    svgToDataURI(el: SVGImageElement, options?: IExportImageOptions): Promise<string>;
    /**
     * Temporarily removes element from DOM, and replaces it with a dummy
     * placeholder, as well as stores it for later restoration.
     *
     * This is an asynchronous function. Check the description of `getImage()`
     * for description and example usage.
     *
     * @ignore Exclude from docs
     * @param el Node
     */
    temporarilyRemoveObject(el: Node, placeholder?: SVGSVGElement): void;
    /**
     * Restores all (possibly tainted or unsupported) objects that were
     * temporarily removed when exporting.
     *
     * @ignore Exclude from docs
     */
    restoreRemovedObjects(): void;
    /**
     * Checkes if simplified export can be used using `createObjectURL` and SVG
     * document does not contain any external images.
     *
     * This is an asynchronous function. Check the description of `getImage()`
     * for description and example usage.
     *
     * @ignore Exclude from docs
     * @return `true` if simplified export can be used
     */
    simplifiedImageExport(): Promise<boolean>;
    /**
     * Returns a new `<image>` element.
     *
     * @ignore Exclude from docs
     * @param url          URL of the image
     * @param width        Width (px)
     * @param height       Height (px)
     * @param crossOrigin  Cross-Origin setting
     * @return Promise
     */
    loadNewImage(url: string, width?: number, height?: number, crossOrigin?: string): Promise<HTMLImageElement>;
    /**
     * Returns current DOM URL.
     *
     * @ignore Exclude from docs
     * @return URL
     */
    getDOMURL(): any;
    /**
     * Returns an SVG representation of the chart.
     *
     * This is an asynchronous function. Check the description of `getImage()`
     * for description and example usage.
     *
     * @param type       Type of the export
     * @param options    Options
     * @param encodeURI  If true, will return result will be data URI
     * @return Promise
     */
    getSVG(type: "svg", options?: IExportSVGOptions, encodeURI?: boolean): Promise<string>;
    /**
     * Checks if SVG is fully formatted. Encloses in `<svg>...</svg>` if
     * necessary.
     *
     * @ignore Exclude from docs
     * @param svg       Input SVG
     * @param options   Options
     * @param width     Width of the SVG viewport
     * @param height    Height of the SVG viewport
     * @param font      Font family to use as a base
     * @param fontSize  Font size to use as a base
     * @return Output SVG
     * @todo Add style params to existing <svg>
     */
    normalizeSVG(svg: string, options?: IExportSVGOptions, width?: number, height?: number, scale?: number, font?: string, fontSize?: string, background?: Color): string;
    /**
     * Serializes an element and returns its contents.
     *
     * @ignore Exclude from docs
     * @param element  An element to serialize
     * @return A serialized XML
     */
    serializeElement(element: HTMLElement | SVGSVGElement | SVGDefsElement): string;
    /**
     * Returns a PDF containing chart image.
     *
     * This is an asynchronous function. Check the description of `getImage()`
     * for description and example usage.
     *
     * @param type     Type of the export
     * @param options  Options
     * @return Promise
     * @async
     * @todo Account for header when calculating vertical fit
     */
    getPDF(type: "pdf" | "pdfdata", options?: IExportPDFOptions): Promise<string>;
    /**
     * Returns chart's data formatted suitable for PDF export (pdfmake).
     *
     * This is an asynchronous function. Check the description of `getImage()`
     * for description and example usage.
     *
     * @since 4.7.0
     * @param type     Type of the export
     * @param options  Options
     * @return Promise
     * @async
     */
    getPDFData(type: "pdf", options?: IExportPDFOptions): Promise<any>;
    /**
     * Formats a row of data for use in PDF data table (pdfmake).
     *
     * @ignore Exclude from docs
     * @since 4.7.0
     * @param  row         An object holding data for the row
     * @param  options     Options
     * @param  dataFields  Data fields
     * @param  asIs        Do not try to convert to dates
     * @return Formated Data line
     */
    getPDFDataRow(row: any, options?: IExportPDFOptions, dataFields?: any, asIs?: boolean): Array<string>;
    /**
     * Returns fit dimensions for available page sizes.
     *
     * @ignore Exclude from docs
     * @param pageSize Page size
     * @return `[width, height]` in pixels
     */
    getPageSizeFit(pageSize: pageSizes, margins?: number | number[], extraMargin?: number): number[];
    /**
     * Returns an Excel file of chart's data.
     *
     * This is an asynchronous function. Check the description of `getImage()`
     * for description and example usage.
     *
     * @param type     Type of the export
     * @param options  Options
     * @return Promise
     * @async
     * @todo Handle dates
     * @todo Support for multi-sheet
     */
    getExcel(type: "xlsx", options?: IExportExcelOptions): Promise<string>;
    /**
     * This is needed to work around Excel limitations.
     *
     * @param name  Source name
     * @return Normalized name
     */
    private normalizeExcelSheetName;
    /**
     * Rertuns an array of values to be used as Excel row.
     *
     * @ignore Exclude from docs
     * @param  row         Row data
     * @param  options     Options
     * @param  dataFields  Data fields
     * @param  asIs        Do not try to convert to dates
     * @return Array of values
     */
    getExcelRow(row: any, options?: IExportExcelOptions, dataFields?: any, asIs?: boolean): any[];
    /**
     * Returns chart's data formatted as CSV.
     *
     * This is an asynchronous function. Check the description of `getImage()`
     * for description and example usage.
     *
     * @param type       Type of the export
     * @param options    Options
     * @param encodeURI  If true, will return result will be data URI
     * @return Promise
     * @async
     */
    getCSV(type: "csv", options?: IExportCSVOptions, encodeURI?: boolean): Promise<string>;
    /**
     * Formats a row of CSV data.
     *
     * @ignore Exclude from docs
     * @param  row         An object holding data for the row
     * @param  options     Options
     * @param  dataFields  Data fields
     * @param  asIs        Do not try to convert to dates
     * @return Formated CSV line
     */
    getCSVRow(row: any, options?: IExportCSVOptions, dataFields?: any, asIs?: boolean): string;
    /**
     * Returns chart's data formatted as HTML table.
     *
     * This is an asynchronous function. Check the description of `getImage()`
     * for description and example usage.
     *
     * @since 4.7.0
     * @param type       Type of the export
     * @param options    Options
     * @param encodeURI  If true, will return result will be data URI
     * @return Promise
     * @async
     */
    getHTML(type: "html", options?: IExportHTMLOptions, encodeURI?: boolean): Promise<string>;
    /**
     * Formats a row of HTML data.
     *
     * @since 4.7.0
     * @ignore Exclude from docs
     * @param  row         An object holding data for the row
     * @param  options     Options
     * @param  dataFields  Data fields
     * @param  asIs        Do not try to convert to dates
     * @return Formated HTML row
     */
    getHTMLRow(row: any, options?: IExportHTMLOptions, dataFields?: any, asIs?: boolean, headerRow?: boolean): string;
    /**
     * Returns chart's data in JSON format.
     *
     * This is an asynchronous function. Check the description of `getImage()`
     * for description and example usage.
     *
     * @param type       Type of the export
     * @param options    Options
     * @param encodeURI  If true, will return result will be data URI
     * @return Promise
     * @async
     */
    getJSON(type: "json", options?: IExportJSONOptions, encodeURI?: boolean): Promise<string>;
    /**
     * Converts the value to proper date format.
     *
     * @ignore Exclude from docs
     * @param  field         Field name
     * @param  value         Value
     * @param  options       Options
     * @param  keepOriginal  Will ignore formatting and will keep value as it is in data
     * @return Formatted date value or unmodified value
     */
    convertToSpecialFormat<Key extends "json" | "csv" | "xlsx" | "html" | "pdf">(field: string, value: any, options?: IExportOptions[Key], keepOriginal?: boolean): any;
    /**
     * Converts empty value based on `emptyAs` option.
     *
     * @ignore Exclude from docs
     */
    convertEmptyValue<Key extends "csv" | "xlsx">(field: string, value: any, options?: IExportOptions[Key]): any;
    /**
     * Triggers download of the file.
     *
     * This is an asynchronous function. Check the description of `getImage()`
     * for description and example usage.
     *
     * @param uri       Data URI with file content
     * @param fileName  File name
     * @return Promise
     * @async
     */
    download(uri: string, fileName: string, addBOM?: boolean): Promise<boolean>;
    /**
     * Returns `true` if browser has any supported methods to trigger download
     * of a binary file.
     *
     * @return Supports downloads?
     */
    downloadSupport(): boolean;
    /**
     * Checks if the browser supports "download" attribute on links.
     *
     * @ignore Exclude from docs
     * @return Browser supports triggering downloads?
     */
    linkDownloadSupport(): boolean;
    /**
     * Checks if the browser supports download via `msBlob`.
     *
     * @ignore Exclude from docs
     * @return Browser supports triggering downloads?
     */
    blobDownloadSupport(): boolean;
    /**
     * Checks if the browser supports download via `msBlob`.
     *
     * @ignore Exclude from docs
     * @return Browser supports triggering downloads?
     */
    msBlobDownloadSupport(): boolean;
    /**
     * Checks if this is a legacy version of IE.
     *
     * @ignore Exclude from docs
     * @return IE9 or less?
     */
    legacyIE(): boolean;
    /**
     * Initiates print of the chart.
     *
     * This is an asynchronous function. Check the description of `getImage()`
     * for description and example usage.
     *
     * @param data     Data URI for the image
     * @param options  Options
     * @param title    Optional title to use (uses window's title by default)
     * @return Promise
     * @async
     */
    print(data: string, options?: IExportPrintOptions, title?: string): Promise<boolean>;
    protected printViaCSS(data: string, options?: IExportPrintOptions, title?: string): Promise<boolean>;
    protected printViaIframe(data: string, options?: IExportPrintOptions, title?: string): Promise<boolean>;
    /**
     * Finds a background color for the element. If element is transparent it goes
     * up the DOM hierarchy to find a parent element that does.
     *
     * @ignore Exclude from docs
     * @param element Element
     * @return Color code
     */
    findBackgroundColor(element: Element): Color;
    /**
     * A reference to a container to be used to place [[ExportMenu]] in.
     *
     * @param value Reference
     */
    /**
    * @return Reference
    */
    container: HTMLElement;
    /**
     * A reference to [[Sprite]] to export. Can be any Sprite, including some
     * internal elements.
     *
     * @param value Sprite
     */
    /**
    * @return Sprite
    */
    sprite: Sprite;
    /**
     * An array of extra [[Sprite]] elements to include in export.
     *
     * It can be used to export any external elements, or even other charts.
     *
     * E.g.:
     *
     * ```TypeScript
     * chart.exporting.extraSprites.push(chart2);
     * ```
     * ```JavaScript
     * chart.exporting.extraSprites.push(chart2);
     * ```
     *
     * IMPORTANT: This setting is ignored when exporting to SVG format.
     *
     * @since 4.2.0
     * @param value Sprite
     */
    /**
    * @return Sprite
    */
    extraSprites: Array<Sprite | IExportCanvas>;
    /**
     * An array of [[Sprite]] elements that need to be valid before export
     * commences.
     *
     * If any of those elements is not completely ready when export is triggered,
     * the export will wait until they are (their `validated` event triggers)
     * before going through with the export opertaion.
     *
     * This is useful if you need to modify chart appearance for the export.
     *
     * E.g.:
     *
     * ```TypeScript
     * // Add watermark
     * let watermark = chart.createChild(am4core.Label);
     * watermark.text = "Copyright (C) 2019";
     * watermark.disabled = true;
     *
     * // Add watermark to validated sprites
     * chart.exporting.validateSprites.push(watermark);
     *
     * // Enable watermark on export
     * chart.exporting.events.on("exportstarted", function(ev) {
     *   watermark.disabled = false;
     * });
     *
     * // Disable watermark when export finishes
     * chart.exporting.events.on("exportfinished", function(ev) {
     *   watermark.disabled = true;
     * });
     * ```
     * ```JavaScript
     * // Add watermark
     * var watermark = chart.createChild(am4core.Label);
     * watermark.text = "Copyright (C) 2019";
     * watermark.disabled = true;
     *
     * // Add watermark to validated sprites
     * chart.exporting.validateSprites.push(watermark);
     *
     * // Enable watermark on export
     * chart.exporting.events.on("exportstarted", function(ev) {
     *   watermark.disabled = false;
     * });
     *
     * // Disable watermark when export finishes
     * chart.exporting.events.on("exportfinished", function(ev) {
     *   watermark.disabled = true;
     * });
     * ```
     *
     * @since 4.6.8
     * @param value Sprite
     */
    /**
    * @return Sprite
    */
    validateSprites: Array<Sprite>;
    /**
     * Data to export.
     *
     * @param value Data
     */
    /**
    * @return Data
    */
    data: any;
    /**
     * Data fields in `{ field: fieldName }` format. Those are used for
     * exporting in data formats to name the columns.
     *
     * @see {@link https://www.amcharts.com/docs/v4/concepts/exporting/#Changing_order_and_names_of_columns} for examples and details
     * @param value Field names
     */
    /**
    * @return Field names `{ field: fieldName }`
    */
    dataFields: any;
    /**
     * Called after target chart's data updates.
     *
     * @ignore
     */
    handleDataUpdated(): void;
    /**
     * A [[DateFormatter]] to use when formatting dates when exporting data.
     *
     * @param value DateFormatter instance
     */
    /**
    * @return A DateFormatter instance
    */
    dateFormatter: DateFormatter;
    /**
     * A date format to use for exporting dates. Will use [[DateFormatter]]
     * format if not set.
     *
     * @param value Date format
     */
    /**
    * @return Date format
    */
    dateFormat: $type.Optional<string | Intl.DateTimeFormatOptions>;
    /**
     * A list of fields that hold date values.
     *
     * @param value Date field list
     */
    /**
    * @return Date field list
    */
    dateFields: List<string>;
    /**
     * A [[NumberFormatter]] to use when formatting dates when exporting data.
     *
     * @since 4.5.15
     * @param value NumberFormatter instance
     */
    /**
    * @return A NumberFormatter instance
    */
    numberFormatter: NumberFormatter;
    /**
     * A number format to use for exporting dates. Will use [[NumberFormatter]]
     * format if not set.
     *
     * @since 4.5.15
     * @param value Number format
     */
    /**
    * @return Number format
    */
    numberFormat: $type.Optional<string>;
    /**
     * A list of fields that hold number values.
     *
     * @since 4.5.15
     * @param value Number field list
     */
    /**
    * @return Number field list
    */
    numberFields: List<string>;
    /**
     * A [[DurationFormatter]] to use when formatting duration values when
     * exporting data.
     *
     * @param value  DurationFormatter instance
     */
    /**
    * @return A DurationFormatter instance
    */
    durationFormatter: DurationFormatter;
    /**
     * A format to use when formatting values from `durationFields`.
     * Will use [[DurationFormatter]] format if not set.
     *
     * @param value Duration format
     */
    /**
    * @return Duration format
    */
    durationFormat: $type.Optional<string>;
    /**
     * A list of fields that hold duration values.
     *
     * @param value Duration field list
     */
    /**
    * @return Duration field list
    */
    durationFields: List<string>;
    /**
     * Generates data fields out of the first row of data.
     *
     * @ignore Exclude from docs
     */
    generateDataFields(): void;
    /**
     * Cheks against `dateFields` property to determine if this field holds
     * dates.
     *
     * @ignore Exclude from docs
     * @param field   Field name
     * @param options Options
     * @return `true` if it's a date field
     */
    isDateField(field: string): boolean;
    /**
     * Cheks against `numberFields` property to determine if this field holds
     * numbers.
     *
     * @ignore Exclude from docs
     * @param field   Field name
     * @param options Options
     * @return `true` if it's a number field
     */
    isNumberField(field: string): boolean;
    /**
     * Cheks against `durationFields` property to determine if this field holds
     * durations.
     *
     * @ignore Exclude from docs
     * @param field   Field name
     * @param options Options
     * @return `true` if it's a date field
     */
    isDurationField(field: string): boolean;
    /**
     * Returns proper content type for the export type.
     *
     * @param type  Export format/type
     * @return Proper content type, i.e. "image/jpeg"
     */
    getContentType<Key extends keyof IExportOptions>(type: Key): string;
    /**
     * A file prefix to be used for all exported formats.
     *
     * Export will apply format-related extension to it. E.g. if this is set to
     * "myExport", the file name of the PNG exported image will be "myExport.png".
     *
     * @param value File prefix
     */
    /**
    * @return File prefix
    */
    filePrefix: string;
    /**
     * A background color to be used for exported images. If set, this will
     * override the automatically acquired background color.
     *
     * @param value Color
     */
    /**
    * @return Background color
    */
    backgroundColor: $type.Optional<Color>;
    /**
     * A title to be used when printing.
     *
     * @param value Title
     */
    /**
    * @return Title
    */
    title: $type.Optional<string>;
    /**
     * Displays a preloader/exporting indicator.
     *
     * @ignore Exclude from docs
     * @todo Add ability to change text
     */
    showPreloader(): void;
    /**
     * Hides preloader/exporting indicator
     *
     * @ignore Exclude from docs
     */
    hidePreloader(): void;
    /**
     * Returns a an instance of [[Preloader]] associated with the Sprite being
     * exported.
     *
     * @return Preloader
     */
    readonly preloader: Preloader;
    /**
     * Displays a modal saying export is taking longer than expected.
     *
     * @ignore Exclude from docs
     */
    showTimeout(): void;
    /**
     * Hides preloader/exporting indicator.
     *
     * @ignore Exclude from docs
     */
    hideTimeout(): void;
    /**
     * A [[Language]] instance to be used for translations.
     *
     * @param value An instance of [[Language]]
     */
    /**
    * @return A [[Language]] instance to be used
    */
    language: Language;
    /**
     * Returns (and creates) [[Modal]].
     *
     * @ignore Exclude from docs
     * @return Modal instance
     */
    readonly modal: Modal;
    /**
     * Shows [[Modal]] with specific text.
     *
     * @ignore Exclude from docs
     * @param text Modal contents
     */
    showModal(text: string, title?: string): void;
    /**
     * Hides modal window if one's currently open.
     *
     * @ignore Exclude from docs
     */
    hideModal(): void;
    /**
     * Loads canvg dynamic module.
     *
     * This is an asynchronous function. Check the description of `getImage()`
     * for description and example usage.
     *
     * @ignore Exclude from docs
     * @return Instance of canvg
     * @async
     */
    private _canvg;
    /**
     * Returns canvg instance.
     *
     * @ignore Exclude from docs
     * @return Instance of canvg
     */
    readonly canvg: Promise<typeof import("../../canvg/index.js")["default"]>;
    /**
     * Returns pdfmake instance.
     *
     * @ignore Exclude from docs
     * @return Instance of pdfmake
     */
    readonly pdfmake: Promise<any>;
    /**
     * Loads xlsx dynamic module.
     *
     * This is an asynchronous function. Check the description of `getImage()`
     * for description and example usage.
     *
     * @ignore Exclude from docs
     * @return Instance of pdfmake
     * @async
     */
    private _xlsx;
    /**
     * Returns xlsx instance.
     *
     * @ignore Exclude from docs
     * @return Instance of pdfmake
     */
    readonly xlsx: Promise<any>;
    /**
     * Sets options for a format.
     */
    setFormatOptions<Key extends keyof IExportOptions>(type: Key, options: IExportOptions[Key]): void;
    /**
     * Returns current options for a format.
     */
    getFormatOptions<Key extends keyof IExportOptions>(type: Key): IExportOptions[Key];
    /**
     * A [[Dictionary]] object containing format-specific options.
     *
     * May be used to change specific option for the format:
     *
     * ```TypeScript
     * chart.exporting.formatOptions.getKey("csv").disabled = true;
     * ```
     * ```JavaScript
     * chart.exporting.formatOptions.getKey("csv").disabled = true;
     * ```
     * ```JSON
     * {
     *   // ...
     *   "exporting": {
     *     // ...
     *     "formatOptions": {
     *       "csv": {
     *         "disabled": true
     *       }
     *     }
     *   }
     * }
     * ```
     *
     * @since 4.9.12
     * @return  Options
     */
    readonly formatOptions: Dictionary<string, ExportOptions>;
    /**
     * Disables interactivity on parent chart.
     */
    protected _disablePointers(): void;
    /**
     * Releases temporarily disabled pointers on parent chart.
     */
    protected _releasePointers(): void;
    /**
     * Hides all elements that should not be included in the exported image.
     */
    private hideNonExportableSprites;
    /**
     * Respores elements that were hidden before export.
     */
    private restoreNonExportableSprites;
    /**
     * Checks if there are elements that absolutely need to be validated before
     * export.
     *
     * If there are invalid elements, it will await for them to be validated.
     *
     * @return Promise
     */
    private awaitValidSprites;
    /**
     * Processes JSON-based config before it is applied to the object.
     *
     * @ignore Exclude from docs
     * @param config  Config
     */
    processConfig(config?: {
        [index: string]: any;
    }): void;
}
