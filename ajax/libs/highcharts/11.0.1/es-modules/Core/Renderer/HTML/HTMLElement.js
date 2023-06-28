/* *
 *
 *  (c) 2010-2021 Torstein Honsi
 *
 *  License: www.highcharts.com/license
 *
 *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
 *
 * */
'use strict';
import H from '../../Globals.js';
const { isFirefox, isMS, isWebKit, win } = H;
import SVGElement from '../SVG/SVGElement.js';
import U from '../../Utilities.js';
const { css, defined, extend, pick, pInt } = U;
/* *
 *
 *  Constants
 *
 * */
const composedMembers = [];
/* *
 *
 *  Class
 *
 * */
/* eslint-disable valid-jsdoc */
class HTMLElement extends SVGElement {
    /* *
     *
     *  Static Functions
     *
     * */
    /**
     * Modifies SVGElement to support HTML elements.
     * @private
     */
    static compose(SVGElementClass) {
        if (U.pushUnique(composedMembers, SVGElementClass)) {
            const htmlElementProto = HTMLElement.prototype, svgElementProto = SVGElementClass.prototype;
            svgElementProto.getSpanCorrection = htmlElementProto
                .getSpanCorrection;
            svgElementProto.htmlCss = htmlElementProto.htmlCss;
            svgElementProto.htmlGetBBox = htmlElementProto.htmlGetBBox;
            svgElementProto.htmlUpdateTransform = htmlElementProto
                .htmlUpdateTransform;
            svgElementProto.setSpanRotation = htmlElementProto.setSpanRotation;
        }
        return SVGElementClass;
    }
    /* *
     *
     *  Functions
     *
     * */
    /**
     * Get the correction in X and Y positioning as the element is rotated.
     * @private
     */
    getSpanCorrection(width, baseline, alignCorrection) {
        this.xCorr = -width * alignCorrection;
        this.yCorr = -baseline;
    }
    /**
     * Apply CSS to HTML elements. This is used in text within SVG rendering.
     * @private
     */
    htmlCss(styles) {
        const wrapper = this, element = wrapper.element, 
        // When setting or unsetting the width style, we need to update
        // transform (#8809)
        isSettingWidth = (element.tagName === 'SPAN' &&
            styles &&
            'width' in styles), textWidth = pick(isSettingWidth && styles.width, void 0);
        let doTransform;
        if (isSettingWidth) {
            delete styles.width;
            wrapper.textWidth = textWidth;
            doTransform = true;
        }
        if (styles && styles.textOverflow === 'ellipsis') {
            styles.whiteSpace = 'nowrap';
            styles.overflow = 'hidden';
        }
        wrapper.styles = extend(wrapper.styles, styles);
        css(wrapper.element, styles);
        // Now that all styles are applied, to the transform
        if (doTransform) {
            wrapper.htmlUpdateTransform();
        }
        return wrapper;
    }
    /**
     * useHTML method for calculating the bounding box based on offsets.
     */
    htmlGetBBox() {
        const wrapper = this, element = wrapper.element;
        return {
            x: element.offsetLeft,
            y: element.offsetTop,
            width: element.offsetWidth,
            height: element.offsetHeight
        };
    }
    /**
     * @private
     */
    htmlUpdateTransform() {
        // aligning non added elements is expensive
        if (!this.added) {
            this.alignOnAdd = true;
            return;
        }
        const wrapper = this, renderer = wrapper.renderer, elem = wrapper.element, translateX = wrapper.translateX || 0, translateY = wrapper.translateY || 0, x = wrapper.x || 0, y = wrapper.y || 0, align = wrapper.textAlign || 'left', alignCorrection = {
            left: 0, center: 0.5, right: 1
        }[align], styles = wrapper.styles, whiteSpace = styles && styles.whiteSpace;
        /** @private */
        function getTextPxLength() {
            if (wrapper.textPxLength) {
                return wrapper.textPxLength;
            }
            // Reset multiline/ellipsis in order to read width (#4928,
            // #5417)
            css(elem, {
                width: '',
                whiteSpace: whiteSpace || 'nowrap'
            });
            return elem.offsetWidth;
        }
        // apply translate
        css(elem, {
            marginLeft: translateX,
            marginTop: translateY
        });
        if (elem.tagName === 'SPAN') {
            const rotation = wrapper.rotation, textWidth = wrapper.textWidth && pInt(wrapper.textWidth), currentTextTransform = [
                rotation,
                align,
                elem.innerHTML,
                wrapper.textWidth,
                wrapper.textAlign
            ].join(',');
            let baseline, hasBoxWidthChanged = false;
            // Update textWidth. Use the memoized textPxLength if possible, to
            // avoid the getTextPxLength function using elem.offsetWidth.
            // Calling offsetWidth affects rendering time as it forces layout
            // (#7656).
            if (textWidth !== wrapper.oldTextWidth) { // #983, #1254
                const textPxLength = getTextPxLength();
                if (((textWidth > wrapper.oldTextWidth) ||
                    textPxLength > textWidth) && (
                // Only set the width if the text is able to word-wrap,
                // or text-overflow is ellipsis (#9537)
                /[ \-]/.test(elem.textContent || elem.innerText) ||
                    elem.style.textOverflow === 'ellipsis')) {
                    css(elem, {
                        width: (textPxLength > textWidth) || rotation ?
                            textWidth + 'px' :
                            'auto',
                        display: 'block',
                        whiteSpace: whiteSpace || 'normal' // #3331
                    });
                    wrapper.oldTextWidth = textWidth;
                    hasBoxWidthChanged = true; // #8159
                }
            }
            wrapper.hasBoxWidthChanged = hasBoxWidthChanged; // #8159
            // Do the calculations and DOM access only if properties changed
            if (currentTextTransform !== wrapper.cTT) {
                baseline = renderer.fontMetrics(elem).b;
                // Renderer specific handling of span rotation, but only if we
                // have something to update.
                if (defined(rotation) &&
                    ((rotation !== (wrapper.oldRotation || 0)) ||
                        (align !== wrapper.oldAlign))) {
                    wrapper.setSpanRotation(rotation, alignCorrection, baseline);
                }
                wrapper.getSpanCorrection(
                // Avoid elem.offsetWidth if we can, it affects rendering
                // time heavily (#7656)
                ((!defined(rotation) && wrapper.textPxLength) || // #7920
                    elem.offsetWidth), baseline, alignCorrection, rotation, align);
            }
            // apply position with correction
            css(elem, {
                left: (x + (wrapper.xCorr || 0)) + 'px',
                top: (y + (wrapper.yCorr || 0)) + 'px'
            });
            // record current text transform
            wrapper.cTT = currentTextTransform;
            wrapper.oldRotation = rotation;
            wrapper.oldAlign = align;
        }
    }
    /**
     * Set the rotation of an individual HTML span.
     * @private
     */
    setSpanRotation(rotation, alignCorrection, baseline) {
        const getTransformKey = () => (isMS &&
            !/Edge/.test(win.navigator.userAgent) ?
            '-ms-transform' :
            isWebKit ?
                '-webkit-transform' :
                isFirefox ?
                    'MozTransform' :
                    win.opera ?
                        '-o-transform' :
                        void 0);
        const rotationStyle = {}, cssTransformKey = getTransformKey();
        if (cssTransformKey) {
            rotationStyle[cssTransformKey] = rotationStyle.transform =
                'rotate(' + rotation + 'deg)';
            rotationStyle[cssTransformKey + (isFirefox ? 'Origin' : '-origin')] = rotationStyle.transformOrigin =
                (alignCorrection * 100) + '% ' + baseline + 'px';
            css(this.element, rotationStyle);
        }
    }
}
/* *
 *
 *  Default Export
 *
 * */
export default HTMLElement;
