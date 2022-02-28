/*!
 Bootstrap 5 integration for DataTables' SearchPanes
 ©2016 SpryMedia Ltd - datatables.net/license
*/
(function(b){"function"===typeof define&&define.amd?define(["jquery","datatables.net-bs5","datatables.net-searchpanes"],function(a){return b(a)}):"object"===typeof exports?module.exports=function(a,c){a||(a=window);c&&c.fn.dataTable||(c=require("datatables.net-bs5")(a,c).$);c.fn.dataTable.SearchPanes||require("datatables.net-searchpanes")(a,c);return b(c)}:b(jQuery)})(function(b){var a=b.fn.dataTable;b.extend(!0,a.SearchPane.classes,{buttonGroup:"btn-group",disabledButton:"disabled",narrow:"col",
pane:{container:"table"},paneButton:"btn btn-light",pill:"badge rounded-pill bg-secondary",search:"form-control search",table:"table table-sm table-borderless",topRow:"dtsp-topRow"});b.extend(!0,a.SearchPanes.classes,{clearAll:"dtsp-clearAll btn btn-light",collapseAll:"dtsp-collapseAll btn btn-light",container:"dtsp-searchPanes",disabledButton:"disabled",panes:"dtsp-panes dtsp-panesContainer",showAll:"dtsp-showAll btn btn-light",title:"dtsp-title",titleRow:"dtsp-titleRow"});return a.searchPanes});
