/*
 * jsTreeGrid 0.6
 * http://jsorm.com/
 *
 * Dual licensed under the MIT and GPL licenses (same as jQuery):
 *   http://www.opensource.org/licenses/mit-license.php
 *   http://www.gnu.org/licenses/gpl.html
 * 
 * Created for Tufin www.tufin.com
 * Contributed to public source through the good offices of Tufin
 *
 * $Date: 2010-08-16 $
 * $Revision:  $
 */

/*global window, jQuery*/

/* 
 * jsTree grid plugin 0.6
 * This plugin handles adding a grid to a tree to display additional data
 */
(function ($) {
	$.jstree.plugin("grid", {
		__init : function () { 
			var s = this._get_settings().grid || {};
			this.data.grid.columns = s.columns || []; 
			this.data.grid.treeClass = "jstree-grid";
			this.data.grid.columnWidth = s.width;
			
			// set up the wrapper
			this._prepare_wrapper();
			
			// set up the classes we need
			$("<link/>").attr({rel: "stylesheet",type: "text/css", href: "treegrid.css"}).appendTo($("head",$(document)));

			this.get_container().bind("open_node.jstree create_node.jstree clean_node.jstree", $.proxy(function (e, data) { 
					this._prepare_grid(data.rslt.obj);
				}, this))
			.bind("loaded.jstree", $.proxy(function (e) {
				this._prepare_headers();
				this._prepare_grid();
				}, this));
		},
		defaults : {
			width: 25
		},
		_fn : { 
			_prepare_wrapper : function() {
				var obj = this.get_container(), parent = obj.parent(), wrapper, header;
				// wrap the container in a new div, which contains the headers
				header = $("<div></div>").addClass("jstree-grid-header");
				$("<div></div>").appendTo(parent).append(header).append(obj);
				// save the offset of the div from the body
				this.data.grid.divOffset = header.parent().offset().left;
				this.data.grid.header = header;
			},
			_prepare_headers : function() {
				var header, i, cols = this.data.grid.columns || [], width, defaultWidth = this.data.grid.columnWidth, cl, val, margin, last;
				header = this.data.grid.header;
				
				// create the headers
				for (i=0;i<cols.length;i++) {
					cl = cols[i].headerClass || "";
					val = cols[i].header || "";
					width = cols[i].width || defaultWidth;
					width -= 2+8; // account for the borders and padding
					margin = i === 0 ? 3 : 0;
					last = $("<div></div>").css({display: "inline-block", width: width, overflow: "hidden", "margin-left": margin,"padding": "1 3 2 5"})
						.addClass("jstree-grid-header "+cl).text(val).appendTo(header);
				}		
				last.addClass("jstree-grid-header-last");
				
			},
			_prepare_grid : function(obj) {
				var c = this.data.grid.treeClass, _this = this, t, cols = this.data.grid.columns || [], width, defaultWidth = this.data.grid.columnWidth;
				var divOffset = this.data.grid.divOffset, depth;
				obj = !obj || obj == -1 ? this.get_container() : this._get_node(obj);
				// get our column definition
				obj.each(function () {
					var i, val, cl, a, last, valClass;
					t = $(this);
					a = t.children("a:not(."+c+")");
					if (a.length === 1) {
						a.addClass(c);
						depth = a.parentsUntil(_this.get_container()).filter("li").length;
						//width = cols[0].width - a.closest("li").offset().left - divOffset + parseInt(a.css("padding-left").replace("px",""),10);
						width = cols[0].width - depth*18;
						a.css({width: width, overflow: "hidden"});
						last = a;
						for (i=1;i<cols.length;i++) {
							cl = cols[i].cellClass || "";
							val = cols[i].value && t.attr(cols[i].value) ? t.attr(cols[i].value) : "";
							valClass = cols[i].valueClass && t.attr(cols[i].valueClass) ? t.attr(cols[i].valueClass) : "";
							if (valClass && cols[i].valueClassPrefix && cols[i].valueClassPrefix !== "") {
								valClass = cols[i].valueClassPrefix + valClass;
							}
							width = cols[i].width || defaultWidth;
							width -= 4;
							last = $("<div></div>").css({display: "inline-block", width: width, overflow: "hidden", "padding-left": "4px"}).addClass("jstree-grid-cell "+cl + " "+valClass).text(val).insertAfter(last);
						}		
						last.addClass("jstree-grid-cell-last");
					}
				});
				if(obj.is("li")) { this._repair_state(obj); }
				else { obj.find("> ul > li").each(function () { _this._repair_state(this); }); }
			}
		}
		// need to do alternating background colors or borders
	});
})(jQuery);
