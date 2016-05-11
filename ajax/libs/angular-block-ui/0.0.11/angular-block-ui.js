/*!
   angular-block-ui v0.0.10
   (c) 2014 (null) McNull https://github.com/McNull/angular-block-ui
   License: MIT
*/
(function(angular) {

var blkUI = angular.module('blockUI', []);

blkUI.config(["$provide", "$httpProvider", function($provide, $httpProvider) {

  $provide.decorator('$exceptionHandler', ['$delegate', '$injector',
    function($delegate, $injector) {
      var blockUI, blockUIConfig;

      return function(exception, cause) {

        blockUIConfig = blockUIConfig || $injector.get('blockUIConfig');

        if (blockUIConfig.resetOnException) {
          blockUI = blockUI || $injector.get('blockUI');
          blockUI.instances.reset();
        }

        $delegate(exception, cause);
      };
    }
  ]);

  $httpProvider.interceptors.push('blockUIHttpInterceptor');
}]);

blkUI.run(["$document", "blockUIConfig", function($document, blockUIConfig) {
  if(blockUIConfig.autoInjectBodyBlock) {
    $document.find('body').append('<div block-ui="main"></div>');
  }
}]);

blkUI.provider('blockUIConfig', function() {

  var _config = {
    templateUrl: 'angular-block-ui/angular-block-ui.ng.html',
    delay: 250,
    message: "Loading ...",
    autoBlock: true,
    resetOnException: true,
    requestFilter: angular.noop,
    autoInjectBodyBlock: true
  };

  this.templateUrl = function(url) {
    _config.templateUrl = url;
  };

  this.template = function(template) {
    _config.template = template;
  };

  this.delay = function(delay) {
    _config.delay = delay;
  };

  this.message = function(message) {
    _config.message = message;
  };

  this.autoBlock = function(enabled) {
    _config.autoBlock = enabled;
  };

  this.resetOnException = function(enabled) {
    _config.resetOnException = enabled;
  };

  this.requestFilter = function(filter) {
    _config.requestFilter = filter;
  };

  this.autoInjectBodyBlock = function(enabled) {
    _config.autoInjectBodyBlock = enabled;
  };

  this.$get = function() {
    return _config;
  };
});

blkUI.directive('blockUi', ["blockUI", "blockUIConfig", "blockUiLinkFn", function(blockUI, blockUIConfig, blockUiLinkFn) {
  return {
    scope: true,
    restrict: 'A',
    templateUrl: blockUIConfig.template ? undefined : blockUIConfig.templateUrl,
    template: blockUIConfig.template,
    link: blockUiLinkFn
  };
}]).factory('blockUiLinkFn', ["blockUI", "blockUIUtils", function(blockUI, blockUIUtils) {

  return function($scope, $element, $attrs) {
    
    var $parent = $element.parent();

    // Locate the parent element  

    if ($parent.length) {
      
      var srvInstance = blockUI;
      
      // If the parent is the body element, hook into the view loaded event

      if ($parent[0].tagName === 'BODY') {
        var fn = $scope.$on('$viewContentLoaded', function($event) {
 
          // Unhook the view loaded and hook a function that will prevent
          // location changes while the block is active.

          fn();
          $scope.$on('$locationChangeStart', function(event) {
            if ($scope.state.blockCount > 0) {
              event.preventDefault();
            }
          });
        });
      } else {

        // Ensure that the parent position is set to relative 

        $parent.css('position', 'relative');

        // Create the blockUI instance

        var instanceId = !$attrs.blockUi ? '_' + $scope.$id : $attrs.blockUi;

        srvInstance = blockUI.instances.get(instanceId);

        // Locate the parent blockUI instance

        var parentInstance = $element.inheritedData('block-ui');

        if(parentInstance) {

          // TODO: assert if parent is already set to something else
          
          srvInstance._parent = parentInstance;
        }

        // If a pattern is provided assign it to the state

        var pattern = $attrs.blockUiPattern;

        if(pattern) {
          var regExp = blockUIUtils.buildRegExp(pattern);
          srvInstance.pattern(regExp);
        }

        // Ensure the instance is released when the scope is destroyed

        $scope.$on('$destroy', function() {
          srvInstance.release();
        });

        // Increase the reference count

        srvInstance.addRef();
      }
      
      $element.addClass('block-ui');
      $parent.data('block-ui', srvInstance);
      $scope.state = srvInstance.state();
      
      $scope.$watch('state.blocking', function(value){
        $parent.attr('aria-busy', value);
      });
    }
  };
}]);

blkUI.factory('blockUIHttpInterceptor', ["$q", "$injector", "blockUIConfig", function($q, $injector, blockUIConfig) {

  var blockUI;

  function injectBlockUI() {
    blockUI = blockUI || $injector.get('blockUI');
  }

  function stopBlockUI(config) {
    if (blockUIConfig.autoBlock && !config.$_noBlock && config.$_blocks) {
      injectBlockUI();
      config.$_blocks.stop();
    }
  }

  function error(rejection) {
    stopBlockUI(rejection.config);
    return $q.reject(rejection);
  }

  return {
    request: function(config) {

      if (blockUIConfig.autoBlock) {

        // Don't block excluded requests

        if (blockUIConfig.requestFilter(config) === false) {
          // Tag the config so we don't unblock this request
          config.$_noBlock = true;
        } else {
          injectBlockUI();

          config.$_blocks = blockUI.instances.locate(config);
          config.$_blocks.start();
        }
      }

      return config;
    },

    requestError: error,

    response: function(response) {
      stopBlockUI(response.config);
      return response;
    },

    responseError: error
  };

}]);

blkUI.factory('blockUI', ["blockUIConfig", "$timeout", "blockUIUtils", "$document", function(blockUIConfig, $timeout, blockUIUtils, $document) {

  var $body = $document.find('body');

  function BlockUI(id) {

    var self = this;

    var state = {
      id: id,
      blockCount: 0,
      message: blockUIConfig.message,
      blocking: false
    }, startPromise, doneCallbacks = [];

    this._refs = 0;

    this.start = function(message) {
      state.message = message || blockUIConfig.message;

      state.blockCount++;

      // Check if the focused element is part of the block scope

      var $ae = angular.element($document[0].activeElement);

      if($ae.length && blockUIUtils.isElementInBlockScope($ae, self)) {

        // Let the active element lose focus and store a reference 
        // to restore focus when we're done (reset)

        self._restoreFocus = $ae[0];

        // https://github.com/McNull/angular-block-ui/issues/13
        // http://stackoverflow.com/questions/22698058/apply-already-in-progress-error-when-using-typeahead-plugin-found-to-be-relate
        // Queue the blur after any ng-blur expression.

        $timeout(function() {
          // Ensure we still need to blur
          if(self._restoreFocus) {
            self._restoreFocus.blur();
          }
        });
      }

      if (!startPromise) {
        startPromise = $timeout(function() {
          startPromise = null;
          state.blocking = true;
        }, blockUIConfig.delay);
      }
    };

    this._cancelStartTimeout = function() {
      if (startPromise) {
        $timeout.cancel(startPromise);
        startPromise = null;
      }
    };

    this.stop = function() {
      state.blockCount = Math.max(0, --state.blockCount);

      if (state.blockCount === 0) {
        self.reset(true);
      }
    };

    this.message = function(value) {
      state.message = value;
    };

    this.pattern = function(regexp) {
      if (regexp !== undefined) {
        self._pattern = regexp;
      }

      return self._pattern;
    };

    this.reset = function(executeCallbacks) {
      
      self._cancelStartTimeout();
      state.blockCount = 0;
      state.blocking = false;

      // Restore the focus to the element that was active
      // before the block start, but not if the user has 
      // focused something else while the block was active.

      if(self._restoreFocus && 
         (!$document[0].activeElement || $document[0].activeElement === $body[0])) {
        self._restoreFocus.focus();
        self._restoreFocus = null;
      }
      
      try {
        if (executeCallbacks) {
          angular.forEach(doneCallbacks, function(cb) {
            cb();
          });
        }
      } finally {
        doneCallbacks.length = 0;
      }
    };

    this.done = function(fn) {
      doneCallbacks.push(fn);
    };

    this.state = function() {
      return state;
    };

    this.addRef = function() {
      self._refs += 1;
    };

    this.release = function() {
      if(--self._refs <= 0) {
        mainBlock.instances._destroy(self);
      }
    };
  }

  var instances = [];

  instances.get = function(id) {
    var instance = instances[id];

    if(!instance) {
      instance = instances[id] = new BlockUI(id);
      instances.push(instance);
    }

    return instance;
  };

  instances._destroy = function(idOrInstance) {
    if (angular.isString(idOrInstance)) {
      idOrInstance = instances[idOrInstance];
    }

    if (idOrInstance) {
      idOrInstance.reset();
      delete instances[idOrInstance.state().id];
      var i = instances.length;
      while(--i) {
        if(instances[i] === idOrInstance) {
          instances.splice(i, 1);
          break;
        }
      }
    }
  };
  
  instances.locate = function(request) {

    var result = [];

    // Add function wrappers that will be executed on every item
    // in the array.
    
    blockUIUtils.forEachFnHook(result, 'start');
    blockUIUtils.forEachFnHook(result, 'stop');

    var i = instances.length;

    while(i--) {
      var instance = instances[i];
      var pattern = instance._pattern;

      if(pattern && pattern.test(request.url)) {
        result.push(instance);
      }
    }

    if(result.length === 0) {
      result.push(mainBlock);
    }

    return result;
  };

  // Propagate the reset to all instances

  blockUIUtils.forEachFnHook(instances, 'reset');

  var mainBlock = instances.get('main');

  mainBlock.addRef();
  mainBlock.instances = instances;

  return mainBlock;
}]);


blkUI.factory('blockUIUtils', function() {

  var utils = {
    buildRegExp: function(pattern) {
      var match = pattern.match(/^\/(.*)\/([gim]*)$/), regExp;

      if(match) {
        regExp = new RegExp(match[1], match[2]);
      } else {
        throw Error('Incorrect regular expression format: ' + pattern);
      }

      return regExp;
    },
    forEachFn: function(arr, fnName, args) {
      var i = arr.length;
      while(i--) {
        var t = arr[i];
        t[fnName].apply(t, args);
      }
    },
    forEachFnHook: function(arr, fnName) {
      arr[fnName] = function() {
        utils.forEachFn(this, fnName, arguments);
      }
    },
    isElementInBlockScope: function($element, blockScope) {
      var c = $element.inheritedData('block-ui');

      while(c) {
        if(c === blockScope) {
          return true;
        }

        c = c._parent;
      }

      return false;
    }
  };

  return utils;

});
// Automatically generated.
// This file is already embedded in your main javascript output, there's no need to include this file
// manually in the index.html. This file is only here for your debugging pleasures.
angular.module('blockUI').run(['$templateCache', function($templateCache){
  $templateCache.put('angular-block-ui/angular-block-ui.ng.html', '<div ng-show=\"state.blockCount > 0\" class=\"block-ui-overlay\" ng-class=\"{ \'block-ui-visible\': state.blocking }\"></div><div ng-show=\"state.blocking\" class=\"block-ui-message-container\" aria-live=\"assertive\" aria-atomic=\"true\"><div class=\"block-ui-message\">{{ state.message }}</div></div>');
}]);
})(angular);
//# sourceMappingURL=angular-block-ui.js.map