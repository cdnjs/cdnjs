/**
 * An internal Queue class.
 * @private
 */
Ext.define('Ext.util.Queue', {

    constructor: function() {
        this.clear();
    },

    add : function(obj) {
        var me = this,
            key = me.getKey(obj);

        if (!me.map[key]) {
            ++me.length;
            me.items.push(obj);
            me.map[key] = obj;
        }

        return obj;
    },

    /**
     * Removes all items from the collection.
     */
    clear : function(){
        var me = this,
            items = me.items;

        me.items = [];
        me.map = {};
        me.length = 0;

        return items;
    },

    contains: function (obj) {
        var key = this.getKey(obj);

        return this.map.hasOwnProperty(key);
    },

    /**
     * Returns the number of items in the collection.
     * @return {Number} the number of items in the collection.
     */
    getCount : function(){
        return this.length;
    },

    getKey : function(obj){
         return obj.id;
    },

    /**
     * Remove an item from the collection.
     * @param {Object} obj The item to remove.
     * @return {Object} The item removed or false if no item was removed.
     */
    remove : function(obj){
        var me = this,
            key = me.getKey(obj),
            items = me.items,
            index;

        if (me.map[key]) {
            index = Ext.Array.indexOf(items, obj);
            Ext.Array.erase(items, index, 1);
            delete me.map[key];
            --me.length;
        }

        return obj;
    }
});