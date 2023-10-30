/* *
 *
 *  Highcharts cylinder - a 3D series
 *
 *  (c) 2010-2021 Highsoft AS
 *
 *  Author: Kacper Madej
 *
 *  License: www.highcharts.com/license
 *
 *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
 *
 * */
'use strict';
import Color from '../../Core/Color/Color.js';
const { parse: color } = Color;
import RendererRegistry from '../../Core/Renderer/RendererRegistry.js';
const { Element3D: SVGElement3D } = RendererRegistry.getRendererType().prototype;
/* *
 *
 *  Class
 *
 * */
class SVGElement3DCylinder extends SVGElement3D {
    constructor() {
        /* *
         *
         *  Properties
         *
         * */
        super(...arguments);
        this.parts = ['top', 'bottom', 'front', 'back'];
        this.pathType = 'cylinder';
    }
    /* *
     *
     *  Functions
     *
     * */
    fillSetter(fill) {
        this.singleSetterForParts('fill', null, {
            front: fill,
            back: fill,
            top: color(fill).brighten(0.1).get(),
            bottom: color(fill).brighten(-0.1).get()
        });
        // fill for animation getter (#6776)
        this.color = this.fill = fill;
        return this;
    }
}
/* *
 *
 *  Default Export
 *
 * */
export default SVGElement3DCylinder;
