//
// ClientJS.  An easy to use, simple, and flexible client information library written in JavaScript.
//
//      Version: 0.1.11
//
//      Original Author: Jack Spirou
//      Original Data: 5 Nov 2013

// ClientJS.  Return a JavaScript object containing information collected about a client.
//            Return browser/device fingerprint as a 32 bit integer hash ID.

// BUILT UPON:
//      - https://github.com/Valve/fingerprintjs
//      - http://darkwavetech.com/device_fingerprint.html
//      - detectmobilebrowsers.com JavaScript Mobile Detection Script

// Dependencies Include:
//      - ua-parser.js
//      - fontdetect.js
//      - swfobject.js
//      - murmurhash3.js

// BROWSER FINGERPRINT DATA POINTS
//      - userAgent
//      - screenPrint
//          - colordepth
//          - currentResolution
//          - availableResolution
//          - deviceXDPI
//          - deviceYDPI
//      - plugin list
//      - font list
//      - localStorage
//      - sessionStorage
//      - timezone
//      - language
//      - systemLanguage
//      - cookies
//      - canvasPrint

// METHOD Naming CONVENTION
//      is[MethodName]  = return boolean
//      get[MethodName] = return int|string|object

// METHODS
//
//      var client = new ClientJS();
//
//      client.getSoftwareVersion();
//      client.getBrowserData();
//      client.getFingerPrint();
//      client.getCustomFingerprint(...);
//
//      client.getUserAgent();
//      client.getUserAgentLowerCase();
//
//      client.getBrowser();
//      client.getBrowserVersion();
//      client.getBrowserMajorVersion();
//      client.isIE();
//      client.isChrome();
//      client.isFirefox();
//      client.isSafari();
//      client.isMobileSafari();
//      client.isOpera();
//
//      client.getEngine();
//      client.getEngineVersion();
//
//      client.getOS();
//      client.getOSVersion();
//      client.isWindows();
//      client.isMac();
//      client.isLinux();
//      client.isUbuntu();
//      client.isSolaris();
//
//      client.getDevice();
//      client.getDeviceType();
//      client.getDeviceVendor();
//
//      client.getCPU();
//
//      client.isMobile();
//      client.isMobileMajor();
//      client.isMobileAndroid();
//      client.isMobileOpera();
//      client.isMobileWindows();
//      client.isMobileBlackBerry();
//
//      client.isMobileIOS();
//      client.isIphone();
//      client.isIpad();
//      client.isIpod();
//
//      client.getScreenPrint();
//      client.getColorDepth();
//      client.getCurrentResolution();
//      client.getAvailableResolution();
//      client.getDeviceXDPI();
//      client.getDeviceYDPI();
//
//      client.getPlugins();
//      client.isJava();
//      client.getJavaVersion();
//      client.isFlash();
//      client.getFlashVersion();
//      client.isSilverlight();
//      client.getSilverlightVersion();
//
//      client.getMimeTypes();
//      client.isMimeTypes();
//
//      client.isFont();
//      client.getFonts();
//
//      client.isLocalStorage();
//      client.isSessionStorage();
//      client.isCookie();
//
//      client.getTimeZone();
//
//      client.getLanguage();
//      client.getSystemLanguage();
//
//      client.isCanvas();
//      client.getCanvasPrint();

// Anonymous auto JavaScript function execution.
(function(scope) {
  'use strict';

  var browserData; // Global user agent browser object.
  var fontDetective; // Global font detective object.

  // ClientJS constructor which sets the browserData object and returs the client object.
  var ClientJS = function() {
    var parser = new(window.UAParser || exports.UAParser);
    browserData = parser.getResult();
    fontDetective = new Detector();
    return this;
  };

  // ClientJS prototype which contains all methods.
  ClientJS.prototype = {

    //
    // MAIN METHODS
    //

    // Get Software Version.  Return a string containing this software version number.
    getSoftwareVersion: function() {
      var version = "0.1.11";
      return version;
    },

    // Get Browser Data.  Return an object containing browser user agent.
    getBrowserData: function() {
      return browserData;
    },

    // Get Fingerprint.  Return a 32-bit integer representing the browsers fingerprint.
    getFingerprint: function() {
      var bar = '|';

      var userAgent = browserData.ua;
      var screenPrint = this.getScreenPrint();
      var pluginList = this.getPlugins();
      var fontList = this.getFonts();
      var localStorage = this.isLocalStorage();
      var sessionStorage = this.isSessionStorage();
      var timeZone = this.getTimeZone();
      var language = this.getLanguage();
      var systemLanguage = this.getSystemLanguage();
      var cookies = this.isCookie();
      var canvasPrint = this.getCanvasPrint();

      var key = userAgent + bar + screenPrint + bar + pluginList + bar + fontList + bar + localStorage + bar + sessionStorage + bar + timeZone + bar + language + bar + systemLanguage + bar + cookies + bar + canvasPrint;
      var seed = 256;

      return murmurhash3_32_gc(key, seed);
    },

    // Get Custom Fingerprint.  Take a string of datapoints and eturn a 32-bit integer representing the browsers fingerprint.
    getCustomFingerprint: function() {
      var bar = '|';
      var key = "";
      for (var i = 0; i < arguments.length; i++) {
        key += arguments[i] + bar;
      }
      return murmurhash3_32_gc(key, 256);
    },

    //
    // USER AGENT METHODS
    //

    // Get User Agent.  Return a string containing unparsed user agent.
    getUserAgent: function() {
      return browserData.ua;
    },

    // Get User Agent Lower Case.  Return a lowercase string containing the user agent.
    getUserAgentLowerCase: function() {
      return browserData.ua.toLowerCase();
    },

    //
    // BROWSER METHODS
    //

    // Get Browser.  Return a string containing the browser name.
    getBrowser: function() {
      return browserData.browser.name;
    },

    // Get Browser Version.  Return a string containing the browser version.
    getBrowserVersion: function() {
      return browserData.browser.version;
    },

    // Get Browser Major Version.  Return a string containing the major browser version.
    getBrowserMajorVersion: function() {
      return browserData.browser.major;
    },

    // Is IE.  Check if the browser is IE.
    isIE: function() {
      return (/IE/i.test(browserData.browser.name));
    },

    // Is Chrome.  Check if the browser is Chrome.
    isChrome: function() {
      return (/Chrome/i.test(browserData.browser.name));
    },

    // Is Firefox.  Check if the browser is Firefox.
    isFirefox: function() {
      return (/Firefox/i.test(browserData.browser.name));
    },

    // Is Safari.  Check if the browser is Safari.
    isSafari: function() {
      return (/Safari/i.test(browserData.browser.name));
    },

    // Is Mobile Safari.  Check if the browser is Safari.
    isMobileSafari: function() {
      return (/Mobile\sSafari/i.test(browserData.browser.name));
    },

    // Is Opera.  Check if the browser is Opera.
    isOpera: function() {
      return (/Opera/i.test(browserData.browser.name));
    },

    //
    // ENGINE METHODS
    //

    // Get Engine.  Return a string containing the browser engine.
    getEngine: function() {
      return browserData.engine.name;
    },

    // Get Engine Version.  Return a string containing the browser engine version.
    getEngineVersion: function() {
      return browserData.engine.version;
    },

    //
    // OS METHODS
    //

    // Get OS.  Return a string containing the OS.
    getOS: function() {
      return browserData.os.name;
    },

    // Get OS Version.  Return a string containing the OS Version.
    getOSVersion: function() {
      return browserData.os.version;
    },

    // Is Windows.  Check if the OS is Windows.
    isWindows: function() {
      return (/Windows/i.test(browserData.os.name));
    },

    // Is Mac.  Check if the OS is Mac.
    isMac: function() {
      return (/Mac/i.test(browserData.os.name));
    },

    // Is Linux.  Check if the OS is Linux.
    isLinux: function() {
      return (/Linux/i.test(browserData.os.name));
    },

    // Is Ubuntu.  Check if the OS is Ubuntu.
    isUbuntu: function() {
      return (/Ubuntu/i.test(browserData.os.name));
    },

    // Is Solaris.  Check if the OS is Solaris.
    isSolaris: function() {
      return (/Solaris/i.test(browserData.os.name));
    },

    //
    // DEVICE METHODS
    //

    // Get Device.  Return a string containing the device.
    getDevice: function() {
      return browserData.device.model;
    },

    // Get Device Type.  Return a string containing the device type.
    getDeviceType: function() {
      return browserData.device.type;
    },

    // Get Device Vendor.  Return a string containing the device vendor.
    getDeviceVendor: function() {
      return browserData.device.vendor;
    },

    //
    // CPU METHODS
    //

    // Get CPU.  Return a string containing the CPU architecture.
    getCPU: function() {
      return browserData.cpu.architecture;
    },

    //
    // MOBILE METHODS
    //

    // Is Mobile.  Check if the browser is on a mobile device.
    isMobile: function() {
      // detectmobilebrowsers.com JavaScript Mobile Detection Script
      var dataString = browserData.ua || navigator.vendor || window.opera;
      return (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(dataString) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(dataString.substr(0, 4)));
    },

    // Is Mobile Major.  Check if the browser is on a major mobile device.
    isMobileMajor: function() {
      return (this.isMobileAndroid() || this.isMobileBlackBerry() || this.isMobileIOS() || this.isMobileOpera() || this.isMobileWindows());
    },

    // Is Mobile.  Check if the browser is on an android mobile device.
    isMobileAndroid: function() {
      if (browserData.ua.match(/Android/i)) {
        return true;
      }
      return false;
    },

    // Is Mobile Opera.  Check if the browser is on an opera mobile device.
    isMobileOpera: function() {
      if (browserData.ua.match(/Opera Mini/i)) {
        return true;
      }
      return false;
    },

    // Is Mobile Windows.  Check if the browser is on a windows mobile device.
    isMobileWindows: function() {
      if (browserData.ua.match(/IEMobile/i)) {
        return true;
      }
      return false;
    },

    // Is Mobile BlackBerry.  Check if the browser is on a blackberry mobile device.
    isMobileBlackBerry: function() {
      if (browserData.ua.match(/BlackBerry/i)) {
        return true;
      }
      return false;
    },

    //
    // MOBILE APPLE METHODS
    //

    // Is Mobile iOS.  Check if the browser is on an Apple iOS device.
    isMobileIOS: function() {
      if (browserData.ua.match(/iPhone|iPad|iPod/i)) {
        return true;
      }
      return false;
    },

    // Is Iphone.  Check if the browser is on an Apple iPhone.
    isIphone: function() {
      if (browserData.ua.match(/iPhone/i)) {
        return true;
      }
      return false;
    },

    // Is Ipad.  Check if the browser is on an Apple iPad.
    isIpad: function() {
      if (browserData.ua.match(/iPad/i)) {
        return true;
      }
      return false;
    },

    // Is Ipod.  Check if the browser is on an Apple iPod.
    isIpod: function() {
      if (browserData.ua.match(/iPod/i)) {
        return true;
      }
      return false;
    },

    //
    // SCREEN METHODS
    //

    // Get Screen Print.  Return a string containing screen information.
    getScreenPrint: function() {
      return "Current Resolution: " + this.getCurrentResolution() + ", Available Resolution: " + this.getAvailableResolution() + ", Color Depth: " + this.getColorDepth() + ", Device XDPI: " + this.getDeviceXDPI() + ", Device YDPI: " + this.getDeviceYDPI();
    },

    // Get Color Depth.  Return a string containing the color depth.
    getColorDepth: function() {
      return screen.colorDepth;
    },

    // Get Current Resolution.  Return a string containing the current resolution.
    getCurrentResolution: function() {
      return screen.width + "x" + screen.height;
    },

    // Get Available Resolution.  Return a string containing the available resolution.
    getAvailableResolution: function() {
      return screen.availWidth + "x" + screen.availHeight;
    },

    // Get Device XPDI.  Return a string containing the device XPDI.
    getDeviceXDPI: function() {
      return screen.deviceXDPI;
    },

    // Get Device YDPI.  Return a string containing the device YDPI.
    getDeviceYDPI: function() {
      return screen.deviceYDPI;
    },

    //
    // PLUGIN METHODS
    //

    // Get Plugins.  Return a string containing a list of installed plugins.
    getPlugins: function() {
      var pluginsList = "";

      for (var i = 0; i < navigator.plugins.length; i++) {
        if (i == navigator.plugins.length - 1) {
          pluginsList += navigator.plugins[i].name;
        } else {
          pluginsList += navigator.plugins[i].name + ", ";
        }
      }
      return pluginsList;
    },

    // Is Java.  Check if Java is installed.
    isJava: function() {
      return navigator.javaEnabled();
    },

    // Get Java Version.  Return a string containing the Java Version.
    getJavaVersion: function() {
      return deployJava.getJREs().toString();
    },

    // Is Flash.  Check if Flash is installed.
    isFlash: function() {
      var objPlugin = navigator.plugins["Shockwave Flash"];
      if (objPlugin) {
        return true;
      }
      return false;
    },

    // Get Flash Version.  Return a string containing the Flash Version.
    getFlashVersion: function() {
      if (this.isFlash()) {
        objPlayerVersion = swfobject.getFlashPlayerVersion();
        return objPlayerVersion.major + "." + objPlayerVersion.minor + "." + objPlayerVersion.release;
      }
      return "";
    },

    // Is Silverlight.  Check if Silverlight is installed.
    isSilverlight: function() {
      var objPlugin = navigator.plugins["Silverlight Plug-In"];
      if (objPlugin) {
        return true;
      }
      return false;
    },

    // Get Silverlight Version.  Return a string containing the Silverlight Version.
    getSilverlightVersion: function() {
      if (this.isSilverlight()) {
        var objPlugin = navigator.plugins["Silverlight Plug-In"];
        return objPlugin.description;
      }
      return "";
    },

    //
    // MIME TYPE METHODS
    //

    // Is Mime Types.  Check if a mime type is installed.
    isMimeTypes: function() {
      if (navigator.mimeTypes.length) {
        return true;
      }
      return false;
    },

    // Get Mime Types.  Return a string containing a list of installed mime types.
    getMimeTypes: function() {
      var mimeTypeList = "";

      for (var i = 0; i < navigator.mimeTypes.length; i++) {
        if (i == navigator.mimeTypes.length - 1) {
          mimeTypeList += navigator.mimeTypes[i].description;
        } else {
          mimeTypeList += navigator.mimeTypes[i].description + ", ";
        }
      }
      return mimeTypeList;
    },

    //
    // FONT METHODS
    //

    // Is Font.  Check if a font is installed.
    isFont: function(font) {
      return fontDetective.detect(font);
    },

    // Get Fonts.  Return a string containing a list of installed fonts.
    getFonts: function() {
      var fontArray = ["Abadi MT Condensed Light", "Adobe Fangsong Std", "Adobe Hebrew", "Adobe Ming Std", "Agency FB", "Aharoni", "Andalus", "Angsana New", "AngsanaUPC", "Aparajita", "Arab", "Arabic Transparent", "Arabic Typesetting", "Arial Baltic", "Arial Black", "Arial CE", "Arial CYR", "Arial Greek", "Arial TUR", "Arial", "Batang", "BatangChe", "Bauhaus 93", "Bell MT", "Bitstream Vera Serif", "Bodoni MT", "Bookman Old Style", "Braggadocio", "Broadway", "Browallia New", "BrowalliaUPC", "Calibri Light", "Calibri", "Californian FB", "Cambria Math", "Cambria", "Candara", "Castellar", "Casual", "Centaur", "Century Gothic", "Chalkduster", "Colonna MT", "Comic Sans MS", "Consolas", "Constantia", "Copperplate Gothic Light", "Corbel", "Cordia New", "CordiaUPC", "Courier New Baltic", "Courier New CE", "Courier New CYR", "Courier New Greek", "Courier New TUR", "Courier New", "DFKai-SB", "DaunPenh", "David", "DejaVu LGC Sans Mono", "Desdemona", "DilleniaUPC", "DokChampa", "Dotum", "DotumChe", "Ebrima", "Engravers MT", "Eras Bold ITC", "Estrangelo Edessa", "EucrosiaUPC", "Euphemia", "Eurostile", "FangSong", "Forte", "FrankRuehl", "Franklin Gothic Heavy", "Franklin Gothic Medium", "FreesiaUPC", "French Script MT", "Gabriola", "Gautami", "Georgia", "Gigi", "Gisha", "Goudy Old Style", "Gulim", "GulimChe", "GungSeo", "Gungsuh", "GungsuhChe", "Haettenschweiler", "Harrington", "Hei S", "HeiT", "Heisei Kaku Gothic", "Hiragino Sans GB", "Impact", "Informal Roman", "IrisUPC", "Iskoola Pota", "JasmineUPC", "KacstOne", "KaiTi", "Kalinga", "Kartika", "Khmer UI", "Kino MT", "KodchiangUPC", "Kokila", "Kozuka Gothic Pr6N", "Lao UI", "Latha", "Leelawadee", "Levenim MT", "LilyUPC", "Lohit Gujarati", "Loma", "Lucida Bright", "Lucida Console", "Lucida Fax", "Lucida Sans Unicode", "MS Gothic", "MS Mincho", "MS PGothic", "MS PMincho", "MS Reference Sans Serif", "MS UI Gothic", "MV Boli", "Magneto", "Malgun Gothic", "Mangal", "Marlett", "Matura MT Script Capitals", "Meiryo UI", "Meiryo", "Menlo", "Microsoft Himalaya", "Microsoft JhengHei", "Microsoft New Tai Lue", "Microsoft PhagsPa", "Microsoft Sans Serif", "Microsoft Tai Le", "Microsoft Uighur", "Microsoft YaHei", "Microsoft Yi Baiti", "MingLiU", "MingLiU-ExtB", "MingLiU_HKSCS", "MingLiU_HKSCS-ExtB", "Miriam Fixed", "Miriam", "Mongolian Baiti", "MoolBoran", "NSimSun", "Narkisim", "News Gothic MT", "Niagara Solid", "Nyala", "PMingLiU", "PMingLiU-ExtB", "Palace Script MT", "Palatino Linotype", "Papyrus", "Perpetua", "Plantagenet Cherokee", "Playbill", "Prelude Bold", "Prelude Condensed Bold", "Prelude Condensed Medium", "Prelude Medium", "PreludeCompressedWGL Black", "PreludeCompressedWGL Bold", "PreludeCompressedWGL Light", "PreludeCompressedWGL Medium", "PreludeCondensedWGL Black", "PreludeCondensedWGL Bold", "PreludeCondensedWGL Light", "PreludeCondensedWGL Medium", "PreludeWGL Black", "PreludeWGL Bold", "PreludeWGL Light", "PreludeWGL Medium", "Raavi", "Rachana", "Rockwell", "Rod", "Sakkal Majalla", "Sawasdee", "Script MT Bold", "Segoe Print", "Segoe Script", "Segoe UI Light", "Segoe UI Semibold", "Segoe UI Symbol", "Segoe UI", "Shonar Bangla", "Showcard Gothic", "Shruti", "SimHei", "SimSun", "SimSun-ExtB", "Simplified Arabic Fixed", "Simplified Arabic", "Snap ITC", "Sylfaen", "Symbol", "Tahoma", "Times New Roman Baltic", "Times New Roman CE", "Times New Roman CYR", "Times New Roman Greek", "Times New Roman TUR", "Times New Roman", "TlwgMono", "Traditional Arabic", "Trebuchet MS", "Tunga", "Tw Cen MT Condensed Extra Bold", "Ubuntu", "Umpush", "Univers", "Utopia", "Utsaah", "Vani", "Verdana", "Vijaya", "Vladimir Script", "Vrinda", "Webdings", "Wide Latin", "Wingdings"];
      var fontString = "";

      for (var i = 0; i < fontArray.length; i++) {
        if (fontDetective.detect(fontArray[i])) {
          if (i == fontArray.length - 1) {
            fontString += fontArray[i];
          } else {
            fontString += fontArray[i] + ", ";
          }
        }
      }

      return fontString;
    },

    //
    // STORAGE METHODS
    //

    // Is Local Storage.  Check if local storage is enabled.
    isLocalStorage: function() {
      try {
        return !!scope.localStorage;
      } catch (e) {
        return true; // SecurityError when referencing it means it exists
      }
    },

    // Is Session Storage.  Check if session storage is enabled.
    isSessionStorage: function() {
      try {
        return !!scope.sessionStorage;
      } catch (e) {
        return true; // SecurityError when referencing it means it exists
      }
    },

    // Is Cookie.  Check if cookies are enabled.
    isCookie: function() {
      return navigator.cookieEnabled;
    },

    //
    // TIME METHODS
    //

    // Get Time Zone.  Return a string containing the time zone.
    getTimeZone: function() {
      var rightNow = new Date();
      return String(String(rightNow).split("(")[1]).split(")")[0];
    },

    //
    // LANGUAGE METHODS
    //

    // Get Language.  Return a string containing the user language.
    getLanguage: function() {
      return navigator.language;
    },

    // Get System Language.  Return a string containing the system language.
    getSystemLanguage: function() {
      return navigator.systemLanguage;
    },

    //
    // CANVAS METHODS
    //

    // Is Canvas.  Check if the canvas element is enabled.
    isCanvas: function() {

      // create a canvas element
      var elem = document.createElement('canvas');

      // try/catch for older browsers that don't support the canvas element
      try {

        // check if context and context 2d exists
        return !!(elem.getContext && elem.getContext('2d'));

      } catch (e) {

        // catch if older browser
        return false;
      }
    },

    // Get Canvas Print.  Return a string containing the canvas URI data.
    getCanvasPrint: function() {

      // create a canvas element
      var canvas = document.createElement('canvas');

      // define a context var that will be used for browsers with canvas support
      var ctx;

      // try/catch for older browsers that don't support the canvas element
      try {

        // attempt to give ctx a 2d canvas context value
        ctx = canvas.getContext('2d');

      } catch (e) {

        // return empty string if canvas element not supported
        return "";
      }

      // https://www.browserleaks.com/canvas#how-does-it-work
      // Text with lowercase/uppercase/punctuation symbols
      var txt = 'ClientJS,org <canvas> 1.0';
      ctx.textBaseline = "top";
      // The most common type
      ctx.font = "14px 'Arial'";
      ctx.textBaseline = "alphabetic";
      ctx.fillStyle = "#f60";
      ctx.fillRect(125, 1, 62, 20);
      // Some tricks for color mixing to increase the difference in rendering
      ctx.fillStyle = "#069";
      ctx.fillText(txt, 2, 15);
      ctx.fillStyle = "rgba(102, 204, 0, 0.7)";
      ctx.fillText(txt, 4, 17);
      return canvas.toDataURL();
    }
  };

  if (typeof module === 'object' && typeof exports !== "undefined") {
    module.exports = ClientJS;
  }
  scope.ClientJS = ClientJS;
})(window);
