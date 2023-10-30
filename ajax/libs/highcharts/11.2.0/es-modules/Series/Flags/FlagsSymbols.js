/* *
 *
 *  Imports
 *
 * */
import RendererRegistry from '../../Core/Renderer/RendererRegistry.js';
/* *
 *
 *  Composition
 *
 * */
var FlagsSymbols;
(function (FlagsSymbols) {
    /* *
     *
     *  Constants
     *
     * */
    const modifiedMembers = [];
    /* *
     *
     *  Functions
     *
     * */
    /* eslint-disable valid-jsdoc */
    /**
     * @private
     */
    function compose(SVGRendererClass) {
        if (modifiedMembers.indexOf(SVGRendererClass) === -1) {
            modifiedMembers.push(SVGRendererClass);
            const symbols = SVGRendererClass.prototype.symbols;
            symbols.flag = flag;
            createPinSymbol(symbols, 'circle');
            createPinSymbol(symbols, 'square');
        }
        const RendererClass = RendererRegistry.getRendererType();
        // The symbol callbacks are generated on the SVGRenderer object in all
        // browsers.
        if (modifiedMembers.indexOf(RendererClass)) {
            modifiedMembers.push(RendererClass);
        }
    }
    FlagsSymbols.compose = compose;
    /**
     * Create the flag icon with anchor.
     * @private
     */
    function flag(x, y, w, h, options) {
        const anchorX = (options && options.anchorX) || x, anchorY = (options && options.anchorY) || y;
        // To do: unwanted any cast because symbols.circle has wrong type, it
        // actually returns an SVGPathArray
        const path = this.circle(anchorX - 1, anchorY - 1, 2, 2);
        path.push(['M', anchorX, anchorY], ['L', x, y + h], ['L', x, y], ['L', x + w, y], ['L', x + w, y + h], ['L', x, y + h], ['Z']);
        return path;
    }
    /**
     * Create the circlepin and squarepin icons with anchor.
     * @private
     */
    function createPinSymbol(symbols, shape) {
        symbols[(shape + 'pin')] = function (x, y, w, h, options) {
            const anchorX = options && options.anchorX, anchorY = options && options.anchorY;
            let path;
            // For single-letter flags, make sure circular flags are not taller
            // than their width
            if (shape === 'circle' && h > w) {
                x -= Math.round((h - w) / 2);
                w = h;
            }
            path = (symbols[shape])(x, y, w, h);
            if (anchorX && anchorY) {
                /**
                 * If the label is below the anchor, draw the connecting line
                 * from the top edge of the label, otherwise start drawing from
                 * the bottom edge
                 */
                let labelX = anchorX;
                if (shape === 'circle') {
                    labelX = x + w / 2;
                }
                else {
                    const startSeg = path[0];
                    const endSeg = path[1];
                    if (startSeg[0] === 'M' && endSeg[0] === 'L') {
                        labelX = (startSeg[1] + endSeg[1]) / 2;
                    }
                }
                const labelY = (y > anchorY) ? y : y + h;
                path.push([
                    'M',
                    labelX,
                    labelY
                ], [
                    'L',
                    anchorX,
                    anchorY
                ]);
                path = path.concat(symbols.circle(anchorX - 1, anchorY - 1, 2, 2));
            }
            return path;
        };
    }
})(FlagsSymbols || (FlagsSymbols = {}));
/* *
 *
 *  Default Export
 *
 * */
export default FlagsSymbols;
