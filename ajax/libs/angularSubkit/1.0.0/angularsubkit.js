'use strict';

angular
  .module('subkit', [])
  .value('Subkit', Subkit);

angular
  .module('subkit')
  .factory('angularSubkit', ['$q', '$parse', '$timeout',
    function($q, $parse, $timeout) {
      return function(ref, scope, name, initial) {
        var ask = new AngularSubkit($q, $parse, $timeout, ref);
        return ask.associate(scope, name, initial);
      };
    }
  ]);

var AngularSubkit = function($q, $parse, $timeout, ref) {
  this._q = $q;
  this._parse = $parse;
  this._timeout = $timeout;

  if (typeof ref == 'string') throw new Error('Please provide a Subkit reference instead of a URL, eg: new Subkit(url)');
  this._fRef = ref;
};

AngularSubkit.prototype = {
  associate: function($scope, name, initial) {
    var self = this;
    var deferred = this._q.defer();
    if(!$scope[name]) $scope[name] = initial;
    
    var storeRef = this._fRef.store(name);
    storeRef
      .get()
      .done(function(data){
        $scope[name] = data;
        $scope.$apply();
      });

    storeRef.on(function(error, data) {
      if(error) return console.log(error);
      if(initial instanceof Array){
        if(data.type === 'put') {
          var keyMap = $scope[name].map(function(itm){return itm.key.replace(name+'!','')});
          data.key = data.key.replace(name+'!','')
          var itmIdx = keyMap.indexOf(data.key);
          if(itmIdx!==-1) $scope[name][itmIdx] = data;
          else $scope[name].unshift(data);
        }
        if(data.type === 'del') {
          var keyMap = $scope[name].map(function(itm){return itm.key.replace(name+'!','')});
          var itmIdx = keyMap.indexOf(data.key.replace(name+'!',''));
          $scope[name].splice(itmIdx, 1);
        }
      } else if(initial instanceof Object){
        $scope[name] = data;
      }
      $scope.$apply();
    });

    return storeRef;
  },
  disassociate: function(name) {
    var self = this;
    this._fRef.off(name);
  },
  _log: function(msg) {
    if (console && console.log) {
      console.log(msg);
    }
  }
};