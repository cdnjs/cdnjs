/*
 * This file is part of the Tabulator package.
 *
 * (c) Oliver Folkerd <oliver.folkerd@gmail.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 *
 * Full Documentation & Demos can be found at: http://olifolkerd.github.io/tabulator/
 *
 */

 (function(){

 	'use strict';

 	//polyfill for Array.find method
 	if (!Array.prototype.find) {
 		Array.prototype.find = function (predicate, thisValue) {
 			var arr = Object(this);
 			if (typeof predicate !== 'function') {
 				throw new TypeError();
 			}
 			for(var i=0; i < arr.length; i++) {
 				if (i in arr) {
 					var elem = arr[i];
 					if (predicate.call(thisValue, elem, i, arr)) {
 						return elem;
 					}
 				}
 			}
 			return undefined;
 		}
 	}

 	$.widget("ui.tabulator", {

	data:[],//array to hold data for table
	activeData:[],//array to hold data that is active in the DOM

	selectedRows:[], //array to hold currently selected rows
	selecting:false, //is selection currently happening
	selectPrev:[], //hold jQuery element for previously selected row to handle changing direction when selecting

	firstRender:true, //layout table widths correctly on first render
	mouseDrag:false, //mouse drag tracker;
	mouseDragWidth:false, //starting width of colum on mouse drag
	mouseDragElement:false, //column being dragged
	mouseDragOut:false, //catch to prevent mouseup on col drag triggering click on sort

	sortCurCol:null,//column name of currently sorted column
	sortCurDir:null,//column name of currently sorted column

	filterField:null, //field to be filtered on data render
	filterValue:null, //value to match on filter
	filterType:null, //filter type

	paginationCurrentPage:1, // pagination page
	paginationMaxPage:1, // pagination maxpage

	progressiveRenderTimer:null, //timer for progressiver rendering
	progressiveRenderFill:false, //initial fill of a progressive rendering table

	columnList:[], //an array of all acutal columns ignoring column groupings

	responsiveColumnList:[], //array of responsive columns
	responsiveColumnIndex:0, //current possition in responsive array

	columnFrozenLeft:[], //list of frozen columns left
	columnFrozenRight:[], //list of frozen columns right

	loaderDiv: $("<div class='tablulator-loader'><div class='tabulator-loader-msg'></div></div>"), //loader blockout div

	lang:{}, // hold current locale text

	defaultLang:{ //hold default locale text
		"columns":{
		},
		"pagination":{
			"first":"First",
			"first_title":"First Page",
			"last":"Last",
			"last_title":"Last Page",
			"prev":"Prev",
			"prev_title":"Prev Page",
			"next":"Next",
			"next_title":"Next Page",
		},
	},


	//setup options
	options: {
		colMinWidth:"40px", //minimum global width for a column
		colResizable:true, //resizable columns
		colVertAlign:"top", //vertical alignment of column headers

		height:false, //height of tabulator
		fitColumns:false, //fit colums to width of screen;

		movableCols:false, //enable movable columns
		movableRows:false, //enable movable rows
		movableRowHandle:"<div></div><div></div><div></div>", //handle for movable rows

		locale:"en-gb", //durrent system language
		langs:{},

		persistentLayout:false, //store cookie with column _styles
		persistentLayoutID:"", //id for stored cookie

		pagination:false, //enable pagination
		paginationSize:false, //size of pages
		paginationElement:false, //element to hold pagination numbers
		paginationDataReceived:{ //pagination data received from the server
			"current_page":"current_page",
			"last_page":"last_page",
			"data":"data",
		},
		paginationDataSent:{ //pagination data sent to the server
			"page":"page",
			"size":"size",
			"sort":"sort",
			"sort_dir":"sort_dir",
			"filter":"filter",
			"filter_value":"filter_value",
			"filter_type":"fitler_type",
		},
		paginator:false, //pagination url string builder

		progressiveRender:false, //enable progressive rendering
		progressiveRenderSize:20, //block size for progressive rendering
		progressiveRenderMargin:200, //disance in px before end of scroll before progressive render is triggered

		headerFilterPlaceholder: "filter column...", //placeholder text to display in header filters

		tooltips: false, //Tool tip value
		tooltipsHeader: false, //Tool tip for headers

		columns:false,//store for colum header info
		data:false, //store for initial table data if set at construction

		index:"id",

		sortable:true, //global default for sorting
		dateFormat: "dd/mm/yyyy", //date format to be used for sorting

		sortBy:"id", //defualt column to sort by
		sortDir:"desc", //default sort direction

		groupBy:false, //enable table grouping and set field to group by
		groupStartOpen:true, //starting state of group

		groupHeader:function(value, count, data){ //header layout function
			return value + "<span>(" + count + " " + ((count === 1) ? "item" : "items") + ")</span>";
		},

		rowFormatter:false, //row formatter callback

		addRowPos:"bottom", //position to insert blank rows, top|bottom

		selectable:"highlight", //highlight rows on hover
		selectableRollingSelection:true, //roll selection once maximum number of selectable rows is reached
		selectablePersistence:true, // maintain selection when table view is updated
		selectableCheck:function(data, row){return true;}, //check wheather row is selectable

		responsiveLayout:false, //enable responsive column layout

		ajaxURL:false, //url for ajax loading
		ajaxParams:{}, //params for ajax loading
		ajaxType:"get", //ajax request type

		showLoader:true, //show loader while data loading
		loader:"<div class='tabulator-loading'>Loading Data</div>", //loader element
		loaderError:"<div class='tabulator-error'>Loading Error</div>", //loader element

		//Callbacks from events
		rowClick:function(){},
		rowDblClick:function(){},
		rowAdded:function(){},
		rowDeleted:function(){},
		rowContext:function(){},
		rowMoved:function(){},
		rowUpdated:function(){},
		rowSelectionChanged:function(){},

		cellEdited:function(){},

		colMoved:function(){},
		colTitleChanged:function(){},

		dataLoading:function(){},
		dataLoaded:function(){},
		dataLoadError:function(){},
		dataEdited:function(){},

		ajaxResponse:false,

		dataFiltering:function(){},
		dataFiltered:function(){},

		dataSorting:function(){},
		dataSorted:function(){},

		renderStarted:function(){},
		renderComplete:function(){},

		pageLoaded:function(){},

		localized:function(){},

		tableBuilding:function(){},
		tableBuilt:function(){},
	},

	////////////////// Element Construction //////////////////

	//constructor
	_create: function(){
		var self = this;
		var element = self.element;

		//initialize arrays
		self.selectedRows = [];
		self.selectPrev = [];
		self.columnList = [];

		//prevent column array being copied over when not explicitly set
		if(!self.options.columns){
			self.options.columns = [];
		}

		if(element.is("table")){
			self._parseTable();
		}else{
			self._buildElement();
		}
	},

	//parse table element to create data set
	_parseTable:function(){
		var self = this;
		var element = self.element;
		var options = self.options;

		var rows = $("tbody tr", element);
		var headers = $("th", element);

		var hasIndex = false;

		var columns = options.columns;

		//find column if it has already been defined
		function search(title){

			var match = false;

			$.each(columns, function(index, column) {
				if(column.title === title){
					match = column;
					return false;
				}
			});

			return match;
		}

		//get attributes of cell
		var attributes = element[0].attributes;

		function attribValue(value){
			if(value === "true"){
				return true;
			}

			if(value === "false"){
				return false;
			}

			return value;
		}


		//check for tablator inline options
		for(var index in attributes){
			var attrib = attributes[index];
			var name;

			if(attrib.name && attrib.name.indexOf("tabulator-") === 0){

				name = attrib.name.replace("tabulator-", "");

				for(var key in options){
					if(key.toLowerCase() == name){
						options[key] = attribValue(attrib.value);
					}
				}
			}
		}

		//build columns from table header if they havnt been set;
		if(headers.length){

			//list of possible attributes
			var attribList = ["title", "field", "align", "width", "minWidth", "frozen", "sortable", "sorter", "formatter", "onClick", "onDblClick", "onContext", "editable", "editor", "visible", "cssClass", "tooltip", "tooltipHeader", "editableTitle", "headerFilter", "mutator", "mutateType", "accessor"];

			//create column array from headers
			headers.each(function(index){

				var header = $(this);
				var exists = false;

				var attributes = header[0].attributes;

				var col = search(header.text());

				if(col){
					exists = true;
				}else{
					col = {title:header.text()};
				}

				if(!col.field) {
					col.field = header.text().toLowerCase().replace(" ", "_");
				}

				$("td:eq(" + index + ")", rows).data("field", col.field)

				var width = header.attr("width");

				if(width && !col.width)	{
					col.width = width;
				}

				if(col.field == options.index){
					hasIndex = true;
				}

				//check for tablator inline options
				for(var index in attributes){
					var attrib = attributes[index];
					var name;

					if(attrib.name && attrib.name.indexOf("tabulator-") === 0){

						name = attrib.name.replace("tabulator-", "");

						attribList.forEach(function(key){
							if(key.toLowerCase() == name){
								col[key] = attribValue(attrib.value);
							}
						});
					}
				}

				if(!exists){
					columns.push(col)
				}
			});
		}else{
			//create blank table headers
			headers = $("tr:first td", element);

			headers.each(function(index){
				var col = {title:"", field:"col" + index};
				$("td:eq(" + index + ")", rows).data("field", col.field)

				var width = $(this).attr("width");

				if(width){
					col.width = width;
				}

				columns.push(col);
			});
		}

		self.data = [];

		//iterate through table rows and build data set
		rows.each(function(rowIndex){
			var item = {};

			//create index if the dont exist in table
			if(!hasIndex){
				item[options.index] = rowIndex;
			}

			//add row data to item
			$("td", $(this)).each(function(colIndex){
				item[$(this).data("field")] = $(this).html();
			});

			self.data.push(item);
		});

		//create new element
		var newElement = $("<div></div>");

		//transfer attributes to new element
		var attributes = element.prop("attributes");

		// loop through attributes and apply them on div
		$.each(attributes, function(){
			newElement.attr(this.name, this.value);
		});

		// replace table with div element
		element.replaceWith(newElement);

		options.data = self.data;

		newElement.tabulator(options);
	},

	//build tabulator element
	_buildElement: function(){
		var self = this;
		var options = self.options;
		var element = self.element;

		options.tableBuilding();

		//set current locale
		self.setLocale(self.options.locale);


		//// backwards compatability options adjustments ////

		//old persistan column layout adjustment
		if( typeof options.columnLayoutCookie != 'undefined'){
			options.persistentLayout = options.columnLayoutCookie;
			options.persistentLayoutID = options.columnLayoutCookieID;
		}
		/////////////////////////////////////////////////////


		//setup persistent layout storage if needed
		if(self.options.persistentLayout){
			//determine persistent layout storage type
			self.options.persistentLayout = self.options.persistentLayout !== true ?  self.options.persistentLayout : (typeof window.localStorage !== 'undefined' ? "local" : "cookie");

			//set storage tag
			self.options.persistentLayoutID = "tabulator-" + (self.options.persistentLayoutID ? self.options.persistentLayoutID : self.element.attr("id") ? self.element.attr("id") : "");
		}

		options.colMinWidth = isNaN(options.colMinWidth) ? options.colMinWidth : options.colMinWidth + "px";

		if(options.height){
			options.height = isNaN(options.height) ? options.height : options.height + "px";
			element.css({"height": options.height});
		}

		element.addClass("tabulator").attr("role", "grid");
		element.empty();

		self.header = $("<div class='tabulator-header'></div>")

		self.tableHolder = $("<div class='tabulator-tableHolder'></div>");

		var scrollTop = 0;
		var scrollLeft = 0;
		self.tableHolder.scroll(function(){

			//scroll header along with table body
			var holder = $(this);

			var left = holder.scrollLeft();
			self.header.scrollLeft(left);

			var hozAdjust = 0;

			//adjust for vertical scrollbar moving table when present
			var scrollWidth = self.header[0].scrollWidth - self.element.innerWidth();
			if(left > scrollWidth){
				hozAdjust = left - scrollWidth
				self.header.css("margin-left", -(hozAdjust));
			}else{
				self.header.css("margin-left", 0);
			}

			//keep frozen columns fixed in position
			self._calcFrozenColumnsPos(hozAdjust + 3);



			//trigger progressive rendering on scroll
			if(self.options.progressiveRender && scrollTop != holder.scrollTop() && scrollTop < holder.scrollTop()){
				if(holder[0].scrollHeight - holder.innerHeight() - holder.scrollTop() < self.options.progressiveRenderMargin){
					if(self.options.progressiveRender == "remote"){
						if(self.paginationCurrentPage <= self.paginationMaxPage){
							self._renderTable(true);
						}
					}else{
						if(self.paginationCurrentPage < self.paginationMaxPage){
							self.paginationCurrentPage++;
							self._renderTable(true);
						}
					}
				}
			}



			scrollTop = holder.scrollTop();
		});

		//create scrollable table holder
		self.table = $("<div class='tabulator-table'></div>");

		//build pagination footer if needed
		if(options.pagination){

			if(options.pagination === true){
				options.pagination = "local"; //convert old pagination style to new
			}

			if(!options.paginationElement){
				options.paginationElement = $("<div class='tabulator-footer'></div>");
				self.footer = options.paginationElement;
			}

			self.paginator = $("<span class='tabulator-paginator'><span class='tabulator-page' data-page='first' role='button' aria-label='" + self.lang.pagination.first_title + "' title='" + self.lang.pagination.first_title + "'>" + self.lang.pagination.first + "</span><span class='tabulator-page' data-page='prev' role='button' aria-label='" + self.lang.pagination.prev_title + "' title='" + self.lang.pagination.prev_title + "'>" + self.lang.pagination.prev + "</span><span class='tabulator-pages'></span><span class='tabulator-page' data-page='next' role='button' aria-label='" + self.lang.pagination.next_title + "' title='" + self.lang.pagination.next_title + "'>" + self.lang.pagination.next + "</span><span class='tabulator-page' data-page='last' role='button' aria-label='" + self.lang.pagination.last_title + "' title='" + self.lang.pagination.last_title + "'>" + self.lang.pagination.last + "</span></span>");

			self.paginator.on("click", ".tabulator-page", function(){
				if(!$(this).hasClass("disabled")){
					self.setPage($(this).data("page"));
				}
			});

			options.paginationElement.append(self.paginator);
		}

		//layout columns
		if(options.persistentLayout){
			self._getPersistentCol();
		}else{
			self._colLayout();
		}
	},

	//set options
	_setOption: function(option, value){
		var self = this;

		//block update if option cannot be updated this way
		if(["columns"].indexOf(option) > -1){
			return false;
		}

		//set option to value
		$.Widget.prototype._setOption.apply(this, arguments);

		//trigger appropriate table response

		if(["colMinWidth", "colResizable", "fitColumns", "movableCols", "movableRows", "movableRowHandle", "sortable", "groupBy", "groupHeader", "rowFormatter", "selectable"].indexOf(option) > -1){

			//triger rerender
			self._renderTable();

		}else if(["height", "pagination", "paginationSize", "tooltips"].indexOf(option) > -1){

			//triger render/reset page
			if(self.options.pagination){
				self.setPage(1);
			}else{
				self._renderTable();
			}

		}else if(["dateFormat", "sortBy", "sortDir"].indexOf(option) > -1){

			//trigger sort
			if(self.sortCurCol){
				self.sort(self.sortCurCol, self.sortCurDir);
			}

		}else if(["index"].indexOf(option) > -1){

			//trigger reparse data
			self._parseData(self.data);

		}else if(["paginationElement"].indexOf(option) > -1){
			//trigger complete redraw
		}
	},

	////////////////// Localization Functions //////////////////

	//set current locale
	setLocale:function(desiredLocale){
		var self = this;

		var locale = false; //hold the matching locale

		//fill in any matching languge values
		function traverseLang(trans, path){
			for(var prop in trans){

				if(typeof trans[prop] == "object"){
					if(!path[prop]){
						path[prop] = {};
					}
					traverseLang(trans[prop], path[prop]);
				}else{
					path[prop] = trans[prop];
				}
			}
		}

		//determing correct locale to load
		if(desiredLocale === true && navigator.language){
			//get local from system
			desiredLocale = navigator.language.toLowerCase();
		}

		if(desiredLocale){

			if(self.options.langs[desiredLocale]){
				locale = desiredLocale;
			}else{
				//see if matching top level local is present
				var prefix = desiredLocale.split("-")[0];
				if(self.options.langs[prefix]){
					locale = prefix;
				}
			}
		}

		//load default lang template
		self.lang = $.extend(true, [], self.defaultLang);


		if(locale){
			traverseLang(self.options.langs[locale], self.lang);
		}


		self.options.locale = locale;

		//update ui elements that need translating
		if(!self.firstRender){
			self._updateLocaleText();
		}

		//triger localized callback
		self.options.localized(locale, self.lang);

		return locale;

	},

	//quick update of elements with local based text
	_updateLocaleText:function(){
		var self = this;

		//update column titles
		self.columnList.forEach(function(column){
			if(column.field){
				$(".tabulator-col[data-field=" + column.field + "] .tabulator-col-title", self.header).text(self.lang.columns[column.field] || column.title);
			}
		});

		//update pagination if enabled
		if(self.options.pagination){
			for(var prop in self.lang.pagination){

				var propParts = prop.split("_");

				var element = $(".tabulator-paginator .tabulator-page[data-page=" + propParts[0] + "]", self.element);

				if (propParts.length > 1){
					element.attr("title",self.lang.pagination[prop])
					.attr("aria-label",self.lang.pagination[prop]);
				}else{
					element.text(self.lang.pagination[prop]);
				}
			}
		}

		//redraw incase column headers change width
		self.redraw(true);
	},

	//return the current locale
	getLocale:function(){
		var self = this;

		return self.options.locale;
	},

	//return the language definitions for the curent locale
	getLang:function(){
		var self = this;

		var lang = self.options.langs[self.options.locale]

		return lang ? lang : false;
	},

	////////////////// General Public Functions //////////////////

	//get number of elements in dataset
	dataCount:function(){
		return this.data.length;
	},


	//redraw list without updating data
	redraw:function(fullRedraw){
		var self = this;

		//redraw columns
		if(self.options.fitColumns || self.options.responsiveLayout || fullRedraw){
			self._colRender();
		}

		//reposition loader if present
		if(self.element.innerHeight() > 0){
			var msg = $(".tabulator-loader-msg", self.loaderDiv);
			msg.css({"margin-top":(self.element.innerHeight() / 2) - (msg.outerHeight()/2)})
		}

		self._calcFrozenColumnsPos();

		//trigger row restyle
		self._styleRows(true);

		if(fullRedraw){
			self._renderTable();
		}
	},

	//trigger file download
	download:function(type, filename, options){
		var self = this;

		//create temporary link element to trigger download
		var element = document.createElement('a');

		if(typeof type === "function"){

			//create the download link
			element.setAttribute('href', type(self.columnList, self.activeData, options));

		}else{

			switch(type){
				case "csv":

				var delimiter = options && options.delimiter ? options.delimiter : ",";

				//get field lists
				var titles = [];
				var fields = [];

				self.columnList.forEach(function(column){
					if(column.field){
						titles.push(column.title)
						fields.push(column.field)
					}
				})

				//generate header row
				var fileContents = [titles.join(delimiter)];

				//generate each row of the table
				self.activeData.forEach(function(row){

					var rowData = [];

					fields.forEach(function(field){
						var value = typeof row[field] == "object" ? JSON.stringify(row[field]) : row[field];

						//escape uotation marks
						rowData.push('"' + String(value).split('"').join('""') + '"');
					})

					fileContents.push(rowData.join(delimiter));

				});

				//create the download link
				element.setAttribute('href', 'data:text/csv;charset=utf-8,' + encodeURIComponent(fileContents.join("\n")));

				break;

				case "json":

				var fileContents = JSON.stringify(self.activeData, null, '\t');

				//create the download link
				element.setAttribute('href', 'data:application/json;charset=utf-8,' + encodeURIComponent(fileContents));

				break;

				default:
				return false;
				break;
			}
		}

		//set file title
		element.setAttribute('download', filename || "Tabulator." + (typeof type === "function" ? "txt" : type));

		//trigger download
		element.style.display = 'none';
		document.body.appendChild(element);
		element.click();

		//remove temporary link element
		document.body.removeChild(element);

		return true;
	},

	////////////////// Column Manipulation //////////////////

	//set column style cookie
	_setPersistentCol:function(){
		var self = this;

		//parse styles from columns
		function parseCols(columns){
			var cols = [];

			columns.forEach(function(column){
				var style = {
					field: column.field,
					width: column.width,
					visible: column.visible,
				};

				if(column.columns){
					style.title = column.title;
					style.columns = parseCols(column.columns);
				}

				cols.push(style);

			})

			return cols;
		}

		//create array of column styles only
		var columnStyles = parseCols(self.options.columns);

		//JSON format column data
		var data = JSON.stringify(columnStyles);

		if(self.options.persistentLayout == "cookie"){
			//set cookie expiration far in the future
			var expDate = new Date();
			expDate.setDate(expDate.getDate() + 10000);

			//save cookie
			document.cookie = self.options.persistentLayoutID + "=" + data + "; expires=" + expDate.toUTCString();
		}else{
			//save data to local storage
			localStorage.setItem(self.options.persistentLayoutID, data);
		}
	},

	//set Column style cookie
	_getPersistentCol:function(){
		var self = this;

		var colString = "";

		if(self.options.persistentLayout == "cookie"){
			//find cookie
			var cookie = document.cookie;
			var cookiePos = cookie.indexOf(self.options.persistentLayoutID + "=");

			//if cookie exists, decode and load column data into tabulator
			if(cookiePos > -1){
				cookie = cookie.substr(cookiePos);

				var end = cookie.indexOf(";");

				if(end > -1){
					cookie = cookie.substr(0, end);
				}

				colString = cookie.replace(self.options.persistentLayoutID + "=", "");
			}

		}else{
			//find loocal storage value
			var colString = localStorage.getItem(self.options.persistentLayoutID);
		}

		if(colString){
			self.setColumns(JSON.parse(colString), true);
		}else{
			self._colLayout();
		}
	},

	//set tabulator columns
	setColumns: function(columns, update){
		var self = this;

		//update column properties
		function updateCols(oldCols, newCols){
			newCols.forEach(function(item, to){

				var type = item.columns ? "group" : (item.field ? "field" : "object");
				var from = search(oldCols, item, type);

				if(from !== false){
					var column = oldCols.splice(from, 1)[0];

					column.width = item.width;
					column.visible = item.visible;

					oldCols.splice(to , 0, column);

					if(type == "group"){
						updateCols(column.columns, item.columns);
					}
				}

			});
		}

		//find matching column
		function search(columns, col, type){

			var match = false;

			$.each(columns, function(i, column){;

				switch(type){
					case "group":
					if(col.title === column.title && col.columns.length === column.columns.length){
						match = i;
					}
					break;

					case "field":
					if(col.field === column.field){
						match = i;
					}
					break;

					case "object":
					if(col === column){
						match = i;
					}
					break;
				}

				if(match !== false){
					return false;
				}
			});

			return match;
		}


		if(Array.isArray(columns)){

			//if updating columns work through exisiting column data
			if(update){
				updateCols(self.options.columns, columns);
			}else{
				// if replaceing columns, replace columns array with new
				self.options.columns = columns;
			}

			//Trigger Redraw
			self._colLayout(true);

			if(self.options.persistentLayout){
				self._setPersistentCol();
			}
		}
	},

	//get tabulator columns
	getColumns: function(){
		var self = this;

		return self.options.columns;
	},

	//add column
	addColumn:function(newCol, before, field){
		var self = this;

		if(newCol){
			if(field){
				var match = self._findColumn(field);

				if(match){
					match.parent.splice(before ? match.index : match.index + 1, 0, newCol);
				}
			}else{
				self.options.columns.splice(before ? 0 : self.options.columns.length + 1, 0, newCol);
			}

			self.setColumns(self.options.columns);
		}
	},

	//delete column
	deleteColumn:function(field){
		var self = this;

		if(field){

			var match = self._findColumn(field);

			if(match){
				match.parent.splice(match.index, 1);
			}

			self.setColumns(self.options.columns);
		}
	},

	//traverse all columns and trigger callback on each column
	_traverseColumns:function(callback, columns){
		var self = this;
		columns = columns ? columns : self.options.columns;

		$.each(columns, function(i, column){

			if(column.columns){
				self._traverseColumns(callback, column.columns);
			}else{
				callback(column);
			}

		});
	},

	//find column
	_findColumn:function(field, columns){
		var self = this;
		var match = false;

		columns = columns ? columns : self.options.columns;

		$.each(columns, function(i, column){
			switch(typeof field){
				case "object":
				if(column == field){
					match = {parent:columns, column:column, index:i};
					return false;
				}
				break;

				case "function":
				if(field(column)){
					match = {parent:columns, column:column, index:i};
					return false;
				}
				break;

				default:
				if(column.field == field){
					match = {parent:columns, column:column, index:i};
					return false;
				}
			}

			if(column.columns){
				var children = self._findColumn(field, column.columns);

				if(children){
					match = children;
					return false;
				}
			}
		});

		return match;
	},

	_setColVisibility:function(column, visibility){
		var self = this;

		if(column){
			column.visible = visibility;

			var elements = $(".tabulator-col[data-index=" + column.index + "], .tabulator-cell[data-index=" + column.index + "]", self.element)

			if(visibility){
				elements.show();
			}else{
				elements.hide();
			}

			self._renderTable();

			if(self.options.persistentLayout){
				self._setPersistentCol();
			}
		}
	},

	//hide column
	hideCol: function(field){
		var self = this;
		var match = self._findColumn(field);

		if(match){
			self._setColVisibility(match.column, false);
		}
	},

	//show column
	showCol: function(field){
		var self = this;
		var match = self._findColumn(field);

		if(match){
			self._setColVisibility(match.column, true);
		}
	},

	//toggle column visibility
	toggleCol: function(field){
		var self = this;
		var match = self._findColumn(field);

		if(match){
			self._setColVisibility(match.column, !match.column.visible);
		}
	},

	////////////////// Row Manipulation //////////////////

	//find row in data set
	_findRow: function(id){
		var self = this;
		var row;

		if(typeof id == "object"){
			row = self.data.find(function(item){
				return item === id;
			});
		}else{
			row = self.data.find(function(item){
				return item[self.options.index] == id;
			});
		}

		return row;
	},

	//delete row from table by id
	deleteRow: function(item){
		var self = this;

		var itemType = typeof item;

		var id = (itemType == "number" || itemType == "string") ? item : item.data("data")[self.options.index];

		var row = (itemType == "number" || itemType == "string") ? $("[data-id=" + item + "]", self.element) : item;

		if(row.length){
			var rowData = row.data("data");
			rowData.tabulator_delete_row = true;

			//remove from data
			var line = self.data.find(function(item){
				return item.tabulator_delete_row;
			});

			if(line){
				line = self.data.indexOf(line);

				if(line > -1){
					//remove row from data
					self.data.splice(line, 1);
				}
			}

			//remove from active data
			line = self.activeData.find(function(item){
				return item.tabulator_delete_row;
			});

			if(line){
				line = self.activeData.indexOf(line);

				if(line > -1){
					//remove row from data
					self.activeData.splice(line, 1);
				}
			}

			var group = row.closest(".tabulator-group");

			row.remove();

			if(self.options.groupBy){

				var rows = $(".tabulator-row", group);
				var length = rows.length;

				if(length){

					var data = [];

					rows.each(function(){
						data.push($(this).data("data"));
					});

					var header = $(".tabulator-group-header", group);
					var arrow = $(".tabulator-arrow", header).clone(true,true);

					header.empty();

					header.append(arrow).append(self.options.groupHeader(group.data("value"), length, data));
				}else{
					group.remove();
				}
			}


			//style table rows
			self._styleRows();

			//align column widths
			self._colRender(!self.firstRender);

			self.options.rowDeleted(id);

			self.options.dataEdited(self.data);

			if(self.options.pagination){
				self.paginationMaxPage = Math.max(1, Math.ceil(self.activeData.length/self.options.paginationSize));

				self._layoutPageSelector();

				self.setPage(self.paginationCurrentPage);
			}
		}
	},

	//add blank row to table
	addRow:function(item, top){
		var self = this;

		if(item){
			item[self.options.index] = item[self.options.index] ? item[self.options.index] : 0;
		}else{
			item = {id:0};
		}

		//Apply mutators if present
		item = self._mutateData(item);

		//create blank row
		var row = self._renderRow(item);

		var top = typeof top == "undefined" ? self.options.addRowPos : (top === true || top === "top" ? "top" : "bottom");

		//append to top or bottom of table based on preference
		if(top == "top"){
			self.activeData.unshift(item);
			self.data.unshift(item);
			self.table.prepend(row);
		}else{
			self.activeData.push(item);
			self.data.push(item);
			self.table.append(row);
		}

		//align column widths
		self._colRender(!self.firstRender);

		//style table rows
		self._styleRows();

		//triger event
		self.options.rowAdded(item, row);

		self.options.dataEdited(self.data);
	},

	//update row data
	updateRow:function(index, item, bulk){
		var self = this;

		var itemType = typeof index;

		var id = (itemType == "number" || itemType == "string") ? index : index.data("data")[self.options.index];

		var row = (itemType == "number" || itemType == "string") ? $("[data-id=" + index + "]", self.element) : index;

		if(row.length){
			var rowData = row.data("data");

			//Apply mutators if present
			item = self._mutateData(item);

			//makesure there are differences between the new and old data before updating
			if(JSON.stringify(rowData) !== JSON.stringify(item)){

				//update row data
				for (var attrname in item) { rowData[attrname] = item[attrname]; }

				//render new row
			var newRow = self._renderRow(rowData);

				//replace old row with new row
				row.replaceWith(newRow);


				if(!bulk){
					//align column widths
					self._colRender(!self.firstRender);

					//style table rows
					self._styleRows();
				}


				//triger event
				self.options.rowUpdated(id, item, newRow);

				if(!bulk){
					self.options.dataEdited(self.data);
				}
			}

			return true;
		}

		return false;
	},

	////////////////// Data Manipulation //////////////////

	//get array of data from the table
	getData:function(filteredData){
		var self = this;

		//clone data array with deep copy to isolate internal data from returend result
		var outputData = $.extend(true, [], filteredData === true ? self.activeData: self.data);

		//check for accessors and return the processed data
		return self._applyAccessors(outputData);
	},

	//update existing data
	updateData:function(data){
		var self = this;

		if(data){
			data.forEach(function(item){
				//update each row in turn
				self.updateRow(item[self.options.index], item, true);
			});

			//align column widths
			self._colRender(!self.firstRender);

			//style table rows
			self._styleRows();
			self.options.dataEdited(self.data);
		}
	},

	//apply any column accessors to the data before returing the result
	_applyAccessors:function(data){
		var self = this;

		self._traverseColumns(function(col){
			if(col.accessor){
				var accessor = typeof col.accessor === "function" ? col.accessor : self.accessors[col.accessor];

				data.forEach(function(item, j){
					item[col.field] = accessor(item[col.field], item);
				});
			}
		})

		return data;
	},


	///////////////// Pagination Data Loading //////////////////

	//parse paginated data
	_parsePageData:function(data, update){
		var self = this;
		var options = self.options;

		self.paginationMaxPage = parseInt(data[options.paginationDataReceived.last_page]);

		self._layoutPageSelector();

		self._parseData(data[options.paginationDataReceived.data], update);
	},


	_getRemotePageData:function(update){
		var self = this;
		var options = self.options;

		if(typeof options.paginator == "function"){
			var url = options.paginator(options.ajaxURL, self.paginationCurrentPage, options.paginationSize, options.ajaxParams);
			self._getAjaxData(url, {}, null, update);
		}else{
			var pageParams = {};

			//clone ajax params into page request params
			for (var attrname in options.ajaxParams) { pageParams[attrname] = options.ajaxParams[attrname]; }

			//set page number
		pageParams[options.paginationDataSent.page] = self.paginationCurrentPage;

			//set page size if defined
			if(options.paginationSize){
				pageParams[options.paginationDataSent.size] = options.paginationSize;
			}

			//set sort data if defined
			if(self.sortCurCol && typeof self.sortCurCol.field === "string"){
				pageParams[options.paginationDataSent.sort] = self.sortCurCol.field;
				pageParams[options.paginationDataSent.sort_dir] = self.sortCurDir;
			}

			//set filter data if defined
			if(self.filterField && typeof self.filterField === "string"){
				pageParams[options.paginationDataSent.filter] = self.filterField;
				pageParams[options.paginationDataSent.filter_value] = self.filterValue;
				pageParams[options.paginationDataSent.filter_type] = self.filterType;
			}

			self._getAjaxData(options.ajaxURL, pageParams, null, update);
		}

	},

	////////////////// Data Loading //////////////////


	//load data
	setData:function(data, params, type){
		var self = this;

		self.options.dataLoading(data, params);

		params = params ? params : {};

		self.options.ajaxParams = params;

		//show loader if needed
		self._showLoader(this, this.options.loader);

		if(typeof(data) === "string"){
			if (data.indexOf("{") == 0 || data.indexOf("[") == 0){
				//data is a json encoded string
				self._parseData(jQuery.parseJSON(data));
			}else{

				self.options.ajaxURL = data;

				if(self.options.pagination == "remote"){
					self.setPage(1);
				}else{
					//assume data is url, make ajax call to url to get data
					self._getAjaxData(data, params, type);
				}

			}
		}else{
			if(data){
				//asume data is already an object
				self._parseData(data);

			}else{
				//no data provided, check if ajaxURL is present;
				if(this.options.ajaxURL){

					if(self.options.pagination == "remote"){
						self.setPage(1);
					}else{
						self._getAjaxData(this.options.ajaxURL, params, type);
					}

				}else{
					//empty data
					self._parseData([]);
				}
			}
		}
	},

	//clear data
	clear:function(){
		this.table.empty();
		this.data = [];
		this._filterData();
	},

	//get json data via ajax
	_getAjaxData:function(url, params, type, update){
		var self = this;
		var options = self.options;

		$.ajax({
			url: url,
			type: type || self.options.ajaxType,
			data: params || self.options.ajaxParams,
			async: true,
			dataType:"json",
			success: function (data){

				var returnedData = typeof self.options.ajaxResponse === "function" ? self.options.ajaxResponse(url, params ? params : self.options.ajaxParams, data) : data;

				if(self.options.pagination == "remote" || self.options.progressiveRender == "remote"){
					self._parsePageData(returnedData, update);
				}else{
					self._parseData(returnedData, update);
				}

			},
			error: function (xhr, textStatus, errorThrown){
				console.error("Tablulator ERROR (ajax get): " + xhr.status + " - " + errorThrown);

				self.options.dataLoadError(xhr, textStatus, errorThrown);
				self._showLoader(self, self.options.loaderError);
			},
		});
	},

	//parse and index data
	_parseData:function(data, update){
		var self = this;

		if(Array.isArray(data)){
			var newData = [];

			if(data.length){
				if(typeof(data[0][self.options.index]) == "undefined"){
					self.options.index = "_index";
					$.each(data, function(i, item){
						newData[i] = item;
						newData[i]["_index"] = i;
					});

				}else{
					$.each(data, function(i, item){
						newData.push(item);
					});
				}
			}

			self.options.dataLoaded(newData);

			var mutatedData = self._mutateData(newData);

			if(update){
				self.data = mutatedData;
				self.data = self.data.concat(mutatedData);
				self.activeData = self.activeData.concat(mutatedData);

				if(self.progressiveRenderFill){
					self._renderTable(true);
				}
			}else{
				self.data = mutatedData;

				self._clearSelection();

				//filter incomming data
				self._filterData();
			}
		}
	},

	//applu mutators if present
	_mutateData:function(data){
		var self = this;

		self._traverseColumns(function(col){
			if(col.mutator && col.mutateType !== "edit"){

				var mutator = typeof col.mutator === "function" ? col.mutator : self.mutators[col.mutator];

				if(Array.isArray(data)){
					data.forEach(function(item, j){
						if(typeof item[col.field] != "undefined"){
							item[col.field] = mutator(item[col.field], "data", item);
						}
					});
				}else{
					if(typeof data[col.field] != "undefined"){
						data[col.field] = mutator(data[col.field], "data", data);
					}
				}
			}
		});

		return data;
	},



	////////////////// Data Filtering //////////////////

	//filter data in table
	setFilter:function(field, type, value){
		var self = this;

		if(!self.options.selectablePersistence){
			self._clearSelection();
		}

		self.options.dataFiltering(field, type, value);

		//set filter
		if(field){
			//set filter
			self.filterField = field;
			self.filterType = typeof(value) == "undefined" ? "=" : type;
			self.filterValue = typeof(value) == "undefined" ? type : value;
		}else{
			//clear filter
			self.filterField = null;
			self.filterType = null;
			self.filterValue = null;
		}

		//render table
		this._filterData();
	},

	//clear filter
	clearFilter:function(){
		var self = this;

		self.filterField = null;
		self.filterType = null;
		self.filterValue = null;

		//render table
		this._filterData();
	},

	//get current filter info
	getFilter:function(){
		var self = this;

		if(self.filterField){

			var filter = {
				"field":self.filterField,
				"type":self.filterType,
				"value":self.filterValue,
			};

			return filter;

		}else{
			return false;
		}
	},

	//filter data set
	_filterData:function(){
		var self = this;

		//filter data set
		if(self.filterField){
			self.activeData = self.data.filter(function(row){
				return self._filterRow(row);
			});
		}else{
			self.activeData = self.data;
		}

		//set the max pages available given the filter results
		if(self.options.pagination == "local"){
			self.paginationMaxPage = Math.max(1, Math.ceil(self.activeData.length/self.options.paginationSize));
		}

		self.options.dataFiltered(self.activeData, self.filterField, self.filterType, self.filterValue);

		//sort or render data
		if(self.sortCurCol && self.options.pagination != "remote"){
			self.sort(self.sortCurCol, self.sortCurDir);
		}else{
			//determine pagination information / render table
			if(self.options.pagination == "local"){
				self.setPage(1);
			}else{
				self._renderTable();
			}
		}
	},

	//check if row data matches filter
	_filterRow:function(row){
		var self = this;

		// if no filter set display row
		if(!self.filterField){
			return true;
		}else{

			if(typeof(self.filterField) == "function"){

				return self.filterField(row);

			}else{
				var value = row[self.filterField];
				var term = self.filterValue;

				switch(self.filterType){
					case "=": //equal to
					return value == term ? true : false;
					break;

					case "<": //less than
					return value < term ? true : false;
					break;

					case "<=": //less than or equal too
					return value <= term ? true : false;
					break;

					case ">": //greater than
					return value > term ? true : false;
					break;

					case ">=": //greater than or equal too
					return value >= term ? true : false;
					break;

					case "!=": //not equal to
					return value != term ? true : false;
					break;

					case "like": //text like
					if(value === null){
						return term === value ? true : false;
					}else{
						return value.toLowerCase().indexOf(term.toLowerCase()) > -1 ? true : false;
					}
					break;

					default:
					return false;
				}
			}
		}

		return false;
	},

	////////////////// Data Sorting //////////////////

	//return the current sorter
	getSort:function(){
		var self = this;

		return {
			"field" : self.sortCurCol ? self.sortCurCol.field : false,
			"dir" : self.sortCurDir || false,
		};
	},

	//handle user clicking on column header sort
	_sortClick: function(column, element){
		var self = this;

		if (element.data("sortdir") == "desc"){
			element.data("sortdir", "asc").attr("aria-sort", "ascending");
		}else{
			element.data("sortdir", "desc").attr("aria-sort", "descending");
		}

		self.sort(column, element.data("sortdir"));
	},

	// public sorter function
	sort: function(sortList, dir){
		var self = this;
		var header = self.header;
		var options = this.options;

		if(!self.options.selectablePersistence){
			self._clearSelection();
		}

		if(!Array.isArray(sortList)){
			sortList = [{field: sortList, dir:dir}];
		}

		$.each(sortList, function(i, item){

			//convert column name to column object
			if(typeof(item.field) == "string"){
				var match = self._findColumn(item.field);

				if(match){
					item.field = match.column;
				}
			}

			//reset all column sorts
			$(".tabulator-col[data-sortable=true][data-field!=" + item.field.field + "]", self.header).data("sortdir", "desc").attr("aria-sort", "none");
			$(".tabulator-col .tabulator-arrow", self.header).removeClass("asc desc");

			var element = $(".tabulator-col[data-field='" + item.field.field + "']", header);

			var arrow = $(".tabulator-arrow", element);

			if (dir == "asc"){
				arrow.removeClass("desc").addClass("asc");
			}else{
				arrow.removeClass("asc").addClass("desc");
			}

			self._sorter(item.field, item.dir, sortList, i);

		});

		self.options.dataSorted(self.data, sortList, dir);

		//determine pagination information / render table
		if(self.options.pagination){
			self.setPage(1);
		}else{
			self._renderTable();
		}
	},

	//sort table
	_sorter: function(column, dir, sortList, i){
		var self = this;
		var table = self.table;
		var options = self.options;
		var data = self.data;

		self.options.dataSorting(sortList, dir);

		self.sortCurCol = column;
		self.sortCurDir = dir;

		self._sortElement(table, column, dir, sortList, i);
	},

	//itterate through nested sorters
	_sortElement:function(element, column, dir, sortList, i){
		var self = this;

		self.activeData = self.activeData.sort(function(a,b){

			var result = self._processSorter(a, b, column, dir);

			//if results match recurse through previous searchs to be sure
			if(result == 0 && i){
				for(var j = i-1; j>= 0; j--){
					result = self._processSorter(a, b, sortList[j].field, sortList[j].dir);

					if(result != 0){
						break;
					}
				}
			}

			return result;
		})
	},

	//process individual sort functions on active data
	_processSorter:function(a, b, column, dir){
		var self = this;
		//switch elements depending on search direction
		var el1 = dir == "asc" ? a : b;
		var el2 = dir == "asc" ? b : a;

		a = el1[column.field];
		b = el2[column.field];

		//run sorter
		var sorter = typeof(column.sorter) == "undefined" ? "string" : column.sorter;
		sorter = typeof(sorter) == "string" ? self.sorters[sorter] : sorter;

		return sorter.call(self, a, b, el1, el2);
	},

	////////////////// Data Pagination //////////////////

	//get current page number
	getPage:function(){
		var self = this;
		return self.options.pagination ? self.paginationCurrentPage : false;
	},

	//return max page
	getPageMax:function(){
		var self = this;
		return self.options.pagination ? self.paginationMaxPage : false;
	},

	//set current paginated page
	setPage:function(page){
		var self = this;

		if(!self.options.selectablePersistence){
			self._clearSelection();
		}

		switch(page){
			case "first":
			self.paginationCurrentPage = 1;
			break;

			case "prev":
			if(self.paginationCurrentPage > 1){
				self.paginationCurrentPage--;
			}
			break;

			case "next":
			if(self.paginationCurrentPage < self.paginationMaxPage){
				self.paginationCurrentPage++;
			}
			break;

			case "last":
			self.paginationCurrentPage = self.paginationMaxPage;
			break;

			default:
			if(page > self.paginationMaxPage){
				page = self.paginationMaxPage;
			}

			self.paginationCurrentPage = page;
			break;
		}

		if(self.options.pagination == "local"){
			self._layoutPageSelector();
			self._renderTable();
		}else{

			self._getRemotePageData();
		}

	},

	//set page size for the table
	setPageSize:function(size){
		var self = this;

		if(Number.isInteger(size) && size > 0){
			self.options.paginationSize = parseInt(size);
			self._filterData();
		}
	},


	//create page selector layout for current page
	_layoutPageSelector:function(){
		var self = this;

		var min = 1, max = self.paginationMaxPage;

		var pages = $(".tabulator-pages", self.paginator);

		pages.empty();

		var spacer = $("<span> ... </span>");

		if(self.paginationMaxPage > 10){

			if(self.paginationCurrentPage <= 4){
				max = 5;
			}else if(self.paginationCurrentPage > self.paginationMaxPage - 4){
				min = self.paginationMaxPage - 4;

				pages.append(spacer.clone());
			}else{
				min = self.paginationCurrentPage - 2;
				max = self.paginationCurrentPage + 2;

				pages.append(spacer.clone());
			}
		}

		for(var i = min; i <= max; ++i){

			var active = i == self.paginationCurrentPage ? "active" : "";

			pages.append("<span class='tabulator-page " + active + "' data-page='" + i + "' role='button' aria-label='Show Page " + i + "'>" + i + "</span>");
		}

		if(self.paginationMaxPage > 10){
			if(self.paginationCurrentPage <= 4 || self.paginationCurrentPage <= self.paginationMaxPage - 4){
				pages.append(spacer.clone());
			}
		}

		$(".tabulator-page", self.paginator).removeClass("disabled").attr("aria-disabled", "false");

		if(self.paginationCurrentPage == 1){
			$(".tabulator-page[data-page=first], .tabulator-page[data-page=prev]", self.paginator).addClass("disabled").attr("aria-disabled", "true");
		}

		if(self.paginationCurrentPage == self.paginationMaxPage){
			$(".tabulator-page[data-page=next], .tabulator-page[data-page=last]", self.paginator).addClass("disabled").attr("aria-disabled", "true");
		}
	},

	////////////////// Render Data to Table //////////////////

	//render active data to table rows
	_renderTable:function(progressiveRender){
		var self = this;
		var options = self.options;
		var hozScrollPos = 0;

		self.options.renderStarted();

		//show loader if needed
		self._showLoader(self, self.options.loader);

		if(!progressiveRender){

			clearTimeout(self.progressiveRenderTimer);

			//get current left scroll position
			hozScrollPos = self.tableHolder.scrollLeft();

			//clear data from table before loading new
			self.table.empty();
		}


		if(!options.pagination && options.progressiveRender && !progressiveRender){
			if(options.progressiveRender !== "remote"){
				self.paginationCurrentPage = 1;
				self.paginationMaxPage = Math.ceil(self.activeData.length/self.options.progressiveRenderSize);
				options.paginationSize = options.progressiveRenderSize;
			}else{
				options.paginationSize = self.activeData.length
			}

			progressiveRender = true;
		}

		var renderData = options.pagination == "local" || options.progressiveRender ? self.activeData.slice((self.paginationCurrentPage-1) * self.options.paginationSize, ((self.paginationCurrentPage-1) * self.options.paginationSize) + self.options.paginationSize) : self.activeData;

		//build rows of table
		renderData.forEach(function(item, i){

			var row = self._renderRow(item);

			if(options.groupBy){

				// if groups in use, render column in group
				var groupVal = typeof(options.groupBy) == "function" ? options.groupBy(item) : item[options.groupBy];


				var group = $(".tabulator-group[data-value='" + groupVal + "']", self.table);

				//if group does not exist, build it
				if(group.length == 0){
					group = self._renderGroup(groupVal);
					self.table.append(group);
				}

				$(".tabulator-group-body", group).append(row);

			}else{
				//if not grouping output row to table
				self.table.append(row);
			}

		});


		//enable movable rows
		if(options.movableRows){

			//sorter options
			var config = {
				handle:".tabulator-row-handle",
				opacity: 1,
				axis: "y",
				start: function(event, ui){
					ui.item.addClass("tabulator-row-moving");
				},
				stop: function(event, ui){
					ui.item.removeClass("tabulator-row-moving");
				},
				update: function(event, ui){
					//restyle rows
					self._styleRows();

					//clear sorter arrows
					$(".tabulator-col[data-sortable=true]", self.header).data("sortdir", "desc");
					$(".tabulator-col .tabulator-arrow", self.header).removeClass("asc desc");
					self.activeData = [];

					//update active data to mach rows
					$(".tabulator-row", self.table).each(function(){
						self.activeData.push($(this).data("data"));
					});

					//trigger callback
					options.rowMoved(ui.item.data("id"), ui.item.data("data"), ui.item,ui.item.prevAll(".tabulator-row").length);
				},

			}

			//if groups enabled, set sortable on groups, otherwise set it on main table
			if(options.groupBy){
				$(".tabulator-group-body", self.table).sortable(config);
			}else{
				self.table.sortable(config);
			}
		}

		if(options.groupBy){

			$(".tabulator-group", self.table).each(function(){
				self._renderGroupHeader($(this));
			});

			self._sortElement(self.table, {}, "asc", true); //sort groups

		}

		//align column widths
		self._colRender(!self.firstRender);

		//style table rows
		self._styleRows();

		if(progressiveRender && self.paginationCurrentPage < self.paginationMaxPage && self.tableHolder[0].scrollHeight <= self.tableHolder.innerHeight()){
			self.progressiveRenderFill = true;

			//trigger progressive render to fill element
			self.paginationCurrentPage++;
			if(options.progressiveRender == "remote"){
				self._getRemotePageData(true);
			}else{
				self._renderTable(true);
			}

		}else{

			//hide loader div
			self._hideLoader(self);


			if(self.options.pagination){
				self.options.pageLoaded(self.paginationCurrentPage);
			}


			if(options.progressiveRender == "remote"){
				self.progressiveRenderFill = false;
				self.paginationCurrentPage++;
				self._getRemotePageData(true);
			}
		}

		if(!progressiveRender){
			//get current left scroll position
			self.tableHolder.scrollLeft(hozScrollPos);
		}

		if(self.firstRender){
			self.firstRender = false;
			options.tableBuilt();
		}

	},

	//render individual rows
	_renderRow:function(item){
		var self = this;
		var row = $("<div class='tabulator-row' data-id='" + item[self.options.index] + "' role='row'></div>");

		//bind row data to row
		row.data("data", item);

		//handle persistent selection
		if(self.options.selectablePersistence){

			if(self.selectedRows.some(function(sel){
				return sel === item;
			})){
				row.addClass("tabulator-selected");
			}

		}

		//bind row click events
		row.on("click", function(e){self._rowClick(e, row, item)});
		row.on("dblclick", function(e){self._rowDblClick(e, row, item)});
		row.on("contextmenu", function(e){self._rowContext(e, row, item)});

		//bind row select events

		var endSelect = function(){

			setTimeout(function(){
				self.selecting = false;
			}, 50)

			$("body").off("mouseup", endSelect);
			$("body").off("keyup", endSelect);
		}

		if(self.options.selectable && self.options.selectable != "highlight"){
			row.on("click", function(e){
				if(!self.selecting){
					self._rowSelect(row);
				}
			});

			row.on("mousedown", function(e){
				if(e.shiftKey){
					self.selecting = true;

					self.selectPrev = [];

					$("body").on("mouseup", endSelect);
					$("body").on("keyup", endSelect);

					self._rowSelect($(this));

					return false;
				}
			})

			row.on("mouseenter", function(e){
				if(self.selecting){
					self._rowSelect($(this));

					if(self.selectPrev[1] == this){
						self._rowSelect($(self.selectPrev[0]));
					}
				}
			})

			row.on("mouseout", function(e){
				if(self.selecting){
					self.selectPrev.unshift(this);
				}
			})
		}

		//add row handle if movable rows enabled
		if(self.options.movableRows){

			var handle = $("<div class='tabulator-row-handle'></div>");
			handle.append(self.options.movableRowHandle);
			row.append(handle);
		}

		$.each(self.columnList, function(i, column){
			//deal with values that arnt declared
			var value = typeof(item[column.field]) == "undefined" ? "" : item[column.field];

			// set empty values to not break search
			if(typeof(item[column.field]) == "undefined"){
				item[column.field] = "";
			}

			//set column text alignment
			var align = typeof(column.align) == "undefined" ? "left" : column.align;

			//allow tabbing on editable cells
			var tabbable = column.editable || column.editor ? "tabindex='0'" : "";
			var visibility = column.visible ? "inline-block" : "none";

			//set style as string rather than using .css for massive improvement in rendering time
			var cellStyle = "text-align: " + align + "; display:" + visibility + ";";

			var cell = $("<div class='tabulator-cell " + column.cssClass + "' " + tabbable + " style='" + cellStyle + "' data-index='" + i + "' data-field='" + column.field + "' data-value='" + self._safeString(value) + "' role='gridcell'></div>");

			//add tooltip to cell
			self._generateTooltip(cell, item, column.tooltip);

			//match editor if one exists
			if (column.editable || column.editor){
				if(column.editor){
					var editor = column.editor;
				}else{
					var editor = self.editors[column.formatter] ? column.formatter: "input";
				}
				cell.data("editor", editor);
			}

			//format cell contents
			cell.data("formatter", column.formatter);
			cell.data("formatterParams", column.formatterParams);
			cell.html(self._formatCell(column.formatter, value, item, cell, row, column.formatterParams));

			//bind cell double click function
			if(typeof(column.onDblClick) == "function"){
				cell.on("dblclick", function(e){self._cellDblClick(e, cell)});
			}

			//bind cell context function
			if(typeof(column.onContext) == "function"){
				cell.on("contextmenu", function(e){self._cellContext(e, cell)});
			}

			//bind cell click function
			if(typeof(column.onClick) == "function"){
				cell.on("click", function(e){self._cellClick(e, cell)});
			}else{
				//handle input replacement on editable cells
				if(cell.data("editor")){

					cell.on("click", function(e){
						if(!$(this).hasClass("tabulator-editing")){
							$(this).focus();
						}
					});

					cell.on("focus", function(e){
						e.stopPropagation();

						//Load editor
						var editorFunc = typeof(cell.data("editor")) == "string" ? self.editors[cell.data("editor")] : cell.data("editor");

						var cellEditor = editorFunc.call(self, cell, cell.data("value"), cell.closest(".tabulator-row").data("data"));

						//if editor returned, add to DOM, if false, abort edit
						if(cellEditor !== false){
							cell.addClass("tabulator-editing");
							cell.empty();
							cell.append(cellEditor);

							//prevent editing from tirggering rowClick event
							cell.children().click(function(e){
								e.stopPropagation();
							})
						}else{
							cell.blur();
						}

					});

					//assign cell mutator function if needed
					if(column.mutator && column.mutateType !== "data"){
						var mutator = typeof column.mutator === "function" ? column.mutator : self.mutators[column.mutator];

						cell.data("mutator", mutator);
					}
				}
			}

			row.append(cell);
		});

		return row;
	},

	//render group element
	_renderGroup:function(value){
		var group = $("<div class='tabulator-group show' data-value='" + value + "' role='rowgroup'><div class='tabulator-group-header' role='rowheader'></div><div class='tabulator-group-body'></div></div>");

		return group;
	},

	//render group set
	_renderGroupHeader:function(group){
		var self = this;

		//create sortable arrow chevrons
		var arrow = $("<div class='tabulator-arrow'></div>")
		.on("click", function(){
			$(this).closest(".tabulator-group").toggleClass("show");
		});

		var data = [];

		$(".tabulator-row", group).each(function(){
			data.push($(this).data("data"));
		});


		$(".tabulator-group-header", group)
		.html(arrow)
		.append(self.options.groupHeader(group.data("value"), $(".tabulator-row", group).length, data));

		self._setGroupOpenState(group, group.data("value"), $(".tabulator-row", group).length, data);
	},

	//set group starting open state
	_setGroupOpenState:function(group, value, count, data){
		var self = this;

		var state = self.options.groupStartOpen;

		if(typeof state == "function"){
			state = state(value, count, data);
		}

		if(state === true){
			group.addClass("show");
		}else{
			group.removeClass("show");
		}
	},

	//show loader blockout div
	_showLoader:function(self, msg){
		if(self.options.showLoader){
			$(".tabulator-loader-msg", self.loaderDiv).attr("role","alert")
			$(".tabulator-loader-msg", self.loaderDiv).empty().append(msg);
			$(".tabulator-loader-msg", self.loaderDiv).css({"margin-top":(self.element.innerHeight() / 2) - ($(".tabulator-loader-msg", self.loaderDiv).outerHeight()/2)});
			self.element.append(self.loaderDiv);
		}
	},

	//hide loader
	_hideLoader:function(self){
		$(".tablulator-loader", self.element).remove();
	},

	//generate tooltip text
	_generateTooltip:function(cell, data, tooltip){
		var self = this;

		var tooltip = tooltip || tooltip === false ? tooltip : self.options.tooltips;

		if(tooltip === true){
			tooltip = cell.data("value");
		}else if(typeof(tooltip) == "function"){
			tooltip = tooltip(cell.data("field"), cell.data("value"), data);
		}

		if(tooltip){
			cell.attr("title", tooltip);
		}else{
			cell.attr("title", "");
		}
	},


	////////////////// Column Styling //////////////////

	//resize a colum to specified width
	_resizeCol:function(index, width){
		var self = this;

		$(".tabulator-cell[data-index=" + index + "], .tabulator-col[data-index=" + index + "]",this.element).css({width:width});

		//reinstate right edge on table if fitted columns resized
		if(self.options.fitColumns){
			$(".tabulator-row .tabulator-cell:last-of-type",self.element).css("border-right","");
			$(".tabulator-col:last",self.element).css("border-right","");
		}

		self._vertAlignColHeaders();

		self._calcFrozenColumnsPos();
	},

	//set all headers to the same height
	_vertAlignColHeaders:function(){
		var self = this;

		if(self.header){
			var headerHeight = self.header.outerHeight();
			var subheadings = $(".tabulator-col-group-cols>.tabulator-col:not(.tabulator-col-group)", self.header);
			var cols = $(".tabulator-col:not(.tabulator-col-group)", self.header);

			//resize header elements
			cols.css({"padding-top":""})
			subheadings.css({"height":""});
			$(">.tabulator-col, >.tabulator-col-row-handle", self.header).css({"height":""}).css({"height":self.header.innerHeight() + "px"});
			subheadings.each(function(){
				$(this).css({"height":$(this).parent().innerHeight()})
			})

			//vertical align column headers
			if(self.options.colVertAlign !== "top"){
				cols.each(function(){
					var col = $(this);
					var height = $(".tabulator-col-content", col).outerHeight();

					col.css({"padding-top": col.innerHeight() - (self.options.colVertAlign === "bottom" ? height : height*1.5)})
				});
			}

			//resize table holder to match header height
			if(self.options.height && headerHeight != self.header.outerHeight()){
				self.tableHolder.css({
					"min-height":"calc(100% - " + self.header.outerHeight() + "px)",
					"max-height":"calc(100% - " + self.header.outerHeight() + "px)",
				});
			}
		}

		//allow for scrolling of headers if table is empty
		if(self.table.is(":empty") && self.header[0].scrollWidth > self.header.outerHeight()){
			self.table.css({
				"min-width":self.header[0].scrollWidth + "px",
				"min-height":"1px",
				"visibility":"hidden",
			});
		}else{
			self.table.css({
				"min-width":"",
				"min-height":"",
				"visibility":"",
			});
		}

	},

	//layout columns
	_colLayout:function(forceRedraw){
		var self = this;
		var options = self.options;
		var element = self.element;

		self.header.empty();
		self.columnList = [];

		self._colLayoutGroup(self.options.columns, self.header);

		if(options.responsiveLayout){
			self._buildResponsiveColumnsList();
		}


		//build list of frozen columns
		var colCount = self.columnList.length;

		self.columnFrozenLeft = [];
		self.columnFrozenRight = [];

		var freezeCont = true;

		//build left column freeze list
		for (var i = 0; i < colCount; ++i) {;
			if(self.columnList[i].frozen && freezeCont){
				self.columnFrozenLeft.push(self.columnList[i]);
			}else{
				freezeCont = false;
			}
		}

		//build right column freeze list if entire table isnt frozen
		if(self.columnFrozenLeft.length != self.columnList.length){
			freezeCont = true;

			//build right column freeze list
			for (var i = colCount - 1; i >= 0; --i) {;
				if(self.columnList[i].frozen && freezeCont){
					self.columnFrozenRight.push(self.columnList[i]);
				}else{
					freezeCont = false;
				}
			}
		}



		//create sortable arrow chevrons
		var arrow = $("<div class='tabulator-arrow'></div>");


		//handle resizable columns
		if(self.options.colResizable){
			//create resize handle
			var handle = $("<div class='tabulator-handle'></div>");
			var prevHandle = $("<div class='tabulator-handle prev'></div>");

			$(".tabulator-col", self.header).append(handle)
			.append(prevHandle);

			$(".tabulator-col .tabulator-handle", self.header).on("mousedown", function(e){

				e.stopPropagation(); //prevent resize from interfereing with movable columns

				var colHandle = $(this);

				var colElement = !colHandle.hasClass("prev") ? colHandle.closest(".tabulator-col") : colHandle.closest(".tabulator-col").prev(".tabulator-col");

				if(typeof colElement.attr("data-index") === "undefined"){
					colElement = $(".tabulator-col", colElement).last();
				}

				if(colElement){
					self.mouseDrag = e.screenX;
					self.mouseDragWidth = colElement.outerWidth();
					self.mouseDragElement = colElement;
				}

				$("body").on("mouseup", endColMove);
			})
			self.element.on("mousemove", function(e){
				if(self.mouseDrag){
					self.mouseDragElement.css({width: self.mouseDragWidth + (e.screenX - self.mouseDrag)})
					self._resizeCol(self.mouseDragElement.attr("data-index"), self.mouseDragElement.outerWidth());
				}
			})

			var endColMove = function(e){
				if(self.mouseDrag){
					e.stopPropagation();
					e.stopImmediatePropagation();

					$("body").off("mouseup", endColMove);

					self.mouseDragOut = true;

					self._resizeCol(self.mouseDragElement.attr("data-index"), self.mouseDragElement.outerWidth());

					var match = self._findColumn(self.mouseDragElement.data("field"));

					if(match){
						match.column.width = self.mouseDragElement.outerWidth();
					}

					if(self.options.persistentLayout){
						self._setPersistentCol();
					}

					self.mouseDrag = false;
					self.mouseDragWidth = false;
					self.mouseDragElement = false;
				}
			}

		}

		element.append(self.header);
		self.tableHolder.append(self.table);
		element.append(self.tableHolder);

		//handle frozen columns
		if(self.columnFrozenLeft.length){
			var leftFrozen = $("<div class='tabulator-col tabulator-frozen tabulator-frozen-left'></div>");
			self.header.prepend(leftFrozen);

			//handle movable rows
			leftFrozen.append($(".tabulator-col-row-handle", self.header));

			self.columnFrozenLeft.forEach(function(column){
				leftFrozen.append($(".tabulator-col[data-index=" + column.index + "]", self.header));
			});
		}

		if(self.columnFrozenRight.length){
			var rightFrozen = $("<div class='tabulator-col tabulator-frozen tabulator-frozen-right'></div>");
			self.header.append(rightFrozen);

			self.columnFrozenRight.forEach(function(column){
				rightFrozen.prepend($(".tabulator-col[data-index=" + column.index + "]", self.header));
			});
		}


		//add pagination footer if needed
		if(self.footer){
			element.append(self.footer);

			var footerHeight = self.header.outerHeight() + self.footer.outerHeight();

			self.tableHolder.css({
				"min-height":"calc(100% - " + footerHeight + "px)",
				"max-height":"calc(100% - " + footerHeight + "px)",
			});
		}else{
			if(self.options.height){
				self.tableHolder.css({
					"min-height":"calc(100% - " + self.header.outerHeight() + "px)",
					"max-height":"calc(100% - " + self.header.outerHeight() + "px)",
				});
			}
		}

		//set paginationSize if pagination enabled, height is set but no pagination number set, else set to ten;
		if(self.options.pagination == "local" && !self.options.paginationSize){
			if(self.options.height){
				self.options.paginationSize = Math.floor(self.tableHolder.outerHeight() / ($(".tabulator-col .tabulator-col-content", self.header).first().outerHeight()));
			}else{
				self.options.paginationSize = 10;
			}
		}

		element.on("editval", ".tabulator-cell", function(e, value){
			var element = $(this);
			if(element.is(":focus")){element.blur()}
				self._cellDataChange(element, value);
		});

		element.on("editcancel", ".tabulator-cell", function(e, value){
			self._cellDataChange($(this), $(this).data("value"));
		});

		//append sortable arrows to sortable headers
		$(".tabulator-col[data-sortable=true] .tabulator-col-content", self.header)
		.data("sortdir", "desc")
		.append(arrow.clone());

		setTimeout(function(){//give columns time to be built before rendering
			//render column headings
			self._colRender(false, forceRedraw);

			if(self.firstRender){
				if(self.options.data){
					setTimeout(function(){ //give columns time to render before looding data set
						self._parseData(self.options.data);
					}, 100);
				}else{
					if(self.options.ajaxURL){
						if(self.options.pagination === "remote"){
							self.setPage(1);
						}else if(self.options.progressiveRender == "remote"){
							self.paginationCurrentPage = 1;
							self._getRemotePageData();
						}else{
							self._getAjaxData(self.options.ajaxURL, self.options.ajaxParams, self.options.ajaxType);
						}
					}
				}
			}
		}, 100);
	},

	_colLayoutGroup:function(columns, container){
		var self = this;
		var options = self.options;
		var element = self.element;

		//add column for row handle if movable rows enabled
		if(options.movableRows){
			var handle = $("<div class='tabulator-col-row-handle' role='gridcell'>&nbsp</div>");
			self.header.append(handle);
		}

		//setup movable columns
		if(options.movableCols){

			container.sortable({
				axis: "x",
				opacity:1,
				tolerance: "pointer",
				// containment: container,
				cancel:".tabulator-col-row-handle, .tabulator-col[data-field=''], .tabulator-col[data-field=undefined], .tabulator-frozen",
				start: function(event, ui){
					ui.placeholder.css({"display":"inline-block", visibility:"visible", "width":ui.item.outerWidth()});
				},
				change: function(event, ui){
					var item = ui.item;
					var placeholder = ui.placeholder;

					placeholder.css({"display":"inline-block", visibility:"visible", "width":ui.item.outerWidth()});

					//find next column
					function nextColumn(element){

						var nextCol = element.next(".tabulator-col");

						//handle cells at end of group
						if(!nextCol.length){
							var group = element.parent().closest(".tabulator-col.tabulator-col-group");
							if(group.length){
								var nextCol = nextColumn(group);
							}
						}

						//handle next column being a column group
						if(nextCol.hasClass("tabulator-col-group")){
							return $(".tabulator-col[data-index]", nextCol).first();
						}

						return nextCol;
					}

					//move cells in column
					function moveColumn(from, to){
						$(".tabulator-row", self.table).each(function(){
							if(to.length){
								$(".tabulator-cell[data-index=" + from.data("index") + "]", $(this)).insertBefore($(".tabulator-cell[data-index=" + to.data("index") + "]", $(this)));
							}else{
								$(this).append($(".tabulator-cell[data-index=" + from.data("index") + "]", $(this)));
							}
						})
					}

					var next = nextColumn(ui.placeholder);

					if(item.index != next.data("index")){
						//move whole column groups or individual columns
						if(item.hasClass("tabulator-col-group")){
							var to = next
							$($(".tabulator-col[data-index]", item).get().reverse()).each(function(){
								moveColumn($(this), to);
								to = $(this);
							});
						}else{
							moveColumn(item, next);
						}
					}

				},
				update: function(event, ui){

					//find column layout structure
					var neighbour = ui.item.next(".tabulator-col");
					var group = ui.item.parent().closest(".tabulator-col-group");

					var from = ui.item.data("column");
					var container = group.length ? group.data("column").columns : options.columns;
					var to = neighbour.length ? neighbour.data("column") : null;

					//splice column into new position
					var column = container.splice(self._findColumn(from, container).index, 1)[0];
					to = self._findColumn(to, container).index;
					container.splice(typeof to !== "undefined" ? to : container.length , 0, column);

					//regenerate column render list
					self.columnList = [];
					self._traverseColumns(function(column){
						// column.index = self.columnList.length -1;
						self.columnList.push(column);
					})

					//trigger callback
					options.colMoved(ui.item.data("field"), options.columns);

					if(self.options.persistentLayout){
						self._setPersistentCol();
					}


				},
			});
		}

		//handle filter update
		function updateFilter(){

			var filters = {};

			//determine filter value and type
			$(".tabulator-header-filter", self.header).each(function(){
				var element = $(this);
				var filterVal = element.data("filter-val");

				if(typeof filterVal !== "undefined" && filterVal !== ""){

					var comparison = "match";

					if($("input", $(this)).length){
						if($("input", $(this)).attr("type") == "text" || $("input", $(this)).attr("type") == ""){
							comparison = "partial";
						}
					}

					filters[element.closest(".tabulator-col").data("field")] = {value:filterVal, comparison:comparison};
				}
			});

			//filter all columns
			function colFilter(data){
				var match = true;

				for(var field in filters){

					switch(filters[field].comparison){
						case "partial":
						//match partial string mathes
						if(String(data[field]).toLowerCase().indexOf(String(filters[field].value).toLowerCase()) == -1){
							match = false;
						}
						break;

						default:
						//match everything else explicitly
						if(data[field] != filters[field].value){
							match = false;
						}
						break;
					}
				}

				return match;
			}

			self.setFilter(colFilter);
		}

		//iterate through columns
		columns.forEach(function(column, i){

			if(!column.columns){
				self.columnList.push(column);
				column.index = self.columnList.length -1;

				column.sorter = typeof(column.sorter) == "undefined" ? "string" : column.sorter;
				column.sortable = typeof(column.sortable) == "undefined" ? options.sortable : column.sortable;
				column.sortable = typeof(column.field) == "undefined" ? false : column.sortable;
				column.visible = typeof(column.visible) == "undefined" ? true : column.visible;
				column.cssClass = typeof(column.cssClass) == "undefined" ? "" : column.cssClass;




				if(options.sortBy == column.field){
					var sortdir = " data-sortdir='" + options.sortDir + "' ";
					self.sortCurCol= column;
					self.sortCurDir = options.sortDir;
				}else{
					var sortdir = "";
				}

				var visibility = column.visible ? "inline-block" : "none";

				var minWidth = typeof column.minWidth === "undefined" ? options.colMinWidth : column.minWidth;

				var col = $('<div class="tabulator-col ' + column.cssClass + '" style="display:' + visibility + '; min-width:' + minWidth + ';" data-index="' + column.index + '" data-field="' + column.field + '" data-sortable=' + column.sortable + sortdir + ' role="columnheader" aria-sort="' + (options.sortBy == column.field ? (options.sortDir == "asc" ? "ascending" : "descending") : "none") + '"><div class="tabulator-col-content"><div class="tabulator-col-title"></div></div></div>');
				var colContent = $(".tabulator-col-content", col);
				var colTitle = $(".tabulator-col-title", col);

				var title = self.lang.columns[column.field] || (column.title ? column.title : "&nbsp");

				if(column.editableTitle){
					var titleElement = $("<input class='tabulator-title-editor'>");
					titleElement.val(title);

					titleElement.on("click", function(e){
						e.stopPropagation();
						$(this).focus();
					});

					titleElement.on("change", function(){
						var newTitle = $(this).val();
						column.title = newTitle;
						options.colTitleChanged(newTitle, column, options.columns);
					});

					title = titleElement;
				}

			//Manage Header Column Filters
			if(column.headerFilter){

				//select appropriate filter
				if(column.headerFilter === true){
					if(column.editor){
						var editor = column.editor;
					}else{
						var editor = self.editors[column.formatter] ? column.formatter: "input";
					}
				}else{
					var editor = column.headerFilter;
				}


				//build filter element from editor
				var editorFunc = typeof(editor) == "string" ? self.editors[editor] : editor;

				var filter = $("<div class='tabulator-header-filter'></div>");

				var cellEditor = editorFunc.call(self, filter, "");

				var typingTimer = false;

				filter.append(cellEditor);
				filter.children().attr("placeholder", self.options.headerFilterPlaceholder);

				//handle events
				cellEditor.on("click", function(e){
					e.stopPropagation();
					$(this).focus();
				});

				cellEditor.on("keyup", function(e){
					var element = $(this);

					if(typingTimer){
						clearTimeout(typingTimer);
					}

					typingTimer = setTimeout(function(){
						filter.trigger("editval", element.val())
					},300);
				});

				//special case for numeric inputs, ad additional binding incase increment buttons are used
				if(cellEditor.attr("type") == "number"){
					cellEditor.on("change", function(e){
						filter.trigger("editval", $(this).val())
					});
				}

				filter.on("editval editcancel", function(e, value){
					$(this).data("filter-val", value);
					updateFilter()
				});

				//add filter to column header
				colTitle.append(title);

				colContent.append(filter);

			}else{

				colTitle.html(title);
			}


			//added callback for custom header tooltips
			var tooltip = column.tooltipHeader ? column.tooltipHeader : (options.tooltipsHeader && column.tooltipHeader !== false ? true : false);

			if(tooltip === true){
				tooltip = title;
			}else if(typeof(tooltip) == "function"){
				tooltip = tooltip(column);
			}

			if(tooltip){
				col.attr("title", tooltip);
			}else{
				col.attr("title", "");
			}


			if(typeof(column.width) != "undefined"){
				column.width = isNaN(column.width) ? column.width : column.width + "px"; //format number

				col.data("width", column.width);

				col.css({width:column.width});
			}

			//sort tabl click binding
			if(column.sortable){
				col.on("click", function(){
					if(!self.mouseDragOut){ //prevent accidental trigger my mouseup on column drag
						self._sortClick(column, col); //trigger sort
					}
					self.mouseDragOut = false;
				})
			}

		}else{
			var col = $('<div class="tabulator-col tabulator-col-group" role="columngroup" aria-label="' + column.title + '"><div class="tabulator-col-content"><div class="tabulator-col-title">' + column.title + '</div></div><div class="tabulator-col-group-cols"></div></div>');
			self._colLayoutGroup(column.columns, $(".tabulator-col-group-cols", col));
		}
		col.data("column", column);
		container.append(col);
	});

},

	//layout columns on first render
	_colRender:function(fixedwidth, forceRedraw){
		var self = this;
		var options = self.options;
		var table = self.table;
		var header = self.header;
		var element = self.element;

		if(fixedwidth || !options.fitColumns){ //if columns have been resized and now data needs to match them
			if(options.responsiveLayout){
				self._renderResponsiveColumns();
			}

			//free sized table
			$.each(self.columnList, function(i, column){
				var colWidth = $(".tabulator-col[data-index='" + column.index + "']", element).outerWidth();
				var col = $(".tabulator-cell[data-index='" + column.index + "']", element);
				col.css({width:colWidth});
			});
		}else{

			if(options.fitColumns){
				//resize columns to fit in window

				//remove right edge border on table if fitting to width to prevent double border
				$(".tabulator-row .tabulator-cell:last-child, .tabulator-col:last", element).css("border-right","none");

				if(self.options.fitColumns){
					$(".tabulator-row", self.table).css({
						"width":"100%",
					});
				}

				var totWidth = options.movableRows ? self.element.innerWidth() - 30 : self.element.innerWidth();
				var colCount = 0;

				var widthIdeal = 0;
				var widthIdealCount = 0;
				var lastVariableCol = "";

				$.each(self.columnList, function(i, column){
					if(column.visible){

						colCount++;

						if(column.width || column.minWidth){

							var thisWidth = 0;

							var colWidth = 0;
							var minWidth =  parseInt(typeof column.minWidth === "undefined" ? options.colMinWidth : column.minWidth);

							if(typeof(column.width) == "string"){
								if(column.width.indexOf("%") > -1){
									colWidth = (totWidth / 100) * parseInt(column.width) ;
								}else{
									colWidth = parseInt(column.width);
								}

							}else{
								colWidth = column.width;
							}

							thisWidth = colWidth > minWidth ? colWidth : minWidth;

							widthIdeal += thisWidth;
							widthIdealCount++;
						}else{

							// widthIdeal +=options.colMinWidth;

							lastVariableCol = column.field;
						}
					}
				});

				var colWidth = totWidth / colCount;

				var proposedWidth = Math.floor((totWidth - widthIdeal) / (colCount - widthIdealCount));

				//prevent underflow on non integer width tables
				var gapFill = totWidth - widthIdeal - (proposedWidth * (colCount - widthIdealCount));
				gapFill = gapFill > 0 ? gapFill : 0;

				$.each(self.columnList, function(i, column){
					if(column.visible){

						var minWidth = parseInt(typeof column.minWidth === "undefined" ? options.colMinWidth : column.minWidth);

						var newWidth = proposedWidth;

						if(column.width){
							if(typeof(column.width) == "string"){
								if(column.width.indexOf("%") > -1){
									newWidth = (totWidth / 100) * parseInt(column.width) ;
								}else{
									newWidth = parseInt(column.width);
								}

							}else{
								newWidth = column.width;
							}
						}

						if(newWidth >= minWidth){

							var col = $(".tabulator-cell[data-index=" + column.index + "], .tabulator-col[data-index=" + column.index + "]", element);

							if(column.field == lastVariableCol){
								col.css({width:newWidth + gapFill});
							}else{
								if(newWidth < minWidth){
									col.css({"min-width":newWidth});
								}
								col.css({width:newWidth});

							}

						}else{
							var col = $(".tabulator-cell[data-index=" + column.index + "], .tabulator-col[data-index=" + column.index + "]", element);
							col.css({width:minWidth});
						}
					}
				});

				if(options.responsiveLayout){
					self._renderResponsiveColumns();
				}

			}else{

				//free sized table
				$.each(self.columnList, function(i, column){

					var col = $(".tabulator-cell[data-index=" + i + "], .tabulator-col[data-index=" + i+ "]", element);

					if(column.width){
						//reseize to match specified column width
						max = column.width;
					}else{
						//resize columns to widest element

						var max = 0;

						col.each(function(){
							max = $(this).outerWidth() > max ? $(this).outerWidth() : max;
						});

						if(options.colMinWidth || typeof column.minWidth !== "undefined"){

							var minWidth = parseInt(typeof column.minWidth === "undefined" ? options.colMinWidth : column.minWidth);

							max = max < minWidth ? minWidth : max;
						}

					}
					col.css({width:max});
				});

				if(options.responsiveLayout){
					self._renderResponsiveColumns();
				}

			}//
		}

		//vertically align headers
		self._vertAlignColHeaders();

		//handle frozen columns
		self._renderFrozenColumns();

		if(forceRedraw){
			self._renderTable();
		}
	},


	////////////////// Responsive Columns //////////////////

	//build the responsive columns list
	_buildResponsiveColumnsList:function(){
		var self = this;

		self.responsiveColumnList = [];
		self.responsiveColumnIndex = 0;

		self.columnList.forEach(function(col){
			if(typeof col.responsive === "undefined"){
				col.responsive = 1;
			}

			if(col.responsive){
				self.responsiveColumnList.push(col);
			}
		});


		self.responsiveColumnList = self.responsiveColumnList.reverse();
		self.responsiveColumnList = self.responsiveColumnList.sort(function(a,b){
			return b.responsive - a.responsive;
		});

	},

	//show and hide responsive columns
	_renderResponsiveColumns:function(){
		var self = this;

		var working = true;

		while(working){
			if(self.tableHolder.innerWidth() < self.tableHolder[0].scrollWidth){
				var col = self.responsiveColumnList[self.responsiveColumnIndex];
				if(col){
					var index = col.index;
					$(".tabulator-col[data-index=" + index + "], .tabulator-cell[data-index=" + index + "]", self.element).hide();

					self.responsiveColumnIndex++;
				}else{
					working = false;
				}
			}else{
				working = false;

				var col = self.responsiveColumnList[self.responsiveColumnIndex - 1];

				if(col){

					var diff = self.tableHolder.innerWidth() - self.table.outerWidth();

					if(diff > 0){

						var index = col.index;

						var first = parseInt($(".tabulator-cell[data-index=" + index + "]:first", self.element).css("width"));

						if(diff >= first){
							$(".tabulator-col[data-index=" + index + "], .tabulator-cell[data-index=" + index + "]", self.element).show();

							self.responsiveColumnIndex--;
						}else{
							working = false;
						}
					}

				}else{
					working = false;
				}
			}
		}
	},

	////////////////// Frozen Columns //////////////////


	_renderFrozenColumns:function(){
		var self = this;
		var rows;

		if(self.columnFrozenLeft.length || self.columnFrozenRight.length){

			rows = $(".tabulator-row", self.tableHolder);

			if(self.columnFrozenLeft.length){

				rows.each(function(){
					var row = $(this)
					var frozLeft;

					if(!$(".tabulator-frozen-left", row).length){
						frozLeft = $("<div class='tabulator-frozen tabulator-frozen-left'></div>");

						//handle movable rows
						frozLeft.append($(".tabulator-row-handle", row));

						row.prepend(frozLeft);
					}
				});

				self.columnFrozenLeft.forEach(function(column){
					rows.each(function(){
						var row = $(this);
						$(".tabulator-frozen-left",row).append($(".tabulator-cell[data-index=" + column.index + "]",row));
					});
				});

			}

			if(self.columnFrozenRight.length){

				rows.each(function(){
					var row = $(this)
					if(!$(".tabulator-frozen-right", row).length){
						row.append("<div class='tabulator-frozen tabulator-frozen-right'></div>");
					}
				});

				self.columnFrozenRight.forEach(function(column){
					rows.each(function(){
						var row = $(this);
						$(".tabulator-frozen-right",row).prepend($(".tabulator-cell[data-index=" + column.index + "]",row));
					});
				});

			}

			self._calcFrozenColumnsPos();
		}
	},

	_calcFrozenColumnsPos:function(hozAdjust){
		var self = this;
		var rows, left, width;

		if(self.columnFrozenLeft.length || self.columnFrozenRight.length){

			rows = $(".tabulator-row, .tabulator-header", self.element);
			left = self.tableHolder.scrollLeft()

			if(self.columnFrozenLeft.length){
				width = $(".tabulator-frozen-left", self.header).outerWidth();
				rows.css("padding-left", width);
				$(".tabulator-frozen-left", self.element).css("left", left);
			}

			if(self.columnFrozenRight.length){
				width = $(".tabulator-frozen-right", self.header).innerWidth();
				rows.css("padding-right", width)

				$(".tabulator-frozen-right", self.element).css("left",self.tableHolder.innerWidth() - width + left - (hozAdjust || 0));

			}
		}
	},



	////////////////// Row Styling //////////////////

	//style rows of the table
	_styleRows:function(minimal){
		var self = this;

		if(!minimal){
			//hover over rows
			if(self.options.selectable !== false){
				$(".tabulator-row", self.table).each(function(){
					var row = $(this);

					if(self.options.selectableCheck(row.data("data"), row)){
						row.addClass("tabulator-selectable");
					}else{
						row.addClass("tabulator-unselectable");
					}

				});
			}else{
				$(".tabulator-row", self.tableHolder).removeClass("tabulator-selectable");
			}

			//apply row formatter
			if(self.options.rowFormatter){
				$(".tabulator-row", self.table).each(function(){
					//allow row contents to be replaced with custom DOM elements
					var newRow = self.options.rowFormatter($(this), $(this).data("data"));

					if(newRow){
						$(this).html(newRow);
					}
				});
			}
		}

		//resize cells vertically to fit row contents
		if(self.element.is(":visible")){
			$(".tabulator-row", self.table).each(function(){
				$(".tabulator-cell, .tabulator-row-handle", $(this)).css({"height":$(this).innerHeight() + "px"});
			});
		}

		//trigger callbacks
		self.options.renderComplete();
	},

	//resize row to match contents
	_resizeRow:function(row){
		$(".tabulator-cell, .tabulator-row-handle", row).css({"height":""});
		$(".tabulator-cell, .tabulator-row-handle", row).css({"height":row.innerHeight() + "px"});
	},

	//format cell contents
	_formatCell:function(formatter, value, data, cell, row, formatterParams){
		var self = this;

		var formatter = typeof(formatter) == "undefined" ? "plaintext" : formatter;
		formatter = typeof(formatter) == "string" ? this.formatters[formatter] : formatter;

		return formatter.call(self, value, data, cell, row, this.options, formatterParams);
	},


	//////////////////// Row Selection Handlers ////////////////////

	//toggle row selection
	_rowSelect:function(row){
		var self = this;

		if(self.options.selectableCheck(row.data("data"), row)){
			if(row.hasClass("tabulator-selected")){
				self.deselectRow(row);
			}else{
				self.selectRow(row);
			}
		}

	},


	//clear all selected data
	_clearSelection:function(){
		var self = this;

		self.selectedRows = [];
		self.selecting = false;
		self.selectPrev = [];

	},

	//select row
	selectRow:function(row, silent){
		var self = this;
		var rowElement = $();
		var rowData = {};

		//handle select all situation
		if(typeof row === "undefined"){
			$(".tabulator-row:not(.tabulator-selected)", self.tableHolder).each(function(){
				self.selectRow($(this), true);
			})

			self._rowSelectionChanged();

			return true;
		}


		if(!isNaN(self.options.selectable) && self.options.selectable !== true){
			if(self.selectedRows.length >= self.options.selectable){

				if(self.options.selectableRollingSelection){
					self.deselectRow(self.selectedRows[0], true);
				}else{
					return false;
				}
			}
		}

		//handle different types of row input
		if(typeof row == "object"){

			if(row instanceof jQuery){

				//handle juery objects
				rowElement = row;
				rowData = rowElement.data("data");

			}else{

				//handle row data objects
				if(row[self.options.index]){
					rowElement = $(".tabulator-row[data-id=" + row[self.options.index] + "]", self.element)
				}else{
					var rowElements =  $(".tabulator-row[data-id=0]", self.element);

					rowElements.each(function(){
						var data = $(this).data("data");

						if(data === row){
							rowElement = $(this);
						}
					})
				}

				rowData = self._findRow(row);
			}

		}else{
			//handle index
			rowElement = $(".tabulator-row[data-id=" + row + "]", self.element)
			rowData = slef._findRow(row);
		}

		self.selectedRows.push(rowData);

		if(rowElement.length){
			row.addClass("tabulator-selected");

			if(!silent){
				self._rowSelectionChanged();
			}
		}else{
			return false;
		}

	},

	//deselect row
	deselectRow:function(row, silent){
		var self = this;
		var rowElement = $();
		var rowData = {};

		//handle deselect all situation
		if(typeof row === "undefined"){
			$(".tabulator-row.tabulator-selected", self.tableHolder).each(function(){
				self.deselectRow($(this), true);
			})

			self._rowSelectionChanged();

			return true;
		}


		//handle different types of row input
		if(typeof row == "object"){

			if(row instanceof jQuery){

				//handle juery objects
				rowElement = row;
				rowData = rowElement.data("data");

			}else{

				//handle row data objects
				if(row[self.options.index]){
					rowElement = $(".tabulator-row[data-id=" + row[self.options.index] + "]", self.element)
				}else{
					var rowElements =  $(".tabulator-row[data-id=0]", self.element);

					rowElements.each(function(){
						var data = $(this).data("data");

						if(data === row){
							rowElement = $(this);
						}
					})
				}

				rowData = self._findRow(row);
			}

		}else{
			//handle index
			rowElement = $(".tabulator-row[data-id=" + row + "]", self.element)
			rowData = slef._findRow(row);
		}

		self.selectedRows.forEach(function(element, i){
			if(element === rowData){
				self.selectedRows.splice(i, 1);
			}
		});


		rowElement.removeClass("tabulator-selected");

		if(!silent){
			self._rowSelectionChanged();
		}

	},

	//return currently selected data
	getSelectedData:function(){
		var self = this;

		return self.selectedRows;
	},

	//handle change in row selection count
	_rowSelectionChanged:function(){
		var self = this;

		var rows = [];

		self.selectedRows.forEach(function(row){

			var rowElement = false;

			//handle row data objects
			if(row[self.options.index]){
				rowElement = $(".tabulator-row[data-id=" + row[self.options.index] + "]", self.element)
			}else{
				var rowElements =  $(".tabulator-row[data-id=0]", self.element);

				rowElements.each(function(){
					var data = $(this).data("data");

					if(data === row){
						rowElement = $(this);
					}
				})
			}

			rows.push(rowElement);
		});

		self.options.rowSelectionChanged(self.selectedRows, rows);
	},

	////////////////// Table Interaction Handlers //////////////////

	//carry out action on row click
	_rowClick: function(e, row, data){
		this.options.rowClick(e, row.data("id"), data, row);
	},

	//carry out action on row double click
	_rowDblClick: function(e, row, data){
		this.options.rowDblClick(e, row.data("id"), data, row);
	},

	//carry out action on row context
	_rowContext: function(e, row, data){
		this.options.rowContext(e, row.data("id"), data, row);
	},

	//carry out action on cell click
	_cellClick: function(e, cell){
		var self = this;
		var index = cell.data("index");

		var match = self._findColumn(function(column){
			return column.index == index;
		});

		if(match){
			match.column.onClick(e, cell, cell.data("value"), cell.closest(".tabulator-row").data("data"));
		}
	},

	//carry out action on cell double click
	_cellDblClick: function(e, cell){
		var self = this;
		var index = cell.data("index");

		var match = self._findColumn(function(column){
			return column.index == index;
		});

		if(match){
			match.column.onDblClick(e, cell, cell.data("value"), cell.closest(".tabulator-row").data("data"));
		}
	},

	//carry out action on cell context click
	_cellContext: function(e, cell){
		var self = this;
		var index = cell.data("index");

		var match = self._findColumn(function(column){
			return column.index == index;
		});

		if(match){
			match.column.onContext(e, cell, cell.data("value"), cell.closest(".tabulator-row").data("data"));
		}
	},

	//handle cell data change
	_cellDataChange: function(cell, value){
		var self = this;
		var row = cell.closest(".tabulator-row");

		cell.removeClass("tabulator-editing");

		//update row data
		var rowData = row.data("data");
		var hasChanged = rowData[cell.data("field")] != value;
		var oldVal = rowData[cell.data("field")];

		if(hasChanged){
			//handle cell mutation if needed
			var mutator = cell.data("mutator");

			if(mutator){
				value = mutator(value, "edit", rowData);
			}

			//update cell data value
			cell.data("value", value);

			rowData[cell.data("field")] = value;
			row.data("data", rowData);
		}

		//reformat cell data
		cell.html(self._formatCell(cell.data("formatter"), value, rowData, cell, row, cell.data("formatterParams")));

		if(hasChanged){
			//triger event
			self.options.cellEdited(rowData[self.options.index], cell.data("field"), value, oldVal, rowData, cell, row);
			self._generateTooltip(cell, rowData, self._findColumn(cell.data("field")).column.tooltip);
		}

		self._styleRows();

		self.options.dataEdited(self.data);
	},

	////////////////// Formatter/Sorter Helpers //////////////////

	//return escaped string for attribute
	_safeString: function(value){
		return String(value).replace(/'/g, "&#39;");
	},

	//format date for date comparison
	_formatDate:function(dateString){
		var format = this.options.dateFormat;

		var ypos = format.indexOf("yyyy");
		var mpos = format.indexOf("mm");
		var dpos = format.indexOf("dd");

		if(dateString){
			var formattedString = dateString.substring(ypos, ypos+4) + "-" + dateString.substring(mpos, mpos+2) + "-" + dateString.substring(dpos, dpos+2);

			var newDate = Date.parse(formattedString);
		}else{
			var newDate = 0;
		}

		return isNaN(newDate) ? 0 : newDate;
	},

	////////////////// Default Sorter/Formatter/Editor Elements //////////////////

	//custom data sorters
	sorters:{
		number:function(a, b){ //sort numbers
			return parseFloat(String(a).replace(",","")) - parseFloat(String(b).replace(",",""));
		},
		string:function(a, b){ //sort strings
			return String(a).toLowerCase().localeCompare(String(b).toLowerCase());
		},
		date:function(a, b){ //sort dates
			var self = this;

			return self._formatDate(a) - self._formatDate(b);
		},
		boolean:function(a, b){ //sort booleans
			var el1 = a === true || a === "true" || a === "True" || a === 1 ? 1 : 0;
			var el2 = b === true || b === "true" || b === "True" || b === 1 ? 1 : 0;

			return el1 - el2;
		},
		alphanum:function(as, bs){//sort alpha numeric strings
			var a, b, a1, b1, i= 0, L, rx = /(\d+)|(\D+)/g, rd = /\d/;

			if(isFinite(as) && isFinite(bs)) return as - bs;
			a = String(as).toLowerCase();
			b = String(bs).toLowerCase();
			if(a === b) return 0;
			if(!(rd.test(a) && rd.test(b))) return a > b ? 1 : -1;
			a = a.match(rx);
			b = b.match(rx);
			L = a.length > b.length ? b.length : a.length;
			while(i < L){
				a1= a[i];
				b1= b[i++];
				if(a1 !== b1){
					if(isFinite(a1) && isFinite(b1)){
						if(a1.charAt(0) === "0") a1 = "." + a1;
						if(b1.charAt(0) === "0") b1 = "." + b1;
						return a1 - b1;
					}
					else return a1 > b1 ? 1 : -1;
				}
			}
			return a.length > b.length;
		},
		time:function(a, b){ //sort hh:mm formatted times
			a = a.split(":");
			b = b.split(":");

			a = (a[0]*60) + a[1];
			b = (b[0]*60) + b[1];
			return a > b;
		},
	},

	//custom data formatters
	formatters:{
		plaintext:function(value, data, cell, row, options, formatterParams){ //plain text value
			return value;
		},
		textarea:function(value, data, cell, row, options, formatterParams){ //multiline text area
			cell.css({"white-space":"pre-wrap"});
			return value;
		},
		money:function(value, data, cell, row, options, formatterParams){

			var floatVal = parseFloat(value);

			if(isNaN(floatVal)){
				return value;
			}

			var number = floatVal.toFixed(2);

			var number = number.split(".");

			var integer = number[0];
			var decimal = number.length > 1 ? "." + number[1] : "";

			var rgx = /(\d+)(\d{3})/;

			while (rgx.test(integer)){
				integer = integer.replace(rgx, "$1" + "," + "$2");
			}

			return integer + decimal;
		},
		email:function(value, data, cell, row, options, formatterParams){
			return "<a href='mailto:" + value + "'>" + value + "</a>";
		},
		link:function(value, data, cell, row, options, formatterParams){
			return "<a href='" + value + "'>" + value + "</a>";
		},
		tick:function(value, data, cell, row, options, formatterParams){
			var tick = '<svg enable-background="new 0 0 24 24" height="14" width="14" viewBox="0 0 24 24" xml:space="preserve" ><path fill="#2DC214" clip-rule="evenodd" d="M21.652,3.211c-0.293-0.295-0.77-0.295-1.061,0L9.41,14.34  c-0.293,0.297-0.771,0.297-1.062,0L3.449,9.351C3.304,9.203,3.114,9.13,2.923,9.129C2.73,9.128,2.534,9.201,2.387,9.351  l-2.165,1.946C0.078,11.445,0,11.63,0,11.823c0,0.194,0.078,0.397,0.223,0.544l4.94,5.184c0.292,0.296,0.771,0.776,1.062,1.07  l2.124,2.141c0.292,0.293,0.769,0.293,1.062,0l14.366-14.34c0.293-0.294,0.293-0.777,0-1.071L21.652,3.211z" fill-rule="evenodd"/></svg>';

			if(value === true || value === "true" || value === "True" || value === 1){
				cell.attr("aria-checked", true);
				return tick;
			}else{
				cell.attr("aria-checked", false);
				return "";
			}
		},
		tickCross:function(value, data, cell, row, options, formatterParams){
			var tick = '<svg enable-background="new 0 0 24 24" height="14" width="14" viewBox="0 0 24 24" xml:space="preserve" ><path fill="#2DC214" clip-rule="evenodd" d="M21.652,3.211c-0.293-0.295-0.77-0.295-1.061,0L9.41,14.34  c-0.293,0.297-0.771,0.297-1.062,0L3.449,9.351C3.304,9.203,3.114,9.13,2.923,9.129C2.73,9.128,2.534,9.201,2.387,9.351  l-2.165,1.946C0.078,11.445,0,11.63,0,11.823c0,0.194,0.078,0.397,0.223,0.544l4.94,5.184c0.292,0.296,0.771,0.776,1.062,1.07  l2.124,2.141c0.292,0.293,0.769,0.293,1.062,0l14.366-14.34c0.293-0.294,0.293-0.777,0-1.071L21.652,3.211z" fill-rule="evenodd"/></svg>';
			var cross = '<svg enable-background="new 0 0 24 24" height="14" width="14"  viewBox="0 0 24 24" xml:space="preserve" ><path fill="#CE1515" d="M22.245,4.015c0.313,0.313,0.313,0.826,0,1.139l-6.276,6.27c-0.313,0.312-0.313,0.826,0,1.14l6.273,6.272  c0.313,0.313,0.313,0.826,0,1.14l-2.285,2.277c-0.314,0.312-0.828,0.312-1.142,0l-6.271-6.271c-0.313-0.313-0.828-0.313-1.141,0  l-6.276,6.267c-0.313,0.313-0.828,0.313-1.141,0l-2.282-2.28c-0.313-0.313-0.313-0.826,0-1.14l6.278-6.269  c0.313-0.312,0.313-0.826,0-1.14L1.709,5.147c-0.314-0.313-0.314-0.827,0-1.14l2.284-2.278C4.308,1.417,4.821,1.417,5.135,1.73  L11.405,8c0.314,0.314,0.828,0.314,1.141,0.001l6.276-6.267c0.312-0.312,0.826-0.312,1.141,0L22.245,4.015z"/></svg>';

			if(value === true || value === "true" || value === "True" || value === 1){
				cell.attr("aria-checked", true);
				return tick;
			}else{
				cell.attr("aria-checked", false);
				return cross;
			}
		},
		star:function(value, data, cell, row, options, formatterParams){
			var maxStars = formatterParams && formatterParams.stars ? formatterParams.stars : 5;
			var stars=$("<span style='vertical-align:middle;'></span>");

			value = parseInt(value) < maxStars ? parseInt(value) : maxStars;

			var starActive = $('<svg width="14" height="14" viewBox="0 0 512 512" xml:space="preserve" style="margin:0 1px;"><polygon fill="#FFEA00" stroke="#C1AB60" stroke-width="37.6152" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" points="259.216,29.942 330.27,173.919 489.16,197.007 374.185,309.08 401.33,467.31 259.216,392.612 117.104,467.31 144.25,309.08 29.274,197.007 188.165,173.919 "/></svg>');
			var starInactive = $('<svg width="14" height="14" viewBox="0 0 512 512" xml:space="preserve" style="margin:0 1px;"><polygon fill="#D2D2D2" stroke="#686868" stroke-width="37.6152" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" points="259.216,29.942 330.27,173.919 489.16,197.007 374.185,309.08 401.33,467.31 259.216,392.612 117.104,467.31 144.25,309.08 29.274,197.007 188.165,173.919 "/></svg>');

			for(var i=1;i<= maxStars;i++){

				var nextStar = i <= value ? starActive : starInactive;

				stars.append(nextStar.clone());
			}

			cell.css({
				"white-space": "nowrap",
				"overflow": "hidden",
				"text-overflow": "ellipsis",
			});

			cell.attr("aria-label", value);

			return stars.html();
		},
		progress:function(value, data, cell, row, options, formatterParams){ //progress bar
			//set default parameters
			var max = formatterParams && formatterParams.max ? formatterParams.max : 100;
			var min = formatterParams && formatterParams.min ? formatterParams.min : 0;

			var color = formatterParams && formatterParams.color ? formatterParams.color : "#2DC214";

			//make sure value is in range
			value = parseFloat(value) <= max ? parseFloat(value) : max;
			value = parseFloat(value) >= min ? parseFloat(value) : min;

			//workout percentage
			var percent = (max - min) / 100;
			value = 100 - Math.round((value - min) / percent);

			cell.css({
				"min-width":"30px",
				"position":"relative",
			});

			cell.attr("aria-label", value);

			return "<div style='position:absolute; top:8px; bottom:8px; left:4px; right:" + value + "%; margin-right:4px; background-color:" + color + "; display:inline-block;' data-max='" + max + "' data-min='" + min + "'></div>";
		},
		color:function(value, data, cell, row, options, formatterParams){
			cell.css({"background-color":value});
			return "";
		},
		buttonTick:function(value, data, cell, row, options, formatterParams){
			return '<svg enable-background="new 0 0 24 24" height="14" width="14" viewBox="0 0 24 24" xml:space="preserve" ><path fill="#2DC214" clip-rule="evenodd" d="M21.652,3.211c-0.293-0.295-0.77-0.295-1.061,0L9.41,14.34  c-0.293,0.297-0.771,0.297-1.062,0L3.449,9.351C3.304,9.203,3.114,9.13,2.923,9.129C2.73,9.128,2.534,9.201,2.387,9.351  l-2.165,1.946C0.078,11.445,0,11.63,0,11.823c0,0.194,0.078,0.397,0.223,0.544l4.94,5.184c0.292,0.296,0.771,0.776,1.062,1.07  l2.124,2.141c0.292,0.293,0.769,0.293,1.062,0l14.366-14.34c0.293-0.294,0.293-0.777,0-1.071L21.652,3.211z" fill-rule="evenodd"/></svg>';
		},
		buttonCross:function(value, data, cell, row, options, formatterParams){
			return '<svg enable-background="new 0 0 24 24" height="14" width="14" viewBox="0 0 24 24" xml:space="preserve" ><path fill="#CE1515" d="M22.245,4.015c0.313,0.313,0.313,0.826,0,1.139l-6.276,6.27c-0.313,0.312-0.313,0.826,0,1.14l6.273,6.272  c0.313,0.313,0.313,0.826,0,1.14l-2.285,2.277c-0.314,0.312-0.828,0.312-1.142,0l-6.271-6.271c-0.313-0.313-0.828-0.313-1.141,0  l-6.276,6.267c-0.313,0.313-0.828,0.313-1.141,0l-2.282-2.28c-0.313-0.313-0.313-0.826,0-1.14l6.278-6.269  c0.313-0.312,0.313-0.826,0-1.14L1.709,5.147c-0.314-0.313-0.314-0.827,0-1.14l2.284-2.278C4.308,1.417,4.821,1.417,5.135,1.73  L11.405,8c0.314,0.314,0.828,0.314,1.141,0.001l6.276-6.267c0.312-0.312,0.826-0.312,1.141,0L22.245,4.015z"/></svg>';
		},
		rownum:function(value, data, cell, row, options, formatterParams){
			var self = this;

			var rownum = $(".tabulator-row", self.table).length + 1;

			if(self.options.pagination){
				rownum = (self.options.paginationSize * (self.paginationCurrentPage-1)) + rownum;
			}

			return rownum;
		}
	},

	//custom data editors
	editors:{
		input:function(cell, value, data){
			//create and style input
			var input = $("<input type='text'/>");
			input.css({
				"padding":"4px",
				"width":"100%",
				"box-sizing":"border-box",
			})
			.val(value);

			if(cell.hasClass("tabulator-cell")){
				setTimeout(function(){
					input.focus();
				},100);
			}

			//submit new value on blur
			input.on("change blur", function(e){
				cell.trigger("editval", input.val());
			});

			//submit new value on enter
			input.on("keydown", function(e){
				if(e.keyCode == 13){
					cell.trigger("editval", input.val());
				}
			});

			return input;
		},
		textarea:function(cell, value, data){
			var self = this;

			var count = (value.match(/(?:\r\n|\r|\n)/g) || []).length + 1;
			var row = cell.closest(".tabulator-row")

            //create and style input
            var input = $("<textarea></textarea>");
            input.css({
            	"display":"block",
            	"height":"100%",
            	"width":"100%",
            	"padding":"2px",
            	"box-sizing":"border-box",
            	"white-space":"pre-wrap",
            	"resize": "none",
            })
            .val(value);

            if(cell.hasClass("tabulator-cell")){
            	setTimeout(function(){
            		input.focus();
            	},100);
            }

            //submit new value on blur
            input.on("change blur", function(e){
            	cell.trigger("editval", input.val());
            	setTimeout(function(){
            		self._resizeRow(row);
            	},300)
            });

            input.on("keyup", function(){
            	var value = $(this).val();
            	var newCount = (value.match(/(?:\r\n|\r|\n)/g) || []).length + 1;

            	if(newCount != count){
            		var line = input.innerHeight() / count;

            		input.css({"height": (line * newCount) + "px"});

            		self._resizeRow(row);

            		count = newCount;
            	}
            });

            return input;
        },
        number:function(cell, value, data){
			//create and style input
			var input = $("<input type='number'/>");
			input.css({
				"padding":"4px",
				"width":"100%",
				"box-sizing":"border-box",
			})
			.val(value);

			if(cell.hasClass("tabulator-cell")){
				setTimeout(function(){
					input.focus();
				},100);
			}

			//submit new value on blur
			input.on("blur", function(e){
				cell.trigger("editval", input.val());
			});

			//submit new value on enter
			input.on("keydown", function(e){
				if(e.keyCode == 13){
					cell.trigger("editval", input.val());
				}
			});

			return input;
		},
		star:function(cell, value, data){

			var maxStars = $("svg", cell).length;
			maxStars = maxStars ?maxStars : 5;

			var size = $("svg:first", cell).attr("width")
			size = size ? size : 14;

			var stars=$("<div style='vertical-align:middle; padding:4px; display:inline-block; vertical-align:middle;'></div>");

			value = parseInt(value) < maxStars ? parseInt(value) : maxStars;

			var starActive = $('<svg width="' + size + '" height="' + size + '" class="tabulator-star-active" viewBox="0 0 512 512" xml:space="preserve" style="padding:0 1px;"><polygon fill="#488CE9" stroke="#014AAE" stroke-width="37.6152" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" points="259.216,29.942 330.27,173.919 489.16,197.007 374.185,309.08 401.33,467.31 259.216,392.612 117.104,467.31 144.25,309.08 29.274,197.007 188.165,173.919 "/></svg>');
			var starInactive = $('<svg width="' + size + '" height="' + size + '" class="tabulator-star-inactive" viewBox="0 0 512 512" xml:space="preserve" style="padding:0 1px;"><polygon fill="#010155" stroke="#686868" stroke-width="37.6152" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" points="259.216,29.942 330.27,173.919 489.16,197.007 374.185,309.08 401.33,467.31 259.216,392.612 117.104,467.31 144.25,309.08 29.274,197.007 188.165,173.919 "/></svg>');

			for(var i=1;i<= maxStars;i++){

				var nextStar = i <= value ? starActive : starInactive;
				stars.append(nextStar.clone());
			}

			//change number of active stars
			var starChange = function(element){
				if($(".tabulator-star-active", element.closest("div")).length != element.prevAll("svg").length + 1){
					element.prevAll("svg").replaceWith(starActive.clone());
					element.nextAll("svg").replaceWith(starInactive.clone());
					element.replaceWith(starActive.clone());
				}
			}

			stars.on("mouseover", "svg", function(e){
				e.stopPropagation();
				starChange($(this));
			});

			stars.on("mouseover", function(e){
				$("svg", $(this)).replaceWith(starInactive.clone());
			});

			stars.on("click", function(e){
				$(this).closest(".tabulator-cell").trigger("editval", 0);
			});

			stars.on("click", "svg", function(e){
				var val = $(this).prevAll("svg").length + 1;
				cell.trigger("editval", val);
			});

			cell.css({
				"white-space": "nowrap",
				"overflow": "hidden",
				"text-overflow": "ellipsis",
			});

			cell.on("blur", function(){
				$(this).trigger("editcancel");
			});

			//allow key based navigation
			cell.on("keydown", function(e){
				switch(e.keyCode){
					case 39: //right arrow
					starChange($(".tabulator-star-inactive:first", stars));
					break;

					case 37: //left arrow
					var prevstar = $(".tabulator-star-active:last", stars).prev("svg");

					if(prevstar.length){
						starChange(prevstar);
					}else{
						$("svg", stars).replaceWith(starInactive.clone());
					}
					break;

					case 13: //enter
					cell.trigger("editval", $(".tabulator-star-active", stars).length);
					break;

				}
			});

			return stars;
		},
		progress:function(cell, value, data){
			//set default parameters
			var max = $("div", cell).data("max");
			var min = $("div", cell).data("min");

			//make sure value is in range
			value = parseFloat(value) <= max ? parseFloat(value) : max;
			value = parseFloat(value) >= min ? parseFloat(value) : min;

			//workout percentage
			var percent = (max - min) / 100;
			value = 100 - Math.round((value - min) / percent);

			cell.css({
				padding:"0 4px",
			});

			cell.attr("aria-valuemin", min).attr("aria-valuemax", max)


			var newVal = function(){
				var newval = (percent * Math.round(bar.outerWidth() / (cell.width()/100))) + min;
				cell.trigger("editval", newval);
				cell.attr("aria-valuenow", newval).attr("aria-label", value);
			}

			var bar = $("<div style='position:absolute; top:8px; bottom:8px; left:4px; right:" + value + "%; margin-right:4px; background-color:#488CE9; display:inline-block; max-width:100%; min-width:0%;' data-max='" + max + "' data-min='" + min + "'></div>");

			var handle = $("<div class='tabulator-progress-handle' style='position:absolute; right:0; top:0; bottom:0; width:5px;'></div>");

			bar.append(handle);

			handle.on("mousedown", function(e){
				bar.data("mouseDrag", e.screenX);
				bar.data("mouseDragWidth", bar.outerWidth());
			});

			handle.on("mouseover", function(){$(this).css({cursor:"ew-resize"})});

			cell.on("mousemove", function(e){
				if(bar.data("mouseDrag")){
					bar.css({width: bar.data("mouseDragWidth") + (e.screenX - bar.data("mouseDrag"))})
				}
			});

			cell.on("mouseup", function(e){
				if(bar.data("mouseDrag")){
					e.stopPropagation();
					e.stopImmediatePropagation();

					bar.data("mouseDragOut", true);
					bar.data("mouseDrag", false);
					bar.data("mouseDragWidth", false);

					newVal();

				}
			});

			//allow key based navigation
			cell.on("keydown", function(e){
				switch(e.keyCode){
					case 39: //right arrow
					bar.css({"width" : bar.width() + cell.width()/100});
					break;

					case 37: //left arrow
					bar.css({"width" : bar.width() - cell.width()/100});
					break;

					case 13: //enter
					newVal();
					break;

				}
			});

			cell.on("blur", function(){
				$(this).trigger("editcancel");
			});

			return bar;
		},

		tickCross:function(cell, value, data){
			//create and style input
			var input = $("<input type='checkbox'/>");
			input.css({
				"margin-top":"5px",
				"box-sizing":"border-box",
			})
			.val(value);

			if(cell.hasClass("tabulator-cell")){
				setTimeout(function(){
					input.focus();
				},100);
			}

			if(value === true || value === "true" || value === "True" || value === 1){
				input.prop("checked", true);
			}else{
				input.prop("checked", false);
			}

			//submit new value on blur
			input.on("change blur", function(e){
				cell.trigger("editval", input.is(":checked"));
			});

			//submit new value on enter
			input.on("keydown", function(e){
				if(e.keyCode == 13){
					cell.trigger("editval", input.is(":checked"));
				}
			});

			return input;
		},

		tick:function(cell, value, data){
			//create and style input
			var input = $("<input type='checkbox'/>");
			input.css({
				"margin-top":"5px",
				"box-sizing":"border-box",
			})
			.val(value);

			if(cell.hasClass("tabulator-cell")){
				setTimeout(function(){
					input.focus();
				},100);
			}

			if(value === true || value === "true" || value === "True" || value === 1){
				input.prop("checked", true);
			}else{
				input.prop("checked", false);
			}

			//submit new value on blur
			input.on("change blur", function(e){
				cell.trigger("editval", input.is(":checked"));
			});

			//submit new value on enter
			input.on("keydown", function(e){
				if(e.keyCode == 13){
					cell.trigger("editval", input.is(":checked"));
				}
			});

			return input;
		},
	},

	//custom mutators
	mutators:{},

	//custom accessors
	accessors:{},

	////////////////// Tabulator Desconstructor //////////////////

	//deconstructor
	_destroy: function(){
		var self = this;
		var element = self.element;

		element.empty();

		element.removeClass("tabulator");
	},

});

})();
