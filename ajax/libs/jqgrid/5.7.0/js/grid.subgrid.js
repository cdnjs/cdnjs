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
setSubGrid : function () {
	return this.each(function (){
		var $t = this, cm, i,
		classes = $.jgrid.styleUI[($t.p.styleUI || 'jQueryUI')].subgrid,
		suboptions = {
			plusicon : classes.icon_plus,
			minusicon : classes.icon_minus,
			openicon:  classes.icon_open,
			expandOnLoad:  false,
			selectOnExpand : false,
			selectOnCollapse : false,
			reloadOnExpand : true
		};
		$t.p.subGridOptions = $.extend(suboptions, $t.p.subGridOptions || {});
		$t.p.colNames.unshift("");
		$t.p.colModel.unshift({name:'subgrid',width: $.jgrid.cell_width ?  $t.p.subGridWidth+$t.p.cellLayout : $t.p.subGridWidth,sortable: false,resizable:false,hidedlg:true,search:false,fixed:true});
		cm = $t.p.subGridModel;
		if(cm[0]) {
			cm[0].align = $.extend([],cm[0].align || []);
			for(i=0;i<cm[0].name.length;i++) { cm[0].align[i] = cm[0].align[i] || 'left';}
		}
	});
},
addSubGridCell :function (pos,iRow) {
	var prp='', ic, sid, icb ;
	this.each(function(){
		prp = this.formatCol(pos,iRow);
		sid= this.p.id;
		ic = this.p.subGridOptions.plusicon;
		icb = $.jgrid.styleUI[(this.p.styleUI || 'jQueryUI')].common;
	});
	return "<td role=\"gridcell\" aria-describedby=\""+sid+"_subgrid\" class=\"ui-sgcollapsed sgcollapsed\" "+prp+"><a style='cursor:pointer;' class='ui-sghref'><span class='" + icb.icon_base +" "+ic+"'></span></a></td>";
},
addSubGrid : function( pos, sind ) {
	return this.each(function(){
		var ts = this;
		if (!ts.grid ) { return; }
		var base = $.jgrid.styleUI[(ts.p.styleUI || 'jQueryUI')].base,
			common = $.jgrid.styleUI[(ts.p.styleUI || 'jQueryUI')].common;
		//-------------------------
		var subGridCell = function(trdiv,cell,pos)
		{
			var tddiv = $("<td align='"+ts.p.subGridModel[0].align[pos]+"'></td>").html(cell);
			$(trdiv).append(tddiv);
		};
		var subGridXml = function(sjxml, sbid){
			var tddiv, i,  sgmap,
			dummy = $("<table class='" + base.rowTable + " ui-common-table'><tbody></tbody></table>"),
			trdiv = $("<tr></tr>");
			for (i = 0; i<ts.p.subGridModel[0].name.length; i++) {
				tddiv = $("<th class='" + base.headerBox+" ui-th-subgrid ui-th-column ui-th-"+ts.p.direction+"'></th>");
				$(tddiv).html(ts.p.subGridModel[0].name[i]);
				$(tddiv).width( ts.p.subGridModel[0].width[i]);
				$(trdiv).append(tddiv);
			}
			$(dummy).append(trdiv);
			if (sjxml){
				sgmap = ts.p.xmlReader.subgrid;
				$(sgmap.root+" "+sgmap.row, sjxml).each( function(){
					trdiv = $("<tr class='" + common.content+" ui-subtblcell'></tr>");
					if(sgmap.repeatitems === true) {
						$(sgmap.cell,this).each( function(i) {
							subGridCell(trdiv, $(this).text() || '&#160;',i);
						});
					} else {
						var f = ts.p.subGridModel[0].mapping || ts.p.subGridModel[0].name;
						if (f) {
							for (i=0;i<f.length;i++) {
								subGridCell(trdiv, $.jgrid.getXmlData(this, f[i]) || '&#160;',i);
							}
						}
					}
					$(dummy).append(trdiv);
				});
			}
			var pID = $(ts.grid.bDiv).find("table").first().attr("id")+"_";
			$("#"+$.jgrid.jqID(pID+sbid)).append(dummy);
			ts.grid.hDiv.loading = false;
			$("#load_"+$.jgrid.jqID(ts.p.id)).hide();
			return false;
		};
		var subGridJson = function(sjxml, sbid){
			var tddiv,result,i,cur, sgmap,j,
			dummy = $("<table class='" + base.rowTable + " ui-common-table'><tbody></tbody></table>"),
			trdiv = $("<tr></tr>");
			for (i = 0; i<ts.p.subGridModel[0].name.length; i++) {
				tddiv = $("<th class='" + base.headerBox + " ui-th-subgrid ui-th-column ui-th-"+ts.p.direction+"'></th>");
				$(tddiv).html(ts.p.subGridModel[0].name[i]);
				$(tddiv).width( ts.p.subGridModel[0].width[i]);
				$(trdiv).append(tddiv);
			}
			$(dummy).append(trdiv);
			if (sjxml){
				sgmap = ts.p.jsonReader.subgrid;
				result = $.jgrid.getAccessor(sjxml, sgmap.root);
				if ( result !== undefined ) {
					for (i=0;i<result.length;i++) {
						cur = result[i];
						trdiv = $("<tr class='" + common.content+" ui-subtblcell'></tr>");
						if(sgmap.repeatitems === true) {
							if(sgmap.cell) { cur=cur[sgmap.cell]; }
							for (j=0;j<cur.length;j++) {
								subGridCell(trdiv, cur[j] || '&#160;',j);
							}
						} else {
							var f = ts.p.subGridModel[0].mapping || ts.p.subGridModel[0].name;
							if(f.length) {
								for (j=0;j<f.length;j++) {
									subGridCell(trdiv, $.jgrid.getAccessor(cur, f[j] ) || '&#160;',j);
								}
							}
						}
						$(dummy).append(trdiv);
					}
				}
			}
			var pID = $(ts.grid.bDiv).find("table").first().attr("id")+"_";
			$("#"+$.jgrid.jqID(pID+sbid)).append(dummy);
			ts.grid.hDiv.loading = false;
			$("#load_"+$.jgrid.jqID(ts.p.id)).hide();
			return false;
		};
		var populatesubgrid = function( rd )
		{
			var sid,dp, i, j;
			sid = $(rd).attr("id");
			dp = {nd_: (new Date().getTime())};
			dp[ts.p.prmNames.subgridid]=sid;
			if(!ts.p.subGridModel[0]) { return false; }
			if(ts.p.subGridModel[0].params) {
				for(j=0; j < ts.p.subGridModel[0].params.length; j++) {
					for(i=0; i<ts.p.colModel.length; i++) {
						if(ts.p.colModel[i].name === ts.p.subGridModel[0].params[j]) {
							dp[ts.p.colModel[i].name]= $("td", rd).eq( i ).text().replace(/\&#160\;/ig,'');
						}
					}
				}
			}
			if(!ts.grid.hDiv.loading) {
				ts.grid.hDiv.loading = true;
				$("#load_"+$.jgrid.jqID(ts.p.id)).show();
				if(!ts.p.subgridtype) { ts.p.subgridtype = ts.p.datatype; }
				if($.jgrid.isFunction(ts.p.subgridtype)) {
					ts.p.subgridtype.call(ts, dp);
				} else {
					ts.p.subgridtype = ts.p.subgridtype.toLowerCase();
				}
				switch(ts.p.subgridtype) {
					case "xml":
					case "json":
					$.ajax($.extend({
						type:ts.p.mtype,
						url: $.jgrid.isFunction(ts.p.subGridUrl) ? ts.p.subGridUrl.call(ts, dp) : ts.p.subGridUrl,
						dataType:ts.p.subgridtype,
						data: $.jgrid.isFunction(ts.p.serializeSubGridData)? ts.p.serializeSubGridData.call(ts, dp) : dp,
						complete: function(sxml) {
							if(ts.p.subgridtype === "xml") {
								subGridXml(sxml.responseXML, sid);
							} else {
								subGridJson($.jgrid.parse(sxml.responseText), sid);
							}
							sxml=null;
						}
					}, $.jgrid.ajaxOptions, ts.p.ajaxSubgridOptions || {}));
					break;
				}
			}
			return false;
		};
		var _id, pID,atd, nhc=0, bfsc, $r;
		$.each(ts.p.colModel,function(){
			if(this.hidden === true || this.name === 'rn' || this.name === 'cb'  || this.name === 'sc' ) {
				nhc++;
			}
		});
		var len = ts.rows.length, i=1,hsret, ishsg = $.jgrid.isFunction(ts.p.isHasSubGrid);
		if( sind !== undefined && sind > 0) {
			i = sind;
			len = sind+1;
		}
		while(i < len) {
			if($(ts.rows[i]).hasClass('jqgrow')) {
				if(ts.p.scroll) {
					$(ts.rows[i].cells[pos]).off('click');
				}
				hsret = null;
				if(ishsg) {
					hsret = ts.p.isHasSubGrid.call(ts, ts.rows[i].id);
				}
				if(hsret === false) {
					ts.rows[i].cells[pos].innerHTML = "";
				} else {
					$(ts.rows[i].cells[pos]).on('click', function() {
						var tr = $(this).parent("tr")[0];
						pID = ts.p.id;
						_id = tr.id;
						$r = $("#" + pID + "_" + _id + "_expandedContent");
						if($(this).hasClass("sgcollapsed")) {
							bfsc = $(ts).triggerHandler("jqGridSubGridBeforeExpand", [pID + "_" + _id, _id]);
							bfsc = (bfsc === false || bfsc === 'stop') ? false : true;
							if(bfsc && $.jgrid.isFunction(ts.p.subGridBeforeExpand)) {
								bfsc = ts.p.subGridBeforeExpand.call(ts, pID+"_"+_id,_id);
							}
							if(bfsc === false) {return false;}

							if(ts.p.subGridOptions.reloadOnExpand === true || ( ts.p.subGridOptions.reloadOnExpand === false && !$r.hasClass('ui-subgrid') ) ) {
								atd = pos >=1 ? "<td colspan='"+pos+"'>&#160;</td>":"";
								$(tr).after( "<tr role='row' id='" + pID + "_" + _id + "_expandedContent" + "' class='ui-subgrid ui-sg-expanded'>"+atd+"<td class='" + common.content +" subgrid-cell'><span class='" + common.icon_base +" "+ts.p.subGridOptions.openicon+"'></span></td><td colspan='"+parseInt(ts.p.colNames.length-1-nhc,10)+"' class='" + common.content +" subgrid-data'><div id="+pID+"_"+_id+" class='tablediv'></div></td></tr>" );
								$(ts).triggerHandler("jqGridSubGridRowExpanded", [pID + "_" + _id, _id]);
								if( $.jgrid.isFunction(ts.p.subGridRowExpanded)) {
									ts.p.subGridRowExpanded.call(ts, pID+"_"+ _id,_id);
								} else {
									populatesubgrid(tr);
								}
							} else {
								$r.show().removeClass("ui-sg-collapsed").addClass("ui-sg-expanded");
							}
							$(this).html("<a style='cursor:pointer;' class='ui-sghref'><span class='" + common.icon_base +" "+ts.p.subGridOptions.minusicon+"'></span></a>").removeClass("sgcollapsed").addClass("sgexpanded");
							if(ts.p.subGridOptions.selectOnExpand) {
								$(ts).jqGrid('setSelection',_id);
							}
						} else if($(this).hasClass("sgexpanded")) {
							bfsc = $(ts).triggerHandler("jqGridSubGridRowColapsed", [pID + "_" + _id, _id]);
							bfsc = (bfsc === false || bfsc === 'stop') ? false : true;
							if( bfsc &&  $.jgrid.isFunction(ts.p.subGridRowColapsed)) {
								bfsc = ts.p.subGridRowColapsed.call(ts, pID+"_"+_id,_id );
							}
							if(bfsc===false) {return false;}
							if(ts.p.subGridOptions.reloadOnExpand === true) {
								$r.remove(".ui-subgrid");
							} else if($r.hasClass('ui-subgrid')) { // incase of dynamic deleting
								$r.hide().addClass("ui-sg-collapsed").removeClass("ui-sg-expanded");
							}
							$(this).html("<a style='cursor:pointer;' class='ui-sghref'><span class='"+common.icon_base +" "+ts.p.subGridOptions.plusicon+"'></span></a>").removeClass("sgexpanded").addClass("sgcollapsed");
							if(ts.p.subGridOptions.selectOnCollapse) {
								$(ts).jqGrid('setSelection',_id);
							}
						}
						return false;
					});
				}
			}
			i++;
		}
		if(ts.p.subGridOptions.expandOnLoad === true) {
			var offset = 0;
			if(ts.p.multiselect) { offset++;}
			if(ts.p.rownumbers) { offset++;}
			$(ts.rows).filter('.jqgrow').each(function(index,row){
				$(row.cells[offset]).click();
			});
		}
		ts.subGridXml = function(xml,sid) {subGridXml(xml,sid);};
		ts.subGridJson = function(json,sid) {subGridJson(json,sid);};
	});
},
expandSubGridRow : function(rowid) {
	return this.each(function () {
		var $t = this;
		if(!$t.grid && !rowid) {return;}
		if($t.p.subGrid===true) {
			var rc = $(this).jqGrid("getInd",rowid,true);
			if(rc) {
				var sgc = $("td.sgcollapsed",rc)[0];
				if(sgc) {
					$(sgc).trigger("click");
				}
			}
		}
	});
},
collapseSubGridRow : function(rowid) {
	return this.each(function () {
		var $t = this;
		if(!$t.grid && !rowid) {return;}
		if($t.p.subGrid===true) {
			var rc = $(this).jqGrid("getInd",rowid,true);
			if(rc) {
				var sgc = $("td.sgexpanded",rc)[0];
				if(sgc) {
					$(sgc).trigger("click");
				}
			}
		}
	});
},
toggleSubGridRow : function(rowid) {
	return this.each(function () {
		var $t = this;
		if(!$t.grid && !rowid) {return;}
		if($t.p.subGrid===true) {
			var rc = $(this).jqGrid("getInd",rowid,true);
			if(rc) {
				var sgc = $("td.sgcollapsed",rc)[0];
				if(sgc) {
					$(sgc).trigger("click");
				} else {
					sgc = $("td.sgexpanded",rc)[0];
					if(sgc) {
						$(sgc).trigger("click");
					}
				}
			}
		}
	});
}
});
//module end
}));
