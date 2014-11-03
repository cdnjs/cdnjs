/*
YUI 3.15.0 (build 834026e)
Copyright 2014 Yahoo! Inc. All rights reserved.
Licensed under the BSD License.
http://yuilibrary.com/license/
*/

YUI.add('datatable-keynav', function (Y, NAME) {

/**
 Provides keyboard navigation of DataTable cells and support for adding other
 keyboard actions.

 @module datatable
 @submodule datatable-keynav
*/
var arrEach = Y.Array.each,

/**
 A DataTable class extension that provides navigation via keyboard, based on
 WAI-ARIA recommendation for the [Grid widget](http://www.w3.org/WAI/PF/aria-practices/#grid)
 and extensible to support other actions.


 @class DataTable.KeyNav
 @for DataTable
*/
    DtKeyNav = function (){};

/**
Mapping of key codes to friendly key names that can be used in the
[keyActions](#property_keyActions) property and [ARIA_ACTIONS](#property_ARIA_ACTIONS)
property.

It contains aliases for the following keys:
    <ul>
    <li>backspace</li>
    <li>tab</li>
    <li>enter</li>
    <li>esc</li>
    <li>space</li>
    <li>pgup</li>
    <li>pgdown</li>
    <li>end</li>
    <li>home</li>
    <li>left</li>
    <li>up</li>
    <li>right</li>
    <li>down</li>
    <li>f1 .. f12</li>
    </ul>


@property KEY_NAMES
@type {Object}
@static
**/
DtKeyNav.KEY_NAMES = {
     8: 'backspace',
     9: 'tab',
    13: 'enter',
    27: 'esc',
    32: 'space',
    33: 'pgup',
    34: 'pgdown',
    35: 'end',
    36: 'home',
    37: 'left',
    38: 'up',
    39: 'right',
    40: 'down',
    112:'f1',
    113:'f2',
    114:'f3',
    115:'f4',
    116:'f5',
    117:'f6',
    118:'f7',
    119:'f8',
    120:'f9',
    121:'f10',
    122:'f11',
    123:'f12'
};

/**
Mapping of key codes to actions according to the WAI-ARIA suggestion for the
[Grid Widget](http://www.w3.org/WAI/PF/aria-practices/#grid).

The key for each entry is a key-code or [keyName](#property_KEY_NAMES) while the
value can be a function that performs the action or a string.  If a string,
it can either correspond to the name of a method in this module (or  any
method in a DataTable instance) or the name of an event to fire.
@property ARIA_ACTIONS
@type Object
@static
 */
DtKeyNav.ARIA_ACTIONS = {
    left:   '_keyMoveLeft',
    right:  '_keyMoveRight',
    up:     '_keyMoveUp',
    down:   '_keyMoveDown',
    home:   '_keyMoveRowStart',
    end:    '_keyMoveRowEnd',
    pgup:   '_keyMoveColTop',
    pgdown: '_keyMoveColBottom'
};

DtKeyNav.ATTRS = {
    /**
    Cell that's currently either focused or
    focusable when the DataTable gets the focus.

    @attribute focusedCell
    @type Node
    @default first cell in the table.
    **/
    focusedCell: {
        setter: '_focusedCellSetter'
    },

    /**
    Determines whether it is possible to navigate into the header area.
    The examples referenced in the document show both behaviors so it seems
    it is optional.

    @attribute keyIntoHeaders
    @type Boolean
    @default true
     */
    keyIntoHeaders: {
        value: true
    }

};

Y.mix( DtKeyNav.prototype, {

    /**
    Table of actions to be performed for each key.  It is loaded with a clone
    of [ARIA_ACTIONS](#property_ARIA_ACTIONS) by default.

    The key for each entry is either a key-code or an alias from the
    [KEY_NAMES](#property_KEY_NAMES) table. They can be prefixed with any combination
    of the modifier keys `alt`, `ctrl`, `meta` or `shift` each followed by a hyphen,
    such as `"ctrl-shift-up"` (modifiers, if more than one, should appear in alphabetical order).

    The value for each entry should be a function or the name of a method in
    the DataTable instance.  The method will receive the original keyboard
    EventFacade as its only argument.

    If the value is a string and it cannot be resolved into a method,
    it will be assumed to be the name of an event to fire. The listener for that
    event will receive an EventFacade containing references to the cell that has the focus,
    the row, column and, unless it is a header row, the record it corresponds to.
    The second argument will be the original EventFacade for the keyboard event.

     @property keyActions
     @type {Object}
     @default Y.DataTable.keyNav.ARIA_ACTIONS
     */

    keyActions: null,

    /**
    Array containing the event handles to any event that might need to be detached
    on destruction.
    @property _keyNavSubscr
    @type Array
    @default null,
    @private
     */
    _keyNavSubscr: null,

    /**
    Reference to the THead section that holds the headers for the datatable.
    For a Scrolling DataTable, it is the one visible to the user.
    @property _keyNavTHead
    @type Node
    @default: null
    @private
     */
    _keyNavTHead: null,

    /**
    Indicates if the headers of the table are nested or not.
    Nested headers makes navigation in the headers much harder.
    @property _keyNavNestedHeaders
    @default false
    @private
     */
    _keyNavNestedHeaders: false,

    /**
    CSS class name prefix for columns, used to search for a cell by key.
    @property _keyNavColPrefix
    @type String
    @default null (initialized via getClassname() )
    @private
     */
    _keyNavColPrefix:null,

    /**
    Regular expression to extract the column key from a cell via its CSS class name.
    @property _keyNavColRegExp
    @type RegExp
    @default null (initialized based on _keyNavColPrefix)
    @private
     */
    _keyNavColRegExp:null,

    initializer: function () {
        this.onceAfter('render', this._afterKeyNavRender);
        this._keyNavSubscr = [
            this.after('focusedCellChange', this._afterKeyNavFocusedCellChange),
            this.after('focusedChange', this._afterKeyNavFocusedChange)
        ];
        this._keyNavColPrefix = this.getClassName('col', '');
        this._keyNavColRegExp = new RegExp(this._keyNavColPrefix + '(.+?)(\\s|$)');
        this.keyActions = Y.clone(DtKeyNav.ARIA_ACTIONS);

    },

    destructor: function () {
        arrEach(this._keyNavSubscr, function (evHandle) {
            if (evHandle && evHandle.detach) {
                evHandle.detach();
            }
        });
    },

    /**
    Sets the tabIndex on the focused cell and, if the DataTable has the focus,
    sets the focus on it.

    @method _afterFocusedCellChange
    @param e {EventFacade}
    @private
    */
    _afterKeyNavFocusedCellChange: function (e) {
        var newVal  = e.newVal,
            prevVal = e.prevVal;

        if (prevVal) {
            prevVal.set('tabIndex', -1);
        }

        if (newVal) {
            newVal.set('tabIndex', 0);

            if (this.get('focused')) {
                newVal.scrollIntoView();
                newVal.focus();
            }
        } else {
            this.set('focused', null);
        }
    },

    /**
    When the DataTable gets the focus, it ensures the correct cell regains
    the focus.

    @method _afterKeyNavFocusedChange
    @param e {EventFacade}
    @private
    */
    _afterKeyNavFocusedChange: function (e) {
        var cell = this.get('focusedCell');
        if (e.newVal) {
            if (cell) {
                cell.scrollIntoView();
                cell.focus();
            } else {
                this._keyMoveFirst();
            }
        } else {
            if (cell) {
                cell.blur();
            }
        }
    },

    /**
    Subscribes to the events on the DataTable elements once they have been rendered,
    finds out the header section and makes the top-left element focusable.

    @method _afterKeyNavRender
    @private
     */
    _afterKeyNavRender: function () {
        var cbx = this.get('contentBox');
        this._keyNavSubscr.push(
            cbx.on('keydown', this._onKeyNavKeyDown, this),
            cbx.on('click', this._onKeyNavClick, this)
        );
        this._keyNavTHead = (this._yScrollHeader || this._tableNode).one('thead');
        this._keyMoveFirst();

        // determine if we have nested headers
        this._keyNavNestedHeaders = (this.get('columns').length !== this.head.theadNode.all('th').size());
    },

    /**
    In response to a click event, it sets the focus on the clicked cell

    @method _onKeyNavClick
    @param e {EventFacade}
    @private
     */
    _onKeyNavClick: function (e) {
        var cell = e.target.ancestor((this.get('keyIntoHeaders') ? 'td, th': 'td'), true);
        if (cell) {
            this.focus();
            this.set('focusedCell', cell);
        }
    },

    /**
    Responds to a key down event by executing the action set in the
    [keyActions](#property_keyActions) table.

    @method _onKeyNavKeyDown
    @param e {EventFacade}
    @private
    */
    _onKeyNavKeyDown: function (e) {
        var keyCode = e.keyCode,
            keyName = DtKeyNav.KEY_NAMES[keyCode] || keyCode,
            action;

        arrEach(['alt', 'ctrl', 'meta', 'shift'], function (modifier) {
            if (e[modifier + 'Key']) {
                keyCode = modifier + '-' + keyCode;
                keyName = modifier + '-' + keyName;
            }
        });
        action = this.keyActions[keyCode] || this.keyActions[keyName];

        if (typeof action === 'string') {
            if (this[action]) {
                this[action].call(this, e);
            } else {
                this._keyNavFireEvent(action, e);
            }
        } else {
            action.call(this, e);
        }
    },

    /**
    If the action associated to a key combination is a string and no method
    by that name was found in this instance, this method will
    fire an event using that string and provides extra information
    to the listener.

    @method _keyNavFireEvent
    @param action {String} Name of the event to fire
    @param e {EventFacade} Original facade from the keydown event.
    @private
     */
    _keyNavFireEvent: function (action, e) {
        var cell = e.target.ancestor('td, th', true);
        if (cell) {
            this.fire(action, {
                cell: cell,
                row: cell.ancestor('tr'),
                record: this.getRecord(cell),
                column: this.getColumn(cell.get('cellIndex'))
            }, e);
        }
    },

    /**
    Sets the focus on the very first cell in the header of the table.

    @method _keyMoveFirst
    @private
     */
    _keyMoveFirst: function () {
        this.set('focusedCell' , (this.get('keyIntoHeaders') ? this._keyNavTHead.one('th') : this._tbodyNode.one('td')), {src:'keyNav'});
    },

    /**
    Sets the focus on the cell to the left of the currently focused one.
    Does not wrap, following the WAI-ARIA recommendation.

    @method _keyMoveLeft
    @param e {EventFacade} Event Facade for the keydown event
    @private
    */
    _keyMoveLeft: function (e) {
        var cell = this.get('focusedCell'),
            index = cell.get('cellIndex'),
            row = cell.ancestor();

        e.preventDefault();

        if (index === 0) {
            return;
        }
        cell = row.get('cells').item(index - 1);
        this.set('focusedCell', cell , {src:'keyNav'});
    },

    /**
    Sets the focus on the cell to the right of the currently focused one.
    Does not wrap, following the WAI-ARIA recommendation.

    @method _keyMoveRight
    @param e {EventFacade} Event Facade for the keydown event
    @private
    */
    _keyMoveRight: function (e) {
        var cell = this.get('focusedCell'),
            row = cell.ancestor('tr'),
            section = row.ancestor(),
            inHead = section === this._keyNavTHead,
            nextCell,
            parent;

        e.preventDefault();

        // a little special with nested headers
        /*
            +-------------+-------+
            | ABC         | DE    |
            +-------+-----+---+---+
            | AB    |     |   |   |
            +---+---+     |   |   |
            | A | B |  C  | D | E |
            +---+---+-----+---+---+
        */

        nextCell = cell.next();

        if (row.get('rowIndex') !== 0 && inHead && this._keyNavNestedHeaders) {
            if (nextCell) {
                cell = nextCell;
            } else { //-- B -> C
                parent = this._getTHParent(cell);

                if (parent && parent.next()) {
                    cell = parent.next();
                } else { //-- E -> ...
                    return;
                }
            }

        } else {
            if (!nextCell) {
                return;
            } else {
                cell = nextCell;
            }
        }

        this.set('focusedCell', cell, { src:'keyNav' });

    },

    /**
    Sets the focus on the cell above the currently focused one.
    It will move into the headers when the top of the data rows is reached.
    Does not wrap, following the WAI-ARIA recommendation.

    @method _keyMoveUp
    @param e {EventFacade} Event Facade for the keydown event
    @private
    */
    _keyMoveUp: function (e) {
        var cell = this.get('focusedCell'),
            cellIndex = cell.get('cellIndex'),
            row = cell.ancestor('tr'),
            rowIndex = row.get('rowIndex'),
            section = row.ancestor(),
            sectionRows = section.get('rows'),
            inHead = section === this._keyNavTHead,
            parent;

        e.preventDefault();

        if (!inHead) {
            rowIndex -= section.get('firstChild').get('rowIndex');
        }

        if (rowIndex === 0) {
            if (inHead || !this.get('keyIntoHeaders')) {
                return;
            }

            section = this._keyNavTHead;
            sectionRows = section.get('rows');

            if (this._keyNavNestedHeaders) {
                key = this._getCellColumnName(cell);
                cell = section.one('.' + this._keyNavColPrefix + key);
                cellIndex = cell.get('cellIndex');
                row = cell.ancestor('tr');
            } else {
                row = section.get('firstChild');
                cell = row.get('cells').item(cellIndex);
            }
        } else {
            if (inHead && this._keyNavNestedHeaders) {
                key = this._getCellColumnName(cell);
                parent = this._columnMap[key]._parent;
                if (parent) {
                    cell = section.one('#' + parent.id);
                }
            } else {
                row = sectionRows.item(rowIndex -1);
                cell = row.get('cells').item(cellIndex);
            }
        }
        this.set('focusedCell', cell);
    },

    /**
    Sets the focus on the cell below the currently focused one.
    It will move into the data rows when the bottom of the header rows is reached.
    Does not wrap, following the WAI-ARIA recommendation.

    @method _keyMoveDown
    @param e {EventFacade} Event Facade for the keydown event
    @private
    */
    _keyMoveDown: function (e) {
        var cell = this.get('focusedCell'),
            cellIndex = cell.get('cellIndex'),
            row = cell.ancestor('tr'),
            rowIndex = row.get('rowIndex') + 1,
            section = row.ancestor(),
            inHead = section === this._keyNavTHead,
            tbody = (this.body && this.body.tbodyNode),
            sectionRows = section.get('rows'),
            key,
            children;

        e.preventDefault();

        if (inHead) { // focused cell is in the header
            if (this._keyNavNestedHeaders) { // the header is nested
                key = this._getCellColumnName(cell);
                children = this._columnMap[key].children;

                rowIndex += (cell.getAttribute('rowspan') || 1) - 1;

                if (children) {
                    // stay in thead
                    cell = section.one('#' + children[0].id);
                } else {
                    // moving into tbody
                    cell = tbody.one('.' + this._keyNavColPrefix + key);
                    section = tbody;
                    sectionRows = section.get('rows');
                }
                cellIndex = cell.get('cellIndex');

            } else { // the header is not nested
                row = tbody.one('tr');
                cell = row.get('cells').item(cellIndex);
            }
        }

        // offset row index to tbody
        rowIndex -= sectionRows.item(0).get('rowIndex');


        if (rowIndex >= sectionRows.size()) {
            if (!inHead) { // last row in tbody
                return;
            }
            section = tbody;
            row = section.one('tr');

        } else {
            row = sectionRows.item(rowIndex);
        }

        this.set('focusedCell', row.get('cells').item(cellIndex));
    },

    /**
    Sets the focus on the left-most cell of the row containing the currently focused cell.

    @method _keyMoveRowStart
    @param e {EventFacade} Event Facade for the keydown event
    @private
     */
    _keyMoveRowStart: function (e) {
        var row = this.get('focusedCell').ancestor();
        this.set('focusedCell', row.get('firstChild'), {src:'keyNav'});
        e.preventDefault();
    },

    /**
    Sets the focus on the right-most cell of the row containing the currently focused cell.

    @method _keyMoveRowEnd
    @param e {EventFacade} Event Facade for the keydown event
    @private
     */
    _keyMoveRowEnd: function (e) {
        var row = this.get('focusedCell').ancestor();
        this.set('focusedCell', row.get('lastChild'), {src:'keyNav'});
        e.preventDefault();
    },

    /**
    Sets the focus on the top-most cell of the column containing the currently focused cell.
    It would normally be a header cell.

    @method _keyMoveColTop
    @param e {EventFacade} Event Facade for the keydown event
    @private
     */
    _keyMoveColTop: function (e) {
        var cell = this.get('focusedCell'),
            cellIndex = cell.get('cellIndex'),
            key, header;

        e.preventDefault();

        if (this._keyNavNestedHeaders && this.get('keyIntoHeaders')) {
            key = this._getCellColumnName(cell);
            header = this._columnMap[key];
            while (header._parent) {
                header = header._parent;
            }
            cell = this._keyNavTHead.one('#' + header.id);

        } else {
            cell = (this.get('keyIntoHeaders') ? this._keyNavTHead: this._tbodyNode).get('firstChild').get('cells').item(cellIndex);
        }
        this.set('focusedCell', cell , {src:'keyNav'});
    },

    /**
    Sets the focus on the last cell of the column containing the currently focused cell.

    @method _keyMoveColBottom
    @param e {EventFacade} Event Facade for the keydown event
    @private
     */
    _keyMoveColBottom: function (e) {
        var cell = this.get('focusedCell'),
            cellIndex = cell.get('cellIndex');

        this.set('focusedCell', this._tbodyNode.get('lastChild').get('cells').item(cellIndex), {src:'keyNav'});
        e.preventDefault();

    },

    /**
    Setter method for the [focusedCell](#attr_focusedCell) attribute.
    Checks that the passed value is a Node, either a TD or TH and is
    contained within the DataTable contentBox.

    @method _focusedCellSetter
    @param cell {Node} DataTable cell to receive the focus
    @return cell or Y.Attribute.INVALID_VALUE
    @private
     */
    _focusedCellSetter: function (cell) {
        if (cell instanceof Y.Node) {
            var tag = cell.get('tagName').toUpperCase();
            if ((tag === 'TD' || tag === 'TH') && this.get('contentBox').contains(cell) ) {
                return cell;
            }
        } else if (cell === null) {
            return cell;
        }
        return Y.Attribute.INVALID_VALUE;
    },

    /**
     Retrieves the parent cell of the given TH cell. If there is no parent for
     the provided cell, null is returned.
     @protected
     @method _getTHParent
     @param {Node} thCell Cell to find parent of
     @return {Node} Parent of the cell provided or null
     */
    _getTHParent: function (thCell) {
        var key = this._getCellColumnName(thCell),
            parent = this._columnMap[key] && this._columnMap[key]._parent;

        if (parent) {
            return thCell.ancestor().ancestor().one('.' + this._keyNavColPrefix + parent.key);
        }

        return null;
    },

    /**
     Retrieves the column name based from the data attribute on the cell if
     available. Other wise, extracts the column name from the classname
     @protected
     @method _getCellColumnName
     @param {Node} cell Cell to get column name from
     @return String Column name of the provided cell
     */
    _getCellColumnName: function (cell) {
        return cell.getData('yui3-col-id') || this._keyNavColRegExp.exec(cell.get('className'))[1];
    }
});

Y.DataTable.KeyNav = DtKeyNav;
Y.Base.mix(Y.DataTable, [DtKeyNav]);


}, '3.15.0', {"requires": ["datatable-base"]});
