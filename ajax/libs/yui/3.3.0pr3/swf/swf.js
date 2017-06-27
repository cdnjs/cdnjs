YUI.add('swf', function(Y) {

/**
 * Embed a Flash applications in a standard manner and communicate with it
 * via External Interface.
 * @module swf
 */
	
	var Event = Y.Event,
        SWFDetect = Y.SWFDetect,
        Lang = Y.Lang,
        uA = Y.UA,
        Node = Y.Node,

		// private
		FLASH_CID = "clsid:d27cdb6e-ae6d-11cf-96b8-444553540000",
		FLASH_TYPE = "application/x-shockwave-flash",
		FLASH_VER = "10.0.22",
		EXPRESS_INSTALL_URL = "http://fpdownload.macromedia.com/pub/flashplayer/update/current/swf/autoUpdater.swf?" + Math.random(),
		EVENT_HANDLER = "SWF.eventHandler",
		possibleAttributes = {align:"", allowFullScreen:"", allowNetworking:"", allowScriptAccess:"", base:"", bgcolor:"", menu:"", name:"", quality:"", salign:"", scale:"", tabindex:"", wmode:""};
		
		/**
		 * The SWF utility is a tool for embedding Flash applications in HTML pages.
		 * @module swf
		 * @title SWF Utility
		 * @requires event-custom, node, swfdetect
		 */

		/**
		 * Creates the SWF instance and keeps the configuration data
		 *
		 * @class SWF
		 * @augments Y.Event.Target
		 * @constructor
		 * @param {String|HTMLElement} id The id of the element, or the element itself that the SWF will be inserted into.  
		 *        The width and height of the SWF will be set to the width and height of this container element.
		 * @param {String} swfURL The URL of the SWF to be embedded into the page.
		 * @param {Object} p_oAttributes (optional) Configuration parameters for the Flash application and values for Flashvars
		 *        to be passed to the SWF. The p_oAttributes object allows the following additional properties:
		 *        <dl>
         *          <dt>version : String</dt>
         *          <dd>The minimum version of Flash required on the user's machine.</dd>
         *          <dt>fixedAttributes : Object</dt>
         *          <dd>An object literal containing one or more of the following String keys and their values: <code>align, 
         *              allowFullScreen, allowNetworking, allowScriptAccess, base, bgcolor, menu, name, quality, salign, scale,
         *              tabindex, wmode.</code> event from the thumb</dd>
         *        </dl>
		 */
				
function SWF (p_oElement /*:String*/, swfURL /*:String*/, p_oAttributes /*:Object*/ ) {
	
	this._id = Y.guid("yuiswf");
	
	
	var _id = this._id;
    var oElement = Node.one(p_oElement);
	
	var flashVersion = p_oAttributes["version"] || FLASH_VER;
    var flashVersionSplit = (flashVersion + '').split(".");
	var isFlashVersionRight = SWFDetect.isFlashVersionAtLeast(parseInt(flashVersionSplit[0]), parseInt(flashVersionSplit[1]), parseInt(flashVersionSplit[2]));
	var canExpressInstall = (SWFDetect.isFlashVersionAtLeast(8,0,0));
	var shouldExpressInstall = canExpressInstall && !isFlashVersionRight && p_oAttributes["useExpressInstall"];
	var flashURL = (shouldExpressInstall)?EXPRESS_INSTALL_URL:swfURL;
	var objstring = '<object ';
	var w, h;
	var flashvarstring = "yId=" + Y.id + "&YUISwfId=" + _id + "&YUIBridgeCallback=" + EVENT_HANDLER + "&allowedDomain=" + document.location.hostname;
	
	Y.SWF._instances[_id] = this;
    if (oElement && (isFlashVersionRight || shouldExpressInstall) && flashURL) {
				objstring += 'id="' + _id + '" '; 
				if (uA.ie) {
					objstring += 'classid="' + FLASH_CID + '" ';
				}
				else {
					objstring += 'type="' + FLASH_TYPE + '" data="' + flashURL + '" ';
				}
				
                w = "100%";
				h = "100%";
				
				objstring += 'width="' + w + '" height="' + h + '">';
				
				if (uA.ie) {
					objstring += '<param name="movie" value="' + flashURL + '"/>';
				}
				
				for (var attribute in p_oAttributes.fixedAttributes) {
					if (possibleAttributes.hasOwnProperty(attribute)) {
						objstring += '<param name="' + attribute + '" value="' + p_oAttributes.fixedAttributes[attribute] + '"/>';
					}
				}

				for (var flashvar in p_oAttributes.flashVars) {
					var fvar = p_oAttributes.flashVars[flashvar];
					if (Lang.isString(fvar)) {
						flashvarstring += "&" + flashvar + "=" + encodeURIComponent(fvar);
					}
				}
				
				if (flashvarstring) {
					objstring += '<param name="flashVars" value="' + flashvarstring + '"/>';
				}
				
				objstring += "</object>"; 
				oElement.setContent(objstring);
			
				this._swf = Node.one("#" + _id);
			}
	/**
	* Fired when the Flash player version on the user's machine is below the required value.
	*
	* @event wrongflashversion
    */
	else {
		    var event = {};
		    event.type = "wrongflashversion";
			this.publish("wrongflashversion", {fireOnce:true});
	     	this.fire("wrongflashversion", event);
		}		
};

/**
 * @private
 * The static collection of all instances of the SWFs on the page.
 * @property _instances
 * @type Object
 */

SWF._instances = SWF._instances || {};

/**
 * @private
 * Handles an event coming from within the SWF and delegate it
 * to a specific instance of SWF.
 * @method eventHandler
 * @param swfid {String} the id of the SWF dispatching the event
 * @param event {Object} the event being transmitted.
 */
SWF.eventHandler = function (swfid, event) {
	SWF._instances[swfid]._eventHandler(event);
};

SWF.prototype = 
{
	/**
	 * @private
	 * Propagates a specific event from Flash to JS.
	 * @method _eventHandler
	 * @param event {Object} The event to be propagated from Flash.
	 */
	
	_eventHandler: function(event)
	{
		if (event.type === "swfReady") 
		{
			this.publish("swfReady", {fireOnce:true});
	     	this.fire("swfReady", event);
        }
		else if(event.type === "log")
		{
		}
        else
		{
			this.fire(event.type, event);
        } 
	},
		
	/**
	 * Calls a specific function exposed by the SWF's
	 * ExternalInterface.
	 * @method callSWF
	 * @param func {String} the name of the function to call
	 * @param args {Object} the set of arguments to pass to the function.
	 */
	
	callSWF: function (func, args)
	{
		if (!args) { 
			  args= []; 
		};	
		if (this._swf._node[func]) {
		return(this._swf._node[func].apply(this._swf._node, args));
	    } else {
		return null;
	    }
	},
	
	/**
	 * Public accessor to the unique name of the SWF instance.
	 *
	 * @method toString
	 * @return {String} Unique name of the SWF instance.
	 */
	toString: function()
	{
		return "SWF " + this._id;
	}
};

Y.augment(SWF, Y.EventTarget);

Y.SWF = SWF;


}, '@VERSION@' );
