/*!
   Copyright 2018 SpryMedia Ltd.

 This source file is free software, available under the following license:
   MIT license - http://datatables.net/license/mit

 This source file is distributed in the hope that it will be useful, but
 WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY
 or FITNESS FOR A PARTICULAR PURPOSE. See the license files for details.

 For details please refer to: http://www.datatables.net
 SearchFade 0.0.1
 2018 SpryMedia Ltd - datatables.net/license
*/
(function(a){"function"===typeof define&&define.amd?define(["jquery","datatables.net"],function(c){return a(c,window,document)}):"object"===typeof exports?module.exports=function(c,d){c||(c=window);d&&d.fn.dataTable||(d=require("datatables.net")(c,d).$);return a(d,c,c.document)}:a(jQuery,window,document)})(function(a,c,d,m){function k(e,b){b.empty();b.append("Search: ");a('<input type="text" class="searchFadeInput'+e.settings()[0].sTableId+'">').appendTo(b)}a.fn.dataTable.Api.register("searchFade()",
function(){return this});a.fn.dataTable.Api.register("searchFade().node()",function(){return this.settings()[0].searchFadeNode});a.fn.dataTable.SearchFade=function(e){var b=new a.fn.dataTable.Api(e),f=a('<div class="searchFade"/>');b.settings()[0].searchFadeNode=f;k(b,f);f.on("keyup redraw","input",function(){b.rows(":visible").every(function(h,g,n){g=!0;a(".searchFadeInput"+b.settings()[0].sTableId).val().length&&(g=b.row(h).data().some(function(l){return null!=l.match(new RegExp(a(".searchFadeInput"+
b.settings()[0].sTableId).val(),"i"))}));a(b.row(h).node()).toggleClass("notMatched",!g)})});b.on("draw",function(){a("input",f).trigger("redraw")});this.node=function(){return f}};a.fn.DataTable.SearchFade=a.fn.dataTable.SearchFade;a.fn.dataTable.ext.feature.push({fnInit:function(e){return(new a.fn.dataTable.SearchFade(e)).node()},cFeature:"F"});a(d).on("init.dt",function(e,b,f){"dt"===e.namespace&&a.fn.dataTable.SearchFade(b)})});
