/**
 * jqGrid extension - Tree Grid
 * Copyright (c) 2008-2014, Tony Tomov, tony@trirand.com
 * Copyright (c) 2014-2017, Oleg Kiriljuk, oleg.kiriljuk@ok-soft-gmbh.com
 * Dual licensed under the MIT and GPL licenses:
 * http://www.opensource.org/licenses/mit-license.php
 * http://www.gnu.org/licenses/gpl-2.0.html
**/

/*jshint eqeqeq:false */
/*jslint browser: true, eqeq: true, plusplus: true, nomen: true, unparam: true, vars: true, white: true, todo: true */
/*global jQuery, define, exports, module, require */
(function (factory) {
	"use strict";
	if (typeof define === "function" && define.amd) {
		// AMD. Register as an anonymous module.
		define([
			"jquery",
			"./grid.base"
		], factory);
	} else if (typeof module === "object" && module.exports) {
		// Node/CommonJS
		module.exports = function (root, $) {
			if (!root) {
				root = window;
			}
			if ($ === undefined) {
				// require("jquery") returns a factory that requires window to
				// build a jQuery instance, we normalize how we use modules
				// that require this pattern but the window provided is a noop
				// if it's defined (how jquery works)
				$ = typeof window !== "undefined" ?
						require("jquery") :
						require("jquery")(root);
			}
			require("./grid.base");
			factory($);
			return $;
		};
	} else {
		// Browser globals
		factory(jQuery);
	}
}(function ($) {
	"use strict";
	var jgrid = $.jgrid, getAccessor = jgrid.getAccessor, stripPref = jgrid.stripPref,
		jqID = jgrid.jqID, base = $.fn.jqGrid;
	// begin module grid.treegrid
	var treeGridFeedback = function () {
			var args = $.makeArray(arguments);
			args[0] = "treeGrid" + args[0].charAt(0).toUpperCase() + args[0].substring(1);
			args.unshift("");
			args.unshift("");
			args.unshift(this.p);
			return jgrid.feedback.apply(this, args);
		},
		getNodeIcons = function (p, item) {
			var icons = item[p.treeReader.icon_field],
				treeIcons = p.treeIcons,
				iconCollapsed = treeIcons.plus + " tree-plus",
				iconExpanded = treeIcons.minus + " tree-minus";
			if (icons && typeof icons === "string") {
				icons = icons.split(",");
				if (icons.length === 2) {
					iconExpanded = icons[0];
					iconCollapsed = icons[1];
				}
			}
			return {
				expanded: iconExpanded,
				collapsed: iconCollapsed,
				common: treeIcons.commonIconClass
			};
		};
	jgrid.extend({
		setTreeNode: function () {
			// TODO: Move the code in setTreeGrid because it uses currently no parameters
			// and it's don't make any actions with specific row
			return this.each(function () {
				var $t = this, $self = $($t), p = $t.p;
				if (!$t.grid || !p.treeGrid) { return; }
				var expanded = p.treeReader.expanded_field,
					isLeaf = p.treeReader.leaf_field,
					beforeSelectRow = function (e, rowid, eOrg) {
						if (eOrg != null) {
							var $target = $(eOrg.target),
								$td = $target.closest("tr.jqgrow>td"),
								$tr = $td.parent(),
								expendOrCollaps = function () {
									var item = p.data[p._index[stripPref(p.idPrefix, rowid)]],
										collapseOrExpand = item[expanded] ? "collapse" : "expand";
									if (!item[isLeaf]) {
										base[collapseOrExpand + "Row"].call($self, item, $tr);
										base[collapseOrExpand + "Node"].call($self, item, $tr);
									}
								};
							if ($target.is("div.treeclick")) {
								expendOrCollaps();
							} else if (p.ExpandColClick) {
								if ($td.length > 0 && $target.closest("span.cell-wrapper", $td).length > 0) {
									expendOrCollaps();
								}
							}
							return true; // allow selection
						}
					};

				$self.off("jqGridBeforeSelectRow.setTreeNode");
				$self.on("jqGridBeforeSelectRow.setTreeNode", beforeSelectRow);

			});
		},
		setTreeGrid: function () {
			return this.each(function () {
				var $t = this, p = $t.p, nm, key, tkey, dupcols = [],
					boolProp = ["leaf_field", "expanded_field", "loaded"];
				if (!p.treeGrid) { return; }
				if (!p.treedatatype) { $.extend($t.p, { treedatatype: p.datatype }); }
				p.subGrid = false;
				p.altRows = false;
				p.pgbuttons = false;
				p.pginput = false;
				p.gridview = true;
				if (p.rowTotal === null) { p.rowNum = p.maxRowNum; }
				p.rowList = [];
				//pico = "ui-icon-triangle-1-" + (p.direction==="rtl" ? "w" : "e");
				//p.treeIcons = $.extend({plus:pico,minus:"ui-icon-triangle-1-s",leaf:"ui-icon-radio-off"},p.treeIcons || {});
				p.treeIcons.plus = p.direction === "rtl" ? p.treeIcons.plusRtl : p.treeIcons.plusLtr;
				if (p.treeGridModel === "nested") {
					p.treeReader = $.extend({
						level_field: "level",
						left_field: "lft",
						right_field: "rgt",
						leaf_field: "isLeaf",
						expanded_field: "expanded",
						loaded: "loaded",
						icon_field: "icon"
					}, p.treeReader);
				} else if (p.treeGridModel === "adjacency") {
					p.treeReader = $.extend({
						level_field: "level",
						parent_id_field: "parent",
						leaf_field: "isLeaf",
						expanded_field: "expanded",
						loaded: "loaded",
						icon_field: "icon"
					}, p.treeReader);
				}
				for (key in p.colModel) {
					if (p.colModel.hasOwnProperty(key)) {
						nm = p.colModel[key].name;
						for (tkey in p.treeReader) {
							if (p.treeReader.hasOwnProperty(tkey) && p.treeReader[tkey] === nm) {
								dupcols.push(nm);
							}
						}
					}
				}
				$.each(p.treeReader, function (prop) {
					var name = String(this);
					if (name && $.inArray(name, dupcols) === -1) {
						if ($.inArray(prop, boolProp) >= 0) {
							p.additionalProperties.push({
								name: name,
								search: false,
								convert: function (data) {
									return data === true || String(data).toLowerCase() === "true" || String(data) === "1" ? true : data;
								}
							});
						} else {
							p.additionalProperties.push(name);
						}
					}
				});
			});
		},
		expandRow: function (record) {
			this.each(function () {
				var $t = this, $self = $($t), p = $t.p;
				if (!$t.grid || !p.treeGrid) { return; }
				var expanded = p.treeReader.expanded_field, rowid = record[p.localReader.id]; // without prefix
				if (!treeGridFeedback.call($t, "beforeExpandRow", { rowid: rowid, item: record })) { return; }
				var childern = base.getNodeChildren.call($self, record);
				$(childern).each(function () {
					var id = p.idPrefix + getAccessor(this, p.localReader.id);
					$(base.getGridRowById.call($self, id)).css("display", "");
					if (this[expanded]) {
						base.expandRow.call($self, this);
					}
				});
				treeGridFeedback.call($t, "afterExpandRow", { rowid: rowid, item: record });
			});
		},
		collapseRow: function (record) {
			this.each(function () {
				var $t = this, $self = $($t), p = $t.p;
				if (!$t.grid || !p.treeGrid) { return; }
				var expanded = p.treeReader.expanded_field, rowid = record[p.localReader.id]; // without prefix
				if (!treeGridFeedback.call($t, "beforeCollapseRow", { rowid: rowid, item: record })) { return; }
				var childern = base.getNodeChildren.call($self, record);
				$(childern).each(function () {
					var id = p.idPrefix + getAccessor(this, p.localReader.id);
					$(base.getGridRowById.call($self, id)).css("display", "none");
					if (this[expanded]) {
						base.collapseRow.call($self, this);
					}
				});
				treeGridFeedback.call($t, "afterCollapseRow", { rowid: rowid, item: record });
			});
		},
		// NS ,adjacency models
		getRootNodes: function () {
			var result = [];
			this.each(function () {
				var $t = this, p = $t.p;
				if (!$t.grid || !p.treeGrid) { return; }
				switch (p.treeGridModel) {
					case "nested":
						var level = p.treeReader.level_field;
						$(p.data).each(function () {
							if (parseInt(this[level], 10) === parseInt(p.tree_root_level, 10)) {
								result.push(this);
							}
						});
						break;
					case "adjacency":
						var parentId = p.treeReader.parent_id_field;
						$(p.data).each(function () {
							if (this[parentId] === null || String(this[parentId]).toLowerCase() === "null") {
								result.push(this);
							}
						});
						break;
				}
			});
			return result;
		},
		getNodeDepth: function (rc) {
			var ret = null;
			this.each(function () {
				var $t = this, p = $t.p;
				if (!$t.grid || !p.treeGrid) { return; }
				switch (p.treeGridModel) {
					case "nested":
						var level = p.treeReader.level_field;
						ret = parseInt(rc[level], 10) - parseInt(p.tree_root_level, 10);
						break;
					case "adjacency":
						ret = base.getNodeAncestors.call($($t), rc).length;
						break;
				}
			});
			return ret;
		},
		getNodeParent: function (rc) {
			// var $t = this instanceof $ && this.length > 0 ? this[0] : this;
			var $t = this[0];
			if (!$t || !$t.grid || $t.p == null || !$t.p.treeGrid || rc == null) { return null; }
			var p = $t.p, treeReader = p.treeReader, parentIdName = treeReader.parent_id_field, parentId = rc[parentIdName];
			if (p.treeGridModel === "nested") {
				var result = null,
					lftc = treeReader.left_field,
					rgtc = treeReader.right_field,
					levelc = treeReader.level_field,
					lft = parseInt(rc[lftc], 10), rgt = parseInt(rc[rgtc], 10), level = parseInt(rc[levelc], 10);

				$(p.data).each(function () {
					if (parseInt(this[levelc], 10) === level - 1 && parseInt(this[lftc], 10) < lft && parseInt(this[rgtc], 10) > rgt) {
						result = this;
						return false;
					}
				});
				return result;
			}
			if (parentId === null || parentId === "null") { return null; }
			var iParent = p._index[parentId];
			return iParent !== undefined ? p.data[iParent] : null;
		},
		getNodeChildren: function (rc) {
			var result = [];
			this.each(function () {
				var $t = this, p = $t.p;
				if (!$t.grid || !p.treeGrid) { return; }
				switch (p.treeGridModel) {
					case "nested":
						var lftc = p.treeReader.left_field, rgtc = p.treeReader.right_field, levelc = p.treeReader.level_field,
							lft = parseInt(rc[lftc], 10),
							rgt = parseInt(rc[rgtc], 10),
							level = parseInt(rc[levelc], 10);
						$(p.data).each(function () {
							if (parseInt(this[levelc], 10) === level + 1 && parseInt(this[lftc], 10) > lft && parseInt(this[rgtc], 10) < rgt) {
								result.push(this);
							}
						});
						break;
					case "adjacency":
						var parentId = p.treeReader.parent_id_field, dtid = p.localReader.id;
						$(p.data).each(function () {
							if (String(this[parentId]) === String(rc[dtid])) {
								result.push(this);
							}
						});
						break;
				}
			});
			return result;
		},
		getFullTreeNode: function (rc) {
			var result = [];
			this.each(function () {
				var $t = this, p = $t.p, len;
				if (!$t.grid || !p.treeGrid) { return; }
				switch (p.treeGridModel) {
					case "nested":
						var lftc = p.treeReader.left_field, rgtc = p.treeReader.right_field, levelc = p.treeReader.level_field,
							lft = parseInt(rc[lftc], 10),
							rgt = parseInt(rc[rgtc], 10),
							level = parseInt(rc[levelc], 10);
						$(p.data).each(function () {
							if (parseInt(this[levelc], 10) >= level && parseInt(this[lftc], 10) >= lft && parseInt(this[lftc], 10) <= rgt) {
								result.push(this);
							}
						});
						break;
					case "adjacency":
						if (rc) {
							result.push(rc);
							var parentId = p.treeReader.parent_id_field, dtid = p.localReader.id;
							$(p.data).each(function () {
								var i;
								len = result.length;
								for (i = 0; i < len; i++) {
									if (String(result[i][dtid]) === String(this[parentId])) {
										result.push(this);
										break;
									}
								}
							});
						}
						break;
				}
			});
			return result;
		},
		// End NS, adjacency Model
		getNodeAncestors: function (rc) {
			var ancestors = [];
			this.each(function () {
				var $t = this, $self = $($t), getNodeParent = base.getNodeParent;
				if (!$t.grid || !$t.p.treeGrid) { return; }
				var parent = getNodeParent.call($self, rc);
				while (parent) {
					ancestors.push(parent);
					parent = getNodeParent.call($self, parent);
				}
			});
			return ancestors;
		},
		isVisibleNode: function (rc) {
			var result = true;
			this.each(function () {
				var $t = this, p = $t.p;
				if (!$t.grid || !p.treeGrid) { return; }
				var ancestors = base.getNodeAncestors.call($($t), rc), expanded = p.treeReader.expanded_field;
				$(ancestors).each(function () {
					result = result && this[expanded];
					if (!result) { return false; }
				});
			});
			return result;
		},
		isNodeLoaded: function (rc) {
			var result;
			this.each(function () {
				var $t = this, p = $t.p;
				if (!$t.grid || !p.treeGrid) { return; }
				var isLeaf = p.treeReader.leaf_field, loaded = p.treeReader.loaded;
				if (rc !== undefined) {
					if (rc[loaded] !== undefined) {
						result = rc[loaded];
					} else if (rc[isLeaf] || base.getNodeChildren.call($($t), rc).length > 0) {
						result = true;
					} else {
						result = false;
					}
				} else {
					result = false;
				}
			});
			return result;
		},
		expandNode: function (rc) {
			return this.each(function () {
				var $t = this, p = $t.p, id, rc1, icons;
				if (!$t.grid || !p.treeGrid) { return; }
				var treeReader = p.treeReader;

				if (!rc[treeReader.expanded_field]) {
					id = getAccessor(rc, p.localReader.id);
					if (!treeGridFeedback.call($t, "beforeExpandNode", { rowid: id, item: rc })) { return; }
					rc1 = $("#" + p.idPrefix + jqID(id), $t.grid.bDiv)[0];

					rc[treeReader.expanded_field] = true;
					icons = getNodeIcons(p, rc);
					$("div.treeclick", rc1).removeClass(icons.collapsed).addClass(icons.common).addClass(icons.expanded);
					if (p.treedatatype !== "local" && !base.isNodeLoaded.call($($t), p.data[p._index[id]]) && !$t.grid.hDiv.loading) {
						// set the value which will be used during processing of the server response
						// in readInput
						p.treeANode = rc1.rowIndex;
						p.datatype = p.treedatatype;
						base.setGridParam.call($($t), {
							postData: p.treeGridModel === "nested" ?
									{
										nodeid: id,
										n_level: rc[treeReader.level_field],
										n_left: rc[treeReader.left_field],
										n_right: rc[treeReader.right_field]
									} :
									{
										nodeid: id,
										n_level: rc[treeReader.level_field],
										parentid: rc[treeReader.parent_id_field]
									}
						});
						$($t).trigger("reloadGrid");
						rc[treeReader.loaded] = true;
						base.setGridParam.call($($t), {
							postData: p.treeGridModel === "nested" ?
									{
										nodeid: "",
										n_level: "",
										n_left: "",
										n_right: ""
									} :
									{
										nodeid: "",
										n_level: "",
										parentid: ""
									}
						});
					}
					treeGridFeedback.call($t, "afterExpandNode", { rowid: id, item: rc });
				}
			});
		},
		collapseNode: function (rc) {
			return this.each(function () {
				var $t = this, p = $t.p, icons;
				if (!$t.grid || !p.treeGrid) { return; }
				var expanded = p.treeReader.expanded_field;
				if (rc[expanded]) {
					var id = getAccessor(rc, p.localReader.id);
					if (!treeGridFeedback.call($t, "beforeCollapseNode", { rowid: id, item: rc })) { return; }
					rc[expanded] = false;
					icons = getNodeIcons(p, rc);
					$("#" + p.idPrefix + jqID(id), $t.grid.bDiv) // $tr
						.find("div.treeclick")
						.removeClass(icons.expanded)
						.addClass(icons.common)
						.addClass(icons.collapsed);
					if (p.unloadNodeOnCollapse === true || ($.isFunction(p.unloadNodeOnCollapse) && p.unloadNodeOnCollapse.call($t, rc))) {
						rc[p.treeReader.loaded] = false;
						$($t).jqGrid("delTreeNode", id, true);
					}
					treeGridFeedback.call($t, "afterCollapseNode", { rowid: id, item: rc });
				}
			});
		},
		SortTree: function (sortname, newDir, st, datefmt) {
			return this.each(function () {
				var $t = this, p = $t.p, $self = $($t);
				if (!$t.grid || !p.treeGrid) { return; }
				var i, len, rec, records = [], rt = base.getRootNodes.call($self), query = jgrid.from.call($t, rt);
				// Sorting roots
				query.orderBy(sortname, newDir, st, datefmt);
				var roots = query.select();

				// Sorting children
				for (i = 0, len = roots.length; i < len; i++) {
					rec = roots[i];
					records.push(rec);
					base.collectChildrenSortTree.call($self, records, rec, sortname, newDir, st, datefmt);
				}
				$.each(records, function (index) {
					var id = getAccessor(this, p.localReader.id);
					$($t.rows[index]).after($self.find(">tbody>tr#" + jqID(id)));
				});
			});
		},
		collectChildrenSortTree: function (records, rec, sortname, newDir, st, datefmt) {
			return this.each(function () {
				var $t = this, $self = $($t);
				if (!$t.grid || !$t.p.treeGrid) { return; }
				var i, len, child, ch = base.getNodeChildren.call($self, rec), query = jgrid.from.call($t, ch);
				query.orderBy(sortname, newDir, st, datefmt);
				var children = query.select();
				for (i = 0, len = children.length; i < len; i++) {
					child = children[i];
					records.push(child);
					base.collectChildrenSortTree.call($self, records, child, sortname, newDir, st, datefmt);
				}
			});
		},
		// experimental
		setTreeRow: function (rowid, data) {
			var success = false;
			this.each(function () {
				var t = this;
				if (!t.grid || !t.p.treeGrid) { return; }
				success = base.setRowData.call($(t), rowid, data);
			});
			return success;
		},
		delTreeNode: function (rowid, skipSelf) {
			return this.each(function () {
				var $t = this, p = $t.p, myright, width, res, key, rid = p.localReader.id, i, $self = $($t),
					left = p.treeReader.left_field,
					right = p.treeReader.right_field;
				if (!$t.grid || !p.treeGrid) { return; }
				var rc = p._index[rowid];
				if (rc !== undefined) {
					// nested
					myright = parseInt(p.data[rc][right], 10);
					width = myright - parseInt(p.data[rc][left], 10) + 1;
					var dr = base.getFullTreeNode.call($self, p.data[rc]);
					if (dr.length > 0) {
						for (i = 0; i < dr.length; i++) {
							if (!skipSelf || rowid !== dr[i][rid]) {
								base.delRowData.call($self, dr[i][rid]);
							}
						}
					}
					if (p.treeGridModel === "nested") {
						// ToDo - update grid data
						res = jgrid.from.call($t, p.data)
							.greater(left, myright, { stype: "integer" })
							.select();
						if (res.length) {
							for (key in res) {
								if (res.hasOwnProperty(key)) {
									res[key][left] = parseInt(res[key][left], 10) - width;
								}
							}
						}
						res = jgrid.from.call($t, p.data)
							.greater(right, myright, { stype: "integer" })
							.select();
						if (res.length) {
							for (key in res) {
								if (res.hasOwnProperty(key)) {
									res[key][right] = parseInt(res[key][right], 10) - width;
								}
							}
						}
					}
				}
			});
		},
		addChildNode: function (nodeid, parentid, data, expandData) {
			return this.each(function () {
				if (!data) { return; }
				var $t = this, p = $t.p, $self = $($t), getInd = base.getInd,
					iconExpanded = p.treeIcons.minus + " tree-minus",
					method, parentindex, parentdata, parentlevel, iRow, rowind = parentid, leaf, maxright,
					expanded = p.treeReader.expanded_field, isLeaf = p.treeReader.leaf_field, level = p.treeReader.level_field,
					parent = p.treeReader.parent_id_field,
					left = p.treeReader.left_field,
					right = p.treeReader.right_field,
					loaded = p.treeReader.loaded;
				if (expandData === undefined) { expandData = false; }
				if (nodeid == null) {
					nodeid = jgrid.randId();
				}
				var prow = getInd.call($self, parentid);
				leaf = false;
				// if not a parent we assume root
				if (parentid === undefined || parentid === null || parentid === "") {
					parentid = null;
					rowind = null;
					method = "last";
					parentlevel = p.tree_root_level;
				} else {
					method = "after";
					parentindex = p._index[parentid];
					parentdata = p.data[parentindex];
					parentid = parentdata[p.localReader.id];
					iRow = getInd.call($self, parentid);
					parentlevel = parseInt(parentdata[level], 10) + 1;
					var childs = base.getFullTreeNode.call($self, parentdata);
					// if there are child nodes get the last index of it
					if (childs.length) {
						// find the max rowIndex of the children
						var iChild, iChildRow, childId;
						for (iChild = 0; iChild < childs.length; iChild++) {
							childId = childs[iChild][p.localReader.id];
							iChildRow = getInd.call($self, childId);
							if (iChildRow > iRow) {
								iRow = iChildRow;
								rowind = childId;
							}
						}
					}
					// if the node is leaf
					if (parentdata[isLeaf]) {
						leaf = true;
						parentdata[expanded] = true;
						//var prow = getInd.call($self, parentid);
						$($t.rows[prow])
							.find("span.cell-wrapperleaf").removeClass("cell-wrapperleaf").addClass("cell-wrapper")
							.end()
							.find("div.tree-leaf").removeClass(p.treeIcons.leaf + " tree-leaf").addClass(p.treeIcons.commonIconClass).addClass(iconExpanded);
						p.data[parentindex][isLeaf] = false;
						parentdata[loaded] = true;
					}
				}

				if (data[expanded] === undefined) { data[expanded] = false; }
				if (data[loaded] === undefined) { data[loaded] = false; }
				data[level] = parentlevel;
				if (data[isLeaf] === undefined) { data[isLeaf] = true; }
				if (p.treeGridModel === "adjacency") {
					data[parent] = parentid;
				}
				if (p.treeGridModel === "nested") {
					// this method requiere more attention
					var query, res, key;
					//maxright = parseInt(maxright,10);
					// ToDo - update grid data
					if (parentid !== null) {
						maxright = parseInt(parentdata[right], 10);
						query = jgrid.from.call($t, p.data);
						query = query.greaterOrEquals(right, maxright, { stype: "integer" });
						res = query.select();
						if (res.length) {
							for (key in res) {
								if (res.hasOwnProperty(key)) {
									res[key][left] = res[key][left] > maxright ? parseInt(res[key][left], 10) + 2 : res[key][left];
									res[key][right] = res[key][right] >= maxright ? parseInt(res[key][right], 10) + 2 : res[key][right];
								}
							}
						}
						data[left] = maxright;
						data[right] = maxright + 1;
					} else {
						maxright = parseInt(base.getCol.call($self, right, false, "max"), 10);
						res = jgrid.from.call($t, p.data)
							.greater(left, maxright, { stype: "integer" })
							.select();
						if (res.length) {
							for (key in res) {
								if (res.hasOwnProperty(key)) {
									res[key][left] = parseInt(res[key][left], 10) + 2;
								}
							}
						}
						res = jgrid.from.call($t, p.data)
							.greater(right, maxright, { stype: "integer" })
							.select();
						if (res.length) {
							for (key in res) {
								if (res.hasOwnProperty(key)) {
									res[key][right] = parseInt(res[key][right], 10) + 2;
								}
							}
						}
						data[left] = maxright + 1;
						data[right] = maxright + 2;
					}
				}
				if (parentid === null || base.isNodeLoaded.call($self, parentdata) || leaf) {
					base.addRowData.call($self, nodeid, data, method, rowind);
				}
				if (parentdata && !parentdata[expanded] && expandData) {
					$($t.rows[prow])
						.find("div.treeclick")
						.click();
				}
			});
		}
	});
	// end module grid.treegrid
}));
