/**
 * Content Tooltips
 * @module Ink.UI.Tooltip_1
 * @version 1
 */
Ink.createModule('Ink.UI.Tooltip', '1', ['Ink.UI.Common_1', 'Ink.Dom.Event_1', 'Ink.Dom.Element_1', 'Ink.Dom.Selector_1', 'Ink.Util.Array_1', 'Ink.Dom.Css_1', 'Ink.Dom.Browser_1'], function (Common, InkEvent, InkElement, Selector, InkArray, Css) {
    'use strict';

    /**
     * Tooltips are useful as a means to display information about functionality while avoiding clutter.
     *
     * Tooltips show up when you hover elements which "have" tooltips.
     *
     * This class will "give" a tooltip to many elements, selected by its first argument (`target`). This is contrary to the other UI modules in Ink, which are created once per element.
     *
     * You can define options either through the second argument of the Tooltip constructor, or as data-attributes in each `target` element. Options set through data-attributes all start with "data-tip", and override options passed into the Tooltip constructor.
     *
     * @class Ink.UI.Tooltip
     * @constructor
     *
     * @param {DOMElement|String}   target                  Target element or selector of elements, to display the tooltips on.
     * @param {Object}              [options]               Options object
     * @param {String}              [options.text]          Text content for the tooltip.
     * @param {String}              [options.html]          HTML for the tooltip. Same as above, but won't escape HTML.
     * @param {String}              [options.where]         Positioning for the tooltip. Options are 'up', 'down', 'left', 'right', 'mousemove' (follows the cursor), and 'mousefix' (stays fixed). Defaults to 'up'.
     *     
     * @param {String}              [options.color]         Color of the tooltip. Options are red, orange, blue, green and black. Default is white.
     * @param {Number}              [options.fade]          Number of seconds to fade in/out. Defaults to 0.3.
     * @param {Boolean}             [options.forever]       Flag to prevent the tooltip from being erased when the mouse hovers away from the target.
     * @param {Number}              [options.timeout]       Number of seconds the tooltip will stay open. Useful together with options.forever. Defaults to 0.
     * @param {Number}              [options.delay]         Time the tooltip waits until it is displayed. Useful to avoid getting the attention of the user unnecessarily
     * @param {DOMElement|Selector} [options.template]      Element or selector containing HTML to be cloned into the tooltips. Can be a hidden element, because CSS `display` is set to `block`.
     * @param {String}              [options.templatefield] Selector within the template element to choose where the text is inserted into the tooltip. Useful when a wrapper DIV is required.
     * @param {Number}              [options.left]          Spacing from the target to the tooltip, when `where` is `mousemove` or `mousefix`. Defaults to 10.
     * @param {Number}              [options.top]           Spacing from the target to the tooltip, when `where` is `mousemove` or `mousefix`. Defaults to 10.
     * @param {Number}              [options.spacing]       Spacing between the tooltip and the target element, when `where` is not `mousemove` or `mousefix`. Defaults to 8.
     * 
     * @sample Ink_UI_Tooltip_1.html
     */
    function Tooltip(element, options) {
        this._init(element, options || {});
    }

    function EachTooltip(root, elm) {
        this._init(root, elm);
    }

    var transitionDurationName,
        transitionPropertyName,
        transitionTimingFunctionName;
    (function () {  // Feature detection
        var test = document.createElement('DIV');
        var names = ['transition', 'oTransition', 'msTransition', 'mozTransition',
            'webkitTransition'];
        for (var i = 0; i < names.length; i++) {
            if (typeof test.style[names[i] + 'Duration'] !== 'undefined') {
                transitionDurationName = names[i] + 'Duration';
                transitionPropertyName = names[i] + 'Property';
                transitionTimingFunctionName = names[i] + 'TimingFunction';
                break;
            }
        }
    }());

    // Body or documentElement
    var bodies = document.getElementsByTagName('body');
    var body = bodies.length ? bodies[0] : document.documentElement;

    Tooltip.prototype = {
        _init: function(element, options) {
            var elements;

            this.options = Ink.extendObj({
                    where: 'up',
                    zIndex: 10000,
                    left: 10,
                    top: 10,
                    spacing: 8,
                    forever: 0,
                    color: '',
                    timeout: 0,
                    delay: 0,
                    template: null,
                    templatefield: null,
                    fade: 0.3,
                    text: ''
                }, options || {});

            if (typeof element === 'string') {
                elements = Selector.select(element);
            } else if (typeof element === 'object') {
                elements = [element];
            } else {
                throw 'Element expected';
            }

            this.tooltips = [];

            for (var i = 0, len = elements.length; i < len; i++) {
                this.tooltips[i] = new EachTooltip(this, elements[i]);
            }
        },
        /**
         * Destroys the tooltips created by this instance
         *
         * @method destroy
         */
        destroy: function () {
            InkArray.each(this.tooltips, function (tooltip) {
                tooltip._destroy();
            });
            this.tooltips = null;
            this.options = null;
        }
    };

    EachTooltip.prototype = {
        _oppositeDirections: {
            left: 'right',
            right: 'left',
            up: 'down',
            down: 'up'
        },
        _init: function(root, elm) {
            InkEvent.observe(elm, 'mouseover', Ink.bindEvent(this._onMouseOver, this));
            InkEvent.observe(elm, 'mouseout', Ink.bindEvent(this._onMouseOut, this));
            InkEvent.observe(elm, 'mousemove', Ink.bindEvent(this._onMouseMove, this));

            this.root = root;
            this.element = elm;
            this._delayTimeout = null;
            this.tooltip = null;

            Common.registerInstance(this, this.element);
        },
        _makeTooltip: function (mousePosition) {
            if (!this._getOpt('text') &&
                    !this._getOpt('html') &&
                    !InkElement.hasAttribute(this.element, 'title')) {
                return false;
            }

            var tooltip = this._createTooltipElement();

            if (this.tooltip) {
                this._removeTooltip();
            }

            this.tooltip = tooltip;

            this._fadeInTooltipElement(tooltip);
            this._placeTooltipElement(tooltip, mousePosition);

            InkEvent.observe(tooltip, 'mouseover', Ink.bindEvent(this._onTooltipMouseOver, this));

            var timeout = this._getFloatOpt('timeout');
            if (timeout) {
                setTimeout(Ink.bind(function () {
                    if (this.tooltip === tooltip) {
                        this._removeTooltip();
                    }
                }, this), timeout * 1000);
            }
        },
        _createTooltipElement: function () {
            var template = this._getOpt('template'),  // User template instead of our HTML
                templatefield = this._getOpt('templatefield'),
                
                tooltip,  // The element we float
                field;  // Element where we write our message. Child or same as the above

            if (template) {  // The user told us of a template to use. We copy it.
                var temp = document.createElement('DIV');
                temp.innerHTML = Common.elOrSelector(template, 'options.template').outerHTML;
                tooltip = temp.firstChild;
                
                if (templatefield) {
                    field = Selector.select(templatefield, tooltip);
                    if (field) {
                        field = field[0];
                    } else {
                        throw 'options.templatefield must be a valid selector within options.template';
                    }
                } else {
                    field = tooltip;  // Assume same element if user did not specify a field
                }
            } else {  // We create the default structure
                tooltip = document.createElement('DIV');
                Css.addClassName(tooltip, 'ink-tooltip');
                Css.addClassName(tooltip, this._getOpt('color'));

                field = document.createElement('DIV');
                Css.addClassName(field, 'content');

                tooltip.appendChild(field);
            }
            
            if (this._getOpt('html')) {
                field.innerHTML = this._getOpt('html');
            } else if (this._getOpt('text')) {
                InkElement.setTextContent(field, this._getOpt('text'));
            } else {
                InkElement.setTextContent(field, this.element.getAttribute('title'));
            }
            tooltip.style.display = 'block';
            tooltip.style.position = 'absolute';
            tooltip.style.zIndex = this._getIntOpt('zIndex');

            return tooltip;
        },
        _fadeInTooltipElement: function (tooltip) {
            var fadeTime = this._getFloatOpt('fade');
            if (transitionDurationName && fadeTime) {
                tooltip.style.opacity = '0';
                tooltip.style[transitionDurationName] = fadeTime + 's';
                tooltip.style[transitionPropertyName] = 'opacity';
                tooltip.style[transitionTimingFunctionName] = 'ease-in-out';
                setTimeout(function () {
                    tooltip.style.opacity = '1';
                }, 0); // Wait a tick
            }
        },
        _placeTooltipElement: function (tooltip, mousePosition) {
            var where = this._getOpt('where');

            if (where === 'mousemove' || where === 'mousefix') {
                var mPos = mousePosition;
                this._setPos(mPos[0], mPos[1]);
                body.appendChild(tooltip);
            } else if (where.match(/(up|down|left|right)/)) {
                body.appendChild(tooltip);
                var targetElementPos = InkElement.offset(this.element);
                var tleft = targetElementPos[0],
                    ttop = targetElementPos[1];

                var centerh = (InkElement.elementWidth(this.element) / 2) - (InkElement.elementWidth(tooltip) / 2),
                    centerv = (InkElement.elementHeight(this.element) / 2) - (InkElement.elementHeight(tooltip) / 2);
                var spacing = this._getIntOpt('spacing');

                var tooltipDims = InkElement.elementDimensions(tooltip);
                var elementDims = InkElement.elementDimensions(this.element);

                var maxX = InkElement.scrollWidth() + InkElement.viewportWidth();
                var maxY = InkElement.scrollHeight() + InkElement.viewportHeight();
                
                where = this._getWhereValueInsideViewport(where, {
                    left: tleft - tooltipDims[0],
                    right: tleft + tooltipDims[0],
                    top: ttop + tooltipDims[1],
                    bottom: ttop + tooltipDims[1]
                }, {
                    right: maxX,
                    bottom: maxY
                });
                
                if (where === 'up') {
                    ttop -= tooltipDims[1];
                    ttop -= spacing;
                    tleft += centerh;
                } else if (where === 'down') {
                    ttop += elementDims[1];
                    ttop += spacing;
                    tleft += centerh;
                } else if (where === 'left') {
                    tleft -= tooltipDims[0];
                    tleft -= spacing;
                    ttop += centerv;
                } else if (where === 'right') {
                    tleft += elementDims[0];
                    tleft += spacing;
                    ttop += centerv;
                }
                
                var arrow = null;
                if (where.match(/(up|down|left|right)/)) {
                    arrow = document.createElement('SPAN');
                    Css.addClassName(arrow, 'arrow');
                    Css.addClassName(arrow, this._oppositeDirections[where]);
                    tooltip.appendChild(arrow);
                }

                var tooltipLeft = tleft;
                var tooltipTop = ttop;

                var toBottom = (tooltipTop + tooltipDims[1]) - maxY;
                var toRight = (tooltipLeft + tooltipDims[0]) - maxX;
                var toLeft = 0 - tooltipLeft;
                var toTop = 0 - tooltipTop;

                if (toBottom > 0) {
                    if (arrow) { arrow.style.top = (tooltipDims[1] / 2) + toBottom + 'px'; }
                    tooltipTop -= toBottom;
                } else if (toTop > 0) {
                    if (arrow) { arrow.style.top = (tooltipDims[1] / 2) - toTop + 'px'; }
                    tooltipTop += toTop;
                } else if (toRight > 0) {
                    if (arrow) { arrow.style.left = (tooltipDims[0] / 2) + toRight + 'px'; }
                    tooltipLeft -= toRight;
                } else if (toLeft > 0) {
                    if (arrow) { arrow.style.left = (tooltipDims[0] / 2) - toLeft + 'px'; }
                    tooltipLeft += toLeft;
                }

                tooltip.style.left = tooltipLeft + 'px';
                tooltip.style.top = tooltipTop + 'px';
            }
        },

        /**
         * Get a value for "where" (left/right/up/down) which doesn't put the
         * tooltip off the screen
         *
         * @method _getWhereValueInsideViewport
         * @param where {String} "where" value which was given by the user and we might change
         * @param bbox {BoundingBox} A bounding box like what you get from getBoundingClientRect ({top, bottom, left, right}) with pixel positions from the top left corner of the viewport.
         * @param viewport {BoundingBox} Bounding box for the viewport. "top" and "left" are omitted because these coordinates are relative to the top-left corner of the viewport so they are zero.
         *
         * @TODO: we can't use getBoundingClientRect in this case because it returns {0,0,0,0} on our uncreated tooltip.
         */
        _getWhereValueInsideViewport: function (where, bbox, viewport) {
            if (where === 'left' && bbox.left < 0) {
                return 'right';
            } else if (where === 'right' && bbox.right > viewport.right) {
                return 'left';
            } else if (where === 'up' && bbox.top < 0) {
                return 'down';
            } else if (where === 'down' && bbox.bottom > viewport.bottom) {
                return 'up';
            }

            return where;
        },
        _removeTooltip: function() {
            var tooltip = this.tooltip;
            if (!tooltip) {return;}

            var remove = Ink.bind(InkElement.remove, {}, tooltip);

            if (this._getOpt('where') !== 'mousemove' && transitionDurationName) {
                tooltip.style.opacity = 0;
                // remove() will operate on correct tooltip, although this.tooltip === null then
                setTimeout(remove, this._getFloatOpt('fade') * 1000);
            } else {
                remove();
            }
            this.tooltip = null;
        },
        _getOpt: function (option) {
            var dataAttrVal = InkElement.data(this.element)[InkElement._camelCase('tip-' + option)];
            if (dataAttrVal /* either null or "" may signify the absense of this attribute*/) {
                return dataAttrVal;
            }
            var instanceOption = this.root.options[option];
            if (typeof instanceOption !== 'undefined') {
                return instanceOption;
            }
        },
        _getIntOpt: function (option) {
            return parseInt(this._getOpt(option), 10);
        },
        _getFloatOpt: function (option) {
            return parseFloat(this._getOpt(option), 10);
        },
        _destroy: function () {
            if (this.tooltip) {
                InkElement.remove(this.tooltip);
            }
            this.root = null;  // Cyclic reference = memory leaks
            this.element = null;
            this.tooltip = null;
        },
        _onMouseOver: function(e) {
            // on IE < 10 you can't access the mouse event not even a tick after it fired
            var mousePosition = this._getMousePosition(e);
            var delay = this._getFloatOpt('delay');
            if (delay) {
                this._delayTimeout = setTimeout(Ink.bind(function () {
                    if (!this.tooltip) {
                        this._makeTooltip(mousePosition);
                    }
                    this._delayTimeout = null;
                }, this), delay * 1000);
            } else {
                this._makeTooltip(mousePosition);
            }
        },
        _onMouseMove: function(e) {
            if (this._getOpt('where') === 'mousemove' && this.tooltip) {
                var mPos = this._getMousePosition(e);
                this._setPos(mPos[0], mPos[1]);
            }
        },
        _onMouseOut: function () {
            if (!this._getIntOpt('forever')) {
                this._removeTooltip();
            }
            if (this._delayTimeout) {
                clearTimeout(this._delayTimeout);
                this._delayTimeout = null;
            }
        },
        _onTooltipMouseOver: function () {
            if (this.tooltip) {  // If tooltip is already being removed, this has no effect
                this._removeTooltip();
            }
        },
        _setPos: function(left, top) {
            left += this._getIntOpt('left');
            top += this._getIntOpt('top');
            var pageDims = this._getPageXY();
            if (this.tooltip) {
                var elmDims = [InkElement.elementWidth(this.tooltip), InkElement.elementHeight(this.tooltip)];
                var scrollDim = this._getScroll();

                if((elmDims[0] + left - scrollDim[0]) >= (pageDims[0] - 20)) {
                    left = (left - elmDims[0] - this._getIntOpt('left') - 10);
                }
                if((elmDims[1] + top - scrollDim[1]) >= (pageDims[1] - 20)) {
                    top = (top - elmDims[1] - this._getIntOpt('top') - 10);
                }

                this.tooltip.style.left = left + 'px';
                this.tooltip.style.top = top + 'px';
            }
        },
        _getPageXY: function() {
            var cWidth = 0;
            var cHeight = 0;
            if( typeof( window.innerWidth ) === 'number' ) {
                cWidth = window.innerWidth;
                cHeight = window.innerHeight;
            } else if( document.documentElement && ( document.documentElement.clientWidth || document.documentElement.clientHeight ) ) {
                cWidth = document.documentElement.clientWidth;
                cHeight = document.documentElement.clientHeight;
            } else if( document.body && ( document.body.clientWidth || document.body.clientHeight ) ) {
                cWidth = document.body.clientWidth;
                cHeight = document.body.clientHeight;
            }
            return [parseInt(cWidth, 10), parseInt(cHeight, 10)];
        },
        _getScroll: function() {
            var dd = document.documentElement, db = document.body;
            if (dd && (dd.scrollLeft || dd.scrollTop)) {
                return [dd.scrollLeft, dd.scrollTop];
            } else if (db) {
                return [db.scrollLeft, db.scrollTop];
            } else {
                return [0, 0];
            }
        },
        _getMousePosition: function(e) {
            return [parseInt(InkEvent.pointerX(e), 10), parseInt(InkEvent.pointerY(e), 10)];
        }
    };

    return Tooltip;
});
