/*
YUI 3.15.0 (build 834026e)
Copyright 2014 Yahoo! Inc. All rights reserved.
Licensed under the BSD License.
http://yuilibrary.com/license/
*/

YUI.add("datatable-paginator-templates",function(e,t){var n=new e.Template,r='<tr><td class="<%= this.wrapperClass %>" colspan="<%= this.numOfCols %>"/></tr>',i="<%= buttons %><%= this.classNames.gotoPage %><%= this.classNames.perPage %>",s='<button class="<%= this.classNames.control %> <%= this.classNames.control %>-<%= this.type %>" data-type="<%= this.type %>"><%= this.label %></button>',o='<div class="<%= this.classNames.controls %> <%= this.classNames.group %>"><%== this.buttons %></div>',u='<form action="#" class="<%= this.classNames.group %>"><label><%= this.strings.goToLabel %><input type="text" value="<%= this.page %>"><button><%= this.strings.goToAction %></button></label></form>',a='<div class="<%= this.classNames.group %> <%= this.classNames.perPage %>"><label><%= this.strings.perPage %> <select><% Y.Array.each(this.options, function (option, i) { %><option value="<%= option.value %>" <%= option.selected %>><%= option.label %></option><% }); %></select></label></div>';e.namespace("DataTable.Templates").Paginator={rowWrapper:n.compile(r),button:n.compile(s),content:n.compile(i),buttons:n.compile(o),gotoPage:n.compile(u),perPage:n.compile(a)}},"3.15.0",{requires:["template"]});
