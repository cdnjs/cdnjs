/**
 * @module ol/interaction/DragAndDrop
 */
// FIXME should handle all geo-referenced data, not just vector data
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
import Event from '../events/Event.js';
import EventType from '../events/EventType.js';
import Interaction from './Interaction.js';
import { TRUE } from '../functions.js';
import { get as getProjection } from '../proj.js';
import { listen, unlistenByKey } from '../events.js';
/**
 * @typedef {Object} Options
 * @property {Array<typeof import("../format/Feature.js").default|import("../format/Feature.js").default>} [formatConstructors] Format constructors
 * (and/or formats pre-constructed with options).
 * @property {import("../source/Vector.js").default} [source] Optional vector source where features will be added.  If a source is provided
 * all existing features will be removed and new features will be added when
 * they are dropped on the target.  If you want to add features to a vector
 * source without removing the existing features (append only), instead of
 * providing the source option listen for the "addfeatures" event.
 * @property {import("../proj.js").ProjectionLike} [projection] Target projection. By default, the map's view's projection is used.
 * @property {HTMLElement} [target] The element that is used as the drop target, default is the viewport element.
 */
/**
 * @enum {string}
 */
var DragAndDropEventType = {
    /**
     * Triggered when features are added
     * @event DragAndDropEvent#addfeatures
     * @api
     */
    ADD_FEATURES: 'addfeatures',
};
/**
 * @classdesc
 * Events emitted by {@link module:ol/interaction/DragAndDrop~DragAndDrop} instances are instances
 * of this type.
 */
var DragAndDropEvent = /** @class */ (function (_super) {
    __extends(DragAndDropEvent, _super);
    /**
     * @param {DragAndDropEventType} type Type.
     * @param {File} file File.
     * @param {Array<import("../Feature.js").default>} [opt_features] Features.
     * @param {import("../proj/Projection.js").default} [opt_projection] Projection.
     */
    function DragAndDropEvent(type, file, opt_features, opt_projection) {
        var _this = _super.call(this, type) || this;
        /**
         * The features parsed from dropped data.
         * @type {Array<import("../Feature.js").FeatureLike>|undefined}
         * @api
         */
        _this.features = opt_features;
        /**
         * The dropped file.
         * @type {File}
         * @api
         */
        _this.file = file;
        /**
         * The feature projection.
         * @type {import("../proj/Projection.js").default|undefined}
         * @api
         */
        _this.projection = opt_projection;
        return _this;
    }
    return DragAndDropEvent;
}(Event));
export { DragAndDropEvent };
/***
 * @template Return
 * @typedef {import("../Observable").OnSignature<import("../Observable").EventTypes, import("../events/Event.js").default, Return> &
 *   import("../Observable").OnSignature<import("../ObjectEventType").Types|
 *     'change:active', import("../Object").ObjectEvent, Return> &
 *   import("../Observable").OnSignature<'addfeatures', DragAndDropEvent, Return> &
 *   import("../Observable").CombinedOnSignature<import("../Observable").EventTypes|import("../ObjectEventType").Types|
 *     'change:active'|'addfeatures', Return>} DragAndDropOnSignature
 */
/**
 * @classdesc
 * Handles input of vector data by drag and drop.
 *
 * Note that the DragAndDrop interaction uses the TextDecoder() constructor if the supplied
 * combination of formats read both text string and ArrayBuffer sources. Older browsers such
 * as IE which do not support this will need a TextDecoder polyfill to be loaded before use.
 *
 * @api
 *
 * @fires DragAndDropEvent
 */
var DragAndDrop = /** @class */ (function (_super) {
    __extends(DragAndDrop, _super);
    /**
     * @param {Options} [opt_options] Options.
     */
    function DragAndDrop(opt_options) {
        var _this = this;
        var options = opt_options ? opt_options : {};
        _this = _super.call(this, {
            handleEvent: TRUE,
        }) || this;
        /***
         * @type {DragAndDropOnSignature<import("../events").EventsKey>}
         */
        _this.on;
        /***
         * @type {DragAndDropOnSignature<import("../events").EventsKey>}
         */
        _this.once;
        /***
         * @type {DragAndDropOnSignature<void>}
         */
        _this.un;
        /**
         * @private
         * @type {boolean}
         */
        _this.readAsBuffer_ = false;
        /**
         * @private
         * @type {Array<import("../format/Feature.js").default>}
         */
        _this.formats_ = [];
        var formatConstructors = options.formatConstructors
            ? options.formatConstructors
            : [];
        for (var i = 0, ii = formatConstructors.length; i < ii; ++i) {
            var format = formatConstructors[i];
            if (typeof format === 'function') {
                format = new format();
            }
            _this.formats_.push(format);
            _this.readAsBuffer_ =
                _this.readAsBuffer_ || format.getType() === 'arraybuffer';
        }
        /**
         * @private
         * @type {import("../proj/Projection.js").default}
         */
        _this.projection_ = options.projection
            ? getProjection(options.projection)
            : null;
        /**
         * @private
         * @type {?Array<import("../events.js").EventsKey>}
         */
        _this.dropListenKeys_ = null;
        /**
         * @private
         * @type {import("../source/Vector.js").default}
         */
        _this.source_ = options.source || null;
        /**
         * @private
         * @type {HTMLElement|null}
         */
        _this.target = options.target ? options.target : null;
        return _this;
    }
    /**
     * @param {File} file File.
     * @param {Event} event Load event.
     * @private
     */
    DragAndDrop.prototype.handleResult_ = function (file, event) {
        var result = event.target.result;
        var map = this.getMap();
        var projection = this.projection_;
        if (!projection) {
            var view = map.getView();
            projection = view.getProjection();
        }
        var text;
        var formats = this.formats_;
        for (var i = 0, ii = formats.length; i < ii; ++i) {
            var format = formats[i];
            var input = result;
            if (this.readAsBuffer_ && format.getType() !== 'arraybuffer') {
                if (text === undefined) {
                    text = new TextDecoder().decode(result);
                }
                input = text;
            }
            var features = this.tryReadFeatures_(format, input, {
                featureProjection: projection,
            });
            if (features && features.length > 0) {
                if (this.source_) {
                    this.source_.clear();
                    this.source_.addFeatures(features);
                }
                this.dispatchEvent(new DragAndDropEvent(DragAndDropEventType.ADD_FEATURES, file, features, projection));
                break;
            }
        }
    };
    /**
     * @private
     */
    DragAndDrop.prototype.registerListeners_ = function () {
        var map = this.getMap();
        if (map) {
            var dropArea = this.target ? this.target : map.getViewport();
            this.dropListenKeys_ = [
                listen(dropArea, EventType.DROP, this.handleDrop, this),
                listen(dropArea, EventType.DRAGENTER, this.handleStop, this),
                listen(dropArea, EventType.DRAGOVER, this.handleStop, this),
                listen(dropArea, EventType.DROP, this.handleStop, this),
            ];
        }
    };
    /**
     * Activate or deactivate the interaction.
     * @param {boolean} active Active.
     * @observable
     * @api
     */
    DragAndDrop.prototype.setActive = function (active) {
        if (!this.getActive() && active) {
            this.registerListeners_();
        }
        if (this.getActive() && !active) {
            this.unregisterListeners_();
        }
        _super.prototype.setActive.call(this, active);
    };
    /**
     * Remove the interaction from its current map and attach it to the new map.
     * Subclasses may set up event handlers to get notified about changes to
     * the map here.
     * @param {import("../PluggableMap.js").default} map Map.
     */
    DragAndDrop.prototype.setMap = function (map) {
        this.unregisterListeners_();
        _super.prototype.setMap.call(this, map);
        if (this.getActive()) {
            this.registerListeners_();
        }
    };
    /**
     * @param {import("../format/Feature.js").default} format Format.
     * @param {string} text Text.
     * @param {import("../format/Feature.js").ReadOptions} options Read options.
     * @private
     * @return {Array<import("../Feature.js").default>} Features.
     */
    DragAndDrop.prototype.tryReadFeatures_ = function (format, text, options) {
        try {
            return (
            /** @type {Array<import("../Feature.js").default>} */
            (format.readFeatures(text, options)));
        }
        catch (e) {
            return null;
        }
    };
    /**
     * @private
     */
    DragAndDrop.prototype.unregisterListeners_ = function () {
        if (this.dropListenKeys_) {
            this.dropListenKeys_.forEach(unlistenByKey);
            this.dropListenKeys_ = null;
        }
    };
    /**
     * @param {DragEvent} event Event.
     */
    DragAndDrop.prototype.handleDrop = function (event) {
        var files = event.dataTransfer.files;
        for (var i = 0, ii = files.length; i < ii; ++i) {
            var file = files.item(i);
            var reader = new FileReader();
            reader.addEventListener(EventType.LOAD, this.handleResult_.bind(this, file));
            if (this.readAsBuffer_) {
                reader.readAsArrayBuffer(file);
            }
            else {
                reader.readAsText(file);
            }
        }
    };
    /**
     * @param {DragEvent} event Event.
     */
    DragAndDrop.prototype.handleStop = function (event) {
        event.stopPropagation();
        event.preventDefault();
        event.dataTransfer.dropEffect = 'copy';
    };
    return DragAndDrop;
}(Interaction));
export default DragAndDrop;
//# sourceMappingURL=DragAndDrop.js.map