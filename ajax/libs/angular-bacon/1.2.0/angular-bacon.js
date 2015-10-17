(function() {
  angular.module("angular-bacon", []).run([
    "$rootScope", "$parse", function($rootScope, $parse) {
      $rootScope.$watchAsProperty = function(watchExp, objectEquality) {
        var bus, initialValue;

        bus = new Bacon.Bus;
        this.$watch(watchExp, function(newValue) {
          return bus.push(newValue);
        }, objectEquality);
        this.$on('$destroy', bus.end);
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
        var propSetter, unsubscribe;

        propSetter = $parse(prop).assign;
        unsubscribe = this.subscribe(function(e) {
          if (e.hasValue()) {
            if (!$scope.$$phase) {
              return $scope.$apply(function() {
                return propSetter($scope, e.value());
              });
            } else {
              return propSetter($scope, e.value());
            }
          }
        });
        $scope.$on('$destroy', unsubscribe);
        return this;
      };
    }
  ]);

}).call(this);
