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
var PointAndFigureSymbols;
(function (PointAndFigureSymbols) {
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
            symbols.cross = cross;
        }
        const RendererClass = RendererRegistry.getRendererType();
        // The symbol callbacks are generated on the SVGRenderer object in all
        // browsers.
        if (modifiedMembers.indexOf(RendererClass)) {
            modifiedMembers.push(RendererClass);
        }
    }
    PointAndFigureSymbols.compose = compose;
    /**
     *
     */
    function cross(x, y, w, h) {
        return [
            ['M', x, y],
            ['L', x + w, y + h],
            ['M', x + w, y],
            ['L', x, y + h],
            ['Z']
        ];
    }
})(PointAndFigureSymbols || (PointAndFigureSymbols = {}));
/* *
 *
 *  Default Export
 *
 * */
export default PointAndFigureSymbols;
