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
// clipboard
$.extend($.jgrid,{
	deserializeRow : function  (row, delimiter = ',') {
		const values = [];
		let index = 0, matchStart = 0, isInsideQuotations = false;
		while (true) {
			if (index === row.length) {
				values.push(row.slice(matchStart, index));
				break;
			}
			const char = row[index];
			if (char === delimiter && !isInsideQuotations) {
				values.push(
					row
					.slice(matchStart, index)
					.replace(/^"|"$/g, '')
					.replace(/""/g, '"')
					.replace(/\\n/g, '\n')
				);
				matchStart = index + 1;
			}
			if (char === '"')
				if (row[index + 1] === '"') index += 1;
				else isInsideQuotations = !isInsideQuotations;
			index += 1;
		}
		return values;
	},
	CSVtoObject : function (data, headers, delimiter = ',', new_line = '\t')  {
		const rows = data, /*data.split(new_line),*/ len = rows.length;
		if(len && rows[len-1] == "") {
			rows.pop()
		}
		return rows.map((row) => {
			const values = $.jgrid.deserializeRow(row, delimiter);
			return headers.reduce((obj, key, index) => {
				obj[key] = values[index];
				return obj;
			}, {});
		});
	},
	Permissions : async function() {
		const queryOpts = { name: 'clipboard-read', allowWithoutGesture: false };
		navigator.permissions.query(queryOpts).then((permObj)=>{
			// state will be 'granted', 'denied' or 'prompt':
			if( permObj && permObj.state === 'denied') {
				let msg = $.jgrid.getRegional(this, 'clipboard.errors');
				$.jgrid.toast({ 
					text: msg.enb_prm, 
					autoClose : false,
					styleUI: this.p.styleUI, 
					type:"warning"
				});						
			}
			// Listen for changes to the permission state
			// permissionStatus.onchange = () => {
			//	console.log(permissionStatus.state);
			// }
		}).catch((error)=>{
			// no translation
			console.log("clipboard-read permission not supported for this browser.")
		});
	},
	copyText: async function (textValue, o) {
		try {
			await navigator.clipboard.writeText(textValue);
			if(o.show_info_after_copy) {
				let msg = $.jgrid.getRegional(this, 'clipboard.msg');
				$.jgrid.toast( {
					text: msg.text_c, 
					styleUI: this.p.styleUI, 
					type:"info",
					position: o.toastPosition
				});
			}
		} catch (err) {
			let msg = $.jgrid.getRegional(this, 'clipboard.errors');
			$.jgrid.toast( { 
				text: msg.copy_err + err, 
				autoCloseTime: 4500,
				styleUI: this.p.styleUI, 
				type:"error"
			});
		}
	},
	getClipboardContents : async function ( ) {
		try {
			const text = await navigator.clipboard.readText();
			return text;
		} catch (err) {
			let msg = $.jgrid.getRegional(this, 'clipboard.errors');
			$.jgrid.toast( {
				text: msg.read_err + err, 
				styleUI: this.p.styleUI,
				autoCloseTime: 4500,
				type:"error"
			});
		}
	},
	copyRows : function( rows, cm , o) {
		var seldata =[],header=[], h_s = false, $t = $(rows).parents('table')[0];
		for(var j=0; j<rows.length;j++) {
			var row = rows[j];
			var dat = [];
			if(row.classList.contains("jqgrow")) {
				for (var i=0;i<row.cells.length; i++) {
					if(row.cells[i].classList.contains("selected-cell")) {
						if(h_s===false) {
							header.push(cm[i].name);
						}
						if(o.copy_formated_data === true)  {
							dat.push( row.cells[i].innerText) ; //? formated data in grid
						} else {
							try {
								dat.push($.unformat.call($t,$(row.cells[i]),{rowId:row.id, colModel:cm[i] }, i ) );
							} catch(e) {
								dat.push( $.jgrid.htmlDecode(row.cells[i].innerHTML) ); //as in getCell
							}
						}
					}
				}
				if(header.length) {
					h_s = true;
				}
				if(dat.length) {
					seldata.push( dat.join( o.copy_delimiter ));
				}
			}
		}
		if(o.copy_header_included && header.length) {
			seldata.unshift( header.join( o.copy_delimiter ) );
		}
		if( $.jgrid.isFunction(o.beforeCopyData)) {
			o.beforeCopyData.call(this, seldata, o);
		}
		$.jgrid.copyText.call($t, seldata.join( o.copy_newline), o);
		o.startCellIndex = null; o.startRowIndex = null;
		if( $.jgrid.isFunction(o.afterCopyData)) {
			o.afterCopyData.call(this, seldata, o);
		}
	},
	pasteRows : function(o, paste_add) {
		if(o.startCellIndex === null || o.startRowIndex === null) {
			let msg = $.jgrid.getRegional(this, 'clipboard.msg');
			$.jgrid.toast({ 
				text: msg.select_pos, 
				position:"middle center", 
				autoClose : false,
				styleUI: this.p.styleUI, 
				type:"warning"
			});			
			return;
		}
		var cm = this.p.colModel, grid_id = this.p.id;
		$.jgrid.getClipboardContents.call(this).then((data) => {
			if(data === "" || data == null) {
				let msg = $.jgrid.getRegional(this, 'clipboard.errors');
				$.jgrid.toast( {
					text: msg.get_data_err, 
					styleUI: this.p.styleUI,
					autoCloseTime: 4500,
					type:"error"
				});
				return;
			}
			var delim = o.paste_autodetect_delim  ? $.jgrid.guessDelimiters(data) : o.paste_delimiter, headers=[];
			if( $.jgrid.isFunction(o.beforePasteData)) {
				o.beforePasteData.call(this, data, delim);
			}
			data = data.split(o.paste_newline);
			if(!o.paste_header_included) {
				headers =  $.jgrid.deserializeRow(data.shift(), delim);
			} else {
				var h_l = data[0].split(delim).length;
				h_l += o.startCellIndex;
				if(h_l > cm.length) {
					h_l = cm.length;
				}
				for (var i = o.startCellIndex; i< h_l; i++) {
					headers.push(cm[i].name);
				}
			}
			if($.jgrid.isLocalStorage()) {
				localStorage.removeItem(grid_id+"_restore");
			}
			var rows_to_paste = $.jgrid.CSVtoObject(data, headers, delim, o.paste_newline);
			$("#"+grid_id).jqGrid("updateRowsByIndex", o.startRowIndex, rows_to_paste, o, paste_add);
			if( $.jgrid.isFunction(o.afterPasteData)) {
				o.afterPasteData.call(this, data);
			}
		});
	},
	undoPaste : function( grid_id ) {
		if(!$.jgrid.isLocalStorage()) {
			return;
		}
		var data = localStorage.getItem(grid_id+"_restore");
		if (data) {
			data = JSON.parse( data );
			
			if(Array.isArray(data)) {
				for(let i=0;i<data.length; i++) {
					$("#"+grid_id).jqGrid("setRowData", data[i]["_id_"], data[i]);
				}
			}
		}
		var rws = $("#"+grid_id);
		rws.find("tr.frompaste").each(function(i,n) {
			rws.jqGrid("delRowData", n.id);
		});
	},
	guessDelimiters : function  (data, separators = ['\t', ',', ';', '|']) {
		const idx = separators
			.map((separator) => data.indexOf(separator))
		    .reduce((prev, cur) =>
				prev === -1 || (cur !== -1 && cur < prev) ? cur : prev
			);
		return data[idx] || '\t';
	},
	repeatRow : function( o ) {
		var header=[], h_s = false, $t = this;
		var rows = this.rows, cm = this.p.colModel, source, target, target_ids = [], dat = {}, storeUpdate=[];
		const err = $.jgrid.getRegional(this, 'clipboard.errors');
		for(var j=0; j<rows.length;j++) {
			target = null;
			var row = rows[j];
			if(row.classList.contains("jqgrow")) {
				for (var i=0;i<row.cells.length; i++) {
					if(row.cells[i].classList.contains("selected-cell")) {
						if(h_s===false) {
							header.push(cm[i].name);
							source = row.id;
							try {
								dat[cm[i].name] = $.unformat.call($t,$(row.cells[i]),{rowId:row.id, colModel:cm[i] }, i ) ;
							} catch(e) {
								dat[cm[i].name] = $.jgrid.htmlDecode(row.cells[i].innerHTML) ; //as in getCell
							}
						} else {
							target = row.id;
						}
					}
				}
				if(header.length) {
					h_s = true;
				}
			}
			if(target !== null ) {
				var dd = $(this).jqGrid("getRowData",  target);
				dd["_id_"] = target;
				storeUpdate.push( dd );
				target_ids.push(target);
			}
		}
		if($.jgrid.isLocalStorage()) {
			localStorage.removeItem(this.id + "_restore");
			localStorage.setItem(this.id + "_restore", JSON.stringify(storeUpdate));
		} else {
			$.jgrid.toast({ 
				text: err.local_stor_err, 
				autoCloseTime: 4500, 
				styleUI: this.p.styleUI, 
				type:"warning"
			});
		}
		for(let j=0;j<target_ids.length;j++) {
			$(this).jqGrid('setRowData', target_ids[j], dat);
		}
		o.startCellIndex = null; o.startRowIndex = null;
	},
	repeatCol : function( o ) {
		var header=[], h_s = false, $t = this;
		var rows = this.rows, cm = this.p.colModel, target, fcol, target_ids = [], dat = [], storeUpdate=[];
		const err = $.jgrid.getRegional(this, 'clipboard.errors');
		for(var j=0; j<rows.length;j++) {
			target = null; fcol =  null;
			var row = rows[j];
			if(row.classList.contains("jqgrow")) {
				for (var i=0;i<row.cells.length; i++) {
					if(row.cells[i].classList.contains("selected-cell")) {
						if(h_s===false) {
							header.push(cm[i].name);
						}
						if(fcol===null) {
							try {
								dat.push( $.unformat.call($t,$(row.cells[i]),{rowId:row.id, colModel:cm[i] }, i ) );
							} catch(e) {
								dat.push( $.jgrid.htmlDecode(row.cells[i].innerHTML) ); //as in getCell
							}
						}
						fcol = true;
						target = row.id;
					}
				}
				if(header.length) {
					h_s = true;
				}
			}
			if(target !== null ) {
				var dd = $(this).jqGrid("getRowData",  target);
				dd["_id_"] = target;
				storeUpdate.push( dd );
				target_ids.push(target);
			}
		}
		let setme;
		header.shift();
		if($.jgrid.isLocalStorage()) {
			localStorage.removeItem(this.id + "_restore");
			localStorage.setItem(this.id + "_restore", JSON.stringify(storeUpdate));
		} else {
			$.jgrid.toast({ 
				text: err.local_stor_err, 
				autoCloseTime: 4500, 
				styleUI: this.p.styleUI, 
				type:"warning"
			});
		}		
		for(let j=0; j < target_ids.length; j++) {
			setme ={};
			for (let k=0; k < header.length; k++) {
				setme[header[k]] = dat[j];
			}
			$(this).jqGrid('setRowData', target_ids[j], setme);
		}
		o.startCellIndex = null; o.startRowIndex = null;
	}	
});
$.jgrid.extend({
	bindSelection : function( o ) {
		return this.each(function(){
			var selectTo = function(cell, table) {
				var row = cell.parent();    
				var cellIndex = cell.index();
				var rowIndex = row.index();

				var rowStart, rowEnd, cellStart, cellEnd;

				if (rowIndex < o.startRowIndex) {
					rowStart = rowIndex;
					rowEnd = o.startRowIndex;
				} else {
					rowStart = o.startRowIndex;
					rowEnd = rowIndex;
				}

				if (cellIndex < o.startCellIndex) {
					cellStart = cellIndex;
					cellEnd = o.startCellIndex;
				} else {
					cellStart = o.startCellIndex;
					cellEnd = cellIndex;
				}        

				for (var i = rowStart; i <= rowEnd; i++) {
					var rowCells = table.find("tr").eq(i).find("td");
					for (var j = cellStart; j <= cellEnd; j++) {
						rowCells.eq(j).addClass(selected);
					}        
				}
			};
			
			var selected = 'selected-cell',
				table = $("#"+ $.jgrid.jqID( this.p.id ) ),
				ts = this;
			table.find("td").on('mousedown.jqgselect',function (e) {

				if(e.which === 3) { // right click button for custom copy/paste
					var rect = $("#gbox_"+ts.id)[0].getBoundingClientRect();
					$("#"+ts.p.id+"_copypaste").css({left : e.clientX - rect.left, top: e.clientY - rect.top}).show();
					return false;
				}
				o.isMouseDown = true;
				var cell = $(this);
				table.find("."+selected).removeClass(selected); // deselect everything

				if (e.shiftKey) {
					selectTo(cell, table);                
				} else {
					cell.addClass(selected);
					o.startCellIndex = cell.index();
					o.startRowIndex = cell.parent().index();
				}
				return false; // prevent text selection
			})
			.on("mouseover.jqgselect",function () {
				if (!o.isMouseDown) return;
				table.find("."+ selected).removeClass(selected);
				selectTo($(this), table);
			})
			.on("selectstart.jqgselect", function () {
				return false;
			});
		});
	},
	startClipboard : function( prm ) {
		var o = $.extend({
			copy_delimiter : '\t',
			copy_newline: '\n',
			copy_header_included : true,
			copy_formated_data : true,
			show_info_after_copy: true,
			paste_delimiter : '\t',
			paste_newline : '\n',
			paste_autodetect_delim : true,
			paste_header_included : false,
			paste_skip_formatter : true,
			show_info_after_paste: true,
			beforeCopyData : null,
			afterCopyData :null,
			beforePasteData : null,
			afterPasteData : null,
			menuConfig : {
				copy : true,
				paste: true,
				paste_add : true,
				row_vertical : true,
				row_horizontal : true,
				undo : true,
				cancel : true
			},
			toastPosition : "top center",
			userMenus : [],
			startCellIndex : null,
			startRowIndex : null,
			isMouseDown : false
		}, prm || {});
		
		return this.each(function(){
			var colmenustyle = $.jgrid.styleUI[(this.p.styleUI || 'jQueryUI')].colmenu, $t=this;
			var arf1 = '<ul id="'+this.id+'_copypaste" class="ui-search-menu modal-content column-menu ui-menu jqgrid-caption-menu ' + colmenustyle.menu_widget+'" role="menu" tabindex="0"></ul>';
			$("#gbox_"+this.id).append(arf1);
			const menus = $.jgrid.getRegional(this, 'clipboard.menus'),
			menuicons = $.jgrid.styleUI[(this.p.styleUI || 'jQueryUI')].clipboard,
			iconbase = $.jgrid.styleUI[(this.p.styleUI || 'jQueryUI')].common.icon_base;
			var menu = [], menus_copy = [];
			menu["copy"]= {"id" : "copy_act", icon : iconbase+" "+menuicons.icon_copy ,"title" : menus.copy_act, "click": function() { $.jgrid.copyRows(this.rows,this.p.colModel, o ); } };
			menu["paste"] = {"id" : "paste_act", icon : iconbase+" "+menuicons.icon_paste, "title" : menus.paste_act, "click": function() { $.jgrid.pasteRows.call(this, o, false); } };
			menu["paste_add"] = {"id" : "paste_act_add", icon : iconbase+" "+menuicons.icon_paste_add, "title" : menus.paste_act_add, "click": function() { $.jgrid.pasteRows.call(this, o, true); } };
			menu["row_vertical"] = {"id" : "repeat_act_row", icon : iconbase+" "+menuicons.icon_repeat_row, "title" : menus.repeat_act_row, "click": function() { $.jgrid.repeatRow.call( this, o); } };				
			menu["row_horizontal"] = {"id" : "repeat_act_col", icon : iconbase+" "+menuicons.icon_repeat_col, "title" : menus.repeat_act_col, "click": function() { $.jgrid.repeatCol.call( this, o); } };				
			menu["undo"] = {"id" : "undo_act", icon : iconbase+" "+menuicons.icon_undo, "title" : menus.undo_act, "click": function() { $.jgrid.undoPaste( this.id, o); } };
			menu["cancel"] = {"id" : "cancel_act", icon : iconbase+" "+menuicons.icon_cancel, "title" : menus.cancel_act, "click": function() { $("#"+$t.p.id+"_copypaste").hide(); } };
			//return;
			var cnt =0;
			for(let key in o.menuConfig) {
				if(Object.hasOwn(o.menuConfig, key) && o.menuConfig[key] === true) {
					cnt++;
					if(cnt > 1) {
						menus_copy.push({divider : true});
					}
					menus_copy.push(menu[key]);
				}
			}
			if(Array.isArray(o.userMenus) ) {
				for(let i=0; i< o.userMenus.length; i++) {
					menus_copy.push( o.userMenus[i] );
				}
			}
			$(this).jqGrid("menubarAdd", menus_copy, "_copypaste");
			$(this).on('jqGridAfterGridComplete.setBindSelections',function(){
				$(this).jqGrid('bindSelection', o);
				o.startCellIndex = o.startRowIndex = null;
			});
			$(this).on('jqGridRightClickRow.setBindSelections',function(){
				//console.log(e, id, iRow, iCol, e1);
				return false;
			});
			$(document).on("mouseup.jqgclipme", function () {
				o.isMouseDown = false;
			});
			$("body").on('click.jqgclipme', function(e){
				if(!$(e.target).closest(".ui-jqgrid-menubar").length) {
					try {
						$("#"+$t.p.id+"_copypaste").hide();
					} catch (e1) {}
				}
			});			
			$.jgrid.Permissions.call(this);
			$t.p.isClipboard = true;
			$(this).jqGrid('bindSelection', o);
			o.startCellIndex = o.startRowIndex = null;
		});
	},
	stopClipboard : function() {
		// 
		return this.each(function(){
			var selected = 'selected-cell';
			$("#"+this.p.id+"_copypaste").remove();
			$("body").off("click.jqgclipme");
			$(document).off("mouseup.jqgclipme");
			$(this)
			.off("jqGridAfterGridComplete.setBindSelections")
			.off("jqGridAfterGridComplete.setBindSelections")
			.find("td")
			.removeClass(selected)
			.off("mousedown.jqgselect")
			.off("mouseover.jqgselect")
			.off("selectstart.jqgselect");
			this.p.isClipboard = false;
		});
	},
	updateRowsByIndex : function(startInd, data, o, paste_add) {
		var success = true;
		this.each(function(){
			const err = $.jgrid.getRegional(this, 'clipboard.errors');
			const msg = $.jgrid.getRegional(this, 'clipboard.msg');
			if(Array.isArray(data)) {
				startInd = parseInt(startInd,10);
				if(startInd < 0 ) {
					success = false;
					$.jgrid.toast( {
						text: err.start_ind_err, 
						styleUI: this.p.styleUI,
						autoCloseTime: 4500,
						type:"error"
					});
				}  else {
					var datalen = data.length, i=0, row, grow, storeUpdate = [], inserted = 0, updated =0;
					while(i < datalen) {
						row = data[i];
						grow = this.rows[startInd];
						if( !grow || paste_add===true) {
							$(this).jqGrid("addRowData", null, row, "last", null, "frompaste");// perform add
							inserted++;
						} else {
							let o_row = $(this).jqGrid("getRowData",  grow.id);
							if( !$.isEmptyObject(o_row) ) {
								o_row["_id_"] = grow.id;
								data[i]["_id_"] = grow.id;
								storeUpdate.push( o_row );
								$(this).jqGrid("setRowData",  grow.id, row, undefined , false, o.paste_skip_formatter);
								updated++;
							}
							
						}
						i++;
						startInd++;
					}
					if(storeUpdate.length) {
						if($.jgrid.isLocalStorage()) {
							localStorage.setItem(this.id+"_restore", JSON.stringify(storeUpdate));
						} else {
							$.jgrid.toast({ 
								text: err.local_stor_err, 
								autoCloseTime: 4500, 
								styleUI: this.p.styleUI, 
								type:"warning"
							});
						}
					}
					if(o.show_info_after_paste) {
						$.jgrid.info_dialog(msg.info_cap,'<div>'+msg.total_row +datalen + '</div><div>'+msg.insert_row  + inserted+ '</div><div>'+msg.update_row + updated +'</div>','',{styleUI : this.p.styleUI ,autoClose: true, autoCloseTime:4500});
					}
				}
			} else {
				success = false; 
				$.jgrid.toast({ 
					text: err.not_array_err, 
					autoCloseTime:3500, 
					styleUI: this.p.styleUI, 
					type:"error"
				});
			}
		});
		return success;
	}
// end clipboard grid
});
//clipboard
//module end
}));
