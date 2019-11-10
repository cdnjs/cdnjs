/*
 * This file is part of the Tabulator package.
 *
 * (c) Oliver Folkerd <oliver.folkerd@gmail.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

 (function(){

 	'use strict';

 	$.widget("ui.tabulator", {

	data:[],//array to hold data for table
	activeData:[],//array to hold data that is active in the DOM

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

	loaderDiv: $("<div class='tablulator-loader'><div class='tabulator-loader-msg'></div></div>"), //loader blockout div

	//setup options
	options: {

		colMinWidth:"40px", //minimum global width for a column
		colResizable:true, //resizable columns

		height:false, //height of tabulator
		fitColumns:false, //fit colums to width of screen;

		movableCols:false, //enable movable columns
		movableRows:false, //enable movable rows
		movableRowHandle:"<div></div><div></div><div></div>", //handle for movable rows

		columnLayoutCookie:false, //store cookie with column _styles
		columnLayoutCookieID:"", //id for stored cookie

		pagination:false, //enable pagination
		paginationSize:false, //size of pages
		paginationAjax:false, //paginate internal or via ajax
		paginationElement:false, //element to hold pagination numbers

		progressiveRender:false, //enable progressive rendering
		progressiveRenderSize:20, //block size for progressive rendering
		progressiveRenderMargin:200, //disance in px before end of scroll before progressive render is triggered

		tooltips: false, //Tool tip value

		columns:[],//store for colum header info
		data:false, //store for initial table data if set at construction

		index:"id",

		sortable:true, //global default for sorting
		dateFormat: "dd/mm/yyyy", //date format to be used for sorting

		sortBy:"id", //defualt column to sort by
		sortDir:"desc", //default sort direction

		groupBy:false, //enable table grouping and set field to group by

		groupHeader:function(value, count, data){ //header layout function
			return value + "<span>(" + count + " item)</span>";
		},

		rowFormatter:false, //row formatter callback

		addRowPos:"bottom", //position to insert blank rows, top|bottom

		selectable:true, //highlight rows on hover

		ajaxURL:false, //url for ajax loading
		ajaxParams:{}, //url for ajax loading

		showLoader:true, //show loader while data loading
		loader:"<div class='tabulator-loading'>Loading Data</div>", //loader element
		loaderError:"<div class='tabulator-error'>Loading Error</div>", //loader element

		rowClick:function(){}, //do action on row click
		rowAdded:function(){}, //do action on row add
		rowEdit:function(){}, //do action on row edit
		rowDelete:function(){}, //do action on row delete
		rowContext:function(){}, //context menu action
		dataLoaded:function(){},  //callback for when data has been Loaded
		rowMoved:function(){},  //callback for when row has moved
		colMoved:function(){},  //callback for when column has moved
		pageLoaded:function(){}, //calback for when a page is loaded
	},

	////////////////// Element Construction //////////////////

	//constructor
	_create: function() {
		var self = this;
		var element = self.element;

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

		var hasIndex = false;

		//build columns from table header if they havnt been set;
		if(!options.columns.length){
			var headers = $("th", element);

			if(headers.length){
				//create column array from headers
				headers.each(function(index){

					var col = {title:$(this).text(), field:$(this).text().toLowerCase().replace(" ", "_")};

					var width = $(this).attr("width");

					if(width){
						col.width = width;
					}

					if(col.field == options.index){
						hasIndex = true;
					}

					options.columns.push(col);
				});
			}else{
				//create blank table headers
				headers = $("tr:first td", element);

				headers.each(function(index){
					var col = {title:"", field:"col" + index};

					var width = $(this).attr("width");

					if(width){
						col.width = width;
					}

					options.columns.push(col);
				});
			}
		}


		//iterate through table rows and build data set
		$("tbody tr", element).each(function(rowIndex){
			var item = {};

			//create index if the dont exist in table
			if(!hasIndex){
				item[options.index] = rowIndex;
			}

			//add row data to item
			$("td", $(this)).each(function(colIndex){
				item[options.columns[colIndex].field] = $(this).text();
			});

			self.data.push(item);
		});

		//create new element
		var newElement = $("<div></div>");

		//transfer attributes to new element
		var attributes = element.prop("attributes");

		// loop through attributes and apply them on div
		$.each(attributes, function() {
		    newElement.attr(this.name, this.value);
		});

		// replace table with div element
		element.replaceWith(newElement);

		options.data = self.data;

		newElement.tabulator(options);
	},

	//build tabulator element
	_buildElement: function() {
		var self = this;
		var options = self.options;
		var element = self.element;

		options.colMinWidth = isNaN(options.colMinWidth) ? options.colMinWidth : options.colMinWidth + "px";

		if(options.height){
			options.height = isNaN(options.height) ? options.height : options.height + "px";
			element.css({"height": options.height});
		}

		if(options.data){
			self.data = options.data;
		}

		element.addClass("tabulator");

		self.header = $("<div class='tabulator-header'></div>")

		self.tableHolder = $("<div class='tabulator-tableHolder'></div>");

		var scrollTop = 0;
		var scrollLeft = 0;
		self.tableHolder.scroll(function(){
			// if(scrollLeft != $(this).scrollLeft()){
				self.header.css({"margin-left": "-1" * $(this).scrollLeft()});
			// }

			//trigger progressive rendering on scroll
			if(self.options.progressiveRender && scrollTop != $(this).scrollTop() && scrollTop < $(this).scrollTop()){
				if($(this)[0].scrollHeight - $(this).innerHeight() - $(this).scrollTop() < self.options.progressiveRenderMargin){
					if(self.paginationCurrentPage < self.paginationMaxPage){
						self.paginationCurrentPage++;
						self._renderTable(true);
					}
				}
			}

			scrollTop = $(this).scrollTop();
		});

		//create scrollable table holder
		self.table = $("<div class='tabulator-table'></div>");


		//build pagination footer if needed
		if(options.pagination){

			if(!options.paginationElement){
				options.paginationElement = $("<div class='tabulator-footer'></div>");
				self.footer = options.paginationElement;
			}

			self.paginator = $("<span class='tabulator-paginator'><span class='tabulator-page' data-page='first'>First</span><span class='tabulator-page' data-page='prev'>Prev</span><span class='tabulator-pages'></span><span class='tabulator-page' data-page='next'>Next</span><span class='tabulator-page' data-page='last'>Last</span></span>");

			self.paginator.on("click", ".tabulator-page", function(){
				if(!$(this).hasClass("disabled")){
					self.setPage($(this).data("page"));
				}
			});

			options.paginationElement.append(self.paginator);
		}

		//layout columns
		if(options.columnLayoutCookie){
			self._getColCookie();
		}else{
			self._colLayout();
		}

	},

	//set options
	_setOption: function(option, value) {
		var self = this;

		//block update if option cannot be updated this way
		if(["columns"].indexOf(option) > -1){
			return false
		}

		//set option to value
		$.Widget.prototype._setOption.apply( this, arguments );

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

	////////////////// General Public Functions //////////////////

	//get number of elements in dataset
	dataCount:function(){
		return this.data.length;
	},


	//redraw list without updating data
	redraw:function(fullRedraw){
		var self = this;

		//redraw columns
		if(self.options.fitColumns){
			self._colRender();
		}

		//reposition loader if present
		if(self.element.innerHeight() > 0){
			$(".tabulator-loader-msg", self.loaderDiv).css({"margin-top":(self.element.innerHeight() / 2) - ($(".tabulator-loader-msg", self.loaderDiv).outerHeight()/2)})
		}

		//trigger ro restyle
		self._styleRows(true);

		if(fullRedraw){
			self._renderTable();
		}
	},

	////////////////// Column Manipulation //////////////////

	//set column style cookie
	_setColCookie:function(){
		var self = this;

		//set cookie ied
		var cookieID = self.options.columnLayoutCookieID ? self.options.columnLayoutCookieID : self.element.attr("id") ? self.element.attr("id") : "";
		cookieID = "tabulator-" + cookieID;

		//set cookie expiration far in the future
		var expDate = new Date();
		expDate.setDate(expDate.getDate() + 10000);


		//create array of column styles only
		var columnStyles = [];

		$.each(self.options.columns, function(i, column) {

			var style = {
				field: column.field,
				width: column.width,
				visible:column.visible,
			};

			columnStyles.push(style);
		});


		//JSON format column data
		var data = JSON.stringify(columnStyles);

		//save cookie
		document.cookie = cookieID + "=" + data + "; expires=" + expDate.toUTCString();
	},

	//set Column style cookie
	_getColCookie:function(){
		var self = this;

		//set cookie ied
		var cookieID = self.options.columnLayoutCookieID ? self.options.columnLayoutCookieID : self.element.attr("id") ? self.element.attr("id") : "";
		cookieID = "tabulator-" + cookieID;

		//find cookie
		var cookie = document.cookie;
		var cookiePos = cookie.indexOf(cookieID+"=");

		//if cookie exists, decode and load column data into tabulator
		if(cookiePos > -1){
			cookie = cookie.substr(cookiePos);

			var end = cookie.indexOf(";");

			if(end > -1){
				cookie = cookie.substr(0, end);
			}

			cookie = cookie.replace(cookieID+"=", "")

			self.setColumns(JSON.parse(cookie), true);
		}else{
			self._colLayout();
		}

	},

	//set tabulator columns
	setColumns: function(columns, update){
		var self = this;
		var oldColumns = self.options.columns;

		//if updateing columns work through exisiting column data
		if(update){

			var newColumns = [];

			//iterate through each of the new columns
			$.each(columns, function(i, column) {

				//find a match in the original column array
				var find = column.field;
				//var find = column.field == "" ? column : column.field;

				$.each(self.options.columns, function(i, origColumn) {

					var match = typeof(find) == "object" ? origColumn == find : origColumn.field == find;

					//if matching, update layout data and add to new column array
					if(match){

						var result = self.options.columns.splice(i, 1)[0];

						result.width = column.width;
						result.visible = column.visible;

						newColumns.push(result);

						return false;
					}

				});

			});

			//if any aditional columns left add them to the end of the table
			if(self.options.columns.length > 0){
				newColumns.concat(self.options.columns);
			}

			//replace old columns with new
			self.options.columns = newColumns;

			//Trigger Redraw
			self._colLayout();

		}else{

			// if replaceing columns, replace columns array with new
			self.options.columns = columns;

			//Trigger Redraw
			self._colLayout();
		}
	},

	//get tabulator columns
	getColumns: function(){
		var self = this;

		return self.options.columns;
	},

	//find column
	_findColumn:function(field){
		var self = this;

		var result = false

		$.each(self.options.columns, function(i, column) {
			if(typeof(field) == "object"){
				if(column == field){
					result = column;
					return false;
				}
			}else{
				if(column.field == field){
					result = column;
					return false;
				}
			}
		});

		return result;
	},


	//hide column
	hideCol: function(field){
		var self = this;
		var column = false;

		$.each(self.options.columns, function(i, item) {
			if(item.field == field){
				column = i;
				return false;
			}
		});

		if(column === false){
			return false;
		}else{
			self.options.columns[column].visible = false;
			$(".tabulator-col[data-field=" + field + "], .tabulator-cell[data-field=" + field + "]", self.element).hide();
			self._renderTable();

			if(self.options.columnLayoutCookie){
				self._setColCookie();
			}

			return true;
		}
	},

	//show column
	showCol: function(field){
		var self = this;
		var column = false;

		$.each(self.options.columns, function(i, item) {
			if(item.field == field){
				column = i;
				return false;
			}
		});

		if(column === false){
			return false;
		}else{
			self.options.columns[column].visible = true;
			$(".tabulator-col[data-field=" + field + "], .tabulator-cell[data-field=" + field + "]", self.element).show();
			self._renderTable();

			if(self.options.columnLayoutCookie){
				self._setColCookie();
			}
			return true;
		}
	},

	//toggle column visibility
	toggleCol: function(field){
		var self = this;
		var column = false;

		$.each(self.options.columns, function(i, item) {
			if(item.field == field){
				column = i;
				return false;
			}
		});

		if(column === false){
			return false;
		}else{
			self.options.columns[column].visible = !self.options.columns[column].visible;
			if(self.options.columns[column].visible){
				$(".tabulator-col[data-field=" + field + "], .tabulator-cell[data-field=" + field + "]", self.element).show();
			}else{
				$(".tabulator-col[data-field=" + field + "], .tabulator-cell[data-field=" + field + "]", self.element).hide();
			}

			if(self.options.columnLayoutCookie){
				self._setColCookie();
			}

			self._renderTable();
			return true;
		}
	},

	////////////////// Row Manipulation //////////////////

	//delete row from table by id
	deleteRow: function(item){
		var self = this;

		var id = typeof(item) == "number" ? item : item.data("data")[self.options.index]

		var row = typeof(item) == "number" ? $("[data-id=" + item + "]", self.element) :  item;

		var rowData = row.data("data");
		rowData.tabulator_delete_row = true;

		//remove from data
		var line = self.data.find(function(rowData){
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

			var length = $(".tabulator-row", group).length;

			if(length){

				var data = [];

				$(".tabulator-row", group).each(function(){
					data.push($(this).data("data"));
				});

				var header = $(".tabulator-group-header", group)
				var arrow = $(".tabulator-arrow", header).clone(true,true);

				header.empty()

				header.append(arrow).append(self.options.groupHeader(group.data("value"), $(".tabulator-row", group).length, data));
			}else{
				group.remove();
			}
		}


		//style table rows
		self._styleRows();

		//align column widths
		self._colRender(!self.firstRender);
		self._trigger("renderComplete");

		self.options.rowDelete(id);

		self._trigger("dataEdited");
	},

	//add blank row to table
	addRow:function(item){
		var self = this;

		if(item){
			item[self.options.index] = item[self.options.index]? item[self.options.index]: 0;
		}else{
			item = {id:0}
		}

		//add item to
		//self.data.push(item);

		//create blank row
		var row = self._renderRow(item);

		//append to top or bottom of table based on preference
		if(self.options.addRowPos == "top"){
			self.activeData.push(item);
			self.table.prepend(row);
		}else{
			self.activeData.unshift(item);
			self.table.append(row);
		}

		//align column widths
		self._colRender(!self.firstRender);
		self._trigger("renderComplete");

		//style table rows
		self._styleRows();

		//triger event
		self.options.rowAdded(item);

		self._trigger("dataEdited");

	},

	////////////////// Data Manipulation //////////////////

	//get array of data from the table
	getData:function(){
		var self = this;
		return self.activeData;
	},

	//load data
	setData:function(data, params){

		this._trigger("dataLoading");

		params = params ? params : {};

		//show loader if needed
		this._showLoader(this, this.options.loader)

		if(typeof(data) === "string"){
			if (data.indexOf("{") == 0 || data.indexOf("[") == 0){
				//data is a json encoded string
				this._parseData(jQuery.parseJSON(data));
			}else{
				//assume data is url, make ajax call to url to get data
				this._getAjaxData(data, params);
			}
		}else{
			if(data){
				//asume data is already an object
				this._parseData(data);

			}else{
				//no data provided, check if ajaxURL is present;
				if(this.options.ajaxURL){
					this._getAjaxData(this.options.ajaxURL, params);
				}else{
					//empty data
					this._parseData([]);
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
	_getAjaxData:function(url, params){

		var self = this;
		var options = self.options;

		$.ajax({
			url: url,
			type: "GET",
			data:params,
			async: true,
			dataType:'json',
			success: function (data) {
				self._parseData(data);
			},
			error: function (xhr, ajaxOptions, thrownError) {
				console.log("Tablulator ERROR (ajax get): " + xhr.status + " - " + thrownError);
				self._trigger("dataLoadError", xhr, thrownError);

				self._showLoader(self, self.options.loaderError);
			},
		});
	},

	//parse and index data
	_parseData:function(data){
		var self = this;

		var newData = [];

		if(data.length){
			if(typeof(data[0][self.options.index]) == "undefined"){
				self.options.index = "_index";
				$.each(data, function(i, item) {
					newData[i] = item;
					newData[i]["_index"] = i;
				});

			}else{
				$.each(data, function(i, item) {
					newData.push(item);
				});
			}
		}

		self.data = newData;

		self.options.dataLoaded(data);

		//filter incomming data
		self._filterData();
	},

	////////////////// Data Filtering //////////////////

	//filter data in table
	setFilter:function(field, type, value){
		var self = this;

		self._trigger("filterStarted");

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
		if(self.filterField ){
			self.activeData = self.data.filter(function(row){
				return self._filterRow(row);
			});
		}else{
			self.activeData = self.data;
		}

		//set the max pages available given the filter results
		if(self.options.pagination){
			self.paginationMaxPage = Math.ceil(self.activeData.length/self.options.paginationSize);
		}

		//sort or render data
		if(self.sortCurCol){
			self.sort(self.sortCurCol, self.sortCurDir);
		}else{

			//determine pagination information / render table
			if(self.options.pagination){
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
					return value.toLowerCase().indexOf(term.toLowerCase()) > -1 ? true : false;
					break;

					default:
					return false;
				}
			}
		}

		return false;
	},

	////////////////// Data Sorting //////////////////

	//handle user clicking on column header sort
	_sortClick: function(column, element){
		var self = this;

		if (element.data("sortdir") == "desc"){
			element.data("sortdir", "asc");
		}else{
			element.data("sortdir", "desc");
		}

		self.sort(column, element.data("sortdir"));
	},

	// public sorter function
	sort: function(sortList, dir){
		var self = this;
		var header = self.header;
		var options = this.options;

		if(!Array.isArray(sortList)){
			sortList = [{field: sortList, dir:dir}];
		}

		$.each(sortList, function(i, item) {

			//convert colmun name to column object
			if(typeof(item.field) == "string"){
				$.each(options.columns, function(i, col) {
					if(col.field == item.field){
						item.field = col;
						return false;
					}
				});
			}

			//reset all column sorts
			$(".tabulator-col[data-sortable=true][data-field!=" + item.field.field + "]", self.header).data("sortdir", "desc");
			$(".tabulator-col .tabulator-arrow", self.header).removeClass("asc desc")

			var element = $(".tabulator-col[data-field='" + item.field.field + "']", header);

			if (dir == "asc"){
				$(".tabulator-arrow", element).removeClass("desc").addClass("asc");
			}else{
				$(".tabulator-arrow", element).removeClass("asc").addClass("desc");
			}

			self._sorter(item.field, item.dir, sortList, i);

		});

		self._trigger("sortComplete");

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

		self._trigger("sortStarted");

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

		el1 = el1[column.field];
		el2 = el2[column.field];

		//workaround to format dates correctly
		a = column.sorter == "date" ? self._formatDate(el1) : el1;
		b = column.sorter == "date" ? self._formatDate(el2) : el2;

		//run sorter
		var sorter = typeof(column.sorter) == "undefined" ? "string" : column.sorter;
		sorter = typeof(sorter) == "string" ? self.sorters[sorter] : sorter;

		return sorter(a, b);
	},

	////////////////// Data Pagination //////////////////

	//get current page number
	getPage:function(){
		var self = this;

		return self.options.pagination ? self.paginationCurrentPage : false;
	},

	//set current paginated page
	setPage:function(page){

		var self = this;

		if(Number.isInteger(page) && page > 0 && page <= self.paginationMaxPage){
			self.paginationCurrentPage = page;
		}else{
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
			}
		}

		self._layoutPageSelector();

		self._renderTable();
	},

	//set page size for the table
	setPageSize:function(size){
		var self = this;

		self.options.paginationSize = size;
		self._filterData();
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

			pages.append("<span class='tabulator-page " + active + "' data-page='" + i + "'>" + i + "</span>");
		}

		if(self.paginationMaxPage > 10){
			if(self.paginationCurrentPage <= 4 || self.paginationCurrentPage <= self.paginationMaxPage - 4){
				pages.append(spacer.clone());
			}
		}

		$(".tabulator-page", self.paginator).removeClass("disabled");


		if(self.paginationCurrentPage == 1){
			$(".tabulator-page[data-page=first], .tabulator-page[data-page=prev]", self.paginator).addClass("disabled");
		}

		if(self.paginationCurrentPage == self.paginationMaxPage){
			$(".tabulator-page[data-page=next], .tabulator-page[data-page=last]", self.paginator).addClass("disabled");
		}

	},

	////////////////// Render Data to Table //////////////////

	//render active data to table rows
	_renderTable:function(progressiveRender){
		var self = this;
		var options = self.options

		this._trigger("renderStarted");

		//show loader if needed
		self._showLoader(self, self.options.loader)

		if(!progressiveRender){

			clearTimeout(self.progressiveRenderTimer);

			//hide table while building
			// self.table.hide();

			//clear data from table before loading new
			self.table.empty();
		}


		if(!options.pagination && options.progressiveRender && !progressiveRender){
			self.paginationCurrentPage = 1;
			self.paginationMaxPage = Math.ceil(self.activeData.length/self.options.progressiveRenderSize);

			options.paginationSize = options.progressiveRenderSize;
			progressiveRender = true;
		}

		var renderData = options.pagination || options.progressiveRender ? self.activeData.slice((self.paginationCurrentPage-1) * self.options.paginationSize, ((self.paginationCurrentPage-1) * self.options.paginationSize) + self.options.paginationSize) : self.activeData;

		//build rows of table
		renderData.forEach( function(item, i) {

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

			var moveBackground ="";
			var moveBorder ="";
			//sorter options
			var config = {
				handle:".tabulator-row-handle",
				opacity: 1,
				axis: "y",
				start: function(event, ui){
					moveBorder = ui.item.css("border");
					moveBackground = ui.item.css("background-color");

					ui.item.css({
						"border":"1px solid #000",
						"background":"#fff",
					});

				},
				stop: function(event, ui){
					ui.item.css({
						"border": moveBorder,
						"background":moveBackground,
					});
				},
				update: function(event, ui) {
					//restyle rows
					self._styleRows();

					//clear sorter arrows
					$(".tabulator-col[data-sortable=true]", self.header).data("sortdir", "desc");
					$(".tabulator-col .tabulator-arrow", self.header).removeClass("asc desc")
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

		//show table once loading complete
		// self.table.show();

		//hide loader div
		self._hideLoader(self);

		self._trigger("renderComplete");

		if(self.filterField){
			self._trigger("filterComplete");
		}

		if(self.options.pagination){
			self.options.pageLoaded(self.paginationCurrentPage);
		}

		//trigger progressive render
		if(progressiveRender && self.paginationCurrentPage < self.paginationMaxPage && self.tableHolder[0].scrollHeight <= self.tableHolder.innerHeight()){
				self.paginationCurrentPage++;
				self._renderTable(true);
		}

		self.firstRender = false;

	},

	//render individual rows
	_renderRow:function(item){

		var self = this;
		var row = $('<div class="tabulator-row" data-id="' + item[self.options.index] + '"></div>');

		//bind row data to row
		row.data("data", item);

		//bind row click events
		row.on("click", function(e){self._rowClick(e, row, item)});
		row.on("contextmenu", function(e){self._rowContext(e, row, item)});

		//add row handle if movable rows enabled
		if(self.options.movableRows){

			var handle = $("<div class='tabulator-row-handle'></div>");
			handle.append(self.options.movableRowHandle);
			row.append(handle);
		}

		$.each(self.options.columns, function(i, column) {
			//deal with values that arnt declared

			var value = typeof(item[column.field]) == 'undefined' ? "" : item[column.field];

			// set empty values to not break search
			if(typeof(item[column.field]) == 'undefined'){
				item[column.field] = "";
			}

			//set column text alignment
			var align = typeof(column.align) == 'undefined' ? "left" : column.align;

			//allow tabbing on editable cells
			var tabbable = column.editable || column.editor ? "tabindex='0'" : "";
			var visibility = column.visible ? "inline-block" : "none";

			//set style as string rather than using .css for massive improvement in rendering time
			var cellStyle = "text-align: " + align + "; display:" + visibility + ";";

			var cell = $("<div class='tabulator-cell " + column.cssClass + "' " + tabbable + " style='" + cellStyle + "' data-index='" + i + "' data-field='" + column.field + "' data-value='" + self._safeString(value) + "' ></div>");

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

						var cellEditor = editorFunc(cell, cell.data("value"));

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
				}
			}

			row.append(cell);
		});

		return row;
	},

	//render group element
	_renderGroup:function(value){
		var group =  $("<div class='tabulator-group show' data-value='" + value + "'><div class='tabulator-group-header'></div><div class='tabulator-group-body'></div></div>");

		return group;
	},

	//render group header
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
	},

	//show loader blockout div
	_showLoader:function(self, msg){
		if(self.options.showLoader){
			$(".tabulator-loader-msg", self.loaderDiv).empty().append(msg);
			$(".tabulator-loader-msg", self.loaderDiv).css({"margin-top":(self.element.innerHeight() / 2) - ($(".tabulator-loader-msg", self.loaderDiv).outerHeight()/2)})
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

		$(".tabulator-cell[data-index=" + index + "], .tabulator-col[data-index=" + index + "]",this.element).css({width:width})

		//reinstate right edge on table if fitted columns resized
		if(self.options.fitColumns){
			$(".tabulator-row .tabulator-cell:last-of-type",self.element).css("border-right","");
			$(".tabulator-col:last",self.element).css("border-right","");
		}
	},

	//layout columns
	_colLayout:function(){
		var self = this;
		var options = self.options;
		var element = self.element;

		self.header.empty();

		//create sortable arrow chevrons
		var arrow = $("<div class='tabulator-arrow'></div>");

		//add column for row handle if movable rows enabled
		if(options.movableRows){
			var handle = $('<div class="tabulator-col-row-handle">&nbsp</div>');
			self.header.append(handle);
		}

		//setup movable columns
		if(options.movableCols){
			self.header.sortable({
				axis: "x",
				opacity:1,
				cancel:".tabulator-col-row-handle, .tabulator-col[data-field=''],  .tabulator-col[data-field=undefined]",
				start: function(event, ui){
					ui.placeholder.css({"display":"inline-block", "width":ui.item.outerWidth()});
				},
				change: function(event, ui){
					ui.placeholder.css({"display":"inline-block", "width":ui.item.outerWidth()});

					var field = ui.item.data("field");
					var newPos = ui.placeholder.next(".tabulator-col").data("field")

					//cover situation where user moves back to original position
					if(newPos == field){
						newPos = ui.placeholder.next(".tabulator-col").next(".tabulator-col").data("field")
					}

					$(".tabulator-row", self.table).each(function(){

						if(newPos){
							$(".tabulator-cell[data-field=" + field + "]", $(this)).insertBefore($(".tabulator-cell[data-field=" + newPos + "]", $(this)))
						}else{
							$(this).append($(".tabulator-cell[data-field=" + field + "]", $(this)))
						}


					})
				},
				update: function(event, ui) {

					//update columns array with new positional data
					var fromField =  ui.item.data("field")
					var toField =  ui.item.next(".tabulator-col").data("field")

					var from = null;
					var to = toField ? null : options.columns.length;

					$.each(options.columns, function(i, column) {

						if(column.field && column.field == fromField){
							from = i;
						}

						if(from !== null){
							return false;
						}

					});

					var columns = options.columns.splice(from, 1)[0]

					$.each(options.columns, function(i, column) {

						if(column.field && column.field == toField){
							to = i;
						}

						if(to !== null){
							return false;
						}
					});

					options.columns.splice(to , 0, columns);

					//trigger callback
					options.colMoved(ui.item.data("field"), options.columns);

					if(self.options.columnLayoutCookie){
						self._setColCookie();
					}
				},
			});
		}//



		$.each(options.columns, function(i, column) {

			column.index = i;

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

			var title = column.title ? column.title : "&nbsp";

			var visibility = column.visible ? "inline-block" : "none";

			var col = $('<div class="tabulator-col ' + column.cssClass + '" style="display:' + visibility + '" data-index="' + i + '" data-field="' + column.field + '" data-sortable=' + column.sortable + sortdir + ' >' + title + '</div>');

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

			self.header.append(col);

		});

		//handle resizable columns
		if(self.options.colResizable){
			//create resize handle
			var handle = $("<div class='tabulator-handle'></div>");
			var prevHandle = $("<div class='tabulator-handle prev'></div>")

			$(".tabulator-col", self.header).append(handle);
			$(".tabulator-col", self.header).append(prevHandle);

			$(".tabulator-col .tabulator-handle", self.header).on("mousedown", function(e){

				e.stopPropagation(); //prevent resize from interfereing with movable columns

				var colElement = !$(this).hasClass("prev") ? $(this).closest(".tabulator-col") : $(this).closest(".tabulator-col").prev(".tabulator-col");

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
					self._resizeCol(self.mouseDragElement.data("index"), self.mouseDragElement.outerWidth());
				}
			})


			var endColMove = function(e){

				if(self.mouseDrag){
					e.stopPropagation();
					e.stopImmediatePropagation();

					$("body").off("mouseup", endColMove);

					self.mouseDragOut = true;

					self._resizeCol(self.mouseDragElement.data("index"), self.mouseDragElement.outerWidth());


					$.each(self.options.columns, function(i, item) {
						if(item.field == self.mouseDragElement.data("field")){
							item.width = self.mouseDragElement.outerWidth();
						}
					});


					if(self.options.columnLayoutCookie){
						self._setColCookie();
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
		if(self.options.pagination && !self.options.paginationSize){
			if(self.options.height){
				self.options.paginationSize = Math.floor(self.tableHolder.outerHeight() / (self.header.outerHeight() - 1))
			}else{
				self.options.paginationSize = 10;
			}
		}

		element.on("editval", ".tabulator-cell", function(e, value){
			if($(this).is(":focus")){$(this).blur()}
				self._cellDataChange($(this), value);
		})

		element.on("editcancel", ".tabulator-cell", function(e, value){
			self._cellDataChange($(this), $(this).data("value"));
		})

		//append sortable arrows to sortable headers
		$(".tabulator-col[data-sortable=true]", self.header)
		.data("sortdir", "desc")
		.append(arrow.clone());

		//render column headings
		self._colRender();

		if(self.firstRender && self.options.data){
			// self.firstRender = false;
			self._parseData(self.options.data);
		}

	},

	//layout coluns on first render
	_colRender:function(fixedwidth){
		var self = this;
		var options = self.options;
		var table = self.table;
		var header = self.header;
		var element = self.element;

		if(fixedwidth || !options.fitColumns){ //it columns have been resized and now data needs to match them
			//free sized table
			$.each(options.columns, function(i, column) {
				colWidth = $(".tabulator-col[data-index=" + i + "]", element).outerWidth();
				var col = $(".tabulator-cell[data-index=" + i + "]", element);
				col.css({width:colWidth});
			});
		}else{

			if(options.fitColumns){
				//resize columns to fit in window

				//remove right edge border on table if fitting to width to prevent double border
				$(".tabulator-row .tabulator-cell:last-child, .tabulator-col:last",element).css("border-right","none");

				if(self.options.fitColumns){
					$(".tabulator-row", self.table).css({
						"width":"100%",
					})
				}

				var totWidth = options.movableRows ? self.element.innerWidth() - 30 : self.element.innerWidth();
				var colCount = 0;

				var widthIdeal = 0;
				var widthIdealCount = 0;
				var lastVariableCol = "";

				$.each(options.columns, function(i, column) {
					if(column.visible){

						colCount++;

						if(column.width){

							var thisWidth = typeof(column.width) == "string" ? parseInt(column.width) : column.width;

							widthIdeal += thisWidth;
							widthIdealCount++;
						}else{
							lastVariableCol = column.field;
						}
					}
				});

				var colWidth = totWidth / colCount;

				var proposedWidth = Math.floor((totWidth - widthIdeal) / (colCount - widthIdealCount))

				//prevent underflow on non integer width tables
				var gapFill = totWidth - widthIdeal - (proposedWidth * (colCount - widthIdealCount));
				gapFill = gapFill > 0 ? gapFill : 0;

				if(proposedWidth >= parseInt(options.colMinWidth)){

					$.each(options.columns, function(i, column) {
						if(column.visible){
							var newWidth = column.width ? column.width : proposedWidth;

							var col = $(".tabulator-cell[data-index=" + i + "], .tabulator-col[data-index=" + i + "]",element);

							if(column.field == lastVariableCol){
								col.css({width:newWidth + gapFill});
							}else{
								col.css({width:newWidth});
							}

						}
					});

				}else{
					var col = $(".tabulator-cell, .tabulator-col",element);
					col.css({width:colWidth});
				}

			}else{

				//free sized table
				$.each(options.columns, function(i, column) {

					var col = $(".tabulator-cell[data-index=" + i + "], .tabulator-col[data-index=" + i+ "]",element)

					if(column.width){
						//reseize to match specified column width
						max = column.width;
					}else{
						//resize columns to widest element

						var max = 0;

						col.each(function(){
							max = $(this).outerWidth() > max ? $(this).outerWidth() : max
						});

						if(options.colMinWidth){
							max = max < options.colMinWidth ? options.colMinWidth : max;
						}

					}
					col.css({width:max});
				});
			}//
		}

	},

	////////////////// Row Styling //////////////////

	//style rows of the table
	_styleRows:function(minimal){

		var self = this;

		if(!minimal){
			//hover over rows
			if(self.options.selectable){
				$(".tabulator-row").addClass("selectable");
			}else{
				$(".tabulator-row").removeClass("selectable");
			}

			//apply row formatter
			if(self.options.rowFormatter){
				$(".tabulator-row", self.table).each(function(){
					//allow row contents to be replaced with custom DOM elements
					var newRow = self.options.rowFormatter($(this), $(this).data("data"));

					if(newRow){
						$(this).html(newRow)
					}
				});
			}
		}

		if(!self.options.height){
			var height = self.tableHolder.outerHeight() + self.header.outerHeight();

			if(self.footer){
				height += self.footer.outerHeight() + 1;
			}

			self.element.css({height:height})
		}

		//resize cells vertically to fit row contents
		$(".tabulator-row", self.table).each(function(){
			$(".tabulator-cell, .tabulator-row-handle", $(this)).css({"height":$(this).outerHeight() + "px"});
		})

	},

	//format cell contents
	_formatCell:function(formatter, value, data, cell, row, formatterParams){
		var formatter = typeof(formatter) == "undefined" ? "plaintext" : formatter;
		formatter = typeof(formatter) == "string" ? this.formatters[formatter] : formatter;

		return formatter(value, data, cell, row, this.options, formatterParams);
	},

	////////////////// Table Interaction Handlers //////////////////

	//carry out action on row click
	_rowClick: function(e, row, data){
		this.options.rowClick(e, row.data("id"), data, row);
	},

	//carry out action on row context
	_rowContext: function(e, row, data){
		e.preventDefault();
		this.options.rowContext(e, row.data("id"), data, row);
	},

	//carry out action on cell click
	_cellClick: function(e, cell){

		var column = this.options.columns.filter(function(column) {
			return column.index == cell.data("index");
		});

		column[0].onClick(e, cell, cell.data("value"), cell.closest(".tabulator-row").data("data") );
	},

	//handle cell data change
	_cellDataChange: function(cell, value){

		var self = this;
		var row = cell.closest(".tabulator-row");

		cell.removeClass("tabulator-editing");

		//update cell data value
		cell.data("value", value);

		//update row data
		var rowData =  row.data("data");
		var hasChanged = rowData[cell.data("field")] != value;
		rowData[cell.data("field")] = value;
		row.data("data", rowData);

		//reformat cell data
		cell.html(self._formatCell(cell.data("formatter"), value, rowData, cell, row, cell.data("formatterParams")));

		if(hasChanged){
			//triger event
			self.options.rowEdit(rowData[self.options.index], rowData, row);
			self._generateTooltip(cell, rowData, self._findColumn(cell.data("field")).tooltip);
		}

		self._styleRows();

		self._trigger("dataEdited");

	},

	////////////////// Formatter/Sorter Helpers //////////////////

	//return escaped string for attribute
	_safeString: function(value){
		return String(value).replace(/'/g, "&#39;");
	},

	//format date for date comparison
	_formatDate:function(dateString){
		var format = this.options.dateFormat

		var ypos = format.indexOf("yyyy");
		var mpos = format.indexOf("mm");
		var dpos = format.indexOf("dd");

		if(dateString){
			var formattedString = dateString.substring(ypos, ypos+4) + "-" + dateString.substring(mpos, mpos+2) + "-" + dateString.substring(dpos, dpos+2);

			var newDate = Date.parse(formattedString)
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
			return a - b;
		},
		boolean:function(a, b){ //sort booleans
			var el1 = a === true || a === "true" || a === "True" || a === 1 ? 1 : 0;
			var el2 = b === true || b === "true" || b === "True" || b === 1 ? 1 : 0;

			return el1 - el2
		},
		alphanum:function(as, bs) {
			var a, b, a1, b1, i= 0, L, rx=  /(\d+)|(\D+)/g, rd=  /\d/;

			if(isFinite(as) && isFinite(bs)) return as - bs;
			a= String(as).toLowerCase();
			b= String(bs).toLowerCase();
			if(a=== b) return 0;
			if(!(rd.test(a) && rd.test(b))) return a> b? 1: -1;
			a= a.match(rx);
			b= b.match(rx);
			L= a.length> b.length? b.length: a.length;
			while(i < L){
				a1= a[i];
				b1= b[i++];
				if(a1!== b1){
					if(isFinite(a1) && isFinite(b1)){
						if(a1.charAt(0)=== "0") a1= "." + a1;
						if(b1.charAt(0)=== "0") b1= "." + b1;
						return a1 - b1;
					}
					else return a1> b1? 1: -1;
				}
			}
			return a.length > b.length;
		},
	},

	//custom data formatters
	formatters:{
		plaintext:function(value, data, cell, row, options, formatterParams){ //plain text value
			return  value;
		},
		money:function(value, data, cell, row, options, formatterParams){
			var number =  parseFloat(value).toFixed(2);

			var number = number.split('.');

			var integer = number[0];
			var decimal = number.length > 1 ? '.' + number[1] : '';

			var rgx = /(\d+)(\d{3})/;

			while (rgx.test(integer)) {

				integer = integer.replace(rgx, '$1' + ',' + '$2');

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
			var tick = '<svg enable-background="new 0 0 24 24" height="14" width="14"  viewBox="0 0 24 24" xml:space="preserve" ><path fill="#2DC214" clip-rule="evenodd" d="M21.652,3.211c-0.293-0.295-0.77-0.295-1.061,0L9.41,14.34  c-0.293,0.297-0.771,0.297-1.062,0L3.449,9.351C3.304,9.203,3.114,9.13,2.923,9.129C2.73,9.128,2.534,9.201,2.387,9.351  l-2.165,1.946C0.078,11.445,0,11.63,0,11.823c0,0.194,0.078,0.397,0.223,0.544l4.94,5.184c0.292,0.296,0.771,0.776,1.062,1.07  l2.124,2.141c0.292,0.293,0.769,0.293,1.062,0l14.366-14.34c0.293-0.294,0.293-0.777,0-1.071L21.652,3.211z" fill-rule="evenodd"/></svg>';

			if(value === true || value === 'true' || value === 'True' || value === 1){
				return tick;
			}else{
				return "";
			}
		},
		tickCross:function(value, data, cell, row, options, formatterParams){
			var tick = '<svg enable-background="new 0 0 24 24" height="14" width="14"  viewBox="0 0 24 24" xml:space="preserve" ><path fill="#2DC214" clip-rule="evenodd" d="M21.652,3.211c-0.293-0.295-0.77-0.295-1.061,0L9.41,14.34  c-0.293,0.297-0.771,0.297-1.062,0L3.449,9.351C3.304,9.203,3.114,9.13,2.923,9.129C2.73,9.128,2.534,9.201,2.387,9.351  l-2.165,1.946C0.078,11.445,0,11.63,0,11.823c0,0.194,0.078,0.397,0.223,0.544l4.94,5.184c0.292,0.296,0.771,0.776,1.062,1.07  l2.124,2.141c0.292,0.293,0.769,0.293,1.062,0l14.366-14.34c0.293-0.294,0.293-0.777,0-1.071L21.652,3.211z" fill-rule="evenodd"/></svg>';
			var cross = '<svg enable-background="new 0 0 24 24" height="14" width="14"  viewBox="0 0 24 24" xml:space="preserve" ><path fill="#CE1515" d="M22.245,4.015c0.313,0.313,0.313,0.826,0,1.139l-6.276,6.27c-0.313,0.312-0.313,0.826,0,1.14l6.273,6.272  c0.313,0.313,0.313,0.826,0,1.14l-2.285,2.277c-0.314,0.312-0.828,0.312-1.142,0l-6.271-6.271c-0.313-0.313-0.828-0.313-1.141,0  l-6.276,6.267c-0.313,0.313-0.828,0.313-1.141,0l-2.282-2.28c-0.313-0.313-0.313-0.826,0-1.14l6.278-6.269  c0.313-0.312,0.313-0.826,0-1.14L1.709,5.147c-0.314-0.313-0.314-0.827,0-1.14l2.284-2.278C4.308,1.417,4.821,1.417,5.135,1.73  L11.405,8c0.314,0.314,0.828,0.314,1.141,0.001l6.276-6.267c0.312-0.312,0.826-0.312,1.141,0L22.245,4.015z"/></svg>';

			if(value === true || value === 'true' || value === 'True' || value === 1){
				return tick;
			}else{
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
			})

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

			return "<div style='position:absolute; top:8px; bottom:8px; left:4px; right:" + value + "%; margin-right:4px; background-color:" + color + "; display:inline-block;' data-max='" + max + "' data-min='" + min + "'></div>"
		},
		color:function(value, data, cell, row, options, formatterParams){
			cell.css({"background-color":value});
			return "";
		},
		buttonTick:function(value, data, cell, row, options, formatterParams){
			return '<svg enable-background="new 0 0 24 24" height="14" width="14"  viewBox="0 0 24 24" xml:space="preserve" ><path fill="#2DC214" clip-rule="evenodd" d="M21.652,3.211c-0.293-0.295-0.77-0.295-1.061,0L9.41,14.34  c-0.293,0.297-0.771,0.297-1.062,0L3.449,9.351C3.304,9.203,3.114,9.13,2.923,9.129C2.73,9.128,2.534,9.201,2.387,9.351  l-2.165,1.946C0.078,11.445,0,11.63,0,11.823c0,0.194,0.078,0.397,0.223,0.544l4.94,5.184c0.292,0.296,0.771,0.776,1.062,1.07  l2.124,2.141c0.292,0.293,0.769,0.293,1.062,0l14.366-14.34c0.293-0.294,0.293-0.777,0-1.071L21.652,3.211z" fill-rule="evenodd"/></svg>';
		},
		buttonCross:function(value, data, cell, row, options, formatterParams){
			return '<svg enable-background="new 0 0 24 24" height="14" width="14"  viewBox="0 0 24 24" xml:space="preserve" ><path fill="#CE1515" d="M22.245,4.015c0.313,0.313,0.313,0.826,0,1.139l-6.276,6.27c-0.313,0.312-0.313,0.826,0,1.14l6.273,6.272  c0.313,0.313,0.313,0.826,0,1.14l-2.285,2.277c-0.314,0.312-0.828,0.312-1.142,0l-6.271-6.271c-0.313-0.313-0.828-0.313-1.141,0  l-6.276,6.267c-0.313,0.313-0.828,0.313-1.141,0l-2.282-2.28c-0.313-0.313-0.313-0.826,0-1.14l6.278-6.269  c0.313-0.312,0.313-0.826,0-1.14L1.709,5.147c-0.314-0.313-0.314-0.827,0-1.14l2.284-2.278C4.308,1.417,4.821,1.417,5.135,1.73  L11.405,8c0.314,0.314,0.828,0.314,1.141,0.001l6.276-6.267c0.312-0.312,0.826-0.312,1.141,0L22.245,4.015z"/></svg>';
		},

	},

	//custom data editors
	editors:{
		input:function(cell, value){

			//create and style input
			var input = $("<input type='text'/>");
			input.css({
				"border":"1px",
				"background":"transparent",
				"padding":"4px",
				"width":"100%",
				"box-sizing":"border-box",
			})
			.val(value);

			setTimeout(function(){
				input.focus();
			},100)

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
		number:function(cell, value){

			//create and style input
			var input = $("<input type='number'/>");
			input.css({
				"border":"1px",
				"background":"transparent",
				"padding":"4px",
				"width":"100%",
				"box-sizing":"border-box",
			})
			.val(value);

			setTimeout(function(){
				input.focus();
			},100)

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
		star:function(cell, value){
			var maxStars = $("svg", cell).length;
			var size = $("svg:first", cell).attr("width");
			var stars=$("<div style='vertical-align:middle; padding:4px; display:inline-block; vertical-align:middle;'></div>");

			value = parseInt(value) < maxStars ? parseInt(value) : maxStars;

			var starActive = $('<svg width="' + size + '" height="' + size + '" class="tabulator-star-active" viewBox="0 0 512 512" xml:space="preserve" style="padding:0 1px;"><polygon fill="#488CE9" stroke="#014AAE" stroke-width="37.6152" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" points="259.216,29.942 330.27,173.919 489.16,197.007 374.185,309.08 401.33,467.31 259.216,392.612 117.104,467.31 144.25,309.08 29.274,197.007 188.165,173.919 "/></svg>');
			var starInactive = $('<svg width="' + size + '" height="' + size + '" class="tabulator-star-inactive"  viewBox="0 0 512 512" xml:space="preserve" style="padding:0 1px;"><polygon fill="#010155" stroke="#686868" stroke-width="37.6152" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" points="259.216,29.942 330.27,173.919 489.16,197.007 374.185,309.08 401.33,467.31 259.216,392.612 117.104,467.31 144.25,309.08 29.274,197.007 188.165,173.919 "/></svg>');

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
			})

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
			})

			cell.on("blur", function(){
				$(this).trigger("editcancel");
			});

			//allow key based navigation
			cell.on("keydown", function(e){
				switch(e.keyCode){
					case 39: //right arrow
					starChange($(".tabulator-star-inactive:first", stars))
					break;

					case 37: //left arrow
					var prevstar = $(".tabulator-star-active:last", stars).prev("svg")

					if(prevstar.length){
						starChange(prevstar)
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
		progress:function(cell, value){
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

			var newVal = function(){
				var newval = (percent * Math.round(bar.outerWidth() / (cell.width()/100))) + min;
				cell.trigger("editval", newval);
			}

			var bar = $("<div style='position:absolute; top:8px; bottom:8px; left:4px; right:" + value + "%; margin-right:4px; background-color:#488CE9; display:inline-block; max-width:100%; min-width:0%;' data-max='" + max + "' data-min='" + min + "'></div>");

			var handle = $("<div class='tabulator-progress-handle' style='position:absolute; right:0; top:0; bottom:0; width:5px;'></div>");

			bar.append(handle);

			handle.on("mousedown", function(e){
				bar.data("mouseDrag", e.screenX);
				bar.data("mouseDragWidth", bar.outerWidth());
			})

			handle.on("mouseover", function(){$(this).css({cursor:"ew-resize"})})

			cell.on("mousemove", function(e){
				if(bar.data("mouseDrag")){
					bar.css({width: bar.data("mouseDragWidth") + (e.screenX - bar.data("mouseDrag"))})
				}
			})

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


		tickCross:function(cell, value){
			//create and style input
			var input = $("<input type='checkbox'/>");
			input.css({
				"border":"1px",
				"background":"transparent",
				"margin-top":"5px",
				"box-sizing":"border-box",
			})
			.val(value);

			setTimeout(function(){
				input.focus();
			},100)

			if(value === true || value === 'true' || value === 'True' || value === 1){
				input.prop("checked", true)
			}else{
				input.prop("checked", false)
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

		tick:function(cell, value){
			//create and style input
			var input = $("<input type='checkbox'/>");
			input.css({
				"border":"1px",
				"background":"transparent",
				"margin-top":"5px",
				"box-sizing":"border-box",
			})
			.val(value);

			setTimeout(function(){
				input.focus();
			},100)

			if(value === true || value === 'true' || value === 'True' || value === 1){
				input.prop("checked", true)
			}else{
				input.prop("checked", false)
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

	////////////////// Tabulator Desconstructor //////////////////

	//deconstructor
	_destroy: function() {
		var self = this;
		var element = self.element;

		element.empty();

		element.removeClass("tabulator");
	},

});

})();