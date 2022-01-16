/* *
 *
 *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
 *
 * */
'use strict';
/* *
 *
 *  Composition
 *
 * */
var DrawPointComposition;
(function (DrawPointComposition) {
    /* *
     *
     *  Declarations
     *
     * */
    /* *
     *
     *  Constants
     *
     * */
    var composedClasses = [];
    /* *
     *
     *  Functions
     *
     * */
    /* eslint-disable valid-jsdoc */
    /**
     * @private
     */
    function compose(PointClass) {
        if (composedClasses.indexOf(PointClass) === -1) {
            composedClasses.push(PointClass);
            var pointProto = PointClass.prototype;
            pointProto.draw = draw;
            if (!pointProto.shouldDraw) {
                pointProto.shouldDraw = shouldDraw;
            }
        }
        return PointClass;
    }
    DrawPointComposition.compose = compose;
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
    function draw(params) {
        var _this = this;
        var animatableAttribs = params.animatableAttribs, onComplete = params.onComplete, css = params.css, renderer = params.renderer;
        var animation = (this.series && this.series.chart.hasRendered) ?
            // Chart-level animation on updates
            void 0 :
            // Series-level animation on new points
            (this.series &&
                this.series.options.animation);
        var graphic = this.graphic;
        params.attribs = params.attribs || {};
        // Assigning class in dot notation does go well in IE8
        // eslint-disable-next-line dot-notation
        params.attribs['class'] = this.getClassName();
        if (this.shouldDraw()) {
            if (!graphic) {
                this.graphic = graphic =
                    renderer[params.shapeType](params.shapeArgs)
                        .add(params.group);
            }
            graphic
                .css(css)
                .attr(params.attribs)
                .animate(animatableAttribs, params.isNew ? false : animation, onComplete);
        }
        else if (graphic) {
            var destroy_1 = function () {
                _this.graphic = graphic = (graphic && graphic.destroy());
                if (typeof onComplete === 'function') {
                    onComplete();
                }
            };
            // animate only runs complete callback if something was animated.
            if (Object.keys(animatableAttribs).length) {
                graphic.animate(animatableAttribs, void 0, function () {
                    destroy_1();
                });
            }
            else {
                destroy_1();
            }
        }
    }
    /**
     * @private
     */
    function shouldDraw() {
        return !this.isNull;
    }
})(DrawPointComposition || (DrawPointComposition = {}));
/* *
 *
 *  Default Export
 *
 * */
export default DrawPointComposition;
