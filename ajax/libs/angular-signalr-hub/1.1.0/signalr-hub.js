angular.module('SignalR', [])
  .constant('$', $)
  .factory('Hub', ['$', function ($) {
    //This will allow same connection to be used for all Hubs
    //It also keeps connection as singleton.
    var globalConnection = null;

    var initGlobalConnection = function (options) {
      if (options && options.rootPath) {
        globalConnection = $.hubConnection(options.rootPath, {userDefaultPath: false});
      } else {
        globalConnection = $.hubConnection();
      }
    };

    return function (hubName, options) {
      var Hub = this;
      if (globalConnection === null) {
        initGlobalConnection(options);
      }
      Hub.connection = globalConnection;
      Hub.proxy = Hub.connection.createHubProxy(hubName);

      Hub.on = function (event, fn) {
        Hub.proxy.on(event, fn);
      };
      Hub.invoke = function (method, args) {
        return Hub.proxy.invoke.apply(Hub.proxy, arguments)
      };
      Hub.disconnect = function () {
        Hub.connection.stop();
      };
      Hub.connect = function(){
        Hub.connection.start();
      };

      if (options && options.listeners) {
        angular.forEach(options.listeners, function (fn, event) {
          Hub.on(event, fn);
        });
      }
      if (options && options.methods) {
        angular.forEach(options.methods, function (method) {
          Hub[method] = function () {
            var args = $.makeArray(arguments);
            args.unshift(method);
            return Hub.invoke.apply(Hub, args);
          };
        });
      }
      if(options && options.queryParams){
        Hub.connection.qs = options.queryParams;
      }
      //Adding additional property of promise allows to access it in rest of the application.
      Hub.promise = Hub.connection.start();
      return Hub;
    };
  }]);
