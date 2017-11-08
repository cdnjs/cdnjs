/**
 * Mosaic Flow
 *
 * Pinterest like responsive image grid that doesn’t sucks
 *
 * @requires jQuery
 * @author Artem Sapegin
 * @copyright 2012 Artem Sapegin, http://sapegin.me
 * @license MIT
 */

/*jshint browser:true, jquery:true, white:false, smarttabs:true */
/*global jQuery:false, define:false*/
(function(factory) {  // Try to register as an anonymous AMD module
	if (typeof define === 'function' && define.amd) {
		define(['jquery'], factory);
	}
	else {
		factory(jQuery);
	}
}(function($) {
	'use strict';
	var cnt = 0;

	$.fn.mosaicflow = function(options) {
		var args = Array.prototype.slice.call(arguments,0);

		return this.each(function() {
			var elm = $(this);
			var data = elm.data('mosaicflow');

			if (!data) {
				options = $.extend({}, $.fn.mosaicflow.defaults, options, dataToOptions(elm));
				data = new Mosaicflow(elm,options);
				elm.data('mosaicflow', data);
			}
			else if (typeof options === 'string') {
				data[options](args[1]);
			}
		});
	};

	$.fn.mosaicflow.defaults = {
		itemSelector: '> *',
		columnClass: 'mosaicflow__column',
		minItemWidth: 240,
		itemHeightCalculation: 'auto'
	};

	function Mosaicflow(container, options) {
		this.container = container;
		this.options = options;

		this.container.trigger('start');
		this.init();
		this.container.trigger('ready');
	}

	Mosaicflow.prototype = {
		init: function() {
			this.__uid = cnt++;
			this.__uidItemCounter = 0;
			this.items = this.container.find(this.options.itemSelector);
			this.columns = $([]);
			this.columnsHeights = [];
			this.itemsHeights = {};
			this.tempContainer = $('<div>').css({'visibility': 'hidden', 'width': '100%'});
			this.workOnTemp = false;
			this.autoCalculation = this.options.itemHeightCalculation === 'auto';

			this.container.append(this.tempContainer);

			var that = this;
			this.items.each(function() {
				var elm = $(this);
				var id = elm.attr('id');
				if (!id) {
					// Generate an unique id
					id = that.generateUniqueId();
					elm.attr('id', id);
				}
			});

			this.container.css('visibility', 'hidden');
			if (this.autoCalculation) {
				$(window).load($.proxy(this.refill, this));
			}
			else {
				this.refill();
			}
			$(window).resize($.proxy(this.refill, this));
		},

		refill: function() {
			this.container.trigger('fill');
			this.numberOfColumns = Math.floor(this.container.width() / this.options.minItemWidth);
			// Always keep at least one column
			if (this.numberOfColumns < 1)
                               this.numberOfColumns = 1;

			var needToRefill = this.ensureColumns();
			if (needToRefill) {
				this.fillColumns();

				// Remove excess columns
				this.columns.filter(':hidden').remove();
			}
			this.container.css('visibility', 'visible');
			this.container.trigger('filled');
		},

		ensureColumns: function() {
			var createdCnt = this.columns.length;
			var calculatedCnt = this.numberOfColumns;

			this.workingContainer = createdCnt === 0 ? this.tempContainer : this.container;

			if (calculatedCnt > createdCnt) {
				var neededCnt = calculatedCnt - createdCnt;
				for (var columnIdx = 0; columnIdx < neededCnt; columnIdx++) {
					var column = $('<div>', {
						'class': this.options.columnClass
					});

					this.workingContainer.append(column);
				}
			}
			else if (calculatedCnt < createdCnt) {
				var lastColumn = createdCnt;
				while (calculatedCnt <= lastColumn) {
					// We can't remove columns here becase it will remove items to. So we hide it and will remove later.
					this.columns.eq(lastColumn).hide();
					lastColumn--;
				}

				var diff = createdCnt - calculatedCnt;
				this.columnsHeights.splice(this.columnsHeights.length - diff, diff);
			}

			if (calculatedCnt !== createdCnt) {
				this.columns = this.workingContainer.find('.' + this.options.columnClass);
				this.columns.css('width', (100 / calculatedCnt) + '%');
				return true;
			}

			return false;
		},

		fillColumns: function() {
			var columnsCnt = this.numberOfColumns;
			var itemsCnt = this.items.length;

			for (var columnIdx = 0; columnIdx < columnsCnt; columnIdx++) {
				var column = this.columns.eq(columnIdx);
				this.columnsHeights[columnIdx] = 0;
				for (var itemIdx = columnIdx; itemIdx < itemsCnt; itemIdx += columnsCnt) {
					var item = this.items.eq(itemIdx);
					var height = 0;
					column.append(item);

					if (this.autoCalculation) {
						// Check height after being placed in its column
						height = item.outerHeight();
					}
					else {
						// Read img height attribute
						height = parseInt(item.find('img').attr('height'), 10);
					}

					this.itemsHeights[item.attr('id')] = height;
					this.columnsHeights[columnIdx] += height;
				}
			}

			this.levelBottomEdge(this.itemsHeights, this.columnsHeights);

			if (this.workingContainer === this.tempContainer) {
				this.container.append(this.tempContainer.children());
			}
			this.container.trigger('mosaicflow-layout');
		},

		levelBottomEdge: function(itemsHeights, columnsHeights) {
			while (true) {
				var lowestColumn = $.inArray(Math.min.apply(null, columnsHeights), columnsHeights);
				var highestColumn = $.inArray(Math.max.apply(null, columnsHeights), columnsHeights);
				if (lowestColumn === highestColumn) return;

				var lastInHighestColumn = this.columns.eq(highestColumn).children().last();
				var lastInHighestColumnHeight = itemsHeights[lastInHighestColumn.attr('id')];
				var lowestHeight = columnsHeights[lowestColumn];
				var highestHeight = columnsHeights[highestColumn];
				var newLowestHeight = lowestHeight + lastInHighestColumnHeight;

				if (newLowestHeight >= highestHeight) return;

				this.columns.eq(lowestColumn).append(lastInHighestColumn);
				columnsHeights[highestColumn] -= lastInHighestColumnHeight;
				columnsHeights[lowestColumn] += lastInHighestColumnHeight;
			}
		},

		add: function(elm) {
			this.container.trigger('add');
			var lowestColumn = $.inArray(Math.min.apply(null, this.columnsHeights), this.columnsHeights);
			var height = 0;

			if (this.autoCalculation) {

				// Get height of elm
				elm.css({
					position: 'static',
					visibility: 'hidden',
					display: 'block'
				}).appendTo(this.columns.eq(lowestColumn));

				height = elm.outerHeight();

				var inlineImages = elm.find('img');
				if (inlineImages.length !== 0) {

					inlineImages.each(function() {
						var image = $(this);
						var imageSizes = getImageSizes(image);
						var actualHeight = (image.width()*imageSizes.height)/imageSizes.width;

						height += actualHeight;
					});

				}

				elm.detach().css({
					position: 'static',
					visibility: 'visible'
				});
			}
			else {
				height = parseInt(elm.find('img').attr('height'), 10);
			}

			if (!elm.attr('id')) {
				// Generate a unique id
				elm.attr('id', this.generateUniqueId());
			}

			// Update item collection.
			// Item needs to be placed at the end of this.items to keep order of elements
			var itemsArr = this.items.toArray();
			itemsArr.push(elm);
			this.items = $(itemsArr);

			this.itemsHeights[elm.attr('id')] = height;
			this.columnsHeights[lowestColumn] += height;
			this.columns.eq(lowestColumn).append(elm);

			this.levelBottomEdge(this.itemsHeights, this.columnsHeights);
			this.container.trigger('mosaicflow-layout');
			this.container.trigger('added');
		},

		remove: function(elm) {
			this.container.trigger('remove');
			var column = elm.parents('.' + this.options.columnClass);

			// Update column height
			this.columnsHeights[column.index() - 1]-= this.itemsHeights[elm.attr('id')];

			elm.detach();

			// Update item collection
			this.items = this.items.not(elm);
			this.levelBottomEdge(this.itemsHeights, this.columnsHeights);
			this.container.trigger('mosaicflow-layout');
			this.container.trigger('removed');
		},

		empty: function() {
			var columnsCnt = this.numberOfColumns;

			this.items = $([]);
			this.itemsHeights = {};

			for (var columnIdx = 0; columnIdx < columnsCnt; columnIdx++) {
				var column = this.columns.eq(columnIdx);
				this.columnsHeights[columnIdx] = 0;
				column.empty();
			}
			this.container.trigger('mosaicflow-layout');
		},

		recomputeHeights: function() {
			function computeHeight(idx, item) {
				item = $(item);
				var height = 0;
				if (that.autoCalculation) {
					// Check height after being placed in its column
					height = item.outerHeight();
				}
				else {
					// Read img height attribute
					height = parseInt(item.find('img').attr('height'), 10);
				}

				that.itemsHeights[item.attr('id')] = height;
				that.columnsHeights[columnIdx] += height;
			}

			var that = this;
			var columnsCnt = this.numberOfColumns;

			for (var columnIdx = 0; columnIdx < columnsCnt; columnIdx++) {
				var column = this.columns.eq(columnIdx);

				this.columnsHeights[columnIdx] = 0;
				column.children().each(computeHeight);
			}
		},

		generateUniqueId: function() {
			// Increment the counter
			this.__uidItemCounter++;

			// Return an unique ID
			return 'mosaic-' + this.__uid + '-itemid-' + this.__uidItemCounter;
		}
	};

	// Camelize data-attributes
	function dataToOptions(elem) {
		function upper(m, l) {
			return l.toUpper();
		}
		var options = {};
		var data = elem.data();
		for (var key in data) {
			options[key.replace(/-(\w)/g, upper)] = data[key];
		}
		return options;
	}

	function getImageSizes(image) {
		var sizes = {};

		sizes.height = parseInt(image.attr('height'), 10);
		sizes.width = parseInt(image.attr('width'), 10);

		if (sizes.height === 0 || sizes.width === 0) {
			var utilImage = new Image();
			utilImage.src = image.attr('src');

			sizes.width = utilImage.width;
			sizes.height = utilImage.height;
		}

		return sizes;
	}

	// Auto init
	$(function() { $('.mosaicflow').mosaicflow(); });

}));
