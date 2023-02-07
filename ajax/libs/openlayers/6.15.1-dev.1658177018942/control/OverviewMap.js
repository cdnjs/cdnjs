var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
/**
 * @module ol/control/OverviewMap
 */
import CompositeMapRenderer from '../renderer/Composite.js';
import Control from './Control.js';
import EventType from '../events/EventType.js';
import MapEventType from '../MapEventType.js';
import MapProperty from '../MapProperty.js';
import ObjectEventType from '../ObjectEventType.js';
import Overlay from '../Overlay.js';
import PluggableMap from '../PluggableMap.js';
import View from '../View.js';
import ViewProperty from '../ViewProperty.js';
import { CLASS_COLLAPSED, CLASS_CONTROL, CLASS_UNSELECTABLE } from '../css.js';
import { containsExtent, equals as equalsExtent, getBottomRight, getTopLeft, scaleFromCenter, } from '../extent.js';
import { listen, listenOnce } from '../events.js';
import { fromExtent as polygonFromExtent } from '../geom/Polygon.js';
import { replaceNode } from '../dom.js';
/**
 * Maximum width and/or height extent ratio that determines when the overview
 * map should be zoomed out.
 * @type {number}
 */
var MAX_RATIO = 0.75;
/**
 * Minimum width and/or height extent ratio that determines when the overview
 * map should be zoomed in.
 * @type {number}
 */
var MIN_RATIO = 0.1;
var ControlledMap = /** @class */ (function (_super) {
    __extends(ControlledMap, _super);
    function ControlledMap() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ControlledMap.prototype.createRenderer = function () {
        return new CompositeMapRenderer(this);
    };
    return ControlledMap;
}(PluggableMap));
/**
 * @typedef {Object} Options
 * @property {string} [className='ol-overviewmap'] CSS class name.
 * @property {boolean} [collapsed=true] Whether the control should start collapsed or not (expanded).
 * @property {string|HTMLElement} [collapseLabel='‹'] Text label to use for the
 * expanded overviewmap button. Instead of text, also an element (e.g. a `span` element) can be used.
 * @property {boolean} [collapsible=true] Whether the control can be collapsed or not.
 * @property {string|HTMLElement} [label='›'] Text label to use for the collapsed
 * overviewmap button. Instead of text, also an element (e.g. a `span` element) can be used.
 * @property {Array<import("../layer/Base.js").default>|import("../Collection.js").default<import("../layer/Base.js").default>} [layers]
 * Layers for the overview map.
 * @property {function(import("../MapEvent.js").default):void} [render] Function called when the control
 * should be re-rendered. This is called in a `requestAnimationFrame` callback.
 * @property {boolean} [rotateWithView=false] Whether the control view should rotate with the main map view.
 * @property {HTMLElement|string} [target] Specify a target if you want the control
 * to be rendered outside of the map's viewport.
 * @property {string} [tipLabel='Overview map'] Text label to use for the button tip.
 * @property {View} [view] Custom view for the overview map (should use same projection as main map). If not provided,
 * a default view with the same projection as the main map will be used.
 */
/**
 * Create a new control with a map acting as an overview map for another
 * defined map.
 *
 * @api
 */
var OverviewMap = /** @class */ (function (_super) {
    __extends(OverviewMap, _super);
    /**
     * @param {Options} [opt_options] OverviewMap options.
     */
    function OverviewMap(opt_options) {
        var _this = this;
        var options = opt_options ? opt_options : {};
        _this = _super.call(this, {
            element: document.createElement('div'),
            render: options.render,
            target: options.target,
        }) || this;
        /**
         * @private
         */
        _this.boundHandleRotationChanged_ = _this.handleRotationChanged_.bind(_this);
        /**
         * @type {boolean}
         * @private
         */
        _this.collapsed_ =
            options.collapsed !== undefined ? options.collapsed : true;
        /**
         * @private
         * @type {boolean}
         */
        _this.collapsible_ =
            options.collapsible !== undefined ? options.collapsible : true;
        if (!_this.collapsible_) {
            _this.collapsed_ = false;
        }
        /**
         * @private
         * @type {boolean}
         */
        _this.rotateWithView_ =
            options.rotateWithView !== undefined ? options.rotateWithView : false;
        /**
         * @private
         * @type {import("../extent.js").Extent|undefined}
         */
        _this.viewExtent_ = undefined;
        var className = options.className !== undefined ? options.className : 'ol-overviewmap';
        var tipLabel = options.tipLabel !== undefined ? options.tipLabel : 'Overview map';
        var collapseLabel = options.collapseLabel !== undefined ? options.collapseLabel : '\u2039';
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
        var label = options.label !== undefined ? options.label : '\u203A';
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
        /**
         * @type {HTMLElement}
         * @private
         */
        _this.ovmapDiv_ = document.createElement('div');
        _this.ovmapDiv_.className = 'ol-overviewmap-map';
        /**
         * Explicitly given view to be used instead of a view derived from the main map.
         * @type {View}
         * @private
         */
        _this.view_ = options.view;
        /**
         * @type {ControlledMap}
         * @private
         */
        _this.ovmap_ = new ControlledMap({
            view: options.view,
        });
        var ovmap = _this.ovmap_;
        if (options.layers) {
            options.layers.forEach(function (layer) {
                ovmap.addLayer(layer);
            });
        }
        var box = document.createElement('div');
        box.className = 'ol-overviewmap-box';
        box.style.boxSizing = 'border-box';
        /**
         * @type {import("../Overlay.js").default}
         * @private
         */
        _this.boxOverlay_ = new Overlay({
            position: [0, 0],
            positioning: 'center-center',
            element: box,
        });
        _this.ovmap_.addOverlay(_this.boxOverlay_);
        var cssClasses = className +
            ' ' +
            CLASS_UNSELECTABLE +
            ' ' +
            CLASS_CONTROL +
            (_this.collapsed_ && _this.collapsible_ ? ' ' + CLASS_COLLAPSED : '') +
            (_this.collapsible_ ? '' : ' ol-uncollapsible');
        var element = _this.element;
        element.className = cssClasses;
        element.appendChild(_this.ovmapDiv_);
        element.appendChild(button);
        /* Interactive map */
        var scope = _this;
        var overlay = _this.boxOverlay_;
        var overlayBox = _this.boxOverlay_.getElement();
        /* Functions definition */
        var computeDesiredMousePosition = function (mousePosition) {
            return {
                clientX: mousePosition.clientX,
                clientY: mousePosition.clientY,
            };
        };
        var move = function (event) {
            var position = /** @type {?} */ (computeDesiredMousePosition(event));
            var coordinates = ovmap.getEventCoordinateInternal(
            /** @type {MouseEvent} */ (position));
            overlay.setPosition(coordinates);
        };
        var endMoving = function (event) {
            var coordinates = ovmap.getEventCoordinateInternal(event);
            scope.getMap().getView().setCenterInternal(coordinates);
            window.removeEventListener('mousemove', move);
            window.removeEventListener('mouseup', endMoving);
        };
        /* Binding */
        overlayBox.addEventListener('mousedown', function () {
            window.addEventListener('mousemove', move);
            window.addEventListener('mouseup', endMoving);
        });
        return _this;
    }
    /**
     * Remove the control from its current map and attach it to the new map.
     * Pass `null` to just remove the control from the current map.
     * Subclasses may set up event handlers to get notified about changes to
     * the map here.
     * @param {import("../PluggableMap.js").default|null} map Map.
     * @api
     */
    OverviewMap.prototype.setMap = function (map) {
        var oldMap = this.getMap();
        if (map === oldMap) {
            return;
        }
        if (oldMap) {
            var oldView = oldMap.getView();
            if (oldView) {
                this.unbindView_(oldView);
            }
            this.ovmap_.setTarget(null);
        }
        _super.prototype.setMap.call(this, map);
        if (map) {
            this.ovmap_.setTarget(this.ovmapDiv_);
            this.listenerKeys.push(listen(map, ObjectEventType.PROPERTYCHANGE, this.handleMapPropertyChange_, this));
            var view = map.getView();
            if (view) {
                this.bindView_(view);
                if (view.isDef()) {
                    this.ovmap_.updateSize();
                    this.resetExtent_();
                }
            }
            if (!this.ovmap_.isRendered()) {
                this.updateBoxAfterOvmapIsRendered_();
            }
        }
    };
    /**
     * Handle map property changes.  This only deals with changes to the map's view.
     * @param {import("../Object.js").ObjectEvent} event The propertychange event.
     * @private
     */
    OverviewMap.prototype.handleMapPropertyChange_ = function (event) {
        if (event.key === MapProperty.VIEW) {
            var oldView = /** @type {import("../View.js").default} */ (event.oldValue);
            if (oldView) {
                this.unbindView_(oldView);
            }
            var newView = this.getMap().getView();
            this.bindView_(newView);
        }
        else if (!this.ovmap_.isRendered() &&
            (event.key === MapProperty.TARGET || event.key === MapProperty.SIZE)) {
            this.ovmap_.updateSize();
        }
    };
    /**
     * Register listeners for view property changes.
     * @param {import("../View.js").default} view The view.
     * @private
     */
    OverviewMap.prototype.bindView_ = function (view) {
        if (!this.view_) {
            // Unless an explicit view definition was given, derive default from whatever main map uses.
            var newView = new View({
                projection: view.getProjection(),
            });
            this.ovmap_.setView(newView);
        }
        view.addChangeListener(ViewProperty.ROTATION, this.boundHandleRotationChanged_);
        // Sync once with the new view
        this.handleRotationChanged_();
    };
    /**
     * Unregister listeners for view property changes.
     * @param {import("../View.js").default} view The view.
     * @private
     */
    OverviewMap.prototype.unbindView_ = function (view) {
        view.removeChangeListener(ViewProperty.ROTATION, this.boundHandleRotationChanged_);
    };
    /**
     * Handle rotation changes to the main map.
     * @private
     */
    OverviewMap.prototype.handleRotationChanged_ = function () {
        if (this.rotateWithView_) {
            this.ovmap_.getView().setRotation(this.getMap().getView().getRotation());
        }
    };
    /**
     * Reset the overview map extent if the box size (width or
     * height) is less than the size of the overview map size times minRatio
     * or is greater than the size of the overview size times maxRatio.
     *
     * If the map extent was not reset, the box size can fits in the defined
     * ratio sizes. This method then checks if is contained inside the overview
     * map current extent. If not, recenter the overview map to the current
     * main map center location.
     * @private
     */
    OverviewMap.prototype.validateExtent_ = function () {
        var map = this.getMap();
        var ovmap = this.ovmap_;
        if (!map.isRendered() || !ovmap.isRendered()) {
            return;
        }
        var mapSize = /** @type {import("../size.js").Size} */ (map.getSize());
        var view = map.getView();
        var extent = view.calculateExtentInternal(mapSize);
        if (this.viewExtent_ && equalsExtent(extent, this.viewExtent_)) {
            // repeats of the same extent may indicate constraint conflicts leading to an endless cycle
            return;
        }
        this.viewExtent_ = extent;
        var ovmapSize = /** @type {import("../size.js").Size} */ (ovmap.getSize());
        var ovview = ovmap.getView();
        var ovextent = ovview.calculateExtentInternal(ovmapSize);
        var topLeftPixel = ovmap.getPixelFromCoordinateInternal(getTopLeft(extent));
        var bottomRightPixel = ovmap.getPixelFromCoordinateInternal(getBottomRight(extent));
        var boxWidth = Math.abs(topLeftPixel[0] - bottomRightPixel[0]);
        var boxHeight = Math.abs(topLeftPixel[1] - bottomRightPixel[1]);
        var ovmapWidth = ovmapSize[0];
        var ovmapHeight = ovmapSize[1];
        if (boxWidth < ovmapWidth * MIN_RATIO ||
            boxHeight < ovmapHeight * MIN_RATIO ||
            boxWidth > ovmapWidth * MAX_RATIO ||
            boxHeight > ovmapHeight * MAX_RATIO) {
            this.resetExtent_();
        }
        else if (!containsExtent(ovextent, extent)) {
            this.recenter_();
        }
    };
    /**
     * Reset the overview map extent to half calculated min and max ratio times
     * the extent of the main map.
     * @private
     */
    OverviewMap.prototype.resetExtent_ = function () {
        if (MAX_RATIO === 0 || MIN_RATIO === 0) {
            return;
        }
        var map = this.getMap();
        var ovmap = this.ovmap_;
        var mapSize = /** @type {import("../size.js").Size} */ (map.getSize());
        var view = map.getView();
        var extent = view.calculateExtentInternal(mapSize);
        var ovview = ovmap.getView();
        // get how many times the current map overview could hold different
        // box sizes using the min and max ratio, pick the step in the middle used
        // to calculate the extent from the main map to set it to the overview map,
        var steps = Math.log(MAX_RATIO / MIN_RATIO) / Math.LN2;
        var ratio = 1 / (Math.pow(2, steps / 2) * MIN_RATIO);
        scaleFromCenter(extent, ratio);
        ovview.fitInternal(polygonFromExtent(extent));
    };
    /**
     * Set the center of the overview map to the map center without changing its
     * resolution.
     * @private
     */
    OverviewMap.prototype.recenter_ = function () {
        var map = this.getMap();
        var ovmap = this.ovmap_;
        var view = map.getView();
        var ovview = ovmap.getView();
        ovview.setCenterInternal(view.getCenterInternal());
    };
    /**
     * Update the box using the main map extent
     * @private
     */
    OverviewMap.prototype.updateBox_ = function () {
        var map = this.getMap();
        var ovmap = this.ovmap_;
        if (!map.isRendered() || !ovmap.isRendered()) {
            return;
        }
        var mapSize = /** @type {import("../size.js").Size} */ (map.getSize());
        var view = map.getView();
        var ovview = ovmap.getView();
        var rotation = this.rotateWithView_ ? 0 : -view.getRotation();
        var overlay = this.boxOverlay_;
        var box = this.boxOverlay_.getElement();
        var center = view.getCenterInternal();
        var resolution = view.getResolution();
        var ovresolution = ovview.getResolution();
        var width = (mapSize[0] * resolution) / ovresolution;
        var height = (mapSize[1] * resolution) / ovresolution;
        // set position using center coordinates
        overlay.setPosition(center);
        // set box size calculated from map extent size and overview map resolution
        if (box) {
            box.style.width = width + 'px';
            box.style.height = height + 'px';
            var transform = 'rotate(' + rotation + 'rad)';
            box.style.transform = transform;
        }
    };
    /**
     * @private
     */
    OverviewMap.prototype.updateBoxAfterOvmapIsRendered_ = function () {
        if (this.ovmapPostrenderKey_) {
            return;
        }
        this.ovmapPostrenderKey_ = listenOnce(this.ovmap_, MapEventType.POSTRENDER, function (event) {
            delete this.ovmapPostrenderKey_;
            this.updateBox_();
        }, this);
    };
    /**
     * @param {MouseEvent} event The event to handle
     * @private
     */
    OverviewMap.prototype.handleClick_ = function (event) {
        event.preventDefault();
        this.handleToggle_();
    };
    /**
     * @private
     */
    OverviewMap.prototype.handleToggle_ = function () {
        this.element.classList.toggle(CLASS_COLLAPSED);
        if (this.collapsed_) {
            replaceNode(this.collapseLabel_, this.label_);
        }
        else {
            replaceNode(this.label_, this.collapseLabel_);
        }
        this.collapsed_ = !this.collapsed_;
        // manage overview map if it had not been rendered before and control
        // is expanded
        var ovmap = this.ovmap_;
        if (!this.collapsed_) {
            if (ovmap.isRendered()) {
                this.viewExtent_ = undefined;
                ovmap.render();
                return;
            }
            ovmap.updateSize();
            this.resetExtent_();
            this.updateBoxAfterOvmapIsRendered_();
        }
    };
    /**
     * Return `true` if the overview map is collapsible, `false` otherwise.
     * @return {boolean} True if the widget is collapsible.
     * @api
     */
    OverviewMap.prototype.getCollapsible = function () {
        return this.collapsible_;
    };
    /**
     * Set whether the overview map should be collapsible.
     * @param {boolean} collapsible True if the widget is collapsible.
     * @api
     */
    OverviewMap.prototype.setCollapsible = function (collapsible) {
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
     * Collapse or expand the overview map according to the passed parameter. Will
     * not do anything if the overview map isn't collapsible or if the current
     * collapsed state is already the one requested.
     * @param {boolean} collapsed True if the widget is collapsed.
     * @api
     */
    OverviewMap.prototype.setCollapsed = function (collapsed) {
        if (!this.collapsible_ || this.collapsed_ === collapsed) {
            return;
        }
        this.handleToggle_();
    };
    /**
     * Determine if the overview map is collapsed.
     * @return {boolean} The overview map is collapsed.
     * @api
     */
    OverviewMap.prototype.getCollapsed = function () {
        return this.collapsed_;
    };
    /**
     * Return `true` if the overview map view can rotate, `false` otherwise.
     * @return {boolean} True if the control view can rotate.
     * @api
     */
    OverviewMap.prototype.getRotateWithView = function () {
        return this.rotateWithView_;
    };
    /**
     * Set whether the overview map view should rotate with the main map view.
     * @param {boolean} rotateWithView True if the control view should rotate.
     * @api
     */
    OverviewMap.prototype.setRotateWithView = function (rotateWithView) {
        if (this.rotateWithView_ === rotateWithView) {
            return;
        }
        this.rotateWithView_ = rotateWithView;
        if (this.getMap().getView().getRotation() !== 0) {
            if (this.rotateWithView_) {
                this.handleRotationChanged_();
            }
            else {
                this.ovmap_.getView().setRotation(0);
            }
            this.viewExtent_ = undefined;
            this.validateExtent_();
            this.updateBox_();
        }
    };
    /**
     * Return the overview map.
     * @return {import("../PluggableMap.js").default} Overview map.
     * @api
     */
    OverviewMap.prototype.getOverviewMap = function () {
        return this.ovmap_;
    };
    /**
     * Update the overview map element.
     * @param {import("../MapEvent.js").default} mapEvent Map event.
     * @override
     */
    OverviewMap.prototype.render = function (mapEvent) {
        this.validateExtent_();
        this.updateBox_();
    };
    return OverviewMap;
}(Control));
export default OverviewMap;
//# sourceMappingURL=OverviewMap.js.map