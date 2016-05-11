/**
 * Footable Memory 
 *
 * Version 1.1.0
 *
 * Requires browser support for localStorage. Fallback to cookies using
 * jQuery Cookie (https://github.com/carhartl/jquery-cookie)
 *
 * Stores table state in a cookie and reloads state when page is refreshed.
 *
 * Supports common FooTable features:
 * - Pagination
 * - Sorting
 * - Filtering
 * - Expansion
 *
 * Written to be compatible with multiple FooTables per page and with
 * JavaScript libraries like AngularJS and Ember that use hash based URLs.
 *
 * Disabled by default, to enable add the following section to the footable
 * options:
 *
 *   $('#table').footable({
 *     memory: {
 *       enabled: true
 *     }
 *   });
 *
 * Based on FooTable Plugin Bookmarkable by Amy Farrell (https://github.com/akf)
 *
 * Created by Chris Laskey (https://github.com/chrislaskey)
 */

(function ($, w, undefined) {

    if (w.footable === undefined || w.foobox === null) {
        throw new Error('Please check and make sure footable.js is included in the page and is loaded prior to this script.');
    }

    var defaults = {
        memory: {
            enabled: false
        }
    };

    var storage;

    var storage_engines = {};

    storage_engines.local_storage = (function($){

        'use strict';

        var path_page = function(){
            return location.pathname;
        };

        var path_subpage = function(){
            return location.hash || 'root';
        };

        var storage_key = function(index){
            return path_page() + '/' + path_subpage() + '/index-' + index;
        };

        var get = function(index){
            var key = storage_key(index),
                as_string = localStorage.getItem(key);

            return as_string ? JSON.parse(as_string) : {};
        };

        var set = function(index, item){
            var key = storage_key(index),
                as_string = JSON.stringify(item);

            localStorage.setItem(key, as_string);
        };

        return {
            get: function(index){
                return get(index);
            },
            set: function(index, item){
                set(index, item);
            }
        };

    })($);

    storage_engines.cookie = (function($){

        'use strict';

        /**
         * Stores footable bookmarkable data in a cookie
         *
         * By default will store each page in its own cookie.
         * Supports multiple FooTables per page.
         * Supports JS frameworks that use hashmap URLs (AngularJS, Ember, etc).
         *
         * For example take an example application:
         *
         *     http://example.com/application-data (2 FooTables on this page)
         *     http://example.com/application-data/#/details (1 FooTable on this page)
         *     http://example.com/other-data (1 FooTable on this page)
         *
         * Would be stored like this:
         *
         *     cookie['/application-data'] = {
         *         '/': {
         *             1: {
         *                 key1: value1,
         *                 key2: value2
         *             },
         *             2: {
         *                 key1: value1,
         *                 key2: value2
         *             }
         *         },
         *         '#/details': {
         *             1: {
         *                 key1: value1,
         *                 key2: value2
         *             }
         *         }
         *     };
         *
         *     cookie['/other-data'] = {
         *         '/': {
         *             1: {
         *                 key1: value1,
         *                 key2: value2
         *             },
         *         }
         *     }
         *
         */

        if( $.cookie ){
            $.cookie.json = true;
        }

        var days_to_keep_data = 7;

        var path_page = function(){
            return location.pathname;
        };

        var path_subpage = function(){
            return location.hash || '/';
        };

        var get_data = function(){
            var page = path_page(),
                data = $.cookie(page);

            return data || {};
        };

        var get_table = function(index){
            var subpage = path_subpage(),
                data = get_data();

            if( data[subpage] && data[subpage][index] ){
                return data[subpage][index];
            } else {
                return {};
            }
        };

        var set = function(index, item){
            var page = path_page(),
                subpage = path_subpage(),
                data = get_data(),
                options;

            if( !data[subpage] ){
                data[subpage] = {};
            }

            data[subpage][index] = item;

            options = {
                path: page,
                expires: days_to_keep_data
            };

            $.cookie(page, data, options);
        };

        return {
            get: function(index){
                return get_table(index);
            },
            set: function(index, item){
                set(index, item);
            }
        };

    })($);

    var set_storage_engine = (function(){
        var test = 'footable-memory-plugin-storage-test';

        try {
            localStorage.setItem(test, test);
            localStorage.removeItem(test);
            storage = storage_engines.local_storage;
        } catch(e) {
            try {
                $.cookie(test, test);
                storage = storage_engines.cookie;
            } catch(e) {
                throw new Error('FooTable Memory requires either localStorage or cookie support via jQuery $.cookie plugin (https://github.com/carhartl/jquery-cookie)');
            }
        }
    })($);

    var state = (function($){

        'use strict';

        /**
         * Gets and sets current table state
         */

        var vars = {};

        var get = {};

        var set = {};

        set.vars = function(ft){
            vars.ft = ft;
            vars.table = $(ft.table);
        };

        get.descending = function(){
            var descending = false;
            $.each(vars.table.find('th'), function(index){
                if( $(this).hasClass('footable-sorted-desc') ){
                    descending = true;
                }
            });
            return descending;
        };

        get.expanded = function(){
            var indexes = [];
            $.each(vars.ft.table.rows, function(index, value){
                if( $(this).hasClass('footable-detail-show') ){
                    indexes.push(index);
                }
            });
            return indexes;
        };

        set.expanded = function(data){
            if( data.expanded ){
                $.each(data.expanded, function(index, value){
                    // var row = $(vars.ft.table.rows[value]);
                    // row.find('> td:first').trigger('footable_toggle_row');

                    // Trying to execute the lines above, but the expanded row
                    // shows raw AngularJS template (with {{ values }}) instead
                    // of the fully rendered result.
                    //
                    // Best guess is some things happen after
                    // 'footable_initialized' event and row expanding can not
                    // occur until after those fire.
                    //
                    // A hack to get around this is to wait an interval before
                    // executing the intended commands. Wrapped in an
                    // immediately executing function to ensure ft is the
                    // current value.

                    (function(ft){
                        setTimeout(function(){
                            var row = $(ft.table.rows[value]);
                            row.find('> td:first').trigger('footable_toggle_row');
                        }, 150);
                    })(vars.ft);
                });
            }
        };

        get.filter = function(){
            return vars.table.data('filter') ? $(vars.table.data('filter')).val() : '';
        };

        set.filter = function(data){
            if( data.filter ){
                $(vars.table.data('filter'))
                    .val(data.filter)
                    .trigger('keyup');
            }
        };

        get.page = function(){
            return vars.ft.pageInfo && vars.ft.pageInfo.currentPage !== undefined ? vars.ft.pageInfo.currentPage : 0;
        };

        set.page = function(data){
            if( data.page ){
                vars.table.data('currentPage', data.page);
                // Delay triggering table until sort is updated, since both effect
                // pagination.
            }
        };

        get.shown = function(){
            return vars.table
                .find('tbody')
                .find('tr:not(.footable-row-detail)')
                .filter(':visible').length;
        };

        get.sorted = function(){
            if( vars.table.data('sorted') !== undefined ){
                return vars.table.data('sorted');
            } else {
                return -1;
            }
        };

        set.sorted = function(data){
            if( data.sorted >= 0 ) {
                // vars.table.data('footable-sort').doSort(data.sorted, !data.descending);
                
                // Trying to execute the line above, but only sort icon on the
                // <th> element gets set. The rows themselves do not get sorted.
                //
                // Best guess is some things happen after 'footable_initialized' event
                // and sorting can not occur until after those fire.
                //
                // A hack to get around this is to wait an interval before executing
                // the intended commands. Wrapped in an immediately executing
                // function to ensure ft is the current value.

                (function(ft){
                    setTimeout(function(){
                        $(ft.table).data('footable-sort').doSort(data.sorted, !data.descending);
                    }, 150);
                })(vars.ft);
            } else {
                vars.table.trigger('footable_setup_paging');
            }
        };

        get.total = function(){
            return vars.table
                .find('tbody')
                .find('tr:not(.footable-row-detail, .footable-filtered)').length;
        };

        var get_state = function(){
            return {
                descending: get.descending(),
                expanded: get.expanded(),
                filter: get.filter(),
                page: get.page(),
                shown: get.shown(),
                sorted: get.sorted(),
                total: get.total()
            };
        };

        var set_state = function(data){
            set.filter(data);
            set.page(data);
            set.sorted(data);
            set.expanded(data);
        };

        return {
            get: function(ft){
                set.vars(ft);
                return get_state();
            },
            set: function(ft, data){
                set.vars(ft);
                return set_state(data);
            }
        };

    })($);

    var is_enabled = function(ft){
        return ft.options.memory.enabled;
    };

    var update = function(ft, event) {
        var index = ft.id,
            data = state.get(ft);

        storage.set(index, data);
    };

    var load = function(ft){
        var index = ft.id,
            data = storage.get(index);

        state.set(ft, data);
        ft.memory_plugin_loaded = true;
    };

    function Memory() {
        var p = this;
        p.name = 'Footable Memory';
        p.init = function(ft) {
            if (is_enabled(ft)) {
                $(ft.table).bind({
                    'footable_initialized': function(){
                        load(ft);
                    },
                    'footable_page_filled footable_redrawn footable_filtered footable_sorted footable_row_expanded footable_row_collapsed': function(e) {
                        if (ft.memory_plugin_loaded) {
                            update(ft, e);
                        }
                    }
                });
            }
        };
    }

    w.footable.plugins.register(Memory, defaults);

})(jQuery, window);
