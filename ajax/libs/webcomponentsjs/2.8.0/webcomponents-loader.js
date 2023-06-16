/**
 * @license
 * Copyright (c) 2018 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
 */

(function () {
  'use strict';

  /**
   * Basic flow of the loader process
   *
   * There are 4 flows the loader can take when booting up
   *
   * - Synchronous script, no polyfills needed
   *   - wait for `DOMContentLoaded`
   *   - fire WCR event, as there could not be any callbacks passed to `waitFor`
   *
   * - Synchronous script, polyfills needed
   *   - document.write the polyfill bundle
   *   - wait on the `load` event of the bundle to batch Custom Element upgrades
   *   - wait for `DOMContentLoaded`
   *   - run callbacks passed to `waitFor`
   *   - fire WCR event
   *
   * - Asynchronous script, no polyfills needed
   *   - wait for `DOMContentLoaded`
   *   - run callbacks passed to `waitFor`
   *   - fire WCR event
   *
   * - Asynchronous script, polyfills needed
   *   - Append the polyfill bundle script
   *   - wait for `load` event of the bundle
   *   - batch Custom Element Upgrades
   *   - run callbacks pass to `waitFor`
   *   - fire WCR event
   */

  var polyfillsLoaded = false;
  var whenLoadedFns = [];
  var allowUpgrades = false;
  var flushFn;

  function fireEvent() {
    window.WebComponents.ready = true;
    document.dispatchEvent(
      new CustomEvent('WebComponentsReady', {bubbles: true})
    );
  }

  function batchCustomElements() {
    if (window.customElements && customElements.polyfillWrapFlushCallback) {
      customElements.polyfillWrapFlushCallback(function (flushCallback) {
        flushFn = flushCallback;
        if (allowUpgrades) {
          flushFn();
        }
      });
    }
  }

  function asyncReady() {
    batchCustomElements();
    ready();
  }

  function ready() {
    // bootstrap <template> elements before custom elements
    if (window.HTMLTemplateElement && HTMLTemplateElement.bootstrap) {
      HTMLTemplateElement.bootstrap(window.document);
    }
    polyfillsLoaded = true;
    runWhenLoadedFns().then(fireEvent);
  }

  function runWhenLoadedFns() {
    allowUpgrades = false;
    var fnsMap = whenLoadedFns.map(function (fn) {
      return fn instanceof Function ? fn() : fn;
    });
    whenLoadedFns = [];
    return Promise.all(fnsMap)
      .then(function () {
        allowUpgrades = true;
        flushFn && flushFn();
      })
      .catch(function (err) {
        console.error(err);
      });
  }

  window.WebComponents = window.WebComponents || {};
  window.WebComponents.ready = window.WebComponents.ready || false;
  window.WebComponents.waitFor =
    window.WebComponents.waitFor ||
    function (waitFn) {
      if (!waitFn) {
        return;
      }
      whenLoadedFns.push(waitFn);
      if (polyfillsLoaded) {
        runWhenLoadedFns();
      }
    };
  window.WebComponents._batchCustomElements = batchCustomElements;

  var name = 'webcomponents-loader.js';
  // Feature detect which polyfill needs to be imported.
  var polyfills = [];
  if (
    !(
      'attachShadow' in Element.prototype && 'getRootNode' in Element.prototype
    ) ||
    (window.ShadyDOM && window.ShadyDOM.force)
  ) {
    polyfills.push('sd');
  }
  if (!window.customElements || window.customElements.forcePolyfill) {
    polyfills.push('ce');
  }

  var needsTemplate = (function () {
    // no real <template> because no `content` property (IE and older browsers)
    var t = document.createElement('template');
    if (!('content' in t)) {
      return true;
    }
    // broken doc fragment (older Edge)
    if (!(t.content.cloneNode() instanceof DocumentFragment)) {
      return true;
    }
    // broken <template> cloning (Edge up to at least version 17)
    var t2 = document.createElement('template');
    t2.content.appendChild(document.createElement('div'));
    t.content.appendChild(t2);
    var clone = t.cloneNode(true);
    return (
      clone.content.childNodes.length === 0 ||
      clone.content.firstChild.content.childNodes.length === 0
    );
  })();

  // NOTE: any browser that does not have template or ES6 features
  // must load the full suite of polyfills.
  if (
    !window.Promise ||
    !Array.from ||
    !window.URL ||
    !window.Symbol ||
    needsTemplate
  ) {
    polyfills = ['sd-ce-pf'];
  }

  if (polyfills.length) {
    // When the Trusted Types API is available, `policy` is a
    // `TrustedTypePolicy` with functions for creating trusted HTML, scripts,
    // and script URLs. This policy is used below to (a) approve the bundle URL
    // string created by the loader that is assigned to a `<script>`'s `src`
    // attribute, (b) approve a constant script string that is assigned to that
    // `<script>'s `onload` attribute, and (c) approve the string of HTML that
    // the loader reads from that `<script>`'s `outerHTML`.
    //
    // If the Trusted Types API is not available, the returned object exposes a
    // similar interface to a `TrustedTypePolicy`, but all of its functions are
    // the identity function.
    var policy = (function () {
      var identity = function (x) {
        return x;
      };
      var policyOptions = {
        createHTML: identity,
        createScript: identity,
        createScriptURL: identity,
      };
      var policy =
        window.trustedTypes &&
        window.trustedTypes.createPolicy('webcomponents-loader', policyOptions);
      return policy || policyOptions;
    })();

    var url;
    var polyfillFile = 'bundles/webcomponents-' + polyfills.join('-') + '.js';

    // Load it from the right place.
    if (window.WebComponents.root) {
      url = window.WebComponents.root + polyfillFile;
      if (
        window.trustedTypes &&
        window.trustedTypes.isScriptURL(window.WebComponents.root)
      ) {
        url = policy.createScriptURL(url);
      }
    } else {
      var script = document.querySelector('script[src*="' + name + '"]');
      // Load it from the right place.
      url = policy.createScriptURL(script.src.replace(name, polyfillFile));
    }

    var newScript = document.createElement('script');
    newScript.src = url;
    // if readyState is 'loading', this script is synchronous
    if (document.readyState === 'loading') {
      // make sure custom elements are batched whenever parser gets to the injected script
      newScript.setAttribute(
        'onload',
        policy.createScript('window.WebComponents._batchCustomElements()')
      );
      document.write(policy.createHTML(newScript.outerHTML));
      document.addEventListener('DOMContentLoaded', ready);
    } else {
      newScript.addEventListener('load', function () {
        asyncReady();
      });
      newScript.addEventListener('error', function () {
        throw new Error('Could not load polyfill bundle' + url);
      });
      document.head.appendChild(newScript);
    }
  } else {
    // if readyState is 'complete', script is loaded imperatively on a spec-compliant browser, so just fire WCR
    if (document.readyState === 'complete') {
      polyfillsLoaded = true;
      fireEvent();
    } else {
      // this script may come between DCL and load, so listen for both, and cancel load listener if DCL fires
      window.addEventListener('load', ready);
      window.addEventListener('DOMContentLoaded', function () {
        window.removeEventListener('load', ready);
        ready();
      });
    }
  }
})();
