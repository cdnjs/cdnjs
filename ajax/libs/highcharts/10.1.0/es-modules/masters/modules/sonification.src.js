/**
 * @license Highcharts JS v10.1.0 (2022-04-29)
 * @module highcharts/modules/sonification
 * @requires highcharts
 *
 * Sonification module
 *
 * (c) 2012-2021 Øystein Moseng
 *
 * License: www.highcharts.com/license
 */
'use strict';
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
import Highcharts from '../../Core/Globals.js';
import ChartSonify from '../../Extensions/Sonification/ChartSonify.js';
import Earcon from '../../Extensions/Sonification/Earcon.js';
import Instrument from '../../Extensions/Sonification/Instrument.js';
import PointSonify from '../../Extensions/Sonification/PointSonify.js';
import SeriesSonify from '../../Extensions/Sonification/SeriesSonify.js';
import Sonification from '../../Extensions/Sonification/Sonification.js';
import Timeline from '../../Extensions/Sonification/Timeline.js';
import TimelineEvent from '../../Extensions/Sonification/TimelineEvent.js';
import TimelinePath from '../../Extensions/Sonification/TimelinePath.js';
var G = Highcharts;
G.sonification = __assign(__assign({}, Sonification), { instruments: Instrument.definitions, Earcon: Earcon,
    Instrument: Instrument,
    Timeline: Timeline,
    TimelineEvent: TimelineEvent,
    TimelinePath: TimelinePath });
G.Earcon = Earcon;
G.Instrument = Instrument;
ChartSonify.compose(G.Chart);
SeriesSonify.compose(G.Series);
PointSonify.compose(G.Point);
