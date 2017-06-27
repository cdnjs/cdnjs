/*!
   angular-block-ui v0.2.0
   (c) 2015 (null) McNull https://github.com/McNull/angular-block-ui
   License: MIT
*/
(function(angular) {

var blkUI = angular.module('blockUI', []);

blkUI.config(["$provide", "$httpProvider", function ($provide, $httpProvider) {

  $provide.decorator('$exceptionHandler', ['$delegate', '$injector',
    function ($delegate, $injector) {
      var blockUI, blockUIConfig;

      return function (exception, cause) {

        blockUIConfig = blockUIConfig || $injector.get('blockUIConfig');

        if (blockUIConfig.resetOnException) {
          try {
            blockUI = blockUI || $injector.get('blockUI');
            blockUI.instances.reset();
          } catch (ex) {
            console.log('$exceptionHandler', exception);
          }
        }

        $delegate(exception, cause);
      };
    }
  ]);

  $httpProvider.interceptors.push('blockUIHttpInterceptor');
}]);

blkUI.run(["$document", "blockUIConfig", "$templateCache", function ($document, blockUIConfig, $templateCache) {
  if (blockUIConfig.autoInjectBodyBlock) {
    $document.find('body').attr('block-ui', 'main');
  }

  if (blockUIConfig.template) {

    // Swap the builtin template with the custom template.
    // Create a magic cache key and place the template in the cache.

    blockUIConfig.templateUrl = '$$block-ui-template$$';
    $templateCache.put(blockUIConfig.templateUrl, blockUIConfig.template);
  }
}]);

function moduleLoaded(name) {
  try {
    angular.module(name);
  } catch(ex) {
    return false;
  }
  return true;
}
blkUI.config(["$provide", function ($provide) {
  $provide.decorator('$location', decorateLocation);
}]);

var decorateLocation = [
  '$delegate', 'blockUI', 'blockUIConfig',
  function ($delegate, blockUI, blockUIConfig) {

    if (blockUIConfig.blockBrowserNavigation) {

      blockUI.$_blockLocationChange = true;

      var overrides = ['url', 'path', 'search', 'hash', 'state'];

      function hook(f) {
        var s = $delegate[f];
        $delegate[f] = function () {

          //        console.log(f, Date.now(), arguments);

          var result = s.apply($delegate, arguments);

          // The call was a setter if the $location service is returned.

          if (result === $delegate) {

            // Mark the mainblock ui to allow the location change.

            blockUI.$_blockLocationChange = false;
          }

          return result;
        };
      }

      angular.forEach(overrides, hook);

    }

    return $delegate;
}];

// Called from block-ui-directive for the 'main' instance.

function blockNavigation($scope, mainBlockUI, blockUIConfig) {

  if (blockUIConfig.blockBrowserNavigation) {

    function registerLocationChange() {

      $scope.$on('$locationChangeStart', function (event) {

        //        console.log('$locationChangeStart', mainBlockUI.$_blockLocationChange + ' ' + mainBlockUI.state().blockCount);

        if (mainBlockUI.$_blockLocationChange && mainBlockUI.state().blockCount > 0) {
          event.preventDefault();
        }
      });

      $scope.$on('$locationChangeSuccess', function () {
        mainBlockUI.$_blockLocationChange = blockUIConfig.blockBrowserNavigation;

        //        console.log('$locationChangeSuccess', mainBlockUI.$_blockLocationChange + ' ' + mainBlockUI.state().blockCount);
      });
    }

    if (moduleLoaded('ngRoute')) {

      // After the initial content has been loaded we'll spy on any location
      // changes and discard them when needed.

      var fn = $scope.$on('$viewContentLoaded', function () {

        // Unhook the view loaded and hook a function that will prevent
        // location changes while the block is active.

        fn();
        registerLocationChange();

      });

    } else {
      registerLocationChange();
    }

  }
}
blkUI.directive('blockUiContainer', ["blockUIConfig", "blockUiContainerLinkFn", function (blockUIConfig, blockUiContainerLinkFn) {
  return {
    scope: true,
    restrict: 'A',
    templateUrl: blockUIConfig.templateUrl,
    compile: function($element) {
      return blockUiContainerLinkFn;
    }
  };
}]).factory('blockUiContainerLinkFn', ["blockUI", "blockUIUtils", function (blockUI, blockUIUtils) {

  return function ($scope, $element, $attrs) {

    var srvInstance = $element.inheritedData('block-ui');

    if (!srvInstance) {
      throw new Error('No parent block-ui service instance located.');
    }

    // Expose the state on the scope

    $scope.state = srvInstance.state();

//    $scope.$watch('state.blocking', function(value) {
//      $element.toggleClass('block-ui-visible', !!value);
//    });
//
//    $scope.$watch('state.blockCount > 0', function(value) {
//      $element.toggleClass('block-ui-active', !!value);
//    });
  };
}]);
blkUI.directive('blockUi', ["blockUiCompileFn", function (blockUiCompileFn) {

  return {
    scope: true,
    restrict: 'A',
    compile: blockUiCompileFn
  };

}]).factory('blockUiCompileFn', ["blockUiPreLinkFn", function (blockUiPreLinkFn) {

  return function ($element, $attrs) {

    // Class should be added here to prevent an animation delay error.

    $element.append('<div block-ui-container class="block-ui-container"></div>');

    return {
      pre: blockUiPreLinkFn
    };

  };

}]).factory('blockUiPreLinkFn', ["blockUI", "blockUIUtils", "blockUIConfig", function (blockUI, blockUIUtils, blockUIConfig) {

  return function ($scope, $element, $attrs) {

    // If the element does not have the class "block-ui" set, we set the
    // default css classes from the config.

    if (!$element.hasClass('block-ui')) {
      $element.addClass(blockUIConfig.cssClass);
    }

    // Expose the blockUiMessageClass attribute value on the scope

    $attrs.$observe('blockUiMessageClass', function (value) {
      $scope.$_blockUiMessageClass = value;
    });

    // Create the blockUI instance
    // Prefix underscore to prevent integers:
    // https://github.com/McNull/angular-block-ui/pull/8

    var instanceId = $attrs.blockUi || '_' + $scope.$id;
    var srvInstance = blockUI.instances.get(instanceId);

    // If this is the main (topmost) block element we'll also need to block any
    // location changes while the block is active.

    if (instanceId === 'main') {
      blockNavigation($scope, srvInstance, blockUIConfig);
    } else {
      // Locate the parent blockUI instance
      var parentInstance = $element.inheritedData('block-ui');

      if (parentInstance) {
        // TODO: assert if parent is already set to something else
        srvInstance._parent = parentInstance;
      }
    }

    // Ensure the instance is released when the scope is destroyed

    $scope.$on('$destroy', function () {
      srvInstance.release();
    });

    // Increase the reference count

    srvInstance.addRef();

    // Expose the state on the scope

    $scope.$_blockUiState = srvInstance.state();

    $scope.$watch('$_blockUiState.blocking', function (value) {
      // Set the aria-busy attribute if needed
      $element.attr('aria-busy', !!value);
      $element.toggleClass('block-ui-visible', !!value);
    });

    $scope.$watch('$_blockUiState.blockCount > 0', function (value) {
      $element.toggleClass('block-ui-active', !!value);
    });

    // If a pattern is provided assign it to the state

    var pattern = $attrs.blockUiPattern;

    if (pattern) {
      var regExp = blockUIUtils.buildRegExp(pattern);
      srvInstance.pattern(regExp);
    }

    // Store a reference to the service instance on the element

    $element.data('block-ui', srvInstance);

  };

}]);
//.factory('blockUiPostLinkFn', function(blockUIUtils) {
//
//  return function($scope, $element, $attrs) {
//
//    var $message;
//
//    $attrs.$observe('blockUiMessageClass', function(value) {
//
//      $message = $message || blockUIUtils.findElement($element, function($e) {
//        return $e.hasClass('block-ui-message');
//      });
//
//      $message.addClass(value);
//
//    });
//  };
//
//});
blkUI.constant('blockUIConfig', {
    templateUrl: 'angular-block-ui/angular-block-ui.ng.html',
    delay: 250,
    message: "Loading ...",
    autoBlock: true,
    resetOnException: true,
    requestFilter: angular.noop,
    autoInjectBodyBlock: true,
    cssClass: 'block-ui block-ui-anim-fade',
    blockBrowserNavigation: false
});


blkUI.factory('blockUIHttpInterceptor', ["$q", "$injector", "blockUIConfig", "$templateCache", function($q, $injector, blockUIConfig, $templateCache) {

  var blockUI;

  function injectBlockUI() {
    blockUI = blockUI || $injector.get('blockUI');
  }

  function stopBlockUI(config) {
    if (blockUIConfig.autoBlock && (config && !config.$_noBlock && config.$_blocks)) {
      injectBlockUI();
      config.$_blocks.stop();
    }
  }

  function error(rejection) {

    try {
      stopBlockUI(rejection.config);
    } catch(ex) {
      console.log('httpRequestError', ex);
    }

    return $q.reject(rejection);
  }

  return {
    request: function(config) {

      // Only block when autoBlock is enabled ...
      // ... and the request doesn't match a cached template.

      if (blockUIConfig.autoBlock &&
        !(config.method == 'GET' && $templateCache.get(config.url))) {

        // Don't block excluded requests

        var result = blockUIConfig.requestFilter(config);

        if (result === false) {
          // Tag the config so we don't unblock this request
          config.$_noBlock = true;
        } else {

          injectBlockUI();

          config.$_blocks = blockUI.instances.locate(config);
          config.$_blocks.start(result);
        }
      }

      return config;
    },

    requestError: error,

    response: function(response) {

      // If the connection to the website goes down the response interceptor gets and error with "cannot read property config of null".
      // https://github.com/McNull/angular-block-ui/issues/53

      if(response) {
        stopBlockUI(response.config);
      }

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

    this._id = id;

    this._refs = 0;

    this.start = function(message) {

      if(state.blockCount > 0) {
        message = message || state.message || blockUIConfig.message;
      } else {
        message = message || blockUIConfig.message;
      }

      state.message = message;

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

    if(!isNaN(id)) {
      throw new Error('BlockUI id cannot be a number');
    }

    var instance = instances[id];

    if(!instance) {
      // TODO: ensure no array instance trashing [xxx] -- current workaround: '_' + $scope.$id
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

      var i = blockUIUtils.indexOf(instances, idOrInstance);
      instances.splice(i, 1);

      delete instances[idOrInstance.state().id];
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

  var $ = angular.element;

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
    },
    findElement: function ($element, predicateFn, traverse) {
      var ret = null;

      if (predicateFn($element)) {
        ret = $element;
      } else {

        var $elements;

        if (traverse) {
          $elements = $element.parent();
        } else {
          $elements = $element.children();
        }

        var i = $elements.length;
        while (!ret && i--) {
          ret = utils.findElement($($elements[i]), predicateFn, traverse);
        }
      }

      return ret;
    },
    indexOf: function(arr, obj, start) {
//      if(Array.prototype.indexOf) {
//        return arr.indexOf(obj, start);
//      }

      for (var i = (start || 0), j = arr.length; i < j; i++) {
        if (arr[i] === obj) {
          return i;
        }
      }

      return -1;
    }
  };

  return utils;

});
// Automatically generated.
// This file is already embedded in your main javascript output, there's no need to include this file
// manually in the index.html. This file is only here for your debugging pleasures.
angular.module('blockUI').run(['$templateCache', function($templateCache){
  $templateCache.put('angular-block-ui/angular-block-ui.ng.html', '<div class=\"block-ui-overlay\"></div><div class=\"block-ui-message-container\" aria-live=\"assertive\" aria-atomic=\"true\"><div class=\"block-ui-message\" ng-class=\"$_blockUiMessageClass\">{{ state.message }}</div></div>');
}]);
})(angular);
//# sourceMappingURL=angular-block-ui.js.map