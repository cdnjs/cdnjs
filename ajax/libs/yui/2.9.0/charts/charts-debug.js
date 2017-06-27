/*
Copyright (c) 2011, Yahoo! Inc. All rights reserved.
Code licensed under the BSD License:
http://developer.yahoo.com/yui/license.html
version: 2.9.0
*/
/**
 * The Charts widget provides a Flash control for displaying data
 * graphically by series across A-grade browsers with Flash Player installed.
 *
 * @module charts
 * @requires yahoo, dom, event, datasource
 * @title Charts Widget
 */
 
/****************************************************************************/
/****************************************************************************/
/****************************************************************************/

/**
 * Chart class for the YUI Charts widget.
 *
 * @namespace YAHOO.widget
 * @class Chart
 * @uses YAHOO.util.AttributeProvider
 * @constructor
 * @param type {String} The char type. May be "line", "column", "bar", or "pie"
 * @param containerId {HTMLElement} Container element for the Flash Player instance.
 * @param dataSource {YAHOO.util.DataSource} DataSource instance.
 * @param attributes {object} (optional) Object literal of configuration values.
 */
YAHOO.widget.Chart = function(type, containerId, dataSource, configurationAttributes)
{
	this._type = type;
	this._dataSource = dataSource;
		
	var possibleParams = {align:"", allowNetworking:"", allowScriptAccess:"", base:"", bgcolor:"", menu:"", name:"", quality:"", salign:"", scale:"", tabindex:"", wmode:""};
	var attributes = {fixedAttributes:{allowScriptAccess:"always"}, flashVars:{allowedDomain : document.location.hostname}, backgroundColor:"#ffffff", host:this, version:9.045};
	
	for(var i in configurationAttributes)
	{
		if(possibleParams.hasOwnProperty(i))
		{
			attributes.fixedAttributes[i] = configurationAttributes[i];
		}
		else
		{
			attributes[i] = configurationAttributes[i];
		}
	}
	
	this._id = attributes.id = attributes.id || YAHOO.util.Dom.generateId(null, "yuigen");
	
	this._swfURL = YAHOO.widget.Chart.SWFURL;
	this._containerID = containerId;
	
	this._attributes = attributes;
	this._swfEmbed = new YAHOO.widget.SWF(containerId, YAHOO.widget.Chart.SWFURL, attributes);
	
	this._swf = this._swfEmbed.swf;
	this._swfEmbed.subscribe("swfReady", this._eventHandler, this, true);
			
	/**
	 * Fires when the SWF is initialized and communication is possible.
	 * @event contentReady
	 */
	//Fix for iframe cross-domain issue with FF2x 
	try
	{
		this.createEvent("contentReady");
	}
	catch(e){}
	
	/**
	 * Fires when the user moves the mouse over the bounds of an item renderer in the chart.
	 *
	 * @event itemMouseOverEvent
	 * @param event.type {String} The event type
	 * @param event.item {Object} The data displayed by the renderer
	 * @param event.index {Number} The position within the series that the item appears.
	 * @param event.seriesIndex {Number} The position within the series definition that the series appears.
	 * @param event.x {Number} The horizontal position of the mouse, relative to the SWF.
	 * @param event.y {Number} The vertical position of the mouse, relative to the SWF.
	 */
	this.createEvent("itemMouseOverEvent");
	
	/**
	 * Fires when the user moves the mouse out of the bounds of an item renderer in the chart.
	 *
	 * @event itemMouseOutEvent
	 * @param event.type {String} The event type
	 * @param event.item {Object} The data displayed by the renderer
	 * @param event.index {Number} The position within the series that the item appears.
	 * @param event.seriesIndex {Number} The position within the series definition that the series appears.
	 * @param event.x {Number} The horizontal position of the mouse, relative to the SWF.
	 * @param event.y {Number} The vertical position of the mouse, relative to the SWF.
	 */
	this.createEvent("itemMouseOutEvent");
	
	/**
	 * Fires when the user clicks an item renderer in the chart with the mouse.
	 *
	 * @event itemClickEvent
	 * @param event.type {String} The event type
	 * @param event.item {Object} The data displayed by the renderer
	 * @param event.index {Number} The position within the series that the item appears.
	 * @param event.seriesIndex {Number} The position within the series definition that the series appears.
	 * @param event.x {Number} The horizontal position of the mouse, relative to the SWF.
	 * @param event.y {Number} The vertical position of the mouse, relative to the SWF.
	 */
	this.createEvent("itemClickEvent");
	
	/**
	 * Fires when the user double-clicks an item renderer in the chart with the mouse.
	 *
	 * @event itemDoubleClickEvent
	 * @param event.type {String} The event type
	 * @param event.item {Object} The data displayed by the renderer
	 * @param event.index {Number} The position within the series that the item appears.
	 * @param event.seriesIndex {Number} The position within the series definition that the series appears.
	 * @param event.x {Number} The horizontal position of the mouse, relative to the SWF.
	 * @param event.y {Number} The vertical position of the mouse, relative to the SWF.
	 */
	this.createEvent("itemDoubleClickEvent");
	
	/**
	 * Fires when the user presses the mouse down on an item to initiate a drag action.
	 *
	 * @event itemDragStartEvent
	 * @param event.type {String} The event type
	 * @param event.item {Object} The data displayed by the renderer
	 * @param event.index {Number} The position within the series that the item appears.
	 * @param event.seriesIndex {Number} The position within the series definition that the series appears.
	 * @param event.x {Number} The horizontal position of the mouse, relative to the SWF.
	 * @param event.y {Number} The vertical position of the mouse, relative to the SWF.
	 */
	this.createEvent("itemDragStartEvent");
	
	/**
	 * Fires when the user moves the mouse during a drag action.
	 *
	 * @event itemDragEvent
	 * @param event.type {String} The event type
	 * @param event.item {Object} The data displayed by the renderer
	 * @param event.index {Number} The position within the series that the item appears.
	 * @param event.seriesIndex {Number} The position within the series definition that the series appears.
	 * @param event.x {Number} The horizontal position of the mouse, relative to the SWF.
	 * @param event.y {Number} The vertical position of the mouse, relative to the SWF.
	 */
	this.createEvent("itemDragEvent");

	/**
	 * Fires when the user releases the mouse during a drag action.
	 *
	 * @event itemDragEndEvent
	 * @param event.type {String} The event type
	 * @param event.item {Object} The data displayed by the renderer
	 * @param event.index {Number} The position within the series that the item appears.
	 * @param event.seriesIndex {Number} The position within the series definition that the series appears.
	 * @param event.x {Number} The horizontal position of the mouse, relative to the SWF.
	 * @param event.y {Number} The vertical position of the mouse, relative to the SWF.
	 */
	this.createEvent("itemDragEndEvent");
};

YAHOO.extend(YAHOO.widget.Chart, YAHOO.util.AttributeProvider,
{
	/**
	 * The type of this chart instance.
	 * @property _type
	 * @type String
	 * @private
	 */
	_type: null,

	/**
	 * The id returned from the DataSource's setInterval function.
	 * @property _pollingID
	 * @type Number
	 * @private
	 */
	_pollingID: null,

	/**
	 * The time, in ms, between requests for data.
	 * @property _pollingInterval
	 * @type Number
	 * @private
	 */
	_pollingInterval: null,

	/**
	 * Stores a reference to the dataTipFunction created by
	 * YAHOO.widget.Chart.createProxyFunction()
	 * @property _dataTipFunction
	 * @type String
	 * @private
	 */
	_dataTipFunction: null,
	
	/**
	 * Stores a reference to the legendLabelFunction created by
	 * YAHOO.widget.Chart.createProxyFunction()
	 * @property _legendLabelFunction
	 * @type String
	 * @private
	 */
	_legendLabelFunction: null,	
	
	/**
	 * Stores references to series function values created by
	 * YAHOO.widget.Chart.createProxyFunction()
	 * @property _seriesFunctions
	 * @type Array
	 * @private
	 */
	_seriesFunctions: null,

	/**
	 * Public accessor to the unique name of the Chart instance.
	 *
	 * @method toString
	 * @return {String} Unique name of the Chart instance.
	 */
	toString: function()
	{
		return "Chart " + this._id;
	},
	
	/**
	 * Sets a single style value on the Chart instance.
	 *
	 * @method setStyle
	 * @param name {String} Name of the Chart style value to change.
	 * @param value {Object} New value to pass to the Chart style.
	 */
	setStyle: function(name, value)
	{
		//we must jsonify this because Flash Player versions below 9.0.60 don't handle
		//complex ExternalInterface parsing correctly
		value = YAHOO.lang.JSON.stringify(value);
		this._swf.setStyle(name, value);
	},
	
	/**
	 * Resets all styles on the Chart instance.
	 *
	 * @method setStyles
	 * @param styles {Object} Initializer for all Chart styles.
	 */
	setStyles: function(styles)
	{
		//we must jsonify this because Flash Player versions below 9.0.60 don't handle
		//complex ExternalInterface parsing correctly
		styles = YAHOO.lang.JSON.stringify(styles);
		this._swf.setStyles(styles);
	},
	
	/**
	 * Sets the styles on all series in the Chart.
	 *
	 * @method setSeriesStyles
	 * @param styles {Array} Initializer for all Chart series styles.
	 */
	setSeriesStyles: function(styles)
	{
		//we must jsonify this because Flash Player versions below 9.0.60 don't handle
		//complex ExternalInterface parsing correctly
		for(var i = 0; i < styles.length; i++)
		{
			styles[i] = YAHOO.lang.JSON.stringify(styles[i]);	
		}
		this._swf.setSeriesStyles(styles);
	},
	
	destroy: function()
	{
		//stop polling if needed
		if(this._dataSource !== null)
		{
			if(this._pollingID !== null)
			{
				this._dataSource.clearInterval(this._pollingID);
				this._pollingID = null;
			}
		}
		
		//remove proxy functions
		if(this._dataTipFunction)
		{
			YAHOO.widget.Chart.removeProxyFunction(this._dataTipFunction);
		}
		
		if(this._legendLabelFunction)
		{
			YAHOO.widget.Chart.removeProxyFunction(this._legendLabelFunction);
		}
		
		//kill the Flash Player instance
		if(this._swf)
		{
			var container = YAHOO.util.Dom.get(this._containerID);
			container.removeChild(this._swf);
		}
		
		var instanceName = this._id;
		
		//null out properties
		for(var prop in this)
		{
			if(YAHOO.lang.hasOwnProperty(this, prop))
			{
				this[prop] = null;
			}
		}
	},
	
	/**
	 * Initializes the attributes.
	 *
	 * @method _initAttributes
	 * @private
	 */
	_initAttributes: function(attributes)
	{
		//YAHOO.widget.Chart.superclass._initAttributes.call(this, attributes);
		/**
		 * @attribute wmode
		 * @description Sets the window mode of the Flash Player control. May be
		 *		"window", "opaque", or "transparent". Only available in the constructor
		 *		because it may not be set after Flash Player has been embedded in the page.
		 * @type String
		 */
		 
		/**
		 * @attribute expressInstall
		 * @description URL pointing to a SWF file that handles Flash Player's express
		 *		install feature. Only available in the constructor because it may not be
		 *		set after Flash Player has been embedded in the page.
		 * @type String
		 */

		/**
		 * @attribute version
		 * @description Minimum required version for the SWF file. Only available in the constructor because it may not be
		 *		set after Flash Player has been embedded in the page.
		 * @type String
		 */

		/**
		 * @attribute backgroundColor
		 * @description The background color of the SWF. Only available in the constructor because it may not be
		 *		set after Flash Player has been embedded in the page.
		 * @type String
		 */
		 
		/**
		 * @attribute altText
		 * @description The alternative text to provide for screen readers and other assistive technology.
		 * @type String
		 */
		this.setAttributeConfig("altText",
		{
			method: this._setAltText,
			getter: this._getAltText
			
		});
		
		/**
		 * @attribute swfURL
		 * @description Absolute or relative URL to the SWF displayed by the Chart. Only available in the constructor because it may not be
		 *		set after Flash Player has been embedded in the page.
		 * @type String
		 */
		this.setAttributeConfig("swfURL",
		{
			getter: this._getSWFURL
		});		

		/**
		 * @attribute request
		 * @description Request to be sent to the Chart's DataSource.
		 * @type String
		 */
		this.setAttributeConfig("request",
		{
			method: this._setRequest,
			getter: this._getRequest
		});
		
		/**
		 * @attribute dataSource
		 * @description The DataSource instance to display in the Chart.
		 * @type DataSource
		 */
		this.setAttributeConfig("dataSource",
		{
			method: this._setDataSource,
			getter: this._getDataSource
		});
		
		/**
		 * @attribute series
		 * @description Defines the series to be displayed by the Chart.
		 * @type Array
		 */
		this.setAttributeConfig("series",
		{
			method: this._setSeriesDefs,
			getter: this._getSeriesDefs
		});
		
		/**
		 * @attribute categoryNames
		 * @description Defines the names of the categories to be displayed in the Chart..
		 * @type Array
		 */
		this.setAttributeConfig("categoryNames",
		{
			validator: YAHOO.lang.isArray,
			method: this._setCategoryNames,
			getter: this._getCategoryNames
		});
		
		/**
		 * @attribute dataTipFunction
		 * @description The string representation of a globally-accessible function
		 * that may be called by the SWF to generate the datatip text for a Chart's item.
		 * @type String
		 */
		this.setAttributeConfig("dataTipFunction",
		{
			method: this._setDataTipFunction,
			getter: this._getDataTipFunction
		});
		
		/**
		 * @attribute legendLabelFunction
		 * @description The string representation of a globally-accessible function
		 * that may be called by the SWF to format the labels of a Chart's legend.
		 * @type String
		 */	
		this.setAttributeConfig("legendLabelFunction",
		{
			method: this._setLegendLabelFunction,
			getter: this._getLegendLabelFunction
		});

		/**
		 * @attribute polling
		 * @description A numeric value indicating the number of milliseconds between
		 * polling requests to the DataSource.
		 * @type Number
		 */
		this.setAttributeConfig("polling",
		{
			method: this._setPolling,
			getter: this._getPolling
		});
	},
	
	/**
	 * Handles swfReady event from SWF.
	 *
	 * @method _eventHandler
	 * @private
	 */
	_eventHandler: function(event)
	{ 
		if(event.type == "swfReady")
		{
   			this._swf = this._swfEmbed._swf;
			this._loadHandler();
   			this.fireEvent("contentReady");
		}
	},	
	
	/**
	 * Called when the SWF is ready for communication. Sets the type, initializes
	 * the styles, and sets the DataSource.
	 *
	 * @method _loadHandler
	 * @private
	 */
	_loadHandler: function()
	{
		//the type is set separately because it must be first!
		if(!this._swf || !this._swf.setType) return;
		this._swf.setType(this._type);


		//set initial styles
		if(this._attributes.style)
		{
			var style = this._attributes.style;
			this.setStyles(style);		
		}

		this._initialized = false;

		this._initAttributes(this._attributes);
		this.setAttributes(this._attributes, true);

		this._initialized = true;
		if(this._dataSource)
		{
			this.set("dataSource", this._dataSource);
		}
	},	

	/**
	 * Sends (or resends) the request to the DataSource.
	 *
	 * @method refreshData
	 */
	refreshData: function()
	{
		if(!this._initialized)
		{
			return;
		}
		
		if(this._dataSource !== null)
		{
			if(this._pollingID !== null)
			{
				this._dataSource.clearInterval(this._pollingID);
				this._pollingID = null;
			}
			
			if(this._pollingInterval > 0)
			{
				this._pollingID = this._dataSource.setInterval(this._pollingInterval, this._request, this._loadDataHandler, this);
			}
			this._dataSource.sendRequest(this._request, this._loadDataHandler, this);
		}
	},

	/**
	 * Called when the DataSource receives new data. The series definitions are used
	 * to build a data provider for the SWF chart.
	 *
	 * @method _loadDataHandler
	 * @private
	 */
	_loadDataHandler: function(request, response, error)
	{
		if(this._swf)
		{
			if(error)
			{
				YAHOO.log("Unable to load data.", "error");
			}
			else
			{
				var i;
				if(this._seriesFunctions)
				{
					var count = this._seriesFunctions.length;
					for(i = 0; i < count; i++)
					{
						YAHOO.widget.Chart.removeProxyFunction(this._seriesFunctions[i]);
					}
					this._seriesFunctions = null;
				}
				this._seriesFunctions = [];

				//make a copy of the series definitions so that we aren't
				//editing them directly.
				var dataProvider = [];	
				var seriesCount = 0;
				var currentSeries = null;
				if(this._seriesDefs !== null)
				{
					seriesCount = this._seriesDefs.length;
					for(i = 0; i < seriesCount; i++)
					{
						currentSeries = this._seriesDefs[i];
						var clonedSeries = {};
						for(var prop in currentSeries)
						{
							if(YAHOO.lang.hasOwnProperty(currentSeries, prop))
							{
								if(prop == "style")
								{
									if(currentSeries.style !== null)
									{
										clonedSeries.style = YAHOO.lang.JSON.stringify(currentSeries.style);
									}
								}

								else if(prop == "labelFunction")
								{
									if(currentSeries.labelFunction !== null)
									{	
										clonedSeries.labelFunction = YAHOO.widget.Chart.getFunctionReference(currentSeries.labelFunction);
										this._seriesFunctions.push(clonedSeries.labelFunction);
									}
								}

								else if(prop == "dataTipFunction")
								{
									if(currentSeries.dataTipFunction !== null)
									{
										clonedSeries.dataTipFunction = YAHOO.widget.Chart.getFunctionReference(currentSeries.dataTipFunction);
										this._seriesFunctions.push(clonedSeries.dataTipFunction);
									}	
								}
								
								else if(prop == "legendLabelFunction")
								{
									if(currentSeries.legendLabelFunction !== null)
									{
										clonedSeries.legendLabelFunction = YAHOO.widget.Chart.getFunctionReference(currentSeries.legendLabelFunction);
										this._seriesFunctions.push(clonedSeries.legendLabelFunction); 
									}	
								}								

								else
								{
									clonedSeries[prop] = currentSeries[prop];
								}
							}
						}
						dataProvider.push(clonedSeries);
					}
				}

				if(seriesCount > 0)
				{
					for(i = 0; i < seriesCount; i++)
					{
						currentSeries = dataProvider[i];
						if(!currentSeries.type)
						{
							currentSeries.type = this._type;
						}
						currentSeries.dataProvider = response.results;
					}
				}
				else
				{
					var series = {type: this._type, dataProvider: response.results};
					dataProvider.push(series);
				}
				try
				{
					if(this._swf.setDataProvider) this._swf.setDataProvider(dataProvider);
				}
				catch(e)
				{
					this._swf.setDataProvider(dataProvider);
				}
			}
		}
	},

	/**
	 * Storage for the request attribute.
	 * 
	 * @property _request
	 * @private
	 */
	_request: "",
	
	/**
	 * Getter for the request attribute.
	 *
	 * @method _getRequest
	 * @private
	 */
	_getRequest: function()
	{
		return this._request;
	},
	
	/**
	 * Setter for the request attribute.
	 *
	 * @method _setRequest
	 * @private
	 */
	_setRequest: function(value)
	{
		this._request = value;
		this.refreshData();
	},

	/**
	 * Storage for the dataSource attribute.
	 * 
	 * @property _dataSource
	 * @private
	 */
	_dataSource: null,
	
	/**
	 * Getter for the dataSource attribute.
	 *
	 * @method _getDataSource
	 * @private
	 */
	_getDataSource: function()
	{
		return this._dataSource;
	},

	/**
	 * Setter for the dataSource attribute.
	 *
	 * @method _setDataSource
	 * @private
	 */
	_setDataSource: function(value)
	{	
		this._dataSource = value;
		this.refreshData();
	},
	
	/**
	 * Storage for the series attribute.
	 * 
	 * @property _seriesDefs
	 * @private
	 */
	_seriesDefs: null,
	
	/**
	 * Getter for the series attribute.
	 *
	 * @method _getSeriesDefs
	 * @private
	 */
	_getSeriesDefs: function()
	{
		return this._seriesDefs;
	},
	
	/**
	 * Setter for the series attribute.
	 *
	 * @method _setSeriesDefs
	 * @private
	 */
	_setSeriesDefs: function(value)
	{
		this._seriesDefs = value;
		this.refreshData();
	},

	/**
	 * Getter for the categoryNames attribute.
	 *
	 * @method _getCategoryNames
	 * @private
	 */
	_getCategoryNames: function()
	{
		return this._swf.getCategoryNames();
	},

	/**
	 * Setter for the categoryNames attribute.
	 *
	 * @method _setCategoryNames
	 * @private
	 */
	_setCategoryNames: function(value)
	{
		this._swf.setCategoryNames(value);
	},
	
	/**
	 * Setter for the dataTipFunction attribute.
	 *
	 * @method _setDataTipFunction
	 * @private
	 */
	_setDataTipFunction: function(value)
	{
		if(this._dataTipFunction)
		{
			YAHOO.widget.Chart.removeProxyFunction(this._dataTipFunction);
		}
		
		if(value)
		{
			this._dataTipFunction = value = YAHOO.widget.Chart.getFunctionReference(value);
		}
		this._swf.setDataTipFunction(value);
	},
	
	/**
	 * Setter for the legendLabelFunction attribute.
	 *
	 * @method _setLegendLabelFunction
	 * @private
	 */
	_setLegendLabelFunction: function(value)
	{
		if(this._legendLabelFunction)
		{
			YAHOO.widget.Chart.removeProxyFunction(this._legendLabelFunction);
		}
		
		if(value)
		{
			this._legendLabelFunction = value = YAHOO.widget.Chart.getFunctionReference(value);
		}
		this._swf.setLegendLabelFunction(value);
	},

    /**
     * Getter for the legendLabelFunction attribute.
     *
     * @method _getLegendLabelFunction
     * @private
     */
    _getLegendLabelFunction: function()
    {
        return this._legendLabelFunction;
    },

	/**
	 * Getter for the polling attribute.
	 *
	 * @method _getPolling
	 * @private
	 */
	_getPolling: function()
	{
		return this._pollingInterval;
	},

	/**
	 * Setter for the polling attribute.
	 *
	 * @method _setPolling
	 * @private
	 */
	_setPolling: function(value)
	{
		this._pollingInterval = value;
		this.refreshData();
	},

	/**
	 * The javascript wrapper for the swf object
	 *
	 * @property _swfEmbed
	 * @type swf
	 * @private
	 */
	_swfEmbed: null,
	
	/**
	 * The URL of the SWF file.
	 * @property _swfURL
	 * @type String
	 * @private
	 */
	_swfURL: null,

	/**
	 * The ID of the containing DIV.
	 * @property _containerID
	 * @type String
	 * @private
	 */
	_containerID: null,

	/**
	 * A reference to the embedded SWF file.
	 * @property _swf
	 * @private
	 */
	_swf: null,

	/**
	 * The id of this instance.
	 * @property _id
	 * @type String
	 * @private
	 */
	_id: null,

	/**
	 * Indicates whether the SWF has been initialized and is ready
	 * to communicate with JavaScript
	 * @property _initialized
	 * @type Boolean
	 * @private
	 */
	_initialized: false,
	
	/**
	 * The initializing attributes are stored here until the SWF is ready.
	 * @property _attributes
	 * @type Object
	 * @private
	 */
	_attributes: null, //the intializing attributes
	
	set: function(name, value)
	{
		//save all the attributes in case the swf reloads
		//so that we can pass them in again
		this._attributes[name] = value;
		YAHOO.widget.Chart.superclass.set.call(this, name, value);
	},
	
	/**
	 * Getter for swfURL attribute.
	 *
	 * @method _getSWFURL
	 * @private
	 */
	_getSWFURL: function()
	{
		return this._swfURL;
	},
	
	/**
	 * Getter for altText attribute.
	 *
	 * @method _getAltText
	 * @private
	 */
	_getAltText: function()
	{
		return this._swf.getAltText();
	},

	/**
	 * Setter for altText attribute.
	 *
	 * @method _setAltText
	 * @private
	 */
	_setAltText: function(value)
	{
	 	this._swf.setAltText(value);
	}
});

/**
 * The number of proxy functions that have been created.
 * @static
 * @private
 */
YAHOO.widget.Chart.proxyFunctionCount = 0;

/**
 * Creates a globally accessible function that wraps a function reference.
 * Returns the proxy function's name as a string for use by the SWF through
 * ExternalInterface.
 *
 * @method YAHOO.widget.Chart.createProxyFunction
 * @static
 * @private
 */
YAHOO.widget.Chart.createProxyFunction = function(func, scope)
{
	var scope = scope || null;
	var index = YAHOO.widget.Chart.proxyFunctionCount;
	YAHOO.widget.Chart["proxyFunction" + index] = function()
	{
		return func.apply(scope, arguments);
	};
	YAHOO.widget.Chart.proxyFunctionCount++;
	return "YAHOO.widget.Chart.proxyFunction" + index.toString();
};

/**
 * Uses YAHOO.widget.Chart.createProxyFunction to return string
 * reference to a function. 
 *
 * @method YAHOO.widget.Chart.getFunctionReference
 * @static
 * @private
 */
YAHOO.widget.Chart.getFunctionReference = function(value)
{
	if(typeof value == "function")
	{
		value = YAHOO.widget.Chart.createProxyFunction(value);
	}
	else if(value.func && typeof value.func == "function")
	{
		var args = [value.func];
		if(value.scope && typeof value.scope == "object")
		{
			args.push(value.scope);
		}
		value = YAHOO.widget.Chart.createProxyFunction.apply(this, args);
	}
	return value;	
}

/**
 * Removes a function created with createProxyFunction()
 * 
 * @method YAHOO.widget.Chart.removeProxyFunction
 * @static
 * @private
 */
YAHOO.widget.Chart.removeProxyFunction = function(funcName)
{
	//quick error check
	if(!funcName || funcName.indexOf("YAHOO.widget.Chart.proxyFunction") < 0)
	{
		return;
	}
	
	funcName = funcName.substr(26);
	YAHOO.widget.Chart[funcName] = null;
};

/**
 * Storage for the dataTipFunction attribute.
 *
 * @property Chart.SWFURL
 * @private
 * @static
 * @final
 * @default "assets/charts.swf"
 */
YAHOO.widget.Chart.SWFURL = "assets/charts.swf";
/**
 * PieChart class for the YUI Charts widget.
 *
 * @namespace YAHOO.widget
 * @class PieChart
 * @uses YAHOO.widget.Chart
 * @constructor
 * @param containerId {HTMLElement} Container element for the Flash Player instance.
 * @param dataSource {YAHOO.util.DataSource} DataSource instance.
 * @param attributes {object} (optional) Object literal of configuration values.
 */
YAHOO.widget.PieChart = function(containerId, dataSource, attributes)
{
	YAHOO.widget.PieChart.superclass.constructor.call(this, "pie", containerId, dataSource, attributes);
};

YAHOO.lang.extend(YAHOO.widget.PieChart, YAHOO.widget.Chart,
{
	/**
	 * Initializes the attributes.
	 *
	 * @method _initAttributes
	 * @private
	 */
	_initAttributes: function(attributes)
	{	
		YAHOO.widget.PieChart.superclass._initAttributes.call(this, attributes);
		
		/**
		 * @attribute dataField
		 * @description The field in each item that corresponds to the data value.
		 * @type String
		 */
		this.setAttributeConfig("dataField",
		{
			validator: YAHOO.lang.isString,
			method: this._setDataField,
			getter: this._getDataField
		});
   
		/**
		 * @attribute categoryField
		 * @description The field in each item that corresponds to the category value.
		 * @type String
		 */
		this.setAttributeConfig("categoryField",
		{
			validator: YAHOO.lang.isString,
			method: this._setCategoryField,
			getter: this._getCategoryField
		});
	},

	/**
	 * Getter for the dataField attribute.
	 *
	 * @method _getDataField
	 * @private
	 */
	_getDataField: function()
	{
		return this._swf.getDataField();
	},

	/**
	 * Setter for the dataField attribute.
	 *
	 * @method _setDataField
	 * @private
	 */
	_setDataField: function(value)
	{
		this._swf.setDataField(value);
	},

	/**
	 * Getter for the categoryField attribute.
	 *
	 * @method _getCategoryField
	 * @private
	 */
	_getCategoryField: function()
	{
		return this._swf.getCategoryField();
	},

	/**
	 * Setter for the categoryField attribute.
	 *
	 * @method _setCategoryField
	 * @private
	 */
	_setCategoryField: function(value)
	{
		this._swf.setCategoryField(value);
	}
});
/**
 * CartesianChart class for the YUI Charts widget.
 *
 * @namespace YAHOO.widget
 * @class CartesianChart
 * @uses YAHOO.widget.Chart
 * @constructor
 * @param type {String} The char type. May be "line", "column", or "bar"
 * @param containerId {HTMLElement} Container element for the Flash Player instance.
 * @param dataSource {YAHOO.util.DataSource} DataSource instance.
 * @param attributes {object} (optional) Object literal of configuration values.
 */
 YAHOO.widget.CartesianChart = function(type, containerId, dataSource, attributes)
{
	YAHOO.widget.CartesianChart.superclass.constructor.call(this, type, containerId, dataSource, attributes);
};

YAHOO.lang.extend(YAHOO.widget.CartesianChart, YAHOO.widget.Chart,
{
	/**
	 * Stores a reference to the xAxis labelFunction created by
	 * YAHOO.widget.Chart.createProxyFunction()
	 * @property _xAxisLabelFunctions
	 * @type String
	 * @private
	 */
	_xAxisLabelFunctions: [],
	
	/**
	 * Stores a reference to the yAxis labelFunctions created by
	 * YAHOO.widget.Chart.createProxyFunction()
	 * @property _yAxisLabelFunctions
	 * @type Array
	 * @private
	 */
	_yAxisLabelFunctions: [],
	
	destroy: function()
	{
		//remove proxy functions
		this._removeAxisFunctions(this._xAxisLabelFunctions);
		this._removeAxisFunctions(this._yAxisLabelFunctions);
		
		//call last
		YAHOO.widget.CartesianChart.superclass.destroy.call(this);
	},
	
	/**
	 * Initializes the attributes.
	 *
	 * @method _initAttributes
	 * @private
	 */
	_initAttributes: function(attributes)
	{	
		YAHOO.widget.CartesianChart.superclass._initAttributes.call(this, attributes);
		
		/**
		 * @attribute xField
		 * @description The field in each item that corresponds to a value on the x axis.
		 * @type String
		 */
		this.setAttributeConfig("xField",
		{
			validator: YAHOO.lang.isString,
			method: this._setXField,
			getter: this._getXField
		});

		/**
		 * @attribute yField
		 * @description The field in each item that corresponds to a value on the x axis.
		 * @type String
		 */
		this.setAttributeConfig("yField",
		{
			validator: YAHOO.lang.isString,
			method: this._setYField,
			getter: this._getYField
		});

		/**
		 * @attribute xAxis
		 * @description A custom configuration for the horizontal x axis.
		 * @type Axis
		 */
		this.setAttributeConfig("xAxis",
		{
			method: this._setXAxis
		});
		
		/**
		 * @attribute xAxes
		 * @description Custom configurations for the horizontal x axes.
		 * @type Array
		 */		
		this.setAttributeConfig("xAxes",
		{
			method: this._setXAxes
		});	

		/**
		 * @attribute yAxis
		 * @description A custom configuration for the vertical y axis.
		 * @type Axis
		 */
		this.setAttributeConfig("yAxis",
		{
			method: this._setYAxis
		});
		
		/**
		 * @attribute yAxes
		 * @description Custom configurations for the vertical y axes.
		 * @type Array
		 */		
		this.setAttributeConfig("yAxes",
		{
			method: this._setYAxes
		});	
		
		/**
		 * @attribute constrainViewport
		 * @description Determines whether the viewport is constrained to prevent series data from overflow.
		 * @type Boolean
		 */
		this.setAttributeConfig("constrainViewport",
		{
			method: this._setConstrainViewport
		});	
	},

	/**
	 * Getter for the xField attribute.
	 *
	 * @method _getXField
	 * @private
	 */
	_getXField: function()
	{
		return this._swf.getHorizontalField();
	},

	/**
	 * Setter for the xField attribute.
	 *
	 * @method _setXField
	 * @private
	 */
	_setXField: function(value)
	{
		this._swf.setHorizontalField(value);
	},

	/**
	 * Getter for the yField attribute.
	 *
	 * @method _getYField
	 * @private
	 */
	_getYField: function()
	{
		return this._swf.getVerticalField();
	},

	/**
	 * Setter for the yField attribute.
	 *
	 * @method _setYField
	 * @private
	 */
	_setYField: function(value)
	{
		this._swf.setVerticalField(value);
	},
	
	/**
	 * Receives an axis object, creates a proxy function for 
	 * the labelFunction and returns the updated object. 
	 *
	 * @method _getClonedAxis
	 * @private
	 */
	_getClonedAxis: function(value)
	{
		var clonedAxis = {};
		for(var prop in value)
		{
			if(prop == "labelFunction")
			{
				if(value.labelFunction && value.labelFunction !== null)
				{
					clonedAxis.labelFunction = YAHOO.widget.Chart.getFunctionReference(value.labelFunction);
				}
			}
			else
			{
				clonedAxis[prop] = value[prop];
			}
		}
		return clonedAxis;
	},
	
	/**
	 * Removes axis functions contained in an array
	 * 
	 * @method _removeAxisFunctions
	 * @private
	 */
	_removeAxisFunctions: function(axisFunctions)
	{
		if(axisFunctions && axisFunctions.length > 0)
		{
			var len = axisFunctions.length;
			for(var i = 0; i < len; i++)
			{
				if(axisFunctions[i] !== null)
				{
					YAHOO.widget.Chart.removeProxyFunction(axisFunctions[i]);
				}
			}
			axisFunctions = [];
		}
	},	
	
	/**
	 * Setter for the xAxis attribute.
	 *
	 * @method _setXAxis
	 * @private
	 */
	_setXAxis: function(value)
	{
		if(value.position != "bottom" && value.position != "top") value.position = "bottom";
		this._removeAxisFunctions(this._xAxisLabelFunctions);
		value = this._getClonedAxis(value);
		this._xAxisLabelFunctions.push(value.labelFunction);
		this._swf.setHorizontalAxis(value);
	},
	
	/**
	 * Setter for the xAxes attribute
	 *
	 * @method _setXAxes
	 * @private
	 */
	_setXAxes: function(value)
	{
		this._removeAxisFunctions(this._xAxisLabelFunctions);
		var len = value.length;
		for(var i = 0; i < len; i++)
		{
			if(value[i].position == "left") value[i].position = "bottom";
			value[i] = this._getClonedAxis(value[i]);
			if(value[i].labelFunction) this._xAxisLabelFunctions.push(value[i].labelFunction);
			this._swf.setHorizontalAxis(value[i]);
		}
	},

	/**
	 * Setter for the yAxis attribute.
	 *
	 * @method _setYAxis
	 * @private
	 */
	_setYAxis: function(value)
	{
		this._removeAxisFunctions(this._yAxisLabelFunctions);
		value = this._getClonedAxis(value);
		this._yAxisLabelFunctions.push(value.labelFunction);		
		this._swf.setVerticalAxis(value);
	},
	
	/**
	 * Setter for the yAxes attribute.
	 *
	 * @method _setYAxes
	 * @private
	 */	
	_setYAxes: function(value)
	{
		this._removeAxisFunctions(this._yAxisLabelFunctions);
		var len = value.length;
		for(var i = 0; i < len; i++)
		{
			value[i] = this._getClonedAxis(value[i]);
			if(value[i].labelFunction) this._yAxisLabelFunctions.push(value[i].labelFunction);
			this._swf.setVerticalAxis(value[i]);
		}		
	},
	
	/**
	 * Setter for the constrainViewport attribute
	 *
	 * @method _setConstrainViewport
	 * @private
	 */
	_setConstrainViewport: function(value)
	{
		this._swf.setConstrainViewport(value);
	},
	
	/**
	 * Sets the style object for a single series based on its index
	 * 
	 * @method setSeriesStylesByIndex
	 * @param index {Number} The position within the series definition to apply the style
	 * @param style {object} Style object to be applied to the selected series
	 */
	setSeriesStylesByIndex:function(index, style)
	{
		style = YAHOO.lang.JSON.stringify(style);
		if(this._swf && this._swf.setSeriesStylesByIndex) this._swf.setSeriesStylesByIndex(index, style);
	}
});
/**
 * LineChart class for the YUI Charts widget.
 *
 * @namespace YAHOO.widget
 * @class LineChart
 * @uses YAHOO.widget.CartesianChart
 * @constructor
 * @param containerId {HTMLElement} Container element for the Flash Player instance.
 * @param dataSource {YAHOO.util.DataSource} DataSource instance.
 * @param attributes {object} (optional) Object literal of configuration values.
 */
YAHOO.widget.LineChart = function(containerId, dataSource, attributes)
{
	YAHOO.widget.LineChart.superclass.constructor.call(this, "line", containerId, dataSource, attributes);
};

YAHOO.lang.extend(YAHOO.widget.LineChart, YAHOO.widget.CartesianChart);

/**
 * ColumnChart class for the YUI Charts widget.
 *
 * @namespace YAHOO.widget
 * @class ColumnChart
 * @uses YAHOO.widget.CartesianChart
 * @constructor
 * @param containerId {HTMLElement} Container element for the Flash Player instance.
 * @param dataSource {YAHOO.util.DataSource} DataSource instance.
 * @param attributes {object} (optional) Object literal of configuration values.
 */
YAHOO.widget.ColumnChart = function(containerId, dataSource, attributes)
{
	YAHOO.widget.ColumnChart.superclass.constructor.call(this, "column", containerId, dataSource, attributes);
};

YAHOO.lang.extend(YAHOO.widget.ColumnChart, YAHOO.widget.CartesianChart);

/**
 * BarChart class for the YUI Charts widget.
 *
 * @namespace YAHOO.widget
 * @class BarChart
 * @uses YAHOO.widget.CartesianChart
 * @constructor
 * @param containerId {HTMLElement} Container element for the Flash Player instance.
 * @param dataSource {YAHOO.util.DataSource} DataSource instance.
 * @param attributes {object} (optional) Object literal of configuration values.
 */
YAHOO.widget.BarChart = function(containerId, dataSource, attributes)
{
	YAHOO.widget.BarChart.superclass.constructor.call(this, "bar", containerId, dataSource, attributes);
};

YAHOO.lang.extend(YAHOO.widget.BarChart, YAHOO.widget.CartesianChart);

/**
 * StackedColumnChart class for the YUI Charts widget.
 *
 * @namespace YAHOO.widget
 * @class StackedColumnChart
 * @uses YAHOO.widget.CartesianChart
 * @constructor
 * @param containerId {HTMLElement} Container element for the Flash Player instance.
 * @param dataSource {YAHOO.util.DataSource} DataSource instance.
 * @param attributes {object} (optional) Object literal of configuration values.
 */
YAHOO.widget.StackedColumnChart = function(containerId, dataSource, attributes)
{
	YAHOO.widget.StackedColumnChart.superclass.constructor.call(this, "stackcolumn", containerId, dataSource, attributes);
};

YAHOO.lang.extend(YAHOO.widget.StackedColumnChart, YAHOO.widget.CartesianChart);

/**
 * StackedBarChart class for the YUI Charts widget.
 *
 * @namespace YAHOO.widget
 * @class StackedBarChart
 * @uses YAHOO.widget.CartesianChart
 * @constructor
 * @param containerId {HTMLElement} Container element for the Flash Player instance.
 * @param dataSource {YAHOO.util.DataSource} DataSource instance.
 * @param attributes {object} (optional) Object literal of configuration values.
 */
YAHOO.widget.StackedBarChart = function(containerId, dataSource, attributes)
{
	YAHOO.widget.StackedBarChart.superclass.constructor.call(this, "stackbar", containerId, dataSource, attributes);
};

YAHOO.lang.extend(YAHOO.widget.StackedBarChart, YAHOO.widget.CartesianChart);
/**
 * Defines a CartesianChart's vertical or horizontal axis.
 *
 * @namespace YAHOO.widget
 * @class Axis
 * @constructor
 */
YAHOO.widget.Axis = function()
{
};

YAHOO.widget.Axis.prototype = 
{
	/**
	 * The type of axis.
	 *
	 * @property type
	 * @type String
	 */
	type: null,
	
	/**
	 * If true, the items on the axis will be drawn in opposite direction.
	 *
	 * @property reverse
	 * @type Boolean
	 */
	reverse: false,
	
	/**
	 * A string reference to the globally-accessible function that may be called to
	 * determine each of the label values for this axis. Also accepts function references.
	 *
	 * @property labelFunction
	 * @type String
	 */
	labelFunction: null,
	
	/**
	 * The space, in pixels, between labels on an axis.
	 *
	 * @property labelSpacing
	 * @type Number
	 */
	labelSpacing: 2,
	
	/**
	 * The text that will appear next to the axis to indicate information about the data that it displays.
	 *
	 * @property title
	 * @type String
	 */
	title: null 
};
/**
 * A type of axis whose units are measured in numeric values.
 *
 * @namespace YAHOO.widget
 * @class NumericAxis
 * @extends YAHOO.widget.Axis
 * @constructor
 */
YAHOO.widget.NumericAxis = function()
{
	YAHOO.widget.NumericAxis.superclass.constructor.call(this);
};

YAHOO.lang.extend(YAHOO.widget.NumericAxis, YAHOO.widget.Axis,
{
	type: "numeric",
	
	/**
	 * The minimum value drawn by the axis. If not set explicitly, the axis minimum
	 * will be calculated automatically.
	 *
	 * @property minimum
	 * @type Number
	 */
	minimum: NaN,
	
	/**
	 * The maximum value drawn by the axis. If not set explicitly, the axis maximum
	 * will be calculated automatically.
	 *
	 * @property maximum
	 * @type Number
	 */
	maximum: NaN,
	
	/**
	 * The spacing between major intervals on this axis.
	 *
	 * @property majorUnit
	 * @type Number
	 */
	majorUnit: NaN,

	/**
	 * The spacing between minor intervals on this axis.
	 *
	 * @property minorUnit
	 * @type Number
	 */
	minorUnit: NaN,
	
	/**
	 * If true, the labels, ticks, gridlines, and other objects will snap to
	 * the nearest major or minor unit. If false, their position will be based
	 * on the minimum value.
	 *
	 * @property snapToUnits
	 * @type Boolean
	 */
	snapToUnits: true,
	
	/**
	 * Series that are stackable will only stack when this value is set to true.
	 *
	 * @property stackingEnabled
	 * @type Boolean
	 */
	stackingEnabled: false,

	/**
	 * If true, and the bounds are calculated automatically, either the minimum or
	 * maximum will be set to zero.
	 *
	 * @property alwaysShowZero
	 * @type Boolean
	 */
	alwaysShowZero: true,

	/**
	 * The scaling algorithm to use on this axis. May be "linear" or "logarithmic".
	 *
	 * @property scale
	 * @type String
	 */
	scale: "linear",
	
	/**
	 * Indicates whether to round the major unit.
	 * 
	 * @property roundMajorUnit
	 * @type Boolean
	 */
	roundMajorUnit: true, 
	
	/**
	 * Indicates whether to factor in the size of the labels when calculating a major unit.
	 *
	 * @property calculateByLabelSize
	 * @type Boolean
	 */
	calculateByLabelSize: true,
	
	/**
	 * Indicates the position of the axis relative to the chart
	 *
	 * @property position
	 * @type String
	 */
	position:"left",
	
	/**
	 * Indicates whether to extend maximum beyond data's maximum to the nearest 
	 * majorUnit.
	 *
	 * @property adjustMaximumByMajorUnit
	 * @type Boolean
	 */
	adjustMaximumByMajorUnit:true,
	
	/**
	 * Indicates whether to extend the minimum beyond data's minimum to the nearest
	 * majorUnit.
	 *
	 * @property adjustMinimumByMajorUnit
	 * @type Boolean
	 */
	adjustMinimumByMajorUnit:true
});
/**
 * A type of axis whose units are measured in time-based values.
 *
 * @namespace YAHOO.widget
 * @class TimeAxis
 * @constructor
 */
YAHOO.widget.TimeAxis = function()
{
	YAHOO.widget.TimeAxis.superclass.constructor.call(this);
};

YAHOO.lang.extend(YAHOO.widget.TimeAxis, YAHOO.widget.Axis,
{
	type: "time",
	
	/**
	 * The minimum value drawn by the axis. If not set explicitly, the axis minimum
	 * will be calculated automatically.
	 *
	 * @property minimum
	 * @type Date
	 */
	minimum: null,

	/**
	 * The maximum value drawn by the axis. If not set explicitly, the axis maximum
	 * will be calculated automatically.
	 *
	 * @property maximum
	 * @type Number
	 */
	maximum: null,
	
	/**
	 * The spacing between major intervals on this axis.
	 *
	 * @property majorUnit
	 * @type Number
	 */
	majorUnit: NaN,
	
	/**
	 * The time unit used by the majorUnit.
	 *
	 * @property majorTimeUnit
	 * @type String
	 */
	majorTimeUnit: null,
	
	/**
	 * The spacing between minor intervals on this axis.
	 *
	 * @property majorUnit
	 * @type Number
	 */
	minorUnit: NaN,
	
	/**
	 * The time unit used by the minorUnit.
	 *
	 * @property majorTimeUnit
	 * @type String
	 */
	minorTimeUnit: null,

	/**
	 * If true, the labels, ticks, gridlines, and other objects will snap to
	 * the nearest major or minor unit. If false, their position will be based
	 * on the minimum value.
	 *
	 * @property snapToUnits
	 * @type Boolean
	 */
	snapToUnits: true,

	/**
	 * Series that are stackable will only stack when this value is set to true.
	 *
	 * @property stackingEnabled
	 * @type Boolean
	 */
	stackingEnabled: false,

	/**
	 * Indicates whether to factor in the size of the labels when calculating a major unit.
	 *
	 * @property calculateByLabelSize
	 * @type Boolean
	 */
	calculateByLabelSize: true	
});
/**
 * A type of axis that displays items in categories.
 *
 * @namespace YAHOO.widget
 * @class CategoryAxis
 * @constructor
 */
YAHOO.widget.CategoryAxis = function()
{
	YAHOO.widget.CategoryAxis.superclass.constructor.call(this);
};

YAHOO.lang.extend(YAHOO.widget.CategoryAxis, YAHOO.widget.Axis,
{
	type: "category",
	
	/**
	 * A list of category names to display along this axis.
	 *
	 * @property categoryNames
	 * @type Array
	 */
	categoryNames: null,
	
	/**
	 * Indicates whether or not to calculate the number of categories (ticks and labels)
	 * when there is not enough room to display all labels on the axis. If set to true, the axis 
	 * will determine the number of categories to plot. If not, all categories will be plotted.
	 *
	 * @property calculateCategoryCount
	 * @type Boolean
	 */
	calculateCategoryCount: false 
});
 /**
 * Functionality common to most series. Generally, a <code>Series</code> 
 * object shouldn't be instantiated directly. Instead, a subclass with a 
 * concrete implementation should be used.
 *
 * @namespace YAHOO.widget
 * @class Series
 * @constructor
 */
YAHOO.widget.Series = function() {};

YAHOO.widget.Series.prototype = 
{
	/**
	 * The type of series.
	 *
	 * @property type
	 * @type String
	 */
	type: null,
	
	/**
	 * The human-readable name of the series.
	 *
	 * @property displayName
	 * @type String
	 */
	displayName: null
};

/**
 * Functionality common to most series appearing in cartesian charts.
 * Generally, a <code>CartesianSeries</code> object shouldn't be
 * instantiated directly. Instead, a subclass with a concrete implementation
 * should be used.
 *
 * @namespace YAHOO.widget
 * @class CartesianSeries
 * @uses YAHOO.widget.Series
 * @constructor
 */
YAHOO.widget.CartesianSeries = function() 
{
	YAHOO.widget.CartesianSeries.superclass.constructor.call(this);
};

YAHOO.lang.extend(YAHOO.widget.CartesianSeries, YAHOO.widget.Series,
{
	/**
	 * The field used to access the x-axis value from the items from the data source.
	 *
	 * @property xField
	 * @type String
	 */
	xField: null,
	
	/**
	 * The field used to access the y-axis value from the items from the data source.
	 *
	 * @property yField
	 * @type String
	 */
	yField: null,
	
	/**
	 * Indicates which axis the series will bind to
	 *
	 * @property axis
	 * @type String
	 */
	axis: "primary",
	
	/**
	 * When a Legend is present, indicates whether the series will show in the legend.
	 * 
	 * @property showInLegend
	 * @type Boolean
	 */
	showInLegend: true
});

/**
 * ColumnSeries class for the YUI Charts widget.
 *
 * @namespace YAHOO.widget
 * @class ColumnSeries
 * @uses YAHOO.widget.CartesianSeries
 * @constructor
 */
YAHOO.widget.ColumnSeries = function() 
{
	YAHOO.widget.ColumnSeries.superclass.constructor.call(this);
};

YAHOO.lang.extend(YAHOO.widget.ColumnSeries, YAHOO.widget.CartesianSeries,
{
	type: "column"
});

/**
 * LineSeries class for the YUI Charts widget.
 *
 * @namespace YAHOO.widget
 * @class LineSeries
 * @uses YAHOO.widget.CartesianSeries
 * @constructor
 */
YAHOO.widget.LineSeries = function() 
{
	YAHOO.widget.LineSeries.superclass.constructor.call(this);
};

YAHOO.lang.extend(YAHOO.widget.LineSeries, YAHOO.widget.CartesianSeries,
{
	type: "line"
});


/**
 * BarSeries class for the YUI Charts widget.
 *
 * @namespace YAHOO.widget
 * @class BarSeries
 * @uses YAHOO.widget.CartesianSeries
 * @constructor
 */
YAHOO.widget.BarSeries = function() 
{
	YAHOO.widget.BarSeries.superclass.constructor.call(this);
};

YAHOO.lang.extend(YAHOO.widget.BarSeries, YAHOO.widget.CartesianSeries,
{
	type: "bar"
});


/**
 * PieSeries class for the YUI Charts widget.
 *
 * @namespace YAHOO.widget
 * @class PieSeries
 * @uses YAHOO.widget.Series
 * @constructor
 */
YAHOO.widget.PieSeries = function() 
{
	YAHOO.widget.PieSeries.superclass.constructor.call(this);
};

YAHOO.lang.extend(YAHOO.widget.PieSeries, YAHOO.widget.Series,
{
	type: "pie",
	
	/**
	 * The field used to access the data value from the items from the data source.
	 *
	 * @property dataField
	 * @type String
	 */
	dataField: null,
	
	/**
	 * The field used to access the category value from the items from the data source.
	 *
	 * @property categoryField
	 * @type String
	 */
	categoryField: null,

	/**
	 * A string reference to the globally-accessible function that may be called to
	 * determine each of the label values for this series. Also accepts function references.
	 *
	 * @property labelFunction
	 * @type String
	 */
	labelFunction: null
});

/**
 * StackedBarSeries class for the YUI Charts widget.
 *
 * @namespace YAHOO.widget
 * @class StackedBarSeries
 * @uses YAHOO.widget.CartesianSeries
 * @constructor
 */
YAHOO.widget.StackedBarSeries = function() 
{
	YAHOO.widget.StackedBarSeries.superclass.constructor.call(this);
};

YAHOO.lang.extend(YAHOO.widget.StackedBarSeries, YAHOO.widget.CartesianSeries,
{
	type: "stackbar"
});

/**
 * StackedColumnSeries class for the YUI Charts widget.
 *
 * @namespace YAHOO.widget
 * @class StackedColumnSeries
 * @uses YAHOO.widget.CartesianSeries
 * @constructor
 */
YAHOO.widget.StackedColumnSeries = function() 
{
	YAHOO.widget.StackedColumnSeries.superclass.constructor.call(this);
};

YAHOO.lang.extend(YAHOO.widget.StackedColumnSeries, YAHOO.widget.CartesianSeries,
{
	type: "stackcolumn"
});
YAHOO.register("charts", YAHOO.widget.Chart, {version: "2.9.0", build: "2800"});
