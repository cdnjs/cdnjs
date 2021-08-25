/*!
 Bootstrap 5 integration for DataTables' SearchPanes
 ©2016 SpryMedia Ltd - datatables.net/license
*/
(function(c){"function"===typeof define&&define.amd?define(["jquery","datatables.net-bs5","datatables.net-searchpanes"],function(a){return c(a,window,document)}):"object"===typeof exports?module.exports=function(a,b){a||(a=window);b&&b.fn.dataTable||(b=require("datatables.net-bs5")(a,b).$);b.fn.dataTable.SearchPanes||require("datatables.net-searchpanes")(a,b);return c(b,a,a.document)}:c(jQuery,window,document)})(function(c,a,b){a=c.fn.dataTable;c.extend(!0,a.SearchPane.classes,{buttonGroup:"btn-group",
disabledButton:"disabled",narrow:"col",pane:{container:"table"},paneButton:"btn btn-light",pill:"badge rounded-pill bg-secondary",search:"form-control search",table:"table table-sm table-borderless",topRow:"dtsp-topRow"});c.extend(!0,a.SearchPanes.classes,{clearAll:"dtsp-clearAll btn btn-light",collapseAll:"dtsp-collapseAll btn btn-light",container:"dtsp-searchPanes",disabledButton:"disabled",panes:"dtsp-panes dtsp-panesContainer",showAll:"dtsp-showAll btn btn-light",title:"dtsp-title",titleRow:"dtsp-titleRow"});
return a.searchPanes});
