"use strict";
exports.id = 6856;
exports.ids = [6856];
exports.modules = {

/***/ 6856:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {


// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": () => (/* binding */ panels_Menu)
});

// UNUSED EXPORTS: Menu, MenuPanel

// EXTERNAL MODULE: external "jquery"
var external_jquery_ = __webpack_require__(7750);
var external_jquery_default = /*#__PURE__*/__webpack_require__.n(external_jquery_);
// EXTERNAL MODULE: ./src/Activity.js
var Activity = __webpack_require__(1567);
// EXTERNAL MODULE: ./src/media/MediaContent.js + 6 modules
var MediaContent = __webpack_require__(2355);
// EXTERNAL MODULE: ./src/Utils.js
var Utils = __webpack_require__(1253);
;// ./src/activities/panels/icons/ico00.png
const ico00_namespaceObject = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAMAAABEpIrGAAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAAB1UExURUxpcZVZAGyAAGyAAJVZAJVZAJVZAIhmAJVZAJVZAJVZAIhmAGyAAGyAAGyAAGyAAGyAAJVZAJVZAGyAAJVZANj+AP+ZAMFzAPWSALVsANyEAM57AJ66AOiLALXVAM3xAK1nAI6oAIabAJWwAMTnAKFgAGyAAIlz9xYAAAAVdFJOUwB9oCIiZpkRRKq7M4BVu9VmVd1EzJvdA7gAAAE0SURBVDjLjZPZkoMgEEVFFsHdZBQR3M38/ycOKQ1gJKnpV051nwtNEPyrsjBNom9AqNSapxn8CBRjXY+DmjXkbQSXeq9tWJe7ByhVberXqzCY8yGM6GVK9FQ4SpVUxAwnJ+A+2wkLBLLppYgJRgZIrcJYBKxvdLUdFzE4mHBzFNDUvKoVdFfI7YQ1q7gD7LowXNRwaM4R6AzQEXNRWZrPT2jLA9YaQOIXQHV0WIbFvKZImPNGmLCMCwY0lJQQS6vAzEXFjY7Of5iORXwKySHe8+kWWwVeGQUnmW3QTMgDONUbhQ+ABAZwozkTqH1Ox8za3Jz3drLZDMABquuM9nFaKXZpwfFpp+j0ZiHJ21pifiIkQ++Lix+9nc+Z5/tQwrt2fxEBvN8vooQJLgTDX74xSi6z/wAoQC7hWsslMgAAAABJRU5ErkJggg==";
;// ./src/activities/panels/icons/ico01.png
const ico01_namespaceObject = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAMAAABEpIrGAAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAAByUExURUxpcfzZt/rfw/pycvrcv/3UrJqf/QAAAP/hxPvOov9sbPqFhYmN/f7nz3V4+/3ky/+AgPrIl11g/P/Klf+Kiv9XV//q1vtHR/rCim1w//pcXISI//tfX5WY/VNT///Dh/86OvwhISUl/js7+klM+vq6e8H/VfEAAAABdFJOUwBA5thmAAABGElEQVQ4y62T23aCMBBFiU48iQlELoJW7b3//4udBIi0MqsvDU+w95yEGSiK/15YrlVhd1+C8Nk05+ribzcvCJlXklBV3u/8pToLAnMk3kiCh0Hkz4LA/NSC+YcgANTWYP4OqVGmtmAuC2St2Mn4EMbq9TaPvABpDborD+OB0QqG8hbo3HTNAikFCtEZBTcMx+t+ewC2U4IyMAFUTgVd5nukHYlrqYcxSBlw15k/gTlXx/ySPT5NLOkyP7IQq0PoOd/wSZLgmLtD5AMLsS70ZbnZEL+LTQmZv6aEQIkrpTUlwWX+FhNCyNzaOiVkHgXODyHzFr87ye/3g+NxGrTgJ6zNa8nXJ04zf4Ew88ylr8KM/At//sB88w0/sBcK3bRRzgAAAABJRU5ErkJggg==";
;// ./src/activities/panels/icons/ico02.png
const ico02_namespaceObject = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAMAAABEpIrGAAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAAAtUExURUxpcQAAAP///8zMzJmZmfrdwP/hxPvOov3UrP3JlvzZt/zlzf/p0/zBh/rDjUN28cYAAAABdFJOUwBA5thmAAAAyklEQVQ4y6WT6w6DIAxG/YS2XHTv/7grLshF0C1r+KE5n6fFpMvybQHt6bldbXfQcazNsTD4MdCV+S+AQcBUBYa5M4BfHrcB8oNA08HLg0EeAiwOuGtBzoE0Mje4AO4S7QwhgDhlZrcISiNoqxzFoGbSb5Uyozhs4ckdD4M+OfQtUmeKcUsGnaQEyoSp/6YJIr2LXAPqp4OH4BzJtUXyZy7iBwbl8eSDALUc/Z/Sv1DxHfVm5ao5hjtIme+YbOnJMdlj/vCJoB5HX97wIgms7CtjdwAAAABJRU5ErkJggg==";
;// ./src/activities/panels/icons/ico03.png
const ico03_namespaceObject = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAMAAABEpIrGAAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAAAwUExURUxpcQAAAPrdwP/hxP7mz/8AAAAAmfvOov3UrAAA//3JlvzZtwCZAP8A//zCifq6e7UN6GsAAAABdFJOUwBA5thmAAABA0lEQVQ4y5WS2RbDIAhEHdyTJv3/vy2osVj1oR6zeYcBDcb8NV6v9fp1NV7mgq8cMs/cDWYHhrmomsM1pcj9pgS7FL3IZ6AI8nazsCiCnPOG3wf0QpArfDnoGATC6mwc9oi/AtMFgAFFLQhDCuZcQ0yAMghB+cuNUgJpSVM1zg7phGUFpv3VFdB5gqxolpwdTqYO5EaPJ57PgWOZWgvt0bl4u+LAbwmzv0Q7JxquJM2FSpwTBRHvRU7Mey/E16f4FwfeSkpUBD26CIQ+PMajODTmaw0Dr7/V1zRVQCNvAvNw6QbFb5iWwvRaWKE4Vh3H/6LxG+ueROfYdXXlb+zavg/++ADYLwfSmmk9oQAAAABJRU5ErkJggg==";
;// ./src/activities/panels/icons/icofolder.png
const icofolder_namespaceObject = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAMAAABEpIrGAAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAAAnUExURUxpcffvhP///2VlZczMZv//zPf39+/nc8zMzDMzmZmZZrW1tbWttcl3sA0AAAABdFJOUwBA5thmAAAAgklEQVQ4y9WSQQ6AIAwEsVtFwf+/14JGbcHeTHSuO9kFQggfBE8BFwLR+mBwFGYSZvh53zjzZTdkLTXCkS/ViDHBCLe8Gla48qpkGEHl+8pdYJo0yOouPA2GhLLiCCyC28DIcAXZ0IfsVKS3BTGUMDas0E9NfkO/ovmQBv2v0BJ+xAaYuQX2hCJNtwAAAABJRU5ErkJggg==";
;// ./src/activities/panels/Menu.js
/**
 *  File    : activities/panels/Menu.js
 *  Created : 20/07/2017
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






// Use Webpack to import PNG files






/**
 * This class of {@link module:Activity.Activity Activity} is only used in legacy JClic project libraries. It contains
 * one or more buttons pointing to specific JClic projects or to other `Menu` activity panels.
 * @extends module:Activity.Activity
 */
class Menu extends Activity/* Activity */.I {
  /**
   * Menu constructor
   * @param {module:project/JClicProject.JClicProject} project - The {@link module:project/JClicProject.JClicProject JClicProject} to which this activity belongs
   */
  constructor(project) {
    super(project);
    this.menuElements = [];
    // This kind of activities are not reported
    this.includeInReports = false;
    this.reportActions = false;
  }
}

/**
 * The {@link module:Activity.ActivityPanel ActivityPanel} where Menu will show its content.
 * @extends module:Activity.ActivityPanel
 */
class MenuPanel extends Activity/* ActivityPanel */.S {
  /**
   * MenuPanel constructor
   * @param {module:Activity.Activity} act - The {@link module:Activity.Activity Activity} to which this Panel belongs
   * @param {module:JClicPlayer.JClicPlayer} ps - Any object implementing the methods defined in the
   * [PlayStation](http://projectestac.github.io/jclic/apidoc/edu/xtec/jclic/PlayStation.html) Java interface.
   * @param {external:jQuery} [$div] - The jQuery DOM element where this Panel will deploy
   */
  constructor(act, ps, $div) {
    super(act, ps, $div);
    // This kind of activity will always clean the "last project skin" setting
    ps.lastProjectSkin = null;
  }

  /**
   * Prepares the visual components of the activity
   * @override
   */
  buildVisualComponents() {
    if (this.firstRun)
      super.buildVisualComponents();
    // This `div` will contain the action buttons
    const $btnDiv = external_jquery_default()('<div/>').css({
      'width': '100%',
      'max-height': '100%',
      'position': 'absolute',
      'top': '50%',
      'transform': 'translateY(-50%)',
      'display': 'flex',
      'flex-wrap': 'wrap',
      'overflow-y': 'auto',
      'place-content': 'center',
      'overflow-y': 'auto'
    });
    this.act.menuElements.forEach((me) => {
      // Create a button for each menu element
      const caption = me.description || me.caption || 'JClic';
      const $btn = external_jquery_default()('<button/>', {
        class: 'StockBtn',
        title: caption,
        'aria-label': caption
      }).css({
        'min-width': '80px',
        'max-width': '200px',
        'min-height': '80px',
        'margin': '4px',
        'padding': '4px',
        'display': 'flex',
        'flex-direction': 'column',
        'justify-content': 'center',
        'align-items': 'center'
      });

      // Set the button icon
      const
        iconSrc = MenuPanel.icons[me.icon || '@ico00.png'],
        $img = external_jquery_default()('<img/>', { src: iconSrc || '' }).css({
          'max-width': '180px',
          'max-height': '100px',
          'margin': '4px'
        });
      if (!iconSrc) {
        // It's not a stock image, so load `src` when available
        const mbe = this.act.project.mediaBag.getElement(me.icon, true);
        mbe.getFullPathPromise().then(imgFullPath => $img.attr('src', imgFullPath));
      }
      $btn.append($img);

      // Set the button text
      $btn.append(external_jquery_default()('<span/>').css({
        'max-width': '180px',
        'overflow': 'hidden',
        'white-space': 'nowrap',
        'text-overflow': 'ellipsis'
      }).html(me.caption));

      // Set a click listener method
      // $btn.on('click', function...) does not work!
      $btn[0].addEventListener('click', (ev) => {
        const mc = new MediaContent["default"](me.projectPath ? 'RUN_CLIC_PACKAGE' : 'RUN_CLIC_ACTIVITY', me.sequence);
        if (me.projectPath)
          mc.externalParam = me.projectPath;
        (0,Utils/* log */.Rm)('info', `Launching ${me.projectPath || ''} ${me.sequence || ''}`);
        this.ps.playMedia(mc);
        ev.preventDefault();
      });

      // Place the created button on the container
      $btnDiv.append($btn);
    });

    // Add the buttons container on the main panel `div`
    this.$div.empty().append($btnDiv);
  }

  /**
   * Sets the real dimension of this panel.
   * @override
   * @param {module:AWT.Dimension} preferredMaxSize - The maximum surface available for the activity panel
   * @returns {module:AWT.Dimension}
   */
  setDimension(preferredMaxSize) {
    return preferredMaxSize;
  }

  /**
   * Basic initialization procedure
   * @override
   */
  initActivity() {
    super.initActivity();

    if (!this.firstRun)
      this.buildVisualComponents();
    else
      this.firstRun = false;

    this.setAndPlayMsg('initial', 'start');
    this.playing = true;
  }
}

/**
 * Default icons used in buttons, inherited from JClic
 * @type {object}
 */
MenuPanel.icons = {
  '@ico00.png': ico00_namespaceObject,
  '@ico01.png': ico01_namespaceObject,
  '@ico02.png': ico02_namespaceObject,
  '@ico03.png': ico03_namespaceObject,
  '@icofolder.png': icofolder_namespaceObject,
};

/**
 * Panel class associated to this type of activity: {@link module:activities/panels/Menu.MenuPanel MenuPanel}
 * @type {class} */
Menu.Panel = MenuPanel;

// Register activity class
/* harmony default export */ const panels_Menu = (Activity/* Activity */.I.registerClass('@panels.Menu', Menu));




/***/ })

};
;
//# sourceMappingURL=6856.jclic-node.js.map