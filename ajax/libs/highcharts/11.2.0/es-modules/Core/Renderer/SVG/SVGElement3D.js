/* *
 *
 *  (c) 2010-2021 Torstein Honsi
 *
 *  Extensions to the SVGRenderer class to enable 3D shapes
 *
 *  License: www.highcharts.com/license
 *
 *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
 *
 * */
'use strict';
import Color from '../../Color/Color.js';
const { parse: color } = Color;
import RendererRegistry from '../RendererRegistry.js';
const { Element: SVGElement } = RendererRegistry.getRendererType().prototype;
import U from '../../Utilities.js';
const { defined, pick } = U;
/* *
 *
 *  Class
 *
 * */
class SVGElement3D extends SVGElement {
    constructor() {
        /* *
         *
         *  Static Properties
         *
         * */
        super(...arguments);
        /* *
         *
         *  Properties
         *
         * */
        this.parts = ['front', 'top', 'side'];
        this.pathType = 'cuboid';
    }
    /* *
     *
     *  Functions
     *
     * */
    /**
     * The init is used by base - renderer.Element
     * @private
     */
    initArgs(args) {
        const elem3d = this, renderer = elem3d.renderer, paths = renderer[elem3d.pathType + 'Path'](args), zIndexes = paths.zIndexes;
        // build parts
        for (const part of elem3d.parts) {
            const attribs = {
                'class': 'highcharts-3d-' + part,
                zIndex: zIndexes[part] || 0
            };
            if (renderer.styledMode) {
                if (part === 'top') {
                    attribs.filter = 'url(#highcharts-brighter)';
                }
                else if (part === 'side') {
                    attribs.filter = 'url(#highcharts-darker)';
                }
            }
            elem3d[part] = renderer.path(paths[part])
                .attr(attribs)
                .add(elem3d);
        }
        elem3d.attr({
            'stroke-linejoin': 'round',
            zIndex: zIndexes.group
        });
        // Store information if any side of element was rendered by force.
        elem3d.forcedSides = paths.forcedSides;
    }
    /**
     * Single property setter that applies options to each part
     * @private
     */
    singleSetterForParts(prop, val, values, verb, duration, complete) {
        const elem3d = this, newAttr = {}, optionsToApply = [null, null, (verb || 'attr'), duration, complete], hasZIndexes = values && values.zIndexes;
        if (!values) {
            newAttr[prop] = val;
            optionsToApply[0] = newAttr;
        }
        else {
            // It is needed to deal with the whole group zIndexing
            // in case of graph rotation
            if (hasZIndexes && hasZIndexes.group) {
                elem3d.attr({
                    zIndex: hasZIndexes.group
                });
            }
            for (const part of Object.keys(values)) {
                newAttr[part] = {};
                newAttr[part][prop] = values[part];
                // include zIndexes if provided
                if (hasZIndexes) {
                    newAttr[part].zIndex = values.zIndexes[part] || 0;
                }
            }
            optionsToApply[1] = newAttr;
        }
        return this.processParts.apply(elem3d, optionsToApply);
    }
    /**
     * Calls function for each part. Used for attr, animate and destroy.
     * @private
     */
    processParts(props, partsProps, verb, duration, complete) {
        const elem3d = this;
        for (const part of elem3d.parts) {
            // if different props for different parts
            if (partsProps) {
                props = pick(partsProps[part], false);
            }
            // only if something to set, but allow undefined
            if (props !== false) {
                elem3d[part][verb](props, duration, complete);
            }
        }
        return elem3d;
    }
    /**
     * Destroy all parts
     * @private
     */
    destroy() {
        this.processParts(null, null, 'destroy');
        return super.destroy();
    }
    // Following functions are SVGElement3DCuboid (= base)
    attr(args, val, complete, continueAnimation) {
        // Resolve setting attributes by string name
        if (typeof args === 'string' && typeof val !== 'undefined') {
            const key = args;
            args = {};
            args[key] = val;
        }
        if (args.shapeArgs || defined(args.x)) {
            return this.singleSetterForParts('d', null, this.renderer[this.pathType + 'Path'](args.shapeArgs || args));
        }
        return super.attr(args, void 0, complete, continueAnimation);
    }
    animate(args, duration, complete) {
        if (defined(args.x) && defined(args.y)) {
            const paths = this.renderer[this.pathType + 'Path'](args), forcedSides = paths.forcedSides;
            this.singleSetterForParts('d', null, paths, 'animate', duration, complete);
            this.attr({
                zIndex: paths.zIndexes.group
            });
            // If sides that are forced to render changed, recalculate colors.
            if (forcedSides !== this.forcedSides) {
                this.forcedSides = forcedSides;
                if (!this.renderer.styledMode) {
                    this.fillSetter(this.fill);
                }
            }
        }
        else {
            super.animate(args, duration, complete);
        }
        return this;
    }
    fillSetter(fill) {
        const elem3d = this;
        elem3d.forcedSides = elem3d.forcedSides || [];
        elem3d.singleSetterForParts('fill', null, {
            front: fill,
            // Do not change color if side was forced to render.
            top: color(fill).brighten(elem3d.forcedSides.indexOf('top') >= 0 ? 0 : 0.1).get(),
            side: color(fill).brighten(elem3d.forcedSides.indexOf('side') >= 0 ? 0 : -0.1).get()
        });
        // fill for animation getter (#6776)
        elem3d.color = elem3d.fill = fill;
        return elem3d;
    }
}
SVGElement3D.types = {
    base: SVGElement3D,
    cuboid: SVGElement3D
};
/* *
 *
 *  Default Export
 *
 * */
export default SVGElement3D;
