/*!
 * angular-fontselect v0.0.1
 * https://github.com/Jimdo/angular-fontselect
 *
 * A fontselect directive for AngularJS
 *
 * Copyright 2014, Jimdo, Hannes Diercks <hannes.diercks@jimdo.com>
 * Released under the MIT license
 */
(function(angular) {
  'use strict';
  // src/js/module.js
  angular.module('fontselect.module', []);

  // src/js/directive.js
  angular.module('fontselect.module').directive('fontselect', [function() {
    return {
      restrict: 'E',
      templateUrl: 'fontselect.html',
      replace: true
    };
  }]);

  // src/partials/all.js
  angular.module('fontselect.module').run(['$templateCache', function($templateCache) {
    'use strict';
  
    $templateCache.put('fontselect.html',
      "<div class=fs-main></div>"
    );
  
  }]);
})(angular);
