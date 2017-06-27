/*
Copyright (c) 2011, Yahoo! Inc. All rights reserved.
Code licensed under the BSD License:
http://developer.yahoo.com/yui/license.html
version: 2.9.0
*/
/**
 * The ImageLoader Utility is a framework to dynamically load images according to certain triggers,
 * enabling faster load times and a more responsive UI.
 *
 * @module imageloader
 * @namespace YAHOO.util.ImageLoader
 * @requires yahoo, dom, event
 */

if (typeof(YAHOO.util.ImageLoader) == 'undefined') {
	YAHOO.util.ImageLoader = {};
}

/**
 * A group for images. A group can have one time limit and a series of triggers. Thus the images belonging to this group must share these constraints.
 * @class YAHOO.util.ImageLoader.group
 * @requires YAHOO.util.Dom
 * @requires YAHOO.util.Event
 * @constructor
 * @param {String|HTMLElement}	trigEl	The HTML element id or reference to assign the trigger event to. Can be null for no trigger
 * @param {String}	trigAct The type of event to assign to trigEl. Can be null for no trigger
 * @param {Number}	timeout	Timeout (time limit) length, in seconds. Can be undefined, or <= 0, for no time limit
 */
YAHOO.util.ImageLoader.group = function(trigEl, trigAct, timeout) {
	/**
	 * Name for the group. Only used to identify the group in logging statements
	 * @property name
	 * @type String
	 */
	this.name = 'unnamed';
	
	/**
	 * Collection of images registered with this group
	 * @property _imgObjs
	 * @private
	 * @type Object
	 */
	this._imgObjs = {};
	
	/**
	 * Timeout (time limit) length, in seconds
	 * @property timeoutLen
	 * @type Number
	 */
	this.timeoutLen = timeout;
	
	/**
	 * Timeout object to keep a handle on the time limit
	 * @property _timeout
	 * @private
	 * @type Object
	 */
	this._timeout = null;
	
	/**
	 * Collection of triggers for this group.
	 * Keeps track of each trigger's element, event, and event-listener-callback "fetch" function
	 * @property _triggers
	 * @private
	 * @type Array
	 */
	this._triggers = [];

	/**
	 * Collection of custom-event triggers for this group.
	 * Keeps track of each trigger's event object and event-listener-callback "fetch" function
	 * @property _customTriggers
	 * @private
	 * @type Array
	 */
	this._customTriggers = [];

	/**
	 * Flag to check if images are above the fold. If foldConditional is true, the group will check each of its image locations at page load. If any part of the image is within the client viewport, the image is displayed immediately
	 * @property foldConditional
	 * @type Boolean
	 */
	this.foldConditional = false;

	/**
	 * Class name that will identify images belonging to the group. This class name will be removed from each element in order to fetch images.
	 * This class should have, in its CSS style definition, "background:none !important;"
	 * @property className
	 * @type String
	 */
	this.className = null;

	/**
	 * HTML elements having the class name that is associated with this group
	 * Elements are stored during the _foldCheck function and reused later during the fetch function. Gives a slight performance improvement when className and foldConditional are both used
	 * @property _classImageEls
	 * @private
	 * @type Array
	 */
	this._classImageEls = null;

	// add a listener to set the time limit on DOM ready
	// if DOM is already ready, do so immediately
	if (YAHOO.util.Event.DOMReady) {
		this._onloadTasks();
	}
	else {
		YAHOO.util.Event.onDOMReady(this._onloadTasks, this, true);
	}

	// add the trigger
	this.addTrigger(trigEl, trigAct);

};

/**
 * Adds a trigger to the group. Call this with the same style as YAHOO.util.Event.addListener
 * @method addTrigger
 * @param {String|HTMLElement} trigEl  The HTML element id or reference to assign the trigger event to
 * @param {String} trigAct The type of event to assign to trigEl
 */
YAHOO.util.ImageLoader.group.prototype.addTrigger = function(trigEl, trigAct) {
	if (! trigEl || ! trigAct) {
		return;
	}
	/* Need to wrap the fetch function. Event Util can't distinguish prototyped functions of different instantiations
	 *   Leads to this scenario: groupA and groupZ both have window-scroll triggers. groupZ also has a 2-sec timeout (groupA has no timeout).
	 *   groupZ's timeout fires; we remove the triggers. The removeListener call finds the first window-scroll event with Y.u.IL.p.fetch, which is groupA's. 
	 *   groupA's trigger is removed and never fires, leaving images unfetched
	 */
	var wrappedFetch = function() {
		this.fetch();
	};
	this._triggers.push([trigEl, trigAct, wrappedFetch]);
	YAHOO.util.Event.addListener(trigEl, trigAct, wrappedFetch, this, true);
};

/**
 * Adds a custom event trigger to the group.
 * @method addCustomTrigger
 * @param {Object} event A YAHOO.util.CustomEvent object
 */
YAHOO.util.ImageLoader.group.prototype.addCustomTrigger = function(event) {
	// make sure we're dealing with a CustomEvent object
	if (! event || ! event instanceof YAHOO.util.CustomEvent) {
		return;
	}

	// see comment in addTrigger()
	var wrappedFetch = function() {
		this.fetch();
	};
	this._customTriggers.push([event, wrappedFetch]);
	event.subscribe(wrappedFetch, this, true);
};

/**
 * Setup to do in the window's onload
 * Initiates time limit for group; executes the fold check for the images
 * @method _onloadTasks
 * @private
 */
YAHOO.util.ImageLoader.group.prototype._onloadTasks = function() {
	if (this.timeoutLen && typeof(this.timeoutLen) == 'number' && this.timeoutLen > 0) {
		this._timeout = setTimeout(this._getFetchTimeout(), this.timeoutLen * 1000);
	}

	if (this.foldConditional) {
		this._foldCheck();
	}
};

/**
 * Returns the group's fetch method, with the proper closure, for use with setTimeout
 * @method _getFetchTimeout
 * @return {Function}  group's fetch method
 * @private
 */
YAHOO.util.ImageLoader.group.prototype._getFetchTimeout = function() {
	var self = this;
	return function() { self.fetch(); };
};

/**
 * Registers a background image with the group
 * @method registerBgImage
 * @param {String}	domId	HTML DOM id of the image element
 * @param {String}	url	URL for the image
 * @return {Object}	bgImgObj that was registered, for modifying any attributes in the object
 */
YAHOO.util.ImageLoader.group.prototype.registerBgImage = function(domId, url) {
	this._imgObjs[domId] = new YAHOO.util.ImageLoader.bgImgObj(domId, url);
	return this._imgObjs[domId];
};
/**
 * Registers a src image with the group
 * @method registerSrcImage
 * @param {String}	domId	HTML DOM id of the image element
 * @param {String}	url	URL for the image
 * @param {Int}	width	pixel width of the image - defaults to image's natural size
 * @param {Int}	height	pixel height of the image - defaults to image's natural size
 * @return {Object}	srcImgObj that was registered, for modifying any attributes in the object
 */
YAHOO.util.ImageLoader.group.prototype.registerSrcImage = function(domId, url, width, height) {
	this._imgObjs[domId] = new YAHOO.util.ImageLoader.srcImgObj(domId, url, width, height);
	return this._imgObjs[domId];
};
/**
 * Registers an alpha-channel-type png background image with the group
 * @method registerPngBgImage
 * @param {String}	domId	HTML DOM id of the image element
 * @param {String}	url	URL for the image
 * @param {Object}  ailProps The AlphaImageLoader properties to be set for the image
 *                    Valid properties are 'sizingMethod' and 'enabled'
 * @return {Object}	pngBgImgObj that was registered, for modifying any attributes in the object
 */
YAHOO.util.ImageLoader.group.prototype.registerPngBgImage = function(domId, url, ailProps) {
	this._imgObjs[domId] = new YAHOO.util.ImageLoader.pngBgImgObj(domId, url, ailProps);
	return this._imgObjs[domId];
};

/**
 * Displays the images in the group
 * @method fetch
 */
YAHOO.util.ImageLoader.group.prototype.fetch = function() {

	var i, len, id;

	clearTimeout(this._timeout);
	// remove all listeners
	for (i=0, len = this._triggers.length; i < len; i++) {
		YAHOO.util.Event.removeListener(this._triggers[i][0], this._triggers[i][1], this._triggers[i][2]);
	}
	// remove custom event subscriptions
	for (i=0, len = this._customTriggers.length; i < len; i++) {
		this._customTriggers[i][0].unsubscribe(this._customTriggers[i][1], this);
	}

	// fetch whatever we need to by className
	this._fetchByClass();

	// fetch registered images
	for (id in this._imgObjs) {
		if (YAHOO.lang.hasOwnProperty(this._imgObjs, id)) {
			this._imgObjs[id].fetch();
		}
	}
};

/**
 * Checks the position of each image in the group. If any part of the image is within the client viewport, shows the image immediately.
 * @method _foldCheck
 * @private
 */
YAHOO.util.ImageLoader.group.prototype._foldCheck = function() {
	var scrollTop = (document.compatMode != 'CSS1Compat') ? document.body.scrollTop : document.documentElement.scrollTop,
	    viewHeight = YAHOO.util.Dom.getViewportHeight(),
	    hLimit = scrollTop + viewHeight,
	    scrollLeft = (document.compatMode != 'CSS1Compat') ? document.body.scrollLeft : document.documentElement.scrollLeft,
	    viewWidth = YAHOO.util.Dom.getViewportWidth(),
	    wLimit = scrollLeft + viewWidth,
			id, elPos, i, len;
	for (id in this._imgObjs) {
		if (YAHOO.lang.hasOwnProperty(this._imgObjs, id)) {
			elPos = YAHOO.util.Dom.getXY(this._imgObjs[id].domId);
			if (elPos[1] < hLimit && elPos[0] < wLimit) {
				this._imgObjs[id].fetch();
			}
		}
	}
	// and by class
	if (this.className) {
		this._classImageEls = YAHOO.util.Dom.getElementsByClassName(this.className);
		for (i=0, len = this._classImageEls.length; i < len; i++) {
			elPos = YAHOO.util.Dom.getXY(this._classImageEls[i]);
			if (elPos[1] < hLimit && elPos[0] < wLimit) {
				YAHOO.util.Dom.removeClass(this._classImageEls[i], this.className);
			}
		}
	}
};

/**
 * Finds all elements in the Dom with the class name specified in the group. Removes the class from the element in order to let the style definitions trigger the image fetching
 * @method _fetchByClass
 * @private
 */
YAHOO.util.ImageLoader.group.prototype._fetchByClass = function() {
	if (! this.className) {
		return;
	}

	// this._classImageEls may have been set during _foldCheck
	if (this._classImageEls === null) {
		this._classImageEls = YAHOO.util.Dom.getElementsByClassName(this.className);
	}
	YAHOO.util.Dom.removeClass(this._classImageEls, this.className);
};


/**
 * Base class for image objects to be registered with the groups
 * @class YAHOO.util.ImageLoader.imgObj
 * @constructor
 * @param {String}	domId	HTML DOM id of the image element
 * @param {String}	url	URL for the image
 */
YAHOO.util.ImageLoader.imgObj = function(domId, url) {
	/**
	 * HTML DOM id of the image element
	 * @property domId
	 * @type String
	 */
	this.domId = domId;

	/**
	 * URL for the image
	 * @property url
	 * @type String
	 */
	this.url = url;

	/**
	 * Pixel width of the image. Will be set as a "width" attribute after the image is fetched.
	 * Detaults to the natural width of the image.
	 * Only appropriate with src images
	 * @property width
	 * @type Int
	 */
	this.width = null;

	/**
	 * Pixel height of the image. Will be set as a "height" attribute after the image is fetched.
	 * Detaults to the natural height of the image.
	 * Only appropriate with src images
	 * @property height
	 * @type Int
	 */
	this.height = null;

	/**
	 * Whether the style.visibility should be set to "visible" after the image is fetched.
	 * Used when setting src images as visibility:hidden prior to image fetching
	 * @property setVisible
	 * @type Boolean
	 */
	this.setVisible = false;

	/**
	 * Whether the image has already been fetched. In the case of a foldCondional group, keeps track for when the trigger is fired so images aren't fetched twice
	 * @property _fetched
	 * @type Boolean
	 * @private
	 */
	this._fetched = false;
};

/**
 * Displays the image; puts the URL into the DOM
 * @method fetch
 */
YAHOO.util.ImageLoader.imgObj.prototype.fetch = function() {
	if (this._fetched) {
		return;
	}
	var el = document.getElementById(this.domId);
	if (! el) {
		return;
	}
	this._applyUrl(el);

	if (this.setVisible) {
		el.style.visibility = 'visible';
	}
	if (this.width) {
		el.width = this.width;
	}
	if (this.height) {
		el.height = this.height;
	}
	this._fetched = true;
};

/**
 * Inserts the image URL into the DOM so that the image is displayed.
 * Must be overridden by child class
 * @method _applyUrl
 * @param {Object}	el	HTML DOM element
 * @private
 */
YAHOO.util.ImageLoader.imgObj.prototype._applyUrl = function(el) {
};

/**
 * Background image object. A background image is one whose URL is specified by "background-image" in the element's style
 * @class YAHOO.util.ImageLoader.bgImgObj
 * @constructor
 * @extends YAHOO.util.ImageLoader.imgObj
 * @param {String}	domId	HTML DOM id of the image element
 * @param {String}	url	URL for the image
 */
YAHOO.util.ImageLoader.bgImgObj = function(domId, url) {
	YAHOO.util.ImageLoader.bgImgObj.superclass.constructor.call(this, domId, url);
};

YAHOO.lang.extend(YAHOO.util.ImageLoader.bgImgObj, YAHOO.util.ImageLoader.imgObj);

/**
 * Inserts the image URL into the DOM so that the image is displayed.
 * Sets style.backgroundImage
 * @method _applyUrl
 * @param {Object}	el	HTML DOM element
 * @private
 */
YAHOO.util.ImageLoader.bgImgObj.prototype._applyUrl = function(el) {
	el.style.backgroundImage = "url('" + this.url + "')";
};

/**
 * Source image object. A source image is one whose URL is specified by a src attribute in the DOM element
 * @class YAHOO.util.ImageLoader.srcImgObj
 * @constructor
 * @extends YAHOO.util.ImageLoader.imgObj
 * @param {String}	domId	HTML DOM id of the image element
 * @param {String}	url	URL for the image
 * @param {Int}	width	pixel width of the image - defaults to image's natural size
 * @param {Int}	height	pixel height of the image - defaults to image's natural size
 */
YAHOO.util.ImageLoader.srcImgObj = function(domId, url, width, height) {
	YAHOO.util.ImageLoader.srcImgObj.superclass.constructor.call(this, domId, url);
	this.width = width;
	this.height = height;
};

YAHOO.lang.extend(YAHOO.util.ImageLoader.srcImgObj, YAHOO.util.ImageLoader.imgObj);

/**
 * Inserts the image URL into the DOM so that the image is displayed.
 * Sets src
 * @method _applyUrl
 * @param {Object}	el	HTML DOM element
 * @private
 */
YAHOO.util.ImageLoader.srcImgObj.prototype._applyUrl = function(el) {
	el.src = this.url;
};

/**
 * PNG background image object. A PNG background image is one whose URL is specified through AlphaImageLoader or by "background-image" in the element's style
 * @class YAHOO.util.ImageLoader.pngBgImgObj
 * @constructor
 * @extends YAHOO.util.ImageLoader.imgObj
 * @param {String}	domId	HTML DOM id of the image element
 * @param {String}	url	URL for the image
 * @param {Object}  ailProps The AlphaImageLoader properties to be set for the image
 *                    Valid properties are 'sizingMethod' and 'enabled'
 */
YAHOO.util.ImageLoader.pngBgImgObj = function(domId, url, ailProps) {
	YAHOO.util.ImageLoader.pngBgImgObj.superclass.constructor.call(this, domId, url);

	/**
	 * AlphaImageLoader properties to be set for the image.
	 * Valid properties are "sizingMethod" and "enabled".
	 * @property props
	 * @type Object
	 */
	this.props = ailProps || {};
};

YAHOO.lang.extend(YAHOO.util.ImageLoader.pngBgImgObj, YAHOO.util.ImageLoader.imgObj);

/**
 * Inserts the image URL into the DOM so that the image is displayed.
 * If the browser is determined to be IE6 (or older), sets the AlphaImageLoader src; otherwise sets style.backgroundImage
 * @method _applyUrl
 * @param {Object}	el	HTML DOM element
 * @private
 */
YAHOO.util.ImageLoader.pngBgImgObj.prototype._applyUrl = function(el) {
	if (YAHOO.env.ua.ie && YAHOO.env.ua.ie <= 6) {
		var sizingMethod = (YAHOO.lang.isUndefined(this.props.sizingMethod)) ? 'scale' : this.props.sizingMethod,
		    enabled = (YAHOO.lang.isUndefined(this.props.enabled)) ? 'true' : this.props.enabled;
		el.style.filter = 'progid:DXImageTransform.Microsoft.AlphaImageLoader(src="' + this.url + '", sizingMethod="' + sizingMethod + '", enabled="' + enabled + '")';
	}
	else {
		el.style.backgroundImage = "url('" + this.url + "')";
	}
};
YAHOO.register("imageloader", YAHOO.util.ImageLoader, {version: "2.9.0", build: "2800"});
