/*!
 * ngCordova
 * Copyright 2014 Drifty Co. http://drifty.com/
 * See LICENSE in this repository for license information
 */
(function(){

angular.module('ngCordova', [
  'ngCordova.plugins'
]);

angular.module('ngCordova.plugins.barcodeScanner', [])

.factory('$cordovaBarcodeScanner', ['$q', function ($q) {

  return {
    scan: function () {
      var q = $q.defer();

      cordova.plugins.barcodeScanner.scan(function (result) {
        q.resolve(result);
      }, function (err) {
        q.reject(err);
      }, options);

      return q.promise;
    },

    encode: function (type, data) {
      var q = $q.defer();

      /* TODO needs work for type:
       make the default:  BarcodeScanner.Encode.TEXT_TYPE
       other options: .EMAIL_TYPE, .PHONE_TYPE, .SMS_TYPE

       docs: https://github.com/wildabeast/BarcodeScanner#encoding-a-barcode
       */

      cordova.plugins.barcodeScanner.encode(type, data, function (result) {
        q.resolve(result);
      }, function (err) {
        q.reject(err);
      });

      return q.promise;
    }
  }
}]);

angular.module('ngCordova.plugins.camera', [])

.factory('$cordovaCamera', ['$q', function($q) {

  return {
    getPicture: function(options) {
      var q = $q.defer();

      if(!navigator.camera) {
        q.resolve(null);
        return q.promise;
      }

      navigator.camera.getPicture(function(imageData) {
        q.resolve(imageData);
      }, function(err) {
        q.reject(err);
      }, options);

      return q.promise;
    },
    cleanup: function(options) {
      var q = $q.defer();

      navigator.camera.cleanup(function() {
        q.resolve(arguments);
      }, function(err) {
        q.reject(err);
      });

      return q.promise;
    }
    
  }
}]);

angular.module('ngCordova.plugins.contacts', [])

.factory('Contacts', ['$q', function ($q) {

  return {
    save: function (contact) {
      var q = $q.defer();
      var deviceContact = navigator.contacts.create(contact);

      deviceContact.save(function (result) {
          q.resolve(result);
        },
        function (err) {
          q.reject(err);
        });
      return q.promise;
    },

    remove: function (contact) {
      var q = $q.defer();
      var deviceContact = navigator.contacts.create(contact);

      deviceContact.remove(function (result) {
          q.resolve(result);
        },
        function (err) {
          q.reject(err);
        });
      return q.promise;
    },

    clone: function (contact) {
      var deviceContact = navigator.contacts.create(contact);
      return deviceContact.clone(contact)
    },

    find: function (options) {
      var q = $q.defer();
      var fields = options.fields || ['id', 'displayName'];
      delete options.fields;

      navigator.contacts.find(fields, function (results) {
          q.resolve(results);
        },
        function (err) {
          q.reject(err);
        },
        options);

      return q.promise;
    }

    /*
     getContact: function (contact) {
     var q = $q.defer();

     navigator.contacts.pickContact(function (contact) {

     })

     }
     */

    // TODO: method to set / get ContactAddress
    // TODO: method to set / get ContactError
    // TODO: method to set / get ContactField
    // TODO: method to set / get ContactName
    // TODO: method to set / get ContactOrganization

  }

}]);

angular.module('ngCordova.plugins.device', [])

.factory('$cordovaDevice', [function () {

  return {
    getDevice: function () {
      return device;
    },

    getCordova: function () {
      return device.cordova;
    },

    getModel: function () {
      return device.model;
    },

    // Waraning: device.name is deprecated as of version 2.3.0. Use device.model instead.
    getName: function () {
      return device.name;
    },

    getPlatform: function () {
      return device.platform;
    },

    getUUID: function () {
      return device.uuid;
    },

    getVersion: function () {
      return device.version;
    }
  }
}]);

angular.module('ngCordova.plugins.deviceMotion', [])

.factory('$cordovaDeviceMotion', ['$q', function($q) {

  return {
    getCurrentAcceleration: function() {
      var q = $q.defer();

      navigator.accelerometer.getCurrentAcceleration(function(result) {
        // Do any magic you need
        q.resolve(result);
      }, function(err) {
        q.reject(err);
      }, options);

      return q.promise;
    },
    watchAcceleration: function(options) {
      var q = $q.defer();

      navigator.accelerometer.watchAcceleration(function(result) {
        // Do any magic you need
        q.notify(result);
      }, function(err) {
        q.reject(err);
      }, options);

      return q.promise;
    },
    clearWatch: function(watchID) {
      return navigator.accelerometer.clearWatch(watchID);
    }
  }
}]);

angular.module('ngCordova.plugins.deviceOrientation', [])

.factory('$cordovaDeviceOrientation', ['$q', function($q) {

  return {
    watchHeading: function(options) {
      var q = $q.defer();

      navigator.compass.watchHeading(function(result) {
        q.resolve(result);
      }, function(err) {
        q.reject(err);
      }, options);

      return q.promise;
    }
  }
}]);

angular.module('ngCordova.plugins.geolocation', [])

.factory('$cordovaGeolocation', ['$q', function($q) {

  return {
    getCurrentPosition: function(options) {
      var q = $q.defer();

      navigator.geolocation.getCurrentPosition(function(result) {
        // Do any magic you need
        q.resolve(result);
      }, function(err) {
        q.reject(err);
      }, options);

      return q.promise;
    },
    watchPosition: function(options) {
      var q = $q.defer();

      navigator.geolocation.watchPosition(function(result) {
        // Do any magic you need
        q.notify(result);

      }, function(err) {
        q.reject(err);
      }, options);

      return q.promise;
    },

    clearWatch: function(watchID) {
      return navigator.geolocation.clearWatch(watchID);
    }
  }
}]);

angular.module('ngCordova.plugins.keyboard', [])

.factory('$cordovaKeyboard', [function () {

  return {
    hideAccessoryBar: function (bool) {
      return cordova.plugins.Keyboard.hideKeyboardAccessoryBar(bool);
    },

    close: function () {
      return cordova.plugins.Keyboard.close();
    },

    disableScroll: function (bool) {
      return cordova.plugins.Keyboard.disableScroll(bool);
    },

    isVisible: function () {
      return cordova.plugins.Keyboard.isVisible
    }

    //TODO: add support for native.keyboardshow + native.keyboardhide
  }
}]);

angular.module('ngCordova.plugins', [
  'ngCordova.plugins.deviceMotion',
  'ngCordova.plugins.camera',
  'ngCordova.plugins.geolocation',
  'ngCordova.plugins.deviceOrientation',
  'ngCordova.plugins.notification',
  'ngCordova.plugins.vibration',
  'ngCordova.plugins.network',
  'ngCordova.plugins.device',
  'ngCordova.plugins.barcodeScanner',
  'ngCordova.plugins.splashscreen',
  'ngCordova.plugins.keyboard',
  'ngCordova.plugins.contacts',
  'ngCordova.plugins.statusbar'
]);

angular.module('ngCordova.plugins.network', [])

.factory('$cordovaNetwork', [function () {

  return {

    getNetwork: function () {
      return navigator.connection.type;
    },

    isOnline: function () {
      var networkSate = navigator.connection.type;
      return networkSate != Connection.UNKNOWN;
    },

    isOffline: function () {
      var networkSate = navigator.connection.type;
      return networkSate == Connection.UNKNOWN;
    }
  }
}]);

angular.module('ngCordova.plugins.notification', [])

.factory('$cordovaNotification', [function() {

  return {
    alert: function(message, callback, title, buttonName) {
	    return navigator.notification.alert.apply(navigator.notification, arguments);
    },

    confirm: function(message, callback, title, buttonName) {
	    return navigator.notification.confirm.apply(navigator.notification, arguments);
    },

    prompt: function(message, promptCallback, title, buttonLabels, defaultText) {
	    return navigator.notification.prompt.apply(navigator.notification, arguments);
    },

    beep: function(times) {
	    return navigator.notification.beep(times);
    }
  }
}]);

angular.module('ngCordova.plugins.splashscreen', [])

.factory('$cordovaSplashscreen', [ function () {

  return {
    hide: function () {
      return navigator.splashscreen.hide();
    },

    show: function () {
      return navigator.splashscreen.show();
    }
  };

}]);

angular.module('ngCordova.plugins.statusbar', [])

.factory('$cordovaStatusbar', [function() {

  return {
  	overlaysWebView: function(bool) {
      return StatusBar.overlaysWebView(true);
	  },

    // styles: Default, LightContent, BlackTranslucent, BlackOpaque
    style: function (style) {
      switch (style) {
        case 0:     // Default
          return StatusBar.styleDefault();
          break;

        case 1:     // LightContent
          return StatusBar.styleLightContent();
          break;

        case 2:     // BlackTranslucent
          return StatusBar.styleBlackTranslucent();
          break;

        case 3:     // BlackOpaque
          return StatusBar.styleBlackOpaque();
          break;

        default:  // Default
          return StatusBar.styleDefault();
      }
    },


    // supported names: black, darkGray, lightGray, white, gray, red, green, blue, cyan, yellow, magenta, orange, purple, brown
    styleColor: function (color) {
      return StatusBar.backgroundColorByName(color);
    },
    
    styleHex: function (colorHex) {
      return StatusBar.backgroundColorByHexString(colorHex);
    },

    hide: function () {
      return StatusBar.hide();
    },

    show: function () {
      return StatusBar.show()
    },

    isVisible: function () {
      return StatusBar.isVisible();
    }
  }
}]);

angular.module('ngCordova.plugins.vibration', [])

.factory('$cordovaVibration', [function() {

  return {
  	vibrate: function(times) {
  	  return navigator.notification.vibrate(times);
	  }
  }
}]);

})();