(function() {


// Create all modules and define dependencies to make sure they exist
// and are loaded in the correct order to satisfy dependency injection
// before all nested files are concatenated by Grunt

angular.module('angular-storage',
    [
      'angular-storage.store'
    ]);

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


angular.module('angular-storage.store', ['angular-storage.storage'])
  .service('store', ["storage", function(storage) {

    this.inMemoryCache = {};

    this.set = function(name, elem) {
      this.inMemoryCache[name] = elem;
      storage.set(name, JSON.stringify(elem));
    };

    this.get = function(name) {
      if (this.inMemoryCache[name]) {
        return this.inMemoryCache[name];
      }
      var saved = storage.get(name);
      return saved ? JSON.parse(saved) : null;
    };

    this.remove = function(name) {
      this.inMemoryCache[name] = null;
      storage.remove(name);
    }


  }]);


}());