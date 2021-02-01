/*jshint eqeqeq:false */
/*global jQuery, define */
(function( factory ) {
	"use strict";
	if ( typeof define === "function" && define.amd ) {
		// AMD. Register as an anonymous module.
		define([
			"jquery",
			"./grid.base"
		], factory );
	} else {
		// Browser globals
		factory( jQuery );
	}
}(function( $ ) {
"use strict";
//module begin
$.jgrid.extend({
	setTreeNode : function(i, len){
		return this.each(function(){
			var $t = this;
			if( !$t.grid || !$t.p.treeGrid ) {return;}
			var expCol = $t.p.expColInd,
			expanded = $t.p.treeReader.expanded_field,
			isLeaf = $t.p.treeReader.leaf_field,
			level = $t.p.treeReader.level_field,
			icon = $t.p.treeReader.icon_field,
			loaded = $t.p.treeReader.loaded,  lft, rgt, curLevel, ident,lftpos, twrap,
			ldat, lf,
			common = $.jgrid.styleUI[($t.p.styleUI || 'jQueryUI')].common,
			index = i;
			$($t).triggerHandler("jqGridBeforeSetTreeNode", [index, len]);
			if($.isFunction($t.p.beforeSetTreeNode)) {
				$t.p.beforeSetTreeNode.call($t, index, len);
			}
			while(i<len) {
				var ind = $.jgrid.stripPref($t.p.idPrefix, $t.rows[i].id), dind = $t.p._index[ind], expan;
				ldat = $t.p.data[dind];
				//$t.rows[i].level = ldat[level];
				if($t.p.treeGridModel === 'nested') {
					if(!ldat[isLeaf]) {
					lft = parseInt(ldat[$t.p.treeReader.left_field],10);
					rgt = parseInt(ldat[$t.p.treeReader.right_field],10);
					// NS Model
						ldat[isLeaf] = (rgt === lft+1) ? 'true' : 'false';
						$t.rows[i].cells[$t.p._treeleafpos].innerHTML = ldat[isLeaf];
					}
				}
				//else {
					//row.parent_id = rd[$t.p.treeReader.parent_id_field];
				//}
				curLevel = parseInt(ldat[level],10);
				if($t.p.tree_root_level === 0) {
					ident = curLevel+1;
					lftpos = curLevel;
				} else {
					ident = curLevel;
					lftpos = curLevel -1;
				}
				twrap = "<div class='tree-wrap tree-wrap-"+$t.p.direction+"' style='width:"+(ident*18)+"px;'>";
				twrap += "<div style='"+($t.p.direction==="rtl" ? "right:" : "left:")+(lftpos*18)+"px;' class='"+common.icon_base+" ";


				if(ldat[loaded] !== undefined) {
					if(ldat[loaded]==="true" || ldat[loaded]===true) {
						ldat[loaded] = true;
					} else {
						ldat[loaded] = false;
					}
				}
				if(ldat[isLeaf] === "true" || ldat[isLeaf] === true) {
					twrap += ((ldat[icon] !== undefined && ldat[icon] !== "") ? ldat[icon] : $t.p.treeIcons.leaf)+" tree-leaf treeclick";
					ldat[isLeaf] = true;
					lf="leaf";
				} else {
					ldat[isLeaf] = false;
					lf="";
				}
				ldat[expanded] = ((ldat[expanded] === "true" || ldat[expanded] === true) ? true : false) && (ldat[loaded] || ldat[loaded] === undefined);
				if(ldat[expanded] === false) {
					twrap += ((ldat[isLeaf] === true) ? "'" : $t.p.treeIcons.plus+" tree-plus treeclick'");
				} else {
					twrap += ((ldat[isLeaf] === true) ? "'" : $t.p.treeIcons.minus+" tree-minus treeclick'");
				}
				
				twrap += "></div></div>";
				$($t.rows[i].cells[expCol]).wrapInner("<span class='cell-wrapper"+lf+"'></span>").prepend(twrap);

				if(curLevel !== parseInt($t.p.tree_root_level,10)) {
					//var pn = $($t).jqGrid('getNodeParent',ldat);
					//expan = pn && pn.hasOwnProperty(expanded) ? pn[expanded] : true;
					expan = $($t).jqGrid('isVisibleNode',ldat); // overhead
					if( !expan ){
						$($t.rows[i]).css("display","none");
					}
				}
				$($t.rows[i].cells[expCol])
					.find("div.treeclick")
					.on("click",function(e){
						var target = e.target || e.srcElement,
						ind2 =$.jgrid.stripPref($t.p.idPrefix,$(target,$t.rows).closest("tr.jqgrow")[0].id),
						pos = $t.p._index[ind2];
						if(!$t.p.data[pos][isLeaf]){
							if($t.p.data[pos][expanded]){
								$($t).jqGrid("collapseRow",$t.p.data[pos]);
								$($t).jqGrid("collapseNode",$t.p.data[pos]);
							} else {
								$($t).jqGrid("expandRow",$t.p.data[pos]);
								$($t).jqGrid("expandNode",$t.p.data[pos]);
							}
						}
						return false;
					});
				if($t.p.ExpandColClick === true) {
					$($t.rows[i].cells[expCol])
						.find("span.cell-wrapper")
						.css("cursor","pointer")
						.on("click",function(e) {
							var target = e.target || e.srcElement,
							ind2 =$.jgrid.stripPref($t.p.idPrefix,$(target,$t.rows).closest("tr.jqgrow")[0].id),
							pos = $t.p._index[ind2];
							if(!$t.p.data[pos][isLeaf]){
								if($t.p.data[pos][expanded]){
									$($t).jqGrid("collapseRow",$t.p.data[pos]);
									$($t).jqGrid("collapseNode",$t.p.data[pos]);
								} else {
									$($t).jqGrid("expandRow",$t.p.data[pos]);
									$($t).jqGrid("expandNode",$t.p.data[pos]);
								}
							}
							$($t).jqGrid("setSelection",ind2);
							return false;
						});
				}
				i++;
			}
			$($t).triggerHandler("jqGridAfterSetTreeNode", [index, len]);			
			if($.isFunction($t.p.afterSetTreeNode)) {
				$t.p.afterSetTreeNode.call($t, index, len);
			}
		});
	},
	setTreeGrid : function() {
		return this.each(function (){
			var $t = this, i=0, pico, ecol = false, nm, key, tkey, dupcols=[],
			classes = $.jgrid.styleUI[($t.p.styleUI || 'jQueryUI')].treegrid;
			if(!$t.p.treeGrid) {return;}
			if(!$t.p.treedatatype ) {$.extend($t.p,{treedatatype: $t.p.datatype});}
			if($t.p.loadonce) { $t.p.treedatatype = 'local'; }
			$t.p.subGrid = false;$t.p.altRows =false;
			//bvn
			if (!$t.p.treeGrid_bigData) { 
				$t.p.pgbuttons = false;
				$t.p.pginput = false;
				$t.p.rowList = [];
			}
			$t.p.gridview =  true;
			//bvn
			if($t.p.rowTotal === null && !$t.p.treeGrid_bigData ) { $t.p.rowNum = 10000; }
			$t.p.multiselect = false;
			// $t.p.rowList = [];
			$t.p.expColInd = 0;
			pico = classes.icon_plus;
			if($t.p.styleUI === 'jQueryUI') {
				pico += ($t.p.direction==="rtl" ? 'w' : 'e');
			}
			$t.p.treeIcons = $.extend({plus:pico, minus: classes.icon_minus, leaf: classes.icon_leaf},$t.p.treeIcons || {});
			if($t.p.treeGridModel === 'nested') {
				$t.p.treeReader = $.extend({
					level_field: "level",
					left_field:"lft",
					right_field: "rgt",
					leaf_field: "isLeaf",
					expanded_field: "expanded",
					loaded: "loaded",
					icon_field: "icon"
				},$t.p.treeReader);
			} else if($t.p.treeGridModel === 'adjacency') {
				$t.p.treeReader = $.extend({
					level_field: "level",
					parent_id_field: "parent",
					leaf_field: "isLeaf",
					expanded_field: "expanded",
					loaded: "loaded",
					icon_field: "icon"
				},$t.p.treeReader );
			}
			for ( key in $t.p.colModel){
				if($t.p.colModel.hasOwnProperty(key)) {
					nm = $t.p.colModel[key].name;
					if( nm === $t.p.ExpandColumn && !ecol ) {
						ecol = true;
						$t.p.expColInd = i;
					}
					i++;
					//
					if( nm === $t.p.treeReader.level_field || nm === $t.p.treeReader.left_field || nm === $t.p.treeReader.right_field) {
						$t.p.colModel[key].sorttype = "integer";
					}
					for(tkey in $t.p.treeReader) {
						if($t.p.treeReader.hasOwnProperty(tkey) && $t.p.treeReader[tkey] === nm) {
							dupcols.push(nm);
						}
					}
				}
			}
			$.each($t.p.treeReader,function(j,n){
				if(n && $.inArray(n, dupcols) === -1){
					if(j==='leaf_field') { $t.p._treeleafpos= i; }
				i++;
					$t.p.colNames.push(n);
					$t.p.colModel.push({name:n,width:1,hidden:true,sortable:false,resizable:false,hidedlg:true,editable:true,search:false});
				}
			});			
		});
	},
	expandRow: function (record){
		this.each(function(){
			var $t = this;
			//bvn
			if (!$t.p.treeGrid_bigData) {
				var $rootpages = $t.p.lastpage;
			}
			if(!$t.grid || !$t.p.treeGrid) {return;}
			var childern = $($t).jqGrid("getNodeChildren",record),
			//if ($($t).jqGrid("isVisibleNode",record)) {
			expanded = $t.p.treeReader.expanded_field,
			rowid  = record[$t.p.localReader.id],
			ret = $($t).triggerHandler("jqGridBeforeExpandTreeGridRow", [rowid, record, childern]);
			if(ret === undefined ) {
				ret = true;
			}
			if(ret && $.isFunction($t.p.beforeExpandTreeGridRow)) {
				ret =  $t.p.beforeExpandTreeGridRow.call($t, rowid, record, childern);
			}
			if( ret === false ) { return; }
			$(childern).each(function(){
				var id  = $t.p.idPrefix + $.jgrid.getAccessor(this,$t.p.localReader.id);
				$($($t).jqGrid('getGridRowById', id)).css("display","");
				if(this[expanded]) {
					$($t).jqGrid("expandRow",this);
				}
			});
			$($t).triggerHandler("jqGridAfterExpandTreeGridRow", [rowid, record, childern]);
			if($.isFunction($t.p.afterExpandTreeGridRow)) {
				$t.p.afterExpandTreeGridRow.call($t, rowid, record, childern);
			}
			//bvn
			if (!$t.p.treeGrid_bigData) {
				$t.p.lastpage = $rootpages;
			}
			//}
		});
	},
	collapseRow : function (record) {
		this.each(function(){
			var $t = this;
			if(!$t.grid || !$t.p.treeGrid) {return;}
			var childern = $($t).jqGrid("getNodeChildren",record),
			expanded = $t.p.treeReader.expanded_field,
			rowid  = record[$t.p.localReader.id],
			ret = $($t).triggerHandler("jqGridBeforeCollapseTreeGridRow", [rowid, record, childern]);
			if(ret === undefined ) {
				ret = true;
			}			
			if(ret &&  $.isFunction($t.p.beforeCollapseTreeGridRow)) { 
				ret = $t.p.beforeCollapseTreeGridRow.call($t, rowid, record, childern);
			}
			if( ret === false ) { return; }
			$(childern).each(function(){
				var id  = $t.p.idPrefix + $.jgrid.getAccessor(this,$t.p.localReader.id);
				$($($t).jqGrid('getGridRowById', id)).css("display","none");
				if(this[expanded]){
					$($t).jqGrid("collapseRow",this);
				}
			});
			$($t).triggerHandler("jqGridAfterCollapseTreeGridRow", [rowid, record, childern]);
			if($.isFunction($t.p.afterCollapseTreeGridRow)) {
				$t.p.afterCollapseTreeGridRow.call($t, rowid, record, childern);
			}			
		});
	},
	// NS ,adjacency models
	getRootNodes : function() {
		var result = [];
		this.each(function(){
			var $t = this, level, parent_id, view = $t.p.data;
			if(!$t.grid || !$t.p.treeGrid) {return;}

			switch ($t.p.treeGridModel) {
				case 'nested' :
					level = $t.p.treeReader.level_field;
					$(view).each(function() {
						if(parseInt(this[level],10) === parseInt($t.p.tree_root_level,10)) {
							result.push(this);
						}
					});
					break;
				case 'adjacency' :
					parent_id = $t.p.treeReader.parent_id_field;
					$(view).each(function(){
						if(this[parent_id] === null || String(this[parent_id]).toLowerCase() === "null") {
							result.push(this);
						}
					});
					break;
			}
		});
		return result;
	},
	getNodeDepth : function(rc) {
		var ret = null;
		this.each(function(){
			if(!this.grid || !this.p.treeGrid) {return;}
			var $t = this;
			switch ($t.p.treeGridModel) {
				case 'nested' :
					var level = $t.p.treeReader.level_field;
					ret = parseInt(rc[level],10) - parseInt($t.p.tree_root_level,10);
					break;
				case 'adjacency' :
					ret = $($t).jqGrid("getNodeAncestors",rc).length;
					break;
			}
		});
		return ret;
	},
	getNodeParent : function(rc) {
		var result = null;
		this.each(function(){
			var $t = this;
			if(!$t.grid || !$t.p.treeGrid) {return;}
			switch ($t.p.treeGridModel) {
				case 'nested' :
					var lftc = $t.p.treeReader.left_field,
					rgtc = $t.p.treeReader.right_field,
					levelc = $t.p.treeReader.level_field,
					lft = parseInt(rc[lftc],10), rgt = parseInt(rc[rgtc],10), level = parseInt(rc[levelc],10);
					$(this.p.data).each(function(){
						if(parseInt(this[levelc],10) === level-1 && parseInt(this[lftc],10) < lft && parseInt(this[rgtc],10) > rgt) {
							result = this;
							return false;
						}
					});
					break;
				case 'adjacency' :
					var parent_id = $t.p.treeReader.parent_id_field,
					dtid = $t.p.localReader.id,
					ind = rc[dtid], pos = $t.p._index[ind];
					while(pos--) {
						if( String( $t.p.data[pos][dtid]) === String( $.jgrid.stripPref($t.p.idPrefix, rc[parent_id]) ) ) {
							result = $t.p.data[pos];
							break;
						}
					}
					break;
			}
		});
		return result;
	},
	getNodeChildren : function(rc ) {
		var result = [];
		this.each(function(){
			var $t = this;
			if(!$t.grid || !$t.p.treeGrid) {return;}
			var i, len = this.p.data.length, row;
			switch ($t.p.treeGridModel) {
				case 'nested' :
					var lftc = $t.p.treeReader.left_field,
					rgtc = $t.p.treeReader.right_field,
					levelc = $t.p.treeReader.level_field,
					lft = parseInt(rc[lftc],10), rgt = parseInt(rc[rgtc],10), level = parseInt(rc[levelc],10);
					for(i=0; i  < len; i++) {
						row = $t.p.data[i];
						if(row && parseInt(row[levelc],10) === level+1 && parseInt(row[lftc],10) > lft && parseInt(row[rgtc],10) < rgt) {
							result.push(row);
						}
					}
					break;
				case 'adjacency' :
					var parent_id = $t.p.treeReader.parent_id_field,
					dtid = $t.p.localReader.id;
					for(i=0; i  < len; i++) {
						row = $t.p.data[i];
						if(row && String(row[parent_id]) === String( $.jgrid.stripPref($t.p.idPrefix, rc[dtid]) ) ) {
							result.push(row);
						}
					}
					break;
			}
		});
		return result;
	},
	getFullTreeNode : function(rc, expand) {
		var result = [];
		this.each(function(){
			var $t = this, len,expanded = $t.p.treeReader.expanded_field;
			if(!$t.grid || !$t.p.treeGrid) {return;}
			if(expand == null || typeof expand !== 'boolean') {
				expand = false;
			}
			switch ($t.p.treeGridModel) {
				case 'nested' :
					var lftc = $t.p.treeReader.left_field,
					rgtc = $t.p.treeReader.right_field,
					levelc = $t.p.treeReader.level_field,
					lft = parseInt(rc[lftc],10), rgt = parseInt(rc[rgtc],10), level = parseInt(rc[levelc],10);
					$(this.p.data).each(function(){
						if(parseInt(this[levelc],10) >= level && parseInt(this[lftc],10) >= lft && parseInt(this[lftc],10) <= rgt) {
							if(expand) { this[expanded] = true; }
							result.push(this);
						}
					});
					break;
				case 'adjacency' :
					if(rc) {
						result.push(rc);
						var parent_id = $t.p.treeReader.parent_id_field,
						dtid = $t.p.localReader.id;
						$(this.p.data).each(function(i){
							len = result.length;
							for (i = 0; i < len; i++) {
								if ( String( $.jgrid.stripPref($t.p.idPrefix, result[i][dtid]) ) === String( this[parent_id] ) ) {
									if(expand) { this[expanded] = true; }
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
	getNodeAncestors : function(rc, reverse, expanded) {
		var ancestors = [];
		if(reverse === undefined ) {
			reverse = false;
		}
		this.each(function(){
			if(!this.grid || !this.p.treeGrid) {return;}
			if(expanded === undefined ) {
				expanded = false;
			} else {
				expanded = this.p.treeReader.expanded_field;
			}
			var parent = $(this).jqGrid("getNodeParent",rc);
			while (parent) {
				if(expanded) {
					try{
						parent[expanded] = true;
					} catch (etn) {}
				}
				if(reverse) {
					ancestors.unshift(parent);
				} else {
					ancestors.push(parent);
				}
				parent = $(this).jqGrid("getNodeParent",parent);	
			}
		});
		return ancestors;
	},
	isVisibleNode : function(rc) {
		var result = true;
		this.each(function(){
			var $t = this;
			if(!$t.grid || !$t.p.treeGrid) {return;}
			var ancestors = $($t).jqGrid("getNodeAncestors",rc),
			expanded = $t.p.treeReader.expanded_field;
			$(ancestors).each(function(){
				result = result && this[expanded];
				if(!result) {return false;}
			});
		});
		return result;
	},
	isNodeLoaded : function(rc) {
		var result;
		this.each(function(){
			var $t = this;
			if(!$t.grid || !$t.p.treeGrid) {return;}
			var isLeaf = $t.p.treeReader.leaf_field,
			loaded = $t.p.treeReader.loaded;
			if(rc !== undefined ) {
				if(rc[loaded] !== undefined) {
					result = rc[loaded];
				} else if( rc[isLeaf] || $($t).jqGrid("getNodeChildren",rc).length > 0){
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
	setLeaf : function (rc, state, collapsed) {
		return this.each(function(){
			var id = $.jgrid.getAccessor(rc,this.p.localReader.id),
			rc1 = $("#"+id,this.grid.bDiv)[0],
			isLeaf = this.p.treeReader.leaf_field;
			try {
				var dr = this.p._index[id];
				if(dr != null) {
					this.p.data[dr][isLeaf] = state;
				}
			} catch(E){}
			if(state === true) {
				// set it in data
				$("div.treeclick",rc1).removeClass(this.p.treeIcons.minus+" tree-minus "+this.p.treeIcons.plus+" tree-plus").addClass(this.p.treeIcons.leaf +" tree-leaf");
			} else if(state === false) {
				var ico = this.p.treeIcons.minus+" tree-minus";
				if(collapsed) {
					ico = this.p.treeIcons.plus+" tree-plus";
				}
				$("div.treeclick",rc1).removeClass(this.p.treeIcons.leaf +" tree-leaf").addClass( ico );
			}	
		});
	},
	reloadNode: function(rc, reloadcurrent) {
		return this.each(function(){
			if(!this.grid || !this.p.treeGrid) {return;}
			var rid = this.p.localReader.id,
			currselection  = this.p.selrow;

			$(this).jqGrid("delChildren", rc[rid]);

			if(reloadcurrent=== undefined) {
				reloadcurrent = false;
			}
			
			if(!reloadcurrent) {
				if(!jQuery._data( this, "events" ).jqGridAfterSetTreeNode) {
					$(this).on("jqGridAfterSetTreeNode.reloadNode", function(){
						var isLeaf = this.p.treeReader.leaf_field;
						if(this.p.reloadnode ) {
							var rc = this.p.reloadnode,
							chld = $(this).jqGrid('getNodeChildren', rc);
							if(rc[isLeaf] && chld.length) {
								$(this).jqGrid('setLeaf', rc, false);
							} else if(!rc[isLeaf] && chld.length === 0) {
								$(this).jqGrid('setLeaf', rc, true);
							}
						}
						this.p.reloadnode = false;
					});
				}
			}
			var expanded = this.p.treeReader.expanded_field,
			parent = this.p.treeReader.parent_id_field,
			loaded = this.p.treeReader.loaded,
			level = this.p.treeReader.level_field,
			isLeaf = this.p.treeReader.leaf_field,
			lft = this.p.treeReader.left_field,
			rgt = this.p.treeReader.right_field;

			var id = $.jgrid.getAccessor(rc,this.p.localReader.id),
			rc1 = $("#"+id,this.grid.bDiv)[0];

			rc[expanded] = true;
			if(!rc[isLeaf]) {
				$("div.treeclick",rc1).removeClass(this.p.treeIcons.plus+" tree-plus").addClass(this.p.treeIcons.minus+" tree-minus");
			}
			this.p.treeANode = rc1.rowIndex;
			this.p.datatype = this.p.treedatatype;
			this.p.reloadnode = rc;
			if(reloadcurrent) {
				this.p.treeANode = rc1.rowIndex > 0 ? rc1.rowIndex - 1 : 1;
				$(this).jqGrid('delRowData', id);
			}
			if(this.p.treeGridModel === 'nested') {
				$(this).jqGrid("setGridParam",{postData:{nodeid:id,n_left:rc[lft],n_right:rc[rgt],n_level:rc[level]}});
			} else {
				$(this).jqGrid("setGridParam",{postData:{nodeid:id,parentid:rc[parent],n_level:rc[level]}} );
			}
			$(this).trigger("reloadGrid");
			
			rc[loaded] = true;
			if(this.p.treeGridModel === 'nested') {
				$(this).jqGrid("setGridParam",{selrow: currselection, postData:{nodeid:'',n_left:'',n_right:'',n_level:''}});
			} else {
				$(this).jqGrid("setGridParam",{selrow: currselection, postData:{nodeid:'',parentid:'',n_level:''}});
			}
		});
	},
	expandNode : function(rc) {
		return this.each(function(){
			if(!this.grid || !this.p.treeGrid) {return;}
			var $t = this,
			expanded = this.p.treeReader.expanded_field,
			parent = this.p.treeReader.parent_id_field,
			loaded = this.p.treeReader.loaded,
			level = this.p.treeReader.level_field,
			lft = this.p.treeReader.left_field,
			rgt = this.p.treeReader.right_field;

			if(!rc[expanded]) {
				var id = $.jgrid.getAccessor(rc,this.p.localReader.id),
				rc1 = $("#" + this.p.idPrefix + $.jgrid.jqID(id),this.grid.bDiv)[0],
				position = this.p._index[id],
				ret = $($t).triggerHandler("jqGridBeforeExpandTreeGridNode", [id, rc]);
				if(ret === undefined ) {
					ret = true;
				}			
				if( ret && $.isFunction(this.p.beforeExpandTreeGridNode) ) {
					ret =  this.p.beforeExpandTreeGridNode.call(this, id, rc );
				}
				if( ret === false ) { return; }

				if( $(this).jqGrid("isNodeLoaded",this.p.data[position]) ) {
					rc[expanded] = true;
					$("div.treeclick",rc1).removeClass(this.p.treeIcons.plus+" tree-plus").addClass(this.p.treeIcons.minus+" tree-minus");
				} else if (!this.grid.hDiv.loading) {
					rc[expanded] = true;
					$("div.treeclick",rc1).removeClass(this.p.treeIcons.plus+" tree-plus").addClass(this.p.treeIcons.minus+" tree-minus");
					this.p.treeANode = rc1.rowIndex;
					this.p.datatype = this.p.treedatatype;
					if(this.p.treeGridModel === 'nested') {
						$(this).jqGrid("setGridParam",{postData:{nodeid:id,n_left:rc[lft],n_right:rc[rgt],n_level:rc[level]}});
					} else {
						$(this).jqGrid("setGridParam",{postData:{nodeid:id,parentid:rc[parent],n_level:rc[level]}} );
					}
					$(this).trigger("reloadGrid");
					rc[loaded] = true;
					if(this.p.treeGridModel === 'nested') {
						$(this).jqGrid("setGridParam",{postData:{nodeid:'',n_left:'',n_right:'',n_level:''}});
					} else {
						$(this).jqGrid("setGridParam",{postData:{nodeid:'',parentid:'',n_level:''}}); 
					}
				}
				$($t).triggerHandler("jqGridAfterExpandTreeGridNode", [id, rc]);
				if($.isFunction(this.p.afterExpandTreeGridNode)) {
					this.p.afterExpandTreeGridNode.call(this, id, rc );
				}
			}
		});
	},
	collapseNode : function(rc) {
		return this.each(function(){
			if(!this.grid || !this.p.treeGrid) {return;}
			var expanded = this.p.treeReader.expanded_field,
			$t = this;
			if(rc[expanded]) {
				var id = $.jgrid.getAccessor(rc,this.p.localReader.id),
				rc1 = $("#" + this.p.idPrefix + $.jgrid.jqID(id),this.grid.bDiv)[0],
				ret = $($t).triggerHandler("jqGridBeforeCollapseTreeGridNode", [id, rc]);
				if(ret === undefined ) {
					ret = true;
				}			
				if( ret &&  $.isFunction(this.p.beforeCollapseTreeGridNode) ) {
					ret = this.p.beforeCollapseTreeGridNode.call(this, id, rc );
				}
				rc[expanded] = false;
				if( ret === false ) { return; }
				$("div.treeclick",rc1).removeClass(this.p.treeIcons.minus+" tree-minus").addClass(this.p.treeIcons.plus+" tree-plus");
				$($t).triggerHandler("jqGridAfterCollapseTreeGridNode", [id, rc]);
				if($.isFunction(this.p.afterCollapseTreeGridNode)) {
					this.p.afterCollapseTreeGridNode.call(this, id, rc );
				}
			}
		});
	},
	SortTree : function( sortname, newDir, st, datefmt) {
		return this.each(function(){
			if(!this.grid || !this.p.treeGrid) {return;}
			var i, len,
			rec, records = [], $t = this, query, roots,
			rt = $(this).jqGrid("getRootNodes", $t.p.search);
			// Sorting roots
			query = $.jgrid.from.call(this, rt);
			// sort tree by node type
			if( Boolean($t.p.sortTreeByNodeType)) {
				var ord = ($t.p.sortTreeNodeOrder && $t.p.sortTreeNodeOrder.toLowerCase() === 'desc') ? 'd' : 'a'; 
				query.orderBy($t.p.treeReader.leaf_field, ord, st, datefmt);
			}
			query.orderBy(sortname, newDir, st, datefmt);
			roots = query.select();
			// Sorting children
			for (i = 0, len = roots.length; i < len; i++) {
				rec = roots[i];
				records.push(rec);
				$(this).jqGrid("collectChildrenSortTree",records, rec, sortname, newDir, st, datefmt);
			}
			var ids = $(this).jqGrid("getDataIDs"), j=1;
			$.each(records, function(index) {
				var id  = $.jgrid.getAccessor(this, $t.p.localReader.id);
				if($.inArray(id, ids) !== -1) {
					$('#'+$.jgrid.jqID($t.p.id)+ ' tbody tr:eq('+(j)+')').after($('#'+$.jgrid.jqID($t.p.id)+' tbody tr#'+$.jgrid.jqID(id)));
					j++;
				}
			});
			query = null;roots=null;records=null;
		});
	},
	searchTree : function ( recs ) {
		var n = recs.length || 0, ancestors=[], lid, roots=[], result=[],tid, alen, rlen, j, k, i;
		this.each(function(){
			if(!this.grid || !this.p.treeGrid) {
				return;
			}
			if(n) {
				lid = this.p.localReader.id;
				//while( i-- ) { // reverse 
				for( i=0; i<n; i++ ) {
					ancestors = $(this).jqGrid('getNodeAncestors', recs[i], true, true);
					//add the searched item
					if( Boolean(this.p.FullTreeSearchResult) ) {
						var fnode = $(this).jqGrid('getFullTreeNode', recs[i], true);
						ancestors = ancestors.concat(fnode);
					} else {
						ancestors.push(recs[i]);
					}
					tid = ancestors[0][lid]; 
					if($.inArray(tid, roots ) !== -1) { // ignore repeated, but add missing
						for( j = 0, alen = ancestors.length; j < alen; j++) {
							//$.inArray ?!?
							var found = false;
							for( k=0, rlen = result.length; k < rlen; k++) {
								if(ancestors[j][lid] === result[k][lid]) {
									found = true;
									break;
								}
							}
							if(!found) {
								result.push(ancestors[j]);
							}
						}
							continue;
					} else {
						roots.push( tid );
					}
					result = result.concat( ancestors );
				}	
			}
		});
		return result;
	},
	collectChildrenSortTree : function(records, rec, sortname, newDir,st, datefmt) {
		return this.each(function(){
			if(!this.grid || !this.p.treeGrid) {return;}
			var i, len,
			child, ch, query, children;
			ch = $(this).jqGrid("getNodeChildren",rec, this.p.search);
			query = $.jgrid.from.call(this, ch);
			query.orderBy(sortname, newDir, st, datefmt);
			children = query.select();
			for (i = 0, len = children.length; i < len; i++) {
				child = children[i];
				records.push(child);
				$(this).jqGrid("collectChildrenSortTree",records, child, sortname, newDir, st, datefmt); 
			}
		});
	},
	// experimental 
	setTreeRow : function(rowid, data) {
		var success=false;
		this.each(function(){
			var t = this;
			if(!t.grid || !t.p.treeGrid) {return;}
			success = $(t).jqGrid("setRowData", rowid, data);
		});
		return success;
	},
	delTreeNode : function (rowid) {
		return this.each(function () {
			var $t = this, rid = $t.p.localReader.id, i,
			left = $t.p.treeReader.left_field,
			right = $t.p.treeReader.right_field, myright, width, res, key;
			if(!$t.grid || !$t.p.treeGrid) {return;}
			rowid = $.jgrid.stripPref($t.p.idPrefix, rowid);
			var rc = $t.p._index[rowid];
			if (rc !== undefined) {
				// nested
				myright = parseInt($t.p.data[rc][right],10);
				width = myright -  parseInt($t.p.data[rc][left],10) + 1;
				var dr = $($t).jqGrid("getFullTreeNode",$t.p.data[rc]);
				if(dr.length>0){
					for (i=0;i<dr.length;i++){
						$($t).jqGrid("delRowData", $t.p.idPrefix + dr[i][rid]);
					}
				}
				if( $t.p.treeGridModel === "nested") {
					// ToDo - update grid data
					res = $.jgrid.from.call($t, $t.p.data)
						.greater(left,myright,{stype:'integer'})
						.select();
					if(res.length) {
						for( key in res) {
							if(res.hasOwnProperty(key)) {
								res[key][left] = parseInt(res[key][left],10) - width ;
							}
						}
					}
					res = $.jgrid.from.call($t, $t.p.data)
						.greater(right,myright,{stype:'integer'})
						.select();
					if(res.length) {
						for( key in res) {
							if(res.hasOwnProperty(key)) {
								res[key][right] = parseInt(res[key][right],10) - width ;
							}
						}
					}
				}
			}
		});
	},
	delChildren : function (rowid) {
		return this.each(function () {
			var $t = this, rid = $t.p.localReader.id,
			left = $t.p.treeReader.left_field,
			right = $t.p.treeReader.right_field, myright, width, res, key;
			if(!$t.grid || !$t.p.treeGrid) {return;}
			rowid = $.jgrid.stripPref($t.p.idPrefix, rowid);
			var rc = $t.p._index[rowid];
			if (rc !== undefined) {
				// nested
				myright = parseInt($t.p.data[rc][right],10);
				width = myright -  parseInt($t.p.data[rc][left],10) + 1;
				var dr = $($t).jqGrid("getFullTreeNode",$t.p.data[rc]);
				if(dr.length>0){
					for (var i=0;i<dr.length;i++){
						if(dr[i][rid] !== rowid)
							$($t).jqGrid("delRowData", $t.p.idPrefix + dr[i][rid]);
					}
				}
				if( $t.p.treeGridModel === "nested") {
					// ToDo - update grid data
					res = $.jgrid.from($t.p.data)
						.greater(left,myright,{stype:'integer'})
						.select();
					if(res.length) {
						for( key in res) {
							if(res.hasOwnProperty(key)) {
								res[key][left] = parseInt(res[key][left],10) - width ;
							}
						}
					}
					res = $.jgrid.from($t.p.data)
						.greater(right,myright,{stype:'integer'})
						.select();
					if(res.length) {
						for( key in res) {
							if(res.hasOwnProperty(key)) {
								res[key][right] = parseInt(res[key][right],10) - width ;
							}
						}
					}
				}
			}
		});
	},
	addChildNode : function( nodeid, parentid, data, expandData ) {
		//return this.each(function(){
		var $t = this[0];
		if(data) {
			// we suppose tha the id is autoincremet and
			var expanded = $t.p.treeReader.expanded_field,
			isLeaf = $t.p.treeReader.leaf_field,
			level = $t.p.treeReader.level_field,
			//icon = $t.p.treeReader.icon_field,
			parent = $t.p.treeReader.parent_id_field,
			left = $t.p.treeReader.left_field,
			right = $t.p.treeReader.right_field,
			loaded = $t.p.treeReader.loaded,
			method, parentindex, parentdata, parentlevel, i, len, max=0, rowind = parentid, leaf, maxright;
			if(expandData===undefined) {expandData = false;}
			if ( nodeid == null ) {
				i = $t.p.data.length-1;
				if(	i>= 0 ) {
					while(i>=0){max = Math.max(max, parseInt($t.p.data[i][$t.p.localReader.id],10)); i--;}
				}
				nodeid = max+1;
			}
			var prow = $($t).jqGrid('getInd', parentid);
			leaf = false;
			// if not a parent we assume root
			if ( parentid === undefined  || parentid === null || parentid==="") {
				parentid = null;
				rowind = null;
				method = 'last';
				parentlevel = $t.p.tree_root_level;
				i = $t.p.data.length+1;
			} else {
				method = 'after';
				var mid = $.jgrid.stripPref($t.p.idPrefix, parentid);
				parentindex = $t.p._index[mid];
				parentdata = $t.p.data[parentindex];
				parentid = parentdata[$t.p.localReader.id];
				parentlevel = parseInt(parentdata[level],10)+1;
				var childs = $($t).jqGrid('getFullTreeNode', parentdata);
				// if there are child nodes get the last index of it
				if(childs.length) {
					i = childs[childs.length-1][$t.p.localReader.id];
					rowind = i;
					i = $($t).jqGrid('getInd',  $t.p.idPrefix + rowind);
				} else {
					i = $($t).jqGrid('getInd',  $t.p.idPrefix + parentid);
				}
				// if the node is leaf
				if(parentdata[isLeaf]) {
					leaf = true;
					parentdata[expanded] = true;
					//var prow = $($t).jqGrid('getInd', parentid);
					$($t.rows[prow])
						.find("span.cell-wrapperleaf").removeClass("cell-wrapperleaf").addClass("cell-wrapper")
						.end()
						.find("div.tree-leaf").removeClass($t.p.treeIcons.leaf+" tree-leaf").addClass($t.p.treeIcons.minus+" tree-minus");
					$t.p.data[parentindex][isLeaf] = false;
					parentdata[loaded] = true;
				}
				// incremet th index of child to be inserted
				if( i === false ) {
					throw "Parent item with id: " + rowind + " ("+ parentid+") can't be found";
					return;
				} else {
					i++;
				}
			}
			len = i+1;

			if( data[expanded]===undefined)  {data[expanded]= false;}
			if( data[loaded]===undefined )  { data[loaded] = false;}
			data[level] = parentlevel;
			if( data[isLeaf]===undefined) {data[isLeaf]= true;}
			if( $t.p.treeGridModel === "adjacency") {
				data[parent] = parentid;
			}
			if( $t.p.treeGridModel === "nested") {
				// this method requiere more attention
				var query, res, key;
				//maxright = parseInt(maxright,10);
				// ToDo - update grid data
				if(parentid !== null) {
					maxright = parseInt(parentdata[right],10);
					query = $.jgrid.from.call($t, $t.p.data);
					query = query.greaterOrEquals(right,maxright,{stype:'integer'});
					res = query.select();
					if(res.length) {
						for( key in res) {
							if(res.hasOwnProperty(key)) {
								res[key][left] = res[key][left] > maxright ? parseInt(res[key][left],10) +2 : res[key][left];
								res[key][right] = res[key][right] >= maxright ? parseInt(res[key][right],10) +2 : res[key][right];
							}
						}
					}
					data[left] = maxright;
					data[right]= maxright+1;
				} else {
					maxright = parseInt( $($t).jqGrid('getCol', right, false, 'max'), 10);
					res = $.jgrid.from.call($t, $t.p.data)
						.greater(left,maxright,{stype:'integer'})
						.select();
					if(res.length) {
						for( key in res) {
							if(res.hasOwnProperty(key)) {
								res[key][left] = parseInt(res[key][left],10) +2 ;
							}
						}
					}
					res = $.jgrid.from.call($t, $t.p.data)
						.greater(right,maxright,{stype:'integer'})
						.select();
					if(res.length) {
						for( key in res) {
							if(res.hasOwnProperty(key)) {
								res[key][right] = parseInt(res[key][right],10) +2 ;
							}
						}
					}
					data[left] = maxright+1;
					data[right] = maxright + 2;
				}
			}
			if( parentid === null || $($t).jqGrid("isNodeLoaded",parentdata) || leaf ) {
					$($t).jqGrid('addRowData', nodeid, data, method, $t.p.idPrefix + rowind);
					$($t).jqGrid('setTreeNode', i, len);
			}
			if(parentdata && !parentdata[expanded] && expandData) {
				$($t.rows[prow])
					.find("div.treeclick")
					.click();
			}
		}
		//});
	}
});
//module end
}));
