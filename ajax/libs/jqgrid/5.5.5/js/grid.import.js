/*jshint eqeqeq:false, eqnull:true, devel:true */
/*global jQuery, define, URL */
(function( factory ) {
	"use strict";
	if ( typeof define === "function" && define.amd ) {
		// AMD. Register as an anonymous module.
		define([
			"jquery",
			"./grid.utils",
			"./grid.base"
		], factory );
	} else {
		// Browser globals
		factory( jQuery );
	}
}(function( $ ) {
"use strict";
//module begin
$.jgrid = $.jgrid || {};
$.extend($.jgrid,{
	saveState : function ( jqGridId, o ) {
		o = $.extend({
			useStorage : true,
			storageType : "localStorage", // localStorage or sessionStorage
			beforeSetItem : null,
			compression: false,
			compressionModule :  'LZString', // object by example gzip, LZString
			compressionMethod : 'compressToUTF16', // string by example zip, compressToUTF16
			debug : false,
			saveData : true
		}, o || {});
		if(!jqGridId) { return; }
		var gridstate = "", data = "", ret, $t = $("#"+jqGridId)[0], tmp;
		// to use navigator set storeNavOptions to true in grid options
		if(!$t.grid) { return;}
		tmp = $($t).data('inlineNav');
		if(tmp && $t.p.inlineNav) {
			$($t).jqGrid('setGridParam',{_iN: tmp});
		}
		tmp = $($t).data('filterToolbar');
		if(tmp && $t.p.filterToolbar) {
			$($t).jqGrid('setGridParam',{_fT: tmp});
		}
		gridstate  =  $($t).jqGrid('jqGridExport', { exptype : "jsonstring", ident:"", root:"", data : o.saveData });
		data = '';
		if( o.saveData ) {
			data = $($t.grid.bDiv).find(".ui-jqgrid-btable tbody").first().html();
			var firstrow  = data.indexOf("</tr>");
			data = data.slice(firstrow + 5);
		}
		if($.jgrid.isFunction(o.beforeSetItem)) {
			ret = o.beforeSetItem.call($t, gridstate);
			if(ret != null) {
				gridstate = ret;
			}
		}
		if(o.debug) {
			$("#gbox_tree").prepend('<a id="link_save" target="_blank" download="jqGrid_dump.txt">Click to save Dump Data</a>');
			var temp = [], file, properties = {}, url;
			temp.push("Grid Options\n");
			temp.push(gridstate);
			temp.push("\n");
			temp.push("GridData\n");
			temp.push(data);
			properties.type = 'plain/text;charset=utf-8'; // Specify the file's mime-type.
			try {
				file = new File(temp, "jqGrid_dump.txt", properties);
			} catch (e) {
				file = new Blob(temp, properties);
			}
			url = URL.createObjectURL(file);
			$("#link_save").attr("href",url).on('click',function(){
				$(this).remove();
			});
		}
		if(o.compression) {
			if(o.compressionModule) {
				try {
					ret = window[o.compressionModule][o.compressionMethod](gridstate);
					if(ret != null) {
						gridstate = ret;
						data = window[o.compressionModule][o.compressionMethod](data);
					}
				} catch (e) {
					// can not execute a compression.
				}
			}
		}
		if(o.useStorage && $.jgrid.isLocalStorage()) {
			try {
				window[o.storageType].setItem("jqGrid"+$t.p.id, gridstate);
				window[o.storageType].setItem("jqGrid"+$t.p.id+"_data", data);
			} catch (e) {
				if(e.code === 22) { // chrome is 21
					// just for now. we should make some additionla changes and eventually clear some local items
					alert("Local storage limit is over!");
				}
			}
		}
		return gridstate;
	},
	loadState : function (jqGridId, gridstring, o) {
		o = $.extend({
			useStorage : true,
			storageType : "localStorage",
			clearAfterLoad: false,  // clears the jqGrid localStorage items aftre load
			beforeSetGrid : null,
			afterSetGrid : null,
			decompression: false,
			decompressionModule :  'LZString', // object by example gzip, LZString
			decompressionMethod : 'decompressFromUTF16', // string by example unzip, decompressFromUTF16
			restoreData : true
		}, o || {});
		if(!jqGridId) { return; }
		var ret, tmp, $t = $("#"+jqGridId)[0], data, iN, fT;
		if(o.useStorage) {
			try {
				gridstring = window[o.storageType].getItem("jqGrid"+$t.id);
				data = window[o.storageType].getItem("jqGrid"+$t.id+"_data");
			} catch (e) {
				// can not get data
			}
		}
		if(!gridstring) { return; }
		if(o.decompression) {
			if(o.decompressionModule) {
			try {
					ret = window[o.decompressionModule][o.decompressionMethod]( gridstring );
					if(ret != null ) {
						gridstring = ret;
						data = window[o.decompressionModule][o.decompressionMethod]( data );
					}
				} catch (e) {
					// decompression can not be done
				}
			}
		}
		ret = $.jgrid.parseFunc( gridstring );
		if( ret && $.jgrid.type(ret) === 'object') {
			if($t.grid) {
				$.jgrid.gridUnload( jqGridId );
			}
			if($.jgrid.isFunction(o.beforeSetGrid)) {
				tmp = o.beforeSetGrid( ret );
				if(tmp && $.jgrid.type(tmp) === 'object') {
					ret = tmp;
				}
			}
			// some preparings
			var retfunc = function( param ) { var p; p = param; return p;},
			prm = {
				"reccount" : ret.reccount,
				"records" : ret.records,
				"lastpage" : ret.lastpage,
				"shrinkToFit" : retfunc( ret.shrinkToFit),
				"data": retfunc(ret.data),
				"datatype" : retfunc(ret.datatype),
				"grouping" : retfunc(ret.grouping)
			};
			ret.shrinkToFit = false;
			ret.data = [];
			ret.datatype = 'local';
			ret.grouping = false;
			//ret.navGrid = false;

			if(ret.inlineNav) {
				iN = retfunc( ret._iN );
				ret._iN = null; delete ret._iN;
			}
			if(ret.filterToolbar) {
				fT = retfunc( ret._fT );
				ret._fT = null; delete ret._fT;
			}
			var grid = $("#"+jqGridId).jqGrid( ret );
			grid.jqGrid('delRowData','norecs');
			if( o.restoreData && $.jgrid.trim( data ) !== '') {
				grid.append( data );
			}
			grid.jqGrid( 'setGridParam', prm);
			if(ret.storeNavOptions && ret.navGrid) {
				// set to false so that nav grid can be run
				grid[0].p.navGrid = false;
				grid.jqGrid('navGrid', ret.pager, ret.navOptions, ret.editOptions, ret.addOptions, ret.delOptions, ret.searchOptions, ret.viewOptions);
				if(ret.navButtons && ret.navButtons.length) {
					for(var b = 0; b < ret.navButtons.length; b++) {
						if( 'sepclass'  in ret.navButtons[b][1]) {
							grid.jqGrid('navSeparatorAdd', ret.navButtons[b][0], ret.navButtons[b][1]);
						} else {
							grid.jqGrid('navButtonAdd', ret.navButtons[b][0], ret.navButtons[b][1]);
						}
					}
				}
			}
			// refresh index
			grid[0].refreshIndex();
			// subgrid
			if(ret.subGrid) {
				var ms = ret.multiselect === 1 ? 1 : 0,
					rn = ret.rownumbers === true ? 1 :0;
				grid.jqGrid('addSubGrid', ms + rn);
				// reopen the sugrid in order to maintain the subgrid state.
				// currently only one level is supported
				// todo : supposrt for unlimited  levels
				$.each(grid[0].rows, function(i, srow){
					if( $(srow).hasClass('ui-sg-expanded') ) {
						// reopen the subgrid
						$(grid[0].rows[i-1]).find('td.sgexpanded').click().click();
					}
				});
			}
			// treegrid
			if(ret.treeGrid) {
				var i = 1, len = grid[0].rows.length,
				expCol = ret.expColInd,
				isLeaf = ret.treeReader.leaf_field,
				expanded = ret.treeReader.expanded_field;
				// optimization of code needed here
				while(i<len) {
					$(grid[0].rows[i].cells[expCol])
						.find("div.treeclick")
						.on("click",function(e){
							var target = e.target || e.srcElement,
							ind2 =$.jgrid.stripPref(ret.idPrefix,$(target,grid[0].rows).closest("tr.jqgrow")[0].id),
							pos = grid[0].p._index[ind2];
							if(!grid[0].p.data[pos][isLeaf]){
								if(grid[0].p.data[pos][expanded]){
									grid.jqGrid("collapseRow",grid[0].p.data[pos]);
									grid.jqGrid("collapseNode",grid[0].p.data[pos]);
								} else {
									grid.jqGrid("expandRow",grid[0].p.data[pos]);
									grid.jqGrid("expandNode",grid[0].p.data[pos]);
								}
							}
							return false;
						});
					if(ret.ExpandColClick === true) {
						$(grid[0].rows[i].cells[expCol])
							.find("span.cell-wrapper")
							.css("cursor","pointer")
							.on("click",function(e) {
								var target = e.target || e.srcElement,
								ind2 =$.jgrid.stripPref(ret.idPrefix,$(target,grid[0].rows).closest("tr.jqgrow")[0].id),
								pos = grid[0].p._index[ind2];
								if(!grid[0].p.data[pos][isLeaf]){
									if(grid[0].p.data[pos][expanded]){
										grid.jqGrid("collapseRow", grid[0].p.data[pos]);
										grid.jqGrid("collapseNode", grid[0].p.data[pos]);
									} else {
										grid.jqGrid("expandRow", grid[0].p.data[pos]);
										grid.jqGrid("expandNode", grid[0].p.data[pos]);
									}
								}
								grid.jqGrid("setSelection",ind2);
								return false;
						});
					}
					i++;
				}
			}
			// multiselect
			if(ret.multiselect) {
				$.each(ret.selarrrow, function(){
					$("#jqg_" + jqGridId + "_"+this)[ret.useProp ? 'prop': 'attr']("checked", "checked");
				});
			}
			// grouping
			if(grid.jqGrid('isGroupHeaderOn')) {
				grid.jqGrid('refreshGroupHeaders');
			}
			// pivotgrid
			// 
			// inline navigator
			if(ret.inlineNav && iN) {
				grid.jqGrid('setGridParam', { inlineNav:false });
				grid.jqGrid('inlineNav', ret.pager, iN);
			}
			// toolbar filter
			if(ret.filterToolbar && fT) {
				grid.jqGrid('setGridParam', { filterToolbar:false });
				fT.restoreFromFilters = true;
				grid.jqGrid('filterToolbar', fT);
			}
			// finally frozenColums
			if( ret.frozenColumns ) {
				grid.jqGrid('setFrozenColumns');
			}
			grid[0].updatepager(true, true);

			if($.jgrid.isFunction(o.afterSetGrid)) {
				o.afterSetGrid( grid );
			}
			if(o.clearAfterLoad) {
				window[o.storageType].removeItem("jqGrid"+$t.id);
				window[o.storageType].removeItem("jqGrid"+$t.id + "_data");
			}
		} else {
			alert("can not convert to object");
		}
	},
	isGridInStorage : function ( jqGridId, options ) {
		var o = {
			storageType: "localStorage"
		};
		o =  $.extend(o , options || {});
		var ret, gridstring, data;
		try {
			gridstring = window[o.storageType].getItem("jqGrid"+jqGridId);
			data = window[o.storageType].getItem("jqGrid" + jqGridId + "_data");
			ret = gridstring != null && data != null && typeof gridstring === "string" && typeof data === "string" ;
		} catch (e) {
			ret = false;
		}
		return ret;
	},
	setRegional : function( jqGridId , options) {
		var o = {
			storageType: "sessionStorage"
		};
		o =  $.extend(o , options || {});

		if( !o.regional ) {
			return;
		}

		$.jgrid.saveState( jqGridId, o );

		o.beforeSetGrid = function(params) {
			params.regional = o.regional;
			params.force_regional = true;
			return params;
		};

		$.jgrid.loadState( jqGridId, null, o);
		// check for formatter actions
		var grid = $("#"+jqGridId)[0],
		model = $(grid).jqGrid('getGridParam','colModel'), i=-1, nav = $.jgrid.getRegional(grid, 'nav');
		$.each(model,function(k){
			if(this.formatter && this.formatter === 'actions') {
				i = k;
				return false;
			}
		});
		if(i !== -1 && nav) {
			$("#"+jqGridId + " tbody tr").each(function(){
				var td = this.cells[i];
				$(td).find(".ui-inline-edit").attr("title",nav.edittitle);
				$(td).find(".ui-inline-del").attr("title",nav.deltitle);
				$(td).find(".ui-inline-save").attr("title",nav.savetitle);
				$(td).find(".ui-inline-cancel").attr("title",nav.canceltitle);
			});
		}
		try {
			window[o.storageType].removeItem("jqGrid"+grid.id);
			window[o.storageType].removeItem("jqGrid"+grid.id+"_data");
		} catch (e) {}
	},
	jqGridImport : function(jqGridId, o) {
		o = $.extend({
			imptype : "xml", // xml, json, xmlstring, jsonstring
			impstring: "",
			impurl: "",
			mtype: "GET",
			impData : {},
			xmlGrid :{
				config : "root>grid",
				data: "root>rows"
			},
			jsonGrid :{
				config : "grid",
				data: "data"
			},
			ajaxOptions :{}
		}, o || {});
		var $t = (jqGridId.indexOf("#") === 0 ? "": "#") + $.jgrid.jqID(jqGridId);
		var xmlConvert = function (xml,o) {
			var cnfg = $(o.xmlGrid.config,xml)[0];
			var xmldata = $(o.xmlGrid.data,xml)[0], jstr, jstr1, key;
			if($.grid.xmlToJSON ) {
				jstr = $.jgrid.xmlToJSON( cnfg );
				//jstr = $.jgrid.parse(jstr);
				for(key in jstr) {
					if(jstr.hasOwnProperty(key)) {
						jstr1=jstr[key];
					}
				}
				if(xmldata) {
				// save the datatype
					var svdatatype = jstr.grid.datatype;
					jstr.grid.datatype = 'xmlstring';
					jstr.grid.datastr = xml;
					$($t).jqGrid( jstr1 ).jqGrid("setGridParam",{datatype:svdatatype});
				} else {
					setTimeout(function() { $($t).jqGrid( jstr1 ); },0);
				}
			} else {
				alert("xml2json or parse are not present");
			}
		};
		var jsonConvert = function (jsonstr,o){
			if (jsonstr && typeof jsonstr === 'string') {
				var json = $.jgrid.parseFunc(jsonstr);
				var gprm = json[o.jsonGrid.config];
				var jdata = json[o.jsonGrid.data];
				if(jdata) {
					var svdatatype = gprm.datatype;
					gprm.datatype = 'jsonstring';
					gprm.datastr = jdata;
					$($t).jqGrid( gprm ).jqGrid("setGridParam",{datatype:svdatatype});
				} else {
					$($t).jqGrid( gprm );
				}
			}
		};
		switch (o.imptype){
			case 'xml':
				$.ajax($.extend({
					url:o.impurl,
					type:o.mtype,
					data: o.impData,
					dataType:"xml",
					complete: function(xml,stat) {
						if(stat === 'success') {
							xmlConvert(xml.responseXML,o);
							$($t).triggerHandler("jqGridImportComplete", [xml, o]);
							if($.jgrid.isFunction(o.importComplete)) {
								o.importComplete(xml);
							}
						}
						xml=null;
					}
				}, o.ajaxOptions));
				break;
			case 'xmlstring' :
				// we need to make just the conversion and use the same code as xml
				if(o.impstring && typeof o.impstring === 'string') {
					var xmld = $.parseXML(o.impstring);
					if(xmld) {
						xmlConvert(xmld,o);
						$($t).triggerHandler("jqGridImportComplete", [xmld, o]);
						if($.jgrid.isFunction(o.importComplete)) {
							o.importComplete(xmld);
						}
					}
				}
				break;
			case 'json':
				$.ajax($.extend({
					url:o.impurl,
					type:o.mtype,
					data: o.impData,
					dataType:"json",
					complete: function(json) {
						try {
							jsonConvert(json.responseText,o );
							$($t).triggerHandler("jqGridImportComplete", [json, o]);
							if($.jgrid.isFunction(o.importComplete)) {
								o.importComplete(json);
							}
						} catch (ee){}
						json=null;
					}
				}, o.ajaxOptions ));
				break;
			case 'jsonstring' :
				if(o.impstring && typeof o.impstring === 'string') {
					jsonConvert(o.impstring,o );
					$($t).triggerHandler("jqGridImportComplete", [o.impstring, o]);
					if($.jgrid.isFunction(o.importComplete)) {
						o.importComplete(o.impstring);
					}
				}
				break;
		}
	}
});
	$.jgrid.extend({
		jqGridExport : function(o) {
			o = $.extend({
				exptype : "xmlstring",
				root: "grid",
				ident: "\t",
				addOptions : {},
				data : true
			}, o || {});
			var ret = null;
			this.each(function () {
				if(!this.grid) { return;}
				var gprm = $.extend(true, {}, $(this).jqGrid("getGridParam"), o.addOptions);
				// we need to check for:
				// 1.multiselect, 2.subgrid  3. treegrid and remove the unneded columns from colNames
				if(gprm.rownumbers) {
					gprm.colNames.splice(0,1);
					gprm.colModel.splice(0,1);
				}
				if(gprm.multiselect) {
					gprm.colNames.splice(0,1);
					gprm.colModel.splice(0,1);
				}
				if(gprm.subGrid) {
					gprm.colNames.splice(0,1);
					gprm.colModel.splice(0,1);
				}
				gprm.knv = null;
				if(!o.data) {
					gprm.data = [];
					gprm._index = {};
				}
				switch (o.exptype) {
					case 'xmlstring' :
						ret = "<"+o.root+">"+ $.jgrid.jsonToXML( gprm, {xmlDecl:""} )+"</"+o.root+">";
						break;
					case 'jsonstring' :
						ret =  $.jgrid.stringify( gprm );
						if(o.root) { ret = "{"+ o.root +":"+ret+"}"; }
						break;
				}
			});
			return ret;
		},
		excelExport : function(o) {
			o = $.extend({
				exptype : "remote",
				url : null,
				oper: "oper",
				tag: "excel",
				beforeExport : null,
				exporthidden : false,
				exportgrouping: false,
				exportOptions : {}
			}, o || {});
			return this.each(function(){
				if(!this.grid) { return;}
				var url;
				if(o.exptype === "remote") {
					var pdata = $.extend({},this.p.postData), expg;
					pdata[o.oper] = o.tag;
					if($.jgrid.isFunction(o.beforeExport)) {
						var result = o.beforeExport.call(this, pdata );
						if( $.isPlainObject( result ) ) {
							pdata = result;
						}
					}
					if(o.exporthidden) {
						var cm = this.p.colModel, i, len = cm.length, newm=[];
						for(i=0; i< len; i++) {
							if(cm[i].hidden === undefined) { cm[i].hidden = false; }
							newm.push({name:cm[i].name, hidden:cm[i].hidden});
						}
						var newm1 = JSON.stringify( newm );
						if(typeof newm1 === 'string' ) {
							pdata.colModel = newm1;
						}
					}
					if(o.exportgrouping) {
						expg = JSON.stringify( this.p.groupingView );
						if(typeof expg === 'string' ) {
							pdata.groupingView = expg;
						}
					}
					var params = jQuery.param(pdata);
					if(o.url.indexOf("?") !== -1) { url = o.url+"&"+params; }
					else { url = o.url+"?"+params; }
					window.location = url;
				}
			});
		}
    });
//module end
}));
