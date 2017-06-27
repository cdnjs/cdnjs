/*
Copyright (c) 2010, Yahoo! Inc. All rights reserved.
Code licensed under the BSD License:
http://developer.yahoo.net/yui/license.txt
version: 2.7.0r2
*/
/*extern ActiveXObject, __flash_unloadHandler, __flash_savedUnloadHandler */
/*!
 * SWFObject v1.5: Flash Player detection and embed - http://blog.deconcept.com/swfobject/
 *
 * SWFObject is (c) 2007 Geoff Stearns and is released under the MIT License:
 * http://www.opensource.org/licenses/mit-license.php
 * @namespace YAHOO
 */

YAHOO.namespace("deconcept"); 
	
YAHOO.deconcept = YAHOO.deconcept || {};

if(typeof YAHOO.deconcept.util == "undefined" || !YAHOO.deconcept.util)
{
	YAHOO.deconcept.util = {};
}

if(typeof YAHOO.deconcept.SWFObjectUtil == "undefined" || !YAHOO.deconcept.SWFObjectUtil)
{
	YAHOO.deconcept.SWFObjectUtil = {};
}

YAHOO.deconcept.SWFObject = function(swf, id, w, h, ver, c, quality, xiRedirectUrl, redirectUrl, detectKey)
{
	if(!document.getElementById) { return; }
	this.DETECT_KEY = detectKey ? detectKey : 'detectflash';
	this.skipDetect = YAHOO.deconcept.util.getRequestParameter(this.DETECT_KEY);
	this.params = {};
	this.variables = {};
	this.attributes = [];
	if(swf) { this.setAttribute('swf', swf); }
	if(id) { this.setAttribute('id', id); }
	if(w) { this.setAttribute('width', w); }
	if(h) { this.setAttribute('height', h); }
	if(ver) { this.setAttribute('version', new YAHOO.deconcept.PlayerVersion(ver.toString().split("."))); }
	this.installedVer = YAHOO.deconcept.SWFObjectUtil.getPlayerVersion();
	if (!window.opera && document.all && this.installedVer.major > 7)
	{
		// only add the onunload cleanup if the Flash Player version supports External Interface and we are in IE
		YAHOO.deconcept.SWFObject.doPrepUnload = true;
	}
	if(c)
	{
		this.addParam('bgcolor', c);
	}
	var q = quality ? quality : 'high';
	this.addParam('quality', q);
	this.setAttribute('useExpressInstall', false);
	this.setAttribute('doExpressInstall', false);
	var xir = (xiRedirectUrl) ? xiRedirectUrl : window.location;
	this.setAttribute('xiRedirectUrl', xir);
	this.setAttribute('redirectUrl', '');
	if(redirectUrl)
	{
		this.setAttribute('redirectUrl', redirectUrl);
	}
};

YAHOO.deconcept.SWFObject.prototype =
{
	useExpressInstall: function(path)
	{
		this.xiSWFPath = !path ? "expressinstall.swf" : path;
		this.setAttribute('useExpressInstall', true);
	},
	setAttribute: function(name, value){
		this.attributes[name] = value;
	},
	getAttribute: function(name){
		return this.attributes[name];
	},
	addParam: function(name, value){
		this.params[name] = value;
	},
	getParams: function(){
		return this.params;
	},
	addVariable: function(name, value){
		this.variables[name] = value;
	},
	getVariable: function(name){
		return this.variables[name];
	},
	getVariables: function(){
		return this.variables;
	},
	getVariablePairs: function(){
		var variablePairs = [];
		var key;
		var variables = this.getVariables();
		for(key in variables)
		{
			if(variables.hasOwnProperty(key))
			{
				variablePairs[variablePairs.length] = key +"="+ variables[key];
			}
		}
		return variablePairs;
	},
	getSWFHTML: function() {
		var swfNode = "";
		var params = {};
		var key = "";
		var pairs = "";
		if (navigator.plugins && navigator.mimeTypes && navigator.mimeTypes.length) { // netscape plugin architecture
			if (this.getAttribute("doExpressInstall")) {
				this.addVariable("MMplayerType", "PlugIn");
				this.setAttribute('swf', this.xiSWFPath);
			}
			swfNode = '<embed type="application/x-shockwave-flash" src="'+ this.getAttribute('swf') +'" width="'+ this.getAttribute('width') +'" height="'+ this.getAttribute('height') +'" style="'+ this.getAttribute('style') +'"';
			swfNode += ' id="'+ this.getAttribute('id') +'" name="'+ this.getAttribute('id') +'" ';
			params = this.getParams();
			for(key in params)
			{
				if(params.hasOwnProperty(key))
				{
					swfNode += [key] +'="'+ params[key] +'" ';
				}
			}
			pairs = this.getVariablePairs().join("&");
			if (pairs.length > 0){ swfNode += 'flashvars="'+ pairs +'"'; }
			swfNode += '/>';
		} else { // PC IE
			if (this.getAttribute("doExpressInstall")) {
				this.addVariable("MMplayerType", "ActiveX");
				this.setAttribute('swf', this.xiSWFPath);
			}
			swfNode = '<object id="'+ this.getAttribute('id') +'" classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" width="'+ this.getAttribute('width') +'" height="'+ this.getAttribute('height') +'" style="'+ this.getAttribute('style') +'">';
			swfNode += '<param name="movie" value="'+ this.getAttribute('swf') +'" />';
			params = this.getParams();
			for(key in params)
			{
				if(params.hasOwnProperty(key))
				{
					swfNode += '<param name="'+ key +'" value="'+ params[key] +'" />';
				}
			}
			pairs = this.getVariablePairs().join("&");
			if(pairs.length > 0) {swfNode += '<param name="flashvars" value="'+ pairs +'" />';}
			swfNode += "</object>";
		}
		return swfNode;
	},
	write: function(elementId)
	{
		if(this.getAttribute('useExpressInstall')) {
			// check to see if we need to do an express install
			var expressInstallReqVer = new YAHOO.deconcept.PlayerVersion([6,0,65]);
			if (this.installedVer.versionIsValid(expressInstallReqVer) && !this.installedVer.versionIsValid(this.getAttribute('version'))) {
				this.setAttribute('doExpressInstall', true);
				this.addVariable("MMredirectURL", escape(this.getAttribute('xiRedirectUrl')));
				document.title = document.title.slice(0, 47) + " - Flash Player Installation";
				this.addVariable("MMdoctitle", document.title);
			}
		}
		if(this.skipDetect || this.getAttribute('doExpressInstall') || this.installedVer.versionIsValid(this.getAttribute('version')))
		{
			var n = (typeof elementId == 'string') ? document.getElementById(elementId) : elementId;
			n.innerHTML = this.getSWFHTML();
			return true;
		}
		else
		{
			if(this.getAttribute('redirectUrl') !== "")
			{
				document.location.replace(this.getAttribute('redirectUrl'));
			}
		}
		return false;
	}
};

/* ---- detection functions ---- */
YAHOO.deconcept.SWFObjectUtil.getPlayerVersion = function()
{
	var axo = null;
	var PlayerVersion = new YAHOO.deconcept.PlayerVersion([0,0,0]);
	if(navigator.plugins && navigator.mimeTypes.length)
	{
		var x = navigator.plugins["Shockwave Flash"];
		if(x && x.description)
		{
			PlayerVersion = new YAHOO.deconcept.PlayerVersion(x.description.replace(/([a-zA-Z]|\s)+/, "").replace(/(\s+r|\s+b[0-9]+)/, ".").split("."));
		}
	}
	else if (navigator.userAgent && navigator.userAgent.indexOf("Windows CE") >= 0)
	{ // if Windows CE
		var counter = 3;
		while(axo)
		{
			try
			{
				counter++;
				axo = new ActiveXObject("ShockwaveFlash.ShockwaveFlash."+ counter);
//				document.write("player v: "+ counter);
				PlayerVersion = new YAHOO.deconcept.PlayerVersion([counter,0,0]);
			}
			catch(e)
			{
				axo = null;
			}
		}
	}
	else
	{ // Win IE (non mobile)
		// do minor version lookup in IE, but avoid fp6 crashing issues
		// see http://blog.deconcept.com/2006/01/11/getvariable-setvariable-crash-internet-explorer-flash-6/
		try
		{
			axo = new ActiveXObject("ShockwaveFlash.ShockwaveFlash.7");
		}
		catch(e)
		{
			try
			{
				axo = new ActiveXObject("ShockwaveFlash.ShockwaveFlash.6");
				PlayerVersion = new YAHOO.deconcept.PlayerVersion([6,0,21]);
				axo.AllowScriptAccess = "always"; // error if player version < 6.0.47 (thanks to Michael Williams @ Adobe for this code)
			}
			catch(e)
			{
				if(PlayerVersion.major == 6)
				{
					return PlayerVersion;
				}
			}
			try
			{
				axo = new ActiveXObject("ShockwaveFlash.ShockwaveFlash");
			}
			catch(e) {}
		}
		
		if(axo !== null)
		{
			PlayerVersion = new YAHOO.deconcept.PlayerVersion(axo.GetVariable("$version").split(" ")[1].split(","));
		}
	}
	return PlayerVersion;
};

YAHOO.deconcept.PlayerVersion = function(arrVersion)
{
	this.major = arrVersion[0] !== null ? parseInt(arrVersion[0], 0) : 0;
	this.minor = arrVersion[1] !== null ? parseInt(arrVersion[1], 0) : 0;
	this.rev = arrVersion[2] !== null ? parseInt(arrVersion[2], 0) : 0;
};

YAHOO.deconcept.PlayerVersion.prototype.versionIsValid = function(fv)
{
	if(this.major < fv.major)
	{
		return false;
	}
	if(this.major > fv.major)
	{
		return true;
	}
	if(this.minor < fv.minor)
	{
		return false;
	}
	if(this.minor > fv.minor)
	{
		return true;
	}
	if(this.rev < fv.rev)
	{
		return false;
	}
	return true;
};

/* ---- get value of query string param ---- */
YAHOO.deconcept.util =
{
	getRequestParameter: function(param)
	{
		var q = document.location.search || document.location.hash;
		if(param === null) { return q; }
		if(q)
		{
			var pairs = q.substring(1).split("&");
			for(var i=0; i < pairs.length; i++)
			{
				if (pairs[i].substring(0, pairs[i].indexOf("=")) == param)
				{
					return pairs[i].substring((pairs[i].indexOf("=") + 1));
				}
			}
		}
		return "";
	}
};

/* fix for video streaming bug */
YAHOO.deconcept.SWFObjectUtil.cleanupSWFs = function()
{
	var objects = document.getElementsByTagName("OBJECT");
	for(var i = objects.length - 1; i >= 0; i--)
	{
		objects[i].style.display = 'none';
		for(var x in objects[i])
		{
			if(typeof objects[i][x] == 'function')
			{
				objects[i][x] = function(){};
			}
		}
	}
};

// fixes bug in some fp9 versions see http://blog.deconcept.com/2006/07/28/swfobject-143-released/
if(YAHOO.deconcept.SWFObject.doPrepUnload)
{
	if(!YAHOO.deconcept.unloadSet)
	{
		YAHOO.deconcept.SWFObjectUtil.prepUnload = function()
		{
			__flash_unloadHandler = function(){};
			__flash_savedUnloadHandler = function(){};
			window.attachEvent("onunload", YAHOO.deconcept.SWFObjectUtil.cleanupSWFs);
		};
		window.attachEvent("onbeforeunload", YAHOO.deconcept.SWFObjectUtil.prepUnload);
		YAHOO.deconcept.unloadSet = true;
	}
}

/* add document.getElementById if needed (mobile IE < 5) */
if(!document.getElementById && document.all)
{
	document.getElementById = function(id) { return document.all[id]; };
}


/**
 * Wraps Flash embedding functionality and allows communication with SWF through
 * attributes.
 *
 * @namespace YAHOO.widget
 * @class FlashAdapter
 * @uses YAHOO.util.AttributeProvider
 */
YAHOO.widget.FlashAdapter = function(swfURL, containerID, attributes)
{
	// set up the initial events and attributes stuff
	this._queue = this._queue || [];
	this._events = this._events || {};
	this._configs = this._configs || {};
	attributes = attributes || {};
	
	//the Flash Player external interface code from Adobe doesn't play nicely
	//with the default value, yui-gen, in IE
	this._id = attributes.id = attributes.id || YAHOO.util.Dom.generateId(null, "yuigen");
	attributes.version = attributes.version || "9.0.45";
	attributes.backgroundColor = attributes.backgroundColor || "#ffffff";
	
	//we can't use the initial attributes right away
	//so save them for once the SWF finishes loading
	this._attributes = attributes;
	
	this._swfURL = swfURL;
	this._containerID = containerID;
	
	//embed the SWF file in the page
	this._embedSWF(this._swfURL, this._containerID, attributes.id, attributes.version,
		attributes.backgroundColor, attributes.expressInstall, attributes.wmode);
	
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
};

YAHOO.extend(YAHOO.widget.FlashAdapter, YAHOO.util.AttributeProvider,
{
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

	/**
	 * Public accessor to the unique name of the FlashAdapter instance.
	 *
	 * @method toString
	 * @return {String} Unique name of the FlashAdapter instance.
	 */
	toString: function()
	{
		return "FlashAdapter " + this._id;
	},

	/**
	 * Nulls out the entire FlashAdapter instance and related objects and removes attached
	 * event listeners and clears out DOM elements inside the container. After calling
	 * this method, the instance reference should be expliclitly nulled by implementer,
	 * as in myChart = null. Use with caution!
	 *
	 * @method destroy
	 */
	destroy: function()
	{
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
	 * Embeds the SWF in the page and associates it with this instance.
	 *
	 * @method _embedSWF
	 * @private
	 */
	_embedSWF: function(swfURL, containerID, swfID, version, backgroundColor, expressInstall, wmode)
	{
		//standard SWFObject embed
		var swfObj = new YAHOO.deconcept.SWFObject(swfURL, swfID, "100%", "100%", version, backgroundColor);

		if(expressInstall)
		{
			swfObj.useExpressInstall(expressInstall);
		}

		//make sure we can communicate with ExternalInterface
		swfObj.addParam("allowScriptAccess", "always");
		
		if(wmode)
		{
			swfObj.addParam("wmode", wmode);
		}
		
		//again, a useful ExternalInterface trick
		swfObj.addVariable("allowedDomain", document.location.hostname);

		//tell the SWF which HTML element it is in
		swfObj.addVariable("elementID", swfID);

		// set the name of the function to call when the swf has an event
		swfObj.addVariable("eventHandler", "YAHOO.widget.FlashAdapter.eventHandler");

		var container = YAHOO.util.Dom.get(containerID);
		var result = swfObj.write(container);
		if(result)
		{
			this._swf = YAHOO.util.Dom.get(swfID);
			//if successful, let's add an owner property to the SWF reference
			//this will allow the event handler to communicate with a YAHOO.widget.FlashAdapter
			this._swf.owner = this;
		}
		else
		{
		}
	},

	/**
	 * Handles or re-dispatches events received from the SWF.
	 *
	 * @method _eventHandler
	 * @private
	 */
	_eventHandler: function(event)
	{
		var type = event.type;
		switch(type)
		{
			case "swfReady":
   				this._loadHandler();
   				this.fireEvent("contentReady");
				return;
			case "log":
				return;
		}
		
		//be sure to return after your case or the event will automatically fire!
		this.fireEvent(type, event);
	},

	/**
	 * Called when the SWF has been initialized.
	 *
	 * @method _loadHandler
	 * @private
	 */
	_loadHandler: function()
	{
		this._initialized = false;
		this._initAttributes(this._attributes);
		this.setAttributes(this._attributes, true);
		
		this._initialized = true;
	},
	
	set: function(name, value)
	{
		//save all the attributes in case the swf reloads
		//so that we can pass them in again
		this._attributes[name] = value;
		YAHOO.widget.FlashAdapter.superclass.set.call(this, name, value);
	},
	
	/**
	 * Initializes the attributes.
	 *
	 * @method _initAttributes
	 * @private
	 */
	_initAttributes: function(attributes)
	{
		//should be overridden if other attributes need to be set up

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
		this.getAttributeConfig("altText",
		{
			method: this._getAltText
		});
		this.setAttributeConfig("altText",
		{
			method: this._setAltText
		});
		
		/**
		 * @attribute swfURL
		 * @description Absolute or relative URL to the SWF displayed by the FlashAdapter. Only available in the constructor because it may not be
		 *		set after Flash Player has been embedded in the page.
		 * @type String
		 */
		this.getAttributeConfig("swfURL",
		{
			method: this._getSWFURL
		});
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
		return this._swf.setAltText(value);
	}
});

/**
 * Receives event messages from SWF and passes them to the correct instance
 * of FlashAdapter.
 *
 * @method YAHOO.widget.FlashAdapter.eventHandler
 * @static
 * @private
 */
YAHOO.widget.FlashAdapter.eventHandler = function(elementID, event)
{
	var loadedSWF = YAHOO.util.Dom.get(elementID);
	if(!loadedSWF.owner)
	{
		//fix for ie: if owner doesn't exist yet, try again in a moment
		setTimeout(function() { YAHOO.widget.FlashAdapter.eventHandler( elementID, event ); }, 0);
	}
	else
	{
		loadedSWF.owner._eventHandler(event);
	}
};

/**
 * The number of proxy functions that have been created.
 * @static
 * @private
 */
YAHOO.widget.FlashAdapter.proxyFunctionCount = 0;

/**
 * Creates a globally accessible function that wraps a function reference.
 * Returns the proxy function's name as a string for use by the SWF through
 * ExternalInterface.
 *
 * @method YAHOO.widget.FlashAdapter.createProxyFunction
 * @static
 * @private
 */
YAHOO.widget.FlashAdapter.createProxyFunction = function(func)
{
	var index = YAHOO.widget.FlashAdapter.proxyFunctionCount;
	YAHOO.widget.FlashAdapter["proxyFunction" + index] = function()
	{
		return func.apply(null, arguments);
	};
	YAHOO.widget.FlashAdapter.proxyFunctionCount++;
	return "YAHOO.widget.FlashAdapter.proxyFunction" + index.toString();
};

/**
 * Removes a function created with createProxyFunction()
 * 
 * @method YAHOO.widget.FlashAdapter.removeProxyFunction
 * @static
 * @private
 */
YAHOO.widget.FlashAdapter.removeProxyFunction = function(funcName)
{
	//quick error check
	if(!funcName || funcName.indexOf("YAHOO.widget.FlashAdapter.proxyFunction") < 0)
	{
		return;
	}
	
	funcName = funcName.substr(26);
	YAHOO.widget.FlashAdapter[funcName] = null;
};

/**
 * The Charts widget provides a Flash control for displaying data
 * graphically by series across A-grade browsers with Flash Player installed.
 *
 * @module charts
 * @requires yahoo, dom, event, datasource
 * @title Charts Widget
 * @experimental
 */
 
/****************************************************************************/
/****************************************************************************/
/****************************************************************************/

/**
 * Chart class for the YUI Charts widget.
 *
 * @namespace YAHOO.widget
 * @class Chart
 * @uses YAHOO.widget.FlashAdapter
 * @constructor
 * @param type {String} The char type. May be "line", "column", "bar", or "pie"
 * @param containerId {HTMLElement} Container element for the Flash Player instance.
 * @param dataSource {YAHOO.util.DataSource} DataSource instance.
 * @param attributes {object} (optional) Object literal of configuration values.
 */
YAHOO.widget.Chart = function(type, containerId, dataSource, attributes)
{
	YAHOO.widget.Chart.superclass.constructor.call(this, YAHOO.widget.Chart.SWFURL, containerId, attributes);
	
	this._type = type;
	this._dataSource = dataSource;
	
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

YAHOO.extend(YAHOO.widget.Chart, YAHOO.widget.FlashAdapter,
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
	 * YAHOO.widget.FlashAdapter.createProxyFunction()
	 * @property _dataTipFunction
	 * @type String
	 * @private
	 */
	_dataTipFunction: null,
	
	/**
	 * Stores references to series labelFunction values created by
	 * YAHOO.widget.FlashAdapter.createProxyFunction()
	 * @property _seriesLabelFunctions
	 * @type Array
	 * @private
	 */
	_seriesLabelFunctions: null,

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
			YAHOO.widget.FlashAdapter.removeProxyFunction(this._dataTipFunction);
		}
		
		//call last
		YAHOO.widget.Chart.superclass.destroy.call(this);
	},
	
	/**
	 * Initializes the attributes.
	 *
	 * @method _initAttributes
	 * @private
	 */
	_initAttributes: function(attributes)
	{
		YAHOO.widget.Chart.superclass._initAttributes.call(this, attributes);

		/**
		 * @attribute request
		 * @description Request to be sent to the Chart's DataSource.
		 * @type String
		 */
		this.getAttributeConfig("request",
		{
			method: this._getRequest
		});
		
		this.setAttributeConfig("request",
		{
			method: this._setRequest
		});
		
		/**
		 * @attribute dataSource
		 * @description The DataSource instance to display in the Chart.
		 * @type DataSource
		 */
		this.getAttributeConfig("dataSource",
		{
			method: this._getDataSource
		});
		
		this.setAttributeConfig("dataSource",
		{
			method: this._setDataSource
		});
		
		/**
		 * @attribute series
		 * @description Defines the series to be displayed by the Chart.
		 * @type Array
		 */
		this.getAttributeConfig("series",
		{
			method: this._getSeriesDefs
		});
		
		this.setAttributeConfig("series",
		{
			method: this._setSeriesDefs
		});
		
		/**
		 * @attribute categoryNames
		 * @description Defines the names of the categories to be displayed in the Chart..
		 * @type Array
		 */
		this.getAttributeConfig("categoryNames",
		{
			method: this._getCategoryNames
		});
		
		this.setAttributeConfig("categoryNames",
		{
			validator: YAHOO.lang.isArray,
			method: this._setCategoryNames
		});
		
		/**
		 * @attribute dataTipFunction
		 * @description The string representation of a globally-accessible function
		 * that may be called by the SWF to generate the datatip text for a Chart's item.
		 * @type String
		 */
		this.getAttributeConfig("dataTipFunction",
		{
			method: this._getDataTipFunction
		});
		
		this.setAttributeConfig("dataTipFunction",
		{
			method: this._setDataTipFunction
		});

		/**
		 * @attribute polling
		 * @description A numeric value indicating the number of milliseconds between
		 * polling requests to the DataSource.
		 * @type Number
		 */
		this.getAttributeConfig("polling",
		{
			method: this._getPolling
		});

		this.setAttributeConfig("polling",
		{
			method: this._setPolling
		});
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
		this._swf.setType(this._type);
		
		//set initial styles
		if(this._attributes.style)
		{
			var style = this._attributes.style;
			this.setStyles(style);		
		}
		
		YAHOO.widget.Chart.superclass._loadHandler.call(this);
		
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
			}
			else
			{
				var i;
				if(this._seriesLabelFunctions)
				{
					var count = this._seriesLabelFunctions.length;
					for(i = 0; i < count; i++)
					{
						YAHOO.widget.FlashAdapter.removeProxyFunction(this._seriesLabelFunctions[i]);
					}
					this._seriesLabelFunction = null;
				}
				this._seriesLabelFunctions = [];

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
									if(currentSeries.labelFunction !== null &&
										typeof currentSeries.labelFunction == "function")
									{
										clonedSeries.labelFunction = YAHOO.widget.FlashAdapter.createProxyFunction(currentSeries.labelFunction);
										this._seriesLabelFunctions.push(clonedSeries.labelFunction);
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
				this._swf.setDataProvider(dataProvider);
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
		this._swf.getCategoryNames();
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
			YAHOO.widget.FlashAdapter.removeProxyFunction(this._dataTipFunction);
		}
		
		if(value && typeof value == "function")
		{
			value = YAHOO.widget.FlashAdapter.createProxyFunction(value);
			this._dataTipFunction = value;
		}
		this._swf.setDataTipFunction(value);
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
	}
});

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
		this.getAttributeConfig("dataField",
		{
			method: this._getDataField
		});
   
		this.setAttributeConfig("dataField",
		{
			validator: YAHOO.lang.isString,
			method: this._setDataField
		});
   
		/**
		 * @attribute categoryField
		 * @description The field in each item that corresponds to the category value.
		 * @type String
		 */
		this.getAttributeConfig("categoryField",
		{
			method: this._getCategoryField
		});
   
		this.setAttributeConfig("categoryField",
		{
			validator: YAHOO.lang.isString,
			method: this._setCategoryField
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
	 * YAHOO.widget.FlashAdapter.createProxyFunction()
	 * @property _xAxisLabelFunction
	 * @type String
	 * @private
	 */
	_xAxisLabelFunction: null,
	
	/**
	 * Stores a reference to the yAxis labelFunction created by
	 * YAHOO.widget.FlashAdapter.createProxyFunction()
	 * @property _yAxisLabelFunction
	 * @type String
	 * @private
	 */
	_yAxisLabelFunction: null,
	
	destroy: function()
	{
		//remove proxy functions
		if(this._xAxisLabelFunction)
		{
			YAHOO.widget.FlashAdapter.removeProxyFunction(this._xAxisLabelFunction);
			this._xAxisLabelFunction = null;
		}
		
		if(this._yAxisLabelFunction)
		{
			YAHOO.widget.FlashAdapter.removeProxyFunction(this._yAxisLabelFunction);
			this._yAxisLabelFunction = null;
		}
	
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
		this.getAttributeConfig("xField",
		{
			method: this._getXField
		});

		this.setAttributeConfig("xField",
		{
			validator: YAHOO.lang.isString,
			method: this._setXField
		});

		/**
		 * @attribute yField
		 * @description The field in each item that corresponds to a value on the x axis.
		 * @type String
		 */
		this.getAttributeConfig("yField",
		{
			method: this._getYField
		});

		this.setAttributeConfig("yField",
		{
			validator: YAHOO.lang.isString,
			method: this._setYField
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
		 * @attribute yAxis
		 * @description A custom configuration for the vertical y axis.
		 * @type Axis
		 */
		this.setAttributeConfig("yAxis",
		{
			method: this._setYAxis
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
	 * Setter for the xAxis attribute.
	 *
	 * @method _setXAxis
	 * @private
	 */
	_setXAxis: function(value)
	{
		if(this._xAxisLabelFunction !== null)
		{
			YAHOO.widget.FlashAdapter.removeProxyFunction(this._xAxisLabelFunction);
			this._xAxisLabelFunction = null;
		}
		
		var clonedXAxis = {};
		for(var prop in value)
		{
			if(prop == "labelFunction")
			{
				if(value.labelFunction !== null)
				{
					if(typeof value.labelFunction == "function")
					{
						clonedXAxis.labelFunction = YAHOO.widget.FlashAdapter.createProxyFunction(value.labelFunction);
					}
					else
					{
						clonedXAxis.labelFunction = value.labelFunction;
					}
					this._xAxisLabelFunction = clonedXAxis.labelFunction;
				}
			}
			else
			{
				clonedXAxis[prop] = value[prop];
			}
		}
		this._swf.setHorizontalAxis(clonedXAxis);
	},

	/**
	 * Getter for the yAxis attribute.
	 *
	 * @method _setYAxis
	 * @private
	 */
	_setYAxis: function(value)
	{
		if(this._yAxisLabelFunction !== null)
		{
			YAHOO.widget.FlashAdapter.removeProxyFunction(this._yAxisLabelFunction);
			this._yAxisLabelFunction = null;
		}

		var clonedYAxis = {};
		for(var prop in value)
		{
			if(prop == "labelFunction")
			{
				if(value.labelFunction !== null)
				{
					if(typeof value.labelFunction == "function")
					{
						clonedYAxis.labelFunction = YAHOO.widget.FlashAdapter.createProxyFunction(value.labelFunction);
					}
					else
					{
						clonedYAxis.labelFunction = value.labelFunction;
					}
					this._yAxisLabelFunction = clonedYAxis.labelFunction;
				}
			}
			else
			{
				clonedYAxis[prop] = value[prop];
			}
		}
		this._swf.setVerticalAxis(clonedYAxis);
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
	roundMajorUnit: true 
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
	stackingEnabled: false
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
	 * @property calcualateCategoryCount
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
	yField: null
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

YAHOO.register("charts", YAHOO.widget.Chart, {version: "2.7.0r2", build: "1799"});
