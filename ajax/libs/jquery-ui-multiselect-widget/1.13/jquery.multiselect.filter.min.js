/*
 * jQuery MultiSelect UI Widget Filtering Plugin 1.4
 * Copyright (c) 2011 Eric Hynds
 *
 * http://www.erichynds.com/jquery/jquery-ui-multiselect-widget/
 *
 * Depends:
 *   - jQuery UI MultiSelect widget
 *
 * Dual licensed under the MIT and GPL licenses:
 *   http://www.opensource.org/licenses/mit-license.php
 *   http://www.gnu.org/licenses/gpl.html
 *
*/
(function(a){var f=/[\-\[\]{}()*+?.,\\\^$|#\s]/g;a.widget("ech.multiselectfilter",{options:{label:"Filter:",width:null,placeholder:"Enter keywords",autoReset:!1},_create:function(){var e;var b=this,c=this.options,d=this.instance=a(this.element).data("multiselect");this.header=d.menu.find(".ui-multiselect-header").addClass("ui-multiselect-hasfilter");e=this.wrapper=a('<div class="ui-multiselect-filter">'+(c.label.length?c.label:"")+'<input placeholder="'+c.placeholder+'" type="search"'+(/\d/.test(c.width)?  'style="width:'+c.width+'px"':"")+" /></div>").prependTo(this.header),c=e;this.inputs=d.menu.find('input[type="checkbox"], input[type="radio"]');this.input=c.find("input").bind({keydown:function(a){13===a.which&&a.preventDefault()},keyup:a.proxy(b._handler,b),click:a.proxy(b._handler,b)});this.updateCache();d._toggleChecked=function(c,d){var e=d&&d.length?d:this.labels.find("input"),i=this,e=e.not(b.instance._isOpen?":disabled, :hidden":":disabled").each(this._toggleState("checked",c));this.update(); var j=e.map(function(){return this.value}).get();this.element.find("option").filter(function(){!this.disabled&&-1<a.inArray(this.value,j)&&i._toggleState("selected",c).call(this)})};d=a(document).bind("multiselectrefresh",function(){b.updateCache();b._handler()});this.options.autoReset&&d.bind("multiselectclose",a.proxy(this._reset,this))},_handler:function(b){var c=a.trim(this.input[0].value.toLowerCase()),d=this.rows,g=this.inputs,h=this.cache;if(c){d.hide();var e=RegExp(c.replace(f,"\\$&"),"gi"); this._trigger("filter",b,a.map(h,function(a,b){return-1!==a.search(e)?(d.eq(b).show(),g.get(b)):null}))}else d.show();this.instance.menu.find(".ui-multiselect-optgroup-label").each(function(){var b=a(this),c=b.nextUntil(".ui-multiselect-optgroup-label").filter(function(){return"none"!==a.css(this,"display")}).length;b[c?"show":"hide"]()})},_reset:function(){this.input.val("").trigger("keyup")},updateCache:function(){this.rows=this.instance.menu.find(".ui-multiselect-checkboxes li:not(.ui-multiselect-optgroup-label)");this.cache=this.element.children().map(function(){var b=a(this);"optgroup"===this.tagName.toLowerCase()&&(b=b.children());return b.map(function(){return this.innerHTML.toLowerCase()}).get()}).get()},widget:function(){return this.wrapper},destroy:function(){a.Widget.prototype.destroy.call(this);this.input.val("").trigger("keyup");this.wrapper.remove()}})})(jQuery);
