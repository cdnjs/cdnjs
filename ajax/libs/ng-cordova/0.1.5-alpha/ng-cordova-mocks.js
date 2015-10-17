/*!
 * ngCordova
 * v0.1.4-alpha
 * Copyright 2014 Drifty Co. http://drifty.com/
 * See LICENSE in this repository for license information
 */
(function(){
var ngCordovaMocks = angular.module('ngCordovaMocks', []);
/**
 * @ngdoc service
 * @name ngCordovaMocks.cordovaBarcodeScanner
 *
 * @description
 * A service for testing barcode scanner features
 * in an app build with ngCordova.
**/ 
ngCordovaMocks.factory('$cordovaBarcodeScanner', ['$q', function($q) {
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
		 *
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

		scan: function() {
			var defer = $q.defer();
			if (this.throwsError) {
				defer.reject('There was an error scanning.');
			} else {
				defer.resolve({text: this.scannedText, format: this.scannedFormat, cancelled: this.wasCancelled });
			}
			return defer.promise;
		},

		encode: function(type, data) {
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
 * @name ngCordovaMocks.cordovaCamera
 *
 * @description
 * A service for testing camera features
 * in an app build with ngCordova.
**/ 
ngCordovaMocks.factory('$cordovaCamera', ['$q', function($q) {
	var throwsError = false;

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

		getPicture: function(options) {
			var defer = $q.defer();
			if (this.throwsError) {
				defer.reject('There was an error getting the picture.');
			} else {
				if (options) {
					options = options;	// This is just to get by JSHint.
				}

				defer.resolve();					
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
ngCordovaMocks.factory('$cordovaCapture', ['$q', function($q) {
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

		captureAudio : function() {
			var defer = $q.defer();
			if (this.throwsError) {
				defer.reject('There was an error capturing the audio.');
			} else {
				defer.resolve();
			}
			return defer.promise;
		},

		captureImage: function() {
			var defer = $q.defer();
			if (this.throwsError) {
				defer.reject('There was an error capturing the image.');
			} else {
				defer.resolve();
			}
			return defer.promise;
		},

		captureVideo: function() {
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
ngCordovaMocks.factory('$cordovaContacts', ['$q', function($q) {
	var throwsError = false;
	var contacts = [];

	return {
        /**
		 * @ngdoc property
		 * @name throwsError
		 * @propertyOf ngCordovaMocks.cordovaContacts
		 *
		 * @description
		 * A flag that signals whether a promise should be rejected or not.
		 * This property should only be used in automated tests.
		**/
		throwsError: throwsError,

        /**
		 * @ngdoc contacts
		 * @name throwsError
		 * @propertyOf ngCordovaMocks.cordovaContacts
		 *
		 * @description
		 * An in-memory collection of contacts.
		 * This property should only be used in automated tests.
		**/
		contacts: contacts,

		save: function(contact) {
			var defer = $q.defer();
			if (this.throwsError) {
				defer.reject('There was an error saving the contact.');
			} else {
				var existingIndex = null;
				for (var i=0; i<this.contacts.length; i++) {
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

		remove: function(contact) {
			var defer = $q.defer();
			if (this.throwsError) {
				defer.reject('There was an error saving the contact.');
			} else {
				var toRemove = null;
				for (var i=0; i<this.contacts.length; i++) {
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

		find: function(options) {
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
						for (var i=0; i<this.contacts.length; i++) {
							for(var key in this.contacts[i]) {
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
ngCordovaMocks.factory('$cordovaDatePicker', function () {
  return {
    show: function (options, fn) {
      return options.date;
    }
  };
});

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
		 * @ngdoc property
		 * @name device
		 * @propertyOf ngCordovaMocks.cordovaDevice
		 *
		 * @description
		 * The name of the 'device'. 
		 * This property should only be used in automated tests.
		**/		
		device: device,

        /**
		 * @ngdoc property
		 * @name cordova
		 * @propertyOf ngCordovaMocks.cordovaDevice
		 *
		 * @description
		 * The version of cordova in use.
		 * This property should only be used in automated tests.
		**/				
		cordova: cordova,

        /**
		 * @ngdoc property
		 * @name model
		 * @propertyOf ngCordovaMocks.cordovaDevice
		 *
		 * @description
		 * The model of the device using the app.
		 * This property should only be used in automated tests.
		**/
		model: model,

        /**
		 * @ngdoc property
		 * @name platform
		 * @propertyOf ngCordovaMocks.cordovaDevice
		 *
		 * @description
		 * The name of the operating system in use.
		 * This property should only be used in automated tests.
		**/		
		platform: platform,

        /**
		 * @ngdoc property
		 * @name uuid
		 * @propertyOf ngCordovaMocks.cordovaDevice
		 *
		 * @description
		 * The unique identifier of a device.
		 * This property should only be used in automated tests.
		**/		
		uuid: uuid,

        /**
		 * @ngdoc property
		 * @name version
		 * @propertyOf ngCordovaMocks.cordovaDevice
		 *
		 * @description
		 * The version of the operating system.
		 * This property should only be used in automated tests.
		**/		
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

		getPlatform: function() {
			return this.platform;
		},

		getUUID: function() {
			return this.uuid;
		},

		getVersion: function() {
			return this.version;
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
		 * @ngdoc property
		 * @name throwsError
		 * @propertyOf ngCordovaMocks.cordovaDeviceMotion
		 *
		 * @description
		 * A flag that signals whether a promise should be rejected or not.
		 * This property should only be used in automated tests.
		**/
		throwsError: throwsError,

        /**
		 * @ngdoc property
		 * @name positions
		 * @propertyOf ngCordovaMocks.cordovaDeviceMotion
		 *
		 * @description
		 * The collection of 'positions' that have been logged.
		 * This property should only be used in automated tests.
		**/		
		positions: positions,

        /**
		 * @ngdoc property
		 * @name watchIntervals
		 * @propertyOf ngCordovaMocks.cordovaDeviceMotion
		 *
		 * @description
		 * The collection of watchers that are currently active.
		 * This property should only be used in automated tests.
		**/		
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

		watchAcceleration : function (options) {
			var defer = $q.defer();
			var watchId = Math.floor((Math.random() * 1000000) + 1);

			this.positions = [];
			self = this;
			
			if (this.throwsError) {
				defer.reject('There was an error watching the current acceleration.');
			} else {
				var delay = 10000;		// The default based on https://github.com/apache/cordova-plugin-device-motion/blob/master/doc/index.md
				if (options && options.frequency) {
					delay = options.frequency;
				}				

				this.watchIntervals.push($interval(
					function() {
						if (self.throwsError) {
							defer.reject('There was an error watching the acceleration.');
						}

						// Generate a random position
						var randomX = Math.floor((Math.random() * 100) + 1);
						var randomY = Math.floor((Math.random() * 100) + 1);
						var randomZ = Math.floor((Math.random() * 100) + 1);
						var result = { x: randomX, y: randomY, z:randomZ, timestamp:Date.now() };

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
					for (var i=0; i<this.watchIntervals.length; i++) {
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
		 * @ngdoc property
		 * @name throwsError
		 * @propertyOf ngCordovaMocks.cordovaDeviceOrientation
		 *
		 * @description
		 * A flag that signals whether a promise should be rejected or not.
		 * This property should only be used in automated tests.
		**/
		throwsError: throwsError,

        /**
		 * @ngdoc property
		 * @name positions
		 * @propertyOf ngCordovaMocks.cordovaDeviceOrientation
		 *
		 * @description
		 * The collection of compass 'readings' that have been logged.
		 * This property should only be used in automated tests.
		**/				
		readings: readings,

        /**
		 * @ngdoc property
		 * @name watchIntervals
		 * @propertyOf ngCordovaMocks.cordovaDeviceOrientation
		 *
		 * @description
		 * The collection of watchers that are currently active.
		 * This property should only be used in automated tests.
		**/		
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
			var watchId = Math.floor((Math.random() * 1000000) + 1);

			this.readings = [];
			self = this;

			if (this.throwsError) {
				defer.reject('There was an error getting the compass heading.');
			} else {
				var delay = 100;		// The default based on https://github.com/apache/cordova-plugin-device-orientation/blob/master/doc/index.md
				if (options && options.frequency) {
					delay = options.frequency;
				}				

				this.watchIntervals.push({
					watchId: watchId,
					interval: $interval(
						function() {
							if (self.throwsError) {
								defer.reject('There was an error watching the acceleration.');
							}

							// Generate a random position
							var magneticHeading = (Math.random() * 359.99) + 1;
							var trueHeading = (Math.random() * 359.99) + 1;
							var headingAccuracy = Math.floor((Math.random() * 360) + 1);
							var result = { magneticHeading: magneticHeading, trueHeading: trueHeading, headingAccuracy:headingAccuracy, timestamp:Date.now() };

							self.readings.push(result);
							defer.notify(result);	
						}, 
						delay
					)
				});
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
					for (var i=0; i<this.watchIntervals.length; i++) {
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
		 * @ngdoc property
		 * @name dialogText
		 * @propertyOf ngCordovaMocks.cordovaDialogs
		 *
		 * @description
		 * The main content in the dialog.
		 * This property should only be used in automated tests.
		**/		
		dialogText: dialogText,

        /**
		 * @ngdoc property
		 * @name dialogTitle
		 * @propertyOf ngCordovaMocks.cordovaDialogs
		 *
		 * @description
		 * The title of the dialog.
		 * This property should only be used in automated tests.
		**/		
		dialogTitle: dialogTitle,

        /**
		 * @ngdoc property
		 * @name defaultValue
		 * @propertyOf ngCordovaMocks.cordovaDialogs
		 *
		 * @description
		 * The default value to be used in a prompt.
		 * This property should only be used in automated tests.
		**/
		defaultValue: defaultValue,

        /**
		 * @ngdoc property
		 * @name promptResponse
		 * @propertyOf ngCordovaMocks.cordovaDialogs
		 *
		 * @description
		 * Used to simulate a user's response to a prompt.
		 * This property should only be used in automated tests.
		**/
		promptResponse: promptResponse,

        /**
		 * @ngdoc property
		 * @name buttonLabels
		 * @propertyOf ngCordovaMocks.cordovaDialogs
		 *
		 * @description
		 * An array of the text of each button in the dialog.
		 * This property should only be used in automated tests.
		**/		
		buttonLabels: [],

        /**
		 * @ngdoc property
		 * @name beepCount
		 * @propertyOf ngCordovaMocks.cordovaDialogs
		 *
		 * @description
		 * The number of times a beep has occurred.
		 * This property should only be used in automated tests.
		**/		
		beepCount: beepCount,

        /**
		 * @ngdoc property
		 * @name useHostAbilities
		 * @propertyOf ngCordovaMocks.cordovaDialogs
		 *
		 * @description
		 * A flag that signals whether or not to try and use the host's 
		 * (browser or otherwise) prompting capabilities.
		 * This property should only be used in automated tests.
		**/
		useHostAbilities: useHostAbilities,		

		alert: function(message, title, buttonName) {
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

		confirm: function(message, title, buttonName) {
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

		prompt: function(message, title, buttonLabels, defaultText) {
			var d = $q.defer();

			if (this.useHostAbilities) {
				// NOTE: The window.prompt method doesn't support a title or custom button naming.
				var result = prompt(message, defaultText);
				d.resolve(result);
			} else {
				this.dialogText = message;
				this.dialogTitle = title;
				this.defaultValue = defaultText;

				for (var i=0; i<buttonLabels.length; i++) {
					this.buttonLabels.push(buttonLabels[i]);
				}

				d.resolve(this.promptResponse);
			}

			return d.promise;
		},

		beep: function(times) {
			this.beepCount = times;
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
ngCordovaMocks.factory('$cordovaFile', ['$q', function($q) {
	var throwsError = false;
	var fileSystem = {};

	var mockIt = function(errorMessage) {
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

		checkDir: function(directory) {
			return mockIt.call(this, 'There was an error checking the directory.');		
		},

		createDir: function(directory, overwrite) {
			return mockIt.call(this, 'There was an error creating the directory.');		
		},

		listDir: function(filePath) {
		 	return mockIt.call(this, 'There was an error listing the directory');
		},

		checkFile: function(directory, file) {
			return mockIt.call(this, 'There was an error checking for the file.');	
		},

		createFile: function(directory, file, overwrite) {
			return mockIt.call(this, 'There was an error creating the file.');
		},

		removeFile: function(directory, file) {
			return mockIt.call(this,'There was an error removng the file.');	
		},

		writeFile: function(directory, file, options) {
			return mockIt.call(this,'There was an error writing the file.');		
		},

		readFile: function(directory, file) {
			return mockIt.call(this, 'There was an error reading the file.');			
		},

		readAsText: function (filePath) {
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
		},

		downloadFile: function(source, filePath, trust, options) {
			return mockIt.call(this, 'There was an error downloading the file.');	
		},

		uploadFile: function(server, filePath, options) {
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
ngCordovaMocks.factory('$cordovaGeolocation', ['$interval', '$q', function($interval, $q) {
	var throwsError = false;
	var useHostAbilities = true;

	var watchIntervals = [];
	var locations = [];
	var currentPosition = null;
	var nextPosition = null;

	return {
        /**
		 * @ngdoc property
		 * @name throwsError
		 * @propertyOf ngCordovaMocks.cordovaGeolocation
		 *
		 * @description
		 * A flag that signals whether a promise should be rejected or not. 
		 * This property should only be used in automated tests.
		**/
		throwsError: throwsError,

        /**
		 * @ngdoc property
		 * @name watchIntervals
		 * @propertyOf ngCordovaMocks.cordovaGeolocation
		 *
		 * @description
		 * The collection of watchers that are currently active.
		 * This property should only be used in automated tests.
		**/		
		watchIntervals: watchIntervals,

        /**
		 * @ngdoc property
		 * @name locations
		 * @propertyOf ngCordovaMocks.cordovaGeolocation
		 *
		 * @description
		 * The collection of 'locations' that have been logged.
		 * This property should only be used in automated tests.
		**/				
		locations: locations,

        /**
		 * @ngdoc property
		 * @name currentPosition
		 * @propertyOf ngCordovaMocks.cordovaGeolocation
		 *
		 * @description
		 * The last location logged.
		 * This property should only be used in automated tests.
		**/						
		currentPosition: currentPosition,

        /**
		 * @ngdoc property
		 * @name nextPosition
		 * @propertyOf ngCordovaMocks.cordovaGeolocation
		 *
		 * @description
		 * The position to be logged the next time that a watcher
		 * gets the location.
		 * This property should only be used in automated tests.
		**/						
		nextPosition: nextPosition,

        /**
		 * @ngdoc property
		 * @name useHostAbilities
		 * @propertyOf ngCordovaMocks.cordovaGeolocation
		 *
		 * @description
		 * A flag that signals whether or not to try and use the host's 
		 * (browser or otherwise) geolocation capabilities.
		 * This property should only be used in automated tests.
		**/
		useHostAbilities: useHostAbilities,

		getCurrentPosition: function(options) {
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
							function(position) {
								this.currentPosition = position;
								defer.resolve(this.currentPosition);
							},
							function(error) {
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

		watchPosition: function(options) {
			var defer = $q.defer();
			var watchId = Math.floor((Math.random() * 1000000) + 1);

			this.locations = [];
			self = this;

			if (this.throwsError) {
				defer.reject('There was an error getting the geolocation.');
			} else {
				var delay = 1000;
				if (options && options.timeout) {
					delay = options.timeout;
				}				

				this.watchIntervals.push({
					watchId: watchId,
					interval: $interval(
						function() {
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
											function(position) {
												self.currentPosition = position;
												self.locations.push(position);
												defer.resolve(position);
											},
											function(error) {
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
					for (var i=0; i<this.watchIntervals.length; i++) {
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
 * @name ngCordovaMocks.cordovaGlobalization
 *
 * @description
 * A service for testing features related to a user's locale and timezone.
 * in an app build with ngCordova.
 */ 
ngCordovaMocks.factory('$cordovaGlobalization', ['$q', function($q) {
	var throwsError = false;
	var preferredLanguage = 'en';
	var firstDayOfWeek = 'Sunday';
	var localeName = '';

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

		getPreferredLanguage: function() {
			var defer = $q.defer();
			if (this.throwsError) {
				defer.reject('There was an error getting the preferred language.');
			} else {
				defer.resolve(this.preferredLanguage);
			}
			return defer.promise;
		},

		getLocaleName: function() {
			var defer = $q.defer();
			if (this.throwsError) {
				defer.reject('There was an error getting the locale name.');
			} else {
				defer.resolve(this.localeName);
			}
			return defer.promise;
		},

		getFirstDayOfWeek: function() {
			var defer = $q.defer();
			if (this.throwsError) {
				defer.reject('There was an error getting the first day of week.');
			} else {
				defer.resolve(this.firstDayOfWeek);
			}
			return defer.promise;
		},

		dateToString: function(date, options) {
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

		stringToDate: function(dateString, options) {
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

		getDatePattern: function(options) {
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

		getDateNames: function(options) {
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

		isDayLightSavingsTime: function(date) {
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

		numberToString: function(number, options) {
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

		stringToNumber: function(numberString, options) {
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

		getNumberPattern: function(options) {
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

		getCurrencyPattern: function(currencyCode) {
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
 * @name ngCordovaMocks.cordovaNetwork
 *
 * @description
 * A service for testing networked fetures
 * in an app build with ngCordova.
 */  
ngCordovaMocks.factory('$cordovaNetwork', function () {
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
		 * https://github.com/apache/cordova-plugin-network-information/blob/master/doc/index.md 
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
});
/**
 * @ngdoc service
 * @name ngCordovaMocks.cordovaSocialSharing
 *
 * @description
 * A service for testing via social services
 * in an app build with ngCordova.
 */ 
ngCordovaMocks.factory('$cordovaSocialSharing', ['$q', function($q) {
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

		shareViaTwitter: function(message, image, link) {
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

		shareViaWhatsApp: function(message, image, link) {
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

		shareViaFacebook: function(message, image, link) {
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

		shareViaSMS: function(message, number) {
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

		shareViaEmail: function(message, subject, toArr, bccArr, file) {
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

		canShareViaEmail: function() {
			var defer = $q.defer();
			if (this.throwsError) {
				defer.reject(false);
			} else {
				defer.resolve(true);
			}
			return defer.promise;
		},

		canShareVia: function(via, message, subject, file, link) {
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

		shareVia: function(via, message, subject, file, link) {
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

		share: function(message, subject, file, link) {
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
ngCordovaMocks.factory('$cordovaSplashscreen', function() {
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

		hide: function() {
			// do nothing. everything happens behind the scenes in this case.
			// its a stub that is present for completeness.
			this.isVisible = false;
			return true;
		},
		show: function() {
			// do nothing. everything happens behind the scenes in this case.
			// its a stub that is present for completeness.
			this.isVisible = true;
			return true;
		}
	};
});
/**
 * @ngdoc service
 * @name ngCordovaMocks.cordovaStatusbar
 *
 * @description
 * A service for testing the status bar
 * in an app build with ngCordova.
 */ 
ngCordovaMocks.factory('$cordovaStatusbar', function() {
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

		overlaysWebView: function(bool) {
			this.canOverlayWebView = bool;
		},

		style: function(style) {
			// TODO: Review
			return style;
		},

		styleHex: function(colorHex) {
			// TODO: review
			return colorHex;
		},

		styleColor: function(color) {
			// TODO: review
			return color;
		},

		hide: function() {
			this.isStatusBarVisible = false;
		},

		show: function() {
			this.isStatusBarVisible = true;
		},

		isVisible: function () {
			return this.isStatusBarVisible;
		}
	};
});
/**
 * @ngdoc service
 * @name ngCordovaMocks.cordovaVibration
 *
 * @description
 * A service for testing vibration
 * in an app build with ngCordova.
 */ 
ngCordovaMocks.factory('$cordovaVibration', ['$timeout', function($timeout) {
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

		vibrate: function(time) {
			if (time > 0) {
				this.isVibrating = true;
				self = this;

				if (time instanceof Array) {
					// TODO: Implement pattern here.
					// The following is a temporary timer that just looks at the first value
					this.vibrateTimer = $timeout(
						function() {
							self.isVibrating = false;
							self.vibrateTimer = null;
						},
						time[0]
					);					
				} else {
					this.vibrateTimer = $timeout(
						function() {
							self.isVibrating = false;
							self.vibrateTimer = null;
						},
						time
					);					
				}
			}
		},

		/* jshint ignore:start */
		vibrateWithPattern: function(pattern, repeat) {
			// Based on the documentation (https://github.com/apache/cordova-plugin-vibration/blob/master/doc/index.md)
			// This method is deprecated. For that reason, this isn't implemented at this time.
		},
		/* jshint ignore:end */

		cancelVibration: function() {
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