YUI.add('arraylist-add', function(Y) {

/**
 * Collection utilities beyond what is provided in the YUI core
 * @module collection
 * @submodule arraylist-add
 */

/**
 * Adds methods add and remove to Y.ArrayList
 * @class ArrayList~add
 */
Y.mix( Y.ArrayList.prototype, {

    /**
     * Add a single item to the ArrayList.  Does not prevent duplicates.
     *
     * @method add
     * @param item { mixed } Item presumably of the same type as others in the
     *                       ArrayList
     * @param index {Number} (Optional.)  Number representing the position at 
     * which the item should be inserted.
     * @return {ArrayList} the instance
     * @chainable
     */
    add: function ( item, index ) {
        var items = this._items;

        if (Y.Lang.isNumber(index)) {
            items.splice(index, 0, item);
        }
        else {
            items.push(item);
        }

        return this;
    },

    /**
     * Removes first or all occurrences of an item to the ArrayList.  If a
     * comparitor is not provided, uses itemsAreEqual method to determine
     * matches.
     *
     * @method remove
     * @param needle { mixed } Item to find and remove from the list
     * @param all { Boolean } If true, remove all occurrences
     * @param comparitor { Function } optional a/b function to test equivalence
     * @return {ArrayList} the instance
     * @chainable
     */
    remove: function ( needle, all, comparitor ) {
        comparitor = comparitor || this.itemsAreEqual;

        for (var i = this._items.length - 1; i >= 0; --i) {
            if ( comparitor.call( this, needle, this.item( i ) ) ) {
                this._items.splice( i, 1 );
                if ( !all ) {
                    break;
                }
            }
        }

        return this;
    },

    /**
     * Default comparitor for items stored in this list.  Used by remove().
     *
     * @method itemsAreEqual
     * @param a { mixed } item to test equivalence with
     * @param b { mixed } other item to test equivalance
     * @return { Boolean } true if items are deemed equivalent
     */
    itemsAreEqual: function ( a, b ) {
        return a === b;
    }

} );


}, '@VERSION@' ,{requires:['arraylist']});
