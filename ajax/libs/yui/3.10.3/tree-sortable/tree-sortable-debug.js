YUI.add('tree-sortable', function (Y, NAME) {

/*jshint expr:true, onevar:false */

/**
Extension for `Tree` that makes nodes sortable.

@module tree
@submodule tree-sortable
@main tree-sortable
**/

/**
Extension for `Tree` that makes nodes sortable.

@class Tree.Sortable
@constructor
@param {Object} [config] Configuration options.
@param {Function} [config.sortComparator] Default comparator function to use
    when sorting a node's children if the node itself doesn't have a custom
    comparator function. If not specified, insertion order will be used by
    default.
@param {Boolean} [config.sortReverse=false] If `true`, node children will be
    sorted in reverse (descending) order by default. Otherwise they'll be sorted
    in ascending order.
@extensionfor Tree
**/

/**
Fired after a node's children are re-sorted.

@event sort
@param {Tree.Node} node Node whose children were sorted.
@param {Boolean} reverse `true` if the children were sorted in reverse
    (descending) order, `false` otherwise.
@param {String} src Source of the event.
**/
var EVT_SORT = 'sort';

function Sortable() {}

Sortable.prototype = {
    // -- Public Properties ----------------------------------------------------

    /**
    If `true`, node children will be sorted in reverse (descending) order by
    default. Otherwise they'll be sorted in ascending order.

    @property {Boolean} sortReverse
    @default false
    **/
    sortReverse: false,

    // -- Lifecycle ------------------------------------------------------------
    initializer: function (config) {
        this.nodeExtensions = this.nodeExtensions.concat(Y.Tree.Node.Sortable);

        if (config) {
            if (config.sortComparator) {
                this.sortComparator = config.sortComparator;
            }

            if ('sortReverse' in config) {
                this.sortReverse = config.sortReverse;
            }
        }
    },

    // -- Public Methods -------------------------------------------------------

    /**
    Default comparator function to use when sorting a node's children if the
    node itself doesn't have a custom comparator function.

    If not specified, insertion order will be used by default.

    @method sortComparator
    @param {Tree.Node} node Node being sorted.
    @return {Number|String} Value by which the node should be sorted relative to
        its siblings.
    **/
    sortComparator: function (node) {
        return node.index();
    },

    /**
    Sorts the children of the specified node.

    @method sortNode
    @param {Tree.Node} node Node whose children should be sorted.
    @param {Object} [options] Options.
        @param {Boolean} [options.silent] If `true`, no `sort` event will be
            fired.
        @param {Function} [options.sortComparator] Custom comparator function to
            use. If specified, this will become the node's new comparator
            function, overwriting any previous comparator function that was set
            for the node.
        @param {Boolean} [options.sortReverse] If `true`, children will be
            sorted in reverse (descending) order. Otherwise they'll be sorted in
            ascending order. This will become the node's new sort order,
            overwriting any previous sort order that was set for the node.
        @param {String} [options.src] Source of the sort operation. Will be
            passed along to the `sort` event facade.
    @chainable
    **/
    sortNode: function (node, options) {
        // Nothing to do if the node has no children.
        if (!node.children.length) {
            return this;
        }

        options || (options = {});

        var comparator;

        if (options.sortComparator) {
            comparator = node.sortComparator = options.sortComparator;
        } else {
            comparator = node.sortComparator || this.sortComparator;
        }

        var reverse;

        if ('sortReverse' in options) {
            reverse = node.sortReverse = options.sortReverse;
        } else if ('sortReverse' in node) {
            reverse = node.sortReverse;
        } else {
            reverse = this.sortReverse;
        }

        node.children.sort(Y.rbind(this._sort, this, comparator, reverse));

        if (!options.silent) {
            this.fire(EVT_SORT, {
                node   : node,
                reverse: !!reverse,
                src    : options.src
            });
        }

        return this;
    },

    // -- Protected Methods ----------------------------------------------------

    /**
    Compares value _a_ to value _b_ for sorting purposes.

    Values are assumed to be the result of calling a sortComparator function.

    @method _compare
    @param {Mixed} a First value to compare.
    @param {Mixed} b Second value to compare.
    @return {Number} `-1` if _a_ should come before _b_, `0` if they're
        equivalent, `1` if _a_ should come after _b_.
    @protected
    **/
    _compare: function (a, b) {
        return a < b ? -1 : (a > b ? 1 : 0);
    },

    /**
    Compares value _a_ to value _b_ for sorting purposes, but sorts them in
    reverse (descending) order.

    Values are assumed to be the result of calling a sortComparator function.

    @method _compareReverse
    @param {Mixed} a First value to compare.
    @param {Mixed} b Second value to compare.
    @return {Number} `-1` if _a_ should come before _b_, `0` if they're
        equivalent, `1` if _a_ should come after _b_.
    @protected
    **/
    _compareReverse: function (a, b) {
        return b < a ? -1 : (b > a ? 1 : 0);
    },

    /**
    Overrides `Tree#_getDefaultNodeIndex()` to provide insertion-time sorting
    for nodes inserted without an explicit index.

    @method _getDefaultNodeIndex
    @param {Tree.Node} parent Parent node.
    @param {Tree.Node} node Node being inserted.
    @param {Object} [options] Options passed to `insertNode()`.
    @return {Number} Index at which _node_ should be inserted into _parent_'s
        `children` array.
    @protected
    **/
    _getDefaultNodeIndex: function (parent, node) {
        /*jshint bitwise:false */

        var children   = parent.children,
            comparator = parent.sortComparator || this.sortComparator,
            max        = children.length,
            min        = 0,
            reverse    = 'sortReverse' in parent ? parent.sortReverse : this.sortReverse;

        if (!max) {
            return max;
        }

        // Special case: if the sortComparator is the default sortComparator,
        // cheat and just return the first or last index of the children array.
        //
        // This is necessary because the default sortComparator relies on
        // the node's index, which is always -1 for uninserted nodes.
        if (comparator === Sortable.prototype.sortComparator) {
            return reverse ? 0 : max;
        }

        var compare = reverse ? this._compareReverse : this._compare,
            needle  = comparator(node);

        // Perform an iterative binary search to determine the correct position
        // for the node based on the return value of the comparator function.
        var middle;

        while (min < max) {
            middle = (min + max) >> 1; // Divide by two and discard remainder.

            if (compare(comparator(children[middle]), needle) < 0) {
                min = middle + 1;
            } else {
                max = middle;
            }
        }

        return min;
    },

    /**
    Array sort function used by `sortNode()` to re-sort a node's children.

    @method _sort
    @param {Tree.Node} a First node to compare.
    @param {Tree.Node} b Second node to compare.
    @param {Function} comparator Comparator function.
    @param {Boolean} [reverse=false] If `true`, this will be a reverse
        (descending) comparison.
    @return {Number} `-1` if _a_ is less than _b_, `0` if equal, `1` if greater.
    @protected
    **/
    _sort: function (a, b, comparator, reverse) {
        return this[reverse ? '_compareReverse' : '_compare'](
            comparator(a), comparator(b));
    }
};

Y.Tree.Sortable = Sortable;
/**
@module tree
@submodule tree-sortable
**/

/**
`Tree.Node` extension that adds methods useful for nodes in trees that use the
`Tree.Sortable` extension.

@class Tree.Node.Sortable
@constructor
@extensionfor Tree.Node
**/

function NodeSortable() {}

NodeSortable.prototype = {
    /**
    Sorts this node's children.

    @method sort
    @param {Object} [options] Options.
        @param {Boolean} [options.silent] If `true`, no `sort` event will be
            fired.
        @param {Function} [options.sortComparator] Custom comparator function to
            use. If specified, this will become the node's new comparator
            function, overwriting any previous comparator function that was set
            for the node.
        @param {Boolean} [options.sortReverse] If `true`, children will be
            sorted in reverse (descending) order. Otherwise they'll be sorted in
            ascending order. This will become the node's new sort order,
            overwriting any previous sort order that was set for the node.
        @param {String} [options.src] Source of the sort operation. Will be
            passed along to the `sort` event facade.
    @chainable
    **/
    sort: function (options) {
        this.tree.sortNode(this, options);
        return this;
    }
};

Y.Tree.Node.Sortable = NodeSortable;


}, '@VERSION@', {"requires": ["tree"]});
