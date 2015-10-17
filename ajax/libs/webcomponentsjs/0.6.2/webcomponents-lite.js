/**
 * @license
 * Copyright (c) 2014 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
 */

(function() {

  // Establish scope.
  window.WebComponents = window.WebComponents || {flags:{}};

  // loading script
  var file = 'webcomponents-lite.js';
  var script = document.querySelector('script[src*="' + file + '"]');

  // Flags. Convert url arguments to flags
  var flags = {};
  if (!flags.noOpts) {
    // from url
    location.search.slice(1).split('&').forEach(function(option) {
      var parts = option.split('=');
      var match;
      if (parts[0] && (match = parts[0].match(/wc-(.+)/))) {
        flags[match[1]] = parts[1] || true;
      }
    });
    // from script
    if (script) {
      for (var i=0, a; (a=script.attributes[i]); i++) {
        if (a.name !== 'src') {
          flags[a.name] = a.value || true;
        }
      }
    }
    // log flags
    if (flags.log && flags.log.split) {
      var parts = flags.log.split(',');
      flags.log = {};
      parts.forEach(function(f) {
        flags.log[f] = true;
      });
    } else {
      flags.log = {};
    }
  }

  // construct full dependency list
  var modules = [
    'URL/URL.js',
    'WeakMap/WeakMap.js',
    'MutationObserver/MutationObserver.js',
    'HTMLImports/HTMLImports.js',
    'CustomElements/CustomElements.js',
    'Template/Template.js',
    // these scripts are loaded here due to polyfill timing issues
    'WebComponents/unresolved.js'
  ];

  var src = script.getAttribute('src');
  var path = src.slice(0, src.lastIndexOf(file));

  modules.forEach(function(f) {
    document.write('<script src="' + path + 'src/' + f + '"></script>');
  });

  // exports
  WebComponents.flags = flags;

})();
