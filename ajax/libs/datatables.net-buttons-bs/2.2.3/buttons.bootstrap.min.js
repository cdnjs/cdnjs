/*!
 Bootstrap integration for DataTables' Buttons
 ©2016 SpryMedia Ltd - datatables.net/license
*/
(function(c){"function"===typeof define&&define.amd?define(["jquery","datatables.net-bs","datatables.net-buttons"],function(a){return c(a,window,document)}):"object"===typeof exports?module.exports=function(a,b){a||(a=window);b&&b.fn.dataTable||(b=require("datatables.net-bs")(a,b).$);b.fn.dataTable.Buttons||require("datatables.net-buttons")(a,b);return c(b,a,a.document)}:c(jQuery,window,document)})(function(c,a,b,e){a=c.fn.dataTable;c.extend(!0,a.Buttons.defaults,{dom:{container:{className:"dt-buttons btn-group"},
button:{className:"btn btn-default"},collection:{tag:"ul",className:"dropdown-menu",closeButton:!1,button:{tag:"li",className:"dt-button",active:"active",disabled:"disabled"},buttonLiner:{tag:"a",className:""}},splitWrapper:{tag:"div",className:"dt-btn-split-wrapper btn-group",closeButton:!1},splitDropdown:{tag:"button",text:"&#x25BC;",className:"btn btn-default dt-btn-split-drop dropdown-toggle",closeButton:!1,align:"split-left",splitAlignClass:"dt-button-split-left"},splitDropdownButton:{tag:"button",
className:"dt-btn-split-drop-button btn btn-default",closeButton:!1}}});a.ext.buttons.collection.text=function(d){return d.i18n("buttons.collection",'Collection <span class="caret"/>')};return a.Buttons});
