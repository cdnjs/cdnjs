(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(_dereq_,module,exports){
var AutoBind = _dereq_('../lib/AutoBind');

module.exports = AutoBind;

},{"../lib/AutoBind":2}],2:[function(_dereq_,module,exports){
"use strict";

/**
 * Provides data-binding functionality to ForerunnerDB. Allows collections
 * and views to link to selectors and automatically generate DOM elements
 * from jsViews (jsRender) templates.
 * @class AutoBind
 */

var Shared = window.ForerunnerDB.shared,
	AutoBind = {},
	jsviews;

Shared.addModule('AutoBind', AutoBind);

/**
 * Extends the Collection class with new binding capabilities.
 * @extends Collection
 * @param {Collection} Module The Collection class module.
 * @private
 */
AutoBind.extendCollection = function (Module) {
	var superInit = Module.prototype.init,
		superDataReplace = Module.prototype._dataReplace,
		superDataInsertIndex = Module.prototype._dataInsertAtIndex,
		superDataRemoveIndex = Module.prototype._dataRemoveAtIndex,
		superUpdateProperty = Module.prototype._updateProperty,
		superUpdateIncrement = Module.prototype._updateIncrement,
		superUpdateSpliceMove = Module.prototype._updateSpliceMove,
		superUpdateSplicePush = Module.prototype._updateSplicePush,
		superUpdateSplicePull = Module.prototype._updateSplicePull,
		superUpdatePush = Module.prototype._updatePush,
		superUpdatePull = Module.prototype._updatePull,
		superUpdateMultiply = Module.prototype._updateMultiply,
		superUpdateRename = Module.prototype._updateRename,
		superUpdateOverwrite = Module.prototype._updateOverwrite,
		superUpdateUnset = Module.prototype._updateUnset,
		superUpdatePop = Module.prototype._updatePop,
		superDrop = Module.prototype.drop;

	Module.prototype.init = function () {
		this._linked = 0;
		superInit.apply(this, arguments);
	};

	/**
	 * Checks if the instance is data-bound to any DOM elements.
	 * @func isLinked
	 * @memberof Collection
	 * @returns {Boolean} True if linked, false if not.
	 */
	Module.prototype.isLinked = function () {
		return Boolean(this._linked);
	};

	/**
	 * Creates a link to the DOM between the collection data and the elements
	 * in the passed output selector. When new elements are needed or changes
	 * occur the passed templateSelector is used to get the template that is
	 * output to the DOM.
	 * @func link
	 * @memberof Collection
	 * @param outputTargetSelector
	 * @param templateSelector
	 * @param {Object=} options Optional extra options.
	 * @see unlink
	 */
	Module.prototype.link = function (outputTargetSelector, templateSelector, options) {
		if (window.jQuery) {
			// Make sure we have a data-binding store object to use
			this._links = this._links || new ForerunnerDB.shared.modules.Collection(this.instanceIdentifier() + '_links'); //jshint ignore:line
			if (!this._linked) { this._linked = 0; }

			var templateId,
				templateHtml,
				targetSelector;

			if (outputTargetSelector && templateSelector) {
				targetSelector = typeof outputTargetSelector === 'string' ? outputTargetSelector : outputTargetSelector.selector;

				if (templateSelector && typeof templateSelector === 'object') {
					// Our second argument is an object, let's inspect
					if (templateSelector.template && typeof templateSelector.template === 'string') {
						// The template has been given to us as a string
						templateId = this.objectId(templateSelector.template);
						templateHtml = templateSelector.template;
					}
				} else {
					templateId = templateSelector;
				}

				if (!this._links.count({
						target: targetSelector,
						template: templateSelector
					})) {
					if (window.jQuery(outputTargetSelector).length) {
						// Ensure the template is in memory and if not, try to get it
						if (!window.jQuery.templates[templateId]) {
							if (!templateHtml) {
								// Grab the template
								var template = window.jQuery(templateSelector);
								if (template.length) {
									templateHtml = window.jQuery(template[0]).html();
								} else {
									throw('ForerunnerDB.AutoBind : ' + this.instanceIdentifier() + ' Unable to bind to target because template "' + templateSelector + '" does not exist');
								}
							}

							window.jQuery.views.templates(templateId, templateHtml);
						}

						if (options && options.$wrap) {
							var wrapper,
								tmpObj,
								doc;

							if (!options.$wrapIn) {
								// Create the data binding wrapped in an object
								wrapper = {};
								wrapper[options.$wrap] = this._data;
							} else if (options.$wrapIn instanceof window.ForerunnerDB.shared.modules.Document) {
								// Document-based wrapper
								// Grab the document instance
								doc = options.$wrapIn;

								// Get the current data by reference
								tmpObj = doc._data;

								// Set the wrapper property to the referenced data
								// of this collection / view
								tmpObj[options.$wrap] = this._data;

								// Set the data back into the document by reference
								doc.setData(tmpObj, {$decouple: false});

								// Set it to data-bound mode
								doc._linked = 1;

								// Provide the document data as wrapper data
								wrapper = doc._data;
							} else if (typeof options.$wrapIn === 'object') {
								wrapper = options.$wrapIn;
								wrapper[options.$wrap] = this._data;
							} else {
								throw('ForerunnerDB.AutoBind: ' + this.instanceIdentifier() + ' Unable to use passed $wrapIn option, should be either a ForerunnerDB Document instance or a JavaScript object!');
							}

							if (this.debug()) {
								console.log('ForerunnerDB.AutoBind: ' + this.instanceIdentifier() + ' Binding data wrapped in an object with field called "' + options.$wrap + '" to output target: ' + outputTargetSelector);
							}

							window.jQuery.templates[templateId].link(outputTargetSelector, wrapper);
						} else {
							// Create the data binding
							window.jQuery.templates[templateId].link(outputTargetSelector, this._data);
						}

						this._links.insert({
							target: targetSelector,
							template: templateSelector,
							templateId: templateId
						});

						// Set the linked flag
						this._linked++;

						if (this.debug()) {
							console.log(this.logIdentifier() + ' Binding to output target: ' + outputTargetSelector);
						}

						return this;
					} else {
						throw(this.logIdentifier() + ' Cannot bind collection to target selector "' + outputTargetSelector + '" because it does not exist in the DOM!');
					}
				}

				throw(this.logIdentifier() + ' Attempt to bind a duplicate link from collection to the target: ' + outputTargetSelector + ' with the template: ' + templateId);
			} else {
				throw(this.logIdentifier() + ' Cannot bind without a target / template!');
			}
		} else {
			throw(this.logIdentifier() + ' Cannot data-bind without jQuery. Please add jQuery to your page!');
		}
	};

	/**
	 * Removes a link to the DOM between the collection data and the elements
	 * in the passed output selector that was created using the link() method.
	 * @func unlink
	 * @memberof Collection
	 * @param outputTargetSelector
	 * @param templateSelector
	 */
	Module.prototype.unlink = function (outputTargetSelector, templateSelector) {
		if (this._links) {
			if (window.jQuery) {
				var templateId,
					targetSelector,
					link,
					linkArr,
					i;

				if (outputTargetSelector && templateSelector) {
					targetSelector = typeof outputTargetSelector === 'string' ? outputTargetSelector : outputTargetSelector.selector;

					if (templateSelector && typeof templateSelector === 'object') {
						// Our second argument is an object, let's inspect
						if (templateSelector.template && typeof templateSelector.template === 'string') {
							// The template has been given to us as a string
							templateId = this.objectId(templateSelector.template);
						}
					} else {
						templateId = templateSelector;
					}


					link = this._links.findOne({
						target: targetSelector,
						template: templateSelector
					});

					if (link) {
						// Remove the data binding
						window.jQuery.templates[templateId].unlink(outputTargetSelector);

						// Remove link from store
						this._links.remove(link);

						// Set the linked count
						this._linked--;

						if (this.debug()) {
							console.log(this.logIdentifier() + ' Removed binding document to target: ' + outputTargetSelector);
						}

						return this;
					}

					if (this.debug()) {
						console.log(this.logIdentifier() + ' Cannot remove binding as it does not exist to the target: ' + outputTargetSelector + ' with the template: ' + templateSelector);
					}
				} else {
					// No parameters passed, unlink all from this module
					linkArr = this._links.find();
					for (i = 0; i < linkArr.length; i++) {
						link = linkArr[i];
						window.jQuery.templates[link.templateId].unlink(jQuery(link.target));

						if (this.debug()) {
							console.log(this.logIdentifier() + ' Removed binding to output target: ' + link.target);
						}
					}

					this._links.remove();
					this._linked = 0;
				}
			} else {
				throw(this.logIdentifier() + ' Cannot data-bind without jQuery. Please add jQuery to your page!');
			}
		}

		return this;
	};

	/**
	 * Get the data-bound links this module is using.
	 * @returns {*}
	 */
	Module.prototype.links = function () {
		return this._links;
	};

	Module.prototype._dataReplace = function (data) {
		if (this._linked) {
			// Remove all items
			if (this.debug()) {
				console.log(this.logIdentifier() + ' Replacing some data in document');
			}
			window.jQuery.observable(this._data).refresh(data);
		} else {
			superDataReplace.apply(this, arguments);
		}
	};

	Module.prototype._dataInsertAtIndex = function (index, doc) {
		if (this._linked) {
			if (this.debug()) {
				console.log(this.logIdentifier() + ' Inserting some data');
			}
			window.jQuery.observable(this._data).insert(index, doc);
		} else {
			superDataInsertIndex.apply(this, arguments);
		}
	};

	Module.prototype._dataRemoveAtIndex = function (index) {
		if (this._linked) {
			if (this.debug()) {
				console.log(this.logIdentifier() + ' Removing some data');
			}
			window.jQuery.observable(this._data).remove(index);
		} else {
			superDataRemoveIndex.apply(this, arguments);
		}
	};

	/**
	 * Updates a property on an object depending on if the collection is
	 * currently running data-binding or not.
	 * @param {Object} doc The object whose property is to be updated.
	 * @param {String} prop The property to update.
	 * @param {*} val The new value of the property.
	 * @private
	 */
	Module.prototype._updateProperty = function (doc, prop, val) {
		if (this._linked) {
			if (this.debug()) {
				console.log(this.logIdentifier() + ' Setting document property "' + prop + '"');
			}
			window.jQuery.observable(doc).setProperty(prop, val);
		} else {
			superUpdateProperty.apply(this, arguments);
		}
	};

	/**
	 * Increments a value for a property on a document by the passed number.
	 * @param {Object} doc The document to modify.
	 * @param {String} prop The property to modify.
	 * @param {Number} val The amount to increment by.
	 * @private
	 */
	Module.prototype._updateIncrement = function (doc, prop, val) {
		if (this._linked) {
			if (this.debug()) {
				console.log(this.logIdentifier() + ' Incrementing document property "' + prop + '"');
			}
			window.jQuery.observable(doc).setProperty(prop, doc[prop] + val);
		} else {
			superUpdateIncrement.apply(this, arguments);
		}
	};

	/**
	 * Changes the index of an item in the passed array.
	 * @param {Array} arr The array to modify.
	 * @param {Number} indexFrom The index to move the item from.
	 * @param {Number} indexTo The index to move the item to.
	 * @private
	 */
	Module.prototype._updateSpliceMove = function (arr, indexFrom, indexTo) {
		if (this._linked) {
			if (this.debug()) {
				console.log(this.logIdentifier() + ' Moving document array index from "' + indexFrom + '" to "' + indexTo + '"');
			}
			window.jQuery.observable(arr).move(indexFrom, indexTo);
		} else {
			superUpdateSpliceMove.apply(this, arguments);
		}
	};

	/**
	 * Inserts an item into the passed array at the specified index.
	 * @param {Array} arr The array to insert into.
	 * @param {Number} index The index to insert at.
	 * @param {Object} doc The document to insert.
	 * @private
	 */
	Module.prototype._updateSplicePush = function (arr, index, doc) {
		if (this._linked) {
			if (this.debug()) {
				console.log(this.logIdentifier() + ' Pushing item into document sub-array');
			}
			if (arr.length > index) {
				window.jQuery.observable(arr).insert(index, doc);
			} else {
				window.jQuery.observable(arr).insert(doc);
			}
		} else {
			superUpdateSplicePush.apply(this, arguments);
		}
	};

	/**
	 * Removes an item from the passed array at the specified index.
	 * @param {Array} arr The array to remove from.
	 * @param {Number} index The index of the item to remove.
	 * @param {Number} count The number of items to remove.
	 * @private
	 */
	Module.prototype._updateSplicePull = function (arr, index, count) {
		if (this._linked) {
			if (this.debug()) {
				console.log(this.logIdentifier() + ' Pulling from document sub-array');
			}

			window.jQuery.observable(arr).remove(index, count);
		} else {
			superUpdateSplicePull.apply(this, arguments);
		}
	};

	/**
	 * Inserts an item at the end of an array.
	 * @param {Array} arr The array to insert the item into.
	 * @param {Object} doc The document to insert.
	 * @private
	 */
	Module.prototype._updatePush = function (arr, doc) {
		if (this._linked) {
			if (this.debug()) {
				console.log(this.logIdentifier() + ' Pushing item into document sub-array');
			}
			window.jQuery.observable(arr).insert(doc);
		} else {
			superUpdatePush.apply(this, arguments);
		}
	};

	/**
	 * Removes an item from the passed array.
	 * @param {Array} arr The array to modify.
	 * @param {Number} index The index of the item in the array to remove.
	 * @private
	 */
	Module.prototype._updatePull = function (arr, index) {
		if (this._linked) {
			if (this.debug()) {
				console.log(this.logIdentifier() + ' Pulling item from document sub-array');
			}
			window.jQuery.observable(arr).remove(index);
		} else {
			superUpdatePull.apply(this, arguments);
		}
	};

	/**
	 * Multiplies a value for a property on a document by the passed number.
	 * @param {Object} doc The document to modify.
	 * @param {String} prop The property to modify.
	 * @param {Number} val The amount to multiply by.
	 * @private
	 */
	Module.prototype._updateMultiply = function (doc, prop, val) {
		if (this._linked) {
			if (this.debug()) {
				console.log(this.logIdentifier() + ' Multiplying value');
			}
			window.jQuery.observable(doc).setProperty(prop, doc[prop] * val);
		} else {
			superUpdateMultiply.apply(this, arguments);
		}
	};

	/**
	 * Renames a property on a document to the passed property.
	 * @param {Object} doc The document to modify.
	 * @param {String} prop The property to rename.
	 * @param {Number} val The new property name.
	 * @private
	 */
	Module.prototype._updateRename = function (doc, prop, val) {
		if (this._linked) {
			if (this.debug()) {
				console.log(this.logIdentifier() + ' Renaming property "' + prop + '" to "' + val + '" on document');
			}
			window.jQuery.observable(doc).setProperty(val, doc[prop]);
			window.jQuery.observable(doc).removeProperty(prop);
		} else {
			superUpdateRename.apply(this, arguments);
		}
	};

	/**
	 * Overwrites a property on a document to the passed value.
	 * @param {Object} doc The document to modify.
	 * @param {String} prop The property to delete.
	 * @param {*} val The new value to set the property to.
	 * @private
	 */
	Module.prototype._updateOverwrite = function (doc, prop, val) {
		if (this._linked) {
			if (this.debug()) {
				console.log(this.logIdentifier() + ' Setting document property "' + prop + '"');
			}
			window.jQuery.observable(doc).setProperty(prop, val);
		} else {
			superUpdateOverwrite.apply(this, arguments);
		}
	};

	/**
	 * Deletes a property on a document.
	 * @param {Object} doc The document to modify.
	 * @param {String} prop The property to delete.
	 * @private
	 */
	Module.prototype._updateUnset = function (doc, prop) {
		if (this._linked) {
			if (this.debug()) {
				console.log(this.logIdentifier() + ' Removing property "' + prop + '" from document');
			}
			window.jQuery.observable(doc).removeProperty(prop);
		} else {
			superUpdateUnset.apply(this, arguments);
		}
	};

	/**
	 * Pops an item from the array stack.
	 * @param {Object} doc The document to modify.
	 * @param {Number=} val Optional, if set to 1 will pop, if set to -1 will shift.
	 * @return {Boolean}
	 * @private
	 */
	Module.prototype._updatePop = function (doc, val) {
		var index,
			updated = false,
			i;

		if (this._linked) {
			if (doc.length > 0) {
				if (this.debug()) {
					console.log(this.logIdentifier() + ' Popping item from sub-array in document');
				}

				if (val > 0) {
					for (i = 0; i < val; i++) {
						index = doc.length - 1;
						if (index > -1) {
							window.jQuery.observable(doc).remove(index);
						}
					}
					updated = true;
				} else if (val < 0) {
					index = 0;
					for (i = 0; i > val; i--) {
						if (doc.length) {
							window.jQuery.observable(doc).remove(index);
						}
					}
					updated = true;
				}
			}
		} else {
			updated = superUpdatePop.apply(this, arguments);
		}

		return updated;
	};

	Module.prototype.drop = function () {
		// Unlink all linked data
		if (this._linked) {
			var linkArr = this._links.find(),
				i;

			for (i = 0; i < linkArr.length; i++) {
				this.unlink(jQuery(linkArr[i].target), linkArr[i].template);
			}
		}

		if (this._links) {
			this._links.drop();
			delete this._links;
		}

		return superDrop.apply(this, arguments);
	};
};

/**
 * Extends the View class with new binding capabilities.
 * @extends View
 * @param {View} Module The View class module.
 * @private
 */
AutoBind.extendView = function (Module) {
	var superInit = Module.prototype.init;

	Module.prototype.init = function () {
		this._linked = 0;
		superInit.apply(this, arguments);
	};

	/**
	 * Checks if the instance is data-bound to any DOM elements.
	 * @func isLinked
	 * @memberof View
	 * @returns {Boolean} True if linked, false if not.
	 */
	Module.prototype.isLinked = function () {
		return this.data().isLinked();
	};

	/**
	 * Data-binds the view data to the elements matched by the passed selector.
	 * @func link
	 * @memberof View
	 * @param {String} outputTargetSelector The jQuery element selector to select the element
	 * into which the data-bound rendered items will be placed. All existing HTML will be
	 * removed from this element.
	 * @param {String|Object} templateSelector This can either be a jQuery selector identifying
	 * which template element to get the template HTML from that each item in the view's data
	 * will use when rendering to the screen, or you can pass an object with a template key
	 * containing a string that represents the HTML template such as:
	 *     { template: '<div>{{:name}}</div>' }
	 * @param {Object=} options An options object.wd
	 * @returns {View}
	 * @see unlink
	 */
	Module.prototype.link = function (outputTargetSelector, templateSelector, options) {
		var data = this.data();

		data.link(outputTargetSelector, templateSelector, options);

		return this;
	};

	/**
	 * Removes a previously set-up data-binding via the link() method.
	 * @func unlink
	 * @memberof View
	 * @param {String} outputTargetSelector The jQuery target selector.
	 * @param {String} templateSelector The jQuery template selector.
	 * @see link
	 * @returns {View}
	 */
	Module.prototype.unlink = function (outputTargetSelector, templateSelector) {
		var data = this.data();

		data.unlink(outputTargetSelector, templateSelector);

		return this;
	};

	/**
	 * Get the data-bound links this module is using.
	 * @returns {*}
	 */
	Module.prototype.links = function () {
		return this.data().links();
	};
};

/**
 * Extends the Overview class with new binding capabilities.
 * @extends Overview
 * @param {Overview} Module The Overview class module.
 * @private
 */
AutoBind.extendOverview = function (Module) {
	/**
	 * Checks if the instance is data-bound to any DOM elements.
	 * @func isLinked
	 * @memberof Overview
	 * @returns {Boolean} True if linked, false if not.
	 */
	Module.prototype.isLinked = function () {
		return this.data().isLinked();
	};

	/**
	 * Creates a link to the DOM between the overview data and the elements
	 * in the passed output selector. When new elements are needed or changes
	 * occur the passed templateSelector is used to get the template that is
	 * output to the DOM.
	 * @func link
	 * @memberof Overview
	 * @param outputTargetSelector
	 * @param templateSelector
	 * @param {Object=} options An options object.
	 * @see unlink
	 */
	Module.prototype.link = function (outputTargetSelector, templateSelector, options) {
		this._data.link.apply(this._data, arguments);
		this._refresh();
	};

	/**
	 * Removes a link to the DOM between the overview data and the elements
	 * in the passed output selector that was created using the link() method.
	 * @func unlink
	 * @memberof Overview
	 * @param outputTargetSelector
	 * @param templateSelector
	 * @see link
	 */
	Module.prototype.unlink = function (outputTargetSelector, templateSelector) {
		this._data.unlink.apply(this._data, arguments);
		this._refresh();
	};

	/**
	 * Get the data-bound links this module is using.
	 * @returns {*}
	 */
	Module.prototype.links = function () {
		return this._data.links();
	};
};

/**
 * Extends the Document class with new binding capabilities.
 * @extends Document
 * @param {Document} Module The Document class module.
 * @private
 */
AutoBind.extendDocument = function (Module) {
	var superUpdatePop = Module.prototype._updatePop;

	/**
	 * Checks if the instance is data-bound to any DOM elements.
	 * @func isLinked
	 * @memberof Document
	 * @returns {Boolean} True if linked, false if not.
	 */
	Module.prototype.isLinked = function () {
		return Boolean(this._linked);
	};

	/**
	 * Creates a link to the DOM between the document data and the elements
	 * in the passed output selector. When new elements are needed or changes
	 * occur the passed templateSelector is used to get the template that is
	 * output to the DOM.
	 * @func link
	 * @memberof Document
	 * @param outputTargetSelector
	 * @param templateSelector
	 * @param {Object=} options An options object.
	 * @see unlink
	 */
	Module.prototype.link = function (outputTargetSelector, templateSelector, options) {
		if (window.jQuery) {
			// Make sure we have a data-binding store object to use
			this._links = this._links || new ForerunnerDB.shared.modules.Collection(this.instanceIdentifier() + '_links'); //jshint ignore:line
			if (!this._linked) { this._linked = 0; }

			if (outputTargetSelector && templateSelector) {
				var templateId,
					templateHtml,
					targetSelector = typeof outputTargetSelector === 'string' ? outputTargetSelector : outputTargetSelector.selector;

				if (templateSelector && typeof templateSelector === 'object') {
					// Our second argument is an object, let's inspect
					if (templateSelector.template && typeof templateSelector.template === 'string') {
						// The template has been given to us as a string
						templateId = this.objectId(templateSelector.template);
						templateHtml = templateSelector.template;
					}
				} else {
					templateId = templateSelector;
				}

				if (!this._links.count({
						target: targetSelector,
						template: templateSelector
					})) {
					if (window.jQuery(outputTargetSelector).length) {
						// Ensure the template is in memory and if not, try to get it
						if (!window.jQuery.templates[templateId]) {
							if (!templateHtml) {
								// Grab the template
								var template = window.jQuery(templateSelector);
								if (template.length) {
									templateHtml = window.jQuery(template[0]).html();
								} else {
									throw(this.logIdentifier() + ' Unable to bind document to target because template does not exist: ' + templateSelector);
								}
							}

							window.jQuery.views.templates(templateId, templateHtml);
						}

						if (options && options.$wrap) {
							// Create the data binding wrapped in an object
							var wrapper,
								tmpObj,
								doc;

							if (!options.$wrapIn) {
								// Create the data binding wrapped in an object
								wrapper = {};
								wrapper[options.$wrap] = this._data;
							} else if (options.$wrapIn instanceof Document) {
								// Document-based wrapper
								// Grab the document instance
								doc = options.$wrapIn;

								// Get the current data by reference
								tmpObj = doc._data;

								// Set the wrapper property to the referenced data
								// of this collection / view
								tmpObj[options.$wrap] = this._data;

								// Set the data back into the document by reference
								doc.setData(tmpObj, {$decouple: false});

								// Set it to data-bound mode
								doc._linked = 1;

								// Provide the document data as wrapper data
								wrapper = options.$wrap._data;
							}

							window.jQuery.templates[templateId].link(outputTargetSelector, wrapper);
						} else {
							// Create the data binding
							window.jQuery.templates[templateId].link(outputTargetSelector, this._data);
						}

						this._links.insert({
							target: targetSelector,
							template: templateSelector,
							templateId: templateId
						});

						// Set the linked flag
						this._linked++;

						if (this.debug()) {
							console.log(this.logIdentifier() + ' Added binding to target: ' + outputTargetSelector);
						}

						return this;
					} else {
						throw(this.logIdentifier() + ' Cannot bind document to target "' + outputTargetSelector + '" because it does not exist in the DOM!');
					}
				}

				throw(this.logIdentifier() + ' Cannot create a duplicate link from document to the target: ' + outputTargetSelector + ' with the template: ' + templateId);
			} else {
				throw(this.logIdentifier() + ' Cannot bind without a target / template!');
			}
		} else {
			throw(this.logIdentifier() + ' Cannot data-bind without jQuery. Please add jQuery to your page!');
		}
	};

	/**
	 * Removes a link to the DOM between the document data and the elements
	 * in the passed output selector that was created using the link() method.
	 * @func unlink
	 * @memberof Document
	 * @param outputTargetSelector
	 * @param templateSelector
	 * @see link
	 */
	Module.prototype.unlink = function (outputTargetSelector, templateSelector) {
		if (this._links) {
			if (window.jQuery) {
				var templateId,
					targetSelector,
					link,
					linkArr,
					i;

				if (outputTargetSelector && templateSelector) {
					targetSelector = typeof outputTargetSelector === 'string' ? outputTargetSelector : outputTargetSelector.selector;

					if (templateSelector && typeof templateSelector === 'object') {
						// Our second argument is an object, let's inspect
						if (templateSelector.template && typeof templateSelector.template === 'string') {
							// The template has been given to us as a string
							templateId = this.objectId(templateSelector.template);
						}
					} else {
						templateId = templateSelector;
					}

					link = this._links.findOne({
						target: targetSelector,
						template: templateSelector
					});

					if (link) {
						// Remove the data binding
						window.jQuery.templates[templateId].unlink(outputTargetSelector);

						// Remove link from store
						this._links.remove(link);

						// Set the linked count
						this._linked--;

						if (this.debug()) {
							console.log(this.logIdentifier() + ' Removed binding document to target: ' + outputTargetSelector);
						}

						return this;
					}

					if (this.debug()) {
						console.log(this.logIdentifier() + ' Cannot remove link from document, one does not exist to the target: ' + outputTargetSelector + ' with the template: ' + templateSelector);
					}
				} else {
					// No parameters passed, unlink all from this module
					linkArr = this._links.find();
					for (i = 0; i < linkArr.length; i++) {
						link = linkArr[i];
						window.jQuery.templates[link.templateId].unlink(jQuery(link.target));

						if (this.debug()) {
							console.log(this.logIdentifier() + ' Removed binding to output target: ' + link.target);
						}
					}

					this._links.remove();
					this._linked = 0;
				}
			} else {
				throw(this.logIdentifier() + ' Cannot data-bind without jQuery. Please add jQuery to your page!');
			}
		}

		return this;
	};

	/**
	 * Get the data-bound links this module is using.
	 * @returns {*}
	 */
	Module.prototype.links = function () {
		return this._links;
	};

	/**
	 * Pops an item from the array stack.
	 * @param {Object} doc The document to modify.
	 * @param {Number=} val Optional, if set to 1 will pop, if set to -1 will shift.
	 * @return {Boolean}
	 * @private
	 */
	Module.prototype._updatePop = function (doc, val) {
		var index,
			updated = false,
			i;

		if (this._linked) {
			if (doc.length > 0) {
				if (this.debug()) {
					console.log(this.logIdentifier() + ' Popping item from sub-array');
				}

				if (val > 0) {
					for (i = 0; i < val; i++) {
						index = doc.length - 1;
						if (index > -1) {
							window.jQuery.observable(doc).remove(index);
						}
					}
					updated = true;
				} else if (val < 0) {
					index = 0;
					for (i = 0; i > val; i--) {
						if (doc.length) {
							window.jQuery.observable(doc).remove(index);
						}
					}
					updated = true;
				}
			}
		} else {
			updated = superUpdatePop.apply(this, arguments);
		}

		return updated;
	};
};

// Check that jQuery exists before doing anything else
if (typeof window.jQuery !== 'undefined') {
	// Load jsViews
	jsviews = _dereq_('../lib/vendor/jsviews');

	// Ensure jsviews is registered
	if (typeof window.jQuery.views !== 'undefined') {
		// Define modules that we wish to work on
		var modules = ['Collection', 'View', 'Overview', 'Document'],
			moduleIndex,
			moduleFinished = function (name, module) {
				if (AutoBind['extend' + name]) {
					AutoBind['extend' + name](module);
				}
			};

		// Extend modules that are finished loading
		for (moduleIndex = 0; moduleIndex < modules.length; moduleIndex++) {
			Shared.moduleFinished(modules[moduleIndex], moduleFinished);
		}

		Shared.finishModule('AutoBind');
	} else {
		throw('ForerunnerDB.AutoBind : Plugin cannot continue because jsViews is not loaded. Check your error log for url errors; it should have automatically loaded with this plugin.');
	}
} else {
	throw('ForerunnerDB.AutoBind : Cannot data-bind without jQuery. Please add jQuery to your page!');
}

Shared.finishModule('AutoBind');
module.exports = AutoBind;

},{"../lib/vendor/jsviews":3}],3:[function(_dereq_,module,exports){
var init = (function () {
	/*! jsviews.js v1.0.0-alpha single-file version:
	 includes JsRender, JsObservable and JsViews  http://github.com/BorisMoore/jsrender and http://jsviews.com/jsviews
	 informal pre V1.0 commit counter: 60 (Beta Candidate) */

	/* JsRender:
	 *    See http://github.com/BorisMoore/jsrender and http://jsviews.com/jsrender
	 * Copyright 2014, Boris Moore
	 * Released under the MIT License.
	 */

	(function(global, jQuery, undefined) {
		// global is the this object, which is window when running in the usual browser environment.
		"use strict";

		if (jQuery && jQuery.render || global.jsviews) { return; } // JsRender is already loaded

		//========================== Top-level vars ==========================

		var versionNumber = "v1.0.0-beta",

			$, jsvStoreName, rTag, rTmplString, indexStr, // nodeJsModule,

//TODO	tmplFnsCache = {},
			delimOpenChar0 = "{", delimOpenChar1 = "{", delimCloseChar0 = "}", delimCloseChar1 = "}", linkChar = "^",

			rPath = /^(!*?)(?:null|true|false|\d[\d.]*|([\w$]+|\.|~([\w$]+)|#(view|([\w$]+))?)([\w$.^]*?)(?:[.[^]([\w$]+)\]?)?)$/g,
		//                                     none   object     helper    view  viewProperty pathTokens      leafToken

			rParams = /(\()(?=\s*\()|(?:([([])\s*)?(?:(\^?)(!*?[#~]?[\w$.^]+)?\s*((\+\+|--)|\+|-|&&|\|\||===|!==|==|!=|<=|>=|[<>%*:?\/]|(=))\s*|(!*?[#~]?[\w$.^]+)([([])?)|(,\s*)|(\(?)\\?(?:(')|("))|(?:\s*(([)\]])(?=\s*\.|\s*\^|\s*$)|[)\]])([([]?))|(\s+)/g,
		//          lftPrn0        lftPrn        bound            path    operator err                                                eq             path2       prn    comma   lftPrn2   apos quot      rtPrn rtPrnDot                        prn2  space
		// (left paren? followed by (path? followed by operator) or (path followed by left paren?)) or comma or apos or quot or right paren or space

			rNewLine = /[ \t]*(\r\n|\n|\r)/g,
			rUnescapeQuotes = /\\(['"])/g,
			rEscapeQuotes = /['"\\]/g, // Escape quotes and \ character
			rBuildHash = /(?:\x08|^)(onerror:)?(?:(~?)(([\w$]+):)?([^\x08]+))\x08(,)?([^\x08]+)/gi,
			rTestElseIf = /^if\s/,
			rFirstElem = /<(\w+)[>\s]/,
			rAttrEncode = /[\x00`><"'&]/g, // Includes > encoding since rConvertMarkers in JsViews does not skip > characters in attribute strings
			rIsHtml = /[\x00`><\"'&]/,
			rHasHandlers = /^on[A-Z]|^convert(Back)?$/,
			rHtmlEncode = rAttrEncode,
			autoTmplName = 0,
			viewId = 0,
			charEntities = {
				"&": "&amp;",
				"<": "&lt;",
				">": "&gt;",
				"\x00": "&#0;",
				"'": "&#39;",
				'"': "&#34;",
				"`": "&#96;"
			},
			htmlStr = "html",
			tmplAttr = "data-jsv-tmpl",
			$render = {},
			jsvStores = {
				template: {
					compile: compileTmpl
				},
				tag: {
					compile: compileTag
				},
				helper: {},
				converter: {}
			},

		// jsviews object ($.views if jQuery is loaded)
			$views = {
				jsviews: versionNumber,
				settings: function(settings) {
					$extend($viewsSettings, settings);
					dbgMode($viewsSettings._dbgMode);
					if ($viewsSettings.jsv) {
						$viewsSettings.jsv();
					}
				},
				sub: {
					// subscription, e.g. JsViews integration
					View: View,
					Err: JsViewsError,
					tmplFn: tmplFn,
					cvt: convertArgs,
					parse: parseParams,
					extend: $extend,
					syntaxErr: syntaxError,
					onStore: {},
					_lnk: retVal,
					_ths: tagHandlersFromProps
				},
				map: dataMap, // If jsObservable loaded first, use that definition of dataMap
				_cnvt: convertVal,
				_tag: renderTag,
				_err: error
			};

		function tagHandlersFromProps(tag, tagCtx) {
			for (var prop in tagCtx.props) {
				if (rHasHandlers.test(prop)) {
					tag[prop] = tagCtx.props[prop]; // Copy over the onFoo props, convert and convertBack from tagCtx.props to tag (overrides values in tagDef).
					// Note: unsupported scenario: if handlers are dynamically added ^onFoo=expression this will work, but dynamically removing will not work.
				}
			}
		}

		function retVal(val) {
			return val;
		}

		function dbgBreak(val) {
			debugger; // Insert breakpoint for debugging JsRender or JsViews.
			// Consider https://github.com/BorisMoore/jsrender/issues/239: eval("debugger; //dbg"); // Insert breakpoint for debugging JsRender or JsViews. Using eval to prevent issue with minifiers (YUI Compressor)
			return val;
		}

		function dbgMode(debugMode) {
			$viewsSettings._dbgMode = debugMode;
			indexStr = debugMode ? "Unavailable (nested view): use #getIndex()" : ""; // If in debug mode set #index to a warning when in nested contexts
			$tags("dbg", $helpers.dbg = $converters.dbg = debugMode ? dbgBreak : retVal); // Register {{dbg/}}, {{dbg:...}} and ~dbg() to insert break points for debugging - if in debug mode.
		}

		function JsViewsError(message) {
			// Error exception type for JsViews/JsRender
			// Override of $.views.sub.Error is possible
			this.name = ($.link ? "JsViews" : "JsRender") + " Error";
			this.message = message || this.name;
		}

		function $extend(target, source) {
			var name;
			for (name in source) {
				target[name] = source[name];
			}
			return target;
		}

		function $isFunction(ob) {
			return typeof ob === "function";
		}

		(JsViewsError.prototype = new Error()).constructor = JsViewsError;

		//========================== Top-level functions ==========================

		//===================
		// jsviews.delimiters
		//===================
		function $viewsDelimiters(openChars, closeChars, link) {
			// Set the tag opening and closing delimiters and 'link' character. Default is "{{", "}}" and "^"
			// openChars, closeChars: opening and closing strings, each with two characters

			if (!$sub.rTag || openChars) {
				delimOpenChar0 = openChars ? openChars.charAt(0) : delimOpenChar0; // Escape the characters - since they could be regex special characters
				delimOpenChar1 = openChars ? openChars.charAt(1) : delimOpenChar1;
				delimCloseChar0 = closeChars ? closeChars.charAt(0) : delimCloseChar0;
				delimCloseChar1 = closeChars ? closeChars.charAt(1) : delimCloseChar1;
				linkChar = link || linkChar;
				openChars = "\\" + delimOpenChar0 + "(\\" + linkChar + ")?\\" + delimOpenChar1;  // Default is "{^{"
				closeChars = "\\" + delimCloseChar0 + "\\" + delimCloseChar1;                   // Default is "}}"
				// Build regex with new delimiters
				//          tag    (followed by / space or })   or cvtr+colon or html or code
				rTag = "(?:(?:(\\w+(?=[\\/\\s\\" + delimCloseChar0 + "]))|(?:(\\w+)?(:)|(>)|!--((?:[^-]|-(?!-))*)--|(\\*)))"
				+ "\\s*((?:[^\\" + delimCloseChar0 + "]|\\" + delimCloseChar0 + "(?!\\" + delimCloseChar1 + "))*?)";

				// make rTag available to JsViews (or other components) for parsing binding expressions
				$sub.rTag = rTag + ")";

				rTag = new RegExp(openChars + rTag + "(\\/)?|(?:\\/(\\w+)))" + closeChars, "g");

				// Default:    bind           tag       converter colon html     comment            code      params            slash   closeBlock
				//           /{(\^)?{(?:(?:(\w+(?=[\/\s}]))|(?:(\w+)?(:)|(>)|!--((?:[^-]|-(?!-))*)--|(\*)))\s*((?:[^}]|}(?!}))*?)(\/)?|(?:\/(\w+)))}}/g

				rTmplString = new RegExp("<.*>|([^\\\\]|^)[{}]|" + openChars + ".*" + closeChars);
				// rTmplString looks for html tags or { or } char not preceded by \\, or JsRender tags {{xxx}}. Each of these strings are considered
				// NOT to be jQuery selectors
			}
			return [delimOpenChar0, delimOpenChar1, delimCloseChar0, delimCloseChar1, linkChar];
		}

		//=========
		// View.get
		//=========

		function getView(inner, type) { //view.get(inner, type)
			if (!type) {
				// view.get(type)
				type = inner;
				inner = undefined;
			}

			var views, i, l, found,
				view = this,
				root = !type || type === "root";
			// If type is undefined, returns root view (view under top view).

			if (inner) {
				// Go through views - this one, and all nested ones, depth-first - and return first one with given type.
				found = view.type === type ? view : undefined;
				if (!found) {
					views = view.views;
					if (view._.useKey) {
						for (i in views) {
							if (found = views[i].get(inner, type)) {
								break;
							}
						}
					} else {
						for (i = 0, l = views.length; !found && i < l; i++) {
							found = views[i].get(inner, type);
						}
					}
				}
			} else if (root) {
				// Find root view. (view whose parent is top view)
				while (view.parent.parent) {
					found = view = view.parent;
				}
			} else {
				while (view && !found) {
					// Go through views - this one, and all parent ones - and return first one with given type.
					found = view.type === type ? view : undefined;
					view = view.parent;
				}
			}
			return found;
		}

		function getNestedIndex() {
			var view = this.get("item");
			return view ? view.index : undefined;
		}

		getNestedIndex.depends = function() {
			return [this.get("item"), "index"];
		};

		function getIndex() {
			return this.index;
		}

		getIndex.depends = function() {
			return ["index"];
		};

		//==========
		// View.hlp
		//==========

		function getHelper(helper) {
			// Helper method called as view.hlp(key) from compiled template, for helper functions or template parameters ~foo
			var wrapped,
				view = this,
				ctx = view.linkCtx,
				res = (view.ctx || {})[helper];

			if (res === undefined && ctx && ctx.ctx) {
				res = ctx.ctx[helper];
			}
			if (res === undefined) {
				res = $helpers[helper];
			}

			if (res) {
				if ($isFunction(res) && !res._wrp) {
					wrapped = function() {
						// If it is of type function, and not already wrapped, we will wrap it, so if called with no this pointer it will be called with the
						// view as 'this' context. If the helper ~foo() was in a data-link expression, the view will have a 'temporary' linkCtx property too.
						// Note that helper functions on deeper paths will have specific this pointers, from the preceding path.
						// For example, ~util.foo() will have the ~util object as 'this' pointer
						return res.apply((!this || this === global) ? view : this, arguments);
					};
					wrapped._wrp = true;
					$extend(wrapped, res); // Attach same expandos (if any) to the wrapped function
				}
			}
			return wrapped || res;
		}

		//==============
		// jsviews._cnvt
		//==============

		function convertVal(converter, view, tagCtx, onError) {
			// self is template object or linkCtx object
			var tag, value,
			// if tagCtx is an integer, then it is the key for the compiled function to return the boundTag tagCtx
				boundTag = +tagCtx === tagCtx && view.tmpl.bnds[tagCtx-1],
				linkCtx = view.linkCtx; // For data-link="{cvt:...}"...

			onError = onError !== undefined && {props: {}, args: [onError]};

			tagCtx = onError || (boundTag ? boundTag(view.data, view, $views) : tagCtx);

			value = tagCtx.args[0];
			if (converter || boundTag) {
				tag = linkCtx && linkCtx.tag;
				if (!tag) {
					tag = {
						_: {
							inline: !linkCtx,
							bnd: boundTag
						},
						tagName: ":",
						cvt: converter,
						flow: true,
						tagCtx: tagCtx,
						_is: "tag"
					};
					if (linkCtx) {
						linkCtx.tag = tag;
						tag.linkCtx = linkCtx;
						tagCtx.ctx = extendCtx(tagCtx.ctx, linkCtx.view.ctx);
					}
					$sub._lnk(tag);
				}
				tag._er = onError && value;
				tagHandlersFromProps(tag, tagCtx);

				tagCtx.view = view;

				tag.ctx = tagCtx.ctx || {};
				delete tagCtx.ctx;
				// Provide this tag on view, for addBindingMarkers on bound tags to add the tag to view._.bnds, associated with the tag id,
				view._.tag = tag;

				value = convertArgs(tag, tag.convert || converter !== "true" && converter)[0]; // If there is a convertBack but no convert, converter will be "true"

				// Call onRender (used by JsViews if present, to add binding annotations around rendered content)
				value = boundTag && view._.onRender
					? view._.onRender(value, view, boundTag)
					: value;
				view._.tag = undefined;
			}
			return value != undefined ? value : "";
		}

		function convertArgs(tag, converter) {
			var tagCtx = tag.tagCtx,
				view = tagCtx.view,
				args = tagCtx.args;

			converter = converter && ("" + converter === converter
				? (view.getRsc("converters", converter) || error("Unknown converter: '" + converter + "'"))
				: converter);

			args = !args.length && !tagCtx.index // On the opening tag with no args, bind to the current data context
				? [view.data]
				: converter
				? args.slice() // If there is a converter, use a copy of the tagCtx.args array for rendering, and replace the args[0] in
				// the copied array with the converted value. But we do not modify the value of tag.tagCtx.args[0] (the original args array)
				: args; // If no converter, render with the original tagCtx.args

			if (converter) {
				if (converter.depends) {
					tag.depends = $sub.getDeps(tag.depends, tag, converter.depends, converter);
				}
				args[0] = converter.apply(tag, args);
			}
			return args;
		}

		//=============
		// jsviews._tag
		//=============

		function getResource(resourceType, itemName) {
			var res, store,
				view = this;
			while ((res === undefined) && view) {
				store = view.tmpl[resourceType];
				res = store && store[itemName];
				view = view.parent;
			}
			return res || $views[resourceType][itemName];
		}

		function renderTag(tagName, parentView, tmpl, tagCtxs, isUpdate, onError) {
			// Called from within compiled template function, to render a template tag
			// Returns the rendered tag

			var tag, tags, attr, parentTag, i, l, itemRet, tagCtx, tagCtxCtx, content, tagDef,
				callInit, mapDef, thisMap, args, props, initialTmpl,
				ret = "",
				linkCtx = parentView.linkCtx || 0,
				ctx = parentView.ctx,
				parentTmpl = tmpl || parentView.tmpl,
			// if tagCtx is an integer, then it is the key for the compiled function to return the boundTag tagCtxs
				boundTag = +tagCtxs === tagCtxs && parentTmpl.bnds[tagCtxs-1];

			if (tagName._is === "tag") {
				tag = tagName;
				tagName = tag.tagName;
				tagCtxs = tag.tagCtxs;
			}
			tag = tag || linkCtx.tag;

			onError = onError !== undefined && (ret += onError, [{props: {}, args: []}]);

			tagCtxs = onError || (boundTag ? boundTag(parentView.data, parentView, $views) : tagCtxs);

			l = tagCtxs.length;
			for (i = 0; i < l; i++) {
				if (!i && (!tmpl || !tag)) {
					tagDef = parentView.getRsc("tags", tagName) || error("Unknown tag: {{" + tagName + "}}");
				}
				tagCtx = tagCtxs[i];
				if (!linkCtx.tag || tag._er) {
					// We are initializing tag, so for block tags, tagCtx.tmpl is an integer > 0
					content = tagCtx.tmpl;
					content = tagCtx.content = content && parentTmpl.tmpls[content - 1];

					$extend(tagCtx, {
						tmpl: (tag ? tag : tagDef).template || content, // Set the tmpl property to the content of the block tag
						render: renderContent,
						index: i,
						view: parentView,
						ctx: extendCtx(tagCtx.ctx, ctx) // Extend parentView.ctx

						// Possible future feature:
						//var updatedValueOfArg0 = this.tagCtx.get(0);
						//var updatedValueOfPropFoo = this.tagCtx.get("foo");
						//var updatedValueOfCtxPropFoo = this.tagCtx.get("~foo");
						//_fns: {},
						//get: function(key) {
						//	return (this._fns[key] = this._fns[key] || new Function("data,view,j,u",
						//		"return " + $.views.sub.parse(this.params[+key === key ? "args" : (key.charAt(0) === "~" ? (key = key.slice(1), "ctx") : "props")][key]) + ";")
						//	)(this.view.data, this.view, $views);
						//},
					});
				}
				if (tmpl = tagCtx.props.tmpl) {
					// If the tmpl property is overridden, set the value (when initializing, or, in case of binding: ^tmpl=..., when updating)
					tmpl = "" + tmpl === tmpl // if a string
						? parentView.getRsc("templates", tmpl) || $templates(tmpl)
						: tmpl;

					tagCtx.tmpl = tmpl;
				}

				if (!tag) {
					// This will only be hit for initial tagCtx (not for {{else}}) - if the tag instance does not exist yet
					// Instantiate tag if it does not yet exist
					if (tagDef._ctr) {
						// If the tag has not already been instantiated, we will create a new instance.
						// ~tag will access the tag, even within the rendering of the template content of this tag.
						// From child/descendant tags, can access using ~tag.parent, or ~parentTags.tagName
						tag = new tagDef._ctr();
						callInit = !!tag.init;
					} else {
						// This is a simple tag declared as a function, or with init set to false. We won't instantiate a specific tag constructor - just a standard instance object.
						$sub._lnk(tag = {
							// tag instance object if no init constructor
							render: tagDef.render
						});
					}
					tag._ = {
						inline: !linkCtx
					};
					if (linkCtx) {
						linkCtx.tag = tag;
						tag.linkCtx = linkCtx;
					}
					if (tag._.bnd = boundTag || linkCtx.fn) {
						// Bound if {^{tag...}} or data-link="{tag...}"
						tag._.arrVws = {};
					} else if (tag.dataBoundOnly) {
						error("{^{" + tagName + "}} tag must be data-bound");
					}
					tag.tagName = tagName;
					tag.parent = parentTag = ctx && ctx.tag;
					tag._is = "tag";
					tag._def = tagDef;
					tag.tagCtxs = tagCtxs;

					//TODO better perf for childTags() - keep child tag.tags array, (and remove child, when disposed)
					// tag.tags = [];
					// Provide this tag on view, for addBindingMarkers on bound tags to add the tag to view._.bnds, associated with the tag id
				}
				tagCtx.tag = tag;
				if (tag.dataMap && tag.tagCtxs) {
					tagCtx.map = tag.tagCtxs[i].map; // Copy over the compiled map instance from the previous tagCtxs to the refreshed ones
				}
				if (!tag.flow) {
					tagCtxCtx = tagCtx.ctx = tagCtx.ctx || {};

					// tags hash: tag.ctx.tags, merged with parentView.ctx.tags,
					tags = tag.parents = tagCtxCtx.parentTags = ctx && extendCtx(tagCtxCtx.parentTags, ctx.parentTags) || {};
					if (parentTag) {
						tags[parentTag.tagName] = parentTag;
						//TODO better perf for childTags: parentTag.tags.push(tag);
					}
					tags[tag.tagName] = tagCtxCtx.tag = tag;
				}
			}
			parentView._.tag = tag;
			if (!(tag._er = onError)) {
				tagHandlersFromProps(tag, tagCtxs[0]);
				tag.rendering = {}; // Provide object for state during render calls to tag and elses. (Used by {{if}} and {{for}}...)
				for (i = 0; i < l; i++) {
					tagCtx = tag.tagCtx = tag.tagCtxs[i];
					props = tagCtx.props;
					args = convertArgs(tag, tag.convert);

					if (mapDef = props.dataMap || tag.dataMap) {
						if (args.length || props.dataMap) {
							thisMap = tagCtx.map;
							if (!thisMap || thisMap.src !== args[0] || isUpdate) {
								if (thisMap && thisMap.src) {
									thisMap.unmap(); // only called if observable map - not when only used in JsRender, e.g. by {{props}}
								}
								thisMap = tagCtx.map = mapDef.map(args[0], props);
							}
							args = [thisMap.tgt];
						}
					}
					tag.ctx = tagCtx.ctx;

					if (!i && callInit) {
						initialTmpl = tag.template;
						tag.init(tagCtx, linkCtx, tag.ctx);
						callInit = undefined;
						if (tag.template !== initialTmpl) {
							tag._.tmpl = tag.template; // This will override the tag.template and also tagCtx.props.tmpl for all tagCtxs
						}
						if (linkCtx) {
							// Set attr on linkCtx to ensure outputting to the correct target attribute.
							// Setting either linkCtx.attr or this.attr in the init() allows per-instance choice of target attrib.
							linkCtx.attr = tag.attr = linkCtx.attr || tag.attr;
						}
					}

					itemRet = undefined;
					if (tag.render) {
						itemRet = tag.render.apply(tag, args);
					}
					args = args.length ? args : [parentView]; // no arguments - get data context from view.
					itemRet = itemRet !== undefined
						? itemRet // Return result of render function unless it is undefined, in which case return rendered template
						: tagCtx.render(args[0], true) || (isUpdate ? undefined : "");
					// No return value from render, and no template/content tagCtx.render(...), so return undefined
					ret = ret ? ret + (itemRet || "") : itemRet; // If no rendered content, this will be undefined
				}

				delete tag.rendering;
			}
			tag.tagCtx = tag.tagCtxs[0];
			tag.ctx = tag.tagCtx.ctx;

			if (tag._.inline && (attr = tag.attr) && attr !== htmlStr) {
				// inline tag with attr set to "text" will insert HTML-encoded content - as if it was element-based innerText
				ret = attr === "text"
					? $converters.html(ret)
					: "";
			}
			return boundTag && parentView._.onRender
				// Call onRender (used by JsViews if present, to add binding annotations around rendered content)
				? parentView._.onRender(ret, parentView, boundTag)
				: ret;
		}

		//=================
		// View constructor
		//=================

		function View(context, type, parentView, data, template, key, contentTmpl, onRender) {
			// Constructor for view object in view hierarchy. (Augmented by JsViews if JsViews is loaded)
			var views, parentView_, tag,
				self = this,
				isArray = type === "array",
				self_ = {
					key: 0,
					useKey: isArray ? 0 : 1,
					id: "" + viewId++,
					onRender: onRender,
					bnds: {}
				};

			self.data = data;
			self.tmpl = template,
				self.content = contentTmpl;
			self.views = isArray ? [] : {};
			self.parent = parentView;
			self.type = type || "top";
			// If the data is an array, this is an 'array view' with a views array for each child 'item view'
			// If the data is not an array, this is an 'item view' with a views 'hash' object for any child nested views
			// ._.useKey is non zero if is not an 'array view' (owning a data array). Use this as next key for adding to child views hash
			self._ = self_;
			self.linked = !!onRender;
			if (parentView) {
				views = parentView.views;
				parentView_ = parentView._;
				if (parentView_.useKey) {
					// Parent is an 'item view'. Add this view to its views object
					// self._key = is the key in the parent view hash
					views[self_.key = "_" + parentView_.useKey++] = self;
					self.index = indexStr;
					self.getIndex = getNestedIndex;
					tag = parentView_.tag;
					self_.bnd = isArray && (!tag || !!tag._.bnd && tag); // For array views that are data bound for collection change events, set the
					// view._.bnd property to true for top-level link() or data-link="{for}", or to the tag instance for a data-bound tag, e.g. {^{for ...}}
				} else {
					// Parent is an 'array view'. Add this view to its views array
					views.splice(
						// self._.key = self.index - the index in the parent view array
						self_.key = self.index = key,
						0, self);
				}
				// If no context was passed in, use parent context
				// If context was passed in, it should have been merged already with parent context
				self.ctx = context || parentView.ctx;
			} else {
				self.ctx = context;
			}
		}

		View.prototype = {
			get: getView,
			getIndex: getIndex,
			getRsc: getResource,
			hlp: getHelper,
			_is: "view"
		};

		//=============
		// Registration
		//=============

		function compileChildResources(parentTmpl) {
			var storeName, resources, resourceName, resource, settings, compile, onStore;
			for (storeName in jsvStores) {
				settings = jsvStores[storeName];
				if ((compile = settings.compile) && (resources = parentTmpl[storeName + "s"])) {
					for (resourceName in resources) {
						// compile child resource declarations (templates, tags, tags["for"] or helpers)
						resource = resources[resourceName] = compile(resourceName, resources[resourceName], parentTmpl);
						if (resource && (onStore = $sub.onStore[storeName])) {
							// e.g. JsViews integration
							onStore(resourceName, resource, compile);
						}
					}
				}
			}
		}

		function compileTag(name, tagDef, parentTmpl) {
			var init, tmpl;
			if ($isFunction(tagDef)) {
				// Simple tag declared as function. No presenter instantation.
				tagDef = {
					depends: tagDef.depends,
					render: tagDef
				};
			} else {
				if (tagDef.baseTag) {
					tagDef.flow = !!tagDef.flow; // default to false even if baseTag has flow=true
					tagDef = $extend($extend({}, tagDef.baseTag), tagDef);
				}
				// Tag declared as object, used as the prototype for tag instantiation (control/presenter)
				if ((tmpl = tagDef.template) !== undefined) {
					tagDef.template = "" + tmpl === tmpl ? ($templates[tmpl] || $templates(tmpl)) : tmpl;
				}
				if (tagDef.init !== false) {
					// Set int: false on tagDef if you want to provide just a render method, or render and template, but no constuctor or prototype.
					// so equivalent to setting tag to render function, except you can also provide a template.
					init = tagDef._ctr = function() {};
					(init.prototype = tagDef).constructor = init;
				}
			}
			if (parentTmpl) {
				tagDef._parentTmpl = parentTmpl;
			}
			return tagDef;
		}

		function compileTmpl(name, tmpl, parentTmpl, options) {
			// tmpl is either a template object, a selector for a template script block, the name of a compiled template, or a template object

			//==== nested functions ====
			function tmplOrMarkupFromStr(value) {
				// If value is of type string - treat as selector, or name of compiled template
				// Return the template object, if already compiled, or the markup string

				if (("" + value === value) || value.nodeType > 0) {
					try {
						elem = value.nodeType > 0
							? value
							: !rTmplString.test(value)
							// If value is a string and does not contain HTML or tag content, then test as selector
						&& jQuery && jQuery(global.document).find(value)[0]; // TODO address case where DOM is not available
						// If selector is valid and returns at least one element, get first element
						// If invalid, jQuery will throw. We will stay with the original string.
					} catch (e) {}

					if (elem) {
						// Generally this is a script element.
						// However we allow it to be any element, so you can for example take the content of a div,
						// use it as a template, and replace it by the same content rendered against data.
						// e.g. for linking the content of a div to a container, and using the initial content as template:
						// $.link("#content", model, {tmpl: "#content"});

						value = $templates[name = name || elem.getAttribute(tmplAttr)];
						if (!value) {
							// Not already compiled and cached, so compile and cache the name
							// Create a name for compiled template if none provided
							name = name || "_" + autoTmplName++;
							elem.setAttribute(tmplAttr, name);
							// Use tmpl as options
							value = $templates[name] = compileTmpl(name, elem.innerHTML, parentTmpl, options);
						}
						elem = undefined;
					}
					return value;
				}
				// If value is not a string, return undefined
			}

			var tmplOrMarkup, elem;

			//==== Compile the template ====
			tmpl = tmpl || "";
			tmplOrMarkup = tmplOrMarkupFromStr(tmpl);

			// If options, then this was already compiled from a (script) element template declaration.
			// If not, then if tmpl is a template object, use it for options
			options = options || (tmpl.markup ? tmpl : {});
			options.tmplName = name;
			if (parentTmpl) {
				options._parentTmpl = parentTmpl;
			}
			// If tmpl is not a markup string or a selector string, then it must be a template object
			// In that case, get it from the markup property of the object
			if (!tmplOrMarkup && tmpl.markup && (tmplOrMarkup = tmplOrMarkupFromStr(tmpl.markup))) {
				if (tmplOrMarkup.fn && (tmplOrMarkup.debug !== tmpl.debug || tmplOrMarkup.allowCode !== tmpl.allowCode)) {
					// if the string references a compiled template object, but the debug or allowCode props are different, need to recompile
					tmplOrMarkup = tmplOrMarkup.markup;
				}
			}
			if (tmplOrMarkup !== undefined) {
				if (name && !parentTmpl) {
					$render[name] = function() {
						return tmpl.render.apply(tmpl, arguments);
					};
				}
				if (tmplOrMarkup.fn || tmpl.fn) {
					// tmpl is already compiled, so use it, or if different name is provided, clone it
					if (tmplOrMarkup.fn) {
						if (name && name !== tmplOrMarkup.tmplName) {
							tmpl = extendCtx(options, tmplOrMarkup);
						} else {
							tmpl = tmplOrMarkup;
						}
					}
				} else {
					// tmplOrMarkup is a markup string, not a compiled template
					// Create template object
					tmpl = TmplObject(tmplOrMarkup, options);
					// Compile to AST and then to compiled function
					tmplFn(tmplOrMarkup.replace(rEscapeQuotes, "\\$&"), tmpl);
				}
				compileChildResources(options);
				return tmpl;
			}
		}

		function dataMap(mapDef) {
			function newMap(source, options) {
				this.tgt = mapDef.getTgt(source, options);
			}

			if ($isFunction(mapDef)) {
				// Simple map declared as function
				mapDef = {
					getTgt: mapDef
				};
			}

			if (mapDef.baseMap) {
				mapDef = $extend($extend({}, mapDef.baseMap), mapDef);
			}

			mapDef.map = function(source, options) {
				return new newMap(source, options);
			};
			return mapDef;
		}

		//==== /end of function compile ====

		function TmplObject(markup, options) {
			// Template object constructor
			var htmlTag,
				wrapMap = $viewsSettings.wrapMap || {},
				tmpl = $extend(
					{
						markup: markup,
						tmpls: [],
						links: {}, // Compiled functions for link expressions
						tags: {}, // Compiled functions for bound tag expressions
						bnds: [],
						_is: "template",
						render: fastRender
					},
					options
				);

			if (!options.htmlTag) {
				// Set tmpl.tag to the top-level HTML tag used in the template, if any...
				htmlTag = rFirstElem.exec(markup);
				tmpl.htmlTag = htmlTag ? htmlTag[1].toLowerCase() : "";
			}
			htmlTag = wrapMap[tmpl.htmlTag];
			if (htmlTag && htmlTag !== wrapMap.div) {
				// When using JsViews, we trim templates which are inserted into HTML contexts where text nodes are not rendered (i.e. not 'Phrasing Content').
				// Currently not trimmed for <li> tag. (Not worth adding perf cost)
				tmpl.markup = $.trim(tmpl.markup);
			}

			return tmpl;
		}

		function registerStore(storeName, storeSettings) {

			function theStore(name, item, parentTmpl) {
				// The store is also the function used to add items to the store. e.g. $.templates, or $.views.tags

				// For store of name 'thing', Call as:
				//    $.views.things(items[, parentTmpl]),
				// or $.views.things(name, item[, parentTmpl])

				var onStore, compile, itemName, thisStore;

				if (name && typeof name === "object" && !name.nodeType && !name.markup && !name.getTgt) {
					// Call to $.views.things(items[, parentTmpl]),

					// Adding items to the store
					// If name is a hash, then item is parentTmpl. Iterate over hash and call store for key.
					for (itemName in name) {
						theStore(itemName, name[itemName], item);
					}
					return $views;
				}
				// Adding a single unnamed item to the store
				if (item === undefined) {
					item = name;
					name = undefined;
				}
				if (name && "" + name !== name) { // name must be a string
					parentTmpl = item;
					item = name;
					name = undefined;
				}
				thisStore = parentTmpl ? parentTmpl[storeNames] = parentTmpl[storeNames] || {} : theStore;
				compile = storeSettings.compile;
				if (item === null) {
					// If item is null, delete this entry
					name && delete thisStore[name];
				} else {
					item = compile ? (item = compile(name, item, parentTmpl)) : item;
					name && (thisStore[name] = item);
				}
				if (compile && item) {
					item._is = storeName; // Only do this for compiled objects (tags, templates...)
				}
				if (item && (onStore = $sub.onStore[storeName])) {
					// e.g. JsViews integration
					onStore(name, item, compile);
				}
				return item;
			}

			var storeNames = storeName + "s";

			$views[storeNames] = theStore;
			jsvStores[storeName] = storeSettings;
		}

		//==============
		// renderContent
		//==============

		function $fastRender(data, context, noIteration) {
			var tmplElem = this.jquery && (this[0] || error('Unknown template: "' + this.selector + '"')),
				tmpl = tmplElem.getAttribute(tmplAttr);

			return fastRender.call(tmpl ? $templates[tmpl] : $templates(tmplElem), data, context, noIteration);
		}

		function tryFn(tmpl, data, view) {
			if ($viewsSettings._dbgMode) {
				try {
					return tmpl.fn(data, view, $views);
				}
				catch (e) {
					return error(e, view);
				}
			}
			return tmpl.fn(data, view, $views);
		}

		function fastRender(data, context, noIteration, parentView, key, onRender) {
			var self = this;
			if (!parentView && self.fn._nvw && !$.isArray(data)) {
				return tryFn(self, data, {tmpl: self});
			}
			return renderContent.call(self, data, context, noIteration, parentView, key, onRender);
		}

		function renderContent(data, context, noIteration, parentView, key, onRender) {
			// Render template against data as a tree of subviews (nested rendered template instances), or as a string (top-level template).
			// If the data is the parent view, treat as noIteration, re-render with the same data context.
			var i, l, dataItem, newView, childView, itemResult, swapContent, tagCtx, contentTmpl, tag_, outerOnRender, tmplName, tmpl, noViews,
				self = this,
				result = "";

			if (!!context === context) {
				noIteration = context; // passing boolean as second param - noIteration
				context = undefined;
			}

			if (key === true) {
				swapContent = true;
				key = 0;
			}

			if (self.tag) {
				// This is a call from renderTag or tagCtx.render(...)
				tagCtx = self;
				self = self.tag;
				tag_ = self._;
				tmplName = self.tagName;
				tmpl = tag_.tmpl || tagCtx.tmpl;
				noViews = self.attr && self.attr !== htmlStr,
					context = extendCtx(context, self.ctx);
				contentTmpl = tagCtx.content; // The wrapped content - to be added to views, below
				if (tagCtx.props.link === false) {
					// link=false setting on block tag
					// We will override inherited value of link by the explicit setting link=false taken from props
					// The child views of an unlinked view are also unlinked. So setting child back to true will not have any effect.
					context = context || {};
					context.link = false;
				}
				parentView = parentView || tagCtx.view;
				data = arguments.length ? data : parentView;
			} else {
				tmpl = self;
			}

			if (tmpl) {
				if (!parentView && data && data._is === "view") {
					parentView = data; // When passing in a view to render or link (and not passing in a parent view) use the passed in view as parentView
				}
				if (parentView) {
					contentTmpl = contentTmpl || parentView.content; // The wrapped content - to be added as #content property on views, below
					onRender = onRender || parentView._.onRender;
					if (data === parentView) {
						// Inherit the data from the parent view.
						// This may be the contents of an {{if}} block
						data = parentView.data;
					}
					context = extendCtx(context, parentView.ctx);
				}
				if (!parentView || parentView.type === "top") {
					(context = context || {}).root = data; // Provide ~root as shortcut to top-level data.
				}

				// Set additional context on views created here, (as modified context inherited from the parent, and to be inherited by child views)
				// Note: If no jQuery, $extend does not support chained copies - so limit extend() to two parameters

				if (!tmpl.fn) {
					tmpl = $templates[tmpl] || $templates(tmpl);
				}

				if (tmpl) {
					onRender = (context && context.link) !== false && !noViews && onRender;
					// If link===false, do not call onRender, so no data-linking marker nodes
					outerOnRender = onRender;
					if (onRender === true) {
						// Used by view.refresh(). Don't create a new wrapper view.
						outerOnRender = undefined;
						onRender = parentView._.onRender;
					}
					context = tmpl.helpers
						? extendCtx(tmpl.helpers, context)
						: context;
					if ($.isArray(data) && !noIteration) {
						// Create a view for the array, whose child views correspond to each data item. (Note: if key and parentView are passed in
						// along with parent view, treat as insert -e.g. from view.addViews - so parentView is already the view item for array)
						newView = swapContent
							? parentView :
						(key !== undefined && parentView) || new View(context, "array", parentView, data, tmpl, key, contentTmpl, onRender);
						for (i = 0, l = data.length; i < l; i++) {
							// Create a view for each data item.
							dataItem = data[i];
							childView = new View(context, "item", newView, dataItem, tmpl, (key || 0) + i, contentTmpl, onRender);
							itemResult = tryFn(tmpl, dataItem, childView);
							result += newView._.onRender ? newView._.onRender(itemResult, childView) : itemResult;
						}
					} else {
						// Create a view for singleton data object. The type of the view will be the tag name, e.g. "if" or "myTag" except for
						// "item", "array" and "data" views. A "data" view is from programmatic render(object) against a 'singleton'.
						if (parentView || !tmpl.fn._nvw) {
							newView = swapContent ? parentView : new View(context, tmplName || "data", parentView, data, tmpl, key, contentTmpl, onRender);
							if (tag_ && !self.flow) {
								newView.tag = self;
							}
						}
						result += tryFn(tmpl, data, newView);
					}
					return outerOnRender ? outerOnRender(result, newView) : result;
				}
			}
			return "";
		}

		//===========================
		// Build and compile template
		//===========================

		// Generate a reusable function that will serve to render a template against data
		// (Compile AST then build template function)

		function error(e, view, fallback) {
			var message = $viewsSettings.onError(e, view, fallback);
			if ("" + e === e) { // if e is a string, not an Exception, then throw new Exception
				throw new $sub.Err(message);
			}
			return !view.linkCtx && view.linked ? $converters.html(message) : message;
		}

		function syntaxError(message) {
			error("Syntax error\n" + message);
		}

		function tmplFn(markup, tmpl, isLinkExpr, convertBack) {
			// Compile markup to AST (abtract syntax tree) then build the template function code from the AST nodes
			// Used for compiling templates, and also by JsViews to build functions for data link expressions

			//==== nested functions ====
			function pushprecedingContent(shift) {
				shift -= loc;
				if (shift) {
					content.push(markup.substr(loc, shift).replace(rNewLine, "\\n"));
				}
			}

			function blockTagCheck(tagName) {
				tagName && syntaxError('Unmatched or missing tag: "{{/' + tagName + '}}" in template:\n' + markup);
			}

			function parseTag(all, bind, tagName, converter, colon, html, comment, codeTag, params, slash, closeBlock, index) {

				//    bind         tag        converter colon html     comment            code      params            slash   closeBlock
				// /{(\^)?{(?:(?:(\w+(?=[\/\s}]))|(?:(\w+)?(:)|(>)|!--((?:[^-]|-(?!-))*)--|(\*)))\s*((?:[^}]|}(?!}))*?)(\/)?|(?:\/(\w+)))}}/g
				// Build abstract syntax tree (AST): [tagName, converter, params, content, hash, bindings, contentMarkup]
				if (html) {
					colon = ":";
					converter = htmlStr;
				}
				slash = slash || isLinkExpr;

				var pathBindings = (bind || isLinkExpr) && [[]],
					props = "",
					args = "",
					ctxProps = "",
					paramsArgs = "",
					paramsProps = "",
					paramsCtxProps = "",
					onError = "",
					useTrigger = "",
				// Block tag if not self-closing and not {{:}} or {{>}} (special case) and not a data-link expression
					block = !slash && !colon && !comment;

				//==== nested helper function ====
				tagName = tagName || (params = params || "#data", colon); // {{:}} is equivalent to {{:#data}}
				pushprecedingContent(index);
				loc = index + all.length; // location marker - parsed up to here
				if (codeTag) {
					if (allowCode) {
						content.push(["*", "\n" + params.replace(rUnescapeQuotes, "$1") + "\n"]);
					}
				} else if (tagName) {
					if (tagName === "else") {
						if (rTestElseIf.test(params)) {
							syntaxError('for "{{else if expr}}" use "{{else expr}}"');
						}
						pathBindings = current[7];
						current[8] = markup.substring(current[8], index); // contentMarkup for block tag
						current = stack.pop();
						content = current[2];
						block = true;
					}
					if (params) {
						// remove newlines from the params string, to avoid compiled code errors for unterminated strings
						parseParams(params.replace(rNewLine, " "), pathBindings, tmpl)
							.replace(rBuildHash, function(all, onerror, isCtx, key, keyToken, keyValue, arg, param) {
								if (arg) {
									args += keyValue + ",";
									paramsArgs += "'" + param + "',";
								} else if (isCtx) {
									ctxProps += key + keyValue + ",";
									paramsCtxProps += key + "'" + param + "',";
								} else if (onerror) {
									onError += keyValue;
								} else {
									if (keyToken === "trigger") {
										useTrigger += keyValue;
									}
									props += key + keyValue + ",";
									paramsProps += key + "'" + param + "',";
									hasHandlers = hasHandlers || rHasHandlers.test(keyToken);
								}
								return "";
							}).slice(0, -1);

						if (pathBindings && pathBindings[0]) {
							pathBindings.pop(); // Remove the bindings that was prepared for next arg. (There is always an extra one ready).
						}
					}

					newNode = [
						tagName,
						converter || !!convertBack || hasHandlers || "",
						block && [],
						parsedParam(paramsArgs, paramsProps, paramsCtxProps),
						parsedParam(args, props, ctxProps),
						onError,
						useTrigger,
						pathBindings || 0
					];
					content.push(newNode);
					if (block) {
						stack.push(current);
						current = newNode;
						current[8] = loc; // Store current location of open tag, to be able to add contentMarkup when we reach closing tag
					}
				} else if (closeBlock) {
					blockTagCheck(closeBlock !== current[0] && current[0] !== "else" && closeBlock);
					current[8] = markup.substring(current[8], index); // contentMarkup for block tag
					current = stack.pop();
				}
				blockTagCheck(!current && closeBlock);
				content = current[2];
			}
			//==== /end of nested functions ====

			var result, newNode, hasHandlers,
				allowCode = tmpl && tmpl.allowCode,
				astTop = [],
				loc = 0,
				stack = [],
				content = astTop,
				current = [,,astTop];

//TODO	result = tmplFnsCache[markup]; // Only cache if template is not named and markup length < ...,
//and there are no bindings or subtemplates?? Consider standard optimization for data-link="a.b.c"
//		if (result) {
//			tmpl.fn = result;
//		} else {

//		result = markup;
			if (isLinkExpr) {
				markup = delimOpenChar0 + markup + delimCloseChar1;
			}

			blockTagCheck(stack[0] && stack[0][2].pop()[0]);
			// Build the AST (abstract syntax tree) under astTop
			markup.replace(rTag, parseTag);

			pushprecedingContent(markup.length);

			if (loc = astTop[astTop.length - 1]) {
				blockTagCheck("" + loc !== loc && (+loc[8] === loc[8]) && loc[0]);
			}
//			result = tmplFnsCache[markup] = buildCode(astTop, tmpl);
//		}

			if (isLinkExpr) {
				result = buildCode(astTop, markup, isLinkExpr);
				setPaths(result, astTop[0][7]); // With data-link expressions, pathBindings array is astTop[0][7]
			} else {
				result = buildCode(astTop, tmpl);
			}
			if (result._nvw) {
				result._nvw = !/[~#]/.test(markup);
			}
			return result;
		}

		function setPaths(fn, paths) {
			fn.deps = [];
			for (var key in paths) {
				if (key !== "_jsvto" && paths[key].length) {
					fn.deps = fn.deps.concat(paths[key]);
				}
			}
			fn.paths = paths;
		}

		function parsedParam(args, props, ctx) {
			return [args.slice(0, -1), props.slice(0, -1), ctx.slice(0, -1)];
		}

		function paramStructure(parts, type) {
			return '\n\t' + (type ? type + ':{' : '') + 'args:[' + parts[0] + ']' + (parts[1] || !type ? ',\n\tprops:{' + parts[1] + '}' : "") + (parts[2] ? ',\n\tctx:{' + parts[2] + '}' : "");
		}

		function parseParams(params, pathBindings, tmpl) {

			function parseTokens(all, lftPrn0, lftPrn, bound, path, operator, err, eq, path2, prn, comma, lftPrn2, apos, quot, rtPrn, rtPrnDot, prn2, space, index, full) {
				//rParams = /(\()(?=\s*\()|(?:([([])\s*)?(?:(\^?)(!*?[#~]?[\w$.^]+)?\s*((\+\+|--)|\+|-|&&|\|\||===|!==|==|!=|<=|>=|[<>%*:?\/]|(=))\s*|(!*?[#~]?[\w$.^]+)([([])?)|(,\s*)|(\(?)\\?(?:(')|("))|(?:\s*(([)\]])(?=\s*\.|\s*\^)|[)\]])([([]?))|(\s+)/g,
				//          lftPrn0        lftPrn        bound            path    operator err                                                eq             path2       prn    comma   lftPrn2   apos quot      rtPrn rtPrnDot                    prn2   space
				// (left paren? followed by (path? followed by operator) or (path followed by paren?)) or comma or apos or quot or right paren or space
				operator = operator || "";
				lftPrn = lftPrn || lftPrn0 || lftPrn2;
				path = path || path2;
				prn = prn || prn2 || "";

				var expr, isFn, exprFn,
					fullLength = full.length - 1;

				function parsePath(allPath, not, object, helper, view, viewProperty, pathTokens, leafToken) {
					// rPath = /^(?:null|true|false|\d[\d.]*|(!*?)([\w$]+|\.|~([\w$]+)|#(view|([\w$]+))?)([\w$.^]*?)(?:[.[^]([\w$]+)\]?)?)$/g,
					//                                        none   object     helper    view  viewProperty pathTokens      leafToken
					if (object) {
						if (bindings) {
							if (named === "linkTo") {
								bindto = pathBindings._jsvto = pathBindings._jsvto || [];
								bindto.push(path);
							}
							if (!named || boundName) {
								bindings.push(path.slice(not.length)); // Add path binding for paths on props and args
							}
						}
						if (object !== ".") {
							var ret = (helper
									? 'view.hlp("' + helper + '")'
									: view
									? "view"
									: "data")
								+ (leafToken
									? (viewProperty
									? "." + viewProperty
									: helper
									? ""
									: (view ? "" : "." + object)
								) + (pathTokens || "")
									: (leafToken = helper ? "" : view ? viewProperty || "" : object, ""));

							ret = ret + (leafToken ? "." + leafToken : "");

							return not + (ret.slice(0, 9) === "view.data"
								? ret.slice(5) // convert #view.data... to data...
								: ret);
						}
					}
					return allPath;
				}

				if (err && !aposed && !quoted) {
					syntaxError(params);
				} else {
					if (bindings && rtPrnDot && !aposed && !quoted) {
						// This is a binding to a path in which an object is returned by a helper/data function/expression, e.g. foo()^x.y or (a?b:c)^x.y
						// We create a compiled function to get the object instance (which will be called when the dependent data of the subexpression changes, to return the new object, and trigger re-binding of the subsequent path)
						if (!named || boundName || bindto) {
							expr = pathStart[parenDepth];
							if (fullLength > index - expr) { // We need to compile a subexpression
								expr = full.slice(expr, index + 1);
								rtPrnDot = delimOpenChar1 + ":" + expr // The parameter or function subexpression
								+ " onerror=''" // set onerror='' in order to wrap generated code with a try catch - returning '' as object instance if there is an error/missing parent
								+ delimCloseChar0;
								exprFn = tmplLinks[rtPrnDot];
								if (!exprFn) {
									tmplLinks[rtPrnDot] = true; // Flag that this exprFn (for rtPrnDot) is being compiled
									tmplLinks[rtPrnDot] = exprFn = tmplFn(rtPrnDot, tmpl || bindings, true); // Compile the expression (or use cached copy already in tmpl.links)
									exprFn.paths.push({_jsvOb: exprFn}); //list.push({_jsvOb: rtPrnDot});
								}
								if (exprFn !== true) { // If not reentrant call during compilation
									(bindto || bindings).push({_jsvOb: exprFn}); // Insert special object for in path bindings, to be used for binding the compiled sub expression ()
								}
							}
						}
					}
					return (aposed
						// within single-quoted string
						? (aposed = !apos, (aposed ? all : '"'))
						: quoted
						// within double-quoted string
						? (quoted = !quot, (quoted ? all : '"'))
						:
						(
						(lftPrn
							? (parenDepth++, pathStart[parenDepth] = index++, lftPrn)
							: "")
						+ (space
							? (parenDepth
							? ""
							// New arg or prop - so insert backspace \b (\x08) as separator for named params, used subsequently by rBuildHash, and prepare new bindings array
							: (paramIndex = full.slice(paramIndex, index), named
							? (named = boundName = bindto = false, "\b")
							: "\b,") + paramIndex + (paramIndex = index + all.length, bindings && pathBindings.push(bindings = []), "\b")
						)
							: eq
							// named param. Remove bindings for arg and create instead bindings array for prop
							? (parenDepth && syntaxError(params), bindings && pathBindings.pop(), named = path, boundName = bound, paramIndex = index + all.length, bound && (bindings = pathBindings[named] = []), path + ':')
							: path
							// path
							? (path.split("^").join(".").replace(rPath, parsePath)
						+ (prn
							? (fnCall[++parenDepth] = true, path.charAt(0) !== "." && (pathStart[parenDepth] = index), isFn ? "" : prn)
							: operator)
						)
							: operator
							? operator
							: rtPrn
							// function
							? ((fnCall[parenDepth--] = false, rtPrn)
						+ (prn
							? (fnCall[++parenDepth] = true, prn)
							: "")
						)
							: comma
							? (fnCall[parenDepth] || syntaxError(params), ",") // We don't allow top-level literal arrays or objects
							: lftPrn0
							? ""
							: (aposed = apos, quoted = quot, '"')
						))
					);
				}
			}
			var named, bindto, boundName,
				quoted, // boolean for string content in double quotes
				aposed, // or in single quotes
				bindings = pathBindings && pathBindings[0], // bindings array for the first arg
				paramIndex = 0, // list,
				tmplLinks = tmpl ? tmpl.links : bindings && (bindings.links = bindings.links || {}),
				fnCall = {},
				pathStart = {0: -1},
				parenDepth = 0;
			//pushBindings();
			return (params + (tmpl ? " " : ""))
				.replace(/\)\^/g, ").") // Treat "...foo()^bar..." as equivalent to "...foo().bar..."
				//since preceding computed observables in the path will always be updated if their dependencies change
				.replace(rParams, parseTokens);
		}

		function buildCode(ast, tmpl, isLinkExpr) {
			// Build the template function code from the AST nodes, and set as property on the passed-in template object
			// Used for compiling templates, and also by JsViews to build functions for data link expressions
			var i, node, tagName, converter, tagCtx, hasTag, hasEncoder, getsVal, hasCnvt, needView, useCnvt, tmplBindings, pathBindings, params, boundOnErrStart, boundOnErrEnd,
				tagRender, nestedTmpls, tmplName, nestedTmpl, tagAndElses, content, markup, nextIsElse, oldCode, isElse, isGetVal, tagCtxFn, onError, tagStart, trigger,
				tmplBindingKey = 0,
				code = "",
				tmplOptions = {},
				l = ast.length;

			if ("" + tmpl === tmpl) {
				tmplName = isLinkExpr ? 'data-link="' + tmpl.replace(rNewLine, " ").slice(1, -1) + '"' : tmpl;
				tmpl = 0;
			} else {
				tmplName = tmpl.tmplName || "unnamed";
				if (tmpl.allowCode) {
					tmplOptions.allowCode = true;
				}
				if (tmpl.debug) {
					tmplOptions.debug = true;
				}
				tmplBindings = tmpl.bnds;
				nestedTmpls = tmpl.tmpls;
			}
			for (i = 0; i < l; i++) {
				// AST nodes: [tagName, converter, content, params, code, onError, pathBindings, contentMarkup, link]
				node = ast[i];

				// Add newline for each callout to t() c() etc. and each markup string
				if ("" + node === node) {
					// a markup string to be inserted
					code += '\n+"' + node + '"';
				} else {
					// a compiled tag expression to be inserted
					tagName = node[0];
					if (tagName === "*") {
						// Code tag: {{* }}
						code += ";\n" + node[1] + "\nret=ret";
					} else {
						converter = node[1];
						content = node[2];
						tagCtx = paramStructure(node[3], 'params') + '},' + paramStructure(params = node[4]);
						onError = node[5];
						trigger = node[6];
						markup = node[8];
						if (!(isElse = tagName === "else")) {
							tmplBindingKey = 0;
							if (tmplBindings && (pathBindings = node[7])) { // Array of paths, or false if not data-bound
								tmplBindingKey = tmplBindings.push(pathBindings);
							}
						}
						if (isGetVal = tagName === ":") {
							if (converter) {
								tagName = converter === htmlStr ? ">" : converter + tagName;
							}
						} else {
							if (content) {
								// Create template object for nested template
								nestedTmpl = TmplObject(markup, tmplOptions);
								nestedTmpl.tmplName = tmplName + "/" + tagName;
								// Compile to AST and then to compiled function
								buildCode(content, nestedTmpl);
								nestedTmpls.push(nestedTmpl);
							}

							if (!isElse) {
								// This is not an else tag.
								tagAndElses = tagName;
								// Switch to a new code string for this bound tag (and its elses, if it has any) - for returning the tagCtxs array
								oldCode = code;
								code = "";
							}
							nextIsElse = ast[i + 1];
							nextIsElse = nextIsElse && nextIsElse[0] === "else";
						}
						tagStart = onError ? ";\ntry{\nret+=" : "\n+";
						boundOnErrStart = "";
						boundOnErrEnd= "";

						if (isGetVal && (pathBindings || trigger || converter && converter !== htmlStr)) {
							// For convertVal we need a compiled function to return the new tagCtx(s)
							tagCtxFn = "return {" + tagCtx + "};";
							tagRender = 'c("' + converter + '",view,';
							tagCtxFn = new Function("data,view,j,u", " // " + tmplName + " " + tmplBindingKey + " " + tagName
							+ "\n" + tagCtxFn);
							tagCtxFn._er = onError;

							boundOnErrStart = tagRender + tmplBindingKey + ",";
							boundOnErrEnd = ")";

							tagCtxFn._tag = tagName;
							if (isLinkExpr) {
								return tagCtxFn;
							}
							setPaths(tagCtxFn, pathBindings);
							useCnvt = true;
						}
						code += (isGetVal
							? (isLinkExpr ? (onError ? "\ntry{\n" : "") + "return " : tagStart) + (useCnvt // Call _cnvt if there is a converter: {{cnvt: ... }} or {^{cnvt: ... }}
							? (useCnvt = undefined, needView = hasCnvt = true, tagRender + (pathBindings
							? ((tmplBindings[tmplBindingKey - 1] = tagCtxFn), tmplBindingKey) // Store the compiled tagCtxFn in tmpl.bnds, and pass the key to convertVal()
							: "{" + tagCtx + "}") + ")")
							: tagName === ">"
							? (hasEncoder = true, "h(" + params[0] + ')')
							: (getsVal = true, "((v=" + params[0] + ')!=null?v:"")') // Strict equality just for data-link="title{:expr}" so expr=null will remove title attribute
						)
							: (needView = hasTag = true, "\n{view:view,tmpl:" // Add this tagCtx to the compiled code for the tagCtxs to be passed to renderTag()
						+ (content ? nestedTmpls.length : "0") + "," // For block tags, pass in the key (nestedTmpls.length) to the nested content template
						+ tagCtx + "},"));

						if (tagAndElses && !nextIsElse) {
							// This is a data-link expression or an inline bound tag without any elses, or the last {{else}} of an inline bound tag
							// We complete the code for returning the tagCtxs array
							code = "[" + code.slice(0, -1) + "]";
							tagRender = 't("' + tagAndElses + '",view,this,';
							if (isLinkExpr || pathBindings) {
								// This is a bound tag (data-link expression or inline bound tag {^{tag ...}}) so we store a compiled tagCtxs function in tmp.bnds
								code = new Function("data,view,j,u", " // " + tmplName + " " + tmplBindingKey + " " + tagAndElses + "\nreturn " + code + ";");
								code._er = onError;
								code._tag = tagName;
								if (pathBindings) {
									setPaths(tmplBindings[tmplBindingKey - 1] = code, pathBindings);
								}
								if (isLinkExpr) {
									return code; // For a data-link expression we return the compiled tagCtxs function
								}
								boundOnErrStart = tagRender + tmplBindingKey + ",undefined,";
								boundOnErrEnd = ")";
							}

							// This is the last {{else}} for an inline tag.
							// For a bound tag, pass the tagCtxs fn lookup key to renderTag.
							// For an unbound tag, include the code directly for evaluating tagCtxs array
							code = oldCode + tagStart + tagRender + (tmplBindingKey || code) + ")";
							pathBindings = 0;
							tagAndElses = 0;
						}
						if (onError) {
							needView = true;
							code += ';\n}catch(e){ret' + (isLinkExpr ? "urn " : "+=") + boundOnErrStart + 'j._err(e,view,' + onError + ')' + boundOnErrEnd + ';}\n' + (isLinkExpr ? "" : 'ret=ret');
						}
					}
				}
			}
			// Include only the var references that are needed in the code
			code = "// " + tmplName

			+ "\nvar v"
			+ (hasTag ? ",t=j._tag" : "")                // has tag
			+ (hasCnvt ? ",c=j._cnvt" : "")              // converter
			+ (hasEncoder ? ",h=j.converters.html" : "") // html converter
			+ (isLinkExpr ? ";\n" : ',ret=""\n')
			+ (tmplOptions.debug ? "debugger;" : "")
			+ code
			+ (isLinkExpr ? "\n" : ";\nreturn ret;");
			try {
				code = new Function("data,view,j,u", code);
			} catch (e) {
				syntaxError("Compiled template code:\n\n" + code + '\n: "' + e.message + '"');
			}
			if (tmpl) {
				tmpl.fn = code;
			}
			if (!needView) {
				code._nvw = true;
			}
			return code;
		}

		//==========
		// Utilities
		//==========

		// Merge objects, in particular contexts which inherit from parent contexts
		function extendCtx(context, parentContext) {
			// Return copy of parentContext, unless context is defined and is different, in which case return a new merged context
			// If neither context nor parentContext are defined, return undefined
			return context && context !== parentContext
				? (parentContext
				? $extend($extend({}, parentContext), context)
				: context)
				: parentContext && $extend({}, parentContext);
		}

		// Get character entity for HTML and Attribute encoding
		function getCharEntity(ch) {
			return charEntities[ch] || (charEntities[ch] = "&#" + ch.charCodeAt(0) + ";");
		}

		//========================== Initialize ==========================

		for (jsvStoreName in jsvStores) {
			registerStore(jsvStoreName, jsvStores[jsvStoreName]);
		}

		var $templates = $views.templates,
			$converters = $views.converters,
			$helpers = $views.helpers,
			$tags = $views.tags,
			$sub = $views.sub,
			$viewsSettings = $views.settings;

		if (jQuery) {
			////////////////////////////////////////////////////////////////////////////////////////////////
			// jQuery is loaded, so make $ the jQuery object
			$ = jQuery;
			$.fn.render = $fastRender;
			if ($.observable) {
				$extend($sub, $.views.sub); // jquery.observable.js was loaded before jsrender.js
				$views.map = $.views.map;
			}
		} else {
			////////////////////////////////////////////////////////////////////////////////////////////////
			// jQuery is not loaded.

			$ = global.jsviews = {};

			$.isArray = Array && Array.isArray || function(obj) {
				return Object.prototype.toString.call(obj) === "[object Array]";
			};

			//	//========================== Future Node.js support ==========================
			//	if ((nodeJsModule = global.module) && nodeJsModule.exports) {
			//		nodeJsModule.exports = $;
			//	}
		}

		$.render = $render;
		$.views = $views;
		$.templates = $templates = $views.templates;

		$viewsSettings({
			debugMode: dbgMode,
			delimiters: $viewsDelimiters,
			onError: function(e, view, fallback) {
				// Can override using $.views.settings({onError: function(...) {...}});
				if (view) {
					// For render errors, e is an exception thrown in compiled template, and view is the current view. For other errors, e is an error string.
					e = fallback === undefined
						? "{Error: " + e + "}"
						: $isFunction(fallback)
						? fallback(e, view) : fallback;
				}
				return e == undefined ? "" : e;
			},
			_dbgMode: true
		});

		//========================== Register tags ==========================

		$tags({
			"else": function() {}, // Does nothing but ensures {{else}} tags are recognized as valid
			"if": {
				render: function(val) {
					// This function is called once for {{if}} and once for each {{else}}.
					// We will use the tag.rendering object for carrying rendering state across the calls.
					// If not done (a previous block has not been rendered), look at expression for this block and render the block if expression is truthy
					// Otherwise return ""
					var self = this,
						ret = (self.rendering.done || !val && (arguments.length || !self.tagCtx.index))
							? ""
							: (self.rendering.done = true, self.selected = self.tagCtx.index,
							// Test is satisfied, so render content on current context. We call tagCtx.render() rather than return undefined
							// (which would also render the tmpl/content on the current context but would iterate if it is an array)
							self.tagCtx.render(self.tagCtx.view, true)); // no arg, so renders against parentView.data
					return ret;
				},
				onUpdate: function(ev, eventArgs, tagCtxs) {
					var tci, prevArg, different;
					for (tci = 0; (prevArg = this.tagCtxs[tci]) && prevArg.args.length; tci++) {
						prevArg = prevArg.args[0];
						different = !prevArg !== !tagCtxs[tci].args[0];
						if ((!this.convert && !!prevArg) || different) {
							return different;
							// If there is no converter, and newArg and prevArg are both truthy, return false to cancel update. (Even if values on later elses are different, we still don't want to update, since rendered output would be unchanged)
							// If newArg and prevArg are different, return true, to update
							// If newArg and prevArg are both falsey, move to the next {{else ...}}
						}
					}
					// Boolean value of all args are unchanged (falsey), so return false to cancel update
					return false;
				},
				flow: true
			},
			"for": {
				render: function(val) {
					// This function is called once for {{for}} and once for each {{else}}.
					// We will use the tag.rendering object for carrying rendering state across the calls.
					var finalElse,
						self = this,
						tagCtx = self.tagCtx,
						result = "",
						done = 0;

					if (!self.rendering.done) {
						if (finalElse = !arguments.length) {
							val = tagCtx.view.data; // For the final else, defaults to current data without iteration.
						}
						if (val !== undefined) {
							result += tagCtx.render(val, finalElse); // Iterates except on final else, if data is an array. (Use {{include}} to compose templates without array iteration)
							done += $.isArray(val) ? val.length : 1;
						}
						if (self.rendering.done = done) {
							self.selected = tagCtx.index;
						}
						// If nothing was rendered we will look at the next {{else}}. Otherwise, we are done.
					}
					return result;
				},
				flow: true
			},
			include: {
				flow: true
			},
			"*": {
				// {{* code... }} - Ignored if template.allowCode is false. Otherwise include code in compiled template
				render: retVal,
				flow: true
			}
		});

		function getTargetProps(source) {
			// this pointer is theMap - which has tagCtx.props too
			// arguments: tagCtx.args.
			var key, prop,
				props = [];

			if (typeof source === "object") {
				for (key in source) {
					prop = source[key];
					if (!prop || !prop.toJSON || prop.toJSON()) {
						if (!$isFunction(prop)) {
							props.push({ key: key, prop: prop });
						}
					}
				}
			}
			return props;
		}

		$tags("props", {
			baseTag: $tags["for"],
			dataMap: dataMap(getTargetProps)
		});

		//========================== Register converters ==========================

		function htmlEncode(text) {
			// HTML encode: Replace < > & ' and " by corresponding entities.
			return text != null ? rIsHtml.test(text) && ("" + text).replace(rHtmlEncode, getCharEntity) || text : "";
		}

		$converters({
			html: htmlEncode,
			attr: htmlEncode, // Includes > encoding since rConvertMarkers in JsViews does not skip > characters in attribute strings
			url: function(text) {
				// URL encoding helper.
				return text != undefined ? encodeURI("" + text) : text === null ? text : ""; // null returns null, e.g. to remove attribute. undefined returns ""
			}
		});

		//========================== Define default delimiters ==========================
		$viewsDelimiters();

	})(this, this.jQuery);

	/* JsObservable:
	 *    See http://github.com/borismoore/jsobservable and http://jsviews.com/jsobservable
	 * Copyright 2014, Boris Moore
	 * Released under the MIT License.
	 */

	(function(global, $, undefined) {
		// global is the this object, which is window when running in the usual browser environment.
		// $ is the global var jQuery or jsviews
		"use strict";

		if (!$) {
			throw "jsViews/jsObservable require jQuery";
		}
		if ($.observable) { return; } // JsObservable is already loaded

		//========================== Top-level vars ==========================

		var versionNumber = "v1.0.0-alpha",
			$views = $.views =
				$.views // jsrender was loaded before jquery.observable
				|| { // jsrender not loaded so set up $.views and $.views.sub here, and merge back in jsrender if loaded afterwards
					jsviews: versionNumber,
					sub: {}
				},
			$sub = $views.sub,
			$eventSpecial = $.event.special,
			splice = [].splice,
			$isArray = $.isArray,
			$expando = $.expando,
			OBJECT = "object",
			PARSEINT = parseInt,
			rNotWhite = /\S+/g,
			propertyChangeStr = $sub.propChng = $sub.propChng || "propertyChange",// These two settings can be overridden on settings after loading
			arrayChangeStr = $sub.arrChng = $sub.arrChng || "arrayChange",        // jsRender, and prior to loading jquery.observable.js and/or JsViews
			cbBindingsStore = $sub._cbBnds = $sub._cbBnds || {},
			observeStr = propertyChangeStr + ".observe",
			$isFunction = $.isFunction,
			observeObjKey = 1,
			observeCbKey = 1,
			$hasData = $.hasData,
			remove = {}; // flag for removeProperty

		//========================== Top-level functions ==========================

		$sub.getDeps = function() {
			var args = arguments;
			return function() {
				var arg, dep,
					deps = [],
					l = args.length;
				while (l--) {
					arg = args[l--],
						dep = args[l];
					if (dep) {
						deps = deps.concat($isFunction(dep) ? dep(arg, arg) : dep);
					}
				}
				return deps;
			};
		};

		function $observable(data) {
			return $isArray(data)
				? new ArrayObservable(data)
				: new ObjectObservable(data);
		}

		function ObjectObservable(data) {
			this._data = data;
			return this;
		}

		function ArrayObservable(data) {
			this._data = data;
			return this;
		}

		function wrapArray(data) {
			return $isArray(data)
				? [data]
				: data;
		}

		function resolvePathObjects(paths, root) {
			paths = $isArray(paths) ? paths : [paths];

			var i, path,
				object = root,
				nextObj = object,
				l = paths.length,
				out = [];

			for (i = 0; i < l; i++) {
				path = paths[i];
				if ($isFunction(path)) {
					out = out.concat(resolvePathObjects(path.call(root, root), root));
					continue;
				} else if ("" + path !== path) {
					root = nextObj = path;
					if (nextObj !== object) {
						out.push(object = nextObj);
					}
					continue;
				}
				if (nextObj !== object) {
					out.push(object = nextObj);
				}
				out.push(path);
			}
			return out;
		}

		function removeCbBindings(cbBindings, cbBindingsId) {
			// If the cbBindings collection is empty we will remove it from the cbBindingsStore
			var cb, found;

			for (cb in cbBindings) {
				found = true;
				break;
			}
			if (!found) {
				delete cbBindingsStore[cbBindingsId];
			}
		}

		function onObservableChange(ev, eventArgs) {
			if (!(ev.data && ev.data.off)) {
				// Skip if !!ev.data.off: - a handler that has already been removed (maybe was on handler collection at call time - then removed by another handler)
				var allPath, filter, parentObs, oldIsOb, isOb,
					oldValue = eventArgs.oldValue,
					value = eventArgs.value,
					ctx = ev.data,
					observeAll = ctx.observeAll,
					allowArray = !ctx.cb.noArray,
					paths = ctx.paths;

				if (ev.type === arrayChangeStr) {
					(ctx.cb.array || ctx.cb).call(ctx, ev, eventArgs); // If there is an arrayHandler expando on the regular handler, use it, otherwise use the regular handler for arrayChange events also - for example: $.observe(array, handler)
					// or observeAll() with an array in the graph. Note that on data-link bindings we ensure always to have an array handler - $.noop if none is specified e.g. on the data-linked tag.
				} else if (ctx.prop === eventArgs.path || ctx.prop === "*") {
					oldIsOb = typeof oldValue === OBJECT && (paths[0] || allowArray && $isArray(oldValue)); // Note: && (paths[0] || $isArray(value)) is for perf optimization
					isOb = typeof value === OBJECT && (paths[0] || allowArray && $isArray(value));
					if (observeAll) {
						allPath = observeAll._path + "." + eventArgs.path;
						filter = observeAll.filter;
						parentObs = [ev.target].concat(observeAll.parents());

						if (oldIsOb) {
							observe_apply(allowArray, observeAll.ns, [oldValue], paths, ctx.cb, true, filter, [parentObs], allPath); // unobserve
						}
						if (isOb) {
							observe_apply(allowArray, observeAll.ns, [value], paths, ctx.cb, undefined, filter, [parentObs], allPath);
						}
					} else {
						if (oldIsOb) { // oldValue is an object, so unobserve
							observe_apply(allowArray, [oldValue], paths, ctx.cb, true); // unobserve
						}
						if (isOb) { // value is an object, so observe
							observe_apply(allowArray, [value], paths, ctx.cb);
						}
					}
					ctx.cb(ev, eventArgs);
				}
			}
		}

		function $observe() {
			// $.observe([namespace, ]root, [1 or more objects, path or path Array params...], callback[, contextCallback][, unobserveOrOrigRoot])
			function observeOnOff(namespace, pathStr, isArrayBinding, off) {
				var j, evData,
					obIdExpando = $hasData(object),
					boundObOrArr = wrapArray(object);

				namespace = initialNs ? namespace + "." + initialNs : namespace;

				if (unobserve || off) {
					if (obIdExpando) {
						$(boundObOrArr).off(namespace, onObservableChange);
					}
				} else {
					if (events = obIdExpando && $._data(object)) {
						events = events && events.events;
						events = events && events[isArrayBinding ? arrayChangeStr : propertyChangeStr];
						el = events && events.length;

						while (el--) {
							if ((data = events[el].data) && data.cb._cId === callback._cId && data.ns === initialNs) {
								if (isArrayBinding) {
									// Duplicate exists, so skip. (This can happen e.g. with {^{for people ~foo=people}})
									return;
								} else if (pathStr === "*" && data.prop !== pathStr || data.prop === prop) {
									$(object).off(namespace, onObservableChange);
								}
							}
						}
					}
					evData = isArrayBinding ? {}
						: {
						fullPath: path,
						paths: pathStr ? [pathStr] : [],
						prop: prop
					};
					evData.ns = initialNs;
					evData.cb = callback;

					if (allPath) {
						evData.observeAll = {
							_path: allPath,
							path: function() { // Step through path and parentObs parent chain, replacing '[]' by '[n]' based on current index of objects in parent arrays.
								j = parentObs.length;
								return allPath.replace(/[[.]/g, function(all) {
									j--;
									return all === "["
										? "[" + $.inArray(parentObs[j - 1], parentObs[j])
										: ".";
								});
							},
							parents: function() {
								return parentObs; // The chain of parents between the modified object and the root object used in the observeAll() call
							},
							filter: filter,
							ns: initialNs
						};
					}
					$(boundObOrArr).on(namespace, null, evData, onObservableChange);
					if (cbBindings) {
						// Add object to cbBindings, and add the counter to the jQuery data on the object
						(cbBindingsStore[callback._cId] = cbBindings) // In some scenarios cbBindings was empty and removed
							//from store - so defensively add back to store, to ensure correct disposal e.g. when views are removed
							[$.data(object, "obId") || $.data(object, "obId", observeObjKey++)] = object;
					}
				}
			}

			function onUpdatedExpression(exprOb, paths) {
				// Use the contextCb callback to execute the compiled exprOb template in the context of the view/data etc. to get the returned value, typically an object or array.
				// If it is an array, register array binding
				exprOb._ob = contextCb(exprOb, origRoot);
				var origRt = origRoot;
				return function(ev, eventArgs) {
					var obj = exprOb._ob,
						len = paths.length;
					if (typeof obj === OBJECT) {
						bindArray(obj, true);
						if (len || allowArray && $isArray(obj)) {
							observe_apply(allowArray, [obj], paths, callback, contextCb, true); // unobserve
						}
					}
					obj = exprOb._ob = contextCb(exprOb, origRt);
					// Put the updated object instance onto the exprOb in the paths array, so subsequent string paths are relative to this object
					if (typeof obj === OBJECT) {
						bindArray(obj);
						if (len || allowArray && $isArray(obj)) {
							observe_apply(allowArray, [obj], paths, callback, contextCb, [origRt]);
						}
					}
					callback(ev, eventArgs);
				};
			}

			function bindArray(arr, unbind, isArray, relPath) {
				if (allowArray) {
					// This is a call to observe that does not come from observeAndBind (tag binding), so we allow arrayChange binding
					var prevObj = object,
						prevAllPath = allPath;

					object = arr;
					if (relPath) {
						object = arr[relPath];
						allPath += "." + relPath;
					}
					if (filter && object) {
						object = $observable._fltr(allPath, object, relPath ? [arr].concat(parentObs) : parentObs, filter);
					}
					if (object && (isArray || $isArray(object))) {
						observeOnOff(arrayChangeStr + ".observe" + (callback ? ".obs" + (cbId = callback._cId = callback._cId || observeCbKey++) : ""), undefined, true, unbind);
					}
					object = prevObj;
					allPath = prevAllPath;
				}
			}

			var i, p, skip, parts, prop, path, dep, unobserve, callback, cbId, el, data, events, contextCb, items, cbBindings, depth, innerCb, parentObs,
				allPath, filter, initialNs, initNsArr, initNsArrLen,
				allowArray = this != false, // If this === false, this is a call from observeAndBind - doing binding of datalink expressions. We don't bind
			// arrayChange events in this scenario. Instead, {^{for}} and similar do specific arrayChange binding to the tagCtx.args[0] value, in onAfterLink.
			// Note deliberately using this != false, rather than this !== false because of IE<10 bug- see https://github.com/BorisMoore/jsviews/issues/237
				topLevel = true,
				ns = observeStr,
				paths = Array.apply(0, arguments),
				lastArg = paths.pop(),
				origRoot = paths.shift(),
				root = origRoot,
				object = root,
				l = paths.length;

			if (origRoot + "" === origRoot && allowArray) {
				initialNs = origRoot; // The first arg is a namespace, since it is  a string, and this call is not from observeAndBind
				origRoot = object = root = paths.shift();
				l--;
			}

			if ($isFunction(lastArg)) {
				callback = lastArg;
			} else {
				if (lastArg + "" === lastArg) { // If last arg is a string then this observe call is part of an observeAll call,
					allPath = lastArg;          // and the last three args are the parentObs array, the filter, and the allPath string.
					parentObs = paths.pop();
					filter = paths.pop();
					lastArg = paths.pop();
					l = l - 3;
				}
				if (lastArg === true) {
					unobserve = lastArg;
				} else if (lastArg) {
					origRoot = lastArg;
					topLevel = undefined;
				}
				lastArg = paths[l - 1];
				if (l && lastArg === undefined || $isFunction(lastArg)) {
					callback = paths.pop(); // If preceding is callback this will be contextCb param - which may be undefined
					l--;
				}
			}
			if (l && $isFunction(paths[l - 1])) {
				contextCb = callback;
				callback = paths.pop();
				l--;
			}
			// Use a unique namespace (e.g. obs7) associated with each observe() callback to allow unobserve to remove handlers
			ns += unobserve
				? (callback ? ".obs" + callback._cId : "")
				: ".obs" + (cbId = callback._cId = callback._cId || observeCbKey++);

			if (!unobserve) {
				cbBindings = cbBindingsStore[cbId] = cbBindingsStore[cbId] || {};
			}

			initNsArr = initialNs && initialNs.match(rNotWhite) || [""];
			initNsArrLen = initNsArr.length;

			while (initNsArrLen--) {
				initialNs = initNsArr[initNsArrLen];

				if ($isArray(root)) {
					bindArray(root, unobserve, true);
				} else {
					// remove onObservableChange handlers that wrap that callback
					if (unobserve && l === 0 && root) {
						observeOnOff(ns, "");
					}
				}
				depth = 0;
				for (i = 0; i < l; i++) {
					path = paths[i];
					if (path === "") {
						continue;
					}
					object = root;
					if ("" + path === path) {
						parts = path.split("^");
						if (parts[1]) {
							// We bind the leaf, plus additional nodes based on depth.
							// "a.b.c^d.e" is depth 2, so listens to changes of e, plus changes of d and of c
							depth = parts[0].split(".").length;
							path = parts.join(".");
							depth = path.split(".").length - depth;
							// if more than one ^ in the path, the first one determines depth
						}
						if (contextCb && (items = contextCb(path, root))) {
							// If contextCb returns an array of objects and paths, we will insert them
							// into the sequence, replacing the current item (path)
							l += items.length - 1;
							splice.apply(paths, [i--, 1].concat(items));
							continue;
						}
						parts = path.split(".");
					} else {
						if (topLevel && !$isFunction(path)) {
							if (path && path._jsvOb) {
								// Currently this will only occur if !unobserve
								// This is a compiled function for binding to an object returned by a helper/data function.
								innerCb = onUpdatedExpression(path, paths.slice(i + 1));
								innerCb.noArray = !allowArray;
								innerCb._cId = callback._cId; // Set the same cbBindingsStore key as for callback, so when callback is disposed, disposal of innerCb happens too.
								observe_apply(allowArray, [origRoot], paths.slice(0, i), innerCb, contextCb);
								innerCb = undefined;
								path = path._ob;
							}
							object = path; // For top-level calls, objects in the paths array become the origRoot for subsequent paths.
						}
						root = path;
						parts = [root];
					}
					while (object && (prop = parts.shift()) !== undefined) {
						if (typeof object === OBJECT) {
							if ("" + prop === prop) {
								if (prop === "") {
									continue;
								}
								if ((parts.length < depth + 1) && !object.nodeType) {
									// Add observer for each token in path starting at depth, and on to the leaf
									if (!unobserve && (events = $hasData(object) && $._data(object))) {
										events = events.events;
										events = events && events[propertyChangeStr];
										el = events && events.length;
										skip = 0;
										while (el--) { // Skip duplicates
											data = events[el].data;
											if (data && data.cb === callback && data.ns === initialNs) {
												if (data.prop === prop || data.prop === "*") {
													if (p = parts.join(".")) {
														data.paths.push(p); // We will skip this binding, but if it is not a leaf binding,
														// need to keep bindings for rest of path, ready for if the object gets swapped.
													}
													skip++;
												}
											}
										}
										if (skip) {
											// Duplicate binding(s) found, so move on
											object = object[prop];
											continue;
										}
									}
									if (prop === "*") {
										if (!unobserve && events && events.length) {
											// Remove existing bindings, since they will be duplicates with "*"
											observeOnOff(ns, "", false, true);
										}
										if ($isFunction(object)) {
											if (dep = object.depends) {
												observe_apply(allowArray, [dep], callback, unobserve || origRoot);
											}
										} else {
											observeOnOff(ns, ""); // observe the object for any property change
										}
										for (p in object) {
											// observing "*": So (in addition to listening to prop change, above) listen to arraychange on props of type array
											bindArray(object, unobserve, undefined, p);
										}
										break;
									} else if (prop) {
										observeOnOff(ns + "." + prop, parts.join("^")); // By using "^" rather than "." we ensure that deep binding will be used on newly insert object graphs
									}
								}
								if (allPath) {
									allPath += "." + prop;
								}
								prop = object[prop];
							}
							if ($isFunction(prop)) {
								if (dep = prop.depends) {
									// This is a computed observable. We will observe any declared dependencies
									observe_apply(allowArray, [object], resolvePathObjects(dep, object), callback, contextCb, unobserve || [origRoot]);
								}
								break;
							}
							object = prop;
						}
					}
					bindArray(object, unobserve);
				}
			}
			if (cbId) {
				removeCbBindings(cbBindings, cbId);
			}

			// Return the cbBindings to the top-level caller, along with the cbId
			return { cbId: cbId, bnd: cbBindings };
		}

		function $unobserve() {
			[].push.call(arguments, true); // Add true as additional final argument
			return $observe.apply(this, arguments);
		}

		function observe_apply() {
			// $.observe(), but allowing you to include arrays within the arguments - which you want flattened.
			var args = [].concat.apply([], arguments); // Flatten the arguments
			return $observe.apply(args.shift(), args);
		}

		//========================== Initialize ==========================

		function $observeAll(namespace, cb, filter, unobserve) {
			if (namespace + "" !== namespace) {
				filter = cb;
				cb = namespace;
				namespace = "";
			}
			observeAll(namespace, this._data, cb, filter, [], "root", unobserve);
		}

		function $unobserveAll(namespace, cb, filter) {
			$observeAll.call(this, namespace, cb, filter, true);
		}

		function observeAll(namespace, object, cb, filter, parentObs, allPath, unobserve) {
			function observeArray(arr, unobs) {
				l = arr.length;
				newParentObs = [[arr]].concat(newParentObs);
				newAllPath = allPath + "[]";
				while (l--) {
					filterAndObserveAll(arr, l, unobs, 1);
				}
			}

			function filterAndObserveAll(obj, prop, unobs, nestedArray) {
				var newObject;
				if (prop !== $expando) {
					if (newObject = $observable._fltr(newAllPath, obj[prop], newParentObs, filter)) {
						observeAll(namespace, newObject, cb, filter || (nestedArray ? undefined : 0), newParentObs.slice(), newAllPath, unobs); // If nested array, need to observe the array too - so set filter to ""
					}
				}
			}

			function wrappedCb(ev, eventArgs) {
				// This object is changing.
				var oldParentObs = parentObs;

				allPath = ev.data.observeAll._path;
				newParentObs = [ev.target].concat(parentObs);

				switch (eventArgs.change) { // observeAll/unobserveAll on added or removed objects
					case "insert":
						observeArray(eventArgs.items);
						break;
					case "remove":
						observeArray(eventArgs.items, true); // unobserveAll on removed items
						break;
					case "refresh":
						observeArray(eventArgs.oldItems, true); // unobserveAll on old items
						observeArray(ev.target); // observeAll on new items
						break;
					case "set":
						newAllPath = allPath + "." + eventArgs.path;
						filterAndObserveAll(eventArgs, "oldValue", true);
						filterAndObserveAll(eventArgs, "value");
				}
				cb.apply(this, arguments); // Observe this object (invoke the callback)
				parentObs = oldParentObs;
			}

			var l, isObject, newAllPath, newParentObs;

			if (typeof object === OBJECT) {
				isObject = $isArray(object) ? "" : "*";
				if (cb) {
					// Observe this object or array - and also listen for changes to object graph, to add or remove observers from the modified object graph
					if (isObject || filter !== 0) {
						// If an object, observe the object. If an array, only add arrayChange binding if has filter or if filter is undefined (!== 0) - which
						// is the case for top-level calls or for nested array (array item of an array - e.g. member of 2-dimensional array).
						// For array properties lower in the tree, with no filter, filter is set to 0 in filterAndObserveAll, so no arrayChange binding here,
						// since they get arrayChange binding added during regular $.observe(array ...) binding.
						wrappedCb._cId = cb._cId = cb._cId || observeCbKey++; // Identify wrapped callback with unwrapped callback, so unobserveAll will
																			  // remove previous observeAll wrapped callback, if inner callback was the same;
						$observe(namespace, object, isObject, wrappedCb, unobserve, filter, parentObs, allPath);
					}
				} else {
					// No callback. Just unobserve if unobserve === true.
					$observe(namespace, object, isObject, undefined, unobserve, filter, parentObs, allPath);
				}

				if (isObject) {
					// Continue stepping through object graph, observing object and arrays
					// To override filtering, pass in filter function, or replace $.observable._fltr
					newParentObs = [object].concat(parentObs); // Combine with below in single function that filters, observeAlls and prepends to parentObs
					for (l in object) {
						newAllPath = allPath + "." + l;
						filterAndObserveAll(object, l, unobserve);
					}
				} else { // Array
					observeArray(object, unobserve);
				}
			}
		}

		$.observable = $observable;
		$observable._fltr = function(allPath, object, parentObs, filter) {
			if (filter && $isFunction(filter)
					? filter(allPath, object, parentObs)
					: true // TODO Consider supporting filter being a string or strings to do RegEx filtering based on key and/or allPath
			) {
				object = $isFunction(object)
					? object.set && object.call(parentObs[0]) // It is a getter/setter
					: object;
				return typeof object === OBJECT && object;
			}
		};

		$observable.Object = ObjectObservable;
		$observable.Array = ArrayObservable;
		$.observe = $observable.observe = $observe;
		$.unobserve = $observable.unobserve = $unobserve;
		$observable._apply = observe_apply;

		ObjectObservable.prototype = {
			_data: null,

			observeAll: $observeAll,
			unobserveAll: $unobserveAll,

			data: function() {
				return this._data;
			},

			setProperty: function(path, value, nonStrict) {
				var key, pair, parts,
					self = this,
					object = self._data;

				path = path || "";
				if (object) {
					if ($isArray(path)) {
						// This is the array format generated by serializeArray. However, this has the problem that it coerces types to string,
						// and does not provide simple support of convertTo and convertFrom functions.
						key = path.length;
						while (key--) {
							pair = path[key];
							self.setProperty(pair.name, pair.value, nonStrict === undefined || nonStrict); //If nonStrict not specified, default to true;
						}
					} else if ("" + path !== path) {
						// Object representation where property name is path and property value is value.
						for (key in path) {
							self.setProperty(key, path[key], value);
						}
					} else if (path !== $expando) {
						// Simple single property case.
						parts = path.split(".");
						while (object && parts.length > 1) {
							object = object[parts.shift()];
						}
						object && self._setProperty(object, parts[0], value, nonStrict);
					}
				}
				return self;
			},

			removeProperty: function(path) {
				this.setProperty(path, remove);
				return this;
			},

			_setProperty: function(leaf, path, value, nonStrict) {
				var setter, getter, removeProp,
					property = path ? leaf[path] : leaf;

				if ($isFunction(property)) {
					if (property.set) {
						// Case of property setter/getter - with convention that property is getter and property.set is setter
						getter = property;
						setter = property.set === true ? property : property.set;
						property = property.call(leaf); // get - only treated as getter if also a setter. Otherwise it is simply a property of type function. See unit tests 'Can observe properties of type function'.
					}
				}

				if (property !== value || nonStrict && property != value) { // Optional non-strict equality, since serializeArray, and form-based editors can map numbers to strings, etc.
					// Date objects don't support != comparison. Treat as special case.
					if (!(property instanceof Date) || property > value || property < value) {
						if (setter) {
							setter.call(leaf, value);	//set
							value = getter.call(leaf);	//get updated value
						} else if (removeProp = value === remove) {
							delete leaf[path];
							value = undefined;
						} else if (path) {
							leaf[path] = value;
						}
						this._trigger(leaf, {change: "set", path: path, value: value, oldValue: property, remove: removeProp});
					}
				}
			},

			_trigger: function(target, eventArgs) {
				$(target).triggerHandler(propertyChangeStr, eventArgs);
			}
		};

		ArrayObservable.prototype = {
			_data: null,

			observeAll: $observeAll,
			unobserveAll: $unobserveAll,

			data: function() {
				return this._data;
			},

			insert: function(index, data) {
				var _data = this._data;
				if (arguments.length === 1) {
					data = index;
					index = _data.length;
				}
				index = PARSEINT(index);
				if (index > -1 && index <= _data.length) {
					data = $isArray(data) ? data : [data];
					// data can be a single item (including a null/undefined value) or an array of items.
					// Note the provided items are inserted without being cloned, as direct references to the provided objects

					if (data.length) {
						this._insert(index, data);
					}
				}
				return this;
			},

			_insert: function(index, data) {
				var _data = this._data,
					oldLength = _data.length;
				splice.apply(_data, [index, 0].concat(data));
				this._trigger({change: "insert", index: index, items: data}, oldLength);
			},

			remove: function(index, numToRemove) {
				var items,
					_data = this._data;

				if (index === undefined) {
					index = _data.length - 1;
				}

				index = PARSEINT(index);
				numToRemove = numToRemove ? PARSEINT(numToRemove) : numToRemove === 0 ? 0 : 1; // if null or undefined: remove 1
				if (numToRemove > -1 && index > -1) {
					items = _data.slice(index, index + numToRemove);
					numToRemove = items.length;
					if (numToRemove) {
						this._remove(index, numToRemove, items);
					}
				}
				return this;
			},

			_remove: function(index, numToRemove, items) {
				var _data = this._data,
					oldLength = _data.length;

				_data.splice(index, numToRemove);
				this._trigger({change: "remove", index: index, items: items}, oldLength);
			},

			move: function(oldIndex, newIndex, numToMove) {
				numToMove = numToMove ? PARSEINT(numToMove) : numToMove === 0 ? 0 : 1; // if null or undefined: move 1
				oldIndex = PARSEINT(oldIndex);
				newIndex = PARSEINT(newIndex);

				if (numToMove > 0 && oldIndex > -1 && newIndex > -1 && oldIndex !== newIndex) {
					var items = this._data.slice(oldIndex, oldIndex + numToMove);
					numToMove = items.length;
					if (numToMove) {
						this._move(oldIndex, newIndex, numToMove, items);
					}
				}
				return this;
			},

			_move: function(oldIndex, newIndex, numToMove, items) {
				var _data = this._data,
					oldLength = _data.length;
				_data.splice(oldIndex, numToMove);
				_data.splice.apply(_data, [newIndex, 0].concat(items));
				this._trigger({change: "move", oldIndex: oldIndex, index: newIndex, items: items}, oldLength);
			},

			refresh: function(newItems) {
				var oldItems = this._data.slice();
				this._refresh(oldItems, newItems);
				return this;
			},

			_refresh: function(oldItems, newItems) {
				var _data = this._data,
					oldLength = _data.length;

				splice.apply(_data, [0, _data.length].concat(newItems));
				this._trigger({change: "refresh", oldItems: oldItems}, oldLength);
			},

			_trigger: function(eventArgs, oldLength) {
				var _data = this._data,
					length = _data.length,
					$data = $([_data]);

				$data.triggerHandler(arrayChangeStr, eventArgs);
				if (length !== oldLength) {
					$data.triggerHandler(propertyChangeStr, {change: "set", path: "length", value: length, oldValue: oldLength});
				}
			}
		};

		$eventSpecial[propertyChangeStr] = $eventSpecial[arrayChangeStr] = {
			// Register a jQuery special 'remove' event, to access the data associated with handlers being removed by jQuery.off().
			// We get data.cb._cId from the event handleObj and get the corresponding cbBindings hash from the cbBindingsStore,
			// then remove this object from that bindings hash - if the object does not have any other handlers associated with the same callback.
			remove: function (handleObj) {
				var cbBindings, found, events, l, data,
					evData = handleObj.data;
				if ((evData) && (evData.off = true, evData = evData.cb)) { //Set off = true as marker for disposed event
					// Get the cb._cId from handleObj.data.cb._cId
					if (cbBindings = cbBindingsStore[evData._cId]) {
						// There were bindings for this callback. If this was the last one, we'll remove it.
						events = $._data(this).events[handleObj.type];
						l = events.length;
						while (l-- && !found) {
							found = (data = events[l].data) && data.cb === evData; // Found another one with same callback
						}
						if (!found) {
							// This was the last handler for this callback and object, so remove the binding entry
							delete cbBindings[$.data(this, "obId")];
							removeCbBindings(cbBindings, evData._cId);
						}
					}
				}
			}
		};

		function shallowFilter(allPath /*, object, parentObs*/) {
			return allPath.indexOf(".") < 0 && allPath.indexOf("[") < 0;
		}

		$views.map = function(mapDef) {
			function newMap(source, options, target) {
				var changing,
					map = this;
				if (this.src) {
					this.unmap(); // We are re-mapping a new source
				}
				if (typeof source === "object") {
					map.src = source;
					map.tgt = target || map.tgt || [];
					map.options = options || map.options;
					map.update();

					mapDef.obsSrc && $observable(map.src).observeAll(map.obs = function(ev, eventArgs) {
						if (!changing) {
							changing = true;
							mapDef.obsSrc(map, ev, eventArgs);
							changing = undefined;
						}
					}, map.srcFlt);
					mapDef.obsTgt && $observable(map.tgt).observeAll(map.obt = function(ev, eventArgs) {
						if (!changing) {
							changing = true;
							mapDef.obsTgt(map, ev, eventArgs);
							changing = undefined;
						}
					}, map.tgtFlt);
				}
			}

			if ($isFunction(mapDef)) {
				// Simple map declared as function
				mapDef = {
					getTgt: mapDef
				};
			}

			if (mapDef.baseMap) {
				mapDef = $.extend({}, mapDef.baseMap, mapDef);
			}

			mapDef.map = function(source, options, target) {
				return new newMap(source, options, target);
			};

			(newMap.prototype = {
				srcFlt: mapDef.srcFlt || shallowFilter, // default to shallowFilter
				tgtFlt: mapDef.tgtFlt || shallowFilter,
				update: function(options) {
					var map = this;
					$observable(map.tgt).refresh(mapDef.getTgt(map.src, map.options = options || map.options));
				},
				unmap: function() {
					var map = this;
					if (map.src) {
						map.obs && $observable(map.src).unobserveAll(map.obs, map.srcFlt);
						map.obt && $observable(map.tgt).unobserveAll(map.obt, map.tgtFlt);
						map.src = undefined;
					}
				},
				map: newMap,
				_def: mapDef
			}).constructor = newMap;

			return mapDef;
		};

	})(this, this.jQuery);

	/* JsViews:
	 * Interactive data-driven views using templates and data-linking.
	 *    See http://github.com/BorisMoore/jsviews and http://jsviews.com/jsviews
	 * Copyright 2014, Boris Moore
	 * Released under the MIT License.
	 */

	(function(global, $, undefined) {
		// global is the this object, which is window when running in the usual browser environment.
		// $ is the global var jQuery
		"use strict";

		//========================== Top-level vars ==========================

		var versionNumber = "v1.0.0-alpha",
			requiresStr = "JsViews requires ",
			activeBody, $view, rTag, delimOpenChar0, delimOpenChar1, delimCloseChar0, delimCloseChar1, linkChar, noDomLevel0, error,
			$viewsLinkAttr, linkMethods, linkViewsSel, wrapMap, topView, viewStore,

			document = global.document,
			$views = $.views,
			$sub = $views.sub,
			$viewsSettings = $views.settings,
			$extend = $sub.extend,
			$isFunction = $.isFunction,
			$converters = $views.converters,
			$tags = $views.tags,
			$observable = $.observable,
			$observe = $observable.observe,
			jsvAttrStr = "data-jsv",

		// These two settings can be overridden on settings after loading jsRender, and prior to loading jquery.observable.js and/or JsViews
			propertyChangeStr = $sub.propChng = $sub.propChng || "propertyChange",
			arrayChangeStr = $sub.arrChng = $sub.arrChng || "arrayChange",

			elementChangeStr = "change.jsv",
			onBeforeChangeStr = "onBeforeChange",
			onAfterChangeStr = "onAfterChange",
			onAfterCreateStr = "onAfterCreate",
			CHECKED = "checked",
			CHECKBOX = "checkbox",
			RADIO = "radio",
			NONE = "none",
			sTRUE = "true",
			closeScript = '"></script>',
			openScript = '<script type="jsv',
			deferAttr = jsvAttrStr + "-df",
			bindElsSel = "script,[" + jsvAttrStr + "]",
			htmlStr = "html",
			fnSetters = {
				value: "val",
				input: "val",
				html: htmlStr,
				text: "text"
			},
			valueBinding = {from: "value", to: "value"},
			isCleanCall = 0,
			oldCleanData = $.cleanData,
			oldJsvDelimiters = $viewsSettings.delimiters,
			syntaxError = $sub.syntaxErr,
			rFirstElem = /<(?!script)(\w+)(?:[^>]*(on\w+)\s*=)?[^>]*>/,
			rEscapeQuotes = /['"\\]/g, // Escape quotes and \ character
			safeFragment = document.createDocumentFragment(),
			qsa = document.querySelector,

		// elContent maps tagNames which have only element content, so may not support script nodes.
			elContent = {ol: 1, ul: 1, table: 1, tbody: 1, thead: 1, tfoot: 1, tr: 1, colgroup: 1, dl: 1, select: 1, optgroup: 1, svg: 1, svg_ns: 1},
			badParent = {tr: "table"},
		// wrapMap provide appropriate wrappers for inserting innerHTML, used in insertBefore
		// We have to close these tags to support XHTML (#13200)
		// TODO investigate whether more recent jQuery implementation using wrapMap in domManip/$().html() etc. is better optimized now...
			voidElems = {br: 1, img: 1, input: 1, hr: 1, area: 1, base: 1, col: 1, link: 1, meta: 1,
				command: 1, embed: 1, keygen: 1, param: 1, source: 1, track: 1, wbr: 1},
			displayStyles = {},
			bindingStore = {},
			bindingKey = 1,
			rViewPath = /^#(view\.?)?/,
			rConvertMarkers = /(^|(\/>)|<\/(\w+)>|)(\s*)([#\/]\d+[_^])`(\s*)(<\w+(?=[\s\/>]))?|\s*(?:(<\w+(?=[\s\/>]))|<\/(\w+)>(\s*)|(\/>)\s*|(>))/g,
			rOpenViewMarkers = /(#)()(\d+)(_)/g,
			rOpenMarkers = /(#)()(\d+)([_^])/g,
			rViewMarkers = /(?:(#)|(\/))(\d+)(_)/g,
			rOpenTagMarkers = /(#)()(\d+)(\^)/g,
			rMarkerTokens = /(?:(#)|(\/))(\d+)([_^])([-+@\d]+)?/g,
			getComputedStyle = global.getComputedStyle;

		if (!$) {
			// jQuery is not loaded.
			throw requiresStr + "jQuery"; // We require jQuery
		}

		if (!$views) {
			// JsRender is not loaded.
			throw requiresStr + "JsRender"; // JsRender must be loaded before JsViews
		}

		if (!$observable) {
			// JsRender is not loaded.
			throw requiresStr + "jquery.observable"; // jquery.observable.js must be loaded before JsViews
		}

		if ($.link) { return; } // JsViews is already loaded

		//========================== Top-level functions ==========================

		//===============
		// Event handlers
		//===============

		function elemChangeHandler(ev, params, sourceValue) {
			var setter, cancel, fromAttr, linkCtx, cvtBack, cnvtName, target, $source, view, binding, oldLinkCtx, onBeforeChange, onAfterChange, tag, to, eventArgs,
				source = ev.target,
				bindings = source._jsvBnd,
				splitBindings = /&(\d+)\+?/g;

			// _jsvBnd is a string with the syntax: "&bindingId1&bindingId2"
			if (bindings) {
				while (binding = splitBindings.exec(bindings)) {
					if (binding = bindingStore[binding[1]]) {
						if (to = binding.to) {
							// The binding has a 'to' field, which is of the form [[targetObject, toPath], cvtBack]
							linkCtx = binding.linkCtx;
							view = linkCtx.view;
							tag = linkCtx.tag;
							$source = $(source);
							onBeforeChange = view.hlp(onBeforeChangeStr); // TODO Can we optimize this and other instances of same?
							onAfterChange = view.hlp(onAfterChangeStr); // TODO Can we optimize this and other instances of same
							fromAttr = defaultAttr(source);
							setter = fnSetters[fromAttr];
							if (sourceValue === undefined) {
								sourceValue = $isFunction(fromAttr)
									? fromAttr(source)
									: setter
									? $source[setter]()
									: $source.attr(fromAttr);
							}
							cnvtName = to[1];
							to = to[0]; // [object, path]
							if (cnvtName) {
								if ($isFunction(cnvtName)) {
									cvtBack = cnvtName;
								} else {
									cvtBack = view.getRsc("converters", cnvtName);
								}
							}
							if (cvtBack) {
								sourceValue = cvtBack.call(tag, sourceValue);
							}

							// Set linkCtx on view, dynamically, just during this handler call
							oldLinkCtx = view.linkCtx;
							view.linkCtx = linkCtx;
							eventArgs = {
								change: "change",
								oldValue: linkCtx._val,
								value: sourceValue
							};
							if ((!onBeforeChange || !(cancel = onBeforeChange.call(linkCtx, ev, eventArgs) === false)) &&
								(!tag || !tag.onBeforeChange || !(cancel = tag.onBeforeChange(ev, eventArgs) === false)) &&
								sourceValue !== undefined) {
								target = to[0]; // [object, path]
								if (sourceValue !== undefined && target) {
									target = target._jsvOb ? target._ob : target;
									if (tag) {
										tag._.chging = true; // marker to prevent tag change event triggering its own refresh
									}
									$observable(target).setProperty(to[2] || to[1], sourceValue);
									if (onAfterChange) {
										onAfterChange.call(linkCtx, ev, eventArgs);
									}
									if (tag) {
										if (tag.onAfterChange) {
											tag.onAfterChange(ev, eventArgs);
										}
										delete tag._.chging; // clear the marker
									}
									linkCtx._val = sourceValue;
								}
							}
							view.linkCtx = oldLinkCtx;
						}
					}
				}
			}
		}

		function propertyChangeHandler(ev, eventArgs, linkFn) {
			var attr, sourceValue, noUpdate, forceUpdate, hasError, onError,
				linkCtx = this,
				tag = linkCtx.tag,
				source = linkCtx.data,
				target = linkCtx.elem,
				cvt = linkCtx.convert,
				parentElem = target.parentNode,
				view = linkCtx.view,
				oldLinkCtx = view.linkCtx,
				onEvent = view.hlp(onBeforeChangeStr);

			// Set linkCtx on view, dynamically, just during this handler call
			view.linkCtx = linkCtx;

			if (parentElem && (!onEvent || !(eventArgs && onEvent.call(linkCtx, ev, eventArgs) === false))
					// If data changed, the ev.data is set to be the path. Use that to filter the handler action...
				&& !(eventArgs && ev.data.prop !== "*" && ev.data.prop !== eventArgs.path)) {

				if (eventArgs) {
					linkCtx.eventArgs = eventArgs;
				}
				if (eventArgs || linkCtx._initVal) {
					delete linkCtx._initVal;
					if (linkFn._er) {
						// data-link="exprUsingTagOrCvt with onerror=..." - e.g. {tag ... {cvt:... {:... convert='cvt'
						try {
							sourceValue = linkFn(source, view);
						} catch (e) {
							hasError = linkFn._er;
							onError = error(e,view,(new Function("data,view", "return " + hasError + ";"))(source, view));
							sourceValue = [{props: {}, args: [onError]}];
						}
					} else {
						sourceValue = linkFn(source, view, $views);
					}
					// Compiled link expression for linkTag: return value for data-link="{:xxx}" with no cvt or cvtBk, otherwise tagCtx or tagCtxs

					attr = getTargetVal(sourceValue, linkCtx, tag = linkCtx.tag,
						linkCtx.attr || defaultAttr(target, true, cvt !== undefined)
					);

					if (tag) {
						// Existing tag instance
						forceUpdate = hasError || tag._er;
						// If the new tagCtxs hasError or the previous tagCtxs had error, then force update
						sourceValue = sourceValue[0] ? sourceValue : [sourceValue];
						noUpdate = !forceUpdate && eventArgs && tag.onUpdate && tag.onUpdate(ev, eventArgs, sourceValue) === false;

						mergeCtxs(tag, sourceValue, forceUpdate);

						if (noUpdate || attr === NONE) {
							// onUpdate returned false, or attr === "none", or this is an update coming from the tag's own change event
							// - so don't refresh the tag: we just use the new tagCtxs merged from the sourceValue,
							// (which may optionally have been modifed in onUpdate()...) and then bind, and we are done
							if (attr === htmlStr) {
								tag.onBeforeLink && tag.onBeforeLink();
							}
							callAfterLink(tag, tag.tagCtx);
							observeAndBind(linkCtx, source, target);
							view.linkCtx = oldLinkCtx;
							return;
						}
						if (tag._.chging) {
							return;
						}

						sourceValue = tag.tagName === ":" // Call convertVal if it is a {{cvt:...}} - otherwise call renderTag
							? $views._cnvt(tag.cvt, view, sourceValue[0])
							: $views._tag(tag, view, view.tmpl, sourceValue, true, onError);
					} else if (linkFn._tag) {
						// For {{: ...}} without a convert or convertBack, we already have the sourceValue, and we are done
						// For {{: ...}} with either cvt or cvtBack we call convertVal to get the sourceValue and instantiate the tag
						// If cvt is undefined then this is a tag, and we call renderTag to get the rendered content and instantiate the tag
						cvt = cvt === "" ? sTRUE : cvt; // If there is a cvtBack but no cvt, set cvt to "true"
						sourceValue = cvt // Call convertVal if it is a {{cvt:...}} - otherwise call renderTag
							? $views._cnvt(cvt, view, sourceValue[0] || sourceValue) // convertVal
							: $views._tag(linkFn._tag, view, view.tmpl, sourceValue, true, onError); // renderTag

						tag = linkCtx.tag; // In both convertVal and renderTag we have instantiated a tag
						attr = linkCtx.attr || attr; // linkCtx.attr may have been set to tag.attr during tag instantiation in renderTag
					}

					if (updateContent(sourceValue, linkCtx, attr, tag)
						&& eventArgs
						&& (onEvent = view.hlp(onAfterChangeStr))) {
						onEvent.call(linkCtx, ev, eventArgs);
					}

					if (tag) {
						tag._er = hasError;
						callAfterLink(tag, tag.tagCtx);
					}
				}

				observeAndBind(linkCtx, source, target);

				// Remove dynamically added linkCtx from view
				view.linkCtx = oldLinkCtx;
			}
		}

		function getTargetVal(sourceValue, linkCtx, tag, attr) {
			var currentValue, setter, css, $target,
				target = tag && tag.parentElem || linkCtx.elem;

			if (sourceValue !== undefined) {
				$target = $(target);
				attr = tag && tag.attr || attr;
				if ($isFunction(sourceValue)) {
					error(linkCtx.expr + ": missing parens");
				}

				if (css = /^css-/.test(attr) && attr.slice(4)) {
					currentValue = $.style(target, css);
					if (+sourceValue === sourceValue) {
						// Optimization for perf on integer values - e.g. css-width{:width+'px'}
						currentValue = parseInt(currentValue);
					}
				} else if (attr !== "link") { // attr === "link" is for tag controls which do data binding but have no rendered output or target
					if (attr === "value") {
						if (target.type === CHECKBOX) {
							currentValue = $target.prop(attr = CHECKED);
						}
					} else if (attr === RADIO) {
						if (target.value === ("" + sourceValue)) {
							currentValue = $target.prop(CHECKED);
						} else {
							return attr;
						}
					}

					if (currentValue === undefined) {
						setter = fnSetters[attr];
						currentValue = setter ? $target[setter]() : $target.attr(attr);
					}
				}
				linkCtx._val = currentValue;
			}
			return attr;
		}

		function setDefer(elem, value) {
			elem._df = value; // Use both an expando and an attribute to track defered tokens. Attribute is needed for querySelectorAll for getViewInfos (childTags)
			elem[(value ? "set" : "remove") + "Attribute"](deferAttr, "");
		}

		function updateContent(sourceValue, linkCtx, attr, tag) {
			// When called for a tag, either in tag.refresh() or propertyChangeHandler(), returns a promise (and supports async)
			// When called (in propertyChangeHandler) for target HTML returns true
			// When called (in propertyChangeHandler) for other targets returns boolean for "changed"
			var setter, prevNode, nextNode, promise, nodesToRemove, useProp, tokens, id, openIndex, closeIndex, testElem, nodeName, cStyle,
				renders = sourceValue !== undefined,
				source = linkCtx.data,
				target = tag && tag.parentElem || linkCtx.elem,
				$target = $(target),
				view = linkCtx.view,
				targetVal = linkCtx._val,
				oldLinkCtx = view.linkCtx,
			// If not a tag and not targeting HTML, we can use the ._val obtained from getTargetVal()
			// and only update when the new value (sourceValue) has changed from the previous one
				change = tag || attr === htmlStr;
			if (tag) {
				// Initialize the tag with element references
				tag.parentElem = tag.parentElem || (linkCtx.expr || tag._elCnt) ? target : target.parentNode;
				prevNode = tag._prv;
				nextNode = tag._nxt;
			}
			if (!renders) {
				if (attr === htmlStr && tag && tag.onBeforeLink) {
					tag.onBeforeLink();
				}
				return;
			}

			if (attr === "visible") {
				attr = "css-display";
			}
			if (/^css-/.test(attr)) {
				if (linkCtx.attr === "visible") {
					// Get the current display style
					cStyle = (target.currentStyle || getComputedStyle.call(global, target, "")).display;

					if (sourceValue) {
						// We are showing the element.
						// Get the cached 'visible' display value from the -jsvd expando
						sourceValue = target._jsvd
							// Or, if not yet cached, get the current display value
						|| cStyle;
						if (sourceValue === NONE && !(sourceValue = displayStyles[nodeName = target.nodeName])) {
							// Currently display value is 'none', and the 'visible' style has not been cached.
							// We create an element to find the correct 'visible' display style for this nodeName
							testElem = document.createElement(nodeName);
							document.body.appendChild(testElem);

							// Get the default style for this HTML tag to use as 'visible' style
							sourceValue
								// and cache it as a hash against nodeName
								= displayStyles[nodeName]
								= (testElem.currentStyle || getComputedStyle.call(global, testElem, "")).display;
							document.body.removeChild(testElem);
						}
					} else {
						// We are hiding the element.
						// Cache the current display value as 'visible' style, on _jsvd expando, for when we show the element again
						target._jsvd = cStyle;
						sourceValue = NONE; // Hide the element
					}
				}
				if (change = change || targetVal !== sourceValue) {
					$.style(target, attr.slice(4), sourceValue);
				}
			} else if (attr !== "link") { // attr === "link" is for tag controls which do data binding but have no rendered output or target
				if (attr === CHECKED) {
					useProp = true;
					sourceValue = sourceValue && sourceValue !== "false";
					// The string value "false" can occur with data-link="checked{attr:expr}" - as a result of attr, and hence using convertVal()
					// We will set the "checked" property
					// We will compare this with the current value
				} else if (attr === RADIO) {
					// This is a special binding attribute for radio buttons, which corresponds to the default 'to' binding.
					// This allows binding both to value (for each input) and to the default checked radio button (for each input in named group,
					// e.g. binding to parent data).
					// Place value binding first: <input type="radio" data-link="value{:name} {:#get('data').data.currency:} " .../>
					// or (allowing any order for the binding expressions):
					// <input type="radio" value="{{:name}}" data-link="{:#get('data').data.currency:} value^{:name}" .../>

					if (target.value === ("" + sourceValue)) {
						// If the data value corresponds to the value attribute of this radio button input, set the checked property to true
						sourceValue = useProp = true;
						attr = CHECKED;
					} else {
						// Otherwise, go straight to observeAndBind, without updating.
						// (The browser will remove the 'checked' attribute, when another radio button in the group is checked).
						observeAndBind(linkCtx, source, target);
						return;
					}
				} else if (attr === "selected" || attr === "disabled" || attr === "multiple" || attr === "readonly") {
					sourceValue = (sourceValue && sourceValue !== "false") ? attr : null;
					// Use attr, not prop, so when the options (for example) are changed dynamically, but include the previously selected value,
					// they will still be selected after the change
				}

				if (setter = fnSetters[attr]) {
					if (attr === htmlStr) {
						// Set linkCtx on view, dynamically, just during this handler call
						view.linkCtx = linkCtx;
						if (tag && tag._.inline) {
							nodesToRemove = tag.nodes(true);
							if (tag._elCnt) {
								if (prevNode && prevNode !== nextNode) {
									// This prevNode will be removed from the DOM, so transfer the view tokens on prevNode to nextNode of this 'viewToRefresh'
									transferViewTokens(prevNode, nextNode, target, tag._tgId, "^", true);
								} else if (tokens = target._df) { // This occurs when there is no nextNode, and so the target._df may include tokens referencing
									// view and tag bindings contained within the open and close tokens of the updated tag control. They need to be processed (disposed)
									id = tag._tgId + "^";
									openIndex = tokens.indexOf("#" + id) + 1;
									closeIndex = tokens.indexOf("/" + id);

									if (openIndex && closeIndex > 0) {
										openIndex += id.length;
										if (closeIndex > openIndex) {
											setDefer(target, tokens.slice(0, openIndex) + tokens.slice(closeIndex));
											disposeTokens(tokens.slice(openIndex, closeIndex));
										}
									}
								}
								prevNode = prevNode
									? prevNode.previousSibling
									: nextNode
									? nextNode.previousSibling
									: target.lastChild;
							}
							// Remove HTML nodes
							$(nodesToRemove).remove(); // Note if !tag._elCnt removing the nodesToRemove will process and dispose view and tag bindings contained within the updated tag control

							if (tag && tag.onBeforeLink) {
								tag.onBeforeLink();
							}
							// Insert and link new content
							promise = view.link(view.data, target, prevNode, nextNode, sourceValue, tag && {tag: tag._tgId, lazyLink: tag.tagCtx.props.lazyLink});
						} else {
							// data-linked value targeting innerHTML: data-link="html{:expr}"
							if (renders) {
								$target.empty();
							}
							if (tag && tag.onBeforeLink) {
								tag.onBeforeLink();
							}
							if (renders) {
								promise = view.link(source, target, prevNode, nextNode, sourceValue, tag && {tag: tag._tgId});
							}
						}
						// Remove dynamically added linkCtx and ctx from view
						view.linkCtx = oldLinkCtx;
					} else if (change = change || targetVal !== sourceValue) {
						if (attr === "text" && target.children && !target.children[0]) {
							// This code is faster then $target.text()
							if (target.textContent !== undefined) {
								target.textContent = sourceValue;
							} else {
								target.innerText = sourceValue === null ? "" : sourceValue;
							}
						} else {
							$target[setter](sourceValue);
						}
// Removing this for now, to avoid side-effects when you programmatically set the value, and want the focus to stay on the text box
//							if (target.nodeName.toLowerCase() === "input") {
//								$target.blur(); // Issue with IE. This ensures HTML rendering is updated.
//							}
						// Data link the new contents of the target node
					}
				} else if (change = change || targetVal !== sourceValue) {
					// Setting an attribute to undefined should remove the attribute
					$target[useProp ? "prop" : "attr"](attr, sourceValue === undefined && !useProp ? null : sourceValue);
				}
				linkCtx._val = sourceValue;
			}
			return promise || change;
		}

		function arrayChangeHandler(ev, eventArgs) {
			var self = this,
				onBeforeChange = self.hlp(onBeforeChangeStr),
				onAfterChange = self.hlp(onAfterChangeStr);

			if (!onBeforeChange || onBeforeChange.call(this, ev, eventArgs) !== false) {
				if (eventArgs) {
					// This is an observable action (not a trigger/handler call from pushValues, or similar, for which eventArgs will be null)
					var action = eventArgs.change,
						index = eventArgs.index,
						items = eventArgs.items;

					switch (action) {
						case "insert":
							self.addViews(index, items);
							break;
						case "remove":
							self.removeViews(index, items.length);
							break;
						case "move":
							self.refresh(); // Could optimize this
							break;
						case "refresh":
							self.refresh();
							break;
						// Othercases: (e.g.undefined, for setProperty on observable object) etc. do nothing
					}
				}
				if (onAfterChange) {
					onAfterChange.call(this, ev, eventArgs);
				}
			}
		}

		//=============================
		// Utilities for event handlers
		//=============================

		function setArrayChangeLink(view) {
			// Add/remove arrayChange handler on view
			var handler, arrayBinding,
				type = view.type, // undefined if view is being removed
				data = view.data,
				bound = view._.bnd; // true for top-level link() or data-link="{for}", or the for tag instance for {^{for}} (or for any custom tag that has an onArrayChange handler)

			if (!view._.useKey && bound) {
				// This is an array view. (view._.useKey not defined => data is array), and is data-bound to collection change events

				if (arrayBinding = view._.bndArr) {
					// First remove the current handler if there is one
					$([arrayBinding[1]]).off(arrayChangeStr, arrayBinding[0]);
					view._.bndArr = undefined;
				}
				if (bound !== !!bound && bound._.inline) {
					// bound is not a boolean, so it is the data-linked tag that 'owns' this array binding - e.g. {^{for...}}
					if (type) {
						bound._.arrVws[view._.id] = view;
					} else {
						delete bound._.arrVws[view._.id]; // if view.type is undefined, view is being removed
					}
				} else if (type && data) {
					// If this view is not being removed, but the data array has been replaced, then bind to the new data array
					handler = function(ev) {
						if (!(ev.data && ev.data.off)) {
							// Skip if !!ev.data.off: - a handler that has already been removed (maybe was on handler collection at call time - then removed by another handler)
							// If view.type is undefined, do nothing. (Corresponds to case where there is another handler on the same data whose
							// effect was to remove this view, and which happened to precede this event in the trigger sequence. So although this
							// event has been removed now, it is still called since already on the trigger sequence)
							arrayChangeHandler.apply(view, arguments);
						}
					};
					$([data]).on(arrayChangeStr, handler);
					view._.bndArr = [handler, data];
				}
			}
		}

		function defaultAttr(elem, to, linkGetVal) {
			// to: true - default attribute for setting data value on HTML element; false: default attribute for getting value from HTML element
			// Merge in the default attribute bindings for this target element
			var nodeName = elem.nodeName.toLowerCase(),
				attr =
					$viewsSettings.merge[nodeName] // get attr settings for input textarea select or optgroup
					|| elem.contentEditable === sTRUE && {to: htmlStr, from: htmlStr}; // Or if contentEditable set to "true" set attr to "html"
			return attr
				? (to
				? ((nodeName === "input" && elem.type === RADIO) // For radio buttons, bind from value, but bind to 'radio' - special value.
				? RADIO
				: attr.to)
				: attr.from)
				: to
				? linkGetVal ? "text" : htmlStr // Default innerText for data-link="a.b.c" or data-link="{:a.b.c}" (with or without converters)- otherwise innerHTML
				: ""; // Default is not to bind from
		}

		//==============================
		// Rendering and DOM insertion
		//==============================

		function renderAndLink(view, index, tmpl, views, data, context, refresh) {
			var html, linkToNode, prevView, nodesToRemove, bindId,
				parentNode = view.parentElem,
				prevNode = view._prv,
				nextNode = view._nxt,
				elCnt = view._elCnt;

			if (prevNode && prevNode.parentNode !== parentNode) {
				error("Missing parentNode");
				// Abandon, since node has already been removed, or wrapper element has been inserted between prevNode and parentNode
			}

			if (refresh) {
				nodesToRemove = view.nodes();
				if (elCnt && prevNode && prevNode !== nextNode) {
					// This prevNode will be removed from the DOM, so transfer the view tokens on prevNode to nextNode of this 'viewToRefresh'
					transferViewTokens(prevNode, nextNode, parentNode, view._.id, "_", true);
				}
				// Remove child views
				view.removeViews(undefined, undefined, true);
				linkToNode = nextNode;

				if (elCnt) {
					prevNode = prevNode
						? prevNode.previousSibling
						: nextNode
						? nextNode.previousSibling
						: parentNode.lastChild;
				}

				// Remove HTML nodes
				$(nodesToRemove).remove();

				for (bindId in view._.bnds) {
					// The view bindings may have already been removed above in: $(nodesToRemove).remove();
					// If not, remove them here:
					removeViewBinding(bindId);
				}
			} else {
				// addViews. Only called if view is of type "array"
				if (index) {
					// index is a number, so indexed view in view array
					prevView = views[index - 1];
					if (!prevView) {
						return false; // If subview for provided index does not exist, do nothing
					}
					prevNode = prevView._nxt;
				}
				if (elCnt) {
					linkToNode = prevNode;
					prevNode = linkToNode
						? linkToNode.previousSibling         // There is a linkToNode, so insert after previousSibling, or at the beginning
						: parentNode.lastChild;              // If no prevView and no prevNode, index is 0 and the container is empty,
					// so prevNode = linkToNode = null. But if prevView._nxt is null then we set prevNode to parentNode.lastChild
					// (which must be before the prevView) so we insert after that node - and only link the inserted nodes
				} else {
					linkToNode = prevNode.nextSibling;
				}
			}
			html = tmpl.render(data, context, view._.useKey && refresh, view, refresh || index, true);
			// Pass in view._.useKey as test for noIteration (which corresponds to when self._.useKey > 0 and self.data is an array)

			// Link the new HTML nodes to the data
			view.link(data, parentNode, prevNode, linkToNode, html, prevView);
//}, 0);
		}

		//=====================
		// addBindingMarkers
		//=====================

		function addBindingMarkers(value, view, tmplBindingKey) {
			// Insert binding markers into the rendered template output, which will get converted to appropriate
			// data-jsv attributes (element-only content) or script marker nodes (phrasing or flow content), in convertMarkers,
			// within view.link, prior to inserting into the DOM. Linking will then bind based on these markers in the DOM.
			// Added view markers: #m_...VIEW.../m_
			// Added tag markers: #m^...TAG..../m^
			var id, tag, end;
			if (tmplBindingKey) {
				// This is a binding marker for a data-linked tag {^{...}}
				end = "^`";
				tag = view._.tag; // This is {^{>...}} or {^{tag ...}}, {{cvt:...} or {^{:...}}, and tag was defined in convertVal or renderTag
				id = tag._tgId;
				if (!id) {
					bindingStore[id = bindingKey++] = tag; // Store the tag temporarily, ready for databinding.
					// During linking, in addDataBinding, the tag will be attached to the linkCtx,
					// and then in observeAndBind, bindingStore[bindId] will be replaced by binding info.
					tag._tgId = "" + id;
				}
			} else {
				// This is a binding marker for a view
				// Add the view to the store of current linked views
				end = "_`";
				viewStore[id = view._.id] = view;
			}
			// Example: "#23^TheValue/23^"
			return "#" + id + end
			+ (value != undefined ? value : "") // For {^{:name}} this gives the equivalent semantics to compiled
				// (v=data.name)!=u?v:""; used in {{:name}} or data-link="name"
			+ "/" + id + end;
		}

		//==============================
		// Data-linking and data binding
		//==============================

		//---------------
		// observeAndBind
		//---------------

		function observeAndBind(linkCtx, source, target) { //TODO? linkFnArgs) {;
			var binding, l, linkedElem,
				tag = linkCtx.tag,
				cvtBk = linkCtx.convertBack,
				depends = [],
				bindId = linkCtx._bndId || "" + bindingKey++,
				handler = linkCtx._hdlr;

			delete linkCtx._bndId;

			if (tag) {
				// Use the 'depends' paths set on linkCtx.tag - which may have been set on declaration
				// or in events: init, render, onBeforeLink, onAfterLink etc.
				depends = tag.depends || depends;
				depends = $isFunction(depends) ? tag.depends(tag) : depends;
				linkedElem = tag.linkedElem;
			}
			if (!linkCtx._depends || ("" + linkCtx._depends !== "" + depends)) {
				// Only bind the first time, or if the new depends (toString) has changed from when last bound
				if (linkCtx._depends) {
					// Unobserve previous binding
					$observable._apply(false, [source], linkCtx._depends, handler, true);
				}
				binding = $observable._apply(
					false,
					[source],
					linkCtx.fn.deps, // flatten the paths - to gather all the dependencies across args and bound params
					depends,
					handler,
					linkCtx._ctxCb);
				// The binding returned by $observe has a bnd array with the source objects of the individual bindings.

				binding.elem = target; // The target of all the individual bindings
				binding.linkCtx = linkCtx;
				binding._tgId = bindId;
				// Add to the _jsvBnd on the target the view id and binding id - for unbinding when the target element is removed
				target._jsvBnd = target._jsvBnd || "";
				target._jsvBnd += "&" + bindId;
				linkCtx._depends = depends;
				// Store the binding key on the view, for disposal when the view is removed
				linkCtx.view._.bnds[bindId] = bindId;
				// Store the binding.
				bindingStore[bindId] = binding; // Note: If this corresponds to a data-linked tag, we are replacing the
				// temporarily stored tag by the stored binding. The tag will now be at binding.linkCtx.tag

				if (linkedElem) {
					binding.to = [[], cvtBk];
				}
				if (linkedElem || cvtBk !== undefined) {
					bindTo(binding, tag && tag.convertBack || cvtBk);
				}
				if (tag) {
					if (tag.onAfterBind) {
						tag.onAfterBind(binding);
					}
					if (!tag.flow && !tag._.inline) {
						target.setAttribute(jsvAttrStr, (target.getAttribute(jsvAttrStr)||"") + "#" + bindId + "^/" + bindId + "^");
						tag._tgId = "" + bindId;
					}
				}
			}
			if (linkedElem && linkedElem[0]) {
				if (tag._.radio) {
					linkedElem = linkedElem.children("input[type=radio]");
				}

				l = linkedElem.length;
				while (l--) {
					linkedElem[l]._jsvBnd = linkedElem[l]._jsvBnd || (target._jsvBnd + "+");
					// Add a "+" for cloned binding - so removing elems with cloned bindings will not remove the 'parent' binding from the bindingStore.
					linkedElem[l]._jsvLkEl = tag;
				}
			}
		}

		//-------
		// $.link
		//-------

		function tmplLink(to, from, context, noIteration, parentView, prevNode, nextNode) {
			return $link(this, to, from, context, noIteration, parentView, prevNode, nextNode);
		}

		function $link(tmplOrLinkTag, to, from, context, noIteration, parentView, prevNode, nextNode) {
			// When linking from a template, prevNode and nextNode parameters are ignored

			// Consider supporting this: $.link(true, data) - (top-level activation) target defaults to body.
			// But with templates, defaulting to body makes less sense, so not support for now...
			//if (to + "" !== to) {
			// nextNode = prevNode;
			// prevNode = parentView;
			// parentView = context;
			// context = from;
			// from = to;
			// to = "body";
			//}

			if (tmplOrLinkTag && to) {
				to = to.jquery ? to : $(to); // to is a jquery object or an element or selector

				if (!activeBody) {
					activeBody = document.body;
					$(activeBody)
						.on(elementChangeStr, elemChangeHandler)
						.on('blur', '[contenteditable]', elemChangeHandler);
				}

				var i, k, html, vwInfos, view, placeholderParent, targetEl, refresh,
					onRender = addBindingMarkers,
					replaceMode = context && context.target === "replace",
					l = to.length;

				while (l--) {
					targetEl = to[l];

					if ("" + tmplOrLinkTag === tmplOrLinkTag) {
						// tmplOrLinkTag is a string: treat as data-link expression.
						addDataBinding(tmplOrLinkTag, targetEl, $view(targetEl), undefined, true, from, context);
					} else {
						parentView = parentView || $view(targetEl);

						if (tmplOrLinkTag.markup !== undefined) {
							// This is a call to template.link()
							if (parentView.link === false) {
								context = context || {};
								context.link = onRender = false; // If link=false, don't allow nested context to switch on linking
							}
							// Set link=false, explicitly, to disable linking within a template nested within a linked template
							if (replaceMode) {
								placeholderParent = targetEl.parentNode;
							}

							html = tmplOrLinkTag.render(from, context, noIteration, parentView, undefined, onRender);
							// TODO Consider finding a way to bind data (link) within template without html being different for each view, the HTML can
							// be evaluated once outside the while (l--), and pushed into a document fragment, then cloned and inserted at each target.

							if (placeholderParent) {
								// This is target="replace" mode
								prevNode = targetEl.previousSibling;
								nextNode = targetEl.nextSibling;
								$.cleanData([targetEl], true);
								placeholderParent.removeChild(targetEl);

								targetEl = placeholderParent;
							} else {
								prevNode = nextNode = undefined; // When linking from a template, prevNode and nextNode parameters are ignored
								$(targetEl).empty();
							}
						} else if (tmplOrLinkTag === true && parentView === topView) {
							// $.link(true, selector, data, ctx) - where selector points to elem in top-level content
							refresh = {lnk: 1};
						} else {
							break;
						}

// TODO Consider deferred linking API feature on per-template basis - {@{ instead of {^{ which allows the user to see the rendered content
// before that content is linked, with better perceived perf. Have view.link return a deferred, and pass that to onAfterLink...
// or something along those lines.
// setTimeout(function() {

						if (targetEl._df && !nextNode) {
							// We are inserting new content and the target element has some deferred binding annotations,and there is no nextNode.
							// Those views may be stale views (that will be recreated in this new linking action) so we will first remove them
							// (if not already removed).
							vwInfos = viewInfos(targetEl._df, true, rOpenViewMarkers);

							for (i = 0, k = vwInfos.length; i < k; i++) {
								view = vwInfos[i];
								if ((view = viewStore[view.id]) && view.data !== undefined) {
									// If this is the _prv (prevNode) for a view, remove the view
									// - unless view.data is undefined, in which case it is already being removed
									view.parent.removeViews(view._.key, undefined, true);
								}
							}
							setDefer(targetEl); // remove defer tokens
						}

						// Link the content of the element, since this is a call to template.link(), or to $(el).link(true, ...),
						parentView.link(from, targetEl, prevNode, nextNode, html, refresh, context);
//}, 0);
					}
				}
			}
			return to; // Allow chaining, to attach event handlers, etc.
		}

		//----------
		// view.link
		//----------

		function viewLink(outerData, parentNode, prevNode, nextNode, html, refresh, context, validateOnly) {
			// Optionally insert HTML into DOM using documentFragments (and wrapping HTML appropriately).
			// Data-link existing contents of parentNode, or the inserted HTML, if provided

			// Depending on the content model for the HTML elements, the standard data-linking markers inserted in the HTML by addBindingMarkers during
			// template rendering will be converted either to script marker nodes or, for element-only content sections, to data-jsv element annotations.

			// Data-linking will then add _prv and _nxt to views, where:
			//     _prv: References the previous node (script element of type "jsv123"), or (for elCnt=true), the first element node in the view (or if none, set _prv = _nxt)
			//     _nxt: References the last node (script element of type "jsv/123"), or (for elCnt=true), the next element node after the view.

			//==== nested functions ====
			function convertMarkers(all, preceding, selfClose, closeTag, spaceBefore, id, spaceAfter, tag1, tag2, closeTag2, spaceAfterClose, selfClose2, endOpenTag) {
				// rConvertMarkers = /(^|(\/>)|<\/(\w+)>|)(\s*)([#\/]\d+[_^])`(\s*)(<\w+(?=[\s\/>]))?|\s*(?:(<\w+(?=[\s\/>]))|<\/(\w+)>(\s*)|(\/>)\s*|(>))/g,
				//                 prec, slfCl, clsTag,  spBefore, id,	     spAfter,tag1,                   tag2,               clTag2,sac  slfCl2, endOpenTag
				// Convert the markers that were included by addBindingMarkers in template output, to appropriate DOM annotations:
				// data-jsv attributes (for element-only content) or script marker nodes (within phrasing or flow content).

// TODO consider detecting 'quoted' contexts (attribute strings) so that attribute encoding does not need to encode >
// Currently rAttrEncode = /[><"'&]/g includes '>' encoding in order to avoid erroneous parsing of <span title="&lt;a/>"><span title="&lt;a/>">
				var errorMsg,
					endOfElCnt = "";
				if (endOpenTag) {
					inTag = 0;
					return all;
				}
				tag = tag1 || tag2 || "";
				closeTag = closeTag || closeTag2;
				selfClose = selfClose || selfClose2;
				if (isVoid && !selfClose && (closeTag || tag || id)) {
					isVoid = undefined;
					parentTag = tagStack.shift(); // preceding tag was a void element, with no closing slash, such as <br>.
				}
				closeTag = closeTag || selfClose;
				if (closeTag) {
					inTag = 0,
						isVoid = undefined;
					// TODO: smart insertion of <tbody> - to be completed for robust insertion of deferred bindings etc.
					//if (closeTag === "table" && parentTag === "tbody") {
					//	preceding = "</tbody>" + preceding;
					//	parentTag = "table";
					//	tagStack.shift();
					//}
					if (validate) {
						if (selfClose || selfClose2) {
							if (!voidElems[parentTag] && !/;svg;|;math;/.test(";" + tagStack.join(";") + ";")) {
								// Only self-closing elements must be legitimate void elements, such as <br/>, per HTML schema,
								// or under svg or math foreign namespace elements.
								errorMsg = "'<" + parentTag + ".../";
							}
						} else if (voidElems[closeTag]) {
							errorMsg = "'</" + closeTag; // closing tag such as </input>
						} else if (!tagStack.length || closeTag !== parentTag) {
							errorMsg = "Mismatch: '</" + closeTag;
						}
						if (errorMsg) {
							syntaxError(errorMsg + ">' in:\n" + html);
						}
					}
					prevElCnt = elCnt;
					parentTag = tagStack.shift();
					elCnt = elContent[parentTag];
					closeTag2 = closeTag2 ? ("</" + closeTag2 + ">") : "";
					if (prevElCnt) {
						// If there are ids (markers since the last tag), move them to the defer string
						defer += ids;
						ids = "";
						if (!elCnt) {
							endOfElCnt = closeTag2 + openScript + "@" + defer + closeScript + (spaceAfterClose || "");
							defer = deferStack.shift();
						} else {
							defer += "-"; // Will be used for stepping back through deferred tokens
						}
					}
				}
				if (elCnt) {
					// elContent maps tagNames which have only element content, so may not support script nodes.
					// We are in element-only content, can remove white space, and use data-jsv attributes on elements as markers
					// Example: <tr data-jsv="/2_#6_"> - close marker for view 2 and open marker for view 6

					if (id) {
						// append marker for this id, to ids string
						ids += id;
					} else {
						preceding = (closeTag2 || selfClose2 || "");
					}
					if (tag) {
						// TODO: smart insertion of <tbody> - to be completed for robust insertion of deferred bindings etc.
						//if (tag === "<tr" && parentTag === "table") {
						//	tagStack.unshift(parentTag);
						//	parentTag = "tbody";
						//	preceding += "<" + parentTag + ">";
						//	if (defer) {
						//		defer += "+"; // Will be used for stepping back through deferred tokens
						//	}
						//	// TODO: move this to design-time validation check
						//	//	error('"' + parentTag + '" has incorrect parent tag');
						//}
						preceding += tag;
						if (ids) {
							preceding += ' ' + jsvAttrStr + '="' + ids + '"';
							ids = "";
						}
					}
				} else {
					// We are in phrasing or flow content, so use script marker nodes
					// Example: <script type="jsv3/"></script> - data-linked tag, close marker
					// TODO add validation to track whether we are in attribute context (not yet hit preceding ending with a >) or element content of current 'parentTag'
					// and accordingly disallow inserting script markers in attribute context. Similar for elCnt too, so no "<table {{if ...}}...{{/if}}... >" or "<table {{if ...}}...> ...{{/if}}..."
					preceding = id
						? (preceding + endOfElCnt + spaceBefore + openScript + id + closeScript + spaceAfter + tag)
						: endOfElCnt || all;
				}

				if (inTag && id) {
					// JsViews data-linking tags are not allowed within element markup. See https://github.com/BorisMoore/jsviews/issues/213
					syntaxError(' No {^{ tags within elem markup (' + inTag + ' ). Use data-link="..."');
				}
				if (tag) {
					inTag = tag;
					// If there are ids (markers since the last tag), move them to the defer string
					tagStack.unshift(parentTag);
					parentTag = tag.slice(1);
					if (tagStack[0] && tagStack[0] === badParent[parentTag]) {
						// Missing <tbody>
						// TODO: replace this by smart insertion of <tbody> tags
						error('Parent of <tr> must be <tbody>');
					}
					isVoid = voidElems[parentTag];
					if ((elCnt = elContent[parentTag]) && !prevElCnt) {
						deferStack.unshift(defer);
						defer = "";
					}
					prevElCnt = elCnt;
//TODO Consider providing validation which throws if you place <span> as child of <tr>, etc. - since if not caught,
//this can cause errors subsequently which are difficult to debug.
//				if (elContent[tagStack[0]]>2 && !elCnt) {
//					error(parentTag + " in " + tagStack[0]);
//				}
					if (defer && elCnt) {
						defer += "+"; // Will be used for stepping back through deferred tokens
					}
				}
				return preceding;
			}

			function processViewInfos(vwInfos, targetParent) {
				// If targetParent, we are processing viewInfos (which may include navigation through '+-' paths) and hooking up to the right parentElem etc.
				// (and elem may also be defined - the next node)
				// If no targetParent, then we are processing viewInfos on newly inserted content
				var deferPath, deferChar, bindChar, parentElem, id, onAftCr, deep,
					addedBindEls = [];

				// In elCnt context (element-only content model), prevNode is the first node after the open, nextNode is the first node after the close.
				// If both are null/undefined, then open and close are at end of parent content, so the view is empty, and its placeholder is the
				// 'lastChild' of the parentNode. If there is a prevNode, then it is either the first node in the view, or the view is empty and
				// its placeholder is the 'previousSibling' of the prevNode, which is also the nextNode.
				if (vwInfos) {
					if (vwInfos._tkns.charAt(0) === "@") {
						// We are processing newly inserted content. This is a special script element that was created in convertMarkers() to process deferred bindings,
						// and inserted following the target parent element - because no element tags (outside elCnt) were encountered to carry those binding tokens.
						// We will step back from the preceding sibling of this element, looking at targetParent elements until we find the one that the current binding
						// token belongs to. Set elem to null (the special script element), and remove it from the DOM.
						targetParent = elem.previousSibling;
						elem.parentNode.removeChild(elem);
						elem = undefined;
					}
					len = vwInfos.length;
					while (len--) {
						vwInfo = vwInfos[len];
//if (prevIds.indexOf(vwInfo.token) < 0) { // This token is a newly created view or tag binding
						bindChar = vwInfo.ch;
						if (deferPath = vwInfo.path) {
							// We have a 'deferred path'
							j = deferPath.length - 1;
							while (deferChar = deferPath.charAt(j--)) {
								// Use the "+" and"-" characters to navigate the path back to the original parent node where the deferred bindings ocurred
								if (deferChar === "+") {
									if (deferPath.charAt(j) === "-") {
										j--;
										targetParent = targetParent.previousSibling;
									} else {
										targetParent = targetParent.parentNode;
									}
								} else {
									targetParent = targetParent.lastChild;
								}
								// Note: Can use previousSibling and lastChild, not previousElementSibling and lastElementChild,
								// since we have removed white space within elCnt. Hence support IE < 9
							}
						}
						if (bindChar === "^") {
							if (tag = bindingStore[id = vwInfo.id]) {
								// The binding may have been deleted, for example in a different handler to an array collectionChange event
								// This is a tag binding
								deep = targetParent && (!elem || elem.parentNode !== targetParent); // We are stepping back looking for the right targetParent,
								// or we are linking existing content and this element is in elCnt, not an immediate child of the targetParent.
								if (!elem || deep) {
									tag.parentElem = targetParent;
								}
								if (vwInfo.elCnt && deep) {
									// With element only content, if there is no following element, or if the binding is deeper than the following element
									// then we need to set the open or close token as a deferred binding annotation on the parent
									setDefer(targetParent, (vwInfo.open ? "#" : "/") + id + bindChar + (targetParent._df || ""));
								}
								// This is an open or close marker for a data-linked tag {^{...}}. Add it to bindEls.
								addedBindEls.push([deep ? null : elem, vwInfo]);
							}
						} else if (view = viewStore[id = vwInfo.id]) {
							// The view may have been deleted, for example in a different handler to an array collectionChange event
							if (!view.parentElem) {
								// If view is not already extended for JsViews, extend and initialize the view object created in JsRender, as a JsViews view
								view.parentElem = targetParent || elem && elem.parentNode || parentNode;
								view._.onRender = addBindingMarkers;
								view._.onArrayChange = arrayChangeHandler;
								setArrayChangeLink(view);
							}
							parentElem = view.parentElem;
							if (vwInfo.open) {
								// This is an 'open view' node (preceding script marker node,
								// or if elCnt, the first element in the view, with a data-jsv annotation) for binding
								view._elCnt = vwInfo.elCnt;
								if (targetParent && !elem) {
									setDefer(targetParent, "#" + id + bindChar + (targetParent._df || ""));
								} else {
									// No targetParent, so there is a ._nxt elem (and this is processing tokens on the elem)
									if (!view._prv) {
										setDefer(parentElem, removeSubStr(parentElem._df, "#" + id + bindChar));
									}
									view._prv = elem;
								}
							} else {
								// This is a 'close view' marker node for binding
								if (targetParent && (!elem || elem.parentNode !== targetParent)) {
									// There is no ._nxt so add token to _df. It is deferred.
									setDefer(targetParent, "/" + id + bindChar + (targetParent._df || ""));
									view._nxt = undefined;
								} else if (elem) {
									// This view did not have a ._nxt, but has one now, so token may be in _df, and must be removed. (No longer deferred)
									if (!view._nxt) {
										setDefer(parentElem, removeSubStr(parentElem._df, "/" + id + bindChar));
									}
									view._nxt = elem;
								}
								linkCtx = view.linkCtx;
								if (onAftCr = view.ctx && view.ctx.onAfterCreate || onAfterCreate) {
									onAftCr.call(linkCtx, view);
								}
							}
//}
						}
					}
					len = addedBindEls.length;
					while (len--) {
						// These were added in reverse order to addedBindEls. We push them in BindEls in the correct order.
						bindEls.push(addedBindEls[len]);
					}
				}
				return !vwInfos || vwInfos.elCnt;
			}

			function getViewInfos(vwInfos) {
				// Used by view.childTags() and tag.childTags()
				// Similar to processViewInfos in how it steps through bindings to find tags. Only finds data-linked tags.
				var level, parentTag;

				if (vwInfos) {
					len = vwInfos.length;
					for (j = 0; j < len; j++) {
						vwInfo = vwInfos[j];
						// This is an open marker for a data-linked tag {^{...}}, within the content of the tag whose id is get.id. Add it to bindEls.
						parentTag = tag = bindingStore[vwInfo.id].linkCtx.tag;
						if (!tag.flow) {
							if (!deep) {
								level = 1;
								while (parentTag = parentTag.parent) {
									level++;
								}
								tagDepth = tagDepth || level; // The level of the first tag encountered.
							}
							if ((deep || level === tagDepth) && (!tagName || tag.tagName === tagName)) {
								// Filter on top-level or tagName as appropriate
								tags.push(tag);
							}
						}
					}
				}
			}

			function dataLink() {
				//================ Data-link and fixup of data-jsv annotations ================
				var j, index,
					tokens = "",
					wrap = {},
					selector = linkViewsSel + (get ? ",[" + deferAttr + "]" : "");
				// If a childTags() call, get = ",[" + deferAttr + "]" - since we need to include elements that have a ._df expando for deferred tokens

				elems = qsa ? parentNode.querySelectorAll(selector) : $(selector, parentNode).get();
				l = elems.length;

				// The prevNode will be in the returned query, since we called markPrevOrNextNode() on it.
				// But it may have contained nodes that satisfy the selector also.
				if (prevNode && prevNode.innerHTML) {
					// Find the last contained node of prevNode, to use as the prevNode - so we only link subsequent elems in the query
					prevNodes = qsa ? prevNode.querySelectorAll(selector) : $(selector, prevNode).get();
					prevNode = prevNodes.length ? prevNodes[prevNodes.length - 1] : prevNode;
				}

				tagDepth = 0;
				for (i = 0; i < l; i++) {
					elem = elems[i];
					if (prevNode && !found) {
						// If prevNode is set, not false, skip linking. If this element is the prevNode, set to false so subsequent elements will link.
						found = (elem === prevNode);
					} else if (nextNode && elem === nextNode) {
						// If nextNode is set then break when we get to nextNode
						if (get) {
							tokens += markerNodeInfo(elem);
						}
						break;
					} else if (elem.parentNode) {
						// elem has not been removed from DOM
						if (get) {
							tokens += markerNodeInfo(elem);
							if (elem._df) {
								j = i+1;
								while (j < l && elem.contains(elems[j])) {
									j++;
								}
								// Add defered tokens after any tokens on descendant elements of this one
								wrap[j-1] = elem._df;
							}
							if (wrap[i]) {
								tokens += wrap[i] || "";
							}
						} else {
							if (isLink && (vwInfo = viewInfos(elem, undefined, rViewMarkers)) && (vwInfo = vwInfo[0])) {
								// If this is a link(trueOrString ...) call we will avoid re-binding to elems that are within template-rendered views
								skip = skip ? (vwInfo.id !== skip && skip) : vwInfo.open && vwInfo.id;
							}
							if (!skip && processInfos(viewInfos(elem))
									// If a link() call, processViewInfos() adds bindings to bindEls, and returns true for non-script nodes, for adding data-link bindings
									// If a childTags() call, getViewInfos returns array of tag bindings.
								&& elem.getAttribute($viewsLinkAttr)) {
								bindEls.push([elem]); // A data-linked element so add to bindEls too
							}
						}
					}
				}

				if (get) {
					tokens += parentNode._df || "";
					if (index = tokens.indexOf("#" + get.id) + 1) {
						// We are looking for view.childTags() or tag.childTags() - so start after the open token of the parent view or tag.
						tokens = tokens.slice(index + get.id.length);
					}
					index = tokens.indexOf("/" + get.id);
					if (index + 1) {
						// We are looking for view.childTags() or tag.childTags() - so don't look beyond the close token of the parent view or tag.
						tokens = tokens.slice(0, index);
					}
					// Call getViewInfos to add the found childTags to the tags array
					getViewInfos(viewInfos(tokens, undefined, rOpenTagMarkers));
				}

				if (html === undefined && parentNode.getAttribute($viewsLinkAttr)) {
					bindEls.push([parentNode]); // Support data-linking top-level element directly (not within a data-linked container)
				}

				// Remove temporary marker script nodes they were added by markPrevOrNextNode
				unmarkPrevOrNextNode(prevNode, elCnt);
				unmarkPrevOrNextNode(nextNode, elCnt);

				if (get) {
					lazyLink && lazyLink.resolve();
					return; // We have added childTags to the tags array, so we are done
				}

				if (elCnt && defer + ids) {
					// There are some views with elCnt, for which the open or close did not precede any HTML tag - so they have not been processed yet
					elem = nextNode;
					if (defer) {
						if (nextNode) {
							processViewInfos(viewInfos(defer + "+", true), nextNode);
						} else {
							processViewInfos(viewInfos(defer, true), parentNode);
						}
					}
					processViewInfos(viewInfos(ids, true), parentNode);
					// If there were any tokens on nextNode which have now been associated with inserted HTML tags, remove them from nextNode
					if (nextNode) {
						tokens = nextNode.getAttribute(jsvAttrStr);
						if (l = tokens.indexOf(prevIds) + 1) {
							tokens = tokens.slice(l + prevIds.length - 1);
						}
						nextNode.setAttribute(jsvAttrStr, ids + tokens);
					}
				}

				//================ Bind the data-linked elements and tags ================
				l = bindEls.length;
				for (i = 0; i < l; i++) {
					elem = bindEls[i];
					linkInfo = elem[1];
					elem = elem[0];
					if (linkInfo) {
						if (tag = bindingStore[linkInfo.id]) {
							if (linkCtx = tag.linkCtx) {
								// The tag may have been stored temporarily on the bindingStore - or may have already been replaced by the actual binding
								tag = linkCtx.tag;
								tag.linkCtx = linkCtx;
							}
							if (linkInfo.open) {
								// This is an 'open linked tag' binding annotation for a data-linked tag {^{...}}
								if (elem) {
									tag.parentElem = elem.parentNode;
									tag._prv = elem;
								}
								tag._elCnt = linkInfo.elCnt;
								if (tag && (!tag.onBeforeLink || tag.onBeforeLink() !== false) && !tag._.bound) {
									// By default we data-link depth-last ("on the way in"), which is better for perf. But if a tag needs nested tags to be linked (refreshed)
									// first, before linking its content, then make onBeforeLink() return false. In that case we data-link depth-first ("on the way out"), so nested tags will have already refreshed.
									tag._.bound = true;
									view = tag.tagCtx.view;
									addDataBinding(undefined, tag._prv, view, linkInfo.id);
								}

								tag._.linking = true;
							} else {
								tag._nxt = elem;
								if (tag._.linking) {
									// This is a 'close linked tag' binding annotation
									// Add data binding
									tagCtx = tag.tagCtx;
									view = tagCtx.view;
									delete tag._.linking;
									if (!tag._.bound) {
										tag._.bound = true;
										addDataBinding(undefined, tag._prv, view, linkInfo.id);  // Not top view, id, no outer data or context
									}
									callAfterLink(tag, tagCtx);
								}
							}
						}
					} else {
						// Add data binding for a data-linked element (with data-link attribute)
						addDataBinding(elem.getAttribute($viewsLinkAttr), elem, $view(elem), undefined, isLink, outerData, context);
					}
				}
				lazyLink && lazyLink.resolve();
			}
			//==== /end of nested functions ====

			var inTag, linkCtx, tag, i, l, j, len, elems, elem, view, vwInfo, linkInfo, prevNodes, token, prevView, nextView,
				node, tags, deep, tagName, tagCtx, validate, tagDepth, depth, fragment, copiedNode, firstTag, parentTag,
				isVoid, wrapper, div, tokens, elCnt, prevElCnt, htmlTag, ids, prevIds, found, skip, lazyLink, isLink, get,
				self = this,
				thisId = self._.id + "_",
				defer = "",
			// The marker ids for which no tag was encountered (empty views or final closing markers) which we carry over to container tag
				bindEls = [],
				tagStack = [],
				deferStack = [],
				onAfterCreate = self.hlp(onAfterCreateStr),
				processInfos = processViewInfos;

			if (refresh) {
				lazyLink = refresh.lazyLink && $.Deferred();
				if (refresh.tmpl) {
					// refresh is the prevView, passed in from addViews()
					prevView = "/" + refresh._.id + "_";
				} else {
					isLink = refresh.lnk; // Top-level linking
					if (refresh.tag) {
						thisId = refresh.tag + "^";
						refresh = true;
					}
					if (get = refresh.get) {
						processInfos = getViewInfos;
						tags = get.tags;
						deep = get.deep;
						tagName = get.name;
					}
				}
				refresh = refresh === true;
			}

			parentNode = parentNode
				? ("" + parentNode === parentNode
				? $(parentNode)[0]  // It is a string, so treat as selector
				: parentNode.jquery
				? parentNode[0] // A jQuery object - take first element.
				: parentNode)
				: (self.parentElem      // view.link()
			|| document.body);  // link(null, data) to link the whole document

			validate = !$viewsSettings.noValidate && parentNode.contentEditable !== sTRUE;
			parentTag = parentNode.tagName.toLowerCase();
			elCnt = !!elContent[parentTag];

			prevNode = prevNode && markPrevOrNextNode(prevNode, elCnt);
			nextNode = nextNode && markPrevOrNextNode(nextNode, elCnt) || null;

			if (html != undefined) {
				//================ Insert html into DOM using documentFragments (and wrapping HTML appropriately). ================
				// Also convert markers to DOM annotations, based on content model.
				// Corresponds to nextNode ? $(nextNode).before(html) : $(parentNode).html(html);
				// but allows insertion to wrap correctly even with inserted script nodes. jQuery version will fail e.g. under tbody or select.
				// This version should also be slightly faster
				div = document.createElement("div");
				wrapper = div;
				prevIds = ids = "";
				htmlTag = parentNode.namespaceURI === "http://www.w3.org/2000/svg" ? "svg_ns" : (firstTag = rFirstElem.exec(html)) && firstTag[1] || "";
				if (noDomLevel0 && firstTag && firstTag[2]) {
					error("Unsupported: " + firstTag[2]); // For security reasons, don't allow insertion of elements with onFoo attributes.
				}
				if (elCnt) {
					// Now look for following view, and find its tokens, or if not found, get the parentNode._df tokens
					node = nextNode;
					while (node && !(nextView = viewInfos(node))) {
						node = node.nextSibling;
					}
					if (tokens = nextView ? nextView._tkns : parentNode._df) {
						token = prevView || "";
						if (refresh || !prevView) {
							token += "#" + thisId;
						}
						j = tokens.indexOf(token);
						if (j + 1) {
							j += token.length;
							// Transfer the initial tokens to inserted nodes, by setting them as the ids variable, picked up in convertMarkers
							prevIds = ids = tokens.slice(0, j);
							tokens = tokens.slice(j);
							if (nextView) {
								node.setAttribute(jsvAttrStr, tokens);
							} else {
								setDefer(parentNode, tokens);
							}
						}
					}
				}

				//================ Convert the markers to DOM annotations, based on content model. ================
//			oldElCnt = elCnt;
				isVoid = undefined;
				html = ("" + html).replace(rConvertMarkers, convertMarkers);
//			if (!!oldElCnt !== !!elCnt) {
//				error("Parse: " + html); // Parse error. Content not well-formed?
//			}
				if (validate && tagStack.length) {
					syntaxError("Mismatched '<" + parentTag + "...>' in:\n" + html); // Unmatched tag
				}
				if (validateOnly) {
					return;
				}
				// Append wrapper element to doc fragment
				safeFragment.appendChild(div);

				// Go to html and back, then peel off extra wrappers
				// Corresponds to jQuery $(nextNode).before(html) or $(parentNode).html(html);
				// but supports svg elements, and other features missing from jQuery version (and this version should also be slightly faster)
				htmlTag = wrapMap[htmlTag] || wrapMap.div;
				depth = htmlTag[0];
				wrapper.innerHTML = htmlTag[1] + html + htmlTag[2];
				while (depth--) {
					wrapper = wrapper.lastChild;
				}
				safeFragment.removeChild(div);
				fragment = document.createDocumentFragment();
				while (copiedNode = wrapper.firstChild) {
					fragment.appendChild(copiedNode);
				}
				// Insert into the DOM
				parentNode.insertBefore(fragment, nextNode);
			}

			if (lazyLink) {
				setTimeout(dataLink, 0);
			} else {
				dataLink();
			}

			return lazyLink && lazyLink.promise();
		}

		function addDataBinding(linkMarkup, node, currentView, boundTagId, isLink, data, context) {
			// Add data binding for data-linked elements or {^{...}} data-linked tags
			var tmpl, tokens, attr, convertBack, params, trimLen, tagExpr, linkFn, linkCtx, tag, rTagIndex;

			if (boundTagId) {
				// boundTagId is a string for {^{...}} data-linked tag. So only one linkTag in linkMarkup
				// data and context parameters are undefined
				tag = bindingStore[boundTagId];
				tag = tag.linkCtx ? tag.linkCtx.tag : tag;

				linkCtx = tag.linkCtx || {
					data: currentView.data,                   // source
					elem: tag._elCnt ? tag.parentElem : node, // target
					view: currentView,
					ctx: currentView.ctx,
					attr: htmlStr, // Script marker nodes are associated with {^{ and always target HTML.
					fn: tag._.bnd,
					tag: tag,
					// Pass the boundTagId in the linkCtx, so that it can be picked up in observeAndBind
					_bndId: boundTagId
				};
				bindDataLinkTarget(linkCtx, linkCtx.fn);
			} else if (linkMarkup && node) {
				// If isLink then this is a top-level linking: .link(expression, target, data, ....) or
				// .link(true, target, data, ....) scenario - and data and context are passed in separately from the view
				data = isLink ? data : currentView.data;

				// Compiled linkFn expressions could be stored in the tmpl.links array of the template
				// TODO - consider also caching globally so that if {{:foo}} or data-link="foo" occurs in different places,
				// the compiled template for this is cached and only compiled once...
				//links = currentView.links || currentView.tmpl.links;

				tmpl = currentView.tmpl;

//			if (!(linkTags = links[linkMarkup])) {
				// This is the first time this view template has been linked, so we compile the data-link expressions, and store them on the template.

				linkMarkup = normalizeLinkTag(linkMarkup, defaultAttr(node));
				rTag.lastIndex = 0;
				while (tokens = rTag.exec(linkMarkup)) { // TODO require } to be followed by whitespace or $, and remove the \}(!\}) option.
					// Iterate over the data-link expressions, for different target attrs,
					// e.g. <input data-link="{:firstName:} title{>~description(firstName, lastName)}"
					// tokens: [all, attr, bindOnly, tagExpr, tagName, converter, colon, html, comment, code, params]
					rTagIndex = rTag.lastIndex;
					attr = tokens[1];
					tagExpr = tokens[3];
					params = tokens[10];
					convertBack = undefined;

					linkCtx = {
						data: data, // source
						elem: node, // target
						view: currentView,
						ctx: context,
						attr: attr,
						isLk: isLink, // top-level linking?
						_initVal: !tokens[2]
					};

					if (tokens[6]) {
						// TODO include this in the original rTag regex
						// Only for {:} link"

						if (!attr && (convertBack = /:([\w$]*)$/.exec(params))) {
							// two-way binding
							convertBack = convertBack[1];
							if (convertBack !== undefined) {
								// There is a convertBack function
								trimLen = - convertBack.length - 1;
								tagExpr = tagExpr.slice(0, trimLen - 1) + delimCloseChar0; // Remove the convertBack string from expression.
							}
						}
						if (convertBack === null) {
							convertBack = undefined;
						}
						linkCtx.convert = tokens[5] || "";
					}
					// Compile the linkFn expression which evaluates and binds a data-link expression
					// TODO - optimize for the case of simple data path with no conversion, helpers, etc.:
					//     i.e. data-link="a.b.c". Avoid creating new instances of Function every time. Can use a default function for all of these...

					linkCtx.expr = attr + tagExpr;
					linkFn = tmpl.links[tagExpr];
					if (!linkFn) {
						tmpl.links[tagExpr] = linkFn = $sub.tmplFn(tagExpr, tmpl, true, convertBack);
					}
					linkCtx.fn = linkFn;
					if (!attr && convertBack !== undefined) {
						// Default target, so allow 2 way binding
						linkCtx.convertBack = convertBack;
					}
					bindDataLinkTarget(linkCtx, linkFn);
					// We store rTagIndex in local scope, since this addDataBinding method can sometimes be called recursively,
					// and each is using the same rTag instance.
					rTag.lastIndex = rTagIndex;
				}
//		}
			}
		}

		function bindDataLinkTarget(linkCtx, linkFn) {
			// Add data link bindings for a link expression in data-link attribute markup
			function handler(ev, eventArgs) {
				propertyChangeHandler.call(linkCtx, ev, eventArgs, linkFn);
				// If the link expression uses a custom tag, the propertyChangeHandler call will call renderTag, which will set tagCtx on linkCtx
			}
			handler.noArray = true;
			if (linkCtx.isLk) {
				// Top-level linking: .link(expressionOrTrue, data, context) - so we need to create a view for the linking, with the data and ctx
				// which may be different than the current context of the target. Treat the new view as child of topView.
				linkCtx.view = new $sub.View(linkCtx.ctx, "link", topView, linkCtx.data, topView.tmpl, undefined, undefined, addBindingMarkers);
			}
			linkCtx._ctxCb = getContextCb(linkCtx.view); // _ctxCb is for filtering/appending to dependency paths: function(path, object) { return [(object|path)*]}
			linkCtx._hdlr = handler;
			handler(true);
		}

		//=====================
		// Data-linking helpers
		//=====================

		function removeSubStr(str, substr) {
			var k;
			return str
				? (k = str.indexOf(substr),
				(k + 1
					? str.slice(0, k) + str.slice(k + substr.length)
					: str))
				: "";
		}

		function markerNodeInfo(node) {
			return node &&
			("" + node === node
				? node
				: node.tagName === "SCRIPT"
				? node.type.slice(3)
				: node.nodeType === 1 && node.getAttribute(jsvAttrStr) || "");
		}

		function viewInfos(node, isVal, rBinding) {
			// Test whether node is a script marker node, and if so, return metadata
			function getInfos(all, open, close, id, ch, elPath) {
				infos.push({
					elCnt: elCnt,
					id: id,
					ch: ch,
					open: open,
					close: close,
					path: elPath,
					token: all
				});
			}
			var elCnt, tokens,
				infos = [];
			if (tokens = isVal ? node : markerNodeInfo(node)) {
				infos.elCnt = !node.type;
				elCnt = tokens.charAt(0) === "@" || !node.type;
				infos._tkns = tokens;
				// rMarkerTokens = /(?:(#)|(\/))(\d+)([_^])([-+@\d]+)?/g;
				tokens.replace(rBinding || rMarkerTokens, getInfos);
				return infos;
			}
		}

		function unmarkPrevOrNextNode(node, elCnt) {
			if (node) {
				if (node.type === "jsv") {
					node.parentNode.removeChild(node);
				} else if (elCnt && node.getAttribute($viewsLinkAttr) === "") {
					node.removeAttribute($viewsLinkAttr);
				}
			}
		}

		function markPrevOrNextNode(node, elCnt) {
			var marker = node;
			while (elCnt && marker && marker.nodeType !== 1) {
				marker = marker.previousSibling;
			}
			if (marker) {
				if (marker.nodeType !== 1) {
					// For text nodes, we will add a script node before
					marker = document.createElement("SCRIPT");
					marker.type = "jsv";
					node.parentNode.insertBefore(marker, node);
				} else if (!markerNodeInfo(marker) && !marker.getAttribute($viewsLinkAttr)) {
					// For element nodes, we will add a data-link attribute (unless there is already one)
					// so that this node gets included in the node linking process.
					marker.setAttribute($viewsLinkAttr, "");
				}
			}
			return marker;
		}

		function normalizeLinkTag(linkMarkup, twoway) {
			linkMarkup = $.trim(linkMarkup).replace(rEscapeQuotes, "\\$&");
			return linkMarkup.slice(-1) !== delimCloseChar0
				// If simplified syntax is used: data-link="expression", convert to data-link="{:expression}",
				// or for inputs, data-link="{:expression:}" for (default) two-way binding
				? linkMarkup = delimOpenChar1 + ":" + linkMarkup + (twoway ? ":" : "") + delimCloseChar0
				: linkMarkup;
		}

		//===========================
		// Methods for views and tags
		//===========================

		linkMethods = {
			contents: function(deep, select) {
				// For a view or a tag, return jQuery object with the content nodes,
				if (deep !== !!deep) {
					// deep not boolean, so this is getContents(selector)
					select = deep;
					deep = undefined;
				}
				var filtered,
					nodes = $(this.nodes());
				if (nodes[0]) {
					filtered = select ? nodes.filter(select) : nodes;
					nodes = deep && select ? filtered.add(nodes.find(select)) : filtered;
				}
				return nodes;
			},

			nodes: function(withMarkers, prevNode, nextNode) {
				// For a view or a tag, return top-level nodes
				// Do not return any script marker nodes, unless withMarkers is true
				// Optionally limit range, by passing in prevNode or nextNode parameters

				var node,
					self = this,
					elCnt = self._elCnt,
					prevIsFirstNode = !prevNode && elCnt,
					nodes = [];

				prevNode = prevNode || self._prv;
				nextNode = nextNode || self._nxt;

				node = prevIsFirstNode
					? (prevNode === self._nxt
					? self.parentElem.lastSibling
					: prevNode)
					: (self._.inline === false
					? prevNode || self.linkCtx.elem.firstChild
					: prevNode && prevNode.nextSibling);

				while (node && (!nextNode || node !== nextNode)) {
					if (withMarkers || elCnt || node.tagName !== "SCRIPT") {
						// All the top-level nodes in the view
						// (except script marker nodes, unless withMarkers = true)
						// (Note: If a script marker node, viewInfo.elCnt undefined)
						nodes.push(node);
					}
					node = node.nextSibling;
				}
				return nodes;
			},

			childTags: function(deep, tagName) {
				// For a view or a tag, return child tags - at any depth, or as immediate children only.
				if (deep !== !!deep) {
					// deep not boolean, so this is childTags(tagName) - which looks for top-level tags of given tagName
					tagName = deep;
					deep = undefined;
				}

				var self = this,
					view = self.link ? self : self.tagCtx.view, // this may be a view or a tag. If a tag, get the view from tag.view.tagCtx
					prevNode = self._prv,
					elCnt = self._elCnt,
					tags = [];

				view.link(
					undefined,
					self.parentElem,
					elCnt ? prevNode && prevNode.previousSibling : prevNode,
					self._nxt,
					undefined,
					{get:{
						tags:tags,
						deep: deep,
						name: tagName,
						id: self.link ? self._.id + "_" : self._tgId + "^"
					}}
				);
				return tags;
			},

			refresh: function(sourceValue) {
				var promise, attr,
					tag = this,
					linkCtx = tag.linkCtx,
					view = tag.tagCtx.view;

				if (tag.disposed) { error("Removed tag"); }
				if (sourceValue === undefined) {
					sourceValue = $views._tag(tag, view, view.tmpl, mergeCtxs(tag), true); // Get rendered HTML for tag, based on refreshed tagCtxs
				}
				if (sourceValue + "" === sourceValue) {
					// If no rendered content, sourceValue will not be a string (can be 0 or undefined)
					attr = tag._.inline ? htmlStr : (linkCtx.attr || defaultAttr(tag.parentElem, true));
					promise = updateContent(sourceValue, linkCtx, attr, tag);
				}

				callAfterLink(tag, tag.tagCtx);
				return promise || tag;
			},

			update: function(value) {
				var linkedElem = this.linkedElem;
				if (linkedElem) {
					elemChangeHandler({
						target: linkedElem[0]
					}, undefined, value);
				}
			}
		};

		function callAfterLink(tag, tagCtx) {
			var $linkedElem, linkedElem, radioButtons, val, bindings, i, l, linkedTag, oldTrig, newTrig,
				view = tagCtx.view,
				linkCtx = tag.linkCtx = tag.linkCtx || {
					tag: tag,
					data: view.data,
					view: view,
					ctx: view.ctx
				};

			if (tag.onAfterLink) {
				tag.onAfterLink(tagCtx, linkCtx);
			}
			$linkedElem = tag.targetTag ? tag.targetTag.linkedElem : tag.linkedElem;
			if (linkedElem = $linkedElem && $linkedElem[0]) {
				if (radioButtons = tag._.radio) {
					$linkedElem = $linkedElem.children("input[type=radio]");
				}
				if (radioButtons || !tag._.chging) {
					val = $sub.cvt(tag, tag.convert)[0];

					if (radioButtons || linkedElem !== linkCtx.elem) {
						l = $linkedElem.length;
						while (l--) {
							linkedElem = $linkedElem[l];
							linkedTag = linkedElem._jsvLkEl;
							if (tag._.inline && (!linkedTag || linkedTag !== tag && linkedTag.targetTag !== tag)) {
								linkedElem._jsvLkEl = tag;
								// For data-linked tags, identify the linkedElem with the tag, for "to" binding
								// (For data-linked elements, if not yet bound, we identify later when the linkCtx.elem is bound)
								bindings = linkCtx.elem ? linkCtx.elem._jsvBnd : tag._prv._jsvBnd;
								linkedElem._jsvBnd = bindings + "+";
								// Add a "+" for cloned binding - so removing elems with cloned bindings will not remove the 'parent' binding from the bindingStore.

								bindings = bindings.slice(1).split("&");
								i = bindings.length;
								while (i--) {
									bindTo(bindingStore[bindings[i]], tag.convertBack);
								}
							}
							if (radioButtons) {
								// For radio button, set to if val === value. For others set val() to val, below
								linkedElem[CHECKED] = val === linkedElem.value;
							}
						}
						linkCtx._val = val;
					}
					if (val !== undefined) {
						if (!radioButtons && linkedElem.value !== undefined) {
							if (linkedElem.type === CHECKBOX) {
								linkedElem[CHECKED] = val && val !== "false";
							} else {
								$linkedElem.val(val);
							}
						} else if (linkedElem.contentEditable === sTRUE) {
							linkedElem.innerHTML = val;
						}
					}
				}
			}
			if (linkedElem = linkedElem || tag.tagName === ":" && linkCtx.elem) {
				oldTrig = linkedElem._jsvTr;
				newTrig = tagCtx.props.trigger;
				if (oldTrig !== newTrig) {
					linkedElem._jsvTr = newTrig;
					$linkedElem = $linkedElem || $(linkedElem);
					bindElChange($linkedElem, oldTrig, "off");
					bindElChange($linkedElem, newTrig, "on");
				}
			}
		}

		function asyncElemChangeHandler(ev) {
			setTimeout(function() {
				elemChangeHandler(ev);
			}, 0);
		}

		function bindElChange($elem, trig, onoff) {
			trig && $elem[onoff](trig === true ? "keydown" : trig, trig === true ? asyncElemChangeHandler : elemChangeHandler);
		}

		function bindTo(binding, cvtBk) {
			// Two-way binding.
			// We set the binding.to[1] to be the cvtBack, and binding.to[0] to be either the path to the target, or [object, path] where the target is the path on the provided object.
			// So for a path with an object call: a.b.getObject().d.e, then we set to[0] to be [returnedObject, "d.e"], and we bind to the path on the returned object as target
			// Otherwise our target is the first path, paths[0], which we will convert with contextCb() for paths like ~a.b.c or #x.y.z

			var bindto, pathIndex, firstPath, lastPath, bindtoOb,
				linkCtx = binding.linkCtx,
				source = linkCtx.data,
				paths = linkCtx.fn.paths;
			if (binding && paths) {
				paths = (bindto = paths._jsvto) || paths[0];
				pathIndex = paths && paths.length;
				while (pathIndex && "" + (lastPath = paths[--pathIndex]) !== lastPath) {} // If the lastPath is an object (e.g. with _jsvOb property), take preceding one
				if (lastPath && (!linkCtx.tag || linkCtx.tag.tagCtx.args.length)) {
					lastPath = lastPath.split("^").join("."); // We don't need the "^" since binding has happened. For to binding, require just "."s
					binding.to = lastPath.charAt(0) === "."
						? [[bindtoOb = paths[pathIndex - 1], lastPath.slice(1)], cvtBk] // someexpr().lastpath - so need to get the bindtoOb object returned from the expression
						: [linkCtx._ctxCb(firstPath = pathIndex ? paths[0].split("^").join(".") : lastPath) || [source, firstPath], cvtBk];

					if (bindto && bindtoOb) {
						// This is a linkTo binding {:expr linkTo=someob().some.path:}
						// If it returned an object, we need to call the callback to get the object instance, so we bind to the final path (.some.path) starting from that object
						binding.to[0][0] = linkCtx._ctxCb(bindtoOb, source);
					}
				} else {
					binding.to = [[], cvtBk];
				}
			}
		}

		function mergeCtxs(tag, newCtxs, replace) { // Merge updated tagCtxs into tag.tagCtxs
			var tagCtx, newTagCtx,
				view = tag.tagCtx.view,
				tagCtxs = tag.tagCtxs || [tag.tagCtx],
				l = tagCtxs.length,
				refresh = !newCtxs;

			newCtxs = newCtxs || tag._.bnd.call(view.tmpl, (tag.linkCtx || view).data, view, $views);

			if (replace) {
				// Replace previous tagCtxs by new ones, rather than merging
				tagCtxs = tag.tagCtxs = newCtxs;
				tag.tagCtx = tagCtxs[0];
			} else {
				while (l--) {
					tagCtx = tagCtxs[l];
					newTagCtx = newCtxs[l];
					$observable(tagCtx.props).setProperty(newTagCtx.props);
					$extend(tagCtx.ctx, newTagCtx.ctx); // We don't support propagating ctx variables, ~foo, observably, to nested views. So extend, not setProperty...
					tagCtx.args = newTagCtx.args;
					if (refresh) {
						tagCtx.tmpl = newTagCtx.tmpl;
					}
				}
			}
			$sub._ths(tag, tagCtxs[0]); // tagHandlersFromProps
			return tagCtxs;
		}

		//=========
		// Disposal
		//=========

		function clean(elems) {
			// Remove data-link bindings, or contained views
			var l, elem, bindings,
				elemArray = [],
				len = elems.length,
				i = len;
			while (i--) {
				// Copy into an array, so that deletion of nodes from DOM will not cause our 'i' counter to get shifted
				// (Note: This seems as fast or faster than elemArray = [].slice.call(elems); ...)
				elemArray.push(elems[i]);
			}
			i = len;
			while (i--) {
				elem = elemArray[i];
				if (elem.parentNode) {
					// Has not already been removed from the DOM
					if (bindings = elem._jsvBnd) {
						// Get propertyChange bindings for this element
						// This may be an element with data-link, or the opening script marker node for a data-linked tag {^{...}}
						// bindings is a string with the syntax: "(&bindingId)*"
						bindings = bindings.slice(1).split("&");
						elem._jsvBnd = "";
						l = bindings.length;
						while (l--) {
							// Remove associated bindings
							removeViewBinding(bindings[l], elem._jsvLkEl, elem); // unbind bindings with this bindingId on this view
						}
					}
					disposeTokens(markerNodeInfo(elem) + (elem._df || ""));
				}
			}
		}

		function removeViewBinding(bindId, linkedElemTag, elem) {
			// Unbind
			var objId, linkCtx, tag, object, obsId, tagCtxs, l, map, $linkedElem, linkedElem, trigger,
				binding = bindingStore[bindId];

			if (linkedElemTag) {
				if (elem === linkedElemTag.linkedElem[0]) {
					delete elem._jsvLkEl;
					delete linkedElemTag.linkedElem;
				}
			} else if (binding) {
				delete bindingStore[bindId]; // Delete already, so call to onDispose handler below cannot trigger recursive deletion (through recursive call to jQuery cleanData)
				for (objId in binding.bnd) {
					object = binding.bnd[objId];
					obsId = ".obs" + binding.cbId;
					if ($.isArray(object)) {
						$([object]).off(arrayChangeStr + obsId).off(propertyChangeStr + obsId); // There may be either or both of arrayChange and propertyChange
					} else {
						$(object).off(propertyChangeStr + obsId);
					}
					delete binding.bnd[objId];
				}

				if (linkCtx = binding.linkCtx) {
					if (tag = linkCtx.tag) {
						if (tagCtxs = tag.tagCtxs) {
							l = tagCtxs.length;
							while (l--) {
								if (map = tagCtxs[l].map) {
									map.unmap(); //unobserve
								}
							}
						}
						$linkedElem = tag.linkedElem;
						linkedElem = $linkedElem && $linkedElem[0] || linkCtx.elem;

						if (trigger = linkedElem && linkedElem._jsvTr) {
							bindElChange($linkedElem || $(linkedElem), trigger, "off");
							linkedElem._jsvTr = undefined;
						}

						if (tag.onDispose) {
							tag.onDispose();
						}

						if (!tag._elCnt) {
							tag._prv && tag._prv.parentNode.removeChild(tag._prv);
							tag._nxt && tag._nxt.parentNode.removeChild(tag._nxt);
						}
					}
					delete linkCtx.view._.bnds[bindId];
				}
				delete $sub._cbBnds[binding.cbId];
			}
		}

		function $unlink(tmplOrLinkTag, to) {
			if (tmplOrLinkTag === undefined) {
				// Call to $.unlink() is equivalent to $.unlink(true, "body")
				if (activeBody) {
					$(activeBody)
						.off(elementChangeStr, elemChangeHandler)
						.off('blur', '[contenteditable]', elemChangeHandler);
					activeBody = undefined;
				}
				tmplOrLinkTag = true;
				topView.removeViews();
				clean(document.body.getElementsByTagName("*"));
			} else if (to && tmplOrLinkTag === true) {
				to = to.jquery ? to : $(to); // to is a jquery object or an element or selector
				to.each(function() {
					var innerView;
					while ((innerView = $view(this, true)) && innerView.parent) {
						innerView.parent.removeViews(innerView._.key, undefined, true);
					}
					clean(this.getElementsByTagName("*"));
					clean([this]);
				});
			}
			return to; // Allow chaining, to attach event handlers, etc.

//} else if (to) {
//	to = to.jquery ? to : $(to); // to is a jquery object or an element or selector
//	if (tmplOrLinkTag === true) {
//		// Call to $(el).unlink(true) - unlink content of element, but don't remove bindings on element itself
//		to.each(function() {
//			var innerView;
////TODO fix this for better perf. Rather that calling inner view multiple times which does querySelectorAll each time, consider a single querySelectorAll
//// or simply call view.removeViews() on the top-level views under the target 'to' node, then clean(...)
//			while ((innerView = $view(this, true)) && innerView.parent) {
//				innerView.parent.removeViews(innerView._.key, undefined, true);
//			}
//			clean(this.getElementsByTagName("*"));
//			clean([this]);
//		});
//	} else if (tmplOrLinkTag === undefined) {
//		// Call to $(el).unlink() // Not currently supported
//		clean(to);
////TODO provide this unlink API
//	} else if ("" + tmplOrLinkTag === tmplOrLinkTag) {
//		// Call to $(el).unlink(tmplOrLinkTag ...)
//		$.each(to, function() {
//			//...
//		});
//	}
//TODO - unlink the content and the arrayChange, but not any other bindings on the element (if container rather than "replace")
		}

		function tmplUnlink(to, from) {
			return $unlink(this, to, from);
		}

		//========
		// Helpers
		//========

		function getContextCb(view) {
			// TODO Consider exposing or allowing override, as public API
			return function(path, object) {
				// TODO consider only calling the contextCb on the initial token in path '~a.b.c' and not calling again on
				// the individual tokens, 'a', 'b', 'c'... Currently it is called multiple times
				var tokens, tag,
					items = [object];
				if (view && path) {
					if (path._jsvOb) {
						return path._jsvOb.call(view.tmpl, object, view, $views);
					}
					if (path.charAt(0) === "~") {
						// We return new items to insert into the sequence, replacing the "~a.b.c" string:
						// [helperObject 'a', "a.b.c" currentDataItem] so currentDataItem becomes the object for subsequent paths.
						if (path.slice(0, 4) === "~tag") {
							tag = view.ctx;
							if (path.charAt(4) === ".") {
								// "~tag.xxx"
								tokens = path.slice(5).split(".");
								tag = tag.tag;
							}
							if (tokens) {
								return tag ? [tag, tokens.join("."), object] : [];
							}
						}
						path = path.slice(1).split(".");
						if (object = view.hlp(path.shift())) {
							if (path.length) {
								items.unshift(path.join("."));
							}
							items.unshift(object);
						}
						return object ? items : [];
					}
					if (path.charAt(0) === "#") {
						// We return new items to insert into the sequence, replacing the "#a.b.c" string: [view, "a.b.c" currentDataItem]
						// so currentDataItem becomes the object for subsequent paths. The 'true' flag makes the paths bind only to leaf changes.
						return path === "#data" ? [] : [view, path.replace(rViewPath, ""), object];
					}
				}
			};
		}

		function inputAttrib(elem) {
			return elem.type === CHECKBOX ? elem[CHECKED] : elem.value;
		}

		//========================== Initialize ==========================

		//=====================
		// JsRender integration
		//=====================

		$sub.onStore.template = function(name, item) {
			item.link = tmplLink;
			item.unlink = tmplUnlink;
			if (name) {
				$.link[name] = function() {
					return tmplLink.apply(item, arguments);
				};
				$.unlink[name] = function() {
					return tmplUnlink.apply(item, arguments);
				};
			}
		};

		$sub.onStore.tag = function(name, item) {
			$sub._lnk(item);
		};

		$sub._lnk = function(item) {
			return $extend(item, linkMethods);
		};

		$sub.viewInfos = viewInfos; // Expose viewInfos() as public helper method

		// Initialize default delimiters
		($viewsSettings.delimiters = function() {
			var delimChars = oldJsvDelimiters.apply($views, arguments);
			delimOpenChar0 = delimChars[0];
			delimOpenChar1 = delimChars[1];
			delimCloseChar0 = delimChars[2];
			delimCloseChar1 = delimChars[3];
			linkChar = delimChars[4];
			rTag = new RegExp("(?:^|\\s*)([\\w-]*)(\\" + linkChar + ")?(\\" + delimOpenChar1 + $sub.rTag + "\\" + delimCloseChar0 + ")", "g");

			// Default rTag:      attr  bind tagExpr   tag         converter colon html     comment            code      params
			//          (?:^|\s*)([\w-]*)(\^)?({(?:(?:(\w+(?=[\/\s}]))|(?:(\w+)?(:)|(>)|!--((?:[^-]|-(?!-))*)--|(\*)))\s*((?:[^}]|}(?!}))*?))})
			return this;
		})();

		//====================================
		// Additional members for linked views
		//====================================

		function transferViewTokens(prevNode, nextNode, parentElem, id, viewOrTagChar, refresh) {
			// Transfer tokens on prevNode of viewToRemove/viewToRefresh to nextNode or parentElem._df
			var i, l, vwInfos, vwInfo, viewOrTag, viewId, tokens,
				precedingLength = 0,
				emptyView = prevNode === nextNode;

			if (prevNode) {
				// prevNode is either the first node in the viewOrTag, or has been replaced by the vwInfos tokens string
				vwInfos = viewInfos(prevNode) || [];
				for (i = 0, l = vwInfos.length; i < l; i++) {
					// Step through views or tags on the prevNode
					vwInfo = vwInfos[i];
					viewId = vwInfo.id;
					if (viewId === id && vwInfo.ch === viewOrTagChar) {
						if (refresh) {
							// This is viewOrTagToRefresh, this is the last viewOrTag to process...
							l = 0;
						} else {
							// This is viewOrTagToRemove, so we are done...
							break;
						}
					}
					if (!emptyView) {
						viewOrTag = vwInfo.ch === "_"
							? viewStore[viewId]
							: bindingStore[viewId].linkCtx.tag;
						if (vwInfo.open) {
							// A "#m" token
							viewOrTag._prv = nextNode;
						} else if (vwInfo.close) {
							// A "/m" token
							viewOrTag._nxt = nextNode;
						}
					}
					precedingLength += viewId.length + 2;
				}

				if (precedingLength) {
					prevNode.setAttribute(jsvAttrStr, prevNode.getAttribute(jsvAttrStr).slice(precedingLength));
				}
				tokens = nextNode ? nextNode.getAttribute(jsvAttrStr) : parentElem._df;
				if (l = tokens.indexOf("/" + id + viewOrTagChar) + 1) {
					tokens = vwInfos._tkns.slice(0, precedingLength) + tokens.slice(l + (refresh ? -1 : id.length + 1));
				}
				if (tokens) {
					if (nextNode) {
						// If viewOrTagToRemove was an empty viewOrTag, we will remove both #n and /n
						// (and any intervening tokens) from the nextNode (=== prevNode)
						// If viewOrTagToRemove was not empty, we will take tokens preceding #n from prevNode,
						// and concatenate with tokens following /n on nextNode
						nextNode.setAttribute(jsvAttrStr, tokens);
					} else {
						setDefer(parentElem, tokens);
					}
				}
			} else {
				// !prevNode, so there may be a deferred nodes token on the parentElem. Remove it.
				setDefer(parentElem, removeSubStr(parentElem._df, "#" + id + viewOrTagChar));
				if (!refresh && !nextNode) {
					// If this viewOrTag is being removed, and there was no .nxt, remove closing token from deferred tokens
					setDefer(parentElem, removeSubStr(parentElem._df, "/" + id + viewOrTagChar));
				}
			}
		}

		function disposeTokens(tokens) {
			var i, l, vwItem, vwInfos;
			if (vwInfos = viewInfos(tokens, true, rOpenMarkers)) {
				for (i = 0, l = vwInfos.length; i < l; i++) {
					vwItem = vwInfos[i];
					if (vwItem.ch === "_") {
						if ((vwItem = viewStore[vwItem.id]) && vwItem.type) {
							// If this is the _prv (prevNode) for a view, remove the view
							// - unless view.type is undefined, in which case it is already being removed
							vwItem.parent.removeViews(vwItem._.key, undefined, true);
						}
					} else {
						removeViewBinding(vwItem.id); // unbind bindings with this bindingId on this view
					}
				}
			}
		}

		//====================================
		// Add linked view methods to view prototype
		//====================================

		$extend(
			$sub._lnk($sub.View.prototype),
			{
				// Note: a linked view will also, after linking have nodes[], _prv (prevNode), _nxt (nextNode) ...
				addViews: function(index, dataItems, tmpl) {
					// if view is not an array view, do nothing
					var i, viewsCount,
						self = this,
						itemsCount = dataItems.length,
						views = self.views;

					if (!self._.useKey && itemsCount && (tmpl = self.tmpl)) {
						// view is of type "array"
						// Use passed-in template if provided, since self added view may use a different template than the original one used to render the array.
						viewsCount = views.length + itemsCount;

						if (renderAndLink(self, index, tmpl, views, dataItems, self.ctx) !== false) {
							for (i = index + itemsCount; i < viewsCount; i++) {
								$observable(views[i]).setProperty("index", i);
								// This is fixing up index, but not key, and not index on child views. From child views, use view.getIndex()
							}
						}
					}
					return self;
				},

				removeViews: function(index, itemsCount, keepNodes) {
					// view.removeViews() removes all the child views
					// view.removeViews(index) removes the child view with specified index or key
					// view.removeViews(index, count) removes the specified nummber of child views, starting with the specified index
					function removeView(index) {
						var id, bindId, parentElem, prevNode, nextNode, nodesToRemove,
							viewToRemove = views[index];

						if (viewToRemove && viewToRemove.link) {
							id = viewToRemove._.id;
							if (!keepNodes) {
								// Remove the HTML nodes from the DOM, unless they have already been removed, including nodes of child views
								nodesToRemove = viewToRemove.nodes();
							}

							// Remove child views, without removing nodes
							viewToRemove.removeViews(undefined, undefined, true);

							viewToRemove.type = undefined; // Set type to undefined: used as a flag that this view is being removed
							prevNode = viewToRemove._prv;
							nextNode = viewToRemove._nxt;
							parentElem = viewToRemove.parentElem;
							// If prevNode and nextNode are the same, the view is empty
							if (!keepNodes) {
								// Remove the HTML nodes from the DOM, unless they have already been removed, including nodes of child views
								if (viewToRemove._elCnt) {
									// if keepNodes is false (and transferring of tokens has not already been done at a higher level)
									// then transfer tokens from prevNode which is being removed, to nextNode.
									transferViewTokens(prevNode, nextNode, parentElem, id, "_");
								}
								$(nodesToRemove).remove();
							}
							if (!viewToRemove._elCnt) {
								try {
									prevNode.parentNode.removeChild(prevNode); // (prevNode.parentNode is parentElem, except if jQuery Mobile or similar has inserted an intermediate wrapper
									nextNode.parentNode.removeChild(nextNode);
								} catch (e) {}
							}
							setArrayChangeLink(viewToRemove);
							for (bindId in viewToRemove._.bnds) {
								removeViewBinding(bindId);
							}
							delete viewStore[id];
						}
					}

					var current, view, viewsCount,
						self = this,
						isArray = !self._.useKey,
						views = self.views;

					if (isArray) {
						viewsCount = views.length;
					}
					if (index === undefined) {
						// Remove all child views
						if (isArray) {
							// views and data are arrays
							current = viewsCount;
							while (current--) {
								removeView(current);
							}
							self.views = [];
						} else {
							// views and data are objects
							for (view in views) {
								// Remove by key
								removeView(view);
							}
							self.views = {};
						}
					} else {
						if (itemsCount === undefined) {
							if (isArray) {
								// The parentView is data array view.
								// Set itemsCount to 1, to remove this item
								itemsCount = 1;
							} else {
								// Remove child view with key 'index'
								removeView(index);
								delete views[index];
							}
						}
						if (isArray && itemsCount) {
							current = index + itemsCount;
							// Remove indexed items (parentView is data array view);
							while (current-- > index) {
								removeView(current);
							}
							views.splice(index, itemsCount);
							if (viewsCount = views.length) {
								// Fixup index on following view items...
								while (index < viewsCount) {
									$observable(views[index]).setProperty("index", index++);
								}
							}
						}
					}
					return this;
				},

				refresh: function(context) {
					var self = this,
						parent = self.parent;

					if (parent) {
						renderAndLink(self, self.index, self.tmpl, parent.views, self.data, context, true);
						setArrayChangeLink(self);
					}
					return self;
				},

				link: viewLink
			}
		);

		viewStore = { 0: topView = new $sub.View() }; // Top-level view

		//========================
		// JsViews-specific converters
		//========================

		$converters.merge = function(val) {
			// Special converter used in data-linking to space-separated lists, such as className:
			// Currently only supports toggle semantics - and has no effect if toggle string is not specified
			// data-link="class{merge:boolExpr toggle=className}"
			var regularExpression,
				currentValue = this.linkCtx._val || "",
				toggle = this.tagCtx.props.toggle;

			if (toggle) {
				// We are toggling the class specified by the toggle property,
				// and the boolean val binding is driving the insert/remove toggle

				regularExpression = toggle.replace(/[\\^$.|?*+()[{]/g, "\\$&");
				// Escape any regular expression special characters (metacharacters) within the toggle string
				regularExpression = "(\\s(?=" + regularExpression + "$)|(\\s)|^)(" + regularExpression + "(\\s|$))";
				// Example: /(\s(?=myclass$)|(\s)|^)?(myclass(\s|$))/ - so matches (" myclass" or " " or ^ ) followed by ("myclass " or "myclass$") where ^/$ are beginning/end of string
				currentValue = currentValue.replace(new RegExp(regularExpression), "$2");
				val = currentValue + (val ? (currentValue && " ") + toggle : "");
			}
			return val;
		};

		//========================
		// JsViews-specific tags
		//========================

		$tags("on", {
			attr: NONE,
			onAfterLink: function(tagCtx, linkCtx) {
				var handler, params,
					self = this,
					i = 0,
					args = tagCtx.args, // [events,] [selector,] handler
					l = args.length,
					data = tagCtx.props.data,
					view = tagCtx.view,
					contextOb = tagCtx.props.context; // Context ('this' pointer) for attached handler

				while (i<l && !(params = $isFunction(handler = args[i++]))) {} // Handler is first arg of type function

				if (params) { // There is a handler
					params = args.slice(i); // Subsequent args are params
					args = args.slice(0, i - 1); // Preceding args (if any) are events and selector

					if (!contextOb) {
						// Get the path for the preceding object (context object) of handler (which is the last arg), compile function
						// to return that context object, and run compiled function against data
						contextOb = /^(.*)[\.^][\w$]+$/.exec(tagCtx.params.args.slice(-params.length - 1)[0]);
						contextOb = contextOb && $sub.tmplFn("{:" + contextOb[1] + "}", view.tmpl, true)(linkCtx.data, view);
					}

					if (self._evs) {
						self.onDispose();
					}
					$(linkCtx.elem).on(
						self._evs = args[0] || "click", // events defaults to "click"
						self._sel = args[1],
						data == undefined ? null : data,
						self._hlr = function(ev) {
							return handler.apply(contextOb || linkCtx.data, [].concat(params, ev, {change: ev.type, view: view, linkCtx: linkCtx}));
						}
					);
				}
			},
			onDispose: function() {
				$(this.parentElem).off(this._evs, this._sel, this._hlr);
			},
			flow: true
		});

		$extend($tags["for"], {
			//onUpdate: function(ev, eventArgs, tagCtxs) {
			//Consider adding filtering for perf optimization. However the below prevents update on some scenarios which _should_ update - namely when there is another array on which for also depends.
			//var i, l, tci, prevArg;
			//for (tci = 0; (prevArg = this.tagCtxs[tci]) && prevArg.args.length; tci++) {
			//	if (prevArg.args[0] !== tagCtxs[tci].args[0]) {
			//		return true;
			//	}
			//}
			//return false;
			//},
			onArrayChange: function(ev, eventArgs) {
				var arrayView,
					self = this,
					change = eventArgs.change;
				if (self.tagCtxs[1] && ( // There is an {{else}}
					change === "insert" && ev.target.length === eventArgs.items.length // inserting, and new length is same as inserted length, so going from 0 to n
					|| change === "remove" && !ev.target.length // removing , and new length 0, so going from n to 0
					|| change === "refresh" && !eventArgs.oldItems.length !== !ev.target.length // refreshing, and length is going from 0 to n or from n to 0
					)) {
					self.refresh();
				} else {
					for (arrayView in self._.arrVws) {
						arrayView = self._.arrVws[arrayView];
						if (arrayView.data === ev.target) {
							arrayView._.onArrayChange.apply(arrayView, arguments);
						}
					}
				}
				ev.done = true;
			},
			onAfterLink: function() {
				var i, tagCtx, arrHandler, arrBinding, data,
					self = this,
					arrayBindings = self._ars || {},
					tagCtxs = self.tagCtxs,
					l = tagCtxs.length,
					selected = self.selected || 0;

				for (i = 0; i <= selected; i++) {
					tagCtx = tagCtxs[i];        // loop through tagCtxs up to selected
					data = tagCtx.map
						? tagCtx.map.tgt        // 'data' is mapped data
						: tagCtx.args.length
						? tagCtx.args[0]    // or args[0]
						: tagCtx.view.data; // or defaults to current data.

					if ((arrBinding = arrayBindings[i]) && data !== arrBinding[0]) { // Is there previous array data on this tagCtx, different from new data
						$observe(arrBinding[0], arrBinding[1], true); //unobserve previous array
						delete arrayBindings[i];
					}
					if (!arrayBindings[i] && $.isArray(data)) {
						$observe(data, arrHandler = function(ev, eventArgs) { // Store array data as self._ar, and arrayChangeHandler as self._arCh
							self.onArrayChange(ev, eventArgs);
						});
						arrayBindings[i] = [data, arrHandler];
					}
				}
				for (i = selected + 1; i < l; i++) { // If there were previous bindings on later tagCtxs, remove them
					if (arrBinding = arrayBindings[i]) {
						$observe(arrBinding[0], arrBinding[1], true); //unobserve previous binding
						delete arrayBindings[i];
					}
				}
				self._ars = arrayBindings;
			},
			onDispose: function() {
				var l, self = this;
				for (l in self._ars) {
					$observe(self._ars[l][0], self._ars[l][1], true); //unobserve
				}
			}
		});

		$extend($tags["for"], linkMethods);
		$extend($tags["if"], linkMethods);
		$extend($tags.include, linkMethods);

		function observeProps(map, ev, eventArgs) {
			if (eventArgs.change === "set") {
				var target = map.tgt,
					l = target.length;
				while (l--) {
					if (target[l].key === eventArgs.path) {
						break;
					}
				}
				if (l === -1) {
					if (eventArgs.path) {
						$observable(target).insert({ key: eventArgs.path, prop: eventArgs.value });
					}
				} else if (eventArgs.remove) {
					$observable(target).remove(l);
				} else {
					$observable(target[l]).setProperty("prop", eventArgs.value);
				}
			}
		}

		function observeMappedProps(map, ev, eventArgs) {
			var item,
				source = map.src,
				change = eventArgs.change;

			if (change === "set") {
				if (eventArgs.path === "prop") {
					$observable(source).setProperty(ev.target.key, eventArgs.value);
				} else { // path === "key"
					$observable(source).setProperty(eventArgs.oldValue, null);
					delete source[eventArgs.oldValue];
					$observable(source).setProperty(eventArgs.value, ev.target.prop);
				}
			} else if (change === "remove") {
				item = eventArgs.items[0];
				$observable(source).removeProperty(item.key);
				delete source[item.key];
			} else if (change === "insert") {
				item = eventArgs.items[0];
				if (item.key) {
					$observable(source).setProperty(item.key, item.prop);
				}
			}
		}

		function shallowArrayFilter(allPath /*, object, parentObs*/) { // Filter used by {{props}} for the mappedProps target array
			return allPath.indexOf(".") < 0;
		}

		$tags("props", {
			baseTag: $tags["for"],
			dataMap: $views.map({
				getTgt: $tags.props.dataMap.getTgt,
				obsSrc: observeProps,
				obsTgt: observeMappedProps,
				tgtFlt: shallowArrayFilter
			})
		});

		//========================
		// Extend jQuery namespace
		//========================

		$extend($, {

			//=======================
			// jQuery $.view() plugin
			//=======================

			view: $views.view = $view = function(node, inner, type) {
				// $.view() returns top view
				// $.view(node) returns view that contains node
				// $.view(selector) returns view that contains first selected element
				// $.view(nodeOrSelector, type) returns nearest containing view of given type
				// $.view(nodeOrSelector, "root") returns root containing view (child of top view)
				// $.view(nodeOrSelector, true, type) returns nearest inner (contained) view of given type

				function getInnerView(nd, isVl) {
					if (nd) {
						vwInfos = viewInfos(nd, isVl, rOpenViewMarkers);
						for (j = 0, k = vwInfos.length; j < k; j++) {
							if ((view = viewStore[vwInfos[j].id]) && (view = view && type ? view.get(true, type) : view)) {
								break;
							}
						}
					}
				}

				if (inner !== !!inner) {
					// inner not boolean, so this is view(nodeOrSelector, type)
					type = inner;
					inner = undefined;
				}
				var view, vwInfos, i, j, k, l, elems,
					level = 0,
					body = document.body;

				if (node && node !== body && topView._.useKey > 1) {
					// Perf optimization for common cases

					node = "" + node === node
						? $(node)[0]
						: node.jquery
						? node[0]
						: node;

					if (node) {
						if (inner) {
							getInnerView(node._df, true);
							if (!view) {
								// Treat supplied node as a container element and return the first view encountered.
								elems = qsa ? node.querySelectorAll(bindElsSel) : $(bindElsSel, node).get();
								l = elems.length;
								for (i = 0; !view && i < l; i++) {
									getInnerView(elems[i]);
								}
							}
							return view;
						}
						while (node) {
							// Move back through siblings and up through parents to find preceding node which is a _prv (prevNode)
							// script marker node for a non-element-content view, or a _prv (first node) for an elCnt view
							if (vwInfos = viewInfos(node, undefined, rViewMarkers)) {
								l = vwInfos.length;
								while (l--) {
									view = vwInfos[l];
									if (view.open) {
										if (level < 1) {
											view = viewStore[view.id];
											return view && type ? view.get(type) : view || topView;
										}
										level--;
									} else {
										// level starts at zero. If we hit a view.close, then we move level to 1, and we don't return a view until
										// we are back at level zero (or a parent view with level < 0)
										level++;
									}
								}
							}
							node = node.previousSibling || node.parentNode;
						}
					}
				}
				return topView;
			},

			link: $views.link = $link,
			unlink: $views.unlink = $unlink,

			//=====================
			// override $.cleanData
			//=====================
			cleanData: function(elems) {
				if (elems.length && isCleanCall) {
					// Remove JsViews bindings. Also, remove from the DOM any corresponding script marker nodes
					clean(elems);
				}
				oldCleanData.apply($, arguments);
			}
		});

		$views.utility = {
			validate: function(html) {
				try {
					topView.link(undefined, document.createElement("div"), undefined, undefined, html, undefined, undefined, 1);
				}
				catch (e) {
					return e.message;
				}
			}
		};

		//===============================
		// Extend jQuery instance plugins
		//===============================

		$extend($.fn, {
			link: function(expr, from, context, noIteration, parentView, prevNode, nextNode) {
				return $link(expr, this, from, context, noIteration, parentView, prevNode, nextNode);
			},
			unlink: function(expr) {
				return $unlink(expr, this);
			},
			view: function(type) {
				return $view(this[0], type);
			}
		});

		//==============================================================================
		// Override jQuery methods that call our overridden cleanData, for disposal etc.
		//==============================================================================

		$.each([htmlStr, "replaceWith", "empty", "remove"], function(i, name) {
			var oldFn = $.fn[name];
			$.fn[name] = function() {
				var result;
				isCleanCall = 1; // Make sure cleanData does disposal only when coming from these calls.
				try {
					result = oldFn.apply(this, arguments);
				}
				finally {
					isCleanCall = 0;
				}
				return result;
			};
		});

		//===============
		// Extend topView
		//===============

		$extend(topView, {tmpl: {links: {}, tags: {}}});
		topView._.onRender = addBindingMarkers;
		//=========================
		// Extend $.views.settings
		//=========================

		$viewsSettings({
			wrapMap: wrapMap = {
				option: [1, "<select multiple='multiple'>", "</select>"],
				legend: [1, "<fieldset>", "</fieldset>"],
				area: [1, "<map>", "</map>"],
				param: [1, "<object>", "</object>"],
				thead: [1, "<table>", "</table>"],
				tr: [2, "<table><tbody>", "</tbody></table>"],
				td: [3, "<table><tbody><tr>", "</tr></tbody></table>"],
				col: [2, "<table><tbody></tbody><colgroup>", "</colgroup></table>"],
				svg_ns: [1, "<svg>", "</svg>"],

				// IE6-8 can't serialize link, script, style, or any html5 (NoScope) tags,
				// unless wrapped in a div with non-breaking characters in front of it.
				div: jQuery.support.htmlSerialize ? [0, "", ""] : [1, "X<div>", "</div>"]
			},
			linkAttr: $viewsLinkAttr = "data-link",
			merge: {
				input: {
					from: inputAttrib, to: "value"
				},
				textarea: valueBinding,
				select: valueBinding,
				optgroup: {
					to: "label"
				}
			},
			jsrDbgMode: $viewsSettings.debugMode, // debugMode for JsRender
			debugMode: function(debugMode) { // debugMode for JsViews
				$viewsSettings.jsrDbgMode(debugMode);
				if (debugMode) {
					global._jsv = { // In debug mode create global _jsv, for accessing views, etc
						views: viewStore,
						bindings: bindingStore
					};
				} else {
					delete global._jsv;
				}
			},
			jsv: function() {
				$viewsSettings.debugMode($viewsSettings._dbgMode);
				$viewsLinkAttr = $viewsSettings.linkAttr;
				error = $views._err;
				linkViewsSel = bindElsSel + ",[" + $viewsLinkAttr + "]";
				noDomLevel0 = $viewsSettings.noDomLevel0;
				wrapMap.optgroup = wrapMap.option;
				wrapMap.tbody = wrapMap.tfoot = wrapMap.colgroup = wrapMap.caption = wrapMap.thead;
				wrapMap.th = wrapMap.td;
			}
		});

//TODO
// Tests for different attr settings on tags
		// tests of onAfterBind extensibility
		// tests for maps...
		// tests for programmatic map scenarios
		// tests for sorted table, using map=sort or {{sort}} with props for setting sort parameters
		// tests for setting()
		// tests for settings.debugMode()
		// tests for {on data=...}
		// tests for {on } binding when doing top-level data-linking
// tests for debug mode, noDomLevel0, noValidate
// linkTo docs and tests.
// Additional tests and examples for structured params - tagCtx.params
// Using jsobservable without jsviews - settings??
// Examples for:
		// overriding error messages
		// Binding to tag properties and contextual properties
		// Fallback strings or onError handlers for any tag instance
		// $.observable(object).removeProperty(path)
		// data-link="{on ... myHandler}" (See unit tests. Examples to follow)
// VERIFY link=false support
// target="replace" scenarios
	})(this, this.jQuery);
});

if (window.jQuery) {
	this.jQuery = window.jQuery;
	init();
}
},{}]},{},[1]);
