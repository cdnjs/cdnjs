/**
 * Angular Google Analytics - Easy tracking for your AngularJS application
 * @version v0.0.12 - 2015-03-17
 * @link http://github.com/revolunet/angular-google-analytics
 * @author Julien Bouquillon <julien@revolunet.com>
 * @license MIT License, http://www.opensource.org/licenses/MIT
 */
'use strict';

angular.module('angular-google-analytics', [])
  .provider('Analytics', function () {
    var created = false,
        trackRoutes = true,
        accountId,
        displayFeatures,
        trackPrefix = '',
        domainName,
        analyticsJS = false,
        pageEvent = '$routeChangeSuccess',
        cookieConfig = 'auto',
        ecommerce = false,
        enhancedEcommerce = false,
        enhancedLinkAttribution = false,
        removeRegExp,
        experimentId,
        ignoreFirstPageLoad = false,
        crossDomainLinker = false,
        crossLinkDomains,
        linkerConfig = {'allowLinker': true},
        trackUrlParams = false,
        delayScriptTag = false;

    this._logs = [];

    // config methods
    this.setAccount = function (id) {
      accountId = id;
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

    /**
     * Public Service
     */
    this.$get = ['$document', '$location', '$log', '$rootScope', '$window', function ($document, $location, $log, $rootScope, $window) {
      var me = this;

      var getUrl = function () {
        var url = trackUrlParams ? $location.url() : $location.path();
        return removeRegExp ? url.replace(removeRegExp, '') : url;
      };

      /**
       * Private Methods
       */

      function _gaJs(fn) {
        if (!analyticsJS && $window._gaq && typeof fn === 'function') {
          fn();
        }
      }

      function _analyticsJs(fn) {
        if (analyticsJS && $window.ga && typeof fn === 'function') {
          fn();
        }
      }

      function _generateCommandName(commandName, config) {
        if (!angular.isUndefined(config) && 'name' in config && config.name) {
          return config.name + '.' + commandName;
        } else {
          return commandName;
        }
      }

      function _checkOption(key, config) {
        return key in config && config[key];
      }

      this._log = function () {
        if (arguments.length > 0) {
          if (arguments.length > 1 && arguments[0] === 'warn') {
            $log.warn(Array.prototype.slice.call(arguments, 1));
          }
          // console.log('analytics', arguments);
          this._logs.push(arguments);
        }
      };

      this._createScriptTag = function () {
        if (!accountId) {
          me._log('warn', 'No account id set to create script tag');
          return;
        }

        if (created) {
          me._log('warn', 'Script tag already created');
          return;
        }

        // inject the google analytics tag
        $window._gaq = [];
        $window._gaq.push(['_setAccount', accountId]);
        if(domainName) {
          $window._gaq.push(['_setDomainName', domainName]);
        }
        if (enhancedLinkAttribution) {
          $window._gaq.push(['_require', 'inpage_linkid', '//www.google-analytics.com/plugins/ga/inpage_linkid.js']);
        }
        if (trackRoutes && !ignoreFirstPageLoad) {
          if (removeRegExp) {
            $window._gaq.push(['_trackPageview', getUrl()]);
          } else {
            $window._gaq.push(['_trackPageview']);
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
        
        return created = true;
      };

      this._createAnalyticsScriptTag = function () {
        if (!accountId) {
          me._log('warn', 'No account id set to create analytics script tag');
          return;
        }

        if (created) {
          me._log('warn', 'Analytics script tag already created');
          return;
        }

        // inject the google analytics tag
        (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
          (i[r].q=i[r].q||[]).push(arguments);},i[r].l=1*new Date();a=s.createElement(o),
          m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m);
        })(window,document,'script','//www.google-analytics.com/analytics.js','ga');

        if (angular.isArray(accountId)) {
          accountId.forEach(function (trackerObj) {
            var _cookieConfig = 'cookieConfig' in trackerObj ? trackerObj.cookieConfig : cookieConfig;
            var options;
            if (_checkOption('crossDomainLinker', trackerObj)) {
              trackerObj.allowLinker = trackerObj.crossDomainLinker;
            }
            angular.forEach(['name', 'allowLinker'], function(key) {
              if (key in trackerObj) {
                if (angular.isUndefined(options)) {
                  options = {};
                }
                options[key] = trackerObj[key];
              }
            });
            if (angular.isUndefined(options)) {
              $window.ga('create', trackerObj.tracker, _cookieConfig);
            } else {
              $window.ga('create', trackerObj.tracker, _cookieConfig, options);
            }
            if (options && 'allowLinker' in options && options.allowLinker) {
              $window.ga(_generateCommandName('require', trackerObj), 'linker');
              if (_checkOption('crossLinkDomains', trackerObj)) {
                $window.ga(_generateCommandName('linker:autoLink', trackerObj), trackerObj.crossLinkDomains);
              }
            }
          });
        } else if (crossDomainLinker) {
          $window.ga('create', accountId, cookieConfig, linkerConfig);
          $window.ga('require', 'linker');
          if(crossLinkDomains) {
            $window.ga('linker:autoLink', crossLinkDomains );
          }
        } else {
          $window.ga('create', accountId, cookieConfig);
        }

        if (displayFeatures) {
          $window.ga('require', 'displayfeatures');
        }

        if (trackRoutes && !ignoreFirstPageLoad) {
          $window.ga('send', 'pageview', getUrl());
        }

        if ($window.ga) {
          if (ecommerce) {
            if (!enhancedEcommerce) {
              $window.ga('require', 'ecommerce', 'ecommerce.js');
            } else {
              $window.ga('require', 'ec', 'ec.js');
            }
          }
          if (enhancedLinkAttribution) {
            $window.ga('require', 'linkid', 'linkid.js');
          }
          if (experimentId) {
            var expScript = document.createElement('script'),
              s = document.getElementsByTagName('script')[0];
            expScript.src = "//www.google-analytics.com/cx/api.js?experiment=" + experimentId;
            s.parentNode.insertBefore(expScript, s);
          }
        }

        return created = true;
      };

      this._ecommerceEnabled = function () {
        if (!ecommerce) {
          this._log('warn', 'ecommerce not set. Use AnalyticsProvider.setECommerce(true, false);');
          return false;
        } else if (enhancedEcommerce) {
          this._log('warn', 'Enhanced ecommerce plugin is enabled. Only one plugin(ecommerce/ec) can be used at a time. ' +
            'Use AnalyticsProvider.setECommerce(true, false);');
          return false;
        }
        return true;
      };

      this._enhancedEcommerceEnabled = function () {
        if (!ecommerce) {
          this._log('warn', 'ecommerce not set. Use AnalyticsProvider.setECommerce(true, true);');
          return false;
        } else if (!enhancedEcommerce) {
          this._log('warn', 'Enhanced ecommerce plugin is disabled. Use AnalyticsProvider.setECommerce(true, true);');
          return false;
        }
        return true;
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
        var that = this, args = arguments;
        url = url ? url : getUrl();
        title = title ? title : $document[0].title;
        _gaJs(function () {
          // http://stackoverflow.com/questions/7322288/how-can-i-set-a-page-title-with-google-analytics
          $window._gaq.push(["_set", "title", title]);
          $window._gaq.push(['_trackPageview', trackPrefix + url]);
          that._log('_trackPageview', url, title, args);
        });
        _analyticsJs(function () {
          var opt_fieldObject = {
            'page': trackPrefix + url,
            'title': title
          };
          if (angular.isObject(custom)) {
            angular.extend(opt_fieldObject, custom);
          }
          if (angular.isArray(accountId)) {
            accountId.forEach(function (trackerObj) {
              $window.ga(_generateCommandName('send', trackerObj), 'pageview', opt_fieldObject);
            });
          } else {
            $window.ga('send', 'pageview', opt_fieldObject);
          }
          that._log('pageview', url, title, args);
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
        var that = this, args = arguments;
        _gaJs(function () {
          $window._gaq.push(['_trackEvent', category, action, label, value, !!noninteraction]);
          that._log('trackEvent', args);
        });
        _analyticsJs(function () {
          var opt_fieldObject = {};
          if (angular.isDefined(noninteraction)) {
            opt_fieldObject['nonInteraction'] = !!noninteraction;
          }
          if (angular.isObject(custom)) {
            angular.extend(opt_fieldObject, custom);
          }
          if (angular.isArray(accountId)) {
            accountId.forEach(function (trackerObj) {
              if (_checkOption('trackEvent', trackerObj)) {
                $window.ga(_generateCommandName('send', trackerObj), 'event', category, action, label, value, opt_fieldObject);
              }
            });
          } else {
            $window.ga('send', 'event', category, action, label, value, opt_fieldObject);
          }
          that._log('event', args);
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
        var that = this, args = arguments;
        _gaJs(function () {
          $window._gaq.push(['_addTrans', transactionId, affiliation, total, tax, shipping, city, state, country]);
          that._log('_addTrans', args);
        });
        _analyticsJs(function () {
          if (that._ecommerceEnabled()) {
            $window.ga('ecommerce:addTransaction', {
              id: transactionId,
              affiliation: affiliation,
              revenue: total,
              tax: tax,
              shipping: shipping,
              currency: currency || 'USD'
            });
            that._log('ecommerce:addTransaction', args);
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
        var that = this, args = arguments;
        _gaJs(function () {
          $window._gaq.push(['_addItem', transactionId, sku, name, category, price, quantity]);
          that._log('_addItem', args);
        });
        _analyticsJs(function () {
          if (that._ecommerceEnabled()) {
            $window.ga('ecommerce:addItem', {
              id: transactionId,
              name: name,
              sku: sku,
              category: category,
              price: price,
              quantity: quantity
            });
            that._log('ecommerce:addItem', args);
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
        var that = this, args = arguments;
        _gaJs(function () {
          $window._gaq.push(['_trackTrans']);
          that._log('_trackTrans', args);
        });
        _analyticsJs(function () {
          if (that._ecommerceEnabled()) {
            $window.ga('ecommerce:send');
            that._log('ecommerce:send', args);
          }
        });
      };

      /**
       * Clear transaction
       * https://developers.google.com/analytics/devguides/collection/analyticsjs/ecommerce#clearingData
       * @private
       */
      this._clearTrans = function () {
        var that = this, args = arguments;
        _analyticsJs(function () {
          if (that._ecommerceEnabled()) {
            $window.ga('ecommerce:clear');
            that._log('ecommerce:clear', args);
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
        var that = this, args = arguments;
        _gaJs(function () {
          $window._gaq.push(['_addProduct', productId, name, category, brand, variant, price, quantity, coupon, position]);
          that._log('_addProduct', args);
        });
        _analyticsJs(function () {
          if (that._enhancedEcommerceEnabled()) {
            $window.ga('ec:addProduct', {
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
            that._log('ec:addProduct', args);
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
        var that = this, args = arguments;
        _gaJs(function () {
          $window._gaq.push(['_addImpression', id, name, list, brand, category, variant, position, price]);
          that._log('_addImpression', args);
        });
        _analyticsJs(function () {
          if (that._enhancedEcommerceEnabled()) {
            $window.ga('ec:addImpression', {
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
          that._log('ec:addImpression', args);
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
        var that = this, args = arguments;
        _gaJs(function () {
          $window._gaq.push(['_addPromo', productId, name, creative, position]);
          that._log('_addPromo', arguments);
        });
        _analyticsJs(function () {
          if (that._enhancedEcommerceEnabled()) {
            $window.ga('ec:addPromo', {
              id: productId,
              name: name,
              creative: creative,
              position: position
            });
            that._log('ec:addPromo', args);
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
        var that = this, args = arguments;
        _gaJs(function () {
          $window._gaq.push(['_setAction', action, obj]);
          that._log('__setAction', args);
        });
        _analyticsJs(function () {
          if (that._enhancedEcommerceEnabled()) {
            $window.ga('ec:setAction', action, obj);
            that._log('ec:setAction', args);
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
        this._pageView();
      };

      /**
       * Track Refund
       * https://developers.google.com/analytics/devguides/collection/analyticsjs/enhanced-ecommerce#measuring-refunds
       * @param transactionId
       *
       */
      this._trackRefund = function (transactionId) {
        this._setAction('refund', this._getActionFieldObject(transactionId));
        this._pageView();
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
        this._pageView();
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
        var that = this;
        var args = Array.prototype.slice.call(arguments);
        args.unshift('send');
        _analyticsJs(function () {
          $window.ga.apply(this, args);
          that._log(args);
        });
      };

      this._pageView = function() {
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
        var that = this;
        _analyticsJs(function () {
          $window.ga('set', name, value);
          that._log('set', name, value);
        });
      };


      // creates the ganalytics tracker
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
          me._trackPage();
        });
      }

      return {
        _logs: me._logs,
        displayFeatures: displayFeatures,
        ecommerce: ecommerce,
        enhancedEcommerce: enhancedEcommerce,
        enhancedLinkAttribution: enhancedLinkAttribution,
        getUrl: getUrl,
        experimentId: experimentId,
        ignoreFirstPageLoad: ignoreFirstPageLoad,
        delayScriptTag: delayScriptTag,
        setCookieConfig: me._setCookieConfig,
        getCookieConfig: function () {
          return cookieConfig;
        },
        createAnalyticsScriptTag: function (config) {
          if (config) {
            cookieConfig = config;  
          }

          return me._createAnalyticsScriptTag();
        },
        createScriptTag: function (config) {
          if (config) {
            cookieConfig = config;  
          }

          return me._createScriptTag(); 
        },
        ecommerceEnabled: function () {
          return me._ecommerceEnabled();
        },
        enhancedEcommerceEnabled: function () {
          return me._enhancedEcommerceEnabled();
        },
        trackPage: function (url, title, custom) {
          me._trackPage(url, title, custom);
        },
        trackEvent: function (category, action, label, value, noninteraction, custom) {
          me._trackEvent(category, action, label, value, noninteraction, custom);
        },
        addTrans: function (transactionId, affiliation, total, tax, shipping, city, state, country, currency) {
          me._addTrans(transactionId, affiliation, total, tax, shipping, city, state, country, currency);
        },
        addItem: function (transactionId, sku, name, category, price, quantity) {
          me._addItem(transactionId, sku, name, category, price, quantity);
        },
        trackTrans: function () {
          me._trackTrans();
        },
        clearTrans: function () {
          me._clearTrans();
        },
        addProduct: function (productId, name, category, brand, variant, price, quantity, coupon, position) {
          me._addProduct(productId, name, category, brand, variant, price, quantity, coupon, position);
        },
        addPromo: function (productId, name, creative, position) {
          me._addPromo(productId, name, creative, position);
        },
        addImpression: function (productId, name, list, brand, category, variant, position, price) {
          me._addImpression(productId, name, list, brand, category, variant, position, price);
        },
        productClick: function (listName) {
          me._productClick(listName);
        },
        promoClick : function (promotionName) {
          me._promoClick(promotionName);
        },
        trackDetail: function () {
          me._setAction('detail');
          me._pageView();
        },
        trackCart: function (action) {
          me._trackCart(action);
        },
        trackCheckout: function (step, option) {
          me._trackCheckOut(step, option);
        },
        trackTransaction: function (transactionId, affiliation, revenue, tax, shipping, coupon, list, step, option){
          me._trackTransaction(transactionId, affiliation, revenue, tax, shipping, coupon, list, step, option);
        },
        setAction: function (action, obj) {
          me._setAction(action, obj);
        },
        send: function (obj) {
          me._send(obj);
        },
        pageView: function () {
          me._pageView();
        },
        set: function (name, value) {
          me._set(name, value);
        }
      };
    }];
  })

  .directive('gaTrackEvent', ['Analytics', '$parse', function (Analytics, $parse) {
    return {
      restrict: 'A',
      link: function (scope, element, attrs) {
        var options = $parse(attrs.gaTrackEvent)({});
        element.bind('click', function () {
          if (options.length > 1) {
            Analytics.trackEvent.apply(Analytics, options);
          }
        });
      }
    };
  }]);
