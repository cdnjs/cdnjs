YUI.add('recordset-sort, arraysort', function(Y) {

var COMPARE = Y.ArraySort.compare;

function RecordsetSort(field, desc, sorter) {
    RecordsetSort.superclass.constructor.apply(this, arguments);
}

Y.mix(RecordsetSort, {
    NS: "sort",

    NAME: "recordsetSort",

    ATTRS: {
        dt: {
        },

        defaultSorter: {
            value: function(recA, recB, field, desc) {
                var sorted = COMPARE(recA.getValue(field), recB.getValue(field), desc);
                if(sorted === 0) {
                    return COMPARE(recA.get("id"), recB.get("id"), desc);
                }
                else {
                    return sorted;
                }
            }
        }
    }
});

Y.extend(RecordsetSort, Y.Plugin.Base, {
    initializer: function(config) {
        this.addTarget(this.get("dt"));
        this.publish("sort", {defaultFn: Y.bind("_defSortFn", this)});
    },

    destructor: function(config) {
    },

    _defSortFn: function(e) {
        this.get("host").get("records").sort(function(a, b) {return (e.sorter)(a, b, e.field, e.desc);});
    },

    sort: function(field, desc, sorter) {
        this.fire("sort", {field:field, desc: desc, sorter: sorter|| this.get("defaultSorter")});
    },

    custom: function() {
        alert("sort custom");
    },

    // force asc
    asc: function() {
        alert("sort asc");
    },

    // force desc
    desc: function() {
        alert("sort desc");
    },

    // force reverse
    reverse: function() {
        alert("sort reverse");
    }
});

Y.namespace("Plugin").RecordsetSort = RecordsetSort;



}, '@VERSION@' ,{requires:['recordset-base']});
