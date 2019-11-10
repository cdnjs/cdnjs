// Copyright 2017 The Oppia Authors. All Rights Reserved.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS-IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

/**
 * Insert this script at the bottom of your web page. It will take all the
 * <oppia> tags and render them as iframes of Oppia explorations.
 */


(function(window, document) {
  // Prevent duplicate loads of this embedding script.
  if (window.hasOwnProperty('OPPIA_EMBED_GLOBALS')) {
    return;
  }

  window.OPPIA_EMBED_GLOBALS = {
    version: '0.0.3'
  };

  /**
   * Logs a message in the console only if the embedding page is on localhost.
   * @param {string} message The message to log.
   */
  var _debug = function(message) {
    if (console && window.location.host.indexOf('localhost') === 0) {
      console.log(message);
    }
  };

  /**
   * Logs a message in the console.
   * @param {string} message The message to log.
   */
  var _log = function(message) {
    if (console) {
      console.log(message);
    }
  };

  /**
   * Create a random secret that is added to the fragment (the part after the
   * '#' symbol) of each child iframe's location URL. Any postMessages sent to
   * that child should include this secret, and the child iframe should check
   * that the secret in the received postMessage matches the secret in the
   * location hash. This defends against fraudulent messages being sent to the
   * child iframe by other code within the parent page.
   */
  var SECRET_LENGTH = 64;
  var secret = '';
  for (var i = 0; i < SECRET_LENGTH; i++) {
    secret += String.fromCharCode(65 + Math.floor(Math.random() * 26));
  }

  var OppiaEmbed = (function() {
    function OppiaEmbed(oppiaNode) {
      // Validate the incoming node.
      if (oppiaNode.tagName !== 'OPPIA') {
        throw ('Error: expected OppiaEmbed to be defined using a node of ' +
               'type <oppia>, not ' + oppiaNode.tagName);
      }

      // This attribute is set to true when the iframe has loaded.
      this.contentHasLoaded = false;
      // The domain of the embedded site.
      this.targetDomain = null;

      // The initial <oppia> node.
      this.oppiaNode = oppiaNode;
      // The iframe node containing the exploration; this node ultimately
      // replaces the <oppia> node.
      this.iframe = null;
    }

    var LOADING_TIMEOUT_SECS = 10000;
    var warningBoxStyle = (
      'background-color: #ddd; border-radius: 5px; margin: 1px auto; ' +
      'max-width: 700px; padding: 30px; text-align: center');

    OppiaEmbed.prototype.init = function() {
      if (this.contentHasLoaded) {
        _log('Error: tried to re-initialize Oppia node after its content ' +
             'was loaded.');
        return;
      }

      if (this.iframe !== null) {
        _log('Error: tried to initialize Oppia node, but the exploration ' +
             'iframe is already loaded.');
        return;
      }

      var that = this;

      if (!this.oppiaNode.getAttribute('oppia-id')) {
        var strongTag = document.createElement('strong');
        strongTag.textContent = 'Warning: ';

        var spanTag = document.createElement('span');
        spanTag.textContent = (
          'This Oppia exploration could not be loaded because no ' +
          'oppia-id attribute was specified in the HTML tag.');

        var div = document.createElement('div');
        div.appendChild(strongTag);
        div.appendChild(spanTag);
        div.setAttribute('style', warningBoxStyle);

        this.oppiaNode.parentNode.replaceChild(div, this.oppiaNode);
        return;
      }

      this.iframe = document.createElement('iframe');
      var currLoc = window.location.protocol + '//' + window.location.host;
      this.targetDomain = this.oppiaNode.getAttribute('src') || currLoc;
      var locale = this.oppiaNode.getAttribute('locale') || 'en';
      var height = this.oppiaNode.getAttribute('height');
      var width = this.oppiaNode.getAttribute('width');
      var fixedHeight = 'false';
      var fixedWidth = 'false';
      var explorationVersion = (
        this.oppiaNode.getAttribute('exploration-version') || '');

      if (!height || height == 'auto') {
        height = '600px';
      } else {
        fixedHeight = 'true';
      }

      if (!width || width == 'auto') {
        width = '700px';
      } else {
        fixedWidth = 'true';
      }

      var VERSION_KEY = 'version=';
      var SECRET_KEY = 'secret=';
      var versionString = explorationVersion ? '&v=' + explorationVersion : '';
      this.iframe.src = encodeURI(
        this.targetDomain + '/embed/exploration/' +
        this.oppiaNode.getAttribute('oppia-id') +
        '?locale=en' + versionString +
        '#' + VERSION_KEY + OPPIA_EMBED_GLOBALS.version +
        '&' + SECRET_KEY + secret);

      var iframeAttrs = {
        seamless: 'seamless',
        height: height,
        width: width,
        fixedheight: fixedHeight,
        fixedwidth: fixedWidth,
        frameborder: 0
      };
      for (var key in iframeAttrs) {
        this.iframe.setAttribute(key, iframeAttrs[key]);
      }

      this.oppiaNode.parentNode.replaceChild(this.iframe, this.oppiaNode);

      /**
       * Receives JSON-encoded messages from embedded Oppia iframes. Each
       * message has a title and a payload. The structure of the payload
       * depends on what the title is:
       *   - 'heightChange': The payload is an Object with the following fields:
       *         height: a positive integer, and
       *         scroll: boolean -- scroll down to bottom if true.
       *   - 'explorationLoaded': The payload is an empty Object.
       *   - 'stateTransition': The payload is an Object with three keys:
       *       'oldStateName', 'jsonAnswer' and 'newStateName'. All three of
       *       these have values of type String.
       *   - 'explorationReset': The payload is an Object with a single
       *          key-value pair. The key is 'stateName', and the value is of
       *          type String.
       *   - 'explorationCompleted': The payload is an empty Object.
       */
      window.addEventListener('message', function(evt) {
        // Verify the origin of the message.
        if (evt.origin !== that.targetDomain) {
          return false;
        }

        // Verify that the message comes from the child we know about.
        if (evt.source !== that.iframe.contentWindow) {
          return false;
        }

        try {
          var data = JSON.parse(evt.data);
          _debug(data);
        } catch (error) {
          return false;
        }

        var iframeNode = that.iframe;
        switch (data.title) {
          case 'explorationLoaded':
            that.explorationHasLoaded = true;
            window.OPPIA_PLAYER.onExplorationLoaded(
              iframeNode, data.payload.explorationTitle);
            break;
          case 'heightChange':
            window.OPPIA_PLAYER.onHeightChange(
              iframeNode, data.payload.height, data.payload.scroll);
            break;
          case 'stateTransition':
            window.OPPIA_PLAYER.onStateTransition(
              iframeNode, data.payload.oldStateName, data.payload.jsonAnswer,
              data.payload.newStateName);
            break;
          case 'explorationReset':
            // This needs to be set in order to allow the scrollHeight of the
            // iframe content to be calculated accurately within the iframe's
            // JS.
            iframeNode.style.height = 'auto';
            window.OPPIA_PLAYER.onExplorationReset(
              iframeNode, data.payload.stateName);
            break;
          case 'explorationCompleted':
            window.OPPIA_PLAYER.onExplorationCompleted(iframeNode);
            break;
          default:
            _log('Error: event ' + data.title + ' not recognized.');
        }
      }, false);
    };

    return OppiaEmbed;
  })();

  window.onload = function() {
    // Note that document.getElementsByTagName() is a live view of the DOM and
    // will change in response to DOM mutations.
    var oppiaElementsFromDOM = document.getElementsByTagName('oppia');

    // The oppiaElementsFromDOM list needs to be copied, otherwise it gets
    // changed during the for loop.
    var oppiaElements = [];
    for (var i = 0; i < oppiaElementsFromDOM.length; i++) {
      oppiaElements.push(oppiaElementsFromDOM[i]);
    }

    for (var i = 0; i < oppiaElements.length; i++) {
      var oppiaElement = new OppiaEmbed(oppiaElements[i]);
      oppiaElement.init();
    }
  };

  window.OPPIA_PLAYER = {
    /**
     * Called when the height of the embedded iframe is changed.
     * @param {object} iframeNode The iframe node that is the source of the
     *     postMessage call.
     * @param {int} newHeight The new height of the embedded iframe.
     * @param {boolean} doScroll Scroll down to show the bottom of iframe after
     *     changing the height.
     */
    onHeightChange: function(iframeNode, newHeight, doScroll) {
      _debug(
        'onHeightChange event triggered on ' + iframeNode + ' for ' +
        newHeight);

      // This is set to 'auto' when the exploration is reset. If this is not
      // removed, the iframe height will not change even if iframeNode.height
      // is set.
      iframeNode.style.height = '';

      if (iframeNode.getAttribute('fixedheight') === 'false') {
        iframeNode.height = newHeight + 'px';
      }
      if (doScroll) {
        iframeNode.scrollIntoView(false);
      }

      window.OPPIA_PLAYER.onHeightChangePostHook(iframeNode, newHeight);
    },
    onExplorationLoaded: function(iframeNode, explorationTitle) {
      setTimeout(function() {
        // Show the oppia contents after making sure the rendering happened.
        iframeNode.style.position = 'inherit';
        iframeNode.style.visibility = 'inherit';
        iframeNode.style.top = 'inherit';
      }, 0);
      window.OPPIA_PLAYER.onExplorationLoadedPostHook(
        iframeNode, explorationTitle);
    },
    onStateTransition: function(
        iframeNode, oldStateName, jsonAnswer, newStateName) {
      window.OPPIA_PLAYER.onStateTransitionPostHook(
        iframeNode, oldStateName, jsonAnswer, newStateName);
    },
    onExplorationReset: function(iframeNode, stateName) {
      window.OPPIA_PLAYER.onExplorationResetPostHook(iframeNode, stateName);
    },
    onExplorationCompleted: function(iframeNode) {
      window.OPPIA_PLAYER.onExplorationCompletedPostHook(iframeNode);
    }
  };
}(window, document));

// FIXME: The contents of all functions below this line can be overwritten.

/**
 * Called after the height of the embedded iframe is changed and the iframe has
 * been appropriately resized.
 * @param {object} iframeNode The iframe node that is the source of the
 *     postMessage call.
 * @param {int} newHeight The new height of the embedded iframe.
 */
window.OPPIA_PLAYER.onHeightChangePostHook = function(iframeNode, newHeight) {

};

/**
 * Called when the exploration is loaded.
 * @param {object} iframeNode The iframe node that is the source of the
 *     postMessage call.
 * @param {string} explorationTitle The title of the exploration.
 */
window.OPPIA_PLAYER.onExplorationLoadedPostHook = function(
  iframeNode, explorationTitle) {

};

/**
 * Called when a new state is encountered.
 * @param {object} iframeNode The iframe node that is the source of the
 *     postMessage call.
 * @param {string} oldStateName The name of the previous state.
 * @param {string} jsonAnswer A JSON representation of the reader's answer.
 * @param {string} newStateName The name of the destination state.
 */
window.OPPIA_PLAYER.onStateTransitionPostHook = function(
    iframeNode, oldStateName, jsonAnswer, newStateName) {

};

/**
 * Called when the exploration is reset.
 * @param {object} iframeNode The iframe node that is the source of the
 *     postMessage call.
 * @param {string} stateName The reader's current state, before the reset.
 */
window.OPPIA_PLAYER.onExplorationResetPostHook = function(iframeNode, stateName) {

};

/**
 * Called when the exploration is completed.
 * @param {object} iframeNode The iframe node that is the source of the
 *     postMessage call.
 */
window.OPPIA_PLAYER.onExplorationCompletedPostHook = function(iframeNode) {

};
