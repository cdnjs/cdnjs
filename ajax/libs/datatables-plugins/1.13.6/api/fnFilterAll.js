/**
 * Apply the same filter to all DataTable instances on a particular page. The
 * function call exactly matches that used by `fnFilter()` so regular expression
 * and individual column sorting can be used.
 *
 * DataTables 1.10+ provides this ability through its new API, which is able to
 * to control multiple tables at a time.
 * `$('.dataTable').DataTable().search( ... )` for example will apply the same
 * filter to all tables on the page. The new API should be used in preference
 * to this older method if at all possible.
 *
 *  @name fnFilterAll
 *  @summary Apply a common filter to all DataTables on a page
 *  @author [Kristoffer Karlström](http://www.kmmtiming.se/)
 *  @deprecated
 *
 *  @param {string} sInput Filtering input
 *  @param {integer} [iColumn=null] Column to apply the filter to
 *  @param {boolean} [bRegex] Regular expression flag
 *  @param {boolean} [bSmart] Smart filtering flag
 *
 *  @example
 *    $(document).ready(function() {
 *      var table = $(".dataTable").dataTable();
 *       
 *      $("#search").keyup( function () {
 *        // Filter on the column (the index) of this element
 *        table.fnFilterAll(this.value);
 *      } );
 *    });
 */

jQuery.fn.dataTableExt.oApi.fnFilterAll = function(oSettings, sInput, iColumn, bRegex, bSmart) {
    var settings = $.fn.dataTableSettings;

    for ( var i=0 ; i<settings.length ; i++ ) {
      settings[i].oInstance.fnFilter( sInput, iColumn, bRegex, bSmart);
    }
};
