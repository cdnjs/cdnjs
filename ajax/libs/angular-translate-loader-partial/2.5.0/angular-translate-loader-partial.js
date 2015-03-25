/*!
 * angular-translate - v2.5.0 - 2014-12-07
 * http://github.com/angular-translate/angular-translate
 * Copyright (c) 2014 ; Licensed MIT
 */
angular.module('pascalprecht.translate').provider('$translatePartialLoader', function () {
  function Part(name) {
    this.name = name;
    this.isActive = true;
    this.tables = {};
  }
  Part.prototype.parseUrl = function (urlTemplate, targetLang) {
    return urlTemplate.replace(/\{part\}/g, this.name).replace(/\{lang\}/g, targetLang);
  };
  Part.prototype.getTable = function (lang, $q, $http, $httpOptions, urlTemplate, errorHandler) {
    var deferred = $q.defer();
    if (!this.tables[lang]) {
      var self = this;
      $http(angular.extend({
        method: 'GET',
        url: this.parseUrl(urlTemplate, lang)
      }, $httpOptions)).success(function (data) {
        self.tables[lang] = data;
        deferred.resolve(data);
      }).error(function () {
        if (errorHandler) {
          errorHandler(self.name, lang).then(function (data) {
            self.tables[lang] = data;
            deferred.resolve(data);
          }, function () {
            deferred.reject(self.name);
          });
        } else {
          deferred.reject(self.name);
        }
      });
    } else {
      deferred.resolve(this.tables[lang]);
    }
    return deferred.promise;
  };
  var parts = {};
  function hasPart(name) {
    return Object.prototype.hasOwnProperty.call(parts, name);
  }
  function isStringValid(str) {
    return angular.isString(str) && str !== '';
  }
  function isPartAvailable(name) {
    if (!isStringValid(name)) {
      throw new TypeError('Invalid type of a first argument, a non-empty string expected.');
    }
    return hasPart(name) && parts[name].isActive;
  }
  function deepExtend(dst, src) {
    for (var property in src) {
      if (src[property] && src[property].constructor && src[property].constructor === Object) {
        dst[property] = dst[property] || {};
        deepExtend(dst[property], src[property]);
      } else {
        dst[property] = src[property];
      }
    }
    return dst;
  }
  this.addPart = function (name) {
    if (!isStringValid(name)) {
      throw new TypeError('Couldn\'t add part, part name has to be a string!');
    }
    if (!hasPart(name)) {
      parts[name] = new Part(name);
    }
    parts[name].isActive = true;
    return this;
  };
  this.setPart = function (lang, part, table) {
    if (!isStringValid(lang)) {
      throw new TypeError('Couldn\'t set part.`lang` parameter has to be a string!');
    }
    if (!isStringValid(part)) {
      throw new TypeError('Couldn\'t set part.`part` parameter has to be a string!');
    }
    if (typeof table !== 'object' || table === null) {
      throw new TypeError('Couldn\'t set part. `table` parameter has to be an object!');
    }
    if (!hasPart(part)) {
      parts[part] = new Part(part);
      parts[part].isActive = false;
    }
    parts[part].tables[lang] = table;
    return this;
  };
  this.deletePart = function (name) {
    if (!isStringValid(name)) {
      throw new TypeError('Couldn\'t delete part, first arg has to be string.');
    }
    if (hasPart(name)) {
      parts[name].isActive = false;
    }
    return this;
  };
  this.isPartAvailable = isPartAvailable;
  this.$get = [
    '$rootScope',
    '$injector',
    '$q',
    '$http',
    function ($rootScope, $injector, $q, $http) {
      var service = function (options) {
        if (!isStringValid(options.key)) {
          throw new TypeError('Unable to load data, a key is not a non-empty string.');
        }
        if (!isStringValid(options.urlTemplate)) {
          throw new TypeError('Unable to load data, a urlTemplate is not a non-empty string.');
        }
        var errorHandler = options.loadFailureHandler;
        if (errorHandler !== undefined) {
          if (!angular.isString(errorHandler)) {
            throw new Error('Unable to load data, a loadFailureHandler is not a string.');
          } else
            errorHandler = $injector.get(errorHandler);
        }
        var loaders = [], tables = [], deferred = $q.defer();
        function addTablePart(table) {
          tables.push(table);
        }
        for (var part in parts) {
          if (hasPart(part) && parts[part].isActive) {
            loaders.push(parts[part].getTable(options.key, $q, $http, options.$http, options.urlTemplate, errorHandler).then(addTablePart));
            parts[part].urlTemplate = options.urlTemplate;
          }
        }
        if (loaders.length) {
          $q.all(loaders).then(function () {
            var table = {};
            for (var i = 0; i < tables.length; i++) {
              deepExtend(table, tables[i]);
            }
            deferred.resolve(table);
          }, function () {
            deferred.reject(options.key);
          });
        } else {
          deferred.resolve({});
        }
        return deferred.promise;
      };
      service.addPart = function (name) {
        if (!isStringValid(name)) {
          throw new TypeError('Couldn\'t add part, first arg has to be a string');
        }
        if (!hasPart(name)) {
          parts[name] = new Part(name);
          $rootScope.$emit('$translatePartialLoaderStructureChanged', name);
        } else if (!parts[name].isActive) {
          parts[name].isActive = true;
          $rootScope.$emit('$translatePartialLoaderStructureChanged', name);
        }
        return service;
      };
      service.deletePart = function (name, removeData) {
        if (!isStringValid(name)) {
          throw new TypeError('Couldn\'t delete part, first arg has to be string');
        }
        if (removeData === undefined) {
          removeData = false;
        } else if (typeof removeData !== 'boolean') {
          throw new TypeError('Invalid type of a second argument, a boolean expected.');
        }
        if (hasPart(name)) {
          var wasActive = parts[name].isActive;
          if (removeData) {
            var $translate = $injector.get('$translate');
            var cache = $translate.loaderCache();
            if (typeof cache === 'string') {
              cache = $injector.get(cache);
            }
            if (typeof cache === 'object') {
              angular.forEach(parts[name].tables, function (value, key) {
                cache.remove(parts[name].parseUrl(parts[name].urlTemplate, key));
              });
            }
            delete parts[name];
          } else {
            parts[name].isActive = false;
          }
          if (wasActive) {
            $rootScope.$emit('$translatePartialLoaderStructureChanged', name);
          }
        }
        return service;
      };
      service.isPartAvailable = isPartAvailable;
      return service;
    }
  ];
});