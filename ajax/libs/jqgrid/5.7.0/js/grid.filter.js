/*
 *
 * The filter uses JSON entities to hold filter rules and groups. Here is an example of a filter:

{ "groupOp": "AND",
      "groups" : [
        { "groupOp": "OR",
            "rules": [
                { "field": "name", "op": "eq", "data": "England" },
                { "field": "id", "op": "le", "data": "5"}
             ]
        }
      ],
      "rules": [
        { "field": "name", "op": "eq", "data": "Romania" },
        { "field": "id", "op": "le", "data": "1"}
      ]
}
*/
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
$.fn.jqFilter = function( arg ) {
	if (typeof arg === 'string') {

		var fn = $.fn.jqFilter[arg];
		if (!fn) {
			throw ("jqFilter - No such method: " + arg);
		}
		var args = $.makeArray(arguments).slice(1);
		return fn.apply(this,args);
	}

	var p = $.extend(true,{
		filter: null,
		columns: [],
		sortStrategy: null,
		onChange : null,
		afterRedraw : null,
		checkValues : null,
		error: false,
		errmsg : "",
		errorcheck : true,
		showQuery : true,
		sopt : null,
		ops : [],
		operands : null,
		numopts : ['eq','ne', 'lt', 'le', 'gt', 'ge', 'nu', 'nn', 'in', 'ni'],
		stropts : ['eq', 'ne', 'bw', 'bn', 'ew', 'en', 'cn', 'nc', 'nu', 'nn', 'in', 'ni'],
		strarr : ['text', 'string', 'blob'],
		groupOps : [{ op: "AND", text: "AND" },	{ op: "OR",  text: "OR" }],
		groupButton : true,
		ruleButtons : true,
		uniqueSearchFields : false,
		direction : "ltr",
		addsubgrup : "Add subgroup",
		addrule : "Add rule",
		delgroup : "Delete group",
		delrule : "Delete rule",
		autoencode : false,
		unaryOperations : []
	}, $.jgrid.filter, arg || {});
	return this.each( function() {
		if (this.filter) {return;}
		this.p = p;
		// setup filter in case if they is not defined
		if (this.p.filter === null || this.p.filter === undefined) {
			this.p.filter = {
				groupOp: this.p.groupOps[0].op,
				rules: [],
				groups: []
			};
		}

		// Sort the columns if the sort strategy is provided.
		if (this.p.sortStrategy != null && $.jgrid.isFunction(this.p.sortStrategy)) {
			this.p.columns.sort(this.p.sortStrategy);
		}

		var i, len = this.p.columns.length, cl,
		isIE = /msie/i.test(navigator.userAgent) && !window.opera;

		// translating the options
		this.p.initFilter = $.extend(true,{},this.p.filter);

		// set default values for the columns if they are not set
		if( !len ) {return;}
		for(i=0; i < len; i++) {
			cl = this.p.columns[i];
			if( cl.stype ) {
				// grid compatibility
				cl.inputtype = cl.stype;
			} else if(!cl.inputtype) {
				cl.inputtype = 'text';
			}
			if( cl.sorttype ) {
				// grid compatibility
				cl.searchtype = cl.sorttype;
			} else if (!cl.searchtype) {
				cl.searchtype = 'string';
			}
			if(cl.hidden === undefined) {
				// jqGrid compatibility
				cl.hidden = false;
			}
			if(!cl.label) {
				cl.label = cl.name;
			}
			if(cl.index) {
				cl.name = cl.index;
			}
			if(!cl.hasOwnProperty('searchoptions')) {
				cl.searchoptions = {};
			}
			if(!cl.hasOwnProperty('searchrules')) {
				cl.searchrules = {};
			}
			if(cl.search === undefined) {
				cl.inlist = true;
			} else {
				cl.inlist = cl.search;
			}
		}
		var getGrid = function () {
			return $("#" + $.jgrid.jqID(p.id))[0] || null;
		},

		$tg = getGrid(),
		classes = $.jgrid.styleUI[($tg.p.styleUI || 'jQueryUI')].filter,
		common = $.jgrid.styleUI[($tg.p.styleUI || 'jQueryUI')].common;


		if(this.p.showQuery) {
			$(this).append("<table class='queryresult " + classes.table_widget + "' style='display:block;max-width:440px;border:0px none;' dir='"+this.p.direction+"'><tbody><tr><td class='query'></td></tr></tbody></table>");
		}
		/*
		 *Perform checking.
		 *
		*/
		var checkData = function(val, colModelItem) {
			var ret = [true,""], $t = getGrid();
			if($.jgrid.isFunction(colModelItem.searchrules)) {
				ret = colModelItem.searchrules.call($t, val, colModelItem);
			} else if($.jgrid && $.jgrid.checkValues) {
				try {
					ret = $.jgrid.checkValues.call($t, val, -1, colModelItem.searchrules, colModelItem.label);
				} catch (e) {}
			}
			if(ret && ret.length && ret[0] === false) {
				p.error = !ret[0];
				p.errmsg = ret[1];
			}
		};
		/* moving to common
		randId = function() {
			return Math.floor(Math.random()*10000).toString();
		};
		*/

		this.onchange = function (  ){
			// clear any error
			this.p.error = false;
			this.p.errmsg="";
			return $.jgrid.isFunction(this.p.onChange) ? this.p.onChange.call( this, this.p ) : false;
		};
		/*
		 * Redraw the filter every time when new field is added/deleted
		 * and field is  changed
		 */
		this.reDraw = function() {
			$(this).find("table.group").first().remove();
			var t = this.createTableForGroup(p.filter, null);
			$(this).append(t);
			if($.jgrid.isFunction(this.p.afterRedraw) ) {
				this.p.afterRedraw.call(this, this.p);
			}
		};
		/*
		 * Creates a grouping data for the filter
		 * @param group - object
		 * @param parentgroup - object
		 */
		this.createTableForGroup = function(group, parentgroup) {
			var that = this,  i;
			// this table will hold all the group (tables) and rules (rows)
			var table = $("<table class='group " + classes.table_widget +" ui-search-table' style='border:0px none;'><tbody></tbody></table>"),
			// create error message row
			align = "left";
			if(this.p.direction === "rtl") {
				align = "right";
				table.attr("dir","rtl");
			}
			if(parentgroup === null) {
				table.append("<tr class='error' style='display:none;'><th colspan='5' class='" + common.error + "' align='"+align+"'></th></tr>");
			}

			var tr = $("<tr></tr>");
			table.append(tr);
			// this header will hold the group operator type and group action buttons for
			// creating subgroup "+ {}", creating rule "+" or deleting the group "-"
			var th = $("<th colspan='5' align='"+align+"'></th>");
			tr.append(th);

			if(this.p.ruleButtons === true) {
			// dropdown for: choosing group operator type
			var groupOpSelect = $("<select size='1' class='opsel " + classes.srSelect + "'></select>");
			th.append(groupOpSelect);
			// populate dropdown with all posible group operators: or, and
			var str= "", selected;
			for (i = 0; i < p.groupOps.length; i++) {
				selected =  group.groupOp === that.p.groupOps[i].op ? " selected='selected'" :"";
				str += "<option value='"+that.p.groupOps[i].op+"'" + selected+">"+that.p.groupOps[i].text+"</option>";
			}

			groupOpSelect
			.append(str)
			.on('change',function() {
				group.groupOp = $(groupOpSelect).val();
				that.onchange(); // signals that the filter has changed
			});
			}
			// button for adding a new subgroup
			var inputAddSubgroup ="<span></span>";
			if(this.p.groupButton) {
				inputAddSubgroup = $("<input type='button' value='+ {}' title='" +that.p.subgroup+"' class='add-group " + common.button + "'/>");
				inputAddSubgroup.on('click',function() {
					if (group.groups === undefined ) {
						group.groups = [];
					}

					group.groups.push({
						groupOp: p.groupOps[0].op,
						rules: [],
						groups: []
					}); // adding a new group

					that.reDraw(); // the html has changed, force reDraw

					that.onchange(); // signals that the filter has changed
					return false;
				});
			}
			th.append(inputAddSubgroup);
			if(this.p.ruleButtons === true) {
			// button for adding a new rule
			var inputAddRule = $("<input type='button' value='+' title='"+that.p.addrule+"' class='add-rule ui-add " + common.button + "'/>"), cm;
			inputAddRule.on('click',function() {
				//if(!group) { group = {};}
				if (group.rules === undefined) {
					group.rules = [];
				}
				for (i = 0; i < that.p.columns.length; i++) {
				// but show only serchable and serchhidden = true fields
					var searchable = (that.p.columns[i].search === undefined) ?  true: that.p.columns[i].search,
					hidden = (that.p.columns[i].hidden === true),
					ignoreHiding = (that.p.columns[i].searchoptions.searchhidden === true);
					if ((ignoreHiding && searchable) || (searchable && !hidden)) {
						cm = that.p.columns[i];
						break;
					}
				}
				if( !cm ) {
					return false;
				}
				var opr;
				if( cm.searchoptions.sopt ) {opr = cm.searchoptions.sopt;}
				else if(that.p.sopt) { opr= that.p.sopt; }
				else if  ( $.inArray(cm.searchtype, that.p.strarr) !== -1 ) {opr = that.p.stropts;}
				else {opr = that.p.numopts;}

				group.rules.push({
					field: cm.name,
					op: opr[0],
					data: ""
				}); // adding a new rule

				that.reDraw(); // the html has changed, force reDraw
				// for the moment no change have been made to the rule, so
				// this will not trigger onchange event
				return false;
			});
			th.append(inputAddRule);
			}

			// button for delete the group
			if (parentgroup !== null) { // ignore the first group
				var inputDeleteGroup = $("<input type='button' value='-' title='"+that.p.delgroup+"' class='delete-group " + common.button + "'/>");
				th.append(inputDeleteGroup);
				inputDeleteGroup.on('click',function() {
				// remove group from parent
					for (i = 0; i < parentgroup.groups.length; i++) {
						if (parentgroup.groups[i] === group) {
							parentgroup.groups.splice(i, 1);
							break;
						}
					}

					that.reDraw(); // the html has changed, force reDraw

					that.onchange(); // signals that the filter has changed
					return false;
				});
			}

			// append subgroup rows
			if (group.groups !== undefined) {
				for (i = 0; i < group.groups.length; i++) {
					var trHolderForSubgroup = $("<tr></tr>");
					table.append(trHolderForSubgroup);

					var tdFirstHolderForSubgroup = $("<td class='first'></td>");
					trHolderForSubgroup.append(tdFirstHolderForSubgroup);

					var tdMainHolderForSubgroup = $("<td colspan='4'></td>");
					tdMainHolderForSubgroup.append(this.createTableForGroup(group.groups[i], group));
					trHolderForSubgroup.append(tdMainHolderForSubgroup);
				}
			}
			if(group.groupOp === undefined) {
				group.groupOp = that.p.groupOps[0].op;
			}

			// append rules rows
			var suni = that.p.ruleButtons && that.p.uniqueSearchFields, ii;
			if( suni ) {
				for ( ii = 0; ii < that.p.columns.length; ii++) {
					if(that.p.columns[ii].inlist) {
						that.p.columns[ii].search = true;
					}
				}
			}
			if (group.rules !== undefined) {
				for (i = 0; i < group.rules.length; i++) {
					table.append(
                       this.createTableRowForRule(group.rules[i], group)
					);
					if( suni ) {
						var field = group.rules[i].field;
						for ( ii = 0; ii < that.p.columns.length; ii++) {
							if(field === that.p.columns[ii].name) {
								that.p.columns[ii].search = false;
								break;
							}
						}
					}
				}
			}
			return table;
		};
		/*
		 * Create the rule data for the filter
		 */
		this.createTableRowForRule = function(rule, group ) {
			// save current entity in a variable so that it could
			// be referenced in anonimous method calls

			var that=this, $t = getGrid(), tr = $("<tr></tr>"),
			//document.createElement("tr"),

			// first column used for padding
			//tdFirstHolderForRule = document.createElement("td"),
			i, op, trpar, cm, str="", selected;
			//tdFirstHolderForRule.setAttribute("class", "first");
			tr.append("<td class='first'></td>");


			// create field container
			var ruleFieldTd = $("<td class='columns'></td>");
			tr.append(ruleFieldTd);


			// dropdown for: choosing field
			var ruleFieldSelect = $("<select size='1' class='" + classes.srSelect + "'></select>"), ina, aoprs = [];
			ruleFieldTd.append(ruleFieldSelect);
			ruleFieldSelect.on('change',function() {
				if( that.p.ruleButtons && that.p.uniqueSearchFields ) {
					var prev = parseInt($(this).data('curr'),10),
					curr = this.selectedIndex;
					if(prev >= 0 ) {
						that.p.columns[prev].search = true;
						$(this).data('curr', curr);
						that.p.columns[curr].search = false;
					}
				}

				rule.field = $(ruleFieldSelect).val();

				trpar = $(this).parents("tr").first();
				$(".data",trpar).empty();
				for (i=0;i<that.p.columns.length;i++) {
					if(that.p.columns[i].name ===  rule.field) {
						cm = that.p.columns[i];
						break;
					}
				}
				if(!cm) {return;}
				cm.searchoptions.id = $.jgrid.randId();
				cm.searchoptions.name = rule.field;
				cm.searchoptions.oper = 'filter';

				if(isIE && cm.inputtype === "text") {
					if(!cm.searchoptions.size) {
						cm.searchoptions.size = 10;
					}
				}
				var elm = $.jgrid.createEl.call($t, cm.inputtype,cm.searchoptions, "", true, that.p.ajaxSelectOptions || {}, true);
				$(elm).addClass("input-elm " + classes.srInput );
				//that.createElement(rule, "");

				if( cm.searchoptions.sopt ) {op = cm.searchoptions.sopt;}
				else if(that.p.sopt) { op= that.p.sopt; }
				else if  ($.inArray(cm.searchtype, that.p.strarr) !== -1) {op = that.p.stropts;}
				else {op = that.p.numopts;}
				// operators
				var s ="", so = 0;
				aoprs = [];
				$.each(that.p.ops, function() { aoprs.push(this.oper); });
				for ( i = 0 ; i < op.length; i++) {
					ina = $.inArray(op[i],aoprs);
					if(ina !== -1) {
						if(so===0) {
							rule.op = that.p.ops[ina].oper;
						}
						s += "<option value='"+that.p.ops[ina].oper+"'>"+that.p.ops[ina].text+"</option>";
						so++;
					}
				}
				$(".selectopts",trpar).empty().append( s );
				$(".selectopts",trpar)[0].selectedIndex = 0;
				if( $.jgrid.msie() && $.jgrid.msiever() < 9) {
					var sw = parseInt($("select.selectopts",trpar)[0].offsetWidth, 10) + 1;
					$(".selectopts",trpar).width( sw );
					$(".selectopts",trpar).css("width","auto");
				}
				// data
				$(".data",trpar).append( elm );
				$.jgrid.bindEv.call($t, elm, cm.searchoptions);
				$(".input-elm",trpar).on('change',function( e ) {
					var elem = e.target;
					if( cm.inputtype === 'custom' && $.jgrid.isFunction(cm.searchoptions.custom_value) ) {
						rule.data =  cm.searchoptions.custom_value.call($t, $(".customelement", this), 'get');
					} else {
						rule.data = $(elem).val();
					}
					if(cm.inputtype === 'select' && cm.searchoptions.multiple ) {
						rule.data = rule.data.join(",");
					}
					that.onchange(); // signals that the filter has changed
				});
				setTimeout(function(){ //IE, Opera, Chrome
				rule.data = $(elm).val();
				if(rule.op === 'nu' || rule.op === 'nn' || $.inArray(rule.op, that.p.unaryOperations) >=0 ) {
					$(elm).attr('readonly','true');
					$(elm).attr('disabled','true');
				}
				
				if(cm.inputtype === 'select' && cm.searchoptions.multiple && Array.isArray(rule.data)) {
					rule.data = rule.data.join(",");
				}
				that.onchange();  // signals that the filter has changed
				}, 0);
			});

			// populate drop down with user provided column definitions
			var j=0;
			for (i = 0; i < that.p.columns.length; i++) {
				// but show only serchable and serchhidden = true fields
				var searchable = (that.p.columns[i].search === undefined) ? true: that.p.columns[i].search,
				hidden = (that.p.columns[i].hidden === true),
				ignoreHiding = (that.p.columns[i].searchoptions.searchhidden === true);
				if ((ignoreHiding && searchable) || (searchable && !hidden)) {
					selected = "";
					if(rule.field === that.p.columns[i].name) {
						selected = " selected='selected'";
						j=i;
					}
					str += "<option value='"+that.p.columns[i].name+"'" +selected+">"+that.p.columns[i].label+"</option>";
				}
			}
			ruleFieldSelect.append( str );
			ruleFieldSelect.data('curr', j);


			// create operator container
			var ruleOperatorTd = $("<td class='operators'></td>");
			tr.append(ruleOperatorTd);
			cm = p.columns[j];
			// create it here so it can be referentiated in the onchange event
			//var RD = that.createElement(rule, rule.data);
			cm.searchoptions.id = $.jgrid.randId();
			if(isIE && cm.inputtype === "text") {
				if(!cm.searchoptions.size) {
					cm.searchoptions.size = 10;
				}
			}
			cm.searchoptions.name = rule.field;
			cm.searchoptions.oper = 'filter';
			var ruleDataInput = $.jgrid.createEl.call($t, cm.inputtype,cm.searchoptions, rule.data, true, that.p.ajaxSelectOptions || {}, true);
			if(rule.op === 'nu' || rule.op === 'nn' || $.inArray(rule.op, that.p.unaryOperations) >=0 ) {
				$(ruleDataInput).attr('readonly','true');
				$(ruleDataInput).attr('disabled','true');
			} //retain the state of disabled text fields in case of null ops
			// dropdown for: choosing operator
			var ruleOperatorSelect = $("<select size='1' class='selectopts " + classes.srSelect + "'></select>");
			ruleOperatorTd.append(ruleOperatorSelect);
			ruleOperatorSelect.on('change',function() {
				rule.op = $(ruleOperatorSelect).val();
				trpar = $(this).parents("tr").first();
				var rd = $(".input-elm",trpar)[0];
				if (rule.op === "nu" || rule.op === "nn" || $.inArray(rule.op, that.p.unaryOperations) >= 0 ) { // disable for operator "is null" and "is not null"
					rule.data = "";
					if(rd.tagName.toUpperCase() !== 'SELECT') { rd.value = ""; }
					rd.setAttribute("readonly", "true");
					rd.setAttribute("disabled", "true");
				} else {
					if(rd.tagName.toUpperCase() === 'SELECT') { rule.data = rd.value; }
					rd.removeAttribute("readonly");
					rd.removeAttribute("disabled");
				}

				that.onchange();  // signals that the filter has changed
			});

			// populate drop down with all available operators
			if( cm.searchoptions.sopt ) {op = cm.searchoptions.sopt;}
			else if(that.p.sopt) { op= that.p.sopt; }
			else if  ($.inArray(cm.searchtype, that.p.strarr) !== -1) {op = that.p.stropts;}
			else {op = that.p.numopts;}
			str="";
			$.each(that.p.ops, function() { aoprs.push(this.oper); });
			for ( i = 0; i < op.length; i++) {
				ina = $.inArray(op[i],aoprs);
				if(ina !== -1) {
					selected = rule.op === that.p.ops[ina].oper ? " selected='selected'" : "";
					str += "<option value='"+that.p.ops[ina].oper+"'"+selected+">"+that.p.ops[ina].text+"</option>";
				}
			}
			ruleOperatorSelect.append( str );
			// create data container
			var ruleDataTd = $("<td class='data'></td>");
			tr.append(ruleDataTd);

			// textbox for: data
			// is created previously
			//ruleDataInput.setAttribute("type", "text");
			ruleDataTd.append(ruleDataInput);
			$.jgrid.bindEv.call($t, ruleDataInput, cm.searchoptions);
			$(ruleDataInput)
			.addClass("input-elm " + classes.srInput )
			.on('change', function() {
				rule.data = cm.inputtype === 'custom' ? cm.searchoptions.custom_value.call($t, $(".customelement", this),'get') : $(this).val();
				that.onchange(); // signals that the filter has changed
			});

			// create action container
			var ruleDeleteTd = $("<td></td>");
			tr.append(ruleDeleteTd);

			// create button for: delete rule
			if(this.p.ruleButtons === true) {
			var ruleDeleteInput = $("<input type='button' value='-' title='"+that.p.delrule+"' class='delete-rule ui-del " + common.button + "'/>");
			ruleDeleteTd.append(ruleDeleteInput);
			//$(ruleDeleteInput).html("").height(20).width(30).button({icons: {  primary: "ui-icon-minus", text:false}});
			ruleDeleteInput.on('click',function() {
				// remove rule from group
				for (i = 0; i < group.rules.length; i++) {
					if (group.rules[i] === rule) {
						group.rules.splice(i, 1);
						break;
					}
				}

				that.reDraw(); // the html has changed, force reDraw

				that.onchange(); // signals that the filter has changed
				return false;
			});
			}
			return tr;
		};

		this.getStringForGroup = function(group) {
			var s = "(", index;
			if (group.groups !== undefined) {
				for (index = 0; index < group.groups.length; index++) {
					if (s.length > 1) {
						s += " " + group.groupOp + " ";
					}
					try {
						s += this.getStringForGroup(group.groups[index]);
					} catch (eg) {alert(eg);}
				}
			}

			if (group.rules !== undefined) {
				try{
					for (index = 0; index < group.rules.length; index++) {
						if (s.length > 1) {
							s += " " + group.groupOp + " ";
						}
						s += this.getStringForRule(group.rules[index]);
					}
				} catch (e) {alert(e);}
			}

			s += ")";

			if (s === "()") {
				return ""; // ignore groups that don't have rules
			}
			return s;
		};
		this.getStringForRule = function(rule) {
			var opUF = "",opC="", i, cm, ret, val,
			numtypes = ['int', 'integer', 'float', 'number', 'currency']; // jqGrid
			for (i = 0; i < this.p.ops.length; i++) {
				if (this.p.ops[i].oper === rule.op) {
					opUF = this.p.operands.hasOwnProperty(rule.op) ? this.p.operands[rule.op] : "";
					opC = this.p.ops[i].oper;
					break;
				}
			}
			for (i=0; i<this.p.columns.length; i++) {
				if(this.p.columns[i].name === rule.field) {
					cm = this.p.columns[i];
					break;
				}
			}
			if (cm === undefined) { return ""; }
			val = this.p.autoencode ? $.jgrid.htmlEncode(rule.data) : rule.data;
			if(opC === 'bw' || opC === 'bn') { val = val+"%"; }
			if(opC === 'ew' || opC === 'en') { val = "%"+val; }
			if(opC === 'cn' || opC === 'nc') { val = "%"+val+"%"; }
			if(opC === 'in' || opC === 'ni') { val = " ("+val+")"; }
			if(p.errorcheck) { checkData(rule.data, cm); }
			if($.inArray(cm.searchtype, numtypes) !== -1 || opC === 'nn' || opC === 'nu' || $.inArray(rule.op, this.p.unaryOperations) >= 0 ) { 
				ret = rule.field + " " + opUF + " " + val; 
			} else { 
				ret = rule.field + " " + opUF + " \"" + val + "\""; 
			}
			return ret;
		};
		this.resetFilter = function () {
			this.p.filter = $.extend(true,{},this.p.initFilter);
			this.reDraw();
			this.onchange();
		};
		this.hideError = function() {
			$("th."+common.error, this).html("");
			$("tr.error", this).hide();
		};
		this.showError = function() {
			$("th."+common.error, this).html( $.jgrid.stripScript( this.p.errmsg ));
			$("tr.error", this).show();
		};
		this.toUserFriendlyString = function() {
			return this.getStringForGroup(p.filter);
		};
		this.toString = function() {
			// this will obtain a string that can be used to match an item.
			var that = this;
			function getStringRule(rule) {
				if(that.p.errorcheck) {
					var i, cm;
					for (i=0; i<that.p.columns.length; i++) {
						if(that.p.columns[i].name === rule.field) {
							cm = that.p.columns[i];
							break;
						}
					}
					if(cm) {checkData(rule.data, cm);}
				}
				return rule.op + "(item." + rule.field + ",'" + rule.data + "')";
			}

			function getStringForGroup(group) {
				var s = "(", index;

				if (group.groups !== undefined) {
					for (index = 0; index < group.groups.length; index++) {
						if (s.length > 1) {
							if (group.groupOp === "OR") {
								s += " || ";
							}
							else {
								s += " && ";
							}
						}
						s += getStringForGroup(group.groups[index]);
					}
				}

				if (group.rules !== undefined) {
					for (index = 0; index < group.rules.length; index++) {
						if (s.length > 1) {
							if (group.groupOp === "OR") {
								s += " || ";
							}
							else  {
								s += " && ";
							}
						}
						s += getStringRule(group.rules[index]);
					}
				}

				s += ")";

				if (s === "()") {
					return ""; // ignore groups that don't have rules
				}
				return s;
			}

			return getStringForGroup(this.p.filter);
		};

		// Here we init the filter
		this.reDraw();

		if(this.p.showQuery) {
			this.onchange();
		}
		// mark is as created so that it will not be created twice on this element
		this.filter = true;
	});
};
$.extend($.fn.jqFilter,{
	/*
	 * Return SQL like string. Can be used directly
	 */
	toSQLString : function()
	{
		var s ="";
		this.each(function(){
			s = this.toUserFriendlyString();
		});
		return s;
	},
	/*
	 * Return filter data as object.
	 */
	filterData : function()
	{
		var s;
		this.each(function(){
			s = this.p.filter;
		});
		return s;

	},
	getParameter : function (param) {
		var ret = null;
		if(param !== undefined) {
			this.each(function(i,n){
				if (n.p.hasOwnProperty(param) ) {
					ret = n.p[param];
				}
			});
		}
		return ret ? ret : this[0].p;	},
	resetFilter: function() {
		return this.each(function(){
			this.resetFilter();
		});
	},
	addFilter: function (pfilter) {
		if (typeof pfilter === "string") {
			pfilter = $.jgrid.parse( pfilter );
		}
		this.each(function(){
			this.p.filter = pfilter;
			this.reDraw();
			this.onchange();
		});
	}

});
$.extend($.jgrid,{
	filterRefactor : function ( p  )  {
		/*ruleGroup : {}, ssfield:[], splitSelect:",", groupOpSelect:"OR"*/
		var filters={} /*?*/, rules, k, rule, ssdata, group, rf;
		try {
			filters = typeof p.ruleGroup === "string" ? $.jgrid.parse(p.ruleGroup) : p.ruleGroup;
			if(filters.rules && filters.rules.length) {
				rules = filters.rules;
				for(k=0; k < rules.length; k++) {
					rule = rules[k];
					rf = rule.field;
					if($.inArray(rf, p.ssfield) > -1 ) {
						ssdata = rule.data.split(p.splitSelect);
						if(ssdata.length > 1) {
							if(filters.groups === undefined) {
								filters.groups = [];
							}
							group = { groupOp: p.groupOpSelect, groups: [], rules: [] };
							filters.groups.push(group);
							$.each(ssdata,function(l) {
								if (ssdata[l]) {
									group.rules.push({ data: ssdata[l],	op: rule.op, field: rule.field});
								}
							});
							rules.splice(k, 1);
							k--;
						}
					}
				}
			}
		} catch(e) {}
		return filters;
	}
});
$.jgrid.extend({
	filterToolbar : function(p){
		var regional =  $.jgrid.getRegional(this[0], 'search');
		p = $.extend({
			autosearch: true,
			autosearchDelay: 500,
			searchOnEnter : true,
			beforeSearch: null,
			afterSearch: null,
			beforeClear: null,
			afterClear: null,
			onClearSearchValue : null,
			url : '',
			stringResult: false,
			groupOp: 'AND',
			defaultSearch : "bw",
			searchOperators : false,
			resetIcon : "x",
			splitSelect : ",",
			groupOpSelect : "OR",
			errorcheck : true,
			operands : { "eq" :"==", "ne":"!","lt":"<","le":"<=","gt":">","ge":">=","bw":"^","bn":"!^","in":"=","ni":"!=","ew":"|","en":"!@","cn":"~","nc":"!~","nu":"#","nn":"!#", "bt":"..."},
			disabledKeys :  [9, 16, 17,18,19, 20, 33, 34, 35,36,37,38,39,40,30, 45,112,113,114,115,116,117,118,119,120,121,122,123, 144, 145]
		}, regional , p  || {});
		return this.each(function(){
			var $t = this, unaryOpers=[];;
			if($t.p.filterToolbar) { return; }
			if(!$($t).data('filterToolbar')) {
				$($t).data('filterToolbar', p);
			}
			if($t.p.force_regional) {
				p = $.extend(p, regional);
			}
			if ($t.p.customFilterDef !== undefined) {
				for(var uskey in $t.p.customFilterDef) {
					if($t.p.customFilterDef.hasOwnProperty(uskey)  && !p.operands.hasOwnProperty(uskey) ) {
						p.odata.push({ oper: uskey, text: $t.p.customFilterDef[uskey].text} );
						p.operands[uskey] = $t.p.customFilterDef[uskey].operand;
						if($t.p.customFilterDef[uskey].unary === true) {
							unaryOpers.push(uskey);
						}
					}
				}
			}
			var classes = $.jgrid.styleUI[($t.p.styleUI || 'jQueryUI')].filter,
			common = $.jgrid.styleUI[($t.p.styleUI || 'jQueryUI')].common,
			base = $.jgrid.styleUI[($t.p.styleUI || 'jQueryUI')].base,

			triggerToolbar = function() {
				var sdata={}, j=0, v, nm, sopt={},so, ms = false, ssfield = [], msfield = [], afrcol={}, arcustom=[],
					bbt =false, sop, ret=[true,"",""], err=false;
				$.each($t.p.colModel,function(){
					var $elem, fcol = false;
					nm = this.index || this.name;
					sop = this.searchoptions || {};

					if(this.frozen===true && $t.p.frozenColumns === true) {
						$elem = $("#gs_"+ $t.p.idPrefix + $.jgrid.jqID(this.name), $t.grid.fhDiv );
						fcol = true;
					} else {
						$elem = $("#gs_"+ $t.p.idPrefix + $.jgrid.jqID(this.name), $t.grid.hDiv);
					}
					//var $elem = $("#gs_"+ $t.p.idPrefix + $.jgrid.jqID(this.name),  ?  $t.grid.fhDiv : $t.grid.hDiv);
					// in case frozen col is outside the rule list
					if($elem[0] === undefined) {
						$elem = $("#gs_"+ $t.p.idPrefix + $.jgrid.jqID(this.name), $t.grid.hDiv);
					}
					if(p.searchOperators &&  sop.searchOperMenu) {
						so = $elem.parents("table.ui-search-table").find("td.ui-search-oper").children("a").attr("soper") || p.defaultSearch;
					} else {
						so  = (sop.sopt) ? sop.sopt[0] : this.stype==='select' ?  'eq' : p.defaultSearch;
					}
					if( this.stype === "custom" && $.jgrid.isFunction(sop.custom_value) && $elem.length > 0 ) {
						v = sop.custom_value.call($t, $elem, "get");
						arcustom.push(nm);
					} else {
						v = $elem.val();
					}
					// detect multiselect
					if(this.stype === 'select' && sop.multiple && Array.isArray(v)) {
						if(v.length > 0) {
							ms = true;
							ssfield.push(nm);
							v= v.length === 1 ? v[0] : v;
						} else {
							v = "";
						}
					} else if( so !== "bt" && this.stype === 'text' && sop.splitSearchWord === true) {
						msfield.push(nm);
					}
					if(this.searchrules && p.errorcheck) {
						if($.jgrid.isFunction( this.searchrules)) {
							ret = this.searchrules.call($t, v, this);
						} else if($.jgrid && $.jgrid.checkValues) {
							ret = $.jgrid.checkValues.call($t, v, -1, this.searchrules, this.label || this.name);
						}
						if(ret && ret.length && ret[0] === false ) {
							if(this.searchrules.hasOwnProperty('validationError') ){
								err = this.searchrules.validationError;
							}
							return false;
						}
					}
					if(so==="bt") {
						bbt = true;
					}
					if(fcol && (nm !== 'cb' && nm!== 'rn' && nm !== 'subgrid' && nm !== 'sc') ) {
						afrcol[nm] = v;
					}
					if(v || so==="nu" || so==="nn" || $.inArray(so, unaryOpers) >=0) {
						sdata[nm] = v;
						sopt[nm] = so;
						j++;
					} else {
						try {
							delete $t.p.postData[nm];
						} catch (z) {}
					}
				});
				if(ret[0] === false ) {
					if($.jgrid.isFunction(err)) {
						err.call($t, ret[1]);
					} else {
						var errors = $.jgrid.getRegional($t, 'errors');
						$.jgrid.info_dialog(errors.errcap, ret[1], '', {styleUI : $t.p.styleUI });
					}
					return;
				}
				var sd =  j>0 ? true : false;
				if(p.stringResult === true || $t.p.datatype === "local" || p.searchOperators === true)
				{
					var ruleGroup = "{\"groupOp\":\"" + p.groupOp + "\",\"rules\":[";
					var gi=0;
					$.each(sdata,function(i,n){
						if (gi > 0) {ruleGroup += ",";}
						ruleGroup += "{\"field\":\"" + i + "\",";
						ruleGroup += "\"op\":\"" + sopt[i] + "\",";
						n+="";
						ruleGroup += "\"data\":\"" + n.replace(/\\/g,'\\\\').replace(/\"/g,'\\"') + "\"}";
						gi++;
					});
					ruleGroup += "]}";
					// multiselect
					var filters, rules, k, rule, ssdata, group;
					if(ms) {
						filters = $.jgrid.filterRefactor({
							ruleGroup : ruleGroup,
							ssfield : ssfield,
							splitSelect : p.splitSelect,
							groupOpSelect : p.groupOpSelect
						});
						//ruleGroup = JSON.stringify( filters );
					}
					if(bbt) {
						if(!$.isPlainObject(filters)) {
							filters = $.jgrid.parse(ruleGroup);
						}
						if(filters.rules && filters.rules.length) {
							rules = filters.rules;
							for(k=0;k < rules.length; k++) {
								rule = rules[k];
								if(rule.op === "bt") {
									ssdata = rule.data.split("...");
									if(ssdata.length > 1) {
										if(filters.groups === undefined) {
											filters.groups = [];
										}
										group = { groupOp: 'AND', groups: [], rules: [] };
										filters.groups.push(group);
										$.each(ssdata,function(l) {
											var btop = l === 0 ? 'ge' : 'le';
											if(ssdata[l]) {
												group.rules.push({ data: ssdata[l], op: btop, field: rule.field});
											}
										});
										rules.splice(k, 1);
										k--;
									}
								}
							}
						}
					}
					if(  msfield.length ) {
						filters = $.jgrid.filterRefactor({
							ruleGroup : ruleGroup,
							ssfield : msfield,
							splitSelect : sop.splitSearchSeparator || ";",
							groupOpSelect : "OR"
						});
					}
					if(bbt || ms || msfield.length) {
						ruleGroup = JSON.stringify( filters );
					}
					if($t.p.mergeSearch === true && $t.p.searchModules.hasOwnProperty('filterToolbar') && $t.p.searchModules.filterToolbar !== false ) {
						if(gi > 0) {
							$t.p.searchModules.filterToolbar = ruleGroup;
						} else {
							$t.p.searchModules.filterToolbar = null;
						}
						sd = true;
						$.extend($t.p.postData,{filters: $.jgrid.splitSearch($t.p.searchModules)});
					} else {
						$.extend($t.p.postData,{filters:ruleGroup});
					}
					
					$.each(['searchField', 'searchString', 'searchOper'], function(i, n){
						if($t.p.postData.hasOwnProperty(n)) { delete $t.p.postData[n];}
					});
				} else {
					$.extend($t.p.postData,sdata);
				}
				var saveurl;
				if(p.url) {
					saveurl = $t.p.url;
					$($t).jqGrid("setGridParam", { url: p.url });
				}
				var bsr = $($t).triggerHandler("jqGridToolbarBeforeSearch") === 'stop' ? true : false;
				if(!bsr && $.jgrid.isFunction(p.beforeSearch)){bsr = p.beforeSearch.call($t);}
				if(!bsr) { $($t).jqGrid("setGridParam",{search:sd}).trigger("reloadGrid",[{page:1}]); }
				if(saveurl) {$($t).jqGrid("setGridParam",{url:saveurl});}
				$($t).triggerHandler("jqGridToolbarAfterSearch");
				if($.jgrid.isFunction(p.afterSearch)){p.afterSearch.call($t);}
				if($t.p.frozenColumns) {
					setToolbarFozenVal(afrcol,sopt,ssfield, arcustom );
				}
			},
			clearToolbar = function(trigger){
				var sdata={}, j=0, nm;
				trigger = (typeof trigger !== 'boolean') ? true : trigger;
				$.each($t.p.colModel,function(){
					var v, $elem = $("#gs_"+$t.p.idPrefix+$.jgrid.jqID(this.name),(this.frozen===true && $t.p.frozenColumns === true) ?  $t.grid.fhDiv : $t.grid.hDiv);
					if(this.searchoptions && this.searchoptions.defaultValue !== undefined) {
						v = this.searchoptions.defaultValue;
					}
					nm = this.index || this.name;
					switch (this.stype) {
						case 'select' :
							$elem.find("option").each(function (i){
								if(i===0) { this.selected = true; }
								if ($(this).val() === v) {
									this.selected = true;
									return false;
								}
							});
							if ( v !== undefined ) {
								// post the key and not the text
								sdata[nm] = v;
								j++;
							} else {
								try {
									delete $t.p.postData[nm];
								} catch(e) {}
							}
							break;
						case 'text':
							$elem.val(v || "");
							if(v !== undefined) {
								sdata[nm] = v;
								j++;
							} else {
								try {
									delete $t.p.postData[nm];
								} catch (y){}
							}
							break;
						case 'custom':
							if ($.jgrid.isFunction(this.searchoptions.custom_value) && $elem.length > 0 ) {
								this.searchoptions.custom_value.call($t, $elem, "set", v || "");
							}
							break;
					}
				});
				var sd =  j>0 ? true : false;
				$t.p.resetsearch =  true;
				if(p.stringResult === true || $t.p.datatype === "local") {
					var ruleGroup = "{\"groupOp\":\"" + p.groupOp + "\",\"rules\":[";
					var gi=0;
					$.each(sdata,function(i,n){
						if (gi > 0) {ruleGroup += ",";}
						ruleGroup += "{\"field\":\"" + i + "\",";
						ruleGroup += "\"op\":\"" + "eq" + "\",";
						n+="";
						ruleGroup += "\"data\":\"" + n.replace(/\\/g,'\\\\').replace(/\"/g,'\\"') + "\"}";
						gi++;
					});
					ruleGroup += "]}";
					if($t.p.mergeSearch === true && $t.p.searchModules.hasOwnProperty('filterToolbar') && $t.p.searchModules.filterToolbar !== false ) {
						if(gi > 0) {
							$t.p.searchModules.filterToolbar = ruleGroup;
						} else {
							$t.p.searchModules.filterToolbar = null;
						}
						sd = true;
						$.extend($t.p.postData,{filters: $.jgrid.splitSearch($t.p.searchModules)});
					} else {
						$.extend($t.p.postData,{filters:ruleGroup});
					}
					
					$.each(['searchField', 'searchString', 'searchOper'], function(i, n){
						if($t.p.postData.hasOwnProperty(n)) { delete $t.p.postData[n];}
					});
				} else {
					$.extend($t.p.postData,sdata);
				}
				var saveurl;
				if(p.url) {
					saveurl = $t.p.url;
					$($t).jqGrid("setGridParam",{url:p.url});
				}
				var bcv = $($t).triggerHandler("jqGridToolbarBeforeClear") === 'stop' ? true : false;
				if(!bcv && $.jgrid.isFunction(p.beforeClear)){bcv = p.beforeClear.call($t);}
				if(!bcv) {
					if(trigger) {
						$($t).jqGrid("setGridParam",{search:sd}).trigger("reloadGrid",[{page:1}]);
					}
				}
				if(saveurl) {$($t).jqGrid("setGridParam",{url:saveurl});}
				$($t).triggerHandler("jqGridToolbarAfterClear");
				if($.jgrid.isFunction(p.afterClear)){p.afterClear();}
			},
			toggleToolbar = function(){
				var trow = $("tr.ui-search-toolbar",$t.grid.hDiv);
				if($t.p.frozenColumns === true) {
					$($t).jqGrid('destroyFrozenColumns');
				}
				if(trow.css("display") === 'none') {
					trow.show();
				} else {
					trow.hide();
				}
				if($t.p.frozenColumns === true) {
					$($t).jqGrid("setFrozenColumns");
				}
			},
			buildRuleMenu = function( elem, left, top ){
				$("#sopt_menu").remove();

				left=parseInt(left,10);
				top=parseInt(top,10) + 18;

				var fs =  $('.ui-jqgrid').css('font-size') || '11px',
					str = '<ul id="sopt_menu" class="ui-search-menu modal-content" role="menu" tabindex="0" style="font-size:'+fs+';left:'+left+'px;top:'+top+'px;">',
					selected = $(elem).attr("soper"), selclass,
					aoprs = [], ina,
					i, nm = $(elem).attr("colname");
				i = $.jgrid.getElemByAttrVal($t.p.colModel, 'name', nm, true);
				if( i === -1 ) {
					return;
				}
				var cm = $t.p.colModel[i], options = $.extend({}, cm.searchoptions);
				if(!options.sopt) {
					options.sopt = [];
					options.sopt[0]= cm.stype==='select' ?  'eq' : p.defaultSearch;
				}
				$.each(p.odata, function() { aoprs.push(this.oper); });
				for ( i = 0 ; i < options.sopt.length; i++) {
					ina = $.inArray(options.sopt[i],aoprs);
					if(ina !== -1) {
						selclass = selected === p.odata[ina].oper ? common.highlight : "";
						str += '<li class="ui-menu-item '+selclass+'" role="presentation"><a class="'+ common.cornerall+' g-menu-item" tabindex="0" role="menuitem" value="'+p.odata[ina].oper+'" oper="'+p.operands[p.odata[ina].oper]+'"><table class="ui-common-table"><tr><td class="opersign">'+p.operands[p.odata[ina].oper]+'</td><td>'+ p.odata[ina].text+'</td></tr></table></a></li>';
					}
				}
				str += "</ul>";
				$('body').append(str);
				$("#sopt_menu").addClass("ui-menu " + classes.menu_widget);
				$("#sopt_menu > li > a").hover(
					function(){ $(this).addClass(common.hover); },
					function(){ $(this).removeClass(common.hover); }
				).click(function() {
					var v = $(this).attr("value"),
					oper = $(this).attr("oper");
					$($t).triggerHandler("jqGridToolbarSelectOper", [v, oper, elem]);
					$("#sopt_menu").hide();
					$(elem).text(oper).attr("soper",v);
					if(p.autosearch===true){
						var inpelm = $(elem).parent().next().children()[0];
						if( $(inpelm).val() || v==="nu" || v ==="nn" || $.inArray(v, unaryOpers) >=0) {
							triggerToolbar();
						}
					}
				});
			},
			setToolbarFozenVal = function( ffields, soper, smultiselect, arcustom) {
				var orgCol = $(".ui-search-toolbar", $t.grid.hDiv),
					frozenCol = $(".ui-search-toolbar", $t.grid.fhDiv);
				$.each(ffields, function(i,n){ 
					// multiselect
					// operations
					if(p.searchOperators) {
						var oper = soper[i];
						if(oper) {
							$(".ui-search-table .ui-search-oper [colname='userId']", orgCol).attr({'soper': oper}).text( p.operands[oper]);
							$(".ui-search-table .ui-search-oper [colname='userId']", frozenCol).attr({'soper': oper}).text( p.operands[oper]);
						}
					}
					// custom element
					if( $.inArray(i, arcustom) > -1) {
						var col = $.jgrid.getElemByAttrVal( $t.p.colModel, 'name', i );
						if ( col && col.searchoptions ) {
							var soptf = col.searchoptions || {};
							if( $.jgrid.isFunction( soptf.custom_value ) ) {
								var $elem = $("#gs_"+ $t.p.idPrefix + $.jgrid.jqID(i), $t.grid.fhDiv ),
								$elem2 = $("#gs_"+ $t.p.idPrefix + $.jgrid.jqID(i), $t.grid.hDiv);

								soptf.custom_value.call($t, $elem, "set", n);
								soptf.custom_value.call($t, $elem2, "set", n);
							}
 						}
					} else {
						$("#gs_"+ $t.p.idPrefix + $.jgrid.jqID(i), orgCol).val( n );
						$("#gs_"+ $t.p.idPrefix + $.jgrid.jqID(i), frozenCol).val( n );
					}
				});
			};
			// create the row
			var tr = $("<tr class='ui-search-toolbar' role='row'></tr>"),
			timeoutHnd, rules, filterobj;
			if( p.restoreFromFilters ) {
				if( $t.p.mergeSearch === true && $t.p.searchModules.hasOwnProperty('filterToolbar') && $t.p.searchModules.filterToolbar !== false) {
					filterobj = $t.p.searchModules.filterToolbar;
				} else {
					filterobj = $t.p.postData.filters;
				}
				if(filterobj) {
					if( typeof filterobj === "string") {
						filterobj = $.jgrid.parse( filterobj );
					}
					rules = (filterobj.rules && filterobj.rules.length) ? filterobj.rules : false;
				}
			}
			//p.disabledKeys = new Set(p.disabledKeys); // experimental 
			var dKeys = new Set(p.disabledKeys);
			if(dKeys.size !== p.disabledKeys.length) { // ie11
				for(var jj=0; jj< p.disabledKeys.length; jj++) {
					dKeys = new Set();
					dKeys.add(p.disabledKeys[jj]);
				}
			}
			$.each($t.p.colModel,function(ci){
				var cm=this, soptions, select="", sot="=", so, i, st, csv, df, elem, restores,
				th = $("<th role='columnheader' class='" + base.headerBox+" ui-th-"+$t.p.direction+" "+(cm.labelClasses || "")+"' id='gsh_" + $t.p.id + "_" + cm.name + "' ></th>"),
				thd = $("<div></div>"),
				stbl = $("<table class='ui-search-table' cellspacing='0'><tr><td class='ui-search-oper' headers=''></td><td class='ui-search-input' headers=''></td><td class='ui-search-clear' headers=''></td></tr></table>");
				if(this.hidden===true) { $(th).css("display","none");}
				this.search = this.search === false ? false : true;
				if(this.stype === undefined) {this.stype='text';}
				this.searchoptions = this.searchoptions || {};
				if(this.searchoptions.searchOperMenu === undefined) {
					this.searchoptions.searchOperMenu = true;
				}
				soptions = $.extend({},this.searchoptions , {name:cm.index || cm.name, id: "gs_"+$t.p.idPrefix+cm.name, oper:'search'});
				if(this.search){
					if( p.restoreFromFilters && rules) {
						restores = false;
						for( var is = 0; is < rules.length; is++) {
							if(rules[is].field ) {
								var snm = cm.index || cm.name;
								if( snm === rules[is].field) {
									restores = rules[is];
									break;
								}
							}
						}
					}
					if(p.searchOperators) {
						so  = (soptions.sopt) ? soptions.sopt[0] : cm.stype==='select' ?  'eq' : p.defaultSearch;
						// overwrite  search operators
						if( p.restoreFromFilters && restores) {
							so = restores.op;
						}
						for(i = 0;i<p.odata.length;i++) {
							if(p.odata[i].oper === so) {
								sot = p.operands[so] || "";
								break;
							}
						}
						st = soptions.searchtitle != null ? soptions.searchtitle : p.operandTitle;
						select = this.searchoptions.searchOperMenu ? "<a title='"+st+"' soper='"+so+"' class='soptclass' colname='"+this.name+"'>"+sot+"</a>" : "";
					}
					$("td",stbl).eq( 0 ).attr("columname", cm.name).append(select);
					if(soptions.clearSearch === undefined) {
						soptions.clearSearch = true;
					}
					if(soptions.clearSearch) {
						csv = p.resetTitle || 'Clear Search Value';
						$("td",stbl).eq( 2 ).append("<a title='"+csv+"' style='padding-right: 0.3em;padding-left: 0.3em;' class='clearsearchclass'>"+p.resetIcon+"</a>");
					} else {
						$("td", stbl).eq( 2 ).hide();
					}
					if(this.surl) {
						soptions.dataUrl = this.surl;
					}
					df="";
					if(soptions.defaultValue ) {
						df = $.jgrid.isFunction(soptions.defaultValue) ? soptions.defaultValue.call($t) : soptions.defaultValue;
					}
					//overwrite default value if restore from filters
					if( p.restoreFromFilters && restores) {
						df = restores.data;
					}
					elem = $.jgrid.createEl.call($t, this.stype, soptions , df, false, $.extend({},$.jgrid.ajaxOptions, $t.p.ajaxSelectOptions || {}));
					if( this.stype !== 'custom') {
						if(this.stype==='select') {
							$(elem).addClass( classes.srSelect );
						} else  {
							$(elem).addClass( classes.srInput );
						}
					}
					$("td",stbl).eq( 1 ).append(elem);
					$(thd).append(stbl);
					if(soptions.dataEvents == null ) {
						soptions.dataEvents = [];
					}
					switch (this.stype)
					{
					case "select":
						if(p.autosearch === true) {
							soptions.dataEvents.push({
								type : "change",
								fn : function() {
									triggerToolbar();
									return false;
								}
							});
						}
						break;
					case "text":
					case "custom":
						if(p.autosearch===true){
							if(p.searchOnEnter) {
								soptions.dataEvents.push({
									type: "keypress",
									fn : function(e) {
										var key = e.charCode || e.keyCode || 0;
										if(key === 13){
											triggerToolbar();
											return false;
										}
										return this;
									}
								});
							} else {
								soptions.dataEvents.push({
									type: "keydown",
									fn : function(e) {
										var key = e.which;
										if( dKeys.has(key)) {
											// do nothing
										} else if( key === 13 ) {
											return false;
										} else {
											if(timeoutHnd) { clearTimeout(timeoutHnd); }
											timeoutHnd = setTimeout(function(){triggerToolbar();}, p.autosearchDelay);
										}
									}
								});
							}
						}
						break;
					}

					$.jgrid.bindEv.call($t, elem , soptions);
				}
				$(th).append(thd);
				$(tr).append(th);
				if(!p.searchOperators || select === "") {
					$("td",stbl).eq( 0 ).hide();
				}
			});
			$("table thead",$t.grid.hDiv).append(tr);
			if(p.searchOperators) {
				$(".soptclass",tr).click(function(e){
					var offset = $(this).offset(),
					left = ( offset.left ),
					top = ( offset.top);
					buildRuleMenu(this, left, top );
					e.stopPropagation();
				});
				$("body").on('click', function(e){
					if(e.target.className !== "soptclass") {
						$("#sopt_menu").remove();
					}
				});
			}
			$(".clearsearchclass",tr).click(function() {
				var ptr = $(this).parents("tr").first(),
					colname = $("td.ui-search-oper", ptr).attr('columname'), 
					coli=0,
					soper = $("td.ui-search-oper a", ptr).attr('soper'), 
					cm,
					vv;
				coli = $.jgrid.getElemByAttrVal($t.p.colModel, 'name', colname, true);
				if(coli === -1 ) {
					return false;
				}
				cm = $t.p.colModel[coli];
				var sval  = $.extend( {}, cm.searchoptions || {} ),
					dval = sval.defaultValue ? sval.defaultValue : "",
					elem;
				if(cm.stype === "select") {
					elem = $("td.ui-search-input select", ptr);
					if(dval) {
						elem.val( dval );
					} else {
						elem[0].selectedIndex = 0;
					}
				} else {
					elem = $("td.ui-search-input input", ptr);
					elem.val( dval );
				}
				$($t).triggerHandler("jqGridToolbarClearVal",[elem[0], coli, sval, dval]);
				if($.jgrid.isFunction(p.onClearSearchValue)) {
					p.onClearSearchValue.call($t, elem[0], coli, sval, dval);
				}
				if(soper==="nu" || soper==="nn" || $.inArray(soper, unaryOpers) >=0) {
					vv = sval.sopt ?
							sval.sopt[0] :
							cm.stype === "select" ?
								"eq" : 
								p.defaultSearch;
						var operText = $t.p.customFilterDef != null && $t.p.customFilterDef[vv] != null ? 
						$t.p.customFilterDef[vv].operand :
						p.operands[vv] || "";
						if(vv === soper) {
							$("td.ui-search-oper a", ptr).attr('soper', 'dummy').text(operText);
						} else {
							$("td.ui-search-oper a", ptr).attr('soper',vv).text(operText);
						}
						
				}
				
				// ToDo custom search type
				if(p.autosearch===true){
					triggerToolbar();
					if(vv === soper) { 
						$("td.ui-search-oper a", ptr).attr('soper',vv).text(operText);
					}
				}
			});
			$($t.grid.hDiv).on("scroll", function(e){
				if(!$t.grid.hScroll) {
					$t.grid.bScroll = true;
				$t.grid.bDiv.scrollLeft = $t.grid.hDiv.scrollLeft;
					if($t.p.footerrow) {
						$t.grid.sDiv.scrollLeft = $t.grid.bDiv.scrollLeft;
					}
					if($t.p.headerrow) {
						$t.grid.hrDiv.scrollLeft = $t.grid.bDiv.scrollLeft;
					}
				}
				$t.grid.hScroll = false;
			});
			this.p.filterToolbar = true;
			this.triggerToolbar = triggerToolbar;
			this.clearToolbar = clearToolbar;
			this.toggleToolbar = toggleToolbar;
		});
	},
	destroyFilterToolbar: function () {
		return this.each(function () {
			if (!this.p.filterToolbar) {
				return;
			}
			this.triggerToolbar = null;
			this.clearToolbar = null;
			this.toggleToolbar = null;
			this.p.filterToolbar = false;
			$(this.grid.hDiv).find("table thead tr.ui-search-toolbar").remove();
		});
	},
	refreshFilterToolbar : function ( p ) {
		p = $.extend(true, {
			filters : "",
			onClearVal : null,
			onSetVal : null
		}, p || {});
		return this.each(function () {
			var $t = this, cm = $t.p.colModel, i, l = $t.p.colModel.length, params,
			searchitem, filters, rules, rule, ssfield =[], ia;
			// clear the values on toolbar.
			// do not call clearToolbar
			if(!$t.p.filterToolbar) {
				return;
			}
			params = $($t).data('filterToolbar');
			for (i = 0; i < l; i++) {
				ssfield.push(cm[i].index || cm[i].name);
				searchitem = $("#gs_" +$t.p.idPrefix+ $.jgrid.jqID(cm[i].name));
				switch (cm[i].stype) {
					case 'select' :
					case 'text' :
						searchitem.val("");
						break;
				}
				if($.jgrid.isFunction(p.onClearVal)) {
					p.onClearVal.call($t, searchitem, cm[i].name);
				}
			}
			function setrules (filter) {
				if(filter && filter.rules) { // condition to exit
					rules = filter.rules;
					l = rules.length;
					for (i = 0; i < l; i++) {
						rule = rules[i];
						ia = $.inArray(rule.field, ssfield);
						if( ia !== -1) {
							searchitem = $("#gs_" + $t.p.idPrefix + $.jgrid.jqID(cm[ia].name));
							// problem for between operator
							if ( searchitem.length > 0) {
								if (cm[ia].stype === "select") {
									searchitem.find("option[value='" + $.jgrid.jqID(rule.data) + "']").prop('selected', true);
								} else if (cm[ia].stype === "text") {
									searchitem.val(rule.data);
								}
								if($.jgrid.isFunction(p.onSetVal)) {
									p.onSetVal.call($t, searchitem, cm[ia].name);
								}
								if( params && params.searchOperators) {
									var fsi = searchitem.parent().prev();
									if( fsi.hasClass("ui-search-oper") ) {
										$(".soptclass", fsi ).attr("soper", rule.op);
										if(params.operands.hasOwnProperty(rule.op)) {
											$(".soptclass", fsi ).html( $.jgrid.stripScript( params.operands[rule.op] ) );
										}
									}
								}
							}
					    }
					}
					if(filter.groups) {
						for(var k=0;k<filter.groups.length;k++) {
							setrules(filter.groups[k]);
						}
					}
				}
			}
			if (typeof (p.filters) === "string") {
				if(p.filters.length) {
					filters = p.filters;
				// flat filters only
				} else if( $t.p.postData.hasOwnProperty("filters")) {
					filters = $t.p.postData.filters;
				}
				filters = $.jgrid.parse(filters);
			}
	        if ($.isPlainObject(filters)) {
				setrules( filters );
	        }
		});
	},
	searchGrid : function (p) {
		var regional =  $.jgrid.getRegional(this[0], 'search');
		p = $.extend(true, {
			recreateFilter: false,
			drag: true,
			sField:'searchField',
			sValue:'searchString',
			sOper: 'searchOper',
			sFilter: 'filters',
			loadDefaults: true, // this options activates loading of default filters from grid's postData for Multipe Search only.
			beforeShowSearch: null,
			afterShowSearch : null,
			onInitializeSearch: null,
			afterRedraw : null,
			afterChange: null,
			sortStrategy: null,
			closeAfterSearch : false,
			closeAfterReset: false,
			closeOnEscape : false,
			searchOnEnter : false,
			multipleSearch : false,
			multipleGroup : false,
			//cloneSearchRowOnAdd: true,
			top : 0,
			left: 0,
			jqModal : true,
			modal: false,
			resize : true,
			width: 450,
			height: 'auto',
			dataheight: 'auto',
			showQuery: false,
			errorcheck : true,
			sopt: null,
			stringResult: undefined,
			onClose : null,
			onSearch : null,
			onReset : null,
			toTop : true,
			overlay : 30,
			columns : [],
			tmplNames : null,
			tmplFilters : null,
			tmplLabel : ' Template: ',
			showOnLoad: false,
			layer: null,
			splitSelect : ",",
			groupOpSelect : "OR",
			operands : { "eq" :"=", "ne":"<>","lt":"<","le":"<=","gt":">","ge":">=","bw":"LIKE","bn":"NOT LIKE","in":"IN","ni":"NOT IN","ew":"LIKE","en":"NOT LIKE","cn":"LIKE","nc":"NOT LIKE","nu":"IS NULL","nn":"ISNOT NULL"},
			buttons :[]
		}, regional,  p || {});
		return this.each(function() {
			var $t = this;
			if(!$t.grid) {return;}
			var fid = "fbox_"+$t.p.id,
			showFrm = true,
			mustReload = true,
			IDs = {themodal:'searchmod'+fid,modalhead:'searchhd'+fid,modalcontent:'searchcnt'+fid, scrollelm : fid},
			defaultFilters,//  = ($.isPlainObject($t.p._savedFilter) && !$.isEmptyObject($t.p._savedFilter ) ) ? $t.p._savedFilter :  $t.p.postData[p.sFilter],
			fl,
			unaryOpers = [],
			classes = $.jgrid.styleUI[($t.p.styleUI || 'jQueryUI')].filter,
			common = $.jgrid.styleUI[($t.p.styleUI || 'jQueryUI')].common;
			p.styleUI = $t.p.styleUI;
			if($.isPlainObject($t.p._savedFilter) && !$.isEmptyObject($t.p._savedFilter )) {
				defaultFilters = $t.p._savedFilter;
			} else if($t.p.mergeSearch === true && $t.p.searchModules.hasOwnProperty('searchGrid') && $t.p.searchModules.searchGrid !== false ) {
				defaultFilters = $t.p.searchModules.searchGrid === true ? "" : $t.p.searchModules.searchGrid;
			} else {
				defaultFilters = $t.p.postData[p.sFilter];
			}
			if(typeof defaultFilters === "string") {
				defaultFilters = $.jgrid.parse( defaultFilters );
			}
			if(p.recreateFilter === true) {
				$("#"+$.jgrid.jqID(IDs.themodal)).remove();
			}
			function showFilter(_filter) {
				showFrm = $($t).triggerHandler("jqGridFilterBeforeShow", [_filter]);
				if(showFrm === undefined) {
					showFrm = true;
				}
				if(showFrm && $.jgrid.isFunction(p.beforeShowSearch)) {
					showFrm = p.beforeShowSearch.call($t,_filter);
				}
				if(showFrm) {
					$.jgrid.viewModal("#"+$.jgrid.jqID(IDs.themodal),{gbox:"#gbox_"+$.jgrid.jqID( $t.p.id ),jqm:p.jqModal, modal:p.modal, overlay: p.overlay, toTop: p.toTop});
					$($t).triggerHandler("jqGridFilterAfterShow", [_filter]);
					if($.jgrid.isFunction(p.afterShowSearch)) {
						p.afterShowSearch.call($t, _filter);
					}
				}
			}
			if ( $("#"+$.jgrid.jqID(IDs.themodal))[0] !== undefined ) {
				showFilter($("#fbox_"+$.jgrid.jqID( $t.p.id )));
			} else {
				var fil = $("<div><div id='"+fid+"' class='searchFilter' style='overflow:auto'></div></div>").insertBefore("#gview_"+$.jgrid.jqID($t.p.id)),
				align = "left", butleft ="";
				if($t.p.direction === "rtl") {
					align = "right";
					butleft = " style='text-align:left'";
					fil.attr("dir","rtl");
				}
				var columns = $.extend([],$t.p.colModel),
				bS  ="<a id='"+fid+"_search' class='fm-button " + common.button + " fm-button-icon-right ui-search'><span class='" + common.icon_base + " " +classes.icon_search + "'></span>"+p.Find+"</a>",
				bC  ="<a id='"+fid+"_reset' class='fm-button " + common.button +" fm-button-icon-left ui-reset'><span class='" + common.icon_base + " " +classes.icon_reset + "'></span>"+p.Reset+"</a>",
				bQ = "", tmpl="", colnm, found = false, bt, cmi=-1, ms = false, ssfield = [];
				if(p.showQuery) {
					bQ ="<a id='"+fid+"_query' class='fm-button " + common.button + " fm-button-icon-left'><span class='" + common.icon_base + " " +classes.icon_query + "'></span>Query</a>";
				}
				var user_buttons = $.jgrid.buildButtons( p.buttons, bQ+ bS, common);

				// groupheaders names
				var groupH = null;
				if( $($t).jqGrid('isGroupHeaderOn') ) {
					var htable = $("table.ui-jqgrid-htable", $t.grid.hDiv), 
					secRow = htable.find(".jqg-second-row-header"),
					gh_len = $t.p.groupHeader.length;
					// use the last set one
					if(secRow[0] !== undefined) {
						groupH = $t.p.groupHeader[gh_len-1];
					}
				}

				var inColumnHeader = function (text, columnHeaders) {
					var length = columnHeaders.length, i;
					for (i = 0; i < length; i++) {
						if (columnHeaders[i].startColumnName === text) {
							return i;
						}
					}
					return -1;
				};				
				if(!p.columns.length) {
					if(groupH !== null) {
						for(var ij=0;ij<columns.length; ij++){
							var iCol = inColumnHeader( columns[ij].name, groupH.groupHeaders);
							if(iCol>=0) {
								columns[ij].label = groupH.groupHeaders[iCol].titleText + "::" + $t.p.colNames[ij];
								for(var jj= 1; jj<= groupH.groupHeaders[iCol].numberOfColumns-1; jj++) {
									columns[ij+jj].label = groupH.groupHeaders[iCol].titleText + "::"+$t.p.colNames[ij+jj];
								}
								ij = ij+groupH.groupHeaders[iCol].numberOfColumns-1;
							}
						}
					}
					$.each(columns, function(i,n){
						if(!n.label) {
							n.label = $t.p.colNames[i];
						}
						// find first searchable column and set it if no default filter
						if(!found) {
							var searchable = (n.search === undefined) ?  true: n.search ,
							hidden = (n.hidden === true),
							ignoreHiding = (n.searchoptions && n.searchoptions.searchhidden === true);
							if ((ignoreHiding && searchable) || (searchable && !hidden)) {
								found = true;
								colnm = n.index || n.name;
								cmi =i;
							}
						}
						if( n.stype==="select" &&  n.searchoptions && n.searchoptions.multiple) {
							ms = true;
							ssfield.push( n.index || n.name );
						}
					});
				} else {
					columns = p.columns;
					cmi = 0;
					colnm = columns[0].index || columns[0].name;
				}
				// old behaviour
				if( (!defaultFilters && colnm) || p.multipleSearch === false  ) {
					var cmop = "eq";
					if(cmi >=0 && columns[cmi].searchoptions && columns[cmi].searchoptions.sopt) {
						cmop = columns[cmi].searchoptions.sopt[0];
					} else if(p.sopt && p.sopt.length) {
						cmop = p.sopt[0];
					}
					defaultFilters = {groupOp: "AND", rules: [{field: colnm, op: cmop, data: ""}]};
				}
				found = false;
				if(p.tmplNames && p.tmplNames.length) {
					found = true;
					tmpl = "<tr><td class='ui-search-label'>"+ p.tmplLabel +"</td>";
					tmpl += "<td><select size='1' class='ui-template " + classes.srSelect + "'>";
					tmpl += "<option value='default'>Default</option>";
					$.each(p.tmplNames, function(i,n){
						tmpl += "<option value='"+i+"'>"+n+"</option>";
					});
					tmpl += "</select></td></tr>";
				}
				if ($t.p.customFilterDef !== undefined) {
					for(var uskey in $t.p.customFilterDef) {
						if($t.p.customFilterDef.hasOwnProperty(uskey)  && !p.operands.hasOwnProperty(uskey) ) {
							p.odata.push({ oper: uskey, text: $t.p.customFilterDef[uskey].text} );
							p.operands[uskey] = $t.p.customFilterDef[uskey].operand;
							if($t.p.customFilterDef[uskey].unary === true) {
								unaryOpers.push(uskey);
						}
					}
				}
				}
				bt = "<table class='EditTable' style='border:0px none;margin-top:5px' id='"+fid+"_2'><tbody><tr><td colspan='2'><hr class='" + common.content + "' style='margin:1px'/></td></tr>"+tmpl+"<tr><td class='EditButton' style='text-align:"+align+"'>"+bC+"</td><td class='EditButton' "+butleft+">"+ user_buttons +"</td></tr></tbody></table>";
				fid = $.jgrid.jqID( fid);
				$("#"+fid).jqFilter({
					columns: columns,
					sortStrategy: p.sortStrategy,
					filter: p.loadDefaults ? defaultFilters : null,
					showQuery: p.showQuery,
					errorcheck : p.errorcheck,
					sopt: p.sopt,
					groupButton : p.multipleGroup,
					ruleButtons : p.multipleSearch,
					uniqueSearchFields : p.uniqueSearchFields,
					afterRedraw : p.afterRedraw,
					ops : p.odata,
					operands : p.operands,
					ajaxSelectOptions: $t.p.ajaxSelectOptions,
					groupOps: p.groupOps,
					addsubgrup : p.addsubgrup,
					addrule : p.addrule,
					delgroup : p.delgroup,
					delrule : p.delrule,
					autoencode : $t.p.autoencode,
					unaryOperations : unaryOpers,
					onChange : function() {
						if(this.p.showQuery) {
							$('.query',this).text(this.toUserFriendlyString());
						}
						if ($.jgrid.isFunction(p.afterChange)) {
							p.afterChange.call($t, $("#"+fid), p);
						}
					},
					direction : $t.p.direction,
					id: $t.p.id
				});
				fil.append( bt );
				$("#"+fid+"_2").find("[data-index]").each(function(){
					var index = parseInt($(this).attr('data-index'),10);
					if(index >=0 ) {
						$(this).on('click', function(e) {
							p.buttons[index].click.call($t, $("#"+fid), p, e);
						});
					}
				});
				if(found && p.tmplFilters && p.tmplFilters.length) {
					$(".ui-template", fil).on('change', function(){
						var curtempl = $(this).val();
						if(curtempl==="default") {
							$("#"+fid).jqFilter('addFilter', defaultFilters);
						} else {
							$("#"+fid).jqFilter('addFilter', p.tmplFilters[parseInt(curtempl,10)]);
						}
						return false;
					});
				}
				if(p.multipleGroup === true) {p.multipleSearch = true;}
				$($t).triggerHandler("jqGridFilterInitialize", [$("#"+fid)]);
				if($.jgrid.isFunction(p.onInitializeSearch) ) {
					p.onInitializeSearch.call($t, $("#"+fid));
				}
				p.gbox = "#gbox_"+$.jgrid.jqID($t.p.id);//fid;
				var fs =  $('.ui-jqgrid').css('font-size') || '11px';
				if (p.layer) {
					$.jgrid.createModal(IDs ,fil,p,"#gview_"+$.jgrid.jqID($t.p.id),$("#gbox_"+$.jgrid.jqID($t.p.id))[0], (typeof p.layer ==="string" ? "#"+$.jgrid.jqID(p.layer) : p.layer), (typeof p.layer ==="string" ?  {position: "relative", "font-size":fs} :{ "font-size":fs} ) );
				} else {
					$.jgrid.createModal(IDs ,fil,p,"#gview_"+$.jgrid.jqID($t.p.id),$("#gbox_"+$.jgrid.jqID($t.p.id))[0], null, { "font-size":fs});
				}
				if (p.searchOnEnter || p.closeOnEscape) {
					$("#"+$.jgrid.jqID(IDs.themodal)).keydown(function (e) {
						var $target = $(e.target);
						if (p.searchOnEnter && e.which === 13 && // 13 === $.ui.keyCode.ENTER
								!$target.hasClass('add-group') && !$target.hasClass('add-rule') &&
								!$target.hasClass('delete-group') && !$target.hasClass('delete-rule') &&
								(!$target.hasClass("fm-button") || !$target.is("[id$=_query]"))) {
							$("#"+fid+"_search").click();
							return false;
						}
						if (p.closeOnEscape && e.which === 27) { // 27 === $.ui.keyCode.ESCAPE
							$("#"+$.jgrid.jqID(IDs.modalhead)).find(".ui-jqdialog-titlebar-close").click();
							return false;
						}
					});
				}
				if(bQ) {
					$("#"+fid+"_query").on('click', function(){
						$(".queryresult", fil).toggle();
						return false;
					});
				}
				if (p.stringResult===undefined) {
					// to provide backward compatibility, inferring stringResult value from multipleSearch
					p.stringResult = p.multipleSearch;
				}
				$("#"+fid+"_search").on('click', function(){
					var sdata={}, res, filters;
					fl = $("#"+fid);
					fl.find(".input-elm:focus").change();
					if( ms && p.multipleSearch) {
						$t.p._savedFilter = {};
						filters = $.jgrid.filterRefactor({
							ruleGroup: $.extend(true, {}, fl.jqFilter('filterData')),
							ssfield : ssfield,
							splitSelect : p.splitSelect,
							groupOpSelect : p.groupOpSelect
						});
						$t.p._savedFilter = $.extend(true, {}, fl.jqFilter('filterData'));
					} else {
						filters = fl.jqFilter('filterData');
					}
					if(p.errorcheck) {
						fl[0].hideError();
						if(!p.showQuery) {fl.jqFilter('toSQLString');}
						if(fl[0].p.error) {
							fl[0].showError();
							return false;
						}
					}

					if(p.stringResult) {
						sdata[p.sFilter] = JSON.stringify( filters );
						$.each([p.sField,p.sValue, p.sOper], function() {sdata[this] = "";});
					} else {
						if(p.multipleSearch) {
							sdata[p.sFilter] = filters;
							$.each([p.sField,p.sValue, p.sOper], function() {sdata[this] = "";});
						} else {
							sdata[p.sField] = filters.rules[0].field;
							sdata[p.sValue] = filters.rules[0].data;
							sdata[p.sOper] = filters.rules[0].op;
							sdata[p.sFilter] = "";
						}
					}
					if(typeof sdata[p.sFilter] !== "string") {
						sdata[p.sFilter] = JSON.stringify( sdata[p.sFilter] );
					}
					$t.p.search = true;
					if($t.p.mergeSearch === true && $t.p.searchModules.hasOwnProperty('searchGrid') && $t.p.searchModules.searchGrid !== false  && p.multipleSearch) {
						if(sdata[p.sFilter] !==  "") {
							$t.p.searchModules.searchGrid = sdata[p.sFilter];
						} else {
							$t.p.searchModules.searchGrid = null;
						}
						$.extend($t.p.postData,{filters: $.jgrid.splitSearch($t.p.searchModules)});						
					} else {
						$.extend($t.p.postData,sdata);
					}
					mustReload = $($t).triggerHandler("jqGridFilterSearch");
					if( mustReload === undefined) {
						mustReload = true;
					}
					if(mustReload && $.jgrid.isFunction(p.onSearch) ) {
						mustReload = p.onSearch.call($t, $t.p.filters);
					}
					if (mustReload !== false) {
						$($t).trigger("reloadGrid",[{page:1}]);
					}
					if(p.closeAfterSearch) {
						$.jgrid.hideModal("#"+$.jgrid.jqID(IDs.themodal),{gb:"#gbox_"+$.jgrid.jqID($t.p.id),jqm:p.jqModal,onClose: p.onClose});
					}
					return false;
				});
				$("#"+fid+"_reset").on('click', function(){
					var sdata={},
					fl = $("#"+fid);
					$t.p.search = false;
					$t.p.resetsearch =  true;
					if(p.multipleSearch===false) {
						sdata[p.sField] = sdata[p.sValue] = sdata[p.sOper] = "";
					} else {
						sdata[p.sFilter] = "";
					}
					fl[0].resetFilter();
					if(found) {
						$(".ui-template", fil).val("default");
					}
					if($t.p.mergeSearch === true && $t.p.searchModules.hasOwnProperty('searchGrid') && $t.p.searchModules.searchGrid !== false ) {
						$t.p.searchModules.searchGrid = null;
						$.extend($t.p.postData,{filters: $.jgrid.splitSearch($t.p.searchModules)});
						$t.p.search = true;
					} else {
						$.extend($t.p.postData,sdata);
					}
					mustReload = $($t).triggerHandler("jqGridFilterReset");
					if(mustReload === undefined) {
						mustReload = true;
					}
					if(mustReload && $.jgrid.isFunction(p.onReset) ) {
						mustReload = p.onReset.call($t);
					}
					if(mustReload !== false) {
						$($t).trigger("reloadGrid",[{page:1}]);
					}
					if (p.closeAfterReset) {
						$.jgrid.hideModal("#"+$.jgrid.jqID(IDs.themodal),{gb:"#gbox_"+$.jgrid.jqID($t.p.id),jqm:p.jqModal,onClose: p.onClose});
					}
					return false;
				});
				showFilter($("#"+fid));
				$(".fm-button:not(."+common.disabled+")",fil).hover(
					function(){$(this).addClass(common.hover);},
					function(){$(this).removeClass(common.hover);}
				);
			}
		});
	},
	filterInput : function( val, p) {
		p = $.extend(true, {
			defaultSearch : 'cn',
			groupOp : 'OR',
			searchAll : false,
			beforeSearch : null,
			afterSearch : null
		}, p || {});
		return this.each(function(){
			var $t = this;
			if(!$t.grid) {return;}
			var nm, sop,ruleGroup = "{\"groupOp\":\"" + p.groupOp + "\",\"rules\":[", gi=0, so;
			val +="";
			if($t.p.datatype !== 'local') { return; }
			$.each($t.p.colModel,function(){
				nm = this.index || this.name;
				sop = this.searchoptions || {};
				so  = p.defaultSearch ? p.defaultSearch : (sop.sopt) ? sop.sopt[0] : p.defaultSearch;
				this.search = this.search === false ? false : true;
				if (this.search || p.searchAll) {
					if (gi > 0) {ruleGroup += ",";}
					ruleGroup += "{\"field\":\"" + nm + "\",";
					ruleGroup += "\"op\":\"" + so + "\",";
					ruleGroup += "\"data\":\"" + val.replace(/\\/g,'\\\\').replace(/\"/g,'\\"') + "\"}";
					gi++;
				}
			});
			ruleGroup += "]}";
			if($t.p.mergeSearch === true && $t.p.searchModules.hasOwnProperty('filterInput') && $t.p.searchModules.filterInput !== false  ) {
				if(gi > 0) {
					$t.p.searchModules.filterInput = ruleGroup;
				} else {
					$t.p.searchModules.filterInput = null;
				}
				$.extend($t.p.postData,{filters: $.jgrid.splitSearch($t.p.searchModules)});
			} else {
				$.extend($t.p.postData,{filters:ruleGroup});
			}
			$.each(['searchField', 'searchString', 'searchOper'], function(i, n){
				if($t.p.postData.hasOwnProperty(n)) { delete $t.p.postData[n];}
			});
			var bsr = $($t).triggerHandler("jqGridFilterInputBeforeSearch") === 'stop' ? true : false;
			if(!bsr && $.jgrid.isFunction(p.beforeSearch)){bsr = p.beforeSearch.call($t);}
			if(!bsr) { $($t).jqGrid("setGridParam",{search:true}).trigger("reloadGrid",[{page:1}]); }
			$($t).triggerHandler("jqGridFilterInputAfterSearch");
			if($.jgrid.isFunction(p.afterSearch)){p.afterSearch.call($t);}
		});
	},
	autoSelect : function (o) {
		o = $.extend(true,{
			field : "",
			direction : "asc",
			src_date : "Y-m-d",
			allValues : "All",
			count_item : true,
			create_value : true
		}, o || {} );
		return this.each(function() {
			var $t = this, item, sdata="";
			if( o.field && $t.p.data && Array.isArray( $t.p.data )) {
				var query, res, s_cnt, tmp = [], cm, len,
				result, i;

				try {
					query = $.jgrid.from.call($t, $t.p.data);
					result = query.groupBy( o.field, o.direction, "text", o.src_date);
					i = result.length;
				} catch(e) {

				}
				if(result && result.length) {
					res =  $("#gsh_"+$t.p.id+"_"+o.field).find("td.ui-search-input > select");
					i = result.length;
					if(o.allValues) {
						sdata = "<option value=''>"+ o.allValues +"</option>";
						tmp.push(":" + o.allValues);
					}
					while(i--) {
						item = result[i];
						s_cnt = o.count_item ? " (" +item.items.length+")" : "";
						sdata += "<option value='"+item.unique+"'>"+ item.unique + s_cnt+"</option>";
						tmp.push(item.unique+":"+item.unique + s_cnt);
					}
					res.append(sdata);
					res.on('change',function(){
						$t.triggerToolbar();
					});
					if( o.create_value ) {
						cm = $.jgrid.getElemByAttrVal($t.p.colModel, 'name', o.field, false);
						if( !$.isEmptyObject( cm ) ) {
							if( cm.searchoptions ) {
								$.extend(cm.searchoptions, {value: tmp.join(";")});
							} else {
								cm.searchoptions = {};
								cm.searchoptions.value = tmp.join(";");
							}
						}
					}
				}
			}
		});
	}
});
//module end
}));
