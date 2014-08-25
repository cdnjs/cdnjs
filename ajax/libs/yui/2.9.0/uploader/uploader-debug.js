/*
Copyright (c) 2011, Yahoo! Inc. All rights reserved.
Code licensed under the BSD License:
http://developer.yahoo.com/yui/license.html
version: 2.9.0
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
				variablePairs[variablePairs.length] = YAHOO.lang.escapeHTML(key || '') +"="+ YAHOO.lang.escapeHTML(encodeURIComponent(variables[key]  || ''));
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
			swfNode = '<embed type="application/x-shockwave-flash" src="'+ YAHOO.lang.escapeHTML(this.getAttribute('swf') || '') +'" width="'+ YAHOO.lang.escapeHTML(this.getAttribute('width') || '') +'" height="'+ YAHOO.lang.escapeHTML(this.getAttribute('height') || '') +'" style="'+ YAHOO.lang.escapeHTML(this.getAttribute('style') || '') +'"';
			swfNode += ' id="'+ YAHOO.lang.escapeHTML(this.getAttribute('id') || '') +'" name="'+ YAHOO.lang.escapeHTML(this.getAttribute('id') || '') +'" ';
			params = this.getParams();
			for(key in params)
			{
				if(params.hasOwnProperty(key))
				{
					swfNode += YAHOO.lang.escapeHTML(key || '') +'="'+ YAHOO.lang.escapeHTML(params[key] || '') +'" ';
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
			swfNode = '<object id="'+ YAHOO.lang.escapeHTML(this.getAttribute('id') || '') +'" classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" width="'+ YAHOO.lang.escapeHTML(this.getAttribute('width') || '') +'" height="'+ YAHOO.lang.escapeHTML(this.getAttribute('height') || '') +'" style="'+ YAHOO.lang.escapeHTML(this.getAttribute('style') || '') +'">';
			swfNode += '<param name="movie" value="'+ YAHOO.lang.escapeHTML(this.getAttribute('swf') || '') +'" />';
			params = this.getParams();
			for(key in params)
			{
				if(params.hasOwnProperty(key))
				{
					swfNode += '<param name="'+ YAHOO.lang.escapeHTML(key || '') +'" value="'+ YAHOO.lang.escapeHTML(params[key] || '') +'" />';
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
YAHOO.widget.FlashAdapter = function(swfURL, containerID, attributes, buttonSkin)
{
	
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
		attributes.backgroundColor, attributes.expressInstall, attributes.wmode, buttonSkin);
	
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

YAHOO.widget.FlashAdapter.owners = YAHOO.widget.FlashAdapter.owners || {};

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
		
		YAHOO.log("FlashAdapter instance destroyed: " + instanceName);
	},

	/**
	 * Embeds the SWF in the page and associates it with this instance.
	 *
	 * @method _embedSWF
	 * @private
	 */
	_embedSWF: function(swfURL, containerID, swfID, version, backgroundColor, expressInstall, wmode, buttonSkin)
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
		
		swfObj.addParam("menu", "false");
		
		//again, a useful ExternalInterface trick
		swfObj.addVariable("allowedDomain", document.location.hostname);

		//tell the SWF which HTML element it is in
		swfObj.addVariable("YUISwfId", swfID);

		// set the name of the function to call when the swf has an event
		swfObj.addVariable("YUIBridgeCallback", "YAHOO.widget.FlashAdapter.eventHandler");
		if (buttonSkin) {
		swfObj.addVariable("buttonSkin", buttonSkin);
		}
		var container = YAHOO.util.Dom.get(containerID);
		var result = swfObj.write(container);
		if(result)
		{
			this._swf = YAHOO.util.Dom.get(swfID);
			YAHOO.widget.FlashAdapter.owners[swfID] = this;
		}
		else
		{
			YAHOO.log("Unable to load SWF " + swfURL);
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
				return;
			case "log":
				YAHOO.log(event.message, event.category, this.toString());
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
		this.fireEvent("contentReady");
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

	if(!YAHOO.widget.FlashAdapter.owners[elementID])
	{
		//fix for ie: if owner doesn't exist yet, try again in a moment
		setTimeout(function() { YAHOO.widget.FlashAdapter.eventHandler( elementID, event ); }, 0);
	}
	else
	{
		YAHOO.widget.FlashAdapter.owners[elementID]._eventHandler(event);
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
 * The YUI Uploader Control
 * @module uploader
 * @description <p>YUI Uploader provides file upload functionality that goes beyond the basic browser-based methods. 
 * Specifically, the YUI Uploader allows for:
 * <ol>
 * <li> Multiple file selection in a single "Open File" dialog.</li>
 * <li> File extension filters to facilitate the user's selection.</li>
 * <li> Progress tracking for file uploads.</li>
 * <li> A range of file metadata: filename, size, date created, date modified, and author.</li>
 * <li> A set of events dispatched on various aspects of the file upload process: file selection, upload progress, upload completion, etc.</li>
 * <li> Inclusion of additional data in the file upload POST request.</li>
 * <li> Faster file upload on broadband connections due to the modified SEND buffer size.</li>
 * <li> Same-page server response upon completion of the file upload.</li>
 * </ol>
 * </p>
 * @title Uploader
 * @namespace YAHOO.widget
 * @requires yahoo, dom, element, event
 */
/**
 * Uploader class for the YUI Uploader component.
 *
 * @namespace YAHOO.widget
 * @class Uploader
 * @uses YAHOO.widget.FlashAdapter
 * @constructor
 * @param containerId {HTMLElement} Container element for the Flash Player instance.
 * @param buttonSkin {String} [optional]. If defined, the uploader is 
 * rendered as a button. This parameter must provide the URL of a button
 * skin sprite image. Acceptable types are: jpg, gif, png and swf. The 
 * sprite is divided evenly into four sections along its height (e.g., if
 * the sprite is 200 px tall, it's divided into four sections 50px each).
 * Each section is used as a skin for a specific state of the button: top
 * section is "up", second section is "over", third section is "down", and
 * fourth section is "disabled". 
 * If the parameter is not supplied, the uploader is rendered transparent,
 * and it's the developer's responsibility to create a visible UI below it.
 * @param forceTransparent {Boolean} This parameter, if true, forces the Flash
 * UI to be rendered with wmode set to "transparent". This behavior is useful 
 * in conjunction with non-rectangular button skins with PNG transparency. 
 * The parameter is false by default, and ignored if no buttonSkin is defined.
  */
YAHOO.widget.Uploader = function(containerId, buttonSkin, forceTransparent)
{
	var newWMode = "window";

	if (!(buttonSkin) || (buttonSkin && forceTransparent)) {
		newWMode = "transparent";
	}

	
 	YAHOO.widget.Uploader.superclass.constructor.call(this, YAHOO.widget.Uploader.SWFURL, containerId, {wmode:newWMode}, buttonSkin);

	/**
	 * Fires when the mouse is pressed over the Uploader.
	 * Only fires when the Uploader UI is enabled and
	 * the render type is 'transparent'.
	 *
	 * @event mouseDown
	 * @param event.type {String} The event type
	 */
	this.createEvent("mouseDown");
	
	/**
	 * Fires when the mouse is released over the Uploader.
	 * Only fires when the Uploader UI is enabled and
	 * the render type is 'transparent'.
	 *
	 * @event mouseUp
	 * @param event.type {String} The event type
	 */
	this.createEvent("mouseUp");

	/**
	 * Fires when the mouse rolls over the Uploader.
	 *
	 * @event rollOver
	 * @param event.type {String} The event type
	 */
	this.createEvent("rollOver");
	
	/**
	 * Fires when the mouse rolls out of the Uploader.
	 *
	 * @event rollOut
	 * @param event.type {String} The event type
	 */
	this.createEvent("rollOut");
	
	/**
	 * Fires when the uploader is clicked.
	 *
	 * @event click
	 * @param event.type {String} The event type
	 */
	this.createEvent("click");
	
	/**
	 * Fires when the user has finished selecting files in the "Open File" dialog.
	 *
	 * @event fileSelect
	 * @param event.type {String} The event type
	 * @param event.fileList {Object} A dictionary of objects with file information
	 * @param event.fileList[].size {Number} File size in bytes for a specific file in fileList
	 * @param event.fileList[].cDate {Date} Creation date for a specific file in fileList
	 * @param event.fileList[].mDate {Date} Modification date for a specific file in fileList
	 * @param event.fileList[].name {String} File name for a specific file in fileList
	 * @param event.fileList[].id {String} Unique file id of a specific file in fileList
	 */
	this.createEvent("fileSelect");

	/**
	 * Fires when an upload of a specific file has started.
	 *
	 * @event uploadStart
	 * @param event.type {String} The event type
	 * @param event.id {String} The id of the file that's started to upload
	 */
	this.createEvent("uploadStart");

	/**
	 * Fires when new information about the upload progress for a specific file is available.
	 *
	 * @event uploadProgress
	 * @param event.type {String} The event type
	 * @param event.id {String} The id of the file with which the upload progress data is associated
	 * @param bytesLoaded {Number} The number of bytes of the file uploaded so far
	 * @param bytesTotal {Number} The total size of the file
	 */
	this.createEvent("uploadProgress");
	
	/**
	 * Fires when an upload for a specific file is cancelled.
	 *
	 * @event uploadCancel
	 * @param event.type {String} The event type
	 * @param event.id {String} The id of the file with which the upload has been cancelled.
	 */	
	this.createEvent("uploadCancel");

	/**
	 * Fires when an upload for a specific file is complete.
	 *
	 * @event uploadComplete
	 * @param event.type {String} The event type
	 * @param event.id {String} The id of the file for which the upload has been completed.
	 */	
	this.createEvent("uploadComplete");

	/**
	 * Fires when the server sends data in response to a completed upload.
	 *
	 * @event uploadCompleteData
	 * @param event.type {String} The event type
	 * @param event.id {String} The id of the file for which the upload has been completed.
	 * @param event.data {String} The raw data returned by the server in response to the upload.
	 */	
	this.createEvent("uploadCompleteData");
	
	/**
	 * Fires when an upload error occurs.
	 *
	 * @event uploadError
	 * @param event.type {String} The event type
	 * @param event.id {String} The id of the file that was being uploaded when the error has occurred.
	 * @param event.status {String} The status message associated with the error.
	 */	
	this.createEvent("uploadError");
}

/**
 * Location of the Uploader SWF
 *
 * @property Chart.SWFURL
 * @private
 * @static
 * @final
 * @default "assets/uploader.swf"
 */
YAHOO.widget.Uploader.SWFURL = "assets/uploader.swf";

YAHOO.extend(YAHOO.widget.Uploader, YAHOO.widget.FlashAdapter,
{	
/**
 * Starts the upload of the file specified by fileID to the location specified by uploadScriptPath.
 *
 * @param fileID {String} The id of the file to start uploading.
 * @param uploadScriptPath {String} The URL of the upload location.
 * @param method {String} Either "GET" or "POST", specifying how the variables accompanying the file upload POST request should be submitted. "GET" by default.
 * @param vars {Object} The object containing variables to be sent in the same request as the file upload.
 * @param fieldName {String} The name of the variable in the POST request containing the file data. "Filedata" by default.
 * </code> 
 */
	upload: function(fileID, uploadScriptPath, method, vars, fieldName)
	{
		this._swf.upload(fileID, uploadScriptPath, method, vars, fieldName);
	},
	
/**
 * Starts the upload of the files specified by fileIDs, or adds them to a currently running queue. The upload queue is automatically managed.
 *
 * @param fileIDs {Array} The ids of the files to start uploading.
 * @param uploadScriptPath {String} The URL of the upload location.
 * @param method {String} Either "GET" or "POST", specifying how the variables accompanying the file upload POST request should be submitted. "GET" by default.
 * @param vars {Object} The object containing variables to be sent in the same request as the file upload.
 * @param fieldName {String} The name of the variable in the POST request containing the file data. "Filedata" by default.
 * </code> 
 */
	uploadThese: function(fileIDs, uploadScriptPath, method, vars, fieldName)
	{
		this._swf.uploadThese(fileIDs, uploadScriptPath, method, vars, fieldName);
	},
	
/**
 * Starts uploading all files in the queue. If this function is called, the upload queue is automatically managed.
 *
 * @param uploadScriptPath {String} The URL of the upload location.
 * @param method {String} Either "GET" or "POST", specifying how the variables accompanying the file upload POST request should be submitted. "GET" by default.
 * @param vars {Object} The object containing variables to be sent in the same request as the file upload.
 * @param fieldName {String} The name of the variable in the POST request containing the file data. "Filedata" by default.
 * </code> 
 */
	uploadAll: function(uploadScriptPath, method, vars, fieldName)
	{
		this._swf.uploadAll(uploadScriptPath, method, vars, fieldName);
	},

/**
 * Cancels the upload of a specified file. If no file id is specified, all ongoing uploads are cancelled.
 *
 * @param fileID {String} The ID of the file whose upload should be cancelled.
 */
	cancel: function(fileID)
	{
		this._swf.cancel(fileID);
	},

/**
 * Clears the list of files queued for upload.
 *
 */
	clearFileList: function()
	{
		this._swf.clearFileList();
	},
	
/**
 * Removes the specified file from the upload queue. 
 *
 * @param fileID {String} The id of the file to remove from the upload queue. 
 */
	removeFile: function (fileID) 
	{
		this._swf.removeFile(fileID);
	},

/**
 * Turns the logging functionality on.
 * Uses Flash internal trace logging, as well as YUI Logger, if available.
 *
 * @param allowLogging {Boolean} If true, logs are output; otherwise, no logs are produced.
 */
    setAllowLogging: function (allowLogging)
    {
      	this._swf.setAllowLogging(allowLogging);
    },

/**
 * Sets the number of simultaneous uploads when using uploadAll()
 * The minimum value is 1, and maximum value is 5. The default value is 2.
 *
 * @param simUploadLimit {int} Number of simultaneous uploads, between 1 and 5.
 */
    setSimUploadLimit : function (simUploadLimit)
    {
       this._swf.setSimUploadLimit(simUploadLimit);
    },

/**
 * Sets the flag allowing users to select multiple files for the upload.
 *
 * @param allowMultipleFiles {Boolean} If true, multiple files can be selected. False by default.
 */     
    setAllowMultipleFiles : function (allowMultipleFiles) 
    {
       this._swf.setAllowMultipleFiles(allowMultipleFiles);
    },

/**
 * Sets the file filters for the "Browse" dialog.
 *
 *  @param newFilterArray An array of sets of key-value pairs of the form
 *  {extensions: extensionString, description: descriptionString, [optional]macType: macTypeString}
 *  The extensions string is a semicolon-delimited list of elements of the form "*.xxx", 
 *  e.g. "*.jpg;*.gif;*.png". 
 */       
    setFileFilters : function (fileFilters) 
    {
       this._swf.setFileFilters(fileFilters);
    },

	/**
	 * Enables the mouse events on the Uploader.
	 * If the uploader is being rendered as a button,
	 * then the button's skin is set to "up"
	 * (first section of the button skin sprite).
	 *
	 */
	enable : function ()
	{
		this._swf.enable();
	},

	/**
	 * Disables the mouse events on the Uploader.
	 * If the uploader is being rendered as a button,
	 * then the button's skin is set to "disabled"
	 * (fourth section of the button skin sprite).
	 *
	 */
	disable : function () 
	{
		this._swf.disable();
	}
});
YAHOO.register("uploader", YAHOO.widget.Uploader, {version: "2.9.0", build: "2800"});
