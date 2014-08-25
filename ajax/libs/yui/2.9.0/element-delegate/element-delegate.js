/*
Copyright (c) 2011, Yahoo! Inc. All rights reserved.
Code licensed under the BSD License:
http://developer.yahoo.com/yui/license.html
version: 2.9.0
*/
/**
 * Augments the Element Utility with a <code>delegate</code> method that 
 * facilitates easy creation of delegated event listeners.  (Note: Using CSS 
 * selectors as the filtering criteria for delegated event listeners requires 
 * inclusion of the Selector Utility.)
 *
 * @module element-delegate
 * @title Element Event Delegation Module
 * @namespace YAHOO.util
 * @requires element, event-delegate
 */

(function () {

	var Event = YAHOO.util.Event,
		delegates = [],
		specialTypes = {
			mouseenter: true,
			mouseleave: true
		};

	YAHOO.lang.augmentObject(YAHOO.util.Element.prototype, {

	    /**
         * Appends a delegated event listener.  Delegated event listeners 
		 * receive two arguments by default: the DOM event and the element  
		 * specified by the filtering function or CSS selector.
		 * (Note: Using the delegate method requires the element-delegate 
		 * module.  Using CSS selectors as the filtering criteria for delegated 
		 * event listeners requires inclusion of the Selector Utility.)
	     * @method delegate
	     * @param {String} type The name of the event to listen for
	     * @param {Function} fn The handler to call when the event fires
		 * @param {Function|string} filter Function or CSS selector used to 
		 * determine for what element(s) the event listener should be called. 
		 * When a function is specified, the function should return an 
		 * HTML element.  Using a CSS Selector requires the inclusion of the 
		 * CSS Selector Utility.
	     * @param {Any} obj A variable to pass to the handler
	     * @param {Object} scope The object to use for the scope of the handler 
         * @return {boolean} Returns true if the delegated event listener 
		 * was added successfully
         * @for Element
	     */
		delegate: function (type, fn, filter, obj, overrideContext) {

			if (YAHOO.lang.isString(filter) && !YAHOO.util.Selector) {
		        return false;
			}
			
			if (!Event._createDelegate) {
		        return false;
			}			

			var sType = Event._getType(type),
				el = this.get("element"),
				fnDelegate,
				fnMouseDelegate,

				fnWrapper = function (e) {

					return fnDelegate.call(el, e);

				};

			if (specialTypes[type]) {

				if (!Event._createMouseDelegate) {
			        return false;				
				}

				fnMouseDelegate = Event._createMouseDelegate(fn, obj, overrideContext);

				fnDelegate = Event._createDelegate(function (event, matchedEl, container) {

					return fnMouseDelegate.call(matchedEl, event, container);

				}, filter, obj, overrideContext);

			}
			else {
				fnDelegate = Event._createDelegate(fn, filter, obj, overrideContext);
			}


			delegates.push([el, sType, fn, fnWrapper]);

			return this.on(sType, fnWrapper);

		},


	    /**
	     * Remove a delegated event listener
	     * @method removeDelegate
	     * @param {String} type The name of the event to listen for
	     * @param {Function} fn The function call when the event fires
         * @return {boolean} Returns true if the unbind was successful, false 
         *  otherwise.
         * @for Element
	     */
		removeDelegate: function (type, fn) {

			var sType = Event._getType(type),
				index = Event._getCacheIndex(delegates, this.get("element"), sType, fn),
				returnVal,
				cacheItem;

		    if (index >= 0) {
		        cacheItem = delegates[index];
		    }

		    if (cacheItem) {

		        returnVal = this.removeListener(cacheItem[1], cacheItem[3]);

				if (returnVal) {
		            delete delegates[index][2];
		            delete delegates[index][3];
		            delegates.splice(index, 1);
				}

			}

			return returnVal;

		}
		
	});

}());
YAHOO.register("element-delegate", YAHOO.util.Element, {version: "2.9.0", build: "2800"});
