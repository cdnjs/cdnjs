/**
* @author       Richard Davey <rich@photonstorm.com>
* @copyright    2015 Photon Storm Ltd.
* @license      {@link https://github.com/photonstorm/phaser/blob/master/license.txt|MIT License}
*/

/**
* @classdesc
* Detects device support capabilities and is responsible for device intialization - see {@link Phaser.Device.whenReady whenReady}.
*
* This class represents a singleton object that can be accessed directly as `game.device`
* (or, as a fallback, `Phaser.Device` when a game instance is not available) without the need to instantiate it.
*
* Unless otherwise noted the device capabilities are only guaranteed after initialization. Initialization
* occurs automatically and is guaranteed complete before {@link Phaser.Game} begins its "boot" phase.
* Feature detection can be modified in the {@link Phaser.Device.onInitialized onInitialized} signal.
*
* When checking features using the exposed properties only the *truth-iness* of the value should be relied upon
* unless the documentation states otherwise: properties may return `false`, `''`, `null`, or even `undefined`
* when indicating the lack of a feature.
*
* Uses elements from System.js by MrDoob and Modernizr
*
* @description
* It is not possible to instantiate the Device class manually.
*
* @class
* @protected
*/
Phaser.Device = function () {

    /**
    * The time the device became ready.
    * @property {integer} deviceReadyAt
    * @protected
    */
    this.deviceReadyAt = 0;

    /**
    * The time as which initialization has completed.
    * @property {boolean} initialized
    * @protected
    */
    this.initialized = false;

    //  Browser / Host / Operating System

    /**
    * @property {boolean} desktop - Is running on a desktop?
    * @default
    */
    this.desktop = false;

    /**
    * @property {boolean} iOS - Is running on iOS?
    * @default
    */
    this.iOS = false;

    /**
    * @property {boolean} cocoonJS - Is the game running under CocoonJS?
    * @default
    */
    this.cocoonJS = false;
    
    /**
    * @property {boolean} cocoonJSApp - Is this game running with CocoonJS.App?
    * @default
    */
    this.cocoonJSApp = false;
    
    /**
    * @property {boolean} cordova - Is the game running under Apache Cordova?
    * @default
    */
    this.cordova = false;
    
    /**
    * @property {boolean} node - Is the game running under Node.js?
    * @default
    */
    this.node = false;
    
    /**
    * @property {boolean} nodeWebkit - Is the game running under Node-Webkit?
    * @default
    */
    this.nodeWebkit = false;
    
    /**
    * @property {boolean} electron - Is the game running under GitHub Electron?
    * @default
    */
    this.electron = false;
    
    /**
    * @property {boolean} ejecta - Is the game running under Ejecta?
    * @default
    */
    this.ejecta = false;

    /**
    * @property {boolean} crosswalk - Is the game running under the Intel Crosswalk XDK?
    * @default
    */
    this.crosswalk = false;

    /**
    * @property {boolean} android - Is running on android?
    * @default
    */
    this.android = false;

    /**
    * @property {boolean} chromeOS - Is running on chromeOS?
    * @default
    */
    this.chromeOS = false;

    /**
    * @property {boolean} linux - Is running on linux?
    * @default
    */
    this.linux = false;

    /**
    * @property {boolean} macOS - Is running on macOS?
    * @default
    */
    this.macOS = false;

    /**
    * @property {boolean} windows - Is running on windows?
    * @default
    */
    this.windows = false;

    /**
    * @property {boolean} windowsPhone - Is running on a Windows Phone?
    * @default
    */
    this.windowsPhone = false;

    //  Features

    /**
    * @property {boolean} canvas - Is canvas available?
    * @default
    */
    this.canvas = false;

    /**
    * @property {?boolean} canvasBitBltShift - True if canvas supports a 'copy' bitblt onto itself when the source and destination regions overlap.
    * @default
    */
    this.canvasBitBltShift = null;

    /**
    * @property {boolean} webGL - Is webGL available?
    * @default
    */
    this.webGL = false;

    /**
    * @property {boolean} file - Is file available?
    * @default
    */
    this.file = false;

    /**
    * @property {boolean} fileSystem - Is fileSystem available?
    * @default
    */
    this.fileSystem = false;

    /**
    * @property {boolean} localStorage - Is localStorage available?
    * @default
    */
    this.localStorage = false;

    /**
    * @property {boolean} worker - Is worker available?
    * @default
    */
    this.worker = false;

    /**
    * @property {boolean} css3D - Is css3D available?
    * @default
    */
    this.css3D = false;

    /**
    * @property {boolean} pointerLock - Is Pointer Lock available?
    * @default
    */
    this.pointerLock = false;

    /**
    * @property {boolean} typedArray - Does the browser support TypedArrays?
    * @default
    */
    this.typedArray = false;

    /**
    * @property {boolean} vibration - Does the device support the Vibration API?
    * @default
    */
    this.vibration = false;

    /**
    * @property {boolean} getUserMedia - Does the device support the getUserMedia API?
    * @default
    */
    this.getUserMedia = true;

    /**
    * @property {boolean} quirksMode - Is the browser running in strict mode (false) or quirks mode? (true)
    * @default
    */
    this.quirksMode = false;

    //  Input

    /**
    * @property {boolean} touch - Is touch available?
    * @default
    */
    this.touch = false;

    /**
    * @property {boolean} mspointer - Is mspointer available?
    * @default
    */
    this.mspointer = false;

    /**
    * @property {?string} wheelType - The newest type of Wheel/Scroll event supported: 'wheel', 'mousewheel', 'DOMMouseScroll'
    * @default
    * @protected
    */
    this.wheelEvent = null;

    //  Browser

    /**
    * @property {boolean} arora - Set to true if running in Arora.
    * @default
    */
    this.arora = false;

    /**
    * @property {boolean} chrome - Set to true if running in Chrome.
    * @default
    */
    this.chrome = false;

    /**
    * @property {number} chromeVersion - If running in Chrome this will contain the major version number.
    * @default
    */
    this.chromeVersion = 0;

    /**
    * @property {boolean} epiphany - Set to true if running in Epiphany.
    * @default
    */
    this.epiphany = false;

    /**
    * @property {boolean} firefox - Set to true if running in Firefox.
    * @default
    */
    this.firefox = false;

    /**
    * @property {number} firefoxVersion - If running in Firefox this will contain the major version number.
    * @default
    */
    this.firefoxVersion = 0;

    /**
    * @property {boolean} ie - Set to true if running in Internet Explorer.
    * @default
    */
    this.ie = false;

    /**
    * @property {number} ieVersion - If running in Internet Explorer this will contain the major version number. Beyond IE10 you should use Device.trident and Device.tridentVersion.
    * @default
    */
    this.ieVersion = 0;

    /**
    * @property {boolean} trident - Set to true if running a Trident version of Internet Explorer (IE11+)
    * @default
    */
    this.trident = false;

    /**
    * @property {number} tridentVersion - If running in Internet Explorer 11 this will contain the major version number. See {@link http://msdn.microsoft.com/en-us/library/ie/ms537503(v=vs.85).aspx}
    * @default
    */
    this.tridentVersion = 0;

    /**
    * @property {boolean} mobileSafari - Set to true if running in Mobile Safari.
    * @default
    */
    this.mobileSafari = false;

    /**
    * @property {boolean} midori - Set to true if running in Midori.
    * @default
    */
    this.midori = false;

    /**
    * @property {boolean} opera - Set to true if running in Opera.
    * @default
    */
    this.opera = false;

    /**
    * @property {boolean} safari - Set to true if running in Safari.
    * @default
    */
    this.safari = false;

    /**
    * @property {boolean} webApp - Set to true if running as a WebApp, i.e. within a WebView
    * @default
    */
    this.webApp = false;

    /**
    * @property {boolean} silk - Set to true if running in the Silk browser (as used on the Amazon Kindle)
    * @default
    */
    this.silk = false;

    //  Audio

    /**
    * @property {boolean} audioData - Are Audio tags available?
    * @default
    */
    this.audioData = false;

    /**
    * @property {boolean} webAudio - Is the WebAudio API available?
    * @default
    */
    this.webAudio = false;

    /**
    * @property {boolean} ogg - Can this device play ogg files?
    * @default
    */
    this.ogg = false;

    /**
    * @property {boolean} opus - Can this device play opus files?
    * @default
    */
    this.opus = false;

    /**
    * @property {boolean} mp3 - Can this device play mp3 files?
    * @default
    */
    this.mp3 = false;

    /**
    * @property {boolean} wav - Can this device play wav files?
    * @default
    */
    this.wav = false;

    /**
    * Can this device play m4a files?
    * @property {boolean} m4a - True if this device can play m4a files.
    * @default
    */
    this.m4a = false;

    /**
    * @property {boolean} webm - Can this device play webm files?
    * @default
    */
    this.webm = false;

    //  Video

    /**
    * @property {boolean} oggVideo - Can this device play ogg video files?
    * @default
    */
    this.oggVideo = false;

    /**
    * @property {boolean} h264Video - Can this device play h264 mp4 video files?
    * @default
    */
    this.h264Video = false;

    /**
    * @property {boolean} mp4Video - Can this device play h264 mp4 video files?
    * @default
    */
    this.mp4Video = false;

    /**
    * @property {boolean} webmVideo - Can this device play webm video files?
    * @default
    */
    this.webmVideo = false;

    /**
    * @property {boolean} vp9Video - Can this device play vp9 video files?
    * @default
    */
    this.vp9Video = false;

    /**
    * @property {boolean} hlsVideo - Can this device play hls video files?
    * @default
    */
    this.hlsVideo = false;

    //  Device

    /**
    * @property {boolean} iPhone - Is running on iPhone?
    * @default
    */
    this.iPhone = false;

    /**
    * @property {boolean} iPhone4 - Is running on iPhone4?
    * @default
    */
    this.iPhone4 = false;

    /**
    * @property {boolean} iPad - Is running on iPad?
    * @default
    */
    this.iPad = false;

    // Device features

    /**
    * @property {number} pixelRatio - PixelRatio of the host device?
    * @default
    */
    this.pixelRatio = 0;

    /**
    * @property {boolean} littleEndian - Is the device big or little endian? (only detected if the browser supports TypedArrays)
    * @default
    */
    this.littleEndian = false;

    /**
    * @property {boolean} LITTLE_ENDIAN - Same value as `littleEndian`.
    * @default
    */
    this.LITTLE_ENDIAN = false;

    /**
    * @property {boolean} support32bit - Does the device context support 32bit pixel manipulation using array buffer views?
    * @default
    */
    this.support32bit = false;

    /**
    * @property {boolean} fullscreen - Does the browser support the Full Screen API?
    * @default
    */
    this.fullscreen = false;

    /**
    * @property {string} requestFullscreen - If the browser supports the Full Screen API this holds the call you need to use to activate it.
    * @default
    */
    this.requestFullscreen = '';

    /**
    * @property {string} cancelFullscreen - If the browser supports the Full Screen API this holds the call you need to use to cancel it.
    * @default
    */
    this.cancelFullscreen = '';

    /**
    * @property {boolean} fullscreenKeyboard - Does the browser support access to the Keyboard during Full Screen mode?
    * @default
    */
    this.fullscreenKeyboard = false;

};

// Device is really a singleton/static entity; instantiate it
// and add new methods directly sans-prototype.
Phaser.Device = new Phaser.Device();

/**
* This signal is dispatched after device initialization occurs but before any of the ready
* callbacks (see {@link Phaser.Device.whenReady whenReady}) have been invoked.
*
* Local "patching" for a particular device can/should be done in this event.
*
* _Note_: This signal is removed after the device has been readied; if a handler has not been
* added _before_ `new Phaser.Game(..)` it is probably too late.
*
* @type {?Phaser.Signal}
* @static
*/
Phaser.Device.onInitialized = new Phaser.Signal();

/**
* Add a device-ready handler and ensure the device ready sequence is started.
*
* Phaser.Device will _not_ activate or initialize until at least one `whenReady` handler is added,
* which is normally done automatically be calling `new Phaser.Game(..)`.
*
* The handler is invoked when the device is considered "ready", which may be immediately
* if the device is already "ready". See {@link Phaser.Device#deviceReadyAt deviceReadyAt}.
*
* @method
* @param {function} handler - Callback to invoke when the device is ready. It is invoked with the given context the Phaser.Device object is supplied as the first argument.
* @param {object} [context] - Context in which to invoke the handler
* @param {boolean} [nonPrimer=false] - If true the device ready check will not be started.
*/
Phaser.Device.whenReady = function (callback, context, nonPrimer) {

    var readyCheck = this._readyCheck;

    if (this.deviceReadyAt || !readyCheck)
    {
        callback.call(context, this);
    }
    else if (readyCheck._monitor || nonPrimer)
    {
        readyCheck._queue = readyCheck._queue || [];
        readyCheck._queue.push([callback, context]);
    }
    else
    {
        readyCheck._monitor = readyCheck.bind(this);
        readyCheck._queue = readyCheck._queue || [];
        readyCheck._queue.push([callback, context]);
        
        var cordova = typeof window.cordova !== 'undefined';
        var cocoonJS = navigator['isCocoonJS'];

        if (document.readyState === 'complete' || document.readyState === 'interactive')
        {
            // Why is there an additional timeout here?
            window.setTimeout(readyCheck._monitor, 0);
        }
        else if (cordova && !cocoonJS)
        {
            // Ref. http://docs.phonegap.com/en/3.5.0/cordova_events_events.md.html#deviceready
            //  Cordova, but NOT Cocoon?
            document.addEventListener('deviceready', readyCheck._monitor, false);
        }
        else
        {
            document.addEventListener('DOMContentLoaded', readyCheck._monitor, false);
            window.addEventListener('load', readyCheck._monitor, false);
        }
    }

};

/**
* Internal method used for checking when the device is ready.
* This function is removed from Phaser.Device when the device becomes ready.
*
* @method
* @private
*/
Phaser.Device._readyCheck = function () {

    var readyCheck = this._readyCheck;

    if (!document.body)
    {
        window.setTimeout(readyCheck._monitor, 20);
    }
    else if (!this.deviceReadyAt)
    {
        this.deviceReadyAt = Date.now();

        document.removeEventListener('deviceready', readyCheck._monitor);
        document.removeEventListener('DOMContentLoaded', readyCheck._monitor);
        window.removeEventListener('load', readyCheck._monitor);

        this._initialize();
        this.initialized = true;

        this.onInitialized.dispatch(this);

        var item;
        while ((item = readyCheck._queue.shift()))
        {
            var callback = item[0];
            var context = item[1];
            callback.call(context, this);
        }

        // Remove no longer useful methods and properties.
        this._readyCheck = null;
        this._initialize = null;
        this.onInitialized = null;
    }

};

/**
* Internal method to initialize the capability checks.
* This function is removed from Phaser.Device once the device is initialized.
*
* @method
* @private
*/
Phaser.Device._initialize = function () {

    var device = this;

    /**
    * Check which OS is game running on.
    */
    function _checkOS () {

        var ua = navigator.userAgent;

        if (/Playstation Vita/.test(ua))
        {
            device.vita = true;
        }
        else if (/Kindle/.test(ua) || /\bKF[A-Z][A-Z]+/.test(ua) || /Silk.*Mobile Safari/.test(ua))
        {
            device.kindle = true;
            // This will NOT detect early generations of Kindle Fire, I think there is no reliable way...
            // E.g. "Mozilla/5.0 (Macintosh; U; Intel Mac OS X 10_6_3; en-us; Silk/1.1.0-80) AppleWebKit/533.16 (KHTML, like Gecko) Version/5.0 Safari/533.16 Silk-Accelerated=true"
        }
        else if (/Android/.test(ua))
        {
            device.android = true;
        }
        else if (/CrOS/.test(ua))
        {
            device.chromeOS = true;
        }
        else if (/iP[ao]d|iPhone/i.test(ua))
        {
            device.iOS = true;
        }
        else if (/Linux/.test(ua))
        {
            device.linux = true;
        }
        else if (/Mac OS/.test(ua))
        {
            device.macOS = true;
        }
        else if (/Windows/.test(ua))
        {
            device.windows = true;
        }

        if (/Windows Phone/i.test(ua) || /IEMobile/i.test(ua))
        {
            device.android = false;
            device.iOS = false;
            device.macOS = false;
            device.windows = true;
            device.windowsPhone = true;
        }

        var silk = /Silk/.test(ua); // detected in browsers

        if (device.windows || device.macOS || (device.linux && !silk) || device.chromeOS)
        {
            device.desktop = true;
        }

        //  Windows Phone / Table reset
        if (device.windowsPhone || ((/Windows NT/i.test(ua)) && (/Touch/i.test(ua))))
        {
            device.desktop = false;
        }

    }

    /**
    * Check HTML5 features of the host environment.
    */
    function _checkFeatures () {

        device.canvas = !!window['CanvasRenderingContext2D'] || device.cocoonJS;

        try {
            device.localStorage = !!localStorage.getItem;
        } catch (error) {
            device.localStorage = false;
        }

        device.file = !!window['File'] && !!window['FileReader'] && !!window['FileList'] && !!window['Blob'];
        device.fileSystem = !!window['requestFileSystem'];

        device.webGL = ( function () { try { var canvas = document.createElement( 'canvas' ); /*Force screencanvas to false*/ canvas.screencanvas = false; return !! window.WebGLRenderingContext && ( canvas.getContext( 'webgl' ) || canvas.getContext( 'experimental-webgl' ) ); } catch( e ) { return false; } } )();
        device.webGL = !!device.webGL;

        device.worker = !!window['Worker'];

        device.pointerLock = 'pointerLockElement' in document || 'mozPointerLockElement' in document || 'webkitPointerLockElement' in document;

        device.quirksMode = (document.compatMode === 'CSS1Compat') ? false : true;

        navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia || navigator.oGetUserMedia;

        window.URL = window.URL || window.webkitURL || window.mozURL || window.msURL;

        device.getUserMedia = device.getUserMedia && !!navigator.getUserMedia && !!window.URL;

        // Older versions of firefox (< 21) apparently claim support but user media does not actually work
        if (device.firefox && device.firefoxVersion < 21)
        {
            device.getUserMedia = false;
        }

        // TODO: replace canvasBitBltShift detection with actual feature check

        // Excludes iOS versions as they generally wrap UIWebView (eg. Safari WebKit) and it
        // is safer to not try and use the fast copy-over method.
        if (!device.iOS && (device.ie || device.firefox || device.chrome))
        {
            device.canvasBitBltShift = true;
        }

        // Known not to work
        if (device.safari || device.mobileSafari)
        {
            device.canvasBitBltShift = false;
        }

    }

    /**
    * Checks/configures various input.
    */
    function _checkInput () {

        if ('ontouchstart' in document.documentElement || (window.navigator.maxTouchPoints && window.navigator.maxTouchPoints >= 1))
        {
            device.touch = true;
        }

        if (window.navigator.msPointerEnabled || window.navigator.pointerEnabled)
        {
            device.mspointer = true;
        }

        if (!device.cocoonJS)
        {
            // See https://developer.mozilla.org/en-US/docs/Web/Events/wheel
            if ('onwheel' in window || (device.ie && 'WheelEvent' in window))
            {
                // DOM3 Wheel Event: FF 17+, IE 9+, Chrome 31+, Safari 7+
                device.wheelEvent = 'wheel';
            }
            else if ('onmousewheel' in window)
            {
                // Non-FF legacy: IE 6-9, Chrome 1-31, Safari 5-7.
                device.wheelEvent = 'mousewheel';
            }
            else if (device.firefox && 'MouseScrollEvent' in window)
            {
                // FF prior to 17. This should probably be scrubbed.
                device.wheelEvent = 'DOMMouseScroll';
            }
        }

    }

    /**
    * Checks for support of the Full Screen API.
    */
    function _checkFullScreenSupport () {

        var fs = [
            'requestFullscreen',
            'requestFullScreen',
            'webkitRequestFullscreen',
            'webkitRequestFullScreen',
            'msRequestFullscreen',
            'msRequestFullScreen',
            'mozRequestFullScreen',
            'mozRequestFullscreen'
        ];

        var element = document.createElement('div');

        for (var i = 0; i < fs.length; i++)
        {
            if (element[fs[i]])
            {
                device.fullscreen = true;
                device.requestFullscreen = fs[i];
                break;
            }
        }

        var cfs = [
            'cancelFullScreen',
            'exitFullscreen',
            'webkitCancelFullScreen',
            'webkitExitFullscreen',
            'msCancelFullScreen',
            'msExitFullscreen',
            'mozCancelFullScreen',
            'mozExitFullscreen'
        ];

        if (device.fullscreen)
        {
            for (var i = 0; i < cfs.length; i++)
            {
                if (document[cfs[i]])
                {
                    device.cancelFullscreen = cfs[i];
                    break;
                }
            }
        }

        //  Keyboard Input?
        if (window['Element'] && Element['ALLOW_KEYBOARD_INPUT'])
        {
            device.fullscreenKeyboard = true;
        }

    }

    /**
    * Check what browser is game running in.
    */
    function _checkBrowser () {

        var ua = navigator.userAgent;

        if (/Arora/.test(ua))
        {
            device.arora = true;
        }
        else if (/Chrome\/(\d+)/.test(ua) && !device.windowsPhone)
        {
            device.chrome = true;
            device.chromeVersion = parseInt(RegExp.$1, 10);
        }
        else if (/Epiphany/.test(ua))
        {
            device.epiphany = true;
        }
        else if (/Firefox\D+(\d+)/.test(ua))
        {
            device.firefox = true;
            device.firefoxVersion = parseInt(RegExp.$1, 10);
        }
        else if (/AppleWebKit/.test(ua) && device.iOS)
        {
            device.mobileSafari = true;
        }
        else if (/MSIE (\d+\.\d+);/.test(ua))
        {
            device.ie = true;
            device.ieVersion = parseInt(RegExp.$1, 10);
        }
        else if (/Midori/.test(ua))
        {
            device.midori = true;
        }
        else if (/Opera/.test(ua))
        {
            device.opera = true;
        }
        else if (/Safari/.test(ua) && !device.windowsPhone)
        {
            device.safari = true;
        }
        else if (/Trident\/(\d+\.\d+)(.*)rv:(\d+\.\d+)/.test(ua))
        {
            device.ie = true;
            device.trident = true;
            device.tridentVersion = parseInt(RegExp.$1, 10);
            device.ieVersion = parseInt(RegExp.$3, 10);
        }

        //  Silk gets its own if clause because its ua also contains 'Safari'
        if (/Silk/.test(ua))
        {
            device.silk = true;
        }

        //  WebApp mode in iOS
        if (navigator['standalone'])
        {
            device.webApp = true;
        }
        
        if (typeof window.cordova !== "undefined")
        {
            device.cordova = true;
        }
        
        if (typeof process !== "undefined" && typeof require !== "undefined")
        {
            device.node = true;
        }
        
        if (device.node && typeof process.versions === 'object')
        {
            device.nodeWebkit = !!process.versions['node-webkit'];
            
            device.electron = !!process.versions.electron;
        }
        
        if (navigator['isCocoonJS'])
        {
            device.cocoonJS = true;
        }
        
        if (device.cocoonJS)
        {
            try {
                device.cocoonJSApp = (typeof CocoonJS !== "undefined");
            }
            catch(error)
            {
                device.cocoonJSApp = false;
            }
        }

        if (typeof window.ejecta !== "undefined")
        {
            device.ejecta = true;
        }

        if (/Crosswalk/.test(ua))
        {
            device.crosswalk = true;
        }

    }

    /**
    * Check video support.
    */
    function _checkVideo () {

        var videoElement = document.createElement("video");
        var result = false;

        try {
            if (result = !!videoElement.canPlayType)
            {
                if (videoElement.canPlayType('video/ogg; codecs="theora"').replace(/^no$/, ''))
                {
                    device.oggVideo = true;
                }

                if (videoElement.canPlayType('video/mp4; codecs="avc1.42E01E"').replace(/^no$/, ''))
                {
                    // Without QuickTime, this value will be `undefined`. github.com/Modernizr/Modernizr/issues/546
                    device.h264Video = true;
                    device.mp4Video = true;
                }

                if (videoElement.canPlayType('video/webm; codecs="vp8, vorbis"').replace(/^no$/, ''))
                {
                    device.webmVideo = true;
                }

                if (videoElement.canPlayType('video/webm; codecs="vp9"').replace(/^no$/, ''))
                {
                    device.vp9Video = true;
                }

                if (videoElement.canPlayType('application/x-mpegURL; codecs="avc1.42E01E"').replace(/^no$/, ''))
                {
                    device.hlsVideo = true;
                }
            }
        } catch (e) {}
    }

    /**
    * Check audio support.
    */
    function _checkAudio () {

        device.audioData = !!(window['Audio']);
        device.webAudio = !!(window['AudioContext'] || window['webkitAudioContext']);
        var audioElement = document.createElement('audio');
        var result = false;

        try {
            if (result = !!audioElement.canPlayType)
            {
                if (audioElement.canPlayType('audio/ogg; codecs="vorbis"').replace(/^no$/, ''))
                {
                    device.ogg = true;
                }

                if (audioElement.canPlayType('audio/ogg; codecs="opus"').replace(/^no$/, '') || audioElement.canPlayType('audio/opus;').replace(/^no$/, ''))
                {
                    device.opus = true;
                }

                if (audioElement.canPlayType('audio/mpeg;').replace(/^no$/, ''))
                {
                    device.mp3 = true;
                }

                // Mimetypes accepted:
                //   developer.mozilla.org/En/Media_formats_supported_by_the_audio_and_video_elements
                //   bit.ly/iphoneoscodecs
                if (audioElement.canPlayType('audio/wav; codecs="1"').replace(/^no$/, ''))
                {
                    device.wav = true;
                }

                if (audioElement.canPlayType('audio/x-m4a;') || audioElement.canPlayType('audio/aac;').replace(/^no$/, ''))
                {
                    device.m4a = true;
                }

                if (audioElement.canPlayType('audio/webm; codecs="vorbis"').replace(/^no$/, ''))
                {
                    device.webm = true;
                }
            }
        } catch (e) {
        }

    }

    /**
    * Check PixelRatio, iOS device, Vibration API, ArrayBuffers and endianess.
    */
    function _checkDevice () {

        device.pixelRatio = window['devicePixelRatio'] || 1;
        device.iPhone = navigator.userAgent.toLowerCase().indexOf('iphone') != -1;
        device.iPhone4 = (device.pixelRatio == 2 && device.iPhone);
        device.iPad = navigator.userAgent.toLowerCase().indexOf('ipad') != -1;

        if (typeof Int8Array !== 'undefined')
        {
            device.typedArray = true;
        }
        else
        {
            device.typedArray = false;
        }

        if (typeof ArrayBuffer !== 'undefined' && typeof Uint8Array !== 'undefined' && typeof Uint32Array !== 'undefined')
        {
            device.littleEndian = _checkIsLittleEndian();
            device.LITTLE_ENDIAN = device.littleEndian;
        }

        device.support32bit = (typeof ArrayBuffer !== "undefined" && typeof Uint8ClampedArray !== "undefined" && typeof Int32Array !== "undefined" && device.littleEndian !== null && _checkIsUint8ClampedImageData());

        navigator.vibrate = navigator.vibrate || navigator.webkitVibrate || navigator.mozVibrate || navigator.msVibrate;

        if (navigator.vibrate)
        {
            device.vibration = true;
        }

    }

    /**
    * Check Little or Big Endian system.
    *
    * @author Matt DesLauriers (@mattdesl)
    */
    function _checkIsLittleEndian () {

        var a = new ArrayBuffer(4);
        var b = new Uint8Array(a);
        var c = new Uint32Array(a);

        b[0] = 0xa1;
        b[1] = 0xb2;
        b[2] = 0xc3;
        b[3] = 0xd4;

        if (c[0] == 0xd4c3b2a1)
        {
            return true;
        }

        if (c[0] == 0xa1b2c3d4)
        {
            return false;
        }
        else
        {
            //  Could not determine endianness
            return null;
        }

    }

    /**
    * Test to see if ImageData uses CanvasPixelArray or Uint8ClampedArray.
    *
    * @author Matt DesLauriers (@mattdesl)
    */
    function _checkIsUint8ClampedImageData () {

        if (Uint8ClampedArray === undefined)
        {
            return false;
        }

        var elem = document.createElement('canvas');
        var ctx = elem.getContext('2d');

        if (!ctx)
        {
            return false;
        }

        var image = ctx.createImageData(1, 1);

        return image.data instanceof Uint8ClampedArray;

    }

    /**
    * Check whether the host environment support 3D CSS.
    */
    function _checkCSS3D () {

        var el = document.createElement('p');
        var has3d;
        var transforms = {
            'webkitTransform': '-webkit-transform',
            'OTransform': '-o-transform',
            'msTransform': '-ms-transform',
            'MozTransform': '-moz-transform',
            'transform': 'transform'
        };

        // Add it to the body to get the computed style.
        document.body.insertBefore(el, null);

        for (var t in transforms)
        {
            if (el.style[t] !== undefined)
            {
                el.style[t] = "translate3d(1px,1px,1px)";
                has3d = window.getComputedStyle(el).getPropertyValue(transforms[t]);
            }
        }

        document.body.removeChild(el);
        device.css3D = (has3d !== undefined && has3d.length > 0 && has3d !== "none");

    }

    //  Run the checks
    _checkOS();
    _checkAudio();
    _checkVideo();
    _checkBrowser();
    _checkCSS3D();
    _checkDevice();
    _checkFeatures();
    _checkFullScreenSupport();
    _checkInput();

};

/**
* Check whether the host environment can play audio.
*
* @method canPlayAudio
* @memberof Phaser.Device.prototype
* @param {string} type - One of 'mp3, 'ogg', 'm4a', 'wav', 'webm' or 'opus'.
* @return {boolean} True if the given file type is supported by the browser, otherwise false.
*/
Phaser.Device.canPlayAudio = function (type) {

    if (type === 'mp3' && this.mp3)
    {
        return true;
    }
    else if (type === 'ogg' && (this.ogg || this.opus))
    {
        return true;
    }
    else if (type === 'm4a' && this.m4a)
    {
        return true;
    }
    else if (type === 'opus' && this.opus)
    {
        return true;
    }
    else if (type === 'wav' && this.wav)
    {
        return true;
    }
    else if (type === 'webm' && this.webm)
    {
        return true;
    }

    return false;

};

/**
* Check whether the host environment can play video files.
*
* @method canPlayVideo
* @memberof Phaser.Device.prototype
* @param {string} type - One of 'mp4, 'ogg', 'webm' or 'mpeg'.
* @return {boolean} True if the given file type is supported by the browser, otherwise false.
*/
Phaser.Device.canPlayVideo = function (type) {

    if (type === 'webm' && (this.webmVideo || this.vp9Video))
    {
        return true;
    }
    else if (type === 'mp4' && (this.mp4Video || this.h264Video))
    {
        return true;
    }
    else if (type === 'ogg' && this.oggVideo)
    {
        return true;
    }
    else if (type === 'mpeg' && this.hlsVideo)
    {
        return true;
    }

    return false;

};

/**
* Check whether the console is open.
* Note that this only works in Firefox with Firebug and earlier versions of Chrome.
* It used to work in Chrome, but then they removed the ability: {@link http://src.chromium.org/viewvc/blink?view=revision&revision=151136}
*
* @method isConsoleOpen
* @memberof Phaser.Device.prototype
*/
Phaser.Device.isConsoleOpen = function () {

    if (window.console && window.console['firebug'])
    {
        return true;
    }

    if (window.console)
    {
        console.profile();
        console.profileEnd();

        if (console.clear)
        {
            console.clear();
        }

        if (console['profiles'])
        {
            return console['profiles'].length > 0;
        }
    }

    return false;

};

/**
* Detect if the host is a an Android Stock browser.
* This is available before the device "ready" event.
*
* Authors might want to scale down on effects and switch to the CANVAS rendering method on those devices.
*
* @example
* var defaultRenderingMode = Phaser.Device.isAndroidStockBrowser() ? Phaser.CANVAS : Phaser.AUTO;
* 
* @method isAndroidStockBrowser
* @memberof Phaser.Device.prototype
*/
Phaser.Device.isAndroidStockBrowser = function () {

    var matches = window.navigator.userAgent.match(/Android.*AppleWebKit\/([\d.]+)/);
    return matches && matches[1] < 537;

};

/**
* @author       Richard Davey <rich@photonstorm.com>
* @copyright    2015 Photon Storm Ltd.
* @license      {@link https://github.com/photonstorm/phaser/blob/master/license.txt|MIT License}
*/

/**
* DOM utility class.
*
* Provides a useful Window and Element functions as well as cross-browser compatibility buffer.
*
* Some code originally derived from {@link https://github.com/ryanve/verge verge}.
* Some parts were inspired by the research of Ryan Van Etten, released under MIT License 2013.
* 
* @class Phaser.DOM
* @static
*/
Phaser.DOM = {

    /**
    * Get the [absolute] position of the element relative to the Document.
    *
    * The value may vary slightly as the page is scrolled due to rounding errors.
    *
    * @method Phaser.DOM.getOffset
    * @param {DOMElement} element - The targeted element that we want to retrieve the offset.
    * @param {Phaser.Point} [point] - The point we want to take the x/y values of the offset.
    * @return {Phaser.Point} - A point objet with the offsetX and Y as its properties.
    */
    getOffset: function (element, point) {

        point = point || new Phaser.Point();

        var box = element.getBoundingClientRect();

        var scrollTop = Phaser.DOM.scrollY;
        var scrollLeft = Phaser.DOM.scrollX;
        var clientTop = document.documentElement.clientTop;
        var clientLeft = document.documentElement.clientLeft;

        point.x = box.left + scrollLeft - clientLeft;
        point.y = box.top + scrollTop - clientTop;

        return point;

    },

    /**
    * A cross-browser element.getBoundingClientRect method with optional cushion.
    * 
    * Returns a plain object containing the properties `top/bottom/left/right/width/height` with respect to the top-left corner of the current viewport.
    * Its properties match the native rectangle.
    * The cushion parameter is an amount of pixels (+/-) to cushion the element.
    * It adjusts the measurements such that it is possible to detect when an element is near the viewport.
    * 
    * @method Phaser.DOM.getBounds
    * @param {DOMElement|Object} element - The element or stack (uses first item) to get the bounds for.
    * @param {number} [cushion] - A +/- pixel adjustment amount.
    * @return {Object|boolean} A plain object containing the properties `top/bottom/left/right/width/height` or `false` if a non-valid element is given.
    */
    getBounds: function (element, cushion) {

        if (cushion === undefined) { cushion = 0; }

        element = element && !element.nodeType ? element[0] : element;

        if (!element || element.nodeType !== 1)
        {
            return false;
        }
        else
        {
            return this.calibrate(element.getBoundingClientRect(), cushion);
        }

    },

    /**
    * Calibrates element coordinates for `inLayoutViewport` checks.
    *
    * @method Phaser.DOM.calibrate
    * @private
    * @param {object} coords - An object containing the following properties: `{top: number, right: number, bottom: number, left: number}`
    * @param {number} [cushion] - A value to adjust the coordinates by.
    * @return {object} The calibrated element coordinates
    */
    calibrate: function (coords, cushion) {

        cushion = +cushion || 0;

        var output = { width: 0, height: 0, left: 0, right: 0, top: 0, bottom: 0 };

        output.width = (output.right = coords.right + cushion) - (output.left = coords.left - cushion);
        output.height = (output.bottom = coords.bottom + cushion) - (output.top = coords.top - cushion);

        return output;

    },

    /**
    * Get the Visual viewport aspect ratio (or the aspect ratio of an object or element)    
    * 
    * @method Phaser.DOM.getAspectRatio
    * @param {(DOMElement|Object)} [object=(visualViewport)] - The object to determine the aspect ratio for. Must have public `width` and `height` properties or methods.
    * @return {number} The aspect ratio.
    */
    getAspectRatio: function (object) {

        object = null == object ? this.visualBounds : 1 === object.nodeType ? this.getBounds(object) : object;

        var w = object['width'];
        var h = object['height'];

        if (typeof w === 'function')
        {
            w = w.call(object);
        }

        if (typeof h === 'function')
        {
            h = h.call(object);
        }

        return w / h;

    },

    /**
    * Tests if the given DOM element is within the Layout viewport.
    * 
    * The optional cushion parameter allows you to specify a distance.
    * 
    * inLayoutViewport(element, 100) is `true` if the element is in the viewport or 100px near it.
    * inLayoutViewport(element, -100) is `true` if the element is in the viewport or at least 100px near it.
    * 
    * @method Phaser.DOM.inLayoutViewport
    * @param {DOMElement|Object} element - The DOM element to check. If no element is given it defaults to the Phaser game canvas.
    * @param {number} [cushion] - The cushion allows you to specify a distance within which the element must be within the viewport.
    * @return {boolean} True if the element is within the viewport, or within `cushion` distance from it.
    */
    inLayoutViewport: function (element, cushion) {

        var r = this.getBounds(element, cushion);

        return !!r && r.bottom >= 0 && r.right >= 0 && r.top <= this.layoutBounds.width && r.left <= this.layoutBounds.height;

    },

    /**
    * Returns the device screen orientation.
    *
    * Orientation values: 'portrait-primary', 'landscape-primary', 'portrait-secondary', 'landscape-secondary'.
    *
    * Order of resolving:
    * - Screen Orientation API, or variation of - Future track. Most desktop and mobile browsers.
    * - Screen size ratio check - If fallback is 'screen', suited for desktops.
    * - Viewport size ratio check - If fallback is 'viewport', suited for mobile.
    * - window.orientation - If fallback is 'window.orientation', works iOS and probably most Android; non-recommended track.
    * - Media query
    * - Viewport size ratio check (probably only IE9 and legacy mobile gets here..)
    *
    * See
    * - https://w3c.github.io/screen-orientation/ (conflicts with mozOrientation/msOrientation)
    * - https://developer.mozilla.org/en-US/docs/Web/API/Screen.orientation (mozOrientation)
    * - http://msdn.microsoft.com/en-us/library/ie/dn342934(v=vs.85).aspx
    * - https://developer.mozilla.org/en-US/docs/Web/Guide/CSS/Testing_media_queries
    * - http://stackoverflow.com/questions/4917664/detect-viewport-orientation
    * - http://www.matthewgifford.com/blog/2011/12/22/a-misconception-about-window-orientation
    *
    * @method Phaser.DOM.getScreenOrientation
    * @protected
    * @param {string} [primaryFallback=(none)] - Specify 'screen', 'viewport', or 'window.orientation'.
    */
    getScreenOrientation: function (primaryFallback) {

        var screen = window.screen;
        var orientation = screen.orientation || screen.mozOrientation || screen.msOrientation;

        if (orientation && typeof orientation.type === 'string')
        {
            // Screen Orientation API specification
            return orientation.type;
        }
        else if (typeof orientation === 'string')
        {
            // moz/ms-orientation are strings
            return orientation;
        }

        var PORTRAIT = 'portrait-primary';
        var LANDSCAPE = 'landscape-primary';
        
        if (primaryFallback === 'screen')
        {
            return (screen.height > screen.width) ? PORTRAIT : LANDSCAPE;
        }
        else if (primaryFallback === 'viewport')
        {
            return (this.visualBounds.height > this.visualBounds.width) ? PORTRAIT : LANDSCAPE;
        }
        else if (primaryFallback === 'window.orientation' && typeof window.orientation === 'number')
        {
            // This may change by device based on "natural" orientation.
            return (window.orientation === 0 || window.orientation === 180) ? PORTRAIT : LANDSCAPE;
        }
        else if (window.matchMedia)
        {
            if (window.matchMedia("(orientation: portrait)").matches)
            {
                return PORTRAIT;
            }
            else if (window.matchMedia("(orientation: landscape)").matches)
            {
                return LANDSCAPE;
            }
        }

        return (this.visualBounds.height > this.visualBounds.width) ? PORTRAIT : LANDSCAPE;

    },

    /**
    * The bounds of the Visual viewport, as discussed in 
    * {@link http://www.quirksmode.org/mobile/viewports.html A tale of two viewports — part one}
    * with one difference: the viewport size _excludes_ scrollbars, as found on some desktop browsers.   
    *
    * Supported mobile:
    *   iOS/Safari, Android 4, IE10, Firefox OS (maybe not Firefox Android), Opera Mobile 16
    *
    * The properties change dynamically.
    *
    * @type {Phaser.Rectangle}
    * @property {number} x - Scroll, left offset - eg. "scrollX"
    * @property {number} y - Scroll, top offset - eg. "scrollY"
    * @property {number} width - Viewport width in pixels.
    * @property {number} height - Viewport height in pixels.
    * @readonly
    */
    visualBounds: new Phaser.Rectangle(),

    /**
    * The bounds of the Layout viewport, as discussed in 
    * {@link http://www.quirksmode.org/mobile/viewports2.html A tale of two viewports — part two};
    * but honoring the constraints as specified applicable viewport meta-tag.
    *
    * The bounds returned are not guaranteed to be fully aligned with CSS media queries (see
    * {@link http://www.matanich.com/2013/01/07/viewport-size/ What size is my viewport?}).
    *
    * This is _not_ representative of the Visual bounds: in particular the non-primary axis will
    * generally be significantly larger than the screen height on mobile devices when running with a
    * constrained viewport.
    *
    * The properties change dynamically.
    *
    * @type {Phaser.Rectangle}
    * @property {number} width - Viewport width in pixels.
    * @property {number} height - Viewport height in pixels.
    * @readonly
    */
    layoutBounds: new Phaser.Rectangle(),

    /**
    * The size of the document / Layout viewport.
    *
    * This incorrectly reports the dimensions in IE.
    *
    * The properties change dynamically.
    *
    * @type {Phaser.Rectangle}
    * @property {number} width - Document width in pixels.
    * @property {number} height - Document height in pixels.
    * @readonly
    */
    documentBounds: new Phaser.Rectangle()

};

Phaser.Device.whenReady(function (device) {

    // All target browsers should support page[XY]Offset.
    var scrollX = window && ('pageXOffset' in window) ?
        function () { return window.pageXOffset; } :
        function () { return document.documentElement.scrollLeft; };

    var scrollY = window && ('pageYOffset' in window) ?
        function () { return window.pageYOffset; } :
        function () { return document.documentElement.scrollTop; };

    /**
    * A cross-browser window.scrollX.
    *
    * @name Phaser.DOM.scrollX
    * @property {number} scrollX
    * @readonly
    * @protected
    */
    Object.defineProperty(Phaser.DOM, "scrollX", {
        get: scrollX
    });

    /**
    * A cross-browser window.scrollY.
    *
    * @name Phaser.DOM.scrollY
    * @property {number} scrollY
    * @readonly
    * @protected
    */
    Object.defineProperty(Phaser.DOM, "scrollY", {
        get: scrollY
    });

    Object.defineProperty(Phaser.DOM.visualBounds, "x", {
        get: scrollX
    });

    Object.defineProperty(Phaser.DOM.visualBounds, "y", {
        get: scrollY
    });

    Object.defineProperty(Phaser.DOM.layoutBounds, "x", {
        value: 0
    });

    Object.defineProperty(Phaser.DOM.layoutBounds, "y", {
        value: 0
    });

    var treatAsDesktop = device.desktop &&
        (document.documentElement.clientWidth <= window.innerWidth) &&
        (document.documentElement.clientHeight <= window.innerHeight);

    // Desktop browsers align the layout viewport with the visual viewport.
    // This differs from mobile browsers with their zooming design.
    // Ref. http://quirksmode.org/mobile/tableViewport.html  
    if (treatAsDesktop)
    {

        // PST- When scrollbars are not included this causes upstream issues in ScaleManager.
        // So reverted to the old "include scrollbars."
        var clientWidth = function () {
            return Math.max(window.innerWidth, document.documentElement.clientWidth);
        };
        var clientHeight = function () {
            return Math.max(window.innerHeight, document.documentElement.clientHeight);
        };

        // Interested in area sans-scrollbar
        Object.defineProperty(Phaser.DOM.visualBounds, "width", {
            get: clientWidth
        });

        Object.defineProperty(Phaser.DOM.visualBounds, "height", {
            get: clientHeight
        });

        Object.defineProperty(Phaser.DOM.layoutBounds, "width", {
            get: clientWidth
        });

        Object.defineProperty(Phaser.DOM.layoutBounds, "height", {
            get: clientHeight
        });

    } else {

        Object.defineProperty(Phaser.DOM.visualBounds, "width", {
            get: function () {
                return window.innerWidth;
            }
        });

        Object.defineProperty(Phaser.DOM.visualBounds, "height", {
            get: function () {
                return window.innerHeight;
            }
        });

        Object.defineProperty(Phaser.DOM.layoutBounds, "width", {

            get: function () {
                var a = document.documentElement.clientWidth;
                var b = window.innerWidth;

                return a < b ? b : a; // max
            }

        });

        Object.defineProperty(Phaser.DOM.layoutBounds, "height", {

            get: function () {
                var a = document.documentElement.clientHeight;
                var b = window.innerHeight;

                return a < b ? b : a; // max
            }

        });

    }

    // For Phaser.DOM.documentBounds
    // Ref. http://www.quirksmode.org/mobile/tableViewport_desktop.html

    Object.defineProperty(Phaser.DOM.documentBounds, "x", {
        value: 0
    });

    Object.defineProperty(Phaser.DOM.documentBounds, "y", {
        value: 0
    });

    Object.defineProperty(Phaser.DOM.documentBounds, "width", {

        get: function () {
            var d = document.documentElement;
            return Math.max(d.clientWidth, d.offsetWidth, d.scrollWidth);
        }

    });

    Object.defineProperty(Phaser.DOM.documentBounds, "height", {

        get: function () {
            var d = document.documentElement;
            return Math.max(d.clientHeight, d.offsetHeight, d.scrollHeight);
        }

    });

}, null, true);

/**
* @author       Richard Davey <rich@photonstorm.com>
* @copyright    2015 Photon Storm Ltd.
* @license      {@link https://github.com/photonstorm/phaser/blob/master/license.txt|MIT License}
*/

/**
* The Canvas class handles everything related to creating the `canvas` DOM tag that Phaser will use, including styles, offset and aspect ratio.
*
* @class Phaser.Canvas
* @static
*/
Phaser.Canvas = {

    /**
    * Creates a `canvas` DOM element. The element is not automatically added to the document.
    *
    * @method Phaser.Canvas.create
    * @param {number} [width=256] - The width of the canvas element.
    * @param {number} [height=256] - The height of the canvas element..
    * @param {string} [id=(none)] - If specified, and not the empty string, this will be set as the ID of the canvas element. Otherwise no ID will be set.
    * @return {HTMLCanvasElement} The newly created canvas element.
    */
    create: function (width, height, id) {

        width = width || 256;
        height = height || 256;

        var canvas = document.createElement('canvas');

        if (typeof id === 'string' && id !== '')
        {
            canvas.id = id;
        }

        canvas.width = width;
        canvas.height = height;

        canvas.style.display = 'block';

        return canvas;

    },

    /**
    * Sets the background color behind the canvas. This changes the canvas style property.
    *
    * @method Phaser.Canvas.setBackgroundColor
    * @param {HTMLCanvasElement} canvas - The canvas to set the background color on.
    * @param {string} [color] - The color to set. Can be in the format 'rgb(r,g,b)', or '#RRGGBB' or any valid CSS color.
    * @return {HTMLCanvasElement} Returns the source canvas.
    */
    setBackgroundColor: function (canvas, color) {

        color = color || 'rgb(0,0,0)';

        canvas.style.backgroundColor = color;

        return canvas;

    },

    /**
    * Sets the touch-action property on the canvas style. Can be used to disable default browser touch actions.
    *
    * @method Phaser.Canvas.setTouchAction
    * @param {HTMLCanvasElement} canvas - The canvas to set the touch action on.
    * @param {string} [value] - The touch action to set. Defaults to 'none'.
    * @return {HTMLCanvasElement} The source canvas.
    */
    setTouchAction: function (canvas, value) {

        value = value || 'none';

        canvas.style.msTouchAction = value;
        canvas.style['ms-touch-action'] = value;
        canvas.style['touch-action'] = value;

        return canvas;

    },

    /**
    * Sets the user-select property on the canvas style. Can be used to disable default browser selection actions.
    *
    * @method Phaser.Canvas.setUserSelect
    * @param {HTMLCanvasElement} canvas - The canvas to set the touch action on.
    * @param {string} [value] - The touch action to set. Defaults to 'none'.
    * @return {HTMLCanvasElement} The source canvas.
    */
    setUserSelect: function (canvas, value) {

        value = value || 'none';

        canvas.style['-webkit-touch-callout'] = value;
        canvas.style['-webkit-user-select'] = value;
        canvas.style['-khtml-user-select'] = value;
        canvas.style['-moz-user-select'] = value;
        canvas.style['-ms-user-select'] = value;
        canvas.style['user-select'] = value;
        canvas.style['-webkit-tap-highlight-color'] = 'rgba(0, 0, 0, 0)';

        return canvas;

    },

    /**
    * Adds the given canvas element to the DOM. The canvas will be added as a child of the given parent.
    * If no parent is given it will be added as a child of the document.body.
    *
    * @method Phaser.Canvas.addToDOM
    * @param {HTMLCanvasElement} canvas - The canvas to be added to the DOM.
    * @param {string|HTMLElement} parent - The DOM element to add the canvas to.
    * @param {boolean} [overflowHidden=true] - If set to true it will add the overflow='hidden' style to the parent DOM element.
    * @return {HTMLCanvasElement} Returns the source canvas.
    */
    addToDOM: function (canvas, parent, overflowHidden) {

        var target;

        if (overflowHidden === undefined) { overflowHidden = true; }

        if (parent)
        {
            if (typeof parent === 'string')
            {
                // hopefully an element ID
                target = document.getElementById(parent);
            }
            else if (typeof parent === 'object' && parent.nodeType === 1)
            {
                // quick test for a HTMLelement
                target = parent;
            }
        }

        // Fallback, covers an invalid ID and a non HTMLelement object
        if (!target)
        {
            target = document.body;
        }

        if (overflowHidden && target.style)
        {
            target.style.overflow = 'hidden';
        }

        target.appendChild(canvas);

        return canvas;

    },

    /**
    * Removes the given canvas element from the DOM.
    *
    * @method Phaser.Canvas.removeFromDOM
    * @param {HTMLCanvasElement} canvas - The canvas to be removed from the DOM.
    */
    removeFromDOM: function (canvas) {

        if (canvas.parentNode)
        {
            canvas.parentNode.removeChild(canvas);
        }

    },

    /**
    * Sets the transform of the given canvas to the matrix values provided.
    *
    * @method Phaser.Canvas.setTransform
    * @param {CanvasRenderingContext2D} context - The context to set the transform on.
    * @param {number} translateX - The value to translate horizontally by.
    * @param {number} translateY - The value to translate vertically by.
    * @param {number} scaleX - The value to scale horizontally by.
    * @param {number} scaleY - The value to scale vertically by.
    * @param {number} skewX - The value to skew horizontaly by.
    * @param {number} skewY - The value to skew vertically by.
    * @return {CanvasRenderingContext2D} Returns the source context.
    */
    setTransform: function (context, translateX, translateY, scaleX, scaleY, skewX, skewY) {

        context.setTransform(scaleX, skewX, skewY, scaleY, translateX, translateY);

        return context;

    },

    /**
    * Sets the Image Smoothing property on the given context. Set to false to disable image smoothing.
    * By default browsers have image smoothing enabled, which isn't always what you visually want, especially
    * when using pixel art in a game. Note that this sets the property on the context itself, so that any image
    * drawn to the context will be affected. This sets the property across all current browsers but support is
    * patchy on earlier browsers, especially on mobile.
    *
    * @method Phaser.Canvas.setSmoothingEnabled
    * @param {CanvasRenderingContext2D} context - The context to enable or disable the image smoothing on.
    * @param {boolean} value - If set to true it will enable image smoothing, false will disable it.
    * @return {CanvasRenderingContext2D} Returns the source context.
    */
    setSmoothingEnabled: function (context, value) {

        var vendor = [ 'i', 'mozI', 'oI', 'webkitI', 'msI' ];

        for (var prefix in vendor)
        {
            var s = vendor[prefix] + 'mageSmoothingEnabled';

            if (s in context)
            {
                context[s] = value;
                return context;
            }
        }

        return context;

    },

    /**
     * Returns `true` if the given context has image smoothing enabled, otherwise returns `false`.
     *
     * @method Phaser.Canvas.getSmoothingEnabled
     * @param {CanvasRenderingContext2D} context - The context to check for smoothing on.
     * @return {boolean} True if the given context has image smoothing enabled, otherwise false.
     */
    getSmoothingEnabled: function (context) {

        return (context['imageSmoothingEnabled'] || context['mozImageSmoothingEnabled'] || context['oImageSmoothingEnabled'] || context['webkitImageSmoothingEnabled'] || context['msImageSmoothingEnabled']);

    },

    /**
    * Sets the CSS image-rendering property on the given canvas to be 'crisp' (aka 'optimize contrast' on webkit).
    * Note that if this doesn't given the desired result then see the setSmoothingEnabled.
    *
    * @method Phaser.Canvas.setImageRenderingCrisp
    * @param {HTMLCanvasElement} canvas - The canvas to set image-rendering crisp on.
    * @return {HTMLCanvasElement} Returns the source canvas.
    */
    setImageRenderingCrisp: function (canvas) {

        canvas.style['image-rendering'] = 'optimizeSpeed';
        canvas.style['image-rendering'] = 'crisp-edges';
        canvas.style['image-rendering'] = '-moz-crisp-edges';
        canvas.style['image-rendering'] = '-webkit-optimize-contrast';
        canvas.style['image-rendering'] = 'optimize-contrast';
        canvas.style['image-rendering'] = 'pixelated';
        canvas.style.msInterpolationMode = 'nearest-neighbor';

        return canvas;

    },

    /**
    * Sets the CSS image-rendering property on the given canvas to be 'bicubic' (aka 'auto').
    * Note that if this doesn't given the desired result then see the CanvasUtils.setSmoothingEnabled method.
    *
    * @method Phaser.Canvas.setImageRenderingBicubic
    * @param {HTMLCanvasElement} canvas The canvas to set image-rendering bicubic on.
    * @return {HTMLCanvasElement} Returns the source canvas.
    */
    setImageRenderingBicubic: function (canvas) {

        canvas.style['image-rendering'] = 'auto';
        canvas.style.msInterpolationMode = 'bicubic';

        return canvas;

    }

};

/**
* @author       Richard Davey <rich@photonstorm.com>
* @copyright    2015 Photon Storm Ltd.
* @license      {@link https://github.com/photonstorm/phaser/blob/master/license.txt|MIT License}
*/

/**
* Abstracts away the use of RAF or setTimeOut for the core game update loop.
*
* @class Phaser.RequestAnimationFrame
* @constructor
* @param {Phaser.Game} game - A reference to the currently running game.
* @param {boolean} [forceSetTimeOut=false] - Tell Phaser to use setTimeOut even if raf is available.
*/
Phaser.RequestAnimationFrame = function(game, forceSetTimeOut) {

    if (forceSetTimeOut === undefined) { forceSetTimeOut = false; }

    /**
    * @property {Phaser.Game} game - The currently running game.
    */
    this.game = game;

    /**
    * @property {boolean} isRunning - true if RequestAnimationFrame is running, otherwise false.
    * @default
    */
    this.isRunning = false;

    /**
    * @property {boolean} forceSetTimeOut - Tell Phaser to use setTimeOut even if raf is available.
    */
    this.forceSetTimeOut = forceSetTimeOut;

    var vendors = [
        'ms',
        'moz',
        'webkit',
        'o'
    ];

    for (var x = 0; x < vendors.length && !window.requestAnimationFrame; x++)
    {
        window.requestAnimationFrame = window[vendors[x] + 'RequestAnimationFrame'];
        window.cancelAnimationFrame = window[vendors[x] + 'CancelAnimationFrame'];
    }

    /**
    * @property {boolean} _isSetTimeOut  - true if the browser is using setTimeout instead of raf.
    * @private
    */
    this._isSetTimeOut = false;

    /**
    * @property {function} _onLoop - The function called by the update.
    * @private
    */
    this._onLoop = null;

    /**
    * @property {number} _timeOutID - The callback ID used when calling cancel.
    * @private
    */
    this._timeOutID = null;

};

Phaser.RequestAnimationFrame.prototype = {

    /**
    * Starts the requestAnimationFrame running or setTimeout if unavailable in browser
    * @method Phaser.RequestAnimationFrame#start
    */
    start: function () {

        this.isRunning = true;

        var _this = this;

        if (!window.requestAnimationFrame || this.forceSetTimeOut)
        {
            this._isSetTimeOut = true;

            this._onLoop = function () {
                return _this.updateSetTimeout();
            };

            this._timeOutID = window.setTimeout(this._onLoop, 0);
        }
        else
        {
            this._isSetTimeOut = false;

            this._onLoop = function (time) {
                return _this.updateRAF(time);
            };

            this._timeOutID = window.requestAnimationFrame(this._onLoop);
        }

    },

    /**
    * The update method for the requestAnimationFrame
    * @method Phaser.RequestAnimationFrame#updateRAF
    * 
    */
    updateRAF: function (rafTime) {

        // floor the rafTime to make it equivalent to the Date.now() provided by updateSetTimeout (just below)
        this.game.update(Math.floor(rafTime));

        this._timeOutID = window.requestAnimationFrame(this._onLoop);

    },

    /**
    * The update method for the setTimeout.
    * @method Phaser.RequestAnimationFrame#updateSetTimeout
    */
    updateSetTimeout: function () {

        this.game.update(Date.now());

        this._timeOutID = window.setTimeout(this._onLoop, this.game.time.timeToCall);

    },

    /**
    * Stops the requestAnimationFrame from running.
    * @method Phaser.RequestAnimationFrame#stop
    */
    stop: function () {

        if (this._isSetTimeOut)
        {
            clearTimeout(this._timeOutID);
        }
        else
        {
            window.cancelAnimationFrame(this._timeOutID);
        }

        this.isRunning = false;

    },

    /**
    * Is the browser using setTimeout?
    * @method Phaser.RequestAnimationFrame#isSetTimeOut
    * @return {boolean}
    */
    isSetTimeOut: function () {
        return this._isSetTimeOut;
    },

    /**
    * Is the browser using requestAnimationFrame?
    * @method Phaser.RequestAnimationFrame#isRAF
    * @return {boolean}
    */
    isRAF: function () {
        return (this._isSetTimeOut === false);
    }

};

Phaser.RequestAnimationFrame.prototype.constructor = Phaser.RequestAnimationFrame;
