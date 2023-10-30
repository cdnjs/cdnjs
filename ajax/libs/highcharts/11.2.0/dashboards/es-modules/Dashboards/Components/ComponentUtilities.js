/* *
 *
 *  (c) 2009 - 2023 Highsoft AS
 *
 *  License: www.highcharts.com/license
 *
 *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
 *
 *  Authors:
 *  - Sebastian Bochan
 *  - Wojciech Chmiel
 *  - Gøran Slettemark
 *  - Sophie Bremer
 *
 * */
'use strict';
/* *
 *
 *  Namespace
 *
 * */
var ComponentUtilities;
(function (ComponentUtilities) {
    /* *
     *
     *  Functions
     *
     * */
    function getMargins(element, includeBorders = true) {
        const borders = {
            x: ['borderLeft', 'borderRight'],
            y: ['borderTop', 'borderBottom']
        };
        return {
            y: getStyles(element, [
                'marginTop',
                'marginBottom',
                ...(includeBorders ? borders.y : [])
            ]).reduce(sumPixels, 0),
            x: getStyles(element, [
                'marginLeft',
                'marginTop',
                ...(includeBorders ? borders.x : [])
            ]).reduce(sumPixels, 0)
        };
    }
    ComponentUtilities.getMargins = getMargins;
    function getPaddings(element) {
        return {
            x: getStyles(element, ['paddingLeft', 'paddingRight']).reduce(sumPixels, 0),
            y: getStyles(element, ['paddingTop', 'paddingBottom']).reduce(sumPixels, 0)
        };
    }
    ComponentUtilities.getPaddings = getPaddings;
    function getStyles(element, styles) {
        const elementStyles = window.getComputedStyle(element);
        return styles.map((style) => elementStyles[style]); // Cannot use getPropertyValue?
    }
    ComponentUtilities.getStyles = getStyles;
    function sumPixels(accumulator, value) {
        if (value) {
            accumulator += (typeof value === 'number' ? value : parseFloat(value));
        }
        return accumulator;
    }
    ComponentUtilities.sumPixels = sumPixels;
})(ComponentUtilities || (ComponentUtilities = {}));
/* *
 *
 *  Default Export
 *
 * */
export default ComponentUtilities;
