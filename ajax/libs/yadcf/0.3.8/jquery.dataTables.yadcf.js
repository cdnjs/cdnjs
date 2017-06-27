/*global $, jQuery*/
/*jslint plusplus: true */

/*
*
* Yet Another DataTables Column Filter - (yadcf)
* 
* File:        jquery.dataTables.yadcf.js
* Version:     0.3.8
* Author:      Daniel Reznick
* Info:        https://github.com/vedmack/yadcf
* Contact:     vedmack@gmail.com	
* 
* Copyright 2013 Daniel Reznick, all rights reserved.
*
* Dual licensed under two licenses: GPL v2 license or a BSD (3-point) license (just like DataTables itself)
* 
* This source file is distributed in the hope that it will be useful, but 
* WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY 
* or FITNESS FOR A PARTICULAR PURPOSE. See the license files for details.
* 
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
				Possible values:	select / auto_complete / range_number / range_number_slider
				Description:		The type of the filter to be used in the column

* data
				Required:			false
				Type:				Array
				Description:		When the need of predefined data for filter is needed just use an array ["value1","value2"....] 
					
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
				Type:				String
				Default value:		x
				Description:		The text that will appear inside the reset button next to the select drop down

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
*
*
*/
var yadcf = (function ($) {

	'use strict';

	var oTables = {},
		oTablesIndex = {},
		options = {};

	function resetIApiIndex() {
		$.fn.dataTableExt.iApiIndex = 0;
	}

	function doFilter(arg, table_selector_jq_friendly, column_number) {
		$.fn.dataTableExt.iApiIndex = oTablesIndex[table_selector_jq_friendly];
		var oTable = oTables[table_selector_jq_friendly];

		if (arg === "clear") {
			$("#yadcf-filter-" + table_selector_jq_friendly + "-" + column_number).val("-1").focus();
			$("#yadcf-filter-" + table_selector_jq_friendly + "-" + column_number).removeClass("inuse");
			$(document).data("#yadcf-filter-" + table_selector_jq_friendly + "-" + column_number + "_val", "-1");
			oTable.fnFilter("", column_number);
			resetIApiIndex();
			return;
		}

		$("#yadcf-filter-" + table_selector_jq_friendly + "-" + column_number).addClass("inuse");

		$(document).data("#yadcf-filter-" + table_selector_jq_friendly + "-" + column_number + "_val", arg.value);

		if (arg.value !== "-1") {
			oTable.fnFilter($(arg).find('option:selected').text(), column_number, false, false, true, true);
		} else {
			oTable.fnFilter("", column_number);
			$("#yadcf-filter-" + table_selector_jq_friendly + "-" + column_number).removeClass("inuse");
		}
		resetIApiIndex();
	}

	function doFilterAutocomplete(arg, table_selector_jq_friendly, column_number) {
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
		oTable.fnFilter(arg.value, column_number, false, false, true, true);
		resetIApiIndex();
	}

	function autocompleteSelect(event, ui) {

		var table_column = event.target.id.replace("yadcf-filter-", ""),
			dashIndex = table_column.lastIndexOf("-"),
			table_selector_jq_friendly = table_column.substring(0, dashIndex),
			col_num = parseInt(table_column.substring(dashIndex + 1), 10);
		doFilterAutocomplete(ui.item, table_selector_jq_friendly, col_num);
	}

	function sortNumAsc(a, b) {
		return a - b;
	}

	function sortNumDesc(a, b) {
		return b - a;
	}

	function findMinInArray(array) {
		var narray = [], i;
		for (i = 0; i < array.length; i++) {
			if (array[i] !== null) {
				narray.push(array[i]);
			}
		}
		return Math.min.apply(Math, narray);
	}

	function findMaxInArray(array) {
		var narray = [], i;
		for (i = 0; i < array.length; i++) {
			if (array[i] !== null) {
				narray.push(array[i]);
			}
		}
		return Math.max.apply(Math, narray);
	}

	function addRangeNumberFilterCapability(table_selector_jq_friendly, fromId, toId, col_num) {

		$.fn.dataTableExt.afnFiltering.push(
			function (oSettings, aData, iDataIndex) {
				var min = document.getElementById(fromId).value,
					max = document.getElementById(toId).value,
					val = aData[col_num] === "-" ? 0 : aData[col_num],
					retVal = false,
					table_selector_jq_friendly_local = table_selector_jq_friendly,
					current_table_selector_jq_friendly = oSettings.oInstance.selector.replace(":", "-").replace("(", "").replace(")", "").replace(".", "-").replace("#", "-");

				if (table_selector_jq_friendly_local !== current_table_selector_jq_friendly) {
					return true;
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

	function addRangeNumberSliderFilterCapability(table_selector_jq_friendly, fromId, toId, col_num) {

		$.fn.dataTableExt.afnFiltering.push(
			function (oSettings, aData, iDataIndex) {
				var min = document.getElementById(fromId).innerHTML,
					max = document.getElementById(toId).innerHTML,
					val = aData[col_num] === "-" ? 0 : aData[col_num],
					retVal = false,
					table_selector_jq_friendly_local = table_selector_jq_friendly,
					current_table_selector_jq_friendly = oSettings.oInstance.selector.replace(":", "-").replace("(", "").replace(")", "").replace(".", "-").replace("#", "-");

				if (table_selector_jq_friendly_local !== current_table_selector_jq_friendly) {
					return true;
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

	function addRangeNumberFilter(filter_selector_string, table_selector_jq_friendly, column_number, filter_reset_button_text, filter_default_label) {
		var fromId = "yadcf-filter-" + table_selector_jq_friendly + "-from-" + column_number,
			toId = "yadcf-filter-" + table_selector_jq_friendly + "-to-" + column_number,
			filter_selector_string_tmp,
			filter_wrapper_id;

		filter_wrapper_id = "yadcf-filter-wrapper-" + table_selector_jq_friendly + "-" + column_number;

		if ($("#" + filter_wrapper_id).length > 0) {
			return;
		}

		addRangeNumberFilterCapability(table_selector_jq_friendly, fromId, toId, column_number);

		//add a wrapper to hold both filter and reset button
		$(filter_selector_string).append("<div onclick=\"yadcf.stopPropagation(event);\" id=\"" + filter_wrapper_id + "\" class=\"yadcf-filter-wrapper\"></div>");
		filter_selector_string = filter_selector_string + " div.yadcf-filter-wrapper";
		filter_selector_string_tmp = filter_selector_string;

		$(filter_selector_string).append("<div id=\"yadcf-filter-wrapper-inner-" + table_selector_jq_friendly + "-" + column_number + "\" class=\"yadcf-filter-wrapper-inner\"></div>");
		filter_selector_string = filter_selector_string + " div.yadcf-filter-wrapper-inner";

		$(filter_selector_string).append("<input placeholder=\"" + filter_default_label[0] + "\" id=\"" + fromId + "\" class=\"yadcf-filter-range-number\" onkeyup=\"yadcf.rangeNumberKeyUP('" + table_selector_jq_friendly + "',event);\">" +
			"</input>");
		$(filter_selector_string).append("<span class=\"yadcf-filter-range-number-seperator\" >" +
			"</span>");
		$(filter_selector_string).append("<input placeholder=\"" + filter_default_label[1] + "\" id=\"" + toId + "\" class=\"yadcf-filter-range-number\" onkeyup=\"yadcf.rangeNumberKeyUP('" + table_selector_jq_friendly + "',event);\">" +
			"</input>");

		$(filter_selector_string_tmp).append("<input value=\"" + filter_reset_button_text + "\" type=\"button\" " +
			"onclick=\"yadcf.stopPropagation(event);yadcf.rangeNumberClear('" + table_selector_jq_friendly + "',event); return false;\" class=\"yadcf-filter-reset-button\">");
	}

	function rangeNumberSldierDrawTips(min_tip_val, max_tip_val, min_tip_id, max_tip_id, table_selector_jq_friendly, column_number) {
		var first_handle = $("#yadcf-filter-wrapper-inner-" + table_selector_jq_friendly + "-" + column_number + " .ui-slider-handle:first"),
			last_handle = $("#yadcf-filter-wrapper-inner-" + table_selector_jq_friendly + "-" + column_number + " .ui-slider-handle:last"),
			min_tip_inner,
			max_tip_inner;

		min_tip_inner = "<span id=\"" + min_tip_id + "\" class=\"yadcf-filter-range-number-slider-min-tip-inner\">" + min_tip_val + "</span>";
		max_tip_inner = "<span id=\"" + max_tip_id + "\" class=\"yadcf-filter-range-number-slider-max-tip-inner\">" + max_tip_val + "</span>";

		$(first_handle).addClass("yadcf-filter-range-number-slider-min-tip").html(min_tip_inner);
		$(last_handle).addClass("yadcf-filter-range-number-slider-max-tip").html(max_tip_inner);
	}

	function rangeNumberSliderChange(table_selector_jq_friendly, event, ui) {
		var oTable,
			min_val,
			max_val,
			slider_inuse;

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

		resetIApiIndex();
	}

	function addRangeNumberSliderFilter(filter_selector_string, table_selector_jq_friendly, column_number, filter_reset_button_text, min_val, max_val) {
		var sliderId = "yadcf-filter-" + table_selector_jq_friendly + "-slider-" + column_number,
			min_tip_id = "yadcf-filter-" + table_selector_jq_friendly + "-min_tip-" + column_number,
			max_tip_id = "yadcf-filter-" + table_selector_jq_friendly + "-max_tip-" + column_number,
			filter_selector_string_tmp,
			filter_wrapper_id;

		filter_wrapper_id = "yadcf-filter-wrapper-" + table_selector_jq_friendly + "-" + column_number;

		if ($("#" + filter_wrapper_id).length > 0) {
			return;
		}

		addRangeNumberSliderFilterCapability(table_selector_jq_friendly, min_tip_id, max_tip_id, column_number);

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

		$("#" + sliderId).slider({
			range: true,
			min: min_val,
			max: max_val,
			values: [min_val, max_val],
			create: function (event, ui) {
				rangeNumberSldierDrawTips(min_val, max_val, min_tip_id, max_tip_id, table_selector_jq_friendly, column_number);
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

		$(filter_selector_string_tmp).append("<input value=\"" + filter_reset_button_text + "\" type=\"button\" " +
			"onclick=\"yadcf.stopPropagation(event);yadcf.rangeNumberSliderClear('" + table_selector_jq_friendly + "',event); return false;\" class=\"yadcf-filter-reset-button range-number-slider-reset-button\">");
	}

	function appendSelectFilter(oTable, args, table_selector) {

		var i = 0,
			$filter_selector,
			filter_selector_string,

			data,
			filter_container_id,
			column_number,
			column_data_type,
			html_data_type,
			text_data_delimiter,
			filter_default_label,
			filter_reset_button_text,
			enable_auto_complete,
			sort_as,
			sort_order,

			options,
			options_tmp,
			j,
			k,
			data_length,
			col_inner_elements,
			col_inner_data,
			col_filter_array = {},
			ii,
			default_options = {
				filter_type : "select",
				enable_auto_complete : false,
				sort_as : "alpha",
				sort_order : "asc"
			},
			table_selector_jq_friendly,
			min_val,
			max_val;


		for (i; i < args.length; i++) {

			args[i] = $.extend({}, default_options, args[i]);

			data = args[i].data;
			filter_container_id = args[i].filter_container_id;
			column_number = args[i].column_number;
			column_data_type = args[i].column_data_type;
			html_data_type = args[i].html_data_type;
			text_data_delimiter = args[i].text_data_delimiter;
			filter_default_label = args[i].filter_default_label;
			filter_reset_button_text = args[i].filter_reset_button_text;
			enable_auto_complete = args[i].enable_auto_complete;
			sort_as = args[i].sort_as;
			sort_order = args[i].sort_order;

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
				} else if (args[i].filter_type === "auto_complete") {
					filter_default_label = "Type a value";
				} else if (args[i].filter_type === "range_number") {
					filter_default_label = ["from", "to"];
				}
			}

			if (filter_reset_button_text === undefined) {
				filter_reset_button_text = "x";
			}

			options = [];

			if (data === undefined) {
				data = oTable._('tr');
				data_length = data.length;

				for (j = 0; j < data_length; j++) {
					if (column_data_type === "html") {
						col_inner_elements = $(data[j][column_number]);
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
							col_inner_elements = data[j][column_number].split(text_data_delimiter);
							for (k = 0; k < col_inner_elements.length; k++) {
								col_inner_data = col_inner_elements[k];
								if (!(col_filter_array.hasOwnProperty(col_inner_data))) {
									col_filter_array[col_inner_data] = col_inner_data;
									options.push(col_inner_data);
								}
							}
						} else {
							col_inner_data = data[j][column_number];
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
				min_val = findMinInArray(options);
				max_val = findMaxInArray(options);
			}


			if (filter_container_id === undefined) {
				filter_selector_string = table_selector + " thead th:eq(" + column_number + ")";
				$filter_selector = $(filter_selector_string).find(".yadcf-filter");
			} else {
				filter_selector_string = "#" + filter_container_id;
				$filter_selector = $(filter_selector_string).find(".yadcf-filter");
			}

			table_selector_jq_friendly = table_selector.replace(":", "-").replace("(", "").replace(")", "").replace(".", "-").replace("#", "-");

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
				} else if (args[i].filter_type === "auto_complete") {
					$(document).data("yadcf-filter-" + table_selector_jq_friendly + "-" + column_number, options);
				}
			} else {

				if (filter_container_id === undefined) {

					if ($(filter_selector_string + " div.DataTables_sort_wrapper").length > 0) {
						$(filter_selector_string + " div.DataTables_sort_wrapper").css("display", "inline-block");
					}

					if (args[i].filter_type === "select") {

						//add a wrapper to hold both filter and reset button
						$(filter_selector_string).append("<div id=\"yadcf-filter-wrapper-" + table_selector_jq_friendly + "-" + column_number + "\" class=\"yadcf-filter-wrapper\"></div>");
						filter_selector_string = filter_selector_string + " div.yadcf-filter-wrapper";

						$(filter_selector_string).append("<select id=\"yadcf-filter-" + table_selector_jq_friendly + "-" + column_number + "\" class=\"yadcf-filter\" " +
							"onchange=\"yadcf.doFilter(this, '" + table_selector_jq_friendly + "', " + column_number + ")\" onclick='yadcf.stopPropagation(event);'>" + options + "</select>");
						$(filter_selector_string).find(".yadcf-filter").after("<input value=\"" + filter_reset_button_text + "\" type=\"button\" " +
							"onclick=\"yadcf.stopPropagation(event);yadcf.doFilter('clear', '" + table_selector_jq_friendly + "', " + column_number + "); return false;\" class=\"yadcf-filter-reset-button\">");

					} else if (args[i].filter_type === "auto_complete") {

						//add a wrapper to hold both filter and reset button
						$(filter_selector_string).append("<div id=\"yadcf-filter-wrapper-" + table_selector_jq_friendly + "-" + column_number + "\" class=\"yadcf-filter-wrapper\"></div>");
						filter_selector_string = filter_selector_string + " div.yadcf-filter-wrapper";

						$(filter_selector_string).append("<input id=\"yadcf-filter-" + table_selector_jq_friendly + "-" + column_number + "\" class=\"yadcf-filter\" onclick='yadcf.stopPropagation(event);"
							+ "' placeholder='" + filter_default_label + "'" + " onkeyup=\"yadcf.autocompleteKeyUP('" + table_selector_jq_friendly + "',event);\"></input>");
						$(document).data("yadcf-filter-" + table_selector_jq_friendly + "-" + column_number, options);

						$(filter_selector_string).find(".yadcf-filter").after("<input value=\"" + filter_reset_button_text + "\" type=\"button\" " +
							"onclick=\"yadcf.stopPropagation(event);yadcf.doFilterAutocomplete('clear', '" + table_selector_jq_friendly + "', " + column_number + "); return false;\" class=\"yadcf-filter-reset-button\">");

					} else if (args[i].filter_type === "range_number") {

						addRangeNumberFilter(filter_selector_string, table_selector_jq_friendly, column_number, filter_reset_button_text, filter_default_label);

					} else if (args[i].filter_type === "range_number_slider") {

						addRangeNumberSliderFilter(filter_selector_string, table_selector_jq_friendly, column_number, filter_reset_button_text, min_val, max_val);
					}

				} else {

					if ($("#" + filter_container_id).length === 0) {
						alert("Filter container could not be found.");
						return;
					}

					$("#" + filter_container_id).append("<div id=\"yadcf-filter-wrapper-" + filter_container_id + "\" class=\"yadcf-filter-wrapper\"></div>");
					filter_selector_string = filter_selector_string + " div.yadcf-filter-wrapper";

					if (args[i].filter_type === "select") {

						$("<select id=\"yadcf-filter-" + table_selector_jq_friendly + "-" + column_number + "\" class=\"yadcf-filter\" " +
							"onchange=\"yadcf.doFilter(this, '" + table_selector_jq_friendly + "', " + column_number + ")\" onclick='yadcf.stopPropagation(event);'>" +
							options + "</select>").appendTo("#" + filter_container_id + " div.yadcf-filter-wrapper");

						$("#" + filter_container_id).find(".yadcf-filter").after("<input value=\"" + filter_reset_button_text + "\" type=\"button\" " +
							"onclick=\"yadcf.stopPropagation(event);yadcf.doFilter('clear', '" + table_selector_jq_friendly + "', " + column_number + "); return false;\" class=\"yadcf-filter-reset-button\">");

					} else if (args[i].filter_type === "auto_complete") {
						$(filter_selector_string).append("<input id=\"yadcf-filter-" + table_selector_jq_friendly + "-" + column_number + "\" class=\"yadcf-filter\" onclick='yadcf.stopPropagation(event);"
							+ "' placeholder='" + filter_default_label + "'>" + "</input>").appendTo("#" + filter_container_id + " div.yadcf-filter-wrapper");
						$(document).data("yadcf-filter-" + table_selector_jq_friendly + "-" + column_number, options);

						$(filter_selector_string).find(".yadcf-filter").after("<input value=\"" + filter_reset_button_text + "\" type=\"button\" " +
							"onclick=\"yadcf.stopPropagation(event);yadcf.doFilterAutocomplete('clear', '" + table_selector_jq_friendly + "', " + column_number + "); return false;\" class=\"yadcf-filter-reset-button\">");

					} else if (args[i].filter_type === "range_number") {

						addRangeNumberFilter(filter_selector_string, table_selector_jq_friendly, column_number, filter_reset_button_text, filter_default_label);

					} else if (args[i].filter_type === "range_number_slider") {

						addRangeNumberSliderFilter(filter_selector_string, table_selector_jq_friendly, column_number, filter_reset_button_text, min_val, max_val);

					}

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
			}
		}
	}

	function endsWith(str, suffix) {
		return str.indexOf(suffix, str.length - suffix.length) !== -1;
	}

	function rangeNumberClear(table_selector_jq_friendly, event) {
		$.fn.dataTableExt.iApiIndex = oTablesIndex[table_selector_jq_friendly];
		var oTable = oTables[table_selector_jq_friendly];

		$(event.target).parent().find(".yadcf-filter-range-number").val("");
		$($(event.target).parent().find(".yadcf-filter-range-number")[0]).focus();

		oTable.fnDraw();
		resetIApiIndex();

		$(event.target).parent().find(".yadcf-filter-range-number").removeClass("inuse");

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

	function rangeNumberKeyUP(table_selector_jq_friendly, event) {
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

		}
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

	function getOptions(selector) {
		return options[selector];
	}

	function initAndBindTable(table_arg, table_selector, index) {

		var table_selector_jq_friendly = table_selector.replace(":", "-").replace("(", "").replace(")", "").replace(".", "-").replace("#", "-"),
			table_selector_tmp;
        oTables[table_selector_jq_friendly] = table_arg;
		oTablesIndex[table_selector_jq_friendly] = index;

        if (table_arg.fnSettings().sAjaxSource === null) {
			table_selector_tmp = table_selector;
			if (table_selector.indexOf(":eq") !== -1) {
				table_selector_tmp = table_selector.substring(0, table_selector.lastIndexOf(":eq"));
			}
			appendSelectFilter(table_arg, yadcf.getOptions(table_selector_tmp), table_selector);
        } else {
	        if (parseFloat($().jquery) >= 1.7) {
				$(document).on("draw", table_arg, function (event, ui) {
					appendSelectFilter(table_arg, yadcf.getOptions(ui.oInstance.selector), ui.oInstance.selector);
	            });
	        } else {
				$(document).delegate(table_arg, "draw", function (event, ui) {
					appendSelectFilter(table_arg, yadcf.getOptions(ui.oInstance.selector), ui.oInstance.selector);
				});
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

    return {
		doFilter : doFilter,
		doFilterAutocomplete : doFilterAutocomplete,
		autocompleteKeyUP : autocompleteKeyUP,
		getOptions : getOptions,
		rangeNumberKeyUP : rangeNumberKeyUP,
		rangeNumberClear : rangeNumberClear,
		rangeNumberSliderClear : rangeNumberSliderClear,
		stopPropagation : stopPropagation
    };

}(jQuery));
