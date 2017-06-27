/*! 
 * angular-loading-bar v0.0.5
 * https://chieffancypants.github.io/angular-loading-bar
 * Copyright (c) 2013 Wes Cruver
 * License: MIT
 */

/*
 * angular-loading-bar
 *
 * intercepts XHR requests and creates a loading bar when that shit happens.
 * Based on the excellent nprogress work by rstacruz (more info in readme)
 *
 * (c) 2013 Wes Cruver
 * License: MIT
 */


(function() {

  'use strict';

/**
 * loadingBarInterceptor service
 *
 * Registers itself as an Angular interceptor and listens for XHR requests.
 */
angular.module('chieffancypants.loadingBar', [])
  .config(['$httpProvider', function ($httpProvider) {

    var interceptor = ['$q', '$cacheFactory', 'cfpLoadingBar', function ($q, $cacheFactory, cfpLoadingBar) {

      /**
       * The total number of requests made
       */
      var reqsTotal = 0;

      /**
       * The number of requests completed (either successfully or not)
       */
      var reqsCompleted = 0;


      /**
       * calls cfpLoadingBar.complete() which removes the
       * loading bar from the DOM.
       */
      function setComplete() {
        cfpLoadingBar.complete();
        reqsCompleted = 0;
        reqsTotal = 0;
      }

      /**
       * Determine if the response has already been cached
       * @param  {Object}  config the config option from the request
       * @return {Boolean} retrns true if cached, otherwise false
       */
      function isCached(config) {
        var cache;
        var defaults = $httpProvider.defaults;

        if (config.method !== 'GET' || config.cache === false) {
          config.cached = false;
          return false;
        }

        if (config.cache === true && defaults.cache === undefined) {
          cache = $cacheFactory.get('$http');
        } else if (defaults.cache !== undefined) {
          cache = defaults.cache;
        } else {
          cache = config.cache;
        }

        var cached = cache !== undefined ?
          cache.get(config.url) !== undefined : false;

        if (config.cached !== undefined && cached !== config.cached) {
          return config.cached;
        }
        config.cached = cached;
        return cached;
      }

      return {
        'request': function(config) {
          if (!isCached(config)) {
            if (reqsTotal === 0) {
              cfpLoadingBar.start();
            }
            reqsTotal++;
          }
          return config;
        },

        'response': function(response) {
          if (!isCached(response.config)) {
            reqsCompleted++;
            if (reqsCompleted >= reqsTotal) {
              setComplete();
            } else {
              cfpLoadingBar.set(reqsCompleted / reqsTotal);
            }
          }
          return response;
        },

        'responseError': function(rejection) {
          if (!isCached(rejection.config)) {
            reqsCompleted++;
            if (reqsCompleted >= reqsTotal) {
              setComplete();
            } else {
              cfpLoadingBar.set(reqsCompleted / reqsTotal);
            }
          }
          return $q.reject(rejection);
        }
      };
    }];

    $httpProvider.interceptors.push(interceptor);
  }])


  /**
   * Loading Bar
   *
   * This service handles actually adding and removing the element from the DOM.
   * Because this is such a light-weight element, the
   */
  .provider('cfpLoadingBar', function() {

    this.includeSpinner = true;
    this.parentSelector = 'body';

    this.$get = ['$document', '$timeout', '$animate', function ($document, $timeout, $animate) {

      var $parentSelector = this.parentSelector,
        $parent = $document.find($parentSelector),
        loadingBarContainer = angular.element('<div id="loading-bar"><div class="bar"><div class="peg"></div></div></div>'),
        loadingBar = loadingBarContainer.find('div').eq(0),
        spinner = angular.element('<div id="loading-bar-spinner"><div class="spinner-icon"></div></div>');

      var incTimeout,
		completeTimeout,
        started = false,
        status = 0;

      var includeSpinner = this.includeSpinner;

      /**
       * Inserts the loading bar element into the dom, and sets it to 2%
       */
      function _start() {
        started = true;
        $timeout.cancel(completeTimeout);
        $animate.enter(loadingBarContainer, $parent);

        if (includeSpinner) {
          $animate.enter(spinner, $parent);
        }
        _set(0.02);
      }

      /**
       * Set the loading bar's width to a certain percent.
       *
       * @param n any value between 0 and 1
       */
      function _set(n) {
        if (!started) {
          return;
        }
        var pct = (n * 100) + '%';
        loadingBar.css('width', pct);
        status = n;

        // increment loadingbar to give the illusion that there is always progress
        // but make sure to cancel the previous timeouts so we don't have multiple
        // incs running at the same time.
        $timeout.cancel(incTimeout);
        incTimeout = $timeout(function() {
          _inc();
        }, 250);
      }

      /**
       * Increments the loading bar by a random amount
       * but slows down once it approaches 70%
       */
      function _inc() {
        if (_status() >= 1) {
          return;
        }

        var rnd = 0;

        // TODO: do this mathmatically instead of through conditions

        var stat = _status();
        if (stat >= 0 && stat < 0.25) {
          // Start out between 3 - 6% increments
          rnd = (Math.random() * (5 - 3 + 1) + 3) / 100;
        } else if (stat >= 0.25 && stat < 0.65) {
          // increment between 0 - 3%
          rnd = (Math.random() * 3) / 100;
        } else if (stat >= 0.65 && stat < 0.9) {
          // increment between 0 - 2%
          rnd = (Math.random() * 2) / 100;
        } else if (stat >= 0.9 && stat < 0.99) {
          // finally, increment it .5 %
          rnd = 0.005;
        } else {
          // after 99%, don't increment:
          rnd = 0;
        }

        var pct = _status() + rnd;
        _set(pct);
      }

      function _status() {
        return status;
      }

      function _complete() {
        _set(1);
        completeTimeout = $timeout(function() {
          $animate.leave(loadingBarContainer, function() {
            status = 0;
            started = false;
          });
          $animate.leave(spinner);
        }, 500);
      }

      return {
        start: _start,
        set: _set,
        status: _status,
        inc: _inc,
        complete: _complete,
        includeSpinner: this.includeSpinner,
        parentSelector: this.parentSelector,
      };



    }];     //
  });       // wtf javascript. srsly
})();       //
