/**
 * @module Ink.UI.Table_1
 * @author inkdev AT sapo.pt
 * @version 1
 */
Ink.createModule('Ink.UI.Table', '1', ['Ink.Net.Ajax_1','Ink.UI.Aux_1','Ink.Dom.Event_1','Ink.Dom.Css_1','Ink.Dom.Element_1','Ink.Dom.Selector_1','Ink.Util.Array_1','Ink.Util.String_1'], function(Ajax, Aux, Event, Css, Element, Selector, InkArray, InkString ) {
    'use strict';

    /**
     * The Table component transforms the native/DOM table element into a
     * sortable, paginated component.
     * 
     * @class Ink.UI.Table
     * @constructor
     * @version 1
     * @param {String|DOMElement} selector
     * @param {Object} [options] Options
     *     @param {Number}     options.pageSize       Number of rows per page.
     *     @param {String}     options.endpoint       Endpoint to get the records via AJAX
     * @example
     *      <table class="ink-table alternating" data-page-size="6">
     *          <thead>
     *              <tr>
     *                  <th data-sortable="true" width="75%">Pepper</th>
     *                  <th data-sortable="true" width="25%">Scoville Rating</th>
     *              </tr>
     *          </thead>
     *          <tbody>
     *              <tr>
     *                  <td>Trinidad Moruga Scorpion</td>
     *                  <td>1500000</td>
     *              </tr>
     *              <tr>
     *                  <td>Bhut Jolokia</td>
     *                  <td>1000000</td>
     *              </tr>
     *              <tr>
     *                  <td>Naga Viper</td>
     *                  <td>1463700</td>
     *              </tr>
     *              <tr>
     *                  <td>Red Savina Habanero</td>
     *                  <td>580000</td>
     *              </tr>
     *              <tr>
     *                  <td>Habanero</td>
     *                  <td>350000</td>
     *              </tr>
     *              <tr>
     *                  <td>Scotch Bonnet</td>
     *                  <td>180000</td>
     *              </tr>
     *              <tr>
     *                  <td>Malagueta</td>
     *                  <td>50000</td>
     *              </tr>
     *              <tr>
     *                  <td>Tabasco</td>
     *                  <td>35000</td>
     *              </tr>
     *              <tr>
     *                  <td>Serrano Chili</td>
     *                  <td>27000</td>
     *              </tr>
     *              <tr>
     *                  <td>Jalapeño</td>
     *                  <td>8000</td>
     *              </tr>
     *              <tr>
     *                  <td>Poblano</td>
     *                  <td>1500</td>
     *              </tr>
     *              <tr>
     *                  <td>Peperoncino</td>
     *                  <td>500</td>
     *              </tr>
     *          </tbody>
     *      </table>
     *      <nav class="ink-navigation"><ul class="pagination"></ul></nav>
     *      <script>
     *          Ink.requireModules( ['Ink.Dom.Selector_1','Ink.UI.Table_1'], function( Selector, Table ){
     *              var tableElement = Ink.s('.ink-table');
     *              var tableObj = new Table( tableElement );
     *          });
     *      </script>
     */
    var Table = function( selector, options ){

        /**
         * Get the root element
         */
        this._rootElement = Aux.elOrSelector(selector, '1st argument');

        if( this._rootElement.nodeName.toLowerCase() !== 'table' ){
            throw '[Ink.UI.Table] :: The element is not a table';
        }

        this._options = Ink.extendObj({
            pageSize: undefined,
            endpoint: undefined,
            loadMode: 'full',
            allowResetSorting: false,
            visibleFields: undefined
        },Element.data(this._rootElement));

        this._options = Ink.extendObj( this._options, options || {});

        /**
         * Checking if it's in markup mode or endpoint mode
         */
        this._markupMode = ( typeof this._options.endpoint === 'undefined' );

        if( !!this._options.visibleFields ){
            this._options.visibleFields = this._options.visibleFields.split(',');
        }

        /**
         * Initializing variables
         */
        this._handlers = {
            click: Ink.bindEvent(this._onClick,this)
        };
        this._originalFields = [];
        this._sortableFields = {};
        this._originalData = this._data = [];
        this._headers = [];
        this._pagination = null;
        this._totalRows = 0;

        this._init();
    };

    Table.prototype = {

        /**
         * Init function called by the constructor
         * 
         * @method _init
         * @private
         */
        _init: function(){

            /**
             * If not is in markup mode, we have to do the initial request
             * to get the first data and the headers
             */
             if( !this._markupMode ){
                this._getData( this._options.endpoint, true );
             } else{
                this._setHeadersHandlers();

                /**
                 * Getting the table's data
                 */
                InkArray.each(Selector.select('tbody tr',this._rootElement),Ink.bind(function(tr){
                    this._data.push(tr);
                },this));
                this._originalData = this._data.slice(0);

                this._totalRows = this._data.length;

                /**
                 * Set pagination if defined
                 * 
                 */
                if( ("pageSize" in this._options) && (typeof this._options.pageSize !== 'undefined') ){
                    /**
                     * Applying the pagination
                     */
                    this._pagination = this._rootElement.nextSibling;
                    while(this._pagination.nodeType !== 1){
                        this._pagination = this._pagination.nextSibling;
                    }

                    if( this._pagination.nodeName.toLowerCase() !== 'nav' ){
                        throw '[Ink.UI.Table] :: Missing the pagination markup or is mis-positioned';
                    }

                    var Pagination = Ink.getModule('Ink.UI.Pagination',1);

                    this._pagination = new Pagination( this._pagination, {
                        size: Math.ceil(this._totalRows/this._options.pageSize),
                        onChange: Ink.bind(function( pagingObj ){
                            this._paginate( (pagingObj._current+1) );
                        },this)
                    });

                    this._paginate(1);
                }
             }

        },

        /**
         * Click handler. This will mainly handle the sorting (when you click in the headers)
         * 
         * @method _onClick
         * @param {Event} event Event obj
         * @private
         */
        _onClick: function( event ){
            
            var
                tgtEl = Event.element(event),
                dataset = Element.data(tgtEl),
                index,i,
                paginated = ( ("pageSize" in this._options) && (typeof this._options.pageSize !== 'undefined') )
            ;
            if( (tgtEl.nodeName.toLowerCase() !== 'th') || ( !("sortable" in dataset) || (dataset.sortable.toString() !== 'true') ) ){
                return;
            }

            Event.stop(event);
            
            index = -1;
            if( InkArray.inArray( tgtEl,this._headers ) ){
                for( i=0; i<this._headers.length; i++ ){
                    if( this._headers[i] === tgtEl ){
                        index = i;
                        break;
                    }
                }
            }

            if( !this._markupMode && paginated ){

                for( var prop in this._sortableFields ){
                    if( prop !== ('col_' + index) ){
                        this._sortableFields[prop] = 'none';
                        this._headers[prop.replace('col_','')].innerHTML = InkString.stripTags(this._headers[prop.replace('col_','')].innerHTML);
                    }
                }

                if( this._sortableFields['col_'+index] === 'asc' )
                {
                    this._sortableFields['col_'+index] = 'desc';
                    this._headers[index].innerHTML = InkString.stripTags(this._headers[index].innerHTML) + '<i class="icon-caret-down"></i>';
                } else {
                    this._sortableFields['col_'+index] = 'asc';
                    this._headers[index].innerHTML = InkString.stripTags(this._headers[index].innerHTML) + '<i class="icon-caret-up"></i>';

                }

                this._pagination.setCurrent(this._pagination._current);

            } else {

                if( index === -1){
                    return;
                }

                if( (this._sortableFields['col_'+index] === 'desc') && (this._options.allowResetSorting && (this._options.allowResetSorting.toString() === 'true')) )
                {
                    this._headers[index].innerHTML = InkString.stripTags(this._headers[index].innerHTML);
                    this._sortableFields['col_'+index] = 'none';

                    // if( !found ){
                        this._data = this._originalData.slice(0);
                    // }
                } else {

                    for( var prop in this._sortableFields ){
                        if( prop !== ('col_' + index) ){
                            this._sortableFields[prop] = 'none';
                            this._headers[prop.replace('col_','')].innerHTML = InkString.stripTags(this._headers[prop.replace('col_','')].innerHTML);
                        }
                    }

                    this._sort(index);

                    if( this._sortableFields['col_'+index] === 'asc' )
                    {
                        this._data.reverse();
                        this._sortableFields['col_'+index] = 'desc';
                        this._headers[index].innerHTML = InkString.stripTags(this._headers[index].innerHTML) + '<i class="icon-caret-down"></i>';
                    } else {
                        this._sortableFields['col_'+index] = 'asc';
                        this._headers[index].innerHTML = InkString.stripTags(this._headers[index].innerHTML) + '<i class="icon-caret-up"></i>';

                    }
                }


                var tbody = Selector.select('tbody',this._rootElement)[0];
                Aux.cleanChildren(tbody);
                InkArray.each(this._data,function(item){
                    tbody.appendChild(item);
                });

                this._pagination.setCurrent(0);
                this._paginate(1);
            }
        },

        /**
         * Applies and/or changes the CSS classes in order to show the right columns
         * 
         * @method _paginate
         * @param {Number} page Current page
         * @private
         */
        _paginate: function( page ){
            InkArray.each(this._data,Ink.bind(function(item, index){
                if( (index >= ((page-1)*parseInt(this._options.pageSize,10))) && (index < (((page-1)*parseInt(this._options.pageSize,10))+parseInt(this._options.pageSize,10)) ) ){
                    Css.removeClassName(item,'hide-all');
                } else {
                    Css.addClassName(item,'hide-all');
                }
            },this));
        },

        /**
         * Sorts by a specific column.
         * 
         * @method _sort
         * @param {Number} index Column number (starting at 0)
         * @private
         */
        _sort: function( index ){
            this._data.sort(Ink.bind(function(a,b){
                var
                    aValue = Element.textContent(Selector.select('td',a)[index]),
                    bValue = Element.textContent(Selector.select('td',b)[index])
                ;

                var regex = new RegExp(/\d/g);
                if( !isNaN(aValue) && regex.test(aValue) ){
                    aValue = parseInt(aValue,10);
                } else if( !isNaN(aValue) ){
                    aValue = parseFloat(aValue);
                }

                if( !isNaN(bValue) && regex.test(bValue) ){
                    bValue = parseInt(bValue,10);
                } else if( !isNaN(bValue) ){
                    bValue = parseFloat(bValue);
                }

                if( aValue === bValue ){
                    return 0;
                } else {
                    return ( ( aValue>bValue ) ? 1 : -1 );
                }
            },this));
        },

        /**
         * Assembles the headers markup
         *
         * @method _setHeaders
         * @param  {Object} headers Key-value object that contains the fields as keys, their configuration (label and sorting ability) as value
         * @private
         */
        _setHeaders: function( headers, rows ){
            var
                field, header,
                thead, tr, th,
                index = 0
            ;

            if( (thead = Selector.select('thead',this._rootElement)).length === 0 ){
                thead = this._rootElement.createTHead();
                tr = thead.insertRow(0);

                for( field in headers ){
                    if (headers.hasOwnProperty(field)) {

                        if( !!this._options.visibleFields && (this._options.visibleFields.indexOf(field) === -1) ){
                            continue;
                        }

                        // th = tr.insertCell(index++);
                        th = document.createElement('th');
                        header = headers[field];

                        if( ("sortable" in header) && (header.sortable.toString() === 'true') ){
                            th.setAttribute('data-sortable','true');
                        }

                        if( ("label" in header) ){
                            Element.setTextContent(th, header.label);
                        }

                        this._originalFields.push(field);
                        tr.appendChild(th);
                    }
                }
            } else {
                var firstLine = rows[0];

                for( field in firstLine ){
                    if (firstLine.hasOwnProperty(field)) {
                        if( !!this._options.visibleFields && (this._options.visibleFields.indexOf(field) === -1) ){
                            continue;
                        }

                        this._originalFields.push(field);
                    }
                }
            }
        },

        /**
         * Method that sets the handlers for the headers
         *
         * @method _setHeadersHandlers
         * @private
         */
        _setHeadersHandlers: function(){

            /**
             * Setting the sortable columns and its event listeners
             */
            var theads = Selector.select('thead', this._rootElement);
            if (!theads.length) {
                return;
            }
            Event.observe(theads[0],'click',this._handlers.click);
            this._headers = Selector.select('thead tr th',this._rootElement);
            InkArray.each(this._headers,Ink.bind(function(item, index){
                var dataset = Element.data( item );
                if( ('sortable' in dataset) && (dataset.sortable.toString() === 'true') ){
                    this._sortableFields['col_' + index] = 'none';
                }
            }, this));

        },

        /**
         * This method gets the rows from AJAX and places them as <tr> and <td>
         *
         * @method _setData
         * @param  {Object} rows Array of objects with the data to be showed
         * @private
         */
        _setData: function( rows ){

            var
                field,
                tbody, tr, td,
                trIndex,
                tdIndex
            ;

            tbody = Selector.select('tbody',this._rootElement);
            if( tbody.length === 0){
                tbody = document.createElement('tbody');
                this._rootElement.appendChild( tbody );
            } else {
                tbody = tbody[0];
                tbody.innerHTML = '';
            }

            this._data = [];


            for( trIndex in rows ){
                if (rows.hasOwnProperty(trIndex)) {
                    tr = document.createElement('tr');
                    tbody.appendChild( tr );
                    tdIndex = 0;
                    for( field in rows[trIndex] ){
                        if (rows[trIndex].hasOwnProperty(field)) {

                            if( !!this._options.visibleFields && (this._options.visibleFields.indexOf(field) === -1) ){
                                continue;
                            }

                            td = tr.insertCell(tdIndex++);
                            td.innerHTML = rows[trIndex][field];
                        }
                    }
                    this._data.push(tr);
                }
            }

            this._originalData = this._data.slice(0);
        },

        /**
         * Sets the endpoint. Useful for changing the endpoint in runtime.
         *
         * @method _setEndpoint
         * @param {String} endpoint New endpoint
         */
        setEndpoint: function( endpoint, currentPage ){
            if( !this._markupMode ){
                this._options.endpoint = endpoint;
                this._pagination.setCurrent( (!!currentPage) ? parseInt(currentPage,10) : 0 );
            }
        },

        /**
         * Checks if it needs the pagination and creates the necessary markup to have pagination
         *
         * @method _setPagination
         * @private
         */
        _setPagination: function(){
            var paginated = ( ("pageSize" in this._options) && (typeof this._options.pageSize !== 'undefined') );
            /**
             * Set pagination if defined
             */
            if( ("pageSize" in this._options) && (typeof this._options.pageSize !== 'undefined') ){
                /**
                 * Applying the pagination
                 */
                if( !this._pagination ){
                    this._pagination = document.createElement('nav');
                    this._pagination.className = 'ink-navigation';
                    this._rootElement.parentNode.insertBefore(this._pagination,this._rootElement.nextSibling);
                    this._pagination.appendChild( document.createElement('ul') ).className = 'pagination';

                    var Pagination = Ink.getModule('Ink.UI.Pagination',1);

                    this._pagination = new Pagination( this._pagination, {
                        size: Math.ceil(this._totalRows/this._options.pageSize),
                        onChange: Ink.bind(function( ){
                            this._getData( this._options.endpoint );
                        },this)
                    }); 
                }
            }
        },

        /**
         * Method to choose which is the best way to get the data based on the endpoint:
         *     - AJAX
         *     - JSONP
         *
         * @method _getData
         * @param  {String} endpoint     Valid endpoint
         * @param  {Boolean} [firstRequest] If true, will make the request set the headers onSuccess
         * @private
         */
        _getData: function( endpoint ){

            Ink.requireModules(['Ink.Util.Url_1'],Ink.bind(function( InkURL ){

                var
                    parsedURL = InkURL.parseUrl( endpoint ),
                    paginated = ( ("pageSize" in this._options) && (typeof this._options.pageSize !== 'undefined') ),
                    pageNum = ((!!this._pagination) ? this._pagination._current+1 : 1)
                ;

                if( parsedURL.query ){
                    parsedURL.query = parsedURL.query.split("&");
                } else {
                    parsedURL.query = [];
                }

                if( !paginated ){            
                    this._getDataViaAjax( endpoint );
                } else {

                    parsedURL.query.push( 'rows_per_page=' + this._options.pageSize );
                    parsedURL.query.push( 'page=' + pageNum );

                    var sortStr = '';
                    for( var index in this._sortableFields ){
                        if( this._sortableFields[index] !== 'none' ){
                            parsedURL.query.push('sortField=' + this._originalFields[parseInt(index.replace('col_',''),10)]);
                            parsedURL.query.push('sortOrder=' + this._sortableFields[index]);
                            break;
                        }
                    }

                    this._getDataViaAjax( endpoint + '?' + parsedURL.query.join('&') );
                }

            },this));

        },

        /**
         * Gets the data via AJAX and triggers the changes in the 
         * 
         * @param  {[type]} endpoint     [description]
         * @param  {[type]} firstRequest [description]
         * @return {[type]}              [description]
         */
        _getDataViaAjax: function( endpoint ){

            var paginated = ( ("pageSize" in this._options) && (typeof this._options.pageSize !== 'undefined') );

            new Ajax( endpoint, {
                method: 'GET',
                contentType: 'application/json',
                sanitizeJSON: true,
                onSuccess: Ink.bind(function( response ){
                    if( response.status === 200 ){

                        var jsonResponse = JSON.parse( response.responseText );

                        if( this._headers.length === 0 ){
                            this._setHeaders( jsonResponse.headers, jsonResponse.rows );
                            this._setHeadersHandlers();
                        }

                        this._setData( jsonResponse.rows );

                        if( paginated ){
                            if( !!this._totalRows && (parseInt(jsonResponse.totalRows,10) !== parseInt(this._totalRows,10)) ){ 
                                this._totalRows = jsonResponse.totalRows;
                                this._pagination.setSize( Math.ceil(this._totalRows/this._options.pageSize) );
                            } else {
                                this._totalRows = jsonResponse.totalRows;
                            }
                        } else {
                            if( !!this._totalRows && (jsonResponse.rows.length !== parseInt(this._totalRows,10)) ){ 
                                this._totalRows = jsonResponse.rows.length;
                                this._pagination.setSize( Math.ceil(this._totalRows/this._options.pageSize) );
                            } else {
                                this._totalRows = jsonResponse.rows.length;
                            }
                        }

                        this._setPagination( );
                    }

                },this)
            } );
        }
    };

    return Table;

});
