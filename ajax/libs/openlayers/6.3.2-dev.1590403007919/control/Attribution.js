var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
/**
 * @module ol/control/Attribution
 */
import Control from './Control.js';
import EventType from '../events/EventType.js';
import { CLASS_COLLAPSED, CLASS_CONTROL, CLASS_UNSELECTABLE } from '../css.js';
import { equals } from '../array.js';
import { inView } from '../layer/Layer.js';
import { removeChildren, replaceNode } from '../dom.js';
/**
 * @typedef {Object} Options
 * @property {string} [className='ol-attribution'] CSS class name.
 * @property {HTMLElement|string} [target] Specify a target if you
 * want the control to be rendered outside of the map's
 * viewport.
 * @property {boolean} [collapsible] Specify if attributions can
 * be collapsed. If not specified, sources control this behavior with their
 * `attributionsCollapsible` setting.
 * @property {boolean} [collapsed=true] Specify if attributions should
 * be collapsed at startup.
 * @property {string} [tipLabel='Attributions'] Text label to use for the button tip.
 * @property {string} [label='i'] Text label to use for the
 * collapsed attributions button.
 * Instead of text, also an element (e.g. a `span` element) can be used.
 * @property {string|HTMLElement} [collapseLabel='»'] Text label to use
 * for the expanded attributions button.
 * Instead of text, also an element (e.g. a `span` element) can be used.
 * @property {function(import("../MapEvent.js").default):void} [render] Function called when
 * the control should be re-rendered. This is called in a `requestAnimationFrame`
 * callback.
 */
/**
 * @classdesc
 * Control to show all the attributions associated with the layer sources
 * in the map. This control is one of the default controls included in maps.
 * By default it will show in the bottom right portion of the map, but this can
 * be changed by using a css selector for `.ol-attribution`.
 *
 * @api
 */
var Attribution = /** @class */ (function (_super) {
    __extends(Attribution, _super);
    /**
     * @param {Options=} opt_options Attribution options.
     */
    function Attribution(opt_options) {
        var _this = this;
        var options = opt_options ? opt_options : {};
        _this = _super.call(this, {
            element: document.createElement('div'),
            render: options.render,
            target: options.target,
        }) || this;
        /**
         * @private
         * @type {HTMLElement}
         */
        _this.ulElement_ = document.createElement('ul');
        /**
         * @private
         * @type {boolean}
         */
        _this.collapsed_ =
            options.collapsed !== undefined ? options.collapsed : true;
        /**
         * @private
         * @type {boolean}
         */
        _this.overrideCollapsible_ = options.collapsible !== undefined;
        /**
         * @private
         * @type {boolean}
         */
        _this.collapsible_ =
            options.collapsible !== undefined ? options.collapsible : true;
        if (!_this.collapsible_) {
            _this.collapsed_ = false;
        }
        var className = options.className !== undefined ? options.className : 'ol-attribution';
        var tipLabel = options.tipLabel !== undefined ? options.tipLabel : 'Attributions';
        var collapseLabel = options.collapseLabel !== undefined ? options.collapseLabel : '\u00BB';
        if (typeof collapseLabel === 'string') {
            /**
             * @private
             * @type {HTMLElement}
             */
            _this.collapseLabel_ = document.createElement('span');
            _this.collapseLabel_.textContent = collapseLabel;
        }
        else {
            _this.collapseLabel_ = collapseLabel;
        }
        var label = options.label !== undefined ? options.label : 'i';
        if (typeof label === 'string') {
            /**
             * @private
             * @type {HTMLElement}
             */
            _this.label_ = document.createElement('span');
            _this.label_.textContent = label;
        }
        else {
            _this.label_ = label;
        }
        var activeLabel = _this.collapsible_ && !_this.collapsed_ ? _this.collapseLabel_ : _this.label_;
        var button = document.createElement('button');
        button.setAttribute('type', 'button');
        button.title = tipLabel;
        button.appendChild(activeLabel);
        button.addEventListener(EventType.CLICK, _this.handleClick_.bind(_this), false);
        var cssClasses = className +
            ' ' +
            CLASS_UNSELECTABLE +
            ' ' +
            CLASS_CONTROL +
            (_this.collapsed_ && _this.collapsible_ ? ' ' + CLASS_COLLAPSED : '') +
            (_this.collapsible_ ? '' : ' ol-uncollapsible');
        var element = _this.element;
        element.className = cssClasses;
        element.appendChild(_this.ulElement_);
        element.appendChild(button);
        /**
         * A list of currently rendered resolutions.
         * @type {Array<string>}
         * @private
         */
        _this.renderedAttributions_ = [];
        /**
         * @private
         * @type {boolean}
         */
        _this.renderedVisible_ = true;
        return _this;
    }
    /**
     * Collect a list of visible attributions and set the collapsible state.
     * @param {import("../PluggableMap.js").FrameState} frameState Frame state.
     * @return {Array<string>} Attributions.
     * @private
     */
    Attribution.prototype.collectSourceAttributions_ = function (frameState) {
        /**
         * Used to determine if an attribution already exists.
         * @type {!Object<string, boolean>}
         */
        var lookup = {};
        /**
         * A list of visible attributions.
         * @type {Array<string>}
         */
        var visibleAttributions = [];
        var layerStatesArray = frameState.layerStatesArray;
        for (var i = 0, ii = layerStatesArray.length; i < ii; ++i) {
            var layerState = layerStatesArray[i];
            if (!inView(layerState, frameState.viewState)) {
                continue;
            }
            var source = /** @type {import("../layer/Layer.js").default} */ (layerState.layer).getSource();
            if (!source) {
                continue;
            }
            var attributionGetter = source.getAttributions();
            if (!attributionGetter) {
                continue;
            }
            var attributions = attributionGetter(frameState);
            if (!attributions) {
                continue;
            }
            if (!this.overrideCollapsible_ &&
                source.getAttributionsCollapsible() === false) {
                this.setCollapsible(false);
            }
            if (Array.isArray(attributions)) {
                for (var j = 0, jj = attributions.length; j < jj; ++j) {
                    if (!(attributions[j] in lookup)) {
                        visibleAttributions.push(attributions[j]);
                        lookup[attributions[j]] = true;
                    }
                }
            }
            else {
                if (!(attributions in lookup)) {
                    visibleAttributions.push(attributions);
                    lookup[attributions] = true;
                }
            }
        }
        return visibleAttributions;
    };
    /**
     * @private
     * @param {?import("../PluggableMap.js").FrameState} frameState Frame state.
     */
    Attribution.prototype.updateElement_ = function (frameState) {
        if (!frameState) {
            if (this.renderedVisible_) {
                this.element.style.display = 'none';
                this.renderedVisible_ = false;
            }
            return;
        }
        var attributions = this.collectSourceAttributions_(frameState);
        var visible = attributions.length > 0;
        if (this.renderedVisible_ != visible) {
            this.element.style.display = visible ? '' : 'none';
            this.renderedVisible_ = visible;
        }
        if (equals(attributions, this.renderedAttributions_)) {
            return;
        }
        removeChildren(this.ulElement_);
        // append the attributions
        for (var i = 0, ii = attributions.length; i < ii; ++i) {
            var element = document.createElement('li');
            element.innerHTML = attributions[i];
            this.ulElement_.appendChild(element);
        }
        this.renderedAttributions_ = attributions;
    };
    /**
     * @param {MouseEvent} event The event to handle
     * @private
     */
    Attribution.prototype.handleClick_ = function (event) {
        event.preventDefault();
        this.handleToggle_();
    };
    /**
     * @private
     */
    Attribution.prototype.handleToggle_ = function () {
        this.element.classList.toggle(CLASS_COLLAPSED);
        if (this.collapsed_) {
            replaceNode(this.collapseLabel_, this.label_);
        }
        else {
            replaceNode(this.label_, this.collapseLabel_);
        }
        this.collapsed_ = !this.collapsed_;
    };
    /**
     * Return `true` if the attribution is collapsible, `false` otherwise.
     * @return {boolean} True if the widget is collapsible.
     * @api
     */
    Attribution.prototype.getCollapsible = function () {
        return this.collapsible_;
    };
    /**
     * Set whether the attribution should be collapsible.
     * @param {boolean} collapsible True if the widget is collapsible.
     * @api
     */
    Attribution.prototype.setCollapsible = function (collapsible) {
        if (this.collapsible_ === collapsible) {
            return;
        }
        this.collapsible_ = collapsible;
        this.element.classList.toggle('ol-uncollapsible');
        if (!collapsible && this.collapsed_) {
            this.handleToggle_();
        }
    };
    /**
     * Collapse or expand the attribution according to the passed parameter. Will
     * not do anything if the attribution isn't collapsible or if the current
     * collapsed state is already the one requested.
     * @param {boolean} collapsed True if the widget is collapsed.
     * @api
     */
    Attribution.prototype.setCollapsed = function (collapsed) {
        if (!this.collapsible_ || this.collapsed_ === collapsed) {
            return;
        }
        this.handleToggle_();
    };
    /**
     * Return `true` when the attribution is currently collapsed or `false`
     * otherwise.
     * @return {boolean} True if the widget is collapsed.
     * @api
     */
    Attribution.prototype.getCollapsed = function () {
        return this.collapsed_;
    };
    /**
     * Update the attribution element.
     * @param {import("../MapEvent.js").default} mapEvent Map event.
     * @override
     */
    Attribution.prototype.render = function (mapEvent) {
        this.updateElement_(mapEvent.frameState);
    };
    return Attribution;
}(Control));
export default Attribution;
//# sourceMappingURL=Attribution.js.map