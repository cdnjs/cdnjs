/**
 * Sort and paginate tabular data
 * @module Ink.UI.Table_1
 * @version 1
 */
Ink.createModule('Ink.UI.Table', '1', ['Ink.Util.Url_1','Ink.UI.Pagination_1','Ink.Net.Ajax_1','Ink.UI.Common_1','Ink.Dom.Event_1','Ink.Dom.Css_1','Ink.Dom.Element_1','Ink.Dom.Selector_1','Ink.Util.Array_1','Ink.Util.String_1', 'Ink.Util.Json_1'], function(InkUrl,Pagination, Ajax, Common, Event, Css, Element, Selector, InkArray, InkString, Json) {
    'use strict';

    var rNumber = /\d/g;
    // Turn into a number, if we can. For sorting data which could be numeric or not.
    function maybeTurnIntoNumber(value) {
        if( !isNaN(value) && rNumber.test(value) ){
            return parseInt(value, 10);
        } else if( !isNaN(value) ){
            return parseFloat(value);
        }
        return value;
    }
    function cmp (a, b) {
        if( a === b ){
            return 0;
        }
        return ( ( a > b ) ? 1 : -1 );
    }
    // cmp function for comparing data which might be a number.
    function numberishEnabledCmp (a, b) {
        var aValue = maybeTurnIntoNumber(Element.textContent(a));
        var bValue = maybeTurnIntoNumber(Element.textContent(b));

        if (typeof aValue === typeof bValue) {
            return cmp(aValue, bValue);
        } else {
            if (typeof aValue === 'number') {  // Numbers always go first, then letters.
                return 1;
            } else {
                return -1;
            }
        }

        return cmp(aValue, bValue);
    }
    // Object.keys polyfill
    function keys(obj) {
        if (typeof Object.keys !== 'undefined') {
            return Object.keys(obj);
        }
        var ret = [];
        for (var k in obj) if (obj.hasOwnProperty(k)) {
            ret.push(k);
        }
        return ret;
    }

    /**
     * The Table component transforms the native/DOM table element into a sortable, paginated component.
     * You can use this component to display data from a JSON endpoint, or from table rows in the DOM. Displaying from the DOM is more practical, but sometimes you don't want to load everything at once (if you have a HUGE table). In those cases, you should configure Ink.UI.Table to get data from JSON endpoint.
     * To enable sorting, just set the `data-sortable` attribute of your table headers (they must be in the `thead` of the table) to "true". To enable pagination, you should pass either an `Ink.UI.Pagination` instance or a selector to create the Ink.UI.Pagination element on.
     *
     * @class Ink.UI.Table
     * @constructor
     * @version 1
     * @param {String|Element}      selector                                Your `table` element.
     * @param {Object}              [options] Options object containing:
     * @param {Number}              [options.pageSize]                      Number of rows per page. Omit to avoid paginating.
     * @param {String}              [options.endpoint]                      Endpoint to get the records via AJAX. Omit if you don't want to do AJAX
     * @param {Function}            [options.createEndpointURL]             Callback to customise what URL the AJAX endpoint is at. Receives three arguments: base (the "endpoint" option), sort (`{ order: 'asc' or 'desc', field: fieldname }`) and page ({ page: page number, size: items per page })
     * @param {Function}            [options.getDataFromEndpoint]           Callback to allow the user to retrieve the data himself given an URL.  Must accept two arguments: `url` and `callback`. This `callback` will take as a single argument a JavaScript object.
     * @param {Function}            [options.processJSONRows]               Retrieve an array of rows from the data which came from AJAX.
     * @param {Function}            [options.processJSONHeaders]            Get an object with all the headers' names as keys, and a { label, sortable } object as value.  Example: `{col1: {label: "Column 1"}, col2: {label: "Column 2", sortable: true}`.  Takes a single argument, the JSON response.
     * @param {Function}            [options.processJSONRow]                Process a row object before it gets on the table.
     * @param {Function}            [options.processJSONField]              Process the field data before putting it on the table.  You can return HTML, a DOM element, or a string here.  Arguments you receive: `(column, fieldData, rowIndex)`.
     * @param {Function}            [options.processJSONField.FIELD_NAME]   The same as processJSONField, but for a particular field.
     * @param {Function}            [options.processJSONTotalRows]          A callback where you have a chance to say how many rows are in the dataset (not only on this page) you have on the collection. You get as an argument the JSON response.
     * @param {Function}            [options.getSortKey]                    A function taking a `{ columnIndex, columnName, data, element }` object and returning a value which serves as a sort key for the sorting operation. For example, if you want to sort by a `data-sort-key` atribute, set `getSortKey` to: function (cell) { return cell.element.getAttribute('data-sort-key'); }
     * @param {Function}            [options.getSortKey.FIELD_NAME]         Same as `options.getSortKey`, but for a particular field.
     * @param {Object}              [options.tdClassNames]                  An object mapping each field to what classes it gets.  Example: `{ name: "large-10", isBoss: "hide-small" }`
     * @param {Mixed}               [options.pagination]                    Pagination instance, element or selector.
     * @param {Object}              [options.paginationOptions]             Override the options with which we instantiate the Ink.UI.Pagination.
     * @param {Boolean}             [options.allowResetSorting]             Allow sort order to be set to "none" in addition to "ascending" and "descending"
     * @param {String|Array}        [options.visibleFields]                 Set of fields which get shown on the table
     *
     * @sample Ink_UI_Table_1.html
     */
    function Table(){
        Common.BaseUIComponent.apply(this, arguments);
    }

    Table._name = 'Table_1';

    // Most processJSON* functions can just default to this.
    function sameSame(obj) { return obj; }

    Table._optionDefinition = {
        pageSize: ['Integer', null],
        caretUpClass: ['String', 'fa fa-caret-up'],
        caretDownClass: ['String', 'fa fa-caret-down'],
        endpoint: ['String', null],
        createEndpointUrl: ['Function', null],  // Deprecated misspelled option
        createEndpointURL: ['Function', null /* default func uses above option */],
        getDataFromEndPoint: ['Function', null],  // Deprecated mis-cased option
        getDataFromEndpoint: ['Function', null /* by default use plain ajax for JSON */],
        processJSONRows: ['Function', function (dt) { return typeof dt.length === 'number' ? dt : (dt.rows || null); }],
        processJSONRow: ['Function', sameSame],
        processJSONField: ['Function', sameSame],
        processJSONHeaders: ['Function', function (dt) { return dt.fields; }],
        processJSONTotalRows: ['Function', function (dt) { return dt.totalRows || dt.length; }],
        getSortKey: ['Function', null],
        pagination: ['Element', null],
        allowResetSorting: ['Boolean', false],
        visibleFields: ['String', null],
        tdClassNames: ['Object', {}],
        paginationOptions: ['Object', null]
    };

    Table.prototype = {
        _validate: function () {
            if( this._element.nodeName.toLowerCase() !== 'table' ){
                throw new Error('[Ink.UI.Table] :: The element is not a table');
            }
        },
        /**
         * Init function called by the constructor
         * 
         * @method _init
         * @private
         */
        _init: function(){
            // Historic aliases
            if (this._options.createEndpointUrl) {
                this._options.createEndpointURL = this._options.createEndpointUrl;
            }
            if (this._options.getDataFromEndPoint) {
                this._options.getDataFromEndpoint = this._options.getDataFromEndpoint;
            }

            /**
             * Checking if it's in markup mode or endpoint mode
             */
            this._markupMode = !(this._options.endpoint || this._options.createEndpointURL);

            if( this._options.visibleFields ){
                this._options.visibleFields = this._options.visibleFields.toString().split(/[, ]+/g);
            }

            this._thead = this._element.tHead || this._element.createTHead();
            this._headers = Selector.select('th', this._thead);

            /**
             * Initializing variables
             */
            this._handlers = {
                thClick: null
            };
            this._originalFields = [
                // field headers from the DOM
            ];
            this._sortableFields = {
                // Identifies which columns are sorted and how.
                // columnIndex: 'none'|'asc'|'desc'
            };
            this._originalData = this._data = [];
            this._pagination = null;
            this._totalRows = 0;

            this._handlers.thClick = Event.on(this._element, 'click',
                    'thead th[data-sortable="true"]',
                    Ink.bindMethod(this, '_onThClick'));

            /**
             * If not is in markup mode, we have to do the initial request
             * to get the first data and the headers
             */
            if( !this._markupMode ) {
                /* Endpoint mode */
                this._getData(  );
            } else /* Markup mode */ {
                this._resetSortOrder();
                this._addHeadersClasses();

                /**
                 * Getting the table's data
                 */
                this._data = Selector.select('tbody tr', this._element);
                this._originalData = this._data.slice(0);

                this._totalRows = this._data.length;

                /**
                 * Set pagination if options tell us to
                 */
                this._setPagination();
            }
        },

        /**
         * Add the classes in this._options.tdClassNames to our table headers.
         * @method _addHeadersClasses
         * @private
         */
        _addHeadersClasses: function () {
            var headerLabel;
            var classNames;
            for (var i = 0, len = this._headers.length; i < len; i++) {
                headerLabel = Element.textContent(this._headers[i]);
                classNames = this._options.tdClassNames[headerLabel];
                // TODO do not find header labels this way. But how?
                if (classNames) {
                    Css.addClassName(this._headers[i], classNames);
                }
            }
        },

        /**
         * Click handler. This will mainly handle the sorting (when you click in the headers)
         * 
         * @method _onThClick
         * @param {Event} event Event obj
         * @private
         */
        _onThClick: function( event ){
            var tgtEl = Event.element(event),
                paginated = this._options.pageSize !== undefined;

            Event.stopDefault(event);

            var index = InkArray.keyValue(tgtEl, this._headers, true);
            var sortable = index !== false && this._sortableFields[index] !== undefined;

            if( !sortable ){
                return;
            }

            if( !this._markupMode && paginated ){
                this._invertSortOrder(index, false);
            } else {
                if ( (this._sortableFields[index] === 'desc') && this._options.allowResetSorting ) {
                    this._setSortOrderOfColumn(index, null);
                    this._data = this._originalData.slice(0);
                } else {
                    this._invertSortOrder(index, true);
                }

                var tbody = Selector.select('tbody',this._element)[0];
                InkArray.each(this._data, function (row) {
                    tbody.appendChild(row);
                });

                if (this._pagination) {
                    this._pagination.setCurrent(0);
                    this._paginate(1);
                }
            }
        },

        _invertSortOrder: function (index, sortAndReverse) {
            var isAscending = this._sortableFields[index] === 'asc';

            // Reset the sort order of everything
            for (var i = 0, len = this._headers.length; i < len; i++) {
                this._setSortOrderOfColumn(i, null);
            }
            // Except for the index we're looking at
            this._setSortOrderOfColumn(index, !isAscending);

            if (sortAndReverse) {
                this._sort(index);
                if (isAscending) {
                    this._data.reverse();
                }
            } else {
                this._getData();
            }
        },

        _setSortOrderOfColumn: function(index, up) {
            var header = this._headers[index];
            var caretHtml = [''];
            var order = 'none';

            if (up === true) {
                caretHtml = ['<i class="', this._options.caretUpClass, '"></i>'];
                order = 'asc';
            } else if (up === false) {
                caretHtml = ['<i class="', this._options.caretDownClass, '"></i>'];
                order = 'desc';
            }

            this._sortableFields[index] = order;
            header.innerHTML = Element.textContent(header) + caretHtml.join('');
        },

        /**
         * Applies and/or changes the CSS classes in order to show the right columns
         * 
         * @method _paginate
         * @param {Number} page Current page
         * @private
         */
        _paginate: function( page ){
            if (!this._pagination) { return; }

            var pageSize = this._options.pageSize;

            // Hide everything except the items between these indices
            var firstIndex = (page - 1) * pageSize;
            var lastIndex = firstIndex + pageSize;

            InkArray.each(this._data, function(item, index){
                if (index >= firstIndex && index < lastIndex) {
                    Css.removeClassName(item,'hide-all');
                } else {
                    Css.addClassName(item,'hide-all');
                }
            });

        },

        /* register fields into this._originalFields, whether they come from JSON or a table.
         * @method _registerFieldNames
         * @private
         * @param [names] The field names in an array
         **/
        _registerFieldNames: function (names) {
            this._originalFields = [];

            InkArray.forEach(names, Ink.bind(function (field) {
                if( !this._fieldIsVisible(field) ){
                    return;  // The user deems this not to be necessary to see.
                }
                this._originalFields.push(field);
            }, this));
        },

        _fieldIsVisible: function (field) {
            return !this._options.visibleFields ||
                (this._options.visibleFields.indexOf(field) !== -1);
        },

        /**
         * Sorts by a specific column.
         * 
         * @method _sort
         * @param {Number} index Column number (starting at 0)
         * @private
         */
        _sort: function( index ){
            // TODO this is THE worst way to declare field names. Incompatible with i18n and a lot of other things.
            var fieldName = Element.textContent(this._headers[index]);
            var keyFunction = this._options.getSortKey;

            if (keyFunction) {
                keyFunction =
                    typeof keyFunction[fieldName] === 'function' ?
                        keyFunction[fieldName] :
                    typeof keyFunction === 'function' ?
                        keyFunction :
                        null;
            }

            var self = this;

            this._data.sort(function (trA, trB) {
                var elementA = Ink.ss('td', trA)[index];
                var elementB = Ink.ss('td', trB)[index];
                if (keyFunction) {
                    return cmp(userKey(elementA), userKey(elementB));
                } else {
                    return numberishEnabledCmp(elementA, elementB, index);
                }
            });

            function userKey(element) {
                return keyFunction.call(self, {
                    columnIndex: index,
                    columnName: fieldName,
                    data: Element.textContent(element),
                    element: element
                });
            }
        },

        /**
         * Assembles the headers markup
         *
         * @method _createHeadersFromJson
         * @param  {Object} headers Key-value object that contains the fields as keys, their configuration (label and sorting ability) as value
         * @private
         */
        _createHeadersFromJson: function( headers ){
            this._registerFieldNames(keys(headers));

            if (this._thead.children.length) { return; }

            var tr = this._thead.insertRow(0);
            var th;

            for (var i = 0, len = headers.length; i < len; i++) {
                if (this._fieldIsVisible(headers[i])) {
                    th = Element.create('th');
                    th = this._createSingleHeaderFromJson(headers[i], th);
                    tr.appendChild(th);
                    this._headers.push(th);
                }
            }
        },

        _createSingleHeaderFromJson: function (header, th) {
            if (header.sortable) {
                th.setAttribute('data-sortable','true');
            }

            if (header.label){
                Element.setTextContent(th, header.label);
            }

            return th;
        },

        /**
         * Reset the sort order as marked on the table headers to "none"
         *
         * @method _resetSortOrder
         * @private
         */
        _resetSortOrder: function(){
            /**
             * Setting the sortable columns and its event listeners
             */
            for (var i = 0, len = this._headers.length; i < len; i++) {
                var dataset = Element.data( this._headers[i] );
                if (dataset.sortable && dataset.sortable.toString() === 'true') {
                    this._sortableFields[i] = 'none';
                }
            }
        },

        /**
         * This method gets the rows from AJAX and places them as <tr> and <td>
         *
         * @method _createRowsFromJSON
         * @param  {Object} rows Array of objects with the data to be showed
         * @private
         */
        _createRowsFromJSON: function( rows ){
            var tbody = Selector.select('tbody',this._element)[0];

            if( !tbody ){
                tbody = document.createElement('tbody');
                this._element.appendChild( tbody );
            } else {
                Element.setHTML(tbody, '');
            }

            this._data = [];
            var row;

            for (var trIndex in rows) {
                if (rows.hasOwnProperty(trIndex)) {
                    row = this._options.processJSONRow(rows[trIndex]);
                    this._createSingleRowFromJson(tbody, row, trIndex);
                }
            }

            this._originalData = this._data.slice(0);
        },

        _createSingleRowFromJson: function (tbody, row, rowIndex) {
            var tr = document.createElement('tr');
            tbody.appendChild( tr );
            for( var field in row ){
                if (row.hasOwnProperty(field)) {
                    this._createFieldFromJson(tr, row[field], field, rowIndex);
                }
            }
            this._data.push(tr);
        },

        _createFieldFromJson: function (tr, fieldData, fieldName, rowIndex) {
            if (!this._fieldIsVisible(fieldName)) { return; }

            var processor =
                this._options.processJSONField[fieldName] ||  // per-field callback
                this._options.processJSONField;  // generic callback

            var result;
            if (typeof processor === 'function') {
                result = processor(fieldData, fieldName, rowIndex);
            } else {
                result = fieldData;
            }
            var elm = this._elOrFieldData(result);

            var className = this._options.tdClassNames[fieldName];
            if (className) {
                Css.addClassName(elm, className);
            }

            tr.appendChild(elm);
        },

        _elOrFieldData: function (processed) {
            if (Common.isDOMElement(processed)) {
                return processed;
            }

            var isString = typeof processed === 'string';
            var isNumber = typeof processed === 'number';
            var elm = Element.create('td');

            if (isString && /^\s*?</.test(processed)) {
                Element.setHTML(elm, processed);
            } else if (isString || isNumber) {
                Element.setTextContent(elm, processed);
            } else {
                throw new Error('Ink.UI.Table Unknown result from processJSONField: ' + processed);
            }

            return elm;
        },

        /**
         * Sets the AJAX endpoint.
         * Useful to change the endpoint in runtime.
         *
         * @method setEndpoint
         * @param {String} endpoint New endpoint
         * @param {Number} currentPage If you pass this, setCurrent will also be called.
         * @return {void}
         * @public
         */
        setEndpoint: function( endpoint, currentPage ){
            if( !this._markupMode ){
                this._options.endpoint = endpoint;
                if (this._pagination) {
                    this._pagination.setCurrent(currentPage ? parseInt(currentPage,10) : 0 );
                }
            }
        },

        /**
         * Sets the instance's pagination, if necessary.
         *
         * Precondition: this._totalRows needs to be known.
         *
         * @method _setPagination
         * @private
         */
        _setPagination: function(){
            /* If user doesn't say they want pagination, bail. */
            if( this._options.pageSize == null ){ return; }

            /**
             * Fetch pagination from options. Can be a selector string, an element or a Pagination instance.
             */
            var paginationEl = this._options.pagination;

            if ( paginationEl instanceof Pagination ) {
                this._pagination = paginationEl;
                return;
            }

            if (!paginationEl) {
                paginationEl = Element.create('nav', {
                    className: 'ink-navigation',
                    insertAfter: this._element
                });
                Element.create('ul', {
                    className: 'pagination',
                    insertBottom: paginationEl
                });
            }

            var paginationOptions = Ink.extendObj({
                totalItemCount: this._totalRows,
                itemsPerPage: this._options.pageSize,
                onChange: Ink.bind(function (_, pageNo) {
                    this._paginate(pageNo + 1);
                }, this)
            }, this._options.paginationOptions || {});

            this._pagination = new Pagination(paginationEl, paginationOptions);

            this._paginate(1);
        },

        /**
         * Method to choose which is the best way to get the data based on the endpoint:
         *     - AJAX
         *     - JSONP
         *
         * @method _getData
         * @private
         */
        _getData: function( ){
            var sortOrder = this._getSortOrder() || null;
            var page = null;

            if (this._options.pageSize) {
                page = {
                    size: this._options.pageSize,
                    page: this._pagination ? this._pagination.getCurrent() + 1 : 1
                };
            }

            this._getDataViaAjax( this._getUrl( sortOrder, page) );
        },

        /**
         * Return an object describing sort order { field: [field name] ,
         * order: ["asc" or "desc"] }, or null if there is no sorting
         * going on.
         * @method _getSortOrder
         * @private
         */
        _getSortOrder: function () {
            var index;
            for (index in this._sortableFields) if (this._sortableFields.hasOwnProperty(index)) {
                if( this._sortableFields[index] !== 'none' ){
                    break;
                }
            }
            if (!index) {
                return null; // no sorting going on
            }
            return {
                field: this._originalFields[index] || Element.textContent(this._headers[index]),
                order: this._sortableFields[index]
            };
        },

        _getUrl: function (sort, page) {
            var urlCreator = this._options.createEndpointURL ||
                function (endpoint, sort, page
                        /* TODO implement filters too */) {
                    endpoint = InkUrl.parseUrl(endpoint);
                    endpoint.query = endpoint.query || {};

                    if (sort) {
                        endpoint.query.sortOrder = sort.order;
                        endpoint.query.sortField = sort.field;
                    }

                    if (page) {
                        endpoint.query['rows_per_page'] = page.size;
                        endpoint.query['page'] = page.page;
                    }

                    return InkUrl.format(endpoint);
                };

            var ret = urlCreator(this._options.endpoint, sort, page);

            if (typeof ret !== 'string') {
                throw new TypeError('Ink.UI.Table_1: ' +
                    'createEndpointUrl did not return a string!');
            }

            return ret;
        },

        /**
         * Gets the data via AJAX and calls this._onAjaxSuccess with the response.
         * 
         * Will call options.getDataFromEndpoint( Uri, callback ) if available.
         *
         * When done, calls _onAjaxSuccess
         *
         * @method _getDataViaAjax
         * @param {String} endpointUri Endpoint to get data from, after processing.
         * @private
         */
        _getDataViaAjax: function( endpointUri ){
            var success = Ink.bind(function( JSONData ){
                this._onAjaxSuccess( JSONData );
            }, this);

            if (!this._options.getDataFromEndpoint) {
                new Ajax( endpointUri, {
                    method: 'GET',
                    contentType: 'application/json',
                    sanitizeJSON: true,
                    onSuccess: Ink.bind(function( response ){
                        if( response.status === 200 ){
                            success(Json.parse(response.responseText));
                        }
                    }, this)
                });
            } else {
                this._options.getDataFromEndpoint( endpointUri, success );
            }
        },

        _onAjaxSuccess: function (jsonResponse) {
            var paginated = this._options.pageSize != null;
            var rows = this._options.processJSONRows(jsonResponse);
            this._headers = Selector.select('th', this._thead);

            // If headers not in DOM, get from JSON
            if( this._headers.length === 0 ) {
                var headers = this._options.processJSONHeaders(
                    jsonResponse);
                if (!headers || !headers.length || !headers[0]) {
                    throw new Error('Ink.UI.Table: processJSONHeaders option must return an array of objects!');
                }
                this._createHeadersFromJson( headers );
                this._resetSortOrder();
                this._addHeadersClasses();
            } else {
                this._resetSortOrder();
            }

            this._createRowsFromJSON( rows );

            this._totalRows = this._rowLength = rows.length;

            if( paginated ){
                this._totalRows = this._options.processJSONTotalRows(jsonResponse);
                this._setPagination( );
            }
        }
    };

    Common.createUIComponent(Table);

    return Table;

});
