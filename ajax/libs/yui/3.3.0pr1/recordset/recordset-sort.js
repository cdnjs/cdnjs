YUI.add('recordset-sort', function(Y) {

/**
 * Provides default and custom sorting functionality to recordset.
 *
 * @module recordset
 * @submodule recordset-sort
 */

var Compare = Y.ArraySort.compare,
	isValue = Y.Lang.isValue;

function RecordsetSort(field, desc, sorter) {
    RecordsetSort.superclass.constructor.apply(this, arguments);
}

Y.mix(RecordsetSort, {
    NS: "sort",

    NAME: "recordsetSort",

    ATTRS: {
	
		/**
	    * @description The last properties used to sort
	    *
	    * @attribute lastSortProperties
	    * @public
	    * @static
	    * @type object
	    */
		lastSortProperties: {
			value: {
				field:undefined,
				desc:true,
				sorter:undefined
			},
			validator: function(v) {
				return (isValue(v.field) && isValue(v.desc) && isValue(v.sorter));
			}
		},
		
		/**
	    * @description Default sort function to use if none is specified by the user.
		* Takes two records, the key to sort by, and whether sorting direction is descending or not (boolean).
		* If two records have the same value for a given key, the ID is used as the tie-breaker.
	    *
	    * @attribute defaultSorter
	    * @public
	    * @static
	    * @type function
	    */
        defaultSorter: {
            value: function(recA, recB, field, desc) {
                var sorted = Compare(recA.getValue(field), recB.getValue(field), desc);
                if(sorted === 0) {
                    return Compare(recA.get("id"), recB.get("id"), desc);
                }
                else {
                    return sorted;
                }
            }
        },
		
		/**
	    * @description A boolean telling if the recordset is in a sorted state.
	    *
	    * @attribute defaultSorter
	    * @public
	    * @static
	    * @type function
	    */
		isSorted: {
			value: false,
			valueFn: "_getState"
		}
    }
});

Y.extend(RecordsetSort, Y.Plugin.Base, {
	
	/**
     * Sets up the default function to use when the "sort" event is fired.
     *
     * @method initializer
     * @public
     */
    initializer: function(config) {
        this.publish("sort", {defaultFn: Y.bind("_defSortFn", this)});
    },

    destructor: function(config) {
    },

	/**
     * Sets up event listeners to listen to "add", "update" and "sort" events, and change the isSorted flag as needed.
     *
     * @method _getState
     * @private
     */
	_getState: function() {
		var host = this.get('host'),
			checker = Y.bind(function() {
				this.set('isSorted',false);
			}, this);
		
		this.on("sort", function() {
		 	this.set('isSorted', true);
		});
		
		this.onHostEvent('add', checker, host);
		this.onHostEvent('update', checker, host);
	},

	/**
     * Method that all sort calls go through. 
	 * Sets up the lastSortProperties object with the details of the sort, and passes in parameters 
	 * to the "defaultSorter" or a custom specified sort function.
     *
     * @method _defSortFn
     * @private
     */
    _defSortFn: function(e) {
		this.set('lastSortProperties', e);
		
		//have to work directly with _items here - changing the recordset.
        this.get("host")._items.sort(function(a, b) {
			return (e.sorter)(a, b, e.field, e.desc);
		});
    },

	/**
     * Sorts the recordset.
	 *
     * @param field {string} A key to sort by.
     * @param desc {boolean} True if you want sort order to be descending, false if you want sort order to be ascending
     * @method sort
     * @public
     */
    sort: function(field, desc, sorter) {
		this.fire("sort", {field:field, desc: desc, sorter: sorter || this.get("defaultSorter")});
    },

	/**
     * Resorts the recordset based on the last-used sort parameters (stored in 'lastSortProperties' ATTR)
	 *
     * @method resort
     * @public
     */
	resort: function() {
		var p = this.get('lastSortProperties');
		this.fire("sort", {field:p.field, desc: p.desc, sorter: p.sorter || this.get("defaultSorter")});
	},

	/**
     * Reverses the recordset calling the standard array.reverse() method.
	 *
     * @method reverse
     * @public
     */
    reverse: function() {
		this.get('host')._items.reverse();
    },

	/**
     * Sorts the recordset based on the last-used sort parameters, but flips the order. (ie: Descending becomes ascending, and vice versa).
	 *
     * @method flip
     * @public
     */	
	flip: function() {
		var p = this.get('lastSortProperties');
		
		//If a predefined field is not provided by which to sort by, throw an error
		if (isValue(p.field)) {
			this.fire("sort", {field:p.field, desc: !p.desc, sorter: p.sorter || this.get("defaultSorter")});
		}
		else {
		}
	}
});

Y.namespace("Plugin").RecordsetSort = RecordsetSort;



}, '@VERSION@' ,{requires:['recordset-base','arraysort','plugin']});
