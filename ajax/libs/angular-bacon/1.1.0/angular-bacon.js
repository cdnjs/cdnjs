(function() {
  angular.module("angular-bacon", []).run([
    "$rootScope", "$parse", function($rootScope, $parse) {
      $rootScope.$watchAsProperty = function(watchExp, objectEquality) {
        var bus, initialValue;
        bus = new Bacon.Bus;
        this.$watch(watchExp, function(newValue) {
          return bus.push(newValue);
        }, objectEquality);
        initialValue = this.$eval(watchExp);
        if (typeof initialValue !== "undefined") {
          return bus.toProperty(initialValue);
        } else {
          return bus.toProperty();
        }
      };
      $rootScope.digestObservables = function(observables) {
        var self;
        self = this;
        return angular.forEach(observables, function(observable, key) {
          return observable.digest(self, key);
        });
      };
      return Bacon.Observable.prototype.digest = function($scope, prop) {
        var propSetter;
        propSetter = $parse(prop).assign;
        return this.onValue(function(val) {
          if (!$scope.$$phase) {
            return $scope.$apply(function() {
              return propSetter($scope, val);
            });
          } else {
            return propSetter($scope, val);
          }
        });
      };
    }
  ]);

}).call(this);
