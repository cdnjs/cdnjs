/**
 * @private
 * A mixin for providing query related methods for {@link Ext.ComponentQuery} for classes that
 * implement getRefItems.
 */
Ext.define('Ext.mixin.Queryable', {
    mixinId: 'queryable',

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
        return Ext.ComponentQuery.query(selector, this.getQueryRoot());
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
            items = this.getQueryRoot().getRefItems(true),
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
        return this.down(Ext.makeIdSelector(id));
    },

    /**
     * Retrieves the first direct child of this container which matches the passed selector or component.
     * The passed in selector must comply with an Ext.ComponentQuery selector, or it can be an actual Ext.Component.
     * @param {String/Ext.Component} [selector] An Ext.ComponentQuery selector. If no selector is
     * specified, the first child will be returned.
     * @return Ext.Component The matching child Ext.Component (or `null` if no match was found).
     */
    child: function (selector) {
        var children = this.getQueryRoot().getRefItems();

        if (selector && selector.isComponent) {
            return this.matchById(children, selector.getItemId());
        }

        // Filter children array to only matches.
        if (selector) {
            children = Ext.ComponentQuery.query(selector, children);
        }

        // Return first match
        if (children.length) {
            return children[0];
        }
        return null;
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
            return this.matchById(this.getRefItems(true), selector.getItemId());
        }

        selector = selector || '';
        return this.query(selector)[0] || null;
    },
    
    /**
     * Traverses the tree rooted at this node in pre-order mode, calling the passed function on the nodes at each level.
     * That is the function is called upon each node **before** being called on its children).
     *
     * This method is used at each level down the cascade. Currently {@link Ext.Component Component}s
     * and {@link Ext.data.TreeModel TreeModel}s are queryable.
     *
     * If you have tree-structured data, you can make your nodes queryable, and use ComponentQuery on them.
     *
     * @param {Object} selector A ComponentQuery selector used to filter candidate nodes before calling the function.
     * An empty string matches any node.
     * @param {Function} fn The function to call. Return `false` to aborl the traverse.
     * @param {Object} fn.node The node being visited.
     * @param {Object} [scope] The context (`this` reference) in which the function is executed.
     * @param {Array} [extraArgs] A set of arguments to be appended to the function's argument list to pass down extra data known to the caller
     * **after** the node being visited.
     */
    visitPreOrder: function(selector, fn, scope, extraArgs) {
        Ext.ComponentQuery._visit(true, selector, this.getQueryRoot(), fn, scope, extraArgs);
    },

    /**
     * Traverses the tree rooted at this node in post-order mode, calling the passed function on the nodes at each level.
     * That is the function is called upon each node **after** being called on its children).
     *
     * This method is used at each level down the cascade. Currently {@link Ext.Component Component}s
     * and {@link Ext.data.TreeModel TreeModel}s are queryable.
     *
     * If you have tree-structured data, you can make your nodes queryable, and use ComponentQuery on them.
     *
     * @param {Object} selector A ComponentQuery selector used to filter candidate nodes before calling the function.
     * An empty string matches any node.
     * @param {Function} fn The function to call. Return `false` to aborl the traverse.
     * @param {Object} fn.node The node being visited.
     * @param {Object} [scope] The context (`this` reference) in which the function is executed.
     * @param {Array} [extraArgs] A set of arguments to be appended to the function's argument list to pass down extra data known to the caller
     * **after** the node being visited.
     */
    visitPostOrder: function(selector, fn, scope, extraArgs) {
        Ext.ComponentQuery._visit(false, selector, this.getQueryRoot(), fn, scope, extraArgs);
    },

    getRefItems: function(){
        return [];
    },
    
    getQueryRoot: function() {
        return this;
    },

    privates: {
        matchById: function(items, id) {
            var len = items.length,
                i, item;
 
            for (i = 0; i < len; ++i) {
                item = items[i];
                if (item.getItemId() === id) {
                    return item;
                }
            }
            return null;
        }
    }
        
});
