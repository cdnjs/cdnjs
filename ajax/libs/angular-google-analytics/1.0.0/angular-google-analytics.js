/**
 * Angular Google Analytics - Easy tracking for your AngularJS application
 * @version v1.0.0 - 2015-08-26
 * @link http://github.com/revolunet/angular-google-analytics
 * @author Julien Bouquillon <julien@revolunet.com>
 * @license MIT License, http://www.opensource.org/licenses/MIT
 */
(function (window, document, angular, undefined) {
  'use strict';
  angular.module('angular-google-analytics', [])
    .provider('Analytics', function () {
      var created = false,
          trackRoutes = true,
          accounts,
          displayFeatures,
          trackPrefix = '',
          domainName,
          analyticsJS = false,
          pageEvent = '$routeChangeSuccess',
          cookieConfig = 'auto',
          ecommerce = false,
          enhancedEcommerce = false,
          enhancedLinkAttribution = false,
          currency = 'USD',
          removeRegExp,
          experimentId,
          ignoreFirstPageLoad = false,
          crossDomainLinker = false,
          crossLinkDomains,
          trackUrlParams = false,
          delayScriptTag = false,
          logAllCalls = false;

      this._logs = [];

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
        return true;
      };

      this.trackPages = function (doTrack) {
        trackRoutes = doTrack;
        return true;
      };

      this.trackPrefix = function (prefix) {
        trackPrefix = prefix;
        return true;
      };

      this.setDomainName = function (domain) {
        domainName = domain;
        return true;
      };

      this.useDisplayFeatures = function (val) {
        displayFeatures = !!val;
        return true;
      };

      this.useAnalytics = function (val) {
        analyticsJS = !!val;
        return true;
      };

      this.useEnhancedLinkAttribution = function (val) {
        enhancedLinkAttribution = !!val;
        return true;
      };

      this.useCrossDomainLinker = function (val) {
        crossDomainLinker = !!val;
        return true;
      };

      this.setCrossLinkDomains = function (domains) {
        crossLinkDomains = domains;
        return true;
      };

      this.setPageEvent = function (name) {
        pageEvent = name;
        return true;
      };

      this.setCookieConfig = function (config) {
        cookieConfig = config;
        return true;
      };

      this.useECommerce = function (val, enhanced) {
        ecommerce = !!val;
        enhancedEcommerce = !!enhanced;
        return true;
      };

      this.setCurrency = function (currencyCode) {
        currency = currencyCode;
        return true;
      };

      this.setRemoveRegExp = function (regex) {
        if (regex instanceof RegExp) {
          removeRegExp = regex;
          return true;
        }
        return false;
      };

      this.setExperimentId = function (id) {
        experimentId = id;
        return true;
      };

      this.ignoreFirstPageLoad = function (val) {
        ignoreFirstPageLoad = !!val;
        return true;
      };

      this.trackUrlParams = function (val) {
        trackUrlParams = !!val;
        return true;
      };

      this.delayScriptTag = function (val) {
        delayScriptTag = !!val;
        return true;
      };

      this.logAllCalls = function (val) {
        logAllCalls = !!val;
        return true;
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
          return isPropertyDefined('name', config) ? (config.name + '.' + commandName) : commandName;
        };

        var isPropertyDefined = function (key, config) {
          return angular.isObject(config) && angular.isDefined(config[key]);
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
         * Private Methods
         */

        var _gaJs = function (fn) {
          if (!analyticsJS && $window._gaq && typeof fn === 'function') {
            fn();
          }
        };

        var _gaq = function () {
          if (!$window._gaq) {
            $window._gaq = [];
          }
          if (logAllCalls === true) {
            that._log.apply(that, arguments);
          }
          $window._gaq.push.apply($window._gaq, arguments);
        };

        var _analyticsJs = function (fn) {
          if (analyticsJS && $window.ga && typeof fn === 'function') {
            fn();
          }
        };

        var _ga = function () {
          if (typeof $window.ga !== 'function') {
            that._log('warn', 'ga function not set on window');
            return;
          }
          if (logAllCalls === true) {
            that._log.apply(that, arguments);
          }
          $window.ga.apply(null, arguments);
        };

        var _gaMultipleTrackers = function (includeFn) {
          if (typeof $window.ga !== 'function') {
            that._log('warn', 'ga function not set on window');
            return;
          }

          // Drop the includeFn from the arguments and preserve the original command name
          var args = Array.prototype.slice.call(arguments, 1),
              commandName = args[0];

          accounts.forEach(function (trackerObj) {
            if (typeof includeFn === 'function' && !includeFn(trackerObj)) {
              return;
            }
            args[0] = generateCommandName(commandName, trackerObj);
            if (logAllCalls === true) {
              that._log.apply(that, args);
            }
            $window.ga.apply(null, args);                
          });
        };

        this._log = function () {
          if (arguments.length > 0) {
            if (arguments.length > 1) {
              switch (arguments[0]) {
                case 'warn':
                  $log.warn(Array.prototype.slice.call(arguments, 1));
                  break;
                case 'error':
                  $log.error(Array.prototype.slice.call(arguments, 1));
                  break;
              }
            }
            this._logs.push(Array.prototype.slice.call(arguments));
          }
        };

        this._createScriptTag = function () {
          if (!accounts || accounts.length < 1) {
            this._log('warn', 'No account id set to create script tag');
            return;
          }
          if (accounts.length > 1) {
            this._log('warn', 'Multiple trackers are not supported with ga.js. Using first tracker only');
            accounts = accounts.slice(0, 1);
          }

          if (created === true) {
            this._log('warn', 'ga.js or analytics.js script tag already created');
            return;
          }

          // inject the Google Analytics tag
          _gaq(['_setAccount', accounts[0].tracker]);
          if(domainName) {
            _gaq(['_setDomainName', domainName]);
          }
          if (enhancedLinkAttribution) {
            _gaq(['_require', 'inpage_linkid', '//www.google-analytics.com/plugins/ga/inpage_linkid.js']);
          }
          if (trackRoutes && !ignoreFirstPageLoad) {
            if (removeRegExp) {
              _gaq(['_trackPageview', getUrl()]);
            } else {
              _gaq(['_trackPageview']);
            }
          }
          var gaSrc;
          if (displayFeatures) {
            gaSrc = ('https:' === document.location.protocol ? 'https://' : 'http://') + 'stats.g.doubleclick.net/dc.js';
          } else {
            gaSrc = ('https:' === document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
          }
          (function () {
            var document = $document[0];
            var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
            ga.src = gaSrc;
            var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
          })(gaSrc);

          created = true;
          return true;
        };

        this._createAnalyticsScriptTag = function () {
          if (!accounts) {
            this._log('warn', 'No account id set to create analytics script tag');
            return;
          }

          if (created === true) {
            this._log('warn', 'ga.js or analytics.js script tag already created');
            return;
          }

          // inject the Google Analytics tag
          (function (i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function (){
            (i[r].q=i[r].q||[]).push(arguments);},i[r].l=1*new Date();a=s.createElement(o),
            m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m);
          })(window,document,'script','//www.google-analytics.com/analytics.js','ga');

          accounts.forEach(function (trackerObj) {
            var options = {};
            trackerObj.crossDomainLinker = isPropertyDefined('crossDomainLinker', trackerObj) ? trackerObj.crossDomainLinker : crossDomainLinker;
            trackerObj.cookieConfig = isPropertyDefined('cookieConfig', trackerObj) ? trackerObj.cookieConfig : cookieConfig;
            trackerObj.crossLinkDomains = isPropertyDefined('crossLinkDomains', trackerObj) ? trackerObj.crossLinkDomains : crossLinkDomains;
            trackerObj.trackEvent = isPropertyDefined('trackEvent', trackerObj) ? trackerObj.trackEvent : false;

            options.allowLinker = trackerObj.crossDomainLinker;
            if (isPropertyDefined('name', trackerObj)) {
              options.name = trackerObj.name;
            }

            _ga('create', trackerObj.tracker, trackerObj.cookieConfig, options);

            if (trackerObj.crossDomainLinker === true) {
              _ga(generateCommandName('require', trackerObj), 'linker');
              if (angular.isDefined(trackerObj.crossLinkDomains)) {
                _ga(generateCommandName('linker:autoLink', trackerObj), trackerObj.crossLinkDomains);
              }
            }
          });

          if (displayFeatures) {
            _ga('require', 'displayfeatures');
          }

          if (trackRoutes && !ignoreFirstPageLoad) {
            _ga('send', 'pageview', getUrl());
          }

          if (ecommerce) {
            if (!enhancedEcommerce) {
              _ga('require', 'ecommerce', 'ecommerce.js');
            } else {
              _ga('require', 'ec', 'ec.js');
              _ga('set', '&cu', currency);
            }
          }

          if (enhancedLinkAttribution) {
            _ga('require', 'linkid', 'linkid.js');
          }

          if (experimentId) {
            var expScript = document.createElement('script'),
              s = document.getElementsByTagName('script')[0];
            expScript.src = "//www.google-analytics.com/cx/api.js?experiment=" + experimentId;
            s.parentNode.insertBefore(expScript, s);
          }

          created = true;
          return true;
        };

        this._ecommerceEnabled = function () {
          return ecommerce && !enhancedEcommerce;
        };

        this._enhancedEcommerceEnabled = function () {
          return ecommerce && enhancedEcommerce;
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
            _gaq(["_set", "title", title]);
            _gaq(['_trackPageview', trackPrefix + url]);
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
            _gaq(['_trackEvent', category, action, label, value, !!noninteraction]);
          });
          _analyticsJs(function () {
            var opt_fieldObject = {};
            var includeFn = function (trackerObj) {
              return isPropertyDefined('trackEvent', trackerObj) && trackerObj.trackEvent === true;
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
            _gaq(['_addTrans', transactionId, affiliation, total, tax, shipping, city, state, country]);
          });
          _analyticsJs(function () {
            if (that._ecommerceEnabled()) {
              _ga('ecommerce:addTransaction', {
                id: transactionId,
                affiliation: affiliation,
                revenue: total,
                tax: tax,
                shipping: shipping,
                currency: currency || 'USD'
              });
            } else {
              that._log('warn', 'Ecommerce must be enabled to use addTrans with analytics.js');
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
            _gaq(['_addItem', transactionId, sku, name, category, price, quantity]);
          });
          _analyticsJs(function () {
            if (that._ecommerceEnabled()) {
              _ga('ecommerce:addItem', {
                id: transactionId,
                name: name,
                sku: sku,
                category: category,
                price: price,
                quantity: quantity
              });
            } else {
              that._log('warn', 'Ecommerce must be enabled to use addItem with analytics.js');
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
            _gaq(['_trackTrans']);
          });
          _analyticsJs(function () {
            if (that._ecommerceEnabled()) {
              _ga('ecommerce:send');
            } else {
              that._log('warn', 'Ecommerce must be enabled to use trackTrans with analytics.js');
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
            if (that._ecommerceEnabled()) {
              _ga('ecommerce:clear');
            } else {
              that._log('warn', 'Ecommerce must be enabled to use clearTrans with analytics.js');
            }
          });
        };

        /**
         * Enhanced Ecommerce
         */

        /**
         * Add product data
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
         */
        this._addProduct = function (productId, name, category, brand, variant, price, quantity, coupon, position) {
          _gaJs(function () {
            _gaq(['_addProduct', productId, name, category, brand, variant, price, quantity, coupon, position]);
          });
          _analyticsJs(function () {
            if (that._enhancedEcommerceEnabled()) {
              _ga('ec:addProduct', {
                id: productId,
                name: name,
                category: category,
                brand: brand,
                variant: variant,
                price: price,
                quantity: quantity,
                coupon: coupon,
                position: position
              });
            } else {
              that._log('warn', 'Enhanced ecommerce must be enabled to use addProduct with analytics.js');
            }
          });
        };

        /**
         * Add Impression data
         * https://developers.google.com/analytics/devguides/collection/analyticsjs/enhanced-ecommerce#impression-data
         * @param id
         * @param name
         * @param list
         * @param brand
         * @param category
         * @param variant
         * @param position
         * @param price
         */
        this._addImpression = function (id, name, list, brand, category, variant, position, price){
          _gaJs(function () {
            _gaq(['_addImpression', id, name, list, brand, category, variant, position, price]);
          });
          _analyticsJs(function () {
            if (that._enhancedEcommerceEnabled()) {
              _ga('ec:addImpression', {
                id: id,
                name: name,
                category: category,
                brand: brand,
                variant: variant,
                list: list,
                position: position,
                price: price
              });
            } else {
              that._log('warn', 'Enhanced ecommerce must be enabled to use addImpression with analytics.js');
            }
          });
        };

        /**
         * Add promo data
         * https://developers.google.com/analytics/devguides/collection/analyticsjs/enhanced-ecommerce
         * @param productId
         * @param name
         * @param creative
         * @param position
         */
        this._addPromo = function (productId, name, creative, position) {
          _gaJs(function () {
            _gaq(['_addPromo', productId, name, creative, position]);
          });
          _analyticsJs(function () {
            if (that._enhancedEcommerceEnabled()) {
              _ga('ec:addPromo', {
                id: productId,
                name: name,
                creative: creative,
                position: position
              });
            } else {
              that._log('warn', 'Enhanced ecommerce must be enabled to use addPromo with analytics.js');
            }
          });
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
        this._getActionFieldObject = function (id, affiliation, revenue, tax, shipping, coupon, list, step, option) {
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
         * Set Action being performed
         * https://developers.google.com/analytics/devguides/collection/analyticsjs/enhanced-ecommerce#measuring-actions
         * https://developers.google.com/analytics/devguides/collection/analyticsjs/enhanced-ecommerce#action-types
         * @param action
         * @param name
         * @param obj
         */
        this._setAction = function (action, obj){
          _gaJs(function () {
            _gaq(['_setAction', action, obj]);
          });
          _analyticsJs(function () {
            if (that._enhancedEcommerceEnabled()) {
              _ga('ec:setAction', action, obj);
            } else {
              that._log('warn', 'Enhanced ecommerce must be enabled to use setAction with analytics.js');
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
         */
        this._trackTransaction = function (transactionId, affiliation, revenue, tax, shipping, coupon, list, step, option) {
          this._setAction('purchase', this._getActionFieldObject(transactionId, affiliation, revenue, tax, shipping, coupon, list, step, option));
        };

        /**
         * Track Refund
         * https://developers.google.com/analytics/devguides/collection/analyticsjs/enhanced-ecommerce#measuring-refunds
         * @param transactionId
         *
         */
        this._trackRefund = function (transactionId) {
          this._setAction('refund', this._getActionFieldObject(transactionId));
        };

        /**
         * Track Checkout
         * https://developers.google.com/analytics/devguides/collection/analyticsjs/enhanced-ecommerce#measuring-checkout
         * @param step
         * @param option
         *
         */
        this._trackCheckOut = function (step, option) {
          this._setAction('checkout', this._getActionFieldObject(null, null, null, null, null, null, null, step, option));
        };

        /**
         * Track add/remove to cart
         * https://developers.google.com/analytics/devguides/collection/analyticsjs/enhanced-ecommerce#add-remove-cart
         * @param action
         *
         */
        this._trackCart = function (action) {
          if (['add', 'remove'].indexOf(action) !== -1) {
            this._setAction(action);
            this._send('event', 'UX', 'click', action + ' to cart');
          }
        };

        /**
         * Track promo click
         * https://developers.google.com/analytics/devguides/collection/analyticsjs/enhanced-ecommerce#measuring-promo-clicks
         * @param promotionName
         *
         */
        this._promoClick = function (promotionName) {
          this._setAction('promo_click');
          this._send('event', 'Internal Promotions', 'click', promotionName);
        };

        /**
         * Track product click
         * https://developers.google.com/analytics/devguides/collection/analyticsjs/enhanced-ecommerce#measuring-promo-clicks
         * @param promotionName
         *
         */
        this._productClick = function (listName) {
          this._setAction('click', this._getActionFieldObject(null, null, null, null, null, null, listName, null, null));
          this._send('event', 'UX', 'click', listName);
        };

        /**
         * Send custom events
         * https://developers.google.com/analytics/devguides/collection/analyticsjs/user-timings#implementation
         * https://developers.google.com/analytics/devguides/collection/analyticsjs/social-interactions#implementation
         *
         * @param obj
         * @private
         */
        this._send = function () {
          var args = Array.prototype.slice.call(arguments);
          args.unshift('send');
          _analyticsJs(function () {
            _ga.apply(that, args);
          });
        };

        this._pageView = function () {
          this._send('pageview');
        };

        /**
         * Set custom dimensions, metrics or experiment
         * https://developers.google.com/analytics/devguides/collection/analyticsjs/custom-dims-mets
         * https://developers.google.com/analytics/devguides/collection/analyticsjs/field-reference#customs
         * @param name
         * @param value
         * @private
         */
        this._set = function (name, value) {
          _analyticsJs(function () {
            _ga('set', name, value);
          });
        };

        /**
         * Track User Timings
         * @timingCategory (Required): A string for categorizing all user timing variables into logical groups(e.g jQuery).
         * @timingVar (Required): A string to identify the variable being recorded(e.g. JavaScript Load).
         * @timingValue (Required): The number of milliseconds in elapsed time to report to Google Analytics(e.g. 20).
         * @timingLabel (Not Required): A string that can be used to add flexibility in visualizing user timings in the reports(e.g. Google CDN).
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
          _logs: that._logs,
          displayFeatures: displayFeatures,
          ecommerce: ecommerce,
          enhancedEcommerce: enhancedEcommerce,
          enhancedLinkAttribution: enhancedLinkAttribution,
          getUrl: getUrl,
          experimentId: experimentId,
          ignoreFirstPageLoad: ignoreFirstPageLoad,
          delayScriptTag: delayScriptTag,
          setCookieConfig: that._setCookieConfig,
          getCookieConfig: function () {
            return cookieConfig;
          },
          createAnalyticsScriptTag: function (config) {
            if (config) {
              cookieConfig = config;
            }

            return that._createAnalyticsScriptTag();
          },
          createScriptTag: function (config) {
            if (config) {
              cookieConfig = config;
            }

            return that._createScriptTag();
          },
          ecommerceEnabled: function () {
            return that._ecommerceEnabled();
          },
          enhancedEcommerceEnabled: function () {
            return that._enhancedEcommerceEnabled();
          },
          trackPage: function (url, title, custom) {
            that._trackPage(url, title, custom);
          },
          trackEvent: function (category, action, label, value, noninteraction, custom) {
            that._trackEvent(category, action, label, value, noninteraction, custom);
          },
          addTrans: function (transactionId, affiliation, total, tax, shipping, city, state, country, currency) {
            that._addTrans(transactionId, affiliation, total, tax, shipping, city, state, country, currency);
          },
          addItem: function (transactionId, sku, name, category, price, quantity) {
            that._addItem(transactionId, sku, name, category, price, quantity);
          },
          trackTrans: function () {
            that._trackTrans();
          },
          clearTrans: function () {
            that._clearTrans();
          },
          addProduct: function (productId, name, category, brand, variant, price, quantity, coupon, position) {
            that._addProduct(productId, name, category, brand, variant, price, quantity, coupon, position);
          },
          addPromo: function (productId, name, creative, position) {
            that._addPromo(productId, name, creative, position);
          },
          addImpression: function (productId, name, list, brand, category, variant, position, price) {
            that._addImpression(productId, name, list, brand, category, variant, position, price);
          },
          productClick: function (listName) {
            that._productClick(listName);
          },
          promoClick : function (promotionName) {
            that._promoClick(promotionName);
          },
          trackDetail: function () {
            that._setAction('detail');
            that._pageView();
          },
          trackCart: function (action) {
            that._trackCart(action);
          },
          trackCheckout: function (step, option) {
            that._trackCheckOut(step, option);
          },
          trackTimings: function (timingCategory, timingVar, timingValue, timingLabel) {
            that._trackTimings(timingCategory, timingVar, timingValue, timingLabel);
          },
          trackTransaction: function (transactionId, affiliation, revenue, tax, shipping, coupon, list, step, option){
            that._trackTransaction(transactionId, affiliation, revenue, tax, shipping, coupon, list, step, option);
          },
          setAction: function (action, obj) {
            that._setAction(action, obj);
          },
          send: function (obj) {
            that._send(obj);
          },
          pageView: function () {
            that._pageView();
          },
          set: function (name, value) {
            that._set(name, value);
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
