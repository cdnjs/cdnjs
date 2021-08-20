import { DataParser } from "./DataParser";
import { BaseObjectEvents, IBaseObjectEvents } from "../Base";
import { Component } from "../Component";
import { Adapter } from "../utils/Adapter";
import { Language } from "../utils/Language";
import { DateFormatter } from "../formatters/DateFormatter";
import { INetRequestOptions } from "../utils/Net";
/**
 * ============================================================================
 * REQUISITES
 * ============================================================================
 * @hidden
 */
/**
 * Defines events for [[DataSource]].
 */
export interface IDataSourceEvents extends IBaseObjectEvents {
    /**
     * Invoked when loading of the data starts.
     */
    started: {};
    /**
     * Invoked when loading of the data starts.
     */
    loadstarted: {};
    /**
     * Invoked when the loading of the data finishes.
     */
    loadended: {};
    /**
     * Invoked when parsing of the loaded data starts.
     */
    parsestarted: {};
    /**
     * Invoked when parsing of the loaded data finishes.
     */
    parseended: {};
    /**
     * Invoked when loading and parsing finishes.
     */
    ended: {};
    /**
     * Invoked when data source was successfully loaded and parsed.
     */
    done: {
        data: any;
    };
    /**
     * Invoked when data source encounters a loading error.
     */
    error: {
        code: number;
        message: string;
    };
    /**
     * Invoked when data source encounters a parsing error.
     */
    parseerror: {
        message: string;
    };
}
/**
 * Defines adapters for [[DataSource]].
 */
export interface IDataSourceAdapters {
    /**
     * Applied to a data source URL before it is loaded.
     */
    url: string;
    /**
     * Applied to a parser type, before parsing starts.
     *
     * Can be used to supply different parser than the one set/determined by
     * Data Loader.
     */
    parser: DataParser;
    /**
     * Applied to the timeout setting.
     */
    reloadTimeout: number;
    /**
     * Applied to the loaded data **before** it is passed to parser.
     */
    unparsedData: string;
    /**
     * Applied to the loaded data **after** it was parsed by a parser.
     */
    parsedData: any;
    /**
     * Applied to `incremental` setting.
     */
    incremental: boolean;
    /**
     * Applied to `incrementalParams` setting.
     */
    incrementalParams: {
        [index: string]: string;
    };
    /**
     * Applied to `updateCurrentData` setting.
     */
    updateCurrentData: boolean;
    /**
     * Applied to `keepCount` setting.
     */
    keepCount: boolean;
    /**
     * Applied to parser options.
     */
    parserOptions: any;
    /**
     * Applied to the array that lists fields in data that hold date-based values.
     */
    dateFields: string[];
    /**
     * Applied to the array that lists fields in data that hold numeric values.
     */
    numberFields: string[];
    /**
     * Applied to the custom request options object.
     */
    requestOptions: INetRequestOptions;
}
/**
 * ============================================================================
 * MAIN CLASS
 * ============================================================================
 * @hidden
 */
/**
 * Represents a single data source - external file with all of its settings,
 * such as format, data parsing, etc.
 *
 * ```TypeScript
 * chart.dataSource.url = "http://www.myweb.com/data.json";
 * chart.dataSource.parser = am4core.JSONParser;
 * ```
 * ```JavaScript
 * chart.dataSource.url = "http://www.myweb.com/data.json";
 * chart.dataSource.parser = am4core.JSONParser;
 * ```
 * ```JSON
 * {
 *   // ...
 *   "dataSource": {
 *     "url": "http://www.myweb.com/data.json",
 *     "parser": "JSONParser"
 *   },
 *   // ...
 * }
 * ```
 *
 * @see {@link IDataSourceEvents} for a list of available events
 * @see {@link IDataSourceAdapters} for a list of available Adapters
 */
export declare class DataSource extends BaseObjectEvents {
    /**
     * Defines available events.
     */
    _events: IDataSourceEvents;
    /**
     * Defines available adapters.
     */
    _adapter: IDataSourceAdapters;
    /**
     * Adapter.
     */
    adapter: Adapter<DataSource, IDataSourceAdapters>;
    /**
     * A [[Component]] recipient of the data.
     */
    component: Component;
    /**
     * An instance of [[Language]].
     */
    protected _language: Language;
    /**
     * An instance of [[DateFormatter]].
     */
    protected _dateFormatter: DateFormatter;
    /**
     * An instance of parser class that can understand and parse data from the
     * source URL.
     */
    protected _parser: DataParser;
    /**
     * An URL of the data source.
     */
    protected _url: string;
    /**
     * Custom options for HTTP(S) request.
     */
    protected _requestOptions: INetRequestOptions;
    /**
     * Reload full data source every X ms.
     */
    protected _reloadFrequency: number;
    /**
     * Holds timeout reference for next reload.
     */
    protected _reloadTimeout: any;
    /**
     * Holds disposer for the reload event handler.
     */
    private _reloadDisposer;
    /**
     * If set to `true`, any subsequent data loads will be considered incremental
     * (containing only new data points that are supposed to be added to existing
     * data).
     *
     * NOTE: this setting works only with element's `data` property. It won't
     * work with any other externally-loadable data property.
     *
     * @default false
     */
    protected _incremental: boolean;
    /**
     * A collection of key/value pairs to attach to a data source URL when making
     * an incremental request.
     */
    protected _incrementalParams: {
        [index: string]: string;
    };
    /**
     * This setting is used only when `incremental = true`. If set to `true`,
     * it will try to retain the same number of data items across each load.
     *
     * E.g. if incremental load yeilded 5 new records, then 5 items from the
     * beginning of data will be removed so that we end up with the same number
     * of data items.
     *
     * @default false
     */
    protected _keepCount: boolean;
    /**
     * If set to `true`, each subsequent load will be treated as an update to
     * currently loaded data, meaning that it will try to update values on
     * existing data items, not overwrite the whole data.
     *
     * This will work faster than complete update, and also will animate the
     * values to their new positions.
     *
     * Data sources across loads must contain the same number of data items.
     *
     * Loader will not truncate the data set if loaded data has fewer data items,
     * and if it is longer, the excess data items will be ignored.
     *
     * @default false
     * @since 4.5.5
     */
    protected _updateCurrentData: boolean;
    /**
     * Holds the date of the last load.
     */
    lastLoad: Date;
    /**
     * If set to `true` it will timestamp all requested URLs to work around
     * browser cache.
     */
    disableCache: boolean;
    /**
     * Will show loading indicator when loading files.
     */
    showPreloader: boolean;
    /**
     * Loaded and parsed data.
     */
    data: any;
    /**
     * Constructor
     */
    constructor(url?: string, parser?: string | DataParser);
    /**
     * Processes the loaded data.
     *
     * @ignore Exclude from docs
     * @param data         Raw (unparsed) data
     * @param contentType  Content type of the loaded data (optional)
     */
    processData(data: string, contentType?: string): void;
    /**
     * URL of the data source.
     *
     * @param value  URL
     */
    /**
    * @return URL
    */
    url: string;
    /**
     * Custom options for HTTP(S) request.
     *
     * At this moment the only option supported is: `requestHeaders`, which holds
     * an array of objects for custom request headers, e.g.:
     *
     * ```TypeScript
     * chart.dataSource.requestOptions.requestHeaders = [{
     *   "key": "x-access-token",
     *   "value": "123456789"
     * }];
     * ``````JavaScript
     * chart.dataSource.requestOptions.requestHeaders = [{
     *   "key": "x-access-token",
     *   "value": "123456789"
     * }];
     * ```
     * ```JSON
     * {
     *   // ...
     *   "dataSource": {
     *     // ...
     *     "requestOptions": {
     *       "requestHeaders": [{
     *         "key": "x-access-token",
     *         "value": "123456789"
     *       }]
     *     }
     *   }
     * }
     * ```
     *
     * NOTE: setting this options on an-already loaded DataSource will not
     * trigger a reload.
     *
     * @param value  Options
     */
    /**
    * @return Options
    */
    requestOptions: INetRequestOptions;
    /**
     * A parser to be used to parse data.
     *
     * ```TypeScript
     * chart.dataSource.url = "http://www.myweb.com/data.json";
     * chart.dataSource.parser = am4core.JSONParser;
     * ```
     * ```JavaScript
     * chart.dataSource.url = "http://www.myweb.com/data.json";
     * chart.dataSource.parser = am4core.JSONParser;
     * ```
     * ```JSON
     * {
     *   // ...
     *   "dataSource": {
     *     "url": "http://www.myweb.com/data.json",
     *     "parser": {
     *       "type": "JSONParser"
     *     }
     *   },
     *   // ...
     * }
     * ```
     *
     * @default JSONParser
     * @param value  Data parser
     */
    /**
    * @return Data parser
    */
    parser: DataParser;
    /**
     * Data source reload frequency.
     *
     * If set, it will reload the same URL every X milliseconds.
     *
     * @param value Reload frequency (ms)
     */
    /**
    * @return Reload frequency (ms)
    */
    reloadFrequency: number;
    /**
     * Should subsequent reloads be treated as incremental?
     *
     * Incremental loads will assume that they contain only new data items
     * since the last load.
     *
     * If `incremental = false` the loader will replace all of the target's
     * data with each load.
     *
     * This setting does not have any effect trhe first time data is loaded.
     *
     * NOTE: this setting works only with element's `data` property. It won't
     * work with any other externally-loadable data property.
     *
     * @default false
     * @param Incremental load?
     */
    /**
    * @return Incremental load?
    */
    incremental: boolean;
    /**
     * An object consisting of key/value pairs to apply to an URL when data
     * source is making an incremental request.
     *
     * @param value  Incremental request parameters
     */
    /**
    * @return Incremental request parameters
    */
    incrementalParams: {
        [index: string]: string;
    };
    /**
     * This setting is used only when `incremental = true`. If set to `true`,
     * it will try to retain the same number of data items across each load.
     *
     * E.g. if incremental load yeilded 5 new records, then 5 items from the
     * beginning of data will be removed so that we end up with the same number
     * of data items.
     *
     * @default false
     * @param Keep record count?
     */
    /**
    * @return keepCount load?
    */
    keepCount: boolean;
    /**
     * If set to `true`, each subsequent load will be treated as an update to
     * currently loaded data, meaning that it will try to update values on
     * existing data items, not overwrite the whole data.
     *
     * This will work faster than complete update, and also will animate the
     * values to their new positions.
     *
     * Data sources across loads must contain the same number of data items.
     *
     * Loader will not truncate the data set if loaded data has fewer data items,
     * and if it is longer, the excess data items will be ignored.
     *
     * NOTE: this setting is ignored if `incremental = true`.
     *
     * @default false
     * @since 2.5.5
     * @param Update current data?
     */
    /**
    * @return Update current data?
    */
    updateCurrentData: boolean;
    /**
     * Language instance to use.
     *
     * Will inherit and use chart's language, if not set.
     *
     * @param value An instance of Language
     */
    /**
    * @return A [[Language]] instance to be used
    */
    language: Language;
    /**
     * A [[DateFormatter]] to use when parsing dates from string formats.
     *
     * Will inherit and use chart's DateFormatter if not ser.
     *
     * @param value An instance of [[DateFormatter]]
     */
    /**
    * @return A [[DateFormatter]] instance to be used
    */
    dateFormatter: DateFormatter;
    /**
     * Adds current timestamp to the URL.
     *
     * @param url  Source URL
     * @return Timestamped URL
     */
    timestampUrl(url: string): string;
    /**
     * Disposes of this object.
     */
    dispose(): void;
    /**
     * Initiate the load.
     *
     * All loading in JavaScript is asynchronous. This function will trigger the
     * load and will exit immediately.
     *
     * Use DataSource's events to watch for loaded data and errors.
     */
    load(): void;
    /**
     * Adds parameters to `url` as query strings. Will take care of proper
     * separators.
     *
     * @param url     Source URL
     * @param params  Parameters
     * @return New URL
     */
    addUrlParams(url: string, params: {
        [index: string]: string;
    }): string;
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
