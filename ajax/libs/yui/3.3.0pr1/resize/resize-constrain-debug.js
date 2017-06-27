YUI.add('resize-constrain', function(Y) {

var Lang = Y.Lang,
	isBoolean = Lang.isBoolean,
	isNumber = Lang.isNumber,
	isString = Lang.isString,

	isNode = function(v) {
		return (v instanceof Y.Node);
	},

	BORDER_BOTTOM_WIDTH = 'borderBottomWidth',
	BORDER_LEFT_WIDTH = 'borderLeftWidth',
	BORDER_RIGHT_WIDTH = 'borderRightWidth',
	BORDER_TOP_WIDTH = 'borderTopWidth',
	BOTTOM = 'bottom',
	CON = 'con',
	CONSTRAIN = 'constrain',
	HOST = 'host',
	LEFT = 'left',
	MAX_HEIGHT = 'maxHeight',
	MAX_WIDTH = 'maxWidth',
	MIN_HEIGHT = 'minHeight',
	MIN_WIDTH = 'minWidth',
	NODE = 'node',
	OFFSET_HEIGHT = 'offsetHeight',
	OFFSET_WIDTH = 'offsetWidth',
	PRESEVE_RATIO = 'preserveRatio',
	REGION = 'region',
	RESIZE_CONTRAINED = 'resizeConstrained',
	RIGHT = 'right',
	TICK_X = 'tickX',
	TICK_Y = 'tickY',
	TOP = 'top',
	VIEW = 'view',
	VIEWPORT_REGION = 'viewportRegion';

function ResizeConstrained() {
	ResizeConstrained.superclass.constructor.apply(this, arguments);
}

Y.mix(ResizeConstrained, {
	NAME: RESIZE_CONTRAINED,

	NS: CON,

	ATTRS: {
        /**
        * Will attempt to constrain the resize node to the boundaries. Arguments:<br>
        * 'view': Contrain to Viewport<br>
        * '#selector_string': Constrain to this node<br>
        * '{Region Object}': An Object Literal containing a valid region (top, right, bottom, left) of page positions
        *
        * @attribute constrain
        * @type {String/Object/Node}
        */
		constrain: {
			setter: function(v) {
				if (v && (isNode(v) || isString(v) || v.nodeType)) {
					v = Y.one(v);
				}

				return v;
			}
		},

        /**
         * The minimum height of the element
         *
         * @attribute minHeight
         * @default 15
         * @type Number
         */
		minHeight: {
			value: 15,
			validator: isNumber
		},

        /**
         * The minimum width of the element
         *
         * @attribute minWidth
         * @default 15
         * @type Number
         */
		minWidth: {
			value: 15,
			validator: isNumber
		},

        /**
         * The maximum height of the element
         *
         * @attribute maxHeight
         * @default Infinity
         * @type Number
         */
		maxHeight: {
			value: Infinity,
			validator: isNumber
		},

        /**
         * The maximum width of the element
         *
         * @attribute maxWidth
         * @default Infinity
         * @type Number
         */
		maxWidth: {
			value: Infinity,
			validator: isNumber
		},

		/**
         * Maintain the element's ratio when resizing.
         *
         * @attribute preserveRatio
         * @default false
         * @type boolean
         */
		preserveRatio: {
			value: false,
			validator: isBoolean
		},

		/**
         * The number of x ticks to span the resize to.
         *
         * @attribute tickX
         * @default false
         * @type Number | false
         */
		tickX: {
			value: false
		},

        /**
         * The number of y ticks to span the resize to.
         *
         * @attribute tickY
         * @default false
         * @type Number | false
         */
		tickY: {
			value: false
		}
	}
});

Y.extend(ResizeConstrained, Y.Plugin.Base, {
	/**
	 * Cache the border widths of the contrain node if constrain
     * option is being used.
	 *
	 * @property constrainBorderInfo
	 * @default {}
	 * @type Object
	 */
	constrainBorderInfo: null,

	initializer: function() {
		var instance = this,
			host = instance.get(HOST);

		instance.constrainBorderInfo = {
			bottom: 0,
			left: 0,
			right: 0,
			top: 0
		};

		host.delegate.dd.plug(
			Y.Plugin.DDConstrained,
			{
				tickX: instance.get(TICK_X),
				tickY: instance.get(TICK_Y)
			}
		);

		host.after('resize:align', Y.bind(instance._handleResizeAlignEvent, instance));
		host.on('resize:start', Y.bind(instance._handleResizeStartEvent, instance));
	},

	/**
     * Helper method to update the current values on
     * <a href="Resize.html#property_info">info</a> to respect the
     * constrain node.
	 *
	 * @method _checkConstrain
	 * @param {String} axis 'top' or 'left'
	 * @param {String} axisConstrain 'bottom' or 'right'
	 * @param {String} offset 'offsetHeight' or 'offsetWidth'
	 * @protected
	 */
	_checkConstrain: function(axis, axisConstrain, offset) {
		var instance = this,
			point1,
			point1Constrain,
			point2,
			point2Constrain,
			host = instance.get(HOST),
			info = host.info,
			region = instance._getConstrainRegion();

		if (region) {
			point1 = info[axis] + info[offset];
			point1Constrain = region[axisConstrain] - instance.constrainBorderInfo[axisConstrain];

			if (point1 >= point1Constrain) {
				info[offset] -= (point1 - point1Constrain);
			}

			point2 = info[axis];
			point2Constrain = region[axis] + instance.constrainBorderInfo[axis];

			if (point2 <= point2Constrain) {
				info[axis] += (point2Constrain - point2);
				info[offset] -= (point2Constrain - point2);
			}
		}
	},

    /**
     * Update the current values on <a href="Resize.html#property_info">info</a>
     * to respect the maxHeight and minHeight.
     *
     * @method _checkHeight
     * @protected
     */
	_checkHeight: function() {
		var instance = this,
			host = instance.get(HOST),
			info = host.info,
			maxHeight = instance.get(MAX_HEIGHT),
			minHeight = instance.get(MIN_HEIGHT);

		instance._checkConstrain(TOP, BOTTOM, OFFSET_HEIGHT);

		if (info.offsetHeight > maxHeight) {
			host._checkSize(OFFSET_HEIGHT, maxHeight);
		}

		if (info.offsetHeight < minHeight) {
			host._checkSize(OFFSET_HEIGHT, minHeight);
		}
	},

    /**
     * Update the current values on <a href="Resize.html#property_info">info</a>
     * calculating the correct ratio for the other values.
     *
     * @method _checkRatio
     * @protected
     */
	_checkRatio: function() {
		var instance = this,
			host = instance.get(HOST),
			info = host.info,
			originalInfo = host.originalInfo,
			oWidth = originalInfo.offsetWidth,
			oHeight = originalInfo.offsetHeight,
			oTop = originalInfo.top,
			oLeft = originalInfo.left,
			oBottom = originalInfo.bottom,
			oRight = originalInfo.right,
			// wRatio/hRatio functions keep the ratio information always synced with the current info information
			// RETURN: percentage how much width/height has changed from the original width/height
			wRatio = function() {
				return (info.offsetWidth/oWidth);
			},
			hRatio = function() {
				return (info.offsetHeight/oHeight);
			},
			isClosestToHeight = host.changeHeightHandles,
			bottomDiff,
			constrainBorders,
			constrainRegion,
			leftDiff,
			rightDiff,
			topDiff;

		// check whether the resizable node is closest to height or not
		if (instance.get(CONSTRAIN) && host.changeHeightHandles && host.changeWidthHandles) {
			constrainRegion = instance._getConstrainRegion();
			constrainBorders = instance.constrainBorderInfo;
			bottomDiff = (constrainRegion.bottom - constrainBorders.bottom) - oBottom;
			leftDiff = oLeft - (constrainRegion.left + constrainBorders.left);
			rightDiff = (constrainRegion.right - constrainBorders.right) - oRight;
			topDiff = oTop - (constrainRegion.top + constrainBorders.top);

			if (host.changeLeftHandles && host.changeTopHandles) {
				isClosestToHeight = (topDiff < leftDiff);
			}
			else if (host.changeLeftHandles) {
				isClosestToHeight = (bottomDiff < leftDiff);
			}
			else if (host.changeTopHandles) {
				isClosestToHeight = (topDiff < rightDiff);
			}
			else {
				isClosestToHeight = (bottomDiff < rightDiff);
			}
		}

		// when the height of the resizable element touch the border of the constrain first
		// force the offsetWidth to be calculated based on the height ratio
		if (isClosestToHeight) {
			info.offsetWidth = oWidth*hRatio();
			instance._checkWidth();
			info.offsetHeight = oHeight*wRatio();
		}
		else {
			info.offsetHeight = oHeight*wRatio();
			instance._checkHeight();
			info.offsetWidth = oWidth*hRatio();
		}

		// fixing the top on handles which are able to change top
		// the idea here is change the top based on how much the height has changed instead of follow the dy
		if (host.changeTopHandles) {
			info.top = oTop + (oHeight - info.offsetHeight);
		}

		// fixing the left on handles which are able to change left
		// the idea here is change the left based on how much the width has changed instead of follow the dx
		if (host.changeLeftHandles) {
			info.left = oLeft + (oWidth - info.offsetWidth);
		}

		// rounding values to avoid pixel jumpings
		Y.each(info, function(value, key) {
			if (isNumber(value)) {
				info[key] = Math.round(value);
			}
		});
	},

	/**
	 * Check whether the resizable node is inside the constrain region.
	 *
	 * @method _checkRegion
	 * @protected
	 * @return {boolean}
	 */
	_checkRegion: function() {
		var instance = this,
			host = instance.get(HOST),
			region = instance._getConstrainRegion();

		return Y.DOM.inRegion(null, region, true, host.info);
	},

    /**
     * Update the current values on <a href="Resize.html#property_info">info</a>
     * to respect the maxWidth and minWidth.
     *
     * @method _checkWidth
     * @protected
     */
	_checkWidth: function() {
		var instance = this,
			host = instance.get(HOST),
			info = host.info,
			maxWidth = instance.get(MAX_WIDTH),
			minWidth = instance.get(MIN_WIDTH);

		instance._checkConstrain(LEFT, RIGHT, OFFSET_WIDTH);

		if (info.offsetWidth < minWidth) {
			host._checkSize(OFFSET_WIDTH, minWidth);
		}

		if (info.offsetWidth > maxWidth) {
			host._checkSize(OFFSET_WIDTH, maxWidth);
		}
	},

	/**
	 * Get the constrain region based on the <code>constrain</code>
     * attribute.
	 *
	 * @method _getConstrainRegion
	 * @protected
	 * @return {Object Region}
	 */
	_getConstrainRegion: function() {
		var instance = this,
			host = instance.get(HOST),
			node = host.get(NODE),
			constrain = instance.get(CONSTRAIN),
			region = null;

		if (constrain) {
			if (constrain == VIEW) {
				region = node.get(VIEWPORT_REGION);
			}
			else if (isNode(constrain)) {
				region = constrain.get(REGION);
			}
			else {
				region = constrain;
			}
		}

		return region;
	},

	_handleResizeAlignEvent: function(event) {
		var instance = this,
			host = instance.get(HOST);

		// check the max/min height and locking top when these values are reach
		instance._checkHeight();

		// check the max/min width and locking left when these values are reach
		instance._checkWidth();

		// calculating the ratio, for proportionally resizing
		if (instance.get(PRESEVE_RATIO)) {
			instance._checkRatio();
		}

		if (instance.get(CONSTRAIN) && !instance._checkRegion()) {
			host.info = host.lastInfo;
		}
	},

	_handleResizeStartEvent: function(event) {
		var instance = this;

		instance._updateConstrainBorderInfo();
	},

	/**
     * Update <code>instance.constrainBorderInfo</code> values (bottom,
     * left, top, right).
     *
     * @method _updateConstrainBorderInfo
     * @private
     */
	_updateConstrainBorderInfo: function() {
		var instance = this,
			constrain = instance.get(CONSTRAIN),
			getStyle;

		if (isNode(constrain)) {
			getStyle = function(val) {
				return parseFloat(constrain.getStyle(val)) || 0;
			};

			instance.constrainBorderInfo.bottom = getStyle(BORDER_BOTTOM_WIDTH);
			instance.constrainBorderInfo.left = getStyle(BORDER_LEFT_WIDTH);
			instance.constrainBorderInfo.right = getStyle(BORDER_RIGHT_WIDTH);
			instance.constrainBorderInfo.top = getStyle(BORDER_TOP_WIDTH);
		}
	}
});

Y.namespace('Plugin');
Y.Plugin.ResizeConstrained = ResizeConstrained;


}, '@VERSION@' ,{requires:['resize-base', 'plugin'], skinnable:false});
