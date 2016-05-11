/*!
 * ngCordova
 * v0.1.26-alpha
 * Copyright 2015 Drifty Co. http://drifty.com/
 * See LICENSE in this repository for license information
 */
(function(){
var ngCordovaMocks = angular.module('ngCordovaMocks', []);
/**
 * @ngdoc service
 * @name ngCordovaMocks.cordovaActionSheet
 *
 * @description
 * A service for testing action sheet
 * in an app build with ngCordova.
 **/
ngCordovaMocks.factory('$cordovaActionSheet', ['$q', function ($q) {
  var throwsError = false;

	return {
		/**
		 * @ngdoc property
		 * @name throwsError
		 * @propertyOf ngCordovaMocks.cordovaActionSheet
		 * @type Boolean
		 *
		 * @description
		 * A flag that signals whether a promise should be rejected.
		 * This property should only be used in automated tests
		 */
		throwsError: throwsError,

		show: function () {
			var defer = $q.defer();

			if (this.throwsError) {
				defer.reject('There was an error on showing action sheet');
			} else {
				defer.resolve();
			}

			return defer.promise;
		}
	};
}]);

ngCordovaMocks.factory('$cordovaAppVersion', ['$q', function ($q) {
  var throwsError = false;
  return {
    throwsError: throwsError,
    getAppVersion: function () {
      var defer = $q.defer();
      defer.resolve('mock v');
      return defer.promise;
    }
  };
}]);

/**
 * @ngdoc service
 * @name ngCordovaMocks.cordovaBarcodeScanner
 *
 * @description
 * A service for testing barcode scanner features
 * in an app build with ngCordova.
 **/
ngCordovaMocks.factory('$cordovaBarcodeScanner', ['$q', function ($q) {
  var throwsError = false;

  var scannedText = '';
  var scannedFormat = '';
  var wasCancelled = false;

  return {
    /**
     * @ngdoc property
     * @name throwsError
     * @propertyOf ngCordovaMocks.cordovaBarcodeScanner
     *
     * @description
     * A flag that signals whether a promise should be rejected or not.
     * This property should only be used in automated tests.
     **/
    throwsError: throwsError,

    /**
     * @ngdoc property
     * @name scannedText
     * @propertyOf ngCordovaMocks.cordovaBarcodeScanner
     *
     * @description
     * Used to simulate the result.text property of a
     * successful scan. For more information, see the text at
     * https://github.com/wildabeast/BarcodeScanner/#using-the-plugin
     * This property should only be used in automated tests.
     **/
    scannedText: scannedText,

    /**
     * @ngdoc property
     * @name scannedFormat
     * @propertyOf ngCordovaMocks.cordovaBarcodeScanner
     * @description
     * Used to simulate the result.format property of a
     * successful scan. For more information, see the text at
     * https://github.com/wildabeast/BarcodeScanner/#using-the-plugin
     * This property should only be used in automated tests.
     **/
    scannedFormat: scannedFormat,

    /**
     * @ngdoc property
     * @name wasCancelled
     * @propertyOf ngCordovaMocks.cordovaBarcodeScanner
     *
     * @description
     * Used to simulate the result.cancelled property of a
     * successful scan. For more information, see the text at
     * https://github.com/wildabeast/BarcodeScanner/#using-the-plugin
     * This property should only be used in automated tests.
     **/
    wasCancelled: wasCancelled,

    scan: function () {
      var defer = $q.defer();
      if (this.throwsError) {
        defer.reject('There was an error scanning.');
      } else {
        defer.resolve({text: this.scannedText, format: this.scannedFormat, cancelled: this.wasCancelled});
      }

      return defer.promise;
    },

    encode: function (type, data) {
      this.scannedFormat = type;
      this.scannedText = data;

      var defer = $q.defer();
      if (this.throwsError) {
        defer.reject('There was an error encoding the data.');
      } else {
        defer.resolve();
      }

      return defer.promise;
    }
  };
}]);

/**
 * @ngdoc service
 * @name ngCordovaMocks.cordovaBLE
 *
 * @description
 * A service for ble features
 * in an app build with ngCordova.
 **/
ngCordovaMocks.factory('$cordovaBLE', ['$q', '$timeout', '$interval', '$log', function ($q, $timeout, $interval, $log) {
  var deviceScan = {
    name: 'Test Device',
    id: 'AA:BB:CC:DD:EE:FF',
    advertising: [2, 1, 6, 3, 3, 15, 24, 8, 9, 66, 97, 116, 116, 101, 114, 121],
    rssi: -55
  };

  var deviceConnect = {
    name: 'Test Device',
    id: 'AA:BB:CC:DD:EE:FF',
    advertising: [2, 1, 6, 3, 3, 15, 24, 8, 9, 66, 97, 116, 116, 101, 114, 121],
    rssi: -55,
    services: [
      '1800',
      '1801',
      '180f'
    ],
    characteristics: [
      {
        service: '1800',
        characteristic: '2a00',
        properties: ['Read']
      },
      {
        service: '1800',
        characteristic: '2a01',
        properties: ['Read']
      },
      {
        service: '1801',
        characteristic: '2a05',
        properties: ['Read']
      },
      {
        service: '180f',
        characteristic: '2a19',
        properties: ['Read'],
        descriptors: [{'uuid': '2901'}, {'uuid': '2904'}]
      }
    ]
  };

  var readData = new ArrayBuffer(8);

  return {

    scan: function (services, seconds) {
      var q = $q.defer();

      // first notify about discovered device
      $timeout(function () {
        q.notify(deviceScan);
      }, Math.round(seconds * 1000 * Math.random()));

      // end scan
      $timeout(function () {
        q.resolve();
      }, seconds * 1000);

      return q.promise;
    },

    startScan: function (services, callback, errorCallback) {
      $timeout(function () {
        callback(deviceScan);
      }, Math.round(1000 * Math.random()));
    },

    stopScan: function () {
      var q = $q.defer();
      $timeout(function () {
        q.resolve();
      }, 500);
      return q.promise;
    },

    connect: function (deviceID) {
      var q = $q.defer();
      $timeout(function () {
        q.resolve(deviceConnect);
      }, 1500);
      return q.promise;
    },

    disconnect: function (deviceID) {
      var q = $q.defer();
      $timeout(function () {
        q.resolve(true);
      }, 500);
      return q.promise;
    },

    read: function (deviceID, serviceUUID, characteristicUUID) {
      var q = $q.defer();
      $timeout(function () {
        q.resolve(readData);
      }, 100);
      return q.promise;
    },

    write: function (deviceID, serviceUUID, characteristicUUID, data) {
      var q = $q.defer();
      $timeout(function () {
        q.resolve(true);
      }, 100);
      return q.promise;
    },

    writeWithoutResponse: function (deviceID, serviceUUID, characteristicUUID, data) {
      var q = $q.defer();
      $timeout(function () {
        q.resolve(true);
      }, 100);
      return q.promise;
    },

    writeCommand: function (deviceID, serviceUUID, characteristicUUID, data) {
      $log.warning('writeCommand is deprecated, use writeWithoutResponse');
      return this.writeWithoutResponse(deviceID, serviceUUID, characteristicUUID, data);
    },

    startNotification: function (deviceID, serviceUUID, characteristicUUID, callback, errorCallback) {
      $interval(function () {
        var data = new Uint8Array([Math.round(255 * Math.random())]); // one byte with random number
        callback(data);
      }, 200, 10); // repeat 10 times with 200 ms delay for each
    },

    stopNotification: function (deviceID, serviceUUID, characteristicUUID) {
      var q = $q.defer();
      $timeout(function () {
        q.resolve();
      }, 100);
      return q.promise;
    },

    isConnected: function (deviceID) {
      var q = $q.defer();
      q.resolve(true);
      return q.promise;
    },

    enable: function () {
      var q = $q.defer();
      $timeout(function () {
        q.resolve();
      }, 1500);
      return q.promise;
    },

    isEnabled: function () {
      var q = $q.defer();
      q.resolve(true);
      return q.promise;
    }
  };
}]);

ngCordovaMocks.factory('$cordovaBrightness', ['$q', function ($q) {
	var currentBrightness = 100;

	return {
		get: function () {
			var q = $q.defer();
			q.resolve(currentBrightness);
        	return q.promise;
		},

		set: function (data) {
			var q = $q.defer();
			currentBrightness = data;
			q.resolve('OK');
        	return q.promise;
		},

		setKeepScreenOn: function (bool) {
			var q = $q.defer();
			q.resolve('OK');
			return q.promise;
		}
	};
}]);
/**
 * @ngdoc service
 * @name ngCordovaMocks.cordovaCamera
 *
 * @description
 * A service for testing camera features
 * in an app build with ngCordova.
 **/
ngCordovaMocks.factory('$cordovaCamera', ['$q', function ($q) {
  var throwsError = false;
  var imageData = '';

  return {

    /**
     * @ngdoc property
     * @name throwsError
     * @propertyOf ngCordovaMocks.cordovaCamera
     *
     * @description
     * A flag that signals whether a promise should be rejected or not.
     * This property should only be used in automated tests.
     **/
    throwsError: throwsError,

    /**
     * @ngdoc property
     * @name imageData
     * @propertyOf ngCordovaMocks.cordovaCamera
     *
     * @description
     * The imagedata (e.g. an url) which will be returned from the device.
     * This property should only be used in automated tests.
     **/
    imageData: imageData,

    getPicture: function (options) {
      var defer = $q.defer();
      if (this.throwsError) {
        defer.reject('There was an error getting the picture.');
      } else {
        if (options) {
          options = options;	// This is just to get by JSHint.
        }

        defer.resolve(this.imageData);
      }

      return defer.promise;
    }
  };
}]);

/**
 * @ngdoc service
 * @name ngCordovaMocks.cordovaCapture
 *
 * @description
 * A service for testing media capture
 * in an app build with ngCordova.
 *
 * @example
 */
ngCordovaMocks.factory('$cordovaCapture', ['$q', function ($q) {
  var throwsError = false;

  return {
    /**
     * @ngdoc property
     * @name throwsError
     * @propertyOf ngCordovaMocks.cordovaCapture
     *
     * @description
     * A flag that signals whether a promise should be rejected or not.
     * This property should only be used in automated tests.
     **/
    throwsError: throwsError,

    captureAudio: function () {
      var defer = $q.defer();
      if (this.throwsError) {
        defer.reject('There was an error capturing the audio.');
      } else {
        defer.resolve();
      }

      return defer.promise;
    },

    captureImage: function () {
      var defer = $q.defer();
      if (this.throwsError) {
        defer.reject('There was an error capturing the image.');
      } else {
        defer.resolve();
      }

      return defer.promise;
    },

    captureVideo: function () {
      var defer = $q.defer();
      if (this.throwsError) {
        defer.reject('There was an error capturing the video.');
      } else {
        defer.resolve();
      }

      return defer.promise;
    }
  };
}]);

/**
 * @ngdoc service
 * @name ngCordovaMocks.cordovaContacts
 *
 * @description
 * A service for testing features related with contacts
 * in an app build with ngCordova.
 **/
ngCordovaMocks.factory('$cordovaContacts', ['$q', function ($q) {
  var throwsError = false;
  var contacts = [];

  return {
    /**
     @ngdoc property
     @name throwsError
     @propertyOf ngCordovaMocks.cordovaContacts

     @description
     A flag that signals whether a promise should be rejected or not.
     This property should only be used in automated tests.
     */
    throwsError: throwsError,

    /**
     @ngdoc contacts
     @name throwsError
     @propertyOf ngCordovaMocks.cordovaContacts

     @description
     An in-memory collection of contacts.
     This property should only be used in automated tests.
     */
    contacts: contacts,

    save: function (contact) {
      var defer = $q.defer();
      if (this.throwsError) {
        defer.reject('There was an error saving the contact.');
      } else {
        var existingIndex = null;
        for (var i = 0; i < this.contacts.length; i++) {
          // The actual implementation relies on the entire object match.
          // we're gong to rely on the ID.
          if (this.contacts[i].id === contact.id) {
            existingIndex = i;
            break;
          }
        }

        if (existingIndex === null) {
          this.contacts.push(contact);
          defer.resolve();
        } else {
          defer.reject('Contact already exists.');
        }
      }

      return defer.promise;
    },

    remove: function (contact) {
      var defer = $q.defer();
      if (this.throwsError) {
        defer.reject('There was an error saving the contact.');
      } else {
        var toRemove = null;
        for (var i = 0; i < this.contacts.length; i++) {
          // The actual implementation relies on the entire object match.
          // we're gong to rely on the ID.
          if (this.contacts[i].id === contact.id) {
            toRemove = i;
            break;
          }
        }

        if (toRemove === null) {
          defer.reject('Unable to find contact.');
        } else {
          this.contacts.splice(toRemove, 1);
          defer.resolve();
        }
      }

      return defer.promise;
    },

    find: function (options) {
      var defer = $q.defer();
      if (this.throwsError) {
        defer.reject('There was an error finding the contact.');
      } else {
        var fields = options.fields || ['id', 'displayName'];
        delete options.fields;

        if (!fields) {
          defer.reject('ContactError.INVALID_ARGUMENT_ERROR');
        } else {
          if (fields === '*') {
            defer.resolve(this.contacts);
          } else {
            // Implement a very rudimentary search approach for testing purposes.
            // This is NOT exhaustive.
            var results = [];
            for (var i = 0; i < this.contacts.length; i++) {
              for (var key in this.contacts[i]) {
                var propertyValue = this.contacts[i][key];
              }
            }

            // TODO: Search by individual fields
            defer.resolve(results);
          }
        }
      }

      return defer.promise;
    }
  };
}]);

/**
 * @ngdoc service
 * @name ngCordovaMocks.cordovaDatePicker
 *
 * @description
 * A service for testing datepicker features
 * in an app build with ngCordova.
 */
ngCordovaMocks.factory('$cordovaDatePicker', ['$q', function ($q) {
  return {
    show: function (options) {
      var q = $q.defer();
      options = options || {date: new Date(), mode: 'date'};
      q.resolve(options.date);
      return q.promise;
    }
  };
}]);

/**
 * @ngdoc service
 * @name ngCordovaMocks.cordovaDevice
 *
 * @description
 * A service for testing device information
 * in an app build with ngCordova.
 **/
ngCordovaMocks.factory('$cordovaDevice', function () {
  var device = '';
  var cordova = '';
  var model = '';
  var platform = '';
  var uuid = '';
  var version = '';

  return {
    /**
     @ngdoc property
     @name device
     @propertyOf ngCordovaMocks.cordovaDevice

     @description
     The name of the 'device'.
     This property should only be used in automated tests.
     */
    device: device,

    /**
     @ngdoc property
     @name cordova
     @propertyOf ngCordovaMocks.cordovaDevice

     @description
     The version of cordova in use.
     This property should only be used in automated tests.
     */
    cordova: cordova,

    /**
     @ngdoc property
     @name model
     @propertyOf ngCordovaMocks.cordovaDevice

     @description
     The model of the device using the app.
     This property should only be used in automated tests.
     */
    model: model,

    /**
     @ngdoc property
     @name platform
     @propertyOf ngCordovaMocks.cordovaDevice

     @description
     The name of the operating system in use.
     This property should only be used in automated tests.
     */
    platform: platform,

    /**
     @ngdoc property
     @name uuid
     @propertyOf ngCordovaMocks.cordovaDevice

     @description
     The unique identifier of a device.
     This property should only be used in automated tests.
     */
    uuid: uuid,

    /**
     @ngdoc property
     @name version
     @propertyOf ngCordovaMocks.cordovaDevice

     @description
     The version of the operating system.
     This property should only be used in automated tests.
     */
    version: version,

    /**
     @ngdoc property
     @name manufacturer
     @propertyOf ngCordovaMocks.cordovaDevice

     @description
     The manufacturer of the device.
     This property should only be used in automated tests.
     */
    version: version,

    getDevice: function () {
      return this.device;
    },

    getCordova: function () {
      return this.cordova;
    },

    getModel: function () {
      return this.model;
    },

    getPlatform: function () {
      return this.platform;
    },

    getUUID: function () {
      return this.uuid;
    },

    getVersion: function () {
      return this.version;
    },

    getManufacturer: function () {
      return this.manufacturer;
    }
  };
});

/**
 * @ngdoc service
 * @name ngCordovaMocks.cordovaDeviceMotion
 *
 * @description
 * A service for mocking the accelerometer
 * in an app build with ngCordova.
 **/
ngCordovaMocks.factory('$cordovaDeviceMotion', ['$interval', '$q', function ($interval, $q) {
  var currentAcceleration = null;
  var throwsError = false;
  var positions = [];
  var watchIntervals = [];

  return {
    /**
     * @ngdoc property
     * @name currentAcceleration
     * @propertyOf ngCordovaMocks.cordovaDeviceMotion
     *
     * @description
     * The current acceleration.
     * This property should only be used in automated tests.
     **/
    currentAcceleration: currentAcceleration,

    /**
     @ngdoc property
     @name throwsError
     @propertyOf ngCordovaMocks.cordovaDeviceMotion

     @description
     A flag that signals whether a promise should be rejected or not.
     This property should only be used in automated tests.
     */
    throwsError: throwsError,

    /**
     @ngdoc property
     @name positions
     @propertyOf ngCordovaMocks.cordovaDeviceMotion

     @description
     The collection of 'positions' that have been logged.
     This property should only be used in automated tests.
     */
    positions: positions,

    /**
     @ngdoc property
     @name watchIntervals
     @propertyOf ngCordovaMocks.cordovaDeviceMotion

     @description
     The collection of watchers that are currently active.
     This property should only be used in automated tests.
     */
    watchIntervals: watchIntervals,

    getCurrentAcceleration: function () {
      var defer = $q.defer();
      if (this.throwsError) {
        defer.reject('There was an error getting the current acceleration.');
      } else {
        defer.resolve(this.currentAcceleration);
      }

      return defer.promise;
    },

    watchAcceleration: function (options) {
      var defer = $q.defer();
      var watchId = Math.floor((Math.random() * 1000000) + 1);

      this.positions = [];
      self = this;

      if (this.throwsError) {
        defer.reject('There was an error watching the current acceleration.');
      } else {
        var delay = 10000;		// The default based on https://github.com/apache/cordova-plugin-device-motion
        if (options && options.frequency) {
          delay = options.frequency;
        }

        this.watchIntervals.push($interval(
          function () {
            if (self.throwsError) {
              defer.reject('There was an error watching the acceleration.');
            }

            // Generate a random position
            var randomX = Math.floor((Math.random() * 100) + 1);
            var randomY = Math.floor((Math.random() * 100) + 1);
            var randomZ = Math.floor((Math.random() * 100) + 1);
            var result = {x: randomX, y: randomY, z: randomZ, timestamp: Date.now()};

            self.positions.push(result);
            defer.notify(result);
          },
          delay
        ));
      }

      return {
        watchId: watchId,
        promise: defer.promise
      };
    },

    clearWatch: function (watchId) {
      var defer = $q.defer();
      if (watchId) {
        if (this.throwsError) {
          defer.reject('Unable to clear watch.');
        } else {
          var removed = -1;
          for (var i = 0; i < this.watchIntervals.length; i++) {
            if (this.watchIntervals[i].watchId === watchId) {
              $interval.cancel(watchIntervals[i].interval);
              removed = i;
              break;
            }
          }

          if (removed !== -1) {
            this.watchIntervals.splice(removed, 1);
          }
        }
      } else {
        defer.reject('Unable to clear watch. No watch ID provided.');
      }

      return defer.promise;
    }
  };
}]);

/**
 * @ngdoc service
 * @name ngCordovaMocks.cordovaDeviceOrientation
 *
 * @description
 * A service for testing compass fetures
 * in an app build with ngCordova.
 */
ngCordovaMocks.factory('$cordovaDeviceOrientation', ['$interval', '$q', function ($interval, $q) {
  var currentHeading = null;
  var throwsError = false;
  var readings = [];
  var watchIntervals = [];

  return {
    /**
     * @ngdoc property
     * @name currentHeading
     * @propertyOf ngCordovaMocks.cordovaDeviceOrientation
     *
     * @description
     * The current heading.
     * This property should only be used in automated tests.
     **/
    currentHeading: currentHeading,

    /**
     @ngdoc property
     @name throwsError
     @propertyOf ngCordovaMocks.cordovaDeviceOrientation

     @description
     A flag that signals whether a promise should be rejected or not.
     This property should only be used in automated tests.
     */
    throwsError: throwsError,

    /**
     @ngdoc property
     @name positions
     @propertyOf ngCordovaMocks.cordovaDeviceOrientation

     @description
     The collection of compass 'readings' that have been logged.
     This property should only be used in automated tests.
     */
    readings: readings,

    /**
     @ngdoc property
     @name watchIntervals
     @propertyOf ngCordovaMocks.cordovaDeviceOrientation

     @description
     The collection of watchers that are currently active.
     This property should only be used in automated tests.
     */
    watchIntervals: watchIntervals,

    getCurrentHeading: function () {
      var defer = $q.defer();
      if (this.throwsError) {
        defer.reject('There was an error getting the current heading.');
      } else {
        defer.resolve(this.currentHeading);
      }

      return defer.promise;
    },

    watchHeading: function (options) {
      var defer = $q.defer();
      var watchID = Math.floor((Math.random() * 1000000) + 1);
      var self = this;

      self.readings = [];

      if (self.throwsError) {
        defer.reject('There was an error getting the compass heading.');
      } else {
        var delay = 100;		// The default based on https://github.com/apache/cordova-plugin-device-orientation
        if (options && options.frequency) {
          delay = options.frequency;
        }

        self.watchIntervals.push({
          watchID: watchID,
          interval: $interval(
            function () {
              if (self.throwsError) {
                defer.reject('There was an error watching the acceleration.');
              }

              // Generate a random position
              var magneticHeading = (Math.random() * 359.99) + 1;
              var trueHeading = (Math.random() * 359.99) + 1;
              var headingAccuracy = Math.floor((Math.random() * 360) + 1);
              var result = {magneticHeading: magneticHeading, trueHeading: trueHeading, headingAccuracy: headingAccuracy, timestamp: Date.now()};

              self.readings.push(result);
              defer.notify(result);
            },
            delay
          )
        });
      }

      var cancel = function (id) {
        var removed = -1;
        for (var i = 0; i < self.watchIntervals.length; i++) {
          if (self.watchIntervals[i].watchID === id) {
            $interval.cancel(watchIntervals[i].interval);
            removed = i;
            break;
          }
        }

        if (removed !== -1) {
          self.watchIntervals.splice(removed, 1);
        }
      };

      defer.promise.cancel = function () {
        cancel(watchID);
      };

      defer.promise.clearWatch = function (id) {
        cancel(id || watchID);
      };

      defer.promise.watchID = watchID;

      return defer.promise;
    },

    clearWatch: function (watchId) {
      var defer = $q.defer();
      if (watchId) {
        if (this.throwsError) {
          defer.reject('Unable to clear watch.');
        } else {
          var removed = -1;
          for (var i = 0; i < this.watchIntervals.length; i++) {
            if (this.watchIntervals[i].watchId === watchId) {
              $interval.cancel(watchIntervals[i].interval);
              removed = i;
              break;
            }
          }

          if (removed !== -1) {
            this.watchIntervals.splice(removed, 1);
          }
        }
      } else {
        defer.reject('Unable to clear watch. No watch ID provided.');
      }

      return defer.promise;
    }
  };
}]);

/**
 * @ngdoc service
 * @name ngCordovaMocks.cordovaDialogs
 *
 * @description
 * A service for testing dialogs
 * in an app build with ngCordova.
 */
ngCordovaMocks.factory('$cordovaDialogs', ['$q', function ($q) {
  var dialogText = false;
  var dialogTitle = '';
  var defaultValue = '';
  var promptResponse = '';
  var beepCount = 0;
  var useHostAbilities = true;

  return {
    /**
     @ngdoc property
     @name dialogText
     @propertyOf ngCordovaMocks.cordovaDialogs

     @description
     The main content in the dialog.
     This property should only be used in automated tests.
     */
    dialogText: dialogText,

    /**
     @ngdoc property
     @name dialogTitle
     @propertyOf ngCordovaMocks.cordovaDialogs

     @description
     The title of the dialog.
     This property should only be used in automated tests.
     */
    dialogTitle: dialogTitle,

    /**
     @ngdoc property
     @name defaultValue
     @propertyOf ngCordovaMocks.cordovaDialogs

     @description
     The default value to be used in a prompt.
     This property should only be used in automated tests.
     */
    defaultValue: defaultValue,

    /**
     @ngdoc property
     @name promptResponse
     @propertyOf ngCordovaMocks.cordovaDialogs

     @description
     Used to simulate a user's response to a prompt.
     This property should only be used in automated tests.
     */
    promptResponse: promptResponse,

    /**
     @ngdoc property
     @name buttonLabels
     @propertyOf ngCordovaMocks.cordovaDialogs

     @description
     An array of the text of each button in the dialog.
     This property should only be used in automated tests.
     */
    buttonLabels: [],

    /**
     @ngdoc property
     @name beepCount
     @propertyOf ngCordovaMocks.cordovaDialogs

     @description
     The number of times a beep has occurred.
     This property should only be used in automated tests.
     */
    beepCount: beepCount,

    /**
     @ngdoc property
     @name useHostAbilities
     @propertyOf ngCordovaMocks.cordovaDialogs

     @description
     A flag that signals whether or not to try and use the host's
     (browser or otherwise) prompting capabilities.
     This property should only be used in automated tests.
     */
    useHostAbilities: useHostAbilities,

    alert: function (message, title, buttonName) {
      var d = $q.defer();

      if (this.useHostAbilities) {
        // NOTE: The window.alert method doesn't support a title or callbacks.
        alert(message);
        d.resolve();
      } else {
        this.dialogText = message;
        this.dialogTitle = title;
        this.buttonLabels.push(buttonName);
        d.resolve();
      }

      return d.promise;
    },

    confirm: function (message, title, buttonName) {
      var d = $q.defer();

      if (this.useHostAbilities) {
        // NOTE: The window.confirm method doesn't support a title or custom button naming.
        var result = confirm(message);
        d.resolve(result ? 2 : 1);
      } else {
        this.dialogText = message;
        this.dialogTitle = title;
        this.buttonLabels.push(buttonName);
        d.resolve(0);
      }

      return d.promise;
    },

    prompt: function (message, title, buttonLabels, defaultText) {
      var d = $q.defer();

      if (this.useHostAbilities) {
        // NOTE: The window.prompt method doesn't support a title or custom button naming.
        var result = prompt(message, defaultText);
        d.resolve(result);
      } else {
        this.dialogText = message;
        this.dialogTitle = title;
        this.defaultValue = defaultText;

        for (var i = 0; i < buttonLabels.length; i++) {
          this.buttonLabels.push(buttonLabels[i]);
        }

        d.resolve(this.promptResponse);
      }

      return d.promise;
    },

    beep: function (times) {
      this.beepCount = times;
    }
  };
}]);

/**
 * @ngdoc service
 * @name ngCordovaMocks.cordovaFacebook
 *
 * @description
 * A service for testing Facebook features
 * in an app built with ngCordova.
 **/
ngCordovaMocks.factory('$cordovaFacebook', ['$q', function ($q) {
  return {

    /**
     * These properties are here for the purpose of automated testing only.
     **/
    loginShouldSucceedWith: null,
    showDialogShouldSucceedWith: null,
    apiShouldSucceedWith: null,
    getAccessTokenShouldSucceedWith: null,
    getLoginStatusShouldSucceedWith: null,
    logoutShouldSuceedWith: null,

    login: function (permissions) {
      if (this.loginShouldSucceedWith !== null) {
        return $q.when(this.loginShouldSucceedWith);
      } else {
        return $q.reject();
      }
    },

    showDialog: function (options) {
      if (this.showDialogShouldSucceedWith !== null) {
        return $q.when(this.showDialogShouldSucceedWith);
      } else {
        return $q.reject();
      }
    },

    api: function (path, permissions) {
      if (this.apiShouldSucceedWith !== null) {
        return $q.when(this.apiShouldSucceedWith);
      } else {
        return $q.reject();
      }
    },

    getAccessToken: function () {
      if (this.getAccessTokenShouldSucceedWith !== null) {
        return $q.when(this.getAccessTokenShouldSucceedWith);
      } else {
        return $q.reject();
      }
    },

    getLoginStatus: function () {
      if (this.getLoginStatusShouldSucceedWith !== null) {
        return $q.when(this.getLoginStatusShouldSucceedWith);
      } else {
        return $q.reject();
      }
    },

    logout: function () {
      if (this.logoutShouldSuceedWith !== null) {
        return $q.when(this.logoutShouldSuceedWith);
      } else {
        return $q.reject();
      }
    }
  };
}]);

/**
 * @ngdoc service
 * @name ngCordovaMocks.cordovaFile
 *
 * @description
 * A service for testing interaction with device directories and files
 * in an app build with ngCordova.
 */
ngCordovaMocks.factory('$cordovaFile', ['$q', function ($q) {
  var throwsError = false;
  var fileSystem = {};
  var shouldMockFiles = false;
  var files = {};

  var mockIt = function (errorMessage) {
    var defer = $q.defer();
    if (this.throwsError) {
      defer.reject(errorMessage);
    } else {
      defer.resolve();
    }

    return defer.promise;
  };

  return {
    /**
     * @ngdoc property
     * @name throwsError
     * @propertyOf ngCordovaMocks.cordovaFile
     *
     * @description
     * A flag that signals whether a promise should be rejected or not.
     * This property should only be used in automated tests.
     **/
    throwsError: throwsError,

    /**
     * @ngdoc property
     * @name fileSystem
     * @propertyOf ngCordovaMocks.cordovaFile
     *
     * @description
     * A fake, in-memory file system. This is incomplete at this time.
     * This property should only be used in automated tests.
     **/
    fileSystem: fileSystem,

    /**
     * @ngdoc property
     * @name shouldMockFiles
     * @propertyOf ngCordovaMocks.cordovaFile
     *
     * @description
     * A flag that signals whether one wish to mock files.
     * This is useful if you need mocks specific file scenarios.
     * This property should only be used in automated tests.
     **/
    shouldMockFiles: shouldMockFiles,

    /**
     * @ngdoc property
     * @name files
     * @propertyOf ngCordovaMocks.cordovaFile
     *
     * @description
     * An object that may be used for mocking files on the device.
     * This property should only be used in automated tests.
     *
     * **/
    files: files,

    checkDir: function (directory) {
      if (this.shouldMockFiles) {
        var defer = $q.defer();
        if (this.files[directory] && !this.files[directory].isFile) {
          defer.resolve();
        } else {
          defer.reject();
        }

        return defer.promise;
      }

      return mockIt.call(this, 'There was an error checking the directory.');
    },

    createDir: function (directory, overwrite) {
      if (this.shouldMockFiles) {
        var defer = $q.defer();
        this.files[directory] = {isFile: false};
        defer.resolve();
        return defer.promise;
      }

      return mockIt.call(this, 'There was an error creating the directory.');
    },

    listDir: function (filePath) {
      return mockIt.call(this, 'There was an error listing the directory');
    },

    checkFile: function (filePath) {
      if (this.shouldMockFiles) {
        var defer = $q.defer();
        if (this.files[filePath] && this.files[filePath].isFile) {
          defer.resolve();
        } else {
          defer.reject();
        }

        return defer.promise;
      }

      return mockIt.call(this, 'There was an error checking for the file.');
    },

    createFile: function (filePath, overwrite) {
      if (this.shouldMockFiles) {
        var defer = $q.defer();
        this.files[filePath] = {
          isFile: true,
          fileContent: ''
        };
        defer.resolve();
        return defer.promise;
      }

      return mockIt.call(this, 'There was an error creating the file.');
    },

    removeFile: function (directory, file) {
      return mockIt.call(this, 'There was an error removng the file.');
    },

    writeFile: function (filePath, data, options) {
      if (this.shouldMockFiles && filePath && data) {
        this.files[filePath] = {
          isFile: true,
          fileContent: data
        };
      }

      return mockIt.call(this, 'There was an error writing the file.');
    },

    readFile: function (filePath) {
      return this.readAsText(filePath);
    },

    readAsText: function (filePath) {
      if (this.shouldMockFiles) {
        var defer = $q.defer();
        if (files[filePath] && files[filePath].isFile) {
          defer.resolve(files[filePath].fileContent);
        } else {
          defer.reject();
        }

        return defer.promise;
      }

      return mockIt.call(this, 'There was an error reading the file as text.');
    },

    readAsDataURL: function (filePath) {
      return mockIt.call(this, 'There was an error reading the file as a data url.');
    },

    readAsBinaryString: function (filePath) {
      return mockIt.call(this, 'There was an error reading the file as a binary string.');
    },

    readAsArrayBuffer: function (filePath) {
      return mockIt.call(this, 'There was an error reading the file as an array buffer.');
    },

    readFileMetadata: function (filePath) {
      return mockIt.call(this, 'There was an error reading the file metadata');
    },

    readFileAbsolute: function (filePath) {
      return mockIt.call(this, 'There was an error reading the file from the absolute path');
    },

    readFileMetadataAbsolute: function (filePath) {
      return mockIt.call(this, 'There was an error reading the file metadta from the absolute path');
    }
  };
}]);

/**
 * @ngdoc service
 * @name ngCordovaMocks.cordovaFileOpener2
 *
 * @description
 * A service for testing fileOpener2
 * in an app build with ngCordova.
 */
ngCordovaMocks.factory('$cordovaFileOpener2', ['$q', function ($q) {

  var throwsError = false;

  return {

    /**
     * @ngdoc property
     * @name throwsError
     * @propertyOf ngCordovaMocks.cordovaFileOpener2
     *
     * @description
     * A flag that signals whether a promise should be rejected or not.
     * This property should only be used in automated tests.
     **/
    throwsError: throwsError,

    open: function (file, type) {

      var defer = $q.defer();

      if (this.throwError) {
        defer.reject({
          status: 0,
          message: 'There was an error capturing the file.'
        });
      } else {
        defer.resolve();
      }

      return defer.promise;

    },

    uninstall: function (pack) {

      var defer = $q.defer();

      if (this.throwError) {
        defer.reject({
          status: 0,
          message: 'There was an error capturing the packageId.'
        });
      } else {
        defer.resolve();
      }

      return defer.promise;

    },

    appIsInstalled: function (pack) {

      var defer = $q.defer();

      if (this.throwError) {
        defer.reject({
          status: 0,
          message: 'There was an error capturing the packageId.'
        });
      } else {
        defer.resolve();
      }

      return defer.promise;

    }

  };

}]);


/**
 * @ngdoc service
 * @name ngCordovaMocks.cordovaFileTransfer
 *
 * @description
 * A service for testing download and upload
 * in an app build with ngCordova.
 */
ngCordovaMocks.factory('$cordovaFileTransfer', ['$q', function ($q) {
    var throwsError = false;

    var mockIt = function (errorMessage) {
        var defer = $q.defer();
        if (this.throwsError) {
            defer.reject(errorMessage);
        } else {
            defer.resolve();
        }
        return defer.promise;
    };

    return {
        /**
         * @ngdoc property
         * @name throwsError
         * @propertyOf ngCordovaMocks.cordovaFileTransfer
         *
         * @description
         * A flag that signals whether a promise should be rejected or not.
         * This property should only be used in automated tests.
         **/
        throwsError: throwsError,

        download: function (source, filePath, options, trust) {
            return mockIt.call(this, 'There was an error downloading the file.');
        },

        upload: function (server, filePath, options) {
            return mockIt.call(this, 'There was an error uploading the file.'); 
        }
    };
}]);

/**
 * @ngdoc service
 * @name ngCordovaMocks.cordovaGeolocation
 *
 * @description
 * A service for testing location services
 * in an app build with ngCordova.
 */
ngCordovaMocks.factory('$cordovaGeolocation', ['$interval', '$q', function ($interval, $q) {
  var throwsError = false;
  var useHostAbilities = true;

  var watchIntervals = [];
  var locations = [];
  var currentPosition = null;
  var nextPosition = null;

  return {
    /**
     @ngdoc property
     @name throwsError
     @propertyOf ngCordovaMocks.cordovaGeolocation

     @description
     A flag that signals whether a promise should be rejected or not.
     This property should only be used in automated tests.
     */
    throwsError: throwsError,

    /**
     @ngdoc property
     @name watchIntervals
     @propertyOf ngCordovaMocks.cordovaGeolocation

     @description
     The collection of watchers that are currently active.
     This property should only be used in automated tests.
     */
    watchIntervals: watchIntervals,

    /**
     @ngdoc property
     @name locations
     @propertyOf ngCordovaMocks.cordovaGeolocation

     @description
     The collection of 'locations' that have been logged.
     This property should only be used in automated tests.
     */
    locations: locations,

    /**
     @ngdoc property
     @name currentPosition
     @propertyOf ngCordovaMocks.cordovaGeolocation

     @description
     The last location logged.
     This property should only be used in automated tests.
     */
    currentPosition: currentPosition,

    /**
     @ngdoc property
     @name nextPosition
     @propertyOf ngCordovaMocks.cordovaGeolocation

     @description
     The position to be logged the next time that a watcher
     gets the location.
     This property should only be used in automated tests.
     */
    nextPosition: nextPosition,

    /**
     @ngdoc property
     @name useHostAbilities
     @propertyOf ngCordovaMocks.cordovaGeolocation

     @description
     A flag that signals whether or not to try and use the host's
     (browser or otherwise) geolocation capabilities.
     This property should only be used in automated tests.
     */
    useHostAbilities: useHostAbilities,

    getCurrentPosition: function (options) {
      var defer = $q.defer();
      if (this.throwsError) {
        defer.reject('There was an error getting the location.');
      } else {
        if (options) {
          options = options;	// This is just to get by JSHint.
        }

        if (this.useHostAbilities) {
          if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
              function (position) {
                this.currentPosition = position;
                defer.resolve(this.currentPosition);
              },
              function (error) {
                defer.reject(error);
              }
            );
          } else {
            defer.reject('Geolocation is not supported by this browser.');
          }
        } else {
          defer.resolve(this.currentPosition);
        }
      }

      return defer.promise;
    },

    watchPosition: function (options) {
      var defer = $q.defer();
      var watchID = Math.floor((Math.random() * 1000000) + 1);
      var self = this;

      self.locations = [];

      if (self.throwsError) {
        defer.reject('There was an error getting the geolocation.');
      } else {
        var delay = 1000;
        if (options && options.timeout) {
          delay = options.timeout;
        }

        self.watchIntervals.push({
          watchID: watchID,
          interval: $interval(
            function () {
              if (self.throwsError) {
                defer.reject('There was an error watching the geolocation.');
              }

              // Attempt to use nextPosition.
              var result = self.nextPosition;
              if (result === null) {
                // Determine whether to use the host's geolocation capabilities or not
                if (self.useHostAbilities) {
                  if (navigator.geolocation) {
                    navigator.geolocation.getCurrentPosition(
                      function (position) {
                        self.currentPosition = position;
                        self.locations.push(position);
                        defer.resolve(position);
                      },
                      function (error) {
                        defer.reject(error);
                      }
                    );
                  } else {
                    defer.reject('Geolocation is not supported by this browser.');
                  }
                } else {
                  result = {
                    coords: {
                      latitude: ((Math.random() * 180) + 1) - 90,
                      longitude: ((Math.random() * 360) + 1) - 180,
                      altitude: ((Math.random() * 100) + 1),

                      accuracy: ((Math.random() * 10) + 1),
                      altitudeAccuracy: ((Math.random() * 10) + 1),
                      heading: ((Math.random() * 360) + 1),
                      speed: ((Math.random() * 100) + 1)
                    },
                    timestamp: Date.now()
                  };

                  self.currentPosition = result;
                  self.locations.push(result);
                  defer.notify(result);
                }
              }
            },
            delay
          )
        });
      }

      var cancel = function (id) {
        var removed = -1;
        for (var i = 0; i < self.watchIntervals.length; i++) {
          if (self.watchIntervals[i].watchID === id) {
            $interval.cancel(watchIntervals[i].interval);
            removed = i;
            break;
          }
        }

        if (removed !== -1) {
          self.watchIntervals.splice(removed, 1);
        }
      };

      defer.promise.cancel = function () {
        cancel(watchID);
      };

      defer.promise.clearWatch = function (id) {
        cancel(id || watchID);
      };

      defer.promise.watchID = watchID;

      return defer.promise;
    },

    clearWatch: function (watchID) {
      var defer = $q.defer();
      if (watchID) {
        if (this.throwsError) {
          defer.reject('Unable to clear watch.');
        } else {
          var removed = -1;
          for (var i = 0; i < this.watchIntervals.length; i++) {
            if (this.watchIntervals[i].watchID === watchID) {
              $interval.cancel(watchIntervals[i].interval);
              removed = i;
              break;
            }
          }

          if (removed !== -1) {
            this.watchIntervals.splice(removed, 1);
          }
        }
      } else {
        defer.reject('Unable to clear watch. No watch ID provided.');
      }

      return defer.promise;
    }
  };
}]);

/**
 * @ngdoc service
 * @name ngCordovaMocks.cordovaGlobalization
 *
 * @description
 * A service for testing features related to a user's locale and timezone.
 * in an app build with ngCordova.
 */
ngCordovaMocks.factory('$cordovaGlobalization', ['$q', function ($q) {
  var throwsError = false;
  var language = (navigator.language) ? navigator.language : 'en-US';
  var preferredLanguage = {value: language};
  var firstDayOfWeek = 'Sunday';
  var localeName = {value: language};

  return {
    /**
     * @ngdoc property
     * @name throwsError
     * @propertyOf ngCordovaMocks.cordovaGlobalization
     *
     * @description
     * A flag that signals whether a promise should be rejected or not.
     * This property should only be used in automated tests.
     **/
    throwsError: throwsError,

    /**
     * @ngdoc property
     * @name preferredLanguage
     * @propertyOf ngCordovaMocks.cordovaGlobalization
     *
     * @description
     * The user's preferred language.
     * This property should only be used in automated tests.
     **/
    preferredLanguage: preferredLanguage,

    /**
     * @ngdoc property
     * @name localeName
     * @propertyOf ngCordovaMocks.cordovaGlobalization
     *
     * @description
     * The name of the user's locale.
     * This property should only be used in automated tests.
     **/
    localeName: localeName,

    /**
     * @ngdoc property
     * @name firstDayOfWeek
     * @propertyOf ngCordovaMocks.cordovaGlobalization
     *
     * @description
     * The first day of the week based on the user's locale.
     * This property should only be used in automated tests.
     **/
    firstDayOfWeek: firstDayOfWeek,

    getPreferredLanguage: function () {
      var defer = $q.defer();
      if (this.throwsError) {
        defer.reject('There was an error getting the preferred language.');
      } else {
        defer.resolve(this.preferredLanguage);
      }

      return defer.promise;
    },

    getLocaleName: function () {
      var defer = $q.defer();
      if (this.throwsError) {
        defer.reject('There was an error getting the locale name.');
      } else {
        defer.resolve(this.localeName);
      }

      return defer.promise;
    },

    getFirstDayOfWeek: function () {
      var defer = $q.defer();
      if (this.throwsError) {
        defer.reject('There was an error getting the first day of week.');
      } else {
        defer.resolve(this.firstDayOfWeek);
      }

      return defer.promise;
    },

    dateToString: function (date, options) {
      var defer = $q.defer();
      if (this.throwsError) {
        defer.reject('There was an error getting the string from the date.');
      } else {
        var result = '';

        // TODO: Review
        date = date;
        options = options;

        // END TODO: Review

        defer.resolve(result);
      }

      return defer.promise;
    },

    stringToDate: function (dateString, options) {
      var defer = $q.defer();
      if (this.throwsError) {
        defer.reject('There was an error getting the date from the string.');
      } else {
        var result = '';

        // TODO: Review
        dateString = dateString;
        options = options;

        // END TODO: Review

        defer.resolve(result);
      }

      return defer.promise;
    },

    getDatePattern: function (options) {
      var defer = $q.defer();
      if (this.throwsError) {
        defer.reject('There was an error getting the date pattern.');
      } else {
        var result = '';

        // TODO: Review
        options = options;

        // END TODO: Review

        defer.resolve(result);
      }

      return defer.promise;
    },

    getDateNames: function (options) {
      var defer = $q.defer();
      if (this.throwsError) {
        defer.reject('There was an error getting the date names.');
      } else {
        var result = '';

        // TODO: Review
        options = options;

        // END TODO: Review

        defer.resolve(result);
      }

      return defer.promise;
    },

    isDayLightSavingsTime: function (date) {
      var defer = $q.defer();
      if (this.throwsError) {
        defer.reject('There was an error getting if this is in daylight savings time mode.');
      } else {
        var result = '';

        // TODO: Review
        date = date;

        // END TODO: Review

        defer.resolve(result);
      }

      return defer.promise;
    },

    numberToString: function (number, options) {
      var defer = $q.defer();
      if (this.throwsError) {
        defer.reject('There was an error convertng the number to a string.');
      } else {
        var result = '';

        // TODO: Review
        number = number;
        options = options;

        // END TODO: Review

        defer.resolve(result);
      }

      return defer.promise;
    },

    stringToNumber: function (numberString, options) {
      var defer = $q.defer();
      if (this.throwsError) {
        defer.reject('There was an error convertng the string to a number.');
      } else {
        var result = '';

        // TODO: Review
        options = options;

        // END TODO: Review

        defer.resolve(result);
      }

      return defer.promise;
    },

    getNumberPattern: function (options) {
      var defer = $q.defer();
      if (this.throwsError) {
        defer.reject('There was an error convertng the string to a number.');
      } else {
        var result = '';

        // TODO: Review
        options = options;

        // END TODO: Review

        defer.resolve(result);
      }

      return defer.promise;
    },

    getCurrencyPattern: function (currencyCode) {
      var defer = $q.defer();
      if (this.throwsError) {
        defer.reject('There was an error convertng the string to a number.');
      } else {
        var result = '';

        // TODO: Review
        currencyCode = currencyCode;

        // END TODO: Review

        defer.resolve(result);
      }

      return defer.promise;
    }
  };
}]);

/**
 * @ngdoc service
 * @name ngCordovaMocks.cordovaGoogleAnalytics
 *
 * @description
 * A service for testing google analytics services
 * in an app build with ngCordova.
 */
ngCordovaMocks.factory('$cordovaGoogleAnalytics', ['$q', function ($q) {
  var throwsError = false;
  var methods = {};

  /**
   * @ngdoc property
   * @name throwsError
   * @propertyOf ngCordovaMocks.cordovaGeolocation
   *
   * @description
   * A flag that signals whether a promise should be rejected or not.
   * This property should only be used in automated tests.
   **/
  methods.throwsError = throwsError;

  var methodsName = [
    'startTrackerWithId',
    'setUserId',
    'debugMode',
    'trackView',
    'addCustomDimension',
    'trackEvent',
    'trackException',
    'trackTiming',
    'addTransaction',
    'addTransactionItem'
  ];

  methodsName.forEach(function (funcName) {
    methods[funcName] = function () {
      var defer = $q.defer();

      (this.throwsError) ?
        defer.reject() :
        defer.resolve();

      return defer.promise;
    };
  });

  return methods;
}]);

'use strict';

/**
 * @ngdoc service
 * @name ngCordovaMocks.googlePlayGame
 *
 * @description
 * A service for testing Google Play Game features
 * in an app build with ngCordova.
 */
ngCordovaMocks.factory('$cordovaGooglePlayGame', ['$q', function ($q) {
  var throwsError = false;
  var isSignedIn = false;
  var displayName = '';

  return {

    /**
     * @ngdoc property
     * @name _throwsError
     * @propertyOf ngCordovaMocks.googlePlayGame
     *
     * @description
     * A flag that signals whether a promise should be rejected or not.
     * This property should only be used in automated tests.
     **/
    _throwsError: throwsError,

    /**
     * @ngdoc property
     * @name _isSignedIn
     * @propertyOf ngCordovaMocks.googlePlayGame
     *
     * @description
     * A flag that signals whether a promise should be rejected or not.
     * This property should only be used in automated tests.
     **/
    _isSignedIn: isSignedIn,

    /**
     * @ngdoc property
     * @name _displayName
     * @propertyOf ngCordovaMocks.googlePlayGame
     *
     * @description
     * A flag that signals whether a promise should be rejected or not.
     * This property should only be used in automated tests.
     **/
    _displayName: displayName,

    auth: function () {
      var defer = $q.defer();
      if (this._throwsError) {
        defer.reject('There was a auth error.');
      } else {
        this.isSignedIn = true;
        defer.resolve('SIGN IN SUCCESS');
      }

      return defer.promise;
    },
    signout: function () {
      var defer = $q.defer();
      if (this.throwsError) {
        defer.reject('There was a signout error.');
      } else {
        defer.resolve();
      }

      return defer.promise;
    },
    isSignedIn: function () {
      var defer = $q.defer();
      if (this._throwsError) {
        defer.reject('There was a isSignedIn error.');
      } else {
        defer.resolve({
          'isSignedIn': this._isSignedIn
        });
      }

      return defer.promise;
    },
    showPlayer: function () {
      var defer = $q.defer();
      if (this.throwsError) {
        defer.reject('There was a showPlayer error.');
      } else {
        defer.resolve({
          'displayName': this._displayName
        });
      }

      return defer.promise;
    },
    submitScore: function (data) {
      var defer = $q.defer();
      if (this._throwsError) {
        defer.reject('There was a submitScore error.');
      } else {
        defer.resolve('OK');
      }

      return defer.promise;
    },
    showAllLeaderboards: function () {
      var defer = $q.defer();
      if (this.throwsError) {
        defer.reject('There was a showAllLeaderboards error.');
      } else {
        defer.resolve('OK');
      }

      return defer.promise;
    },
    showLeaderboard: function (data) {
      var defer = $q.defer();
      if (this._throwsError) {
        defer.reject('There was a showLeaderboard error.');
      } else {
        defer.resolve('OK');
      }

      return defer.promise;
    },
    unlockAchievement: function (data) {
      var defer = $q.defer();
      if (this.throwsError) {
        defer.reject('There was a unlockAchievement error.');
      } else {
        defer.resolve('OK');
      }

      return defer.promise;
    },
    incrementAchievement: function (data) {
      var defer = $q.defer();
      if (this._throwsError) {
        defer.reject('There was a incrementAchievement error.');
      } else {
        defer.resolve('OK');
      }

      return defer.promise;
    },
    showAchievements: function () {
      var defer = $q.defer();
      if (this.throwsError) {
        defer.reject('There was a showAchievements error.');
      } else {
        defer.resolve('OK');
      }

      return defer.promise;
    }
  };

}]);

/**
 * @ngdoc service
 * @name ngCordovaMocks.cordovaKeyboard
 *
 * @description
 * A service for testing device keyboard features
 * in an app build with ngCordova.
 **/
ngCordovaMocks.factory('$cordovaKeyboard', function () {
  var isVisible = false;

  return {
    hideAccessoryBar: function (bool) {
    },

    close: function () {
      isVisible = false;
    },

    show: function () {
      isVisible = true;
    },

    disableScroll: function (bool) {
    },

    isVisible: function () {
      return isVisible;
    }

  };
});

/**
 * @ngdoc service
 * @name ngCordovaMocks.cordovaKeychain
 *
 * @description
 * A service for testing Keychain features
 * in an app built with ngCordova.
 **/
ngCordovaMocks.factory('$cordovaKeychain', ['$q', function ($q) {
  var keychains = {};

  return {
    /**
     * @ngdoc property
     * @name keychains
     * @propertyOf ngCordovaMocks.cordovaKeychain
     *
     * @description
     * The collection of 'keychains' that have been saved.
     * This property should only be used in automated tests.
     **/
    keychains: keychains,

    getForKey: function (key, serviceName) {
      var defer = $q.defer();

      if (this.keychains[serviceName]) {
        defer.resolve(this.keychains[serviceName][key]);
      } else {
        defer.reject();
      }

      return defer.promise;
    },

    setForKey: function (key, serviceName, value) {
      var defer = $q.defer();

      if (!this.keychains[serviceName]) {
        this.keychains[serviceName] = {};
      }

      this.keychains[serviceName][key] = value;

      defer.resolve();

      return defer.promise;
    },

    removeForKey: function (key, serviceName) {
      var defer = $q.defer();

      if (this.keychains[serviceName]) {
        delete this.keychains[serviceName][key];
      }

      defer.resolve();

      return defer.promise;
    }
  };
}]);


/**
 * @ngdoc service
 * @name ngCordovaMocks.localNotification
 *
 * @description
 * A service for testing LocalNotificatio
 * in an app build with ngCordovaMocks.
 */

ngCordovaMocks.factory('$cordovaLocalNotification', ['$q', function ($q) {

  var storageKeyPfx  = "ngCordLocNotif-";
  
  function pfxId(id) {
    return storageKeyPfx + id;
  }

  function getAllIds(){
    var defer = $q.defer();
    var locNotifIds = [];
    for ( var i = 0, len = localStorage.length; i < len; ++i ) {
      if (localStorage.key( i ).indexOf(storageKeyPfx) > -1)
        locNotifIds.push(parseInt(localStorage.key( i ).split("-")[1]));
    }
    defer.resolve(locNotifIds);
    return defer.promise;
  }


  return {
    cancel: function (ids) {
      var defer = $q.defer();
      if (typeof(ids) == "number") ids = [ids];
      ids.forEach(function (id){
        localStorage.removeItem([pfxId(id)]);
      });      
      defer.resolve();
      return defer.promise;
    },
    cancelAll: function () {
      var defer = $q.defer();
      // TODO
      defer.resolve();
      return defer.promise;
    },
    clear: function (ids) {
      if (typeof(ids) == "number") ids = [ids];
      var defer = $q.defer();
      ids.forEach(function (id){
        localStorage.removeItem([pfxId(id)]);
      });      
      defer.resolve();
      return defer.promise;
    },
    clearAll: function () {
      var defer = $q.defer();
      // TODO
      // defer.resolve();
      return defer.promise;
    },
    isScheduled: function (id){
      var defer = $q.defer();
      if (localStorage[pfxId(id)]) {
        defer.resolve(true);
      } else {
        defer.resolve(false);
      }
      return defer.promise;
    },
    isPresent: function (id){
      var defer = $q.defer();
      if (localStorage[pfxId(id)]) {
        defer.resolve(true);
      } else {
        defer.resolve(false);
      }
      return defer.promise;
    },
    isTriggered: function (id){
      var defer = $q.defer();
      if (localStorage[pfxId(id)]) {
        defer.resolve(false);
      } else {
        defer.resolve(true);
      }
      return defer.promise;
    },
    getAllIds: function () {
      return getAllIds();
    },
    getIds: function () {
      return getAllIds();
    },
    getScheduledIds:  function () {
      return getAllIds();
    },
    getTriggeredIds: function () {
      var defer = $q.defer();
      defer.resolve([]);
      return defer.promise;
    },
    hasPermission: function (id){
      var defer = $q.defer();
      defer.resolve(true);
      return defer.promise;
    },
    schedule: function (data){
      var defer = $q.defer();
      var id = pfxId(data.id);
      localStorage[id] = JSON.stringify(data);
      defer.resolve();
      return defer.promise;
    },
    update: function (data){
      var defer = $q.defer();
      var id = pfxId(data.id);
      localStorage[id] = JSON.stringify(data);
      defer.resolve();
      return defer.promise;
    }
  };
}]);
/**
 * @ngdoc service
 * @name ngCordovaMocks.cordovaNetwork
 *
 * @description
 * A service for testing networked fetures
 * in an app build with ngCordova.
 */
ngCordovaMocks.factory('$cordovaNetwork', ['$rootScope',function ($rootScope) {
  var connectionType = 'WiFi connection';
  var isConnected = true;

  return {
    /**
     * @ngdoc property
     * @name connectionType
     * @propertyOf ngCordovaMocks.cordovaNetwork
     *
     * @description
     * They type of connection. Values should match those found at
     * https://github.com/apache/cordova-plugin-network-information
     * This property should only be used in automated tests.
     **/
    connectionType: connectionType,

    /**
     * @ngdoc property
     * @name isConnected
     * @propertyOf ngCordovaMocks.cordovaNetwork
     *
     * @description
     * A flag that signals whether the app is connected to a network.
     * This property should only be used in automated tests.
     **/
    isConnected: isConnected,

    switchToOnline: function (){
      this.isConnected = true;
      $rootScope.$broadcast('$cordovaNetwork:online');
    },

    switchToOffline: function (){
      this.isConnected = false;
      $rootScope.$broadcast('$cordovaNetwork:offline');
    },

    getNetwork: function () {
      return this.connectionType;
    },

    isOnline: function () {
      return this.isConnected;
    },

    isOffline: function () {
      return !this.isConnected;
    }
  };
}]);

/**
 * @ngdoc service
 * @name ngCordovaMocks.cordovaProgress
 *
 * @description
 * A service for testing Progress Indicator
 * in an app build with ngCordova.
 */

ngCordovaMocks.factory('$cordovaProgress', [
  '$timeout', function ($timeout) {

    return {
      show: function (_message) {
        var message = _message || 'Please wait...';
        console.info('$cordovaProgress.message', message);
      },

      showSimple: function (_dim) {
        var dim = _dim || false;
        console.info('$cordovaProgress.dim', dim);
      },

      showSimpleWithLabel: function (_dim, _label) {
        var dim   = _dim || false;
        var label = _label || 'Loading...';
        console.group();
        console.info('$cordovaProgress.dim', dim);
        console.info('$cordovaProgress.label', label);
        console.groupEnd();
      },

      showSimpleWithLabelDetail: function (_dim, _label, _detail) {
        var dim    = _dim || false;
        var label  = _label || 'Loading...';
        var detail = _detail || 'Please wait';

        console.group();
        console.info('$cordovaProgress.dim', dim);
        console.info('$cordovaProgress.label', label);
        console.info('$cordovaProgress.detail', detail);
        console.groupEnd();
      },

      showDeterminate: function (_dim, _timeout) {
        var dim     = _dim || false;
        var timeout = _timeout || 50000;
        console.group();
        console.info('$cordovaProgress.dim show', dim);
        console.info('$cordovaProgress.timeout', timeout);
        console.groupEnd();
        $timeout(function () {
          console.info('$cordovaProgress.dim timeout', dim);
        }, timeout);
      },

      showDeterminateWithLabel: function (_dim, _timeout, _label) {
        var dim     = _dim || false;
        var timeout = _timeout || 50000;
        var label   = _label || 'Loading...';

        console.group();
        console.info('$cordovaProgress.dim', dim);
        console.info('$cordovaProgress.timeout', timeout);
        console.info('$cordovaProgress.label', label);
        console.groupEnd();
        $timeout(function () {
          console.info('$cordovaProgress[dim, label] timeout', [dim, label]);
        }, timeout);
      },

      showAnnular: function (_dim, _timeout) {
        var dim     = _dim || false;
        var timeout = _timeout || 50000;

        console.group();
        console.info('$cordovaProgress.dim', dim);
        console.info('$cordovaProgress.timeout', timeout);
        console.groupEnd();
        $timeout(function () {
          console.info('$cordovaProgress.dim timeout', dim);
        }, timeout);
      },

      showAnnularWithLabel: function (_dim, _timeout, _label) {
        var dim     = _dim || false;
        var timeout = _timeout || 50000;
        var label   = _label || 'Loading...';

        console.group();
        console.info('$cordovaProgress.dim', dim);
        console.info('$cordovaProgress.timeout', timeout);
        console.info('$cordovaProgress.label', label);
        console.groupEnd();
        $timeout(function () {
          console.info('$cordovaProgress[dim, label] timeout', [dim, label]);
        }, timeout);
      },

      showBar: function (_dim, _timeout) {
        var dim     = _dim || false;
        var timeout = _timeout || 50000;

        console.group();
        console.info('$cordovaProgress.dim', dim);
        console.info('$cordovaProgress.timeout', timeout);
        console.groupEnd();
        $timeout(function () {
          console.info('$cordovaProgress.dim timeout', dim);
        }, timeout);
      },

      showBarWithLabel: function (_dim, _timeout, _label) {
        var dim     = _dim || false;
        var timeout = _timeout || 50000;
        var label   = _label || 'Loading...';
        console.group();
        console.info('$cordovaProgress.dim', dim);
        console.info('$cordovaProgress.label', label);
        console.info('$cordovaProgress.timeout', timeout);
        console.groupEnd();
        $timeout(function () {
          console.info('$cordovaProgress[dim, label] timeout', [dim, label]);
        }, timeout);
      },

      showSuccess: function (_dim, _label) {
        var dim   = _dim || false;
        var label = _label || 'Success';
        console.group();
        console.info('$cordovaProgress.dim', dim);
        console.info('$cordovaProgress.label', label);
        console.groupEnd();
      },

      showText: function (_dim, _text, _position) {
        var dim      = _dim || false;
        var text     = _text || 'Warning';
        var position = _position || 'center';
        console.group();
        console.info('$cordovaProgress.dim', dim);
        console.info('$cordovaProgress.text', text);
        console.info('$cordovaProgress.position', position);
        console.groupEnd();
      },

      hide: function () {
        console.info('$cordovaProgress.hide');
      }
    };
  }
]);

'use strict';

/**
 * @ngdoc service
 * @name ngCordovaMocks.cordovaPush
 *
 * @description
 * A service for testing push notifications features
 * in an app build with ngCordova.
 */
ngCordovaMocks.factory('$cordovaPush', ['$q', '$timeout', '$rootScope', function ($q, $timeout, $rootScope) {
  var throwsError = false;

  var deviceToken = '';

  return {
    /**
     * @ngdoc property
     * @name throwsError
     * @propertyOf ngCordovaMocks.cordovaPush
     *
     * @description
     * A flag that signals whether a promise should be rejected or not.
     * This property should only be used in automated tests.
     **/
    throwsError: throwsError,

    /**
     * @ngdoc property
     * @name deviceToken
     * @propertyOf ngCordovaMocks.cordovaPush
     *
     * @description
     * Token send when service register device
     * This property should only be used in automated tests.
     **/
    deviceToken: deviceToken,

    onNotification: function (notification) {
      $timeout(function () {
        $rootScope.$broadcast('$cordovaPush:notificationReceived', notification);
      });
    },

    register: function (config) {
      var _self = this;
      var defer = $q.defer();
      if (config !== undefined && config.ecb === undefined) {
        config.ecb = this.onNotification;
      }

      if (this.throwsError) {
        defer.reject('There was a register error.');
      } else {
        defer.resolve(this.deviceToken);
        if (config && config.ecb) {
          config.ecb({
            event: 'registered',
            regid: _self.deviceToken
          });
        }
      }
      return defer.promise;
    },

    unregister: function (options) {
      var defer = $q.defer();
      if (this.throwsError) {
        defer.reject('There was a register error.');
      } else {
        defer.resolve();
      }
      return defer.promise;
    },
  };
}]);

/**
 * @ngdoc service
 * @name ngCordovaMocks.cordovaScreenshot
 *
 * @description
 * A service for test app screenshot
 * in an app build with ngCordova.
 *
 * @example
 */
ngCordovaMocks.factory('$cordovaScreenshot', ['$q', function ($q) {
  var throwsError = false;

  var DATA_URI_MOCK = "data:image/png;base64,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";

  return {
    /**
     * @ngdoc property
     * @name throwsError
     * @propertyOf ngCordovaMocks.cordovaScreenshot
     *
     * @description
     * A flag that signals whether a promise should be rejected or not.
     * This property should only be used in automated tests.
     **/
    throwsError: throwsError,

    captureToFile: function () {
      var defer = $q.defer();
      if (this.throwsError) {
        defer.reject('There was an error capturing the screenshot.');
      } else {
        defer.resolve("path");
      }

      return defer.promise;
    },

    captureToUri: function () {
      var defer = $q.defer();
      if (this.throwsError) {
        defer.reject('There was an error capturing the screenshot.');
      } else {
        defer.resolve();
      }

      return defer.promise;
    }
  };
}]);

/**
 * @ngdoc service
 * @name ngCordovaMocks.cordovaSocialSharing
 *
 * @description
 * A service for testing via social services
 * in an app build with ngCordova.
 */
ngCordovaMocks.factory('$cordovaSocialSharing', ['$q', function ($q) {
  var throwsError = false;
  var message = '';
  var image = '';
  var link = '';
  var number = '';

  var socialService = '';
  var subject = '';
  var toAddresses = [];
  var bccAddresses = [];
  var attachments = [];

  return {
    /**
     * @ngdoc property
     * @name throwsError
     * @propertyOf ngCordovaMocks.cordovaSocialSharing
     *
     * @description
     * A flag that signals whether a promise should be rejected or not.
     * This property should only be used in automated tests.
     **/
    throwsError: throwsError,

    /**
     * @ngdoc property
     * @name message
     * @propertyOf ngCordovaMocks.cordovaSocialSharing
     *
     * @description
     * The message to be shared via a social service.
     * This property should only be used in automated tests.
     **/
    message: message,

    /**
     * @ngdoc property
     * @name image
     * @propertyOf ngCordovaMocks.cordovaSocialSharing
     *
     * @description
     * An image to be shared via a social service.
     * This property should only be used in automated tests.
     **/
    image: image,

    /**
     * @ngdoc property
     * @name link
     * @propertyOf ngCordovaMocks.cordovaSocialSharing
     *
     * @description
     * A link to be shared via a social service.
     * This property should only be used in automated tests.
     **/
    link: link,

    /**
     * @ngdoc property
     * @name number
     * @propertyOf ngCordovaMocks.cordovaSocialSharing
     *
     * @description
     * A comma-delimited list of phone numbers to send a social message to.
     * This property should only be used in automated tests.
     **/
    number: number,

    /**
     * @ngdoc property
     * @name subject
     * @propertyOf ngCordovaMocks.cordovaSocialSharing
     *
     * @description
     * The subject of an email.
     * This property should only be used in automated tests.
     **/
    subject: subject,

    /**
     * @ngdoc property
     * @name toAddresses
     * @propertyOf ngCordovaMocks.cordovaSocialSharing
     *
     * @description
     * An array of email addresses to send an email to.
     * This property should only be used in automated tests.
     **/
    toAddresses: toAddresses,

    /**
     * @ngdoc property
     * @name bccAddresses
     * @propertyOf ngCordovaMocks.cordovaSocialSharing
     *
     * @description
     * An array of email addresses to blind carbon-copy an email to.
     * This property should only be used in automated tests.
     **/
    bccAddresses: bccAddresses,

    /**
     * @ngdoc property
     * @name socialService
     * @propertyOf ngCordovaMocks.cordovaSocialSharing
     *
     * @description
     * The name of a social service to share content through.
     * This property should only be used in automated tests.
     **/
    socialService: socialService,

    /**
     * @ngdoc property
     * @name attachments
     * @propertyOf ngCordovaMocks.cordovaSocialSharing
     *
     * @description
     * An array of attachments to include with an email to be sent.
     * This property should only be used in automated tests.
     **/
    attachments: attachments,

    shareViaTwitter: function (message, image, link) {
      var defer = $q.defer();
      if (this.throwsError) {
        defer.reject('There was an error sharing via Twitter.');
      } else {
        this.message = message;
        this.image = image;
        this.link = link;

        defer.resolve();
      }
      return defer.promise;
    },

    shareViaWhatsApp: function (message, image, link) {
      var defer = $q.defer();
      if (this.throwsError) {
        defer.reject('There was an error sharing via WhatsApp.');
      } else {
        this.message = message;
        this.image = image;
        this.link = link;

        defer.resolve();
      }
      return defer.promise;
    },

    shareViaFacebook: function (message, image, link) {
      var defer = $q.defer();
      if (this.throwsError) {
        defer.reject('There was an error sharing via Facebook.');
      } else {
        this.message = message;
        this.image = image;
        this.link = link;

        defer.resolve();
      }
      return defer.promise;
    },

    shareViaSMS: function (message, number) {
      var defer = $q.defer();
      if (this.throwsError) {
        defer.reject('There was an error sharing via SMS.');
      } else {
        this.message = message;
        this.number = number;

        defer.resolve();
      }
      return defer.promise;
    },

    shareViaEmail: function (message, subject, toArr, bccArr, file) {
      var defer = $q.defer();
      if (this.throwsError) {
        defer.reject('There was an error sharing via SMS.');
      } else {
        // These are added to get by JSHINT for now
        this.message = message;
        this.subject = subject;
        this.toAddresses = toArr;
        this.bccAddressesc = bccArr;
        this.attachments = file;

        defer.resolve();
      }
      return defer.promise;
    },

    canShareViaEmail: function () {
      var defer = $q.defer();
      if (this.throwsError) {
        defer.reject(false);
      } else {
        defer.resolve(true);
      }
      return defer.promise;
    },

    canShareVia: function (via, message, subject, file, link) {
      var defer = $q.defer();
      if (this.throwsError) {
        defer.reject('There was an error sharing via SMS.');
      } else {
        // These are added to get by JSHINT for now
        this.message = message;
        this.socialService = via;
        this.subject = subject;
        this.attachments = file;
        this.link = link;

        defer.resolve();
      }
      return defer.promise;
    },

    shareVia: function (via, message, subject, file, link) {
      var defer = $q.defer();
      if (this.throwsError) {
        defer.reject('There was an error sharing via SMS.');
      } else {
        this.socialService = via;
        this.message = message;
        this.subject = subject;
        this.attachments = file;
        this.link = link;

        defer.resolve();
      }
      return defer.promise;
    },

    share: function (message, subject, file, link) {
      var defer = $q.defer();
      if (this.throwsError) {
        defer.reject('There was an error sharing via SMS.');
      } else {
        this.message = message;
        this.subject = subject;
        this.attachments = file;
        this.link = link;

        defer.resolve();
      }
      return defer.promise;
    }
  };
}]);

/**
 * @ngdoc service
 * @name ngCordovaMocks.cordovaSplashscreen
 *
 * @description
 * A service for testing the splash screen
 * in an app build with ngCordova.
 */
ngCordovaMocks.factory('$cordovaSplashscreen', function () {
  var isVisible = false;

  return {
    /**
     * @ngdoc property
     * @name isVisible
     * @propertyOf ngCordovaMocks.cordovaSplashscreen
     *
     * @description
     * A flag that signals whether the splash screen is visible or not.
     * This property should only be used in automated tests.
     **/
    isVisible: isVisible,

    hide: function () {
      // do nothing. everything happens behind the scenes in this case.
      // its a stub that is present for completeness.
      this.isVisible = false;
      return true;
    },
    show: function () {
      // do nothing. everything happens behind the scenes in this case.
      // its a stub that is present for completeness.
      this.isVisible = true;
      return true;
    }
  };
});

/**
 * @ngdoc service
 * @name ngCordovaMocks.cordovaSQLite
 *
 * @description
 * A service for testing SQLite
 * in an app build with ngCordova.
 */

ngCordovaMocks.factory('$cordovaSQLite', ['$q', function ($q) {

  return {
    /**
     * These properties are here for the purpose of automated testing only.
     **/
    openDBShouldSucceedWith: null,
    executeShouldSucceedWith: null,
    insertCollectionShouldSucceedWith: null,
    nestedExecuteShouldSucceedWith: null,
    deleteDBShouldSucceedWith : null,

    openDB: function (options, background) {
      if (this.openDBShouldSucceedWith !== null) {
        $q.when(this.openDBShouldSucceedWith)
      } else {
        $q.reject()
      }
    },
    execute: function (db, query, binding) {
      if (this.executeShouldSucceedWith !== null) {
        $q.when(this.executeShouldSucceedWith)
      } else {
        $q.reject()
      }
    },
    insertCollection: function (db, query, bindings) {
      if (this.insertCollectionShouldSucceedWith !== null) {
        $q.when(this.insertCollectionShouldSucceedWith)
      } else {
        $q.reject()
      }
    },
    nestedExecute: function (db, query1, query2, binding1, binding2) {
      if (this.nestedExecuteShouldSucceedWith !== null) {
        $q.when(this.nestedExecuteShouldSucceedWith)
      } else {
        $q.reject()
      }
    },
    deleteDB: function (dbName) {
      if (this.deleteDBShouldSucceedWith !== null) {
        $q.when(this.deleteDBShouldSucceedWith)
      } else {
        $q.reject()
      }
    }
  }
}]);

/**
 * @ngdoc service
 * @name ngCordovaMocks.cordovaStatusbar
 *
 * @description
 * A service for testing the status bar
 * in an app build with ngCordova.
 */
ngCordovaMocks.factory('$cordovaStatusbar', function () {
  var isStatusBarVisible = true;
  var canOverlayWebView = true;

  return {
    /**
     * @ngdoc property
     * @name isStatusBarVisible
     * @propertyOf ngCordovaMocks.cordovaStatusbar
     *
     * @description
     * A flag that signals whether the status bar is visible or not.
     * This property should only be used in automated tests.
     **/
    isStatusBarVisible: isStatusBarVisible,

    /**
     * @ngdoc property
     * @name canOverlayWebView
     * @propertyOf ngCordovaMocks.cordovaStatusbar
     *
     * @description
     * A flag that signals whether the status bar can overlay the web view.
     * This property should only be used in automated tests.
     **/
    canOverlayWebView: canOverlayWebView,

    overlaysWebView: function (bool) {
      this.canOverlayWebView = bool;
    },

    style: function (style) {
      // TODO: Review
      return style;
    },

    styleHex: function (colorHex) {
      // TODO: review
      return colorHex;
    },

    styleColor: function (color) {
      // TODO: review
      return color;
    },

    hide: function () {
      this.isStatusBarVisible = false;
    },

    show: function () {
      this.isStatusBarVisible = true;
    },

    isVisible: function () {
      return this.isStatusBarVisible;
    }
  };
});

/**
 * @ngdoc service
 * @name ngCordovaMocks.cordovaToast
 *
 * @description
 * A service for testing toasts
 * in an app build with ngCordova.
 *
 * @example
 */
ngCordovaMocks.factory('$cordovaToast', ['$q', function ($q) {
  var throwsError = false;

  return {
    /**
     * @ngdoc property
     * @name throwsError
     * @propertyOf ngCordovaMocks.cordovaToast
     *
     * @description
     * A flag that signals whether a promise should be rejected or not.
     * This property should only be used in automated tests.
     **/
    throwsError: throwsError,

    showShortTop: function (message) {
      var defer = $q.defer();
      if (this.throwsError) {
        defer.reject('There was an error showing the toast.');
      } else {
        defer.resolve();
      }
      return defer.promise;
    },
    showShortCenter: function (message) {
      var defer = $q.defer();
      if (this.throwsError) {
        defer.reject('There was an error showing the toast.');
      } else {
        defer.resolve();
      }
      return defer.promise;
    },
    showShortBottom: function (message) {
      var defer = $q.defer();
      if (this.throwsError) {
        defer.reject('There was an error showing the toast.');
      } else {
        defer.resolve();
      }
      return defer.promise;
    },
    showLongTop: function (message) {
      var defer = $q.defer();
      if (this.throwsError) {
        defer.reject('There was an error showing the toast.');
      } else {
        defer.resolve();
      }
      return defer.promise;
    },
    showLongCenter: function (message) {
      var defer = $q.defer();
      if (this.throwsError) {
        defer.reject('There was an error showing the toast.');
      } else {
        defer.resolve();
      }
      return defer.promise;
    },
    showLongBottom: function (message) {
      var defer = $q.defer();
      if (this.throwsError) {
        defer.reject('There was an error showing the toast.');
      } else {
        defer.resolve();
      }
      return defer.promise;
    },
    show: function (message, duration, position) {
      var defer = $q.defer();
      if (this.throwsError) {
        defer.reject('There was an error showing the toast.');
      } else {
        defer.resolve();
      }
      return defer.promise;
    },
    hide: function () {
      var defer = $q.defer();
      if (this.throwsError) {
        defer.reject('There was an error hiding the toast.');
      } else {
        defer.resolve();
      }
      return defer.promise;
    }
  };
}]);

/**
 * @ngdoc service
 * @name ngCordovaMocks.cordovaVibration
 *
 * @description
 * A service for testing vibration
 * in an app build with ngCordova.
 */
ngCordovaMocks.factory('$cordovaVibration', ['$timeout', function ($timeout) {
  var isVibrating = false;
  var vibrateTimer = null;

  return {
    /**
     * @ngdoc property
     * @name vibrateTimer
     * @propertyOf ngCordovaMocks.cordovaVibration
     *
     * @description
     * Access to the timer associated with vibration.
     * This property should only be used in automated tests.
     **/
    vibrateTimer: vibrateTimer,

    /**
     * @ngdoc property
     * @name isVibrating
     * @propertyOf ngCordovaMocks.cordovaVibration
     *
     * @description
     * A flag that signals whether vibration is active.
     * This property should only be used in automated tests.
     **/
    isVibrating: isVibrating,

    vibrate: function (time) {
      if (time > 0) {
        this.isVibrating = true;
        self = this;

        if (time instanceof Array) {
          // TODO: Implement pattern here.
          // The following is a temporary timer that just looks at the first value
          this.vibrateTimer = $timeout(
            function () {
              self.isVibrating = false;
              self.vibrateTimer = null;
            },
            time[0]
          );
        } else {
          this.vibrateTimer = $timeout(
            function () {
              self.isVibrating = false;
              self.vibrateTimer = null;
            },
            time
          );
        }
      }
    },

    /* jshint ignore:start */
    vibrateWithPattern: function (pattern, repeat) {
      // Based on the documentation (https://github.com/apache/cordova-plugin-vibration)
      // This method is deprecated. For that reason, this isn't implemented at this time.
    },
    /* jshint ignore:end */

    cancelVibration: function () {
      if (this.vibrateTimer !== null) {
        if (this.isVibrating === true) {
          $timeout.cancel(this.vibrateTimer);
          this.isVibrating = false;
        }
      }
    }
  };
}]);

})();