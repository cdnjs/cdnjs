/*!
 * ngCordova
 * Copyright 2014 Drifty Co. http://drifty.com/
 * See LICENSE in this repository for license information
 */
(function(){

angular.module('ngCordova', [
  'ngCordova.plugins'
]);

// install  :     cordova plugin add com.google.cordova.admob
// link     :     https://github.com/floatinghotpot/cordova-admob-pro

angular.module('ngCordova.plugins.adMob', [])

  .factory('$cordovaAdMob', [function () {

    return {
      createBannerView: function (options, success, fail) {
        return window.plugins.AdMob.createBannerView(options, success, fail);
      },
      createInterstitialView: function (options, success, fail) {
        return window.plugins.AdMob.createInterstitialView(options, success, fail);
      },
      requestAd: function (options, success, fail) {
        return window.plugins.AdMob.requestAd(options, success, fail);
      },
      showAd: function (options, success, fail) {
        return window.plugins.AdMob.showAd(options, success, fail);
      },
      requestInterstitialAd: function (options, success, fail) {
        return window.plugins.AdMob.requestInterstitialAd(options, success, fail);
      }
    }
  }]);
// install  :     cordova plugin add https://github.com/ohh2ahh/AppAvailability.git
// link     :     https://github.com/ohh2ahh/AppAvailability

angular.module('ngCordova.plugins.appAvailability', [])

.factory('$cordovaAppAvailability', ['$q', function ($q) {

  return {
    check: function(urlScheme) {
      var q = $q.defer();

      appAvailability.check(urlScheme, function (result) {
        q.resolve(result);
      }, function (err) {
        q.reject(err);
      });

      return q.promise;
    }
  }
}]);

// install   :     cordova plugin add https://github.com/christocracy/cordova-plugin-background-geolocation.git
// link      :     https://github.com/christocracy/cordova-plugin-background-geolocation

angular.module('ngCordova.plugins.backgroundGeolocation', [])

  .factory('$cordovaBackgroundGeolocation', ['$q', function ($q) {

    return {

      init: function () {
        window.navigator.geolocation.getCurrentPosition(function (location) {
          return location;
        });
      },

      configure: function (options) {

        this.init();
        var q = $q.defer();

        window.plugins.backgroundGeoLocation.configure(
          function (result) {
            q.resolve(result);
            window.plugins.backgroundGeoLocation.finish();
          },
          function (err) {
            q.reject(err);
          }, options);

        this.start();

        return q.promise;
      },

      start: function () {
        var q = $q.defer();

        window.plugins.backgroundGeoLocation.start(
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

        window.plugins.backgroundGeoLocation.stop(
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

// install  :    cordova plugin add https://github.com/wildabeast/BarcodeScanner.git
// link     :    https://github.com/wildabeast/BarcodeScanner/#using-the-plugin

angular.module('ngCordova.plugins.barcodeScanner', [])

  .factory('$cordovaBarcodeScanner', ['$q', function ($q) {

    return {
      scan: function (options) {
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

//  install   :   cordova plugin add org.apache.cordova.battery-status
//  link      :   https://github.com/apache/cordova-plugin-battery-status/blob/master/doc/index.md

angular.module('ngCordova.plugins.battery-status', [])

  .factory('$cordovaBatteryStatus', [function () {
    return {
      onBatteryStatus: function (handler) {
        window.addEventListener('batterystatus', handler, false);
      },
      onBatteryCritical: function (handler) {
        window.addEventListener('batterycritical', handler, false);
      },
      onBatteryLow: function (handler) {
        window.addEventListener('batterylow', handler, false);
      }
    }
  }]);
// install   :
// link      :

angular.module('ngCordova.plugins.bluetoothSerial', [])

  .factory('$cordovaBluetoothSerial', ['$q' , function ($q) {

    var promise_f = function () {
      var q = $q.defer();

      // callbacks
      var success = function (success) {
        q.resolve(success);
      };
      var failure = function (failure) {
        q.reject(failure);
      };

      // get func and set args
      var f_name = arguments[0];
      var args = Array.prototype.slice.call(arguments, 1, arguments.length);
      args.push(success);
      args.push(failure);

      window.bluetoothSerial[f_name].apply(this, args);

      return q.promise;
    };

    return {
      connect: function (macAddress) {
        return promise_f('connect', macAddress);
      },
      connectInsecure: function (macAddress) {
        return promise_f('connectInsecure', macAddress);
      },
      disconnect: function () {
        return promise_f('disconnect');
      },
      list: function () {
        return promise_f('list');
      },
      isEnabled: function () {
        return promise_f('isEnabled');
      },
      isConnected: function () {
        return promise_f('isConnected');
      },
      available: function () {
        return promise_f('available');
      },
      read: function () {
        return promise_f('read');
      },
      readUntil: function (delimiter) {
        return promise_f('readUntil', delimiter);
      },
      write: function (data) {
        return promise_f('write', data);
      },
      subscribe: function (delimiter) {
        return promise_f('subscribe', delimiter);
      },
      unsubscribe: function () {
        return promise_f('unsubscribe');
      },
      clear: function () {
        return promise_f('clear');
      },
      readRSSI: function () {
        return promise_f('readRSSI');
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

      cleanup: function (options) {
        var q = $q.defer();

        navigator.camera.cleanup(function () {
          q.resolve(arguments);
        }, function (err) {
          q.reject(err);
        });

        return q.promise;
      }
    }
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
    }
  }]);

// install   :     cordova plugin add https://github.com/VersoSolutions/CordovaClipboard
// link      :     https://github.com/VersoSolutions/CordovaClipboard

angular.module('ngCordova.plugins.clipboard', [])

  .factory('$cordovaClipboard', ['$q', function ($q) {

    return {
      copy: function (text) {
        var q = $q.defer();

        window.cordova.plugins.clipboard.copy(text,
          function () {
            q.resolve();
          }, function () {
            q.reject();
          });

        return q.promise;
      },

      paste: function () {
        var q = $q.defer();

        window.cordova.plugins.clipboard.paste(function (text) {
          q.resolve(text);
        }, function () {
          q.reject();
        });

        return q.promise;
      }
    }
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

angular.module('ngCordova.plugins.datePicker', [])

  .factory('$cordovaDatePicker', ['$window', function ($window) {

    return {
      show: function(options, fn) {
        return $window.datePicker.show(options, fn);
      }
    }

  }]);

// install   :     cordova plugin add org.apache.cordova.device
// link      :     https://github.com/apache/cordova-plugin-device/blob/master/doc/index.md

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

      // Warning: device.name is deprecated as of version 2.3.0. Use device.model instead.
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

// install   :     cordova plugin add org.apache.cordova.device-motion
// link      :     https://github.com/apache/cordova-plugin-device-motion/blob/master/doc/index.md

angular.module('ngCordova.plugins.deviceMotion', [])

  .factory('$cordovaDeviceMotion', ['$q', function ($q) {

    return {
      getCurrentAcceleration: function () {
        var q = $q.defer();

        navigator.accelerometer.getCurrentAcceleration(function (result) {
          // Do any magic you need
          q.resolve(result);
        }, function (err) {
          q.reject(err);
        });

        return q.promise;
      },

      watchAcceleration: function (options) {
        var q = $q.defer();

        var watchId = navigator.accelerometer.watchAcceleration(function (result) {
          // Do any magic you need
          //q.resolve(watchID);
          q.notify(result);
        }, function (err) {
          q.reject(err);
        }, options);

        return {
          watchId: watchId,
          promise: q.promise
        }
      },

      clearWatch: function (watchID) {
        return navigator.accelerometer.clearWatch(watchID);
      }
    }
  }]);

// install   :     cordova plugin add org.apache.cordova.device-orientation
// link      :     https://github.com/apache/cordova-plugin-device-orientation/blob/master/doc/index.md

angular.module('ngCordova.plugins.deviceOrientation', [])

  .factory('$cordovaDeviceOrientation', ['$q', function ($q) {

    return {
      getCurrentHeading: function () {
        var q = $q.defer();

        navigator.compass.getCurrentHeading(function (heading) {
          q.resolve(heading);
        }, function (err) {
          q.reject(err);
        });

        return q.promise;
      },

      watchHeading: function (options) {
        var q = $q.defer();

        var watchId = navigator.compass.watchHeading(function (result) {
          q.notify(result);
        }, function (err) {
          q.reject(err);
        }, options);

        return {
          watchId: watchId,
          promise: q.promise
        }
      },

      clearWatch: function (watchID) {
        navigator.compass.clearWatch(watchID);
      }
    }
  }]);

// install   :     cordova plugin add org.apache.cordova.dialogs
// link      :     https://github.com/apache/cordova-plugin-dialogs/blob/master/doc/index.md

angular.module('ngCordova.plugins.dialogs', [])

  .factory('$cordovaDialogs', ['$q', function ($q) {

    return {
      alert: function (message, title, buttonName) {
        var d = $q.defer();

        navigator.notification.alert(message, function () {
          d.resolve();
        }, title, buttonName);

        return d.promise;
      },

      confirm: function (message, title, buttonLabels) {
        var d = $q.defer();

        navigator.notification.confirm(message, function () {
          d.resolve();
        }, title, buttonLabels);

        return d.promise;
      },

      prompt: function (message, title, buttonLabels, defaultText) {
        var d = $q.defer();

        navigator.notification.confirm(message, function () {
          d.resolve();
        }, title, buttonLabels, defaultText);

        return d.promise;
      },

      beep: function (times) {
        return navigator.notification.beep(times);
      }
    };
  }]);

// install   :
// link      :

'use strict';
angular.module('ngCordova.plugins.facebookConnect', [])
  .provider('$cordova', [

    function () {
      this.FacebookAppId = undefined;

      this.setFacebookAppId = function (id) {
        this.FacebookAppId = id;
      };

      this.$get = [
        function () {
          var FbAppId = this.FacebookAppId;
          return {
            getFacebookAppId: function () {
              return FbAppId;
            }
          };
        }];
    }
  ])
  .factory('$cordovaFacebookConnect', ['$q', '$cordova', function ($q, $cordova) {

    return {
      init: function (appId) {
        if (!window.cordova) {
          facebookConnectPlugin.browserInit(appId);
        }
      },

      login: function (o) {
        this.init($cordova.getFacebookAppId());

        var q = $q.defer();
        facebookConnectPlugin.login(o,
          function (res) {
            q.resolve(res);
          }, function (res) {
            q.reject(res);
          });

        return q.promise;
      },

      showDialog: function (o) {

        var q = $q.defer();
        facebookConnectPlugin.showDialog(o,
          function (res) {
            q.resolve(res);
          },
          function (err) {
            q.reject(err);
          });

        return q.promise;
      },

      api: function (path, permission) {

        var q = $q.defer();
        facebookConnectPlugin.api(path, permission,
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
  .factory('$cordovaFile', ['$q', function ($q) {

    return {
      checkDir: function (dir) {
        var q = $q.defer();

        getFilesystem().then(
          function (filesystem) {
            filesystem.root.getDirectory(dir, {create: false},
              //Dir exists
              function (entry) {
                q.resolve(entry);
              },
              //Dir doesn't exist
              function (error_code) {
                q.reject(error_code);
              }
            );
          }
        );

        return q.promise;
      },

      createDir: function (dir, replaceBOOL) {
        var q = $q.defer();

        getFilesystem().then(
          function (filesystem) {
            filesystem.root.getDirectory(dir, {create: true, exclusive: replaceBOOL},
              //Dir exists or is created successfully
              function (entry) {
                q.resolve(entry);
              },
              //Dir doesn't exist and is not created
              function (error_code) {
                q.reject(error_code);
              }
            );
          }
        );
        return q.promise;
      },

      listDir: function (filePath) {
        var q = $q.defer();

        getFilesystem().then(
          function (filesystem) {
            filesystem.root.getDirectory(filePath, {create: false}, function (parent) {
              var reader = parent.createReader();
              reader.readEntries(
                function (entries) {
                  q.resolve(entries);
                },
                function () {
                  q.reject('DIR_READ_ERROR : ' + filePath);
                }
              );
            }, function () {
              q.reject('DIR_NOT_FOUND : ' + filePath);
            });
          }
        );

        return q.promise;
      },

      checkFile: function (filePath) {
        var q = $q.defer();

        // Backward compatibility for previous function checkFile(dir, file)
        if (arguments.length == 2) {
          filePath = '/' + filePath + '/' + arguments[1];
        }

        getFilesystem().then(
          function (filesystem) {
            filesystem.root.getFile(filePath, {create: false},
              // File exists
              function (file) {
                q.resolve(file);
              },
              // File doesn't exist
              function (error_code) {
                q.reject(error_code);
              }
            );
          }
        );

        return q.promise;
      },

      createFile: function (filePath, replaceBOOL) {
        // Backward compatibility for previous function createFile(filepath replaceBOOL)
        var q = $q.defer();

        if (arguments.length == 3) {
          filePath = '/' + filePath + '/' + arguments[1];
          replaceBOOL = arguments[2];
        }

        getFilesystem().then(
          function (filesystem) {
            filesystem.root.getFile(filePath, {create: true, exclusive: replaceBOOL},
              function (success) {
                q.resolve(success);
              },
              function (err) {
                q.reject(err);
              });
          }
        );

        return q.promise;
      },

      removeFile: function (filePath) {
        var q = $q.defer();

        // Backward compatibility for previous function removeFile(dir, file)
        if (arguments.length == 2) {
          filePath = '/' + filePath + '/' + arguments[1];
        }

        getFilesystem().then(
          function (filesystem) {
            filesystem.root.getFile(filePath, {create: false}, function (fileEntry) {
              fileEntry.remove(function () {
                q.resolve();
              });
            });
          }
        );

        return q.promise;
      },

      writeFile: function (filePath, data) {
        var q = $q.defer();

        getFilesystem().then(
          function (filesystem) {
            filesystem.root.getFile(filePath, {create: true},
              function (fileEntry) {
                fileEntry.createWriter(
                  function (fileWriter) {
                    fileWriter.onwriteend = function (evt) {
                      q.resolve(evt);
                    };
                    fileWriter.write(data);
                  },
                  function (error) {
                    q.reject(error);
                  }
                );
              },
              function (error) {
                q.reject(error);
              }
            );
          },
          function (error) {
            q.reject(error);
          }
        );

        return q.promise;
      },

      readFile: function (filePath) {  /// now deprecated in new ng-cordova version
        var q = $q.defer();
        console.log('readFile is now deprecated as of v0.1.4-alpha, use readAsText instead');

        // Backward compatibility for previous function readFile(dir, file)
        if (arguments.length == 2) {
          filePath = '/' + filePath + '/' + arguments[1];
        }

        getFilesystem().then(
          function (filesystem) {

            filesystem.root.getFile(filePath, {create: false},
              // success
              function (fileEntry) {
                fileEntry.file(function (file) {
                  var reader = new FileReader();
                  reader.onloadend = function () {
                    q.resolve(this.result);
                  };

                  reader.readAsText(file);
                });
              },
              // error
              function (error) {
                q.reject(error);
              });
          }
        );

        return q.promise;
      },

      readAsText: function (filePath) {
        var q = $q.defer();

        // Backward compatibility for previous function readFile(dir, file)
        if (arguments.length == 2) {
          filePath = '/' + filePath + '/' + arguments[1];
        }

        getFilesystem().then(
          function (filesystem) {

            filesystem.root.getFile(filePath, {create: false},
              // success
              function (fileEntry) {
                fileEntry.file(function (file) {
                  var reader = new FileReader();
                  reader.onloadend = function () {
                    q.resolve(this.result);
                  };

                  reader.readAsText(file);
                });
              },
              // error
              function (error) {
                q.reject(error);
              });
          }
        );

        return q.promise;
      },


      readAsDataURL: function (filePath) {
        var q = $q.defer();

        // Backward compatibility for previous function readFile(dir, file)
        if (arguments.length == 2) {
          filePath = '/' + filePath + '/' + arguments[1];
        }

        getFilesystem().then(
          function (filesystem) {

            filesystem.root.getFile(filePath, {create: false},
              // success
              function (fileEntry) {
                fileEntry.file(function (file) {
                  var reader = new FileReader();
                  reader.onloadend = function () {
                    q.resolve(this.result);
                  };

                  reader.readAsDataURL(file);
                });
              },
              // error
              function (error) {
                q.reject(error);
              });
          }
        );

        return q.promise;
      },

      readAsBinaryString: function (filePath) {
        var q = $q.defer();

        // Backward compatibility for previous function readFile(dir, file)
        if (arguments.length == 2) {
          filePath = '/' + filePath + '/' + arguments[1];
        }

        getFilesystem().then(
          function (filesystem) {

            filesystem.root.getFile(filePath, {create: false},
              // success
              function (fileEntry) {
                fileEntry.file(function (file) {
                  var reader = new FileReader();
                  reader.onloadend = function () {
                    q.resolve(this.result);
                  };

                  reader.readAsBinaryString(file);
                });
              },
              // error
              function (error) {
                q.reject(error);
              });
          }
        );

        return q.promise;
      },

      readAsArrayBuffer: function (filePath) {
        var q = $q.defer();

        // Backward compatibility for previous function readFile(dir, file)
        if (arguments.length == 2) {
          filePath = '/' + filePath + '/' + arguments[1];
        }

        getFilesystem().then(
          function (filesystem) {

            filesystem.root.getFile(filePath, {create: false},
              // success
              function (fileEntry) {
                fileEntry.file(function (file) {
                  var reader = new FileReader();
                  reader.onloadend = function () {
                    q.resolve(this.result);
                  };

                  reader.readAsArrayBuffer(file);
                });
              },
              // error
              function (error) {
                q.reject(error);
              });
          }
        );

        return q.promise;
      },

      readFileMetadata: function (filePath) {
        var q = $q.defer();

        getFilesystem().then(
          function (filesystem) {
            filesystem.root.getFile(filePath, {create: false},
              // success
              function (fileEntry) {
                fileEntry.file(function (file) {
                  q.resolve(file);
                });
              },
              // error
              function (error) {
                q.reject(error);
              });
          }
        );

        return q.promise;
      },

      readFileAbsolute: function () {
        var q = $q.defer();
        window.resolveLocalFileSystemURI(filePath,
          function (fileEntry) {
            fileEntry.file(function (file) {
              var reader = new FileReader();
              reader.onloadend = function () {
                q.resolve(this.result);
              };

              reader.readAsText(file);
            })
          },
          function (error) {
            q.reject(error);
          }
        );
      },

      readFileMetadataAbsolute: function (filePath) {
        var q = $q.defer();
        window.resolveLocalFileSystemURI(filePath,
          function (fileEntry) {
            fileEntry.file(function (file) {
              q.resolve(file);
            })
          },
          function (error) {
            q.reject(error);
          }
        );

        return q.promise;
      },

      downloadFile: function (source, filePath, trustAllHosts, options) {
        var q = $q.defer();
        var fileTransfer = new FileTransfer();
        var uri = encodeURI(source);

        fileTransfer.onprogress = function (progressEvent) {
          q.notify(progressEvent);
        };

        fileTransfer.download(
          uri,
          filePath,
          function (entry) {
            q.resolve(entry);
          },
          function (error) {
            q.reject(error);
          },
          trustAllHosts, options);

        return q.promise;
      },

      uploadFile: function (server, filePath, options) {
        var q = $q.defer();
        var fileTransfer = new FileTransfer();
        var uri = encodeURI(server);

        fileTransfer.onprogress = function (progressEvent) {
          q.notify(progressEvent);
        };

        fileTransfer.upload(
          filePath,
          uri,
          function (result) {
            q.resolve(result);
          },
          function (error) {
            q.reject(error);
          },
          options);

        return q.promise
      }

    };

    function getFilesystem() {
      var q = $q.defer();

      window.requestFileSystem(LocalFileSystem.PERSISTENT, 1024 * 1024, function (filesystem) {
          q.resolve(filesystem);
        },
        function (err) {
          q.reject(err);
        });

      return q.promise;
    }
  }]);

// install   :     cordova plugin add https://github.com/EddyVerbruggen/Flashlight-PhoneGap-Plugin.git
// link      :     https://github.com/EddyVerbruggen/Flashlight-PhoneGap-Plugin

angular.module('ngCordova.plugins.flashlight', [])

  .factory('$cordovaFlashlight', ['$q', function ($q) {

    return {
      available: function () {
        var q = $q.defer();
        window.plugins.flashlight.available(function (isAvailable) {
          q.resolve(isAvailable);
        });
        return q.promise;
      },

      switchOn: function () {
        var q = $q.defer();
        window.plugins.flashlight.switchOn(function (response) {
          q.resolve(response);
        }, function (error) {
          q.reject(error)
        });
        return q.promise;
      },

      switchOff: function () {
        var q = $q.defer();
        window.plugins.flashlight.switchOff(function (response) {
          q.resolve(response);
        }, function (error) {
          q.reject(error)
        });
        return q.promise;
      }
    }
  }]);
// install   :     cordova plugin add https://github.com/phonegap-build/GAPlugin.git
// link      :     https://github.com/phonegap-build/GAPlugin

angular.module('ngCordova.plugins.ga', [])

  .factory('$cordovaGA', ['$q', function ($q) {

    return {
      init: function (id, mingap) {
        var q = $q.defer();
        mingap = (mingap >= 0) ? mingap : 10;
        window.plugins.gaPlugin.init(function (result) {
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
        window.plugins.gaPlugin.trackEvent(function (result) {
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
        window.plugins.gaPlugin.trackPage(function (result) {
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
        window.plugins.gaPlugin.setVariable(function (result) {
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
        window.plugins.gaPlugin.exit(function (result) {
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
          // Do any magic you need
          q.resolve(result);
        }, function (err) {
          q.reject(err);
        }, options);

        return q.promise;
      },
      watchPosition: function (options) {
        var q = $q.defer();

        var watchId = navigator.geolocation.watchPosition(function (result) {
          // Do any magic you need
          q.notify(result);

        }, function (err) {
          q.reject(err);
        }, options);

        return {
          watchId: watchId,
          promise: q.promise
        }
      },

      clearWatch: function (watchID) {
        return navigator.geolocation.clearWatch(watchID);
      }
    }
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

    }

  }]);

// install   :
// link      :

// Google Maps needs ALOT of work!
// Not for production use

angular.module('ngCordova.plugins.googleMap', [])

  .factory('$cordovaGoogleMap', ['$q', function ($q) {

    var map = null;

    return {
      getMap: function (options) {
        var q = $q.defer();

        if (!window.plugin.google.maps) {
          q.reject(null);
        }
        else {
          var div = document.getElementById("map_canvas");
          map = window.plugin.google.maps.Map.getMap(options);
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
        return window.plugin.google.maps.mapTypeId;
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
    }
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
        return cordova.plugins.Keyboard.isVisible
      }
    }
  }]);

// install   :      cordova plugin add https://github.com/shazron/KeychainPlugin.git
// link      :      https://github.com/shazron/KeychainPlugin

angular.module('ngCordova.plugins.keychain', [])

  .factory('$cordovaKeychain', ['$q', function ($q) {

    var kc = new Keychain();

    return {
      getForKey: function (key, serviceName) {
        var defer = $q.defer();

        kc.getForKey(function (value) {
          defer.resolve(value);
        }, function (error) {
          defer.reject(error);
        }, key, serviceName);

        return defer.promise;
      },

      setForKey: function (key, serviceName, value) {
        var defer = $q.defer();

        kc.setForKey(function () {
          defer.resolve();
        }, function (error) {
          defer.reject(error);
        }, key, serviceName, value);

        return defer.promise;
      },

      removeForKey: function (ey, serviceName) {
        var defer = $q.defer();

        kc.removeForKey(function () {
          defer.resolve();
        }, function (error) {
          defer.reject(error);
        }, key, serviceName);

        return defer.promise;
      }
    }
  }]);
// install   :
// link      :

angular.module('ngCordova.plugins.localNotification', [])

  .factory('$cordovaLocalNotification', ['$q',
    function ($q) {

      return {
        add: function (options, scope) {
          var q = $q.defer();
          window.plugin.notification.local.add(
            options,
            function (result) {
              q.resolve(result);
            },
            scope);
          return q.promise;
        },

        cancel: function (id, scope) {
          var q = $q.defer();
          window.plugin.notification.local.cancel(
            id, function (result) {
              q.resolve(result);
            }, scope);

          return q.promise;
        },

        cancelAll: function (scope) {
          var q = $q.defer();

          window.plugin.notification.local.cancelAll(
            function (result) {
              q.resolve(result);
            }, scope);

          return q.promise;
        },

        isScheduled: function (id, scope) {
          var q = $q.defer();

          window.plugin.notification.local.isScheduled(
            id,
            function (result) {
              q.resolve(result);
            }, scope);

          return q.promise;
        },

        getScheduledIds: function (scope) {
          var q = $q.defer();

          window.plugin.notification.local.getScheduledIds(
            function (result) {
              q.resolve(result);
            }, scope);

          return q.promise;
        },

        isTriggered: function (id, scope) {
          var q = $q.defer();

          window.plugin.notification.local.isTriggered(
            id, function (result) {
              q.resolve(result);
            }, scope);

          return q.promise;
        },

        getTriggeredIds: function (scope) {
          var q = $q.defer();

          window.plugin.notification.local.getTriggeredIds(
            function (result) {
              q.resolve(result);
            }, scope);

          return q.promise;
        },

        getDefaults: function () {
          return window.plugin.notification.local.getDefaults();
        },

        setDefaults: function (Object) {
          window.plugin.notification.local.setDefaults(Object);
        },

        onadd: function () {
          return window.plugin.notification.local.onadd;
        },

        ontrigger: function () {
          return window.plugin.notification.local.ontrigger;
        },

        onclick: function () {
          return window.plugin.notification.local.onclick;
        },

        oncancel: function () {
          return window.plugin.notification.local.oncancel;
        }
      }
    }
  ]);
// install   :
// link      :

angular.module('ngCordova.plugins.media', [])

  .factory('$cordovaMedia', ['$q', function ($q) {

    return {
      newMedia: function (src) {
        var q = $q.defer();
        var mediaStatus = null;

        var media = new Media(src,
          function (success) {
            q.resolve(success);
          }, function (error) {
            q.reject(error);
          }, function (status) {
            mediaStatus = status;
          });

        return {
          media: media,
          mediaStatus: mediaStatus,
          promise: q.promise
        }

      },

      getCurrentPosition: function (source) {
        var q = $q.defer();

        source.getCurrentPosition(function (success) {
          q.resolve(success);

        }, function (error) {
          q.reject(error);
        });

        return q.promise;
      },

      getDuration: function (source) {

        return source.getDuration();
      },

      play: function (source) {
        return source.play();

        // iOS quirks :
        // -  myMedia.play({ numberOfLoops: 2 }) -> looping
        // -  myMedia.play({ playAudioWhenScreenIsLocked : false })
      },

      pause: function (source) {
        return source.pause();
      },

      release: function (source) {
        return source.release();
      },


      seekTo: function (source, milliseconds) {

        return source.seekTo(milliseconds);
      },

      setVolume: function (source, volume) {
        return source.setVolume(volume);
      },

      startRecord: function (source) {

        return source.startRecord();
      },

      stopRecord: function (source) {

        return source.stopRecord();
      },

      stop: function (source) {

        return source.stop();
      }
    }
  }]);
angular.module('ngCordova.plugins', [
  'ngCordova.plugins.deviceMotion',
  'ngCordova.plugins.camera',
  'ngCordova.plugins.geolocation',
  'ngCordova.plugins.deviceOrientation',
  'ngCordova.plugins.dialogs',
  'ngCordova.plugins.vibration',
  'ngCordova.plugins.network',
  'ngCordova.plugins.device',
  'ngCordova.plugins.barcodeScanner',
  'ngCordova.plugins.splashscreen',
  'ngCordova.plugins.keyboard',
  'ngCordova.plugins.contacts',
  'ngCordova.plugins.statusbar',
  'ngCordova.plugins.file',
  'ngCordova.plugins.socialSharing',
  'ngCordova.plugins.globalization',
  'ngCordova.plugins.sqlite',
  'ngCordova.plugins.ga',
  'ngCordova.plugins.push',
  'ngCordova.plugins.spinnerDialog',
  'ngCordova.plugins.sms',
  'ngCordova.plugins.pinDialog',
  'ngCordova.plugins.localNotification',
  'ngCordova.plugins.toast',
  'ngCordova.plugins.flashlight',
  'ngCordova.plugins.capture',
  'ngCordova.plugins.appAvailability',
  'ngCordova.plugins.prefs',
  'ngCordova.plugins.printer',
  'ngCordova.plugins.bluetoothSerial',
  'ngCordova.plugins.backgroundGeolocation',
  'ngCordova.plugins.facebookConnect',
  'ngCordova.plugins.adMob',
  'ngCordova.plugins.googleMap',
  'ngCordova.plugins.clipboard',
  'ngCordova.plugins.nativeAudio',
  'ngCordova.plugins.media',
  'ngCordova.plugins.battery-status',
  'ngCordova.plugins.keychain',
  'ngCordova.plugins.progressIndicator',
  'ngCordova.plugins.datePicker'
]);

// install   : cordova plugin add https://github.com/sidneys/cordova-plugin-nativeaudio.git
// link      : https://github.com/sidneys/cordova-plugin-nativeaudio

angular.module('ngCordova.plugins.nativeAudio', [])

  .factory('$cordovaNativeAudio', ['$q', function ($q) {

    return {
      preloadSimple: function (id, assetPath) {
        var q = $q.defer();
        window.plugins.NativeAudio.preloadSimple(id, assetPath,
          function (result) {
            q.resolve(result)
          },
          function (err) {
            q.reject(err);
          }
        );

        return q.promise;
      },

      preloadComplex: function (id, assetPath, volume, voices) {
        var q = $q.defer();
        window.plugins.NativeAudio.preloadComplex(id, assetPath, volume, voices,
          function (result) {
            q.resolve(result)
          },
          function (err) {
            q.reject(err);
          }
        );

        return q.promise;
      },

      play: function (id, completeCallback) {
        var q = $q.defer();
        window.plugins.NativeAudio.play(id, completeCallback,
          function (result) {
            q.resolve(result)
          },
          function (err) {
            q.reject(err);
          }
        );

        return q.promise;
      },

      stop: function (id) {
        var q = $q.defer();
        window.plugins.NativeAudio.stop(id,
          function (result) {
            q.resolve(result)
          },
          function (err) {
            q.reject(err);
          }
        );
        return q.promise;
      },

      loop: function (id) {
        var q = $q.defer();
        window.plugins.NativeAudio.loop(id,
          function (result) {
            q.resolve(result)
          },
          function (err) {
            q.reject(err);
          }
        );

        return q.promise;
      },

      unload: function (id) {
        var q = $q.defer();
        window.plugins.NativeAudio.unload(id,
          function (result) {
            q.resolve(result)
          },
          function (err) {
            q.reject(err);
          }
        );

        return q.promise;
      },

      setVolumeForComplexAsset: function (id, volume) {
        var q = $q.defer();
        window.plugins.NativeAudio.setVolumeForComplexAsset(id, volume,
          function (result) {
            q.resolve(result)
          },
          function (err) {
            q.reject(err);
          }
        );

        return q.promise;
      }
    }
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
      }
    }
  }]);

// install   :      cordova plugin add https://github.com/Paldom/PinDialog.git
// link      :      https://github.com/Paldom/PinDialog

angular.module('ngCordova.plugins.pinDialog', [])

  .factory('$cordovaPinDialog', [function () {

    return {
      prompt: function (message, promptCallback, title, buttonLabels, defaultText) {
        return window.plugins.pinDialog.prompt.apply(navigator.notification, arguments);
      }
    }

  }]);
// install   :
// link      :

angular.module('ngCordova.plugins.prefs', [])

  .factory('$cordovaPreferences', ['$window', '$q', function ($window, $q) {

    return {

      set: function (key, value) {
        var q = $q.defer();

        $window.applicationPreferences.set(key, value, function (result) {
          q.resolve(result);
        }, function (err) {
          q.reject(err);
        });

        return q.promise;
      },


      get: function (key) {
        var q = $q.defer();

        $window.applicationPreferences.get(key, function (value) {
          q.resolve(value);
        }, function (err) {
          q.reject(err);
        });

        return q.promise;
      }

    }
  }]);

// install   : cordova plugin add de.appplant.cordova.plugin.printer
// link      : https://github.com/katzer/cordova-plugin-printer

angular.module('ngCordova.plugins.printer', [])

  .factory('$cordovaPrinter', ['$q', function ($q) {

    return {
      isAvailable: function () {
        var d = $q.defer();

        window.plugin.printer.isServiceAvailable(function (isAvailable) {
          d.resolve(isAvailable);
        });

        return d.promise;
      },

      print: function (doc) {
        window.plugin.printer.print(doc);
      }
    }
  }
  ]);
// install   :      cordova plugin add org.pbernasconi.progressindicator
// link      :      http://pbernasconi.github.io/cordova-progressIndicator/

angular.module('ngCordova.plugins.progressIndicator', [])

  .factory('$cordovaProgressIndicator', ['$q', function ($q) {

    return {
      showSimple: function (_dim) {
        var dim = _dim || false;
        return ProgressIndicator.showSimple(dim)
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
        return ProgressIndicator.showDeterminate(dim, timeout)
      },

      showDeterminateWithLabel: function (_dim, _timeout, _label) {
        var dim = _dim || false;
        var timeout = _timeout || 50000;
        var label = _label || "Loading...";

        return ProgressIndicator.showDeterminateWithLabel(dim, timeout, label)
      },

      showAnnular: function (_dim, _timeout) {
        var dim = _dim || false;
        var timeout = _timeout || 50000;
        return ProgressIndicator.showAnnular(dim, timeout)
      },

      showAnnularWithLabel: function (_dim, _timeout, _label) {
        var dim = _dim || false;
        var timeout = _timeout || 50000;
        var label = _label || "Loading...";
        return ProgressIndicator.showAnnularWithLabel(dim, timeout, label)
      },

      showBar: function (_dim, _timeout) {
        var dim = _dim || false;
        var timeout = _timeout || 50000;
        return ProgressIndicator.showBar(dim, timeout)
      },

      showBarWithLabel: function (_dim, _timeout, _label) {
        var dim = _dim || false;
        var timeout = _timeout || 50000;
        var label = _label || "Loading...";
        return ProgressIndicator.showBarWithLabel(dim, timeout, label)
      },

      showSuccess: function (_dim) {
        var dim = _dim || false;
        return ProgressIndicator.showSuccess(dim)
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
    }

  }]);
// install   :      cordova plugin add https://github.com/phonegap-build/PushPlugin.git
// link      :      https://github.com/phonegap-build/PushPlugin

angular.module('ngCordova.plugins.push', [])

  .factory('$cordovaPush', ['$q', function ($q) {
    return {
      register: function (config) {
        var q = $q.defer();
        window.plugins.pushNotification.register(
          function (result) {
            q.resolve(result);
          },
          function (error) {
            q.reject(error);
          },
          config);

        return q.promise;
      },

      unregister: function (options) {
        var q = $q.defer();
        window.plugins.pushNotification.unregister(
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
        window.plugins.pushNotification.setApplicationIconBadgeNumber(
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
          q.reject(err)
        });
        return q.promise;
      }
    }

  }]);
// install   :      cordova plugin add https://github.com/EddyVerbruggen/SocialSharing-PhoneGap-Plugin.git
// link      :      https://github.com/EddyVerbruggen/SocialSharing-PhoneGap-Plugin

// NOTE: shareViaEmail -> if user cancels sharing email, success is still called
// NOTE: shareViaEmail -> TO, CC, BCC must be an array, Files can be either null, string or array
// TODO: add support for iPad
// TODO: detailed docs for each social sharing types (each social platform has different requirements)

angular.module('ngCordova.plugins.socialSharing', [])

  .factory('$cordovaSocialSharing', ['$q', function ($q) {

    return {
      share: function (message, subject, file, link) {
        var q = $q.defer();
        window.plugins.socialsharing.share(message, subject, file, link,
          function () {
            q.resolve(true); // success
          },
          function () {
            q.reject(false); // error
          });
        return q.promise;
      },

      shareViaTwitter: function (message, file, link) {
        var q = $q.defer();
        window.plugins.socialsharing.shareViaTwitter(message, file, link,
          function () {
            q.resolve(true); // success
          },
          function () {
            q.reject(false); // error
          });
        return q.promise;
      },

      shareViaWhatsApp: function (message, file, link) {
        var q = $q.defer();
        window.plugins.socialsharing.shareViaWhatsApp(message, file, link,
          function () {
            q.resolve(true); // success
          },
          function () {
            q.reject(false); // error
          });
        return q.promise;
      },

      shareViaFacebook: function (message, file, link) {
        var q = $q.defer();
        window.plugins.socialsharing.shareViaFacebook(message, file, link,
          function () {
            q.resolve(true); // success
          },
          function () {
            q.reject(false); // error
          });
        return q.promise;
      },

      shareViaSMS: function (message, commaSeparatedPhoneNumbers) {
        var q = $q.defer();
        window.plugins.socialsharing.shareViaSMS(message, commaSeparatedPhoneNumbers,
          function () {
            q.resolve(true); // success
          },
          function () {
            q.reject(false); // error
          });
        return q.promise;
      },

      shareViaEmail: function (message, subject, toArr, ccArr, bccArr, fileArr) {
        var q = $q.defer();
        window.plugins.socialsharing.shareViaEmail(message, subject, toArr, ccArr, bccArr, fileArr,
          function () {
            q.resolve(true); // success
          },
          function () {
            q.reject(false); // error
          });
        return q.promise;
      },

      canShareViaEmail: function () {
        var q = $q.defer();
        window.plugins.socialsharing.canShareViaEmail(
          function () {
            q.resolve(true); // success
          },
          function () {
            q.reject(false); // error
          });
        return q.promise;
      },

      canShareVia: function (via, message, subject, file, link) {
        var q = $q.defer();
        window.plugins.socialsharing.canShareVia(via, message, subject, file, link,
          function (success) {
            q.resolve(success); // success
          },
          function (error) {
            q.reject(error); // error
          });
        return q.promise;
      },

      shareVia: function (via, message, subject, file, link) {
        var q = $q.defer();
        window.plugins.socialsharing.shareVia(via, message, subject, file, link,
          function () {
            q.resolve(true); // success
          },
          function () {
            q.reject(false); // error
          });
        return q.promise;
      }

    }
  }]);

// install   :       cordova plugin add https://github.com/Paldom/SpinnerDialog.git
// link      :       https://github.com/Paldom/SpinnerDialog

angular.module('ngCordova.plugins.spinnerDialog', [])

  .factory('$cordovaSpinnerDialog', [function () {

    return {
      show: function (title, message) {
        return window.plugins.spinnerDialog.show(title, message);
      },
      hide: function () {
        return window.plugins.spinnerDialog.hide();
      }
    }

  }]);
// install   :      cordova plugin add org.apache.cordova.splashscreen
// link      :      https://github.com/apache/cordova-plugin-splashscreen/blob/master/doc/index.md

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

// install   :      cordova plugin add https://github.com/brodysoft/Cordova-SQLitePlugin.git
// link      :      https://github.com/brodysoft/Cordova-SQLitePlugin/blob/master/README.md

angular.module('ngCordova.plugins.sqlite', [])

  .factory('$cordovaSQLite', ['$q', function ($q) {

    return  {
      openDB: function (dbName) {
        return  window.sqlitePlugin.openDatabase({name: dbName});
      },


      openDBBackground: function (dbName) {
        return window.sqlitePlugin.openDatabase({name: dbName, bgType: 1});
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

      nestedExecute: function (db, query1, query2, binding1, binding2) {
        var q = $q.defer();

        db.transaction(function (tx) {
            tx.executeSql(query1, binding1, function (tx, result) {
              q.resolve(result);
              tx.executeSql(query2, binding2, function (tx, res) {
                q.resolve(res);
              })
            })
          },
          function (transaction, error) {
            q.reject(error);
          });

        return q.promise;
      }

      // more methods here
    }
  }]);

// install   :      cordova plugin add org.apache.cordova.statusbar
// link      :      https://github.com/apache/cordova-plugin-statusbar/blob/master/doc/index.md

angular.module('ngCordova.plugins.statusbar', [])

  .factory('$cordovaStatusbar', [function () {

    return {
      overlaysWebView: function (bool) {
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

// install   :      cordova plugin add https://github.com/EddyVerbruggen/Toast-PhoneGap-Plugin.git
// link      :      https://github.com/EddyVerbruggen/Toast-PhoneGap-Plugin

angular.module('ngCordova.plugins.toast', [])

  .factory('$cordovaToast', ['$q', function ($q) {

    return {
      showShortTop: function (message) {
        var q = $q.defer();
        window.plugins.toast.showShortTop(message, function (response) {
          q.resolve(response);
        }, function (error) {
          q.reject(error)
        });
        return q.promise;
      },

      showShortCenter: function (message) {
        var q = $q.defer();
        window.plugins.toast.showShortCenter(message, function (response) {
          q.resolve(response);
        }, function (error) {
          q.reject(error)
        });
        return q.promise;
      },

      showShortBottom: function (message) {
        var q = $q.defer();
        window.plugins.toast.showShortBottom(message, function (response) {
          q.resolve(response);
        }, function (error) {
          q.reject(error)
        });
        return q.promise;
      },

      showLongTop: function (message) {
        var q = $q.defer();
        window.plugins.toast.showLongTop(message, function (response) {
          q.resolve(response);
        }, function (error) {
          q.reject(error)
        });
        return q.promise;
      },

      showLongCenter: function (message) {
        var q = $q.defer();
        window.plugins.toast.showLongCenter(message, function (response) {
          q.resolve(response);
        }, function (error) {
          q.reject(error)
        });
        return q.promise;
      },

      showLongBottom: function (message) {
        var q = $q.defer();
        window.plugins.toast.showLongBottom(message, function (response) {
          q.resolve(response);
        }, function (error) {
          q.reject(error)
        });
        return q.promise;
      },


      show: function (message, duration, position) {
        var q = $q.defer();
        window.plugins.toast.show(message, duration, position, function (response) {
          q.resolve(response);
        }, function (error) {
          q.reject(error)
        });
        return q.promise;
      }
    }

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
    }
  }]);

})();