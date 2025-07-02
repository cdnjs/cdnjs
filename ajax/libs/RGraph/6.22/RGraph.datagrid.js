    //
    // o---------------------------------------------------------------------------------o
    // | This file is part of the RGraph package - you can learn more at:                |
    // |                                                                                 |
    // |                       https://www.rgraph.net/license.html                       |
    // |                                                                                 |
    // | RGraph is dual-licensed under the Open Source GPL license. That means that it's |
    // | free to use and there are no restrictions on what you can use RGraph for!       |
    // | If the GPL license does not suit you however, then there's an inexpensive       |
    // | commercial license option available. See the URL above for more details.        |
    // o---------------------------------------------------------------------------------o

    //
    // Having this here means that the RGraph libraries can be
    // included in any order, instead of you having to include
    // the common core library first.
    //

    // Define the RGraph global variable
    RGraph = window.RGraph || {isrgraph:true,isRGraph: true,rgraph:true};

    //
    // The constructor. This function sets up the object. 
    //
    RGraph.Datagrid =
    RGraph.DataGrid = function (conf)
    {
        //
        // This facilitates easy clearing of the datagrid. It 
        // empties the nodes of the container div tag.
        //
        this.clear = function ()
        {
            RGraph.fireCustomEvent(this, 'beforeclear');
            

            this.container.replaceChildren();
            
            RGraph.fireCustomEvent(this, 'clear');
        };








        //
        // This facilitates easy redrawing of the datagrid. It 
        //clears the datagrid and the draws it again.
        //
        this.redraw = function ()
        {
            RGraph.fireCustomEvent(this, 'beforeredraw');

            this.clear();
            this.draw();
            
            RGraph.fireCustomEvent(this, 'redraw');
        };








        //
        // Adds styles to the document.
        //
        // @param string selector A standa\rd CSS selector.
        // @param string style The styles to add
        //
        this.addStylesBySelector = function (selector, styles)
        {
            // TODO Alternative - create a style element
            // and add the style to it.
            //
            // Using:
            //
            //document.head.insertAdjacentHTML('beforeend', '[STYLE]')

            //var els = document.querySelectorAll(selector);

            //for (var i=0; i<els.length; ++i) {
            //    var current = els[i].getAttribute('style') || '';
            //    els[i].setAttribute('style', current + ';' + styles);
            //}
            RGraph.addCss(`${selector} {${styles}}`);
        };








        //
        // Sorts the data by the given column, in the given
        // direction
        //
        // @param array  data   The data to sort
        // @param number column The column index
        // @param number dir    The direction to sort
        //
        // @return array        Sorted data
        //
        this.sortData = function (data, col, dir)
        {
            RGraph.fireCustomEvent(obj, 'beforesort');

            data.sort(function (a, b)
            {
                if (!a || !b || !a[col] || !b[col]) {
                    return 0;
                }
                
                
                if (dir === -1) {
                    
                    //
                    // Allow for a custom sort function
                    //
                    if (RGraph.isFunction (obj.properties.sortableCompare)) {
                        return (obj.properties.sortableCompare)(obj, col, dir, a[col].value, b[col].value);
                    } else if (RGraph.isArray (obj.properties.sortableCompare) && RGraph.isFunction (obj.properties.sortableCompare[col])) {
                        return (obj.properties.sortableCompare[col])(obj, col, dir, a[col].value, b[col].value);
                    } else {
                    
                        var a = a[col].value;
                        var b = b[col].value;
                    
                        if (RGraph.isString(a)) a = a.toLowerCase();
                        if (RGraph.isString(b)) b = b.toLowerCase();
                    
                        if (b > a) {
                            return 1;
                        } else if (b < a) {
                            return -1;
                        } else {
                            return 0;
                        }
                    }
            
                } else if (dir === 1) {

                    // Allow for a custom sort function
                    //
                    if (RGraph.isFunction (obj.properties.sortableCompare)) {
                        return (obj.properties.sortableCompare)(obj, col, dir, a[col].value, b[col].value);
                    } else if (RGraph.isArray (obj.properties.sortableCompare) && RGraph.isFunction (obj.properties.sortableCompare[col])) {
                        return (obj.properties.sortableCompare[col])(obj, col, dir, a[col].value, b[col].value);
                    } else {
                        var a = a[col].value;
                        var b = b[col].value;
                    
                        if (RGraph.isString(a)) a = a.toLowerCase();
                        if (RGraph.isString(b)) b = b.toLowerCase();

                        if (a > b) {
                            return 1;
                        } else if (a < b) {
                            return -1;
                        } else {
                            return 0;
                        }
                    }
                } else {

                    a[col].original_index - b[col].original_index;
                }
            });
            
            RGraph.fireCustomEvent(obj, 'sort');
            
            return data;
        };




    



        //
        // This function saves the size of the columns
        // to a variable in localStorage (in the browser).
        //
        this.saveColumnSizesToLocalStorage = function (obj)
        {
            if (obj.properties.columnsResizablePersistent) {
                
                var str = JSON.stringify(obj.columnWidths);
                
                window.localStorage[obj.resizableColumnsPersistentLocalStorageKey] = str;
            }
        };








        //
        // This function loads the size of the columns
        // into the object.
        //
        this.loadColumnSizesFromLocalStorage = function (obj)
        {
            if (obj.properties.columnsResizablePersistent && window.localStorage[obj.resizableColumnsPersistentLocalStorageKey] && window.localStorage[obj.resizableColumnsPersistentLocalStorageKey].length) {
                var data = JSON.parse(window.localStorage[obj.resizableColumnsPersistentLocalStorageKey]);
                
                return data;
            }
        };








        //
        // This function allows you to reset column widths back
        // to their original, unaltered state.
        //
        // @param boolean twice This function can be run twice,
        //                      and is by default. This is due
        //                      to a strange bug.
        //
        this.resetColumnWidths = function (twice = true)
        {
            this.columnWidths = [];
            this.calculateColumnWidths();

            window.localStorage[this.resizableColumnsPersistentLocalStorageKey] = '';
            
            this.redraw();
            
            //
            // Strange but necessary.
            //
            if (twice) {           
                this.resetColumnWidths(false);
            }
        };








        //
        // This function is for saving the sort state to
        // localStorage - making for persistent sorting.
        //
        this.saveSortDataToLocalStorage = function (obj)
        {
            if (obj.properties.sortablePersistent) {
                
                var key = obj.sortableColumnPersistentLocalStorageKey;
    
                window.localStorage[key] = JSON.stringify([
                    obj.sortColumn,
                    obj.sortDir
                ]);
            }
        };








        //
        // This function is for loading the sort information from
        // localStorage.
        //
        this.loadSortDataFromLocalStorage = function (obj)
        {
            if (obj.properties.sortablePersistent) {

                var key = obj.sortableColumnPersistentLocalStorageKey;
                var str = localStorage[obj.sortableColumnPersistentLocalStorageKey];
                var arr = [];
                
                if (str) {
                    arr = JSON.parse(str);
                }

                return arr;
            }
        };








        //
        // This function allows you to reset the sort data back
        // to the default "not sorted" state
        //
        this.resetSortData = function ()
        {
            window.localStorage[this.sortableColumnPersistentLocalStorageKey] = '';
            this.sortColumn = null;
            this.sortDir    = null;
            
            //
            // Sort the array so that the data goes back to its
            // original order
            //
            this.data.sort(function (a,b)
            {
                return a[0].original_row_index - b[0].original_row_index;
            });

            this.redraw();
        };








        // Returns the data
        //
        // @param mixed ... This can be a string noting the cell
        //                  to get. It's optional and if not given
        //                  the whole data is returned as 2D array.
        //
        this.getData = function ()
        {
            var args = RGraph.getArgs(arguments, 'id');
            var out  = [];

            //
            // Return ALL of the data. Simply call the function with
            //no arguments:
            //
            // myDatagrid.getData();
            //
            //
            if (RGraph.isNullish(args.id)) {
                for (var i=0; i<this.data.length; ++i) {
                    
                    out[i] = [];
                    
                    for (var j=0; j<this.data[i].length; ++j) {
                        out[i][j] = this.data[i][j].value;
                    }
                }
                return out;
            }
                
            return out;
        };








        // Returns the original data (ie unsorted - whatever the
        // current sort may be)
        //
        this.getUnsortedData = function ()
        {
            var out = [];
            var data = RGraph.arrayClone(this.data, true);
            
            //
            // Sort the data into the original order
            //
            data.sort(function (a,b)
            {
                return a[0].original_row_index - b[0].original_row_index;
            });

            //
            // Now loop through the data extracting the values
            //
            for (var i=0; i<data.length; ++i) {
                
                out[i] = [];
                
                for (var j=0; j<data[i].length; ++j) {
                    out[i][j] = data[i][j].value;
                }
            }


            return out;
        };








        //
        // Returns the original index of the given index. So if you
        // sort the data obviously the indexes my change - this
        // gives you the original index before any sorting moves
        // the data around.
        //
        // @param  number index The current index of a bit of data.
        // @return number       The original index of the given index.
        //
        this.getOriginalIndex = function (index)
        {
            return this.data[index][0].original_row_index;
        };








        //
        // Sets data on the Datagrid. 
        //
        // @param number arg1 The index of the data to set.
        // @param array  arg2 This should be the new data to set on
        //                    the datagrid.
        //
        this.setData = function ()
        {
            var args = RGraph.getArgs(arguments, 'data');
                
            for (var i=0,data=[]; i<args.data.length; ++i) {
                
                data[i]=[];
                
                var row_id = RGraph.createUID();
                
                for (var j=0; j<args.data[i].length; ++j) {
                
                    // If the rowsIDs has been given
                    // then assign those to  the data too.
                    //
                    //
                    var user_id = null;

                    //
                    // This is also done in the draw function - just once
                    // though.
                    //
                    if (   this.properties
                        && RGraph.isArray(this.properties.rowsIDs)) {

                        user_id = this.properties.rowsIDs[i];
                    }
                    
                    var value = RGraph.isNumeric(args.data[i][j]) ? parseFloat(args.data[i][j]): args.data[i][j];

                    data[i][j] = {
                         value: value,
                original_value: args.data[i][j],
                           uid: RGraph.createUID(),
                       user_id: user_id,
            original_row_index: i,
                        row_id: row_id
                    };
                }
            }

            this.data = data;
            
            // Also set the original_data variable
            this.original_data = RGraph.arrayClone(args.data, true);
            
            return data;
        };








        //
        // This function returns a row of data. It doesn't reset
        // the data back to an unsorted state - it returns the
        // row based on the current state.
        //
        // @param integer index The row index to return. Starts at 0
        //                      for the first row. You can use
        //                      negative numbers - in which case the
        //                      counting starts from the end of
        //                      the data.
        // @return mixed        Returns the row of data (as an array)
        //                      or null if that row doesn't exist.
        //
        this.row = function (index)
        {
            var data = this.getData();
            
            // Allow negative indexing
            if (index < 0) {
                index += data.length;
            }

            if (RGraph.isUndefined(data[index])) {
                return null;
            }
            
            return data[index] || null;
        }








        //
        // This function returns a column of data. It doesn't reset
        // the data back to an unsorted state - it returns the
        // column based on the current state.
        //
        // @param number index The index of the column to get.
        //                     Starts at 0. You can use negative
        //                     numbers - in which the counting
        //                     starts from the end of the data.
        // @return array       The column of data or null if that
        //                     column doesn't exist in the FIRST
        //                     row.
        //
        this.col =
        this.column = function (index)
        {
            var ret  = [];
            var data = this.getData();
            
            // Allow negaative indexing
            if (index < 0) {
                index += data[0].length;
            }

            if (RGraph.isUndefined(data[0][index])) {
                return null;
            }
            
            for (let i=0; i<data.length; ++i) {
                ret.push(data[i][index]);
            }
            
            return ret;
        };
        
        //
        // The find method looks for the string/number that you
        // give and returns the relevant row/cell indexes as well
        // as the td and tr elements.
        //
        // @param  mixed what    The string or number to find. Only
        //                       the first found instance is
        //                       returned -
        //                       when this function finds an instance
        //                       of the query that you give it stops.
        //                       By default it does case-sensitive
        //                       exact matches - but the search query
        //                       can also be a regex allowing much
        //                       more versatile searching.
        // @param object options An object containing options that
        //                       alter the way the function behaves.
        //                       These options include:
        //                        o all - A boolean controlling
        //                                whether the function
        //                                returns after finding the
        //                                first instance of the
        //                                string or if it returns
        //                                 an array of all of the
        //                                 matches.
        // @return array         An array consisting of the row
        //                       index, the cell index and the
        //                       relevant td element.
        // @examples             myGrid.find('fred')
        //                       myGrid.find(95
        //                       myGrid.find(/^aaa(bbb)?ccc/)
        this.find = function (query, options = {})
        {
            if (RGraph.isNumber(query)) {
                query = String(query);
            }

            var data    = this.getData();
            var str     = '';
            var matches = [];

            for (var row=0; row<data.length; ++row) {
                for (var column=0; column<data[row].length; ++column) {
                    
                    //
                    // A string query
                    //
                    if (RGraph.isString(query)) {
                        if (query == String(data[row][column])) { // DOUBLE EQUALS!!

                            // Get the table cell element
                            var el = this.container.querySelector('table tbody tr:nth-child({1}) td:nth-child({2})'.format(row + 1, column + 1));

                            //
                            // Get the user_id of the row if
                            // supplied.
                            //
                            var index   = this.getOriginalIndex(row);
                            var user_id = null;

                            if (   RGraph.isArray(this.properties.rowsIDs)
                                && (RGraph.isString(this.properties.rowsIDs[index]) || RGraph.isNumeric(this.properties.rowsIDs[index]))) {

                                user_id = this.properties.rowsIDs[index];
                            }
                            
                            if (options.all) {
                                matches.push({
                                    row:     row,
                                    column:  column,
                                    element: el,
                                    user_id: user_id
                                });
                            } else {
                                return {
                                    row:     row,
                                    column:  column,
                                    element: el,
                                    user_id: user_id
                                };
                            }
                        }
                    
                    //
                    // A RegExp query
                    //
                    } else if (RGraph.isRegexp(query)) {
                    
                        if (String(data[row][column]).match(query)) {

                            // Get the table cell element
                            var el      = this.container.querySelector('table tbody tr:nth-child({1}) td:nth-child({2})'.format(row + 1, column + 1));
                            var index   = this.getOriginalIndex(row);
                            var user_id = null;
                            
                            if (   RGraph.isArray(this.properties.rowsIDs)
                                && (RGraph.isString(this.properties.rowsIDs[index]) || RGraph.isNumeric(this.properties.rowsIDs[index]))) {

                                user_id = this.properties.rowsIDs[index];
                            }

                            if (options.all) {
                                matches.push({row: row, column: column, element: el, user_id: user_id});
                            } else {
                                return {row: row, column: column, element: el, user_id: user_id};
                            }
                        }
                    }
                }
            }
            
            return matches;
        };








        //
        // DEPRECATED
        //
        // DON'T USE THIS INSTEAD:
        //   
        //     obj.find('foo', {all: true});
        //
        //
        // This is a convenience function that you can use to
        // find all of the matches of the string that you give.
        // You can also use the find function for this if you
        // pass {all: true} as the second argument.
        //
        // @param  mixed query   The string or number to find. All of
        //                       the found instances are returned.
        //                       By default it does case-insensitive
        //                       exact matches - but the search query
        //                       can also be a regex allowing much
        //                       more versatile searching.
        //
        this.findAll = function (query)
        {
            return this.find(query, {all: true});
        }








        //
        // Adds new data to the Datagrid. Most commonly it's used
        // to append data to the end of the dataset.
        //
        // @param array  data  This should be the new data to add to
        //                     the datagrid - an array.
        //
        this.append = function ()
        {
            var args = RGraph.getArgs(arguments, 'data');

            // Get the raw array of data (ie not modified by the
            // datagrid code)
            var data = this.getUnsortedData();

            //
            // Sanitise the data first
            //
            if (!RGraph.isArray(args.data)) {
                args.data = [args.data];
            }
            
            //
            // Pad the new data array if necessary
            //
            if (args.data.length < this.numcolumns) {
                args.data = RGraph.arrayPad(
                    args.data,
                    this.numcolumns,
                    ''
                );
            }
            
            //
            // Push the data on to the data array
            //
            data.push(args.data);


            //
            // Set the new data on the object
            //
            this.setData(data);
            
            //
            // Resort the data array using the current sort details
            //
            obj.data = obj.sortData(obj.data, obj.sortColumn, obj.sortDir);
            
            this.redraw();

            //
            // Fire the append custom event
            //
            RGraph.fireCustomEvent(this, 'append', {
                object: this,
                  data: args.data
            });
        };








        //
        // Adds data to the front of the data set.
        //
        // @param array data The new row to add
        //
        this.prepend = function ()
        {
            var args = RGraph.getArgs(arguments, 'data');

            // Get the raw array of data (ie not modified by the
            // datagrid code)
            var data = this.getUnsortedData();

            //
            // Sanitise the data first
            //
            if (!RGraph.isArray(args.data)) {
                args.data = [args.data];
            }
            
            //
            // Pad the new data array if necessary
            //
            if (args.data.length < this.numcolumns) {
                args.data = RGraph.arrayPad(
                    args.data,
                    this.numcolumns,
                    ''
                );
            }
            
            //
            // Unshift the data on to the data array
            //
            data.unshift(args.data);


            //
            // Set the new data on the object
            //
            this.setData(data);
            
            //
            // Resort the data array using the current sort details
            //
            this.data = this.sortData(this.data, this.sortColumn, this.sortDir);
            
            
            this.redraw();

            //
            // Fire the prepend custom event
            //
            RGraph.fireCustomEvent(this, 'prepend', {
                object: this,
                  data: args.data
            });
        };








        //
        // Inserts data at the index given. If you give 0 as
        // the index it will be inserted at index 0 and everything
        // else will be pushed down. On the other hand if you give
        // 999 as the index (and you have less than 999 items of
        // course) your data will be appended to the datagrid.
        //
        // @param number index The index at which is inserted.
        // @param array  data  The new row to add to the dataset.
        //
        this.insert = function ()
        {
            var args = RGraph.getArgs(arguments, 'index,data');

            //
            // Sanitize the index
            //
            args.index = parseInt(args.index) || 0;

            // Get the raw array of data (ie not modified by the
            // datagrid code)
            var data = this.getUnsortedData();

            //
            // Sanitise the arguments
            //
            if (!RGraph.isArray(args.data)) {
                args.data = [args.data];
            }

            //
            // Pad the new data array if necessary
            //
            if (args.data.length < this.numcolumns) {
                args.data = RGraph.arrayPad(
                    args.data,
                    this.numcolumns,
                    ''
                );
            }

            //
            // Check that the index is in the correct range
            //
            if (args.index > (data.length - 1) ) {
                return this.append(args.data);
            }

            if (args.index < 0) {
                args.index = args.index + data.length;
            }

            if (args.index < 0) {
                args.index = 0;
            }

            //
            // Insert the data into the data array at the correct
            // place
            //

            for (var i=0,newData=[]; i<args.index; ++i) {
                newData.push(data[i]);
            }
            
            newData.push(args.data);
            
            for (var i=args.index; i<data.length; ++i) {
                newData.push(data[i]);
            }



            //
            // Set the new data on the object
            //
            this.setData(newData);
            
            //
            // Resort the data array using the current sort details
            //
            this.data = this.sortData(this.data, this.sortColumn, this.sortDir);

            this.redraw();

            //
            // Fire the insert custom event
            //
            RGraph.fireCustomEvent(this, 'insert', {
                object: this,
                  data: args.data
            });
        };








        //
        // This function deletes data from the datagrid.
        //
        // @param number index    The index of the data to delete.
        //                        This can be either positive or
        //                        negative. If it's negative then
        //                        the counting begins at the end
        //                        of the dataset.
        //
        this.delete = function ()
        {
            var args = RGraph.getArgs(arguments, 'index');

            //
            // Sanitize the index
            //
            args.index = parseInt(args.index);
            
            if (!RGraph.isNumber(args.index) || RGraph.isNullish(args.index)) {
                return false;
            }

            // Get the raw array of data (ie not modified by the
            // datagrid code)
            var data = this.getUnsortedData();

            if (args.index < 0) {
                args.index = args.index + data.length;
            }

            if (args.index < 0) {
                args.index = 0;
            }

            //
            // Check that the index exists in the dataset.
            //
            if (!data[args.index]) {
                return false;
            }

            //
            // Recreate the array without the relevant piece of data
            //
            if (data[args.index]) {
                for (var i=0,newData=[]; i<data.length; ++i) {
                    if (i !== args.index) {
                        newData.push(data[i]);
                    }
                }
            }



            //
            // Set the new data on the object
            //
            this.setData(newData);
            
            //
            // Resort the data array using the current sort details
            //
            this.data = this.sortData(this.data, this.sortColumn, this.sortDir);
            
            this.redraw();

            //
            // Fire the insert custom event
            //
            RGraph.fireCustomEvent(this, 'delete');
        };
















        // START OF CONSTRUCTOR CODE














        var obj = this; // Make this available
                        // throughout the object
                        // so it doesn't have to
                        // be constantly defined
                        // in each function.

        this.id                            = conf.id;
        this.data                          = conf.data;
        this.container                     = document.getElementById(this.id);
        this.container.__object__          = this;
        this.container.originalOffsetWidth = this.container.offsetWidth;
        this.columnWidths                  = [];
        this.state                         = {};
        this.firstDraw                     = true; // After the first
                                                   // draw this will
                                                   // be false

        // This property is used to record edits that the user
        // makes so that the object is reset (for example when
        // sorting goes back to the default ordering) those edits
        // can be reapplied and aren't lost.
        this.edits = [];




        //
        // Make a copy of the data so we can revert back to
        // if need be.
        //
        this.original_data = RGraph.arrayClone(this.data, true);




        // This is used as the key that's used when
        // resizable columns data is saved to the localStorage
        // area.
        this.resizableColumnsPersistentLocalStorageKey = 'rgraph-datagrid-' + location.pathname + '-' + this.id + '-column-widths';
        
        // This is used as the key that's used when
        // the sort column is saved to the localStorage
        // area.
        this.sortableColumnPersistentLocalStorageKey = 'rgraph-datagrid-' + location.pathname + '-' + this.id + '-sortable-column';
        
        //
        // This is used to store the page number in loaclStorage
        // if the pagingPersistent option is enabled.
        //
        this.pagingCurrentPageNumberLocalStorageKey = 'rgraph-datagrid-' + location.pathname + '-' + this.id + '-page-number';



        //
        // This is used to maintain the search across page
        // refreshes or redraws.
        //
        this.searchPersistentSessionStorageKey = 'rgraph-datagrid-' + location.pathname + '-' + this.id + '-search-query';



        this.defaultCss = [
            // Container and table
            'div#' + this.id + ' {line-height: initial;}',
            'div#' + this.id + ' table { border-collapse: collapse;font-family: sans-serif;}',
            
            // Table header
            'div#' + this.id + ' table thead tr th {box-sizing: border-box;padding: 0;background-color: #eee6;color: black;font-weight: bold;}',
            'div#' + this.id + ' table thead tr th div:not(.rgraph-datagrid-resize-handle-container):not(.rgraph-datagrid-resizable-handle) {text-align: center;box-sizing: border-box; padding: 10px;}',
            
            // Table body
            'div#' + this.id + ' table tbody tr td div {position: relative; top: 0; left: 0;right: 0; bottom: 0;box-sizing: border-box;padding: 5px;border: 1px solid #eee;}',
            'div#' + this.id + ' table tbody tr:nth-child(even) {background-color: #eee6;}',
            
            // Table footer
            'div#' + this.id + ' table tfoot tr th div {padding: 0; box-sizing: border-box;}',
            
            // Search input and cancel icon
            'div#' + this.id + ' div.rgraph-datagrid-search-input-container input {margin: 5px; padding: 3px; font-size: 150%; width: 200px;}',
            'div#' + this.id + ' div.rgraph-datagrid-search-input-container span.rgraph-datagrid-cancel-search-icon {position: absolute;right: 15px;top: 50%;transform: translateY(calc(-50% - 2px));cursor: pointer;}',

            // Paging links
            'div#' + this.id + ' div.rgraph-datagrid-paging-links {font-family: sans-serif;}',
            'div#' + this.id + ' div.rgraph-datagrid-paging-links span.rgraph-datagrid-showing-numbers {padding-left: 5px;}',
            'div#' + this.id + ' div.rgraph-datagrid-paging-links span:not(.rgraph-datagrid-showing-numbers) {padding: 7px; display: inline-block; text-align: center; min-width: 20px; color: blue; cursor: pointer;}',
            'div#' + this.id + ' div.rgraph-datagrid-paging-links span.rgraph-datagrid-paging-current {font-weight: bold; background-color: #0001; border: 1px solid #0002;padding: 7px; border-radius: 999px; display: inline-block; text-align: center; min-width: 20px; color: black !important; cursor: default !important;}',
            'div#' + this.id + ' div.rgraph-datagrid-paging-page-selector {font-family: sans-serif; text-align: center;}',
            'div#' + this.id + ' div.rgraph-datagrid-paging-page-selector div {cursor: pointer;}',
            'div#' + this.id + ' div.rgraph-datagrid-paging-page-selector div:hover{background-color: #ddd;}'
        ];

        
    
        
        //
        //
        // Go through the .data array and change
        // each value into an object which has the format:
        // {
        //   value:              7,
        //   original_value:     7,
        //   uid:                'vfcgh-fcdbf-dbfbf-dbfbd-7t6u,
        //   original_row_index: 7,
        //   user_id:            [
        //                        THIS IS SET IN THE CONSTRUCTOR
        //                        ONCE THE PROPERTIES ARE ACCESSIBLE
        //                       ]
        //   row_id:             'f8a5z-jdive-8gf53-jh994-845g'
        // }
        this.setData(this.data);





        // From the given data - loop thru it and determine the
        // maximum number of columns
        this.numcolumns = 0;
        for (var i=0; i<this.data.length; ++i) {
            this.numcolumns = Math.max(this.data[i].length, this.numcolumns);
        }

        //
        // This defines the type of this object
        //
        this.type = 'datagrid';

        //
        // This facilitates easy object identification, and should
        // always be true
        //
        this.isRGraph =
        this.isrgraph =
        this.rgraph   = true;


        //
        // This adds a uid to the object that you can use for
        // identification purposes
        //
        this.uid = RGraph.createUID();

        //
        // This adds a UID to the container div for identification
        // purposes
        //
        this.container.uid = this.container.uid ? this.container.uid : RGraph.createUID();

        //
        // Some example background properties
        //
        this.properties =
        {
            caption:                    null,
            description:                null,

            columnsHeaders:             null,
            columnsFooters:             null,
            columnsWidths:              [],
            columnsHTML:                null,
            columnsUnitsPre:            '',
            columnsUnitsPost:           '',
            columnsPoint:              '.',
            columnsThousand:            ',',
            columnsCssClass:            null,
            columnsDecimals:            0,
            columnsFormatter:           null,
            columnsFormatted:           false,
            columnsResizable:           false,
            columnsResizablePersistent: false,
            columnsResizableHandles:    null,
            columnsDescriptions:        null,
            
            rowsIDs:                    null,
            rowsClickCheckbox:          false,
            rowsClickCheckboxIndex:     0,
            rowsClickRadio:             false,
            rowsClickRadioIndex:        0,
            
            sortable:                   true,
            sortablePersistent:         false,
            sortableColumns:            null,
            sortableInitial:            null,
            sortableInitialDirection:   1, // Ascending
            sortableCompare:            null,
            
            editable:                   false,
            editableColumns:            null,
            
            search:                     false,
            searchPlaceholder:          'Search...',
            searchFocus:                false,
            searchExclude:              null,
            searchUrlUpdate:            false,
            searchUrlQueryStringParameter: 'datagrid-' + obj.id + '-search',
            searchUrlAnchor:            '',
            searchUrlRandom:            '',
            
            
            style:                      null,
            
            events:                     {},
            
            paging:                     true,
            pagingPerpage:              25,
            pagingCurrent:              1,
            pagingMaxpagelinks:         7,
            pagingLabel:                'Page: ',
            pagingPosition:             'top',
            pagingUrlUpdate:            false,
            pagingUrlQueryStringParameter: 'datagrid-' + obj.id + '-page',
            pagingUrlAnchor:            '',
            pagingUrlRandom:            '',
            pagingPersistent:           false
        }





        //
        // Default to no sort
        //
        this.sortColumn = null;
        this.sortDir    = null;
        
        
        
        
        //
        // Add the reverse look-up table  for property names
        // so that property names can be specified in any case.
        //
        this.properties_lowercase_map = [];
        for (var i in this.properties) {
            if (typeof i === 'string') {
                this.properties_lowercase_map[i.toLowerCase()] = i;
            }
        }








        //
        // A setter method for setting graph properties. It can be
        // used like this: obj.set('caption', 'My first DataGrid!');
        // 
        // @param name  string The name of the property to set OR
        //                     it can be a map of name/value
        //                     settings like what you set in the
        //                     constructor
        //
        this.set = function (name)
        {
            var value = typeof arguments[1] === 'undefined' ? null : arguments[1];

            // Go through all of the properties and make sure
            // that they're using the correct capitalisation
            if (typeof name === 'string') {
                name = this.properties_lowercase_map[name.toLowerCase()] || name;
            }

            // 13th Feb 2025
            //
            // IS THIS NECESSARY OR IS IT A DUPE...?
            //
            // Go through all of the properties and make sure
            // that they're using the correct capitalisation
            //
            //name = this.properties_lowercase_map[name.toLowerCase()] || name;


            this.properties[name] = value;

            return this;
        };








        //
        // A getter method for retrieving graph properties. It can
        // be used like this: obj.get('colorsStroke');
        // 
        // @param name  string The name of the property to get
        //
        this.get = function (name)
        {
            // Go through all of the properties and make sure
            // that they're using the correct capitalisation
            name = this.properties_lowercase_map[name.toLowerCase()] || name;

            return this.properties[name];
        };








        //
        // Clears the current sort criteria.
        // Doesn't do anything else - no
        // redrawing.   
        //
        this.clearSort = function ()
        {
            this.sortColumn = null;
            this.sortDir    = null;
        };








        //
        // Renders the datagrid
        //
        this.draw = function ()
        {
            //
            // Fire the onbeforedraw event
            //
            RGraph.fireCustomEvent(this, 'beforedraw');



            //
            // Fire the onfirstdraw event
            //
            if (this.firstDraw) {
                this.firstDraw = false;
                RGraph.fireCustomEvent(this, 'firstdraw');
            }
            
            //
            // First things first, remember how many datagrids have
            // been created. But only do this once per datagrid - not
            // on every redraw.
            //
            RGraph.runOnce('add-the-datagrid-count-to-the-table-at-the-initial-draw-' + this.id, function ()
            {
                obj.datagrid_count = RGraph.Registry.get('rgraph-datagrid-count');
                obj.datagrid_count = obj.datagrid_count > 0 ? obj.datagrid_count + 1 : 1;
                RGraph.Registry.set('rgraph-datagrid-count', obj.datagrid_count);
            });
            
        //
        // Make a copy of the IDs if they've been given too
        // so that when reset, we can revert back to them.
        //
        RGraph.runOnce('make-a-copy-of-the-rowids-property', function ()
        {
            this.original_ids = RGraph.arrayClone(obj.properties.rowsIDs, true);
        });


        if (this.properties.pagingPersistent && window.localStorage[this.pagingCurrentPageNumberLocalStorageKey] && window.localStorage[this.pagingCurrentPageNumberLocalStorageKey].length > 0) {
            this.properties.pagingCurrent = parseInt(window.localStorage[this.pagingCurrentPageNumberLocalStorageKey]) || 1;
        }




            //
            // 
            // Go through the data and add the ID to the data
            // because we now have access to the properties.
            //
            if (this.properties.rowsIDs && this.properties.rowsIDs.length) {
                RGraph.runOnce('add-user_id-to-data-in-the-draw-function-' + this.id, function ()
                {
                    for (var i=0; i<obj.data.length; ++i) {

                        var user_id = null;

                        if (RGraph.isArray(obj.properties.rowsIDs)) {
                            user_id = obj.properties.rowsIDs[i];
                        }

                        for (var j=0; j<obj.data[i].length; ++j) {
                            obj.data[i][j].original_row_index = i;
                            obj.data[i][j].user_id            = user_id;
                        }
                    }
                });
            }






        
            //
            // Load persistent sort data. If the sort direction is 0
            // though - ignore it.
            //
            RGraph.runOnce('load-sortableInitial-data-from-localStorage' + this.id, function ()
            {
                var ret = obj.loadSortDataFromLocalStorage(obj);
    
                if (ret && (ret[1] === -1 || ret[1] === 1)) {
        
                    obj.sortColumn = ret[0];
                    obj.sortDir    = ret[1];
        
                    obj.data = obj.sortData(
                        obj.data,
                        obj.sortColumn,
                        obj.sortDir
                    );
                }
            });










            //
            // If the sortableInitial property is set - sort the
            // datagrid based on what it is (along with the
            // sortableInitialDirection property).
            //
            if (   RGraph.isNullish(this.sortColumn)
                && RGraph.isNullish(this.sortDir)
                && RGraph.isNumeric(this.properties.sortableInitial) ) {

                this.properties.sortableInitial          = parseInt(this.properties.sortableInitial);
                this.properties.sortableInitialDirection = parseInt(this.properties.sortableInitialDirection);

                this.sortColumn = this.properties.sortableInitial;
                this.sortDir    = this.properties.sortableInitialDirection;

                // Invalid column - so set it to the last column
                this.sortColumn = Math.min(this.sortColumn, this.data[0].length - 1)
                this.sortColumn = Math.max(this.sortColumn, 0);
                
                this.sortDir = Math.max(-1, this.sortDir)
                this.sortDir = Math.min(1, this.sortDir);


                this.data = this.sortData(
                    this.data,
                    this.sortColumn,
                    this.sortDir
                );
            }














            //
            // Add the default styles for the datagrid here
            //
            RGraph.runOnce('rgraph-datagrid-' + this.id + 'add-default-styles-to-document', function ()
            {
                //
                // Add the rules that have been given in the
                // properties. 
                //
                if (RGraph.isString(obj.properties.style)) {
                    obj.properties.style = [obj.properties.style];
                }

                if (RGraph.isArray(obj.properties.style)) {
                    for (var i=0; i<obj.properties.style.length; ++i) {
                
                        if (obj.properties.style[i].trim()) {

                            var str = obj.properties.style[i].trim();
                            
                            re = new RegExp('^(div)?#' + obj.id);
                            
                            // Add the div#[id] to the CSS selector
                            str = str.replace(
                                re,
                                ''
                            );

                            str = 'div#' + obj.id + ' ' + str;

                            obj.defaultCss.push(str);
                        }
                    }
                }

                RGraph.Queue.add('end-draw', function ()
                {
                    for (var i=0; i<obj.defaultCss.length; ++i) {
                        obj.addStylesBySelector(
                            obj.defaultCss[i].replace(/{.*$/, '').trim(),
                            obj.defaultCss[i].replace(/^.*{/, '').replace(/ *} *$/,'').trim()
                        );
                    }
                });
            });


            //
            // Add a place holder DIV tag, above the table for the
            // search. This place-holder DIV is always added - even
            // if the search is not enabled.
            //
            var div = document.createElement('div');
            div.className = 'rgraph-datagrid-search-container';
            obj.container.appendChild(div);
            obj.searchPlaceHolderDiv = div;
            
            //
            // Unrelated to the above really - if the searchExclude
            // property is a number - convert it to an array.
            //
            // DON'T NEED TO DO THIS NOW THAT THE inRange() IS IN
            // USE.
            //
            //if (RGraph.isNumber(this.properties.searchExclude)) {
            //    this.properties.searchExclude = [this.properties.searchExclude];
            //}










            //
            // Build and draw the datagrid here
            //
            var table       = document.createElement('table');
            table.className = 'rgraph-datagrid';

            table.setAttribute('border', 0);
            table.setAttribute('cellspacing', 0);
            table.setAttribute('cellpadding', 0);
            table.setAttribute('data-rgraph-datagrid-count', this.datagrid_count);
            table.setAttribute('aria-rowcount',this.data.length);
            
            if (RGraph.isString(this.properties.description)) {
                table.setAttribute('aria-description', this.properties.description);
            }
            
            // Add the table to the document
            //
            this.container.appendChild(table);

            //
            // Add the role attribute to the container and the
            // aria-rowcount atrtribute too.
            //
            this.container.setAttribute('role','table');
            
            //
            // Add the caption if one has been given
            //
            if (this.properties.caption) {
                var caption = document.createElement('caption');
                caption.insertAdjacentHTML('afterbegin', this.properties.caption);
                table.setAttribute('aria-label',this.properties.caption);
                table.appendChild(caption);
                
            }














            //
            // Determine the column widths.
            //
            if (!this.columnWidths.length) {
                this.calculateColumnWidths();
            }













            /////////////////////////////////////////////////
            //                                             //
            // First ADD THE HEADERS if they've been given //
            //                                             //
            /////////////////////////////////////////////////
            if (   RGraph.isArray(this.properties.columnsHeaders)
                || this.properties.paging
                || this.properties.search
               ) {
            
                var thead = document.createElement('thead');
                table.appendChild(thead);
















                ///////////////////////////////////
                //                               //
                // Add a search box if requested //
                //                               //
                ///////////////////////////////////
                if (this.properties.search) {

                    // Add the search input to the td
                    var div = document.createElement('div');
                        div.className      = 'rgraph-datagrid-search-input-container';
                        div.style.position = 'relative';
                        div.style.display  = 'inline-block';
                        div.style.padding  = 0;
                    obj.searchPlaceHolderDiv.appendChild(div);
                    
                    var searchInput                  = document.createElement('input');
                        searchInput.type             = 'text';
                        searchInput.className        = 'rgraph-datagrid-search-input';
                        searchInput.placeholder      = obj.properties.searchPlaceholder;
                    div.appendChild(searchInput);
                    
                    if (this.properties.searchFocus) {
                        searchInput.focus();
                    }

                    
                    // Add an aria-placeholder attribute
                    searchInput.setAttribute('aria-placeholder',this.properties.searchPlaceholder);

                    // Add the searchInput value from the browsers
                    // session storage
                    searchInput.value = window.sessionStorage[this.searchPersistentSessionStorageKey] || '';

                    // If the search is being handled by the server
                    // and there's a search string in the correct
                    // URL querystring parameter then add that to
                    // the search input as its value.
                    if (this.properties.searchUrlUpdate) {
                        var url = new URL(location.href);
                        searchInput.value = url.searchParams.get(obj.properties.searchUrlQueryStringParameter);
                    }
                
                    // Only add this if there's a search string
                    if (searchInput.value) {
                        var span = document.createElement('span');
                        span.insertAdjacentHTML('afterbegin', '&#11198;');
                        span.className = 'rgraph-datagrid-cancel-search-icon';
                        div.appendChild(span);
                        
                        //
                        // Clear the search
                        //
                        span.onclick = function (e)
                        {
                            obj.clearSearch();
                            obj.resetSortData();
                            obj.applyStoredEdits();
                            obj.redraw();
                        };
                    }

                
                
                
                    //
                    // Clear any search and return to the full dataset
                    //
                    this.clearSearch = function ()
                    {
                        // Reset the page number
                        obj.properties.pagingCurrent = 1;

                        // Clear the search from the URL and
                        // refresh the page
                        if (this.properties.searchUrlUpdate) {

                            // Server based search - get rid of the
                            // querystring parameter and refresh
                            // the page.
                            if (obj.properties.searchUrlUpdate) {
                                var url  = new URL(location.href);
                                url.searchParams.delete(obj.properties.searchUrlQueryStringParameter);
                                
                                if (obj.properties.searchUrlRandom) {
                                    url.searchParams.delete(obj.properties.searchUrlRandom);
                                }
                                
                                // Get rid of any query string parameter for paging
                                if (obj.properties.pagingUrlUpdate) {
                                    url.searchParams.delete(obj.properties.pagingUrlQueryStringParameter);
                                    url.searchParams.delete(obj.properties.pagingUrlRandom);
                                }
                                
                                location.href = url.toString();
                            }
                            
                            return;
                        }

                        // Clear the search
                        obj.search = '';
                
                        // Clear the search from sessionStorage
                        window.sessionStorage[obj.searchPersistentSessionStorageKey] = '';
                        
                        // Reset the data back to the original
                        obj.setData(RGraph.arrayClone(obj.original_data));

                        // Deselect all rows
                        //obj.deselectAll();
                        
                        
                        // Reset the page in localStorage
                        if (obj.properties.pagingPersistent) {
                            window.localStorage[obj.pagingCurrentPageNumberLocalStorageKey] = 1;
                        }

                        
                        // Clear the paging links
                        var pagingLinks = document.querySelector('div#' + obj.id + ' div.rgraph-datagrid-paging-links');
                        
                        if (pagingLinks) {
                            pagingLinks.replaceChildren();
                        }
                    };









                
                
                
                
                    //
                    // The searchData() function is called when
                    // the user types into the search box and
                    // also when the page loads.
                    //
                    // @param string str The search query
                    //
                    this.searchData = function (str)
                    {
                        // Reset th page number
                        obj.properties.pagingCurrent = 1;

                        // Set the search string on the
                        // object.
                        obj.search = str.trim();

                        // Put the search query into session
                        // storage so a redraw doesn't nuke
                        // the search.
                        window.sessionStorage[obj.searchPersistentSessionStorageKey] = str;
                                        
                        var results = [];
                        var ids     = [];

                        //
                        // Now go through the data looking
                        // for the string If a row doesn't
                        // contain it - ignore the row.
                        //
                        for (var i=0; i<this.data.length; ++i) {
                            
                            //
                            // Split the search into words at the
                            // start of a loop through the words
                            // in this row.
                            //
                            var searchWords = obj.search.trim().split(/\s+/);

                            
                            //
                            // Go through the search words and
                            // change words with basic wildcards
                            // into regexes.
                            //
                            for (var sw=0; sw<searchWords.length; ++sw) {
                                
                                searchWords[sw] = searchWords[sw].trim();
                                
                                if (   searchWords[sw][0]
                                    && searchWords[sw][0] !== '/'
                                    && searchWords[sw][0].slice(-1) !== '/'
                                    && searchWords[sw][0].slice(-2) !== '/i'
                                    && (searchWords[sw].indexOf('*') > -1 || searchWords[sw].indexOf('?') > -1)
                                   ) {
                                    searchWords[sw] = '/' + searchWords[sw].replace('*','.*').replace(/\?/g,'.') + '/i'
                                }
                            }



                            for (var j=0; j<this.data[i].length; ++j) {
                            
                                // Is searching permitted to search
                                // in this column?
                                if (this.inRange(this.properties.searchExclude,j)) {
                                    continue;
                                }
                                
                                // Apply formatting to the cell so
                                // that it's easier to search what
                                // people see.
                                var formattedValue = this.formatValue(
                                    this,
                                    this.data[i][j].value,
                                    i,
                                    j
                                );
                                
                                //
                                // Convert html entities to text.
                                //
                                formattedValue = RGraph.entitiesToText(formattedValue);
                                
                                //var encodedStr = formattedValue;
                                //var parser     = new DOMParser;
                                //var dom        = parser.parseFromString(
                                //    '<!doctype html><body>' + encodedStr,
                                //    'text/html'
                                //);
                                //var formattedValue = dom.body.textContent;

                                for (var k=0; k<searchWords.length; ++k) {


                                    // Case-sensitive regex
                                    if (   searchWords
                                        && searchWords[k]
                                        && searchWords[k].substring(0,1) === '/'
                                        && searchWords[k].substring(searchWords[k].length - 1) === '/') {

                                        // Cast to a regexp
                                        var re = new RegExp(searchWords[k].substring(1).substring(0,searchWords[k].length - 2));

                                        if (formattedValue.toString().match(re)) {
                                            delete searchWords[k];
                                        }


                                    // Case insensitive regex
                                    } else if (   searchWords
                                        && searchWords[k]
                                        && searchWords[k].substring(0,1) === '/'
                                        && searchWords[k].substring(searchWords[k].length - 2) === '/i') {

                                        // Cast to a regexp
                                        var re = new RegExp(searchWords[k].substring(1).substring(0,searchWords[k].length - 3), 'i');

                                        if (formattedValue.toString().match(re)) {
                                            delete searchWords[k];
                                        }
                                    
                                    // Regular string
                                    } else {

                                        if (formattedValue.toString().toLowerCase().indexOf(String(searchWords[k]).toLowerCase()) !== -1) {
                                            delete searchWords[k];
                                        }
                                    }
                                }
                            }

                            // If all of the search words have been
                            // deleted from the searchWords array
                            // then that means that a row has
                            // matched.
                            if (Object.keys(searchWords).length === 0) {
                                results.push(this.data[i]);
                            }
                        }

                        //
                        // Assign the results to the data array.
                        //
                        this.data = results;
                        
                        // Now extract the user_ids from the data
                        for (var i=0,user_ids=[]; i<this.data.length; ++i) {
                            user_ids.push(this.data[i][0].user_id);
                        }
                    };










                    //
                    // This call is to enable the data to be
                    // searched when the page loads.
                    //
                    var str = window.sessionStorage[this.searchPersistentSessionStorageKey];
                
                    if (str && !this.properties.searchUrlUpdate) {
                        this.searchData(str);
                    }
                
                
                
                
                    //
                    // When the user types into the search
                    // box this happens.
                    //
                    searchInput.addEventListener('keydown', function (e)
                    {
                        // Cancel the search when the Esc key is
                        // pressed
                        if (e.keyCode === 27) {
                            obj.clearSearch();
                            obj.resetSortData();
                            obj.applyStoredEdits();
                            obj.redraw();
                            return;
                        }


                        if (e.keyCode === 13) {
                        
                            if (obj.properties.searchUrlUpdate) {

                                // Reset paging start and perPage
                                obj.properties.pagingCurrent = 1;

                                var url = new URL(location.href);
                                
                                url.searchParams.delete(obj.properties.searchUrlQueryStringParameter);
                                if (RGraph.isString(obj.properties.searchUrlRandom) && obj.properties.searchUrlRandom) {
                                    url.searchParams.delete(obj.properties.searchUrlRandom);
                                }
                                url.searchParams.append(obj.properties.searchUrlQueryStringParameter, e.target.value);
                            
                                // Add a random number to the URL to try
                                // and negate the effects of caching.
                                // This can be disabled by setting it to
                                // a falsey value.
                                if (RGraph.isString(obj.properties.searchUrlRandom) && obj.properties.searchUrlRandom) {
                                    url.searchParams.append(obj.properties.searchUrlRandom, RGraph.random(1,9999999999));
                                }
                            
                                url.hash = obj.properties.searchUrlAnchor;
                            
                                // Redirect to the new URL
                                location.href = url.toString();

                                return;
                            }


                            obj.clearSearch();
                            obj.resetSortData();
                            obj.applyStoredEdits();

                            // First thing is to clear sorting so
                            // the data is presented in its
                            // initial state
                            obj.clearSort();




                            obj.resetData();
                            
                            // Reset paging start and perPage
                            obj.properties.pagingCurrent = 1;

                            obj.searchData(e.target.value);


                            obj.redraw();
                            
                            // Re-focus the text input
                            var el = obj.container.querySelector('.rgraph-datagrid-search-input');
                            el.focus();

                            //
                            // Stop the event from going any
                            // further
                            //
                            e.stopPropagation();
                            e.preventDefault();
                            return false;
                        }
                    }, false);
                }








                //////////////////////////////////
                // DO THIS IF PAGING IS ENABLED //
                //////////////////////////////////
                if (this.properties.paging) {

                    //
                    // Firstly - define the function that sets the page
                    this.setPage = function (page)
                    {
                        // Put the page in localStorage if requested
                        if (this.properties.pagingPersistent) {
                            window.localStorage[this.pagingCurrentPageNumberLocalStorageKey] = page;
                        }

                        // Ability to set the URL to
                        // change the page - using the query string
                        // parameter.
                        if (this.properties.pagingUrlUpdate) {
                            
                            var url = new URL(location.href);
                            url.searchParams.delete(obj.properties.pagingUrlQueryStringParameter);
                            if (RGraph.isString(obj.properties.pagingUrlRandom) && obj.properties.pagingUrlRandom) {
                                url.searchParams.delete(obj.properties.pagingUrlRandom);
                            }
                            url.searchParams.append(obj.properties.pagingUrlQueryStringParameter, page);
                            
                            // Add a random number to the URL to try
                            // and negate the effects of caching.
                            // This can be disabled by setting it to
                            // a falsey value.
                            if (RGraph.isString(obj.properties.pagingUrlRandom) && obj.properties.pagingUrlRandom) {
                                url.searchParams.append(obj.properties.pagingUrlRandom, RGraph.random(1,9999999999));
                            }

                            url.hash = obj.properties.pagingUrlAnchor;

                            location.href = url.toString();
                        } else {
                            this.properties.pagingCurrent = page;
                            this.redraw();
                        }
                    }
        
                    //
                    // Determine if there's a page number requested
                    // on the query string.
                    //
                    // var params     = new URLSearchParams(window.location.search);
                    // var pagingPage = parseInt(params.get('page'));
                    //     pagingPage = (!pagingPage || pagingPage <= 0) ? 1 : pagingPage; // No negatives
        
        
                    //
                    // Allow the start page to be specified on the
                    // query string (if enabled);
                    //
                    

                    if (obj.properties.pagingUrlUpdate) {
                        RGraph.runOnce('get-page-number-from-query-string-parameter-' + obj.id, function ()
                        {
                            var urlParams = new URLSearchParams(window.location.search);
                            var page      = urlParams.get(obj.properties.pagingUrlQueryStringParameter);
                        
                            obj.properties.pagingCurrent = page;
                        });
                    }

                    //
                    // Calculate the start index
                    //
                    var pagingMaxpages            = Math.ceil(this.data.length / this.properties.pagingPerpage);
                    this.properties.pagingCurrent = Math.min(this.properties.pagingCurrent, pagingMaxpages);
                    
                    if (this.properties.pagingCurrent < 1) {
                        this.properties.pagingCurrent = 1;
                    }
                    
                    this.properties.pagingCurrent = Math.round(this.properties.pagingCurrent);
    
    
                    var start  = (this.properties.pagingCurrent - 1) * this.properties.pagingPerpage;
                    var endRow = Math.min(start + this.properties.pagingPerpage, this.data.length);
    
                    if (start < 0) {
                        start  = 0;
                        endRow = 0;
                    }
    
    
                    
    
                    // 
                    // Add the page links to the document beneath the
                    // table.
                    //
                    RGraph.Queue.add('end-draw', function ()
                    {
                        //
                        // If the paging links have already been
                        // added to the datagrid there's no need to
                        // add them again.
                        //
                        if (document.querySelector('div#' + obj.id + ' div.rgraph-datagrid-paging-links')) {
                            return;
                        }

                        var div = document.createElement('div');
                            div.style.textAlign = 'right';
                            div.className = 'rgraph-datagrid-paging-links';
    
                        // Use this to change the position of the
                        // paging links to the top/bottom of the
                        // datagrid.
                        if (obj.properties.pagingPosition === 'bottom') {
                            obj.container.appendChild(div);
                        } else {
                            obj.searchPlaceHolderDiv.after(div);
                        }
                            
                        div.insertAdjacentHTML('afterbegin',obj.properties.pagingLabel);
                        
                        // Build the links to each page
                        if (obj.properties.pagingCurrent < (obj.properties.pagingMaxpagelinks / 2) ) {
                            
                            var pagingLinksFirst = obj.properties.pagingCurrent - Math.floor(obj.properties.pagingMaxpagelinks / 2);
    
                            if (pagingLinksFirst < 1) {
                                pagingLinksFirst   = 1;
                                var pagingLinksLast = pagingLinksFirst + obj.properties.pagingMaxpagelinks - 1;
                                    pagingLinksLast = Math.min(pagingLinksLast, pagingMaxpages);
                            }
                        
                            if (pagingLinksLast - pagingLinksFirst >= obj.properties.pagingMaxpagelinks) {
                                pagingLinksLast -= 1;
                            }
    
                        } else if (obj.properties.pagingCurrent > (pagingMaxpages - (obj.properties.pagingMaxpagelinks / 2) ) ) {
    
                            var pagingLinksFirst = pagingMaxpages - obj.properties.pagingMaxpagelinks;
                            var pagingLinksLast  = pagingMaxpages;
    
                            if (pagingLinksFirst < 1) {
                                pagingLinksFirst   = 1;
                                //var pagingLinksLast = pagingLinksFirst + obj.properties.pagingMaxpagelinks - 1;
                                //    pagingLinksLast = Math.min(pagingLinksLast, pagingMaxpages);
                            }
    
                            if (pagingLinksLast - pagingLinksFirst >= obj.properties.pagingMaxpagelinks) {
                                pagingLinksFirst += 1;
                            }
    
                        } else {
    
                            var pagingLinksFirst = (obj.properties.pagingCurrent - Math.floor(obj.properties.pagingMaxpagelinks / 2)) || 1;
                            var pagingLinksLast  = obj.properties.pagingCurrent + Math.floor(obj.properties.pagingMaxpagelinks / 2);
                                pagingLinksLast  = Math.min(pagingLinksLast, pagingMaxpages);
    
                        
                            if (pagingLinksLast > pagingMaxpages) {
                                pagingLinksLast = pagingMaxpages;
                                var pagingLinksFirst = pagingLinksLast - obj.properties.pagingMaxpagelinks + 1;
                            }
    
                            if (pagingLinksLast - pagingLinksFirst >= obj.properties.pagingMaxpagelinks) {
                                pagingLinksLast -= 1;
                            }
                        }
    
                        for (var i=pagingLinksFirst; i<=pagingLinksLast; i++) {
    
                            // Create a link that allows the user to go
                            // to another page. In the onclick event of
                            // the link do the page swapping.
                            //
    
                            var span = document.createElement('span');
                            span.style.padding = '3px';
                            if (obj.properties.pagingCurrent !== i ) {
                                (function (index)
                                {
                                    span.onclick = function (e)
                                    {
                                        obj.setPage(index);
                                    };
                                })(i);
                            } else {
                                span.className = 'rgraph-datagrid-paging-current';
                                // CSS for this link is defined as part of the defaultCss
                            }
                            span.insertAdjacentHTML('beforeend', i);
                             
                             // Add the link to the end of the table
                            div.insertAdjacentElement('beforeend', span);
                        }
                        
                        // Show the "showing..." text
                        var startIndex = ( obj.properties.pagingCurrent - 1) * obj.properties.pagingPerpage + 1;
                            startIndex = startIndex > 0 ? startIndex : 0;
                        var endIndex   = Math.min(startIndex + obj.properties.pagingPerpage - 1, obj.data.length);

                        div.insertAdjacentHTML('afterbegin', `<span class="rgraph-datagrid-showing-numbers" style="float: left">Showing ${obj.data.length > 0 ? startIndex : 0} - ${endIndex} of ${RGraph.numberFormat({object: this, number:obj.data.length})} ` + '</span>');
    
                        if (pagingMaxpages > obj.properties.pagingMaxpagelinks) {
                            var span = document.createElement('span');
                            span.onclick = function (e)
                            {
                                var xy = RGraph.getCanvasXY(span);
    
                                // Show a little div tag with all of the
                                // page numbers in it.
                                var div = document.createElement('div');
                                div.id                      = 'rgraph-datagrid-paging-page-selector';
                                div.style.position          = 'absolute';
                                div.style.width             = '50px';
                                div.style.maxHeight         = '200px';
                                div.style.backgroundColor   = 'white';
                                div.style.overflowY         = 'auto';
                                div.style.fontSize          = '20pt';
                                div.style.overflowX         = 'hidden';
                                div.style.boxShadow         = '0 0 3px 5px #ddd';
                                obj.container.appendChild(div);
                                
                                // Add the page numbers to the DIV
                                for (var pn=1; pn<=pagingMaxpages; ++pn) {
                                    var pnDiv = document.createElement('div');
                                    pnDiv.style.width = '100%';
                                    pnDiv.insertAdjacentHTML('afterbegin', pn);
                                    div.appendChild(pnDiv);
                                    
                                    (function (index)
                                    {
                                        pnDiv.onclick = function (e)
                                        {
                                            obj.setPage(index);
                                        };
                                    })(pn);
                                }
                                
                                // Now position the div
                                div.style.top  = ((xy[1] - div.offsetHeight) > 0 ? (xy[1] - div.offsetHeight) : 10) + 'px';
                                div.style.left = xy[0] + 'px';
    
                                div.onmousedown = function (e)
                                {
                                    e.stopPropagation();
                                }
                                
                                window.addEventListener('mousedown', function (e)
                                {
                                    if (div && div.parentNode) {
                                        div.parentNode.removeChild(div);
                                    }
                                }, false);
                            };
    
                            span.insertAdjacentHTML('beforeend','...');                        
                            div.insertAdjacentElement('beforeend', span);
                        }
                    });
                } else {
                    var start  = 0;
                    var endRow = this.data.length;
                }









                var tr = document.createElement('tr');
                

                // Add all of the header cells
                if (this.properties.columnsHeaders && this.properties.columnsHeaders.length) {
                    for (var i=0; i<this.properties.columnsHeaders.length; ++i) {
    
                        var th = document.createElement('th');
                        th.setAttribute('role','columnheader');
                        th.style.cssText = 'position: relative; min-height: 100%';
                        tr.appendChild(th);
    
                        th.setAttribute('data-column-index', i);
                        th.setAttribute('data-initial-width', this.columnWidths[i]);
                        th.setAttribute('scope', 'col');
                        
                        if (RGraph.isArray(this.properties.columnsDescriptions) && this.properties.columnsDescriptions[i]) {
                            th.setAttribute('aria-description', this.properties.columnsDescriptions[i]);
                        }
                        
                        // Default to no sorting
                        th.setAttribute('aria-sort','none');
                        
                        var div = document.createElement('div');
                        div.className = 'rgraph-datagrid-cell-content';
    
                        //
                        // Add the user-specified column CSS classname
                        //
                        if (RGraph.isString(this.properties.columnsCssClass) && this.properties.columnsCssClass.length) {
                            th.className += ' ' + this.properties.columnsCssClass;
                        } else if (RGraph.isArray(this.properties.columnsCssClass) && RGraph.isString(this.properties.columnsCssClass[i]) ) {
                            th.className += ' ' + this.properties.columnsCssClass[i];
                        }
    
                        // Don't use innerHTML here
                        div.textContent = this.properties.columnsHeaders[i] ? this.properties.columnsHeaders[i] : String.fromCharCode(0x00A0);
                        //div.textContent = this.formatValue(obj, this.properties.columnsHeaders[i], null, i);
                        
                        // Set the tooltip
                        th.title = this.properties.columnsHeaders[i];
    
                        //th.title = this.formatValue(this, this.properties.columnsHeaders[i], null, i);
                        div.style.cssText = `white-space: nowrap;
                                             overflow: hidden;
                                             text-overflow: ellipsis;
                                             pointer-events: none;
                                             width: ${this.columnWidths[i]}px`;
    
                        
                        th.appendChild(div);
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
                        /////////////////////////////////////
                        // Facilitate sorting if requested //
                        /////////////////////////////////////
                        if (this.properties.sortable && (RGraph.isNull(this.properties.sortableColumns) || this.inRange(this.properties.sortableColumns, i) ) ) {
    
                            th.addEventListener('mousemove', function (e)
                            {
                                if (!obj.overResizeVbarContainer) {
                                    e.target.style.cursor = 'pointer';
                                }
                            }, false);
                            
                            th.addEventListener('mouseup', function (e)
                            {
    
                                //
                                // Don't do this if resizing
                                //
                                if (obj.state.resizing) {
                                    return;
                                }
    
                                var currentSortColumn = obj.sortColumn;
                                var currentSortDir    = obj.sortDir; // Default to not sorted
                                var newSortColumn     = parseInt(e.target.getAttribute('data-column-index'));
                                
                                // Sort directions:
                                //
                                //  -1 - Descending order
                                //   0 - Original order - not sorted
                                //   1 - Ascending order
                                //
                                if (currentSortColumn === newSortColumn) {
                                    if (currentSortDir === 0) {
                                        newSortDir = 1; // Ascending
                                    
                                    } else if (currentSortDir === 1) {
                                        newSortDir = -1; // Descending
                                    
                                    } else {
                                        newSortDir = 0; // No sort
                                    }
                                } else {
                                    newSortDir = 1; // Ascending
                                }
                                
    
                                if (newSortDir) {
    
                                    obj.data = obj.sortData(
                                        obj.data,
                                        newSortColumn,
                                        newSortDir
                                    );
    
                                } else {
                                    // This fires the resetdata event
                                    obj.resetData();
                                }
    
                                // Store the new sort configuration on
                                // the object
                                obj.sortColumn = newSortColumn;
                                obj.sortDir    = newSortDir;
    
                                obj.redraw();
    
                                // 
                                // Store the sort information in
                                // localStorage if persistence is enabled
                                // (it is by default)
                                //
                                obj.saveSortDataToLocalStorage(obj);
                                
                                e.stopPropagation();
                            }, false);
                        }
    
    
    
    
    
    
    
    
    
    
    
    
                        //
                        // Add the sort indicator if necessary
                        //
    
                        if (i === this.sortColumn && this.sortDir !== 0) {
                            
                            var span = document.createElement('span');
                            span.style.cssText =
                                `position: absolute;
                                 right: 6px;
                                 top: 50%;
                                 font-size: 10pt;
                                 display: inline-block;
                                 pointer-events: none;
                                 cursor: pointer;
                            `;
                            
                            span.insertAdjacentHTML('afterbegin', '&#9650;');
                            span.className = 'rgraph-cell-sort-pointer';
                            span.setAttribute('aria-hidden','true');
    
    
                            if (this.sortDir === 1) {
                                span.style.transform = 'rotate(0deg) translateY(-50%)';
                                th.setAttribute('aria-sort','ascending');
                            } else if (this.sortDir === -1) {
                                span.style.transform = 'rotate(180deg) translateY(50%)';
                                th.setAttribute('aria-sort','descending');
                            } else {
                                span.style.transform = 'translateY(-50%)';
                            }
    
                            th.appendChild(span);
                        }
                    }
                }

                    

                // Add the header to the table
                thead.appendChild(tr);
            //
            // These need defining because they used to add the
            // data. They're defined up above so if the header bit
            // isn't being added because paging, search and table
            // headers are turned off they don't get defined -
            // hence they're here.
            //
            } else {
                var start  = 0;
                var endRow = this.data.length;
            }

















            //////////////////////////////////////////////////
            //                                              //
            // LOOR THROUGH THE ROWS ADDING THE DATA        //
            //                                              //
            // Loop through the data adding it to the table //
            //////////////////////////////////////////////////
            var tbody = document.createElement('tbody');
            
            // Append the tbody to the table
            table.appendChild(tbody);

















            for (var row=start; row<endRow; ++row) {

                //
                // Accommodate paging
                //
                var tr = document.createElement('tr');

                // Add the row index attribute
                tr.setAttribute('data-row-index', row);
                tr.setAttribute('data-row-id', this.data[row][0].row_id);
                tr.setAttribute('role', 'row');
                tr.setAttribute('aria-rowindex', row + 1);
                
                //
                // Add the user-specified row ID if its defined
                //
                if (RGraph.isArray(this.properties.rowsIDs) && !RGraph.isNullish(this.data[row][0].user_id)) {
                    tr.setAttribute('data-user-row-id', this.data[row][0].user_id);
                }

                
                //
                // Add the hover class whesn the row is moused over
                //
                tr.addEventListener('mouseover', function (e)
                {
                    e.currentTarget.className += ' rgraph-datagrid-row-hover ';
                }, false);
                tr.addEventListener('mouseout', function (e)
                {
                    e.currentTarget.className = e.currentTarget.className.replace(/rgraph-datagrid-row-hover/, '');
                }, false);

                //
                // Facilitate the the row onclick event listener
                //
                (function (index, tr)
                {
                    tr.addEventListener('click', function (e)
                    {

                        var user_id = null;
                        
                        if (!RGraph.isNullish(obj.data[index][0].user_id)) {
                            user_id = obj.data[index][0].user_id;
                        }
                        
                        var meta = {
                             object: obj,
                              event: e,
                               data: obj.getData()[index],
                            user_id: user_id,
                                row: index,
                              value: obj.row(index),
                            element: tr,
                               html: tr.innerHTML
                        };
                        
                        RGraph.Registry.set('row-click-meta', meta);

                        RGraph.fireCustomEvent(obj, 'rowclick', meta);

                        //
                        // If there's a CHECKBOX in the row - check it
                        // (this makes life easier for users).
                        //
                        if (obj.properties.rowsClickCheckbox) {
                            
                            if (RGraph.isNumber(obj.properties.rowsClickCheckboxIndex)) {
                                var idx = [obj.properties.rowsClickCheckboxIndex];
                            } else if (RGraph.isArray(obj.properties.rowsClickCheckboxIndex)) {
                                var idx = obj.properties.rowsClickCheckboxIndex;
                            }
                            var chks = tr.querySelectorAll('input[type=checkbox]');

                            for (var i=0; i<idx.length; ++i) {
                                if (chks[idx[i]]) {
                                    if (e.target.tagName.toLowerCase() === 'input' && e.target.type === 'checkbox') {
                                        e.stopPropagation();
                                    } else {
                                        chks[idx[i]].checked = !chks[idx[i]].checked;
                                    }
                                }
                            }
                        }


                        
                        //
                        // If there's a RADIO BUTTON in the row -
                        // check it (this makes life easier for
                        // users).
                        //
                        if (obj.properties.rowsClickRadio) {

                            if (RGraph.isNumber(obj.properties.rowsClickRadioIndex)) {
                                var idx = [obj.properties.rowsClickRadioIndex];
                            } else if (RGraph.isArray(obj.properties.rowsClickRadioIndex)) {
                                var idx = obj.properties.rowsClickRadioIndex;
                            }

                            var radios = tr.querySelectorAll('input[type=radio]');

                            for (var i=0; i<idx.length; ++i) {

                                if (radios[idx[i]]) {
                                    if (e.target.tagName.toLowerCase() === 'input' && e.target.type === 'radio') {
                                        e.stopPropagation();
                                    } else {
                                        radios[idx[i]].checked = !radios[idx[i]].checked;
                                    }
                                }
                            }
                        }

                    }, false);
                })(row, tr);








                for (var column=0; column<this.data[row].length; ++column) {
                    
                    var td     = document.createElement('td');
                    var div    = document.createElement('div');
                    var row_id = this.data[row][column].row_id;

                    div.className = 'rgraph-datagrid-cell-content';
                    
                    //
                    // Add the user-specified column CSS classname
                    //
                    if (RGraph.isString(this.properties.columnsCssClass)) {
                        td.className += ' ' + this.properties.columnsCssClass;
                    } else if (RGraph.isArray(this.properties.columnsCssClass) && RGraph.isString(this.properties.columnsCssClass[column]) ) {
                        td.className += ' ' + this.properties.columnsCssClass[column];
                    }

                    if (   this.inRange(this.properties.columnsHTML, column) ) {
                        div.insertAdjacentHTML('afterbegin', '&zwnj;' + this.formatValue(this, this.data[row][column].value, row, column)); // Don't use innerHTML here
                    } else {
                        div.insertAdjacentHTML('afterbegin', '&zwnj;') // Don't use innerHTML here
                        div.textContent = this.data[row][column].value ? (this.formatValue(this, this.data[row][column].value, row, column) || String.fromCharCode(0x00A0)) : String.fromCharCode(0x00A0);
                        
                        // Set the tooltip
                        td.title = this.formatValue(this, this.data[row][column].value, row, column);
                    }



                    //
                    // This uses BACKTICKS to enclose the string
                    // - not quotes.
                    //
                    div.style.cssText =
                        `white-space: nowrap;
                         overflow: hidden;
                         text-overflow: ellipsis;
                         width: ${this.columnWidths[column]}px`;
                    
                    td.appendChild(div);
                    
                    // Add the row and column indexes to the cell
                    td.setAttribute('data-row-index', row);
                    td.setAttribute('data-column-index', column);
                    td.setAttribute('data-value', this.data[row][column].value);
                    td.setAttribute('role','cell');

                    tr.appendChild(td);











                    //
                    // Facilitate the the cell onclick event listener
                    //
                    (function (row, column, td)
                    {
                        td.addEventListener('click', function (e)
                        {
                            var user_id = null;

                            if (!RGraph.isNullish(obj.data[row][0].user_id)) {
                                user_id = obj.data[row][0].user_id;
                            }

                            var meta = {
                                 object: obj,
                                  event: e,
                                    row: row,
                                 column: column,
                                   data: obj.getData()[row],
                                  value: obj.data[row][column].value,
                                element: td,
                                   html: td.innerHTML,
                                user_id: user_id
                            };

                            RGraph.Registry.set('cell-click-meta', meta);

                            RGraph.fireCustomEvent(obj, 'cellclick', meta);

                        }, false);
                    })(row, column, td);
















                    //
                    // Facilitate the cell edit functionality
                    //
                    if (
                        this.properties.editable &&
                            (    RGraph.isNull(this.properties.editableColumns)
                             || (RGraph.isArray(this.properties.editableColumns) && this.properties.editableColumns.includes(column))
                             || (RGraph.isNumeric(this.properties.editableColumns) && this.properties.editableColumns == column) // DOUBLE EQUALS!!
                             || (RGraph.isString(this.properties.editableColumns) && this.isEditableColumn(column, this.properties.editableColumns))
                            )
                       ) {

                        (function (row, column, td)
                        {
                            td.addEventListener('dblclick', function (e)
                            {
                                // Set this in the registry so
                                // you can access details of the
                                // edit in the editcomplete and
                                // editcancelled custom events.
                                //
                                // DON'T FORGET IT IS ALSO SET FURTHER
                                // DOWN IN THE CODE WHEN THE EDIT IS
                                // SAVED
                                //

                                var meta = {
                                    object: obj,
                                    value:  obj.data[row][column].value,
                                    cell:   e.currentTarget,
                                    row:    row,
                                    column: column 
                                };
                                
                                meta.user_id = e.currentTarget.parentNode.getAttribute('data-user-row-id');
                                if (RGraph.isNumeric(meta.user_id)) {
                                    meta.user_id = parseFloat(meta.user_id)
                                }

                                RGraph.Registry.set('cell-edit-meta', meta);
                                
                                RGraph.fireCustomEvent(obj, 'beforeedit', meta);

                                td.style.position = 'relative';

                                // Clear the cells div tags content
                                td.replaceChildren();


                                var editInput = document.createElement('input');
                                editInput.style.cssText = `position: absolute;
                                                       left: 0;
                                                       top: 0;
                                                       -border: 1px solid red;
                                                       padding: 0;
                                                       margin: 0;
                                                       width: calc(100% - 1px);
                                                       height: calc(100% - 1px);`;
                                editInput.value = td.getAttribute('data-value');
                                editInput.setAttribute('data-original-value', td.getAttribute('data-value'));
                                editInput.setAttribute('data-row-index', td.getAttribute('data-row-index'));
                                editInput.setAttribute('data-column-index', td.getAttribute('data-column-index'));

                                // Add the user_id if it's been given
                                if (!RGraph.isNullish(obj.properties.rowsIDs) && !RGraph.isNullish(obj.properties.rowsIDs[row])) {
                                    editInput.setAttribute('data-row-user-id', obj.properties.rowsIDs[row]);
                                    meta.user_id = obj.properties.rowsIDs[row];
                                }

                                

                                td.appendChild(editInput);

                                editInput.focus();
                                editInput.select();
                                editInput.addEventListener('click', function (e)
                                {
                                    e.stopPropagation();
                                }, false);
                                
                                //
                                // When editing has finished - revert
                                // the cell to it's original, static
                                // content, saving the content.
                                //
                                var saveEditFunction = function (e)
                                {
                                    var row    = parseInt(editInput.getAttribute('data-row-index'));
                                    var column = parseInt(editInput.getAttribute('data-column-index'));

                                    //
                                    // Re-set this so that update
                                    // information is available to
                                    // the events
                                    //
                                    var meta = {
                                        object: obj,
                                original_value: (RGraph.isNumeric(obj.data[row][column].value) && obj.isFormatted(column)) ? parseFloat((function (v) {return v;})(obj.data[row][column])) : (function (v) {return v;})(obj.data[row][column].value),
                                         value: (RGraph.isNumeric(editInput.value) && obj.isFormatted(column)) ? parseFloat((function (v) {return v;})(editInput.value)) : (function (v) {return v;})(editInput.value),
                                          cell: td,
                                           row: row,
                                        column: column,
                                       user_id: (function (num) {return RGraph.isNumeric(num) ? parseFloat(num) : num;})(td.parentNode.getAttribute('data-user-row-id'))
                                    };

                                    RGraph.Registry.set('cell-edit-meta', meta);

                                    RGraph.fireCustomEvent(obj, 'beforeeditsave', meta);
                                    
                                    //
                                    // Only save if the event hasn't been cancelled
                                    //
                                    //
                                    if (!meta.cancelEdit) {

                                        // Save the value to the data
                                        // array
                                        obj.data[row][column].value =(RGraph.isNumeric(editInput.value) && obj.isFormatted(column))
                                                                     ? parseFloat(editInput.value)
                                                                     : editInput.value;
    
                                        // Keep a record of the edits so that when sorting is reset and
                                        // the original data is used again - the edits can be re-applied
                                        // to the data.
                                        obj.edits.push({
                                            row: obj.data[row][column].original_row_index,
                                            column: column,
                                            value : obj.data[row][column].value
                                        });
    
                                        //
                                        // Resort the data array
                                        //
                                        obj.data = obj.sortData(obj.data, obj.sortColumn, obj.sortDir);
    
    
                                    
    
    
                                    
                                        td.setAttribute('data-value', obj.data[row][column].value);
                                    } else {
                                        return meta;
                                    }
                                    
                                    //
                                    // Get rid of the text input
                                    //
                                    // TODO
                                    //
                                    // Does this need to be done
                                    // because of the redraw?
                                    //
                                    //if (editInput && editInput.parentNode) {
                                    //    editInput.parentNode.removeChild(editInput);
                                    //}
                                    //
                                    //var index = td.getAttribute('data-column-index');

                                    //
                                    // Is this necessary due to the
                                    // redraw() right after...?
                                    //
                                    //var div = document.createElement('div');
                                    //    div.textContent = obj.formatValue(obj, obj.data[row][column].value, row, column);
                                    //    div.style.whiteSpace   = 'nowrap';
                                    //    div.style.overflow     = 'hidden';
                                    //    div.style.textOverflow = 'ellipsis';
                                    //    div.style.width = obj.columnWidths[index] + 'px';
                                    //td.appendChild(div);

                                    // Get rid of the window onclick
                                    // function.
                                    window.onclick = null;

                                    //
                                    // Redraw the datagrid
                                    //
                                    obj.redraw();
                                    
                                    // Fire the edit event
                                    RGraph.fireCustomEvent(obj, 'aftereditsave', meta);

                                    return meta;
                                };


                                //
                                // Cancel editing and revert the cell back to the
                                // original content
                                //
                                var cancelEditFunction = function (e)
                                {
                                    var meta = RGraph.Registry.get('cell-edit-meta');
                                    meta.user_id = (function (num) {return RGraph.isNumeric(num) ? parseFloat(num) : num;})(td.parentNode.getAttribute('data-user-row-id'));

                                    var index = td.getAttribute('data-column-index');

                                    td.replaceChildren();

                                    var div = document.createElement('div');
                                    div.textContent   = obj.formatValue(obj, obj.data[row][column].value, row, column);
                                    div.style.cssText = `white-space:nowrap;
                                                         overflow:hidden;
                                                         text-overflow:ellipsis;
                                                         width: ${obj.columnWidths[index]}px;`;
                                    td.appendChild(div);
                                    
                                    window.onclick = null;

                                    // Fire the edit cancelled event
                                    RGraph.fireCustomEvent(obj, 'editcancelled', meta);
                                };




                                //
                                // If the window is clicked - away
                                // from the text input - save the
                                // value and finish editing
                                window.onclick = function (e)
                                {
                                    var meta = saveEditFunction(e);

                                    // Update the value in the meta information
                                    //meta.original_value = editInput.getAttribute('data-original-value');
                                    meta.value          = editInput.value;

                                    RGraph.fireCustomEvent(obj, 'editcomplete', meta);
                                    window.onclick = null;
                                };

                                // Now attach the above save function
                                // to various events
                                editInput.onkeydown = function (e)
                                {
                                    // Enter key is pressed
                                    if (e.keyCode === 13) {
                                        
                                        var meta = saveEditFunction(e);
                                        
                                        if (meta.cancelEdit) {
                                            cancelEditFunction(e);
                                            return;
                                        }
                                    
                                        // Update the value in the meta information
                                        meta.original_value = editInput.getAttribute('data-original-value');
                                        meta.value          = editInput.value;

                                        RGraph.fireCustomEvent(obj, 'editcomplete', meta);
                                    
                                    // Escape key is pressed
                                    } else if (e.keyCode === 27) {
                                        cancelEditFunction(e);
                                    }
                                };
                            }, false);
                        })(row, column, td);
                    }
                }
                
                tbody.appendChild(tr);
            }

                
                





            
            

            
            
            
            
            
            
            
            
            
            
            

            

            //
            // FOOTER
            //
            // Add the tfoot element if a footer has been requested
            //
            if (RGraph.isArray(this.properties.columnsFooters) && this.properties.columnsFooters.length) {
                var tfoot = document.createElement('tfoot');
                tr        = document.createElement('tr');
                
                for (var i=0; i<this.numcolumns; ++i) {
                    td = document.createElement('td');
                    td.setAttribute('data-column-index', i);
                    
                    //
                    // Add the user-specified column CSS classname
                    //
                    if (RGraph.isString(this.properties.columnsCssClass)) {
                        td.className += ' ' + this.properties.columnsCssClass;
                    } else if (RGraph.isArray(this.properties.columnsCssClass) && RGraph.isString(this.properties.columnsCssClass[i]) ) {
                        td.className += ' ' + this.properties.columnsCssClass[i];
                    }
    
                    var div = document.createElement('div');
                    div.textContent   = this.properties.columnsFooters[i];
                    div.title         = div.textContent;
                    div.style.cssText = `display: inline-block;
                                         white-space: nowrap;
                                         overflow: hidden;
                                         text-overflow: ellipsis;
                                         width: ${this.columnWidths[i]}px;`;
                    td.appendChild(div);
                    tr.appendChild(td);
                }
    
                tfoot.appendChild(tr);
                table.appendChild(tfoot);
            }





            





            // Save a reference on the object so that it's easy to
            // access
            this.table    =
            this.datagrid = table;








//////////////////////////
//
// Fix the size of the columns
//
// TODO
//
// Need to get the widths when the first draw is run - then always
// use those widths on subsequent draws.
//
RGraph.runOnce('rgraph_datagrid_' + this.uid + '_column_widths',function ()
{
    var tags = obj.table.querySelectorAll('thead tr th');

    for (var i=0; i<tags.length; ++i) {

        //tags[i].style.width = obj.columnWidths[i] + 'px';
        //tags[i].width       = obj.columnWidths[i];
    }
});

// Disable selecting the headers
var ths = obj.table.querySelectorAll('thead th');
for (var i=0; i<ths.length; ++i) {
    ths[i].onselectstart = function (e) {e.preventDefault();return false;};
}


//////////////////////////
















            //
            // Facilitate the resizing of columns. First, add the
            // resize vertical gray  lines on the edge of each
            // column header.
            //
            if (this.properties.columnsResizable) {

                // This is the variable which is updated when the
                // resize bars are clicked.
                //
                var state = {object: this, mousedown: false};

                (function (state)
                {
                    // Get all of the th tags
                    var th = state.object.table.querySelectorAll('thead th');

                    // Loop through the th tags
                    for (var i=0; i<(th.length - 1); ++i) {
                    
                        //
                        // Allow resize handles to be not shown
                        //
                        //if (   RGraph.isArray(obj.properties.columnsResizableHandles)
                        //    && !RGraph.isUndefined(obj.properties.columnsResizableHandles[i])
                        //    && !obj.properties.columnsResizableHandles[i]
                        //    ) {
                        //    continue;
                        //}
                        
                        if (!RGraph.isNull(obj.properties.columnsResizableHandles) && !obj.inRange(obj.properties.columnsResizableHandles, i)) {
                            continue;
                        }

                        //
                        // This is the container for the two vertical bars
                        //
                        var vbar_container = document.createElement('div');
                        vbar_container.style.cssText = 'overflow: hidden;box-sizing: border-box;position: absolute; top: 50%; transform: translateY(-50%); right: -4.5px; width: 9px; height: 20px; background-color: #0000;z-index: 1;';
                        vbar_container.className     = 'rgraph-datagrid-resize-handle-container rgraph-datagrid-' + obj.id + '-resize-handle-container';
                        th[i].appendChild(vbar_container);
                        
                        vbar_container.onmousemove = function (e)
                        {
                            e.target.style.cursor = 'col-resize';
                            obj.overResizeVbarContainer = true;
                        };
                        vbar_container.onmouseout = function (e)
                        {
                            obj.overResizeVbarContainer = false;
                        };
            
                        //
                        // Left vertical bar
                        //
                        var vbar1 = document.createElement('div');
                        //vbar1.id = 'rgraph-datagrid-resizable-handle1';
                        vbar1.className = 'rgraph-datagrid-resizable-handle';
                        vbar1.style.cssText = 'position: absolute;top: 50%;transform: translateY(-50%); left: 0; width: 2px; height: 20px; background-color: #aaa';
                        vbar_container.appendChild(vbar1);
            
                        //
                        // Right vertical bar
                        //
                        var vbar2 = document.createElement('div');
                        //vbar2.id = 'rgraph-datagrid-resizable-handle2';
                        vbar2.className = 'rgraph-datagrid-resizable-handle';
                        vbar2.style.cssText = 'position: absolute; top: 50%; transform: translateY(-50%); right: 0; width: 2px; height: 20px; background-color: #aaa;';
                        vbar_container.appendChild(vbar2);
            
            
            
            
            
            
            
            
            
            
            
                        //
                        // Install the event listeners. When the
                        // vertical bars are clicked moving the mouse
                        // resizes the table columns.
                        //
                        vbar_container.addEventListener('mousedown',  function (e)
                        {
                            state.mousedown           = true;
                            state.node                = e.currentTarget.parentNode; // The <th> tag
                            state.siblingNode         = state.node.nextSibling;
                            state.index               = parseInt(state.node.getAttribute('data-column-index'));
                            state.initialX            = e.pageX;
                            state.initialWidth        = state.object.columnWidths[state.index];
                            state.tableWidth          = state.object.table.offsetWidth;
                            state.initialWidthSibling = state.object.columnWidths[state.index + 1];
            
                            state.node.setAttribute('data-initial-width', state.initialWidth);
                            
                            // Disable selections whilst dragging
                            state.object.table.onselectstart = function(e) {e.preventDefault();};
                            
                            // Set a flag on the object noting that resizing is taking
                            // place
                            state.resizing = true;
                            obj.state.resizing = true;
                            
                            RGraph.fireCustomEvent(obj, 'resizebegin');

                            e.stopPropagation();
                        });
                    }

                    // IMPORTANT
                    //
                    // Don't need to use the runOnce function
                    // here because when the datagrid is
                    // redrawn the HTML table tag is removed
                    // from the DOM and everything is
                    // recreated.
                    //
                    window.addEventListener('mouseup', function (e)
                    {
                        if (state && state.resizing) {
                            state.mousedown = false;
                            
                            // Reenable selecting
                            state.object.table.onselectstart = null;
            
                            // Reset the resizing flag
                            state.resizing = false;
                            obj.state.resizing = false;
                            
                            RGraph.fireCustomEvent(obj, 'resizeend');
                            
                            e.stopPropagation();
                        }                        
                    }, false);

                    window.addEventListener('mousemove', function (e)
                    {
                        if (state.mousedown) {

                            var delta = e.pageX - state.initialX;
        
                            // Calculate the new width
                            var newWidth = state.initialWidth + parseFloat(delta);

                            // Resize the column
                            resizeColumnTo(state.object, state.node, delta, newWidth);
                        }
                    }, false);
                    
                    
                    
                    
                    












                    //
                    // This function handles the resizing of a
                    // column.
                    //
                    var resizeColumnTo = function (obj, node, delta, width)
                    {
                        // Set the width of the tbody to prevent it
                        // from growing when showing scrollbars
                        var tbody = obj.table.querySelector('tbody');
                        tbody.style.width = obj.container.offsetWidth + 'px';

                        //
                        // Get the index of the colum that's being resized
                        //
                        var index    = parseInt(node.getAttribute('data-column-index'));
                        var maxWidth = obj.columnWidths[index] + obj.columnWidths[index + 1];


                        // Constrain the column size to between 20px and
                        // 2 * column size - 20
                        if (width < 20) {
                            return;
                        }

                        if (width > (maxWidth - 20)) {
                            return;
                        }

                        // Apply the new width
                        //
                        // IS THIS NECESSARY?
                        //
                        //node.width = width;


                        // Update the columnWidths variable
                        state.object.columnWidths[index] = width;

                        // Apply the new width to the child div that sits inside the
                        // th
                        node.querySelector('div').style.width = width + 'px';

                        // Update the initial-width attribute
                        node.setAttribute('data-initial-width', width);
            
                        //
                        // Apply the new width to the next column
                        //
                        var widthSibling = parseFloat(state.initialWidthSibling + (-1 * delta));
//
// IS THIS NECESSARY?
//
//node.nextSibling.width = widthSibling;
                        
                        //
                        // Update the sibling width in the coumnWidths variable
                        //
                        state.object.columnWidths[index + 1] = widthSibling
            
                        //
                        // Apply the new width to the child div that sits inside the
                        // next column
                        //
                        node.nextSibling.querySelector('div').style.width = widthSibling + 'px';
            
            
            
            
            
            
                        // Now apply the new width to the td tags that sit
                        // inside the tbody
                        var tds = state.object.table.querySelectorAll('tbody td');
                        for (var i=0; i<tds.length; ++i) {
                            // DOUBLE EQUALS HERE
                            if (tds[i].getAttribute('data-column-index') == state.index) {
                                tds[i].querySelector('div').style.width = width + 'px';
                            }
                        }
            
                        // Now apply the new width to the div tags that sit
                        // inside the td tags for the NEXT COLUMN
                        var tds = state.object.table.querySelectorAll('tbody td');
                        for (var i=0; i<tds.length; ++i) {
                            // DOUBLE EQUALS HERE
                            if (tds[i].getAttribute('data-column-index') == (state.index+1) ) {
                                tds[i].querySelector('div').style.width = widthSibling + 'px';
                            }
                        }
            
            
            
            
            
            
            
            
            
            
                        // Now apply to the relevant footer cell
                        var tds = state.object.table.querySelectorAll('tfoot td');

                       if (tds.length) {
                            tds[state.index].width = width;
                            tds[state.index].querySelector('div').style.width = width + 'px';

                            // Now apply to the relevant footer cell in
                            // the column AFTER the one being resized.
                            var tds = state.object.table.querySelectorAll('tfoot td');
                            tds[state.index + 1].width = widthSibling;
                            tds[state.index + 1].querySelector('div').style.width = widthSibling + 'px';
                        }







                        // When resizing is persistent - save
                        // the size of the columns to the
                        // localStorage variable.
                        //
                        if (state.object.properties.columnsResizablePersistent) {
                            state.object.saveColumnSizesToLocalStorage(state.object);
                        }
                        
                        // Fires the resize event
                        RGraph.fireCustomEvent(obj, 'resize');
                    }
                })(state);
            }






            ///////////////////////
            // END RESIZING CODE //
            ///////////////////////






            //
            // LAST thing to do is check the width of the container.
            // If it has changed then redraw with the new width.
            //
            RGraph.runOnce('recalculate-datagrid-width-due-to-possible-scrollbars-being-on-the-page-now-' + obj.id, function ()
            {
                //
                // Add an resize event listener to the page so that
                // when the window is resized the datagrid can be
                // resized too.
                //
                window.addEventListener('resize', function ()
                {
                    // 
                    // Calculate the new column widths based on the
                    // percentages of the pre-window-resize state
                    //
                    var sum = RGraph.arraySum(obj.columnWidths);
                    
                    var proportions = obj.columnWidths.map(function (v)
                    {
                        return v / sum;
                    });
                    
                    
                    for (var i=0; i<proportions.length; ++i) {
                        obj.columnWidths[i] = obj.container.offsetWidth * proportions[i];
                    }

                    // No longer necessary to do all this
                    //obj.resetColumnWidths();
                    //obj.calculateColumnWidths();

                    obj.redraw();
                }, false);




                if (obj.container.originalOffsetWidth !== obj.container.offsetWidth) {
                    obj.calculateColumnWidths();
                    obj.redraw();
                }
            });
            
            //
            // Reslove the end-draw queue
            //
            RGraph.Queue.resolve('end-draw');






            //
            // Fire the draw event
            //
            RGraph.fireCustomEvent(this, 'draw');
            
            return this;
        };








        //
        // Facilitate selectable rows
        //
        // @param object tr The table row node (the tr tag).
        //
        //this.installSelectableRows = function (table)
        //{
        //    var els      = document.querySelectorAll('div#' + this.id + ' table tbody tr');
        //    var selected = obj.getSelectedRowsFromLocalStorage();

        //    for (var i=0; i<els.length; ++i) {
        //        
        //        var tr    = els[i];
        //        var index = parseInt(tr.getAttribute('data-row-index'));

        //        //
        //        // Add the hidden input that will take the IDs
        //        // of the selected rows.
        //        //
        //        var el = document.getElementById('rgraph-datagrid-rows-selected-' + this.id);
    
        //        if (!el) {
        //            var input   = document.createElement('input');
        //            input.type  = 'hidden';
        //            input.value = '';
        //            input.name  = 'rgraph-datagrid-rows-selected-' + this.id;
        //            input.id    = 'rgraph-datagrid-rows-selected-' + this.id;
        //            obj.container.appendChild(input);
        //           
        //           obj.rowsSelectableSelectedInput = input;
        //       } else {
        //           obj.rowsSelectableSelectedInput = el;
        //       }
        //   



        //       //
        //       // Loop through the data checking each selected flag. The need
        //       // for a setTimeout() function is due to this bit of code running
        //       // BEFORE all of the data has been added to the table.
        //       //
        //       // Is this necessary now? It appears not...
        //       //
        //       //for (var i=0; i<this.data.length; ++i) {
        //       //    if (this.data[i][0].row_selected) {
        //       //        (function (index) {
        //       //            setTimeout(function ()
        //       //            {
        //       //                obj.select(index);
        //       //            }, 16.666);
        //       //        })(i);
        //       //    }
        //       //}
    
    
    
        //       tr.addEventListener('mousedown', function (e)
        //       {
        //           // Only do this for left clicks
        //           if (e.button !== 0) {
        //               return;
        //           }
    
        //           var tr    = e.currentTarget;
        //           var index = parseInt(tr.getAttribute('data-row-index'));
    
    
        //           obj.toggleSelected(index);
    
        //       }, false);
        //   }





        //   // Now select any rows that have been stored in
        //   // localStorage
        //   if (selected && selected.length) {
        //       for (var i=0; i<selected.length; ++i) {
        //           if (!RGraph.isNullish(selected[i])) {

        //               var index = obj.getIndexFromUserId(selected[i]);

        //               (function (idx)
        //               {
        //                   setTimeout(function ()
        //                   {
        //                       obj.select(idx);
        //                   }, 5);
        //               })(index);
        //           }
        //       }
        //   }
        //}; // End of if(selectable rows)


        this.getIndexFromUserId = function (user_id)
        {
            for (var i=0; i<this.data.length; ++i) {
                if (this.data[i][0].user_id == user_id) { // DOUBLE EQUALS
                    return i;
                }
            }
        };








        //
        // This function gets the id's from localStorage and
        // updates the selection based on that.
        //
        //this.getSelectedRowsFromLocalStorage = function ()
        //{
        //    //
        //    // Don't run this function if persistent row
        //    // selection is disabled.
        //    //
        //    if (!this.properties.rowsSelectablePersistent) {
        //        return [];
        //    }
        //        
        //    var str = window.localStorage[this.rowsSelectablePersistentLocalStorageKey] || '';
        //    var ids = str.trim().split(/ +/);
        //    
        //    // Convert the strings to numbers if they're
        //    // numeric.
        //    for (var i=0; i<ids.length; ++i) {
        //        if (RGraph.isNumeric(ids[i])) {
        //            ids[i] = Number(ids[i]);
        //        }
        //    }

        //    return ids;
        //};








        //
        // This function updates the hidden input with the
        // value of the currently selected rows.
        //
        //this.updateSelectedRowsInput = function ()
        //{
        //    if (this.properties.rowsSelectable && this.rowsSelectableSelectedInput) {
        //        this.rowsSelectableSelectedInput.value = JSON.stringify(this.getSelected());
        //    }
        //};







        //
        // Toggles the .row_selected flag on a row
        //
        //@param number index The row to toggle the selected
        //                    state of.
        //
        //this.toggleSelected = function (index)
        //{
        //    // Invert the selection
        //    if (obj.data[index][0].row_selected) {
        //        obj.deselect(index);
        //    } else {
        //        obj.select(index);
        //    }
        //};








        //
        // This is a PUBLIC function that can be used to select rows.
        //
        // @param number id The index of the row to select.
        //
        //this.select = function (index) 
        //{
        //    if (RGraph.isNullish(index)) {
        //        return;
        //    }

        //    var selected = this.getSelected();

        //    // Allow for the rowsSelectableCount limit to be
        //    // checked
        //    //if (this.properties.rowsSelectableCount > 0) {
        //    //    if (selected.length >= this.properties.rowsSelectableCount) {
        //    //        return false;
        //    //    }                    
        //    //}
        //
        //    if (RGraph.isString(index)) {
        //        index = parseInt(index);
        //    }

        //    //
        //    // Select the row
        //    //
        //    for (var i=0; i<obj.data[index].length; ++i) {
        //        obj.data[index][i].row_selected = true;
        //    }
        
        //    var tr = obj.container.querySelector(`table tbody tr:nth-child(${index+1})`);
        //    tr.className = tr.className.replace(/ *rgraph-datagrid-row-selected */g,'');
        //    tr.className = tr.className.replace(/ *rgraph-datagrid-row-selected */g,'');
        //    tr.className = tr.className.replace(/ *rgraph-datagrid-row-selected */g,'');
        //    tr.className = tr.className.replace(/ *rgraph-datagrid-row-selected */g,'');
        //    tr.className = tr.className.replace(/ *rgraph-datagrid-row-selected */g,'');
        //    tr.className = tr.className.replace(/ *rgraph-datagrid-row-selected */g,'');
        //    tr.className = tr.className.replace(/ *rgraph-datagrid-row-selected */g,'');
        //    tr.className = tr.className.replace(/ *rgraph-datagrid-row-selected */g,'');
        //    tr.className = tr.className.trim() + ' rgraph-datagrid-row-selected';
        //    tr.className = tr.className.trim();

        //    tr.setAttribute('aria-selected', "true");
        
        
        
            
        //    //
        //    // Call this function to update the localStorage
        //    // variable with the selected items.
        //    //
        //    obj.updateLocalStorageSelectedItems();
        
        
        //    //
        //    // Now set the selected rows as the value of the
        //    // hidden input. First get the selected rows and
        //    // then convert those indexes into user_ids that
        //    // are supplied by the user.
        //    //
        //    obj.updateSelectedRowsInput();
        //};








        //
        // Selects all of the rows
        //
        //this.selectAll = function ()
        //{
        //    //
        //    // Loop through the data calling the .select()
        //    // function for each row.
        //    //
        //    for (let i=0; i<obj.data.length; ++i) {
        //        obj.select(i);
        //    }
        //};








        //
        // Returns true/false as to whether a row is
        // currently selected or not.
        //
        // @param number index The index of the row to check
        //
        //this.isSelected = function (index)
        //{
        //    return obj.data[index][0].row_selected;
        //};








        //
        // This function updates the localStorage variable with
        // the correct selected items. This can be called from
        // the select() function and the deselect() function.
        //
        //this.updateLocalStorageSelectedItems = function ()
        //{
            //
            // Don't run this function if persistent row
            // selection is disabled.
            //
            //if (!this.properties.rowsSelectablePersistent) {
            //    return;
            //}

            //
            // If the rowsSelectablePersistent option is set then
            // add the necessary index into the localStorage
            // variable.
            //
            //if (this.properties.rowsSelectablePersistent) {

            //    // When a row is selected it needs to be added
            //    // to localStorage and when deselected it can be
            //    // removed.
            //    var selected = this.getSelected();
            //    var str      = '';

            //    selected.forEach(function (v, k, a)
            //    {
            //        str += v.user_id + ' ';
            //    });
                
            //    //
            //    // Stuff it into localStorage
            //    //
            //    window.localStorage[this.rowsSelectablePersistentLocalStorageKey] = str;

            //}
        //};









        //
        // Deselects all of the rows
        //
        //this.deselectAll = function ()
        //{
            //
            // Loop through the data  calling the .deselect()
            // function for each row.
            //
        //    for (var i=0; i<obj.data.length; ++i) {
        //        obj.deselect(i);
        //    }
        //};








        //
        // This is a PUBLIC function that can be used to deselect rows.
        //
        // @param number id The index of the row to deselect
        //
/*
        this.unselect =
        this.deselect = function (index)
        {
            if (RGraph.isString(index)) {
                index = parseInt(index);
            }

            //
            // Deselect a row
            //
            for (var i=0; i<obj.data[index].length; ++i) {
                obj.data[index][i].row_selected = false;
            }
        
            var tr = obj.container.querySelector(`table tbody tr:nth-child(${index+1})`);
            if (tr) {
                // The g flag doesn't appear to functiong as
                // expected here
*/
                //tr.className = tr.className.replace(/ *rgraph-datagrid-row-selected */g, '').trim();
                //tr.className = tr.className.replace(/ *rgraph-datagrid-row-selected */g, '').trim();
                //tr.className = tr.className.replace(/ *rgraph-datagrid-row-selected */g, '').trim();
                //tr.className = tr.className.replace(/ *rgraph-datagrid-row-selected */g, '').trim();
                //tr.className = tr.className.replace(/ *rgraph-datagrid-row-selected */g, '').trim();
                //tr.className = tr.className.replace(/ *rgraph-datagrid-row-selected */g, '').trim();
                //tr.className = tr.className.replace(/ *rgraph-datagrid-row-selected */g, '').trim();
                //tr.setAttribute('aria-selected', "false");

// Lose any style on the row
//tr.setAttribute('style', '');

// Restore the "pre-selected style" so it looks as it was
// before selection.
//var css = tr.getAttribute('data-rgraph-datagrid-selectable-original-style');

//if (css) {
//    tr.setAttribute('style', css);
//}
//            }
            
        
            //
            // Call this function to update the localStorage
            // variable with the selected items.
            //
            //obj.updateLocalStorageSelectedItems();
        
        
            //
            // Now set the selected rows as the value of the
            // hidden input. First get the selected rows and
            // then convert those indexes into user_ids that
            // are supplied by the user.
            //
            //obj.updateSelectedRowsInput();
        //};








        //
        // This is a PUBLIC function that returns the row
        // indexes of the rows which are currently selected.
        //
        //@return array The indexes of the rows that are
        //              selected
        //
        //this.getSelected = function ()
        //{
        //    var selected = [];
        
            //
            // Loop through the data checking each rows
            // .row_selected flag
            //
        //    for (let i=0; i<obj.data.length; ++i) {
        //        if (obj.data[i][0].row_selected) {
        //            selected.push({
        //                index:   i,
        //                user_id: obj.data[i][0].user_id
        //            });
        //        }
        //    }
            
        //    return selected;
        //};







        // Returns true or false as to whether a column is formatted
        // or not (ie the column is made up of numbers). By default,
        // all columns are NOT formatted.
        //
        // @param  number  column The index of the column to check
        // @return boolean        Whether the column is formatted
        //                        or not.
        //
        this.isFormatted = function (column)
        {
            return this.inRange(obj.properties.columnsFormatted, column);
        };








        //
        // Formats the value for display
        //
        // @param  mixed value The value to format. This could be a string
        //                     as well as a number
        // @return string      The formatted value - ready for display to
        //                     the user
        //
        this.formatValue = function (obj, value, row, column)
        {
            //
            // No formatting at all
            //
            if (!this.isFormatted(column)) {
                return String(value);
            }

            //
            // Value is number so format it using the formatting
            // properties.
            //
            if (RGraph.isNumeric(value)) {

                value = parseFloat(value);

                value = RGraph.numberFormat({
                    object:    this,
                    number:    value.toFixed(this.propertyArrayOrString(this.properties.columnsDecimals, column)),
                    unitspre:  this.propertyArrayOrString(this.properties.columnsUnitsPre, column),
                    unitspost: this.propertyArrayOrString(this.properties.columnsUnitsPost, column),
                    thousand:  this.propertyArrayOrString(this.properties.columnsThousand, column),
                    point:     this.propertyArrayOrString(this.properties.columnsPoint, column),
                    formatter: this.propertyArrayOrString(this.properties.columnsFormatter, column),
                    decimals:  this.propertyArrayOrString(this.properties.columnsDecimals, column)
                });
            
            } else if (RGraph.isFunction(this.properties.columnsFormatter) || (RGraph.isArray(this.properties.columnsFormatter) && RGraph.isFunction(this.properties.columnsFormatter[column])) ) {
                
                // Run the formatter function here if defined.
                // Check that sorting still works. Hopefully
                // sorting is done before this function is called.
                // Call the formatter function
                var result = this.propertyArrayOrString(this.properties.columnsFormatter, column)({
                   object: this,
                    value: value,
                      row: row,
                   column: column
                });

                return result;
            }

            return value;
        };








        //
        // Used in chaining. Runs a function there and then - not
        // waiting for the events to fire (eg the beforedraw
        // event)
        // 
        // @param function func The function to execute
        //
        this.exec = function (func)
        {
            func(this);
            
            return this;
        };








        //
        // Using a function to add events makes it easier to
        // facilitate method chaining
        // 
        // @param  string   type The name of the event to add
        // @param  function func The function that will be run.
        // @return object        The chart object - so that you
        //                       can chain this method should you
        //                       wish to.
        //
        this.on = function (type, func)
        {
            // Allow for arrays of events
            if (RGraph.isArray(type)) {
                for (var i=0; i<type.length; ++i) {
                    this.on(type[i], func);
                }
                return;
            }

            if (type.substr(0,2) !== 'on') {
                type = 'on' + type;
            }
            
            if (typeof this[type] !== 'function') {
                this[type] = func;
            } else {
                RGraph.addCustomEventListener(this, type, func);
            }
    
            return this;
        };








        //
        // This facilitates the data for the datagrid to be reverted
        // to the original order, negating sorting.
        //
        // @param object opt The various options that control the
        //                   function Currently there's just one: edits
        //                   Which defaults to true and allows you to
        //                   stipulate whether edits are applied after
        //                   the data has been reset.
        //
        this.resetData = function (opt = {edits: true})
        {

            var original = RGraph.arrayClone(this.original_data, true);
            this.setData(original);

            //
            // Get rid of the column sort
            //
            this.resetSortData()
            
            // Reapply edits so that any edited data isn't lost.
            if (opt.edits) {
                this.applyStoredEdits();
            }
            
            this.redraw();

            RGraph.fireCustomEvent(obj, 'resetdata');
        };








        //
        // This function is used to apply the stored edits to the
        // data. It's used  by the resetData() function and comes
        // after  the column-sorting is reset to the default. If
        // not used then the edits would be lost.
        //
        this.applyStoredEdits = function ()
        {
            for (var i=0; i<this.edits.length; ++i) {

                var row = this.edits[i].row;
                var col = this.edits[i].column;
                var val = this.edits[i].value;

                this.data[row][col].value = val;
            }
        };








        //
        // Returns the relevant indexes converted from a
        // cell identifier. For example:
        //
        // A1 = [0,0]
        // G6 = [6,5]
        // F  = [5,null]
        // 4  = [null,3]
        //
        this.parseCellIdentifier = function()
        {
            // 
            //Converts letter row identifiers to a row ID
            //
            var lettersToId = function (letters)
            {
                var lettersReversed = letters.split("").toReversed().join("");

                for (var i=0,column=0; i<lettersReversed.length; ++i) {
                
                    var letterIdx = (lettersReversed.toLowerCase().charCodeAt(i) - 97);

                    // Accommodate a lot of COLUMNS - could be
                    // better as a loop though
                    if (i === 0) {column += letterIdx;
                    } else if (i === 1) { column += ((letterIdx + 1) * 26);
                    } else if (i === 2) { column += ((letterIdx + 1) * 26 * 26);
                    } else if (i === 3) { column += ((letterIdx + 1) * 26 * 26 * 26);
                    } else if (i === 4) { column += ((letterIdx + 1) * 26 * 26 * 26 * 26);
                    } else if (i === 5) { column += ((letterIdx + 1) * 26 * 26 * 26 * 26 * 26);
                    } else if (i === 6) { column += ((letterIdx + 1) * 26 * 26 * 26 * 26 * 26 * 26);
                    } else if (i === 7) { column += ((letterIdx + 1) * 26 * 26 * 26 * 26 * 26 * 26 * 26);}
                }

                return column;
            }





            var args = RGraph.getArgs(arguments, 'id');
            
            if (RGraph.isString(args.id)) {
                args.id = args.id.trim();
    
                // Get a specific cell
                if (args.id.match(/^([a-z]+)([0-9]+)$/i)) {
                    var column = lettersToId(RegExp.$1);
                    var row    = parseInt(RegExp.$2) - 1;
    
                // Get a row
                } else if (args.id.match(/^([0-9])+$/i)) {
                    var clumn = null;
                    var row  = parseInt(RegExp.$1) - 1;
                
                // Get a column
                } else if (args.id.match(/^([a-z])+$/i)) {
                    var column = lettersToId(RegExp.$1) ;
                    var row    = null;
                }
             
            //
            // An array of indexes has been given
            //
            } else if (RGraph.isArray(args.id)) {
                var column = args.id[0];
                var row    = args.id[1];
             
             //
             // A number has been given - return null for the column
             //
             } else if (RGraph.isNumber(args.id)) {

                var column = null;
                var row    = parseInt(args.id) < 0 ? 0 : parseInt(args.id);
             }
            
            return {
                row:    row,
                column: column
            };
        };








        //
        // This function calculates all of the column widths.
        // It's in a function so that it can be called repeatedly
        // if necessary. If the datagrid is long and there's not
        // much on the page, adding the datagrid can cause
        // scrollbars to appear which then reduces the amount of
        // horizontal space that's available. This then causes
        // the datagrid to overflow the screen. By recalling this
        // function the column widthsz can be easily recalculated.
        //
        this.calculateColumnWidths = function ()
        {
            var width = obj.container.offsetWidth;

            if (obj.properties.columnsWidths.length > 0) {
                for (var i=0,specifiedWidthSum=0,specifiedWidthCount=0; i<obj.properties.columnsWidths.length; ++i) {
                    if (RGraph.isNumeric(obj.properties.columnsWidths[i])) {
                        specifiedWidthSum += parseFloat(obj.properties.columnsWidths[i]);
                        specifiedWidthCount++;
                    }
                }

                var remainderWidth = width - specifiedWidthSum;

                //
                // Now fill the obj.columnWidths array
                //
                for (var i=0; i<obj.data[0].length; ++i) {
                    if (RGraph.isNumeric(obj.properties.columnsWidths[i])) {
                        obj.columnWidths[i] = obj.properties.columnsWidths[i];
                    } else {
                        obj.columnWidths[i] = (remainderWidth / (obj.data[0].length - specifiedWidthCount) );
                    }
                }

            } else {

                obj.columnWidths = RGraph.arrayFill(
                    [],
                    (obj.data && obj.data[0]) ? obj.data[0].length : 0,
                    obj.container.offsetWidth / ((obj.data && obj.data[0]) ? obj.data[0].length : 1)
                );
            }

            // Get column widths from localStorage here, if they're
            // available (because of resizing);
            if (obj.properties.columnsResizable && obj.properties.columnsResizablePersistent) {

                var columnWidths = obj.loadColumnSizesFromLocalStorage(obj);
                obj.columnWidthsOriginal = RGraph.arrayClone(obj.columnWidths);

                if (RGraph.isArray(columnWidths)) {

                    for (var i=0; i<obj.columnWidths.length; ++i) {
                        if (RGraph.isNumber(columnWidths[i])) {
                            obj.columnWidths[i] = columnWidths[i];
                        }
                    }
                }
            }
        };








        //
        // Determines whether a column is editable or not
        //
        // @param integer column The column ID
        // @param string  str    The pattern given in the
        //                       editableColumns property.
        //
        this.isEditableColumn = function ()
        {
            var args = RGraph.getArgs(arguments, 'column,pattern');

            // A much shorter version of this function
            return this.inRange(args.pattern, args.column);
            
            //var parts   = String(args.pattern).split(/\s*,\s*/);
            //var columns = [];

            //for (var i=0; i<parts.length; ++i) {

            //    // Match 2-4
            //    if (parts[i].match(/^\s*(\d+)\s*-\s*(\d+)\s*$/)) {
            //        var from = Number(RegExp.$1);
            //        var to   = Number(RegExp.$2);

            //    // Match 2-
            //    } else if (parts[i].match(/^\s*(\d+)\s*-\s*$/)) {
            //        var from = Number(RegExp.$1);
            //        var to   = this.numcolumns - 1;

            //    // Match -4
            //    } else if (parts[i].match(/^\s*-\s*(\d+)\s*$/)) {
            //        var from = 0;
            //        var to   = Number(RegExp.$1);

            //    // Match 4  (a simple number)
            //    } else if (parts[i].match(/^\s*(\d+)\s*$/)) {
            //        var from = Number(RegExp.$1);
            //        var to   = Number(RegExp.$1);
            //    }
                

            //    for (var j=from; j<=to; ++j) {
            //        columns.push(j);
            //    }
            //}

            //return columns.includes(Number(args.column));
        };








        //
        // Returns the property - checking first if it's an object. If so
        // then the relevant index is returned. If not then the property
        // is returned as-is.
        //
        // @param string mixed The property to check
        // @param mixed index  The index to check 
        //
        this.propertyArrayOrString = function (property, index)
        {
            if (RGraph.isArray(property)) {
                return property[index];
            } else {
                return property;
            }
        };








        //
        // This function allows to specify a range of column
        // indexes for various properties including:
        //
        // editableColumns
        // columnsHTML
        // sortableColumns
        // searchExclude
        //
        // @param mixed range The column(s) to return. This can be
        //                    of the following formats:
        //                     0-5: A range of column indexes
        //                      1-: A range of column indexes with
        //                          no upper limit
        //                      -5: A range of column indexes with
        //                          no lower limit
        //                       3: A simple number denoting a single
        //                          column
        //             1,2,3,4,5,6: A set of column indexes
        //
        // @return boolean Whether the column is in the range or not
        //
        this.inRange = function ()
        {
            var args    = RGraph.getArgs(arguments, 'range,column');
            var parts   = String(args.range).split(/\s*,\s*/);
            var columns = [];

            for (var i=0; i<parts.length; ++i) {

                // Match 2-4
                if (parts[i].match(/^\s*(\d+)\s*-\s*(\d+)\s*$/)) {
                    var from = Number(RegExp.$1);
                    var to   = Number(RegExp.$2);

                // Match 2-
                } else if (parts[i].match(/^\s*(\d+)\s*-\s*$/)) {
                    var from = Number(RegExp.$1);
                    var to   = this.numcolumns - 1;

                // Match -4
                } else if (parts[i].match(/^\s*-\s*(\d+)\s*$/)) {
                    var from = 0;
                    var to   = Number(RegExp.$1);

                // Match 4  (a simple number)
                } else if (parts[i].match(/^\s*(\d+)\s*$/)) {
                    var from = Number(RegExp.$1);
                    var to   = Number(RegExp.$1);
                }
                

                for (var j=from; j<=to; ++j) {
                    columns.push(j);
                }
            }

            return columns.includes(Number(args.column));
        };








        //
        // This is the 'end' of the constructor so if the first argument
        // contains configuration data - handle that.
        //
        RGraph.parseObjectStyleConfig(this, conf.options);
    };