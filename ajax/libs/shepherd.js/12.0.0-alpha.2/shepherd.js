/*! shepherd.js 12.0.0-alpha.2 */

import { S as Step } from './step-CG9jN0WB.js';
import { Shepherd, Tour } from './tour.js';
import './floating-ui-rpFK6I5d.js';
import './utils/general.js';
import './utils/type-check.js';
import './evented.js';
import './utils/auto-bind.js';
import './utils/bind.js';
import './utils/cleanup.js';
import './utils/datarequest.js';
import './utils/overlay-path.js';

const isServerSide = typeof window === 'undefined';
class NoOp {
    constructor() { }
}
if (isServerSide) {
    Object.assign(Shepherd, { Tour: NoOp, Step: NoOp });
}
else {
    Object.assign(Shepherd, { Tour, Step });
}

export { Shepherd as default };
//# sourceMappingURL=shepherd.js.map
