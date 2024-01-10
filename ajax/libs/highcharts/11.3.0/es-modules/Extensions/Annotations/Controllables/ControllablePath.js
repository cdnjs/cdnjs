/* *
 *
 *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
 *
 * */
'use strict';
import Controllable from './Controllable.js';
import ControllableDefaults from './ControllableDefaults.js';
const { defaultMarkers } = ControllableDefaults;
import H from '../../../Core/Globals.js';
const { composed } = H;
import U from '../../../Core/Utilities.js';
const { addEvent, defined, extend, merge, pushUnique, uniqueKey } = U;
/* *
 *
 *  Constants
 *
 * */
const markerEndSetter = createMarkerSetter('marker-end');
const markerStartSetter = createMarkerSetter('marker-start');
// See TRACKER_FILL in highcharts.src.js
const TRACKER_FILL = 'rgba(192,192,192,' + (H.svg ? 0.0001 : 0.002) + ')';
/* *
 *
 *  Functions
 *
 * */
/**
 * @private
 */
function createMarkerSetter(markerType) {
    return function (value) {
        this.attr(markerType, 'url(#' + value + ')');
    };
}
/**
 * @private
 */
function onChartAfterGetContainer() {
    this.options.defs = merge(defaultMarkers, this.options.defs || {});
    // objectEach(this.options.defs, function (def): void {
    //     const attributes = def.attributes;
    //     if (
    //         def.tagName === 'marker' &&
    //         attributes &&
    //         attributes.id &&
    //         attributes.display !== 'none'
    //     ) {
    //         this.renderer.addMarker(attributes.id, def);
    //     }
    // }, this);
}
/**
 * @private
 */
function svgRendererAddMarker(id, markerOptions) {
    const options = { attributes: { id } };
    const attrs = {
        stroke: markerOptions.color || 'none',
        fill: markerOptions.color || 'rgba(0, 0, 0, 0.75)'
    };
    options.children = (markerOptions.children &&
        markerOptions.children.map(function (child) {
            return merge(attrs, child);
        }));
    const ast = merge(true, {
        attributes: {
            markerWidth: 20,
            markerHeight: 20,
            refX: 0,
            refY: 0,
            orient: 'auto'
        }
    }, markerOptions, options);
    const marker = this.definition(ast);
    marker.id = id;
    return marker;
}
/* *
 *
 *  Class
 *
 * */
/**
 * A controllable path class.
 *
 * @requires modules/annotations
 *
 * @private
 * @class
 * @name Highcharts.AnnotationControllablePath
 *
 * @param {Highcharts.Annotation}
 * Related annotation.
 *
 * @param {Highcharts.AnnotationsShapeOptions} options
 * A path's options object.
 *
 * @param {number} index
 * Index of the path.
 */
class ControllablePath extends Controllable {
    /* *
     *
     *  Static Functions
     *
     * */
    static compose(ChartClass, SVGRendererClass) {
        if (pushUnique(composed, this.compose)) {
            const svgRendererProto = SVGRendererClass.prototype;
            addEvent(ChartClass, 'afterGetContainer', onChartAfterGetContainer);
            svgRendererProto.addMarker = svgRendererAddMarker;
        }
    }
    /* *
     *
     *  Constructors
     *
     * */
    constructor(annotation, options, index) {
        super(annotation, options, index, 'shape');
        /* *
         *
         *  Properties
         *
         * */
        this.type = 'path';
    }
    /* *
     *
     *  Functions
     *
     * */
    /**
     * Map the controllable path to 'd' path attribute.
     *
     * @return {Highcharts.SVGPathArray|null}
     * A path's d attribute.
     */
    toD() {
        const dOption = this.options.d;
        if (dOption) {
            return typeof dOption === 'function' ?
                dOption.call(this) :
                dOption;
        }
        const points = this.points, len = points.length, d = [];
        let showPath = len, point = points[0], position = showPath && this.anchor(point).absolutePosition, pointIndex = 0, command;
        if (position) {
            d.push(['M', position.x, position.y]);
            while (++pointIndex < len && showPath) {
                point = points[pointIndex];
                command = point.command || 'L';
                position = this.anchor(point).absolutePosition;
                if (command === 'M') {
                    d.push([command, position.x, position.y]);
                }
                else if (command === 'L') {
                    d.push([command, position.x, position.y]);
                }
                else if (command === 'Z') {
                    d.push([command]);
                }
                showPath = point.series.visible;
            }
        }
        return (showPath && this.graphic ?
            this.chart.renderer.crispLine(d, this.graphic.strokeWidth()) :
            null);
    }
    shouldBeDrawn() {
        return super.shouldBeDrawn() || !!this.options.d;
    }
    render(parent) {
        const options = this.options, attrs = this.attrsFromOptions(options);
        this.graphic = this.annotation.chart.renderer
            .path([['M', 0, 0]])
            .attr(attrs)
            .add(parent);
        if (options.className) {
            this.graphic.addClass(options.className);
        }
        this.tracker = this.annotation.chart.renderer
            .path([['M', 0, 0]])
            .addClass('highcharts-tracker-line')
            .attr({
            zIndex: 2
        })
            .add(parent);
        if (!this.annotation.chart.styledMode) {
            this.tracker.attr({
                'stroke-linejoin': 'round',
                stroke: TRACKER_FILL,
                fill: TRACKER_FILL,
                'stroke-width': this.graphic.strokeWidth() +
                    options.snap * 2
            });
        }
        super.render();
        extend(this.graphic, { markerStartSetter, markerEndSetter });
        this.setMarkers(this);
    }
    redraw(animation) {
        if (this.graphic) {
            const d = this.toD(), action = animation ? 'animate' : 'attr';
            if (d) {
                this.graphic[action]({ d: d });
                this.tracker[action]({ d: d });
            }
            else {
                this.graphic.attr({ d: 'M 0 ' + -9e9 });
                this.tracker.attr({ d: 'M 0 ' + -9e9 });
            }
            this.graphic.placed = this.tracker.placed = !!d;
        }
        super.redraw(animation);
    }
    /**
     * Set markers.
     * @private
     * @param {Highcharts.AnnotationControllablePath} item
     */
    setMarkers(item) {
        const itemOptions = item.options, chart = item.chart, defs = chart.options.defs, fill = itemOptions.fill, color = defined(fill) && fill !== 'none' ?
            fill :
            itemOptions.stroke;
        const setMarker = function (markerType) {
            let markerId = itemOptions[markerType], def, predefinedMarker, key, marker;
            if (markerId) {
                for (key in defs) { // eslint-disable-line guard-for-in
                    def = defs[key];
                    if ((markerId === (def.attributes && def.attributes.id) ||
                        // Legacy, for
                        // unit-tests/annotations/annotations-shapes
                        markerId === def.id) &&
                        def.tagName === 'marker') {
                        predefinedMarker = def;
                        break;
                    }
                }
                if (predefinedMarker) {
                    marker = item[markerType] = chart.renderer
                        .addMarker((itemOptions.id || uniqueKey()) + '-' + markerId, merge(predefinedMarker, { color: color }));
                    item.attr(markerType, marker.getAttribute('id'));
                }
            }
        };
        ['markerStart', 'markerEnd']
            .forEach(setMarker);
    }
}
/* *
 *
 *  Static Properties
 *
 * */
/**
 * A map object which allows to map options attributes to element attributes
 *
 * @name Highcharts.AnnotationControllablePath.attrsMap
 * @type {Highcharts.Dictionary<string>}
 */
ControllablePath.attrsMap = {
    dashStyle: 'dashstyle',
    strokeWidth: 'stroke-width',
    stroke: 'stroke',
    fill: 'fill',
    zIndex: 'zIndex'
};
/* *
 *
 *  Default Export
 *
 * */
export default ControllablePath;
