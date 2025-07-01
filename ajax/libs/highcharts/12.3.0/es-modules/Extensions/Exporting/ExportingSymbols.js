/* *
 *
 *  Exporting module
 *
 *  (c) 2010-2025 Torstein Honsi
 *
 *  License: www.highcharts.com/license
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
var ExportingSymbols;
(function (ExportingSymbols) {
    /* *
     *
     *  Constants
     *
     * */
    const modifiedClasses = [];
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
        if (modifiedClasses.indexOf(SVGRendererClass) === -1) {
            modifiedClasses.push(SVGRendererClass);
            const symbols = SVGRendererClass.prototype.symbols;
            symbols.menu = menu;
            symbols.menuball = menuball.bind(symbols);
        }
    }
    ExportingSymbols.compose = compose;
    /**
     * @private
     */
    function menu(x, y, width, height) {
        const arr = [
            ['M', x, y + 2.5],
            ['L', x + width, y + 2.5],
            ['M', x, y + height / 2 + 0.5],
            ['L', x + width, y + height / 2 + 0.5],
            ['M', x, y + height - 1.5],
            ['L', x + width, y + height - 1.5]
        ];
        return arr;
    }
    /**
     * @private
     */
    function menuball(x, y, width, height) {
        const h = (height / 3) - 2;
        let path = [];
        path = path.concat(this.circle(width - h, y, h, h), this.circle(width - h, y + h + 4, h, h), this.circle(width - h, y + 2 * (h + 4), h, h));
        return path;
    }
})(ExportingSymbols || (ExportingSymbols = {}));
/* *
 *
 *  Default Export
 *
 * */
export default ExportingSymbols;
