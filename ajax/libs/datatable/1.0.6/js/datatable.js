(function ($) {

    "use strict";

    var DataTable = function (table, opts) {

        this.options = opts;
        this.table = table;
        this.currentPage = 0;
        this.currentStart = 0; // different from currentPage * pageSize because there is a filter
        this.filterIndex = [];

        /* If nb columns not specified, count the nunber of column from thead. */
        if (this.options.nbColumns < 0) {
            this.options.nbColumns = this.table.find('thead tr').first().find('th').length;
        }

        /* Create the base for pagination. */
        $(this.options.pagingDivSelector)
            .addClass('pagination-datatables')
            .addClass(this.options.pagingDivClass);
        var ul = $('<ul></ul>');
        ul.addClass(this.options.pagingListClass);
        $(this.options.pagingDivSelector)
            .html('')
            .append(ul);

        /* DATA ! */

        var dataTable = this;

        if (this.table.find('thead').length === 0) {
            var head = $('<thead></thead>');
            head.append(this.table.find('th').parent('tr'));
            this.table.prepend(head);
        }

        if (this.table.find('tbody').length === 0) {
            $('<tbody></tbody>').insertAfter(this.table.find('thead').first());
        }

        if ($.isArray(this.options.data)) {
            this.data = this.options.data;
        }
        else if ($.isPlainObject(this.options.data)) {
            if (this.table.data('size')) {
                this.options.data.size = parseInt(this.table.data('size'), 10);
            }
            if (this.options.data.timeout === undefined) {
                this.options.data.timeout = 2000;
            }
            if (this.options.data.refresh === undefined) {
                this.options.data.refresh = false;
            }
            if (this.options.data.allInOne === undefined) {
                this.options.data.allInOne = false;
            }
            this._timeout = -1;
            this.data = [];
            if (this.options.data.size !== undefined) {
                $(this.options.loadingDivSelector).html('<div class="progress progress-striped active datatable-load-bar"><div class="bar" style="width: 0%;"></div></div>');
                if (this.options.data.allInOne) {
                    this.getAjaxDataAsync(true);
                }
                else {
                    for (var i = 0; i < this.options.data.size; i += this.options.pageSize * this.options.pagingNumberOfPages) {
                        this.getAjaxDataAsync(i);
                    }
                }
            }
            else {
                $(this.options.loadingDivSelector).html('<div class="progress progress-striped active datatable-load-bar"><div class="bar" style="width: 100%;"></div></div>');
                this.getAjaxDataSync();
            }
        }
        else {
            this.data = [];
            this.table.find('tbody tr').each(function () {
                var line = [];
                $(this).find('td').each(function () {
                    line.push($(this).html());
                });
                dataTable.data.push(line);
            });
            if (!this.options.forceStrings && this.data.length) {
                for (var c = 0; c < this.data[0].length; ++c) {
                    var isNumeric = true;
                    for (var i = 0; i < this.data.length; ++i) {
                        if (!$.isNumeric(this.data[i][c]) && this.data[i][c] !== "") {
                            isNumeric = false;
                        }
                    }
                    if (isNumeric) {
                        for (var i = 0; i < this.data.length; ++i) {
                            if (this.data[i][c] !== "") {
                                this.data[i][c] = parseFloat(this.data[i][c]);
                            }
                        }
                    }
                }
            }
        }

        /* Add sorting class to all th and add callback. */
        this.createSort();

        /* Add filter where it's needed. */
        this.createFilter();

    };

    DataTable.prototype = {

        constructor: DataTable,

        /**
        * 
        * Clear size option and set timeout (if specified) for refresh.
        * 
        * Note: This function should be call when a ajax loading is finished.
        * 
        * @update refreshTimeOut The new timeout
        *         
        **/
        clearAjaxLoading: function () {
            if (this.options.data.refresh) {
                this.refreshTimeOut = setTimeout((function (datatable) {
                    return function () { datatable.getAjaxDataSync(0, true); };
                })(this), this.options.data.refresh);
            }
        },

        /**
        * 
        * Hide the loading divs.
        * 
        **/
        hideLoadingDivs: function () {
            this.getLoadingDivs().remove();
        },


        /**
        * 
        * Update the loading divs with the current % of data load (according to this.options.data.size).
        * 
        * Note: Call clearAjaxLoading & hideLoadingDivs if all the data have been loaded.
        *         
        **/
        updateLoadingDivs: function () {
            if (this.data.length === this.options.data.size) {
                this.clearAjaxLoading();
                this.hideLoadingDivs();
            }
            else {
                this.getLoadingDivs().find('div.progress .bar').css('width', parseInt(100 * this.data.length / this.options.data.size, 10) + '%');
            }
        },

        /**
        * 
        * Get data according to this.options.data, asynchronously, using recursivity.
        * 
        * @param start The first offset to send to the server
        * 
        * @update data Concat data received from server to old data
        * 
        * Note: Each call increment start by pageSize * pagingNumberOfPages.
        *            
        **/
        getAjaxDataAsync: function (start) {
            $.ajax({
                url: this.options.data.url,
                type: this.options.data.type,
                data: start === true ? {} : {
                    offset: start,
                    limit: this.options.pageSize * this.options.pagingNumberOfPages
                },
                dataType: 'json',
                ajaxI: start,
                ajaxThis: this,
                success: function (data, _jqxhr, _text) {
                    this.ajaxThis.data = this.ajaxThis.data.concat(data);
                    this.ajaxThis.updateLoadingDivs();
                    clearTimeout(this.ajaxThis._timeout);
                    if (this.ajaxThis.data.length === this.ajaxThis.options.data.size) {
                        this.ajaxThis.sort(true);
                    }
                    else {
                        this.ajaxThis._timeout = setTimeout(function (datatable) {
                            return function () {
                                datatable._timeout = -1;
                                datatable.sort(true);
                            }
                        } (this.ajaxThis), 1000);
                    }
                },
                error: function (_jqxhr, text, error) {
                    switch (_jqxhr.status) {
                        case 404:
                        case 500:
                            console.log("ERROR: " + error + " - " + text);
                            console.log(_jqxhr);
                            break;
                        default:
                            this.ajaxThis.getAjaxDataAsync(this.ajaxI);
                    }
                },
                timeout: this.options.data.timeout
            });
        },

        /**
        * 
        * Load "synchronously" data from server: Each new request is send only after the last
        * one have been received.
        * 
        * @param start The first offset to send to the server
        * @param allInOne true if all the real data (this.data) should be updated only at the
        *      end of the load. If not specified or false, the data are refreshed after each request.
        * 
        * @update syncData Temporary data used if allInOne is true (Should not be used in another method)
        * @update data Concat data received from server to old data
        * 
        * Note: Each call increment start by pageSize * pagingNumberOfPages.
        * 
        **/
        getAjaxDataSync: function (start, allInOne) {
            if (typeof start === 'undefined') {
                start = 0;
            }
            if (typeof allInOne === 'undefined') {
                allInOne = false;
            }
            if (allInOne && this.syncData === undefined) {
                this.syncData = [];
            }
            // console.log("Call data sync : " + start + " - " + allInOne + " - " + this.syncData.length) ;
            $.ajax({
                url: this.options.data.url,
                type: this.options.data.type,
                data: {
                    offset: start,
                    limit: this.options.pageSize * this.options.pagingNumberOfPages
                },
                dataType: 'json',
                ajaxI: start,
                ajaxAllInOne: allInOne,
                ajaxThis: this,
                success: function (data, _text, _jqxhr) {
                    if (data.length !== 0) {
                        if (this.ajaxAllInOne) {
                            this.ajaxThis.syncData = this.ajaxThis.syncData.concat(data);
                        }
                        else {
                            this.ajaxThis.data = this.ajaxThis.data.concat(data);
                            this.ajaxThis.sort(true);
                        }
                        this.ajaxThis.getAjaxDataSync(this.ajaxI + this.ajaxThis.options.pageSize * this.ajaxThis.options.pagingNumberOfPages,
                                this.ajaxAllInOne);
                    }
                    else {
                        if (this.ajaxAllInOne) {
                            this.ajaxThis.data = this.ajaxThis.syncData;
                            delete this.ajaxThis.syncData;
                        }
                        this.ajaxThis.clearAjaxLoading();
                        this.ajaxThis.hideLoadingDivs();
                        this.ajaxThis.sort(true);
                    }
                },
                error: function (_jqxhr, text, error) {
                    switch (_jqxhr.status) {
                        case 404:
                        case 500:
                            console.log("ERROR: " + error + " - " + text);
                            console.log(_jqxhr);
                            break;
                        default:
                            this.ajaxThis.getAjaxDataSync(this.ajaxI, this.ajaxAllInOne);
                    }
                },
                timeout: this.options.data.timeout
            });
        },

        /**
        * 
        * @return The header of the table
        * 
        **/
        getHead: function () {
            return this.table.find('thead').first();
        },

        /**
        * 
        * @return The body of the table
        * 
        **/
        getBody: function () {
            return this.table.find('tbody').first();
        },

        /**
        * 
        * @return The counter divs
        *         
        **/
        getCounter: function () {
            return $(this.options.counterDivSelector);
        },

        /**
        * 
        * @return The loading divs
        * 
        **/
        getLoadingDivs: function () {
            return $(this.options.loadingDivSelector);
        },

        /**
        * 
        * @return The paging lists created in the paging divs
        *             
        **/
        getPagingLists: function () {
            return $(this.options.pagingDivSelector).find('ul');
        },

        /**
        * 
        * @return The last page number according to options.pageSize and current number of filtered elements.
        * 
        **/
        getLastPageNumber: function () {
            return parseInt(Math.ceil(this.filterIndex.length / this.options.pageSize), 10);
        },

        /** 
        * 
        * Update the paging divs. 
        * 
        **/
        updatePaging: function () {

            /* Be carefull if you change something here, all this part calculate the first and last page to display.
            I choose to center the current page, it's more beautiful... */

            var nbPages = this.options.pagingNumberOfPages;
            var dataTable = this;
            var cp = parseInt(this.currentStart / this.options.pageSize, 10) + 1;
            var lp = this.getLastPageNumber();
            var start;
            var end;

            if (cp < nbPages / 2) {
                start = 1;
            }
            else if (cp >= lp - nbPages / 2) {
                start = lp - nbPages + 1;
                if (start < 1) {
                    start = 1;
                }
            }
            else {
                start = parseInt(cp - nbPages / 2 + 1, 10);
            }

            if (start + nbPages < lp + 1) {
                end = start + nbPages - 1;
            }
            else {
                end = lp;
            }

            /* Juste iterate over each paging list and append li to ul. */

            this.getPagingLists().each(function () {
                $(this).html('');
                if (dataTable.options.firstPage) {
                    $(this).append('<li class="' + ((cp === 1) ? 'active' : '') + '"><a data-page="first">' + dataTable.options.firstPage + '</a></li>');
                }
                if (dataTable.options.prevPage) {
                    $(this).append('<li class="' + ((cp === 1) ? 'active' : '') + '"><a data-page="prev">' + dataTable.options.prevPage + '</a></li>');
                }
                for (var i = start; i <= end; i++) {
                    $(this).append('<li class="' + ((i === cp) ? 'active' : '') + '"><a data-page="' + i + '">' + i + '</a></li>');
                }
                if (dataTable.options.nextPage) {
                    $(this).append('<li class="' + ((cp === lp || lp === 0) ? 'active' : '') + '"><a data-page="next">' + dataTable.options.nextPage + '</a></li>');
                }
                if (dataTable.options.lastPage) {
                    $(this).append('<li class="' + ((cp === lp || lp === 0) ? 'active' : '') + '"><a data-page="last">' + dataTable.options.lastPage + '</a></li>');
                }
            });

            /* Add callback. */

            this.getPagingLists().find('a').on('click.datatable', function () {
                if ($(this).parent('li').hasClass('active')) {
                    return;
                }
                var page = $(this).data('page');
                switch (page) {
                    case 'first':
                        dataTable.loadPage(1);
                        break;
                    case 'prev':
                        dataTable.loadPage(cp - 1);
                        break;
                    case 'next':
                        dataTable.loadPage(cp + 1);
                        break;
                    case 'last':
                        dataTable.loadPage(lp);
                        break;
                    default:
                        dataTable.loadPage(parseInt(page, 10));
                }
            });

        },

        /**
        * 
        * Update the counter divs.
        * 
        **/
        updateCounter: function () {
            var cp = this.filterIndex.length ? parseInt(this.currentStart / this.options.pageSize, 10) + 1 : 0;
            var lp = parseInt(Math.ceil(this.filterIndex.length / this.options.pageSize), 10);
            var first = this.filterIndex.length ? this.currentStart + 1 : 0;
            var last = (this.currentStart + this.options.pageSize) > this.filterIndex.length ? this.filterIndex.length : this.currentStart + this.options.pageSize;
            this.getCounter().html(this.options.counterText.call(this.table, cp, lp, first, last, this.filterIndex.length, this.data.length));
        },

        /** 
        * 
        * @return The sort function according to options.sort, options.sortKey & options.sortDir.
        * 
        * Note: This function could return false if no sort function can be generated.
        * 
        **/
        getSortFunction: function () {
            if (this.options.sort === false) {
                return false;
            }
            if ($.isFunction(this.options.sort)) {
                return this.options.sort;
            }
            if (this.data.length === 0 || !(this.options.sortKey in this.data[0])) {
                return false;
            }
            var key = this.options.sortKey;
            var asc = this.options.sortDir === 'asc';
            if ($.isFunction(this.options.sort[key])) {
                return function (s) {
                    return function (a, b) {
                        var vala = a[key], valb = b[key];
                        return asc ? s(vala, valb) : -s(vala, valb);
                    };
                } (this.options.sort[key]);
            }
            return function (a, b) {
                var vala = a[key], valb = b[key];
                if (vala > valb) { return asc ? 1 : -1; }
                if (vala < valb) { return asc ? -1 : 1; }
                return 0;
            };
        },

        /** 
        * 
        * Destroy the filters (remove the filter line).
        * 
        **/
        destroyFilter: function () {
            $('.datatable-filter-line').remove();
        },

        /**
        * 
        * Change the text input filter placeholder according to this.options.filterText.
        * 
        **/
        changePlaceHolder: function () {
            var placeholder = this.options.filterText ? this.options.filterText : '';
            $('.datatable-filter-line input[type="text"]').attr('placeholder', placeholder);
        },

        /**
        * 
        * Create a text filter for the specified field.
        * 
        * @param field The field corresponding to the filter
        * 
        * @update filters Add the new filter to the list of filter (calling addFilter)
        * 
        * @return The input filter
        * 
        **/
        createTextFilter: function (field) {
            var opt = this.options.filters[field];
            var input = opt instanceof $ ? opt : $('<input type="text" />');
            if (this.options.filterText) {
                input.attr('placeholder', this.options.filterText);
            }
            input.addClass('datatable-filter datatable-input-text');
            input.attr('data-filter', field);
            this.filterVals[field] = '';
            var typewatch = (function () {
                var timer = 0;
                return function (callback, ms) {
                    clearTimeout(timer);
                    timer = setTimeout(callback, ms);
                };
            })();
            input.on('keyup keydown', (function (datatable) {
                return function () {
                    var val = $(this).val().toUpperCase();
                    var field = $(this).data('filter');
                    typewatch(function () {
                        datatable.filterVals[field] = val;
                        datatable.filter();
                    }, 300);
                };
            })(this));
            var regexp = opt === 'regexp' || input.attr('data-regexp');
            if ($.isFunction(opt)) {
                this.addFilter(field, opt);
            }
            else if (regexp) {
                this.addFilter(field, function (data, val) {
                    return new RegExp(val).test(String(data));
                });
            }
            else {
                this.addFilter(field, function (data, val) {
                    return String(data).toUpperCase().indexOf(val) !== -1;
                });
            }
            input.addClass(this.options.filterInputClass);
            return input;
        },

        /**
        * Check if the specified value is in the specified array, without strict type checking.
        *
        * @param val The val to search
        * @param arr The array
        *
        * @return true if the value was found in the array
        **/
        _isIn: function (val, arr) {
            var found = false;
            for (var i = 0; i < arr.length && !found; ++i) {
                found = arr[i] == val;
            }
            return found;
        },

        /**
        * Return the index of the specified element in the object.
        *
        * @param v
        * @param a
        *
        * @return The index, or -1
        **/
        _index: function (v, a) {
            if (a === undefined || a === null) {
                return -1;
            }
            var index = -1;
            for (var i = 0; i < a.length && index == -1; ++i) {
                if (a[i] === v) index = i;
            }
            return index;
        },

        /**
        * Return the keys of the specified object.
        *
        * @param obj
        *
        * @return The keys of the specified object.
        **/
        _keys: function (obj) {
            if (obj === undefined || obj === null) {
                return undefined;
            }
            var keys = [];
            for (var k in obj) {
                if (obj.hasOwnProperty(k)) keys.push(k);
            }
            return keys;
        },

        /**
        * 
        * Create a select filter for the specified field.
        * 
        * @param field The field corresponding to the filter
        * 
        * @update filters Add the new filter to the list of filter (calling addFilter)
        * 
        * @return The select filter.
        * 
        **/
        createSelectFilter: function (field) {
            var opt = this.options.filters[field];
            var values = {}, selected = [], multiple = false, empty = true, emptyValue = this.options.filterEmptySelect;
            var tag = false;
            if (opt instanceof $) {
                tag = opt;
            }
            else if ($.isPlainObject(opt) && 'element' in opt && opt.element) {
                tag = opt.element;
            }
            if (opt instanceof $ || opt === 'select') {
                values = this.getFilterOptions(field);
            }
            else {
                multiple = ('multiple' in opt) && (opt.multiple === true);
                empty = ('empty' in opt) && opt.empty;
                emptyValue = (('empty' in opt) && (typeof opt.empty === 'string')) ? opt.empty : this.options.filterEmptySelect;
                if ('values' in opt) {
                    if (opt.values === 'auto') {
                        values = this.getFilterOptions(field);
                    }
                    else {
                        values = opt.values;
                    }
                    if ('default' in opt) {
                        selected = opt['default'];
                    }
                    else if (multiple) {
                        selected = [];
                        for (var k in values) {
                            if ($.isPlainObject(values[k])) {
                                selected = selected.concat(this._keys(values[k]));
                            }
                            else {
                                selected.push(k);
                            }
                        }
                    }
                    else {
                        selected = [];
                    }
                    if (!$.isArray(selected)) {
                        selected = [selected];
                    }
                }
                else {
                    values = opt;
                    selected = multiple ? this._keys(values) : [];
                }
            }
            var select = tag ? tag : $('<select></select>');
            if (multiple) {
                select.attr('multiple', 'multiple');
            }
            if (opt['default']) {
                select.attr('data-default', opt['default']);
            }
            select.addClass('datatable-filter datatable-select');
            select.attr('data-filter', field);
            if (empty) {
                select.append('<option value="" data-empty="true">' + emptyValue + '</option>');
            }
            var allKeys = [];
            for (var key in values) {
                if ($.isPlainObject(values[key])) {
                    var optgroup = $('<optgroup label="' + key + '"></optgroup>');
                    for (var skey in values[key]) {
                        if (values[key].hasOwnProperty(skey)) {
                            allKeys.push(skey);
                            optgroup.append('<option value="' + skey + '" ' +
                                (this._isIn(skey, selected) ? 'selected' : '') + '>' +
                                values[key][skey] + '</option>');
                        }
                    }
                    select.append(optgroup);
                }
                else {
                    allKeys.push(key);
                    select.append('<option value="' + key + '" ' +
                        (this._isIn(key, selected) ? 'selected' : '') + '>' + values[key] + '</option>');
                }
            }
            var val = select.val();
            this.filterVals[field] = multiple ? val : ((empty && !val) ? allKeys : [val]);
            select.change(function (allKeys, multiple, empty, datatable) {
                return function () {
                    var val = $(this).val();
                    var field = $(this).data('filter');
                    datatable.filterVals[field] = multiple ? val : ((empty && !val) ? allKeys : [val]);
                    datatable.filter();
                };
            } (allKeys, multiple, empty, this));
            if ($.isPlainObject(opt) && typeof opt.fn === 'function') {
                this.addFilter(field, opt.fn);
                select.data('filterType', 'function');
            }
            else {
                this.addFilter(field, function (aKeys, datatable) {
                    return function (data, val) {
                        if (!val) { return false; }
                        if (val == aKeys && !data) { return true; }
                        return datatable._isIn(data, val);
                    };
                } (allKeys, this));
                select.data('filterType', 'default');
            }
            select.addClass(this.options.filterSelectClass);
            return select;
        },

        /**
        * 
        * Create the filter line according to options.filters.
        * 
        **/
        createFilter: function () {
            this.filters = [];
            this.filterTags = [];
            this.filterVals = [];
            if (this.options.filters) {
                var tr = $('<tr class="datatable-filter-line"></tr>');
                for (var field in this.options.filters) {
                    if (this.options.filters.hasOwnProperty(field)) {
                        var td = $('<td></td>');
                        if (this.options.filters[field] !== false) {
                            var opt = this.options.filters[field];
                            var input = (opt === true || opt === 'regexp' || opt === 'input' || $.isFunction(opt)) || (opt instanceof $ && opt.is('input'));
                            var filter = input ? this.createTextFilter(field) : this.createSelectFilter(field);
                            this.filterTags[field] = filter;
                            if (!filter.parents('html').length) {
                                td.addClass('datatable-filter-cell');
                                td.append(filter);
                            }
                        }
                        if (!$.isPlainObject(this.options.filters[field]) || !this.options.filters[field].noColumn) {
                            tr.append(td);
                        }
                    }
                }
                if (tr.find('td.datatable-filter-cell').length > 0) {
                    tr.insertAfter(this.table.find('thead tr').last());
                }
            }
        },

        /** 
        * 
        * Filter data and refresh.
        * 
        * @param keepCurrentPage true if the current page should not be changed (on refresh
        *      for example), if not specified or false, the current page will be set to 0.
        * 
        * @update filterIndex Will contain the new filtered indexes
        * @update currentStart The new starting point
        * 
        **/
        filter: function (keepCurrentPage) {
            if (typeof keepCurrentPage === 'undefined') {
                keepCurrentPage = false;
            }
            var oldCurrentStart = this.currentStart;
            this.currentStart = 0;
            this.filterIndex = [];
            for (var i = 0; i < this.data.length; i++) {
                if (this.checkFilter(this.data[i])) { this.filterIndex.push(i); }
            }
            if (keepCurrentPage) {
                this.currentStart = oldCurrentStart;
                while (this.currentStart >= this.filterIndex.length) {
                    this.currentStart -= this.options.pageSize;
                }
                if (this.currentStart < 0) {
                    this.currentStart = 0;
                }
            }
            if (this.options.filterSelectOptions && this.filterIndex.length > 0) {
                var dtable = this;
                var allKeys = [];
                for (var j = 0; j < this.data[0].length; ++j) {
                    allKeys.push({});
                }
                for (var i = 0; i < this.filterIndex.length; ++i) {
                    var row = this.data[this.filterIndex[i]];
                    for (var j = 0; j < row.length; ++j) {
                        allKeys[j][row[j]] = true;
                    }
                }
                for (var k = 0; k < allKeys.length; ++k) {
                    var keys = this._keys(allKeys[k]);
                    if (this.filterTags[k] && this.filterTags[k].is('select') && this.filterTags[k].data('filterType') == 'default') {
                        this.filterTags[k].find('option:not([data-empty])').hide();
                        this.filterTags[k].find('option').filter(function () {
                            return dtable._isIn($(this).val(), keys);
                        }).show();
                    }
                }
            }
            this.refresh();
        },


        /**
        *
        * Reset all filters.
        *
        **/
        resetFilters: function () {
            var dtable = this;
            $.each(this.filterTags, function (_i, e) {
                var field = e.data('filter');
                if (e.is('input')) {
                    e.val('');
                    dtable.filterVals[field] = '';
                }
                else {
                    if (e.attr('multiple')) {
                        var allKeys = [];
                        e.find('option').each(function () {
                            $(this).attr('selected', 'selected');
                            allKeys.push($(this).val());
                        });
                        dtable.filterVals[field] = allKeys;
                    }
                    else if (e.data('default') && e.find('option[value="' + e.data('default') + '"]').length > 0) {
                        e.find('option').attr('selected', false);
                        e.find('option[value="' + e.data('default') + '"]').attr('selected', 'selected');
                        dtable.filterVals[field] = [e.data('default')];
                    }
                    else if (e.find('option').length > 0) {
                        e.find('option').attr('selected', false);
                        e.find('option').first().attr('selected', 'selected');
                        if (e.find('option').first().data('empty')) {
                            var allKeys = [];
                            e.find('option').each(function () {
                                if (!$(this).data('empty')) {
                                    allKeys.push($(this).val());
                                }
                            });
                            dtable.filterVals[field] = allKeys;
                        }
                        else {
                            dtable.filterVals[field] = [e.find('option').first().val()];
                        }
                    }
                }
            });
            this.filter();
        },

        /**
        * 
        * Check if str is a valid HTML tag.
        *
        * @param str The string to check.
        *
        * @return true if str is a valid HTML tag, false otherwise.
        *
        **/
        isHtml: function (str) {
            if (typeof str !== "string") {
                return false;
            }
            var _isHtml = false;
            try {
                _isHtml = $(str).is('*');
            }
            catch (err) {
                _isHtml = false;
            }
            return _isHtml;
        },

        /**
        * 
        * Check if the specified data match the filters according to this.filters
        * and this.filterVals.
        * 
        * @param data The data to check
        * 
        * @return true if the data match the filters, false otherwise
        * 
        **/
        checkFilter: function (data) {
            var ok = true;
            for (var fk in this.filters) {
                var currentData = fk[0] === '_' ? data : data[fk];
                if (this.isHtml(currentData)) {
                    currentData = $(currentData).text();
                }
                if (!this.filters[fk](currentData, this.filterVals[fk])) {
                    ok = false;
                    break;
                }
            }
            return ok;
        },

        /**
        * 
        * Add a new filter.
        * 
        * @update filters
        * 
        **/
        addFilter: function (field, filter) {
            this.filters[field] = filter;
        },

        /**
        * 
        * Get the filter select options for a specified field according
        * to this.data.
        * 
        * @return The options found.
        * 
        **/
        getFilterOptions: function (field) {
            var options = {}, values = [];
            for (var key in this.data) {
                if (this.data[key][field] !== '') {
                    values.push(this.data[key][field]);
                }
            }
            values.sort();
            for (var i in values) {
                if (values.hasOwnProperty(i)) {
                    if (this.isHtml(values[i])) {
                        var txt = $(values[i]).text();
                        options[txt] = txt;
                    }
                    else {
                        options[values[i]] = values[i];
                    }
                }
            }
            return options;
        },

        /**
        * 
        * Remove class, data and event on sort headers.
        * 
        **/
        destroySort: function () {
            $('thead th').removeClass('sorting sorting-asc sorting-desc')
                .unbind('click.datatable')
                .removeData('sort');
        },

        /**
        * 
        * Add class, event & data to headers according to this.options.sort or data-sort attribute
        * of headers.
        * 
        * @update options.sort Will be set to true if not already and a data-sort attribute is found.
        * 
        **/
        createSort: function () {
            var dataTable = this;
            if (!$.isFunction(this.options.sort)) {

                var countTH = 0;

                this.table.find('thead th').each(function () {

                    if ($(this).data('sort')) {
                        dataTable.options.sort = true;
                    }
                    else if (dataTable.options.sort === '*') {
                        $(this).data('sort', countTH);
                    }
                    else {
                        var key;
                        if ($.isArray(dataTable.options.sort)) {
                            key = countTH;
                        }
                        else if ($.isPlainObject(dataTable.options.sort)) {
                            key = dataTable._keys(dataTable.options.sort)[countTH];
                        }
                        if (key !== undefined && dataTable.options.sort[key]) {
                            $(this).data('sort', key);
                        }
                    }

                    if ($(this).data('sort') !== undefined) {
                        $(this).addClass('sorting');
                    }

                    countTH++;

                });

                this.table.find('thead th').on('click.datatable', function () {
                    if ($(this).data('sort') !== undefined) {
                        if ($(this).hasClass('sorting-asc')) {
                            dataTable.options.sortDir = 'desc';
                            $(this).removeClass('sorting-asc')
                                .addClass('sorting-desc');
                        }
                        else if ($(this).hasClass('sorting-desc')) {
                            dataTable.options.sortDir = 'asc';
                            $(this).removeClass('sorting-desc')
                                .addClass('sorting-asc');
                        }
                        else {
                            $(this).parent('tr').find('th').removeClass('sorting-desc').removeClass('sorting-asc');
                            dataTable.options.sortDir = 'asc';
                            dataTable.options.sortKey = $(this).data('sort');
                            $(this).addClass('sorting-asc');
                        }
                        dataTable.sort();
                        dataTable.refresh();
                    }
                });

            }
        },

        /** 
        * 
        * Trigger sort event on the table: If options.sort is a function, 
        * sort the table, otherwize trigger click on the column specifid by options.sortKey. 
        * 
        **/
        triggerSort: function () {
            if ($.isFunction(this.options.sort)) {
                this.sort();
                this.refresh();
            }
            else if (this.options.sortKey !== false) {
                var th;
                this.table.find('tr th').removeClass('sorting-desc').removeClass('sorting-asc');
                this.table.find('th').each(function (sortKey) {
                    return function () {
                        if ($(this).data('sort') === sortKey) {
                            th = $(this);
                        }
                    };
                } (this.options.sortKey));
                if (th !== undefined) {
                    th.addClass('sorting-' + this.options.sortDir);
                    this.sort();
                    this.refresh();
                }
            }
        },

        /** 
        * 
        * Sort the data. 
        * 
        * @update data
        * 
        **/
        sort: function (keepCurrentPage) {
            var fnSort = this.getSortFunction();
            if (fnSort === false) {
                return;
            }
            this.data.sort(fnSort);
            this.filter(keepCurrentPage);
        },

        /**
        * 
        * Try to identify the specified data with the specify identifier according
        * to this.options.identify.
        * 
        * @return true if the data match, false otherwize
        * 
        **/
        identify: function (id, data) {
            if (this.options.identify === false) {
                return false;
            }
            if ($.isFunction(this.options.identify)) {
                return this.options.identify(id, data);
            }
            return data[this.options.identify] == id;
        },

        /**
        * 
        * Find the index of the first element matching id in the data array.
        * 
        * @param The id to find (will be match according to this.options.identify)
        * 
        * @return The index of the first element found, or -1 if no element is found
        * 
        **/
        indexOf: function (id) {
            var index = -1;
            for (var i = 0; i < this.data.length && index === -1; i++) {
                if (this.identify(id, this.data[i])) {
                    index = i;
                }
            }
            return index;
        },

        /** 
        * 
        * Get an elements from the data array. 
        * 
        * @param id An identifier for the element (see this.options.identify)
        * 
        **/
        row: function (id) {
            if (this.options.identify === true) {
                return this.data[id];
            }
            return this.data[this.indexOf(id)];
        },

        /**
        *
        * Retrieve all data.
        *
        *
        **/
        all: function (filter) {
            if (typeof filter === "undefined"
                || filter === true) {
                return this.data;
            }
            var returnData = [];
            for (var i = 0; i < this.data.length; ++i) {
                if (filter(this.data[i])) {
                    returnData.push(this.data[i]);
                }
            }
            return returnData;
        },

        /** 
        * 
        * Add an element to the data array.
        * 
        * @param data The element to add
        * 
        * @update data
        * 
        **/
        addRow: function (data) {
            this.data.push(data);
            this.sort();
            this.filter();
            this.currentStart = parseInt(this._index(this._index(data, this.data), this.filterIndex) / this.options.pageSize, 10) * this.options.pageSize;
            this.refresh();
        },

        /** 
        * 
        * Add elements to the data array.
        * 
        * @param data Array of elements to add
        * 
        * @update data
        * 
        **/
        addRows: function (data) {
            this.data = this.data.concat(data);
            this.sort();
            this.filter();
            this.currentStart = parseInt(this._index(this._index(data, this.data), this.filterIndex) / this.options.pageSize, 10) * this.options.pageSize;
            this.refresh();
        },

        /** 
        * 
        * Remove an element from the data array.
        * 
        * @param id An identifier for the element (see this.options.identify)
        * 
        **/
        deleteRow: function (id) {
            var oldCurrentStart = this.currentStart;
            var index = this.indexOf(id);
            if (index === -1) {
                console.log('No data found with id: ' + id);
                return;
            }
            this.data.splice(index, 1);
            this.filter();
            if (oldCurrentStart < this.filterIndex.length) {
                this.currentStart = oldCurrentStart;
            }
            else {
                this.currentStart = oldCurrentStart - this.options.pageSize;
                if (this.currentStart < 0) { this.currentStart = 0; }
            }
            this.refresh();
        },

        /**
        *
        * Delete all elements matching the filter arg.
        *
        **/
        deleteAll: function (filter) {
            var oldCurrentStart = this.currentStart
            var newData = [];
            for (var i = 0; i < this.data.length; ++i) {
                if (!filter(this.data[i])) {
                    newData.push(this.data[i]);
                }
            }
            this.data = newData;
            this.filter();
            if (oldCurrentStart < this.filterIndex.length) {
                this.currentStart = oldCurrentStart;
            }
            else {
                this.currentStart = oldCurrentStart - this.options.pageSize;
                if (this.currentStart < 0) { this.currentStart = 0; }
            }
            this.refresh();
        },

        /** 
        * 
        * Update an element in the data array. Will add the element if it is not found.
        * 
        * @param id An identifier for the element (see this.options.identify)
        * @param data The new data (identifier value will be set to id)
        * 
        **/
        updateRow: function (id, data) {
            var index = this.indexOf(id);
            if (index !== -1) {
                if (id in data) {
                    delete data[id];
                }
                for (var key in this.data[index]) {
                    if (key in data) {
                        this.data[index][key] = data[key];
                    }
                }
                this.sort();
                this.filter();
                this.currentStart = parseInt(this._index(this.indexOf(id), this.filterIndex) / this.options.pageSize, 10) * this.options.pageSize;
                this.refresh();
            }
        },

        /** 
        * 
        * Change the current page and refresh. 
        * 
        * @param page The number of the page to load
        * 
        * @update currentStart
        * 
        **/
        loadPage: function (page) {
            var oldPage = this.currentStart / this.options.pageSize;
            if (page < 1) {
                page = 1;
            }
            else if (page > this.getLastPageNumber()) {
                page = this.getLastPageNumber();
            }
            this.currentStart = (page - 1) * this.options.pageSize;
            this.refresh();
            this.options.onChange.call(this.table, oldPage + 1, page);
        },

        /**
        * 
        * @return The current page
        * 
        **/
        getCurrentPage: function () {
            return this.currentStart / this.options.pageSize + 1;
        },

        /** 
        * 
        * Refresh the page according to current page (DO NOT SORT).
        * This function call options.lineFormat. 
        * 
        **/
        refresh: function () {
            this.options.beforeRefresh.call(this.table);
            this.updatePaging();
            this.updateCounter();
            this.getBody().html('');
            if (this.currentStart >= this.currentDataLength) {
                this.getBody().append('<tr><td colspan="' + this.options.nbColumns + '"><div class="progress progress-striped active"><div class="bar" style="width: 100%;"></div></div></div></tr>');
                return;
            }
            for (var i = 0; i < this.options.pageSize && i + this.currentStart < this.filterIndex.length; i++) {
                this.getBody().append(this.options.lineFormat.call(this.table, this.filterIndex[this.currentStart + i], this.data[this.filterIndex[this.currentStart + i]]));
            }
            this.options.afterRefresh.call(this.table);
        },

        /** 
        * 
        * Set a option and refresh the table if necessary.
        * 
        * @param key The name of the option to change
        * @param val The new option value
        * 
        * @update options
        * 
        **/
        setOption: function (key, val) {
            if (key in this.options) {
                this.options[key] = val;
                if (key === 'sort') {
                    this.destroySort();
                    this.createSort();
                    this.triggerSort();
                }
                if (key === 'sortKey' || key === 'sortDir') {
                    this.sort();
                }
                if (key === 'filters') {
                    this.destroyFilter();
                    this.createFilter();
                }
                if (key === 'filterText') {
                    this.changePlaceHolder();
                }
                this.filter();
            }
        },

        /** 
        * 
        * Set a list of options and refresh the table if necessary.
        * 
        * @param options A list of options to set (plain object)
        * 
        * @update options
        * 
        **/
        setOptions: function (options) {
            for (var key in options) {
                if (key in this.options) {
                    this.options[key] = options[key];
                }
            }
            if ('sort' in options) {
                this.destroySort();
                this.createSort();
                this.triggerSort();
            }
            else if ('sortKey' in options || 'sortDir' in options) {
                this.sort();
            }
            if ('filters' in options) {
                this.destroyFilter();
                this.createFilter();
            }
            if ('filterText' in options) {
                this.changePlaceHolder();
            }
            this.filter();
        },

        /** 
        * 
        * Remove all the elements added by the datatable. 
        * 
        **/
        destroy: function () {
            if (this.refreshTimeOut !== undefined) {
                clearTimeout(this.refreshTimeOut);
            }
            this.destroySort();
            $(this.options.pagingDivSelector)
                .removeClass(this.options.pagingDivClass)
                .removeClass('pagination-datatable')
                .html('');
            this.destroyFilter();
            this.table.removeClass(this.options.tableClass);
            this.getBody().html('');
            for (var i = 0; i < this.data.length; i++) {
                this.getBody().append(this.options.lineFormat(i, this.data[i]));
            }

        }
    };

    $.fn.datatable = function () {
        var args = arguments;
        var ret = -1, each;
        if (args.length === 0) { args = [{}]; }
        each = this.each(function () {
            if ($.isPlainObject(args[0])) {
                if (this.datatable === undefined) {
                    this.datatable = new DataTable($(this), $.extend({}, $.fn.datatable.defaults, args[0]));
                    /* If a sort key is specified, sort. */
                    this.datatable.triggerSort();
                    /* Then filter (and refresh) ! */
                    this.datatable.filter();
                }
                else {
                    this.datatable.setOptions(args[0]);
                }
            }
            else if (typeof args[0] === 'string') {
                switch (args[0]) {
                    case 'page':
                        if (1 in args) {
                            this.datatable.loadPage(parseInt(args[1]));
                        }
                        else {
                            ret = this.datatable.getCurrentPage();
                        }
                        break;
                    case 'reset-filters':
                        this.datatable.resetFilters();
                        break;
                    case 'select':
                        if (1 in args && !$.isFunction(args[1])) {
                            ret = this.datatable.row(args[1]);
                        }
                        else {
                            ret = this.datatable.all(args[1]);
                        }
                        break;
                    case 'insert':
                        if ($.isArray(args[1])) {
                            this.datatable.addRows(args[1]);
                        }
                        else {
                            this.datatable.addRow(args[1]);
                        }
                        break;
                    case 'update':
                        this.datatable.updateRow(args[1], args[2]);
                        break;
                    case 'delete':
                        if ($.isFunction(args[1])) {
                            this.datatable.deleteAll(args[1]);
                        }
                        else {
                            this.datatable.deleteRow(args[1]);
                        }
                        break;
                    case 'option':
                        this.datatable.setOption(args[1], args[2]);
                        break;
                    case 'refresh':
                        this.datatable.refresh();
                        break;
                    case 'destroy':
                        this.datatable.destroy();
                        delete this.datatable;
                        break;
                }
            }
        });
        return ret !== -1 ? ret : each;
    };

    $.fn.datatable.defaults = {
        forceStrings: false,
        tableClass: 'datatable',
        pagingDivSelector: '.paging',
        pagingDivClass: 'pagination pagination-centered',
        pagingListClass: '',
        counterDivSelector: '.counter',
        loadingDivSelector: '.loading',
        sort: false,
        sortKey: false,
        sortDir: 'asc',
        nbColumns: -1,
        pageSize: 20,
        pagingNumberOfPages: 9,
        identify: false,
        onChange: function (oldPage, newPage) { },
        counterText: function (currentPage, totalPage, firstRow, lastRow, totalRow, totalRowUnfiltered) {
            var counterText = 'Page ' + currentPage + ' on ' + totalPage + '. Showing ' + firstRow + ' to ' + lastRow + ' of ' + totalRow + ' entries';
            if (totalRow != totalRowUnfiltered) {
                counterText += ' (filtered from ' + totalRowUnfiltered + ' total entries)';
            }
            counterText += '.';
            return counterText;
        },
        firstPage: '<<',
        prevPage: '<',
        nextPage: '&gt;',
        lastPage: '&gt;&gt;',
        filters: {},
        filterText: 'Search... ',
        filterEmptySelect: '',
        filterSelectOptions: false,
        filterInputClass: '',
        filterSelectClass: '',
        beforeRefresh: function () { },
        afterRefresh: function () { },
        lineFormat: function (id, data) {
            var res = $('<tr></tr>');
            res.data('id', id);
            for (var key in data) {
                if (data.hasOwnProperty(key)) {
                    res.append('<td>' + data[key] + '</td>');
                }
            }
            return res;
        }
    };

} (window.jQuery)); 
