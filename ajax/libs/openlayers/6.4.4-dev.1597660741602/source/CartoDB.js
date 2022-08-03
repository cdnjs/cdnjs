/**
 * @module ol/source/CartoDB
 */
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
import SourceState from './State.js';
import XYZ from './XYZ.js';
import { assign } from '../obj.js';
/**
 * @typedef {Object} Options
 * @property {import("./Source.js").AttributionLike} [attributions] Attributions.
 * @property {number} [cacheSize] Initial tile cache size. Will auto-grow to hold at least the number of tiles in the viewport.
 * @property {null|string} [crossOrigin] The `crossOrigin` attribute for loaded images.  Note that
 * you must provide a `crossOrigin` value if you want to access pixel data with the Canvas renderer.
 * See https://developer.mozilla.org/en-US/docs/Web/HTML/CORS_enabled_image for more detail.
 * @property {import("../proj.js").ProjectionLike} [projection='EPSG:3857'] Projection.
 * @property {number} [maxZoom=18] Max zoom.
 * @property {number} [minZoom] Minimum zoom.
 * @property {boolean} [wrapX=true] Whether to wrap the world horizontally.
 * @property {Object} [config] If using anonymous maps, the CartoDB config to use. See
 * http://docs.cartodb.com/cartodb-platform/maps-api/anonymous-maps/
 * for more detail.
 * If using named maps, a key-value lookup with the template parameters.
 * See http://docs.cartodb.com/cartodb-platform/maps-api/named-maps/
 * for more detail.
 * @property {string} [map] If using named maps, this will be the name of the template to load.
 * See http://docs.cartodb.com/cartodb-platform/maps-api/named-maps/
 * for more detail.
 * @property {string} account If using named maps, this will be the name of the template to load.
 */
/**
 * @typedef {Object} CartoDBLayerInfo
 * @property {string} layergroupid The layer group ID
 * @property {{https: string}} cdn_url The CDN URL
 */
/**
 * @classdesc
 * Layer source for the CartoDB Maps API.
 * @api
 */
var CartoDB = /** @class */ (function (_super) {
    __extends(CartoDB, _super);
    /**
     * @param {Options} options CartoDB options.
     */
    function CartoDB(options) {
        var _this = _super.call(this, {
            attributions: options.attributions,
            cacheSize: options.cacheSize,
            crossOrigin: options.crossOrigin,
            maxZoom: options.maxZoom !== undefined ? options.maxZoom : 18,
            minZoom: options.minZoom,
            projection: options.projection,
            wrapX: options.wrapX,
        }) || this;
        /**
         * @type {string}
         * @private
         */
        _this.account_ = options.account;
        /**
         * @type {string}
         * @private
         */
        _this.mapId_ = options.map || '';
        /**
         * @type {!Object}
         * @private
         */
        _this.config_ = options.config || {};
        /**
         * @type {!Object<string, CartoDBLayerInfo>}
         * @private
         */
        _this.templateCache_ = {};
        _this.initializeMap_();
        return _this;
    }
    /**
     * Returns the current config.
     * @return {!Object} The current configuration.
     * @api
     */
    CartoDB.prototype.getConfig = function () {
        return this.config_;
    };
    /**
     * Updates the carto db config.
     * @param {Object} config a key-value lookup. Values will replace current values
     *     in the config.
     * @api
     */
    CartoDB.prototype.updateConfig = function (config) {
        assign(this.config_, config);
        this.initializeMap_();
    };
    /**
     * Sets the CartoDB config
     * @param {Object} config In the case of anonymous maps, a CartoDB configuration
     *     object.
     * If using named maps, a key-value lookup with the template parameters.
     * @api
     */
    CartoDB.prototype.setConfig = function (config) {
        this.config_ = config || {};
        this.initializeMap_();
    };
    /**
     * Issue a request to initialize the CartoDB map.
     * @private
     */
    CartoDB.prototype.initializeMap_ = function () {
        var paramHash = JSON.stringify(this.config_);
        if (this.templateCache_[paramHash]) {
            this.applyTemplate_(this.templateCache_[paramHash]);
            return;
        }
        var mapUrl = 'https://' + this.account_ + '.carto.com/api/v1/map';
        if (this.mapId_) {
            mapUrl += '/named/' + this.mapId_;
        }
        var client = new XMLHttpRequest();
        client.addEventListener('load', this.handleInitResponse_.bind(this, paramHash));
        client.addEventListener('error', this.handleInitError_.bind(this));
        client.open('POST', mapUrl);
        client.setRequestHeader('Content-type', 'application/json');
        client.send(JSON.stringify(this.config_));
    };
    /**
     * Handle map initialization response.
     * @param {string} paramHash a hash representing the parameter set that was used
     *     for the request
     * @param {Event} event Event.
     * @private
     */
    CartoDB.prototype.handleInitResponse_ = function (paramHash, event) {
        var client = /** @type {XMLHttpRequest} */ (event.target);
        // status will be 0 for file:// urls
        if (!client.status || (client.status >= 200 && client.status < 300)) {
            var response = void 0;
            try {
                response = /** @type {CartoDBLayerInfo} */ (JSON.parse(client.responseText));
            }
            catch (err) {
                this.setState(SourceState.ERROR);
                return;
            }
            this.applyTemplate_(response);
            this.templateCache_[paramHash] = response;
            this.setState(SourceState.READY);
        }
        else {
            this.setState(SourceState.ERROR);
        }
    };
    /**
     * @private
     * @param {Event} event Event.
     */
    CartoDB.prototype.handleInitError_ = function (event) {
        this.setState(SourceState.ERROR);
    };
    /**
     * Apply the new tile urls returned by carto db
     * @param {CartoDBLayerInfo} data Result of carto db call.
     * @private
     */
    CartoDB.prototype.applyTemplate_ = function (data) {
        var tilesUrl = 'https://' +
            data.cdn_url.https +
            '/' +
            this.account_ +
            '/api/v1/map/' +
            data.layergroupid +
            '/{z}/{x}/{y}.png';
        this.setUrl(tilesUrl);
    };
    return CartoDB;
}(XYZ));
export default CartoDB;
//# sourceMappingURL=CartoDB.js.map