/*jshint eqeqeq:false, eqnull:true, devel:true */
/*global jQuery, define */
(function( factory ) {
	"use strict";
	if ( typeof define === "function" && define.amd ) {
		// AMD. Register as an anonymous module.
		define([
			"jquery",
			"./grid.base",
			"./grid.common"
		], factory );
	} else {
		// Browser globals
		factory( jQuery );
	}
}(function( $ ) {
"use strict";
//module begin
var rp_ge = {};
$.jgrid.extend({
	editGridRow : function(rowid, p){
		var regional =  $.jgrid.getRegional(this[0], 'edit'),
			currstyle = this[0].p.styleUI,
			styles = $.jgrid.styleUI[currstyle].formedit,
			commonstyle = $.jgrid.styleUI[currstyle].common;

		p = $.extend(true, {
			top : 0,
			left: 0,
			width: '500',
			datawidth: 'auto',
			height: 'auto',
			dataheight: 'auto',
			modal: false,
			overlay : 30,
			drag: true,
			resize: true,
			url: null,
			mtype : "POST",
			clearAfterAdd :true,
			closeAfterEdit : false,
			reloadAfterSubmit : true,
			onInitializeForm: null,
			beforeInitData: null,
			beforeShowForm: null,
			afterShowForm: null,
			beforeSubmit: null,
			afterSubmit: null,
			onclickSubmit: null,
			afterComplete: null,
			onclickPgButtons : null,
			afterclickPgButtons: null,
			editData : {},
			recreateForm : false,
			jqModal : true,
			closeOnEscape : false,
			addedrow : "first",
			topinfo : '',
			bottominfo: '',
			saveicon : [],
			closeicon : [],
			savekey: [false,13],
			navkeys: [false,38,40],
			checkOnSubmit : false,
			checkOnUpdate : false,
			processing : false,
			onClose : null,
			ajaxEditOptions : {},
			serializeEditData : null,
			viewPagerButtons : true,
			overlayClass : commonstyle.overlay,
			removemodal : true,
			form: 'edit',
			template : null,
			focusField : true,
			editselected : false,
			html5Check : false,
			buttons : []
		}, regional, p || {});
		rp_ge[$(this)[0].p.id] = p;
		return this.each(function(){
			var $t = this;
			if (!$t.grid || !rowid) {return;}
			$t.p.savedData = {};
			var gID = $t.p.id,
			frmgr = "FrmGrid_"+gID, frmtborg = "TblGrid_"+gID, frmtb = "#"+$.jgrid.jqID(frmtborg), frmtb2,
			IDs = {themodal:'editmod'+gID,modalhead:'edithd'+gID,modalcontent:'editcnt'+gID, scrollelm : frmgr},
			showFrm = true, maxCols = 1, maxRows=0,	postdata, diff, frmoper,
			templ = typeof rp_ge[$t.p.id].template === "string" && rp_ge[$t.p.id].template.length > 0,
			errors =$.jgrid.getRegional(this, 'errors');
			rp_ge[$t.p.id].styleUI = $t.p.styleUI || 'jQueryUI';
			if($.jgrid.isMobile()) {
				rp_ge[$t.p.id].resize = false;
			}
			if (rowid === "new") {
				rowid = "_empty";
				frmoper = "add";
				p.caption=rp_ge[$t.p.id].addCaption;
			} else {
				p.caption=rp_ge[$t.p.id].editCaption;
				frmoper = "edit";
			}
			if(!p.recreateForm) {
				if( $($t).data("formProp") ) {
					$.extend(rp_ge[$(this)[0].p.id], $($t).data("formProp"));
				}
			}
			var closeovrl = true;
			if(p.checkOnUpdate && p.jqModal && !p.modal) {
				closeovrl = false;
			}
			function getFormData(){
				var a2 ={}, i;
				$(frmtb).find(".FormElement").each(function() {
					var celm = $(".customelement", this);
					if (celm.length) {
						var  elem = celm[0], nm = $(elem).attr('name');
						$.each($t.p.colModel, function(){
							if(this.name === nm && this.editoptions && $.jgrid.isFunction(this.editoptions.custom_value)) {
								try {
									postdata[nm] = this.editoptions.custom_value.call($t, $("#"+$.jgrid.jqID(nm),frmtb),'get');
									if (postdata[nm] === undefined) {throw "e1";}
								} catch (e) {
									if (e==="e1") {$.jgrid.info_dialog(errors.errcap,"function 'custom_value' "+rp_ge[$(this)[0]].p.msg.novalue,rp_ge[$(this)[0]].p.bClose, {styleUI : rp_ge[$(this)[0]].p.styleUI });}
									else {$.jgrid.info_dialog(errors.errcap,e.message,rp_ge[$(this)[0]].p.bClose, {styleUI : rp_ge[$(this)[0]].p.styleUI });}
								}
								return true;
							}
						});
					} else {
						switch ($(this).get(0).type) {
							case "checkbox":
								if($(this).is(":checked")) {
									postdata[this.name]= $(this).val();
								} else {
									var ofv = $(this).attr("offval");
									postdata[this.name]= ofv;
								}
							break;
							case "select-one":
								postdata[this.name]= $(this).val();
							break;
							case "select-multiple":
								postdata[this.name]= $(this).val();
								postdata[this.name] = postdata[this.name] ? postdata[this.name].join(",") : "";
							break;
							case "radio" :
								if(a2.hasOwnProperty(this.name)) {
									return true;
								} else {
									a2[this.name] = ($(this).attr("offval") === undefined) ? "off" : $(this).attr("offval");
								}
								break;
							default:
								postdata[this.name] = $(this).val();
						}
						if($t.p.autoencode) {
							postdata[this.name] = $.jgrid.htmlEncode(postdata[this.name]);
						}
					}
				});
				for(i in a2 ) {
					if( a2.hasOwnProperty(i)) {
						var val = $('input[name="'+i+'"]:checked',frmtb).val();
						postdata[i] = (val !== undefined) ? val : a2[i];
						if($t.p.autoencode) {
							postdata[i] = $.jgrid.htmlEncode(postdata[i]);
						}
					}
				}
				return true;
			}
			function createData(rowid,obj,tb,maxcols){
				var nm, hc,trdata, cnt=0,tmp, dc,elc, retpos=[], ind=false,
				tdtmpl = "<td class='CaptionTD'></td><td class='DataTD'></td>", tmpl="", i, ffld; //*2
				for (i =1; i<=maxcols;i++) {
					tmpl += tdtmpl;
				}
				if(rowid !== '_empty') {
					ind = $(obj).jqGrid("getInd",rowid);
				}
				$(obj.p.colModel).each( function(i) {
					nm = this.name;
					// hidden fields are included in the form
					if(this.editrules && this.editrules.edithidden === true) {
						hc = false;
					} else {
						hc = this.hidden === true ? true : false;
					}
					dc = hc ? "style='display:none'" : "";
					if ( nm !== 'cb' && nm !== 'subgrid' && this.editable===true && nm !== 'rn' && nm!=='sc') {
						if(ind === false) {
							tmp = "";
						} else {
							if(nm === obj.p.ExpandColumn && obj.p.treeGrid === true) {
								tmp = $("td[role='gridcell']",obj.rows[ind]).eq( i ).text();
							} else {
								try {
									tmp =  $.unformat.call(obj, $("td[role='gridcell']",obj.rows[ind]).eq( i ),{rowId:rowid, colModel:this},i);
								} catch (_) {
									tmp =  (this.edittype && this.edittype === "textarea") ? $("td[role='gridcell']",obj.rows[ind]).eq( i ).text() : $("td[role='gridcell']",obj.rows[ind]).eq( i ).html();
								}
								if(!tmp || tmp === "&nbsp;" || tmp === "&#160;" || (tmp.length===1 && tmp.charCodeAt(0)===160) ) {tmp='';}
							}
						}
						var opt = $.extend({}, this.editoptions || {} ,{id:nm,name:nm, rowId: rowid, oper:frmoper, module : 'form', checkUpdate : rp_ge[$t.p.id].checkOnSubmit || rp_ge[$t.p.id].checkOnUpdate}),
						frmopt = $.extend({}, {elmprefix:'',elmsuffix:'',rowabove:false,rowcontent:''}, this.formoptions || {}),
						rp = parseInt(frmopt.rowpos,10) || cnt+1,
						cp = parseInt((parseInt(frmopt.colpos,10) || 1)*2,10);
						if(rowid === "_empty" && opt.defaultValue ) {
							tmp = $.jgrid.isFunction(opt.defaultValue) ? opt.defaultValue.call($t) : opt.defaultValue;
						}
						if(!this.edittype) {
							this.edittype = "text";
						}
						if($t.p.autoencode) {
							tmp = $.jgrid.htmlDecode(tmp);
						}
						elc = $.jgrid.createEl.call($t,this.edittype,opt,tmp,false,$.extend({},$.jgrid.ajaxOptions,obj.p.ajaxSelectOptions || {}));
						//if(tmp === "" && this.edittype == "checkbox") {tmp = $(elc).attr("offval");}
						//if(tmp === "" && this.edittype == "select") {tmp = $("option:eq(0)",elc).text();}
						if(this.edittype === "select") {
							tmp = $(elc).val();
							if($(elc).get(0).type === 'select-multiple' && tmp) {
								tmp = tmp.join(",");
							}
						}
						if(this.edittype === 'checkbox') {
							if($(elc).is(":checked")) {
								tmp= $(elc).val();
							} else {
								tmp = $(elc).attr("offval");
							}
						}
						$(elc).addClass("FormElement");
						if(this.edittype === 'select') {
							$(elc).addClass( styles.selectClass );
						} else 	if( $.inArray(this.edittype, 
							['text','textarea','password', 
							'color', 'date', 'datetime', 'datetime-local','email','month',
							'number','range', 'search', 'tel', 'time', 'url','week'] ) > -1) {
							$(elc).addClass( styles.inputClass );
						}
						ffld = true;
						if(templ) {
							var ftmplfld = $(frm).find("#"+nm);
							if(ftmplfld.length){
								ftmplfld.replaceWith( elc );
							} else {
								ffld = false;
							}
						} else {
							//--------------------
							trdata = $(tb).find("tr[rowpos="+rp+"]");
							if(frmopt.rowabove) {
								var newdata = $("<tr><td class='contentinfo' colspan='"+(maxcols*2)+"'>"+frmopt.rowcontent+"</td></tr>");
								$(tb).append(newdata);
								newdata[0].rp = rp;
							}
							if ( trdata.length===0 ) {
								if(maxcols > 1) {
									trdata = $("<tr rowpos='"+rp+"'></tr>").addClass("FormData").attr("id","tr_"+nm);
								} else {
									trdata = $("<tr "+dc+" rowpos='"+rp+"'></tr>").addClass("FormData").attr("id","tr_"+nm);
								}
								$(trdata).append(tmpl);
								$(tb).append(trdata);
								trdata[0].rp = rp;
							}
							$("td",trdata[0]).eq( cp-2 ).html("<label for='"+nm+"'>"+ (frmopt.label === undefined ? obj.p.colNames[i]: frmopt.label) + "</label>");
							$("td",trdata[0]).eq( cp-1 ).append(frmopt.elmprefix).append(elc).append(frmopt.elmsuffix);
							if( maxcols > 1 && hc) {
								$("td",trdata[0]).eq( cp-2 ).hide();
								$("td",trdata[0]).eq( cp-1 ).hide();
							}
							//-------------------------
						}
						if( (rp_ge[$t.p.id].checkOnSubmit || rp_ge[$t.p.id].checkOnUpdate) && ffld) {
							$t.p.savedData[nm] = tmp;
						}
						if(this.edittype==='custom' && $.jgrid.isFunction(opt.custom_value) ) {
							opt.custom_value.call($t, $("#"+nm, elc),'set',tmp);
						}
						$.jgrid.bindEv.call($t, elc, opt);
						retpos[cnt] = i;
						cnt++;
					}
				});
				if( cnt > 0) {
					var idrow;
					if(templ) {
						idrow = "<div class='FormData' style='display:none'><input class='FormElement' id='id_g' type='text' name='"+obj.p.id+"_id' value='"+rowid+"'/>";
						$(frm).append(idrow);
					} else {
						idrow = $("<tr class='FormData' style='display:none'><td class='CaptionTD'></td><td colspan='"+ (maxcols*2-1)+"' class='DataTD'><input class='FormElement' id='id_g' type='text' name='"+obj.p.id+"_id' value='"+rowid+"'/></td></tr>");
						idrow[0].rp = cnt+999;
						$(tb).append(idrow);
					} 
					//$(tb).append(idrow);
					if(rp_ge[$t.p.id].checkOnSubmit || rp_ge[$t.p.id].checkOnUpdate) {
						$t.p.savedData[obj.p.id+"_id"] = rowid;
					}
				}			
				return retpos;
			}
			function fillData(rowid,obj,fmid){
				var nm,cnt=0,tmp, fld,opt,vl,vlc;
				if(rp_ge[$t.p.id].checkOnSubmit || rp_ge[$t.p.id].checkOnUpdate) { 
					$t.p.savedData = {};
					$t.p.savedData[obj.p.id+"_id"]=rowid;
				}
				var cm = obj.p.colModel;
				if(rowid === '_empty') {
					$(cm).each(function(){
						nm = this.name;
						opt = $.extend({}, this.editoptions || {} );
						fld = $("#"+$.jgrid.jqID(nm),fmid);
						if(fld && fld.length && fld[0] !== null) {
							vl = "";
							if(this.edittype === 'custom' && $.jgrid.isFunction(opt.custom_value)) {
								opt.custom_value.call($t, $("#"+nm,fmid),'set',vl);
							} else if(opt.defaultValue ) {
								vl = $.jgrid.isFunction(opt.defaultValue) ? opt.defaultValue.call($t) : opt.defaultValue;
								if(fld[0].type==='checkbox') {
									vlc = vl.toLowerCase();
									if(vlc.search(/(false|f|0|no|n|off|undefined)/i)<0 && vlc!=="") {
										fld[0].checked = true;
										fld[0].defaultChecked = true;
										fld[0].value = vl;
									} else {
										fld[0].checked = false;
										fld[0].defaultChecked = false;
									}
								} else {fld.val(vl);}
							} else {
								if( fld[0].type==='checkbox' ) {
									fld[0].checked = false;
									fld[0].defaultChecked = false;
									vl = $(fld).attr("offval");
								} else if (fld[0].type && fld[0].type.substr(0,6)==='select') {
									fld[0].selectedIndex = 0;
								} else {
									fld.val(vl);
								}
							}
							if(rp_ge[$t.p.id].checkOnSubmit===true || rp_ge[$t.p.id].checkOnUpdate) {
								$t.p.savedData[nm] = vl;
							}
						}
					});
					$("#id_g",fmid).val(rowid);
					return;
				}
				var tre = $(obj).jqGrid("getInd",rowid,true);
				if(!tre) {return;}
				$('td[role="gridcell"]',tre).each( function(i) {
					nm = cm[i].name;
					// hidden fields are included in the form
					if ( nm !== 'cb' && nm !== 'subgrid' && nm !== 'rn' && cm[i].editable===true && nm !== 'sc') {
						if(nm === obj.p.ExpandColumn && obj.p.treeGrid === true) {
							tmp = $(this).text();
						} else {
							try {
								tmp =  $.unformat.call(obj, $(this),{rowId:rowid, colModel:cm[i]},i);
							} catch (_) {
								tmp = cm[i].edittype==="textarea" ? $(this).text() : $(this).html();
							}
						}
						if($t.p.autoencode) {tmp = $.jgrid.htmlDecode(tmp);}
						if(rp_ge[$t.p.id].checkOnSubmit===true || rp_ge[$t.p.id].checkOnUpdate) { 
							$t.p.savedData[nm] = tmp;
						}
						nm = $.jgrid.jqID(nm);
						switch (cm[i].edittype) {
							case "select":
								var opv = tmp.split(",");
								opv = $.map(opv,function(n){return $.jgrid.trim(n);});
								$("#"+nm+" option",fmid).each(function(){
									if (!cm[i].editoptions.multiple && ($.jgrid.trim(tmp) === $.jgrid.trim($(this).text()) || opv[0] === $.jgrid.trim($(this).text()) || opv[0] === $.jgrid.trim($(this).val())) ){
										this.selected= true;
									} else if (cm[i].editoptions.multiple){
										if(  $.inArray($.jgrid.trim($(this).text()), opv ) > -1 || $.inArray($.jgrid.trim($(this).val()), opv ) > -1  ){
											this.selected = true;
										}else{
											this.selected = false;
										}
									} else {
										this.selected = false;
									}
								});
								if(rp_ge[$t.p.id].checkOnSubmit===true || rp_ge[$t.p.id].checkOnUpdate) {
									tmp = $("#"+nm,fmid).val();
									if(cm[i].editoptions.multiple) {
										tmp = tmp.join(",");
									}
									$t.p.savedData[nm] = tmp;
								}
								break;
							case "checkbox":
								tmp = String(tmp);
								if(cm[i].editoptions && cm[i].editoptions.value) {
									var cb = cm[i].editoptions.value.split(":");
									if(cb[0] === tmp) {
										$("#"+nm, fmid)[$t.p.useProp ? 'prop': 'attr']({"checked":true, "defaultChecked" : true});
									} else {
										$("#"+nm, fmid)[$t.p.useProp ? 'prop': 'attr']({"checked":false, "defaultChecked" : false});
									}
								} else {
									tmp = tmp.toLowerCase();
									if(tmp.search(/(false|f|0|no|n|off|undefined)/i)<0 && tmp!=="") {
										$("#"+nm, fmid)[$t.p.useProp ? 'prop': 'attr']("checked",true);
										$("#"+nm, fmid)[$t.p.useProp ? 'prop': 'attr']("defaultChecked",true); //ie
									} else {
										$("#"+nm, fmid)[$t.p.useProp ? 'prop': 'attr']("checked", false);
										$("#"+nm, fmid)[$t.p.useProp ? 'prop': 'attr']("defaultChecked", false); //ie
									}
								}
								if(rp_ge[$t.p.id].checkOnSubmit===true || rp_ge[$t.p.id].checkOnUpdate) {
									if($("#"+nm, fmid).is(":checked")) {
										tmp = $("#"+nm, fmid).val();
									} else {
										tmp = $("#"+nm, fmid).attr("offval");
									}
									$t.p.savedData[nm] = tmp;
								}
								break;
							case 'custom' :
								try {
									if(cm[i].editoptions && $.jgrid.isFunction(cm[i].editoptions.custom_value)) {
										cm[i].editoptions.custom_value.call($t, $("#"+nm, fmid),'set',tmp);
									} else {throw "e1";}
								} catch (e) {
									if (e==="e1") {$.jgrid.info_dialog(errors.errcap,"function 'custom_value' "+rp_ge[$(this)[0]].p.msg.nodefined,$.rp_ge[$(this)[0]].p.bClose, {styleUI : rp_ge[$(this)[0]].p.styleUI });}
									else {$.jgrid.info_dialog(errors.errcap,e.message,$.rp_ge[$(this)[0]].p.bClose, {styleUI : rp_ge[$(this)[0]].p.styleUI });}
								}
								break;
							default :
								if(tmp === "&nbsp;" || tmp === "&#160;" || (tmp.length===1 && tmp.charCodeAt(0)===160) ) {tmp='';}
								$("#"+nm,fmid).val(tmp);
						}
						cnt++;
					}
				});
				if(cnt>0) {
					$("#id_g",frmtb).val(rowid);
					if( rp_ge[$t.p.id].checkOnSubmit===true || rp_ge[$t.p.id].checkOnUpdate ) {
						$t.p.savedData[obj.p.id+"_id"] = rowid;
					}
				}
			}
			function setNulls() {
				$.each($t.p.colModel, function(i,n){
					if(n.editoptions && n.editoptions.NullIfEmpty === true) {
						if(postdata.hasOwnProperty(n.name) && postdata[n.name] === "") {
							postdata[n.name] = 'null';
						}
					}
				});
			}
			function postIt() {
				var copydata, ret=[true,"",""], onCS = {}, opers = $t.p.prmNames, idname, oper, key, selr, i, url;
				
				var retvals = $($t).triggerHandler("jqGridAddEditBeforeCheckValues", [postdata, $(frmgr), frmoper]);
				if(retvals && typeof retvals === 'object') {postdata = retvals;}
				
				if($.jgrid.isFunction(rp_ge[$t.p.id].beforeCheckValues)) {
					retvals = rp_ge[$t.p.id].beforeCheckValues.call($t, postdata, $(frmgr),frmoper);
					if(retvals && typeof retvals === 'object') {postdata = retvals;}
				}
				if(rp_ge[$t.p.id].html5Check) {
					if( !$.jgrid.validateForm(frm[0]) ) {
						return false;
					}
				}
				for( key in postdata ){
					if(postdata.hasOwnProperty(key)) {
						ret = $.jgrid.checkValues.call($t,postdata[key],key);
						if(ret[0] === false) {break;}
					}
				}
				setNulls();
				if(ret[0]) {
					onCS = $($t).triggerHandler("jqGridAddEditClickSubmit", [rp_ge[$t.p.id], postdata, frmoper]);
					if( onCS === undefined && $.jgrid.isFunction( rp_ge[$t.p.id].onclickSubmit)) { 
						onCS = rp_ge[$t.p.id].onclickSubmit.call($t, rp_ge[$t.p.id], postdata, frmoper) || {}; 
					}
					ret = $($t).triggerHandler("jqGridAddEditBeforeSubmit", [postdata, $(frmgr), frmoper]);
					if(ret === undefined) {
						ret = [true,"",""];
					}
					if( ret[0] && $.jgrid.isFunction(rp_ge[$t.p.id].beforeSubmit))  {
						ret = rp_ge[$t.p.id].beforeSubmit.call($t,postdata,$(frmgr), frmoper);
					}
				}

				if(ret[0] && !rp_ge[$t.p.id].processing) {
					rp_ge[$t.p.id].processing = true;
					$("#sData", frmtb+"_2").addClass( commonstyle.active );
					url = rp_ge[$t.p.id].url || $($t).jqGrid('getGridParam','editurl');
					oper = opers.oper;
					idname = url === 'clientArray' ? $t.p.keyName : opers.id;
					// we add to pos data array the action - the name is oper
					postdata[oper] = ($.jgrid.trim(postdata[$t.p.id+"_id"]) === "_empty") ? opers.addoper : opers.editoper;
					if(postdata[oper] !== opers.addoper) {
						postdata[idname] = postdata[$t.p.id+"_id"];
					} else {
						// check to see if we have allredy this field in the form and if yes lieve it
						if( postdata[idname] === undefined ) {postdata[idname] = postdata[$t.p.id+"_id"];}
					}
					delete postdata[$t.p.id+"_id"];
					postdata = $.extend(postdata,rp_ge[$t.p.id].editData,onCS);
					if($t.p.treeGrid === true)  {
						if(postdata[oper] === opers.addoper) {
						selr = $($t).jqGrid("getGridParam", 'selrow');
							var tr_par_id = $t.p.treeGridModel === 'adjacency' ? $t.p.treeReader.parent_id_field : 'parent_id';
							postdata[tr_par_id] = selr;
						}
						for(i in $t.p.treeReader){
							if($t.p.treeReader.hasOwnProperty(i)) {
								var itm = $t.p.treeReader[i];
								if(postdata.hasOwnProperty(itm)) {
									if(postdata[oper] === opers.addoper && i === 'parent_id_field') {continue;}
									delete postdata[itm];
								}
							}
						}
					}
					
					postdata[idname] = $.jgrid.stripPref($t.p.idPrefix, postdata[idname]);
					var ajaxOptions = $.extend({
						url: url,
						type: rp_ge[$t.p.id].mtype,
						data: $.jgrid.isFunction(rp_ge[$t.p.id].serializeEditData) ? rp_ge[$t.p.id].serializeEditData.call($t,postdata) :  postdata,
						complete:function(data,status){
							var key;
							$("#sData", frmtb+"_2").removeClass( commonstyle.active );
							postdata[idname] = $t.p.idPrefix + postdata[idname];
							if(data.status >= 300 && data.status !== 304) {
								ret[0] = false;
								ret[1] = $($t).triggerHandler("jqGridAddEditErrorTextFormat", [data, frmoper]);
								if ($.jgrid.isFunction(rp_ge[$t.p.id].errorTextFormat)) {
									ret[1] = rp_ge[$t.p.id].errorTextFormat.call($t, data, frmoper);
								} else {
									ret[1] = status + " Status: '" + data.statusText + "'. Error code: " + data.status;
								}
							} else {
								// data is posted successful
								// execute aftersubmit with the returned data from server
								ret = $($t).triggerHandler("jqGridAddEditAfterSubmit", [data, postdata, frmoper]);
								if(ret === undefined) {
									ret = [true,"",""];
								}
								if( ret[0] && $.jgrid.isFunction(rp_ge[$t.p.id].afterSubmit) ) {
									ret = rp_ge[$t.p.id].afterSubmit.call($t, data,postdata, frmoper);
								}
							}
							if(ret[0] === false) {
								$(".FormError",frmgr).html(ret[1]);
								$(".FormError",frmgr).show();
							} else {
								if($t.p.autoencode) {
									$.each(postdata,function(n,v){
										postdata[n] = $.jgrid.htmlDecode(v);
									});
								}
								//rp_ge[$t.p.id].reloadAfterSubmit = rp_ge[$t.p.id].reloadAfterSubmit && $t.p.datatype != "local";
								// the action is add
								if(postdata[oper] === opers.addoper ) {
									//id processing
									// user not set the id ret[2]
									if(!ret[2]) {ret[2] = $.jgrid.randId();}
									if(postdata[idname] == null || postdata[idname] === ($t.p.idPrefix + "_empty") || postdata[idname] === ""){
										postdata[idname] = ret[2];
									} else {
										ret[2] = postdata[idname];
									}
									if(rp_ge[$t.p.id].reloadAfterSubmit) {
										$($t).trigger("reloadGrid");
									} else {
										if($t.p.treeGrid === true){
											$($t).jqGrid("addChildNode",ret[2],selr,postdata );
										} else {
											$($t).jqGrid("addRowData",ret[2],postdata,p.addedrow);
										}
									}
									if(rp_ge[$t.p.id].closeAfterAdd) {
										if($t.p.treeGrid !== true){
											$($t).jqGrid("setSelection",ret[2]);
										}
										$.jgrid.hideModal("#"+$.jgrid.jqID(IDs.themodal),{gb:"#gbox_"+$.jgrid.jqID(gID),jqm:p.jqModal,onClose: rp_ge[$t.p.id].onClose, removemodal: rp_ge[$t.p.id].removemodal, formprop: !rp_ge[$t.p.id].recreateForm, form: rp_ge[$t.p.id].form});
									} else if (rp_ge[$t.p.id].clearAfterAdd) {
										fillData("_empty", $t, frmgr);
									}
								} else {
									// the action is update
									if(rp_ge[$t.p.id].reloadAfterSubmit) {
										$($t).trigger("reloadGrid");
										if( !rp_ge[$t.p.id].closeAfterEdit ) {setTimeout(function(){$($t).jqGrid("setSelection",postdata[idname]);},1000);}
									} else {
										if($t.p.treeGrid === true) {
											$($t).jqGrid("setTreeRow", postdata[idname],postdata);
										} else {
											$($t).jqGrid("setRowData", postdata[idname],postdata);
										}
									}
									if(rp_ge[$t.p.id].closeAfterEdit) {$.jgrid.hideModal("#"+$.jgrid.jqID(IDs.themodal),{gb:"#gbox_"+$.jgrid.jqID(gID),jqm:p.jqModal,onClose: rp_ge[$t.p.id].onClose, removemodal: rp_ge[$t.p.id].removemodal, formprop: !rp_ge[$t.p.id].recreateForm, form: rp_ge[$t.p.id].form});}
								}
								if( $.jgrid.isFunction(rp_ge[$t.p.id].afterComplete) || Object.prototype.hasOwnProperty.call($._data( $($t)[0], 'events' ), 'jqGridAddEditAfterComplete') ) {
									copydata = data;
									setTimeout(function(){
										$($t).triggerHandler("jqGridAddEditAfterComplete", [copydata, postdata, $(frmgr), frmoper]);
										try { 
											rp_ge[$t.p.id].afterComplete.call($t, copydata, postdata, $(frmgr), frmoper);
										} catch(excacmp) {
											//do nothing
										}
										copydata=null;
									},500);
								}
								if(rp_ge[$t.p.id].checkOnSubmit || rp_ge[$t.p.id].checkOnUpdate) {
									$(frmgr).data("disabled",false);
									if($t.p.savedData[$t.p.id+"_id"] !== "_empty"){
										for(key in $t.p.savedData) {
											if($t.p.savedData.hasOwnProperty(key) && postdata[key]) {
												$t.p.savedData[key] = postdata[key];
											}
										}
									}
								}
							}
							rp_ge[$t.p.id].processing=false;
							try{$(':input:visible',frmgr)[0].focus();} catch (e){}
						}
					}, $.jgrid.ajaxOptions, rp_ge[$t.p.id].ajaxEditOptions );

					if (!ajaxOptions.url && !rp_ge[$t.p.id].useDataProxy) {
						if ($.jgrid.isFunction($t.p.dataProxy)) {
							rp_ge[$t.p.id].useDataProxy = true;
						} else {
							ret[0]=false;ret[1] += " "+errors.nourl;
						}
					}
					if (ret[0]) {
						if (rp_ge[$t.p.id].useDataProxy) {
							var dpret = $t.p.dataProxy.call($t, ajaxOptions, "set_"+$t.p.id); 
							if(dpret === undefined) {
								dpret = [true, ""];
							}
							if(dpret[0] === false ) {
								ret[0] = false;
								ret[1] = dpret[1] || "Error deleting the selected row!" ;
							} else {
								if(ajaxOptions.data.oper === opers.addoper && rp_ge[$t.p.id].closeAfterAdd ) {
									$.jgrid.hideModal("#"+$.jgrid.jqID(IDs.themodal),{gb:"#gbox_"+$.jgrid.jqID(gID),jqm:p.jqModal, onClose: rp_ge[$t.p.id].onClose, removemodal: rp_ge[$t.p.id].removemodal, formprop: !rp_ge[$t.p.id].recreateForm, form: rp_ge[$t.p.id].form});
								}
								if(ajaxOptions.data.oper === opers.editoper && rp_ge[$t.p.id].closeAfterEdit ) {
									$.jgrid.hideModal("#"+$.jgrid.jqID(IDs.themodal),{gb:"#gbox_"+$.jgrid.jqID(gID),jqm:p.jqModal, onClose: rp_ge[$t.p.id].onClose, removemodal: rp_ge[$t.p.id].removemodal, formprop: !rp_ge[$t.p.id].recreateForm, form: rp_ge[$t.p.id].form});
								}
							}
						} else {
							if(ajaxOptions.url === "clientArray") {
								rp_ge[$t.p.id].reloadAfterSubmit = false;
								postdata = ajaxOptions.data;
								ajaxOptions.complete({status:200, statusText:''},'');
							} else {
								$.ajax(ajaxOptions); 
							}
						}
					}
				}
				if(ret[0] === false) {
					$(frmgr).scrollTop(0);
					$(".FormError",frmgr).html(ret[1]);
					$(".FormError",frmgr).show();
					// return;
				}
			}
			function compareData(nObj, oObj ) {
				var ret = false,key;
				ret = !( $.isPlainObject(nObj) && $.isPlainObject(oObj) && Object.getOwnPropertyNames(nObj).length === Object.getOwnPropertyNames(oObj).length);
				if(!ret) {
					for (key in oObj) {
						if(oObj.hasOwnProperty(key) )  {
							if(nObj.hasOwnProperty(key) ) {
								if( nObj[key] !== oObj[key] ) {
									ret = true;
									break;
								}
							} else {
								ret = true;
								break;
							}
						}
					}
				}
				return ret;
			}
			function checkUpdates () {
				var stat = true;
				$(".FormError",frmgr).hide();
				if(rp_ge[$t.p.id].checkOnUpdate) {
					postdata = {};
					getFormData();
					diff = compareData(postdata, $t.p.savedData);
					if(diff) {
						$(frmgr).data("disabled",true);
						$(".confirm","#"+IDs.themodal).show();
						stat = false;
					}
				}
				return stat;
			}
			function restoreInline() {
				var i;
				if (rowid !== "_empty" && $t.p.savedRow !== undefined && $t.p.savedRow.length > 0 && $.jgrid.isFunction($.fn.jqGrid.restoreRow)) {
					for (i=0;i<$t.p.savedRow.length;i++) {
						if ($t.p.savedRow[i].id === rowid) {
							$($t).jqGrid('restoreRow',rowid);
							break;
						}
					}
				}
			}
			function updateNav(cr, posarr){
				var totr = posarr[1].length-1;
				if (cr===0) {
					$("#pData",frmtb2).addClass( commonstyle.disabled );
				} else if( posarr[1][cr-1] !== undefined && $("#"+$.jgrid.jqID(posarr[1][cr-1])).hasClass( commonstyle.disabled )) {
						$("#pData",frmtb2).addClass( commonstyle.disabled );
				} else {
					$("#pData",frmtb2).removeClass( commonstyle.disabled );
				}
				
				if (cr===totr) {
					$("#nData",frmtb2).addClass( commonstyle.disabled );
				} else if( posarr[1][cr+1] !== undefined && $("#"+$.jgrid.jqID(posarr[1][cr+1])).hasClass( commonstyle.disabled )) {
					$("#nData",frmtb2).addClass( commonstyle.disabled );
				} else {
					$("#nData",frmtb2).removeClass( commonstyle.disabled );
				}
			}
			function getCurrPos() {
				var rowsInGrid =  $($t).jqGrid("getDataIDs"),
				selrow = $("#id_g",frmtb).val(), pos;
				if($t.p.multiselect && rp_ge[$t.p.id].editselected) {
					var arr = [];
					for(var i=0, len = rowsInGrid.length;i<len;i++) {
						if($.inArray(rowsInGrid[i],$t.p.selarrrow) !== -1) {
							arr.push(rowsInGrid[i]);
						}
					}
					pos = $.inArray(selrow,arr);
					return [pos, arr];
				} else {
					pos = $.inArray(selrow,rowsInGrid);
				}
				return [pos,rowsInGrid];
			}
			function parseTemplate ( template ){
				var   tmpl ="";
				if(typeof template === "string") {
					tmpl = template.replace(/\{([\w\-]+)(?:\:([\w\.]*)(?:\((.*?)?\))?)?\}/g, function(m,i){
						return '<span id="'+ i+ '" ></span>';
					});
				}
				return tmpl;
			}
			function syncSavedData () {
				if(rp_ge[$t.p.id].checkOnSubmit || rp_ge[$t.p.id].checkOnUpdate) {

					var a1=[], a2={};
					a1 = $.map($t.p.savedData, function(v, i){
						return i;
					});
					$(".FormElement", frm ).each(function(){
						if( $.jgrid.trim(this.name) !== "" && a1.indexOf(this.name) === -1 ) {
							var tv = $(this).val(), tt = $(this).get(0).type;
							if( tt === 'checkbox') {
								if(!$(this).is(":checked")) {
									tv = $(this).attr("offval");
								}
							} else if(tt === 'select-multiple') {
								tv = tv.join(",");
							} else if(tt === 'radio') {
								if(a2.hasOwnProperty(this.name)) {
									return true;
								} else {
									a2[this.name] = ($(this).attr("offval") === undefined) ? "off" : $(this).attr("offval");
								}
							}
							$t.p.savedData[this.name] = tv;
						}
					});
					for(var i in a2 ) {
						if( a2.hasOwnProperty(i)) {
							var val = $('input[name="'+i+'"]:checked',frm).val();
							$t.p.savedData[i] = (val !== undefined) ? val : a2[i];
						}
					}
				}
			}
			var dh = isNaN(rp_ge[$(this)[0].p.id].dataheight) ? rp_ge[$(this)[0].p.id].dataheight : rp_ge[$(this)[0].p.id].dataheight+"px",
			dw = isNaN(rp_ge[$(this)[0].p.id].datawidth) ? rp_ge[$(this)[0].p.id].datawidth : rp_ge[$(this)[0].p.id].datawidth+"px",
			frm = $("<form name='FormPost' id='"+frmgr+"' class='FormGrid' onSubmit='return false;' style='width:"+dw+";height:"+dh+";'></form>").data("disabled",false),
			tbl;
			if(templ) {
				tbl = parseTemplate( rp_ge[$(this)[0].p.id].template );
				frmtb2 = frmtb;
			} else {
				tbl = $("<table id='"+frmtborg+"' class='EditTable ui-common-table'><tbody></tbody></table>");
				frmtb2 = frmtb+"_2";
			}
			frmgr = "#"+ $.jgrid.jqID(frmgr);
			// errors
			$(frm).append("<div class='FormError " + commonstyle.error + "' style='display:none;'></div>" );
			// topinfo
			$(frm).append("<div class='tinfo topinfo'>"+rp_ge[$t.p.id].topinfo+"</div>");

			$($t.p.colModel).each( function() {
				var fmto = this.formoptions;
				maxCols = Math.max(maxCols, fmto ? fmto.colpos || 0 : 0 );
				maxRows = Math.max(maxRows, fmto ? fmto.rowpos || 0 : 0 );
			});
			$(frm).append(tbl);

			showFrm = $($t).triggerHandler("jqGridAddEditBeforeInitData", [frm, frmoper]);
			if(showFrm === undefined) {
				showFrm = true;
			}
			if(showFrm && $.jgrid.isFunction(rp_ge[$t.p.id].beforeInitData)) {
				showFrm = rp_ge[$t.p.id].beforeInitData.call($t,frm, frmoper);
			}
			if(showFrm === false) {return;}

			restoreInline();
			// set the id.
			// use carefull only to change here colproperties.
			// create data
			createData(rowid,$t,tbl,maxCols);
			// buttons at footer
			var rtlb = $t.p.direction === "rtl" ? true :false,
			bp = rtlb ? "nData" : "pData",
			bn = rtlb ? "pData" : "nData";
			var bP = "<a id='"+bp+"' class='fm-button " + commonstyle.button + "'><span class='" + commonstyle.icon_base + " " + styles.icon_prev+ "'></span></a>",
			bN = "<a id='"+bn+"' class='fm-button " + commonstyle.button + "'><span class='" + commonstyle.icon_base + " " + styles.icon_next+ "'></span></a>",
			bS  ="<a id='sData' class='fm-button " + commonstyle.button + "'>"+p.bSubmit+"</a>",
			bC  ="<a id='cData' class='fm-button " + commonstyle.button + "'>"+p.bCancel+"</a>",
			user_buttons = ( Array.isArray( rp_ge[$t.p.id].buttons ) ? $.jgrid.buildButtons( rp_ge[$t.p.id].buttons, bS + bC, commonstyle ) : bS + bC );
			var bt = "<table style='height:auto' class='EditTable ui-common-table' id='"+frmtborg+"_2'><tbody><tr><td colspan='2'><hr class='"+commonstyle.content+"' style='margin:1px'/></td></tr><tr id='Act_Buttons'><td class='navButton'>"+(rtlb ? bN+bP : bP+bN)+"</td><td class='EditButton'>"+ user_buttons +"</td></tr>";
			//bt += "<tr style='display:none' class='binfo'><td class='bottominfo' colspan='2'>"+rp_ge[$t.p.id].bottominfo+"</td></tr>";
			bt += "</tbody></table>";
			if(maxRows >  0) {
				var sd=[];
				$.each($(tbl)[0].rows,function(i,r){
					sd[i] = r;
				});
				sd.sort(function(a,b){
					if(a.rp > b.rp) {return 1;}
					if(a.rp < b.rp) {return -1;}
					return 0;
				});
				$.each(sd, function(index, row) {
					$('tbody',tbl).append(row);
				});
			}
			p.gbox = "#gbox_"+$.jgrid.jqID(gID);
			var cle = false;
			if(p.closeOnEscape===true){
				p.closeOnEscape = false;
				cle = true;
			}
			var tms;
			if(templ) {
				$(frm).find("#pData").replaceWith( bP );
				$(frm).find("#nData").replaceWith( bN );
				$(frm).find("#sData").replaceWith( bS );
				$(frm).find("#cData").replaceWith( bC );
				tms = $("<div id="+frmtborg+"></div>").append(frm);
			} else {
				tms = $("<div></div>").append(frm).append(bt);
			}
			
			$(frm).append("<div class='binfo topinfo bottominfo'>"+rp_ge[$t.p.id].bottominfo+"</div>");
			var fs =  $('.ui-jqgrid').css('font-size') || '11px';
			$.jgrid.createModal(IDs, tms, rp_ge[$(this)[0].p.id], "#gview_"+$.jgrid.jqID($t.p.id), $("#gbox_"+$.jgrid.jqID($t.p.id))[0], null, {"font-size": fs});

			if(rtlb) {
				$("#pData, #nData",frmtb+"_2").css("float","right");
				$(".EditButton",frmtb+"_2").css("text-align","left");
			}

			if(rp_ge[$t.p.id].topinfo) {$(".tinfo", frmgr).show();}
			if(rp_ge[$t.p.id].bottominfo) {$(".binfo",frmgr).show();}

			tms = null;bt=null;
			$("#"+$.jgrid.jqID(IDs.themodal)).keydown( function( e ) {
				var wkey = e.target;
				if ($(frmgr).data("disabled")===true ) {return false;}//??
				if(rp_ge[$t.p.id].savekey[0] === true && e.which === rp_ge[$t.p.id].savekey[1]) { // save
					if(wkey.tagName !== "TEXTAREA") {
						$("#sData", frmtb+"_2").trigger("click");
						return false;
					}
				}
				if(e.which === 27) {
					if(!checkUpdates()) {return false;}
					if(cle)	{$.jgrid.hideModal("#"+$.jgrid.jqID(IDs.themodal),{gb:p.gbox,jqm:p.jqModal, onClose: rp_ge[$t.p.id].onClose, removemodal: rp_ge[$t.p.id].removemodal, formprop: !rp_ge[$t.p.id].recreateForm, form: rp_ge[$t.p.id].form});}
					return false;
				}
				if(rp_ge[$t.p.id].navkeys[0]===true) {
					if($("#id_g",frmtb).val() === "_empty") {return true;}
					if(e.which === rp_ge[$t.p.id].navkeys[1]){ //up
						$("#pData", frmtb2).trigger("click");
						return false;
					}
					if(e.which === rp_ge[$t.p.id].navkeys[2]){ //down
						$("#nData", frmtb2).trigger("click");
						return false;
					}
				}
			});
			if(p.checkOnUpdate) {
				$("a.ui-jqdialog-titlebar-close span","#"+$.jgrid.jqID(IDs.themodal)).removeClass("jqmClose");
				$("a.ui-jqdialog-titlebar-close","#"+$.jgrid.jqID(IDs.themodal)).off("click")
				.click(function(){
					if(!checkUpdates()) {return false;}
					$.jgrid.hideModal("#"+$.jgrid.jqID(IDs.themodal),{gb:"#gbox_"+$.jgrid.jqID(gID),jqm:p.jqModal,onClose: rp_ge[$t.p.id].onClose, removemodal: rp_ge[$t.p.id].removemodal, formprop: !rp_ge[$t.p.id].recreateForm, form: rp_ge[$t.p.id].form});
					return false;
				});
			}
			p.saveicon = $.extend([true,"left", styles.icon_save ],p.saveicon);
			p.closeicon = $.extend([true,"left", styles.icon_close ],p.closeicon);
			// beforeinitdata after creation of the form
			if(p.saveicon[0]===true) {
				$("#sData",frmtb2).addClass(p.saveicon[1] === "right" ? 'fm-button-icon-right' : 'fm-button-icon-left')
				.append("<span class='"+commonstyle.icon_base + " " +p.saveicon[2]+"'></span>");
			}
			if(p.closeicon[0]===true) {
				$("#cData",frmtb2).addClass(p.closeicon[1] === "right" ? 'fm-button-icon-right' : 'fm-button-icon-left')
				.append("<span class='" + commonstyle.icon_base +" "+p.closeicon[2]+"'></span>");
			}
			if(rp_ge[$t.p.id].checkOnSubmit || rp_ge[$t.p.id].checkOnUpdate) {
				bS  ="<a id='sNew' class='fm-button "+commonstyle.button + "' style='z-index:1002'>"+p.bYes+"</a>";
				bN  ="<a id='nNew' class='fm-button "+commonstyle.button + "' style='z-index:1002;margin-left:5px'>"+p.bNo+"</a>";
				bC  ="<a id='cNew' class='fm-button "+commonstyle.button + "' style='z-index:1002;margin-left:5px;'>"+p.bExit+"</a>";
				var zI = p.zIndex  || 999;zI ++;
				$("#"+IDs.themodal).append("<div class='"+ p.overlayClass+" jqgrid-overlay confirm' style='z-index:"+zI+";display:none;position:absolute;'>&#160;"+"</div><div class='confirm ui-jqconfirm "+commonstyle.content+"' style='z-index:"+(zI+1)+"'>"+p.saveData+"<br/><br/>"+bS+bN+bC+"</div>");
				$("#sNew","#"+$.jgrid.jqID(IDs.themodal)).click(function(){
					postIt();
					$(frmgr).data("disabled",false);
					$(".confirm","#"+$.jgrid.jqID(IDs.themodal)).hide();
					return false;
				});
				$("#nNew","#"+$.jgrid.jqID(IDs.themodal)).click(function(){
					$(".confirm","#"+$.jgrid.jqID(IDs.themodal)).hide();
					$(frmgr).data("disabled",false);
					setTimeout(function(){$(":input:visible",frmgr)[0].focus();},0);
					return false;
				});
				$("#cNew","#"+$.jgrid.jqID(IDs.themodal)).click(function(){
					$(".confirm","#"+$.jgrid.jqID(IDs.themodal)).hide();
					$(frmgr).data("disabled",false);
					$.jgrid.hideModal("#"+$.jgrid.jqID(IDs.themodal),{gb:"#gbox_"+$.jgrid.jqID(gID),jqm:p.jqModal,onClose: rp_ge[$t.p.id].onClose, removemodal: rp_ge[$t.p.id].removemodal, formprop: !rp_ge[$t.p.id].recreateForm, form: rp_ge[$t.p.id].form});
					return false;
				});
			}
			// here initform 
			$($t).triggerHandler("jqGridAddEditInitializeForm", [$(frmgr), frmoper]);
			if($.jgrid.isFunction(rp_ge[$t.p.id].onInitializeForm)) { rp_ge[$t.p.id].onInitializeForm.call($t,$(frmgr), frmoper);}
			if(rowid==="_empty" || !rp_ge[$t.p.id].viewPagerButtons) {$("#pData,#nData",frmtb2).hide();} else {$("#pData,#nData",frmtb2).show();}
			$($t).triggerHandler("jqGridAddEditBeforeShowForm", [$(frmgr), frmoper]);
			if($.jgrid.isFunction(rp_ge[$t.p.id].beforeShowForm)) { rp_ge[$t.p.id].beforeShowForm.call($t, $(frmgr), frmoper);}
			syncSavedData();
			$("#"+$.jgrid.jqID(IDs.themodal)).data("onClose",rp_ge[$t.p.id].onClose);
			$.jgrid.viewModal("#"+$.jgrid.jqID(IDs.themodal),{
				gbox:"#gbox_"+$.jgrid.jqID(gID),
				jqm:p.jqModal, 
				overlay: p.overlay,
				modal:p.modal, 
				overlayClass: p.overlayClass,
				focusField : p.focusField,
				onHide :  function(h) {
					var fw = $.jgrid.floatNum( $('#editmod'+gID)[0].style.width ),
						rtlsup = $("#gbox_"+$.jgrid.jqID(gID)).attr("dir") === "rtl" ? true : false;
					$($t).data("formProp", {
						top: $.jgrid.floatNum($(h.w).css("top")),
						left : rtlsup ? ( $("#gbox_"+$.jgrid.jqID(gID)).outerWidth() - fw - parseFloat($(h.w).css("left")) + 12 ) : parseFloat($(h.w).css("left")),
						width : fw,
						height : $.jgrid.floatNum( $('#editmod'+gID)[0].style.height ),
						dataheight : $(frmgr).height(),
						datawidth: $(frmgr).width()
					});
					h.w.remove();
					if(h.o) {h.o.remove();}
				}
			});
			if(!closeovrl) {
				$("." + $.jgrid.jqID(p.overlayClass)).click(function(){
					if(!checkUpdates()) {return false;}
					$.jgrid.hideModal("#"+$.jgrid.jqID(IDs.themodal),{gb:"#gbox_"+$.jgrid.jqID(gID),jqm:p.jqModal, onClose: rp_ge[$t.p.id].onClose, removemodal: rp_ge[$t.p.id].removemodal, formprop: !rp_ge[$t.p.id].recreateForm, form: rp_ge[$t.p.id].form});
					return false;
				});
			}
			$(".fm-button","#"+$.jgrid.jqID(IDs.themodal)).hover(
				function(){$(this).addClass( commonstyle.hover );},
				function(){$(this).removeClass( commonstyle.hover );}
			);
			$("#sData", frmtb2).click(function(){
				postdata = {};
				$(".FormError",frmgr).hide();
				// all depend on ret array
				//ret[0] - succes
				//ret[1] - msg if not succes
				//ret[2] - the id  that will be set if reload after submit false
				getFormData();
				if(postdata[$t.p.id+"_id"] === "_empty")	{
					postIt();
				} else if(p.checkOnSubmit===true ) {
					diff = compareData(postdata, $t.p.savedData);
					if(diff) {
						$(frmgr).data("disabled",true);
						$(".confirm","#"+$.jgrid.jqID(IDs.themodal)).show();
					} else {
						postIt();
					}
				} else {
					postIt();
				}
				return false;
			});
			$("#cData", frmtb2).click(function(){
				if(!checkUpdates()) {return false;}
				$.jgrid.hideModal("#"+$.jgrid.jqID(IDs.themodal),{gb:"#gbox_"+$.jgrid.jqID(gID),jqm:p.jqModal,onClose: rp_ge[$t.p.id].onClose, removemodal: rp_ge[$t.p.id].removemodal, formprop: !rp_ge[$t.p.id].recreateForm, form: rp_ge[$t.p.id].form});
				return false;
			});
			// user buttons bind
			$(frmtb2).find("[data-index]").each(function(){
				var index = parseInt($(this).attr('data-index'),10);
				if(index >=0 ) {
					if( p.buttons[index].hasOwnProperty('click')) {
						$(this).on('click', function(e) {
							p.buttons[index].click.call($t, $(frmgr)[0], rp_ge[$t.p.id], e);
						});
					}
				}
			});

			$("#nData", frmtb2).click(function(){
				if(!checkUpdates()) {return false;}
				$(".FormError",frmgr).hide();
				var npos = getCurrPos();
				npos[0] = parseInt(npos[0],10);
				if(npos[0] !== -1 && npos[1][npos[0]+1]) {
					$($t).triggerHandler("jqGridAddEditClickPgButtons", ['next',$(frmgr),npos[1][npos[0]]]);
					var nposret;
					if($.jgrid.isFunction(p.onclickPgButtons)) {
						nposret = p.onclickPgButtons.call($t, 'next',$(frmgr),npos[1][npos[0]]);
						if( nposret !== undefined && nposret === false ) {return false;}
					}
					if( $("#"+$.jgrid.jqID(npos[1][npos[0]+1])).hasClass( commonstyle.disabled )) {return false;}
					fillData(npos[1][npos[0]+1],$t,frmgr);
					if(!($t.p.multiselect &&  rp_ge[$t.p.id].editselected)) {
						$($t).jqGrid("setSelection",npos[1][npos[0]+1]);
					}
					$($t).triggerHandler("jqGridAddEditAfterClickPgButtons", ['next',$(frmgr),npos[1][npos[0]]]);
					if($.jgrid.isFunction(p.afterclickPgButtons)) {
						p.afterclickPgButtons.call($t, 'next',$(frmgr),npos[1][npos[0]+1]);
					}
					syncSavedData();
					updateNav(npos[0]+1,npos);
				}
				return false;
			});
			$("#pData", frmtb2).click(function(){
				if(!checkUpdates()) {return false;}
				$(".FormError",frmgr).hide();
				var ppos = getCurrPos();
				if(ppos[0] !== -1 && ppos[1][ppos[0]-1]) {
					$($t).triggerHandler("jqGridAddEditClickPgButtons", ['prev',$(frmgr),ppos[1][ppos[0]]]);
					var pposret;
					if($.jgrid.isFunction(p.onclickPgButtons)) {
						pposret = p.onclickPgButtons.call($t, 'prev',$(frmgr),ppos[1][ppos[0]]);
						if( pposret !== undefined && pposret === false ) {return false;}
					}
					if( $("#"+$.jgrid.jqID(ppos[1][ppos[0]-1])).hasClass( commonstyle.disabled )) {return false;}
					fillData(ppos[1][ppos[0]-1],$t,frmgr);
					if(!($t.p.multiselect &&  rp_ge[$t.p.id].editselected)) {
						$($t).jqGrid("setSelection",ppos[1][ppos[0]-1]);
					}
					$($t).triggerHandler("jqGridAddEditAfterClickPgButtons", ['prev',$(frmgr),ppos[1][ppos[0]]]);
					if($.jgrid.isFunction(p.afterclickPgButtons)) {
						p.afterclickPgButtons.call($t, 'prev',$(frmgr),ppos[1][ppos[0]-1]);
					}
					syncSavedData();
					updateNav(ppos[0]-1,ppos);
				}
				return false;
			});
			$($t).triggerHandler("jqGridAddEditAfterShowForm", [$(frmgr), frmoper]);
			if($.jgrid.isFunction(rp_ge[$t.p.id].afterShowForm)) { rp_ge[$t.p.id].afterShowForm.call($t, $(frmgr), frmoper); }
			var posInit =getCurrPos();
			updateNav(posInit[0],posInit);
		});
	},
	viewGridRow : function(rowid, p){
		var regional =  $.jgrid.getRegional(this[0], 'view'),
			currstyle = this[0].p.styleUI,
			styles = $.jgrid.styleUI[currstyle].formedit,
			commonstyle = $.jgrid.styleUI[currstyle].common;

		p = $.extend(true, {
			top : 0,
			left: 0,
			width: 500,
			datawidth: 'auto',
			height: 'auto',
			dataheight: 'auto',
			modal: false,
			overlay: 30,
			drag: true,
			resize: true,
			jqModal: true,
			closeOnEscape : false,
			labelswidth: 'auto',
			closeicon: [],
			navkeys: [false,38,40],
			onClose: null,
			beforeShowForm : null,
			beforeInitData : null,
			viewPagerButtons : true,
			recreateForm : false,
			removemodal: true,
			form: 'view',
			buttons : []
		}, regional, p || {});
		rp_ge[$(this)[0].p.id] = p;
		return this.each(function(){
			var $t = this;
			if (!$t.grid || !rowid) {return;}
			var gID = $t.p.id,
			frmgr = "ViewGrid_"+$.jgrid.jqID( gID  ), frmtb = "ViewTbl_" + $.jgrid.jqID( gID ),
			frmgr_id = "ViewGrid_"+gID, frmtb_id = "ViewTbl_"+gID,
			IDs = {themodal:'viewmod'+gID,modalhead:'viewhd'+gID,modalcontent:'viewcnt'+gID, scrollelm : frmgr},
			showFrm = true,
			maxCols = 1, maxRows=0;
			rp_ge[$t.p.id].styleUI = $t.p.styleUI || 'jQueryUI';
			if(!p.recreateForm) {
				if( $($t).data("viewProp") ) {
					$.extend(rp_ge[$(this)[0].p.id], $($t).data("viewProp"));
				}
			}
			function focusaref(){ //Sfari 3 issues
				if(rp_ge[$t.p.id].closeOnEscape===true || rp_ge[$t.p.id].navkeys[0]===true) {
					setTimeout(function(){$(".ui-jqdialog-titlebar-close","#"+$.jgrid.jqID(IDs.modalhead)).attr("tabindex", "-1").focus();},0);
				}
			}
			function createData(rowid,obj,tb,maxcols){
				var nm, hc,trdata, cnt=0,tmp, dc, retpos=[], ind=false, i,
				tdtmpl = "<td class='CaptionTD form-view-label " + commonstyle.content + "' width='"+p.labelswidth+"'></td><td class='DataTD form-view-data ui-helper-reset "  + commonstyle.content +"'></td>", tmpl="",
				tdtmpl2 = "<td class='CaptionTD form-view-label " + commonstyle.content +"'></td><td class='DataTD form-view-data " + commonstyle.content +"'></td>",
				fmtnum = ['integer','number','currency'],max1 =0, max2=0 ,maxw,setme, viewfld;
				for (i=1;i<=maxcols;i++) {
					tmpl += i === 1 ? tdtmpl : tdtmpl2;
				}
				// find max number align rigth with property formatter
				$(obj.p.colModel).each( function() {
					if(this.editrules && this.editrules.edithidden === true) {
						hc = false;
					} else {
						hc = this.hidden === true ? true : false;
					}
					if(!hc && this.align==='right') {
						if(this.formatter && $.inArray(this.formatter,fmtnum) !== -1 ) {
							max1 = Math.max(max1,parseInt(this.width,10));
						} else {
							max2 = Math.max(max2,parseInt(this.width,10));
						}
					}
				});
				maxw  = max1 !==0 ? max1 : max2 !==0 ? max2 : 0;
				ind = $(obj).jqGrid("getInd",rowid);
				$(obj.p.colModel).each( function(i) {
					nm = this.name;
					setme = false;
					// hidden fields are included in the form
					if(this.editrules && this.editrules.edithidden === true) {
						hc = false;
					} else {
						hc = this.hidden === true ? true : false;
					}
					dc = hc ? "style='display:none'" : "";
					viewfld = (typeof this.viewable !== 'boolean') ? true : this.viewable;
					if ( nm !== 'cb' && nm !== 'subgrid' && nm !== 'rn' && viewfld && nm !== 'sc') {
						if(ind === false) {
							tmp = "";
						} else {
							if(nm === obj.p.ExpandColumn && obj.p.treeGrid === true) {
								tmp = $("td",obj.rows[ind]).eq( i ).text();
							} else {
								tmp = $("td",obj.rows[ind]).eq( i ).html();
							}
						}
						setme = this.align === 'right' && maxw !==0 ? true : false;
						var frmopt = $.extend({},{rowabove:false,rowcontent:''}, this.formoptions || {}),
						rp = parseInt(frmopt.rowpos,10) || cnt+1,
						cp = parseInt((parseInt(frmopt.colpos,10) || 1)*2,10);
						if(frmopt.rowabove) {
							var newdata = $("<tr><td class='contentinfo' colspan='"+(maxcols*2)+"'>"+frmopt.rowcontent+"</td></tr>");
							$(tb).append(newdata);
							newdata[0].rp = rp;
						}
						trdata = $(tb).find("tr[rowpos="+rp+"]");
						if ( trdata.length===0 ) {
							trdata = $("<tr "+dc+" rowpos='"+rp+"'></tr>").addClass("FormData").attr("id","trv_"+nm);
							$(trdata).append(tmpl);
							$(tb).append(trdata);
							trdata[0].rp = rp;
						}
						$("td",trdata[0]).eq( cp-2 ).html('<b>'+ (frmopt.label === undefined ? obj.p.colNames[i]: frmopt.label)+'</b>');
						$("td",trdata[0]).eq( cp-1 ).append("<span>"+tmp+"</span>").attr("id","v_"+nm);
						if(setme){
							$("td",trdata[0]).eq( cp-1 ).find('span').css({ 'text-align':'right',width:maxw+"px" });
						}
						retpos[cnt] = i;
						cnt++;
					}
				});
				if( cnt > 0) {
					var idrow = $("<tr class='FormData' style='display:none'><td class='CaptionTD'></td><td colspan='"+ (maxcols*2-1)+"' class='DataTD'><input class='FormElement' id='id_g' type='text' name='id' value='"+rowid+"'/></td></tr>");
					idrow[0].rp = cnt+99;
					$(tb).append(idrow);
				}
				return retpos;
			}
			function fillData(rowid,obj){
				var nm, hc,cnt=0,tmp,trv;
				trv = $(obj).jqGrid("getInd",rowid,true);
				if(!trv) {return;}
				$('td',trv).each( function(i) {
					nm = obj.p.colModel[i].name;
					// hidden fields are included in the form
					if(obj.p.colModel[i].editrules && obj.p.colModel[i].editrules.edithidden === true) {
						hc = false;
					} else {
						hc = obj.p.colModel[i].hidden === true ? true : false;
					}
					if ( nm !== 'cb' && nm !== 'subgrid' && nm !== 'rn' && nm !== 'sc') {
						if(nm === obj.p.ExpandColumn && obj.p.treeGrid === true) {
							tmp = $(this).text();
						} else {
							tmp = $(this).html();
						}
						nm = $.jgrid.jqID("v_"+nm);
						$("#"+nm+" span","#"+frmtb).html(tmp);
						if (hc) {$("#"+nm,"#"+frmtb).parents("tr").first().hide();}
						cnt++;
					}
				});
				if(cnt>0) {$("#id_g","#"+frmtb).val(rowid);}
			}
			function updateNav(cr,posarr){
				var totr = posarr[1].length-1;
				if (cr===0) {
					$("#pData","#"+frmtb+"_2").addClass( commonstyle.disabled );
				} else if( posarr[1][cr-1] !== undefined && $("#"+$.jgrid.jqID(posarr[1][cr-1])).hasClass(commonstyle.disabled)) {
					$("#pData",frmtb+"_2").addClass( commonstyle.disabled );
				} else {
					$("#pData","#"+frmtb+"_2").removeClass( commonstyle.disabled );
				}
				if (cr===totr) {
					$("#nData","#"+frmtb+"_2").addClass( commonstyle.disabled );
				} else if( posarr[1][cr+1] !== undefined && $("#"+$.jgrid.jqID(posarr[1][cr+1])).hasClass( commonstyle.disabled )) {
					$("#nData",frmtb+"_2").addClass( commonstyle.disabled );
				} else {
					$("#nData","#"+frmtb+"_2").removeClass( commonstyle.disabled );
				}
			}
			function getCurrPos() {
				var rowsInGrid =  $($t).jqGrid("getDataIDs"),
				selrow = $("#id_g","#"+frmtb).val(), pos;
				if($t.p.multiselect && rp_ge[$t.p.id].viewselected) {
					var arr = [];
					for(var i=0, len = rowsInGrid.length;i<len;i++) {
						if($.inArray(rowsInGrid[i],$t.p.selarrrow) !== -1) {
							arr.push(rowsInGrid[i]);
						}
					}
					pos = $.inArray(selrow,arr);
					return [pos, arr];
				} else {
					pos = $.inArray(selrow,rowsInGrid);
				}
				return [pos,rowsInGrid];
			}

			var dh = isNaN(rp_ge[$(this)[0].p.id].dataheight) ? rp_ge[$(this)[0].p.id].dataheight : rp_ge[$(this)[0].p.id].dataheight+"px",
			dw = isNaN(rp_ge[$(this)[0].p.id].datawidth) ? rp_ge[$(this)[0].p.id].datawidth : rp_ge[$(this)[0].p.id].datawidth+"px",
			frm = $("<form name='FormPost' id='"+frmgr_id+"' class='FormGrid' style='width:"+dw+";height:"+dh+";'></form>"),
			tbl =$("<table id='"+frmtb_id+"' class='EditTable ViewTable'><tbody></tbody></table>");
			$($t.p.colModel).each( function() {
				var fmto = this.formoptions;
				maxCols = Math.max(maxCols, fmto ? fmto.colpos || 0 : 0 );
				maxRows = Math.max(maxRows, fmto ? fmto.rowpos || 0 : 0 );
			});
			// set the id.
			$(frm).append(tbl);
			showFrm = $($t).triggerHandler("jqGridViewRowBeforeInitData", [frm]);
			if(showFrm === undefined) {
				showFrm = true;
			}
			if(showFrm && $.jgrid.isFunction(rp_ge[$t.p.id].beforeInitData)) {
				showFrm = rp_ge[$t.p.id].beforeInitData.call($t, frm);
			}
			if(showFrm === false) {return;}

			createData(rowid, $t, tbl, maxCols);
			var rtlb = $t.p.direction === "rtl" ? true :false,
			bp = rtlb ? "nData" : "pData",
			bn = rtlb ? "pData" : "nData",
				// buttons at footer
			bP = "<a id='"+bp+"' class='fm-button " + commonstyle.button + "'><span class='" + commonstyle.icon_base + " " + styles.icon_prev+ "'></span></a>",
			bN = "<a id='"+bn+"' class='fm-button " + commonstyle.button + "'><span class='" + commonstyle.icon_base + " " + styles.icon_next+ "'></span></a>",
			bC  ="<a id='cData' class='fm-button " + commonstyle.button + "'>"+p.bClose+"</a>",
			user_buttons = ( Array.isArray( rp_ge[$t.p.id].buttons ) ? $.jgrid.buildButtons( rp_ge[$t.p.id].buttons, bC, commonstyle ) : bC );
			if(maxRows >  0) {
				var sd=[];
				$.each($(tbl)[0].rows,function(i,r){
					sd[i] = r;
				});
				sd.sort(function(a,b){
					if(a.rp > b.rp) {return 1;}
					if(a.rp < b.rp) {return -1;}
					return 0;
				});
				$.each(sd, function(index, row) {
					$('tbody',tbl).append(row);
				});
			}
			p.gbox = "#gbox_"+$.jgrid.jqID(gID);
			var bt = $("<div></div>").append(frm).append("<table border='0' class='EditTable' id='"+frmtb+"_2'><tbody><tr id='Act_Buttons'><td class='navButton' width='"+p.labelswidth+"'>"+(rtlb ? bN+bP : bP+bN)+"</td><td class='EditButton'>"+ user_buttons+"</td></tr></tbody></table>"),
			fs =  $('.ui-jqgrid').css('font-size') || '11px';
			
			$.jgrid.createModal(IDs,bt, rp_ge[$(this)[0].p.id],"#gview_"+$.jgrid.jqID($t.p.id),$("#gview_"+$.jgrid.jqID($t.p.id))[0], null, {"font-size":fs});
			if(rtlb) {
				$("#pData, #nData","#"+frmtb+"_2").css("float","right");
				$(".EditButton","#"+frmtb+"_2").css("text-align","left");
			}
			if(!p.viewPagerButtons) {$("#pData, #nData","#"+frmtb+"_2").hide();}
			bt = null;
			$("#"+IDs.themodal).keydown( function( e ) {
				if(e.which === 27) {
					if(rp_ge[$t.p.id].closeOnEscape) {$.jgrid.hideModal("#"+$.jgrid.jqID(IDs.themodal),{gb:p.gbox,jqm:p.jqModal, onClose: p.onClose, removemodal: rp_ge[$t.p.id].removemodal, formprop: !rp_ge[$t.p.id].recreateForm, form: rp_ge[$t.p.id].form});}
					return false;
				}
				if(p.navkeys[0]===true) {
					if(e.which === p.navkeys[1]){ //up
						$("#pData", "#"+frmtb+"_2").trigger("click");
						return false;
					}
					if(e.which === p.navkeys[2]){ //down
						$("#nData", "#"+frmtb+"_2").trigger("click");
						return false;
					}
				}
			});
			p.closeicon = $.extend([true,"left", styles.icon_close ],p.closeicon);
			if(p.closeicon[0]===true) {
				$("#cData","#"+frmtb+"_2").addClass(p.closeicon[1] === "right" ? 'fm-button-icon-right' : 'fm-button-icon-left')
				.append("<span class='" + commonstyle.icon_base+ " " +p.closeicon[2]+"'></span>");
			}
			$($t).triggerHandler("jqGridViewRowBeforeShowForm", [$("#"+frmgr)]);
			if($.jgrid.isFunction(p.beforeShowForm)) {p.beforeShowForm.call($t,$("#"+frmgr));}

			$.jgrid.viewModal("#"+$.jgrid.jqID(IDs.themodal),{
				gbox:"#gbox_"+$.jgrid.jqID(gID),
				jqm:p.jqModal,
				overlay: p.overlay, 
				modal:p.modal,
				onHide :  function(h) {
					var rtlsup = $("#gbox_"+$.jgrid.jqID(gID)).attr("dir") === "rtl" ? true : false,
						fw = parseFloat($('#viewmod'+gID)[0].style.width);
					$($t).data("viewProp", {
						top:parseFloat($(h.w).css("top")),
						left : rtlsup ? ( $("#gbox_"+$.jgrid.jqID(gID)).outerWidth() - fw - parseFloat($(h.w).css("left")) + 12 ) : parseFloat($(h.w).css("left")),
						width : $(h.w).width(),
						height : $(h.w).height(),
						dataheight : $("#"+frmgr).height(),
						datawidth: $("#"+frmgr).width()
					});
					h.w.remove();
					if(h.o) {h.o.remove();}
				}
			});
			$(".fm-button:not(." + commonstyle.disabled + ")","#"+frmtb+"_2").hover(
				function(){$(this).addClass( commonstyle.hover );},
				function(){$(this).removeClass( commonstyle.hover );}
			);
			focusaref();
			$("#cData", "#"+frmtb+"_2").click(function(){
				$.jgrid.hideModal("#"+$.jgrid.jqID(IDs.themodal),{gb:"#gbox_"+$.jgrid.jqID(gID),jqm:p.jqModal, onClose: p.onClose, removemodal: rp_ge[$t.p.id].removemodal, formprop: !rp_ge[$t.p.id].recreateForm, form: rp_ge[$t.p.id].form});
				return false;
			});
			$("#"+frmtb+"_2").find("[data-index]").each(function(){
				var index = parseInt($(this).attr('data-index'),10);
				if(index >=0 ) {
					if( p.buttons[index].hasOwnProperty('click')) {
						$(this).on('click', function(e) {
							p.buttons[index].click.call($t, $("#"+frmgr_id)[0], rp_ge[$t.p.id], e);
						});
					}
				}
			});

			$("#nData", "#"+frmtb+"_2").click(function(){
				$("#FormError","#"+frmtb).hide();
				var npos = getCurrPos();
				npos[0] = parseInt(npos[0],10);
				if(npos[0] !== -1 && npos[1][npos[0]+1]) {
					$($t).triggerHandler("jqGridViewRowClickPgButtons", ['next',$("#"+frmgr),npos[1][npos[0]]]);
					if($.jgrid.isFunction(p.onclickPgButtons)) {
						p.onclickPgButtons.call($t,'next',$("#"+frmgr),npos[1][npos[0]]);
					}
					fillData(npos[1][npos[0]+1],$t);
					if(!($t.p.multiselect &&  rp_ge[$t.p.id].viewselected)) {
						$($t).jqGrid("setSelection",npos[1][npos[0]+1]);
					}
					$($t).triggerHandler("jqGridViewRowAfterClickPgButtons", ['next',$("#"+frmgr),npos[1][npos[0]+1]]);
					if($.jgrid.isFunction(p.afterclickPgButtons)) {
						p.afterclickPgButtons.call($t,'next',$("#"+frmgr),npos[1][npos[0]+1]);
					}
					updateNav(npos[0]+1,npos);
				}
				focusaref();
				return false;
			});
			$("#pData", "#"+frmtb+"_2").click(function(){
				$("#FormError","#"+frmtb).hide();
				var ppos = getCurrPos();
				if(ppos[0] !== -1 && ppos[1][ppos[0]-1]) {
					$($t).triggerHandler("jqGridViewRowClickPgButtons", ['prev',$("#"+frmgr),ppos[1][ppos[0]]]);
					if($.jgrid.isFunction(p.onclickPgButtons)) {
						p.onclickPgButtons.call($t,'prev',$("#"+frmgr),ppos[1][ppos[0]]);
					}
					fillData(ppos[1][ppos[0]-1],$t);
					if(!($t.p.multiselect &&  rp_ge[$t.p.id].viewselected)) {
						$($t).jqGrid("setSelection",ppos[1][ppos[0]-1]);
					}
					$($t).triggerHandler("jqGridViewRowAfterClickPgButtons", ['prev',$("#"+frmgr),ppos[1][ppos[0]-1]]);
					if($.jgrid.isFunction(p.afterclickPgButtons)) {
						p.afterclickPgButtons.call($t,'prev',$("#"+frmgr),ppos[1][ppos[0]-1]);
					}
					updateNav(ppos[0]-1,ppos);
				}
				focusaref();
				return false;
			});
			var posInit =getCurrPos();
			updateNav(posInit[0],posInit);
		});
	},
	delGridRow : function(rowids,p) {
		var regional =  $.jgrid.getRegional(this[0], 'del'),
			currstyle = this[0].p.styleUI,
			styles = $.jgrid.styleUI[currstyle].formedit,
			commonstyle = $.jgrid.styleUI[currstyle].common;

		p = $.extend(true, {
			top : 0,
			left: 0,
			width: 240,
			height: 'auto',
			dataheight : 'auto',
			modal: false,
			overlay: 30,
			drag: true,
			resize: true,
			url : '',
			mtype : "POST",
			reloadAfterSubmit: true,
			beforeShowForm: null,
			beforeInitData : null,
			afterShowForm: null,
			beforeSubmit: null,
			onclickSubmit: null,
			afterSubmit: null,
			jqModal : true,
			closeOnEscape : false,
			delData: {},
			delicon : [],
			cancelicon : [],
			onClose : null,
			ajaxDelOptions : {},
			processing : false,
			serializeDelData : null,
			useDataProxy : false
		}, regional, p ||{});
		rp_ge[$(this)[0].p.id] = p;
		return this.each(function(){
			var $t = this;
			if (!$t.grid ) {return;}
			if(!rowids) {return;}
			var gID = $t.p.id, onCS = {},
			showFrm = true,
			dtbl = "DelTbl_"+$.jgrid.jqID(gID),postd, idname, opers, oper,
			dtbl_id = "DelTbl_" + gID,
			IDs = {themodal:'delmod'+gID,modalhead:'delhd'+gID,modalcontent:'delcnt'+gID, scrollelm: dtbl};
			rp_ge[$t.p.id].styleUI = $t.p.styleUI || 'jQueryUI';
			if (Array.isArray(rowids)) {rowids = rowids.join();}
			if ( $("#"+$.jgrid.jqID(IDs.themodal))[0] !== undefined ) {

				showFrm = $($t).triggerHandler("jqGridDelRowBeforeInitData", [$("#"+dtbl)]);
				if(showFrm === undefined) {
					showFrm = true;
				}
				if(showFrm && $.jgrid.isFunction(rp_ge[$t.p.id].beforeInitData)) {
					showFrm = rp_ge[$t.p.id].beforeInitData.call($t, $("#"+dtbl));
				}
				if(showFrm === false) {return;}

				$("#DelData>td","#"+dtbl).text(rowids);
				$("#DelError","#"+dtbl).hide();
				if( rp_ge[$t.p.id].processing === true) {
					rp_ge[$t.p.id].processing=false;
					$("#dData", "#"+dtbl).removeClass( commonstyle.active );
				}
				$($t).triggerHandler("jqGridDelRowBeforeShowForm", [$("#"+dtbl)]);
				if($.jgrid.isFunction( rp_ge[$t.p.id].beforeShowForm  )) {
					rp_ge[$t.p.id].beforeShowForm.call($t,$("#"+dtbl));
				}
				$.jgrid.viewModal("#"+$.jgrid.jqID(IDs.themodal),{gbox:"#gbox_"+$.jgrid.jqID(gID),jqm:rp_ge[$t.p.id].jqModal, overlay: rp_ge[$t.p.id].overlay, modal:rp_ge[$t.p.id].modal});
				$($t).triggerHandler("jqGridDelRowAfterShowForm", [$("#"+dtbl)]);
				if($.jgrid.isFunction( rp_ge[$t.p.id].afterShowForm )) {
					rp_ge[$t.p.id].afterShowForm.call($t, $("#"+dtbl));
				}
			} else {
				var dh = isNaN(rp_ge[$t.p.id].dataheight) ? rp_ge[$t.p.id].dataheight : rp_ge[$t.p.id].dataheight+"px",
				dw = isNaN(p.datawidth) ? p.datawidth : p.datawidth+"px",
				tbl = "<div id='"+dtbl_id+"' class='formdata' style='width:"+dw+";overflow:auto;position:relative;height:"+dh+";'>";
				tbl += "<table class='DelTable'><tbody>";
				// error data
				tbl += "<tr id='DelError' style='display:none'><td class='" + commonstyle.error +"'></td></tr>";
				tbl += "<tr id='DelData' style='display:none'><td >"+rowids+"</td></tr>";
				tbl += "<tr><td class=\"delmsg\" style=\"white-space:pre;\">"+rp_ge[$t.p.id].msg+"</td></tr><tr><td >&#160;</td></tr>";
				// buttons at footer
				tbl += "</tbody></table></div>";
				var bS  = "<a id='dData' class='fm-button " + commonstyle.button + "'>"+p.bSubmit+"</a>",
				bC  = "<a id='eData' class='fm-button " + commonstyle.button + "'>"+p.bCancel+"</a>",
				user_buttons = ( Array.isArray( rp_ge[$t.p.id].buttons ) ? $.jgrid.buildButtons( rp_ge[$t.p.id].buttons, bS + bC, commonstyle ) : bS + bC ),
				fs =  $('.ui-jqgrid').css('font-size') || '11px';

				tbl += "<table class='EditTable ui-common-table' id='"+dtbl+"_2'><tbody><tr><td><hr class='" + commonstyle.content + "' style='margin:1px'/></td></tr><tr><td class='DelButton EditButton'>"+ user_buttons +"</td></tr></tbody></table>";
				p.gbox = "#gbox_"+$.jgrid.jqID(gID);
				$.jgrid.createModal(IDs,tbl, rp_ge[$t.p.id] ,"#gview_"+$.jgrid.jqID($t.p.id),$("#gview_"+$.jgrid.jqID($t.p.id))[0], null, {"font-size": fs});

				$(".fm-button","#"+dtbl+"_2").hover(
					function(){$(this).addClass( commonstyle.hover );},
					function(){$(this).removeClass( commonstyle.hover );}
				);
				p.delicon = $.extend([true,"left", styles.icon_del ],rp_ge[$t.p.id].delicon);
				p.cancelicon = $.extend([true,"left", styles.icon_cancel ],rp_ge[$t.p.id].cancelicon);
				if(p.delicon[0]===true) {
					$("#dData","#"+dtbl+"_2").addClass(p.delicon[1] === "right" ? 'fm-button-icon-right' : 'fm-button-icon-left')
					.append("<span class='" + commonstyle.icon_base + " " + p.delicon[2]+"'></span>");
				}
				if(p.cancelicon[0]===true) {
					$("#eData","#"+dtbl+"_2").addClass(p.cancelicon[1] === "right" ? 'fm-button-icon-right' : 'fm-button-icon-left')
					.append("<span class='" + commonstyle.icon_base + " " + p.cancelicon[2]+"'></span>");
				}
				$("#dData","#"+dtbl+"_2").click(function(){
					var ret=[true,""], pk,
					postdata = $("#DelData>td","#"+dtbl).text(); //the pair is name=val1,val2,...
					onCS = {};
					onCS = $($t).triggerHandler("jqGridDelRowClickSubmit", [rp_ge[$t.p.id], postdata]);
					if(onCS === undefined && $.jgrid.isFunction( rp_ge[$t.p.id].onclickSubmit ) ) {
						onCS = rp_ge[$t.p.id].onclickSubmit.call($t, rp_ge[$t.p.id], postdata) || {};
					}
					ret = $($t).triggerHandler("jqGridDelRowBeforeSubmit", [postdata]);
					if(ret === undefined) {
						ret = [true,"",""];
					}
					if( ret[0] && $.jgrid.isFunction(rp_ge[$t.p.id].beforeSubmit))  {
						ret = rp_ge[$t.p.id].beforeSubmit.call($t, postdata);
					}
					if(ret[0] && !rp_ge[$t.p.id].processing) {
						rp_ge[$t.p.id].processing = true;
						opers = $t.p.prmNames;
						postd = $.extend({},rp_ge[$t.p.id].delData, onCS);
						oper = opers.oper;
						postd[oper] = opers.deloper;
						idname = opers.id;
						postdata = String(postdata).split(",");
						if(!postdata.length) { return false; }
						for(pk in postdata) {
							if(postdata.hasOwnProperty(pk)) {
								postdata[pk] = $.jgrid.stripPref($t.p.idPrefix, postdata[pk]);
							}
						}
						postd[idname] = postdata.join();
						$(this).addClass( commonstyle.active );
						var ajaxOptions = $.extend({
							url: rp_ge[$t.p.id].url || $($t).jqGrid('getGridParam','editurl'),
							type: rp_ge[$t.p.id].mtype,
							data: $.jgrid.isFunction(rp_ge[$t.p.id].serializeDelData) ? rp_ge[$t.p.id].serializeDelData.call($t,postd) : postd,
							complete:function(data,status){
								var i;
								$("#dData", "#"+dtbl+"_2").removeClass( commonstyle.active );
								if(data.status >= 300 && data.status !== 304) {
									ret[0] = false;
									ret[1] = $($t).triggerHandler("jqGridDelRowErrorTextFormat", [data]);
									if ($.jgrid.isFunction(rp_ge[$t.p.id].errorTextFormat)) {
										ret[1] = rp_ge[$t.p.id].errorTextFormat.call($t, data);
									}
									if(ret[1] === undefined) {
										ret[1] = status + " Status: '" + data.statusText + "'. Error code: " + data.status;
									}
								} else {
									// data is posted successful
									// execute aftersubmit with the returned data from server
									ret = $($t).triggerHandler("jqGridDelRowAfterSubmit", [data, postd]);
									if(ret === undefined) {
										ret = [true,"",""];
									}
									if( ret[0] && $.jgrid.isFunction(rp_ge[$t.p.id].afterSubmit) ) {
										ret = rp_ge[$t.p.id].afterSubmit.call($t, data, postd);
									}
								}
								if(ret[0] === false) {
									$("#DelError>td","#"+dtbl).html(ret[1]);
									$("#DelError","#"+dtbl).show();
								} else {
									if(rp_ge[$t.p.id].reloadAfterSubmit && $t.p.datatype !== "local") {
										$($t).trigger("reloadGrid");
									} else {
										if($t.p.treeGrid===true){
												try {$($t).jqGrid("delTreeNode",$t.p.idPrefix+postdata[0]);} catch(e){}
										} else {
											for(i=0;i<postdata.length;i++) {
												$($t).jqGrid("delRowData",$t.p.idPrefix+ postdata[i]);
											}
										}
										$t.p.selrow = null;
										$t.p.selarrrow = [];
									}
									if($.jgrid.isFunction(rp_ge[$t.p.id].afterComplete) || Object.prototype.hasOwnProperty.call($._data( $($t)[0], 'events' ), 'jqGridDelRowAfterComplete')) {
										var copydata = data;
										setTimeout(function(){
											$($t).triggerHandler("jqGridDelRowAfterComplete", [copydata, postd]);
											try {
												rp_ge[$t.p.id].afterComplete.call($t, copydata, postd);
											} catch(eacg) {
												// do nothing
											}
										},500);
									}
								}
								rp_ge[$t.p.id].processing=false;
								if(ret[0]) {$.jgrid.hideModal("#"+$.jgrid.jqID(IDs.themodal),{gb:"#gbox_"+$.jgrid.jqID(gID),jqm:p.jqModal, onClose: rp_ge[$t.p.id].onClose});}
							}
						}, $.jgrid.ajaxOptions, rp_ge[$t.p.id].ajaxDelOptions);


						if (!ajaxOptions.url && !rp_ge[$t.p.id].useDataProxy) {
							if ($.jgrid.isFunction($t.p.dataProxy)) {
								rp_ge[$t.p.id].useDataProxy = true;
							} else {
								ret[0]=false;ret[1] += " "+$.jgrid.getRegional($t, 'errors.nourl');
							}
						}
						if (ret[0]) {
							if (rp_ge[$t.p.id].useDataProxy) {
								var dpret = $t.p.dataProxy.call($t, ajaxOptions, "del_"+$t.p.id); 
								if(dpret === undefined) {
									dpret = [true, ""];
								}
								if(dpret[0] === false ) {
									ret[0] = false;
									ret[1] = dpret[1] || "Error deleting the selected row!" ;
								} else {
									$.jgrid.hideModal("#"+$.jgrid.jqID(IDs.themodal),{gb:"#gbox_"+$.jgrid.jqID(gID),jqm:p.jqModal, onClose: rp_ge[$t.p.id].onClose});
								}
							}
							else {
								if(ajaxOptions.url === "clientArray") {
									postd = ajaxOptions.data;
									ajaxOptions.complete({status:200, statusText:''},'');
								} else {
									$.ajax(ajaxOptions); 
								}
							}
						}
					}

					if(ret[0] === false) {
						$("#DelError>td","#"+dtbl).html(ret[1]);
						$("#DelError","#"+dtbl).show();
					}
					return false;
				});
				$("#eData", "#"+dtbl+"_2").click(function(){
					$.jgrid.hideModal("#"+$.jgrid.jqID(IDs.themodal),{gb:"#gbox_"+$.jgrid.jqID(gID),jqm:rp_ge[$t.p.id].jqModal, onClose: rp_ge[$t.p.id].onClose});
					return false;
				});
				$("#"+dtbl+"_2").find("[data-index]").each(function(){
					var index = parseInt($(this).attr('data-index'),10);
					if(index >=0 ) {
						if( p.buttons[index].hasOwnProperty('click')) {
							$(this).on('click', function(e) {
								p.buttons[index].click.call($t, $("#"+dtbl_id)[0], rp_ge[$t.p.id], e);
							});
						}
					}
				});

				showFrm = $($t).triggerHandler("jqGridDelRowBeforeInitData", [$("#"+dtbl)]);
				if(showFrm === undefined) {
					showFrm = true;
				}
				if(showFrm && $.jgrid.isFunction(rp_ge[$t.p.id].beforeInitData)) {
					showFrm = rp_ge[$t.p.id].beforeInitData.call($t, $("#"+dtbl));
				}
				if(showFrm === false) {return;}
				$($t).triggerHandler("jqGridDelRowBeforeShowForm", [$("#"+dtbl)]);
				if($.jgrid.isFunction( rp_ge[$t.p.id].beforeShowForm  )) {
					rp_ge[$t.p.id].beforeShowForm.call($t,$("#"+dtbl));
				}
				$.jgrid.viewModal("#"+$.jgrid.jqID(IDs.themodal),{gbox:"#gbox_"+$.jgrid.jqID(gID),jqm:rp_ge[$t.p.id].jqModal, overlay: rp_ge[$t.p.id].overlay, modal:rp_ge[$t.p.id].modal});
				$($t).triggerHandler("jqGridDelRowAfterShowForm", [$("#"+dtbl)]);
				if($.jgrid.isFunction( rp_ge[$t.p.id].afterShowForm )) {
					rp_ge[$t.p.id].afterShowForm.call($t,$("#"+dtbl));
				}
			}
			if(rp_ge[$t.p.id].closeOnEscape===true) {
				setTimeout(function(){$(".ui-jqdialog-titlebar-close","#"+$.jgrid.jqID(IDs.modalhead)).attr("tabindex","-1").focus();},0);
			}
		});
	},
	navGrid : function (elem, p, pEdit, pAdd, pDel, pSearch, pView) {
		var regional =  $.jgrid.getRegional(this[0], 'nav'),
			currstyle = this[0].p.styleUI,
			styles = $.jgrid.styleUI[currstyle].navigator,
			commonstyle = $.jgrid.styleUI[currstyle].common;
		p = $.extend({
			edit: true,
			editicon: styles.icon_edit_nav,
			add: true,
			addicon: styles.icon_add_nav,
			del: true,
			delicon: styles.icon_del_nav,
			search: true,
			searchicon: styles.icon_search_nav,
			refresh: true,
			refreshicon: styles.icon_refresh_nav,
			refreshstate: 'firstpage',
			view: false,
			viewicon : styles.icon_view_nav,
			position : "left",
			closeOnEscape : true,
			beforeRefresh : null,
			afterRefresh : null,
			cloneToTop : false,
			alertwidth : 200,
			alertheight : 'auto',
			alerttop: null,
			alertleft: null,
			alertzIndex : null,
			dropmenu : false,
			navButtonText : ''
		}, regional, p ||{});
		return this.each(function() {
			if(this.p.navGrid) {return;}
			var alertIDs = {themodal: 'alertmod_' + this.p.id, modalhead: 'alerthd_' + this.p.id,modalcontent: 'alertcnt_' + this.p.id},
			$t = this, twd, tdw, o;
			if(!$t.grid || typeof elem !== 'string') {return;}
			if(!$($t).data('navGrid')) {
				$($t).data('navGrid',p);
			}
			// speedoverhead, but usefull for future 
			o = $($t).data('navGrid');
			if($t.p.force_regional) {
				o = $.extend(o, regional);
			}
			if ($("#"+alertIDs.themodal)[0] === undefined) {
				if(!o.alerttop && !o.alertleft) {
					var pos=$.jgrid.findPos(this);
					pos[0]=Math.round(pos[0]);
					pos[1]=Math.round(pos[1]);
					var hg = isNaN(this.p.height) ? $($t.grid.bDiv).height(): this.p.height;
					if(hg === 0) {
						hg = 200;
					}
					o.alertleft = pos[0] + (this.p.width/2)-parseInt(o.alertwidth,10)/2;
					o.alerttop = pos[1] + (hg/2)-25;
				}
				var fs =  $('.ui-jqgrid').css('font-size') || '11px';
				$.jgrid.createModal(alertIDs,
					"<div>"+o.alerttext+"</div><span tabindex='0'><span tabindex='-1' id='jqg_alrt'></span></span>",
					{ 
						gbox:"#gbox_"+$.jgrid.jqID($t.p.id),
						jqModal:true,
						drag:true,
						resize:true,
						caption:o.alertcap,
						top:o.alerttop,
						left:o.alertleft,
						width:o.alertwidth,
						height: o.alertheight,
						closeOnEscape:o.closeOnEscape, 
						zIndex: o.alertzIndex,
						styleUI: $t.p.styleUI
					},
					"#gview_"+$.jgrid.jqID($t.p.id),
					$("#gbox_"+$.jgrid.jqID($t.p.id))[0],
					true,
					{"font-size": fs}
				);
			}
			var clone = 1, i,
			onHoverIn = function () {
				if (!$(this).hasClass(commonstyle.disabled)) {
					$(this).addClass(commonstyle.hover);
				}
			},
			onHoverOut = function () {
				$(this).removeClass(commonstyle.hover);
			};
			if(o.cloneToTop && $t.p.toppager) {clone = 2;}
			for(i = 0; i<clone; i++) {
				var tbd,
				navtbl = $("<table class='ui-pg-table navtable ui-common-table'><tbody><tr></tr></tbody></table>"),
				sep = "<td class='ui-pg-button " +commonstyle.disabled + "' style='width:4px;'><span class='ui-separator'></span></td>",
				pgid, elemids;
				if(i===0) {
					pgid = elem;
					if(pgid.indexOf("#") === 0 ) {
						pgid = pgid.substring(1);
						pgid = "#"+ $.jgrid.jqID( pgid );
					}
					elemids = $t.p.id;
					if(pgid === $t.p.toppager) {
						elemids += "_top";
						clone = 1;
					}
				} else {
					pgid = $t.p.toppager;
					elemids = $t.p.id+"_top";
				}
				if($t.p.direction === "rtl") {
					$(navtbl).attr("dir","rtl").css("float","right");
				}
				pAdd = pAdd || {};
				if (o.add) {
					tbd = $("<td class='ui-pg-button "+commonstyle.cornerall+"'></td>");
					$(tbd).append("<div class='ui-pg-div'><span class='"+commonstyle.icon_base +" " +o.addicon+"'></span>"+o.addtext+"</div>");
					$("tr",navtbl).append(tbd);
					$(tbd,navtbl)
					.attr({"title":o.addtitle || "",id : pAdd.id || "add_"+elemids})
					.click(function(){
						if (!$(this).hasClass( commonstyle.disabled )) {
							$.jgrid.setSelNavIndex( $t, this);
							if ($.jgrid.isFunction( o.addfunc )) {
								o.addfunc.call($t);
							} else {
								$($t).jqGrid("editGridRow","new",pAdd);
							}
						}
						return false;
					}).hover(onHoverIn, onHoverOut);
					tbd = null;
				}
				pEdit = pEdit || {};
				if (o.edit) {
					tbd = $("<td class='ui-pg-button "+commonstyle.cornerall+"'></td>");
					$(tbd).append("<div class='ui-pg-div'><span class='"+commonstyle.icon_base+" "+o.editicon+"'></span>"+o.edittext+"</div>");
					$("tr",navtbl).append(tbd);
					$(tbd,navtbl)
					.attr({"title":o.edittitle || "",id: pEdit.id || "edit_"+elemids})
					.click(function(){
						if (!$(this).hasClass( commonstyle.disabled )) {
							var sr = $t.p.selrow;
							if (sr) {
								$.jgrid.setSelNavIndex( $t, this);
								if($.jgrid.isFunction( o.editfunc ) ) {
									o.editfunc.call($t, sr);
								} else {
									$($t).jqGrid("editGridRow",sr,pEdit);
								}
							} else {
								$.jgrid.viewModal("#"+alertIDs.themodal,{gbox:"#gbox_"+$.jgrid.jqID($t.p.id),jqm:true});
								$("#jqg_alrt").focus();
							}
						}
						return false;
					}).hover(onHoverIn, onHoverOut);
					tbd = null;
				}
				pView = pView || {};
				if (o.view) {
					tbd = $("<td class='ui-pg-button "+commonstyle.cornerall+"'></td>");
					$(tbd).append("<div class='ui-pg-div'><span class='"+commonstyle.icon_base+" "+o.viewicon+"'></span>"+o.viewtext+"</div>");
					$("tr",navtbl).append(tbd);
					$(tbd,navtbl)
					.attr({"title":o.viewtitle || "",id: pView.id || "view_"+elemids})
					.click(function(){
						if (!$(this).hasClass( commonstyle.disabled )) {
							var sr = $t.p.selrow;
							if (sr) {
								$.jgrid.setSelNavIndex( $t, this);
								if($.jgrid.isFunction( o.viewfunc ) ) {
									o.viewfunc.call($t, sr);
								} else {
									$($t).jqGrid("viewGridRow",sr,pView);
								}
							} else {
								$.jgrid.viewModal("#"+alertIDs.themodal,{gbox:"#gbox_"+$.jgrid.jqID($t.p.id),jqm:true});
								$("#jqg_alrt").focus();
							}
						}
						return false;
					}).hover(onHoverIn, onHoverOut);
					tbd = null;
				}
				pDel = pDel || {};
				if (o.del) {
					tbd = $("<td class='ui-pg-button "+commonstyle.cornerall+"'></td>");
					$(tbd).append("<div class='ui-pg-div'><span class='"+commonstyle.icon_base+" "+o.delicon+"'></span>"+o.deltext+"</div>");
					$("tr",navtbl).append(tbd);
					$(tbd,navtbl)
					.attr({"title":o.deltitle || "",id: pDel.id || "del_"+elemids})
					.click(function(){
						if (!$(this).hasClass( commonstyle.disabled )) {
							var dr;
							if($t.p.multiselect) {
								dr = $t.p.selarrrow;
								if(dr.length===0) {dr = null;}
							} else {
								dr = $t.p.selrow;
							}
							if(dr){
								$.jgrid.setSelNavIndex( $t, this);
								if($.jgrid.isFunction( o.delfunc )){
									o.delfunc.call($t, dr);
								}else{
									$($t).jqGrid("delGridRow",dr,pDel);
								}
							} else  {
								$.jgrid.viewModal("#"+alertIDs.themodal,{gbox:"#gbox_"+$.jgrid.jqID($t.p.id),jqm:true});$("#jqg_alrt").focus();
							}
						}
						return false;
					}).hover(onHoverIn, onHoverOut);
					tbd = null;
				}
				if(o.add || o.edit || o.del || o.view) {$("tr",navtbl).append(sep);}
				pSearch = pSearch || {};
				if (o.search) {
					tbd = $("<td class='ui-pg-button "+commonstyle.cornerall+"'></td>");
					$(tbd).append("<div class='ui-pg-div'><span class='"+commonstyle.icon_base+" "+o.searchicon+"'></span>"+o.searchtext+"</div>");
					$("tr",navtbl).append(tbd);
					$(tbd,navtbl)
					.attr({"title":o.searchtitle  || "",id:pSearch.id || "search_"+elemids})
					.click(function(){
						if (!$(this).hasClass( commonstyle.disabled )) {
							$.jgrid.setSelNavIndex( $t, this);
							if($.jgrid.isFunction( o.searchfunc )) {
								o.searchfunc.call($t, pSearch);
							} else {
								$($t).jqGrid("searchGrid",pSearch);
							}
						}
						return false;
					}).hover(onHoverIn, onHoverOut);
					if (pSearch.showOnLoad && pSearch.showOnLoad === true) {
						$(tbd,navtbl).click();
					}
					tbd = null;
				}
				if (o.refresh) {
					tbd = $("<td class='ui-pg-button "+commonstyle.cornerall+"'></td>");
					$(tbd).append("<div class='ui-pg-div'><span class='"+commonstyle.icon_base+" "+o.refreshicon+"'></span>"+o.refreshtext+"</div>");
					$("tr",navtbl).append(tbd);
					$(tbd,navtbl)
					.attr({"title":o.refreshtitle  || "",id: "refresh_"+elemids})
					.click(function(){
						if (!$(this).hasClass( commonstyle.disabled )) {
							if($.jgrid.isFunction(o.beforeRefresh)) {o.beforeRefresh.call($t);}
							$t.p.search = false;
							$t.p.resetsearch =  true;
							try {
								if( o.refreshstate !== 'currentfilter') {
									var gID = $t.p.id;
									$t.p.postData.filters ="";
									try {
										$("#fbox_"+$.jgrid.jqID(gID)).jqFilter('resetFilter');
									} catch(ef) {}
									if($.jgrid.isFunction($t.clearToolbar)) {$t.clearToolbar.call($t,false);}
								}
							} catch (e) {}
							switch (o.refreshstate) {
								case 'firstpage':
									$($t).trigger("reloadGrid", [{page:1}]);
									break;
								case 'current':
								case 'currentfilter':
									$($t).trigger("reloadGrid", [{current:true}]);
									break;
							}
							if($.jgrid.isFunction(o.afterRefresh)) {o.afterRefresh.call($t);}
							$.jgrid.setSelNavIndex( $t, this);
						}
						return false;
					}).hover(onHoverIn, onHoverOut);
					tbd = null;
				}
				tdw = $(".ui-jqgrid").css("font-size") || "11px";
				$('body').append("<div id='testpg2' class='ui-jqgrid "+$.jgrid.styleUI[currstyle].base.entrieBox+"' style='font-size:"+tdw+";visibility:hidden;' ></div>");
				twd = $(navtbl).clone().appendTo("#testpg2").width();
				$("#testpg2").remove();
				
				if($t.p._nvtd) {
					if(o.dropmenu) {
						navtbl = null;
						$($t).jqGrid('_buildNavMenu', pgid, elemids, p, pEdit, pAdd, pDel, pSearch, pView );						
					} else if(twd > $t.p._nvtd[0] ) {
						if($t.p.responsive) {
							navtbl = null;
							$($t).jqGrid('_buildNavMenu', pgid, elemids, p, pEdit, pAdd, pDel, pSearch, pView );
						} else {
							$(pgid+"_"+o.position,pgid).append(navtbl).width(twd);
						}
						$t.p._nvtd[0] = twd;
					} else {
						$(pgid+"_"+o.position,pgid).append(navtbl);
					}
					$t.p._nvtd[1] = twd;
				}
				$t.p.navGrid = true;
			}
			if($t.p.storeNavOptions) {
				$t.p.navOptions = o;
				$t.p.editOptions = pEdit;
				$t.p.addOptions = pAdd;
				$t.p.delOptions = pDel;
				$t.p.searchOptions = pSearch;
				$t.p.viewOptions = pView;
				$t.p.navButtons =[];
			}

		});
	},
	navButtonAdd : function (elem, p) {
		var	currstyle = this[0].p.styleUI,
			styles = $.jgrid.styleUI[currstyle].navigator;
		p = $.extend({
			caption : "newButton",
			title: '',
			buttonicon : styles.icon_newbutton_nav,
			onClickButton: null,
			position : "last",
			cursor : 'pointer',
			internal : false
		}, p ||{});
		return this.each(function() {
			if(!this.grid || typeof elem !== 'string') {return;}
			if( elem.indexOf("#") === 0 ) {
				elem = elem.substring(1);
			}
			elem = "#" +  $.jgrid.jqID(elem);
			var findnav = $(".navtable",elem)[0], $t = this,
			//getstyle = $.jgrid.getMethod("getStyleUI"),
			disabled = $.jgrid.styleUI[currstyle].common.disabled,
			hover = $.jgrid.styleUI[currstyle].common.hover,
			cornerall = $.jgrid.styleUI[currstyle].common.cornerall,
			iconbase = $.jgrid.styleUI[currstyle].common.icon_base;

			if ($t.p.storeNavOptions && !p.internal) {
				$t.p.navButtons.push([elem,p]);
			}

			if (findnav) {
				if( p.id && $("#"+$.jgrid.jqID(p.id), findnav)[0] !== undefined )  {return;}
				var tbd = $("<td></td>");
				if(p.buttonicon.toString().toUpperCase() === "NONE") {
                    $(tbd).addClass('ui-pg-button '+cornerall).append("<div class='ui-pg-div'>"+p.caption+"</div>");
				} else	{
					$(tbd).addClass('ui-pg-button '+cornerall).append("<div class='ui-pg-div'><span class='"+iconbase+" "+p.buttonicon+"'></span>"+p.caption+"</div>");
				}
				if(p.id) {$(tbd).attr("id",p.id);}
				if(p.position==='first'){
					if(findnav.rows[0].cells.length ===0 ) {
						$("tr",findnav).append(tbd);
					} else {
						$("tr td",findnav).eq( 0 ).before(tbd);
					}
				} else {
					$("tr",findnav).append(tbd);
				}
				$(tbd,findnav)
				.attr("title",p.title  || "")
				.click(function(e){
					if (!$(this).hasClass(disabled)) {
						$.jgrid.setSelNavIndex( $t, this);
						if ($.jgrid.isFunction(p.onClickButton) ) {p.onClickButton.call($t,e);}
					}
					return false;
				})
				.hover(
					function () {
						if (!$(this).hasClass(disabled)) {
							$(this).addClass(hover);
						}
					},
					function () {$(this).removeClass(hover);}
				);
			} else {
				findnav = $(".dropdownmenu",elem)[0];
				if (findnav) {
					var id = $(findnav).val(),
					eid = p.id || $.jgrid.randId(),
					item = $('<li class="ui-menu-item" role="presentation"><a class="'+ cornerall+' g-menu-item" tabindex="0" role="menuitem" id="'+eid+'">'+(p.caption || p.title)+'</a></li>');
					if(id) {
						if(p.position === 'first') {
							$("#"+id).prepend( item );
						} else {
							$("#"+id).append( item );
						}
						$(item).on("click", function(e){
							if (!$(this).hasClass(disabled)) {
								$("#"+id).hide();
								if ($.jgrid.isFunction(p.onClickButton) ) {
									p.onClickButton.call($t,e);
								}
							}
							return false;
						}).find("a")
						.hover(
							function () {
								if (!$(this).hasClass(disabled)) {
									$(this).addClass(hover);
								}
							},
							function () {$(this).removeClass(hover);}
						);
					}
				}
			}
		});
	},
	navSeparatorAdd:function (elem,p) {
		var	currstyle = this[0].p.styleUI,
			commonstyle = $.jgrid.styleUI[currstyle].common;
		p = $.extend({
			sepclass : "ui-separator",
			sepcontent: '',
			position : "last"
		}, p ||{});
		return this.each(function() {
			if( !this.grid)  {return;}
			if( typeof elem === "string" && elem.indexOf("#") !== 0) {elem = "#"+$.jgrid.jqID(elem);}
			var findnav = $(".navtable",elem)[0], sep, id;
			if ( this.p.storeNavOptions ) {
				this.p.navButtons.push([elem,p]);
			}
			
			if(findnav) {
				sep = "<td class='ui-pg-button "+ commonstyle.disabled +"' style='width:4px;'><span class='"+p.sepclass+"'></span>"+p.sepcontent+"</td>";
				if (p.position === 'first') {
					if (findnav.rows[0].cells.length === 0) {
						$("tr", findnav).append(sep);
					} else {
						$("tr td", findnav).eq( 0 ).before(sep);
					}
				} else {
					$("tr", findnav).append(sep);
				}
			} else {
				findnav = $(".dropdownmenu",elem)[0];
				sep = "<li class='ui-menu-item " +commonstyle.disabled + "' style='width:100%' role='presentation'><hr class='ui-separator-li'></li>";
				if(findnav) {
					id = $(findnav).val();
					if(id) {
						if(p.position === "first") {
							$("#"+id).prepend( sep );
						} else {
							$("#"+id).append( sep );
						}
					}
				}
			}
		});
	},
	_buildNavMenu : function ( elem, elemids, p, pEdit, pAdd, pDel, pSearch, pView ) {
		return this.each(function() {
			var $t = this,
			//actions = ['add','edit', 'del', 'view', 'search','refresh'],
			regional =  $.jgrid.getRegional($t, 'nav'),
			currstyle = $t.p.styleUI,
			styles = $.jgrid.styleUI[currstyle].navigator,
			classes = $.jgrid.styleUI[currstyle].filter,
			commonstyle = $.jgrid.styleUI[currstyle].common,
			mid = "form_menu_"+$.jgrid.randId(),
			bt = p.navButtonText ? p.navButtonText : regional.selectcaption || 'Actions',
			act = "<button class='dropdownmenu "+commonstyle.button+"' value='"+mid+"'>" + bt +"</button>";
			$(elem+"_"+p.position, elem).append( act );
			var alertIDs = {themodal: 'alertmod_' + this.p.id, modalhead: 'alerthd_' + this.p.id,modalcontent: 'alertcnt_' + this.p.id},
			_buildMenu = function() {
				var fs =  $('.ui-jqgrid').css('font-size') || '11px',
				eid, itm,
				str = $('<ul id="'+mid+'" class="ui-nav-menu modal-content" role="menu" tabindex="0" style="display:none;font-size:'+fs+'"></ul>');
				if( p.add ) {
					pAdd = pAdd || {};
					eid = pAdd.id || "add_"+elemids;
					itm = $('<li class="ui-menu-item" role="presentation"><a class="'+ commonstyle.cornerall+' g-menu-item" tabindex="0" role="menuitem" id="'+eid+'">'+(p.addtext || p.addtitle)+'</a></li>').click(function(){
						if (!$(this).hasClass( commonstyle.disabled )) {
							if ($.jgrid.isFunction( p.addfunc )) {
								p.addfunc.call($t);
							} else {
								$($t).jqGrid("editGridRow","new",pAdd);
							}
							$(str).hide();
						}
						return false;
					});
					$(str).append(itm);
				}
				if( p.edit ) {
					pEdit = pEdit || {};
					eid = pEdit.id || "edit_"+elemids;
					itm = $('<li class="ui-menu-item" role="presentation"><a class="'+ commonstyle.cornerall+' g-menu-item" tabindex="0" role="menuitem" id="'+eid+'">'+(p.edittext || p.edittitle)+'</a></li>').click(function(){
						if (!$(this).hasClass( commonstyle.disabled )) {
							var sr = $t.p.selrow;
							if (sr) {
								if($.jgrid.isFunction( p.editfunc ) ) {
									p.editfunc.call($t, sr);
								} else {
									$($t).jqGrid("editGridRow",sr,pEdit);
								}
							} else {
								$.jgrid.viewModal("#"+alertIDs.themodal,{gbox:"#gbox_"+$.jgrid.jqID($t.p.id),jqm:true});
								$("#jqg_alrt").focus();
							}
							$(str).hide();
						}
						return false;
					});
					$(str).append(itm);
				}
				if( p.view ) {
					pView = pView || {};
					eid = pView.id || "view_"+elemids;
					itm = $('<li class="ui-menu-item" role="presentation"><a class="'+ commonstyle.cornerall+' g-menu-item" tabindex="0" role="menuitem" id="'+eid+'">'+(p.viewtext || p.viewtitle)+'</a></li>').click(function(){
						if (!$(this).hasClass( commonstyle.disabled )) {
							var sr = $t.p.selrow;
							if (sr) {
								if($.jgrid.isFunction( p.editfunc ) ) {
									p.viewfunc.call($t, sr);
								} else {
									$($t).jqGrid("viewGridRow",sr,pView);
								}
							} else {
								$.jgrid.viewModal("#"+alertIDs.themodal,{gbox:"#gbox_"+$.jgrid.jqID($t.p.id),jqm:true});
								$("#jqg_alrt").focus();
							}
							$(str).hide();
						}
						return false;
					});
					$(str).append(itm);
				}
				if( p.del ) {
					pDel = pDel || {};
					eid = pDel.id || "del_"+elemids;
					itm = $('<li class="ui-menu-item" role="presentation"><a class="'+ commonstyle.cornerall+' g-menu-item" tabindex="0" role="menuitem" id="'+eid+'">'+(p.deltext || p.deltitle)+'</a></li>').click(function(){
						if (!$(this).hasClass( commonstyle.disabled )) {
							var dr;
							if($t.p.multiselect) {
								dr = $t.p.selarrrow;
								if(dr.length===0) {dr = null;}
							} else {
								dr = $t.p.selrow;
							}
							if(dr){
								if($.jgrid.isFunction( p.delfunc )){
									p.delfunc.call($t, dr);
								}else{
									$($t).jqGrid("delGridRow",dr,pDel);
								}
							} else  {
								$.jgrid.viewModal("#"+alertIDs.themodal,{gbox:"#gbox_"+$.jgrid.jqID($t.p.id),jqm:true});$("#jqg_alrt").focus();
							}
							$(str).hide();
						}
						return false;
					});
					$(str).append(itm);
				}
				if(p.add || p.edit || p.del || p.view) {
					$(str).append("<li class='ui-menu-item " +commonstyle.disabled + "' style='width:100%' role='presentation'><hr class='ui-separator-li'></li>");
				}
				if( p.search ) {
					pSearch = pSearch || {};
					eid = pSearch.id || "search_"+elemids;
					itm = $('<li class="ui-menu-item" role="presentation"><a class="'+ commonstyle.cornerall+' g-menu-item" tabindex="0" role="menuitem" id="'+eid+'">'+(p.searchtext || p.searchtitle)+'</a></li>').click(function(){
						if (!$(this).hasClass( commonstyle.disabled )) {
							if($.jgrid.isFunction( p.searchfunc )) {
								p.searchfunc.call($t, pSearch);
							} else {
								$($t).jqGrid("searchGrid",pSearch);
							}
							$(str).hide();
						}
						return false;
					});
					$(str).append(itm);
					if (pSearch.showOnLoad && pSearch.showOnLoad === true) {
						$( itm ).click();
					}
				}
				if( p.refresh ) {
					eid = pSearch.id || "search_"+elemids;
					itm = $('<li class="ui-menu-item" role="presentation"><a class="'+ commonstyle.cornerall+' g-menu-item" tabindex="0" role="menuitem" id="'+eid+'">'+(p.refreshtext || p.refreshtitle)+'</a></li>').click(function(){
						if (!$(this).hasClass( commonstyle.disabled )) {
							if($.jgrid.isFunction(p.beforeRefresh)) {p.beforeRefresh.call($t);}
							$t.p.search = false;
							$t.p.resetsearch =  true;
							try {
								if( p.refreshstate !== 'currentfilter') {
									var gID = $t.p.id;
									$t.p.postData.filters ="";
									try {
										$("#fbox_"+$.jgrid.jqID(gID)).jqFilter('resetFilter');
									} catch(ef) {}
									if($.jgrid.isFunction($t.clearToolbar)) {$t.clearToolbar.call($t,false);}
								}
							} catch (e) {}
							switch (p.refreshstate) {
								case 'firstpage':
									$($t).trigger("reloadGrid", [{page:1}]);
									break;
								case 'current':
								case 'currentfilter':
									$($t).trigger("reloadGrid", [{current:true}]);
									break;
							}
							if($.jgrid.isFunction(p.afterRefresh)) {p.afterRefresh.call($t);}
							$(str).hide();
						}
						return false;
					});
					$(str).append(itm);
				}
				$(str).hide();
				$('body').append(str);
				$("#"+mid).addClass("ui-menu " + classes.menu_widget);
				$("#"+mid+" > li > a").hover(
					function(){ $(this).addClass(commonstyle.hover); },
					function(){ $(this).removeClass(commonstyle.hover); }
				);
			};
			_buildMenu();
			$(".dropdownmenu", elem+"_"+p.position).on("click", function( e ){
				var offset = $(this).offset(),
				left = ( offset.left ),
				top = parseInt( offset.top),
				bid =$(this).val();
				//if( $("#"+mid)[0] === undefined)  {
					//_buildMenu();
				//}
				$("#"+bid).show().css({"top":top - ($("#"+bid).height() +10)+"px", "left":left+"px"});
				e.stopPropagation();
			});
			$("body").on('click', function(e){
				if(!$(e.target).hasClass("dropdownmenu")) {
					$("#"+mid).hide();
				}
			});
		});
	},
	GridToForm : function( rowid, formid ) {
		return this.each(function(){
			var $t = this, i;
			if (!$t.grid) {return;}
			var rowdata = $($t).jqGrid("getRowData",rowid);
			if (rowdata) {
				for(i in rowdata) {
					if(rowdata.hasOwnProperty(i)) {
					if ( $("[name="+$.jgrid.jqID(i)+"]",formid).is("input:radio") || $("[name="+$.jgrid.jqID(i)+"]",formid).is("input:checkbox"))  {
						$("[name="+$.jgrid.jqID(i)+"]",formid).each( function() {
							if( $(this).val() == rowdata[i] ) {
								$(this)[$t.p.useProp ? 'prop': 'attr']("checked",true);
							} else {
								$(this)[$t.p.useProp ? 'prop': 'attr']("checked", false);
							}
						});
					} else {
					// this is very slow on big table and form.
						$("[name="+$.jgrid.jqID(i)+"]",formid).val(rowdata[i]);
					}
				}
			}
			}
		});
	},
	FormToGrid : function(rowid, formid, mode, position){
		return this.each(function() {
			var $t = this;
			if(!$t.grid) {return;}
			if(!mode) {mode = 'set';}
			if(!position) {position = 'first';}
			var fields = $(formid).serializeArray();
			var griddata = {};
			$.each(fields, function(i, field){
				griddata[field.name] = field.value;
			});
			if(mode==='add') {$($t).jqGrid("addRowData",rowid,griddata, position);}
			else if(mode==='set') {$($t).jqGrid("setRowData",rowid,griddata);}
		});
	}
});
//module end
}));
