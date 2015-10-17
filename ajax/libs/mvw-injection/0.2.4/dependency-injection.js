/*! MVW-Injection (0.2.4). (C) 2015 Xavier Boubert. MIT @license: en.wikipedia.org/wiki/MIT_License */
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
      else {
        var factoryArrayCopy = [];

        for (var i = 0; i < factoryFunction.length; i++) {
          factoryArrayCopy.push(factoryFunction[i]);
        }

        factoryFunction = factoryArrayCopy;
      }

      return factoryFunction;
    }

    function Injector(instanceName) {

      function _getInjections(dependencies, name, customDependencies) {
        var interfaces = _interfaces[name].interfacesSupported,
            injections = [],
            i,
            j;

        for (i = 0; i < dependencies.length; i++) {
          var factory = null;

          if (customDependencies && typeof customDependencies[dependencies[i]] != 'undefined') {
            factory = customDependencies[dependencies[i]];
          }
          else {
            for (j = 0; j < interfaces.length; j++) {
              if (!_interfaces[interfaces[j]]) {
                throw new Error('DependencyInjection: "' + interfaces[j] + '" interface is not registered.');
              }

              factory = _interfaces[interfaces[j]].factories[dependencies[i]];

              if (factory) {
                factory.interfaceName = interfaces[j];
                break;
              }
            }
          }

          if (factory) {
            if (!factory.instantiated) {
              var deps = _formatFactoryFunction(factory.result);
              factory.result = deps.pop();

              var factoryInjections = _getInjections(deps, factory.interfaceName);

              factory.result = factory.result.apply(_this, factoryInjections);
              factory.instantiated = true;
            }

            injections.push(factory.result);
          }
          else {
            throw new Error('DependencyInjection: "' + dependencies[i] + '" is not registered or accessible in ' + name + '.');
          }
        }

        return injections;
      }

      this.get = function(factoryName) {
        var injections = _getInjections([factoryName], instanceName);

        return injections[0];
      };

      this.invoke = function(thisArg, func, customDependencies) {
        var dependencies = _formatFactoryFunction(func);
        func = dependencies.pop();

        if (customDependencies) {
          var formatcustomDependencies = {},
              interfaceName,
              factory;

          for (interfaceName in customDependencies) {
            for (factory in customDependencies[interfaceName]) {
              formatcustomDependencies[factory] = {
                interfaceName: interfaceName,
                instantiated: false,
                result: customDependencies[interfaceName][factory]
              };
            }
          }

          customDependencies = formatcustomDependencies;
        }

        var injections = _getInjections(dependencies, instanceName, customDependencies);

        return func.apply(thisArg, injections);
      };
    }

    this.injector = {};

    this.registerInterface = function(name, canInjectInterfaces) {
      if (_this[name]) {
        return _this;
      }

      _interfaces[name] = {
        interfacesSupported: (canInjectInterfaces || []).concat(name),
        factories: {}
      };

      _this.injector[name] = new Injector(name);

      _this[name] = function DependencyInjectionFactory(factoryName, factoryFunction, replaceIfExists) {
        if (!replaceIfExists && _interfaces[name].factories[factoryName]) {
          return _this;
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

  if (typeof module != 'undefined' && typeof module.exports != 'undefined') {
    module.exports = DependencyInjection;
  }
  else {
    root.DependencyInjection = DependencyInjection;
  }

})(this);
