"use strict";
exports.id = 743;
exports.ids = [743];
exports.modules = {

/***/ 743:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   c: () => (/* binding */ TextActivityBasePanel),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   q: () => (/* binding */ TextActivityBase)
/* harmony export */ });
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(7750);
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _Utils_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(1253);
/* harmony import */ var _Activity_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(1567);
/* harmony import */ var _boxes_ActiveBox_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(1725);
/* harmony import */ var _boxes_BoxBase_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(3018);
/**
 *  File    : activities/text/TextActivityBase.js
 *  Created : 16/05/2015
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
 * This class and its visual component {@link module:activities/text/TextActivityBase.TextActivityBasePanel TextActivityBasePanel} are the base for text
 * activities like {@link module:activities/text/FillInBlanks.FillInBlanks FillInBlanks}, {@link module:activities/text/IdentifyText.IdentifyText IdentifyText}, {@link module:activities/text/OrderText.OrderText OrderText} and {@link module:activities/text/Complete.Complete Complete}.
 * @extends module:Activity.Activity
 */
class TextActivityBase extends _Activity_js__WEBPACK_IMPORTED_MODULE_2__/* .Activity */ .I {
  /**
   * TextActivityBase constructor
   * @param {module:project/JClicProject.JClicProject} project - The project to which this activity belongs
   */
  constructor(project) {
    super(project);
  }

  /**
   * Retrieves the minimum number of actions needed to solve this activity
   * @override
   * @returns {number}
   */
  getMinNumActions() {
    return this.document ? this.document.numTargets : 0;
  }
}

Object.assign(TextActivityBase.prototype, {
  /**
   * This is the object used to evaluate user's answers in text activities.
   * @name module:activities/text/TextActivityBase.TextActivityBase#ev
   * @type {module:activities/text/Evaluator.Evaluator} */
  ev: null,
  /**
   * This is the label used by text activities for the `check` button, when present.
   * @name module:activities/text/TextActivityBase.TextActivityBase#checkButtonText
   * @type {string} */
  checkButtonText: null,
  /**
   * When `true`, a text will be shown before the beginning of the activity.
   * @name module:activities/text/TextActivityBase.TextActivityBase#prevScreen
   * @type {boolean} */
  prevScreen: false,
  /**
   * Optional text to be shown before the beginning of the activity. When `null`, this text is
   * the main document.
   * @name module:activities/text/TextActivityBase.TextActivityBase#prevScreenText
   * @type {string} */
  prevScreenText: null,
  /**
   * The style of the optional text to be shown before the beginning of the activity.
   * @name module:activities/text/TextActivityBase.TextActivityBase#prevScreenStyle
   * @type {module:boxes/BoxBase.BoxBase} */
  prevScreenStyle: null,
  /**
   * Maximum amount of time for showing the previous document.
   * @name module:activities/text/TextActivityBase.TextActivityBase#prevScreenMaxTime
   * @type {number} */
  prevScreenMaxTime: -1,
});

/**
 * The {@link module:Activity.ActivityPanel ActivityPanel} where text activities (based on {@link module:activities/text/TextActivityBase.TextActivityBase TextActivityBase}) are played.
 * @extends module:Activity.ActivityPanel
 */
//export class TextActivityBasePanel extends Activity.Panel {
class TextActivityBasePanel extends _Activity_js__WEBPACK_IMPORTED_MODULE_2__/* .ActivityPanel */ .S {
  /**
   * TextActivityBasePanel constructor
   * @param {module:Activity.Activity} act - The {@link module:Activity.Activity Activity} to which this Panel belongs
   * @param {module:JClicPlayer.JClicPlayer} ps - Any object implementing the methods defined in the
   * [PlayStation](http://projectestac.github.io/jclic/apidoc/edu/xtec/jclic/PlayStation.html) Java interface.
   * @param {external:jQuery} [$div] - The jQuery DOM element where this Panel will deploy
   */
  constructor(act, ps, $div) {
    super(act, ps, $div);
    this.targets = [];
  }

  /**
   * Fills a jQuery DOM element (usually a 'div') with the specified {@link module:activities/text/TextActivityDocument.TextActivityDocument TextActivityDocument}.
   * @param {external:jQuery} $div - The jQuery DOM object to be filled with the document.
   * @param {module:activities/text/TextActivityDocument.TextActivityDocument} doc - The document
   */
  setDocContent($div, doc) {

    // Empties the container of any pre-existing content
    // and sets the background and other attributes indicated by the main
    // style of the document.
    // It also sets the 'overflow' CSS attribute to 'auto', which will display a
    // vertical scroll bar when needed
    $div.empty().css(doc.style['default'].css).css({ display: 'flex', 'flex-direction': 'column' });

    const $scroller = jquery__WEBPACK_IMPORTED_MODULE_0___default()('<div/>').css({ 'flex-grow': 1, overflow: 'auto' });
    const $doc = jquery__WEBPACK_IMPORTED_MODULE_0___default()('<div/>', { class: 'JClicTextDocument' }).css({ 'padding': 4 }).css(doc.style['default'].css);

    let currentPStyle = null;
    const popupSpans = [];

    //
    // Process paragraphs
    doc.p.forEach(p => {
      // Creates a new DOM paragraph
      const $p = jquery__WEBPACK_IMPORTED_MODULE_0___default()('<p/>').css({ margin: 0 });
      let empty = true;

      // Check if the paragraph has its own style
      if (p.style) {
        currentPStyle = doc.style[p.style].css;
        $p.css(currentPStyle);
      } else
        currentPStyle = null;

      // Check if the paragraph has a special alignment
      if (p.Alignment) {
        const al = Number(p.Alignment);
        $p.css({ 'text-align': al === 1 ? 'center' : al === 2 ? 'right' : 'left' });
      }

      // Process the paragraph elements
      p.elements.forEach(element => {
        // Elements will be inserted as 'span' DOM elements, or as simple text if they don't
        // have specific attributes.
        let $span;
        switch (element.objectType) {
          case 'text':
            const parsedText = jquery__WEBPACK_IMPORTED_MODULE_0___default()('<span/>').html(element.text).text();
            const fragments = this.spanText
              ? (0,_Utils_js__WEBPACK_IMPORTED_MODULE_1__/* .stringToWords */ .Mk)(parsedText)
              : [{ text: parsedText, sep: '' }];
            fragments.forEach(({ text, sep }) => {
              let initialCSS = { ...this.act.document.style['default'].css };
              if (element?.attr?.style)
                initialCSS = { ...initialCSS, ...doc.style[element.attr.style].css };
              if (element?.attr?.css)
                initialCSS = { ...initialCSS, ...element.attr.css };
              const txtBlocs = this.spanChars ? [...text] : [text];
              txtBlocs.forEach((str) => {
                if (element.attr) {
                  // Text uses a specific style and/or individual attributes
                  $span = jquery__WEBPACK_IMPORTED_MODULE_0___default()('<span/>').html(str).css(initialCSS);
                  // Save initialCSS for later use
                  $span.initialCSS = initialCSS;
                  $p.append(this.$createSpanElement($span));
                } else {
                  if (this.spanText) {
                    $span = jquery__WEBPACK_IMPORTED_MODULE_0___default()('<span/>').html(str);
                    $p.append(this.$createSpanElement($span));
                  }
                  else
                    $p.append(str);
                }
              });
              if (sep !== '')
                $p.append(sep);
            });
            break;

          case 'cell':
            // Create a new ActiveBox based on this ActiveBoxContent
            $span = jquery__WEBPACK_IMPORTED_MODULE_0___default()('<span/>');
            const box = _boxes_ActiveBox_js__WEBPACK_IMPORTED_MODULE_3__["default"].createCell($span.css({ position: 'relative' }), element);
            $span.css({ 'display': 'inline-block', 'vertical-align': 'middle' });
            if (element.mediaContent) {
              $span.on('click', event => {
                event.preventDefault();
                this.ps.stopMedia(1);
                box.playMedia(this.ps);
                return false;
              });
            }
            $p.append($span);
            break;

          case 'target':
            $span = jquery__WEBPACK_IMPORTED_MODULE_0___default()('<span/>');
            if (this.showingPrevScreen) {
              $span.text(element.text);
              $p.append($span);
              break;
            }

            const target = element;
            let $popup = null;
            // Process target popups
            if (target.infoMode !== 'no_info' && target.popupContent) {
              $popup = jquery__WEBPACK_IMPORTED_MODULE_0___default()('<span/>').css({ position: 'absolute', 'padding-top': '2pt', display: 'none' });
              // Create a new ActiveBox based on popupContent
              const popupBox = _boxes_ActiveBox_js__WEBPACK_IMPORTED_MODULE_3__["default"].createCell($popup, target.popupContent);
              if (target.popupContent.mediaContent) {
                $popup.on('click', event => {
                  event.preventDefault();
                  this.ps.stopMedia(1);
                  if (popupBox)
                    popupBox.playMedia(this.ps);
                  else if (target.popupContent.mediaContent)
                    this.ps.playMedia(target.popupContent.mediaContent);
                  return false;
                });
              }
              target.$popup = $popup;
              // Save for later setting of top-margin
              popupSpans.push({ p: $p, span: $popup, box: popupBox });
            }

            $span = this.$createTargetElement(target, $span);
            target.num = this.targets.length;
            target.pos = target.num;
            this.targets.push(target);
            if ($span) {
              $span.css(doc.style['default'].css);
              if (currentPStyle)
                $span.css(currentPStyle);
              if (this.targetsMarked) {
                if (target.attr) {
                  // Default style name for targets is 'target'
                  if (!target.attr.style)
                    target.attr.style = 'target';
                  $span.css(doc.style[target.attr.style].css);
                  // Check if target has specific attributes
                  if (target.attr.css)
                    $span.css(target.attr.css);
                } else if (doc.style['target'])
                  $span.css(doc.style['target'].css);
              } else {
                target.targetStatus = 'HIDDEN';
              }

              // Catch on-demand popups with `F1`, cancel with `Escape`
              if ($popup !== null && target.infoMode === 'onDemand') {
                $span.keydown(ev => {
                  if (ev.key === target.popupKey) {
                    ev.preventDefault();
                    this.showPopup($popup, target.popupMaxTime, target.popupDelay);
                  } else if (ev.key === 'Escape') {
                    ev.preventDefault();
                    this.showPopup(null);
                  }
                });
              }
            }

            if ($popup && $span) {
              if (target.isList)
                $p.append($span).append($popup);
              else
                $p.append($popup).append($span);
            } else if ($span)
              $p.append($span);

            target.$p = $p;
            break;
        }
        empty = false;
      });
      if (empty)
        // Don't leave paragraphs empty
        $p.html('&nbsp;');

      // Adds the paragraph to the DOM element
      $doc.append($p);
    });

    $div.append($scroller.append($doc));

    if (this.act.checkButtonText && !this.showingPrevScreen) {
      this.$checkButton = jquery__WEBPACK_IMPORTED_MODULE_0___default()('<button/>', { class: 'StockBtn' })
        .html(this.act.checkButtonText)
        .css({ width: '100%', 'flex-shrink': 0 })
        .on('click', () => this.evaluatePanel());
      $div.append(this.$checkButton);
    }

    // Place popups below its target baseline
    popupSpans.forEach(pspan => pspan.span.css({ 'margin-top': pspan.p.css('font-size') }));

    // Init Evaluator
    if (this.act.ev)
      this.act.ev.init(this.act.project.settings.locales);

    return $div;
  }

  /**
   * Creates a target DOM element.
   * This method can be overridden in subclasses to create specific types of targets.
   * @param {module:activities/text/TextActivityDocument.TextTarget} target - The target related to the DOM object to be created
   * @param {external:jQuery} $span - An initial DOM object (usually a `span`) that can be used
   * to store the target, or replaced by another type of object.
   * @returns {external:jQuery} - The jQuery DOM element loaded with the target data.
   */
  $createTargetElement(target, $span) {
    $span.text(target.text);
    target.$span = $span;
    return $span;
  }

  /**
   * Creates a 'span' element, used to isolate elements of text not involved in targets.
   * Used only when {@link spanText} is true.
   * @param {external:jQuery} $span - An initial DOM object (usually a `span`) that can be used
   * to store the target, or replaced by another type of object.
   * @returns {external:jQuery} - The jQuery DOM element loaded with the span data.
   */
  $createSpanElement($span) {
    return $span;
  }

  /**
   * Basic initialization procedure, common to all activities.
   * @override
   */
  initActivity() {
    if (this.act.prevScreen)
      this.preInitActivity();
    else
      this.startActivity();
  }

  /**
   * Called when the activity starts playing
   * @override
   */
  startActivity() {
    super.initActivity();
    this.setAndPlayMsg('initial', 'start');
    this.setDocContent(this.$div, this.act.document);
    this.playing = true;
  }

  /**
   * Called when the text activity has a 'previous screen' information to be shown before the
   * activity starts
   */
  preInitActivity() {
    if (!this.act.prevScreen)
      return;

    const prevScreenEnd = () => {
      this.showingPrevScreen = false;
      this.$div.unbind('click');
      if (this.prevScreenTimer) {
        window.clearTimeout(this.prevScreenTimer);
        this.prevScreenTimer = null;
      }
      this.startActivity();
      return true;
    };

    this.showingPrevScreen = true;
    this.$div.empty();

    if (!this.act.prevScreenText) {
      this.setDocContent(this.$div, this.act.document);
    } else {
      if (!this.act.prevScreenStyle)
        this.act.prevScreenStyle = new _boxes_BoxBase_js__WEBPACK_IMPORTED_MODULE_4__["default"]();
      this.$div.css(this.act.prevScreenStyle.getCSS()).css('overflow', 'auto');
      const $html = jquery__WEBPACK_IMPORTED_MODULE_0___default()('<div/>', { class: 'JClicTextDocument' })
        .css({ 'padding': 4 })
        .css(this.act.prevScreenStyle.getCSS())
        .append(this.act.prevScreenText);
      this.$div.append($html);
    }

    this.enableCounters(true, false, false);
    this.ps.setCounterValue('time', 0);

    this.ps.setMsg(this.act.messages['previous']);

    if (this.act.prevScreenMaxTime > 0) {
      this.ps.setCountDown('time', this.act.prevScreenMaxTime);
      this.prevScreenTimer = window.setTimeout(prevScreenEnd, this.act.prevScreenMaxTime * 1000);
    }

    this.$div.on('click', prevScreenEnd);
    this.ps.playMsg();
  }

  /**
   * Called when the user clicks on the check button
   * @returns {boolean} - `true` when the panel is OK, `false` otherwise.
   */
  evaluatePanel() {
    this.finishActivity(true);
    return true;
  }

  /**
   * Ordinary ending of the activity, usually called form `processEvent`
   * @override
   * @param {boolean} result - `true` if the activity was successfully completed, `false` otherwise
   */
  finishActivity(result) {
    if (this.$checkButton)
      this.$checkButton.prop('disabled', true);
    this.targets.forEach(t => {
      if (t.$comboList)
        t.$comboList.attr('disabled', true);
    });
    this.showPopup(null);
    super.finishActivity(result);
  }

  /**
   * Main handler used to process mouse, touch, keyboard and edit events
   * @override
   * @param {external:Event} _event - The HTML event to be processed
   * @returns {boolean} - When this event handler returns `false`, jQuery will stop its
   * propagation through the DOM tree. See: {@link http://api.jquery.com/on}
   */
  processEvent(_event) {
    return this.playing;
  }

  /**
   * @param {external:jQuery} $popup - The popup to display, or _null _ to just hide the current popup
   * @param {number} maxTime - The maximum time to mantain the popup on screen, in seconds
   * @param {number} waitTime - When set, indicates the number of seconds to wait before show the popup
   */
  showPopup($popup, maxTime, waitTime) {
    // Hide current popup
    if (this.$currentPopup) {
      this.$currentPopup.css({ display: 'none' });
      this.$currentPopup = null;
      if (this.currentPopupTimer) {
        window.clearTimeout(this.currentPopupTimer);
        this.currentPopupTimer = 0;
      }
    }

    // Clear popupWaitTimer
    if (this.popupWaitTimer) {
      window.clearTimeout(this.popupWaitTimer);
      this.popupWaitTimer = 0;
    }

    // Prepare popup timer
    if (waitTime) {
      this.popupWaitTimer = window.setTimeout(() => {
        this.showPopup($popup, maxTime);
      }, waitTime * 1000);
      return;
    }

    if ($popup) {
      $popup.css({ display: '' });
      $popup.trigger('click');

      this.$currentPopup = $popup;
      if (maxTime) {
        this.currentPopupTimer = window.setTimeout(() => {
          $popup.css({ display: 'none' });
          if (this.$currentPopup === $popup) {
            this.$currentPopup = null;
            this.currentPopupTimer = 0;
          }
        }, maxTime * 1000);
      }
    }
  }
}

Object.assign(TextActivityBasePanel.prototype, {
  /**
   * Array of jQuery DOM elements (usually of type 'span') containing the targets of this activity
   * @name module:activities/text/TextActivityBase.TextActivityBasePanel#targets
   * @type {external:jQuery[]} */
  targets: null,
  /**
   * Flag indicating if targets must be visually marked at the beginning of the activity.
   * Should be `true` except for {@link module:activities/text/IdentifyText.IdentifyText IdentifyText} activities.
   * @name module:activities/text/TextActivityBase.TextActivityBasePanel#targetsMarked
   * @type {boolean} */
  targetsMarked: true,
  /**
   * The button used to check the activity, only when `Activity.checkButtonText` is not null
   * @name module:activities/text/TextActivityBase.TextActivityBasePanel#$checkButton
   * @type {external:jQuery}*/
  $checkButton: null,
  /**
   * System timer used to close the previous document when act.maxTime is reached.
   * @name module:activities/text/TextActivityBase.TextActivityBasePanel#prevScreenTimer
   * @type {number} */
  prevScreenTimer: null,
  /**
   * The popup currently been displayed
   * @name module:activities/text/TextActivityBase.TextActivityBasePanel#$currentPopup
   * @type {external:jQuery} */
  $currentPopup: null,
  /**
   * A timer controlling the time the current popup will be displayed
   * @name module:activities/text/TextActivityBase.TextActivityBasePanel#currentPopupTimer
   * @type {number} */
  currentPopupTimer: 0,
  /**
   * A timer prepared to display a popup after a while
   * @name module:activities/text/TextActivityBase.TextActivityBasePanel#popupWaitTimer
   * @type {number} */
  popupWaitTimer: 0,
  /**
   * When true, all text outside of targets and cells will be inserted as independent words or letters,
   * using 'span' elements. {@link module:activities/text/TextActivityBase.TextActivityBasePanel#$createSpanElement} can be used
   * to customize these elements.
   * @name module:activities/text/TextActivityBase.TextActivityBasePanel#spanText
   * @type {boolean} */
  spanText: false,
  /**
   * When true, text spanning will be done at char level: each single letter will be a clickacle span.
   * Used only in activities of type "itentify letters"
   * @name module:activities/text/TextActivityBase.TextActivityBasePanel#spanChars
   * @type {boolean} */
  spanChars: false,
});

/**
 * Panel class associated to this type of activity: {@link module:activities/text/TextActivityBase.TextActivityBasePanel TextActivityBasePanel}
 * @type {class} */
TextActivityBase.Panel = TextActivityBasePanel;

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (TextActivityBase);


/***/ })

};
;
//# sourceMappingURL=743.jclic-node.js.map