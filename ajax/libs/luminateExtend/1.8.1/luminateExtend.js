/*
 * luminateExtend.js
 * Version: 1.8.1 (18-OCT-2016)
 * Requires: jQuery v1.5.1+ or Zepto v1.1+
 * Includes: SimpleDateFormatJS v1.3 (https://github.com/noahcooper/SimpleDateFormatJS)
 */

(function($) {
  /* private helper functions */
  var validateLocale = function(locale) {
    /* if a locale is provided that is not supported, default to "en_US" */
    if(locale && $.inArray(locale, ['es_US', 'en_CA', 'fr_CA', 'en_GB', 'en_AU']) < 0) {
      locale = 'en_US';
    }
    
    return locale;
  }, 
  
  setLocale = function(locale) {
    if(locale) {
      locale = validateLocale(locale);
      luminateExtend.sessionVars.set('locale', locale);
    }
    
    return locale;
  }, 
  
  buildServerUrl = function(useHTTPS, data) {
    return (useHTTPS ? (luminateExtend.global.path.secure + 'S') : luminateExtend.global.path.nonsecure) + 
           'PageServer' + 
           (luminateExtend.global.routingId && luminateExtend.global.routingId !== '' ? (';' + luminateExtend.global.routingId) : '') + 
           '?pagename=luminateExtend_server&pgwrap=n' + 
           (data ? ('&' + data) : '');
  }, 
  
  apiCallbackHandler = function(requestSettings, responseData) {
    if(requestSettings.responseFilter && 
       requestSettings.responseFilter.array && 
       requestSettings.responseFilter.filter) {
      if(luminateExtend.utils.stringToObj(requestSettings.responseFilter.array, responseData)) {
        var filterKey = requestSettings.responseFilter.filter.split('==')[0].split('!=')[0].replace(/^\s+|\s+$/g, ''), 
        filterOperator, 
        filterValue;
        
        if(requestSettings.responseFilter.filter.indexOf('!=') !== -1) {
          filterOperator = 'nequal';
          filterValue = requestSettings.responseFilter.filter.split('!=')[1];
        }
        else if(requestSettings.responseFilter.filter.indexOf('==') !== -1) {
          filterOperator = 'equal';
          filterValue = requestSettings.responseFilter.filter.split('==')[1];
        }
        
        if(filterOperator && filterValue) {
          filterValue = filterValue.replace(/^\s+|\s+$/g, '');
          var filteredArray = [], 
          arrayIsFiltered = false;
          $.each(luminateExtend.utils.ensureArray(luminateExtend.utils.stringToObj(requestSettings.responseFilter.array, responseData)), function() {
            if((filterOperator === 'nequal' && this[filterKey] === filterValue) || 
               (filterOperator === 'equal' && this[filterKey] !== filterValue)) {
              arrayIsFiltered = true;
            }
            else {
              filteredArray.push(this);
            }
          });
          
          if(arrayIsFiltered) {
            var filterArrayParts = requestSettings.responseFilter.array.split('.');
            $.each(responseData, function(i, val0) {
              if(i === filterArrayParts[0]) {
                $.each(val0, function(j, val1) {
                  if(j === filterArrayParts[1]) {
                    if(filterArrayParts.length === 2) {
                      responseData[i][j] = filteredArray;
                    }
                    else {
                      $.each(val1, function(k, val2) {
                        if(k === filterArrayParts[2]) {
                          if(filterArrayParts.length === 3) {
                            responseData[i][j][k] = filteredArray;
                          }
                          else {
                            $.each(val2, function(l, val3) {
                              if(l === filterArrayParts[3] && filterArrayParts.length === 4) {
                                responseData[i][j][k][l] = filteredArray;
                              }
                            });
                          }
                        }
                      });
                    }
                  }
                });
              }
            });
          }
        }
      }
    }
    
    var callbackFn = $.noop;
    if(requestSettings.callback) {
      if(typeof requestSettings.callback === 'function') {
        callbackFn = requestSettings.callback;
      }
      else if(requestSettings.callback.error && responseData.errorResponse) {
        callbackFn = requestSettings.callback.error;
      }
      else if(requestSettings.callback.success && !responseData.errorResponse) {
        callbackFn = requestSettings.callback.success;
      }
    }
    
    var isLoginRequest = requestSettings.data.indexOf('&method=login') !== -1 && requestSettings.data.indexOf('&method=loginTest') === -1, 
    isLogoutRequest = requestSettings.data.indexOf('&method=logout') !== -1;
    
    if(!isLoginRequest && !isLogoutRequest) {
      callbackFn(responseData);
    }
    
    /* get a new auth token after login or logout */
    else {
      var newAuthCallback = function() {
        callbackFn(responseData);
      }, 
      getAuthOptions = {
        callback: newAuthCallback, 
        useCache: false, 
        useHTTPS: requestSettings.useHTTPS
      };
      
      if(isLoginRequest && responseData.loginResponse && responseData.loginResponse.nonce) {
        getAuthOptions.nonce = 'NONCE_TOKEN=' + responseData.loginResponse.nonce;
      }
      
      luminateExtend.api.getAuth(getAuthOptions);
    }
  };
  
  /* library core */
  window.luminateExtend = function(initOptions) {
    /* make luminateExtend an alias for the init method if called directly */
    luminateExtend.init(initOptions || {});
  };
  
  /* library info */
  luminateExtend.library = {
    version: '1.7.1'
  };
  
  /* global settings */
  luminateExtend.global = {
    update: function(settingName, settingValue) {
      if(settingName) {
        if(settingName.length) {
          if(settingValue) {
            if(settingName === 'locale') {
              settingValue = setLocale(settingValue);
            }
            
            luminateExtend.global[settingName] = settingValue;
          }
        }
        else {
          if(settingName.locale) {
            settingName.locale = setLocale(settingName.locale);
          }
          
          luminateExtend.global = $.extend(luminateExtend.global, settingName);
        }
      }
    }
  };
  
  /* init library */
  luminateExtend.init = function(options) {
    var settings = $.extend({
      apiCommon: {}, 
      auth: {
        type: 'auth'
      }, 
      path: {}
    }, options || {});
    
    if(settings.locale) {
      settings.locale = validateLocale(settings.locale);
    }
    
    /* check if the browser supports CORS and the withCredentials property */
    settings.supportsCORS = false;
    if(window.XMLHttpRequest) {
      var testXHR = new XMLHttpRequest();
      if('withCredentials' in testXHR) {
        settings.supportsCORS = true;
      }
    }
    
    luminateExtend.global = $.extend(luminateExtend.global, settings);
    
    return luminateExtend;
  };
  
  /* api */
  luminateExtend.api = function(requestOptions) {
    /* make luminateExtend.api an alias for the request method if called directly */
    luminateExtend.api.request(requestOptions || {});
  };
  
  luminateExtend.api.bind = function(selector) {
    selector = selector || 'form.luminateApi';
    
    if($(selector).length > 0) {
      $(selector).each(function() {
        if(this.nodeName.toLowerCase() === 'form') {
          $(this).bind('submit', function(e) {
            e.cancelBubble = true;
            e.returnValue  = false;
            if(e.stopPropagation) {
              e.stopPropagation();
              e.preventDefault();
            }
            
            if(!$(this).attr('id')) {
              $(this).attr('id', 'luminateApi-' + new Date().getTime());
            }
            
            var formAction = $(this).attr('action'), 
            formActionQuery = formAction.split('?'), 
            formApiData = $(this).data('luminateapi'), 
            
            requestApi = (formActionQuery[0].indexOf('/site/') !== -1) ? 
                         formActionQuery[0].split('/site/')[1] : formActionQuery[0], 
            requestCallback, 
            requestContentType = $(this).attr('enctype'), 
            requestData = (formActionQuery.length > 1) ? formActionQuery[1] : '', 
            requestForm = '#' + $(this).attr('id'), 
            requestRequiresAuth = false, 
            requestUseHTTPS = false;
            
            if(formApiData) {
              if(formApiData.callback) {
                requestCallback = luminateExtend.utils.stringToObj(formApiData.callback);
              }
              if(formApiData.requiresAuth && formApiData.requiresAuth === 'true') {
                requestRequiresAuth = true;
              }
              if(formAction.indexOf('https:') === 0 || 
                 (window.location.protocol === 'https:' && formAction.indexOf('http') === -1)) {
                requestUseHTTPS = true;
              }
            }
            
            luminateExtend.api.request({
              api: requestApi, 
              callback: requestCallback, 
              contentType: requestContentType, 
              data: requestData, 
              form: requestForm,  
              requiresAuth: requestRequiresAuth, 
              useHTTPS: requestUseHTTPS
            });
          });
        }
      });
    }
    
    return luminateExtend;
  };
  
  luminateExtend.api.getAuth = function(options) {
    var settings = $.extend({
      useCache: true, 
      useHTTPS: false
    }, options || {});
    
    /* don't try to get an auth token if there's already a request outstanding */
    if(luminateExtend.api.getAuthLoad) {
      luminateExtend.api.getAuthLoad = false;
      
      if(settings.useCache && 
         luminateExtend.global.auth.type && 
         luminateExtend.global.auth.token) {
        luminateExtend.api.getAuthLoad = true;
        
        if(settings.callback) {
          settings.callback();
        }
      }
      else {
        var getAuthCallback = function(globalData) {
          luminateExtend.global.update(globalData);
          luminateExtend.api.getAuthLoad = true;
          
          if(settings.callback) {
            settings.callback();
          }
        };
        
        if(luminateExtend.global.supportsCORS) {
          $.ajax({
            url: (settings.useHTTPS ? luminateExtend.global.path.secure : luminateExtend.global.path.nonsecure) + 
                 'CRConsAPI', 
            data: 'luminateExtend=' + luminateExtend.library.version + 
                  (settings.nonce && settings.nonce !== '' ? ('&' + settings.nonce) : '') + 
                  '&api_key=' + luminateExtend.global.apiKey + 
                  '&method=getLoginUrl&response_format=json&v=1.0', 
            xhrFields: {
              withCredentials: true
            }, 
            dataType: 'json', 
            success: function(data) {
              var getLoginUrlResponse = data.getLoginUrlResponse, 
              loginUrl = getLoginUrlResponse.url, 
              routingId = getLoginUrlResponse.routing_id, 
              jsessionId = getLoginUrlResponse.JSESSIONID;
              
              if(!routingId && loginUrl.indexOf('CRConsAPI;jsessionid=') !== -1) {
                routingId = loginUrl.split('CRConsAPI;jsessionid=')[1].split('?')[0];
              }
              
              getAuthCallback({
                auth: {
                  type: 'auth', 
                  token: getLoginUrlResponse.token
                }, 
                routingId: routingId ? ('jsessionid=' + routingId) : '', 
                sessionCookie: jsessionId ? ('JSESSIONID=' + jsessionId) : ''
              });
            }
          });
        }
        else {
          $.ajax({
            url: buildServerUrl(settings.useHTTPS, 'action=getAuth&callback=?'), 
            dataType: 'jsonp', 
            success: getAuthCallback
          });
        }
      }
    }
    else {
      var retryGetAuth = function() {
        luminateExtend.api.getAuth(settings);
      }, 
      t = setTimeout(retryGetAuth, 1000);
    }
  };
  
  luminateExtend.api.getAuthLoad = true;
  
  var sendRequest = function(options) {
    var settings = $.extend({
      contentType: 'application/x-www-form-urlencoded', 
      data: '', 
      requiresAuth: false, 
      useHTTPS: null
    }, options || {});
    
    var servletShorthand = ['addressbook', 'advocacy', 'connect', 'cons', 'content', 'datasync', 'donation', 
                            'email', 'group', 'orgevent', 'recurring', 'survey', 'teamraiser'];
    if($.inArray(settings.api.toLowerCase(), servletShorthand) >= 0) {
      /* add "CR", capitalize the first letter, and add "API" */
      settings.api = 'CR' + settings.api.charAt(0).toUpperCase() + settings.api.slice(1).toLowerCase() + 'API';
      /* special cases where a letter in the middle of the servlet name needs to be capitalized */
      settings.api = settings.api.replace('Addressbook', 'AddressBook')
                                 .replace('Datasync', 'DataSync')
                                 .replace('Orgevent', 'OrgEvent');
    }
    
    /* don't make the request unless we have all the required data */
    if(luminateExtend.global.path.nonsecure && 
       luminateExtend.global.path.secure && 
       luminateExtend.global.apiKey && 
       settings.api) {
      if(settings.contentType.split(';')[0] === 'multipart/form-data') {
        settings.contentType = 'multipart/form-data';
      }
      else {
        settings.contentType = 'application/x-www-form-urlencoded';
      }
      settings.contentType += '; charset=UTF-8';
      
      settings.data = 'luminateExtend=' + luminateExtend.library.version + 
                      ((settings.data === '') ? '' : ('&' + settings.data));
      
      if(settings.form && $(settings.form).length > 0) {
        settings.data += '&' + $(settings.form).eq(0).serialize();
      }
      if(settings.data.indexOf('&api_key=') === -1) {
        settings.data += '&api_key=' + luminateExtend.global.apiKey;
      }
      if(luminateExtend.global.apiCommon.centerId && settings.data.indexOf('&center_id=') === -1) {
        settings.data += '&center_id=' + luminateExtend.global.apiCommon.centerId;
      }
      if(luminateExtend.global.apiCommon.categoryId && settings.data.indexOf('&list_category_id=') === -1) {
        settings.data += '&list_category_id=' + luminateExtend.global.apiCommon.categoryId;
      }
      if(settings.data.indexOf('&response_format=xml') !== -1) {
        settings.data = settings.data.replace(/&response_format=xml/g, '&response_format=json');
      }
      else if(settings.data.indexOf('&response_format=') === -1) {
        settings.data += '&response_format=json';
      }
      if(luminateExtend.global.apiCommon.source && settings.data.indexOf('&source=') === -1) {
        settings.data += '&source=' + luminateExtend.global.apiCommon.source;
      }
      if(luminateExtend.global.apiCommon.subSource && settings.data.indexOf('&sub_source=') === -1) {
        settings.data += '&sub_source=' + luminateExtend.global.apiCommon.subSource;
      }
      if(settings.data.indexOf('&suppress_response_codes=') === -1) {
        settings.data += '&suppress_response_codes=true';
      }
      if(luminateExtend.global.locale && settings.data.indexOf('&s_locale=') === -1) {
        settings.data += '&s_locale=' + luminateExtend.global.locale;
      }
      if(settings.data.indexOf('&v=') === -1) {
        settings.data += '&v=1.0';
      }
      
      var requestUrl = 'http://', 
      requestPath = luminateExtend.global.path.nonsecure.split('http://')[1];
      if(settings.api === 'CRDonationAPI' || settings.api === 'CRTeamraiserAPI' || 
         (settings.api !== 'CRConnectAPI' && ((window.location.protocol === 'https:' && 
          settings.useHTTPS == null) || settings.useHTTPS == true))) {
        settings.useHTTPS = true;
      }
      else {
        settings.useHTTPS = false;
      }
      if(settings.useHTTPS) {
        requestUrl = 'https://', 
        requestPath = luminateExtend.global.path.secure.split('https://')[1];
      }
      requestUrl += requestPath + settings.api;
      
      var isLuminateOnlineAndSameProtocol = false, 
      useAjax = false, 
      usePostMessage = false;
      if(window.location.protocol === requestUrl.split('//')[0] && document.domain === requestPath.split('/')[0]) {
        isLuminateOnlineAndSameProtocol = true;
        useAjax = true;
      }
      else if(luminateExtend.global.supportsCORS) {
        useAjax = true;
      }
      else if('postMessage' in window) {
        usePostMessage = true;
      }
      
      var doRequest;
      if(useAjax) {
        doRequest = function() {
          if(luminateExtend.global.routingId && luminateExtend.global.routingId !== '') {
            requestUrl += ';' + luminateExtend.global.routingId;
          }
          if(settings.requiresAuth && settings.data.indexOf('&' + luminateExtend.global.auth.type + '=') === -1) {
            settings.data += '&' + luminateExtend.global.auth.type + '=' + luminateExtend.global.auth.token;
          }
          if(luminateExtend.global.sessionCookie && luminateExtend.global.sessionCookie !== '') {
            settings.data += '&' + luminateExtend.global.sessionCookie;
          }
          settings.data += '&ts=' + new Date().getTime();
          
          $.ajax({
            url: requestUrl, 
            data: settings.data, 
            xhrFields: {
              withCredentials: true
            }, 
            contentType: settings.contentType, 
            /* set dataType explicitly as API sends Content-Type: text/plain rather than application/json (E-62659) */
            dataType: 'json', 
            type: 'POST', 
            success: function(data) {
              apiCallbackHandler(settings, data);
            }
          });
        };
      }
      else if(usePostMessage) {
        doRequest = function() {
          var postMessageTimestamp = new Date().getTime(), 
          postMessageFrameId = 'luminateApiPostMessage' + postMessageTimestamp, 
          postMessageUrl = buildServerUrl(settings.useHTTPS, 'action=postMessage');
          
          if(luminateExtend.global.routingId && luminateExtend.global.routingId !== '') {
            requestUrl += ';' + luminateExtend.global.routingId;
          }
          if(settings.requiresAuth && settings.data.indexOf('&' + luminateExtend.global.auth.type + '=') === -1) {
            settings.data += '&' + luminateExtend.global.auth.type + '=' + luminateExtend.global.auth.token;
          }
          if(luminateExtend.global.sessionCookie && luminateExtend.global.sessionCookie !== '') {
            settings.data += '&' + luminateExtend.global.sessionCookie;
          }
          settings.data += '&ts=' + postMessageTimestamp;
          
          if(!luminateExtend.api.request.postMessageEventHandler) {
            luminateExtend.api.request.postMessageEventHandler = {};
            
            luminateExtend.api.request.postMessageEventHandler.handler = function(e) {
              if(luminateExtend.global.path.nonsecure.indexOf(e.origin) !== -1 || 
                 luminateExtend.global.path.secure.indexOf(e.origin) !== -1) {
                var parsedData = $.parseJSON(e.data), 
                messageFrameId = parsedData.postMessageFrameId, 
                responseData = $.parseJSON(decodeURIComponent(parsedData.response));
                
                if(luminateExtend.api.request.postMessageEventHandler[messageFrameId]) {
                  luminateExtend.api.request.postMessageEventHandler[messageFrameId](messageFrameId, responseData);
                }
              }
            };
            
            if(typeof window.addEventListener != 'undefined') {
              window.addEventListener('message', luminateExtend.api.request.postMessageEventHandler.handler, false);
            }
            else if(typeof window.attachEvent != 'undefined') {
              window.attachEvent('onmessage', luminateExtend.api.request.postMessageEventHandler.handler);
            }
          }
          
          luminateExtend.api.request.postMessageEventHandler[postMessageFrameId] = function(frameId, data) {
            apiCallbackHandler(settings, data);
            
            $('#' + frameId).remove();
            
            delete luminateExtend.api.request.postMessageEventHandler[frameId];
          };
          
          $('body').append('<iframe style="position: absolute; top: 0; left: -999em;" ' + 
                           'name="' + postMessageFrameId + '" id="' + postMessageFrameId + '">' +  
                           '</iframe>');
          
          $('#' + postMessageFrameId).bind('load', function() {
            var postMessageString = '{' + 
                                      '"postMessageFrameId": "' + $(this).attr('id') + '", ' + 
                                      '"requestUrl": "' + requestUrl + '", ' + 
                                      '"requestContentType": "' + settings.contentType + '", ' + 
                                      '"requestData": "' + settings.data + '"' + 
                                    '}', 
            postMessageOrigin = requestUrl.split('/site/')[0].split('/admin/')[0];
            
            document.getElementById($(this).attr('id')).contentWindow
            .postMessage(postMessageString, postMessageOrigin);
          });
          
          $('#' + postMessageFrameId).attr('src', postMessageUrl);
        };
      }
      
      if(settings.requiresAuth || 
         (!useAjax && 
          !isLuminateOnlineAndSameProtocol && 
          !luminateExtend.global.sessionCookie)) {
        luminateExtend.api.getAuth({
          callback: doRequest, 
          useHTTPS: settings.useHTTPS
        });
      }
      else {
        doRequest();
      }
    }
  };
  
  luminateExtend.api.request = function(requests) {
    /* check for single requests */
    if(!$.isArray(requests)) {
      sendRequest(requests);
    }
    
    else {
      requests.reverse();

      var asyncRequests = [];
      
      /* check for synchronous requests */
      $.each(requests, function(requestInverseIndex) {
        var requestSettings = $.extend({
          async: true
        }, this);
        
        if(!requestSettings.async && requestInverseIndex !== (requests.length - 1)) {
          var prevRequest = requests[requestInverseIndex + 1];
          if(prevRequest.callback && 
             typeof prevRequest.callback !== 'function') {
            var oCallbackSuccess = prevRequest.callback.success || $.noop;
            prevRequest.callback.success = function(response) {
              oCallbackSuccess(response);

              sendRequest(requestSettings);
            };
          }
          else {
            var prevRequest = requests[requestInverseIndex + 1], 
            oCallbackFn = prevRequest.callback || $.noop;
            prevRequest.callback = {
              success: function(response) {
                oCallbackFn(response);
                
                sendRequest(requestSettings);
              }, 
              error: function(response) {
                oCallbackFn(response);
              }
            };
          }
        }
        
        else {
          asyncRequests.push(requestSettings);
        }
      });
      
      /* make each asynchronous request */
      asyncRequests.reverse();
      $.each(asyncRequests, function() {
        sendRequest(this);
      });
    }
  };
  
  /* session variables */
  luminateExtend.sessionVars = {
    set: function(varName, varValue, callback) {
      var pingOptions = {};
      if(callback) {
        pingOptions.callback = callback;
      }
      if(varName) {
        pingOptions.data = 's_' + varName + '=' + (varValue || '');
        
        luminateExtend.utils.ping(pingOptions);
      }
    }
  };
  
  /* luminate tags */
  luminateExtend.tags = function(tagTypes, selector) {
    /* make luminateExtend.tags an alias for the parse method if called directly */
    luminateExtend.tags.parse(tagTypes, selector);
  };
  luminateExtend.tags.parse = function(tagTypes, selector) {
    /* use the widgets plugin if available */
    if(luminateExtend.widgets) {
      luminateExtend.widgets(tagTypes, selector);
    }
    else {
      if(!tagTypes || tagTypes === 'all') {
        tagTypes = ['cons'];
      }
      else {
        tagTypes = luminateExtend.utils.ensureArray(tagTypes);
      }
      selector = selector || 'body';
      
      $.each(tagTypes, function(i, tagType) {
        if(tagType === 'cons') {
          var $consTags = $(selector).find(document.getElementsByTagName('luminate:cons'));
          if($consTags.length > 0) {
            var parseConsTags = function(data) {
              $consTags.each(function() {
                if(data.getConsResponse) {
                  $(this).replaceWith(luminateExtend.utils.stringToObj($(this).attr('field'), data.getConsResponse));
                }
                else {
                  $(this).remove();
                }
              });
            };
            
            luminateExtend.api.request({
              api: 'cons', 
              callback: parseConsTags, 
              data: 'method=getUser', 
              requiresAuth: true
            });
          }
        }
      });
    }
  };
  
  /* public helper functions */
  luminateExtend.utils = {
    /* ensure an object is an array so it may be iterated over, i.e. using $.each(), as the API uses an 
       array if there are 2 or more instances of an object, but does not use an array if there is 
       exactly 1 (E-47741) */
    ensureArray: function(pArray) {
      if($.isArray(pArray)) {
        return pArray;
      }
      else if(pArray) {
        return [pArray];
      }
      else {
        return [];
      }
    }, 
    
    stringToObj: function(str, obj) {
      var objReturn = obj || window;
      
      if(str) {
        var strParts = str.split('.');
        for(var i = 0; i < strParts.length; i++) {
          if(i < (strParts.length - 1) && !objReturn[strParts[i]]) {
            return {};
          }
          objReturn = objReturn[strParts[i]];
        }
      }
      
      return objReturn;
    }, 
    
    ping: function(options) {
      var settings = $.extend({
        data: null
      }, options || {});
      
      var pingImgId = 'luminatePing' + new Date().getTime();
      
      $('body').append('<img style="position: absolute; left: -999em; top: 0;" ' + 
                       'id="' + pingImgId + '" />');
      
      $('#' + pingImgId).bind('load', function() {
        $(this).remove();
        
        if(settings.callback) {
          settings.callback();
        }
      });
      
      $('#' + pingImgId).attr('src', ((window.location.protocol === 'https:') ? 
                                      luminateExtend.global.path.secure : 
                                      luminateExtend.global.path.nonsecure) + 
                                     'EstablishSession' + 
                                     (luminateExtend.global.routingId && luminateExtend.global.routingId !== '' ? (';' + luminateExtend.global.routingId) : '') + 
                                     '?' + (settings.data == null ? '' : (settings.data + '&')) + 
                                     'NEXTURL=' + 
                                     encodeURIComponent(((window.location.protocol === 'https:') ? 
                                                         luminateExtend.global.path.secure : 
                                                         luminateExtend.global.path.nonsecure) + 
                                                        'PixelServer'));
    }, 
    
    simpleDateFormat: function(unformattedDate, pattern, locale) {
      locale = locale || luminateExtend.global.locale;
      locale = validateLocale(locale);
      pattern = pattern || (($.inArray(locale, ['en_CA', 'fr_CA', 'en_GB', 'en_AU']) >= 0) ? 'd/M/yy' : 'M/d/yy');
      unformattedDate = unformattedDate || new Date();
      if(!(unformattedDate instanceof Date)) {
        var unformattedDateParts = unformattedDate.split('T')[0].split('-'), 
        unformattedDateTimeParts = (unformattedDate.split('T').length > 1) ? unformattedDate.split('T')[1]
                                                                                            .split('.')[0]
                                                                                            .split('Z')[0]
                                                                                            .split('-')[0]
                                                                                            .split(':') 
                                                                           : ['00', '00', '00'];
        unformattedDate = new Date(unformattedDateParts[0], (unformattedDateParts[1] - 1), 
                                   unformattedDateParts[2], unformattedDateTimeParts[0], 
                                   unformattedDateTimeParts[1], unformattedDateTimeParts[2]);
      }
      
      var oneDigitNumber = function(num) {
        num = '' + num;
        return (num.indexOf('0') === 0 && num !== '0') ? num.substring(1) : num;
      }, 
      
      twoDigitNumber = function(num) {
        num = Number(num);
        return (isNaN(num)) ? '00' : (((num < 10) ? '0' : '') + num);
      }, 
      
      dateParts = {
        month: twoDigitNumber(unformattedDate.getMonth() + 1), 
        date: twoDigitNumber(unformattedDate.getDate()), 
        year: twoDigitNumber(unformattedDate.getFullYear()), 
        day: unformattedDate.getDay(), 
        hour24: unformattedDate.getHours(), 
        hour12: unformattedDate.getHours(), 
        minutes: twoDigitNumber(unformattedDate.getMinutes()), 
        ampm: 'AM'
      };
      if(dateParts.hour24 > 11) {
        dateParts.ampm = 'PM';
      }
      dateParts.hour24 = twoDigitNumber(dateParts.hour24);
      if(dateParts.hour12 === 0) {
        dateParts.hour12 = 12;
      }
      if(dateParts.hour12 > 12) {
        dateParts.hour12 = dateParts.hour12 - 12;
      }
      dateParts.hour12 = twoDigitNumber(dateParts.hour12);
      
      var formattedDate, 
      
      patternReplace = function(patternPart) {
        var patternPartFormatted = patternPart.replace(/yy+(?=y)/g, 'yy')
                                              .replace(/MMM+(?=M)/g, 'MMM')
                                              .replace(/d+(?=d)/g, 'd')
                                              .replace(/EEE+(?=E)/g, 'EEE')
                                              .replace(/a+(?=a)/g, '')
                                              .replace(/k+(?=k)/g, 'k')
                                              .replace(/h+(?=h)/g, 'h')
                                              .replace(/m+(?=m)/g, 'm'), 
        
        formattedPart = patternPartFormatted.replace(/yyy/g, dateParts.year)
                                                .replace(/yy/g, dateParts.year.substring(2))
                                                .replace(/y/g, dateParts.year)
                                                .replace(/dd/g, dateParts.date)
                                                .replace(/d/g, oneDigitNumber(dateParts.date)), 
        
        adjustTimePattern = function(timeParts, timePatternPart, operator) {
          for(var i = 1; i < timeParts.length; i++) {
            if(!isNaN(timeParts[i].substring(0, 1))) {
              var timePartOperand = timeParts[i].substring(0, 2);
              timeParts[i] = timeParts[i].substring(2);
              if(isNaN(timePartOperand.substring(1))) {
                timeParts[i] = timePartOperand.substring(1) + timeParts[i];
                timePartOperand = timePartOperand.substring(0, 1);
              }
              timePartOperand = Number(timePartOperand);
              if(timePartOperand > 23) {
                timePartOperand = 23;
              }
              
              var timePartResult = (operator === '+') ? timePartOperand : (0 - timePartOperand);
              if(timePatternPart === 'kk' || timePatternPart === 'k') {
                timePartResult = (Number(dateParts.hour24) + timePartResult);
                if(timePartResult > 24) {
                  timePartResult = timePartResult - 24;
                }
                else if(timePartResult < 0) {
                  timePartResult = timePartResult + 24;
                }
              }
              else {
                timePartResult = (Number(dateParts.hour12) + timePartResult);
                if(timePartResult > 24) {
                  timePartResult = timePartResult - 24;
                }
                else if(timePartResult < 0) {
                  timePartResult = timePartResult + 24;
                }
                if(timePartResult > 12) {
                  timePartResult = timePartResult - 12;
                }
              }
              timePartResult = '' + timePartResult;
              if(timePatternPart === 'kk' || timePatternPart === 'hh') {
                timePartResult = twoDigitNumber(timePartResult);
              }
              if((timePatternPart === 'h' && timePartResult === 0) || (timePatternPart === 'hh' && 
                 timePartResult === '00')) {
                timePartResult = '12';
              }
              timeParts[i] = timePartResult + timeParts[i];
            }
          }
          
          return timeParts.join('');
        };
        
        if(formattedPart.indexOf('k+') !== -1) {
          formattedPart = adjustTimePattern(formattedPart.split('kk+'), 'kk', '+');
          formattedPart = adjustTimePattern(formattedPart.split('k+'), 'k', '+');
        }
        if(formattedPart.indexOf('k-') !== -1) {
          formattedPart = adjustTimePattern(formattedPart.split('kk-'), 'kk', '-');
          formattedPart = adjustTimePattern(formattedPart.split('k-'), 'k', '-');
        }
        
        formattedPart = formattedPart.replace(/kk/g, dateParts.hour24)
                                     .replace(/k/g, oneDigitNumber(dateParts.hour24));
        
        if(formattedPart.indexOf('h+') !== -1) {
          formattedPart = adjustTimePattern(formattedPart.split('hh+'), 'hh', '+');
          formattedPart = adjustTimePattern(formattedPart.split('h+'), 'h', '+');
        }
        if(formattedPart.indexOf('h-') !== -1) {
          formattedPart = adjustTimePattern(formattedPart.split('hh-'), 'hh', '-');
          formattedPart = adjustTimePattern(formattedPart.split('h-'), 'h', '-');
        }
        
        formattedPart = formattedPart.replace(/hh/g, ((dateParts.hour12 < 12 && dateParts.hour12.indexOf && 
                                                       dateParts.hour12.indexOf('0') !== 0) ? ('0' + 
                                                       dateParts.hour12) : 
                                                      dateParts.hour12))
                                     .replace(/h/g, oneDigitNumber(dateParts.hour12));
        
        formattedPart = formattedPart.replace(/mm/g, dateParts.minutes)
                                     .replace(/m/g, oneDigitNumber(dateParts.minutes));
        
        formattedPart = formattedPart.replace(/a/g, 'A');
        
        var formattedMonthNames = ['January', 
                                   'February', 
                                   'march', 
                                   'april', 
                                   'may', 
                                   'June', 
                                   'July', 
                                   'august', 
                                   'September', 
                                   'October', 
                                   'November', 
                                   'December'];
        if(locale === 'es_US') {
          formattedMonthNames = ['enero', 
                                 'febrero', 
                                 'marzo', 
                                 'abril', 
                                 'mayo', 
                                 'junio', 
                                 'julio', 
                                 'agosto', 
                                 'septiembre', 
                                 'octubre', 
                                 'noviembre', 
                                 'diciembre'];
        }
        if(locale === 'fr_CA') {
          formattedMonthNames = ['janvier', 
                                 'f&' + '#233;vrier', 
                                 'mars', 
                                 'avril', 
                                 'mai', 
                                 'juin', 
                                 'juillet', 
                                 'ao&' + '#251;t', 
                                 'septembre', 
                                 'octobre', 
                                 'novembre', 
                                 'd&' + '#233;cembre'];
        }
        formattedPart = formattedPart.replace(/MMMM/g, formattedMonthNames[Number(dateParts.month) - 1])
                                     .replace(/MMM/g, formattedMonthNames[Number(dateParts.month) - 1]
                                                      .substring(0, 3))
                                     .replace(/MM/g, dateParts.month)
                                     .replace(/M/g, oneDigitNumber(dateParts.month))
                                     .replace(/march/g, 'March')
                                     .replace(/may/g, 'May')
                                     .replace(/Mayo/g, 'mayo');
        
        var formattedDayNames = ['Sunday', 
                                 'Monday', 
                                 'Tuesday', 
                                 'Wednesday', 
                                 'Thursday', 
                                 'Friday', 
                                 'Saturday'];
        if(locale === 'es_US') {
          formattedDayNames = ['domingo', 
                               'lunes', 
                               'martes', 
                               'mi&' + 'eacute;rcoles', 
                               'jueves', 
                               'viernes', 
                               's&' + 'aacute;bado'];
        }
        if(locale === 'fr_CA') {
          formattedDayNames = ['dimanche', 
                               'lundi', 
                               'mardi', 
                               'mercredi', 
                               'jeudi', 
                               'vendredi', 
                               'samedi'];
        }
        formattedPart = formattedPart.replace(/EEEE/g, formattedDayNames[dateParts.day])
                                     .replace(/EEE/g, formattedDayNames[dateParts.day].substring(0, 3))
                                     .replace(/EE/g, formattedDayNames[dateParts.day].substring(0, 3))
                                     .replace(/E/g, formattedDayNames[dateParts.day].substring(0, 3));
        
        formattedPart = formattedPart.replace(/A/g, dateParts.ampm)
                                     .replace(/april/g, 'April')
                                     .replace(/august/g, 'August');
        
        return formattedPart;
      };
      
      if(pattern.indexOf('\'') === -1) {
        formattedDate = patternReplace(pattern);
      }
      
      else {
        var formatPatternParts = pattern.replace(/\'+(?=\')/g, '\'\'').split('\'\'');
        if(formatPatternParts.length === 1) {
          formatPatternParts = pattern.split('\'');
          for(var i = 0; i < formatPatternParts.length; i++) {
            if(i % 2 === 0) {
              formatPatternParts[i] = patternReplace(formatPatternParts[i]);
            }
          }
          return formatPatternParts.join('');
        }
        else {
          for(var i = 0; i < formatPatternParts.length; i++) {
            var formatPatternParts2 = formatPatternParts[i].split('\'');
            for(var j = 0; j < formatPatternParts2.length; j++) {
              if(j % 2 === 0) {
                formatPatternParts2[j] = patternReplace(formatPatternParts2[j]);
              }
            }
            formatPatternParts[i] = formatPatternParts2.join('');
          }
          return formatPatternParts.join('\'');
        }
      }
      
      return formattedDate;
    }
  };
})(typeof jQuery === 'undefined' && typeof Zepto === 'function' ? Zepto : jQuery);