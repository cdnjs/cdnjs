/**
 * Angular Google Analytics - Easy tracking for your AngularJS application
 * @version v0.0.8 - 2014-10-26
 * @link http://github.com/revolunet/angular-google-analytics
 * @author Julien Bouquillon <julien@revolunet.com>
 * @license MIT License, http://www.opensource.org/licenses/MIT
 */
/* global angular, console */

'use strict';

angular.module('angular-google-analytics', [])
    .provider('Analytics', function() {
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
            linkerConfig = {'allowLinker': true};

          this._logs = [];

          // config methods
          this.setAccount = function(id) {
              accountId = id;
              return true;
          };
          this.trackPages = function(doTrack) {
              trackRoutes = doTrack;
              return true;
          };

          this.trackPrefix = function(prefix) {
              trackPrefix = prefix;
              return true;
          };

          this.setDomainName = function(domain) {
            domainName = domain;
            return true;
          };

          this.useDisplayFeatures = function(val) {
            displayFeatures = !!val;
            return true;
          };

          this.useAnalytics = function(val) {
            analyticsJS = !!val;
            return true;
          };

          this.useEnhancedLinkAttribution = function (val) {
            enhancedLinkAttribution = !!val;
            return true;
          };

          this.useCrossDomainLinker = function(val) {
            crossDomainLinker = !!val;
            return true;
          };

          this.setCrossLinkDomains = function(domains) {
            crossLinkDomains = domains;
            return true;
          };

          this.setPageEvent = function(name) {
            pageEvent = name;
            return true;
          };

          this.setCookieConfig = function (config) {
            cookieConfig = config;
            return true;
          };

          this.useECommerce = function (val,enhanced) {
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
          };

        // public service
        this.$get = ['$document', '$rootScope', '$location', '$window', function($document, $rootScope, $location, $window) {
          var getUrl = function () {
            var url = $location.path();
            if (removeRegExp) {
              return url.replace(removeRegExp, '');
            }
            return url;
          };

          // private methods
          function _createScriptTag() //noinspection JSValidateTypes
          {
            // inject the google analytics tag
            if (!accountId) return;
            $window._gaq = [];
            $window._gaq.push(['_setAccount', accountId]);
            if(domainName) $window._gaq.push(['_setDomainName', domainName]);
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
            if(displayFeatures) {
              gaSrc = ('https:' === document.location.protocol ? 'https://' : 'http://') + 'stats.g.doubleclick.net/dc.js';
            } else {
              gaSrc = ('https:' === document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
            }
            (function() {
              var document = $document[0];
              var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
              ga.src = gaSrc;
              var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
            })(gaSrc);
            created = true;
          }

          function _createAnalyticsScriptTag() {
            if (!accountId) {
              return console.warn('No account id set for Analytics.js');
            }

            (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
              (i[r].q=i[r].q||[]).push(arguments);},i[r].l=1*new Date();a=s.createElement(o),
              m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m);
            })(window,document,'script','//www.google-analytics.com/analytics.js','ga');

            if (angular.isArray(accountId)) {
              accountId.forEach(function (trackerObj) {
                $window.ga('create', trackerObj.tracker, cookieConfig, { name: trackerObj.name });
              });
            } else if(crossDomainLinker) {
              $window.ga('create', accountId, cookieConfig, linkerConfig);
              $window.ga('require', 'linker');
              if(crossLinkDomains) {
                $window.ga('linker:autoLink', crossLinkDomains );
              }
            } else {
              $window.ga('create', accountId, cookieConfig);
            }

            if(displayFeatures) {
              $window.ga('require', 'displayfeatures');
            }

            if (trackRoutes && !ignoreFirstPageLoad) {
              $window.ga('send', 'pageview', getUrl());
            }

            if ($window.ga) {
              if (ecommerce) {
                if (!enhancedEcommerce)
                  $window.ga('require', 'ecommerce', 'ecommerce.js');
                else
                  $window.ga('require', 'ec', 'ec.js');
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

          }

          this._log = function() {
            // for testing
            //console.info('analytics log:', arguments);
            this._logs.push(arguments);
          };

          this._trackPage = function(url, title) {
            title = title ? title : $document[0].title;
            if (trackRoutes && !analyticsJS && $window._gaq) {
              // http://stackoverflow.com/questions/7322288/how-can-i-set-a-page-title-with-google-analytics
              $window._gaq.push(["_set", "title", title]);
              $window._gaq.push(['_trackPageview', trackPrefix + url]);
              this._log('_trackPageview', arguments);
            } else if (trackRoutes && analyticsJS && $window.ga) {
              if (angular.isArray(accountId)) {
                accountId.forEach(function (trackerObj) {
                  $window.ga(trackerObj.name + '.send', 'pageview', {
                    'page': trackPrefix + url,
                    'title': title
                  });
                });
              } else {
                $window.ga('send', 'pageview', {
                  'page': trackPrefix + url,
                  'title': title
                });
              }
              this._log('pageview', arguments);
            }
          };

          this._trackEvent = function(category, action, label, value) {
            if (!analyticsJS && $window._gaq) {
              $window._gaq.push(['_trackEvent', category, action, label, value]);
              this._log('trackEvent', arguments);
            } else if ($window.ga) {
              $window.ga('send', 'event', category, action, label, value);
              this._log('event', arguments);
            }

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
            if (!analyticsJS && $window._gaq) {
              $window._gaq.push(['_addTrans', transactionId, affiliation, total, tax, shipping, city, state, country]);
              this._log('_addTrans', arguments);
            } else if ($window.ga) {
              if (!ecommerce) {
                console.warn('ecommerce no set. Use AnalyticsProvider.setECommerce(true,false);');
              } else if(enhancedEcommerce ){
                console.warn('Enhanced ecommerce plugin is enabled. Only one plugin(ecommerce/ec) can be used at a time. ' +
                  'Use AnalyticsProvider.setECommerce(true,false);');
              } else {
                $window.ga('ecommerce:addTransaction', {
                  id: transactionId,
                  affiliation: affiliation,
                  revenue: total,
                  tax: tax,
                  shipping: shipping,
                  currency: currency || 'USD'
                });
                this._log('ecommerce:addTransaction', arguments);
              }

            }
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
            if (!analyticsJS && $window._gaq) {
              $window._gaq.push(['_addItem', transactionId, sku, name, category, price, quantity]);
              this._log('_addItem', arguments);
            } else if ($window.ga) {
              if (!ecommerce) {
                console.warn('ecommerce no set. Use AnalyticsProvider.setECommerce(true,false);');
              } else if(enhancedEcommerce ){
                console.warn('Enhanced ecommerce plugin is enabled. Only one plugin(ecommerce/ec) can be used at a time. ' +
                  'Use AnalyticsProvider.setECommerce(true,false);');
              } else {
                $window.ga('ecommerce:addItem', {
                  id: transactionId,
                  name: name,
                  sku: sku,
                  category: category,
                  price: price,
                  quantity: quantity
                });
                this._log('ecommerce:addItem', arguments);
              }
            }
          };

          /**
           * Track transaction
           * https://developers.google.com/analytics/devguides/collection/gajs/methods/gaJSApiEcommerce#_gat.GA_Tracker_._trackTrans
           * https://developers.google.com/analytics/devguides/collection/analyticsjs/ecommerce#sendingData
           * @private
           */
          this._trackTrans = function () {
            if (!analyticsJS && $window._gaq) {
              $window._gaq.push(['_trackTrans']);
              this._log('_trackTrans', arguments);
            } else if ($window.ga) {
              if (!ecommerce) {
                console.warn('ecommerce no set. Use AnalyticsProvider.setECommerce(true,false);');
              } else if(enhancedEcommerce ){
                console.warn('Enhanced ecommerce plugin is enabled. Only one plugin(ecommerce/ec) can be used at a time. ' +
                  'Use AnalyticsProvider.setECommerce(true,false);');
              } else {
                $window.ga('ecommerce:send');
                this._log('ecommerce:send', arguments);
              }
            }
          };

          /**
           * Clear transaction
           * https://developers.google.com/analytics/devguides/collection/analyticsjs/ecommerce#clearingData
           *
           * @private
           */
          this._clearTrans = function () {
            if ($window.ga) {
              if (!ecommerce) {
                console.warn('ecommerce no set. Use AnalyticsProvider.setECommerce(true,false);');
              } else if(enhancedEcommerce ){
                console.warn('Enhanced ecommerce plugin is enabled. Only one plugin(ecommerce/ec) can be used at a time. ' +
                  'Use AnalyticsProvider.setECommerce(true,false);');
              } else {
                $window.ga('ecommerce:clear');
                this._log('ecommerce:clear', arguments);
              }
            }
          };

          /**
          Enhanced Ecommerce
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
          this._addProduct = function (productId, name, category, brand, variant, price, quantity, coupon,position) {
            if (!analyticsJS && $window._gaq) {
              $window._gaq.push(['_addProduct', productId, name, category, brand, variant, price, quantity, coupon,position]);
              this._log('_addProduct', arguments);
            } else if ($window.ga) {
                if (!ecommerce) {
                  console.warn('ecommerce not set. Use AnalyticsProvider.setECommerce(true,true);');
                } else if(!enhancedEcommerce ){
                  console.warn('Enhanced ecommerce plugin is disabled. Use AnalyticsProvider.setECommerce(true,true);');
                } else {
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
                  this._log('ec:addProduct', arguments);
                }
            }
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
          this._addImpression = function(id, name, list, brand, category, variant, position, price){
            if (!analyticsJS && $window._gaq) {
              $window._gaq.push(['_addImpression', id, name, list, brand, category, variant, position, price]);
              this._log('_addImpression', arguments);
            } else if ($window.ga) {
              if (!ecommerce) {
                console.warn('ecommerce not set. Use AnalyticsProvider.setECommerce(true,true);');
              } else if(!enhancedEcommerce ){
                console.warn('Enhanced ecommerce plugin is disabled. Use AnalyticsProvider.setECommerce(true,true);');
              } else {
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
              this._log('ec:addImpression', arguments);
            }
          };

          /**
           * Add promo data
           * https://developers.google.com/analytics/devguides/collection/analyticsjs/enhanced-ecommerce
           * @param productId
           * @param name
           * @param creative
           * @param position
           */
          this._addPromo = function (productId, name, creative,position) {
            if (!analyticsJS && $window._gaq) {
              $window._gaq.push(['_addPromo', productId, name, creative, position]);
              this._log('_addPromo', arguments);
            } else if ($window.ga) {
              if (!ecommerce) {
                console.warn('ecommerce not set. Use AnalyticsProvider.setECommerce(true,true);');
              } else if(!enhancedEcommerce ){
                console.warn('Enhanced ecommerce plugin is disabled. Use AnalyticsProvider.setECommerce(true,true);');
              } else {
                $window.ga('ec:addPromo', {
                  id: productId,
                  name: name,
                  creative: creative,
                  position: position
                });
                this._log('ec:addPromo', arguments);
              }
            }
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
          this._getActionFieldObject = function (id,affiliation,revenue,tax,shipping,coupon,list,step,option) {
            var obj = {};
            if (id) obj.id = id;
            if (affiliation) obj.affiliation = affiliation;
            if (revenue) obj.revenue = revenue;
            if (tax) obj.tax = tax;
            if (shipping) obj.shipping = shipping;
            if (coupon) obj.coupon = coupon;
            if (list) obj.list = list;
            if (step) obj.step = step;
            if (option) obj.option = option;
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
          this._setAction = function(action,obj){
            if (!analyticsJS && $window._gaq) {
              $window._gaq.push(['_setAction',action,obj]);
              this._log('__setAction', arguments);
            } else if ($window.ga) {
              if (!ecommerce) {
                console.warn('ecommerce not set. Use AnalyticsProvider.setECommerce(true,true);');
              } else if(!enhancedEcommerce ){
                console.warn('Enhanced ecommerce plugin is disabled. Use AnalyticsProvider.setECommerce(true,true);');
              } else {
                $window.ga('ec:setAction',action,obj);
                this._log('ec:setAction', arguments);
              }
            }
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
          this._trackTransaction = function (transactionId,affiliation,revenue,tax,shipping,coupon,list,step,option) {
            this._setAction('purchase',this._getActionFieldObject(transactionId,affiliation,revenue,tax,shipping,coupon,list,step,option));
            this._pageView();
          };

          /**
           * Track Refund
           * https://developers.google.com/analytics/devguides/collection/analyticsjs/enhanced-ecommerce#measuring-refunds
           * @param transactionId
           *
           */
          this._trackRefund = function (transactionId) {
            this._setAction('refund',this._getActionFieldObject(transactionId));
            this._pageView();
          };

          /**
           * Track Checkout
           * https://developers.google.com/analytics/devguides/collection/analyticsjs/enhanced-ecommerce#measuring-checkout
           * @param step
           * @param option
           *
           */
          this._trackCheckOut = function (step,option) {
            this._setAction('checkout',this._getActionFieldObject(null,null,null,null,null,null,null,step,option));
            this._pageView();
          };

          /**
           * Track add/remove to cart
           * https://developers.google.com/analytics/devguides/collection/analyticsjs/enhanced-ecommerce#add-remove-cart
           * @param action
           *
           */
          this._trackCart = function (action){
            if(['add','remove'].indexOf(action) !== -1){
              this._setAction(action);
              this._send('event','UX','click', action + 'to cart');
            }
          };

          /**
           * Track promo click
           * https://developers.google.com/analytics/devguides/collection/analyticsjs/enhanced-ecommerce#measuring-promo-clicks
           * @param promotionName
           *
           */
          this._promoClick = function (promotionName){
            this._setAction('promo_click');
            this._send('event','Internal Promotions','click', promotionName);
          };

          /**
           * Track product click
           * https://developers.google.com/analytics/devguides/collection/analyticsjs/enhanced-ecommerce#measuring-promo-clicks
           * @param promotionName
           *
           */
          this._productClick = function (listName){
            this._setAction('click',this._getActionFieldObject(null,null,null,null,null,null,listName,null,null));
            this._send('event','UX','click', listName);
          };

          /**
           * Send custom events
           * https://developers.google.com/analytics/devguides/collection/analyticsjs/user-timings#implementation
           * https://developers.google.com/analytics/devguides/collection/analyticsjs/social-interactions#implementation
           *
           * @param obj
           * @private
           */
          this._send = function (obj) {
            if ($window.ga) {
              $window.ga('send', obj);
              this._log('send', obj);
            }
          };

          this._pageView = function() {
            this._send('pageview');
          };
          /**
           * Set custom dimensions, metrics or experiment
           * https://developers.google.com/analytics/devguides/collection/analyticsjs/custom-dims-mets
           * https://developers.google.com/analytics/devguides/collection/analyticsjs/field-reference#customs
           *
           * @param name
           * @param value
           * @private
           */
          this._set = function (name, value) {
            if ($window.ga) {
              $window.ga('set', name, value);
              this._log('set', name, value);
            }
          };



            // creates the ganalytics tracker
          if (analyticsJS) {
            _createAnalyticsScriptTag();
          } else {
            _createScriptTag();
          }


            var me = this;

            // activates page tracking
            if (trackRoutes) $rootScope.$on(pageEvent, function() {
              me._trackPage(getUrl());
            });

            return {
                _logs: me._logs,
                cookieConfig: cookieConfig,
                displayFeatures: displayFeatures,
                ecommerce: ecommerce,
                enhancedEcommerce: enhancedEcommerce,
                enhancedLinkAttribution: enhancedLinkAttribution,
                getUrl: getUrl,
                experimentId: experimentId,
                ignoreFirstPageLoad: ignoreFirstPageLoad,
                trackPage: function(url, title) {
                    // add a page event
                    me._trackPage(url, title);
                },
                trackEvent: function(category, action, label, value) {
                    // add an action event
                    me._trackEvent(category, action, label, value);
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
                addProduct: function (productId,name,category,brand,variant,price,quantity,coupon,position){
                  me._addProduct(productId,name,category,brand,variant,price,quantity,coupon,position);
                },
                addPromo: function(productId, name, creative, position){
                  me._addPromo(productId, name, creative, position);
                },
                addImpression: function(productId, name, list, brand, category, variant, position, price){
                  me._addImpression(productId, name, list, brand, category, variant, position, price);
                },
                productClick: function(listName){
                  me._productClick(listName);
                },
                promoClick : function (promotionName){
                  me._promoClick(promotionName);
                },
                trackDetail: function(){
                  me._setAction('detail');
                  me._pageView();
                },
                trackCart: function(action){
                  me._trackCart(action);
                },
                trackCheckout: function(step,option){
                  me._trackCheckOut(step,option);
                },
                trackTransaction: function(transactionId,affiliation,revenue,tax,shipping,coupon,list,step,option){
                  me._trackTransaction(transactionId,affiliation,revenue,tax,shipping,coupon,list,step,option);
                },
                setAction: function (action,obj) {
                  me._setAction(action,obj);
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

    });
