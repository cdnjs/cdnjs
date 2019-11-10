/*global $, jQuery*/
/*jslint plusplus: true, nomen: true */

/*!
* Yet Another DataTables Column Filter - (yadcf)
* 
* File:        jquery.dataTables.yadcf.js
* Version:     0.6.7
* 
* Author:      Daniel Reznick
* Info:        https://github.com/vedmack/yadcf
* Contact:     vedmack@gmail.com
* Twitter:	   @danielreznick
* Q&A		   https://groups.google.com/forum/#!forum/daniels_code	
* 
* Copyright 2013 Daniel Reznick, all rights reserved.
* Dual licensed under two licenses: GPL v2 license or a BSD (3-point) license (just like DataTables itself)
* 
* This source file is distributed in the hope that it will be useful, but 
* WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY 
* or FITNESS FOR A PARTICULAR PURPOSE. See the license files for details.
*/
/*
* Parameters:
*
*					
* -------------

* column_number
				Required:			true
				Type:				String
				Description:		The number of the column to which the filter will be applied

* filter_type				
				Required:			false
				Type:				String
				Default value:		select
				Possible values:	select / auto_complete / text / date / range_number / range_number_slider / range_date
				Description:		The type of the filter to be used in the column

* data
				Required:			false
				Type:				Array
				Description:		When the need of predefined data for filter is needed just use an array ["value1","value2"....] (supported in select / auto_complete filters)
					
* column_data_type
				Required:			false
				Type:				String
				Default value:		text
				Possible values:	text / html	
				Description:		The type of data in column , use "html" when you have some html code in the column (support parsing of multiple elements per cell)

* text_data_delimiter
				Required:			false
				Type:				String
				Description:		Delimiter that seperates text in table column, for example text_data_delimiter: ","
										
* html_data_type
				Required:			false
				Type:				String
				Default value:		text
				Possible values:	text / value / id			
				Description:		When using "html" for column_data_type argument you can choose how exactly to parse your html element/s in column , for example use "text" for the following <span class="someClass">Some text</span>

* filter_container_id
				Required:			false
				Type:				String
				Description:		In case that user don't want to place the filter in column header , he can pass an id of the desired container for the column filter 
		
* filter_default_label
				Required:			false
				Type:				String / Array of string in case of range_number filter (first entry is for the first input and the second entry is for the second input
				Default value:		Select value
				Description:		The label that will appear in the select menu filter when no value is selected from the filter
									
* filter_reset_button_text
				Required:			false
				Type:				String / boolean
				Default value:		x
				Description:		The text that will appear inside the reset button next to the select drop down (set this to false (boolean) in order to hide it from that column filter)

* enable_auto_complete (this attribute is deprecated , and will become obsolete in the future , so you better start using filter_type: "auto_complete")
				Required:			false
				Type:				boolean
				Default value:		false
				Description:		Turns the filter into an autocomplete input - make use of the jQuery UI Autocomplete widget (with some enhancements)

* sort_as
				Required:			false
				Type:				String
				Default value:		alpha
				Possible values:	alpha / num
				Description:		Defines how the values in the filter will be sorted, alphabetically or numerically

* sort_order
				Required:			false
				Type:				String
				Default value:		asc
				Possible values:	asc / desc
				Description:		Defines the order in which the values in the filter will be sorted, ascending or descending

* date_format
				Required:			false
				Type:				String
				Default value:		mm/dd/yyyy
				Possible values:	mm/dd/yyyy / dd/mm/yyyy (eventually I replace yyyy into yy for jquery datepicker)
				Description:		Defines the format in which the date values are being parsed into Date object

* ignore_char
				Required:			false
				Type:				String
				Description:		Tells the range_number and range_number_slide to ignore specific char while filtering (that char can used as number separator)
				
* filter_match_mode
				Required:			false
				Type:				String
				Default value:		contains
				Possible values:	contains / exact / startsWith
				Description:		Allows to control the matching mode of the filter (supported in select / auto_complete / text filters)
				
* select_type
				Required:			false
				Type:				String
				Default value:		undefined
				Possible values:	chosen
				Description:		Turns the simple select element into "Chosen select" (make use of the Chosen jQuery plugin)
				
				
* select_type_options
				Required:			false
				Type:				Object
				Default value:		{}
				Description:		This parameter will be passed "as is" the the Chosen plugin constructor
				
				
* case_insensitive
				Required:			false
				Type:				boolean
				Default value:		true
				Description:		Do case-insensitive filtering (supported in select / auto_complete / text filters)
								

*				
*				
*				
* External API functions:
*
*					
* -------------				

* exFilterColumn
				Description:		Allows to trigger filter externally/programmatically (currently support only filter_type : "select") , perfect for showing table after its being filtered (onload)
				Arguments:			table_arg (variable of the datatable), 
									column_number,
									filter_value (the actual string value that we want to filter by)
				Usage Example:		yadcf.exFilterColumn(oTable, 0, "Some Data 3");
*
*
*/
var yadcf = (function ($) {

	'use strict';

	var oTables = {},
		oTablesIndex = {},
		options = {},
		exFilterColumnQueue = [];

	function getOptions(selector) {
		return options[selector];
	}

	function resetIApiIndex() {
		$.fn.dataTableExt.iApiIndex = 0;
	}

	function generateTableSelectorJQFriendly(tmpStr) {
		return tmpStr.replace(":", "-").replace("(", "").replace(")", "").replace(".", "-").replace("#", "-");
	}

	function extractColumnInfoFromOptions(options, column_number, property) {
		var i;
		for (i = 0; i < options.length; i++) {
			if (options[i].column_number === column_number) {
				return options[i][property];
			}
		}
	}
	function yadcfMatchFilter(oTable, selected_value, filter_match_mode, column_number) {
		var case_insensitive = extractColumnInfoFromOptions(yadcf.getOptions(oTable.selector), column_number, "case_insensitive");
		if (filter_match_mode === "contains") {
			oTable.fnFilter(selected_value, column_number, false, false, true, case_insensitive);
		} else if (filter_match_mode === "exact") {
			oTable.fnFilter("^" + selected_value + "$", column_number, true, false, true, case_insensitive);
		} else if (filter_match_mode === "startsWith") {
			oTable.fnFilter("^" + selected_value, column_number, true, false, true, case_insensitive);
		}
	}

	function yadcfParseMatchFilter(tmpStr, filter_match_mode) {
		var retVal;
		if (filter_match_mode === "contains") {
			retVal = tmpStr;
		} else if (filter_match_mode === "exact") {
			retVal = tmpStr.substring(1, tmpStr.length - 1);
		} else if (filter_match_mode === "startsWith") {
			retVal = tmpStr.substring(1, tmpStr.length);
		}
		return retVal;
	}

	function doFilter(arg, table_selector_jq_friendly, column_number, filter_match_mode) {
		$.fn.dataTableExt.iApiIndex = oTablesIndex[table_selector_jq_friendly];
		var oTable = oTables[table_selector_jq_friendly],
			selected_value;

		if (arg === "clear") {
			$("#yadcf-filter-" + table_selector_jq_friendly + "-" + column_number).val("-1").focus();
			$("#yadcf-filter-" + table_selector_jq_friendly + "-" + column_number).removeClass("inuse");
			$(document).data("#yadcf-filter-" + table_selector_jq_friendly + "-" + column_number + "_val", "-1");
			oTable.fnFilter("", column_number);
			resetIApiIndex();
			if (extractColumnInfoFromOptions(yadcf.getOptions(oTable.selector), column_number, "select_type") === 'chosen') {
				$("#yadcf-filter-" + table_selector_jq_friendly + "-" + column_number).trigger("chosen:updated");
			}
			return;
		}

		$("#yadcf-filter-" + table_selector_jq_friendly + "-" + column_number).addClass("inuse");

		$(document).data("#yadcf-filter-" + table_selector_jq_friendly + "-" + column_number + "_val", arg.value);

		selected_value = $.trim($(arg).find('option:selected').text());

		if (arg.value !== "-1") {
			yadcfMatchFilter(oTable, selected_value, filter_match_mode, column_number);
		} else {
			oTable.fnFilter("", column_number);
			$("#yadcf-filter-" + table_selector_jq_friendly + "-" + column_number).removeClass("inuse");
		}
		resetIApiIndex();
	}

	function doFilterAutocomplete(arg, table_selector_jq_friendly, column_number, filter_match_mode) {
		$.fn.dataTableExt.iApiIndex = oTablesIndex[table_selector_jq_friendly];
		var oTable = oTables[table_selector_jq_friendly];

		if (arg === "clear") {
			$("#yadcf-filter-" + table_selector_jq_friendly + "-" + column_number).val("").focus();
			$("#yadcf-filter-" + table_selector_jq_friendly + "-" + column_number).removeClass("inuse");
			$(document).removeData("#yadcf-filter-" + table_selector_jq_friendly + "-" + column_number + "_val");
			oTable.fnFilter("", column_number);
			resetIApiIndex();
			return;
		}

		$("#yadcf-filter-" + table_selector_jq_friendly + "-" + column_number).addClass("inuse");

		$(document).data("#yadcf-filter-" + table_selector_jq_friendly + "-" + column_number + "_val", arg.value);

		yadcfMatchFilter(oTable, arg.value, filter_match_mode, column_number);

		resetIApiIndex();
	}

	function autocompleteSelect(event, ui) {

		var table_column = event.target.id.replace("yadcf-filter-", ""),
			dashIndex = table_column.lastIndexOf("-"),
			table_selector_jq_friendly = table_column.substring(0, dashIndex),
			col_num = parseInt(table_column.substring(dashIndex + 1), 10),
			filter_match_mode = $(event.target).attr("filter_match_mode");
		doFilterAutocomplete(ui.item, table_selector_jq_friendly, col_num, filter_match_mode);
	}

	function sortNumAsc(a, b) {
		return a - b;
	}

	function sortNumDesc(a, b) {
		return b - a;
	}

	function findMinInArray(array, ignore_char) {
		var narray = [], i;
		for (i = 0; i < array.length; i++) {
			if (array[i] !== null) {
				if (ignore_char !== undefined) {
					array[i] = array[i].toString().replace(ignore_char, "");
				}
				narray.push(array[i]);
			}
		}
		return Math.min.apply(Math, narray);
	}

	function findMaxInArray(array, ignore_char) {
		var narray = [], i;
		for (i = 0; i < array.length; i++) {
			if (array[i] !== null) {
				if (ignore_char !== undefined) {
					array[i] = array[i].toString().replace(ignore_char, "");
				}
				narray.push(array[i]);
			}
		}
		return Math.max.apply(Math, narray);
	}

	function addRangeNumberFilterCapability(table_selector_jq_friendly, fromId, toId, col_num, ignore_char) {

		$.fn.dataTableExt.afnFiltering.push(
			function (oSettings, aData, iDataIndex) {
				var min = document.getElementById(fromId).value,
					max = document.getElementById(toId).value,
					val = aData[col_num] === "-" ? 0 : aData[col_num],
					retVal = false,
					table_selector_jq_friendly_local = table_selector_jq_friendly,
					current_table_selector_jq_friendly = yadcf.generateTableSelectorJQFriendly(oSettings.oInstance.selector),
					ignore_char_local = ignore_char;

				if (table_selector_jq_friendly_local !== current_table_selector_jq_friendly) {
					return true;
				}

				if (ignore_char_local !== undefined) {
					min = min.replace(ignore_char_local, "");
					max = max.replace(ignore_char_local, "");
					val = val.toString().replace(ignore_char_local, "");
				}

				min = (min !== "") ? (+min) : min;
				max = (max !== "") ? (+max) : max;
				val = (val !== "") ? (+val) : val;
				if (min === "" && max === "") {
					retVal = true;
				} else if (min === "" && val <= max) {
					retVal = true;
				} else if (min <= val && "" === max) {
					retVal = true;
				} else if (min <= val && val <= max) {
					retVal = true;
				}
				return retVal;
			}
		);
	}

	function addRangeDateFilterCapability(table_selector_jq_friendly, fromId, toId, col_num, date_format) {

		$.fn.dataTableExt.afnFiltering.push(
			function (oSettings, aData, iDataIndex) {
				var min = document.getElementById(fromId).value,
					max = document.getElementById(toId).value,
					val = aData[col_num] === "-" ? 0 : aData[col_num],
					retVal = false,
					table_selector_jq_friendly_local = table_selector_jq_friendly,
					current_table_selector_jq_friendly = yadcf.generateTableSelectorJQFriendly(oSettings.oInstance.selector);

				if (table_selector_jq_friendly_local !== current_table_selector_jq_friendly) {
					return true;
				}
				try {
					if (min.length === (date_format.length + 2)) {
						min = (min !== "") ? $.datepicker.parseDate(date_format, min) : min;
					}
				} catch (err1) {}
				try {
					if (max.length === (date_format.length + 2)) {
						max = (max !== "") ? $.datepicker.parseDate(date_format, max) : max;
					}
				} catch (err2) {}
				try {
					val = (val !== "") ? $.datepicker.parseDate(date_format, val) : val;
				} catch (err3) {}
				if ((min === "" || !(min instanceof Date)) && (max === "" || !(max instanceof Date))) {
					retVal = true;
				} else if (min === "" && val <= max) {
					retVal = true;
				} else if (min <= val && "" === max) {
					retVal = true;
				} else if (min <= val && val <= max) {
					retVal = true;
				}
				return retVal;
			}
		);
	}

	function addRangeNumberSliderFilterCapability(table_selector_jq_friendly, fromId, toId, col_num, ignore_char) {

		$.fn.dataTableExt.afnFiltering.push(
			function (oSettings, aData, iDataIndex) {
				var min = $('#' + fromId).text(),
					max = $('#' + toId).text(),
					val = aData[col_num] === "-" ? 0 : aData[col_num],
					retVal = false,
					table_selector_jq_friendly_local = table_selector_jq_friendly,
					current_table_selector_jq_friendly = yadcf.generateTableSelectorJQFriendly(oSettings.oInstance.selector),
					ignore_char_local = ignore_char,
					column_data_type,
					html_data_type,
					i;

				if (table_selector_jq_friendly_local !== current_table_selector_jq_friendly) {
					return true;
				}

				if (!isFinite(min) || !isFinite(max)) {
					return true;
				}

				for (i = 0; i < yadcf.getOptions(oSettings.oInstance.selector).length; i++) {
					if (yadcf.getOptions(oSettings.oInstance.selector)[i].column_number === col_num) {

						column_data_type = yadcf.getOptions(oSettings.oInstance.selector)[i].column_data_type;
						html_data_type = yadcf.getOptions(oSettings.oInstance.selector)[i].html_data_type;

						if (column_data_type === "html") {
							if (html_data_type === undefined) {
								html_data_type = "text";
							}
							switch (html_data_type) {
							case "text":
								val = $(val).text();
								break;
							case "value":
								val = $(val).val();
								break;
							case "id":
								val = val.id;
								break;
							}
						}
						break;
					}
				}

				if (ignore_char_local !== undefined) {
					min = min.replace(ignore_char_local, "");
					max = max.replace(ignore_char_local, "");
					val = val.toString().replace(ignore_char_local, "");
				}

				min = (min !== "") ? (+min) : min;
				max = (max !== "") ? (+max) : max;
				val = (val !== "") ? (+val) : val;
				if (min === "" && max === "") {
					retVal = true;
				} else if (min === "" && val <= max) {
					retVal = true;
				} else if (min <= val && "" === max) {
					retVal = true;
				} else if (min <= val && val <= max) {
					retVal = true;
				}
				return retVal;
			}
		);
	}

	function addRangeNumberFilter(filter_selector_string, table_selector_jq_friendly, column_number, filter_reset_button_text, filter_default_label, ignore_char) {
		var fromId = "yadcf-filter-" + table_selector_jq_friendly + "-from-" + column_number,
			toId = "yadcf-filter-" + table_selector_jq_friendly + "-to-" + column_number,
			filter_selector_string_tmp,
			filter_wrapper_id,
			oTable;

		filter_wrapper_id = "yadcf-filter-wrapper-" + table_selector_jq_friendly + "-" + column_number;

		if ($("#" + filter_wrapper_id).length > 0) {
			return;
		}

		//add a wrapper to hold both filter and reset button
		$(filter_selector_string).append("<div onclick=\"yadcf.stopPropagation(event);\" id=\"" + filter_wrapper_id + "\" class=\"yadcf-filter-wrapper\"></div>");
		filter_selector_string = filter_selector_string + " div.yadcf-filter-wrapper";
		filter_selector_string_tmp = filter_selector_string;

		$(filter_selector_string).append("<div id=\"yadcf-filter-wrapper-inner-" + table_selector_jq_friendly + "-" + column_number + "\" class=\"yadcf-filter-wrapper-inner\"></div>");
		filter_selector_string = filter_selector_string + " div.yadcf-filter-wrapper-inner";

		$(filter_selector_string).append("<input placeholder=\"" + filter_default_label[0] + "\" id=\"" + fromId + "\" class=\"yadcf-filter-range-number yadcf-filter-range\" onkeyup=\"yadcf.rangeNumberKeyUP('" + table_selector_jq_friendly + "',event);\">" +
			"</input>");
		$(filter_selector_string).append("<span class=\"yadcf-filter-range-number-seperator\" >" +
			"</span>");
		$(filter_selector_string).append("<input placeholder=\"" + filter_default_label[1] + "\" id=\"" + toId + "\" class=\"yadcf-filter-range-number yadcf-filter-range\" onkeyup=\"yadcf.rangeNumberKeyUP('" + table_selector_jq_friendly + "',event);\">" +
			"</input>");

		if (filter_reset_button_text !== false) {
			$(filter_selector_string_tmp).append("<input value=\"" + filter_reset_button_text + "\" type=\"button\" " +
				"onclick=\"yadcf.stopPropagation(event);yadcf.rangeClear('" + table_selector_jq_friendly + "',event); return false;\" class=\"yadcf-filter-reset-button\">");
		}

		$.fn.dataTableExt.iApiIndex = oTablesIndex[table_selector_jq_friendly];
		oTable = oTables[table_selector_jq_friendly];
		if (oTable.fnSettings().oFeatures.bStateSave === true && oTable.fnSettings().oLoadedState) {
			if (oTable.fnSettings().oLoadedState.yadcfState && oTable.fnSettings().oLoadedState.yadcfState[table_selector_jq_friendly] && oTable.fnSettings().oLoadedState.yadcfState[table_selector_jq_friendly][column_number]) {
				$('#' + fromId).val(oTable.fnSettings().oLoadedState.yadcfState[table_selector_jq_friendly][column_number].from);
				if (oTable.fnSettings().oLoadedState.yadcfState[table_selector_jq_friendly][column_number].from !== "") {
					$('#' + fromId).addClass("inuse");
				}
				$('#' + toId).val(oTable.fnSettings().oLoadedState.yadcfState[table_selector_jq_friendly][column_number].to);
				if (oTable.fnSettings().oLoadedState.yadcfState[table_selector_jq_friendly][column_number].to !== "") {
					$('#' + toId).addClass("inuse");
				}
			}
		}
		resetIApiIndex();

		addRangeNumberFilterCapability(table_selector_jq_friendly, fromId, toId, column_number, ignore_char);

	}

	function dateSelectSingle(date, event, clear) {
		var oTable,
			column_number = $(event).attr('id').replace('yadcf-filter-', '').replace('-date', '').replace('-reset', ''),
			dashIndex = column_number.lastIndexOf("-"),
			table_selector_jq_friendly = column_number.substring(0, dashIndex),
			date_str;

		column_number = column_number.substring(dashIndex + 1);
		$.fn.dataTableExt.iApiIndex = oTablesIndex[table_selector_jq_friendly];
		oTable = oTables[table_selector_jq_friendly];

		if (clear === undefined) {
			date_str = document.getElementById($(event).attr('id')).value;
			oTable.fnFilter(date, column_number);
			$('#yadcf-filter-' + table_selector_jq_friendly + '-' + column_number).addClass("inuse");
		} else if (clear === 'clear') {
			oTable.fnFilter('', column_number);
			$('#yadcf-filter-' + table_selector_jq_friendly + '-' + column_number).val('').removeClass("inuse");
		}

		resetIApiIndex();
	}

	function dateSelect(date, event) {

		var oTable,
			column_number = $(event).attr("id").replace("yadcf-filter-", "").replace("-from-date", "").replace("-to-date", ""),
			dashIndex = column_number.lastIndexOf("-"),
			table_selector_jq_friendly = column_number.substring(0, dashIndex),
			yadcfState,
			from,
			to;

		column_number = column_number.substring(dashIndex + 1);
		$.fn.dataTableExt.iApiIndex = oTablesIndex[table_selector_jq_friendly];

		oTable = oTables[table_selector_jq_friendly];
		oTable.fnDraw();

		$("#" + $(event).attr("id")).addClass("inuse");

		if (!oTable.fnSettings().oLoadedState) {
			oTable.fnSettings().oLoadedState = {};
			oTable.fnSettings().oApi._fnSaveState(oTable.fnSettings());
		}
		if (oTable.fnSettings().oFeatures.bStateSave === true) {
			if ($(event).attr("id").indexOf("-from-") !== -1) {
				from = document.getElementById($(event).attr("id")).value;
				to = document.getElementById($(event).attr("id").replace("-from-", "-to-")).value;
			} else {
				to = document.getElementById($(event).attr("id")).value;
				from = document.getElementById($(event).attr("id").replace("-to-", "-from-")).value;
			}
			if (oTable.fnSettings().oLoadedState.yadcfState !== undefined && oTable.fnSettings().oLoadedState.yadcfState[table_selector_jq_friendly] !== undefined) {
				oTable.fnSettings().oLoadedState.yadcfState[table_selector_jq_friendly][column_number] =
					{
						'from' : from,
						'to' : to
					};
			} else {
				yadcfState = {};
				yadcfState[table_selector_jq_friendly] = [];
				yadcfState[table_selector_jq_friendly][column_number] = {
					'from' : from,
					'to' : to
				};
				oTable.fnSettings().oLoadedState.yadcfState = yadcfState;
			}
			oTable.fnSettings().oApi._fnSaveState(oTable.fnSettings());
		}

		resetIApiIndex();
	}

	function addRangeDateFilter(filter_selector_string, table_selector_jq_friendly, column_number, filter_reset_button_text, filter_default_label, date_format) {
		var fromId = "yadcf-filter-" + table_selector_jq_friendly + "-from-date-" + column_number,
			toId = "yadcf-filter-" + table_selector_jq_friendly + "-to-date-" + column_number,
			filter_selector_string_tmp,
			filter_wrapper_id,
			oTable;

		filter_wrapper_id = "yadcf-filter-wrapper-" + table_selector_jq_friendly + "-" + column_number;

		if ($("#" + filter_wrapper_id).length > 0) {
			return;
		}

		//add a wrapper to hold both filter and reset button
		$(filter_selector_string).append("<div onclick=\"yadcf.stopPropagation(event);\" id=\"" + filter_wrapper_id + "\" class=\"yadcf-filter-wrapper\"></div>");
		filter_selector_string = filter_selector_string + " div.yadcf-filter-wrapper";
		filter_selector_string_tmp = filter_selector_string;

		$(filter_selector_string).append("<div id=\"yadcf-filter-wrapper-inner-" + table_selector_jq_friendly + "-" + column_number + "\" class=\"yadcf-filter-wrapper-inner\"></div>");
		filter_selector_string = filter_selector_string + " div.yadcf-filter-wrapper-inner";

		$(filter_selector_string).append("<input placeholder=\"" + filter_default_label[0] + "\" id=\"" + fromId + "\" class=\"yadcf-filter-range-date yadcf-filter-range\" onkeyup=\"yadcf.rangeDateKeyUP('" + table_selector_jq_friendly + "','" + date_format + "',event);\">" +
			"</input>");
		$(filter_selector_string).append("<span class=\"yadcf-filter-range-date-seperator\" >" +
			"</span>");
		$(filter_selector_string).append("<input placeholder=\"" + filter_default_label[1] + "\" id=\"" + toId + "\" class=\"yadcf-filter-range-date yadcf-filter-range\" onkeyup=\"yadcf.rangeDateKeyUP('" + table_selector_jq_friendly + "','" + date_format + "',event);\">" +
			"</input>");

		if (filter_reset_button_text !== false) {
			$(filter_selector_string_tmp).append("<input value=\"" + filter_reset_button_text + "\" type=\"button\" " +
				"onclick=\"yadcf.stopPropagation(event);yadcf.rangeClear('" + table_selector_jq_friendly + "',event); return false;\" class=\"yadcf-filter-reset-button\">");
		}

		$("#" + fromId).datepicker({
			dateFormat: date_format,
			onSelect: dateSelect
		});
		$("#" + toId).datepicker({
			dateFormat: date_format,
			onSelect: dateSelect
		});

		$.fn.dataTableExt.iApiIndex = oTablesIndex[table_selector_jq_friendly];
		oTable = oTables[table_selector_jq_friendly];
		if (oTable.fnSettings().oFeatures.bStateSave === true && oTable.fnSettings().oLoadedState) {
			if (oTable.fnSettings().oLoadedState.yadcfState && oTable.fnSettings().oLoadedState.yadcfState[table_selector_jq_friendly] && oTable.fnSettings().oLoadedState.yadcfState[table_selector_jq_friendly][column_number]) {
				$('#' + fromId).val(oTable.fnSettings().oLoadedState.yadcfState[table_selector_jq_friendly][column_number].from);
				if (oTable.fnSettings().oLoadedState.yadcfState[table_selector_jq_friendly][column_number].from !== "") {
					$('#' + fromId).addClass("inuse");
				}
				$('#' + toId).val(oTable.fnSettings().oLoadedState.yadcfState[table_selector_jq_friendly][column_number].to);
				if (oTable.fnSettings().oLoadedState.yadcfState[table_selector_jq_friendly][column_number].to !== "") {
					$('#' + toId).addClass("inuse");
				}
			}
		}
		resetIApiIndex();

		addRangeDateFilterCapability(table_selector_jq_friendly, fromId, toId, column_number, date_format);
	}

	function addDateFilter(filter_selector_string, table_selector_jq_friendly, column_number, filter_reset_button_text, filter_default_label, date_format) {
		var dateId = "yadcf-filter-" + table_selector_jq_friendly + "-" + column_number,
			filter_selector_string_tmp,
			filter_wrapper_id,
			oTable;

		filter_wrapper_id = "yadcf-filter-wrapper-" + table_selector_jq_friendly + "-" + column_number;

		if ($("#" + filter_wrapper_id).length > 0) {
			return;
		}

		//add a wrapper to hold both filter and reset button
		$(filter_selector_string).append("<div onclick=\"yadcf.stopPropagation(event);\" id=\"" + filter_wrapper_id + "\" class=\"yadcf-filter-wrapper\"></div>");
		filter_selector_string = filter_selector_string + " div.yadcf-filter-wrapper";
		filter_selector_string_tmp = filter_selector_string;

		$(filter_selector_string).append("<input placeholder=\"" + filter_default_label + "\" id=\"" + dateId + "\" class=\"yadcf-filter-date\" onkeyup=\"yadcf.dateKeyUP('" +
			table_selector_jq_friendly + "','" + date_format + "',event);\"></input>");

		if (filter_reset_button_text !== false) {
			$(filter_selector_string_tmp).append('<input value="' + filter_reset_button_text + '" type="button" id="' + dateId + '-reset"' +
				'onclick="yadcf.stopPropagation(event);yadcf.dateSelectSingle(\'' + table_selector_jq_friendly + '\',event.target, \'clear\'); return false;" class="yadcf-filter-reset-button">');
		}

		$("#" + dateId).datepicker({
			dateFormat: date_format,
			onSelect: dateSelectSingle
		});

		$.fn.dataTableExt.iApiIndex = oTablesIndex[table_selector_jq_friendly];
		oTable = oTables[table_selector_jq_friendly];

		if (oTable.fnSettings().oFeatures.bStateSave === true && oTable.fnSettings().aoPreSearchCols[column_number].sSearch) {
			$('#yadcf-filter-' + table_selector_jq_friendly + '-' + column_number).val(oTable.fnSettings().aoPreSearchCols[column_number].sSearch).addClass("inuse");
		}

		resetIApiIndex();

	}

	function rangeNumberSldierDrawTips(min_tip_val, max_tip_val, min_tip_id, max_tip_id, table_selector_jq_friendly, column_number) {
		var first_handle = $("#yadcf-filter-wrapper-inner-" + table_selector_jq_friendly + "-" + column_number + " .ui-slider-handle:first"),
			last_handle = $("#yadcf-filter-wrapper-inner-" + table_selector_jq_friendly + "-" + column_number + " .ui-slider-handle:last"),
			min_tip_inner,
			max_tip_inner;

		min_tip_inner = "<div id=\"" + min_tip_id + "\" class=\"yadcf-filter-range-number-slider-min-tip-inner\">" + min_tip_val + "</div>";
		max_tip_inner = "<div id=\"" + max_tip_id + "\" class=\"yadcf-filter-range-number-slider-max-tip-inner\">" + max_tip_val + "</div>";

		$(first_handle).addClass("yadcf-filter-range-number-slider-min-tip").html(min_tip_inner);
		$(last_handle).addClass("yadcf-filter-range-number-slider-max-tip").html(max_tip_inner);
	}

	function rangeNumberSliderChange(table_selector_jq_friendly, event, ui) {
		var oTable,
			min_val,
			max_val,
			slider_inuse,
			yadcfState,
			column_number = $(event.target).attr('id').replace("yadcf-filter-", "").replace(table_selector_jq_friendly, "").replace("-slider-", "");

		$.fn.dataTableExt.iApiIndex = oTablesIndex[table_selector_jq_friendly];
		oTable = oTables[table_selector_jq_friendly];

		oTable.fnDraw();

		min_val = +$($(event.target).parent().find(".yadcf-filter-range-number-slider-min-tip-hidden")).text();
		max_val = +$($(event.target).parent().find(".yadcf-filter-range-number-slider-max-tip-hidden")).text();


		if (min_val !== ui.values[0]) {
			$($(event.target).find(".ui-slider-handle")[0]).addClass("inuse");
			slider_inuse = true;
		} else {
			$($(event.target).find(".ui-slider-handle")[0]).removeClass("inuse");
		}
		if (max_val !== ui.values[1]) {
			$($(event.target).find(".ui-slider-handle")[1]).addClass("inuse");
			slider_inuse = true;
		} else {
			$($(event.target).find(".ui-slider-handle")[1]).removeClass("inuse");
		}

		if (slider_inuse === true) {
			$(event.target).find(".ui-slider-range").addClass("inuse");
		} else {
			$(event.target).find(".ui-slider-range").removeClass("inuse");
		}
		if (!oTable.fnSettings().oLoadedState) {
			oTable.fnSettings().oLoadedState = {};
			oTable.fnSettings().oApi._fnSaveState(oTable.fnSettings());
		}
		if (oTable.fnSettings().oFeatures.bStateSave === true) {
			if (oTable.fnSettings().oLoadedState.yadcfState !== undefined && oTable.fnSettings().oLoadedState.yadcfState[table_selector_jq_friendly] !== undefined) {
				oTable.fnSettings().oLoadedState.yadcfState[table_selector_jq_friendly][column_number] =
					{
						'from' : ui.values[0],
						'to' : ui.values[1]
					};
			} else {
				yadcfState = {};
				yadcfState[table_selector_jq_friendly] = [];
				yadcfState[table_selector_jq_friendly][column_number] = {
					'from' : ui.values[0],
					'to' : ui.values[1]
				};
				oTable.fnSettings().oLoadedState.yadcfState = yadcfState;
			}
			oTable.fnSettings().oApi._fnSaveState(oTable.fnSettings());
		}

		resetIApiIndex();
	}

	function addRangeNumberSliderFilter(filter_selector_string, table_selector_jq_friendly, column_number, filter_reset_button_text, min_val, max_val, ignore_char) {
		var sliderId = "yadcf-filter-" + table_selector_jq_friendly + "-slider-" + column_number,
			min_tip_id = "yadcf-filter-" + table_selector_jq_friendly + "-min_tip-" + column_number,
			max_tip_id = "yadcf-filter-" + table_selector_jq_friendly + "-max_tip-" + column_number,
			filter_selector_string_tmp,
			filter_wrapper_id,
			oTable,
			min_state_val = min_val,
			max_state_val = max_val;

		filter_wrapper_id = "yadcf-filter-wrapper-" + table_selector_jq_friendly + "-" + column_number;

		if ($("#" + filter_wrapper_id).length > 0) {
			if (!isFinite($('#' + min_tip_id).text()) || !isFinite($('#' + max_tip_id).text()) || !isFinite(min_val) || !isFinite(max_val) ||
					!isFinite($(filter_selector_string).find('.yadcf-filter-range-number-slider-min-tip-hidden.hide').text()) ||
					!isFinite($(filter_selector_string).find('.yadcf-filter-range-number-slider-max-tip-hidden.hide').text())) {
				$("#" + filter_wrapper_id).remove();
			} else {
				return;
			}
		}

		//add a wrapper to hold both filter and reset button
		$(filter_selector_string).append("<div onclick=\"yadcf.stopPropagation(event);\" id=\"" + filter_wrapper_id + "\" class=\"yadcf-filter-wrapper\"></div>");
		filter_selector_string = filter_selector_string + " div.yadcf-filter-wrapper";
		filter_selector_string_tmp = filter_selector_string;

		$(filter_selector_string).append("<div id=\"yadcf-filter-wrapper-inner-" + table_selector_jq_friendly + "-" + column_number + "\" class=\"yadcf-number-slider-filter-wrapper-inner\"></div>");
		filter_selector_string = filter_selector_string + " div.yadcf-number-slider-filter-wrapper-inner";

		$(filter_selector_string).append("<div id=\"" + sliderId + "\" class=\"yadcf-filter-range-number-slider\"></div>");
		filter_selector_string = filter_selector_string + " #" + sliderId;

		$(filter_selector_string).append("<span class=\"yadcf-filter-range-number-slider-min-tip-hidden hide\">" + min_val + "</span>");
		$(filter_selector_string).append("<span class=\"yadcf-filter-range-number-slider-max-tip-hidden hide\">" + max_val + "</span>");

		$.fn.dataTableExt.iApiIndex = oTablesIndex[table_selector_jq_friendly];
		oTable = oTables[table_selector_jq_friendly];
		if (oTable.fnSettings().oFeatures.bStateSave === true && oTable.fnSettings().oLoadedState) {
			if (oTable.fnSettings().oLoadedState.yadcfState && oTable.fnSettings().oLoadedState.yadcfState[table_selector_jq_friendly] && oTable.fnSettings().oLoadedState.yadcfState[table_selector_jq_friendly][column_number]) {
				if (min_val !== oTable.fnSettings().oLoadedState.yadcfState[table_selector_jq_friendly][column_number].from) {
					min_state_val = oTable.fnSettings().oLoadedState.yadcfState[table_selector_jq_friendly][column_number].from;
				}
				if (max_val !== oTable.fnSettings().oLoadedState.yadcfState[table_selector_jq_friendly][column_number].to) {
					max_state_val = oTable.fnSettings().oLoadedState.yadcfState[table_selector_jq_friendly][column_number].to;
				}
			}
		}

		if (isFinite(min_val) && isFinite(max_val) && isFinite(min_state_val) && isFinite(max_state_val)) {
			$("#" + sliderId).slider({
				range: true,
				min: min_val,
				max: max_val,
				values: [min_state_val, max_state_val],
				create: function (event, ui) {
					rangeNumberSldierDrawTips(min_state_val, max_state_val, min_tip_id, max_tip_id, table_selector_jq_friendly, column_number);
				},
				slide: function (event, ui) {
					rangeNumberSldierDrawTips(ui.values[0], ui.values[1], min_tip_id, max_tip_id, table_selector_jq_friendly, column_number);
					rangeNumberSliderChange(table_selector_jq_friendly, event, ui);
				},
				change: function (event, ui) {
					rangeNumberSldierDrawTips(ui.values[0], ui.values[1], min_tip_id, max_tip_id, table_selector_jq_friendly, column_number);
					rangeNumberSliderChange(table_selector_jq_friendly, event, ui);
				}
			});

			if (filter_reset_button_text !== false) {
				$(filter_selector_string_tmp).append("<input value=\"" + filter_reset_button_text + "\" type=\"button\" " +
					"onclick=\"yadcf.stopPropagation(event);yadcf.rangeNumberSliderClear('" + table_selector_jq_friendly + "',event); return false;\" class=\"yadcf-filter-reset-button range-number-slider-reset-button\">");
			}
		}

		$.fn.dataTableExt.iApiIndex = oTablesIndex[table_selector_jq_friendly];
		oTable = oTables[table_selector_jq_friendly];
		if (oTable.fnSettings().oFeatures.bStateSave === true && oTable.fnSettings().oLoadedState) {
			if (oTable.fnSettings().oLoadedState.yadcfState && oTable.fnSettings().oLoadedState.yadcfState[table_selector_jq_friendly] && oTable.fnSettings().oLoadedState.yadcfState[table_selector_jq_friendly][column_number]) {
				if (isFinite(min_val) && min_val !== oTable.fnSettings().oLoadedState.yadcfState[table_selector_jq_friendly][column_number].from) {
					$($(filter_selector_string).find(".ui-slider-handle")[0]).addClass("inuse");
				}
				if (isFinite(max_val) && max_val !== oTable.fnSettings().oLoadedState.yadcfState[table_selector_jq_friendly][column_number].to) {
					$($(filter_selector_string).find(".ui-slider-handle")[1]).addClass("inuse");
				}
				if ((isFinite(min_val) && isFinite(max_val)) && (min_val !== oTable.fnSettings().oLoadedState.yadcfState[table_selector_jq_friendly][column_number].from || max_val !== oTable.fnSettings().oLoadedState.yadcfState[table_selector_jq_friendly][column_number].to)) {
					$($(filter_selector_string).find(".ui-slider-range")).addClass("inuse");
				}
			}
		}
		resetIApiIndex();

		addRangeNumberSliderFilterCapability(table_selector_jq_friendly, min_tip_id, max_tip_id, column_number, ignore_char);
	}

	function dot2obj(tmpObj, dot_refs) {
		var i = 0;
		dot_refs = dot_refs.split(".");
		for (i = 0; i < dot_refs.length; i++) {
			tmpObj = tmpObj[dot_refs[i]];
		}
		return tmpObj;
	}

	function appendFilters(oTable, args, table_selector) {

		var i = 0,
			$filter_selector,
			filter_selector_string,

			data,
			filter_container_id,
			column_number_data,
			column_number,
			column_data_type,
			html_data_type,
			text_data_delimiter,
			filter_default_label,
			filter_reset_button_text,
			enable_auto_complete,
			sort_as,
			sort_order,
			date_format,
			ignore_char,
			filter_match_mode,

			options,
			options_tmp,
			j,
			k,
			data_length,
			col_inner_elements,
			col_inner_data,
			col_filter_array,
			ii,
			default_options = {
				filter_type : "select",
				enable_auto_complete : false,
				sort_as : "alpha",
				sort_order : "asc",
				date_format : "mm/dd/yyyy",
				ignore_char : undefined,
				filter_match_mode : "contains",
				select_type : undefined,
				select_type_options : {},
				case_insensitive : true
			},
			table_selector_jq_friendly,
			min_val,
			max_val,
			col_num_visible,
			col_num_visible_iter,
			tmpStr;


		for (i; i < args.length; i++) {

			args[i] = $.extend({}, default_options, args[i]);

			data = args[i].data;
			filter_container_id = args[i].filter_container_id;
			column_number = args[i].column_number;
			column_number = +column_number;
			column_number_data = undefined;
			if (isNaN(oTable.fnSettings().aoColumns[column_number].mData)) {
			    column_number_data = oTable.fnSettings().aoColumns[column_number].mData;
			}
			column_data_type = args[i].column_data_type;
			html_data_type = args[i].html_data_type;
			text_data_delimiter = args[i].text_data_delimiter;
			filter_default_label = args[i].filter_default_label;
			filter_reset_button_text = args[i].filter_reset_button_text;
			enable_auto_complete = args[i].enable_auto_complete;
			sort_as = args[i].sort_as;
			sort_order = args[i].sort_order;
			date_format = args[i].date_format;
			//for jquery datepicker
			date_format = date_format.replace("yyyy", "yy");

			if (args[i].ignore_char !== undefined) {
				ignore_char = new RegExp(args[i].ignore_char, "g");
			}
			filter_match_mode = args[i].filter_match_mode;

			if (column_number === undefined) {
				alert("You must specify column number");
				return;
			}

			if (column_data_type === undefined) {
				column_data_type = "text";
			} else if (column_data_type === "html") {
				if (html_data_type === undefined) {
					html_data_type = "text";
				}
			}

			if (enable_auto_complete === true) {
				args[i].filter_type = "auto_complete";
			}

			if (filter_default_label === undefined) {
				if (args[i].filter_type === "select") {
					filter_default_label = "Select value";
				} else if (args[i].filter_type === "auto_complete" || args[i].filter_type === "text") {
					filter_default_label = "Type a value";
				} else if (args[i].filter_type === "range_number" || args[i].filter_type === "range_date") {
					filter_default_label = ["from", "to"];
				} else if (args[i].filter_type === "date") {
					filter_default_label = "Select a date";
				}
			}

			if (filter_reset_button_text === undefined) {
				filter_reset_button_text = "x";
			}

			options = [];
			col_filter_array = {};

			if (data === undefined) {
				data = oTable.fnSettings().aoData;
				data_length = data.length;

				for (j = 0; j < data_length; j++) {
					if (column_data_type === "html") {
						if (column_number_data === undefined) {
							col_inner_elements = $(data[j]._aData[column_number]);
						} else {
							col_inner_elements = dot2obj(data[j]._aData, column_number_data);
							col_inner_elements = $(col_inner_elements);
						}
						for (k = 0; k < col_inner_elements.length; k++) {
							switch (html_data_type) {
							case "text":
								col_inner_data = $(col_inner_elements[k]).text();
								break;
							case "value":
								col_inner_data = $(col_inner_elements[k]).val();
								break;
							case "id":
								col_inner_data = col_inner_elements[k].id;
								break;
							}
							if (!(col_filter_array.hasOwnProperty(col_inner_data))) {
								col_filter_array[col_inner_data] = col_inner_data;
								options.push(col_inner_data);
							}
						}
					} else if (column_data_type === "text") {
						if (text_data_delimiter !== undefined) {
							if (column_number_data === undefined) {
								col_inner_elements = data[j]._aData[column_number].split(text_data_delimiter);
							} else {
								col_inner_elements = dot2obj(data[j]._aData, column_number_data);
								col_inner_elements = col_inner_elements.split(text_data_delimiter);
							}
							for (k = 0; k < col_inner_elements.length; k++) {
								col_inner_data = col_inner_elements[k];
								if (!(col_filter_array.hasOwnProperty(col_inner_data))) {
									col_filter_array[col_inner_data] = col_inner_data;
									options.push(col_inner_data);
								}
							}
						} else {
							if (column_number_data === undefined) {
								col_inner_data = data[j]._aData[column_number];
							} else {
								col_inner_data = dot2obj(data[j]._aData, column_number_data);
							}
							if (!(col_filter_array.hasOwnProperty(col_inner_data))) {
								col_filter_array[col_inner_data] = col_inner_data;
								options.push(col_inner_data);
							}
						}
					}
				}

			} else {
				for (ii = 0; ii < data.length; ii++) {
					options.push(data[ii]);
				}
			}

			if (args[i].filter_type === "range_number_slider") {
				min_val = findMinInArray(options, ignore_char);
				max_val = findMaxInArray(options, ignore_char);
			}


			if (filter_container_id === undefined) {
				col_num_visible = column_number;

				for (col_num_visible_iter = 0; col_num_visible_iter < oTable.fnSettings().aoColumns.length && col_num_visible_iter < column_number; col_num_visible_iter++) {
					if (oTable.fnSettings().aoColumns[col_num_visible_iter].bVisible === false) {
						col_num_visible--;
					}
				}
				filter_selector_string = table_selector + " thead th:eq(" + col_num_visible + ")";
				$filter_selector = $(filter_selector_string).find(".yadcf-filter");
			} else {
				if ($("#" + filter_container_id).length === 0) {
					alert("Filter container could not be found.");
					return;
				}
				filter_selector_string = "#" + filter_container_id;
				$filter_selector = $(filter_selector_string).find(".yadcf-filter");
			}

			table_selector_jq_friendly = yadcf.generateTableSelectorJQFriendly(table_selector);

			if (args[i].filter_type === "select" || args[i].filter_type === "auto_complete") {
				if (sort_as === "alpha") {
					if (sort_order === "asc") {
						options.sort();
					} else if (sort_order === "desc") {
						options.sort();
						options.reverse();
					}
				} else if (sort_as === "num") {
					if (sort_order === "asc") {
						options.sort(sortNumAsc);
					} else if (sort_order === "desc") {
						options.sort(sortNumDesc);
					}
				}
			}

			if (args[i].filter_type === "select") {
				options_tmp = "<option value=\"" + "-1" + "\">" + filter_default_label + "</option>";
				for (ii = 0; ii < options.length; ii++) {
					options_tmp += "<option value=\"" + options[ii] + "\">" + options[ii] + "</option>";
				}
				options = options_tmp;
			}

			if ($filter_selector.length === 1) {
				if (args[i].filter_type === "select") {
					$filter_selector.empty();
					$filter_selector.append(options);
					if (oTable.fnSettings().oFeatures.bStateSave === true && oTable.fnSettings().aoPreSearchCols[column_number].sSearch) {
						tmpStr = oTable.fnSettings().aoPreSearchCols[column_number].sSearch;
						tmpStr = yadcfParseMatchFilter(tmpStr, getOptions(oTable.selector)[column_number].filter_match_mode);
						$('#yadcf-filter-' + table_selector_jq_friendly + '-' + column_number).val(tmpStr).addClass("inuse");
					}
					if (args[i].select_type !== undefined && args[i].select_type === 'chosen') {
						$("#yadcf-filter-" + table_selector_jq_friendly + "-" + column_number).trigger("chosen:updated");
					}
				} else if (args[i].filter_type === "auto_complete") {
					$(document).data("yadcf-filter-" + table_selector_jq_friendly + "-" + column_number, options);
				}
			} else {
				if (filter_container_id === undefined) {
					if ($(filter_selector_string + " div.DataTables_sort_wrapper").length > 0) {
						$(filter_selector_string + " div.DataTables_sort_wrapper").css("display", "inline-block");
					}
				} else {
					$("#" + filter_container_id).append("<div id=\"yadcf-filter-wrapper-" + filter_container_id + "\" class=\"yadcf-filter-wrapper\"></div>");
					filter_selector_string = filter_selector_string + " div.yadcf-filter-wrapper";
				}

				if (args[i].filter_type === "select") {

					//add a wrapper to hold both filter and reset button
					$(filter_selector_string).append("<div id=\"yadcf-filter-wrapper-" + table_selector_jq_friendly + "-" + column_number + "\" class=\"yadcf-filter-wrapper\"></div>");
					filter_selector_string = filter_selector_string + " div.yadcf-filter-wrapper";

					$(filter_selector_string).append("<select id=\"yadcf-filter-" + table_selector_jq_friendly + "-" + column_number + "\" class=\"yadcf-filter\" " +
						"onchange=\"yadcf.doFilter(this, '" + table_selector_jq_friendly + "', " + column_number + ", '" + filter_match_mode + "')\" onclick='yadcf.stopPropagation(event);'>" + options + "</select>");
					if (filter_reset_button_text !== false) {
						$(filter_selector_string).find(".yadcf-filter").after("<input value=\"" + filter_reset_button_text + "\" type=\"button\" " +
							"onclick=\"yadcf.stopPropagation(event);yadcf.doFilter('clear', '" + table_selector_jq_friendly + "', " + column_number + "); return false;\" class=\"yadcf-filter-reset-button\">");
					}

					if (oTable.fnSettings().oFeatures.bStateSave === true && oTable.fnSettings().aoPreSearchCols[column_number].sSearch) {
						tmpStr = oTable.fnSettings().aoPreSearchCols[column_number].sSearch;
						tmpStr = yadcfParseMatchFilter(tmpStr, getOptions(oTable.selector)[column_number].filter_match_mode);
						$('#yadcf-filter-' + table_selector_jq_friendly + '-' + column_number).val(tmpStr).addClass("inuse");
					}

					if (args[i].select_type !== undefined && args[i].select_type === 'chosen') {
						$("#yadcf-filter-" + table_selector_jq_friendly + "-" + column_number).chosen(args[i].select_type_options);
						$("#yadcf-filter-" + table_selector_jq_friendly + "-" + column_number).next().attr("onclick", "yadcf.stopPropagation(event);");
					}

				} else if (args[i].filter_type === "auto_complete") {

					//add a wrapper to hold both filter and reset button
					$(filter_selector_string).append("<div id=\"yadcf-filter-wrapper-" + table_selector_jq_friendly + "-" + column_number + "\" class=\"yadcf-filter-wrapper\"></div>");
					filter_selector_string = filter_selector_string + " div.yadcf-filter-wrapper";

					$(filter_selector_string).append("<input id=\"yadcf-filter-" + table_selector_jq_friendly + "-" + column_number + "\" class=\"yadcf-filter\" onclick='yadcf.stopPropagation(event);"
						+ "' placeholder='" + filter_default_label + "'" + " filter_match_mode='" + filter_match_mode + "'" + " onkeyup=\"yadcf.autocompleteKeyUP('" + table_selector_jq_friendly + "',event);\"></input>");
					$(document).data("yadcf-filter-" + table_selector_jq_friendly + "-" + column_number, options);

					if (filter_reset_button_text !== false) {
						$(filter_selector_string).find(".yadcf-filter").after("<input value=\"" + filter_reset_button_text + "\" type=\"button\" " +
							"onclick=\"yadcf.stopPropagation(event);yadcf.doFilterAutocomplete('clear', '" + table_selector_jq_friendly + "', " + column_number + "); return false;\" class=\"yadcf-filter-reset-button\">");
					}

				} else if (args[i].filter_type === "text") {

					//add a wrapper to hold both filter and reset button
					$(filter_selector_string).append("<div id=\"yadcf-filter-wrapper-" + table_selector_jq_friendly + "-" + column_number + "\" class=\"yadcf-filter-wrapper\"></div>");
					filter_selector_string = filter_selector_string + " div.yadcf-filter-wrapper";

					$(filter_selector_string).append("<input type=\"text\" id=\"yadcf-filter-" + table_selector_jq_friendly + "-" + column_number + "\" class=\"yadcf-filter\" onclick='yadcf.stopPropagation(event);"
						+ "' placeholder='" + filter_default_label + "'" + " filter_match_mode='" + filter_match_mode + "'" + " onkeyup=\"yadcf.textKeyUP('" + table_selector_jq_friendly + "',event);\"></input>");

					if (filter_reset_button_text !== false) {
						$(filter_selector_string).find(".yadcf-filter").after("<input value=\"" + filter_reset_button_text + "\" type=\"button\" " + " id=\"yadcf-filter-" + table_selector_jq_friendly + "-" + column_number + "-reset\"" +
							"onclick=\"yadcf.stopPropagation(event);yadcf.textKeyUP('" + table_selector_jq_friendly + "', event, 'clear'); return false;\" class=\"yadcf-filter-reset-button\">");
					}

					if (oTable.fnSettings().oFeatures.bStateSave === true && oTable.fnSettings().aoPreSearchCols[column_number].sSearch) {
						tmpStr = oTable.fnSettings().aoPreSearchCols[column_number].sSearch;
						tmpStr = yadcfParseMatchFilter(tmpStr, getOptions(oTable.selector)[column_number].filter_match_mode);
						$('#yadcf-filter-' + table_selector_jq_friendly + '-' + column_number).val(tmpStr).addClass("inuse");
					}

				} else if (args[i].filter_type === "date") {

					addDateFilter(filter_selector_string, table_selector_jq_friendly, column_number, filter_reset_button_text, filter_default_label, date_format);

				} else if (args[i].filter_type === "range_number") {

					addRangeNumberFilter(filter_selector_string, table_selector_jq_friendly, column_number, filter_reset_button_text, filter_default_label, ignore_char);

				} else if (args[i].filter_type === "range_number_slider") {

					addRangeNumberSliderFilter(filter_selector_string, table_selector_jq_friendly, column_number, filter_reset_button_text, min_val, max_val, ignore_char);

				} else if (args[i].filter_type === "range_date") {

					addRangeDateFilter(filter_selector_string, table_selector_jq_friendly, column_number, filter_reset_button_text, filter_default_label, date_format);

				}
			}

			if ($(document).data("#yadcf-filter-" + table_selector_jq_friendly + "-" + column_number + "_val") !== undefined && $(document).data("#yadcf-filter-" + table_selector_jq_friendly + "-" + column_number + "_val") !== "-1") {
				$(filter_selector_string).find(".yadcf-filter").val($(document).data("#yadcf-filter-" + table_selector_jq_friendly + "-" + column_number + "_val"));
			}
			if (args[i].filter_type === "auto_complete") {
				$("#yadcf-filter-" + table_selector_jq_friendly + "-" + column_number).autocomplete({
				    source: $(document).data("yadcf-filter-" + table_selector_jq_friendly + "-" + column_number),
					select: autocompleteSelect
				});
				if (oTable.fnSettings().oFeatures.bStateSave === true && oTable.fnSettings().aoPreSearchCols[column_number].sSearch) {
					tmpStr = oTable.fnSettings().aoPreSearchCols[column_number].sSearch;
					tmpStr = yadcfParseMatchFilter(tmpStr, getOptions(oTable.selector)[column_number].filter_match_mode);
					$('#yadcf-filter-' + table_selector_jq_friendly + '-' + column_number).val(tmpStr).addClass("inuse");
				}
			}
		}
		if (exFilterColumnQueue.length > 0) {
			(exFilterColumnQueue.shift())();
		}
	}

	function endsWith(str, suffix) {
		return str.indexOf(suffix, str.length - suffix.length) !== -1;
	}

	function rangeClear(table_selector_jq_friendly, event) {
		$.fn.dataTableExt.iApiIndex = oTablesIndex[table_selector_jq_friendly];
		var oTable = oTables[table_selector_jq_friendly],
			yadcfState,
			column_number;

		$(event.target).parent().find(".yadcf-filter-range").val("");
		if ($(event.target).parent().find(".yadcf-filter-range-number").length > 0) {
			$($(event.target).parent().find(".yadcf-filter-range")[0]).focus();
		}

		oTable.fnDraw();
		if (!oTable.fnSettings().oLoadedState) {
			oTable.fnSettings().oLoadedState = {};
			oTable.fnSettings().oApi._fnSaveState(oTable.fnSettings());
		}
		if (oTable.fnSettings().oFeatures.bStateSave === true) {
			column_number = parseInt($(event.target).parent().attr("id").replace('yadcf-filter-wrapper-' + table_selector_jq_friendly + '-', ''), 10);
			if (oTable.fnSettings().oLoadedState.yadcfState !== undefined && oTable.fnSettings().oLoadedState.yadcfState[table_selector_jq_friendly] !== undefined) {
				oTable.fnSettings().oLoadedState.yadcfState[table_selector_jq_friendly][column_number] =
					{
						'from' : "",
						'to' : ""
					};
			} else {
				yadcfState = {};
				yadcfState[table_selector_jq_friendly] = [];
				yadcfState[table_selector_jq_friendly][column_number] = {
					'from' : "",
					'to' : ""
				};
				oTable.fnSettings().oLoadedState.yadcfState = yadcfState;
			}
			oTable.fnSettings().oApi._fnSaveState(oTable.fnSettings());
		}
		resetIApiIndex();

		$(event.target).parent().find(".yadcf-filter-range").removeClass("inuse");

		return;
	}

	function rangeNumberSliderClear(table_selector_jq_friendly, event) {
		$.fn.dataTableExt.iApiIndex = oTablesIndex[table_selector_jq_friendly];
		var oTable = oTables[table_selector_jq_friendly],
			min_val,
			max_val;

		min_val = +$($(event.target).parent().find(".yadcf-filter-range-number-slider-min-tip-hidden")).text();
		max_val = +$($(event.target).parent().find(".yadcf-filter-range-number-slider-max-tip-hidden")).text();

		$("#" + $(event.target).prev().find(".yadcf-filter-range-number-slider").attr("id")).slider("option", "values", [min_val, max_val]);

		$($(event.target).prev().find(".ui-slider-handle")[0]).attr("tabindex", -1).focus();

		oTable.fnDraw();
		resetIApiIndex();

		return;
	}

	function dateKeyUP(table_selector_jq_friendly, date_format, event) {
		var oTable,
			date,
			dateId,
			column_number;

		dateId = event.target.id;
		date = document.getElementById(dateId).value;
		try {
			if (date.length === (date_format.length + 2)) {
				date = (date !== "") ? $.datepicker.parseDate(date_format, date) : date;
			}
		} catch (err1) {}

		if (((date instanceof Date) || date === "")) {

			$.fn.dataTableExt.iApiIndex = oTablesIndex[table_selector_jq_friendly];
			oTable = oTables[table_selector_jq_friendly];
			column_number = parseInt(dateId.replace("yadcf-filter-" + table_selector_jq_friendly + "-", ""), 10);

			if (date instanceof Date) {
				$("#" + dateId).addClass('inuse');
				oTable.fnFilter(document.getElementById(dateId).value, column_number);
			} else {
				$("#" + dateId).removeClass('inuse');
			}
			if ($.trim(event.target.value) === '' && $(event.target).hasClass('inuse')) {
				$('#' + event.target.id).removeClass('inuse');
				oTable.fnFilter('', column_number);
			}
			resetIApiIndex();
		} else if ($(event.target).hasClass('inuse')) {

			$.fn.dataTableExt.iApiIndex = oTablesIndex[table_selector_jq_friendly];
			oTable = oTables[table_selector_jq_friendly];
			column_number = parseInt(dateId.replace("yadcf-filter-" + table_selector_jq_friendly + "-", ""), 10);

			$("#" + dateId).removeClass('inuse');

			oTable.fnFilter('', column_number);
			resetIApiIndex();
		}
	}

	function rangeDateKeyUP(table_selector_jq_friendly, date_format, event) {
		$.fn.dataTableExt.iApiIndex = oTablesIndex[table_selector_jq_friendly];
		var oTable = oTables[table_selector_jq_friendly],
			min,
			max,
			fromId,
			toId;

		if (event.target.id.indexOf("-from-") !== -1) {
			fromId = event.target.id;
			toId = event.target.id.replace("-from-", "-to-");

			min = document.getElementById(fromId).value;
			max = document.getElementById(toId).value;
		} else {
			toId = event.target.id;
			fromId = event.target.id.replace("-to-", "-from-");

			max =   document.getElementById(toId).value;
			min = document.getElementById(fromId).value;
		}

		try {
			if (min.length === (date_format.length + 2)) {
				min = (min !== "") ? $.datepicker.parseDate(date_format, min) : min;
			}
		} catch (err1) {}
		try {
			if (max.length === (date_format.length + 2)) {
				max = (max !== "") ? $.datepicker.parseDate(date_format, max) : max;
			}
		} catch (err2) {}

		if (((max instanceof Date) && (min instanceof Date) && (max >= min)) || min === "" || max === "") {

			oTable.fnDraw();

			if (min instanceof Date) {
				$("#" + fromId).addClass("inuse");
			} else {
				$("#" + fromId).removeClass("inuse");
			}
			if (max instanceof Date) {
				$("#" + toId).addClass("inuse");
			} else {
				$("#" + toId).removeClass("inuse");
			}

			if ($.trim(event.target.value) === "" && $(event.target).hasClass("inuse")) {
				$("#" + event.target.id).removeClass("inuse");
			}

		}
		resetIApiIndex();
	}

	function rangeNumberKeyUP(table_selector_jq_friendly, event) {
		$.fn.dataTableExt.iApiIndex = oTablesIndex[table_selector_jq_friendly];
		var oTable = oTables[table_selector_jq_friendly],
			min,
			max,
			fromId,
			toId,
			yadcfState,
			column_number;

		if (event.target.id.indexOf("-from-") !== -1) {
			fromId = event.target.id;
			toId = event.target.id.replace("-from-", "-to-");

			min = document.getElementById(fromId).value;
			max = document.getElementById(toId).value;
		} else {
			toId = event.target.id;
			fromId = event.target.id.replace("-to-", "-from-");

			max =   document.getElementById(toId).value;
			min = document.getElementById(fromId).value;
		}

		min = (min !== "") ? (+min) : min;
		max = (max !== "") ? (+max) : max;

		if ((!isNaN(max) && !isNaN(min) && (max >= min)) || min === "" || max === "") {
			oTable.fnDraw();
			if (document.getElementById(fromId).value !== "") {
				$("#" + fromId).addClass("inuse");
			}
			if (document.getElementById(toId).value !== "") {
				$("#" + toId).addClass("inuse");
			}

			if ($.trim(event.target.value) === "" && $(event.target).hasClass("inuse")) {
				$("#" + event.target.id).removeClass("inuse");
			}
			if (!oTable.fnSettings().oLoadedState) {
				oTable.fnSettings().oLoadedState = {};
				oTable.fnSettings().oApi._fnSaveState(oTable.fnSettings());
			}
			if (oTable.fnSettings().oFeatures.bStateSave === true) {
				column_number = parseInt($(event.target).attr("id").replace('-from-', '').replace('-to-', '').replace('yadcf-filter-' + table_selector_jq_friendly, ''), 10);
				if (oTable.fnSettings().oLoadedState.yadcfState !== undefined && oTable.fnSettings().oLoadedState.yadcfState[table_selector_jq_friendly] !== undefined) {
					oTable.fnSettings().oLoadedState.yadcfState[table_selector_jq_friendly][column_number] =
						{
							'from' : min,
							'to' : max
						};
				} else {
					yadcfState = {};
					yadcfState[table_selector_jq_friendly] = [];
					yadcfState[table_selector_jq_friendly][column_number] = {
						'from' : min,
						'to' : max
					};
					oTable.fnSettings().oLoadedState.yadcfState = yadcfState;
				}
				oTable.fnSettings().oApi._fnSaveState(oTable.fnSettings());
			}
		}
		resetIApiIndex();
	}

	function textKeyUP(table_selector_jq_friendly, event, clear) {
		$.fn.dataTableExt.iApiIndex = oTablesIndex[table_selector_jq_friendly];
		var oTable = oTables[table_selector_jq_friendly],
			column_number = parseInt($(event.target).attr("id").replace("yadcf-filter-" + table_selector_jq_friendly + "-", "").replace('-reset', ''), 10),
			options = getOptions(oTable.selector)[column_number];

		if (clear !== undefined || event.target.value === '') {
			$("#yadcf-filter-" + table_selector_jq_friendly + "-" + column_number).val("").focus();
			$("#yadcf-filter-" + table_selector_jq_friendly + "-" + column_number).removeClass("inuse");
			oTable.fnFilter("", column_number);
			resetIApiIndex();
			return;
		}

		$("#yadcf-filter-" + table_selector_jq_friendly + "-" + column_number).addClass("inuse");

		yadcfMatchFilter(oTable, event.target.value, options.filter_match_mode, column_number);

		resetIApiIndex();
	}

	function autocompleteKeyUP(table_selector_jq_friendly, event) {
		if (event.target.value === "" && event.keyCode === 8 && $(event.target).hasClass("inuse")) {
			$.fn.dataTableExt.iApiIndex = oTablesIndex[table_selector_jq_friendly];
			var oTable = oTables[table_selector_jq_friendly],
				column_number = parseInt($(event.target).attr("id").replace("yadcf-filter-" + table_selector_jq_friendly + "-", ""), 10);

			$("#yadcf-filter-" + table_selector_jq_friendly + "-" + column_number).removeClass("inuse");
			$(document).removeData("#yadcf-filter-" + table_selector_jq_friendly + "-" + column_number + "_val");
			oTable.fnFilter("", column_number);
			resetIApiIndex();
		}
	}

	//taken and modified from DataTables 1.10.0-beta.2 source 
	function yadcfVersionCheck(version) {
		var aThis = $.fn.dataTable.ext.sVersion.split('.'),
			aThat = version.split('.'),
			iThis,
			iThat,
			i,
			iLen;

		for (i = 0, iLen = aThat.length; i < iLen; i++) {
			iThis = parseInt(aThis[i], 10) || 0;
			iThat = parseInt(aThat[i], 10) || 0;

			// Parts are the same, keep comparing
			if (iThis === iThat) {
				continue;
			}

			// Parts are different, return immediately
			return iThis > iThat;
		}

		return true;
	}

	function initAndBindTable(oTable, table_selector, index) {

		var table_selector_jq_friendly = yadcf.generateTableSelectorJQFriendly(table_selector),
			table_selector_tmp;
        oTables[table_selector_jq_friendly] = oTable;
		oTablesIndex[table_selector_jq_friendly] = index;

        if (oTable.fnSettings().sAjaxSource === null) {
			table_selector_tmp = table_selector;
			if (table_selector.indexOf(":eq") !== -1) {
				table_selector_tmp = table_selector.substring(0, table_selector.lastIndexOf(":eq"));
			}
			appendFilters(oTable, yadcf.getOptions(table_selector_tmp), table_selector);
        } else {
			appendFilters(oTable, yadcf.getOptions(table_selector), table_selector);
			if (yadcfVersionCheck('1.10')) {
				$(document).on("draw.dt", oTable.selector, function (event, ui) {
					appendFilters(oTable, yadcf.getOptions(ui.oInstance.selector), ui.oInstance.selector);
				});
			} else {
				$(document).on("draw", oTable.selector, function (event, ui) {
					appendFilters(oTable, yadcf.getOptions(ui.oInstance.selector), ui.oInstance.selector);
				});
			}
        }
		if (oTable.fnSettings().oFeatures.bStateSave === true) {
			if (yadcfVersionCheck('1.10')) {
				$(oTable.selector).on('stateSaveParams.dt', function (e, settings, data) {
					if (settings.oLoadedState && settings.oLoadedState.yadcfState !== undefined) {
						data.yadcfState = settings.oLoadedState.yadcfState;
					} else {
						data.naruto = 'kurama';
					}
				});
			} else {
				$(oTable.selector).on('stateSaveParams', function (e, settings, data) {
					if (settings.oLoadedState && settings.oLoadedState.yadcfState !== undefined) {
						data.yadcfState = settings.oLoadedState.yadcfState;
					} else {
						data.naruto = 'kurama';
					}
				});
			}
			//when using DOM source
			if (oTable.fnSettings().sAjaxSource === null) {
				//we need to make sure that the yadcf state will be saved after page reload
				oTable.fnSettings().oApi._fnSaveState(oTable.fnSettings());
				//redraw the table in order to apply the filters
				oTable.fnDraw();
			}
		}
	}

    $.fn.yadcf = function (options_arg) {

		if ($(this.selector).length === 1) {
			options[this.selector] = options_arg;
			initAndBindTable(this, this.selector, 0);
		} else {
			var i = 0,
				selector;
			for (i; i < $(this.selector).length; i++) {
				$.fn.dataTableExt.iApiIndex = i;
				selector = this.selector + ":eq(" + i + ")";
				options[this.selector] = options_arg;
				initAndBindTable(this, selector, i);
			}
			$.fn.dataTableExt.iApiIndex = 0;
		}
        return this;
    };

    function stopPropagation(evt) {
		if (evt.stopPropagation !== undefined) {
			evt.stopPropagation();
		} else {
			evt.cancelBubble = true;
		}
	}

	//--------------------------------------------------------
	function exInternalFilterColumnAJAXQueue(table_arg, column_number, filter_value) {
		return function () {
			var table_selector_jq_friendly = yadcf.generateTableSelectorJQFriendly(table_arg.selector);
			$("#yadcf-filter-" + table_selector_jq_friendly + "-" + column_number).val(filter_value);
			$("#yadcf-filter-" + table_selector_jq_friendly + "-" + column_number).change();
		};
	}

	function exFilterColumn(table_arg, column_number, filter_value) {
		var table_selector_jq_friendly,
			i;

		if (table_arg.fnSettings().sAjaxSource === null) {
			for (i = 0; i < yadcf.getOptions(table_arg.selector).length; i++) {
				if (yadcf.getOptions(table_arg.selector)[i].column_number === column_number) {
					if (yadcf.getOptions(table_arg.selector)[i].filter_type === "select") {
						table_selector_jq_friendly = yadcf.generateTableSelectorJQFriendly(table_arg.selector);
						$("#yadcf-filter-" + table_selector_jq_friendly + "-" + column_number).val(filter_value);
						$("#yadcf-filter-" + table_selector_jq_friendly + "-" + column_number).change();
					}
					break;
				}
			}
        } else {
			for (i = 0; i < yadcf.getOptions(table_arg.selector).length; i++) {
				if (yadcf.getOptions(table_arg.selector)[i].column_number === column_number) {
					if (yadcf.getOptions(table_arg.selector)[i].filter_type === "select" || yadcf.getOptions(table_arg.selector)[i].filter_type === undefined) {
						exFilterColumnQueue.push(exInternalFilterColumnAJAXQueue(table_arg, column_number, filter_value));
					}
					break;
				}
			}
        }
	}

    return {
		doFilter : doFilter,
		doFilterAutocomplete : doFilterAutocomplete,
		autocompleteKeyUP : autocompleteKeyUP,
		getOptions : getOptions,
		rangeNumberKeyUP : rangeNumberKeyUP,
		rangeDateKeyUP : rangeDateKeyUP,
		rangeClear : rangeClear,
		rangeNumberSliderClear : rangeNumberSliderClear,
		stopPropagation : stopPropagation,
		generateTableSelectorJQFriendly : generateTableSelectorJQFriendly,
		exFilterColumn : exFilterColumn,
		dateKeyUP : dateKeyUP,
		dateSelectSingle : dateSelectSingle,
		textKeyUP : textKeyUP
    };

}(jQuery));
