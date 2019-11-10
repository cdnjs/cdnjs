'use strict';

angular.module('gridster', [])

.constant('gridsterConfig', {
	columns: 6, // number of columns in the grid
	pushing: true, // whether to push other items out of the way
	floating: true, // whether to automatically float items up so they stack
	width: 'auto', // the width of the grid. "auto" will expand the grid to its parent container
	colWidth: 'auto', // the width of the columns. "auto" will divide the width of the grid evenly among the columns
	rowHeight: 'match', // the height of the rows. "match" will set the row height to be the same as the column width
	margins: [10, 10], // the margins in between grid items
	outerMargin: true,
	isMobile: false, // toggle mobile view
	mobileBreakPoint: 600, // the width threshold to toggle mobile mode
	mobileModeEnabled: true, // whether or not to toggle mobile mode when screen width is less than mobileBreakPoint
	minColumns: 1, // the minimum amount of columns the grid can scale down to
	minRows: 1, // the minimum amount of rows to show if the grid is empty
	maxRows: 100, // the maximum amount of rows in the grid
	defaultSizeX: 2, // the default width of a item
	defaultSizeY: 1, // the default height of a item
	resizable: { // options to pass to jquery ui resizable
		enabled: true,
		handles: 'n, e, s, w, ne, se, sw, nw'
	},
	draggable: { // options to pass to jquery ui draggable
		enabled: true
	}
})

.controller('GridsterCtrl', ['gridsterConfig',
	function(gridsterConfig) {

		/**
		 * Create options from gridsterConfig constant
		 */
		angular.extend(this, gridsterConfig);

		this.resizable = angular.extend({}, gridsterConfig.resizable || {});
		this.draggable = angular.extend({}, gridsterConfig.draggable || {});

		/**
		 * A positional array of the items in the grid
		 */
		this.grid = [];

		/**
		 * Clean up after yourself
		 */
		this.destroy = function() {
			this.grid.length = 0;
			this.grid = null;
		};

		/**
		 * Overrides default options
		 *
		 * @param {object} options The options to override
		 */
		this.setOptions = function(options) {
			if (!options) {
				return;
			}

			options = angular.extend({}, options);

			// all this to avoid using jQuery...
			if (options.draggable) {
				angular.extend(this.draggable, options.draggable);
				delete(options.draggable);
			}
			if (options.resizable) {
				angular.extend(this.resizable, options.resizable);
				delete(options.resizable);
			}

			angular.extend(this, options);

			if (!this.margins || this.margins.length !== 2) {
				this.margins = [0, 0];
			} else {
				for (var x = 0, l = this.margins.length; x < l; ++x) {
					this.margins[x] = parseInt(this.margins[x], 10);
					if (isNaN(this.margins[x])) {
						this.margins[x] = 0;
					}
				}
			}
		};

		/**
		 * Check if item can occupy a specified position in the grid
		 *
		 * @param {object} item The item in question
		 * @param {number} row The row index
		 * @param {number} column The column index
		 * @returns {boolean} True if if item fits
		 */
		this.canItemOccupy = function(item, row, column) {
			return row > -1 && column > -1 && item.sizeX + column <= this.columns;
		};

		/**
		 * Set the item in the first suitable position
		 *
		 * @param {object} item The item to insert
		 */
		this.autoSetItemPosition = function(item) {
			// walk through each row and column looking for a place it will fit
			for (var rowIndex = 0; rowIndex < this.maxRows; ++rowIndex) {
				for (var colIndex = 0; colIndex < this.columns; ++colIndex) {
					// only insert if position is not already taken and it can fit
					var items = this.getItems(rowIndex, colIndex, item.sizeX, item.sizeY, item);
					if (items.length === 0 && this.canItemOccupy(item, rowIndex, colIndex)) {
						this.putItem(item, rowIndex, colIndex);
						return;
					}
				}
			}
			throw new Error('Unable to place item!');
		};

		/**
		 * Gets items at a specific coordinate
		 *
		 * @param {number} row
		 * @param {number} column
		 * @param {number} sizeX
		 * @param {number} sizeY
		 * @param {array} excludeItems An array of items to exclude from selection
		 * @returns {array} Items that match the criteria
		 */
		this.getItems = function(row, column, sizeX, sizeY, excludeItems) {
			var items = [];
			if (!sizeX || !sizeY) {
				sizeX = sizeY = 1;
			}
			if (excludeItems && !(excludeItems instanceof Array)) {
				excludeItems = [excludeItems];
			}
			for (var h = 0; h < sizeY; ++h) {
				for (var w = 0; w < sizeX; ++w) {
					var item = this.getItem(row + h, column + w, excludeItems);
					if (item && (!excludeItems || excludeItems.indexOf(item) === -1) && items.indexOf(item) === -1) {
						items.push(item);
					}
				}
			}
			return items;
		};

		/**
		 * Removes an item from the grid
		 *
		 * @param {object} item
		 */
		this.removeItem = function(item) {
			for (var rowIndex = 0, l = this.grid.length; rowIndex < l; ++rowIndex) {
				var columns = this.grid[rowIndex];
				if (!columns) {
					continue;
				}
				var index = columns.indexOf(item);
				if (index !== -1) {
					columns[index] = null;
					break;
				}
			}
			this.floatItemsUp();
			this.updateHeight();
		};

		/**
		 * Returns the item at a specified coordinate
		 *
		 * @param {number} row
		 * @param {number} column
		 * @param {array} excludeitems Items to exclude from selection
		 * @returns {object} The matched item or null
		 */
		this.getItem = function(row, column, excludeItems) {
			if (excludeItems && !(excludeItems instanceof Array)) {
				excludeItems = [excludeItems];
			}
			var sizeY = 1;
			while (row > -1) {
				var sizeX = 1,
					col = column;
				while (col > -1) {
					var items = this.grid[row];
					if (items) {
						var item = items[col];
						if (item && (!excludeItems || excludeItems.indexOf(item) === -1) && item.sizeX >= sizeX && item.sizeY >= sizeY) {
							return item;
						}
					}
					++sizeX;
					--col;
				}
				--row;
				++sizeY;
			}
			return null;
		};

		/**
		 * Insert an array of items into the grid
		 *
		 * @param {array} items An array of items to insert
		 */
		this.putItems = function(items) {
			for (var i = 0, l = items.length; i < l; ++i) {
				this.putItem(items[i]);
			}
		};

		/**
		 * Insert a single item into the grid
		 *
		 * @param {object} item The item to insert
		 * @param {number} row (Optional) Specifies the items row index
		 * @param {number} column (Optional) Specifies the items column index
		 * @param {array} ignoreItems
		 */
		this.putItem = function(item, row, column, ignoreItems) {
			if (typeof row === 'undefined' || row === null) {
				row = item.row;
				column = item.col;
				if (typeof row === 'undefined' || row === null) {
					this.autoSetItemPosition(item);
					return;
				}
			}
			if (!this.canItemOccupy(item, row, column)) {
				column = Math.min(this.columns - item.sizeX, Math.max(0, column));
				row = Math.max(0, row);
			}

			if (item && item.oldRow !== null && typeof item.oldRow !== 'undefined') {
				if (item.oldRow === row && item.oldColumn === column) {
					item.row = row;
					item.col = column;
					return;
				} else {
					// remove from old position
					var oldRow = this.grid[item.oldRow];
					if (oldRow && oldRow[item.oldColumn] === item) {
						delete oldRow[item.oldColumn];
					}
				}
			}

			item.oldRow = item.row = row;
			item.oldColumn = item.col = column;

			this.moveOverlappingItems(item, ignoreItems);

			if (!this.grid[row]) {
				this.grid[row] = [];
			}
			this.grid[row][column] = item;
		};

		/**
		 * Prevents items from being overlapped
		 *
		 * @param {object} item The item that should remain
		 * @param {array} ignoreItems
		 */
		this.moveOverlappingItems = function(item, ignoreItems) {
			if (ignoreItems) {
				if (ignoreItems.indexOf(item) === -1) {
					ignoreItems = ignoreItems.slice(0);
					ignoreItems.push(item);
				}
			} else {
				ignoreItems = [item];
			}
			var overlappingItems = this.getItems(
				item.row,
				item.col,
				item.sizeX,
				item.sizeY,
				ignoreItems
			);
			this.moveItemsDown(overlappingItems, item.row + item.sizeY, ignoreItems);
		};

		/**
		 * Moves an array of items to a specified row
		 *
		 * @param {array} items The items to move
		 * @param {number} newRow The target row
		 * @param {array} ignoreItems
		 */
		this.moveItemsDown = function(items, newRow, ignoreItems) {
			if (!items || items.length === 0) {
				return;
			}
			items.sort(function(a, b) {
				return a.row - b.row;
			});
			ignoreItems = ignoreItems ? ignoreItems.slice(0) : [];
			var topRows = {},
				item, i, l;
			// calculate the top rows in each column
			for (i = 0, l = items.length; i < l; ++i) {
				item = items[i];
				var topRow = topRows[item.col];
				if (typeof topRow === 'undefined' || item.row < topRow) {
					topRows[item.col] = item.row;
				}
			}
			// move each item down from the top row in its column to the row
			for (i = 0, l = items.length; i < l; ++i) {
				item = items[i];
				var rowsToMove = newRow - topRows[item.col];
				this.moveItemDown(item, item.row + rowsToMove, ignoreItems);
				ignoreItems.push(item);
			}
		};

		this.moveItemDown = function(item, newRow, ignoreItems) {
			if (item.row >= newRow) {
				return;
			}
			while (item.row < newRow) {
				++item.row;
				this.moveOverlappingItems(item, ignoreItems);
			}
			this.putItem(item, item.row, item.col, ignoreItems);
		};

		/**
		 * Moves all items up as much as possible
		 */
		this.floatItemsUp = function() {
			if (this.floating === false) {
				return;
			}
			for (var rowIndex = 0, l = this.grid.length; rowIndex < l; ++rowIndex) {
				var columns = this.grid[rowIndex];
				if (!columns) {
					continue;
				}
				for (var colIndex = 0, len = columns.length; colIndex < len; ++colIndex) {
					if (columns[colIndex]) {
						this.floatItemUp(columns[colIndex]);
					}
				}
			}
		};

		/**
		 * Float an item up to the most suitable row
		 *
		 * @param {object} item The item to move
		 */
		this.floatItemUp = function(item) {
			var colIndex = item.col,
				sizeY = item.sizeY,
				sizeX = item.sizeX,
				bestRow = null,
				bestColumn = null,
				rowIndex = item.row - 1;

			while (rowIndex > -1) {
				var items = this.getItems(rowIndex, colIndex, sizeX, sizeY, item);
				if (items.length !== 0) {
					break;
				}
				bestRow = rowIndex;
				bestColumn = colIndex;
				--rowIndex;
			}
			if (bestRow !== null) {
				this.putItem(item, bestRow, bestColumn);
			}
		};

		/**
		 * Update gridsters height
		 *
		 * @param {number} plus (Optional) Additional height to add
		 */
		this.updateHeight = function(plus) {
			var maxHeight = this.minRows;
			if (!plus) {
				plus = 0;
			}
			for (var rowIndex = this.grid.length; rowIndex >= 0; --rowIndex) {
				var columns = this.grid[rowIndex];
				if (!columns) {
					continue;
				}
				for (var colIndex = 0, len = columns.length; colIndex < len; ++colIndex) {
					if (columns[colIndex]) {
						maxHeight = Math.max(maxHeight, rowIndex + plus + columns[colIndex].sizeY);
					}
				}
			}
			this.gridHeight = Math.min(this.maxRows, maxHeight);
		};

		/**
		 * Returns the number of rows that will fit in given amount of pixels
		 *
		 * @param {number} pixels
		 * @param {boolean} ceilOrFloor (Optional) Determines rounding method
		 */
		this.pixelsToRows = function(pixels, ceilOrFloor) {
			if (ceilOrFloor === true) {
				return Math.ceil(pixels / this.curRowHeight);
			} else if (ceilOrFloor === false) {
				return Math.floor(pixels / this.curRowHeight);
			}

			return Math.round(pixels / this.curRowHeight);
		};

		/**
		 * Returns the number of columns that will fit in a given amount of pixels
		 *
		 * @param {number} pixels
		 * @param {boolean} ceilOrFloor (Optional) Determines rounding method
		 * @returns {number} The number of columns
		 */
		this.pixelsToColumns = function(pixels, ceilOrFloor) {
			if (ceilOrFloor === true) {
				return Math.ceil(pixels / this.curColWidth);
			} else if (ceilOrFloor === false) {
				return Math.floor(pixels / this.curColWidth);
			}

			return Math.round(pixels / this.curColWidth);
		};

	}
])

/**
 * The gridster directive
 *
 * @param {object} $parse
 * @param {object} $timeout
 */
.directive('gridster', ['$timeout', '$rootScope', '$window',
	function($timeout, $rootScope, $window) {
		return {
			restrict: 'EAC',
			// without transclude, some child items may lose their parent scope
			transclude: true,
			replace: true,
			template: '<div ng-class="gridsterClass()"><div ng-style="previewStyle()" class="gridster-item gridster-preview-holder"></div><div ng-transclude></div></div>',
			controller: 'GridsterCtrl',
			controllerAs: 'gridster',
			scope: {
				config: '=?gridster'
			},
			compile: function() {

				return function(scope, $elem, attrs, gridster) {
					gridster.loaded = false;

					scope.gridsterClass = function() {
						return {
							gridster: true,
							'gridster-desktop': !gridster.isMobile,
							'gridster-mobile': gridster.isMobile,
							'gridster-loaded': gridster.loaded
						};
					};

					/**
					 * @returns {Object} style object for preview element
					 */
					scope.previewStyle = function() {
						if (!gridster.movingItem) {
							return {
								display: 'none'
							};
						}
						var item = gridster.movingItem;
						return {
							display: 'block',
							height: item.sizeY * gridster.curRowHeight - gridster.margins[0],
							width: item.sizeX * gridster.curColWidth - gridster.margins[1],
							top: gridster.movingItem.row * gridster.curRowHeight + (gridster.outerMargin ? gridster.margins[0] : 0),
							left: gridster.movingItem.col * gridster.curColWidth + (gridster.outerMargin ? gridster.margins[1] : 0)
						};
					};

					var refresh = function() {
						gridster.setOptions(scope.config);

						// resolve "auto" & "match" values
						if (gridster.width === 'auto') {
							gridster.curWidth = $elem.width();
						} else {
							gridster.curWidth = gridster.width;
						}
						if (gridster.colWidth === 'auto') {
							gridster.curColWidth = (gridster.curWidth + (gridster.outerMargin ? -gridster.margins[1] : gridster.margins[1])) / gridster.columns;
						} else {
							gridster.curColWidth = gridster.colWidth;
						}
						if (gridster.rowHeight === 'match') {
							gridster.curRowHeight = gridster.curColWidth;
						} else {
							gridster.curRowHeight = gridster.rowHeight;
						}

						gridster.isMobile = gridster.mobileModeEnabled && gridster.curWidth <= gridster.mobileBreakPoint;

						// loop through all items and reset their CSS
						for (var rowIndex = 0, l = gridster.grid.length; rowIndex < l; ++rowIndex) {
							var columns = gridster.grid[rowIndex];
							if (!columns) {
								continue;
							}
							for (var colIndex = 0, len = columns.length; colIndex < len; ++colIndex) {
								if (columns[colIndex]) {
									var item = columns[colIndex];
									item.setElementPosition();
									item.setElementSizeY();
									item.setElementSizeX();
								}
							}
						}

						updateHeight();
					};

					// update grid items on config changes
					scope.$watch('config', refresh, true);

					scope.$watch('config.draggable', function() {
						$rootScope.$broadcast('gridster-draggable-changed');
					}, true);

					scope.$watch('config.resizable', function() {
						$rootScope.$broadcast('gridster-resizable-changed');
					}, true);

					var updateHeight = function() {
						$elem.css('height', (gridster.gridHeight * gridster.curRowHeight) + gridster.margins[0] + 'px');
						$elem.css('height', (gridster.gridHeight * gridster.curRowHeight) + (gridster.outerMargin ? gridster.margins[0] : -gridster.margins[0]) + 'px');
					};

					scope.$watch('gridster.gridHeight', updateHeight);

					var prevWidth = $elem.width();

					function resize() {
						var width = $elem.width();
						if (width === prevWidth || gridster.movingItem) {
							return;
						}
						prevWidth = width;

						if (gridster.loaded) {
							$elem.removeClass('gridster-loaded');
						}
						refresh();
						if (gridster.loaded) {
							$elem.addClass('gridster-loaded');
						}

						scope.$parent.$broadcast('gridster-resized', [width, $elem.height()]);
					}

					// track element width changes any way we can
					function onResize() {
						resize();
						$timeout(function() {
							scope.$apply();
						});
					}
					if (typeof $elem.resize === 'function') {
						$elem.resize(onResize);
					}
					var $win = angular.element($window);
					$win.on('resize', onResize);

					scope.$watch(function() {
						return $elem.width();
					}, resize);

					// be sure to cleanup
					scope.$on('$destroy', function() {
						gridster.destroy();
						$win.off('resize', onResize);
					});

					// allow a little time to place items before floating up
					$timeout(function() {
						scope.$watch('gridster.floating', function() {
							gridster.floatItemsUp();
						});
						gridster.loaded = true;
					}, 100);
				};
			}
		};
	}
])

.controller('GridsterItemCtrl', function() {
	this.$element = null;
	this.gridster = null;
	this.row = null;
	this.col = null;
	this.sizeX = null;
	this.sizeY = null;

	this.init = function($element, gridster) {
		this.$element = $element;
		this.gridster = gridster;
		this.sizeX = gridster.defaultSizeX;
		this.sizeY = gridster.defaultSizeY;
	};

	this.destroy = function() {
		this.gridster = null;
		this.$element = null;
	};

	/**
	 * Returns the items most important attributes
	 */
	this.toJSON = function() {
		return {
			row: this.row,
			col: this.col,
			sizeY: this.sizeY,
			sizeX: this.sizeX
		};
	};

	this.isMoving = function() {
		return this.gridster.movingItem === this;
	};

	/**
	 * Set the items position
	 *
	 * @param {number} row
	 * @param {number} column
	 */
	this.setPosition = function(row, column) {
		this.gridster.putItem(this, row, column);
		if (this.gridster.loaded) {
			this.gridster.floatItemsUp();
		}

		this.gridster.updateHeight(this.isMoving() ? this.sizeY : 0);

		if (!this.isMoving()) {
			this.setElementPosition();
		}
	};

	/**
	 * Sets a specified size property
	 *
	 * @param {string} key Can be either "x" or "y"
	 * @param {number} value The size amount
	 */
	this.setSize = function(key, value) {
		key = key.toUpperCase();
		var camelCase = 'size' + key,
			titleCase = 'Size' + key;
		if (value === '') {
			return;
		}
		value = parseInt(value, 10);
		if (isNaN(value) || value === 0) {
			value = this.gridster['default' + titleCase];
		}
		var changed = !(this[camelCase] === value && this['old' + titleCase] && this['old' + titleCase] === value);
		this['old' + titleCase] = this[camelCase] = value;

		if (!this.isMoving()) {
			this['setElement' + titleCase]();
		}
		if (changed) {
			this.gridster.moveOverlappingItems(this);

			if (this.gridster.loaded) {
				this.gridster.floatItemsUp();
			}

			this.gridster.updateHeight(this.isMoving() ? this.sizeY : 0);
		}
	};

	/**
	 * Sets the items sizeY property
	 *
	 * @param {number} rows
	 */
	this.setSizeY = function(rows) {
		this.setSize('y', rows);
	};

	/**
	 * Sets the items sizeX property
	 *
	 * @param {number} rows
	 */
	this.setSizeX = function(columns) {
		this.setSize('x', columns);
	};

	/**
	 * Sets an elements position on the page
	 *
	 * @param {number} row
	 * @param {number} column
	 */
	this.setElementPosition = function() {
		if (this.gridster.isMobile) {
			this.$element.css({
				marginLeft: this.gridster.margins[0] + 'px',
				marginRight: this.gridster.margins[0] + 'px',
				marginTop: this.gridster.margins[1] + 'px',
				marginBottom: this.gridster.margins[1] + 'px',
				top: '',
				left: ''
			});
		} else {
			this.$element.css({
				margin: 0,
				top: this.row * this.gridster.curRowHeight + (this.gridster.outerMargin ? this.gridster.margins[0] : 0),
				left: this.col * this.gridster.curColWidth + (this.gridster.outerMargin ? this.gridster.margins[1] : 0)
			});
		}
	};

	/**
	 * Sets an elements height
	 */
	this.setElementSizeY = function() {
		if (this.gridster.isMobile) {
			this.$element.css('height', '');
		} else {
			this.$element.css('height', this.sizeY * this.gridster.curRowHeight - this.gridster.margins[0]);
		}
	};

	/**
	 * Sets an elements width
	 */
	this.setElementSizeX = function() {
		if (this.gridster.isMobile) {
			this.$element.css('width', '');
		} else {
			this.$element.css('width', this.sizeX * this.gridster.curColWidth - this.gridster.margins[1]);
		}
	};
})

/**
 * GridsterItem directive
 *
 * @param {object} $parse
 * @param {object} $controller
 * @param {object} $timeout
 */
.directive('gridsterItem', ['$parse',
	function($parse) {
		return {
			restrict: 'EA',
			controller: 'GridsterItemCtrl',
			require: ['^gridster', 'gridsterItem'],
			link: function(scope, $el, attrs, controllers) {
				var optionsKey = attrs.gridsterItem,
					options;

				var gridster = controllers[0],
					item = controllers[1],
					draggablePossible = typeof $el.draggable === 'function',
					resizablePossible = typeof $el.resizable === 'function';

				//bind the items position properties
				if (optionsKey) {
					var $optionsGetter = $parse(optionsKey);
					options = $optionsGetter(scope) || {};
					if (!options && $optionsGetter.assign) {
						options = {
							row: item.row,
							col: item.col,
							sizeX: item.sizeX,
							sizeY: item.sizeY
						};
						$optionsGetter.assign(scope, options);
					}
				} else {
					options = attrs;
				}

				item.init($el, gridster);

				$el.addClass('gridster-item');

				function setDraggable() {
					if (!draggablePossible) {
						return;
					}
					if (typeof gridster.draggable === 'undefined' || !gridster.draggable.enabled) {
						try {
							$el.draggable('destroy');
						} catch (e) {}
						return;
					}
					$el.draggable({
						handle: gridster.draggable && gridster.draggable.handle ? gridster.draggable.handle : null,
						refreshPositions: true,
						start: function(event, widget) {
							$el.addClass('gridster-item-moving');
							gridster.movingItem = item;
							gridster.updateHeight(item.sizeY);
							scope.$apply(function() {
								if (gridster.draggable && gridster.draggable.start) {
									gridster.draggable.start(event, widget, $el);
								}
							});
						},
						drag: function(event, widget) {
							var row = gridster.pixelsToRows(widget.position.top);
							var col = gridster.pixelsToColumns(widget.position.left);
							if (gridster.pushing !== false || gridster.getItems(row, col, item.sizeX, item.sizeY, item).length === 0) {
								item.row = row;
								item.col = col;
							}

							scope.$apply(function() {
								if (gridster.draggable && gridster.draggable.drag) {
									gridster.draggable.drag(event, widget, $el);
								}
							});
						},
						stop: function(event, widget) {
							$el.removeClass('gridster-item-moving');
							var row = gridster.pixelsToRows(widget.position.top);
							var col = gridster.pixelsToColumns(widget.position.left);
							if (gridster.pushing !== false || gridster.getItems(row, col, item.sizeX, item.sizeY, item).length === 0) {
								item.row = row;
								item.col = col;
							}
							gridster.movingItem = null;
							scope.$apply(function() {
								if (gridster.draggable && gridster.draggable.stop) {
									gridster.draggable.stop(event, widget, $el);
								}
							});
							item.setPosition(item.row, item.col);
							gridster.updateHeight();
						}
					});
				}

				function updateResizableDimensions() {
					var enabled = typeof gridster.resizable !== 'undefined' && gridster.resizable.enabled;
					if (resizablePossible && enabled) {
						$el.resizable('option', 'minHeight', gridster.minRows * gridster.curRowHeight - gridster.margins[0]);
						$el.resizable('option', 'maxHeight', gridster.maxRows * gridster.curRowHeight - gridster.margins[0]);
						$el.resizable('option', 'minWidth', gridster.minColumns * gridster.curColWidth - gridster.margins[1]);
						$el.resizable('option', 'maxWidth', gridster.columns * gridster.curColWidth - gridster.margins[1]);
						//						$el.resizable('option', 'grid', [gridster.curColWidth, gridster.curRowHeight]);
					}
				}

				function setResizable() {
					if (!resizablePossible) {
						return;
					}
					if (typeof gridster.resizable === 'undefined' || !gridster.resizable.enabled) {
						try {
							$el.resizable('destroy');
						} catch (e) {}
						return;
					}

					function handleResize(event, widget) {
						var row = gridster.pixelsToRows(widget.position.top + 1 - (gridster.outerMargin ? gridster.margins[0] : 0), false),
							col = gridster.pixelsToColumns(widget.position.left + 1 - (gridster.outerMargin ? gridster.margins[1] : 0), false),
							sizeY = gridster.pixelsToRows(widget.size.height - 1 + gridster.margins[0] / 2, true),
							sizeX = gridster.pixelsToColumns(widget.size.width - 1 + gridster.margins[1] / 2, true);

						if (gridster.pushing !== false || gridster.getItems(row, col, sizeX, sizeY, item).length === 0) {
							item.row = row;
							item.col = col;
							item.sizeX = sizeX;
							item.sizeY = sizeY;
						}
					}

					$el.resizable({
						autoHide: true,
						handles: gridster.resizable.handles,
						minHeight: gridster.minRows * gridster.curRowHeight - gridster.margins[0],
						maxHeight: gridster.maxRows * gridster.curRowHeight - gridster.margins[0],
						minWidth: gridster.minColumns * gridster.curColWidth - gridster.margins[1],
						maxWidth: (gridster.columns - (item.col || 0)) * gridster.curColWidth - gridster.margins[1],
						//						grid: [gridster.curColWidth, gridster.curRowHeight],
						start: function(event, widget) {
							$el.addClass('gridster-item-moving');
							gridster.movingItem = item;
							scope.$apply(function() {
								if (gridster.resizable && gridster.resizable.start) {
									gridster.resizable.start(event, widget, $el);
								}
							});
						},
						resize: function(event, widget) {
							handleResize(event, widget);

							scope.$apply(function() {
								if (gridster.resizable && gridster.resizable.resize) {
									gridster.resizable.resize(event, widget, $el);
								}
							});
						},
						stop: function(event, widget) {
							$el.removeClass('gridster-item-moving');
							handleResize(event, widget);

							gridster.movingItem = null;
							scope.$apply(function() {
								if (gridster.resizable && gridster.resizable.stop) {
									gridster.resizable.stop(event, widget, $el);
								}
							});
							item.setPosition(item.row, item.col);
							item.setSizeY(item.sizeY);
							item.setSizeX(item.sizeX);
						}
					});
				}

				var aspects = ['sizeX', 'sizeY', 'row', 'col'],
					$getters = {};

				var aspectFn = function(aspect) {
					var key;
					if (typeof options[aspect] === 'string') {
						key = options[aspect];
					} else if (typeof options[aspect.toLowerCase()] === 'string') {
						key = options[aspect.toLowerCase()];
					} else if (optionsKey) {
						key = $parse(optionsKey + '.' + aspect);
					} else {
						return;
					}
					$getters[aspect] = $parse(key);

					// when the value changes externally, update the internal item object
					scope.$watch(key, function(newVal) {
						newVal = parseInt(newVal, 10);
						if (!isNaN(newVal)) {
							item[aspect] = newVal;
						}
					});

					// initial set
					var val = $getters[aspect](scope);
					if (typeof val === 'number') {
						item[aspect] = val;
					}
				};

				for (var i = 0, l = aspects.length; i < l; ++i) {
					aspectFn(aspects[i]);
				}

				function positionChanged() {
					// call setPosition so the element and gridster controller are updated
					item.setPosition(item.row, item.col);

					// when internal item position changes, update externally bound values
					if ($getters.row && $getters.row.assign) {
						$getters.row.assign(scope, item.row);
					}
					if ($getters.col && $getters.col.assign) {
						$getters.col.assign(scope, item.col);
						setResizable();
					}
				}
				scope.$watch(function() {
					return item.row;
				}, positionChanged);
				scope.$watch(function() {
					return item.col;
				}, positionChanged);

				scope.$on('gridster-draggable-changed', setDraggable);
				scope.$on('gridster-resizable-changed', setResizable);
				scope.$on('gridster-resized', updateResizableDimensions);

				var startPosCss = $el.css('position');

				setDraggable();
				setResizable();

				// undo jquery ui position relative strangeness
				if (startPosCss && startPosCss !== 'absolute') {
					$el.css('position', '');
				}

				scope.$watch(function() {
					return item.sizeY;
				}, function(sizeY) {
					item.setSizeY(sizeY);
					if ($getters.sizeY && $getters.sizeY.assign) {
						$getters.sizeY.assign(scope, item.sizeY);
					}
				});
				scope.$watch(function() {
					return item.sizeX;
				}, function(sizeX) {
					item.setSizeX(sizeX);
					if ($getters.sizeX && $getters.sizeX.assign) {
						$getters.sizeX.assign(scope, item.sizeX);
					}
				});

				return scope.$on('$destroy', function() {
					try {
						gridster.removeItem(item);
					} catch (e) {}
					try {
						item.destroy();
					} catch (e) {}
					try {
						$el.draggable('destroy');
					} catch (e) {}
					try {
						$el.resizable('destroy');
					} catch (e) {}
				});
			}
		};
	}
])

;
