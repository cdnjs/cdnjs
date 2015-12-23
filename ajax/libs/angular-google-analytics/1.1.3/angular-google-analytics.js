/**
 * Angular Google Analytics - Easy tracking for your AngularJS application
 * @version v1.1.3 - 2015-10-26
 * @link http://github.com/revolunet/angular-google-analytics
 * @author Julien Bouquillon <julien@revolunet.com> (https://github.com/revolunet)
 * @contributors Julien Bouquillon (https://github.com/revolunet),Justin Saunders (https://github.com/justinsa),Chris Esplin (https://github.com/deltaepsilon),Adam Misiorny (https://github.com/adam187)
 * @license MIT License, http://www.opensource.org/licenses/MIT
 */
(function (window, document, angular, undefined) {
  'use strict';
  angular.module('angular-google-analytics', [])
    .provider('Analytics', function () {
      var accounts,
          analyticsJS = true,
          cookieConfig = 'auto', // DEPRECATED
          created = false,
          crossDomainLinker = false,
          crossLinkDomains,
          currency = 'USD',
          delayScriptTag = false,
          displayFeatures = false,
          domainName,
          ecommerce = false,
          enhancedEcommerce = false,
          enhancedLinkAttribution = false,
          experimentId,
          ignoreFirstPageLoad = false,
          logAllCalls = false,
          hybridMobileSupport = false,
          offlineMode = false,
          pageEvent = '$routeChangeSuccess',
          removeRegExp,
          testMode = false,
          trackPrefix = '',
          trackRoutes = true,
          trackUrlParams = false;

      this.log = [];
      this.offlineQueue = [];

      /**
       * Configuration Methods
       **/

      this.setAccount = function (tracker) {
        if (angular.isUndefined(tracker) || tracker === false) {
          accounts = undefined;
        } else if (angular.isArray(tracker)) {
          accounts = tracker;
        } else if (angular.isObject(tracker)) {
          accounts = [tracker];
        } else {
          // In order to preserve an existing behavior with how the _trackEvent function works,
          // the trackEvent property must be set to true when there is only a single tracker.
          accounts = [{ tracker: tracker, trackEvent: true }];
        }
        return this;
      };

      this.trackPages = function (doTrack) {
        trackRoutes = doTrack;
        return this;
      };

      this.trackPrefix = function (prefix) {
        trackPrefix = prefix;
        return this;
      };

      this.setDomainName = function (domain) {
        domainName = domain;
        return this;
      };

      this.useDisplayFeatures = function (val) {
        displayFeatures = !!val;
        return this;
      };

      this.useAnalytics = function (val) {
        analyticsJS = !!val;
        return this;
      };

      this.useEnhancedLinkAttribution = function (val) {
        enhancedLinkAttribution = !!val;
        return this;
      };

      this.useCrossDomainLinker = function (val) {
        crossDomainLinker = !!val;
        return this;
      };

      this.setCrossLinkDomains = function (domains) {
        crossLinkDomains = domains;
        return this;
      };

      this.setPageEvent = function (name) {
        pageEvent = name;
        return this;
      };

      /* DEPRECATED */
      this.setCookieConfig = function (config) {
        cookieConfig = config;
        return this;
      };

      this.useECommerce = function (val, enhanced) {
        ecommerce = !!val;
        enhancedEcommerce = !!enhanced;
        return this;
      };

      this.setCurrency = function (currencyCode) {
        currency = currencyCode;
        return this;
      };

      this.setRemoveRegExp = function (regex) {
        if (regex instanceof RegExp) {
          removeRegExp = regex;
        }
        return this;
      };

      this.setExperimentId = function (id) {
        experimentId = id;
        return this;
      };

      this.ignoreFirstPageLoad = function (val) {
        ignoreFirstPageLoad = !!val;
        return this;
      };

      this.trackUrlParams = function (val) {
        trackUrlParams = !!val;
        return this;
      };

      this.setHybridMobileSupport = function (val) {
        hybridMobileSupport = !!val;
        return this;
      };

      this.startOffline = function (val) {
        offlineMode = !!val;
        if (offlineMode === true) {
          this.delayScriptTag(true);
        }
        return this;
      };

      this.delayScriptTag = function (val) {
        delayScriptTag = !!val;
        return this;
      };

      this.logAllCalls = function (val) {
        logAllCalls = !!val;
        return this;
      };

      this.enterTestMode = function () {
        testMode = true;
        return this;
      };

      /**
       * Public Service
       */
      this.$get = ['$document', '$location', '$log', '$rootScope', '$window', function ($document, $location, $log, $rootScope, $window) {
        var that = this;

        /**
         * Side-effect Free Helper Methods
         **/

        var generateCommandName = function (commandName, config) {
          if (angular.isString(config)) {
            return config + '.' + commandName;
          }
          return isPropertyDefined('name', config) ? (config.name + '.' + commandName) : commandName;
        };

        var isPropertyDefined = function (key, config) {
          return angular.isObject(config) && angular.isDefined(config[key]);
        };

        var isPropertySetTo = function (key, config, value) {
          return isPropertyDefined(key, config) && config[key] === value;
        };

        var getUrl = function () {
          var url = trackUrlParams ? $location.url() : $location.path();
          return removeRegExp ? url.replace(removeRegExp, '') : url;
        };

        var getUtmParams = function () {
          var utmToCampaignVar = {
            utm_source: 'campaignSource',
            utm_medium: 'campaignMedium',
            utm_term: 'campaignTerm',
            utm_content: 'campaignContent',
            utm_campaign: 'campaignName'
          };
          var object = {};

          angular.forEach($location.search(), function (value, key) {
            var campaignVar = utmToCampaignVar[key];

            if (angular.isDefined(campaignVar)) {
              object[campaignVar] = value;
            }
          });

          return object;
        };

        /**
         * get ActionFieldObject
         * https://developers.google.com/analytics/devguides/collection/analyticsjs/enhanced-ecommerce#action-data
         * @param id
         * @param affliation
         * @param revenue
         * @param tax
         * @param shipping
         * @param coupon
         * @param list
         * @param step
         * @param option
         */
        var getActionFieldObject = function (id, affiliation, revenue, tax, shipping, coupon, list, step, option) {
          var obj = {};
          if (id) { obj.id = id; }
          if (affiliation) { obj.affiliation = affiliation; }
          if (revenue) { obj.revenue = revenue; }
          if (tax) { obj.tax = tax; }
          if (shipping) { obj.shipping = shipping; }
          if (coupon) { obj.coupon = coupon; }
          if (list) { obj.list = list; }
          if (step) { obj.step = step; }
          if (option) { obj.option = option; }
          return obj;
        };

        /**
         * Private Methods
         */

        var _gaJs = function (fn) {
          if (!analyticsJS && $window._gaq && typeof fn === 'function') {
            fn();
          }
        };

        var _gaq = function () {
          var args = Array.prototype.slice.call(arguments);
          if (offlineMode === true) {
            that.offlineQueue.push([_gaq, args]);
            return;
          }
          if (!$window._gaq) {
            $window._gaq = [];
          }
          if (logAllCalls === true) {
            that._log.apply(that, args);
          }
          $window._gaq.push(args);
        };

        var _analyticsJs = function (fn) {
          if (analyticsJS && $window.ga && typeof fn === 'function') {
            fn();
          }
        };

        var _ga = function () {
          var args = Array.prototype.slice.call(arguments);
          if (offlineMode === true) {
            that.offlineQueue.push([_ga, args]);
            return;
          }
          if (typeof $window.ga !== 'function') {
            that._log('warn', 'ga function not set on window');
            return;
          }
          if (logAllCalls === true) {
            that._log.apply(that, args);
          }
          $window.ga.apply(null, args);
        };

        var _gaMultipleTrackers = function (includeFn) {
          // Drop the includeFn from the arguments and preserve the original command name
          var args = Array.prototype.slice.call(arguments, 1),
              commandName = args[0],
              trackers = [];
          if (typeof includeFn === 'function') {
            accounts.forEach(function (account) {
              if (includeFn(account)) {
                trackers.push(account);
              }
            });
          } else {
            // No include function indicates that all accounts are to be used
            trackers = accounts;
          }

          // To preserve backwards compatibility fallback to _ga method if no account
          // matches the specified includeFn. This preserves existing behaviors by
          // performing the single tracker operation.
          if (trackers.length === 0) {
            _ga.apply(that, args);
            return;
          }

          trackers.forEach(function (tracker) {
            // Check tracker 'select' function, if it exists, for whether the tracker should be used with the current command.
            // If the 'select' function returns false then the tracker will not be used with the current command.
            if (isPropertyDefined('select', tracker) && typeof tracker.select === 'function' && !tracker.select(args)) {
              return;
            }
            args[0] = generateCommandName(commandName, tracker);
            _ga.apply(that, args);
          });
        };

        this._log = function () {
          var args = Array.prototype.slice.call(arguments);
          if (args.length > 0) {
            if (args.length > 1) {
              switch (args[0]) {
                case 'debug':
                case 'error':
                case 'info':
                case 'log':
                case 'warn':
                  $log[args[0]](args.slice(1));
                  break;
              }
            }
            that.log.push(args);
          }
        };

        this._createScriptTag = function () {
          if (!accounts || accounts.length < 1) {
            that._log('warn', 'No account id set to create script tag');
            return;
          }
          if (accounts.length > 1) {
            that._log('warn', 'Multiple trackers are not supported with ga.js. Using first tracker only');
            accounts = accounts.slice(0, 1);
          }

          if (created === true) {
            that._log('warn', 'ga.js or analytics.js script tag already created');
            return;
          }

          _gaq('_setAccount', accounts[0].tracker);
          if(domainName) {
            _gaq('_setDomainName', domainName);
          }
          if (enhancedLinkAttribution) {
            _gaq('_require', 'inpage_linkid', '//www.google-analytics.com/plugins/ga/inpage_linkid.js');
          }
          if (trackRoutes && !ignoreFirstPageLoad) {
            if (removeRegExp) {
              _gaq('_trackPageview', getUrl());
            } else {
              _gaq('_trackPageview');
            }
          }

          var scriptSource;
          if (displayFeatures === true) {
            scriptSource = ('https:' === document.location.protocol ? 'https://' : 'http://') + 'stats.g.doubleclick.net/dc.js';
          } else {
            scriptSource = ('https:' === document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
          }

          if (testMode !== true) {
            // If not in test mode inject the Google Analytics tag
            (function () {
              var document = $document[0];
              var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
              ga.src = scriptSource;
              var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
            })();
          } else {
            // Log the source location for validation
            that._log('inject', scriptSource);
          }

          created = true;
          return true;
        };

        this._createAnalyticsScriptTag = function () {
          if (!accounts) {
            that._log('warn', 'No account id set to create analytics script tag');
            return;
          }

          if (created === true) {
            that._log('warn', 'ga.js or analytics.js script tag already created');
            return;
          }

          var protocol = hybridMobileSupport === true ? 'https:' : '';
          var scriptSource = protocol + '//www.google-analytics.com/analytics.js';
          if (testMode !== true) {
            // If not in test mode inject the Google Analytics tag
            (function (i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function (){
              (i[r].q=i[r].q||[]).push(arguments);},i[r].l=1*new Date();a=s.createElement(o),
              m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m);
            })(window,document,'script',scriptSource,'ga');
          } else {
            if (typeof $window.ga !== 'function') {
              // In test mode create a ga function if none exists that is a noop sink.
              $window.ga = function () {};
            }
            // Log script injection.
            that._log('inject', scriptSource);
          }

          accounts.forEach(function (trackerObj) {
            trackerObj.crossDomainLinker = isPropertyDefined('crossDomainLinker', trackerObj) ? trackerObj.crossDomainLinker : crossDomainLinker;
            trackerObj.crossLinkDomains = isPropertyDefined('crossLinkDomains', trackerObj) ? trackerObj.crossLinkDomains : crossLinkDomains;
            trackerObj.displayFeatures = isPropertyDefined('displayFeatures', trackerObj) ? trackerObj.displayFeatures : displayFeatures;
            trackerObj.enhancedLinkAttribution = isPropertyDefined('enhancedLinkAttribution', trackerObj) ? trackerObj.enhancedLinkAttribution : enhancedLinkAttribution;
            trackerObj.set = isPropertyDefined('set', trackerObj) ? trackerObj.set : {};
            trackerObj.trackEcommerce = isPropertyDefined('trackEcommerce', trackerObj) ? trackerObj.trackEcommerce : ecommerce;
            trackerObj.trackEvent = isPropertyDefined('trackEvent', trackerObj) ? trackerObj.trackEvent : false;

            // Logic to choose the account fields to be used.
            // cookieConfig is being deprecated for a tracker specific property: fields.
            var fields = {};
            if (isPropertyDefined('fields', trackerObj)) {
              fields = trackerObj.fields;
            } else if (isPropertyDefined('cookieConfig', trackerObj)) {
              if (angular.isString(trackerObj.cookieConfig)) {
                fields.cookieDomain = trackerObj.cookieConfig;
              } else {
                fields = trackerObj.cookieConfig;
              }
            } else if (angular.isString(cookieConfig)) {
              fields.cookieDomain = cookieConfig;
            } else if (cookieConfig) {
              fields = cookieConfig;
            }
            if (trackerObj.crossDomainLinker === true) {
              fields.allowLinker = true;
            }
            if (isPropertyDefined('name', trackerObj)) {
              fields.name = trackerObj.name;
            }
            trackerObj.fields = fields;

            _ga('create', trackerObj.tracker, trackerObj.fields);

            // Hybrid mobile application support
            // https://developers.google.com/analytics/devguides/collection/analyticsjs/tasks
            if (hybridMobileSupport === true) {
              _ga(generateCommandName('set', trackerObj), 'checkProtocolTask', null);
            }

            // Send all custom set commands from the trackerObj.set property
            for (var key in trackerObj.set) {
              if (trackerObj.set.hasOwnProperty(key)) {
                _ga(generateCommandName('set', trackerObj), key, trackerObj.set[key]);
              }
            }

            if (trackerObj.crossDomainLinker === true) {
              _ga(generateCommandName('require', trackerObj), 'linker');
              if (angular.isDefined(trackerObj.crossLinkDomains)) {
                _ga(generateCommandName('linker:autoLink', trackerObj), trackerObj.crossLinkDomains);
              }
            }

            if (trackerObj.displayFeatures) {
              _ga(generateCommandName('require', trackerObj), 'displayfeatures');
            }

            if (trackerObj.trackEcommerce) {
              if (!enhancedEcommerce) {
                _ga(generateCommandName('require', trackerObj), 'ecommerce');
              } else {
                _ga(generateCommandName('require', trackerObj), 'ec');
                _ga(generateCommandName('set', trackerObj), '&cu', currency);
              }
            }

            if (trackerObj.enhancedLinkAttribution) {
              _ga(generateCommandName('require', trackerObj), 'linkid');
            }

            if (trackRoutes && !ignoreFirstPageLoad) {
              _ga(generateCommandName('send', trackerObj), 'pageview', getUrl());
            }
          });

          if (experimentId) {
            var expScript = document.createElement('script'),
                s = document.getElementsByTagName('script')[0];
            expScript.src = protocol + '//www.google-analytics.com/cx/api.js?experiment=' + experimentId;
            s.parentNode.insertBefore(expScript, s);
          }

          created = true;
          return true;
        };

        this._ecommerceEnabled = function (warn, command) {
          var result = ecommerce && !enhancedEcommerce;
          if (warn === true && result === false) {
            if (ecommerce && enhancedEcommerce) {
              that._log('warn', command + ' is not available when Enhanced Ecommerce is enabled with analytics.js');
            } else {
              that._log('warn', 'Ecommerce must be enabled to use ' + command + ' with analytics.js');
            }
          }
          return result;
        };

        this._enhancedEcommerceEnabled = function (warn, command) {
          var result = ecommerce && enhancedEcommerce;
          if (warn === true && result === false) {
            that._log('warn', 'Enhanced Ecommerce must be enabled to use ' + command + ' with analytics.js');
          }
          return result;
        };

        /**
         * Track page
         https://developers.google.com/analytics/devguides/collection/gajs/
         https://developers.google.com/analytics/devguides/collection/analyticsjs/pages
         * @param url
         * @param title
         * @param custom
         * @private
         */
        this._trackPage = function (url, title, custom) {
          url = url ? url : getUrl();
          title = title ? title : $document[0].title;
          _gaJs(function () {
            // http://stackoverflow.com/questions/7322288/how-can-i-set-a-page-title-with-google-analytics
            _gaq('_set', 'title', title);
            _gaq('_trackPageview', (trackPrefix + url));
          });
          _analyticsJs(function () {
            var opt_fieldObject = {
              'page': trackPrefix + url,
              'title': title
            };
            angular.extend(opt_fieldObject, getUtmParams());
            if (angular.isObject(custom)) {
              angular.extend(opt_fieldObject, custom);
            }
            _gaMultipleTrackers(undefined, 'send', 'pageview', opt_fieldObject);
          });
        };

        /**
         * Track event
         https://developers.google.com/analytics/devguides/collection/gajs/eventTrackerGuide
         https://developers.google.com/analytics/devguides/collection/analyticsjs/events
         * @param category
         * @param action
         * @param label
         * @param value
         * @param noninteraction
         * @param custom
         * @private
         */
        this._trackEvent = function (category, action, label, value, noninteraction, custom) {
          _gaJs(function () {
            _gaq('_trackEvent', category, action, label, value, !!noninteraction);
          });
          _analyticsJs(function () {
            var opt_fieldObject = {};
            var includeFn = function (trackerObj) {
              return isPropertySetTo('trackEvent', trackerObj, true);
            };

            if (angular.isDefined(noninteraction)) {
              opt_fieldObject.nonInteraction = !!noninteraction;
            }
            if (angular.isObject(custom)) {
              angular.extend(opt_fieldObject, custom);
            }
            _gaMultipleTrackers(includeFn, 'send', 'event', category, action, label, value, opt_fieldObject);
          });
        };

        /**
         * Add transaction
         * https://developers.google.com/analytics/devguides/collection/gajs/methods/gaJSApiEcommerce#_gat.GA_Tracker_._addTrans
         * https://developers.google.com/analytics/devguides/collection/analyticsjs/ecommerce#addTrans
         * @param transactionId
         * @param affiliation
         * @param total
         * @param tax
         * @param shipping
         * @param city
         * @param state
         * @param country
         * @private
         */
        this._addTrans = function (transactionId, affiliation, total, tax, shipping, city, state, country, currency) {
          _gaJs(function () {
            _gaq('_addTrans', transactionId, affiliation, total, tax, shipping, city, state, country);
          });
          _analyticsJs(function () {
            if (that._ecommerceEnabled(true, 'addTrans')) {
              var includeFn = function (trackerObj) {
                return isPropertySetTo('trackEcommerce', trackerObj, true);
              };

              _gaMultipleTrackers(
                includeFn,
                'ecommerce:addTransaction',
                {
                  id: transactionId,
                  affiliation: affiliation,
                  revenue: total,
                  tax: tax,
                  shipping: shipping,
                  currency: currency || 'USD'
                });
            }
          });
        };

        /**
         * Add item to transaction
         * https://developers.google.com/analytics/devguides/collection/gajs/methods/gaJSApiEcommerce#_gat.GA_Tracker_._addItem
         * https://developers.google.com/analytics/devguides/collection/analyticsjs/ecommerce#addItem
         * @param transactionId
         * @param sku
         * @param name
         * @param category
         * @param price
         * @param quantity
         * @private
         */
        this._addItem = function (transactionId, sku, name, category, price, quantity) {
          _gaJs(function () {
            _gaq('_addItem', transactionId, sku, name, category, price, quantity);
          });
          _analyticsJs(function () {
            if (that._ecommerceEnabled(true, 'addItem')) {
              var includeFn = function (trackerObj) {
                return isPropertySetTo('trackEcommerce', trackerObj, true);
              };

              _gaMultipleTrackers(
                includeFn,
                'ecommerce:addItem',
                {
                  id: transactionId,
                  name: name,
                  sku: sku,
                  category: category,
                  price: price,
                  quantity: quantity
                });
            }
          });
        };

        /**
         * Track transaction
         * https://developers.google.com/analytics/devguides/collection/gajs/methods/gaJSApiEcommerce#_gat.GA_Tracker_._trackTrans
         * https://developers.google.com/analytics/devguides/collection/analyticsjs/ecommerce#sendingData
         * @private
         */
        this._trackTrans = function () {
          _gaJs(function () {
            _gaq('_trackTrans');
          });
          _analyticsJs(function () {
            if (that._ecommerceEnabled(true, 'trackTrans')) {
              var includeFn = function (trackerObj) {
                return isPropertySetTo('trackEcommerce', trackerObj, true);
              };

              _gaMultipleTrackers(includeFn, 'ecommerce:send');
            }
          });
        };

        /**
         * Clear transaction
         * https://developers.google.com/analytics/devguides/collection/analyticsjs/ecommerce#clearingData
         * @private
         */
        this._clearTrans = function () {
          _analyticsJs(function () {
            if (that._ecommerceEnabled(true, 'clearTrans')) {
              var includeFn = function (trackerObj) {
                return isPropertySetTo('trackEcommerce', trackerObj, true);
              };

              _gaMultipleTrackers(includeFn, 'ecommerce:clear');
            }
          });
        };

        /**
         * Enhanced Ecommerce
         */

        /**
         * Add Product
         * https://developers.google.com/analytics/devguides/collection/analyticsjs/enhanced-ecommerce#product-data
         * @param productId
         * @param name
         * @param category
         * @param brand
         * @param variant
         * @param price
         * @param quantity
         * @param coupon
         * @param position
         * @param custom
         * @private
         */
        this._addProduct = function (productId, name, category, brand, variant, price, quantity, coupon, position, custom) {
          _gaJs(function () {
            _gaq('_addProduct', productId, name, category, brand, variant, price, quantity, coupon, position);
          });
          _analyticsJs(function () {
            if (that._enhancedEcommerceEnabled(true, 'addProduct')) {
              var includeFn = function (trackerObj) {
                return isPropertySetTo('trackEcommerce', trackerObj, true);
              };
              var details = {
                id: productId,
                name: name,
                category: category,
                brand: brand,
                variant: variant,
                price: price,
                quantity: quantity,
                coupon: coupon,
                position: position
              };
              if (angular.isObject(custom)) {
                angular.extend(details, custom);
              }
              _gaMultipleTrackers(includeFn, 'ec:addProduct', details);
            }
          });
        };

        /**
         * Add Impression
         * https://developers.google.com/analytics/devguides/collection/analyticsjs/enhanced-ecommerce#impression-data
         * @param id
         * @param name
         * @param list
         * @param brand
         * @param category
         * @param variant
         * @param position
         * @param price
         * @private
         */
        this._addImpression = function (id, name, list, brand, category, variant, position, price){
          _gaJs(function () {
            _gaq('_addImpression', id, name, list, brand, category, variant, position, price);
          });
          _analyticsJs(function () {
            if (that._enhancedEcommerceEnabled(true, 'addImpression')) {
              var includeFn = function (trackerObj) {
                return isPropertySetTo('trackEcommerce', trackerObj, true);
              };

              _gaMultipleTrackers(
                includeFn,
                'ec:addImpression',
                {
                  id: id,
                  name: name,
                  category: category,
                  brand: brand,
                  variant: variant,
                  list: list,
                  position: position,
                  price: price
                });
            }
          });
        };

        /**
         * Add Promo
         * https://developers.google.com/analytics/devguides/collection/analyticsjs/enhanced-ecommerce
         * @param productId
         * @param name
         * @param creative
         * @param position
         * @private
         */
        this._addPromo = function (productId, name, creative, position) {
          _gaJs(function () {
            _gaq('_addPromo', productId, name, creative, position);
          });
          _analyticsJs(function () {
            if (that._enhancedEcommerceEnabled(true, 'addPromo')) {
              var includeFn = function (trackerObj) {
                return isPropertySetTo('trackEcommerce', trackerObj, true);
              };

              _gaMultipleTrackers(
                includeFn,
                'ec:addPromo',
                {
                  id: productId,
                  name: name,
                  creative: creative,
                  position: position
                });
            }
          });
        };

        /**
         * Set Action
         * https://developers.google.com/analytics/devguides/collection/analyticsjs/enhanced-ecommerce#measuring-actions
         * https://developers.google.com/analytics/devguides/collection/analyticsjs/enhanced-ecommerce#action-types
         * @param action
         * @param obj
         * @private
         */
        this._setAction = function (action, obj){
          _gaJs(function () {
            _gaq('_setAction', action, obj);
          });
          _analyticsJs(function () {
            if (that._enhancedEcommerceEnabled(true, 'setAction')) {
              var includeFn = function (trackerObj) {
                return isPropertySetTo('trackEcommerce', trackerObj, true);
              };

              _gaMultipleTrackers(includeFn, 'ec:setAction', action, obj);
            }
          });
        };

        /**
         * Track Transaction
         * https://developers.google.com/analytics/devguides/collection/analyticsjs/enhanced-ecommerce#measuring-transactions
         * @param transactionId
         * @param affiliation
         * @param revenue
         * @param tax
         * @param shipping
         * @param coupon
         * @param list
         * @param step
         * @param option
         * @private
         */
        this._trackTransaction = function (transactionId, affiliation, revenue, tax, shipping, coupon, list, step, option) {
          this._setAction('purchase', getActionFieldObject(transactionId, affiliation, revenue, tax, shipping, coupon, list, step, option));
        };

        /**
         * Track Refund
         * https://developers.google.com/analytics/devguides/collection/analyticsjs/enhanced-ecommerce#measuring-refunds
         * @param transactionId
         * @private
         */
        this._trackRefund = function (transactionId) {
          this._setAction('refund', getActionFieldObject(transactionId));
        };

        /**
         * Track Checkout
         * https://developers.google.com/analytics/devguides/collection/analyticsjs/enhanced-ecommerce#measuring-checkout
         * @param step
         * @param option
         * @private
         */
        this._trackCheckOut = function (step, option) {
          this._setAction('checkout', getActionFieldObject(null, null, null, null, null, null, null, step, option));
        };

        /**
         * Track detail
         * @private
         */
        this._trackDetail = function () {
          this._setAction('detail');
          this._pageView();
        };

        /**
         * Track add/remove to cart
         * https://developers.google.com/analytics/devguides/collection/analyticsjs/enhanced-ecommerce#add-remove-cart
         * @param action
         * @private
         */
        this._trackCart = function (action) {
          if (['add', 'remove'].indexOf(action) !== -1) {
            this._setAction(action);
            this._trackEvent('UX', 'click', action + (action === 'add' ? ' to cart' : ' from cart'));
          }
        };

        /**
         * Track promo click
         * https://developers.google.com/analytics/devguides/collection/analyticsjs/enhanced-ecommerce#measuring-promo-clicks
         * @param promotionName
         * @private
         */
        this._promoClick = function (promotionName) {
          this._setAction('promo_click');
          this._trackEvent('Internal Promotions', 'click', promotionName);
        };

        /**
         * Track product click
         * https://developers.google.com/analytics/devguides/collection/analyticsjs/enhanced-ecommerce#measuring-promo-clicks
         * @param promotionName
         * @private
         */
        this._productClick = function (listName) {
          this._setAction('click', getActionFieldObject(null, null, null, null, null, null, listName, null, null));
          this._trackEvent('UX', 'click', listName);
        };

        /**
         * Send page view
         * @param trackerName
         * @private
         */
        this._pageView = function (trackerName) {
          _analyticsJs(function () {
            _ga(generateCommandName('send', trackerName), 'pageview');
          });
        };

        /**
         * Send custom events
         * https://developers.google.com/analytics/devguides/collection/analyticsjs/user-timings#implementation
         * https://developers.google.com/analytics/devguides/collection/analyticsjs/social-interactions#implementation
         * @private
         */
        this._send = function () {
          var args = Array.prototype.slice.call(arguments);
          args.unshift('send');
          _analyticsJs(function () {
            _ga.apply(that, args);
          });
        };

        /**
         * Set custom dimensions, metrics or experiment
         * https://developers.google.com/analytics/devguides/collection/analyticsjs/custom-dims-mets
         * https://developers.google.com/analytics/devguides/collection/analyticsjs/field-reference#customs
         * @param name (Required)
         * @param value (Required)
         * @param trackerName (Not Required)
         * @private
         */
        this._set = function (name, value, trackerName) {
          _analyticsJs(function () {
            _ga(generateCommandName('set', trackerName), name, value);
          });
        };

        /**
         * Track user timings
         * @param timingCategory (Required): A string for categorizing all user timing variables into logical groups(e.g jQuery).
         * @param timingVar (Required): A string to identify the variable being recorded(e.g. JavaScript Load).
         * @param timingValue (Required): The number of milliseconds in elapsed time to report to Google Analytics(e.g. 20).
         * @param timingLabel (Not Required): A string that can be used to add flexibility in visualizing user timings in the reports(e.g. Google CDN).
         * @private
         */
        this._trackTimings = function (timingCategory, timingVar, timingValue, timingLabel) {
          this._send('timing', timingCategory, timingVar, timingValue, timingLabel);
        };

        // creates the Google Analytics tracker
        if (!delayScriptTag) {
          if (analyticsJS) {
            this._createAnalyticsScriptTag();
          } else {
            this._createScriptTag();
          }
        }

        // activates page tracking
        if (trackRoutes) {
          $rootScope.$on(pageEvent, function () {
            that._trackPage();
          });
        }

        return {
          log: that.log,
          offlineQueue: that.offlineQueue,
          configuration: {
            accounts: accounts,
            universalAnalytics: analyticsJS,
            crossDomainLinker: crossDomainLinker,
            crossLinkDomains: crossLinkDomains,
            currency: currency,
            delayScriptTag: delayScriptTag,
            displayFeatures: displayFeatures,
            domainName: domainName,
            ecommerce: that._ecommerceEnabled(),
            enhancedEcommerce: that._enhancedEcommerceEnabled(),
            enhancedLinkAttribution: enhancedLinkAttribution,
            experimentId: experimentId,
            hybridMobileSupport: hybridMobileSupport,
            ignoreFirstPageLoad: ignoreFirstPageLoad,
            logAllCalls: logAllCalls,
            pageEvent: pageEvent,
            removeRegExp: removeRegExp,
            testMode: testMode,
            trackPrefix: trackPrefix,
            trackRoutes: trackRoutes,
            trackUrlParams: trackUrlParams
          },
          getUrl: getUrl,
          /* DEPRECATED */
          setCookieConfig: that._setCookieConfig,
          /* DEPRECATED */
          getCookieConfig: function () {
            return cookieConfig;
          },
          createAnalyticsScriptTag: function (config) {
            if (config) {
              cookieConfig = config;
            }
            return that._createAnalyticsScriptTag();
          },
          createScriptTag: function () {
            return that._createScriptTag();
          },
          offline: function (mode) {
            if (mode === true && offlineMode === false) {
              // Go to offline mode
              offlineMode = true;
            }
            if (mode === false && offlineMode === true) {
              // Go to online mode and process the offline queue
              offlineMode = false;
              while (that.offlineQueue.length > 0) {
                var obj = that.offlineQueue.shift();
                obj[0].apply(that, obj[1]);
              }
            }
            return offlineMode;
          },
          trackPage: function (url, title, custom) {
            that._trackPage.apply(that, arguments);
          },
          trackEvent: function (category, action, label, value, noninteraction, custom) {
            that._trackEvent.apply(that, arguments);
          },
          addTrans: function (transactionId, affiliation, total, tax, shipping, city, state, country, currency) {
            that._addTrans.apply(that, arguments);
          },
          addItem: function (transactionId, sku, name, category, price, quantity) {
            that._addItem.apply(that, arguments);
          },
          trackTrans: function () {
            that._trackTrans.apply(that, arguments);
          },
          clearTrans: function () {
            that._clearTrans.apply(that, arguments);
          },
          addProduct: function (productId, name, category, brand, variant, price, quantity, coupon, position, custom) {
            that._addProduct.apply(that, arguments);
          },
          addPromo: function (productId, name, creative, position) {
            that._addPromo.apply(that, arguments);
          },
          addImpression: function (productId, name, list, brand, category, variant, position, price) {
            that._addImpression.apply(that, arguments);
          },
          productClick: function (listName) {
            that._productClick.apply(that, arguments);
          },
          promoClick : function (promotionName) {
            that._promoClick.apply(that, arguments);
          },
          trackDetail: function () {
            that._trackDetail.apply(that, arguments);
          },
          trackCart: function (action) {
            that._trackCart.apply(that, arguments);
          },
          trackCheckout: function (step, option) {
            that._trackCheckOut.apply(that, arguments);
          },
          trackTimings: function (timingCategory, timingVar, timingValue, timingLabel) {
            that._trackTimings.apply(that, arguments);
          },
          trackTransaction: function (transactionId, affiliation, revenue, tax, shipping, coupon, list, step, option){
            that._trackTransaction.apply(that, arguments);
          },
          setAction: function (action, obj) {
            that._setAction.apply(that, arguments);
          },
          pageView: function () {
            that._pageView.apply(that, arguments);
          },
          send: function (obj) {
            that._send.apply(that, arguments);
          },
          set: function (name, value, trackerName) {
            that._set.apply(that, arguments);
          }
        };
      }];
    })

    .directive('gaTrackEvent', ['Analytics', '$parse', function (Analytics, $parse) {
      return {
        restrict: 'A',
        link: function (scope, element, attrs) {
          var options = $parse(attrs.gaTrackEvent);
          element.bind('click', function () {
            if(attrs.gaTrackEventIf){
              if(!scope.$eval(attrs.gaTrackEventIf)){
                return; // Cancel this event if we don't pass the ga-track-event-if condition
              }
            }
            if (options.length > 1) {
              Analytics.trackEvent.apply(Analytics, options(scope));
            }
          });
        }
      };
    }]);
  })(window, document, window.angular);
