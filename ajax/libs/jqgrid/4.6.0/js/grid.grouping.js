/*jshint eqeqeq:false, eqnull:true */
/*global jQuery */
// Grouping module
(function($){
"use strict";
$.extend($.jgrid,{
	template : function(format){ //jqgformat
		var args = $.makeArray(arguments).slice(1), j, al = args.length;
		if(format==null) { format = ""; }
		return format.replace(/\{([\w\-]+)(?:\:([\w\.]*)(?:\((.*?)?\))?)?\}/g, function(m,i){
			if(!isNaN(parseInt(i,10))) {
				return args[parseInt(i,10)];
			}
			for(j=0; j < al;j++) {
				if($.isArray(args[j])) {
					var nmarr = args[ j ],
					k = nmarr.length;
					while(k--) {
						if(i===nmarr[k].nm) {
							return nmarr[k].v;
						}
					}
				}
			}
		});
	}
});
$.jgrid.extend({
	groupingSetup : function () {
		return this.each(function (){
			var $t = this, i, j, cml, cm = $t.p.colModel, grp = $t.p.groupingView;
			if(grp !== null && ( (typeof grp === 'object') || $.isFunction(grp) ) ) {
				if(!grp.groupField.length) {
					$t.p.grouping = false;
				} else {
					if (grp.visibiltyOnNextGrouping === undefined) {
						grp.visibiltyOnNextGrouping = [];
					}

					grp.lastvalues=[];
					if(!grp._locgr) {
						grp.groups =[];
					}
					grp.counters =[];
					for(i=0;i<grp.groupField.length;i++) {
						if(!grp.groupOrder[i]) {
							grp.groupOrder[i] = 'asc';
						}
						if(!grp.groupText[i]) {
							grp.groupText[i] = '{0}';
						}
						if( typeof grp.groupColumnShow[i] !== 'boolean') {
							grp.groupColumnShow[i] = true;
						}
						if( typeof grp.groupSummary[i] !== 'boolean') {
							grp.groupSummary[i] = false;
						}
						if( !grp.groupSummaryPos[i]) {
							grp.groupSummaryPos[i] = 'footer';
						}
						if(grp.groupColumnShow[i] === true) {
							grp.visibiltyOnNextGrouping[i] = true;
							$($t).jqGrid('showCol',grp.groupField[i]);
						} else {
							grp.visibiltyOnNextGrouping[i] = $("#"+$.jgrid.jqID($t.p.id+"_"+grp.groupField[i])).is(":visible");
							$($t).jqGrid('hideCol',grp.groupField[i]);
						}
					}
					grp.summary =[];
					if(grp.hideFirstGroupCol) {
						grp.formatDisplayField[0] = function (v) { return v;};
					}
					for(j=0, cml = cm.length; j < cml; j++) {
						if(grp.hideFirstGroupCol) {
							if(!cm[j].hidden && grp.groupField[0] === cm[j].name) {
								cm[j].formatter = function(){return '';};
							}
						}
						if(cm[j].summaryType ) {
							if(cm[j].summaryDivider) {
								grp.summary.push({nm:cm[j].name,st:cm[j].summaryType, v: '', sd:cm[j].summaryDivider, vd:'', sr: cm[j].summaryRound, srt: cm[j].summaryRoundType || 'round'});
							} else {
								grp.summary.push({nm:cm[j].name,st:cm[j].summaryType, v: '', sr: cm[j].summaryRound, srt: cm[j].summaryRoundType || 'round'});
							}
						}
					}
				}
			} else {
				$t.p.grouping = false;
			}
		});
	},
	groupingPrepare : function ( record, irow ) {
		this.each(function(){
			var grp = this.p.groupingView, $t= this, i,
			grlen = grp.groupField.length, 
			fieldName,
			v,
			displayName,
			displayValue,
			changed = 0;
			for(i=0;i<grlen;i++) {
				fieldName = grp.groupField[i];
				displayName = grp.displayField[i];
				v = record[fieldName];
				displayValue = displayName == null ? null : record[displayName];

				if( displayValue == null ) {
					displayValue = v;
				}
				if( v !== undefined ) {
					if(irow === 0 ) {
						// First record always starts a new group
						grp.groups.push({idx:i,dataIndex:fieldName,value:v, displayValue: displayValue, startRow: irow, cnt:1, summary : [] } );
						grp.lastvalues[i] = v;
						grp.counters[i] = {cnt:1, pos:grp.groups.length-1, summary: $.extend(true,[],grp.summary)};
						$.each(grp.counters[i].summary,function() {
							if ($.isFunction(this.st)) {
								this.v = this.st.call($t, this.v, this.nm, record);
							} else {
								this.v = $($t).jqGrid('groupingCalculations.handler',this.st, this.v, this.nm, this.sr, this.srt, record);
								if(this.st.toLowerCase() === 'avg' && this.sd) {
									this.vd = $($t).jqGrid('groupingCalculations.handler',this.st, this.vd, this.sd, this.sr, this.srt, record);
								}
							}
						});
						grp.groups[grp.counters[i].pos].summary = grp.counters[i].summary;
					} else {
						if (typeof v !== "object" && ($.isArray(grp.isInTheSameGroup) && $.isFunction(grp.isInTheSameGroup[i]) ? ! grp.isInTheSameGroup[i].call($t, grp.lastvalues[i], v, i, grp): grp.lastvalues[i] !== v)) {
							// This record is not in same group as previous one
							grp.groups.push({idx:i,dataIndex:fieldName,value:v, displayValue: displayValue, startRow: irow, cnt:1, summary : [] } );
							grp.lastvalues[i] = v;
							changed = 1;
							grp.counters[i] = {cnt:1, pos:grp.groups.length-1, summary: $.extend(true,[],grp.summary)};
							$.each(grp.counters[i].summary,function() {
								if ($.isFunction(this.st)) {
									this.v = this.st.call($t, this.v, this.nm, record);
								} else {
									this.v = $($t).jqGrid('groupingCalculations.handler',this.st, this.v, this.nm, this.sr, this.srt, record);
									if(this.st.toLowerCase() === 'avg' && this.sd) {
										this.vd = $($t).jqGrid('groupingCalculations.handler',this.st, this.vd, this.sd, this.sr, this.srt, record);
									}
								}
							});
							grp.groups[grp.counters[i].pos].summary = grp.counters[i].summary;
						} else {
							if (changed === 1) {
								// This group has changed because an earlier group changed.
								grp.groups.push({idx:i,dataIndex:fieldName,value:v, displayValue: displayValue, startRow: irow, cnt:1, summary : [] } );
								grp.lastvalues[i] = v;
								grp.counters[i] = {cnt:1, pos:grp.groups.length-1, summary: $.extend(true,[],grp.summary)};
								$.each(grp.counters[i].summary,function() {
									if ($.isFunction(this.st)) {
										this.v = this.st.call($t, this.v, this.nm, record);
									} else {
										this.v = $($t).jqGrid('groupingCalculations.handler',this.st, this.v, this.nm, this.sr, this.srt, record);
										if(this.st.toLowerCase() === 'avg' && this.sd) {
											this.vd = $($t).jqGrid('groupingCalculations.handler',this.st, this.vd, this.sd, this.sr, this.srt, record);
										}
									}
								});
								grp.groups[grp.counters[i].pos].summary = grp.counters[i].summary;
							} else {
								grp.counters[i].cnt += 1;
								grp.groups[grp.counters[i].pos].cnt = grp.counters[i].cnt;
								$.each(grp.counters[i].summary,function() {
									if ($.isFunction(this.st)) {
										this.v = this.st.call($t, this.v, this.nm, record);
									} else {
										this.v = $($t).jqGrid('groupingCalculations.handler',this.st, this.v, this.nm, this.sr, this.srt, record);
										if(this.st.toLowerCase() === 'avg' && this.sd) {
											this.vd = $($t).jqGrid('groupingCalculations.handler',this.st, this.vd, this.sd, this.sr, this.srt, record);
										}
									}
								});
								grp.groups[grp.counters[i].pos].summary = grp.counters[i].summary;
							}
						}
					}
				}
			}
			//gdata.push( rData );
		});
		return this;
	},
	groupingToggle : function(hid){
		this.each(function(){
			var $t = this,
			grp = $t.p.groupingView,
			strpos = hid.split('_'),
			num = parseInt(strpos[strpos.length-2], 10);
			strpos.splice(strpos.length-2,2);
			var uid = strpos.join("_"),
			minus = grp.minusicon,
			plus = grp.plusicon,
			tar = $("#"+$.jgrid.jqID(hid)),
			r = tar.length ? tar[0].nextSibling : null,
			tarspan = $("#"+$.jgrid.jqID(hid)+" span."+"tree-wrap-"+$t.p.direction),
			getGroupingLevelFromClass = function (className) {
				var nums = $.map(className.split(" "), function (item) {
					if (item.substring(0, uid.length + 1) === uid + "_") {
						return parseInt(item.substring(uid.length + 1), 10);
					}
				});
				return nums.length > 0 ? nums[0] : undefined;
			},
			itemGroupingLevel,
			showData,
			collapsed = false,
			frz = $t.p.frozenColumns ? $t.p.id+"_frozen" : false,
			tar2 = frz ? $("#"+$.jgrid.jqID(hid), "#"+$.jgrid.jqID(frz) ) : false,
			r2 = (tar2 && tar2.length) ? tar2[0].nextSibling : null;
			if( tarspan.hasClass(minus) ) {
				if(grp.showSummaryOnHide) {
					if(r){
						while(r) {
							if($(r).hasClass('jqfoot') ) {
								var lv = parseInt($(r).attr("jqfootlevel"),10);
								if(  lv <= num) {
									break;
								}
							}
							$(r).hide();
							r = r.nextSibling;
							if(frz) {
								$(r2).hide();
								r2 = r2.nextSibling;
							}
						}
					}
				} else  {
					if(r){
						while(r) {
							itemGroupingLevel = getGroupingLevelFromClass(r.className);
							if (itemGroupingLevel !== undefined && itemGroupingLevel <= num) {
								break;
							}
							$(r).hide();
							r = r.nextSibling;
							if(frz) {
								$(r2).hide();
								r2 = r2.nextSibling;
							}
						}
					}
				}
				tarspan.removeClass(minus).addClass(plus);
				collapsed = true;
			} else {
				if(r){
					showData = undefined;
					while(r) {
						itemGroupingLevel = getGroupingLevelFromClass(r.className);
						if (showData === undefined) {
							showData = itemGroupingLevel === undefined; // if the first row after the opening group is data row then show the data rows
						}
						if (itemGroupingLevel !== undefined) {
							if (itemGroupingLevel <= num) {
								break;// next item of the same lever are found
							}
							if (itemGroupingLevel === num + 1) {
								$(r).show().find(">td>span."+"tree-wrap-"+$t.p.direction).removeClass(minus).addClass(plus);
								if(frz) {
									$(r2).show().find(">td>span."+"tree-wrap-"+$t.p.direction).removeClass(minus).addClass(plus);
								}
							}
						} else if (showData) {
							$(r).show();
							if(frz) {
								$(r2).show();
							}
						}
						r = r.nextSibling;
						if(frz) {
							r2 = r2.nextSibling;
						}
					}
				}
				tarspan.removeClass(plus).addClass(minus);
			}
			$($t).triggerHandler("jqGridGroupingClickGroup", [hid , collapsed]);
			if( $.isFunction($t.p.onClickGroup)) { $t.p.onClickGroup.call($t, hid , collapsed); }

		});
		return false;
	},
	groupingRender : function (grdata, colspans, page, rn ) {
		return this.each(function(){
			var $t = this,
			grp = $t.p.groupingView,
			str = "", icon = "", hid, clid, pmrtl = grp.groupCollapse ? grp.plusicon : grp.minusicon, gv, cp=[], len =grp.groupField.length;
			pmrtl += " tree-wrap-"+$t.p.direction; 
			$.each($t.p.colModel, function (i,n){
				var ii;
				for(ii=0;ii<len;ii++) {
					if(grp.groupField[ii] === n.name ) {
						cp[ii] = i;
						break;
					}
				}
			});
			var toEnd = 0;
			function findGroupIdx( ind , offset, grp) {
				var ret = false, i;
				if(offset===0) {
					ret = grp[ind];
				} else {
					var id = grp[ind].idx;
					if(id===0) { 
						ret = grp[ind]; 
					}  else {
						for(i=ind;i >= 0; i--) {
							if(grp[i].idx === id-offset) {
								ret = grp[i];
								break;
							}
						}
					}
				}
				return ret;
			}
			function buildSummaryTd(i, ik, grp, foffset) {
				var fdata = findGroupIdx(i, ik, grp),
				cm = $t.p.colModel,
				vv, grlen = fdata.cnt, str="", k;
				for(k=foffset; k<colspans;k++) {
					var tmpdata = "<td "+$t.formatCol(k,1,'')+">&#160;</td>",
					tplfld = "{0}";
					$.each(fdata.summary,function(){
						if(this.nm === cm[k].name) {
							if(cm[k].summaryTpl)  {
								tplfld = cm[k].summaryTpl;
							}
							if(typeof this.st === 'string' && this.st.toLowerCase() === 'avg') {
								if(this.sd && this.vd) { 
									this.v = (this.v/this.vd);
								} else if(this.v && grlen > 0) {
									this.v = (this.v/grlen);
								}
							}
							try {
								this.groupCount = fdata.cnt;
								this.groupIndex = fdata.dataIndex;
								this.groupValue = fdata.value;
								vv = $t.formatter('', this.v, k, this);
							} catch (ef) {
								vv = this.v;
							}
							tmpdata= "<td "+$t.formatCol(k,1,'')+">"+$.jgrid.format(tplfld,vv)+ "</td>";
							return false;
						}
					});
					str += tmpdata;
				}
				return str;
			}
			var sumreverse = $.makeArray(grp.groupSummary);
			sumreverse.reverse();
			$.each(grp.groups,function(i,n){
				if(grp._locgr) {
					if( !(n.startRow +n.cnt > (page-1)*rn && n.startRow < page*rn)) {
						return true;
					}
				}
				toEnd++;
				clid = $t.p.id+"ghead_"+n.idx;
				hid = clid+"_"+i;
				icon = "<span style='cursor:pointer;' class='ui-icon "+pmrtl+"' onclick=\"jQuery('#"+$.jgrid.jqID($t.p.id)+"').jqGrid('groupingToggle','"+hid+"');return false;\"></span>";
				try {
					if ($.isArray(grp.formatDisplayField) && $.isFunction(grp.formatDisplayField[n.idx])) {
						n.displayValue = grp.formatDisplayField[n.idx].call($t, n.displayValue, n.value, $t.p.colModel[cp[n.idx]], n.idx, grp);
						gv = n.displayValue;
					} else {
						gv = $t.formatter(hid, n.displayValue, cp[n.idx], n.value );
					}
				} catch (egv) {
					gv = n.displayValue;
				}
				if(grp.groupSummaryPos[n.idx] === 'header')  {
					str += "<tr id=\""+hid+"\"" +(grp.groupCollapse && n.idx>0 ? " style=\"display:none;\" " : " ") + "role=\"row\" class= \"ui-widget-content jqgroup ui-row-"+$t.p.direction+" "+clid+"\"><td style=\"padding-left:"+(n.idx * 12) + "px;"+"\">"+icon+$.jgrid.template(grp.groupText[n.idx], gv, n.cnt, n.summary)+"</td>";
					str += buildSummaryTd(i, n.idx-1, grp.groups, 1);
					str += "</tr>";
				} else {
					str += "<tr id=\""+hid+"\"" +(grp.groupCollapse && n.idx>0 ? " style=\"display:none;\" " : " ") + "role=\"row\" class= \"ui-widget-content jqgroup ui-row-"+$t.p.direction+" "+clid+"\"><td style=\"padding-left:"+(n.idx * 12) + "px;"+"\" colspan=\""+colspans+"\">"+icon+$.jgrid.template(grp.groupText[n.idx], gv, n.cnt, n.summary)+"</td></tr>";
				}
				var leaf = len-1 === n.idx; 
				if( leaf ) {
					var gg = grp.groups[i+1], kk, ik, offset = 0, sgr = n.startRow,
					end = gg !== undefined ?  grp.groups[i+1].startRow : grdata.length;
					if(grp._locgr) {
						offset = (page-1)*rn;
						if(offset > n.startRow) {
							sgr = offset;
						}
					}
					for(kk=sgr;kk<end;kk++) {
						if(!grdata[kk - offset]) { break; }
						str += grdata[kk - offset].join('');
					}
					if(grp.groupSummaryPos[n.idx] !== 'header') {
						var jj;
						if (gg !== undefined) {
							for (jj = 0; jj < grp.groupField.length; jj++) {
								if (gg.dataIndex === grp.groupField[jj]) {
									break;
								}
							}
							toEnd = grp.groupField.length - jj;
						}
						for (ik = 0; ik < toEnd; ik++) {
							if(!sumreverse[ik]) { continue; }
							var hhdr = "";
							if(grp.groupCollapse && !grp.showSummaryOnHide) {
								hhdr = " style=\"display:none;\"";
							}
							str += "<tr"+hhdr+" jqfootlevel=\""+(n.idx-ik)+"\" role=\"row\" class=\"ui-widget-content jqfoot ui-row-"+$t.p.direction+"\">";
							str += buildSummaryTd(i, ik, grp.groups, 0);
							str += "</tr>";
						}
						toEnd = jj;
					}
				}
			});
			$("#"+$.jgrid.jqID($t.p.id)+" tbody:first").append(str);
			// free up memory
			str = null;
		});
	},
	groupingGroupBy : function (name, options ) {
		return this.each(function(){
			var $t = this;
			if(typeof name === "string") {
				name = [name];
			}
			var grp = $t.p.groupingView;
			$t.p.grouping = true;

			//Set default, in case visibilityOnNextGrouping is undefined 
			if (grp.visibiltyOnNextGrouping === undefined) {
				grp.visibiltyOnNextGrouping = [];
			}
			var i;
			// show previous hidden groups if they are hidden and weren't removed yet
			for(i=0;i<grp.groupField.length;i++) {
				if(!grp.groupColumnShow[i] && grp.visibiltyOnNextGrouping[i]) {
				$($t).jqGrid('showCol',grp.groupField[i]);
				}
			}
			// set visibility status of current group columns on next grouping
			for(i=0;i<name.length;i++) {
				grp.visibiltyOnNextGrouping[i] = $("#"+$.jgrid.jqID($t.p.id)+"_"+$.jgrid.jqID(name[i])).is(":visible");
			}
			$t.p.groupingView = $.extend($t.p.groupingView, options || {});
			grp.groupField = name;
			$($t).trigger("reloadGrid");
		});
	},
	groupingRemove : function (current) {
		return this.each(function(){
			var $t = this;
			if(current === undefined) {
				current = true;
			}
			$t.p.grouping = false;
			if(current===true) {
				var grp = $t.p.groupingView, i;
				// show previous hidden groups if they are hidden and weren't removed yet
				for(i=0;i<grp.groupField.length;i++) {
				if (!grp.groupColumnShow[i] && grp.visibiltyOnNextGrouping[i]) {
						$($t).jqGrid('showCol', grp.groupField);
					}
				}
				$("tr.jqgroup, tr.jqfoot","#"+$.jgrid.jqID($t.p.id)+" tbody:first").remove();
				$("tr.jqgrow:hidden","#"+$.jgrid.jqID($t.p.id)+" tbody:first").show();
			} else {
				$($t).trigger("reloadGrid");
			}
		});
	},
	groupingCalculations : {
		handler: function(fn, v, field, round, roundType, rc) {
			var funcs = {
				sum: function() {
					return parseFloat(v||0) + parseFloat((rc[field]||0));
				},

				min: function() {
					if(v==="") {
						return parseFloat(rc[field]||0);
					}
					return Math.min(parseFloat(v),parseFloat(rc[field]||0));
				},

				max: function() {
					if(v==="") {
						return parseFloat(rc[field]||0);
					}
					return Math.max(parseFloat(v),parseFloat(rc[field]||0));
				},

				count: function() {
					if(v==="") {v=0;}
					if(rc.hasOwnProperty(field)) {
						return v+1;
					}
					return 0;
				},

				avg: function() {
					// the same as sum, but at end we divide it
					// so use sum instead of duplicating the code (?)
					return funcs.sum();
				}
			};

			if(!funcs[fn]) {
				throw ("jqGrid Grouping No such method: " + fn);
			}
			var res = funcs[fn]();

			if (round != null) {
				if (roundType === 'fixed') {
					res = res.toFixed(round);
				} else {
					var mul = Math.pow(10, round);
					res = Math.round(res * mul) / mul;
				}
			}

			return res;
		}	
	}
});
})(jQuery);
