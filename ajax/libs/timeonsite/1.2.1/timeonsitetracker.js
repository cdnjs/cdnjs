/**@preserve
 * Commercial License
 *
 * TimeOnSiteTracker.js - Measure your user's Time on site accurately.
 * 
 * Copyright (C) 2016 - 2026 Saleem Khan
 *
 * License key: {your-license-key-here}
 *
 * This is copyrighted software and requires you buy commericial license
 * before using it. Replace {your-license-key-here} with the licence key 
 * that you buy before starting to use this software. 
 * 
 * visit https://github.com/saleemkce/timeonsite/blob/master/LICENSE.md to learn more about 
 * license terms. 
 */

/**@preserve
 * Time on Site Tracker (TOS)
 * This file tracks time spent on page by user session.
 * It exposes getTimeOnPage() API which gives back time spent so far on page. Call any time to get current page's TOP
 * Provides suppport for blacklisting URL from tracking TOS
 * Measure your user's interaction with site directly and accurately.
 */

var TimeOnSiteTracker = function(config) {
    
    this.varyingStartTime = new Date();
    this.pageEntryTime = this.getDateTime();
    this.activityStartTime = null;
    this.totalTimeSpent = 0;
    this.returnInSeconds = false;

    this.isTimeOnSiteAllowed = true;
    this.callback = null;
    this.timeSpentArr = [];

    this.storeInLocalStorage = false;
    this.storageSupported = false;
    this.TOSDateKeysHolder = 'TimeOnSiteDateKeys';
    this.TOSDayKeyPrefix = 'TOS_';

    // TOS activity object
    this.activity = {};
    this.activity.activityStarted = false;

    this.config = config;
    this.xhr = null;
    this.timeOnSite = 0;
    this.isFlushSampleDataIOS = false;
    this.TOSSessionKey = null;
    this.TOSId = this.createTOSId();
    this.customData = null;
    this.TOSUserId = 'anonymous';
    this.anonymousTimerId = null;
    this.sessionStateChangeTimerId = null;

    this.fileIntegrityCode = 'ae4c20f53073125154d68d59c1818f8b';

    /**
     * Anonymous user session:
     * anonymous user session lasts as long as the browser tab is open. Though 
     * it's 15 seconds here. It's continuously renewed for next 15 seconds. If the 
     * user closes the tab and doesn't open it immediately for the next 15 seconds, 
     * then this anonymous user session is ended by TOSTracker.
     *
     * Authenticated user session:
     * authenticated user session will be valid for 1 day unless the user 
     * is logged out explicitly
     */
    this.sessionValidity = {
        anonymous: 15, //15 seconds
        oneDayInSecs: 86400, //86400 seconds = 1 day
        oneMonthInSeconds: 2592000 //2592000 seconds = 1 month
    };

    //Settings for TOS cookie path and domain so as to restrict access to sub-domains
    this.TOSCookie = {
        path: null,
        domain: null
    };

    //local storage config
    this.request = {
        url: '',
        headers: []
    };
    this.isRequestHeadersAvailable = false;

    this.developerMode = false;

    /**
     *  ** TOS constants for cookie and other key variables
     *  
     *  TOSSessionKey - Cookie that identifies user session with the key
     *  TOSSessionDuration - Cookie that holds the overall time spent so far in the 
     *      session. It represents TOS (Time On Site) and not TOP (Time On Page)
     *  TOSUserId - It denotes whether the session is anonymous or authenticated. It has 
     *      two values: 1.'anonymous' 2.'userId' (actual userId set by application)
     *  TOSAnonSessionRefresh - A cookie to monitor session state. See below for explanation
     *  TOSIsCookieSupported - Cookie that checks if browser allows setting cookies
     */
    this.TOS_CONST = {
        TOSSessionKey: 'TOSSessionKey',
        TOSSessionDuration: 'TOSSessionDuration',
        TOSUserId: 'TOSUserId',
        TOSAnonSessionRefresh: 'TOSAnonSessionRefresh',
        TOSIsCookieSupported: 'TOSIsCookieSupported',
        TOSExtendSessionDuration: 'TOSExtendSessionDuration'
    };

    //TimeOnSiteTracker.js version
    this.version = '1.2.1';

    this.initialize(this.config);

};

/**
 * [initialize It reads the config and initializes the TOS tracking configuration]
 * @param  {[object]} config [application's configuration object for TOS tracking]
 */
TimeOnSiteTracker.prototype.initialize = function(config) {
    var self = this;
    //Enable "developer mode" to view TOS real-time internal data and logs
    if (config && config.developerMode) {
        this.developerMode = true;
        console.info('Timeonsitetracker.js loaded version : ' + this.getVersion());
    }

    //blacklisting of pages works only in non single-page apps
    if (config && (typeof config.trackHistoryChange == 'undefined')) {
        this.initBlacklistUrlConfig(config);

        if (!this.isTimeOnSiteAllowed) {
            return;
        }
    } else if (config && config.trackHistoryChange && (config.trackHistoryChange === true) && config.blacklistUrl) {
        console.warn('Blacklisting pages not available in single-page application.');
    }

    // bind to window close event
    if (this.isIOS()) {
        console.warn('No unload window for IOS devices but still handled by tracker!');
        this.handleIOSDevicesWindowUnload();
    } else {
        this.bindWindowUnload();
    }

    // bind to focus/blur window state
    this.bindWindowFocus();

    if (config && config.trackBy && (config.trackBy.toLowerCase() === 'seconds')) {
         this.returnInSeconds = true;
    }

    if (config && config.callback) {
        this.callback = config.callback;
    }

    if (config && config.trackHistoryChange && (config.trackHistoryChange === true)) {

        // bind to URL change event (without page refresh)
        //this.bindURLChange();
        this.bindWindowHistory();
    }

    this.TOSCookie.customCookieString = '';
    this.TOSCookie['PATH_DOMAIN_ENABLED'] = false;
    if (config && config.TOSCookie) {

        //seting cookie path if given
        if (config.TOSCookie.path && config.TOSCookie.path != '/') {
            this.TOSCookie.customCookieString += 'path=' + this.validateCookieInput(config.TOSCookie.path) + ';';
            this.TOSCookie['PATH_DOMAIN_ENABLED'] = true;
        } else {
            // case: TOS Cookie object given but path not given
            this.TOSCookie.customCookieString += 'path=/;';
        }

        //seting cookie domain if given
        if (config.TOSCookie.domain) {
            this.TOSCookie.customCookieString += 'domain=' + this.validateCookieInput(config.TOSCookie.domain) + ';';
            this.TOSCookie['PATH_DOMAIN_ENABLED'] = true;
        }
    } else {
        this.TOSCookie.customCookieString += 'path=/;';
    }

    // SameSite attribute enforcement as directed by major browser vendors
    this.TOSCookie.customCookieString += 'SameSite=Lax;';

    //setting secure cookie if given & site accessed as https
    if (location.protocol == 'https:') {
        this.TOSCookie.customCookieString += 'secure;';
    }

    /**
     * if either domain name or path is set by user for TOS cookie, then TOS cookie 
     * names are suffixed unique string to avoid cookie name clashes that may 
     * raise when another page sets base path "/" in TOS cookie.
     */
    if (this.TOSCookie['PATH_DOMAIN_ENABLED'] === true)
    {
        var TOSCookieSuffix = this.getMD5Hash(this.TOSCookie.customCookieString);
        this.TOS_CONST.TOSSessionKey = this.TOS_CONST.TOSSessionKey + '_' + TOSCookieSuffix;
        this.TOS_CONST.TOSSessionDuration = this.TOS_CONST.TOSSessionDuration + '_' + TOSCookieSuffix;
        this.TOS_CONST.TOSUserId = this.TOS_CONST.TOSUserId + '_' + TOSCookieSuffix;
        this.TOS_CONST.TOSAnonSessionRefresh = this.TOS_CONST.TOSAnonSessionRefresh + '_' + TOSCookieSuffix;
        this.TOS_CONST.TOSIsCookieSupported = this.TOS_CONST.TOSIsCookieSupported + '_' + TOSCookieSuffix;
        this.TOS_CONST.TOSExtendSessionDuration = this.TOS_CONST.TOSExtendSessionDuration + '_' + TOSCookieSuffix;
    }

    if (config && config.request && config.request.url) {
        this.request.url = config.request.url;
        this.isURLValid(this.request.url);

        // set if headers given
        if (config.request.headers && ((config.request.headers) instanceof Array)) {
            this.isRequestHeadersAvailable = true;
            this.request.headers = config.request.headers;
        }
    }

    // check Storage supported by browser
    if (this.isLocalStorageEnabled()) {
        this.storageSupported = true;
    } else {
        console.warn('Session/Local storage not supported by this browser.');
    }

    if ((config && config.request && config.request.url) && this.storageSupported && (this.callback === null)) {
        this.storeInLocalStorage = true;

        //process any saved data in local storage
        this.processDataInLocalStorage();
    }

    if (!(config && config.request && config.request.url) && (this.callback === null)) {
        console.warn('TOS data won\'t be available because neither callback nor local storage option given!');
    }

    if ((config && config.request && config.request.url) && this.callback) {
        console.warn('Both callback and local storage options given. Callback function takes precedence. Give either one!');
    }

    if (config && config.isIOSDemo) {
        this.isFlushSampleDataIOS = true;
    }

    this.checkCookieSupport();

    // create and monitor TOS session
    this.monitorUser();

    this.monitorSession();

    this.monitorSessionStateChange();

    if (this.developerMode) {
        console.info('TOS cookie created with path/domain : ' + this.TOSCookie.customCookieString);
    }

    this.fileValidation();

    if (this.developerMode) {
        setInterval(function() {
            self.showProgress();
        }, (1 * 1000));
    }

    this.flushDemoDataIOS();
    
    this.stampImprint();

};

/**
 * [getTimeDiff It gives difference in time between two date objects]
 * @param  {[date]} startTime [a date object parameter]
 * @param  {[date]} endTime   [a date object parameter]
 * @return {[integer]}           [time difference between two date objects]
 */
TimeOnSiteTracker.prototype.getTimeDiff = function(startTime, endTime) {
    return (endTime - startTime);
};

/**
 * [validateCookieInput Checks if cookie input ends with ';' and removes it]
 * @param  {[string]} cookieVal [The cookie input]
 * @return {[string]}     [The sanitized input]
 */
TimeOnSiteTracker.prototype.validateCookieInput = function(cookieVal) {
    if (cookieVal && cookieVal.length && (cookieVal.substring(cookieVal.length - 1) === ';')) {
        cookieVal = cookieVal.substring(0, cookieVal.length - 1);
    }
    return cookieVal;
};

/**
 * [isIOS It returns whether the device is IOS or not]
 * @return {[boolean]} [device detection check]
 */
TimeOnSiteTracker.prototype.isIOS = function() {
    return (
        /iPad|iPhone|iPod/i.test(navigator.platform)
        // safari browser on desktop only 
        // (/Safari/i.test(navigator.userAgent) && /Apple Computer/i.test(navigator.vendor) && !/Mobi|Android/i.test(navigator.userAgent)) ||
        // safari browser on any Apple device 
        // (/Safari/i.test(navigator.userAgent) && /Apple Computer/i.test(navigator.vendor) ||
        // /Apple Computer/i.test(navigator.vendor) ||
        // (/MacIntel/i.test(navigator.platform) && navigator.maxTouchPoints > 1)
    ) && !window.MSStream
    
    
    /* TEMP to removed*/ 
    // return true;
    /* TEMP to removed*/   
};

TimeOnSiteTracker.prototype.handleIOSDevicesWindowUnload = function() {
    var self = this;
    if (this.isIOS())  {
        console.log('IOS: IOS device loaded!');

        this.handleDateKeysInit();

        setInterval(function() {
            self.monitorSession();
            var data = self.getTimeOnPage();
            
            data.exitTime = self.getDateTime();
        
            /**
             * execute callback if given in config
             */
            if (self.isTimeOnSiteAllowed) {
                if (typeof self.callback === 'function') {
                    console.warn('IOS: Real-time callback not supported due to poor unload event support!');
                
                } else if (self.storeInLocalStorage) {
                    console.log('IOS: UPSERT to LS called at ' + new Date());
                    self.upsertToLocalStorageIOS(data); 
                }
            }
        }, (1 * 1000)); // update TOSSessionDuration cookie every (1) second(s)
    }
};

// TimeOnSiteTracker.prototype.addTimeSpent = function(a, b) {
//     return a + b;
// };

/**
 * [arrayAggregate Method to get addition of time data]
 * @param  {[array]} arr [array of time data]
 * @return {[integer]}     [count of all time data in given array]
 */
TimeOnSiteTracker.prototype.arrayAggregate = function(arr) {
    var sum = 0;
    for (var i = 0; i < arr.length; i++) {
        sum = sum +  arr[i];
    }

    return sum;
};

/**
 * [isURLValid It checks if given string is valid URL]
 * @param  {[string]}  url [the domain URL]
 */
TimeOnSiteTracker.prototype.isURLValid = function(url) {
    var regexp = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/;
    if (!regexp.test(url)) {
        console.error('Given URL is not in valid format : "' + url + '"');
    }
};

/**
 * [createTOSId Creates a new TOSId that is unique for each tos/activity record]
 * @return {[integer]} [TOS ID; It may have length (digit size) 16 to 18]
 */
TimeOnSiteTracker.prototype.createTOSId = function() {
    return new Date().valueOf() * Math.floor((Math.random() * 9010) + 1000);
};

/**
 * [millisecondToSecond It converts given time parameter from millisecond to second]
 * @param  {[integer]} millsec [time in milliseconds]
 * @return {[integer]}         [converted value in seconds]
 */
TimeOnSiteTracker.prototype.millisecondToSecond = function (millsec) {
  return (millsec / 1000);
};

/**
 * [secondToDuration It converts given seconds to dd:hh:mm:ss format]
 * @param  {[integer]} sec [time parameter in seconds]
 * @return {[string]}     [time in dd:hh:mm:ss format]
 */
TimeOnSiteTracker.prototype.secondToDuration = function (sec) {
  return (parseInt(sec / 86400) + 'd ' + (new Date(sec%86400*1000)).toUTCString().replace(/.*(\d{2}):(\d{2}):(\d{2}).*/, "$1h $2m $3s"));
};

/**
 * [getDateTime returns date time in most-widely used format YYYY-MM-DD HH:MM:SS.SSS]
 * @return {[string]} [date time in specific format]
 */
TimeOnSiteTracker.prototype.getDateTime = function () {
    return (new Date()).toISOString().substr(0, 23).replace('T', ' ');
};

/**
 * [getVersion It returns the version of the TimeOnSiteTracker.js]
 * @return {[string]} [the version]
 */
TimeOnSiteTracker.prototype.getVersion = function() {
    return this.version;
};

/**
 * [getTOSSessionKey It returns current TOS session key of user]
 * @return {[string]} [TOS session key]
 */
TimeOnSiteTracker.prototype.getTOSSessionKey = function() {
    return this.TOSSessionKey;
};

/**
 * [createTOSSessionKey It creates TOS session key for current session]
 * @return {[string]} [TOS session key; It may have string length between 20 to 25]
 */
TimeOnSiteTracker.prototype.createTOSSessionKey = function() {
    var date = new Date(),
        millisec = date.getMilliseconds() + '';
    return (Math.floor((Math.random() * 9010) + 1000)) + '' + (++date) + millisec + (Math.floor((Math.random() * 90) + 10));
};

/**
 * [startSession It starts authenticated user session. Its TOSUserId is usually set to app user ID]
 * @param  {[string]} userId [Application user ID]
 */
TimeOnSiteTracker.prototype.startSession = function(userId) {
    if (userId && (userId.toString()).length) {
        //process data accumulated so far before starting new session
        this.monitorSession();
        this.processTOSData();

        // create new authenticated TOS session
        /**
         *  TOSAnonSessionRefresh cookie is a state watcher cookie. Fixes multi-tab 
         *  session state overwrite problem.
         *   
         *  TOSAnonSessionRefresh = 1 (Session is anonymous. Anonymous session cookie
         *   is allowed to be refreshed periodically)
         *  TOSAnonSessionRefresh = 0 (Session is authenticated. Anonymous session cookie 
         *  is not allowed to be refreshed periodically)
         */
        this.setCookie(this.TOS_CONST.TOSAnonSessionRefresh, 0, this.sessionValidity.oneDayInSecs);
        this.TOSUserId = userId;
        this.setCookie(this.TOS_CONST.TOSUserId, userId, this.sessionValidity.oneDayInSecs);
        this.createNewSession();
    } else {
        console.warn('Please give proper userId to start TOS session.');
    }

};

/**
 * [endSession It ends authenticated user session. Usually, it needs to be called 
 * when "logout" action occurs in the application]
 */
TimeOnSiteTracker.prototype.endSession = function() {
    var self = this;
    //process data accumulated so far before ending session
    this.monitorSession();
    this.processTOSData();

    // remove session data
    this.removeCookie(this.TOS_CONST.TOSUserId);
    this.removeCookie(this.TOS_CONST.TOSSessionKey);
    this.removeCookie(this.TOS_CONST.TOSSessionDuration);
    setTimeout(function() {
        self.removeCookie(self.TOS_CONST.TOSExtendSessionDuration);
    }, 500); // little delay to safely remove TOSExtendSessionDuration cookie
    

    //create new TOS session
    this.TOSUserId = 'anonymous';

    this.createNewSession('anonymous');

};

/**
 * [showProgress It shows the real-time TOP (Time on page) in browser console]
 */
TimeOnSiteTracker.prototype.showProgress = function() {
    var d = this.getTimeOnPage();
    console.log('TimeOnPage(TOP): ' + d.timeOnPage + ' ' + d.timeOnPageTrackedBy);
};

/**
 * [stampImprint Imprints "TimeOnSite Tracker" in browser console]
 */
TimeOnSiteTracker.prototype.stampImprint = function() {
    var colorArr = ['#008000', '#a900ff', '#0400f5', '#d60000', '#000000', '#ffffff'],
        colorIndex = Math.floor((Math.random() * 6) + 0);
    console.log('%cTimeOnSite Tracker', 'font-size: 40px; font-family: Georgia; color: ' + colorArr[colorIndex] + ';font-style:italic;text-shadow: 0 1px 0 #999999, 0 2px 0 #888888,0 3px 0 #777777, 0 4px 0 #666666,0 5px 0 #555555, 0 6px 0 #444444,0 7px 0 #333333, 0 8px 7px rgba(0, 0, 0, 0.4),0 9px 10px rgba(0, 0, 0, 0.2)');
};

/**
 * [checkCookieSupport Checks if the browser allows to set and retrieve cookies]
 */
TimeOnSiteTracker.prototype.checkCookieSupport = function() {
    var self = this;

    if (!this.getCookie(this.TOS_CONST.TOSIsCookieSupported)) {
        this.setCookie(this.TOS_CONST.TOSIsCookieSupported, 'yes', this.sessionValidity.oneMonthInSeconds);

        setTimeout(function() {
            if (!self.getCookie(self.TOS_CONST.TOSIsCookieSupported)) {
                console.error('Setting cookie not supported by this browser. Exiting TOS...');
                self.isTimeOnSiteAllowed = false;
            }
        }, (2 * 1000)); // Check 2 seconds after setting cookie
    }
};

/**
 * [extendSession Method to extend or renew existing authenticated user session]
 * @param  {[integer]} seconds [the cookie expiry time in seconds]
 */
TimeOnSiteTracker.prototype.extendSession = function(seconds) {
    if ((typeof seconds === 'number') && this.getCookie(this.TOS_CONST.TOSUserId)) {
        var expiryTime = parseInt(seconds),
            duration = this.getSessionDuration();

        if (duration) {
            duration = parseInt(duration);
        } else {
            duration = 0;
        }

        this.setCookie(this.TOS_CONST.TOSUserId, this.TOSUserId, expiryTime);
        this.setCookie(this.TOS_CONST.TOSSessionKey, this.TOSSessionKey, expiryTime);
        this.setCookie(this.TOS_CONST.TOSSessionDuration, duration, expiryTime);
        this.setCookie(this.TOS_CONST.TOSAnonSessionRefresh, 0, expiryTime);
        // Storing the inital extend session duration for later use; value given by user
        this.setCookie(this.TOS_CONST.TOSExtendSessionDuration, expiryTime, expiryTime);

        var t = new Date();
        t.setTime(t.getTime() + (expiryTime * 1000));
        console.info('Session extended till ' + new Date(t));

    } else {
        console.warn('Either anonymous session detected or given input seconds is not a number!');
    }
};

/**
 * [initBlacklistUrlConfig It checks if the current page is allowed to be tracked TOS with user configuration object]
 * @param  {[object]} config [TOS config object; passed during TimeOnSiteTracker initialization]
 */
TimeOnSiteTracker.prototype.initBlacklistUrlConfig = function(config) {
    if (config && config.blacklistUrl) {

        if (!((config.blacklistUrl) instanceof Array)) {
            console.warn('blacklistUrl configuration must be of type array');
        }

        if (((config.blacklistUrl) instanceof Array) && (config.blacklistUrl).length) {
            if (!this.checkBlacklistUrl(config.blacklistUrl)) {
                console.info('This page is blacklisted for tracking TOS!');
                this.isTimeOnSiteAllowed = false;
            }
        }
    }
};

/**
 * [monitorUser It checks if user is anonymous or authenticated on page load and at initialization]
 */
TimeOnSiteTracker.prototype.monitorUser = function() {
    var authenticatedUser = this.getCookie(this.TOS_CONST.TOSUserId),
        sessionKey = this.getCookie(this.TOS_CONST.TOSSessionKey);

    if (authenticatedUser && authenticatedUser.length) {
        //Set session key only if is valid and has length property to avoid empty sessionkey issue
        this.TOSSessionKey = ((sessionKey && sessionKey.length) ? sessionKey : this.TOSSessionKey);
        this.TOSUserId = authenticatedUser;
        if (this.developerMode) {
            console.info('Authenticated user. TOSSessionKey: ' + this.TOSSessionKey + ' & TOSUserId: ' + this.TOSUserId);
        }

    } else if (sessionKey && (!authenticatedUser)) {
        if (this.developerMode) {
            console.info('Anonymous user. TOSSessionKey: ' + sessionKey);
        }
        //Set session key only if is valid and has length property to avoid empty sessionkey issue
        this.TOSSessionKey = ((sessionKey && sessionKey.length) ? sessionKey : this.TOSSessionKey);
        this.renewSession();

    } else {
        this.createNewSession('anonymous');
    }

};

/**
 * [monitorSession It updates current TOP data in global cookie data before page 
 * is loaded for first time, closed or reloaded]
 */
TimeOnSiteTracker.prototype.monitorSession = function() {
        var sessionDuration = this.getSessionDuration(),
        sessionKey = this.getCookie(this.TOS_CONST.TOSSessionKey),
        authenticatedUser = this.getCookie(this.TOS_CONST.TOSUserId),
        pageData,
        count = 0;

    if (!sessionKey) {
        console.error('Caution! sessionKey empty at : '+new Date());
        sessionKey = this.reviveBrokenSession();

        if (this.developerMode) {
            alert('Caution! sessionKey empty at : '+new Date());
        }
    }

    pageData = this.getTimeOnPage();
    sessionDuration = parseInt(sessionDuration);
    //console.error('count : ' + ' top : ' + pageData.timeOnPage + 'sessionDuration: ' + sessionDuration);
    
    /* for IOS, we set current sessionDuration from cookie directly since it's real-time
    but it can be little incorrect/slow by milliseconds in 
    (Tos.getTimeOnPage()).timeOnSite API but accurate in data received through backend data.
    */
    if (this.isIOS()) {
        count = this.getTimeOnSiteCurrentSessionIOS();
        console.log('IOS: periodic updated duration value : ' + count);
    } else {
        count = pageData.timeOnPage + sessionDuration;
    }
    
    this.TOSSessionKey = ((sessionKey && sessionKey.length) ? sessionKey : this.TOSSessionKey);

    /* TOSSessionDuration's extended expiry time (value gained through extendSession() call) in 
    cookie is overwritten on pageload. To overcome this, we save the persistent 
    extendSessionDuration value in cookie and unitlize on monitorSession()*/
    if (authenticatedUser && authenticatedUser.length) {
        var extendSessionDuration = this.getCookie(this.TOS_CONST.TOSExtendSessionDuration);
        if (extendSessionDuration) {
            extendSessionDuration = parseInt(extendSessionDuration);
        } else {
            extendSessionDuration = this.sessionValidity.oneDayInSecs;
        }
        this.setCookie(this.TOS_CONST.TOSSessionDuration, count, extendSessionDuration);
    } else {
        this.setCookie(this.TOS_CONST.TOSSessionDuration, count, this.sessionValidity.oneDayInSecs);
    }

    // Here, timeOnPageTrackedBy is "milliseconds" and is less than 1000 milliseconds/1 second
    if (!this.returnInSeconds && count < 1000) {
        /*
            When tracking in default mode(millisecond), immediately after initialization, 
            initial count variable value may be less than (1000 milliseconds/1 second), 
            this trivial milliseconds value should not be assigned to timeOnSite variable to 
            prevent incorrect "timeOnSite" and "timeOnSiteByDuration" parameter data.
            code => //this.timeOnSite=count; or this.timeOnSite = 0; will fix the issue.
         */
        //this.timeOnSite = count;
    } else {
        this.timeOnSite = count;
    }

};

/**
 * [createNewSession It creates new TOS session either anonymous or authenticated]
 * @param  {[string]} userType [usually "anonymous" user]
 */
TimeOnSiteTracker.prototype.createNewSession = function(userType) {
    this.setCookie(this.TOS_CONST.TOSSessionDuration, 0, this.sessionValidity.oneDayInSecs);
    this.TOSId = this.createTOSId();
    this.TOSSessionKey = this.createTOSSessionKey();
    
    if (userType === 'anonymous') {
        this.setCookie(this.TOS_CONST.TOSSessionKey, this.TOSSessionKey, this.sessionValidity.anonymous);
        this.setCookie(this.TOS_CONST.TOSAnonSessionRefresh, 1, this.sessionValidity.oneDayInSecs);
        this.renewSession();
    } else {
        if (this.anonymousTimerId) {
            clearInterval(this.anonymousTimerId);
        }

        //authenticated users session extends till the next day
        this.setCookie(this.TOS_CONST.TOSSessionKey, this.TOSSessionKey, this.sessionValidity.oneDayInSecs);
    }

    this.timeOnSite = 0;

};

/**
 * [renewSession Keeps anonymous session key alive for a specific duration]
 */
TimeOnSiteTracker.prototype.renewSession = function() {
    var self = this,
        refreshState;
    this.anonymousTimerId = setInterval(function() {

        refreshState = self.getCookie(self.TOS_CONST.TOSAnonSessionRefresh);
        /**
         * Checks if user session is anonymous before altering cookie 
         * lifetime for preventing multi-tab session overwrite issue 
         */
        if (refreshState == 1) {
            self.setCookie(self.TOS_CONST.TOSSessionKey, self.TOSSessionKey, self.sessionValidity.anonymous);

            if (self.developerMode) {
                console.log('Session renewed at : ' + (new Date()));
            }
        }
    }, (1 * 1000)); //anonymous user cookie is refreshed every second
};

/**
 * [monitorSessionStateChange Method to ensure session key and ID consistency]
 *
 * When multiple browser tabs are opened and user is logged out in one of the tabs, then 
 * all other pages are updated to be anonymous and vice versa to ensure session
 * consistency in multi-tab environment.
 */
TimeOnSiteTracker.prototype.monitorSessionStateChange = function() {
    var self = this,
        newSessionKey,
        newUserId;
        
    this.sessionStateChangeTimerId = setInterval(function() {
        newSessionKey = self.getCookie(self.TOS_CONST.TOSSessionKey),
        newUserId = self.getCookie(self.TOS_CONST.TOSUserId);

        //console.info('Old session & user : ', self.TOSSessionKey, self.TOSUserId);
        if (newSessionKey) {
            self.TOSSessionKey = newSessionKey;
        }

        if (newUserId) {
            self.TOSUserId = newUserId;
        } else {
            self.TOSUserId = 'anonymous';
        }

        //console.info('New session & user : ', self.TOSSessionKey, self.TOSUserId);
    }, (1.5 * 1000));

};

/**
 * [getSessionDuration gets session duration from cookie & validating against NaN
 * and other unintended data return types like null, undefined etc. when browser
 * tabs are in active & passive modes]
 * @return {[integer]} [sessionDuration]
 */
TimeOnSiteTracker.prototype.getSessionDuration = function() {
    var sessionDuration = this.getCookie(this.TOS_CONST.TOSSessionDuration);
    if (isNaN(sessionDuration) || sessionDuration == undefined ||
        sessionDuration == 'undefined' || sessionDuration == null ||
        sessionDuration == '') {
        if (this.developerMode) {
            console.error('TOSSessionDuration cookie broken due to unknown reasons! Sending back safe value(numeric)');
        }
        var pageData = this.getTimeOnPage();
        //session duration as timeOnPage for the sake of showing 
        //real-time matching top/tos values in case of NaN/cookie failure issues 
        return pageData.timeOnPage;
    }
    return parseInt(sessionDuration);

};

/**
 * [getDateDiffIndays gets time period difference in days between page entry time and
 * current time. reviveBrokenSession logic for anonymous user only]
 * @return {[integer]} [time period in days]
 */
// console.log(getDateDiffIndays(Tos.getTimeOnPage().entryTime, Tos.getTimeOnPage().currentTime));
TimeOnSiteTracker.prototype.getDateDiffIndays = function(d1, d2) {
    var diff = Date.parse(d2) - Date.parse(d1);
    return Math.floor(diff / 86400000);
}


/**
 * [reviveBrokenSession when session key is broken due to device behaviour, it tries 
 * to restore it - for now; "anonymous" only & experimental]
 */
TimeOnSiteTracker.prototype.reviveBrokenSession = function() {
    if (!this.getCookie(this.TOS_CONST.TOSUserId)) { /* anonymous check */
        var entryToCurrentTimeDiffInDays = this.getDateDiffIndays(this.getTimeOnPage().entryTime, this.getTimeOnPage().currentTime);
        console.info('reviveBrokenSession: Days diff count ' + entryToCurrentTimeDiffInDays);

        if (entryToCurrentTimeDiffInDays < 1) {
            // session key broken on same day of the session
            this.setCookie(this.TOS_CONST.TOSSessionKey, this.TOSSessionKey, this.sessionValidity.anonymous);
            console.error('reviveBrokenSession (same day, status:ok): TOSSessionKey ' + this.TOSSessionKey);
        } else {
            /* time period lapsed >= 1 day(s) since the sesssion key broken 
            for an anonymous session */
            
            // stop any old timers if any this.createNewSession() API will now create a fresh one.
            if (this.anonymousTimerId) {
                clearInterval(this.anonymousTimerId);
            }

            /**
             * "anonymous" only
             * Instead of merely creating new sessionKey for the broken session, it's better to 
             * create newSession function because the time lapsed can be more than 
             * 1 day or many days. In this case,
             * all params need to be refreshed i.e sessionKey, sessionDuration, anonymousTimerId
             * etc. because all are now gone post the long inactive period.
             */
            this.createNewSession('anonymous');

            console.error('reviveBrokenSession  (More than one day, status:ok): TOSSessionKey ' + this.TOSSessionKey);
        }
        
    }
    return this.TOSSessionKey;

};

// URL blacklisting from tracking in "Time on site"
/**
 * [checkBlacklistUrl It checks if current page is black-listed by user]
 * @param  {[string]} blacklistUrl [Array of URLs that needs to be blacklisted]
 * @return {[boolean]}              [returns false if current page is found in blacklistUrl array]
 */
TimeOnSiteTracker.prototype.checkBlacklistUrl = function(blacklistUrl) {
    var currentPage = decodeURI(document.URL);
    for (var i = 0; i < blacklistUrl.length; i++) {
        if (blacklistUrl[i] === currentPage) {
            return false;
        }
    }
    return true;

};

/**
 * [getPageData It returns a part of TOP data]
 * @return {[object]} [part of TOP data]
 */
TimeOnSiteTracker.prototype.getPageData = function() {
    var page = {};
    page.TOSId = this.TOSId;
    page.TOSSessionKey = this.TOSSessionKey;
    page.TOSUserId = this.TOSUserId;
    page.URL = decodeURI(document.URL);
    page.title = document.title;
    return page;

};

/**
 * [getTimeOnPage It returns actual TOP-Time On Page data]
 * @return {[object]} [TOP data]
 */
TimeOnSiteTracker.prototype.getTimeOnPage = function() {
    var currentTime = new Date(),
        newTimeSpent = 0,
        page;

    if (this.timeSpentArr.length) {
        this.totalTimeSpent =  this.arrayAggregate(this.timeSpentArr);
    }

    if (this.returnInSeconds) {
        newTimeSpent = this.totalTimeSpent + ((this.getTimeDiff(this.varyingStartTime, currentTime))/1000);
    } else {
        newTimeSpent = this.totalTimeSpent + (this.getTimeDiff(this.varyingStartTime, currentTime));
    }

    page = this.getPageData();

    // get custom data
    page = this.mergeCustomData(page);

    page.entryTime = this.pageEntryTime;
    page.currentTime = this.getDateTime();
    page.timeOnPage = Math.round(newTimeSpent);
    page.timeOnPageTrackedBy = ((this.returnInSeconds === true) ? 'second' : 'millisecond');
    page.timeOnSite = this.timeOnSite;
    page.timeOnPageByDuration = ((this.returnInSeconds === true) ? this.secondToDuration(page.timeOnPage) : this.secondToDuration(this.millisecondToSecond(page.timeOnPage)));
    page.timeOnSiteByDuration = ((this.returnInSeconds === true) ? this.secondToDuration(page.timeOnSite) : this.secondToDuration(this.millisecondToSecond(page.timeOnSite)));
    page.trackingType = 'tos';

    return page;
    
};

/**
 * [mergeCustomData It merges custom data set by user with TOP data]
 * @param  {[object]} data [user-defined/custom data]
 * @return {[object]}      [TOP data along with custom data if any]
 */
TimeOnSiteTracker.prototype.mergeCustomData = function(data) {
    if (this.customData) {
        for (var key in this.customData) {
            data[key] = this.customData[key];
        }
    }
    return data;
};

/**
 * [setCustomData It adds custom data to TOP data object if given by user]
 * @param {[object]} data [user-defined/custom data]
 */
TimeOnSiteTracker.prototype.setCustomData = function(data) {
    if (data && Object.keys(data).length) {
        this.customData = data;
    } else {
        console.warn('Custom data should be of type object!');
    }
};

/**
 * [unsetCustomData It removes the custom data from TOP data object if already set by user]
 */
TimeOnSiteTracker.prototype.unsetCustomData = function() {
    this.customData = null;
};

/**
 * [getMD5Hash Given a string, returns its md5 hash]
 * @return {[string]}
 */
TimeOnSiteTracker.prototype.getMD5Hash = function(s){function L(k,d){return(k<<d)|(k>>>(32-d))}function K(G,k){var I,d,F,H,x;F=(G&2147483648);H=(k&2147483648);I=(G&1073741824);d=(k&1073741824);x=(G&1073741823)+(k&1073741823);if(I&d){return(x^2147483648^F^H)}if(I|d){if(x&1073741824){return(x^3221225472^F^H)}else{return(x^1073741824^F^H)}}else{return(x^F^H)}}function r(d,F,k){return(d&F)|((~d)&k)}function q(d,F,k){return(d&k)|(F&(~k))}function p(d,F,k){return(d^F^k)}function n(d,F,k){return(F^(d|(~k)))}function u(G,F,aa,Z,k,H,I){G=K(G,K(K(r(F,aa,Z),k),I));return K(L(G,H),F)}function f(G,F,aa,Z,k,H,I){G=K(G,K(K(q(F,aa,Z),k),I));return K(L(G,H),F)}function D(G,F,aa,Z,k,H,I){G=K(G,K(K(p(F,aa,Z),k),I));return K(L(G,H),F)}function t(G,F,aa,Z,k,H,I){G=K(G,K(K(n(F,aa,Z),k),I));return K(L(G,H),F)}function e(G){var Z;var F=G.length;var x=F+8;var k=(x-(x%64))/64;var I=(k+1)*16;var aa=Array(I-1);var d=0;var H=0;while(H<F){Z=(H-(H%4))/4;d=(H%4)*8;aa[Z]=(aa[Z]| (G.charCodeAt(H)<<d));H++}Z=(H-(H%4))/4;d=(H%4)*8;aa[Z]=aa[Z]|(128<<d);aa[I-2]=F<<3;aa[I-1]=F>>>29;return aa}function B(x){var k="",F="",G,d;for(d=0;d<=3;d++){G=(x>>>(d*8))&255;F="0"+G.toString(16);k=k+F.substr(F.length-2,2)}return k}function J(k){k=k.replace(/rn/g,"n");var d="";for(var F=0;F<k.length;F++){var x=k.charCodeAt(F);if(x<128){d+=String.fromCharCode(x)}else{if((x>127)&&(x<2048)){d+=String.fromCharCode((x>>6)|192);d+=String.fromCharCode((x&63)|128)}else{d+=String.fromCharCode((x>>12)|224);d+=String.fromCharCode(((x>>6)&63)|128);d+=String.fromCharCode((x&63)|128)}}}return d}var C=Array();var P,h,E,v,g,Y,X,W,V;var S=7,Q=12,N=17,M=22;var A=5,z=9,y=14,w=20;var o=4,m=11,l=16,j=23;var U=6,T=10,R=15,O=21;s=J(s);C=e(s);Y=1732584193;X=4023233417;W=2562383102;V=271733878;for(P=0;P<C.length;P+=16){h=Y;E=X;v=W;g=V;Y=u(Y,X,W,V,C[P+0],S,3614090360);V=u(V,Y,X,W,C[P+1],Q,3905402710);W=u(W,V,Y,X,C[P+2],N,606105819);X=u(X,W,V,Y,C[P+3],M,3250441966);Y=u(Y,X,W,V,C[P+4],S,4118548399);V=u(V,Y,X,W,C[P+5],Q,1200080426);W=u(W,V,Y,X,C[P+6],N,2821735955);X=u(X,W,V,Y,C[P+7],M,4249261313);Y=u(Y,X,W,V,C[P+8],S,1770035416);V=u(V,Y,X,W,C[P+9],Q,2336552879);W=u(W,V,Y,X,C[P+10],N,4294925233);X=u(X,W,V,Y,C[P+11],M,2304563134);Y=u(Y,X,W,V,C[P+12],S,1804603682);V=u(V,Y,X,W,C[P+13],Q,4254626195);W=u(W,V,Y,X,C[P+14],N,2792965006);X=u(X,W,V,Y,C[P+15],M,1236535329);Y=f(Y,X,W,V,C[P+1],A,4129170786);V=f(V,Y,X,W,C[P+6],z,3225465664);W=f(W,V,Y,X,C[P+11],y,643717713);X=f(X,W,V,Y,C[P+0],w,3921069994);Y=f(Y,X,W,V,C[P+5],A,3593408605);V=f(V,Y,X,W,C[P+10],z,38016083);W=f(W,V,Y,X,C[P+15],y,3634488961);X=f(X,W,V,Y,C[P+4],w,3889429448);Y=f(Y,X,W,V,C[P+9],A,568446438);V=f(V,Y,X,W,C[P+14],z,3275163606);W=f(W,V,Y,X,C[P+3],y,4107603335);X=f(X,W,V,Y,C[P+8],w,1163531501);Y=f(Y,X,W,V,C[P+13],A,2850285829);V=f(V,Y,X,W,C[P+2],z,4243563512);W=f(W,V,Y,X,C[P+7],y,1735328473);X=f(X,W,V,Y,C[P+12],w,2368359562);Y=D(Y,X,W,V,C[P+5],o,4294588738);V=D(V,Y,X,W,C[P+8],m,2272392833);W=D(W,V,Y,X,C[P+11],l,1839030562);X=D(X,W,V,Y,C[P+14],j,4259657740);Y=D(Y,X,W,V,C[P+1],o,2763975236);V=D(V,Y,X,W,C[P+4],m,1272893353);W=D(W,V,Y,X,C[P+7],l,4139469664);X=D(X,W,V,Y,C[P+10],j,3200236656);Y=D(Y,X,W,V,C[P+13],o,681279174);V=D(V,Y,X,W,C[P+0],m,3936430074);W=D(W,V,Y,X,C[P+3],l,3572445317);X=D(X,W,V,Y,C[P+6],j,76029189);Y=D(Y,X,W,V,C[P+9],o,3654602809);V=D(V,Y,X,W,C[P+12],m,3873151461);W=D(W,V,Y,X,C[P+15],l,530742520);X=D(X,W,V,Y,C[P+2],j,3299628645);Y=t(Y,X,W,V,C[P+0],U,4096336452);V=t(V,Y,X,W,C[P+7],T,1126891415);W=t(W,V,Y,X,C[P+14],R,2878612391);X=t(X,W,V,Y,C[P+5],O,4237533241);Y=t(Y,X,W,V,C[P+12],U,1700485571);V=t(V,Y,X,W,C[P+3],T,2399980690);W=t(W,V,Y,X,C[P+10],R,4293915773);X=t(X,W,V,Y,C[P+1],O,2240044497);Y=t(Y,X,W,V,C[P+8],U,1873313359);V=t(V,Y,X,W,C[P+15],T,4264355552);W=t(W,V,Y,X,C[P+6],R,2734768916);X=t(X,W,V,Y,C[P+13],O,1309151649);Y=t(Y,X,W,V,C[P+4],U,4149444226);V=t(V,Y,X,W,C[P+11],T,3174756917);W=t(W,V,Y,X,C[P+2],R,718787259);X=t(X,W,V,Y,C[P+9],O,3951481745);Y=K(Y,h);X=K(X,E);W=K(W,v);V=K(V,g)}var i=B(Y)+B(X)+B(W)+B(V);return i.toLowerCase()};

/**
 * [resetActivity It is used for both initializing and resetting activity varibales]
 */
TimeOnSiteTracker.prototype.resetActivity = function() {
    this.activityStartTime = this.getDateTime();
    this.activity.varyingStartTime = new Date();
    this.activity.totalTimeSpent = 0;
    this.activity.totalTimeSpentArr = [];
};

/**
 * [startActivity Method to initiate TOS activity tracking]
 * @param  {[object]} activityDetails [object of activity data. Optional field]
 */
TimeOnSiteTracker.prototype.startActivity = function(activityDetails) {
    this.resetActivity();
    this.activity.activityStarted = true;

    if (activityDetails && Object.keys(activityDetails).length) {
        this.startActivityDetails = activityDetails;
    }

    if (this.developerMode) {
        console.log('Activity starts at : ' + this.activity.varyingStartTime);
    }
};

/**
 * [endActivity It ends already started activity tracking]
 * @param  {[object]} activityDetails [custom data that is set by user while tracking activity. Optional field]
 * @param  {[boolean]} manualProcess   [If it is set to true, then data is neither sent to 
 *     callback nor to local storage. Application can use the returned activity data 
 *     directly for further processing]
 * @return {[object]}                 [activity tracking object]
 */
TimeOnSiteTracker.prototype.endActivity = function(activityDetails, manualProcess) {
    var page = {};

    //console.log(this.activity.varyingStartTime);
    if (this.activity.activityStarted) {
        var endActivityTime = new Date(),
            activityDuration = 0;

        if ((this.activity.totalTimeSpentArr).length) {
            this.activity.totalTimeSpent =  this.arrayAggregate(this.activity.totalTimeSpentArr);
        }

        if (this.returnInSeconds) {
            activityDuration = this.activity.totalTimeSpent + ((this.getTimeDiff(this.activity.varyingStartTime, endActivityTime))/1000);
        } else {
            activityDuration = this.activity.totalTimeSpent + this.getTimeDiff(this.activity.varyingStartTime, endActivityTime);
        }

        if (this.developerMode) {
            if (this.returnInSeconds) {
                console.log('Total time spent : ' + this.activity.totalTimeSpent + ' in array: '+ ((this.getTimeDiff(this.activity.varyingStartTime, endActivityTime))/1000));
            } else {
                console.log('Total time spent : ' + this.activity.totalTimeSpent + ' in array: '+ (this.getTimeDiff(this.activity.varyingStartTime, endActivityTime)));
            }
        }
        
        page = this.getPageData();
        /* Get new TOSId for this activity without affecting global TOSId (time-on-site specific) */
        page.TOSId = this.createTOSId();
        page.activityStart = this.activityStartTime;
        page.activityEnd = this.getDateTime();
        page.timeTaken = Math.round(activityDuration);
        page.timeTakenTrackedBy = ((this.returnInSeconds === true) ? 'second' : 'millisecond');
        page.timeTakenByDuration = ((this.returnInSeconds === true) ? this.secondToDuration(page.timeTaken) : this.secondToDuration(this.millisecondToSecond(page.timeTaken)));

        // set (start) activity details in response if given during activity initialization
        for (var key in this.startActivityDetails) {
            page[key] = this.startActivityDetails[key];
        }

        if (activityDetails && Object.keys(activityDetails).length) {
            for (var key in activityDetails) {
                page[key] = activityDetails[key];
            }
        }
        page.trackingType = 'activity';  

        this.activity.activityStarted = false;
        this.resetActivity();

        if (this.developerMode) {
            console.log('Activity ends at ' + (new Date()));
        }
        
        if (manualProcess) {
            // do nothing, application itself will handle the data as it likes with returned data.
        } else {
            this.processActivityData(page);
        }
        

    } else {
        console.warn('Please start activity before finishing it!');
    }

    return page;
};

/**
 * [processActivityData It sends back data to callback else it saves the data in local storage]
 * @param  {[object]} data [TOS activity data object]
 */
TimeOnSiteTracker.prototype.processActivityData = function(data) {
    if (typeof this.callback === 'function') {
        this.callback(data);
    } else if (this.storeInLocalStorage) {
        this.saveToLocalStorage(data);
    }
};

/**
 * [fileValidation It ensures integrity of TimeOnSiteTracker library]
 * @return {[void]}
 */
TimeOnSiteTracker.prototype.fileValidation = function() {
    var codeName = 'undefined';
    if (typeof TimeOnSiteTracker !== 'undefined') {
        codeName = 'TimeOnSiteTracker';
    }

    if (this.getMD5Hash(codeName) !== this.fileIntegrityCode) {
        //stop printing real-time TOS data and messages
        this.developerMode = false;
        this.isTimeOnSiteAllowed = false;
        if (this.sessionStateChangeTimerId) {
            clearInterval(this.sessionStateChangeTimerId);
        }
    }
};

/**
 * [trackPageNavigation This method is useful for handling (tracking TOS in) 
 * single-page app manually where page navigations may not be captured 
 * correctly with native Javascript API. In that case, call this method manually
 * on every page navigation as per your convenience. This method is not meant for 
 * full page refresh/page load since that is handled by TimeOnSiteTracker.js itself]
 */
TimeOnSiteTracker.prototype.trackPageNavigation = function() {
    this.executeURLChangeCustoms();
};

/**
 * [isLocalStorageEnabled checks if browser supports localStorage and turned on for storing data]
 * @return {boolean}
 */
TimeOnSiteTracker.prototype.isLocalStorageEnabled = function() {
    try {
        var _sample = '___localstorage_test___';
        localStorage.setItem(_sample, _sample);
        localStorage.removeItem(_sample);
        return true;
    } catch(e) {
        return false;
    }
};

/**
 * [handleDateKeysInit handles all date keys in Localstorage. Inserts current date key if 
 * not found in storage]
 * @return {[string]} [currentDayKey]
 */
TimeOnSiteTracker.prototype.handleDateKeysInit = function() {
    var currentDayKey = this.getCurrentDayKey(),
        keyFound = false,
        keyName = this.TOSDateKeysHolder,
        keyArr;

    keyArr = localStorage.getItem(keyName);
    if (keyArr) {
        var dateKeys = JSON.parse(keyArr);
        
        for (var j = 0; j < dateKeys.length; j++) {
            if (dateKeys[j] == currentDayKey) {
                keyFound = true;
                break; 
            }
        }

        if (!keyFound) {
            dateKeys.push(currentDayKey);
            localStorage.setItem(keyName, JSON.stringify(dateKeys));
        }
    } else {
        keyArr = [];
        keyArr.push(currentDayKey); 
        localStorage.setItem(keyName, JSON.stringify(keyArr));
    }
};

/**
 * [saveToLocalStorage It saves the TOP or activity data to local storage]
 * @param  {[object]} data [TOP or activity data]
 */
TimeOnSiteTracker.prototype.saveToLocalStorage = function(data) {
    if (this.storageSupported) {
        this.handleDateKeysInit();
        var currentDayKey = this.getCurrentDayKey();

        var item = localStorage.getItem(currentDayKey);
        if (item) {
            var oldItem = JSON.parse(item);
            oldItem.push(data);
            localStorage.setItem(currentDayKey, JSON.stringify(oldItem));
        } else {
            var newItem = [];
            newItem.push(data);
            localStorage.setItem(currentDayKey, JSON.stringify(newItem));
        }
    } else {
        console.warn('Local storage not supported for TimeOnSite tracking!');
    }

};

/**
 *[upsertToLocalStorageIOS It saves the TOP at (Nth index) or activity data to local storage ]
 * The behaviour for IOS/unload window event supportless/similar mobile/desktop devices. 
 * After pushing tos data to LS, we update its value in Nth index of the array 
 * holding this information.
 *
 * @param  {[object]} data [TOP or activity data]
 */
TimeOnSiteTracker.prototype.upsertToLocalStorageIOS = function(data) {
    if (this.storageSupported) {

        /* document.hasFocus() helps prevent updating the LocalStorage 
        continuously by other tabs thus reducing CPU processing overhead */
        if (document.hasFocus() === false) {
            // console.error('IOS: Blocked updating Storages since foucs status : ' + document.hasFocus());
            return;
        }

        var currentDayKey = this.getCurrentDayKey();
        data['lastUpdatedTimeStamp'] = new Date(); //set recently updated timestamp for each tos

        var item = localStorage.getItem(currentDayKey);
        if (item) {
            var dataItems = JSON.parse(item);
            console.log('IOS: existing data');
            console.log(JSON.stringify(dataItems));
            /* Instead of pushing new data, we update only single TOS entry in our array for today's date */
            console.error('IOS: *** currentSessionIOSRecentData ***');
            console.error(data);

            /*Same session, existing pages update block; preserve order; order: 1*/
            // console.error('IOS: Total length dataItems LS : ' + dataItems.length);
            for (var ii = 0; ii < dataItems.length; ii++) {
                if (data.TOSId == dataItems[ii].TOSId && 
                    data.TOSSessionKey === dataItems[ii].TOSSessionKey) {
                    console.error('IOS: Existing....TOSId : ' + data.TOSId + ', TOSSessionKey : ' + data.TOSSessionKey +', Index position : ' + ii);
                    dataItems[ii] = data;
                    localStorage.setItem(currentDayKey, JSON.stringify(dataItems));
                }
            }


            /*Same session, new page insert block; preserve order; order: 2*/
            var newTabFound = true;
            for (var ii = 0; ii < dataItems.length; ii++) {
                if (data.TOSId === dataItems[ii].TOSId) {
                    newTabFound = false;
                    break;
                }
            }
            if (newTabFound === true //new tab or page refresh found; so add it
                && dataItems.length >= 1 //ensure atleast one tos data is there in localstorage for current session
                && data.TOSSessionKey === this.getRecentSessionKeyIOS() //this new tab belongs to same session
                ) {
                console.error('IOS: Same SESSION TOSSessionKey : '+data.TOSSessionKey+ ', new PageRefresh/tab TOSId : '+data.TOSId);
                dataItems.push(data);
                localStorage.setItem(currentDayKey, JSON.stringify(dataItems));
            }


            /*New session, new page insert block; preserve order; order: 3*/
            var newSessionFound = true;
            for (var ii = 0; ii < dataItems.length; ii++) {
                if (data.TOSSessionKey === dataItems[ii].TOSSessionKey) {
                    newSessionFound = false;
                }
            }

            if (newSessionFound === true) {
                dataItems.push(data);
                console.error('IOS: New session found for current day given LS already has length>=1 !');
                localStorage.setItem(currentDayKey, JSON.stringify(dataItems));
            }
        } else {
            var newItem = [];
            newItem.push(data);
            console.log('IOS: first time data push in current date, data is :');
            console.log(JSON.stringify(newItem));
            localStorage.setItem(currentDayKey, JSON.stringify(newItem));
        }

        this.updateCurrentSessionLocalStorageIOS();
    } else {
        console.warn('IOS: Local storage not supported for TimeOnSite tracking!');
    }
};

/**
 * [flushDemoDataIOS Removes data from old keys in Localstorage for IOS]
 */
TimeOnSiteTracker.prototype.flushDemoDataIOS = function() {
    // DEMO code block; Allow sample data to be overwritten and LS old date keys & data 
    // to be removed; only for IOS demo
    if (this.isFlushSampleDataIOS) {
        var keyName = this.TOSDateKeysHolder,
            dateKeys = this.getDateKeys(),
            currentDayKey = this.getCurrentDayKey();

        for (var i = 0; i < dateKeys.length; i++) {
            if (dateKeys[i] != currentDayKey) {
                console.warn('IOS: Demo Deleted Date item!');
                console.warn(localStorage.getItem(dateKeys[i]));
                localStorage.removeItem(dateKeys[i]);
                console.warn('IOS: Demo Deleted Date Key!');
                console.warn(dateKeys[i]);
                dateKeys.splice(i, 1);
            }
        }

        localStorage.setItem(keyName, JSON.stringify(dateKeys));
        console.warn('IOS: Demo Updated Date Key Array after flush operation!');
        console.warn(localStorage.getItem(keyName));
    }
};

/**
 * [getTimeOnSiteCurrentSessionIOS returns current time on site for IOS devices]
 * @return {[integer]}
 */
TimeOnSiteTracker.prototype.getTimeOnSiteCurrentSessionIOS = function() {
    var currentDayKey = this.getCurrentDayKey(),
        currentItemsData, 
        timeOnSite = 0,
        currentSessionItems = localStorage.getItem(currentDayKey);
    if (currentSessionItems) {
        currentItemsData = JSON.parse(currentSessionItems);
    }

    if (currentItemsData && currentItemsData.length && this.TOSSessionKey) {
        for (var i = 0; i < currentItemsData.length; i++) {
            if (currentItemsData[i].trackingType === 'tos' &&
                this.TOSSessionKey === currentItemsData[i].TOSSessionKey) {
                timeOnSite += currentItemsData[i].timeOnPage;
            }
        }
    } else {console.error('IOS: No current session data in Localstorage; or empty sessionKey : '+this.TOSSessionKey+' returning 0 as timeOnSite!');}

    return timeOnSite;
};

/**
 * [updateCurrentSessionLocalStorageIOS Updates each entry(type===tos) in Localstorage 
 * with updated timeOnSite for current session]
 */
TimeOnSiteTracker.prototype.updateCurrentSessionLocalStorageIOS = function() {
    var currentDayKey = this.getCurrentDayKey(),
        currentSessionItems = localStorage.getItem(currentDayKey);
    if (currentSessionItems) {
        var currentItemsData = JSON.parse(currentSessionItems),
            currentSessionTOSIdArr = [],
            timeOnSite = 0;

        if (currentItemsData && currentItemsData.length && this.TOSSessionKey) {
            /* this loop "computes" timeOnSite for each tos record type in current session */
            for (var i = 0; i < currentItemsData.length; i++) {
                if (currentItemsData[i].trackingType === 'tos' &&
                    this.TOSSessionKey === currentItemsData[i].TOSSessionKey) {
                    currentSessionTOSIdArr.push(currentItemsData[i].TOSId);

                    timeOnSite += currentItemsData[i].timeOnPage;
                    currentItemsData[i].timeOnSite = timeOnSite;
                    currentItemsData[i].timeOnSiteByDuration = ((this.returnInSeconds === true) ? this.secondToDuration(timeOnSite) : this.secondToDuration(this.millisecondToSecond(timeOnSite)));
                }
            }
            console.error("IOS: Current session's active TOSId to spearhead timeonsite....");
            console.error(currentSessionTOSIdArr);
        }
        
        /* this loop "updates" the timeOnSite of current session's LS contents altogether 
        in one go & exits the loop immediately on finding first active TOSId */
        for (var i = 0; i < currentItemsData.length; i++) {
            if (currentItemsData[i].trackingType === 'tos' &&
                this.TOSSessionKey === currentItemsData[i].TOSSessionKey) {
                var currentTimeStampVar = new Date();
                var lastUpdatedTimeStampVar = new Date(currentItemsData[i]['lastUpdatedTimeStamp']);
                console.error('IOS: Timestamp diffence value for TOSId: '+currentItemsData[i].TOSId+' : at index: '+i+' is '+ parseInt((currentTimeStampVar/1000) - (lastUpdatedTimeStampVar/1000)));
                /**
                Tab that has document focus & having valid timestamp (usually 
                current tab) like below 5 seconds updates the entire session contents 
                in Localstorage and exits the loop immediately.
                */
                if (parseInt((currentTimeStampVar/1000) - (lastUpdatedTimeStampVar/1000)) < 5) {
                    console.error(currentItemsData[i].TOSId + ' updates the LS and breaks the loop');
                    localStorage.setItem(currentDayKey, JSON.stringify(currentItemsData));
                    console.log('IOS: Updated data');
                    console.log(JSON.stringify(currentItemsData));
                    break;
                }
            }
        }
    }
};

/**
 * [getRecentSessionKeyIOS returns the current/most recent session key from LS in IOS]
 * @return {[string]} [TOSSessionKey]
 */
TimeOnSiteTracker.prototype.getRecentSessionKeyIOS = function() {
    var currentDayKey = this.getCurrentDayKey();
    var currentSessionItems = localStorage.getItem(currentDayKey);
    // variable "currentItemsData" can hold both tos & activity data for today
    var currentItemsData = JSON.parse(currentSessionItems);
    // variable "tosSessionsToday" can hold only tos data for today
    var tosSessionsToday = [];
    var recentTOSSessionKey = '';
    if (currentItemsData && currentItemsData.length) {
        for (var i = 0; i < currentItemsData.length; i++) {
            if (currentItemsData[i].trackingType === 'tos') {
                tosSessionsToday.push(currentItemsData[i]);
            }
        }

        var tosSessionsTodayLen = tosSessionsToday.length;
        if (tosSessionsTodayLen === 1) {
            recentTOSSessionKey = tosSessionsToday[0].TOSSessionKey;
        } else if (tosSessionsTodayLen > 1) {
            /*due to array push mechanism, last or most recent session 
            is found at the end of Localstorage*/
            recentTOSSessionKey = tosSessionsToday[tosSessionsTodayLen -1].TOSSessionKey;
        }
    }
    console.error('IOS: Most recent session key : ' + recentTOSSessionKey);
    return recentTOSSessionKey;
};

/**
 * [getCurrentDayKey returns current date key]
 * @return {[string]}
 */
TimeOnSiteTracker.prototype.getCurrentDayKey = function() {
    var dateObj = (new Date()),
    currentDayKey = this.TOSDayKeyPrefix + (dateObj.getMonth() + 1) + '_' + dateObj.getDate() + '_' + dateObj.getFullYear();
    return currentDayKey;
};

/**
 * [processDataInLocalStorage It reads the data in local storage and processes the data]
 */
TimeOnSiteTracker.prototype.processDataInLocalStorage = function() {
    var dateKeys = this.getDateKeys();

    if ((dateKeys instanceof Array) && dateKeys.length) {
        var dateKey = dateKeys[0];

        if (this.developerMode) {
            console.log('Current date key to process in storage: ' + dateKey);
        }

        var item = localStorage.getItem(dateKey);

        if (item) {
            var itemData = JSON.parse(item);
            
            if ((itemData instanceof Array) && itemData.length) {
                this.sendData(dateKey, itemData);
            }
        }
    }
};

/**
 * [getDateKeys get date-based keys that hold TOS data]
 * @return {[array]} [date-based keys]
 */
TimeOnSiteTracker.prototype.getDateKeys = function() {
    var dateKeys = [];
    if (this.storageSupported) {
        var keyName = this.TOSDateKeysHolder,
            keyArr = localStorage.getItem(keyName);

        if (keyArr) {
            dateKeys = JSON.parse(keyArr);
        }
    }
    return dateKeys;
};

/**
 * [removeDateKey Method to remove local storage key (a date string) that contains TOS data]
 * @param  {[string]} dateKey [key that specifies data of any given day based on date]
 */
TimeOnSiteTracker.prototype.removeDateKey = function(dateKey) {
    var keyName = this.TOSDateKeysHolder,
        dateKeys = this.getDateKeys();
    
    if (this.storageSupported) {
        if ((dateKeys instanceof Array) && dateKeys.length) {
            for (var i = 0; i < dateKeys.length; i++) {
                if (dateKeys[i] == dateKey) {
                    dateKeys.splice(i, 1);

                    localStorage.removeItem(dateKey);
                    localStorage.setItem(keyName, JSON.stringify(dateKeys));

                    if (dateKeys.length) {
                        this.processDataInLocalStorage();
                    }
                }
            }
        }
    }
    
};

/**
 * [updateStorageData removes processed or invalid data from storage and updates it]
 * @param  {[string]} dateKey
 * @param  {[array]} itemData
 */
TimeOnSiteTracker.prototype.updateStorageData = function(dateKey, itemData) {
    var self = this;

    itemData.shift();

    if (this.developerMode) {
        console.log('Records count is : '+ itemData.length);
    }

    if (itemData.length) {
        //save remaining data in dateKey back to localstorage
        localStorage.setItem(dateKey, JSON.stringify(itemData));
        
        //console.log('Calling next item to process');
        setTimeout(function() {
            self.sendData(dateKey, itemData);
        }, 500);
        
    } else {
       this.removeDateKey(dateKey);

        /**
         * When data is processed from local storage incase of synchronous API, xhr variable should be 
         * reset (self.xhr = null) to prevent "cancelXMLHTTPRequest" method call 
         * that occurs at page close.
         */
        //this.xhr = null; 
    }
};


/**
 * [verifyData Function to verify data correctness of parameters in TOS data]
 * @param  {[string]} returns 'valid' if data is correct and consistent
 */
TimeOnSiteTracker.prototype.verifyData = function(data) {
    var isInvalidData = false;

    if (!data.TOSSessionKey || !data.TOSSessionKey.length) {
        isInvalidData = true;
        if (this.developerMode) {
            console.error('TOSSessionKey invalid : ' + data.TOSSessionKey);
        }
    }

    if ((typeof data.timeOnPage != 'number') || (typeof data.timeOnSite != 'number')) {
        isInvalidData = true;
        if (this.developerMode) {
            console.error('timeOnPage/timeOnSite invalid. timeOnPage : ' + data.timeOnPage + ' & timeOnSite : ' + data.timeOnSite);
        }
    }

    // (experimental, IOS issue)   isNaN(new Date(data.entryTime).getTime()
    if (!data.entryTime || !data.entryTime.length) {
        isInvalidData = true;
        if (this.developerMode) {
            console.error('Entry time invalid: ' + data.entryTime);
        }
    }

    if (!data.exitTime || !data.exitTime.length) {
        isInvalidData = true;
        if (this.developerMode) {
            console.error('Exit time invalid: ' + data.exitTime);
        }
    }

    if (isInvalidData) {
        if (this.developerMode) {
            console.error(data);
        }
        return 'invalid';
    } else {
        return 'valid';
    }
    
};

/**
 * [isProcessingAllowedIOS IOS: tos data (not activity) can be processed
 *  only based on certain parameters. false return value means
 *   don't allow it to save data]
 * @return {[boolean]}
 */
TimeOnSiteTracker.prototype.isProcessingAllowedIOS = function(dateKey, itemData) {
    console.error('itemData[0].TOSSessionKey: ' + itemData[0].TOSSessionKey);
    console.error('currentSessionKey: ' + this.getCookie(this.TOS_CONST.TOSSessionKey));

    var self = this,
        currentSessionKey = this.getCookie(this.TOS_CONST.TOSSessionKey);
    if (itemData[0].trackingType === 'tos' && currentSessionKey &&
        itemData[0].TOSSessionKey === currentSessionKey) {

        /* IOS experimental */
        // var iosStaleRecordTimeLimitInSecs = 10;
        // var currentTimeStamp = new Date();
        // var lastUpdatedTimeStamp = new Date(itemData[0]['lastUpdatedTimeStamp']);
        // if (parseInt((currentTimeStamp/1000) - (lastUpdatedTimeStamp/1000)) > iosStaleRecordTimeLimitInSecs) {
        // } else {}
        
        // since the current record belongs to active session, abandon XHR call
        console.error('IOS: Block 1, not allowed to proceed now but later on because same session!');
        return false;

    } else if (!currentSessionKey) {
        console.error('IOS: Block 2, not allowed to proceed now but later on because either session cookie not initiated!');
        // at page entry, TOSSessionKey cookie won't be readily available; hence the delay to process records
        setTimeout(function() {
            self.sendData(dateKey, itemData);
        }, 2000); // 2 seconds
        return false;

    }
    
    return true;
};

/**
 * [sendData This method reads data from local storage and make API calls with POST 
 * method synchronously for posting data to server one at a time. When page close event 
 * occurs, the API call is cancelled.]
 * @param  {[string]} dateKey  [Key that is holding the data for a specific date]
 * @param  {[array]} itemData [The array of TOS data]
 * @return void;
 */
TimeOnSiteTracker.prototype.sendData = function(dateKey, itemData) {
    var url = this.request.url,
        params = itemData[0],
        self = this;

    /* check data consistency only for 'tos' type data */
    if (itemData[0].trackingType == 'tos') {
        if (this.verifyData(itemData[0]) != 'valid') {
            this.updateStorageData(dateKey, itemData);

            return false;
        }
    }

    if (this.isIOS()) {
        if (this.isProcessingAllowedIOS(dateKey, itemData) === false) {
            return false;
        } else {
            console.error('IOS: Block safe, Allowed to proceed further now & save in DB!');
            delete params['lastUpdatedTimeStamp']; //remove temporary key 'lastUpdatedTimeStamp'
        }
    }

    this.xhr = null;
    if (window.XMLHttpRequest) {
        this.xhr = new XMLHttpRequest();
    } else { // code for IE older versions
        this.xhr = new ActiveXObject('Microsoft.XMLHTTP');
    }

    this.xhr.open('POST', url, true); //asynchronous call

    //Send the proper header information along with the request
    this.xhr.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');

    // IOS/Safari ajax POST issue fixer without no-cache header
    this.xhr.setRequestHeader('cache-control', 'no-cache');
 
    // check and set request headers if given
    if (this.isRequestHeadersAvailable && (this.request.headers).length) {
        for (var k = 0; k < (this.request.headers).length; k++) {
            var headersObj = (this.request.headers)[k];
            for (var key in headersObj) {
                this.xhr.setRequestHeader(key, headersObj[key]);
            }
        }
    }

    this.xhr.onreadystatechange = function() {//Call a function when the state changes.
        if (self.xhr.readyState == 4 && self.xhr.status == 200) {
            if (self.xhr.responseText == 'success') {
                self.updateStorageData(dateKey, itemData);
            } 
        }
    }

    params = JSON.stringify(params);
    this.xhr.send(params);
    
};

/**
 * [cancelXMLHTTPRequest This method is called only for data stored in local storage. 
 * When TOSTracker is processing previous page data on new page entry and the current 
 * page is closed, xhr request is cancelled since it's blocking XMLHttpRequest. The 
 * remaining data will be processed in the next page]
 */
// TimeOnSiteTracker.prototype.cancelXMLHTTPRequest = function() {

//     // check if "abort" exists since earlier version of firefox don't have this method
//     if (this.xhr && (typeof this.xhr.abort === 'function')) {
//         if (this.developerMode) {
//             console.log(this.xhr);
//             console.info('XHR request cancelled!');
//         }

//         this.xhr.abort();
//     }
// };

/**
 * [bindWindowFocus It keeps track of the user's focus of browser tabs. If user 
 * navigates away from TOS tracked site in one or more browser tabs, then TOS tracking 
 * stops until user returns back to the page]
 */
TimeOnSiteTracker.prototype.bindWindowFocus = function() {

    // check the visiblility of the page
    var self = this,
        hidden, visibilityState, visibilityChange; // check the visiblility of the page

    if (typeof document.hidden !== 'undefined') {
        hidden = 'hidden', visibilityChange = 'visibilitychange',
        visibilityState = 'visibilityState';
    }
    else if (typeof document.mozHidden !== 'undefined') {
        hidden = 'mozHidden', visibilityChange = 'mozvisibilitychange',
        visibilityState = 'mozVisibilityState';
    }
    else if (typeof document.msHidden !== 'undefined') {
        hidden = 'msHidden', visibilityChange = 'msvisibilitychange',
        visibilityState = 'msVisibilityState';
    }
    else if (typeof document.webkitHidden !== 'undefined') {
        hidden = 'webkitHidden', visibilityChange = 'webkitvisibilitychange',
        visibilityState = 'webkitVisibilityState';
    }

    if (typeof document.addEventListener === 'undefined' || typeof hidden === 'undefined') {
        console.warn('Page visisbility API not supported in this browser which may result in less accuracy in TOS tracking!');
    } else {
        document.addEventListener(visibilityChange, function() {
            if (document[visibilityState] == 'visible') {
                self.varyingStartTime = new Date();
                self.totalTimeSpent = self.arrayAggregate(self.timeSpentArr);

                if (self.developerMode) {
                    console.log('On visible state');
                    console.log('Time spent on SITE so far : ' + self.totalTimeSpent);
                }

                // compute time duratation for activity if it was started.
                if (self.activity.activityStarted) {
                    self.activity.varyingStartTime = new Date();
                    self.activity.totalTimeSpent = self.arrayAggregate(self.activity.totalTimeSpentArr);
                    if (self.developerMode) {
                        console.log('Time spent on ACTIVITY so far : ' + self.activity.totalTimeSpent);
                    }
                }
            } else if (document[visibilityState] == 'hidden') {
                if (self.developerMode) {
                    console.log('On invisible state, accumulated data array for TimeOnSite:');
                    console.log(self.timeSpentArr);
                }

                var nowTime = new Date();
                if (self.returnInSeconds) {
                    (self.timeSpentArr).push(((self.getTimeDiff(self.varyingStartTime, nowTime))/1000));
                } else {
                    (self.timeSpentArr).push(self.getTimeDiff(self.varyingStartTime, nowTime));
                }

                // compute time duratation for activity if it was started.
                if (self.activity.activityStarted) {
                    if (self.developerMode) {
                        console.log('On invisible state, accumulated data array for activity:');
                        console.log(self.activity.totalTimeSpentArr);
                    }
                    if (self.returnInSeconds) {
                        (self.activity.totalTimeSpentArr).push(((self.getTimeDiff(self.activity.varyingStartTime, nowTime))/1000));
                    } else {
                        (self.activity.totalTimeSpentArr).push(self.getTimeDiff(self.activity.varyingStartTime, nowTime));
                    }
                }
            }

            if (self.developerMode) {
                console.log('Tracked by "SECONDS": ' + self.returnInSeconds);
            }

        }, false);
    }

};

/**
 * [setCookie It creates cookie for tracking TOS tracking]
 * @param {[string]} cookieName  [name of cookie]
 * @param {[string || integer]} cookieValue [value of cookie]
 * @param {[integer]} secs   [the lifetime of cookie in seconds]
 */
TimeOnSiteTracker.prototype.setCookie = function(cookieName, cookieValue, secs) {
    var d = new Date(),
        expires,
        cookieString;
    d.setTime(d.getTime() + (secs * 1000));
    
    expires = 'expires=' + d.toUTCString();
    cookieString = cookieName + '=' + cookieValue + '; ' + expires + '; ' + this.TOSCookie.customCookieString;
    document.cookie = cookieString;
    
};

/**
 * [getCookie It retrieves the cookie contents]
 * @param  {[string]} cookieName [name of cookie]
 * @return {[string || integer]}       [the contents of cookie]
 */
TimeOnSiteTracker.prototype.getCookie = function(cookieName) {
    var name,
        cookies = document.cookie.split(';');

    name = cookieName + '=';

    for (var i = 0; i < cookies.length; i++) {
        var _cookie = cookies[i];
        while (_cookie.charAt(0) == ' ') {
            _cookie = _cookie.substring(1);
        }
        if (_cookie.indexOf(name) == 0) {
            return _cookie.substring(name.length, _cookie.length);
        }
    }
    return '';
};

/**
 * [removeCookie It removes cookie]
 * @param  {[string]} cookieName [name of cookie]
 */
TimeOnSiteTracker.prototype.removeCookie = function(cookieName) {
    if (this.getCookie(cookieName)) {
        document.cookie = cookieName + '=; expires=Thu, 01 Jan 1970 00:00:00 UTC; ' + this.TOSCookie.customCookieString;
    }
};

// TimeOnSiteTracker.prototype.bindURLChange = function() {
//     var self = this;

//     if ('onhashchange' in window) {
//        window.onhashchange = function() {
//             console.info('URL changes  via onhashchange!!!');
//             self.executeURLChangeCustoms();
//         }
//     }
// };

/**
 * [bindWindowHistory It keeps track of page navigating for single-page apps]
 */
TimeOnSiteTracker.prototype.bindWindowHistory = function() {
    var self = this;
    
    if (window.history && window.history.pushState) {
        (function(history) {
            var pushState = history.pushState;
            history.pushState = function(state) {
                if (typeof history.onpushstate === 'function') {
                    history.onpushstate({state: state});
                }
                return pushState.apply(history, arguments);
            }
        })(window.history);


        window.onpopstate = history.onpushstate = function(e) {
            //console.log('Page URL ' + window.location.href);
            setTimeout(function() {
                /**
                 * when URL changes with push/pop states, it captures old title. 
                 * Fix this URL-title mismatch by delaying by 100 milliseconds.
                 */
                if (self.developerMode) {
                    console.info('URL changes via window history API!');
                }
                self.executeURLChangeCustoms();
            }, 100);
            
        };
    } else {
        // check if URL change occurs for browsers that don't support window.history
        var hashHandlerOldBrowsers = function() {
            this.oldHash = window.location.hash;

            var hashHandler = this;
            var detectChange = function() {
                if (hashHandler.oldHash != window.location.hash) {
                    hashHandler.oldHash = window.location.hash;
                        if (self.developerMode) {
                            console.info('URL changes via location.hash!');
                        }
                        self.executeURLChangeCustoms();
                    }
            };

            setInterval(function() {
                detectChange(); 
            }, 100);
        }
        var hashDetectionHandlerInit = new hashHandlerOldBrowsers();

    }
};

/**
 * [executeURLChangeCustoms This method updates the current TOP data in global cookie; processes the data and runs
 * checkBlacklistUrl method on page navigation]
 */
TimeOnSiteTracker.prototype.executeURLChangeCustoms = function() {
    this.monitorSession();

    this.processTOSData();

    /* blacklisting URL for single-page app tracking case (unsupported) */
    //this.initBlacklistUrlConfig(this.config);
};

/**
 * [bindWindowUnload A cross browser solution for window unload event]
 */
TimeOnSiteTracker.prototype.bindWindowUnload = function() {
    var self = this,
        windowAttachEventListener = window.attachEvent || window.addEventListener,
        unloadEvent = window.attachEvent ? 'onbeforeunload' : 'beforeunload'; // make IE7, IE8 compitable

    windowAttachEventListener(unloadEvent, function(event) { // For >=IE7, Chrome, Firefox
        //var message = 'Important: Please click on \'Save\' button to leave this page.';
        if (typeof event == 'undefined') {
            event = window.event;
        }
        if (event) {//event.returnValue = message;

            self.monitorSession();

            self.processTOSData();

            // cancelling running XHR requests if any...
            //self.cancelXMLHTTPRequest();

        }
        //return message;
    });

};

/**
 * [processTOSData It processes the data and resets the global TOS variables]
 */
TimeOnSiteTracker.prototype.processTOSData = function() {
    if (this.developerMode) {
        console.log('Time at exit: ' + (new Date()));
        //console.log('Time so far : ' + this.totalTimeSpent);
    }

    var data = this.getTimeOnPage();
    data.exitTime = this.getDateTime();

    /**
     * execute callback if given in config
     */
    if (this.isTimeOnSiteAllowed) {
        if (typeof this.callback === 'function') {
            this.callback(data);
        } else if (this.storeInLocalStorage) {
            if (this.isIOS()) {
                // Warning!!! saving data to saveToLocalStorage() will create duplicates; use upsert...
                this.upsertToLocalStorageIOS(data);
            } else {
                this.saveToLocalStorage(data);
            }
        }
    }

    // Initialize variables on URL change.
    this.varyingStartTime = new Date(),
    this.pageEntryTime = this.getDateTime(),
    this.totalTimeSpent = 0,
    this.timeSpentArr = [];

    if (this.config.trackHistoryChange === true) {
        this.TOSId = this.createTOSId();
    }

    //Reset activity variables
    if (this.activity.activityStarted) {
        this.activity.activityStarted = false;
        this.resetActivity();
    }
};
