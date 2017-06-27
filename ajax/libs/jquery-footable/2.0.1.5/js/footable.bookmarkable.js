(function ($, w, undefined) {
    if (w.footable === undefined || w.foobox === null)
        throw new Error('Please check and make sure footable.js is included in the page and is loaded prior to this script.');

    var defaults = {
        bookmarkable: {
            enabled: false
        }
    };

    // see http://www.onlineaspect.com/2009/06/10/reading-get-variables-with-javascript/
    function $_HASH(q,s) {
        s = s ? s : location.hash;
        var re = new RegExp('&'+q+'(?:=([^&]*))?(?=&|$)','i');
        return (s=s.replace(/^\#/,'&').match(re)) ? (typeof s[1] == 'undefined' ? '' : decodeURIComponent(s[1])) : undefined;
    }

    function addFootableStatusData(ft, event) {
        var tbl_total = $(ft.table).find("tbody").find("tr:not(.footable-row-detail, .footable-filtered)").length;
        $(ft.table).data("status_num_total", tbl_total);

        var tbl_num = $(ft.table).find("tbody").find("tr:not(.footable-row-detail)").filter(":visible").length;
        $(ft.table).data("status_num_shown", tbl_num);

        var sort_colnum = $(ft.table).data("sorted");
        var sort_col = $(ft.table).find("th")[sort_colnum];
        var descending = $(sort_col).hasClass("footable-sorted-desc");
        $(ft.table).data("status_descending", descending);
            
        if (ft.pageInfo) {
            var pagenum = ft.pageInfo.currentPage; 
            $(ft.table).data("status_pagenum", pagenum);
        }

        var filter_val = '';
        var filter_field_id = $(ft.table).data('filter');
        if ( $(filter_field_id).length ) {
            filter_val = $(filter_field_id).val();
        }

        $(ft.table).data("status_filter_val", filter_val);

        // manage expanded or collapsed rows:
	var row, rowlist, expanded_rows;
        if (event.type == 'footable_row_expanded') {
            row = event.row;
            if (row) {
                rowlist = $(ft.table).data('expanded_rows');
                expanded_rows = [];
                if (rowlist) {
                    expanded_rows = rowlist.split(',');
                }
                expanded_rows.push(row.rowIndex);
                $(ft.table).data('expanded_rows', expanded_rows.join(','));
            }
        }
        if (event.type == 'footable_row_collapsed') {
            row = event.row;
            if (row) {
                rowlist = $(ft.table).data('expanded_rows');
                expanded_rows = [];
                if (rowlist) {
                    expanded_rows = rowlist.split(',');
                }
                new_expanded_rows = [];
                for (var i in expanded_rows) {
                    if (expanded_rows[i] == row.rowIndex) {
                        new_expanded_rows = expanded_rows.splice(i, 1);
                        break;
                    }
                }
                $(ft.table).data('expanded_rows', new_expanded_rows.join(','));
            }
        }
    }

 function Bookmarkable() {
     var p = this;
     p.name = 'Footable LucidBookmarkable';
     p.init = function(ft) {
         if (ft.options.bookmarkable.enabled) {
             
             $(ft.table).bind({
                 'footable_initialized': function(){
                     var tbl_id     = ft.table.id;
                     var q_filter   = $_HASH(tbl_id + '_f');
                     var q_page_num = $_HASH(tbl_id + '_p');
                     var q_sorted   = $_HASH(tbl_id + '_s');
                     var q_desc     = $_HASH(tbl_id + '_d');
                     var q_expanded = $_HASH(tbl_id + '_e');

                     if (q_filter) {
                         var filter_field_id = $(ft.table).data('filter');
                         $(filter_field_id).val(q_filter); 
                         $(ft.table).trigger('footable_filter', {filter: q_filter});
                     }
                     if (q_page_num) {
                         $(ft.table).data('currentPage',  q_page_num);
			 // we'll check for sort before triggering pagination, since
			 // sorting triggers pagination. 
                     }
                     if (typeof q_sorted !== 'undefined') {
                         var footableSort = $(ft.table).data('footable-sort');
                         var ascending = true;
                         if (q_desc == 'true') {
                             ascending = false;
                         }
                         footableSort.doSort(q_sorted, ascending);
                     }
                     else {
                         $(ft.table).trigger('footable_setup_paging');
                     }
                     if (q_expanded) {
                         var expanded_rows = q_expanded.split(',');
                         for (var i in expanded_rows) {
                             row = $(ft.table.rows[expanded_rows[i]]);
                             row.find('> td:first').trigger('footable_toggle_row');
                         }
                     }
                     ft.lucid_bookmark_read = true;
                 },
                 'footable_page_filled footable_redrawn footable_filtered footable_sorted footable_row_expanded footable_row_collapsed': function(e) {
                     addFootableStatusData(ft, e);

                     // update the URL hash
                     // lucid_bookmark_read guards against running this logic before
                     // the "first read" of the location bookmark hash.
                     if (ft.lucid_bookmark_read) {
                         var tbl_id     = ft.table.id;
                         var filter     = tbl_id + '_f';
                         var page_num   = tbl_id + '_p';
                         var sorted     = tbl_id + '_s';
                         var descending = tbl_id + '_d';
                         var expanded   = tbl_id + '_e';
                         
                         var hash = location.hash.replace(/^\#/, '&');
                         var hashkeys = [filter, page_num, sorted, descending, expanded];
                         // trim existing elements out of the hash.
                         for (var i in hashkeys) {
                             var re = new RegExp('&' + hashkeys[i]+'=([^&]*)', 'g');
                             hash = hash.replace(re, '');
                         }

                         var foostate = {};
                         foostate[filter]     = $(ft.table).data('status_filter_val');
                         foostate[page_num]   = $(ft.table).data('status_pagenum');
                         foostate[sorted]     = $(ft.table).data('sorted');
                         foostate[descending] = $(ft.table).data('status_descending');
                         foostate[expanded]   = $(ft.table).data('expanded_rows');

                         var pairs = [];
                         for (var elt in foostate) {
                             if (foostate[elt] !== undefined) {
                                 pairs.push(elt + '=' + encodeURIComponent(foostate[elt]));
                             }
                         }
                         if (hash.length) {
                             pairs.push(hash);
                         }
                         location.hash = pairs.join('&');
                     }
                 }
             });
         }
     };
 }
 
 w.footable.plugins.register(Bookmarkable, defaults);
  
})(jQuery, window);