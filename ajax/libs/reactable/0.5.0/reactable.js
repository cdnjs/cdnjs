/** @jsx React.DOM */
Reactable = (function() {
    "use strict";

    // Array.prototype.map polyfill - see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map#Polyfill
    if (!Array.prototype.map) {
        Array.prototype.map = function(fun /*, thisArg */) {
            "use strict";

            if (this === void 0 || this === null) {
                throw new TypeError();
            }

            var t = Object(this);
            var len = t.length >>> 0;
            if (typeof fun !== "function") {
                throw new TypeError();
            }

            var res = new Array(len);
            var thisArg = arguments.length >= 2 ? arguments[1] : void 0;
            for (var i = 0; i < len; i++) {
                // NOTE: Absolute correctness would demand Object.defineProperty
                //       be used.  But this method is fairly new, and failure is
                //       possible only if Object.prototype or Array.prototype
                //       has a property |i| (very unlikely), so use a less-correct
                //       but more portable alternative.
                if (i in t) {
                    res[i] = fun.call(thisArg, t[i], i, t);
                }
            }

            return res;
        };
    }

    // Array.prototype.indexOf polyfill for IE8
    if (!Array.prototype.indexOf)
    {
          Array.prototype.indexOf = function(elt /*, from*/)
          {
                var len = this.length >>> 0;

                var from = Number(arguments[1]) || 0;
                from = (from < 0)
                     ? Math.ceil(from)
                     : Math.floor(from);
                if (from < 0) {
                    from += len;
                }

                for (; from < len; from++)
                {
                    if (from in this && this[from] === elt) {
                        return from;
                    }
                }
                return -1;
          };
    }

    // Array.prototype.find polyfill - see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/find
    if (!Array.prototype.find) {
        Object.defineProperty(Array.prototype, 'find', {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function(predicate) {
                if (this == null) {
                    throw new TypeError('Array.prototype.find called on null or undefined');
                }
                if (typeof predicate !== 'function') {
                    throw new TypeError('predicate must be a function');
                }
                var list = Object(this);
                var length = list.length >>> 0;
                var thisArg = arguments[1];
                var value;

                for (var i = 0; i < length; i++) {
                    if (i in list) {
                        value = list[i];
                        if (predicate.call(thisArg, value, i, list)) {
                            return value;
                        }
                    }
                }
                return undefined;
            }
        });
    }

    if (!Array.isArray) {
        Array.isArray = function (value) {
            return Object.prototype.toString.call(value) === '[object Array]';
        };
    }

    var Reactable = {};

    function Unsafe(content) {
        this.content = content;
    }

    Unsafe.prototype.toString = function() {
        return this.content;
    }

    Reactable.unsafe = function(str) {
        return new Unsafe(str);
    }

    Reactable.Sort = {
        Numeric: function(a, b) {
            var valA = parseFloat(a.toString().replace(',', ''));
            var valB = parseFloat(b.toString().replace(',', ''));

            // Sort non-numeric values alphabetically at the bottom of the list
            if (isNaN(valA) && isNaN(valB)) {
                valA = a;
                valB = b;
            } else {
                if (isNaN(valA)) {
                    return 1;
                }
                if (isNaN(valB)) {
                    return -1;
                }
            }

            if (valA < valB) {
                return -1;
            }
            if (valA > valB) {
                return 1;
            }

            return 0;
        },

        Currency: function(a, b) {
            // Parse out dollar signs, then do a regular numeric sort
            // TODO: handle non-American currency

            if (a[0] === '$') {
                a = a.substring(1);
            }
            if (b[0] === '$') {
                b = b.substring(1);
            }

            return Reactable.Sort.Numeric(a, b);
        },

        Date: function(a, b) {
            // Note: this function tries to do a standard javascript string -> date conversion
            // If you need more control over the date string format, consider using a different
            // date library and writing your own function
            var valA = Date.parse(a);
            var valB = Date.parse(b);

            // Handle non-date values with numeric sort
            // Sort non-numeric values alphabetically at the bottom of the list
            if (isNaN(valA) || isNaN(valB)) {
                return Reactable.Sort.Numeric(a, b);
            }

            if (valA > valB) {
                return 1;
            }
            if (valB > valA) {
                return -1;
            }

            return 0;
        },

        CaseInsensitive: function(a, b) {
            var valA = a.toLowerCase();
            var valB = b.toLowerCase();

            if(valA > valB) {
                return 1;
            }

            if(valB > valA) {
                return -1;
            }

            return 0;
        },
    };

    var Td = Reactable.Td = React.createClass({displayName: 'Td',
        handleClick: function(e){
            if (typeof this.props.handleClick !== 'undefined') {
                return this.props.handleClick(e, this);
            }
        },
        getDefaultProps: function() {
            var props = this.props;
            if (
                typeof(props.data) === 'undefined' &&
                typeof(this.props.children) === 'string'
            ) {
                props.data = this.props.children;
            }

            // Attach any properties on the column to this Td object to allow things like custom event handlers
            for (var key in this.props.column) {
                if (key !== 'key' && key !== 'name') {
                    props[key] = this.props.column[key];
                }
            }

            return props;
        },
        render: function() {
            if (typeof(this.props.children) !== 'undefined') {
                if (this.props.children instanceof Unsafe) {
                    return this.transferPropsTo(
                        React.DOM.td(
                            {'data-column':this.props.column.key,
                            className:this.props.className,
                            onClick:this.handleClick,
                            dangerouslySetInnerHTML:{ __html: this.props.children.toString() }
                        } )
                    );
                } else {
                    return this.transferPropsTo(
                        React.DOM.td(
                            {'data-column':this.props.column.key,
                            className:this.props.className,
                            onClick:this.handleClick}, 
                            this.props.children
                        )
                    );
                }
            } else {
                return this.transferPropsTo(React.DOM.td(null));
            }
        }
    });


    var Tr = Reactable.Tr = React.createClass({displayName: 'Tr',
        statics: {
            childNode: Td,
            dataType: 'object'
        },
        getDefaultProps: function() {
            var defaultProps = {
                childNode: Td,
                columns: [],
                data: {}
            }

            return defaultProps;
        },
        render: function() {
            var children = this.props.children || [];

            if (
                this.props.data &&
                this.props.columns &&
                typeof this.props.columns.map === 'function'
            ) {
                children = children.concat(this.props.columns.map(function(column, i) {
                    if (this.props.data.hasOwnProperty(column.key)) {
                        return Td( {column:column, key:column.key}, this.props.data[column.key]);
                    } else {
                        return Td( {column:column, key:column.key} );
                    }
                }.bind(this)));
            }

            return this.transferPropsTo(
                React.DOM.tr(null, children)
            );
        }
    });

    var Thead = Reactable.Thead = React.createClass({displayName: 'Thead',
        getColumns: function() {
            return React.Children.map(this.props.children, function(th) {
                if (typeof th.props.children === 'string') {
                    return th.props.children;
                } else {
                    throw new TypeError('<th> must have a string child');
                }
            });
        },
        render: function() {
            return this.transferPropsTo(
                React.DOM.thead(null, 
                    this.props.filtering === true ?
                        Filterer(
                            {colSpan:this.props.columns.length,
                            onFilter:this.props.onFilter}) : '',
                    
                    React.DOM.tr( {className:"reactable-column-header"}, 
                        this.props.columns.map(function(column, index) {
                            var sortClass = '';

                            if (this.props.sort.column === column.key) {
                                sortClass = 'reactable-header-sort';
                                if (this.props.sort.direction === 1) {
                                    sortClass += '-asc';
                                }
                                else {
                                    sortClass += '-desc';
                                }
                            }

                            return (
                                React.DOM.th(
                                    {className:sortClass,
                                    key:index,
                                    onClick:function(){ this.props.onSort(column.key) }.bind(this)}, column.label)
                            );
                        }.bind(this))
                    )
                )
            );
        }
    });

    var Th = Reactable.Th = React.createClass({displayName: 'Th',
        render: function() {
            return this.transferPropsTo(React.DOM.th(null, this.props.children));
        }
    });

    var FiltererInput = React.createClass({displayName: 'FiltererInput',
        render: function() {
            return (
                React.DOM.input( {type:"text", className:"reactable-filter-input",
                    onKeyUp:function(){
                        this.props.onFilter(this.getDOMNode().value);
                    }.bind(this)} )
            );
        },
    });

    var Filterer = React.createClass({displayName: 'Filterer',
        render: function() {
            if (typeof this.props.colSpan === 'undefined') {
                throw new TypeError('Must pass a colSpan argument to Filterer');
            }

            return (
                React.DOM.tr( {className:"reactable-filterer"}, 
                    React.DOM.td( {colSpan:this.props.colSpan}, 
                        FiltererInput( {onFilter:this.props.onFilter})
                    )
                )
            );
        },
    });

    var Paginator = React.createClass({displayName: 'Paginator',
        render: function() {
            if (typeof this.props.colSpan === 'undefined') {
                throw new TypeError('Must pass a colSpan argument to Paginator');
            }

            if (typeof this.props.numPages === 'undefined') {
                throw new TypeError('Must pass a non-zero numPages argument to Paginator');
            }

            if (typeof this.props.currentPage === 'undefined') {
                throw new TypeError('Must pass a currentPage argument to Paginator');
            }

            var pageButtons = [];
            for (var i = 0; i < this.props.numPages; i++) {
                var pageNum = i;
                var className = "reactable-page-button";
                if (this.props.currentPage === i) {
                    className += " reactable-current-page";
                }

                pageButtons.push(
                    React.DOM.a( {className:className, key:i,
                       // create function to get around for-loop closure issue
                       onClick:(function(pageNum) {
                           return function() {
                               this.props.onPageChange(pageNum);
                           }.bind(this)
                       }.bind(this))(i)}, i + 1)
                );
            }

            return (
                React.DOM.tbody( {className:"reactable-pagination"}, 
                    React.DOM.tr(null, 
                        React.DOM.td( {colSpan:this.props.colSpan}, 
                            pageButtons
                        )
                    )
                )
            );
        }
    });

    var Table = Reactable.Table = React.createClass({displayName: 'Table',
        // Translate a user defined column array to hold column objects if strings are specified
        // (e.g. ['column1'] => [{key: 'column1', label: 'column1'}])
        translateColumnsArray: function(columns) {
            return columns.map(function(column, i) {
                if (typeof(column) === 'string') {
                    return {
                        key:   column,
                        label: column
                    };
                } else {
                    return column;
                }
            });
        },
        parseChildData: function() {
            var data = [];

            // Transform any children back to a data array
            if (typeof(this.props.children) !== 'undefined') {
                React.Children.forEach(this.props.children, function(child) {
                    if (child.type.ConvenienceConstructor !== Tr) {
                        return; // (continue)
                    }

                    var childData = child.props.data || {};

                    // Given our modification of Array.prototype, this is the
                    // best way to check if child.props.children is an array
                    if (
                        typeof(child.props.children) !== 'undefined' &&
                        typeof(child.props.children.map) === 'function'
                    ) {

                        var childChildren = child.props.children;
                        for (var i = 0; i < childChildren.length; i++) {
                            var descendant = childChildren[i];
                            if (descendant.type.ConvenienceConstructor === Td) {
                                if (typeof(descendant.props.column) !== 'undefined') {
                                    if (typeof(descendant.props.data) !== 'undefined') {

                                        childData[descendant.props.column] =
                                            descendant.props.data;
                                    } else if (
                                        typeof(descendant.props.children) !== 'undefined'
                                    ) {
                                        childData[descendant.props.column] =
                                            descendant.props.children;
                                    } else {
                                        console.warn('Reactable.Td specified without ' +
                                                'a `data` property or children, ' +
                                                'ignoring');
                                    }
                                } else {
                                    console.warn('Reactable.Td specified without a ' +
                                            '`column` property, ignoring');
                                }
                            }
                        }
                    }

                    data.push(childData);
                }.bind(this));
            }

            return data;
        },
        getDefaultProps: function() {
            var data = this.props.data || [];
            var defaultProps = {
                data: data.concat(this.parseChildData()),
                columns: [],
                sortable: [],
                filterable: [],
                defaultSort: false,
                itemsPerPage: 0,
                _sortable: [],
            }

            // Transform sortable properties into a more friendly list
            for (var i in this.props.sortable) {
                var column = this.props.sortable[i];
                var columnName, sortFunction;

                if (column instanceof Object) {
                    if (typeof(column.column) !== 'undefined') {
                        columnName = column.column;
                    } else {
                        console.warn('Sortable column specified without column name');
                        return;
                    }

                    if (typeof(column.sortFunction) !== 'undefined' && column.sortFunction instanceof Function) {
                        sortFunction = column.sortFunction;
                    } else {
                        sortFunction = 'default';
                    }
                } else {
                    columnName      = column;
                    sortFunction    = 'default';
                }

                defaultProps._sortable[columnName] = sortFunction;
            }

            return defaultProps;
        },
        getInitialState: function() {
            var initialState = {
                currentPage: 0,
                currentSort: {
                    column: null,
                    direction: 1,
                },
                filter: '',
            }

            // Set the state of the current sort to the default sort
            if (this.props.defaultSort !== false) {
                var column = this.props.defaultSort;
                var currentSort = {};

                if (column instanceof Object) {
                    var columnName, sortDirection;

                    if (typeof(column.column) !== 'undefined') {
                        columnName = column.column;
                    } else {
                        console.warn('Default column specified without column name');
                        return;
                    }

                    if (typeof(column.direction) !== 'undefined') {
                        if (column.direction === 1 || column.direction === 'asc') {
                            sortDirection = 1;
                        } else if (column.direction === -1 || column.direction === 'desc') {
                            sortDirection = -1;
                        } else {
                            console.warn('Invalid default sort specified.  Defaulting to ascending');
                            sortDirection = 1;
                        }
                    } else {
                        sortFunction = 1;
                    }
                } else {
                    columnName      = column;
                    sortDirection   = 1;
                }

                initialState.currentSort = {
                    column: columnName,
                    direction: sortDirection
                };
            }

            return initialState;
        },
        componentWillMount: function(){
            this.sortByCurrentSort();
        },
        onPageChange: function(page) {
            this.setState({ currentPage: page });
        },
        onFilter: function(filter) {
            this.setState({ filter: filter });
        },
        applyFilter: function(filter, children) {
            // Helper function to apply filter text to a list of table rows
            var filter = filter.toLowerCase();
            var matchedChildren = [];

            for (var i = 0; i < children.length; i++) {
                var data = children[i].props.data;

                for (var j = 0; j < this.props.filterable.length; j++) {
                    var filterColumn = this.props.filterable[j];

                    if (data[filterColumn].toString().toLowerCase().indexOf(filter) > -1) {
                        matchedChildren.push(children[i]);
                        break;
                    }
                }
            }

            return matchedChildren;
        },
        sortByCurrentSort: function(){
            // Apply a sort function according to the current sort in the state.
            // This allows us to perform a default sort even on a non sortable column.
            var currentSort = this.state.currentSort;

            if (currentSort.column === null) {
                return;
            }

            this.props.data.sort(function(a, b){
                var keyA = a[currentSort.column];
                var keyB = b[currentSort.column];

                // Default sort
                if (this.props._sortable[currentSort.column] === 'default') {
                    // Reverse direction if we're doing a reverse sort
                    if (keyA < keyB) {
                        return -1 * currentSort.direction;
                    }
                    if (keyA > keyB) {
                        return 1 * currentSort.direction;
                    }

                    return 0;
                }
                else{
                    // Reverse columns if we're doing a reverse sort
                    if (currentSort.direction === 1) {
                        return this.props._sortable[currentSort.column](keyA, keyB);
                    } else {
                        return this.props._sortable[currentSort.column](keyB, keyA);
                    }
                }
            }.bind(this));
        },
        onSort: function(column){
            // Don't perform sort on unsortable columns
            if (typeof(this.props._sortable[column]) === 'undefined') {
                return;
            }

            var currentSort = this.state.currentSort;

            if (currentSort.column === column) {
                currentSort.direction *= -1;
            } else {
                currentSort.column = column;
                currentSort.direction = 1;
            }

            // Set the current sort and pass it to the sort function
            this.setState({ currentSort: currentSort });
            this.sortByCurrentSort();
        },
        render: function() {
            // Test if the caller passed in data
            var children = [];
            var columns;
            var userColumnsSpecified = false;

            if (
                this.props.children &&
                this.props.children.length > 0 &&
                this.props.children[0].type.ConvenienceConstructor === Thead
            ) {
                columns = this.props.children[0].getColumns();
            } else {
                columns = this.props.columns || [];
            }

            if (columns.length > 0) {
                userColumnsSpecified = true;
                columns = this.translateColumnsArray(columns);
            }

            // Build up table rows
            if (this.props.data && typeof this.props.data.map === 'function') {
                // Build up the columns array
                children = children.concat(this.props.data.map(function(data, i) {
                    // Loop through the keys in each data row and build a td for it
                    for (var k in data) {
                        if (data.hasOwnProperty(k)) {
                            // Update the columns array with the data's keys if columns were not already specified
                            if (userColumnsSpecified === false) {
                                var column = {
                                    key:   k,
                                    label: k
                                };

                                // Only add a new column if it doesn't already exist in the columns array
                                if (columns.find(function(element){return element.key === column.key}) === undefined) {
                                    columns.push(column);
                                }
                            }
                        }
                    }

                    return (
                        Tr( {columns:columns, key:i, data:data} )
                    );
                }.bind(this)));
            }

            if (this.props.sortable === true) {
                for (var i = 0; i < columns.length; i++) {
                    this.props._sortable[columns[i].key] = 'default';
                }
            }

            // Determine if we render the filter box
            var filtering = false;
            if (this.props.filterable && Array.isArray(this.props.filterable) && this.props.filterable.length > 0) {
                filtering = true;
            }

            // Apply filters
            var filteredChildren = children;
            if (this.state.filter !== '') {
                filteredChildren = this.applyFilter(this.state.filter, filteredChildren);
            }

            // Determine pagination properties and which columns to display
            var itemsPerPage = 0;
            var pagination = false;

            var currentChildren = filteredChildren;
            if (this.props.itemsPerPage > 0) {
                itemsPerPage = this.props.itemsPerPage;
                pagination = true;
                currentChildren = filteredChildren.slice(
                        this.state.currentPage * itemsPerPage,
                        (this.state.currentPage + 1) * itemsPerPage);
            }

            return this.transferPropsTo(
                React.DOM.table(null, 
                    columns && columns.length > 0 ?
                        Thead(
                            {columns:columns,
                            filtering:filtering,
                            onFilter:this.onFilter,
                            sort:this.state.currentSort,
                            onSort:this.onSort} )
                        : '',
                    
                    React.DOM.tbody( {className:"reactable-data"}, 
                        currentChildren
                    ),
                    pagination === true ?
                        Paginator(
                            {colSpan:columns.length,
                            numPages:Math.ceil(filteredChildren.length / itemsPerPage),
                            currentPage:this.state.currentPage,
                            onPageChange:this.onPageChange}) : ''
                    
                )
            );
        }
    });

    return Reactable;
}());

