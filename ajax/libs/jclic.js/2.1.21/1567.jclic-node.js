"use strict";
exports.id = 1567;
exports.ids = [1567,2715,2379];
exports.modules = {

/***/ 1567:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   I: () => (/* binding */ Activity),
/* harmony export */   S: () => (/* binding */ ActivityPanel),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(7750);
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _Utils_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(1253);
/* harmony import */ var _AWT_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(7912);
/* harmony import */ var _media_EventSounds_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(5338);
/* harmony import */ var _boxes_ActiveBoxContent_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(9072);
/* harmony import */ var _boxes_ActiveBagContent_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(9409);
/* harmony import */ var _boxes_BoxBase_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(3018);
/* harmony import */ var _automation_AutoContentProvider_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(2379);
/* harmony import */ var _boxes_TextGridContent_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(1842);
/* harmony import */ var _activities_text_Evaluator_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(2715);
/* harmony import */ var _activities_text_TextActivityDocument_js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(3019);
/**
 *  File    : Activity.js
 *  Created : 07/04/2015
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













// Event used for detecting touch devices
const TOUCH_TEST_EVENT = 'touchstart';

/**
 * Activity is the abstract base class of JClic activities. It defines also the inner class
 * {@link module:Activity.ActivityPanel ActivityPanel}, wich is responsible for user interaction with the activity
 * content.
 * Activities should extend both `Activity` and `ActivityPanel` classes in order to become fully
 * operative.
 * @abstract
 */
class Activity {
  /**
   * Activity constructor
   * @param {module:project/JClicProject.JClicProject} project - The {@link module:project/JClicProject.JClicProject JClicProject} to which this activity belongs
   */
  constructor(project) {
    this.project = project;
    this.eventSounds = new _media_EventSounds_js__WEBPACK_IMPORTED_MODULE_3__["default"](this.project.settings.eventSounds);
    this.messages = {};
    this.abc = {};
  }

  /**
   * Registers a new type of activity
   * @param {string} activityName - The name used to identify this activity
   * @param {function} activityClass - The activity class, usually extending Activity
   * @returns {module:Activity.Activity} - The provided activity class
   */
  static registerClass(activityName, activityClass) {
    Activity.CLASSES[activityName] = activityClass;
    return activityClass;
  }

  /**
   * Factory constructor that returns a specific type of Activity based on the `class` attribute
   * declared in `data`.
   * @param {object|external:jQuery} data - Can be a jQuery XML element, or an object obtained with a call to `getAttributes`
   * @param {module:project/JClicProject.JClicProject} project - The {@link module:project/JClicProject.JClicProject JClicProject} to which this activity belongs
   * @returns {module:Activity.Activity}
   */
  static getActivity(data, project) {
    let act = null;
    const isXml = data.jquery && true;
    if (data && project) {
      const className = isXml ? (data.attr('class') || '').replace(/^edu\.xtec\.jclic\.activities\./, '@') : data.className;
      const cl = Activity.CLASSES[className];
      if (cl) {
        act = new cl(project);
        if (isXml)
          act.setProperties(data);
        else
          act.setAttributes(data);
      } else
        (0,_Utils_js__WEBPACK_IMPORTED_MODULE_1__/* .log */ .Rm)('error', `Unknown activity class: ${className}`);
    }
    return act;
  }

  /**
   * Loads this object settings from an XML element
   * @param {external:jQuery} $xml - The jQuery XML element to parse
   */
  setProperties($xml) {

    // Read attributes
    (0,_Utils_js__WEBPACK_IMPORTED_MODULE_1__/* .attrForEach */ .GM)($xml.get(0).attributes, (name, val) => {
      switch (name) {
        // Generic attributes:
        case 'name':
          val = (0,_Utils_js__WEBPACK_IMPORTED_MODULE_1__/* .nSlash */ .c4)(val);
        /* falls through */
        case 'code':
        case 'type':
        case 'description':
          this[name] = val;
          break;

        case 'class':
          this.className = val.replace(/^edu\.xtec\.jclic\.activities\./, '@');
          break;

        case 'inverse':
          this.invAss = (0,_Utils_js__WEBPACK_IMPORTED_MODULE_1__/* .getBoolean */ .pW)(val, false);
          break;

        case 'autoJump':
        case 'forceOkToAdvance':
        case 'amongParagraphs':
          this[name] = (0,_Utils_js__WEBPACK_IMPORTED_MODULE_1__/* .getBoolean */ .pW)(val, false);
          break;
      }
    });

    // Read specific nodes
    $xml.children().each((_n, child) => {
      const $node = jquery__WEBPACK_IMPORTED_MODULE_0___default()(child);
      switch (child.nodeName) {
        case 'settings':
          // Read more attributes
          (0,_Utils_js__WEBPACK_IMPORTED_MODULE_1__/* .attrForEach */ .GM)($node.get(0).attributes, (name, val) => {
            switch (name) {
              case 'infoUrl':
              case 'infoCmd':
                this[name] = val;
                break;

              case 'margin':
              case 'maxTime':
              case 'maxActions':
                this[name] = Number(val);
                break;

              case 'report':
                this.includeInReports = (0,_Utils_js__WEBPACK_IMPORTED_MODULE_1__/* .getBoolean */ .pW)(val, false);
                break;
              case 'countDownTime':
              case 'countDownActions':
              case 'reportActions':
              case 'useOrder':
              case 'dragCells':
                this[name] = (0,_Utils_js__WEBPACK_IMPORTED_MODULE_1__/* .getBoolean */ .pW)(val, false);
                break;
            }
          });

          // Read elements of _settings_
          $node.children().each((_n, child) => {
            const $node = jquery__WEBPACK_IMPORTED_MODULE_0___default()(child);
            switch (child.nodeName) {
              case 'skin':
                this.skinFileName = $node.attr('file');
                break;

              case 'helpWindow':
                this.helpMsg = (0,_Utils_js__WEBPACK_IMPORTED_MODULE_1__/* .getXmlText */ .HC)(this);
                this.showSolution = (0,_Utils_js__WEBPACK_IMPORTED_MODULE_1__/* .getBoolean */ .pW)($node.attr('showSolution'), false);
                this.helpWindow = this.helpMsg !== null || this.showSolution;
                break;

              case 'container':
                // Read settings related to the 'container'
                // (the main panel containing the activity and other elements)
                this.bgColor = (0,_Utils_js__WEBPACK_IMPORTED_MODULE_1__/* .checkColor */ .I4)($node.attr('bgColor'), _Utils_js__WEBPACK_IMPORTED_MODULE_1__/* .settings */ .W0.BoxBase.BACK_COLOR);

                $node.children().each((_n, child) => {
                  const $child = jquery__WEBPACK_IMPORTED_MODULE_0___default()(child);
                  switch (child.nodeName) {
                    case 'image':
                      this.bgImageFile = $child.attr('name');
                      this.tiledBgImg = (0,_Utils_js__WEBPACK_IMPORTED_MODULE_1__/* .getBoolean */ .pW)($child.attr('tiled'), false);
                      break;
                    case 'counters':
                      this.bTimeCounter = (0,_Utils_js__WEBPACK_IMPORTED_MODULE_1__/* .getBoolean */ .pW)($child.attr('time'), true);
                      this.bActionsCounter = (0,_Utils_js__WEBPACK_IMPORTED_MODULE_1__/* .getBoolean */ .pW)($child.attr('actions'), true);
                      this.bScoreCounter = (0,_Utils_js__WEBPACK_IMPORTED_MODULE_1__/* .getBoolean */ .pW)($child.attr('score'), true);
                      break;
                    case 'gradient':
                      this.bgGradient = new _AWT_js__WEBPACK_IMPORTED_MODULE_2__/* .Gradient */ .Hf().setProperties($child);
                      break;
                  }
                });
                break;

              case 'window':
                // Read settings related to the 'window'
                // (the panel where the activity deploys its content)
                this.activityBgColor = (0,_Utils_js__WEBPACK_IMPORTED_MODULE_1__/* .checkColor */ .I4)($node.attr('bgColor'), _Utils_js__WEBPACK_IMPORTED_MODULE_1__/* .settings */ .W0.DEFAULT_BG_COLOR);
                this.transparentBg = (0,_Utils_js__WEBPACK_IMPORTED_MODULE_1__/* .getBoolean */ .pW)($node.attr('transparent'), false);
                this.border = (0,_Utils_js__WEBPACK_IMPORTED_MODULE_1__/* .getBoolean */ .pW)($node.attr('border'), false);
                $node.children().each((_n, child) => {
                  const $child = jquery__WEBPACK_IMPORTED_MODULE_0___default()(child);
                  switch (child.nodeName) {
                    case 'gradient':
                      this.activityBgGradient = new _AWT_js__WEBPACK_IMPORTED_MODULE_2__/* .Gradient */ .Hf().setProperties($child);
                      break;
                    case 'position':
                      this.absolutePosition = new _AWT_js__WEBPACK_IMPORTED_MODULE_2__/* .Point */ .bR().setProperties($child);
                      this.absolutePositioned = true;
                      break;
                    case 'size':
                      this.windowSize = new _AWT_js__WEBPACK_IMPORTED_MODULE_2__/* .Dimension */ .fg().setProperties($child);
                      break;
                  }
                });
                break;

              case 'eventSounds':
                // eventSounds is already created in constructor,
                // just read properties
                this.eventSounds.setProperties($node);
                break;
            }
          });
          break;

        case 'messages':
          $node.children('cell').each((_n, child) => {
            const m = this.readMessage(jquery__WEBPACK_IMPORTED_MODULE_0___default()(child));
            // Possible message types are: `initial`, `final`, `previous`, `finalError`
            this.messages[m.type] = m;
          });
          break;

        case 'automation':
          // Read the automation settings ('Arith' or other automation engines)
          this.acp = _automation_AutoContentProvider_js__WEBPACK_IMPORTED_MODULE_7__["default"].getProvider($node, this.project);
          if (this.acp)
            this.numericContent = this.acp.numericContent;
          break;

        // Settings specific to panel-type activities (puzzles, associations...)
        case 'cells':
          // Read the [ActiveBagContent](ActiveBagContent.html) objects
          const cellSet = new _boxes_ActiveBagContent_js__WEBPACK_IMPORTED_MODULE_5__["default"]().setProperties($node, this.project.mediaBag);
          // Valid ids:
          // - Panel activities: 'primary', 'secondary', solvedPrimary'
          // - Textpanel activities: 'acrossClues', 'downClues', 'answers'
          this.abc[cellSet.id] = cellSet;
          break;

        case 'scramble':
          // Read the 'shuffle' mode
          this.shuffles = Number($node.attr('times'));
          this.shuffleA = (0,_Utils_js__WEBPACK_IMPORTED_MODULE_1__/* .getBoolean */ .pW)($node.attr('primary'));
          this.shuffleB = (0,_Utils_js__WEBPACK_IMPORTED_MODULE_1__/* .getBoolean */ .pW)($node.attr('secondary'));
          break;

        case 'layout':
          (0,_Utils_js__WEBPACK_IMPORTED_MODULE_1__/* .attrForEach */ .GM)($node.get(0).attributes, (name, value) => {
            switch (name) {
              case 'position':
                this.boxGridPos = value;
                break;
              case 'wildTransparent':
              case 'upperCase':
              case 'checkCase':
                this[name] = (0,_Utils_js__WEBPACK_IMPORTED_MODULE_1__/* .getBoolean */ .pW)(value);
            }
          });
          break;

        // Element specific to 'Menu' activities:
        case 'menuElement':
          this.menuElements.push({
            caption: $node.attr('caption') || '',
            icon: $node.attr('icon') || null,
            projectPath: $node.attr('path') || null,
            sequence: $node.attr('sequence') || null,
            description: $node.attr('description') || ''
          });
          break;

        // Element specific to 'CrossWord' and
        // 'WordSearch' activities:
        case 'textGrid':
          // Read the 'textGrid' element into a 'TextGridContent'
          this.tgc = new _boxes_TextGridContent_js__WEBPACK_IMPORTED_MODULE_8__["default"]().setProperties($node);
          break;

        // Read the clues of 'WordSearch' activities
        case 'clues':
          // Read the array of clues
          this.clues = [];
          this.clueItems = [];
          $node.children('clue').each((n, child) => {
            this.clueItems[n] = Number(jquery__WEBPACK_IMPORTED_MODULE_0___default()(child).attr('id'));
            this.clues[n] = child.textContent;
          });
          break;

        // Elements specific to text activities:
        case 'checkButton':
          this.checkButtonText = child.textContent || 'check';
          break;

        case 'prevScreen':
          this.prevScreen = true;
          this.prevScreenMaxTime = $node.attr('maxTime') || -1;
          $node.children().each((_n, child) => {
            switch (child.nodeName) {
              case 'style':
                this.prevScreenStyle = new _boxes_BoxBase_js__WEBPACK_IMPORTED_MODULE_6__["default"]().setProperties(jquery__WEBPACK_IMPORTED_MODULE_0___default()(child));
                break;
              case 'p':
                if (this.prevScreenText === null)
                  this.prevScreenText = '';
                this.prevScreenText += `<p>${child.textContent}</p>`;
                break;
            }
          });
          break;

        case 'evaluator':
          this.ev = _activities_text_Evaluator_js__WEBPACK_IMPORTED_MODULE_9__["default"].getEvaluator($node);
          break;

        case 'document':
          // Read main document of text activities
          this.document = new _activities_text_TextActivityDocument_js__WEBPACK_IMPORTED_MODULE_10__["default"]().setProperties($node, this.project.mediaBag);
          break;
      }
    });
    return this;
  }

  /**
   * Read an activity message from an XML element
   * @param {external:jQuery} $xml - The XML element to be parsed
   * @returns {module:boxes/ActiveBoxContent.ActiveBoxContent}
   */
  readMessage($xml) {
    const msg = new _boxes_ActiveBoxContent_js__WEBPACK_IMPORTED_MODULE_4__["default"]().setProperties($xml, this.project.mediaBag);
    //
    // Allowed types are: `initial`, `final`, `previous`, `finalError`
    msg.type = $xml.attr('type');
    if ((0,_Utils_js__WEBPACK_IMPORTED_MODULE_1__/* .isNullOrUndef */ .Pj)(msg.style))
      msg.style = new _boxes_BoxBase_js__WEBPACK_IMPORTED_MODULE_6__["default"](null);
    return msg;
  }

  /**
   * Gets a object with the basic attributes needed to rebuild this instance excluding functions,
   * parent references, constants and also attributes retaining the default value.
   * The resulting object is commonly usued to serialize elements in JSON format.
   * @returns {object} - The resulting object, with minimal attrributes
   */
  getAttributes() {
    return (0,_Utils_js__WEBPACK_IMPORTED_MODULE_1__/* .getAttr */ .iu)(this, [
      'name', 'className', 'code', 'type', 'description',
      'invAss', 'numericContent',
      'autoJump', 'forceOkToAdvance', 'amongParagraphs',
      'infoUrl', 'infoCmd',
      `margin|${_Utils_js__WEBPACK_IMPORTED_MODULE_1__/* .settings */ .W0.DEFAULT_MARGIN}`, 'maxTime', 'maxActions',
      'includeInReports|true', 'reportActions|false',
      'countDownTime', 'countDownActions',
      'useOrder', 'dragCells',
      'skinFileName',
      'showSolution|false', 'helpMsg',
      `bgColor|${_Utils_js__WEBPACK_IMPORTED_MODULE_1__/* .settings */ .W0.DEFAULT_BG_COLOR}`, 'bgImageFile', 'tiledBgImg',
      'bTimeCounter|true', 'bActionsCounter|true', 'bScoreCounter|true',
      `activityBgColor|${_Utils_js__WEBPACK_IMPORTED_MODULE_1__/* .settings */ .W0.DEFAULT_BG_COLOR}`, 'transparentBg|false', 'border|true',
      'shuffleA', 'shuffleB', 'shuffles', 'boxGridPos',
      'wildTransparent', 'upperCase', 'checkCase',
      'checkButtonText',
      'prevScreen', 'prevScreenMaxTime', 'prevScreenText',
      'bgGradient', 'activityBgGradient', // Gradient
      'absolutePosition', // Point
      'windowSize', // Dimension
      'eventSounds', // EventSounds
      'messages', // ActiveBoxContent{}
      'acp', // AutoContentProvider
      'abc', // ActiveBagContent{}
      'menuElements', // Activity~menuElement
      'tgc', // TextGridContent
      'clues', // string[]
      'clueItems', // number[]
      'prevScreenStyle', // BoxBase
      'ev', // Evaluator
      'document', // TextActivityDocument
    ]);
  }

  /**
   * Load the activity settings from a data object
   * @param {object} data - The data object to parse
   */
  setAttributes(data, mediaBag = this.project.mediaBag) {
    (0,_Utils_js__WEBPACK_IMPORTED_MODULE_1__/* .setAttr */ .ob)(this, data, [
      'name', 'className', 'code', 'type', 'description', 'invAss', 'numericContent',
      'autoJump', 'forceOkToAdvance', 'amongParagraphs', 'infoUrl', 'infoCmd',
      'margin', 'maxTime', 'maxActions', 'includeInReports', 'reportActions',
      'countDownTime', 'countDownActions', 'useOrder', 'dragCells', 'skinFileName',
      'showSolution', 'helpMsg', 'bgColor', 'bgImageFile', 'tiledBgImg',
      'bTimeCounter', 'bActionsCounter', 'bScoreCounter',
      'activityBgColor', 'transparentBg', 'border',
      'shuffleA', 'shuffleB', 'shuffles', 'boxGridPos',
      'wildTransparent', 'upperCase', 'checkCase', 'checkButtonText',
      'prevScreen', 'prevScreenMaxTime', 'prevScreenText',
      { key: 'bgGradient', fn: _AWT_js__WEBPACK_IMPORTED_MODULE_2__/* .Gradient */ .Hf },
      { key: 'activityBgGradient', fn: _AWT_js__WEBPACK_IMPORTED_MODULE_2__/* .Gradient */ .Hf },
      { key: 'absolutePosition', fn: _AWT_js__WEBPACK_IMPORTED_MODULE_2__/* .Point */ .bR },
      { key: 'windowSize', fn: _AWT_js__WEBPACK_IMPORTED_MODULE_2__/* .Dimension */ .fg },
      { key: 'messages', fn: _boxes_ActiveBoxContent_js__WEBPACK_IMPORTED_MODULE_4__["default"], group: 'object', init: 'key', params: [mediaBag] },
      { key: 'abc', fn: _boxes_ActiveBagContent_js__WEBPACK_IMPORTED_MODULE_5__["default"], group: 'object', init: 'key', params: [mediaBag] },
      { key: 'acp', fn: _automation_AutoContentProvider_js__WEBPACK_IMPORTED_MODULE_7__["default"], params: [mediaBag] },
      'menuElements',
      { key: 'tgc', fn: _boxes_TextGridContent_js__WEBPACK_IMPORTED_MODULE_8__["default"] },
      'clues',
      'clueItems',
      { key: 'prevScreenStyle', fn: _boxes_BoxBase_js__WEBPACK_IMPORTED_MODULE_6__["default"] },
      { key: 'ev', fn: _activities_text_Evaluator_js__WEBPACK_IMPORTED_MODULE_9__["default"] },
      { key: 'document', fn: _activities_text_TextActivityDocument_js__WEBPACK_IMPORTED_MODULE_10__["default"], params: [mediaBag] },
    ]);

    // Reused objects
    if (data.eventSounds)
      this.eventSounds.setAttributes(data.eventSounds);

    // Manual settings
    if (this.absolutePosition)
      this.absolutePositioned = true;

    return this;
  }

  /**
   * Initialises the {@link module:automation/AutoContentProvider.AutoContentProvider AutoContentProvider}, when defined.
   */
  initAutoContentProvider() {
    if (this.acp !== null)
      this.acp.init();
  }

  /**
   * Preloads the media content of the activity.
   * @param {module:JClicPlayer.JClicPlayer} ps - The {@link module:JClicPlayer.JClicPlayer} used to realize the media objects.
   */
  prepareMedia(ps) {
    this.eventSounds.realize(ps, this.project.mediaBag);
    jquery__WEBPACK_IMPORTED_MODULE_0___default().each(this.messages, (_key, msg) => {
      if (msg !== null) msg.prepareMedia(ps);
    });
    jquery__WEBPACK_IMPORTED_MODULE_0___default().each(this.abc, (_key, abc) => {
      if (abc !== null)
        abc.prepareMedia(ps);
    });
    return true;
  }

  /**
   * Whether the activity allows the user to request the solution.
   * @returns {boolean}
   */
  helpSolutionAllowed() {
    return false;
  }

  /**
   * Whether the activity allows the user to request help.
   * @returns {boolean}
   */
  helpWindowAllowed() {
    return this.helpWindow &&
      (this.helpSolutionAllowed() && this.showSolution || this.helpMsg !== null);
  }

  /**
   * Retrieves the minimum number of actions needed to solve this activity.
   * @returns {number}
   */
  getMinNumActions() {
    return 0;
  }

  /**
   * When this method returns `true`, the automatic jump to the next activity must be paused at
   * this activity.
   * @returns {boolean}
   */
  mustPauseSequence() {
    return this.getMinNumActions() !== 0;
  }

  /**
   * Whether or not the activity can be reset
   * @returns {boolean}
   */
  canReinit() {
    return true;
  }

  /**
   * Whether or not the activity has additional information to be shown.
   * @returns {boolean}
   */
  hasInfo() {
    return this.infoUrl !== null && this.infoUrl.length > 0 ||
      this.infoCmd !== null && this.infoCmd.length > 0;
  }

  /**
   * Whether or not the activity uses random to shuffle internal components
   * @returns {boolean}
   */
  hasRandom() {
    return false;
  }

  /**
   * When `true`, the activity must always be shuffled
   * @returns {boolean}
   */
  shuffleAlways() {
    return false;
  }

  /**
   * When `true`, the activity makes use of the keyboard
   * @returns {boolean}
   */
  needsKeyboard() {
    return false;
  }

  /**
   * Called when the activity must be disposed
   */
  end() {
    this.eventSounds.close();
    this.clear();
  }

  /**
   * Called when the activity must reset its internal components
   */
  clear() {
  }

  /**
   *
   * Getter method for `windowSize`
   * @returns {module:AWT.Dimension}
   */
  getWindowSize() {
    return new _AWT_js__WEBPACK_IMPORTED_MODULE_2__/* .Dimension */ .fg(this.windowSize);
  }

  /**
   * Setter method for `windowSize`
   * @param {module:AWT.Dimension} windowSize
   */
  setWindowSize(windowSize) {
    this.windowSize = new _AWT_js__WEBPACK_IMPORTED_MODULE_2__/* .Dimension */ .fg(windowSize);
  }

  /**
   * Builds the {@link module:Activity.ActivityPanel ActivityPanel} object.
   * Subclasses must update the `Panel` member of its prototypes to produce specific panels.
   * @param {module:JClicPlayer.JClicPlayer} ps - The {@link module:JClicPlayer.JClicPlayer JClicPlayer} used to build media objects.
   * @returns {module:Activity.ActivityPanel}
   */
  getActivityPanel(ps) {
    return new this.constructor.Panel(this, ps);
  }
}

/**
 * Classes derived from `Activity` should register themselves by adding a field to
 * `Activity.CLASSES` using `Activity.registerClass`
 * @type {object}
 */
Activity.CLASSES = {
  '@panels.Menu': Activity
};

Object.assign(Activity.prototype, {
  /**
   * The {@link module:project/JClicProject.JClicProject JClicProject} to which this activity belongs
   * @name module:Activity.Activity#project
   * @type {module:project/JClicProject.JClicProject} */
  project: null,
  /**
   * The Activity name
   * @name module:Activity.Activity#name
   * @type {string} */
  name: _Utils_js__WEBPACK_IMPORTED_MODULE_1__/* .settings */ .W0.DEFAULT_NAME,
  /**
   * The class name of this Activity
   * @name module:Activity.Activity#className
   * @type {string} */
  className: null,
  /**
   * Code used in reports to filter queries. Default is `null`.
   * @name module:Activity.Activity#code
   * @type {string} */
  code: null,
  /**
   * Type of activity, used in text activities to distinguish between different variants of the
   * same activity. Possible values are: `orderWords`, `orderParagraphs`, `identifyWords` and
   * `identifyChars`.
   * @name module:Activity.Activity#type
   * @type {string} */
  type: null,
  /**
   * A short description of the activity
   * @name module:Activity.Activity#description
   * @type {string} */
  description: null,
  /**
   * The space between the activity components measured in pixels.
   * @name module:Activity.Activity#margin
   * @type {number} */
  margin: _Utils_js__WEBPACK_IMPORTED_MODULE_1__/* .settings */ .W0.DEFAULT_MARGIN,
  /**
   * The background color of the activity panel
   * @name module:Activity.Activity#bgColor
   * @type {string} */
  bgColor: _Utils_js__WEBPACK_IMPORTED_MODULE_1__/* .settings */ .W0.DEFAULT_BG_COLOR,
  /**
   * When set, gradient used to draw the activity window background
   * @name module:Activity.Activity#bgGradient
   * @type {module:AWT.Gradient} */
  bgGradient: null,
  /**
   * Whether the bgImage (if any) has to be tiled across the panel background
   * @name module:Activity.Activity#tiledBgImg
   * @type {boolean} */
  tiledBgImg: false,
  /**
   * Filename of the image used as a panel background.
   * @name module:Activity.Activity#bgImageFile
   * @type {string} */
  bgImageFile: null,
  /**
   * Whether to draw a border around the activity panel
   * @name module:Activity.Activity#border
   * @type {boolean} */
  border: true,
  /**
   * Whether to place the activity panel at the point specified by `absolutePosition` or leave
   * it centered on the main player's window.
   * @name module:Activity.Activity#absolutePositioned
   * @type {boolean} */
  absolutePositioned: false,
  /**
   * The position of the activity panel on the player.
   * @name module:Activity.Activity#absolutePosition
   * @type {module:AWT.Point} */
  absolutePosition: null,
  /**
   * Whether to generate usage reports
   * @name module:Activity.Activity#includeInReports
   * @type {boolean} */
  includeInReports: true,
  /**
   * Whether to send action events to the {@link module:Reporter.Reporter Reporter}
   * @name module:Activity.Activity#reportActions
   * @type {boolean} */
  reportActions: false,
  /**
   * Whether to allow help about the activity or not.
   * @name module:Activity.Activity#helpWindow
   * @type {boolean} */
  helpWindow: false,
  /**
   * Whether to show the solution on the help window.
   * @name module:Activity.Activity#showSolution
   * @type {boolean} */
  showSolution: false,
  /**
   * Message to be shown in the help window when `showSolution` is `false`.
   * @name module:Activity.Activity#helpMsg
   * @type {string} */
  helpMsg: '',
  /**
   * Specific set of {@link module:media/EventSounds.EventSounds EventSounds} used in the activity. The default is `null`, meaning
   * to use the default event sounds.
   * @name module:Activity.Activity#eventSounds
   * @type {module:media/EventSounds.EventSounds} */
  eventSounds: null,
  /**
   * Wheter the activity must be solved in a specific order or not.
   * @name module:Activity.Activity#useOrder
   * @type {boolean} */
  useOrder: false,
  /**
   * Wheter the cells of the activity will be dragged across the screen.
   * When `false`, a line will be painted to link elements.
   * @name module:Activity.Activity#dragCells
   * @type {boolean} */
  dragCells: false,
  /**
   * File name of the Skin used by the activity. The default value is `null`, meaning that the
   * activity will use the skin specified for the project.
   * @name module:Activity.Activity#skinFileName
   * @type {string} */
  skinFileName: null,
  /**
   * Maximum amount of time (seconds) to solve the activity. The default value is 0, meaning
   * unlimited time.
   * @name module:Activity.Activity#maxTime
   * @type {number}*/
  maxTime: 0,
  /**
   * Whether the time counter should display a countdown when `maxTime > 0`
   * @name module:Activity.Activity#countDownTime
   * @type {boolean} */
  countDownTime: false,
  /**
   * Maximum number of actions allowed to solve the activity. The default value is 0, meaning
   * unlimited actions.
   * @name module:Activity.Activity#maxActions
   * @type {number}*/
  maxActions: 0,
  /**
   * Whether the actions counter should display a countdown when `maxActions > 0`
   * @name module:Activity.Activity#countDownActions
   * @type {boolean} */
  countDownActions: false,
  /**
   * URL to be launched when the user clicks on the 'info' button. Default is `null`.
   * @name module:Activity.Activity#infoUrl
   * @type {string} */
  infoUrl: null,
  /**
   * System command to be launched when the user clicks on the 'info' button. Default is `null`.
   * Important: this parameter is currently not being used
   * @name module:Activity.Activity#infoCmd
   * @type {string} */
  infoCmd: null,
  /**
   * The content of the initial, final, previous and error messages shown by the activity.
   * @name module:Activity.Activity#messages
   * @type {module:boxes/ActiveBoxContent.ActiveBoxContent[]} */
  messages: null,
  /**
   * Preferred dimension of the activity window
   * @name module:Activity.Activity#windowSize
   * @type {module:AWT.Dimension} */
  windowSize: new _AWT_js__WEBPACK_IMPORTED_MODULE_2__/* .Dimension */ .fg(_Utils_js__WEBPACK_IMPORTED_MODULE_1__/* .settings */ .W0.DEFAULT_WIDTH, _Utils_js__WEBPACK_IMPORTED_MODULE_1__/* .settings */ .W0.DEFAULT_HEIGHT),
  /**
   * Whether the activity window has transparent background.
   * @name module:Activity.Activity#transparentBg
   * @type {boolean} */
  transparentBg: false,
  /**
   * The background color of the activity
   * @name module:Activity.Activity#activityBgColor
   * @type {string} */
  activityBgColor: _Utils_js__WEBPACK_IMPORTED_MODULE_1__/* .settings */ .W0.DEFAULT_BG_COLOR,
  /**
   * Gradient used to draw backgrounds inside the activity.
   * @name module:Activity.Activity#activityBgGradient
   * @type {module:AWT.Gradient} */
  activityBgGradient: null,
  /**
   * Whether to display or not the 'time' counter
   * @name module:Activity.Activity#bTimeCounter
   * @type {boolean} */
  bTimeCounter: true,
  /**
   * Whether to display or not the 'score' counter
   * @name module:Activity.Activity#bScoreCounter
   * @type {boolean} */
  bScoreCounter: true,
  /**
   * Whether to display or not the 'actions' counter
   * @name module:Activity.Activity#bActionsCounter
   * @type {boolean} */
  bActionsCounter: true,
  /**
   * Special object used to generate random content at the start of the activity
   * @name module:Activity.Activity#acp
   * @type {module:automation/AutoContentProvider.AutoContentProvider} */
  acp: null,
  //
  // Fields used only in certain activity types
  // ------------------------------------------
  //
  /**
   * Array of bags with the description of the content to be displayed on panels and cells.
   * @name module:Activity.Activity#abc
   * @type {module:boxes/ActiveBagContent.ActiveBagContent[]} */
  abc: null,
  /**
   * Content of the grid of letters used in crosswords and shuffled letters
   * @name module:Activity.Activity#tgc
   * @type {module:boxes/TextGridContent.TextGridContent} */
  tgc: null,
  /**
   * The main document used in text activities
   * @name module:Activity.Activity#document
   * @type {module:activities/text/TextActivityDocument.TextActivityDocument} */
  document: null,
  /**
   * Relative position of the text grid (uses the same position codes as box grids)
   * @name module:Activity.Activity#boxGridPos
   * @type {string} */
  boxGridPos: 'AB',
  /**
   * Number of times to shuffle the cells at the beginning of the activity
   * @name module:Activity.Activity#shuffles
   * @type {number} */
  shuffles: _Utils_js__WEBPACK_IMPORTED_MODULE_1__/* .settings */ .W0.DEFAULT_SHUFFLES,
  /**
   * Box grid A must be shuffled.
   * @name module:Activity.Activity#shuffleA
   * @type {boolean} */
  shuffleA: true,
  /**
   * Box grid B must be shuffled.
   * @name module:Activity.Activity#shuffleB
   * @type {boolean} */
  shuffleB: true,
  /**
   * Flag to indicate "inverse resolution" in complex associations
   * @name module:Activity.Activity#invAss
   * @type {boolean} */
  invAss: false,
  /**
   * Array of menu elements, used in activities of type {@link module:activities/panels/Menu.Menu Menu}
   * @name module:Activity.Activity#menuElements
   * @type {object[]} */
  menuElements: null,
  /**
   * This activity uses numeric expressions, so text literals should be
   * converted to numbers for comparisions, taking in account the
   * number format of the current locale (dot or comma as decimal separator)
   * @name module:Activity.Activity#numericContent
   * @type {boolean} */
  numericContent: false,
});

/**
 * This object is responsible for rendering the contents of the activity on the screen and
 * managing user's interaction.
 * Each type of Activity must implement its own `ActivityPanel`.
 * In JClic, {@link http://projectestac.github.io/jclic/apidoc/edu/xtec/jclic/Activity.Panel.html Activity.Panel}
 * extends {@link http://docs.oracle.com/javase/7/docs/api/javax/swing/JPanel.html javax.swing.JPanel}.
 * On this implementation, the JPanel will be replaced by an HTML `div` tag.
 * @extends module:AWT.Container
 */
class ActivityPanel extends _AWT_js__WEBPACK_IMPORTED_MODULE_2__/* .Container */ .mc {
  /**
   * ActivityPanel constructor
   * @param {module:Activity.Activity} act - The {@link module:Activity.Activity Activity} to which this Panel belongs
   * @param {module:JClicPlayer.JClicPlayer} ps - Any object implementing the methods defined in the
   * {@link http://projectestac.github.io/jclic/apidoc/edu/xtec/jclic/PlayStation.html PlayStation}
   * Java interface.
   * @param {external:jQuery} [$div] - The jQuery DOM element where this Panel will deploy
   */
  constructor(act, ps, $div) {
    // ActivityPanel extends Container
    super();
    this.act = act;
    this.ps = ps;
    this.minimumSize = new _AWT_js__WEBPACK_IMPORTED_MODULE_2__/* .Dimension */ .fg(100, 100);
    this.preferredSize = new _AWT_js__WEBPACK_IMPORTED_MODULE_2__/* .Dimension */ .fg(500, 400);
    if ($div)
      this.$div = $div;
    else
      this.$div = jquery__WEBPACK_IMPORTED_MODULE_0___default()('<div/>', { class: 'JClicActivity', 'aria-label': (0,_Utils_js__WEBPACK_IMPORTED_MODULE_1__/* .getMsg */ .qG)('Activity panel') });
    this.act.initAutoContentProvider();
  }

  /**
   * Sets the size and position of this activity panel
   * @param {module:AWT.Rectangle} rect
   */
  setBounds(rect) {
    this.pos.x = rect.pos.x;
    this.pos.y = rect.pos.y;
    this.dim.width = rect.dim.width;
    this.dim.height = rect.dim.height;

    this.invalidate(rect);
    this.$div.css({
      position: 'relative',
      left: rect.pos.x,
      top: rect.pos.y,
      width: rect.dim.width,
      height: rect.dim.height
    });
  }

  /**
   * Prepares the visual components of the activity
   */
  buildVisualComponents() {
    this.playing = false;
    this.skin = null;
    if (this.act.skinFileName && this.act.skinFileName.length > 0 && this.act.skinFileName !== this.act.project.settings.skinFileName)
      this.skin = this.act.project.mediaBag.getSkinElement(this.act.skinFileName, this.ps);

    this.bgImage = null;
    if (this.act.bgImageFile && this.act.bgImageFile.length > 0) {
      const mbe = this.act.project.mediaBag.getElement(this.act.bgImageFile, true);
      if (mbe)
        this.bgImage = mbe.data;
    }

    this.backgroundColor = this.act.activityBgColor;

    if (this.act.transparentBg)
      this.backgroundTransparent = true;

    // TODO: fix bevel-border type
    if (this.act.border)
      this.border = true;

    const cssAct = {
      display: 'block',
      'background-color': this.backgroundTransparent ? 'transparent' : this.backgroundColor
    };

    // Border shadow style Material Design, inspired in [http://codepen.io/Stenvh/pen/EaeWqW]
    if (this.border) {
      cssAct['box-shadow'] = '0 2px 5px 0 rgba(0, 0, 0, 0.16), 0 2px 10px 0 rgba(0, 0, 0, 0.12)';
      cssAct['border-radius'] = '2px';
      cssAct['color'] = '#272727';
    }

    if (this.act.activityBgGradient)
      cssAct['background-image'] = this.act.activityBgGradient.getCss();

    this.$div.css(cssAct);
  }

  /**
   * Activities should implement this method to update the graphic content of its panel. The method
   * will be called from {@link module:AWT.Container#update} when needed.
   * @param {module:AWT.Rectangle} dirtyRegion - Specifies the area to be updated. When `null`,
   * it's the whole panel.
   */
  updateContent(dirtyRegion) {
    // To be overridden by subclasses. Here does nothing.
    return super.updateContent(dirtyRegion);
  }

  /**
   * Plays the specified event sound
   * @param {string} event - The type of event to be performed
   */
  playEvent(event) {
    this.act.eventSounds.play(event);
  }

  /**
   * Basic initialization procedure, common to all activities.
   */
  initActivity() {
    if (this.playing) {
      this.playing = false;
      this.ps.reportEndActivity(this.act, this.solved);
    }
    this.solved = false;
    this.ps.reportNewActivity(this.act, 0);
    this.attachEvents();
    this.enableCounters();
  }

  /**
   * Called when the activity starts playing
   */
  startActivity() {
    this.playing = true;
  }

  /**
   * Called by {@link module:JClicPlayer.JClicPlayer JClicPlayer} when this activity panel is fully visible, just after the
   * initialization process.
   */
  activityReady() {
    // To be overrided by subclasses
  }

  /**
   * Displays help about the activity
   */
  showHelp() {
    // To be overrided by subclasses
  }

  /**
   * Sets the real dimension of this ActivityPanel.
   * @param {module:AWT.Dimension} maxSize - The maximum surface available for the activity panel
   * @returns {module:AWT.Dimension}
   */
  setDimension(maxSize) {
    return new _AWT_js__WEBPACK_IMPORTED_MODULE_2__/* .Dimension */ .fg(
      Math.min(maxSize.width, this.act.windowSize.width),
      Math.min(maxSize.height, this.act.windowSize.height));
  }

  /**
   * Attaches the events specified in the `events` member to the `$div` member
   */
  attachEvents() {
    this.events.forEach(ev => this.attachEvent(this.$div, ev));
    // Prepare handler to check if we are in a touch device
    if (!_Utils_js__WEBPACK_IMPORTED_MODULE_1__/* .settings */ .W0.TOUCH_DEVICE && jquery__WEBPACK_IMPORTED_MODULE_0___default().inArray(TOUCH_TEST_EVENT, this.events) === -1)
      this.attachEvent(this.$div, TOUCH_TEST_EVENT);
  }

  /**
   * Attaches a single event to the specified object
   * @param {external:jQuery} $obj - The object to which the event will be attached
   * @param {string} evt - The event name
   */
  attachEvent($obj, evt) {
    $obj.on(evt, this, event => {
      if (event.type === TOUCH_TEST_EVENT) {
        if (!_Utils_js__WEBPACK_IMPORTED_MODULE_1__/* .settings */ .W0.TOUCH_DEVICE)
          _Utils_js__WEBPACK_IMPORTED_MODULE_1__/* .settings */ .W0.TOUCH_DEVICE = true;
        if (jquery__WEBPACK_IMPORTED_MODULE_0___default().inArray(TOUCH_TEST_EVENT, this.events) === -1) {
          // Disconnect handler
          $obj.off(TOUCH_TEST_EVENT);
          return;
        }
      }
      return event.data.processEvent.call(event.data, event);
    });
  }

  /**
   * Main handler used to process mouse, touch, keyboard and edit events.
   * @param {external:Event} event - The HTML event to be processed
   * @returns {boolean} - When this event handler returns `false`, jQuery will stop its
   * propagation through the DOM tree. See: {@link http://api.jquery.com/on}
   */
  processEvent(_event) {
    return false;
  }

  /**
   * Fits the panel within the `proposed` rectangle. The panel can occupy more space, but always
   * not surpassing the `bounds` rectangle.
   * @param {module:AWT.Rectangle} proposed - The proposed rectangle
   * @param {module:AWT.Rectangle} bounds - The maximum allowed bounds
   */
  fitTo(proposed, bounds) {
    const origin = new _AWT_js__WEBPACK_IMPORTED_MODULE_2__/* .Point */ .bR();
    if (this.act.absolutePositioned && this.act.absolutePosition !== null) {
      origin.x = Math.max(0, this.act.absolutePosition.x + proposed.pos.x);
      origin.y = Math.max(0, this.act.absolutePosition.y + proposed.pos.y);
      proposed.dim.width -= this.act.absolutePosition.x;
      proposed.dim.height -= this.act.absolutePosition.y;
    }
    const d = this.setDimension(new _AWT_js__WEBPACK_IMPORTED_MODULE_2__/* .Dimension */ .fg(
      Math.max(2 * this.act.margin + _Utils_js__WEBPACK_IMPORTED_MODULE_1__/* .settings */ .W0.MINIMUM_WIDTH, proposed.dim.width),
      Math.max(2 * this.act.margin + _Utils_js__WEBPACK_IMPORTED_MODULE_1__/* .settings */ .W0.MINIMUM_HEIGHT, proposed.dim.height)));
    if (!this.act.absolutePositioned) {
      origin.moveTo(
        Math.max(0, proposed.pos.x + (proposed.dim.width - d.width) / 2),
        Math.max(0, proposed.pos.y + (proposed.dim.height - d.height) / 2));
    }
    if (origin.x + d.width > bounds.dim.width)
      origin.x = Math.max(0, bounds.dim.width - d.width);
    if (origin.y + d.height > bounds.dim.height)
      origin.y = Math.max(0, bounds.dim.height - d.height);
    this.setBounds(new _AWT_js__WEBPACK_IMPORTED_MODULE_2__/* .Rectangle */ .M_(origin.x, origin.y, d.width, d.height));

    // Build accessible components at the end of current tree
    window.setTimeout(() => this.buildAccessibleComponents(), 0);
  }

  /**
   *
   * Builds the accessible components needed for this ActivityPanel
   * This method is called when all main elements are placed and visible, when the activity is ready
   * to start or when resized.
   */
  buildAccessibleComponents() {
    // Clear existing elements
    if (this.accessibleCanvas && this.$canvas && this.$canvas.children().length > 0) {
      // UPDATED May 2020: clearHitRegions has been deprecated!
      // this.$canvas.get(-1).getContext('2d').clearHitRegions();
      this.$canvas.empty();
    }
    // Create accessible elements in subclasses
  }

  /**
   *  Forces the ending of the activity.
   */
  forceFinishActivity() {
    // to be overrided by subclasses
  }

  /**
   * Ordinary ending of the activity, usually called form `processEvent`
   * @param {boolean} result - `true` if the activity was successfully completed, `false` otherwise
   */
  finishActivity(result) {
    this.playing = false;
    this.solved = result;

    if (this.bc !== null)
      this.bc.end();

    if (result) {
      this.setAndPlayMsg('final', 'finishedOk');
    } else {
      this.setAndPlayMsg('finalError', 'finishedError');
    }
    this.ps.activityFinished(this.solved);
    this.ps.reportEndActivity(this.act, this.solved);
  }

  /**
   * Sets the message to be displayed in the skin message box and optionally plays a sound event.
   * @param {string} msgCode - Type of message (initial, final, finalError...)
   * @param {string} [eventSoundsCode] - Optional name of the event sound to be played.
   */
  setAndPlayMsg(msgCode, eventSoundsCode) {
    const msg = this.act.messages[msgCode] || null;
    this.ps.setMsg(msg);
    if (msg === null || msg.mediaContent === null)
      this.playEvent(eventSoundsCode);
  }

  /**
   * Ends the activity
   */
  end() {
    this.forceFinishActivity();
    if (this.playing) {
      if (this.bc !== null)
        this.bc.end();
      this.ps.reportEndActivity(this.act, this.solved);
      this.playing = false;
      this.solved = false;
    }
    this.clear();
  }

  /**
   * Miscellaneous cleaning operations
   */
  clear() {
    // to be overridden by subclasses
  }

  /**
   * Enables or disables the three counters (time, score and actions)
   * @param {boolean} eTime - Whether to enable or disable the time counter
   * @param {boolean} eScore - Whether to enable or disable the score counter
   * @param {boolean} eActions - Whether to enable or disable the actions counter
   */
  enableCounters(eTime, eScore, eActions) {
    if (typeof eTime === 'undefined')
      eTime = this.act.bTimeCounter;
    if (typeof eScore === 'undefined')
      eScore = this.act.bScoreCounter;
    if (typeof eActions === 'undefined')
      eActions = this.act.bActionsCounter;

    this.ps.setCounterEnabled('time', eTime);
    if (this.act.countDownTime)
      this.ps.setCountDown('time', this.act.maxTime);
    this.ps.setCounterEnabled('score', eScore);
    this.ps.setCounterEnabled('actions', eActions);
    if (this.act.countDownActions)
      this.ps.setCountDown('actions', this.act.maxActions);
  }

  /**
   * Shuffles the contents of the activity
   * @param {module:boxes/ActiveBoxBag.ActiveBoxBag[]} bg - The sets of boxes to be shuffled
   * @param {boolean} visible - The shuffle process must be animated on the screen (not yet implemented!)
   * @param {boolean} fitInArea - Shuffled pieces cannot go out of the current area
   */
  shuffle(bg, visible, fitInArea) {
    const steps = this.act.shuffles;
    let i = steps;
    while (i > 0) {
      const k = i > steps ? steps : i;
      bg.forEach(abb => { if (abb) abb.shuffleCells(k, fitInArea); });
      i -= steps;
    }
  }
}

Object.assign(ActivityPanel.prototype, {
  /**
   * The Activity this panel is related to
   * @name module:Activity.ActivityPanel#act
   * @type {module:Activity.Activity} */
  act: null,
  /**
   * The jQuery div element used by this panel
   * @name module:Activity.ActivityPanel#$div
   * @type {external:jQuery} */
  $div: null,
  /**
   * The jQuery main canvas element used by this panel
   * @name module:Activity.ActivityPanel#$canvas
   * @type {external:jQuery} */
  $canvas: null,
  /**
   * Always true, since canvas hit regions have been deprecated!
   * See: https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial/Hit_regions_and_accessibility
   * @name module:Activity.ActivityPanel#accessibleCanvas
   * @type {boolean}
   */
  accessibleCanvas: true,
  /**
   * The realized current {@link module:skins/Skin.Skin Skin}
   * @name module:Activity.ActivityPanel#skin
   * @type {module:skins/Skin.Skin} */
  skin: null,
  /**
   * Background element (currently a `span`) used to place animated GIFs when needed
   * @name module:Activity.ActivityPanel#$animatedBg
   * @type {external:jQuery} */
  $animatedBg: null,
  /**
   * Additional background element for animated GIFs, used in associations
   * @name module:Activity.ActivityPanel#$animatedBgB
   * @type {external:jQuery} */
  $animatedBgB: null,
  /**
   * `true` when the activity is solved, `false` otherwise
   * @name module:Activity.ActivityPanel#solved
   * @type {boolean} */
  solved: false,
  /**
   * The realized image used as a background
   * @name module:Activity.ActivityPanel#bgImage
   * @type {external:HTMLImageElement} */
  bgImage: null,
  /**
   * `true` while the activity is playing
   * @name module:Activity.ActivityPanel#playing
   * @type {boolean} */
  playing: false,
  /**
   * `true` if the activity is running for first time (not due to a click on the `replay` button)
   * @name module:Activity.ActivityPanel#firstRun
   * @type {boolean} */
  firstRun: true,
  /**
   * Currently selected item. Used in some types of activities.
   * @name module:Activity.ActivityPanel#currentItem
   * @type {number} */
  currentItem: 0,
  /**
   * The object used to connect cells and other elements in some types of activity
   * @name module:Activity.ActivityPanel#bc
   * @type {module:boxes/BoxConnector.BoxConnector} */
  bc: null,
  /**
   * The PlayStation used to realize media objects and communicate with the player services
   * (usually a {@link module:JClicPlayer.JClicPlayer JClicPlayer}
   * @name module:Activity.ActivityPanel#ps
   * @type {module:JClicPlayer.JClicPlayer} */
  ps: null,
  /**
   * The minimum size of this kind of ActivityPanel
   * @name module:Activity.ActivityPanel#minimumSize
   * @type {module:AWT.Dimension} */
  minimumSize: null,
  /**
   * The preferred size of this kind of ActivityPanel
   * @name module:Activity.ActivityPanel#preferredSize
   * @type {module:AWT.Dimension} */
  preferredSize: null,
  /**
   * List of events intercepted by this ActivityPanel. Current events are: 'keydown', 'keyup',
   * 'keypress', 'mousedown', 'mouseup', 'click', 'dblclick', 'mousemove', 'mouseenter',
   * 'mouseleave', 'mouseover', 'mouseout', 'touchstart', 'touchend', 'touchmove' and 'touchcancel'.
   * @name module:Activity.ActivityPanel#events
   * @type {string[]} */
  events: ['click'],
  backgroundColor: null,
  backgroundTransparent: false,
  border: null,
});

/**
 * The panel class associated to each type of activity
 * @type {module:Activity.ActivityPanel} */
Activity.Panel = ActivityPanel;

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Activity);


/***/ }),

/***/ 2715:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* unused harmony exports Evaluator, BasicEvaluator, ComplexEvaluator */
/* harmony import */ var _Utils_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1253);
/**
 *  File    : activities/text/Evaluator.js
 *  Created : 14/04/2015
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
 * This class and its derivatives {@link module:activities/text/Evaluator.BasicEvaluator BasicEvaluator} and
 * {@link module:activities/text/Evaluator.ComplexEvaluator ComplexEvaluator} are used to evaluate the answers written by the final users
 * in text activities.
 */
class Evaluator {
  /**
   * Evaluator constructor
   * @param {string} className - The class name of this evaluator.
   */
  constructor(className) {
    this.className = className;
    this.collator = (window.Intl && window.Intl.Collator) ?
      new window.Intl.Collator() :
      { compare: (a, b) => this.checkCase ? a === b : a.toUpperCase() === b.toUpperCase() };
  }

  /**
   * Factory constructor that returns a specific type of {@link module:activities/text/Evaluator.Evaluator Evaluator} based on the `class`
   * attribute declared in the $xml element.
   * @param {external:jQuery} $xml - The XML element to be parsed.
   * @returns {module:activities/text/Evaluator.Evaluator}
   */
  static getEvaluator($xml) {
    let ev = null;
    if ($xml) {
      const className = $xml.attr('class');
      const cl = Evaluator.CLASSES[className];
      if (cl) {
        ev = new cl(className);
        ev.setProperties($xml);
      } else
        (0,_Utils_js__WEBPACK_IMPORTED_MODULE_0__/* .log */ .Rm)('error', `Unknown evaluator class: "${className}"`);
    }
    return ev;
  }

  /**
   * Loads the object settings from a specific JQuery XML element
   * @param {external:jQuery} $xml - The jQuery XML element to parse
   */
  setProperties($xml) {
    (0,_Utils_js__WEBPACK_IMPORTED_MODULE_0__/* .attrForEach */ .GM)($xml.get(0).attributes, (name, value) => {
      switch (name) {
        case 'class':
          this.className = value;
          break;
        case 'checkCase':
        case 'checkAccents':
        case 'checkPunctuation':
        case 'checkDoubleSpaces':
        case 'detail':
          this[name] = (0,_Utils_js__WEBPACK_IMPORTED_MODULE_0__/* .getBoolean */ .pW)(value);
          break;
        case 'checkSteps':
        case 'checkScope':
          this[name] = Number(value);
          break;
      }
    });
    return this;
  }

  /**
   * Builds a new Evaluator, based on the properties specified in a data object
   * @param {object} data - The data object to be parsed
   * @returns {module:activities/text/Evaluator.Evaluator}
   */
  static factory(data) {
    const cl = Evaluator.CLASSES[data.className];
    if (cl) {
      const result = new cl(data.className);
      return (0,_Utils_js__WEBPACK_IMPORTED_MODULE_0__/* .setAttr */ .ob)(result, data, [
        'className',
        'checkCase', 'checkAccents', 'checkPunctuation', 'checkDoubleSpaces', 'detail',
        'checkSteps', 'checkScope',
      ]);
    }
    return null;
  }

  /**
   * Gets a object with the basic attributes needed to rebuild this instance excluding functions,
   * parent references, constants and also attributes retaining the default value.
   * The resulting object is commonly usued to serialize elements in JSON format.
   * @returns {object} - The resulting object, with minimal attrributes
   */
  getAttributes() {
    return (0,_Utils_js__WEBPACK_IMPORTED_MODULE_0__/* .getAttr */ .iu)(this, [
      'className',
      'checkCase', 'checkAccents', 'checkPunctuation', 'checkDoubleSpaces', 'detail',
      'checkSteps', 'checkScope',
    ]);
  }

  /**
   * Initializes this evaluator
   * @param {string[]} _locales - An array of valid locales, to be used by Intl.Collator
   */
  init(_locales) {
    this.initiated = true;
  }

  /**
   * Checks the given text against a set of valid matches
   * @param {string} text - The text to be checked
   * @param {string|string[]} match - The valid expression or expressions with which to compare.
   * @returns {boolean} - `true` if the checked expression is valid, `false` otherwise.
   */
  checkText(text, match) {
    if (match instanceof Array)
      return match.some(m => this._checkText(text, m));
    else if (match)
      return this._checkText(text, match);
    else
      return false;
  }

  /**
   * Abstract method to be implemented in subclasses.
   * Performs the validation of a string against a single match.
   * @param {string} _text - The text to be checked
   * @param {string} _match - A valid expression with which to compare.
   * @returns {boolean} - `true` when the two expressions can be considered equivalent.
   */
  _checkText(_text, _match) {
    return false;
  }

  /**
   * Evaluates the given text against a set of valid matches, returning an array of flags useful
   * to indicate where the mistakes are located.
   * @param {string} text - The text to be checked
   * @param {string|string[]} match - The valid expression or expressions with which to compare.
   * @returns {number[]} - An array of flags (one number for character) indicating whether each
   * position is erroneous or ok.
   */
  evalText(text, match) {
    if (!(match instanceof Array))
      match = [match];
    return this._evalText(text, match);
  }

  /**
   * Abstract method to be implemented in subclasses.
   * Performs the evaluation of a string against an array of valid matches, returning an array of
   * flags useful to indicate where the mistakes are located.
   * @param {string} _text - The text to be checked
   * @param {string} _match - A valid expression with which to compare.
   * @returns {number[]} - An array of flags (one number for character) indicating whether each
   * position is erroneous or OK.
   */
  _evalText(_text, _match) {
    return [];
  }

  /**
   * Checks if the given array of flags (usually returned by `evalText`) can be considered as a
   * valid or erroneous answer.
   * @param {number[]} flags
   * @returns {boolean} - `true` when there is at least one flag and all flags are 0 (meaning no error).
   */
  isOk(flags) {
    return flags && flags.length > 0 && !flags.some(f => f !== 0);
  }
}

Object.assign(Evaluator.prototype, {
  /**
   * The type of evaluator.
   * @name module:activities/text/Evaluator.Evaluator#className
   * @type {string} */
  className: null,
  /**
   * Whether this evaluator has been initialized or not.
   * @name module:activities/text/Evaluator.Evaluator#initiated
   * @type {boolean} */
  initiated: false,
  /**
   * The Intl.Collator object used to compare strings, when available.
   * @name module:activities/text/Evaluator.Evaluator#collator
   * @type {external:Collator} */
  collator: null,
  /**
   * Whether uppercase and lowercase expressions must be considered equivalent or not.
   * @name module:activities/text/Evaluator.Evaluator#checkcase
   * @type {boolean} */
  checkCase: false,
});

/**
 * A basic evaluator that just compares texts, without looking for possible coincidences of text
 * fragments once erroneous characters removed.
 * @extends module:activities/text/Evaluator.Evaluator
 */
class BasicEvaluator extends Evaluator {
  /**
   * BasicEvaluator constructor
   * @param {string} className - The class name of this evaluator.
   */
  constructor(className) {
    super(className);
  }

  /**
   * Initializes the {@link module:activities/text/Evaluator.Evaluator#collator collator}.
   * @override
   * @param {string[]} locales - An array of valid locales to be used by the Inlt.Collator object
   */
  init(locales) {
    // Call `init` method on ancestor
    super.init([locales]);

    // Get canonical locales
    if (window.Intl && window.Intl.Collator) {
      this.collator = new window.Intl.Collator(locales, {
        sensitivity: this.checkAccents ? this.checkCase ? 'case' : 'accent' : 'base',
        ignorePunctuation: !this.checkPunctuation
      });
    }
  }

  /**
   * Performs the validation of a string against a single match.
   * @override
   * @param {string} text - The text to be checked
   * @param {string} match - A valid expression with which to compare.
   * @returns {boolean} - `true` when the two expressions can be considered equivalent.
   */
  _checkText(text, match) {
    return this.collator.compare(this.getClearedText(text), this.getClearedText(match)) === 0;
  }

  /**
   * Performs the evaluation of a string against an array of valid matches, returning an array of
   * flags useful to indicate where the mistakes are located.
   * In BasicEvaluator, all characters are just marked as 1 (error) or 0 (OK). See
   * {@link module:activities/text/Evaluator.ComplexEvaluator ComplexEvaluator} for more detailed analysis of answers.
   * @override
   * @param {string} text - The text to be checked
   * @param {string} match - A valid expression with which to compare.
   * @returns {number[]} - An array of flags (one number for character) indicating whether each
   * position is erroneous or OK.
   */
  _evalText(text, match) {
    return Array(text.length).fill(this._checkText(text, match[0]) ? 0 : 1);
  }

  /**
   * Removes double spaces and erroneous characters from a given text expression.
   * @param {string} src - The text to be processed.
   * @param {boolean[]} skipped - An array of boolean indicating which characters should be removed
   * from the string.
   * @returns {string}
   */
  getClearedText(src, skipped) {
    if (this.checkPunctuation && this.checkDoubleSpaces)
      return src;

    if (!skipped)
      skipped = Array(src.length).fill(false);

    let sb = '';
    for (let i = 0, wasSpace = false; i < src.length; i++) {
      const ch = src.charAt(i);
      if (this.PUNCTUATION.indexOf(ch) >= 0 && !this.checkPunctuation) {
        if (!wasSpace)
          sb += ' ';
        else
          skipped[i] = true;
        wasSpace = true;
      } else if (ch === ' ') {
        if (this.checkDoubleSpaces || !wasSpace)
          sb += ch;
        else
          skipped[i] = true;
        wasSpace = true;
      } else {
        wasSpace = false;
        sb += ch;
      }
    }
    return sb;
  }
}

Object.assign(BasicEvaluator.prototype, {
  /**
   * Whether accented letters must be considered equivalent or not.
   * @name module:activities/text/Evaluator.BasicEvaluator#checkAccents
   * @type {boolean} */
  checkAccents: true,
  /**
   * Whether to check or not dots, commas and other punctuation marks when comparing texts.
   * @name module:activities/text/Evaluator.BasicEvaluator#checkPunctuation
   * @type {boolean} */
  checkPunctuation: true,
  /**
   * Whether to check or not the extra spaces added between words.
   * @name module:activities/text/Evaluator.BasicEvaluator#checkDoubleSpaces
   * @type {boolean} */
  checkDoubleSpaces: false,
  /**
   * String containing all the characters considered as punctuation marks (currently ".,;:")
   * @name module:activities/text/Evaluator.BasicEvaluator#PUNCTUATION
   * @type {string} */
  PUNCTUATION: '.,;:',
});

/**
 * ComplexEvaluator acts like {@link module:activities/text/Evaluator.BasicEvaluator BasicEvaluator}, but providing feedback about
 * the location of mistakes on the user's answer.
 * @extends module:activities/text/Evaluator.BasicEvaluator
 */
class ComplexEvaluator extends BasicEvaluator {
  /**
   * ComplexEvaluator constructor
   * @param {string} className - The class name of this evaluator.
   */
  constructor(className) {
    super(className);
  }

  /**
   * Performs the evaluation of a string against an array of valid matches, returning an array of
   * flags useful to indicate where the mistakes are located.
   * In BasicEvaluator, all characters are just marked as 1 (error) or 0 (OK). See
   * {@link module:activities/text/Evaluator.ComplexEvaluator ComplexEvaluator} for more detailed analysis of answers.
   * @override
   * @param {string} text - The text to be checked
   * @param {string} match - A valid expression with which to compare.
   * @returns {number[]} - An array of flags (one number for character) indicating whether each
   * position is erroneous or OK.
   */
  _evalText(text, match) {

    if (!this.detail)
      return super._evalText(text, match);

    const
      skipped = Array(text.length).fill(false),
      sText = this.getClearedText(text, skipped),
      numChecks = Array(match.length),
      flags = Array(match.length),
      returnFlags = Array(text.length);
    let
      maxCheck = -1,
      maxCheckIndex = -1;

    for (let i = 0; i < match.length; i++) {
      flags[i] = Array(text.length).fill(0);
      const ok = this.compareSegment(sText, sText.length, match[i], match[i].length, flags[i], false);
      numChecks[i] = this.countFlagsOk(flags[i]);
      if (ok) {
        maxCheckIndex = i;
        maxCheck = numChecks[i];
      }
    }

    if (maxCheckIndex === -1) {
      for (let i = 0; i < match.length; i++) {
        if (numChecks[i] > maxCheck) {
          maxCheck = numChecks[i];
          maxCheckIndex = i;
        }
      }
    }

    for (let i = 0, k = 0; i < text.length; i++)
      returnFlags[i] = skipped[i] ? 0 : flags[maxCheckIndex][k++];

    return returnFlags;
  }

  /**
   * Counts the number of flags on the provided array that are zero.
   * @param {number[]} flags
   * @returns {number}
   */
  countFlagsOk(flags) {
    return flags.reduce((n, v) => v == 0 ? ++n : n, 0);
  }

  /**
   * Compares two segments of text.
   * This function should make recursive calls.
   * @param {string} src - Text to be compared
   * @param {number} ls - Offset in `src` where to start the comparison
   * @param {string} ok - Text to match against.
   * @param {number} lok - Offset in `ok` where to start the comparison.
   * @param {number[]} attr - Array of integers that will be filled with information about the
   * validity or error of each character in `src`.
   * @param {boolean} iterate - When `true`, the segment will be iterated looking for other
   * coincident fragments.
   * @returns {boolean} - `true` if the comparison was valid.
   */
  compareSegment(src, ls, ok, lok, attr, iterate) {
    let
      is = 0,
      iok = 0,
      lastIs = 0,
      lastiok = true,
      result = true,
      chs = '',
      chok = '';

    if (ls === 0 || lok === 0 || src === null || ok === null)
      return false;

    for (; is < ls; is++, iok++) {
      chs = src.charAt(is);
      lastIs = is;
      if (iok >= 0 && iok < lok)
        chok = ok.charAt(iok);
      else
        chok = 0;
      if (this.collator.compare(chs, chok) === 0) {
        attr[is] = 0;
        lastiok = true;
      } else {
        result = false;
        attr[is] = 1;
        if (!iterate && lastiok && chok !== 0 && this.checkSteps > 0 && this.checkScope > 0) {
          const
            lbloc = 2 * this.checkSteps + 1,
            itcoinc = [];
          let i = 0, j = 0;
          for (; j < lbloc; j++) {
            itcoinc[j] = 0;
            i = iok + Math.floor((j + 1) / 2) * ((j & 1) !== 0 ? 1 : -1);
            if (i >= lok)
              continue;
            const is2 = i < 0 ? is - i : is;
            if (is2 >= ls)
              continue;
            const
              ls2 = Math.min(ls - is2, this.checkScope),
              iok2 = i < 0 ? 0 : i,
              lok2 = Math.min(lok - iok2, this.checkScope),
              flags2 = Array(src.length - is2).fill(0),
              result2 = this.compareSegment(src.substring(is2), ls2, ok.substring(iok2), lok2, flags2, true);
            itcoinc[j] = this.countFlagsOk(flags2);
            if (result2)
              break;
          }
          if (j === lbloc) {
            let jmax = this.checkSteps;
            for (j = 0; j < lbloc; j++)
              if (itcoinc[j] > itcoinc[jmax])
                jmax = j;
            i = iok + Math.floor((jmax + 1) / 2) * ((jmax & 1) !== 0 ? 1 : -1);
          }
          iok = i;
          lastiok = false;
        }
      }
    }
    if (iok !== lok) {
      result = false;
      attr[lastIs] = 1;
    }
    return result;
  }
}

Object.assign(ComplexEvaluator.prototype, {
  /**
   * Whether to detail or not the location of errors found on the analyzed text.
   * @name module:activities/text/Evaluator.ComplexEvaluator#detail
   * @type {boolean} */
  detail: true,
  /**
   * Number of times to repeat the evaluation process if an error is found, eliminating in each
   * cycle the extra characters that caused the error.
   * @name module:activities/text/Evaluator.ComplexEvaluator#checkSteps
   * @type {number} */
  checkSteps: 3,
  /**
   * When an eror is detected in the analyzed expression, this variable indicates the number of
   * characters the checking pointer will be moved forward and back looking for a coincident
   * expression.
   *
   * For example, comparing the answer "_one lardzy dog_" with the correct answer "_one lazy dog_"
   * will detect an error at position 6 (an "r" instead of "z"). If `checkSteps` is set to 2 or
   * greater, the "_zy dog_" expression at position 8 will be found and evaluated as valid, while
   * a value of 1 or less will not found any coincident expression beyond the error position, thus
   * evaluating all the remaining sentence as erroneous.
   * @name module:activities/text/Evaluator.ComplexEvaluator#checkScope
   * @type {number} */
  checkScope: 6,
});

// List of known Evaluator classes
Evaluator.CLASSES = {
  '@BasicEvaluator': BasicEvaluator,
  '@ComplexEvaluator': ComplexEvaluator
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Evaluator);


/***/ }),

/***/ 2379:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* unused harmony export AutoContentProvider */
/* harmony import */ var _Utils_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1253);
/**
 *  File    : automation/AutoContentProvider.js
 *  Created : 13/04/2015
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
 * This abstract class is the base for classes that create on-time automatic content for JClic
 * activities, usually using random parameters to assure different content in each session.
 *
 * Activities with `AutoContentProvider` objects rely on them to build new content on every start.
 */
class AutoContentProvider {
  /**
   * AutoContentProvider constructor
   */
  constructor() {
  }

  /**
   * Dynamic constructor that returns a specific type of AutoContentProvider based on the `class`
   * attribute declared on an $xml element.
   * It should be called only from {@link module:Activity.Activity#setProperties Activity.setProperties}
   * @param {external.jQuery} $xml - The XML element to parse
   * @returns {module:automation/AutoContentProvider.AutoContentProvider}
   */
  static getProvider($xml) {
    let automation = null;
    if ($xml) {
      const
        className = ($xml.attr('class') || '').replace(/^edu\.xtec\.jclic\.automation\./, '@'),
        cl = AutoContentProvider.CLASSES[className];
      if (cl) {
        automation = new cl();
        automation.setProperties($xml);
      } else
        (0,_Utils_js__WEBPACK_IMPORTED_MODULE_0__/* .log */ .Rm)('error', `Unknown AutoContentProvider class: ${className}`);
    }
    return automation;
  }

  /**
   * Loads the object settings from a specific jQuery XML element
   * @param {external:jQuery} $xml - The XML element to parse
   */
  setProperties($xml) {
    this.className = ($xml.attr('class') || '').replace(/^edu\.xtec\.jclic\.automation\./, '@');
    return this;
  }

  /**
   * Gets a object with the basic attributes needed to rebuild this instance excluding functions,
   * parent references, constants and also attributes retaining the default value.
   * The resulting object is commonly usued to serialize elements in JSON format.
   * @returns {object} - The resulting object, with minimal attrributes
   */
  getAttributes() {
    // To be overrided!
    return (0,_Utils_js__WEBPACK_IMPORTED_MODULE_0__/* .getAttr */ .iu)(this, ['className']);
  }

  /**
   * Builds a new AutoContentProvider, based on the properties specified in a data object
   * @param {object} data - The data object to be parsed
   * @param {object[]} params - Optional parameters to be passed to `setAttributes`
   * @returns {module:shapers/Shaper.Shaper}
   */
  static factory(data, params = []) {
    const cl = AutoContentProvider.CLASSES[data.className];
    return (new cl()).setAttributes(data, ...params);
  }

  /**
   * Initializes the content provider
   */
  init() {
    // To be implemented in real content providers
  }

  /**
   * Builds an {@link module:automation/AutoContentProvider/ActiveBagContentKit ActiveBagContentKit} and generates the automatized content.
   * @param {number} nRows - Number of rows to be processed
   * @param {number} nCols - Number of columns to be processed
   * @param {module:boxes/ActiveBagContent.ActiveBagContent[]} content - Array with one or more containers of {@link module:boxes/ActiveBoxContent.ActiveBoxContent ActiveBoxContent}
   * objects to be filled with new content.
   * @param {boolean} useIds - When `true`, the `id` field of {@link module:boxes/ActiveBoxContent.ActiveBoxContent ActiveBoxContent} objects is significant
   * @returns {boolean} - `true` if the process was OK. `false` otherwise.
   */
  generateContent(nRows, nCols, content, useIds) {
    return this.process(new AutoContentProvider.ActiveBagContentKit(nRows, nCols, content, useIds));
  }

  /**
   * Generates the automatized content
   * @param {module:automation/AutoContentProvider.ActiveBagContentKit} _kit - The objects to be filled with content
   * @returns {boolean} - `true` if the process was OK. `false` otherwise.
   */
  process(_kit) {
    // To be implemented in subclasses
    return false;
  }

  /**
   * Registers a new type of AutoContentProvider
   * @param {string} providerName - The name used to identify this AutoContentProvider
   * @param {function} providerClass - The activity class, usually extending AutoContentProvider
   * @returns {module:automation/AutoContentProvider.AutoContentProvider} - The provider class
   */
  static registerClass(providerName, providerClass) {
    AutoContentProvider.CLASSES[providerName] = providerClass;
    return providerClass;
  }
}

Object.assign(AutoContentProvider.prototype, {
  /**
   * This AutoContentProvider manages numeric expressions, so text literals should be
   * converted to numbers for comparisions, taking in account the
   * number format of the current locale (dot or comma as decimal separator)
   * @name module:automation/AutoContentProvider.AutoContentProvider#numericContent
   * @type {boolean} */
  numericContent: false,
});

/**
 * Utility class used to encapsulate multiple sets of box contents
 * @param {number} nRows - Number of rows to be processed
 * @param {number} nCols - Number of columns to be processed
 * @param {module:boxes/ActiveBagContent.ActiveBagContent[]} content - Array with one or more containers of {@link module:boxes/ActiveBoxContent.ActiveBoxContent ActiveBoxContent}
 * objects to be filled with new content.
 * @param {boolean} useIds - `true` when the `id` field of {@link module:boxes/ActiveBoxContent.ActiveBoxContent ActiveBoxContent} objects is significant.
 */
AutoContentProvider.ActiveBagContentKit = class {
  constructor(nRows, nCols, content, useIds) {
    this.nRows = nRows;
    this.nCols = nCols;
    this.content = content;
    this.useIds = useIds;
  }
};

/**
 * Contains the current list of classes derived from AutoContentProvider.
 * This object should be updated by real automation classes at declaration time.
 * Currently, only two types of "AutoContentProvider" are defined: {@link module:automation/arith/Arith.Arith Arith} and TagReplace.
 * @type {object} */
AutoContentProvider.CLASSES = {
  // TODO: Implement TagReplace
  '@tagreplace.TagReplace': AutoContentProvider
};

// TODO: Implement TagReplace
AutoContentProvider.registerClass('@tagreplace.TagReplace', AutoContentProvider);

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (AutoContentProvider);


/***/ }),

/***/ 1842:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* unused harmony export TextGridContent */
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(7750);
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _Utils_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(1253);
/* harmony import */ var _BoxBase_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(3018);
/**
 *  File    : boxes/TextGridContent.js
 *  Created : 14/04/2015
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
 * This class encapsulates the content of {@link module:boxes/TextGrid.TextGrid TextGrid} objects.
 *
 * It implements methods to set and retrieve individual characters on the grid, and parsing of
 * XML objects. It also contains information about the optimal size and other graphic properties
 * (fonts, colors, etc.) of the grid.
 */
class TextGridContent {
  /**
   * TextGridContent constructor
   */
  constructor() {
    this.style = new _BoxBase_js__WEBPACK_IMPORTED_MODULE_2__["default"](null);
    this.text = [];
  }

  /**
   * Loads the object settings from a specific JQuery XML element
   * @param {external:jQuery} $xml
   */
  setProperties($xml) {
    // Read attributes
    (0,_Utils_js__WEBPACK_IMPORTED_MODULE_1__/* .attrForEach */ .GM)($xml.get(0).attributes, (name, val) => {
      switch (name) {
        case 'rows':
          // WARNING: Due to a bug in JClic, the meaning of "rows" and "columns" must be
          // interchanged:
          this.ncw = Number(val);
          break;
        case 'columns':
          this.nch = Number(val);
          break;
        case 'cellWidth':
          this.w = Number(val);
          break;
        case 'cellHeight':
          this.h = Number(val);
          break;
        case 'border':
          this.border = (0,_Utils_js__WEBPACK_IMPORTED_MODULE_1__/* .getBoolean */ .pW)(val);
          break;
        case 'wild':
        case 'randomChars':
          this[name] = val;
          break;
      }
    });

    // Read inner elements
    $xml.children('style:first').each((_n, child) => {
      this.style = new _BoxBase_js__WEBPACK_IMPORTED_MODULE_2__["default"]().setProperties(jquery__WEBPACK_IMPORTED_MODULE_0___default()(child));
    });

    $xml.find('text:first > row').each((_n, el) => this.text.push(el.textContent));

    for (let i = this.text.length; i < this.nch; i++)
      this.text[i] = '';

    return this;
  }

  /**
   * Gets a object with the basic attributes needed to rebuild this instance excluding functions,
   * parent references, constants and also attributes retaining the default value.
   * The resulting object is commonly usued to serialize elements in JSON format.
   * @returns {object} - The resulting object, with minimal attrributes
   */
  getAttributes() {
    return (0,_Utils_js__WEBPACK_IMPORTED_MODULE_1__/* .getAttr */ .iu)(this, [
      'ncw', 'nch',
      'w', 'h',
      'text',
      'style', // BoxBase
      'border',
      'wild|*',
      `randomChars|${_Utils_js__WEBPACK_IMPORTED_MODULE_1__/* .settings */ .W0.RANDOM_CHARS}`,
    ]);
  }

  /**
   * Reads the properties of this TextGridContent from a data object
   * @param {object|string} data - The data object to be parsed, or just the text content
   * @returns {module:boxes/TextGridContent.TextGridContent}
   */
  setAttributes(data) {
    return (0,_Utils_js__WEBPACK_IMPORTED_MODULE_1__/* .setAttr */ .ob)(this, data, [
      'ncw', 'nch',
      'w', 'h',
      'text',
      { key: 'style', fn: _BoxBase_js__WEBPACK_IMPORTED_MODULE_2__["default"] },
      'border',
      'wild',
      `randomChars`,
    ]);
  }

  /**
   * Counts the number of wildcard characters present in this TextGrid
   * @returns {number}
   */
  countWildChars() {
    let result = 0;
    if (this.text)
      for (let y = 0; y < this.nch; y++)
        for (let x = 0; x < this.ncw; x++)
          if (this.text[y].charAt(x) === this.wild)
            result++;
    return result;
  }

  /**
   * Counts the total number of characters, including wildcard characters.
   * @returns {number}
   */
  getNumChars() {
    return this.ncw * this.nch;
  }

  /**
   * Sets the specified character as a content of the cell located at specific coordinates
   * @param {number} x - The X coordinate of the cell
   * @param {number} y - The X coordinate of the cell
   * @param {string} ch - The character to be placed on the specified cell
   */
  setCharAt(x, y, ch) {
    if (x >= 0 && x < this.ncw && y >= 0 && y < this.nch)
      this.text[y] = this.text[y].substring(0, x) + ch + this.text[y].substring(x + 1);
  }
}

Object.assign(TextGridContent.prototype, {
  /**
   * Grid columns
   * @name module:boxes/TextGridContent.TextGridContent#ncw
   * @type {number} */
  ncw: 1,
  /**
   * Grid rows
   * @name module:boxes/TextGridContent.TextGridContent#nch
   * @type {number} */
  nch: 1,
  /**
   * Width of cells
   * @name module:boxes/TextGridContent.TextGridContent#w
   * @type {number} */
  w: 20,
  /**
   * Height of cells
   * @name module:boxes/TextGridContent.TextGridContent#h
   * @type {number} */
  h: 20,
  /**
   * Whether the cells must be surrounded by a border or not
   * @name module:boxes/TextGridContent.TextGridContent#border
   * @type {boolean} */
  border: false,
  /**
   * The {@link module:boxes/BoxBase.BoxBase BoxBase} object with visual settings of the text grid
   * @name module:boxes/TextGridContent.TextGridContent#style
   * @type {module:boxes/BoxBase.BoxBase} */
  style: null,
  /**
   * An array of String objects textning the chars of cells. One string per row, one character of
   * this string per cell.
   * @name module:boxes/TextGridContent.TextGridContent#text
   * @type {string[]} */
  text: null,
  /**
   * The letter used as wildcardtext
   * @name module:boxes/TextGridContent.TextGridContent#wild
   * @type {string} */
  wild: '*',
  /**
   * A String with the chars to take as source when randomly filling empty cells
   * @name module:boxes/TextGridContent.TextGridContent#randomChars
   * @type {string} */
  randomChars: _Utils_js__WEBPACK_IMPORTED_MODULE_1__/* .settings */ .W0.RANDOM_CHARS,
});

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (TextGridContent);


/***/ })

};
;
//# sourceMappingURL=1567.jclic-node.js.map