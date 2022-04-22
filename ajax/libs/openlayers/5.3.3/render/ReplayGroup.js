/**
 * @module ol/render/ReplayGroup
 */
import {abstract} from '../util.js';

/**
 * Base class for replay groups.
 */
var ReplayGroup = function ReplayGroup () {};

ReplayGroup.prototype.getReplay = function getReplay (zIndex, replayType) {
  return abstract();
};

/**
 * @abstract
 * @return {boolean} Is empty.
 */
ReplayGroup.prototype.isEmpty = function isEmpty () {
  return abstract();
};

/**
 * @abstract
 * @param {boolean} group Group with previous replay
 * @return {Array<*>} The resulting instruction group
 */
ReplayGroup.prototype.addDeclutter = function addDeclutter (group) {
  return abstract();
};

export default ReplayGroup;

//# sourceMappingURL=ReplayGroup.js.map