angular.module('azure-mobile-service.module', []).service('Azureservice', [
  '$window',
  '$q',
  'AzureMobileServiceClient',
  function Azureservice($window, $q, AzureMobileServiceClient) {
    'use strict';
    var VAILD_OAUTH_PROVIDERS = [
        'google',
        'twitter',
        'facebook',
        'microsoftaccount',
        'aad'
      ];
    var MobileServiceClient;
    var client;
    var storage;
    var initMSClient = function () {
      if (isNullOrUndefined(AzureMobileServiceClient.API_URL) || isNullOrUndefined(AzureMobileServiceClient.API_KEY)) {
        throw 'Angularservice: Unable to configure the MS Mobile Client.  Missing API KEY or URL';
      }
      MobileServiceClient = WindowsAzure.MobileServiceClient;
      client = new MobileServiceClient(AzureMobileServiceClient.API_URL, AzureMobileServiceClient.API_KEY);
    };
    var setStorage = function () {
      if (typeof AzureMobileServiceClient.STORAGE === 'string' && AzureMobileServiceClient.STORAGE.toLowerCase() === 'local') {
        storage = $window.localStorage;
      } else {
        storage = $window.sessionStorage;
      }
    };
    var setCachedUser = function (user) {
      storage.loggedInUser = JSON.stringify(user);
    };
    var setMSClientUser = function (user) {
      client.currentUser = user;
    };
    var getCachedUser = function () {
      if (storage.loggedInUser) {
        client.currentUser = JSON.parse(storage.loggedInUser);
      }
    };
    var getTable = function (tableName, withFilterFn) {
      if (typeof withFilterFn === 'function')
        return client.withFilter(withFilterFn).getTable(tableName);
      return client.getTable(tableName);
    };
    var isUndefinedOrNotAnObjectOrFunction = function (obj) {
      return typeof obj === 'undefined' || typeof obj !== 'object' && typeof obj !== 'function';
    };
    var isUndefinedOrNotAnObject = function (obj) {
      return isNullOrUndefined(obj) || typeof obj !== 'object';
    };
    var isNullOrUndefined = function (value) {
      return value === null || typeof value === 'undefined';
    };
    var isNotNullOrUndefined = function (value) {
      return !isNullOrUndefined(value);
    };
    //This will accept the Azure promise and turn it into a angular promise.
    //Elimiante the need for $scope.$apply in your controller.
    var wrapAzurePromiseWithAngularPromise = function (azurePromise) {
      var deferred = $q.defer();
      azurePromise.done(function (items) {
        deferred.resolve(items);
      }, function (err) {
        deferred.reject(err);
      });
      return deferred.promise;
    };
    var init = function () {
      initMSClient();
      setStorage();
      getCachedUser();
    };
    //Initiate the service
    init();
    return {
      query: function (tableName, obj, withFilterFn) {
        var data = null;
        if (isNullOrUndefined(tableName)) {
          console.error('Azureservice.query: You must specify a table name');
          return null;
        }
        if (angular.isDefined(obj) && angular.isObject(obj)) {
          if (isUndefinedOrNotAnObjectOrFunction(obj.criteria)) {
            obj.criteria = {};
          }
          data = getTable(tableName, withFilterFn).where(obj.criteria, obj.params);
          //Number of results to return
          if (isNotNullOrUndefined(obj.take) && angular.isNumber(obj.take)) {
            data = data.take(obj.take);
          }
          //number of results to skip
          if (isNotNullOrUndefined(obj.skip) && angular.isNumber(obj.take)) {
            data = data.skip(obj.skip);
          }
          //How to sort/order the data
          if (angular.isDefined(obj.orderBy) && angular.isArray(obj.orderBy)) {
            var orderBy = obj.orderBy;
            for (var i = 0; i < orderBy.length; i++) {
              var column = orderBy[i].column;
              var dir = orderBy[i].direction;
              if (angular.isDefined(column)) {
                if (angular.isDefined(dir) && dir.toLowerCase() === 'desc') {
                  data = data.orderByDescending(column);
                } else if (angular.isDefined(column)) {
                  data = data.orderBy(column);
                }
              }
            }
          }
          //Return listed columns
          if (angular.isDefined(obj.columns) && angular.isArray(obj.columns)) {
            data = data.select(obj.columns.join());
          }
        } else {
          //No criteria specified - get everything - Note azure limits the count of returned items see docs.
          data = getTable(tableName, withFilterFn).where({});
        }
        return wrapAzurePromiseWithAngularPromise(data.includeTotalCount().read());
      },
      getById: function (tableName, id, withFilterFn) {
        if (isNullOrUndefined(tableName)) {
          console.error('Azureservice.getById: You must specify a table name');
          return null;
        }
        if (isNullOrUndefined(id)) {
          console.error('Azureservice.getById: You must specify the id');
          return null;
        }
        return wrapAzurePromiseWithAngularPromise(getTable(tableName, withFilterFn).lookup(id));
      },
      getAll: function (tableName, withFilterFn) {
        return this.query(tableName, null, withFilterFn);
      },
      read: function (tableName, parameters, withFilterFn) {
        return wrapAzurePromiseWithAngularPromise(getTable(tableName, withFilterFn).read(parameters));
      },
      insert: function (tableName, obj, withFilterFn) {
        if (isNullOrUndefined(tableName)) {
          console.error('Azureservice.insert: You must specify a table name');
          return null;
        }
        if (isUndefinedOrNotAnObject(obj)) {
          console.error('Azureservice.insert: You must specify the insert object');
          return null;
        }
        return wrapAzurePromiseWithAngularPromise(getTable(tableName, withFilterFn).insert(obj));
      },
      update: function (tableName, obj, withFilterFn) {
        if (isNullOrUndefined(tableName)) {
          console.error('Azureservice.update: You must specify a table name');
          return null;
        }
        if (isUndefinedOrNotAnObject(obj)) {
          console.error('Azureservice.update: You must specify the insert object');
          return null;
        }
        return wrapAzurePromiseWithAngularPromise(getTable(tableName, withFilterFn).update(obj));
      },
      del: function (tableName, obj, withFilterFn) {
        if (isNullOrUndefined(tableName)) {
          console.error('Azureservice.del: You must specify a table name');
          return null;
        }
        if (isUndefinedOrNotAnObject(obj)) {
          console.error('Azureservice.del: You must specify the insert object');
          return null;
        }
        return wrapAzurePromiseWithAngularPromise(getTable(tableName, withFilterFn).del(obj));
      },
      login: function (oauthProvider) {
        if (!angular.isDefined(oauthProvider) || VAILD_OAUTH_PROVIDERS.indexOf(oauthProvider) === -1) {
          throw new Error('Azureservice.login Invalid or no oauth provider listed.');
        }
        var promise = client.login(oauthProvider).then(function () {
            //cache login 
            setCachedUser(client.currentUser);
          });
        return wrapAzurePromiseWithAngularPromise(promise);
      },
      setCurrentUser: function (currentUser) {
        if (angular.isDefined(currentUser) && angular.isObject(currentUser)) {
          setMSClientUser(currentUser);
          setCachedUser(currentUser);
        }
      },
      logout: function () {
        //clear cache
        storage.loggedInUser = null;
        client.logout();
      },
      isLoggedIn: function () {
        return isNotNullOrUndefined(client.currentUser) && isNotNullOrUndefined(storage.loggedInUser);
      },
      invokeApi: function (name, options) {
        var deferred = $q.defer();
        var validMethods = [
            'get',
            'post',
            'put',
            'delete'
          ];
        if (isNullOrUndefined(name)) {
          console.error('Azureservice.invokeApi No custom api name specified');
          return null;
        }
        if (isUndefinedOrNotAnObject(options)) {
          options = { method: 'get' };
        } else if (isNullOrUndefined(options.method)) {
          options.method = 'get';
        } else if (validMethods.indexOf(options.method.toLowerCase()) === -1) {
          console.error('Azureservice.invokeApi Invalid method type');
          return null;
        }
        client.invokeApi(name, options).done(function (results) {
          deferred.resolve(results.result);
        }, function (err) {
          deferred.reject(err);
        });
        return deferred.promise;
      }
    };
  }
]);
