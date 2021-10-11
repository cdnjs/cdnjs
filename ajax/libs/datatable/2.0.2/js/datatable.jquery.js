(function ($) {

    "use strict";
    
    function _toJqueryFn (fn, singleReturn) {
        if (typeof singleReturn === 'undefined') {
            singleReturn = false ;
        }
        return function (_f, _s) {
            return function () {
                var res = fn.apply(this, arguments) ;
                return _s ? res.get(0) : res.toArray();
            } ;
        } (fn, singleReturn) ;
    }

    $.fn.datatable = function () {
        var args = arguments;
        var ret = -1, each;
        if (args.length === 0) { args = [{}]; }
        each = this.each(function () {
            if ($.isPlainObject(args[0])) {
                if (this.datatable === undefined) {
                    if (args[0].hasOwnProperty('lineFormat')) {
                        args[0].lineFormat = _toJqueryFn (args[0].lineFormat, true);
                    }
                    if (args[0].hasOwnProperty('pagingPages')) {
                        args[0].pagingPages = _toJqueryFn (args[0].pagingPages);
                    }
                    if (args[0].hasOwnProperty('filters')) {
                        for (var i = 0 ; i < args[0].filters.length ; ++i) {
                            var filter = args[0].filters[i] ;
                            if (filter instanceof $) {
                                filter = filter.get(0) ;
                            }
                            else if ((filter instanceof Object) && (filter.element instanceof $)) {
                                filter.element = filter.element.get(0);
                            }
                            args[0].filters[i] = filter;
                        }
                    }
                    this.datatable = new DataTable(this, args[0]);
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

} (window.jQuery));