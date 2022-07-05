/* *
 *
 *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
 *
 * */
'use strict';
import U from '../Core/Utilities.js';
var isNumber = U.isNumber;
/* *
 *
 *  Functions
 *
 * */
/**
 * Handles the drawing of a component.
 * Can be used for any type of component that reserves the graphic property,
 * and provides a shouldDraw on its context.
 *
 * @private
 *
 * @todo add type checking.
 * @todo export this function to enable usage
 */
function draw(point, params) {
    var animatableAttribs = params.animatableAttribs, onComplete = params.onComplete, css = params.css, renderer = params.renderer;
    var animation = (point.series && point.series.chart.hasRendered) ?
        // Chart-level animation on updates
        void 0 :
        // Series-level animation on new points
        (point.series &&
            point.series.options.animation);
    var graphic = point.graphic;
    params.attribs = params.attribs || {};
    // Assigning class in dot notation does go well in IE8
    // eslint-disable-next-line dot-notation
    params.attribs['class'] = point.getClassName();
    if (shouldDraw(point)) {
        if (!graphic) {
            point.graphic = graphic = params.shapeType === 'text' ?
                renderer.text() :
                renderer[params.shapeType](params.shapeArgs || {});
            graphic.add(params.group);
        }
        if (css) {
            graphic.css(css);
        }
        graphic
            .attr(params.attribs)
            .animate(animatableAttribs, params.isNew ? false : animation, onComplete);
    }
    else if (graphic) {
        var destroy_1 = function () {
            point.graphic = graphic = (graphic && graphic.destroy());
            if (typeof onComplete === 'function') {
                onComplete();
            }
        };
        // animate only runs complete callback if something was animated.
        if (Object.keys(animatableAttribs).length) {
            graphic.animate(animatableAttribs, void 0, function () { return destroy_1(); });
        }
        else {
            destroy_1();
        }
    }
}
/**
 * @private
 */
function shouldDraw(point) {
    switch (point.series && point.series.type) {
        case 'treemap':
            return isNumber(point.plotY) && point.y !== null;
        default:
            return !point.isNull;
    }
}
/* *
 *
 *  Default Export
 *
 * */
var DrawPointUtilities = {
    draw: draw,
    shouldDraw: shouldDraw
};
export default DrawPointUtilities;
