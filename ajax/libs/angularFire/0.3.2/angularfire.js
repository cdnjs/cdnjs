// AngularFire is an officially supported AngularJS binding for Firebase.
// The bindings let you associate a Firebase URL with a model (or set of
// models), and they will be transparently kept in sync across all clients
// currently using your app. The 2-way data binding offered by AngularJS works
// as normal, except that the changes are also sent to all other clients
// instead of just a server.
//
//      AngularFire 0.3.2
//      http://angularfire.com
//      License: MIT

"use strict";

var AngularFire;

// Define the `firebase` module under which all AngularFire services will live.
angular.module("firebase", []).value("Firebase", Firebase);

// Define the `angularFire` service for implicit syncing. `angularFire` binds a
// model to $scope and keeps the data synchronized with a Firebase location
// both ways.
angular.module("firebase").factory("angularFire", ["$q", "$parse", "$timeout",
  function($q, $parse, $timeout) {
    // The factory returns a new instance of the `AngularFire` object, defined
    // below, everytime it is called. The factory takes 3 arguments:
    //
    //   * `ref`:    A Firebase reference. Queries or limits may be applied.
    //   * `$scope`: The scope with which the bound model is associated.
    //   * `name`:   The name of the model.
    return function(ref, scope, name) {
      var af = new AngularFire($q, $parse, $timeout, ref);
      return af.associate(scope, name);
    };
  }
]);

// The `AngularFire` object that implements implicit synchronization.
AngularFire = function($q, $parse, $timeout, ref) {
  this._q = $q;
  this._parse = $parse;
  this._timeout = $timeout;
  this._initial = true;
  this._remoteValue = false;

  if (typeof ref == "string") {
    throw new Error("Please provide a Firebase reference instead " +
      "of a URL, eg: new Firebase(url)");
  }
  this._fRef = ref;
};

AngularFire.prototype = {
  // This function is called by the factory to create a new 2-way binding
  // between a particular model in a `$scope` and a particular Firebase
  // location.
  associate: function($scope, name) {
    var self = this;
    var deferred = this._q.defer();
    var promise = deferred.promise;
    // We're currently listening for value changes to implement synchronization.
    // This needs to be optimized, see
    // [Ticket #25](https://github.com/firebase/angularFire/issues/25).
    this._fRef.on("value", function(snap) {
      var remote = snap.val();
      // We use toJson/fromJson to remove $$hashKey. Can be replaced by
      // angular.copy, but only for later version of AngularJS.
      var local = angular.fromJson(angular.toJson(self._parse(name)($scope)));

      // If remote value matches local value, don't do anything.
      if (angular.equals(remote, local)) {
        return;
      }

      if (self._initial) {
        // First value received from the server. We try and merge any local
        // changes that may have been made with the server values.
        var merged = false;
        var check = Object.prototype.toString;
        if (remote && check.call(local) == check.call(remote)) {
          if (check.call(local) == "[object Array]") {
            merged = local.concat(remote);
            if (!angular.equals(merged, remote)) {
              self._fRef.ref().set(merged);
              remote = merged;
            }
          } else if (check.call(local) == "[object Object]") {
            merged = local;
            for (var key in remote) {
              merged[key] = remote[key];
            }
            self._fRef.ref().update(merged);
            remote = merged;
          }
        }
        // If remote value is null, overwrite remote value with local
        if (remote === null && local !== undefined) {
          self._fRef.ref().set(local);
          remote = local;
        }
        // If types don't match or the type is primitive, just overwrite the
        // local value with the remote value.
        self._initial = false;
      }

      var resolve = false;
      if (deferred) {
        resolve = deferred;
        deferred = false;
      }

      // Update the local model to reflect remote changes.
      self._timeout(function() {
        self._resolve($scope, name, resolve, remote);
      });
    });
    return promise;
  },

  // Disassociation added via
  // [pull request #34](https://github.com/firebase/angularFire/pull/34).
  // This function is provided to the promise returned by `angularFire`
  // when it is fulfilled. Invoking it will stop the two-way synchronization.
  disassociate: function() {
    var self = this;
    if (self._unregister) {
      self._unregister();
    }
    this._fRef.off("value");
  },

  // If `deferred` is a valid promise, it will be resolved with `val`, and
  // the model will be watched for future (local) changes. `$scope[name]`
  // will also be updated to the provided value.
  _resolve: function($scope, name, deferred, val) {
    var self = this;
    var localVal = angular.fromJson(angular.toJson(this._parse(name)($scope)));
    if (val === null) {
      // NULL values are special in Firebase. If received, set the local value
      // to the initial state for Objects and Arrays.
      if (typeof localVal == "object") {
        var check = Object.prototype.toString;
        if (check.call(localVal) == check.call([])) {
          val = [];
        } else {
          val = {};
        }
      }
    }
    this._remoteValue = angular.copy(val);
    this._parse(name).assign($scope, angular.copy(val));
    if (deferred) {
      deferred.resolve(function() {
        self.disassociate();
      });
      this._watch($scope, name);
    }
  },

  // Watch for local changes.
  _watch: function($scope, name) {
    var self = this;
    self._unregister = $scope.$watch(name, function() {
      // We ignore local value changes until the first value was received
      // from the server.
      if (self._initial) {
        return;
      }
      // If the new local value matches the current remote value, we don't
      // trigger a remote update.
      var val = angular.fromJson(angular.toJson(self._parse(name)($scope)));
      if (angular.equals(val, self._remoteValue)) {
        return;
      }
      var check = Object.prototype.toString;
      if (check.call(val) == "[object Object]") {
        // Use update if limits are in effect, set if not.
        if (self._fRef.set) {
          self._fRef.set(val);
        } else {
          self._fRef.ref().update(val);
        }
      } else {
        self._fRef.ref().set(val);
      }
    }, true);
    // Also watch for scope destruction and unregister.
    $scope.$on("$destroy", function() {
      self.disassociate();
    });
  },

  // Helper function to log messages.
  _log: function(msg) {
    if (console && console.log) {
      console.log(msg);
    }
  }
};

// Define the `angularFireCollection` service for explicit syncing.
// `angularFireCollection` provides a collection object that you can modify.
// [Original code](https://github.com/petebacondarwin/angular-firebase/blob/master/ng-firebase-collection.js)
// by @petebacondarwin.
angular.module("firebase").factory("angularFireCollection", ["$timeout",
  function($timeout) {
    // `angularFireCollection` takes a Firebase references as the first
    // argument, and a function as an optional second argument. The callback
    // (if provided in the 2nd argument) will be called with a Firebase
    // snapshot when the initial data has been loaded.
    return function(collectionRef, initialCb, onItemChangeCb) {
      if (typeof collectionRef == "string") {
        throw new Error("Please provide a Firebase reference instead " +
          "of a URL, eg: new Firebase(url)");
      }

      // An internal representation of a model present in the collection.
      var AngularFireItem = function(ref, index) {
        this.$ref = ref.ref();
        this.$id = ref.name();
        this.$index = index;
        angular.extend(this, {$priority: ref.getPriority()}, ref.val());
      };

      // Implementation of firebase priority ordering:
      // https://www.firebase.com/docs/javascript/firebase/setpriority.html
      var firebaseOrder = [
        // Partition into [ no priority, number as priority, string as priority ]
        function(item) {
          if (item.$priority == null) {
            return 0;
          } else if (angular.isNumber(item.$priority)) {
            return 1;
          } else if (angular.isString(item.$priority)) {
            return 2;
          }
        },
        // Within partions, sort first by priority (lexical or numerical,
        // no priority skips this level of sorting by returning Infinity)
        function(item) {
          return item.$priority ? item.$priority : Infinity;
        },
        // Finally, sort items of equal priority lexically by name
        function(item) {
          return item.$id;
        }
      ];

      var indexes = {};
      var collection = [];

      function broadcastChange(type, item) {
        if (onItemChangeCb && typeof onItemChangeCb == "function") {
          onItemChangeCb(type, item);
        }
      }

      function getIndex(prevId) {
        return prevId ? indexes[prevId] + 1 : 0;
      }

      // Add an item to the local collection.
      function addChild(index, item) {
        indexes[item.$id] = index;
        collection.splice(index, 0, item);
      }

      // Remove an item from the local collection.
      function removeChild(id) {
        var index = indexes[id];
        if (index !== undefined) {
          collection.splice(index, 1);
          indexes[id] = undefined;
        }
      }

      // Update an existing child in the local collection.
      function updateChild(index, item) {
        collection[index] = item;
      }

      // Move an existing child to a new location in the collection (usually
      // triggered by a priority change).
      function moveChild(from, to, item) {
        collection.splice(from, 1);
        collection.splice(to, 0, item);
        updateIndexes(from, to);
      }

      // Update the index table.
      function updateIndexes(from, to) {
        var length = collection.length;
        to = to || length;
        if (to > length) {
          to = length;
        }
        for (var index = from; index < to; index++) {
          var item = collection[index];
          item.$index = indexes[item.$id] = index;
        }
      }

      // Trigger the initial callback, if one was provided.
      if (initialCb && typeof initialCb == "function") {
        collectionRef.once("value", function() {
          $timeout(initialCb);
        });
      }

      // Attach handlers for remote child added, removed, changed and moved
      // events.

      collectionRef.on("child_added", function(data, prevId) {
        $timeout(function() {
          var index = getIndex(prevId);
          var item = new AngularFireItem(data, index);
          addChild(index, item);
          updateIndexes(index);
          broadcastChange("item_added", item);
        });
      });

      collectionRef.on("child_removed", function(data) {
        $timeout(function() {
          var id = data.name();
          var pos = indexes[id];
          var item = collection[pos];
          removeChild(id);
          updateIndexes(pos);
          broadcastChange("item_removed", item);
        });
      });

      collectionRef.on("child_changed", function(data, prevId) {
        $timeout(function() {
          var index = indexes[data.name()];
          var newIndex = getIndex(prevId);
          var item = new AngularFireItem(data, index);
          broadcastChange("item_removed", collection[index]);
          updateChild(index, item);
          if (newIndex !== index) {
            moveChild(index, newIndex, item);
          }
          broadcastChange("item_added", item);
        });
      });

      collectionRef.on("child_moved", function(ref, prevId) {
        $timeout(function() {
          var oldIndex = indexes[ref.name()];
          var newIndex = getIndex(prevId);
          var item = collection[oldIndex];
          moveChild(oldIndex, newIndex, item);
          broadcastChange("item_moved", item);
        });
      });

      // `angularFireCollection` exposes four methods on the collection
      // returned.

      // Retrieve object by name.
      collection.getByName = function(name) {
        return collection[indexes[name]];
      };

      // Retrieve a collection of objects by names.
      collection.getByNames = function(names) {
        var objs = [];
        for (var i = 0, len = names.length; i < len; i++) {
          objs.push(collection[indexes[names[i]]]);
        }
        return objs;
      };

      // Add an object to the remote collection. Adding an object is the
      // equivalent of calling `push()` on a Firebase reference.
      collection.add = function(item, cb) {
        var ref;
        // Make sure to remove $$hashKey etc.
        var newItem = angular.fromJson(angular.toJson(item));
        if (!cb) {
          ref = collectionRef.ref().push(newItem);
        } else {
          ref = collectionRef.ref().push(newItem, cb);
        }
        return ref;
      };

      // Remove an object from the remote collection.
      collection.remove = function(itemOrId, cb) {
        var item = angular.isString(itemOrId) ?
          collection[indexes[itemOrId]] : itemOrId;
        if (!cb) {
          item.$ref.remove();
        } else {
          item.$ref.remove(cb);
        }
      };

      // Incrementally update an object in the remote collection.
      collection.update = function(itemOrId, cb) {
        var item = angular.isString(itemOrId) ?
          collection[indexes[itemOrId]] : itemOrId;
        var copy = angular.fromJson(angular.toJson(item));
        if (!cb) {
          item.$ref.update(copy);
        } else {
          item.$ref.update(copy, cb);
        }
      };

      // Update an object in its entirety in the remote collection.
      collection.set = function(itemOrId, cb) {
        var item = angular.isString(itemOrId) ?
          collection[indexes[itemOrId]] : itemOrId;
        var copy = angular.fromJson(angular.toJson(item));
        if (!cb) {
          item.$ref.set(copy);
        } else {
          item.$ref.set(copy, cb);
        }
      };

      collection.order = firebaseOrder;
      return collection;
    };
  }
]);

// Defines the `angularFireAuth` service that provides authentication support
// for AngularFire.
angular.module("firebase").factory("angularFireAuth", [
  "$injector", "$rootScope", "$parse", "$timeout", "$location", "$q",
  function($injector, $rootScope, $parse, $timeout, $location, $q) {
    // Check if '$route' is present, use if available.
    var $route = null;
    if ($injector.has("$route")) {
      $route = $injector.get("$route");
    }

    // Helper function to decode Base64 (polyfill for window.btoa on IE).
    // From: https://github.com/mshang/base64-js/blob/master/base64.js
    function decodeBase64(str) {
      var char_set =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
      var output = ""; // final output
      var buf = ""; // binary buffer
      var bits = 8;
      for (var i = 0; i < str.length; ++i) {
        if (str[i] == "=") {
          break;
        }
        var c_num = char_set.indexOf(str.charAt(i));
        if (c_num == -1) {
          throw new Error("Not base64.");
        }
        var c_bin = c_num.toString(2);
        while (c_bin.length < 6) {
          c_bin = "0" + c_bin;
        }
        buf += c_bin;

        while (buf.length >= bits) {
          var octet = buf.slice(0, bits);
          buf = buf.slice(bits);
          output += String.fromCharCode(parseInt(octet, 2));
        }
      }
      return output;
    }

    // Helper function to extract claims from a JWT. Does *not* verify the
    // validity of the token.
    function deconstructJWT(token) {
      var segments = token.split(".");
      if (!segments instanceof Array || segments.length !== 3) {
        throw new Error("Invalid JWT");
      }
      var decoded = "";
      var claims = segments[1];
      if (window.atob) {
        decoded = window.atob(claims);
      } else {
        decoded = decodeBase64(claims);
      }
      return JSON.parse(decodeURIComponent(escape(decoded)));
    }

    // Updates the provided model.
    function updateExpression(scope, name, val, cb) {
      if (name) {
        $timeout(function() {
          $parse(name).assign(scope, val);
          cb();
        });
      }
    }

    // A function to check whether the current path requires authentication,
    // and if so, whether a redirect to a login page is needed.
    function authRequiredRedirect(route, path, self) {
      if (route.authRequired && !self._authenticated){
        if (route.pathTo === undefined) {
          self._redirectTo = $location.path();
        } else {
          self._redirectTo = route.pathTo === path ? "/" : route.pathTo;
        }
        $location.replace();
        $location.path(path);
      }
    }

    return {
      // Initializes the authentication service. Takes a Firebase reference and
      // an options object, that may contain the following properties:
      //
      // * `scope`: The scope to which user authentication status will be
      // bound to. Defaults to `$rootScope` if not provided.
      // * `name`: Name of the model to which user auth state is bound.
      // * `callback`: A function that will be called when there is a change
      // in authentication state.
      // * `path`: The path to which the user will be redirected if the
      // `authRequired` property was set to true in the `$routeProvider`, and
      // the user isn't logged in.
      // * `simple`: AngularFireAuth requires inclusion of the
      // `firebase-simple-login.js` file by default. If this value is set to
      // false, this requirement is waived, but only custom login functionality
      // will be enabled.
      initialize: function(ref, options) {
        var self = this;

        if (typeof ref == "string") {
          throw new Error("Please provide a Firebase reference instead " +
            "of a URL, eg: new Firebase(url)");
        }

        options = options || {};
        this._scope = $rootScope;
        if (options.scope) {
          this._scope = options.scope;
        } else {
          throw new Error("Scope not provided to angularFireAuth!");
        }
        if (options.name) {
          this._name = options.name;
        } else {
          throw new Error("Model name not provided to angularFireAuth!");
        }

        this._cb = function(){};
        if (options.callback && typeof options.callback === "function") {
          this._cb = options.callback;
        }

        this._redirectTo = null;
        this._authenticated = false;
        if (options.path && $route !== null) {
          // Check if the current page requires authentication.
          if ($route.current) {
            authRequiredRedirect($route.current, options.path, self);
          }
          // Set up a handler for all future route changes, so we can check
          // if authentication is required.
          $rootScope.$on("$routeChangeStart", function(e, next) {
            authRequiredRedirect(next, options.path, self);
          });
        }

        // Initialize user authentication state to `null`.
        this._ref = ref;
        if (options.simple === false) {
          updateExpression(this._scope, this._name, null, function() {});
          return;
        }

        // Initialize Simple Login.
        if (!window.FirebaseSimpleLogin) {
          var err = new Error("FirebaseSimpleLogin undefined, " +
            "did you include firebase-simple-login.js?");
          $rootScope.$broadcast("angularFireAuth:error", err);
          return;
        }
        var client = new FirebaseSimpleLogin(this._ref, function(err, user) {
          self._cb(err, user);
          if (err) {
            $rootScope.$broadcast("angularFireAuth:error", err);
          } else if (user) {
            self._loggedIn(user);
          } else {
            self._loggedOut();
          }
        });
        this._authClient = client;
      },

      // The login method takes a provider (for Simple Login) or a token
      // (for Custom Login) and authenticates the Firebase URL with which
      // the service was initialized.
      login: function(tokenOrProvider, options) {
        var promise = this._watchForLogin();
        switch (tokenOrProvider) {
        case "github":
        case "persona":
        case "twitter":
        case "facebook":
        case "anonymous":
        case "password":
          if (!this._authClient) {
            var err = new Error("Simple Login not initialized");
            $rootScope.$broadcast("angularFireAuth:error", err);
          } else {
            this._authClient.login(tokenOrProvider, options);
          }
          break;
        // A token was provided, so initialize custom login.
        default:
          var claims, self = this;
          try {
            // Extract claims and update user auth state to include them.
            claims = deconstructJWT(tokenOrProvider);
            this._ref.auth(tokenOrProvider, function(err) {
              if (err) {
                $rootScope.$broadcast("angularFireAuth:error", err);
              } else {
                self._loggedIn(claims);
              }
            });
          } catch(e) {
            $rootScope.$broadcast("angularFireAuth:error", e);
          }
        }
        return promise;
      },

      // Function cb receives an error as the first argument and a
      // Simple Login user object as the second argument. Pass noLogin=true
      // if you don't want the newly created user to also be logged in.
      createUser: function(email, password, cb, noLogin){
        var self = this;
        this._authClient.createUser(email, password, function(err, user){
          try {
            if (err) {
              $rootScope.$broadcast("angularFireAuth:error", err);
            } else {
              if (!noLogin) {
                self.login("password", {email: email, password: password});
              }
            }
          } catch(e) {
            $rootScope.$broadcast("angularFireAuth:error", e);
          }
          if (cb) {
            $timeout(function(){
              cb(err, user);
            });
          }
        });
      },

      // Unauthenticate the Firebase reference.
      logout: function() {
        if (this._authClient) {
          this._authClient.logout();
        } else {
          this._ref.unauth();
          this._loggedOut();
        }
      },

      // Common function to trigger a login event on the root scope.
      _loggedIn: function(user) {
        var self = this;
        this._authenticated = true;
        updateExpression(this._scope, this._name, user, function() {
          $rootScope.$broadcast("angularFireAuth:login", user);
          if (self._redirectTo) {
            $location.replace();
            $location.path(self._redirectTo);
            self._redirectTo = null;
          }
        });
      },

      // Common function to trigger a logout event on the root scope.
      _loggedOut: function() {
        this._authenticated = false;
        updateExpression(this._scope, this._name, null, function() {
          $rootScope.$broadcast("angularFireAuth:logout");
        });
      },

      _watchForLogin: function() {
        var subs = [], def = $q.defer();
        function done(err, user) {
          // timeout is necessary because it a) allows the auth callbacks to take
          // effect (applying auth parms before this is invoked) and b) forces
          // $scope.apply(), which is necessary to make the promise resolve()
          // event actually get sent to the listeners
          $timeout(function() {
            if (err) {
              def.reject(err);
            } else {
              def.resolve(user);
            }
          });
          for (var i=0; i < subs.length; i++) {
            subs[i]();
          }
        }
        subs.push($rootScope.$on("angularFireAuth:login", function(evt, user) {
          done(null, user);
        }));
        subs.push($rootScope.$on("angularFireAuth:error", function(evt, err) {
          done(err, null);
        }));
        return def.promise;
      }
    };
  }
]);

