(function() {


// Create all modules and define dependencies to make sure they exist
// and are loaded in the correct order to satisfy dependency injection
// before all nested files are concatenated by Grunt

angular.module('angular-storage',
    [
      'angular-storage.store'
    ]);

angular.module('angular-storage.internalStore', ['angular-storage.storage'])
  .factory('InternalStore', ["storage", function(storage) {

    function InternalStore(namespace, delimiter) {
      this.namespace = namespace || null;
      this.delimiter = delimiter || '.';
      this.inMemoryCache = {};
    }

    InternalStore.prototype.getNamespacedKey = function(key) {
      if (!this.namespace) {
        return key;
      } else {
        return [this.namespace, key].join(this.delimiter);
      }
    }



    InternalStore.prototype.set = function(name, elem) {
      this.inMemoryCache[name] = elem;
      storage.set(this.getNamespacedKey(name), JSON.stringify(elem));
    };

    InternalStore.prototype.get = function(name) {
      if (name in this.inMemoryCache) {
        return this.inMemoryCache[name];
      }
      var saved = storage.get(this.getNamespacedKey(name));
      var obj =  saved ? JSON.parse(saved) : null;
      this.inMemoryCache[name] = obj;
      return obj;
    };

    InternalStore.prototype.remove = function(name) {
      this.inMemoryCache[name] = null;
      storage.remove(this.getNamespacedKey(name));
    }

    return InternalStore;


  }]);


angular.module('angular-storage.storage', [])
  .service('storage', ["$window", function($window) {
    if ($window.localStorage) {
      this.set = function(what, value) {
        return $window.localStorage.setItem(what, value);
      };
      this.get = function(what) {
        return $window.localStorage.getItem(what);
      };
      this.remove = function(what) {
        return $window.localStorage.removeItem(what);
      };
    } else {
      var $cookieStore = $injector.get('$cookieStore');
      this.set = function(what, value) {
        return $cookieStore.put(what, value);
      };
      this.get = function(what) {
        return $cookieStore.get(what);
      };
      this.remove = function(what) {
        return $cookieStore.remove(what);
      };
    }
  }]);


angular.module('angular-storage.store', ['angular-storage.internalStore'])
  .factory('store', ["InternalStore", function(InternalStore) {

    var store = new InternalStore();
    store.getNamespacedStore = function(namespace, key) {
      return new InternalStore(namespace, key);
    }

    return store;


  }]);


}());