/*global $, jQuery*/

/*
*
* Yet Another DataTables Column Filter - (yadcf)
* 
* File:        jquery.dataTables.yadcf.js
* Version:     0.3.0
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
				Type:				String
				Default value:		Select value
				Description:		The label that will appear in the select menu filter when no value is selected from the filter
									
* filter_reset_button_text
				Required:			false
				Type:				String
				Default value:		x
				Description:		The text that will appear inside the reset button next to the select drop down

* enable_auto_complete
				Required:			false
				Type:				boolean
				Default value:		false
				Description:		Turns the filter into an autocomplete input - make use of the jQuery UI Autocomplete widget (with some enhancements)
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

			options,
			j,
			k,
			data_length,
			col_inner_elements,
			col_inner_data,
			col_filter_array = {},
			ii,
			default_options = {
				enable_auto_complete : false
			},
			table_selector_jq_friendly;


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

			if (filter_default_label === undefined) {
				if (enable_auto_complete === false) {
					filter_default_label = "Select value";
				} else {
					filter_default_label = "Type a value";
				}
			}

			if (filter_reset_button_text === undefined) {
				filter_reset_button_text = "x";
			}

			if (enable_auto_complete === false) {
				options = "<option value=\"" + "-1" + "\">" + filter_default_label + "</option>";
			} else {
				options = [];
			}

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
								if (enable_auto_complete === false) {
									options += '<option value="' + col_inner_data + '">' + col_inner_data + '</option>';
								} else {
									options.push(col_inner_data);
								}
							}
						}
					} else if (column_data_type === "text") {
						if (text_data_delimiter !== undefined) {
							col_inner_elements = data[j][column_number].split(text_data_delimiter);
							for (k = 0; k < col_inner_elements.length; k++) {
								col_inner_data = col_inner_elements[k];
								if (!(col_filter_array.hasOwnProperty(col_inner_data))) {
									col_filter_array[col_inner_data] = col_inner_data;
									if (enable_auto_complete === false) {
										options += '<option value="' + col_inner_data + '">' + col_inner_data + '</option>';
									} else {
										options.push(col_inner_data);
									}
								}
							}
						} else {
							col_inner_data = data[j][column_number];
							if (!(col_filter_array.hasOwnProperty(col_inner_data))) {
								col_filter_array[col_inner_data] = col_inner_data;
								if (enable_auto_complete === false) {
									options += '<option value="' + col_inner_data + '">' + col_inner_data + '</option>';
								} else {
									options.push(col_inner_data);
								}
							}
						}
					}
				}

			} else {
				for (ii = 0; ii < data.length; ii++) {
					if (enable_auto_complete === false) {
						options += '<option value="' + data[ii] + '">' + data[ii] + '</option>';
					} else {
						options.push(data[ii]);
					}
				}
			}

			if (filter_container_id === undefined) {
				filter_selector_string = table_selector + " thead th:eq(" + column_number + ")";
				$filter_selector = $(filter_selector_string).find(".yadcf-filter");
			} else {
				filter_selector_string = "#" + filter_container_id;
				$filter_selector = $(filter_selector_string).find(".yadcf-filter");
			}

			table_selector_jq_friendly = table_selector.replace(":", "-").replace("(", "").replace(")", "").replace(".", "-").replace("#", "-");

			if ($filter_selector.length === 1) {
				if (enable_auto_complete === false) {
					$filter_selector.empty();
					$filter_selector.append(options);
				} else {
					$(document).data("yadcf-filter-" + table_selector_jq_friendly + "-" + column_number, options);
				}
			} else {

				if (filter_container_id === undefined) {

					if (enable_auto_complete === false) {
						$(filter_selector_string).append("<select id=\"yadcf-filter-" + table_selector_jq_friendly + "-" + column_number + "\" class=\"yadcf-filter\" " +
							"onchange=\"yadcf.doFilter(this, '" + table_selector_jq_friendly + "', " + column_number + ")\" onclick='event.cancelBubble = true;event.stopPropagation();'>" + options + "</select>");
						$(filter_selector_string).find(".yadcf-filter").after("<input value=\"" + filter_reset_button_text + "\" type=\"button\" " +
							"onclick=\"event.cancelBubble = true;event.stopPropagation();yadcf.doFilter('clear', '" + table_selector_jq_friendly + "', " + column_number + "); return false;\" class=\"yadcf-filter-reset-button\">");
					} else {
						$(filter_selector_string).append("<input id=\"yadcf-filter-" + table_selector_jq_friendly + "-" + column_number + "\" class=\"yadcf-filter\" onclick='event.cancelBubble = true;event.stopPropagation();"
							+ "' placeholder='" + filter_default_label + "'" + " onkeyup=\"yadcf.autocompleteKeyUP('" + table_selector_jq_friendly + "',event);\"></input>");
						$(document).data("yadcf-filter-" + table_selector_jq_friendly + "-" + column_number, options);

						$(filter_selector_string).find(".yadcf-filter").after("<input value=\"" + filter_reset_button_text + "\" type=\"button\" " +
							"onclick=\"event.cancelBubble = true;event.stopPropagation();yadcf.doFilterAutocomplete('clear', '" + table_selector_jq_friendly + "', " + column_number + "); return false;\" class=\"yadcf-filter-reset-button\">");
					}

					$(filter_selector_string).find(".yadcf-filter").prev().css("display", "inline-block");

				} else {

					if ($("#" + filter_container_id).length === 0) {
						alert("Filter container could not be found.");
					}

					if (enable_auto_complete === false) {
						$("<select id=\"yadcf-filter-" + table_selector_jq_friendly + "-" + column_number + "\" class=\"yadcf-filter\" " +
							"onchange=\"yadcf.doFilter(this, '" + table_selector_jq_friendly + "', " + column_number + ")\" onclick='event.cancelBubble = true;event.stopPropagation();'>" +
							options + "</select>").appendTo("#" + filter_container_id);

						$("#" + filter_container_id).find(".yadcf-filter").after("<input value=\"" + filter_reset_button_text + "\" type=\"button\" " +
							"onclick=\"event.cancelBubble = true;event.stopPropagation();yadcf.doFilter('clear', '" + table_selector_jq_friendly + "', " + column_number + "); return false;\" class=\"yadcf-filter-reset-button\">");

					} else {
						$(filter_selector_string).append("<input id=\"yadcf-filter-" + table_selector_jq_friendly + "-" + column_number + "\" class=\"yadcf-filter\" onclick='event.cancelBubble = true;event.stopPropagation();"
							+ "' placeholder='" + filter_default_label + "'>" + "</input>").appendTo("#" + filter_container_id);
						$(document).data("yadcf-filter-" + table_selector_jq_friendly + "-" + column_number, options);

						$(filter_selector_string).find(".yadcf-filter").after("<input value=\"" + filter_reset_button_text + "\" type=\"button\" " +
							"onclick=\"event.cancelBubble = true;event.stopPropagation();yadcf.doFilterAutocomplete('clear', '" + table_selector_jq_friendly + "', " + column_number + "); return false;\" class=\"yadcf-filter-reset-button\">");
					}

				}

			}

			if ($(document).data("#yadcf-filter-" + table_selector_jq_friendly + "-" + column_number + "_val") !== undefined && $(document).data("#yadcf-filter-" + table_selector_jq_friendly + "-" + column_number + "_val") !== "-1") {
				$(filter_selector_string).find(".yadcf-filter").val($(document).data("#yadcf-filter-" + table_selector_jq_friendly + "-" + column_number + "_val"));
			}
			if (enable_auto_complete === true) {
				$("#yadcf-filter-" + table_selector_jq_friendly + "-" + column_number).autocomplete({
				    source: $(document).data("yadcf-filter-" + table_selector_jq_friendly + "-" + column_number),
					select: autocompleteSelect
				});
			}
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


    return {
		doFilter : doFilter,
		doFilterAutocomplete : doFilterAutocomplete,
		autocompleteKeyUP : autocompleteKeyUP,
		getOptions : getOptions
    };

}(jQuery));
