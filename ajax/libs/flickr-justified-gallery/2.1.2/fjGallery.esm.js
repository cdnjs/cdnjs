/*!
 * Flickr's Justified Gallery [fjGallery] v2.1.2 (https://flickr-justified-gallery.nkdev.info)
 * Copyright 2022 nK <https://nkdev.info>
 * Licensed under MIT (https://github.com/nk-o/flickr-justified-gallery/blob/master/LICENSE)
 */
/* eslint-disable no-undefined,no-param-reassign,no-shadow */

/**
 * Throttle execution of a function. Especially useful for rate limiting
 * execution of handlers on events like resize and scroll.
 *
 * @param {number} delay -                  A zero-or-greater delay in milliseconds. For event callbacks, values around 100 or 250 (or even higher)
 *                                            are most useful.
 * @param {Function} callback -               A function to be executed after delay milliseconds. The `this` context and all arguments are passed through,
 *                                            as-is, to `callback` when the throttled-function is executed.
 * @param {object} [options] -              An object to configure options.
 * @param {boolean} [options.noTrailing] -   Optional, defaults to false. If noTrailing is true, callback will only execute every `delay` milliseconds
 *                                            while the throttled-function is being called. If noTrailing is false or unspecified, callback will be executed
 *                                            one final time after the last throttled-function call. (After the throttled-function has not been called for
 *                                            `delay` milliseconds, the internal counter is reset).
 * @param {boolean} [options.noLeading] -   Optional, defaults to false. If noLeading is false, the first throttled-function call will execute callback
 *                                            immediately. If noLeading is true, the first the callback execution will be skipped. It should be noted that
 *                                            callback will never executed if both noLeading = true and noTrailing = true.
 * @param {boolean} [options.debounceMode] - If `debounceMode` is true (at begin), schedule `clear` to execute after `delay` ms. If `debounceMode` is
 *                                            false (at end), schedule `callback` to execute after `delay` ms.
 *
 * @returns {Function} A new, throttled, function.
 */
function throttle(delay, callback, options) {
  var _ref = options || {},
      _ref$noTrailing = _ref.noTrailing,
      noTrailing = _ref$noTrailing === void 0 ? false : _ref$noTrailing,
      _ref$noLeading = _ref.noLeading,
      noLeading = _ref$noLeading === void 0 ? false : _ref$noLeading,
      _ref$debounceMode = _ref.debounceMode,
      debounceMode = _ref$debounceMode === void 0 ? undefined : _ref$debounceMode;
  /*
   * After wrapper has stopped being called, this timeout ensures that
   * `callback` is executed at the proper times in `throttle` and `end`
   * debounce modes.
   */


  var timeoutID;
  var cancelled = false; // Keep track of the last time `callback` was executed.

  var lastExec = 0; // Function to clear existing timeout

  function clearExistingTimeout() {
    if (timeoutID) {
      clearTimeout(timeoutID);
    }
  } // Function to cancel next exec


  function cancel(options) {
    var _ref2 = options || {},
        _ref2$upcomingOnly = _ref2.upcomingOnly,
        upcomingOnly = _ref2$upcomingOnly === void 0 ? false : _ref2$upcomingOnly;

    clearExistingTimeout();
    cancelled = !upcomingOnly;
  }
  /*
   * The `wrapper` function encapsulates all of the throttling / debouncing
   * functionality and when executed will limit the rate at which `callback`
   * is executed.
   */


  function wrapper() {
    for (var _len = arguments.length, arguments_ = new Array(_len), _key = 0; _key < _len; _key++) {
      arguments_[_key] = arguments[_key];
    }

    var self = this;
    var elapsed = Date.now() - lastExec;

    if (cancelled) {
      return;
    } // Execute `callback` and update the `lastExec` timestamp.


    function exec() {
      lastExec = Date.now();
      callback.apply(self, arguments_);
    }
    /*
     * If `debounceMode` is true (at begin) this is used to clear the flag
     * to allow future `callback` executions.
     */


    function clear() {
      timeoutID = undefined;
    }

    if (!noLeading && debounceMode && !timeoutID) {
      /*
       * Since `wrapper` is being called for the first time and
       * `debounceMode` is true (at begin), execute `callback`
       * and noLeading != true.
       */
      exec();
    }

    clearExistingTimeout();

    if (debounceMode === undefined && elapsed > delay) {
      if (noLeading) {
        /*
         * In throttle mode with noLeading, if `delay` time has
         * been exceeded, update `lastExec` and schedule `callback`
         * to execute after `delay` ms.
         */
        lastExec = Date.now();

        if (!noTrailing) {
          timeoutID = setTimeout(debounceMode ? clear : exec, delay);
        }
      } else {
        /*
         * In throttle mode without noLeading, if `delay` time has been exceeded, execute
         * `callback`.
         */
        exec();
      }
    } else if (noTrailing !== true) {
      /*
       * In trailing throttle mode, since `delay` time has not been
       * exceeded, schedule `callback` to execute `delay` ms after most
       * recent execution.
       *
       * If `debounceMode` is true (at begin), schedule `clear` to execute
       * after `delay` ms.
       *
       * If `debounceMode` is false (at end), schedule `callback` to
       * execute after `delay` ms.
       */
      timeoutID = setTimeout(debounceMode ? clear : exec, debounceMode === undefined ? delay - elapsed : delay);
    }
  }

  wrapper.cancel = cancel; // Return the wrapper function.

  return wrapper;
}
/* eslint-disable no-undefined */

/**
 * Debounce execution of a function. Debouncing, unlike throttling,
 * guarantees that a function is only executed a single time, either at the
 * very beginning of a series of calls, or at the very end.
 *
 * @param {number} delay -               A zero-or-greater delay in milliseconds. For event callbacks, values around 100 or 250 (or even higher) are most useful.
 * @param {Function} callback -          A function to be executed after delay milliseconds. The `this` context and all arguments are passed through, as-is,
 *                                        to `callback` when the debounced-function is executed.
 * @param {object} [options] -           An object to configure options.
 * @param {boolean} [options.atBegin] -  Optional, defaults to false. If atBegin is false or unspecified, callback will only be executed `delay` milliseconds
 *                                        after the last debounced-function call. If atBegin is true, callback will be executed only at the first debounced-function call.
 *                                        (After the throttled-function has not been called for `delay` milliseconds, the internal counter is reset).
 *
 * @returns {Function} A new, debounced function.
 */


function debounce(delay, callback, options) {
  var _ref = options || {},
      _ref$atBegin = _ref.atBegin,
      atBegin = _ref$atBegin === void 0 ? false : _ref$atBegin;

  return throttle(delay, callback, {
    debounceMode: atBegin !== false
  });
}

var rafSchd = function rafSchd(fn) {
  var lastArgs = [];
  var frameId = null;

  var wrapperFn = function wrapperFn() {
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    lastArgs = args;

    if (frameId) {
      return;
    }

    frameId = requestAnimationFrame(function () {
      frameId = null;
      fn.apply(void 0, lastArgs);
    });
  };

  wrapperFn.cancel = function () {
    if (!frameId) {
      return;
    }

    cancelAnimationFrame(frameId);
    frameId = null;
  };

  return wrapperFn;
};

var row = {exports: {}};

/*!
 * Copyright 2019 SmugMug, Inc.
 * Licensed under the terms of the MIT license. Please see LICENSE file in the project root for terms.
 * @license
 */
/**
 * Row
 * Wrapper for each row in a justified layout.
 * Stores relevant values and provides methods for calculating layout of individual rows.
 *
 * @param {Object} layoutConfig - The same as that passed
 * @param {Object} Initialization parameters. The following are all required:
 * @param params.top {Number} Top of row, relative to container
 * @param params.left {Number} Left side of row relative to container (equal to container left padding)
 * @param params.width {Number} Width of row, not including container padding
 * @param params.spacing {Number} Horizontal spacing between items
 * @param params.targetRowHeight {Number} Layout algorithm will aim for this row height
 * @param params.targetRowHeightTolerance {Number} Row heights may vary +/- (`targetRowHeight` x `targetRowHeightTolerance`)
 * @param params.edgeCaseMinRowHeight {Number} Absolute minimum row height for edge cases that cannot be resolved within tolerance.
 * @param params.edgeCaseMaxRowHeight {Number} Absolute maximum row height for edge cases that cannot be resolved within tolerance.
 * @param params.isBreakoutRow {Boolean} Is this row in particular one of those breakout rows? Always false if it's not that kind of photo list
 * @param params.widowLayoutStyle {String} If widows are visible, how should they be laid out?
 * @constructor
 */

var Row$1 = row.exports = function (params) {
  // Top of row, relative to container
  this.top = params.top; // Left side of row relative to container (equal to container left padding)

  this.left = params.left; // Width of row, not including container padding

  this.width = params.width; // Horizontal spacing between items

  this.spacing = params.spacing; // Row height calculation values

  this.targetRowHeight = params.targetRowHeight;
  this.targetRowHeightTolerance = params.targetRowHeightTolerance;
  this.minAspectRatio = this.width / params.targetRowHeight * (1 - params.targetRowHeightTolerance);
  this.maxAspectRatio = this.width / params.targetRowHeight * (1 + params.targetRowHeightTolerance); // Edge case row height minimum/maximum

  this.edgeCaseMinRowHeight = params.edgeCaseMinRowHeight;
  this.edgeCaseMaxRowHeight = params.edgeCaseMaxRowHeight; // Widow layout direction

  this.widowLayoutStyle = params.widowLayoutStyle; // Full width breakout rows

  this.isBreakoutRow = params.isBreakoutRow; // Store layout data for each item in row

  this.items = []; // Height remains at 0 until it's been calculated

  this.height = 0;
};

Row$1.prototype = {
  /**
   * Attempt to add a single item to the row.
   * This is the heart of the justified algorithm.
   * This method is direction-agnostic; it deals only with sizes, not positions.
   *
   * If the item fits in the row, without pushing row height beyond min/max tolerance,
   * the item is added and the method returns true.
   *
   * If the item leaves row height too high, there may be room to scale it down and add another item.
   * In this case, the item is added and the method returns true, but the row is incomplete.
   *
   * If the item leaves row height too short, there are too many items to fit within tolerance.
   * The method will either accept or reject the new item, favoring the resulting row height closest to within tolerance.
   * If the item is rejected, left/right padding will be required to fit the row height within tolerance;
   * if the item is accepted, top/bottom cropping will be required to fit the row height within tolerance.
   *
   * @method addItem
   * @param itemData {Object} Item layout data, containing item aspect ratio.
   * @return {Boolean} True if successfully added; false if rejected.
   */
  addItem: function (itemData) {
    var newItems = this.items.concat(itemData),
        // Calculate aspect ratios for items only; exclude spacing
    rowWidthWithoutSpacing = this.width - (newItems.length - 1) * this.spacing,
        newAspectRatio = newItems.reduce(function (sum, item) {
      return sum + item.aspectRatio;
    }, 0),
        targetAspectRatio = rowWidthWithoutSpacing / this.targetRowHeight,
        previousRowWidthWithoutSpacing,
        previousAspectRatio,
        previousTargetAspectRatio; // Handle big full-width breakout photos if we're doing them

    if (this.isBreakoutRow) {
      // Only do it if there's no other items in this row
      if (this.items.length === 0) {
        // Only go full width if this photo is a square or landscape
        if (itemData.aspectRatio >= 1) {
          // Close out the row with a full width photo
          this.items.push(itemData);
          this.completeLayout(rowWidthWithoutSpacing / itemData.aspectRatio, 'justify');
          return true;
        }
      }
    }

    if (newAspectRatio < this.minAspectRatio) {
      // New aspect ratio is too narrow / scaled row height is too tall.
      // Accept this item and leave row open for more items.
      this.items.push(Object.assign({}, itemData));
      return true;
    } else if (newAspectRatio > this.maxAspectRatio) {
      // New aspect ratio is too wide / scaled row height will be too short.
      // Accept item if the resulting aspect ratio is closer to target than it would be without the item.
      // NOTE: Any row that falls into this block will require cropping/padding on individual items.
      if (this.items.length === 0) {
        // When there are no existing items, force acceptance of the new item and complete the layout.
        // This is the pano special case.
        this.items.push(Object.assign({}, itemData));
        this.completeLayout(rowWidthWithoutSpacing / newAspectRatio, 'justify');
        return true;
      } // Calculate width/aspect ratio for row before adding new item


      previousRowWidthWithoutSpacing = this.width - (this.items.length - 1) * this.spacing;
      previousAspectRatio = this.items.reduce(function (sum, item) {
        return sum + item.aspectRatio;
      }, 0);
      previousTargetAspectRatio = previousRowWidthWithoutSpacing / this.targetRowHeight;

      if (Math.abs(newAspectRatio - targetAspectRatio) > Math.abs(previousAspectRatio - previousTargetAspectRatio)) {
        // Row with new item is us farther away from target than row without; complete layout and reject item.
        this.completeLayout(previousRowWidthWithoutSpacing / previousAspectRatio, 'justify');
        return false;
      } else {
        // Row with new item is us closer to target than row without;
        // accept the new item and complete the row layout.
        this.items.push(Object.assign({}, itemData));
        this.completeLayout(rowWidthWithoutSpacing / newAspectRatio, 'justify');
        return true;
      }
    } else {
      // New aspect ratio / scaled row height is within tolerance;
      // accept the new item and complete the row layout.
      this.items.push(Object.assign({}, itemData));
      this.completeLayout(rowWidthWithoutSpacing / newAspectRatio, 'justify');
      return true;
    }
  },

  /**
   * Check if a row has completed its layout.
   *
   * @method isLayoutComplete
   * @return {Boolean} True if complete; false if not.
   */
  isLayoutComplete: function () {
    return this.height > 0;
  },

  /**
   * Set row height and compute item geometry from that height.
   * Will justify items within the row unless instructed not to.
   *
   * @method completeLayout
   * @param newHeight {Number} Set row height to this value.
   * @param widowLayoutStyle {String} How should widows display? Supported: left | justify | center
   */
  completeLayout: function (newHeight, widowLayoutStyle) {
    var itemWidthSum = this.left,
        rowWidthWithoutSpacing = this.width - (this.items.length - 1) * this.spacing,
        clampedToNativeRatio,
        clampedHeight,
        errorWidthPerItem,
        roundedCumulativeErrors,
        singleItemGeometry,
        centerOffset; // Justify unless explicitly specified otherwise.

    if (typeof widowLayoutStyle === 'undefined' || ['justify', 'center', 'left'].indexOf(widowLayoutStyle) < 0) {
      widowLayoutStyle = 'left';
    } // Clamp row height to edge case minimum/maximum.


    clampedHeight = Math.max(this.edgeCaseMinRowHeight, Math.min(newHeight, this.edgeCaseMaxRowHeight));

    if (newHeight !== clampedHeight) {
      // If row height was clamped, the resulting row/item aspect ratio will be off,
      // so force it to fit the width (recalculate aspectRatio to match clamped height).
      // NOTE: this will result in cropping/padding commensurate to the amount of clamping.
      this.height = clampedHeight;
      clampedToNativeRatio = rowWidthWithoutSpacing / clampedHeight / (rowWidthWithoutSpacing / newHeight);
    } else {
      // If not clamped, leave ratio at 1.0.
      this.height = newHeight;
      clampedToNativeRatio = 1.0;
    } // Compute item geometry based on newHeight.


    this.items.forEach(function (item) {
      item.top = this.top;
      item.width = item.aspectRatio * this.height * clampedToNativeRatio;
      item.height = this.height; // Left-to-right.
      // TODO right to left
      // item.left = this.width - itemWidthSum - item.width;

      item.left = itemWidthSum; // Increment width.

      itemWidthSum += item.width + this.spacing;
    }, this); // If specified, ensure items fill row and distribute error
    // caused by rounding width and height across all items.

    if (widowLayoutStyle === 'justify') {
      itemWidthSum -= this.spacing + this.left;
      errorWidthPerItem = (itemWidthSum - this.width) / this.items.length;
      roundedCumulativeErrors = this.items.map(function (item, i) {
        return Math.round((i + 1) * errorWidthPerItem);
      });

      if (this.items.length === 1) {
        // For rows with only one item, adjust item width to fill row.
        singleItemGeometry = this.items[0];
        singleItemGeometry.width -= Math.round(errorWidthPerItem);
      } else {
        // For rows with multiple items, adjust item width and shift items to fill the row,
        // while maintaining equal spacing between items in the row.
        this.items.forEach(function (item, i) {
          if (i > 0) {
            item.left -= roundedCumulativeErrors[i - 1];
            item.width -= roundedCumulativeErrors[i] - roundedCumulativeErrors[i - 1];
          } else {
            item.width -= roundedCumulativeErrors[i];
          }
        });
      }
    } else if (widowLayoutStyle === 'center') {
      // Center widows
      centerOffset = (this.width - itemWidthSum) / 2;
      this.items.forEach(function (item) {
        item.left += centerOffset + this.spacing;
      }, this);
    }
  },

  /**
   * Force completion of row layout with current items.
   *
   * @method forceComplete
   * @param fitToWidth {Boolean} Stretch current items to fill the row width.
   *                             This will likely result in padding.
   * @param fitToWidth {Number}
   */
  forceComplete: function (fitToWidth, rowHeight) {
    // TODO Handle fitting to width
    // var rowWidthWithoutSpacing = this.width - (this.items.length - 1) * this.spacing,
    // 	currentAspectRatio = this.items.reduce(function (sum, item) {
    // 		return sum + item.aspectRatio;
    // 	}, 0);
    if (typeof rowHeight === 'number') {
      this.completeLayout(rowHeight, this.widowLayoutStyle);
    } else {
      // Complete using target row height.
      this.completeLayout(this.targetRowHeight, this.widowLayoutStyle);
    }
  },

  /**
   * Return layout data for items within row.
   * Note: returns actual list, not a copy.
   *
   * @method getItems
   * @return Layout data for items within row.
   */
  getItems: function () {
    return this.items;
  }
};

/*!
 * Copyright 2019 SmugMug, Inc.
 * Licensed under the terms of the MIT license. Please see LICENSE file in the project root for terms.
 * @license
 */

var Row = row.exports;
/**
 * Create a new, empty row.
 *
 * @method createNewRow
 * @param layoutConfig {Object} The layout configuration
 * @param layoutData {Object} The current state of the layout
 * @return A new, empty row of the type specified by this layout.
 */

function createNewRow(layoutConfig, layoutData) {
  var isBreakoutRow; // Work out if this is a full width breakout row

  if (layoutConfig.fullWidthBreakoutRowCadence !== false) {
    if ((layoutData._rows.length + 1) % layoutConfig.fullWidthBreakoutRowCadence === 0) {
      isBreakoutRow = true;
    }
  }

  return new Row({
    top: layoutData._containerHeight,
    left: layoutConfig.containerPadding.left,
    width: layoutConfig.containerWidth - layoutConfig.containerPadding.left - layoutConfig.containerPadding.right,
    spacing: layoutConfig.boxSpacing.horizontal,
    targetRowHeight: layoutConfig.targetRowHeight,
    targetRowHeightTolerance: layoutConfig.targetRowHeightTolerance,
    edgeCaseMinRowHeight: 0.5 * layoutConfig.targetRowHeight,
    edgeCaseMaxRowHeight: 2 * layoutConfig.targetRowHeight,
    rightToLeft: false,
    isBreakoutRow: isBreakoutRow,
    widowLayoutStyle: layoutConfig.widowLayoutStyle
  });
}
/**
 * Add a completed row to the layout.
 * Note: the row must have already been completed.
 *
 * @method addRow
 * @param layoutConfig {Object} The layout configuration
 * @param layoutData {Object} The current state of the layout
 * @param row {Row} The row to add.
 * @return {Array} Each item added to the row.
 */


function addRow(layoutConfig, layoutData, row) {
  layoutData._rows.push(row);

  layoutData._layoutItems = layoutData._layoutItems.concat(row.getItems()); // Increment the container height

  layoutData._containerHeight += row.height + layoutConfig.boxSpacing.vertical;
  return row.items;
}
/**
 * Calculate the current layout for all items in the list that require layout.
 * "Layout" means geometry: position within container and size
 *
 * @method computeLayout
 * @param layoutConfig {Object} The layout configuration
 * @param layoutData {Object} The current state of the layout
 * @param itemLayoutData {Array} Array of items to lay out, with data required to lay out each item
 * @return {Object} The newly-calculated layout, containing the new container height, and lists of layout items
 */


function computeLayout(layoutConfig, layoutData, itemLayoutData) {
  var laidOutItems = [],
      itemAdded,
      currentRow,
      nextToLastRowHeight; // Apply forced aspect ratio if specified, and set a flag.

  if (layoutConfig.forceAspectRatio) {
    itemLayoutData.forEach(function (itemData) {
      itemData.forcedAspectRatio = true;
      itemData.aspectRatio = layoutConfig.forceAspectRatio;
    });
  } // Loop through the items


  itemLayoutData.some(function (itemData, i) {
    if (isNaN(itemData.aspectRatio)) {
      throw new Error("Item " + i + " has an invalid aspect ratio");
    } // If not currently building up a row, make a new one.


    if (!currentRow) {
      currentRow = createNewRow(layoutConfig, layoutData);
    } // Attempt to add item to the current row.


    itemAdded = currentRow.addItem(itemData);

    if (currentRow.isLayoutComplete()) {
      // Row is filled; add it and start a new one
      laidOutItems = laidOutItems.concat(addRow(layoutConfig, layoutData, currentRow));

      if (layoutData._rows.length >= layoutConfig.maxNumRows) {
        currentRow = null;
        return true;
      }

      currentRow = createNewRow(layoutConfig, layoutData); // Item was rejected; add it to its own row

      if (!itemAdded) {
        itemAdded = currentRow.addItem(itemData);

        if (currentRow.isLayoutComplete()) {
          // If the rejected item fills a row on its own, add the row and start another new one
          laidOutItems = laidOutItems.concat(addRow(layoutConfig, layoutData, currentRow));

          if (layoutData._rows.length >= layoutConfig.maxNumRows) {
            currentRow = null;
            return true;
          }

          currentRow = createNewRow(layoutConfig, layoutData);
        }
      }
    }
  }); // Handle any leftover content (orphans) depending on where they lie
  // in this layout update, and in the total content set.

  if (currentRow && currentRow.getItems().length && layoutConfig.showWidows) {
    // Last page of all content or orphan suppression is suppressed; lay out orphans.
    if (layoutData._rows.length) {
      // Only Match previous row's height if it exists and it isn't a breakout row
      if (layoutData._rows[layoutData._rows.length - 1].isBreakoutRow) {
        nextToLastRowHeight = layoutData._rows[layoutData._rows.length - 1].targetRowHeight;
      } else {
        nextToLastRowHeight = layoutData._rows[layoutData._rows.length - 1].height;
      }

      currentRow.forceComplete(false, nextToLastRowHeight);
    } else {
      // ...else use target height if there is no other row height to reference.
      currentRow.forceComplete(false);
    }

    laidOutItems = laidOutItems.concat(addRow(layoutConfig, layoutData, currentRow));
    layoutConfig._widowCount = currentRow.getItems().length;
  } // We need to clean up the bottom container padding
  // First remove the height added for box spacing


  layoutData._containerHeight = layoutData._containerHeight - layoutConfig.boxSpacing.vertical; // Then add our bottom container padding

  layoutData._containerHeight = layoutData._containerHeight + layoutConfig.containerPadding.bottom;
  return {
    containerHeight: layoutData._containerHeight,
    widowCount: layoutConfig._widowCount,
    boxes: layoutData._layoutItems
  };
}
/**
 * Takes in a bunch of box data and config. Returns
 * geometry to lay them out in a justified view.
 *
 * @method covertSizesToAspectRatios
 * @param sizes {Array} Array of objects with widths and heights
 * @return {Array} A list of aspect ratios
 */


var lib = function (input, config) {
  var layoutConfig = {};
  var layoutData = {}; // Defaults

  var defaults = {
    containerWidth: 1060,
    containerPadding: 10,
    boxSpacing: 10,
    targetRowHeight: 320,
    targetRowHeightTolerance: 0.25,
    maxNumRows: Number.POSITIVE_INFINITY,
    forceAspectRatio: false,
    showWidows: true,
    fullWidthBreakoutRowCadence: false,
    widowLayoutStyle: 'left'
  };
  var containerPadding = {};
  var boxSpacing = {};
  config = config || {}; // Merge defaults and config passed in

  layoutConfig = Object.assign(defaults, config); // Sort out padding and spacing values

  containerPadding.top = !isNaN(parseFloat(layoutConfig.containerPadding.top)) ? layoutConfig.containerPadding.top : layoutConfig.containerPadding;
  containerPadding.right = !isNaN(parseFloat(layoutConfig.containerPadding.right)) ? layoutConfig.containerPadding.right : layoutConfig.containerPadding;
  containerPadding.bottom = !isNaN(parseFloat(layoutConfig.containerPadding.bottom)) ? layoutConfig.containerPadding.bottom : layoutConfig.containerPadding;
  containerPadding.left = !isNaN(parseFloat(layoutConfig.containerPadding.left)) ? layoutConfig.containerPadding.left : layoutConfig.containerPadding;
  boxSpacing.horizontal = !isNaN(parseFloat(layoutConfig.boxSpacing.horizontal)) ? layoutConfig.boxSpacing.horizontal : layoutConfig.boxSpacing;
  boxSpacing.vertical = !isNaN(parseFloat(layoutConfig.boxSpacing.vertical)) ? layoutConfig.boxSpacing.vertical : layoutConfig.boxSpacing;
  layoutConfig.containerPadding = containerPadding;
  layoutConfig.boxSpacing = boxSpacing; // Local

  layoutData._layoutItems = [];
  layoutData._awakeItems = [];
  layoutData._inViewportItems = [];
  layoutData._leadingOrphans = [];
  layoutData._trailingOrphans = [];
  layoutData._containerHeight = layoutConfig.containerPadding.top;
  layoutData._rows = [];
  layoutData._orphans = [];
  layoutConfig._widowCount = 0; // Convert widths and heights to aspect ratios if we need to

  return computeLayout(layoutConfig, layoutData, input.map(function (item) {
    if (item.width && item.height) {
      return {
        aspectRatio: item.width / item.height
      };
    } else {
      return {
        aspectRatio: item
      };
    }
  }));
};

function ready(callback) {
  if ('complete' === document.readyState || 'interactive' === document.readyState) {
    // Already ready or interactive, execute callback
    callback();
  } else {
    document.addEventListener('DOMContentLoaded', callback, {
      capture: true,
      once: true,
      passive: true
    });
  }
}

/* eslint-disable import/no-mutable-exports */

/* eslint-disable no-restricted-globals */
let win;

if ('undefined' !== typeof window) {
  win = window;
} else if ('undefined' !== typeof global) {
  win = global;
} else if ('undefined' !== typeof self) {
  win = self;
} else {
  win = {};
}

var global$1 = win;

// get image dimensions
// thanks https://gist.github.com/dimsemenov/5382856
function getImgDimensions(img, cb) {
  let interval;
  let hasSize = false;
  let addedListeners = false;

  const onHasSize = () => {
    if (hasSize) {
      cb(hasSize);
      return;
    } // check for non-zero, non-undefined naturalWidth


    if (!img.naturalWidth) {
      return;
    }

    hasSize = {
      width: img.naturalWidth,
      height: img.naturalHeight
    };
    cb(hasSize);
    clearInterval(interval);

    if (addedListeners) {
      // eslint-disable-next-line no-use-before-define
      removeListeners();
    }
  };

  const onLoaded = () => {
    onHasSize();
  };

  const onError = () => {
    onHasSize();
  };

  const checkSize = () => {
    if (0 < img.naturalWidth) {
      onHasSize();
    }
  };

  const addListeners = () => {
    addedListeners = true;
    img.addEventListener('load', onLoaded);
    img.addEventListener('error', onError);
  };

  const removeListeners = () => {
    addedListeners = false;
    img.removeEventListener('load', onLoaded);
    img.removeEventListener('error', onError);
  };

  checkSize();

  if (!hasSize) {
    addListeners();
    interval = setInterval(checkSize, 100);
  }
}

// need to render all in one scroll/resize event

const fjGalleryList = [];
const updateFjGallery = /*#__PURE__*/rafSchd(() => {
  fjGalleryList.forEach(item => {
    item.resize();
  });
});
global$1.addEventListener('resize', updateFjGallery);
global$1.addEventListener('orientationchange', updateFjGallery);
global$1.addEventListener('load', updateFjGallery);
ready(() => {
  updateFjGallery();
});
let instanceID = 0; // fjGallery class

class FJGallery {
  constructor(container, userOptions) {
    const self = this;
    self.instanceID = instanceID;
    instanceID += 1;
    self.$container = container;
    self.images = [];
    self.defaults = {
      itemSelector: '.fj-gallery-item',
      imageSelector: 'img',
      gutter: 10,
      // supports object like `{ horizontal: 10, vertical: 10 }`.
      rowHeight: 320,
      rowHeightTolerance: 0.25,
      // [0, 1]
      maxRowsCount: Number.POSITIVE_INFINITY,
      lastRow: 'left',
      // left, center, right, hide
      transitionDuration: '0.3s',
      calculateItemsHeight: false,
      resizeDebounce: 100,
      isRtl: 'rtl' === self.css(self.$container, 'direction'),
      // events
      onInit: null,
      // function() {}
      onDestroy: null,
      // function() {}
      onAppendImages: null,
      // function() {}
      onBeforeJustify: null,
      // function() {}
      onJustify: null // function() {}

    }; // prepare data-options

    const dataOptions = self.$container.dataset || {};
    const pureDataOptions = {};
    Object.keys(dataOptions).forEach(key => {
      const loweCaseOption = key.substr(0, 1).toLowerCase() + key.substr(1);

      if (loweCaseOption && 'undefined' !== typeof self.defaults[loweCaseOption]) {
        pureDataOptions[loweCaseOption] = dataOptions[key];
      }
    });
    self.options = { ...self.defaults,
      ...pureDataOptions,
      ...userOptions
    };
    self.pureOptions = { ...self.options
    }; // debounce for resize

    self.resize = debounce(self.options.resizeDebounce, self.resize);
    self.justify = rafSchd(self.justify.bind(self));
    self.init();
  } // add styles to element
  // eslint-disable-next-line class-methods-use-this


  css(el, styles) {
    if ('string' === typeof styles) {
      return global$1.getComputedStyle(el).getPropertyValue(styles);
    }

    Object.keys(styles).forEach(key => {
      el.style[key] = styles[key];
    });
    return el;
  } // set temporary transition with event listener


  applyTransition($item, properties) {
    const self = this; // Remove previous event listener

    self.onTransitionEnd($item)(); // Add transitions

    self.css($item, {
      'transition-property': properties.join(', '),
      'transition-duration': self.options.transitionDuration
    }); // Add event listener

    $item.addEventListener('transitionend', self.onTransitionEnd($item, properties), false);
  }

  onTransitionEnd($item) {
    const self = this;
    return () => {
      self.css($item, {
        'transition-property': '',
        'transition-duration': ''
      });
      $item.removeEventListener('transitionend', self.onTransitionEnd($item));
    };
  } // add to fjGallery instances list


  addToFjGalleryList() {
    fjGalleryList.push(this);
    updateFjGallery();
  } // remove from fjGallery instances list


  removeFromFjGalleryList() {
    const self = this;
    fjGalleryList.forEach((item, key) => {
      if (item.instanceID === self.instanceID) {
        fjGalleryList.splice(key, 1);
      }
    });
  }

  init() {
    const self = this;
    self.appendImages(self.$container.querySelectorAll(self.options.itemSelector));
    self.addToFjGalleryList(); // call onInit event

    if (self.options.onInit) {
      self.options.onInit.call(self);
    }
  } // append images


  appendImages($images) {
    const self = this; // check if jQuery

    if (global$1.jQuery && $images instanceof global$1.jQuery) {
      $images = $images.get();
    }

    if (!$images || !$images.length) {
      return;
    }

    $images.forEach($item => {
      // if $images is jQuery, for some reason in this array there is undefined item, that not a DOM,
      // so we need to check for $item.querySelector.
      if ($item && !$item.fjGalleryImage && $item.querySelector) {
        const $image = $item.querySelector(self.options.imageSelector);

        if ($image) {
          $item.fjGalleryImage = self;
          const data = {
            $item,
            $image,
            width: parseFloat($image.getAttribute('width')) || false,
            height: parseFloat($image.getAttribute('height')) || false,

            loadSizes() {
              const itemData = this;
              getImgDimensions($image, dimensions => {
                if (itemData.width !== dimensions.width || itemData.height !== dimensions.height) {
                  itemData.width = dimensions.width;
                  itemData.height = dimensions.height;
                  self.resize();
                }
              });
            }

          };
          data.loadSizes();
          self.images.push(data);
        }
      }
    }); // call onAppendImages event

    if (self.options.onAppendImages) {
      self.options.onAppendImages.call(self, [$images]);
    }

    self.justify();
  } // justify images


  justify() {
    const self = this;
    const justifyArray = [];
    self.justifyCount = (self.justifyCount || 0) + 1; // call onBeforeJustify event

    if (self.options.onBeforeJustify) {
      self.options.onBeforeJustify.call(self);
    }

    self.images.forEach(data => {
      if (data.width && data.height) {
        justifyArray.push(data.width / data.height);
      }
    });
    const justifiedOptions = {
      containerWidth: self.$container.getBoundingClientRect().width,
      containerPadding: {
        top: parseFloat(self.css(self.$container, 'padding-top')) || 0,
        right: parseFloat(self.css(self.$container, 'padding-right')) || 0,
        bottom: parseFloat(self.css(self.$container, 'padding-bottom')) || 0,
        left: parseFloat(self.css(self.$container, 'padding-left')) || 0
      },
      boxSpacing: self.options.gutter,
      targetRowHeight: self.options.rowHeight,
      targetRowHeightTolerance: self.options.rowHeightTolerance,
      maxNumRows: self.options.maxRowsCount,
      showWidows: 'hide' !== self.options.lastRow
    };
    const justifiedData = lib(justifyArray, justifiedOptions); // Align last row

    if (justifiedData.widowCount && ('center' === self.options.lastRow || 'right' === self.options.lastRow)) {
      const lastItemData = justifiedData.boxes[justifiedData.boxes.length - 1];
      let gapSize = justifiedOptions.containerWidth - lastItemData.width - lastItemData.left;

      if ('center' === self.options.lastRow) {
        gapSize /= 2;
      }

      if ('right' === self.options.lastRow) {
        gapSize -= justifiedOptions.containerPadding.right;
      }

      for (let i = 1; i <= justifiedData.widowCount; i += 1) {
        justifiedData.boxes[justifiedData.boxes.length - i].left = justifiedData.boxes[justifiedData.boxes.length - i].left + gapSize;
      }
    } // RTL compatibility


    if (self.options.isRtl) {
      justifiedData.boxes.forEach((boxData, i) => {
        justifiedData.boxes[i].left = justifiedOptions.containerWidth - justifiedData.boxes[i].left - justifiedData.boxes[i].width - justifiedOptions.containerPadding.right + justifiedOptions.containerPadding.left;
      });
    }

    let i = 0;
    let additionalTopOffset = 0;
    const rowsMaxHeight = {}; // Set image sizes.

    self.images.forEach((data, imgI) => {
      if (justifiedData.boxes[i] && data.width && data.height) {
        // calculate additional offset based on actual items height.
        if (self.options.calculateItemsHeight && 'undefined' === typeof rowsMaxHeight[justifiedData.boxes[i].top] && Object.keys(rowsMaxHeight).length) {
          additionalTopOffset += rowsMaxHeight[Object.keys(rowsMaxHeight).pop()] - justifiedData.boxes[imgI - 1].height;
        }

        if (self.options.transitionDuration && 1 < self.justifyCount) {
          self.applyTransition(data.$item, ['transform']);
        }

        self.css(data.$item, {
          display: '',
          position: 'absolute',
          transform: `translateX(${justifiedData.boxes[i].left}px) translateY(${justifiedData.boxes[i].top + additionalTopOffset}px) translateZ(0)`,
          width: `${justifiedData.boxes[i].width}px`
        }); // calculate actual items height.

        if (self.options.calculateItemsHeight) {
          const rect = data.$item.getBoundingClientRect();

          if ('undefined' === typeof rowsMaxHeight[justifiedData.boxes[i].top] || rowsMaxHeight[justifiedData.boxes[i].top] < rect.height) {
            rowsMaxHeight[justifiedData.boxes[i].top] = rect.height;
          }
        }

        i += 1;
      } else {
        self.css(data.$item, {
          display: 'none'
        });
      }
    }); // increase additional offset based on the latest row items height.

    if (self.options.calculateItemsHeight && Object.keys(rowsMaxHeight).length) {
      additionalTopOffset += rowsMaxHeight[Object.keys(rowsMaxHeight).pop()] - justifiedData.boxes[justifiedData.boxes.length - 1].height;
    }

    if (self.options.transitionDuration) {
      self.applyTransition(self.$container, ['height']);
    } // Set container height.


    self.css(self.$container, {
      height: `${justifiedData.containerHeight + additionalTopOffset}px`
    }); // call onJustify event

    if (self.options.onJustify) {
      self.options.onJustify.call(self);
    }
  } // update options and resize gallery items


  updateOptions(options) {
    const self = this;
    self.options = { ...self.options,
      ...options
    };
    self.justify();
  }

  destroy() {
    const self = this;
    self.removeFromFjGalleryList();
    self.justifyCount = 0; // call onDestroy event

    if (self.options.onDestroy) {
      self.options.onDestroy.call(self);
    } // remove styles.


    self.css(self.$container, {
      height: '',
      transition: ''
    });
    self.images.forEach(data => {
      self.css(data.$item, {
        position: '',
        transform: '',
        transition: '',
        width: '',
        height: ''
      });
    }); // delete fjGalleryImage instance from images

    self.images.forEach(val => {
      delete val.$item.fjGalleryImage;
    }); // delete fjGallery instance from container

    delete self.$container.fjGallery;
  }

  resize() {
    const self = this;
    self.justify();
  }

} // global definition


const fjGallery = function (items, options, ...args) {
  // check for dom element
  // thanks: http://stackoverflow.com/questions/384286/javascript-isdom-how-do-you-check-if-a-javascript-object-is-a-dom-object
  if ('object' === typeof HTMLElement ? items instanceof HTMLElement : items && 'object' === typeof items && null !== items && 1 === items.nodeType && 'string' === typeof items.nodeName) {
    items = [items];
  }

  const len = items.length;
  let k = 0;
  let ret;

  for (k; k < len; k += 1) {
    if ('object' === typeof options || 'undefined' === typeof options) {
      if (!items[k].fjGallery) {
        // eslint-disable-next-line new-cap
        items[k].fjGallery = new FJGallery(items[k], options);
      }
    } else if (items[k].fjGallery) {
      // eslint-disable-next-line prefer-spread
      ret = items[k].fjGallery[options].apply(items[k].fjGallery, args);
    }

    if ('undefined' !== typeof ret) {
      return ret;
    }
  }

  return items;
};

fjGallery.constructor = FJGallery;

export { fjGallery as default };
//# sourceMappingURL=fjGallery.esm.js.map
