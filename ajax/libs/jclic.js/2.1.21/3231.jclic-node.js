"use strict";
exports.id = 3231;
exports.ids = [3231];
exports.modules = {

/***/ 3231:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* unused harmony export IdentifyText */
/* harmony import */ var _Activity_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1567);
/* harmony import */ var _TextActivityBase_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(743);
/**
 *  File    : activities/text/Identify.js
 *  Created : 20/06/2015
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




/**
 * This type of text activity suggests users to click on specific words or single letters of a
 * given text, without any help on where these elements are placed.
 * @extends module:activities/text/TextActivityBase.TextActivityBase
 */
class IdentifyText extends _TextActivityBase_js__WEBPACK_IMPORTED_MODULE_1__/* .TextActivityBase */ .q {
  /**
   * IdentifyText constructor
   * @param {module:project/JClicProject.JClicProject} project - The project to which this activity belongs
   */
  constructor(project) {
    super(project);
  }
}

/**
 * The {@link module:activities/text/TextActivityBase.TextActivityBasePanel TextActivityBasePanel} where {@link module:activities/text/IdentifyText.IdentifyText IdentifyText} activities are played.
 * @extends module:activities/text/TextActivityBase.TextActivityBasePanel
 */
class IdentifyTextPanel extends _TextActivityBase_js__WEBPACK_IMPORTED_MODULE_1__/* .TextActivityBasePanel */ .c {
  /**
   * IdentifyTextPanel constructor
   * @param {module:Activity.Activity} act - The {@link module:Activity.Activity Activity} to which this Panel belongs
   * @param {module:JClicPlayer.JClicPlayer} ps - Any object implementing the methods defined in the
   * [PlayStation](http://projectestac.github.io/jclic/apidoc/edu/xtec/jclic/PlayStation.html) Java interface.
   * @param {external:jQuery} [$div] - The jQuery DOM element where this Panel will deploy
   */
  constructor(act, ps, $div) {
    super(act, ps, $div);
    this.spanText = true;
    this.spanChars = act.type === 'identifyChars';
    this.spansChecked = new Set();
  }

  /**
   * Creates a target DOM element for the provided target.
   * @override
   * @param {module:activities/text/TextActivityDocument.TextTarget} target - The target related to the DOM object to be created
   * @param {external:jQuery} $span -  - An initial DOM object (usually a `span`) that can be used
   * to store the target, or replaced by another type of object.
   * @returns {external:jQuery} - The jQuery DOM element loaded with the target data.
   */
  $createTargetElement(target, $span) {
    super.$createTargetElement(target, $span);
    const idLabel = `target${`000${this.targets.length - 1}`.slice(-3)}`;
    $span.bind('click', event => {
      event.textTarget = target;
      event.idLabel = idLabel;
      this.processEvent(event);
    });
    return $span;
  }

  $createSpanElement($span) {
    $span.bind('click', event => {
      event.$spanElement = $span;
      this.processEvent(event);
    });
    return $span;
  }

  /**
   * Basic initialization procedure
   * @override
   */
  initActivity() {
    super.initActivity(this);
    this.$div.find('.JClicTextDocument > p').css('cursor', 'pointer');
    this.$div.find('.JClicTextDocument > span').css('cursor', 'pointer');
    // Clean possible previous errors
    this.spansChecked.forEach($spanElement => $spanElement.css($spanElement.initialCSS || this.act.document.style['default'].css));
    this.spansChecked.clear();
    this.playing = true;
  }

  /**
   * Counts the number of targets that are solved
   * @returns {number}
   */
  countSolvedTargets() {
    return this.targets.filter(({ targetStatus }) => targetStatus === 'SOLVED').length;
  }

  /**
   * Evaluates all the targets in this panel. This method is usually called from the `Check` button.
   * @override
   * @returns {boolean} - `true` when all targets are OK, `false` otherwise.
   */
  evaluatePanel() {
    let targetsOk = 0;
    this.targets.forEach(target => {
      const ok = target.targetStatus === 'SOLVED';
      if (ok)
        targetsOk++;
      target.checkColors();
      this.ps.reportNewAction(this.act, 'SELECT', target.text, target.pos, ok, targetsOk);
    });


    if (targetsOk === this.targets.length && this.spansChecked.size === 0) {
      this.finishActivity(true);
      return true;
    } else {
      // Mark selected spans as error
      this.spansChecked.forEach($spanElement => $spanElement.css(this.act.document.style['targetError'].css));
      this.playEvent('finishedError');
    }
    return false;
  }

  /**
   * Ordinary ending of the activity, usually called form `processEvent`
   * @override
   * @param {boolean} result - `true` if the activity was successfully completed, `false` otherwise
   */
  finishActivity(result) {
    this.$div.find('.JClicTextDocument > p').css('cursor', 'pointer');
    return super.finishActivity(result);
  }

  /**
   * Main handler used to process mouse, touch, keyboard and edit events.
   * @override
   * @param {external:Event} event - The HTML event to be processed
   * @returns {boolean} - When this event handler returns `false`, jQuery will stop its
   * propagation through the DOM tree. See: {@link http://api.jquery.com/on}
   */
  processEvent(event) {
    if (!super.processEvent(event) ||
      event.timeStamp === this.lastTimeStamp)
      return false;

    if (event.timeStamp)
      this.lastTimeStamp = event.timeStamp;

    const target = event.textTarget;
    const $spanElement = event.$spanElement;

    switch (event.type) {
      case 'click':
        let text, pos, ok = false;
        if (target) {
          if (target.targetStatus === 'SOLVED')
            target.targetStatus = 'HIDDEN';
          else {
            target.targetStatus = 'SOLVED';
            ok = true;
          }
          text = target.text;
          pos = target.pos;
          // TODO: Just on/off target colors, don't mark it as error!
          target.checkColors();
        } else {
          if ($spanElement) {
            $spanElement.checked = !$spanElement.checked;
            if ($spanElement.checked) {
              this.spansChecked.add($spanElement);
              $spanElement.css(this.act.document.style.target.css);
            }
            else {
              this.spansChecked.delete($spanElement);
              $spanElement.css($spanElement.initialCSS || this.act.document.style.default.css);
            }
            text = $spanElement.text();
          }
          else
            text = 'unknown';
          pos = 0;
        }

        if (!this.$checkButton) {
          // Check and notify action
          const cellsAtPlace = this.countSolvedTargets();
          this.ps.reportNewAction(this.act, 'SELECT', text, pos, ok, cellsAtPlace);

          // End activity or play event sound
          if (ok && this.spansChecked.size === 0 && cellsAtPlace === this.targets.length)
            this.finishActivity(true);
          else
            this.playEvent(ok ? 'actionOk' : 'actionError');
        }
        event.preventDefault();
        break;

      default:
        break;
    }
    return true;
  }
}

Object.assign(IdentifyTextPanel.prototype, {
  /**
   * Flag indicating if targets must be visually marked when the activity begins. In this type of
   * activity should be always `false` to avoid revealing the words o letters that must be found.
   * @name module:activities/text/IdentifyText.IdentifyTextPanel#targetsMarked
   * @type {boolean} */
  targetsMarked: false,
  /**
   * Used to avoid duplicate event processing
   * @name module:activities/text/IdentifyText.IdentifyTextPanel#lastTimeStamp
   * @type {number}
   */
  lastTimeStamp: 0,
  /**
   * Set of non-target spans currently selected by the player.
   * This attribute should be empty to solve the activity.
   * @name module:activities/text/IdentifyText.IdentifyTextPanel#spansChecked
   * @type {set} */
  spansChecked: new Set(),
});

/**
 * Panel class associated to this type of activity: {@link module:activities/text/IdentifyText.IdentifyTextPanel IdentifyTextPanel}
 * @type {class} */
IdentifyText.Panel = IdentifyTextPanel;

// Register activity class
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_Activity_js__WEBPACK_IMPORTED_MODULE_0__["default"].registerClass('@text.Identify', IdentifyText));


/***/ })

};
;
//# sourceMappingURL=3231.jclic-node.js.map