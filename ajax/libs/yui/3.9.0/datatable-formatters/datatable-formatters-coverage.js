if (typeof _yuitest_coverage == "undefined"){
    _yuitest_coverage = {};
    _yuitest_coverline = function(src, line){
        var coverage = _yuitest_coverage[src];
        if (!coverage.lines[line]){
            coverage.calledLines++;
        }
        coverage.lines[line]++;
    };
    _yuitest_coverfunc = function(src, name, line){
        var coverage = _yuitest_coverage[src],
            funcId = name + ":" + line;
        if (!coverage.functions[funcId]){
            coverage.calledFunctions++;
        }
        coverage.functions[funcId]++;
    };
}
_yuitest_coverage["build/datatable-formatters/datatable-formatters.js"] = {
    lines: {},
    functions: {},
    coveredLines: 0,
    calledLines: 0,
    coveredFunctions: 0,
    calledFunctions: 0,
    path: "build/datatable-formatters/datatable-formatters.js",
    code: []
};
_yuitest_coverage["build/datatable-formatters/datatable-formatters.js"].code=["YUI.add('datatable-formatters', function (Y, NAME) {","","/**","Adds predefined cell formatters to `Y.DataTable.BodyView`.","","@module datatable","@submodule datatable-formatters","@since 3.8.0","**/","var Lang = Y.Lang,","    isValue = Lang.isValue,","    escape = Y.Escape.html,","","    getCName = Y.ClassNameManager.getClassName,","    cName = function (name) {","        return getCName('datatable', name);","    },","    stringValue = function (value, def) {","        return (isValue(value) ? escape(value.toString()) : def || '');","    },","    /**","    Registry of function producing cell formatting functions.","    Allows for names to be used in the column","    definition `formatter` property:","","        {key:\"myColumn\", formatter:\"date\"}","","    These functions are not meant to be used directly.  Instead, they will be","    automatically called when their names are used as values for the `formatter`","    property in a columnd definition.","    They will be called just once per rendering cycle and will receive","    the column configuration.  They are expected to return a function that will","    then be called once per row and will do the actual formatting.","    They are expected to do all the preparatory once-per-render work","    so that the actual formatting function doesn't need to repeat it.","","    @class DataTable.BodyView.Formatters","    @since 3.8.0","    **/","    Formatters = {","","        /**","        Returns a formatter that produces a BUTTON element using the value of","        the `buttonLabel` column definition attribute as its label or the text","        `Click` if not found.","","        Applies the CSS className `yui3-datatable-button` to the cell.","","        @method button","        @param col {Object} The column definition.","        @return {Function} A formatter function that produces a `<button>` element.","        @static","        **/","       button: function (col) {","           var className = cName('button'),","               html = '<button>' + (col.buttonLabel || 'Click') + '</button>';","           col.allowHTML = true;","           return function(o) {","               o.className = className;","               return html;","","           };","       },","","       /**","       Returns a formatter function that returns the texts `\"true\"` or `\"false\"`","       and assigns the CSS classNames `yui3-datatable-true` or `yui3-datatable-false`","       based on the value of the cell.","","       If either a `booleanLabels` configuration object is defined for the column","       or a `booleanLabels` configuration attribute is defined for the datatable,","       the formatter will use the values for the properties `true` or `false`","       of either of those objects as the text to show.","","       It returns `null`s or `undefined`s unchanged so that the `emptyCellValue`","       configuration attribute will eventually apply.","","            {key:\"active\", formatter: \"boolean\", booleanLabels: {","                \"true\": \"yes\",","                \"false\": \"no\"","            }}","","","       @method boolean","       @param col {Object} The column definition.","       @return {Function} A formatter function that formats boolean data.","       @static","       **/","       'boolean': function (col) {","            var labels = col.booleanLabels || this.get('booleanLabels') || {'true':'true', 'false':'false'};","            return function(o) {","                var value = o.value;","                if (!value && value !== false) {","                    return value;","                }","                value = value?'true':'false';","                o.className = cName(value);","                return labels[value];","            };","       },","","       /**","       Returns a formatter function that formats values as currency using","       the `Y.Number.format` method.","       It looks for the format to apply in the `currencyFormat` property of the column","       or in the `currencyFormat` attribute of the whole table.","","           {key: \"amount\", formatter: \"currency\", currencyFormat: {","               decimalPlaces:2,","               decimalSeparator: \",\",","               thousandsSeparator: \".\",","               suffix: \"&euro;\"","           }}","","       See <a href=\"Number.html#method_format\">Y.Number.format</a> for the available format specs.","","       Anything that cannot be parsed as a number will be returned unchanged.","","       Applies the CSS className `yui3-datatable-currency` to the cell.","       @method currency","       @param col {Object} The column definition.","       @return {Function} A formatter function that formats numerical data as currency.","       @static","       **/","        currency: function (col) {","            var className = cName('currency'),","                format = col.currencyFormat || this.get('currencyFormat'),","                fn = Y.Number.format;","            return function (o) {","                o.className = className;","                var value = parseFloat(o.value);","                if (!value && value !== 0) {","                    return o.value;","                }","                return fn(value, format);","            };","        },","","","        /**","        Returns a date formatting function based on the given format.","        @method _date","       @param format {String} The format spec definition.","       @return {Function} A formatter function that formats numerical data as currency.","        @private","        @static","        **/","        _date: function (format) {","            var className = cName('date'),","                fn = Y.Date.format;","            format = {format: format};","            return function (o) {","                o.className = className;","                return fn(o.value, format);","            };","        },","        /**","        Returns a date formatting function.","        It looks for the format to apply in the `dateFormat` property of the column","        or in the `dateFormat` attribute of the whole table.","","            {key: \"DOB\", formatter: \"date\", dateFormat: \"%I:%M:%S %p\"}","","        See <a href=\"Date.html#method_format\">Y.Date.format</a> for the available format specs.","","        Anything that is not a date is returned unchanged.","","        Applies the CSS className `yui3-datatable-date` to the cell.","        @method date","        @param col {Object} The column definition.","        @return {Function} A formatter function that formats dates.","        @static","        **/","        'date' : function (col) {","            return Formatters._date(col.dateFormat || this.get('dateFormat'));","        },","        /**","        Returns a date-only (no time part) formatting function using the current locale.","","            {key: \"DOB\", formatter: \"localDate\"}","","        Anything that is not a date is returned unchanged.","","        Applies the CSS className `yui3-datatable-date` to the cell.","        @method localDate","        @return {Function} A formatter function that formats dates.","        @static","        **/","        localDate : function () {","            return Formatters._date('%x');","        },","        /**","        Returns a time-only (no date part) formatting function using the current locale.","","            {key: \"startTime\", formatter: \"localTime\"}","","        Anything that is not a date is returned unchanged.","","        Applies the CSS className `yui3-datatable-date` to the cell.","        @method localTime","        @return {Function} A formatter function that formats dates.","        @static","        **/","        localTime : function () {","            return Formatters._date('%X');","        },","        /**","        Returns a date formatting function using the current locale.","","            {key: \"DOB\", formatter: \"localDateTime\"}","","        Anything that is not a date is returned unchanged.","","        Applies the CSS className `yui3-datatable-date` to the cell.","        @method localDateTime","        @return {Function} A formatter function that formats dates.","        @static","        **/","        localDateTime : function () {","            return Formatters._date('%c');","        },","","","        /**","        Returns a function that produces email links.","        If the column definition contains a property `linkFrom` it will use the value","        in that field for the link, otherwise, the same column value will be used for both","        link and text.","","            {key: \"contact\", formatter: \"email\", linkFrom: \"contactEmail\"}","","        It will use the respective `emptyCellValue` column configuration attribute","        for each of the value and the link if either is empty.","        If the link value is still empty, it will return the value with no link.","","        Applies the CSS className `yui3-datatable-email` to the cell.","        @method email","        @param col {Object} The column definition.","        @return {Function} A formatter function that adds a mailto: link to the value.","        @static","        **/","","        email: function (col) {","            var className = cName('email'),","                linkFrom = col.linkFrom,","                emptyValue = col.emptyCellValue,","                emptyLink = (this.getColumn(linkFrom) || {}).emptyCellValue;","            col.allowHTML = true;","            return function (o) {","                var value = stringValue(o.value, emptyValue),","                    link = (linkFrom ? stringValue(o.data[linkFrom], emptyLink) : value);","                o.className = className;","                if (link) {","                    return '<a href=\"mailto:' + link + '\">' + value + '</a>';","                }","                return value;","            };","","        },","","        /**","        Returns a function that produces links.","        If the column definition contains a property `linkFrom` it will use the value","        in that field for the link, otherwise, the same column value will be used for both","        link and text.","","            {key: \"company\", formatter: \"link\", linkFrom: \"webSite\"}","","        It will use the respective `emptyCellValue` column configuration attribute","        for each of the value and the link if either is empty.","        If the link value is still empty, it will return the value with no link.","","        Applies the CSS className `yui3-datatable-link` to the cell.","        @method link","        @param col {Object} The column definition.","        @return {Function} A formatter function that adds a link to the value.","        @static","        **/","","        link: function (col) {","            var className = cName('link'),","                linkFrom = col.linkFrom,","                emptyValue = col.emptyCellValue,","                emptyLink = (this.getColumn(linkFrom) || {}).emptyCellValue;","            col.allowHTML = true;","            return function (o) {","                var value = stringValue(o.value, emptyValue),","                    link = (linkFrom ? stringValue(o.data[linkFrom], emptyLink) : value);","                o.className = className;","                if (link) {","                    return '<a href=\"' + link + '\">' + value + '</a>';","                }","                return value;","            };","","        },","","       /**","       Returns a formatter function that formats values using","       the `Y.Number.format` method.","       It looks for the format to apply in the `numberFormat` property of the column","       or in the `numberFormat` attribute of the whole table.","","            {key: \"weight\", formatter: \"number\", numberFormat: {","                decimalPlaces:2,","                decimalSeparator: \",\",","                thousandsSeparator: \",\",","                suffix: \"kg\"","            }}","","       See <a href=\"Number.html#method_format\">Y.Number.format</a> for the available format specs.","","       Anything that cannot be parsed as a number will be returned unchanged.","","       Applies the CSS className `yui3-datatable-number` to the cell.","       @method number","       @param col {Object} The column definition.","       @return {Function} A formatter function that formats numerical data as currency.","       @static","       **/","        number: function (col) {","            var className = cName('number'),","                format = col.numberFormat || this.get('numberFormat'),","                fn = Y.Number.format;","            return function (o) {","                o.className = className;","                var value = parseFloat(o.value);","                if (!value && value !== 0) {","                    return o.value;","                }","                return fn(value, format);","            };","        }","","    };","","Y.mix(Y.DataTable.BodyView.Formatters, Formatters);","","","}, '@VERSION@', {\"requires\": [\"datatable-body\", \"datatype-number-format\", \"datatype-date-format\", \"escape\"]});"];
_yuitest_coverage["build/datatable-formatters/datatable-formatters.js"].lines = {"1":0,"10":0,"16":0,"19":0,"55":0,"57":0,"58":0,"59":0,"60":0,"90":0,"91":0,"92":0,"93":0,"94":0,"96":0,"97":0,"98":0,"126":0,"129":0,"130":0,"131":0,"132":0,"133":0,"135":0,"149":0,"151":0,"152":0,"153":0,"154":0,"175":0,"190":0,"205":0,"220":0,"244":0,"248":0,"249":0,"250":0,"252":0,"253":0,"254":0,"256":0,"281":0,"285":0,"286":0,"287":0,"289":0,"290":0,"291":0,"293":0,"322":0,"325":0,"326":0,"327":0,"328":0,"329":0,"331":0,"337":0};
_yuitest_coverage["build/datatable-formatters/datatable-formatters.js"].functions = {"cName:15":0,"stringValue:18":0,"(anonymous 2):58":0,"button:54":0,"(anonymous 3):91":0,"\'boolean\':89":0,"(anonymous 4):129":0,"currency:125":0,"(anonymous 5):152":0,"_date:148":0,"\'date\':174":0,"localDate:189":0,"localTime:204":0,"localDateTime:219":0,"(anonymous 6):249":0,"email:243":0,"(anonymous 7):286":0,"link:280":0,"(anonymous 8):325":0,"number:321":0,"(anonymous 1):1":0};
_yuitest_coverage["build/datatable-formatters/datatable-formatters.js"].coveredLines = 57;
_yuitest_coverage["build/datatable-formatters/datatable-formatters.js"].coveredFunctions = 21;
_yuitest_coverline("build/datatable-formatters/datatable-formatters.js", 1);
YUI.add('datatable-formatters', function (Y, NAME) {

/**
Adds predefined cell formatters to `Y.DataTable.BodyView`.

@module datatable
@submodule datatable-formatters
@since 3.8.0
**/
_yuitest_coverfunc("build/datatable-formatters/datatable-formatters.js", "(anonymous 1)", 1);
_yuitest_coverline("build/datatable-formatters/datatable-formatters.js", 10);
var Lang = Y.Lang,
    isValue = Lang.isValue,
    escape = Y.Escape.html,

    getCName = Y.ClassNameManager.getClassName,
    cName = function (name) {
        _yuitest_coverfunc("build/datatable-formatters/datatable-formatters.js", "cName", 15);
_yuitest_coverline("build/datatable-formatters/datatable-formatters.js", 16);
return getCName('datatable', name);
    },
    stringValue = function (value, def) {
        _yuitest_coverfunc("build/datatable-formatters/datatable-formatters.js", "stringValue", 18);
_yuitest_coverline("build/datatable-formatters/datatable-formatters.js", 19);
return (isValue(value) ? escape(value.toString()) : def || '');
    },
    /**
    Registry of function producing cell formatting functions.
    Allows for names to be used in the column
    definition `formatter` property:

        {key:"myColumn", formatter:"date"}

    These functions are not meant to be used directly.  Instead, they will be
    automatically called when their names are used as values for the `formatter`
    property in a columnd definition.
    They will be called just once per rendering cycle and will receive
    the column configuration.  They are expected to return a function that will
    then be called once per row and will do the actual formatting.
    They are expected to do all the preparatory once-per-render work
    so that the actual formatting function doesn't need to repeat it.

    @class DataTable.BodyView.Formatters
    @since 3.8.0
    **/
    Formatters = {

        /**
        Returns a formatter that produces a BUTTON element using the value of
        the `buttonLabel` column definition attribute as its label or the text
        `Click` if not found.

        Applies the CSS className `yui3-datatable-button` to the cell.

        @method button
        @param col {Object} The column definition.
        @return {Function} A formatter function that produces a `<button>` element.
        @static
        **/
       button: function (col) {
           _yuitest_coverfunc("build/datatable-formatters/datatable-formatters.js", "button", 54);
_yuitest_coverline("build/datatable-formatters/datatable-formatters.js", 55);
var className = cName('button'),
               html = '<button>' + (col.buttonLabel || 'Click') + '</button>';
           _yuitest_coverline("build/datatable-formatters/datatable-formatters.js", 57);
col.allowHTML = true;
           _yuitest_coverline("build/datatable-formatters/datatable-formatters.js", 58);
return function(o) {
               _yuitest_coverfunc("build/datatable-formatters/datatable-formatters.js", "(anonymous 2)", 58);
_yuitest_coverline("build/datatable-formatters/datatable-formatters.js", 59);
o.className = className;
               _yuitest_coverline("build/datatable-formatters/datatable-formatters.js", 60);
return html;

           };
       },

       /**
       Returns a formatter function that returns the texts `"true"` or `"false"`
       and assigns the CSS classNames `yui3-datatable-true` or `yui3-datatable-false`
       based on the value of the cell.

       If either a `booleanLabels` configuration object is defined for the column
       or a `booleanLabels` configuration attribute is defined for the datatable,
       the formatter will use the values for the properties `true` or `false`
       of either of those objects as the text to show.

       It returns `null`s or `undefined`s unchanged so that the `emptyCellValue`
       configuration attribute will eventually apply.

            {key:"active", formatter: "boolean", booleanLabels: {
                "true": "yes",
                "false": "no"
            }}


       @method boolean
       @param col {Object} The column definition.
       @return {Function} A formatter function that formats boolean data.
       @static
       **/
       'boolean': function (col) {
            _yuitest_coverfunc("build/datatable-formatters/datatable-formatters.js", "\'boolean\'", 89);
_yuitest_coverline("build/datatable-formatters/datatable-formatters.js", 90);
var labels = col.booleanLabels || this.get('booleanLabels') || {'true':'true', 'false':'false'};
            _yuitest_coverline("build/datatable-formatters/datatable-formatters.js", 91);
return function(o) {
                _yuitest_coverfunc("build/datatable-formatters/datatable-formatters.js", "(anonymous 3)", 91);
_yuitest_coverline("build/datatable-formatters/datatable-formatters.js", 92);
var value = o.value;
                _yuitest_coverline("build/datatable-formatters/datatable-formatters.js", 93);
if (!value && value !== false) {
                    _yuitest_coverline("build/datatable-formatters/datatable-formatters.js", 94);
return value;
                }
                _yuitest_coverline("build/datatable-formatters/datatable-formatters.js", 96);
value = value?'true':'false';
                _yuitest_coverline("build/datatable-formatters/datatable-formatters.js", 97);
o.className = cName(value);
                _yuitest_coverline("build/datatable-formatters/datatable-formatters.js", 98);
return labels[value];
            };
       },

       /**
       Returns a formatter function that formats values as currency using
       the `Y.Number.format` method.
       It looks for the format to apply in the `currencyFormat` property of the column
       or in the `currencyFormat` attribute of the whole table.

           {key: "amount", formatter: "currency", currencyFormat: {
               decimalPlaces:2,
               decimalSeparator: ",",
               thousandsSeparator: ".",
               suffix: "&euro;"
           }}

       See <a href="Number.html#method_format">Y.Number.format</a> for the available format specs.

       Anything that cannot be parsed as a number will be returned unchanged.

       Applies the CSS className `yui3-datatable-currency` to the cell.
       @method currency
       @param col {Object} The column definition.
       @return {Function} A formatter function that formats numerical data as currency.
       @static
       **/
        currency: function (col) {
            _yuitest_coverfunc("build/datatable-formatters/datatable-formatters.js", "currency", 125);
_yuitest_coverline("build/datatable-formatters/datatable-formatters.js", 126);
var className = cName('currency'),
                format = col.currencyFormat || this.get('currencyFormat'),
                fn = Y.Number.format;
            _yuitest_coverline("build/datatable-formatters/datatable-formatters.js", 129);
return function (o) {
                _yuitest_coverfunc("build/datatable-formatters/datatable-formatters.js", "(anonymous 4)", 129);
_yuitest_coverline("build/datatable-formatters/datatable-formatters.js", 130);
o.className = className;
                _yuitest_coverline("build/datatable-formatters/datatable-formatters.js", 131);
var value = parseFloat(o.value);
                _yuitest_coverline("build/datatable-formatters/datatable-formatters.js", 132);
if (!value && value !== 0) {
                    _yuitest_coverline("build/datatable-formatters/datatable-formatters.js", 133);
return o.value;
                }
                _yuitest_coverline("build/datatable-formatters/datatable-formatters.js", 135);
return fn(value, format);
            };
        },


        /**
        Returns a date formatting function based on the given format.
        @method _date
       @param format {String} The format spec definition.
       @return {Function} A formatter function that formats numerical data as currency.
        @private
        @static
        **/
        _date: function (format) {
            _yuitest_coverfunc("build/datatable-formatters/datatable-formatters.js", "_date", 148);
_yuitest_coverline("build/datatable-formatters/datatable-formatters.js", 149);
var className = cName('date'),
                fn = Y.Date.format;
            _yuitest_coverline("build/datatable-formatters/datatable-formatters.js", 151);
format = {format: format};
            _yuitest_coverline("build/datatable-formatters/datatable-formatters.js", 152);
return function (o) {
                _yuitest_coverfunc("build/datatable-formatters/datatable-formatters.js", "(anonymous 5)", 152);
_yuitest_coverline("build/datatable-formatters/datatable-formatters.js", 153);
o.className = className;
                _yuitest_coverline("build/datatable-formatters/datatable-formatters.js", 154);
return fn(o.value, format);
            };
        },
        /**
        Returns a date formatting function.
        It looks for the format to apply in the `dateFormat` property of the column
        or in the `dateFormat` attribute of the whole table.

            {key: "DOB", formatter: "date", dateFormat: "%I:%M:%S %p"}

        See <a href="Date.html#method_format">Y.Date.format</a> for the available format specs.

        Anything that is not a date is returned unchanged.

        Applies the CSS className `yui3-datatable-date` to the cell.
        @method date
        @param col {Object} The column definition.
        @return {Function} A formatter function that formats dates.
        @static
        **/
        'date' : function (col) {
            _yuitest_coverfunc("build/datatable-formatters/datatable-formatters.js", "\'date\'", 174);
_yuitest_coverline("build/datatable-formatters/datatable-formatters.js", 175);
return Formatters._date(col.dateFormat || this.get('dateFormat'));
        },
        /**
        Returns a date-only (no time part) formatting function using the current locale.

            {key: "DOB", formatter: "localDate"}

        Anything that is not a date is returned unchanged.

        Applies the CSS className `yui3-datatable-date` to the cell.
        @method localDate
        @return {Function} A formatter function that formats dates.
        @static
        **/
        localDate : function () {
            _yuitest_coverfunc("build/datatable-formatters/datatable-formatters.js", "localDate", 189);
_yuitest_coverline("build/datatable-formatters/datatable-formatters.js", 190);
return Formatters._date('%x');
        },
        /**
        Returns a time-only (no date part) formatting function using the current locale.

            {key: "startTime", formatter: "localTime"}

        Anything that is not a date is returned unchanged.

        Applies the CSS className `yui3-datatable-date` to the cell.
        @method localTime
        @return {Function} A formatter function that formats dates.
        @static
        **/
        localTime : function () {
            _yuitest_coverfunc("build/datatable-formatters/datatable-formatters.js", "localTime", 204);
_yuitest_coverline("build/datatable-formatters/datatable-formatters.js", 205);
return Formatters._date('%X');
        },
        /**
        Returns a date formatting function using the current locale.

            {key: "DOB", formatter: "localDateTime"}

        Anything that is not a date is returned unchanged.

        Applies the CSS className `yui3-datatable-date` to the cell.
        @method localDateTime
        @return {Function} A formatter function that formats dates.
        @static
        **/
        localDateTime : function () {
            _yuitest_coverfunc("build/datatable-formatters/datatable-formatters.js", "localDateTime", 219);
_yuitest_coverline("build/datatable-formatters/datatable-formatters.js", 220);
return Formatters._date('%c');
        },


        /**
        Returns a function that produces email links.
        If the column definition contains a property `linkFrom` it will use the value
        in that field for the link, otherwise, the same column value will be used for both
        link and text.

            {key: "contact", formatter: "email", linkFrom: "contactEmail"}

        It will use the respective `emptyCellValue` column configuration attribute
        for each of the value and the link if either is empty.
        If the link value is still empty, it will return the value with no link.

        Applies the CSS className `yui3-datatable-email` to the cell.
        @method email
        @param col {Object} The column definition.
        @return {Function} A formatter function that adds a mailto: link to the value.
        @static
        **/

        email: function (col) {
            _yuitest_coverfunc("build/datatable-formatters/datatable-formatters.js", "email", 243);
_yuitest_coverline("build/datatable-formatters/datatable-formatters.js", 244);
var className = cName('email'),
                linkFrom = col.linkFrom,
                emptyValue = col.emptyCellValue,
                emptyLink = (this.getColumn(linkFrom) || {}).emptyCellValue;
            _yuitest_coverline("build/datatable-formatters/datatable-formatters.js", 248);
col.allowHTML = true;
            _yuitest_coverline("build/datatable-formatters/datatable-formatters.js", 249);
return function (o) {
                _yuitest_coverfunc("build/datatable-formatters/datatable-formatters.js", "(anonymous 6)", 249);
_yuitest_coverline("build/datatable-formatters/datatable-formatters.js", 250);
var value = stringValue(o.value, emptyValue),
                    link = (linkFrom ? stringValue(o.data[linkFrom], emptyLink) : value);
                _yuitest_coverline("build/datatable-formatters/datatable-formatters.js", 252);
o.className = className;
                _yuitest_coverline("build/datatable-formatters/datatable-formatters.js", 253);
if (link) {
                    _yuitest_coverline("build/datatable-formatters/datatable-formatters.js", 254);
return '<a href="mailto:' + link + '">' + value + '</a>';
                }
                _yuitest_coverline("build/datatable-formatters/datatable-formatters.js", 256);
return value;
            };

        },

        /**
        Returns a function that produces links.
        If the column definition contains a property `linkFrom` it will use the value
        in that field for the link, otherwise, the same column value will be used for both
        link and text.

            {key: "company", formatter: "link", linkFrom: "webSite"}

        It will use the respective `emptyCellValue` column configuration attribute
        for each of the value and the link if either is empty.
        If the link value is still empty, it will return the value with no link.

        Applies the CSS className `yui3-datatable-link` to the cell.
        @method link
        @param col {Object} The column definition.
        @return {Function} A formatter function that adds a link to the value.
        @static
        **/

        link: function (col) {
            _yuitest_coverfunc("build/datatable-formatters/datatable-formatters.js", "link", 280);
_yuitest_coverline("build/datatable-formatters/datatable-formatters.js", 281);
var className = cName('link'),
                linkFrom = col.linkFrom,
                emptyValue = col.emptyCellValue,
                emptyLink = (this.getColumn(linkFrom) || {}).emptyCellValue;
            _yuitest_coverline("build/datatable-formatters/datatable-formatters.js", 285);
col.allowHTML = true;
            _yuitest_coverline("build/datatable-formatters/datatable-formatters.js", 286);
return function (o) {
                _yuitest_coverfunc("build/datatable-formatters/datatable-formatters.js", "(anonymous 7)", 286);
_yuitest_coverline("build/datatable-formatters/datatable-formatters.js", 287);
var value = stringValue(o.value, emptyValue),
                    link = (linkFrom ? stringValue(o.data[linkFrom], emptyLink) : value);
                _yuitest_coverline("build/datatable-formatters/datatable-formatters.js", 289);
o.className = className;
                _yuitest_coverline("build/datatable-formatters/datatable-formatters.js", 290);
if (link) {
                    _yuitest_coverline("build/datatable-formatters/datatable-formatters.js", 291);
return '<a href="' + link + '">' + value + '</a>';
                }
                _yuitest_coverline("build/datatable-formatters/datatable-formatters.js", 293);
return value;
            };

        },

       /**
       Returns a formatter function that formats values using
       the `Y.Number.format` method.
       It looks for the format to apply in the `numberFormat` property of the column
       or in the `numberFormat` attribute of the whole table.

            {key: "weight", formatter: "number", numberFormat: {
                decimalPlaces:2,
                decimalSeparator: ",",
                thousandsSeparator: ",",
                suffix: "kg"
            }}

       See <a href="Number.html#method_format">Y.Number.format</a> for the available format specs.

       Anything that cannot be parsed as a number will be returned unchanged.

       Applies the CSS className `yui3-datatable-number` to the cell.
       @method number
       @param col {Object} The column definition.
       @return {Function} A formatter function that formats numerical data as currency.
       @static
       **/
        number: function (col) {
            _yuitest_coverfunc("build/datatable-formatters/datatable-formatters.js", "number", 321);
_yuitest_coverline("build/datatable-formatters/datatable-formatters.js", 322);
var className = cName('number'),
                format = col.numberFormat || this.get('numberFormat'),
                fn = Y.Number.format;
            _yuitest_coverline("build/datatable-formatters/datatable-formatters.js", 325);
return function (o) {
                _yuitest_coverfunc("build/datatable-formatters/datatable-formatters.js", "(anonymous 8)", 325);
_yuitest_coverline("build/datatable-formatters/datatable-formatters.js", 326);
o.className = className;
                _yuitest_coverline("build/datatable-formatters/datatable-formatters.js", 327);
var value = parseFloat(o.value);
                _yuitest_coverline("build/datatable-formatters/datatable-formatters.js", 328);
if (!value && value !== 0) {
                    _yuitest_coverline("build/datatable-formatters/datatable-formatters.js", 329);
return o.value;
                }
                _yuitest_coverline("build/datatable-formatters/datatable-formatters.js", 331);
return fn(value, format);
            };
        }

    };

_yuitest_coverline("build/datatable-formatters/datatable-formatters.js", 337);
Y.mix(Y.DataTable.BodyView.Formatters, Formatters);


}, '@VERSION@', {"requires": ["datatable-body", "datatype-number-format", "datatype-date-format", "escape"]});
