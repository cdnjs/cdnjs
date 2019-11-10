"use strict";

var DataTable = function (table, opts) {

    this.options = {};
    this.table = table;
    this.currentPage = 0;
    this.currentStart = 0; // different from currentPage * pageSize because there is a filter
    this.filterIndex = [];

    for (var k in DataTable.defaultOptions) {
        if (DataTable.defaultOptions.hasOwnProperty(k)) {
            if (opts.hasOwnProperty(k)) {
                this.options[k] = opts[k] ;
            }
            else {
                this.options[k] = DataTable.defaultOptions[k] ;
            }
        }
    }

    if (opts.hasOwnProperty('data')) {
        this.options.data = opts.data ;
    }

    /* If nb columns not specified, count the number of column from thead. */
    if (this.options.nbColumns < 0) {
        this.options.nbColumns = this.table.tHead.rows[0].cells.length;
    }

    /* Create the base for pagination. */
    this.pagingDivs = document.querySelectorAll(this.options.pagingDivSelector);
    for (var i = 0; i < this.pagingDivs.length; ++i) {
        var div = this.pagingDivs[i];
        this.addClass(div, 'pagination-datatables');
        this.addClass(div, this.options.pagingDivClass);
        var ul = document.createElement('ul');
        this.addClass(ul, this.options.pagingListClass);
        div.appendChild(ul);
    }
    this.pagingLists = document.querySelectorAll(this.options.pagingDivSelector + ' ul');
    this.counterDivs = document.querySelectorAll(this.options.counterDivSelector);
    this.loadingDiv = document.querySelector(this.options.loadingDivSelector);

    /* DATA ! */

    var dataTable = this;

    if (!this.table.tHead) {
        this.table.tHead = document.createElement('thead');
        this.table.appendChild(this.table.rows[0]);
    }

    /* Compatibility issue (forceStrings => No defined data types). */
    if (this.options.forceStrings) {
        this.options.dataTypes = false ;
    }

    var ths = this.table.tHead.rows[0].cells ;

    if (!this.table.tBodies[0]) {
        this.table.tBodies[0] = document.createElement('tbody');
    }

    if (this.options.data instanceof Array) {
        this.data = this.options.data;
    }
    else if (this.options.data instanceof Object) {
        var ajaxOptions = DataTable.defaultAjaxOptions;
        for (var k in this.options.data) {
            ajaxOptions[k] = this.options.data[k];
        }
        this.options.data = ajaxOptions;
        var fetchData = true;
        if (fetchData) {
            if (this.table.dataset.size !== undefined) {
                this.options.data.size = parseInt(this.table.dataset.size, 10);
            }
            this.data = [];
            if (this.options.data.size !== undefined) {
                this.loadingDiv.innerHTML = '<div class="progress datatable-load-bar">'
                    + '<div class="progress-bar progress-bar-striped active" style="width: 0%;">'
                    + '</div></div>';
                if (this.options.data.allInOne) {
                    this.getAjaxDataAsync(true);
                }
                else {
                    for (var i = 0; i < this.options.data.size;
                         i += this.options.pageSize * this.options.pagingNumberOfPages) {
                        this.getAjaxDataAsync(i);
                    }
                }
            }
            else {
                this.loadingDiv.innerHTML = '<div class="progress datatable-load-bar">'
                    + '<div class="progress-bar progress-bar-striped active" style="width: 0%;">'
                    + '</div></div>';
                this.getAjaxDataAsync(0, true);
            }
        }
    }
    else if (this.table.tBodies[0].rows.length > 0) {
        this.data = [];
        var rows = this.table.tBodies[0].rows;
        var nCols = rows[0].cells.length ;
        for (var i = 0; i < rows.length; ++i) {
            this.data.push ([]) ;
        }
        for (var j = 0 ; j < nCols ; ++j) {
            var dt = function (x) { return x ; } ;
            if (this.options.dataTypes instanceof Array) {
                switch (this.options.dataTypes[j]) {
                case 'int':
                    dt = parseInt ;
                    break ;
                case 'float':
                case 'double':
                    dt = parseFloat ;
                    break ;
                case 'date':
                case 'datetime':
                    dt = function (x) { return new Date(x) ; } ;
                    break ;
                case false:
                case true:
                case 'string':
                case 'str':
                    dt = function (x) { return x ; } ;
                    break ;
                default:
                    dt = this.options.dataTypes[j] ;
                }
            }
            for (var i = 0; i < rows.length; ++i) {
                this.data[i].push(dt(rows[i].cells[j].innerHTML.trim())) ;
            }
        }
        if (this.options.dataTypes === true) {
            for (var c = 0; c < this.data[0].length; ++c) {
                var isNumeric = true;
                for (var i = 0; i < this.data.length; ++i) {
                    if (this.data[i][c] !== ""
                        && !((this.data[i][c] - parseFloat(this.data[i][c]) + 1) >= 0)) {
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

    this.triggerSort();
    this.filter();

};

DataTable.prototype = {

    constructor: DataTable,

    /**
     *
     * Add the specified class(es) to the specified DOM Element.
     *
     * @param node The DOM Element
     * @param classes (Array or String)
     *
     **/
    addClass: function (node, classes) {
        if (typeof classes === "string") {
            classes = classes.split(' ');
        }
        classes.forEach(function (c) {
            if (!c) { return; }
            node.classList.add(c);
        });
    },

    /**
     *
     * Remove the specified node from the DOM.
     *
     * @param node The node to removes
     *
     **/
    removeNode: function (node) {
        if (node) {
            node.parentNode.removeChild(node);
        }
    },

    /**
     *
     * Clear size option and set timeout (if specified) for refresh.
     *
     * Note: This function should be call when a ajax loading is finished.
     *
     * @update refreshTimeOut The new timeout
     *
     **/
    setRefreshTimeout: function () {
        if (this.options.data.refresh) {
            clearTimeout(this.refreshTimeOut);
            this.refreshTimeOut = setTimeout((function (datatable) {
                return function () { datatable.getAjaxDataAsync(0, true); };
            })(this), this.options.data.refresh);
        }
    },

    /**
     *
     * Hide the loading divs.
     *
     **/
    hideLoadingDivs: function () {
        this.removeNode(this.loadingDiv);
    },


    /**
     *
     * Update the loading divs with the current % of data load (according
     * to this.options.data.size).
     *
     * Note: Call setRefreshTimeout & hideLoadingDivs if all the data have been loaded.
     *
     **/
    updateLoadingDivs: function () {
        if (this.data.length >= this.options.data.size) {
            this.setRefreshTimeout();
            this.hideLoadingDivs();
        }
        else {
            this.loadingDiv.querySelector('div.progress .progress-bar').style.width =
                parseInt(100 * this.data.length / this.options.data.size, 10) + '%';
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
    getAjaxDataAsync: function (start, recursive) {
        if (typeof recursive === "undefined") { recursive = false; }
        if (recursive && typeof this.syncData === "undefined") {
            this.syncData = {
                data: [],
                toAdd: [],
                toUpdate: {},
                toDelete: []
            };
        }
        var xhr = new XMLHttpRequest();
        xhr.timeout = this.options.data.timeout;
        xhr.onreadystatechange = function (datatable, start, recursive) {
            return function () {
                if (this.readyState == 4) {
                    switch (this.status) {
                    case 200:
                        if (recursive) {
                            if (this.response.length > 0) {
                                datatable.syncData.data =
                                    datatable.syncData.data.concat(this.response);
                                datatable.getAjaxDataAsync(start + datatable.options.pageSize * datatable.options.pagingNumberOfPages, true);
                            }
                            else {
                                var syncData = datatable.syncData;
                                delete datatable.syncData;
                                datatable.data = syncData.data;
                                datatable.addRows(syncData.toAdd);
                                syncData.toDelete.forEach(function (e) {
                                    if (e instanceof Function) {
                                        datatable.deleteAll(e);
                                    }
                                    else {
                                        datatable.deleteRow(e);
                                    }
                                });
                                for (var id in syncData.toUpdate) {
                                    datatable.updateRow(id, syncData.toUpdate[id]);
                                }

                                datatable.sort(true);
                                datatable.setRefreshTimeout();
                            }
                        }
                        else {
                            datatable.data = datatable.data.concat(this.response);
                            datatable.updateLoadingDivs();
                            datatable.sort(true);
                        }
                        break;
                    case 404:
                    case 500:
                        console.log("ERROR: " + this.status + " - " + this.statusText);
                        console.log(xhr);
                        break;
                    default:
                        datatable.getAjaxDataAsync(start, recursive);
                        break;
                    }
                }
            }
        } (this, start, recursive);
        var url      = this.options.data.url ;
        var limit    = this.options.pageSize * this.options.pagingNumberOfPages ;
        var formdata = new FormData();
        if (start !== true) {
            if (this.options.data.type.toUpperCase() == 'GET') {
                url += '?start=' + start + '&limit=' + limit ;
            }
            else {
                formdata.append('offset', start);
                formdata.append('limit', limit);
            }
        }
        xhr.open(this.options.data.type, url, true);
        xhr.responseType = 'json';
        xhr.send(formdata);
    },

    /**
     *
     * @return The last page number according to options.pageSize and
     * current number of filtered elements.
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

        /* Be carefull if you change something here, all this part calculate the first
           and last page to display. I choose to center the current page, it's more beautiful... */

        var nbPages = this.options.pagingNumberOfPages;
        var dataTable = this;
        var cp = parseInt(this.currentStart / this.options.pageSize, 10) + 1;
        var lp = this.getLastPageNumber();
        var start;
        var end;
        var first = this.filterIndex.length ? this.currentStart + 1 : 0;
        var last = (this.currentStart + this.options.pageSize) > this.filterIndex.length ?
            this.filterIndex.length : this.currentStart + this.options.pageSize;

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

        for (var i = 0; i < this.pagingLists.length; ++i) {
            var childs = [];
            if (dataTable.options.firstPage) {
                var li = document.createElement('li');
                if (cp === 1) { li.classList.add('active'); }
                li.innerHTML = '<a data-page="first">' + dataTable.options.firstPage + '</a>';
                childs.push(li);
            }
            if (dataTable.options.prevPage) {
                var li = document.createElement('li');
                if (cp === 1) { li.classList.add('active'); }
                li.innerHTML = '<a data-page="prev">' + dataTable.options.prevPage + '</a>';
                childs.push(li);
            }
            if (dataTable.options.pagingPages) {
                var _childs = this.options.pagingPages.call(this.table, start,
                                                            end, cp, first, last);
                if (_childs instanceof Array) {
                    childs = childs.concat(_childs);
                }
                else {
                    childs.push(_childs);
                }
            }
            else {
                for (var k = start; k <= end; k++) {
                    var li = document.createElement('li');
                    if (k === cp) { li.classList.add('active'); }
                    li.innerHTML = '<a data-page="' + k + '">' + k + '</a>';
                    childs.push(li);
                }
            }
            if (dataTable.options.nextPage) {
                var li = document.createElement('li');
                if (cp === lp || lp === 0) { li.classList.add('active'); }
                li.innerHTML = '<a data-page="next">' + dataTable.options.nextPage + '</a>';
                childs.push(li);
            }
            if (dataTable.options.lastPage) {
                var li = document.createElement('li');
                if (cp === lp || lp === 0) { li.classList.add('active'); }
                li.innerHTML = '<a data-page="last">' + dataTable.options.lastPage + '</a>';
                childs.push(li);
            }
            this.pagingLists[i].innerHTML = '';
            childs.forEach(function (e) {
                if (e.childNodes.length > 0) {
                    e.childNodes[0].addEventListener('click', function () {
                        if (this.parentNode.classList.contains('active') ||
                            typeof this.dataset.page === 'undefined') {
                            return;
                        }
                        switch (this.dataset.page) {
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
                            dataTable.loadPage(parseInt(parseInt(this.dataset.page), 10));
                        }
                    }, false);
                }
                this.pagingLists[i].appendChild(e);
            }, this);
        }

    },

    /**
     *
     * Update the counter divs.
     *
     **/
    updateCounter: function () {
        var cp = this.filterIndex.length ?
            parseInt(this.currentStart / this.options.pageSize, 10) + 1 : 0;
        var lp = parseInt(Math.ceil(this.filterIndex.length / this.options.pageSize), 10);
        var first = this.filterIndex.length ? this.currentStart + 1 : 0;
        var last = (this.currentStart + this.options.pageSize) > this.filterIndex.length ?
            this.filterIndex.length : this.currentStart + this.options.pageSize;
        for (var i = 0; i < this.counterDivs.length; ++i) {
            this.counterDivs[i].innerHTML = this.options.counterText.call(this.table, cp, lp,
                                                                          first, last,
                                                                          this.filterIndex.length,
                                                                          this.data.length);
        }
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
        if (this.options.sort instanceof Function) {
            return this.options.sort;
        }
        if (this.data.length === 0 || !(this.options.sortKey in this.data[0])) {
            return false;
        }
        var key = this.options.sortKey;
        var asc = this.options.sortDir === 'asc';
        if (this.options.sort[key] instanceof Function) {
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
        this.removeNode(this.table.querySelector('.datatable-filter-line'));
    },

    /**
     *
     * Change the text input filter placeholder according to this.options.filterText.
     *
     **/
    changePlaceHolder: function () {
        var placeholder = this.options.filterText ? this.options.filterText : '';
        var inputTexts = this.table.querySelectorAll('.datatable-filter-line input[type="text"]');
        for (var i = 0; i < inputTexts.length; ++i) {
            inputTexts[i].placeholder = placeholder;
        }
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
        var input = opt instanceof HTMLInputElement ? opt : document.createElement('input');
        input.type = 'text';
        if (this.options.filterText) {
            input.placeholder = this.options.filterText;
        }
        this.addClass(input, 'datatable-filter datatable-input-text');
        input.dataset.filter = field;
        this.filterVals[field] = '';
        var typewatch = (function () {
            var timer = 0;
            return function (callback, ms) {
                clearTimeout(timer);
                timer = setTimeout(callback, ms);
            };
        })();
        input.onkeyup = function (datatable) {
            return function () {
                var val = this.value.toUpperCase();
                var field = this.dataset.filter;
                typewatch(function () {
                    datatable.filterVals[field] = val;
                    datatable.filter();
                }, 300);
            };
        } (this);
        input.onkeydown = input.onkeyup;
        var regexp = opt === 'regexp' || input.dataset.regexp;
        if (opt instanceof Function) {
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
        this.addClass(input, this.options.filterInputClass);
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
        var values = {}, selected = [], multiple = false,
            empty = true, emptyValue = this.options.filterEmptySelect;
        var tag = false;
        if (opt instanceof HTMLSelectElement) {
            tag = opt;
        }
        else if (opt instanceof Object && 'element' in opt && opt.element) {
            tag = opt.element;
        }
        if (opt instanceof HTMLSelectElement || opt === 'select') {
            values = this.getFilterOptions(field);
        }
        else {
            multiple = ('multiple' in opt) && (opt.multiple === true);
            empty = ('empty' in opt) && opt.empty;
            emptyValue = (('empty' in opt) && (typeof opt.empty === 'string')) ?
                opt.empty : this.options.filterEmptySelect;
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
                        if (values[k] instanceof Object) {
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
                if (!(selected instanceof Array)) {
                    selected = [selected];
                }
            }
            else {
                values = opt;
                selected = multiple ? this._keys(values) : [];
            }
        }
        var select = tag ? tag : document.createElement('select');
        if (multiple) {
            select.multiple = true;
        }
        if (opt['default']) {
            select.dataset['default'] = opt['default'];
        }
        this.addClass(select, 'datatable-filter datatable-select');
        select.dataset.filter = field;
        if (empty) {
            var option = document.createElement('option');
            option.dataset.empty = true;
            option.value = "";
            option.innerHTML = emptyValue;
            select.appendChild(option);
        }
        var allKeys = [];
        for (var key in values) {
            if (values[key] instanceof Object) {
                var optgroup = document.createElement('optgroup');
                optgroup.label = key;
                for (var skey in values[key]) {
                    if (values[key].hasOwnProperty(skey)) {
                        allKeys.push(skey);
                        var option = document.createElement('option');
                        option.value = skey;
                        option.selected = this._isIn(skey, selected);
                        option.innerHTML = values[key][skey];
                        optgroup.appendChild(option);
                    }
                }
                select.appendChild(optgroup);
            }
            else {
                allKeys.push(key);
                var option = document.createElement('option');
                option.value = key;
                option.selected = this._isIn(key, selected);
                option.innerHTML = values[key];
                select.appendChild(option);
            }
        }
        var val = select.value;
        if (multiple) {
            val = [];
            for (var i = 0; i < select.options.length; ++i) {
                if (select.options[i].selected) { val.push(select.options[i].value); }
            }
        }
        this.filterVals[field] = multiple ? val : ((empty && !val) ? allKeys : [val]);
        select.onchange = function (allKeys, multiple, empty, datatable) {
            return function () {
                var val = this.value;
                if (multiple) {
                    val = [];
                    for (var i = 0; i < this.options.length; ++i) {
                        if (this.options[i].selected) { val.push(this.options[i].value); }
                    }
                }
                var field = this.dataset.filter;
                datatable.filterVals[field] = multiple ? val : ((empty && !val) ? allKeys : [val]);
                datatable.filter();
            };
        } (allKeys, multiple, empty, this);
        if (opt instanceof Object && opt.fn instanceof Function) {
            this.addFilter(field, opt.fn);
            select.dataset.filterType = 'function';
        }
        else {
            this.addFilter(field, function (aKeys, datatable) {
                return function (data, val) {
                    if (!val) { return false; }
                    if (val == aKeys && !data) { return true; }
                    return datatable._isIn(data, val);
                };
            } (allKeys, this));
            select.dataset.filterType = 'default';
        }
        this.addClass(select, this.options.filterSelectClass);
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
        // Speical options if '*'
        if (this.options.filters === '*') {
            var nThs = this.table.tHead.rows[0].cells.length;
            this.options.filters = [];
            while (nThs--) {
                this.options.filters.push(true);
            }
        }
        if (this.options.filters) {
            var filterLine = false;
            var tr = document.createElement('tr');
            tr.classList.add('datatable-filter-line');
            for (var field in this.options.filters) {
                if (this.options.filters.hasOwnProperty(field)) {
                    var td = document.createElement('td');
                    if (this.options.filters[field] !== false) {
                        var opt = this.options.filters[field];
                        var input = opt === true || opt === 'regexp' || opt === 'input' || opt instanceof Function || opt instanceof HTMLInputElement;
                        var filter = input ? this.createTextFilter(field) : this.createSelectFilter(field);
                        this.filterTags[field] = filter;
                        if (!document.body.contains(filter)) {
                            td.classList.add('datatable-filter-cell');
                            td.appendChild(filter);
                        }
                    }
                    if (!(this.options.filters[field] instanceof Object) || !this.options.filters[field].noColumn) {
                        tr.appendChild(td);
                    }
                }
            }
            if (tr.querySelectorAll('td.datatable-filter-cell').length > 0) {
                this.table.tHead.appendChild(tr);
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
                if (this.filterTags[k]
                    && this.filterTags[k] instanceof HTMLSelectElement
                    && this.filterTags[k].dataset.filterType == 'default') {
                    var options = this.filterTags[k].childNodes;
                    for (var i = 0; i < options.length; ++i) {
                        if (!options[i].dataset.empty) {
                            options[i].style.display = dtable._isIn(options[i].value, keys)
                                ? 'block' : 'none';
                        }
                    }
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
        this.filterTags.forEach(function (e) {
            var field = e.dataset.filter;
            if (e instanceof HTMLInputElement) {
                e.value = '';
                dtable.filterVals[field] = '';
            }
            else {
                if (e.multiple) {
                    var allKeys = [];
                    for (var i = 0; i < e.childNodes.length; ++i) {
                        e.childNodes[i].selected = true;
                        allKeys.push(e.childNodes[i].value);
                    }
                    dtable.filterVals[field] = allKeys;
                }
                else if (e.dataset['default']
                         && e.querySelector('option[value="' + e.dataset['default'] + '"]').length > 0) {
                    for (var i = 0; i < e.childNodes.length; ++i) {
                        e.childNodes[i].selected = e.childNodes[i].value == e.dataset['default'];
                    }
                    dtable.filterVals[field] = [e.dataset['default']];
                }
                else if (e.childNodes.length > 0) {
                    e.childNodes[0].selected = true;
                    for (var i = 1; i < e.childNodes.length; ++i) {
                        e.childNodes[i].selected = false;
                    }
                    if (e.childNodes[0].dataset.empty) {
                        var allKeys = [];
                        for (var i = 1; i < e.childNodes.length; ++i) {
                            allKeys.push(e.childNodes[i].value);
                        }
                        dtable.filterVals[field] = allKeys;
                    }
                    else {
                        dtable.filterVals[field] = [e.childNodes[0].value];
                    }
                }
            }
        });
        this.filter();
    },

    /**
     * Strip HTML tags for the specified string.
     *
     * @param str The string from which tags must be stripped.
     *
     * @return The string with HTML tags removed.
     *
     **/
    stripTags: function (str) {
        var e = document.createElement('div');
        e.innerHTML = str;
        return e.textContent || e.innerText;
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
            if (typeof currentData === "string") {
                currentData = this.stripTags(currentData);
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
                var txt = this.stripTags(values[i]);
                options[txt] = txt;
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
        if (!(this.options.sort instanceof Function)) {

            var countTH = 0;
            var ths = this.table.tHead.rows[0].cells;
            for (var i = 0; i < ths.length; ++i) {

                if (ths[i].dataset.sort) {
                    dataTable.options.sort = true;
                }
                else if (dataTable.options.sort === '*') {
                    ths[i].dataset.sort = countTH;
                }
                else {
                    var key;
                    if (dataTable.options.sort instanceof Array) {
                        key = countTH;
                    }
                    else if (dataTable.options.sort instanceof Object) {
                        key = dataTable._keys(dataTable.options.sort)[countTH];
                    }
                    if (key !== undefined && dataTable.options.sort[key]) {
                        ths[i].dataset.sort = key;
                    }
                }

                if (ths[i].dataset.sort !== undefined) {
                    ths[i].classList.add('sorting');
                }

                countTH++;

                ths[i].addEventListener('click', function () {
                    if (this.dataset.sort) {
                        if (this.classList.contains('sorting-asc')) {
                            dataTable.options.sortDir = 'desc';
                            this.classList.remove('sorting-asc')
                            this.classList.add('sorting-desc');
                        }
                        else if (this.classList.contains('sorting-desc')) {
                            dataTable.options.sortDir = 'asc';
                            this.classList.remove('sorting-desc');
                            this.classList.add('sorting-asc');
                        }
                        else {
                            var oths = this.parentNode.cells;
                            for (var j = 0; j < oths.length; j++) {
                                oths[j].classList.remove('sorting-desc');
                                oths[j].classList.remove('sorting-asc');
                            }
                            dataTable.options.sortDir = 'asc';
                            dataTable.options.sortKey = this.dataset.sort;
                            this.classList.add('sorting-asc');
                        }
                        dataTable.sort();
                        dataTable.refresh();
                    }
                }, false);

            }

        }
    },

    /**
     *
     * Trigger sort event on the table: If options.sort is a function,
     * sort the table, otherwize trigger click on the column specifid by options.sortKey.
     *
     **/
    triggerSort: function () {
        if (this.options.sort instanceof Function) {
            this.sort();
            this.refresh();
        }
        else if (this.options.sortKey !== false) {
            var ths = this.table.tHead.rows[0].cells;
            var th;
            for (var j = 0; j < ths.length; j++) {
                ths[j].classList.remove('sorting-desc');
                ths[j].classList.remove('sorting-asc');
                if (ths[j].dataset.sort === this.options.sortKey) {
                    th = ths[j];
                }
            }
            if (th !== undefined) {
                th.classList.add('sorting-' + this.options.sortDir);
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
        if (fnSort !== false) {
            this.data.sort(fnSort);
        }
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
        if (this.options.identify instanceof Function) {
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
        if (typeof this.syncData !== "undefined") {
            this.syncData.toAdd.push(data);
        }
        this.sort();
        this.filter();
        this.currentStart = parseInt(this._index(this._index(data, this.data),
                                                 this.filterIndex)
                                     / this.options.pageSize, 10) * this.options.pageSize;
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
        if (typeof this.syncData !== "undefined") {
            this.syncData.toAdd = this.syncData.toAdd.concat(data);
        }
        this.sort();
        this.filter();
        this.currentStart = parseInt(this._index(this._index(data, this.data),
                                                 this.filterIndex)
                                     / this.options.pageSize, 10) * this.options.pageSize;
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
        if (typeof this.syncData !== "undefined") {
            this.syncData.toDelete.push(id);
        }
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
        if (typeof this.syncData !== "undefined") {
            this.syncData.toDelete.push(filter);
        }
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
        if (typeof this.syncData !== "undefined") {
            this.syncData.toUpdate[id] = data;
        }
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
            this.currentStart = parseInt(this._index(this.indexOf(id),
                                                     this.filterIndex)
                                         / this.options.pageSize, 10) * this.options.pageSize;
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
        this.table.tBodies[0].innerHTML = "";
        if (this.currentStart >= this.currentDataLength) {
            this.table.tBodies[0].innerHTML = '<tr><td colspan="' + this.options.nbColumns + '">'
                + '<div class="progress progress-striped active">'
                + '<div class="bar" style="width: 100%;"></div>'
                + '</div></div></tr>';
            return;
        }
        for (var i = 0;
             i < this.options.pageSize && i + this.currentStart < this.filterIndex.length;
             i++) {
            var index = this.filterIndex[this.currentStart + i];
            var data  = this.data[index];
            this.table.tBodies[0].appendChild(this.options.lineFormat.call(this.table,
                                                                           index, data));
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
        for (var i = 0; i < this.pagingDivs.length; ++i) {
            this.pagingDivs[i].classList.remove('pagination-datatable');
            this.pagingDivs[i].classList.remove(this.options.pagingDivClass);
            this.pagingDivs[i].innerHTML = '';
        }
        this.destroyFilter();
        this.table.classList.remove(this.options.tableClass);
        this.removeNode(this.table.tBodies[0]);
        this.table.appendChild(document.createElement('tbody'));
        for (var i = 0; i < this.data.length; i++) {
            var index = this.filterIndex[this.currentStart + i];
            var data  = this.data[index];
            this.table.tBodies[0].appendChild(this.options.lineFormat.call(this.table,
                                                                           index, data));
        }

    }
};

DataTable.defaultOptions = {
    forceStrings: false,
    tableClass: 'datatable',
    pagingDivSelector: '.paging',
    pagingDivClass: 'text-center',
    pagingListClass: 'pagination',
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
    counterText: function (currentPage, totalPage,
                           firstRow, lastRow,
                           totalRow, totalRowUnfiltered) {
        var counterText = 'Page ' + currentPage + ' on ' + totalPage
            + '. Showing ' + firstRow + ' to ' + lastRow + ' of ' + totalRow + ' entries';
        if (totalRow != totalRowUnfiltered) {
            counterText += ' (filtered from ' + totalRowUnfiltered + ' total entries)';
        }
        counterText += '.';
        return counterText;
    },
    firstPage: '&lt;&lt;',
    prevPage: '&lt;',
    pagingPages: false,
    nextPage: '&gt;',
    lastPage: '&gt;&gt;',
    dataTypes: true,
    filters: {},
    filterText: 'Search... ',
    filterEmptySelect: '',
    filterSelectOptions: false,
    filterInputClass: 'form-control',
    filterSelectClass: 'form-control',
    beforeRefresh: function () { },
    afterRefresh: function () { },
    lineFormat: function (id, data) {
        var res = document.createElement('tr');
        res.dataset.id = id;
        for (var key in data) {
            if (data.hasOwnProperty(key)) {
                res.innerHTML += '<td>' + data[key] + '</td>';
            }
        }
        return res;
    }
};

DataTable.defaultAjaxOptions = {
    url: null,
    size: null,
    refresh: false,
    allInOne: false,
    timeout: 2000
};
