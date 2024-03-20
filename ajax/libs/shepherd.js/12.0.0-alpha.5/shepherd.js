/*! shepherd.js 12.0.0-alpha.5 */

import { Shepherd, Tour } from './tour.js';
import { StepNoOp, TourNoOp } from './utils/general.js';
import { S as Step } from './step-CnWL9xtp.js';
import './evented.js';
import './utils/type-check.js';
import './utils/auto-bind.js';
import './utils/cleanup.js';
import './utils/datarequest.js';
import './utils/overlay-path.js';
import './floating-ui-D-xkgvXV.js';
import './utils/bind.js';

const isServerSide = typeof window === 'undefined';
Shepherd.Step = isServerSide ? StepNoOp : Step;
Shepherd.Tour = isServerSide ? TourNoOp : Tour;

export { Shepherd as default };
//# sourceMappingURL=shepherd.js.map
