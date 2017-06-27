/*
 * jQuery MultiSelect UI Widget Filtering Plugin 1.0
 * Copyright (c) 2010 Eric Hynds
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
(function(c){c.widget("ech.multiselectfilter",{options:{label:"Filter:",width:null,placeholder:"Enter keywords"},_create:function(){var a=this,b=this.options,d=this.instance=c(this.element).data("multiselect");this.header=d.menu.find(".ui-multiselect-header").addClass("ui-multiselect-hasfilter");b=this.wrapper=c('<div class="ui-multiselect-filter">'+(b.label.length?b.label:"")+'<input placeholder="'+b.placeholder+'" type="search"'+(/\d/.test(b.width)?'style="width:'+b.width+'px"':"")+" /></div>").prependTo(this.header); this.inputs=d.menu.find(":checkbox, :radio");this.input=b.find("input").bind("keydown",function(e){e.which===13&&e.preventDefault()}).bind("keyup",c.proxy(a._handler,a)).bind("click",function(){this.value.length||a._handler()});this.updateCache();this.rows=d.menu.find(".ui-multiselect-checkboxes li:not(.ui-multiselect-optgroup-label)");d._toggleChecked=function(e,f){(f&&f.length?f:this.labels.find("input")).not(a.instance._isOpen?":disabled, :hidden":":disabled").attr("checked",e?"checked":"");this.update(); this.element.children().not("disabled").attr("selected",e?"selected":"")}},_handler:function(a){var b=c.trim(this.input[0].value.toLowerCase()),d=this.rows,e=this.inputs,f=this.cache;if(b){d.hide();var h=RegExp(b,"gi");this._trigger("filter",a,c.map(f,function(i,g){if(i.search(h)!==-1){d.eq(g).show();return e.get(g)}return null}))}else d.show()},updateCache:function(){this.cache=this.element.children().map(function(){var a=c(this);if(this.tagName.toLowerCase()==="optgroup")a=a.children();if(!a.val().length)return null; return a.map(function(){return this.innerHTML.toLowerCase()}).get()}).get()},widget:function(){return this.wrapper},destroy:function(){c.Widget.prototype.destroy.call(this);this.input.val("").trigger("keyup");this.wrapper.remove()}})})(jQuery);