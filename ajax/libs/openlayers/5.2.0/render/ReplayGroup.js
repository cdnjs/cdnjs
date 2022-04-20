/**
 * @module ol/render/ReplayGroup
 */
/**
 * Base class for replay groups.
 */
var ReplayGroup = function ReplayGroup () {};

ReplayGroup.prototype.getReplay = function getReplay (zIndex, replayType) {};

/**
 * @abstract
 * @return {boolean} Is empty.
 */
ReplayGroup.prototype.isEmpty = function isEmpty () {};

export default ReplayGroup;

//# sourceMappingURL=ReplayGroup.js.map