/*
Copyright (c) 2011, Yahoo! Inc. All rights reserved.
Code licensed under the BSD License:
http://developer.yahoo.com/yui/license.html
version: 2.9.0
*/
(function() {

    /**
     * The ProfilerViewer module provides a graphical display for viewing
	 * the output of the YUI Profiler <http://developer.yahoo.com/yui/profiler>.
     * @module profilerviewer
     * @requires yahoo, dom, event, element, profiler, yuiloader
     */

    /**
     * A widget to view YUI Profiler output.
     * @namespace YAHOO.widget
     * @class ProfilerViewer
     * @extends YAHOO.util.Element
     * @constructor
     * @param {HTMLElement | String | Object} el(optional) The html 
     * element into which the ProfileViewer should be rendered. 
     * An element will be created if none provided.
     * @param {Object} attr (optional) A key map of the ProfilerViewer's 
     * initial attributes.  Ignored if first arg is an attributes object.
     */
    YAHOO.widget.ProfilerViewer = function(el, attr) {
        attr = attr || {};
        if (arguments.length == 1 && !YAHOO.lang.isString(el) && !el.nodeName) {
            attr = el;
            el = attr.element || null;
        }
        if (!el && !attr.element) {
            el = this._createProfilerViewerElement();
        }

    	YAHOO.widget.ProfilerViewer.superclass.constructor.call(this, el, attr); 
		
		this._init();
		
    };

    YAHOO.extend(YAHOO.widget.ProfilerViewer, YAHOO.util.Element);
	
	// Static members of YAHOO.widget.ProfilerViewer:
	YAHOO.lang.augmentObject(YAHOO.widget.ProfilerViewer, {
		/**
		 * Classname for ProfilerViewer containing element.
		 * @static
		 * @property CLASS
		 * @type string
		 * @public
		 * @default "yui-pv"
		 */
		CLASS: 'yui-pv',
	
		/**
		 * Classname for ProfilerViewer button dashboard. 
		 * @static
		 * @property CLASS_DASHBOARD
		 * @type string
		 * @public
		 * @default "yui-pv-dashboard"
		 */
		CLASS_DASHBOARD: 'yui-pv-dashboard',

		/**
		 * Classname for the "refresh data" button. 
		 * @static
		 * @property CLASS_REFRESH
		 * @type string
		 * @public
		 * @default "yui-pv-refresh"
		 */
		CLASS_REFRESH: 'yui-pv-refresh',

		/**
		 * Classname for busy indicator in the dashboard. 
		 * @static
		 * @property CLASS_BUSY
		 * @type string
		 * @public
		 * @default "yui-pv-busy"
		 */
		CLASS_BUSY: 'yui-pv-busy',
	
		/**
		 * Classname for element containing the chart and chart
		 * legend elements.
		 * @static
		 * @property CLASS_CHART_CONTAINER
		 * @type string
		 * @public
		 * @default "yui-pv-chartcontainer"
		 */
		CLASS_CHART_CONTAINER: 'yui-pv-chartcontainer',
	
		/**
		 * Classname for element containing the chart.
		 * @static
		 * @property CLASS_CHART
		 * @type string
		 * @public
		 * @default "yui-pv-chart"
		 */
		CLASS_CHART: 'yui-pv-chart',
		
		/**
		 * Classname for element containing the chart's legend. 
		 * @static
		 * @property CLASS_CHART_LEGEND
		 * @type string
		 * @public
		 * @default "yui-pv-chartlegend"
		 */
		CLASS_CHART_LEGEND: 'yui-pv-chartlegend',
		
		/**
		 * Classname for element containing the datatable. 
		 * @static
		 * @property CLASS_TABLE
		 * @type string
		 * @public
		 * @default "yui-pv-table"
		 */
		CLASS_TABLE: 'yui-pv-table',
		
		/**
		 * HTML strings used in the UI. Values will be inserted into DOM with innerHTML.
		 * @static
		 * @property STRINGS
		 * @object
		 * @public
		 * @default English language strings for UI.
		 */
		STRINGS: {
			title: "YUI ProfilerViewer",
			buttons: {
				viewprofiler: "View Profiler Data",
				hideprofiler: "Hide Profiler Report",
				showchart: "Show Chart",
				hidechart: "Hide Chart",
				refreshdata: "Refresh Data"
			},
			colHeads: {
				//key: [column head label, width in pixels]
				fn: ["Function/Method", null], //must auto-size
				calls: ["Calls", 40],
				avg: ["Average", 80],
				min: ["Shortest", 70],
				max: ["Longest", 70],
				total: ["Total Time", 70],
				pct: ["Percent", 70]
			},
			millisecondsAbbrev: "ms",
			initMessage: "initialiazing chart...",
			installFlashMessage: "Unable to load Flash content. The YUI Charts Control requires Flash Player 9.0.45 or higher. You can download the latest version of Flash Player from the <a href='http://www.adobe.com/go/getflashplayer'>Adobe Flash Player Download Center</a>."
		},

		/**
		 * Function used to format numbers in milliseconds
		 * for chart; must be publicly accessible, per Charts spec.
		 * @static
		 * @property timeAxisLabelFunction
		 * @type function
		 * @private
		 */
		timeAxisLabelFunction: function(n) {
			var a = (n === Math.floor(n)) ? n : (Math.round(n*1000))/1000;
			return (a + " " + YAHOO.widget.ProfilerViewer.STRINGS.millisecondsAbbrev);
		},

		/**
		 * Function used to format percent numbers for chart; must
		 * be publicly accessible, per Charts spec.
		 * @static
		 * @property percentAxisLabelFunction
		 * @type function
		 * @private
		 */
		percentAxisLabelFunction: function(n) {
			var a = (n === Math.floor(n)) ? n : (Math.round(n*100))/100;
			return (a + "%");
		}
		
	
	},true);
	

	//
	// STANDARD SHORTCUTS
	//
    var Dom = YAHOO.util.Dom;
    var Event = YAHOO.util.Event;
	var Profiler = YAHOO.tool.Profiler;
	var PV = YAHOO.widget.ProfilerViewer;
	var proto = PV.prototype;


	//
	// PUBLIC METHODS
	//
	
	 /**
     * Refreshes the data displayed in the ProfilerViewer. When called,
	 * this will invoke a refresh of the DataTable and (if displayed)
	 * the Chart.
     * @method refreshData
     * @return void
	 * @public
     */	
	proto.refreshData = function() {
		this.fireEvent("dataRefreshEvent");
	};

	 /**
     * Returns the element containing the console's header.
     * @method getHeadEl
     * @return HTMLElement
	 * @public
     */	
	proto.getHeadEl = function() {
		return (this._headEl) ? Dom.get(this._headEl) : false;
	};

	 /**
     * Returns the element containing the console's body, including
	 * the chart and the datatable..
     * @method getBodyEl
     * @return HTMLElement
	 * @public
     */	
	proto.getBodyEl = function() {
		return (this._bodyEl) ? Dom.get(this._bodyEl) : false;
	};

	 /**
     * Returns the element containing the console's chart.
     * @method getChartEl
     * @return HTMLElement
	 * @public
     */	
	proto.getChartEl = function() {
		return (this._chartEl) ? Dom.get(this._chartEl) : false;
	};

	 /**
     * Returns the element containing the console's dataTable.
     * @method getTableEl
     * @return HTMLElement
	 * @public
     */	
	proto.getTableEl = function() {
		return (this._tableEl) ? Dom.get(this._tableEl) : false;
	};

	 /**
     * Returns the element containing the console's DataTable
	 * instance.
     * @method getDataTable
     * @return YAHOO.widget.DataTable
	 * @public
     */	
	proto.getDataTable = function() {
		return this._dataTable;
	};

	 /**
     * Returns the element containing the console's Chart instance.
     * @method getChart
     * @return YAHOO.widget.BarChart
	 * @public
     */	
	proto.getChart = function() {
		return this._chart;
	};


    //
    // PRIVATE PROPERTIES
    //
    proto._rendered = false;
	proto._headEl = null;
	proto._bodyEl = null;
	proto._toggleVisibleEl = null;
	proto._busyEl = null;
	proto._busy = false;
	
	proto._tableEl = null;
	proto._dataTable = null;

	proto._chartEl = null;
	proto._chartLegendEl = null;
	proto._chartElHeight = 250;
	proto._chart = null;
	proto._chartInitialized = false;

    //
    // PRIVATE METHODS
    //

	proto._init = function() {
		/**
		 * CUSTOM EVENTS
		 **/
		
		/**
		 * Fired when a data refresh is requested. No arguments are passed
		 * with this event.
		 *
		 * @event refreshDataEvent
		 */
		this.createEvent("dataRefreshEvent");
		
		/**
		 * Fired when the viewer canvas first renders. No arguments are passed
		 * with this event.
		 *
		 * @event renderEvent
		 */
		this.createEvent("renderEvent");

		this.on("dataRefreshEvent", this._refreshDataTable, this, true);
		
		this._initLauncherDOM();
		
		if(this.get("showChart")) {
			this.on("sortedByChange", this._refreshChart);
		}

	};

	/**
	 * If no element is passed in, create it as the first element
	 * in the document.
	 * @method _createProfilerViewerElement
	 * @return HTMLElement
	 * @private
	 */
	proto._createProfilerViewerElement = function() {

		var el = document.createElement("div");
		document.body.insertBefore(el, document.body.firstChild);
		Dom.addClass(el, this.SKIN_CLASS);
		Dom.addClass(el, PV.CLASS);
		return el;
	};
			
    /**
     * Provides a readable name for the ProfilerViewer instance.
     * @method toString
     * @return String
	 * @private
	 */
    proto.toString = function() {
        return "ProfilerViewer " + (this.get('id') || this.get('tagName'));
    };

    /**
     * Toggles visibility of the viewer canvas.
     * @method _toggleVisible
     * @return void
	 * @private
     */	
	proto._toggleVisible = function() {
		
		var newVis = (this.get("visible")) ? false : true;
		this.set("visible", newVis);
    };

    /**
     * Shows the viewer canvas.
     * @method show
     * @return void
	 * @private
     */	
	 proto._show = function() {
	 	if(!this._busy) {
			this._setBusyState(true);
			if(!this._rendered) {
				var loader = new YAHOO.util.YUILoader();
				if (this.get("base")) {
					loader.base = this.get("base");
				}
				
				var modules = ["datatable"];
				if(this.get("showChart")) {
					modules.push("charts");
				}
				
				loader.insert({ require: modules,
								onSuccess: function() {
									this._render();
								},
								scope: this});
			} else {
				var el = this.get("element");
				Dom.removeClass(el, "yui-pv-minimized");
				this._toggleVisibleEl.innerHTML = PV.STRINGS.buttons.hideprofiler;
				
				//The Flash Charts component can't be set to display:none,
				//and even after positioning it offscreen the screen
				//may fail to repaint in some browsers.  Adding an empty
				//style rule to the console body can help force a repaint:
				Dom.addClass(el, "yui-pv-null");
				Dom.removeClass(el, "yui-pv-null");
				
				//Always refresh data when changing to visible:
				this.refreshData();
			}
		}
    };

    /**
     * Hides the viewer canvas.
     * @method hide
     * @return void
	 * @private
     */	
	proto._hide = function() {
		this._toggleVisibleEl.innerHTML = PV.STRINGS.buttons.viewprofiler;
		Dom.addClass(this.get("element"), "yui-pv-minimized");
    };
	
	/**
	 * Render the viewer canvas
	 * @method _render
	 * @return void
	 * @private
	 */
	proto._render = function() {
		
		Dom.removeClass(this.get("element"), "yui-pv-minimized");
		
		this._initViewerDOM();
		this._initDataTable();
		if(this.get("showChart")) {
			this._initChartDOM();
			this._initChart();
		}
		this._rendered = true;
		this._toggleVisibleEl.innerHTML = PV.STRINGS.buttons.hideprofiler;
		
		this.fireEvent("renderEvent");

	};
	
	/**
	 * Set up the DOM structure for the ProfilerViewer launcher.
	 * @method _initLauncherDOM
	 * @private
	 */
	proto._initLauncherDOM = function() {
		
		var el = this.get("element");
		Dom.addClass(el, PV.CLASS);
		Dom.addClass(el, "yui-pv-minimized");

		this._headEl = document.createElement("div");
		Dom.addClass(this._headEl, "hd");
		
		var s = PV.STRINGS.buttons;
		var b = (this.get("visible")) ? s.hideprofiler : s.viewprofiler;
		
		this._toggleVisibleEl = this._createButton(b, this._headEl);
		
		this._refreshEl = this._createButton(s.refreshdata, this._headEl);
		Dom.addClass(this._refreshEl, PV.CLASS_REFRESH);
		
		this._busyEl = document.createElement("span");
		this._headEl.appendChild(this._busyEl);

		var title = document.createElement("h4");
		title.innerHTML = PV.STRINGS.title;
		this._headEl.appendChild(title);
		
		el.appendChild(this._headEl);
		
		Event.on(this._toggleVisibleEl, "click", this._toggleVisible, this, true);
		Event.on(this._refreshEl, "click", function() {
			if(!this._busy) {
				this._setBusyState(true);
				this.fireEvent("dataRefreshEvent");
			}
		}, this, true);
	};

	/**
	 * Set up the DOM structure for the ProfilerViewer canvas,
	 * including the holder for the DataTable.
	 * @method _initViewerDOM
	 * @private
	 */
	proto._initViewerDOM = function() {
		
		var el = this.get("element");
		this._bodyEl = document.createElement("div");
		Dom.addClass(this._bodyEl, "bd");
	 	this._tableEl = document.createElement("div");
		Dom.addClass(this._tableEl, PV.CLASS_TABLE);
		this._bodyEl.appendChild(this._tableEl);
		el.appendChild(this._bodyEl);
	};

	/**
	 * Set up the DOM structure for the ProfilerViewer canvas.
	 * @method _initChartDOM
	 * @private
	 */
	proto._initChartDOM = function() {
		
		this._chartContainer = document.createElement("div");
		Dom.addClass(this._chartContainer, PV.CLASS_CHART_CONTAINER);
		
		var chl = document.createElement("div");
		Dom.addClass(chl, PV.CLASS_CHART_LEGEND);
		
		var chw = document.createElement("div");

		this._chartLegendEl = document.createElement("dl");
		this._chartLegendEl.innerHTML = "<dd>" + PV.STRINGS.initMessage + "</dd>";
		
		this._chartEl = document.createElement("div");
		Dom.addClass(this._chartEl, PV.CLASS_CHART);
		
		var msg = document.createElement("p");
		msg.innerHTML = PV.STRINGS.installFlashMessage;
		this._chartEl.appendChild(msg);
		
		this._chartContainer.appendChild(chl);
		chl.appendChild(chw);
		chw.appendChild(this._chartLegendEl);
		this._chartContainer.appendChild(this._chartEl);
		this._bodyEl.insertBefore(this._chartContainer,this._tableEl);
	};


	/**
	 * Create anchor elements for use as buttons. Args: label
	 * is text to appear on the face of the button, parentEl
	 * is the el to which the anchor will be attached, position
	 * is true for inserting as the first node and false for
	 * inserting as the last node of the parentEl.
	 * @method _createButton
	 * @private
	 */	
	proto._createButton = function(label, parentEl, position) {
		var b = document.createElement("a");
		b.innerHTML = b.title = label;
		if(parentEl) {
			if(!position) {
				parentEl.appendChild(b);
			} else {
				parentEl.insertBefore(b, parentEl.firstChild);	
			}
		}
		return b;
	};
	
	/**
	 * Set's console busy state.
	 * @method _setBusyState
	 * @private
	 **/
	proto._setBusyState = function(b) {
		if(b) {
			Dom.addClass(this._busyEl, PV.CLASS_BUSY);
			this._busy = true;
		} else {
			Dom.removeClass(this._busyEl, PV.CLASS_BUSY);
			this._busy = false;
		}
	};

	/**
	 * Generages a sorting function based on current sortedBy
	 * values.
	 * @method _createProfilerViewerElement
	 * @private
	 **/
	proto._genSortFunction = function(key, dir) {
		var by = key;
		var direction = dir;
		return function(a, b) {
			if (direction == YAHOO.widget.DataTable.CLASS_ASC) {
				return a[by] - b[by];	
			} else {
				return ((a[by] - b[by]) * -1);
			}
		};
	};

	/**
	 * Utility function for array sums.
	 * @method _arraySum
	 * @private
	 **/	
	 var _arraySum = function(arr){
		var ct = 0;
		for(var i = 0; i < arr.length; ct+=arr[i++]){}
		return ct;
	};
	
	/**
	 * Retrieves data from Profiler, filtering and sorting as needed
	 * based on current widget state.  Adds calculated percentage
	 * column and function name to data returned by Profiler.
	 * @method _getProfilerData
	 * @private
	 **/
	proto._getProfilerData = function() {
		
		var obj = Profiler.getFullReport();
		var arr = [];
		var totalTime = 0;
		for (name in obj) {
    		if (YAHOO.lang.hasOwnProperty(obj, name)) {
				var r = obj[name];
				var o = {};
				o.fn = name; //add function name to record
				o.points = r.points.slice(); //copy live array
				o.calls = r.calls;
				o.min = r.min;
				o.max = r.max;
				o.avg = r.avg;
				o.total = _arraySum(o.points);
				o.points = r.points;
				var f = this.get("filter");
				if((!f) || (f(o))) {
					arr.push(o);
					totalTime += o.total;
				}
			}
		}
		
		//add calculated percentage column
		for (var i = 0, j = arr.length; i < j; i++) {
			arr[i].pct = (totalTime) ? (arr[i].total * 100) / totalTime : 0;	
		}

		var sortedBy = this.get("sortedBy");
		var key = sortedBy.key;
		var dir = sortedBy.dir;		

		arr.sort(this._genSortFunction(key, dir));
		
		
		return arr;
	};
	
	/**
	 * Set up the DataTable.
	 * @method _initDataTable
	 * @private
	 */
	proto._initDataTable = function() {
		
		var self = this;
		
		//Set up the JS Function DataSource, pulling data from
		//the Profiler.
		this._dataSource = new YAHOO.util.DataSource(
			function() {
				return self._getProfilerData.call(self);	
			},
			{
				responseType: YAHOO.util.DataSource.TYPE_JSARRAY,
				maxCacheEntries: 0
			}
		);
		var ds = this._dataSource;

		ds.responseSchema =
		{
			fields: [ "fn", "avg", "calls", "max", "min", "total", "pct", "points"]
		};
		
		//Set up the DataTable.
		var formatTimeValue = function(elCell, oRecord, oColumn, oData) {
			var a = (oData === Math.floor(oData)) ? oData : (Math.round(oData*1000))/1000;
			elCell.innerHTML = a + " " + PV.STRINGS.millisecondsAbbrev;
		};

		var formatPercent = function(elCell, oRecord, oColumn, oData) {
			var a = (oData === Math.floor(oData)) ? oData : (Math.round(oData*100))/100;
			elCell.innerHTML = a + "%";
		};
		
		var a = YAHOO.widget.DataTable.CLASS_ASC;
		var d = YAHOO.widget.DataTable.CLASS_DESC;
		var c = PV.STRINGS.colHeads;
		var f = formatTimeValue;
		
		var cols = [
			{key:"fn", sortable:true, label: c.fn[0],
				sortOptions: {defaultDir:a}, 
				resizeable: (YAHOO.util.DragDrop) ? true : false,
				minWidth:c.fn[1]},
			{key:"calls", sortable:true, label: c.calls[0],
				sortOptions: {defaultDir:d},
				width:c.calls[1]},
			{key:"avg", sortable:true, label: c.avg[0],
				sortOptions: {defaultDir:d},
				formatter:f,
				width:c.avg[1]},
			{key:"min", sortable:true, label: c.min[0],
				sortOptions: {defaultDir:a},
				formatter:f,
				width:c.min[1]}, 
			{key:"max", sortable:true, label: c.max[0],
				sortOptions: {defaultDir:d},
				formatter:f,
				width:c.max[1]},
			{key:"total", sortable:true, label: c.total[0],
				sortOptions: {defaultDir:d},
				formatter:f,
				width:c.total[1]},
			{key:"pct", sortable:true, label: c.pct[0],
				sortOptions: {defaultDir:d}, 
				formatter:formatPercent,
				width:c.pct[1]}
		];

		this._dataTable = new YAHOO.widget.DataTable(this._tableEl, cols, ds, {
			scrollable:true,
			height:this.get("tableHeight"),
			initialRequest:null,
			sortedBy: {
				key: "total",
				dir: YAHOO.widget.DataTable.CLASS_DESC
			}
		});
		var dt = this._dataTable;

		//Wire up DataTable events to drive the rest of the UI.
		dt.subscribe("sortedByChange", this._sortedByChange, this, true);
		dt.subscribe("renderEvent", this._dataTableRenderHandler, this, true);
		dt.subscribe("initEvent", this._dataTableRenderHandler, this, true);
		Event.on(this._tableEl.getElementsByTagName("th"), "click", this._thClickHandler, this, true);
	};
		
	/**
	 * Proxy the sort event in DataTable into the ProfilerViewer
	 * attribute.
	 * @method _sortedByChange
	 * @private
	 **/
	proto._sortedByChange = function(o) {
		if(o.newValue && o.newValue.key) {
			this.set("sortedBy", {key: o.newValue.key, dir:o.newValue.dir});
		}
	};
	
	/**
	 * Proxy the render event in DataTable into the ProfilerViewer
	 * attribute.
	 * @method _dataTableRenderHandler
	 * @private
	 **/
	proto._dataTableRenderHandler = function(o) {
		this._setBusyState(false);
	};
	
	/**
	 * Event handler for clicks on the DataTable's sortable column
	 * heads.
	 * @method _thClickHandler
	 * @private
	 **/
	proto._thClickHandler = function(o) {
		this._setBusyState(true);
	};

	/**
	 * Refresh DataTable, getting new data from Profiler.
	 * @method _refreshDataTable
	 * @private
	 **/
	proto._refreshDataTable = function(args) {
		var dt = this._dataTable;
		dt.getDataSource().sendRequest("", dt.onDataReturnInitializeTable, dt);
	};

	/**
	 * Refresh chart, getting new data from table.
	 * @method _refreshChart
	 * @private
	 **/
	proto._refreshChart = function() {
		
		switch (this.get("sortedBy").key) {
			case "fn":
				/*Keep the same data on the chart, but force update to 
				  reflect new sort order on function/method name: */
				this._chart.set("dataSource", this._chart.get("dataSource"));
				/*no further action necessary; chart redraws*/
				return;
			case "calls":
				/*Null out the xAxis formatting before redrawing chart.*/
				this._chart.set("xAxis", this._chartAxisDefinitionPlain);
				break;
			case "pct":
				this._chart.set("xAxis", this._chartAxisDefinitionPercent);
				break;
			default:
				/*Set the default xAxis; redraw legend; set the new series definition.*/
				this._chart.set("xAxis", this._chartAxisDefinitionTime);
				break;
		}
		
		this._drawChartLegend();
		this._chart.set("series", this._getSeriesDef(this.get("sortedBy").key));

	};
	
	/**
	 * Get data for the Chart from DataTable recordset
	 * @method _getChartData
	 * @private
	 */
	proto._getChartData = function() {
		//var records = this._getProfilerData();
		var records = this._dataTable.getRecordSet().getRecords(0, this.get("maxChartFunctions"));
		var arr = [];
		for (var i = 0, j = records.length; i<j; i++) {
			arr.push(records[i].getData());	
		}
		return arr;
	};
	
	/**
	 * Build series definition based on current configuration attributes.
	 * @method _getSeriesDef
	 * @private
	 */
	proto._getSeriesDef = function(field) {
		var sd = this.get("chartSeriesDefinitions")[field];
		var arr = [];
		for(var i = 0, j = sd.group.length; i<j; i++) {
			var c = this.get("chartSeriesDefinitions")[sd.group[i]];
			arr.push(
				{displayName:c.displayName,
				 xField:c.xField,
				 style: {color:c.style.color, size:c.style.size}
				}
			);
		}
		
		return arr;
	};
	
	/**
	 * Set up the Chart.
	 * @method _initChart
	 * @private
	 */
	proto._initChart = function() {
		
		this._sizeChartCanvas();
		
		YAHOO.widget.Chart.SWFURL = this.get("swfUrl");

		var self = this;

		//Create DataSource based on records currently displayed
		//at the top of the sort list in the DataTable.
		var ds = new YAHOO.util.DataSource(
			//force the jsfunction DataSource to run in the scope of
			//the ProfilerViewer, not in the YAHOO.util.DataSource scope:
			function() {
				return self._getChartData.call(self);
			}, 
			{
				responseType: YAHOO.util.DataSource.TYPE_JSARRAY,
				maxCacheEntries: 0
			}
		);

		ds.responseSchema =
		{
			fields: [ "fn", "avg", "calls", "max", "min", "total", "pct" ]
		};
		
		ds.subscribe('responseEvent', this._sizeChartCanvas, this, true);
		
		//Set up the chart itself.
		this._chartAxisDefinitionTime = new YAHOO.widget.NumericAxis();
		this._chartAxisDefinitionTime.labelFunction = "YAHOO.widget.ProfilerViewer.timeAxisLabelFunction";
		
		this._chartAxisDefinitionPercent = new YAHOO.widget.NumericAxis();
		this._chartAxisDefinitionPercent.labelFunction = "YAHOO.widget.ProfilerViewer.percentAxisLabelFunction";

		this._chartAxisDefinitionPlain = new YAHOO.widget.NumericAxis();
		
		this._chart = new YAHOO.widget.BarChart( this._chartEl, ds,
		{
			yField: "fn",
			series: this._getSeriesDef(this.get("sortedBy").key),
			style: this.get("chartStyle"),
			xAxis: this._chartAxisDefinitionTime
		} );
		
		this._drawChartLegend();
		this._chartInitialized = true;
		this._dataTable.unsubscribe("initEvent", this._initChart, this);
		this._dataTable.subscribe("initEvent", this._refreshChart, this, true);
		
	};
	
	/**
	 * Set up the Chart's legend
	 * @method _drawChartLegend
	 * @private
	 **/
	proto._drawChartLegend = function() {
		var seriesDefs = this.get("chartSeriesDefinitions");
		var currentDef = seriesDefs[this.get("sortedBy").key];
		var l = this._chartLegendEl;
		l.innerHTML = "";
		for(var i = 0, j = currentDef.group.length; i<j; i++) {
			var c = seriesDefs[currentDef.group[i]];
			var dt = document.createElement("dt");
			Dom.setStyle(dt, "backgroundColor", "#" + c.style.color);
			var dd = document.createElement("dd");
			dd.innerHTML = c.displayName;
			l.appendChild(dt);
			l.appendChild(dd);
		}
	};
	
	/**
	 * Resize the chart's canvas if based on number of records
	 * returned from the chart's datasource.
	 * @method _sizeChartCanvas
	 * @private
	 **/
	proto._sizeChartCanvas = function(o) {
		var bars = (o) ? o.response.length : this.get("maxChartFunctions");
		var s = (bars * 36) + 34;
		if (s != parseInt(this._chartElHeight, 10)) {
			this._chartElHeight = s;
			Dom.setStyle(this._chartEl, "height", s + "px");
		}
	};

    /**
     * setAttributeConfigs TabView specific properties.
     * @method initAttributes
     * @param {Object} attr Hash of initial attributes
	 * @method initAttributes
	 * @private
     */
    proto.initAttributes = function(attr) {
        YAHOO.widget.ProfilerViewer.superclass.initAttributes.call(this, attr);
        /**
         * The YUI Loader base path from which to pull YUI files needed
		 * in the rendering of the ProfilerViewer canvas.  Passed directly
		 * to YUI Loader.  Leave blank to draw files from
		 * yui.yahooapis.com.
         * @attribute base
         * @type string
		 * @default ""
         */
        this.setAttributeConfig('base', {
            value: attr.base
        });

        /**
         * The height of the DataTable.  The table will scroll
		 * vertically if the content overflows the specified
		 * height.
         * @attribute tableHeight
         * @type string
		 * @default "15em"
         */
        this.setAttributeConfig('tableHeight', {
            value: attr.tableHeight || "15em",
			method: function(s) {
				if(this._dataTable) {
					this._dataTable.set("height", s);
				}
			}
        });
		
        /**
         * The default column key to sort by.  Valid keys are: fn, calls,
		 * avg, min, max, total.  Valid dir values are: 
		 * YAHOO.widget.DataTable.CLASS_ASC and
		 * YAHOO.widget.DataTable.CLASS_DESC (or their
		 * string equivalents).
         * @attribute sortedBy
         * @type string
		 * @default {key:"total", dir:"yui-dt-desc"}
         */
        this.setAttributeConfig('sortedBy', {
            value: attr.sortedBy || {key:"total", dir:"yui-dt-desc"}
        });

        /**
         * A filter function to use in selecting functions that will
		 * appear in the ProfilerViewer report.  The function is passed
		 * a function report object and should return a boolean indicating
		 * whether that function should be included in the ProfilerViewer
		 * display.  The argument is structured as follows:
		 *
		 * {
		 *	 	fn: <str function name>,
		 *		calls : <n number of calls>,
		 *		avg : <n average call duration>,
		 *		max: <n duration of longest call>,
		 *		min: <n duration of shortest call>,
		 *		total: <n total time of all calls>
		 *		points : <array time in ms of each call>
		 *	}
		 *
		 * For example, you would use the follwing filter function to 
		 * return only functions that have been called at least once:
		 * 
		 * 	function(o) {
		 *		return (o.calls > 0);
		 *	}
		 *
         * @attribute filter
         * @type function
		 * @default null
         */
        this.setAttributeConfig('filter', {
            value: attr.filter || null,
			validator: YAHOO.lang.isFunction
        });

		/**
		 * The path to the YUI Charts swf file; must be a full URI
		 * or a path relative to the page being profiled. Changes at runtime
		 * not supported; pass this value in at instantiation.
		 * @attribute swfUrl
		 * @type string
		 * @default "http://yui.yahooapis.com/2.5.0/build/charts/assets/charts.swf"
		 */
		this.setAttributeConfig('swfUrl', {
			value: attr.swfUrl || "http://yui.yahooapis.com/2.5.0/build/charts/assets/charts.swf"
		});

        /**
         * The maximum number of functions to profile in the chart. The
		 * greater the number of functions, the greater the height of the
		 * chart canvas.
		 * height.
         * @attribute maxChartFunctions
         * @type int
		 * @default 6
         */
        this.setAttributeConfig('maxChartFunctions', {
            value: attr.maxChartFunctions || 6,
			method: function(s) {
				if(this._rendered) {
					this._sizeChartCanvas();
				}
			},
			validator: YAHOO.lang.isNumber
        });
		
        /**
         * The style object that defines the chart's visual presentation.
		 * Conforms to the style attribute passed to the Charts Control
		 * constructor.  See Charts Control User's Guide for more information
		 * on how to format this object.
         * @attribute chartStyle
         * @type obj
		 * @default See JS source for default definitions.
         */
        this.setAttributeConfig('chartStyle', {
            value: 	attr.chartStyle || {
				font:
					{
						name: "Arial",
						color: 0xeeee5c,
						size: 12
					},
					background:
					{
						color: "6e6e63"
					}
				},
			method: function() {
					if(this._rendered && this.get("showChart")) {
						this._refreshChart();
					}
				}
        });
		
        /**
         * The series definition information to use when charting
		 * specific fields on the chart.  "displayName", "xField",
		 * and "style" members are used to construct the series
		 * definition; the "group" member is the array of fields
		 * that should be charted when the table is sorted by a
		 * given field. The "displayName" string value will be
		 * treated as markup and inserted into the DOM with innerHTML.
         * @attribute chartSeriesDefinitions
         * @type obj
		 * @default See JS source for full default definitions.
         */
        this.setAttributeConfig('chartSeriesDefinitions', {
            value: 	attr.chartSeriesDefinitions ||  {
						total: {
							displayName: PV.STRINGS.colHeads.total[0],
							xField: "total",
							style: {color:"4d95dd", size:20},
							group: ["total"]
						},
						calls: {		
							displayName: PV.STRINGS.colHeads.calls[0],
							xField: "calls",
							style: {color:"edff9f", size:20},
							group: ["calls"]
						},
						avg: {
							displayName: PV.STRINGS.colHeads.avg[0],
							xField: "avg",
							style: {color:"209daf", size:9},
							group: ["avg", "min", "max"]
						},
						min: {
							displayName: PV.STRINGS.colHeads.min[0],
							xField: "min",
							style: {color:"b6ecf4", size:9},
							group: ["avg", "min", "max"]
						},
						max: {
							displayName: PV.STRINGS.colHeads.max[0],
							xField: "max",
							style: {color:"29c7de", size:9},
							group: ["avg", "min", "max"]
						},
						pct: {
							displayName: PV.STRINGS.colHeads.pct[0],
							xField: "pct",
							style: {color:"C96EDB", size:20},
							group: ["pct"]
						}
				},
			method: function() {
					if(this._rendered && this.get("showChart")) {
						this._refreshChart();
					}
				}
        });
		
        /**
         * The default visibility setting for the viewer canvas. If true,
		 * the viewer will load all necessary files and render itself
		 * immediately upon instantiation; otherwise, the viewer will
		 * load only minimal resources until the user toggles visibility
		 * via the UI.
         * @attribute visible
         * @type boolean
		 * @default false
         */
        this.setAttributeConfig('visible', {
            value: attr.visible || false,
			validator: YAHOO.lang.isBoolean,
			method: function(b) {
				if(b) {
					this._show();
				} else {
					if (this._rendered) {
						this._hide();
					}
				}
			}
        });

        /**
         * The default visibility setting for the chart.
         * @attribute showChart
         * @type boolean
		 * @default true
         */
        this.setAttributeConfig('showChart', {
            value: attr.showChart || true,
			validator: YAHOO.lang.isBoolean,
			writeOnce: true
			
        });
		
		YAHOO.widget.ProfilerViewer.superclass.initAttributes.call(this, attr);
		
    };
	
})();

YAHOO.register("profilerviewer", YAHOO.widget.ProfilerViewer, {version: "2.9.0", build: "2800"});
