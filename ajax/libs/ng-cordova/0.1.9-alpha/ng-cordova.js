/*!
 * ngCordova
 * v0.1.9-alpha
 * Copyright 2014 Drifty Co. http://drifty.com/
 * See LICENSE in this repository for license information
 */
(function(){

angular.module('ngCordova', [
  'ngCordova.plugins'
]);

// install  :     cordova plugin add https://github.com/EddyVerbruggen/cordova-plugin-actionsheet.git
// link     :     https://github.com/EddyVerbruggen/cordova-plugin-actionsheet

angular.module('ngCordova.plugins.actionSheet', [])

  .factory('$cordovaActionSheet', ['$q', '$window', function ($q, $window) {

    return {
      show: function (options) {
        var q = $q.defer();

        $window.plugins.actionsheet.show(options, function (result) {
          q.resolve(result);
        });

        return q.promise;
      },

      hide: function () {
        return $window.plugins.actionsheet.hide();
      }
    };
  }]);

// install  :     cordova plugin add https://github.com/floatinghotpot/cordova-plugin-admob.git
// link     :     https://github.com/floatinghotpot/cordova-plugin-admob

angular.module('ngCordova.plugins.adMob', [])

  .factory('$cordovaAdMob', ['$q', '$window', function ($q, $window) {

    return {
      createBannerView: function (options) {
        var d = $q.defer();

        $window.plugins.AdMob.createBannerView(options, function () {
          d.resolve();
        }, function () {
          d.reject();
        });

        return d.promise;
      },

      createInterstitialView: function (options) {
        var d = $q.defer();

        $window.plugins.AdMob.createInterstitialView(options, function () {
          d.resolve();
        }, function () {
          d.reject();
        });

        return d.promise;
      },

      requestAd: function (options) {
        var d = $q.defer();

        $window.plugins.AdMob.requestAd(options, function () {
          d.resolve();
        }, function () {
          d.reject();
        });

        return d.promise;
      },

      showAd: function (options) {
        var d = $q.defer();

        $window.plugins.AdMob.showAd(options, function () {
          d.resolve();
        }, function () {
          d.reject();
        });

        return d.promise;
      },

      requestInterstitialAd: function (options) {
        var d = $q.defer();

        $window.plugins.AdMob.requestInterstitialAd(options, function () {
          d.resolve();
        }, function () {
          d.reject();
        });

        return d.promise;
      }
    };
  }]);

// install  :     cordova plugin add https://github.com/ohh2ahh/AppAvailability.git
// link     :     https://github.com/ohh2ahh/AppAvailability

angular.module('ngCordova.plugins.appAvailability', [])

  .factory('$cordovaAppAvailability', ['$q', function ($q) {

    return {
      check: function (urlScheme) {
        var q = $q.defer();

        appAvailability.check(urlScheme, function (result) {
          q.resolve(result);
        }, function (err) {
          q.reject(err);
        });

        return q.promise;
      }
    };
  }]);

// install  :     cordova plugin add https://github.com/pushandplay/cordova-plugin-apprate.git
// link     :     https://github.com/pushandplay/cordova-plugin-apprate

angular.module('ngCordova.plugins.appRate', [])

  .provider("$cordovaAppRate", [function () {

    this.setAppUrl = function (device, url) {
      var devices = ['ios', 'android', 'blackberry', 'windows8'];

      if (devices.indexOf(device) !== -1) {
        AppRate.preferences.storeAppURL[device] = url;
      }
      else {
        alert("wrong device type");
      }
    };

    this.useLanguage = function (language) {
      AppRate.preferences.useLanguage = language;
    };

    this.displayAppName = function (name) {
      AppRate.preferences.displayAppName = name;
    };

    this.promptAgainForEachNewVersion = function (boolean) {
      AppRate.preferences.promptAgainForEachNewVersion = boolean;
    };

    this.usesUntilPrompt = function (number) {
      AppRate.preferences.usesUntilPrompt = number;
    };

    this.openStoreInApp = function (boolean) {
      AppRate.preferences.openStoreInApp = boolean;
    };

    this.useCustomRateDialog = function (boolean) {
      AppRate.preferences.useCustomRateDialog = boolean;
    };

    this.customLocale = function (customObj) {
      var strings = {
        title: 'Rate %@',
        message: 'If you enjoy using %@, would you mind taking a moment to rate it? It won’t take more than a minute. Thanks for your support!',
        cancelButtonLabel: 'No, Thanks',
        laterButtonLabel: 'Remind Me Later',
        rateButtonLabel: 'Rate It Now'
      };

      strings = angular.extend(strings, customObj);

      AppRate.preferences.customLocale = strings;
    };

    this.$get = ['$q', function ($q) {
      return {
        promptForRating: function (immediate) {
          var q = $q.defer();
          var prompt = AppRate.promptForRating(immediate);
          q.resolve(prompt);

          return q.promise;
        },

        onButtonClicked: function (cb) {
          AppRate.onButtonClicked = function (buttonIndex) {
            cb.call(this, buttonIndex);
          };
        },

        onRateDialogShow: function (cb) {
          AppRate.onRateDialogShow = cb();
        }
      };
    }];
  }]);

// install   :     cordova plugin add https://github.com/whiteoctober/cordova-plugin-app-version.git
// link      :     https://github.com/whiteoctober/cordova-plugin-app-version

angular.module('ngCordova.plugins.appVersion', [])

  .factory('$cordovaAppVersion', ['$q', function ($q) {

    return {
      getAppVersion: function () {
        var q = $q.defer();
        cordova.getAppVersion(function (version) {
          q.resolve(version);
        });

        return q.promise;
      }
    };
  }]);

// install   :     cordova plugin add https://github.com/christocracy/cordova-plugin-background-geolocation.git
// link      :     https://github.com/christocracy/cordova-plugin-background-geolocation

angular.module('ngCordova.plugins.backgroundGeolocation', [])

  .factory('$cordovaBackgroundGeolocation', ['$q', '$window', function ($q, $window) {

    return {

      init: function () {
        $window.navigator.geolocation.getCurrentPosition(function (location) {
          return location;
        });
      },

      configure: function (options) {

        this.init();
        var q = $q.defer();

        $window.plugins.backgroundGeoLocation.configure(
          function (result) {
            q.notify(result);
            $window.plugins.backgroundGeoLocation.finish();
          },
          function (err) {
            q.reject(err);
          }, options);

        this.start();

        return q.promise;
      },

      start: function () {
        var q = $q.defer();

        $window.plugins.backgroundGeoLocation.start(
          function (result) {
            q.resolve(result);
          },
          function (err) {
            q.reject(err);
          });

        return q.promise;
      },

      stop: function () {
        var q = $q.defer();

        $window.plugins.backgroundGeoLocation.stop(
          function (result) {
            q.resolve(result);
          },
          function (err) {
            q.reject(err);
          });

        return q.promise;
      }
    };
  }
  ]);

// install  :     cordova plugin add de.appplant.cordova.plugin.badge
// link     :     https://github.com/katzer/cordova-plugin-badge

angular.module('ngCordova.plugins.badge', [])

  .factory('$cordovaBadge', ['$q', function ($q) {

    return {
      hasPermission: function () {
        var q = $q.defer();

        cordova.plugins.notification.badge.hasPermission(function (permission) {
          if (permission) {
            q.resolve(true);
          }
          else {
            q.reject("You do not have permission");
          }
        });

        return q.promise;
      },

      promptForPermission: function () {
        return cordova.plugins.notification.badge.promptForPermission();
      },

      set: function (number) {
        var q = $q.defer();

        cordova.plugins.notification.badge.hasPermission(function (permission) {
          if (permission) {
            q.resolve(cordova.plugins.notification.badge.set(number));
          }
          else {
            q.reject("You do not have permission to set Badge");
          }
        });
        return q.promise;
      },

      get: function () {
        var q = $q.defer();
        cordova.plugins.notification.badge.hasPermission(function (permission) {
          if (permission) {
            cordova.plugins.notification.badge.get(function (badge) {
              q.resolve(badge);
            });
          } else {
            q.reject("You do not have permission to get Badge");
          }
        });

        return q.promise;
      },

      clear: function () {
        var q = $q.defer();

        cordova.plugins.notification.badge.hasPermission(function (permission) {
          if (permission) {
            q.resolve(cordova.plugins.notification.badge.clear());
          }
          else {
            q.reject("You do not have permission to clear Badge");
          }
        });
        return q.promise;
      },

      configure: function (config) {
        return cordova.plugins.notification.badge.configure(config);
      }
    };
  }]);

// install  :    cordova plugin add https://github.com/wildabeast/BarcodeScanner.git
// link     :    https://github.com/wildabeast/BarcodeScanner/#using-the-plugin

angular.module('ngCordova.plugins.barcodeScanner', [])

  .factory('$cordovaBarcodeScanner', ['$q', function ($q) {

    return {
      scan: function () {
        var q = $q.defer();

        cordova.plugins.barcodeScanner.scan(function (result) {
          q.resolve(result);
        }, function (err) {
          q.reject(err);
        });

        return q.promise;
      },

      encode: function (type, data) {
        var q = $q.defer();
        type = type || "TEXT_TYPE";

        cordova.plugins.barcodeScanner.encode(type, data, function (result) {
          q.resolve(result);
        }, function (err) {
          q.reject(err);
        });

        return q.promise;
      }
    };
  }]);

//  install   :   cordova plugin add org.apache.cordova.battery-status
//  link      :   https://github.com/apache/cordova-plugin-battery-status/blob/master/doc/index.md

angular.module('ngCordova.plugins.battery-status', [])

  .factory('$cordovaBatteryStatus', ['$rootScope', '$window', function ($rootScope, $window) {

    var scope = $rootScope.$new();

    $window.addEventListener('batterystatus', function (event) {
      scope.$emit('batterystatus', event.detail);
    }, false);

    $window.addEventListener('batterycritical', function (event) {
      scope.$emit('batterycritical', event.detail);
    }, false);

    $window.addEventListener('batterylow', function (event) {
      scope.$emit('batterylow', event.detail);
    }, false);

    return scope;
  }]);

//  install   :   cordova plugin add https://github.com/don/cordova-plugin-ble-central#:/plugin
//  link      :   https://github.com/don/cordova-plugin-ble-central

angular.module('ngCordova.plugins.ble', [])

  .factory('$cordovaBLE', ['$q', function ($q) {

    return {
      scan: function (services, seconds) {
        var q = $q.defer();
        ble.scan(services, seconds, function (result) {
          q.resolve(result);
        }, function (error) {
          q.reject(error);
        });
        return q.promise;
      },

      connect: function (deviceID) {
        var q = $q.defer();
        ble.connect(deviceID, function (result) {
          q.resolve(result);
        }, function (error) {
          q.reject(error);
        });
        return q.promise;
      },

      disconnect: function (deviceID) {
        var q = $q.defer();
        ble.disconnect(deviceID, function (result) {
          q.resolve(result);
        }, function (error) {
          q.reject(error);
        });
        return q.promise;
      },

      read: function (deviceID, serviceUUID, characteristicUUID) {
        var q = $q.defer();
        ble.read(deviceID, serviceUUID, characteristicUUID, function (result) {
          q.resolve(result);
        }, function (error) {
          q.reject(error);
        });
        return q.promise;
      },

      write: function (deviceID, serviceUUID, characteristicUUID, data) {
        var q = $q.defer();
        ble.write(deviceID, serviceUUID, characteristicUUID, data, function (result) {
          q.resolve(result);
        }, function (error) {
          q.reject(error);
        });
        return q.promise;
      },

      writeCommand: function (deviceID, serviceUUID, characteristicUUID, data) {
        var q = $q.defer();
        ble.writeCommand(deviceID, serviceUUID, characteristicUUID, data, function (result) {
          q.resolve(result);
        }, function (error) {
          q.reject(error);
        });
        return q.promise;
      },

      notify: function (deviceID, serviceUUID, characteristicUUID) {
        var q = $q.defer();
        ble.notify(deviceID, serviceUUID, characteristicUUID, function (result) {
          q.resolve(result);
        }, function (error) {
          q.reject(error);
        });
        return q.promise;
      },

      indicate: function (deviceID, serviceUUID, characteristicUUID) {
        var q = $q.defer();
        ble.indicate(deviceID, serviceUUID, characteristicUUID, function (result) {
          q.resolve(result);
        }, function (error) {
          q.reject(error);
        });
        return q.promise;
      },

      isConnected: function (deviceID) {
        var q = $q.defer();
        ble.isConnected(deviceID, function (result) {
          q.resolve(result);
        }, function (error) {
          q.reject(error);
        });
        return q.promise;
      },

      isEnabled: function () {
        var q = $q.defer();
        ble.isEnabled(function (result) {
          q.resolve(result);
        }, function (error) {
          q.reject(error);
        });
        return q.promise;
      }
    };
  }]);

// install   :     cordova plugin add com.megster.cordova.bluetoothserial
// link      :     https://github.com/don/BluetoothSerial

angular.module('ngCordova.plugins.bluetoothSerial', [])

  .factory('$cordovaBluetoothSerial', ['$q', '$window', function ($q, $window) {

    return {
      connect: function (address) {
        var q = $q.defer();
        $window.bluetoothSerial.connect(address, function () {
          q.resolve();
        }, function (error) {
          q.reject(error);
        });
        return q.promise;
      },

      // not supported on iOS
      connectInsecure: function (address) {
        var q = $q.defer();
        $window.bluetoothSerial.connectInsecure(address, function () {
          q.resolve();
        }, function (error) {
          q.reject(error);
        });
        return q.promise;
      },


      disconnect: function () {
        var q = $q.defer();
        $window.bluetoothSerial.disconnect(function () {
          q.resolve();
        }, function (error) {
          q.reject(error);
        });
        return q.promise;
      },


      list: function () {
        var q = $q.defer();
        $window.bluetoothSerial.list(function (data) {
          q.resolve(data);
        }, function (error) {
          q.reject(error);
        });
        return q.promise;
      },

      isEnabled: function () {
        var q = $q.defer();
        $window.bluetoothSerial.isEnabled(function () {
          q.resolve();
        }, function () {
          q.reject();
        });
        return q.promise;
      },


      isConnected: function () {
        var q = $q.defer();
        $window.bluetoothSerial.isConnected(function () {
          q.resolve();
        }, function () {
          q.reject();
        });
        return q.promise;
      },


      available: function () {
        var q = $q.defer();
        $window.bluetoothSerial.available(function (data) {
          q.resolve(data);
        }, function (error) {
          q.reject(error);
        });
        return q.promise;
      },


      read: function () {
        var q = $q.defer();
        $window.bluetoothSerial.read(function (data) {
          q.resolve(data);
        }, function (error) {
          q.reject(error);
        });
        return q.promise;
      },

      readUntil: function (delimiter) {
        var q = $q.defer();
        $window.bluetoothSerial.readUntil(delimiter, function (data) {
          q.resolve(data);
        }, function (error) {
          q.reject(error);
        });
        return q.promise;
      },


      write: function (data) {
        var q = $q.defer();
        $window.bluetoothSerial.write(data, function () {
          q.resolve();
        }, function (error) {
          q.reject(error);
        });
        return q.promise;
      },


      subscribe: function (delimiter) {
        var q = $q.defer();
        $window.bluetoothSerial.subscribe(delimiter, function (data) {
          q.notify(data);
        }, function (error) {
          q.reject(error);
        });
        return q.promise;
      },

      subscribeRawData: function () {
        var q = $q.defer();
        $window.bluetoothSerial.subscribeRawData(function (data) {
          q.notify(data);
        }, function (error) {
          q.reject(error);
        });
        return q.promise;
      },


      unsubscribe: function () {
        var q = $q.defer();
        $window.bluetoothSerial.unsubscribe(function () {
          q.resolve();
        }, function (error) {
          q.reject(error);
        });
        return q.promise;
      },

      unsubscribeRawData: function () {
        var q = $q.defer();
        $window.bluetoothSerial.unsubscribeRawData(function () {
          q.resolve();
        }, function (error) {
          q.reject(error);
        });
        return q.promise;
      },


      clear: function () {
        var q = $q.defer();
        $window.bluetoothSerial.clear(function () {
          q.resolve();
        }, function (error) {
          q.reject(error);
        });
        return q.promise;
      },


      readRSSI: function () {
        var q = $q.defer();
        $window.bluetoothSerial.readRSSI(function (data) {
          q.resolve(data);
        }, function (error) {
          q.reject(error);
        });
        return q.promise;
      }
    };
  }]);

// install  :    cordova plugin add https://github.com/fiscal-cliff/phonegap-plugin-brightness.git
// link     :    https://github.com/fiscal-cliff/phonegap-plugin-brightness

angular.module('ngCordova.plugins.brightness', [])

  .factory('$cordovaBrightness', ['$q', '$window', function ($q, $window) {

    return {
      get: function () {
        var q = $q.defer();

        $window.cordova.plugins.brightness.getBrightness(function (result) {
          q.resolve(result);
        }, function (err) {
          q.reject(err);
        });

        return q.promise;
      },

      set: function (data) {
        var q = $q.defer();

        $window.cordova.plugins.brightness.setBrightness(data, function (result) {
          q.resolve(result);
        }, function (err) {
          q.reject(err);
        });

        return q.promise;
      },

      setKeepScreenOn: function (bool) {
        var q = $q.defer();

        $window.cordova.plugins.brightness.setKeepScreenOn(bool, function (result) {
          q.resolve(result);
        }, function (err) {
          q.reject(err);
        });

        return q.promise;
      }
    };
  }]);




// install  :     cordova plugin add https://github.com/EddyVerbruggen/Calendar-PhoneGap-Plugin.git
// link     :     https://github.com/EddyVerbruggen/Calendar-PhoneGap-Plugin

angular.module('ngCordova.plugins.calendar', [])

  .factory('$cordovaCalendar', ['$q', '$window', function ($q, $window) {
    return {
      createCalendar: function (options) {
        var d = $q.defer(),
          createCalOptions = $window.plugins.calendar.getCreateCalendarOptions();

        if (typeof options === 'string') {
          createCalOptions.calendarName = options;
        } else {
          createCalOptions = angular.extend(createCalOptions, options);
        }

        $window.plugins.calendar.createCalendar(createCalOptions, function (message) {
          d.resolve(message);
        }, function (error) {
          d.reject(error);
        });

        return d.promise;
      },

      deleteCalendar: function (calendarName) {
        var d = $q.defer();

        $window.plugins.calendar.deleteCalendar(calendarName, function (message) {
          d.resolve(message);
        }, function (error) {
          d.reject(error);
        });

        return d.promise;
      },

      createEvent: function (options) {
        var d = $q.defer(),
          defaultOptions = {
            title: null,
            location: null,
            notes: null,
            startDate: null,
            endDate: null
          };

        defaultOptions = angular.extend(defaultOptions, options);

        $window.plugins.calendar.createEvent(
          defaultOptions.title,
          defaultOptions.location,
          defaultOptions.notes,
          new Date(defaultOptions.startDate),
          new Date(defaultOptions.endDate),
          function (message) {
            d.resolve(message);
          }, function (error) {
            d.reject(error);
          }
        );

        return d.promise;
      },

      createEventWithOptions: function (options) {
        var d = $q.defer(),
          defaultOptionKeys = [],
          calOptions = window.plugins.calendar.getCalendarOptions(),
          defaultOptions = {
            title: null,
            location: null,
            notes: null,
            startDate: null,
            endDate: null
          };

        defaultOptionKeys = Object.keys(defaultOptions);

        for (var key in options) {
          if (defaultOptionKeys.indexOf(key) === -1) {
            calOptions[key] = options[key];
          } else {
            defaultOptions[key] = options[key];
          }
        }

        $window.plugins.calendar.createEventWithOptions(
          defaultOptions.title,
          defaultOptions.location,
          defaultOptions.notes,
          new Date(defaultOptions.startDate),
          new Date(defaultOptions.endDate),
          calOptions,
          function (message) {
            d.resolve(message);
          }, function (error) {
            d.reject(error);
          }
        );

        return d.promise;
      },

      createEventInteractively: function (options) {
        var d = $q.defer(),
          defaultOptions = {
            title: null,
            location: null,
            notes: null,
            startDate: null,
            endDate: null
          };

        defaultOptions = angular.extend(defaultOptions, options);

        $window.plugins.calendar.createEventInteractively(
          defaultOptions.title,
          defaultOptions.location,
          defaultOptions.notes,
          new Date(defaultOptions.startDate),
          new Date(defaultOptions.endDate),
          function (message) {
            d.resolve(message);
          }, function (error) {
            d.reject(error);
          }
        );

        return d.promise;
      },

      createEventInNamedCalendar: function (options) {
        var d = $q.defer(),
          defaultOptions = {
            title: null,
            location: null,
            notes: null,
            startDate: null,
            endDate: null,
            calendarName: null
          };

        defaultOptions = angular.extend(defaultOptions, options);

        $window.plugins.calendar.createEventInNamedCalendar(
          defaultOptions.title,
          defaultOptions.location,
          defaultOptions.notes,
          new Date(defaultOptions.startDate),
          new Date(defaultOptions.endDate),
          defaultOptions.calendarName,
          function (message) {
            d.resolve(message);
          }, function (error) {
            d.reject(error);
          }
        );

        return d.promise;
      },

      findEvent: function (options) {
        var d = $q.defer(),
          defaultOptions = {
            title: null,
            location: null,
            notes: null,
            startDate: null,
            endDate: null
          };

        defaultOptions = angular.extend(defaultOptions, options);

        $window.plugins.calendar.findEvent(
          defaultOptions.title,
          defaultOptions.location,
          defaultOptions.notes,
          new Date(defaultOptions.startDate),
          new Date(defaultOptions.endDate),
          function (foundEvent) {
            d.resolve(foundEvent);
          }, function (error) {
            d.reject(error);
          }
        );

        return d.promise;
      },

      listEventsInRange: function (startDate, endDate) {
        var d = $q.defer();

        $window.plugins.calendar.listEventsInRange(startDate, endDate, function (events) {
          d.resolve(events);
        }, function (error) {
          d.reject(error);
        });

        return d.promise;
      },

      listCalendars: function () {
        var d = $q.defer();

        $window.plugins.calendar.listCalendars(function (calendars) {
          d.resolve(calendars);
        }, function (error) {
          d.reject(error);
        });

        return d.promise;
      },

      findAllEventsInNamedCalendar: function (calendarName) {
        var d = $q.defer();

        $window.plugins.calendar.findAllEventsInNamedCalendar(calendarName, function (events) {
          d.resolve(events);
        }, function (error) {
          d.reject(error);
        });

        return d.promise;
      },

      modifyEvent: function (options) {
        var d = $q.defer(),
          defaultOptions = {
            title: null,
            location: null,
            notes: null,
            startDate: null,
            endDate: null,
            newTitle: null,
            newLocation: null,
            newNotes: null,
            newStartDate: null,
            newEndDate: null
          };

        defaultOptions = angular.extend(defaultOptions, options);

        $window.plugins.calendar.modifyEvent(
          defaultOptions.title,
          defaultOptions.location,
          defaultOptions.notes,
          new Date(defaultOptions.startDate),
          new Date(defaultOptions.endDate),
          defaultOptions.newTitle,
          defaultOptions.newLocation,
          defaultOptions.newNotes,
          new Date(defaultOptions.newStartDate),
          new Date(defaultOptions.newEndDate),
          function (message) {
            d.resolve(message);
          }, function (error) {
            d.reject(error);
          }
        );

        return d.promise;
      },

      deleteEvent: function (options) {
        var d = $q.defer(),
          defaultOptions = {
            newTitle: null,
            location: null,
            notes: null,
            startDate: null,
            endDate: null
          };

        defaultOptions = angular.extend(defaultOptions, options);

        $window.plugins.calendar.deleteEvent(
          defaultOptions.newTitle,
          defaultOptions.location,
          defaultOptions.notes,
          new Date(defaultOptions.startDate),
          new Date(defaultOptions.endDate),
          function (message) {
            d.resolve(message);
          }, function (error) {
            d.reject(error);
          }
        );

        return d.promise;
      }
    };
  }]);

// install   :   cordova plugin add org.apache.cordova.camera
// link      :   https://github.com/apache/cordova-plugin-camera/blob/master/doc/index.md#orgapachecordovacamera

angular.module('ngCordova.plugins.camera', [])

  .factory('$cordovaCamera', ['$q', function ($q) {

    return {
      getPicture: function (options) {
        var q = $q.defer();

        if (!navigator.camera) {
          q.resolve(null);
          return q.promise;
        }

        navigator.camera.getPicture(function (imageData) {
          q.resolve(imageData);
        }, function (err) {
          q.reject(err);
        }, options);

        return q.promise;
      },

      cleanup: function () {
        var q = $q.defer();

        navigator.camera.cleanup(function () {
          q.resolve();
        }, function (err) {
          q.reject(err);
        });

        return q.promise;
      }
    };
  }]);

// install   :    cordova plugin add org.apache.cordova.media-capture
// link      :    https://github.com/apache/cordova-plugin-media-capture/blob/master/doc/index.md

angular.module('ngCordova.plugins.capture', [])

  .factory('$cordovaCapture', ['$q', function ($q) {

    return {
      captureAudio: function (options) {
        var q = $q.defer();

        if (!navigator.device.capture) {
          q.resolve(null);
          return q.promise;
        }

        navigator.device.capture.captureAudio(function (audioData) {
          q.resolve(audioData);
        }, function (err) {
          q.reject(err);
        }, options);

        return q.promise;
      },
      captureImage: function (options) {
        var q = $q.defer();

        if (!navigator.device.capture) {
          q.resolve(null);
          return q.promise;
        }

        navigator.device.capture.captureImage(function (imageData) {
          q.resolve(imageData);
        }, function (err) {
          q.reject(err);
        }, options);

        return q.promise;
      },
      captureVideo: function (options) {
        var q = $q.defer();

        if (!navigator.device.capture) {
          q.resolve(null);
          return q.promise;
        }

        navigator.device.capture.captureVideo(function (videoData) {
          q.resolve(videoData);
        }, function (err) {
          q.reject(err);
        }, options);

        return q.promise;
      }
    };
  }]);

// install   :     cordova plugin add https://github.com/VersoSolutions/CordovaClipboard
// link      :     https://github.com/VersoSolutions/CordovaClipboard

angular.module('ngCordova.plugins.clipboard', [])

  .factory('$cordovaClipboard', ['$q', '$window', function ($q, $window) {

    return {
      copy: function (text) {
        var q = $q.defer();

        $window.cordova.plugins.clipboard.copy(text,
          function () {
            q.resolve();
          }, function () {
            q.reject();
          });

        return q.promise;
      },

      paste: function () {
        var q = $q.defer();

        $window.cordova.plugins.clipboard.paste(function (text) {
          q.resolve(text);
        }, function () {
          q.reject();
        });

        return q.promise;
      }
    };
  }]);

// install   :     cordova plugin add org.apache.cordova.contacts
// link      :     https://github.com/apache/cordova-plugin-contacts/blob/master/doc/index.md

angular.module('ngCordova.plugins.contacts', [])

  .factory('$cordovaContacts', ['$q', function ($q) {

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
        return deviceContact.clone(contact);
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
      },

      pickContact: function () {
        var q = $q.defer();

        navigator.contacts.pickContact(
          function (contact) {
            q.resolve(contact);
          },
          function (err) {
            q.reject(err);
          }
        );

        return q.promise;
      }

      // TODO: method to set / get ContactAddress
      // TODO: method to set / get ContactError
      // TODO: method to set / get ContactField
      // TODO: method to set / get ContactName
      // TODO: method to set / get ContactOrganization

    };

  }]);

angular.module('ngCordova.plugins.datePicker', [])

  .factory('$cordovaDatePicker', ['$window', '$q', function ($window, $q) {

    return {
      show: function (options) {
        options = options || {date: new Date(), mode: 'date'};

        var d = $q.defer();

        $window.datePicker.show(options, function (date) {
          d.resolve(date);
        });

        return d.promise;
      }
    };
  }]);

// install   :     cordova plugin add org.apache.cordova.device
// link      :     https://github.com/apache/cordova-plugin-device/blob/master/doc/index.md

angular.module('ngCordova.plugins.device', [])

  .factory('$cordovaDevice', [function () {

    return {
      /**
       * Returns the whole device object.
       * @see https://github.com/apache/cordova-plugin-device/blob/master/doc/index.md
       * @returns {Object} The device object.
       */
      getDevice: function () {
        return device;
      },

      /**
       * Returns the Cordova version.
       * @see https://github.com/apache/cordova-plugin-device/blob/master/doc/index.md#devicecordova
       * @returns {String} The Cordova version.
       */
      getCordova: function () {
        return device.cordova;
      },

      /**
       * Returns the name of the device's model or product.
       * @see https://github.com/apache/cordova-plugin-device/blob/master/doc/index.md#devicemodel
       * @returns {String} The name of the device's model or product.
       */
      getModel: function () {
        return device.model;
      },

      /**
       * @deprecated device.name is deprecated as of version 2.3.0. Use device.model instead.
       * @returns {String}
       */
      getName: function () {
        return device.name;
      },

      /**
       * Returns the device's operating system name.
       * @see https://github.com/apache/cordova-plugin-device/blob/master/doc/index.md#deviceplatform
       * @returns {String} The device's operating system name.
       */
      getPlatform: function () {
        return device.platform;
      },

      /**
       * Returns the device's Universally Unique Identifier.
       * @see https://github.com/apache/cordova-plugin-device/blob/master/doc/index.md#deviceuuid
       * @returns {String} The device's Universally Unique Identifier
       */
      getUUID: function () {
        return device.uuid;
      },

      /**
       * Returns the operating system version.
       * @see https://github.com/apache/cordova-plugin-device/blob/master/doc/index.md#deviceversion
       * @returns {String}
       */
      getVersion: function () {
        return device.version;
      }
    };
  }]);

// install   :     cordova plugin add org.apache.cordova.device-motion
// link      :     https://github.com/apache/cordova-plugin-device-motion/blob/master/doc/index.md

angular.module('ngCordova.plugins.deviceMotion', [])

  .factory('$cordovaDeviceMotion', ['$q', function ($q) {

    return {
      getCurrentAcceleration: function () {
        var q = $q.defer();

        navigator.accelerometer.getCurrentAcceleration(function (result) {
          q.resolve(result);
        }, function (err) {
          q.reject(err);
        });

        return q.promise;
      },

      watchAcceleration: function (options) {
        var q = $q.defer();

        var watchID = navigator.accelerometer.watchAcceleration(function (result) {
          q.notify(result);
        }, function (err) {
          q.reject(err);
        }, options);

        q.promise.cancel = function () {
          navigator.accelerometer.clearWatch(watchID);
        };

        q.promise.clearWatch = function (id) {
          navigator.accelerometer.clearWatch(id || watchID);
        };

        q.promise.watchID = watchID;

        return q.promise;
      },

      clearWatch: function (watchID) {
        return navigator.accelerometer.clearWatch(watchID);
      }
    };
  }]);

// install   :     cordova plugin add org.apache.cordova.device-orientation
// link      :     https://github.com/apache/cordova-plugin-device-orientation/blob/master/doc/index.md

angular.module('ngCordova.plugins.deviceOrientation', [])

  .factory('$cordovaDeviceOrientation', ['$q', function ($q) {

    return {
      getCurrentHeading: function () {
        var q = $q.defer();

        navigator.compass.getCurrentHeading(function (result) {
          q.resolve(result);
        }, function (err) {
          q.reject(err);
        });

        return q.promise;
      },

      watchHeading: function (options) {
        var q = $q.defer();

        var watchID = navigator.compass.watchHeading(function (result) {
          q.notify(result);
        }, function (err) {
          q.reject(err);
        }, options);

        q.promise.cancel = function () {
          navigator.compass.clearWatch(watchID);
        };

        q.promise.clearWatch = function (id) {
          navigator.compass.clearWatch(id || watchID);
        };

        q.promise.watchID = watchID;

        return q.promise;
      },

      clearWatch: function (watchID) {
        return navigator.compass.clearWatch(watchID);
      }
    };
  }]);

// install   :     cordova plugin add org.apache.cordova.dialogs
// link      :     https://github.com/apache/cordova-plugin-dialogs/blob/master/doc/index.md

angular.module('ngCordova.plugins.dialogs', [])

  .factory('$cordovaDialogs', ['$q', '$window', function ($q, $window) {

    return {
      alert: function (message, title, buttonName) {
        var q = $q.defer();

        if (!$window.navigator.notification) {
          $window.alert(message);
          q.resolve();
        }
        else {
          navigator.notification.alert(message, function () {
            q.resolve();
          }, title, buttonName);
        }

        return q.promise;
      },

      confirm: function (message, title, buttonLabels) {
        var q = $q.defer();

        if (!$window.navigator.notification) {
          if ($window.confirm(message)) {
            q.resolve(1);
          }
          else {
            q.resolve(2);
          }
        }
        else {
          navigator.notification.confirm(message, function (buttonIndex) {
            q.resolve(buttonIndex);
          }, title, buttonLabels);
        }

        return q.promise;
      },

      prompt: function (message, title, buttonLabels, defaultText) {
        var q = $q.defer();

        if (!$window.navigator.notification) {
          var res = $window.prompt(message, defaultText);
          if (res !== null) {
            q.resolve({input1: res, buttonIndex: 1});
          }
          else {
            q.resolve({input1: res, buttonIndex: 2});
          }
        }
        else {
          navigator.notification.prompt(message, function (result) {
            q.resolve(result);
          }, title, buttonLabels, defaultText);
        }
        return q.promise;
      },

      beep: function (times) {
        return navigator.notification.beep(times);
      }
    };
  }]);

// install  :     cordova plugin add https://github.com/katzer/cordova-plugin-email-composer.git@0.8.2
// link     :     https://github.com/katzer/cordova-plugin-email-composer

angular.module('ngCordova.plugins.emailComposer', [])

  .factory('$cordovaEmailComposer', ['$q', function ($q) {

    return {
      isAvailable: function () {
        var q = $q.defer();

        cordova.plugins.email.isAvailable(function (isAvailable) {
          isAvailable ? q.resolve() : q.reject();
        });

        return q.promise;
      },

      open: function (properties) {
        var q = $q.defer();

        cordova.plugins.email.open(properties, function () {
          q.reject(); // user closed email composer
        });

        return q.promise;
      },

      addAlias: function (app, schema) {
        cordova.plugins.email.addAlias(app, schema);
      }
    };
  }]);

// install   :   cordova -d plugin add /Users/your/path/here/phonegap-facebook-plugin --variable APP_ID="123456789" --variable APP_NAME="myApplication"
// link      :   https://github.com/Wizcorp/phonegap-facebook-plugin

angular.module('ngCordova.plugins.facebook', [])

  .provider('$cordovaFacebook', [function () {

    this.browserInit = function (id, version) {
      this.appID = id;
      this.appVersion = version || "v2.0";
      if (!this.appID) {
        facebookConnectPlugin.browserInit(this.appID, this.appVersion);
      }
    };

    this.$get = ['$q', function ($q) {

      return {
        login: function (permissions) {
          var q = $q.defer();
          facebookConnectPlugin.login(permissions,
            function (res) {
              q.resolve(res);
            }, function (res) {
              q.reject(res);
            });

          return q.promise;
        },

        showDialog: function (options) {

          var q = $q.defer();
          facebookConnectPlugin.showDialog(options,
            function (res) {
              q.resolve(res);
            },
            function (err) {
              q.reject(err);
            });

          return q.promise;
        },

        api: function (path, permissions) {
          var q = $q.defer();

          facebookConnectPlugin.api(path, permissions,
            function (res) {
              q.resolve(res);
            },
            function (err) {
              q.reject(err);
            });

          return q.promise;
        },

        getAccessToken: function () {
          var q = $q.defer();
          facebookConnectPlugin.getAccessToken(function (res) {
              q.resolve(res);
            },
            function (err) {
              q.reject(err);
            });

          return q.promise;
        },

        getLoginStatus: function () {
          var q = $q.defer();
          facebookConnectPlugin.getLoginStatus(function (res) {
              q.resolve(res);
            },
            function (err) {
              q.reject(err);
            });

          return q.promise;
        },

        logout: function () {
          var q = $q.defer();
          facebookConnectPlugin.logout(function (res) {
              q.resolve(res);
            },
            function (err) {
              q.reject(err);
            });

          return q.promise;
        }
      };
    }];
  }]);

// install  :     cordova plugin add https://github.com/floatinghotpot/cordova-plugin-facebookads.git
// link     :     https://github.com/floatinghotpot/cordova-plugin-facebookads

angular.module('ngCordova.plugins.facebookAds', [])
  .factory('$cordovaFacebookAds', ['$q', '$window', function ($q, $window) {

    return {
      setOptions: function (options) {
        var d = $q.defer();

        $window.FacebookAds.setOptions(options, function () {
          d.resolve();
        }, function () {
          d.reject();
        });

        return d.promise;
      },

      createBanner: function (options) {
        var d = $q.defer();

        $window.FacebookAds.createBanner(options, function () {
          d.resolve();
        }, function () {
          d.reject();
        });

        return d.promise;
      },

      removeBanner: function () {
        var d = $q.defer();

        $window.FacebookAds.removeBanner(function () {
          d.resolve();
        }, function () {
          d.reject();
        });

        return d.promise;
      },

      showBanner: function (position) {
        var d = $q.defer();

        $window.FacebookAds.showBanner(position, function () {
          d.resolve();
        }, function () {
          d.reject();
        });

        return d.promise;
      },

      showBannerAtXY: function (x, y) {
        var d = $q.defer();

        $window.FacebookAds.showBannerAtXY(x, y, function () {
          d.resolve();
        }, function () {
          d.reject();
        });

        return d.promise;
      },

      hideBanner: function () {
        var d = $q.defer();

        $window.FacebookAds.hideBanner(function () {
          d.resolve();
        }, function () {
          d.reject();
        });

        return d.promise;
      },

      prepareInterstitial: function (options) {
        var d = $q.defer();

        $window.FacebookAds.prepareInterstitial(options, function () {
          d.resolve();
        }, function () {
          d.reject();
        });

        return d.promise;
      },

      showInterstitial: function () {
        var d = $q.defer();

        $window.FacebookAds.showInterstitial(function () {
          d.resolve();
        }, function () {
          d.reject();
        });

        return d.promise;
      }
    };
  }]);

// install   :     cordova plugin add org.apache.cordova.file
// link      :     https://github.com/apache/cordova-plugin-file/blob/master/doc/index.md

// TODO: add functionality to define storage size in the getFilesystem() -> requestFileSystem() method
// TODO: add documentation for FileError types
// TODO: add abort() option to downloadFile and uploadFile methods.
// TODO: add support for downloadFile and uploadFile options. (or detailed documentation) -> for fileKey, fileName, mimeType, headers
// TODO: add support for onprogress property

angular.module('ngCordova.plugins.file', [])

//Filesystem (checkDir, createDir, checkFile, creatFile, removeFile, writeFile, readFile)
  .factory('$cordovaFile', ['$q', '$window', '$log', '$timeout', function ($q, $window, $log, $timeout) {

    return {
      checkDir: function (dir) {
        return getDirectory(dir, {create: false});
      },

      createDir: function (dir, replaceBOOL) {
        return getDirectory(dir, {create: true, exclusive: replaceBOOL});
      },

      listDir: function (filePath) {
        var q = $q.defer();

        getDirectory(filePath, {create: false}).then(function (parent) {
          var reader = parent.createReader();
          reader.readEntries(
            function (entries) {
              q.resolve(entries);
            },
            function () {
              q.reject('DIR_READ_ERROR : ' + filePath);
            });
        }, function () {
          q.reject('DIR_NOT_FOUND : ' + filePath);
        });

        return q.promise;
      },

      checkFile: function (filePath) {
        // Backward compatibility for previous function checkFile(dir, file)
        if (arguments.length == 2) {
          filePath = '/' + filePath + '/' + arguments[1];
        }

        return getFileEntry(filePath, {create: false});
      },

      createFile: function (filePath, replaceBOOL) {
        // Backward compatibility for previous function createFile(filepath replaceBOOL)
        if (arguments.length == 3) {
          filePath = '/' + filePath + '/' + arguments[1];
          replaceBOOL = arguments[2];
        }

        return getFileEntry(filePath, {create: true, exclusive: replaceBOOL});
      },

      removeFile: function (filePath) {
        var q = $q.defer();

        // Backward compatibility for previous function removeFile(dir, file)
        if (arguments.length == 2) {
          filePath = '/' + filePath + '/' + arguments[1];
        }

        getFileEntry(filePath, {create: false}).then(function (fileEntry) {
          fileEntry.remove(q.resolve, q.reject);
        }, q.reject);

        return q.promise;
      },

      // options is a dict with possible keys :
      // - append : true/false (if true, append data on EOF)
      writeFile: function (filePath, data, options) {
        var q = $q.defer();

        getFileWriter(filePath, {create: true}).then(function (fileWriter) {
          if (options && options['append'] === true) {
            // Start write position at EOF.
            fileWriter.seek(fileWriter.length);
          }
          fileWriter.onwriteend = function (evt) {
            if (this.error)
              q.reject(this.error);
            else
              q.resolve(evt);
          };
          fileWriter.write(data);
        }, q.reject);

        return q.promise;
      },

      readFile: function (filePath) {  /// now deprecated in new ng-cordova version
        $log.log('readFile is now deprecated as of v0.1.4-alpha, use readAsText instead');
        return this.readAsText(filePath);
      },

      readAsText: function (filePath) {
        var q = $q.defer();

        // Backward compatibility for previous function readFile(dir, file)
        if (arguments.length == 2) {
          filePath = '/' + filePath + '/' + arguments[1];
        }

        getFile(filePath, {create: false}).then(function (file) {
          getPromisedFileReader(q).readAsText(file);
        }, q.reject);

        return q.promise;
      },


      readAsDataURL: function (filePath) {
        var q = $q.defer();

        // Backward compatibility for previous function readFile(dir, file)
        if (arguments.length == 2) {
          filePath = '/' + filePath + '/' + arguments[1];
        }

        getFile(filePath, {create: false}).then(function (file) {
          getPromisedFileReader(q).readAsDataURL(file);
        }, q.reject);

        return q.promise;
      },

      readAsBinaryString: function (filePath) {
        var q = $q.defer();

        // Backward compatibility for previous function readFile(dir, file)
        if (arguments.length == 2) {
          filePath = '/' + filePath + '/' + arguments[1];
        }

        getFile(filePath, {create: false}).then(function (file) {
          getPromisedFileReader(q).readAsBinaryString(file);
        }, q.reject);

        return q.promise;
      },

      readAsArrayBuffer: function (filePath) {
        var q = $q.defer();

        // Backward compatibility for previous function readFile(dir, file)
        if (arguments.length == 2) {
          filePath = '/' + filePath + '/' + arguments[1];
        }

        getFile(filePath, {create: false}).then(function (file) {
          getPromisedFileReader(q).readAsArrayBuffer(file);
        }, q.reject);

        return q.promise;
      },

      readFileMetadata: function (filePath) {
        return getFile(filePath, {create: false});
      },

      readFileAbsolute: function (filePath) {
        var q = $q.defer();
        getAbsoluteFile(filePath).then(function (file) {
          getPromisedFileReader(q).readAsText(file);
        }, q.reject);
        return q.promise;
      },

      readFileMetadataAbsolute: function (filePath) {
        return getAbsoluteFile(filePath);
      },

      downloadFile: function (source, filePath, trustAllHosts, options) {
        var q = $q.defer();
        var fileTransfer = new FileTransfer();
        var uri = encodeURI(source);

        fileTransfer.onprogress = q.notify;
        fileTransfer.download(uri, filePath, q.resolve, q.reject, trustAllHosts, options);
        return q.promise;
      },

      uploadFile: function (server, filePath, options) {
        var q = $q.defer();
        var fileTransfer = new FileTransfer();
        var uri = encodeURI(server);

        if (options.timeout !== undefined && options.timeout !== null) {
          $timeout(function () {
            fileTransfer.abort();
          }, options.timeout);
          options.timeout = null;
        }

        fileTransfer.onprogress = q.notify;
        fileTransfer.upload(filePath, uri, q.resolve, q.reject, options);
        return q.promise;
      }

    };

    /*
     * Returns a new FileReader that will resolve the provided Deferred with
     * the result of the next method called on the FileReader, or reject it
     * if an error occurs while attempting to complete that operation.
     */
    function getPromisedFileReader(deferred) {
      var reader = new FileReader();
      reader.onloadend = function () {
        if (this.error)
          deferred.reject(this.error);
        else
          deferred.resolve(this.result);
      };
      return reader;
    }

    /*
     * Returns a promise that will be resolved with the requested File object
     * or rejected if an error occurs attempting to retreive it.
     */
    function getFile(path, options) {
      var q = $q.defer();
      getFileEntry(path, options).then(function (fileEntry) {
        fileEntry.file(q.resolve, q.reject);
      }, q.reject);
      return q.promise;
    }

    /*
     * Returns a promise that will either be resolved with a FileWriter bound to the file identified
     * in the provided path or rejected if an error occurs while attempting to initialize
     * the writer.
     */
    function getFileWriter(path, options) {
      var q = $q.defer();
      getFileEntry(path, options).then(function (fileEntry) {
        fileEntry.createWriter(q.resolve, q.reject);
      }, q.reject);
      return q.promise;
    }

    /*
     * Returns a promise that will either be resolved with the FileEntry instance that corresponds
     * to the provided path or rejected if an error occurs while attempting to retrieve the
     * FileEntry.
     */
    function getFileEntry(path, options) {
      var q = $q.defer();
      getFilesystem().then(function (filesystem) {
        filesystem.root.getFile(path, options, q.resolve, q.reject);
      }, q.reject);
      return q.promise;
    }

    /*
     * Returns a promise that will either be resolved with the File object associated with the requested
     * absolute path, or rejected if an error occurs while trying to initialize that File object.
     */
    function getAbsoluteFile(path) {
      var q = $q.defer();
      $window.resolveLocalFileSystemURL(path, function (fileEntry) {
        fileEntry.file(q.resolve, q.reject);
      }, q.reject);
      return q.promise;
    }

    /*
     * Returns a promise that will either be resolved with the Directory object associated with
     * the requested directory or rejected if an error occurs while atempting to access that directory.
     */
    function getDirectory(dir, options) {
      var q = $q.defer();
      getFilesystem().then(function (filesystem) {
        filesystem.root.getDirectory(dir, options, q.resolve, q.reject);
      }, q.reject);
      return q.promise;
    }

    /*
     * Returns a Promise that will be either resolved with the FileSystem object associated
     * with the device's persistent file system and with 1MB of storage reserved for it,
     * or rejected if an error occurs while trying to accessing the FileSystem
     */
    function getFilesystem() {
      var q = $q.defer();
      try {
        $window.requestFileSystem($window.PERSISTENT, 1024 * 1024, q.resolve, q.reject);
      } catch (err) {
        q.reject(err);
      }
      return q.promise;
    }
  }]);

// install   :     cordova plugin add https://github.com/EddyVerbruggen/Flashlight-PhoneGap-Plugin.git
// link      :     https://github.com/EddyVerbruggen/Flashlight-PhoneGap-Plugin

angular.module('ngCordova.plugins.flashlight', [])

  .factory('$cordovaFlashlight', ['$q', '$window', function ($q, $window) {

    return {
      available: function () {
        var q = $q.defer();
        $window.plugins.flashlight.available(function (isAvailable) {
          q.resolve(isAvailable);
        });
        return q.promise;
      },

      switchOn: function () {
        var q = $q.defer();
        $window.plugins.flashlight.switchOn(function (response) {
          q.resolve(response);
        }, function (error) {
          q.reject(error);
        });
        return q.promise;
      },

      switchOff: function () {
        var q = $q.defer();
        $window.plugins.flashlight.switchOff(function (response) {
          q.resolve(response);
        }, function (error) {
          q.reject(error);
        });
        return q.promise;
      },

      toggle: function () {
        var q = $q.defer();
        $window.plugins.flashlight.toggle(function (response) {
          q.resolve(response);
        }, function (error) {
          q.reject(error);
        });
        return q.promise;
      }
    };
  }]);

// install  :     cordova plugin add https://github.com/floatinghotpot/cordova-plugin-flurry.git
// link     :     https://github.com/floatinghotpot/cordova-plugin-flurry

angular.module('ngCordova.plugins.flurryAds', [])
  .factory('$cordovaFlurryAds', ['$q', '$window', function ($q, $window) {

    return {
      setOptions: function (options) {
        var d = $q.defer();

        $window.FlurryAds.setOptions(options, function () {
          d.resolve();
        }, function () {
          d.reject();
        });

        return d.promise;
      },

      createBanner: function (options) {
        var d = $q.defer();

        $window.FlurryAds.createBanner(options, function () {
          d.resolve();
        }, function () {
          d.reject();
        });

        return d.promise;
      },

      removeBanner: function () {
        var d = $q.defer();

        $window.FlurryAds.removeBanner(function () {
          d.resolve();
        }, function () {
          d.reject();
        });

        return d.promise;
      },

      showBanner: function (position) {
        var d = $q.defer();

        $window.FlurryAds.showBanner(position, function () {
          d.resolve();
        }, function () {
          d.reject();
        });

        return d.promise;
      },

      showBannerAtXY: function (x, y) {
        var d = $q.defer();

        $window.FlurryAds.showBannerAtXY(x, y, function () {
          d.resolve();
        }, function () {
          d.reject();
        });

        return d.promise;
      },

      hideBanner: function () {
        var d = $q.defer();

        $window.FlurryAds.hideBanner(function () {
          d.resolve();
        }, function () {
          d.reject();
        });

        return d.promise;
      },

      prepareInterstitial: function (options) {
        var d = $q.defer();

        $window.FlurryAds.prepareInterstitial(options, function () {
          d.resolve();
        }, function () {
          d.reject();
        });

        return d.promise;
      },

      showInterstitial: function () {
        var d = $q.defer();

        $window.FlurryAds.showInterstitial(function () {
          d.resolve();
        }, function () {
          d.reject();
        });

        return d.promise;
      }
    };
  }]);

// install   :     cordova plugin add https://github.com/phonegap-build/GAPlugin.git
// link      :     https://github.com/phonegap-build/GAPlugin

angular.module('ngCordova.plugins.ga', [])

  .factory('$cordovaGA', ['$q', '$window', function ($q, $window) {

    return {
      init: function (id, mingap) {
        var q = $q.defer();
        mingap = (mingap >= 0) ? mingap : 10;
        $window.plugins.gaPlugin.init(function (result) {
            q.resolve(result);
          },
          function (error) {
            q.reject(error);
          },
          id, mingap);
        return q.promise;
      },

      trackEvent: function (success, fail, category, eventAction, eventLabel, eventValue) {
        var q = $q.defer();
        $window.plugins.gaPlugin.trackEvent(function (result) {
            q.resolve(result);
          },
          function (error) {
            q.reject(error);
          },
          category, eventAction, eventLabel, eventValue);
        return q.promise;
      },

      trackPage: function (success, fail, pageURL) {
        var q = $q.defer();
        $window.plugins.gaPlugin.trackPage(function (result) {
            q.resolve(result);
          },
          function (error) {
            q.reject(error);
          },
          pageURL);
        return q.promise;
      },

      setVariable: function (success, fail, index, value) {
        var q = $q.defer();
        $window.plugins.gaPlugin.setVariable(function (result) {
            q.resolve(result);
          },
          function (error) {
            q.reject(error);
          },
          index, value);
        return q.promise;
      },

      exit: function (success, fail) {
        var q = $q.defer();
        $window.plugins.gaPlugin.exit(function (result) {
            q.resolve(result);
          },
          function (error) {
            q.reject(error);
          });
        return q.promise;
      }
    };
  }]);

// install   :     cordova plugin add org.apache.cordova.geolocation
// link      :     https://github.com/apache/cordova-plugin-geolocation/blob/master/doc/index.md

angular.module('ngCordova.plugins.geolocation', [])

  .factory('$cordovaGeolocation', ['$q', function ($q) {

    return {
      getCurrentPosition: function (options) {
        var q = $q.defer();

        navigator.geolocation.getCurrentPosition(function (result) {
          q.resolve(result);
        }, function (err) {
          q.reject(err);
        }, options);

        return q.promise;
      },

      watchPosition: function (options) {
        var q = $q.defer();

        var watchID = navigator.geolocation.watchPosition(function (result) {
          q.notify(result);
        }, function (err) {
          q.reject(err);
        }, options);

        q.promise.cancel = function () {
          navigator.geolocation.clearWatch(watchID);
        };

        q.promise.clearWatch = function (id) {
          navigator.geolocation.clearWatch(id || watchID);
        };

        q.promise.watchID = watchID;

        return q.promise;
      },

      clearWatch: function (watchID) {
        return navigator.geolocation.clearWatch(watchID);
      }
    };
  }]);

// install   :      cordova plugin add org.apache.cordova.globalization
// link      :      https://github.com/apache/cordova-plugin-globalization/blob/master/doc/index.md

angular.module('ngCordova.plugins.globalization', [])

  .factory('$cordovaGlobalization', ['$q', function ($q) {

    return {
      getPreferredLanguage: function () {
        var q = $q.defer();

        navigator.globalization.getPreferredLanguage(function (result) {
            q.resolve(result);
          },
          function (err) {
            q.reject(err);
          });
        return q.promise;
      },

      getLocaleName: function () {
        var q = $q.defer();

        navigator.globalization.getLocaleName(function (result) {
            q.resolve(result);
          },
          function (err) {
            q.reject(err);
          });
        return q.promise;
      },

      getFirstDayOfWeek: function () {
        var q = $q.defer();

        navigator.globalization.getFirstDayOfWeek(function (result) {
            q.resolve(result);
          },
          function (err) {
            q.reject(err);
          });
        return q.promise;
      },

      // "date" parameter must be a JavaScript Date Object.
      dateToString: function (date, options) {
        var q = $q.defer();

        navigator.globalization.dateToString(
          date,
          function (result) {
            q.resolve(result);
          },
          function (err) {
            q.reject(err);
          },
          options);
        return q.promise;
      },

      stringToDate: function (dateString, options) {
        var q = $q.defer();

        navigator.globalization.stringToDate(
          dateString,
          function (result) {
            q.resolve(result);
          },
          function (err) {
            q.reject(err);
          },
          options);
        return q.promise;
      },

      getDatePattern: function (options) {
        var q = $q.defer();

        navigator.globalization.getDatePattern(
          function (result) {
            q.resolve(result);
          },
          function (err) {
            q.reject(err);
          },
          options);
        return q.promise;
      },

      getDateNames: function (options) {
        var q = $q.defer();

        navigator.globalization.getDateNames(
          function (result) {
            q.resolve(result);
          },
          function (err) {
            q.reject(err);
          },
          options);
        return q.promise;
      },

      // "date" parameter must be a JavaScript Date Object.
      isDayLightSavingsTime: function (date) {
        var q = $q.defer();

        navigator.globalization.isDayLightSavingsTime(
          date,
          function (result) {
            q.resolve(result);
          },
          function (err) {
            q.reject(err);
          });
        return q.promise;
      },

      numberToString: function (number, options) {
        var q = $q.defer();

        navigator.globalization.numberToString(
          number,
          function (result) {
            q.resolve(result);
          },
          function (err) {
            q.reject(err);
          },
          options);
        return q.promise;
      },

      stringToNumber: function (numberString, options) {
        var q = $q.defer();

        navigator.globalization.stringToNumber(
          numberString,
          function (result) {
            q.resolve(result);
          },
          function (err) {
            q.reject(err);
          },
          options);
        return q.promise;
      },

      getNumberPattern: function (options) {
        var q = $q.defer();

        navigator.globalization.getNumberPattern(
          function (result) {
            q.resolve(result);
          },
          function (err) {
            q.reject(err);
          },
          options);
        return q.promise;
      },

      getCurrencyPattern: function (currencyCode) {
        var q = $q.defer();

        navigator.globalization.getCurrencyPattern(
          currencyCode,
          function (result) {
            q.resolve(result);
          },
          function (err) {
            q.reject(err);
          });
        return q.promise;
      }

    };
  }]);

// install  :     cordova plugin add https://github.com/floatinghotpot/cordova-admob-pro.git
// link     :     https://github.com/floatinghotpot/cordova-admob-pro

angular.module('ngCordova.plugins.googleAds', [])
  .factory('$cordovaGoogleAds', ['$q', '$window', function ($q, $window) {

    return {
      setOptions: function (options) {
        var d = $q.defer();

        $window.AdMob.setOptions(options, function () {
          d.resolve();
        }, function () {
          d.reject();
        });

        return d.promise;
      },

      createBanner: function (options) {
        var d = $q.defer();

        $window.AdMob.createBanner(options, function () {
          d.resolve();
        }, function () {
          d.reject();
        });

        return d.promise;
      },

      removeBanner: function () {
        var d = $q.defer();

        $window.AdMob.removeBanner(function () {
          d.resolve();
        }, function () {
          d.reject();
        });

        return d.promise;
      },

      showBanner: function (position) {
        var d = $q.defer();

        $window.AdMob.showBanner(position, function () {
          d.resolve();
        }, function () {
          d.reject();
        });

        return d.promise;
      },

      showBannerAtXY: function (x, y) {
        var d = $q.defer();

        $window.AdMob.showBannerAtXY(x, y, function () {
          d.resolve();
        }, function () {
          d.reject();
        });

        return d.promise;
      },

      hideBanner: function () {
        var d = $q.defer();

        $window.AdMob.hideBanner(function () {
          d.resolve();
        }, function () {
          d.reject();
        });

        return d.promise;
      },

      prepareInterstitial: function (options) {
        var d = $q.defer();

        $window.AdMob.prepareInterstitial(options, function () {
          d.resolve();
        }, function () {
          d.reject();
        });

        return d.promise;
      },

      showInterstitial: function () {
        var d = $q.defer();

        $window.AdMob.showInterstitial(function () {
          d.resolve();
        }, function () {
          d.reject();
        });

        return d.promise;
      }
    };
  }]);

// install   :     cordova plugin add https://github.com/danwilson/google-analytics-plugin.git
// link      :     https://github.com/danwilson/google-analytics-plugin

angular.module('ngCordova.plugins.googleAnalytics', [])

  .factory('$cordovaGoogleAnalytics', ['$q', '$window', function ($q, $window) {

    return {
      startTrackerWithId: function (id) {
        var d = $q.defer();

        $window.analytics.startTrackerWithId(id, function (response) {
          d.resolve(response);
        }, function (error) {
          d.reject(error);
        });

        return d.promise;
      },

      setUserId: function (id) {
        var d = $q.defer();

        $window.analytics.setUserId(id, function (response) {
          d.resolve(response);
        }, function (error) {
          d.reject(error);
        });

        return d.promise;
      },

      debugMode: function () {
        var d = $q.defer();

        $window.analytics.debugMode(function (response) {
          d.resolve(response);
        }, function () {
          d.reject();
        });

        return d.promise;
      },

      trackView: function (screenName) {
        var d = $q.defer();

        $window.analytics.trackView(screenName, function (response) {
          d.resolve(response);
        }, function (error) {
          d.reject(error);
        });

        return d.promise;
      },

      addCustomDimension: function (key, value) {
        var d = $q.defer();

        $window.analytics.addCustomDimension(key, value, function () {
          d.resolve();
        }, function (error) {
          d.reject(error);
        });

        return d.promise;
      },

      trackEvent: function (category, action, label, value) {
        var d = $q.defer();

        $window.analytics.trackEvent(category, action, label, value, function (response) {
          d.resolve(response);
        }, function (error) {
          d.reject(error);
        });

        return d.promise;
      },

      addTransaction: function (transactionId, affiliation, revenue, tax, shipping, currencyCode) {
        var d = $q.defer();

        $window.analytics.addTransaction(transactionId, affiliation, revenue, tax, shipping, currencyCode, function (response) {
          d.resolve(response);
        }, function (error) {
          d.reject(error);
        });

        return d.promise;
      },

      addTransactionItem: function (transactionId, name, sku, category, price, quantity, currencyCode) {
        var d = $q.defer();

        $window.analytics.addTransactionItem(transactionId, name, sku, category, price, quantity, currencyCode, function (response) {
          d.resolve(response);
        }, function (error) {
          d.reject(error);
        });

        return d.promise;
      }
    };
  }]);

// install   :
// link      :

// Google Maps needs ALOT of work!
// Not for production use

angular.module('ngCordova.plugins.googleMap', [])

  .factory('$cordovaGoogleMap', ['$q', '$window', function ($q, $window) {

    var map = null;

    return {
      getMap: function (options) {
        var q = $q.defer();

        if (!$window.plugin.google.maps) {
          q.reject(null);
        }
        else {
          var div = document.getElementById("map_canvas");
          map = $window.plugin.google.maps.Map.getMap(options);
          map.setDiv(div);
          q.resolve(map);
        }
        return q.promise;
      },


      isMapLoaded: function () { // check if an instance of the map exists
        return !!map;
      },
      addMarker: function (markerOptions) { // add a marker to the map with given markerOptions
        var q = $q.defer();
        map.addMarker(markerOptions, function (marker) {
          q.resolve(marker);
        });

        return q.promise;
      },
      getMapTypeIds: function () {
        return $window.plugin.google.maps.mapTypeId;
      },
      setVisible: function (isVisible) {
        var q = $q.defer();
        map.setVisible(isVisible);
        return q.promise;
      },
      // I don't know how to deallocate te map and the google map plugin.
      cleanup: function () {
        map = null;
        // delete map;
      }
    };
  }]);

// install  :     cordova plugin add https://github.com/floatinghotpot/cordova-httpd.git
// link     :     https://github.com/floatinghotpot/cordova-httpd

angular.module('ngCordova.plugins.httpd', [])
  .factory('$cordovaHttpd', ['$q', function ($q) {

    return {
      startServer: function (options) {
        var d = $q.defer();

        cordova.plugins.CorHttpd.startServer(options, function () {
          d.resolve();
        }, function () {
          d.reject();
        });

        return d.promise;
      },

      stopServer: function () {
        var d = $q.defer();

        cordova.plugins.CorHttpd.stopServer(function () {
          d.resolve();
        }, function () {
          d.reject();
        });

        return d.promise;
      },

      getURL: function () {
        var d = $q.defer();

        cordova.plugins.CorHttpd.getURL(function (url) {
          d.resolve(url);
        }, function () {
          d.reject();
        });

        return d.promise;
      },

      getLocalPath: function () {
        var d = $q.defer();

        cordova.plugins.CorHttpd.getLocalPath(function (path) {
          d.resolve(path);
        }, function () {
          d.reject();
        });

        return d.promise;
      }

    };
  }]);

// install  :     cordova plugin add https://github.com/floatinghotpot/cordova-plugin-iad.git
// link     :     https://github.com/floatinghotpot/cordova-plugin-iad

angular.module('ngCordova.plugins.iAd', [])
  .factory('$cordovaiAd', ['$q', '$window', function ($q, $window) {

    return {
      setOptions: function (options) {
        var d = $q.defer();

        $window.iAd.setOptions(options, function () {
          d.resolve();
        }, function () {
          d.reject();
        });

        return d.promise;
      },

      createBanner: function (options) {
        var d = $q.defer();

        $window.iAd.createBanner(options, function () {
          d.resolve();
        }, function () {
          d.reject();
        });

        return d.promise;
      },

      removeBanner: function () {
        var d = $q.defer();

        $window.iAd.removeBanner(function () {
          d.resolve();
        }, function () {
          d.reject();
        });

        return d.promise;
      },

      showBanner: function (position) {
        var d = $q.defer();

        $window.iAd.showBanner(position, function () {
          d.resolve();
        }, function () {
          d.reject();
        });

        return d.promise;
      },

      showBannerAtXY: function (x, y) {
        var d = $q.defer();

        $window.iAd.showBannerAtXY(x, y, function () {
          d.resolve();
        }, function () {
          d.reject();
        });

        return d.promise;
      },

      hideBanner: function () {
        var d = $q.defer();

        $window.iAd.hideBanner(function () {
          d.resolve();
        }, function () {
          d.reject();
        });

        return d.promise;
      },

      prepareInterstitial: function (options) {
        var d = $q.defer();

        $window.iAd.prepareInterstitial(options, function () {
          d.resolve();
        }, function () {
          d.reject();
        });

        return d.promise;
      },

      showInterstitial: function () {
        var d = $q.defer();

        $window.iAd.showInterstitial(function () {
          d.resolve();
        }, function () {
          d.reject();
        });

        return d.promise;
      }
    };
  }]);

// install  :     cordova plugin add https://github.com/wymsee/cordova-imagePicker.git
// link     :     https://github.com/wymsee/cordova-imagePicker

angular.module('ngCordova.plugins.imagePicker', [])

  .factory('$cordovaImagePicker', ['$q', '$window', function ($q, $window) {

    return {
      getPictures: function (options) {
        var q = $q.defer();

        $window.imagePicker.getPictures(function (results) {
          q.resolve(results);
        }, function (error) {
          q.reject(error);
        }, options);

        return q.promise;
      }
    };
  }]);

// install   :     cordova plugin add org.apache.cordova.inappbrowser
// link      :     https://github.com/apache/cordova-plugin-inappbrowser/blob/master/doc/index.md

angular.module('ngCordova.plugins.inAppBrowser', [])

  .factory('$cordovaInAppBrowser', ['$rootScope', '$q', '$window', function ($rootScope, $q, $window) {

    var win, options;
    var scope = $rootScope.$new();

    return {
      init: function (config) {
        if (angular.isObject(config)) {
          var opt = [];
          for (var i in config) {
            opt.push([i + '=' + config[i]]);
          }
          options = opt.join();
        } else {
          options = config;
        }

        return scope;
      },

      open: function (url, target) {
        var q = $q.defer();

        win = $window.open(url, target, options);

        win.addEventListener('loadstart', function (event) {
          scope.$emit('loadstart', event);
        }, false);

        win.addEventListener('loadstop', function (event) {
          q.resolve(event);
          scope.$emit('loadstop', event);
        }, false);

        win.addEventListener('loaderror', function (event) {
          q.reject(event);
          scope.$emit('loaderror', event);
        }, false);

        win.addEventListener('exit', function (event) {
          scope.$emit('exit', event);
        }, false);

        return q.promise;
      },

      close: function () {
        win.close();
      },

      executeScript: function (details) {
        var q = $q.defer();

        win.executeScript(details, function (result) {
          q.resolve(result);
        });

        return q.promise;
      },

      insertCSS: function (details) {
        var q = $q.defer();

        win.insertCSS(details, function (result) {
          q.resolve(result);
        });

        return q.promise;
      }
    };

  }]);

// install   :      cordova plugin add https://github.com/driftyco/ionic-plugins-keyboard.git
// link      :      https://github.com/driftyco/ionic-plugins-keyboard

//TODO: add support for native.keyboardshow + native.keyboardhide

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
        return cordova.plugins.Keyboard.isVisible;
      }
    };
  }]);

// install   :      cordova plugin add https://github.com/shazron/KeychainPlugin.git
// link      :      https://github.com/shazron/KeychainPlugin

angular.module('ngCordova.plugins.keychain', [])

  .factory('$cordovaKeychain', ['$q', function ($q) {

    var kc = new Keychain();

    return {
      getForKey: function (key, serviceName) {
        var defer = $q.defer();

        kc.getForKey(defer.resolve, defer.reject, key, serviceName);

        return defer.promise;
      },

      setForKey: function (key, serviceName, value) {
        var defer = $q.defer();

        kc.setForKey(defer.resolve, defer.reject, key, serviceName, value);

        return defer.promise;
      },

      removeForKey: function (key, serviceName) {
        var defer = $q.defer();

        kc.removeForKey(defer.resolve, defer.reject, key, serviceName);

        return defer.promise;
      }
    };
  }]);

// install   :  cordova plugin add de.appplant.cordova.plugin.local-notification
// link      :  https://github.com/katzer/cordova-plugin-local-notifications/

angular.module('ngCordova.plugins.localNotification', [])

  .factory('$cordovaLocalNotification', ['$q', '$window', function ($q, $window) {

    return {
      add: function (options, scope) {
        var q = $q.defer();
        $window.plugin.notification.local.add(
          options,
          function (result) {
            q.resolve(result);
          },
          scope);
        return q.promise;
      },

      cancel: function (id, scope) {
        var q = $q.defer();
        $window.plugin.notification.local.cancel(
          id, function (result) {
            q.resolve(result);
          }, scope);

        return q.promise;
      },

      cancelAll: function (scope) {
        var q = $q.defer();

        $window.plugin.notification.local.cancelAll(
          function (result) {
            q.resolve(result);
          }, scope);

        return q.promise;
      },

      isScheduled: function (id, scope) {
        var q = $q.defer();

        $window.plugin.notification.local.isScheduled(
          id,
          function (result) {
            q.resolve(result);
          }, scope);

        return q.promise;
      },

      hasPermission: function (scope) {
        var q = $q.defer();

        $window.plugin.notification.local.hasPermission(
          function (badge) {
            q.resolve(badge);
          }, scope);

        return q.promise;
      },

      promptForPermission: function () {
        $window.plugin.notification.local.promptForPermission();
      },

      getScheduledIds: function (scope) {
        var q = $q.defer();

        $window.plugin.notification.local.getScheduledIds(
          function (result) {
            q.resolve(result);
          }, scope);

        return q.promise;
      },

      isTriggered: function (id, scope) {
        var q = $q.defer();

        $window.plugin.notification.local.isTriggered(
          id, function (result) {
            q.resolve(result);
          }, scope);

        return q.promise;
      },

      getTriggeredIds: function (scope) {
        var q = $q.defer();

        $window.plugin.notification.local.getTriggeredIds(
          function (result) {
            q.resolve(result);
          }, scope);

        return q.promise;
      },

      getDefaults: function () {
        return $window.plugin.notification.local.getDefaults();
      },

      setDefaults: function (Object) {
        $window.plugin.notification.local.setDefaults(Object);
      },

      onadd: function () {
        return $window.plugin.notification.local.onadd;
      },

      ontrigger: function () {
        return $window.plugin.notification.local.ontrigger;
      },

      onclick: function () {
        return $window.plugin.notification.local.onclick;
      },

      oncancel: function () {
        return $window.plugin.notification.local.oncancel;
      }
    };
  }]);

// install  :     cordova plugin add https://github.com/floatinghotpot/cordova-plugin-mmedia.git
// link     :     https://github.com/floatinghotpot/cordova-plugin-mmedia

angular.module('ngCordova.plugins.mMediaAds', [])
  .factory('$cordovaMMediaAds', ['$q', '$window', function ($q, $window) {

    return {
      setOptions: function (options) {
        var d = $q.defer();

        $window.mMedia.setOptions(options, function () {
          d.resolve();
        }, function () {
          d.reject();
        });

        return d.promise;
      },

      createBanner: function (options) {
        var d = $q.defer();

        $window.mMedia.createBanner(options, function () {
          d.resolve();
        }, function () {
          d.reject();
        });

        return d.promise;
      },

      removeBanner: function () {
        var d = $q.defer();

        $window.mMedia.removeBanner(function () {
          d.resolve();
        }, function () {
          d.reject();
        });

        return d.promise;
      },

      showBanner: function (position) {
        var d = $q.defer();

        $window.mMedia.showBanner(position, function () {
          d.resolve();
        }, function () {
          d.reject();
        });

        return d.promise;
      },

      showBannerAtXY: function (x, y) {
        var d = $q.defer();

        $window.mMedia.showBannerAtXY(x, y, function () {
          d.resolve();
        }, function () {
          d.reject();
        });

        return d.promise;
      },

      hideBanner: function () {
        var d = $q.defer();

        $window.mMedia.hideBanner(function () {
          d.resolve();
        }, function () {
          d.reject();
        });

        return d.promise;
      },

      prepareInterstitial: function (options) {
        var d = $q.defer();

        $window.mMedia.prepareInterstitial(options, function () {
          d.resolve();
        }, function () {
          d.reject();
        });

        return d.promise;
      },

      showInterstitial: function () {
        var d = $q.defer();

        $window.mMedia.showInterstitial(function () {
          d.resolve();
        }, function () {
          d.reject();
        });

        return d.promise;
      }
    };
  }]);

// install   :      cordova plugin add org.apache.cordova.media
// link      :      https://github.com/apache/cordova-plugin-media

angular.module('ngCordova.plugins.media', [])

  .factory('$cordovaMedia', ['$q', function ($q) {

    return {
      newMedia: function (src) {
        var q = $q.defer();
        var mediaStatus = null;
        var media;

        media = new Media(src,
          function (success) {
            q.resolve(success);
          }, function (error) {
            q.reject(error);
          }, function (status) {
            mediaStatus = status;
          });

        // getCurrentPosition NOT WOKRING!
        q.promise.getCurrentPosition = function () {
          media.getCurrentPosition(function (success) {
          }, function (error) {
          })
        };

        q.promise.getDuration = function () {
           media.getDuration();
        };

        // iOS quirks :
        // -  myMedia.play({ numberOfLoops: 2 }) -> looping
        // -  myMedia.play({ playAudioWhenScreenIsLocked : false })
        q.promise.play = function (options) {
          if (typeof options !== "object") {
            options = {};
          }
          media.play(options);
        };

        q.promise.pause = function () {
          media.pause();
        };

        q.promise.stop = function () {
          media.stop();
        };

        q.promise.release = function () {
          media.release();
        };

        q.promise.seekTo = function (timing) {
          media.seekTo(timing);
        };

        q.promise.setVolume = function (volume) {
          media.setVolume(volume);
        };

        q.promise.startRecord = function () {
          media.startRecord();
        };

        q.promise.stopRecord = function () {
          media.stopRecord();
        };

        return q.promise;
      }
    };
  }]);

// install  :     cordova plugin add https://github.com/floatinghotpot/cordova-mobfox-pro.git
// link     :     https://github.com/floatinghotpot/cordova-mobfox-pro

angular.module('ngCordova.plugins.mobfoxAds', [])
  .factory('$cordovaMobFoxAds', ['$q', '$window', function ($q, $window) {

    return {
      setOptions: function (options) {
        var d = $q.defer();

        $window.MobFox.setOptions(options, function () {
          d.resolve();
        }, function () {
          d.reject();
        });

        return d.promise;
      },

      createBanner: function (options) {
        var d = $q.defer();

        $window.MobFox.createBanner(options, function () {
          d.resolve();
        }, function () {
          d.reject();
        });

        return d.promise;
      },

      removeBanner: function () {
        var d = $q.defer();

        $window.MobFox.removeBanner(function () {
          d.resolve();
        }, function () {
          d.reject();
        });

        return d.promise;
      },

      showBanner: function (position) {
        var d = $q.defer();

        $window.MobFox.showBanner(position, function () {
          d.resolve();
        }, function () {
          d.reject();
        });

        return d.promise;
      },

      showBannerAtXY: function (x, y) {
        var d = $q.defer();

        $window.MobFox.showBannerAtXY(x, y, function () {
          d.resolve();
        }, function () {
          d.reject();
        });

        return d.promise;
      },

      hideBanner: function () {
        var d = $q.defer();

        $window.MobFox.hideBanner(function () {
          d.resolve();
        }, function () {
          d.reject();
        });

        return d.promise;
      },

      prepareInterstitial: function (options) {
        var d = $q.defer();

        $window.MobFox.prepareInterstitial(options, function () {
          d.resolve();
        }, function () {
          d.reject();
        });

        return d.promise;
      },

      showInterstitial: function () {
        var d = $q.defer();

        $window.MobFox.showInterstitial(function () {
          d.resolve();
        }, function () {
          d.reject();
        });

        return d.promise;
      }
    };
  }]);

angular.module('ngCordova.plugins', [
  'ngCordova.plugins.actionSheet',
  'ngCordova.plugins.adMob',
  'ngCordova.plugins.appAvailability',
  'ngCordova.plugins.appRate',
  'ngCordova.plugins.appVersion',
  'ngCordova.plugins.backgroundGeolocation',
  'ngCordova.plugins.badge',
  'ngCordova.plugins.barcodeScanner',
  'ngCordova.plugins.brightness',
  'ngCordova.plugins.battery-status',
  'ngCordova.plugins.ble',
  'ngCordova.plugins.bluetoothSerial',
  'ngCordova.plugins.calendar',
  'ngCordova.plugins.camera',
  'ngCordova.plugins.capture',
  'ngCordova.plugins.clipboard',
  'ngCordova.plugins.contacts',
  'ngCordova.plugins.datePicker',
  'ngCordova.plugins.device',
  'ngCordova.plugins.deviceMotion',
  'ngCordova.plugins.deviceOrientation',
  'ngCordova.plugins.dialogs',
  'ngCordova.plugins.emailComposer',
  'ngCordova.plugins.facebook',
  'ngCordova.plugins.facebookAds',
  'ngCordova.plugins.file',
  'ngCordova.plugins.flashlight',
  'ngCordova.plugins.flurryAds',
  'ngCordova.plugins.ga',
  'ngCordova.plugins.geolocation',
  'ngCordova.plugins.globalization',
  'ngCordova.plugins.googleAds',
  'ngCordova.plugins.googleAnalytics',
  'ngCordova.plugins.googleMap',
  'ngCordova.plugins.httpd',
  'ngCordova.plugins.iAd',
  'ngCordova.plugins.imagePicker',
  'ngCordova.plugins.inAppBrowser',
  'ngCordova.plugins.keyboard',
  'ngCordova.plugins.keychain',
  'ngCordova.plugins.localNotification',
  'ngCordova.plugins.media',
  'ngCordova.plugins.mMediaAds',
  'ngCordova.plugins.mobfoxAds',
  'ngCordova.plugins.mopubAds',
  'ngCordova.plugins.nativeAudio',
  'ngCordova.plugins.network',
  'ngCordova.plugins.oauth',
  'ngCordova.plugins.oauthUtility',
  'ngCordova.plugins.pinDialog',
  'ngCordova.plugins.prefs',
  'ngCordova.plugins.printer',
  'ngCordova.plugins.progressIndicator',
  'ngCordova.plugins.push',
  'ngCordova.plugins.sms',
  'ngCordova.plugins.socialSharing',
  'ngCordova.plugins.spinnerDialog',
  'ngCordova.plugins.splashscreen',
  'ngCordova.plugins.sqlite',
  'ngCordova.plugins.statusbar',
  'ngCordova.plugins.toast',
  'ngCordova.plugins.touchid',
  'ngCordova.plugins.vibration',
  'ngCordova.plugins.videoCapturePlus',
  'ngCordova.plugins.zip'
]);

// install  :     cordova plugin add https://github.com/floatinghotpot/cordova-plugin-mopub.git
// link     :     https://github.com/floatinghotpot/cordova-plugin-mopub

angular.module('ngCordova.plugins.mopubAds', [])
  .factory('$cordovaMoPubAds', ['$q', '$window', function ($q, $window) {

    return {
      setOptions: function (options) {
        var d = $q.defer();

        $window.MoPub.setOptions(options, function () {
          d.resolve();
        }, function () {
          d.reject();
        });

        return d.promise;
      },

      createBanner: function (options) {
        var d = $q.defer();

        $window.MoPub.createBanner(options, function () {
          d.resolve();
        }, function () {
          d.reject();
        });

        return d.promise;
      },

      removeBanner: function () {
        var d = $q.defer();

        $window.MoPub.removeBanner(function () {
          d.resolve();
        }, function () {
          d.reject();
        });

        return d.promise;
      },

      showBanner: function (position) {
        var d = $q.defer();

        $window.MoPub.showBanner(position, function () {
          d.resolve();
        }, function () {
          d.reject();
        });

        return d.promise;
      },

      showBannerAtXY: function (x, y) {
        var d = $q.defer();

        $window.MoPub.showBannerAtXY(x, y, function () {
          d.resolve();
        }, function () {
          d.reject();
        });

        return d.promise;
      },

      hideBanner: function () {
        var d = $q.defer();

        $window.MoPub.hideBanner(function () {
          d.resolve();
        }, function () {
          d.reject();
        });

        return d.promise;
      },

      prepareInterstitial: function (options) {
        var d = $q.defer();

        $window.MoPub.prepareInterstitial(options, function () {
          d.resolve();
        }, function () {
          d.reject();
        });

        return d.promise;
      },

      showInterstitial: function () {
        var d = $q.defer();

        $window.MoPub.showInterstitial(function () {
          d.resolve();
        }, function () {
          d.reject();
        });

        return d.promise;
      }
    };
  }]);

// install   : cordova plugin add https://github.com/sidneys/cordova-plugin-nativeaudio.git
// link      : https://github.com/sidneys/cordova-plugin-nativeaudio

angular.module('ngCordova.plugins.nativeAudio', [])

  .factory('$cordovaNativeAudio', ['$q', '$window', function ($q, $window) {

    return {
      preloadSimple: function (id, assetPath) {
        var q = $q.defer();
        $window.plugins.NativeAudio.preloadSimple(id, assetPath, function (result) {
          q.resolve(result);
        }, function (err) {
          q.reject(err);
        });

        return q.promise;
      },

      preloadComplex: function (id, assetPath, volume, voices) {
        var q = $q.defer();
        $window.plugins.NativeAudio.preloadComplex(id, assetPath, volume, voices, function (result) {
          q.resolve(result);
        }, function (err) {
          q.reject(err);
        });

        return q.promise;
      },

      play: function (id, completeCallback) {
        var q = $q.defer();
        $window.plugins.NativeAudio.play(id, completeCallback, function (result) {
          q.resolve(result);
        }, function (err) {
          q.reject(err);
        });

        return q.promise;
      },

      stop: function (id) {
        var q = $q.defer();
        $window.plugins.NativeAudio.stop(id, function (result) {
          q.resolve(result);
        }, function (err) {
          q.reject(err);
        });
        return q.promise;
      },

      loop: function (id) {
        var q = $q.defer();
        $window.plugins.NativeAudio.loop(id, function (result) {
          q.resolve(result);
        }, function (err) {
          q.reject(err);
        });

        return q.promise;
      },

      unload: function (id) {
        var q = $q.defer();
        $window.plugins.NativeAudio.unload(id, function (result) {
          q.resolve(result);
        }, function (err) {
          q.reject(err);
        });

        return q.promise;
      },

      setVolumeForComplexAsset: function (id, volume) {
        var q = $q.defer();
        $window.plugins.NativeAudio.setVolumeForComplexAsset(id, volume, function (result) {
          q.resolve(result);
        }, function (err) {
          q.reject(err);
        });

        return q.promise;
      }
    };
  }]);

// install   :      cordova plugin add org.apache.cordova.network-information
// link      :      https://github.com/apache/cordova-plugin-network-information/blob/master/doc/index.md

angular.module('ngCordova.plugins.network', [])

  .factory('$cordovaNetwork', [function () {

    return {

      getNetwork: function () {
        return navigator.connection.type;
      },

      isOnline: function () {
        var networkState = navigator.connection.type;
        return networkState !== Connection.UNKNOWN && networkState !== Connection.NONE;
      },

      isOffline: function () {
        var networkState = navigator.connection.type;
        return networkState === Connection.UNKNOWN || networkState === Connection.NONE;
      },

      watchNetwork: function () {
        // function for watching online / offline
      }
    };
  }]);

/* Created by Nic Raboy
 * http://www.nraboy.com
 *
 * DESCRIPTION: Use Oauth sign in for various web services.
 *
 * REQUIRES:  Apache Cordova 3.5+, Apache InAppBrowser Plugin, jsSHA (Twitter only)
 *
 * SUPPORTS:
 *    Dropbox
 *    Digital Ocean
 *    Google
 *    GitHub
 *    Facebook
 *    LinkedIn
 *    Instagram
 *    Box
 *    Reddit
 *    Twitter
 *    Meetup
 */

angular.module("ngCordova.plugins.oauth", ["ngCordova.plugins.oauthUtility"])

  .factory('$cordovaOauth', ['$q', '$http', '$cordovaOauthUtility', function ($q, $http, $cordovaOauthUtility) {

    return {

      /*
       * Sign into the Dropbox service
       *
       * @param    string appKey
       * @return   promise
       */
      dropbox: function (appKey) {
        var deferred = $q.defer();
        if (window.cordova) {
          var cordovaMetadata = cordova.require("cordova/plugin_list").metadata;
          if (cordovaMetadata.hasOwnProperty("org.apache.cordova.inappbrowser") === true) {
            var browserRef = window.open("https://www.dropbox.com/1/oauth2/authorize?client_id=" + appKey + "&redirect_uri=http://localhost/callback" + "&response_type=token", "_blank", "location=no,clearsessioncache=yes,clearcache=yes");
            browserRef.addEventListener("loadstart", function (event) {
              if ((event.url).indexOf("http://localhost/callback") === 0) {
                var callbackResponse = (event.url).split("#")[1];
                var responseParameters = (callbackResponse).split("&");
                var parameterMap = [];
                for (var i = 0; i < responseParameters.length; i++) {
                  parameterMap[responseParameters[i].split("=")[0]] = responseParameters[i].split("=")[1];
                }
                if (parameterMap["access_token"] !== undefined && parameterMap["access_token"] !== null) {
                  var promiseResponse = {
                    access_token: parameterMap["access_token"],
                    token_type: parameterMap["token_type"],
                    uid: parameterMap["uid"]
                  };
                  deferred.resolve(promiseResponse);
                } else {
                  deferred.reject("Problem authenticating");
                }
                browserRef.close();
              }
            });
          } else {
            deferred.reject("Could not find InAppBrowser plugin");
          }
        } else {
          deferred.reject("Cannot authenticate via a web browser");
        }
        return deferred.promise;
      },

      /*
       * Sign into the Digital Ocean service
       *
       * @param    string clientId
       * @param    string clientSecret
       * @return   promise
       */
      digitalOcean: function (clientId, clientSecret) {
        var deferred = $q.defer();
        if (window.cordova) {
          var cordovaMetadata = cordova.require("cordova/plugin_list").metadata;
          if (cordovaMetadata.hasOwnProperty("org.apache.cordova.inappbrowser") === true) {
            var browserRef = window.open("https://cloud.digitalocean.com/v1/oauth/authorize?client_id=" + clientId + "&redirect_uri=http://localhost/callback&response_type=code&scope=read%20write", "_blank", "location=no,clearsessioncache=yes,clearcache=yes");
            browserRef.addEventListener("loadstart", function (event) {
              if ((event.url).indexOf("http://localhost/callback") === 0) {
                var requestToken = (event.url).split("code=")[1];
                $http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
                $http({
                  method: "post",
                  url: "https://cloud.digitalocean.com/v1/oauth/token",
                  data: "client_id=" + clientId + "&client_secret=" + clientSecret + "&redirect_uri=http://localhost/callback" + "&grant_type=authorization_code" + "&code=" + requestToken
                })
                  .success(function (data) {
                    deferred.resolve(data);
                  })
                  .error(function (data, status) {
                    deferred.reject("Problem authenticating");
                  });
                browserRef.close();
              }
            });
          } else {
            deferred.reject("Could not find InAppBrowser plugin");
          }
        } else {
          deferred.reject("Cannot authenticate via a web browser");
        }
        return deferred.promise;
      },

      /*
       * Sign into the Google service
       *
       * @param    string clientId
       * @param    array appScope
       * @return   promise
       */
      google: function (clientId, appScope) {
        var deferred = $q.defer();
        if (window.cordova) {
          var cordovaMetadata = cordova.require("cordova/plugin_list").metadata;
          if (cordovaMetadata.hasOwnProperty("org.apache.cordova.inappbrowser") === true) {
            var browserRef = window.open('https://accounts.google.com/o/oauth2/auth?client_id=' + clientId + '&redirect_uri=http://localhost/callback&scope=' + appScope.join(" ") + '&approval_prompt=force&response_type=token', '_blank', 'location=no,clearsessioncache=yes,clearcache=yes');
            browserRef.addEventListener("loadstart", function (event) {
              if ((event.url).indexOf("http://localhost/callback") === 0) {
                var callbackResponse = (event.url).split("#")[1];
                var responseParameters = (callbackResponse).split("&");
                var parameterMap = [];
                for (var i = 0; i < responseParameters.length; i++) {
                  parameterMap[responseParameters[i].split("=")[0]] = responseParameters[i].split("=")[1];
                }
                if (parameterMap["access_token"] !== undefined && parameterMap["access_token"] !== null) {
                  var promiseResponse = {
                    access_token: parameterMap["access_token"],
                    token_type: parameterMap["token_type"],
                    uid: parameterMap["uid"]
                  };
                  deferred.resolve({access_token: parameterMap["access_token"], token_type: parameterMap["token_type"], expires_in: parameterMap["expires_in"]});
                } else {
                  deferred.reject("Problem authenticating");
                }
                browserRef.close();
              }
            });
          } else {
            deferred.reject("Could not find InAppBrowser plugin");
          }
        } else {
          deferred.reject("Cannot authenticate via a web browser");
        }
        return deferred.promise;
      },

      /*
       * Sign into the GitHub service
       *
       * @param    string clientId
       * @param    string clientSecret
       * @param    array appScope
       * @return   promise
       */
      github: function (clientId, clientSecret, appScope) {
        var deferred = $q.defer();
        if (window.cordova) {
          var cordovaMetadata = cordova.require("cordova/plugin_list").metadata;
          if (cordovaMetadata.hasOwnProperty("org.apache.cordova.inappbrowser") === true) {
            var browserRef = window.open('https://github.com/login/oauth/authorize?client_id=' + clientId + '&redirect_uri=http://localhost/callback&scope=' + appScope.join(","), '_blank', 'location=no,clearsessioncache=yes,clearcache=yes');
            browserRef.addEventListener('loadstart', function (event) {
              if ((event.url).indexOf("http://localhost/callback") === 0) {
                var requestToken = (event.url).split("code=")[1];
                $http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
                $http.defaults.headers.post['Accept'] = 'application/json';
                $http({method: "post", url: "https://github.com/login/oauth/access_token", data: "client_id=" + clientId + "&client_secret=" + clientSecret + "&redirect_uri=http://localhost/callback" + "&code=" + requestToken})
                  .success(function (data) {
                    deferred.resolve(data);
                  })
                  .error(function (data, status) {
                    deferred.reject("Problem authenticating");
                  });
                browserRef.close();
              }
            });
          } else {
            deferred.reject("Could not find InAppBrowser plugin");
          }
        } else {
          deferred.reject("Cannot authenticate via a web browser");
        }
        return deferred.promise;
      },

      /*
       * Sign into the Facebook service
       *
       * @param    string clientId
       * @param    array appScope
       * @return   promise
       */
      facebook: function (clientId, appScope) {
        var deferred = $q.defer();
        if (window.cordova) {
          var cordovaMetadata = cordova.require("cordova/plugin_list").metadata;
          if (cordovaMetadata.hasOwnProperty("org.apache.cordova.inappbrowser") === true) {
            var browserRef = window.open('https://www.facebook.com/dialog/oauth?client_id=' + clientId + '&redirect_uri=http://localhost/callback&response_type=token&scope=' + appScope.join(","), '_blank', 'location=no,clearsessioncache=yes,clearcache=yes');
            browserRef.addEventListener('loadstart', function (event) {
              if ((event.url).indexOf("http://localhost/callback") === 0) {
                var callbackResponse = (event.url).split("#")[1];
                var responseParameters = (callbackResponse).split("&");
                var parameterMap = [];
                for (var i = 0; i < responseParameters.length; i++) {
                  parameterMap[responseParameters[i].split("=")[0]] = responseParameters[i].split("=")[1];
                }
                if (parameterMap["access_token"] !== undefined && parameterMap["access_token"] !== null) {
                  var promiseResponse = {
                    access_token: parameterMap["access_token"],
                    expires_in: parameterMap["expires_in"]
                  };
                  deferred.resolve(promiseResponse);
                } else {
                  deferred.reject("Problem authenticating");
                }
                browserRef.close();
              }
            });
          } else {
            deferred.reject("Could not find InAppBrowser plugin");
          }
        } else {
          deferred.reject("Cannot authenticate via a web browser");
        }
        return deferred.promise;
      },

      /*
       * Sign into the LinkedIn service
       *
       * @param    string clientId
       * @param    string clientSecret
       * @param    array appScope
       * @param    string state
       * @return   promise
       */
      linkedin: function (clientId, clientSecret, appScope, state) {
        var deferred = $q.defer();
        if (window.cordova) {
          var cordovaMetadata = cordova.require("cordova/plugin_list").metadata;
          if (cordovaMetadata.hasOwnProperty("org.apache.cordova.inappbrowser") === true) {
            var browserRef = window.open('https://www.linkedin.com/uas/oauth2/authorization?client_id=' + clientId + '&redirect_uri=http://localhost/callback&scope=' + appScope.join(" ") + '&response_type=code&state=' + state, '_blank', 'location=no,clearsessioncache=yes,clearcache=yes');
            browserRef.addEventListener('loadstart', function (event) {
              if ((event.url).indexOf("http://localhost/callback") === 0) {
                var requestToken = (event.url).split("code=")[1];
                $http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
                $http({
                  method: "post",
                  url: "https://www.linkedin.com/uas/oauth2/accessToken",
                  data: "client_id=" + clientId + "&client_secret=" + clientSecret + "&redirect_uri=http://localhost/callback" + "&grant_type=authorization_code" + "&code=" + requestToken
                })
                  .success(function (data) {
                    deferred.resolve(data);
                  })
                  .error(function (data, status) {
                    deferred.reject("Problem authenticating");
                  });
                browserRef.close();
              }
            });
          } else {
            deferred.reject("Could not find InAppBrowser plugin");
          }
        } else {
          deferred.reject("Cannot authenticate via a web browser");
        }
        return deferred.promise;
      },

      /*
       * Sign into the Instagram service
       *
       * @param    string clientId
       * @param    array appScope
       * @return   promise
       */
      instagram: function (clientId, appScope) {
        var deferred = $q.defer();
        if (window.cordova) {
          var cordovaMetadata = cordova.require("cordova/plugin_list").metadata;
          if (cordovaMetadata.hasOwnProperty("org.apache.cordova.inappbrowser") === true) {
            var browserRef = window.open('https://api.instagram.com/oauth/authorize/?client_id=' + clientId + '&redirect_uri=http://localhost/callback&scope=' + appScope.join(" ") + '&response_type=token', '_blank', 'location=no,clearsessioncache=yes,clearcache=yes');
            browserRef.addEventListener('loadstart', function (event) {
              if ((event.url).indexOf("http://localhost/callback") === 0) {
                var callbackResponse = (event.url).split("#")[1];
                var responseParameters = (callbackResponse).split("&");
                var parameterMap = [];
                for (var i = 0; i < responseParameters.length; i++) {
                  parameterMap[responseParameters[i].split("=")[0]] = responseParameters[i].split("=")[1];
                }
                if (parameterMap["access_token"] !== undefined && parameterMap["access_token"] !== null) {
                  var promiseResponse = {
                    access_token: parameterMap["access_token"]
                  };
                  deferred.resolve(promiseResponse);
                } else {
                  deferred.reject("Problem authenticating");
                }
                browserRef.close();
              }
            });
          } else {
            deferred.reject("Could not find InAppBrowser plugin");
          }
        } else {
          deferred.reject("Cannot authenticate via a web browser");
        }
        return deferred.promise;
      },

      /*
       * Sign into the Box service
       *
       * @param    string clientId
       * @param    string clientSecret
       * @param    string appState
       * @return   promise
       */
      box: function (clientId, clientSecret, appState) {
        var deferred = $q.defer();
        if (window.cordova) {
          var cordovaMetadata = cordova.require("cordova/plugin_list").metadata;
          if (cordovaMetadata.hasOwnProperty("org.apache.cordova.inappbrowser") === true) {
            var browserRef = window.open('https://app.box.com/api/oauth2/authorize/?client_id=' + clientId + '&redirect_uri=http://localhost/callback&state=' + appState + '&response_type=code', '_blank', 'location=no,clearsessioncache=yes,clearcache=yes');
            browserRef.addEventListener('loadstart', function (event) {
              if ((event.url).indexOf("http://localhost/callback") === 0) {
                var requestToken = (event.url).split("code=")[1];
                $http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
                $http({
                  method: "post",
                  url: "https://app.box.com/api/oauth2/token",
                  data: "client_id=" + clientId + "&client_secret=" + clientSecret + "&redirect_uri=http://localhost/callback" + "&grant_type=authorization_code" + "&code=" + requestToken
                })
                  .success(function (data) {
                    deferred.resolve(data);
                  })
                  .error(function (data, status) {
                    deferred.reject("Problem authenticating");
                  });
                browserRef.close();
              }
            });
          } else {
            deferred.reject("Could not find InAppBrowser plugin");
          }
        } else {
          deferred.reject("Cannot authenticate via a web browser");
        }
        return deferred.promise;
      },

      /*
       * Sign into the Reddit service
       *
       * @param    string clientId
       * @param    string clientSecret
       * @param    array appScope
       * @return   promise
       */
      reddit: function (clientId, clientSecret, appScope) {
        var deferred = $q.defer();
        if (window.cordova) {
          var cordovaMetadata = cordova.require("cordova/plugin_list").metadata;
          if (cordovaMetadata.hasOwnProperty("org.apache.cordova.inappbrowser") === true) {
            var browserRef = window.open('https://ssl.reddit.com/api/v1/authorize?client_id=' + clientId + '&redirect_uri=http://localhost/callback&duration=permanent&state=ngcordovaoauth&scope=' + appScope.join(",") + '&response_type=code', '_blank', 'location=no,clearsessioncache=yes,clearcache=yes');
            browserRef.addEventListener('loadstart', function (event) {
              if ((event.url).indexOf("http://localhost/callback") === 0) {
                requestToken = (event.url).split("code=")[1];
                $http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
                $http.defaults.headers.post.Authorization = 'Basic ' + btoa(clientId + ":" + clientSecret);
                $http({method: "post", url: "https://ssl.reddit.com/api/v1/access_token", data: "redirect_uri=http://localhost/callback" + "&grant_type=authorization_code" + "&code=" + requestToken})
                  .success(function (data) {
                    deferred.resolve(data);
                  })
                  .error(function (data, status) {
                    deferred.reject("Problem authenticating");
                  });
                browserRef.close();
              }
            });
          } else {
            deferred.reject("Could not find InAppBrowser plugin");
          }
        } else {
          deferred.reject("Cannot authenticate via a web browser");
        }
        return deferred.promise;
      },

      /*
       * Sign into the Twitter service
       * Note that this service requires jsSHA for generating HMAC-SHA1 Oauth 1.0 signatures
       *
       * @param    string clientId
       * @param    string clientSecret
       * @return   promise
       */
      twitter: function (clientId, clientSecret) {
        var deferred = $q.defer();
        if (window.cordova) {
          var cordovaMetadata = cordova.require("cordova/plugin_list").metadata;
          if (cordovaMetadata.hasOwnProperty("org.apache.cordova.inappbrowser") === true) {
            if (typeof jsSHA !== "undefined") {
              var nonceObj = new jsSHA(Math.round((new Date()).getTime() / 1000.0), "TEXT");
              var oauthObject = {
                oauth_consumer_key: clientId,
                oauth_nonce: nonceObj.getHash("SHA-1", "HEX"),
                oauth_signature_method: "HMAC-SHA1",
                oauth_timestamp: Math.round((new Date()).getTime() / 1000.0),
                oauth_version: "1.0"
              };
              var signatureObj = $cordovaOauthUtility.createSignature("POST", "https://api.twitter.com/oauth/request_token", oauthObject, {oauth_callback: "http://localhost/callback"}, clientSecret);
              $http.defaults.headers.post.Authorization = signatureObj.authorization_header;
              $http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
              $http({method: "post", url: "https://api.twitter.com/oauth/request_token", data: "oauth_callback=http://localhost/callback"})
                .success(function (requestTokenResult) {
                  var requestTokenParameters = (requestTokenResult).split("&");
                  var parameterMap = {};
                  for (var i = 0; i < requestTokenParameters.length; i++) {
                    parameterMap[requestTokenParameters[i].split("=")[0]] = requestTokenParameters[i].split("=")[1];
                  }
                  if (parameterMap.hasOwnProperty("oauth_token") === false) {
                    deferred.reject("Oauth request token was not received");
                  }
                  var browserRef = window.open('https://api.twitter.com/oauth/authenticate?oauth_token=' + parameterMap.oauth_token, '_blank', 'location=no,clearsessioncache=yes,clearcache=yes');
                  browserRef.addEventListener('loadstart', function (event) {
                    if ((event.url).indexOf("http://localhost/callback") === 0) {
                      var callbackResponse = (event.url).split("?")[1];
                      var responseParameters = (callbackResponse).split("&");
                      var parameterMap = {};
                      for (var i = 0; i < responseParameters.length; i++) {
                        parameterMap[responseParameters[i].split("=")[0]] = responseParameters[i].split("=")[1];
                      }
                      if (parameterMap.hasOwnProperty("oauth_verifier") === false) {
                        deferred.reject("Browser authentication failed to complete.  No oauth_verifier was returned");
                      }
                      delete oauthObject.oauth_signature;
                      oauthObject.oauth_token = parameterMap.oauth_token;
                      var signatureObj = $cordovaOauthUtility.createSignature("POST", "https://api.twitter.com/oauth/access_token", oauthObject, {oauth_verifier: parameterMap.oauth_verifier}, clientSecret);
                      $http.defaults.headers.post.Authorization = signatureObj.authorization_header;
                      $http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
                      $http({method: "post", url: "https://api.twitter.com/oauth/access_token", data: "oauth_verifier=" + parameterMap.oauth_verifier})
                        .success(function (result) {
                          var accessTokenParameters = result.split("&");
                          var parameterMap = {};
                          for (var i = 0; i < accessTokenParameters.length; i++) {
                            parameterMap[accessTokenParameters[i].split("=")[0]] = accessTokenParameters[i].split("=")[1];
                          }
                          if (parameterMap.hasOwnProperty("oauth_token_secret") === false) {
                            deferred.reject("Oauth access token was not received");
                          }
                          deferred.resolve(parameterMap);
                        })
                        .error(function (error) {
                          deferred.reject(error);
                        });
                      browserRef.close();
                    }
                  });
                })
                .error(function (error) {
                  deferred.reject(error);
                });
            } else {
              deferred.reject("Missing jsSHA JavaScript library");
            }
          } else {
            deferred.reject("Could not find InAppBrowser plugin");
          }
        } else {
          deferred.reject("Cannot authenticate via a web browser");
        }
        return deferred.promise;
      },

      /*
       * Sign into the Meetup service
       *
       * @param    string clientId
       * @return   promise
       */
      meetup: function (clientId) {
        var deferred = $q.defer();
        if (window.cordova) {
          var cordovaMetadata = cordova.require("cordova/plugin_list").metadata;
          if (cordovaMetadata.hasOwnProperty("org.apache.cordova.inappbrowser") === true) {
            var browserRef = window.open('https://secure.meetup.com/oauth2/authorize/?client_id=' + clientId + '&redirect_uri=http://localhost/callback&response_type=token', '_blank', 'location=no,clearsessioncache=yes,clearcache=yes');
            browserRef.addEventListener('loadstart', function (event) {
              if ((event.url).indexOf("http://localhost/callback") === 0) {
                var callbackResponse = (event.url).split("#")[1];
                var responseParameters = (callbackResponse).split("&");
                var parameterMap = {};
                for (var i = 0; i < responseParameters.length; i++) {
                  parameterMap[responseParameters[i].split("=")[0]] = responseParameters[i].split("=")[1];
                }
                if (parameterMap.access_token !== undefined && parameterMap.access_token !== null) {
                  deferred.resolve(parameterMap);
                } else {
                  deferred.reject("Problem authenticating");
                }
                browserRef.close();
              }
            });
          } else {
            deferred.reject("Could not find InAppBrowser plugin");
          }
        } else {
          deferred.reject("Cannot authenticate via a web browser");
        }
        return deferred.promise;
      },

      /*
       * Sign into the Foursquare service
       *
       * @param    string clientId
       * @return   promise
       */
      foursquare: function (clientId) {
        var deferred = $q.defer();
        if (window.cordova) {
          var cordovaMetadata = cordova.require("cordova/plugin_list").metadata;
          if (cordovaMetadata.hasOwnProperty("org.apache.cordova.inappbrowser") === true) {
            var browserRef = window.open('https://foursquare.com/oauth2/authenticate?client_id=' + clientId + '&redirect_uri=http://localhost/callback&response_type=token', '_blank', 'location=no,clearsessioncache=yes,clearcache=yes');
            browserRef.addEventListener('loadstart', function (event) {
              if ((event.url).indexOf("http://localhost/callback") === 0) {
                var callbackResponse = (event.url).split("#")[1];
                var responseParameters = (callbackResponse).split("&");
                var parameterMap = [];
                for (var i = 0; i < responseParameters.length; i++) {
                  parameterMap[responseParameters[i].split("=")[0]] = responseParameters[i].split("=")[1];
                }
                if (parameterMap["access_token"] !== undefined && parameterMap["access_token"] !== null) {
                  var promiseResponse = {
                    access_token: parameterMap["access_token"],
                    expires_in: parameterMap["expires_in"]
                  };
                  deferred.resolve(promiseResponse);
                } else {
                  deferred.reject("Problem authenticating");
                }
                browserRef.close();
              }
            });
          } else {
            deferred.reject("Could not find InAppBrowser plugin");
          }
        } else {
          deferred.reject("Cannot authenticate via a web browser");
        }
        return deferred.promise;
      }

    };
  }]);

angular.module("ngCordova.plugins.oauthUtility", [])

  .factory('$cordovaOauthUtility', ['$q', function ($q) {

    return {

      /*
       * Sign an Oauth 1.0 request
       *
       * @param    string method
       * @param    string endPoint
       * @param    object headerParameters
       * @param    object bodyParameters
       * @param    string secretKey
       * @return   object
       */
      createSignature: function (method, endPoint, headerParameters, bodyParameters, secretKey) {
        if (typeof jsSHA !== "undefined") {
          var headerAndBodyParameters = angular.copy(headerParameters);
          var bodyParameterKeys = Object.keys(bodyParameters);
          for (var i = 0; i < bodyParameterKeys.length; i++) {
            headerAndBodyParameters[bodyParameterKeys[i]] = encodeURIComponent(bodyParameters[bodyParameterKeys[i]]);
          }
          var signatureBaseString = method + "&" + encodeURIComponent(endPoint) + "&";
          var headerAndBodyParameterKeys = (Object.keys(headerAndBodyParameters)).sort();
          for (i = 0; i < headerAndBodyParameterKeys.length; i++) {
            if (i == headerAndBodyParameterKeys.length - 1) {
              signatureBaseString += encodeURIComponent(headerAndBodyParameterKeys[i] + "=" + headerAndBodyParameters[headerAndBodyParameterKeys[i]]);
            } else {
              signatureBaseString += encodeURIComponent(headerAndBodyParameterKeys[i] + "=" + headerAndBodyParameters[headerAndBodyParameterKeys[i]] + "&");
            }
          }
          var oauthSignatureObject = new jsSHA(signatureBaseString, "TEXT");
          headerParameters.oauth_signature = encodeURIComponent(oauthSignatureObject.getHMAC(encodeURIComponent(secretKey) + "&", "TEXT", "SHA-1", "B64"));
          var headerParameterKeys = Object.keys(headerParameters);
          var authorizationHeader = 'OAuth ';
          for (i = 0; i < headerParameterKeys.length; i++) {
            if (i == headerParameterKeys.length - 1) {
              authorizationHeader += headerParameterKeys[i] + '="' + headerParameters[headerParameterKeys[i]] + '"';
            } else {
              authorizationHeader += headerParameterKeys[i] + '="' + headerParameters[headerParameterKeys[i]] + '",';
            }
          }
          return {signature_base_string: signatureBaseString, authorization_header: authorizationHeader, signature: headerParameters.oauth_signature};
        } else {
          return "Missing jsSHA JavaScript library";
        }
      }

    };

  }]);

// install   :      cordova plugin add https://github.com/Paldom/PinDialog.git
// link      :      https://github.com/Paldom/PinDialog

angular.module('ngCordova.plugins.pinDialog', [])

  .factory('$cordovaPinDialog', ['$q', '$window', function ($q, $window) {

    return {
      prompt: function (message, title, buttons) {
        var q = $q.defer();

        $window.plugins.pinDialog.prompt(message, function (res) {
          q.resolve(res);
        }, title, buttons);

        return q.promise;
      }
    };
  }]);

// install   :
// link      :

angular.module('ngCordova.plugins.prefs', [])

  .factory('$cordovaPreferences', ['$window', '$q', function ($window, $q) {

    return {

      set: function (key, value) {
        var q = $q.defer();

        $window.appgiraffe.plugins.applicationPreferences.set(key, value, function (result) {
          q.resolve(result);
        }, function (err) {
          q.reject(err);
        });

        return q.promise;
      },

      get: function (key) {
        var q = $q.defer();

        $window.appgiraffe.plugins.applicationPreferences.get(key, function (value) {
          q.resolve(value);
        }, function (err) {
          q.reject(err);
        });

        return q.promise;
      }
    };
  }]);

// install   : cordova plugin add de.appplant.cordova.plugin.printer
// link      : https://github.com/katzer/cordova-plugin-printer

angular.module('ngCordova.plugins.printer', [])

  .factory('$cordovaPrinter', ['$q', '$window', function ($q, $window) {

    return {
      isAvailable: function () {
        var q = $q.defer();

        $window.plugin.printer.isAvailable(function (isAvailable) {
          q.resolve(isAvailable);
        });

        return q.promise;
      },

      print: function (doc, options) {
        var q = $q.defer();
        $window.plugin.printer.print(doc, options, function () {
          q.resolve();
        });
        return q.promise;
      }
    };
  }]);

// install   :      cordova plugin add org.pbernasconi.progressindicator
// link      :      http://pbernasconi.github.io/cordova-progressIndicator/

angular.module('ngCordova.plugins.progressIndicator', [])

  .factory('$cordovaProgress', ['$q', function ($q) {

    return {
      showSimple: function (_dim) {
        var dim = _dim || false;
        return ProgressIndicator.showSimple(dim);
      },

      showSimpleWithLabel: function (_dim, _label) {
        var dim = _dim || false;
        var label = _label || "Loading...";
        return ProgressIndicator.showSimpleWithLabel(dim, label);
      },

      showSimpleWithLabelDetail: function (_dim, _label, _detail) {
        var dim = _dim || false;
        var label = _label || "Loading...";
        var detail = _detail || "Please wait";
        return ProgressIndicator.showSimpleWithLabelDetail(dim, label, detail);
      },

      showDeterminate: function (_dim, _timeout) {
        var dim = _dim || false;
        var timeout = _timeout || 50000;
        return ProgressIndicator.showDeterminate(dim, timeout);
      },

      showDeterminateWithLabel: function (_dim, _timeout, _label) {
        var dim = _dim || false;
        var timeout = _timeout || 50000;
        var label = _label || "Loading...";

        return ProgressIndicator.showDeterminateWithLabel(dim, timeout, label);
      },

      showAnnular: function (_dim, _timeout) {
        var dim = _dim || false;
        var timeout = _timeout || 50000;
        return ProgressIndicator.showAnnular(dim, timeout);
      },

      showAnnularWithLabel: function (_dim, _timeout, _label) {
        var dim = _dim || false;
        var timeout = _timeout || 50000;
        var label = _label || "Loading...";
        return ProgressIndicator.showAnnularWithLabel(dim, timeout, label);
      },

      showBar: function (_dim, _timeout) {
        var dim = _dim || false;
        var timeout = _timeout || 50000;
        return ProgressIndicator.showBar(dim, timeout);
      },

      showBarWithLabel: function (_dim, _timeout, _label) {
        var dim = _dim || false;
        var timeout = _timeout || 50000;
        var label = _label || "Loading...";
        return ProgressIndicator.showBarWithLabel(dim, timeout, label);
      },

      showSuccess: function (_dim, _label) {
        var dim = _dim || false;
        var label = _label || "Success";
        return ProgressIndicator.showSuccess(dim, label);
      },

      showText: function (_dim, _text, _position) {
        var dim = _dim || false;
        var text = _text || "Warning";
        var position = _position || "center";
        return ProgressIndicator.showText(dim, text, position);
      },

      hide: function () {
        return ProgressIndicator.hide();
      }
    };

  }]);

// install   :      cordova plugin add https://github.com/phonegap-build/PushPlugin.git
// link      :      https://github.com/phonegap-build/PushPlugin

angular.module('ngCordova.plugins.push', [])

  .factory('$cordovaPush', ['$q', '$window', '$rootScope', function ($q, $window, $rootScope) {
    return {
      onNotification: function (notification) {
        $rootScope.$apply(function () {
          $rootScope.$broadcast('pushNotificationReceived', notification);
        });
      },

      register: function (config) {
        var q = $q.defer();

        if (config !== undefined && config.ecb === undefined) {
          config.ecb = "angular.element(document.querySelector('[ng-app]')).injector().get('$cordovaPush').onNotification";
        }

        $window.plugins.pushNotification.register(
          function (token) {
            q.resolve(token);
          },
          function (error) {
            q.reject(error);
          },
          config);

        return q.promise;
      },

      unregister: function (options) {
        var q = $q.defer();
        $window.plugins.pushNotification.unregister(
          function (result) {
            q.resolve(result);
          },
          function (error) {
            q.reject(error);
          },
          options);

        return q.promise;
      },

      // iOS only
      setBadgeNumber: function (number) {
        var q = $q.defer();
        $window.plugins.pushNotification.setApplicationIconBadgeNumber(
          function (result) {
            q.resolve(result);
          },
          function (error) {
            q.reject(error);
          },
          number);
        return q.promise;
      }
    };
  }]);

// install   :      cordova plugin add https://github.com/aharris88/phonegap-sms-plugin.git
// link      :      https://github.com/aharris88/phonegap-sms-plugin

angular.module('ngCordova.plugins.sms', [])

  .factory('$cordovaSms', ['$q', function ($q) {

    return {
      send: function (number, message, intent) {
        var q = $q.defer();
        sms.send(number, message, intent, function (res) {
          q.resolve(res);
        }, function (err) {
          q.reject(err);
        });
        return q.promise;
      }
    };

  }]);

// install   :      cordova plugin add https://github.com/EddyVerbruggen/SocialSharing-PhoneGap-Plugin.git
// link      :      https://github.com/EddyVerbruggen/SocialSharing-PhoneGap-Plugin

// NOTE: shareViaEmail -> if user cancels sharing email, success is still called
// TODO: add support for iPad

angular.module('ngCordova.plugins.socialSharing', [])

  .factory('$cordovaSocialSharing', ['$q', '$window', function ($q, $window) {

    return {
      share: function (message, subject, file, link) {
        var q = $q.defer();
        $window.plugins.socialsharing.share(message, subject, file, link,
          function () {
            q.resolve(true);
          },
          function () {
            q.reject(false);
          });
        return q.promise;
      },

      shareViaTwitter: function (message, file, link) {
        var q = $q.defer();
        $window.plugins.socialsharing.shareViaTwitter(message, file, link,
          function () {
            q.resolve(true);
          },
          function () {
            q.reject(false);
          });
        return q.promise;
      },

      shareViaWhatsApp: function (message, file, link) {
        var q = $q.defer();
        $window.plugins.socialsharing.shareViaWhatsApp(message, file, link,
          function () {
            q.resolve(true);
          },
          function () {
            q.reject(false);
          });
        return q.promise;
      },

      shareViaFacebook: function (message, file, link) {
        var q = $q.defer();
        $window.plugins.socialsharing.shareViaFacebook(message, file, link,
          function () {
            q.resolve(true);
          },
          function () {
            q.reject(false);
          });
        return q.promise;
      },

      shareViaSMS: function (message, commaSeparatedPhoneNumbers) {
        var q = $q.defer();
        $window.plugins.socialsharing.shareViaSMS(message, commaSeparatedPhoneNumbers,
          function () {
            q.resolve(true);
          },
          function () {
            q.reject(false);
          });
        return q.promise;
      },

      shareViaEmail: function (message, subject, toArr, ccArr, bccArr, fileArr) {
        var q = $q.defer();
        $window.plugins.socialsharing.shareViaEmail(message, subject, toArr, ccArr, bccArr, fileArr,
          function () {
            q.resolve(true);
          },
          function () {
            q.reject(false);
          });
        return q.promise;
      },

      canShareViaEmail: function () {
        var q = $q.defer();
        $window.plugins.socialsharing.canShareViaEmail(
          function () {
            q.resolve(true);
          },
          function () {
            q.reject(false);
          });
        return q.promise;
      },

      canShareVia: function (via, message, subject, file, link) {
        var q = $q.defer();
        $window.plugins.socialsharing.canShareVia(via, message, subject, file, link,
          function (success) {
            q.resolve(success);
          },
          function (error) {
            q.reject(error);
          });
        return q.promise;
      },

      shareVia: function (via, message, subject, file, link) {
        var q = $q.defer();
        $window.plugins.socialsharing.shareVia(via, message, subject, file, link,
          function () {
            q.resolve(true);
          },
          function () {
            q.reject(false);
          });
        return q.promise;
      }

    };
  }]);

// install   :       cordova plugin add https://github.com/Paldom/SpinnerDialog.git
// link      :       https://github.com/Paldom/SpinnerDialog

angular.module('ngCordova.plugins.spinnerDialog', [])

  .factory('$cordovaSpinnerDialog', ['$window', function ($window) {

    return {
      show: function (title, message, fixed) {
        fixed = fixed || false;
        return $window.plugins.spinnerDialog.show(title, message, fixed);
      },
      hide: function () {
        return $window.plugins.spinnerDialog.hide();
      }
    };

  }]);

// install   :      cordova plugin add org.apache.cordova.splashscreen
// link      :      https://github.com/apache/cordova-plugin-splashscreen/blob/master/doc/index.md

angular.module('ngCordova.plugins.splashscreen', [])

  .factory('$cordovaSplashscreen', [function () {

    return {
      hide: function () {
        return navigator.splashscreen.hide();
      },

      show: function () {
        return navigator.splashscreen.show();
      }
    };

  }]);

// install   :      cordova plugin add https://github.com/brodysoft/Cordova-SQLitePlugin.git
// link      :      https://github.com/brodysoft/Cordova-SQLitePlugin/blob/master/README.md

angular.module('ngCordova.plugins.sqlite', [])

  .factory('$cordovaSQLite', ['$q', '$window', function ($q, $window) {

    return {
      openDB: function (dbName, background) {

        if (typeof background === 'undefined') {
          background = 0;
        }

        return $window.sqlitePlugin.openDatabase({
          name: dbName,
          bgType: background
        });
      },

      execute: function (db, query, binding) {
        var q = $q.defer();
        db.transaction(function (tx) {
          tx.executeSql(query, binding, function (tx, result) {
              q.resolve(result);
            },
            function (transaction, error) {
              q.reject(error);
            });
        });
        return q.promise;
      },

      insertCollection: function (db, query, bindings) {
        var q = $q.defer();
        var coll = bindings.slice(0); // clone collection

        db.transaction(function (tx) {
          (function insertOne() {
            var record = coll.splice(0, 1)[0]; // get the first record of coll and reduce coll by one
            try {
              tx.executeSql(query, record, function (tx, result) {
                if (coll.length === 0) {
                  q.resolve(result);
                } else {
                  insertOne();
                }
              }, function (transaction, error) {
                q.reject(error);
                return;
              });
            } catch (exception) {
              q.reject(exception);
            }
          })();
        });
        return q.promise;
      },

      nestedExecute: function (db, query1, query2, binding1, binding2) {
        var q = $q.defer();

        db.transaction(function (tx) {
            tx.executeSql(query1, binding1, function (tx, result) {
              q.resolve(result);
              tx.executeSql(query2, binding2, function (tx, res) {
                q.resolve(res);
              });
            });
          },
          function (transaction, error) {
            q.reject(error);
          });

        return q.promise;
      },

      deleteDB: function (dbName) {
        var q = $q.defer();

        $window.sqlitePlugin.deleteDatabase(dbName, function (success) {
          q.resolve(success);
        }, function (error) {
          q.reject(error);
        });

        return q.promise;
      }
    };
  }]);

// install   :      cordova plugin add org.apache.cordova.statusbar
// link      :      https://github.com/apache/cordova-plugin-statusbar/blob/master/doc/index.md

angular.module('ngCordova.plugins.statusbar', [])

  .factory('$cordovaStatusbar', [function () {

    return {
      overlaysWebView: function (bool) {
        return StatusBar.overlaysWebView(!!bool);
      },

      style: function (style) {
        switch (style) {
          // Default
          case 0:
            return StatusBar.styleDefault();

          // LightContent
          case 1:
            return StatusBar.styleLightContent();

          // BlackTranslucent
          case 2:
            return StatusBar.styleBlackTranslucent();

          // BlackOpaque
          case 3:
            return StatusBar.styleBlackOpaque();

          default:
            return StatusBar.styleDefault();
        }
      },

      // supported names:
      // black, darkGray, lightGray, white, gray, red, green,
      // blue, cyan, yellow, magenta, orange, purple, brown
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
        return StatusBar.show();
      },

      isVisible: function () {
        return StatusBar.isVisible;
      }
    };
  }]);

// install   :      cordova plugin add https://github.com/EddyVerbruggen/Toast-PhoneGap-Plugin.git
// link      :      https://github.com/EddyVerbruggen/Toast-PhoneGap-Plugin

angular.module('ngCordova.plugins.toast', [])

  .factory('$cordovaToast', ['$q', '$window', function ($q, $window) {

    return {
      showShortTop: function (message) {
        var q = $q.defer();
        $window.plugins.toast.showShortTop(message, function (response) {
          q.resolve(response);
        }, function (error) {
          q.reject(error);
        });
        return q.promise;
      },

      showShortCenter: function (message) {
        var q = $q.defer();
        $window.plugins.toast.showShortCenter(message, function (response) {
          q.resolve(response);
        }, function (error) {
          q.reject(error);
        });
        return q.promise;
      },

      showShortBottom: function (message) {
        var q = $q.defer();
        $window.plugins.toast.showShortBottom(message, function (response) {
          q.resolve(response);
        }, function (error) {
          q.reject(error);
        });
        return q.promise;
      },

      showLongTop: function (message) {
        var q = $q.defer();
        $window.plugins.toast.showLongTop(message, function (response) {
          q.resolve(response);
        }, function (error) {
          q.reject(error);
        });
        return q.promise;
      },

      showLongCenter: function (message) {
        var q = $q.defer();
        $window.plugins.toast.showLongCenter(message, function (response) {
          q.resolve(response);
        }, function (error) {
          q.reject(error);
        });
        return q.promise;
      },

      showLongBottom: function (message) {
        var q = $q.defer();
        $window.plugins.toast.showLongBottom(message, function (response) {
          q.resolve(response);
        }, function (error) {
          q.reject(error);
        });
        return q.promise;
      },


      show: function (message, duration, position) {
        var q = $q.defer();
        $window.plugins.toast.show(message, duration, position, function (response) {
          q.resolve(response);
        }, function (error) {
          q.reject(error);
        });
        return q.promise;
      }
    };

  }]);

// install   :      cordova plugin add https://github.com/leecrossley/cordova-plugin-touchid.git
// link      :      https://github.com/leecrossley/cordova-plugin-touchid

angular.module('ngCordova.plugins.touchid', [])

  .factory('$cordovaTouchID', ['$q', function ($q) {

    return {
      checkSupport: function () {
        var defer = $q.defer();
        if (!window.cordova) {
          defer.reject("Not supported without cordova.js");
        } else {
          touchid.checkSupport(function (value) {
            defer.resolve(value);
          }, function (err) {
            defer.reject(err);
          });
        }

        return defer.promise;
      },

      authenticate: function (auth_reason_text) {
        var defer = $q.defer();
        if (!window.cordova) {
          defer.reject("Not supported without cordova.js");
        } else {
          touchid.authenticate(function (value) {
            defer.resolve(value);
          }, function (err) {
            defer.reject(err);
          }, auth_reason_text);
        }

        return defer.promise;
      }
    };
  }]);

// install   :      cordova plugin add org.apache.cordova.vibration
// link      :      https://github.com/apache/cordova-plugin-vibration/blob/master/doc/index.md

angular.module('ngCordova.plugins.vibration', [])

  .factory('$cordovaVibration', [function () {

    return {
      vibrate: function (times) {
        return navigator.notification.vibrate(times);
      },
      vibrateWithPattern: function (pattern, repeat) {
        return navigator.notification.vibrateWithPattern(pattern, repeat);
      },
      cancelVibration: function () {
        return navigator.notification.cancelVibration();
      }
    };
  }]);

// install   :    cordova plugin add https://github.com/EddyVerbruggen/VideoCapturePlus-PhoneGap-Plugin.git
// link      :    https://github.com/EddyVerbruggen/VideoCapturePlus-PhoneGap-Plugin

angular.module('ngCordova.plugins.videoCapturePlus', [])

  .provider('$cordovaVideoCapturePlus', [function () {

    var defaultOptions = {};


    /**
     * the nr of videos to record, default 1 (on iOS always 1)
     *
     * @param limit
     */
    this.setLimit = function setLimit(limit) {
      defaultOptions.limit = limit;
    };


    /**
     * max duration in seconds, default 0, which is 'forever'
     *
     * @param seconds
     */
    this.setMaxDuration = function setMaxDuration(seconds) {
      defaultOptions.duration = seconds;
    };


    /**
     * set to true to override the default low quality setting
     *
     * @param {Boolean} highquality
     */
    this.setHighQuality = function setHighQuality(highquality) {
      defaultOptions.highquality = highquality;
    };

    /**
     * you'll want to sniff the user-Agent/device and pass the best overlay based on that..
     * set to true to override the default backfacing camera setting. iOS: works fine, Android: YMMV (#18)
     *
     * @param {Boolean} frontcamera
     */
    this.useFrontCamera = function useFrontCamera(frontcamera) {
      defaultOptions.frontcamera = frontcamera;
    };


    /**
     * put the png in your www folder
     *
     * @param {String} imageUrl
     */
    this.setPortraitOverlay = function setPortraitOverlay(imageUrl) {
      defaultOptions.portraitOverlay = imageUrl;
    };


    /**
     *
     * @param {String} imageUrl
     */
    this.setLandscapeOverlay = function setLandscapeOverlay(imageUrl) {
      defaultOptions.landscapeOverlay = imageUrl;
    };


    /**
     * iOS only
     *
     * @param text
     */
    this.setOverlayText = function setOverlayText(text) {
      defaultOptions.overlayText = text;
    };


    this.$get = ['$q', '$window', function ($q, $window) {
      return {
        captureVideo: function (options) {
          var q = $q.defer();

          if (!$window.plugins.videocaptureplus) {
            q.resolve(null);
            return q.promise;
          }

          $window.plugins.videocaptureplus.captureVideo(q.resolve, q.reject,
            angular.extend({}, defaultOptions, options));

          return q.promise;
        }
      };
    }];
  }]);

// install  :     cordova plugin add https://github.com/MobileChromeApps/zip.git
// link     :     https://github.com/MobileChromeApps/zip

angular.module('ngCordova.plugins.zip', [])

  .factory('$cordovaZip', ['$q', '$window', function ($q, $window) {

    return {
      unzip: function (source, destination) {
        var q = $q.defer();

        $window.zip.unzip(source, destination, function (isError) {
          if (isError === 0) {
            q.resolve();
          } else {
            q.reject();
          }
        }, function (progressEvent) {
          q.notify(progressEvent);
        });

        return q.promise;
      }
    };
  }]);

})();