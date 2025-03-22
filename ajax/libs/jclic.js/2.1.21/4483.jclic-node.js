"use strict";
exports.id = 4483;
exports.ids = [4483];
exports.modules = {

/***/ 4483:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* unused harmony export PlayerHistory */
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(7750);
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _Utils_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(1253);
/**
 *  File    : PlayerHistory.js
 *  Created : 28/04/2015
 *  By      : Francesc Busquets <francesc@gmail.com>
 *
 *  JClic.js
 *  An HTML5 player of JClic activities
 *  https://projectestac.github.io/jclic.js
 *
 *  @source https://github.com/projectestac/jclic.js
 *
 *  @license EUPL-1.2
 *  @licstart
 *  (c) 2000-2020 Educational Telematic Network of Catalonia (XTEC)
 *
 *  Licensed under the EUPL, Version 1.1 or -as soon they will be approved by
 *  the European Commission- subsequent versions of the EUPL (the "Licence");
 *  You may not use this work except in compliance with the Licence.
 *
 *  You may obtain a copy of the Licence at:
 *  https://joinup.ec.europa.eu/software/page/eupl
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the Licence is distributed on an "AS IS" basis, WITHOUT
 *  WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
 *  Licence for the specific language governing permissions and limitations
 *  under the Licence.
 *  @licend
 *  @module
 */

/* global window */




/**
 *
 * PlayerHistory uses an array to store the list of projects and activities done by the user.
 * This class allows {@link module:JClicPlayer.JClicPlayer JClicPlayer} objects to rewind a sequence or to go back to a caller menu.
 */
class PlayerHistory {
  /**
   * PlayerHistory constructor
   * @param {module:JClicPlayer.JClicPlayer} player - The JClicPlayer associated to this history
   */
  constructor(player) {
    this.player = player;
    this.sequenceStack = [];
    if (window && window.history && player.options.browserHistory) {
      this.browserHistory = true;
      jquery__WEBPACK_IMPORTED_MODULE_0___default()(window).on('popstate', (ev) => {
        const state = ev.originalEvent.state;
        if (state)
          this.processPopStateEvent(state);
      });
    }
  }

  /**
   *
   * Process the `state` object received in a `popstate` event
   * @param {PlayerHistory#HistoryElement} state - The previously stored state
   */
  processPopStateEvent(state) {
    (0,_Utils_js__WEBPACK_IMPORTED_MODULE_1__/* .log */ .Rm)('info', 'Processing History popstate event with state:', state);
    this.processingPop = true;
    if (state.projectPath === this.player.project.path &&
      (0,_Utils_js__WEBPACK_IMPORTED_MODULE_1__/* .isEquivalent */ .l2)(state.fullZipPath, this.player.zip ? this.player.zip.fullZipPath : null))
      this.player.load(null, state.activity, null);
    else
      this.player.load(state.fullZipPath || state.projectPath, state.activity, null);
  }

  /**
   * Push a new entry on the window.History stack,
   * only when `browserHistory` is true and there is no `popstate` event in progress
   */
  pushBrowserHistory() {
    if (this.browserHistory) {

      if (this.processingPop) {
        // A 'popstate' event is currently being processed, so just clear this flag and return
        this.processingPop = false;
        return;
      }

      const
        ase = this.player.project.activitySequence,
        act = ase.currentAct,
        title = this.player.actPanel.act.name || 'No name',
        state = new this.HistoryElement(
          this.player.project.path,
          ase.getSequenceForElement(act),
          act,
          this.player.zip ? this.player.zip.fullZipPath : null);

      // Push a new history entry, or update the current one if it has no `state`
      if (!window.history.state)
        window.history.replaceState(state, title);
      else
        window.history.pushState(state, title);
    }
  }

  /**
   *
   * Counts the number of {@link module:PlayerHistory.PlayerHistory#HistoryElement HistoryElement} objects stored in
   * {@link module:PlayerHistory.PlayerHistory#sequenceStack sequenceStack}
   * @returns {number}
   */
  storedElementsCount() {
    return this.sequenceStack.length;
  }

  /**
   *
   * Removes all elements from {@link module:PlayerHistory.PlayerHistory#sequenceStack sequenceStack}
   */
  clearHistory() {
    this.sequenceStack = [0];
  }

  /**
   * Adds the current project and activity to the top of the history stack.
   */
  push() {
    if (this.player.project !== null && this.player.project.path !== null) {
      const
        ase = this.player.project.activitySequence,
        act = ase.currentAct;
      if (act >= 0) {
        if (this.sequenceStack.length > 0) {
          const last = this.sequenceStack[this.sequenceStack.length - 1];
          if (last.projectPath === this.player.project.path && last.activity === act)
            return;
        }
        this.sequenceStack.push(
          new this.HistoryElement(
            this.player.project.path,
            ase.getSequenceForElement(act),
            act,
            this.player.zip ? this.player.zip.fullZipPath : null));
      }
    }
  }

  /**
   * Retrieves the {@link module:PlayerHistory.PlayerHistory#HistoryElement HistoryElement} placed at the top of the
   * stack (if any) and instructs {@link module:JClicPlayer.JClicPlayer JClicPlayer} to load it. The obtained effect is to
   * "rewind" or "go back", usually to an activity that acts as a menu.
   * @returns {boolean}
   */
  pop() {
    // todo: check return value
    if (this.sequenceStack.length > 0) {
      const e = this.sequenceStack.pop();
      if (e.projectPath === this.player.project.path &&
        (0,_Utils_js__WEBPACK_IMPORTED_MODULE_1__/* .isEquivalent */ .l2)(e.fullZipPath, this.player.zip ? this.player.zip.fullZipPath : null))
        this.player.load(null, e.activity, null);
      else
        if (this.testMode && e.projectPath !== null && e.projectPath.length > 0)
          (0,_Utils_js__WEBPACK_IMPORTED_MODULE_1__/* .log */ .Rm)('info', `At this point, a jump to "${e.projectPath}" should be performed.`);
        else
          this.player.load(e.fullZipPath || e.projectPath, e.activity, null);
    }
    return true;
  }

  /**
   *
   * Processes the provided {@link module:bags/JumpInfo.JumpInfo JumpInfo} object, instructing {@link module:JClicPlayer.JClicPlayer JClicPlayer} to go back,
   * stop or jump to another point in the sequence.
   * @param {module:bags/JumpInfo.JumpInfo} ji - The object to be processed
   * @param {boolean} allowReturn - When this parameter is `true`, the jump instructed by `ji` (if any)
   * will be recorded, thus allowing to return to the current activity.
   * @returns {boolean} - `true` if the jump can be processed without errors, `false` otherwise.
   */
  processJump(ji, allowReturn) {
    let result = false;
    if (ji !== null && this.player.project !== null) {
      switch (ji.action) {
        case 'STOP':
          break;
        case 'RETURN':
          if (this.sequenceStack.length > 0 || !this.player.options.returnAsExit) {
            result = this.pop();
            break;
          }
        case 'EXIT':
          if (this.testMode)
            (0,_Utils_js__WEBPACK_IMPORTED_MODULE_1__/* .log */ .Rm)('info', 'At this point, the program should exit.');
          else
            this.player.exit(ji.sequence);
          break;
        case 'JUMP':
          if (!ji.sequence && !ji.projectPath) {
            const ase = this.player.project.activitySequence.getElement(ji.actNum, true);
            if (ase !== null) {
              if (allowReturn)
                this.push();
              this.player.load(null, null, ase.activity);
              result = true;
            }
          } else {
            if (this.testMode && ji.projectPath !== null && ji.projectPath.length > 0) {
              (0,_Utils_js__WEBPACK_IMPORTED_MODULE_1__/* .log */ .Rm)('info', `At this point, a jump to "${ji.projectPath}" should be performed.`);
            } else {
              result = this.jumpToSequence(ji.sequence,
                ji.projectPath ? (0,_Utils_js__WEBPACK_IMPORTED_MODULE_1__/* .getPath */ .Yn)(this.player.project.basePath, ji.projectPath) : null,
                allowReturn);
            }
          }
          break;
      }
    }
    return result;
  }

  /**
   * Performs a jump to the specified sequence
   * @param {string} sequence - The {@link module:bags/ActivitySequence.ActivitySequence ActivitySequence} tag to jump to.
   * @param {string} [path] - When not `null`, indicates a new project file that must be loaded.
   * Otherwise, the `sequence` parameter refers to a tag on the {@link module:bags/ActivitySequence.ActivitySequence ActivitySequence} of the
   * current project.
   * @param {boolean} [allowReturn] - When this parameter is `true`, the jump will be recorded, thus
   * allowing to return to the current activity.
   */
  jumpToSequence(sequence, path = null, allowReturn = false) {
    if ((0,_Utils_js__WEBPACK_IMPORTED_MODULE_1__/* .isNullOrUndef */ .Pj)(sequence) && (0,_Utils_js__WEBPACK_IMPORTED_MODULE_1__/* .isNullOrUndef */ .Pj)(path))
      return false;
    if ((0,_Utils_js__WEBPACK_IMPORTED_MODULE_1__/* .isNullOrUndef */ .Pj)(path))
      path = this.player.project.path;
    if (this.sequenceStack.length > 0) {
      const e = this.sequenceStack[this.sequenceStack.length - 1];
      if (!(0,_Utils_js__WEBPACK_IMPORTED_MODULE_1__/* .isNullOrUndef */ .Pj)(sequence) && path === e.projectPath) {
        let same = sequence === e.sequence;
        if (path === this.player.project.path) {
          const ase = this.player.project.activitySequence.getElement(e.activity, false);
          same = ase !== null && sequence === ase.tag;
        }
        if (same)
          return this.pop();
      }
    }
    if (allowReturn)
      this.push();
    if (path === this.player.project.path)
      this.player.load(null, sequence, null);
    else
      this.player.load(path, sequence, null);
    return true;
  }
}

Object.assign(PlayerHistory.prototype, {
  /**
   * The {@link module:JClicPlayer.JClicPlayer JClicPlayer} object to which this `PlayerHistory` belongs
   * @name module:PlayerHistory.PlayerHistory#player
   * @type {module:JClicPlayer.JClicPlayer} */
  player: null,
  /**
   * This is the main member of the class. PlayerHistory puts and retrieves
   * on it information about the proects and activities done by the current user.
   * @name module:PlayerHistory.PlayerHistory#sequenceStack
   * @type {module:PlayerHistory.PlayerHistory#HistoryElement[]} */
  sequenceStack: [],
  /**
   * When in test mode, jumps are only simulated.
   * @name module:PlayerHistory.PlayerHistory#testMode
   * @type {boolean} */
  testMode: false,
  /**
   * When true, JClic history is in sync with browser history
   * @name PlayerHistory#browserHistory
   * @type {boolean} */
  browserHistory: false,
  /**
   * When true, a window.history event is currently being processed, so window.pushState should not be performed
   * @name PlayerHistory#processingPop
   * @type {boolean} */
  processingPop: false,
  /**
   * Inner class used to store history elements.
   * @name module:PlayerHistory.PlayerHistory#HistoryElement
   */
  HistoryElement: class {
    /**
     * HistoryElement constructor
     * @param {string} projectPath - The full path of the project file
     * @param {string} sequence - The nearest sequence tag
     * @param {number} activity - The index of the current activity on the project's {@link module:bags/ActivitySequence.ActivitySequence ActivitySequence}
     * @param {string} fullZipPath - If `projectPath` resides in a {@link external:JSZip JSZip} object,
     * the full path of the zip file.
     */
    constructor(projectPath, sequence, activity, fullZipPath) {
      this.projectPath = projectPath;
      this.sequence = sequence;
      this.activity = activity;
      this.fullZipPath = fullZipPath;
    }
  }
});

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (PlayerHistory);


/***/ })

};
;
//# sourceMappingURL=4483.jclic-node.js.map