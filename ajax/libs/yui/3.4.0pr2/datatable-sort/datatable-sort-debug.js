YUI.add('datatable-sort', function(Y) {

/**
 * Plugs DataTable with sorting functionality.
 *
 * @module datatable
 * @submodule datatable-sort
 */

/**
 * Adds column sorting to DataTable.
 * @class DataTableSort
 * @extends Plugin.Base
 */
var YgetClassName = Y.ClassNameManager.getClassName,

    DATATABLE = "datatable",
    COLUMN = "column",
    ASC = "asc",
    DESC = "desc",

    //TODO: Don't use hrefs - use tab/arrow/enter
    TEMPLATE = '<a class="{link_class}" title="{link_title}" href="{link_href}">{value}</a>';


function DataTableSort() {
    DataTableSort.superclass.constructor.apply(this, arguments);
}

/////////////////////////////////////////////////////////////////////////////
//
// STATIC PROPERTIES
//
/////////////////////////////////////////////////////////////////////////////
Y.mix(DataTableSort, {
    /**
     * The namespace for the plugin. This will be the property on the host which
     * references the plugin instance.
     *
     * @property NS
     * @type String
     * @static
     * @final
     * @value "sort"
     */
    NS: "sort",

    /**
     * Class name.
     *
     * @property NAME
     * @type String
     * @static
     * @final
     * @value "dataTableSort"
     */
    NAME: "dataTableSort",

/////////////////////////////////////////////////////////////////////////////
//
// ATTRIBUTES
//
/////////////////////////////////////////////////////////////////////////////
    ATTRS: {
        /**
        * @attribute trigger
        * @description Defines the trigger that causes a column to be sorted:
        * {event, selector}, where "event" is an event type and "selector" is
        * is a node query selector.
        * @type Object
        * @default {event:"click", selector:"th"}
        * @writeOnce "initOnly"
        */
        trigger: {
            value: {event:"click", selector:"th"},
            writeOnce: "initOnly"
        },
        
        /**
        * @attribute lastSortedBy
        * @description Describes last known sort state: {key,dir}, where
        * "key" is column key and "dir" is either "asc" or "desc".
        * @type Object
        */
        lastSortedBy: {
            setter: "_setLastSortedBy",
            lazyAdd: false
        },
        
        /**
        * @attribute template
        * @description Tokenized markup template for TH sort element.
        * @type String
        * @default '<a class="{link_class}" title="{link_title}" href="{link_href}">{value}</a>'
        */
        template: {
            value: TEMPLATE
        }
    }
});

/////////////////////////////////////////////////////////////////////////////
//
// PROTOTYPE
//
/////////////////////////////////////////////////////////////////////////////
Y.extend(DataTableSort, Y.Plugin.Base, {

    /////////////////////////////////////////////////////////////////////////////
    //
    // METHODS
    //
    /////////////////////////////////////////////////////////////////////////////
    /**
    * Initializer.
    *
    * @method initializer
    * @param config {Object} Config object.
    * @private
    */
    initializer: function(config) {
        var dt = this.get("host"),
            trigger = this.get("trigger");
            
        dt.get("recordset").plug(Y.Plugin.RecordsetSort, {dt: dt});
        dt.get("recordset").sort.addTarget(dt);
        
        // Wrap link around TH value
        this.doBefore("_createTheadThNode", this._beforeCreateTheadThNode);
        
        // Add class
        this.doBefore("_attachTheadThNode", this._beforeAttachTheadThNode);
        this.doBefore("_attachTbodyTdNode", this._beforeAttachTbodyTdNode);

        // Attach trigger handlers
        dt.delegate(trigger.event, Y.bind(this._onEventSortColumn,this), trigger.selector);

        // Attach UI hooks
        dt.after("recordsetSort:sort", function() {
            this._uiSetRecordset(this.get("recordset"));
        });
        this.on("lastSortedByChange", function(e) {
            this._uiSetLastSortedBy(e.prevVal, e.newVal, dt);
        });

        //TODO
        //dt.after("recordset:mutation", function() {//reset lastSortedBy});
        
        //TODO
        //add Column sortFn ATTR
        
        // Update UI after the fact (render-then-plug case)
        if(dt.get("rendered")) {
            dt._uiSetColumnset(dt.get("columnset"));
            this._uiSetLastSortedBy(null, this.get("lastSortedBy"), dt);
        }
    },

    /**
    * @method _setLastSortedBy
    * @description Normalizes lastSortedBy
    * @param val {String | Object} {key, dir} or "key"
    * @returns {key, dir, notdir}
    * @private
    */
    _setLastSortedBy: function(val) {
        if(Y.Lang.isString(val)) {
            return {key:val, dir:"asc", notdir:"desc"};
        }
        else if (val && val.key) {
            if(val.dir === "desc") {
                return {key:val.key, dir:"desc", notdir:"asc"};
            }
            else {
                return {key:val.key, dir:"asc", notdir:"desc"};
            }
        }
        else {
            return null;
        }
    },

    /**
     * Updates sort UI.
     *
     * @method _uiSetLastSortedBy
     * @param val {Object} New lastSortedBy object {key,dir}.
     * @param dt {Y.DataTable.Base} Host.
     * @protected
     */
    _uiSetLastSortedBy: function(prevVal, newVal, dt) {
        var prevKey = prevVal && prevVal.key,
            prevDir = prevVal && prevVal.dir,
            newKey = newVal && newVal.key,
            newDir = newVal && newVal.dir,
            cs = dt.get("columnset"),
            prevColumn = cs.keyHash[prevKey],
            newColumn = cs.keyHash[newKey],
            tbodyNode = dt._tbodyNode,
            prevRowList, newRowList;

        // Clear previous UI
        if(prevColumn) {
            prevColumn.thNode.removeClass(YgetClassName(DATATABLE, prevDir));
            prevRowList = tbodyNode.all("."+YgetClassName(COLUMN, prevColumn.get("id")));
            prevRowList.removeClass(YgetClassName(DATATABLE, prevDir));
        }

        // Add new sort UI
        if(newColumn) {
            newColumn.thNode.addClass(YgetClassName(DATATABLE, newDir));
            newRowList = tbodyNode.all("."+YgetClassName(COLUMN, newColumn.get("id")));
            newRowList.addClass(YgetClassName(DATATABLE, newDir));
        }
    },

    /**
    * Before header cell element is created, inserts link markup around {value}.
    *
    * @method _beforeCreateTheadThNode
    * @param o {Object} {value, column, tr}.
    * @protected
    */
    _beforeCreateTheadThNode: function(o) {
        if(o.column.get("sortable")) {
            o.value = Y.substitute(this.get("template"), {
                link_class: o.link_class || "",
                link_title: "title",
                link_href: "#",
                value: o.value
            });
        }
    },

    /**
    * Before header cell element is attached, sets applicable class names.
    *
    * @method _beforeAttachTheadThNode
    * @param o {Object} {value, column, tr}.
    * @protected
    */
    _beforeAttachTheadThNode: function(o) {
        var lastSortedBy = this.get("lastSortedBy"),
            key = lastSortedBy && lastSortedBy.key,
            dir = lastSortedBy && lastSortedBy.dir,
            notdir = lastSortedBy && lastSortedBy.notdir;

        // This Column is sortable
        if(o.column.get("sortable")) {
            o.th.addClass(YgetClassName(DATATABLE, "sortable"));
        }
        // This Column is currently sorted
        if(key && (key === o.column.get("key"))) {
            o.th.replaceClass(YgetClassName(DATATABLE, notdir), YgetClassName(DATATABLE, dir));
        }
    },

    /**
    * Before header cell element is attached, sets applicable class names.
    *
    * @method _before_beforeAttachTbodyTdNode
    * @param o {Object} {record, column, tr, headers, classnames, value}.
    * @protected
    */
    _beforeAttachTbodyTdNode: function(o) {
        var lastSortedBy = this.get("lastSortedBy"),
            key = lastSortedBy && lastSortedBy.key,
            dir = lastSortedBy && lastSortedBy.dir,
            notdir = lastSortedBy && lastSortedBy.notdir;

        // This Column is sortable
        if(o.column.get("sortable")) {
            o.td.addClass(YgetClassName(DATATABLE, "sortable"));
        }
        // This Column is currently sorted
        if(key && (key === o.column.get("key"))) {
            o.td.replaceClass(YgetClassName(DATATABLE, notdir), YgetClassName(DATATABLE, dir));
        }
    },
    /**
    * In response to the "trigger" event, sorts the underlying Recordset and
    * updates the lastSortedBy attribute.
    *
    * @method _onEventSortColumn
    * @param o {Object} {value, column, tr}.
    * @protected
    */
    _onEventSortColumn: function(e) {
        e.halt();
        //TODO: normalize e.currentTarget to TH
        var dt = this.get("host"),
            column = dt.get("columnset").idHash[e.currentTarget.get("id")],
            key = column.get("key"),
            field = column.get("field"),
            lastSortedBy = this.get("lastSortedBy"),
            dir = (lastSortedBy &&
                lastSortedBy.key === key &&
                lastSortedBy.dir === ASC) ? DESC : ASC,
            sorter = column.get("sortFn");
        if(column.get("sortable")) {
            dt.get("recordset").sort.sort(field, dir === DESC, sorter);
            this.set("lastSortedBy", {key: key, dir: dir});
        }
    }
});

Y.namespace("Plugin").DataTableSort = DataTableSort;





}, '@VERSION@' ,{requires:['datatable-base','plugin','recordset-sort'], lang:['en']});
