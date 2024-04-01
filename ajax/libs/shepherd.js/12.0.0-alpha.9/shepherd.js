/*! shepherd.js 12.0.0-alpha.9 */

'use strict';

var tour = require('./tour.js');
var utils_general = require('./utils/general.js');
var step = require('./step-CRAnUe50.js');
require('./evented.js');
require('./utils/type-check.js');
require('./utils/auto-bind.js');
require('./utils/context.js');
require('./utils/cleanup.js');
require('./utils/datarequest.js');
require('./utils/overlay-path.js');
require('./floating-ui-DpLkHwv0.js');
require('./utils/bind.js');

const isServerSide = typeof window === 'undefined';
tour.Shepherd.Step = isServerSide ? utils_general.StepNoOp : step.Step;
tour.Shepherd.Tour = isServerSide ? utils_general.TourNoOp : tour.Tour;

module.exports = tour.Shepherd;
//# sourceMappingURL=shepherd.js.map
