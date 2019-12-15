(function (window) {
  'use strict';

  var patternfly = {
    version: "0.0.0-semantically-released",
  };

  // definition of breakpoint sizes for tablet and desktop modes
  patternfly.pfBreakpoints = {
    'tablet': 768,
    'desktop': 1200
  };

  window.patternfly = patternfly;

})(typeof window !== 'undefined' ? window : global);
