"use strict";
exports.id = 757;
exports.ids = [757];
exports.modules = {

/***/ 757:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {


// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": () => (/* binding */ skins_Skin)
});

// UNUSED EXPORTS: Skin

// EXTERNAL MODULE: external "jquery"
var external_jquery_ = __webpack_require__(7750);
var external_jquery_default = /*#__PURE__*/__webpack_require__.n(external_jquery_);
// EXTERNAL MODULE: ./src/Utils.js
var Utils = __webpack_require__(1253);
// EXTERNAL MODULE: ./src/AWT.js
var AWT = __webpack_require__(7912);
;// ./src/skins/assets/basic.css
const basic_namespaceObject = ".ID {\n  width: 100%;\n  background-color: #3F51B5;\n  display: -webkit-flex;\n  display: flex;\n  -webkit-flex-direction: column;\n  flex-direction: column;\n}\n\n.ID .JClicPlayerCnt {\n  background-color: lightblue;\n  margin: 18px;\n  -webkit-flex-grow: 1;\n  flex-grow: 1;\n  position: relative;\n}\n\n.ID .JClicPlayerCnt>div {\n  position: absolute;\n  width: 100%;\n  height: 100%;\n}\n\n.ID button:not(.StockBtn) {\n  background: transparent;\n  padding: 0;\n  border: none;\n  box-shadow: none;\n  text-shadow: none;\n}\n\n.ID .unselectableText {\n  -webkit-user-select: none;\n  -moz-user-select: none;\n  -ms-user-select: none;\n  user-select: none;\n}\n\n.ID .progressBar {\n  width: 250px\n}\n";
;// ./src/skins/assets/waitAnim.css
const waitAnim_namespaceObject = ".ID .waitPanel {\n  display: -webkit-flex;\n  display: flex;\n  width: 100%;\n  height: 100%;\n  -webkit-justify-content: center;\n  justify-content: center;\n  -webkit-align-items: center;\n  align-items: center;\n}\n\n.ID .animImgBox {\n  position: relative;\n  width: 300px;\n  height: 300px;\n  max-width: 80%;\n  max-height: 80%;\n}\n\n.ID .animImgBox svg {\n  position: absolute;\n  width: 100%;\n  height: 100%;\n  animation-iteration-count: infinite;\n  animation-timing-function: linear;\n}\n\n.ID #waitImgBig {\n  animation-duration: 0.8s;\n  animation-name: rotate-right;\n}\n\n@keyframes rotate-right {\n  from {\n    transform: rotate(0);\n  }\n  to {\n    transform: rotate(1turn);\n  }\n}\n\n.ID #waitImgSmall {\n  animation-duration: 0.6s;\n  animation-name: rotate-left;\n}\n\n@keyframes rotate-left {\n  from {\n    transform: rotate(0);\n  }\n  to {\n    transform: rotate(-1turn);\n  }\n}\n";
;// ./src/skins/assets/reports.css
const reports_namespaceObject = ".ID .dlgDiv {\n  background-color: #efefef;\n  color: #757575;\n  font-family: Roboto, sans-serif;\n  font-size: 10pt;\n  line-height: normal;\n}\n\n.ID .dlgDiv a, a:visited, a:active, a:hover {\n  text-decoration: none;\n  color: inherit;\n}\n\n.ID .dlgMainPanel {\n  padding: 1em 2em;\n  max-height: calc(100vh - 8em);\n  max-width: calc(100vw - 2em);\n  min-width: 20em;\n  overflow: auto;\n}\n\n.ID .dlgMainPanel .headTitle {\n  font-size: 2.5em;\n  font-weight: bold;\n  margin: auto;\n}\n\n.ID .dlgMainPanel .subTitle {\n  font-size: 1.4em;\n  font-weight: bold;\n  margin-bottom: 0.5em;\n}\n\n.ID .dlgMainPanel p {\n  font-size: 1.1em;\n  margin-bottom: 0.5em;\n}\n\n.ID .dlgMainPanel table {\n  table-layout: fixed;\n  width: 40em;\n  margin: 0.5em 0 1.7em 0;\n  border-collapse: collapse;\n}\n\n.ID .dlgMainPanel select {\n  min-width: 20em;\n  font-size: 1.2em;\n  font-family: Roboto, sans-serif;\n  color: #757575;\n}\n\n.ID .dlgMainPanel input {\n  margin-left: 1em;\n  font-size: 1.2em;\n  font-family: Roboto, sans-serif;\n  border-color: lightgray;\n}\n\n.ID .infoHead {\n  padding: 1em 0em 0.5em;\n}\n\n.ID .JCGlobalResults td {\n  padding: 0.4em;\n  border-bottom: 1px solid #b6b6b6;\n}\n\n.ID .JCGlobalResults td:first-child {\n  font-weight: 600;\n  width: 14em;\n}\n\n.ID .JCDetailed td, th {\n  border-bottom: 1px solid #b6b6b6;\n  padding: 0.3em 0.4em;\n  vertical-align: top;\n  text-align: center;\n  overflow: hidden;\n  text-overflow: ellipsis;\n}\n\n.ID .JCDetailed thead {\n  font-weight: 600;\n}\n\n.ID .JCDetailed th:first-child {\n  width: 7em;\n}\n\n.ID .JCDetailed th:nth-last-child(4) {\n  width: 4em;\n}\n\n.ID .JCDetailed th:nth-last-child(-n+3) {\n  width: 4.1em;\n  text-align: right;\n}\n\n.ID .JCDetailed td:nth-last-child(-n+3) {\n  text-align: right;\n}\n\n.ID .JCDetailed .ok {\n  color: #4bae4f;\n  font-weight: 600;\n}\n\n.ID .JCDetailed .no {\n  color: #f34235;\n  font-weight: 600;\n}\n\n.ID .JCDetailed tr:last-child {\n  font-weight: bold;\n}\n\n.ID .JCDetailed .incomplete {\n  font-style: italic;\n}\n\n.ID .dlgBottomPanel {\n  height: 3.5em;\n  background-color: white;\n  padding: 0.5em;\n  font-weight: bold;\n  text-align: right;\n  border-top: 1px solid #eee;\n  position: relative;\n}\n\n.ID .dlgBottomPanel .smallPopup {\n  background-color: #222;\n  color: #ddd;\n  padding: 0.5em;\n  font-size: 0.9em;\n  position: absolute;\n  right: 6em;\n  top: 1em;\n}\n\n.ID .dlgBottomPanel button {\n  display: inline-block;\n  padding: 10px;\n  cursor: pointer;\n  line-height: 0;\n}\n\n.ID .dlgBottomPanel button:hover {\n  background-color: #eee;\n  border-radius: 80px;\n}\n\n.ID .dlgBottomPanel button:active {\n  background-color: #b3e5fc;\n}\n";
;// ./src/skins/assets/waitImgSmall.svg
const waitImgSmall_namespaceObject = "<svg id=\"waitImgSmall\" viewBox=\"0 0 80 80\" xmlns=\"http://www.w3.org/2000/svg\">\n  <path fill=\"#3F51B5\" d=\"m 57.00,39.43 c -0.28,-3.53 5.16,-3.27 5.37,-0.13 0.26,3.99 -5.13,21.04 -20.63,21.44 C 23.85,61.19 19.93,46.50 19.92,39.94 23.48,67.11 58.73,61.35 57.00,39.43 Z\" />\n</svg>\n";
;// ./src/skins/assets/waitImgBig.svg
const waitImgBig_namespaceObject = "<svg id=\"waitImgBig\" viewBox=\"0 0 80 80\" xmlns=\"http://www.w3.org/2000/svg\">\n  <path fill=\"#3F51B5\" d=\"m 65.99,40.19 c -0.42,5.33 7.80,4.94 8.11,0.20 C 74.50,34.37 66.35,8.59 42.92,7.98 15.90,7.29 9.96,29.50 9.94,39.41 15.33,-1.66 68.61,7.048 65.99,40.19 Z\" />\n</svg>\n";
;// ./src/skins/assets/appLogo.svg
const appLogo_namespaceObject = "<svg viewBox=\"0 0 64 64\" xmlns=\"http://www.w3.org/2000/svg\">\n  <g transform=\"matrix(.02081 0 0-.02081 5 62.33)\">\n    <path d=\"m1263 1297l270 1003 996-267-267-990c-427-1583-2420-1046-1999 519 3 11 999-266 999-266z\" fill=\"none\" stroke=\"#9d6329\" stroke-linejoin=\"round\" stroke-linecap=\"round\" stroke-width=\"180\" stroke-miterlimit=\"3.864\" />\n    <path d=\"m1263 1297l270 1003 996-267-267-990c-427-1583-2420-1046-1998 519 3 11 999-266 999-266\" fill=\"#f89c0e\" />\n    <path d=\"m357 2850l1000-268-267-992-1000 266 267 994z\" fill=\"none\" stroke=\"#86882b\" stroke-linejoin=\"round\" stroke-linecap=\"round\" stroke-width=\"180\" stroke-miterlimit=\"3.864\" />\n    <path d=\"m357 2850l1000-268-267-992-1000 266 267 994\" fill=\"#d9e70c\" />\n  </g>\n</svg>\n";
;// ./src/skins/assets/closeDialogIcon.svg
const closeDialogIcon_namespaceObject = "<svg fill=\"#757575\" viewBox=\"0 0 24 24\" width=\"36\" height=\"36\" xmlns=\"http://www.w3.org/2000/svg\">\n  <path d=\"M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z\" />\n</svg>\n";
;// ./src/skins/assets/okDialogIcon.svg
const okDialogIcon_namespaceObject = "<svg fill=\"#757575\" viewBox=\"0 0 24 24\" width=\"36\" height=\"36\" xmlns=\"http://www.w3.org/2000/svg\">\n  <path d=\"M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z\" />\n</svg>\n";
;// ./src/skins/assets/copyIcon.svg
const copyIcon_namespaceObject = "<svg fill=\"#757575\" viewBox=\"0 0 24 24\" width=\"36\" height=\"36\" xmlns=\"http://www.w3.org/2000/svg\">\n  <path d=\"M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z\" />\n</svg>\n";
;// ./src/skins/Skin.js
/**
 *  File    : skins/Skin.js
 *  Created : 29/04/2015
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

/* global Promise, window, document, navigator, ClipboardItem, Blob */





// Use Webpack to import CSS and SVG files










/**
 * This abstract class manages the layout, position ans size of the visual components of JClic:
 * player window, message box, counters, buttons, status... and also the appearance of the main
 * container.
 * The basic implementation of Skin is {@link module:skins/DefaultSkin.DefaultSkin DefaultSkin}.
 * @abstract
 * @extends module:AWT.Container
 */
class Skin extends AWT/* Container */.mc {
  /**
   * Skin constructor
   * @param {module:JClicPlayer.JClicPlayer} ps - The `PlayStation` (currently a {@link module:JClicPlayer.JClicPlayer JClicPlayer}) used to load and
   * realize the media objects needed tot build the Skin.
   * @param {string} [name] - The skin name
   * @param {object} [options] - Optional parameter with additional options
   */
  constructor(ps, name = null, options = {}) {

    // Skin extends [AWT.Container](AWT.html)
    super();

    // Save parameters for later use
    this.ps = ps;
    if (name !== null)
      this.name = name;
    this.options = options;

    if (this.options.skinId)
      this.skinId = this.options.skinId;

    if (!Skin.registerStyleSheet(this.skinId, ps)) {
      let css = this._getStyleSheets('default');
      let twoThirds = this._getStyleSheets('twoThirds');
      if (twoThirds.length > 0)
        css += ` @media (max-width:${this.twoThirdsMedia.width}px),(max-height:${this.twoThirdsMedia.height}px){${twoThirds}}`;
      let half = this._getStyleSheets('half');
      if (half.length > 0)
        css += ` @media (max-width:${this.halfMedia.width}px),(max-height:${this.halfMedia.height}px){${half}}`;
      (0,Utils/* appendStyleAtHead */.dw)(css.replace(/\.ID/g, `.${this.skinId}`), ps);
    }

    let msg = '';

    this.$div = external_jquery_default()('<div/>', { class: this.skinId });
    this.$playerCnt = external_jquery_default()('<div/>', { class: 'JClicPlayerCnt' });

    // Add waiting panel and progress bar
    this.$progress = external_jquery_default()('<progress/>', { class: 'progressBar' })
      .css({ display: 'none' });
    this.$waitPanel = external_jquery_default()('<div/>')
      .css({ display: 'none', 'background-color': 'rgba(255, 255, 255, .60)', 'z-index': 99 })
      .append(external_jquery_default()('<div/>', { class: 'waitPanel' }).css({ display: 'flex', 'flex-direction': 'column' })
        .append(external_jquery_default()('<div/>', { class: 'animImgBox' })
          .append(external_jquery_default()(this.waitImgBig), external_jquery_default()(this.waitImgSmall)))
        .append(this.$progress));
    this.$playerCnt.append(this.$waitPanel);

    this.buttons = (0,Utils/* cloneObject */.h2)(Skin.prototype.buttons);
    this.counters = (0,Utils/* cloneObject */.h2)(Skin.prototype.counters);
    this.msgArea = (0,Utils/* cloneObject */.h2)(Skin.prototype.msgArea);

    // Create dialog overlay and panel
    this.$dlgOverlay = external_jquery_default()('<div/>', { class: 'dlgOverlay' }).css({
      'z-index': 98,
      position: 'fixed',
      left: 0,
      top: 0,
      width: '100%',
      height: '100%',
      display: 'none',
      'background-color': 'rgba(30,30,30,0.7)'
    }).on('click', () => {
      if (!this._isModalDlg)
        // Non-modal dialogs are closed on click outside the main area
        this._closeDlg(true);
      return false;
    });

    const $dlgDiv = external_jquery_default()('<div/>', {
      class: 'dlgDiv',
      role: 'dialog',
      'aria-labelledby': ps.getUniqueId('ReportsLb'),
      'aria-describedby': ps.getUniqueId('ReportsCnt')
    }).css({
      display: 'inline-block',
      position: 'relative',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)'
    }).on('click', () => {
      // Clicks not passed to parent
      return false;
    });

    this.$dlgMainPanel = external_jquery_default()('<div/>', { class: 'dlgMainPanel', id: ps.getUniqueId('ReportsCnt') });
    this.$dlgBottomPanel = external_jquery_default()('<div/>', { class: 'dlgBottomPanel', role: 'navigation' });

    // Basic dialog structure:
    this.$div.append(
      this.$playerCnt,
      this.$dlgOverlay.append(
        $dlgDiv.append(
          this.$dlgMainPanel,
          this.$dlgBottomPanel)));

    msg = (0,Utils/* getMsg */.qG)('JClic logo');
    this.$infoHead = external_jquery_default()('<div/>', { class: 'infoHead' })
      .append(external_jquery_default()('<div/>', { class: 'headTitle unselectableText' })
        .append(external_jquery_default()(this.appLogo, { 'aria-label': msg }).css({ width: '1.5em', height: '1.5em', 'vertical-align': 'bottom' })
          .on('dblclick', () => {
            // Double click on JClic logo is a hidden method to increase verbosity on Javascript console
            (0,Utils/* setLogLevel */.He)('all');
            (0,Utils/* log */.Rm)('trace', 'Log level set to "trace"');
          }))
        .append(external_jquery_default()('<span/>').html('JClic.js')))
      .append(external_jquery_default()('<p/>').css({ 'margin-top': 0, 'margin-left': '3.5em' })
        .append(external_jquery_default()('<a/>', { href: 'https://projectes.xtec.cat/clic/' }).html('https://projectes.xtec.cat/clic/'))
        .append(external_jquery_default()('<br>'))
        .append(external_jquery_default()('<span/>').html(`${(0,Utils/* getMsg */.qG)('Version')} ${Utils/* settings */.W0.VERSION}`)));

    this.$reportsPanel = external_jquery_default()('<div/>', { class: 'reportsPanel', role: 'document' });

    msg = (0,Utils/* getMsg */.qG)('Copy data to clipboard');
    this.$copyBtn = external_jquery_default()('<button/>', { title: msg, 'aria-label': msg })
      .append(external_jquery_default()(this.copyIcon).css({ width: '26px', height: '26px' }))
      .on('click', () => {
        const item = new ClipboardItem({
          'text/plain': new Blob([`===> ${(0,Utils/* getMsg */.qG)('The data has been copied in HTML format. Please paste them into a spreadsheet or in a rich text editor')} <===`], {type: 'text/plain'}),
          'text/html': new Blob([this.$reportsPanel.html()], {type: 'text/html'}),
        });
        navigator.clipboard.write([item])
          .then(() => this.$copyBtn.parent().append(
            external_jquery_default()('<div/>', { class: 'smallPopup' })
              .html((0,Utils/* getMsg */.qG)('The data has been copied to clipboard'))
              .fadeIn()
              .delay(3000)
              .fadeOut(function () { external_jquery_default()(this).remove(); })))
          .catch(err => this.$copyBtn.parent().append(
            external_jquery_default()('<div/>', { class: 'smallPopup' })
              .html(`ERROR: Unable to write data into the clipboard: ${err}`)
              .fadeIn()
              .delay(3000)
              .fadeOut(function () { external_jquery_default()(this).remove(); })));
      });

    msg = (0,Utils/* getMsg */.qG)('Close');
    this.$closeDlgBtn = external_jquery_default()('<button/>', { title: msg, 'aria-label': msg })
      .append(external_jquery_default()(this.closeDialogIcon).css({ width: '26px', height: '26px' }))
      .on('click', () => this._closeDlg(true));

    msg = (0,Utils/* getMsg */.qG)('OK');
    this.$okDlgBtn = external_jquery_default()('<button/>', { title: msg, 'aria-label': msg })
      .append(external_jquery_default()(this.okDialogIcon).css({ width: '26px', height: '26px' }))
      .on('click', () => this._closeDlg(true));

    msg = (0,Utils/* getMsg */.qG)('Cancel');
    this.$cancelDlgBtn = external_jquery_default()('<button/>', { title: msg, 'aria-label': msg })
      .append(external_jquery_default()(this.closeDialogIcon).css({ width: '26px', height: '26px' }))
      .on('click', () => this._closeDlg(false));

    // Registers this Skin in the list of realized Skin objects
    Skin.skinStack.push(this);
  }

  /**
   * Registers a new type of skin
   * @param {string} skinName - The name used to identify this skin
   * @param {function} skinClass - The skin class, usually extending Skin
   * @returns {module:skins/Skin.Skin} - The provided skin class
   */
  static registerClass(skinName, skinClass) {
    Skin.CLASSES[skinName] = skinClass;
    return skinClass;
  }

  /**
   * Checks if the provided stylesheet ID is already registered in the root node where the current player is placed
   * @param {string} skinId - The unique identifier of the skin to check
   * @param {module:JClicPlayer.JClicPlayer} [ps] - An optional `PlayStation` (currently a {@link module:JClicPlayer.JClicPlayer JClicPlayer}) used as a base to find the root node
   * @returns {boolean} - _true_ when the skin stylesheet is already defined in the current root node, _false_ otherwise
   */
  static registerStyleSheet(skinId, ps) {
    let result = false;
    const root = (0,Utils/* getRootHead */.NQ)(ps);
    if (!root['__JClicID'])
      root.__JClicID = `SK${Skin.lastId++}`;

    let styles = Skin.rootStyles[root.__JClicID];
    if (!styles) {
      styles = [];
      Skin.rootStyles[root.__JClicID] = styles;
    }

    if (styles.indexOf(skinId) < 0) {
      (0,Utils/* log */.Rm)('trace', `Stylesheet "${skinId}" has been registered for root node labeled as "${root.__JClicID}"`);
      styles.push(skinId);
    } else
      result = true;

    return result;
  }

  /**
   * Gets the specified Skin from `skinStack`, or creates a new one if not found.
   * This function should be used only through `Skin.getSkin`
   * @param {string} skinName - The name of the searched skin
   * @param {module:JClicPlayer.JClicPlayer} ps - The PlayStation (usually a {@link module:JClicPlayer.JClicPlayer JClicPlayer}) used to build the new skin.
   * @param {object} [options] - Optional parameter with additional options
   * @returns {module:skins/Skin.Skin}
   */
  static getSkin(skinName = 'default', ps, options = {}) {
    skinName = skinName || 'default';

    // Correct old skin names
    if (skinName.charAt(0, 1) === '@' && skinName.endsWith('.xml'))
      skinName = skinName.substring(1, skinName.length - 4);

    // look for the skin in the stack of realized skins
    if (skinName && ps) {
      // TODO: Check also `options`!
      const sk = Skin.skinStack.find(s => s.name === skinName && s.ps === ps);
      if (sk)
        return sk;
    }

    // Locates the class of the requested Skin (or [DefaultSkin](DefaultSkin.html)
    // if not specified). When not found, a new one is created and registered in `skinStack`
    let cl = Skin.CLASSES[skinName];
    if (!cl) {
      // Process custom skin XML files
      const mbe = ps.project.mediaBag.getElement(skinName, false);
      if (mbe && mbe.data) {
        options = Object.assign({}, options, mbe.data);
        options.skinId = `JClic-${skinName.replace('.xml', '')}`;
      }

      if (!ps.zip
        && options.class === 'edu.xtec.jclic.skins.BasicSkin'
        && options.image
        && ps.project.mediaBag.getElement(options.image, false)
        && ps.project.mediaBag.getElement(options.image, false).data)
        cl = Skin.CLASSES.custom;
      else {
        (0,Utils/* log */.Rm)('warn', `Unknown skin class: ${skinName}`);
        cl = Skin.CLASSES.default;
      }
    }

    // Build and return the requested skin
    return new cl(ps, skinName, options);
  }

  /**
   * Returns the CSS styles used by this skin. This method should be called only from
   * the `Skin` constructor, and overridded by subclasses if needed.
   * @param {string} media - A specific media size. Possible values are: 'default', 'half' and 'twoThirds'
   * @returns {string}
   */
  _getStyleSheets(media = 'default') {
    return media === 'default' ? (this.basicCSS + this.waitAnimCSS + this.reportsCSS) : '';
  }

  /**
   * Attaches a {@link module:JClicPlayer.JClicPlayer JClicPlayer} object to this Skin
   * @param {module:JClicPlayer.JClicPlayer} player
   */
  attach(player) {
    this.detach();
    if (player !== null && player.skin !== null)
      player.skin.detach();
    this.player = player;
    this.$playerCnt.prepend(player.$div);
    this.setSkinSizes();
    player.$mainContainer.append(this.$div);
  }

  /**
   * Sets the 'size' CSS values (max, min and compulsory) to the main `div` of this skin
   * @param {boolean} full - `true` when the skin is in full screen mode
   */
  setSkinSizes(full) {
    const
      css = {},
      topHeight = this.player?.$topDiv.height() || 0,
      nilValue = this.player.fullScreenChecked ? 'inherit' : null;

    // When `full` no set, detect the current status
    if (typeof full === 'undefined')
      full = document && document.fullscreenElement ? true : false;

    (0,Utils/* toCssSize */.SV)(full ? '100vw' : this.ps.options.minWidth, css, 'min-width', nilValue);
    (0,Utils/* toCssSize */.SV)(full ? '100vh' : this.ps.options.minHeight, css, 'min-height', nilValue);
    (0,Utils/* toCssSize */.SV)(full ? '100vw' : this.ps.options.maxWidth, css, 'max-width', nilValue);
    (0,Utils/* toCssSize */.SV)(full ? '100vh' : this.ps.options.maxHeight, css, 'max-height', nilValue);
    (0,Utils/* toCssSize */.SV)(full ? '100vw' : this.ps.options.width, css, 'width', '100%');
    (0,Utils/* toCssSize */.SV)(full ? '100vh' : this.ps.options.height, css, 'height', topHeight > 0 ? '100%' : '100vh');
    this.$div.css(css);
  }

  /**
   * Detaches the `player` element from this Skin
   */
  detach() {
    if (this.player !== null) {
      this.player.$div.remove();
      this.$div.detach();
      this.player = null;
    }
  }

  /**
   * Updates the graphic contents of this skin.
   * This method should be called from {@link module:skins/Skin.Skin#update}
   * @override
   * @param {module:AWT.Rectangle} dirtyRegion - Specifies the area to be updated. When `null`, it's the
   * whole panel.
   */
  updateContent(dirtyRegion) {
    if (this.$msgBoxDivCanvas) {
      const ctx = this.$msgBoxDivCanvas.get(-1).getContext('2d');
      ctx.clearRect(0, 0, ctx.canvas.clientWidth, ctx.canvas.clientHeight);
      this.msgBox.update(ctx, dirtyRegion);
    }
    return super.updateContent();
  }

  /**
   * Resets all counters
   * @param {boolean} bEnabled - Leave it enabled/disabled
   */
  resetAllCounters(bEnabled) {
    external_jquery_default().each(this.counters, (_name, counter) => {
      if (counter !== null) {
        counter.value = 0;
        counter.countDown = 0;
        counter.enabled = bEnabled;
        counter.refreshDisplay();
      }
    });
  }

  /**
   * Sets/unsets the 'wait' state
   * @param {boolean} status - Whether to set or unset the wait status. When `undefined`, the
   * `waitCursorCount` member is evaluated to decide if the wait state should be activated or deactivated.
   */
  setWaitCursor(status) {
    if (typeof status === 'undefined') {
      if (this.$waitPanel)
        this.$waitPanel.css({
          display: this.waitCursorCount > 0 ? 'initial' : 'none'
        });
    } else {
      switch (status) {
        case true:
          this.waitCursorCount++;
          break;
        case false:
          if (--this.waitCursorCount < 0)
            this.waitCursorCount = 0;
          break;
        case 'reset':
          this.waitCursorCount = 0;
          break;
      }
      this.setWaitCursor();
    }
  }

  /**
   * Sets the current value of the progress bar
   * @param {number} val - The current value. Should be less or equal than `max`. When -1, the progress bar will be hidden.
   * @param {number} [max] - Optional parameter representing the maximum value. When passed, the progress bar will be displayed.
   */
  setProgress(val, max) {
    if (this.$progress) {
      this.currentProgress = val;
      if (val < 0)
        this.$progress.css({ display: 'none' });
      else {
        if (max) {
          this.maxProgress = max;
          this.$progress.attr('max', max).css({ display: 'initial' });
        }
        this.$progress.attr('value', val);
      }
      (0,Utils/* log */.Rm)('trace', `Progress: ${this.currentProgress}/${this.maxProgress}`);
    }
  }

  /**
   * Increments the progress bar value by the specified amount, only when the progress bar is running.
   * @param {number} [val] - The amount to increment. When not defined, it's 1.
   */
  incProgress(val) {
    if (this.currentProgress >= 0)
      this.setProgress(this.currentProgress + (val || 1));
  }

  /**
   * Shows a window with clues or help for the current activity
   * @param {external:jQuery} _$hlpComponent - A JQuery DOM element with the information to be shown.
   * It can be a string or number. When `null`, the help window (if any) must be closed.
   */
  showHelp(_$hlpComponent) {
    // TODO: Implement HelpWindow
  }

  /**
   * Shows a "dialog" panel, useful for displaying information or prompt something to users
   * @param {boolean} modal - When `true`, the dialog should be closed by any click outside the main panel
   * @param {object} options - This object should have two components: `main` and `bottom`, both
   * containing a jQuery HTML element (or array of elements) to be placed on the main and bottom panels
   * of the dialog.
   * @returns {external:Promise} - A Promise that will be fulfilled when the dialog is closed.
   */
  showDlg(modal, options) {
    return new Promise((resolve, reject) => {
      this._dlgOkValue = 'ok';
      this._dlgCancelValue = 'cancelled';
      this._isModalDlg = modal;

      this.$dlgMainPanel.children().detach();
      this.$dlgBottomPanel.children().detach();
      if (options.main)
        this.$dlgMainPanel.append(options.main);
      if (options.bottom)
        this.$dlgBottomPanel.append(options.bottom);

      this._closeDlg = resolved => {
        if (resolved && resolve)
          resolve(this._dlgOkValue);
        else if (!resolved && reject)
          reject(this._dlgCancelValue);
        this.$dlgOverlay.css({ display: 'none' });
        this.enableMainButtons(true);
        this._closeDlg = Skin.prototype._closeDlg;
      };
      this.enableMainButtons(false);
      this.$dlgOverlay.css({ display: 'initial' });
    });
  }

  /**
   * Enables or disables the `tabindex` attribute of the main buttons. Useful when a modal dialog
   * overlay is active, to avoid direct access to controls not related with the dialog.
   * @param {boolean} status - `true` to make main controls navigable, `false` otherwise
   */
  enableMainButtons(status) {
    this.$playerCnt.find('button').attr('tabindex', status ? '0' : '-1');
  }

  /**
   * Called when the dialog must be closed, usually only by Skin members.
   * This method is re-defined on each call to `showDlg`, so the `resolve` and `reject`
   * functions can be safely called.
   */
  _closeDlg() {
    // Do nothing
  }

  /**
   * Displays a dialog with a report of the current results achieved by the user.
   * @param {module:report/Reporter.Reporter} reporter - The reporter system currently in use
   * @returns {external:Promise} - The Promise returned by {@link module:skins/Skin.Skin.showDlg}.
   */
  showReports(reporter) {
    this.$reportsPanel.html(this.$printReport(reporter));
    return this.showDlg(false, {
      main: [this.$infoHead, this.$reportsPanel],
      bottom: [this.$copyBtn, this.$closeDlgBtn]
    });
  }

  /**
   * Formats the current report in a DOM tree, ready to be placed in `$reportsPanel`
   * @param {module:report/Reporter.Reporter} reporter - The reporter system currently in use
   * @returns {external:jQuery[]} - An array of jQuery objects containing the full report
   */
  $printReport(reporter) {
    let result = [];
    if (reporter) {
      const
        report = reporter.getData(),
        started = new Date(report.started);

      result.push(external_jquery_default()('<div/>', { class: 'subTitle', id: this.ps.getUniqueId('ReportsLb') }).html((0,Utils/* getMsg */.qG)('Current results')));

      const $t = external_jquery_default()('<table/>', { class: 'JCGlobalResults' });
      $t.append(
        Utils/* $HTML */.GV.doubleCell(
          (0,Utils/* getMsg */.qG)('Session started:'),
          `${started.toLocaleDateString()} ${started.toLocaleTimeString()}`),
        Utils/* $HTML */.GV.doubleCell(
          (0,Utils/* getMsg */.qG)('Reports system:'),
          `${(0,Utils/* getMsg */.qG)(report.descriptionKey)} ${report.descriptionDetail}`));
      if (report.userId)
        $t.append(Utils/* $HTML */.GV.doubleCell(
          (0,Utils/* getMsg */.qG)('User:'),
          report.userId));
      else if (report.user) // SCORM user
        $t.append(Utils/* $HTML */.GV.doubleCell(
          (0,Utils/* getMsg */.qG)('User:'),
          report.user));

      if (report.sequences > 0) {
        if (report.sessions.length > 1)
          $t.append(Utils/* $HTML */.GV.doubleCell(
            (0,Utils/* getMsg */.qG)('Projects:'),
            report.sessions.length));
        $t.append(
          Utils/* $HTML */.GV.doubleCell(
            (0,Utils/* getMsg */.qG)('Sequences:'),
            report.sequences),
          Utils/* $HTML */.GV.doubleCell(
            (0,Utils/* getMsg */.qG)('Activities done:'),
            report.activitiesDone),
          Utils/* $HTML */.GV.doubleCell(
            (0,Utils/* getMsg */.qG)('Activities played at least once:'),
            `${report.playedOnce}/${report.reportable} (${(0,Utils/* getPercent */.Os)(report.ratioPlayed / 100)})`));
        if (report.activitiesDone > 0) {
          $t.append(Utils/* $HTML */.GV.doubleCell(
            (0,Utils/* getMsg */.qG)('Activities solved:'),
            `${report.activitiesSolved} (${(0,Utils/* getPercent */.Os)(report.ratioSolved / 100)})`));
          if (report.actScore > 0)
            $t.append(
              Utils/* $HTML */.GV.doubleCell(
                (0,Utils/* getMsg */.qG)('Partial score:'),
                `${(0,Utils/* getPercent */.Os)(report.partialScore / 100)} ${(0,Utils/* getMsg */.qG)('(out of played activities)')}`),
              Utils/* $HTML */.GV.doubleCell(
                (0,Utils/* getMsg */.qG)('Global score:'),
                `${(0,Utils/* getPercent */.Os)(report.globalScore / 100)} ${(0,Utils/* getMsg */.qG)('(out of all project activities)')}`));
          $t.append(
            Utils/* $HTML */.GV.doubleCell(
              (0,Utils/* getMsg */.qG)('Total time in activities:'),
              (0,Utils/* getHMStime */.EB)(report.time * 1000)),
            Utils/* $HTML */.GV.doubleCell(
              (0,Utils/* getMsg */.qG)('Actions done:'),
              report.actions));
        }
        result.push($t);

        report.sessions.forEach(sr => {
          if (sr.sequences.length > 0) {
            const $t = external_jquery_default()('<table/>', { class: 'JCDetailed' });
            result.push(external_jquery_default()('<p/>').html(report.sessions.length > 1 ? `${(0,Utils/* getMsg */.qG)('Project')} ${sr.projectName}` : ''));
            $t.append(external_jquery_default()('<thead/>').append(external_jquery_default()('<tr/>').append(
              Utils/* $HTML */.GV.th((0,Utils/* getMsg */.qG)('sequence')),
              Utils/* $HTML */.GV.th((0,Utils/* getMsg */.qG)('activity')),
              Utils/* $HTML */.GV.th((0,Utils/* getMsg */.qG)('OK')),
              Utils/* $HTML */.GV.th((0,Utils/* getMsg */.qG)('actions')),
              Utils/* $HTML */.GV.th((0,Utils/* getMsg */.qG)('score')),
              Utils/* $HTML */.GV.th((0,Utils/* getMsg */.qG)('time')))));

            sr.sequences.forEach(seq => {
              let $tr = external_jquery_default()('<tr/>').append(external_jquery_default()('<td/>', { rowspan: seq.activities.length }).html(seq.sequence));
              seq.activities.forEach(act => {
                if (act.closed) {
                  $tr.append(Utils/* $HTML */.GV.td(act.name));
                  $tr.append(act.solved ? Utils/* $HTML */.GV.td((0,Utils/* getMsg */.qG)('YES'), 'ok') : Utils/* $HTML */.GV.td((0,Utils/* getMsg */.qG)('NO'), 'no'));
                  $tr.append(Utils/* $HTML */.GV.td(act.actions));
                  $tr.append(Utils/* $HTML */.GV.td((0,Utils/* getPercent */.Os)(act.precision / 100)));
                  $tr.append(Utils/* $HTML */.GV.td((0,Utils/* getHMStime */.EB)(act.time * 1000)));
                } else {
                  $tr.append(Utils/* $HTML */.GV.td(act.name, 'incomplete'));
                  for (let r = 0; r < 4; r++)
                    $tr.append(Utils/* $HTML */.GV.td('-', 'incomplete'));
                }
                $t.append($tr);
                $tr = external_jquery_default()('<tr/>');
              });
            });

            $t.append(external_jquery_default()('<tr/>').append(
              Utils/* $HTML */.GV.td((0,Utils/* getMsg */.qG)('Total:')),
              Utils/* $HTML */.GV.td(`${sr.played} (${(0,Utils/* getPercent */.Os)(sr.ratioPlayed / 100)})`),
              Utils/* $HTML */.GV.td(`${sr.solved} (${(0,Utils/* getPercent */.Os)(sr.ratioSolved / 100)})`),
              Utils/* $HTML */.GV.td(sr.actions),
              Utils/* $HTML */.GV.td((0,Utils/* getPercent */.Os)(sr.score / 100)),
              Utils/* $HTML */.GV.td((0,Utils/* getHMStime */.EB)(sr.time * 1000))));

            result.push($t);
          }
        }, this);
      } else
        result.push(external_jquery_default()('<p/>').html((0,Utils/* getMsg */.qG)('No activities done!')));
    }
    return result;
  }

  /**
   * Enables or disables a specific counter
   * @param {string} counter - Which counter
   * @param {boolean} bEnabled - When `true`, the counter will be enabled.
   */
  enableCounter(counter, bEnabled) {
    if (this.counters[counter])
      this.counters[counter].setEnabled(bEnabled);
  }

  /**
   * Main method used to build the content of the skin. Resizes and places internal objects.
   */
  doLayout() {
    // Resize player
    this.player.doLayout();

    // Build ths canvas at the end of current thread, thus avoiding
    // invalid sizes due to incomplete layout of DOM objects
    if (this.$msgBoxDiv)
      window.setTimeout(() => {

        // Temporary remove canvas to let div get its natural size:
        if (this.$msgBoxDivCanvas)
          this.$msgBoxDivCanvas.remove();

        // Get current size of message box div without canvas
        const
          msgWidth = this.$msgBoxDiv.outerWidth(),
          msgHeight = this.$msgBoxDiv.outerHeight();

        // Replace existing canvas if size has changed
        if (this.$msgBoxDivCanvas === null ||
          this.msgBox.dim.widht !== msgWidth ||
          this.msgBox.dim.height !== msgHeight) {
          this.$msgBoxDivCanvas = external_jquery_default()(`<canvas width="${msgWidth}" height="${msgHeight}"/>`);
          this.msgBox.setBounds(new AWT/* Rectangle */.M_(0, 0, msgWidth + 1, msgHeight));
          this.msgBox.buildAccessibleElement(this.$msgBoxDivCanvas, this.$msgBoxDiv);
        }
        // restore canvas
        this.$msgBoxDiv.append(this.$msgBoxDivCanvas);
        this.updateContent();
      }, 0);
  }

  /**
   * adjusts the skin to the dimension of its `$div` container
   * @returns {module:AWT.Dimension} the new dimension of the skin
   */
  fit() {
    this.doLayout();
    return new AWT/* Dimension */.fg(this.$div.width(), this.$div.height());
  }

  /**
   * Sets or unsets the player in fullscreen mode, when allowed, using the
   * {@link https://github.com/sindresorhus/screenfull.js|screenfull.js} library.
   * @param {boolean} status - Whether to set or unset the player in fullscreen mode. When `null`
   * or `undefined`, the status toggles between fullscreen and windowed modes.
   * @returns {boolean} `true` if the request was successful, `false` otherwise.
   */
  setScreenFull(status) {
    if (document && document.fullscreenEnabled && (
      status === true && !document.fullscreenElement ||
      status === false && !document.fullscreenElement ||
      status !== true && status !== false)) {
      // Save current value of fullScreen for later use
      const full = document.fullscreenElement ? true : false;
      if (!document.fullscreenElement) {
        const element = this.player.$mainContainer.get(-1);
        if (element && element.requestFullscreen)
          element.requestFullscreen();
      } else {
        if (document.exitFullscreen) {
          document.exitFullscreen();
        }
      }
      this.player.fullScreenChecked = true;
      // Firefox don't updates `document.fullscreenElement` in real time, so use the saved value instead
      this.setSkinSizes(!full);
    }
  }

  /**
   * Method used to notify this skin that a specific action has changed its enabled/disabled status
   * @param {module:AWT.Action} _action - The action originating the change event
   */
  actionStatusChanged(act) {
    if (act.name && this.buttons[act.name])
      this.setEnabled(this.buttons[act.name], act.enabled);
  }

  /**
   * Enables or disables an object
   * @param {external:jQuery} $object - A JQuery DOM element
   * @override
   * @param {boolean} enabled
   */
  setEnabled($object, enabled) {
    if ($object && enabled)
      $object.removeAttr('disabled');
    else if ($object)
      $object.attr('disabled', true);
  }

  /**
   * Compares two Skin objects
   * @param {module:skins/Skin.Skin} skin - The Skin to compare against this
   * @returns {boolean} - `true` if both skins are equivalent.
   */
  equals(skin) {
    return skin &&
      this.name === skin.name &&
      this.ps === skin.ps;
  }

  /**
   * Gets the {@link module:boxes/ActiveBox.ActiveBox ActiveBox} used to display the main messages of activities
   * @returns {module:boxes/ActiveBox.ActiveBox}
   */
  getMsgBox() {
    return this.msgBox;
  }
}

/**
 * Collection of realized __Skin__ objects.
 * @type {module:skins/Skin.Skin[]}
 */
Skin.skinStack = [];

/**
 * Collection of skin style sheets already registered on the current document
 * @type {object}
 */
Skin.rootStyles = {};

/**
 * Counter used to label root nodes with unique IDs
 * @type {number}
 */
Skin.lastId = 1;

/**
 * List of classes derived from Skin. It should be filled by real skin classes at declaration time.
 * @type {object}
 */
Skin.CLASSES = {};

Object.assign(Skin.prototype, {
  /**
   * Class name of this skin. It will be used as a base selector in the definition of all CSS styles.
   * @name module:skins/Skin.Skin#skinId
   * @type {string} */
  skinId: 'JClicBasicSkin',
  /**
   * The HTML div object used by this Skin
   * @name module:skins/Skin.Skin#$div
   * @type {external:jQuery} */
  $div: null,
  /**
   * The HTML div where JClic Player will be placed
   * @name module:skins/Skin.Skin#$playerCnt
   * @type {external:jQuery} */
  $playerCnt: null,
  /**
   * Current name of the skin.
   * @name module:skins/Skin.Skin#name
   * @type {string} */
  name: 'default',
  /**
   * Specific options of this skin
   * @name module:skins/Skin.Skin#options
   * @type {object} */
  options: {},
  /**
   * Waiting panel, displayed while loading resources.
   * @name module:skins/Skin.Skin#$waitPanel
   * @type {external:jQuery} */
  $waitPanel: null,
  /**
   * Graphic indicator of loading progress
   * @name module:skins/Skin.Skin#$progress
   * @type {external:jQuery} */
  $progress: null,
  /**
   * Current value of the progress bar
   * @name module:skins/Skin.Skin#currentProgress
   * @type {number} */
  currentProgress: -1,
  /**
   * Max value of the progress bar
   * @name module:skins/Skin.Skin#maxProgress
   * @type {number} */
  maxProgress: 0,
  /**
   * The box used to display the main messages of JClic activities
   * @name module:skins/Skin.DefaultSkin#msgBox
   * @type {module:boxes/ActiveBox.ActiveBox} */
  msgBox: null,
  /**
   * The `div` DOM object where `msgBox` is located
   * @name module:skins/Skin.DefaultSkin#$msgBoxDiv
   * @type {external:jQuery} */
  $msgBoxDiv: null,
  /*
   * An HTML `canvas` object created in `$msgBoxDiv`
   * @name module:skins/Skin.DefaultSkin#$msgBoxDivCanvas
   * @type {external:jQuery} */
  $msgBoxDivCanvas: null,
  /**
   * Main panel used to display modal and non-modal dialogs
   * @name module:skins/Skin.Skin#$dlgOverlay
   * @type {external:jQuery} */
  $dlgOverlay: null,
  /**
   * Main panel of dialogs, where relevant information must be placed
   * @name module:skins/Skin.Skin#$dlgMainPanel
   * @type {external:jQuery} */
  $dlgMainPanel: null,
  /**
   * Bottom panel of dialogs, used for action buttons
   * @name module:skins/Skin.Skin#$dlgBottomPanel
   * @type {external:jQuery} */
  $dlgBottomPanel: null,
  /**
   * Element usually used as header in dialogs, with JClic logo, name and version
   * @name module:skins/Skin.Skin#infoHead
   * @type {external:jQuery} */
  $infoHead: null,
  /**
   * Iconic button used to copy content to clipboard
   * @name module:skins/Skin.Skin#$copyBtn
   * @type {external:jQuery} */
  $copyBtn: null,
  /**
   * Iconic button used to close the dialog
   * @name module:skins/Skin.Skin#$closeDlgBtn
   * @type {external:jQuery} */
  $closeDlgBtn: null,
  /**
   * OK dialog button
   * @name module:skins/Skin.Skin#$okDlgBtn
   * @type {external:jQuery} */
  $okDlgBtn: null,
  /**
   * Cancel dialog button
   * @name module:skins/Skin.Skin#$cancelDlgBtn
   * @type {external:jQuery} */
  $cancelDlgBtn: null,
  /**
   * Value to be returned by the dialog promise when the presented task is fulfilled
   * @name module:skins/Skin.Skin#_dlgOkValue
   * @type {object} */
  _dlgOkValue: null,
  /**
   * Value to be returned in user-canceled dialogs
   * @name module:skins/Skin.Skin#_dlgCancelValue
   * @type {object} */
  _dlgCancelValue: null,
  /**
   * Flag indicating if the current dialog is modal or not
   * @name module:skins/Skin.Skin#_isModalDlg
   * @type {boolean} */
  _isModalDlg: false,
  /**
   * Div inside {@link module:skins/Skin.Skin#$dlgOverlay $dlgOverlay} where JClicPlayer will place the information to be shown
   * @name module:skins/Skin.Skin#$reportsPanel
   * @type {external:jQuery} */
  $reportsPanel: null,
  /**
   * The basic collection of buttons that most skins implement
   * @name module:skins/Skin.Skin#buttons
   * @type {object} */
  buttons: {
    'prev': null,
    'next': null,
    'return': null,
    'reset': null,
    'info': null,
    'help': null,
    'audio': null,
    'about': null,
    'fullscreen': null,
    'close': null
  },
  /**
   * The collection of counters
   * @name module:skins/Skin.Skin#counters
   * @type {object} */
  counters: {
    'actions': null,
    'score': null,
    'time': null
  },
  /**
   * The collection of message areas
   * @name module:skins/Skin.Skin#msgArea
   * @type {object} */
  msgArea: {
    'main': null,
    'aux': null,
    'mem': null
  },
  /**
   * The {@link module:JClicPlayer.JClicPlayer JClicPlayer} object associated to this skin
   * @name module:skins/Skin.Skin#player
   * @type {module:JClicPlayer.JClicPlayer} */
  player: null,
  /**
   * The {@link http://projectestac.github.io/jclic/apidoc/edu/xtec/jclic/PlayStation.html|PlayStation}
   * used by this Skin. Usually, the same as `player`
   * @name module:skins/Skin.Skin#ps
   * @type {module:JClicPlayer.JClicPlayer} */
  ps: null,
  /**
   * Counter to be incremented or decremented as `waitCursor` is requested or released.
   * @name module:skins/Skin.Skin#waitCursorCount
   * @type {number} */
  waitCursorCount: 0,
  //
  // Buttons and other graphical resources used by this skin.
  //
  /**
   * Main styles
   * @name module:skins/Skin.Skin#basicCSS
   * @type {string} */
  basicCSS: basic_namespaceObject,
  /**
   * Waiting screen styles
   * @name module:skins/Skin.Skin#waitAnimCSS
   * @type {string} */
  waitAnimCSS: waitAnim_namespaceObject,
  /**
   * Animated image displayed while loading resources
   * Based on Ryan Allen's [svg-spinner](http://articles.dappergentlemen.com/2015/01/13/svg-spinner/)
   * @name module:skins/Skin.Skin#waitImgBig
   * @type {string} */
  waitImgBig: waitImgBig_namespaceObject,
  /**
   * Animated image displayed while loading resources (small)
   * @name module:skins/Skin.Skin#waitImgSmall
   * @type {string} */
  waitImgSmall: waitImgSmall_namespaceObject,
  /**
   * Reports screen styles
   * @name module:skins/Skin.Skin#reportsCSS
   * @type {string} */
  reportsCSS: reports_namespaceObject,
  //
  // Icons used in buttons:
  //
  /**
   * Icon for 'close dialog' button
   * @name module:skins/Skin.Skin#closeDialogIcon
   * @type {string} */
  closeDialogIcon: closeDialogIcon_namespaceObject,
  /**
   * Icon for 'ok' button
   * @name module:skins/Skin.Skin#okDialogIcon
   * @type {string} */
  okDialogIcon: okDialogIcon_namespaceObject,
  /**
   * Icon for 'copy' button
   * @name module:skins/Skin.Skin#copyIcon
   * @type {string} */
  copyIcon: copyIcon_namespaceObject,
  /**
   * JClic logo
   * @name module:skins/Skin.Skin#appLogo
   * @type {string} */
  appLogo: appLogo_namespaceObject,
  /**
   * Screen sizes (width and height) below which will half sized elements will be used
   * @name module:skins/Skin.DefaultSkin#halfMedia
   * @type {object} */
  halfMedia: { width: 376, height: 282 },
  /**
   * Screen sizes (width and height) below which will two-thirds sized elements will be used
   * @name module:skins/Skin.DefaultSkin#twoThirdsMedia
   * @type {object} */
  twoThirdsMedia: { width: 420, height: 315 },
});

/* harmony default export */ const skins_Skin = (Skin);


/***/ })

};
;
//# sourceMappingURL=757.jclic-node.js.map