/**
 * @module ol/control/OverviewMap
 */
import Collection from '../Collection.js';
import Map from '../Map.js';
import MapEventType from '../MapEventType.js';
import MapProperty from '../MapProperty.js';
import {getChangeEventType} from '../Object.js';
import ObjectEventType from '../ObjectEventType.js';
import Overlay from '../Overlay.js';
import OverlayPositioning from '../OverlayPositioning.js';
import ViewProperty from '../ViewProperty.js';
import Control from './Control.js';
import {rotate as rotateCoordinate, add as addCoordinate} from '../coordinate.js';
import {CLASS_CONTROL, CLASS_UNSELECTABLE, CLASS_COLLAPSED} from '../css.js';
import {replaceNode} from '../dom.js';
import {listen, listenOnce, unlisten} from '../events.js';
import EventType from '../events/EventType.js';
import {containsExtent, getBottomLeft, getBottomRight, getTopLeft, getTopRight, scaleFromCenter} from '../extent.js';


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


/**
 * @typedef {Object} Options
 * @property {string} [className='ol-overviewmap'] CSS class name.
 * @property {boolean} [collapsed=true] Whether the control should start collapsed or not (expanded).
 * @property {string|HTMLElement} [collapseLabel='«'] Text label to use for the
 * expanded overviewmap button. Instead of text, also an element (e.g. a `span` element) can be used.
 * @property {boolean} [collapsible=true] Whether the control can be collapsed or not.
 * @property {string|HTMLElement} [label='»'] Text label to use for the collapsed
 * overviewmap button. Instead of text, also an element (e.g. a `span` element) can be used.
 * @property {Array<import("../layer/Layer.js").default>|import("../Collection.js").default<import("../layer/Layer.js").default>} [layers]
 * Layers for the overview map. If not set, then all main map layers are used
 * instead.
 * @property {function(import("../MapEvent.js").default)} [render] Function called when the control
 * should be re-rendered. This is called in a `requestAnimationFrame` callback.
 * @property {HTMLElement|string} [target] Specify a target if you want the control
 * to be rendered outside of the map's viewport.
 * @property {string} [tipLabel='Overview map'] Text label to use for the button tip.
 * @property {import("../View.js").default} [view] Custom view for the overview map. If not provided,
 * a default view with an EPSG:3857 projection will be used.
 */


/**
 * Create a new control with a map acting as an overview map for an other
 * defined map.
 *
 * @api
 */
var OverviewMap = /*@__PURE__*/(function (Control) {
  function OverviewMap(opt_options) {

    var options = opt_options ? opt_options : {};

    Control.call(this, {
      element: document.createElement('div'),
      render: options.render || render,
      target: options.target
    });

    /**
     * @type {boolean}
     * @private
     */
    this.collapsed_ = options.collapsed !== undefined ? options.collapsed : true;

    /**
     * @private
     * @type {boolean}
     */
    this.collapsible_ = options.collapsible !== undefined ?
      options.collapsible : true;

    if (!this.collapsible_) {
      this.collapsed_ = false;
    }

    var className = options.className !== undefined ? options.className : 'ol-overviewmap';

    var tipLabel = options.tipLabel !== undefined ? options.tipLabel : 'Overview map';

    var collapseLabel = options.collapseLabel !== undefined ? options.collapseLabel : '\u00AB';

    if (typeof collapseLabel === 'string') {
      /**
       * @private
       * @type {HTMLElement}
       */
      this.collapseLabel_ = document.createElement('span');
      this.collapseLabel_.textContent = collapseLabel;
    } else {
      this.collapseLabel_ = collapseLabel;
    }

    var label = options.label !== undefined ? options.label : '\u00BB';


    if (typeof label === 'string') {
      /**
       * @private
       * @type {HTMLElement}
       */
      this.label_ = document.createElement('span');
      this.label_.textContent = label;
    } else {
      this.label_ = label;
    }

    var activeLabel = (this.collapsible_ && !this.collapsed_) ?
      this.collapseLabel_ : this.label_;
    var button = document.createElement('button');
    button.setAttribute('type', 'button');
    button.title = tipLabel;
    button.appendChild(activeLabel);

    listen(button, EventType.CLICK,
      this.handleClick_, this);

    /**
     * @type {HTMLElement}
     * @private
     */
    this.ovmapDiv_ = document.createElement('div');
    this.ovmapDiv_.className = 'ol-overviewmap-map';

    /**
     * @type {import("../Map.js").default}
     * @private
     */
    this.ovmap_ = new Map({
      controls: new Collection(),
      interactions: new Collection(),
      view: options.view
    });
    var ovmap = this.ovmap_;

    if (options.layers) {
      /** @type {Array<import("../layer/Layer.js").default>} */ (options.layers).forEach(
        /**
         * @param {import("../layer/Layer.js").default} layer Layer.
         */
        (function(layer) {
          ovmap.addLayer(layer);
        }).bind(this));
    }

    var box = document.createElement('div');
    box.className = 'ol-overviewmap-box';
    box.style.boxSizing = 'border-box';

    /**
     * @type {import("../Overlay.js").default}
     * @private
     */
    this.boxOverlay_ = new Overlay({
      position: [0, 0],
      positioning: OverlayPositioning.BOTTOM_LEFT,
      element: box
    });
    this.ovmap_.addOverlay(this.boxOverlay_);

    var cssClasses = className + ' ' + CLASS_UNSELECTABLE + ' ' + CLASS_CONTROL +
        (this.collapsed_ && this.collapsible_ ? ' ' + CLASS_COLLAPSED : '') +
        (this.collapsible_ ? '' : ' ol-uncollapsible');
    var element = this.element;
    element.className = cssClasses;
    element.appendChild(this.ovmapDiv_);
    element.appendChild(button);

    /* Interactive map */

    var scope = this;

    var overlay = this.boxOverlay_;
    var overlayBox = this.boxOverlay_.getElement();

    /* Functions definition */

    var computeDesiredMousePosition = function(mousePosition) {
      return {
        clientX: mousePosition.clientX - (overlayBox.offsetWidth / 2),
        clientY: mousePosition.clientY + (overlayBox.offsetHeight / 2)
      };
    };

    var move = function(event) {
      var position = /** @type {?} */ (computeDesiredMousePosition(event));
      var coordinates = ovmap.getEventCoordinate(/** @type {Event} */ (position));

      overlay.setPosition(coordinates);
    };

    var endMoving = function(event) {
      var coordinates = ovmap.getEventCoordinate(event);

      scope.getMap().getView().setCenter(coordinates);

      window.removeEventListener('mousemove', move);
      window.removeEventListener('mouseup', endMoving);
    };

    /* Binding */

    overlayBox.addEventListener('mousedown', function() {
      window.addEventListener('mousemove', move);
      window.addEventListener('mouseup', endMoving);
    });
  }

  if ( Control ) OverviewMap.__proto__ = Control;
  OverviewMap.prototype = Object.create( Control && Control.prototype );
  OverviewMap.prototype.constructor = OverviewMap;

  /**
   * @inheritDoc
   * @api
   */
  OverviewMap.prototype.setMap = function setMap (map) {
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
    Control.prototype.setMap.call(this, map);

    if (map) {
      this.ovmap_.setTarget(this.ovmapDiv_);
      this.listenerKeys.push(listen(
        map, ObjectEventType.PROPERTYCHANGE,
        this.handleMapPropertyChange_, this));

      // TODO: to really support map switching, this would need to be reworked
      if (this.ovmap_.getLayers().getLength() === 0) {
        this.ovmap_.setLayerGroup(map.getLayerGroup());
      }

      var view = map.getView();
      if (view) {
        this.bindView_(view);
        if (view.isDef()) {
          this.ovmap_.updateSize();
          this.resetExtent_();
        }
      }
    }
  };

  /**
   * Handle map property changes.  This only deals with changes to the map's view.
   * @param {import("../Object.js").ObjectEvent} event The propertychange event.
   * @private
   */
  OverviewMap.prototype.handleMapPropertyChange_ = function handleMapPropertyChange_ (event) {
    if (event.key === MapProperty.VIEW) {
      var oldView = /** @type {import("../View.js").default} */ (event.oldValue);
      if (oldView) {
        this.unbindView_(oldView);
      }
      var newView = this.getMap().getView();
      this.bindView_(newView);
    }
  };

  /**
   * Register listeners for view property changes.
   * @param {import("../View.js").default} view The view.
   * @private
   */
  OverviewMap.prototype.bindView_ = function bindView_ (view) {
    listen(view,
      getChangeEventType(ViewProperty.ROTATION),
      this.handleRotationChanged_, this);
  };

  /**
   * Unregister listeners for view property changes.
   * @param {import("../View.js").default} view The view.
   * @private
   */
  OverviewMap.prototype.unbindView_ = function unbindView_ (view) {
    unlisten(view,
      getChangeEventType(ViewProperty.ROTATION),
      this.handleRotationChanged_, this);
  };

  /**
   * Handle rotation changes to the main map.
   * TODO: This should rotate the extent rectrangle instead of the
   * overview map's view.
   * @private
   */
  OverviewMap.prototype.handleRotationChanged_ = function handleRotationChanged_ () {
    this.ovmap_.getView().setRotation(this.getMap().getView().getRotation());
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
  OverviewMap.prototype.validateExtent_ = function validateExtent_ () {
    var map = this.getMap();
    var ovmap = this.ovmap_;

    if (!map.isRendered() || !ovmap.isRendered()) {
      return;
    }

    var mapSize = /** @type {import("../size.js").Size} */ (map.getSize());

    var view = map.getView();
    var extent = view.calculateExtent(mapSize);

    var ovmapSize = /** @type {import("../size.js").Size} */ (ovmap.getSize());

    var ovview = ovmap.getView();
    var ovextent = ovview.calculateExtent(ovmapSize);

    var topLeftPixel =
        ovmap.getPixelFromCoordinate(getTopLeft(extent));
    var bottomRightPixel =
        ovmap.getPixelFromCoordinate(getBottomRight(extent));

    var boxWidth = Math.abs(topLeftPixel[0] - bottomRightPixel[0]);
    var boxHeight = Math.abs(topLeftPixel[1] - bottomRightPixel[1]);

    var ovmapWidth = ovmapSize[0];
    var ovmapHeight = ovmapSize[1];

    if (boxWidth < ovmapWidth * MIN_RATIO ||
        boxHeight < ovmapHeight * MIN_RATIO ||
        boxWidth > ovmapWidth * MAX_RATIO ||
        boxHeight > ovmapHeight * MAX_RATIO) {
      this.resetExtent_();
    } else if (!containsExtent(ovextent, extent)) {
      this.recenter_();
    }
  };

  /**
   * Reset the overview map extent to half calculated min and max ratio times
   * the extent of the main map.
   * @private
   */
  OverviewMap.prototype.resetExtent_ = function resetExtent_ () {
    if (MAX_RATIO === 0 || MIN_RATIO === 0) {
      return;
    }

    var map = this.getMap();
    var ovmap = this.ovmap_;

    var mapSize = /** @type {import("../size.js").Size} */ (map.getSize());

    var view = map.getView();
    var extent = view.calculateExtent(mapSize);

    var ovview = ovmap.getView();

    // get how many times the current map overview could hold different
    // box sizes using the min and max ratio, pick the step in the middle used
    // to calculate the extent from the main map to set it to the overview map,
    var steps = Math.log(
      MAX_RATIO / MIN_RATIO) / Math.LN2;
    var ratio = 1 / (Math.pow(2, steps / 2) * MIN_RATIO);
    scaleFromCenter(extent, ratio);
    ovview.fit(extent);
  };

  /**
   * Set the center of the overview map to the map center without changing its
   * resolution.
   * @private
   */
  OverviewMap.prototype.recenter_ = function recenter_ () {
    var map = this.getMap();
    var ovmap = this.ovmap_;

    var view = map.getView();

    var ovview = ovmap.getView();

    ovview.setCenter(view.getCenter());
  };

  /**
   * Update the box using the main map extent
   * @private
   */
  OverviewMap.prototype.updateBox_ = function updateBox_ () {
    var map = this.getMap();
    var ovmap = this.ovmap_;

    if (!map.isRendered() || !ovmap.isRendered()) {
      return;
    }

    var mapSize = /** @type {import("../size.js").Size} */ (map.getSize());

    var view = map.getView();

    var ovview = ovmap.getView();

    var rotation = view.getRotation();

    var overlay = this.boxOverlay_;
    var box = this.boxOverlay_.getElement();
    var extent = view.calculateExtent(mapSize);
    var ovresolution = ovview.getResolution();
    var bottomLeft = getBottomLeft(extent);
    var topRight = getTopRight(extent);

    // set position using bottom left coordinates
    var rotateBottomLeft = this.calculateCoordinateRotate_(rotation, bottomLeft);
    overlay.setPosition(rotateBottomLeft);

    // set box size calculated from map extent size and overview map resolution
    if (box) {
      box.style.width = Math.abs((bottomLeft[0] - topRight[0]) / ovresolution) + 'px';
      box.style.height = Math.abs((topRight[1] - bottomLeft[1]) / ovresolution) + 'px';
    }
  };

  /**
   * @param {number} rotation Target rotation.
   * @param {import("../coordinate.js").Coordinate} coordinate Coordinate.
   * @return {import("../coordinate.js").Coordinate|undefined} Coordinate for rotation and center anchor.
   * @private
   */
  OverviewMap.prototype.calculateCoordinateRotate_ = function calculateCoordinateRotate_ (rotation, coordinate) {
    var coordinateRotate;

    var map = this.getMap();
    var view = map.getView();

    var currentCenter = view.getCenter();

    if (currentCenter) {
      coordinateRotate = [
        coordinate[0] - currentCenter[0],
        coordinate[1] - currentCenter[1]
      ];
      rotateCoordinate(coordinateRotate, rotation);
      addCoordinate(coordinateRotate, currentCenter);
    }
    return coordinateRotate;
  };

  /**
   * @param {MouseEvent} event The event to handle
   * @private
   */
  OverviewMap.prototype.handleClick_ = function handleClick_ (event) {
    event.preventDefault();
    this.handleToggle_();
  };

  /**
   * @private
   */
  OverviewMap.prototype.handleToggle_ = function handleToggle_ () {
    this.element.classList.toggle(CLASS_COLLAPSED);
    if (this.collapsed_) {
      replaceNode(this.collapseLabel_, this.label_);
    } else {
      replaceNode(this.label_, this.collapseLabel_);
    }
    this.collapsed_ = !this.collapsed_;

    // manage overview map if it had not been rendered before and control
    // is expanded
    var ovmap = this.ovmap_;
    if (!this.collapsed_ && !ovmap.isRendered()) {
      ovmap.updateSize();
      this.resetExtent_();
      listenOnce(ovmap, MapEventType.POSTRENDER,
        function(event) {
          this.updateBox_();
        },
        this);
    }
  };

  /**
   * Return `true` if the overview map is collapsible, `false` otherwise.
   * @return {boolean} True if the widget is collapsible.
   * @api
   */
  OverviewMap.prototype.getCollapsible = function getCollapsible () {
    return this.collapsible_;
  };

  /**
   * Set whether the overview map should be collapsible.
   * @param {boolean} collapsible True if the widget is collapsible.
   * @api
   */
  OverviewMap.prototype.setCollapsible = function setCollapsible (collapsible) {
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
  OverviewMap.prototype.setCollapsed = function setCollapsed (collapsed) {
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
  OverviewMap.prototype.getCollapsed = function getCollapsed () {
    return this.collapsed_;
  };

  /**
   * Return the overview map.
   * @return {import("../PluggableMap.js").default} Overview map.
   * @api
   */
  OverviewMap.prototype.getOverviewMap = function getOverviewMap () {
    return this.ovmap_;
  };

  return OverviewMap;
}(Control));


/**
 * Update the overview map element.
 * @param {import("../MapEvent.js").default} mapEvent Map event.
 * @this {OverviewMap}
 * @api
 */
export function render(mapEvent) {
  this.validateExtent_();
  this.updateBox_();
}


export default OverviewMap;

//# sourceMappingURL=OverviewMap.js.map