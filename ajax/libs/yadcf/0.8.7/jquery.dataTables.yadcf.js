/*global $, jQuery, exFilterColumn*/
/*jslint plusplus: true, nomen: true */
/*!
* Yet Another DataTables Column Filter - (yadcf)
* 
* File:        jquery.dataTables.yadcf.js
* Version:     0.8.7
*  
* Author:      Daniel Reznick
* Info:        https://github.com/vedmack/yadcf
* Contact:     vedmack@gmail.com
* Twitter:	   @danielreznick
* Q&A		   https://groups.google.com/forum/#!forum/daniels_code	
*
* Copyright 2014 Daniel Reznick, all rights reserved.
* Copyright 2014 Released under the MIT License
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
				Possible values:	select / multi_select / auto_complete / text / date / range_number / range_number_slider / range_date / custom_func / multi_select_custom_func
				Description:		The type of the filter to be used in the column

* custom_func				
				Required:			true (when filter_type is custom_func / multi_select_custom_func)
				Type:				function
				Default value:		undefined
				Description:		should be pointing to a function with the following signature myCustomFilterFunction(filterVal, columnVal) , where filterVal is the value from the select box and
									columnVal is the value from the relevant row column, this function should return true if the row matches your condition and the row should be displayed) and false otherwise
				Note:				When using multi_select_custom_func as filter_type filterVal will hold an array of selected values from the multi select element
	
* data
				Required:			false / true (when filter_type is custom_func / multi_select_custom_func)
				Type:				Array (of string or objects)
				Description:		When the need of predefined data for filter is needed just use an array of strings ["value1","value2"....] (supported in select / multi_select / auto_complete filters) or
									array of objects [{value: 'Some Data 1', label: 'One'}, {value: 'Some Data 3', label: 'Three'}] (supported in select / multi_select filters)
				Note:				that when filter_type is custom_func / multi_select_custom_func this array will populate the custom filter select element
					
* column_data_type
				Required:			false
				Type:				String
				Default value:		text
				Possible values:	text / html	/ rendered_html
				Description:		The type of data in column , use "html" when you have some html code in the column (support parsing of multiple elements per cell),
									use rendered_html when you are using render function of columnDefs or similar, that produces a html code, note that both types rendered_html and html have a fallback for simple text parsing

* text_data_delimiter
				Required:			false
				Type:				String
				Description:		Delimiter that seperates text in table column, for example text_data_delimiter: ","
										
* html_data_type
				Required:			false
				Type:				String
				Default value:		text
				Possible values:	text / value / id / selector			
				Description:		When using "html" for column_data_type argument you can choose how exactly to parse your html element/s in column , for example use "text" for the following <span class="someClass">Some text</span>
				Special notes:		when using selector you must provide a valid selector string for the html_data_selector property

* html_data_selector
				Required:			false
				Type:				String
				Default value:		undefined
				Possible values:	any valid selector string, for example 'li:eq(1)'
				Description:		allows for advanced text value selection within the html located in the td element
				Special notes:		know that the selector string "begin is search" from (and not outside) the first element of the html inside the td
									(supported by range_number_slider / select / auto_complete)
				
* html5_data
				Required:			false
				Type:				String
				Default value:		undefined
				Possible values:	data-filter / data-search / anything that is supported by datatables
				Description:		Allows to filter based on data-filter / data-search attributes of the <td> element, read more: http://www.datatables.net/examples/advanced_init/html5-data-attributes.html
				
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
				Possible values:	alpha / num / none
				Description:		Defines how the values in the filter will be sorted, alphabetically or numerically or not sorted at all (none is useful to preserve
									the order of the data attribute as is)

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
				
				
* filter_plugin_options
				Required:			false
				Type:				Object
				Default value:		undefined
				Description:		This parameter will be passed to the jQuery Autocomplete plugin constructor
				
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
				Special notes:		Currently supported in text / range_number / range_date filters / range_number_slider

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
				Usage example:		yadcf.exFilterColumn(oTable, [[0, 'Some Data 2']]); //pre filter one column
									yadcf.exFilterColumn(oTable, [[0, 'Some Data 1'], [1, {from: 111, to: 1110}], [2, {from: "", to: "11/25/2014"}]]); //pre filter several columns
									yadcf.exFilterColumn(oTable, [[0, ['Some Data 1','Some Data 2']]]); // for pre filtering multi select filter you should use array with values (or an array with single value)

* exGetColumnFilterVal									
				Description:		Allows to retrieve  column current filtered value (support ALL filter types!!!)
				Arguments:			table_arg: (variable of the datatable), 
									column number:  column number from which we want the value
				Usage example:		yadcf.exGetColumnFilterVal(oTable,1);
				Return value:		String (for simple filter) / Object (for range filter) with from and to properties / Array of strings for multi_select filter

				
* exResetAllFilters
				Description:		Allows to reset all filters externally/programmatically (support ALL filter types!!!) , perfect for adding a "reset all" button to your page!
				Arguments:			table_arg: (variable of the datatable)									
				Usage example:		yadcf.exResetAllFilters(oTable);
									

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
* Filters position
*
*					
* -------------

* Filters can be placed in the header (thead) or in the footer (tfoot) , it is defined by the second argument of yadcf constructor 
  or third argument of init function. Header location is the default position, use 'footer' in order to place the filters in the tfoot position


*				
*				
*				
* Working with filters for multiple tables:
*
*					
* -------------				

* initMultipleTables
				Description:		Allows to create filter that will affect multiple tables / multiple column(s) in multiple tables
				Arguments:			Array of tables,
									Array of objects with properties for each filter
				Usage example:		yadcf.initMultipleTables([oTable, oTable2], [{
										column_number: [0, 1], filter_container_id: 'multi-table-filter-0', filter_default_label: 'Filter all tables columns 1 and 2!'
									},	
									{
										column_number: [2], filter_container_id: 'multi-table-filter-1', filter_default_label: 'Filter all tables column 3!'
									}]);
				Valid properties:	filter_type: 'text' (default) / 'select',
									column_number: not required (in that case the filter will be global)
												   can be either number(single column filter) or array of numbers(multiple columns filter)
									filter_container_id: '' (required),
				Note:				All the usual properties of yadcf should be supported in initMultipleTables too!

* initMultipleColumns			
				Description:		Allows to create filter that will affect multiple column(s) in in a particular table
				Arguments:			Table variable,
									Array of objects with properties for each filter
				Usage example:		yadcf.initMultipleColumns(oTable, [{
										column_number: [0, 1], filter_container_id: 'multi-table-filter-0', filter_default_label: 'Filter columns 1 and 2!'
									},	
									{
										column_number: [2, 3], filter_container_id: 'multi-table-filter-1', filter_default_label: 'Filter column 3 and 4!'
									}]);
				Valid properties:	filter_type: 'text' (default) / 'select',
									column_number: not required (in that case the filter will be global)
												   can be either number(single column filter) or array of numbers(multiple columns filter)
									filter_container_id: '' (required),
				Note:				All the usual properties of yadcf should be supported in initMultipleColumns too!	
*/
var yadcf = (function ($) {

	'use strict';

	var oTables = {},
		oTablesIndex = {},
		options = {},
		plugins = {},
		exFilterColumnQueue = [],
		yadcfDelay;

	//From ColReorder (SpryMedia Ltd (www.sprymedia.co.uk))
	function getSettingsObjFromTable(dt) {
		var oDTSettings;
		if ($.fn.dataTable.Api) {
			oDTSettings = new $.fn.dataTable.Api(dt).settings()[0];
		} else if (dt.fnSettings) {// 1.9 compatibility
			// DataTables object, convert to the settings object
			oDTSettings = dt.fnSettings();
		} else if (typeof dt === 'string') {// jQuery selector
			if ($.fn.dataTable.fnIsDataTable($(dt)[0])) {
				oDTSettings = $(dt).eq(0).dataTable().fnSettings();
			}
		} else if (dt.nodeName && dt.nodeName.toLowerCase() === 'table') {
			// Table node
			if ($.fn.dataTable.fnIsDataTable(dt.nodeName)) {
				oDTSettings = $(dt.nodeName).dataTable().fnSettings();
			}
		} else if (dt instanceof jQuery) {
			// jQuery object
			if ($.fn.dataTable.fnIsDataTable(dt[0])) {
				oDTSettings = dt.eq(0).dataTable().fnSettings();
			}
		} else {
			// DataTables settings object
			oDTSettings = dt;
		}
		return oDTSettings;
	}

	function arraySwapValueWithIndex(pArray) {
		var tmp = [],
			i;
		for (i = 0; i < pArray.length; i++) {
			tmp[pArray[i]] = i;
		}
		return tmp;
	}

	function initColReorder(state, table_selector_jq_friendly, clear) {
		if (clear === true) {
			plugins[table_selector_jq_friendly] = undefined;
			return;
		}
		if (state != null && state.ColReorder !== undefined) {
			if (plugins[table_selector_jq_friendly] === undefined) {
				plugins[table_selector_jq_friendly] = {};
				plugins[table_selector_jq_friendly].ColReorder = arraySwapValueWithIndex(state.ColReorder);
			}
		}
	}

	function columnsArrayToString(column_number) {
		var column_number_obj = {};
		if (column_number !== undefined) {
			if (column_number instanceof Array) {
				column_number_obj.column_number_str = column_number.join('_');
			} else {
				column_number_obj.column_number_str = column_number;
				column_number = [];
				column_number.push(column_number_obj.column_number_str);
			}
		} else {
			column_number_obj.column_number_str = 'global';
		}
		column_number_obj.column_number = column_number;
		return column_number_obj;
	}

	function getOptions(selector) {
		return options[selector];
	}

	function eventTargetFixUp(pEvent) {
		if (pEvent.target === undefined) {
            pEvent.target = pEvent.srcElement;
        }
		return pEvent;
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
				case_insensitive : true,
				column_data_type: 'text',
				html_data_type: 'text'
			},
			adaptContainerCssClassImpl = function (dummy) { return ''; };

		if (options_arg.length === undefined) {
			options[selector_arg] = options_arg;
			return;
		}
		for (i = 0; i < options_arg.length; i++) {
			if (options_arg[i].select_type === 'select2') {
				default_options.select_type_options = {adaptContainerCssClass: adaptContainerCssClassImpl};
			}
			//validate custom function required attributes
			if (options_arg[i].filter_type !== undefined && options_arg[i].filter_type.indexOf('custom_func') !== -1) {
				if (options_arg[i].custom_func === undefined) {
					alert('You are trying to use filter_type: "custom_func / multi_select_custom_func" for column ' + options_arg[i].column_number + ' but there is no such custom_func attribute provided (custom_func: \"function reference goes here...\")');
					return;
				}
				if (options_arg[i].data === undefined) {
					alert('You are trying to use filter_type: "custom_func / multi_select_custom_func" for column ' + options_arg[i].column_number + ' but there is no such data attribute provided (data: \"array of options goes here...\")');
					return;
				}
			}
			col_num_as_int = +options_arg[i].column_number;
			if (isNaN(col_num_as_int)) {
				tmpOptions[options_arg[i].column_number_str] = $.extend(true, {}, default_options, options_arg[i]);
			} else {
				tmpOptions[col_num_as_int] = $.extend(true, {}, default_options, options_arg[i]);
			}
		}
		options[selector_arg] = tmpOptions;
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

	function calculateColumnNumber(column_number, pTable) {
		var col_num_visible_iter,
			col_num_visible = column_number;
		for (col_num_visible_iter = 0; col_num_visible_iter < pTable.fnSettings().aoColumns.length && col_num_visible_iter < column_number; col_num_visible_iter++) {
			if (pTable.fnSettings().aoColumns[col_num_visible_iter].bVisible === false) {
				col_num_visible++;
			}
		}
		return col_num_visible;
	}

	function resetIApiIndex() {
		$.fn.dataTableExt.iApiIndex = 0;

	}

	function generateTableSelectorJQFriendly(tmpStr) {
		return tmpStr.replace(":", "-").replace("(", "").replace(")", "").replace(".", "-").replace("#", "-");
	}

	function escapeRegExp(string) {
		return string.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, "\\$1");
	}

	function replaceAll(string, find, replace) {
		return string.replace(new RegExp(escapeRegExp(find), 'g'), replace);
	}

	function generateTableSelectorJQFriendlyNew(tmpStr) {
		tmpStr = replaceAll(tmpStr, ":", "-");
		tmpStr = replaceAll(tmpStr, "(", "");
		tmpStr = replaceAll(tmpStr, ")", "");
		tmpStr = replaceAll(tmpStr, ",", "");
		tmpStr = replaceAll(tmpStr, ".", "-");
		tmpStr = replaceAll(tmpStr, "#", "-");
		return tmpStr;
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
				table_arg.fnSettings().aoPreSearchCols[column_number].bSmart = true;
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
				table_arg.fnSettings().aoPreSearchCols[column_number].bSmart = true;
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
			oTable.fnFilter(selected_value, column_number, false, true, true, case_insensitive);
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
		var oTable = oTables[table_selector_jq_friendly],
			yadcfState,
			columnObj = yadcf.getOptions(oTable.selector)[column_number];

		if (arg === "clear" || arg.value === "-1") {
			$("#yadcf-filter-" + table_selector_jq_friendly + "-" + column_number).val("-1").focus();
			$("#yadcf-filter-" + table_selector_jq_friendly + "-" + column_number).removeClass("inuse");
			if (columnObj.select_type === 'chosen') {
				$("#yadcf-filter-" + table_selector_jq_friendly + "-" + column_number).trigger("chosen:updated");
			} else if (columnObj.select_type !== undefined && columnObj.select_type === 'select2') {
				$("#yadcf-filter-" + table_selector_jq_friendly + "-" + column_number).select2("destroy").select2(columnObj.select_type_options);
			}
		} else {
			$("#yadcf-filter-" + table_selector_jq_friendly + "-" + column_number).addClass("inuse");
		}

		if (!oTable.fnSettings().oLoadedState) {
			oTable.fnSettings().oLoadedState = {};
			oTable.fnSettings().oApi._fnSaveState(oTable.fnSettings());
		}
		if (oTable.fnSettings().oFeatures.bStateSave === true) {
			if (oTable.fnSettings().oLoadedState.yadcfState !== undefined && oTable.fnSettings().oLoadedState.yadcfState[table_selector_jq_friendly] !== undefined) {
				oTable.fnSettings().oLoadedState.yadcfState[table_selector_jq_friendly][column_number] =
					{
						'from' : arg.value
					};
			} else {
				yadcfState = {};
				yadcfState[table_selector_jq_friendly] = [];
				yadcfState[table_selector_jq_friendly][column_number] = {
					'from' : arg.value
				};
				oTable.fnSettings().oLoadedState.yadcfState = yadcfState;
			}
			oTable.fnSettings().oApi._fnSaveState(oTable.fnSettings());
		}

		oTable.fnDraw();
	}

	function doFilter(arg, table_selector_jq_friendly, column_number, filter_match_mode) {
		$.fn.dataTableExt.iApiIndex = oTablesIndex[table_selector_jq_friendly];

		var oTable = oTables[table_selector_jq_friendly],
			selected_value,
			column_number_filter,
			columnObj,
			settingsDt = getSettingsObjFromTable(oTable);

		if (settingsDt.oSavedState != null && settingsDt.oSavedState.ColReorder !== undefined) {
			initColReorder(settingsDt.oSavedState, table_selector_jq_friendly);
			column_number_filter = plugins[table_selector_jq_friendly].ColReorder[column_number];
		} else {
			column_number_filter = column_number;
		}
		columnObj = yadcf.getOptions(oTable.selector)[column_number];
		if (arg === "clear") {
			$("#yadcf-filter-" + table_selector_jq_friendly + "-" + column_number).val("-1").focus();
			$("#yadcf-filter-" + table_selector_jq_friendly + "-" + column_number).removeClass("inuse");
			$(document).data("#yadcf-filter-" + table_selector_jq_friendly + "-" + column_number + "_val", "-1");
			oTable.fnFilter("", column_number_filter);
			resetIApiIndex();
			if (yadcf.getOptions(oTable.selector)[column_number].select_type === 'chosen') {
				$("#yadcf-filter-" + table_selector_jq_friendly + "-" + column_number).trigger("chosen:updated");
			} else if (columnObj.select_type !== undefined && columnObj.select_type === 'select2') {
				$("#yadcf-filter-" + table_selector_jq_friendly + "-" + column_number).select2("destroy").select2(columnObj.select_type_options);
			}
			return;
		}

		$("#yadcf-filter-" + table_selector_jq_friendly + "-" + column_number).addClass("inuse");

		$(document).data("#yadcf-filter-" + table_selector_jq_friendly + "-" + column_number + "_val", arg.value);

		selected_value = $.trim($(arg).find('option:selected').val());

		if (arg.value !== "-1") {
			yadcfMatchFilter(oTable, selected_value, filter_match_mode, column_number_filter);
		} else {
			oTable.fnFilter("", column_number_filter);
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
				stringForSearch = selected_values.join('narutouzomaki');
				stringForSearch = stringForSearch.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, "\\$1");
				stringForSearch = stringForSearch.split('narutouzomaki').join('|');
				if (filter_match_mode === "contains") {
					oTable.fnFilter(stringForSearch, column_number, true, true, true);
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
		event = eventTargetFixUp(event);
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
					if (val) {
						val = val.toString().replace(ignore_char_local, "");
					} else {
						val = "";
					}
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
			function (oSettings, aData, iDataIndex, stateVal) {
				var filterVal = $('#' + filterId).val(),
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
			function (oSettings, aData, iDataIndex, rowData) {
				var min = $('#' + fromId).text(),
					max = $('#' + toId).text(),
					val,
					retVal = false,
					table_selector_jq_friendly_local = table_selector_jq_friendly,
					current_table_selector_jq_friendly = yadcf.generateTableSelectorJQFriendly(oSettings.oInstance.selector),
					ignore_char_local = ignore_char,
					column_data_type,
					html_data_type,
					i,
					columnObjKey,
					columnObj;

				if (rowData !== undefined) {
					aData = rowData;
				}
				val = aData[col_num] === "-" ? 0 : aData[col_num];
				if (table_selector_jq_friendly_local !== current_table_selector_jq_friendly) {
					return true;
				}

				if (!isFinite(min) || !isFinite(max)) {
					return true;
				}
				columnObj = yadcf.getOptions(oSettings.oInstance.selector)[col_num];
				column_data_type = columnObj.column_data_type;
				html_data_type = columnObj.html_data_type;

				if (column_data_type === "html" || column_data_type === "rendered_html") {
					if (html_data_type === undefined) {
						html_data_type = "text";
					}
					if ($(val).length !== 0) {
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
						case "selector":
							val = $(val).find(columnObj.html_data_selector).text();
							break;
						}
					}
				}
				if (ignore_char_local !== undefined) {
					min = min.replace(ignore_char_local, "");
					max = max.replace(ignore_char_local, "");
					if (val) {
						val = val.toString().replace(ignore_char_local, "");
					} else {
						val = "";
					}
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
		$(filter_selector_string).append("<div onmousedown=\"yadcf.stopPropagation(event);\" onclick=\"yadcf.stopPropagation(event);\"  id=\"" + filter_wrapper_id + "\" class=\"yadcf-filter-wrapper\"></div>");
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
			$(filter_selector_string_tmp).append("<button type=\"button\" onmousedown=\"yadcf.stopPropagation(event);\" " +
				"onclick=\"yadcf.stopPropagation(event);yadcf.rangeClear('" + table_selector_jq_friendly + "',event); return false;\" class=\"yadcf-filter-reset-button\">" + filter_reset_button_text + "</button>");
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
			oTable.fnFilter(from + '-yadcf_delim-' + to, column_number);
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
		$(filter_selector_string).append("<div onmousedown=\"yadcf.stopPropagation(event);\" onclick=\"yadcf.stopPropagation(event);\"  id=\"" + filter_wrapper_id + "\" class=\"yadcf-filter-wrapper\"></div>");
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
			$(filter_selector_string_tmp).append("<button type=\"button\" onmousedown=\"yadcf.stopPropagation(event);\" " +
				"onclick=\"yadcf.stopPropagation(event);yadcf.rangeClear('" + table_selector_jq_friendly + "',event); return false;\" class=\"yadcf-filter-reset-button\">" + filter_reset_button_text + "</button>");
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
		$(filter_selector_string).append("<div onmousedown=\"yadcf.stopPropagation(event);\" onclick=\"yadcf.stopPropagation(event);\"  id=\"" + filter_wrapper_id + "\" class=\"yadcf-filter-wrapper\"></div>");
		filter_selector_string = filter_selector_string + " div.yadcf-filter-wrapper";
		filter_selector_string_tmp = filter_selector_string;

		$(filter_selector_string).append("<input placeholder=\"" + filter_default_label + "\" id=\"" + dateId + "\" class=\"yadcf-filter-date\" onkeyup=\"yadcf.dateKeyUP('" +
			table_selector_jq_friendly + "','" + date_format + "',event);\"></input>");

		if (filter_reset_button_text !== false) {
			$(filter_selector_string_tmp).append('<button type="button" id="' + dateId + '-reset" ' + 'onmousedown="yadcf.stopPropagation(event);" ' +
				'onclick="yadcf.stopPropagation(event);yadcf.dateSelectSingle(\'' + table_selector_jq_friendly + '\',yadcf.eventTargetFixUp(event).target, \'clear\'); return false;" class="yadcf-filter-reset-button">' + filter_reset_button_text + '</button>');
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
		event = eventTargetFixUp(event);
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
			return;
		}

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

			//add a wrapper to hold both filter and reset button
			$(filter_selector_string).append("<div onmousedown=\"yadcf.stopPropagation(event);\" onclick=\"yadcf.stopPropagation(event);\"  id=\"" + filter_wrapper_id + "\" class=\"yadcf-filter-wrapper\"></div>");
			filter_selector_string = filter_selector_string + " div.yadcf-filter-wrapper";
			filter_selector_string_tmp = filter_selector_string;

			$(filter_selector_string).append("<div id=\"yadcf-filter-wrapper-inner-" + table_selector_jq_friendly + "-" + column_number + "\" class=\"yadcf-number-slider-filter-wrapper-inner\"></div>");
			filter_selector_string = filter_selector_string + " div.yadcf-number-slider-filter-wrapper-inner";

			$(filter_selector_string).append("<div id=\"" + sliderId + "\" class=\"yadcf-filter-range-number-slider\"></div>");
			filter_selector_string = filter_selector_string + " #" + sliderId;

			$(filter_selector_string).append("<span class=\"yadcf-filter-range-number-slider-min-tip-hidden hide\">" + min_val + "</span>");
			$(filter_selector_string).append("<span class=\"yadcf-filter-range-number-slider-max-tip-hidden hide\">" + max_val + "</span>");

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
					if (event.originalEvent || $(event.target).slider("option", "yadcf-reset") === true) {
						$(event.target).slider("option", "yadcf-reset", false);
						rangeNumberSliderChange(table_selector_jq_friendly, event, ui);
					}
				}
			});

			if (filter_reset_button_text !== false) {
				$(filter_selector_string_tmp).append("<button type=\"button\" onmousedown=\"yadcf.stopPropagation(event);\" " +
					"onclick=\"yadcf.stopPropagation(event);yadcf.rangeNumberSliderClear('" + table_selector_jq_friendly + "',event); return false;\" class=\"yadcf-filter-reset-button range-number-slider-reset-button\">" + filter_reset_button_text + "</button>");
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

	function removeFilters(oTable, args, table_selector) {
		$('.yadcf-filter-wrapper').remove();
		if (yadcfVersionCheck('1.10')) {
			$(document).off('draw.dt', oTable.selector);
			$(document).off('xhr.dt', oTable.selector);
			$(document).off('column-visibility.dt', oTable.selector);
			$(document).off('destroy.dt', oTable.selector);
		} else {
			$(document).off('draw', oTable.selector);
			$(document).off('destroy', oTable.selector);
		}
	}

	function sortColumnData(column_data, columnObj) {
		if (columnObj.filter_type === "select" || columnObj.filter_type === "auto_complete" || columnObj.filter_type === "multi_select" || columnObj.filter_type === "custom_func") {
			if (columnObj.sort_as === "alpha") {
				if (columnObj.sort_order === "asc") {
					column_data.sort();
				} else if (columnObj.sort_order === "desc") {
					column_data.sort();
					column_data.reverse();
				}
			} else if (columnObj.sort_as === "num") {
				if (columnObj.sort_order === "asc") {
					column_data.sort(sortNumAsc);
				} else if (columnObj.sort_order === "desc") {
					column_data.sort(sortNumDesc);
				}
			}
		}
		return column_data;
	}

	function parseTableColumn(pTable, columnObj) {
		var col_inner_elements,
			col_inner_data,
			j,
			k,
			col_filter_array = {},
			column_data = [],
			data = pTable.fnSettings().aoData,
			data_length = data.length;

		if (isNaN(pTable.fnSettings().aoColumns[columnObj.column_number].mData) && typeof pTable.fnSettings().aoColumns[columnObj.column_number].mData !== 'object') {
			columnObj.column_number_data = pTable.fnSettings().aoColumns[columnObj.column_number].mData;
		}
		if (columnObj.col_filter_array !== undefined) {
			col_filter_array = columnObj.col_filter_array;
		}
		for (j = 0; j < data_length; j++) {
			if (columnObj.column_data_type === "html") {
				if (columnObj.column_number_data === undefined) {
					col_inner_elements = $(data[j]._aData[columnObj.column_number]);
				} else {
					col_inner_elements = dot2obj(data[j]._aData, columnObj.column_number_data);
					col_inner_elements = $(col_inner_elements);
				}
				if (col_inner_elements.length > 0) {
					for (k = 0; k < col_inner_elements.length; k++) {
						switch (columnObj.html_data_type) {
						case "text":
							col_inner_data = $(col_inner_elements[k]).text();
							break;
						case "value":
							col_inner_data = $(col_inner_elements[k]).val();
							break;
						case "id":
							col_inner_data = col_inner_elements[k].id;
							break;
						case "selector":
							col_inner_data = $(col_inner_elements[k]).find(columnObj.html_data_selector).text();
							break;
						}

						if ($.trim(col_inner_data) !== '' && !(col_filter_array.hasOwnProperty(col_inner_data))) {
							col_filter_array[col_inner_data] = col_inner_data;
							column_data.push(col_inner_data);
						}
					}
				} else {
					col_inner_data = col_inner_elements.selector;
					if ($.trim(col_inner_data) !== '' && !(col_filter_array.hasOwnProperty(col_inner_data))) {
						col_filter_array[col_inner_data] = col_inner_data;
						column_data.push(col_inner_data);
					}
				}

			} else if (columnObj.column_data_type === "text") {
				if (columnObj.text_data_delimiter !== undefined) {
					if (columnObj.column_number_data === undefined) {
						col_inner_elements = data[j]._aData[columnObj.column_number].split(columnObj.text_data_delimiter);
					} else {
						col_inner_elements = dot2obj(data[j]._aData, columnObj.column_number_data);
						col_inner_elements = (col_inner_elements + '').split(columnObj.text_data_delimiter);
					}
					for (k = 0; k < col_inner_elements.length; k++) {
						col_inner_data = col_inner_elements[k];
						if ($.trim(col_inner_data) !== '' && !(col_filter_array.hasOwnProperty(col_inner_data))) {
							col_filter_array[col_inner_data] = col_inner_data;
							column_data.push(col_inner_data);
						}
					}
				} else {
					if (columnObj.column_number_data === undefined) {
						col_inner_data = data[j]._aData[columnObj.column_number];
						if (typeof col_inner_data === 'object') {
							if (columnObj.html5_data !== undefined) {
								col_inner_data = col_inner_data['@' + columnObj.html5_data];
							} else {
								alert('Looks like you have forgot to define the html5_data attribute for the ' + columnObj.column_number + ' column');
								return;
							}
						}
					} else if (data[j]._aFilterData !== undefined && data[j]._aFilterData !== null) {
						col_inner_data = data[j]._aFilterData[columnObj.column_number];
					} else {
						col_inner_data = dot2obj(data[j]._aData, columnObj.column_number_data);
					}
					if ($.trim(col_inner_data) !== '' && !(col_filter_array.hasOwnProperty(col_inner_data))) {
						col_filter_array[col_inner_data] = col_inner_data;
						column_data.push(col_inner_data);
					}
				}
			} else if (columnObj.column_data_type === "rendered_html") {
				col_inner_elements = data[j]._aFilterData[columnObj.column_number];
				col_inner_elements = $(col_inner_elements);
				if (col_inner_elements.length > 0) {
					for (k = 0; k < col_inner_elements.length; k++) {
						switch (columnObj.html_data_type) {
						case "text":
							col_inner_data = $(col_inner_elements[k]).text();
							break;
						case "value":
							col_inner_data = $(col_inner_elements[k]).val();
							break;
						case "id":
							col_inner_data = col_inner_elements[k].id;
							break;
						case "selector":
							col_inner_data = $(col_inner_elements[k]).find(columnObj.html_data_selector).text();
							break;
						}
					}
				} else {
					col_inner_data = col_inner_elements.selector;
				}
				if ($.trim(col_inner_data) !== '' && !(col_filter_array.hasOwnProperty(col_inner_data))) {
					col_filter_array[col_inner_data] = col_inner_data;
					column_data.push(col_inner_data);
				}
			}
		}
		columnObj.col_filter_array = col_filter_array;
		return column_data;
	}

	function appendFilters(oTable, args, table_selector) {

		var i = 0,
			$filter_selector,
			filter_selector_string,

			data,
			filter_container_id,
			column_number_data,
			column_number,
			column_position,
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

			column_data,
			options_tmp,
			j,
			k,
			data_length,
			col_inner_elements,
			col_inner_data,
			ii,
			table_selector_jq_friendly,
			min_val,
			max_val,
			col_num_visible,
			col_num_visible_iter,
			tmpStr,
			columnObjKey,
			columnObj,
			filters_position,
			unique_th,
			settingsDt;

		settingsDt = getSettingsObjFromTable(oTable);
		table_selector_jq_friendly = yadcf.generateTableSelectorJQFriendly(table_selector);

		initColReorder(settingsDt.oSavedState, table_selector_jq_friendly);

		filters_position = $(document).data(table_selector + "_filters_position");
		if (settingsDt.oScroll.sX !== '' || settingsDt.oScroll.sY !== '') {
			table_selector = '.yadcf-datatables-table-' + table_selector_jq_friendly;
		}
		if (oTable._fnGetUniqueThs() !== undefined) {
			unique_th = oTable._fnGetUniqueThs();
		}
		for (columnObjKey in args) {
			if (args.hasOwnProperty(columnObjKey)) {
				columnObj = args[columnObjKey];

				data = columnObj.data;
				column_data = [];
				filter_container_id = columnObj.filter_container_id;
				column_number = columnObj.column_number;
				column_number = +column_number;
				column_position = column_number;

				if (plugins[table_selector_jq_friendly] !== undefined && plugins[table_selector_jq_friendly].ColReorder !== undefined) {
					column_position = plugins[table_selector_jq_friendly].ColReorder[column_number];
				}

				columnObj.column_number = column_number;
				column_number_data = undefined;
				if (isNaN(settingsDt.aoColumns[column_position].mData) && typeof settingsDt.aoColumns[column_position].mData !== 'object') {
					column_number_data = settingsDt.aoColumns[column_position].mData;
					columnObj.column_number_data = column_number_data;
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
				columnObj.date_format = date_format;

				if (columnObj.ignore_char !== undefined && !(columnObj.ignore_char instanceof RegExp)) {
					ignore_char = new RegExp(columnObj.ignore_char, "g");
					columnObj.ignore_char = ignore_char;
				}
				filter_match_mode = columnObj.filter_match_mode;

				if (column_number === undefined) {
					alert("You must specify column number");
					return;
				}



				if (enable_auto_complete === true) {
					columnObj.filter_type = "auto_complete";
				}

				if (filter_default_label === undefined) {
					if (columnObj.filter_type === "select" || columnObj.filter_type === 'custom_func') {
						filter_default_label = "Select value";
					} else if (columnObj.filter_type === "multi_select" || columnObj.filter_type === 'multi_select_custom_func') {
						filter_default_label = "Select values";
					} else if (columnObj.filter_type === "auto_complete" || columnObj.filter_type === "text") {
						filter_default_label = 'Type to filter';
					} else if (columnObj.filter_type === "range_number" || columnObj.filter_type === "range_date") {
						filter_default_label = ["from", "to"];
					} else if (columnObj.filter_type === "date") {
						filter_default_label = "Select a date";
					}
					columnObj.filter_default_label = filter_default_label;
				}

				if (filter_reset_button_text === undefined) {
					filter_reset_button_text = "x";
				}

				if (data === undefined) {
					columnObj.col_filter_array = undefined;
					column_data = parseTableColumn(oTable, columnObj);
				} else {
					for (ii = 0; ii < data.length; ii++) {
						column_data.push(data[ii]);
					}
				}

				column_data = sortColumnData(column_data, columnObj);

				if (columnObj.filter_type === "range_number_slider") {
					min_val = findMinInArray(column_data, ignore_char);
					max_val = findMaxInArray(column_data, ignore_char);
				}


				if (filter_container_id === undefined) {
					//Can't show filter inside a column for a hidden one (place it outside using filter_container_id) 
					if (settingsDt.aoColumns[column_position].bVisible === false) {
						//console.log('Yadcf warning: Can\'t show filter inside a column N#' + column_number + ' for a hidden one (place it outside using filter_container_id)');
						continue;
					}

					if (filters_position !== 'thead') {
						if (unique_th === undefined) {
							//handle hidden columns
							col_num_visible = column_position;
							for (col_num_visible_iter = 0; col_num_visible_iter < settingsDt.aoColumns.length && col_num_visible_iter < column_position; col_num_visible_iter++) {
								if (settingsDt.aoColumns[col_num_visible_iter].bVisible === false) {
									col_num_visible--;
								}
							}
							column_position = col_num_visible;
							filter_selector_string = table_selector + ' ' + filters_position + ' th:eq(' + column_position + ')';
						} else {
							filter_selector_string = table_selector + ' ' + filters_position + ' th:eq(' + $(unique_th[column_position]).index() + ')';
						}
					} else {
						filter_selector_string = table_selector + ' ' + filters_position + ' tr:eq(' + $(unique_th[column_position]).parent().index() + ') th:eq(' + $(unique_th[column_position]).index() + ')';
					}
					$filter_selector = $(filter_selector_string).find(".yadcf-filter");
				} else {
					if ($("#" + filter_container_id).length === 0) {
						alert("Filter container could not be found.");
						return;
					}
					filter_selector_string = "#" + filter_container_id;
					$filter_selector = $(filter_selector_string).find(".yadcf-filter");
				}



				if (columnObj.filter_type === "select" || columnObj.filter_type === 'custom_func') {

					options_tmp = "<option value=\"" + "-1" + "\">" + filter_default_label + "</option>";

					if (columnObj.select_type === 'select2' && columnObj.select_type_options.placeholder !== undefined && columnObj.select_type_options.allowClear === true) {
						options_tmp = "<option value=\"\"></option>";
					}

					if (typeof column_data[0] === 'object') {
						for (ii = 0; ii < column_data.length; ii++) {
							options_tmp += "<option value=\"" + column_data[ii].value + "\">" + column_data[ii].label + "</option>";
						}
					} else {
						for (ii = 0; ii < column_data.length; ii++) {
							options_tmp += "<option value=\"" + column_data[ii] + "\">" + column_data[ii] + "</option>";
						}
					}
					column_data = options_tmp;

				} else if (columnObj.filter_type === "multi_select" || columnObj.filter_type === 'multi_select_custom_func') {
					if (columnObj.select_type === undefined) {
						options_tmp = "<option data-placeholder=\"true\" value=\"" + "-1" + "\">" + filter_default_label + "</option>";
					} else {
						options_tmp = "";
					}
					if (typeof column_data[0] === 'object') {
						for (ii = 0; ii < column_data.length; ii++) {
							options_tmp += "<option value=\"" + column_data[ii].value + "\">" + column_data[ii].label + "</option>";
						}
					} else {
						for (ii = 0; ii < column_data.length; ii++) {
							options_tmp += "<option value=\"" + column_data[ii] + "\">" + column_data[ii] + "</option>";
						}
					}
					column_data = options_tmp;
				}

				if ($filter_selector.length === 1) {
					if (columnObj.filter_type === "select" || columnObj.filter_type === "multi_select") {

						$filter_selector.empty();
						$filter_selector.append(column_data);
						if (settingsDt.aoPreSearchCols[column_position].sSearch !== '') {
							tmpStr = settingsDt.aoPreSearchCols[column_position].sSearch;
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
						$(document).data("yadcf-filter-" + table_selector_jq_friendly + "-" + column_number, column_data);
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
								"onchange=\"yadcf.doFilter(this, '" + table_selector_jq_friendly + "', " + column_number + ", '" + filter_match_mode + "')\" onmousedown=\"yadcf.stopPropagation(event);\" onclick='yadcf.stopPropagation(event);'>" + column_data + "</select>");
							if (filter_reset_button_text !== false) {
								$(filter_selector_string).find(".yadcf-filter").after("<button type=\"button\" " +
									"id=\"yadcf-filter-" + table_selector_jq_friendly + "-" + column_number + "-reset\" onmousedown=\"yadcf.stopPropagation(event);\" onclick=\"yadcf.stopPropagation(event);yadcf.doFilter('clear', '" + table_selector_jq_friendly + "', " + column_number + "); return false;\" class=\"yadcf-filter-reset-button\">" + filter_reset_button_text + "</button>");
							}
						} else {
							$(filter_selector_string).append("<select id=\"yadcf-filter-" + table_selector_jq_friendly + "-" + column_number + "\" class=\"yadcf-filter\" " +
									"onchange=\"yadcf.doFilterCustomDateFunc(this, '" + table_selector_jq_friendly + "', " + column_number + ")\" onmousedown=\"yadcf.stopPropagation(event);\" onclick='yadcf.stopPropagation(event);'>" + column_data + "</select>");
							if (filter_reset_button_text !== false) {
								$(filter_selector_string).find(".yadcf-filter").after("<button type=\"button\" onmousedown=\"yadcf.stopPropagation(event);\" " +
									"onclick=\"yadcf.stopPropagation(event);yadcf.doFilterCustomDateFunc('clear', '" + table_selector_jq_friendly + "', " + column_number + "); return false;\" class=\"yadcf-filter-reset-button\">" + filter_reset_button_text + "</button>");
							}

							if (settingsDt.oFeatures.bStateSave === true && settingsDt.oLoadedState) {
								if (settingsDt.oLoadedState.yadcfState && settingsDt.oLoadedState.yadcfState[table_selector_jq_friendly] && settingsDt.oLoadedState.yadcfState[table_selector_jq_friendly][column_number]) {
									tmpStr = settingsDt.oLoadedState.yadcfState[table_selector_jq_friendly][column_number].from;
									if (tmpStr === '-1' || tmpStr === undefined) {
										$('#yadcf-filter-' + table_selector_jq_friendly + '-' + column_number).val(tmpStr);
									} else {
										$('#yadcf-filter-' + table_selector_jq_friendly + '-' + column_number).val(tmpStr).addClass("inuse");
									}
								}
							}
							if (settingsDt.oFeatures.bServerSide !== true) {
								addCustomFunctionFilterCapability(table_selector_jq_friendly, "yadcf-filter-" + table_selector_jq_friendly + "-" + column_number, column_number);
							}
						}

						if (settingsDt.aoPreSearchCols[column_position].sSearch !== '') {
							tmpStr = settingsDt.aoPreSearchCols[column_position].sSearch;
							tmpStr = yadcfParseMatchFilter(tmpStr, getOptions(oTable.selector)[column_number].filter_match_mode);
							$('#yadcf-filter-' + table_selector_jq_friendly + '-' + column_number).val(tmpStr).addClass("inuse");
						}

						if (columnObj.select_type !== undefined && columnObj.select_type === 'chosen') {
							$("#yadcf-filter-" + table_selector_jq_friendly + "-" + column_number).chosen(columnObj.select_type_options);
							$("#yadcf-filter-" + table_selector_jq_friendly + "-" + column_number).next().attr("onclick", "yadcf.stopPropagation(event);").attr("onmousedown", "yadcf.stopPropagation(event);");
						} else if (columnObj.select_type !== undefined && columnObj.select_type === 'select2') {
							$("#yadcf-filter-" + table_selector_jq_friendly + "-" + column_number).select2(columnObj.select_type_options);
						}

					} else if (columnObj.filter_type === "multi_select" || columnObj.filter_type === 'multi_select_custom_func') {

						//add a wrapper to hold both filter and reset button
						$(filter_selector_string).append("<div id=\"yadcf-filter-wrapper-" + table_selector_jq_friendly + "-" + column_number + "\" class=\"yadcf-filter-wrapper\"></div>");
						filter_selector_string = filter_selector_string + " div.yadcf-filter-wrapper";

						if (columnObj.filter_type === "multi_select") {
							$(filter_selector_string).append("<select multiple data-placeholder=\"" + filter_default_label + "\" id=\"yadcf-filter-" + table_selector_jq_friendly + "-" + column_number + "\" class=\"yadcf-filter\" " +
								"onchange=\"yadcf.doFilterMultiSelect(this, '" + table_selector_jq_friendly + "', " + column_number + ", '" + filter_match_mode + "')\" onmousedown=\"yadcf.stopPropagation(event);\" onclick='yadcf.stopPropagation(event);'>" + column_data + "</select>");

							if (filter_reset_button_text !== false) {
								$(filter_selector_string).find(".yadcf-filter").after("<button type=\"button\" onmousedown=\"yadcf.stopPropagation(event);\" " +
									"onclick=\"yadcf.stopPropagation(event);yadcf.doFilter('clear', '" + table_selector_jq_friendly + "', " + column_number + "); return false;\" class=\"yadcf-filter-reset-button\">" + filter_reset_button_text + "</button>");
							}

							if (settingsDt.aoPreSearchCols[column_position].sSearch !== '') {
								tmpStr = settingsDt.aoPreSearchCols[column_position].sSearch;
								tmpStr = yadcfParseMatchFilterMultiSelect(tmpStr, getOptions(oTable.selector)[column_number].filter_match_mode);
								tmpStr = tmpStr.replace(/\\/g, "");
								tmpStr = tmpStr.split("|");
								$('#yadcf-filter-' + table_selector_jq_friendly + '-' + column_number).val(tmpStr);
							}
						} else {
							$(filter_selector_string).append("<select multiple data-placeholder=\"" + filter_default_label + "\" id=\"yadcf-filter-" + table_selector_jq_friendly + "-" + column_number + "\" class=\"yadcf-filter\" " +
								"onchange=\"yadcf.doFilterCustomDateFunc(this, '" + table_selector_jq_friendly + "', " + column_number + ")\" onmousedown=\"yadcf.stopPropagation(event);\" onclick='yadcf.stopPropagation(event);'>" + column_data + "</select>");

							if (filter_reset_button_text !== false) {
								$(filter_selector_string).find(".yadcf-filter").after("<button type=\"button\" onmousedown=\"yadcf.stopPropagation(event);\" " +
									"onclick=\"yadcf.stopPropagation(event);yadcf.doFilterCustomDateFunc('clear', '" + table_selector_jq_friendly + "', " + column_number + "); return false;\" class=\"yadcf-filter-reset-button\">" + filter_reset_button_text + "</button>");
							}

							if (settingsDt.oFeatures.bStateSave === true && settingsDt.oLoadedState) {
								if (settingsDt.oLoadedState.yadcfState && settingsDt.oLoadedState.yadcfState[table_selector_jq_friendly] && settingsDt.oLoadedState.yadcfState[table_selector_jq_friendly][column_number]) {
									tmpStr = settingsDt.oLoadedState.yadcfState[table_selector_jq_friendly][column_number].from;
									if (tmpStr === '-1' || tmpStr === undefined) {
										$('#yadcf-filter-' + table_selector_jq_friendly + '-' + column_number).val(tmpStr);
									} else {
										$('#yadcf-filter-' + table_selector_jq_friendly + '-' + column_number).val(tmpStr).addClass("inuse");
									}
								}
							}
							if (settingsDt.oFeatures.bServerSide !== true) {
								addCustomFunctionFilterCapability(table_selector_jq_friendly, "yadcf-filter-" + table_selector_jq_friendly + "-" + column_number, column_number);
							}
						}

						if (columnObj.filter_container_id === undefined && columnObj.select_type_options.width === undefined) {
							columnObj.select_type_options = $.extend(columnObj.select_type_options, {width: $(filter_selector_string).closest("th").width() + "px"});
						}
						if (columnObj.select_type !== undefined && columnObj.select_type === 'chosen') {
							$("#yadcf-filter-" + table_selector_jq_friendly + "-" + column_number).chosen(columnObj.select_type_options);
							$("#yadcf-filter-" + table_selector_jq_friendly + "-" + column_number).next().attr("onclick", "yadcf.stopPropagation(event);").attr("onmousedown", "yadcf.stopPropagation(event);");
						} else if (columnObj.select_type !== undefined && columnObj.select_type === 'select2') {
							$("#yadcf-filter-" + table_selector_jq_friendly + "-" + column_number).select2(columnObj.select_type_options);
						}

					} else if (columnObj.filter_type === "auto_complete") {

						//add a wrapper to hold both filter and reset button
						$(filter_selector_string).append("<div id=\"yadcf-filter-wrapper-" + table_selector_jq_friendly + "-" + column_number + "\" class=\"yadcf-filter-wrapper\"></div>");
						filter_selector_string = filter_selector_string + " div.yadcf-filter-wrapper";

						$(filter_selector_string).append("<input id=\"yadcf-filter-" + table_selector_jq_friendly + "-" + column_number + "\" class=\"yadcf-filter\" onmousedown=\"yadcf.stopPropagation(event);\" onclick='yadcf.stopPropagation(event);"
							+ "' placeholder='" + filter_default_label + "'" + " filter_match_mode='" + filter_match_mode + "'" + " onkeyup=\"yadcf.autocompleteKeyUP('" + table_selector_jq_friendly + "',event);\"></input>");
						$(document).data("yadcf-filter-" + table_selector_jq_friendly + "-" + column_number, column_data);

						if (filter_reset_button_text !== false) {
							$(filter_selector_string).find(".yadcf-filter").after("<button type=\"button\" onmousedown=\"yadcf.stopPropagation(event);\" " +
								"onclick=\"yadcf.stopPropagation(event);yadcf.doFilterAutocomplete('clear', '" + table_selector_jq_friendly + "', " + column_number + "); return false;\" class=\"yadcf-filter-reset-button\">" + filter_reset_button_text + "</button>");
						}

					} else if (columnObj.filter_type === "text") {

						//add a wrapper to hold both filter and reset button
						$(filter_selector_string).append("<div id=\"yadcf-filter-wrapper-" + table_selector_jq_friendly + "-" + column_number + "\" class=\"yadcf-filter-wrapper\"></div>");
						filter_selector_string = filter_selector_string + " div.yadcf-filter-wrapper";

						$(filter_selector_string).append("<input type=\"text\" id=\"yadcf-filter-" + table_selector_jq_friendly + "-" + column_number + "\" class=\"yadcf-filter\" onmousedown=\"yadcf.stopPropagation(event);\" onclick='yadcf.stopPropagation(event);"
							+ "' placeholder='" + filter_default_label + "'" + " filter_match_mode='" + filter_match_mode + "'" + " onkeyup=\"yadcf.textKeyUP('" + table_selector_jq_friendly + "', '" + column_number + "');\"></input>");

						if (filter_reset_button_text !== false) {
							$(filter_selector_string).find(".yadcf-filter").after("<button type=\"button\" " + " id=\"yadcf-filter-" + table_selector_jq_friendly + "-" + column_number + "-reset\" onmousedown=\"yadcf.stopPropagation(event);\" " +
								"onclick=\"yadcf.stopPropagation(event);yadcf.textKeyUP('" + table_selector_jq_friendly + "', '" + column_number + "', 'clear'); return false;\" class=\"yadcf-filter-reset-button\">" + filter_reset_button_text + "</button>");
						}

						if (settingsDt.aoPreSearchCols[column_position].sSearch !== '') {
							tmpStr = settingsDt.aoPreSearchCols[column_position].sSearch;
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
					if (columnObj.filter_plugin_options !== undefined) {
						if (columnObj.filter_plugin_options.source !== undefined) {
							columnObj.filter_plugin_options.select = autocompleteSelect;
						} else {
							columnObj.filter_plugin_options.source = $(document).data("yadcf-filter-" + table_selector_jq_friendly + "-" + column_number);
							columnObj.filter_plugin_options.select = autocompleteSelect;
						}
					} else {
						columnObj.filter_plugin_options = {
							source: $(document).data("yadcf-filter-" + table_selector_jq_friendly + "-" + column_number),
							select: autocompleteSelect
						};
					}
					$("#yadcf-filter-" + table_selector_jq_friendly + "-" + column_number).autocomplete(columnObj.filter_plugin_options);
					if (settingsDt.aoPreSearchCols[column_position].sSearch !== '') {
						tmpStr = settingsDt.aoPreSearchCols[column_position].sSearch;
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
		event = eventTargetFixUp(event);
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
		event = eventTargetFixUp(event);
		$.fn.dataTableExt.iApiIndex = oTablesIndex[table_selector_jq_friendly];
		var oTable = oTables[table_selector_jq_friendly],
			min_val,
			max_val;

		min_val = +$($(event.target).parent().find(".yadcf-filter-range-number-slider-min-tip-hidden")).text();
		max_val = +$($(event.target).parent().find(".yadcf-filter-range-number-slider-max-tip-hidden")).text();

		$("#" + $(event.target).prev().find(".yadcf-filter-range-number-slider").attr("id")).slider("option", "yadcf-reset", true);
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

		event = eventTargetFixUp(event);

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
		event = eventTargetFixUp(event);
		$.fn.dataTableExt.iApiIndex = oTablesIndex[table_selector_jq_friendly];
		var oTable = oTables[table_selector_jq_friendly],
			min,
			max,
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
					oTable.fnFilter(document.getElementById(fromId).value + '-yadcf_delim-' + document.getElementById(toId).value, column_number);
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
		event = eventTargetFixUp(event);
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

	function doFilterMultiTables(tablesSelectors, event, column_number_str, clear) {

		var columnsObj = getOptions(tablesSelectors + '_' + column_number_str)[column_number_str],
			regex = false,
			smart = true,
			caseInsen = true,
			serachVal,
			tablesAsOne,
			tablesArray = oTables[tablesSelectors];

		event = eventTargetFixUp(event);
		tablesAsOne = new $.fn.dataTable.Api(tablesArray);

		if (clear !== undefined || event.target.value === '-1') {
			$(event.target).prev().val("").focus();
			$(event.target).prev().removeClass("inuse");
			if (columnsObj.column_number instanceof Array) {
				tablesAsOne.columns(columnsObj.column_number).search('').draw();
			} else {
				tablesAsOne.search('').draw();
			}
			return;
		}

		$(event.target).addClass("inuse");

		serachVal = event.target.value;
		smart = false;
		caseInsen = columnsObj.case_insensitive;
/*
		if (columnsObj.filter_match_mode === "contains") {
			regex = false;
		} else if (columnsObj.filter_match_mode === "exact") {
			regex = true;
			serachVal = "^" + serachVal + "$";
		} else if (columnsObj.filter_match_mode === "startsWith") {
			regex = true;
			serachVal = "^" + serachVal;
		}*/
		if (columnsObj.column_number instanceof Array) {
			tablesAsOne.columns(columnsObj.column_number).search(serachVal, regex, smart, caseInsen).draw();
		} else {
			tablesAsOne.search(serachVal, regex, smart, caseInsen).draw();
		}
	}

	function textKeyUpMultiTables(tablesSelectors, event, column_number_str, clear) {

		var keyUp,
			columnsObj = getOptions(tablesSelectors + '_' + column_number_str)[column_number_str],
			regex = false,
			smart = true,
			caseInsen = true,
			serachVal,
			tablesAsOne,
			tablesArray = oTables[tablesSelectors];

		event = eventTargetFixUp(event);
		tablesAsOne = new $.fn.dataTable.Api(tablesArray);

		keyUp = function (tablesAsOne, event, clear) {

			if (clear !== undefined || event.target.value === '') {
				if (clear !== undefined) {
					$(event.target).prev().val("").focus();
					$(event.target).prev().removeClass("inuse");
				} else {
					$(event.target).val("").focus();
					$(event.target).removeClass("inuse");
				}
				if (columnsObj.column_number instanceof Array) {
					tablesAsOne.columns(columnsObj.column_number).search('').draw();
				} else {
					tablesAsOne.search('').draw();
				}
				return;
			}

			$(event.target).addClass("inuse");

			serachVal = event.target.value;
			smart = false;
			caseInsen = columnsObj.case_insensitive;
/*
			if (columnsObj.filter_match_mode === "contains") {
				regex = false;
			} else if (columnsObj.filter_match_mode === "exact") {
				regex = true;
				serachVal = "^" + serachVal + "$";
			} else if (columnsObj.filter_match_mode === "startsWith") {
				regex = true;
				serachVal = "^" + serachVal;
			}
*/
			if (columnsObj.column_number instanceof Array) {
				tablesAsOne.columns(columnsObj.column_number).search(serachVal, regex, smart, caseInsen).draw();
			} else {
				tablesAsOne.search(serachVal, regex, smart, caseInsen).draw();
			}

		};

		if (columnsObj.filter_delay === undefined) {
			keyUp(tablesAsOne, event, clear);
		} else {
			yadcfDelay(function () {
				keyUp(tablesAsOne, event, clear);
			}, columnsObj.filter_delay);
		}
	}

	function textKeyUP(table_selector_jq_friendly, column_number, clear) {
		var column_number_filter,
			oTable = oTables[table_selector_jq_friendly],
			keyUp,
			options,
			settingsDt = getSettingsObjFromTable(oTable);

		if (settingsDt.oSavedState != null && settingsDt.oSavedState.ColReorder !== undefined) {
			initColReorder(settingsDt.oSavedState, table_selector_jq_friendly);
			column_number_filter = plugins[table_selector_jq_friendly].ColReorder[column_number];
		} else {
			column_number_filter = column_number;
		}
		options = getOptions(oTable.selector)[column_number];

		keyUp = function (table_selector_jq_friendly, column_number, clear) {
			$.fn.dataTableExt.iApiIndex = oTablesIndex[table_selector_jq_friendly];

			if (clear !== undefined || $("#yadcf-filter-" + table_selector_jq_friendly + "-" + column_number).val() === '') {
				$("#yadcf-filter-" + table_selector_jq_friendly + "-" + column_number).val("").focus();
				$("#yadcf-filter-" + table_selector_jq_friendly + "-" + column_number).removeClass("inuse");
				oTable.fnFilter("", column_number_filter);
				resetIApiIndex();
				return;
			}

			$("#yadcf-filter-" + table_selector_jq_friendly + "-" + column_number).addClass("inuse");

			yadcfMatchFilter(oTable, $("#yadcf-filter-" + table_selector_jq_friendly + "-" + column_number).val(), options.filter_match_mode, column_number_filter);

			resetIApiIndex();
		};

		if (options.filter_delay === undefined) {
			keyUp(table_selector_jq_friendly, column_number, clear);
		} else {
			yadcfDelay(function () {
				keyUp(table_selector_jq_friendly, column_number, clear);
			}, options.filter_delay);
		}
	}

	function autocompleteKeyUP(table_selector_jq_friendly, event) {
		event = eventTargetFixUp(event);

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

	function isDOMSource(tableVar) {
		if (tableVar.fnSettings().sAjaxSource == null && tableVar.fnSettings().ajax == null) {
			return true;
		}
		return false;
	}

	function scrollXYHandler(oTable, table_selector) {
		var $tmpSelector,
			filters_position = $(document).data(table_selector + "_filters_position"),
			table_selector_jq_friendly = yadcf.generateTableSelectorJQFriendly(table_selector);

		if (filters_position === 'thead') {
			filters_position = '.dataTables_scrollHead';
		} else {
			filters_position = '.dataTables_scrollFoot';
		}
		if (oTable.fnSettings().oScroll.sX !== '' || oTable.fnSettings().oScroll.sY !== '') {
			$tmpSelector = $(table_selector).closest('.dataTables_scroll').find(filters_position + ' table');
			$tmpSelector.addClass('yadcf-datatables-table-' + table_selector_jq_friendly);
		}
	}

	function initAndBindTable(oTable, table_selector, index) {

		var table_selector_jq_friendly = yadcf.generateTableSelectorJQFriendly(table_selector),
			table_selector_tmp;
        oTables[table_selector_jq_friendly] = oTable;
		oTablesIndex[table_selector_jq_friendly] = index;

		scrollXYHandler(oTable, table_selector);

        if (isDOMSource(oTable)) {
			table_selector_tmp = table_selector;
			if (table_selector.indexOf(":eq") !== -1) {
				table_selector_tmp = table_selector.substring(0, table_selector.lastIndexOf(":eq"));
			}
			appendFilters(oTable, yadcf.getOptions(table_selector_tmp), table_selector);
        } else {
			appendFilters(oTable, yadcf.getOptions(table_selector), table_selector);
			if (yadcfVersionCheck('1.10')) {
				$(document).off('draw.dt', oTable.selector).on('draw.dt', oTable.selector, function (event, ui) {
					appendFilters(oTable, yadcf.getOptions(ui.oInstance.selector), ui.oInstance.selector);
				});
				$(document).off('xhr.dt', oTable.selector).on('xhr.dt', oTable.selector, function (e, settings, json) {
					var col_num,
						column_number_filter,
						table_selector_jq_friendly = generateTableSelectorJQFriendly(oTable.selector);
					if (settings.oSavedState !== null) {
						initColReorder(settings.oSavedState, table_selector_jq_friendly);
					}
					for (col_num in yadcf.getOptions(settings.oInstance.selector)) {
						if (yadcf.getOptions(settings.oInstance.selector).hasOwnProperty(col_num)) {
							if (json['yadcf_data_' + col_num] !== undefined) {
								column_number_filter = col_num;
								if (settings.oSavedState !== null) {
									column_number_filter = plugins[table_selector_jq_friendly].ColReorder[col_num];
								}
								yadcf.getOptions(settings.oInstance.selector)[col_num].data = json['yadcf_data_' + column_number_filter];
							}
						}
					}
				});
				$(document).off('column-reorder.dt', oTable.selector).on('column-reorder.dt', oTable.selector, function (e, settings, json) {
					var table_selector_jq_friendly = generateTableSelectorJQFriendly(oTable.selector);
					initColReorder('', table_selector_jq_friendly, true);
				});
				$(document).off('column-visibility.dt', oTable.selector).on('column-visibility.dt', oTable.selector, function (e, settings, col_num, state) {
					var obj = {};
					if (state === true) {
						if (settings.oSavedState != null && settings.oSavedState.ColReorder !== undefined) {
							col_num = settings.oSavedState.ColReorder[col_num];
						}
						obj[col_num] = yadcf.getOptions(settings.oInstance.selector)[col_num];
						obj[col_num].column_number = col_num;
						if (obj[col_num] !== undefined) {
							appendFilters(oTables[yadcf.generateTableSelectorJQFriendly(settings.oInstance.selector)],
								obj,
								settings.oInstance.selector);
						}
					}
				});
				$(document).off('destroy.dt', oTable.selector).on('destroy.dt', oTable.selector, function (event, ui) {
					removeFilters(oTable, yadcf.getOptions(ui.oInstance.selector), ui.oInstance.selector);
				});
			} else {
				$(document).off('draw', oTable.selector).on('draw', oTable.selector, function (event, ui) {
					appendFilters(oTable, yadcf.getOptions(ui.oInstance.selector), ui.oInstance.selector);
				});
				$(document).off('destroy', oTable.selector).on('destroy', oTable.selector, function (event, ui) {
					removeFilters(oTable, yadcf.getOptions(ui.oInstance.selector), ui.oInstance.selector);
				});
			}
        }
		//destroy event affects both DOM and Ajax
		if (yadcfVersionCheck('1.10')) {
			$(document).off('destroy.dt', oTable.selector).on('destroy.dt', oTable.selector, function (event, ui) {
				removeFilters(oTable, yadcf.getOptions(ui.oInstance.selector), ui.oInstance.selector);
			});
		} else {
			$(document).off('destroy', oTable.selector).on('destroy', oTable.selector, function (event, ui) {
				removeFilters(oTable, yadcf.getOptions(ui.oInstance.selector), ui.oInstance.selector);
			});
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
			if (isDOMSource(oTable)) {
				//we need to make sure that the yadcf state will be saved after page reload
				oTable.fnSettings().oApi._fnSaveState(oTable.fnSettings());
				//redraw the table in order to apply the filters
				oTable.fnDraw(false);
			}
		}
	}

    $.fn.yadcf = function (options_arg, filters_position) {

		if (filters_position === undefined || filters_position === 'header') {
			filters_position = 'thead';
		} else {
			filters_position = 'tfoot';
		}
		$(document).data(this.selector + "_filters_position", filters_position);

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

	function init(oTable, options_arg, filters_position) {
		var instance = oTable.settings()[0].oInstance,
			i = 0,
			selector;

		if (filters_position === undefined || filters_position === 'header') {
			filters_position = 'thead';
		} else {
			filters_position = 'tfoot';
		}
		$(document).data(instance.selector + "_filters_position", filters_position);

		if ($(instance.selector).length === 1) {
			setOptions(instance.selector, options_arg);
			initAndBindTable(instance, instance.selector, 0, oTable);
		} else {
			for (i; i < $(instance.selector).length; i++) {
				$.fn.dataTableExt.iApiIndex = i;
				selector = instance.selector + ":eq(" + i + ")";
				setOptions(instance.selector, options_arg);
				initAndBindTable(instance, selector, i, oTable);
			}
			$.fn.dataTableExt.iApiIndex = 0;
		}
	}

	function appendFiltersMultipleTables(tablesArray, tablesSelectors, colObjDummy) {
		var filter_selector_string = "#" + colObjDummy.filter_container_id,
			$filter_selector = $(filter_selector_string).find(".yadcf-filter"),
			table_selector_jq_friendly = yadcf.generateTableSelectorJQFriendlyNew(tablesSelectors),
			options_tmp,
			ii,
			column_number_str = columnsArrayToString(colObjDummy.column_number).column_number_str,
			tableTmp,
			tableTmpArr,
			tableTmpArrIndex,
			filterOptions = getOptions(tablesSelectors + '_' + column_number_str)[column_number_str],
			column_number_index,
			columnsTmpArr;

		//add a wrapper to hold both filter and reset button
		$(filter_selector_string).append("<div id=\"yadcf-filter-wrapper-" + table_selector_jq_friendly + "\" class=\"yadcf-filter-wrapper\"></div>");
		filter_selector_string = filter_selector_string + " div.yadcf-filter-wrapper";

		switch (filterOptions.filter_type) {
		case 'text':
			$(filter_selector_string).append("<input type=\"text\" id=\"yadcf-filter-" + table_selector_jq_friendly + '-' + column_number_str + "\" class=\"yadcf-filter\" onmousedown=\"yadcf.stopPropagation(event);\" onclick='yadcf.stopPropagation(event);"
				+ "' placeholder='" + filterOptions.filter_default_label + "'" + " onkeyup=\"yadcf.textKeyUpMultiTables('" + tablesSelectors + "',event,'" + column_number_str + "');\"></input>");
			if (filterOptions.filter_reset_button_text !== false) {
				$(filter_selector_string).find(".yadcf-filter").after("<button type=\"button\" " + " id=\"yadcf-filter-" + table_selector_jq_friendly + '-' + column_number_str + "-reset\" onmousedown=\"yadcf.stopPropagation(event);\" " +
					"onclick=\"yadcf.stopPropagation(event);yadcf.textKeyUpMultiTables('" + tablesSelectors + "', event,'" + column_number_str + "','clear'); return false;\" class=\"yadcf-filter-reset-button\">" + filterOptions.filter_reset_button_text + "</button>");
			}
			break;
		case 'select':
			options_tmp = "<option value=\"" + "-1" + "\">" + filterOptions.filter_default_label + "</option>";
			if (filterOptions.select_type === 'select2' && filterOptions.select_type_options.placeholder !== undefined && filterOptions.select_type_options.allowClear === true) {
				options_tmp = "<option value=\"\"></option>";
			}

			if (filterOptions.data === undefined) {
				filterOptions.data = [];
				tableTmpArr = tablesSelectors.split(',');
				for (tableTmpArrIndex = 0; tableTmpArrIndex < tableTmpArr.length; tableTmpArrIndex++) {
					tableTmp = $('#' + tablesArray[tableTmpArrIndex].table().node().id).dataTable();
					if (isDOMSource(tableTmp)) {
						//check if ajax source, if so, listen for dt.draw
						columnsTmpArr = filterOptions.column_number;
						for (column_number_index = 0; column_number_index < columnsTmpArr.length; column_number_index++) {
							filterOptions.column_number = columnsTmpArr[column_number_index];
							filterOptions.data = filterOptions.data.concat(parseTableColumn(tableTmp, filterOptions));
						}
						filterOptions.column_number = columnsTmpArr;
					} else {
						$(document).off('draw.dt', '#' + tablesArray[tableTmpArrIndex].table().node().id).on('draw.dt', '#' + tablesArray[tableTmpArrIndex].table().node().id, function (event, ui) {
							var options_tmp = '',
								ii;
							columnsTmpArr = filterOptions.column_number;
							for (column_number_index = 0; column_number_index < columnsTmpArr.length; column_number_index++) {
								filterOptions.column_number = columnsTmpArr[column_number_index];
								filterOptions.data = filterOptions.data.concat(parseTableColumn(tableTmp, filterOptions));
							}
							filterOptions.column_number = columnsTmpArr;
							filterOptions.data = sortColumnData(filterOptions.data, filterOptions);
							for (ii = 0; ii < filterOptions.data.length; ii++) {
								options_tmp += "<option value=\"" + filterOptions.data[ii] + "\">" + filterOptions.data[ii] + "</option>";
							}
							$('#' + filterOptions.filter_container_id + ' select').empty().append(options_tmp);
							if (filterOptions.select_type !== undefined && filterOptions.select_type === 'chosen') {
								$('#' + filterOptions.filter_container_id + ' select').chosen(filterOptions.select_type_options);
								$('#' + filterOptions.filter_container_id + ' select').next().attr("onclick", "yadcf.stopPropagation(event);").attr("onmousedown", "yadcf.stopPropagation(event);");
							} else if (filterOptions.select_type !== undefined && filterOptions.select_type === 'select2') {
								$('#' + filterOptions.filter_container_id + ' select').select2(filterOptions.select_type_options);
							}
						});
					}
				}
			}

			filterOptions.data = sortColumnData(filterOptions.data, filterOptions);

			if (typeof filterOptions.data[0] === 'object') {
				for (ii = 0; ii < filterOptions.data.length; ii++) {
					options_tmp += "<option value=\"" + filterOptions.data[ii].value + "\">" + filterOptions.data[ii].label + "</option>";
				}
			} else {
				for (ii = 0; ii < filterOptions.data.length; ii++) {
					options_tmp += "<option value=\"" + filterOptions.data[ii] + "\">" + filterOptions.data[ii] + "</option>";
				}
			}
			$(filter_selector_string).append("<select id=\"yadcf-filter-" + table_selector_jq_friendly + "\" class=\"yadcf-filter\" " +
				"onchange=\"yadcf.doFilterMultiTables('" + tablesSelectors + "',event,'" + column_number_str + "')\" onmousedown=\"yadcf.stopPropagation(event);\" onclick='yadcf.stopPropagation(event);'>" + options_tmp + "</select>");

			if (filterOptions.select_type !== undefined && filterOptions.select_type === 'chosen') {
				$("#yadcf-filter-" + table_selector_jq_friendly).chosen(filterOptions.select_type_options);
				$("#yadcf-filter-" + table_selector_jq_friendly).next().attr("onclick", "yadcf.stopPropagation(event);").attr("onmousedown", "yadcf.stopPropagation(event);");
			} else if (filterOptions.select_type !== undefined && filterOptions.select_type === 'select2') {
				$("#yadcf-filter-" + table_selector_jq_friendly).select2(filterOptions.select_type_options);
			}
			if (filterOptions.filter_reset_button_text !== false) {
				$(filter_selector_string).find(".yadcf-filter").after("<button type=\"button\" " + " id=\"yadcf-filter-" + table_selector_jq_friendly + "-reset\" onmousedown=\"yadcf.stopPropagation(event);\" " +
					"onclick=\"yadcf.stopPropagation(event);yadcf.doFilterMultiTables('" + tablesSelectors + "', event,'" + column_number_str + "','clear'); return false;\" class=\"yadcf-filter-reset-button\">" + filterOptions.filter_reset_button_text + "</button>");
			}
			break;
		default:
			alert('Filters Multiple Tables does not support ' + filterOptions.filter_type);
		}
	}

	function initMultipleTables(tablesArray, filtersOptions) {
		var i,
			tablesSelectors = '',
			default_options = {
				filter_type : "text",
				filter_container_id: '',
				filter_reset_button_text: 'x',
				case_insensitive: true
			},
			columnsObjKey,
			columnsObj,
			columnsArrIndex,
			column_number_str,
			dummyArr;

		for (columnsArrIndex = 0; columnsArrIndex < filtersOptions.length; columnsArrIndex++) {
			dummyArr = [];
			columnsObj = filtersOptions[columnsArrIndex];
			if (columnsObj.filter_default_label === undefined) {
				if (columnsObj.filter_type === "select" || columnsObj.filter_type === 'custom_func') {
					columnsObj.filter_default_label = "Select value";
				} else if (columnsObj.filter_type === "multi_select" || columnsObj.filter_type === 'multi_select_custom_func') {
					columnsObj.filter_default_label = "Select values";
				} else if (columnsObj.filter_type === "auto_complete" || columnsObj.filter_type === "text") {
					columnsObj.filter_default_label = 'Type to filter';
				} else if (columnsObj.filter_type === "range_number" || columnsObj.filter_type === "range_date") {
					columnsObj.filter_default_label = ["from", "to"];
				} else if (columnsObj.filter_type === "date") {
					columnsObj.filter_default_label = "Select a date";
				}
			}
			columnsObj = $.extend({}, default_options, columnsObj);

			column_number_str = columnsArrayToString(columnsObj.column_number).column_number_str;
			columnsObj.column_number_str = column_number_str;

			dummyArr.push(columnsObj);

			for (i = 0; i < tablesArray.length; i++) {
				tablesSelectors += tablesArray[i].table().node().id + ',';
			}
			tablesSelectors = tablesSelectors.substring(0, tablesSelectors.length - 1);

			setOptions(tablesSelectors + '_' + column_number_str, dummyArr);
			oTables[tablesSelectors] = tablesArray;
			appendFiltersMultipleTables(tablesArray, tablesSelectors, columnsObj);
		}
	}

	function initMultipleColumns(table, filtersOptions) {
		var tablesArray = [];
		tablesArray.push(table);
		initMultipleTables(tablesArray, filtersOptions);
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
			optionsObj,
			min,
			max;
		//check if the table arg is from new datatables API (capital "D")
		if (table_arg.settings !== undefined) {
			table_arg = table_arg.settings()[0].oInstance;
		}
		table_selector_jq_friendly = yadcf.generateTableSelectorJQFriendly(table_arg.selector);
		if (isDOMSource(table_arg) || ajaxSource === true) {
			for (j = 0; j < col_filter_arr.length; j++) {
				column_number = col_filter_arr[j][0];
				optionsObj = getOptions(table_arg.selector)[column_number];
				filter_value = col_filter_arr[j][1];

				switch (optionsObj.filter_type) {
				case 'auto_complete':
				case 'text':
				case 'date':
					$('#yadcf-filter-' + table_selector_jq_friendly + '-' + column_number).val(filter_value).addClass('inuse');
					tmpStr = yadcfMatchFilterString(table_arg, column_number, filter_value, optionsObj.filter_match_mode, false);
					table_arg.fnSettings().aoPreSearchCols[column_number].sSearch = tmpStr;
					break;
				case 'select':
					$('#yadcf-filter-' + table_selector_jq_friendly + '-' + column_number).val(filter_value);
					tmpStr = yadcfMatchFilterString(table_arg, column_number, filter_value, optionsObj.filter_match_mode, false);
					table_arg.fnSettings().aoPreSearchCols[column_number].sSearch = tmpStr;
					if (optionsObj.select_type !== undefined) {
						if (optionsObj.select_type === 'chosen') {
							$('#yadcf-filter-' + table_selector_jq_friendly + '-' + column_number).trigger('chosen:updated');
						} else if (optionsObj.select_type === 'select2') {
							$("#yadcf-filter-" + table_selector_jq_friendly + "-" + column_number).select2("destroy").select2(optionsObj.select_type_options);
						}
					}
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
					if (table_arg.fnSettings().oFeatures.bServerSide === true) {
						min = filter_value.from;
						max = filter_value.to;
						table_arg.fnSettings().aoPreSearchCols[column_number].sSearch = min + '-yadcf_delim-' + max;
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
					if (table_arg.fnSettings().oFeatures.bServerSide === true) {
						table_arg.fnSettings().aoPreSearchCols[column_number].sSearch = filter_value.from + '-yadcf_delim-' + filter_value.to;
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
					if (table_arg.fnSettings().oFeatures.bServerSide === true) {
						table_arg.fnSettings().aoPreSearchCols[column_number].sSearch = filter_value.from + '-yadcf_delim-' + filter_value.to;
					}
					break;
				case 'custom_func':
				case 'multi_select_custom_func':
					$('#yadcf-filter-' + table_selector_jq_friendly + '-' + column_number).val(filter_value).addClass('inuse');
					if (table_arg.fnSettings().oFeatures.bServerSide === true) {
						table_arg.fnSettings().aoPreSearchCols[column_number].sSearch = filter_value;
					}
					if (optionsObj.select_type !== undefined) {
						if (optionsObj.select_type === 'chosen') {
							$('#yadcf-filter-' + table_selector_jq_friendly + '-' + column_number).trigger('chosen:updated');
						} else if (optionsObj.select_type === 'select2') {
							$("#yadcf-filter-" + table_selector_jq_friendly + "-" + column_number).select2("destroy").select2(optionsObj.select_type_options);
						}
					}
					break;
				}
			}
			if (table_arg.fnSettings().oFeatures.bServerSide !== true) {
				table_arg.fnDraw();
			} else {
				setTimeout(function () {
					table_arg.fnDraw();
				}, 10);
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
			optionsObj;

		//check if the table arg is from new datatables API (capital "D")
		if (table_arg.settings !== undefined) {
			table_arg = table_arg.settings()[0].oInstance;
		}

		optionsObj = getOptions(table_arg.selector)[column_number];
		table_selector_jq_friendly = yadcf.generateTableSelectorJQFriendly(table_arg.selector);

		switch (optionsObj.filter_type) {
		case 'select':
		case 'custom_func':
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
		default:
			console.log('exGetColumnFilterVal error: no such filter_type: ' + optionsObj.filter_type);
		}
		return retVal;
	}

	function exResetAllFilters(table_arg) {
		var table_selector_jq_friendly,
			column_number,
			fromId,
			toId,
			sliderId,
			tableOptions,
			optionsObj,
			columnObjKey;
		//check if the table arg is from new datatables API (capital "D")
		if (table_arg.settings !== undefined) {
			table_arg = table_arg.settings()[0].oInstance;
		}
		tableOptions = getOptions(table_arg.selector);
		table_selector_jq_friendly = yadcf.generateTableSelectorJQFriendly(table_arg.selector);

		for (columnObjKey in tableOptions) {
			if (tableOptions.hasOwnProperty(columnObjKey)) {
				optionsObj = tableOptions[columnObjKey];
				column_number = optionsObj.column_number;
				$(document).removeData("#yadcf-filter-" + table_selector_jq_friendly + "-" + column_number + "_val");

				switch (optionsObj.filter_type) {
				case 'select':
				case 'custom_func':
					$('#yadcf-filter-' + table_selector_jq_friendly + '-' + column_number).val('-1').removeClass('inuse');
					table_arg.fnSettings().aoPreSearchCols[column_number].sSearch = '';
					if (optionsObj.select_type !== undefined) {
						if (optionsObj.select_type === 'chosen') {
							$('#yadcf-filter-' + table_selector_jq_friendly + '-' + column_number).trigger('chosen:updated');
						} else if (optionsObj.select_type === 'select2') {
							$("#yadcf-filter-" + table_selector_jq_friendly + "-" + column_number).select2("destroy").select2(optionsObj.select_type_options);
						}
					}
					break;
				case 'auto_complete':
				case 'text':
				case 'date':
					$('#yadcf-filter-' + table_selector_jq_friendly + '-' + column_number).val('').removeClass('inuse');
					table_arg.fnSettings().aoPreSearchCols[column_number].sSearch = '';
					break;
				case 'multi_select':
				case 'multi_select_custom_func':
					$('#yadcf-filter-' + table_selector_jq_friendly + '-' + column_number).val('-1');
					$(document).data("#yadcf-filter-" + table_selector_jq_friendly + "-" + column_number + "_val", undefined);
					table_arg.fnSettings().aoPreSearchCols[column_number].sSearch = '';
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
					$('#' + fromId).val('');
					$('#' + fromId).removeClass('inuse');
					$('#' + toId).val('');
					$('#' + toId).removeClass('inuse');
					if (table_arg.fnSettings().oFeatures.bServerSide === true) {
						table_arg.fnSettings().aoPreSearchCols[column_number].sSearch = '';
					}
					break;
				case 'range_number':
					fromId = 'yadcf-filter-' + table_selector_jq_friendly + '-from-' + column_number;
					toId = 'yadcf-filter-' + table_selector_jq_friendly + '-to-' + column_number;
					$('#' + fromId).val('');
					$('#' + fromId).removeClass('inuse');
					$('#' + toId).val('');
					$('#' + toId).removeClass('inuse');
					if (table_arg.fnSettings().oFeatures.bServerSide === true) {
						table_arg.fnSettings().aoPreSearchCols[column_number].sSearch = '';
					}
					break;
				case 'range_number_slider':
					sliderId = 'yadcf-filter-' + table_selector_jq_friendly + '-slider-' + column_number;
					fromId = 'yadcf-filter-' + table_selector_jq_friendly + '-min_tip-' + column_number;
					toId = 'yadcf-filter-' + table_selector_jq_friendly + '-max_tip-' + column_number;
					$('#' + fromId).text('');
					$('#' + fromId).parent().removeClass('inuse');
					$('#' + fromId).parent().parent().find('ui-slider-range').removeClass('inuse');
					$('#' + toId).text('');
					$('#' + toId).parent().removeClass('inuse');
					$('#' + toId).parent().parent().find('.ui-slider-range').removeClass('inuse');
					$('#' + sliderId).slider("option", "values", [$('#' + fromId).parent().parent().find('.yadcf-filter-range-number-slider-min-tip-hidden').text(), $('#' + fromId).parent().parent().find('.yadcf-filter-range-number-slider-max-tip-hidden').text()]);
					if (table_arg.fnSettings().oFeatures.bServerSide === true) {
						table_arg.fnSettings().aoPreSearchCols[column_number].sSearch = '';
					}
					break;
				}

			}
		}
		table_arg.fnDraw();
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
		exResetAllFilters: exResetAllFilters,
		dateKeyUP : dateKeyUP,
		dateSelectSingle : dateSelectSingle,
		textKeyUP : textKeyUP,
		doFilterCustomDateFunc : doFilterCustomDateFunc,
		eventTargetFixUp : eventTargetFixUp,
		initMultipleTables: initMultipleTables,
		initMultipleColumns: initMultipleColumns,
		textKeyUpMultiTables: textKeyUpMultiTables,
		doFilterMultiTables: doFilterMultiTables,
		generateTableSelectorJQFriendlyNew: generateTableSelectorJQFriendlyNew
    };

}(jQuery));
