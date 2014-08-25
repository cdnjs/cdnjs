YUI.add('datatable-formatters', function (Y, NAME) {

/**
Adds predefined cell formatters to `Y.DataTable.BodyView`.

@module datatable-formatters
@since 3.8.0
**/
var Lang = Y.Lang,
    isValue = Lang.isValue,
    escape = Y.Escape.html,

    getCName = Y.ClassNameManager.getClassName,
    cName = function (name) {
        return getCName('datatable', name);
    },
    stringValue = function (value, def) {
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
           var className = cName('button'),
               html = '<button>' + (col.buttonLabel || 'Click') + '</button>';
           col.allowHTML = true;
           return function(o) {
               o.className = className;
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
            var labels = col.booleanLabels || this.get('booleanLabels') || {'true':'true', 'false':'false'};
            return function(o) {
                var value = o.value;
                if (!value && value !== false) {
                    return value;
                }
                value = value?'true':'false';
                o.className = cName(value);
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
            var className = cName('currency'),
                format = col.currencyFormat || this.get('currencyFormat'),
                fn = Y.Number.format;
            return function (o) {
                o.className = className;
                var value = parseFloat(o.value);
                if (!value && value !== 0) {
                    return o.value;
                }
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
            var className = cName('date'),
                fn = Y.Date.format;
            format = {format: format};
            return function (o) {
                o.className = className;
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
            var className = cName('email'),
                linkFrom = col.linkFrom,
                emptyValue = col.emptyCellValue,
                emptyLink = (this.getColumn(linkFrom) || {}).emptyCellValue;
            col.allowHTML = true;
            return function (o) {
                var value = stringValue(o.value, emptyValue),
                    link = (linkFrom ? stringValue(o.data[linkFrom], emptyLink) : value);
                o.className = className;
                if (link) {
                    return '<a href="mailto:' + link + '">' + value + '</a>';
                }
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
            var className = cName('link'),
                linkFrom = col.linkFrom,
                emptyValue = col.emptyCellValue,
                emptyLink = (this.getColumn(linkFrom) || {}).emptyCellValue;
            col.allowHTML = true;
            return function (o) {
                var value = stringValue(o.value, emptyValue),
                    link = (linkFrom ? stringValue(o.data[linkFrom], emptyLink) : value);
                o.className = className;
                if (link) {
                    return '<a href="' + link + '">' + value + '</a>';
                }
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
            var className = cName('number'),
                format = col.numberFormat || this.get('numberFormat'),
                fn = Y.Number.format;
            return function (o) {
                o.className = className;
                var value = parseFloat(o.value);
                if (!value && value !== 0) {
                    return o.value;
                }
                return fn(value, format);
            };
        },
        /**
        Returns a formatter function that returns texts from a lookup table
        based on the stored value.

        It looks for the translation to apply in the `lookupTable` property of the
        column in either of these two formats:

            {key: "status", formatter: "lookup", lookupTable: {
                0: "unknown",
                1: "requested",
                2: "approved",
                3: "delivered"
            }},
            {key: "otherStatus", formatter: "lookup", lookupTable: [
                {value:0, text: "unknown"},
                {value:1, text: "requested"},
                {value:2, text: "approved"},
                {value:3, text: "delivered"}
            ]}

        Applies the CSS className `yui3-datatable-lookup` to the cell.

        @method lookup
        @param col {Object} The column definition
        @return {Function} A formatter function that returns the `text`
                associated with `value`.
        @static
         */
        lookup: function (col) {
            var className = cName('lookup'),
                lookup = col.lookupTable || {},
                entries, i, len;

            if (Lang.isArray(lookup)) {
                entries = lookup;
                lookup = {};

                for (i = 0, len = entries.length; i < len; ++i) {
                    lookup[entries[i].value] = entries[i].text;
                }
            }
            return function (o) {
                o.className = className;
                return lookup[o.value];
            };
        }
    };

Y.mix(Y.DataTable.BodyView.Formatters, Formatters);


}, '@VERSION@', {"requires": ["datatable-body", "datatype-number-format", "datatype-date-format", "escape"]});
