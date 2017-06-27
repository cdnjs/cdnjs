/*
 * http://github.com/deitch/jstree-grid
 *
 * This plugin handles adding a grid to a tree to display additional data
 *
 * Licensed under the MIT license:
 *   http://www.opensource.org/licenses/mit-license.php
 * 
 * Works only with jstree "v3.0.0-beta5" and higher
 *
 * $Date: 2014-04-18 $
 * $Revision:  3.1.0-beta2 $
 */

/*jslint nomen:true */
/*global window,navigator, document, jQuery, console, define */

/* AMD support added by jochenberger per https://github.com/deitch/jstree-grid/pull/49
 *
 */
(function (factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define(['jquery', 'jstree'], factory);
    } else {
        // Browser globals
        factory(jQuery);
    }
}(function ($) {
	var renderAWidth, renderATitle, getIndent, htmlstripre, findLastClosedNode,
	SPECIAL_TITLE = "_DATA_", LEVELINDENT = 24, bound = false, styled = false, GRIDCELLID_PREFIX = "jsgrid_",GRIDCELLID_POSTFIX = "_col";
	
	/*jslint regexp:true */
	htmlstripre = /<\/?[^>]+>/gi;
	/*jslint regexp:false */
	
	getIndent = function(node,tree) {
		var div, i, li, width;
		
		// did we already save it for this tree?
		tree._gridSettings = tree._gridSettings || {};
		if (tree._gridSettings.indent > 0) {
			width = tree._gridSettings.indent;
		} else {
			// create a new div on the DOM but not visible on the page
			div = $("<div></div>");
			i = node.prev("i");
			li = i.parent();
			// add to that div all of the classes on the tree root
			div.addClass(tree.get_node("#",true).attr("class"));
		
			// move the li to the temporary div root
			li.appendTo(div);
			
			// attach to the body quickly
			div.appendTo($("body"));
		
			// get the width
			width = i.width() || LEVELINDENT;
		
			// detach the li from the new div and destroy the new div
			li.detach();
			div.remove();
			
			// save it for the future
			tree._gridSettings.indent = width;
		}
		
		
		return(width);
		
	};
	
	findLastClosedNode = function (tree,id) {
		// first get our node
		var ret, node = tree.get_node(id), children = node.children;
		// is it closed?
		if (!node.state.opened) {
			ret = id;
		} else if (children && children.length > 0){
			ret = findLastClosedNode(tree,children[children.length-1]);
		}
		return(ret);
	};

	renderAWidth = function(node,tree) {
		var depth, a = node.get(0).tagName.toLowerCase() === "a" ? node : node.children("a"), width,
		fullWidth = parseInt(tree.settings.grid.columns[0].width,10) + parseInt(tree._gridSettings.treeWidthDiff,10);
		// need to use a selector in jquery 1.4.4+
		depth = tree.get_node(node).parents.length;
		width = fullWidth - depth*getIndent(node,tree);
		a.css({"vertical-align": "top", "overflow":"hidden"});
		return(fullWidth);
	};
	renderATitle = function(node,t,tree) {
		var a = node.get(0).tagName.toLowerCase() === "a" ? node : node.children("a"), title, col = tree.settings.grid.columns[0];
		// get the title
		title = "";
		if (col.title) {
			if (col.title === SPECIAL_TITLE) {
				title = tree.get_text(t);
			} else if (t.attr(col.title)) {
				title = t.attr(col.title);
			}
		}
		// strip out HTML
		title = title.replace(htmlstripre, '');
		if (title) {
			a.attr("title",title);
		}
	};

	$.jstree.defaults.grid = {
		width: 25
	};

	$.jstree.plugins.grid = function(options,parent) {
		this._initialize = function () {
			if (!this._initialized) {
				var s = this.settings.grid || {}, styles,	container = this.element, gridparent = container.parent(), i,
				gs = this._gridSettings = {
					columns : s.columns || [],
					treeClass : "jstree-grid-col-0",
					columnWidth : s.width,
					defaultConf : {"*display":"inline","*+display":"inline"},
					isThemeroller : !!this._data.themeroller,
					treeWidthDiff : 0,
					resizable : s.resizable,
					indent: 0
				}, cols = gs.columns;
			
				var msie = /msie/.test(navigator.userAgent.toLowerCase());
				if (msie) {
					var version = parseFloat(navigator.appVersion.split("MSIE")[1]);
					if (version < 8) {
						gs.defaultConf.display = "inline";
						gs.defaultConf.zoom = "1";
					}
				}
			
				// set up the classes we need
				if (!styled) {
					styled = true;
					styles = [
						'.jstree-grid-cell {vertical-align: top; overflow:hidden;}',
						'.jstree-grid-separator {position:absolute; margin-left: -2px; border-width: 0 2px 0 0; *display:inline; *+display:inline; margin-right:0px;width:0px;}',
	          '.jstree-grid-header-cell {overflow: hidden; white-space: nowrap;}',
						'.jstree-grid-header-themeroller {border: 0; padding: 1px 3px;}',
						'.jstree-grid-header-regular {background-color: #EBF3FD;}',
						'.jstree-grid-resizable-separator {cursor: col-resize;}',
						'.jstree-grid-separator-regular {border-color: #d0d0d0; border-style: solid;}',
						'.jstree-grid-cell-themeroller {border: none !important; background: transparent !important;}',
						'.jstree-grid-table {table-layout: fixed; width: 100%;}',
						'.jstree-grid-col-0 {width: 100%;}'
					];

					$('<style type="text/css">'+styles.join("\n")+'</style>').appendTo("head");
				}
				this.table = $("<table></table>").addClass("jstree-grid-table");
				this.gridWrapper = $("<div></div>").addClass("jstree-grid-wrapper").appendTo(gridparent).append(this.table);
				this.dataRow = $("<tr></tr>");
				this.headerRow = $("<tr></tr>");
				this.table.append(this.headerRow);
				this.table.append(this.dataRow);
				// create the data columns
				for (i=0;i<cols.length;i++) {
					this.dataRow.append($("<td></td>").addClass("jstree-grid-cell"));
				}
				this.dataRow.children("td:first").append(container);
				
				this._initialized = true;
			}
		};
		this.init = function (el,options) { 
			parent.init.call(this,el,options);
			this._initialize();
		};
		this.bind = function () {
			parent.bind.call(this);
			this._initialize();
			this.element.on("create_node.jstree redraw.jstree clean_node.jstree change_node.jstree", $.proxy(function (e, data) { 
					var target = this.get_node(data || "#",true);
					this._prepare_grid(target);
				}, this))
			.on("close_node.jstree",$.proxy(function (e,data) {
				this._hide_grid(data);
			}, this))
			.on("open_node.jstree",$.proxy(function (e,data) {
			}, this))
			.on("load_node.jstree",$.proxy(function (e,data) {
			}, this))
			.on("loaded.jstree", $.proxy(function (e) {
				this._prepare_headers();
				this.element.trigger("loaded_grid.jstree");
				}, this))
			.on("ready.jstree",$.proxy(function (e,data) {
				// find the line-height of the first known node
				var lh = this.element.find("li a:first").css("line-height");
				$('<style type="text/css">td.jstree-grid-cell {line-height: '+lh+'}</style>').appendTo("head");

				// add container classes to the wrapper
				this.gridWrapper.addClass(this.element.attr("class"));
								
			},this))
			.on("move_node.jstree",$.proxy(function(e,data){
				var node = data.new_instance.element;
				renderAWidth(node,this);
				// check all the children, because we could drag a tree over
				node.find("li > a").each($.proxy(function(i,elm){
					renderAWidth($(elm),this);
				},this));
				
			},this))
			.on("hover_node.jstree",$.proxy(function(node,selected,event){
				var id = selected.node.id;
				this.dataRow.find("."+GRIDCELLID_PREFIX+id+GRIDCELLID_POSTFIX).addClass("jstree-hovered");
			},this))
			.on("dehover_node.jstree",$.proxy(function(node,selected,event){
				var id = selected.node.id;
				this.dataRow.find("."+GRIDCELLID_PREFIX+id+GRIDCELLID_POSTFIX).removeClass("jstree-hovered");
			},this))
			.on("select_node.jstree",$.proxy(function(node,selected,event){
				this.get_node(selected.node.id,true).children("div.jstree-grid-cell").addClass("jstree-clicked");
			},this))
			.on("deselect_node.jstree",$.proxy(function(node,selected,event){
				this.get_node(selected.node.id,true).children("div.jstree-grid-cell").removeClass("jstree-clicked");
			},this));
			if (this._gridSettings.isThemeroller) {
				this.element
					.on("select_node.jstree",$.proxy(function(e,data){
						data.rslt.obj.children("a").nextAll("div").addClass("ui-state-active");
					},this))
					.on("deselect_node.jstree deselect_all.jstree",$.proxy(function(e,data){
						data.rslt.obj.children("a").nextAll("div").removeClass("ui-state-active");
					},this))
					.on("hover_node.jstree",$.proxy(function(e,data){
						data.rslt.obj.children("a").nextAll("div").addClass("ui-state-hover");
					},this))
					.on("dehover_node.jstree",$.proxy(function(e,data){
						data.rslt.obj.children("a").nextAll("div").removeClass("ui-state-hover");
					},this));
			}
		};
		this.teardown = function() {
			var gridparent = this.parent, container = this.element;
			container.detach();
			$("div.jstree-grid-wrapper",gridparent).remove();
			gridparent.append(container);
			parent.teardown.call(this);
		};
		this._prepare_headers = function() {
			var header, i, gs = this._gridSettings,cols = gs.columns || [], width, defaultWidth = gs.columnWidth, resizable = gs.resizable || false,
			cl, val, margin, last, tr = gs.isThemeroller, classAdd = (tr?"themeroller":"regular"), puller,
			hasHeaders = 0, gridparent = this.gridparent,
			conf = gs.defaultConf, isClickedSep = false, oldMouseX = 0, newMouseX = 0,
			currentTree = null, colNum = 0, toResize = {}, clickedSep = null, borPadWidth = 0, totalWidth = 0;
			// save the original parent so we can reparent on destroy
			this.parent = gridparent;
			
			
			// set up the wrapper, if not already done
			header = this.headerRow;
			header.addClass((tr?"ui-widget-header ":"")+"jstree-grid-header jstree-grid-header-"+classAdd);
			
			// create the headers
			for (i=0;i<cols.length;i++) {
				cl = cols[i].headerClass || "";
				val = cols[i].header || "";
				if (val) {hasHeaders = true;}
				width = cols[i].width || defaultWidth;
				borPadWidth = tr ? 1+6 : 2+8; // account for the borders and padding
				width -= borPadWidth;
				margin = i === 0 ? 3 : 0;
				last = $("<th></th>").css(conf).css({"margin-left": margin,"width":width, "padding": "1px 3px 2px 5px"}).addClass((tr?"ui-widget-header ":"")+"jstree-grid-header jstree-grid-header-cell jstree-grid-header-"+classAdd+" "+cl).text(val).appendTo(header);
				totalWidth += last.outerWidth();
				puller = $("<div class='jstree-grid-separator jstree-grid-separator-"+classAdd+(tr ? " ui-widget-header" : "")+(resizable? " jstree-grid-resizable-separator":"")+"'>&nbsp;</div>").appendTo(last);
				puller.css({height:24,float:"right",position:"relative"});
			}
			// get rid of last puller
			puller.remove();
			last.addClass((tr?"ui-widget-header ":"")+"jstree-grid-header jstree-grid-header-last jstree-grid-header-"+classAdd);
			// if there is no width given for the last column, do it via automatic
			if (cols[cols.length-1].width === undefined) {
				totalWidth -= width;
				last.css({width:"auto",display:"block"}).addClass("jstree-grid-width-auto").next(".jstree-grid-separator").remove();
			}
			if (hasHeaders) {
				// save the offset of the div from the body
				gs.divOffset = header.parent().offset().left;
				gs.header = header;
			} else {
				this.headerRow.css("display","none");				
			}

			if (!bound && resizable) {
				bound = true;
				$(document).mouseup(function () {
					var  i, ref, cols, widths, headers, w;
					if (isClickedSep) {
						ref = $.jstree.reference(currentTree);
						cols = ref.settings.grid.columns;
						headers = clickedSep.closest(".jstree-grid-wrapper").find(".jstree-grid-header");
						widths = [];
						if (isNaN(colNum) || colNum < 0) { ref._gridSettings.treeWidthDiff = currentTree.find("ins:eq(0)").width() + currentTree.find("a:eq(0)").width() - ref._gridSettings.columns[0].width; }
						isClickedSep = false;
						for (i=0;i<cols.length;i++) {
							w = parseFloat(headers[i].style.width)+borPadWidth;
							widths[i] = {w: w, r: i===colNum };
							ref._gridSettings.columns[i].width = w;
						}
						
						currentTree.trigger("resize_column.jstree-grid", widths);
					}
				}).mousemove(function (e) {
						if (isClickedSep) {
							newMouseX = e.clientX;
							console.log("mousemove newMouseX oldMouseX "+newMouseX + " " + oldMouseX);
							var diff = newMouseX - oldMouseX,
							oldPrevHeaderInner, oldNextHeaderInner, oldPrevHeaderWidth, oldNextHeaderWidth, oldNextHeaderMarginLeft, 
							newPrevHeaderWidth, newNextHeaderWidth, newNextHeaderMarginLeft;

							if (diff !== 0){
								oldPrevHeaderInner = toResize.prevHeader.width();
								oldNextHeaderInner = toResize.nextHeader.width();
								oldPrevHeaderWidth = parseFloat(toResize.prevHeader.css("width"));
								oldNextHeaderWidth = parseFloat(toResize.nextHeader.css("width"));
								oldNextHeaderMarginLeft = parseFloat(toResize.prevHeader.css("margin-left"));
								
								// make sure that diff cannot be beyond the left/right limits
								diff = diff < 0 ? Math.max(diff,-oldPrevHeaderInner) : Math.min(diff,oldNextHeaderInner);
								newPrevHeaderWidth = (oldPrevHeaderInner + diff) + "px";
								newNextHeaderWidth = (oldNextHeaderInner - diff) + "px";
								newNextHeaderMarginLeft = oldNextHeaderMarginLeft + diff;
								
								console.log("diff/newPrevHeaderWidth/newNextHeaderWidth "+[diff,newPrevHeaderWidth,newNextHeaderWidth].join("/"));
								// only do this if we are not shrinking past 0 on left or right - and limit it to that amount
								if ((diff < 0 && oldPrevHeaderInner > 0) || (diff > 0 && oldNextHeaderInner > 0)) {
									toResize.prevHeader.width(newPrevHeaderWidth);
									if (toResize.nextHeader.hasClass("jstree-grid-width-auto")) {
										toResize.nextHeader.css("margin-left",newNextHeaderMarginLeft);
									} else {
										toResize.nextHeader.width(newNextHeaderWidth);
									}
									oldMouseX = newMouseX;
								}
							}
						}
					});
				header.on("selectstart", ".jstree-grid-resizable-separator", function () { return false; })
					.on("mousedown", ".jstree-grid-resizable-separator", function (e) {
						var headerWrapper;
						clickedSep = $(this);
						isClickedSep = true;
						currentTree = clickedSep.closest(".jstree-grid-wrapper").find(".jstree");
						oldMouseX = e.clientX;
						colNum = clickedSep.closest("th").prevAll("th").length;
						toResize.prevHeader = clickedSep.closest("th");
						toResize.nextHeader = toResize.prevHeader.next("th");
						// the max rightmost position we will allow is the right-most of the wrapper minus a buffer (10)
						headerWrapper = clickedSep.parent();
						return false;
					});
			}
		};
		/*
		 * Override redraw_node to correctly insert the grid
		 */
		this.redraw_node = function(obj, deep, is_callback) {
			// first allow the parent to redraw the node
			obj = parent.redraw_node.call(this, obj, deep, is_callback);
			// next prepare the grid
			if(obj) {
				this._prepare_grid(obj);
			}
			return obj;
		};
		this._hide_grid = function (data) {
			var dataRow = this.dataRow, children = data.node.children_d || [], i;
			// go through each column, remove all children with the correct ID name
			for (i=0;i<children.length;i++) {
				dataRow.find("td div."+GRIDCELLID_PREFIX+children[i]+GRIDCELLID_POSTFIX).remove();
			}
		};
		this.holdingCells = {};
		this._prepare_grid = function (obj) {
			var gs = this._gridSettings, c = gs.treeClass, _this = this, t, cols = gs.columns || [], width, tr = gs.isThemeroller, 
			classAdd = (tr?"themeroller":"regular"), img, objData = this.get_node(obj),
			defaultWidth = gs.columnWidth, conf = gs.defaultConf, cellClickHandler = function (val,col,s) {
				return function() {
					$(this).trigger("select_cell.jstree-grid", [{value: val,column: col.header,node: $(this).closest("li"),sourceName: col.value,sourceType: s}]);
				};
			},i, val, cl, wcl, a, last, valClass, wideValClass, span, paddingleft, title, gridCellName, gridCellParent, gridCellPrev,
			gridCellPrevId, col, content, s, tmpWidth, dataRow = this.dataRow, dataCell, lid, peers = this.get_node(objData.parent).children, pos;
			// get our column definition
			t = $(obj);
			
			// find the a children
			a = t.children("a");
			lid = t.attr("id");
			
			if (a.length === 1) {
				gridCellName = GRIDCELLID_PREFIX+lid+GRIDCELLID_POSTFIX;
				gridCellParent = objData.parent === "#" ? null : GRIDCELLID_PREFIX+objData.parent+GRIDCELLID_POSTFIX;
				a.addClass(c);
				renderAWidth(a,_this);
				renderATitle(a,t,_this);
				last = a;
				for (i=1;i<cols.length;i++) {
					dataCell = dataRow.children("td:eq("+i+")");
					col = cols[i];
					// get the cellClass and the wideCellClass
					cl = col.cellClass || "";
					wcl = col.wideCellClass || "";


					// get the contents of the cell - value could be a string or a function
					if (col.value !== undefined && col.value !== null && objData.data !== null && objData.data !== undefined) {
						if (typeof(col.value) === "function") {
							val = col.value(objData.data);
						} else if (objData.data[col.value] !== undefined) {
							val = objData.data[col.value];
						} else {
							val = "";
						}
					} else {
						val = "";
					}

					// put images instead of text if needed
					if (col.images) {
					img = col.images[val] || col.images["default"];
					if (img) {content = img[0] === "*" ? '<span class="'+img.substr(1)+'"></span>' : '<img src="'+img+'">';}
					} else { content = val; }

					// get the valueClass
					valClass = col.valueClass && t.attr(col.valueClass) ? t.attr(col.valueClass) : "";
					if (valClass && col.valueClassPrefix && col.valueClassPrefix !== "") {
						valClass = col.valueClassPrefix + valClass;
					}
					// get the wideValueClass
					wideValClass = col.wideValueClass && t.attr(col.wideValueClass) ? t.attr(col.wideValueClass) : "";
					if (wideValClass && col.wideValueClassPrefix && col.wideValueClassPrefix !== "") {
						wideValClass = col.wideValueClassPrefix + wideValClass;
					}
					// get the title
					title = col.title && t.attr(col.title) ? t.attr(col.title) : "";
					// strip out HTML
					title = title.replace(htmlstripre, '');
					
					// get the width
					paddingleft = 7;
					width = col.width || defaultWidth;
					width = tmpWidth || (width - paddingleft);
					
					last = dataCell.children("div#"+gridCellName+i);
					if (!last || last.length < 1) {
						last = $("<div></div>");
						// we need to put it in the dataCell - after the parent, but the position matters
						if (gridCellParent) {
							// first find my position in the list of peers
							pos = jQuery.inArray(lid,peers);
							// if we are first, we go right after the parent; else we go right after the previous peer cell
							// however, the previous peer cell might be open, which means we need to go after all of its
							// children, and its grandchildren, etc.
							// so really we would need to go *before* our next one
							// but that one might not be drawn yet
							// here is the logic for jstree drawing:
							//   it draws peers from first to last
							//   but it draws children before a parent
							// so, if I am being drawn, by definition all of my peers already drawn are before me, but none after
							gridCellPrevId = GRIDCELLID_PREFIX+ (pos <=0 ? objData.parent : findLastClosedNode(this,peers[pos-1])) +GRIDCELLID_POSTFIX+i;
							gridCellPrev = dataCell.find("div#"+gridCellPrevId);
							if (gridCellPrev && gridCellPrev.length > 0) {
								last.insertAfter(gridCellPrev);
							} else {
								this.holdingCells[gridCellPrevId] = (this.holdingCells[gridCellPrevId] || $()).add(last);
							}
						} else {
							last.appendTo(dataCell);
						}
						$("<span></span>").appendTo(last);
						last.attr("id",gridCellName+i);
						last.addClass(gridCellName);

						// do we have any children waiting for this cell?
						if (this.holdingCells[gridCellName+i]) {
							last.after(this.holdingCells[gridCellName+i]);
							delete this.holdingCells[gridCellName+i];
						}
					}
					// need to make the height of this match the line height of the tree. How?
					span = last.children("span");

					// create a span inside the div, so we can control what happens in the whole div versus inside just the text/background
					span.addClass(cl+" "+valClass).css({"margin-right":"0px","*display":"inline","*+display":"inline"}).html(content)
					// add click handler for clicking inside a grid cell
					.click(cellClickHandler(val,col,s));
					last = last.css(conf).css({"margin-left":0,position:"relative",width: "100%","padding-left":paddingleft+"px"}).addClass("jstree-grid-cell jstree-grid-cell-"+classAdd+" "+wcl+ " " + wideValClass + (tr?" ui-state-default":"")).addClass("jstree-grid-col-"+i);
					
					if (title) {
						span.attr("title",title);
					}

				}		
				last.addClass("jstree-grid-cell-last"+(tr?" ui-state-default":""));
				// if there is no width given for the last column, do it via automatic
				if (cols[cols.length-1].width === undefined) {
					last.css({width:"auto",display:"block"}).addClass("jstree-grid-width-auto").next(".jstree-grid-separator").remove();
				}
			}
			this.element.css({'overflow-y':'auto !important'});			
		};

		// need to do alternating background colors or borders
	};
}));
