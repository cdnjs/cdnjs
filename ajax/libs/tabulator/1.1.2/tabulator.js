$.widget("ui.tabulator", {


data:[],//array to hold data for table
firstRender:true, //layout table widths correctly on first render
mouseDrag:false, //mouse drag tracker;
mouseDragWidth:false, //starting width of colum on mouse drag
mouseDragElement:false, //column being dragged
mouseDragOut:false, //catch to prevent mouseup on col drag triggering click on sort
sortCurCol:null,//column name of currently sorted column
sortCurDir:null,//column name of currently sorted column

//setup options
options: {
	backgroundColor: "#888", //background color of tabulator
	borderColor:"#999", //border to tablulator

	textSize: "14px", //table text size

	headerBackgroundColor:"#e6e6e6", //border to tablulator
	headerTextColor:"#555", //header text colour
	headerBorderColor:"#aaa", //header border color
	headerSeperatorColor:"#999", //header bottom seperator color
	headerMargin:"4px",

	rowBackgroundColor:"#fff", //table row background color
	rowBorderColor:"#aaa", //table border color
	rowTextColor:"#333", //table text color
	rowHoverBackground:"#bbb", //row background color on hover

	colMinWidth:"40px", //minimum global width for a column
	colResizable:true, //resizable columns

	height:false, //height of tabulator
	fitColumns:false, //fit colums to width of screen;

	columns:[],//stor for colum header info

	sortable:true, //global default for sorting
	dateFormat: "dd/mm/yyyy", //date format to be used for sorting
	sortArrows:{ //colors for sorting arrows
		active: "#666",
		inactive: "#bbb",
	},

	sortBy:"id", //defualt column to sort by
	sortDir:"desc", //default sort direction

	addRowPos:"bottom", //position to insert blank rows, top|bottom

	selectable:true, //highlight rows on hover

	ajaxURL:false, //url for ajax loading

	showLoader:true, //show loader while data loading
	loader:"<div style='display:inline-block; border:4px solid #333; border-radius:10px; background:#fff; font-weight:bold; font-size:16px; color:#000; padding:10px 20px;'>Loading Data</div>", //loader element
	loaderError:"<div style='display:inline-block; border:4px solid #D00; border-radius:10px; background:#fff; font-weight:bold; font-size:16px; color:#590000; padding:10px 20px;'>Loading Error</div>", //loader element

	rowClick:function(){}, //do action on row click
	rowAdded:function(){}, //do action on row add
	rowEdit:function(){}, //do action on row edit
	rowDelete:function(){}, //do action on row delete
	rowContext:function(){}, //context menu action
	dataLoaded:function(){},  //callback for when data has been Loaded
},

//loader blockout div
loaderDiv: $("<div class='tablulator-loader' style='position:absolute; top:0; left:0; z-index:100; height:100%; width:100%; background:rgba(0,0,0,.4); text-align:center;'><div class='tabulator-loader-msg'></div></div>"),

//show loader blockout div
_showLoader:function(self, msg){
	if(self.options.showLoader){
		$(".tabulator-loader-msg", self.loaderDiv).empty().append(msg);
		$(".tabulator-loader-msg", self.loaderDiv).css({"margin-top":(self.element.innerHeight() / 2) - ($(".tabulator-loader-msg", self.loaderDiv).outerHeight()/2)})
		self.element.append(self.loaderDiv);
	}
},


_hideLoader:function(self){
	$(".tablulator-loader", self.element).remove();
},


//event triggers
//dataLoading:-  callback for when data is being loaded

//dataLoadError:-  callback for when there is adata loading error
//renderStarted:-  callback for when table is starting to render
//renderComplete:-  callback for when table is rendered
//sortStarted:-  callback for when sorting has begun
//sortComplete:-  callback for when sorting is complete

//constructor
_create: function() {
	var self = this;
	var options = self.options;
	var element = self.element;

	options.textSize = isNaN(options.textSize) ? options.textSize : options.textSize + "px";
	options.colMinWidth = isNaN(options.colMinWidth) ? options.colMinWidth : options.colMinWidth + "px";

	options.textSizeNum = parseInt(options.textSize.replace("px",""));
	headerMargin = parseInt(options.headerMargin.replace("px",""));
	options.headerHeight =  options.textSizeNum + (headerMargin*2) + 2;

	if(options.height){
		options.height = isNaN(options.height) ? options.height : options.height + "px";
		element.css({"height": options.height});
	}

	element.addClass("tabulator");
	element.css({
		position:"relative",
		"box-sizing" : "border-box",
		"background-color": options.backgroundColor,
		"border": "1px solid " + options.borderColor,
		//"overflow-x":"auto",
		"overflow":"hidden",
	})

	self.header = $("<div class='tabulator-header'></div>")

	self.header.css({
		position:"relative",

		"background-color": options.headerBackgroundColor,
		"border-bottom":"1px solid " + options.headerSeperatorColor,
		"color": options.headerTextColor,
		"font-size":options.textSize,
		"font-weight":"bold",
		"white-space": "nowrap",
		"z-index":"1",
		"overflow":"visible",
	});

	self.tableHolder = $("<div class='tabulator-tableHolder'></div>");

	self.tableHolder.css({
		"position":"absolute",
		"z-index":"1",
		"min-height":"calc(100% - " + (options.headerHeight + 1) + "px)",
		"max-height":"calc(100% - " + (options.headerHeight + 1) + "px)",
		"white-space": "nowrap",
		"overflow":"auto",
		"width":"100%",
	});

	self.tableHolder.scroll(function(){
		self.header.css({"margin-left": "-1" * $(this).scrollLeft()});
	});

	//create scrollable table holder
	self.table = $("<div class='tabulator-table'></div>");


	self.table.css({
		position:"relative",
		"font-size":options.textSize,
		"white-space": "nowrap",
		"z-index":"1",
		"display":"inline-block",
		"overflow":"visible",
	});

	//create sortable arrow chevrons
	var arrow = $("<div class='tabulator-arrow'></div>");
	arrow.css({
		display: "inline-block",
		position: "absolute",
		top:"9px",
		right:"8px",
		width: 0,
		height: 0,
		"border-left": "6px solid transparent",
		"border-right": "6px solid transparent",
		"border-bottom": "6px solid " + options.sortArrows.inactive,
	});

	$.each(options.columns, function(i, column) {

		column.sorter = typeof(column.sorter) == "undefined" ? "string" : column.sorter;
		column.sortable = typeof(column.sortable) == "undefined" ? options.sortable : column.sortable;

		if(options.sortBy == column.field){
			var sortdir = " data-sortdir='" + options.sortDir + "' ";
			self.sortCurCol= column;
			self.sortCurDir = options.sortDir;
		}else{
			var sortdir = "";
		}

		var title = column.title ? column.title : "&nbsp";

		var col = $('<div class="tabulator-col" style="display:inline-block" data-field="' + column.field + '" data-sortable=' + column.sortable + sortdir + ' >' + title + '</div>');

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

element.append(self.header);
self.tableHolder.append(self.table);
element.append(self.tableHolder);

	//layout headers
	$(".tabulator-col", self.header).css({
		"padding":"4px",
		"text-align":"left",
		"position":"relative",
		"border-right":"1px solid " + options.headerBorderColor,
		"box-sizing":"border-box",
		"user-select":"none",
		"white-space": "nowrap",
		"overflow": "hidden",
		"text-overflow": "ellipsis",
		"vertical-align": "bottom",
	});

	//handle resizable columns
	if(self.options.colResizable){
		//create resize handle
		var handle = $("<div class='tabulator-handle' style='position:absolute; right:0; top:0; bottom:0; width:5px;'></div>")
		handle.on("mousedown", function(e){
			self.mouseDrag = e.screenX;
			self.mouseDragWidth = $(this).closest(".tabulator-col").outerWidth();
			self.mouseDragElement = $(this).closest(".tabulator-col");
		})
		self.element.on("mousemove", function(e){
			if(self.mouseDrag){
				self.mouseDragElement.css({width: self.mouseDragWidth + (e.screenX - self.mouseDrag)})
				self._resizeCol(self.mouseDragElement.data("field"), self.mouseDragElement.outerWidth());
			}
		})
		self.element.on("mouseup", function(e){

			if(self.mouseDrag){
				e.stopPropagation();
				e.stopImmediatePropagation();

				self.mouseDragOut = true;

				self._resizeCol(self.mouseDragElement.data("field"), self.mouseDragElement.outerWidth());

				self.mouseDrag = false;
				self.mouseDragWidth = false;
				self.mouseDragElement = false;
			}
		});

		handle.on("mouseover", function(){$(this).css({cursor:"ew-resize"})})

		$(".tabulator-col", self.header).append(handle);

		$(".tabulator-col", self.header).on("mouseup", function(){

		});

		element.on("change", ".tabulator-cell input", function(e){
			self._cellDataChange($(this));
		})
	}

	//append sortable arrows to sortable headers
	$(".tabulator-col[data-sortable=true]", self.header).css({"padding-right":"25px"})
	.data("sortdir", "desc")
	.on("mouseover", function(){$(this).css({cursor:"pointer", "background-color":"rgba(0,0,0,.1)"})})
	.on("mouseout", function(){$(this).css({"background-color":"transparent"})})
	.append(arrow.clone());

	//render column headings
	self._colRender();

},

//set options
_setOption: function(option, value) {
	$.Widget.prototype._setOption.apply( this, arguments );
},

//handle cell data change
_cellDataChange: function(input){

	var self = this;

	var cell = input.closest(".tabulator-cell");
	var row = cell.closest(".tabulator-row");

	//update cell data value
	cell.data("value", input.val());

	//update row data
	var rowData =  row.data("data");
	rowData[cell.data("field")] = input.val();
	row.data("data", rowData);

	if(rowData.id){
		//update tabulator data
		self.data[rowData.id] = rowData;
	}


	//triger event
	self.options.rowEdit(rowData.id, rowData, row);

},

//delete row from table by id
deleteRow: function(item){
	var self = this;

	var id = typeof(item) == "number" ? item : item.data("data").id;

	if(self.data[id]){
		//remove row from data
		self.data.splice(id, 1);
	}

	if(id){
		//remove row from table
		$("[data-id=" + id + "]", self.element).remove();
	}else{
		//remove row from table
		item.remove();
	}

	//style table rows
	self._styleRows();

	//align column widths
	self._colRender(!self.firstRender);
	self._trigger("renderComplete");

	self.options.rowDelete(id);
},

//add blank row to table
addRow:function(item){
	var self = this;

	if(item){
		item.id = item.id ? item.id : 0;
	}else{
		item = {id:0}
	}

	//create blank row
	var row = self._renderRow(item);

	//append to top or bottom of table based on preference
	if(self.options.addRowPos == "top"){
		self.table.prepend(row);
	}else{
		self.table.append(row);
	}
	//style table rows
	self._styleRows();

	//align column widths
	self._colRender(!self.firstRender);
	self._trigger("renderComplete");

	//triger event
	self.options.rowAdded(item);

},

//get array of data from the table
getData:function(){
	var self = this;


	var allData = [];

	//get all data from array
	self.data.forEach( function(item, i) {
		allData.push(item);
	});

	//get all new elements from list
	$("[data-id=0]", self.element).each(function(){
		allData.push($(this).data("data"));
	});

	return allData;
},

//load data
setData:function(data){

	this._trigger("dataLoading");

	//show loader if needed
	this._showLoader(this, this.options.loader)

	if(typeof(data) === "string"){
		if (data.indexOf("{") == 0 || data.indexOf("[") == 0){
			//data is a json encoded string
			this._parseData(jQuery.parseJSON(data));
		}else{
			//assume data is url, make ajax call to url to get data
			this._getAjaxData(data);
		}
	}else{
		if(data){
			//asume data is already an object
			this._parseData(data);

		}else{
			//no data provided, check if ajaxURL is present;
			if(this.options.ajaxURL){
				this._getAjaxData(this.options.ajaxURL);
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
	this._renderTable();
},

//parse and index data
_parseData:function(data){

	var newData = [];

	$.each(data, function(i, item) {
		newData[item.id] = item;
	});

	this.data = newData;

	this.options.dataLoaded(data);
	this._renderTable();
},

//get json data via ajax
_getAjaxData:function(url){

	var self = this;

	$.ajax({
		url: url,
		type: "GET",
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

_renderTable:function(){
	var self = this;

	this._trigger("renderStarted");

	//hide table while building
	self.table.hide();
	//show loader if needed
	self._showLoader(self, self.options.loader)

	//clear data from table before loading new
	self.table.empty();

	//build rows of table
	self.data.forEach( function(item, i) {
		self.table.append(self._renderRow(item));
	});

	self.table.css({//
		"background-color":self.options.rowBackgroundColor,
		"color":self.options.rowTextColor,
	});

	//style table rows
	self._styleRows();

	//sort data if already sorted
	if(self.sortCurCol){
		self._sorter(self.sortCurCol, self.sortCurDir);
	}


	//show table once loading complete
	self.table.show();

	//align column widths
	self._colRender(!self.firstRender);

	//hide loader div
	self._hideLoader(self);

	self._trigger("renderComplete");

},

//render individual rows
_renderRow:function(item){

	var self = this;

	var row = $('<div class="tabulator-row" data-id="' + item.id + '"></div>');

	//bind row data to row
	row.data("data", item);

	//bind row click events
	row.on("click", function(e){self._rowClick(e, row, item)});
	row.on("contextmenu", function(e){self._rowContext(e, row, item)});

	$.each(self.options.columns, function(i, column) {
		//deal with values that arnt declared

		var value = typeof(item[column.field]) == 'undefined' ? "" : item[column.field];

		// set empty values to not break search
		if(typeof(item[column.field]) == 'undefined'){
			item[column.field] = "";
		}

		//set column text alignment
		var align = typeof(column.align) == 'undefined' ? "left" : column.align;

		var cell = $("<div class='tabulator-cell' data-field='" + column.field + "' data-value='" + self._safeString(value) + "' ></div>");

		cell.css({

			"text-align": align,
			"box-sizing":"border-box",
			"display":"inline-block",
			"vertical-align":"middle",
			"min-height":self.options.headerHeight,
			"white-space":"nowrap",
			"overflow":"hidden",
			"text-overflow":"ellipsis",
		})

		//add textbox if cell is editable
		if(column.editable){
			cell.html("<input type='text'/>");
			$("input", cell).css({
				"border":"none",
				"background":"transparent",
				"padding":"4px",
				"width":"100%",
				"box-sizing":"border-box",
			});
			$("input", cell).val(value);
		}else{

			cell.css({padding: "4px"});
			//format cell contents
			cell.html(self._formatCell(column.formatter, value, item, cell, row));
		}



		//bind cell click function
		if(typeof(column.onClick) == "function"){
			cell.on("click", function(e){self._cellClick(e, cell)});
		}

		row.append(cell);
	});

return row;
},

//get number of elements in dataset
dataCount:function(){
	return this.data.length;
},


//redraw list without updating data
redraw:function(){
	var self = this

	//redraw columns
	if(self.options.fitColumns){
		self._colRender();
	}

	//reposition loader if present
	if(self.element.innerHeight() > 0){
		$(".tabulator-loader-msg", self.loaderDiv).css({"margin-top":(self.element.innerHeight() / 2) - ($(".tabulator-loader-msg", self.loaderDiv).outerHeight()/2)})
	}
},

//resize a colum to specified width
_resizeCol:function(field, width){
	$(".tabulator-cell[data-field=" + field + "], .tabulator-col[data-field=" + field + "]",this.element).css({width:width})
},

//layout coluns on first render
_colRender:function(fixedwidth){
	var self = this;
	var options = self.options;
	var table = self.table;
	var header = self.header;
	var element = self.element;

	self.firstRender = false;

	if(fixedwidth && !options.fitColumns){ //it columns have been resized and now data needs to match them
		//free sized table
		$.each(options.columns, function(i, column) {
			colWidth = $(".tabulator-col[data-field=" + column.field + "]", element).outerWidth();
			var col = $(".tabulator-cell[data-field=" + column.field + "]", element);
			col.css({width:colWidth});
		});
	}else{

		if(options.fitColumns){
			//resize columns to fit in window

			if(self.options.fitColumns){
				$(".tabulator-row", self.table).css({
					"width":"100%",
				})
			}

			var totWidth = self.element.innerWidth();
			var colCount = options.columns.length;
			var colWidth = totWidth / colCount;

			var widthIdeal = 0;
			var widthIdealCount = 0;

			$.each(options.columns, function(i, column) {
				if(column.width){

					var thisWidth = typeof(column.width) == "string" ? parseInt(column.width) : column.width;

					widthIdeal += thisWidth;
					widthIdealCount++;
				}
			});

			var proposedWidth = Math.floor((totWidth - widthIdeal) / (colCount - widthIdealCount))

			if(proposedWidth >= parseInt(options.colMinWidth)){

				$.each(options.columns, function(i, column) {
					var newWidth = column.width ? column.width : proposedWidth;

					var col = $(".tabulator-cell[data-field=" + column.field + "], .tabulator-col[data-field=" + column.field + "]",element);
					col.css({width:newWidth});
				});

			}else{
				var col = $(".tabulator-cell, .tabulator-col",element);
				col.css({width:colWidth});
			}

		}else{

			//free sized table
			$.each(options.columns, function(i, column) {

				var col = $(".tabulator-cell[data-field=" + column.field + "], .tabulator-col[data-field=" + column.field + "]",element)

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

//style rows of the table
_styleRows:function(){

	var self = this;

	//fixes IE rendering bug on table redraw
	$(".tabulator-tableHolder", self.element).css({height:$(".tabulator-table", self.element).height()});

	$(".tabulator-row", self.table).css({"background-color":"transparent"})

	//hover over rows
	if(self.options.selectable){
		$(".tabulator-row", self.table)
		.on("mouseover", function(){$(this).css({cursor:"pointer", "background-color":self.options.rowHoverBackground})})
		.on("mouseout", function(){$(this).css({"background-color":"transparent"})})
	}

	//color odd rows
	$(".tabulator-row:nth-of-type(even)", self.table).css({
		"background-color": "rgba(0,0,0,.1);" //shade even numbered rows
	})
	.on("mouseout", function(){$(this).css({"background-color": "rgba(0,0,0,.08);"})}); //make sure odd rows revert back to color after hover

	//add column borders to rows
	$(".tabulator-cell", self.table).css({
		"border-right":"1px solid " + self.options.rowBorderColor,
	});

	if(!self.options.height){
		self.element.css({height:self.table.outerHeight() + self.options.headerHeight + 3})
	}
},

//format cell contents
_formatCell:function(formatter, value, data, cell, row){
	var formatter = typeof(formatter) == "undefined" ? "plaintext" : formatter;
	formatter = typeof(formatter) == "string" ? this.formatters[formatter] : formatter;

	return formatter(value, data, cell, row,  this.options);
},

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
		return column.field == cell.data("field");
	});

	column[0].onClick(e, cell, cell.data("value"), cell.closest(".tabulator-row").data("data")  );
},

//return escaped string for attribute
_safeString: function(value){
	return String(value).replace(/'/g, "&#39;");
},

_sortClick: function(column, element){
	var self = this;
	var header = self.header;
	var options = this.options;

	//reset all column sorts
	$(".tabulator-col[data-sortable=true][data-field!=" + column.field + "]", self.header).data("sortdir", "desc");
	$(".tabulator-col .tabulator-arrow", self.header).css({
		"border-top": "none",
		"border-bottom": "6px solid " + options.sortArrows.inactive,
	})

	if (element.data("sortdir") == "desc"){
		element.data("sortdir", "asc");
		$(".tabulator-arrow", element).css({
			"border-top": "none",
			"border-bottom": "6px solid " + options.sortArrows.active,
		});
	}else{
		element.data("sortdir", "desc");
		$(".tabulator-arrow", element).css({
			"border-top": "6px solid " + options.sortArrows.active,
			"border-bottom": "none",
		});
	}

	self._sorter(column, element.data("sortdir"));
},

_sorter: function(column, dir){

	var self = this;
	var table = self.table;
	var data = self.data;

	self._trigger("sortStarted");

	self.sortCurCol = column;
	self.sortCurDir = dir;

	$(".tabulator-row", table).sort(function(a,b) {

		//switch elements depending on search direction
		el1 = dir == "asc" ? $(a).data("data") : $(b).data("data")
		el2 = dir == "asc" ? $(b).data("data") : $(a).data("data")

		//workaround to format dates correctly
		a = column.sorter == "date" ? self._formatDate(el1[column.field]) : el1[column.field];
		b = column.sorter == "date" ? self._formatDate(el2[column.field]) : el2[column.field];

		//run sorter
		var sorter = typeof(column.sorter) == "undefined" ? "plaintext" : column.sorter;
		sorter = typeof(sorter) == "string" ? self.sorters[sorter] : sorter;
		return sorter(a, b);

	}).appendTo(table);

	//style table rows
	self._styleRows();

	self._trigger("sortComplete");
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

//custom data sorters
sorters:{
	number:function(a, b){ //sort numbers
		return parseFloat(a) - parseFloat(b);
	},
	string:function(a, b){ //sort strings
		return String(a).toLowerCase().localeCompare(String(b).toLowerCase());
	},
	date:function(a, b){ //sort dates
		return a - b;
	},
	boolean:function(a, b){ //sort booleans
		el1 = a === true || a === "true" || a === "True" || a === 1 ? 1 : 0;
		el2 = b === true || b === "true" || b === "True" || b === 1 ? 1 : 0;

		return el1 - el2
	},
},


//custom data formatters
formatters:{
	plaintext:function(value, data, cell, row, options){ //plain text value
		return value;
	},
	email:function(value, data, cell, row, options){
		return "<a href='mailto:" + value + "'>" + value + "</a>";
	},
	link:function(value, data, cell, row, options){
		return "<a href='" + value + "'>" + value + "</a>";
	},
	tick:function(value, data, cell, row, options){
		var tick = '<svg enable-background="new 0 0 24 24" height="' + options.textSize + '" width="' + options.textSize + '"  viewBox="0 0 24 24" xml:space="preserve" ><path fill="#2DC214" clip-rule="evenodd" d="M21.652,3.211c-0.293-0.295-0.77-0.295-1.061,0L9.41,14.34  c-0.293,0.297-0.771,0.297-1.062,0L3.449,9.351C3.304,9.203,3.114,9.13,2.923,9.129C2.73,9.128,2.534,9.201,2.387,9.351  l-2.165,1.946C0.078,11.445,0,11.63,0,11.823c0,0.194,0.078,0.397,0.223,0.544l4.94,5.184c0.292,0.296,0.771,0.776,1.062,1.07  l2.124,2.141c0.292,0.293,0.769,0.293,1.062,0l14.366-14.34c0.293-0.294,0.293-0.777,0-1.071L21.652,3.211z" fill-rule="evenodd"/></svg>';

		if(value === true || value === 'true' || value === 'True' || value === 1){
			return tick;
		}
	},
	tickCross:function(value, data, cell, row, options){
		var tick = '<svg enable-background="new 0 0 24 24" height="' + options.textSize + '" width="' + options.textSize + '"  viewBox="0 0 24 24" xml:space="preserve" ><path fill="#2DC214" clip-rule="evenodd" d="M21.652,3.211c-0.293-0.295-0.77-0.295-1.061,0L9.41,14.34  c-0.293,0.297-0.771,0.297-1.062,0L3.449,9.351C3.304,9.203,3.114,9.13,2.923,9.129C2.73,9.128,2.534,9.201,2.387,9.351  l-2.165,1.946C0.078,11.445,0,11.63,0,11.823c0,0.194,0.078,0.397,0.223,0.544l4.94,5.184c0.292,0.296,0.771,0.776,1.062,1.07  l2.124,2.141c0.292,0.293,0.769,0.293,1.062,0l14.366-14.34c0.293-0.294,0.293-0.777,0-1.071L21.652,3.211z" fill-rule="evenodd"/></svg>';
		var cross = '<svg enable-background="new 0 0 24 24" height="' + options.textSize + '" width="' + options.textSize + '"  viewBox="0 0 24 24" xml:space="preserve" ><path fill="#CE1515" d="M22.245,4.015c0.313,0.313,0.313,0.826,0,1.139l-6.276,6.27c-0.313,0.312-0.313,0.826,0,1.14l6.273,6.272  c0.313,0.313,0.313,0.826,0,1.14l-2.285,2.277c-0.314,0.312-0.828,0.312-1.142,0l-6.271-6.271c-0.313-0.313-0.828-0.313-1.141,0  l-6.276,6.267c-0.313,0.313-0.828,0.313-1.141,0l-2.282-2.28c-0.313-0.313-0.313-0.826,0-1.14l6.278-6.269  c0.313-0.312,0.313-0.826,0-1.14L1.709,5.147c-0.314-0.313-0.314-0.827,0-1.14l2.284-2.278C4.308,1.417,4.821,1.417,5.135,1.73  L11.405,8c0.314,0.314,0.828,0.314,1.141,0.001l6.276-6.267c0.312-0.312,0.826-0.312,1.141,0L22.245,4.015z"/></svg>';

		if(value === true || value === 'true' || value === 'True' || value === 1){
			return tick;
		}else{
			return cross;
		}
	},
	star:function(value, data, cell, row, options){
		var maxStars = 5;
		var stars=$("<span></span>");

		value = parseInt(value) < maxStars ? parseInt(value) : maxStars;

		var starActive = $('<svg width="' + options.textSize + '" height="' + options.textSize + '" viewBox="0 0 512 512" xml:space="preserve" style="margin:0 1px;"><polygon fill="#FFEA00" stroke="#C1AB60" stroke-width="37.6152" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" points="259.216,29.942 330.27,173.919 489.16,197.007 374.185,309.08 401.33,467.31 259.216,392.612 117.104,467.31 144.25,309.08 29.274,197.007 188.165,173.919 "/></svg>');
		var starInactive = $('<svg width="' + options.textSize + '" height="' + options.textSize + '" viewBox="0 0 512 512" xml:space="preserve" style="margin:0 1px;"><polygon fill="#D2D2D2" stroke="#686868" stroke-width="37.6152" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" points="259.216,29.942 330.27,173.919 489.16,197.007 374.185,309.08 401.33,467.31 259.216,392.612 117.104,467.31 144.25,309.08 29.274,197.007 188.165,173.919 "/></svg>');

		for(i=1;i<= maxStars;i++){

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
	progress:function(value, data, cell, row, options){ //progress bar
		value = parseFloat(value) <= 100 ? parseFloat(value) : 100;

		cell.css({
			"min-width":"30px",
		});

		return "<div style='margin-top:3px; height:10px; width:" + value + "%; background-color:#2DC214; '></div>"
	},
},

//deconstructor
destroy: function() {

},

});