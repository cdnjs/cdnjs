/*! shepherd.js 12.0.0-alpha.9 */

'use strict';

var utils_typeCheck = require('./type-check.js');

/**
 * Cleanup the steps and set pointerEvents back to 'auto'
 * @param tour The tour object
 */
function cleanupSteps(tour) {
    if (tour) {
        const { steps } = tour;
        steps.forEach((step) => {
            if (step.options &&
                step.options.canClickTarget === false &&
                step.options.attachTo) {
                if (utils_typeCheck.isHTMLElement(step.target)) {
                    step.target.classList.remove('shepherd-target-click-disabled');
                }
            }
        });
    }
}

exports.cleanupSteps = cleanupSteps;
//# sourceMappingURL=cleanup.js.map
