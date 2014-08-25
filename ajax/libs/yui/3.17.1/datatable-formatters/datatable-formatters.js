/*
YUI 3.17.1 (build 0eb5a52)
Copyright 2014 Yahoo! Inc. All rights reserved.
Licensed under the BSD License.
http://yuilibrary.com/license/
*/

YUI.add('datatable-formatters', function (Y, NAME) {

/**
Adds predefined cell formatters to `Y.DataTable.BodyView`.

@module datatable-formatters
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
    **/
    Formatters = {

        /**
        Returns a formatter that produces a BUTTON element using the value of
        the [buttonLabel](DataTable.Column.html#property_buttonLabel)
        column definition attribute as its label or the text
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

       If either a [booleanLabels](DataTable.Column.html#property_booleanLabels)
        configuration object is defined for the column
       or a [booleanLabels](DataTable.html#attr_booleanLabels)
       configuration attribute is defined for the datatable,
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
       the [Number.format](Number.html#method_format) method.
       It looks for the format to apply in the
       [currencyFormat](DataTable.Column.html#property_currencyFormat) property
       of the column or in the
       [currencyFormat](DataTable.html#attr_currencyFormat)
        attribute of the whole table.

           {key: "amount", formatter: "currency", currencyFormat: {
               decimalPlaces:2,
               decimalSeparator: ",",
               thousandsSeparator: ".",
               suffix: "&euro;"
           }}

       See [Number.format](Number.html#method_format) for the available format specs.

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
        It looks for the format to apply in the
        [dateFormat](DataTable.Column.html#property_dateFormat)
        property of the column or in the
        [dateFormat](DataTable.html#attr_dateFormat)
         attribute of the whole table.

            {key: "DOB", formatter: "date", dateFormat: "%I:%M:%S %p"}

        See [Date.format](Date.html#method_format) for the available format specs.

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
        If the column definition contains a property
        [linkFrom](DataTable.Column.html#property_linkFrom) it will use the value
        in that field for the link, otherwise, the same column value will be used for both
        link and text.

            {key: "contact", formatter: "email", linkFrom: "contactEmail"}

        It will use the respective
        [emptyCellValue](DataTable.Column.html#property_emptyCellValue)
        column configuration attribute
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
        If the column definition contains a property
        [linkFrom](DataTable.Column.html#property_linkFrom) it will use the value
        in that field for the link, otherwise, the same column value will be used for both
        link and text.

            {key: "company", formatter: "link", linkFrom: "webSite"}

        It will use the respective
        [emptyCellValue](DataTable.Column.html#property_emptyCellValue)
         column configuration attribute
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
       the [Number.format](Number.html#method_format) method.
       It looks for the format to apply in the
       [numberFormat](DataTable.Column.html#property_numberFormat)
       property of the column or in the
       [numberFormat](DataTable.html#attr_numberFormat)
       attribute of the whole table.

            {key: "weight", formatter: "number", numberFormat: {
                decimalPlaces:2,
                decimalSeparator: ",",
                thousandsSeparator: ",",
                suffix: "kg"
            }}

       See [Number.format](Number.html#method_format) for the available format specs.

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

        It looks for the translation to apply in the
        [lookupTable](DataTable.Column.html#property_lookupTable) property of the
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
/**
 Label to be shown in the face of a button produced by the
 [button](DataTable.BodyView.Formatters.html#method_button) formatter

 @property buttonLabel
 @type String
 @for DataTable.Column
 */
/**
Determines the texts to be shown to represent Boolean values when the
[boolean](DataTable.BodyView.Formatters.html#method_boolean) formatter
is used.

The attribute is an object with text values for properties `true` and `false`.

    {key:"active", formatter: "boolean", booleanLabels: {
        "true": "yes",
        "false": "no"
    }}

@property booleanLabels
@type Object
@for DataTable.Column
*/

/**
 Determines the texts to be shown to represent Boolean values when the
 [boolean](DataTable.BodyView.Formatters.html#method_boolean) formatter
 is used on any column.

 It works like the column-specific
 [booleanLabels](DataTable.Column.html#property_booleanLabels) but
 for all columns using the
 [boolean](DataTable.BodyView.Formatters.html#method_boolean) formatter at once.
 The values are often retrieved from a resource of localized texts.

@attribute booleanLabels
@type Object
@for DataTable
*/
/**
Format specification for columns using the
[currency](DataTable.BodyView.Formatters.html#method_currency) formatter.
It contains an object as described in
[Number.format](Number.html#method_format).

@property currencyFormat
@type Object
@for DataTable.Column
 */
/**
Format specification for columns using the
[currency](DataTable.BodyView.Formatters.html#method_currency) formatter.
It contains an object as described in
[Number.format](Number.html#method_format).

It is similar to
[currencyFormat](DataTable.Column.html#property_currencyFormat)
but it applies to any column using the
[currency](DataTable.BodyView.Formatters.html#method_currency) formatter.
 The values are often retrieved from a resource of localized configuration.

@attribute currencyFormat
@type Object
@for DataTable
 */

/**
Format specification for columns using the
[date](DataTable.BodyView.Formatters.html#method_date) formatter.
It contains a string as described in
[Date.format](Date.html#method_format).

@property dateFormat
@type String
@for DataTable.Column
 */
/**
Format specification for columns using the
[date](DataTable.BodyView.Formatters.html#method_date) formatter.
It contains an object as described in
[Date.format](Date.html#method_format).

It is similar to
[dateFormat](DataTable.Column.html#property_dateFormat)
but it applies to any column using the
[date](DataTable.BodyView.Formatters.html#method_date) formatter.
 The values are often retrieved from a resource of localized configuration.

@attribute dateFormat
@type String
@for DataTable
 */
/**
 Name of the field that is to provide the link for a column using the
 [email](DataTable.BodyView.Formatters.html#method_email) or
 [link](DataTable.BodyView.Formatters.html#method_link)
 formatters.

 @property linkFrom
 @type String
 @for DataTable.Column
 */

/**
Format specification for columns using the
[number](DataTable.BodyView.Formatters.html#method_number) formatter.
It contains an object as described in
[Number.format](Number.html#method_format).

@property numberFormat
@type Object
@for DataTable.Column
 */
/**
Format specification for columns using the
[number](DataTable.BodyView.Formatters.html#method_number) formatter.
It contains an object as described in
[Number.format](Number.html#method_format).

It is similar to
[numberFormat](DataTable.Column.html#property_numberFormat)
but it applies to any column using the
[number](DataTable.BodyView.Formatters.html#method_number) formatter.
 The values are often retrieved from a resource of localized configuration.

@attribute numberFormat
@type Object
@for DataTable
 */
/**
Map of values to text used to translate internal values to human readable text
in columns using the [lookup](DataTable.BodyView.Formatters.html#method_lookup)
formatter.

The map can be given in either of two formats:

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

The last format is compatible with the [dropdown](DataTable.Editors.html#property_dropdown)
and autocomplete-based editors, where the order of the items in the dropdown matters.

@property lookupTable
@type Object || Array
@for DataTable.Column
 */

}, '3.17.1', {"requires": ["datatable-body", "datatype-number-format", "datatype-date-format", "escape"]});
