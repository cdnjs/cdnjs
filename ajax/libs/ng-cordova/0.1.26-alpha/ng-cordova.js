/*!
 * ngCordova
 * v0.1.26-alpha
 * Copyright 2015 Drifty Co. http://drifty.com/
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

/* globals appAvailability: true */
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

/* globals AppRate: true */
angular.module('ngCordova.plugins.appRate', [])

  .provider('$cordovaAppRate', [function () {

    /**
      * Set defaults settings to AppRate
      *
      * @param {Object} defaults - AppRate default settings
      * @param {string} defaults.language
      * @param {string} defaults.appName
      * @param {boolean} defaults.promptForNewVersion
      * @param {boolean} defaults.openStoreInApp
      * @param {number} defaults.usesUntilPrompt
      * @param {boolean} defaults.useCustomRateDialog
      * @param {string} defaults.iosURL
      * @param {string} defaults.androidURL
      * @param {string} defaults.blackberryURL
      * @param {string} defaults.windowsURL
      */
    this.setPreferences = function (defaults) {
      if (!defaults || !angular.isObject(defaults)) {
        return;
      }

      AppRate.preferences.useLanguage = defaults.language || null;
      AppRate.preferences.displayAppName = defaults.appName || '';
      AppRate.preferences.promptAgainForEachNewVersion = defaults.promptForNewVersion || true;
      AppRate.preferences.openStoreInApp = defaults.openStoreInApp || false;
      AppRate.preferences.usesUntilPrompt = defaults.usesUntilPrompt || 3;
      AppRate.preferences.useCustomRateDialog = defaults.useCustomRateDialog || false;
      AppRate.preferences.storeAppURL.ios = defaults.iosURL || null;
      AppRate.preferences.storeAppURL.android = defaults.androidURL || null;
      AppRate.preferences.storeAppURL.blackberry = defaults.blackberryURL || null;
      AppRate.preferences.storeAppURL.windows8 = defaults.windowsURL || null;
    };

    /**
      * Set custom locale
      *
      * @param {Object} customObj
      * @param {string} customObj.title
      * @param {string} customObj.cancelButtonLabel
      * @param {string} customObj.laterButtonLabel
      * @param {string} customObj.rateButtonLabel
      */
    this.setCustomLocale = function (customObj) {
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

        navigateToAppStore: function () {
          var q = $q.defer();
          var navigate = AppRate.navigateToAppStore();
          q.resolve(navigate);

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
      getAppName: function () {
        var q = $q.defer();
        cordova.getAppVersion.getAppName(function (name) {
          q.resolve(name);
        });

        return q.promise;
      },

      getPackageName: function () {
        var q = $q.defer();
        cordova.getAppVersion.getPackageName(function (pack) {
          q.resolve(pack);
        });

        return q.promise;
      },

      getVersionNumber: function () {
        var q = $q.defer();
        cordova.getAppVersion.getVersionNumber(function (version) {
          q.resolve(version);
        });

        return q.promise;
      },

      getVersionCode: function () {
        var q = $q.defer();
        cordova.getAppVersion.getVersionCode(function (code) {
          q.resolve(code);
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

// install  :     cordova plugin add https://github.com/katzer/cordova-plugin-badge.git
// link     :     https://github.com/katzer/cordova-plugin-badge

angular.module('ngCordova.plugins.badge', [])

  .factory('$cordovaBadge', ['$q', function ($q) {

    return {
      hasPermission: function () {
        var q = $q.defer();
        cordova.plugins.notification.badge.hasPermission(function (permission) {
          if (permission) {
            q.resolve(true);
          } else {
            q.reject('You do not have permission');
          }
        });

        return q.promise;
      },

      promptForPermission: function () {
        return cordova.plugins.notification.badge.promptForPermission();
      },

      set: function (badge, callback, scope) {
        var q = $q.defer();

        cordova.plugins.notification.badge.hasPermission(function (permission) {
          if (permission) {
            q.resolve(
              cordova.plugins.notification.badge.set(badge, callback, scope)
            );
          } else {
            q.reject('You do not have permission to set Badge');
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
            q.reject('You do not have permission to get Badge');
          }
        });

        return q.promise;
      },

      clear: function (callback, scope) {
        var q = $q.defer();

        cordova.plugins.notification.badge.hasPermission(function (permission) {
          if (permission) {
            q.resolve(cordova.plugins.notification.badge.clear(callback, scope));
          } else {
            q.reject('You do not have permission to clear Badge');
          }
        });
        return q.promise;
      },

      increase: function (count, callback, scope) {
        var q = $q.defer();

        this.hasPermission().then(function (){
          q.resolve(
            cordova.plugins.notification.badge.increase(count, callback, scope)
          );
        }, function (){
          q.reject('You do not have permission to increase Badge');
        }) ;

        return q.promise;
      },

      decrease: function (count, callback, scope) {
        var q = $q.defer();

        this.hasPermission().then(function (){
          q.resolve(
            cordova.plugins.notification.badge.decrease(count, callback, scope)
          );
        }, function (){
          q.reject('You do not have permission to decrease Badge');
        }) ;

        return q.promise;
      },

      configure: function (config) {
        return cordova.plugins.notification.badge.configure(config);
      }
    };
  }]);

// install  :    cordova plugin add https://github.com/phonegap/phonegap-plugin-barcodescanner.git
// link     :    https://github.com/phonegap/phonegap-plugin-barcodescanner

angular.module('ngCordova.plugins.barcodeScanner', [])

  .factory('$cordovaBarcodeScanner', ['$q', function ($q) {

    return {
      scan: function (config) {
        var q = $q.defer();

        cordova.plugins.barcodeScanner.scan(function (result) {
          q.resolve(result);
        }, function (err) {
          q.reject(err);
        }, config);

        return q.promise;
      },

      encode: function (type, data) {
        var q = $q.defer();
        type = type || 'TEXT_TYPE';

        cordova.plugins.barcodeScanner.encode(type, data, function (result) {
          q.resolve(result);
        }, function (err) {
          q.reject(err);
        });

        return q.promise;
      }
    };
  }]);

//  install   :   cordova plugin add cordova-plugin-battery-status
//  link      :   https://github.com/apache/cordova-plugin-battery-status

angular.module('ngCordova.plugins.batteryStatus', [])

  .factory('$cordovaBatteryStatus', ['$rootScope', '$window', '$timeout', function ($rootScope, $window, $timeout) {

    /**
      * @param {string} status
      */
    var batteryStatus = function (status) {
      $timeout(function () {
        $rootScope.$broadcast('$cordovaBatteryStatus:status', status);
      });
    };

    /**
      * @param {string} status
      */
    var batteryCritical = function (status) {
      $timeout(function () {
        $rootScope.$broadcast('$cordovaBatteryStatus:critical', status);
      });
    };

    /**
      * @param {string} status
      */
    var batteryLow = function (status) {
      $timeout(function () {
        $rootScope.$broadcast('$cordovaBatteryStatus:low', status);
      });
    };

    document.addEventListener('deviceready', function () {
      if (navigator.battery) {
        $window.addEventListener('batterystatus', batteryStatus, false);
        $window.addEventListener('batterycritical', batteryCritical, false);
        $window.addEventListener('batterylow', batteryLow, false);

      }
    }, false);
    return true;
  }])
  .run(['$injector', function ($injector) {
    $injector.get('$cordovaBatteryStatus'); //ensure the factory and subsequent event listeners get initialised
  }]);

// install   :  cordova plugin add https://github.com/petermetz/cordova-plugin-ibeacon.git
// link      :  https://github.com/petermetz/cordova-plugin-ibeacon

angular.module('ngCordova.plugins.beacon', [])

  .factory('$cordovaBeacon', ['$window', '$rootScope', '$timeout', '$q', function ($window, $rootScope, $timeout, $q) {
    var callbackDidDetermineStateForRegion = null;
    var callbackDidStartMonitoringForRegion = null;
    var callbackDidExitRegion = null;
    var callbackDidEnterRegion = null;
    var callbackDidRangeBeaconsInRegion = null;
    var callbackPeripheralManagerDidStartAdvertising = null;
    var callbackPeripheralManagerDidUpdateState = null;
    var callbackDidChangeAuthorizationStatus = null;

    document.addEventListener('deviceready', function () {
      if ($window.cordova &&
          $window.cordova.plugins &&
          $window.cordova.plugins.locationManager) {
        var delegate = new $window.cordova.plugins.locationManager.Delegate();

        delegate.didDetermineStateForRegion = function (pluginResult) {
          $timeout(function () {
            $rootScope.$broadcast('$cordovaBeacon:didDetermineStateForRegion', pluginResult);
          });

          if (callbackDidDetermineStateForRegion) {
            callbackDidDetermineStateForRegion(pluginResult);
          }
        };

        delegate.didStartMonitoringForRegion = function (pluginResult) {
          $timeout(function () {
            $rootScope.$broadcast('$cordovaBeacon:didStartMonitoringForRegion', pluginResult);
          });

          if (callbackDidStartMonitoringForRegion) {
            callbackDidStartMonitoringForRegion(pluginResult);
          }
        };

        delegate.didExitRegion = function (pluginResult) {
          $timeout(function () {
            $rootScope.$broadcast('$cordovaBeacon:didExitRegion', pluginResult);
          });

          if (callbackDidExitRegion) {
            callbackDidExitRegion(pluginResult);
          }
        };

        delegate.didEnterRegion = function (pluginResult) {
          $timeout(function () {
            $rootScope.$broadcast('$cordovaBeacon:didEnterRegion', pluginResult);
          });

          if (callbackDidEnterRegion) {
            callbackDidEnterRegion(pluginResult);
          }
        };

        delegate.didRangeBeaconsInRegion = function (pluginResult) {
          $timeout(function () {
            $rootScope.$broadcast('$cordovaBeacon:didRangeBeaconsInRegion', pluginResult);
          });

          if (callbackDidRangeBeaconsInRegion) {
            callbackDidRangeBeaconsInRegion(pluginResult);
          }
        };

        delegate.peripheralManagerDidStartAdvertising = function (pluginResult) {
          $timeout(function () {
            $rootScope.$broadcast('$cordovaBeacon:peripheralManagerDidStartAdvertising', pluginResult);
          });

          if (callbackPeripheralManagerDidStartAdvertising) {
            callbackPeripheralManagerDidStartAdvertising(pluginResult);
          }
        };

        delegate.peripheralManagerDidUpdateState = function (pluginResult) {
          $timeout(function () {
            $rootScope.$broadcast('$cordovaBeacon:peripheralManagerDidUpdateState', pluginResult);
          });

          if (callbackPeripheralManagerDidUpdateState) {
            callbackPeripheralManagerDidUpdateState(pluginResult);
          }
        };

        delegate.didChangeAuthorizationStatus = function (status) {
          $timeout(function () {
            $rootScope.$broadcast('$cordovaBeacon:didChangeAuthorizationStatus', status);
          });

          if (callbackDidChangeAuthorizationStatus) {
            callbackDidChangeAuthorizationStatus(status);
          }
        };

        $window.cordova.plugins.locationManager.setDelegate(delegate);
      }
    }, false);

    return {
      setCallbackDidDetermineStateForRegion: function (callback) {
        callbackDidDetermineStateForRegion = callback;
      },
      setCallbackDidStartMonitoringForRegion: function (callback) {
        callbackDidStartMonitoringForRegion = callback;
      },
      setCallbackDidExitRegion: function (callback) {
        callbackDidExitRegion = callback;
      },
      setCallbackDidEnterRegion: function (callback) {
        callbackDidEnterRegion = callback;
      },
      setCallbackDidRangeBeaconsInRegion: function (callback) {
        callbackDidRangeBeaconsInRegion = callback;
      },
      setCallbackPeripheralManagerDidStartAdvertising: function (callback) {
        callbackPeripheralManagerDidStartAdvertising = callback;
      },
      setCallbackPeripheralManagerDidUpdateState: function (callback) {
        callbackPeripheralManagerDidUpdateState = callback;
      },
      setCallbackDidChangeAuthorizationStatus: function (callback) {
        callbackDidChangeAuthorizationStatus = callback;
      },
      createBeaconRegion: function (identifier, uuid, major, minor, notifyEntryStateOnDisplay) {
        major = major || undefined;
        minor = minor || undefined;

        return new $window.cordova.plugins.locationManager.BeaconRegion(
          identifier,
          uuid,
          major,
          minor,
          notifyEntryStateOnDisplay
        );
      },
      isBluetoothEnabled: function () {
        return $q.when($window.cordova.plugins.locationManager.isBluetoothEnabled());
      },
      enableBluetooth: function () {
        return $q.when($window.cordova.plugins.locationManager.enableBluetooth());
      },
      disableBluetooth: function () {
        return $q.when($window.cordova.plugins.locationManager.disableBluetooth());
      },
      startMonitoringForRegion: function (region) {
        return $q.when($window.cordova.plugins.locationManager.startMonitoringForRegion(region));
      },
      stopMonitoringForRegion: function (region) {
        return $q.when($window.cordova.plugins.locationManager.stopMonitoringForRegion(region));
      },
      requestStateForRegion: function (region) {
        return $q.when($window.cordova.plugins.locationManager.requestStateForRegion(region));
      },
      startRangingBeaconsInRegion: function (region) {
        return $q.when($window.cordova.plugins.locationManager.startRangingBeaconsInRegion(region));
      },
      stopRangingBeaconsInRegion: function (region) {
        return $q.when($window.cordova.plugins.locationManager.stopRangingBeaconsInRegion(region));
      },
      getAuthorizationStatus: function () {
        return $q.when($window.cordova.plugins.locationManager.getAuthorizationStatus());
      },
      requestWhenInUseAuthorization: function () {
        return $q.when($window.cordova.plugins.locationManager.requestWhenInUseAuthorization());
      },
      requestAlwaysAuthorization: function () {
        return $q.when($window.cordova.plugins.locationManager.requestAlwaysAuthorization());
      },
      getMonitoredRegions: function () {
        return $q.when($window.cordova.plugins.locationManager.getMonitoredRegions());
      },
      getRangedRegions: function () {
        return $q.when($window.cordova.plugins.locationManager.getRangedRegions());
      },
      isRangingAvailable: function () {
        return $q.when($window.cordova.plugins.locationManager.isRangingAvailable());
      },
      isMonitoringAvailableForClass: function (region) {
        return $q.when($window.cordova.plugins.locationManager.isMonitoringAvailableForClass(region));
      },
      startAdvertising: function (region, measuredPower) {
        return $q.when($window.cordova.plugins.locationManager.startAdvertising(region, measuredPower));
      },
      stopAdvertising: function () {
        return $q.when($window.cordova.plugins.locationManager.stopAdvertising());
      },
      isAdvertisingAvailable: function () {
        return $q.when($window.cordova.plugins.locationManager.isAdvertisingAvailable());
      },
      isAdvertising: function () {
        return $q.when($window.cordova.plugins.locationManager.isAdvertising());
      },
      disableDebugLogs: function () {
        return $q.when($window.cordova.plugins.locationManager.disableDebugLogs());
      },
      enableDebugNotifications: function () {
        return $q.when($window.cordova.plugins.locationManager.enableDebugNotifications());
      },
      disableDebugNotifications: function () {
        return $q.when($window.cordova.plugins.locationManager.disableDebugNotifications());
      },
      enableDebugLogs: function () {
        return $q.when($window.cordova.plugins.locationManager.enableDebugLogs());
      },
      appendToDeviceLog: function (message) {
        return $q.when($window.cordova.plugins.locationManager.appendToDeviceLog(message));
      }
    };
  }]);

//  install   :   cordova plugin add https://github.com/don/cordova-plugin-ble-central.git
//  link      :   https://github.com/don/cordova-plugin-ble-central

/* globals ble: true */
angular.module('ngCordova.plugins.ble', [])

  .factory('$cordovaBLE', ['$q', '$timeout', '$log', function ($q, $timeout, $log) {

    return {
      scan: function (services, seconds) {
        var q = $q.defer();

        ble.startScan(services, function (result) {
          q.notify(result);
        }, function (error) {
          q.reject(error);
        });

        $timeout(function () {
            ble.stopScan(function () {
              q.resolve();
            }, function (error) {
              q.reject(error);
            });
        }, seconds*1000);

        return q.promise;
      },

      startScan: function (services, callback, errorCallback) {
        return ble.startScan(services, callback, errorCallback);
      },

      stopScan: function () {
        var q = $q.defer();
        ble.stopScan(function () {
          q.resolve();
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

      writeWithoutResponse: function (deviceID, serviceUUID, characteristicUUID, data) {
        var q = $q.defer();
        ble.writeWithoutResponse(deviceID, serviceUUID, characteristicUUID, data, function (result) {
          q.resolve(result);
        }, function (error) {
          q.reject(error);
        });
        return q.promise;
      },

      writeCommand: function (deviceID, serviceUUID, characteristicUUID, data) {
        $log.warning('writeCommand is deprecated, use writeWithoutResponse');
        return this.writeWithoutResponse(deviceID, serviceUUID, characteristicUUID, data);
      },

      startNotification: function (deviceID, serviceUUID, characteristicUUID, callback, errorCallback) {
        return ble.startNotification(deviceID, serviceUUID, characteristicUUID, callback, errorCallback);
      },

      stopNotification: function (deviceID, serviceUUID, characteristicUUID) {
        var q = $q.defer();
        ble.stopNotification(deviceID, serviceUUID, characteristicUUID, function (result) {
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

      enable: function () {
        var q = $q.defer();
        ble.enable(function (result) {
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

// install   :     cordova plugin add https://github.com/don/BluetoothSerial.git
// link      :     https://github.com/don/BluetoothSerial

angular.module('ngCordova.plugins.bluetoothSerial', [])

  .factory('$cordovaBluetoothSerial', ['$q', '$window', function ($q, $window) {

    return {
      connect: function (address) {
        var q = $q.defer();
        var disconnectionPromise = $q.defer();
        var isConnected = false;
        $window.bluetoothSerial.connect(address, function () {
          isConnected = true;
          q.resolve(disconnectionPromise);
        }, function (error) {
          if(isConnected === false) {
            disconnectionPromise.reject(error);
          }
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

      discoverUnpaired: function () {
        var q = $q.defer();
        $window.bluetoothSerial.discoverUnpaired(function (data) {
          q.resolve(data);
        }, function (error) {
          q.reject(error);
        });
        return q.promise;
      },

      setDeviceDiscoveredListener: function () {
        var q = $q.defer();
        $window.bluetoothSerial.setDeviceDiscoveredListener(function (data) {
          q.notify(data);
        });
        return q.promise;
      },

      clearDeviceDiscoveredListener: function () {
        $window.bluetoothSerial.clearDeviceDiscoveredListener();
      },

      showBluetoothSettings: function () {
        var q = $q.defer();
        $window.bluetoothSerial.showBluetoothSettings(function () {
          q.resolve();
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

      enable: function () {
        var q = $q.defer();
        $window.bluetoothSerial.enable(function () {
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

        if (!$window.cordova) {
          q.reject('Not supported without cordova.js');
        } else {
          $window.cordova.plugins.brightness.getBrightness(function (result) {
            q.resolve(result);
          }, function (err) {
            q.reject(err);
          });
        }

        return q.promise;
      },

      set: function (data) {
        var q = $q.defer();

        if (!$window.cordova) {
          q.reject('Not supported without cordova.js');
        } else {
          $window.cordova.plugins.brightness.setBrightness(data, function (result) {
            q.resolve(result);
          }, function (err) {
            q.reject(err);
          });
        }

        return q.promise;
      },

      setKeepScreenOn: function (bool) {
        var q = $q.defer();

        if (!$window.cordova) {
          q.reject('Not supported without cordova.js');
        } else {
          $window.cordova.plugins.brightness.setKeepScreenOn(bool, function (result) {
            q.resolve(result);
          }, function (err) {
            q.reject(err);
          });
        }

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

// install   :   cordova plugin add cordova-plugin-camera
// link      :   https://github.com/apache/cordova-plugin-camera

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

// install   :    cordova plugin add cordova-plugin-media-capture
// link      :    https://github.com/apache/cordova-plugin-media-capture

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

// install : cordova plugin add https://github.com/vkeepe/card.io.git
// link    : https://github.com/vkeepe/card.io.git

/* globals CardIO: true */
angular.module('ngCordova.plugins.cardIO', [])

  .provider(
  '$cordovaNgCardIO', [function () {

    /**
     * Default array of response data from cardIO scan card
     */
    var defaultRespFields = [
      'card_type',
      'redacted_card_number',
      'card_number',
      'expiry_month',
      'expiry_year',
      'short_expiry_year',
      'cvv',
      'zip'
    ];

    /**
     * Default config for cardIO scan function
     */
    var defaultScanConfig = {
      'expiry': true,
      'cvv': true,
      'zip': false,
      'suppressManual': false,
      'suppressConfirm': false,
      'hideLogo': true
    };

    /**
     * Configuring defaultRespFields using $cordovaNgCardIOProvider
     *
     */
    this.setCardIOResponseFields = function (fields) {
      if (!fields || !angular.isArray(fields)) {
        return;
      }
      defaultRespFields = fields;
    };

    /**
     *
     * Configuring defaultScanConfig using $cordovaNgCardIOProvider
     */
    this.setScanerConfig = function (config) {
      if (!config || !angular.isObject(config)) {
        return;
      }

      defaultScanConfig.expiry = config.expiry || true;
      defaultScanConfig.cvv = config.cvv || true;
      defaultScanConfig.zip = config.zip || false;
      defaultScanConfig.suppressManual = config.suppressManual || false;
      defaultScanConfig.suppressConfirm = config.suppressConfirm || false;
      defaultScanConfig.hideLogo = config.hideLogo || true;
    };

    /**
     * Function scanCard for $cordovaNgCardIO service to make scan of card
     *
     */
    this.$get = ['$q', function ($q) {
      return {
        scanCard: function () {

          var deferred = $q.defer();
          CardIO.scan(
            defaultScanConfig,
            function (response) {

              if (response === null) {
                deferred.reject(null);
              } else {

                var respData = {};
                for (
                  var i = 0, len = defaultRespFields.length; i < len; i++) {
                  var field = defaultRespFields[i];

                  if (field === 'short_expiry_year') {
                    respData[field] = String(response.expiry_year).substr( // jshint ignore:line
                      2, 2
                    ) || '';
                  } else {
                    respData[field] = response[field] || '';
                  }
                }
                deferred.resolve(respData);
              }
            },
            function () {
              deferred.reject(null);
            }
          );
          return deferred.promise;
        }
      };
    }];
  }]
);

// install   :     cordova plugin add https://github.com/VersoSolutions/CordovaClipboard.git
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

// install   :     cordova plugin add cordova-plugin-contacts
// link      :     https://github.com/apache/cordova-plugin-contacts

angular.module('ngCordova.plugins.contacts', [])

  .factory('$cordovaContacts', ['$q', function ($q) {

    return {
      save: function (contact) {
        var q = $q.defer();
        var deviceContact = navigator.contacts.create(contact);

        deviceContact.save(function (result) {
          q.resolve(result);
        }, function (err) {
          q.reject(err);
        });
        return q.promise;
      },

      remove: function (contact) {
        var q = $q.defer();
        var deviceContact = navigator.contacts.create(contact);

        deviceContact.remove(function (result) {
          q.resolve(result);
        }, function (err) {
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
        if (Object.keys(options).length === 0) {
          navigator.contacts.find(fields, function (results) {
            q.resolve(results);
          },function (err) {
            q.reject(err);
          });
        }
        else {
          navigator.contacts.find(fields, function (results) {
            q.resolve(results);
          }, function (err) {
            q.reject(err);
          }, options);
        }
        return q.promise;
      },

      pickContact: function () {
        var q = $q.defer();

        navigator.contacts.pickContact(function (contact) {
          q.resolve(contact);
        }, function (err) {
          q.reject(err);
        });

        return q.promise;
      }

      // TODO: method to set / get ContactAddress
      // TODO: method to set / get ContactError
      // TODO: method to set / get ContactField
      // TODO: method to set / get ContactName
      // TODO: method to set / get ContactOrganization
    };
  }]);

// install   :      cordova plugin add https://github.com/VitaliiBlagodir/cordova-plugin-datepicker.git
// link      :      https://github.com/VitaliiBlagodir/cordova-plugin-datepicker

angular.module('ngCordova.plugins.datePicker', [])

  .factory('$cordovaDatePicker', ['$window', '$q', function ($window, $q) {
    
    return {
      show: function (options) {
        var q = $q.defer();
        options = options || {date: new Date(), mode: 'date'};
        $window.datePicker.show(options, function (date) {
          q.resolve(date);
        }, function (error){
          q.reject(error);
        });
        return q.promise;
      }
    };
  }]);
// install   :     cordova plugin add cordova-plugin-device
// link      :     https://github.com/apache/cordova-plugin-device

/* globals device: true */
angular.module('ngCordova.plugins.device', [])

  .factory('$cordovaDevice', [function () {

    return {
      /**
       * Returns the whole device object.
       * @see https://github.com/apache/cordova-plugin-device
       * @returns {Object} The device object.
       */
      getDevice: function () {
        return device;
      },

      /**
       * Returns the Cordova version.
       * @see https://github.com/apache/cordova-plugin-device#devicecordova
       * @returns {String} The Cordova version.
       */
      getCordova: function () {
        return device.cordova;
      },

      /**
       * Returns the name of the device's model or product.
       * @see https://github.com/apache/cordova-plugin-device#devicemodel
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
       * @see https://github.com/apache/cordova-plugin-device#deviceplatform
       * @returns {String} The device's operating system name.
       */
      getPlatform: function () {
        return device.platform;
      },

      /**
       * Returns the device's Universally Unique Identifier.
       * @see https://github.com/apache/cordova-plugin-device#deviceuuid
       * @returns {String} The device's Universally Unique Identifier
       */
      getUUID: function () {
        return device.uuid;
      },

      /**
       * Returns the operating system version.
       * @see https://github.com/apache/cordova-plugin-device#deviceversion
       * @returns {String}
       */
      getVersion: function () {
        return device.version;
      },

      /**
       * Returns the device manufacturer.
       * @returns {String}
       */
      getManufacturer: function () {
        return device.manufacturer;
      }
    };
  }]);

// install   :     cordova plugin add cordova-plugin-device-motion
// link      :     https://github.com/apache/cordova-plugin-device-motion

angular.module('ngCordova.plugins.deviceMotion', [])

  .factory('$cordovaDeviceMotion', ['$q', function ($q) {

    return {
      getCurrentAcceleration: function () {
        var q = $q.defer();

        if (angular.isUndefined(navigator.accelerometer) ||
        !angular.isFunction(navigator.accelerometer.getCurrentAcceleration)) {
          q.reject('Device do not support watchAcceleration');
          return q.promise;
        }

        navigator.accelerometer.getCurrentAcceleration(function (result) {
          q.resolve(result);
        }, function (err) {
          q.reject(err);
        });

        return q.promise;
      },

      watchAcceleration: function (options) {
        var q = $q.defer();

        if (angular.isUndefined(navigator.accelerometer) ||
        !angular.isFunction(navigator.accelerometer.watchAcceleration)) {
          q.reject('Device do not support watchAcceleration');
          return q.promise;
        }

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

// install   :     cordova plugin add cordova-plugin-device-orientation
// link      :     https://github.com/apache/cordova-plugin-device-orientation

angular.module('ngCordova.plugins.deviceOrientation', [])

  .factory('$cordovaDeviceOrientation', ['$q', function ($q) {

    var defaultOptions = {
      frequency: 3000 // every 3s
    };
    
    return {
      getCurrentHeading: function () {
        var q = $q.defer();

        if(!navigator.compass) {
            q.reject('No compass on Device');
            return q.promise;
        }

        navigator.compass.getCurrentHeading(function (result) {
          q.resolve(result);
        }, function (err) {
          q.reject(err);
        });

        return q.promise;
      },

      watchHeading: function (options) {
        var q = $q.defer();

        if(!navigator.compass) {
            q.reject('No compass on Device');
            return q.promise;
        }

        var _options = angular.extend(defaultOptions, options);
        var watchID = navigator.compass.watchHeading(function (result) {
          q.notify(result);
        }, function (err) {
          q.reject(err);
        }, _options);

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

// install   :     cordova plugin add cordova-plugin-dialogs
// link      :     https://github.com/apache/cordova-plugin-dialogs

angular.module('ngCordova.plugins.dialogs', [])

  .factory('$cordovaDialogs', ['$q', '$window', function ($q, $window) {

    return {
      alert: function (message, title, buttonName) {
        var q = $q.defer();

        if (!$window.navigator.notification) {
          $window.alert(message);
          q.resolve();
        } else {
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
          } else {
            q.resolve(2);
          }
        } else {
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
          } else {
            q.resolve({input1: res, buttonIndex: 2});
          }
        } else {
          navigator.notification.prompt(message, function (result) {
            q.resolve(result);
          }, title, buttonLabels, defaultText);
        }
        return q.promise;
      },

      beep: function (times) {
        return navigator.notification.beep(times);
      },

      activityStart: function (message, title) {
        var q = $q.defer();

        if (cordova.platformId === 'android') {
          navigator.notification.activityStart(title, message);
          q.resolve();
        } else {
          q.reject(message, title);
        }
      
        return q.promise;
      },

      activityStop: function () {
        var q = $q.defer();

        if (cordova.platformId === 'android') {
          navigator.notification.activityStop();
          q.resolve();
        } else {
          q.reject();
        }
      
        return q.promise;
      },

      progressStart: function (message, title) {
        var q = $q.defer();

        if (cordova.platformId === 'android') {
          navigator.notification.progressStart(title, message);
          q.resolve();
        } else {
          q.reject(message, title);
        }
      
        return q.promise;
      },

      progressStop: function () {
        var q = $q.defer();

        if (cordova.platformId === 'android') {
          navigator.notification.progressStop();
          q.resolve();
        } else {
          q.reject();
        }
      
        return q.promise;
      },

      progressValue: function (value) {
        var q = $q.defer();

        if (cordova.platformId === 'android') {
          navigator.notification.progressValue(value);
          q.resolve();
        } else {
          q.reject(value);
        }
      
        return q.promise;
      }
    };
  }]);

// install  :     cordova plugin add https://github.com/katzer/cordova-plugin-email-composer.git
// link     :     https://github.com/katzer/cordova-plugin-email-composer

angular.module('ngCordova.plugins.emailComposer', [])

  .factory('$cordovaEmailComposer', ['$q', function ($q) {

    return {
      isAvailable: function () {
        var q = $q.defer();

        cordova.plugins.email.isAvailable(function (isAvailable) {
          if (isAvailable) {
            q.resolve();
          } else {
            q.reject();
          }
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

// install   :   cordova -d plugin add https://github.com/Wizcorp/phonegap-facebook-plugin.git --variable APP_ID="123456789" --variable APP_NAME="myApplication"
// link      :   https://github.com/Wizcorp/phonegap-facebook-plugin

/* globals facebookConnectPlugin: true */
angular.module('ngCordova.plugins.facebook', [])

  .provider('$cordovaFacebook', [function () {

    /**
      * Init browser settings for Facebook plugin
      *
      * @param {number} id
      * @param {string} version
      */
    this.browserInit = function (id, version) {
      this.appID = id;
      this.appVersion = version || 'v2.0';
      facebookConnectPlugin.browserInit(this.appID, this.appVersion);
    };

    this.$get = ['$q', function ($q) {
      return {
        login: function (permissions) {
          var q = $q.defer();
          facebookConnectPlugin.login(permissions, function (res) {
            q.resolve(res);
          }, function (res) {
            q.reject(res);
          });

          return q.promise;
        },

        showDialog: function (options) {
          var q = $q.defer();
          facebookConnectPlugin.showDialog(options, function (res) {
            q.resolve(res);
          }, function (err) {
            q.reject(err);
          });
          return q.promise;
        },

        api: function (path, permissions) {
          var q = $q.defer();
          facebookConnectPlugin.api(path, permissions, function (res) {
            q.resolve(res);
          }, function (err) {
            q.reject(err);
          });
          return q.promise;
        },

        getAccessToken: function () {
          var q = $q.defer();
          facebookConnectPlugin.getAccessToken(function (res) {
            q.resolve(res);
          }, function (err) {
            q.reject(err);
          });
          return q.promise;
        },

        getLoginStatus: function () {
          var q = $q.defer();
          facebookConnectPlugin.getLoginStatus(function (res) {
            q.resolve(res);
          }, function (err) {
            q.reject(err);
          });
          return q.promise;
        },

        logout: function () {
          var q = $q.defer();
          facebookConnectPlugin.logout(function (res) {
            q.resolve(res);
          }, function (err) {
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

// install   :     cordova plugin add cordova-plugin-file
// link      :     https://github.com/apache/cordova-plugin-file

angular.module('ngCordova.plugins.file', [])

  .constant('$cordovaFileError', {
    1: 'NOT_FOUND_ERR',
    2: 'SECURITY_ERR',
    3: 'ABORT_ERR',
    4: 'NOT_READABLE_ERR',
    5: 'ENCODING_ERR',
    6: 'NO_MODIFICATION_ALLOWED_ERR',
    7: 'INVALID_STATE_ERR',
    8: 'SYNTAX_ERR',
    9: 'INVALID_MODIFICATION_ERR',
    10: 'QUOTA_EXCEEDED_ERR',
    11: 'TYPE_MISMATCH_ERR',
    12: 'PATH_EXISTS_ERR'
  })

  .provider('$cordovaFile', [function () {

    this.$get = ['$q', '$window', '$cordovaFileError', function ($q, $window, $cordovaFileError) {

      return {

        getFreeDiskSpace: function () {
          var q = $q.defer();
          cordova.exec(function (result) {
            q.resolve(result);
          }, function (error) {
            q.reject(error);
          }, 'File', 'getFreeDiskSpace', []);
          return q.promise;
        },

        checkDir: function (path, dir) {
          var q = $q.defer();

          if ((/^\//.test(dir))) {
            q.reject('directory cannot start with \/');
          }

          try {
            var directory = path + dir;
            $window.resolveLocalFileSystemURL(directory, function (fileSystem) {
              if (fileSystem.isDirectory === true) {
                q.resolve(fileSystem);
              } else {
                q.reject({code: 13, message: 'input is not a directory'});
              }
            }, function (error) {
              error.message = $cordovaFileError[error.code];
              q.reject(error);
            });
          } catch (err) {
            err.message = $cordovaFileError[err.code];
            q.reject(err);
          }

          return q.promise;
        },

        checkFile: function (path, file) {
          var q = $q.defer();

          if ((/^\//.test(file))) {
            q.reject('directory cannot start with \/');
          }

          try {
            var directory = path + file;
            $window.resolveLocalFileSystemURL(directory, function (fileSystem) {
              if (fileSystem.isFile === true) {
                q.resolve(fileSystem);
              } else {
                q.reject({code: 13, message: 'input is not a file'});
              }
            }, function (error) {
              error.message = $cordovaFileError[error.code];
              q.reject(error);
            });
          } catch (err) {
            err.message = $cordovaFileError[err.code];
            q.reject(err);
          }

          return q.promise;
        },

        createDir: function (path, dirName, replaceBool) {
          var q = $q.defer();

          if ((/^\//.test(dirName))) {
            q.reject('directory cannot start with \/');
          }

          replaceBool = replaceBool ? false : true;

          var options = {
            create: true,
            exclusive: replaceBool
          };

          try {
            $window.resolveLocalFileSystemURL(path, function (fileSystem) {
              fileSystem.getDirectory(dirName, options, function (result) {
                q.resolve(result);
              }, function (error) {
                error.message = $cordovaFileError[error.code];
                q.reject(error);
              });
            }, function (err) {
              err.message = $cordovaFileError[err.code];
              q.reject(err);
            });
          } catch (e) {
            e.message = $cordovaFileError[e.code];
            q.reject(e);
          }

          return q.promise;
        },

        createFile: function (path, fileName, replaceBool) {
          var q = $q.defer();

          if ((/^\//.test(fileName))) {
            q.reject('file-name cannot start with \/');
          }

          replaceBool = replaceBool ? false : true;

          var options = {
            create: true,
            exclusive: replaceBool
          };

          try {
            $window.resolveLocalFileSystemURL(path, function (fileSystem) {
              fileSystem.getFile(fileName, options, function (result) {
                q.resolve(result);
              }, function (error) {
                error.message = $cordovaFileError[error.code];
                q.reject(error);
              });
            }, function (err) {
              err.message = $cordovaFileError[err.code];
              q.reject(err);
            });
          } catch (e) {
            e.message = $cordovaFileError[e.code];
            q.reject(e);
          }
          return q.promise;
        },

        removeDir: function (path, dirName) {
          var q = $q.defer();

          if ((/^\//.test(dirName))) {
            q.reject('file-name cannot start with \/');
          }

          try {
            $window.resolveLocalFileSystemURL(path, function (fileSystem) {
              fileSystem.getDirectory(dirName, {create: false}, function (dirEntry) {
                dirEntry.remove(function () {
                  q.resolve({success: true, fileRemoved: dirEntry});
                }, function (error) {
                  error.message = $cordovaFileError[error.code];
                  q.reject(error);
                });
              }, function (err) {
                err.message = $cordovaFileError[err.code];
                q.reject(err);
              });
            }, function (er) {
              er.message = $cordovaFileError[er.code];
              q.reject(er);
            });
          } catch (e) {
            e.message = $cordovaFileError[e.code];
            q.reject(e);
          }
          return q.promise;
        },

        removeFile: function (path, fileName) {
          var q = $q.defer();

          if ((/^\//.test(fileName))) {
            q.reject('file-name cannot start with \/');
          }

          try {
            $window.resolveLocalFileSystemURL(path, function (fileSystem) {
              fileSystem.getFile(fileName, {create: false}, function (fileEntry) {
                fileEntry.remove(function () {
                  q.resolve({success: true, fileRemoved: fileEntry});
                }, function (error) {
                  error.message = $cordovaFileError[error.code];
                  q.reject(error);
                });
              }, function (err) {
                err.message = $cordovaFileError[err.code];
                q.reject(err);
              });
            }, function (er) {
              er.message = $cordovaFileError[er.code];
              q.reject(er);
            });
          } catch (e) {
            e.message = $cordovaFileError[e.code];
            q.reject(e);
          }
          return q.promise;
        },

        removeRecursively: function (path, dirName) {
          var q = $q.defer();

          if ((/^\//.test(dirName))) {
            q.reject('file-name cannot start with \/');
          }

          try {
            $window.resolveLocalFileSystemURL(path, function (fileSystem) {
              fileSystem.getDirectory(dirName, {create: false}, function (dirEntry) {
                dirEntry.removeRecursively(function () {
                  q.resolve({success: true, fileRemoved: dirEntry});
                }, function (error) {
                  error.message = $cordovaFileError[error.code];
                  q.reject(error);
                });
              }, function (err) {
                err.message = $cordovaFileError[err.code];
                q.reject(err);
              });
            }, function (er) {
              er.message = $cordovaFileError[er.code];
              q.reject(er);
            });
          } catch (e) {
            e.message = $cordovaFileError[e.code];
            q.reject(e);
          }
          return q.promise;
        },

        writeFile: function (path, fileName, text, replaceBool) {
          var q = $q.defer();

          if ((/^\//.test(fileName))) {
            q.reject('file-name cannot start with \/');
          }

          replaceBool = replaceBool ? false : true;

          var options = {
            create: true,
            exclusive: replaceBool
          };

          try {
            $window.resolveLocalFileSystemURL(path, function (fileSystem) {
              fileSystem.getFile(fileName, options, function (fileEntry) {
                fileEntry.createWriter(function (writer) {
                  if (options.append === true) {
                    writer.seek(writer.length);
                  }

                  if (options.truncate) {
                    writer.truncate(options.truncate);
                  }

                  writer.onwriteend = function (evt) {
                    if (this.error) {
                      q.reject(this.error);
                    } else {
                      q.resolve(evt);
                    }
                  };

                  writer.write(text);

                  q.promise.abort = function () {
                    writer.abort();
                  };
                });
              }, function (error) {
                error.message = $cordovaFileError[error.code];
                q.reject(error);
              });
            }, function (err) {
              err.message = $cordovaFileError[err.code];
              q.reject(err);
            });
          } catch (e) {
            e.message = $cordovaFileError[e.code];
            q.reject(e);
          }

          return q.promise;
        },

        writeExistingFile: function (path, fileName, text) {
          var q = $q.defer();

          if ((/^\//.test(fileName))) {
            q.reject('file-name cannot start with \/');
          }

          try {
            $window.resolveLocalFileSystemURL(path, function (fileSystem) {
              fileSystem.getFile(fileName, {create: false}, function (fileEntry) {
                fileEntry.createWriter(function (writer) {
                  writer.seek(writer.length);

                  writer.onwriteend = function (evt) {
                    if (this.error) {
                      q.reject(this.error);
                    } else {
                      q.resolve(evt);
                    }
                  };

                  writer.write(text);

                  q.promise.abort = function () {
                    writer.abort();
                  };
                });
              }, function (error) {
                error.message = $cordovaFileError[error.code];
                q.reject(error);
              });
            }, function (err) {
              err.message = $cordovaFileError[err.code];
              q.reject(err);
            });
          } catch (e) {
            e.message = $cordovaFileError[e.code];
            q.reject(e);
          }

          return q.promise;
        },

        readAsText: function (path, file) {
          var q = $q.defer();

          if ((/^\//.test(file))) {
            q.reject('file-name cannot start with \/');
          }

          try {
            $window.resolveLocalFileSystemURL(path, function (fileSystem) {
              fileSystem.getFile(file, {create: false}, function (fileEntry) {
                fileEntry.file(function (fileData) {
                  var reader = new FileReader();

                  reader.onloadend = function (evt) {
                    if (evt.target.result !== undefined || evt.target.result !== null) {
                      q.resolve(evt.target.result);
                    } else if (evt.target.error !== undefined || evt.target.error !== null) {
                      q.reject(evt.target.error);
                    } else {
                      q.reject({code: null, message: 'READER_ONLOADEND_ERR'});
                    }
                  };

                  reader.readAsText(fileData);
                });
              }, function (error) {
                error.message = $cordovaFileError[error.code];
                q.reject(error);
              });
            }, function (err) {
              err.message = $cordovaFileError[err.code];
              q.reject(err);
            });
          } catch (e) {
            e.message = $cordovaFileError[e.code];
            q.reject(e);
          }

          return q.promise;
        },

        readAsDataURL: function (path, file) {
          var q = $q.defer();

          if ((/^\//.test(file))) {
            q.reject('file-name cannot start with \/');
          }

          try {
            $window.resolveLocalFileSystemURL(path, function (fileSystem) {
              fileSystem.getFile(file, {create: false}, function (fileEntry) {
                fileEntry.file(function (fileData) {
                  var reader = new FileReader();
                  reader.onloadend = function (evt) {
                    if (evt.target.result !== undefined || evt.target.result !== null) {
                      q.resolve(evt.target.result);
                    } else if (evt.target.error !== undefined || evt.target.error !== null) {
                      q.reject(evt.target.error);
                    } else {
                      q.reject({code: null, message: 'READER_ONLOADEND_ERR'});
                    }
                  };
                  reader.readAsDataURL(fileData);
                });
              }, function (error) {
                error.message = $cordovaFileError[error.code];
                q.reject(error);
              });
            }, function (err) {
              err.message = $cordovaFileError[err.code];
              q.reject(err);
            });
          } catch (e) {
            e.message = $cordovaFileError[e.code];
            q.reject(e);
          }

          return q.promise;
        },

        readAsBinaryString: function (path, file) {
          var q = $q.defer();

          if ((/^\//.test(file))) {
            q.reject('file-name cannot start with \/');
          }

          try {
            $window.resolveLocalFileSystemURL(path, function (fileSystem) {
              fileSystem.getFile(file, {create: false}, function (fileEntry) {
                fileEntry.file(function (fileData) {
                  var reader = new FileReader();
                  reader.onloadend = function (evt) {
                    if (evt.target.result !== undefined || evt.target.result !== null) {
                      q.resolve(evt.target.result);
                    } else if (evt.target.error !== undefined || evt.target.error !== null) {
                      q.reject(evt.target.error);
                    } else {
                      q.reject({code: null, message: 'READER_ONLOADEND_ERR'});
                    }
                  };
                  reader.readAsBinaryString(fileData);
                });
              }, function (error) {
                error.message = $cordovaFileError[error.code];
                q.reject(error);
              });
            }, function (err) {
              err.message = $cordovaFileError[err.code];
              q.reject(err);
            });
          } catch (e) {
            e.message = $cordovaFileError[e.code];
            q.reject(e);
          }

          return q.promise;
        },

        readAsArrayBuffer: function (path, file) {
          var q = $q.defer();

          if ((/^\//.test(file))) {
            q.reject('file-name cannot start with \/');
          }

          try {
            $window.resolveLocalFileSystemURL(path, function (fileSystem) {
              fileSystem.getFile(file, {create: false}, function (fileEntry) {
                fileEntry.file(function (fileData) {
                  var reader = new FileReader();
                  reader.onloadend = function (evt) {
                    if (evt.target.result !== undefined || evt.target.result !== null) {
                      q.resolve(evt.target.result);
                    } else if (evt.target.error !== undefined || evt.target.error !== null) {
                      q.reject(evt.target.error);
                    } else {
                      q.reject({code: null, message: 'READER_ONLOADEND_ERR'});
                    }
                  };
                  reader.readAsArrayBuffer(fileData);
                });
              }, function (error) {
                error.message = $cordovaFileError[error.code];
                q.reject(error);
              });
            }, function (err) {
              err.message = $cordovaFileError[err.code];
              q.reject(err);
            });
          } catch (e) {
            e.message = $cordovaFileError[e.code];
            q.reject(e);
          }

          return q.promise;
        },

        moveFile: function (path, fileName, newPath, newFileName) {
          var q = $q.defer();

          newFileName = newFileName || fileName;

          if ((/^\//.test(fileName)) || (/^\//.test(newFileName))) {
            q.reject('file-name cannot start with \/');
          }

          try {
            $window.resolveLocalFileSystemURL(path, function (fileSystem) {
              fileSystem.getFile(fileName, {create: false}, function (fileEntry) {
                $window.resolveLocalFileSystemURL(newPath, function (newFileEntry) {
                  fileEntry.moveTo(newFileEntry, newFileName, function (result) {
                    q.resolve(result);
                  }, function (error) {
                    q.reject(error);
                  });
                }, function (err) {
                  q.reject(err);
                });
              }, function (err) {
                q.reject(err);
              });
            }, function (er) {
              q.reject(er);
            });
          } catch (e) {
            q.reject(e);
          }
          return q.promise;
        },

        moveDir: function (path, dirName, newPath, newDirName) {
          var q = $q.defer();

          newDirName = newDirName || dirName;

          if (/^\//.test(dirName) || (/^\//.test(newDirName))) {
            q.reject('file-name cannot start with \/');
          }

          try {
            $window.resolveLocalFileSystemURL(path, function (fileSystem) {
              fileSystem.getDirectory(dirName, {create: false}, function (dirEntry) {
                $window.resolveLocalFileSystemURL(newPath, function (newDirEntry) {
                  dirEntry.moveTo(newDirEntry, newDirName, function (result) {
                    q.resolve(result);
                  }, function (error) {
                    q.reject(error);
                  });
                }, function (erro) {
                  q.reject(erro);
                });
              }, function (err) {
                q.reject(err);
              });
            }, function (er) {
              q.reject(er);
            });
          } catch (e) {
            q.reject(e);
          }
          return q.promise;
        },

        copyDir: function (path, dirName, newPath, newDirName) {
          var q = $q.defer();

          newDirName = newDirName || dirName;

          if (/^\//.test(dirName) || (/^\//.test(newDirName))) {
            q.reject('file-name cannot start with \/');
          }

          try {
            $window.resolveLocalFileSystemURL(path, function (fileSystem) {
              fileSystem.getDirectory(dirName, {create: false, exclusive: false}, function (dirEntry) {

                $window.resolveLocalFileSystemURL(newPath, function (newDirEntry) {
                  dirEntry.copyTo(newDirEntry, newDirName, function (result) {
                    q.resolve(result);
                  }, function (error) {
                    error.message = $cordovaFileError[error.code];
                    q.reject(error);
                  });
                }, function (erro) {
                  erro.message = $cordovaFileError[erro.code];
                  q.reject(erro);
                });
              }, function (err) {
                err.message = $cordovaFileError[err.code];
                q.reject(err);
              });
            }, function (er) {
              er.message = $cordovaFileError[er.code];
              q.reject(er);
            });
          } catch (e) {
            e.message = $cordovaFileError[e.code];
            q.reject(e);
          }
          return q.promise;
        },

        copyFile: function (path, fileName, newPath, newFileName) {
          var q = $q.defer();

          newFileName = newFileName || fileName;

          if ((/^\//.test(fileName))) {
            q.reject('file-name cannot start with \/');
          }

          try {
            $window.resolveLocalFileSystemURL(path, function (fileSystem) {
              fileSystem.getFile(fileName, {create: false, exclusive: false}, function (fileEntry) {

                $window.resolveLocalFileSystemURL(newPath, function (newFileEntry) {
                  fileEntry.copyTo(newFileEntry, newFileName, function (result) {
                    q.resolve(result);
                  }, function (error) {
                    error.message = $cordovaFileError[error.code];
                    q.reject(error);
                  });
                }, function (erro) {
                  erro.message = $cordovaFileError[erro.code];
                  q.reject(erro);
                });
              }, function (err) {
                err.message = $cordovaFileError[err.code];
                q.reject(err);
              });
            }, function (er) {
              er.message = $cordovaFileError[er.code];
              q.reject(er);
            });
          } catch (e) {
            e.message = $cordovaFileError[e.code];
            q.reject(e);
          }
          return q.promise;
        },

        readFileMetadata: function (path, file) {
          var q = $q.defer();

          if ((/^\//.test(file))) {
            q.reject('directory cannot start with \/');
          }

          try {
            var directory = path + file;
            $window.resolveLocalFileSystemURL(directory, function (fileEntry) {
              fileEntry.file(function (result) {
                q.resolve(result);
              }, function (error) {
                error.message = $cordovaFileError[error.code];
                q.reject(error);
              });
            }, function (err) {
              err.message = $cordovaFileError[err.code];
              q.reject(err);
            });
          } catch (e) {
            e.message = $cordovaFileError[e.code];
            q.reject(e);
          }

          return q.promise;
        }

        /*
         listFiles: function (path, dir) {

         },

         listDir: function (path, dirName) {
         var q = $q.defer();

         try {
         $window.resolveLocalFileSystemURL(path, function (fileSystem) {
         fileSystem.getDirectory(dirName, options, function (parent) {
         var reader = parent.createReader();
         reader.readEntries(function (entries) {
         q.resolve(entries);
         }, function () {
         q.reject('DIR_READ_ERROR : ' + path + dirName);
         });
         }, function (error) {
         error.message = $cordovaFileError[error.code];
         q.reject(error);
         });
         }, function (err) {
         err.message = $cordovaFileError[err.code];
         q.reject(err);
         });
         } catch (e) {
         e.message = $cordovaFileError[e.code];
         q.reject(e);
         }

         return q.promise;
         },

         */
      };

    }];
  }]);

// install   :      cordova plugin add https://github.com/pwlin/cordova-plugin-file-opener2.git
// link      :      https://github.com/pwlin/cordova-plugin-file-opener2

angular.module('ngCordova.plugins.fileOpener2', [])

  .factory('$cordovaFileOpener2', ['$q', function ($q) {

    return {
      open: function (file, type) {
        var q = $q.defer();
        cordova.plugins.fileOpener2.open(file, type, {
          error: function (e) {
            q.reject(e);
          }, success: function () {
            q.resolve();
          }
        });
        return q.promise;
      },

      uninstall: function (pack) {
        var q = $q.defer();
        cordova.plugins.fileOpener2.uninstall(pack, {
          error: function (e) {
            q.reject(e);
          }, success: function () {
            q.resolve();
          }
        });
        return q.promise;
      },

      appIsInstalled: function (pack) {
        var q = $q.defer();
        cordova.plugins.fileOpener2.appIsInstalled(pack, {
          success: function (res) {
            q.resolve(res);
          }
        });
        return q.promise;
      }
    };
  }]);

// install   :     cordova plugin add cordova-plugin-file-transfer
// link      :     https://github.com/apache/cordova-plugin-file-transfer

/* globals FileTransfer: true */
angular.module('ngCordova.plugins.fileTransfer', [])

  .factory('$cordovaFileTransfer', ['$q', '$timeout', function ($q, $timeout) {
    return {
      download: function (source, filePath, options, trustAllHosts) {
        var q = $q.defer();
        var ft = new FileTransfer();
        var uri = (options && options.encodeURI === false) ? source : encodeURI(source);

        if (options && options.timeout !== undefined && options.timeout !== null) {
          $timeout(function () {
            ft.abort();
          }, options.timeout);
          options.timeout = null;
        }

        ft.onprogress = function (progress) {
          q.notify(progress);
        };

        q.promise.abort = function () {
          ft.abort();
        };

        ft.download(uri, filePath, q.resolve, q.reject, trustAllHosts, options);
        return q.promise;
      },

      upload: function (server, filePath, options, trustAllHosts) {
        var q = $q.defer();
        var ft = new FileTransfer();
        var uri = (options && options.encodeURI === false) ? server : encodeURI(server);

        if (options && options.timeout !== undefined && options.timeout !== null) {
          $timeout(function () {
            ft.abort();
          }, options.timeout);
          options.timeout = null;
        }

        ft.onprogress = function (progress) {
          q.notify(progress);
        };

        q.promise.abort = function () {
          ft.abort();
        };

        ft.upload(filePath, uri, q.resolve, q.reject, options, trustAllHosts);
        return q.promise;
      }
    };
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

      exit: function () {
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

// install   :     cordova plugin add cordova-plugin-geolocation
// link      :     https://github.com/apache/cordova-plugin-geolocation

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

// install   :      cordova plugin add cordova-plugin-globalization
// link      :      https://github.com/apache/cordova-plugin-globalization

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

      trackException: function (description, fatal) {
        var d = $q.defer();

        $window.analytics.trackException(description, fatal, function (response) {
          d.resolve(response);
        }, function (error) {
          d.reject(error);
        });

        return d.promise;
      },

      trackTiming: function (category, milliseconds, variable, label) {
        var d = $q.defer();

        $window.analytics.trackTiming(category, milliseconds, variable, label, function (response) {
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
        } else {
          var div = document.getElementById('map_canvas');
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

// install   :   cordova plugin add https://github.com/ptgamr/cordova-google-play-game.git --variable APP_ID=123456789
// link      :   https://github.com/ptgamr/cordova-google-play-game

/* globals googleplaygame: true */
angular.module('ngCordova.plugins.googlePlayGame', [])

  .factory('$cordovaGooglePlayGame', ['$q', function ($q) {

    return {
      auth: function () {
        var q = $q.defer();

        googleplaygame.auth(function (success) {
          return q.resolve(success);
        }, function (err) {
          return q.reject(err);
        });

        return q.promise;
      },
      signout: function () {
        var q = $q.defer();

        googleplaygame.signout(function (success) {
          return q.resolve(success);
        }, function (err) {
          return q.reject(err);
        });

        return q.promise;
      },
      isSignedIn: function () {
        var q = $q.defer();

        googleplaygame.isSignedIn(function (success) {
          return q.resolve(success);
        }, function (err) {
          return q.reject(err);
        });

        return q.promise;
      },
      showPlayer: function () {
        var q = $q.defer();

        googleplaygame.showPlayer(function (success) {
          return q.resolve(success);
        }, function (err) {
          return q.reject(err);
        });

        return q.promise;
      },
      submitScore: function (data) {
        var q = $q.defer();

        googleplaygame.submitScore(data, function (success) {
          return q.resolve(success);
        }, function (err) {
          return q.reject(err);
        });

        return q.promise;
      },
      showAllLeaderboards: function () {
        var q = $q.defer();

        googleplaygame.showAllLeaderboards(function (success) {
          return q.resolve(success);
        }, function (err) {
          return q.reject(err);
        });

        return q.promise;
      },
      showLeaderboard: function (data) {
        var q = $q.defer();

        googleplaygame.showLeaderboard(data, function (success) {
          return q.resolve(success);
        }, function (err) {
          return q.reject(err);
        });

        return q.promise;
      },
      unlockAchievement: function (data) {
        var q = $q.defer();

        googleplaygame.unlockAchievement(data, function (success) {
          return q.resolve(success);
        }, function (err) {
          return q.reject(err);
        });

        return q.promise;
      },
      incrementAchievement: function (data) {
        var q = $q.defer();

        googleplaygame.incrementAchievement(data, function (success) {
          return q.resolve(success);
        }, function (err) {
          return q.reject(err);
        });

        return q.promise;
      },
      showAchievements: function () {
        var q = $q.defer();

        googleplaygame.showAchievements(function (success) {
          return q.resolve(success);
        }, function (err) {
          return q.reject(err);
        });

        return q.promise;
      }
    };

  }]);

// install  :     cordova plugin add https://github.com/EddyVerbruggen/cordova-plugin-googleplus.git
// link     :     https://github.com/EddyVerbruggen/cordova-plugin-googleplus

angular.module('ngCordova.plugins.googlePlus', [])

  .factory('$cordovaGooglePlus', ['$q', '$window', function ($q, $window) {

    return {
      login: function (iosKey) {
        var q = $q.defer();

        if (iosKey === undefined) {
          iosKey = {};
        }
        $window.plugins.googleplus.login({'iOSApiKey': iosKey}, function (response) {
          q.resolve(response);
        }, function (error) {
          q.reject(error);
        });

        return q.promise;
      },

      silentLogin: function (iosKey) {
        var q = $q.defer();

        if (iosKey === undefined) {
          iosKey = {};
        }
        $window.plugins.googleplus.trySilentLogin({'iOSApiKey': iosKey}, function (response) {
          q.resolve(response);
        }, function (error) {
          q.reject(error);
        });

        return q.promise;
      },

      logout: function () {
        var q = $q.defer();
        $window.plugins.googleplus.logout(function (response) {
          q.resolve(response);
        });
      },

      disconnect: function () {
        var q = $q.defer();
        $window.plugins.googleplus.disconnect(function (response) {
          q.resolve(response);
        });
      },

      isAvailable: function () {
        var q = $q.defer();
        $window.plugins.googleplus.isAvailable(function (available) {
          if (available) {
            q.resolve(available);
          } else {
            q.reject(available);
          }
        });
        
        return q.promise;
      }
    };

  }]);

// install   :      cordova plugin add https://github.com/Telerik-Verified-Plugins/HealthKit.git
// link      :      https://github.com/Telerik-Verified-Plugins/HealthKit

angular.module('ngCordova.plugins.healthKit', [])

  .factory('$cordovaHealthKit', ['$q', '$window', function ($q, $window) {

    return {
      isAvailable: function () {
        var q = $q.defer();

        $window.plugins.healthkit.available(function (success) {
          q.resolve(success);
        }, function (err) {
          q.reject(err);
        });

        return q.promise;
      },

      /**
       * Check whether or not the user granted your app access to a specific HealthKit type.
       * Reference for possible types:
       * https://developer.apple.com/library/ios/documentation/HealthKit/Reference/HealthKit_Constants/
       */
      checkAuthStatus: function (type) {
        var q = $q.defer();

        type = type || 'HKQuantityTypeIdentifierHeight';

        $window.plugins.healthkit.checkAuthStatus({
          'type': type
        }, function (success) {
          q.resolve(success);
        }, function (err) {
          q.reject(err);
        });

        return q.promise;
      },

      /**
       * Request authorization to access HealthKit data. See the full HealthKit constants
       * reference for possible read and write types:
       * https://developer.apple.com/library/ios/documentation/HealthKit/Reference/HealthKit_Constants/
       */
      requestAuthorization: function (readTypes, writeTypes) {
        var q = $q.defer();

        readTypes = readTypes || [
          'HKCharacteristicTypeIdentifierDateOfBirth', 'HKQuantityTypeIdentifierActiveEnergyBurned', 'HKQuantityTypeIdentifierHeight'
        ];
        writeTypes = writeTypes || [
          'HKQuantityTypeIdentifierActiveEnergyBurned', 'HKQuantityTypeIdentifierHeight', 'HKQuantityTypeIdentifierDistanceCycling'
        ];

        $window.plugins.healthkit.requestAuthorization({
          'readTypes': readTypes,
          'writeTypes': writeTypes
        }, function (success) {
          q.resolve(success);
        }, function (err) {
          q.reject(err);
        });

        return q.promise;
      },

      readDateOfBirth: function () {
        var q = $q.defer();
        $window.plugins.healthkit.readDateOfBirth(
          function (success) {
            q.resolve(success);
          },
          function (err) {
            q.resolve(err);
          }
        );

        return q.promise;
      },

      readGender: function () {
        var q = $q.defer();
        $window.plugins.healthkit.readGender(
          function (success) {
            q.resolve(success);
          },
          function (err) {
            q.resolve(err);
          }
        );

        return q.promise;
      },

      saveWeight: function (value, units, date) {
        var q = $q.defer();
        $window.plugins.healthkit.saveWeight({
            'unit': units || 'lb',
            'amount': value,
            'date': date || new Date()
          },
          function (success) {
            q.resolve(success);
          },
          function (err) {
            q.resolve(err);
          }
        );
        return q.promise;
      },

      readWeight: function (units) {
        var q = $q.defer();
        $window.plugins.healthkit.readWeight({
            'unit': units || 'lb'
          },
          function (success) {
            q.resolve(success);
          },
          function (err) {
            q.resolve(err);
          }
        );

        return q.promise;
      },
      saveHeight: function (value, units, date) {
        var q = $q.defer();
        $window.plugins.healthkit.saveHeight({
            'unit': units || 'in',
            'amount': value,
            'date': date || new Date()
          },
          function (success) {
            q.resolve(success);
          },
          function (err) {
            q.resolve(err);
          }
        );
        return q.promise;
      },
      readHeight: function (units) {
        var q = $q.defer();
        $window.plugins.healthkit.readHeight({
            'unit': units || 'in'
          },
          function (success) {
            q.resolve(success);
          },
          function (err) {
            q.resolve(err);
          }
        );

        return q.promise;
      },

      findWorkouts: function () {
        var q = $q.defer();
        $window.plugins.healthkit.findWorkouts({},
          function (success) {
            q.resolve(success);
          },
          function (err) {
            q.resolve(err);
          }
        );
        return q.promise;
      },

      /**
       * Save a workout.
       *
       * Workout param should be of the format:
       {
         'activityType': 'HKWorkoutActivityTypeCycling', // HKWorkoutActivityType constant (https://developer.apple.com/library/ios/documentation/HealthKit/Reference/HKWorkout_Class/#//apple_ref/c/tdef/HKWorkoutActivityType)
         'quantityType': 'HKQuantityTypeIdentifierDistanceCycling',
         'startDate': new Date(), // mandatory
         'endDate': null, // optional, use either this or duration
         'duration': 3600, // in seconds, optional, use either this or endDate
         'energy': 300, //
         'energyUnit': 'kcal', // J|cal|kcal
         'distance': 11, // optional
         'distanceUnit': 'km' // probably useful with the former param
         // 'extraData': "", // Not sure how necessary this is
       },
       */
      saveWorkout: function (workout) {
        var q = $q.defer();
        $window.plugins.healthkit.saveWorkout(workout,
          function (success) {
            q.resolve(success);
          },
          function (err) {
            q.resolve(err);
          }
        );
        return q.promise;
      },

      /**
       * Sample any kind of health data through a given date range.
       * sampleQuery of the format:
       {
									'startDate': yesterday, // mandatory
									'endDate': tomorrow, // mandatory
									'sampleType': 'HKQuantityTypeIdentifierHeight',
									'unit' : 'cm'
							},
       */
      querySampleType: function (sampleQuery) {
        var q = $q.defer();
        $window.plugins.healthkit.querySampleType(sampleQuery,
          function (success) {
            q.resolve(success);
          },
          function (err) {
            q.resolve(err);
          }
        );
        return q.promise;
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

// install   :     cordova plugin add cordova-plugin-inappbrowser
// link      :     https://github.com/apache/cordova-plugin-inappbrowser

angular.module('ngCordova.plugins.inAppBrowser', [])

  .provider('$cordovaInAppBrowser', [function () {

    var ref;
    var defaultOptions = this.defaultOptions = {};

    this.setDefaultOptions = function (config) {
      defaultOptions = angular.extend(defaultOptions, config);
    };

    this.$get = ['$rootScope', '$q', '$window', '$timeout', function ($rootScope, $q, $window, $timeout) {
      return {
        open: function (url, target, requestOptions) {
          var q = $q.defer();

          if (requestOptions && !angular.isObject(requestOptions)) {
            q.reject('options must be an object');
            return q.promise;
          }

          var options = angular.extend({}, defaultOptions, requestOptions);

          var opt = [];
          angular.forEach(options, function (value, key) {
            opt.push(key + '=' + value);
          });
          var optionsString = opt.join();

          ref = $window.open(url, target, optionsString);

          ref.addEventListener('loadstart', function (event) {
            $timeout(function () {
              $rootScope.$broadcast('$cordovaInAppBrowser:loadstart', event);
            });
          }, false);

          ref.addEventListener('loadstop', function (event) {
            q.resolve(event);
            $timeout(function () {
              $rootScope.$broadcast('$cordovaInAppBrowser:loadstop', event);
            });
          }, false);

          ref.addEventListener('loaderror', function (event) {
            q.reject(event);
            $timeout(function () {
              $rootScope.$broadcast('$cordovaInAppBrowser:loaderror', event);
            });
          }, false);

          ref.addEventListener('exit', function (event) {
            $timeout(function () {
              $rootScope.$broadcast('$cordovaInAppBrowser:exit', event);
            });
          }, false);

          return q.promise;
        },

        close: function () {
          ref.close();
          ref = null;
        },

        show: function () {
          ref.show();
        },

        executeScript: function (details) {
          var q = $q.defer();

          ref.executeScript(details, function (result) {
            q.resolve(result);
          });

          return q.promise;
        },

        insertCSS: function (details) {
          var q = $q.defer();

          ref.insertCSS(details, function (result) {
            q.resolve(result);
          });

          return q.promise;
        }
      };
    }];
  }]);

// install  :     cordova plugin add https://github.com/EddyVerbruggen/Insomnia-PhoneGap-Plugin.git
// link     :     https://github.com/EddyVerbruggen/Insomnia-PhoneGap-Plugin
angular.module('ngCordova.plugins.insomnia', [])

  .factory('$cordovaInsomnia', ['$window', function ($window) {

    return {
      keepAwake: function () {
        return $window.plugins.insomnia.keepAwake();
      },
      allowSleepAgain: function () {
        return $window.plugins.insomnia.allowSleepAgain();
      }
    };

  }]);

// install   :   cordova plugins add https://github.com/vstirbu/InstagramPlugin.git
// link      :   https://github.com/vstirbu/InstagramPlugin

/* globals Instagram: true */
angular.module('ngCordova.plugins.instagram', [])

.factory('$cordovaInstagram', ['$q', function ($q) {

  return {
    share: function (options) {
      var q = $q.defer();

      if (!window.Instagram) {
        console.error('Tried to call Instagram.share but the Instagram plugin isn\'t installed!');
        q.resolve(null);
        return q.promise;
      }

      Instagram.share(options.image, options.caption, function (err) {
        if(err) {
          q.reject(err);
        } else {
          q.resolve(true);
        }
      });
      return q.promise;
    },
    isInstalled: function () {
      var q = $q.defer();

      if (!window.Instagram) {
        console.error('Tried to call Instagram.isInstalled but the Instagram plugin isn\'t installed!');
        q.resolve(null);
        return q.promise;
      }

      Instagram.isInstalled(function (err, installed) {
        if (err) {
          q.reject(err);
        } else {
          q.resolve(installed);
        }
      });
      return q.promise;
    }
  };
}]);

// install   :      cordova plugin add https://github.com/driftyco/ionic-plugins-keyboard.git
// link      :      https://github.com/driftyco/ionic-plugins-keyboard

angular.module('ngCordova.plugins.keyboard', [])

  .factory('$cordovaKeyboard', ['$rootScope', function ($rootScope) {

    var keyboardShowEvent = function () {
      $rootScope.$evalAsync(function () {
        $rootScope.$broadcast('$cordovaKeyboard:show');
      });
    };

    var keyboardHideEvent = function () {
      $rootScope.$evalAsync(function () {
        $rootScope.$broadcast('$cordovaKeyboard:hide');
      });
    };

    document.addEventListener('deviceready', function () {
      if (cordova.plugins.Keyboard) {
        window.addEventListener('native.keyboardshow', keyboardShowEvent, false);
        window.addEventListener('native.keyboardhide', keyboardHideEvent, false);
      }
    });

    return {
      hideAccessoryBar: function (bool) {
        return cordova.plugins.Keyboard.hideKeyboardAccessoryBar(bool);
      },

      close: function () {
        return cordova.plugins.Keyboard.close();
      },

      show: function () {
        return cordova.plugins.Keyboard.show();
      },

      disableScroll: function (bool) {
        return cordova.plugins.Keyboard.disableScroll(bool);
      },

      isVisible: function () {
        return cordova.plugins.Keyboard.isVisible;
      },

      clearShowWatch: function () {
        document.removeEventListener('native.keyboardshow', keyboardShowEvent);
        $rootScope.$$listeners['$cordovaKeyboard:show'] = [];
      },

      clearHideWatch: function () {
        document.removeEventListener('native.keyboardhide', keyboardHideEvent);
        $rootScope.$$listeners['$cordovaKeyboard:hide'] = [];
      }
    };
  }]);

// install   :      cordova plugin add https://github.com/shazron/KeychainPlugin.git
// link      :      https://github.com/shazron/KeychainPlugin

/* globals Keychain: true */
angular.module('ngCordova.plugins.keychain', [])

  .factory('$cordovaKeychain', ['$q', function ($q) {

    return {
      getForKey: function (key, serviceName) {
        var defer = $q.defer(),
            kc = new Keychain();

        kc.getForKey(defer.resolve, defer.reject, key, serviceName);

        return defer.promise;
      },

      setForKey: function (key, serviceName, value) {
        var defer = $q.defer(),
            kc = new Keychain();

        kc.setForKey(defer.resolve, defer.reject, key, serviceName, value);

        return defer.promise;
      },

      removeForKey: function (key, serviceName) {
        var defer = $q.defer(),
            kc = new Keychain();

        kc.removeForKey(defer.resolve, defer.reject, key, serviceName);

        return defer.promise;
      }
    };
  }]);

// install   :      cordova plugin add uk.co.workingedge.phonegap.plugin.launchnavigator
// link      :      https://github.com/dpa99c/phonegap-launch-navigator

/* globals launchnavigator: true */
angular.module('ngCordova.plugins.launchNavigator', [])

  .factory('$cordovaLaunchNavigator', ['$q', function ($q) {

    return {
      navigate: function (destination, start, options) {
        var q = $q.defer();
        launchnavigator.navigate(
          destination,
          start,
          function (){
            q.resolve();
          },
          function (error){
            q.reject(error);
          },
		  options);
        return q.promise;
      }
    };

  }]);

// install   :  cordova plugin add https://github.com/katzer/cordova-plugin-local-notifications.git
// link      :  https://github.com/katzer/cordova-plugin-local-notifications

angular.module('ngCordova.plugins.localNotification', [])

  .factory('$cordovaLocalNotification', ['$q', '$window', '$rootScope', '$timeout', function ($q, $window, $rootScope, $timeout) {
    document.addEventListener('deviceready', function () {
      if ($window.cordova &&
        $window.cordova.plugins &&
        $window.cordova.plugins.notification &&
        $window.cordova.plugins.notification.local) {
        // ----- "Scheduling" events

        // A local notification was scheduled
        $window.cordova.plugins.notification.local.on('schedule', function (notification, state) {
          $timeout(function () {
            $rootScope.$broadcast('$cordovaLocalNotification:schedule', notification, state);
          });
        });

        // A local notification was triggered
        $window.cordova.plugins.notification.local.on('trigger', function (notification, state) {
          $timeout(function () {
            $rootScope.$broadcast('$cordovaLocalNotification:trigger', notification, state);
          });
        });

        // ----- "Update" events

        // A local notification was updated
        $window.cordova.plugins.notification.local.on('update', function (notification, state) {
          $timeout(function () {
            $rootScope.$broadcast('$cordovaLocalNotification:update', notification, state);
          });
        });

        // ----- "Clear" events

        // A local notification was cleared from the notification center
        $window.cordova.plugins.notification.local.on('clear', function (notification, state) {
          $timeout(function () {
            $rootScope.$broadcast('$cordovaLocalNotification:clear', notification, state);
          });
        });

        // All local notifications were cleared from the notification center
        $window.cordova.plugins.notification.local.on('clearall', function (state) {
          $timeout(function () {
            $rootScope.$broadcast('$cordovaLocalNotification:clearall', state);
          });
        });

        // ----- "Cancel" events

        // A local notification was cancelled
        $window.cordova.plugins.notification.local.on('cancel', function (notification, state) {
          $timeout(function () {
            $rootScope.$broadcast('$cordovaLocalNotification:cancel', notification, state);
          });
        });

        // All local notifications were cancelled
        $window.cordova.plugins.notification.local.on('cancelall', function (state) {
          $timeout(function () {
            $rootScope.$broadcast('$cordovaLocalNotification:cancelall', state);
          });
        });

        // ----- Other events

        // A local notification was clicked
        $window.cordova.plugins.notification.local.on('click', function (notification, state) {
          $timeout(function () {
            $rootScope.$broadcast('$cordovaLocalNotification:click', notification, state);
          });
        });
      }
    }, false);
    return {
      schedule: function (options, scope) {
        var q = $q.defer();
        scope = scope || null;

        $window.cordova.plugins.notification.local.schedule(options, function (result) {
          q.resolve(result);
        }, scope);

        return q.promise;
      },

      add: function (options, scope) {
        console.warn('Deprecated: use "schedule" instead.');

        var q = $q.defer();
        scope = scope || null;

        $window.cordova.plugins.notification.local.schedule(options, function (result) {
          q.resolve(result);
        }, scope);

        return q.promise;
      },

      update: function (options, scope) {
        var q = $q.defer();
        scope = scope || null;

        $window.cordova.plugins.notification.local.update(options, function (result) {
          q.resolve(result);
        }, scope);

        return q.promise;
      },

      clear: function (ids, scope) {
        var q = $q.defer();
        scope = scope || null;

        $window.cordova.plugins.notification.local.clear(ids, function (result) {
          q.resolve(result);
        }, scope);

        return q.promise;
      },

      clearAll: function (scope) {
        var q = $q.defer();
        scope = scope || null;

        $window.cordova.plugins.notification.local.clearAll(function (result) {
          q.resolve(result);
        }, scope);

        return q.promise;
      },

      cancel: function (ids, scope) {
        var q = $q.defer();
        scope = scope || null;

        $window.cordova.plugins.notification.local.cancel(ids, function (result) {
          q.resolve(result);
        }, scope);

        return q.promise;
      },

      cancelAll: function (scope) {
        var q = $q.defer();
        scope = scope || null;

        $window.cordova.plugins.notification.local.cancelAll(function (result) {
          q.resolve(result);
        }, scope);

        return q.promise;
      },

      isPresent: function (id, scope) {
        var q = $q.defer();
        scope = scope || null;

        $window.cordova.plugins.notification.local.isPresent(id, function (result) {
          q.resolve(result);
        }, scope);

        return q.promise;
      },

      isScheduled: function (id, scope) {
        var q = $q.defer();
        scope = scope || null;

        $window.cordova.plugins.notification.local.isScheduled(id, function (result) {
          q.resolve(result);
        }, scope);

        return q.promise;
      },

      isTriggered: function (id, scope) {
        var q = $q.defer();
        scope = scope || null;

        $window.cordova.plugins.notification.local.isTriggered(id, function (result) {
          q.resolve(result);
        }, scope);

        return q.promise;
      },

      hasPermission: function (scope) {
        var q = $q.defer();
        scope = scope || null;

        $window.cordova.plugins.notification.local.hasPermission(function (result) {
          if (result) {
            q.resolve(result);
          } else {
            q.reject(result);
          }
        }, scope);

        return q.promise;
      },

      registerPermission: function (scope) {
        var q = $q.defer();
        scope = scope || null;

        $window.cordova.plugins.notification.local.registerPermission(function (result) {
          if (result) {
            q.resolve(result);
          } else {
            q.reject(result);
          }
        }, scope);

        return q.promise;
      },

      promptForPermission: function (scope) {
        console.warn('Deprecated: use "registerPermission" instead.');

        var q = $q.defer();
        scope = scope || null;

        $window.cordova.plugins.notification.local.registerPermission(function (result) {
          if (result) {
            q.resolve(result);
          } else {
            q.reject(result);
          }
        }, scope);

        return q.promise;
      },

      getAllIds: function (scope) {
        var q = $q.defer();
        scope = scope || null;

        $window.cordova.plugins.notification.local.getAllIds(function (result) {
          q.resolve(result);
        }, scope);

        return q.promise;
      },

      getIds: function (scope) {
        var q = $q.defer();
        scope = scope || null;

        $window.cordova.plugins.notification.local.getIds(function (result) {
          q.resolve(result);
        }, scope);

        return q.promise;
      },

      getScheduledIds: function (scope) {
        var q = $q.defer();
        scope = scope || null;

        $window.cordova.plugins.notification.local.getScheduledIds(function (result) {
          q.resolve(result);
        }, scope);

        return q.promise;
      },

      getTriggeredIds: function (scope) {
        var q = $q.defer();
        scope = scope || null;

        $window.cordova.plugins.notification.local.getTriggeredIds(function (result) {
          q.resolve(result);
        }, scope);

        return q.promise;
      },

      get: function (ids, scope) {
        var q = $q.defer();
        scope = scope || null;

        $window.cordova.plugins.notification.local.get(ids, function (result) {
          q.resolve(result);
        }, scope);

        return q.promise;
      },

      getAll: function (scope) {
        var q = $q.defer();
        scope = scope || null;

        $window.cordova.plugins.notification.local.getAll(function (result) {
          q.resolve(result);
        }, scope);

        return q.promise;
      },

      getScheduled: function (ids, scope) {
        var q = $q.defer();
        scope = scope || null;

        $window.cordova.plugins.notification.local.getScheduled(ids, function (result) {
          q.resolve(result);
        }, scope);

        return q.promise;
      },

      getAllScheduled: function (scope) {
        var q = $q.defer();
        scope = scope || null;

        $window.cordova.plugins.notification.local.getAllScheduled(function (result) {
          q.resolve(result);
        }, scope);

        return q.promise;
      },

      getTriggered: function (ids, scope) {
        var q = $q.defer();
        scope = scope || null;

        $window.cordova.plugins.notification.local.getTriggered(ids, function (result) {
          q.resolve(result);
        }, scope);

        return q.promise;
      },

      getAllTriggered: function (scope) {
        var q = $q.defer();
        scope = scope || null;

        $window.cordova.plugins.notification.local.getAllTriggered(function (result) {
          q.resolve(result);
        }, scope);

        return q.promise;
      },

      getDefaults: function () {
        return $window.cordova.plugins.notification.local.getDefaults();
      },

      setDefaults: function (Object) {
        $window.cordova.plugins.notification.local.setDefaults(Object);
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

// install   :      cordova plugin add cordova-plugin-media
// link      :      https://github.com/apache/cordova-plugin-media

/* globals Media: true */
angular.module('ngCordova.plugins.media', [])

.service('NewMedia', ['$q', '$interval', function ($q, $interval) {
  var q, q2, q3, mediaStatus = null, mediaPosition = -1, mediaTimer, mediaDuration = -1;

  function setTimer(media) {
      if (angular.isDefined(mediaTimer)) {
        return;
      }

      mediaTimer = $interval(function () {
          if (mediaDuration < 0) {
              mediaDuration = media.getDuration();
              if (q && mediaDuration > 0) {
                q.notify({duration: mediaDuration});
              }
          }

          media.getCurrentPosition(
            // success callback
            function (position) {
                if (position > -1) {
                    mediaPosition = position;
                }
            },
            // error callback
            function (e) {
                console.log('Error getting pos=' + e);
            });

          if (q) {
            q.notify({position: mediaPosition});
          }

      }, 1000);
  }

  function clearTimer() {
      if (angular.isDefined(mediaTimer)) {
          $interval.cancel(mediaTimer);
          mediaTimer = undefined;
      }
  }

  function resetValues() {
      mediaPosition = -1;
      mediaDuration = -1;
  }

  function NewMedia(src) {
      this.media = new Media(src,
        function (success) {
            clearTimer();
            resetValues();
            q.resolve(success);
        }, function (error) {
            clearTimer();
            resetValues();
            q.reject(error);
        }, function (status) {
            mediaStatus = status;
            q.notify({status: mediaStatus});
        });
  }

  // iOS quirks :
  // -  myMedia.play({ numberOfLoops: 2 }) -> looping
  // -  myMedia.play({ playAudioWhenScreenIsLocked : false })
  NewMedia.prototype.play = function (options) {
      q = $q.defer();

      if (typeof options !== 'object') {
          options = {};
      }

      this.media.play(options);

      setTimer(this.media);

      return q.promise;
  };

  NewMedia.prototype.pause = function () {
      clearTimer();
      this.media.pause();
  };

  NewMedia.prototype.stop  = function () {
      this.media.stop();
  };

  NewMedia.prototype.release  = function () {
      this.media.release();
      this.media = undefined;
  };

  NewMedia.prototype.seekTo  = function (timing) {
      this.media.seekTo(timing);
  };

  NewMedia.prototype.setVolume = function (volume) {
      this.media.setVolume(volume);
  };

  NewMedia.prototype.startRecord = function () {
      this.media.startRecord();
  };

  NewMedia.prototype.stopRecord  = function () {
      this.media.stopRecord();
  };

  NewMedia.prototype.currentTime = function () {
      q2 = $q.defer();
      this.media.getCurrentPosition(function (position){
      q2.resolve(position);
      });
      return q2.promise;
  };

  NewMedia.prototype.getDuration = function () {
    q3 = $q.defer();
    this.media.getDuration(function (duration){
    q3.resolve(duration);
    });
    return q3.promise;
  };

  return NewMedia;

}])
.factory('$cordovaMedia', ['NewMedia', function (NewMedia) {
  return {
      newMedia: function (src) {
          return new NewMedia(src);
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
  'ngCordova.plugins.batteryStatus',
  'ngCordova.plugins.beacon',
  'ngCordova.plugins.ble',
  'ngCordova.plugins.bluetoothSerial',
  'ngCordova.plugins.brightness',
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
  'ngCordova.plugins.fileTransfer',
  'ngCordova.plugins.fileOpener2',
  'ngCordova.plugins.flashlight',
  'ngCordova.plugins.flurryAds',
  'ngCordova.plugins.ga',
  'ngCordova.plugins.geolocation',
  'ngCordova.plugins.globalization',
  'ngCordova.plugins.googleAds',
  'ngCordova.plugins.googleAnalytics',
  'ngCordova.plugins.googleMap',
  'ngCordova.plugins.googlePlayGame',
  'ngCordova.plugins.googlePlus',
  'ngCordova.plugins.healthKit',
  'ngCordova.plugins.httpd',
  'ngCordova.plugins.iAd',
  'ngCordova.plugins.imagePicker',
  'ngCordova.plugins.inAppBrowser',
  'ngCordova.plugins.instagram',
  'ngCordova.plugins.keyboard',
  'ngCordova.plugins.keychain',
  'ngCordova.plugins.launchNavigator',
  'ngCordova.plugins.localNotification',
  'ngCordova.plugins.media',
  'ngCordova.plugins.mMediaAds',
  'ngCordova.plugins.mobfoxAds',
  'ngCordova.plugins.mopubAds',
  'ngCordova.plugins.nativeAudio',
  'ngCordova.plugins.network',
  'ngCordova.plugins.pinDialog',
  'ngCordova.plugins.preferences',
  'ngCordova.plugins.printer',
  'ngCordova.plugins.progressIndicator',
  'ngCordova.plugins.push',
  'ngCordova.plugins.push_v5',
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
  'ngCordova.plugins.zip',
  'ngCordova.plugins.insomnia'
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

      preloadComplex: function (id, assetPath, volume, voices, delay) {
        var q = $q.defer();
        $window.plugins.NativeAudio.preloadComplex(id, assetPath, volume, voices, delay, function (result) {
          q.resolve(result);
        }, function (err) {
          q.reject(err);
        });

        return q.promise;
      },

      play: function (id, completeCallback) {
        var q = $q.defer();
        $window.plugins.NativeAudio.play(id, function (result) {
          q.resolve(result);
        }, function (err) {
          q.reject(err);
        }, completeCallback);

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

// install   :      cordova plugin add cordova-plugin-network-information
// link      :      https://github.com/apache/cordova-plugin-network-information

/* globals Connection: true */
angular.module('ngCordova.plugins.network', [])

  .factory('$cordovaNetwork', ['$rootScope', '$timeout', function ($rootScope, $timeout) {

    /**
      * Fires offline a event
      */
    var offlineEvent = function () {
      var networkState = navigator.connection.type;
      $timeout(function () {
        $rootScope.$broadcast('$cordovaNetwork:offline', networkState);
      });
    };

    /**
      * Fires online a event
      */
    var onlineEvent = function () {
      var networkState = navigator.connection.type;
      $timeout(function () {
        $rootScope.$broadcast('$cordovaNetwork:online', networkState);
      });
    };

    document.addEventListener('deviceready', function () {
      if (navigator.connection) {
        document.addEventListener('offline', offlineEvent, false);
        document.addEventListener('online', onlineEvent, false);
      }
    });

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

      clearOfflineWatch: function () {
        document.removeEventListener('offline', offlineEvent);
        $rootScope.$$listeners['$cordovaNetwork:offline'] = [];
      },

      clearOnlineWatch: function () {
        document.removeEventListener('online', onlineEvent);
        $rootScope.$$listeners['$cordovaNetwork:online'] = [];
      }
    };
  }])
  .run(['$injector', function ($injector) {
    $injector.get('$cordovaNetwork'); //ensure the factory always gets initialised
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

// install   :      cordova plugin add cordova-plugin-app-preferences
// link      :      https://github.com/apla/me.apla.cordova.app-preferences

angular.module('ngCordova.plugins.preferences', [])

  .factory('$cordovaPreferences', ['$window', '$q', function ($window, $q) {

     return {
         
         pluginNotEnabledMessage: 'Plugin not enabled',
    	
    	/**
    	 * Decorate the promise object.
    	 * @param promise The promise object.
    	 */
    	decoratePromise: function (promise){
    		promise.success = function (fn) {
	            promise.then(fn);
	            return promise;
	        };

	        promise.error = function (fn) {
	            promise.then(null, fn);
	            return promise;
	        };
    	},
    	
    	/**
    	 * Store the value of the given dictionary and key.
    	 * @param key The key of the preference.
    	 * @param value The value to set.
         * @param dict The dictionary. It's optional.
         * @returns Returns a promise.
    	 */
	    store: function (key, value, dict) {
	    	var deferred = $q.defer();
	    	var promise = deferred.promise;
            
            function ok(value){
                deferred.resolve(value);
            }
            
            function errorCallback(error){
                deferred.reject(new Error(error));
            }
            
            if($window.plugins){
                var storeResult;
                if(arguments.length === 3){
                    storeResult = $window.plugins.appPreferences.store(dict, key, value);
                } else {
                    storeResult = $window.plugins.appPreferences.store(key, value);
                }
                
                storeResult.then(ok, errorCallback);
            } else {
                deferred.reject(new Error(this.pluginNotEnabledMessage));
            }
            
	    	this.decoratePromise(promise);
	    	return promise;
	    },
	    
	    /**
	     * Fetch the value by the given dictionary and key.
	     * @param key The key of the preference to retrieve.
         * @param dict The dictionary. It's optional.
         * @returns Returns a promise.
	     */
	    fetch: function (key, dict) {
	    	var deferred = $q.defer();
	    	var promise = deferred.promise;
            
            function ok(value){
                deferred.resolve(value);
            }
            
            function errorCallback(error){
                deferred.reject(new Error(error));
            }
            
            if($window.plugins){
                var fetchResult;
                if(arguments.length === 2){
                    fetchResult = $window.plugins.appPreferences.fetch(dict, key);
                } else {
                    fetchResult = $window.plugins.appPreferences.fetch(key);
                }
                fetchResult.then(ok, errorCallback);
            } else {
                deferred.reject(new Error(this.pluginNotEnabledMessage));
            }
            
	    	this.decoratePromise(promise);
	    	return promise;
	    },
        
        /**
	     * Remove the value by the given key.
	     * @param key The key of the preference to retrieve.
         * @param dict The dictionary. It's optional.
         * @returns Returns a promise.
	     */
	    remove: function (key, dict) {
	    	var deferred = $q.defer();
	    	var promise = deferred.promise;
            
            function ok(value){
                deferred.resolve(value);
            }
            
            function errorCallback(error){
                deferred.reject(new Error(error));
            }
            
            if($window.plugins){
                var removeResult;
                if(arguments.length === 2){
                    removeResult = $window.plugins.appPreferences.remove(dict, key);
                } else {
                    removeResult = $window.plugins.appPreferences.remove(key);
                }
                removeResult.then(ok, errorCallback);
            } else {
                deferred.reject(new Error(this.pluginNotEnabledMessage));
            }
	    	
	    	this.decoratePromise(promise);
	    	return promise;
	    },
        
        /**
	     * Show the application preferences.
         * @returns Returns a promise.
	     */
	    show: function () {
	    	var deferred = $q.defer();
	    	var promise = deferred.promise;
            
            function ok(value){
                deferred.resolve(value);
            }
            
            function errorCallback(error){
                deferred.reject(new Error(error));
            }
            
            if($window.plugins){
                $window.plugins.appPreferences.show()
                    .then(ok, errorCallback);
            } else {
                deferred.reject(new Error(this.pluginNotEnabledMessage));
            }
	    	
	    	this.decoratePromise(promise);
	    	return promise;
	    }
    };

  }]);

// install   : cordova plugin add https://github.com/katzer/cordova-plugin-printer.git
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

// install   :      cordova plugin add https://github.com/pbernasconi/cordova-progressIndicator.git
// link      :      http://pbernasconi.github.io/cordova-progressIndicator/

/* globals ProgressIndicator: true */
angular.module('ngCordova.plugins.progressIndicator', [])

  .factory('$cordovaProgress', [function () {

    return {
      show: function (_message) {
        var message = _message || 'Please wait...';
        return ProgressIndicator.show(message);
      },

      showSimple: function (_dim) {
        var dim = _dim || false;
        return ProgressIndicator.showSimple(dim);
      },

      showSimpleWithLabel: function (_dim, _label) {
        var dim = _dim || false;
        var label = _label || 'Loading...';
        return ProgressIndicator.showSimpleWithLabel(dim, label);
      },

      showSimpleWithLabelDetail: function (_dim, _label, _detail) {
        var dim = _dim || false;
        var label = _label || 'Loading...';
        var detail = _detail || 'Please wait';
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
        var label = _label || 'Loading...';

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
        var label = _label || 'Loading...';
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
        var label = _label || 'Loading...';
        return ProgressIndicator.showBarWithLabel(dim, timeout, label);
      },

      showSuccess: function (_dim, _label) {
        var dim = _dim || false;
        var label = _label || 'Success';
        return ProgressIndicator.showSuccess(dim, label);
      },

      showText: function (_dim, _text, _position) {
        var dim = _dim || false;
        var text = _text || 'Warning';
        var position = _position || 'center';
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

  .factory('$cordovaPush', ['$q', '$window', '$rootScope', '$timeout', function ($q, $window, $rootScope, $timeout) {

    return {
      onNotification: function (notification) {
        $timeout(function () {
          $rootScope.$broadcast('$cordovaPush:notificationReceived', notification);
        });
      },

      register: function (config) {
        var q = $q.defer();
        var injector;
        if (config !== undefined && config.ecb === undefined) {
          if (document.querySelector('[ng-app]') === null) {
            injector = 'document.body';
          }
          else {
            injector = 'document.querySelector(\'[ng-app]\')';
          }
          config.ecb = 'angular.element(' + injector + ').injector().get(\'$cordovaPush\').onNotification';
        }

        $window.plugins.pushNotification.register(function (token) {
          q.resolve(token);
        }, function (error) {
          q.reject(error);
        }, config);

        return q.promise;
      },

      unregister: function (options) {
        var q = $q.defer();
        $window.plugins.pushNotification.unregister(function (result) {
          q.resolve(result);
        }, function (error) {
          q.reject(error);
        }, options);

        return q.promise;
      },

      // iOS only
      setBadgeNumber: function (number) {
        var q = $q.defer();
        $window.plugins.pushNotification.setApplicationIconBadgeNumber(function (result) {
          q.resolve(result);
        }, function (error) {
          q.reject(error);
        }, number);
        return q.promise;
      }
    };
  }]);


// install   :      cordova plugin add phonegap-plugin-push
// link      :      https://github.com/phonegap/phonegap-plugin-push

angular.module('ngCordova.plugins.push_v5', [])
  .factory('$cordovaPushV5',['$q', '$rootScope', '$timeout', function ($q, $rootScope, $timeout) {
   /*global PushNotification*/

    var push;
    return {
      initialize : function (options) {
        var q = $q.defer();
        push = PushNotification.init(options);
        q.resolve(push);
        return q.promise;
      },
      onNotification : function () {
        $timeout(function () {
          push.on('notification', function (notification) {
            $rootScope.$emit('$cordovaPushV5:notificationReceived', notification);
          });
        });
      },
      onError : function () {
        $timeout(function () {
          push.on('error', function (error) { $rootScope.$emit('$cordovaPushV5:errorOccurred', error);});
        });
      },
      register : function () {
        var q = $q.defer();
        if (push === undefined) {
          q.reject(new Error('init must be called before any other operation'));
        } else {
          push.on('registration', function (data) {
            q.resolve(data.registrationId);
          });
        }
        return q.promise;
      },
      unregister : function () {
        var q = $q.defer();
        if (push === undefined) {
          q.reject(new Error('init must be called before any other operation'));
        } else {
          push.unregister(function (success) {
            q.resolve(success);
          },function (error) {
            q.reject(error);
          });
        }
        return q.promise;
      },
      getBadgeNumber : function () {
        var q = $q.defer();
        if (push === undefined) {
          q.reject(new Error('init must be called before any other operation'));
        } else {
          push.getApplicationIconBadgeNumber(function (success) {
            q.resolve(success);
          }, function (error) {
            q.reject(error);
          });
        }
        return q.promise;
      },
      setBadgeNumber : function (number) {
        var q = $q.defer();
        if (push === undefined) {
          q.reject(new Error('init must be called before any other operation'));
        } else {
          push.setApplicationIconBadgeNumber(function (success) {
            q.resolve(success);
          }, function (error) {
            q.reject(error);
          }, number);
        }
        return q.promise;
      },
      finish: function (){
        var q = $q.defer();
        if (push === undefined) {
          q.reject(new Error('init must be called before any other operation'));
        } else {
          push.finish(function (success) {
            q.resolve(success);
          }, function (error) {
            q.reject(error);
          });
        }
        return q.promise;
      }
    };
  }]);

// install   :     cordova plugin add https://github.com/gitawego/cordova-screenshot.git
// link      :     https://github.com/gitawego/cordova-screenshot

angular.module('ngCordova.plugins.screenshot', [])
.factory('$cordovaScreenshot', ['$q', function ($q) {
  return {
    captureToFile: function (opts) {

      var options = opts || {};

      var extension = options.extension || 'jpg';
      var quality = options.quality || '100';

      var defer = $q.defer();

      if (!navigator.screenshot) {
        defer.resolve(null);
        return defer.promise;
      }

      navigator.screenshot.save(function (error, res) {
        if (error) {
          defer.reject(error);
        } else {
          defer.resolve(res.filePath);
        }
      }, extension, quality, options.filename);

      return defer.promise;
    },
    captureToUri: function (opts) {

      var options = opts || {};

      var extension = options.extension || 'jpg';
      var quality = options.quality || '100';

      var defer = $q.defer();

      if (!navigator.screenshot) {
        defer.resolve(null);
        return defer.promise;
      }

      navigator.screenshot.URI(function (error, res) {
        if (error) {
          defer.reject(error);
        } else {
          defer.resolve(res.URI);
        }
      }, extension, quality, options.filename);

      return defer.promise;
    }
  };
}]);
// install   :      cordova plugin add https://github.com/cordova-sms/cordova-sms-plugin.git
// link      :      https://github.com/cordova-sms/cordova-sms-plugin

/* globals sms: true */
angular.module('ngCordova.plugins.sms', [])

  .factory('$cordovaSms', ['$q', function ($q) {

    return {
      send: function (number, message, options) {
        var q = $q.defer();
        sms.send(number, message, options, function (res) {
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
        subject = subject || null;
        file = file || null;
        link = link || null;
        $window.plugins.socialsharing.share(message, subject, file, link, function () {
          q.resolve(true);
        }, function () {
          q.reject(false);
        });
        return q.promise;
      },

      shareViaTwitter: function (message, file, link) {
        var q = $q.defer();
        file = file || null;
        link = link || null;
        $window.plugins.socialsharing.shareViaTwitter(message, file, link, function () {
          q.resolve(true);
        }, function () {
          q.reject(false);
        });
        return q.promise;
      },

      shareViaWhatsApp: function (message, file, link) {
        var q = $q.defer();
        file = file || null;
        link = link || null;
        $window.plugins.socialsharing.shareViaWhatsApp(message, file, link, function () {
          q.resolve(true);
        }, function () {
          q.reject(false);
        });
        return q.promise;
      },

      shareViaFacebook: function (message, file, link) {
        var q = $q.defer();
        message = message || null;
        file = file || null;
        link = link || null;
        $window.plugins.socialsharing.shareViaFacebook(message, file, link, function () {
          q.resolve(true);
        }, function () {
          q.reject(false);
        });
        return q.promise;
      },

      shareViaFacebookWithPasteMessageHint: function (message, file, link, pasteMessageHint) {
        var q = $q.defer();
        file = file || null;
        link = link || null;
        $window.plugins.socialsharing.shareViaFacebookWithPasteMessageHint(message, file, link, pasteMessageHint, function () {
          q.resolve(true);
        }, function () {
          q.reject(false);
        });
        return q.promise;
      },

      shareViaSMS: function (message, commaSeparatedPhoneNumbers) {
        var q = $q.defer();
        $window.plugins.socialsharing.shareViaSMS(message, commaSeparatedPhoneNumbers, function () {
          q.resolve(true);
        }, function () {
          q.reject(false);
        });
        return q.promise;
      },

      shareViaEmail: function (message, subject, toArr, ccArr, bccArr, fileArr) {
        var q = $q.defer();
        toArr = toArr || null;
        ccArr = ccArr || null;
        bccArr = bccArr || null;
        fileArr = fileArr || null;
        $window.plugins.socialsharing.shareViaEmail(message, subject, toArr, ccArr, bccArr, fileArr, function () {
          q.resolve(true);
        }, function () {
          q.reject(false);
        });
        return q.promise;
      },

      shareVia: function (via, message, subject, file, link) {
        var q = $q.defer();
        message = message || null;
        subject = subject || null;
        file = file || null;
        link = link || null;
        $window.plugins.socialsharing.shareVia(via, message, subject, file, link, function () {
          q.resolve(true);
        }, function () {
          q.reject(false);
        });
        return q.promise;
      },

      canShareViaEmail: function () {
        var q = $q.defer();
        $window.plugins.socialsharing.canShareViaEmail(function () {
          q.resolve(true);
        }, function () {
          q.reject(false);
        });
        return q.promise;
      },

      canShareVia: function (via, message, subject, file, link) {
        var q = $q.defer();
        $window.plugins.socialsharing.canShareVia(via, message, subject, file, link, function (success) {
          q.resolve(success);
        }, function (error) {
          q.reject(error);
        });
        return q.promise;
      },

      available: function () {
        var q = $q.defer();
        window.plugins.socialsharing.available(function (isAvailable) {
          if (isAvailable) {
            q.resolve();
          }
          else {
            q.reject();
          }
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

// install   :      cordova plugin add cordova-plugin-splashscreen
// link      :      https://github.com/apache/cordova-plugin-splashscreen

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

// install   :      cordova plugin add https://github.com/litehelpers/Cordova-sqlite-storage.git
// link      :      https://github.com/litehelpers/Cordova-sqlite-storage

angular.module('ngCordova.plugins.sqlite', [])

  .factory('$cordovaSQLite', ['$q', '$window', function ($q, $window) {

    return {
      openDB: function (options, background) {

        if (angular.isObject(options) && !angular.isString(options)) {
          if (typeof background !== 'undefined') {
            options.bgType = background;
          }
          return $window.sqlitePlugin.openDatabase(options);
        }

        return $window.sqlitePlugin.openDatabase({
          name: options,
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

// install   :      cordova plugin add cordova-plugin-statusbar
// link      :      https://github.com/apache/cordova-plugin-statusbar

/* globals StatusBar: true */
angular.module('ngCordova.plugins.statusbar', [])

.factory('$cordovaStatusbar', [function () {

  return {

    /**
      * @param {boolean} bool
      */
    overlaysWebView: function (bool) {
      return StatusBar.overlaysWebView(!!bool);
    },

    STYLES: {
      DEFAULT: 0,
      LIGHT_CONTENT: 1,
      BLACK_TRANSLUCENT: 2,
      BLACK_OPAQUE: 3
    },

    /**
      * @param {number} style
      */
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
      },

      hide: function () {
        var q = $q.defer();
        try {
          $window.plugins.toast.hide();
          q.resolve();
        } catch (error) {
          q.reject(error && error.message);
        }
        return q.promise;
      }
    };

  }]);

// install   :      cordova plugin add https://github.com/leecrossley/cordova-plugin-touchid.git
// link      :      https://github.com/leecrossley/cordova-plugin-touchid

/* globals touchid: true */
angular.module('ngCordova.plugins.touchid', [])

  .factory('$cordovaTouchID', ['$q', function ($q) {

    return {
      checkSupport: function () {
        var defer = $q.defer();
        if (!window.cordova) {
          defer.reject('Not supported without cordova.js');
        } else {
          touchid.checkSupport(function (value) {
            defer.resolve(value);
          }, function (err) {
            defer.reject(err);
          });
        }

        return defer.promise;
      },

      authenticate: function (authReasonText) {
        var defer = $q.defer();
        if (!window.cordova) {
          defer.reject('Not supported without cordova.js');
        } else {
          touchid.authenticate(function (value) {
            defer.resolve(value);
          }, function (err) {
            defer.reject(err);
          }, authReasonText);
        }

        return defer.promise;
      }
    };
  }]);

// install   :      cordova plugin add https://github.com/aerogear/aerogear-cordova-push.git
// link      :      https://github.com/aerogear/aerogear-cordova-push

angular.module('ngCordova.plugins.upsPush', [])

  .factory('$cordovaUpsPush', ['$q', '$window', '$rootScope', '$timeout', function ($q, $window, $rootScope, $timeout) {
    return {
      register: function (config) {
        var q = $q.defer();

        $window.push.register(function (notification) {
          $timeout(function () {
            $rootScope.$broadcast('$cordovaUpsPush:notificationReceived', notification);
          });
        }, function () {
          q.resolve();
        }, function (error) {
          q.reject(error);
        }, config);

        return q.promise;
      },

      unregister: function (options) {
        var q = $q.defer();
        $window.push.unregister(function () {
          q.resolve();
        }, function (error) {
          q.reject(error);
        }, options);

        return q.promise;
      },

      // iOS only
      setBadgeNumber: function (number) {
        var q = $q.defer();
        $window.push.setApplicationIconBadgeNumber(function () {
          q.resolve();
        }, number);
        return q.promise;
      }
    };
  }]);

// install   :      cordova plugin add cordova-plugin-vibration
// link      :      https://github.com/apache/cordova-plugin-vibration

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