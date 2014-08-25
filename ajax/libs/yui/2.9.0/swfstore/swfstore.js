/*
Copyright (c) 2011, Yahoo! Inc. All rights reserved.
Code licensed under the BSD License:
http://developer.yahoo.com/yui/license.html
version: 2.9.0
*/
/**
 * Provides a swf based storage implementation
 *
 * @module swfstore
 */

/**
 * Class for the YUI SWFStore util.
 *
 * @namespace YAHOO.util
 * @class SWFStore
 * @uses YAHOO.util.AttributeProvider
 * @constructor
 * @param containerId {HTMLElement} Container element for the Flash Player instance.
 * @param shareData {Boolean} Whether or not data should be shared across browsers
 * @param useCompression {Boolean} Container element for the Flash Player instance.
 */
YAHOO.util.SWFStore = function(containerID, shareData, useCompression)
{
			//browser detection
			var browser;
			var newValue;
			//convert Booleans to strings for flashvars compatibility
			shareData = shareData.toString();
			useCompression = useCompression.toString();
			
			if (YAHOO.env.ua.ie) browser = "ie";
			else if (YAHOO.env.ua.gecko) browser =  "gecko";  //Firefox
			else if (YAHOO.env.ua.webkit) browser =  "webkit"; // Safari, Webkit 
			else if (YAHOO.env.ua.caja) browser =  "caja";   
			else if (YAHOO.env.ua.opera) browser =  "opera"; 
			else browser =  "other";

			if(YAHOO.util.Cookie.get("swfstore") == null || YAHOO.util.Cookie.get("swfstore") == "null" || YAHOO.util.Cookie.get("swfstore") == "")
			{

				newValue = Math.round(Math.random() * Math.PI * 100000); 
				YAHOO.util.Cookie.set("swfstore", newValue);

			}

			else 
			{
				newValue = YAHOO.util.Cookie.get("swfstore");
			}

			
			var params = 
				{ 
					version: 9.115,
					useExpressInstall: false,
					fixedAttributes:
						{allowScriptAccess:"always", allowNetworking:"all", scale:"noScale"},
						flashVars:
							{allowedDomain : document.location.hostname, shareData: shareData, browser: newValue, useCompression: useCompression}
				 };
	
	
	
	this.embeddedSWF = new YAHOO.widget.SWF(containerID, YAHOO.util.SWFStore.SWFURL, params); 
	
	
	/**
	 * Fires when an error occurs
	 *
	 * @event error
	 * @param event.type {String} The event type
	 * @param event.message {String} The data 
	 * 
	 */
	this.createEvent("error");

	/**
	 * Fires when there is not enough space available to store the data
	 *
	 * @event quotaExceededError
	 * @param event.type {String} The event type
	 * @param event.message {String} The data 
	 * 
	 */
	this.createEvent("quotaExceededError");

	/**
	 * Fires when the url matching for the security whitelist is invalid.
     * If no whitelist is used, fires when page's url does not match the embedded swf's url
	 *
	 * @event securityError
	 * @param event.type {String} The event type
	 * @param event.message {String} The data 
	 * 
	 */
	this.createEvent("securityError");
	
	/**
	 * Fires when a store is saved successfully
	 *
	 * @event save
	 * @param event.type {String} The event type
	 * 
	 */
	this.createEvent("save");

	/**
	 * Fires when a store is successfully cleared
	 *
	 * @event clear
	 * @param event.type {String} The event type
	 * 
	 */
	this.createEvent("clear");
		
	
	/**
	 * Fires when the save is pending, due to a request for additional storage
	 *
	 * @event error
	 * @param event.type {String} The event type
	 * 
	 */
	this.createEvent("pending");
	
	
	/**
	 * Fires as the settings dialog displays
	 *
	 * @event openingDialog
	 * @param event.type {String} The event type
	 * 
	 */
	this.createEvent("openingDialog");
	
	/**
	 * Fires when a settings dialog is not able to be displayed due to 
	 * the SWF not being large enough to show it. In this case, the developer
	 * needs to resize the SWF to width of 215px and height of 138px or above, 
	 * or display an external settings page.
	 *
	 * @event inadequateDimensions
	 * @param event.type {String} The event type
	 * 
	 */
	this.createEvent("inadequateDimensions");
};

YAHOO.extend(YAHOO.util.SWFStore, YAHOO.util.AttributeProvider,
{


	
	/**
	 * Method to attach listeners to events
	 * @param type {String} The tyep of event to listen for
	 * @param listener {String} The function to call
	 */
	on: function(type, listener)
	{
		this.embeddedSWF.addListener(type, listener); 
	},

	/**
	 * Method to attach listeners to events
	 * @param type {String} The tyep of event to listen for
	 * @param listener {String} The function to call
	 */
	addListener: function(type, listener)
	{
		this.embeddedSWF.addListener(type, listener); 
	},

	/**
	 * Public accessor to the unique name of the SWFStore instance.
	 *
	 * @method toString
	 * @return {String} Unique name of the SWFStore instance.
	 */
	toString: function()
	{
		return "SWFStore " + this._id;
	},
	
	/**
	 * Public accessor to the unique name of the SWFStore instance.
	 *
	 * @method getShareData
	 * @return {Boolean} Whether or not data is being shared among browsers
	 */
	getShareData: function()
	{
		return this.embeddedSWF.callSWF("getShareData");
	},
	/**
	 * Public accessor to the unique name of the SWFStore instance.
	 *
	 * @method setShareData
	 * @param {Boolean} Whether or not to share among browsers
	 */
	setShareData: function(value)
	{
		this.embeddedSWF.callSWF("setShareData", [value]);
	},

	/**
	 * Determines if SWF's visible area is large enough to fit the settings panel
	 *
	 * @method hasAdequateDimensions
	 * @return {Boolean} Whether or not to share among browsers
	 */
	hasAdequateDimensions: function()
	{
		return this.embeddedSWF.callSWF("hasAdequateDimensions");
	},

	/**
	 * Public accessor to the unique name of the SWFStore instance.
	 *
	 * @method getUseCompression
	 * @return {Boolean} Whether or compression is being used
	 */
	getUseCompression: function()
	{
		return this.embeddedSWF.callSWF("getUseCompression");
	},

	/**
	 * Public accessor to the unique name of the SWFStore instance.
	 *
	 * @method setUseCompression
	 * @param {Boolean} Whether or to compress stored data
	 */
	setUseCompression: function(value)
	{
		this.embeddedSWF.callSWF("setUseCompression", [value]);
	},	

	   /**
	    * Saves data to local storage. It returns a String that can
		* be one of three values: "true" if the storage succeeded; "false" if the user
		* has denied storage on their machine or storage space allotted is not sufficient.
		* <p>The size limit for the passed parameters is ~40Kb.</p>
		* @method setItem
	    * @param data {Object} The data to store
	    * @param location {String} The name of the "cookie" or store 
		* @return {Boolean} Whether or not the save was successful
	    * 
	    */
		setItem: function(location,data) 
		{	
			if(typeof data == "string")
			{
				//double encode strings to prevent parsing error
				//http://yuilibrary.com/projects/yui2/ticket/2528593
				data = data.replace(/\\/g, '\\\\');
			}
			
			return this.embeddedSWF.callSWF("setItem", [location, data]);
		} ,
	    	
	   /**
	    * Returns the value of the store at the specified index, if any.
		* @method getValueAt
	    * @param index {Number} The index of the stored item
	    * @return {Object} The value of the store at that index
	    * 
	    */	    
		getValueAt: function(index) 
		{
			return this.embeddedSWF.callSWF("getValueAt", [index]);
		},

	   /**
	    * Returns the key name in storage, if any, at the specified index.
	    * 
	    * @param index {Number} The index of the "cookie" or store
		* @return {Object}The data
		* @method setItem
	    * 
	    */	    
		getNameAt: function(index) 
		{
			return this.embeddedSWF.callSWF("getNameAt", [index]);
		},
		
		
	    /**
	    * Returns the value of the item in storage, if any.
	    * @method getValueOf
	    * @param location {String} The name of the "cookie" or store
		* @return {Object} The data
	    * 
	    */
		getValueOf: function(location) 
		{
			return this.embeddedSWF.callSWF("getValueOf", [location]);
		} ,

	    /**
	    *  Returns the data type of of the storage.
		* <p>May be one of the following types:
	    * <ul>
	    * <li>boolean</li>
	    * <li>function</li>
	    * <li>number</li>
	    * <li>object</li>
	    * <li>string</li>
	    * <li>number</li>
	    * <li>xml</li>
	    * </ul>
	    * </p>
	    * @method getTypeOf
	    * @param location {String} The name of the "cookie" or store
		* @return {String} The type
	    * 
	    */
		getTypeOf: function(location) 
		{
			return this.embeddedSWF.callSWF("getTypeOf", [location]);
		} ,

	    /**
	    *  Returns the data type of of the storage.
		* <p>May be one of the following types:
	    * <ul>
	    * <li>boolean</li>
	    * <li>function</li>
	    * <li>number</li>
	    * <li>object</li>
	    * <li>string</li>
	    * <li>number</li>
	    * <li>xml</li>
	    * </ul>
	    * </p>
	    * @method getTypeAt
	    * @param location {Number} The index of the "cookie" or store
		* @return {String} The type
	    * 
	    */
		getTypeAt: function(index) 
		{
			return this.embeddedSWF.callSWF("getTypeAt", [index]);
		} ,
		 
		/**
		 * Returns the items in storage as an array.
		 * @method getItems
		 * @return {Object} The data.
		 * @public
		 */
		getItems: function() 
		{
			return this.embeddedSWF.callSWF("getItems", []);
		},

	    /**
	    * Removes the item in storage, if any.
	    * @method removeItem
	    * @param location {String} The name of the "cookie" or store
	    * 
	    */
		removeItem: function(location) 
		{
			return this.embeddedSWF.callSWF("removeItem", [location]);
		} ,

	    /**
	    * Removes the item in storage at the specified index, if any.
	    * @method removeItem
	    * @param index {Number} The index of the "cookie" or store
	    * 
	    */
		removeItemAt: function(index) 
		{
			return this.embeddedSWF.callSWF("removeItemAt", [index]);
		} ,
		
	    /**
	    * Returns the number of items in storage, if any.
	    * @method getLength
	    * @return {Number} The number of items
	    * 
	    */
		getLength: function() 
		{
			return this.embeddedSWF.callSWF("getLength", []);
		} ,
		
	   /**
	    * Removes all data in local storage for this domain.
	    * <p>Be careful when using this method, as it may 
	    * remove stored information that is used by other applications
	    * in this domain </p>
	    * @method clear
	    */		
		clear: function() 
		{
			return this.embeddedSWF.callSWF("clear", []);
		} ,
		
	    /**
	     * Gets the current size, in KB, of the amount of space taken by the current store.
		 * Note that this is calculated, and may take time depending on the number of items stored
	     * @method calculateCurrentSize
	     * @return {Number} The size of the store in KB
	     */		
		calculateCurrentSize: function() 
		{
			return this.embeddedSWF.callSWF("calculateCurrentSize", []);
		} ,
		
	    /**
	     * Gets the timestamp of the last store. This value is automatically set when 
	     * data is stored.
	     * @method getModificationDate
	     * @return {Date} A Date object
	     */
		getModificationDate: function() 
		{
			return this.embeddedSWF.callSWF("getModificationDate", []);
		} ,
		
		/**
		* This method requests more storage (if the amount is above 100KB or the current setting).
		* 
		* The request dialog has to be displayed within the Flash player itself
		* so the SWF it is called from must be visible and at least 215px x 138px (w x h) in size.
		* 
		* @method setSize
		* @param value {Number} The size, in KB
		* @return {String} 
		*/		
		setSize: function(value) 
		{
			var result = this.embeddedSWF.callSWF("setSize", [value]);
			return result;
		} ,
		
		/**
		 * Displays the settings dialog to allow the user to configure
		 * storage settings manually. If the SWF height and width are smaller than
		 * what is allowable to display the local settings panel,
		 * an openExternalDialog message will be sent to JavaScript.
		 * @method displaySettings
		 */		
		displaySettings: function() 
		{
			this.embeddedSWF.callSWF("displaySettings", []);
		} 

});


YAHOO.util.SWFStore.SWFURL = "swfstore.swf";
YAHOO.register("swfstore", YAHOO.util.SWFStore, {version: "2.9.0", build: "2800"});
