/*
YUI 3.15.0 (build 834026e)
Copyright 2014 Yahoo! Inc. All rights reserved.
Licensed under the BSD License.
http://yuilibrary.com/license/
*/

YUI.add('datatable-highlight', function (Y, NAME) {

/**
 Adds support for highlighting columns with the mouse in a DataTable

 @module datatable
 @submodule datatable-highlight
 @since 3.13.0
 */


var getClassName = Y.ClassNameManager.getClassName;

/**
 @class DataTable.Highlight
 @since 3.13.0
 */
function Highlight() {}

Highlight.ATTRS = {
    /**
     Setting this to true will create a delegate on the DataTable adding the
     default classname to the row when the mouse is over the row.

     @attribute highlightRows
     @default false
     @since 3.13.0
     */
    highlightRows: {
        value: false,
        setter: '_setHighlightRows',
        validator: Y.Lang.isBoolean
    },

    /**
     Setting this to true will create a delegate on the DataTable adding the
     default classname to the column when the mouse is over the column.

     @attribute highlightCols
     @default false
     @since 3.13.0
     */
    highlightCols: {
        value: false,
        setter: '_setHighlightCols',
        validator: Y.Lang.isBoolean
    },

    /**
     Setting this to true will create a delegate on the DataTable adding the
     default classname to the cell when the mouse is over it.

     @attribute highlightCells
     @default false
     @since 3.13.0
     */
    highlightCells: {
        value: false,
        setter: '_setHighlightCells',
        validator: Y.Lang.isBoolean
    }
};


Highlight.prototype = {

    /**
     An object consisting of classnames for a `row`, a `col` and a `cell` to
     be applied to their respective objects when the user moves the mouse over
     the item and the attribute is set to true.

     @public
     @property highlightClassNames
     @type Object
     @since 3.13.0
     */
    highlightClassNames: {
        row: getClassName(NAME, 'row'),
        col: getClassName(NAME, 'col'),
        cell: getClassName(NAME, 'cell')
    },

    /**
     A string that is used to create a column selector when the column is has
     the mouse over it. Can contain the css prefix (`{prefix}`) and the column
     name (`{col}`). Further substitution will require `_highlightCol` to be
     overwritten.

     @protected
     @property _colSelector
     @type String
     @since 3.13.0
     */
    _colSelector: '.{prefix}-data .{prefix}-col-{col}',

    /**
     A string that will be used to create Regular Expression when column
     highlighting is set to true. Uses the css prefix (`{prefix}`) from the
     DataTable object to populate.

     @protected
     @property _colNameRegex
     @type String
     @since 3.13.0
     */
    _colNameRegex: '{prefix}-col-(\\S*)',

    /**
     This object will contain any delegates created when their feature is
     turned on.

     @protected
     @property _highlightDelegates
     @type Object
     @since 3.13.0
     */
    _highlightDelegates: {},

    /**
     Default setter method for row highlighting. If the value is true, a
     delegate is created and stored in `this._highlightDelegates.row`. This
     delegate will add/remove the row highlight classname to/from the row when
     the mouse enters/leaves a row on the `tbody`

     @protected
     @method _setHighlightRows
     @param {Boolean} val
     @return val
     @since 3.13.0
     */
    _setHighlightRows: function (val) {
        var del = this._highlightDelegates;

        if (del.row) {
            del.row.detach();
        }

        if (val === true) {
            del.row = this.delegate('hover',
                Y.bind(this._highlightRow, this),
                Y.bind(this._highlightRow, this),
            "tbody tr");
        }

        return val;
    },

    /**
     Default setter method for column highlighting. If the value is true, a
     delegate is created and stored in `this._highlightDelegates.col`. This
     delegate will add/remove the column highlight classname to/from the
     column when the mouse enters/leaves a column on the `tbody`

     @protected
     @method _setHighlightCols
     @param {Boolean} val
     @return val
     @since 3.13.0
     */
    _setHighlightCols: function (val) {
        var del = this._highlightDelegates;

        if (del.col) {
            del.col.detach();
        }

        if (val === true) {
            this._buildColSelRegex();

            del.col = this.delegate('hover',
                Y.bind(this._highlightCol, this),
                Y.bind(this._highlightCol, this),
            "tr td");
        }
    },

    /**
     Default setter method for cell highlighting. If the value is true, a
     delegate is created and stored in `this._highlightDelegates.cell`. This
     delegate will add/remove the cell highlight classname to/from the cell
     when the mouse enters/leaves a cell on the `tbody`

     @protected
     @method _setHighlightCells
     @param {Boolean} val
     @return val
     @since 3.13.0
     */
    _setHighlightCells: function (val) {
        var del = this._highlightDelegates;

        if (del.cell) {
            del.cell.detach();
        }

        if (val === true) {

            del.cell = this.delegate('hover',
                Y.bind(this._highlightCell, this),
                Y.bind(this._highlightCell, this),
            "tbody td");
        }

        return val;
    },

    /**
     Method called to turn on or off the row highlighting when the mouse
     enters or leaves the row. This is determined by the event phase of the
     hover event. Where `over` will turn on the highlighting and anything else
     will turn it off.

     @protected
     @method _highlightRow
     @param {EventFacade} e Event from the hover event
     @since 3.13.0
     */
    _highlightRow: function (e) {
        e.currentTarget.toggleClass(this.highlightClassNames.row, (e.phase === 'over'));
    },

    /**
     Method called to turn on or off the column highlighting when the mouse
     enters or leaves the column. This is determined by the event phase of the
     hover event. Where `over` will turn on the highlighting and anything else
     will turn it off.

     @protected
     @method _highlightCol
     @param {EventFacade} e Event from the hover event
     @since 3.13.0
     */
    _highlightCol: function(e) {
        var colName = this._colNameRegex.exec(e.currentTarget.getAttribute('class')),
            selector = Y.Lang.sub(this._colSelector, {
                prefix: this._cssPrefix,
                col: colName[1]
            });

        this.view.tableNode.all(selector).toggleClass(this.highlightClassNames.col, (e.phase === 'over'));
    },

    /**
     Method called to turn on or off the cell highlighting when the mouse
     enters or leaves the cell. This is determined by the event phase of the
     hover event. Where `over` will turn on the highlighting and anything else
     will turn it off.

     @protected
     @method _highlightCell
     @param {EventFacade} e Event from the hover event
     @since 3.13.0
     */
    _highlightCell: function(e) {
        e.currentTarget.toggleClass(this.highlightClassNames.cell, (e.phase === 'over'));
    },

    /**
     Used to transform the `_colNameRegex` to a Regular Expression when the
     column highlighting is initially turned on. If `_colNameRegex` is not a
     string when this method is called, no action is taken.

     @protected
     @method _buildColSelRegex
     @since 3.13.0
     */
    _buildColSelRegex: function () {
        var str = this._colNameRegex,
            regex;

        if (typeof str === 'string') {
            this._colNameRegex = new RegExp(Y.Lang.sub(str, { prefix: this._cssPrefix }));
        }
    }
};

Y.DataTable.Highlight = Highlight;

Y.Base.mix(Y.DataTable, [Y.DataTable.Highlight]);


}, '3.15.0', {"requires": ["datatable-base", "event-hover"], "skinnable": true});
