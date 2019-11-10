/**
 * angular-strap
 * @version v2.3.6 - 2015-11-14
 * @link http://mgcrea.github.io/angular-strap
 * @author Olivier Louvignes <olivier@mg-crea.com> (https://github.com/mgcrea)
 * @license MIT License, http://www.opensource.org/licenses/MIT
 */
'use strict';

angular.module('mgcrea.ngStrap.core', []).service('$bsCompiler', bsCompilerService);

function bsCompilerService($q, $http, $injector, $compile, $controller, $templateCache) {
  this.compile = function(options) {
    if (options.template && /\.html$/.test(options.template)) {
      console.warn('Deprecated use of `template` option to pass a file. Please use the `templateUrl` option instead.');
      options.templateUrl = options.template;
      options.template = '';
    }
    var templateUrl = options.templateUrl;
    var template = options.template || '';
    var controller = options.controller;
    var controllerAs = options.controllerAs;
    var resolve = angular.copy(options.resolve || {});
    var locals = angular.copy(options.locals || {});
    var transformTemplate = options.transformTemplate || angular.identity;
    var bindToController = options.bindToController;
    angular.forEach(resolve, function(value, key) {
      if (angular.isString(value)) {
        resolve[key] = $injector.get(value);
      } else {
        resolve[key] = $injector.invoke(value);
      }
    });
    angular.extend(resolve, locals);
    if (template) {
      resolve.$template = $q.when(template);
    } else if (templateUrl) {
      resolve.$template = fetchTemplate(templateUrl);
    } else {
      throw new Error('Missing `template` / `templateUrl` option.');
    }
    if (options.contentTemplate) {
      resolve.$template = $q.all([ resolve.$template, fetchTemplate(options.contentTemplate) ]).then(function(templates) {
        var templateEl = angular.element(templates[0]);
        var contentEl = findElement('[ng-bind="content"]', templateEl[0]).removeAttr('ng-bind').html(templates[1]);
        if (!options.templateUrl) contentEl.next().remove();
        return templateEl[0].outerHTML;
      });
    }
    return $q.all(resolve).then(function(locals) {
      var template = transformTemplate(locals.$template);
      if (options.html) {
        template = template.replace(/ng-bind="/gi, 'ng-bind-html="');
      }
      var element = angular.element('<div>').html(template.trim()).contents();
      var linkFn = $compile(element);
      return {
        locals: locals,
        element: element,
        link: function link(scope) {
          locals.$scope = scope;
          if (controller) {
            var invokeCtrl = $controller(controller, locals, true);
            if (bindToController) {
              angular.extend(invokeCtrl.instance, locals);
            }
            var ctrl = angular.isObject(invokeCtrl) ? invokeCtrl : invokeCtrl();
            element.data('$ngControllerController', ctrl);
            element.children().data('$ngControllerController', ctrl);
            if (controllerAs) {
              scope[controllerAs] = ctrl;
            }
          }
          return linkFn.apply(null, arguments);
        }
      };
    });
  };
  function findElement(query, element) {
    return angular.element((element || document).querySelectorAll(query));
  }
  var fetchPromises = {};
  function fetchTemplate(template) {
    if (fetchPromises[template]) return fetchPromises[template];
    return fetchPromises[template] = $http.get(template, {
      cache: $templateCache
    }).then(function(res) {
      return res.data;
    });
  }
}

bsCompilerService.$inject = [ '$q', '$http', '$injector', '$compile', '$controller', '$templateCache' ];