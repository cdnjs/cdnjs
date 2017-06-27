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
    ASC = "asc",
    DESC = "desc",
    
    CLASS_ASC = YgetClassName(DATATABLE, "asc"),
    CLASS_DESC = YgetClassName(DATATABLE, "desc"),
    CLASS_SORTABLE = YgetClassName(DATATABLE, "sortable"),

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
        * @description Name of DataTable custom event that should trigger a
        * column to sort.
        * @type String
        * @default "theadCellClick"
        * @initOnly
        */
        trigger: {
            value: "theadCellClick",
            writeOnce: "initOnly"
        },
        
        /**
        * @attribute sortedBy
        * @description Sort state: {field,dir}
        * @type Object
        */
        sortedBy: {
            value: null
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
        var dt = this.get("host");
        dt.get("recordset").plug(Y.Plugin.RecordsetSort, {dt: dt});
        dt.get("recordset").sort.addTarget(dt);
        
        // Wrap link around TH value
        this.doBefore("_createTheadThNode", this._beforeCreateTheadThNode);
        
        // Add class
        this.doBefore("_attachTheadThNode", function(o) {
            if(o.column.get("sortable")) {
                o.th.addClass(CLASS_SORTABLE);
            }
        });

        // Attach trigger handlers
        dt.on(this.get("trigger"), this._onEventSortColumn);

        // Attach UI hooks
        dt.after("recordsetSort:sort", function() {
            dt._uiSetRecordset(dt.get("recordset"));
        });
        dt.after("sortedByChangeEvent", function() {
            //alert('ok');
        });

        //TODO
        //dt.after("recordset:mutation", function() {//reset sortedBy});
        
        //TODO
        //add Column sortFn ATTR
        
        // Update UI after the fact (plug-then-render case)
        if(dt.get("rendered")) {
            dt._uiSetColumnset(dt.get("columnset"));
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
                link_class: "foo",
                link_title: "bar",
                link_href: "bat",
                value: o.value
            });
        }
    },

    /**
    * In response to the "trigger" event, sorts the underlying Recordset and
    * updates the sortedBy attribute.
    *
    * @method _beforeCreateTheadThNode
    * @param o {Object} {value, column, tr}.
    * @protected
    */
    _onEventSortColumn: function(e) {
        e.halt();
        //TODO: normalize e.currentTarget to TH
        var column = this.get("columnset").get("hash")[e.currentTarget.get("id")],
            field = column.get("field"),
            prevSortedBy = this.get("sortedBy"),
            dir = (prevSortedBy &&
                prevSortedBy.field === field &&
                prevSortedBy.dir === ASC) ? DESC : ASC,
            sorter = column.get("sortFn");
        if(column.get("sortable")) {
            this.get("recordset").sort.sort(field, dir === DESC, sorter);
            this.set("sortedBy", {field: field, dir: dir});
        }
    }
});

Y.namespace("Plugin").DataTableSort = DataTableSort;





}, '@VERSION@' ,{lang:['en'], requires:['plugin','datatable-base','recordset-sort']});
