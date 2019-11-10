/*global $, jQuery, exFilterColumn*/
/*jslint plusplus: true, nomen: true */
/*!
* Yet Another DataTables Column Filter - (yadcf)
* 
* File:        jquery.dataTables.yadcf.js
* Version:     0.8.3
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
				Possible values:	select / multi_select / auto_complete / text / date / range_number / range_number_slider / range_date / custom_func
				Description:		The type of the filter to be used in the column

* custom_func				
				Required:			true (when filter_type is custom_func)
				Type:				function
				Default value:		undefined
				Description:		should be pointing to a function with the following signature myCustomFilterFunction(filterVal, columnVal) , where filterVal is the value from the select box and
									columnVal is the value from the relevant row column, this function should return true if teh row matches your condition and the row should be displayed) and false otherwise
	
* data
				Required:			false / true (when filter_type is custom_func)
				Type:				Array (of string or objects)
				Description:		When the need of predefined data for filter is needed just use an array of strings ["value1","value2"....] (supported in select / multi_select / auto_complete filters) or
									array of objects [{value: 'Some Data 1', label: 'One'}, {value: 'Some Data 3', label: 'Three'}] (supported in select / multi_select filters)
				Note:				that when filter_type is custom_func this array will populate the custom filter select element
					
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
				Possible values:	chosen / select2
				Description:		Turns the simple select element into "Chosen/Select2 select" (make use of the Chosen/Select2 jQuery plugin)
				
				
* select_type_options
				Required:			false
				Type:				Object
				Default value:		{}
				Description:		This parameter will be passed "as is" to the Chosen/Select2 plugin constructor
				
				
* case_insensitive
				Required:			false
				Type:				boolean
				Default value:		true
				Description:		Do case-insensitive filtering (supported in select / auto_complete / text filters)


* filter_delay
				Required:			false
				Type:				integer
				Default value:		undefined
				Description:		Delay filter execution for a XXX milliseconds - filter will fire XXX milliseconds after the last keyup.
				Special Notes:		Currently supported in text / range_number / range_date filters / range_number_slider

*				
*				
*				
* External API functions:
*
*					
* -------------				

* exFilterColumn
				Description:		Allows to trigger filter/s externally/programmatically (support ALL filter types!!!) , perfect for showing table with pre filtered columns
				Arguments:			table_arg: (variable of the datatable), 
									array of pairs: column number String/Object with from and to, filter_value (the actual string value that we want to filter by)
				Usage Example:		yadcf.exFilterColumn(oTable, [[0, 'Some Data 2']]); //pre filter one column
									yadcf.exFilterColumn(oTable, [[0, 'Some Data 1'], [1, {from: 111, to: 1110}], [2, {from: "", to: "11/25/2014"}]]); //pre filter several columns

* exGetColumnFilterVal									
				Description:		Allows to retreive  column current filtered value (support ALL filter types!!!)
				Arguments:			table_arg: (variable of the datatable), 
									column number:  column number from which we want the value
				Usage Example:		yadcf.exGetColumnFilterVal(oTable,1);
				Return value:		String (for simple filter) / Object (for range filter) with from and to properties / Array of strings for multi_select filter

*
*				
*				
* Server-side processing API (see more on showcase):
* 
* From server to client:
* In order to populate the filters with data from server (select / auto_complete / range_number_slider (min and max values), you should add to your current json respond the following properties: 
* lets say for first column you add yadcf_data_0 filled with array of values, for column second column yadcf_data_1 and so on...
* 
* From client to server:
* Read the filtered value like this (for first column) req.getParameter("columns[0][search][value]"); <- java code , php/.Net/etc you just need to get it from the request
* Range filter value will arrive delimited by  -yadcf_delim- , so just split it into an array or something like this: String[] minMax = sSearch_0.split("-yadcf_delim-");
*
*					
* -------------
*
*/
var yadcf = (function ($) {

	'use strict';

	var oTables = {},
		oTablesIndex = {},
		options = {},
		exFilterColumnQueue = [],
		yadcfDelay;

	function getOptions(selector) {
		return options[selector];
	}

	function setOptions(selector_arg, options_arg) {
		var tmpOptions = {},
			i,
			j,
			col_num_as_int,
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
			adaptContainerCssClassImpl = function (dummy) { return ''; };

		for (i = 0; i < options_arg.length; i++) {
			if (options_arg[i].select_type === 'select2') {
				default_options.select_type_options = {adaptContainerCssClass: adaptContainerCssClassImpl};
			}
			//validate custom function required attributes
			if (options_arg[i].filter_type === 'custom_func') {
				if (options_arg[i].custom_func === undefined) {
					alert('You are trying to use filter_type: "custom_func" for column ' + options_arg[i].column_number + ' but there is no such custom_func attribute provided (custom_func: \"function reference goes here...\")');
					return;
				}
				if (options_arg[i].data === undefined) {
					alert('You are trying to use filter_type: "custom_func" for column ' + options_arg[i].column_number + ' but there is no such data attribute provided (data: \"array of options goes here...\")');
					return;
				}
			}
			col_num_as_int = +options_arg[i].column_number;
			tmpOptions[col_num_as_int] = $.extend(true, {}, default_options, options_arg[i]);
		}
		options[selector_arg] = tmpOptions;
	}

	function resetIApiIndex() {
		$.fn.dataTableExt.iApiIndex = 0;

	}

	function generateTableSelectorJQFriendly(tmpStr) {
		return tmpStr.replace(":", "-").replace("(", "").replace(")", "").replace(".", "-").replace("#", "-");
	}

	yadcfDelay = (function () {
		var timer = 0;
		return function (callback, ms, param) {
			clearTimeout(timer);
			timer = setTimeout(function () {
				callback(param);
			}, ms);
			return timer;
		};
	}());

	//Used by exFilterColumn for translating readable search value into proper search string for datatables filtering
	function yadcfMatchFilterString(table_arg, column_number, selected_value, filter_match_mode, multiple) {
		var case_insensitive = yadcf.getOptions(table_arg.selector)[column_number].case_insensitive,
			ret_val;

		table_arg.fnSettings().aoPreSearchCols[column_number].bSmart = false;
		table_arg.fnSettings().aoPreSearchCols[column_number].bCaseInsensitive = case_insensitive;

		if (multiple === undefined || multiple === false) {
			if (filter_match_mode === "contains") {
				table_arg.fnSettings().aoPreSearchCols[column_number].bRegex = false;
				ret_val = selected_value;
			} else if (filter_match_mode === "exact") {
				table_arg.fnSettings().aoPreSearchCols[column_number].bRegex = true;
				ret_val = "^" + selected_value + "$";
			} else if (filter_match_mode === "startsWith") {
				table_arg.fnSettings().aoPreSearchCols[column_number].bRegex = true;
				ret_val = "^" + selected_value;
			}
		} else {
			if (filter_match_mode === "contains") {
				table_arg.fnSettings().aoPreSearchCols[column_number].bRegex = true;
				ret_val = selected_value.join("|");
			} else if (filter_match_mode === "exact") {
				table_arg.fnSettings().aoPreSearchCols[column_number].bRegex = true;
				ret_val = "^(" + selected_value.join("|") + ")$";
			} else if (filter_match_mode === "startsWith") {
				table_arg.fnSettings().aoPreSearchCols[column_number].bRegex = true;
				ret_val = "^(" + selected_value.join("|") + ")";
			}
		}
		return ret_val;
	}

	function yadcfMatchFilter(oTable, selected_value, filter_match_mode, column_number) {
		var case_insensitive = yadcf.getOptions(oTable.selector)[column_number].case_insensitive;
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

	function doFilterCustomDateFunc(arg, table_selector_jq_friendly, column_number) {
		var oTable = oTables[table_selector_jq_friendly];
		if (arg === "clear" || arg.value === "-1") {
			if (arg === "clear") {
				$("#yadcf-filter-" + table_selector_jq_friendly + "-" + column_number).val("-1").focus();
			}
			$("#yadcf-filter-" + table_selector_jq_friendly + "-" + column_number).removeClass("inuse");
		} else {
			$("#yadcf-filter-" + table_selector_jq_friendly + "-" + column_number).addClass("inuse");
		}

		oTable.fnDraw();
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
			if (yadcf.getOptions(oTable.selector)[column_number].select_type === 'chosen') {
				$("#yadcf-filter-" + table_selector_jq_friendly + "-" + column_number).trigger("chosen:updated");
			}
			return;
		}

		$("#yadcf-filter-" + table_selector_jq_friendly + "-" + column_number).addClass("inuse");

		$(document).data("#yadcf-filter-" + table_selector_jq_friendly + "-" + column_number + "_val", arg.value);

		selected_value = $.trim($(arg).find('option:selected').val());

		if (arg.value !== "-1") {
			yadcfMatchFilter(oTable, selected_value, filter_match_mode, column_number);
		} else {
			oTable.fnFilter("", column_number);
			$("#yadcf-filter-" + table_selector_jq_friendly + "-" + column_number).removeClass("inuse");
		}
		resetIApiIndex();
	}

	function doFilterMultiSelect(arg, table_selector_jq_friendly, column_number, filter_match_mode) {
		$.fn.dataTableExt.iApiIndex = oTablesIndex[table_selector_jq_friendly];
		var oTable = oTables[table_selector_jq_friendly],
			aEscapedTerms = [],
			selected_values = $(arg).val(),
			i,
			stringForSearch;

		$(document).data("#yadcf-filter-" + table_selector_jq_friendly + "-" + column_number + "_val", selected_values);

		if (selected_values !== null) {
			for (i = selected_values.length - 1; i >= 0; i--) {
				if (selected_values[i] === "-1") {
					selected_values.splice(i, 1);
					break;
				}
			}
			if (selected_values.length !== 0) {
				stringForSearch = selected_values.join("|");
				stringForSearch = stringForSearch.replace(/([.*+?^=!:${}()\[\]\/\\])/g, "\\$1");
				if (filter_match_mode === "contains") {
					oTable.fnFilter(stringForSearch, column_number, true, false, true);
				} else if (filter_match_mode === "exact") {
					oTable.fnFilter("^(" + stringForSearch + ")$", column_number, true, false, true);
				} else if (filter_match_mode === "startsWith") {
					oTable.fnFilter("^(" + stringForSearch + ")", column_number, true, false, true);
				}
			} else {
				oTable.fnFilter("", column_number);
			}
		} else {
			oTable.fnFilter("", column_number);
		}
		resetIApiIndex();
	}

	function yadcfParseMatchFilterMultiSelect(tmpStr, filter_match_mode) {
		var retVal;
		if (filter_match_mode === "contains") {
			retVal = tmpStr;
		} else if (filter_match_mode === "exact") {
			retVal = tmpStr.substring(1, tmpStr.length - 1);
			retVal = retVal.substring(1, retVal.length - 1);
		} else if (filter_match_mode === "startsWith") {
			retVal = tmpStr.substring(1, tmpStr.length);
			retVal = retVal.substring(1, retVal.length - 1);
		}
		return retVal;
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

	function addCustomFunctionFilterCapability(table_selector_jq_friendly, filterId, col_num) {

		$.fn.dataTableExt.afnFiltering.push(
			function (oSettings, aData, iDataIndex) {
				var filterVal = document.getElementById(filterId) !== null ? document.getElementById(filterId).value : "",
					columnVal = aData[col_num] === "-" ? 0 : aData[col_num],
					retVal = false,
					table_selector_jq_friendly_local = table_selector_jq_friendly,
					current_table_selector_jq_friendly = yadcf.generateTableSelectorJQFriendly(oSettings.oInstance.selector),
					custom_func;

				if (table_selector_jq_friendly_local !== current_table_selector_jq_friendly) {
					return true;
				}

				custom_func = yadcf.getOptions(oSettings.oInstance.selector)[col_num].custom_func;

				retVal = custom_func(filterVal, columnVal);

				return retVal;
			}
		);
	}
	function addRangeDateFilterCapability(table_selector_jq_friendly, fromId, toId, col_num, date_format) {

		$.fn.dataTableExt.afnFiltering.push(
			function (oSettings, aData, iDataIndex) {
				var min = document.getElementById(fromId) !== null ? document.getElementById(fromId).value : "",
					max = document.getElementById(toId) !== null ? document.getElementById(toId).value : "",
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
					i,
					columnObjKey;

				if (table_selector_jq_friendly_local !== current_table_selector_jq_friendly) {
					return true;
				}

				if (!isFinite(min) || !isFinite(max)) {
					return true;
				}

				column_data_type = yadcf.getOptions(oSettings.oInstance.selector)[col_num].column_data_type;
				html_data_type = yadcf.getOptions(oSettings.oInstance.selector)[col_num].html_data_type;

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

		if (oTable.fnSettings().oFeatures.bServerSide !== true) {
			addRangeNumberFilterCapability(table_selector_jq_friendly, fromId, toId, column_number, ignore_char);
		}

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
			to,
			min,
			max,
			min_server,
			max_server,
			date_format;

		column_number = column_number.substring(dashIndex + 1);
		$.fn.dataTableExt.iApiIndex = oTablesIndex[table_selector_jq_friendly];

		oTable = oTables[table_selector_jq_friendly];
		date_format = yadcf.getOptions(oTable.selector)[column_number].date_format;
		date_format = date_format.replace("yyyy", "yy");

		$("#" + $(event).attr("id")).addClass("inuse");

		if ($(event).attr("id").indexOf("-from-") !== -1) {
			from = document.getElementById($(event).attr("id")).value;
			to = document.getElementById($(event).attr("id").replace("-from-", "-to-")).value;
		} else {
			to = document.getElementById($(event).attr("id")).value;
			from = document.getElementById($(event).attr("id").replace("-to-", "-from-")).value;
		}

		if (oTable.fnSettings().oFeatures.bServerSide !== true) {
			oTable.fnDraw();
		} else {
			min = from;
			max = to;

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
			if (min instanceof Date) {
				min_server = min.getTime();
			} else {
				min_server = min;
			}
			if (max instanceof Date) {
				max_server = max.getTime();
			} else {
				max_server = max;
			}
			oTable.fnFilter(min_server + '-yadcf_delim-' + max_server, column_number);
		}

		if (!oTable.fnSettings().oLoadedState) {
			oTable.fnSettings().oLoadedState = {};
			oTable.fnSettings().oApi._fnSaveState(oTable.fnSettings());
		}
		if (oTable.fnSettings().oFeatures.bStateSave === true) {
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

		$.fn.dataTableExt.iApiIndex = oTablesIndex[table_selector_jq_friendly];
		oTable = oTables[table_selector_jq_friendly];
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

		if (oTable.fnSettings().oFeatures.bServerSide !== true) {
			addRangeDateFilterCapability(table_selector_jq_friendly, fromId, toId, column_number, date_format);
		}

		resetIApiIndex();
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

		if (oTable.fnSettings().aoPreSearchCols[column_number].sSearch !== '') {
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
			column_number = $(event.target).attr('id').replace("yadcf-filter-", "").replace(table_selector_jq_friendly, "").replace("-slider-", ""),
			options,
			keyUp;

		oTable = oTables[table_selector_jq_friendly];
		options = getOptions(oTable.selector)[column_number];

		keyUp = function () {

			$.fn.dataTableExt.iApiIndex = oTablesIndex[table_selector_jq_friendly];

			if (oTable.fnSettings().oFeatures.bServerSide !== true) {
				oTable.fnDraw();
			} else {
				oTable.fnFilter(ui.values[0] + '-yadcf_delim-' + ui.values[1], column_number);
			}

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
		};

		if (options.filter_delay === undefined) {
			keyUp();
		} else {
			yadcfDelay(function () {
				keyUp();
			}, options.filter_delay);
		}
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
				$(filter_selector_string).empty();
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

		if (oTable.fnSettings().oFeatures.bServerSide !== true) {
			addRangeNumberSliderFilterCapability(table_selector_jq_friendly, min_tip_id, max_tip_id, column_number, ignore_char);
		}
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
			table_selector_jq_friendly,
			min_val,
			max_val,
			col_num_visible,
			col_num_visible_iter,
			tmpStr,
			columnObjKey,
			columnObj;


		for (columnObjKey in args) {
			if (args.hasOwnProperty(columnObjKey)) {
				columnObj = args[columnObjKey];

				data = columnObj.data;
				filter_container_id = columnObj.filter_container_id;
				column_number = columnObj.column_number;
				column_number = +column_number;
				column_number_data = undefined;
				if (isNaN(oTable.fnSettings().aoColumns[column_number].mData) && typeof oTable.fnSettings().aoColumns[column_number].mData !== 'object') {
					column_number_data = oTable.fnSettings().aoColumns[column_number].mData;
				}
				column_data_type = columnObj.column_data_type;
				html_data_type = columnObj.html_data_type;
				text_data_delimiter = columnObj.text_data_delimiter;
				filter_default_label = columnObj.filter_default_label;
				filter_reset_button_text = columnObj.filter_reset_button_text;
				enable_auto_complete = columnObj.enable_auto_complete;
				sort_as = columnObj.sort_as;
				sort_order = columnObj.sort_order;
				date_format = columnObj.date_format;
				//for jquery datepicker
				date_format = date_format.replace("yyyy", "yy");

				if (columnObj.ignore_char !== undefined) {
					ignore_char = new RegExp(columnObj.ignore_char, "g");
				}
				filter_match_mode = columnObj.filter_match_mode;

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
					columnObj.filter_type = "auto_complete";
				}

				if (filter_default_label === undefined) {
					if (columnObj.filter_type === "select" || columnObj.filter_type === 'custom_func') {
						filter_default_label = "Select value";
					} else if (columnObj.filter_type === "multi_select") {
						filter_default_label = "Select values";
					} else if (columnObj.filter_type === "auto_complete" || columnObj.filter_type === "text") {
						filter_default_label = "Type a value";
					} else if (columnObj.filter_type === "range_number" || columnObj.filter_type === "range_date") {
						filter_default_label = ["from", "to"];
					} else if (columnObj.filter_type === "date") {
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

				if (columnObj.filter_type === "range_number_slider") {
					min_val = findMinInArray(options, ignore_char);
					max_val = findMaxInArray(options, ignore_char);
				}


				if (filter_container_id === undefined) {
					//Can't show filter inside a column for a hidden one (place it outside using filter_container_id) 
					if (oTable.fnSettings().aoColumns[column_number].bVisible === false) {
						//console.log('Yadcf warning: Can\'t show filter inside a column N#' + column_number + ' for a hidden one (place it outside using filter_container_id)');
						continue;
					}
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

				if (columnObj.filter_type === "select" || columnObj.filter_type === "auto_complete" || columnObj.filter_type === "multi_select" || columnObj.filter_type === "custom_func") {
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

				if (columnObj.filter_type === "select" || columnObj.filter_type === 'custom_func') {
					options_tmp = "<option value=\"" + "-1" + "\">" + filter_default_label + "</option>";
					if (typeof options[0] === 'object') {
						for (ii = 0; ii < options.length; ii++) {
							options_tmp += "<option value=\"" + options[ii].value + "\">" + options[ii].label + "</option>";
						}
					} else {
						for (ii = 0; ii < options.length; ii++) {
							options_tmp += "<option value=\"" + options[ii] + "\">" + options[ii] + "</option>";
						}
					}
					options = options_tmp;

				} else if (columnObj.filter_type === "multi_select") {
					if (columnObj.select_type === undefined) {
						options_tmp = "<option data-placeholder=\"true\" value=\"" + "-1" + "\">" + filter_default_label + "</option>";
					} else {
						options_tmp = "";
					}
					if (typeof options[0] === 'object') {
						for (ii = 0; ii < options.length; ii++) {
							options_tmp += "<option value=\"" + options[ii].value + "\">" + options[ii].label + "</option>";
						}
					} else {
						for (ii = 0; ii < options.length; ii++) {
							options_tmp += "<option value=\"" + options[ii] + "\">" + options[ii] + "</option>";
						}
					}
					options = options_tmp;
				}

				if ($filter_selector.length === 1) {
					if (columnObj.filter_type === "select" || columnObj.filter_type === "multi_select") {

						$filter_selector.empty();
						$filter_selector.append(options);
						if (oTable.fnSettings().aoPreSearchCols[column_number].sSearch !== '') {
							tmpStr = oTable.fnSettings().aoPreSearchCols[column_number].sSearch;
							if (columnObj.filter_type === "select") {
								tmpStr = yadcfParseMatchFilter(tmpStr, getOptions(oTable.selector)[column_number].filter_match_mode);
								$('#yadcf-filter-' + table_selector_jq_friendly + '-' + column_number).val(tmpStr).addClass("inuse");
							} else if (columnObj.filter_type === "multi_select") {
								tmpStr = yadcfParseMatchFilterMultiSelect(tmpStr, getOptions(oTable.selector)[column_number].filter_match_mode);
								tmpStr = tmpStr.replace(/\\/g, "");
								tmpStr = tmpStr.split("|");
								$('#yadcf-filter-' + table_selector_jq_friendly + '-' + column_number).val(tmpStr);
							}
						}
						if (columnObj.select_type !== undefined && columnObj.select_type === 'chosen') {
							$("#yadcf-filter-" + table_selector_jq_friendly + "-" + column_number).trigger("chosen:updated");
						} else if (columnObj.select_type !== undefined && columnObj.select_type === 'select2') {
							$("#yadcf-filter-" + table_selector_jq_friendly + "-" + column_number).select2("destroy").select2(columnObj.select_type_options);
						}
					} else if (columnObj.filter_type === "auto_complete") {
						$(document).data("yadcf-filter-" + table_selector_jq_friendly + "-" + column_number, options);
					}
				} else {
					if (filter_container_id === undefined) {
						if ($(filter_selector_string + " div.DataTables_sort_wrapper").length > 0) {
							$(filter_selector_string + " div.DataTables_sort_wrapper").css("display", "inline-block");
						}
					} else {
						if ($("#yadcf-filter-wrapper-" + filter_container_id).length === 0) {
							$("#" + filter_container_id).append("<div id=\"yadcf-filter-wrapper-" + filter_container_id + "\"></div>");
						}
						filter_selector_string = "#yadcf-filter-wrapper-" + filter_container_id;
					}

					if (columnObj.filter_type === "select" || columnObj.filter_type === 'custom_func') {

						//add a wrapper to hold both filter and reset button
						$(filter_selector_string).append("<div id=\"yadcf-filter-wrapper-" + table_selector_jq_friendly + "-" + column_number + "\" class=\"yadcf-filter-wrapper\"></div>");
						filter_selector_string = filter_selector_string + " div.yadcf-filter-wrapper";

						if (columnObj.filter_type === "select") {
							$(filter_selector_string).append("<select id=\"yadcf-filter-" + table_selector_jq_friendly + "-" + column_number + "\" class=\"yadcf-filter\" " +
								"onchange=\"yadcf.doFilter(this, '" + table_selector_jq_friendly + "', " + column_number + ", '" + filter_match_mode + "')\" onclick='yadcf.stopPropagation(event);'>" + options + "</select>");
							if (filter_reset_button_text !== false) {
								$(filter_selector_string).find(".yadcf-filter").after("<input value=\"" + filter_reset_button_text + "\" type=\"button\" " +
									"onclick=\"yadcf.stopPropagation(event);yadcf.doFilter('clear', '" + table_selector_jq_friendly + "', " + column_number + "); return false;\" class=\"yadcf-filter-reset-button\">");
							}
						} else {
							$(filter_selector_string).append("<select id=\"yadcf-filter-" + table_selector_jq_friendly + "-" + column_number + "\" class=\"yadcf-filter\" " +
									"onchange=\"yadcf.doFilterCustomDateFunc(this, '" + table_selector_jq_friendly + "', " + column_number + ")\" onclick='yadcf.stopPropagation(event);'>" + options + "</select>");
							if (filter_reset_button_text !== false) {
								$(filter_selector_string).find(".yadcf-filter").after("<input value=\"" + filter_reset_button_text + "\" type=\"button\" " +
									"onclick=\"yadcf.stopPropagation(event);yadcf.doFilterCustomDateFunc('clear', '" + table_selector_jq_friendly + "', " + column_number + "); return false;\" class=\"yadcf-filter-reset-button\">");
							}
							if (oTable.fnSettings().oFeatures.bServerSide !== true) {
								addCustomFunctionFilterCapability(table_selector_jq_friendly, "yadcf-filter-" + table_selector_jq_friendly + "-" + column_number, column_number);
							}
						}

						if (oTable.fnSettings().aoPreSearchCols[column_number].sSearch !== '') {
							tmpStr = oTable.fnSettings().aoPreSearchCols[column_number].sSearch;
							tmpStr = yadcfParseMatchFilter(tmpStr, getOptions(oTable.selector)[column_number].filter_match_mode);
							$('#yadcf-filter-' + table_selector_jq_friendly + '-' + column_number).val(tmpStr).addClass("inuse");
						}

						if (columnObj.select_type !== undefined && columnObj.select_type === 'chosen') {
							$("#yadcf-filter-" + table_selector_jq_friendly + "-" + column_number).chosen(columnObj.select_type_options);
							$("#yadcf-filter-" + table_selector_jq_friendly + "-" + column_number).next().attr("onclick", "yadcf.stopPropagation(event);");
						} else if (columnObj.select_type !== undefined && columnObj.select_type === 'select2') {
							$("#yadcf-filter-" + table_selector_jq_friendly + "-" + column_number).select2(columnObj.select_type_options);
						}

					} else if (columnObj.filter_type === "multi_select") {

						//add a wrapper to hold both filter and reset button
						$(filter_selector_string).append("<div id=\"yadcf-filter-wrapper-" + table_selector_jq_friendly + "-" + column_number + "\" class=\"yadcf-filter-wrapper\"></div>");
						filter_selector_string = filter_selector_string + " div.yadcf-filter-wrapper";

						$(filter_selector_string).append("<select multiple data-placeholder=\"" + filter_default_label + "\" id=\"yadcf-filter-" + table_selector_jq_friendly + "-" + column_number + "\" class=\"yadcf-filter\" " +
							"onchange=\"yadcf.doFilterMultiSelect(this, '" + table_selector_jq_friendly + "', " + column_number + ", '" + filter_match_mode + "')\" onclick='yadcf.stopPropagation(event);'>" + options + "</select>");

						if (filter_reset_button_text !== false) {
							$(filter_selector_string).find(".yadcf-filter").after("<input value=\"" + filter_reset_button_text + "\" type=\"button\" " +
								"onclick=\"yadcf.stopPropagation(event);yadcf.doFilter('clear', '" + table_selector_jq_friendly + "', " + column_number + "); return false;\" class=\"yadcf-filter-reset-button\">");
						}

						if (oTable.fnSettings().aoPreSearchCols[column_number].sSearch !== '') {
							tmpStr = oTable.fnSettings().aoPreSearchCols[column_number].sSearch;
							tmpStr = yadcfParseMatchFilterMultiSelect(tmpStr, getOptions(oTable.selector)[column_number].filter_match_mode);
							tmpStr = tmpStr.replace(/\\/g, "");
							tmpStr = tmpStr.split("|");
							$('#yadcf-filter-' + table_selector_jq_friendly + '-' + column_number).val(tmpStr);
						}

						if (columnObj.filter_container_id === undefined && columnObj.select_type_options.width === undefined) {
							columnObj.select_type_options = $.extend(columnObj.select_type_options, {width: $(filter_selector_string).closest("th").width() + "px"});
						}
						if (columnObj.select_type !== undefined && columnObj.select_type === 'chosen') {
							$("#yadcf-filter-" + table_selector_jq_friendly + "-" + column_number).chosen(columnObj.select_type_options);
							$("#yadcf-filter-" + table_selector_jq_friendly + "-" + column_number).next().attr("onclick", "yadcf.stopPropagation(event);");
						} else if (columnObj.select_type !== undefined && columnObj.select_type === 'select2') {
							$("#yadcf-filter-" + table_selector_jq_friendly + "-" + column_number).select2(columnObj.select_type_options);
						}

					} else if (columnObj.filter_type === "auto_complete") {

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

					} else if (columnObj.filter_type === "text") {

						//add a wrapper to hold both filter and reset button
						$(filter_selector_string).append("<div id=\"yadcf-filter-wrapper-" + table_selector_jq_friendly + "-" + column_number + "\" class=\"yadcf-filter-wrapper\"></div>");
						filter_selector_string = filter_selector_string + " div.yadcf-filter-wrapper";

						$(filter_selector_string).append("<input type=\"text\" id=\"yadcf-filter-" + table_selector_jq_friendly + "-" + column_number + "\" class=\"yadcf-filter\" onclick='yadcf.stopPropagation(event);"
							+ "' placeholder='" + filter_default_label + "'" + " filter_match_mode='" + filter_match_mode + "'" + " onkeyup=\"yadcf.textKeyUP('" + table_selector_jq_friendly + "',event);\"></input>");

						if (filter_reset_button_text !== false) {
							$(filter_selector_string).find(".yadcf-filter").after("<input value=\"" + filter_reset_button_text + "\" type=\"button\" " + " id=\"yadcf-filter-" + table_selector_jq_friendly + "-" + column_number + "-reset\"" +
								"onclick=\"yadcf.stopPropagation(event);yadcf.textKeyUP('" + table_selector_jq_friendly + "', event, 'clear'); return false;\" class=\"yadcf-filter-reset-button\">");
						}

						if (oTable.fnSettings().aoPreSearchCols[column_number].sSearch !== '') {
							tmpStr = oTable.fnSettings().aoPreSearchCols[column_number].sSearch;
							tmpStr = yadcfParseMatchFilter(tmpStr, getOptions(oTable.selector)[column_number].filter_match_mode);
							$('#yadcf-filter-' + table_selector_jq_friendly + '-' + column_number).val(tmpStr).addClass("inuse");
						}

					} else if (columnObj.filter_type === "date") {

						addDateFilter(filter_selector_string, table_selector_jq_friendly, column_number, filter_reset_button_text, filter_default_label, date_format);

					} else if (columnObj.filter_type === "range_number") {

						addRangeNumberFilter(filter_selector_string, table_selector_jq_friendly, column_number, filter_reset_button_text, filter_default_label, ignore_char);

					} else if (columnObj.filter_type === "range_number_slider") {

						addRangeNumberSliderFilter(filter_selector_string, table_selector_jq_friendly, column_number, filter_reset_button_text, min_val, max_val, ignore_char);

					} else if (columnObj.filter_type === "range_date") {

						addRangeDateFilter(filter_selector_string, table_selector_jq_friendly, column_number, filter_reset_button_text, filter_default_label, date_format);

					}
				}

				if ($(document).data("#yadcf-filter-" + table_selector_jq_friendly + "-" + column_number + "_val") !== undefined && $(document).data("#yadcf-filter-" + table_selector_jq_friendly + "-" + column_number + "_val") !== "-1") {
					$(filter_selector_string).find(".yadcf-filter").val($(document).data("#yadcf-filter-" + table_selector_jq_friendly + "-" + column_number + "_val"));
				}
				if (columnObj.filter_type === "auto_complete") {
					$("#yadcf-filter-" + table_selector_jq_friendly + "-" + column_number).autocomplete({
						source: $(document).data("yadcf-filter-" + table_selector_jq_friendly + "-" + column_number),
						select: autocompleteSelect
					});
					if (oTable.fnSettings().aoPreSearchCols[column_number].sSearch !== '') {
						tmpStr = oTable.fnSettings().aoPreSearchCols[column_number].sSearch;
						tmpStr = yadcfParseMatchFilter(tmpStr, getOptions(oTable.selector)[column_number].filter_match_mode);
						$('#yadcf-filter-' + table_selector_jq_friendly + '-' + column_number).val(tmpStr).addClass("inuse");
					}
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

		column_number = parseInt($(event.target).parent().attr("id").replace('yadcf-filter-wrapper-' + table_selector_jq_friendly + '-', ''), 10);

		$(event.target).parent().find(".yadcf-filter-range").val("");
		if ($(event.target).parent().find(".yadcf-filter-range-number").length > 0) {
			$($(event.target).parent().find(".yadcf-filter-range")[0]).focus();
		}

		if (oTable.fnSettings().oFeatures.bServerSide !== true) {
			oTable.fnDraw();
		} else {
			oTable.fnFilter('-yadcf_delim-', column_number);
		}

		if (!oTable.fnSettings().oLoadedState) {
			oTable.fnSettings().oLoadedState = {};
			oTable.fnSettings().oApi._fnSaveState(oTable.fnSettings());
		}
		if (oTable.fnSettings().oFeatures.bStateSave === true) {
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

		$($(event.target).prev().find(".ui-slider-handle")[0]).removeClass("inuse");
		$($(event.target).prev().find(".ui-slider-handle")[1]).removeClass("inuse");
		$(event.target).prev().find(".ui-slider-range").removeClass("inuse");

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
			min_server,
			max,
			max_server,
			fromId,
			toId,
			column_number,
			options,
			keyUp;

		column_number = parseInt($(event.target).attr("id").replace('-from-date-', '').replace('-to-date-', '').replace('yadcf-filter-' + table_selector_jq_friendly, ''), 10);
		options = getOptions(oTable.selector)[column_number];

		keyUp = function () {
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

				if (oTable.fnSettings().oFeatures.bServerSide !== true) {
					oTable.fnDraw();
				} else {
					if (min instanceof Date) {
						min_server = min.getTime();
					} else {
						min_server = min;
					}
					if (max instanceof Date) {
						max_server = max.getTime();
					} else {
						max_server = max;
					}
					oTable.fnFilter(min_server + '-yadcf_delim-' + max_server, column_number);
				}

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
		};

		if (options.filter_delay === undefined) {
			keyUp(table_selector_jq_friendly, event);
		} else {
			yadcfDelay(function () {
				keyUp(table_selector_jq_friendly, event);
			}, options.filter_delay);
		}
	}

	function rangeNumberKeyUP(table_selector_jq_friendly, event) {
		$.fn.dataTableExt.iApiIndex = oTablesIndex[table_selector_jq_friendly];
		var oTable = oTables[table_selector_jq_friendly],
			min,
			max,
			fromId,
			toId,
			yadcfState,
			column_number,
			options,
			keyUp;

		column_number = parseInt($(event.target).attr("id").replace('-from-', '').replace('-to-', '').replace('yadcf-filter-' + table_selector_jq_friendly, ''), 10);
		options = getOptions(oTable.selector)[column_number];

		keyUp = function () {

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

				if (oTable.fnSettings().oFeatures.bServerSide !== true) {
					oTable.fnDraw();
				} else {
					oTable.fnFilter(min + '-yadcf_delim-' + max, column_number);
				}
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
		};

		if (options.filter_delay === undefined) {
			keyUp();
		} else {
			yadcfDelay(function () {
				keyUp();
			}, options.filter_delay);
		}
	}

	function textKeyUP(table_selector_jq_friendly, event, clear) {

		var column_number = parseInt($(event.target).attr("id").replace("yadcf-filter-" + table_selector_jq_friendly + "-", "").replace('-reset', ''), 10),
			oTable = oTables[table_selector_jq_friendly],
			options = getOptions(oTable.selector)[column_number],

			keyUp = function (table_selector_jq_friendly, event, clear) {
				$.fn.dataTableExt.iApiIndex = oTablesIndex[table_selector_jq_friendly];

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
			};

		if (options.filter_delay === undefined) {
			keyUp(table_selector_jq_friendly, event, clear);
		} else {
			yadcfDelay(function () {
				keyUp(table_selector_jq_friendly, event, clear);
			}, options.filter_delay);
		}
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

        if (oTable.fnSettings().sAjaxSource === null && oTable.fnSettings().ajax === null) {
			table_selector_tmp = table_selector;
			if (table_selector.indexOf(":eq") !== -1) {
				table_selector_tmp = table_selector.substring(0, table_selector.lastIndexOf(":eq"));
			}
			appendFilters(oTable, yadcf.getOptions(table_selector_tmp), table_selector);
        } else {
			appendFilters(oTable, yadcf.getOptions(table_selector), table_selector);
			if (yadcfVersionCheck('1.10')) {
				$(document).off('draw.dt').on('draw.dt', oTable.selector, function (event, ui) {
					appendFilters(oTable, yadcf.getOptions(ui.oInstance.selector), ui.oInstance.selector);
				});
				$(document).off('xhr.dt').on('xhr.dt', function (e, settings, json) {
					var col_num;
					for (col_num in yadcf.getOptions(settings.oInstance.selector)) {
						if (yadcf.getOptions(settings.oInstance.selector).hasOwnProperty(col_num)) {
							if (json['yadcf_data_' + col_num] !== undefined) {
								yadcf.getOptions(settings.oInstance.selector)[col_num].data = json['yadcf_data_' + col_num];
							}
						}
					}
				});
				$(document).off('column-visibility.dt').on('column-visibility.dt', function (e, settings, col_num, state) {
					var obj = {};
					if (state === true) {
						obj[col_num] = yadcf.getOptions(settings.oInstance.selector)[col_num];
						appendFilters(oTables[yadcf.generateTableSelectorJQFriendly(settings.oInstance.selector)],
							obj,
							settings.oInstance.selector);
					}
				});
			} else {
				$(document).off('draw').on('draw', oTable.selector, function (event, ui) {
					appendFilters(oTable, yadcf.getOptions(ui.oInstance.selector), ui.oInstance.selector);
				});
			}
        }
		if (oTable.fnSettings().oFeatures.bStateSave === true) {
			if (yadcfVersionCheck('1.10')) {
				$(oTable.selector).off('stateSaveParams.dt').on('stateSaveParams.dt', function (e, settings, data) {
					if (settings.oLoadedState && settings.oLoadedState.yadcfState !== undefined) {
						data.yadcfState = settings.oLoadedState.yadcfState;
					} else {
						data.naruto = 'kurama';
					}
				});
			} else {
				$(oTable.selector).off('stateSaveParams').on('stateSaveParams', function (e, settings, data) {
					if (settings.oLoadedState && settings.oLoadedState.yadcfState !== undefined) {
						data.yadcfState = settings.oLoadedState.yadcfState;
					} else {
						data.naruto = 'kurama';
					}
				});
			}
			//when using DOM source
			if (oTable.fnSettings().sAjaxSource === null && oTable.fnSettings().ajax === null) {
				//we need to make sure that the yadcf state will be saved after page reload
				oTable.fnSettings().oApi._fnSaveState(oTable.fnSettings());
				//redraw the table in order to apply the filters
				oTable.fnDraw();
			}
		}
	}

    $.fn.yadcf = function (options_arg) {

		if ($(this.selector).length === 1) {
			setOptions(this.selector, options_arg);
			initAndBindTable(this, this.selector, 0);
		} else {
			var i = 0,
				selector;
			for (i; i < $(this.selector).length; i++) {
				$.fn.dataTableExt.iApiIndex = i;
				selector = this.selector + ":eq(" + i + ")";
				setOptions(this.selector, options_arg);
				initAndBindTable(this, selector, i);
			}
			$.fn.dataTableExt.iApiIndex = 0;
		}
        return this;
    };

	function init(oTable, options_arg) {
		var instance = oTable.settings()[0].oInstance,
			i = 0,
			selector;
		if ($(instance.selector).length === 1) {
			setOptions(instance.selector, options_arg);
			initAndBindTable(instance, instance.selector, 0);
		} else {
			for (i; i < $(instance.selector).length; i++) {
				$.fn.dataTableExt.iApiIndex = i;
				selector = instance.selector + ":eq(" + i + ")";
				setOptions(instance.selector, options_arg);
				initAndBindTable(instance, selector, i);
			}
			$.fn.dataTableExt.iApiIndex = 0;
		}
	}

    function stopPropagation(evt) {
		if (evt.stopPropagation !== undefined) {
			evt.stopPropagation();
		} else {
			evt.cancelBubble = true;
		}
	}

	//--------------------------------------------------------
	function exInternalFilterColumnAJAXQueue(table_arg, col_filter_arr) {
		return function () {
			exFilterColumn(table_arg, col_filter_arr, true);
		};
	}

	function exFilterColumn(table_arg, col_filter_arr, ajaxSource) {
		var table_selector_jq_friendly,
			j,
			tmpStr,
			column_number,
			filter_value,
			fromId,
			toId,
			sliderId,
			optionsObj;
		//check if the table arg is from new datatables API (capital "D")
		if (table_arg.settings !== undefined) {
			table_arg = table_arg.settings()[0].oInstance;
		}
		table_selector_jq_friendly = yadcf.generateTableSelectorJQFriendly(table_arg.selector);
		if ((table_arg.fnSettings().sAjaxSource === null && table_arg.fnSettings().ajax === null) || ajaxSource === true) {
			for (j = 0; j < col_filter_arr.length; j++) {
				column_number = col_filter_arr[j][0];
				optionsObj = getOptions(table_arg.selector)[column_number];
				filter_value = col_filter_arr[j][1];

				switch (optionsObj.filter_type) {
				case 'select':
				case 'auto_complete':
				case 'text':
				case 'date':
					$('#yadcf-filter-' + table_selector_jq_friendly + '-' + column_number).val(filter_value).addClass('inuse');
					tmpStr = yadcfMatchFilterString(table_arg, column_number, filter_value, optionsObj.filter_match_mode, false);
					table_arg.fnSettings().aoPreSearchCols[column_number].sSearch = tmpStr;
					break;
				case 'multi_select':
					$('#yadcf-filter-' + table_selector_jq_friendly + '-' + column_number).val(filter_value);
					tmpStr = yadcfMatchFilterString(table_arg, column_number, filter_value, optionsObj.filter_match_mode, true);
					table_arg.fnSettings().aoPreSearchCols[column_number].sSearch = tmpStr;
					if (optionsObj.select_type !== undefined) {
						if (optionsObj.select_type === 'chosen') {
							$('#yadcf-filter-' + table_selector_jq_friendly + '-' + column_number).trigger('chosen:updated');
						} else if (optionsObj.select_type === 'select2') {
							$("#yadcf-filter-" + table_selector_jq_friendly + "-" + column_number).select2("destroy").select2(optionsObj.select_type_options);
						}
					}
					break;
				case 'range_date':
					fromId = 'yadcf-filter-' + table_selector_jq_friendly + '-from-date-' + column_number;
					toId = 'yadcf-filter-' + table_selector_jq_friendly + '-to-date-' + column_number;
					if (filter_value.from !== '') {
						$('#' + fromId).val(filter_value.from);
						$('#' + fromId).addClass('inuse');
					}
					if (filter_value.to !== '') {
						$('#' + toId).val(filter_value.to);
						$('#' + toId).addClass('inuse');
					}
					break;
				case 'range_number':
					fromId = 'yadcf-filter-' + table_selector_jq_friendly + '-from-' + column_number;
					toId = 'yadcf-filter-' + table_selector_jq_friendly + '-to-' + column_number;
					if (filter_value.from !== '') {
						$('#' + fromId).val(filter_value.from);
						$('#' + fromId).addClass('inuse');
					}
					if (filter_value.to !== '') {
						$('#' + toId).val(filter_value.to);
						$('#' + toId).addClass('inuse');
					}
					break;
				case 'range_number_slider':
					sliderId = 'yadcf-filter-' + table_selector_jq_friendly + '-slider-' + column_number;
					fromId = 'yadcf-filter-' + table_selector_jq_friendly + '-min_tip-' + column_number;
					toId = 'yadcf-filter-' + table_selector_jq_friendly + '-max_tip-' + column_number;
					if (filter_value.from !== '') {
						$('#' + fromId).text(filter_value.from);
						$('#' + fromId).parent().addClass('inuse');
						$('#' + fromId).parent().parent().find('ui-slider-range').addClass('inuse');
						$('#' + sliderId).slider('values', 0, filter_value.from);
					}
					if (filter_value.to !== '') {
						$('#' + toId).text(filter_value.to);
						$('#' + toId).parent().addClass('inuse');
						$('#' + toId).parent().parent().find('.ui-slider-range').addClass('inuse');
						$('#' + sliderId).slider('values', 1, filter_value.to);
					}
					break;
				}

			}
			if (table_arg.fnSettings().oFeatures.bServerSide !== true) {
				table_arg.fnDraw();
			} else {
				switch (optionsObj.filter_type) {
				case 'select':
				case 'auto_complete':
				case 'text':
				case 'date':
					setTimeout(function () {
						table_arg.fnFilter(filter_value, column_number);
					}, 10);
					break;
				default:
					console.log('exFilterColumn is not supported for ' + optionsObj.filter_type);
					break;
				}
			}
        } else {
			exFilterColumnQueue.push(exInternalFilterColumnAJAXQueue(table_arg, col_filter_arr));
        }
	}

	function exGetColumnFilterVal(table_arg, column_number) {
		var retVal,
			fromId,
			toId,
			table_selector_jq_friendly,
			optionsObj = getOptions(table_arg.selector)[column_number];

		table_selector_jq_friendly = yadcf.generateTableSelectorJQFriendly(table_arg.selector);

		switch (optionsObj.filter_type) {
		case 'select':
			retVal = $('#yadcf-filter-' + table_selector_jq_friendly + '-' + column_number).val();
			if (retVal === '-1') {
				retVal = '';
			}
			break;
		case 'auto_complete':
		case 'text':
		case 'date':
			retVal = $('#yadcf-filter-' + table_selector_jq_friendly + '-' + column_number).val();
			break;
		case 'multi_select':
			retVal = $('#yadcf-filter-' + table_selector_jq_friendly + '-' + column_number).val();
			if (retVal === null) {
				retVal = '';
			}
			break;
		case 'range_date':
			retVal = {};
			fromId = 'yadcf-filter-' + table_selector_jq_friendly + '-from-date-' + column_number;
			toId = 'yadcf-filter-' + table_selector_jq_friendly + '-to-date-' + column_number;

			retVal.from = $('#' + fromId).val();
			retVal.to = $('#' + toId).val();
			break;
		case 'range_number':
			retVal = {};
			fromId = 'yadcf-filter-' + table_selector_jq_friendly + '-from-' + column_number;
			toId = 'yadcf-filter-' + table_selector_jq_friendly + '-to-' + column_number;

			retVal.from = $('#' + fromId).val();
			retVal.to = $('#' + toId).val();
			break;
		case 'range_number_slider':
			retVal = {};
			fromId = 'yadcf-filter-' + table_selector_jq_friendly + '-min_tip-' + column_number;
			toId = 'yadcf-filter-' + table_selector_jq_friendly + '-max_tip-' + column_number;

			retVal.from = $('#' + fromId).text();
			retVal.to = $('#' + toId).text();
			break;
		}
		return retVal;
	}
    return {
		init : init,
		doFilter : doFilter,
		doFilterMultiSelect : doFilterMultiSelect,
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
		exGetColumnFilterVal : exGetColumnFilterVal,
		dateKeyUP : dateKeyUP,
		dateSelectSingle : dateSelectSingle,
		textKeyUP : textKeyUP,
		doFilterCustomDateFunc : doFilterCustomDateFunc
    };

}(jQuery));
