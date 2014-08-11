/*
This file is part of Ext JS 4.2

Copyright (c) 2011-2013 Sencha Inc

Contact:  http://www.sencha.com/contact

GNU General Public License Usage
This file may be used under the terms of the GNU General Public License version 3.0 as
published by the Free Software Foundation and appearing in the file LICENSE included in the
packaging of this file.

Please review the following information to ensure the GNU General Public License version 3.0
requirements will be met: http://www.gnu.org/copyleft/gpl.html.

If you are unsure which license is appropriate for your use, please contact the sales department
at http://www.sencha.com/contact.

Build date: 2013-05-16 14:36:50 (f9be68accb407158ba2b1be2c226a6ce1f649314)
*/
/**
 * @private
 * A mixin for providing query related methods for {@link Ext.ComponentQuery} for components that
 * implement getRefItems.
 */
Ext.define('Ext.Queryable', {
    
    isQueryable: true,
    
    /**
     * Retrieves all descendant components which match the passed selector.
     * Executes an Ext.ComponentQuery.query using this container as its root.
     * @param {String} [selector] Selector complying to an Ext.ComponentQuery selector.
     * If no selector is specified all items will be returned.
     * @return {Ext.Component[]} Components which matched the selector
     */
    query : function(selector) {
        selector = selector || '*';
        return Ext.ComponentQuery.query(selector, this);
    },
    
    /**
     * Retrieves all descendant components which match the passed function.
     * The function should return false for components that are to be
     * excluded from the selection.
     * @param {Function} fn The matcher function. It will be called with a single argument,
     * the component being tested.
     * @param {Object} [scope] The scope in which to run the function. If not specified,
     * it will default to the active component.
     * @return {Ext.Component[]} Components matched by the passed function
     */
    queryBy: function(fn, scope) {
        var out = [],
            items = this.getRefItems(true),
            i = 0,
            len = items.length,
            item;
            
        for (; i < len; ++i) {
            item = items[i];
            if (fn.call(scope || item, item) !== false) {
                out.push(item);
            }
        }
        return out;
    },
    
    /**
     * Finds a component at any level under this container matching the id/itemId.
     * This is a shorthand for calling ct.down('#' + id);
     * @param {String} id The id to find
     * @return {Ext.Component} The matching id, null if not found
     */
    queryById: function(id){
        return this.down('#' + id);
    },

    /**
     * Retrieves the first direct child of this container which matches the passed selector or component.
     * The passed in selector must comply with an Ext.ComponentQuery selector, or it can be an actual Ext.Component.
     * @param {String/Ext.Component} [selector] An Ext.ComponentQuery selector. If no selector is
     * specified, the first child will be returned.
     * @return Ext.Component The matching child Ext.Component (or `null` if no match was found).
     */
    child: function (selector) {
        if (selector && selector.isComponent) {
            selector = '#' + Ext.escapeId(selector.getItemId());
        }

        selector = selector || '';
        return this.query('> ' + selector)[0] || null;
    },
    
    /**
     * Retrieves the first descendant of this container which matches the passed selector.
     * The passed in selector must comply with an Ext.ComponentQuery selector, or it can be an actual Ext.Component.
     * @param {String/Ext.Component} [selector] An Ext.ComponentQuery selector or Ext.Component. If no selector is
     * specified, the first child will be returned.
     * @return Ext.Component The matching descendant Ext.Component (or `null` if no match was found).
     */
    down: function (selector) {
        if (selector && selector.isComponent) {
            selector = '#' + Ext.escapeId(selector.getItemId());
        }

        selector = selector || '';
        return this.query(selector)[0] || null;
    },
    
    getRefItems: function(){
        return [];
    }
        
});
