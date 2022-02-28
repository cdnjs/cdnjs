/*!
   Copyright 2019 SpryMedia Ltd.

 This source file is free software, available under the following license:
   MIT license - http://datatables.net/license/mit

 This source file is distributed in the hope that it will be useful, but
 WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY
 or FITNESS FOR A PARTICULAR PURPOSE. See the license files for details.

 For details please refer to: http://www.datatables.net
 scrollToTop 0.0.1
 2019 SpryMedia Ltd - datatables.net/license
*/
(function(b){"function"===typeof define&&define.amd?define(["jquery","datatables.net"],function(a){return b(a,window,document)}):"object"===typeof exports?module.exports=function(a,c){a||(a=window);c&&c.fn.dataTable||(c=require("datatables.net")(a,c).$);return b(c,a,a.document)}:b(jQuery,window,document)})(function(b,a,c,f){b(c).on("preInit.dt",function(a,d){if("dt"===a.namespace&&(d.oInit.scrollToTop||b.fn.dataTable.defaults.scrollToTop)){var e=new b.fn.dataTable.Api(d);e.on("page",function(){setTimeout(function(){b(c).scrollTop(b(e.table().container()).offset().top)},
10)})}})});
