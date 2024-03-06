/*! @name videojs-contrib-quality-levels @version 4.1.0 @license Apache-2.0 */
import videojs from 'video.js';

/**
 * A single QualityLevel.
 *
 * interface QualityLevel {
 *   readonly attribute DOMString id;
 *            attribute DOMString label;
 *   readonly attribute long width;
 *   readonly attribute long height;
 *   readonly attribute long bitrate;
 *            attribute boolean enabled;
 * };
 *
 * @class QualityLevel
 */
class QualityLevel {
  /**
   * Creates a QualityLevel
   *
   * @param {Representation|Object} representation The representation of the quality level
   * @param {string}   representation.id        Unique id of the QualityLevel
   * @param {number=}  representation.width     Resolution width of the QualityLevel
   * @param {number=}  representation.height    Resolution height of the QualityLevel
   * @param {number}   representation.bandwidth Bitrate of the QualityLevel
   * @param {number=}  representation.frameRate Frame-rate of the QualityLevel
   * @param {Function} representation.enabled   Callback to enable/disable QualityLevel
   */
  constructor(representation) {
    let level = this; // eslint-disable-line

    level.id = representation.id;
    level.label = level.id;
    level.width = representation.width;
    level.height = representation.height;
    level.bitrate = representation.bandwidth;
    level.frameRate = representation.frameRate;
    level.enabled_ = representation.enabled;
    Object.defineProperty(level, 'enabled', {
      /**
       * Get whether the QualityLevel is enabled.
       *
       * @return {boolean} True if the QualityLevel is enabled.
       */
      get() {
        return level.enabled_();
      },
      /**
       * Enable or disable the QualityLevel.
       *
       * @param {boolean} enable true to enable QualityLevel, false to disable.
       */
      set(enable) {
        level.enabled_(enable);
      }
    });
    return level;
  }
}

/**
 * A list of QualityLevels.
 *
 * interface QualityLevelList : EventTarget {
 *   getter QualityLevel (unsigned long index);
 *   readonly attribute unsigned long length;
 *   readonly attribute long selectedIndex;
 *
 *   void addQualityLevel(QualityLevel qualityLevel)
 *   void removeQualityLevel(QualityLevel remove)
 *   QualityLevel? getQualityLevelById(DOMString id);
 *
 *   attribute EventHandler onchange;
 *   attribute EventHandler onaddqualitylevel;
 *   attribute EventHandler onremovequalitylevel;
 * };
 *
 * @extends videojs.EventTarget
 * @class QualityLevelList
 */
class QualityLevelList extends videojs.EventTarget {
  /**
   * Creates a QualityLevelList.
   */
  constructor() {
    super();
    let list = this; // eslint-disable-line

    list.levels_ = [];
    list.selectedIndex_ = -1;

    /**
     * Get the index of the currently selected QualityLevel.
     *
     * @returns {number} The index of the selected QualityLevel. -1 if none selected.
     * @readonly
     */
    Object.defineProperty(list, 'selectedIndex', {
      get() {
        return list.selectedIndex_;
      }
    });

    /**
     * Get the length of the list of QualityLevels.
     *
     * @returns {number} The length of the list.
     * @readonly
     */
    Object.defineProperty(list, 'length', {
      get() {
        return list.levels_.length;
      }
    });
    list[Symbol.iterator] = () => list.levels_.values();
    return list;
  }

  /**
   * Adds a quality level to the list.
   *
   * @param {Representation|Object} representation The representation of the quality level
   * @param {string}   representation.id        Unique id of the QualityLevel
   * @param {number=}  representation.width     Resolution width of the QualityLevel
   * @param {number=}  representation.height    Resolution height of the QualityLevel
   * @param {number}   representation.bandwidth Bitrate of the QualityLevel
   * @param {number=}  representation.frameRate Frame-rate of the QualityLevel
   * @param {Function} representation.enabled   Callback to enable/disable QualityLevel
   * @return {QualityLevel} the QualityLevel added to the list
   * @method addQualityLevel
   */
  addQualityLevel(representation) {
    let qualityLevel = this.getQualityLevelById(representation.id);

    // Do not add duplicate quality levels
    if (qualityLevel) {
      return qualityLevel;
    }
    const index = this.levels_.length;
    qualityLevel = new QualityLevel(representation);
    if (!('' + index in this)) {
      Object.defineProperty(this, index, {
        get() {
          return this.levels_[index];
        }
      });
    }
    this.levels_.push(qualityLevel);
    this.trigger({
      qualityLevel,
      type: 'addqualitylevel'
    });
    return qualityLevel;
  }

  /**
   * Removes a quality level from the list.
   *
   * @param {QualityLevel} qualityLevel The QualityLevel to remove from the list.
   * @return {QualityLevel|null} the QualityLevel removed or null if nothing removed
   * @method removeQualityLevel
   */
  removeQualityLevel(qualityLevel) {
    let removed = null;
    for (let i = 0, l = this.length; i < l; i++) {
      if (this[i] === qualityLevel) {
        removed = this.levels_.splice(i, 1)[0];
        if (this.selectedIndex_ === i) {
          this.selectedIndex_ = -1;
        } else if (this.selectedIndex_ > i) {
          this.selectedIndex_--;
        }
        break;
      }
    }
    if (removed) {
      this.trigger({
        qualityLevel,
        type: 'removequalitylevel'
      });
    }
    return removed;
  }

  /**
   * Searches for a QualityLevel with the given id.
   *
   * @param {string} id The id of the QualityLevel to find.
   * @return {QualityLevel|null} The QualityLevel with id, or null if not found.
   * @method getQualityLevelById
   */
  getQualityLevelById(id) {
    for (let i = 0, l = this.length; i < l; i++) {
      const level = this[i];
      if (level.id === id) {
        return level;
      }
    }
    return null;
  }

  /**
   * Resets the list of QualityLevels to empty
   *
   * @method dispose
   */
  dispose() {
    this.selectedIndex_ = -1;
    this.levels_.length = 0;
  }
}

/**
 * change - The selected QualityLevel has changed.
 * addqualitylevel - A QualityLevel has been added to the QualityLevelList.
 * removequalitylevel - A QualityLevel has been removed from the QualityLevelList.
 */
QualityLevelList.prototype.allowedEvents_ = {
  change: 'change',
  addqualitylevel: 'addqualitylevel',
  removequalitylevel: 'removequalitylevel'
};

// emulate attribute EventHandler support to allow for feature detection
for (const event in QualityLevelList.prototype.allowedEvents_) {
  QualityLevelList.prototype['on' + event] = null;
}

var version = "4.1.0";

/**
 * Initialization function for the qualityLevels plugin. Sets up the QualityLevelList and
 * event handlers.
 *
 * @param {Player} player Player object.
 * @param {Object} options Plugin options object.
 * @return {QualityLevelList} a list of QualityLevels
 */
const initPlugin = function (player, options) {
  const originalPluginFn = player.qualityLevels;
  const qualityLevelList = new QualityLevelList();
  const disposeHandler = function () {
    qualityLevelList.dispose();
    player.qualityLevels = originalPluginFn;
    player.off('dispose', disposeHandler);
  };
  player.on('dispose', disposeHandler);
  player.qualityLevels = () => qualityLevelList;
  player.qualityLevels.VERSION = version;
  return qualityLevelList;
};

/**
 * A video.js plugin.
 *
 * In the plugin function, the value of `this` is a video.js `Player`
 * instance. You cannot rely on the player being in a "ready" state here,
 * depending on how the plugin is invoked. This may or may not be important
 * to you; if not, remove the wait for "ready"!
 *
 * @param {Object} options Plugin options object
 * @return {QualityLevelList} a list of QualityLevels
 */
const qualityLevels = function (options) {
  return initPlugin(this, videojs.obj.merge({}, options));
};

// Register the plugin with video.js.
videojs.registerPlugin('qualityLevels', qualityLevels);

// Include the version number.
qualityLevels.VERSION = version;

export { qualityLevels as default };
