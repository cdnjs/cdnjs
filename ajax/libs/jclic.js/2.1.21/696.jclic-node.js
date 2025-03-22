"use strict";
exports.id = 696;
exports.ids = [696,4483];
exports.modules = {

/***/ 696:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* unused harmony export JClicPlayer */
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(7750);
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var jszip__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(8194);
/* harmony import */ var jszip__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(jszip__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var jszip_utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(6402);
/* harmony import */ var jszip_utils__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(jszip_utils__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _Utils_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(1253);
/* harmony import */ var _AWT_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(7912);
/* harmony import */ var _PlayerHistory_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(4483);
/* harmony import */ var _media_ActiveMediaBag_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(827);
/* harmony import */ var _skins_Skin_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(757);
/* harmony import */ var _media_EventSounds_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(5338);
/* harmony import */ var _project_JClicProject_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(9950);
/* harmony import */ var _bags_JumpInfo_js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(7220);
/* harmony import */ var _boxes_ActiveBoxContent_js__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(9072);
/* harmony import */ var _report_Reporter_js__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(6782);
/* harmony import */ var _bags_MediaBagElement_js__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(1196);
/**
 *  File    : JClicPlayer.js
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
 *  (c) 2000-2022 Educational Telematic Network of Catalonia (XTEC)
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

/* global JSON, Promise, location, window, document */
















/**
 * JClicPlayer is one of the the main classes of the JClic system. It implements the
 * {@link http://projectestac.github.io/jclic/apidoc/edu/xtec/jclic/PlayStation.html PlayStation}
 * interface, needed to host JClic activities.
 * JClicPlayer offers to {@link module:Activity.ActivityPanel ActivityPanel} objects all the necessary resources and functions:
 * media bags (to load and realize images and other media contents), sequence control, management
 * of the reporting system, user interface, display of system messages, etc.
 * @extends module:AWT.Container
 */
class JClicPlayer extends _AWT_js__WEBPACK_IMPORTED_MODULE_4__/* .Container */ .mc {

  /**
   * JClicPlayer constructor
   * @param {external:jQuery} $topDiv - The HTML `div` element where this JClicPlayer will deploy.
   * @param {object} [options] - A set of optional customized options.
   */
  constructor($topDiv, options) {

    // JClicPlayer extends Container
    super();
    // Build cascading options
    options = (0,_Utils_js__WEBPACK_IMPORTED_MODULE_3__/* .init */ .Ts)(options);
    this.options = jquery__WEBPACK_IMPORTED_MODULE_0___default().extend(Object.create(this.options), options);
    // Generate unique ID
    this.id = `JC${(0x10000 + Math.round(Math.random() * 0xFFFF)).toString(16).toUpperCase().substring(1)}`;
    // Identify the HTML element where this player will deploy
    this.$topDiv = $topDiv || jquery__WEBPACK_IMPORTED_MODULE_0___default()('<div/>');
    // Avoid side effects of 'align=center' in old HTML pages
    this.$topDiv.css({ 'text-align': 'initial' });

    // Special case: $topDiv inside a TD (like in http://clic.xtec.cat/gali)
    if (this.$topDiv.parent().is('td')) {
      // Set explicit width and height to fill-in the TD
      this.$topDiv.css({
        width: (0,_Utils_js__WEBPACK_IMPORTED_MODULE_3__/* .toCssSize */ .SV)(this.options.width, null, null, '100%'),
        height: (0,_Utils_js__WEBPACK_IMPORTED_MODULE_3__/* .toCssSize */ .SV)(this.options.height, null, null, '100%'),
      });
    }

    // Build the main container
    this.$mainContainer = jquery__WEBPACK_IMPORTED_MODULE_0___default()('<div/>', { class: 'JClicContainer', id: this.id })
      .css({ width: '100%', height: '100%' })
      .appendTo(this.$topDiv);

    // Intitialize other elements
    this.localFS = location && location.protocol === 'file:';
    this.$div = jquery__WEBPACK_IMPORTED_MODULE_0___default()('<div/>', { class: 'JClicPlayer' });
    this.project = new _project_JClicProject_js__WEBPACK_IMPORTED_MODULE_9__["default"]();
    this.activeMediaBag = new _media_ActiveMediaBag_js__WEBPACK_IMPORTED_MODULE_6__["default"]();
    this.counterVal = { score: 0, actions: 0, time: 0 };
    this.bgImageOrigin = new _AWT_js__WEBPACK_IMPORTED_MODULE_4__/* .Point */ .bR();
    this.buildActions();
    this.history = new _PlayerHistory_js__WEBPACK_IMPORTED_MODULE_5__["default"](this);
    this.audioEnabled = this.options.audioEnabled;
    this.navButtonsAlways = this.options.navButtonsAlways;
    this.defaultSkin = _skins_Skin_js__WEBPACK_IMPORTED_MODULE_7__["default"].getSkin(this.options.skin, this);
    this.setSkin(_skins_Skin_js__WEBPACK_IMPORTED_MODULE_7__["default"].getSkin('@empty.xml', this));
    this.initTimers();
    this.listenTouchEvents();
    (0,_Utils_js__WEBPACK_IMPORTED_MODULE_3__/* .log */ .Rm)('info', 'JClicPlayer ready');
  }

  /**
   *
   * Detects swipe-right, swipe-left and double touch gestures on touch devices,
   * associating them with 'next activity', 'previous activity' and 'toggle full screen' actions
   */
  listenTouchEvents() {

    // Enable listeners only in touch devices
    //if ('ontouchstart' in window) {

    let startTouch = null;
    let startTouchTime = 0;
    let thisDiv = this.$div[0];
    const { minSwipeX, maxSwipeY, rightToLeft } = this.options;

    // Generic handler for touch events
    const touchEventHandler = event => {
      // Process only single-finger events targeted to our main 'div'
      if (event.target === thisDiv && event.changedTouches && event.changedTouches.length === 1) {
        const touch = event.changedTouches[0];
        const dx = startTouch ? touch.clientX - startTouch.clientX : 0;
        const dy = startTouch ? touch.clientY - startTouch.clientY : 0;
        const dist = Math.sqrt(dx * dx + dy * dy);

        switch (event.type) {
          case 'touchstart':
            const currentTime = new Date();
            // Detect double taps, done in less than 800 ms and at short distance
            if (
              document && document.fullscreenEnabled
              && startTouch && startTouchTime
              && currentTime - startTouchTime < 800
              && dist < minSwipeX
            ) {
              event.preventDefault();
              (0,_Utils_js__WEBPACK_IMPORTED_MODULE_3__/* .log */ .Rm)('info', 'Toggle full screen mode from double touch');
              this.skin.setScreenFull();
              startTouch = null;
            }
            else {
              startTouch = touch;
              startTouchTime = currentTime;
            }
            break;

          case 'touchend':
            // Discard non-horizontal gestures and those that do not have sufficient length
            if (startTouch && Math.abs(dx) > minSwipeX && Math.abs(dy) < maxSwipeY) {
              const actionName = dx < 0 && !rightToLeft ? 'next' : 'prev';
              const action = this.actions[actionName];
              if (action && action.enabled) {
                event.preventDefault();
                (0,_Utils_js__WEBPACK_IMPORTED_MODULE_3__/* .log */ .Rm)('info', `Performing action "${actionName}" from touch gesture`);
                action.actionPerformed(event);
              }
              startTouch = null;
            }
            // Cancel double touch detection when long gestures detected
            else if (dist > minSwipeX)
              startTouch = null;
            break;

          case 'touchcancel':
            startTouch = null;
            break;
        }
      }
      else
        // Cancel any started gesture
        startTouch = null;
    };

    // Handle touch events
    thisDiv.addEventListener('touchstart', touchEventHandler);
    thisDiv.addEventListener('touchend', touchEventHandler);
    thisDiv.addEventListener('touchcancel', touchEventHandler);
    //}
  }

  /**
   * Generates an unique ID for elements being used with this player
   * @param {string} lb - The element's label
   * @returns {string}
   */
  getUniqueId(lb) {
    return `${this.id}-${lb}`;
  }

  /**
   * Builds the {@link module:AWT.Action} objects for this player
   */
  buildActions() {
    this.actions = {
      'next': new _AWT_js__WEBPACK_IMPORTED_MODULE_4__/* .Action */ .rc('next', () => this.history.processJump(this.project.activitySequence.getJump(false, this.reporter), false)),
      'prev': new _AWT_js__WEBPACK_IMPORTED_MODULE_4__/* .Action */ .rc('prev', () => this.history.processJump(this.project.activitySequence.getJump(true, this.reporter), false)),
      'return': new _AWT_js__WEBPACK_IMPORTED_MODULE_4__/* .Action */ .rc('return', () => this.history.pop()),
      'reset': new _AWT_js__WEBPACK_IMPORTED_MODULE_4__/* .Action */ .rc('reset', () => { if (this.actPanel && this.actPanel.act.canReinit()) this.initActivity(); }),
      'help': new _AWT_js__WEBPACK_IMPORTED_MODULE_4__/* .Action */ .rc('help', () => { if (this.actPanel) this.actPanel.showHelp(); }),
      'info': new _AWT_js__WEBPACK_IMPORTED_MODULE_4__/* .Action */ .rc('info', () => {
        if (this.actPanel && this.actPanel.act.hasInfo()) {
          if (this.actPanel.act.infoUrl)
            this.displayURL(this.act.infoUrl, true);
          else if (this.actPanel.act.infoCmd)
            this.runCmd(this.actPanel.act.infoCmd);
        }
      }),
      'reports': new _AWT_js__WEBPACK_IMPORTED_MODULE_4__/* .Action */ .rc('reports', () => this.showReports()),
      'audio': new _AWT_js__WEBPACK_IMPORTED_MODULE_4__/* .Action */ .rc('audio', () => {
        this.audioEnabled = !this.audioEnabled;
        if (!this.audioEnabled)
          this.stopMedia();
        _media_EventSounds_js__WEBPACK_IMPORTED_MODULE_8__["default"].prototype.globalEnabled = this.audioEnabled;
      })
    };

    jquery__WEBPACK_IMPORTED_MODULE_0___default().each(this.actions, (key, value) => {
      value.addStatusListener(action => { if (this.skin) this.skin.actionStatusChanged(action); });
    });
  }

  /**
   * Resets the main components of this player
   */
  reset() {
    (0,_Utils_js__WEBPACK_IMPORTED_MODULE_3__/* .log */ .Rm)('info', 'Restoring player');
    this.removeActivity();
    this.end();
    this.activeMediaBag = new _media_ActiveMediaBag_js__WEBPACK_IMPORTED_MODULE_6__["default"]();
    this.history.clearHistory();
    this.setSkin(null);
    this.setMsg(null);
    this.setCounterValue('score', 0);
    this.setCounterValue('actions', 0);
    this.setCounterValue('time', 0);
    if (this.skin)
      this.skin.setWaitCursor('reset');
  }

  /**
   * Instructs the player to stop working
   */
  stop() {
    this.stopMedia(-1);
  }

  /**
   * Executes miscellaneous finalization routines.
   * @returns {external:Promise} - A promise to be fullfilled when all pending tasks are finished.
   */
  end() {
    let result = null;
    this.stopMedia();
    this.closeHelpWindow();
    if (this.reporter) {
      result = this.reporter.end();
      this.reporter = null;
    }
    if (this.actPanel) {
      this.actPanel.end();
      this.actPanel.$div.remove();
      this.actPanel = null;
    }
    if (this.project) {
      this.project.end();
      this.project = null;
    }
    if (this.activeMediaBag)
      this.activeMediaBag.removeAll();
    return result || Promise.resolve(true);
  }

  /**
   * Creates and initializes the {@link module:Reporter.Reporter Reporter} member
   * @returns {external:Promise}
   */
  initReporter() {
    if (this.reporter) {
      this.reporter.end();
      this.reporter = null;
    }
    this.reporter = _report_Reporter_js__WEBPACK_IMPORTED_MODULE_12__["default"].getReporter(null, this);
    return this.reporter.init();
  }

  /**
   * Creates and initializes objects of type {@link module:AWT.Timer}
   */
  initTimers() {
    // Main timer
    if (this.timer)
      this.timer.stop();
    this.timer = new _AWT_js__WEBPACK_IMPORTED_MODULE_4__/* .Timer */ .M4(() => {
      this.incCounterValue('time');
      if (this.actPanel && this.actPanel.act.maxTime > 0
        && this.actPanel.playing
        && this.counterVal['time'] >= this.actPanel.act.maxTime)
        this.actPanel.finishActivity(false);
    }, 1000, false);

    // One-time timer, for delayed actions
    if (this.delayedTimer)
      this.delayedTimer.stop();
    this.delayedTimer = new _AWT_js__WEBPACK_IMPORTED_MODULE_4__/* .Timer */ .M4(() => {
      if (this.delayedAction)
        this.delayedAction.processEvent(this.delayedAction, null);
    }, 1000, false);
    this.delayedTimer.repeats = false;
  }

  /**
   * Opens the reports dialog
   */
  showReports() {
    if (this.skin) this.skin.showReports(this.reporter);
  }

  /**
   * Closes the help dialog window
   */
  closeHelpWindow() {
    if (this.skin) this.skin._closeDlg(false);
  }

  /**
   * Sets the current skin
   * @param {module:skins/Skin.Skin} [newSkin] - The skin to use. When `null`, `defaultSkin` will be used.
   */
  setSkin(newSkin) {
    newSkin = newSkin || (this.project && this.project.skin ? this.project.skin : this.defaultSkin);
    if (newSkin && (this.skin === null || newSkin.name !== this.skin.name)) {
      newSkin.attach(this);
      this.skin = newSkin;
      this.skin.doLayout();
    }
  }

  /**
   * Sets the current project of this player, without starting any activity
   * @param {module:project/JClicProject.JClicProject} project - The project to be set
   */
  setProject(project) {
    if (this.project) {
      if (this.project !== project)
        this.project.end();
      this.removeActivity();
    }
    this.project = project || new _project_JClicProject_js__WEBPACK_IMPORTED_MODULE_9__["default"]();
    this.project.realize(this);
  }

  /**
   * Loads the specified project and starts playing at the specified activity or sequence tag.
   * @param {string|JClicProject} [project] - The project to load (if it's a string) or to use (if it's an object of type {@link module:project/JClicProject.JClicProject JClicProject}).
   * When it's a `string`, it can be the absolute or relative path to:
   * - A `.jclic` project file, in XML format
   * - A `.jclic.json` project file in JSON format
   * - A `.jclic.zip` compressed project file (containing one file of type '.jclic' or '.jclic.json')
   * - A `.scorm.zip` file, as exported by JClic Author.
   * - A `project.json` file, as exported by JClic Author
   * When `null` or `undefined`, refers to the current project.
   * @param {string|number} [sequence] - Sequence tag or numeric order in the {@link module:bags/ActivitySequence.ActivitySequence ActivitySequence}
   * to be loaded. If _sequence_ and _activity_ are both `null`, the first {@link module:bags/ActivitySequenceElement.ActivitySequenceElement ActivitySequenceElement}
   * will be loaded.
   * @param {string} [activity] - Name of the activity to be loaded (usually `null`)
   */
  load(project, sequence, activity) {

    this.forceFinishActivity();
    this.setWaitCursor(true);

    // The ActivityPanel object to be obtained as a result of the loading process
    let actp = null;

    // step one: load the project
    if (project) {
      if (typeof project === 'string') {

        // Param `project` is a file name or URL (otherwise, is a realized `JClicProject` object)
        const fullPath = (0,_Utils_js__WEBPACK_IMPORTED_MODULE_3__/* .getPath */ .Yn)(this.basePath, project);

        // Previous step: Check if `project` points to a "project.json" file
        if (fullPath.endsWith('project.json')) {
          (0,_Utils_js__WEBPACK_IMPORTED_MODULE_3__/* .log */ .Rm)('info', `Loading JSON info from: ${fullPath}`);
          jquery__WEBPACK_IMPORTED_MODULE_0___default().getJSON(fullPath).done(({ mainFile }) => {
            // Read the `mainFile` field of `project.json`
            if (mainFile && (0,_Utils_js__WEBPACK_IMPORTED_MODULE_3__/* .endsWith */ .d5)(mainFile, '.jclic') || (0,_Utils_js__WEBPACK_IMPORTED_MODULE_3__/* .endsWith */ .d5)(mainFile, '.jclic.json')) {
              // Load project's main file
              this.load((0,_Utils_js__WEBPACK_IMPORTED_MODULE_3__/* .getPath */ .Yn)((0,_Utils_js__WEBPACK_IMPORTED_MODULE_3__/* .getBasePath */ .DT)(fullPath), mainFile), sequence, activity);
            } else {
              (0,_Utils_js__WEBPACK_IMPORTED_MODULE_3__/* .log */ .Rm)('error', `Invalid or null "mainFile" specified in ${fullPath} - "project.json".`);
            }
          }).fail((jqhxr, textStatus, error) => {
            const errMsg = `${textStatus} (${error}) while loading ${project}`;
            (0,_Utils_js__WEBPACK_IMPORTED_MODULE_3__/* .log */ .Rm)(errMsg);
            window.alert(`Error!\n${errMsg}`);
          }).always(
            () => this.setWaitCursor(false)
          );
          return;
        }

        // Step 0: Check if `project` points to a ZIP file
        if (fullPath.endsWith('.zip')) {
          // TODO: Implement register of zip files in PlayerHistory
          this.zip = null;
          (0,_Utils_js__WEBPACK_IMPORTED_MODULE_3__/* .log */ .Rm)('info', `Loading ZIP file: ${fullPath}`);

          // Launch loading of ZIP file in a separated thread
          jszip_utils__WEBPACK_IMPORTED_MODULE_2___default().getBinaryContent(fullPath, (err, data) => {
            if (err) {
              this.setWaitCursor(false);
              (0,_Utils_js__WEBPACK_IMPORTED_MODULE_3__/* .log */ .Rm)('error', `Error loading ZIP file: ${err.toString()}`);
              return;
            }
            new (jszip__WEBPACK_IMPORTED_MODULE_1___default())().loadAsync(data).then(zip => {
              this.zip = zip;
              this.zip.fullZipPath = fullPath;
              this.zip.zipBasePath = (0,_Utils_js__WEBPACK_IMPORTED_MODULE_3__/* .getBasePath */ .DT)(fullPath);
              let fileName = null;
              // Check if ZIP contains a "project.json" file (as in the ".scorm.zip" files generated by JClic Author)
              if (this.zip.files['project.json']) {
                this.zip.files['project.json'].async('string').then(content => {
                  try {
                    const json = JSON.parse(content);
                    // Read the `mainFile` field of `project.json`
                    if ((0,_Utils_js__WEBPACK_IMPORTED_MODULE_3__/* .endsWith */ .d5)(json['mainFile'], '.jclic')) {
                      // Load project's main file
                      this.load((0,_Utils_js__WEBPACK_IMPORTED_MODULE_3__/* .getPath */ .Yn)(this.zip.zipBasePath, json['mainFile']), sequence, activity);
                    } else {
                      (0,_Utils_js__WEBPACK_IMPORTED_MODULE_3__/* .log */ .Rm)('error', `Invalid or null "mainFile" specified in ${fullPath} - "project.json".`);
                    }
                  } catch (err) {
                    (0,_Utils_js__WEBPACK_IMPORTED_MODULE_3__/* .log */ .Rm)('error', `Error reading "project.json" in ${fullPath}: ${err ? err.toString() : 'unknown error'}`);
                  }
                }).catch(reason => {
                  (0,_Utils_js__WEBPACK_IMPORTED_MODULE_3__/* .log */ .Rm)('error', `Error reading ZIP file: ${reason ? reason.toString() : 'unknown reason'}`);
                });
              } else {
                // Find first file with extension '.jclic' inside the zip file
                fileName = Object.keys(this.zip.files).find(fn => fn.endsWith('.jclic')) || null;
                if (fileName)
                  this.load((0,_Utils_js__WEBPACK_IMPORTED_MODULE_3__/* .getPath */ .Yn)(this.zip.zipBasePath, fileName), sequence, activity);
                else
                  (0,_Utils_js__WEBPACK_IMPORTED_MODULE_3__/* .log */ .Rm)('error', 'This ZIP file does not contain any JClic project!');
              }
              this.setWaitCursor(false);
            }).catch(reason => {
              (0,_Utils_js__WEBPACK_IMPORTED_MODULE_3__/* .log */ .Rm)('error', `Error reading ZIP file: ${reason ? reason.toString() : 'unknown reason'}`);
              this.setWaitCursor(false);
            });
          });
          return;
        } else if (this.localFS && window.JClicObject && !window.JClicObject.projectFiles[fullPath]) {
          const scriptTag = document.createElement('script');
          scriptTag.src = `${fullPath}.js`;
          scriptTag.onload = () => {
            // 25 Mar 20201:
            // Workaround for a bug on Chrome and Firefox XML parsers, throwing errors whith hexadecimal character entities
            if (window.JClicObject.projectFiles[fullPath]) {
              window.JClicObject.projectFiles[fullPath] = (0,_Utils_js__WEBPACK_IMPORTED_MODULE_3__/* .mReplace */ .wF)([
                [/&#xD;/g, '\r'],
                [/&#xA;/g, '\n'],
                [/&#x9;/g, '\t'],
              ], window.JClicObject.projectFiles[fullPath]);
              this.load(project, sequence, activity);
            }
          };
          document.head.appendChild(scriptTag);
          this.setWaitCursor(false);
          return;
        }

        // Step one: load the project file
        const processProjectFile = fp => {
          const isXml = fp.indexOf('data:text/xml;') === 0 || fp.endsWith('.jclic');

          const loader = isXml ? jquery__WEBPACK_IMPORTED_MODULE_0___default().get(fp, null, null, 'xml') : jquery__WEBPACK_IMPORTED_MODULE_0___default().getJSON(fp);

          loader.done(data => {
            if (data === null || typeof data !== 'object') {
              (0,_Utils_js__WEBPACK_IMPORTED_MODULE_3__/* .log */ .Rm)('error', `Bad data. Project not loaded: ${project}`);
              return;
            }
            const prj = new _project_JClicProject_js__WEBPACK_IMPORTED_MODULE_9__["default"]();
            if (isXml)
              prj.setProperties(jquery__WEBPACK_IMPORTED_MODULE_0___default()(data).find('JClicProject'), fullPath, this.zip, this.options);
            else
              prj.setAttributes(data, fullPath, this.zip, this.options);

            (0,_Utils_js__WEBPACK_IMPORTED_MODULE_3__/* .log */ .Rm)('info', `Project file loaded and parsed: ${project}`);
            const elements = prj.mediaBag.buildAll(null, element => {
              (0,_Utils_js__WEBPACK_IMPORTED_MODULE_3__/* .log */ .Rm)('trace', `"${element.name}" ready.`);
              this.incProgress(1);
            }, this);
            (0,_Utils_js__WEBPACK_IMPORTED_MODULE_3__/* .log */ .Rm)('info', `Media elements to be loaded: ${elements}`);
            this.setProgress(0, elements);
            let loops = 0;
            const interval = 500;
            this.setWaitCursor(true);
            const checkMedia = window.setInterval(() => {
              // Wait for a maximum time of two minutes
              if (++loops > this.options.maxWaitTime / interval) {
                window.clearInterval(checkMedia);
                this.setProgress(-1);
                this.setWaitCursor(false);
                (0,_Utils_js__WEBPACK_IMPORTED_MODULE_3__/* .log */ .Rm)('error', 'Error loading media');
              }
              const waitingObjects = prj.mediaBag.countWaitingElements();
              // player.setProgress(waiting)
              if (waitingObjects === -1) {
                window.clearInterval(checkMedia);
                this.setProgress(-1);
                this.setWaitCursor(false);
                // Call `load` again, passing the loaded [JClicProject](JClicProject.html) as a parameter
                this.load(prj, sequence, activity);
              }
            }, interval);
          }).fail((jqXHR, textStatus, errorThrown) => {
            const errMsg = `${textStatus} (${errorThrown}) while loading ${project}`;
            (0,_Utils_js__WEBPACK_IMPORTED_MODULE_3__/* .log */ .Rm)(errMsg);
            window.alert(`Error!\n${errMsg}`);
          }).always(() => this.setWaitCursor(false));
        };


        (0,_Utils_js__WEBPACK_IMPORTED_MODULE_3__/* .log */ .Rm)('info', `Loading project: ${project}`);
        let fp = fullPath;

        // Special case for ZIP files
        if (this.zip) {
          const fName = (0,_Utils_js__WEBPACK_IMPORTED_MODULE_3__/* .getRelativePath */ .Aj)(fp, this.zip.zipBasePath);
          if (this.zip.files[fName]) {
            this.zip.file(fName).async('string').then(text => {
              processProjectFile(`data:${fName.endsWith('.jclic') ? 'text/xml' : 'application/json'};charset=UTF-8,${text}`);
            }).catch(reason => {
              (0,_Utils_js__WEBPACK_IMPORTED_MODULE_3__/* .log */ .Rm)('error', `Unable to extract "${fName}" from ZIP file because of: ${reason ? reason.toString() : 'unknown reason'}`);
              this.setWaitCursor(false);
            });
            return;
          }
        }
        // Special case for local file systems (using `file` protocol)
        else if (this.localFS) {
          // Check if file is already loaded in the global variable `JClicObject`
          if (window.JClicObject && window.JClicObject.projectFiles[fullPath]) {
            fp = `data:${fullPath.endsWith('.jclic') ? 'text/xml' : 'application/json'};charset=UTF-8,${window.JClicObject.projectFiles[fullPath]}`;
          } else {
            (0,_Utils_js__WEBPACK_IMPORTED_MODULE_3__/* .log */ .Rm)('error', `Unable to load: ${fullPath}.js`);
            this.setWaitCursor(false);
            return;
          }
        }
        processProjectFile(fp);
        return;
      }

      // From here, assume that `project` is a [JClicProject](JClicProject.html)
      this.setProject(project);

      // If none specified, start with the first element of the sequence
      if (!sequence && !activity)
        sequence = '0';

      // start reporter session
      if (this.reporter)
        this.reporter.newSession(project);

    }

    // Step two: load the ActivitySequenceElement
    if (!(0,_Utils_js__WEBPACK_IMPORTED_MODULE_3__/* .isNullOrUndef */ .Pj)(sequence)) {
      (0,_Utils_js__WEBPACK_IMPORTED_MODULE_3__/* .log */ .Rm)('info', `Loading sequence: ${sequence}`);
      this.navButtonsDisabled = false;
      // Try to load sequence by tag
      let ase = null;
      if (typeof sequence === 'string')
        ase = this.project.activitySequence.getElementByTag(sequence, true);
      if (ase === null) {
        // Try to treat 'sequence' as a number
        const n = parseInt(sequence, 10);
        if (typeof n === 'number')
          ase = this.project.activitySequence.getElement(n, true);
      }

      if (ase !== null) {
        // Success! We have a real [ActivitySequenceElement](ActivitySequenceElement.html)
        if (this.reporter)
          this.reporter.newSequence(ase);
        activity = ase.activity;
      }
    }

    // Step three: load the activity
    if (activity) {
      const act = this.project.getActivity(activity);
      if (act) {
        // Success! We have a real [Activity](Activity.html)
        (0,_Utils_js__WEBPACK_IMPORTED_MODULE_3__/* .log */ .Rm)('info', `Loading activity: ${activity}`);
        // Clean static references to previous audio elements
        _bags_MediaBagElement_js__WEBPACK_IMPORTED_MODULE_13__["default"].resetAudioElements();
        act.prepareMedia(this);
        this.project.activitySequence.checkCurrentActivity(act.name);
        actp = act.getActivityPanel(this);
        actp.buildVisualComponents();
      } else {
        (0,_Utils_js__WEBPACK_IMPORTED_MODULE_3__/* .log */ .Rm)('error', `Missing activity: ${activity}`);
      }
    }

    // Step four: put the activity panel on place

    // Remove the current ActivityPanel
    if (this.actPanel !== null) {
      this.actPanel.end();
      this.actPanel.$div.remove();
      this.actPanel = null;
      this.setCounterValue('time', 0);
    }

    // Attach the new ActivityPanel
    if (actp) {
      // Sets the actPanel member to this ActivityPanel
      this.actPanel = actp;

      if (this.options.fade > 0)
        this.actPanel.$div.css('display', 'none');

      // Places the JQuery DOM element of actPanel within the player main panel
      this.$div.prepend(this.actPanel.$div);
      if (this.skin)
        this.skin.resetAllCounters(false);

      // Sets the current skin
      if (this.actPanel.skin)
        this.setSkin(this.actPanel.skin);
      else if (this.project.skin) {
        this.setSkin(this.project.skin);
        this.lastProjectSkin = this.project.skin;
      }
      else if (this.lastProjectSkin)
        this.setSkin(this.lastProjectSkin);
      else
        this.setSkin(null);

      if (this.skin) {
        // Enable or disable actions
        const hasReturn = this.history.storedElementsCount() > 0 || this.options.returnAsExit;
        const navBtnFlag = this.navButtonsAlways ?
          'both' : this.navButtonsDisabled ?
            'none' : this.project.activitySequence.getNavButtonsFlag();
        this.actions['next'].setEnabled((navBtnFlag === 'fwd' || navBtnFlag === 'both') &&
          this.project.activitySequence.hasNextAct(hasReturn));
        this.actions['prev'].setEnabled((navBtnFlag === 'back' || navBtnFlag === 'both') &&
          this.project.activitySequence.hasPrevAct(hasReturn));
        this.actions['return'].setEnabled(hasReturn);
        this.actions['help'].setEnabled(this.actPanel.act.helpWindowAllowed());
        this.actions['reset'].setEnabled(this.actPanel.act.canReinit());
        this.actions['info'].setEnabled(this.actPanel.act.hasInfo());
      }
      this.doLayout();
      this.initActivity();

      this.history.pushBrowserHistory();

      this.actPanel.$div.fadeIn(this.options.fade, () => this.activityReady());
    }
    this.setWaitCursor(false);
  }

  /**
   * Forces the current activity to stop playing.
   */
  forceFinishActivity() {
    this.timer.stop();
    this.delayedTimer.stop();
    if (this.actPanel) {
      this.closeHelpWindow();
      this.actPanel.forceFinishActivity();
      this.stopMedia();
      this.activeMediaBag.removeAll();
    }
  }

  /**
   *
   * Removes the current {@link module:Activity.ActivityPanel ActivityPanel} from this player
   */
  removeActivity() {
    this.forceFinishActivity();
    if (this.actPanel) {
      this.actPanel.end();
      this.actPanel.$div.remove();
      this.actPanel = null;
      this.setMsg(null);
      this.doLayout();
    }
  }

  /**
   *
   * Initializes the activity
   */
  initActivity() {
    this.setWaitCursor(true);
    this.timer.stop();
    this.delayedTimer.stop();
    this.setCounterValue('time', 0);
    this.stopMedia();
    if (this.actPanel) {
      this.actPanel.initActivity();
      this.timer.start();
      if (!this.actPanel.act.mustPauseSequence())
        this.startAutoPassTimer();
      (0,_Utils_js__WEBPACK_IMPORTED_MODULE_3__/* .log */ .Rm)('info', `Activity "${this.actPanel.act.name}" running`);
    }
    this.setWaitCursor(false);
  }

  /**
   * Called by {@link module:JClicPlayer.JClicPlayer#load} when the {@link module:Activity.ActivityPanel ActivityPanel} is fully visible, just
   * after the JQuery animation effect.
   */
  activityReady() {
    if (this.actPanel) {
      this.actPanel.activityReady();
      (0,_Utils_js__WEBPACK_IMPORTED_MODULE_3__/* .log */ .Rm)('info', 'Activity ready');
    }
  }

  /**
   * Starts the activity. This method is usually called from text activities with previous text.
   */
  startActivity() {
    this.setWaitCursor(true);
    if (this.actPanel)
      this.actPanel.startActivity();
    this.setWaitCursor(false);
  }

  /**
   * Configures the layout and visual aspect of the player area.
   */
  doLayout() {

    // Main player area settings
    const
      width = this.dim.width = this.$div.width(),
      height = this.dim.height = this.$div.height(),
      mainCss = {
        'background-color': this.actPanel ? this.actPanel.act.bgColor : 'azure',
        'background-image': ''
      };

    if (this.actPanel) {
      const act = this.actPanel.act;
      if (act.bgGradient)
        // Canvas version also available
        mainCss['background-image'] = act.bgGradient.getCss();

      if (act.bgImageFile && act.bgImageFile.length > 0) {
        this.project.mediaBag.getElement(act.bgImageFile, true).getFullPathPromise().then(bgImageUrl => {
          this.$div.css({
            'background-image': 'url(\'' + bgImageUrl + '\')',
            'background-repeat': act.tiledBgImg ? 'repeat' : 'no-repeat',
            'background-position': act.tiledBgImg ? '' : 'center center'
          });
        });
      }

      // Activity panel settings
      // Calc the maximum rectangle available for the activity panel
      const
        m = _Utils_js__WEBPACK_IMPORTED_MODULE_3__/* .settings */ .W0.BoxBase.AC_MARGIN,
        proposedRect = new _AWT_js__WEBPACK_IMPORTED_MODULE_4__/* .Rectangle */ .M_(m, m, width - 2 * m, height - 2 * m);

      if (this.actPanel.bgImage && !act.tiledBgImg && act.absolutePositioned) {
        // Special case: when the activity has a background image not tiled, and an absolute
        // position has been specified, the ActivityPanel must be placed at this absolute
        // position, relative to the background image
        this.bgImageOrigin.x = (width - this.actPanel.bgImage.width) / 2;
        this.bgImageOrigin.y = (height - this.actPanel.bgImage.height) / 2;
        proposedRect.pos.moveTo(this.bgImageOrigin);
        proposedRect.dim.width -= this.bgImageOrigin.x - m;
        proposedRect.dim.height -= this.bgImageOrigin.y - m;
        proposedRect.dim.width = Math.min(proposedRect.dim.width, width);
        proposedRect.dim.height = Math.min(proposedRect.dim.height, height);
      }

      // ActivityPanel will calculate and set its position and size based on the maximum and optimal
      // available space
      /* TODO: Try with a computed rectangle instead of "this", to avoid the loss of the right margin
       * in narrow displays */
      this.actPanel.fitTo(proposedRect, this);
    }
    this.$div.css(mainCss);
  }

  /**
   * Plays the specified media.
   * @param {module:media/MediaContent.MediaContent} mediaContent - The media to be played
   * @param {module:boxes/ActiveBox.ActiveBox} [mediaPlacement] - The cell where the graphic component of this media should be placed (used with video objects)
   * @param {function[]} [delayedActions] - If set, store the the action in this array for future execution
   */
  playMedia(mediaContent, mediaPlacement = null, delayedActions = null) {

    let ji = null;
    const fn = mediaContent.file;
    let action = null;

    switch (mediaContent.type) {
      case 'PLAY_AUDIO':
      case 'PLAY_VIDEO':
      case 'PLAY_MIDI':
      case 'RECORD_AUDIO':
      case 'PLAY_RECORDED_AUDIO':
        if (this.audioEnabled) {
          const amp = this.activeMediaBag.getActiveMediaPlayer(mediaContent, this.project.mediaBag, this);
          if (amp)
            action = () => amp.play(mediaPlacement);
        }
        break;

      case 'RUN_CLIC_PACKAGE':
        ji = new _bags_JumpInfo_js__WEBPACK_IMPORTED_MODULE_10__["default"]('JUMP', fn);
        if (mediaContent.externalParam) {
          // Relative path computed in History.processJump
          ji.projectPath = mediaContent.externalParam;
        }
        action = () => this.history.processJump(ji, true);
        break;

      case 'RUN_CLIC_ACTIVITY':
        this.history.push();
        action = () => this.load(null, null, fn);
        break;

      case 'RETURN':
        if (this.history.storedElementsCount() > 0 || !this.options.returnAsExit) {
          action = () => this.history.pop();
          break;
        }
      case 'EXIT':
        ji = new _bags_JumpInfo_js__WEBPACK_IMPORTED_MODULE_10__["default"]('EXIT', fn);
        action = () => this.history.processJump(ji, false);
        break;

      case 'RUN_EXTERNAL':
        action = () => this.runCmd(fn);
        break;

      case 'URL':
        if (fn)
          // When mediaContent.level is 2 or more, the URL will be opened in a separate window.
          action = () => this.displayURL(fn, mediaContent.level > 1);
        break;

      default:
        (0,_Utils_js__WEBPACK_IMPORTED_MODULE_3__/* .log */ .Rm)('error', `Unknown media type: ${mediaContent.type}`);
        break;
    }

    // Execute the action or pass callback
    if (delayedActions && action)
      delayedActions.push(action);
    else if (action)
      action();
  }

  /**
   * Stops currently playing media
   * @param {number} [level=-1] - Sets the threshold above which all media objects with equal
   * or greater `level` will also also be muted.
   */
  stopMedia(level) {
    if (typeof level !== 'number')
      level = -1;
    this.activeMediaBag.stopAll(level);
  }

  /**
   * Launches the specified system command.
   * Currently not implemented.
   * @param {string} cmd
   */
  runCmd(cmd) {
    (0,_Utils_js__WEBPACK_IMPORTED_MODULE_3__/* .log */ .Rm)('warn', `Unsupported call to external command: "${cmd}"`);
  }

  /**
   * Called from {@link module:Activity.Activity Activity} when finished.
   * @param {boolean} _completedOK - `true` when the activity was successfully completed, `false`
   * otherwise.
   */
  activityFinished(_completedOK) {
    this.closeHelpWindow();
    (0,_Utils_js__WEBPACK_IMPORTED_MODULE_3__/* .log */ .Rm)('info', 'Activity finished');
    this.timer.stop();
    this.startAutoPassTimer();
  }

  /**
   * Starts the automatic jump to next activity, when applicable.
   */
  startAutoPassTimer() {
    const ase = this.project.activitySequence.getCurrentAct();
    if (ase !== null && ase.delay > 0 && !this.delayedTimer.isRunning() && !this.navButtonsDisabled) {
      this.delayedAction = this.actions['next'];
      this.delayedTimer.interval = ase.delay * 1000;
      this.delayedTimer.start();
    }
  }

  /**
   *
   * Sets the current main message.
   * @param {module:boxes/ActiveBoxContent.ActiveBoxContent} abc - The content of the message
   */
  setMsg(abc) {
    const ab = this.skin ? this.skin.getMsgBox() : null;
    if (ab) {
      ab.clear();
      this.skin.invalidate(ab).update();
      ab.setContent(abc ? abc : _boxes_ActiveBoxContent_js__WEBPACK_IMPORTED_MODULE_11__["default"].EMPTY_CONTENT);
      // TODO: Move this method to Skin
      this.skin.invalidate(ab).update();
      ab.playMedia(this);
    }
  }

  /**
   * Launches the active media content associated to the main message, if any.
   */
  playMsg() {
    if (this.skin && this.skin.getMsgBox())
      this.skin.getMsgBox().playMedia(this);
  }

  /**
   * Sets a value to the specified counter
   * @param {string} counter - The id of the counter ('score', 'actions' or 'time')
   * @param {number} newValue - The value to be set
   */
  setCounterValue(counter, newValue) {
    this.counterVal[counter] = newValue;
    if (this.skin && this.skin.counters[counter])
      this.skin.counters[counter].setValue(newValue);
  }

  /**
   * Gets the current value for the specified counter
   * @param {string} counter - The id of the counter ('score', 'actions' or 'time')
   * @returns {number}
   */
  getCounterValue(counter) {
    return this.counterVal[counter];
  }

  /**
   * Enables or disables a specific counter
   * @param {string} counter - The id of the counter ('score', 'actions' or 'time')
   * @param {boolean} bEnabled - When `true`, the counter will be enabled.
   */
  setCounterEnabled(counter, bEnabled) {
    if (this.skin) {
      this.skin.enableCounter(counter, bEnabled);
      this.setCountDown(counter, 0);
    }
  }

  /**
   * Increments by 1 the value of the specified counter
   * @param {string} counter - The id of the counter ('score', 'actions' or 'time')
   */
  incCounterValue(counter) {
    this.counterVal[counter]++;

    const
      actp = this.actPanel,
      cnt = this.skin ? this.skin.counters[counter] : null;

    if (cnt)
      cnt.setValue(this.counterVal[counter]);
    if (counter === 'actions' && actp !== null && actp.act.maxActions > 0 && actp.playing && this.counterVal['actions'] >= actp.act.maxActions)
      window.setTimeout(() => { actp.finishActivity(actp.solved); }, 0);
  }

  /**
   * Sets the specified counter in count-down status, starting at `maxValue`.
   * @param {string} counter - The id of the counter ('score', 'actions' or 'time')
   * @param {number} maxValue - The value from which to start counting down
   */
  setCountDown(counter, maxValue) {
    //this.counterVal[counter] = maxValue
    if (this.skin && this.skin.counters[counter])
      this.skin.counters[counter].setCountDown(maxValue);
  }

  /**
   * Set/unset the panel in 'wait' state
   * @param {boolean} status
   */
  setWaitCursor(status) {
    if (this.skin)
      this.skin.setWaitCursor(status);
  }

  /**
   * Sets the current value of the progress bar
   * @param {number} val - The current value. Should be less or equal than `max`. When -1, the progress bar will be hidden.
   * @param {number} [max] - Optional parameter representing the maximum value. When passed, the progress bar will be displayed.
   */
  setProgress(val, max) {
    if (this.skin)
      this.skin.setProgress(val, max);
  }

  /**
   * Increments the progress bar value by the specified amount, only when the progress bar is running.
   * @param {number} [val=1] - The amount to increment. When not defined, it's 1.
   */
  incProgress(val = 1) {
    if (this.skin)
      this.skin.incProgress(val);
  }

  /**
   * Builds an {@link module:media/ActiveMediaPlayer.ActiveMediaPlayer ActiveMediaPlayer} for the specified {@link module:media/MediaContent.MediaContent}
   * @param {module:media/MediaContent.MediaContent} mediaContent - The media content to be played
   * @returns {module:media/ActiveMediaPlayer.ActiveMediaPlayer}
   */
  getActiveMediaPlayer(mediaContent) {
    return this.activeMediaBag && mediaContent ? this.activeMediaBag.getActiveMediaPlayer(mediaContent, this.project.mediaBag, this) : null;
  }

  /**
   * Notifies the reporting system that a new activity has started
   * @param {module:Activity.Activity} act - The activity that is sending the notification
   */
  reportNewActivity(act) {
    const ase = this.project.activitySequence.getCurrentAct();
    if (this.reporter) {
      if (ase.tag === this.reporter.getCurrentSequenceTag())
        // Notify that the sequence has changed
        this.reporter.newSequence(ase);
      if (act.includeInReports)
        this.reporter.newActivity(act);
    }
    this.setCounterValue('actions', 0);
    this.setCounterValue('score', 0);
  }

  /**
   * Notifies the reporting system that a new action has been performed on the current activity
   * @param {module:Activity.Activity} act - The activity that is sending the notification
   * @param {string} type - Type of action (match, move, switch...)
   * @param {string} source - Object acting as a source of the action (cell, grid, clue...)
   * @param {string} dest - When applicable, object acting as a receiver of the action (cell, grid...)
   * @param {boolean} ok - Whether the action was OK or not
   * @param {number} currentScore - The current score of the activity
   */
  reportNewAction(act, type, source, dest, ok, currentScore) {
    if (this.reporter && act.includeInReports && act.reportActions)
      this.reporter.newAction(type, source, dest, ok);
    if (currentScore >= 0) {
      this.incCounterValue('actions');
      this.setCounterValue('score', currentScore);
    }
  }

  /**
   * Notifies the reporting system that the current activity has finished
   * @param {module:Activity.Activity} act - The activity that is sending the notification
   * @param {boolean} solved - Whether the activity was successfully completed or not.
   */
  reportEndActivity(act, solved) {
    if (this.reporter && act.includeInReports)
      this.reporter.endActivity(this.counterVal['score'], this.counterVal['actions'], solved);
  }

  /**
   * Shows the help info provided by the activity
   * @param {external:jQuery} $hlpComponent - The jQuery DOM component to be shown.
   * @returns {boolean} - True when the component was successfully displayed
   */
  showHelp($hlpComponent) {
    return this.skin ? this.skin.showHelp($hlpComponent) : false;
  }

  /**
   * Navigates to the requested URL
   * @param {string} url - The URL to navigate to
   * @param {boolean} inFrame - When `true` opens in a new frame
   */
  displayURL(url, inFrame) {
    if (url) {
      if (inFrame)
        window.open(url, this.options.infoUrlFrame);
      else {
        this.end().then(() => { window.location.href = url; });
      }
    }
  }

  /**
   * Only when `exitUrl` has been specified in `options`, navigates to the specified URL
   * @param {string} url - The URL to navigate to.
   */
  exit(url) {
    this.displayURL(url || this.options.exitUrl, false);
  }

  /**
   * Sets a title in a specific HTML element, if provided.
   * @param {string} docTitle
   */
  setWindowTitle(docTitle) {
    (0,_Utils_js__WEBPACK_IMPORTED_MODULE_3__/* .log */ .Rm)('info', `running ${docTitle}`);
  }
}

Object.assign(JClicPlayer.prototype, {
  /**
   * Object with miscellaneous options.
   * @name module:JClicPlayer.JClicPlayer#options
   * @type {object} */
  options: {
    //
    // Max waiting time to have all media loaded (milliseconds)
    maxWaitTime: 120000,
    //
    // Name of the frame where to open links
    infoUrlFrame: '_blank',
    //
    // URL where to navigate to on exit
    exitUrl: null,
    //
    // When `true` and no elements on sequence stack, RETURN acts as EXIT
    returnAsExit: false,
    //
    // At the beginning, the audio should be enabled or disabled
    audioEnabled: true,
    //
    // Navigation buttons are always visible (for debugging purposes)
    navButtonsAlways: false,
    //
    // Time (milliseconds) of the fade-in animation of the activity panel. When 0, no animation
    // is performed
    fade: 300,
    // Minimum horizontal swipe length to be considered an activity change gesture
    minSwipeX: 40,
    // Maximum vertical swipe length to be considered an activity change gesture
    maxSwipeY: 100,
    // Read swipe gestures as in right-to-left languages (default is left-to-right)
    rightToLeft: false,
  },
  /**
   * Unique ID of this player, randomly generated by the constructor
   * @name module:JClicPlayer.JClicPlayer#id
   * @type {string} */
  id: 'JC0000',
  /**
   * The JQuery "div" element used by this player as stage for activities
   * @name module:JClicPlayer.JClicPlayer#$div
   * @type {external:jQuery} */
  $div: null,
  /**
   * The JQuery top container where this player will deploy
   * @name module:JClicPlayer.JClicPlayer#$topDiv
   * @type {external:jQuery} */
  $topDiv: null,
  /**
   * The main container of all JClic components
   * @name module:JClicPlayer.JClicPlayer#$mainContainer
   * @type {external:jQuery} */
  $mainContainer: null,
  /**
   * Flag indicatig that this player has switched to full screen at least once
   * @name module:JClicPlayer.JClicPlayer#fullScreenChecked
   * @type {boolean} */
  fullScreenChecked: false,
  /**
   * The {@link module:project/JClicProject.JClicProject JClicProject} currently hosted in this player
   * @name module:JClicPlayer.JClicPlayer#project
   * @type {module:project/JClicProject.JClicProject} */
  project: null,
  /**
   * Relative path or absolute URL to be used as a base to access files
   * @name module:JClicPlayer.JClicPlayer#basePath
   * @type {string} */
  basePath: '',
  /**
   * A {@link external:JSZip} object pointing to a `jclic.zip` or `jclic.scorm.zip` file containing
   * the current project.
   * Two extra properties will be added to this object when loaded:
   * - __zip.fullZipPath__ {string} - The full path of the ZIP file
   * - __zip.zipBasePath__ {string} - The path to the folder containing the ZIP file
   * @name module:JClicPlayer.JClicPlayer#zip
   * @type {external:JSZip} */
  zip: null,
  /**
   * This flag indicates if the player is running inside a document loaded by `file:` protocol
   * @name module:JClicPlayer.JClicPlayer#localFS
   * @type {boolean}
   */
  localFS: false,
  /**
   * The {@link module:Activity.ActivityPanel ActivityPanel} currently running on this player.
   * @name module:JClicPlayer.JClicPlayer#actPanel
   * @type {module:Activity.Activity#Panel} */
  actPanel: null,
  /**
   * This object records the list of the activities played during the current session.
   * @name module:JClicPlayer.JClicPlayer#history
   * @type {module:PlayerHistory.PlayerHistory} */
  history: null,
  /**
   * The Skin currently used by this player.
   * @name module:JClicPlayer.JClicPlayer#skin
   * @type {module:skins/Skin.Skin} */
  skin: null,
  /**
   * The default Skin to be used if none specified
   * @name module:JClicPlayer.JClicPlayer#defaultSkin
   * @type {module:skins/Skin.Skin} */
  defaultSkin: null,
  /**
   * The last skin directly specified by a {@link module:project/JClicProject.JClicProject JClicProject}
   * @name module:JClicPlayer.JClicPlayer#defaultSkin
   * @type {module:skins/Skin.Skin} */
  lastProjectSkin: null,
  /**
   * Object containing references to realized media objects, ready to play.
   * @name module:JClicPlayer.JClicPlayer#activeMediaBag
   * @type {module:media/ActiveMediaBag.ActiveMediaBag} */
  activeMediaBag: null,
  /**
   * Object responsible for passing the scores obtained by users to a external reporting systems
   * when playing activities.
   * @name module:JClicPlayer.JClicPlayer#reporter
   * @type {module:report/Reporter.Reporter} */
  reporter: null,
  /**
   * Collection of {@link module:AWT.Action} objects used by this player.
   * @name module:JClicPlayer.JClicPlayer#actions
   * @type {module:AWT.Action[]} */
  actions: {},
  /**
   * Main timer object used to feed the time counter. Ticks every second.
   * @name module:JClicPlayer.JClicPlayer#timer
   * @type {module:AWT.Timer} */
  timer: null,
  /**
   * Timer for delayed actions
   * @name module:JClicPlayer.JClicPlayer#delayedTimer
   * @type {module:AWT.Timer} */
  delayedTimer: null,
  /**
   * This variable holds the action to be executed by `delayedTimer`
   * @name module:JClicPlayer.JClicPlayer#delayedAction
   * @type {module:AWT.Action} */
  delayedAction: null,
  /**
   * @typedef JClicPlayer~counterValType
   * @type {object}
   * @property {number} score
   * @property {number} actions
   * @property {number} time */
  /**
   * Current values of the counters
   * @name module:JClicPlayer.JClicPlayer#counterVal
   * @type {module:JClicPlayer.JClicPlayer~counterValType} */
  counterVal: { score: 0, actions: 0, time: 0 },
  /**
   * Point indicating the upper-left corner of the current background image
   * @name module:JClicPlayer.JClicPlayer#bgImageOrigin
   * @type {module:AWT.Point} */
  bgImageOrigin: null,
  /**
   * Whether the player must play all sounds (including system sounds) and other media content
   * of the activities.
   * @name module:JClicPlayer.JClicPlayer#audioEnabled
   * @type {boolean} */
  audioEnabled: true,
  /**
   * Whether the navigation buttons `next` and `back` are enabled o disabled.
   * @name module:JClicPlayer.JClicPlayer#navButtonsDisabled
   * @type {boolean} */
  navButtonsDisabled: false,
  /**
   * When this flag is `true`, the navigation buttons are always enabled despite
   * of the indications made by the activities or the sequence control system.
   * This is used only to debug projects with complicated sequence chaining.
   * @name module:JClicPlayer.JClicPlayer#navButtonsAlways
   * @type {boolean} */
  navButtonsAlways: false,
});

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (JClicPlayer);


/***/ }),

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


/***/ }),

/***/ 827:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* unused harmony export ActiveMediaBag */
/* harmony import */ var _ActiveMediaPlayer_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(520);
/* harmony import */ var _Utils_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(1253);
/**
 *  File    : media/ActiveMediaBag.js
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




/**
 * This class stores a collection of realized {@link module:media/ActiveMediaPlayer.ActiveMediaPlayer ActiveMediaPlayer} objects, related to a
 * {@link module:project/JClicProject.JClicProject JClicProject} or {@link module:Activity.Activity Activity}.
 */
class ActiveMediaBag {
  /**
   * ActiveMediaBag constructor
   */
  constructor() {
    this.players = [];
  }

  /**
   * Creates a new {@link module:media/ActiveMediaPlayer.ActiveMediaPlayer ActiveMediaPlayer} linked to this media bag
   * @param {module:media/MediaContent.MediaContent} mc - The content used by the new player
   * @param {module:bags/MediaBag.MediaBag} mb - The project's MediaBag
   * @param {module:JClicPlayer.JClicPlayer} ps - An object implementing the
   * [PlayStation](http://projectestac.github.io/jclic/apidoc/edu/xtec/jclic/PlayStation.html) interface,
   * usually a {@link module:JClicPlayer.JClicPlayer JClicPlayer}.
   * @returns {module:media/ActiveMediaPlayer.ActiveMediaPlayer}
   */
  createActiveMediaPlayer(mc, mb, ps) {
    let amp = null;
    switch (mc.type) {
      case 'RECORD_AUDIO':
        if (mc.length <= 0 || mc.length >= _Utils_js__WEBPACK_IMPORTED_MODULE_1__/* .settings */ .W0.MAX_RECORD_LENGTH)
          break;
      /* falls through */
      case 'PLAY_RECORDED_AUDIO':
        if (mc.recBuffer < 0 || mc.recBuffer >= 10)
          break;
      /* falls through */
      case 'PLAY_AUDIO':
      case 'PLAY_MIDI':
      case 'PLAY_VIDEO':
        amp = new _ActiveMediaPlayer_js__WEBPACK_IMPORTED_MODULE_0__["default"](mc, mb, ps);
        break;
    }
    if (amp !== null)
      this.players.push(amp);
    return amp;
  }

  /**
   * Looks for an already existing {@link module:media/ActiveMediaPlayer.ActiveMediaPlayer ActiveMediaPlayer} equivalent to the requested.
   * When not found, a new one is created and and returned.
   * @param {module:media/MediaContent.MediaContent} mc - The content used by the new player
   * @param {module:bags/MediaBag.MediaBag} mb - The project's MediaBag
   * @param {module:JClicPlayer.JClicPlayer} ps - An object implementing the
   * {@link http://projectestac.github.io/jclic/apidoc/edu/xtec/jclic/PlayStation.html|PlayStation} interface,
   * usually a {@link module:JClicPlayer.JClicPlayer JClicPlayer}.
   * @returns {module:media/ActiveMediaPlayer.ActiveMediaPlayer}
   */
  getActiveMediaPlayer(mc, mb, ps) {
    return this.players.find(p => p.mc === mc || p.mc.isEquivalent(mc))
      || this.createActiveMediaPlayer(mc, mb, ps);
  }

  /**
   * Removes from the list of players the {@link module:media/ActiveMediaPlayer.ActiveMediaPlayer ActiveMediaPlayer} related to the specified {@link module:media/MediaContent.MediaContent}.
   * @param {module:media/MediaContent.MediaContent} mc - The media content to look for.
   */
  removeActiveMediaPlayer(mc) {
    const i = this.players.findIndex(p => p.mc === mc);
    if (i >= 0) {
      this.players[i].clear();
      // removes the element pointed by 'i'
      this.players.splice(i, 1);
    }
  }

  /**
   * Realizes all the media elements stored in this bag
   */
  realizeAll() {
    this.players.forEach(p => p.realize());
  }

  /**
   * Stops playing all media elements stored in this bag
   * @param {number} level - Level at and below what all media players will be muted.
   */
  stopAll(level) {
    if (typeof level === 'undefined')
      level = -1;
    this.players.forEach(amp => {
      if (level === -1 || amp.mc !== null && amp.mc.level <= level)
        amp.stop();
    });
  }

  /**
   * Removes all players from this media bag
   */
  removeAll() {
    this.players.forEach(p => p.clear());
    // Empty the `players` array
    this.players.length = 0;
    _ActiveMediaPlayer_js__WEBPACK_IMPORTED_MODULE_0__["default"].prototype.clearAllAudioBuffers();
  }
}

Object.assign(ActiveMediaBag.prototype, {
  /**
   * The collection of {@link module:media/ActiveMediaPlayer.ActiveMediaPlayer ActiveMediaPlayer} objects stored in this media bag.
   * @name module:media/ActiveMediaBag.ActiveMediaBag#players
   * @type {module:media/ActiveMediaPlayer.ActiveMediaPlayer[]} */
  players: [],
});

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ActiveMediaBag);


/***/ })

};
;
//# sourceMappingURL=696.jclic-node.js.map