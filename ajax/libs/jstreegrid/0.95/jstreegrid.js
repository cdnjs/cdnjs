/*
 * jsTreeGrid 0.95
 * http://jsorm.com/
 *
 * This plugin handles adding a grid to a tree to display additional data
 *
 * Dual licensed under the MIT and GPL licenses (same as jQuery):
 *   http://www.opensource.org/licenses/mit-license.php
 *   http://www.gnu.org/licenses/gpl.html
 * 
 * Created for Tufin www.tufin.com
 * Contributed to public source through the good offices of Tufin
 *
 * $Date: 2010-10-28 $
 * $Revision:  $
 */

/*global window, document, jQuery*/

(function ($) {
	var renderAWidth = function(node,tree) {
		var depth, a = node.get(0).tagName.toLowerCase() === "a" ? node : node.children("a");
		var width = tree.data.grid.columns[0].width;
		depth = a.parentsUntil(tree.get_container()).filter("li").length;
		width = width - depth*18;
		a.css({width: width});
	};
	$.jstree.plugin("grid", {
		__init : function () { 
			var s = this._get_settings().grid || {};
			this.data.grid.columns = s.columns || []; 
			this.data.grid.treeClass = "jstree-grid";
			this.data.grid.columnWidth = s.width;
			this.data.grid.defaultConf = {display: "inline-block"};
			
			if ($.browser.msie && parseInt($.browser.version.substr(0,1),10) < 8) {
				this.data.grid.defaultConf.display = "inline";
				this.data.grid.defaultConf.zoom = "1";
			}
			
			// set up the classes we need
			$('<style type="text/css">.jstree-grid-header {border-left: 1px solid #eeeeee;border-right: 1px solid #d0d0d0;background-color: #EBF3FD;}\n.jstree-grid-cell {padding-left: 4px;}</style>').appendTo($("head"));

			this.get_container().bind("open_node.jstree create_node.jstree clean_node.jstree", $.proxy(function (e, data) { 
					this._prepare_grid(data.rslt.obj);
				}, this))
			.bind("loaded.jstree", $.proxy(function (e) {
				this._prepare_headers();
				this._prepare_grid();
				}, this))
			.bind("move_node.jstree",$.proxy(function(e,data){
				var node = data.rslt.o;
				renderAWidth(node,this);
				// check all the children, because we could drag a tree over
				node.find("li > a").each($.proxy(function(i,elm){
					renderAWidth($(elm),this);
				},this));
				
			},this));
			
		},
		defaults : {
			width: 25
		},
		_fn : { 
			_prepare_headers : function() {
				var header, i, cols = this.data.grid.columns || [], width, defaultWidth = this.data.grid.columnWidth, cl, val, margin, last;
				var cHeight, hHeight, container = this.get_container(), parent = container.parent(), hasHeaders = 0;
				var conf = this.data.grid.defaultConf;
				
				// set up the wrapper, if not already done
				header = this.data.grid.header || $("<div></div>").addClass("jstree-grid-header");
				
				// create the headers
				for (i=0;i<cols.length;i++) {
					cl = cols[i].headerClass || "";
					val = cols[i].header || "";
					if (val) {hasHeaders = true;}
					width = cols[i].width || defaultWidth;
					width -= 2+8; // account for the borders and padding
					margin = i === 0 ? 3 : 0;
					last = $("<div></div>").css(conf).css({"margin-left": margin,"width":width, "padding": "1 3 2 5"}).addClass("jstree-grid-header "+cl).text(val).appendTo(header);
				}		
				last.addClass("jstree-grid-header-last");
				// did we have any real columns?
				if (hasHeaders) {
					$("<div></div>").addClass("jstree-grid-wrapper").appendTo(parent).append(header).append(container);
					// save the offset of the div from the body
					this.data.grid.divOffset = header.parent().offset().left;
					this.data.grid.header = header;
				}
				
			},
			_prepare_grid : function(obj) {
				var c = this.data.grid.treeClass, _this = this, t, cols = this.data.grid.columns || [], width, defaultWidth = this.data.grid.columnWidth;
				var divOffset = this.data.grid.divOffset;
				var conf = this.data.grid.defaultConf;
				obj = !obj || obj == -1 ? this.get_container() : this._get_node(obj);
				// get our column definition
				obj.each(function () {
					var i, val, cl, wcl, a, last, valClass, wideValClass, span, paddingleft;
					t = $(this);
					a = t.children("a:not(."+c+")");
					if (a.length === 1) {
						a.addClass(c);
						renderAWidth(a,_this);
						last = a;
						for (i=1;i<cols.length;i++) {
							// get the cellClass and the wideCellClass
							cl = cols[i].cellClass || "";
							wcl = cols[i].wideCellClass || "";
							// get the contents of the cell
							val = cols[i].value && t.attr(cols[i].value) ? t.attr(cols[i].value) : "";
							// get the valueClass
							valClass = cols[i].valueClass && t.attr(cols[i].valueClass) ? t.attr(cols[i].valueClass) : "";
							if (valClass && cols[i].valueClassPrefix && cols[i].valueClassPrefix !== "") {
								valClass = cols[i].valueClassPrefix + valClass;
							}
							// get the wideValueClass
							wideValClass = cols[i].wideValueClass && t.attr(cols[i].wideValueClass) ? t.attr(cols[i].wideValueClass) : "";
							if (wideValClass && cols[i].wideValueClassPrefix && cols[i].wideValueClassPrefix !== "") {
								wideValClass = cols[i].wideValueClassPrefix + wideValClass;
							}
							
							// get the width
							paddingleft = 7;
							width = cols[i].width || defaultWidth;
							width = width - paddingleft;
							// create a span inside the div, so we can control what happens in the whole div versus inside just the text/background
							span = $("<span></span>").addClass(cl+" "+valClass).css("display","inline-block").text(val);
							last = $("<div></div>").css(conf).css({width: width,"padding-left":paddingleft+"px"}).addClass("jstree-grid-cell "+wcl+ " " + wideValClass).append(span).insertAfter(last);
							//last = $("<div></div>").css({display: "inline-block", width: width, overflow: "hidden"}).addClass("jstree-grid-cell "+cl + " "+valClass).text(val).insertAfter(last);
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
