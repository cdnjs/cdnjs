YUI.add('datatable-sort', function(Y) {

/**
Adds support for column sort.

@module datatable-sort
**/
var YLang     = Y.Lang,
    isBoolean = YLang.isBoolean,
    isString  = YLang.isString,
    isArray   = YLang.isArray,
    isObject  = YLang.isObject,

    toArray     = Y.Array,

    dirMap = {
        asc : 1,
        desc: -1,
        "1" : 1,
        "-1": -1
    };


function Sortable() {}

Sortable.ATTRS = {
    // Which columns in the UI should suggest and respond to sorting interaction
    // pass an empty array if no UI columns should show sortable, but you want the
    // table.sort(...) API
    sortable: {
        value: 'auto',
        validator: '_validateSortable'
    },

    // Last sort params
    sortBy: {
        validator: '_validateSortBy',
        getter: '_getSortBy'
    },

    strings: {
        valueFn: function () {
            return Y.Intl.get('datatable-sort');
        }
    }
};

Y.mix(Sortable.prototype, {

    sort: function (fields, payload) {
        this.fire('sort', Y.merge((payload || {}), {
            sortBy: fields || this.get('sortBy')
        }));
    },

    toggleSort: function (columns, payload) {
        var current = this._sortBy,
            sortBy = [],
            i, len, j, col, index;

        // To avoid updating column configs or sortBy directly
        for (i = 0, len = current.length; i < len; ++i) {
            col = {};
            col[current[i]._id] = current[i].sortDir;
            sortBy.push(col);
        }

        if (columns) {
            columns = toArray(columns);

            for (i = 0, len = columns.length; i < len; ++i) {
                col = columns[i];
                index = -1;

                for (j = sortBy.length - 1; i >= 0; --i) {
                    if (sortBy[j][col]) {
                        sortBy[j][col] *= -1;
                        break;
                    }
                }
            }
        } else {
            for (i = 0, len = sortBy.length; i < len; ++i) {
                for (col in sortBy[i]) {
                    if (sortBy[i].hasOwnProperty(col)) {
                        sortBy[i][col] *= -1;
                        break;
                    }
                }
            }
        }

        this.fire('sort', Y.merge((payload || {}), {
            sortBy: sortBy
        }));
    },

    //----------------------------------------------------------------------------
    // Protected properties and methods
    //----------------------------------------------------------------------------
    _afterDataChange: function (e) {
        // object values always trigger a change event, but we only want to
        // call _initSortFn if the value passed to the `data` attribute was a
        // new ModelList, not a set of new data as an array, or even the same
        // ModelList.
        if (e.prevVal !== e.newVal || e.newVal.hasOwnProperty('_compare')) {
            this._initSortFn();
        }
    },

    _afterSortByChange: function (e) {
        // Can't use a setter because it's a chicken and egg problem. The columns
        // need to be set up to translate, but columns are initialized from
        // Core's initializer.  So construction-time assignment would fail.
        this._setSortBy();

        // Don't sort unless sortBy has been set
        if (this._sortBy.length) {
            if (!this.data.comparator) {
                 this.data.comparator = this._sortComparator;
            }

            this.data.sort();
        }
    },

    _bindSortUI: function () {
        this.after(['sortableChange', 'sortByChange', 'columnsChange'],
            this._uiSetSortable);

        if (this._theadNode) {
            this._sortHandle = this._theadNode.delegate('click',
                Y.rbind('_onUITriggerSort', this),
                '.' + this.getClassName('sortable', 'column'));
        }
    },
            
    _defSortFn: function (e) {
        this.set.apply(this, ['sortBy', e.sortBy].concat(e.details));
    },

    destructor: function () {
        if (this._sortHandle) {
            this._sortHandle.detach();
        }
    },

    _getSortBy: function (val, detail) {
        var state, i, len, col;

        // "sortBy." is 7 characters. Used to catch 
        detail = detail.slice(7);

        // TODO: table.get('sortBy.asObject')? table.get('sortBy.json')?
        if (detail === 'state') {
            state = [];

            for (i = 0, len = this._sortBy.length; i < len; ++i) {
                col = this._sortBy[i];
                state.push({
                    column: col._id,
                    dir: col.sortDir
                });
            }

            // TODO: Always return an array?
            return { state: (state.length === 1) ? state[0] : state };
        } else {
            return val;
        }
    },

    initializer: function () {
        var boundParseSortable = Y.bind('_parseSortable', this);

        this._parseSortable();

        this._setSortBy();

        this._initSortFn();

        this.after({
            renderHeader  : Y.bind('_renderSortable', this),
            dataChange    : Y.bind('_afterDataChange', this),
            sortByChange  : Y.bind('_afterSortByChange', this),
            sortableChange: boundParseSortable,
            columnsChange : boundParseSortable
        });

        this.publish('sort', {
            defaultFn: Y.bind('_defSortFn', this)
        });
    },

    _initSortFn: function () {
        var self = this;

        // TODO: This should be a ModelList extension.
        // FIXME: Modifying a component of the host seems a little smelly
        // FIXME: Declaring inline override to leverage closure vs
        // compiling a new function for each column/sortable change or
        // binding the _compare implementation to this, resulting in an
        // extra function hop during sorting. Lesser of three evils?
        this.data._compare = function (a, b) {
            var cmp = 0,
                i, len, col, dir, aa, bb;

            for (i = 0, len = self._sortBy.length; !cmp && i < len; ++i) {
                col = self._sortBy[i];
                dir = col.sortDir;

                if (col.sortFn) {
                    cmp = col.sortFn(a, b) * dir;
                } else {
                    // FIXME? Requires columns without sortFns to have key
                    aa = a.get(col.key);
                    bb = b.get(col.key);

                    cmp = (aa > bb) ? dir : ((aa < bb) ? -dir : 0);
                }
            }

            return cmp;
        };

        if (this.get('sortable') && this._sortBy.length) {
            this.data.comparator = this._sortComparator;

            // TODO: is this necessary? Should it be elsewhere?
            this.data.sort();
        } else {
            // Leave the _compare method in place to avoid having to set it
            // up again.  Mistake?
            delete this.data.comparator;
        }
    },

    _onUITriggerSort: function (e) {
        var id = e.currentTarget.get('id'),
            config = {},
            dir    = 1,
            column;

        e.preventDefault();

        // TODO: if (e.ctrlKey) { /* subsort */ }
        if (id) {
            Y.Array.each(this._displayColumns, function (col) {
                if (id === col._yuid) {
                    column = col._id;
                    // Flip current sortDir or default to 1 (asc)
                    dir    = -(col.sortDir|0) || 1;
                }
            });

            if (column) {
                config[column] = dir;

                this.fire('sort', {
                    originEvent: e,
                    sortBy: [config]
                });
            }
        }
    },

    _parseSortable: function () {
        var sortable = this.get('sortable'),
            columns  = [],
            i, len, col;

        if (isArray(sortable)) {
            for (i = 0, len = sortable.length; i < len; ++i) {
                col = sortable[i];

                // isArray is called because arrays are objects, but will rely
                // on getColumn to nullify them for the subsequent if (col)
                if (!isObject(col, true) || isArray(col)) {
                    col = this.getColumn(col);
                }

                if (col) {
                    columns.push(col._yuid);
                }
            }
        } else if (sortable) {
            columns = this._displayColumns.slice();

            if (sortable === 'auto') {
                for (i = columns.length - 1; i >= 0; --i) {
                    if (!columns[i].sortable) {
                        columns.splice(i, 1);
                    }
                }
            }
        }

        this._sortable = columns;
    },


    _renderSortable: function () {
        this._uiSetSortable();

        this._bindSortUI();
    },

    _setSortBy: function () {
        var columns     = this._displayColumns,
            sortBy      = this.get('sortBy') || [],
            sortedClass = ' ' + this.getClassName('sorted'),
            i, len, name, dir, field, column;

        this._sortBy = [];

        // Purge current sort state from column configs
        for (i = 0, len = columns.length; i < len; ++i) {
            column = columns[i];

            delete column.sortDir;

            if (column.className) {
                // TODO: be more thorough
                column.className = column.className.replace(sortedClass, '');
            }
        }

        sortBy = toArray(sortBy);

        for (i = 0, len = sortBy.length; i < len; ++i) {
            name = sortBy[i];
            dir  = 1;

            if (isObject(name)) {
                field = name;
                // Have to use a for-in loop to process sort({ foo: -1 })
                for (name in field) {
                    if (field.hasOwnProperty(name)) {
                        dir = dirMap[field[name]];
                        break;
                    }
                }
            }

            if (name) {
                // Allow sorting of any model field and any column
                // FIXME: this isn't limited to model attributes, but there's no
                // convenient way to get a list of the attributes for a Model
                // subclass *including* the attributes of its superclasses.
                column = this.getColumn(name) || { _id: name, key: name };

                if (column) {
                    column.sortDir = dir;

                    if (!column.className) {
                        column.className = '';
                    }

                    column.className += sortedClass;

                    this._sortBy.push(column);
                }
            }
        }
    },

    _sortComparator: function (item) {
        // Defer sorting to ModelList's _compare
        return item;
    },

    _validateSortable: function (val) {
        return val === 'auto' || isBoolean(val) || isArray(val);
    },

    _uiSetSortable: function () {
        var columns       = this._sortable || [],
            sortableClass = this.getClassName('sortable', 'column'),
            ascClass      = this.getClassName('sorted'),
            descClass     = this.getClassName('sorted', 'desc'),
            linerClass    = this.getClassName('sort', 'liner'),
            i, len, col, node, content;

        this.get('boundingBox').toggleClass(
            this.getClassName('sortable'),
            columns.length);

        // TODO: this.head.render() + decorate cells?
        this._theadNode.all('.' + sortableClass)
            .removeClass(sortableClass)
            .removeClass(ascClass)
            .removeClass(descClass)
            .each(function (th) {
                var liner = th.one('.' + linerClass);

                if (liner) {
                    liner.replace(liner.get('childNodes').toFrag());
                }
            });

        for (i = 0, len = columns.length; i < len; ++i) {
            col  = columns[i];
            node = this._theadNode.one('#' + col._yuid);

            if (node) {
                node.addClass(sortableClass);
                if (col.sortDir) {
                    node.addClass(ascClass);

                    if (col.sortDir === -1) {
                        node.addClass(descClass);
                    }
                }

                Y.Node.create('<div class="' + linerClass + '"></div>')
                    .append(node.get('childNodes').toFrag())
                    .appendTo(node);
            }
        }
    },

    _validateSortBy: function (val) {
        return val === null ||
               isString(val) ||
               isObject(val, true) ||
               (isArray(val) && (isString(val[0]) || isObject(val, true)));
    }

}, true);

Y.DataTable.Sortable = Sortable;

Y.Base.mix(Y.DataTable, [Sortable]);


}, '@VERSION@' ,{requires:['datatable-base'], lang:['en']});
