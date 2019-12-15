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
(function (factory) {  // Try to register as an anonymous AMD module
	if (typeof define === 'function' && define.amd) {
		define(['jquery'], factory);
	} else {
		factory(jQuery);
	}
}(function ($) {
	'use strict';

	$.fn.mosaicflow = function(options) {
		var elem = $(this);
		options = $.extend({}, $.fn.mosaicflow.defaults, options, dataToOptions(elem));

		return this.each(function() {
			new Mosaicflow(elem, options);
		});
	};

	$.fn.mosaicflow.defaults = {
		itemSelector: '> *',
		columnClass: 'mosaicflow__column',
		minItemWidth: 240
	};

	function Mosaicflow(container, options) {
		this.container = container;
		this.options = options;

		this.init();
	}

	Mosaicflow.prototype = {
		init: function() {
			this.items = this.container.find(this.options.itemSelector);
			this.columns = [];
			this.refill();

			$(window).resize($.proxy(this.refill, this));
		},

		refill: function() {
			this.numberOfColumns = Math.floor(this.container.width() / this.options.minItemWidth);
			var needToRefill = this.ensureColumns();
			if (needToRefill) {
				this.fillColumns();

				// Remove excess columns
				this.columns.filter(':hidden').remove();
			}
		},

		ensureColumns: function() {
			var createdCnt = this.columns.length,
				calculatedCnt = this.numberOfColumns;
			if (calculatedCnt > createdCnt) {
				var neededCnt = calculatedCnt - createdCnt;
				for (var columnIdx = 0; columnIdx < neededCnt; columnIdx++) {
					var column = $('<div>', {
						'class': this.options.columnClass
					});
					this.container.append(column);
				}
			}
			else if (calculatedCnt < createdCnt) {
				var lastColumn = createdCnt;
				while (calculatedCnt <= lastColumn) {
					// We can't remove columns here becase it will remove items to. So we hide it and will remove later.
					this.columns.eq(lastColumn).hide();
					lastColumn--;
				}
			}
			if (calculatedCnt !== createdCnt) {
				this.columns = this.container.find('.' + this.options.columnClass);
				this.columns.width((100 / calculatedCnt) + '%');
				return true;
			}
			return false;
		},

		fillColumns: function() {
			var columnsCnt = this.numberOfColumns,
				itemsCnt = this.items.length,
				itemsHeights = {},
				columnsHeights = [];
			for (var columnIdx = 0; columnIdx < columnsCnt; columnIdx++) {
				var column = this.columns.eq(columnIdx);
				columnsHeights[columnIdx] = 0;
				for (var itemIdx = columnIdx; itemIdx < itemsCnt; itemIdx += columnsCnt) {
					var item = this.items.eq(itemIdx);
					column.append(item);

					var height = parseInt(item.find('img').attr('height'), 10);
					itemsHeights[item.attr('id')] = height;
					columnsHeights[columnIdx] += height;
				}
			}

			this.levelBottomEdge(itemsHeights, columnsHeights);

			this.container.trigger('mosaicflow-layout');
		},

		levelBottomEdge: function(itemsHeights, columnsHeights) {
			while (true) {
				var lowestColumn = $.inArray(Math.min.apply(null, columnsHeights), columnsHeights),
					highestColumn = $.inArray(Math.max.apply(null, columnsHeights), columnsHeights);
				if (lowestColumn === highestColumn) return;

				var lastInHighestColumn = this.columns.eq(highestColumn).children().last(),
					lastInHighestColumnHeight = itemsHeights[lastInHighestColumn.attr('id')],
					lowestHeight = columnsHeights[lowestColumn],
					highestHeight = columnsHeights[highestColumn],
					newLowestHeight = lowestHeight + lastInHighestColumnHeight;
				if (newLowestHeight >= highestHeight) return;

				this.columns.eq(lowestColumn).append(lastInHighestColumn);
				columnsHeights[highestColumn] -= lastInHighestColumnHeight;
				columnsHeights[lowestColumn] += lastInHighestColumnHeight;
			}
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

	// Auto init
	$(function() { $('.mosaicflow').mosaicflow(); });

}));
