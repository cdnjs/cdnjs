/* *
 * USGS provider, used for tile map services
 * */
'use strict';
/* *
 *
 *  Class
 *
 * */
class USGS {
    constructor() {
        /* *
         *
         *  Properties
         *
         * */
        this.defaultCredits = ('Tiles courtesy of the <a href="https://usgs.gov/">U.S. Geological' +
            'Survey</a>');
        this.initialProjectionName = 'WebMercator';
        this.themes = {
            USTopo: {
                url: 'https://basemap.nationalmap.gov/arcgis/rest/services/USGSTopo/MapServer/tile/{z}/{y}/{x}',
                minZoom: 0,
                maxZoom: 20
            },
            USImagery: {
                url: 'https://basemap.nationalmap.gov/arcgis/rest/services/USGSImageryOnly/MapServer/tile/{z}/{y}/{x}',
                minZoom: 0,
                maxZoom: 20
            },
            USImageryTopo: {
                url: 'https://basemap.nationalmap.gov/arcgis/rest/services/USGSImageryTopo/MapServer/tile/{z}/{y}/{x}',
                minZoom: 0,
                maxZoom: 20
            }
        };
    }
}
/* *
 *
 *  Default Export
 *
 * */
export default USGS;
