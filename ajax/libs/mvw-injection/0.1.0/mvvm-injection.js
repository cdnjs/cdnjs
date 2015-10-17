/*! MVW-Injection (0.1.0). (C) 2015 Xavier Boubert. MIT @license: en.wikipedia.org/wiki/MIT_License */
(function(root) {
  'use strict';

  var DependencyInjection = new (function DependencyInjection() {

    var _this = this,
        _interfaces = {};

    function _formatFactoryFunction(factoryFunction) {
      if (typeof factoryFunction == 'function') {

        var funcString = factoryFunction
          .toString()

          // remove comments
          .replace(/((\/\/.*$)|(\/\*[\s\S]*?\*\/))/mg, '');

        var matches = funcString.match(/^function\s*[^\(]*\s*\(\s*([^\)]*)\)/m);
        if (matches === null || matches.length < 2) {
          factoryFunction = [factoryFunction];
        }
        else {
          factoryFunction = matches[1]
            .replace(/\s/g, '')
            .split(',')
            .filter(function(arg) {
              return arg.trim().length > 0;
            })
            .concat(factoryFunction);
        }

        return factoryFunction;
      }

      return false;
    }

    function Injector(instanceName) {

      function _getInjections(dependencies, name) {
        var interfaces = _interfaces[name].interfacesSupported,
            injections = [],
            i,
            j;

        for (i = 0; i < dependencies.length; i++) {
          var found = false;

          for (j = 0; j < interfaces.length; j++) {
            if (!_interfaces[interfaces[j]]) {
              throw new Error('DependencyInjection: "' + interfaces[j] + '" interface is not registered.');
            }

            var factory = _interfaces[interfaces[j]].factories[dependencies[i]];

            if (factory) {
              found = true;

              if (!factory.instantiated) {
                var dependencies = _formatFactoryFunction(factory.result);
                factory.result = dependencies.pop();

                var factoryInjections = _getInjections(dependencies, interfaces[j]);

                factory.result = factory.result.apply(_this, factoryInjections);
                factory.instantiated = true;
              }

              injections.push(factory.result);

              break;
            }
          }

          if (!found) {
            throw new Error('DependencyInjection: "' + dependencies[i] + '" is not registered or accessible in ' + name + '.');
          }
        }

        return injections;
      }

      this.get = function(factoryName) {
        var injections = _getInjections([factoryName], instanceName);

        return injections[0];
      };

      this.invoke = function(func) {
        var dependencies = _formatFactoryFunction(func);
        func = dependencies.pop();

        var injections = _getInjections(dependencies, instanceName);

        return func.apply(_this, injections);
      };
    }

    this.injector = {};

    this.registerInterface = function(name, canInjectInterfaces) {
      if (_this[name]) {
        throw new Error('DependencyInjection: "' + name + '" interface is already registered.');
      }

      _interfaces[name] = {
        interfacesSupported: (canInjectInterfaces || []).concat(name),
        factories: {}
      };

      _this.injector[name] = new Injector(name);

      _this[name] = function DependencyInjectionFactory(factoryName, factoryFunction) {
        if (_interfaces[name].factories[factoryName]) {
          throw new Error('DependencyInjection: "' + factoryName + '" is already registered in ' + name + '.');
        }

        _interfaces[name].factories[factoryName] = {
          instantiated: false,
          result: factoryFunction
        };

        return _this;
      };

      return _this;
    };

  })();

  if (module && module.exports) {
    module.exports = DependencyInjection;
  }
  else {
    root.DependencyInjection = DependencyInjection;
  }

})(this);

(function(root) {
  'use strict';

  var DependencyInjection = module && module.exports || root.DependencyInjection;

  // Models

  DependencyInjection.registerInterface('model', ['viewmodel', 'factory', 'service']);
  DependencyInjection.registerInterface('factory', ['viewmodel', 'model', 'service']);
  DependencyInjection.registerInterface('service', ['viewmodel', 'model', 'factory']);

  // ViewModels

  DependencyInjection.registerInterface('viewmodel', ['model', 'factory', 'service', 'view', 'converter']);

  // Views

  DependencyInjection.registerInterface('view', ['viewmodel', 'converter']);
  DependencyInjection.registerInterface('converter', ['viewmodel', 'view']);

})(this);
