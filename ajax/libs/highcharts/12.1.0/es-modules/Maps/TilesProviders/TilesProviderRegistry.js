/* *
 *
 *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
 *
 * */
'use strict';
/* *
 *
 *  Imports
 *
 * */
import OpenStreetMap from './OpenStreetMap.js';
import Stamen from './Stamen.js';
import LimaLabs from './LimaLabs.js';
import Thunderforest from './Thunderforest.js';
import Esri from './Esri.js';
import USGS from './USGS.js';
/* *
 *
 *  Constants
 *
 * */
const tilesProviderRegistry = {
    Esri,
    LimaLabs,
    OpenStreetMap,
    Stamen,
    Thunderforest,
    USGS
};
/* *
 *
 *  Default Export
 *
 * */
export default tilesProviderRegistry;
