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
 * @module ol/interaction/Translate
 */
import Collection from '../Collection.js';
import { getChangeEventType } from '../Object.js';
import { listen } from '../events.js';
import Event from '../events/Event.js';
import { TRUE } from '../functions.js';
import { includes } from '../array.js';
import PointerInteraction from './Pointer.js';
import InteractionProperty from './Property.js';
/**
 * @enum {string}
 */
var TranslateEventType = {
    /**
     * Triggered upon feature translation start.
     * @event TranslateEvent#translatestart
     * @api
     */
    TRANSLATESTART: 'translatestart',
    /**
     * Triggered upon feature translation.
     * @event TranslateEvent#translating
     * @api
     */
    TRANSLATING: 'translating',
    /**
     * Triggered upon feature translation end.
     * @event TranslateEvent#translateend
     * @api
     */
    TRANSLATEEND: 'translateend'
};
/**
 * @typedef {Object} Options
 * @property {Collection<import("../Feature.js").default>} [features] Only features contained in this collection will be able to be translated. If
 * not specified, all features on the map will be able to be translated.
 * @property {Array<import("../layer/Layer.js").default>|function(import("../layer/Layer.js").default): boolean} [layers] A list of layers from which features should be
 * translated. Alternatively, a filter function can be provided. The
 * function will be called for each layer in the map and should return
 * `true` for layers that you want to be translatable. If the option is
 * absent, all visible layers will be considered translatable.
 * @property {number} [hitTolerance=0] Hit-detection tolerance. Pixels inside the radius around the given position
 * will be checked for features.
 */
/**
 * @classdesc
 * Events emitted by {@link module:ol/interaction/Translate~Translate} instances
 * are instances of this type.
 */
var TranslateEvent = /** @class */ (function (_super) {
    __extends(TranslateEvent, _super);
    /**
     * @param {TranslateEventType} type Type.
     * @param {Collection<import("../Feature.js").default>} features The features translated.
     * @param {import("../coordinate.js").Coordinate} coordinate The event coordinate.
     */
    function TranslateEvent(type, features, coordinate) {
        var _this = _super.call(this, type) || this;
        /**
         * The features being translated.
         * @type {Collection<import("../Feature.js").default>}
         * @api
         */
        _this.features = features;
        /**
         * The coordinate of the drag event.
         * @const
         * @type {import("../coordinate.js").Coordinate}
         * @api
         */
        _this.coordinate = coordinate;
        return _this;
    }
    return TranslateEvent;
}(Event));
export { TranslateEvent };
/**
 * @classdesc
 * Interaction for translating (moving) features.
 *
 * @fires TranslateEvent
 * @api
 */
var Translate = /** @class */ (function (_super) {
    __extends(Translate, _super);
    /**
     * @param {Options=} opt_options Options.
     */
    function Translate(opt_options) {
        var _this = this;
        var options = opt_options ? opt_options : {};
        _this = _super.call(this, /** @type {import("./Pointer.js").Options} */ (options)) || this;
        /**
         * The last position we translated to.
         * @type {import("../coordinate.js").Coordinate}
         * @private
         */
        _this.lastCoordinate_ = null;
        /**
         * @type {Collection<import("../Feature.js").default>}
         * @private
         */
        _this.features_ = options.features !== undefined ? options.features : null;
        /** @type {function(import("../layer/Layer.js").default): boolean} */
        var layerFilter;
        if (options.layers) {
            if (typeof options.layers === 'function') {
                layerFilter = options.layers;
            }
            else {
                var layers_1 = options.layers;
                layerFilter = function (layer) {
                    return includes(layers_1, layer);
                };
            }
        }
        else {
            layerFilter = TRUE;
        }
        /**
         * @private
         * @type {function(import("../layer/Layer.js").default): boolean}
         */
        _this.layerFilter_ = layerFilter;
        /**
         * @private
         * @type {number}
         */
        _this.hitTolerance_ = options.hitTolerance ? options.hitTolerance : 0;
        /**
         * @type {import("../Feature.js").default}
         * @private
         */
        _this.lastFeature_ = null;
        listen(_this, getChangeEventType(InteractionProperty.ACTIVE), _this.handleActiveChanged_, _this);
        return _this;
    }
    /**
     * @inheritDoc
     */
    Translate.prototype.handleDownEvent = function (event) {
        this.lastFeature_ = this.featuresAtPixel_(event.pixel, event.map);
        if (!this.lastCoordinate_ && this.lastFeature_) {
            this.lastCoordinate_ = event.coordinate;
            this.handleMoveEvent(event);
            var features = this.features_ || new Collection([this.lastFeature_]);
            this.dispatchEvent(new TranslateEvent(TranslateEventType.TRANSLATESTART, features, event.coordinate));
            return true;
        }
        return false;
    };
    /**
     * @inheritDoc
     */
    Translate.prototype.handleUpEvent = function (event) {
        if (this.lastCoordinate_) {
            this.lastCoordinate_ = null;
            this.handleMoveEvent(event);
            var features = this.features_ || new Collection([this.lastFeature_]);
            this.dispatchEvent(new TranslateEvent(TranslateEventType.TRANSLATEEND, features, event.coordinate));
            return true;
        }
        return false;
    };
    /**
     * @inheritDoc
     */
    Translate.prototype.handleDragEvent = function (event) {
        if (this.lastCoordinate_) {
            var newCoordinate = event.coordinate;
            var deltaX_1 = newCoordinate[0] - this.lastCoordinate_[0];
            var deltaY_1 = newCoordinate[1] - this.lastCoordinate_[1];
            var features = this.features_ || new Collection([this.lastFeature_]);
            features.forEach(function (feature) {
                var geom = feature.getGeometry();
                geom.translate(deltaX_1, deltaY_1);
                feature.setGeometry(geom);
            });
            this.lastCoordinate_ = newCoordinate;
            this.dispatchEvent(new TranslateEvent(TranslateEventType.TRANSLATING, features, newCoordinate));
        }
    };
    /**
     * @inheritDoc
     */
    Translate.prototype.handleMoveEvent = function (event) {
        var elem = event.map.getViewport();
        // Change the cursor to grab/grabbing if hovering any of the features managed
        // by the interaction
        if (this.featuresAtPixel_(event.pixel, event.map)) {
            elem.classList.remove(this.lastCoordinate_ ? 'ol-grab' : 'ol-grabbing');
            elem.classList.add(this.lastCoordinate_ ? 'ol-grabbing' : 'ol-grab');
        }
        else {
            elem.classList.remove('ol-grab', 'ol-grabbing');
        }
    };
    /**
     * Tests to see if the given coordinates intersects any of our selected
     * features.
     * @param {import("../pixel.js").Pixel} pixel Pixel coordinate to test for intersection.
     * @param {import("../PluggableMap.js").default} map Map to test the intersection on.
     * @return {import("../Feature.js").default} Returns the feature found at the specified pixel
     * coordinates.
     * @private
     */
    Translate.prototype.featuresAtPixel_ = function (pixel, map) {
        return map.forEachFeatureAtPixel(pixel, function (feature) {
            if (!this.features_ || includes(this.features_.getArray(), feature)) {
                return feature;
            }
        }.bind(this), {
            layerFilter: this.layerFilter_,
            hitTolerance: this.hitTolerance_
        });
    };
    /**
     * Returns the Hit-detection tolerance.
     * @returns {number} Hit tolerance in pixels.
     * @api
     */
    Translate.prototype.getHitTolerance = function () {
        return this.hitTolerance_;
    };
    /**
     * Hit-detection tolerance. Pixels inside the radius around the given position
     * will be checked for features.
     * @param {number} hitTolerance Hit tolerance in pixels.
     * @api
     */
    Translate.prototype.setHitTolerance = function (hitTolerance) {
        this.hitTolerance_ = hitTolerance;
    };
    /**
     * @inheritDoc
     */
    Translate.prototype.setMap = function (map) {
        var oldMap = this.getMap();
        _super.prototype.setMap.call(this, map);
        this.updateState_(oldMap);
    };
    /**
     * @private
     */
    Translate.prototype.handleActiveChanged_ = function () {
        this.updateState_(null);
    };
    /**
     * @param {import("../PluggableMap.js").default} oldMap Old map.
     * @private
     */
    Translate.prototype.updateState_ = function (oldMap) {
        var map = this.getMap();
        var active = this.getActive();
        if (!map || !active) {
            map = map || oldMap;
            if (map) {
                var elem = map.getViewport();
                elem.classList.remove('ol-grab', 'ol-grabbing');
            }
        }
    };
    return Translate;
}(PointerInteraction));
export default Translate;
//# sourceMappingURL=Translate.js.map