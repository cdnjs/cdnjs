/*!
   Copyright 2017 SpryMedia Ltd.

 License      MIT - http://datatables.net/license/mit

 This feature plug-in for DataTables provides a function which will
 take DataTables options from the browser's URL search string and
 return an object that can be used to construct a DataTable. This
 allows deep linking to be easily implemented with DataTables - for
 example a URL might be `myTable?displayStart=10` which will
 automatically cause the second page of the DataTable to be displayed.

 This plug-in works on a whitelist basis - you must specify which
 [initialisation parameters](//datatables.net/reference/option) you
 want the URL search string to specify. Any parameter given in the
 URL which is not listed will be ignored (e.g. you are unlikely to
 want to let the URL search string specify the `ajax` option).

 This specification is done by passing an array of property names
 to the `$.fn.dataTable.ext.deepLink` function. If you do which to
 allow _every_ parameter (I wouldn't recommend it) you can use `all`
 instead of an array.

 @example
   // Allow a display start point and search string to be specified
   $('#myTable').DataTable(
     $.fn.dataTable.ext.deepLink( [ 'displayStart', 'search.search' ] )
   );

 @example
   // As above, but with a default search
   var options = $.fn.dataTable.ext.deepLink(['displayStart', 'search.search']);

   $('#myTable').DataTable(
     $.extend( true, {
       search: { search: 'Initial search value' }
     }, options )
   );
 Deep linking options parsing support for DataTables
 2017 SpryMedia Ltd - datatables.net/license
*/
(function(l,m,b,n){var h=b.fn.dataTable.ext.internal._fnSetObjectDataFn;b.fn.dataTable.ext.deepLink=function(e){for(var f=location.search.replace(/^\?/,"").split("&"),g={},c=0,k=f.length;c<k;c++){var a=f[c].split("="),d=decodeURIComponent(a[0]);a=decodeURIComponent(a[1]);if("true"===a)a=!0;else if("false"===a)a=!1;else if(!a.match(/[^\d]/)&&"search.search"!==d)a*=1;else if(0===a.indexOf("{")||0===a.indexOf("["))try{a=b.parseJSON(a)}catch(p){}"all"!==e&&-1===b.inArray(d,e)||h(d)(g,a)}return g}})(window,
document,jQuery);
