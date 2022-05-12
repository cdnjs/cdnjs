/*!
 DataTables jQuery UI integration
 ©2011-2014 SpryMedia Ltd - datatables.net/license
*/
(function(b){"function"===typeof define&&define.amd?define(["jquery","datatables.net"],function(a){return b(a,window,document)}):"object"===typeof exports?module.exports=function(a,c){a||(a=window);c&&c.fn.dataTable||(c=require("datatables.net")(a,c).$);return b(c,a,a.document)}:b(jQuery,window,document)})(function(b,a,c,d){a=b.fn.dataTable;b.extend(!0,a.defaults,{dom:'<"fg-toolbar ui-toolbar ui-widget-header ui-helper-clearfix ui-corner-tl ui-corner-tr"lfr>t<"fg-toolbar ui-toolbar ui-widget-header ui-helper-clearfix ui-corner-bl ui-corner-br"ip>'});
b.extend(a.ext.classes,{sWrapper:"dataTables_wrapper dt-jqueryui",sPageButton:"fg-button ui-button ui-state-default",sPageButtonActive:"ui-state-disabled",sPageButtonDisabled:"ui-state-disabled",sPaging:"dataTables_paginate fg-buttonset ui-buttonset fg-buttonset-multi ui-buttonset-multi paging_",sScrollHead:"dataTables_scrollHead ui-state-default",sScrollFoot:"dataTables_scrollFoot ui-state-default",sHeaderTH:"ui-state-default",sFooterTH:"ui-state-default"});return a});
