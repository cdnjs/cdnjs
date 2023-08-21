/**
 * Duration formatting functionality.
 */
import { __extends } from "tslib";
import { Language } from "../utils/Language";
import { BaseObject } from "../Base";
import { getTextFormatter } from "../formatters/TextFormatter";
import { registry } from "../Registry";
import * as $strings from "../utils/Strings";
import * as $object from "../utils/Object";
import * as $utils from "../utils/Utils";
import * as $type from "../utils/Type";
import * as $math from "../utils/Math";
/**
 * DurationFormatter class. Formats numbers as durations.
 *
 * `1000` as `16:40`
 *
 * @see {@link https://www.amcharts.com/docs/v4/concepts/formatters/formatting-duration/} Tutorial on duration formatting
 */
var DurationFormatter = /** @class */ (function (_super) {
    __extends(DurationFormatter, _super);
    /**
     * Constructor
     */
    function DurationFormatter() {
        var _this = _super.call(this) || this;
        /**
         * A base value for negative numbers. Will treat all numbers below this value
         * as negative numbers.
         */
        _this._negativeBase = 0;
        /**
         * A base unit to consider values are in.
         *
         * @default "s"
         */
        _this._baseUnit = "second";
        /**
         * Output format to produce. If the format calls for applying color to the
         * formatted value, this setting will determine what markup to use: SVG or
         * HTML.
         *
         * Available options: svg, html.
         *
         * @default "svg"
         */
        _this._outputFormat = "svg";
        /**
         * How many milliseconds each unit represents.
         */
        _this._unitValues = {
            "millisecond": 1,
            "second": 1000,
            "minute": 60000,
            "hour": 3600000,
            "day": 86400000,
            "week": 604800000,
            "month": 2592000000,
            "year": 31536000000,
        };
        /**
         * Collection of aliases for units.
         */
        _this._unitAliases = {
            "Y": "y",
            "D": "d",
            "H": "h",
            "K": "h",
            "k": "h",
            "n": "S"
        };
        _this.className = "DurationFormatter";
        _this.applyTheme();
        return _this;
    }
    /**
     * Formats the number according as duration.
     *
     * For example `1000` (base unit seconds) would be converted to `16:40` as in
     * 16 minutes and 40 seconds.
     *
     * @see {@link https://www.amcharts.com/docs/v4/concepts/formatters/formatting-duration/} Tutorial on duration formatting
     * @param value   Value to format
     * @param format  Format to apply
     * @param base    Override base unit
     * @return Formatted number
     */
    DurationFormatter.prototype.format = function (value, format, base) {
        // no language?
        if (!this.language) {
            if (this.sprite) {
                this.language = this.sprite.language;
            }
            else {
                this.language = new Language;
            }
        }
        // no base unit?
        var baseUnit = base || this._baseUnit;
        // no format passed in or empty
        if (typeof format === "undefined" || format === "") {
            if ($type.hasValue(this.durationFormat)) {
                format = this.durationFormat;
            }
            else {
                format = this.getFormat($type.toNumber(value), null, baseUnit);
            }
        }
        // Clean format
        format = $utils.cleanFormat(format);
        // get format info (it will also deal with parser caching)
        var info = this.parseFormat(format, baseUnit);
        // cast to number just in case
        // TODO: maybe use better casting
        var source = Number(value);
        // format and replace the number
        var details;
        if (source > this._negativeBase) {
            details = info.positive;
        }
        else if (source < this._negativeBase) {
            details = info.negative;
        }
        else {
            details = info.zero;
        }
        // Format
        var formatted = this.applyFormat(source, details);
        // Apply color?
        if (details.color !== "") {
            if (this._outputFormat === "svg") {
                formatted = "<tspan fill='" + details.color + "'>" + formatted + "</tspan>";
            }
            else if (this._outputFormat === "html") {
                formatted = "<span style='color: " + details.color + ";'>" + formatted + "</span>";
            }
        }
        return formatted;
    };
    /**
     * Parses supplied format into structured object which can be used to format
     * the number.
     *
     * @param format  Format string, i.e. "#,###.00"
     * @param base    Override base unit
     * @return Parsed information
     */
    DurationFormatter.prototype.parseFormat = function (format, base) {
        var _this = this;
        // Check cache
        var cached = this.getCache(format);
        if ($type.hasValue(cached)) {
            return cached;
        }
        // no base unit?
        var baseUnit = base || this._baseUnit;
        // Initialize duration parsing info
        var info = {
            "positive": {
                "color": "",
                "template": "",
                "parts": [],
                "source": "",
                "baseUnit": baseUnit,
                "parsed": false,
                "absolute": false
            },
            "negative": {
                "color": "",
                "template": "",
                "parts": [],
                "source": "",
                "baseUnit": baseUnit,
                "parsed": false,
                "absolute": false
            },
            "zero": {
                "color": "",
                "template": "",
                "parts": [],
                "source": "",
                "baseUnit": baseUnit,
                "parsed": false,
                "absolute": false
            }
        };
        // Escape double vertical bars (that mean display one vertical bar)
        format = format.replace("||", $strings.PLACEHOLDER2);
        // Split it up and deal with different formats
        var parts = format.split("|");
        info.positive.source = parts[0];
        if (typeof parts[2] === "undefined") {
            info.zero = info.positive;
        }
        else {
            info.zero.source = parts[2];
        }
        if (typeof parts[1] === "undefined") {
            info.negative = info.positive;
        }
        else {
            info.negative.source = parts[1];
        }
        // Parse each
        $object.each(info, function (part, item) {
            // Already parsed
            if (item.parsed) {
                return;
            }
            // Check cached
            if (typeof _this.getCache(item.source) !== "undefined") {
                info[part] = _this.getCache(item.source);
                return;
            }
            // Begin parsing
            var partFormat = item.source;
            // Check for [] directives
            var dirs = [];
            dirs = item.source.match(/^\[([^\]]*)\]/);
            if (dirs && dirs.length && dirs[0] !== "") {
                partFormat = item.source.substr(dirs[0].length);
                item.color = dirs[1];
            }
            // Let TextFormatter split into chunks
            var chunks = getTextFormatter().chunk(partFormat, true);
            for (var i = 0; i < chunks.length; i++) {
                var chunk = chunks[i];
                // replace back double vertical bar
                chunk.text = chunk.text.replace($strings.PLACEHOLDER2, "|");
                if (chunk.type === "value") {
                    // Just "Duration"?
                    // if (chunk.text.toLowerCase() === "duration") {
                    // 	chunk.text = durationFormat;
                    // }
                    // Check for "a" (absolute) modifier
                    if (chunk.text.match(/[yYMdDwhHKkmsSn]+a/)) {
                        item.absolute = true;
                        chunk.text = chunk.text.replace(/([yYMdDwhHKkmsSn]+)a/, "$1");
                    }
                    // Find all possible parts
                    var matches = chunk.text.match(/y+|Y+|M+|d+|D+|w+|h+|H+|K+|k+|m+|s+|S+|n+/g);
                    if (matches) {
                        // Populate template
                        for (var x = 0; x < matches.length; x++) {
                            // Is it an alias?
                            if (!$type.hasValue(matches[x])) {
                                matches[x] = _this._unitAliases[matches[x]];
                            }
                            item.parts.push(matches[x]);
                            chunk.text = chunk.text.replace(matches[x], $strings.PLACEHOLDER);
                        }
                    }
                }
                // Apply to template
                item.template += chunk.text;
            }
            // Apply style formatting
            //item.template = getTextFormatter().format(item.template, this.outputFormat);
            // Save cache
            _this.setCache(item.source, item);
            // Mark this as parsed
            item.parsed = true;
        });
        // Save cache (the whole thing)
        this.setCache(format, info);
        return info;
    };
    /**
     * Applies parsed format to a numeric value.
     *
     * @param value    Value
     * @param details  Parsed format as returned by {parseFormat}
     * @return Formatted duration
     */
    DurationFormatter.prototype.applyFormat = function (value, details) {
        // Use absolute values
        var negative = !details.absolute && (value < this._negativeBase);
        value = Math.abs(value);
        // Recalculate to milliseconds
        var tstamp = this.toTimeStamp(value, details.baseUnit);
        // Init return value
        var res = details.template;
        // Iterate through duration parts
        for (var i = 0, len = details.parts.length; i < len; i++) {
            // Gather the part
            var part = details.parts[i];
            var unit = this.toTimeUnit(part.substr(0, 1));
            var digits = part.length;
            // Calculate current unit value
            var ints = Math.floor(tstamp / this._unitValues[unit]);
            res = res.replace($strings.PLACEHOLDER, $utils.padString(ints, digits, "0"));
            // Reduce timestamp
            tstamp -= ints * this._unitValues[unit];
        }
        // Reapply negative sign
        if (negative) {
            res = "-" + res;
        }
        return res;
    };
    /**
     * Converts numeric value to timestamp in milliseconds.
     *
     * @param value     A source value
     * @param baseUnit  Base unit the source value is in: "q", "s", "i", "h", "d", "w", "m", "y"
     * @return Value representation as a timestamp in milliseconds
     */
    DurationFormatter.prototype.toTimeStamp = function (value, baseUnit) {
        return value * this._unitValues[baseUnit];
    };
    DurationFormatter.prototype.toTimeUnit = function (code) {
        switch (code) {
            case "S":
                return "millisecond";
            case "s":
                return "second";
            case "m":
                return "minute";
            case "h":
                return "hour";
            case "d":
                return "day";
            case "w":
                return "week";
            case "M":
                return "month";
            case "y":
                return "year";
        }
        ;
    };
    /**
     * Invalidates the parent [[Sprite]] object.
     */
    DurationFormatter.prototype.invalidateSprite = function () {
        if (this.sprite) {
            this.sprite.invalidate();
        }
    };
    Object.defineProperty(DurationFormatter.prototype, "baseUnit", {
        /**
         * @return Base unit
         */
        get: function () {
            return this._baseUnit;
        },
        /**
         * Base unit the values are in.
         *
         * A base unit will be used to recalculate the numeric value to millisecond
         * timestamps.
         *
         * Available options:
         *
         * * "millisecond"
         * * "second"
         * * "minute"
         * * "hour"
         * * "day"
         * * "week"
         * * "month"
         * * "year"
         *
         * @default "s"
         * @param baseUnit  A base unit
         */
        set: function (baseUnit) {
            this._baseUnit = baseUnit;
            this.invalidateSprite();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DurationFormatter.prototype, "outputFormat", {
        /**
         * Getter for output format.
         *
         * @ignore Exclude from docs
         * @return Output format
         */
        get: function () {
            return this._outputFormat;
        },
        /**
         * Setter for output format: "svg" or "html.
         *
         * @ignore Exclude from docs
         * @param value  Output format
         */
        set: function (outputFormat) {
            this._outputFormat = outputFormat.toLowerCase();
            this.invalidateSprite();
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Returns appropriate default format for the value.
     *
     * If `maxValue` is sepcified, it will use that value to determine the time
     * unit for the format.
     *
     * For example if your `baseUnit` is `"second"` and you pass in `10`, you
     * will get `"10"`.
     *
     * However, you might want it to be formatted in the context of bigger scale,
     * say 10 minutes (600 seconds). If you pass in `600` as `maxValue`, all
     * values, including small ones will use format with minutes, e.g.:
     * `00:10`, `00:50`, `12: 30`, etc.
     *
     * @param value     Value to format
     * @param maxValue  Maximum value to be used to determine format
     * @param baseUnit  Base unit of the value
     * @return Format
     */
    DurationFormatter.prototype.getFormat = function (value, maxValue, baseUnit) {
        // Is format override set?
        if ($type.hasValue(this.durationFormat)) {
            return this.durationFormat;
        }
        // Get base unit
        if (!baseUnit) {
            baseUnit = this.baseUnit;
        }
        if ($type.hasValue(maxValue) && value != maxValue) {
            value = Math.abs(value);
            maxValue = Math.abs(maxValue);
            var maxUnit = this.getValueUnit($math.max(value, maxValue), baseUnit);
            //let diffUnit = this.getValueUnit(Math.abs(maxValue - value), baseUnit);
            //console.log(maxUnit, diffUnit);
            return this.durationFormats[baseUnit][maxUnit];
        }
        else {
            var unit = this.getValueUnit(value, baseUnit);
            return this.durationFormats[baseUnit][unit];
        }
    };
    /**
     * Returns value's closest denominator time unit, e.g 100 seconds is
     * `"minute"`, while 59 seconds would still be `second`.
     *
     * @param value     Source duration value
     * @param baseUnit  Base unit
     * @return Denominator
     */
    DurationFormatter.prototype.getValueUnit = function (value, baseUnit) {
        // Get base unit
        if (!baseUnit) {
            baseUnit = this.baseUnit;
        }
        // Convert to milliseconds
        var currentUnit;
        var ms = this.getMilliseconds(value, baseUnit);
        $object.eachContinue(this._unitValues, function (key, val) {
            if (key == baseUnit || currentUnit) {
                var num = ms / val;
                if (num <= 1) {
                    if (!currentUnit) {
                        currentUnit = key;
                    }
                    return false;
                }
                currentUnit = key;
            }
            return true;
        });
        return currentUnit;
    };
    /**
     * Converts value to milliseconds according to `baseUnit`.
     *
     * @param value     Source duration value
     * @param baseUnit  Base unit
     * @return Value in milliseconds
     */
    DurationFormatter.prototype.getMilliseconds = function (value, baseUnit) {
        // Get base unit
        if (!baseUnit) {
            baseUnit = this.baseUnit;
        }
        return value * this._unitValues[baseUnit];
    };
    Object.defineProperty(DurationFormatter.prototype, "durationFormat", {
        /**
         * @return Format
         */
        get: function () {
            return this._durationFormat;
        },
        /**
         * If set, this format will be used instead of the one determined dynamically
         * based on the basedUnit and range of values.
         *
         * @see {@link https://www.amcharts.com/docs/v4/concepts/formatters/formatting-duration/} Available fomatting codes
         * @param value  Format
         */
        set: function (value) {
            if (this._durationFormat != value) {
                this._durationFormat = value;
                this.invalidateSprite();
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DurationFormatter.prototype, "durationFormats", {
        /**
         * @return Formats
         */
        get: function () {
            if (!this._durationFormats) {
                this._durationFormats = {
                    "millisecond": {
                        "millisecond": this.language.translate("_duration_millisecond"),
                        "second": this.language.translate("_duration_millisecond_second"),
                        "minute": this.language.translate("_duration_millisecond_minute"),
                        "hour": this.language.translate("_duration_millisecond_hour"),
                        "day": this.language.translate("_duration_millisecond_day"),
                        "week": this.language.translate("_duration_millisecond_week"),
                        "month": this.language.translate("_duration_millisecond_month"),
                        "year": this.language.translate("_duration_millisecond_year")
                    },
                    "second": {
                        "second": this.language.translate("_duration_second"),
                        "minute": this.language.translate("_duration_second_minute"),
                        "hour": this.language.translate("_duration_second_hour"),
                        "day": this.language.translate("_duration_second_day"),
                        "week": this.language.translate("_duration_second_week"),
                        "month": this.language.translate("_duration_second_month"),
                        "year": this.language.translate("_duration_second_year")
                    },
                    "minute": {
                        "minute": this.language.translate("_duration_minute"),
                        "hour": this.language.translate("_duration_minute_hour"),
                        "day": this.language.translate("_duration_minute_day"),
                        "week": this.language.translate("_duration_minute_week"),
                        "month": this.language.translate("_duration_minute_month"),
                        "year": this.language.translate("_duration_minute_year")
                    },
                    "hour": {
                        "hour": this.language.translate("_duration_hour"),
                        "day": this.language.translate("_duration_hour_day"),
                        "week": this.language.translate("_duration_hour_week"),
                        "month": this.language.translate("_duration_hour_month"),
                        "year": this.language.translate("_duration_hour_year")
                    },
                    "day": {
                        "day": this.language.translate("_duration_day"),
                        "week": this.language.translate("_duration_day_week"),
                        "month": this.language.translate("_duration_day_month"),
                        "year": this.language.translate("_duration_day_year")
                    },
                    "week": {
                        "week": this.language.translate("_duration_week"),
                        "month": this.language.translate("_duration_week_month"),
                        "year": this.language.translate("_duration_week_year")
                    },
                    "month": {
                        "month": this.language.translate("_duration_month"),
                        "year": this.language.translate("_duration_month_year")
                    },
                    "year": {
                        "year": this.language.translate("_duration_year")
                    }
                };
            }
            return this._durationFormats;
        },
        /**
         * Duration formats for various combination of base units.
         *
         * @param value  Formats
         */
        set: function (value) {
            this._durationFormats = value;
            this.invalidateSprite();
        },
        enumerable: true,
        configurable: true
    });
    return DurationFormatter;
}(BaseObject));
export { DurationFormatter };
/**
 * Register class in system, so that it can be instantiated using its name from
 * anywhere.
 *
 * @ignore
 */
registry.registeredClasses["DurationFormatter"] = DurationFormatter;
//# sourceMappingURL=DurationFormatter.js.map