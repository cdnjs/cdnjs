/*!
   Copyright 2014 SpryMedia Ltd.

 License      MIT - http://datatables.net/license/mit

 This feature plug-in for DataTables adds page length control links to the
 DataTable. The `dom` option can be used to insert the control using the `L`
 character option and it uses the `lengthMenu` options of DataTables to
 determine what to display.

 @example
   $('#myTable').DataTable( {
     dom: 'Lfrtip'
   } );

 @example
   $('#myTable').DataTable( {
     lengthMenu: [ [10, 25, 50, -1], [10, 25, 50, "All"] ]
     dom: 'Lfrtip'
   } );
 Page length control via links for DataTables
 2014 SpryMedia Ltd - datatables.net/license
*/
(function(n,p,b,q){b.fn.dataTable.LengthLinks=function(f){var c=new b.fn.dataTable.Api(f),g=c.settings()[0],d=b("<div></div>").addClass(g.oClasses.sLength),k=null;this.container=function(){return d[0]};d.on("click.dtll","a",function(a){a.preventDefault();c.page.len(1*b(this).data("length")).draw(!1)});c.on("draw",function(){if(c.page.len()!==k){var a=g.aLengthMenu,l=2===a.length&&Array.isArray(a[0])?a[1]:a,h=2===a.length&&Array.isArray(a[0])?a[0]:a;a=b.map(h,function(m,e){return m==c.page.len()?'<a class="active" data-length="'+
h[e]+'">'+l[e]+"</a>":'<a data-length="'+h[e]+'">'+l[e]+"</a>"});d.html(g.oLanguage.sLengthMenu.replace("_MENU_",a.join(" | ")));k=c.page.len()}});c.on("destroy",function(){d.off("click.dtll","a")})};b.fn.dataTable.ext.feature.push({fnInit:function(f){return(new b.fn.dataTable.LengthLinks(f)).container()},cFeature:"L",sFeature:"LengthLinks"})})(window,document,jQuery);
