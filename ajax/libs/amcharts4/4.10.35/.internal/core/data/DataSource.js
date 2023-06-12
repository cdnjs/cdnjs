import { __extends } from "tslib";
/**
 * ============================================================================
 * IMPORTS
 * ============================================================================
 * @hidden
 */
import { dataLoader } from "./DataLoader";
import { JSONParser } from "./JSONParser";
import { CSVParser } from "./CSVParser";
import { BaseObjectEvents } from "../Base";
import { Adapter } from "../utils/Adapter";
import { Language } from "../utils/Language";
import { DateFormatter } from "../formatters/DateFormatter";
import { registry } from "../Registry";
import * as $type from "../utils/Type";
import * as $object from "../utils/Object";
;
;
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
var DataSource = /** @class */ (function (_super) {
    __extends(DataSource, _super);
    /**
     * Constructor
     */
    function DataSource(url, parser) {
        var _this = 
        // Init
        _super.call(this) || this;
        /**
         * Adapter.
         */
        _this.adapter = new Adapter(_this);
        /**
         * Custom options for HTTP(S) request.
         */
        _this._requestOptions = {};
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
        _this._incremental = false;
        /**
         * A collection of key/value pairs to attach to a data source URL when making
         * an incremental request.
         */
        _this._incrementalParams = {};
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
        _this._keepCount = false;
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
        _this._updateCurrentData = false;
        /**
         * Will show loading indicator when loading files.
         */
        _this.showPreloader = true;
        _this.className = "DataSource";
        // Set defaults
        if (url) {
            _this.url = url;
        }
        // Set parser
        if (parser) {
            if (typeof parser == "string") {
                _this.parser = dataLoader.getParserByType(parser);
            }
            else {
                _this.parser = parser;
            }
        }
        return _this;
    }
    /**
     * Processes the loaded data.
     *
     * @ignore Exclude from docs
     * @param data         Raw (unparsed) data
     * @param contentType  Content type of the loaded data (optional)
     */
    DataSource.prototype.processData = function (data, contentType) {
        // Parsing started
        this.dispatchImmediately("parsestarted");
        // Check if parser is set
        if (!this.parser) {
            // Try to resolve from data
            this.parser = dataLoader.getParserByData(data, contentType);
            if (!this.parser) {
                // We have a problem - nobody knows what to do with the data
                // Raise error
                if (this.events.isEnabled("parseerror")) {
                    var event_1 = {
                        type: "parseerror",
                        message: this.language.translate("No parser available for file: %1", null, this.url),
                        target: this
                    };
                    this.events.dispatchImmediately("parseerror", event_1);
                }
                this.dispatchImmediately("parseended");
                return;
            }
        }
        // Apply options adapters
        this.parser.options = this.adapter.apply("parserOptions", this.parser.options);
        this.parser.options.dateFields = this.adapter.apply("dateFields", this.parser.options.dateFields || []);
        this.parser.options.numberFields = this.adapter.apply("numberFields", this.parser.options.numberFields || []);
        // Check if we need to pass in date formatter
        if (this.parser.options.dateFields && !this.parser.options.dateFormatter) {
            this.parser.options.dateFormatter = this.dateFormatter;
        }
        // Parse
        this.data = this.adapter.apply("parsedData", this.parser.parse(this.adapter.apply("unparsedData", data)));
        // Check for parsing errors
        if (!$type.hasValue(this.data) && this.events.isEnabled("parseerror")) {
            var event_2 = {
                type: "parseerror",
                message: this.language.translate("Error parsing file: %1", null, this.url),
                target: this
            };
            this.events.dispatchImmediately("parseerror", event_2);
        }
        // Wrap up
        this.dispatchImmediately("parseended");
        if ($type.hasValue(this.data)) {
            this.dispatchImmediately("done", {
                "data": this.data
            });
        }
        // The component is responsible for updating its own data vtriggered via
        // events.
        // Update last data load
        this.lastLoad = new Date();
    };
    Object.defineProperty(DataSource.prototype, "url", {
        /**
         * @return URL
         */
        get: function () {
            // Get URL
            var url = this.disableCache
                ? this.timestampUrl(this._url)
                : this._url;
            // Add incremental params
            if (this.incremental && this.component.data.length) {
                url = this.addUrlParams(url, this.incrementalParams);
            }
            return this.adapter.apply("url", url);
        },
        /**
         * URL of the data source.
         *
         * @param value  URL
         */
        set: function (value) {
            this._url = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DataSource.prototype, "requestOptions", {
        /**
         * @return Options
         */
        get: function () {
            return this.adapter.apply("requestOptions", this._requestOptions);
        },
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
        set: function (value) {
            this._requestOptions = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DataSource.prototype, "parser", {
        /**
         * @return Data parser
         */
        get: function () {
            if (!this._parser) {
                this._parser = new JSONParser();
            }
            return this.adapter.apply("parser", this._parser);
        },
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
        set: function (value) {
            this._parser = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DataSource.prototype, "reloadFrequency", {
        /**
         * @return Reload frequency (ms)
         */
        get: function () {
            return this.adapter.apply("reloadTimeout", this._reloadFrequency);
        },
        /**
         * Data source reload frequency.
         *
         * If set, it will reload the same URL every X milliseconds.
         *
         * @param value Reload frequency (ms)
         */
        set: function (value) {
            var _this = this;
            if (this._reloadFrequency != value) {
                this._reloadFrequency = value;
                // Should we schedule a reload?
                if (value) {
                    if (!$type.hasValue(this._reloadDisposer)) {
                        this._reloadDisposer = this.events.on("ended", function (ev) {
                            _this._reloadTimeout = setTimeout(function () {
                                _this.load();
                            }, _this.reloadFrequency);
                        });
                    }
                }
                else if ($type.hasValue(this._reloadDisposer)) {
                    this._reloadDisposer.dispose();
                    this._reloadDisposer = undefined;
                }
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DataSource.prototype, "incremental", {
        /**
         * @return Incremental load?
         */
        get: function () {
            return this.adapter.apply("incremental", this._incremental);
        },
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
        set: function (value) {
            this._incremental = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DataSource.prototype, "incrementalParams", {
        /**
         * @return Incremental request parameters
         */
        get: function () {
            return this.adapter.apply("incrementalParams", this._incrementalParams);
        },
        /**
         * An object consisting of key/value pairs to apply to an URL when data
         * source is making an incremental request.
         *
         * @param value  Incremental request parameters
         */
        set: function (value) {
            this._incrementalParams = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DataSource.prototype, "keepCount", {
        /**
         * @return keepCount load?
         */
        get: function () {
            return this.adapter.apply("keepCount", this._keepCount);
        },
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
        set: function (value) {
            this._keepCount = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DataSource.prototype, "updateCurrentData", {
        /**
         * @return Update current data?
         */
        get: function () {
            return this.adapter.apply("updateCurrentData", this._updateCurrentData);
        },
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
        set: function (value) {
            this._updateCurrentData = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DataSource.prototype, "language", {
        /**
         * @return A [[Language]] instance to be used
         */
        get: function () {
            if (this._language) {
                return this._language;
            }
            else if (this.component) {
                this._language = this.component.language;
                return this._language;
            }
            this.language = new Language();
            return this.language;
        },
        /**
         * Language instance to use.
         *
         * Will inherit and use chart's language, if not set.
         *
         * @param value An instance of Language
         */
        set: function (value) {
            this._language = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DataSource.prototype, "dateFormatter", {
        /**
         * @return A [[DateFormatter]] instance to be used
         */
        get: function () {
            if (this._dateFormatter) {
                return this._dateFormatter;
            }
            else if (this.component) {
                this._dateFormatter = this.component.dateFormatter;
                return this._dateFormatter;
            }
            this.dateFormatter = new DateFormatter();
            return this.dateFormatter;
        },
        /**
         * A [[DateFormatter]] to use when parsing dates from string formats.
         *
         * Will inherit and use chart's DateFormatter if not ser.
         *
         * @param value An instance of [[DateFormatter]]
         */
        set: function (value) {
            this._dateFormatter = value;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Adds current timestamp to the URL.
     *
     * @param url  Source URL
     * @return Timestamped URL
     */
    DataSource.prototype.timestampUrl = function (url) {
        var tstamp = new Date().getTime().toString();
        var params = {};
        params[tstamp] = "";
        return this.addUrlParams(url, params);
    };
    /**
     * Disposes of this object.
     */
    DataSource.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
        if (this._reloadTimeout) {
            clearTimeout(this._reloadTimeout);
        }
        if ($type.hasValue(this._reloadDisposer)) {
            this._reloadDisposer.dispose();
            this._reloadDisposer = undefined;
        }
    };
    /**
     * Initiate the load.
     *
     * All loading in JavaScript is asynchronous. This function will trigger the
     * load and will exit immediately.
     *
     * Use DataSource's events to watch for loaded data and errors.
     */
    DataSource.prototype.load = function () {
        if (this.url) {
            if (this._reloadTimeout) {
                clearTimeout(this._reloadTimeout);
            }
            dataLoader.load(this);
        }
    };
    /**
     * Adds parameters to `url` as query strings. Will take care of proper
     * separators.
     *
     * @param url     Source URL
     * @param params  Parameters
     * @return New URL
     */
    DataSource.prototype.addUrlParams = function (url, params) {
        var join = url.match(/\?/) ? "&" : "?";
        var add = [];
        $object.each(params, function (key, value) {
            if (value != "") {
                add.push(key + "=" + encodeURIComponent(value));
            }
            else {
                add.push(key);
            }
        });
        if (add.length) {
            return url + join + add.join("&");
        }
        return url;
    };
    /**
     * Processes JSON-based config before it is applied to the object.
     *
     * @ignore Exclude from docs
     * @param config  Config
     */
    DataSource.prototype.processConfig = function (config) {
        registry.registeredClasses["json"] = JSONParser;
        registry.registeredClasses["JSONParser"] = JSONParser;
        registry.registeredClasses["csv"] = CSVParser;
        registry.registeredClasses["CSVParser"] = CSVParser;
        _super.prototype.processConfig.call(this, config);
    };
    return DataSource;
}(BaseObjectEvents));
export { DataSource };
//# sourceMappingURL=DataSource.js.map