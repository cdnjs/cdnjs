/* angular-onsenui v2.10.1 - 2018-05-28 */

(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(factory());
}(this, (function () { 'use strict';

/* Simple JavaScript Inheritance for ES 5.1
 * based on http://ejohn.org/blog/simple-javascript-inheritance/
 *  (inspired by base2 and Prototype)
 * MIT Licensed.
 */
(function () {
  var fnTest = /xyz/.test(function () {
    
  }) ? /\b_super\b/ : /.*/;

  // The base Class implementation (does nothing)
  function BaseClass() {}

  // Create a new Class that inherits from this class
  BaseClass.extend = function (props) {
    var _super = this.prototype;

    // Set up the prototype to inherit from the base class
    // (but without running the init constructor)
    var proto = Object.create(_super);

    // Copy the properties over onto the new prototype
    for (var name in props) {
      // Check if we're overwriting an existing function
      proto[name] = typeof props[name] === "function" && typeof _super[name] == "function" && fnTest.test(props[name]) ? function (name, fn) {
        return function () {
          var tmp = this._super;

          // Add a new ._super() method that is the same method
          // but on the super-class
          this._super = _super[name];

          // The method only need to be bound temporarily, so we
          // remove it when we're done executing
          var ret = fn.apply(this, arguments);
          this._super = tmp;

          return ret;
        };
      }(name, props[name]) : props[name];
    }

    // The new constructor
    var newClass = typeof proto.init === "function" ? proto.hasOwnProperty("init") ? proto.init // All construction is actually done in the init method
    : function SubClass() {
      _super.init.apply(this, arguments);
    } : function EmptyClass() {};

    // Populate our constructed prototype object
    newClass.prototype = proto;

    // Enforce the constructor to be what we expect
    proto.constructor = newClass;

    // And make this class extendable
    newClass.extend = BaseClass.extend;

    return newClass;
  };

  // export
  window.Class = BaseClass;
})();

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

/*
Copyright 2013-2015 ASIAL CORPORATION

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

   http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.

*/

/**
 * @object ons
 * @description
 *   [ja]Onsen UIで利用できるグローバルなオブジェクトです。このオブジェクトは、AngularJSのスコープから参照することができます。 [/ja]
 *   [en]A global object that's used in Onsen UI. This object can be reached from the AngularJS scope.[/en]
 */

(function (ons) {
  var module = angular.module('onsen', []);
  angular.module('onsen.directives', ['onsen']); // for BC

  // JS Global facade for Onsen UI.
  initOnsenFacade();
  waitOnsenUILoad();
  initAngularModule();
  initTemplateCache();

  function waitOnsenUILoad() {
    var unlockOnsenUI = ons._readyLock.lock();
    module.run(['$compile', '$rootScope', function ($compile, $rootScope) {
      // for initialization hook.
      if (document.readyState === 'loading' || document.readyState == 'uninitialized') {
        window.addEventListener('DOMContentLoaded', function () {
          document.body.appendChild(document.createElement('ons-dummy-for-init'));
        });
      } else if (document.body) {
        document.body.appendChild(document.createElement('ons-dummy-for-init'));
      } else {
        throw new Error('Invalid initialization state.');
      }

      $rootScope.$on('$ons-ready', unlockOnsenUI);
    }]);
  }

  function initAngularModule() {
    module.value('$onsGlobal', ons);
    module.run(['$compile', '$rootScope', '$onsen', '$q', function ($compile, $rootScope, $onsen, $q) {
      ons._onsenService = $onsen;
      ons._qService = $q;

      $rootScope.ons = window.ons;
      $rootScope.console = window.console;
      $rootScope.alert = window.alert;

      ons.$compile = $compile;
    }]);
  }

  function initTemplateCache() {
    module.run(['$templateCache', function ($templateCache) {
      var tmp = ons._internal.getTemplateHTMLAsync;

      ons._internal.getTemplateHTMLAsync = function (page) {
        var cache = $templateCache.get(page);

        if (cache) {
          return Promise.resolve(cache);
        } else {
          return tmp(page);
        }
      };
    }]);
  }

  function initOnsenFacade() {
    ons._onsenService = null;

    // Object to attach component variables to when using the var="..." attribute.
    // Can be set to null to avoid polluting the global scope.
    ons.componentBase = window;

    /**
     * @method bootstrap
     * @signature bootstrap([moduleName, [dependencies]])
     * @description
     *   [ja]Onsen UIの初期化を行います。Angular.jsのng-app属性を利用すること無しにOnsen UIを読み込んで初期化してくれます。[/ja]
     *   [en]Initialize Onsen UI. Can be used to load Onsen UI without using the <code>ng-app</code> attribute from AngularJS.[/en]
     * @param {String} [moduleName]
     *   [en]AngularJS module name.[/en]
     *   [ja]Angular.jsでのモジュール名[/ja]
     * @param {Array} [dependencies]
     *   [en]List of AngularJS module dependencies.[/en]
     *   [ja]依存するAngular.jsのモジュール名の配列[/ja]
     * @return {Object}
     *   [en]An AngularJS module object.[/en]
     *   [ja]AngularJSのModuleオブジェクトを表します。[/ja]
     */
    ons.bootstrap = function (name, deps) {
      if (angular.isArray(name)) {
        deps = name;
        name = undefined;
      }

      if (!name) {
        name = 'myOnsenApp';
      }

      deps = ['onsen'].concat(angular.isArray(deps) ? deps : []);
      var module = angular.module(name, deps);

      var doc = window.document;
      if (doc.readyState == 'loading' || doc.readyState == 'uninitialized' || doc.readyState == 'interactive') {
        doc.addEventListener('DOMContentLoaded', function () {
          angular.bootstrap(doc.documentElement, [name]);
        }, false);
      } else if (doc.documentElement) {
        angular.bootstrap(doc.documentElement, [name]);
      } else {
        throw new Error('Invalid state');
      }

      return module;
    };

    /**
     * @method findParentComponentUntil
     * @signature findParentComponentUntil(name, [dom])
     * @param {String} name
     *   [en]Name of component, i.e. 'ons-page'.[/en]
     *   [ja]コンポーネント名を指定します。例えばons-pageなどを指定します。[/ja]
     * @param {Object/jqLite/HTMLElement} [dom]
     *   [en]$event, jqLite or HTMLElement object.[/en]
     *   [ja]$eventオブジェクト、jqLiteオブジェクト、HTMLElementオブジェクトのいずれかを指定できます。[/ja]
     * @return {Object}
     *   [en]Component object. Will return null if no component was found.[/en]
     *   [ja]コンポーネントのオブジェクトを返します。もしコンポーネントが見つからなかった場合にはnullを返します。[/ja]
     * @description
     *   [en]Find parent component object of <code>dom</code> element.[/en]
     *   [ja]指定されたdom引数の親要素をたどってコンポーネントを検索します。[/ja]
     */
    ons.findParentComponentUntil = function (name, dom) {
      var element;
      if (dom instanceof HTMLElement) {
        element = angular.element(dom);
      } else if (dom instanceof angular.element) {
        element = dom;
      } else if (dom.target) {
        element = angular.element(dom.target);
      }

      return element.inheritedData(name);
    };

    /**
     * @method findComponent
     * @signature findComponent(selector, [dom])
     * @param {String} selector
     *   [en]CSS selector[/en]
     *   [ja]CSSセレクターを指定します。[/ja]
     * @param {HTMLElement} [dom]
     *   [en]DOM element to search from.[/en]
     *   [ja]検索対象とするDOM要素を指定します。[/ja]
     * @return {Object/null}
     *   [en]Component object. Will return null if no component was found.[/en]
     *   [ja]コンポーネントのオブジェクトを返します。もしコンポーネントが見つからなかった場合にはnullを返します。[/ja]
     * @description
     *   [en]Find component object using CSS selector.[/en]
     *   [ja]CSSセレクタを使ってコンポーネントのオブジェクトを検索します。[/ja]
     */
    ons.findComponent = function (selector, dom) {
      var target = (dom ? dom : document).querySelector(selector);
      return target ? angular.element(target).data(target.nodeName.toLowerCase()) || null : null;
    };

    /**
     * @method compile
     * @signature compile(dom)
     * @param {HTMLElement} dom
     *   [en]Element to compile.[/en]
     *   [ja]コンパイルする要素を指定します。[/ja]
     * @description
     *   [en]Compile Onsen UI components.[/en]
     *   [ja]通常のHTMLの要素をOnsen UIのコンポーネントにコンパイルします。[/ja]
     */
    ons.compile = function (dom) {
      if (!ons.$compile) {
        throw new Error('ons.$compile() is not ready. Wait for initialization with ons.ready().');
      }

      if (!(dom instanceof HTMLElement)) {
        throw new Error('First argument must be an instance of HTMLElement.');
      }

      var scope = angular.element(dom).scope();
      if (!scope) {
        throw new Error('AngularJS Scope is null. Argument DOM element must be attached in DOM document.');
      }

      ons.$compile(dom)(scope);
    };

    ons._getOnsenService = function () {
      if (!this._onsenService) {
        throw new Error('$onsen is not loaded, wait for ons.ready().');
      }

      return this._onsenService;
    };

    /**
     * @param {String} elementName
     * @param {Function} lastReady
     * @return {Function}
     */
    ons._waitDiretiveInit = function (elementName, lastReady) {
      return function (element, callback) {
        if (angular.element(element).data(elementName)) {
          lastReady(element, callback);
        } else {
          var listen = function listen() {
            lastReady(element, callback);
            element.removeEventListener(elementName + ':init', listen, false);
          };
          element.addEventListener(elementName + ':init', listen, false);
        }
      };
    };

    /**
     * @method createElement
     * @signature createElement(template, [options])
     * @param {String} template
     *   [en]Either an HTML file path, an `<ons-template>` id or an HTML string such as `'<div id="foo">hoge</div>'`.[/en]
     *   [ja][/ja]
     * @param {Object} [options]
     *   [en]Parameter object.[/en]
     *   [ja]オプションを指定するオブジェクト。[/ja]
     * @param {Boolean|HTMLElement} [options.append]
     *   [en]Whether or not the element should be automatically appended to the DOM.  Defaults to `false`. If `true` value is given, `document.body` will be used as the target.[/en]
     *   [ja][/ja]
     * @param {HTMLElement} [options.insertBefore]
     *   [en]Reference node that becomes the next sibling of the new node (`options.append` element).[/en]
     *   [ja][/ja]
     * @param {Object} [options.parentScope]
     *   [en]Parent scope of the element. Used to bind models and access scope methods from the element. Requires append option.[/en]
     *   [ja][/ja]
     * @return {HTMLElement|Promise}
     *   [en]If the provided template was an inline HTML string, it returns the new element. Otherwise, it returns a promise that resolves to the new element.[/en]
     *   [ja][/ja]
     * @description
     *   [en]Create a new element from a template. Both inline HTML and external files are supported although the return value differs. If the element is appended it will also be compiled by AngularJS (otherwise, `ons.compile` should be manually used).[/en]
     *   [ja][/ja]
     */
    var createElementOriginal = ons.createElement;
    ons.createElement = function (template) {
      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

      var link = function link(element) {
        if (options.parentScope) {
          ons.$compile(angular.element(element))(options.parentScope.$new());
          options.parentScope.$evalAsync();
        } else {
          ons.compile(element);
        }
      };

      var getScope = function getScope(e) {
        return angular.element(e).data(e.tagName.toLowerCase()) || e;
      };
      var result = createElementOriginal(template, _extends({ append: !!options.parentScope, link: link }, options));

      return result instanceof Promise ? result.then(getScope) : getScope(result);
    };

    /**
     * @method createAlertDialog
     * @signature createAlertDialog(page, [options])
     * @param {String} page
     *   [en]Page name. Can be either an HTML file or an <ons-template> containing a <ons-alert-dialog> component.[/en]
     *   [ja]pageのURLか、もしくはons-templateで宣言したテンプレートのid属性の値を指定できます。[/ja]
     * @param {Object} [options]
     *   [en]Parameter object.[/en]
     *   [ja]オプションを指定するオブジェクト。[/ja]
     * @param {Object} [options.parentScope]
     *   [en]Parent scope of the dialog. Used to bind models and access scope methods from the dialog.[/en]
     *   [ja]ダイアログ内で利用する親スコープを指定します。ダイアログからモデルやスコープのメソッドにアクセスするのに使います。このパラメータはAngularJSバインディングでのみ利用できます。[/ja]
     * @return {Promise}
     *   [en]Promise object that resolves to the alert dialog component object.[/en]
     *   [ja]ダイアログのコンポーネントオブジェクトを解決するPromiseオブジェクトを返します。[/ja]
     * @description
     *   [en]Create a alert dialog instance from a template. This method will be deprecated in favor of `ons.createElement`.[/en]
     *   [ja]テンプレートからアラートダイアログのインスタンスを生成します。[/ja]
     */

    /**
     * @method createDialog
     * @signature createDialog(page, [options])
     * @param {String} page
     *   [en]Page name. Can be either an HTML file or an <ons-template> containing a <ons-dialog> component.[/en]
     *   [ja]pageのURLか、もしくはons-templateで宣言したテンプレートのid属性の値を指定できます。[/ja]
     * @param {Object} [options]
     *   [en]Parameter object.[/en]
     *   [ja]オプションを指定するオブジェクト。[/ja]
     * @param {Object} [options.parentScope]
     *   [en]Parent scope of the dialog. Used to bind models and access scope methods from the dialog.[/en]
     *   [ja]ダイアログ内で利用する親スコープを指定します。ダイアログからモデルやスコープのメソッドにアクセスするのに使います。このパラメータはAngularJSバインディングでのみ利用できます。[/ja]
     * @return {Promise}
     *   [en]Promise object that resolves to the dialog component object.[/en]
     *   [ja]ダイアログのコンポーネントオブジェクトを解決するPromiseオブジェクトを返します。[/ja]
     * @description
     *   [en]Create a dialog instance from a template. This method will be deprecated in favor of `ons.createElement`.[/en]
     *   [ja]テンプレートからダイアログのインスタンスを生成します。[/ja]
     */

    /**
     * @method createPopover
     * @signature createPopover(page, [options])
     * @param {String} page
     *   [en]Page name. Can be either an HTML file or an <ons-template> containing a <ons-dialog> component.[/en]
     *   [ja]pageのURLか、もしくはons-templateで宣言したテンプレートのid属性の値を指定できます。[/ja]
     * @param {Object} [options]
     *   [en]Parameter object.[/en]
     *   [ja]オプションを指定するオブジェクト。[/ja]
     * @param {Object} [options.parentScope]
     *   [en]Parent scope of the dialog. Used to bind models and access scope methods from the dialog.[/en]
     *   [ja]ダイアログ内で利用する親スコープを指定します。ダイアログからモデルやスコープのメソッドにアクセスするのに使います。このパラメータはAngularJSバインディングでのみ利用できます。[/ja]
     * @return {Promise}
     *   [en]Promise object that resolves to the popover component object.[/en]
     *   [ja]ポップオーバーのコンポーネントオブジェクトを解決するPromiseオブジェクトを返します。[/ja]
     * @description
     *   [en]Create a popover instance from a template. This method will be deprecated in favor of `ons.createElement`.[/en]
     *   [ja]テンプレートからポップオーバーのインスタンスを生成します。[/ja]
     */

    /**
     * @param {String} page
     */
    var resolveLoadingPlaceHolderOriginal = ons.resolveLoadingPlaceHolder;
    ons.resolveLoadingPlaceholder = function (page) {
      return resolveLoadingPlaceholderOriginal(page, function (element, done) {
        ons.compile(element);
        angular.element(element).scope().$evalAsync(function () {
          return setImmediate(done);
        });
      });
    };

    ons._setupLoadingPlaceHolders = function () {
      // Do nothing
    };
  }
})(window.ons = window.ons || {});

/*
Copyright 2013-2015 ASIAL CORPORATION

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

   http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.

*/

(function () {
  var module = angular.module('onsen');

  module.factory('ActionSheetView', ['$onsen', function ($onsen) {

    var ActionSheetView = Class.extend({

      /**
       * @param {Object} scope
       * @param {jqLite} element
       * @param {Object} attrs
       */
      init: function init(scope, element, attrs) {
        this._scope = scope;
        this._element = element;
        this._attrs = attrs;

        this._clearDerivingMethods = $onsen.deriveMethods(this, this._element[0], ['show', 'hide', 'toggle']);

        this._clearDerivingEvents = $onsen.deriveEvents(this, this._element[0], ['preshow', 'postshow', 'prehide', 'posthide', 'cancel'], function (detail) {
          if (detail.actionSheet) {
            detail.actionSheet = this;
          }
          return detail;
        }.bind(this));

        this._scope.$on('$destroy', this._destroy.bind(this));
      },

      _destroy: function _destroy() {
        this.emit('destroy');

        this._element.remove();
        this._clearDerivingMethods();
        this._clearDerivingEvents();

        this._scope = this._attrs = this._element = null;
      }

    });

    MicroEvent.mixin(ActionSheetView);
    $onsen.derivePropertiesFromElement(ActionSheetView, ['disabled', 'cancelable', 'visible', 'onDeviceBackButton']);

    return ActionSheetView;
  }]);
})();

/*
Copyright 2013-2015 ASIAL CORPORATION

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

   http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.

*/

(function () {
  var module = angular.module('onsen');

  module.factory('AlertDialogView', ['$onsen', function ($onsen) {

    var AlertDialogView = Class.extend({

      /**
       * @param {Object} scope
       * @param {jqLite} element
       * @param {Object} attrs
       */
      init: function init(scope, element, attrs) {
        this._scope = scope;
        this._element = element;
        this._attrs = attrs;

        this._clearDerivingMethods = $onsen.deriveMethods(this, this._element[0], ['show', 'hide']);

        this._clearDerivingEvents = $onsen.deriveEvents(this, this._element[0], ['preshow', 'postshow', 'prehide', 'posthide', 'cancel'], function (detail) {
          if (detail.alertDialog) {
            detail.alertDialog = this;
          }
          return detail;
        }.bind(this));

        this._scope.$on('$destroy', this._destroy.bind(this));
      },

      _destroy: function _destroy() {
        this.emit('destroy');

        this._element.remove();

        this._clearDerivingMethods();
        this._clearDerivingEvents();

        this._scope = this._attrs = this._element = null;
      }

    });

    MicroEvent.mixin(AlertDialogView);
    $onsen.derivePropertiesFromElement(AlertDialogView, ['disabled', 'cancelable', 'visible', 'onDeviceBackButton']);

    return AlertDialogView;
  }]);
})();

/*
Copyright 2013-2015 ASIAL CORPORATION

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

   http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.

*/

(function () {
  var module = angular.module('onsen');

  module.factory('CarouselView', ['$onsen', function ($onsen) {

    /**
     * @class CarouselView
     */
    var CarouselView = Class.extend({

      /**
       * @param {Object} scope
       * @param {jqLite} element
       * @param {Object} attrs
       */
      init: function init(scope, element, attrs) {
        this._element = element;
        this._scope = scope;
        this._attrs = attrs;

        this._scope.$on('$destroy', this._destroy.bind(this));

        this._clearDerivingMethods = $onsen.deriveMethods(this, element[0], ['setActiveIndex', 'getActiveIndex', 'next', 'prev', 'refresh', 'first', 'last']);

        this._clearDerivingEvents = $onsen.deriveEvents(this, element[0], ['refresh', 'postchange', 'overscroll'], function (detail) {
          if (detail.carousel) {
            detail.carousel = this;
          }
          return detail;
        }.bind(this));
      },

      _destroy: function _destroy() {
        this.emit('destroy');

        this._clearDerivingEvents();
        this._clearDerivingMethods();

        this._element = this._scope = this._attrs = null;
      }
    });

    MicroEvent.mixin(CarouselView);

    $onsen.derivePropertiesFromElement(CarouselView, ['centered', 'overscrollable', 'disabled', 'autoScroll', 'swipeable', 'autoScrollRatio', 'itemCount', 'onSwipe']);

    return CarouselView;
  }]);
})();

/*
Copyright 2013-2015 ASIAL CORPORATION

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

   http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.

*/

(function () {
  var module = angular.module('onsen');

  module.factory('DialogView', ['$onsen', function ($onsen) {

    var DialogView = Class.extend({

      init: function init(scope, element, attrs) {
        this._scope = scope;
        this._element = element;
        this._attrs = attrs;

        this._clearDerivingMethods = $onsen.deriveMethods(this, this._element[0], ['show', 'hide']);

        this._clearDerivingEvents = $onsen.deriveEvents(this, this._element[0], ['preshow', 'postshow', 'prehide', 'posthide', 'cancel'], function (detail) {
          if (detail.dialog) {
            detail.dialog = this;
          }
          return detail;
        }.bind(this));

        this._scope.$on('$destroy', this._destroy.bind(this));
      },

      _destroy: function _destroy() {
        this.emit('destroy');

        this._element.remove();
        this._clearDerivingMethods();
        this._clearDerivingEvents();

        this._scope = this._attrs = this._element = null;
      }
    });

    MicroEvent.mixin(DialogView);
    $onsen.derivePropertiesFromElement(DialogView, ['disabled', 'cancelable', 'visible', 'onDeviceBackButton']);

    return DialogView;
  }]);
})();

/*
Copyright 2013-2015 ASIAL CORPORATION

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

   http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.

*/

(function () {
  var module = angular.module('onsen');

  module.factory('FabView', ['$onsen', function ($onsen) {

    /**
     * @class FabView
     */
    var FabView = Class.extend({

      /**
       * @param {Object} scope
       * @param {jqLite} element
       * @param {Object} attrs
       */
      init: function init(scope, element, attrs) {
        this._element = element;
        this._scope = scope;
        this._attrs = attrs;

        this._scope.$on('$destroy', this._destroy.bind(this));

        this._clearDerivingMethods = $onsen.deriveMethods(this, element[0], ['show', 'hide', 'toggle']);
      },

      _destroy: function _destroy() {
        this.emit('destroy');
        this._clearDerivingMethods();

        this._element = this._scope = this._attrs = null;
      }
    });

    $onsen.derivePropertiesFromElement(FabView, ['disabled', 'visible']);

    MicroEvent.mixin(FabView);

    return FabView;
  }]);
})();

/*
Copyright 2013-2015 ASIAL CORPORATION

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

   http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.

*/

(function () {
  angular.module('onsen').factory('GenericView', ['$onsen', function ($onsen) {

    var GenericView = Class.extend({

      /**
       * @param {Object} scope
       * @param {jqLite} element
       * @param {Object} attrs
       * @param {Object} [options]
       * @param {Boolean} [options.directiveOnly]
       * @param {Function} [options.onDestroy]
       * @param {String} [options.modifierTemplate]
       */
      init: function init(scope, element, attrs, options) {
        var self = this;
        options = {};

        this._element = element;
        this._scope = scope;
        this._attrs = attrs;

        if (options.directiveOnly) {
          if (!options.modifierTemplate) {
            throw new Error('options.modifierTemplate is undefined.');
          }
          $onsen.addModifierMethods(this, options.modifierTemplate, element);
        } else {
          $onsen.addModifierMethodsForCustomElements(this, element);
        }

        $onsen.cleaner.onDestroy(scope, function () {
          self._events = undefined;
          $onsen.removeModifierMethods(self);

          if (options.onDestroy) {
            options.onDestroy(self);
          }

          $onsen.clearComponent({
            scope: scope,
            attrs: attrs,
            element: element
          });

          self = element = self._element = self._scope = scope = self._attrs = attrs = options = null;
        });
      }
    });

    /**
     * @param {Object} scope
     * @param {jqLite} element
     * @param {Object} attrs
     * @param {Object} options
     * @param {String} options.viewKey
     * @param {Boolean} [options.directiveOnly]
     * @param {Function} [options.onDestroy]
     * @param {String} [options.modifierTemplate]
     */
    GenericView.register = function (scope, element, attrs, options) {
      var view = new GenericView(scope, element, attrs, options);

      if (!options.viewKey) {
        throw new Error('options.viewKey is required.');
      }

      $onsen.declareVarAttribute(attrs, view);
      element.data(options.viewKey, view);

      var destroy = options.onDestroy || angular.noop;
      options.onDestroy = function (view) {
        destroy(view);
        element.data(options.viewKey, null);
      };

      return view;
    };

    MicroEvent.mixin(GenericView);

    return GenericView;
  }]);
})();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/*
Copyright 2013-2015 ASIAL CORPORATION

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

   http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.

*/

(function () {
  angular.module('onsen').factory('AngularLazyRepeatDelegate', ['$compile', function ($compile) {

    var directiveAttributes = ['ons-lazy-repeat', 'ons:lazy:repeat', 'ons_lazy_repeat', 'data-ons-lazy-repeat', 'x-ons-lazy-repeat'];

    var AngularLazyRepeatDelegate = function (_ons$_internal$LazyRe) {
      _inherits(AngularLazyRepeatDelegate, _ons$_internal$LazyRe);

      /**
       * @param {Object} userDelegate
       * @param {Element} templateElement
       * @param {Scope} parentScope
       */
      function AngularLazyRepeatDelegate(userDelegate, templateElement, parentScope) {
        _classCallCheck(this, AngularLazyRepeatDelegate);

        var _this = _possibleConstructorReturn(this, (AngularLazyRepeatDelegate.__proto__ || Object.getPrototypeOf(AngularLazyRepeatDelegate)).call(this, userDelegate, templateElement));

        _this._parentScope = parentScope;

        directiveAttributes.forEach(function (attr) {
          return templateElement.removeAttribute(attr);
        });
        _this._linker = $compile(templateElement ? templateElement.cloneNode(true) : null);
        return _this;
      }

      _createClass(AngularLazyRepeatDelegate, [{
        key: 'configureItemScope',
        value: function configureItemScope(item, scope) {
          if (this._userDelegate.configureItemScope instanceof Function) {
            this._userDelegate.configureItemScope(item, scope);
          }
        }
      }, {
        key: 'destroyItemScope',
        value: function destroyItemScope(item, element) {
          if (this._userDelegate.destroyItemScope instanceof Function) {
            this._userDelegate.destroyItemScope(item, element);
          }
        }
      }, {
        key: '_usingBinding',
        value: function _usingBinding() {
          if (this._userDelegate.configureItemScope) {
            return true;
          }

          if (this._userDelegate.createItemContent) {
            return false;
          }

          throw new Error('`lazy-repeat` delegate object is vague.');
        }
      }, {
        key: 'loadItemElement',
        value: function loadItemElement(index, done) {
          this._prepareItemElement(index, function (_ref) {
            var element = _ref.element,
                scope = _ref.scope;

            done({ element: element, scope: scope });
          });
        }
      }, {
        key: '_prepareItemElement',
        value: function _prepareItemElement(index, done) {
          var _this2 = this;

          var scope = this._parentScope.$new();
          this._addSpecialProperties(index, scope);

          if (this._usingBinding()) {
            this.configureItemScope(index, scope);
          }

          this._linker(scope, function (cloned) {
            var element = cloned[0];
            if (!_this2._usingBinding()) {
              element = _this2._userDelegate.createItemContent(index, element);
              $compile(element)(scope);
            }

            done({ element: element, scope: scope });
          });
        }

        /**
         * @param {Number} index
         * @param {Object} scope
         */

      }, {
        key: '_addSpecialProperties',
        value: function _addSpecialProperties(i, scope) {
          var last = this.countItems() - 1;
          angular.extend(scope, {
            $index: i,
            $first: i === 0,
            $last: i === last,
            $middle: i !== 0 && i !== last,
            $even: i % 2 === 0,
            $odd: i % 2 === 1
          });
        }
      }, {
        key: 'updateItem',
        value: function updateItem(index, item) {
          var _this3 = this;

          if (this._usingBinding()) {
            item.scope.$evalAsync(function () {
              return _this3.configureItemScope(index, item.scope);
            });
          } else {
            _get(AngularLazyRepeatDelegate.prototype.__proto__ || Object.getPrototypeOf(AngularLazyRepeatDelegate.prototype), 'updateItem', this).call(this, index, item);
          }
        }

        /**
         * @param {Number} index
         * @param {Object} item
         * @param {Object} item.scope
         * @param {Element} item.element
         */

      }, {
        key: 'destroyItem',
        value: function destroyItem(index, item) {
          if (this._usingBinding()) {
            this.destroyItemScope(index, item.scope);
          } else {
            _get(AngularLazyRepeatDelegate.prototype.__proto__ || Object.getPrototypeOf(AngularLazyRepeatDelegate.prototype), 'destroyItem', this).call(this, index, item.element);
          }
          item.scope.$destroy();
        }
      }, {
        key: 'destroy',
        value: function destroy() {
          _get(AngularLazyRepeatDelegate.prototype.__proto__ || Object.getPrototypeOf(AngularLazyRepeatDelegate.prototype), 'destroy', this).call(this);
          this._scope = null;
        }
      }]);

      return AngularLazyRepeatDelegate;
    }(ons._internal.LazyRepeatDelegate);

    return AngularLazyRepeatDelegate;
  }]);
})();

/*
Copyright 2013-2015 ASIAL CORPORATION

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

   http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.

*/

(function () {
  var module = angular.module('onsen');

  module.factory('LazyRepeatView', ['AngularLazyRepeatDelegate', function (AngularLazyRepeatDelegate) {

    var LazyRepeatView = Class.extend({

      /**
       * @param {Object} scope
       * @param {jqLite} element
       * @param {Object} attrs
       */
      init: function init(scope, element, attrs, linker) {
        var _this = this;

        this._element = element;
        this._scope = scope;
        this._attrs = attrs;
        this._linker = linker;

        var userDelegate = this._scope.$eval(this._attrs.onsLazyRepeat);

        var internalDelegate = new AngularLazyRepeatDelegate(userDelegate, element[0], scope || element.scope());

        this._provider = new ons._internal.LazyRepeatProvider(element[0].parentNode, internalDelegate);

        // Expose refresh method to user.
        userDelegate.refresh = this._provider.refresh.bind(this._provider);

        element.remove();

        // Render when number of items change.
        this._scope.$watch(internalDelegate.countItems.bind(internalDelegate), this._provider._onChange.bind(this._provider));

        this._scope.$on('$destroy', function () {
          _this._element = _this._scope = _this._attrs = _this._linker = null;
        });
      }
    });

    return LazyRepeatView;
  }]);
})();

/*
Copyright 2013-2015 ASIAL CORPORATION

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

   http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.

*/

(function () {
  var module = angular.module('onsen');

  module.factory('ModalView', ['$onsen', '$parse', function ($onsen, $parse) {

    var ModalView = Class.extend({
      _element: undefined,
      _scope: undefined,

      init: function init(scope, element, attrs) {
        this._scope = scope;
        this._element = element;
        this._attrs = attrs;
        this._scope.$on('$destroy', this._destroy.bind(this));

        this._clearDerivingMethods = $onsen.deriveMethods(this, this._element[0], ['show', 'hide', 'toggle']);

        this._clearDerivingEvents = $onsen.deriveEvents(this, this._element[0], ['preshow', 'postshow', 'prehide', 'posthide'], function (detail) {
          if (detail.modal) {
            detail.modal = this;
          }
          return detail;
        }.bind(this));
      },

      _destroy: function _destroy() {
        this.emit('destroy', { page: this });

        this._element.remove();
        this._clearDerivingMethods();
        this._clearDerivingEvents();
        this._events = this._element = this._scope = this._attrs = null;
      }
    });

    MicroEvent.mixin(ModalView);
    $onsen.derivePropertiesFromElement(ModalView, ['onDeviceBackButton', 'visible']);

    return ModalView;
  }]);
})();

/*
Copyright 2013-2015 ASIAL CORPORATION

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

   http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.

*/

(function () {
  var module = angular.module('onsen');

  module.factory('NavigatorView', ['$compile', '$onsen', function ($compile, $onsen) {

    /**
     * Manages the page navigation backed by page stack.
     *
     * @class NavigatorView
     */
    var NavigatorView = Class.extend({

      /**
       * @member {jqLite} Object
       */
      _element: undefined,

      /**
       * @member {Object} Object
       */
      _attrs: undefined,

      /**
       * @member {Object}
       */
      _scope: undefined,

      /**
       * @param {Object} scope
       * @param {jqLite} element jqLite Object to manage with navigator
       * @param {Object} attrs
       */
      init: function init(scope, element, attrs) {

        this._element = element || angular.element(window.document.body);
        this._scope = scope || this._element.scope();
        this._attrs = attrs;
        this._previousPageScope = null;

        this._boundOnPrepop = this._onPrepop.bind(this);
        this._element.on('prepop', this._boundOnPrepop);

        this._scope.$on('$destroy', this._destroy.bind(this));

        this._clearDerivingEvents = $onsen.deriveEvents(this, element[0], ['prepush', 'postpush', 'prepop', 'postpop', 'init', 'show', 'hide', 'destroy'], function (detail) {
          if (detail.navigator) {
            detail.navigator = this;
          }
          return detail;
        }.bind(this));

        this._clearDerivingMethods = $onsen.deriveMethods(this, element[0], ['insertPage', 'removePage', 'pushPage', 'bringPageTop', 'popPage', 'replacePage', 'resetToPage', 'canPopPage']);
      },

      _onPrepop: function _onPrepop(event) {
        var pages = event.detail.navigator.pages;
        angular.element(pages[pages.length - 2]).data('_scope').$evalAsync();
      },

      _destroy: function _destroy() {
        this.emit('destroy');
        this._clearDerivingEvents();
        this._clearDerivingMethods();
        this._element.off('prepop', this._boundOnPrepop);
        this._element = this._scope = this._attrs = null;
      }
    });

    MicroEvent.mixin(NavigatorView);
    $onsen.derivePropertiesFromElement(NavigatorView, ['pages', 'topPage', 'onSwipe', 'options', 'onDeviceBackButton', 'pageLoader']);

    return NavigatorView;
  }]);
})();

/*
Copyright 2013-2015 ASIAL CORPORATION

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

   http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.

*/

(function () {
  var module = angular.module('onsen');

  module.factory('PageView', ['$onsen', '$parse', function ($onsen, $parse) {

    var PageView = Class.extend({
      init: function init(scope, element, attrs) {
        var _this = this;

        this._scope = scope;
        this._element = element;
        this._attrs = attrs;

        this._clearListener = scope.$on('$destroy', this._destroy.bind(this));

        this._clearDerivingEvents = $onsen.deriveEvents(this, element[0], ['init', 'show', 'hide', 'destroy']);

        Object.defineProperty(this, 'onDeviceBackButton', {
          get: function get() {
            return _this._element[0].onDeviceBackButton;
          },
          set: function set(value) {
            if (!_this._userBackButtonHandler) {
              _this._enableBackButtonHandler();
            }
            _this._userBackButtonHandler = value;
          }
        });

        if (this._attrs.ngDeviceBackButton || this._attrs.onDeviceBackButton) {
          this._enableBackButtonHandler();
        }
        if (this._attrs.ngInfiniteScroll) {
          this._element[0].onInfiniteScroll = function (done) {
            $parse(_this._attrs.ngInfiniteScroll)(_this._scope)(done);
          };
        }
      },

      _enableBackButtonHandler: function _enableBackButtonHandler() {
        this._userBackButtonHandler = angular.noop;
        this._element[0].onDeviceBackButton = this._onDeviceBackButton.bind(this);
      },

      _onDeviceBackButton: function _onDeviceBackButton($event) {
        this._userBackButtonHandler($event);

        // ng-device-backbutton
        if (this._attrs.ngDeviceBackButton) {
          $parse(this._attrs.ngDeviceBackButton)(this._scope, { $event: $event });
        }

        // on-device-backbutton
        /* jshint ignore:start */
        if (this._attrs.onDeviceBackButton) {
          var lastEvent = window.$event;
          window.$event = $event;
          new Function(this._attrs.onDeviceBackButton)(); // eslint-disable-line no-new-func
          window.$event = lastEvent;
        }
        /* jshint ignore:end */
      },

      _destroy: function _destroy() {
        this._clearDerivingEvents();

        this._element = null;
        this._scope = null;

        this._clearListener();
      }
    });
    MicroEvent.mixin(PageView);

    return PageView;
  }]);
})();

/*
Copyright 2013-2015 ASIAL CORPORATION

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

   http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.

*/

(function () {
  angular.module('onsen').factory('PopoverView', ['$onsen', function ($onsen) {

    var PopoverView = Class.extend({

      /**
       * @param {Object} scope
       * @param {jqLite} element
       * @param {Object} attrs
       */
      init: function init(scope, element, attrs) {
        this._element = element;
        this._scope = scope;
        this._attrs = attrs;

        this._scope.$on('$destroy', this._destroy.bind(this));

        this._clearDerivingMethods = $onsen.deriveMethods(this, this._element[0], ['show', 'hide']);

        this._clearDerivingEvents = $onsen.deriveEvents(this, this._element[0], ['preshow', 'postshow', 'prehide', 'posthide'], function (detail) {
          if (detail.popover) {
            detail.popover = this;
          }
          return detail;
        }.bind(this));
      },

      _destroy: function _destroy() {
        this.emit('destroy');

        this._clearDerivingMethods();
        this._clearDerivingEvents();

        this._element.remove();

        this._element = this._scope = null;
      }
    });

    MicroEvent.mixin(PopoverView);
    $onsen.derivePropertiesFromElement(PopoverView, ['cancelable', 'disabled', 'onDeviceBackButton', 'visible']);

    return PopoverView;
  }]);
})();

/*
Copyright 2013-2015 ASIAL CORPORATION

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

   http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.

*/

(function () {
  var module = angular.module('onsen');

  module.factory('PullHookView', ['$onsen', '$parse', function ($onsen, $parse) {

    var PullHookView = Class.extend({

      init: function init(scope, element, attrs) {
        var _this = this;

        this._element = element;
        this._scope = scope;
        this._attrs = attrs;

        this._clearDerivingEvents = $onsen.deriveEvents(this, this._element[0], ['changestate'], function (detail) {
          if (detail.pullHook) {
            detail.pullHook = _this;
          }
          return detail;
        });

        this.on('changestate', function () {
          return _this._scope.$evalAsync();
        });

        this._element[0].onAction = function (done) {
          if (_this._attrs.ngAction) {
            _this._scope.$eval(_this._attrs.ngAction, { $done: done });
          } else {
            _this.onAction ? _this.onAction(done) : done();
          }
        };

        this._scope.$on('$destroy', this._destroy.bind(this));
      },

      _destroy: function _destroy() {
        this.emit('destroy');

        this._clearDerivingEvents();

        this._element = this._scope = this._attrs = null;
      }
    });

    MicroEvent.mixin(PullHookView);

    $onsen.derivePropertiesFromElement(PullHookView, ['state', 'onPull', 'pullDistance', 'height', 'thresholdHeight', 'disabled']);

    return PullHookView;
  }]);
})();

/*
Copyright 2013-2015 ASIAL CORPORATION

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

   http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.

*/

(function () {
  var module = angular.module('onsen');

  module.factory('SpeedDialView', ['$onsen', function ($onsen) {

    /**
     * @class SpeedDialView
     */
    var SpeedDialView = Class.extend({

      /**
       * @param {Object} scope
       * @param {jqLite} element
       * @param {Object} attrs
       */
      init: function init(scope, element, attrs) {
        this._element = element;
        this._scope = scope;
        this._attrs = attrs;

        this._scope.$on('$destroy', this._destroy.bind(this));

        this._clearDerivingMethods = $onsen.deriveMethods(this, element[0], ['show', 'hide', 'showItems', 'hideItems', 'isOpen', 'toggle', 'toggleItems']);

        this._clearDerivingEvents = $onsen.deriveEvents(this, element[0], ['open', 'close']).bind(this);
      },

      _destroy: function _destroy() {
        this.emit('destroy');

        this._clearDerivingEvents();
        this._clearDerivingMethods();

        this._element = this._scope = this._attrs = null;
      }
    });

    MicroEvent.mixin(SpeedDialView);

    $onsen.derivePropertiesFromElement(SpeedDialView, ['disabled', 'visible', 'inline']);

    return SpeedDialView;
  }]);
})();

/*
Copyright 2013-2015 ASIAL CORPORATION

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

   http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.

*/
(function () {
  angular.module('onsen').factory('SplitterContent', ['$onsen', '$compile', function ($onsen, $compile) {

    var SplitterContent = Class.extend({

      init: function init(scope, element, attrs) {
        this._element = element;
        this._scope = scope;
        this._attrs = attrs;

        this.load = this._element[0].load.bind(this._element[0]);
        scope.$on('$destroy', this._destroy.bind(this));
      },

      _destroy: function _destroy() {
        this.emit('destroy');
        this._element = this._scope = this._attrs = this.load = this._pageScope = null;
      }
    });

    MicroEvent.mixin(SplitterContent);
    $onsen.derivePropertiesFromElement(SplitterContent, ['page']);

    return SplitterContent;
  }]);
})();

/*
Copyright 2013-2015 ASIAL CORPORATION

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

   http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.

*/
(function () {
  angular.module('onsen').factory('SplitterSide', ['$onsen', '$compile', function ($onsen, $compile) {

    var SplitterSide = Class.extend({

      init: function init(scope, element, attrs) {
        var _this = this;

        this._element = element;
        this._scope = scope;
        this._attrs = attrs;

        this._clearDerivingMethods = $onsen.deriveMethods(this, this._element[0], ['open', 'close', 'toggle', 'load']);

        this._clearDerivingEvents = $onsen.deriveEvents(this, element[0], ['modechange', 'preopen', 'preclose', 'postopen', 'postclose'], function (detail) {
          return detail.side ? angular.extend(detail, { side: _this }) : detail;
        });

        scope.$on('$destroy', this._destroy.bind(this));
      },

      _destroy: function _destroy() {
        this.emit('destroy');

        this._clearDerivingMethods();
        this._clearDerivingEvents();

        this._element = this._scope = this._attrs = null;
      }
    });

    MicroEvent.mixin(SplitterSide);
    $onsen.derivePropertiesFromElement(SplitterSide, ['page', 'mode', 'isOpen', 'onSwipe', 'pageLoader']);

    return SplitterSide;
  }]);
})();

/*
Copyright 2013-2015 ASIAL CORPORATION

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

   http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.

*/
(function () {
  angular.module('onsen').factory('Splitter', ['$onsen', function ($onsen) {

    var Splitter = Class.extend({
      init: function init(scope, element, attrs) {
        this._element = element;
        this._scope = scope;
        this._attrs = attrs;
        scope.$on('$destroy', this._destroy.bind(this));
      },

      _destroy: function _destroy() {
        this.emit('destroy');
        this._element = this._scope = this._attrs = null;
      }
    });

    MicroEvent.mixin(Splitter);
    $onsen.derivePropertiesFromElement(Splitter, ['onDeviceBackButton']);

    ['left', 'right', 'side', 'content', 'mask'].forEach(function (prop, i) {
      Object.defineProperty(Splitter.prototype, prop, {
        get: function get() {
          var tagName = 'ons-splitter-' + (i < 3 ? 'side' : prop);
          return angular.element(this._element[0][prop]).data(tagName);
        }
      });
    });

    return Splitter;
  }]);
})();

/*
Copyright 2013-2015 ASIAL CORPORATION

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

   http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.

*/

(function () {
  angular.module('onsen').factory('SwitchView', ['$parse', '$onsen', function ($parse, $onsen) {

    var SwitchView = Class.extend({

      /**
       * @param {jqLite} element
       * @param {Object} scope
       * @param {Object} attrs
       */
      init: function init(element, scope, attrs) {
        var _this = this;

        this._element = element;
        this._checkbox = angular.element(element[0].querySelector('input[type=checkbox]'));
        this._scope = scope;

        this._prepareNgModel(element, scope, attrs);

        this._scope.$on('$destroy', function () {
          _this.emit('destroy');
          _this._element = _this._checkbox = _this._scope = null;
        });
      },

      _prepareNgModel: function _prepareNgModel(element, scope, attrs) {
        var _this2 = this;

        if (attrs.ngModel) {
          var set = $parse(attrs.ngModel).assign;

          scope.$parent.$watch(attrs.ngModel, function (value) {
            _this2.checked = !!value;
          });

          this._element.on('change', function (e) {
            set(scope.$parent, _this2.checked);

            if (attrs.ngChange) {
              scope.$eval(attrs.ngChange);
            }

            scope.$parent.$evalAsync();
          });
        }
      }
    });

    MicroEvent.mixin(SwitchView);
    $onsen.derivePropertiesFromElement(SwitchView, ['disabled', 'checked', 'checkbox', 'value']);

    return SwitchView;
  }]);
})();

/*
Copyright 2013-2015 ASIAL CORPORATION

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

   http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.

*/

(function () {
  var module = angular.module('onsen');

  module.factory('TabbarView', ['$onsen', function ($onsen) {
    var TabbarView = Class.extend({

      init: function init(scope, element, attrs) {
        if (element[0].nodeName.toLowerCase() !== 'ons-tabbar') {
          throw new Error('"element" parameter must be a "ons-tabbar" element.');
        }

        this._scope = scope;
        this._element = element;
        this._attrs = attrs;

        this._scope.$on('$destroy', this._destroy.bind(this));

        this._clearDerivingEvents = $onsen.deriveEvents(this, element[0], ['reactive', 'postchange', 'prechange', 'init', 'show', 'hide', 'destroy']);

        this._clearDerivingMethods = $onsen.deriveMethods(this, element[0], ['setActiveTab', 'show', 'hide', 'setTabbarVisibility', 'getActiveTabIndex']);
      },

      _destroy: function _destroy() {
        this.emit('destroy');

        this._clearDerivingEvents();
        this._clearDerivingMethods();

        this._element = this._scope = this._attrs = null;
      }
    });

    MicroEvent.mixin(TabbarView);

    $onsen.derivePropertiesFromElement(TabbarView, ['visible', 'swipeable', 'onSwipe']);

    return TabbarView;
  }]);
})();

/*
Copyright 2013-2015 ASIAL CORPORATION

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

   http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.

*/

(function () {
  var module = angular.module('onsen');

  module.factory('ToastView', ['$onsen', function ($onsen) {

    var ToastView = Class.extend({

      /**
       * @param {Object} scope
       * @param {jqLite} element
       * @param {Object} attrs
       */
      init: function init(scope, element, attrs) {
        this._scope = scope;
        this._element = element;
        this._attrs = attrs;

        this._clearDerivingMethods = $onsen.deriveMethods(this, this._element[0], ['show', 'hide', 'toggle']);

        this._clearDerivingEvents = $onsen.deriveEvents(this, this._element[0], ['preshow', 'postshow', 'prehide', 'posthide'], function (detail) {
          if (detail.toast) {
            detail.toast = this;
          }
          return detail;
        }.bind(this));

        this._scope.$on('$destroy', this._destroy.bind(this));
      },

      _destroy: function _destroy() {
        this.emit('destroy');

        this._element.remove();

        this._clearDerivingMethods();
        this._clearDerivingEvents();

        this._scope = this._attrs = this._element = null;
      }

    });

    MicroEvent.mixin(ToastView);
    $onsen.derivePropertiesFromElement(ToastView, ['visible', 'onDeviceBackButton']);

    return ToastView;
  }]);
})();

(function () {
  angular.module('onsen').directive('onsActionSheetButton', ['$onsen', 'GenericView', function ($onsen, GenericView) {
    return {
      restrict: 'E',
      link: function link(scope, element, attrs) {
        GenericView.register(scope, element, attrs, { viewKey: 'ons-action-sheet-button' });
        $onsen.fireComponentEvent(element[0], 'init');
      }
    };
  }]);
})();

/**
 * @element ons-action-sheet
 */

/**
 * @attribute var
 * @initonly
 * @type {String}
 * @description
 *  [en]Variable name to refer this action sheet.[/en]
 *  [ja]このアクションシートを参照するための名前を指定します。[/ja]
 */

/**
 * @attribute ons-preshow
 * @initonly
 * @type {Expression}
 * @description
 *  [en]Allows you to specify custom behavior when the "preshow" event is fired.[/en]
 *  [ja]"preshow"イベントが発火された時の挙動を独自に指定できます。[/ja]
 */

/**
 * @attribute ons-prehide
 * @initonly
 * @type {Expression}
 * @description
 *  [en]Allows you to specify custom behavior when the "prehide" event is fired.[/en]
 *  [ja]"prehide"イベントが発火された時の挙動を独自に指定できます。[/ja]
 */

/**
 * @attribute ons-postshow
 * @initonly
 * @type {Expression}
 * @description
 *  [en]Allows you to specify custom behavior when the "postshow" event is fired.[/en]
 *  [ja]"postshow"イベントが発火された時の挙動を独自に指定できます。[/ja]
 */

/**
 * @attribute ons-posthide
 * @initonly
 * @type {Expression}
 * @description
 *  [en]Allows you to specify custom behavior when the "posthide" event is fired.[/en]
 *  [ja]"posthide"イベントが発火された時の挙動を独自に指定できます。[/ja]
 */

/**
 * @attribute ons-destroy
 * @initonly
 * @type {Expression}
 * @description
 *  [en]Allows you to specify custom behavior when the "destroy" event is fired.[/en]
 *  [ja]"destroy"イベントが発火された時の挙動を独自に指定できます。[/ja]
 */

/**
 * @method on
 * @signature on(eventName, listener)
 * @description
 *   [en]Add an event listener.[/en]
 *   [ja]イベントリスナーを追加します。[/ja]
 * @param {String} eventName
 *   [en]Name of the event.[/en]
 *   [ja]イベント名を指定します。[/ja]
 * @param {Function} listener
 *   [en]Function to execute when the event is triggered.[/en]
 *   [ja]イベントが発火された際に呼び出されるコールバックを指定します。[/ja]
 */

/**
 * @method once
 * @signature once(eventName, listener)
 * @description
 *  [en]Add an event listener that's only triggered once.[/en]
 *  [ja]一度だけ呼び出されるイベントリスナーを追加します。[/ja]
 * @param {String} eventName
 *   [en]Name of the event.[/en]
 *   [ja]イベント名を指定します。[/ja]
 * @param {Function} listener
 *   [en]Function to execute when the event is triggered.[/en]
 *   [ja]イベントが発火した際に呼び出されるコールバックを指定します。[/ja]
 */

/**
 * @method off
 * @signature off(eventName, [listener])
 * @description
 *  [en]Remove an event listener. If the listener is not specified all listeners for the event type will be removed.[/en]
 *  [ja]イベントリスナーを削除します。もしlistenerパラメータが指定されなかった場合、そのイベントのリスナーが全て削除されます。[/ja]
 * @param {String} eventName
 *   [en]Name of the event.[/en]
 *   [ja]イベント名を指定します。[/ja]
 * @param {Function} listener
 *   [en]Function to execute when the event is triggered.[/en]
 *   [ja]削除するイベントリスナーの関数オブジェクトを渡します。[/ja]
 */

(function () {
  angular.module('onsen').directive('onsActionSheet', ['$onsen', 'ActionSheetView', function ($onsen, ActionSheetView) {
    return {
      restrict: 'E',
      replace: false,
      scope: true,
      transclude: false,

      compile: function compile(element, attrs) {

        return {
          pre: function pre(scope, element, attrs) {
            var actionSheet = new ActionSheetView(scope, element, attrs);

            $onsen.declareVarAttribute(attrs, actionSheet);
            $onsen.registerEventHandlers(actionSheet, 'preshow prehide postshow posthide destroy');
            $onsen.addModifierMethodsForCustomElements(actionSheet, element);

            element.data('ons-action-sheet', actionSheet);

            scope.$on('$destroy', function () {
              actionSheet._events = undefined;
              $onsen.removeModifierMethods(actionSheet);
              element.data('ons-action-sheet', undefined);
              element = null;
            });
          },
          post: function post(scope, element) {
            $onsen.fireComponentEvent(element[0], 'init');
          }
        };
      }
    };
  }]);
})();

/**
 * @element ons-alert-dialog
 */

/**
 * @attribute var
 * @initonly
 * @type {String}
 * @description
 *  [en]Variable name to refer this alert dialog.[/en]
 *  [ja]このアラートダイアログを参照するための名前を指定します。[/ja]
 */

/**
 * @attribute ons-preshow
 * @initonly
 * @type {Expression}
 * @description
 *  [en]Allows you to specify custom behavior when the "preshow" event is fired.[/en]
 *  [ja]"preshow"イベントが発火された時の挙動を独自に指定できます。[/ja]
 */

/**
 * @attribute ons-prehide
 * @initonly
 * @type {Expression}
 * @description
 *  [en]Allows you to specify custom behavior when the "prehide" event is fired.[/en]
 *  [ja]"prehide"イベントが発火された時の挙動を独自に指定できます。[/ja]
 */

/**
 * @attribute ons-postshow
 * @initonly
 * @type {Expression}
 * @description
 *  [en]Allows you to specify custom behavior when the "postshow" event is fired.[/en]
 *  [ja]"postshow"イベントが発火された時の挙動を独自に指定できます。[/ja]
 */

/**
 * @attribute ons-posthide
 * @initonly
 * @type {Expression}
 * @description
 *  [en]Allows you to specify custom behavior when the "posthide" event is fired.[/en]
 *  [ja]"posthide"イベントが発火された時の挙動を独自に指定できます。[/ja]
 */

/**
 * @attribute ons-destroy
 * @initonly
 * @type {Expression}
 * @description
 *  [en]Allows you to specify custom behavior when the "destroy" event is fired.[/en]
 *  [ja]"destroy"イベントが発火された時の挙動を独自に指定できます。[/ja]
 */

/**
 * @method on
 * @signature on(eventName, listener)
 * @description
 *   [en]Add an event listener.[/en]
 *   [ja]イベントリスナーを追加します。[/ja]
 * @param {String} eventName
 *   [en]Name of the event.[/en]
 *   [ja]イベント名を指定します。[/ja]
 * @param {Function} listener
 *   [en]Function to execute when the event is triggered.[/en]
 *   [ja]イベントが発火された際に呼び出されるコールバックを指定します。[/ja]
 */

/**
 * @method once
 * @signature once(eventName, listener)
 * @description
 *  [en]Add an event listener that's only triggered once.[/en]
 *  [ja]一度だけ呼び出されるイベントリスナーを追加します。[/ja]
 * @param {String} eventName
 *   [en]Name of the event.[/en]
 *   [ja]イベント名を指定します。[/ja]
 * @param {Function} listener
 *   [en]Function to execute when the event is triggered.[/en]
 *   [ja]イベントが発火した際に呼び出されるコールバックを指定します。[/ja]
 */

/**
 * @method off
 * @signature off(eventName, [listener])
 * @description
 *  [en]Remove an event listener. If the listener is not specified all listeners for the event type will be removed.[/en]
 *  [ja]イベントリスナーを削除します。もしlistenerパラメータが指定されなかった場合、そのイベントのリスナーが全て削除されます。[/ja]
 * @param {String} eventName
 *   [en]Name of the event.[/en]
 *   [ja]イベント名を指定します。[/ja]
 * @param {Function} listener
 *   [en]Function to execute when the event is triggered.[/en]
 *   [ja]削除するイベントリスナーの関数オブジェクトを渡します。[/ja]
 */

(function () {
  angular.module('onsen').directive('onsAlertDialog', ['$onsen', 'AlertDialogView', function ($onsen, AlertDialogView) {
    return {
      restrict: 'E',
      replace: false,
      scope: true,
      transclude: false,

      compile: function compile(element, attrs) {

        return {
          pre: function pre(scope, element, attrs) {
            var alertDialog = new AlertDialogView(scope, element, attrs);

            $onsen.declareVarAttribute(attrs, alertDialog);
            $onsen.registerEventHandlers(alertDialog, 'preshow prehide postshow posthide destroy');
            $onsen.addModifierMethodsForCustomElements(alertDialog, element);

            element.data('ons-alert-dialog', alertDialog);
            element.data('_scope', scope);

            scope.$on('$destroy', function () {
              alertDialog._events = undefined;
              $onsen.removeModifierMethods(alertDialog);
              element.data('ons-alert-dialog', undefined);
              element = null;
            });
          },
          post: function post(scope, element) {
            $onsen.fireComponentEvent(element[0], 'init');
          }
        };
      }
    };
  }]);
})();

(function () {
  var module = angular.module('onsen');

  module.directive('onsBackButton', ['$onsen', '$compile', 'GenericView', 'ComponentCleaner', function ($onsen, $compile, GenericView, ComponentCleaner) {
    return {
      restrict: 'E',
      replace: false,

      compile: function compile(element, attrs) {

        return {
          pre: function pre(scope, element, attrs, controller, transclude) {
            var backButton = GenericView.register(scope, element, attrs, {
              viewKey: 'ons-back-button'
            });

            if (attrs.ngClick) {
              element[0].onClick = angular.noop;
            }

            scope.$on('$destroy', function () {
              backButton._events = undefined;
              $onsen.removeModifierMethods(backButton);
              element = null;
            });

            ComponentCleaner.onDestroy(scope, function () {
              ComponentCleaner.destroyScope(scope);
              ComponentCleaner.destroyAttributes(attrs);
              element = scope = attrs = null;
            });
          },
          post: function post(scope, element) {
            $onsen.fireComponentEvent(element[0], 'init');
          }
        };
      }
    };
  }]);
})();

(function () {
  angular.module('onsen').directive('onsBottomToolbar', ['$onsen', 'GenericView', function ($onsen, GenericView) {
    return {
      restrict: 'E',
      link: {
        pre: function pre(scope, element, attrs) {
          GenericView.register(scope, element, attrs, {
            viewKey: 'ons-bottomToolbar'
          });
        },

        post: function post(scope, element, attrs) {
          $onsen.fireComponentEvent(element[0], 'init');
        }
      }
    };
  }]);
})();

/**
 * @element ons-button
 */

(function () {
  angular.module('onsen').directive('onsButton', ['$onsen', 'GenericView', function ($onsen, GenericView) {
    return {
      restrict: 'E',
      link: function link(scope, element, attrs) {
        var button = GenericView.register(scope, element, attrs, {
          viewKey: 'ons-button'
        });

        Object.defineProperty(button, 'disabled', {
          get: function get() {
            return this._element[0].disabled;
          },
          set: function set(value) {
            return this._element[0].disabled = value;
          }
        });
        $onsen.fireComponentEvent(element[0], 'init');
      }
    };
  }]);
})();

(function () {
  angular.module('onsen').directive('onsCard', ['$onsen', 'GenericView', function ($onsen, GenericView) {
    return {
      restrict: 'E',
      link: function link(scope, element, attrs) {
        GenericView.register(scope, element, attrs, { viewKey: 'ons-card' });
        $onsen.fireComponentEvent(element[0], 'init');
      }
    };
  }]);
})();

/**
 * @element ons-carousel
 * @description
 *   [en]Carousel component.[/en]
 *   [ja]カルーセルを表示できるコンポーネント。[/ja]
 * @codepen xbbzOQ
 * @guide UsingCarousel
 *   [en]Learn how to use the carousel component.[/en]
 *   [ja]carouselコンポーネントの使い方[/ja]
 * @example
 * <ons-carousel style="width: 100%; height: 200px">
 *   <ons-carousel-item>
 *    ...
 *   </ons-carousel-item>
 *   <ons-carousel-item>
 *    ...
 *   </ons-carousel-item>
 * </ons-carousel>
 */

/**
 * @attribute var
 * @initonly
 * @type {String}
 * @description
 *   [en]Variable name to refer this carousel.[/en]
 *   [ja]このカルーセルを参照するための変数名を指定します。[/ja]
 */

/**
 * @attribute ons-postchange
 * @initonly
 * @type {Expression}
 * @description
 *  [en]Allows you to specify custom behavior when the "postchange" event is fired.[/en]
 *  [ja]"postchange"イベントが発火された時の挙動を独自に指定できます。[/ja]
 */

/**
 * @attribute ons-refresh
 * @initonly
 * @type {Expression}
 * @description
 *  [en]Allows you to specify custom behavior when the "refresh" event is fired.[/en]
 *  [ja]"refresh"イベントが発火された時の挙動を独自に指定できます。[/ja]
 */

/**
 * @attribute ons-overscroll
 * @initonly
 * @type {Expression}
 * @description
 *  [en]Allows you to specify custom behavior when the "overscroll" event is fired.[/en]
 *  [ja]"overscroll"イベントが発火された時の挙動を独自に指定できます。[/ja]
 */

/**
 * @attribute ons-destroy
 * @initonly
 * @type {Expression}
 * @description
 *  [en]Allows you to specify custom behavior when the "destroy" event is fired.[/en]
 *  [ja]"destroy"イベントが発火された時の挙動を独自に指定できます。[/ja]
 */

/**
 * @method once
 * @signature once(eventName, listener)
 * @description
 *  [en]Add an event listener that's only triggered once.[/en]
 *  [ja]一度だけ呼び出されるイベントリスナを追加します。[/ja]
 * @param {String} eventName
 *   [en]Name of the event.[/en]
 *   [ja]イベント名を指定します。[/ja]
 * @param {Function} listener
 *   [en]Function to execute when the event is triggered.[/en]
 *   [ja]イベントが発火した際に呼び出される関数オブジェクトを指定します。[/ja]
 */

/**
 * @method off
 * @signature off(eventName, [listener])
 * @description
 *  [en]Remove an event listener. If the listener is not specified all listeners for the event type will be removed.[/en]
 *  [ja]イベントリスナーを削除します。もしイベントリスナーが指定されなかった場合には、そのイベントに紐付いているイベントリスナーが全て削除されます。[/ja]
 * @param {String} eventName
 *   [en]Name of the event.[/en]
 *   [ja]イベント名を指定します。[/ja]
 * @param {Function} listener
 *   [en]Function to execute when the event is triggered.[/en]
 *   [ja]イベントが発火した際に呼び出される関数オブジェクトを指定します。[/ja]
 */

/**
 * @method on
 * @signature on(eventName, listener)
 * @description
 *   [en]Add an event listener.[/en]
 *   [ja]イベントリスナーを追加します。[/ja]
 * @param {String} eventName
 *   [en]Name of the event.[/en]
 *   [ja]イベント名を指定します。[/ja]
 * @param {Function} listener
 *   [en]Function to execute when the event is triggered.[/en]
 *   [ja]イベントが発火した際に呼び出される関数オブジェクトを指定します。[/ja]
 */

(function () {
  var module = angular.module('onsen');

  module.directive('onsCarousel', ['$onsen', 'CarouselView', function ($onsen, CarouselView) {
    return {
      restrict: 'E',
      replace: false,

      // NOTE: This element must coexists with ng-controller.
      // Do not use isolated scope and template's ng-transclude.
      scope: false,
      transclude: false,

      compile: function compile(element, attrs) {

        return function (scope, element, attrs) {
          var carousel = new CarouselView(scope, element, attrs);

          element.data('ons-carousel', carousel);

          $onsen.registerEventHandlers(carousel, 'postchange refresh overscroll destroy');
          $onsen.declareVarAttribute(attrs, carousel);

          scope.$on('$destroy', function () {
            carousel._events = undefined;
            element.data('ons-carousel', undefined);
            element = null;
          });

          $onsen.fireComponentEvent(element[0], 'init');
        };
      }

    };
  }]);

  module.directive('onsCarouselItem', ['$onsen', function ($onsen) {
    return {
      restrict: 'E',
      compile: function compile(element, attrs) {
        return function (scope, element, attrs) {
          if (scope.$last) {
            var carousel = $onsen.util.findParent(element[0], 'ons-carousel');
            carousel._swiper.init({
              swipeable: carousel.hasAttribute('swipeable'),
              autoRefresh: carousel.hasAttribute('auto-refresh')
            });
          }
        };
      }
    };
  }]);
})();

/**
 * @element ons-checkbox
 */

(function () {
  angular.module('onsen').directive('onsCheckbox', ['$parse', function ($parse) {
    return {
      restrict: 'E',
      replace: false,
      scope: false,

      link: function link(scope, element, attrs) {
        var el = element[0];

        var onChange = function onChange() {
          $parse(attrs.ngModel).assign(scope, el.checked);
          attrs.ngChange && scope.$eval(attrs.ngChange);
          scope.$parent.$evalAsync();
        };

        if (attrs.ngModel) {
          scope.$watch(attrs.ngModel, function (value) {
            return el.checked = value;
          });
          element.on('change', onChange);
        }

        scope.$on('$destroy', function () {
          element.off('change', onChange);
          scope = element = attrs = el = null;
        });
      }
    };
  }]);
})();

/**
 * @element ons-dialog
 */

/**
 * @attribute var
 * @initonly
 * @type {String}
 * @description
 *  [en]Variable name to refer this dialog.[/en]
 *  [ja]このダイアログを参照するための名前を指定します。[/ja]
 */

/**
 * @attribute ons-preshow
 * @initonly
 * @type {Expression}
 * @description
 *  [en]Allows you to specify custom behavior when the "preshow" event is fired.[/en]
 *  [ja]"preshow"イベントが発火された時の挙動を独自に指定できます。[/ja]
 */

/**
 * @attribute ons-prehide
 * @initonly
 * @type {Expression}
 * @description
 *  [en]Allows you to specify custom behavior when the "prehide" event is fired.[/en]
 *  [ja]"prehide"イベントが発火された時の挙動を独自に指定できます。[/ja]
 */

/**
 * @attribute ons-postshow
 * @initonly
 * @type {Expression}
 * @description
 *  [en]Allows you to specify custom behavior when the "postshow" event is fired.[/en]
 *  [ja]"postshow"イベントが発火された時の挙動を独自に指定できます。[/ja]
 */

/**
 * @attribute ons-posthide
 * @initonly
 * @type {Expression}
 * @description
 *  [en]Allows you to specify custom behavior when the "posthide" event is fired.[/en]
 *  [ja]"posthide"イベントが発火された時の挙動を独自に指定できます。[/ja]
 */

/**
 * @attribute ons-destroy
 * @initonly
 * @type {Expression}
 * @description
 *  [en]Allows you to specify custom behavior when the "destroy" event is fired.[/en]
 *  [ja]"destroy"イベントが発火された時の挙動を独自に指定できます。[/ja]
 */

/**
 * @method on
 * @signature on(eventName, listener)
 * @description
 *   [en]Add an event listener.[/en]
 *   [ja]イベントリスナーを追加します。[/ja]
 * @param {String} eventName
 *   [en]Name of the event.[/en]
 *   [ja]イベント名を指定します。[/ja]
 * @param {Function} listener
 *   [en]Function to execute when the event is triggered.[/en]
 *   [ja]イベントが発火した際に呼び出される関数オブジェクトを指定します。[/ja]
 */

/**
 * @method once
 * @signature once(eventName, listener)
 * @description
 *  [en]Add an event listener that's only triggered once.[/en]
 *  [ja]一度だけ呼び出されるイベントリスナを追加します。[/ja]
 * @param {String} eventName
 *   [en]Name of the event.[/en]
 *   [ja]イベント名を指定します。[/ja]
 * @param {Function} listener
 *   [en]Function to execute when the event is triggered.[/en]
 *   [ja]イベントが発火した際に呼び出される関数オブジェクトを指定します。[/ja]
 */

/**
 * @method off
 * @signature off(eventName, [listener])
 * @description
 *  [en]Remove an event listener. If the listener is not specified all listeners for the event type will be removed.[/en]
 *  [ja]イベントリスナーを削除します。もしイベントリスナーが指定されなかった場合には、そのイベントに紐付いているイベントリスナーが全て削除されます。[/ja]
 * @param {String} eventName
 *   [en]Name of the event.[/en]
 *   [ja]イベント名を指定します。[/ja]
 * @param {Function} listener
 *   [en]Function to execute when the event is triggered.[/en]
 *   [ja]イベントが発火した際に呼び出される関数オブジェクトを指定します。[/ja]
 */
(function () {
  angular.module('onsen').directive('onsDialog', ['$onsen', 'DialogView', function ($onsen, DialogView) {
    return {
      restrict: 'E',
      scope: true,
      compile: function compile(element, attrs) {

        return {
          pre: function pre(scope, element, attrs) {

            var dialog = new DialogView(scope, element, attrs);
            $onsen.declareVarAttribute(attrs, dialog);
            $onsen.registerEventHandlers(dialog, 'preshow prehide postshow posthide destroy');
            $onsen.addModifierMethodsForCustomElements(dialog, element);

            element.data('ons-dialog', dialog);
            scope.$on('$destroy', function () {
              dialog._events = undefined;
              $onsen.removeModifierMethods(dialog);
              element.data('ons-dialog', undefined);
              element = null;
            });
          },

          post: function post(scope, element) {
            $onsen.fireComponentEvent(element[0], 'init');
          }
        };
      }
    };
  }]);
})();

(function () {
  var module = angular.module('onsen');

  module.directive('onsDummyForInit', ['$rootScope', function ($rootScope) {
    var isReady = false;

    return {
      restrict: 'E',
      replace: false,

      link: {
        post: function post(scope, element) {
          if (!isReady) {
            isReady = true;
            $rootScope.$broadcast('$ons-ready');
          }
          element.remove();
        }
      }
    };
  }]);
})();

/**
 * @element ons-fab
 */

/**
 * @attribute var
 * @initonly
 * @type {String}
 * @description
 *   [en]Variable name to refer the floating action button.[/en]
 *   [ja]このフローティングアクションボタンを参照するための変数名をしてします。[/ja]
 */

(function () {
  var module = angular.module('onsen');

  module.directive('onsFab', ['$onsen', 'FabView', function ($onsen, FabView) {
    return {
      restrict: 'E',
      replace: false,
      scope: false,
      transclude: false,

      compile: function compile(element, attrs) {

        return function (scope, element, attrs) {
          var fab = new FabView(scope, element, attrs);

          element.data('ons-fab', fab);

          $onsen.declareVarAttribute(attrs, fab);

          scope.$on('$destroy', function () {
            element.data('ons-fab', undefined);
            element = null;
          });

          $onsen.fireComponentEvent(element[0], 'init');
        };
      }

    };
  }]);
})();

(function () {
  var EVENTS = ('drag dragleft dragright dragup dragdown hold release swipe swipeleft swiperight ' + 'swipeup swipedown tap doubletap touch transform pinch pinchin pinchout rotate').split(/ +/);

  angular.module('onsen').directive('onsGestureDetector', ['$onsen', function ($onsen) {

    var scopeDef = EVENTS.reduce(function (dict, name) {
      dict['ng' + titlize(name)] = '&';
      return dict;
    }, {});

    function titlize(str) {
      return str.charAt(0).toUpperCase() + str.slice(1);
    }

    return {
      restrict: 'E',
      scope: scopeDef,

      // NOTE: This element must coexists with ng-controller.
      // Do not use isolated scope and template's ng-transclude.
      replace: false,
      transclude: true,

      compile: function compile(element, attrs) {
        return function link(scope, element, attrs, _, transclude) {

          transclude(scope.$parent, function (cloned) {
            element.append(cloned);
          });

          var handler = function handler(event) {
            var attr = 'ng' + titlize(event.type);

            if (attr in scopeDef) {
              scope[attr]({ $event: event });
            }
          };

          var gestureDetector;

          setImmediate(function () {
            gestureDetector = element[0]._gestureDetector;
            gestureDetector.on(EVENTS.join(' '), handler);
          });

          $onsen.cleaner.onDestroy(scope, function () {
            gestureDetector.off(EVENTS.join(' '), handler);
            $onsen.clearComponent({
              scope: scope,
              element: element,
              attrs: attrs
            });
            gestureDetector.element = scope = element = attrs = null;
          });

          $onsen.fireComponentEvent(element[0], 'init');
        };
      }
    };
  }]);
})();

/**
 * @element ons-icon
 */

(function () {
  angular.module('onsen').directive('onsIcon', ['$onsen', 'GenericView', function ($onsen, GenericView) {
    return {
      restrict: 'E',

      compile: function compile(element, attrs) {

        if (attrs.icon.indexOf('{{') !== -1) {
          attrs.$observe('icon', function () {
            setImmediate(function () {
              return element[0]._update();
            });
          });
        }

        return function (scope, element, attrs) {
          GenericView.register(scope, element, attrs, {
            viewKey: 'ons-icon'
          });
          // $onsen.fireComponentEvent(element[0], 'init');
        };
      }

    };
  }]);
})();

/**
 * @element ons-if-orientation
 * @category conditional
 * @description
 *   [en]Conditionally display content depending on screen orientation. Valid values are portrait and landscape. Different from other components, this component is used as attribute in any element.[/en]
 *   [ja]画面の向きに応じてコンテンツの制御を行います。portraitもしくはlandscapeを指定できます。すべての要素の属性に使用できます。[/ja]
 * @seealso ons-if-platform [en]ons-if-platform component[/en][ja]ons-if-platformコンポーネント[/ja]
 * @example
 * <div ons-if-orientation="portrait">
 *   <p>This will only be visible in portrait mode.</p>
 * </div>
 */

/**
 * @attribute ons-if-orientation
 * @initonly
 * @type {String}
 * @description
 *   [en]Either "portrait" or "landscape".[/en]
 *   [ja]portraitもしくはlandscapeを指定します。[/ja]
 */

(function () {
  var module = angular.module('onsen');

  module.directive('onsIfOrientation', ['$onsen', '$onsGlobal', function ($onsen, $onsGlobal) {
    return {
      restrict: 'A',
      replace: false,

      // NOTE: This element must coexists with ng-controller.
      // Do not use isolated scope and template's ng-transclude.
      transclude: false,
      scope: false,

      compile: function compile(element) {
        element.css('display', 'none');

        return function (scope, element, attrs) {
          attrs.$observe('onsIfOrientation', update);
          $onsGlobal.orientation.on('change', update);

          update();

          $onsen.cleaner.onDestroy(scope, function () {
            $onsGlobal.orientation.off('change', update);

            $onsen.clearComponent({
              element: element,
              scope: scope,
              attrs: attrs
            });
            element = scope = attrs = null;
          });

          function update() {
            var userOrientation = ('' + attrs.onsIfOrientation).toLowerCase();
            var orientation = getLandscapeOrPortrait();

            if (userOrientation === 'portrait' || userOrientation === 'landscape') {
              if (userOrientation === orientation) {
                element.css('display', '');
              } else {
                element.css('display', 'none');
              }
            }
          }

          function getLandscapeOrPortrait() {
            return $onsGlobal.orientation.isPortrait() ? 'portrait' : 'landscape';
          }
        };
      }
    };
  }]);
})();

/**
 * @element ons-if-platform
 * @category conditional
 * @description
 *    [en]Conditionally display content depending on the platform / browser. Valid values are "opera", "firefox", "safari", "chrome", "ie", "edge", "android", "blackberry", "ios" and "wp".[/en]
 *    [ja]プラットフォームやブラウザーに応じてコンテンツの制御をおこないます。opera, firefox, safari, chrome, ie, edge, android, blackberry, ios, wpのいずれかの値を空白区切りで複数指定できます。[/ja]
 * @seealso ons-if-orientation [en]ons-if-orientation component[/en][ja]ons-if-orientationコンポーネント[/ja]
 * @example
 * <div ons-if-platform="android">
 *   ...
 * </div>
 */

/**
 * @attribute ons-if-platform
 * @type {String}
 * @initonly
 * @description
 *   [en]One or multiple space separated values: "opera", "firefox", "safari", "chrome", "ie", "edge", "android", "blackberry", "ios" or "wp".[/en]
 *   [ja]"opera", "firefox", "safari", "chrome", "ie", "edge", "android", "blackberry", "ios", "wp"のいずれか空白区切りで複数指定できます。[/ja]
 */

(function () {
  var module = angular.module('onsen');

  module.directive('onsIfPlatform', ['$onsen', function ($onsen) {
    return {
      restrict: 'A',
      replace: false,

      // NOTE: This element must coexists with ng-controller.
      // Do not use isolated scope and template's ng-transclude.
      transclude: false,
      scope: false,

      compile: function compile(element) {
        element.css('display', 'none');

        var platform = getPlatformString();

        return function (scope, element, attrs) {
          attrs.$observe('onsIfPlatform', function (userPlatform) {
            if (userPlatform) {
              update();
            }
          });

          update();

          $onsen.cleaner.onDestroy(scope, function () {
            $onsen.clearComponent({
              element: element,
              scope: scope,
              attrs: attrs
            });
            element = scope = attrs = null;
          });

          function update() {
            var userPlatforms = attrs.onsIfPlatform.toLowerCase().trim().split(/\s+/);
            if (userPlatforms.indexOf(platform.toLowerCase()) >= 0) {
              element.css('display', 'block');
            } else {
              element.css('display', 'none');
            }
          }
        };

        function getPlatformString() {

          if (navigator.userAgent.match(/Android/i)) {
            return 'android';
          }

          if (navigator.userAgent.match(/BlackBerry/i) || navigator.userAgent.match(/RIM Tablet OS/i) || navigator.userAgent.match(/BB10/i)) {
            return 'blackberry';
          }

          if (navigator.userAgent.match(/iPhone|iPad|iPod/i)) {
            return 'ios';
          }

          if (navigator.userAgent.match(/Windows Phone|IEMobile|WPDesktop/i)) {
            return 'wp';
          }

          // Opera 8.0+ (UA detection to detect Blink/v8-powered Opera)
          var isOpera = !!window.opera || navigator.userAgent.indexOf(' OPR/') >= 0;
          if (isOpera) {
            return 'opera';
          }

          var isFirefox = typeof InstallTrigger !== 'undefined'; // Firefox 1.0+
          if (isFirefox) {
            return 'firefox';
          }

          var isSafari = Object.prototype.toString.call(window.HTMLElement).indexOf('Constructor') > 0;
          // At least Safari 3+: "[object HTMLElementConstructor]"
          if (isSafari) {
            return 'safari';
          }

          var isEdge = navigator.userAgent.indexOf(' Edge/') >= 0;
          if (isEdge) {
            return 'edge';
          }

          var isChrome = !!window.chrome && !isOpera && !isEdge; // Chrome 1+
          if (isChrome) {
            return 'chrome';
          }

          var isIE = /*@cc_on!@*/false || !!document.documentMode; // At least IE6
          if (isIE) {
            return 'ie';
          }

          return 'unknown';
        }
      }
    };
  }]);
})();

/**
 * @element ons-input
 */

(function () {
  angular.module('onsen').directive('onsInput', ['$parse', function ($parse) {
    return {
      restrict: 'E',
      replace: false,
      scope: false,

      link: function link(scope, element, attrs) {
        var el = element[0];

        var onInput = function onInput() {
          $parse(attrs.ngModel).assign(scope, el.type === 'number' ? Number(el.value) : el.value);
          attrs.ngChange && scope.$eval(attrs.ngChange);
          scope.$parent.$evalAsync();
        };

        if (attrs.ngModel) {
          scope.$watch(attrs.ngModel, function (value) {
            if (typeof value !== 'undefined' && value !== el.value) {
              el.value = value;
            }
          });

          element.on('input', onInput);
        }

        scope.$on('$destroy', function () {
          element.off('input', onInput);
          scope = element = attrs = el = null;
        });
      }
    };
  }]);
})();

/**
 * @element ons-keyboard-active
 * @category form
 * @description
 *   [en]
 *     Conditionally display content depending on if the software keyboard is visible or hidden.
 *     This component requires cordova and that the com.ionic.keyboard plugin is installed.
 *   [/en]
 *   [ja]
 *     ソフトウェアキーボードが表示されているかどうかで、コンテンツを表示するかどうかを切り替えることが出来ます。
 *     このコンポーネントは、Cordovaやcom.ionic.keyboardプラグインを必要とします。
 *   [/ja]
 * @example
 * <div ons-keyboard-active>
 *   This will only be displayed if the software keyboard is open.
 * </div>
 * <div ons-keyboard-inactive>
 *   There is also a component that does the opposite.
 * </div>
 */

/**
 * @attribute ons-keyboard-active
 * @description
 *   [en]The content of tags with this attribute will be visible when the software keyboard is open.[/en]
 *   [ja]この属性がついた要素は、ソフトウェアキーボードが表示された時に初めて表示されます。[/ja]
 */

/**
 * @attribute ons-keyboard-inactive
 * @description
 *   [en]The content of tags with this attribute will be visible when the software keyboard is hidden.[/en]
 *   [ja]この属性がついた要素は、ソフトウェアキーボードが隠れている時のみ表示されます。[/ja]
 */

(function () {
  var module = angular.module('onsen');

  var compileFunction = function compileFunction(show, $onsen) {
    return function (element) {
      return function (scope, element, attrs) {
        var dispShow = show ? 'block' : 'none',
            dispHide = show ? 'none' : 'block';

        var onShow = function onShow() {
          element.css('display', dispShow);
        };

        var onHide = function onHide() {
          element.css('display', dispHide);
        };

        var onInit = function onInit(e) {
          if (e.visible) {
            onShow();
          } else {
            onHide();
          }
        };

        ons.softwareKeyboard.on('show', onShow);
        ons.softwareKeyboard.on('hide', onHide);
        ons.softwareKeyboard.on('init', onInit);

        if (ons.softwareKeyboard._visible) {
          onShow();
        } else {
          onHide();
        }

        $onsen.cleaner.onDestroy(scope, function () {
          ons.softwareKeyboard.off('show', onShow);
          ons.softwareKeyboard.off('hide', onHide);
          ons.softwareKeyboard.off('init', onInit);

          $onsen.clearComponent({
            element: element,
            scope: scope,
            attrs: attrs
          });
          element = scope = attrs = null;
        });
      };
    };
  };

  module.directive('onsKeyboardActive', ['$onsen', function ($onsen) {
    return {
      restrict: 'A',
      replace: false,
      transclude: false,
      scope: false,
      compile: compileFunction(true, $onsen)
    };
  }]);

  module.directive('onsKeyboardInactive', ['$onsen', function ($onsen) {
    return {
      restrict: 'A',
      replace: false,
      transclude: false,
      scope: false,
      compile: compileFunction(false, $onsen)
    };
  }]);
})();

/**
 * @element ons-lazy-repeat
 * @description
 *   [en]
 *     Using this component a list with millions of items can be rendered without a drop in performance.
 *     It does that by "lazily" loading elements into the DOM when they come into view and
 *     removing items from the DOM when they are not visible.
 *   [/en]
 *   [ja]
 *     このコンポーネント内で描画されるアイテムのDOM要素の読み込みは、画面に見えそうになった時まで自動的に遅延され、
 *     画面から見えなくなった場合にはその要素は動的にアンロードされます。
 *     このコンポーネントを使うことで、パフォーマンスを劣化させること無しに巨大な数の要素を描画できます。
 *   [/ja]
 * @codepen QwrGBm
 * @guide UsingLazyRepeat
 *   [en]How to use Lazy Repeat[/en]
 *   [ja]レイジーリピートの使い方[/ja]
 * @example
 * <script>
 *   ons.bootstrap()
 *
 *   .controller('MyController', function($scope) {
 *     $scope.MyDelegate = {
 *       countItems: function() {
 *         // Return number of items.
 *         return 1000000;
 *       },
 *
 *       calculateItemHeight: function(index) {
 *         // Return the height of an item in pixels.
 *         return 45;
 *       },
 *
 *       configureItemScope: function(index, itemScope) {
 *         // Initialize scope
 *         itemScope.item = 'Item #' + (index + 1);
 *       },
 *
 *       destroyItemScope: function(index, itemScope) {
 *         // Optional method that is called when an item is unloaded.
 *         console.log('Destroyed item with index: ' + index);
 *       }
 *     };
 *   });
 * </script>
 *
 * <ons-list ng-controller="MyController">
 *   <ons-list-item ons-lazy-repeat="MyDelegate">
 *     {{ item }}
 *   </ons-list-item>
 * </ons-list>
 */

/**
 * @attribute ons-lazy-repeat
 * @type {Expression}
 * @initonly
 * @description
 *  [en]A delegate object, can be either an object attached to the scope (when using AngularJS) or a normal JavaScript variable.[/en]
 *  [ja]要素のロード、アンロードなどの処理を委譲するオブジェクトを指定します。AngularJSのスコープの変数名や、通常のJavaScriptの変数名を指定します。[/ja]
 */

/**
 * @property delegate.configureItemScope
 * @type {Function}
 * @description
 *   [en]Function which recieves an index and the scope for the item. Can be used to configure values in the item scope.[/en]
 *   [ja][/ja]
 */

(function () {
  var module = angular.module('onsen');

  /**
   * Lazy repeat directive.
   */
  module.directive('onsLazyRepeat', ['$onsen', 'LazyRepeatView', function ($onsen, LazyRepeatView) {
    return {
      restrict: 'A',
      replace: false,
      priority: 1000,
      terminal: true,

      compile: function compile(element, attrs) {
        return function (scope, element, attrs) {
          var lazyRepeat = new LazyRepeatView(scope, element, attrs);

          scope.$on('$destroy', function () {
            scope = element = attrs = lazyRepeat = null;
          });
        };
      }
    };
  }]);
})();

(function () {
  angular.module('onsen').directive('onsListHeader', ['$onsen', 'GenericView', function ($onsen, GenericView) {
    return {
      restrict: 'E',
      link: function link(scope, element, attrs) {
        GenericView.register(scope, element, attrs, { viewKey: 'ons-list-header' });
        $onsen.fireComponentEvent(element[0], 'init');
      }
    };
  }]);
})();

(function () {
  angular.module('onsen').directive('onsListItem', ['$onsen', 'GenericView', function ($onsen, GenericView) {
    return {
      restrict: 'E',
      link: function link(scope, element, attrs) {
        GenericView.register(scope, element, attrs, { viewKey: 'ons-list-item' });
        $onsen.fireComponentEvent(element[0], 'init');
      }
    };
  }]);
})();

(function () {
  angular.module('onsen').directive('onsList', ['$onsen', 'GenericView', function ($onsen, GenericView) {
    return {
      restrict: 'E',
      link: function link(scope, element, attrs) {
        GenericView.register(scope, element, attrs, { viewKey: 'ons-list' });
        $onsen.fireComponentEvent(element[0], 'init');
      }
    };
  }]);
})();

(function () {
  angular.module('onsen').directive('onsListTitle', ['$onsen', 'GenericView', function ($onsen, GenericView) {
    return {
      restrict: 'E',
      link: function link(scope, element, attrs) {
        GenericView.register(scope, element, attrs, { viewKey: 'ons-list-title' });
        $onsen.fireComponentEvent(element[0], 'init');
      }
    };
  }]);
})();

/**
 * @element ons-loading-placeholder
 * @category util
 * @description
 *   [en]Display a placeholder while the content is loading.[/en]
 *   [ja]Onsen UIが読み込まれるまでに表示するプレースホルダーを表現します。[/ja]
 * @example
 * <div ons-loading-placeholder="page.html">
 *   Loading...
 * </div>
 */

/**
 * @attribute ons-loading-placeholder
 * @initonly
 * @type {String}
 * @description
 *   [en]The url of the page to load.[/en]
 *   [ja]読み込むページのURLを指定します。[/ja]
 */

(function () {
  angular.module('onsen').directive('onsLoadingPlaceholder', function () {
    return {
      restrict: 'A',
      link: function link(scope, element, attrs) {
        if (attrs.onsLoadingPlaceholder) {
          ons._resolveLoadingPlaceholder(element[0], attrs.onsLoadingPlaceholder, function (contentElement, done) {
            ons.compile(contentElement);
            scope.$evalAsync(function () {
              setImmediate(done);
            });
          });
        }
      }
    };
  });
})();

/**
 * @element ons-modal
 */

/**
 * @attribute var
 * @type {String}
 * @initonly
 * @description
 *   [en]Variable name to refer this modal.[/en]
 *   [ja]このモーダルを参照するための名前を指定します。[/ja]
 */

/**
 * @attribute ons-preshow
 * @initonly
 * @type {Expression}
 * @description
 *  [en]Allows you to specify custom behavior when the "preshow" event is fired.[/en]
 *  [ja]"preshow"イベントが発火された時の挙動を独自に指定できます。[/ja]
 */

/**
 * @attribute ons-prehide
 * @initonly
 * @type {Expression}
 * @description
 *  [en]Allows you to specify custom behavior when the "prehide" event is fired.[/en]
 *  [ja]"prehide"イベントが発火された時の挙動を独自に指定できます。[/ja]
 */

/**
 * @attribute ons-postshow
 * @initonly
 * @type {Expression}
 * @description
 *  [en]Allows you to specify custom behavior when the "postshow" event is fired.[/en]
 *  [ja]"postshow"イベントが発火された時の挙動を独自に指定できます。[/ja]
 */

/**
 * @attribute ons-posthide
 * @initonly
 * @type {Expression}
 * @description
 *  [en]Allows you to specify custom behavior when the "posthide" event is fired.[/en]
 *  [ja]"posthide"イベントが発火された時の挙動を独自に指定できます。[/ja]
 */

/**
 * @attribute ons-destroy
 * @initonly
 * @type {Expression}
 * @description
 *  [en]Allows you to specify custom behavior when the "destroy" event is fired.[/en]
 *  [ja]"destroy"イベントが発火された時の挙動を独自に指定できます。[/ja]
 */

(function () {
  angular.module('onsen').directive('onsModal', ['$onsen', 'ModalView', function ($onsen, ModalView) {
    return {
      restrict: 'E',
      replace: false,

      // NOTE: This element must coexists with ng-controller.
      // Do not use isolated scope and template's ng-transclude.
      scope: false,
      transclude: false,

      compile: function compile(element, attrs) {

        return {
          pre: function pre(scope, element, attrs) {
            var modal = new ModalView(scope, element, attrs);
            $onsen.addModifierMethodsForCustomElements(modal, element);

            $onsen.declareVarAttribute(attrs, modal);
            $onsen.registerEventHandlers(modal, 'preshow prehide postshow posthide destroy');
            element.data('ons-modal', modal);

            scope.$on('$destroy', function () {
              $onsen.removeModifierMethods(modal);
              element.data('ons-modal', undefined);
              modal = element = scope = attrs = null;
            });
          },

          post: function post(scope, element) {
            $onsen.fireComponentEvent(element[0], 'init');
          }
        };
      }
    };
  }]);
})();

/**
 * @element ons-navigator
 * @example
 * <ons-navigator animation="slide" var="app.navi">
 *   <ons-page>
 *     <ons-toolbar>
 *       <div class="center">Title</div>
 *     </ons-toolbar>
 *
 *     <p style="text-align: center">
 *       <ons-button modifier="light" ng-click="app.navi.pushPage('page.html');">Push</ons-button>
 *     </p>
 *   </ons-page>
 * </ons-navigator>
 *
 * <ons-template id="page.html">
 *   <ons-page>
 *     <ons-toolbar>
 *       <div class="center">Title</div>
 *     </ons-toolbar>
 *
 *     <p style="text-align: center">
 *       <ons-button modifier="light" ng-click="app.navi.popPage();">Pop</ons-button>
 *     </p>
 *   </ons-page>
 * </ons-template>
 */

/**
 * @attribute var
 * @initonly
 * @type {String}
 * @description
 *  [en]Variable name to refer this navigator.[/en]
 *  [ja]このナビゲーターを参照するための名前を指定します。[/ja]
 */

/**
 * @attribute ons-prepush
 * @initonly
 * @type {Expression}
 * @description
 *  [en]Allows you to specify custom behavior when the "prepush" event is fired.[/en]
 *  [ja]"prepush"イベントが発火された時の挙動を独自に指定できます。[/ja]
 */

/**
 * @attribute ons-prepop
 * @initonly
 * @type {Expression}
 * @description
 *  [en]Allows you to specify custom behavior when the "prepop" event is fired.[/en]
 *  [ja]"prepop"イベントが発火された時の挙動を独自に指定できます。[/ja]
 */

/**
 * @attribute ons-postpush
 * @initonly
 * @type {Expression}
 * @description
 *  [en]Allows you to specify custom behavior when the "postpush" event is fired.[/en]
 *  [ja]"postpush"イベントが発火された時の挙動を独自に指定できます。[/ja]
 */

/**
 * @attribute ons-postpop
 * @initonly
 * @type {Expression}
 * @description
 *  [en]Allows you to specify custom behavior when the "postpop" event is fired.[/en]
 *  [ja]"postpop"イベントが発火された時の挙動を独自に指定できます。[/ja]
 */

/**
 * @attribute ons-init
 * @initonly
 * @type {Expression}
 * @description
 *  [en]Allows you to specify custom behavior when a page's "init" event is fired.[/en]
 *  [ja]ページの"init"イベントが発火された時の挙動を独自に指定できます。[/ja]
 */

/**
 * @attribute ons-show
 * @initonly
 * @type {Expression}
 * @description
 *  [en]Allows you to specify custom behavior when a page's "show" event is fired.[/en]
 *  [ja]ページの"show"イベントが発火された時の挙動を独自に指定できます。[/ja]
 */

/**
 * @attribute ons-hide
 * @initonly
 * @type {Expression}
 * @description
 *  [en]Allows you to specify custom behavior when a page's "hide" event is fired.[/en]
 *  [ja]ページの"hide"イベントが発火された時の挙動を独自に指定できます。[/ja]
 */

/**
 * @attribute ons-destroy
 * @initonly
 * @type {Expression}
 * @description
 *  [en]Allows you to specify custom behavior when a page's "destroy" event is fired.[/en]
 *  [ja]ページの"destroy"イベントが発火された時の挙動を独自に指定できます。[/ja]
 */

/**
 * @method on
 * @signature on(eventName, listener)
 * @description
 *   [en]Add an event listener.[/en]
 *   [ja]イベントリスナーを追加します。[/ja]
 * @param {String} eventName
 *   [en]Name of the event.[/en]
 *   [ja]イベント名を指定します。[/ja]
 * @param {Function} listener
 *   [en]Function to execute when the event is triggered.[/en]
 *   [ja]このイベントが発火された際に呼び出される関数オブジェクトを指定します。[/ja]
 */

/**
 * @method once
 * @signature once(eventName, listener)
 * @description
 *  [en]Add an event listener that's only triggered once.[/en]
 *  [ja]一度だけ呼び出されるイベントリスナーを追加します。[/ja]
 * @param {String} eventName
 *   [en]Name of the event.[/en]
 *   [ja]イベント名を指定します。[/ja]
 * @param {Function} listener
 *   [en]Function to execute when the event is triggered.[/en]
 *   [ja]イベントが発火した際に呼び出される関数オブジェクトを指定します。[/ja]
 */

/**
 * @method off
 * @signature off(eventName, [listener])
 * @description
 *  [en]Remove an event listener. If the listener is not specified all listeners for the event type will be removed.[/en]
 *  [ja]イベントリスナーを削除します。もしイベントリスナーを指定しなかった場合には、そのイベントに紐づく全てのイベントリスナーが削除されます。[/ja]
 * @param {String} eventName
 *   [en]Name of the event.[/en]
 *   [ja]イベント名を指定します。[/ja]
 * @param {Function} listener
 *   [en]Function to execute when the event is triggered.[/en]
 *   [ja]削除するイベントリスナーを指定します。[/ja]
 */

(function () {
  var lastReady = window.ons.elements.Navigator.rewritables.ready;
  window.ons.elements.Navigator.rewritables.ready = ons._waitDiretiveInit('ons-navigator', lastReady);

  angular.module('onsen').directive('onsNavigator', ['NavigatorView', '$onsen', function (NavigatorView, $onsen) {
    return {
      restrict: 'E',

      // NOTE: This element must coexists with ng-controller.
      // Do not use isolated scope and template's ng-transclude.
      transclude: false,
      scope: true,

      compile: function compile(element) {

        return {
          pre: function pre(scope, element, attrs, controller) {
            var view = new NavigatorView(scope, element, attrs);

            $onsen.declareVarAttribute(attrs, view);
            $onsen.registerEventHandlers(view, 'prepush prepop postpush postpop init show hide destroy');

            element.data('ons-navigator', view);

            element[0].pageLoader = $onsen.createPageLoader(view);

            scope.$on('$destroy', function () {
              view._events = undefined;
              element.data('ons-navigator', undefined);
              scope = element = null;
            });
          },
          post: function post(scope, element, attrs) {
            $onsen.fireComponentEvent(element[0], 'init');
          }
        };
      }
    };
  }]);
})();

/**
 * @element ons-page
 */

/**
 * @attribute var
 * @initonly
 * @type {String}
 * @description
 *   [en]Variable name to refer this page.[/en]
 *   [ja]このページを参照するための名前を指定します。[/ja]
 */

/**
 * @attribute ng-infinite-scroll
 * @initonly
 * @type {String}
 * @description
 *   [en]Path of the function to be executed on infinite scrolling. The path is relative to $scope. The function receives a done callback that must be called when it's finished.[/en]
 *   [ja][/ja]
 */

/**
 * @attribute on-device-back-button
 * @type {Expression}
 * @description
 *   [en]Allows you to specify custom behavior when the back button is pressed.[/en]
 *   [ja]デバイスのバックボタンが押された時の挙動を設定できます。[/ja]
 */

/**
 * @attribute ng-device-back-button
 * @initonly
 * @type {Expression}
 * @description
 *   [en]Allows you to specify custom behavior with an AngularJS expression when the back button is pressed.[/en]
 *   [ja]デバイスのバックボタンが押された時の挙動を設定できます。AngularJSのexpressionを指定できます。[/ja]
 */

/**
 * @attribute ons-init
 * @initonly
 * @type {Expression}
 * @description
 *  [en]Allows you to specify custom behavior when the "init" event is fired.[/en]
 *  [ja]"init"イベントが発火された時の挙動を独自に指定できます。[/ja]
 */

/**
 * @attribute ons-show
 * @initonly
 * @type {Expression}
 * @description
 *  [en]Allows you to specify custom behavior when the "show" event is fired.[/en]
 *  [ja]"show"イベントが発火された時の挙動を独自に指定できます。[/ja]
 */

/**
 * @attribute ons-hide
 * @initonly
 * @type {Expression}
 * @description
 *  [en]Allows you to specify custom behavior when the "hide" event is fired.[/en]
 *  [ja]"hide"イベントが発火された時の挙動を独自に指定できます。[/ja]
 */

/**
 * @attribute ons-destroy
 * @initonly
 * @type {Expression}
 * @description
 *  [en]Allows you to specify custom behavior when the "destroy" event is fired.[/en]
 *  [ja]"destroy"イベントが発火された時の挙動を独自に指定できます。[/ja]
 */

(function () {
  var module = angular.module('onsen');

  module.directive('onsPage', ['$onsen', 'PageView', function ($onsen, PageView) {

    function firePageInitEvent(element) {
      // TODO: remove dirty fix
      var i = 0,
          f = function f() {
        if (i++ < 15) {
          if (isAttached(element)) {
            $onsen.fireComponentEvent(element, 'init');
            fireActualPageInitEvent(element);
          } else {
            if (i > 10) {
              setTimeout(f, 1000 / 60);
            } else {
              setImmediate(f);
            }
          }
        } else {
          throw new Error('Fail to fire "pageinit" event. Attach "ons-page" element to the document after initialization.');
        }
      };

      f();
    }

    function fireActualPageInitEvent(element) {
      var event = document.createEvent('HTMLEvents');
      event.initEvent('pageinit', true, true);
      element.dispatchEvent(event);
    }

    function isAttached(element) {
      if (document.documentElement === element) {
        return true;
      }
      return element.parentNode ? isAttached(element.parentNode) : false;
    }

    return {
      restrict: 'E',

      // NOTE: This element must coexists with ng-controller.
      // Do not use isolated scope and template's ng-transclude.
      transclude: false,
      scope: true,

      compile: function compile(element, attrs) {
        return {
          pre: function pre(scope, element, attrs) {
            var page = new PageView(scope, element, attrs);

            $onsen.declareVarAttribute(attrs, page);
            $onsen.registerEventHandlers(page, 'init show hide destroy');

            element.data('ons-page', page);
            $onsen.addModifierMethodsForCustomElements(page, element);

            element.data('_scope', scope);

            $onsen.cleaner.onDestroy(scope, function () {
              page._events = undefined;
              $onsen.removeModifierMethods(page);
              element.data('ons-page', undefined);
              element.data('_scope', undefined);

              $onsen.clearComponent({
                element: element,
                scope: scope,
                attrs: attrs
              });
              scope = element = attrs = null;
            });
          },

          post: function postLink(scope, element, attrs) {
            firePageInitEvent(element[0]);
          }
        };
      }
    };
  }]);
})();

/**
 * @element ons-popover
 */

/**
 * @attribute var
 * @initonly
 * @type {String}
 * @description
 *  [en]Variable name to refer this popover.[/en]
 *  [ja]このポップオーバーを参照するための名前を指定します。[/ja]
 */

/**
 * @attribute ons-preshow
 * @initonly
 * @type {Expression}
 * @description
 *  [en]Allows you to specify custom behavior when the "preshow" event is fired.[/en]
 *  [ja]"preshow"イベントが発火された時の挙動を独自に指定できます。[/ja]
 */

/**
 * @attribute ons-prehide
 * @initonly
 * @type {Expression}
 * @description
 *  [en]Allows you to specify custom behavior when the "prehide" event is fired.[/en]
 *  [ja]"prehide"イベントが発火された時の挙動を独自に指定できます。[/ja]
 */

/**
 * @attribute ons-postshow
 * @initonly
 * @type {Expression}
 * @description
 *  [en]Allows you to specify custom behavior when the "postshow" event is fired.[/en]
 *  [ja]"postshow"イベントが発火された時の挙動を独自に指定できます。[/ja]
 */

/**
 * @attribute ons-posthide
 * @initonly
 * @type {Expression}
 * @description
 *  [en]Allows you to specify custom behavior when the "posthide" event is fired.[/en]
 *  [ja]"posthide"イベントが発火された時の挙動を独自に指定できます。[/ja]
 */

/**
 * @attribute ons-destroy
 * @initonly
 * @type {Expression}
 * @description
 *  [en]Allows you to specify custom behavior when the "destroy" event is fired.[/en]
 *  [ja]"destroy"イベントが発火された時の挙動を独自に指定できます。[/ja]
 */

/**
 * @method on
 * @signature on(eventName, listener)
 * @description
 *   [en]Add an event listener.[/en]
 *   [ja]イベントリスナーを追加します。[/ja]
 * @param {String} eventName
 *   [en]Name of the event.[/en]
 *   [ja]イベント名を指定します。[/ja]
 * @param {Function} listener
 *   [en]Function to execute when the event is triggered.[/en]
 *   [ja]このイベントが発火された際に呼び出される関数オブジェクトを指定します。[/ja]
 */

/**
 * @method once
 * @signature once(eventName, listener)
 * @description
 *  [en]Add an event listener that's only triggered once.[/en]
 *  [ja]一度だけ呼び出されるイベントリスナーを追加します。[/ja]
 * @param {String} eventName
 *   [en]Name of the event.[/en]
 *   [ja]イベント名を指定します。[/ja]
 * @param {Function} listener
 *   [en]Function to execute when the event is triggered.[/en]
 *   [ja]イベントが発火した際に呼び出される関数オブジェクトを指定します。[/ja]
 */

/**
 * @method off
 * @signature off(eventName, [listener])
 * @description
 *  [en]Remove an event listener. If the listener is not specified all listeners for the event type will be removed.[/en]
 *  [ja]イベントリスナーを削除します。もしイベントリスナーを指定しなかった場合には、そのイベントに紐づく全てのイベントリスナーが削除されます。[/ja]
 * @param {String} eventName
 *   [en]Name of the event.[/en]
 *   [ja]イベント名を指定します。[/ja]
 * @param {Function} listener
 *   [en]Function to execute when the event is triggered.[/en]
 *   [ja]削除するイベントリスナーを指定します。[/ja]
 */

(function () {
  var module = angular.module('onsen');

  module.directive('onsPopover', ['$onsen', 'PopoverView', function ($onsen, PopoverView) {
    return {
      restrict: 'E',
      replace: false,
      scope: true,
      compile: function compile(element, attrs) {
        return {
          pre: function pre(scope, element, attrs) {

            var popover = new PopoverView(scope, element, attrs);

            $onsen.declareVarAttribute(attrs, popover);
            $onsen.registerEventHandlers(popover, 'preshow prehide postshow posthide destroy');
            $onsen.addModifierMethodsForCustomElements(popover, element);

            element.data('ons-popover', popover);

            scope.$on('$destroy', function () {
              popover._events = undefined;
              $onsen.removeModifierMethods(popover);
              element.data('ons-popover', undefined);
              element = null;
            });
          },

          post: function post(scope, element) {
            $onsen.fireComponentEvent(element[0], 'init');
          }
        };
      }
    };
  }]);
})();

/**
 * @element ons-pull-hook
 * @example
 * <script>
 *   ons.bootstrap()
 *
 *   .controller('MyController', function($scope, $timeout) {
 *     $scope.items = [3, 2 ,1];
 *
 *     $scope.load = function($done) {
 *       $timeout(function() {
 *         $scope.items.unshift($scope.items.length + 1);
 *         $done();
 *       }, 1000);
 *     };
 *   });
 * </script>
 *
 * <ons-page ng-controller="MyController">
 *   <ons-pull-hook var="loader" ng-action="load($done)">
 *     <span ng-switch="loader.state">
 *       <span ng-switch-when="initial">Pull down to refresh</span>
 *       <span ng-switch-when="preaction">Release to refresh</span>
 *       <span ng-switch-when="action">Loading data. Please wait...</span>
 *     </span>
 *   </ons-pull-hook>
 *   <ons-list>
 *     <ons-list-item ng-repeat="item in items">
 *       Item #{{ item }}
 *     </ons-list-item>
 *   </ons-list>
 * </ons-page>
 */

/**
 * @attribute var
 * @initonly
 * @type {String}
 * @description
 *   [en]Variable name to refer this component.[/en]
 *   [ja]このコンポーネントを参照するための名前を指定します。[/ja]
 */

/**
 * @attribute ng-action
 * @initonly
 * @type {Expression}
 * @description
 *   [en]Use to specify custom behavior when the page is pulled down. A <code>$done</code> function is available to tell the component that the action is completed.[/en]
 *   [ja]pull downしたときの振る舞いを指定します。アクションが完了した時には<code>$done</code>関数を呼び出します。[/ja]
 */

/**
 * @attribute ons-changestate
 * @initonly
 * @type {Expression}
 * @description
 *  [en]Allows you to specify custom behavior when the "changestate" event is fired.[/en]
 *  [ja]"changestate"イベントが発火された時の挙動を独自に指定できます。[/ja]
 */

/**
 * @method on
 * @signature on(eventName, listener)
 * @description
 *   [en]Add an event listener.[/en]
 *   [ja]イベントリスナーを追加します。[/ja]
 * @param {String} eventName
 *   [en]Name of the event.[/en]
 *   [ja]イベント名を指定します。[/ja]
 * @param {Function} listener
 *   [en]Function to execute when the event is triggered.[/en]
 *   [ja]このイベントが発火された際に呼び出される関数オブジェクトを指定します。[/ja]
 */

/**
 * @method once
 * @signature once(eventName, listener)
 * @description
 *  [en]Add an event listener that's only triggered once.[/en]
 *  [ja]一度だけ呼び出されるイベントリスナーを追加します。[/ja]
 * @param {String} eventName
 *   [en]Name of the event.[/en]
 *   [ja]イベント名を指定します。[/ja]
 * @param {Function} listener
 *   [en]Function to execute when the event is triggered.[/en]
 *   [ja]イベントが発火した際に呼び出される関数オブジェクトを指定します。[/ja]
 */

/**
 * @method off
 * @signature off(eventName, [listener])
 * @description
 *  [en]Remove an event listener. If the listener is not specified all listeners for the event type will be removed.[/en]
 *  [ja]イベントリスナーを削除します。もしイベントリスナーを指定しなかった場合には、そのイベントに紐づく全てのイベントリスナーが削除されます。[/ja]
 * @param {String} eventName
 *   [en]Name of the event.[/en]
 *   [ja]イベント名を指定します。[/ja]
 * @param {Function} listener
 *   [en]Function to execute when the event is triggered.[/en]
 *   [ja]削除するイベントリスナーを指定します。[/ja]
 */

(function () {
  angular.module('onsen').directive('onsPullHook', ['$onsen', 'PullHookView', function ($onsen, PullHookView) {
    return {
      restrict: 'E',
      replace: false,
      scope: true,

      compile: function compile(element, attrs) {
        return {
          pre: function pre(scope, element, attrs) {
            var pullHook = new PullHookView(scope, element, attrs);

            $onsen.declareVarAttribute(attrs, pullHook);
            $onsen.registerEventHandlers(pullHook, 'changestate destroy');
            element.data('ons-pull-hook', pullHook);

            scope.$on('$destroy', function () {
              pullHook._events = undefined;
              element.data('ons-pull-hook', undefined);
              scope = element = attrs = null;
            });
          },
          post: function post(scope, element) {
            $onsen.fireComponentEvent(element[0], 'init');
          }
        };
      }
    };
  }]);
})();

/**
 * @element ons-radio
 */

(function () {
  angular.module('onsen').directive('onsRadio', ['$parse', function ($parse) {
    return {
      restrict: 'E',
      replace: false,
      scope: false,

      link: function link(scope, element, attrs) {
        var el = element[0];

        var onChange = function onChange() {
          $parse(attrs.ngModel).assign(scope, el.value);
          attrs.ngChange && scope.$eval(attrs.ngChange);
          scope.$parent.$evalAsync();
        };

        if (attrs.ngModel) {
          scope.$watch(attrs.ngModel, function (value) {
            return el.checked = value === el.value;
          });
          element.on('change', onChange);
        }

        scope.$on('$destroy', function () {
          element.off('change', onChange);
          scope = element = attrs = el = null;
        });
      }
    };
  }]);
})();

(function () {
  angular.module('onsen').directive('onsRange', ['$parse', function ($parse) {
    return {
      restrict: 'E',
      replace: false,
      scope: false,

      link: function link(scope, element, attrs) {

        var onInput = function onInput() {
          var set = $parse(attrs.ngModel).assign;

          set(scope, element[0].value);
          if (attrs.ngChange) {
            scope.$eval(attrs.ngChange);
          }
          scope.$parent.$evalAsync();
        };

        if (attrs.ngModel) {
          scope.$watch(attrs.ngModel, function (value) {
            element[0].value = value;
          });

          element.on('input', onInput);
        }

        scope.$on('$destroy', function () {
          element.off('input', onInput);
          scope = element = attrs = null;
        });
      }
    };
  }]);
})();

(function () {
  angular.module('onsen').directive('onsRipple', ['$onsen', 'GenericView', function ($onsen, GenericView) {
    return {
      restrict: 'E',
      link: function link(scope, element, attrs) {
        GenericView.register(scope, element, attrs, { viewKey: 'ons-ripple' });
        $onsen.fireComponentEvent(element[0], 'init');
      }
    };
  }]);
})();

/**
 * @element ons-scope
 * @category util
 * @description
 *   [en]All child elements using the "var" attribute will be attached to the scope of this element.[/en]
 *   [ja]"var"属性を使っている全ての子要素のviewオブジェクトは、この要素のAngularJSスコープに追加されます。[/ja]
 * @example
 * <ons-list>
 *   <ons-list-item ons-scope ng-repeat="item in items">
 *     <ons-carousel var="carousel">
 *       <ons-carousel-item ng-click="carousel.next()">
 *         {{ item }}
 *       </ons-carousel-item>
 *       </ons-carousel-item ng-click="carousel.prev()">
 *         ...
 *       </ons-carousel-item>
 *     </ons-carousel>
 *   </ons-list-item>
 * </ons-list>
 */

(function () {
  var module = angular.module('onsen');

  module.directive('onsScope', ['$onsen', function ($onsen) {
    return {
      restrict: 'A',
      replace: false,
      transclude: false,
      scope: false,

      link: function link(scope, element) {
        element.data('_scope', scope);

        scope.$on('$destroy', function () {
          element.data('_scope', undefined);
        });
      }
    };
  }]);
})();

/**
 * @element ons-search-input
 */

(function () {
  angular.module('onsen').directive('onsSearchInput', ['$parse', function ($parse) {
    return {
      restrict: 'E',
      replace: false,
      scope: false,

      link: function link(scope, element, attrs) {
        var el = element[0];

        var onInput = function onInput() {
          $parse(attrs.ngModel).assign(scope, el.type === 'number' ? Number(el.value) : el.value);
          attrs.ngChange && scope.$eval(attrs.ngChange);
          scope.$parent.$evalAsync();
        };

        if (attrs.ngModel) {
          scope.$watch(attrs.ngModel, function (value) {
            if (typeof value !== 'undefined' && value !== el.value) {
              el.value = value;
            }
          });

          element.on('input', onInput);
        }

        scope.$on('$destroy', function () {
          element.off('input', onInput);
          scope = element = attrs = el = null;
        });
      }
    };
  }]);
})();

/**
 * @element ons-segment
 */

/**
 * @attribute var
 * @initonly
 * @type {String}
 * @description
 *   [en]Variable name to refer this segment.[/en]
 *   [ja]このタブバーを参照するための名前を指定します。[/ja]
 */

/**
 * @attribute ons-postchange
 * @initonly
 * @type {Expression}
 * @description
 *  [en]Allows you to specify custom behavior when the "postchange" event is fired.[/en]
 *  [ja]"postchange"イベントが発火された時の挙動を独自に指定できます。[/ja]
 */

(function () {
  angular.module('onsen').directive('onsSegment', ['$onsen', 'GenericView', function ($onsen, GenericView) {
    return {
      restrict: 'E',
      link: function link(scope, element, attrs) {
        var view = GenericView.register(scope, element, attrs, { viewKey: 'ons-segment' });
        $onsen.fireComponentEvent(element[0], 'init');
        $onsen.registerEventHandlers(view, 'postchange');
      }
    };
  }]);
})();

/**
 * @element ons-select
 */

/**
 * @method on
 * @signature on(eventName, listener)
 * @description
 *   [en]Add an event listener.[/en]
 *   [ja]イベントリスナーを追加します。[/ja]
 * @param {String} eventName
 *   [en]Name of the event.[/en]
 *   [ja]イベント名を指定します。[/ja]
 * @param {Function} listener
 *   [en]Function to execute when the event is triggered.[/en]
 *   [ja]このイベントが発火された際に呼び出される関数オブジェクトを指定します。[/ja]
 */

/**
 * @method once
 * @signature once(eventName, listener)
 * @description
 *  [en]Add an event listener that's only triggered once.[/en]
 *  [ja]一度だけ呼び出されるイベントリスナーを追加します。[/ja]
 * @param {String} eventName
 *   [en]Name of the event.[/en]
 *   [ja]イベント名を指定します。[/ja]
 * @param {Function} listener
 *   [en]Function to execute when the event is triggered.[/en]
 *   [ja]イベントが発火した際に呼び出される関数オブジェクトを指定します。[/ja]
 */

/**
 * @method off
 * @signature off(eventName, [listener])
 * @description
 *  [en]Remove an event listener. If the listener is not specified all listeners for the event type will be removed.[/en]
 *  [ja]イベントリスナーを削除します。もしイベントリスナーを指定しなかった場合には、そのイベントに紐づく全てのイベントリスナーが削除されます。[/ja]
 * @param {String} eventName
 *   [en]Name of the event.[/en]
 *   [ja]イベント名を指定します。[/ja]
 * @param {Function} listener
 *   [en]Function to execute when the event is triggered.[/en]
 *   [ja]削除するイベントリスナーを指定します。[/ja]
 */

(function () {
  angular.module('onsen').directive('onsSelect', ['$parse', '$onsen', 'GenericView', function ($parse, $onsen, GenericView) {
    return {
      restrict: 'E',
      replace: false,
      scope: false,

      link: function link(scope, element, attrs) {
        var onInput = function onInput() {
          var set = $parse(attrs.ngModel).assign;

          set(scope, element[0].value);
          if (attrs.ngChange) {
            scope.$eval(attrs.ngChange);
          }
          scope.$parent.$evalAsync();
        };

        if (attrs.ngModel) {
          scope.$watch(attrs.ngModel, function (value) {
            element[0].value = value;
          });

          element.on('input', onInput);
        }

        scope.$on('$destroy', function () {
          element.off('input', onInput);
          scope = element = attrs = null;
        });

        GenericView.register(scope, element, attrs, { viewKey: 'ons-select' });
        $onsen.fireComponentEvent(element[0], 'init');
      }
    };
  }]);
})();

/**
 * @element ons-speed-dial
 */

/**
 * @attribute var
 * @initonly
 * @type {String}
 * @description
 *   [en]Variable name to refer the speed dial.[/en]
 *   [ja]このスピードダイアルを参照するための変数名をしてします。[/ja]
 */

/**
 * @attribute ons-open
 * @initonly
 * @type {Expression}
 * @description
 *  [en]Allows you to specify custom behavior when the "open" event is fired.[/en]
 *  [ja]"open"イベントが発火された時の挙動を独自に指定できます。[/ja]
 */

/**
 * @attribute ons-close
 * @initonly
 * @type {Expression}
 * @description
 *  [en]Allows you to specify custom behavior when the "close" event is fired.[/en]
 *  [ja]"close"イベントが発火された時の挙動を独自に指定できます。[/ja]
 */

/**
 * @method once
 * @signature once(eventName, listener)
 * @description
 *  [en]Add an event listener that's only triggered once.[/en]
 *  [ja]一度だけ呼び出されるイベントリスナを追加します。[/ja]
 * @param {String} eventName
 *   [en]Name of the event.[/en]
 *   [ja]イベント名を指定します。[/ja]
 * @param {Function} listener
 *   [en]Function to execute when the event is triggered.[/en]
 *   [ja]イベントが発火した際に呼び出される関数オブジェクトを指定します。[/ja]
 */

/**
 * @method off
 * @signature off(eventName, [listener])
 * @description
 *  [en]Remove an event listener. If the listener is not specified all listeners for the event type will be removed.[/en]
 *  [ja]イベントリスナーを削除します。もしイベントリスナーが指定されなかった場合には、そのイベントに紐付いているイベントリスナーが全て削除されます。[/ja]
 * @param {String} eventName
 *   [en]Name of the event.[/en]
 *   [ja]イベント名を指定します。[/ja]
 * @param {Function} listener
 *   [en]Function to execute when the event is triggered.[/en]
 *   [ja]イベントが発火した際に呼び出される関数オブジェクトを指定します。[/ja]
 */

/**
 * @method on
 * @signature on(eventName, listener)
 * @description
 *   [en]Add an event listener.[/en]
 *   [ja]イベントリスナーを追加します。[/ja]
 * @param {String} eventName
 *   [en]Name of the event.[/en]
 *   [ja]イベント名を指定します。[/ja]
 * @param {Function} listener
 *   [en]Function to execute when the event is triggered.[/en]
 *   [ja]イベントが発火した際に呼び出される関数オブジェクトを指定します。[/ja]
 */

(function () {
  var module = angular.module('onsen');

  module.directive('onsSpeedDial', ['$onsen', 'SpeedDialView', function ($onsen, SpeedDialView) {
    return {
      restrict: 'E',
      replace: false,
      scope: false,
      transclude: false,

      compile: function compile(element, attrs) {

        return function (scope, element, attrs) {
          var speedDial = new SpeedDialView(scope, element, attrs);

          element.data('ons-speed-dial', speedDial);

          $onsen.registerEventHandlers(speedDial, 'open close');
          $onsen.declareVarAttribute(attrs, speedDial);

          scope.$on('$destroy', function () {
            speedDial._events = undefined;
            element.data('ons-speed-dial', undefined);
            element = null;
          });

          $onsen.fireComponentEvent(element[0], 'init');
        };
      }

    };
  }]);
})();

/**
 * @element ons-splitter-content
 */

/**
 * @attribute var
 * @initonly
 * @type {String}
 * @description
 *   [en]Variable name to refer this splitter content.[/en]
 *   [ja]このスプリッターコンポーネントを参照するための名前を指定します。[/ja]
 */

/**
 * @attribute ons-destroy
 * @initonly
 * @type {Expression}
 * @description
 *  [en]Allows you to specify custom behavior when the "destroy" event is fired.[/en]
 *  [ja]"destroy"イベントが発火された時の挙動を独自に指定できます。[/ja]
 */
(function () {
  var lastReady = window.ons.elements.SplitterContent.rewritables.ready;
  window.ons.elements.SplitterContent.rewritables.ready = ons._waitDiretiveInit('ons-splitter-content', lastReady);

  angular.module('onsen').directive('onsSplitterContent', ['$compile', 'SplitterContent', '$onsen', function ($compile, SplitterContent, $onsen) {
    return {
      restrict: 'E',

      compile: function compile(element, attrs) {

        return function (scope, element, attrs) {

          var view = new SplitterContent(scope, element, attrs);

          $onsen.declareVarAttribute(attrs, view);
          $onsen.registerEventHandlers(view, 'destroy');

          element.data('ons-splitter-content', view);

          element[0].pageLoader = $onsen.createPageLoader(view);

          scope.$on('$destroy', function () {
            view._events = undefined;
            element.data('ons-splitter-content', undefined);
          });

          $onsen.fireComponentEvent(element[0], 'init');
        };
      }
    };
  }]);
})();

/**
 * @element ons-splitter-side
 */

/**
 * @attribute var
 * @initonly
 * @type {String}
 * @description
 *   [en]Variable name to refer this splitter side.[/en]
 *   [ja]このスプリッターコンポーネントを参照するための名前を指定します。[/ja]
 */

/**
 * @attribute ons-destroy
 * @initonly
 * @type {Expression}
 * @description
 *  [en]Allows you to specify custom behavior when the "destroy" event is fired.[/en]
 *  [ja]"destroy"イベントが発火された時の挙動を独自に指定できます。[/ja]
 */

/**
 * @attribute ons-preopen
 * @initonly
 * @type {Expression}
 * @description
 *  [en]Allows you to specify custom behavior when the "preopen" event is fired.[/en]
 *  [ja]"preopen"イベントが発火された時の挙動を独自に指定できます。[/ja]
 */

/**
 * @attribute ons-preclose
 * @initonly
 * @type {Expression}
 * @description
 *  [en]Allows you to specify custom behavior when the "preclose" event is fired.[/en]
 *  [ja]"preclose"イベントが発火された時の挙動を独自に指定できます。[/ja]
 */

/**
 * @attribute ons-postopen
 * @initonly
 * @type {Expression}
 * @description
 *  [en]Allows you to specify custom behavior when the "postopen" event is fired.[/en]
 *  [ja]"postopen"イベントが発火された時の挙動を独自に指定できます。[/ja]
 */

/**
 * @attribute ons-postclose
 * @initonly
 * @type {Expression}
 * @description
 *  [en]Allows you to specify custom behavior when the "postclose" event is fired.[/en]
 *  [ja]"postclose"イベントが発火された時の挙動を独自に指定できます。[/ja]
 */

/**
 * @attribute ons-modechange
 * @initonly
 * @type {Expression}
 * @description
 *  [en]Allows you to specify custom behavior when the "modechange" event is fired.[/en]
 *  [ja]"modechange"イベントが発火された時の挙動を独自に指定できます。[/ja]
 */
(function () {
  var lastReady = window.ons.elements.SplitterSide.rewritables.ready;
  window.ons.elements.SplitterSide.rewritables.ready = ons._waitDiretiveInit('ons-splitter-side', lastReady);

  angular.module('onsen').directive('onsSplitterSide', ['$compile', 'SplitterSide', '$onsen', function ($compile, SplitterSide, $onsen) {
    return {
      restrict: 'E',

      compile: function compile(element, attrs) {

        return function (scope, element, attrs) {

          var view = new SplitterSide(scope, element, attrs);

          $onsen.declareVarAttribute(attrs, view);
          $onsen.registerEventHandlers(view, 'destroy preopen preclose postopen postclose modechange');

          element.data('ons-splitter-side', view);

          element[0].pageLoader = $onsen.createPageLoader(view);

          scope.$on('$destroy', function () {
            view._events = undefined;
            element.data('ons-splitter-side', undefined);
          });

          $onsen.fireComponentEvent(element[0], 'init');
        };
      }
    };
  }]);
})();

/**
 * @element ons-splitter
 */

/**
 * @attribute var
 * @initonly
 * @type {String}
 * @description
 *   [en]Variable name to refer this splitter.[/en]
 *   [ja]このスプリッターコンポーネントを参照するための名前を指定します。[/ja]
 */

/**
 * @attribute ons-destroy
 * @initonly
 * @type {Expression}
 * @description
 *  [en]Allows you to specify custom behavior when the "destroy" event is fired.[/en]
 *  [ja]"destroy"イベントが発火された時の挙動を独自に指定できます。[/ja]
 */

/**
 * @method on
 * @signature on(eventName, listener)
 * @description
 *   [en]Add an event listener.[/en]
 *   [ja]イベントリスナーを追加します。[/ja]
 * @param {String} eventName
 *   [en]Name of the event.[/en]
 *   [ja]イベント名を指定します。[/ja]
 * @param {Function} listener
 *   [en]Function to execute when the event is triggered.[/en]
 *   [ja]このイベントが発火された際に呼び出される関数オブジェクトを指定します。[/ja]
 */

/**
 * @method once
 * @signature once(eventName, listener)
 * @description
 *  [en]Add an event listener that's only triggered once.[/en]
 *  [ja]一度だけ呼び出されるイベントリスナーを追加します。[/ja]
 * @param {String} eventName
 *   [en]Name of the event.[/en]
 *   [ja]イベント名を指定します。[/ja]
 * @param {Function} listener
 *   [en]Function to execute when the event is triggered.[/en]
 *   [ja]イベントが発火した際に呼び出される関数オブジェクトを指定します。[/ja]
 */

/**
 * @method off
 * @signature off(eventName, [listener])
 * @description
 *  [en]Remove an event listener. If the listener is not specified all listeners for the event type will be removed.[/en]
 *  [ja]イベントリスナーを削除します。もしイベントリスナーを指定しなかった場合には、そのイベントに紐づく全てのイベントリスナーが削除されます。[/ja]
 * @param {String} eventName
 *   [en]Name of the event.[/en]
 *   [ja]イベント名を指定します。[/ja]
 * @param {Function} listener
 *   [en]Function to execute when the event is triggered.[/en]
 *   [ja]削除するイベントリスナーを指定します。[/ja]
 */

(function () {
  angular.module('onsen').directive('onsSplitter', ['$compile', 'Splitter', '$onsen', function ($compile, Splitter, $onsen) {
    return {
      restrict: 'E',
      scope: true,

      compile: function compile(element, attrs) {

        return function (scope, element, attrs) {

          var splitter = new Splitter(scope, element, attrs);

          $onsen.declareVarAttribute(attrs, splitter);
          $onsen.registerEventHandlers(splitter, 'destroy');

          element.data('ons-splitter', splitter);

          scope.$on('$destroy', function () {
            splitter._events = undefined;
            element.data('ons-splitter', undefined);
          });

          $onsen.fireComponentEvent(element[0], 'init');
        };
      }
    };
  }]);
})();

/**
 * @element ons-switch
 */

/**
 * @attribute var
 * @initonly
 * @type {String}
 * @description
 *   [en]Variable name to refer this switch.[/en]
 *   [ja]JavaScriptから参照するための変数名を指定します。[/ja]
 */

/**
 * @method on
 * @signature on(eventName, listener)
 * @description
 *   [en]Add an event listener.[/en]
 *   [ja]イベントリスナーを追加します。[/ja]
 * @param {String} eventName
 *   [en]Name of the event.[/en]
 *   [ja]イベント名を指定します。[/ja]
 * @param {Function} listener
 *   [en]Function to execute when the event is triggered.[/en]
 *   [ja]このイベントが発火された際に呼び出される関数オブジェクトを指定します。[/ja]
 */

/**
 * @method once
 * @signature once(eventName, listener)
 * @description
 *  [en]Add an event listener that's only triggered once.[/en]
 *  [ja]一度だけ呼び出されるイベントリスナーを追加します。[/ja]
 * @param {String} eventName
 *   [en]Name of the event.[/en]
 *   [ja]イベント名を指定します。[/ja]
 * @param {Function} listener
 *   [en]Function to execute when the event is triggered.[/en]
 *   [ja]イベントが発火した際に呼び出される関数オブジェクトを指定します。[/ja]
 */

/**
 * @method off
 * @signature off(eventName, [listener])
 * @description
 *  [en]Remove an event listener. If the listener is not specified all listeners for the event type will be removed.[/en]
 *  [ja]イベントリスナーを削除します。もしイベントリスナーを指定しなかった場合には、そのイベントに紐づく全てのイベントリスナーが削除されます。[/ja]
 * @param {String} eventName
 *   [en]Name of the event.[/en]
 *   [ja]イベント名を指定します。[/ja]
 * @param {Function} listener
 *   [en]Function to execute when the event is triggered.[/en]
 *   [ja]削除するイベントリスナーを指定します。[/ja]
 */

(function () {
  angular.module('onsen').directive('onsSwitch', ['$onsen', 'SwitchView', function ($onsen, SwitchView) {
    return {
      restrict: 'E',
      replace: false,
      scope: true,

      link: function link(scope, element, attrs) {

        if (attrs.ngController) {
          throw new Error('This element can\'t accept ng-controller directive.');
        }

        var switchView = new SwitchView(element, scope, attrs);
        $onsen.addModifierMethodsForCustomElements(switchView, element);

        $onsen.declareVarAttribute(attrs, switchView);
        element.data('ons-switch', switchView);

        $onsen.cleaner.onDestroy(scope, function () {
          switchView._events = undefined;
          $onsen.removeModifierMethods(switchView);
          element.data('ons-switch', undefined);
          $onsen.clearComponent({
            element: element,
            scope: scope,
            attrs: attrs
          });
          element = attrs = scope = null;
        });

        $onsen.fireComponentEvent(element[0], 'init');
      }
    };
  }]);
})();

/**
 * @element ons-tabbar
 */

/**
 * @attribute var
 * @initonly
 * @type {String}
 * @description
 *   [en]Variable name to refer this tab bar.[/en]
 *   [ja]このタブバーを参照するための名前を指定します。[/ja]
 */

/**
 * @attribute ons-reactive
 * @initonly
 * @type {Expression}
 * @description
 *  [en]Allows you to specify custom behavior when the "reactive" event is fired.[/en]
 *  [ja]"reactive"イベントが発火された時の挙動を独自に指定できます。[/ja]
 */

/**
 * @attribute ons-prechange
 * @initonly
 * @type {Expression}
 * @description
 *  [en]Allows you to specify custom behavior when the "prechange" event is fired.[/en]
 *  [ja]"prechange"イベントが発火された時の挙動を独自に指定できます。[/ja]
 */

/**
 * @attribute ons-postchange
 * @initonly
 * @type {Expression}
 * @description
 *  [en]Allows you to specify custom behavior when the "postchange" event is fired.[/en]
 *  [ja]"postchange"イベントが発火された時の挙動を独自に指定できます。[/ja]
 */

/**
 * @attribute ons-init
 * @initonly
 * @type {Expression}
 * @description
 *  [en]Allows you to specify custom behavior when a page's "init" event is fired.[/en]
 *  [ja]ページの"init"イベントが発火された時の挙動を独自に指定できます。[/ja]
 */

/**
 * @attribute ons-show
 * @initonly
 * @type {Expression}
 * @description
 *  [en]Allows you to specify custom behavior when a page's "show" event is fired.[/en]
 *  [ja]ページの"show"イベントが発火された時の挙動を独自に指定できます。[/ja]
 */

/**
 * @attribute ons-hide
 * @initonly
 * @type {Expression}
 * @description
 *  [en]Allows you to specify custom behavior when a page's "hide" event is fired.[/en]
 *  [ja]ページの"hide"イベントが発火された時の挙動を独自に指定できます。[/ja]
 */

/**
 * @attribute ons-destroy
 * @initonly
 * @type {Expression}
 * @description
 *  [en]Allows you to specify custom behavior when a page's "destroy" event is fired.[/en]
 *  [ja]ページの"destroy"イベントが発火された時の挙動を独自に指定できます。[/ja]
 */

/**
 * @method on
 * @signature on(eventName, listener)
 * @description
 *   [en]Add an event listener.[/en]
 *   [ja]イベントリスナーを追加します。[/ja]
 * @param {String} eventName
 *   [en]Name of the event.[/en]
 *   [ja]イベント名を指定します。[/ja]
 * @param {Function} listener
 *   [en]Function to execute when the event is triggered.[/en]
 *   [ja]このイベントが発火された際に呼び出される関数オブジェクトを指定します。[/ja]
 */

/**
 * @method once
 * @signature once(eventName, listener)
 * @description
 *  [en]Add an event listener that's only triggered once.[/en]
 *  [ja]一度だけ呼び出されるイベントリスナーを追加します。[/ja]
 * @param {String} eventName
 *   [en]Name of the event.[/en]
 *   [ja]イベント名を指定します。[/ja]
 * @param {Function} listener
 *   [en]Function to execute when the event is triggered.[/en]
 *   [ja]イベントが発火した際に呼び出される関数オブジェクトを指定します。[/ja]
 */

/**
 * @method off
 * @signature off(eventName, [listener])
 * @description
 *  [en]Remove an event listener. If the listener is not specified all listeners for the event type will be removed.[/en]
 *  [ja]イベントリスナーを削除します。もしイベントリスナーを指定しなかった場合には、そのイベントに紐づく全てのイベントリスナーが削除されます。[/ja]
 * @param {String} eventName
 *   [en]Name of the event.[/en]
 *   [ja]イベント名を指定します。[/ja]
 * @param {Function} listener
 *   [en]Function to execute when the event is triggered.[/en]
 *   [ja]削除するイベントリスナーを指定します。[/ja]
 */

(function () {
  var lastReady = window.ons.elements.Tabbar.rewritables.ready;
  window.ons.elements.Tabbar.rewritables.ready = ons._waitDiretiveInit('ons-tabbar', lastReady);

  angular.module('onsen').directive('onsTabbar', ['$onsen', '$compile', '$parse', 'TabbarView', function ($onsen, $compile, $parse, TabbarView) {

    return {
      restrict: 'E',

      replace: false,
      scope: true,

      link: function link(scope, element, attrs, controller) {
        var tabbarView = new TabbarView(scope, element, attrs);
        $onsen.addModifierMethodsForCustomElements(tabbarView, element);

        $onsen.registerEventHandlers(tabbarView, 'reactive prechange postchange init show hide destroy');

        element.data('ons-tabbar', tabbarView);
        $onsen.declareVarAttribute(attrs, tabbarView);

        scope.$on('$destroy', function () {
          tabbarView._events = undefined;
          $onsen.removeModifierMethods(tabbarView);
          element.data('ons-tabbar', undefined);
        });

        $onsen.fireComponentEvent(element[0], 'init');
      }
    };
  }]);
})();

(function () {
  tab.$inject = ['$onsen', 'GenericView'];
  angular.module('onsen').directive('onsTab', tab).directive('onsTabbarItem', tab); // for BC

  function tab($onsen, GenericView) {
    return {
      restrict: 'E',
      link: function link(scope, element, attrs) {
        var view = GenericView.register(scope, element, attrs, { viewKey: 'ons-tab' });
        element[0].pageLoader = $onsen.createPageLoader(view);

        $onsen.fireComponentEvent(element[0], 'init');
      }
    };
  }
})();

(function () {
  angular.module('onsen').directive('onsTemplate', ['$templateCache', function ($templateCache) {
    return {
      restrict: 'E',
      terminal: true,
      compile: function compile(element) {
        var content = element[0].template || element.html();
        $templateCache.put(element.attr('id'), content);
      }
    };
  }]);
})();

/**
 * @element ons-toast
 */

/**
 * @attribute var
 * @initonly
 * @type {String}
 * @description
 *  [en]Variable name to refer this toast dialog.[/en]
 *  [ja]このトーストを参照するための名前を指定します。[/ja]
 */

/**
 * @attribute ons-preshow
 * @initonly
 * @type {Expression}
 * @description
 *  [en]Allows you to specify custom behavior when the "preshow" event is fired.[/en]
 *  [ja]"preshow"イベントが発火された時の挙動を独自に指定できます。[/ja]
 */

/**
 * @attribute ons-prehide
 * @initonly
 * @type {Expression}
 * @description
 *  [en]Allows you to specify custom behavior when the "prehide" event is fired.[/en]
 *  [ja]"prehide"イベントが発火された時の挙動を独自に指定できます。[/ja]
 */

/**
 * @attribute ons-postshow
 * @initonly
 * @type {Expression}
 * @description
 *  [en]Allows you to specify custom behavior when the "postshow" event is fired.[/en]
 *  [ja]"postshow"イベントが発火された時の挙動を独自に指定できます。[/ja]
 */

/**
 * @attribute ons-posthide
 * @initonly
 * @type {Expression}
 * @description
 *  [en]Allows you to specify custom behavior when the "posthide" event is fired.[/en]
 *  [ja]"posthide"イベントが発火された時の挙動を独自に指定できます。[/ja]
 */

/**
 * @attribute ons-destroy
 * @initonly
 * @type {Expression}
 * @description
 *  [en]Allows you to specify custom behavior when the "destroy" event is fired.[/en]
 *  [ja]"destroy"イベントが発火された時の挙動を独自に指定できます。[/ja]
 */

/**
 * @method on
 * @signature on(eventName, listener)
 * @description
 *   [en]Add an event listener.[/en]
 *   [ja]イベントリスナーを追加します。[/ja]
 * @param {String} eventName
 *   [en]Name of the event.[/en]
 *   [ja]イベント名を指定します。[/ja]
 * @param {Function} listener
 *   [en]Function to execute when the event is triggered.[/en]
 *   [ja]イベントが発火された際に呼び出されるコールバックを指定します。[/ja]
 */

/**
 * @method once
 * @signature once(eventName, listener)
 * @description
 *  [en]Add an event listener that's only triggered once.[/en]
 *  [ja]一度だけ呼び出されるイベントリスナーを追加します。[/ja]
 * @param {String} eventName
 *   [en]Name of the event.[/en]
 *   [ja]イベント名を指定します。[/ja]
 * @param {Function} listener
 *   [en]Function to execute when the event is triggered.[/en]
 *   [ja]イベントが発火した際に呼び出されるコールバックを指定します。[/ja]
 */

/**
 * @method off
 * @signature off(eventName, [listener])
 * @description
 *  [en]Remove an event listener. If the listener is not specified all listeners for the event type will be removed.[/en]
 *  [ja]イベントリスナーを削除します。もしlistenerパラメータが指定されなかった場合、そのイベントのリスナーが全て削除されます。[/ja]
 * @param {String} eventName
 *   [en]Name of the event.[/en]
 *   [ja]イベント名を指定します。[/ja]
 * @param {Function} listener
 *   [en]Function to execute when the event is triggered.[/en]
 *   [ja]削除するイベントリスナーの関数オブジェクトを渡します。[/ja]
 */

(function () {
  angular.module('onsen').directive('onsToast', ['$onsen', 'ToastView', function ($onsen, ToastView) {
    return {
      restrict: 'E',
      replace: false,
      scope: true,
      transclude: false,

      compile: function compile(element, attrs) {

        return {
          pre: function pre(scope, element, attrs) {
            var toast = new ToastView(scope, element, attrs);

            $onsen.declareVarAttribute(attrs, toast);
            $onsen.registerEventHandlers(toast, 'preshow prehide postshow posthide destroy');
            $onsen.addModifierMethodsForCustomElements(toast, element);

            element.data('ons-toast', toast);
            element.data('_scope', scope);

            scope.$on('$destroy', function () {
              toast._events = undefined;
              $onsen.removeModifierMethods(toast);
              element.data('ons-toast', undefined);
              element = null;
            });
          },
          post: function post(scope, element) {
            $onsen.fireComponentEvent(element[0], 'init');
          }
        };
      }
    };
  }]);
})();

/**
 * @element ons-toolbar-button
 */

/**
 * @attribute var
 * @initonly
 * @type {String}
 * @description
 *   [en]Variable name to refer this button.[/en]
 *   [ja]このボタンを参照するための名前を指定します。[/ja]
 */
(function () {
  var module = angular.module('onsen');

  module.directive('onsToolbarButton', ['$onsen', 'GenericView', function ($onsen, GenericView) {
    return {
      restrict: 'E',
      scope: false,
      link: {
        pre: function pre(scope, element, attrs) {
          var toolbarButton = new GenericView(scope, element, attrs);
          element.data('ons-toolbar-button', toolbarButton);
          $onsen.declareVarAttribute(attrs, toolbarButton);

          $onsen.addModifierMethodsForCustomElements(toolbarButton, element);

          $onsen.cleaner.onDestroy(scope, function () {
            toolbarButton._events = undefined;
            $onsen.removeModifierMethods(toolbarButton);
            element.data('ons-toolbar-button', undefined);
            element = null;

            $onsen.clearComponent({
              scope: scope,
              attrs: attrs,
              element: element
            });
            scope = element = attrs = null;
          });
        },
        post: function post(scope, element, attrs) {
          $onsen.fireComponentEvent(element[0], 'init');
        }
      }
    };
  }]);
})();

/**
 * @element ons-toolbar
 */

/**
 * @attribute var
 * @initonly
 * @type {String}
 * @description
 *  [en]Variable name to refer this toolbar.[/en]
 *  [ja]このツールバーを参照するための名前を指定します。[/ja]
 */
(function () {
  angular.module('onsen').directive('onsToolbar', ['$onsen', 'GenericView', function ($onsen, GenericView) {
    return {
      restrict: 'E',

      // NOTE: This element must coexists with ng-controller.
      // Do not use isolated scope and template's ng-transclude.
      scope: false,
      transclude: false,

      compile: function compile(element) {
        return {
          pre: function pre(scope, element, attrs) {
            // TODO: Remove this dirty fix!
            if (element[0].nodeName === 'ons-toolbar') {
              GenericView.register(scope, element, attrs, { viewKey: 'ons-toolbar' });
            }
          },
          post: function post(scope, element, attrs) {
            $onsen.fireComponentEvent(element[0], 'init');
          }
        };
      }
    };
  }]);
})();

/*
Copyright 2013-2015 ASIAL CORPORATION

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

   http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.

*/

(function () {
  var module = angular.module('onsen');

  /**
   * Internal service class for framework implementation.
   */
  module.factory('$onsen', ['$rootScope', '$window', '$cacheFactory', '$document', '$templateCache', '$http', '$q', '$compile', '$onsGlobal', 'ComponentCleaner', function ($rootScope, $window, $cacheFactory, $document, $templateCache, $http, $q, $compile, $onsGlobal, ComponentCleaner) {

    var $onsen = createOnsenService();
    var ModifierUtil = $onsGlobal._internal.ModifierUtil;

    return $onsen;

    function createOnsenService() {
      return {

        DIRECTIVE_TEMPLATE_URL: 'templates',

        cleaner: ComponentCleaner,

        util: $onsGlobal._util,

        DeviceBackButtonHandler: $onsGlobal._internal.dbbDispatcher,

        _defaultDeviceBackButtonHandler: $onsGlobal._defaultDeviceBackButtonHandler,

        /**
         * @return {Object}
         */
        getDefaultDeviceBackButtonHandler: function getDefaultDeviceBackButtonHandler() {
          return this._defaultDeviceBackButtonHandler;
        },

        /**
         * @param {Object} view
         * @param {Element} element
         * @param {Array} methodNames
         * @return {Function} A function that dispose all driving methods.
         */
        deriveMethods: function deriveMethods(view, element, methodNames) {
          methodNames.forEach(function (methodName) {
            view[methodName] = function () {
              return element[methodName].apply(element, arguments);
            };
          });

          return function () {
            methodNames.forEach(function (methodName) {
              view[methodName] = null;
            });
            view = element = null;
          };
        },

        /**
         * @param {Class} klass
         * @param {Array} properties
         */
        derivePropertiesFromElement: function derivePropertiesFromElement(klass, properties) {
          properties.forEach(function (property) {
            Object.defineProperty(klass.prototype, property, {
              get: function get() {
                return this._element[0][property];
              },
              set: function set(value) {
                return this._element[0][property] = value; // eslint-disable-line no-return-assign
              }
            });
          });
        },

        /**
         * @param {Object} view
         * @param {Element} element
         * @param {Array} eventNames
         * @param {Function} [map]
         * @return {Function} A function that clear all event listeners
         */
        deriveEvents: function deriveEvents(view, element, eventNames, map) {
          map = map || function (detail) {
            return detail;
          };
          eventNames = [].concat(eventNames);
          var listeners = [];

          eventNames.forEach(function (eventName) {
            var listener = function listener(event) {
              map(event.detail || {});
              view.emit(eventName, event);
            };
            listeners.push(listener);
            element.addEventListener(eventName, listener, false);
          });

          return function () {
            eventNames.forEach(function (eventName, index) {
              element.removeEventListener(eventName, listeners[index], false);
            });
            view = element = listeners = map = null;
          };
        },

        /**
         * @return {Boolean}
         */
        isEnabledAutoStatusBarFill: function isEnabledAutoStatusBarFill() {
          return !!$onsGlobal._config.autoStatusBarFill;
        },

        /**
         * @return {Boolean}
         */
        shouldFillStatusBar: $onsGlobal.shouldFillStatusBar,

        /**
         * @param {Function} action
         */
        autoStatusBarFill: $onsGlobal.autoStatusBarFill,

        /**
         * @param {Object} directive
         * @param {HTMLElement} pageElement
         * @param {Function} callback
         */
        compileAndLink: function compileAndLink(view, pageElement, callback) {
          var link = $compile(pageElement);
          var pageScope = view._scope.$new();

          /**
           * Overwrite page scope.
           */
          angular.element(pageElement).data('_scope', pageScope);

          pageScope.$evalAsync(function () {
            callback(pageElement); // Attach and prepare
            link(pageScope); // Run the controller
          });
        },

        /**
         * @param {Object} view
         * @return {Object} pageLoader
         */
        createPageLoader: function createPageLoader(view) {
          var _this = this;

          return new $onsGlobal.PageLoader(function (_ref, done) {
            var page = _ref.page,
                parent = _ref.parent;

            $onsGlobal._internal.getPageHTMLAsync(page).then(function (html) {
              _this.compileAndLink(view, $onsGlobal._util.createElement(html), function (element) {
                return done(parent.appendChild(element));
              });
            });
          }, function (element) {
            element._destroy();
            if (angular.element(element).data('_scope')) {
              angular.element(element).data('_scope').$destroy();
            }
          });
        },

        /**
         * @param {Object} params
         * @param {Scope} [params.scope]
         * @param {jqLite} [params.element]
         * @param {Array} [params.elements]
         * @param {Attributes} [params.attrs]
         */
        clearComponent: function clearComponent(params) {
          if (params.scope) {
            ComponentCleaner.destroyScope(params.scope);
          }

          if (params.attrs) {
            ComponentCleaner.destroyAttributes(params.attrs);
          }

          if (params.element) {
            ComponentCleaner.destroyElement(params.element);
          }

          if (params.elements) {
            params.elements.forEach(function (element) {
              ComponentCleaner.destroyElement(element);
            });
          }
        },

        /**
         * @param {jqLite} element
         * @param {String} name
         */
        findElementeObject: function findElementeObject(element, name) {
          return element.inheritedData(name);
        },

        /**
         * @param {String} page
         * @return {Promise}
         */
        getPageHTMLAsync: function getPageHTMLAsync(page) {
          var cache = $templateCache.get(page);

          if (cache) {
            var deferred = $q.defer();

            var html = typeof cache === 'string' ? cache : cache[1];
            deferred.resolve(this.normalizePageHTML(html));

            return deferred.promise;
          } else {
            return $http({
              url: page,
              method: 'GET'
            }).then(function (response) {
              var html = response.data;

              return this.normalizePageHTML(html);
            }.bind(this));
          }
        },

        /**
         * @param {String} html
         * @return {String}
         */
        normalizePageHTML: function normalizePageHTML(html) {
          html = ('' + html).trim();

          if (!html.match(/^<ons-page/)) {
            html = '<ons-page _muted>' + html + '</ons-page>';
          }

          return html;
        },

        /**
         * Create modifier templater function. The modifier templater generate css classes bound modifier name.
         *
         * @param {Object} attrs
         * @param {Array} [modifiers] an array of appendix modifier
         * @return {Function}
         */
        generateModifierTemplater: function generateModifierTemplater(attrs, modifiers) {
          var attrModifiers = attrs && typeof attrs.modifier === 'string' ? attrs.modifier.trim().split(/ +/) : [];
          modifiers = angular.isArray(modifiers) ? attrModifiers.concat(modifiers) : attrModifiers;

          /**
           * @return {String} template eg. 'ons-button--*', 'ons-button--*__item'
           * @return {String}
           */
          return function (template) {
            return modifiers.map(function (modifier) {
              return template.replace('*', modifier);
            }).join(' ');
          };
        },

        /**
         * Add modifier methods to view object for custom elements.
         *
         * @param {Object} view object
         * @param {jqLite} element
         */
        addModifierMethodsForCustomElements: function addModifierMethodsForCustomElements(view, element) {
          var methods = {
            hasModifier: function hasModifier(needle) {
              var tokens = ModifierUtil.split(element.attr('modifier'));
              needle = typeof needle === 'string' ? needle.trim() : '';

              return ModifierUtil.split(needle).some(function (needle) {
                return tokens.indexOf(needle) != -1;
              });
            },

            removeModifier: function removeModifier(needle) {
              needle = typeof needle === 'string' ? needle.trim() : '';

              var modifier = ModifierUtil.split(element.attr('modifier')).filter(function (token) {
                return token !== needle;
              }).join(' ');

              element.attr('modifier', modifier);
            },

            addModifier: function addModifier(modifier) {
              element.attr('modifier', element.attr('modifier') + ' ' + modifier);
            },

            setModifier: function setModifier(modifier) {
              element.attr('modifier', modifier);
            },

            toggleModifier: function toggleModifier(modifier) {
              if (this.hasModifier(modifier)) {
                this.removeModifier(modifier);
              } else {
                this.addModifier(modifier);
              }
            }
          };

          for (var method in methods) {
            if (methods.hasOwnProperty(method)) {
              view[method] = methods[method];
            }
          }
        },

        /**
         * Add modifier methods to view object.
         *
         * @param {Object} view object
         * @param {String} template
         * @param {jqLite} element
         */
        addModifierMethods: function addModifierMethods(view, template, element) {
          var _tr = function _tr(modifier) {
            return template.replace('*', modifier);
          };

          var fns = {
            hasModifier: function hasModifier(modifier) {
              return element.hasClass(_tr(modifier));
            },

            removeModifier: function removeModifier(modifier) {
              element.removeClass(_tr(modifier));
            },

            addModifier: function addModifier(modifier) {
              element.addClass(_tr(modifier));
            },

            setModifier: function setModifier(modifier) {
              var classes = element.attr('class').split(/\s+/),
                  patt = template.replace('*', '.');

              for (var i = 0; i < classes.length; i++) {
                var cls = classes[i];

                if (cls.match(patt)) {
                  element.removeClass(cls);
                }
              }

              element.addClass(_tr(modifier));
            },

            toggleModifier: function toggleModifier(modifier) {
              var cls = _tr(modifier);
              if (element.hasClass(cls)) {
                element.removeClass(cls);
              } else {
                element.addClass(cls);
              }
            }
          };

          var append = function append(oldFn, newFn) {
            if (typeof oldFn !== 'undefined') {
              return function () {
                return oldFn.apply(null, arguments) || newFn.apply(null, arguments);
              };
            } else {
              return newFn;
            }
          };

          view.hasModifier = append(view.hasModifier, fns.hasModifier);
          view.removeModifier = append(view.removeModifier, fns.removeModifier);
          view.addModifier = append(view.addModifier, fns.addModifier);
          view.setModifier = append(view.setModifier, fns.setModifier);
          view.toggleModifier = append(view.toggleModifier, fns.toggleModifier);
        },

        /**
         * Remove modifier methods.
         *
         * @param {Object} view object
         */
        removeModifierMethods: function removeModifierMethods(view) {
          view.hasModifier = view.removeModifier = view.addModifier = view.setModifier = view.toggleModifier = undefined;
        },

        /**
         * Define a variable to JavaScript global scope and AngularJS scope as 'var' attribute name.
         *
         * @param {Object} attrs
         * @param object
         */
        declareVarAttribute: function declareVarAttribute(attrs, object) {
          if (typeof attrs.var === 'string') {
            var varName = attrs.var;
            this._defineVar(varName, object);
          }
        },

        _registerEventHandler: function _registerEventHandler(component, eventName) {
          var capitalizedEventName = eventName.charAt(0).toUpperCase() + eventName.slice(1);

          component.on(eventName, function (event) {
            $onsen.fireComponentEvent(component._element[0], eventName, event && event.detail);

            var handler = component._attrs['ons' + capitalizedEventName];
            if (handler) {
              component._scope.$eval(handler, { $event: event });
              component._scope.$evalAsync();
            }
          });
        },

        /**
         * Register event handlers for attributes.
         *
         * @param {Object} component
         * @param {String} eventNames
         */
        registerEventHandlers: function registerEventHandlers(component, eventNames) {
          eventNames = eventNames.trim().split(/\s+/);

          for (var i = 0, l = eventNames.length; i < l; i++) {
            var eventName = eventNames[i];
            this._registerEventHandler(component, eventName);
          }
        },

        /**
         * @return {Boolean}
         */
        isAndroid: function isAndroid() {
          return !!$window.navigator.userAgent.match(/android/i);
        },

        /**
         * @return {Boolean}
         */
        isIOS: function isIOS() {
          return !!$window.navigator.userAgent.match(/(ipad|iphone|ipod touch)/i);
        },

        /**
         * @return {Boolean}
         */
        isWebView: function isWebView() {
          return $onsGlobal.isWebView();
        },

        /**
         * @return {Boolean}
         */
        isIOS7above: function () {
          var ua = $window.navigator.userAgent;
          var match = ua.match(/(iPad|iPhone|iPod touch);.*CPU.*OS (\d+)_(\d+)/i);

          var result = match ? parseFloat(match[2] + '.' + match[3]) >= 7 : false;

          return function () {
            return result;
          };
        }(),

        /**
         * Fire a named event for a component. The view object, if it exists, is attached to event.component.
         *
         * @param {HTMLElement} [dom]
         * @param {String} event name
         */
        fireComponentEvent: function fireComponentEvent(dom, eventName, data) {
          data = data || {};

          var event = document.createEvent('HTMLEvents');

          for (var key in data) {
            if (data.hasOwnProperty(key)) {
              event[key] = data[key];
            }
          }

          event.component = dom ? angular.element(dom).data(dom.nodeName.toLowerCase()) || null : null;
          event.initEvent(dom.nodeName.toLowerCase() + ':' + eventName, true, true);

          dom.dispatchEvent(event);
        },

        /**
         * Define a variable to JavaScript global scope and AngularJS scope.
         *
         * Util.defineVar('foo', 'foo-value');
         * // => window.foo and $scope.foo is now 'foo-value'
         *
         * Util.defineVar('foo.bar', 'foo-bar-value');
         * // => window.foo.bar and $scope.foo.bar is now 'foo-bar-value'
         *
         * @param {String} name
         * @param object
         */
        _defineVar: function _defineVar(name, object) {
          var names = name.split(/\./);

          function set(container, names, object) {
            var name;
            for (var i = 0; i < names.length - 1; i++) {
              name = names[i];
              if (container[name] === undefined || container[name] === null) {
                container[name] = {};
              }
              container = container[name];
            }

            container[names[names.length - 1]] = object;

            if (container[names[names.length - 1]] !== object) {
              throw new Error('Cannot set var="' + object._attrs.var + '" because it will overwrite a read-only variable.');
            }
          }

          if (ons.componentBase) {
            set(ons.componentBase, names, object);
          }

          var getScope = function getScope(el) {
            return angular.element(el).data('_scope');
          };

          var element = object._element[0];

          // Current element might not have data('_scope')
          if (element.hasAttribute('ons-scope')) {
            set(getScope(element) || object._scope, names, object);
            element = null;
            return;
          }

          // Ancestors
          while (element.parentElement) {
            element = element.parentElement;
            if (element.hasAttribute('ons-scope')) {
              set(getScope(element), names, object);
              element = null;
              return;
            }
          }

          element = null;

          // If no ons-scope element was found, attach to $rootScope.
          set($rootScope, names, object);
        }
      };
    }
  }]);
})();

/*
Copyright 2013-2015 ASIAL CORPORATION

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

   http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.

*/

(function () {
  var module = angular.module('onsen');

  var ComponentCleaner = {
    /**
     * @param {jqLite} element
     */
    decomposeNode: function decomposeNode(element) {
      var children = element.remove().children();
      for (var i = 0; i < children.length; i++) {
        ComponentCleaner.decomposeNode(angular.element(children[i]));
      }
    },

    /**
     * @param {Attributes} attrs
     */
    destroyAttributes: function destroyAttributes(attrs) {
      attrs.$$element = null;
      attrs.$$observers = null;
    },

    /**
     * @param {jqLite} element
     */
    destroyElement: function destroyElement(element) {
      element.remove();
    },

    /**
     * @param {Scope} scope
     */
    destroyScope: function destroyScope(scope) {
      scope.$$listeners = {};
      scope.$$watchers = null;
      scope = null;
    },

    /**
     * @param {Scope} scope
     * @param {Function} fn
     */
    onDestroy: function onDestroy(scope, fn) {
      var clear = scope.$on('$destroy', function () {
        clear();
        fn.apply(null, arguments);
      });
    }
  };

  module.factory('ComponentCleaner', function () {
    return ComponentCleaner;
  });

  // override builtin ng-(eventname) directives
  (function () {
    var ngEventDirectives = {};
    'click dblclick mousedown mouseup mouseover mouseout mousemove mouseenter mouseleave keydown keyup keypress submit focus blur copy cut paste'.split(' ').forEach(function (name) {
      var directiveName = directiveNormalize('ng-' + name);
      ngEventDirectives[directiveName] = ['$parse', function ($parse) {
        return {
          compile: function compile($element, attr) {
            var fn = $parse(attr[directiveName]);
            return function (scope, element, attr) {
              var listener = function listener(event) {
                scope.$apply(function () {
                  fn(scope, { $event: event });
                });
              };
              element.on(name, listener);

              ComponentCleaner.onDestroy(scope, function () {
                element.off(name, listener);
                element = null;

                ComponentCleaner.destroyScope(scope);
                scope = null;

                ComponentCleaner.destroyAttributes(attr);
                attr = null;
              });
            };
          }
        };
      }];

      function directiveNormalize(name) {
        return name.replace(/-([a-z])/g, function (matches) {
          return matches[1].toUpperCase();
        });
      }
    });
    module.config(['$provide', function ($provide) {
      var shift = function shift($delegate) {
        $delegate.shift();
        return $delegate;
      };
      Object.keys(ngEventDirectives).forEach(function (directiveName) {
        $provide.decorator(directiveName + 'Directive', ['$delegate', shift]);
      });
    }]);
    Object.keys(ngEventDirectives).forEach(function (directiveName) {
      module.directive(directiveName, ngEventDirectives[directiveName]);
    });
  })();
})();

// confirm to use jqLite
if (window.jQuery && angular.element === window.jQuery) {
  console.warn('Onsen UI require jqLite. Load jQuery after loading AngularJS to fix this error. jQuery may break Onsen UI behavior.'); // eslint-disable-line no-console
}

/*
Copyright 2013-2015 ASIAL CORPORATION

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

   http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.

*/

Object.keys(ons.notification).filter(function (name) {
  return !/^_/.test(name);
}).forEach(function (name) {
  var originalNotification = ons.notification[name];

  ons.notification[name] = function (message) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    typeof message === 'string' ? options.message = message : options = message;

    var compile = options.compile;
    var $element = void 0;

    options.compile = function (element) {
      $element = angular.element(compile ? compile(element) : element);
      return ons.$compile($element)($element.injector().get('$rootScope'));
    };

    options.destroy = function () {
      $element.data('_scope').$destroy();
      $element = null;
    };

    return originalNotification(options);
  };
});

/*
Copyright 2013-2015 ASIAL CORPORATION

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

   http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.

*/

(function () {
  angular.module('onsen').run(['$templateCache', function ($templateCache) {
    var templates = window.document.querySelectorAll('script[type="text/ons-template"]');

    for (var i = 0; i < templates.length; i++) {
      var template = angular.element(templates[i]);
      var id = template.attr('id');
      if (typeof id === 'string') {
        $templateCache.put(id, template.text());
      }
    }
  }]);
})();

})));
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYW5ndWxhci1vbnNlbnVpLmpzIiwic291cmNlcyI6WyIuLi8uLi9iaW5kaW5ncy9hbmd1bGFyMS92ZW5kb3IvY2xhc3MuanMiLCIuLi8uLi9iaW5kaW5ncy9hbmd1bGFyMS9qcy9vbnNlbi5qcyIsIi4uLy4uL2JpbmRpbmdzL2FuZ3VsYXIxL3ZpZXdzL2FjdGlvblNoZWV0LmpzIiwiLi4vLi4vYmluZGluZ3MvYW5ndWxhcjEvdmlld3MvYWxlcnREaWFsb2cuanMiLCIuLi8uLi9iaW5kaW5ncy9hbmd1bGFyMS92aWV3cy9jYXJvdXNlbC5qcyIsIi4uLy4uL2JpbmRpbmdzL2FuZ3VsYXIxL3ZpZXdzL2RpYWxvZy5qcyIsIi4uLy4uL2JpbmRpbmdzL2FuZ3VsYXIxL3ZpZXdzL2ZhYi5qcyIsIi4uLy4uL2JpbmRpbmdzL2FuZ3VsYXIxL3ZpZXdzL2dlbmVyaWMuanMiLCIuLi8uLi9iaW5kaW5ncy9hbmd1bGFyMS92aWV3cy9sYXp5UmVwZWF0RGVsZWdhdGUuanMiLCIuLi8uLi9iaW5kaW5ncy9hbmd1bGFyMS92aWV3cy9sYXp5UmVwZWF0LmpzIiwiLi4vLi4vYmluZGluZ3MvYW5ndWxhcjEvdmlld3MvbW9kYWwuanMiLCIuLi8uLi9iaW5kaW5ncy9hbmd1bGFyMS92aWV3cy9uYXZpZ2F0b3IuanMiLCIuLi8uLi9iaW5kaW5ncy9hbmd1bGFyMS92aWV3cy9wYWdlLmpzIiwiLi4vLi4vYmluZGluZ3MvYW5ndWxhcjEvdmlld3MvcG9wb3Zlci5qcyIsIi4uLy4uL2JpbmRpbmdzL2FuZ3VsYXIxL3ZpZXdzL3B1bGxIb29rLmpzIiwiLi4vLi4vYmluZGluZ3MvYW5ndWxhcjEvdmlld3Mvc3BlZWREaWFsLmpzIiwiLi4vLi4vYmluZGluZ3MvYW5ndWxhcjEvdmlld3Mvc3BsaXR0ZXJDb250ZW50LmpzIiwiLi4vLi4vYmluZGluZ3MvYW5ndWxhcjEvdmlld3Mvc3BsaXR0ZXJTaWRlLmpzIiwiLi4vLi4vYmluZGluZ3MvYW5ndWxhcjEvdmlld3Mvc3BsaXR0ZXIuanMiLCIuLi8uLi9iaW5kaW5ncy9hbmd1bGFyMS92aWV3cy9zd2l0Y2guanMiLCIuLi8uLi9iaW5kaW5ncy9hbmd1bGFyMS92aWV3cy90YWJiYXIuanMiLCIuLi8uLi9iaW5kaW5ncy9hbmd1bGFyMS92aWV3cy90b2FzdC5qcyIsIi4uLy4uL2JpbmRpbmdzL2FuZ3VsYXIxL2RpcmVjdGl2ZXMvYWN0aW9uU2hlZXRCdXR0b24uanMiLCIuLi8uLi9iaW5kaW5ncy9hbmd1bGFyMS9kaXJlY3RpdmVzL2FjdGlvblNoZWV0LmpzIiwiLi4vLi4vYmluZGluZ3MvYW5ndWxhcjEvZGlyZWN0aXZlcy9hbGVydERpYWxvZy5qcyIsIi4uLy4uL2JpbmRpbmdzL2FuZ3VsYXIxL2RpcmVjdGl2ZXMvYmFja0J1dHRvbi5qcyIsIi4uLy4uL2JpbmRpbmdzL2FuZ3VsYXIxL2RpcmVjdGl2ZXMvYm90dG9tVG9vbGJhci5qcyIsIi4uLy4uL2JpbmRpbmdzL2FuZ3VsYXIxL2RpcmVjdGl2ZXMvYnV0dG9uLmpzIiwiLi4vLi4vYmluZGluZ3MvYW5ndWxhcjEvZGlyZWN0aXZlcy9jYXJkLmpzIiwiLi4vLi4vYmluZGluZ3MvYW5ndWxhcjEvZGlyZWN0aXZlcy9jYXJvdXNlbC5qcyIsIi4uLy4uL2JpbmRpbmdzL2FuZ3VsYXIxL2RpcmVjdGl2ZXMvY2hlY2tib3guanMiLCIuLi8uLi9iaW5kaW5ncy9hbmd1bGFyMS9kaXJlY3RpdmVzL2RpYWxvZy5qcyIsIi4uLy4uL2JpbmRpbmdzL2FuZ3VsYXIxL2RpcmVjdGl2ZXMvZHVtbXlGb3JJbml0LmpzIiwiLi4vLi4vYmluZGluZ3MvYW5ndWxhcjEvZGlyZWN0aXZlcy9mYWIuanMiLCIuLi8uLi9iaW5kaW5ncy9hbmd1bGFyMS9kaXJlY3RpdmVzL2dlc3R1cmVEZXRlY3Rvci5qcyIsIi4uLy4uL2JpbmRpbmdzL2FuZ3VsYXIxL2RpcmVjdGl2ZXMvaWNvbi5qcyIsIi4uLy4uL2JpbmRpbmdzL2FuZ3VsYXIxL2RpcmVjdGl2ZXMvaWZPcmllbnRhdGlvbi5qcyIsIi4uLy4uL2JpbmRpbmdzL2FuZ3VsYXIxL2RpcmVjdGl2ZXMvaWZQbGF0Zm9ybS5qcyIsIi4uLy4uL2JpbmRpbmdzL2FuZ3VsYXIxL2RpcmVjdGl2ZXMvaW5wdXQuanMiLCIuLi8uLi9iaW5kaW5ncy9hbmd1bGFyMS9kaXJlY3RpdmVzL2tleWJvYXJkLmpzIiwiLi4vLi4vYmluZGluZ3MvYW5ndWxhcjEvZGlyZWN0aXZlcy9sYXp5UmVwZWF0LmpzIiwiLi4vLi4vYmluZGluZ3MvYW5ndWxhcjEvZGlyZWN0aXZlcy9saXN0SGVhZGVyLmpzIiwiLi4vLi4vYmluZGluZ3MvYW5ndWxhcjEvZGlyZWN0aXZlcy9saXN0SXRlbS5qcyIsIi4uLy4uL2JpbmRpbmdzL2FuZ3VsYXIxL2RpcmVjdGl2ZXMvbGlzdC5qcyIsIi4uLy4uL2JpbmRpbmdzL2FuZ3VsYXIxL2RpcmVjdGl2ZXMvbGlzdFRpdGxlLmpzIiwiLi4vLi4vYmluZGluZ3MvYW5ndWxhcjEvZGlyZWN0aXZlcy9sb2FkaW5nUGxhY2Vob2xkZXIuanMiLCIuLi8uLi9iaW5kaW5ncy9hbmd1bGFyMS9kaXJlY3RpdmVzL21vZGFsLmpzIiwiLi4vLi4vYmluZGluZ3MvYW5ndWxhcjEvZGlyZWN0aXZlcy9uYXZpZ2F0b3IuanMiLCIuLi8uLi9iaW5kaW5ncy9hbmd1bGFyMS9kaXJlY3RpdmVzL3BhZ2UuanMiLCIuLi8uLi9iaW5kaW5ncy9hbmd1bGFyMS9kaXJlY3RpdmVzL3BvcG92ZXIuanMiLCIuLi8uLi9iaW5kaW5ncy9hbmd1bGFyMS9kaXJlY3RpdmVzL3B1bGxIb29rLmpzIiwiLi4vLi4vYmluZGluZ3MvYW5ndWxhcjEvZGlyZWN0aXZlcy9yYWRpby5qcyIsIi4uLy4uL2JpbmRpbmdzL2FuZ3VsYXIxL2RpcmVjdGl2ZXMvcmFuZ2UuanMiLCIuLi8uLi9iaW5kaW5ncy9hbmd1bGFyMS9kaXJlY3RpdmVzL3JpcHBsZS5qcyIsIi4uLy4uL2JpbmRpbmdzL2FuZ3VsYXIxL2RpcmVjdGl2ZXMvc2NvcGUuanMiLCIuLi8uLi9iaW5kaW5ncy9hbmd1bGFyMS9kaXJlY3RpdmVzL3NlYXJjaElucHV0LmpzIiwiLi4vLi4vYmluZGluZ3MvYW5ndWxhcjEvZGlyZWN0aXZlcy9zZWdtZW50LmpzIiwiLi4vLi4vYmluZGluZ3MvYW5ndWxhcjEvZGlyZWN0aXZlcy9zZWxlY3QuanMiLCIuLi8uLi9iaW5kaW5ncy9hbmd1bGFyMS9kaXJlY3RpdmVzL3NwZWVkRGlhbC5qcyIsIi4uLy4uL2JpbmRpbmdzL2FuZ3VsYXIxL2RpcmVjdGl2ZXMvc3BsaXR0ZXJDb250ZW50LmpzIiwiLi4vLi4vYmluZGluZ3MvYW5ndWxhcjEvZGlyZWN0aXZlcy9zcGxpdHRlclNpZGUuanMiLCIuLi8uLi9iaW5kaW5ncy9hbmd1bGFyMS9kaXJlY3RpdmVzL3NwbGl0dGVyLmpzIiwiLi4vLi4vYmluZGluZ3MvYW5ndWxhcjEvZGlyZWN0aXZlcy9zd2l0Y2guanMiLCIuLi8uLi9iaW5kaW5ncy9hbmd1bGFyMS9kaXJlY3RpdmVzL3RhYmJhci5qcyIsIi4uLy4uL2JpbmRpbmdzL2FuZ3VsYXIxL2RpcmVjdGl2ZXMvdGFiLmpzIiwiLi4vLi4vYmluZGluZ3MvYW5ndWxhcjEvZGlyZWN0aXZlcy90ZW1wbGF0ZS5qcyIsIi4uLy4uL2JpbmRpbmdzL2FuZ3VsYXIxL2RpcmVjdGl2ZXMvdG9hc3QuanMiLCIuLi8uLi9iaW5kaW5ncy9hbmd1bGFyMS9kaXJlY3RpdmVzL3Rvb2xiYXJCdXR0b24uanMiLCIuLi8uLi9iaW5kaW5ncy9hbmd1bGFyMS9kaXJlY3RpdmVzL3Rvb2xiYXIuanMiLCIuLi8uLi9iaW5kaW5ncy9hbmd1bGFyMS9zZXJ2aWNlcy9vbnNlbi5qcyIsIi4uLy4uL2JpbmRpbmdzL2FuZ3VsYXIxL3NlcnZpY2VzL2NvbXBvbmVudENsZWFuZXIuanMiLCIuLi8uLi9iaW5kaW5ncy9hbmd1bGFyMS9qcy9zZXR1cC5qcyIsIi4uLy4uL2JpbmRpbmdzL2FuZ3VsYXIxL2pzL25vdGlmaWNhdGlvbi5qcyIsIi4uLy4uL2JpbmRpbmdzL2FuZ3VsYXIxL2pzL3RlbXBsYXRlTG9hZGVyLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIi8qIFNpbXBsZSBKYXZhU2NyaXB0IEluaGVyaXRhbmNlIGZvciBFUyA1LjFcbiAqIGJhc2VkIG9uIGh0dHA6Ly9lam9obi5vcmcvYmxvZy9zaW1wbGUtamF2YXNjcmlwdC1pbmhlcml0YW5jZS9cbiAqICAoaW5zcGlyZWQgYnkgYmFzZTIgYW5kIFByb3RvdHlwZSlcbiAqIE1JVCBMaWNlbnNlZC5cbiAqL1xuKGZ1bmN0aW9uKCkge1xuICBcInVzZSBzdHJpY3RcIjtcbiAgdmFyIGZuVGVzdCA9IC94eXovLnRlc3QoZnVuY3Rpb24oKXt4eXo7fSkgPyAvXFxiX3N1cGVyXFxiLyA6IC8uKi87XG5cbiAgLy8gVGhlIGJhc2UgQ2xhc3MgaW1wbGVtZW50YXRpb24gKGRvZXMgbm90aGluZylcbiAgZnVuY3Rpb24gQmFzZUNsYXNzKCl7fVxuXG4gIC8vIENyZWF0ZSBhIG5ldyBDbGFzcyB0aGF0IGluaGVyaXRzIGZyb20gdGhpcyBjbGFzc1xuICBCYXNlQ2xhc3MuZXh0ZW5kID0gZnVuY3Rpb24ocHJvcHMpIHtcbiAgICB2YXIgX3N1cGVyID0gdGhpcy5wcm90b3R5cGU7XG5cbiAgICAvLyBTZXQgdXAgdGhlIHByb3RvdHlwZSB0byBpbmhlcml0IGZyb20gdGhlIGJhc2UgY2xhc3NcbiAgICAvLyAoYnV0IHdpdGhvdXQgcnVubmluZyB0aGUgaW5pdCBjb25zdHJ1Y3RvcilcbiAgICB2YXIgcHJvdG8gPSBPYmplY3QuY3JlYXRlKF9zdXBlcik7XG5cbiAgICAvLyBDb3B5IHRoZSBwcm9wZXJ0aWVzIG92ZXIgb250byB0aGUgbmV3IHByb3RvdHlwZVxuICAgIGZvciAodmFyIG5hbWUgaW4gcHJvcHMpIHtcbiAgICAgIC8vIENoZWNrIGlmIHdlJ3JlIG92ZXJ3cml0aW5nIGFuIGV4aXN0aW5nIGZ1bmN0aW9uXG4gICAgICBwcm90b1tuYW1lXSA9IHR5cGVvZiBwcm9wc1tuYW1lXSA9PT0gXCJmdW5jdGlvblwiICYmXG4gICAgICAgIHR5cGVvZiBfc3VwZXJbbmFtZV0gPT0gXCJmdW5jdGlvblwiICYmIGZuVGVzdC50ZXN0KHByb3BzW25hbWVdKVxuICAgICAgICA/IChmdW5jdGlvbihuYW1lLCBmbil7XG4gICAgICAgICAgICByZXR1cm4gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgIHZhciB0bXAgPSB0aGlzLl9zdXBlcjtcblxuICAgICAgICAgICAgICAvLyBBZGQgYSBuZXcgLl9zdXBlcigpIG1ldGhvZCB0aGF0IGlzIHRoZSBzYW1lIG1ldGhvZFxuICAgICAgICAgICAgICAvLyBidXQgb24gdGhlIHN1cGVyLWNsYXNzXG4gICAgICAgICAgICAgIHRoaXMuX3N1cGVyID0gX3N1cGVyW25hbWVdO1xuXG4gICAgICAgICAgICAgIC8vIFRoZSBtZXRob2Qgb25seSBuZWVkIHRvIGJlIGJvdW5kIHRlbXBvcmFyaWx5LCBzbyB3ZVxuICAgICAgICAgICAgICAvLyByZW1vdmUgaXQgd2hlbiB3ZSdyZSBkb25lIGV4ZWN1dGluZ1xuICAgICAgICAgICAgICB2YXIgcmV0ID0gZm4uYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICAgICAgICAgICAgdGhpcy5fc3VwZXIgPSB0bXA7XG5cbiAgICAgICAgICAgICAgcmV0dXJuIHJldDtcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgfSkobmFtZSwgcHJvcHNbbmFtZV0pXG4gICAgICAgIDogcHJvcHNbbmFtZV07XG4gICAgfVxuXG4gICAgLy8gVGhlIG5ldyBjb25zdHJ1Y3RvclxuICAgIHZhciBuZXdDbGFzcyA9IHR5cGVvZiBwcm90by5pbml0ID09PSBcImZ1bmN0aW9uXCJcbiAgICAgID8gcHJvdG8uaGFzT3duUHJvcGVydHkoXCJpbml0XCIpXG4gICAgICAgID8gcHJvdG8uaW5pdCAvLyBBbGwgY29uc3RydWN0aW9uIGlzIGFjdHVhbGx5IGRvbmUgaW4gdGhlIGluaXQgbWV0aG9kXG4gICAgICAgIDogZnVuY3Rpb24gU3ViQ2xhc3MoKXsgX3N1cGVyLmluaXQuYXBwbHkodGhpcywgYXJndW1lbnRzKTsgfVxuICAgICAgOiBmdW5jdGlvbiBFbXB0eUNsYXNzKCl7fTtcblxuICAgIC8vIFBvcHVsYXRlIG91ciBjb25zdHJ1Y3RlZCBwcm90b3R5cGUgb2JqZWN0XG4gICAgbmV3Q2xhc3MucHJvdG90eXBlID0gcHJvdG87XG5cbiAgICAvLyBFbmZvcmNlIHRoZSBjb25zdHJ1Y3RvciB0byBiZSB3aGF0IHdlIGV4cGVjdFxuICAgIHByb3RvLmNvbnN0cnVjdG9yID0gbmV3Q2xhc3M7XG5cbiAgICAvLyBBbmQgbWFrZSB0aGlzIGNsYXNzIGV4dGVuZGFibGVcbiAgICBuZXdDbGFzcy5leHRlbmQgPSBCYXNlQ2xhc3MuZXh0ZW5kO1xuXG4gICAgcmV0dXJuIG5ld0NsYXNzO1xuICB9O1xuXG4gIC8vIGV4cG9ydFxuICB3aW5kb3cuQ2xhc3MgPSBCYXNlQ2xhc3M7XG59KSgpO1xuIiwiLypcbkNvcHlyaWdodCAyMDEzLTIwMTUgQVNJQUwgQ09SUE9SQVRJT05cblxuTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbnlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbllvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuXG4gICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcblxuVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG5TZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG5saW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cblxuKi9cblxuLyoqXG4gKiBAb2JqZWN0IG9uc1xuICogQGRlc2NyaXB0aW9uXG4gKiAgIFtqYV1PbnNlbiBVSeOBp+WIqeeUqOOBp+OBjeOCi+OCsOODreODvOODkOODq+OBquOCquODluOCuOOCp+OCr+ODiOOBp+OBmeOAguOBk+OBruOCquODluOCuOOCp+OCr+ODiOOBr+OAgUFuZ3VsYXJKU+OBruOCueOCs+ODvOODl+OBi+OCieWPgueFp+OBmeOCi+OBk+OBqOOBjOOBp+OBjeOBvuOBmeOAgiBbL2phXVxuICogICBbZW5dQSBnbG9iYWwgb2JqZWN0IHRoYXQncyB1c2VkIGluIE9uc2VuIFVJLiBUaGlzIG9iamVjdCBjYW4gYmUgcmVhY2hlZCBmcm9tIHRoZSBBbmd1bGFySlMgc2NvcGUuWy9lbl1cbiAqL1xuXG4oZnVuY3Rpb24ob25zKXtcbiAgJ3VzZSBzdHJpY3QnO1xuXG4gIHZhciBtb2R1bGUgPSBhbmd1bGFyLm1vZHVsZSgnb25zZW4nLCBbXSk7XG4gIGFuZ3VsYXIubW9kdWxlKCdvbnNlbi5kaXJlY3RpdmVzJywgWydvbnNlbiddKTsgLy8gZm9yIEJDXG5cbiAgLy8gSlMgR2xvYmFsIGZhY2FkZSBmb3IgT25zZW4gVUkuXG4gIGluaXRPbnNlbkZhY2FkZSgpO1xuICB3YWl0T25zZW5VSUxvYWQoKTtcbiAgaW5pdEFuZ3VsYXJNb2R1bGUoKTtcbiAgaW5pdFRlbXBsYXRlQ2FjaGUoKTtcblxuICBmdW5jdGlvbiB3YWl0T25zZW5VSUxvYWQoKSB7XG4gICAgdmFyIHVubG9ja09uc2VuVUkgPSBvbnMuX3JlYWR5TG9jay5sb2NrKCk7XG4gICAgbW9kdWxlLnJ1bihmdW5jdGlvbigkY29tcGlsZSwgJHJvb3RTY29wZSkge1xuICAgICAgLy8gZm9yIGluaXRpYWxpemF0aW9uIGhvb2suXG4gICAgICBpZiAoZG9jdW1lbnQucmVhZHlTdGF0ZSA9PT0gJ2xvYWRpbmcnIHx8IGRvY3VtZW50LnJlYWR5U3RhdGUgPT0gJ3VuaW5pdGlhbGl6ZWQnKSB7XG4gICAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdET01Db250ZW50TG9hZGVkJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdvbnMtZHVtbXktZm9yLWluaXQnKSk7XG4gICAgICAgIH0pO1xuICAgICAgfSBlbHNlIGlmIChkb2N1bWVudC5ib2R5KSB7XG4gICAgICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnb25zLWR1bW15LWZvci1pbml0JykpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdJbnZhbGlkIGluaXRpYWxpemF0aW9uIHN0YXRlLicpO1xuICAgICAgfVxuXG4gICAgICAkcm9vdFNjb3BlLiRvbignJG9ucy1yZWFkeScsIHVubG9ja09uc2VuVUkpO1xuICAgIH0pO1xuICB9XG5cbiAgZnVuY3Rpb24gaW5pdEFuZ3VsYXJNb2R1bGUoKSB7XG4gICAgbW9kdWxlLnZhbHVlKCckb25zR2xvYmFsJywgb25zKTtcbiAgICBtb2R1bGUucnVuKGZ1bmN0aW9uKCRjb21waWxlLCAkcm9vdFNjb3BlLCAkb25zZW4sICRxKSB7XG4gICAgICBvbnMuX29uc2VuU2VydmljZSA9ICRvbnNlbjtcbiAgICAgIG9ucy5fcVNlcnZpY2UgPSAkcTtcblxuICAgICAgJHJvb3RTY29wZS5vbnMgPSB3aW5kb3cub25zO1xuICAgICAgJHJvb3RTY29wZS5jb25zb2xlID0gd2luZG93LmNvbnNvbGU7XG4gICAgICAkcm9vdFNjb3BlLmFsZXJ0ID0gd2luZG93LmFsZXJ0O1xuXG4gICAgICBvbnMuJGNvbXBpbGUgPSAkY29tcGlsZTtcbiAgICB9KTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGluaXRUZW1wbGF0ZUNhY2hlKCkge1xuICAgIG1vZHVsZS5ydW4oZnVuY3Rpb24oJHRlbXBsYXRlQ2FjaGUpIHtcbiAgICAgIGNvbnN0IHRtcCA9IG9ucy5faW50ZXJuYWwuZ2V0VGVtcGxhdGVIVE1MQXN5bmM7XG5cbiAgICAgIG9ucy5faW50ZXJuYWwuZ2V0VGVtcGxhdGVIVE1MQXN5bmMgPSAocGFnZSkgPT4ge1xuICAgICAgICBjb25zdCBjYWNoZSA9ICR0ZW1wbGF0ZUNhY2hlLmdldChwYWdlKTtcblxuICAgICAgICBpZiAoY2FjaGUpIHtcbiAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKGNhY2hlKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICByZXR1cm4gdG1wKHBhZ2UpO1xuICAgICAgICB9XG4gICAgICB9O1xuICAgIH0pO1xuICB9XG5cbiAgZnVuY3Rpb24gaW5pdE9uc2VuRmFjYWRlKCkge1xuICAgIG9ucy5fb25zZW5TZXJ2aWNlID0gbnVsbDtcblxuICAgIC8vIE9iamVjdCB0byBhdHRhY2ggY29tcG9uZW50IHZhcmlhYmxlcyB0byB3aGVuIHVzaW5nIHRoZSB2YXI9XCIuLi5cIiBhdHRyaWJ1dGUuXG4gICAgLy8gQ2FuIGJlIHNldCB0byBudWxsIHRvIGF2b2lkIHBvbGx1dGluZyB0aGUgZ2xvYmFsIHNjb3BlLlxuICAgIG9ucy5jb21wb25lbnRCYXNlID0gd2luZG93O1xuXG4gICAgLyoqXG4gICAgICogQG1ldGhvZCBib290c3RyYXBcbiAgICAgKiBAc2lnbmF0dXJlIGJvb3RzdHJhcChbbW9kdWxlTmFtZSwgW2RlcGVuZGVuY2llc11dKVxuICAgICAqIEBkZXNjcmlwdGlvblxuICAgICAqICAgW2phXU9uc2VuIFVJ44Gu5Yid5pyf5YyW44KS6KGM44GE44G+44GZ44CCQW5ndWxhci5qc+OBrm5nLWFwcOWxnuaAp+OCkuWIqeeUqOOBmeOCi+OBk+OBqOeEoeOBl+OBq09uc2VuIFVJ44KS6Kqt44G/6L6844KT44Gn5Yid5pyf5YyW44GX44Gm44GP44KM44G+44GZ44CCWy9qYV1cbiAgICAgKiAgIFtlbl1Jbml0aWFsaXplIE9uc2VuIFVJLiBDYW4gYmUgdXNlZCB0byBsb2FkIE9uc2VuIFVJIHdpdGhvdXQgdXNpbmcgdGhlIDxjb2RlPm5nLWFwcDwvY29kZT4gYXR0cmlidXRlIGZyb20gQW5ndWxhckpTLlsvZW5dXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IFttb2R1bGVOYW1lXVxuICAgICAqICAgW2VuXUFuZ3VsYXJKUyBtb2R1bGUgbmFtZS5bL2VuXVxuICAgICAqICAgW2phXUFuZ3VsYXIuanPjgafjga7jg6Ljgrjjg6Xjg7zjg6vlkI1bL2phXVxuICAgICAqIEBwYXJhbSB7QXJyYXl9IFtkZXBlbmRlbmNpZXNdXG4gICAgICogICBbZW5dTGlzdCBvZiBBbmd1bGFySlMgbW9kdWxlIGRlcGVuZGVuY2llcy5bL2VuXVxuICAgICAqICAgW2phXeS+neWtmOOBmeOCi0FuZ3VsYXIuanPjga7jg6Ljgrjjg6Xjg7zjg6vlkI3jga7phY3liJdbL2phXVxuICAgICAqIEByZXR1cm4ge09iamVjdH1cbiAgICAgKiAgIFtlbl1BbiBBbmd1bGFySlMgbW9kdWxlIG9iamVjdC5bL2VuXVxuICAgICAqICAgW2phXUFuZ3VsYXJKU+OBrk1vZHVsZeOCquODluOCuOOCp+OCr+ODiOOCkuihqOOBl+OBvuOBmeOAglsvamFdXG4gICAgICovXG4gICAgb25zLmJvb3RzdHJhcCA9IGZ1bmN0aW9uKG5hbWUsIGRlcHMpIHtcbiAgICAgIGlmIChhbmd1bGFyLmlzQXJyYXkobmFtZSkpIHtcbiAgICAgICAgZGVwcyA9IG5hbWU7XG4gICAgICAgIG5hbWUgPSB1bmRlZmluZWQ7XG4gICAgICB9XG5cbiAgICAgIGlmICghbmFtZSkge1xuICAgICAgICBuYW1lID0gJ215T25zZW5BcHAnO1xuICAgICAgfVxuXG4gICAgICBkZXBzID0gWydvbnNlbiddLmNvbmNhdChhbmd1bGFyLmlzQXJyYXkoZGVwcykgPyBkZXBzIDogW10pO1xuICAgICAgdmFyIG1vZHVsZSA9IGFuZ3VsYXIubW9kdWxlKG5hbWUsIGRlcHMpO1xuXG4gICAgICB2YXIgZG9jID0gd2luZG93LmRvY3VtZW50O1xuICAgICAgaWYgKGRvYy5yZWFkeVN0YXRlID09ICdsb2FkaW5nJyB8fCBkb2MucmVhZHlTdGF0ZSA9PSAndW5pbml0aWFsaXplZCcgfHwgZG9jLnJlYWR5U3RhdGUgPT0gJ2ludGVyYWN0aXZlJykge1xuICAgICAgICBkb2MuYWRkRXZlbnRMaXN0ZW5lcignRE9NQ29udGVudExvYWRlZCcsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgIGFuZ3VsYXIuYm9vdHN0cmFwKGRvYy5kb2N1bWVudEVsZW1lbnQsIFtuYW1lXSk7XG4gICAgICAgIH0sIGZhbHNlKTtcbiAgICAgIH0gZWxzZSBpZiAoZG9jLmRvY3VtZW50RWxlbWVudCkge1xuICAgICAgICBhbmd1bGFyLmJvb3RzdHJhcChkb2MuZG9jdW1lbnRFbGVtZW50LCBbbmFtZV0pO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdJbnZhbGlkIHN0YXRlJyk7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBtb2R1bGU7XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIEBtZXRob2QgZmluZFBhcmVudENvbXBvbmVudFVudGlsXG4gICAgICogQHNpZ25hdHVyZSBmaW5kUGFyZW50Q29tcG9uZW50VW50aWwobmFtZSwgW2RvbV0pXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IG5hbWVcbiAgICAgKiAgIFtlbl1OYW1lIG9mIGNvbXBvbmVudCwgaS5lLiAnb25zLXBhZ2UnLlsvZW5dXG4gICAgICogICBbamFd44Kz44Oz44Od44O844ON44Oz44OI5ZCN44KS5oyH5a6a44GX44G+44GZ44CC5L6L44GI44Gwb25zLXBhZ2XjgarjganjgpLmjIflrprjgZfjgb7jgZnjgIJbL2phXVxuICAgICAqIEBwYXJhbSB7T2JqZWN0L2pxTGl0ZS9IVE1MRWxlbWVudH0gW2RvbV1cbiAgICAgKiAgIFtlbl0kZXZlbnQsIGpxTGl0ZSBvciBIVE1MRWxlbWVudCBvYmplY3QuWy9lbl1cbiAgICAgKiAgIFtqYV0kZXZlbnTjgqrjg5bjgrjjgqfjgq/jg4jjgIFqcUxpdGXjgqrjg5bjgrjjgqfjgq/jg4jjgIFIVE1MRWxlbWVudOOCquODluOCuOOCp+OCr+ODiOOBruOBhOOBmuOCjOOBi+OCkuaMh+WumuOBp+OBjeOBvuOBmeOAglsvamFdXG4gICAgICogQHJldHVybiB7T2JqZWN0fVxuICAgICAqICAgW2VuXUNvbXBvbmVudCBvYmplY3QuIFdpbGwgcmV0dXJuIG51bGwgaWYgbm8gY29tcG9uZW50IHdhcyBmb3VuZC5bL2VuXVxuICAgICAqICAgW2phXeOCs+ODs+ODneODvOODjeODs+ODiOOBruOCquODluOCuOOCp+OCr+ODiOOCkui/lOOBl+OBvuOBmeOAguOCguOBl+OCs+ODs+ODneODvOODjeODs+ODiOOBjOimi+OBpOOBi+OCieOBquOBi+OBo+OBn+WgtOWQiOOBq+OBr251bGzjgpLov5TjgZfjgb7jgZnjgIJbL2phXVxuICAgICAqIEBkZXNjcmlwdGlvblxuICAgICAqICAgW2VuXUZpbmQgcGFyZW50IGNvbXBvbmVudCBvYmplY3Qgb2YgPGNvZGU+ZG9tPC9jb2RlPiBlbGVtZW50LlsvZW5dXG4gICAgICogICBbamFd5oyH5a6a44GV44KM44GfZG9t5byV5pWw44Gu6Kaq6KaB57Sg44KS44Gf44Gp44Gj44Gm44Kz44Oz44Od44O844ON44Oz44OI44KS5qSc57Si44GX44G+44GZ44CCWy9qYV1cbiAgICAgKi9cbiAgICBvbnMuZmluZFBhcmVudENvbXBvbmVudFVudGlsID0gZnVuY3Rpb24obmFtZSwgZG9tKSB7XG4gICAgICB2YXIgZWxlbWVudDtcbiAgICAgIGlmIChkb20gaW5zdGFuY2VvZiBIVE1MRWxlbWVudCkge1xuICAgICAgICBlbGVtZW50ID0gYW5ndWxhci5lbGVtZW50KGRvbSk7XG4gICAgICB9IGVsc2UgaWYgKGRvbSBpbnN0YW5jZW9mIGFuZ3VsYXIuZWxlbWVudCkge1xuICAgICAgICBlbGVtZW50ID0gZG9tO1xuICAgICAgfSBlbHNlIGlmIChkb20udGFyZ2V0KSB7XG4gICAgICAgIGVsZW1lbnQgPSBhbmd1bGFyLmVsZW1lbnQoZG9tLnRhcmdldCk7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBlbGVtZW50LmluaGVyaXRlZERhdGEobmFtZSk7XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIEBtZXRob2QgZmluZENvbXBvbmVudFxuICAgICAqIEBzaWduYXR1cmUgZmluZENvbXBvbmVudChzZWxlY3RvciwgW2RvbV0pXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IHNlbGVjdG9yXG4gICAgICogICBbZW5dQ1NTIHNlbGVjdG9yWy9lbl1cbiAgICAgKiAgIFtqYV1DU1Pjgrvjg6zjgq/jgr/jg7zjgpLmjIflrprjgZfjgb7jgZnjgIJbL2phXVxuICAgICAqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IFtkb21dXG4gICAgICogICBbZW5dRE9NIGVsZW1lbnQgdG8gc2VhcmNoIGZyb20uWy9lbl1cbiAgICAgKiAgIFtqYV3mpJzntKLlr77osaHjgajjgZnjgotET03opoHntKDjgpLmjIflrprjgZfjgb7jgZnjgIJbL2phXVxuICAgICAqIEByZXR1cm4ge09iamVjdC9udWxsfVxuICAgICAqICAgW2VuXUNvbXBvbmVudCBvYmplY3QuIFdpbGwgcmV0dXJuIG51bGwgaWYgbm8gY29tcG9uZW50IHdhcyBmb3VuZC5bL2VuXVxuICAgICAqICAgW2phXeOCs+ODs+ODneODvOODjeODs+ODiOOBruOCquODluOCuOOCp+OCr+ODiOOCkui/lOOBl+OBvuOBmeOAguOCguOBl+OCs+ODs+ODneODvOODjeODs+ODiOOBjOimi+OBpOOBi+OCieOBquOBi+OBo+OBn+WgtOWQiOOBq+OBr251bGzjgpLov5TjgZfjgb7jgZnjgIJbL2phXVxuICAgICAqIEBkZXNjcmlwdGlvblxuICAgICAqICAgW2VuXUZpbmQgY29tcG9uZW50IG9iamVjdCB1c2luZyBDU1Mgc2VsZWN0b3IuWy9lbl1cbiAgICAgKiAgIFtqYV1DU1Pjgrvjg6zjgq/jgr/jgpLkvb/jgaPjgabjgrPjg7Pjg53jg7zjg43jg7Pjg4jjga7jgqrjg5bjgrjjgqfjgq/jg4jjgpLmpJzntKLjgZfjgb7jgZnjgIJbL2phXVxuICAgICAqL1xuICAgIG9ucy5maW5kQ29tcG9uZW50ID0gZnVuY3Rpb24oc2VsZWN0b3IsIGRvbSkge1xuICAgICAgdmFyIHRhcmdldCA9IChkb20gPyBkb20gOiBkb2N1bWVudCkucXVlcnlTZWxlY3RvcihzZWxlY3Rvcik7XG4gICAgICByZXR1cm4gdGFyZ2V0ID8gYW5ndWxhci5lbGVtZW50KHRhcmdldCkuZGF0YSh0YXJnZXQubm9kZU5hbWUudG9Mb3dlckNhc2UoKSkgfHwgbnVsbCA6IG51bGw7XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIEBtZXRob2QgY29tcGlsZVxuICAgICAqIEBzaWduYXR1cmUgY29tcGlsZShkb20pXG4gICAgICogQHBhcmFtIHtIVE1MRWxlbWVudH0gZG9tXG4gICAgICogICBbZW5dRWxlbWVudCB0byBjb21waWxlLlsvZW5dXG4gICAgICogICBbamFd44Kz44Oz44OR44Kk44Or44GZ44KL6KaB57Sg44KS5oyH5a6a44GX44G+44GZ44CCWy9qYV1cbiAgICAgKiBAZGVzY3JpcHRpb25cbiAgICAgKiAgIFtlbl1Db21waWxlIE9uc2VuIFVJIGNvbXBvbmVudHMuWy9lbl1cbiAgICAgKiAgIFtqYV3pgJrluLjjga5IVE1M44Gu6KaB57Sg44KST25zZW4gVUnjga7jgrPjg7Pjg53jg7zjg43jg7Pjg4jjgavjgrPjg7Pjg5HjgqTjg6vjgZfjgb7jgZnjgIJbL2phXVxuICAgICAqL1xuICAgIG9ucy5jb21waWxlID0gZnVuY3Rpb24oZG9tKSB7XG4gICAgICBpZiAoIW9ucy4kY29tcGlsZSkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ29ucy4kY29tcGlsZSgpIGlzIG5vdCByZWFkeS4gV2FpdCBmb3IgaW5pdGlhbGl6YXRpb24gd2l0aCBvbnMucmVhZHkoKS4nKTtcbiAgICAgIH1cblxuICAgICAgaWYgKCEoZG9tIGluc3RhbmNlb2YgSFRNTEVsZW1lbnQpKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcignRmlyc3QgYXJndW1lbnQgbXVzdCBiZSBhbiBpbnN0YW5jZSBvZiBIVE1MRWxlbWVudC4nKTtcbiAgICAgIH1cblxuICAgICAgdmFyIHNjb3BlID0gYW5ndWxhci5lbGVtZW50KGRvbSkuc2NvcGUoKTtcbiAgICAgIGlmICghc2NvcGUpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdBbmd1bGFySlMgU2NvcGUgaXMgbnVsbC4gQXJndW1lbnQgRE9NIGVsZW1lbnQgbXVzdCBiZSBhdHRhY2hlZCBpbiBET00gZG9jdW1lbnQuJyk7XG4gICAgICB9XG5cbiAgICAgIG9ucy4kY29tcGlsZShkb20pKHNjb3BlKTtcbiAgICB9O1xuXG4gICAgb25zLl9nZXRPbnNlblNlcnZpY2UgPSBmdW5jdGlvbigpIHtcbiAgICAgIGlmICghdGhpcy5fb25zZW5TZXJ2aWNlKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcignJG9uc2VuIGlzIG5vdCBsb2FkZWQsIHdhaXQgZm9yIG9ucy5yZWFkeSgpLicpO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gdGhpcy5fb25zZW5TZXJ2aWNlO1xuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gZWxlbWVudE5hbWVcbiAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBsYXN0UmVhZHlcbiAgICAgKiBAcmV0dXJuIHtGdW5jdGlvbn1cbiAgICAgKi9cbiAgICBvbnMuX3dhaXREaXJldGl2ZUluaXQgPSBmdW5jdGlvbihlbGVtZW50TmFtZSwgbGFzdFJlYWR5KSB7XG4gICAgICByZXR1cm4gZnVuY3Rpb24oZWxlbWVudCwgY2FsbGJhY2spIHtcbiAgICAgICAgaWYgKGFuZ3VsYXIuZWxlbWVudChlbGVtZW50KS5kYXRhKGVsZW1lbnROYW1lKSkge1xuICAgICAgICAgIGxhc3RSZWFkeShlbGVtZW50LCBjYWxsYmFjayk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdmFyIGxpc3RlbiA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgbGFzdFJlYWR5KGVsZW1lbnQsIGNhbGxiYWNrKTtcbiAgICAgICAgICAgIGVsZW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcihlbGVtZW50TmFtZSArICc6aW5pdCcsIGxpc3RlbiwgZmFsc2UpO1xuICAgICAgICAgIH07XG4gICAgICAgICAgZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKGVsZW1lbnROYW1lICsgJzppbml0JywgbGlzdGVuLCBmYWxzZSk7XG4gICAgICAgIH1cbiAgICAgIH07XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIEBtZXRob2QgY3JlYXRlRWxlbWVudFxuICAgICAqIEBzaWduYXR1cmUgY3JlYXRlRWxlbWVudCh0ZW1wbGF0ZSwgW29wdGlvbnNdKVxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSB0ZW1wbGF0ZVxuICAgICAqICAgW2VuXUVpdGhlciBhbiBIVE1MIGZpbGUgcGF0aCwgYW4gYDxvbnMtdGVtcGxhdGU+YCBpZCBvciBhbiBIVE1MIHN0cmluZyBzdWNoIGFzIGAnPGRpdiBpZD1cImZvb1wiPmhvZ2U8L2Rpdj4nYC5bL2VuXVxuICAgICAqICAgW2phXVsvamFdXG4gICAgICogQHBhcmFtIHtPYmplY3R9IFtvcHRpb25zXVxuICAgICAqICAgW2VuXVBhcmFtZXRlciBvYmplY3QuWy9lbl1cbiAgICAgKiAgIFtqYV3jgqrjg5fjgrfjg6fjg7PjgpLmjIflrprjgZnjgovjgqrjg5bjgrjjgqfjgq/jg4jjgIJbL2phXVxuICAgICAqIEBwYXJhbSB7Qm9vbGVhbnxIVE1MRWxlbWVudH0gW29wdGlvbnMuYXBwZW5kXVxuICAgICAqICAgW2VuXVdoZXRoZXIgb3Igbm90IHRoZSBlbGVtZW50IHNob3VsZCBiZSBhdXRvbWF0aWNhbGx5IGFwcGVuZGVkIHRvIHRoZSBET00uICBEZWZhdWx0cyB0byBgZmFsc2VgLiBJZiBgdHJ1ZWAgdmFsdWUgaXMgZ2l2ZW4sIGBkb2N1bWVudC5ib2R5YCB3aWxsIGJlIHVzZWQgYXMgdGhlIHRhcmdldC5bL2VuXVxuICAgICAqICAgW2phXVsvamFdXG4gICAgICogQHBhcmFtIHtIVE1MRWxlbWVudH0gW29wdGlvbnMuaW5zZXJ0QmVmb3JlXVxuICAgICAqICAgW2VuXVJlZmVyZW5jZSBub2RlIHRoYXQgYmVjb21lcyB0aGUgbmV4dCBzaWJsaW5nIG9mIHRoZSBuZXcgbm9kZSAoYG9wdGlvbnMuYXBwZW5kYCBlbGVtZW50KS5bL2VuXVxuICAgICAqICAgW2phXVsvamFdXG4gICAgICogQHBhcmFtIHtPYmplY3R9IFtvcHRpb25zLnBhcmVudFNjb3BlXVxuICAgICAqICAgW2VuXVBhcmVudCBzY29wZSBvZiB0aGUgZWxlbWVudC4gVXNlZCB0byBiaW5kIG1vZGVscyBhbmQgYWNjZXNzIHNjb3BlIG1ldGhvZHMgZnJvbSB0aGUgZWxlbWVudC4gUmVxdWlyZXMgYXBwZW5kIG9wdGlvbi5bL2VuXVxuICAgICAqICAgW2phXVsvamFdXG4gICAgICogQHJldHVybiB7SFRNTEVsZW1lbnR8UHJvbWlzZX1cbiAgICAgKiAgIFtlbl1JZiB0aGUgcHJvdmlkZWQgdGVtcGxhdGUgd2FzIGFuIGlubGluZSBIVE1MIHN0cmluZywgaXQgcmV0dXJucyB0aGUgbmV3IGVsZW1lbnQuIE90aGVyd2lzZSwgaXQgcmV0dXJucyBhIHByb21pc2UgdGhhdCByZXNvbHZlcyB0byB0aGUgbmV3IGVsZW1lbnQuWy9lbl1cbiAgICAgKiAgIFtqYV1bL2phXVxuICAgICAqIEBkZXNjcmlwdGlvblxuICAgICAqICAgW2VuXUNyZWF0ZSBhIG5ldyBlbGVtZW50IGZyb20gYSB0ZW1wbGF0ZS4gQm90aCBpbmxpbmUgSFRNTCBhbmQgZXh0ZXJuYWwgZmlsZXMgYXJlIHN1cHBvcnRlZCBhbHRob3VnaCB0aGUgcmV0dXJuIHZhbHVlIGRpZmZlcnMuIElmIHRoZSBlbGVtZW50IGlzIGFwcGVuZGVkIGl0IHdpbGwgYWxzbyBiZSBjb21waWxlZCBieSBBbmd1bGFySlMgKG90aGVyd2lzZSwgYG9ucy5jb21waWxlYCBzaG91bGQgYmUgbWFudWFsbHkgdXNlZCkuWy9lbl1cbiAgICAgKiAgIFtqYV1bL2phXVxuICAgICAqL1xuICAgIGNvbnN0IGNyZWF0ZUVsZW1lbnRPcmlnaW5hbCA9IG9ucy5jcmVhdGVFbGVtZW50O1xuICAgIG9ucy5jcmVhdGVFbGVtZW50ID0gKHRlbXBsYXRlLCBvcHRpb25zID0ge30pID0+IHtcbiAgICAgIGNvbnN0IGxpbmsgPSBlbGVtZW50ID0+IHtcbiAgICAgICAgaWYgKG9wdGlvbnMucGFyZW50U2NvcGUpIHtcbiAgICAgICAgICBvbnMuJGNvbXBpbGUoYW5ndWxhci5lbGVtZW50KGVsZW1lbnQpKShvcHRpb25zLnBhcmVudFNjb3BlLiRuZXcoKSk7XG4gICAgICAgICAgb3B0aW9ucy5wYXJlbnRTY29wZS4kZXZhbEFzeW5jKCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgb25zLmNvbXBpbGUoZWxlbWVudCk7XG4gICAgICAgIH1cbiAgICAgIH07XG5cbiAgICAgIGNvbnN0IGdldFNjb3BlID0gZSA9PiBhbmd1bGFyLmVsZW1lbnQoZSkuZGF0YShlLnRhZ05hbWUudG9Mb3dlckNhc2UoKSkgfHwgZTtcbiAgICAgIGNvbnN0IHJlc3VsdCA9IGNyZWF0ZUVsZW1lbnRPcmlnaW5hbCh0ZW1wbGF0ZSwgeyBhcHBlbmQ6ICEhb3B0aW9ucy5wYXJlbnRTY29wZSwgbGluaywgLi4ub3B0aW9ucyB9KTtcblxuICAgICAgcmV0dXJuIHJlc3VsdCBpbnN0YW5jZW9mIFByb21pc2UgPyByZXN1bHQudGhlbihnZXRTY29wZSkgOiBnZXRTY29wZShyZXN1bHQpO1xuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBAbWV0aG9kIGNyZWF0ZUFsZXJ0RGlhbG9nXG4gICAgICogQHNpZ25hdHVyZSBjcmVhdGVBbGVydERpYWxvZyhwYWdlLCBbb3B0aW9uc10pXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IHBhZ2VcbiAgICAgKiAgIFtlbl1QYWdlIG5hbWUuIENhbiBiZSBlaXRoZXIgYW4gSFRNTCBmaWxlIG9yIGFuIDxvbnMtdGVtcGxhdGU+IGNvbnRhaW5pbmcgYSA8b25zLWFsZXJ0LWRpYWxvZz4gY29tcG9uZW50LlsvZW5dXG4gICAgICogICBbamFdcGFnZeOBrlVSTOOBi+OAgeOCguOBl+OBj+OBr29ucy10ZW1wbGF0ZeOBp+Wuo+iogOOBl+OBn+ODhuODs+ODl+ODrOODvOODiOOBrmlk5bGe5oCn44Gu5YCk44KS5oyH5a6a44Gn44GN44G+44GZ44CCWy9qYV1cbiAgICAgKiBAcGFyYW0ge09iamVjdH0gW29wdGlvbnNdXG4gICAgICogICBbZW5dUGFyYW1ldGVyIG9iamVjdC5bL2VuXVxuICAgICAqICAgW2phXeOCquODl+OCt+ODp+ODs+OCkuaMh+WumuOBmeOCi+OCquODluOCuOOCp+OCr+ODiOOAglsvamFdXG4gICAgICogQHBhcmFtIHtPYmplY3R9IFtvcHRpb25zLnBhcmVudFNjb3BlXVxuICAgICAqICAgW2VuXVBhcmVudCBzY29wZSBvZiB0aGUgZGlhbG9nLiBVc2VkIHRvIGJpbmQgbW9kZWxzIGFuZCBhY2Nlc3Mgc2NvcGUgbWV0aG9kcyBmcm9tIHRoZSBkaWFsb2cuWy9lbl1cbiAgICAgKiAgIFtqYV3jg4DjgqTjgqLjg63jgrDlhoXjgafliKnnlKjjgZnjgovopqrjgrnjgrPjg7zjg5fjgpLmjIflrprjgZfjgb7jgZnjgILjg4DjgqTjgqLjg63jgrDjgYvjgonjg6Ljg4fjg6vjgoTjgrnjgrPjg7zjg5fjga7jg6Hjgr3jg4Pjg4njgavjgqLjgq/jgrvjgrnjgZnjgovjga7jgavkvb/jgYTjgb7jgZnjgILjgZPjga7jg5Hjg6njg6Hjg7zjgr/jga9Bbmd1bGFySlPjg5DjgqTjg7Pjg4fjgqPjg7PjgrDjgafjga7jgb/liKnnlKjjgafjgY3jgb7jgZnjgIJbL2phXVxuICAgICAqIEByZXR1cm4ge1Byb21pc2V9XG4gICAgICogICBbZW5dUHJvbWlzZSBvYmplY3QgdGhhdCByZXNvbHZlcyB0byB0aGUgYWxlcnQgZGlhbG9nIGNvbXBvbmVudCBvYmplY3QuWy9lbl1cbiAgICAgKiAgIFtqYV3jg4DjgqTjgqLjg63jgrDjga7jgrPjg7Pjg53jg7zjg43jg7Pjg4jjgqrjg5bjgrjjgqfjgq/jg4jjgpLop6PmsbrjgZnjgotQcm9taXNl44Kq44OW44K444Kn44Kv44OI44KS6L+U44GX44G+44GZ44CCWy9qYV1cbiAgICAgKiBAZGVzY3JpcHRpb25cbiAgICAgKiAgIFtlbl1DcmVhdGUgYSBhbGVydCBkaWFsb2cgaW5zdGFuY2UgZnJvbSBhIHRlbXBsYXRlLiBUaGlzIG1ldGhvZCB3aWxsIGJlIGRlcHJlY2F0ZWQgaW4gZmF2b3Igb2YgYG9ucy5jcmVhdGVFbGVtZW50YC5bL2VuXVxuICAgICAqICAgW2phXeODhuODs+ODl+ODrOODvOODiOOBi+OCieOCouODqeODvOODiOODgOOCpOOCouODreOCsOOBruOCpOODs+OCueOCv+ODs+OCueOCkueUn+aIkOOBl+OBvuOBmeOAglsvamFdXG4gICAgICovXG5cbiAgICAvKipcbiAgICAgKiBAbWV0aG9kIGNyZWF0ZURpYWxvZ1xuICAgICAqIEBzaWduYXR1cmUgY3JlYXRlRGlhbG9nKHBhZ2UsIFtvcHRpb25zXSlcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gcGFnZVxuICAgICAqICAgW2VuXVBhZ2UgbmFtZS4gQ2FuIGJlIGVpdGhlciBhbiBIVE1MIGZpbGUgb3IgYW4gPG9ucy10ZW1wbGF0ZT4gY29udGFpbmluZyBhIDxvbnMtZGlhbG9nPiBjb21wb25lbnQuWy9lbl1cbiAgICAgKiAgIFtqYV1wYWdl44GuVVJM44GL44CB44KC44GX44GP44Gvb25zLXRlbXBsYXRl44Gn5a6j6KiA44GX44Gf44OG44Oz44OX44Os44O844OI44GuaWTlsZ7mgKfjga7lgKTjgpLmjIflrprjgafjgY3jgb7jgZnjgIJbL2phXVxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBbb3B0aW9uc11cbiAgICAgKiAgIFtlbl1QYXJhbWV0ZXIgb2JqZWN0LlsvZW5dXG4gICAgICogICBbamFd44Kq44OX44K344On44Oz44KS5oyH5a6a44GZ44KL44Kq44OW44K444Kn44Kv44OI44CCWy9qYV1cbiAgICAgKiBAcGFyYW0ge09iamVjdH0gW29wdGlvbnMucGFyZW50U2NvcGVdXG4gICAgICogICBbZW5dUGFyZW50IHNjb3BlIG9mIHRoZSBkaWFsb2cuIFVzZWQgdG8gYmluZCBtb2RlbHMgYW5kIGFjY2VzcyBzY29wZSBtZXRob2RzIGZyb20gdGhlIGRpYWxvZy5bL2VuXVxuICAgICAqICAgW2phXeODgOOCpOOCouODreOCsOWGheOBp+WIqeeUqOOBmeOCi+imquOCueOCs+ODvOODl+OCkuaMh+WumuOBl+OBvuOBmeOAguODgOOCpOOCouODreOCsOOBi+OCieODouODh+ODq+OChOOCueOCs+ODvOODl+OBruODoeOCveODg+ODieOBq+OCouOCr+OCu+OCueOBmeOCi+OBruOBq+S9v+OBhOOBvuOBmeOAguOBk+OBruODkeODqeODoeODvOOCv+OBr0FuZ3VsYXJKU+ODkOOCpOODs+ODh+OCo+ODs+OCsOOBp+OBruOBv+WIqeeUqOOBp+OBjeOBvuOBmeOAglsvamFdXG4gICAgICogQHJldHVybiB7UHJvbWlzZX1cbiAgICAgKiAgIFtlbl1Qcm9taXNlIG9iamVjdCB0aGF0IHJlc29sdmVzIHRvIHRoZSBkaWFsb2cgY29tcG9uZW50IG9iamVjdC5bL2VuXVxuICAgICAqICAgW2phXeODgOOCpOOCouODreOCsOOBruOCs+ODs+ODneODvOODjeODs+ODiOOCquODluOCuOOCp+OCr+ODiOOCkuino+axuuOBmeOCi1Byb21pc2Xjgqrjg5bjgrjjgqfjgq/jg4jjgpLov5TjgZfjgb7jgZnjgIJbL2phXVxuICAgICAqIEBkZXNjcmlwdGlvblxuICAgICAqICAgW2VuXUNyZWF0ZSBhIGRpYWxvZyBpbnN0YW5jZSBmcm9tIGEgdGVtcGxhdGUuIFRoaXMgbWV0aG9kIHdpbGwgYmUgZGVwcmVjYXRlZCBpbiBmYXZvciBvZiBgb25zLmNyZWF0ZUVsZW1lbnRgLlsvZW5dXG4gICAgICogICBbamFd44OG44Oz44OX44Os44O844OI44GL44KJ44OA44Kk44Ki44Ot44Kw44Gu44Kk44Oz44K544K/44Oz44K544KS55Sf5oiQ44GX44G+44GZ44CCWy9qYV1cbiAgICAgKi9cblxuICAgIC8qKlxuICAgICAqIEBtZXRob2QgY3JlYXRlUG9wb3ZlclxuICAgICAqIEBzaWduYXR1cmUgY3JlYXRlUG9wb3ZlcihwYWdlLCBbb3B0aW9uc10pXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IHBhZ2VcbiAgICAgKiAgIFtlbl1QYWdlIG5hbWUuIENhbiBiZSBlaXRoZXIgYW4gSFRNTCBmaWxlIG9yIGFuIDxvbnMtdGVtcGxhdGU+IGNvbnRhaW5pbmcgYSA8b25zLWRpYWxvZz4gY29tcG9uZW50LlsvZW5dXG4gICAgICogICBbamFdcGFnZeOBrlVSTOOBi+OAgeOCguOBl+OBj+OBr29ucy10ZW1wbGF0ZeOBp+Wuo+iogOOBl+OBn+ODhuODs+ODl+ODrOODvOODiOOBrmlk5bGe5oCn44Gu5YCk44KS5oyH5a6a44Gn44GN44G+44GZ44CCWy9qYV1cbiAgICAgKiBAcGFyYW0ge09iamVjdH0gW29wdGlvbnNdXG4gICAgICogICBbZW5dUGFyYW1ldGVyIG9iamVjdC5bL2VuXVxuICAgICAqICAgW2phXeOCquODl+OCt+ODp+ODs+OCkuaMh+WumuOBmeOCi+OCquODluOCuOOCp+OCr+ODiOOAglsvamFdXG4gICAgICogQHBhcmFtIHtPYmplY3R9IFtvcHRpb25zLnBhcmVudFNjb3BlXVxuICAgICAqICAgW2VuXVBhcmVudCBzY29wZSBvZiB0aGUgZGlhbG9nLiBVc2VkIHRvIGJpbmQgbW9kZWxzIGFuZCBhY2Nlc3Mgc2NvcGUgbWV0aG9kcyBmcm9tIHRoZSBkaWFsb2cuWy9lbl1cbiAgICAgKiAgIFtqYV3jg4DjgqTjgqLjg63jgrDlhoXjgafliKnnlKjjgZnjgovopqrjgrnjgrPjg7zjg5fjgpLmjIflrprjgZfjgb7jgZnjgILjg4DjgqTjgqLjg63jgrDjgYvjgonjg6Ljg4fjg6vjgoTjgrnjgrPjg7zjg5fjga7jg6Hjgr3jg4Pjg4njgavjgqLjgq/jgrvjgrnjgZnjgovjga7jgavkvb/jgYTjgb7jgZnjgILjgZPjga7jg5Hjg6njg6Hjg7zjgr/jga9Bbmd1bGFySlPjg5DjgqTjg7Pjg4fjgqPjg7PjgrDjgafjga7jgb/liKnnlKjjgafjgY3jgb7jgZnjgIJbL2phXVxuICAgICAqIEByZXR1cm4ge1Byb21pc2V9XG4gICAgICogICBbZW5dUHJvbWlzZSBvYmplY3QgdGhhdCByZXNvbHZlcyB0byB0aGUgcG9wb3ZlciBjb21wb25lbnQgb2JqZWN0LlsvZW5dXG4gICAgICogICBbamFd44Od44OD44OX44Kq44O844OQ44O844Gu44Kz44Oz44Od44O844ON44Oz44OI44Kq44OW44K444Kn44Kv44OI44KS6Kej5rG644GZ44KLUHJvbWlzZeOCquODluOCuOOCp+OCr+ODiOOCkui/lOOBl+OBvuOBmeOAglsvamFdXG4gICAgICogQGRlc2NyaXB0aW9uXG4gICAgICogICBbZW5dQ3JlYXRlIGEgcG9wb3ZlciBpbnN0YW5jZSBmcm9tIGEgdGVtcGxhdGUuIFRoaXMgbWV0aG9kIHdpbGwgYmUgZGVwcmVjYXRlZCBpbiBmYXZvciBvZiBgb25zLmNyZWF0ZUVsZW1lbnRgLlsvZW5dXG4gICAgICogICBbamFd44OG44Oz44OX44Os44O844OI44GL44KJ44Od44OD44OX44Kq44O844OQ44O844Gu44Kk44Oz44K544K/44Oz44K544KS55Sf5oiQ44GX44G+44GZ44CCWy9qYV1cbiAgICAgKi9cblxuICAgIC8qKlxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBwYWdlXG4gICAgICovXG4gICAgY29uc3QgcmVzb2x2ZUxvYWRpbmdQbGFjZUhvbGRlck9yaWdpbmFsID0gb25zLnJlc29sdmVMb2FkaW5nUGxhY2VIb2xkZXI7XG4gICAgb25zLnJlc29sdmVMb2FkaW5nUGxhY2Vob2xkZXIgPSBwYWdlID0+IHtcbiAgICAgIHJldHVybiByZXNvbHZlTG9hZGluZ1BsYWNlaG9sZGVyT3JpZ2luYWwocGFnZSwgKGVsZW1lbnQsIGRvbmUpID0+IHtcbiAgICAgICAgb25zLmNvbXBpbGUoZWxlbWVudCk7XG4gICAgICAgIGFuZ3VsYXIuZWxlbWVudChlbGVtZW50KS5zY29wZSgpLiRldmFsQXN5bmMoKCkgPT4gc2V0SW1tZWRpYXRlKGRvbmUpKTtcbiAgICAgIH0pO1xuICAgIH07XG5cbiAgICBvbnMuX3NldHVwTG9hZGluZ1BsYWNlSG9sZGVycyA9IGZ1bmN0aW9uKCkge1xuICAgICAgLy8gRG8gbm90aGluZ1xuICAgIH07XG4gIH1cblxufSkod2luZG93Lm9ucyA9IHdpbmRvdy5vbnMgfHwge30pO1xuIiwiLypcbkNvcHlyaWdodCAyMDEzLTIwMTUgQVNJQUwgQ09SUE9SQVRJT05cblxuTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbnlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbllvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuXG4gICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcblxuVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG5TZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG5saW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cblxuKi9cblxuKGZ1bmN0aW9uKCkge1xuICAndXNlIHN0cmljdCc7XG5cbiAgdmFyIG1vZHVsZSA9IGFuZ3VsYXIubW9kdWxlKCdvbnNlbicpO1xuXG4gIG1vZHVsZS5mYWN0b3J5KCdBY3Rpb25TaGVldFZpZXcnLCBmdW5jdGlvbigkb25zZW4pIHtcblxuICAgIHZhciBBY3Rpb25TaGVldFZpZXcgPSBDbGFzcy5leHRlbmQoe1xuXG4gICAgICAvKipcbiAgICAgICAqIEBwYXJhbSB7T2JqZWN0fSBzY29wZVxuICAgICAgICogQHBhcmFtIHtqcUxpdGV9IGVsZW1lbnRcbiAgICAgICAqIEBwYXJhbSB7T2JqZWN0fSBhdHRyc1xuICAgICAgICovXG4gICAgICBpbml0OiBmdW5jdGlvbihzY29wZSwgZWxlbWVudCwgYXR0cnMpIHtcbiAgICAgICAgdGhpcy5fc2NvcGUgPSBzY29wZTtcbiAgICAgICAgdGhpcy5fZWxlbWVudCA9IGVsZW1lbnQ7XG4gICAgICAgIHRoaXMuX2F0dHJzID0gYXR0cnM7XG5cbiAgICAgICAgdGhpcy5fY2xlYXJEZXJpdmluZ01ldGhvZHMgPSAkb25zZW4uZGVyaXZlTWV0aG9kcyh0aGlzLCB0aGlzLl9lbGVtZW50WzBdLCBbXG4gICAgICAgICAgJ3Nob3cnLCAnaGlkZScsICd0b2dnbGUnXG4gICAgICAgIF0pO1xuXG4gICAgICAgIHRoaXMuX2NsZWFyRGVyaXZpbmdFdmVudHMgPSAkb25zZW4uZGVyaXZlRXZlbnRzKHRoaXMsIHRoaXMuX2VsZW1lbnRbMF0sIFtcbiAgICAgICAgICAncHJlc2hvdycsICdwb3N0c2hvdycsICdwcmVoaWRlJywgJ3Bvc3RoaWRlJywgJ2NhbmNlbCdcbiAgICAgICAgXSwgZnVuY3Rpb24oZGV0YWlsKSB7XG4gICAgICAgICAgaWYgKGRldGFpbC5hY3Rpb25TaGVldCkge1xuICAgICAgICAgICAgZGV0YWlsLmFjdGlvblNoZWV0ID0gdGhpcztcbiAgICAgICAgICB9XG4gICAgICAgICAgcmV0dXJuIGRldGFpbDtcbiAgICAgICAgfS5iaW5kKHRoaXMpKTtcblxuICAgICAgICB0aGlzLl9zY29wZS4kb24oJyRkZXN0cm95JywgdGhpcy5fZGVzdHJveS5iaW5kKHRoaXMpKTtcbiAgICAgIH0sXG5cbiAgICAgIF9kZXN0cm95OiBmdW5jdGlvbigpIHtcbiAgICAgICAgdGhpcy5lbWl0KCdkZXN0cm95Jyk7XG5cbiAgICAgICAgdGhpcy5fZWxlbWVudC5yZW1vdmUoKTtcbiAgICAgICAgdGhpcy5fY2xlYXJEZXJpdmluZ01ldGhvZHMoKTtcbiAgICAgICAgdGhpcy5fY2xlYXJEZXJpdmluZ0V2ZW50cygpO1xuXG4gICAgICAgIHRoaXMuX3Njb3BlID0gdGhpcy5fYXR0cnMgPSB0aGlzLl9lbGVtZW50ID0gbnVsbDtcbiAgICAgIH1cblxuICAgIH0pO1xuXG4gICAgTWljcm9FdmVudC5taXhpbihBY3Rpb25TaGVldFZpZXcpO1xuICAgICRvbnNlbi5kZXJpdmVQcm9wZXJ0aWVzRnJvbUVsZW1lbnQoQWN0aW9uU2hlZXRWaWV3LCBbJ2Rpc2FibGVkJywgJ2NhbmNlbGFibGUnLCAndmlzaWJsZScsICdvbkRldmljZUJhY2tCdXR0b24nXSk7XG5cbiAgICByZXR1cm4gQWN0aW9uU2hlZXRWaWV3O1xuICB9KTtcbn0pKCk7XG4iLCIvKlxuQ29weXJpZ2h0IDIwMTMtMjAxNSBBU0lBTCBDT1JQT1JBVElPTlxuXG5MaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xueW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG5cbiAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuXG5Vbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG5kaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG5XSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cblNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbmxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuXG4qL1xuXG4oZnVuY3Rpb24oKSB7XG4gICd1c2Ugc3RyaWN0JztcblxuICB2YXIgbW9kdWxlID0gYW5ndWxhci5tb2R1bGUoJ29uc2VuJyk7XG5cbiAgbW9kdWxlLmZhY3RvcnkoJ0FsZXJ0RGlhbG9nVmlldycsIGZ1bmN0aW9uKCRvbnNlbikge1xuXG4gICAgdmFyIEFsZXJ0RGlhbG9nVmlldyA9IENsYXNzLmV4dGVuZCh7XG5cbiAgICAgIC8qKlxuICAgICAgICogQHBhcmFtIHtPYmplY3R9IHNjb3BlXG4gICAgICAgKiBAcGFyYW0ge2pxTGl0ZX0gZWxlbWVudFxuICAgICAgICogQHBhcmFtIHtPYmplY3R9IGF0dHJzXG4gICAgICAgKi9cbiAgICAgIGluaXQ6IGZ1bmN0aW9uKHNjb3BlLCBlbGVtZW50LCBhdHRycykge1xuICAgICAgICB0aGlzLl9zY29wZSA9IHNjb3BlO1xuICAgICAgICB0aGlzLl9lbGVtZW50ID0gZWxlbWVudDtcbiAgICAgICAgdGhpcy5fYXR0cnMgPSBhdHRycztcblxuICAgICAgICB0aGlzLl9jbGVhckRlcml2aW5nTWV0aG9kcyA9ICRvbnNlbi5kZXJpdmVNZXRob2RzKHRoaXMsIHRoaXMuX2VsZW1lbnRbMF0sIFtcbiAgICAgICAgICAnc2hvdycsICdoaWRlJ1xuICAgICAgICBdKTtcblxuICAgICAgICB0aGlzLl9jbGVhckRlcml2aW5nRXZlbnRzID0gJG9uc2VuLmRlcml2ZUV2ZW50cyh0aGlzLCB0aGlzLl9lbGVtZW50WzBdLCBbXG4gICAgICAgICAgJ3ByZXNob3cnLFxuICAgICAgICAgICdwb3N0c2hvdycsXG4gICAgICAgICAgJ3ByZWhpZGUnLFxuICAgICAgICAgICdwb3N0aGlkZScsXG4gICAgICAgICAgJ2NhbmNlbCdcbiAgICAgICAgXSwgZnVuY3Rpb24oZGV0YWlsKSB7XG4gICAgICAgICAgaWYgKGRldGFpbC5hbGVydERpYWxvZykge1xuICAgICAgICAgICAgZGV0YWlsLmFsZXJ0RGlhbG9nID0gdGhpcztcbiAgICAgICAgICB9XG4gICAgICAgICAgcmV0dXJuIGRldGFpbDtcbiAgICAgICAgfS5iaW5kKHRoaXMpKTtcblxuICAgICAgICB0aGlzLl9zY29wZS4kb24oJyRkZXN0cm95JywgdGhpcy5fZGVzdHJveS5iaW5kKHRoaXMpKTtcbiAgICAgIH0sXG5cbiAgICAgIF9kZXN0cm95OiBmdW5jdGlvbigpIHtcbiAgICAgICAgdGhpcy5lbWl0KCdkZXN0cm95Jyk7XG5cbiAgICAgICAgdGhpcy5fZWxlbWVudC5yZW1vdmUoKTtcblxuICAgICAgICB0aGlzLl9jbGVhckRlcml2aW5nTWV0aG9kcygpO1xuICAgICAgICB0aGlzLl9jbGVhckRlcml2aW5nRXZlbnRzKCk7XG5cbiAgICAgICAgdGhpcy5fc2NvcGUgPSB0aGlzLl9hdHRycyA9IHRoaXMuX2VsZW1lbnQgPSBudWxsO1xuICAgICAgfVxuXG4gICAgfSk7XG5cbiAgICBNaWNyb0V2ZW50Lm1peGluKEFsZXJ0RGlhbG9nVmlldyk7XG4gICAgJG9uc2VuLmRlcml2ZVByb3BlcnRpZXNGcm9tRWxlbWVudChBbGVydERpYWxvZ1ZpZXcsIFsnZGlzYWJsZWQnLCAnY2FuY2VsYWJsZScsICd2aXNpYmxlJywgJ29uRGV2aWNlQmFja0J1dHRvbiddKTtcblxuICAgIHJldHVybiBBbGVydERpYWxvZ1ZpZXc7XG4gIH0pO1xufSkoKTtcbiIsIi8qXG5Db3B5cmlnaHQgMjAxMy0yMDE1IEFTSUFMIENPUlBPUkFUSU9OXG5cbkxpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG55b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG5Zb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcblxuICAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG5cblVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbmRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbldJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxubGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG5cbiovXG5cbihmdW5jdGlvbigpIHtcbiAgJ3VzZSBzdHJpY3QnO1xuXG4gIHZhciBtb2R1bGUgPSBhbmd1bGFyLm1vZHVsZSgnb25zZW4nKTtcblxuICBtb2R1bGUuZmFjdG9yeSgnQ2Fyb3VzZWxWaWV3JywgZnVuY3Rpb24oJG9uc2VuKSB7XG5cbiAgICAvKipcbiAgICAgKiBAY2xhc3MgQ2Fyb3VzZWxWaWV3XG4gICAgICovXG4gICAgdmFyIENhcm91c2VsVmlldyA9IENsYXNzLmV4dGVuZCh7XG5cbiAgICAgIC8qKlxuICAgICAgICogQHBhcmFtIHtPYmplY3R9IHNjb3BlXG4gICAgICAgKiBAcGFyYW0ge2pxTGl0ZX0gZWxlbWVudFxuICAgICAgICogQHBhcmFtIHtPYmplY3R9IGF0dHJzXG4gICAgICAgKi9cbiAgICAgIGluaXQ6IGZ1bmN0aW9uKHNjb3BlLCBlbGVtZW50LCBhdHRycykge1xuICAgICAgICB0aGlzLl9lbGVtZW50ID0gZWxlbWVudDtcbiAgICAgICAgdGhpcy5fc2NvcGUgPSBzY29wZTtcbiAgICAgICAgdGhpcy5fYXR0cnMgPSBhdHRycztcblxuICAgICAgICB0aGlzLl9zY29wZS4kb24oJyRkZXN0cm95JywgdGhpcy5fZGVzdHJveS5iaW5kKHRoaXMpKTtcblxuICAgICAgICB0aGlzLl9jbGVhckRlcml2aW5nTWV0aG9kcyA9ICRvbnNlbi5kZXJpdmVNZXRob2RzKHRoaXMsIGVsZW1lbnRbMF0sIFtcbiAgICAgICAgICAnc2V0QWN0aXZlSW5kZXgnLCAnZ2V0QWN0aXZlSW5kZXgnLCAnbmV4dCcsICdwcmV2JywgJ3JlZnJlc2gnLCAnZmlyc3QnLCAnbGFzdCdcbiAgICAgICAgXSk7XG5cbiAgICAgICAgdGhpcy5fY2xlYXJEZXJpdmluZ0V2ZW50cyA9ICRvbnNlbi5kZXJpdmVFdmVudHModGhpcywgZWxlbWVudFswXSwgWydyZWZyZXNoJywgJ3Bvc3RjaGFuZ2UnLCAnb3ZlcnNjcm9sbCddLCBmdW5jdGlvbihkZXRhaWwpIHtcbiAgICAgICAgICBpZiAoZGV0YWlsLmNhcm91c2VsKSB7XG4gICAgICAgICAgICBkZXRhaWwuY2Fyb3VzZWwgPSB0aGlzO1xuICAgICAgICAgIH1cbiAgICAgICAgICByZXR1cm4gZGV0YWlsO1xuICAgICAgICB9LmJpbmQodGhpcykpO1xuICAgICAgfSxcblxuICAgICAgX2Rlc3Ryb3k6IGZ1bmN0aW9uKCkge1xuICAgICAgICB0aGlzLmVtaXQoJ2Rlc3Ryb3knKTtcblxuICAgICAgICB0aGlzLl9jbGVhckRlcml2aW5nRXZlbnRzKCk7XG4gICAgICAgIHRoaXMuX2NsZWFyRGVyaXZpbmdNZXRob2RzKCk7XG5cbiAgICAgICAgdGhpcy5fZWxlbWVudCA9IHRoaXMuX3Njb3BlID0gdGhpcy5fYXR0cnMgPSBudWxsO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgTWljcm9FdmVudC5taXhpbihDYXJvdXNlbFZpZXcpO1xuXG4gICAgJG9uc2VuLmRlcml2ZVByb3BlcnRpZXNGcm9tRWxlbWVudChDYXJvdXNlbFZpZXcsIFtcbiAgICAgICdjZW50ZXJlZCcsICdvdmVyc2Nyb2xsYWJsZScsICdkaXNhYmxlZCcsICdhdXRvU2Nyb2xsJywgJ3N3aXBlYWJsZScsICdhdXRvU2Nyb2xsUmF0aW8nLCAnaXRlbUNvdW50JywgJ29uU3dpcGUnXG4gICAgXSk7XG5cbiAgICByZXR1cm4gQ2Fyb3VzZWxWaWV3O1xuICB9KTtcbn0pKCk7XG4iLCIvKlxuQ29weXJpZ2h0IDIwMTMtMjAxNSBBU0lBTCBDT1JQT1JBVElPTlxuXG5MaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xueW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG5cbiAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuXG5Vbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG5kaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG5XSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cblNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbmxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuXG4qL1xuXG4oZnVuY3Rpb24oKSB7XG4gICd1c2Ugc3RyaWN0JztcblxuICB2YXIgbW9kdWxlID0gYW5ndWxhci5tb2R1bGUoJ29uc2VuJyk7XG5cbiAgbW9kdWxlLmZhY3RvcnkoJ0RpYWxvZ1ZpZXcnLCBmdW5jdGlvbigkb25zZW4pIHtcblxuICAgIHZhciBEaWFsb2dWaWV3ID0gQ2xhc3MuZXh0ZW5kKHtcblxuICAgICAgaW5pdDogZnVuY3Rpb24oc2NvcGUsIGVsZW1lbnQsIGF0dHJzKSB7XG4gICAgICAgIHRoaXMuX3Njb3BlID0gc2NvcGU7XG4gICAgICAgIHRoaXMuX2VsZW1lbnQgPSBlbGVtZW50O1xuICAgICAgICB0aGlzLl9hdHRycyA9IGF0dHJzO1xuXG4gICAgICAgIHRoaXMuX2NsZWFyRGVyaXZpbmdNZXRob2RzID0gJG9uc2VuLmRlcml2ZU1ldGhvZHModGhpcywgdGhpcy5fZWxlbWVudFswXSwgW1xuICAgICAgICAgICdzaG93JywgJ2hpZGUnXG4gICAgICAgIF0pO1xuXG4gICAgICAgIHRoaXMuX2NsZWFyRGVyaXZpbmdFdmVudHMgPSAkb25zZW4uZGVyaXZlRXZlbnRzKHRoaXMsIHRoaXMuX2VsZW1lbnRbMF0sIFtcbiAgICAgICAgICAncHJlc2hvdycsXG4gICAgICAgICAgJ3Bvc3RzaG93JyxcbiAgICAgICAgICAncHJlaGlkZScsXG4gICAgICAgICAgJ3Bvc3RoaWRlJyxcbiAgICAgICAgICAnY2FuY2VsJ1xuICAgICAgICBdLCBmdW5jdGlvbihkZXRhaWwpIHtcbiAgICAgICAgICBpZiAoZGV0YWlsLmRpYWxvZykge1xuICAgICAgICAgICAgZGV0YWlsLmRpYWxvZyA9IHRoaXM7XG4gICAgICAgICAgfVxuICAgICAgICAgIHJldHVybiBkZXRhaWw7XG4gICAgICAgIH0uYmluZCh0aGlzKSk7XG5cbiAgICAgICAgdGhpcy5fc2NvcGUuJG9uKCckZGVzdHJveScsIHRoaXMuX2Rlc3Ryb3kuYmluZCh0aGlzKSk7XG4gICAgICB9LFxuXG4gICAgICBfZGVzdHJveTogZnVuY3Rpb24oKSB7XG4gICAgICAgIHRoaXMuZW1pdCgnZGVzdHJveScpO1xuXG4gICAgICAgIHRoaXMuX2VsZW1lbnQucmVtb3ZlKCk7XG4gICAgICAgIHRoaXMuX2NsZWFyRGVyaXZpbmdNZXRob2RzKCk7XG4gICAgICAgIHRoaXMuX2NsZWFyRGVyaXZpbmdFdmVudHMoKTtcblxuICAgICAgICB0aGlzLl9zY29wZSA9IHRoaXMuX2F0dHJzID0gdGhpcy5fZWxlbWVudCA9IG51bGw7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICBNaWNyb0V2ZW50Lm1peGluKERpYWxvZ1ZpZXcpO1xuICAgICRvbnNlbi5kZXJpdmVQcm9wZXJ0aWVzRnJvbUVsZW1lbnQoRGlhbG9nVmlldywgWydkaXNhYmxlZCcsICdjYW5jZWxhYmxlJywgJ3Zpc2libGUnLCAnb25EZXZpY2VCYWNrQnV0dG9uJ10pO1xuXG4gICAgcmV0dXJuIERpYWxvZ1ZpZXc7XG4gIH0pO1xufSkoKTtcbiIsIi8qXG5Db3B5cmlnaHQgMjAxMy0yMDE1IEFTSUFMIENPUlBPUkFUSU9OXG5cbkxpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG55b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG5Zb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcblxuICAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG5cblVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbmRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbldJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxubGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG5cbiovXG5cbihmdW5jdGlvbigpIHtcbiAgJ3VzZSBzdHJpY3QnO1xuXG4gIHZhciBtb2R1bGUgPSBhbmd1bGFyLm1vZHVsZSgnb25zZW4nKTtcblxuICBtb2R1bGUuZmFjdG9yeSgnRmFiVmlldycsIGZ1bmN0aW9uKCRvbnNlbikge1xuXG4gICAgLyoqXG4gICAgICogQGNsYXNzIEZhYlZpZXdcbiAgICAgKi9cbiAgICB2YXIgRmFiVmlldyA9IENsYXNzLmV4dGVuZCh7XG5cbiAgICAgIC8qKlxuICAgICAgICogQHBhcmFtIHtPYmplY3R9IHNjb3BlXG4gICAgICAgKiBAcGFyYW0ge2pxTGl0ZX0gZWxlbWVudFxuICAgICAgICogQHBhcmFtIHtPYmplY3R9IGF0dHJzXG4gICAgICAgKi9cbiAgICAgIGluaXQ6IGZ1bmN0aW9uKHNjb3BlLCBlbGVtZW50LCBhdHRycykge1xuICAgICAgICB0aGlzLl9lbGVtZW50ID0gZWxlbWVudDtcbiAgICAgICAgdGhpcy5fc2NvcGUgPSBzY29wZTtcbiAgICAgICAgdGhpcy5fYXR0cnMgPSBhdHRycztcblxuICAgICAgICB0aGlzLl9zY29wZS4kb24oJyRkZXN0cm95JywgdGhpcy5fZGVzdHJveS5iaW5kKHRoaXMpKTtcblxuICAgICAgICB0aGlzLl9jbGVhckRlcml2aW5nTWV0aG9kcyA9ICRvbnNlbi5kZXJpdmVNZXRob2RzKHRoaXMsIGVsZW1lbnRbMF0sIFtcbiAgICAgICAgICAnc2hvdycsICdoaWRlJywgJ3RvZ2dsZSdcbiAgICAgICAgXSk7XG4gICAgICB9LFxuXG4gICAgICBfZGVzdHJveTogZnVuY3Rpb24oKSB7XG4gICAgICAgIHRoaXMuZW1pdCgnZGVzdHJveScpO1xuICAgICAgICB0aGlzLl9jbGVhckRlcml2aW5nTWV0aG9kcygpO1xuXG4gICAgICAgIHRoaXMuX2VsZW1lbnQgPSB0aGlzLl9zY29wZSA9IHRoaXMuX2F0dHJzID0gbnVsbDtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgICRvbnNlbi5kZXJpdmVQcm9wZXJ0aWVzRnJvbUVsZW1lbnQoRmFiVmlldywgW1xuICAgICAgJ2Rpc2FibGVkJywgJ3Zpc2libGUnXG4gICAgXSk7XG5cbiAgICBNaWNyb0V2ZW50Lm1peGluKEZhYlZpZXcpO1xuXG4gICAgcmV0dXJuIEZhYlZpZXc7XG4gIH0pO1xufSkoKTtcbiIsIi8qXG5Db3B5cmlnaHQgMjAxMy0yMDE1IEFTSUFMIENPUlBPUkFUSU9OXG5cbkxpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG55b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG5Zb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcblxuICAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG5cblVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbmRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbldJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxubGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG5cbiovXG5cbihmdW5jdGlvbigpe1xuICAndXNlIHN0cmljdCc7XG5cbiAgYW5ndWxhci5tb2R1bGUoJ29uc2VuJykuZmFjdG9yeSgnR2VuZXJpY1ZpZXcnLCBmdW5jdGlvbigkb25zZW4pIHtcblxuICAgIHZhciBHZW5lcmljVmlldyA9IENsYXNzLmV4dGVuZCh7XG5cbiAgICAgIC8qKlxuICAgICAgICogQHBhcmFtIHtPYmplY3R9IHNjb3BlXG4gICAgICAgKiBAcGFyYW0ge2pxTGl0ZX0gZWxlbWVudFxuICAgICAgICogQHBhcmFtIHtPYmplY3R9IGF0dHJzXG4gICAgICAgKiBAcGFyYW0ge09iamVjdH0gW29wdGlvbnNdXG4gICAgICAgKiBAcGFyYW0ge0Jvb2xlYW59IFtvcHRpb25zLmRpcmVjdGl2ZU9ubHldXG4gICAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBbb3B0aW9ucy5vbkRlc3Ryb3ldXG4gICAgICAgKiBAcGFyYW0ge1N0cmluZ30gW29wdGlvbnMubW9kaWZpZXJUZW1wbGF0ZV1cbiAgICAgICAqL1xuICAgICAgaW5pdDogZnVuY3Rpb24oc2NvcGUsIGVsZW1lbnQsIGF0dHJzLCBvcHRpb25zKSB7XG4gICAgICAgIHZhciBzZWxmID0gdGhpcztcbiAgICAgICAgb3B0aW9ucyA9IHt9O1xuXG4gICAgICAgIHRoaXMuX2VsZW1lbnQgPSBlbGVtZW50O1xuICAgICAgICB0aGlzLl9zY29wZSA9IHNjb3BlO1xuICAgICAgICB0aGlzLl9hdHRycyA9IGF0dHJzO1xuXG4gICAgICAgIGlmIChvcHRpb25zLmRpcmVjdGl2ZU9ubHkpIHtcbiAgICAgICAgICBpZiAoIW9wdGlvbnMubW9kaWZpZXJUZW1wbGF0ZSkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdvcHRpb25zLm1vZGlmaWVyVGVtcGxhdGUgaXMgdW5kZWZpbmVkLicpO1xuICAgICAgICAgIH1cbiAgICAgICAgICAkb25zZW4uYWRkTW9kaWZpZXJNZXRob2RzKHRoaXMsIG9wdGlvbnMubW9kaWZpZXJUZW1wbGF0ZSwgZWxlbWVudCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgJG9uc2VuLmFkZE1vZGlmaWVyTWV0aG9kc0ZvckN1c3RvbUVsZW1lbnRzKHRoaXMsIGVsZW1lbnQpO1xuICAgICAgICB9XG5cbiAgICAgICAgJG9uc2VuLmNsZWFuZXIub25EZXN0cm95KHNjb3BlLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICBzZWxmLl9ldmVudHMgPSB1bmRlZmluZWQ7XG4gICAgICAgICAgJG9uc2VuLnJlbW92ZU1vZGlmaWVyTWV0aG9kcyhzZWxmKTtcblxuICAgICAgICAgIGlmIChvcHRpb25zLm9uRGVzdHJveSkge1xuICAgICAgICAgICAgb3B0aW9ucy5vbkRlc3Ryb3koc2VsZik7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgJG9uc2VuLmNsZWFyQ29tcG9uZW50KHtcbiAgICAgICAgICAgIHNjb3BlOiBzY29wZSxcbiAgICAgICAgICAgIGF0dHJzOiBhdHRycyxcbiAgICAgICAgICAgIGVsZW1lbnQ6IGVsZW1lbnRcbiAgICAgICAgICB9KTtcblxuICAgICAgICAgIHNlbGYgPSBlbGVtZW50ID0gc2VsZi5fZWxlbWVudCA9IHNlbGYuX3Njb3BlID0gc2NvcGUgPSBzZWxmLl9hdHRycyA9IGF0dHJzID0gb3B0aW9ucyA9IG51bGw7XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgLyoqXG4gICAgICogQHBhcmFtIHtPYmplY3R9IHNjb3BlXG4gICAgICogQHBhcmFtIHtqcUxpdGV9IGVsZW1lbnRcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gYXR0cnNcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gb3B0aW9uc1xuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBvcHRpb25zLnZpZXdLZXlcbiAgICAgKiBAcGFyYW0ge0Jvb2xlYW59IFtvcHRpb25zLmRpcmVjdGl2ZU9ubHldXG4gICAgICogQHBhcmFtIHtGdW5jdGlvbn0gW29wdGlvbnMub25EZXN0cm95XVxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBbb3B0aW9ucy5tb2RpZmllclRlbXBsYXRlXVxuICAgICAqL1xuICAgIEdlbmVyaWNWaWV3LnJlZ2lzdGVyID0gZnVuY3Rpb24oc2NvcGUsIGVsZW1lbnQsIGF0dHJzLCBvcHRpb25zKSB7XG4gICAgICB2YXIgdmlldyA9IG5ldyBHZW5lcmljVmlldyhzY29wZSwgZWxlbWVudCwgYXR0cnMsIG9wdGlvbnMpO1xuXG4gICAgICBpZiAoIW9wdGlvbnMudmlld0tleSkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ29wdGlvbnMudmlld0tleSBpcyByZXF1aXJlZC4nKTtcbiAgICAgIH1cblxuICAgICAgJG9uc2VuLmRlY2xhcmVWYXJBdHRyaWJ1dGUoYXR0cnMsIHZpZXcpO1xuICAgICAgZWxlbWVudC5kYXRhKG9wdGlvbnMudmlld0tleSwgdmlldyk7XG5cbiAgICAgIHZhciBkZXN0cm95ID0gb3B0aW9ucy5vbkRlc3Ryb3kgfHwgYW5ndWxhci5ub29wO1xuICAgICAgb3B0aW9ucy5vbkRlc3Ryb3kgPSBmdW5jdGlvbih2aWV3KSB7XG4gICAgICAgIGRlc3Ryb3kodmlldyk7XG4gICAgICAgIGVsZW1lbnQuZGF0YShvcHRpb25zLnZpZXdLZXksIG51bGwpO1xuICAgICAgfTtcblxuICAgICAgcmV0dXJuIHZpZXc7XG4gICAgfTtcblxuICAgIE1pY3JvRXZlbnQubWl4aW4oR2VuZXJpY1ZpZXcpO1xuXG4gICAgcmV0dXJuIEdlbmVyaWNWaWV3O1xuICB9KTtcbn0pKCk7XG4iLCIvKlxuQ29weXJpZ2h0IDIwMTMtMjAxNSBBU0lBTCBDT1JQT1JBVElPTlxuXG5MaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xueW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG5cbiAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuXG5Vbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG5kaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG5XSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cblNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbmxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuXG4qL1xuXG4oZnVuY3Rpb24oKXtcbiAgJ3VzZSBzdHJpY3QnO1xuXG4gIGFuZ3VsYXIubW9kdWxlKCdvbnNlbicpLmZhY3RvcnkoJ0FuZ3VsYXJMYXp5UmVwZWF0RGVsZWdhdGUnLCBmdW5jdGlvbigkY29tcGlsZSkge1xuXG4gICAgY29uc3QgZGlyZWN0aXZlQXR0cmlidXRlcyA9IFsnb25zLWxhenktcmVwZWF0JywgJ29uczpsYXp5OnJlcGVhdCcsICdvbnNfbGF6eV9yZXBlYXQnLCAnZGF0YS1vbnMtbGF6eS1yZXBlYXQnLCAneC1vbnMtbGF6eS1yZXBlYXQnXTtcbiAgICBjbGFzcyBBbmd1bGFyTGF6eVJlcGVhdERlbGVnYXRlIGV4dGVuZHMgb25zLl9pbnRlcm5hbC5MYXp5UmVwZWF0RGVsZWdhdGUge1xuICAgICAgLyoqXG4gICAgICAgKiBAcGFyYW0ge09iamVjdH0gdXNlckRlbGVnYXRlXG4gICAgICAgKiBAcGFyYW0ge0VsZW1lbnR9IHRlbXBsYXRlRWxlbWVudFxuICAgICAgICogQHBhcmFtIHtTY29wZX0gcGFyZW50U2NvcGVcbiAgICAgICAqL1xuICAgICAgY29uc3RydWN0b3IodXNlckRlbGVnYXRlLCB0ZW1wbGF0ZUVsZW1lbnQsIHBhcmVudFNjb3BlKSB7XG4gICAgICAgIHN1cGVyKHVzZXJEZWxlZ2F0ZSwgdGVtcGxhdGVFbGVtZW50KTtcbiAgICAgICAgdGhpcy5fcGFyZW50U2NvcGUgPSBwYXJlbnRTY29wZTtcblxuICAgICAgICBkaXJlY3RpdmVBdHRyaWJ1dGVzLmZvckVhY2goYXR0ciA9PiB0ZW1wbGF0ZUVsZW1lbnQucmVtb3ZlQXR0cmlidXRlKGF0dHIpKTtcbiAgICAgICAgdGhpcy5fbGlua2VyID0gJGNvbXBpbGUodGVtcGxhdGVFbGVtZW50ID8gdGVtcGxhdGVFbGVtZW50LmNsb25lTm9kZSh0cnVlKSA6IG51bGwpO1xuICAgICAgfVxuXG4gICAgICBjb25maWd1cmVJdGVtU2NvcGUoaXRlbSwgc2NvcGUpe1xuICAgICAgICBpZiAodGhpcy5fdXNlckRlbGVnYXRlLmNvbmZpZ3VyZUl0ZW1TY29wZSBpbnN0YW5jZW9mIEZ1bmN0aW9uKSB7XG4gICAgICAgICAgdGhpcy5fdXNlckRlbGVnYXRlLmNvbmZpZ3VyZUl0ZW1TY29wZShpdGVtLCBzY29wZSk7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgZGVzdHJveUl0ZW1TY29wZShpdGVtLCBlbGVtZW50KXtcbiAgICAgICAgaWYgKHRoaXMuX3VzZXJEZWxlZ2F0ZS5kZXN0cm95SXRlbVNjb3BlIGluc3RhbmNlb2YgRnVuY3Rpb24pIHtcbiAgICAgICAgICB0aGlzLl91c2VyRGVsZWdhdGUuZGVzdHJveUl0ZW1TY29wZShpdGVtLCBlbGVtZW50KTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBfdXNpbmdCaW5kaW5nKCkge1xuICAgICAgICBpZiAodGhpcy5fdXNlckRlbGVnYXRlLmNvbmZpZ3VyZUl0ZW1TY29wZSkge1xuICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMuX3VzZXJEZWxlZ2F0ZS5jcmVhdGVJdGVtQ29udGVudCkge1xuICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRocm93IG5ldyBFcnJvcignYGxhenktcmVwZWF0YCBkZWxlZ2F0ZSBvYmplY3QgaXMgdmFndWUuJyk7XG4gICAgICB9XG5cbiAgICAgIGxvYWRJdGVtRWxlbWVudChpbmRleCwgZG9uZSkge1xuICAgICAgICB0aGlzLl9wcmVwYXJlSXRlbUVsZW1lbnQoaW5kZXgsICh7ZWxlbWVudCwgc2NvcGV9KSA9PiB7XG4gICAgICAgICAgZG9uZSh7ZWxlbWVudCwgc2NvcGV9KTtcbiAgICAgICAgfSk7XG4gICAgICB9XG5cbiAgICAgIF9wcmVwYXJlSXRlbUVsZW1lbnQoaW5kZXgsIGRvbmUpIHtcbiAgICAgICAgY29uc3Qgc2NvcGUgPSB0aGlzLl9wYXJlbnRTY29wZS4kbmV3KCk7XG4gICAgICAgIHRoaXMuX2FkZFNwZWNpYWxQcm9wZXJ0aWVzKGluZGV4LCBzY29wZSk7XG5cbiAgICAgICAgaWYgKHRoaXMuX3VzaW5nQmluZGluZygpKSB7XG4gICAgICAgICAgdGhpcy5jb25maWd1cmVJdGVtU2NvcGUoaW5kZXgsIHNjb3BlKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuX2xpbmtlcihzY29wZSwgKGNsb25lZCkgPT4ge1xuICAgICAgICAgIGxldCBlbGVtZW50ID0gY2xvbmVkWzBdO1xuICAgICAgICAgIGlmICghdGhpcy5fdXNpbmdCaW5kaW5nKCkpIHtcbiAgICAgICAgICAgIGVsZW1lbnQgPSB0aGlzLl91c2VyRGVsZWdhdGUuY3JlYXRlSXRlbUNvbnRlbnQoaW5kZXgsIGVsZW1lbnQpO1xuICAgICAgICAgICAgJGNvbXBpbGUoZWxlbWVudCkoc2NvcGUpO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGRvbmUoe2VsZW1lbnQsIHNjb3BlfSk7XG4gICAgICAgIH0pO1xuICAgICAgfVxuXG4gICAgICAvKipcbiAgICAgICAqIEBwYXJhbSB7TnVtYmVyfSBpbmRleFxuICAgICAgICogQHBhcmFtIHtPYmplY3R9IHNjb3BlXG4gICAgICAgKi9cbiAgICAgIF9hZGRTcGVjaWFsUHJvcGVydGllcyhpLCBzY29wZSkge1xuICAgICAgICBjb25zdCBsYXN0ID0gdGhpcy5jb3VudEl0ZW1zKCkgLSAxO1xuICAgICAgICBhbmd1bGFyLmV4dGVuZChzY29wZSwge1xuICAgICAgICAgICRpbmRleDogaSxcbiAgICAgICAgICAkZmlyc3Q6IGkgPT09IDAsXG4gICAgICAgICAgJGxhc3Q6IGkgPT09IGxhc3QsXG4gICAgICAgICAgJG1pZGRsZTogaSAhPT0gMCAmJiBpICE9PSBsYXN0LFxuICAgICAgICAgICRldmVuOiBpICUgMiA9PT0gMCxcbiAgICAgICAgICAkb2RkOiBpICUgMiA9PT0gMVxuICAgICAgICB9KTtcbiAgICAgIH1cblxuICAgICAgdXBkYXRlSXRlbShpbmRleCwgaXRlbSkge1xuICAgICAgICBpZiAodGhpcy5fdXNpbmdCaW5kaW5nKCkpIHtcbiAgICAgICAgICBpdGVtLnNjb3BlLiRldmFsQXN5bmMoKCkgPT4gdGhpcy5jb25maWd1cmVJdGVtU2NvcGUoaW5kZXgsIGl0ZW0uc2NvcGUpKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBzdXBlci51cGRhdGVJdGVtKGluZGV4LCBpdGVtKTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICAvKipcbiAgICAgICAqIEBwYXJhbSB7TnVtYmVyfSBpbmRleFxuICAgICAgICogQHBhcmFtIHtPYmplY3R9IGl0ZW1cbiAgICAgICAqIEBwYXJhbSB7T2JqZWN0fSBpdGVtLnNjb3BlXG4gICAgICAgKiBAcGFyYW0ge0VsZW1lbnR9IGl0ZW0uZWxlbWVudFxuICAgICAgICovXG4gICAgICBkZXN0cm95SXRlbShpbmRleCwgaXRlbSkge1xuICAgICAgICBpZiAodGhpcy5fdXNpbmdCaW5kaW5nKCkpIHtcbiAgICAgICAgICB0aGlzLmRlc3Ryb3lJdGVtU2NvcGUoaW5kZXgsIGl0ZW0uc2NvcGUpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHN1cGVyLmRlc3Ryb3lJdGVtKGluZGV4LCBpdGVtLmVsZW1lbnQpO1xuICAgICAgICB9XG4gICAgICAgIGl0ZW0uc2NvcGUuJGRlc3Ryb3koKTtcbiAgICAgIH1cblxuICAgICAgZGVzdHJveSgpIHtcbiAgICAgICAgc3VwZXIuZGVzdHJveSgpO1xuICAgICAgICB0aGlzLl9zY29wZSA9IG51bGw7XG4gICAgICB9XG5cbiAgICB9XG5cbiAgICByZXR1cm4gQW5ndWxhckxhenlSZXBlYXREZWxlZ2F0ZTtcbiAgfSk7XG59KSgpO1xuIiwiLypcbkNvcHlyaWdodCAyMDEzLTIwMTUgQVNJQUwgQ09SUE9SQVRJT05cblxuTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbnlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbllvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuXG4gICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcblxuVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG5TZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG5saW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cblxuKi9cblxuKGZ1bmN0aW9uKCl7XG4gICd1c2Ugc3RyaWN0JztcbiAgdmFyIG1vZHVsZSA9IGFuZ3VsYXIubW9kdWxlKCdvbnNlbicpO1xuXG4gIG1vZHVsZS5mYWN0b3J5KCdMYXp5UmVwZWF0VmlldycsIGZ1bmN0aW9uKEFuZ3VsYXJMYXp5UmVwZWF0RGVsZWdhdGUpIHtcblxuICAgIHZhciBMYXp5UmVwZWF0VmlldyA9IENsYXNzLmV4dGVuZCh7XG5cbiAgICAgIC8qKlxuICAgICAgICogQHBhcmFtIHtPYmplY3R9IHNjb3BlXG4gICAgICAgKiBAcGFyYW0ge2pxTGl0ZX0gZWxlbWVudFxuICAgICAgICogQHBhcmFtIHtPYmplY3R9IGF0dHJzXG4gICAgICAgKi9cbiAgICAgIGluaXQ6IGZ1bmN0aW9uKHNjb3BlLCBlbGVtZW50LCBhdHRycywgbGlua2VyKSB7XG4gICAgICAgIHRoaXMuX2VsZW1lbnQgPSBlbGVtZW50O1xuICAgICAgICB0aGlzLl9zY29wZSA9IHNjb3BlO1xuICAgICAgICB0aGlzLl9hdHRycyA9IGF0dHJzO1xuICAgICAgICB0aGlzLl9saW5rZXIgPSBsaW5rZXI7XG5cbiAgICAgICAgdmFyIHVzZXJEZWxlZ2F0ZSA9IHRoaXMuX3Njb3BlLiRldmFsKHRoaXMuX2F0dHJzLm9uc0xhenlSZXBlYXQpO1xuXG4gICAgICAgIHZhciBpbnRlcm5hbERlbGVnYXRlID0gbmV3IEFuZ3VsYXJMYXp5UmVwZWF0RGVsZWdhdGUodXNlckRlbGVnYXRlLCBlbGVtZW50WzBdLCBzY29wZSB8fCBlbGVtZW50LnNjb3BlKCkpO1xuXG4gICAgICAgIHRoaXMuX3Byb3ZpZGVyID0gbmV3IG9ucy5faW50ZXJuYWwuTGF6eVJlcGVhdFByb3ZpZGVyKGVsZW1lbnRbMF0ucGFyZW50Tm9kZSwgaW50ZXJuYWxEZWxlZ2F0ZSk7XG5cbiAgICAgICAgLy8gRXhwb3NlIHJlZnJlc2ggbWV0aG9kIHRvIHVzZXIuXG4gICAgICAgIHVzZXJEZWxlZ2F0ZS5yZWZyZXNoID0gdGhpcy5fcHJvdmlkZXIucmVmcmVzaC5iaW5kKHRoaXMuX3Byb3ZpZGVyKTtcblxuICAgICAgICBlbGVtZW50LnJlbW92ZSgpO1xuXG4gICAgICAgIC8vIFJlbmRlciB3aGVuIG51bWJlciBvZiBpdGVtcyBjaGFuZ2UuXG4gICAgICAgIHRoaXMuX3Njb3BlLiR3YXRjaChpbnRlcm5hbERlbGVnYXRlLmNvdW50SXRlbXMuYmluZChpbnRlcm5hbERlbGVnYXRlKSwgdGhpcy5fcHJvdmlkZXIuX29uQ2hhbmdlLmJpbmQodGhpcy5fcHJvdmlkZXIpKTtcblxuICAgICAgICB0aGlzLl9zY29wZS4kb24oJyRkZXN0cm95JywgKCkgPT4ge1xuICAgICAgICAgIHRoaXMuX2VsZW1lbnQgPSB0aGlzLl9zY29wZSA9IHRoaXMuX2F0dHJzID0gdGhpcy5fbGlua2VyID0gbnVsbDtcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICByZXR1cm4gTGF6eVJlcGVhdFZpZXc7XG4gIH0pO1xufSkoKTtcbiIsIi8qXG5Db3B5cmlnaHQgMjAxMy0yMDE1IEFTSUFMIENPUlBPUkFUSU9OXG5cbkxpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG55b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG5Zb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcblxuICAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG5cblVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbmRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbldJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxubGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG5cbiovXG5cbihmdW5jdGlvbigpIHtcbiAgJ3VzZSBzdHJpY3QnO1xuXG4gIHZhciBtb2R1bGUgPSBhbmd1bGFyLm1vZHVsZSgnb25zZW4nKTtcblxuICBtb2R1bGUuZmFjdG9yeSgnTW9kYWxWaWV3JywgZnVuY3Rpb24oJG9uc2VuLCAkcGFyc2UpIHtcblxuICAgIHZhciBNb2RhbFZpZXcgPSBDbGFzcy5leHRlbmQoe1xuICAgICAgX2VsZW1lbnQ6IHVuZGVmaW5lZCxcbiAgICAgIF9zY29wZTogdW5kZWZpbmVkLFxuXG4gICAgICBpbml0OiBmdW5jdGlvbihzY29wZSwgZWxlbWVudCwgYXR0cnMpIHtcbiAgICAgICAgdGhpcy5fc2NvcGUgPSBzY29wZTtcbiAgICAgICAgdGhpcy5fZWxlbWVudCA9IGVsZW1lbnQ7XG4gICAgICAgIHRoaXMuX2F0dHJzID0gYXR0cnM7XG4gICAgICAgIHRoaXMuX3Njb3BlLiRvbignJGRlc3Ryb3knLCB0aGlzLl9kZXN0cm95LmJpbmQodGhpcykpO1xuXG4gICAgICAgIHRoaXMuX2NsZWFyRGVyaXZpbmdNZXRob2RzID0gJG9uc2VuLmRlcml2ZU1ldGhvZHModGhpcywgdGhpcy5fZWxlbWVudFswXSwgWyAnc2hvdycsICdoaWRlJywgJ3RvZ2dsZScgXSk7XG5cbiAgICAgICAgdGhpcy5fY2xlYXJEZXJpdmluZ0V2ZW50cyA9ICRvbnNlbi5kZXJpdmVFdmVudHModGhpcywgdGhpcy5fZWxlbWVudFswXSwgW1xuICAgICAgICAgICdwcmVzaG93JywgJ3Bvc3RzaG93JywgJ3ByZWhpZGUnLCAncG9zdGhpZGUnLFxuICAgICAgICBdLCBmdW5jdGlvbihkZXRhaWwpIHtcbiAgICAgICAgICBpZiAoZGV0YWlsLm1vZGFsKSB7XG4gICAgICAgICAgICBkZXRhaWwubW9kYWwgPSB0aGlzO1xuICAgICAgICAgIH1cbiAgICAgICAgICByZXR1cm4gZGV0YWlsO1xuICAgICAgICB9LmJpbmQodGhpcykpO1xuICAgICAgfSxcblxuICAgICAgX2Rlc3Ryb3k6IGZ1bmN0aW9uKCkge1xuICAgICAgICB0aGlzLmVtaXQoJ2Rlc3Ryb3knLCB7cGFnZTogdGhpc30pO1xuXG4gICAgICAgIHRoaXMuX2VsZW1lbnQucmVtb3ZlKCk7XG4gICAgICAgIHRoaXMuX2NsZWFyRGVyaXZpbmdNZXRob2RzKCk7XG4gICAgICAgIHRoaXMuX2NsZWFyRGVyaXZpbmdFdmVudHMoKTtcbiAgICAgICAgdGhpcy5fZXZlbnRzID0gdGhpcy5fZWxlbWVudCA9IHRoaXMuX3Njb3BlID0gdGhpcy5fYXR0cnMgPSBudWxsO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgTWljcm9FdmVudC5taXhpbihNb2RhbFZpZXcpO1xuICAgICRvbnNlbi5kZXJpdmVQcm9wZXJ0aWVzRnJvbUVsZW1lbnQoTW9kYWxWaWV3LCBbJ29uRGV2aWNlQmFja0J1dHRvbicsICd2aXNpYmxlJ10pO1xuXG5cbiAgICByZXR1cm4gTW9kYWxWaWV3O1xuICB9KTtcblxufSkoKTtcbiIsIi8qXG5Db3B5cmlnaHQgMjAxMy0yMDE1IEFTSUFMIENPUlBPUkFUSU9OXG5cbkxpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG55b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG5Zb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcblxuICAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG5cblVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbmRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbldJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxubGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG5cbiovXG5cbihmdW5jdGlvbigpIHtcbiAgJ3VzZSBzdHJpY3QnO1xuXG4gIHZhciBtb2R1bGUgPSBhbmd1bGFyLm1vZHVsZSgnb25zZW4nKTtcblxuICBtb2R1bGUuZmFjdG9yeSgnTmF2aWdhdG9yVmlldycsIGZ1bmN0aW9uKCRjb21waWxlLCAkb25zZW4pIHtcblxuICAgIC8qKlxuICAgICAqIE1hbmFnZXMgdGhlIHBhZ2UgbmF2aWdhdGlvbiBiYWNrZWQgYnkgcGFnZSBzdGFjay5cbiAgICAgKlxuICAgICAqIEBjbGFzcyBOYXZpZ2F0b3JWaWV3XG4gICAgICovXG4gICAgdmFyIE5hdmlnYXRvclZpZXcgPSBDbGFzcy5leHRlbmQoe1xuXG4gICAgICAvKipcbiAgICAgICAqIEBtZW1iZXIge2pxTGl0ZX0gT2JqZWN0XG4gICAgICAgKi9cbiAgICAgIF9lbGVtZW50OiB1bmRlZmluZWQsXG5cbiAgICAgIC8qKlxuICAgICAgICogQG1lbWJlciB7T2JqZWN0fSBPYmplY3RcbiAgICAgICAqL1xuICAgICAgX2F0dHJzOiB1bmRlZmluZWQsXG5cbiAgICAgIC8qKlxuICAgICAgICogQG1lbWJlciB7T2JqZWN0fVxuICAgICAgICovXG4gICAgICBfc2NvcGU6IHVuZGVmaW5lZCxcblxuICAgICAgLyoqXG4gICAgICAgKiBAcGFyYW0ge09iamVjdH0gc2NvcGVcbiAgICAgICAqIEBwYXJhbSB7anFMaXRlfSBlbGVtZW50IGpxTGl0ZSBPYmplY3QgdG8gbWFuYWdlIHdpdGggbmF2aWdhdG9yXG4gICAgICAgKiBAcGFyYW0ge09iamVjdH0gYXR0cnNcbiAgICAgICAqL1xuICAgICAgaW5pdDogZnVuY3Rpb24oc2NvcGUsIGVsZW1lbnQsIGF0dHJzKSB7XG5cbiAgICAgICAgdGhpcy5fZWxlbWVudCA9IGVsZW1lbnQgfHwgYW5ndWxhci5lbGVtZW50KHdpbmRvdy5kb2N1bWVudC5ib2R5KTtcbiAgICAgICAgdGhpcy5fc2NvcGUgPSBzY29wZSB8fCB0aGlzLl9lbGVtZW50LnNjb3BlKCk7XG4gICAgICAgIHRoaXMuX2F0dHJzID0gYXR0cnM7XG4gICAgICAgIHRoaXMuX3ByZXZpb3VzUGFnZVNjb3BlID0gbnVsbDtcblxuICAgICAgICB0aGlzLl9ib3VuZE9uUHJlcG9wID0gdGhpcy5fb25QcmVwb3AuYmluZCh0aGlzKTtcbiAgICAgICAgdGhpcy5fZWxlbWVudC5vbigncHJlcG9wJywgdGhpcy5fYm91bmRPblByZXBvcCk7XG5cbiAgICAgICAgdGhpcy5fc2NvcGUuJG9uKCckZGVzdHJveScsIHRoaXMuX2Rlc3Ryb3kuYmluZCh0aGlzKSk7XG5cbiAgICAgICAgdGhpcy5fY2xlYXJEZXJpdmluZ0V2ZW50cyA9ICRvbnNlbi5kZXJpdmVFdmVudHModGhpcywgZWxlbWVudFswXSwgW1xuICAgICAgICAgICdwcmVwdXNoJywgJ3Bvc3RwdXNoJywgJ3ByZXBvcCcsXG4gICAgICAgICAgJ3Bvc3Rwb3AnLCAnaW5pdCcsICdzaG93JywgJ2hpZGUnLCAnZGVzdHJveSdcbiAgICAgICAgXSwgZnVuY3Rpb24oZGV0YWlsKSB7XG4gICAgICAgICAgaWYgKGRldGFpbC5uYXZpZ2F0b3IpIHtcbiAgICAgICAgICAgIGRldGFpbC5uYXZpZ2F0b3IgPSB0aGlzO1xuICAgICAgICAgIH1cbiAgICAgICAgICByZXR1cm4gZGV0YWlsO1xuICAgICAgICB9LmJpbmQodGhpcykpO1xuXG4gICAgICAgIHRoaXMuX2NsZWFyRGVyaXZpbmdNZXRob2RzID0gJG9uc2VuLmRlcml2ZU1ldGhvZHModGhpcywgZWxlbWVudFswXSwgW1xuICAgICAgICAgICdpbnNlcnRQYWdlJyxcbiAgICAgICAgICAncmVtb3ZlUGFnZScsXG4gICAgICAgICAgJ3B1c2hQYWdlJyxcbiAgICAgICAgICAnYnJpbmdQYWdlVG9wJyxcbiAgICAgICAgICAncG9wUGFnZScsXG4gICAgICAgICAgJ3JlcGxhY2VQYWdlJyxcbiAgICAgICAgICAncmVzZXRUb1BhZ2UnLFxuICAgICAgICAgICdjYW5Qb3BQYWdlJ1xuICAgICAgICBdKTtcbiAgICAgIH0sXG5cbiAgICAgIF9vblByZXBvcDogZnVuY3Rpb24oZXZlbnQpIHtcbiAgICAgICAgdmFyIHBhZ2VzID0gZXZlbnQuZGV0YWlsLm5hdmlnYXRvci5wYWdlcztcbiAgICAgICAgYW5ndWxhci5lbGVtZW50KHBhZ2VzW3BhZ2VzLmxlbmd0aCAtIDJdKS5kYXRhKCdfc2NvcGUnKS4kZXZhbEFzeW5jKCk7XG4gICAgICB9LFxuXG4gICAgICBfZGVzdHJveTogZnVuY3Rpb24oKSB7XG4gICAgICAgIHRoaXMuZW1pdCgnZGVzdHJveScpO1xuICAgICAgICB0aGlzLl9jbGVhckRlcml2aW5nRXZlbnRzKCk7XG4gICAgICAgIHRoaXMuX2NsZWFyRGVyaXZpbmdNZXRob2RzKCk7XG4gICAgICAgIHRoaXMuX2VsZW1lbnQub2ZmKCdwcmVwb3AnLCB0aGlzLl9ib3VuZE9uUHJlcG9wKTtcbiAgICAgICAgdGhpcy5fZWxlbWVudCA9IHRoaXMuX3Njb3BlID0gdGhpcy5fYXR0cnMgPSBudWxsO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgTWljcm9FdmVudC5taXhpbihOYXZpZ2F0b3JWaWV3KTtcbiAgICAkb25zZW4uZGVyaXZlUHJvcGVydGllc0Zyb21FbGVtZW50KE5hdmlnYXRvclZpZXcsIFsncGFnZXMnLCAndG9wUGFnZScsICdvblN3aXBlJywgJ29wdGlvbnMnLCAnb25EZXZpY2VCYWNrQnV0dG9uJywgJ3BhZ2VMb2FkZXInXSk7XG5cbiAgICByZXR1cm4gTmF2aWdhdG9yVmlldztcbiAgfSk7XG59KSgpO1xuIiwiLypcbkNvcHlyaWdodCAyMDEzLTIwMTUgQVNJQUwgQ09SUE9SQVRJT05cblxuTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbnlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbllvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuXG4gICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcblxuVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG5TZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG5saW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cblxuKi9cblxuKGZ1bmN0aW9uKCkge1xuICAndXNlIHN0cmljdCc7XG5cbiAgdmFyIG1vZHVsZSA9IGFuZ3VsYXIubW9kdWxlKCdvbnNlbicpO1xuXG4gIG1vZHVsZS5mYWN0b3J5KCdQYWdlVmlldycsIGZ1bmN0aW9uKCRvbnNlbiwgJHBhcnNlKSB7XG5cbiAgICB2YXIgUGFnZVZpZXcgPSBDbGFzcy5leHRlbmQoe1xuICAgICAgaW5pdDogZnVuY3Rpb24oc2NvcGUsIGVsZW1lbnQsIGF0dHJzKSB7XG4gICAgICAgIHRoaXMuX3Njb3BlID0gc2NvcGU7XG4gICAgICAgIHRoaXMuX2VsZW1lbnQgPSBlbGVtZW50O1xuICAgICAgICB0aGlzLl9hdHRycyA9IGF0dHJzO1xuXG4gICAgICAgIHRoaXMuX2NsZWFyTGlzdGVuZXIgPSBzY29wZS4kb24oJyRkZXN0cm95JywgdGhpcy5fZGVzdHJveS5iaW5kKHRoaXMpKTtcblxuICAgICAgICB0aGlzLl9jbGVhckRlcml2aW5nRXZlbnRzID0gJG9uc2VuLmRlcml2ZUV2ZW50cyh0aGlzLCBlbGVtZW50WzBdLCBbJ2luaXQnLCAnc2hvdycsICdoaWRlJywgJ2Rlc3Ryb3knXSk7XG5cbiAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRoaXMsICdvbkRldmljZUJhY2tCdXR0b24nLCB7XG4gICAgICAgICAgZ2V0OiAoKSA9PiB0aGlzLl9lbGVtZW50WzBdLm9uRGV2aWNlQmFja0J1dHRvbixcbiAgICAgICAgICBzZXQ6IHZhbHVlID0+IHtcbiAgICAgICAgICAgIGlmICghdGhpcy5fdXNlckJhY2tCdXR0b25IYW5kbGVyKSB7XG4gICAgICAgICAgICAgIHRoaXMuX2VuYWJsZUJhY2tCdXR0b25IYW5kbGVyKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLl91c2VyQmFja0J1dHRvbkhhbmRsZXIgPSB2YWx1ZTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGlmICh0aGlzLl9hdHRycy5uZ0RldmljZUJhY2tCdXR0b24gfHwgdGhpcy5fYXR0cnMub25EZXZpY2VCYWNrQnV0dG9uKSB7XG4gICAgICAgICAgdGhpcy5fZW5hYmxlQmFja0J1dHRvbkhhbmRsZXIoKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5fYXR0cnMubmdJbmZpbml0ZVNjcm9sbCkge1xuICAgICAgICAgIHRoaXMuX2VsZW1lbnRbMF0ub25JbmZpbml0ZVNjcm9sbCA9IChkb25lKSA9PiB7XG4gICAgICAgICAgICAkcGFyc2UodGhpcy5fYXR0cnMubmdJbmZpbml0ZVNjcm9sbCkodGhpcy5fc2NvcGUpKGRvbmUpO1xuICAgICAgICAgIH07XG4gICAgICAgIH1cbiAgICAgIH0sXG5cbiAgICAgIF9lbmFibGVCYWNrQnV0dG9uSGFuZGxlcjogZnVuY3Rpb24oKSB7XG4gICAgICAgIHRoaXMuX3VzZXJCYWNrQnV0dG9uSGFuZGxlciA9IGFuZ3VsYXIubm9vcDtcbiAgICAgICAgdGhpcy5fZWxlbWVudFswXS5vbkRldmljZUJhY2tCdXR0b24gPSB0aGlzLl9vbkRldmljZUJhY2tCdXR0b24uYmluZCh0aGlzKTtcbiAgICAgIH0sXG5cbiAgICAgIF9vbkRldmljZUJhY2tCdXR0b246IGZ1bmN0aW9uKCRldmVudCkge1xuICAgICAgICB0aGlzLl91c2VyQmFja0J1dHRvbkhhbmRsZXIoJGV2ZW50KTtcblxuICAgICAgICAvLyBuZy1kZXZpY2UtYmFja2J1dHRvblxuICAgICAgICBpZiAodGhpcy5fYXR0cnMubmdEZXZpY2VCYWNrQnV0dG9uKSB7XG4gICAgICAgICAgJHBhcnNlKHRoaXMuX2F0dHJzLm5nRGV2aWNlQmFja0J1dHRvbikodGhpcy5fc2NvcGUsIHskZXZlbnQ6ICRldmVudH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gb24tZGV2aWNlLWJhY2tidXR0b25cbiAgICAgICAgLyoganNoaW50IGlnbm9yZTpzdGFydCAqL1xuICAgICAgICBpZiAodGhpcy5fYXR0cnMub25EZXZpY2VCYWNrQnV0dG9uKSB7XG4gICAgICAgICAgdmFyIGxhc3RFdmVudCA9IHdpbmRvdy4kZXZlbnQ7XG4gICAgICAgICAgd2luZG93LiRldmVudCA9ICRldmVudDtcbiAgICAgICAgICBuZXcgRnVuY3Rpb24odGhpcy5fYXR0cnMub25EZXZpY2VCYWNrQnV0dG9uKSgpOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLW5ldy1mdW5jXG4gICAgICAgICAgd2luZG93LiRldmVudCA9IGxhc3RFdmVudDtcbiAgICAgICAgfVxuICAgICAgICAvKiBqc2hpbnQgaWdub3JlOmVuZCAqL1xuICAgICAgfSxcblxuICAgICAgX2Rlc3Ryb3k6IGZ1bmN0aW9uKCkge1xuICAgICAgICB0aGlzLl9jbGVhckRlcml2aW5nRXZlbnRzKCk7XG5cbiAgICAgICAgdGhpcy5fZWxlbWVudCA9IG51bGw7XG4gICAgICAgIHRoaXMuX3Njb3BlID0gbnVsbDtcblxuICAgICAgICB0aGlzLl9jbGVhckxpc3RlbmVyKCk7XG4gICAgICB9XG4gICAgfSk7XG4gICAgTWljcm9FdmVudC5taXhpbihQYWdlVmlldyk7XG5cbiAgICByZXR1cm4gUGFnZVZpZXc7XG4gIH0pO1xufSkoKTtcblxuIiwiLypcbkNvcHlyaWdodCAyMDEzLTIwMTUgQVNJQUwgQ09SUE9SQVRJT05cblxuTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbnlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbllvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuXG4gICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcblxuVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG5TZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG5saW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cblxuKi9cblxuKGZ1bmN0aW9uKCl7XG4gICd1c2Ugc3RyaWN0JztcblxuICBhbmd1bGFyLm1vZHVsZSgnb25zZW4nKS5mYWN0b3J5KCdQb3BvdmVyVmlldycsIGZ1bmN0aW9uKCRvbnNlbikge1xuXG4gICAgdmFyIFBvcG92ZXJWaWV3ID0gQ2xhc3MuZXh0ZW5kKHtcblxuICAgICAgLyoqXG4gICAgICAgKiBAcGFyYW0ge09iamVjdH0gc2NvcGVcbiAgICAgICAqIEBwYXJhbSB7anFMaXRlfSBlbGVtZW50XG4gICAgICAgKiBAcGFyYW0ge09iamVjdH0gYXR0cnNcbiAgICAgICAqL1xuICAgICAgaW5pdDogZnVuY3Rpb24oc2NvcGUsIGVsZW1lbnQsIGF0dHJzKSB7XG4gICAgICAgIHRoaXMuX2VsZW1lbnQgPSBlbGVtZW50O1xuICAgICAgICB0aGlzLl9zY29wZSA9IHNjb3BlO1xuICAgICAgICB0aGlzLl9hdHRycyA9IGF0dHJzO1xuXG4gICAgICAgIHRoaXMuX3Njb3BlLiRvbignJGRlc3Ryb3knLCB0aGlzLl9kZXN0cm95LmJpbmQodGhpcykpO1xuXG4gICAgICAgIHRoaXMuX2NsZWFyRGVyaXZpbmdNZXRob2RzID0gJG9uc2VuLmRlcml2ZU1ldGhvZHModGhpcywgdGhpcy5fZWxlbWVudFswXSwgW1xuICAgICAgICAgICdzaG93JywgJ2hpZGUnXG4gICAgICAgIF0pO1xuXG4gICAgICAgIHRoaXMuX2NsZWFyRGVyaXZpbmdFdmVudHMgPSAkb25zZW4uZGVyaXZlRXZlbnRzKHRoaXMsIHRoaXMuX2VsZW1lbnRbMF0sIFtcbiAgICAgICAgICAncHJlc2hvdycsXG4gICAgICAgICAgJ3Bvc3RzaG93JyxcbiAgICAgICAgICAncHJlaGlkZScsXG4gICAgICAgICAgJ3Bvc3RoaWRlJ1xuICAgICAgICBdLCBmdW5jdGlvbihkZXRhaWwpIHtcbiAgICAgICAgICBpZiAoZGV0YWlsLnBvcG92ZXIpIHtcbiAgICAgICAgICAgIGRldGFpbC5wb3BvdmVyID0gdGhpcztcbiAgICAgICAgICB9XG4gICAgICAgICAgcmV0dXJuIGRldGFpbDtcbiAgICAgICAgfS5iaW5kKHRoaXMpKTtcbiAgICAgIH0sXG5cbiAgICAgIF9kZXN0cm95OiBmdW5jdGlvbigpIHtcbiAgICAgICAgdGhpcy5lbWl0KCdkZXN0cm95Jyk7XG5cbiAgICAgICAgdGhpcy5fY2xlYXJEZXJpdmluZ01ldGhvZHMoKTtcbiAgICAgICAgdGhpcy5fY2xlYXJEZXJpdmluZ0V2ZW50cygpO1xuXG4gICAgICAgIHRoaXMuX2VsZW1lbnQucmVtb3ZlKCk7XG5cbiAgICAgICAgdGhpcy5fZWxlbWVudCA9IHRoaXMuX3Njb3BlID0gbnVsbDtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIE1pY3JvRXZlbnQubWl4aW4oUG9wb3ZlclZpZXcpO1xuICAgICRvbnNlbi5kZXJpdmVQcm9wZXJ0aWVzRnJvbUVsZW1lbnQoUG9wb3ZlclZpZXcsIFsnY2FuY2VsYWJsZScsICdkaXNhYmxlZCcsICdvbkRldmljZUJhY2tCdXR0b24nLCAndmlzaWJsZSddKTtcblxuXG4gICAgcmV0dXJuIFBvcG92ZXJWaWV3O1xuICB9KTtcbn0pKCk7XG4iLCIvKlxuQ29weXJpZ2h0IDIwMTMtMjAxNSBBU0lBTCBDT1JQT1JBVElPTlxuXG5MaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xueW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG5cbiAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuXG5Vbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG5kaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG5XSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cblNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbmxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuXG4qL1xuXG4oZnVuY3Rpb24oKXtcbiAgJ3VzZSBzdHJpY3QnO1xuICB2YXIgbW9kdWxlID0gYW5ndWxhci5tb2R1bGUoJ29uc2VuJyk7XG5cbiAgbW9kdWxlLmZhY3RvcnkoJ1B1bGxIb29rVmlldycsIGZ1bmN0aW9uKCRvbnNlbiwgJHBhcnNlKSB7XG5cbiAgICB2YXIgUHVsbEhvb2tWaWV3ID0gQ2xhc3MuZXh0ZW5kKHtcblxuICAgICAgaW5pdDogZnVuY3Rpb24oc2NvcGUsIGVsZW1lbnQsIGF0dHJzKSB7XG4gICAgICAgIHRoaXMuX2VsZW1lbnQgPSBlbGVtZW50O1xuICAgICAgICB0aGlzLl9zY29wZSA9IHNjb3BlO1xuICAgICAgICB0aGlzLl9hdHRycyA9IGF0dHJzO1xuXG4gICAgICAgIHRoaXMuX2NsZWFyRGVyaXZpbmdFdmVudHMgPSAkb25zZW4uZGVyaXZlRXZlbnRzKHRoaXMsIHRoaXMuX2VsZW1lbnRbMF0sIFtcbiAgICAgICAgICAnY2hhbmdlc3RhdGUnLFxuICAgICAgICBdLCBkZXRhaWwgPT4ge1xuICAgICAgICAgIGlmIChkZXRhaWwucHVsbEhvb2spIHtcbiAgICAgICAgICAgIGRldGFpbC5wdWxsSG9vayA9IHRoaXM7XG4gICAgICAgICAgfVxuICAgICAgICAgIHJldHVybiBkZXRhaWw7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHRoaXMub24oJ2NoYW5nZXN0YXRlJywgKCkgPT4gdGhpcy5fc2NvcGUuJGV2YWxBc3luYygpKTtcblxuICAgICAgICB0aGlzLl9lbGVtZW50WzBdLm9uQWN0aW9uID0gZG9uZSA9PiB7XG4gICAgICAgICAgaWYgKHRoaXMuX2F0dHJzLm5nQWN0aW9uKSB7XG4gICAgICAgICAgICB0aGlzLl9zY29wZS4kZXZhbCh0aGlzLl9hdHRycy5uZ0FjdGlvbiwgeyRkb25lOiBkb25lfSk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMub25BY3Rpb24gPyB0aGlzLm9uQWN0aW9uKGRvbmUpIDogZG9uZSgpO1xuICAgICAgICAgIH1cbiAgICAgICAgfTtcblxuICAgICAgICB0aGlzLl9zY29wZS4kb24oJyRkZXN0cm95JywgdGhpcy5fZGVzdHJveS5iaW5kKHRoaXMpKTtcbiAgICAgIH0sXG5cbiAgICAgIF9kZXN0cm95OiBmdW5jdGlvbigpIHtcbiAgICAgICAgdGhpcy5lbWl0KCdkZXN0cm95Jyk7XG5cbiAgICAgICAgdGhpcy5fY2xlYXJEZXJpdmluZ0V2ZW50cygpO1xuXG4gICAgICAgIHRoaXMuX2VsZW1lbnQgPSB0aGlzLl9zY29wZSA9IHRoaXMuX2F0dHJzID0gbnVsbDtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIE1pY3JvRXZlbnQubWl4aW4oUHVsbEhvb2tWaWV3KTtcblxuICAgICRvbnNlbi5kZXJpdmVQcm9wZXJ0aWVzRnJvbUVsZW1lbnQoUHVsbEhvb2tWaWV3LCBbJ3N0YXRlJywgJ29uUHVsbCcsICdwdWxsRGlzdGFuY2UnLCAnaGVpZ2h0JywgJ3RocmVzaG9sZEhlaWdodCcsICdkaXNhYmxlZCddKTtcblxuICAgIHJldHVybiBQdWxsSG9va1ZpZXc7XG4gIH0pO1xufSkoKTtcbiIsIi8qXG5Db3B5cmlnaHQgMjAxMy0yMDE1IEFTSUFMIENPUlBPUkFUSU9OXG5cbkxpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG55b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG5Zb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcblxuICAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG5cblVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbmRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbldJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxubGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG5cbiovXG5cbihmdW5jdGlvbigpIHtcbiAgJ3VzZSBzdHJpY3QnO1xuXG4gIHZhciBtb2R1bGUgPSBhbmd1bGFyLm1vZHVsZSgnb25zZW4nKTtcblxuICBtb2R1bGUuZmFjdG9yeSgnU3BlZWREaWFsVmlldycsIGZ1bmN0aW9uKCRvbnNlbikge1xuXG4gICAgLyoqXG4gICAgICogQGNsYXNzIFNwZWVkRGlhbFZpZXdcbiAgICAgKi9cbiAgICB2YXIgU3BlZWREaWFsVmlldyA9IENsYXNzLmV4dGVuZCh7XG5cbiAgICAgIC8qKlxuICAgICAgICogQHBhcmFtIHtPYmplY3R9IHNjb3BlXG4gICAgICAgKiBAcGFyYW0ge2pxTGl0ZX0gZWxlbWVudFxuICAgICAgICogQHBhcmFtIHtPYmplY3R9IGF0dHJzXG4gICAgICAgKi9cbiAgICAgIGluaXQ6IGZ1bmN0aW9uKHNjb3BlLCBlbGVtZW50LCBhdHRycykge1xuICAgICAgICB0aGlzLl9lbGVtZW50ID0gZWxlbWVudDtcbiAgICAgICAgdGhpcy5fc2NvcGUgPSBzY29wZTtcbiAgICAgICAgdGhpcy5fYXR0cnMgPSBhdHRycztcblxuICAgICAgICB0aGlzLl9zY29wZS4kb24oJyRkZXN0cm95JywgdGhpcy5fZGVzdHJveS5iaW5kKHRoaXMpKTtcblxuICAgICAgICB0aGlzLl9jbGVhckRlcml2aW5nTWV0aG9kcyA9ICRvbnNlbi5kZXJpdmVNZXRob2RzKHRoaXMsIGVsZW1lbnRbMF0sIFtcbiAgICAgICAgICAnc2hvdycsICdoaWRlJywgJ3Nob3dJdGVtcycsICdoaWRlSXRlbXMnLCAnaXNPcGVuJywgJ3RvZ2dsZScsICd0b2dnbGVJdGVtcydcbiAgICAgICAgXSk7XG5cbiAgICAgICAgdGhpcy5fY2xlYXJEZXJpdmluZ0V2ZW50cyA9ICRvbnNlbi5kZXJpdmVFdmVudHModGhpcywgZWxlbWVudFswXSwgWydvcGVuJywgJ2Nsb3NlJ10pLmJpbmQodGhpcyk7XG4gICAgICB9LFxuXG4gICAgICBfZGVzdHJveTogZnVuY3Rpb24oKSB7XG4gICAgICAgIHRoaXMuZW1pdCgnZGVzdHJveScpO1xuXG4gICAgICAgIHRoaXMuX2NsZWFyRGVyaXZpbmdFdmVudHMoKTtcbiAgICAgICAgdGhpcy5fY2xlYXJEZXJpdmluZ01ldGhvZHMoKTtcblxuICAgICAgICB0aGlzLl9lbGVtZW50ID0gdGhpcy5fc2NvcGUgPSB0aGlzLl9hdHRycyA9IG51bGw7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICBNaWNyb0V2ZW50Lm1peGluKFNwZWVkRGlhbFZpZXcpO1xuXG4gICAgJG9uc2VuLmRlcml2ZVByb3BlcnRpZXNGcm9tRWxlbWVudChTcGVlZERpYWxWaWV3LCBbXG4gICAgICAnZGlzYWJsZWQnLCAndmlzaWJsZScsICdpbmxpbmUnXG4gICAgXSk7XG5cbiAgICByZXR1cm4gU3BlZWREaWFsVmlldztcbiAgfSk7XG59KSgpO1xuIiwiLypcbkNvcHlyaWdodCAyMDEzLTIwMTUgQVNJQUwgQ09SUE9SQVRJT05cblxuTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbnlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbllvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuXG4gICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcblxuVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG5TZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG5saW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cblxuKi9cbihmdW5jdGlvbigpIHtcbiAgJ3VzZSBzdHJpY3QnO1xuXG4gIGFuZ3VsYXIubW9kdWxlKCdvbnNlbicpLmZhY3RvcnkoJ1NwbGl0dGVyQ29udGVudCcsIGZ1bmN0aW9uKCRvbnNlbiwgJGNvbXBpbGUpIHtcblxuICAgIHZhciBTcGxpdHRlckNvbnRlbnQgPSBDbGFzcy5leHRlbmQoe1xuXG4gICAgICBpbml0OiBmdW5jdGlvbihzY29wZSwgZWxlbWVudCwgYXR0cnMpIHtcbiAgICAgICAgdGhpcy5fZWxlbWVudCA9IGVsZW1lbnQ7XG4gICAgICAgIHRoaXMuX3Njb3BlID0gc2NvcGU7XG4gICAgICAgIHRoaXMuX2F0dHJzID0gYXR0cnM7XG5cbiAgICAgICAgdGhpcy5sb2FkID0gdGhpcy5fZWxlbWVudFswXS5sb2FkLmJpbmQodGhpcy5fZWxlbWVudFswXSk7XG4gICAgICAgIHNjb3BlLiRvbignJGRlc3Ryb3knLCB0aGlzLl9kZXN0cm95LmJpbmQodGhpcykpO1xuICAgICAgfSxcblxuICAgICAgX2Rlc3Ryb3k6IGZ1bmN0aW9uKCkge1xuICAgICAgICB0aGlzLmVtaXQoJ2Rlc3Ryb3knKTtcbiAgICAgICAgdGhpcy5fZWxlbWVudCA9IHRoaXMuX3Njb3BlID0gdGhpcy5fYXR0cnMgPSB0aGlzLmxvYWQgPSB0aGlzLl9wYWdlU2NvcGUgPSBudWxsO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgTWljcm9FdmVudC5taXhpbihTcGxpdHRlckNvbnRlbnQpO1xuICAgICRvbnNlbi5kZXJpdmVQcm9wZXJ0aWVzRnJvbUVsZW1lbnQoU3BsaXR0ZXJDb250ZW50LCBbJ3BhZ2UnXSk7XG5cbiAgICByZXR1cm4gU3BsaXR0ZXJDb250ZW50O1xuICB9KTtcbn0pKCk7XG4iLCIvKlxuQ29weXJpZ2h0IDIwMTMtMjAxNSBBU0lBTCBDT1JQT1JBVElPTlxuXG5MaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xueW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG5cbiAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuXG5Vbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG5kaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG5XSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cblNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbmxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuXG4qL1xuKGZ1bmN0aW9uKCkge1xuICAndXNlIHN0cmljdCc7XG5cbiAgYW5ndWxhci5tb2R1bGUoJ29uc2VuJykuZmFjdG9yeSgnU3BsaXR0ZXJTaWRlJywgZnVuY3Rpb24oJG9uc2VuLCAkY29tcGlsZSkge1xuXG4gICAgdmFyIFNwbGl0dGVyU2lkZSA9IENsYXNzLmV4dGVuZCh7XG5cbiAgICAgIGluaXQ6IGZ1bmN0aW9uKHNjb3BlLCBlbGVtZW50LCBhdHRycykge1xuICAgICAgICB0aGlzLl9lbGVtZW50ID0gZWxlbWVudDtcbiAgICAgICAgdGhpcy5fc2NvcGUgPSBzY29wZTtcbiAgICAgICAgdGhpcy5fYXR0cnMgPSBhdHRycztcblxuICAgICAgICB0aGlzLl9jbGVhckRlcml2aW5nTWV0aG9kcyA9ICRvbnNlbi5kZXJpdmVNZXRob2RzKHRoaXMsIHRoaXMuX2VsZW1lbnRbMF0sIFtcbiAgICAgICAgICAnb3BlbicsICdjbG9zZScsICd0b2dnbGUnLCAnbG9hZCdcbiAgICAgICAgXSk7XG5cbiAgICAgICAgdGhpcy5fY2xlYXJEZXJpdmluZ0V2ZW50cyA9ICRvbnNlbi5kZXJpdmVFdmVudHModGhpcywgZWxlbWVudFswXSwgW1xuICAgICAgICAgICdtb2RlY2hhbmdlJywgJ3ByZW9wZW4nLCAncHJlY2xvc2UnLCAncG9zdG9wZW4nLCAncG9zdGNsb3NlJ1xuICAgICAgICBdLCBkZXRhaWwgPT4gZGV0YWlsLnNpZGUgPyBhbmd1bGFyLmV4dGVuZChkZXRhaWwsIHtzaWRlOiB0aGlzfSkgOiBkZXRhaWwpO1xuXG4gICAgICAgIHNjb3BlLiRvbignJGRlc3Ryb3knLCB0aGlzLl9kZXN0cm95LmJpbmQodGhpcykpO1xuICAgICAgfSxcblxuICAgICAgX2Rlc3Ryb3k6IGZ1bmN0aW9uKCkge1xuICAgICAgICB0aGlzLmVtaXQoJ2Rlc3Ryb3knKTtcblxuICAgICAgICB0aGlzLl9jbGVhckRlcml2aW5nTWV0aG9kcygpO1xuICAgICAgICB0aGlzLl9jbGVhckRlcml2aW5nRXZlbnRzKCk7XG5cbiAgICAgICAgdGhpcy5fZWxlbWVudCA9IHRoaXMuX3Njb3BlID0gdGhpcy5fYXR0cnMgPSBudWxsO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgTWljcm9FdmVudC5taXhpbihTcGxpdHRlclNpZGUpO1xuICAgICRvbnNlbi5kZXJpdmVQcm9wZXJ0aWVzRnJvbUVsZW1lbnQoU3BsaXR0ZXJTaWRlLCBbJ3BhZ2UnLCAnbW9kZScsICdpc09wZW4nLCAnb25Td2lwZScsICdwYWdlTG9hZGVyJ10pO1xuXG4gICAgcmV0dXJuIFNwbGl0dGVyU2lkZTtcbiAgfSk7XG59KSgpO1xuIiwiLypcbkNvcHlyaWdodCAyMDEzLTIwMTUgQVNJQUwgQ09SUE9SQVRJT05cblxuTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbnlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbllvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuXG4gICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcblxuVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG5TZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG5saW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cblxuKi9cbihmdW5jdGlvbigpIHtcbiAgJ3VzZSBzdHJpY3QnO1xuXG4gIGFuZ3VsYXIubW9kdWxlKCdvbnNlbicpLmZhY3RvcnkoJ1NwbGl0dGVyJywgZnVuY3Rpb24oJG9uc2VuKSB7XG5cbiAgICB2YXIgU3BsaXR0ZXIgPSBDbGFzcy5leHRlbmQoe1xuICAgICAgaW5pdDogZnVuY3Rpb24oc2NvcGUsIGVsZW1lbnQsIGF0dHJzKSB7XG4gICAgICAgIHRoaXMuX2VsZW1lbnQgPSBlbGVtZW50O1xuICAgICAgICB0aGlzLl9zY29wZSA9IHNjb3BlO1xuICAgICAgICB0aGlzLl9hdHRycyA9IGF0dHJzO1xuICAgICAgICBzY29wZS4kb24oJyRkZXN0cm95JywgdGhpcy5fZGVzdHJveS5iaW5kKHRoaXMpKTtcbiAgICAgIH0sXG5cbiAgICAgIF9kZXN0cm95OiBmdW5jdGlvbigpIHtcbiAgICAgICAgdGhpcy5lbWl0KCdkZXN0cm95Jyk7XG4gICAgICAgIHRoaXMuX2VsZW1lbnQgPSB0aGlzLl9zY29wZSA9IHRoaXMuX2F0dHJzID0gbnVsbDtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIE1pY3JvRXZlbnQubWl4aW4oU3BsaXR0ZXIpO1xuICAgICRvbnNlbi5kZXJpdmVQcm9wZXJ0aWVzRnJvbUVsZW1lbnQoU3BsaXR0ZXIsIFsnb25EZXZpY2VCYWNrQnV0dG9uJ10pO1xuXG4gICAgWydsZWZ0JywgJ3JpZ2h0JywgJ3NpZGUnLCAnY29udGVudCcsICdtYXNrJ10uZm9yRWFjaCgocHJvcCwgaSkgPT4ge1xuICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KFNwbGl0dGVyLnByb3RvdHlwZSwgcHJvcCwge1xuICAgICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICB2YXIgdGFnTmFtZSA9IGBvbnMtc3BsaXR0ZXItJHtpIDwgMyA/ICdzaWRlJyA6IHByb3B9YDtcbiAgICAgICAgICByZXR1cm4gYW5ndWxhci5lbGVtZW50KHRoaXMuX2VsZW1lbnRbMF1bcHJvcF0pLmRhdGEodGFnTmFtZSk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgcmV0dXJuIFNwbGl0dGVyO1xuICB9KTtcbn0pKCk7XG4iLCIvKlxuQ29weXJpZ2h0IDIwMTMtMjAxNSBBU0lBTCBDT1JQT1JBVElPTlxuXG5MaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xueW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG5cbiAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuXG5Vbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG5kaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG5XSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cblNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbmxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuXG4qL1xuXG4oZnVuY3Rpb24oKXtcbiAgJ3VzZSBzdHJpY3QnO1xuXG4gIGFuZ3VsYXIubW9kdWxlKCdvbnNlbicpLmZhY3RvcnkoJ1N3aXRjaFZpZXcnLCBmdW5jdGlvbigkcGFyc2UsICRvbnNlbikge1xuXG4gICAgdmFyIFN3aXRjaFZpZXcgPSBDbGFzcy5leHRlbmQoe1xuXG4gICAgICAvKipcbiAgICAgICAqIEBwYXJhbSB7anFMaXRlfSBlbGVtZW50XG4gICAgICAgKiBAcGFyYW0ge09iamVjdH0gc2NvcGVcbiAgICAgICAqIEBwYXJhbSB7T2JqZWN0fSBhdHRyc1xuICAgICAgICovXG4gICAgICBpbml0OiBmdW5jdGlvbihlbGVtZW50LCBzY29wZSwgYXR0cnMpIHtcbiAgICAgICAgdGhpcy5fZWxlbWVudCA9IGVsZW1lbnQ7XG4gICAgICAgIHRoaXMuX2NoZWNrYm94ID0gYW5ndWxhci5lbGVtZW50KGVsZW1lbnRbMF0ucXVlcnlTZWxlY3RvcignaW5wdXRbdHlwZT1jaGVja2JveF0nKSk7XG4gICAgICAgIHRoaXMuX3Njb3BlID0gc2NvcGU7XG5cbiAgICAgICAgdGhpcy5fcHJlcGFyZU5nTW9kZWwoZWxlbWVudCwgc2NvcGUsIGF0dHJzKTtcblxuICAgICAgICB0aGlzLl9zY29wZS4kb24oJyRkZXN0cm95JywgKCkgPT4ge1xuICAgICAgICAgIHRoaXMuZW1pdCgnZGVzdHJveScpO1xuICAgICAgICAgIHRoaXMuX2VsZW1lbnQgPSB0aGlzLl9jaGVja2JveCA9IHRoaXMuX3Njb3BlID0gbnVsbDtcbiAgICAgICAgfSk7XG4gICAgICB9LFxuXG4gICAgICBfcHJlcGFyZU5nTW9kZWw6IGZ1bmN0aW9uKGVsZW1lbnQsIHNjb3BlLCBhdHRycykge1xuICAgICAgICBpZiAoYXR0cnMubmdNb2RlbCkge1xuICAgICAgICAgIHZhciBzZXQgPSAkcGFyc2UoYXR0cnMubmdNb2RlbCkuYXNzaWduO1xuXG4gICAgICAgICAgc2NvcGUuJHBhcmVudC4kd2F0Y2goYXR0cnMubmdNb2RlbCwgdmFsdWUgPT4ge1xuICAgICAgICAgICAgdGhpcy5jaGVja2VkID0gISF2YWx1ZTtcbiAgICAgICAgICB9KTtcblxuICAgICAgICAgIHRoaXMuX2VsZW1lbnQub24oJ2NoYW5nZScsIGUgPT4ge1xuICAgICAgICAgICAgc2V0KHNjb3BlLiRwYXJlbnQsIHRoaXMuY2hlY2tlZCk7XG5cbiAgICAgICAgICAgIGlmIChhdHRycy5uZ0NoYW5nZSkge1xuICAgICAgICAgICAgICBzY29wZS4kZXZhbChhdHRycy5uZ0NoYW5nZSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHNjb3BlLiRwYXJlbnQuJGV2YWxBc3luYygpO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICBNaWNyb0V2ZW50Lm1peGluKFN3aXRjaFZpZXcpO1xuICAgICRvbnNlbi5kZXJpdmVQcm9wZXJ0aWVzRnJvbUVsZW1lbnQoU3dpdGNoVmlldywgWydkaXNhYmxlZCcsICdjaGVja2VkJywgJ2NoZWNrYm94JywgJ3ZhbHVlJ10pO1xuXG4gICAgcmV0dXJuIFN3aXRjaFZpZXc7XG4gIH0pO1xufSkoKTtcbiIsIi8qXG5Db3B5cmlnaHQgMjAxMy0yMDE1IEFTSUFMIENPUlBPUkFUSU9OXG5cbkxpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG55b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG5Zb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcblxuICAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG5cblVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbmRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbldJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxubGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG5cbiovXG5cbihmdW5jdGlvbigpIHtcbiAgJ3VzZSBzdHJpY3QnO1xuXG4gIHZhciBtb2R1bGUgPSBhbmd1bGFyLm1vZHVsZSgnb25zZW4nKTtcblxuICBtb2R1bGUuZmFjdG9yeSgnVGFiYmFyVmlldycsIGZ1bmN0aW9uKCRvbnNlbikge1xuICAgIHZhciBUYWJiYXJWaWV3ID0gQ2xhc3MuZXh0ZW5kKHtcblxuICAgICAgaW5pdDogZnVuY3Rpb24oc2NvcGUsIGVsZW1lbnQsIGF0dHJzKSB7XG4gICAgICAgIGlmIChlbGVtZW50WzBdLm5vZGVOYW1lLnRvTG93ZXJDYXNlKCkgIT09ICdvbnMtdGFiYmFyJykge1xuICAgICAgICAgIHRocm93IG5ldyBFcnJvcignXCJlbGVtZW50XCIgcGFyYW1ldGVyIG11c3QgYmUgYSBcIm9ucy10YWJiYXJcIiBlbGVtZW50LicpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5fc2NvcGUgPSBzY29wZTtcbiAgICAgICAgdGhpcy5fZWxlbWVudCA9IGVsZW1lbnQ7XG4gICAgICAgIHRoaXMuX2F0dHJzID0gYXR0cnM7XG5cbiAgICAgICAgdGhpcy5fc2NvcGUuJG9uKCckZGVzdHJveScsIHRoaXMuX2Rlc3Ryb3kuYmluZCh0aGlzKSk7XG5cbiAgICAgICAgdGhpcy5fY2xlYXJEZXJpdmluZ0V2ZW50cyA9ICRvbnNlbi5kZXJpdmVFdmVudHModGhpcywgZWxlbWVudFswXSwgW1xuICAgICAgICAgICdyZWFjdGl2ZScsICdwb3N0Y2hhbmdlJywgJ3ByZWNoYW5nZScsICdpbml0JywgJ3Nob3cnLCAnaGlkZScsICdkZXN0cm95J1xuICAgICAgICBdKTtcblxuICAgICAgICB0aGlzLl9jbGVhckRlcml2aW5nTWV0aG9kcyA9ICRvbnNlbi5kZXJpdmVNZXRob2RzKHRoaXMsIGVsZW1lbnRbMF0sIFtcbiAgICAgICAgICAnc2V0QWN0aXZlVGFiJyxcbiAgICAgICAgICAnc2hvdycsXG4gICAgICAgICAgJ2hpZGUnLFxuICAgICAgICAgICdzZXRUYWJiYXJWaXNpYmlsaXR5JyxcbiAgICAgICAgICAnZ2V0QWN0aXZlVGFiSW5kZXgnLFxuICAgICAgICBdKTtcbiAgICAgIH0sXG5cbiAgICAgIF9kZXN0cm95OiBmdW5jdGlvbigpIHtcbiAgICAgICAgdGhpcy5lbWl0KCdkZXN0cm95Jyk7XG5cbiAgICAgICAgdGhpcy5fY2xlYXJEZXJpdmluZ0V2ZW50cygpO1xuICAgICAgICB0aGlzLl9jbGVhckRlcml2aW5nTWV0aG9kcygpO1xuXG4gICAgICAgIHRoaXMuX2VsZW1lbnQgPSB0aGlzLl9zY29wZSA9IHRoaXMuX2F0dHJzID0gbnVsbDtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIE1pY3JvRXZlbnQubWl4aW4oVGFiYmFyVmlldyk7XG5cbiAgICAkb25zZW4uZGVyaXZlUHJvcGVydGllc0Zyb21FbGVtZW50KFRhYmJhclZpZXcsIFsndmlzaWJsZScsICdzd2lwZWFibGUnLCAnb25Td2lwZSddKTtcblxuICAgIHJldHVybiBUYWJiYXJWaWV3O1xuICB9KTtcblxufSkoKTtcbiIsIi8qXG5Db3B5cmlnaHQgMjAxMy0yMDE1IEFTSUFMIENPUlBPUkFUSU9OXG5cbkxpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG55b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG5Zb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcblxuICAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG5cblVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbmRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbldJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxubGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG5cbiovXG5cbihmdW5jdGlvbigpIHtcbiAgJ3VzZSBzdHJpY3QnO1xuXG4gIHZhciBtb2R1bGUgPSBhbmd1bGFyLm1vZHVsZSgnb25zZW4nKTtcblxuICBtb2R1bGUuZmFjdG9yeSgnVG9hc3RWaWV3JywgZnVuY3Rpb24oJG9uc2VuKSB7XG5cbiAgICB2YXIgVG9hc3RWaWV3ID0gQ2xhc3MuZXh0ZW5kKHtcblxuICAgICAgLyoqXG4gICAgICAgKiBAcGFyYW0ge09iamVjdH0gc2NvcGVcbiAgICAgICAqIEBwYXJhbSB7anFMaXRlfSBlbGVtZW50XG4gICAgICAgKiBAcGFyYW0ge09iamVjdH0gYXR0cnNcbiAgICAgICAqL1xuICAgICAgaW5pdDogZnVuY3Rpb24oc2NvcGUsIGVsZW1lbnQsIGF0dHJzKSB7XG4gICAgICAgIHRoaXMuX3Njb3BlID0gc2NvcGU7XG4gICAgICAgIHRoaXMuX2VsZW1lbnQgPSBlbGVtZW50O1xuICAgICAgICB0aGlzLl9hdHRycyA9IGF0dHJzO1xuXG4gICAgICAgIHRoaXMuX2NsZWFyRGVyaXZpbmdNZXRob2RzID0gJG9uc2VuLmRlcml2ZU1ldGhvZHModGhpcywgdGhpcy5fZWxlbWVudFswXSwgW1xuICAgICAgICAgICdzaG93JywgJ2hpZGUnLCAndG9nZ2xlJ1xuICAgICAgICBdKTtcblxuICAgICAgICB0aGlzLl9jbGVhckRlcml2aW5nRXZlbnRzID0gJG9uc2VuLmRlcml2ZUV2ZW50cyh0aGlzLCB0aGlzLl9lbGVtZW50WzBdLCBbXG4gICAgICAgICAgJ3ByZXNob3cnLFxuICAgICAgICAgICdwb3N0c2hvdycsXG4gICAgICAgICAgJ3ByZWhpZGUnLFxuICAgICAgICAgICdwb3N0aGlkZSdcbiAgICAgICAgXSwgZnVuY3Rpb24oZGV0YWlsKSB7XG4gICAgICAgICAgaWYgKGRldGFpbC50b2FzdCkge1xuICAgICAgICAgICAgZGV0YWlsLnRvYXN0ID0gdGhpcztcbiAgICAgICAgICB9XG4gICAgICAgICAgcmV0dXJuIGRldGFpbDtcbiAgICAgICAgfS5iaW5kKHRoaXMpKTtcblxuICAgICAgICB0aGlzLl9zY29wZS4kb24oJyRkZXN0cm95JywgdGhpcy5fZGVzdHJveS5iaW5kKHRoaXMpKTtcbiAgICAgIH0sXG5cbiAgICAgIF9kZXN0cm95OiBmdW5jdGlvbigpIHtcbiAgICAgICAgdGhpcy5lbWl0KCdkZXN0cm95Jyk7XG5cbiAgICAgICAgdGhpcy5fZWxlbWVudC5yZW1vdmUoKTtcblxuICAgICAgICB0aGlzLl9jbGVhckRlcml2aW5nTWV0aG9kcygpO1xuICAgICAgICB0aGlzLl9jbGVhckRlcml2aW5nRXZlbnRzKCk7XG5cbiAgICAgICAgdGhpcy5fc2NvcGUgPSB0aGlzLl9hdHRycyA9IHRoaXMuX2VsZW1lbnQgPSBudWxsO1xuICAgICAgfVxuXG4gICAgfSk7XG5cbiAgICBNaWNyb0V2ZW50Lm1peGluKFRvYXN0Vmlldyk7XG4gICAgJG9uc2VuLmRlcml2ZVByb3BlcnRpZXNGcm9tRWxlbWVudChUb2FzdFZpZXcsIFsndmlzaWJsZScsICdvbkRldmljZUJhY2tCdXR0b24nXSk7XG5cbiAgICByZXR1cm4gVG9hc3RWaWV3O1xuICB9KTtcbn0pKCk7XG4iLCIoZnVuY3Rpb24oKSB7XG4gICd1c2Ugc3RyaWN0JztcblxuICBhbmd1bGFyLm1vZHVsZSgnb25zZW4nKS5kaXJlY3RpdmUoJ29uc0FjdGlvblNoZWV0QnV0dG9uJywgZnVuY3Rpb24oJG9uc2VuLCBHZW5lcmljVmlldykge1xuICAgIHJldHVybiB7XG4gICAgICByZXN0cmljdDogJ0UnLFxuICAgICAgbGluazogZnVuY3Rpb24oc2NvcGUsIGVsZW1lbnQsIGF0dHJzKSB7XG4gICAgICAgIEdlbmVyaWNWaWV3LnJlZ2lzdGVyKHNjb3BlLCBlbGVtZW50LCBhdHRycywge3ZpZXdLZXk6ICdvbnMtYWN0aW9uLXNoZWV0LWJ1dHRvbid9KTtcbiAgICAgICAgJG9uc2VuLmZpcmVDb21wb25lbnRFdmVudChlbGVtZW50WzBdLCAnaW5pdCcpO1xuICAgICAgfVxuICAgIH07XG4gIH0pO1xuXG59KSgpO1xuIiwiLyoqXG4gKiBAZWxlbWVudCBvbnMtYWN0aW9uLXNoZWV0XG4gKi9cblxuLyoqXG4gKiBAYXR0cmlidXRlIHZhclxuICogQGluaXRvbmx5XG4gKiBAdHlwZSB7U3RyaW5nfVxuICogQGRlc2NyaXB0aW9uXG4gKiAgW2VuXVZhcmlhYmxlIG5hbWUgdG8gcmVmZXIgdGhpcyBhY3Rpb24gc2hlZXQuWy9lbl1cbiAqICBbamFd44GT44Gu44Ki44Kv44K344On44Oz44K344O844OI44KS5Y+C54Wn44GZ44KL44Gf44KB44Gu5ZCN5YmN44KS5oyH5a6a44GX44G+44GZ44CCWy9qYV1cbiAqL1xuXG4vKipcbiAqIEBhdHRyaWJ1dGUgb25zLXByZXNob3dcbiAqIEBpbml0b25seVxuICogQHR5cGUge0V4cHJlc3Npb259XG4gKiBAZGVzY3JpcHRpb25cbiAqICBbZW5dQWxsb3dzIHlvdSB0byBzcGVjaWZ5IGN1c3RvbSBiZWhhdmlvciB3aGVuIHRoZSBcInByZXNob3dcIiBldmVudCBpcyBmaXJlZC5bL2VuXVxuICogIFtqYV1cInByZXNob3dcIuOCpOODmeODs+ODiOOBjOeZuueBq+OBleOCjOOBn+aZguOBruaMmeWLleOCkueLrOiHquOBq+aMh+WumuOBp+OBjeOBvuOBmeOAglsvamFdXG4gKi9cblxuLyoqXG4gKiBAYXR0cmlidXRlIG9ucy1wcmVoaWRlXG4gKiBAaW5pdG9ubHlcbiAqIEB0eXBlIHtFeHByZXNzaW9ufVxuICogQGRlc2NyaXB0aW9uXG4gKiAgW2VuXUFsbG93cyB5b3UgdG8gc3BlY2lmeSBjdXN0b20gYmVoYXZpb3Igd2hlbiB0aGUgXCJwcmVoaWRlXCIgZXZlbnQgaXMgZmlyZWQuWy9lbl1cbiAqICBbamFdXCJwcmVoaWRlXCLjgqTjg5njg7Pjg4jjgYznmbrngavjgZXjgozjgZ/mmYLjga7mjJnli5XjgpLni6zoh6rjgavmjIflrprjgafjgY3jgb7jgZnjgIJbL2phXVxuICovXG5cbi8qKlxuICogQGF0dHJpYnV0ZSBvbnMtcG9zdHNob3dcbiAqIEBpbml0b25seVxuICogQHR5cGUge0V4cHJlc3Npb259XG4gKiBAZGVzY3JpcHRpb25cbiAqICBbZW5dQWxsb3dzIHlvdSB0byBzcGVjaWZ5IGN1c3RvbSBiZWhhdmlvciB3aGVuIHRoZSBcInBvc3RzaG93XCIgZXZlbnQgaXMgZmlyZWQuWy9lbl1cbiAqICBbamFdXCJwb3N0c2hvd1wi44Kk44OZ44Oz44OI44GM55m654Gr44GV44KM44Gf5pmC44Gu5oyZ5YuV44KS54us6Ieq44Gr5oyH5a6a44Gn44GN44G+44GZ44CCWy9qYV1cbiAqL1xuXG4vKipcbiAqIEBhdHRyaWJ1dGUgb25zLXBvc3RoaWRlXG4gKiBAaW5pdG9ubHlcbiAqIEB0eXBlIHtFeHByZXNzaW9ufVxuICogQGRlc2NyaXB0aW9uXG4gKiAgW2VuXUFsbG93cyB5b3UgdG8gc3BlY2lmeSBjdXN0b20gYmVoYXZpb3Igd2hlbiB0aGUgXCJwb3N0aGlkZVwiIGV2ZW50IGlzIGZpcmVkLlsvZW5dXG4gKiAgW2phXVwicG9zdGhpZGVcIuOCpOODmeODs+ODiOOBjOeZuueBq+OBleOCjOOBn+aZguOBruaMmeWLleOCkueLrOiHquOBq+aMh+WumuOBp+OBjeOBvuOBmeOAglsvamFdXG4gKi9cblxuLyoqXG4gKiBAYXR0cmlidXRlIG9ucy1kZXN0cm95XG4gKiBAaW5pdG9ubHlcbiAqIEB0eXBlIHtFeHByZXNzaW9ufVxuICogQGRlc2NyaXB0aW9uXG4gKiAgW2VuXUFsbG93cyB5b3UgdG8gc3BlY2lmeSBjdXN0b20gYmVoYXZpb3Igd2hlbiB0aGUgXCJkZXN0cm95XCIgZXZlbnQgaXMgZmlyZWQuWy9lbl1cbiAqICBbamFdXCJkZXN0cm95XCLjgqTjg5njg7Pjg4jjgYznmbrngavjgZXjgozjgZ/mmYLjga7mjJnli5XjgpLni6zoh6rjgavmjIflrprjgafjgY3jgb7jgZnjgIJbL2phXVxuICovXG5cbi8qKlxuICogQG1ldGhvZCBvblxuICogQHNpZ25hdHVyZSBvbihldmVudE5hbWUsIGxpc3RlbmVyKVxuICogQGRlc2NyaXB0aW9uXG4gKiAgIFtlbl1BZGQgYW4gZXZlbnQgbGlzdGVuZXIuWy9lbl1cbiAqICAgW2phXeOCpOODmeODs+ODiOODquOCueODiuODvOOCkui/veWKoOOBl+OBvuOBmeOAglsvamFdXG4gKiBAcGFyYW0ge1N0cmluZ30gZXZlbnROYW1lXG4gKiAgIFtlbl1OYW1lIG9mIHRoZSBldmVudC5bL2VuXVxuICogICBbamFd44Kk44OZ44Oz44OI5ZCN44KS5oyH5a6a44GX44G+44GZ44CCWy9qYV1cbiAqIEBwYXJhbSB7RnVuY3Rpb259IGxpc3RlbmVyXG4gKiAgIFtlbl1GdW5jdGlvbiB0byBleGVjdXRlIHdoZW4gdGhlIGV2ZW50IGlzIHRyaWdnZXJlZC5bL2VuXVxuICogICBbamFd44Kk44OZ44Oz44OI44GM55m654Gr44GV44KM44Gf6Zqb44Gr5ZG844Gz5Ye644GV44KM44KL44Kz44O844Or44OQ44OD44Kv44KS5oyH5a6a44GX44G+44GZ44CCWy9qYV1cbiAqL1xuXG4vKipcbiAqIEBtZXRob2Qgb25jZVxuICogQHNpZ25hdHVyZSBvbmNlKGV2ZW50TmFtZSwgbGlzdGVuZXIpXG4gKiBAZGVzY3JpcHRpb25cbiAqICBbZW5dQWRkIGFuIGV2ZW50IGxpc3RlbmVyIHRoYXQncyBvbmx5IHRyaWdnZXJlZCBvbmNlLlsvZW5dXG4gKiAgW2phXeS4gOW6puOBoOOBkeWRvOOBs+WHuuOBleOCjOOCi+OCpOODmeODs+ODiOODquOCueODiuODvOOCkui/veWKoOOBl+OBvuOBmeOAglsvamFdXG4gKiBAcGFyYW0ge1N0cmluZ30gZXZlbnROYW1lXG4gKiAgIFtlbl1OYW1lIG9mIHRoZSBldmVudC5bL2VuXVxuICogICBbamFd44Kk44OZ44Oz44OI5ZCN44KS5oyH5a6a44GX44G+44GZ44CCWy9qYV1cbiAqIEBwYXJhbSB7RnVuY3Rpb259IGxpc3RlbmVyXG4gKiAgIFtlbl1GdW5jdGlvbiB0byBleGVjdXRlIHdoZW4gdGhlIGV2ZW50IGlzIHRyaWdnZXJlZC5bL2VuXVxuICogICBbamFd44Kk44OZ44Oz44OI44GM55m654Gr44GX44Gf6Zqb44Gr5ZG844Gz5Ye644GV44KM44KL44Kz44O844Or44OQ44OD44Kv44KS5oyH5a6a44GX44G+44GZ44CCWy9qYV1cbiAqL1xuXG4vKipcbiAqIEBtZXRob2Qgb2ZmXG4gKiBAc2lnbmF0dXJlIG9mZihldmVudE5hbWUsIFtsaXN0ZW5lcl0pXG4gKiBAZGVzY3JpcHRpb25cbiAqICBbZW5dUmVtb3ZlIGFuIGV2ZW50IGxpc3RlbmVyLiBJZiB0aGUgbGlzdGVuZXIgaXMgbm90IHNwZWNpZmllZCBhbGwgbGlzdGVuZXJzIGZvciB0aGUgZXZlbnQgdHlwZSB3aWxsIGJlIHJlbW92ZWQuWy9lbl1cbiAqICBbamFd44Kk44OZ44Oz44OI44Oq44K544OK44O844KS5YmK6Zmk44GX44G+44GZ44CC44KC44GXbGlzdGVuZXLjg5Hjg6njg6Hjg7zjgr/jgYzmjIflrprjgZXjgozjgarjgYvjgaPjgZ/loLTlkIjjgIHjgZ3jga7jgqTjg5njg7Pjg4jjga7jg6rjgrnjg4rjg7zjgYzlhajjgabliYrpmaTjgZXjgozjgb7jgZnjgIJbL2phXVxuICogQHBhcmFtIHtTdHJpbmd9IGV2ZW50TmFtZVxuICogICBbZW5dTmFtZSBvZiB0aGUgZXZlbnQuWy9lbl1cbiAqICAgW2phXeOCpOODmeODs+ODiOWQjeOCkuaMh+WumuOBl+OBvuOBmeOAglsvamFdXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBsaXN0ZW5lclxuICogICBbZW5dRnVuY3Rpb24gdG8gZXhlY3V0ZSB3aGVuIHRoZSBldmVudCBpcyB0cmlnZ2VyZWQuWy9lbl1cbiAqICAgW2phXeWJiumZpOOBmeOCi+OCpOODmeODs+ODiOODquOCueODiuODvOOBrumWouaVsOOCquODluOCuOOCp+OCr+ODiOOCkua4oeOBl+OBvuOBmeOAglsvamFdXG4gKi9cblxuKGZ1bmN0aW9uKCkge1xuICAndXNlIHN0cmljdCc7XG5cbiAgLyoqXG4gICAqIEFjdGlvbiBzaGVldCBkaXJlY3RpdmUuXG4gICAqL1xuICBhbmd1bGFyLm1vZHVsZSgnb25zZW4nKS5kaXJlY3RpdmUoJ29uc0FjdGlvblNoZWV0JywgZnVuY3Rpb24oJG9uc2VuLCBBY3Rpb25TaGVldFZpZXcpIHtcbiAgICByZXR1cm4ge1xuICAgICAgcmVzdHJpY3Q6ICdFJyxcbiAgICAgIHJlcGxhY2U6IGZhbHNlLFxuICAgICAgc2NvcGU6IHRydWUsXG4gICAgICB0cmFuc2NsdWRlOiBmYWxzZSxcblxuICAgICAgY29tcGlsZTogZnVuY3Rpb24oZWxlbWVudCwgYXR0cnMpIHtcblxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgIHByZTogZnVuY3Rpb24oc2NvcGUsIGVsZW1lbnQsIGF0dHJzKSB7XG4gICAgICAgICAgICB2YXIgYWN0aW9uU2hlZXQgPSBuZXcgQWN0aW9uU2hlZXRWaWV3KHNjb3BlLCBlbGVtZW50LCBhdHRycyk7XG5cbiAgICAgICAgICAgICRvbnNlbi5kZWNsYXJlVmFyQXR0cmlidXRlKGF0dHJzLCBhY3Rpb25TaGVldCk7XG4gICAgICAgICAgICAkb25zZW4ucmVnaXN0ZXJFdmVudEhhbmRsZXJzKGFjdGlvblNoZWV0LCAncHJlc2hvdyBwcmVoaWRlIHBvc3RzaG93IHBvc3RoaWRlIGRlc3Ryb3knKTtcbiAgICAgICAgICAgICRvbnNlbi5hZGRNb2RpZmllck1ldGhvZHNGb3JDdXN0b21FbGVtZW50cyhhY3Rpb25TaGVldCwgZWxlbWVudCk7XG5cbiAgICAgICAgICAgIGVsZW1lbnQuZGF0YSgnb25zLWFjdGlvbi1zaGVldCcsIGFjdGlvblNoZWV0KTtcblxuICAgICAgICAgICAgc2NvcGUuJG9uKCckZGVzdHJveScsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICBhY3Rpb25TaGVldC5fZXZlbnRzID0gdW5kZWZpbmVkO1xuICAgICAgICAgICAgICAkb25zZW4ucmVtb3ZlTW9kaWZpZXJNZXRob2RzKGFjdGlvblNoZWV0KTtcbiAgICAgICAgICAgICAgZWxlbWVudC5kYXRhKCdvbnMtYWN0aW9uLXNoZWV0JywgdW5kZWZpbmVkKTtcbiAgICAgICAgICAgICAgZWxlbWVudCA9IG51bGw7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9LFxuICAgICAgICAgIHBvc3Q6IGZ1bmN0aW9uKHNjb3BlLCBlbGVtZW50KSB7XG4gICAgICAgICAgICAkb25zZW4uZmlyZUNvbXBvbmVudEV2ZW50KGVsZW1lbnRbMF0sICdpbml0Jyk7XG4gICAgICAgICAgfVxuICAgICAgICB9O1xuICAgICAgfVxuICAgIH07XG4gIH0pO1xuXG59KSgpO1xuIiwiLyoqXG4gKiBAZWxlbWVudCBvbnMtYWxlcnQtZGlhbG9nXG4gKi9cblxuLyoqXG4gKiBAYXR0cmlidXRlIHZhclxuICogQGluaXRvbmx5XG4gKiBAdHlwZSB7U3RyaW5nfVxuICogQGRlc2NyaXB0aW9uXG4gKiAgW2VuXVZhcmlhYmxlIG5hbWUgdG8gcmVmZXIgdGhpcyBhbGVydCBkaWFsb2cuWy9lbl1cbiAqICBbamFd44GT44Gu44Ki44Op44O844OI44OA44Kk44Ki44Ot44Kw44KS5Y+C54Wn44GZ44KL44Gf44KB44Gu5ZCN5YmN44KS5oyH5a6a44GX44G+44GZ44CCWy9qYV1cbiAqL1xuXG4vKipcbiAqIEBhdHRyaWJ1dGUgb25zLXByZXNob3dcbiAqIEBpbml0b25seVxuICogQHR5cGUge0V4cHJlc3Npb259XG4gKiBAZGVzY3JpcHRpb25cbiAqICBbZW5dQWxsb3dzIHlvdSB0byBzcGVjaWZ5IGN1c3RvbSBiZWhhdmlvciB3aGVuIHRoZSBcInByZXNob3dcIiBldmVudCBpcyBmaXJlZC5bL2VuXVxuICogIFtqYV1cInByZXNob3dcIuOCpOODmeODs+ODiOOBjOeZuueBq+OBleOCjOOBn+aZguOBruaMmeWLleOCkueLrOiHquOBq+aMh+WumuOBp+OBjeOBvuOBmeOAglsvamFdXG4gKi9cblxuLyoqXG4gKiBAYXR0cmlidXRlIG9ucy1wcmVoaWRlXG4gKiBAaW5pdG9ubHlcbiAqIEB0eXBlIHtFeHByZXNzaW9ufVxuICogQGRlc2NyaXB0aW9uXG4gKiAgW2VuXUFsbG93cyB5b3UgdG8gc3BlY2lmeSBjdXN0b20gYmVoYXZpb3Igd2hlbiB0aGUgXCJwcmVoaWRlXCIgZXZlbnQgaXMgZmlyZWQuWy9lbl1cbiAqICBbamFdXCJwcmVoaWRlXCLjgqTjg5njg7Pjg4jjgYznmbrngavjgZXjgozjgZ/mmYLjga7mjJnli5XjgpLni6zoh6rjgavmjIflrprjgafjgY3jgb7jgZnjgIJbL2phXVxuICovXG5cbi8qKlxuICogQGF0dHJpYnV0ZSBvbnMtcG9zdHNob3dcbiAqIEBpbml0b25seVxuICogQHR5cGUge0V4cHJlc3Npb259XG4gKiBAZGVzY3JpcHRpb25cbiAqICBbZW5dQWxsb3dzIHlvdSB0byBzcGVjaWZ5IGN1c3RvbSBiZWhhdmlvciB3aGVuIHRoZSBcInBvc3RzaG93XCIgZXZlbnQgaXMgZmlyZWQuWy9lbl1cbiAqICBbamFdXCJwb3N0c2hvd1wi44Kk44OZ44Oz44OI44GM55m654Gr44GV44KM44Gf5pmC44Gu5oyZ5YuV44KS54us6Ieq44Gr5oyH5a6a44Gn44GN44G+44GZ44CCWy9qYV1cbiAqL1xuXG4vKipcbiAqIEBhdHRyaWJ1dGUgb25zLXBvc3RoaWRlXG4gKiBAaW5pdG9ubHlcbiAqIEB0eXBlIHtFeHByZXNzaW9ufVxuICogQGRlc2NyaXB0aW9uXG4gKiAgW2VuXUFsbG93cyB5b3UgdG8gc3BlY2lmeSBjdXN0b20gYmVoYXZpb3Igd2hlbiB0aGUgXCJwb3N0aGlkZVwiIGV2ZW50IGlzIGZpcmVkLlsvZW5dXG4gKiAgW2phXVwicG9zdGhpZGVcIuOCpOODmeODs+ODiOOBjOeZuueBq+OBleOCjOOBn+aZguOBruaMmeWLleOCkueLrOiHquOBq+aMh+WumuOBp+OBjeOBvuOBmeOAglsvamFdXG4gKi9cblxuLyoqXG4gKiBAYXR0cmlidXRlIG9ucy1kZXN0cm95XG4gKiBAaW5pdG9ubHlcbiAqIEB0eXBlIHtFeHByZXNzaW9ufVxuICogQGRlc2NyaXB0aW9uXG4gKiAgW2VuXUFsbG93cyB5b3UgdG8gc3BlY2lmeSBjdXN0b20gYmVoYXZpb3Igd2hlbiB0aGUgXCJkZXN0cm95XCIgZXZlbnQgaXMgZmlyZWQuWy9lbl1cbiAqICBbamFdXCJkZXN0cm95XCLjgqTjg5njg7Pjg4jjgYznmbrngavjgZXjgozjgZ/mmYLjga7mjJnli5XjgpLni6zoh6rjgavmjIflrprjgafjgY3jgb7jgZnjgIJbL2phXVxuICovXG5cbi8qKlxuICogQG1ldGhvZCBvblxuICogQHNpZ25hdHVyZSBvbihldmVudE5hbWUsIGxpc3RlbmVyKVxuICogQGRlc2NyaXB0aW9uXG4gKiAgIFtlbl1BZGQgYW4gZXZlbnQgbGlzdGVuZXIuWy9lbl1cbiAqICAgW2phXeOCpOODmeODs+ODiOODquOCueODiuODvOOCkui/veWKoOOBl+OBvuOBmeOAglsvamFdXG4gKiBAcGFyYW0ge1N0cmluZ30gZXZlbnROYW1lXG4gKiAgIFtlbl1OYW1lIG9mIHRoZSBldmVudC5bL2VuXVxuICogICBbamFd44Kk44OZ44Oz44OI5ZCN44KS5oyH5a6a44GX44G+44GZ44CCWy9qYV1cbiAqIEBwYXJhbSB7RnVuY3Rpb259IGxpc3RlbmVyXG4gKiAgIFtlbl1GdW5jdGlvbiB0byBleGVjdXRlIHdoZW4gdGhlIGV2ZW50IGlzIHRyaWdnZXJlZC5bL2VuXVxuICogICBbamFd44Kk44OZ44Oz44OI44GM55m654Gr44GV44KM44Gf6Zqb44Gr5ZG844Gz5Ye644GV44KM44KL44Kz44O844Or44OQ44OD44Kv44KS5oyH5a6a44GX44G+44GZ44CCWy9qYV1cbiAqL1xuXG4vKipcbiAqIEBtZXRob2Qgb25jZVxuICogQHNpZ25hdHVyZSBvbmNlKGV2ZW50TmFtZSwgbGlzdGVuZXIpXG4gKiBAZGVzY3JpcHRpb25cbiAqICBbZW5dQWRkIGFuIGV2ZW50IGxpc3RlbmVyIHRoYXQncyBvbmx5IHRyaWdnZXJlZCBvbmNlLlsvZW5dXG4gKiAgW2phXeS4gOW6puOBoOOBkeWRvOOBs+WHuuOBleOCjOOCi+OCpOODmeODs+ODiOODquOCueODiuODvOOCkui/veWKoOOBl+OBvuOBmeOAglsvamFdXG4gKiBAcGFyYW0ge1N0cmluZ30gZXZlbnROYW1lXG4gKiAgIFtlbl1OYW1lIG9mIHRoZSBldmVudC5bL2VuXVxuICogICBbamFd44Kk44OZ44Oz44OI5ZCN44KS5oyH5a6a44GX44G+44GZ44CCWy9qYV1cbiAqIEBwYXJhbSB7RnVuY3Rpb259IGxpc3RlbmVyXG4gKiAgIFtlbl1GdW5jdGlvbiB0byBleGVjdXRlIHdoZW4gdGhlIGV2ZW50IGlzIHRyaWdnZXJlZC5bL2VuXVxuICogICBbamFd44Kk44OZ44Oz44OI44GM55m654Gr44GX44Gf6Zqb44Gr5ZG844Gz5Ye644GV44KM44KL44Kz44O844Or44OQ44OD44Kv44KS5oyH5a6a44GX44G+44GZ44CCWy9qYV1cbiAqL1xuXG4vKipcbiAqIEBtZXRob2Qgb2ZmXG4gKiBAc2lnbmF0dXJlIG9mZihldmVudE5hbWUsIFtsaXN0ZW5lcl0pXG4gKiBAZGVzY3JpcHRpb25cbiAqICBbZW5dUmVtb3ZlIGFuIGV2ZW50IGxpc3RlbmVyLiBJZiB0aGUgbGlzdGVuZXIgaXMgbm90IHNwZWNpZmllZCBhbGwgbGlzdGVuZXJzIGZvciB0aGUgZXZlbnQgdHlwZSB3aWxsIGJlIHJlbW92ZWQuWy9lbl1cbiAqICBbamFd44Kk44OZ44Oz44OI44Oq44K544OK44O844KS5YmK6Zmk44GX44G+44GZ44CC44KC44GXbGlzdGVuZXLjg5Hjg6njg6Hjg7zjgr/jgYzmjIflrprjgZXjgozjgarjgYvjgaPjgZ/loLTlkIjjgIHjgZ3jga7jgqTjg5njg7Pjg4jjga7jg6rjgrnjg4rjg7zjgYzlhajjgabliYrpmaTjgZXjgozjgb7jgZnjgIJbL2phXVxuICogQHBhcmFtIHtTdHJpbmd9IGV2ZW50TmFtZVxuICogICBbZW5dTmFtZSBvZiB0aGUgZXZlbnQuWy9lbl1cbiAqICAgW2phXeOCpOODmeODs+ODiOWQjeOCkuaMh+WumuOBl+OBvuOBmeOAglsvamFdXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBsaXN0ZW5lclxuICogICBbZW5dRnVuY3Rpb24gdG8gZXhlY3V0ZSB3aGVuIHRoZSBldmVudCBpcyB0cmlnZ2VyZWQuWy9lbl1cbiAqICAgW2phXeWJiumZpOOBmeOCi+OCpOODmeODs+ODiOODquOCueODiuODvOOBrumWouaVsOOCquODluOCuOOCp+OCr+ODiOOCkua4oeOBl+OBvuOBmeOAglsvamFdXG4gKi9cblxuKGZ1bmN0aW9uKCkge1xuICAndXNlIHN0cmljdCc7XG5cbiAgLyoqXG4gICAqIEFsZXJ0IGRpYWxvZyBkaXJlY3RpdmUuXG4gICAqL1xuICBhbmd1bGFyLm1vZHVsZSgnb25zZW4nKS5kaXJlY3RpdmUoJ29uc0FsZXJ0RGlhbG9nJywgZnVuY3Rpb24oJG9uc2VuLCBBbGVydERpYWxvZ1ZpZXcpIHtcbiAgICByZXR1cm4ge1xuICAgICAgcmVzdHJpY3Q6ICdFJyxcbiAgICAgIHJlcGxhY2U6IGZhbHNlLFxuICAgICAgc2NvcGU6IHRydWUsXG4gICAgICB0cmFuc2NsdWRlOiBmYWxzZSxcblxuICAgICAgY29tcGlsZTogZnVuY3Rpb24oZWxlbWVudCwgYXR0cnMpIHtcblxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgIHByZTogZnVuY3Rpb24oc2NvcGUsIGVsZW1lbnQsIGF0dHJzKSB7XG4gICAgICAgICAgICB2YXIgYWxlcnREaWFsb2cgPSBuZXcgQWxlcnREaWFsb2dWaWV3KHNjb3BlLCBlbGVtZW50LCBhdHRycyk7XG5cbiAgICAgICAgICAgICRvbnNlbi5kZWNsYXJlVmFyQXR0cmlidXRlKGF0dHJzLCBhbGVydERpYWxvZyk7XG4gICAgICAgICAgICAkb25zZW4ucmVnaXN0ZXJFdmVudEhhbmRsZXJzKGFsZXJ0RGlhbG9nLCAncHJlc2hvdyBwcmVoaWRlIHBvc3RzaG93IHBvc3RoaWRlIGRlc3Ryb3knKTtcbiAgICAgICAgICAgICRvbnNlbi5hZGRNb2RpZmllck1ldGhvZHNGb3JDdXN0b21FbGVtZW50cyhhbGVydERpYWxvZywgZWxlbWVudCk7XG5cbiAgICAgICAgICAgIGVsZW1lbnQuZGF0YSgnb25zLWFsZXJ0LWRpYWxvZycsIGFsZXJ0RGlhbG9nKTtcbiAgICAgICAgICAgIGVsZW1lbnQuZGF0YSgnX3Njb3BlJywgc2NvcGUpO1xuXG4gICAgICAgICAgICBzY29wZS4kb24oJyRkZXN0cm95JywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgIGFsZXJ0RGlhbG9nLl9ldmVudHMgPSB1bmRlZmluZWQ7XG4gICAgICAgICAgICAgICRvbnNlbi5yZW1vdmVNb2RpZmllck1ldGhvZHMoYWxlcnREaWFsb2cpO1xuICAgICAgICAgICAgICBlbGVtZW50LmRhdGEoJ29ucy1hbGVydC1kaWFsb2cnLCB1bmRlZmluZWQpO1xuICAgICAgICAgICAgICBlbGVtZW50ID0gbnVsbDtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH0sXG4gICAgICAgICAgcG9zdDogZnVuY3Rpb24oc2NvcGUsIGVsZW1lbnQpIHtcbiAgICAgICAgICAgICRvbnNlbi5maXJlQ29tcG9uZW50RXZlbnQoZWxlbWVudFswXSwgJ2luaXQnKTtcbiAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgICB9XG4gICAgfTtcbiAgfSk7XG5cbn0pKCk7XG4iLCIoZnVuY3Rpb24oKXtcbiAgJ3VzZSBzdHJpY3QnO1xuICB2YXIgbW9kdWxlID0gYW5ndWxhci5tb2R1bGUoJ29uc2VuJyk7XG5cbiAgbW9kdWxlLmRpcmVjdGl2ZSgnb25zQmFja0J1dHRvbicsIGZ1bmN0aW9uKCRvbnNlbiwgJGNvbXBpbGUsIEdlbmVyaWNWaWV3LCBDb21wb25lbnRDbGVhbmVyKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHJlc3RyaWN0OiAnRScsXG4gICAgICByZXBsYWNlOiBmYWxzZSxcblxuICAgICAgY29tcGlsZTogZnVuY3Rpb24oZWxlbWVudCwgYXR0cnMpIHtcblxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgIHByZTogZnVuY3Rpb24oc2NvcGUsIGVsZW1lbnQsIGF0dHJzLCBjb250cm9sbGVyLCB0cmFuc2NsdWRlKSB7XG4gICAgICAgICAgICB2YXIgYmFja0J1dHRvbiA9IEdlbmVyaWNWaWV3LnJlZ2lzdGVyKHNjb3BlLCBlbGVtZW50LCBhdHRycywge1xuICAgICAgICAgICAgICB2aWV3S2V5OiAnb25zLWJhY2stYnV0dG9uJ1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIGlmIChhdHRycy5uZ0NsaWNrKSB7XG4gICAgICAgICAgICAgIGVsZW1lbnRbMF0ub25DbGljayA9IGFuZ3VsYXIubm9vcDtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgc2NvcGUuJG9uKCckZGVzdHJveScsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICBiYWNrQnV0dG9uLl9ldmVudHMgPSB1bmRlZmluZWQ7XG4gICAgICAgICAgICAgICRvbnNlbi5yZW1vdmVNb2RpZmllck1ldGhvZHMoYmFja0J1dHRvbik7XG4gICAgICAgICAgICAgIGVsZW1lbnQgPSBudWxsO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIENvbXBvbmVudENsZWFuZXIub25EZXN0cm95KHNjb3BlLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgQ29tcG9uZW50Q2xlYW5lci5kZXN0cm95U2NvcGUoc2NvcGUpO1xuICAgICAgICAgICAgICBDb21wb25lbnRDbGVhbmVyLmRlc3Ryb3lBdHRyaWJ1dGVzKGF0dHJzKTtcbiAgICAgICAgICAgICAgZWxlbWVudCA9IHNjb3BlID0gYXR0cnMgPSBudWxsO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfSxcbiAgICAgICAgICBwb3N0OiBmdW5jdGlvbihzY29wZSwgZWxlbWVudCkge1xuICAgICAgICAgICAgJG9uc2VuLmZpcmVDb21wb25lbnRFdmVudChlbGVtZW50WzBdLCAnaW5pdCcpO1xuICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICAgIH1cbiAgICB9O1xuICB9KTtcbn0pKCk7XG4iLCIoZnVuY3Rpb24oKXtcbiAgJ3VzZSBzdHJpY3QnO1xuXG4gIGFuZ3VsYXIubW9kdWxlKCdvbnNlbicpLmRpcmVjdGl2ZSgnb25zQm90dG9tVG9vbGJhcicsIGZ1bmN0aW9uKCRvbnNlbiwgR2VuZXJpY1ZpZXcpIHtcbiAgICByZXR1cm4ge1xuICAgICAgcmVzdHJpY3Q6ICdFJyxcbiAgICAgIGxpbms6IHtcbiAgICAgICAgcHJlOiBmdW5jdGlvbihzY29wZSwgZWxlbWVudCwgYXR0cnMpIHtcbiAgICAgICAgICBHZW5lcmljVmlldy5yZWdpc3RlcihzY29wZSwgZWxlbWVudCwgYXR0cnMsIHtcbiAgICAgICAgICAgIHZpZXdLZXk6ICdvbnMtYm90dG9tVG9vbGJhcidcbiAgICAgICAgICB9KTtcbiAgICAgICAgfSxcblxuICAgICAgICBwb3N0OiBmdW5jdGlvbihzY29wZSwgZWxlbWVudCwgYXR0cnMpIHtcbiAgICAgICAgICAkb25zZW4uZmlyZUNvbXBvbmVudEV2ZW50KGVsZW1lbnRbMF0sICdpbml0Jyk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9O1xuICB9KTtcblxufSkoKTtcblxuIiwiXG4vKipcbiAqIEBlbGVtZW50IG9ucy1idXR0b25cbiAqL1xuXG4oZnVuY3Rpb24oKXtcbiAgJ3VzZSBzdHJpY3QnO1xuXG4gIGFuZ3VsYXIubW9kdWxlKCdvbnNlbicpLmRpcmVjdGl2ZSgnb25zQnV0dG9uJywgZnVuY3Rpb24oJG9uc2VuLCBHZW5lcmljVmlldykge1xuICAgIHJldHVybiB7XG4gICAgICByZXN0cmljdDogJ0UnLFxuICAgICAgbGluazogZnVuY3Rpb24oc2NvcGUsIGVsZW1lbnQsIGF0dHJzKSB7XG4gICAgICAgIHZhciBidXR0b24gPSBHZW5lcmljVmlldy5yZWdpc3RlcihzY29wZSwgZWxlbWVudCwgYXR0cnMsIHtcbiAgICAgICAgICB2aWV3S2V5OiAnb25zLWJ1dHRvbidcbiAgICAgICAgfSk7XG5cbiAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KGJ1dHRvbiwgJ2Rpc2FibGVkJywge1xuICAgICAgICAgIGdldDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2VsZW1lbnRbMF0uZGlzYWJsZWQ7XG4gICAgICAgICAgfSxcbiAgICAgICAgICBzZXQ6IGZ1bmN0aW9uKHZhbHVlKSB7XG4gICAgICAgICAgICByZXR1cm4gKHRoaXMuX2VsZW1lbnRbMF0uZGlzYWJsZWQgPSB2YWx1ZSk7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgJG9uc2VuLmZpcmVDb21wb25lbnRFdmVudChlbGVtZW50WzBdLCAnaW5pdCcpO1xuICAgICAgfVxuICAgIH07XG4gIH0pO1xuXG5cblxufSkoKTtcbiIsIihmdW5jdGlvbigpIHtcbiAgJ3VzZSBzdHJpY3QnO1xuXG4gIGFuZ3VsYXIubW9kdWxlKCdvbnNlbicpLmRpcmVjdGl2ZSgnb25zQ2FyZCcsIGZ1bmN0aW9uKCRvbnNlbiwgR2VuZXJpY1ZpZXcpIHtcbiAgICByZXR1cm4ge1xuICAgICAgcmVzdHJpY3Q6ICdFJyxcbiAgICAgIGxpbms6IGZ1bmN0aW9uKHNjb3BlLCBlbGVtZW50LCBhdHRycykge1xuICAgICAgICBHZW5lcmljVmlldy5yZWdpc3RlcihzY29wZSwgZWxlbWVudCwgYXR0cnMsIHt2aWV3S2V5OiAnb25zLWNhcmQnfSk7XG4gICAgICAgICRvbnNlbi5maXJlQ29tcG9uZW50RXZlbnQoZWxlbWVudFswXSwgJ2luaXQnKTtcbiAgICAgIH1cbiAgICB9O1xuICB9KTtcblxufSkoKTtcbiIsIi8qKlxuICogQGVsZW1lbnQgb25zLWNhcm91c2VsXG4gKiBAZGVzY3JpcHRpb25cbiAqICAgW2VuXUNhcm91c2VsIGNvbXBvbmVudC5bL2VuXVxuICogICBbamFd44Kr44Or44O844K744Or44KS6KGo56S644Gn44GN44KL44Kz44Oz44Od44O844ON44Oz44OI44CCWy9qYV1cbiAqIEBjb2RlcGVuIHhiYnpPUVxuICogQGd1aWRlIFVzaW5nQ2Fyb3VzZWxcbiAqICAgW2VuXUxlYXJuIGhvdyB0byB1c2UgdGhlIGNhcm91c2VsIGNvbXBvbmVudC5bL2VuXVxuICogICBbamFdY2Fyb3VzZWzjgrPjg7Pjg53jg7zjg43jg7Pjg4jjga7kvb/jgYTmlrlbL2phXVxuICogQGV4YW1wbGVcbiAqIDxvbnMtY2Fyb3VzZWwgc3R5bGU9XCJ3aWR0aDogMTAwJTsgaGVpZ2h0OiAyMDBweFwiPlxuICogICA8b25zLWNhcm91c2VsLWl0ZW0+XG4gKiAgICAuLi5cbiAqICAgPC9vbnMtY2Fyb3VzZWwtaXRlbT5cbiAqICAgPG9ucy1jYXJvdXNlbC1pdGVtPlxuICogICAgLi4uXG4gKiAgIDwvb25zLWNhcm91c2VsLWl0ZW0+XG4gKiA8L29ucy1jYXJvdXNlbD5cbiAqL1xuXG4vKipcbiAqIEBhdHRyaWJ1dGUgdmFyXG4gKiBAaW5pdG9ubHlcbiAqIEB0eXBlIHtTdHJpbmd9XG4gKiBAZGVzY3JpcHRpb25cbiAqICAgW2VuXVZhcmlhYmxlIG5hbWUgdG8gcmVmZXIgdGhpcyBjYXJvdXNlbC5bL2VuXVxuICogICBbamFd44GT44Gu44Kr44Or44O844K744Or44KS5Y+C54Wn44GZ44KL44Gf44KB44Gu5aSJ5pWw5ZCN44KS5oyH5a6a44GX44G+44GZ44CCWy9qYV1cbiAqL1xuXG4vKipcbiAqIEBhdHRyaWJ1dGUgb25zLXBvc3RjaGFuZ2VcbiAqIEBpbml0b25seVxuICogQHR5cGUge0V4cHJlc3Npb259XG4gKiBAZGVzY3JpcHRpb25cbiAqICBbZW5dQWxsb3dzIHlvdSB0byBzcGVjaWZ5IGN1c3RvbSBiZWhhdmlvciB3aGVuIHRoZSBcInBvc3RjaGFuZ2VcIiBldmVudCBpcyBmaXJlZC5bL2VuXVxuICogIFtqYV1cInBvc3RjaGFuZ2VcIuOCpOODmeODs+ODiOOBjOeZuueBq+OBleOCjOOBn+aZguOBruaMmeWLleOCkueLrOiHquOBq+aMh+WumuOBp+OBjeOBvuOBmeOAglsvamFdXG4gKi9cblxuLyoqXG4gKiBAYXR0cmlidXRlIG9ucy1yZWZyZXNoXG4gKiBAaW5pdG9ubHlcbiAqIEB0eXBlIHtFeHByZXNzaW9ufVxuICogQGRlc2NyaXB0aW9uXG4gKiAgW2VuXUFsbG93cyB5b3UgdG8gc3BlY2lmeSBjdXN0b20gYmVoYXZpb3Igd2hlbiB0aGUgXCJyZWZyZXNoXCIgZXZlbnQgaXMgZmlyZWQuWy9lbl1cbiAqICBbamFdXCJyZWZyZXNoXCLjgqTjg5njg7Pjg4jjgYznmbrngavjgZXjgozjgZ/mmYLjga7mjJnli5XjgpLni6zoh6rjgavmjIflrprjgafjgY3jgb7jgZnjgIJbL2phXVxuICovXG5cbi8qKlxuICogQGF0dHJpYnV0ZSBvbnMtb3ZlcnNjcm9sbFxuICogQGluaXRvbmx5XG4gKiBAdHlwZSB7RXhwcmVzc2lvbn1cbiAqIEBkZXNjcmlwdGlvblxuICogIFtlbl1BbGxvd3MgeW91IHRvIHNwZWNpZnkgY3VzdG9tIGJlaGF2aW9yIHdoZW4gdGhlIFwib3ZlcnNjcm9sbFwiIGV2ZW50IGlzIGZpcmVkLlsvZW5dXG4gKiAgW2phXVwib3ZlcnNjcm9sbFwi44Kk44OZ44Oz44OI44GM55m654Gr44GV44KM44Gf5pmC44Gu5oyZ5YuV44KS54us6Ieq44Gr5oyH5a6a44Gn44GN44G+44GZ44CCWy9qYV1cbiAqL1xuXG4vKipcbiAqIEBhdHRyaWJ1dGUgb25zLWRlc3Ryb3lcbiAqIEBpbml0b25seVxuICogQHR5cGUge0V4cHJlc3Npb259XG4gKiBAZGVzY3JpcHRpb25cbiAqICBbZW5dQWxsb3dzIHlvdSB0byBzcGVjaWZ5IGN1c3RvbSBiZWhhdmlvciB3aGVuIHRoZSBcImRlc3Ryb3lcIiBldmVudCBpcyBmaXJlZC5bL2VuXVxuICogIFtqYV1cImRlc3Ryb3lcIuOCpOODmeODs+ODiOOBjOeZuueBq+OBleOCjOOBn+aZguOBruaMmeWLleOCkueLrOiHquOBq+aMh+WumuOBp+OBjeOBvuOBmeOAglsvamFdXG4gKi9cblxuLyoqXG4gKiBAbWV0aG9kIG9uY2VcbiAqIEBzaWduYXR1cmUgb25jZShldmVudE5hbWUsIGxpc3RlbmVyKVxuICogQGRlc2NyaXB0aW9uXG4gKiAgW2VuXUFkZCBhbiBldmVudCBsaXN0ZW5lciB0aGF0J3Mgb25seSB0cmlnZ2VyZWQgb25jZS5bL2VuXVxuICogIFtqYV3kuIDluqbjgaDjgZHlkbzjgbPlh7rjgZXjgozjgovjgqTjg5njg7Pjg4jjg6rjgrnjg4rjgpLov73liqDjgZfjgb7jgZnjgIJbL2phXVxuICogQHBhcmFtIHtTdHJpbmd9IGV2ZW50TmFtZVxuICogICBbZW5dTmFtZSBvZiB0aGUgZXZlbnQuWy9lbl1cbiAqICAgW2phXeOCpOODmeODs+ODiOWQjeOCkuaMh+WumuOBl+OBvuOBmeOAglsvamFdXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBsaXN0ZW5lclxuICogICBbZW5dRnVuY3Rpb24gdG8gZXhlY3V0ZSB3aGVuIHRoZSBldmVudCBpcyB0cmlnZ2VyZWQuWy9lbl1cbiAqICAgW2phXeOCpOODmeODs+ODiOOBjOeZuueBq+OBl+OBn+mam+OBq+WRvOOBs+WHuuOBleOCjOOCi+mWouaVsOOCquODluOCuOOCp+OCr+ODiOOCkuaMh+WumuOBl+OBvuOBmeOAglsvamFdXG4gKi9cblxuLyoqXG4gKiBAbWV0aG9kIG9mZlxuICogQHNpZ25hdHVyZSBvZmYoZXZlbnROYW1lLCBbbGlzdGVuZXJdKVxuICogQGRlc2NyaXB0aW9uXG4gKiAgW2VuXVJlbW92ZSBhbiBldmVudCBsaXN0ZW5lci4gSWYgdGhlIGxpc3RlbmVyIGlzIG5vdCBzcGVjaWZpZWQgYWxsIGxpc3RlbmVycyBmb3IgdGhlIGV2ZW50IHR5cGUgd2lsbCBiZSByZW1vdmVkLlsvZW5dXG4gKiAgW2phXeOCpOODmeODs+ODiOODquOCueODiuODvOOCkuWJiumZpOOBl+OBvuOBmeOAguOCguOBl+OCpOODmeODs+ODiOODquOCueODiuODvOOBjOaMh+WumuOBleOCjOOBquOBi+OBo+OBn+WgtOWQiOOBq+OBr+OAgeOBneOBruOCpOODmeODs+ODiOOBq+e0kOS7mOOBhOOBpuOBhOOCi+OCpOODmeODs+ODiOODquOCueODiuODvOOBjOWFqOOBpuWJiumZpOOBleOCjOOBvuOBmeOAglsvamFdXG4gKiBAcGFyYW0ge1N0cmluZ30gZXZlbnROYW1lXG4gKiAgIFtlbl1OYW1lIG9mIHRoZSBldmVudC5bL2VuXVxuICogICBbamFd44Kk44OZ44Oz44OI5ZCN44KS5oyH5a6a44GX44G+44GZ44CCWy9qYV1cbiAqIEBwYXJhbSB7RnVuY3Rpb259IGxpc3RlbmVyXG4gKiAgIFtlbl1GdW5jdGlvbiB0byBleGVjdXRlIHdoZW4gdGhlIGV2ZW50IGlzIHRyaWdnZXJlZC5bL2VuXVxuICogICBbamFd44Kk44OZ44Oz44OI44GM55m654Gr44GX44Gf6Zqb44Gr5ZG844Gz5Ye644GV44KM44KL6Zai5pWw44Kq44OW44K444Kn44Kv44OI44KS5oyH5a6a44GX44G+44GZ44CCWy9qYV1cbiAqL1xuXG4vKipcbiAqIEBtZXRob2Qgb25cbiAqIEBzaWduYXR1cmUgb24oZXZlbnROYW1lLCBsaXN0ZW5lcilcbiAqIEBkZXNjcmlwdGlvblxuICogICBbZW5dQWRkIGFuIGV2ZW50IGxpc3RlbmVyLlsvZW5dXG4gKiAgIFtqYV3jgqTjg5njg7Pjg4jjg6rjgrnjg4rjg7zjgpLov73liqDjgZfjgb7jgZnjgIJbL2phXVxuICogQHBhcmFtIHtTdHJpbmd9IGV2ZW50TmFtZVxuICogICBbZW5dTmFtZSBvZiB0aGUgZXZlbnQuWy9lbl1cbiAqICAgW2phXeOCpOODmeODs+ODiOWQjeOCkuaMh+WumuOBl+OBvuOBmeOAglsvamFdXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBsaXN0ZW5lclxuICogICBbZW5dRnVuY3Rpb24gdG8gZXhlY3V0ZSB3aGVuIHRoZSBldmVudCBpcyB0cmlnZ2VyZWQuWy9lbl1cbiAqICAgW2phXeOCpOODmeODs+ODiOOBjOeZuueBq+OBl+OBn+mam+OBq+WRvOOBs+WHuuOBleOCjOOCi+mWouaVsOOCquODluOCuOOCp+OCr+ODiOOCkuaMh+WumuOBl+OBvuOBmeOAglsvamFdXG4gKi9cblxuKGZ1bmN0aW9uKCkge1xuICAndXNlIHN0cmljdCc7XG5cbiAgdmFyIG1vZHVsZSA9IGFuZ3VsYXIubW9kdWxlKCdvbnNlbicpO1xuXG4gIG1vZHVsZS5kaXJlY3RpdmUoJ29uc0Nhcm91c2VsJywgZnVuY3Rpb24oJG9uc2VuLCBDYXJvdXNlbFZpZXcpIHtcbiAgICByZXR1cm4ge1xuICAgICAgcmVzdHJpY3Q6ICdFJyxcbiAgICAgIHJlcGxhY2U6IGZhbHNlLFxuXG4gICAgICAvLyBOT1RFOiBUaGlzIGVsZW1lbnQgbXVzdCBjb2V4aXN0cyB3aXRoIG5nLWNvbnRyb2xsZXIuXG4gICAgICAvLyBEbyBub3QgdXNlIGlzb2xhdGVkIHNjb3BlIGFuZCB0ZW1wbGF0ZSdzIG5nLXRyYW5zY2x1ZGUuXG4gICAgICBzY29wZTogZmFsc2UsXG4gICAgICB0cmFuc2NsdWRlOiBmYWxzZSxcblxuICAgICAgY29tcGlsZTogZnVuY3Rpb24oZWxlbWVudCwgYXR0cnMpIHtcblxuICAgICAgICByZXR1cm4gZnVuY3Rpb24oc2NvcGUsIGVsZW1lbnQsIGF0dHJzKSB7XG4gICAgICAgICAgdmFyIGNhcm91c2VsID0gbmV3IENhcm91c2VsVmlldyhzY29wZSwgZWxlbWVudCwgYXR0cnMpO1xuXG4gICAgICAgICAgZWxlbWVudC5kYXRhKCdvbnMtY2Fyb3VzZWwnLCBjYXJvdXNlbCk7XG5cbiAgICAgICAgICAkb25zZW4ucmVnaXN0ZXJFdmVudEhhbmRsZXJzKGNhcm91c2VsLCAncG9zdGNoYW5nZSByZWZyZXNoIG92ZXJzY3JvbGwgZGVzdHJveScpO1xuICAgICAgICAgICRvbnNlbi5kZWNsYXJlVmFyQXR0cmlidXRlKGF0dHJzLCBjYXJvdXNlbCk7XG5cbiAgICAgICAgICBzY29wZS4kb24oJyRkZXN0cm95JywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBjYXJvdXNlbC5fZXZlbnRzID0gdW5kZWZpbmVkO1xuICAgICAgICAgICAgZWxlbWVudC5kYXRhKCdvbnMtY2Fyb3VzZWwnLCB1bmRlZmluZWQpO1xuICAgICAgICAgICAgZWxlbWVudCA9IG51bGw7XG4gICAgICAgICAgfSk7XG5cbiAgICAgICAgICAkb25zZW4uZmlyZUNvbXBvbmVudEV2ZW50KGVsZW1lbnRbMF0sICdpbml0Jyk7XG4gICAgICAgIH07XG4gICAgICB9LFxuXG4gICAgfTtcbiAgfSk7XG5cbiAgbW9kdWxlLmRpcmVjdGl2ZSgnb25zQ2Fyb3VzZWxJdGVtJywgZnVuY3Rpb24oJG9uc2VuKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHJlc3RyaWN0OiAnRScsXG4gICAgICBjb21waWxlOiBmdW5jdGlvbihlbGVtZW50LCBhdHRycykge1xuICAgICAgICByZXR1cm4gZnVuY3Rpb24oc2NvcGUsIGVsZW1lbnQsIGF0dHJzKSB7XG4gICAgICAgICAgaWYgKHNjb3BlLiRsYXN0KSB7XG4gICAgICAgICAgICBjb25zdCBjYXJvdXNlbCA9ICRvbnNlbi51dGlsLmZpbmRQYXJlbnQoZWxlbWVudFswXSwgJ29ucy1jYXJvdXNlbCcpO1xuICAgICAgICAgICAgY2Fyb3VzZWwuX3N3aXBlci5pbml0KHtcbiAgICAgICAgICAgICAgc3dpcGVhYmxlOiBjYXJvdXNlbC5oYXNBdHRyaWJ1dGUoJ3N3aXBlYWJsZScpLFxuICAgICAgICAgICAgICBhdXRvUmVmcmVzaDogY2Fyb3VzZWwuaGFzQXR0cmlidXRlKCdhdXRvLXJlZnJlc2gnKVxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfVxuICAgICAgICB9O1xuICAgICAgfVxuICAgIH07XG4gIH0pO1xuXG59KSgpO1xuXG4iLCIvKipcbiAqIEBlbGVtZW50IG9ucy1jaGVja2JveFxuICovXG5cbihmdW5jdGlvbigpe1xuICAndXNlIHN0cmljdCc7XG5cbiAgYW5ndWxhci5tb2R1bGUoJ29uc2VuJykuZGlyZWN0aXZlKCdvbnNDaGVja2JveCcsIGZ1bmN0aW9uKCRwYXJzZSkge1xuICAgIHJldHVybiB7XG4gICAgICByZXN0cmljdDogJ0UnLFxuICAgICAgcmVwbGFjZTogZmFsc2UsXG4gICAgICBzY29wZTogZmFsc2UsXG5cbiAgICAgIGxpbms6IGZ1bmN0aW9uKHNjb3BlLCBlbGVtZW50LCBhdHRycykge1xuICAgICAgICBsZXQgZWwgPSBlbGVtZW50WzBdO1xuXG4gICAgICAgIGNvbnN0IG9uQ2hhbmdlID0gKCkgPT4ge1xuICAgICAgICAgICRwYXJzZShhdHRycy5uZ01vZGVsKS5hc3NpZ24oc2NvcGUsIGVsLmNoZWNrZWQpO1xuICAgICAgICAgIGF0dHJzLm5nQ2hhbmdlICYmIHNjb3BlLiRldmFsKGF0dHJzLm5nQ2hhbmdlKTtcbiAgICAgICAgICBzY29wZS4kcGFyZW50LiRldmFsQXN5bmMoKTtcbiAgICAgICAgfTtcblxuICAgICAgICBpZiAoYXR0cnMubmdNb2RlbCkge1xuICAgICAgICAgIHNjb3BlLiR3YXRjaChhdHRycy5uZ01vZGVsLCB2YWx1ZSA9PiBlbC5jaGVja2VkID0gdmFsdWUpO1xuICAgICAgICAgIGVsZW1lbnQub24oJ2NoYW5nZScsIG9uQ2hhbmdlKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHNjb3BlLiRvbignJGRlc3Ryb3knLCAoKSA9PiB7XG4gICAgICAgICAgZWxlbWVudC5vZmYoJ2NoYW5nZScsIG9uQ2hhbmdlKTtcbiAgICAgICAgICBzY29wZSA9IGVsZW1lbnQgPSBhdHRycyA9IGVsID0gbnVsbDtcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfTtcbiAgfSk7XG59KSgpO1xuIiwiLyoqXG4gKiBAZWxlbWVudCBvbnMtZGlhbG9nXG4gKi9cblxuLyoqXG4gKiBAYXR0cmlidXRlIHZhclxuICogQGluaXRvbmx5XG4gKiBAdHlwZSB7U3RyaW5nfVxuICogQGRlc2NyaXB0aW9uXG4gKiAgW2VuXVZhcmlhYmxlIG5hbWUgdG8gcmVmZXIgdGhpcyBkaWFsb2cuWy9lbl1cbiAqICBbamFd44GT44Gu44OA44Kk44Ki44Ot44Kw44KS5Y+C54Wn44GZ44KL44Gf44KB44Gu5ZCN5YmN44KS5oyH5a6a44GX44G+44GZ44CCWy9qYV1cbiAqL1xuXG4vKipcbiAqIEBhdHRyaWJ1dGUgb25zLXByZXNob3dcbiAqIEBpbml0b25seVxuICogQHR5cGUge0V4cHJlc3Npb259XG4gKiBAZGVzY3JpcHRpb25cbiAqICBbZW5dQWxsb3dzIHlvdSB0byBzcGVjaWZ5IGN1c3RvbSBiZWhhdmlvciB3aGVuIHRoZSBcInByZXNob3dcIiBldmVudCBpcyBmaXJlZC5bL2VuXVxuICogIFtqYV1cInByZXNob3dcIuOCpOODmeODs+ODiOOBjOeZuueBq+OBleOCjOOBn+aZguOBruaMmeWLleOCkueLrOiHquOBq+aMh+WumuOBp+OBjeOBvuOBmeOAglsvamFdXG4gKi9cblxuLyoqXG4gKiBAYXR0cmlidXRlIG9ucy1wcmVoaWRlXG4gKiBAaW5pdG9ubHlcbiAqIEB0eXBlIHtFeHByZXNzaW9ufVxuICogQGRlc2NyaXB0aW9uXG4gKiAgW2VuXUFsbG93cyB5b3UgdG8gc3BlY2lmeSBjdXN0b20gYmVoYXZpb3Igd2hlbiB0aGUgXCJwcmVoaWRlXCIgZXZlbnQgaXMgZmlyZWQuWy9lbl1cbiAqICBbamFdXCJwcmVoaWRlXCLjgqTjg5njg7Pjg4jjgYznmbrngavjgZXjgozjgZ/mmYLjga7mjJnli5XjgpLni6zoh6rjgavmjIflrprjgafjgY3jgb7jgZnjgIJbL2phXVxuICovXG5cbi8qKlxuICogQGF0dHJpYnV0ZSBvbnMtcG9zdHNob3dcbiAqIEBpbml0b25seVxuICogQHR5cGUge0V4cHJlc3Npb259XG4gKiBAZGVzY3JpcHRpb25cbiAqICBbZW5dQWxsb3dzIHlvdSB0byBzcGVjaWZ5IGN1c3RvbSBiZWhhdmlvciB3aGVuIHRoZSBcInBvc3RzaG93XCIgZXZlbnQgaXMgZmlyZWQuWy9lbl1cbiAqICBbamFdXCJwb3N0c2hvd1wi44Kk44OZ44Oz44OI44GM55m654Gr44GV44KM44Gf5pmC44Gu5oyZ5YuV44KS54us6Ieq44Gr5oyH5a6a44Gn44GN44G+44GZ44CCWy9qYV1cbiAqL1xuXG4vKipcbiAqIEBhdHRyaWJ1dGUgb25zLXBvc3RoaWRlXG4gKiBAaW5pdG9ubHlcbiAqIEB0eXBlIHtFeHByZXNzaW9ufVxuICogQGRlc2NyaXB0aW9uXG4gKiAgW2VuXUFsbG93cyB5b3UgdG8gc3BlY2lmeSBjdXN0b20gYmVoYXZpb3Igd2hlbiB0aGUgXCJwb3N0aGlkZVwiIGV2ZW50IGlzIGZpcmVkLlsvZW5dXG4gKiAgW2phXVwicG9zdGhpZGVcIuOCpOODmeODs+ODiOOBjOeZuueBq+OBleOCjOOBn+aZguOBruaMmeWLleOCkueLrOiHquOBq+aMh+WumuOBp+OBjeOBvuOBmeOAglsvamFdXG4gKi9cblxuLyoqXG4gKiBAYXR0cmlidXRlIG9ucy1kZXN0cm95XG4gKiBAaW5pdG9ubHlcbiAqIEB0eXBlIHtFeHByZXNzaW9ufVxuICogQGRlc2NyaXB0aW9uXG4gKiAgW2VuXUFsbG93cyB5b3UgdG8gc3BlY2lmeSBjdXN0b20gYmVoYXZpb3Igd2hlbiB0aGUgXCJkZXN0cm95XCIgZXZlbnQgaXMgZmlyZWQuWy9lbl1cbiAqICBbamFdXCJkZXN0cm95XCLjgqTjg5njg7Pjg4jjgYznmbrngavjgZXjgozjgZ/mmYLjga7mjJnli5XjgpLni6zoh6rjgavmjIflrprjgafjgY3jgb7jgZnjgIJbL2phXVxuICovXG5cbi8qKlxuICogQG1ldGhvZCBvblxuICogQHNpZ25hdHVyZSBvbihldmVudE5hbWUsIGxpc3RlbmVyKVxuICogQGRlc2NyaXB0aW9uXG4gKiAgIFtlbl1BZGQgYW4gZXZlbnQgbGlzdGVuZXIuWy9lbl1cbiAqICAgW2phXeOCpOODmeODs+ODiOODquOCueODiuODvOOCkui/veWKoOOBl+OBvuOBmeOAglsvamFdXG4gKiBAcGFyYW0ge1N0cmluZ30gZXZlbnROYW1lXG4gKiAgIFtlbl1OYW1lIG9mIHRoZSBldmVudC5bL2VuXVxuICogICBbamFd44Kk44OZ44Oz44OI5ZCN44KS5oyH5a6a44GX44G+44GZ44CCWy9qYV1cbiAqIEBwYXJhbSB7RnVuY3Rpb259IGxpc3RlbmVyXG4gKiAgIFtlbl1GdW5jdGlvbiB0byBleGVjdXRlIHdoZW4gdGhlIGV2ZW50IGlzIHRyaWdnZXJlZC5bL2VuXVxuICogICBbamFd44Kk44OZ44Oz44OI44GM55m654Gr44GX44Gf6Zqb44Gr5ZG844Gz5Ye644GV44KM44KL6Zai5pWw44Kq44OW44K444Kn44Kv44OI44KS5oyH5a6a44GX44G+44GZ44CCWy9qYV1cbiAqL1xuXG4vKipcbiAqIEBtZXRob2Qgb25jZVxuICogQHNpZ25hdHVyZSBvbmNlKGV2ZW50TmFtZSwgbGlzdGVuZXIpXG4gKiBAZGVzY3JpcHRpb25cbiAqICBbZW5dQWRkIGFuIGV2ZW50IGxpc3RlbmVyIHRoYXQncyBvbmx5IHRyaWdnZXJlZCBvbmNlLlsvZW5dXG4gKiAgW2phXeS4gOW6puOBoOOBkeWRvOOBs+WHuuOBleOCjOOCi+OCpOODmeODs+ODiOODquOCueODiuOCkui/veWKoOOBl+OBvuOBmeOAglsvamFdXG4gKiBAcGFyYW0ge1N0cmluZ30gZXZlbnROYW1lXG4gKiAgIFtlbl1OYW1lIG9mIHRoZSBldmVudC5bL2VuXVxuICogICBbamFd44Kk44OZ44Oz44OI5ZCN44KS5oyH5a6a44GX44G+44GZ44CCWy9qYV1cbiAqIEBwYXJhbSB7RnVuY3Rpb259IGxpc3RlbmVyXG4gKiAgIFtlbl1GdW5jdGlvbiB0byBleGVjdXRlIHdoZW4gdGhlIGV2ZW50IGlzIHRyaWdnZXJlZC5bL2VuXVxuICogICBbamFd44Kk44OZ44Oz44OI44GM55m654Gr44GX44Gf6Zqb44Gr5ZG844Gz5Ye644GV44KM44KL6Zai5pWw44Kq44OW44K444Kn44Kv44OI44KS5oyH5a6a44GX44G+44GZ44CCWy9qYV1cbiAqL1xuXG4vKipcbiAqIEBtZXRob2Qgb2ZmXG4gKiBAc2lnbmF0dXJlIG9mZihldmVudE5hbWUsIFtsaXN0ZW5lcl0pXG4gKiBAZGVzY3JpcHRpb25cbiAqICBbZW5dUmVtb3ZlIGFuIGV2ZW50IGxpc3RlbmVyLiBJZiB0aGUgbGlzdGVuZXIgaXMgbm90IHNwZWNpZmllZCBhbGwgbGlzdGVuZXJzIGZvciB0aGUgZXZlbnQgdHlwZSB3aWxsIGJlIHJlbW92ZWQuWy9lbl1cbiAqICBbamFd44Kk44OZ44Oz44OI44Oq44K544OK44O844KS5YmK6Zmk44GX44G+44GZ44CC44KC44GX44Kk44OZ44Oz44OI44Oq44K544OK44O844GM5oyH5a6a44GV44KM44Gq44GL44Gj44Gf5aC05ZCI44Gr44Gv44CB44Gd44Gu44Kk44OZ44Oz44OI44Gr57SQ5LuY44GE44Gm44GE44KL44Kk44OZ44Oz44OI44Oq44K544OK44O844GM5YWo44Gm5YmK6Zmk44GV44KM44G+44GZ44CCWy9qYV1cbiAqIEBwYXJhbSB7U3RyaW5nfSBldmVudE5hbWVcbiAqICAgW2VuXU5hbWUgb2YgdGhlIGV2ZW50LlsvZW5dXG4gKiAgIFtqYV3jgqTjg5njg7Pjg4jlkI3jgpLmjIflrprjgZfjgb7jgZnjgIJbL2phXVxuICogQHBhcmFtIHtGdW5jdGlvbn0gbGlzdGVuZXJcbiAqICAgW2VuXUZ1bmN0aW9uIHRvIGV4ZWN1dGUgd2hlbiB0aGUgZXZlbnQgaXMgdHJpZ2dlcmVkLlsvZW5dXG4gKiAgIFtqYV3jgqTjg5njg7Pjg4jjgYznmbrngavjgZfjgZ/pmpvjgavlkbzjgbPlh7rjgZXjgozjgovplqLmlbDjgqrjg5bjgrjjgqfjgq/jg4jjgpLmjIflrprjgZfjgb7jgZnjgIJbL2phXVxuICovXG4oZnVuY3Rpb24oKSB7XG4gICd1c2Ugc3RyaWN0JztcblxuICBhbmd1bGFyLm1vZHVsZSgnb25zZW4nKS5kaXJlY3RpdmUoJ29uc0RpYWxvZycsIGZ1bmN0aW9uKCRvbnNlbiwgRGlhbG9nVmlldykge1xuICAgIHJldHVybiB7XG4gICAgICByZXN0cmljdDogJ0UnLFxuICAgICAgc2NvcGU6IHRydWUsXG4gICAgICBjb21waWxlOiBmdW5jdGlvbihlbGVtZW50LCBhdHRycykge1xuXG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgcHJlOiBmdW5jdGlvbihzY29wZSwgZWxlbWVudCwgYXR0cnMpIHtcblxuICAgICAgICAgICAgdmFyIGRpYWxvZyA9IG5ldyBEaWFsb2dWaWV3KHNjb3BlLCBlbGVtZW50LCBhdHRycyk7XG4gICAgICAgICAgICAkb25zZW4uZGVjbGFyZVZhckF0dHJpYnV0ZShhdHRycywgZGlhbG9nKTtcbiAgICAgICAgICAgICRvbnNlbi5yZWdpc3RlckV2ZW50SGFuZGxlcnMoZGlhbG9nLCAncHJlc2hvdyBwcmVoaWRlIHBvc3RzaG93IHBvc3RoaWRlIGRlc3Ryb3knKTtcbiAgICAgICAgICAgICRvbnNlbi5hZGRNb2RpZmllck1ldGhvZHNGb3JDdXN0b21FbGVtZW50cyhkaWFsb2csIGVsZW1lbnQpO1xuXG4gICAgICAgICAgICBlbGVtZW50LmRhdGEoJ29ucy1kaWFsb2cnLCBkaWFsb2cpO1xuICAgICAgICAgICAgc2NvcGUuJG9uKCckZGVzdHJveScsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICBkaWFsb2cuX2V2ZW50cyA9IHVuZGVmaW5lZDtcbiAgICAgICAgICAgICAgJG9uc2VuLnJlbW92ZU1vZGlmaWVyTWV0aG9kcyhkaWFsb2cpO1xuICAgICAgICAgICAgICBlbGVtZW50LmRhdGEoJ29ucy1kaWFsb2cnLCB1bmRlZmluZWQpO1xuICAgICAgICAgICAgICBlbGVtZW50ID0gbnVsbDtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH0sXG5cbiAgICAgICAgICBwb3N0OiBmdW5jdGlvbihzY29wZSwgZWxlbWVudCkge1xuICAgICAgICAgICAgJG9uc2VuLmZpcmVDb21wb25lbnRFdmVudChlbGVtZW50WzBdLCAnaW5pdCcpO1xuICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICAgIH1cbiAgICB9O1xuICB9KTtcblxufSkoKTtcbiIsIihmdW5jdGlvbigpIHtcbiAgJ3VzZSBzdHJpY3QnO1xuXG4gIHZhciBtb2R1bGUgPSBhbmd1bGFyLm1vZHVsZSgnb25zZW4nKTtcblxuICBtb2R1bGUuZGlyZWN0aXZlKCdvbnNEdW1teUZvckluaXQnLCBmdW5jdGlvbigkcm9vdFNjb3BlKSB7XG4gICAgdmFyIGlzUmVhZHkgPSBmYWxzZTtcblxuICAgIHJldHVybiB7XG4gICAgICByZXN0cmljdDogJ0UnLFxuICAgICAgcmVwbGFjZTogZmFsc2UsXG5cbiAgICAgIGxpbms6IHtcbiAgICAgICAgcG9zdDogZnVuY3Rpb24oc2NvcGUsIGVsZW1lbnQpIHtcbiAgICAgICAgICBpZiAoIWlzUmVhZHkpIHtcbiAgICAgICAgICAgIGlzUmVhZHkgPSB0cnVlO1xuICAgICAgICAgICAgJHJvb3RTY29wZS4kYnJvYWRjYXN0KCckb25zLXJlYWR5Jyk7XG4gICAgICAgICAgfVxuICAgICAgICAgIGVsZW1lbnQucmVtb3ZlKCk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9O1xuICB9KTtcblxufSkoKTtcbiIsIi8qKlxuICogQGVsZW1lbnQgb25zLWZhYlxuICovXG5cbi8qKlxuICogQGF0dHJpYnV0ZSB2YXJcbiAqIEBpbml0b25seVxuICogQHR5cGUge1N0cmluZ31cbiAqIEBkZXNjcmlwdGlvblxuICogICBbZW5dVmFyaWFibGUgbmFtZSB0byByZWZlciB0aGUgZmxvYXRpbmcgYWN0aW9uIGJ1dHRvbi5bL2VuXVxuICogICBbamFd44GT44Gu44OV44Ot44O844OG44Kj44Oz44Kw44Ki44Kv44K344On44Oz44Oc44K/44Oz44KS5Y+C54Wn44GZ44KL44Gf44KB44Gu5aSJ5pWw5ZCN44KS44GX44Gm44GX44G+44GZ44CCWy9qYV1cbiAqL1xuXG4oZnVuY3Rpb24oKSB7XG4gICd1c2Ugc3RyaWN0JztcblxuICB2YXIgbW9kdWxlID0gYW5ndWxhci5tb2R1bGUoJ29uc2VuJyk7XG5cbiAgbW9kdWxlLmRpcmVjdGl2ZSgnb25zRmFiJywgZnVuY3Rpb24oJG9uc2VuLCBGYWJWaWV3KSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHJlc3RyaWN0OiAnRScsXG4gICAgICByZXBsYWNlOiBmYWxzZSxcbiAgICAgIHNjb3BlOiBmYWxzZSxcbiAgICAgIHRyYW5zY2x1ZGU6IGZhbHNlLFxuXG4gICAgICBjb21waWxlOiBmdW5jdGlvbihlbGVtZW50LCBhdHRycykge1xuXG4gICAgICAgIHJldHVybiBmdW5jdGlvbihzY29wZSwgZWxlbWVudCwgYXR0cnMpIHtcbiAgICAgICAgICB2YXIgZmFiID0gbmV3IEZhYlZpZXcoc2NvcGUsIGVsZW1lbnQsIGF0dHJzKTtcblxuICAgICAgICAgIGVsZW1lbnQuZGF0YSgnb25zLWZhYicsIGZhYik7XG5cbiAgICAgICAgICAkb25zZW4uZGVjbGFyZVZhckF0dHJpYnV0ZShhdHRycywgZmFiKTtcblxuICAgICAgICAgIHNjb3BlLiRvbignJGRlc3Ryb3knLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIGVsZW1lbnQuZGF0YSgnb25zLWZhYicsIHVuZGVmaW5lZCk7XG4gICAgICAgICAgICBlbGVtZW50ID0gbnVsbDtcbiAgICAgICAgICB9KTtcblxuICAgICAgICAgICRvbnNlbi5maXJlQ29tcG9uZW50RXZlbnQoZWxlbWVudFswXSwgJ2luaXQnKTtcbiAgICAgICAgfTtcbiAgICAgIH0sXG5cbiAgICB9O1xuICB9KTtcblxufSkoKTtcblxuIiwiKGZ1bmN0aW9uKCkge1xuICAndXNlIHN0cmljdCc7XG5cbiAgdmFyIEVWRU5UUyA9XG4gICAgKCdkcmFnIGRyYWdsZWZ0IGRyYWdyaWdodCBkcmFndXAgZHJhZ2Rvd24gaG9sZCByZWxlYXNlIHN3aXBlIHN3aXBlbGVmdCBzd2lwZXJpZ2h0ICcgK1xuICAgICAgJ3N3aXBldXAgc3dpcGVkb3duIHRhcCBkb3VibGV0YXAgdG91Y2ggdHJhbnNmb3JtIHBpbmNoIHBpbmNoaW4gcGluY2hvdXQgcm90YXRlJykuc3BsaXQoLyArLyk7XG5cbiAgYW5ndWxhci5tb2R1bGUoJ29uc2VuJykuZGlyZWN0aXZlKCdvbnNHZXN0dXJlRGV0ZWN0b3InLCBmdW5jdGlvbigkb25zZW4pIHtcblxuICAgIHZhciBzY29wZURlZiA9IEVWRU5UUy5yZWR1Y2UoZnVuY3Rpb24oZGljdCwgbmFtZSkge1xuICAgICAgZGljdFsnbmcnICsgdGl0bGl6ZShuYW1lKV0gPSAnJic7XG4gICAgICByZXR1cm4gZGljdDtcbiAgICB9LCB7fSk7XG5cbiAgICBmdW5jdGlvbiB0aXRsaXplKHN0cikge1xuICAgICAgcmV0dXJuIHN0ci5jaGFyQXQoMCkudG9VcHBlckNhc2UoKSArIHN0ci5zbGljZSgxKTtcbiAgICB9XG5cbiAgICByZXR1cm4ge1xuICAgICAgcmVzdHJpY3Q6ICdFJyxcbiAgICAgIHNjb3BlOiBzY29wZURlZixcblxuICAgICAgLy8gTk9URTogVGhpcyBlbGVtZW50IG11c3QgY29leGlzdHMgd2l0aCBuZy1jb250cm9sbGVyLlxuICAgICAgLy8gRG8gbm90IHVzZSBpc29sYXRlZCBzY29wZSBhbmQgdGVtcGxhdGUncyBuZy10cmFuc2NsdWRlLlxuICAgICAgcmVwbGFjZTogZmFsc2UsXG4gICAgICB0cmFuc2NsdWRlOiB0cnVlLFxuXG4gICAgICBjb21waWxlOiBmdW5jdGlvbihlbGVtZW50LCBhdHRycykge1xuICAgICAgICByZXR1cm4gZnVuY3Rpb24gbGluayhzY29wZSwgZWxlbWVudCwgYXR0cnMsIF8sIHRyYW5zY2x1ZGUpIHtcblxuICAgICAgICAgIHRyYW5zY2x1ZGUoc2NvcGUuJHBhcmVudCwgZnVuY3Rpb24oY2xvbmVkKSB7XG4gICAgICAgICAgICBlbGVtZW50LmFwcGVuZChjbG9uZWQpO1xuICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgdmFyIGhhbmRsZXIgPSBmdW5jdGlvbihldmVudCkge1xuICAgICAgICAgICAgdmFyIGF0dHIgPSAnbmcnICsgdGl0bGl6ZShldmVudC50eXBlKTtcblxuICAgICAgICAgICAgaWYgKGF0dHIgaW4gc2NvcGVEZWYpIHtcbiAgICAgICAgICAgICAgc2NvcGVbYXR0cl0oeyRldmVudDogZXZlbnR9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9O1xuXG4gICAgICAgICAgdmFyIGdlc3R1cmVEZXRlY3RvcjtcblxuICAgICAgICAgIHNldEltbWVkaWF0ZShmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIGdlc3R1cmVEZXRlY3RvciA9IGVsZW1lbnRbMF0uX2dlc3R1cmVEZXRlY3RvcjtcbiAgICAgICAgICAgIGdlc3R1cmVEZXRlY3Rvci5vbihFVkVOVFMuam9pbignICcpLCBoYW5kbGVyKTtcbiAgICAgICAgICB9KTtcblxuICAgICAgICAgICRvbnNlbi5jbGVhbmVyLm9uRGVzdHJveShzY29wZSwgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBnZXN0dXJlRGV0ZWN0b3Iub2ZmKEVWRU5UUy5qb2luKCcgJyksIGhhbmRsZXIpO1xuICAgICAgICAgICAgJG9uc2VuLmNsZWFyQ29tcG9uZW50KHtcbiAgICAgICAgICAgICAgc2NvcGU6IHNjb3BlLFxuICAgICAgICAgICAgICBlbGVtZW50OiBlbGVtZW50LFxuICAgICAgICAgICAgICBhdHRyczogYXR0cnNcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgZ2VzdHVyZURldGVjdG9yLmVsZW1lbnQgPSBzY29wZSA9IGVsZW1lbnQgPSBhdHRycyA9IG51bGw7XG4gICAgICAgICAgfSk7XG5cbiAgICAgICAgICAkb25zZW4uZmlyZUNvbXBvbmVudEV2ZW50KGVsZW1lbnRbMF0sICdpbml0Jyk7XG4gICAgICAgIH07XG4gICAgICB9XG4gICAgfTtcbiAgfSk7XG59KSgpO1xuXG4iLCJcbi8qKlxuICogQGVsZW1lbnQgb25zLWljb25cbiAqL1xuXG5cbihmdW5jdGlvbigpIHtcbiAgJ3VzZSBzdHJpY3QnO1xuXG4gIGFuZ3VsYXIubW9kdWxlKCdvbnNlbicpLmRpcmVjdGl2ZSgnb25zSWNvbicsIGZ1bmN0aW9uKCRvbnNlbiwgR2VuZXJpY1ZpZXcpIHtcbiAgICByZXR1cm4ge1xuICAgICAgcmVzdHJpY3Q6ICdFJyxcblxuICAgICAgY29tcGlsZTogZnVuY3Rpb24oZWxlbWVudCwgYXR0cnMpIHtcblxuICAgICAgICBpZiAoYXR0cnMuaWNvbi5pbmRleE9mKCd7eycpICE9PSAtMSkge1xuICAgICAgICAgIGF0dHJzLiRvYnNlcnZlKCdpY29uJywgKCkgPT4ge1xuICAgICAgICAgICAgc2V0SW1tZWRpYXRlKCgpID0+IGVsZW1lbnRbMF0uX3VwZGF0ZSgpKTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiAoc2NvcGUsIGVsZW1lbnQsIGF0dHJzKSA9PiB7XG4gICAgICAgICAgR2VuZXJpY1ZpZXcucmVnaXN0ZXIoc2NvcGUsIGVsZW1lbnQsIGF0dHJzLCB7XG4gICAgICAgICAgICB2aWV3S2V5OiAnb25zLWljb24nXG4gICAgICAgICAgfSk7XG4gICAgICAgICAgLy8gJG9uc2VuLmZpcmVDb21wb25lbnRFdmVudChlbGVtZW50WzBdLCAnaW5pdCcpO1xuICAgICAgICB9O1xuXG4gICAgICB9XG5cbiAgICB9O1xuICB9KTtcblxufSkoKTtcblxuIiwiLyoqXG4gKiBAZWxlbWVudCBvbnMtaWYtb3JpZW50YXRpb25cbiAqIEBjYXRlZ29yeSBjb25kaXRpb25hbFxuICogQGRlc2NyaXB0aW9uXG4gKiAgIFtlbl1Db25kaXRpb25hbGx5IGRpc3BsYXkgY29udGVudCBkZXBlbmRpbmcgb24gc2NyZWVuIG9yaWVudGF0aW9uLiBWYWxpZCB2YWx1ZXMgYXJlIHBvcnRyYWl0IGFuZCBsYW5kc2NhcGUuIERpZmZlcmVudCBmcm9tIG90aGVyIGNvbXBvbmVudHMsIHRoaXMgY29tcG9uZW50IGlzIHVzZWQgYXMgYXR0cmlidXRlIGluIGFueSBlbGVtZW50LlsvZW5dXG4gKiAgIFtqYV3nlLvpnaLjga7lkJHjgY3jgavlv5zjgZjjgabjgrPjg7Pjg4bjg7Pjg4Tjga7liLblvqHjgpLooYzjgYTjgb7jgZnjgIJwb3J0cmFpdOOCguOBl+OBj+OBr2xhbmRzY2FwZeOCkuaMh+WumuOBp+OBjeOBvuOBmeOAguOBmeOBueOBpuOBruimgee0oOOBruWxnuaAp+OBq+S9v+eUqOOBp+OBjeOBvuOBmeOAglsvamFdXG4gKiBAc2VlYWxzbyBvbnMtaWYtcGxhdGZvcm0gW2VuXW9ucy1pZi1wbGF0Zm9ybSBjb21wb25lbnRbL2VuXVtqYV1vbnMtaWYtcGxhdGZvcm3jgrPjg7Pjg53jg7zjg43jg7Pjg4hbL2phXVxuICogQGV4YW1wbGVcbiAqIDxkaXYgb25zLWlmLW9yaWVudGF0aW9uPVwicG9ydHJhaXRcIj5cbiAqICAgPHA+VGhpcyB3aWxsIG9ubHkgYmUgdmlzaWJsZSBpbiBwb3J0cmFpdCBtb2RlLjwvcD5cbiAqIDwvZGl2PlxuICovXG5cbi8qKlxuICogQGF0dHJpYnV0ZSBvbnMtaWYtb3JpZW50YXRpb25cbiAqIEBpbml0b25seVxuICogQHR5cGUge1N0cmluZ31cbiAqIEBkZXNjcmlwdGlvblxuICogICBbZW5dRWl0aGVyIFwicG9ydHJhaXRcIiBvciBcImxhbmRzY2FwZVwiLlsvZW5dXG4gKiAgIFtqYV1wb3J0cmFpdOOCguOBl+OBj+OBr2xhbmRzY2FwZeOCkuaMh+WumuOBl+OBvuOBmeOAglsvamFdXG4gKi9cblxuKGZ1bmN0aW9uKCl7XG4gICd1c2Ugc3RyaWN0JztcblxuICB2YXIgbW9kdWxlID0gYW5ndWxhci5tb2R1bGUoJ29uc2VuJyk7XG5cbiAgbW9kdWxlLmRpcmVjdGl2ZSgnb25zSWZPcmllbnRhdGlvbicsIGZ1bmN0aW9uKCRvbnNlbiwgJG9uc0dsb2JhbCkge1xuICAgIHJldHVybiB7XG4gICAgICByZXN0cmljdDogJ0EnLFxuICAgICAgcmVwbGFjZTogZmFsc2UsXG5cbiAgICAgIC8vIE5PVEU6IFRoaXMgZWxlbWVudCBtdXN0IGNvZXhpc3RzIHdpdGggbmctY29udHJvbGxlci5cbiAgICAgIC8vIERvIG5vdCB1c2UgaXNvbGF0ZWQgc2NvcGUgYW5kIHRlbXBsYXRlJ3MgbmctdHJhbnNjbHVkZS5cbiAgICAgIHRyYW5zY2x1ZGU6IGZhbHNlLFxuICAgICAgc2NvcGU6IGZhbHNlLFxuXG4gICAgICBjb21waWxlOiBmdW5jdGlvbihlbGVtZW50KSB7XG4gICAgICAgIGVsZW1lbnQuY3NzKCdkaXNwbGF5JywgJ25vbmUnKTtcblxuICAgICAgICByZXR1cm4gZnVuY3Rpb24oc2NvcGUsIGVsZW1lbnQsIGF0dHJzKSB7XG4gICAgICAgICAgYXR0cnMuJG9ic2VydmUoJ29uc0lmT3JpZW50YXRpb24nLCB1cGRhdGUpO1xuICAgICAgICAgICRvbnNHbG9iYWwub3JpZW50YXRpb24ub24oJ2NoYW5nZScsIHVwZGF0ZSk7XG5cbiAgICAgICAgICB1cGRhdGUoKTtcblxuICAgICAgICAgICRvbnNlbi5jbGVhbmVyLm9uRGVzdHJveShzY29wZSwgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAkb25zR2xvYmFsLm9yaWVudGF0aW9uLm9mZignY2hhbmdlJywgdXBkYXRlKTtcblxuICAgICAgICAgICAgJG9uc2VuLmNsZWFyQ29tcG9uZW50KHtcbiAgICAgICAgICAgICAgZWxlbWVudDogZWxlbWVudCxcbiAgICAgICAgICAgICAgc2NvcGU6IHNjb3BlLFxuICAgICAgICAgICAgICBhdHRyczogYXR0cnNcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgZWxlbWVudCA9IHNjb3BlID0gYXR0cnMgPSBudWxsO1xuICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgZnVuY3Rpb24gdXBkYXRlKCkge1xuICAgICAgICAgICAgdmFyIHVzZXJPcmllbnRhdGlvbiA9ICgnJyArIGF0dHJzLm9uc0lmT3JpZW50YXRpb24pLnRvTG93ZXJDYXNlKCk7XG4gICAgICAgICAgICB2YXIgb3JpZW50YXRpb24gPSBnZXRMYW5kc2NhcGVPclBvcnRyYWl0KCk7XG5cbiAgICAgICAgICAgIGlmICh1c2VyT3JpZW50YXRpb24gPT09ICdwb3J0cmFpdCcgfHwgdXNlck9yaWVudGF0aW9uID09PSAnbGFuZHNjYXBlJykge1xuICAgICAgICAgICAgICBpZiAodXNlck9yaWVudGF0aW9uID09PSBvcmllbnRhdGlvbikge1xuICAgICAgICAgICAgICAgIGVsZW1lbnQuY3NzKCdkaXNwbGF5JywgJycpO1xuICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGVsZW1lbnQuY3NzKCdkaXNwbGF5JywgJ25vbmUnKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cblxuICAgICAgICAgIGZ1bmN0aW9uIGdldExhbmRzY2FwZU9yUG9ydHJhaXQoKSB7XG4gICAgICAgICAgICByZXR1cm4gJG9uc0dsb2JhbC5vcmllbnRhdGlvbi5pc1BvcnRyYWl0KCkgPyAncG9ydHJhaXQnIDogJ2xhbmRzY2FwZSc7XG4gICAgICAgICAgfVxuICAgICAgICB9O1xuICAgICAgfVxuICAgIH07XG4gIH0pO1xufSkoKTtcblxuIiwiLyoqXG4gKiBAZWxlbWVudCBvbnMtaWYtcGxhdGZvcm1cbiAqIEBjYXRlZ29yeSBjb25kaXRpb25hbFxuICogQGRlc2NyaXB0aW9uXG4gKiAgICBbZW5dQ29uZGl0aW9uYWxseSBkaXNwbGF5IGNvbnRlbnQgZGVwZW5kaW5nIG9uIHRoZSBwbGF0Zm9ybSAvIGJyb3dzZXIuIFZhbGlkIHZhbHVlcyBhcmUgXCJvcGVyYVwiLCBcImZpcmVmb3hcIiwgXCJzYWZhcmlcIiwgXCJjaHJvbWVcIiwgXCJpZVwiLCBcImVkZ2VcIiwgXCJhbmRyb2lkXCIsIFwiYmxhY2tiZXJyeVwiLCBcImlvc1wiIGFuZCBcIndwXCIuWy9lbl1cbiAqICAgIFtqYV3jg5fjg6njg4Pjg4jjg5Xjgqnjg7zjg6DjgoTjg5bjg6njgqbjgrbjg7zjgavlv5zjgZjjgabjgrPjg7Pjg4bjg7Pjg4Tjga7liLblvqHjgpLjgYrjgZPjgarjgYTjgb7jgZnjgIJvcGVyYSwgZmlyZWZveCwgc2FmYXJpLCBjaHJvbWUsIGllLCBlZGdlLCBhbmRyb2lkLCBibGFja2JlcnJ5LCBpb3MsIHdw44Gu44GE44Ga44KM44GL44Gu5YCk44KS56m655m95Yy65YiH44KK44Gn6KSH5pWw5oyH5a6a44Gn44GN44G+44GZ44CCWy9qYV1cbiAqIEBzZWVhbHNvIG9ucy1pZi1vcmllbnRhdGlvbiBbZW5db25zLWlmLW9yaWVudGF0aW9uIGNvbXBvbmVudFsvZW5dW2phXW9ucy1pZi1vcmllbnRhdGlvbuOCs+ODs+ODneODvOODjeODs+ODiFsvamFdXG4gKiBAZXhhbXBsZVxuICogPGRpdiBvbnMtaWYtcGxhdGZvcm09XCJhbmRyb2lkXCI+XG4gKiAgIC4uLlxuICogPC9kaXY+XG4gKi9cblxuLyoqXG4gKiBAYXR0cmlidXRlIG9ucy1pZi1wbGF0Zm9ybVxuICogQHR5cGUge1N0cmluZ31cbiAqIEBpbml0b25seVxuICogQGRlc2NyaXB0aW9uXG4gKiAgIFtlbl1PbmUgb3IgbXVsdGlwbGUgc3BhY2Ugc2VwYXJhdGVkIHZhbHVlczogXCJvcGVyYVwiLCBcImZpcmVmb3hcIiwgXCJzYWZhcmlcIiwgXCJjaHJvbWVcIiwgXCJpZVwiLCBcImVkZ2VcIiwgXCJhbmRyb2lkXCIsIFwiYmxhY2tiZXJyeVwiLCBcImlvc1wiIG9yIFwid3BcIi5bL2VuXVxuICogICBbamFdXCJvcGVyYVwiLCBcImZpcmVmb3hcIiwgXCJzYWZhcmlcIiwgXCJjaHJvbWVcIiwgXCJpZVwiLCBcImVkZ2VcIiwgXCJhbmRyb2lkXCIsIFwiYmxhY2tiZXJyeVwiLCBcImlvc1wiLCBcIndwXCLjga7jgYTjgZrjgozjgYvnqbrnmb3ljLrliIfjgorjgafopIfmlbDmjIflrprjgafjgY3jgb7jgZnjgIJbL2phXVxuICovXG5cbihmdW5jdGlvbigpIHtcbiAgJ3VzZSBzdHJpY3QnO1xuXG4gIHZhciBtb2R1bGUgPSBhbmd1bGFyLm1vZHVsZSgnb25zZW4nKTtcblxuICBtb2R1bGUuZGlyZWN0aXZlKCdvbnNJZlBsYXRmb3JtJywgZnVuY3Rpb24oJG9uc2VuKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHJlc3RyaWN0OiAnQScsXG4gICAgICByZXBsYWNlOiBmYWxzZSxcblxuICAgICAgLy8gTk9URTogVGhpcyBlbGVtZW50IG11c3QgY29leGlzdHMgd2l0aCBuZy1jb250cm9sbGVyLlxuICAgICAgLy8gRG8gbm90IHVzZSBpc29sYXRlZCBzY29wZSBhbmQgdGVtcGxhdGUncyBuZy10cmFuc2NsdWRlLlxuICAgICAgdHJhbnNjbHVkZTogZmFsc2UsXG4gICAgICBzY29wZTogZmFsc2UsXG5cbiAgICAgIGNvbXBpbGU6IGZ1bmN0aW9uKGVsZW1lbnQpIHtcbiAgICAgICAgZWxlbWVudC5jc3MoJ2Rpc3BsYXknLCAnbm9uZScpO1xuXG4gICAgICAgIHZhciBwbGF0Zm9ybSA9IGdldFBsYXRmb3JtU3RyaW5nKCk7XG5cbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uKHNjb3BlLCBlbGVtZW50LCBhdHRycykge1xuICAgICAgICAgIGF0dHJzLiRvYnNlcnZlKCdvbnNJZlBsYXRmb3JtJywgZnVuY3Rpb24odXNlclBsYXRmb3JtKSB7XG4gICAgICAgICAgICBpZiAodXNlclBsYXRmb3JtKSB7XG4gICAgICAgICAgICAgIHVwZGF0ZSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgdXBkYXRlKCk7XG5cbiAgICAgICAgICAkb25zZW4uY2xlYW5lci5vbkRlc3Ryb3koc2NvcGUsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgJG9uc2VuLmNsZWFyQ29tcG9uZW50KHtcbiAgICAgICAgICAgICAgZWxlbWVudDogZWxlbWVudCxcbiAgICAgICAgICAgICAgc2NvcGU6IHNjb3BlLFxuICAgICAgICAgICAgICBhdHRyczogYXR0cnNcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgZWxlbWVudCA9IHNjb3BlID0gYXR0cnMgPSBudWxsO1xuICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgZnVuY3Rpb24gdXBkYXRlKCkge1xuICAgICAgICAgICAgdmFyIHVzZXJQbGF0Zm9ybXMgPSBhdHRycy5vbnNJZlBsYXRmb3JtLnRvTG93ZXJDYXNlKCkudHJpbSgpLnNwbGl0KC9cXHMrLyk7XG4gICAgICAgICAgICBpZiAodXNlclBsYXRmb3Jtcy5pbmRleE9mKHBsYXRmb3JtLnRvTG93ZXJDYXNlKCkpID49IDApIHtcbiAgICAgICAgICAgICAgZWxlbWVudC5jc3MoJ2Rpc3BsYXknLCAnYmxvY2snKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIGVsZW1lbnQuY3NzKCdkaXNwbGF5JywgJ25vbmUnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH07XG5cbiAgICAgICAgZnVuY3Rpb24gZ2V0UGxhdGZvcm1TdHJpbmcoKSB7XG5cbiAgICAgICAgICBpZiAobmF2aWdhdG9yLnVzZXJBZ2VudC5tYXRjaCgvQW5kcm9pZC9pKSkge1xuICAgICAgICAgICAgcmV0dXJuICdhbmRyb2lkJztcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBpZiAoKG5hdmlnYXRvci51c2VyQWdlbnQubWF0Y2goL0JsYWNrQmVycnkvaSkpIHx8IChuYXZpZ2F0b3IudXNlckFnZW50Lm1hdGNoKC9SSU0gVGFibGV0IE9TL2kpKSB8fCAobmF2aWdhdG9yLnVzZXJBZ2VudC5tYXRjaCgvQkIxMC9pKSkpIHtcbiAgICAgICAgICAgIHJldHVybiAnYmxhY2tiZXJyeSc7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgaWYgKG5hdmlnYXRvci51c2VyQWdlbnQubWF0Y2goL2lQaG9uZXxpUGFkfGlQb2QvaSkpIHtcbiAgICAgICAgICAgIHJldHVybiAnaW9zJztcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBpZiAobmF2aWdhdG9yLnVzZXJBZ2VudC5tYXRjaCgvV2luZG93cyBQaG9uZXxJRU1vYmlsZXxXUERlc2t0b3AvaSkpIHtcbiAgICAgICAgICAgIHJldHVybiAnd3AnO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIC8vIE9wZXJhIDguMCsgKFVBIGRldGVjdGlvbiB0byBkZXRlY3QgQmxpbmsvdjgtcG93ZXJlZCBPcGVyYSlcbiAgICAgICAgICB2YXIgaXNPcGVyYSA9ICEhd2luZG93Lm9wZXJhIHx8IG5hdmlnYXRvci51c2VyQWdlbnQuaW5kZXhPZignIE9QUi8nKSA+PSAwO1xuICAgICAgICAgIGlmIChpc09wZXJhKSB7XG4gICAgICAgICAgICByZXR1cm4gJ29wZXJhJztcbiAgICAgICAgICB9XG5cbiAgICAgICAgICB2YXIgaXNGaXJlZm94ID0gdHlwZW9mIEluc3RhbGxUcmlnZ2VyICE9PSAndW5kZWZpbmVkJzsgICAvLyBGaXJlZm94IDEuMCtcbiAgICAgICAgICBpZiAoaXNGaXJlZm94KSB7XG4gICAgICAgICAgICByZXR1cm4gJ2ZpcmVmb3gnO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIHZhciBpc1NhZmFyaSA9IE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbCh3aW5kb3cuSFRNTEVsZW1lbnQpLmluZGV4T2YoJ0NvbnN0cnVjdG9yJykgPiAwO1xuICAgICAgICAgIC8vIEF0IGxlYXN0IFNhZmFyaSAzKzogXCJbb2JqZWN0IEhUTUxFbGVtZW50Q29uc3RydWN0b3JdXCJcbiAgICAgICAgICBpZiAoaXNTYWZhcmkpIHtcbiAgICAgICAgICAgIHJldHVybiAnc2FmYXJpJztcbiAgICAgICAgICB9XG5cbiAgICAgICAgICB2YXIgaXNFZGdlID0gbmF2aWdhdG9yLnVzZXJBZ2VudC5pbmRleE9mKCcgRWRnZS8nKSA+PSAwO1xuICAgICAgICAgIGlmIChpc0VkZ2UpIHtcbiAgICAgICAgICAgIHJldHVybiAnZWRnZSc7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgdmFyIGlzQ2hyb21lID0gISF3aW5kb3cuY2hyb21lICYmICFpc09wZXJhICYmICFpc0VkZ2U7IC8vIENocm9tZSAxK1xuICAgICAgICAgIGlmIChpc0Nocm9tZSkge1xuICAgICAgICAgICAgcmV0dXJuICdjaHJvbWUnO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIHZhciBpc0lFID0gLypAY2Nfb24hQCovZmFsc2UgfHwgISFkb2N1bWVudC5kb2N1bWVudE1vZGU7IC8vIEF0IGxlYXN0IElFNlxuICAgICAgICAgIGlmIChpc0lFKSB7XG4gICAgICAgICAgICByZXR1cm4gJ2llJztcbiAgICAgICAgICB9XG5cbiAgICAgICAgICByZXR1cm4gJ3Vua25vd24nO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfTtcbiAgfSk7XG59KSgpO1xuIiwiLyoqXG4gKiBAZWxlbWVudCBvbnMtaW5wdXRcbiAqL1xuXG4oZnVuY3Rpb24oKXtcbiAgJ3VzZSBzdHJpY3QnO1xuXG4gIGFuZ3VsYXIubW9kdWxlKCdvbnNlbicpLmRpcmVjdGl2ZSgnb25zSW5wdXQnLCBmdW5jdGlvbigkcGFyc2UpIHtcbiAgICByZXR1cm4ge1xuICAgICAgcmVzdHJpY3Q6ICdFJyxcbiAgICAgIHJlcGxhY2U6IGZhbHNlLFxuICAgICAgc2NvcGU6IGZhbHNlLFxuXG4gICAgICBsaW5rOiBmdW5jdGlvbihzY29wZSwgZWxlbWVudCwgYXR0cnMpIHtcbiAgICAgICAgbGV0IGVsID0gZWxlbWVudFswXTtcblxuICAgICAgICBjb25zdCBvbklucHV0ID0gKCkgPT4ge1xuICAgICAgICAgICRwYXJzZShhdHRycy5uZ01vZGVsKS5hc3NpZ24oc2NvcGUsIGVsLnR5cGUgPT09ICdudW1iZXInID8gTnVtYmVyKGVsLnZhbHVlKSA6IGVsLnZhbHVlKTtcbiAgICAgICAgICBhdHRycy5uZ0NoYW5nZSAmJiBzY29wZS4kZXZhbChhdHRycy5uZ0NoYW5nZSk7XG4gICAgICAgICAgc2NvcGUuJHBhcmVudC4kZXZhbEFzeW5jKCk7XG4gICAgICAgIH07XG5cbiAgICAgICAgaWYgKGF0dHJzLm5nTW9kZWwpIHtcbiAgICAgICAgICBzY29wZS4kd2F0Y2goYXR0cnMubmdNb2RlbCwgKHZhbHVlKSA9PiB7XG4gICAgICAgICAgICBpZiAodHlwZW9mIHZhbHVlICE9PSAndW5kZWZpbmVkJyAmJiB2YWx1ZSAhPT0gZWwudmFsdWUpIHtcbiAgICAgICAgICAgICAgZWwudmFsdWUgPSB2YWx1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KTtcblxuICAgICAgICAgIGVsZW1lbnQub24oJ2lucHV0Jywgb25JbnB1dClcbiAgICAgICAgfVxuXG4gICAgICAgIHNjb3BlLiRvbignJGRlc3Ryb3knLCAoKSA9PiB7XG4gICAgICAgICAgZWxlbWVudC5vZmYoJ2lucHV0Jywgb25JbnB1dClcbiAgICAgICAgICBzY29wZSA9IGVsZW1lbnQgPSBhdHRycyA9IGVsID0gbnVsbDtcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfTtcbiAgfSk7XG59KSgpO1xuIiwiLyoqXG4gKiBAZWxlbWVudCBvbnMta2V5Ym9hcmQtYWN0aXZlXG4gKiBAY2F0ZWdvcnkgZm9ybVxuICogQGRlc2NyaXB0aW9uXG4gKiAgIFtlbl1cbiAqICAgICBDb25kaXRpb25hbGx5IGRpc3BsYXkgY29udGVudCBkZXBlbmRpbmcgb24gaWYgdGhlIHNvZnR3YXJlIGtleWJvYXJkIGlzIHZpc2libGUgb3IgaGlkZGVuLlxuICogICAgIFRoaXMgY29tcG9uZW50IHJlcXVpcmVzIGNvcmRvdmEgYW5kIHRoYXQgdGhlIGNvbS5pb25pYy5rZXlib2FyZCBwbHVnaW4gaXMgaW5zdGFsbGVkLlxuICogICBbL2VuXVxuICogICBbamFdXG4gKiAgICAg44K944OV44OI44Km44Kn44Ki44Kt44O844Oc44O844OJ44GM6KGo56S644GV44KM44Gm44GE44KL44GL44Gp44GG44GL44Gn44CB44Kz44Oz44OG44Oz44OE44KS6KGo56S644GZ44KL44GL44Gp44GG44GL44KS5YiH44KK5pu/44GI44KL44GT44Go44GM5Ye65p2l44G+44GZ44CCXG4gKiAgICAg44GT44Gu44Kz44Oz44Od44O844ON44Oz44OI44Gv44CBQ29yZG92YeOChGNvbS5pb25pYy5rZXlib2FyZOODl+ODqeOCsOOCpOODs+OCkuW/heimgeOBqOOBl+OBvuOBmeOAglxuICogICBbL2phXVxuICogQGV4YW1wbGVcbiAqIDxkaXYgb25zLWtleWJvYXJkLWFjdGl2ZT5cbiAqICAgVGhpcyB3aWxsIG9ubHkgYmUgZGlzcGxheWVkIGlmIHRoZSBzb2Z0d2FyZSBrZXlib2FyZCBpcyBvcGVuLlxuICogPC9kaXY+XG4gKiA8ZGl2IG9ucy1rZXlib2FyZC1pbmFjdGl2ZT5cbiAqICAgVGhlcmUgaXMgYWxzbyBhIGNvbXBvbmVudCB0aGF0IGRvZXMgdGhlIG9wcG9zaXRlLlxuICogPC9kaXY+XG4gKi9cblxuLyoqXG4gKiBAYXR0cmlidXRlIG9ucy1rZXlib2FyZC1hY3RpdmVcbiAqIEBkZXNjcmlwdGlvblxuICogICBbZW5dVGhlIGNvbnRlbnQgb2YgdGFncyB3aXRoIHRoaXMgYXR0cmlidXRlIHdpbGwgYmUgdmlzaWJsZSB3aGVuIHRoZSBzb2Z0d2FyZSBrZXlib2FyZCBpcyBvcGVuLlsvZW5dXG4gKiAgIFtqYV3jgZPjga7lsZ7mgKfjgYzjgaTjgYTjgZ/opoHntKDjga/jgIHjgr3jg5Xjg4jjgqbjgqfjgqLjgq3jg7zjg5zjg7zjg4njgYzooajnpLrjgZXjgozjgZ/mmYLjgavliJ3jgoHjgabooajnpLrjgZXjgozjgb7jgZnjgIJbL2phXVxuICovXG5cbi8qKlxuICogQGF0dHJpYnV0ZSBvbnMta2V5Ym9hcmQtaW5hY3RpdmVcbiAqIEBkZXNjcmlwdGlvblxuICogICBbZW5dVGhlIGNvbnRlbnQgb2YgdGFncyB3aXRoIHRoaXMgYXR0cmlidXRlIHdpbGwgYmUgdmlzaWJsZSB3aGVuIHRoZSBzb2Z0d2FyZSBrZXlib2FyZCBpcyBoaWRkZW4uWy9lbl1cbiAqICAgW2phXeOBk+OBruWxnuaAp+OBjOOBpOOBhOOBn+imgee0oOOBr+OAgeOCveODleODiOOCpuOCp+OCouOCreODvOODnOODvOODieOBjOmaoOOCjOOBpuOBhOOCi+aZguOBruOBv+ihqOekuuOBleOCjOOBvuOBmeOAglsvamFdXG4gKi9cblxuKGZ1bmN0aW9uKCkge1xuICAndXNlIHN0cmljdCc7XG5cbiAgdmFyIG1vZHVsZSA9IGFuZ3VsYXIubW9kdWxlKCdvbnNlbicpO1xuXG4gIHZhciBjb21waWxlRnVuY3Rpb24gPSBmdW5jdGlvbihzaG93LCAkb25zZW4pIHtcbiAgICByZXR1cm4gZnVuY3Rpb24oZWxlbWVudCkge1xuICAgICAgcmV0dXJuIGZ1bmN0aW9uKHNjb3BlLCBlbGVtZW50LCBhdHRycykge1xuICAgICAgICB2YXIgZGlzcFNob3cgPSBzaG93ID8gJ2Jsb2NrJyA6ICdub25lJyxcbiAgICAgICAgICAgIGRpc3BIaWRlID0gc2hvdyA/ICdub25lJyA6ICdibG9jayc7XG5cbiAgICAgICAgdmFyIG9uU2hvdyA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgIGVsZW1lbnQuY3NzKCdkaXNwbGF5JywgZGlzcFNob3cpO1xuICAgICAgICB9O1xuXG4gICAgICAgIHZhciBvbkhpZGUgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICBlbGVtZW50LmNzcygnZGlzcGxheScsIGRpc3BIaWRlKTtcbiAgICAgICAgfTtcblxuICAgICAgICB2YXIgb25Jbml0ID0gZnVuY3Rpb24oZSkge1xuICAgICAgICAgIGlmIChlLnZpc2libGUpIHtcbiAgICAgICAgICAgIG9uU2hvdygpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBvbkhpZGUoKTtcbiAgICAgICAgICB9XG4gICAgICAgIH07XG5cbiAgICAgICAgb25zLnNvZnR3YXJlS2V5Ym9hcmQub24oJ3Nob3cnLCBvblNob3cpO1xuICAgICAgICBvbnMuc29mdHdhcmVLZXlib2FyZC5vbignaGlkZScsIG9uSGlkZSk7XG4gICAgICAgIG9ucy5zb2Z0d2FyZUtleWJvYXJkLm9uKCdpbml0Jywgb25Jbml0KTtcblxuICAgICAgICBpZiAob25zLnNvZnR3YXJlS2V5Ym9hcmQuX3Zpc2libGUpIHtcbiAgICAgICAgICBvblNob3coKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBvbkhpZGUoKTtcbiAgICAgICAgfVxuXG4gICAgICAgICRvbnNlbi5jbGVhbmVyLm9uRGVzdHJveShzY29wZSwgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgb25zLnNvZnR3YXJlS2V5Ym9hcmQub2ZmKCdzaG93Jywgb25TaG93KTtcbiAgICAgICAgICBvbnMuc29mdHdhcmVLZXlib2FyZC5vZmYoJ2hpZGUnLCBvbkhpZGUpO1xuICAgICAgICAgIG9ucy5zb2Z0d2FyZUtleWJvYXJkLm9mZignaW5pdCcsIG9uSW5pdCk7XG5cbiAgICAgICAgICAkb25zZW4uY2xlYXJDb21wb25lbnQoe1xuICAgICAgICAgICAgZWxlbWVudDogZWxlbWVudCxcbiAgICAgICAgICAgIHNjb3BlOiBzY29wZSxcbiAgICAgICAgICAgIGF0dHJzOiBhdHRyc1xuICAgICAgICAgIH0pO1xuICAgICAgICAgIGVsZW1lbnQgPSBzY29wZSA9IGF0dHJzID0gbnVsbDtcbiAgICAgICAgfSk7XG4gICAgICB9O1xuICAgIH07XG4gIH07XG5cbiAgbW9kdWxlLmRpcmVjdGl2ZSgnb25zS2V5Ym9hcmRBY3RpdmUnLCBmdW5jdGlvbigkb25zZW4pIHtcbiAgICByZXR1cm4ge1xuICAgICAgcmVzdHJpY3Q6ICdBJyxcbiAgICAgIHJlcGxhY2U6IGZhbHNlLFxuICAgICAgdHJhbnNjbHVkZTogZmFsc2UsXG4gICAgICBzY29wZTogZmFsc2UsXG4gICAgICBjb21waWxlOiBjb21waWxlRnVuY3Rpb24odHJ1ZSwgJG9uc2VuKVxuICAgIH07XG4gIH0pO1xuXG4gIG1vZHVsZS5kaXJlY3RpdmUoJ29uc0tleWJvYXJkSW5hY3RpdmUnLCBmdW5jdGlvbigkb25zZW4pIHtcbiAgICByZXR1cm4ge1xuICAgICAgcmVzdHJpY3Q6ICdBJyxcbiAgICAgIHJlcGxhY2U6IGZhbHNlLFxuICAgICAgdHJhbnNjbHVkZTogZmFsc2UsXG4gICAgICBzY29wZTogZmFsc2UsXG4gICAgICBjb21waWxlOiBjb21waWxlRnVuY3Rpb24oZmFsc2UsICRvbnNlbilcbiAgICB9O1xuICB9KTtcbn0pKCk7XG4iLCIvKipcbiAqIEBlbGVtZW50IG9ucy1sYXp5LXJlcGVhdFxuICogQGRlc2NyaXB0aW9uXG4gKiAgIFtlbl1cbiAqICAgICBVc2luZyB0aGlzIGNvbXBvbmVudCBhIGxpc3Qgd2l0aCBtaWxsaW9ucyBvZiBpdGVtcyBjYW4gYmUgcmVuZGVyZWQgd2l0aG91dCBhIGRyb3AgaW4gcGVyZm9ybWFuY2UuXG4gKiAgICAgSXQgZG9lcyB0aGF0IGJ5IFwibGF6aWx5XCIgbG9hZGluZyBlbGVtZW50cyBpbnRvIHRoZSBET00gd2hlbiB0aGV5IGNvbWUgaW50byB2aWV3IGFuZFxuICogICAgIHJlbW92aW5nIGl0ZW1zIGZyb20gdGhlIERPTSB3aGVuIHRoZXkgYXJlIG5vdCB2aXNpYmxlLlxuICogICBbL2VuXVxuICogICBbamFdXG4gKiAgICAg44GT44Gu44Kz44Oz44Od44O844ON44Oz44OI5YaF44Gn5o+P55S744GV44KM44KL44Ki44Kk44OG44Og44GuRE9N6KaB57Sg44Gu6Kqt44G/6L6844G/44Gv44CB55S76Z2i44Gr6KaL44GI44Gd44GG44Gr44Gq44Gj44Gf5pmC44G+44Gn6Ieq5YuV55qE44Gr6YGF5bu244GV44KM44CBXG4gKiAgICAg55S76Z2i44GL44KJ6KaL44GI44Gq44GP44Gq44Gj44Gf5aC05ZCI44Gr44Gv44Gd44Gu6KaB57Sg44Gv5YuV55qE44Gr44Ki44Oz44Ot44O844OJ44GV44KM44G+44GZ44CCXG4gKiAgICAg44GT44Gu44Kz44Oz44Od44O844ON44Oz44OI44KS5L2/44GG44GT44Go44Gn44CB44OR44OV44Kp44O844Oe44Oz44K544KS5Yqj5YyW44GV44Gb44KL44GT44Go54Sh44GX44Gr5beo5aSn44Gq5pWw44Gu6KaB57Sg44KS5o+P55S744Gn44GN44G+44GZ44CCXG4gKiAgIFsvamFdXG4gKiBAY29kZXBlbiBRd3JHQm1cbiAqIEBndWlkZSBVc2luZ0xhenlSZXBlYXRcbiAqICAgW2VuXUhvdyB0byB1c2UgTGF6eSBSZXBlYXRbL2VuXVxuICogICBbamFd44Os44Kk44K444O844Oq44OU44O844OI44Gu5L2/44GE5pa5Wy9qYV1cbiAqIEBleGFtcGxlXG4gKiA8c2NyaXB0PlxuICogICBvbnMuYm9vdHN0cmFwKClcbiAqXG4gKiAgIC5jb250cm9sbGVyKCdNeUNvbnRyb2xsZXInLCBmdW5jdGlvbigkc2NvcGUpIHtcbiAqICAgICAkc2NvcGUuTXlEZWxlZ2F0ZSA9IHtcbiAqICAgICAgIGNvdW50SXRlbXM6IGZ1bmN0aW9uKCkge1xuICogICAgICAgICAvLyBSZXR1cm4gbnVtYmVyIG9mIGl0ZW1zLlxuICogICAgICAgICByZXR1cm4gMTAwMDAwMDtcbiAqICAgICAgIH0sXG4gKlxuICogICAgICAgY2FsY3VsYXRlSXRlbUhlaWdodDogZnVuY3Rpb24oaW5kZXgpIHtcbiAqICAgICAgICAgLy8gUmV0dXJuIHRoZSBoZWlnaHQgb2YgYW4gaXRlbSBpbiBwaXhlbHMuXG4gKiAgICAgICAgIHJldHVybiA0NTtcbiAqICAgICAgIH0sXG4gKlxuICogICAgICAgY29uZmlndXJlSXRlbVNjb3BlOiBmdW5jdGlvbihpbmRleCwgaXRlbVNjb3BlKSB7XG4gKiAgICAgICAgIC8vIEluaXRpYWxpemUgc2NvcGVcbiAqICAgICAgICAgaXRlbVNjb3BlLml0ZW0gPSAnSXRlbSAjJyArIChpbmRleCArIDEpO1xuICogICAgICAgfSxcbiAqXG4gKiAgICAgICBkZXN0cm95SXRlbVNjb3BlOiBmdW5jdGlvbihpbmRleCwgaXRlbVNjb3BlKSB7XG4gKiAgICAgICAgIC8vIE9wdGlvbmFsIG1ldGhvZCB0aGF0IGlzIGNhbGxlZCB3aGVuIGFuIGl0ZW0gaXMgdW5sb2FkZWQuXG4gKiAgICAgICAgIGNvbnNvbGUubG9nKCdEZXN0cm95ZWQgaXRlbSB3aXRoIGluZGV4OiAnICsgaW5kZXgpO1xuICogICAgICAgfVxuICogICAgIH07XG4gKiAgIH0pO1xuICogPC9zY3JpcHQ+XG4gKlxuICogPG9ucy1saXN0IG5nLWNvbnRyb2xsZXI9XCJNeUNvbnRyb2xsZXJcIj5cbiAqICAgPG9ucy1saXN0LWl0ZW0gb25zLWxhenktcmVwZWF0PVwiTXlEZWxlZ2F0ZVwiPlxuICogICAgIHt7IGl0ZW0gfX1cbiAqICAgPC9vbnMtbGlzdC1pdGVtPlxuICogPC9vbnMtbGlzdD5cbiAqL1xuXG4vKipcbiAqIEBhdHRyaWJ1dGUgb25zLWxhenktcmVwZWF0XG4gKiBAdHlwZSB7RXhwcmVzc2lvbn1cbiAqIEBpbml0b25seVxuICogQGRlc2NyaXB0aW9uXG4gKiAgW2VuXUEgZGVsZWdhdGUgb2JqZWN0LCBjYW4gYmUgZWl0aGVyIGFuIG9iamVjdCBhdHRhY2hlZCB0byB0aGUgc2NvcGUgKHdoZW4gdXNpbmcgQW5ndWxhckpTKSBvciBhIG5vcm1hbCBKYXZhU2NyaXB0IHZhcmlhYmxlLlsvZW5dXG4gKiAgW2phXeimgee0oOOBruODreODvOODieOAgeOCouODs+ODreODvOODieOBquOBqeOBruWHpueQhuOCkuWnlOitsuOBmeOCi+OCquODluOCuOOCp+OCr+ODiOOCkuaMh+WumuOBl+OBvuOBmeOAgkFuZ3VsYXJKU+OBruOCueOCs+ODvOODl+OBruWkieaVsOWQjeOChOOAgemAmuW4uOOBrkphdmFTY3JpcHTjga7lpInmlbDlkI3jgpLmjIflrprjgZfjgb7jgZnjgIJbL2phXVxuICovXG5cbi8qKlxuICogQHByb3BlcnR5IGRlbGVnYXRlLmNvbmZpZ3VyZUl0ZW1TY29wZVxuICogQHR5cGUge0Z1bmN0aW9ufVxuICogQGRlc2NyaXB0aW9uXG4gKiAgIFtlbl1GdW5jdGlvbiB3aGljaCByZWNpZXZlcyBhbiBpbmRleCBhbmQgdGhlIHNjb3BlIGZvciB0aGUgaXRlbS4gQ2FuIGJlIHVzZWQgdG8gY29uZmlndXJlIHZhbHVlcyBpbiB0aGUgaXRlbSBzY29wZS5bL2VuXVxuICogICBbamFdWy9qYV1cbiAqL1xuXG4oZnVuY3Rpb24oKSB7XG4gICd1c2Ugc3RyaWN0JztcblxuICB2YXIgbW9kdWxlID0gYW5ndWxhci5tb2R1bGUoJ29uc2VuJyk7XG5cbiAgLyoqXG4gICAqIExhenkgcmVwZWF0IGRpcmVjdGl2ZS5cbiAgICovXG4gIG1vZHVsZS5kaXJlY3RpdmUoJ29uc0xhenlSZXBlYXQnLCBmdW5jdGlvbigkb25zZW4sIExhenlSZXBlYXRWaWV3KSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHJlc3RyaWN0OiAnQScsXG4gICAgICByZXBsYWNlOiBmYWxzZSxcbiAgICAgIHByaW9yaXR5OiAxMDAwLFxuICAgICAgdGVybWluYWw6IHRydWUsXG5cbiAgICAgIGNvbXBpbGU6IGZ1bmN0aW9uKGVsZW1lbnQsIGF0dHJzKSB7XG4gICAgICAgIHJldHVybiBmdW5jdGlvbihzY29wZSwgZWxlbWVudCwgYXR0cnMpIHtcbiAgICAgICAgICB2YXIgbGF6eVJlcGVhdCA9IG5ldyBMYXp5UmVwZWF0VmlldyhzY29wZSwgZWxlbWVudCwgYXR0cnMpO1xuXG4gICAgICAgICAgc2NvcGUuJG9uKCckZGVzdHJveScsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgc2NvcGUgPSBlbGVtZW50ID0gYXR0cnMgPSBsYXp5UmVwZWF0ID0gbnVsbDtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfTtcbiAgICAgIH1cbiAgICB9O1xuICB9KTtcblxufSkoKTtcbiIsIihmdW5jdGlvbigpIHtcbiAgJ3VzZSBzdHJpY3QnO1xuXG4gIGFuZ3VsYXIubW9kdWxlKCdvbnNlbicpLmRpcmVjdGl2ZSgnb25zTGlzdEhlYWRlcicsIGZ1bmN0aW9uKCRvbnNlbiwgR2VuZXJpY1ZpZXcpIHtcbiAgICByZXR1cm4ge1xuICAgICAgcmVzdHJpY3Q6ICdFJyxcbiAgICAgIGxpbms6IGZ1bmN0aW9uKHNjb3BlLCBlbGVtZW50LCBhdHRycykge1xuICAgICAgICBHZW5lcmljVmlldy5yZWdpc3RlcihzY29wZSwgZWxlbWVudCwgYXR0cnMsIHt2aWV3S2V5OiAnb25zLWxpc3QtaGVhZGVyJ30pO1xuICAgICAgICAkb25zZW4uZmlyZUNvbXBvbmVudEV2ZW50KGVsZW1lbnRbMF0sICdpbml0Jyk7XG4gICAgICB9XG4gICAgfTtcbiAgfSk7XG5cbn0pKCk7XG4iLCIoZnVuY3Rpb24oKSB7XG4gICd1c2Ugc3RyaWN0JztcblxuICBhbmd1bGFyLm1vZHVsZSgnb25zZW4nKS5kaXJlY3RpdmUoJ29uc0xpc3RJdGVtJywgZnVuY3Rpb24oJG9uc2VuLCBHZW5lcmljVmlldykge1xuICAgIHJldHVybiB7XG4gICAgICByZXN0cmljdDogJ0UnLFxuICAgICAgbGluazogZnVuY3Rpb24oc2NvcGUsIGVsZW1lbnQsIGF0dHJzKSB7XG4gICAgICAgIEdlbmVyaWNWaWV3LnJlZ2lzdGVyKHNjb3BlLCBlbGVtZW50LCBhdHRycywge3ZpZXdLZXk6ICdvbnMtbGlzdC1pdGVtJ30pO1xuICAgICAgICAkb25zZW4uZmlyZUNvbXBvbmVudEV2ZW50KGVsZW1lbnRbMF0sICdpbml0Jyk7XG4gICAgICB9XG4gICAgfTtcbiAgfSk7XG59KSgpO1xuIiwiKGZ1bmN0aW9uKCkge1xuICAndXNlIHN0cmljdCc7XG5cbiAgYW5ndWxhci5tb2R1bGUoJ29uc2VuJykuZGlyZWN0aXZlKCdvbnNMaXN0JywgZnVuY3Rpb24oJG9uc2VuLCBHZW5lcmljVmlldykge1xuICAgIHJldHVybiB7XG4gICAgICByZXN0cmljdDogJ0UnLFxuICAgICAgbGluazogZnVuY3Rpb24oc2NvcGUsIGVsZW1lbnQsIGF0dHJzKSB7XG4gICAgICAgIEdlbmVyaWNWaWV3LnJlZ2lzdGVyKHNjb3BlLCBlbGVtZW50LCBhdHRycywge3ZpZXdLZXk6ICdvbnMtbGlzdCd9KTtcbiAgICAgICAgJG9uc2VuLmZpcmVDb21wb25lbnRFdmVudChlbGVtZW50WzBdLCAnaW5pdCcpO1xuICAgICAgfVxuICAgIH07XG4gIH0pO1xuXG59KSgpO1xuIiwiKGZ1bmN0aW9uKCkge1xuICAndXNlIHN0cmljdCc7XG5cbiAgYW5ndWxhci5tb2R1bGUoJ29uc2VuJykuZGlyZWN0aXZlKCdvbnNMaXN0VGl0bGUnLCBmdW5jdGlvbigkb25zZW4sIEdlbmVyaWNWaWV3KSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHJlc3RyaWN0OiAnRScsXG4gICAgICBsaW5rOiBmdW5jdGlvbihzY29wZSwgZWxlbWVudCwgYXR0cnMpIHtcbiAgICAgICAgR2VuZXJpY1ZpZXcucmVnaXN0ZXIoc2NvcGUsIGVsZW1lbnQsIGF0dHJzLCB7dmlld0tleTogJ29ucy1saXN0LXRpdGxlJ30pO1xuICAgICAgICAkb25zZW4uZmlyZUNvbXBvbmVudEV2ZW50KGVsZW1lbnRbMF0sICdpbml0Jyk7XG4gICAgICB9XG4gICAgfTtcbiAgfSk7XG5cbn0pKCk7XG4iLCIvKipcbiAqIEBlbGVtZW50IG9ucy1sb2FkaW5nLXBsYWNlaG9sZGVyXG4gKiBAY2F0ZWdvcnkgdXRpbFxuICogQGRlc2NyaXB0aW9uXG4gKiAgIFtlbl1EaXNwbGF5IGEgcGxhY2Vob2xkZXIgd2hpbGUgdGhlIGNvbnRlbnQgaXMgbG9hZGluZy5bL2VuXVxuICogICBbamFdT25zZW4gVUnjgYzoqq3jgb/ovrzjgb7jgozjgovjgb7jgafjgavooajnpLrjgZnjgovjg5fjg6zjg7zjgrnjg5vjg6vjg4Djg7zjgpLooajnj77jgZfjgb7jgZnjgIJbL2phXVxuICogQGV4YW1wbGVcbiAqIDxkaXYgb25zLWxvYWRpbmctcGxhY2Vob2xkZXI9XCJwYWdlLmh0bWxcIj5cbiAqICAgTG9hZGluZy4uLlxuICogPC9kaXY+XG4gKi9cblxuLyoqXG4gKiBAYXR0cmlidXRlIG9ucy1sb2FkaW5nLXBsYWNlaG9sZGVyXG4gKiBAaW5pdG9ubHlcbiAqIEB0eXBlIHtTdHJpbmd9XG4gKiBAZGVzY3JpcHRpb25cbiAqICAgW2VuXVRoZSB1cmwgb2YgdGhlIHBhZ2UgdG8gbG9hZC5bL2VuXVxuICogICBbamFd6Kqt44G/6L6844KA44Oa44O844K444GuVVJM44KS5oyH5a6a44GX44G+44GZ44CCWy9qYV1cbiAqL1xuXG4oZnVuY3Rpb24oKXtcbiAgJ3VzZSBzdHJpY3QnO1xuXG4gIGFuZ3VsYXIubW9kdWxlKCdvbnNlbicpLmRpcmVjdGl2ZSgnb25zTG9hZGluZ1BsYWNlaG9sZGVyJywgZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHJlc3RyaWN0OiAnQScsXG4gICAgICBsaW5rOiBmdW5jdGlvbihzY29wZSwgZWxlbWVudCwgYXR0cnMpIHtcbiAgICAgICAgaWYgKGF0dHJzLm9uc0xvYWRpbmdQbGFjZWhvbGRlcikge1xuICAgICAgICAgIG9ucy5fcmVzb2x2ZUxvYWRpbmdQbGFjZWhvbGRlcihlbGVtZW50WzBdLCBhdHRycy5vbnNMb2FkaW5nUGxhY2Vob2xkZXIsIGZ1bmN0aW9uKGNvbnRlbnRFbGVtZW50LCBkb25lKSB7XG4gICAgICAgICAgICBvbnMuY29tcGlsZShjb250ZW50RWxlbWVudCk7XG4gICAgICAgICAgICBzY29wZS4kZXZhbEFzeW5jKGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICBzZXRJbW1lZGlhdGUoZG9uZSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH07XG4gIH0pO1xufSkoKTtcbiIsIi8qKlxuICogQGVsZW1lbnQgb25zLW1vZGFsXG4gKi9cblxuLyoqXG4gKiBAYXR0cmlidXRlIHZhclxuICogQHR5cGUge1N0cmluZ31cbiAqIEBpbml0b25seVxuICogQGRlc2NyaXB0aW9uXG4gKiAgIFtlbl1WYXJpYWJsZSBuYW1lIHRvIHJlZmVyIHRoaXMgbW9kYWwuWy9lbl1cbiAqICAgW2phXeOBk+OBruODouODvOODgOODq+OCkuWPgueFp+OBmeOCi+OBn+OCgeOBruWQjeWJjeOCkuaMh+WumuOBl+OBvuOBmeOAglsvamFdXG4gKi9cblxuLyoqXG4gKiBAYXR0cmlidXRlIG9ucy1wcmVzaG93XG4gKiBAaW5pdG9ubHlcbiAqIEB0eXBlIHtFeHByZXNzaW9ufVxuICogQGRlc2NyaXB0aW9uXG4gKiAgW2VuXUFsbG93cyB5b3UgdG8gc3BlY2lmeSBjdXN0b20gYmVoYXZpb3Igd2hlbiB0aGUgXCJwcmVzaG93XCIgZXZlbnQgaXMgZmlyZWQuWy9lbl1cbiAqICBbamFdXCJwcmVzaG93XCLjgqTjg5njg7Pjg4jjgYznmbrngavjgZXjgozjgZ/mmYLjga7mjJnli5XjgpLni6zoh6rjgavmjIflrprjgafjgY3jgb7jgZnjgIJbL2phXVxuICovXG5cbi8qKlxuICogQGF0dHJpYnV0ZSBvbnMtcHJlaGlkZVxuICogQGluaXRvbmx5XG4gKiBAdHlwZSB7RXhwcmVzc2lvbn1cbiAqIEBkZXNjcmlwdGlvblxuICogIFtlbl1BbGxvd3MgeW91IHRvIHNwZWNpZnkgY3VzdG9tIGJlaGF2aW9yIHdoZW4gdGhlIFwicHJlaGlkZVwiIGV2ZW50IGlzIGZpcmVkLlsvZW5dXG4gKiAgW2phXVwicHJlaGlkZVwi44Kk44OZ44Oz44OI44GM55m654Gr44GV44KM44Gf5pmC44Gu5oyZ5YuV44KS54us6Ieq44Gr5oyH5a6a44Gn44GN44G+44GZ44CCWy9qYV1cbiAqL1xuXG4vKipcbiAqIEBhdHRyaWJ1dGUgb25zLXBvc3RzaG93XG4gKiBAaW5pdG9ubHlcbiAqIEB0eXBlIHtFeHByZXNzaW9ufVxuICogQGRlc2NyaXB0aW9uXG4gKiAgW2VuXUFsbG93cyB5b3UgdG8gc3BlY2lmeSBjdXN0b20gYmVoYXZpb3Igd2hlbiB0aGUgXCJwb3N0c2hvd1wiIGV2ZW50IGlzIGZpcmVkLlsvZW5dXG4gKiAgW2phXVwicG9zdHNob3dcIuOCpOODmeODs+ODiOOBjOeZuueBq+OBleOCjOOBn+aZguOBruaMmeWLleOCkueLrOiHquOBq+aMh+WumuOBp+OBjeOBvuOBmeOAglsvamFdXG4gKi9cblxuLyoqXG4gKiBAYXR0cmlidXRlIG9ucy1wb3N0aGlkZVxuICogQGluaXRvbmx5XG4gKiBAdHlwZSB7RXhwcmVzc2lvbn1cbiAqIEBkZXNjcmlwdGlvblxuICogIFtlbl1BbGxvd3MgeW91IHRvIHNwZWNpZnkgY3VzdG9tIGJlaGF2aW9yIHdoZW4gdGhlIFwicG9zdGhpZGVcIiBldmVudCBpcyBmaXJlZC5bL2VuXVxuICogIFtqYV1cInBvc3RoaWRlXCLjgqTjg5njg7Pjg4jjgYznmbrngavjgZXjgozjgZ/mmYLjga7mjJnli5XjgpLni6zoh6rjgavmjIflrprjgafjgY3jgb7jgZnjgIJbL2phXVxuICovXG5cbi8qKlxuICogQGF0dHJpYnV0ZSBvbnMtZGVzdHJveVxuICogQGluaXRvbmx5XG4gKiBAdHlwZSB7RXhwcmVzc2lvbn1cbiAqIEBkZXNjcmlwdGlvblxuICogIFtlbl1BbGxvd3MgeW91IHRvIHNwZWNpZnkgY3VzdG9tIGJlaGF2aW9yIHdoZW4gdGhlIFwiZGVzdHJveVwiIGV2ZW50IGlzIGZpcmVkLlsvZW5dXG4gKiAgW2phXVwiZGVzdHJveVwi44Kk44OZ44Oz44OI44GM55m654Gr44GV44KM44Gf5pmC44Gu5oyZ5YuV44KS54us6Ieq44Gr5oyH5a6a44Gn44GN44G+44GZ44CCWy9qYV1cbiAqL1xuXG4oZnVuY3Rpb24oKSB7XG4gICd1c2Ugc3RyaWN0JztcblxuICAvKipcbiAgICogTW9kYWwgZGlyZWN0aXZlLlxuICAgKi9cbiAgYW5ndWxhci5tb2R1bGUoJ29uc2VuJykuZGlyZWN0aXZlKCdvbnNNb2RhbCcsIGZ1bmN0aW9uKCRvbnNlbiwgTW9kYWxWaWV3KSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHJlc3RyaWN0OiAnRScsXG4gICAgICByZXBsYWNlOiBmYWxzZSxcblxuICAgICAgLy8gTk9URTogVGhpcyBlbGVtZW50IG11c3QgY29leGlzdHMgd2l0aCBuZy1jb250cm9sbGVyLlxuICAgICAgLy8gRG8gbm90IHVzZSBpc29sYXRlZCBzY29wZSBhbmQgdGVtcGxhdGUncyBuZy10cmFuc2NsdWRlLlxuICAgICAgc2NvcGU6IGZhbHNlLFxuICAgICAgdHJhbnNjbHVkZTogZmFsc2UsXG5cbiAgICAgIGNvbXBpbGU6IChlbGVtZW50LCBhdHRycykgPT4ge1xuXG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgcHJlOiBmdW5jdGlvbihzY29wZSwgZWxlbWVudCwgYXR0cnMpIHtcbiAgICAgICAgICAgIHZhciBtb2RhbCA9IG5ldyBNb2RhbFZpZXcoc2NvcGUsIGVsZW1lbnQsIGF0dHJzKTtcbiAgICAgICAgICAgICRvbnNlbi5hZGRNb2RpZmllck1ldGhvZHNGb3JDdXN0b21FbGVtZW50cyhtb2RhbCwgZWxlbWVudCk7XG5cbiAgICAgICAgICAgICRvbnNlbi5kZWNsYXJlVmFyQXR0cmlidXRlKGF0dHJzLCBtb2RhbCk7XG4gICAgICAgICAgICAkb25zZW4ucmVnaXN0ZXJFdmVudEhhbmRsZXJzKG1vZGFsLCAncHJlc2hvdyBwcmVoaWRlIHBvc3RzaG93IHBvc3RoaWRlIGRlc3Ryb3knKTtcbiAgICAgICAgICAgIGVsZW1lbnQuZGF0YSgnb25zLW1vZGFsJywgbW9kYWwpO1xuXG4gICAgICAgICAgICBzY29wZS4kb24oJyRkZXN0cm95JywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICRvbnNlbi5yZW1vdmVNb2RpZmllck1ldGhvZHMobW9kYWwpO1xuICAgICAgICAgICAgICBlbGVtZW50LmRhdGEoJ29ucy1tb2RhbCcsIHVuZGVmaW5lZCk7XG4gICAgICAgICAgICAgIG1vZGFsID0gZWxlbWVudCA9IHNjb3BlID0gYXR0cnMgPSBudWxsO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfSxcblxuICAgICAgICAgIHBvc3Q6IGZ1bmN0aW9uKHNjb3BlLCBlbGVtZW50KSB7XG4gICAgICAgICAgICAkb25zZW4uZmlyZUNvbXBvbmVudEV2ZW50KGVsZW1lbnRbMF0sICdpbml0Jyk7XG4gICAgICAgICAgfVxuICAgICAgICB9O1xuICAgICAgfVxuICAgIH07XG4gIH0pO1xufSkoKTtcbiIsIi8qKlxuICogQGVsZW1lbnQgb25zLW5hdmlnYXRvclxuICogQGV4YW1wbGVcbiAqIDxvbnMtbmF2aWdhdG9yIGFuaW1hdGlvbj1cInNsaWRlXCIgdmFyPVwiYXBwLm5hdmlcIj5cbiAqICAgPG9ucy1wYWdlPlxuICogICAgIDxvbnMtdG9vbGJhcj5cbiAqICAgICAgIDxkaXYgY2xhc3M9XCJjZW50ZXJcIj5UaXRsZTwvZGl2PlxuICogICAgIDwvb25zLXRvb2xiYXI+XG4gKlxuICogICAgIDxwIHN0eWxlPVwidGV4dC1hbGlnbjogY2VudGVyXCI+XG4gKiAgICAgICA8b25zLWJ1dHRvbiBtb2RpZmllcj1cImxpZ2h0XCIgbmctY2xpY2s9XCJhcHAubmF2aS5wdXNoUGFnZSgncGFnZS5odG1sJyk7XCI+UHVzaDwvb25zLWJ1dHRvbj5cbiAqICAgICA8L3A+XG4gKiAgIDwvb25zLXBhZ2U+XG4gKiA8L29ucy1uYXZpZ2F0b3I+XG4gKlxuICogPG9ucy10ZW1wbGF0ZSBpZD1cInBhZ2UuaHRtbFwiPlxuICogICA8b25zLXBhZ2U+XG4gKiAgICAgPG9ucy10b29sYmFyPlxuICogICAgICAgPGRpdiBjbGFzcz1cImNlbnRlclwiPlRpdGxlPC9kaXY+XG4gKiAgICAgPC9vbnMtdG9vbGJhcj5cbiAqXG4gKiAgICAgPHAgc3R5bGU9XCJ0ZXh0LWFsaWduOiBjZW50ZXJcIj5cbiAqICAgICAgIDxvbnMtYnV0dG9uIG1vZGlmaWVyPVwibGlnaHRcIiBuZy1jbGljaz1cImFwcC5uYXZpLnBvcFBhZ2UoKTtcIj5Qb3A8L29ucy1idXR0b24+XG4gKiAgICAgPC9wPlxuICogICA8L29ucy1wYWdlPlxuICogPC9vbnMtdGVtcGxhdGU+XG4gKi9cblxuLyoqXG4gKiBAYXR0cmlidXRlIHZhclxuICogQGluaXRvbmx5XG4gKiBAdHlwZSB7U3RyaW5nfVxuICogQGRlc2NyaXB0aW9uXG4gKiAgW2VuXVZhcmlhYmxlIG5hbWUgdG8gcmVmZXIgdGhpcyBuYXZpZ2F0b3IuWy9lbl1cbiAqICBbamFd44GT44Gu44OK44OT44Ky44O844K/44O844KS5Y+C54Wn44GZ44KL44Gf44KB44Gu5ZCN5YmN44KS5oyH5a6a44GX44G+44GZ44CCWy9qYV1cbiAqL1xuXG4vKipcbiAqIEBhdHRyaWJ1dGUgb25zLXByZXB1c2hcbiAqIEBpbml0b25seVxuICogQHR5cGUge0V4cHJlc3Npb259XG4gKiBAZGVzY3JpcHRpb25cbiAqICBbZW5dQWxsb3dzIHlvdSB0byBzcGVjaWZ5IGN1c3RvbSBiZWhhdmlvciB3aGVuIHRoZSBcInByZXB1c2hcIiBldmVudCBpcyBmaXJlZC5bL2VuXVxuICogIFtqYV1cInByZXB1c2hcIuOCpOODmeODs+ODiOOBjOeZuueBq+OBleOCjOOBn+aZguOBruaMmeWLleOCkueLrOiHquOBq+aMh+WumuOBp+OBjeOBvuOBmeOAglsvamFdXG4gKi9cblxuLyoqXG4gKiBAYXR0cmlidXRlIG9ucy1wcmVwb3BcbiAqIEBpbml0b25seVxuICogQHR5cGUge0V4cHJlc3Npb259XG4gKiBAZGVzY3JpcHRpb25cbiAqICBbZW5dQWxsb3dzIHlvdSB0byBzcGVjaWZ5IGN1c3RvbSBiZWhhdmlvciB3aGVuIHRoZSBcInByZXBvcFwiIGV2ZW50IGlzIGZpcmVkLlsvZW5dXG4gKiAgW2phXVwicHJlcG9wXCLjgqTjg5njg7Pjg4jjgYznmbrngavjgZXjgozjgZ/mmYLjga7mjJnli5XjgpLni6zoh6rjgavmjIflrprjgafjgY3jgb7jgZnjgIJbL2phXVxuICovXG5cbi8qKlxuICogQGF0dHJpYnV0ZSBvbnMtcG9zdHB1c2hcbiAqIEBpbml0b25seVxuICogQHR5cGUge0V4cHJlc3Npb259XG4gKiBAZGVzY3JpcHRpb25cbiAqICBbZW5dQWxsb3dzIHlvdSB0byBzcGVjaWZ5IGN1c3RvbSBiZWhhdmlvciB3aGVuIHRoZSBcInBvc3RwdXNoXCIgZXZlbnQgaXMgZmlyZWQuWy9lbl1cbiAqICBbamFdXCJwb3N0cHVzaFwi44Kk44OZ44Oz44OI44GM55m654Gr44GV44KM44Gf5pmC44Gu5oyZ5YuV44KS54us6Ieq44Gr5oyH5a6a44Gn44GN44G+44GZ44CCWy9qYV1cbiAqL1xuXG4vKipcbiAqIEBhdHRyaWJ1dGUgb25zLXBvc3Rwb3BcbiAqIEBpbml0b25seVxuICogQHR5cGUge0V4cHJlc3Npb259XG4gKiBAZGVzY3JpcHRpb25cbiAqICBbZW5dQWxsb3dzIHlvdSB0byBzcGVjaWZ5IGN1c3RvbSBiZWhhdmlvciB3aGVuIHRoZSBcInBvc3Rwb3BcIiBldmVudCBpcyBmaXJlZC5bL2VuXVxuICogIFtqYV1cInBvc3Rwb3BcIuOCpOODmeODs+ODiOOBjOeZuueBq+OBleOCjOOBn+aZguOBruaMmeWLleOCkueLrOiHquOBq+aMh+WumuOBp+OBjeOBvuOBmeOAglsvamFdXG4gKi9cblxuLyoqXG4gKiBAYXR0cmlidXRlIG9ucy1pbml0XG4gKiBAaW5pdG9ubHlcbiAqIEB0eXBlIHtFeHByZXNzaW9ufVxuICogQGRlc2NyaXB0aW9uXG4gKiAgW2VuXUFsbG93cyB5b3UgdG8gc3BlY2lmeSBjdXN0b20gYmVoYXZpb3Igd2hlbiBhIHBhZ2UncyBcImluaXRcIiBldmVudCBpcyBmaXJlZC5bL2VuXVxuICogIFtqYV3jg5rjg7zjgrjjga5cImluaXRcIuOCpOODmeODs+ODiOOBjOeZuueBq+OBleOCjOOBn+aZguOBruaMmeWLleOCkueLrOiHquOBq+aMh+WumuOBp+OBjeOBvuOBmeOAglsvamFdXG4gKi9cblxuLyoqXG4gKiBAYXR0cmlidXRlIG9ucy1zaG93XG4gKiBAaW5pdG9ubHlcbiAqIEB0eXBlIHtFeHByZXNzaW9ufVxuICogQGRlc2NyaXB0aW9uXG4gKiAgW2VuXUFsbG93cyB5b3UgdG8gc3BlY2lmeSBjdXN0b20gYmVoYXZpb3Igd2hlbiBhIHBhZ2UncyBcInNob3dcIiBldmVudCBpcyBmaXJlZC5bL2VuXVxuICogIFtqYV3jg5rjg7zjgrjjga5cInNob3dcIuOCpOODmeODs+ODiOOBjOeZuueBq+OBleOCjOOBn+aZguOBruaMmeWLleOCkueLrOiHquOBq+aMh+WumuOBp+OBjeOBvuOBmeOAglsvamFdXG4gKi9cblxuLyoqXG4gKiBAYXR0cmlidXRlIG9ucy1oaWRlXG4gKiBAaW5pdG9ubHlcbiAqIEB0eXBlIHtFeHByZXNzaW9ufVxuICogQGRlc2NyaXB0aW9uXG4gKiAgW2VuXUFsbG93cyB5b3UgdG8gc3BlY2lmeSBjdXN0b20gYmVoYXZpb3Igd2hlbiBhIHBhZ2UncyBcImhpZGVcIiBldmVudCBpcyBmaXJlZC5bL2VuXVxuICogIFtqYV3jg5rjg7zjgrjjga5cImhpZGVcIuOCpOODmeODs+ODiOOBjOeZuueBq+OBleOCjOOBn+aZguOBruaMmeWLleOCkueLrOiHquOBq+aMh+WumuOBp+OBjeOBvuOBmeOAglsvamFdXG4gKi9cblxuLyoqXG4gKiBAYXR0cmlidXRlIG9ucy1kZXN0cm95XG4gKiBAaW5pdG9ubHlcbiAqIEB0eXBlIHtFeHByZXNzaW9ufVxuICogQGRlc2NyaXB0aW9uXG4gKiAgW2VuXUFsbG93cyB5b3UgdG8gc3BlY2lmeSBjdXN0b20gYmVoYXZpb3Igd2hlbiBhIHBhZ2UncyBcImRlc3Ryb3lcIiBldmVudCBpcyBmaXJlZC5bL2VuXVxuICogIFtqYV3jg5rjg7zjgrjjga5cImRlc3Ryb3lcIuOCpOODmeODs+ODiOOBjOeZuueBq+OBleOCjOOBn+aZguOBruaMmeWLleOCkueLrOiHquOBq+aMh+WumuOBp+OBjeOBvuOBmeOAglsvamFdXG4gKi9cblxuLyoqXG4gKiBAbWV0aG9kIG9uXG4gKiBAc2lnbmF0dXJlIG9uKGV2ZW50TmFtZSwgbGlzdGVuZXIpXG4gKiBAZGVzY3JpcHRpb25cbiAqICAgW2VuXUFkZCBhbiBldmVudCBsaXN0ZW5lci5bL2VuXVxuICogICBbamFd44Kk44OZ44Oz44OI44Oq44K544OK44O844KS6L+95Yqg44GX44G+44GZ44CCWy9qYV1cbiAqIEBwYXJhbSB7U3RyaW5nfSBldmVudE5hbWVcbiAqICAgW2VuXU5hbWUgb2YgdGhlIGV2ZW50LlsvZW5dXG4gKiAgIFtqYV3jgqTjg5njg7Pjg4jlkI3jgpLmjIflrprjgZfjgb7jgZnjgIJbL2phXVxuICogQHBhcmFtIHtGdW5jdGlvbn0gbGlzdGVuZXJcbiAqICAgW2VuXUZ1bmN0aW9uIHRvIGV4ZWN1dGUgd2hlbiB0aGUgZXZlbnQgaXMgdHJpZ2dlcmVkLlsvZW5dXG4gKiAgIFtqYV3jgZPjga7jgqTjg5njg7Pjg4jjgYznmbrngavjgZXjgozjgZ/pmpvjgavlkbzjgbPlh7rjgZXjgozjgovplqLmlbDjgqrjg5bjgrjjgqfjgq/jg4jjgpLmjIflrprjgZfjgb7jgZnjgIJbL2phXVxuICovXG5cbi8qKlxuICogQG1ldGhvZCBvbmNlXG4gKiBAc2lnbmF0dXJlIG9uY2UoZXZlbnROYW1lLCBsaXN0ZW5lcilcbiAqIEBkZXNjcmlwdGlvblxuICogIFtlbl1BZGQgYW4gZXZlbnQgbGlzdGVuZXIgdGhhdCdzIG9ubHkgdHJpZ2dlcmVkIG9uY2UuWy9lbl1cbiAqICBbamFd5LiA5bqm44Gg44GR5ZG844Gz5Ye644GV44KM44KL44Kk44OZ44Oz44OI44Oq44K544OK44O844KS6L+95Yqg44GX44G+44GZ44CCWy9qYV1cbiAqIEBwYXJhbSB7U3RyaW5nfSBldmVudE5hbWVcbiAqICAgW2VuXU5hbWUgb2YgdGhlIGV2ZW50LlsvZW5dXG4gKiAgIFtqYV3jgqTjg5njg7Pjg4jlkI3jgpLmjIflrprjgZfjgb7jgZnjgIJbL2phXVxuICogQHBhcmFtIHtGdW5jdGlvbn0gbGlzdGVuZXJcbiAqICAgW2VuXUZ1bmN0aW9uIHRvIGV4ZWN1dGUgd2hlbiB0aGUgZXZlbnQgaXMgdHJpZ2dlcmVkLlsvZW5dXG4gKiAgIFtqYV3jgqTjg5njg7Pjg4jjgYznmbrngavjgZfjgZ/pmpvjgavlkbzjgbPlh7rjgZXjgozjgovplqLmlbDjgqrjg5bjgrjjgqfjgq/jg4jjgpLmjIflrprjgZfjgb7jgZnjgIJbL2phXVxuICovXG5cbi8qKlxuICogQG1ldGhvZCBvZmZcbiAqIEBzaWduYXR1cmUgb2ZmKGV2ZW50TmFtZSwgW2xpc3RlbmVyXSlcbiAqIEBkZXNjcmlwdGlvblxuICogIFtlbl1SZW1vdmUgYW4gZXZlbnQgbGlzdGVuZXIuIElmIHRoZSBsaXN0ZW5lciBpcyBub3Qgc3BlY2lmaWVkIGFsbCBsaXN0ZW5lcnMgZm9yIHRoZSBldmVudCB0eXBlIHdpbGwgYmUgcmVtb3ZlZC5bL2VuXVxuICogIFtqYV3jgqTjg5njg7Pjg4jjg6rjgrnjg4rjg7zjgpLliYrpmaTjgZfjgb7jgZnjgILjgoLjgZfjgqTjg5njg7Pjg4jjg6rjgrnjg4rjg7zjgpLmjIflrprjgZfjgarjgYvjgaPjgZ/loLTlkIjjgavjga/jgIHjgZ3jga7jgqTjg5njg7Pjg4jjgavntJDjgaXjgY/lhajjgabjga7jgqTjg5njg7Pjg4jjg6rjgrnjg4rjg7zjgYzliYrpmaTjgZXjgozjgb7jgZnjgIJbL2phXVxuICogQHBhcmFtIHtTdHJpbmd9IGV2ZW50TmFtZVxuICogICBbZW5dTmFtZSBvZiB0aGUgZXZlbnQuWy9lbl1cbiAqICAgW2phXeOCpOODmeODs+ODiOWQjeOCkuaMh+WumuOBl+OBvuOBmeOAglsvamFdXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBsaXN0ZW5lclxuICogICBbZW5dRnVuY3Rpb24gdG8gZXhlY3V0ZSB3aGVuIHRoZSBldmVudCBpcyB0cmlnZ2VyZWQuWy9lbl1cbiAqICAgW2phXeWJiumZpOOBmeOCi+OCpOODmeODs+ODiOODquOCueODiuODvOOCkuaMh+WumuOBl+OBvuOBmeOAglsvamFdXG4gKi9cblxuKGZ1bmN0aW9uKCkge1xuICAndXNlIHN0cmljdCc7XG5cbiAgdmFyIGxhc3RSZWFkeSA9IHdpbmRvdy5vbnMuZWxlbWVudHMuTmF2aWdhdG9yLnJld3JpdGFibGVzLnJlYWR5O1xuICB3aW5kb3cub25zLmVsZW1lbnRzLk5hdmlnYXRvci5yZXdyaXRhYmxlcy5yZWFkeSA9IG9ucy5fd2FpdERpcmV0aXZlSW5pdCgnb25zLW5hdmlnYXRvcicsIGxhc3RSZWFkeSk7XG5cbiAgYW5ndWxhci5tb2R1bGUoJ29uc2VuJykuZGlyZWN0aXZlKCdvbnNOYXZpZ2F0b3InLCBmdW5jdGlvbihOYXZpZ2F0b3JWaWV3LCAkb25zZW4pIHtcbiAgICByZXR1cm4ge1xuICAgICAgcmVzdHJpY3Q6ICdFJyxcblxuICAgICAgLy8gTk9URTogVGhpcyBlbGVtZW50IG11c3QgY29leGlzdHMgd2l0aCBuZy1jb250cm9sbGVyLlxuICAgICAgLy8gRG8gbm90IHVzZSBpc29sYXRlZCBzY29wZSBhbmQgdGVtcGxhdGUncyBuZy10cmFuc2NsdWRlLlxuICAgICAgdHJhbnNjbHVkZTogZmFsc2UsXG4gICAgICBzY29wZTogdHJ1ZSxcblxuICAgICAgY29tcGlsZTogZnVuY3Rpb24oZWxlbWVudCkge1xuXG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgcHJlOiBmdW5jdGlvbihzY29wZSwgZWxlbWVudCwgYXR0cnMsIGNvbnRyb2xsZXIpIHtcbiAgICAgICAgICAgIHZhciB2aWV3ID0gbmV3IE5hdmlnYXRvclZpZXcoc2NvcGUsIGVsZW1lbnQsIGF0dHJzKTtcblxuICAgICAgICAgICAgJG9uc2VuLmRlY2xhcmVWYXJBdHRyaWJ1dGUoYXR0cnMsIHZpZXcpO1xuICAgICAgICAgICAgJG9uc2VuLnJlZ2lzdGVyRXZlbnRIYW5kbGVycyh2aWV3LCAncHJlcHVzaCBwcmVwb3AgcG9zdHB1c2ggcG9zdHBvcCBpbml0IHNob3cgaGlkZSBkZXN0cm95Jyk7XG5cbiAgICAgICAgICAgIGVsZW1lbnQuZGF0YSgnb25zLW5hdmlnYXRvcicsIHZpZXcpO1xuXG4gICAgICAgICAgICBlbGVtZW50WzBdLnBhZ2VMb2FkZXIgPSAkb25zZW4uY3JlYXRlUGFnZUxvYWRlcih2aWV3KTtcblxuICAgICAgICAgICAgc2NvcGUuJG9uKCckZGVzdHJveScsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICB2aWV3Ll9ldmVudHMgPSB1bmRlZmluZWQ7XG4gICAgICAgICAgICAgIGVsZW1lbnQuZGF0YSgnb25zLW5hdmlnYXRvcicsIHVuZGVmaW5lZCk7XG4gICAgICAgICAgICAgIHNjb3BlID0gZWxlbWVudCA9IG51bGw7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgIH0sXG4gICAgICAgICAgcG9zdDogZnVuY3Rpb24oc2NvcGUsIGVsZW1lbnQsIGF0dHJzKSB7XG4gICAgICAgICAgICAkb25zZW4uZmlyZUNvbXBvbmVudEV2ZW50KGVsZW1lbnRbMF0sICdpbml0Jyk7XG4gICAgICAgICAgfVxuICAgICAgICB9O1xuICAgICAgfVxuICAgIH07XG4gIH0pO1xufSkoKTtcbiIsIi8qKlxuICogQGVsZW1lbnQgb25zLXBhZ2VcbiAqL1xuXG4vKipcbiAqIEBhdHRyaWJ1dGUgdmFyXG4gKiBAaW5pdG9ubHlcbiAqIEB0eXBlIHtTdHJpbmd9XG4gKiBAZGVzY3JpcHRpb25cbiAqICAgW2VuXVZhcmlhYmxlIG5hbWUgdG8gcmVmZXIgdGhpcyBwYWdlLlsvZW5dXG4gKiAgIFtqYV3jgZPjga7jg5rjg7zjgrjjgpLlj4LnhafjgZnjgovjgZ/jgoHjga7lkI3liY3jgpLmjIflrprjgZfjgb7jgZnjgIJbL2phXVxuICovXG5cbi8qKlxuICogQGF0dHJpYnV0ZSBuZy1pbmZpbml0ZS1zY3JvbGxcbiAqIEBpbml0b25seVxuICogQHR5cGUge1N0cmluZ31cbiAqIEBkZXNjcmlwdGlvblxuICogICBbZW5dUGF0aCBvZiB0aGUgZnVuY3Rpb24gdG8gYmUgZXhlY3V0ZWQgb24gaW5maW5pdGUgc2Nyb2xsaW5nLiBUaGUgcGF0aCBpcyByZWxhdGl2ZSB0byAkc2NvcGUuIFRoZSBmdW5jdGlvbiByZWNlaXZlcyBhIGRvbmUgY2FsbGJhY2sgdGhhdCBtdXN0IGJlIGNhbGxlZCB3aGVuIGl0J3MgZmluaXNoZWQuWy9lbl1cbiAqICAgW2phXVsvamFdXG4gKi9cblxuLyoqXG4gKiBAYXR0cmlidXRlIG9uLWRldmljZS1iYWNrLWJ1dHRvblxuICogQHR5cGUge0V4cHJlc3Npb259XG4gKiBAZGVzY3JpcHRpb25cbiAqICAgW2VuXUFsbG93cyB5b3UgdG8gc3BlY2lmeSBjdXN0b20gYmVoYXZpb3Igd2hlbiB0aGUgYmFjayBidXR0b24gaXMgcHJlc3NlZC5bL2VuXVxuICogICBbamFd44OH44OQ44Kk44K544Gu44OQ44OD44Kv44Oc44K/44Oz44GM5oq844GV44KM44Gf5pmC44Gu5oyZ5YuV44KS6Kit5a6a44Gn44GN44G+44GZ44CCWy9qYV1cbiAqL1xuXG4vKipcbiAqIEBhdHRyaWJ1dGUgbmctZGV2aWNlLWJhY2stYnV0dG9uXG4gKiBAaW5pdG9ubHlcbiAqIEB0eXBlIHtFeHByZXNzaW9ufVxuICogQGRlc2NyaXB0aW9uXG4gKiAgIFtlbl1BbGxvd3MgeW91IHRvIHNwZWNpZnkgY3VzdG9tIGJlaGF2aW9yIHdpdGggYW4gQW5ndWxhckpTIGV4cHJlc3Npb24gd2hlbiB0aGUgYmFjayBidXR0b24gaXMgcHJlc3NlZC5bL2VuXVxuICogICBbamFd44OH44OQ44Kk44K544Gu44OQ44OD44Kv44Oc44K/44Oz44GM5oq844GV44KM44Gf5pmC44Gu5oyZ5YuV44KS6Kit5a6a44Gn44GN44G+44GZ44CCQW5ndWxhckpT44GuZXhwcmVzc2lvbuOCkuaMh+WumuOBp+OBjeOBvuOBmeOAglsvamFdXG4gKi9cblxuLyoqXG4gKiBAYXR0cmlidXRlIG9ucy1pbml0XG4gKiBAaW5pdG9ubHlcbiAqIEB0eXBlIHtFeHByZXNzaW9ufVxuICogQGRlc2NyaXB0aW9uXG4gKiAgW2VuXUFsbG93cyB5b3UgdG8gc3BlY2lmeSBjdXN0b20gYmVoYXZpb3Igd2hlbiB0aGUgXCJpbml0XCIgZXZlbnQgaXMgZmlyZWQuWy9lbl1cbiAqICBbamFdXCJpbml0XCLjgqTjg5njg7Pjg4jjgYznmbrngavjgZXjgozjgZ/mmYLjga7mjJnli5XjgpLni6zoh6rjgavmjIflrprjgafjgY3jgb7jgZnjgIJbL2phXVxuICovXG5cbi8qKlxuICogQGF0dHJpYnV0ZSBvbnMtc2hvd1xuICogQGluaXRvbmx5XG4gKiBAdHlwZSB7RXhwcmVzc2lvbn1cbiAqIEBkZXNjcmlwdGlvblxuICogIFtlbl1BbGxvd3MgeW91IHRvIHNwZWNpZnkgY3VzdG9tIGJlaGF2aW9yIHdoZW4gdGhlIFwic2hvd1wiIGV2ZW50IGlzIGZpcmVkLlsvZW5dXG4gKiAgW2phXVwic2hvd1wi44Kk44OZ44Oz44OI44GM55m654Gr44GV44KM44Gf5pmC44Gu5oyZ5YuV44KS54us6Ieq44Gr5oyH5a6a44Gn44GN44G+44GZ44CCWy9qYV1cbiAqL1xuXG4vKipcbiAqIEBhdHRyaWJ1dGUgb25zLWhpZGVcbiAqIEBpbml0b25seVxuICogQHR5cGUge0V4cHJlc3Npb259XG4gKiBAZGVzY3JpcHRpb25cbiAqICBbZW5dQWxsb3dzIHlvdSB0byBzcGVjaWZ5IGN1c3RvbSBiZWhhdmlvciB3aGVuIHRoZSBcImhpZGVcIiBldmVudCBpcyBmaXJlZC5bL2VuXVxuICogIFtqYV1cImhpZGVcIuOCpOODmeODs+ODiOOBjOeZuueBq+OBleOCjOOBn+aZguOBruaMmeWLleOCkueLrOiHquOBq+aMh+WumuOBp+OBjeOBvuOBmeOAglsvamFdXG4gKi9cblxuLyoqXG4gKiBAYXR0cmlidXRlIG9ucy1kZXN0cm95XG4gKiBAaW5pdG9ubHlcbiAqIEB0eXBlIHtFeHByZXNzaW9ufVxuICogQGRlc2NyaXB0aW9uXG4gKiAgW2VuXUFsbG93cyB5b3UgdG8gc3BlY2lmeSBjdXN0b20gYmVoYXZpb3Igd2hlbiB0aGUgXCJkZXN0cm95XCIgZXZlbnQgaXMgZmlyZWQuWy9lbl1cbiAqICBbamFdXCJkZXN0cm95XCLjgqTjg5njg7Pjg4jjgYznmbrngavjgZXjgozjgZ/mmYLjga7mjJnli5XjgpLni6zoh6rjgavmjIflrprjgafjgY3jgb7jgZnjgIJbL2phXVxuICovXG5cbihmdW5jdGlvbigpIHtcbiAgJ3VzZSBzdHJpY3QnO1xuXG4gIHZhciBtb2R1bGUgPSBhbmd1bGFyLm1vZHVsZSgnb25zZW4nKTtcblxuICBtb2R1bGUuZGlyZWN0aXZlKCdvbnNQYWdlJywgZnVuY3Rpb24oJG9uc2VuLCBQYWdlVmlldykge1xuXG4gICAgZnVuY3Rpb24gZmlyZVBhZ2VJbml0RXZlbnQoZWxlbWVudCkge1xuICAgICAgLy8gVE9ETzogcmVtb3ZlIGRpcnR5IGZpeFxuICAgICAgdmFyIGkgPSAwLCBmID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIGlmIChpKysgPCAxNSkgIHtcbiAgICAgICAgICBpZiAoaXNBdHRhY2hlZChlbGVtZW50KSkge1xuICAgICAgICAgICAgJG9uc2VuLmZpcmVDb21wb25lbnRFdmVudChlbGVtZW50LCAnaW5pdCcpO1xuICAgICAgICAgICAgZmlyZUFjdHVhbFBhZ2VJbml0RXZlbnQoZWxlbWVudCk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGlmIChpID4gMTApIHtcbiAgICAgICAgICAgICAgc2V0VGltZW91dChmLCAxMDAwIC8gNjApO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgc2V0SW1tZWRpYXRlKGYpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0ZhaWwgdG8gZmlyZSBcInBhZ2Vpbml0XCIgZXZlbnQuIEF0dGFjaCBcIm9ucy1wYWdlXCIgZWxlbWVudCB0byB0aGUgZG9jdW1lbnQgYWZ0ZXIgaW5pdGlhbGl6YXRpb24uJyk7XG4gICAgICAgIH1cbiAgICAgIH07XG5cbiAgICAgIGYoKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBmaXJlQWN0dWFsUGFnZUluaXRFdmVudChlbGVtZW50KSB7XG4gICAgICB2YXIgZXZlbnQgPSBkb2N1bWVudC5jcmVhdGVFdmVudCgnSFRNTEV2ZW50cycpO1xuICAgICAgZXZlbnQuaW5pdEV2ZW50KCdwYWdlaW5pdCcsIHRydWUsIHRydWUpO1xuICAgICAgZWxlbWVudC5kaXNwYXRjaEV2ZW50KGV2ZW50KTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBpc0F0dGFjaGVkKGVsZW1lbnQpIHtcbiAgICAgIGlmIChkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQgPT09IGVsZW1lbnQpIHtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICB9XG4gICAgICByZXR1cm4gZWxlbWVudC5wYXJlbnROb2RlID8gaXNBdHRhY2hlZChlbGVtZW50LnBhcmVudE5vZGUpIDogZmFsc2U7XG4gICAgfVxuXG4gICAgcmV0dXJuIHtcbiAgICAgIHJlc3RyaWN0OiAnRScsXG5cbiAgICAgIC8vIE5PVEU6IFRoaXMgZWxlbWVudCBtdXN0IGNvZXhpc3RzIHdpdGggbmctY29udHJvbGxlci5cbiAgICAgIC8vIERvIG5vdCB1c2UgaXNvbGF0ZWQgc2NvcGUgYW5kIHRlbXBsYXRlJ3MgbmctdHJhbnNjbHVkZS5cbiAgICAgIHRyYW5zY2x1ZGU6IGZhbHNlLFxuICAgICAgc2NvcGU6IHRydWUsXG5cbiAgICAgIGNvbXBpbGU6IGZ1bmN0aW9uKGVsZW1lbnQsIGF0dHJzKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgcHJlOiBmdW5jdGlvbihzY29wZSwgZWxlbWVudCwgYXR0cnMpIHtcbiAgICAgICAgICAgIHZhciBwYWdlID0gbmV3IFBhZ2VWaWV3KHNjb3BlLCBlbGVtZW50LCBhdHRycyk7XG5cbiAgICAgICAgICAgICRvbnNlbi5kZWNsYXJlVmFyQXR0cmlidXRlKGF0dHJzLCBwYWdlKTtcbiAgICAgICAgICAgICRvbnNlbi5yZWdpc3RlckV2ZW50SGFuZGxlcnMocGFnZSwgJ2luaXQgc2hvdyBoaWRlIGRlc3Ryb3knKTtcblxuICAgICAgICAgICAgZWxlbWVudC5kYXRhKCdvbnMtcGFnZScsIHBhZ2UpO1xuICAgICAgICAgICAgJG9uc2VuLmFkZE1vZGlmaWVyTWV0aG9kc0ZvckN1c3RvbUVsZW1lbnRzKHBhZ2UsIGVsZW1lbnQpO1xuXG4gICAgICAgICAgICBlbGVtZW50LmRhdGEoJ19zY29wZScsIHNjb3BlKTtcblxuICAgICAgICAgICAgJG9uc2VuLmNsZWFuZXIub25EZXN0cm95KHNjb3BlLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgcGFnZS5fZXZlbnRzID0gdW5kZWZpbmVkO1xuICAgICAgICAgICAgICAkb25zZW4ucmVtb3ZlTW9kaWZpZXJNZXRob2RzKHBhZ2UpO1xuICAgICAgICAgICAgICBlbGVtZW50LmRhdGEoJ29ucy1wYWdlJywgdW5kZWZpbmVkKTtcbiAgICAgICAgICAgICAgZWxlbWVudC5kYXRhKCdfc2NvcGUnLCB1bmRlZmluZWQpO1xuXG4gICAgICAgICAgICAgICRvbnNlbi5jbGVhckNvbXBvbmVudCh7XG4gICAgICAgICAgICAgICAgZWxlbWVudDogZWxlbWVudCxcbiAgICAgICAgICAgICAgICBzY29wZTogc2NvcGUsXG4gICAgICAgICAgICAgICAgYXR0cnM6IGF0dHJzXG4gICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICBzY29wZSA9IGVsZW1lbnQgPSBhdHRycyA9IG51bGw7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9LFxuXG4gICAgICAgICAgcG9zdDogZnVuY3Rpb24gcG9zdExpbmsoc2NvcGUsIGVsZW1lbnQsIGF0dHJzKSB7XG4gICAgICAgICAgICBmaXJlUGFnZUluaXRFdmVudChlbGVtZW50WzBdKTtcbiAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgICB9XG4gICAgfTtcbiAgfSk7XG59KSgpO1xuIiwiLyoqXG4gKiBAZWxlbWVudCBvbnMtcG9wb3ZlclxuICovXG5cbi8qKlxuICogQGF0dHJpYnV0ZSB2YXJcbiAqIEBpbml0b25seVxuICogQHR5cGUge1N0cmluZ31cbiAqIEBkZXNjcmlwdGlvblxuICogIFtlbl1WYXJpYWJsZSBuYW1lIHRvIHJlZmVyIHRoaXMgcG9wb3Zlci5bL2VuXVxuICogIFtqYV3jgZPjga7jg53jg4Pjg5fjgqrjg7zjg5Djg7zjgpLlj4LnhafjgZnjgovjgZ/jgoHjga7lkI3liY3jgpLmjIflrprjgZfjgb7jgZnjgIJbL2phXVxuICovXG5cbi8qKlxuICogQGF0dHJpYnV0ZSBvbnMtcHJlc2hvd1xuICogQGluaXRvbmx5XG4gKiBAdHlwZSB7RXhwcmVzc2lvbn1cbiAqIEBkZXNjcmlwdGlvblxuICogIFtlbl1BbGxvd3MgeW91IHRvIHNwZWNpZnkgY3VzdG9tIGJlaGF2aW9yIHdoZW4gdGhlIFwicHJlc2hvd1wiIGV2ZW50IGlzIGZpcmVkLlsvZW5dXG4gKiAgW2phXVwicHJlc2hvd1wi44Kk44OZ44Oz44OI44GM55m654Gr44GV44KM44Gf5pmC44Gu5oyZ5YuV44KS54us6Ieq44Gr5oyH5a6a44Gn44GN44G+44GZ44CCWy9qYV1cbiAqL1xuXG4vKipcbiAqIEBhdHRyaWJ1dGUgb25zLXByZWhpZGVcbiAqIEBpbml0b25seVxuICogQHR5cGUge0V4cHJlc3Npb259XG4gKiBAZGVzY3JpcHRpb25cbiAqICBbZW5dQWxsb3dzIHlvdSB0byBzcGVjaWZ5IGN1c3RvbSBiZWhhdmlvciB3aGVuIHRoZSBcInByZWhpZGVcIiBldmVudCBpcyBmaXJlZC5bL2VuXVxuICogIFtqYV1cInByZWhpZGVcIuOCpOODmeODs+ODiOOBjOeZuueBq+OBleOCjOOBn+aZguOBruaMmeWLleOCkueLrOiHquOBq+aMh+WumuOBp+OBjeOBvuOBmeOAglsvamFdXG4gKi9cblxuLyoqXG4gKiBAYXR0cmlidXRlIG9ucy1wb3N0c2hvd1xuICogQGluaXRvbmx5XG4gKiBAdHlwZSB7RXhwcmVzc2lvbn1cbiAqIEBkZXNjcmlwdGlvblxuICogIFtlbl1BbGxvd3MgeW91IHRvIHNwZWNpZnkgY3VzdG9tIGJlaGF2aW9yIHdoZW4gdGhlIFwicG9zdHNob3dcIiBldmVudCBpcyBmaXJlZC5bL2VuXVxuICogIFtqYV1cInBvc3RzaG93XCLjgqTjg5njg7Pjg4jjgYznmbrngavjgZXjgozjgZ/mmYLjga7mjJnli5XjgpLni6zoh6rjgavmjIflrprjgafjgY3jgb7jgZnjgIJbL2phXVxuICovXG5cbi8qKlxuICogQGF0dHJpYnV0ZSBvbnMtcG9zdGhpZGVcbiAqIEBpbml0b25seVxuICogQHR5cGUge0V4cHJlc3Npb259XG4gKiBAZGVzY3JpcHRpb25cbiAqICBbZW5dQWxsb3dzIHlvdSB0byBzcGVjaWZ5IGN1c3RvbSBiZWhhdmlvciB3aGVuIHRoZSBcInBvc3RoaWRlXCIgZXZlbnQgaXMgZmlyZWQuWy9lbl1cbiAqICBbamFdXCJwb3N0aGlkZVwi44Kk44OZ44Oz44OI44GM55m654Gr44GV44KM44Gf5pmC44Gu5oyZ5YuV44KS54us6Ieq44Gr5oyH5a6a44Gn44GN44G+44GZ44CCWy9qYV1cbiAqL1xuXG4vKipcbiAqIEBhdHRyaWJ1dGUgb25zLWRlc3Ryb3lcbiAqIEBpbml0b25seVxuICogQHR5cGUge0V4cHJlc3Npb259XG4gKiBAZGVzY3JpcHRpb25cbiAqICBbZW5dQWxsb3dzIHlvdSB0byBzcGVjaWZ5IGN1c3RvbSBiZWhhdmlvciB3aGVuIHRoZSBcImRlc3Ryb3lcIiBldmVudCBpcyBmaXJlZC5bL2VuXVxuICogIFtqYV1cImRlc3Ryb3lcIuOCpOODmeODs+ODiOOBjOeZuueBq+OBleOCjOOBn+aZguOBruaMmeWLleOCkueLrOiHquOBq+aMh+WumuOBp+OBjeOBvuOBmeOAglsvamFdXG4gKi9cblxuLyoqXG4gKiBAbWV0aG9kIG9uXG4gKiBAc2lnbmF0dXJlIG9uKGV2ZW50TmFtZSwgbGlzdGVuZXIpXG4gKiBAZGVzY3JpcHRpb25cbiAqICAgW2VuXUFkZCBhbiBldmVudCBsaXN0ZW5lci5bL2VuXVxuICogICBbamFd44Kk44OZ44Oz44OI44Oq44K544OK44O844KS6L+95Yqg44GX44G+44GZ44CCWy9qYV1cbiAqIEBwYXJhbSB7U3RyaW5nfSBldmVudE5hbWVcbiAqICAgW2VuXU5hbWUgb2YgdGhlIGV2ZW50LlsvZW5dXG4gKiAgIFtqYV3jgqTjg5njg7Pjg4jlkI3jgpLmjIflrprjgZfjgb7jgZnjgIJbL2phXVxuICogQHBhcmFtIHtGdW5jdGlvbn0gbGlzdGVuZXJcbiAqICAgW2VuXUZ1bmN0aW9uIHRvIGV4ZWN1dGUgd2hlbiB0aGUgZXZlbnQgaXMgdHJpZ2dlcmVkLlsvZW5dXG4gKiAgIFtqYV3jgZPjga7jgqTjg5njg7Pjg4jjgYznmbrngavjgZXjgozjgZ/pmpvjgavlkbzjgbPlh7rjgZXjgozjgovplqLmlbDjgqrjg5bjgrjjgqfjgq/jg4jjgpLmjIflrprjgZfjgb7jgZnjgIJbL2phXVxuICovXG5cbi8qKlxuICogQG1ldGhvZCBvbmNlXG4gKiBAc2lnbmF0dXJlIG9uY2UoZXZlbnROYW1lLCBsaXN0ZW5lcilcbiAqIEBkZXNjcmlwdGlvblxuICogIFtlbl1BZGQgYW4gZXZlbnQgbGlzdGVuZXIgdGhhdCdzIG9ubHkgdHJpZ2dlcmVkIG9uY2UuWy9lbl1cbiAqICBbamFd5LiA5bqm44Gg44GR5ZG844Gz5Ye644GV44KM44KL44Kk44OZ44Oz44OI44Oq44K544OK44O844KS6L+95Yqg44GX44G+44GZ44CCWy9qYV1cbiAqIEBwYXJhbSB7U3RyaW5nfSBldmVudE5hbWVcbiAqICAgW2VuXU5hbWUgb2YgdGhlIGV2ZW50LlsvZW5dXG4gKiAgIFtqYV3jgqTjg5njg7Pjg4jlkI3jgpLmjIflrprjgZfjgb7jgZnjgIJbL2phXVxuICogQHBhcmFtIHtGdW5jdGlvbn0gbGlzdGVuZXJcbiAqICAgW2VuXUZ1bmN0aW9uIHRvIGV4ZWN1dGUgd2hlbiB0aGUgZXZlbnQgaXMgdHJpZ2dlcmVkLlsvZW5dXG4gKiAgIFtqYV3jgqTjg5njg7Pjg4jjgYznmbrngavjgZfjgZ/pmpvjgavlkbzjgbPlh7rjgZXjgozjgovplqLmlbDjgqrjg5bjgrjjgqfjgq/jg4jjgpLmjIflrprjgZfjgb7jgZnjgIJbL2phXVxuICovXG5cbi8qKlxuICogQG1ldGhvZCBvZmZcbiAqIEBzaWduYXR1cmUgb2ZmKGV2ZW50TmFtZSwgW2xpc3RlbmVyXSlcbiAqIEBkZXNjcmlwdGlvblxuICogIFtlbl1SZW1vdmUgYW4gZXZlbnQgbGlzdGVuZXIuIElmIHRoZSBsaXN0ZW5lciBpcyBub3Qgc3BlY2lmaWVkIGFsbCBsaXN0ZW5lcnMgZm9yIHRoZSBldmVudCB0eXBlIHdpbGwgYmUgcmVtb3ZlZC5bL2VuXVxuICogIFtqYV3jgqTjg5njg7Pjg4jjg6rjgrnjg4rjg7zjgpLliYrpmaTjgZfjgb7jgZnjgILjgoLjgZfjgqTjg5njg7Pjg4jjg6rjgrnjg4rjg7zjgpLmjIflrprjgZfjgarjgYvjgaPjgZ/loLTlkIjjgavjga/jgIHjgZ3jga7jgqTjg5njg7Pjg4jjgavntJDjgaXjgY/lhajjgabjga7jgqTjg5njg7Pjg4jjg6rjgrnjg4rjg7zjgYzliYrpmaTjgZXjgozjgb7jgZnjgIJbL2phXVxuICogQHBhcmFtIHtTdHJpbmd9IGV2ZW50TmFtZVxuICogICBbZW5dTmFtZSBvZiB0aGUgZXZlbnQuWy9lbl1cbiAqICAgW2phXeOCpOODmeODs+ODiOWQjeOCkuaMh+WumuOBl+OBvuOBmeOAglsvamFdXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBsaXN0ZW5lclxuICogICBbZW5dRnVuY3Rpb24gdG8gZXhlY3V0ZSB3aGVuIHRoZSBldmVudCBpcyB0cmlnZ2VyZWQuWy9lbl1cbiAqICAgW2phXeWJiumZpOOBmeOCi+OCpOODmeODs+ODiOODquOCueODiuODvOOCkuaMh+WumuOBl+OBvuOBmeOAglsvamFdXG4gKi9cblxuKGZ1bmN0aW9uKCl7XG4gICd1c2Ugc3RyaWN0JztcblxuICB2YXIgbW9kdWxlID0gYW5ndWxhci5tb2R1bGUoJ29uc2VuJyk7XG5cbiAgbW9kdWxlLmRpcmVjdGl2ZSgnb25zUG9wb3ZlcicsIGZ1bmN0aW9uKCRvbnNlbiwgUG9wb3ZlclZpZXcpIHtcbiAgICByZXR1cm4ge1xuICAgICAgcmVzdHJpY3Q6ICdFJyxcbiAgICAgIHJlcGxhY2U6IGZhbHNlLFxuICAgICAgc2NvcGU6IHRydWUsXG4gICAgICBjb21waWxlOiBmdW5jdGlvbihlbGVtZW50LCBhdHRycykge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgIHByZTogZnVuY3Rpb24oc2NvcGUsIGVsZW1lbnQsIGF0dHJzKSB7XG5cbiAgICAgICAgICAgIHZhciBwb3BvdmVyID0gbmV3IFBvcG92ZXJWaWV3KHNjb3BlLCBlbGVtZW50LCBhdHRycyk7XG5cbiAgICAgICAgICAgICRvbnNlbi5kZWNsYXJlVmFyQXR0cmlidXRlKGF0dHJzLCBwb3BvdmVyKTtcbiAgICAgICAgICAgICRvbnNlbi5yZWdpc3RlckV2ZW50SGFuZGxlcnMocG9wb3ZlciwgJ3ByZXNob3cgcHJlaGlkZSBwb3N0c2hvdyBwb3N0aGlkZSBkZXN0cm95Jyk7XG4gICAgICAgICAgICAkb25zZW4uYWRkTW9kaWZpZXJNZXRob2RzRm9yQ3VzdG9tRWxlbWVudHMocG9wb3ZlciwgZWxlbWVudCk7XG5cbiAgICAgICAgICAgIGVsZW1lbnQuZGF0YSgnb25zLXBvcG92ZXInLCBwb3BvdmVyKTtcblxuICAgICAgICAgICAgc2NvcGUuJG9uKCckZGVzdHJveScsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICBwb3BvdmVyLl9ldmVudHMgPSB1bmRlZmluZWQ7XG4gICAgICAgICAgICAgICRvbnNlbi5yZW1vdmVNb2RpZmllck1ldGhvZHMocG9wb3Zlcik7XG4gICAgICAgICAgICAgIGVsZW1lbnQuZGF0YSgnb25zLXBvcG92ZXInLCB1bmRlZmluZWQpO1xuICAgICAgICAgICAgICBlbGVtZW50ID0gbnVsbDtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH0sXG5cbiAgICAgICAgICBwb3N0OiBmdW5jdGlvbihzY29wZSwgZWxlbWVudCkge1xuICAgICAgICAgICAgJG9uc2VuLmZpcmVDb21wb25lbnRFdmVudChlbGVtZW50WzBdLCAnaW5pdCcpO1xuICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICAgIH1cbiAgICB9O1xuICB9KTtcbn0pKCk7XG5cbiIsIi8qKlxuICogQGVsZW1lbnQgb25zLXB1bGwtaG9va1xuICogQGV4YW1wbGVcbiAqIDxzY3JpcHQ+XG4gKiAgIG9ucy5ib290c3RyYXAoKVxuICpcbiAqICAgLmNvbnRyb2xsZXIoJ015Q29udHJvbGxlcicsIGZ1bmN0aW9uKCRzY29wZSwgJHRpbWVvdXQpIHtcbiAqICAgICAkc2NvcGUuaXRlbXMgPSBbMywgMiAsMV07XG4gKlxuICogICAgICRzY29wZS5sb2FkID0gZnVuY3Rpb24oJGRvbmUpIHtcbiAqICAgICAgICR0aW1lb3V0KGZ1bmN0aW9uKCkge1xuICogICAgICAgICAkc2NvcGUuaXRlbXMudW5zaGlmdCgkc2NvcGUuaXRlbXMubGVuZ3RoICsgMSk7XG4gKiAgICAgICAgICRkb25lKCk7XG4gKiAgICAgICB9LCAxMDAwKTtcbiAqICAgICB9O1xuICogICB9KTtcbiAqIDwvc2NyaXB0PlxuICpcbiAqIDxvbnMtcGFnZSBuZy1jb250cm9sbGVyPVwiTXlDb250cm9sbGVyXCI+XG4gKiAgIDxvbnMtcHVsbC1ob29rIHZhcj1cImxvYWRlclwiIG5nLWFjdGlvbj1cImxvYWQoJGRvbmUpXCI+XG4gKiAgICAgPHNwYW4gbmctc3dpdGNoPVwibG9hZGVyLnN0YXRlXCI+XG4gKiAgICAgICA8c3BhbiBuZy1zd2l0Y2gtd2hlbj1cImluaXRpYWxcIj5QdWxsIGRvd24gdG8gcmVmcmVzaDwvc3Bhbj5cbiAqICAgICAgIDxzcGFuIG5nLXN3aXRjaC13aGVuPVwicHJlYWN0aW9uXCI+UmVsZWFzZSB0byByZWZyZXNoPC9zcGFuPlxuICogICAgICAgPHNwYW4gbmctc3dpdGNoLXdoZW49XCJhY3Rpb25cIj5Mb2FkaW5nIGRhdGEuIFBsZWFzZSB3YWl0Li4uPC9zcGFuPlxuICogICAgIDwvc3Bhbj5cbiAqICAgPC9vbnMtcHVsbC1ob29rPlxuICogICA8b25zLWxpc3Q+XG4gKiAgICAgPG9ucy1saXN0LWl0ZW0gbmctcmVwZWF0PVwiaXRlbSBpbiBpdGVtc1wiPlxuICogICAgICAgSXRlbSAje3sgaXRlbSB9fVxuICogICAgIDwvb25zLWxpc3QtaXRlbT5cbiAqICAgPC9vbnMtbGlzdD5cbiAqIDwvb25zLXBhZ2U+XG4gKi9cblxuLyoqXG4gKiBAYXR0cmlidXRlIHZhclxuICogQGluaXRvbmx5XG4gKiBAdHlwZSB7U3RyaW5nfVxuICogQGRlc2NyaXB0aW9uXG4gKiAgIFtlbl1WYXJpYWJsZSBuYW1lIHRvIHJlZmVyIHRoaXMgY29tcG9uZW50LlsvZW5dXG4gKiAgIFtqYV3jgZPjga7jgrPjg7Pjg53jg7zjg43jg7Pjg4jjgpLlj4LnhafjgZnjgovjgZ/jgoHjga7lkI3liY3jgpLmjIflrprjgZfjgb7jgZnjgIJbL2phXVxuICovXG5cbi8qKlxuICogQGF0dHJpYnV0ZSBuZy1hY3Rpb25cbiAqIEBpbml0b25seVxuICogQHR5cGUge0V4cHJlc3Npb259XG4gKiBAZGVzY3JpcHRpb25cbiAqICAgW2VuXVVzZSB0byBzcGVjaWZ5IGN1c3RvbSBiZWhhdmlvciB3aGVuIHRoZSBwYWdlIGlzIHB1bGxlZCBkb3duLiBBIDxjb2RlPiRkb25lPC9jb2RlPiBmdW5jdGlvbiBpcyBhdmFpbGFibGUgdG8gdGVsbCB0aGUgY29tcG9uZW50IHRoYXQgdGhlIGFjdGlvbiBpcyBjb21wbGV0ZWQuWy9lbl1cbiAqICAgW2phXXB1bGwgZG93buOBl+OBn+OBqOOBjeOBruaMr+OCi+iInuOBhOOCkuaMh+WumuOBl+OBvuOBmeOAguOCouOCr+OCt+ODp+ODs+OBjOWujOS6huOBl+OBn+aZguOBq+OBrzxjb2RlPiRkb25lPC9jb2RlPumWouaVsOOCkuWRvOOBs+WHuuOBl+OBvuOBmeOAglsvamFdXG4gKi9cblxuLyoqXG4gKiBAYXR0cmlidXRlIG9ucy1jaGFuZ2VzdGF0ZVxuICogQGluaXRvbmx5XG4gKiBAdHlwZSB7RXhwcmVzc2lvbn1cbiAqIEBkZXNjcmlwdGlvblxuICogIFtlbl1BbGxvd3MgeW91IHRvIHNwZWNpZnkgY3VzdG9tIGJlaGF2aW9yIHdoZW4gdGhlIFwiY2hhbmdlc3RhdGVcIiBldmVudCBpcyBmaXJlZC5bL2VuXVxuICogIFtqYV1cImNoYW5nZXN0YXRlXCLjgqTjg5njg7Pjg4jjgYznmbrngavjgZXjgozjgZ/mmYLjga7mjJnli5XjgpLni6zoh6rjgavmjIflrprjgafjgY3jgb7jgZnjgIJbL2phXVxuICovXG5cbi8qKlxuICogQG1ldGhvZCBvblxuICogQHNpZ25hdHVyZSBvbihldmVudE5hbWUsIGxpc3RlbmVyKVxuICogQGRlc2NyaXB0aW9uXG4gKiAgIFtlbl1BZGQgYW4gZXZlbnQgbGlzdGVuZXIuWy9lbl1cbiAqICAgW2phXeOCpOODmeODs+ODiOODquOCueODiuODvOOCkui/veWKoOOBl+OBvuOBmeOAglsvamFdXG4gKiBAcGFyYW0ge1N0cmluZ30gZXZlbnROYW1lXG4gKiAgIFtlbl1OYW1lIG9mIHRoZSBldmVudC5bL2VuXVxuICogICBbamFd44Kk44OZ44Oz44OI5ZCN44KS5oyH5a6a44GX44G+44GZ44CCWy9qYV1cbiAqIEBwYXJhbSB7RnVuY3Rpb259IGxpc3RlbmVyXG4gKiAgIFtlbl1GdW5jdGlvbiB0byBleGVjdXRlIHdoZW4gdGhlIGV2ZW50IGlzIHRyaWdnZXJlZC5bL2VuXVxuICogICBbamFd44GT44Gu44Kk44OZ44Oz44OI44GM55m654Gr44GV44KM44Gf6Zqb44Gr5ZG844Gz5Ye644GV44KM44KL6Zai5pWw44Kq44OW44K444Kn44Kv44OI44KS5oyH5a6a44GX44G+44GZ44CCWy9qYV1cbiAqL1xuXG4vKipcbiAqIEBtZXRob2Qgb25jZVxuICogQHNpZ25hdHVyZSBvbmNlKGV2ZW50TmFtZSwgbGlzdGVuZXIpXG4gKiBAZGVzY3JpcHRpb25cbiAqICBbZW5dQWRkIGFuIGV2ZW50IGxpc3RlbmVyIHRoYXQncyBvbmx5IHRyaWdnZXJlZCBvbmNlLlsvZW5dXG4gKiAgW2phXeS4gOW6puOBoOOBkeWRvOOBs+WHuuOBleOCjOOCi+OCpOODmeODs+ODiOODquOCueODiuODvOOCkui/veWKoOOBl+OBvuOBmeOAglsvamFdXG4gKiBAcGFyYW0ge1N0cmluZ30gZXZlbnROYW1lXG4gKiAgIFtlbl1OYW1lIG9mIHRoZSBldmVudC5bL2VuXVxuICogICBbamFd44Kk44OZ44Oz44OI5ZCN44KS5oyH5a6a44GX44G+44GZ44CCWy9qYV1cbiAqIEBwYXJhbSB7RnVuY3Rpb259IGxpc3RlbmVyXG4gKiAgIFtlbl1GdW5jdGlvbiB0byBleGVjdXRlIHdoZW4gdGhlIGV2ZW50IGlzIHRyaWdnZXJlZC5bL2VuXVxuICogICBbamFd44Kk44OZ44Oz44OI44GM55m654Gr44GX44Gf6Zqb44Gr5ZG844Gz5Ye644GV44KM44KL6Zai5pWw44Kq44OW44K444Kn44Kv44OI44KS5oyH5a6a44GX44G+44GZ44CCWy9qYV1cbiAqL1xuXG4vKipcbiAqIEBtZXRob2Qgb2ZmXG4gKiBAc2lnbmF0dXJlIG9mZihldmVudE5hbWUsIFtsaXN0ZW5lcl0pXG4gKiBAZGVzY3JpcHRpb25cbiAqICBbZW5dUmVtb3ZlIGFuIGV2ZW50IGxpc3RlbmVyLiBJZiB0aGUgbGlzdGVuZXIgaXMgbm90IHNwZWNpZmllZCBhbGwgbGlzdGVuZXJzIGZvciB0aGUgZXZlbnQgdHlwZSB3aWxsIGJlIHJlbW92ZWQuWy9lbl1cbiAqICBbamFd44Kk44OZ44Oz44OI44Oq44K544OK44O844KS5YmK6Zmk44GX44G+44GZ44CC44KC44GX44Kk44OZ44Oz44OI44Oq44K544OK44O844KS5oyH5a6a44GX44Gq44GL44Gj44Gf5aC05ZCI44Gr44Gv44CB44Gd44Gu44Kk44OZ44Oz44OI44Gr57SQ44Gl44GP5YWo44Gm44Gu44Kk44OZ44Oz44OI44Oq44K544OK44O844GM5YmK6Zmk44GV44KM44G+44GZ44CCWy9qYV1cbiAqIEBwYXJhbSB7U3RyaW5nfSBldmVudE5hbWVcbiAqICAgW2VuXU5hbWUgb2YgdGhlIGV2ZW50LlsvZW5dXG4gKiAgIFtqYV3jgqTjg5njg7Pjg4jlkI3jgpLmjIflrprjgZfjgb7jgZnjgIJbL2phXVxuICogQHBhcmFtIHtGdW5jdGlvbn0gbGlzdGVuZXJcbiAqICAgW2VuXUZ1bmN0aW9uIHRvIGV4ZWN1dGUgd2hlbiB0aGUgZXZlbnQgaXMgdHJpZ2dlcmVkLlsvZW5dXG4gKiAgIFtqYV3liYrpmaTjgZnjgovjgqTjg5njg7Pjg4jjg6rjgrnjg4rjg7zjgpLmjIflrprjgZfjgb7jgZnjgIJbL2phXVxuICovXG5cbihmdW5jdGlvbigpIHtcbiAgJ3VzZSBzdHJpY3QnO1xuXG4gIC8qKlxuICAgKiBQdWxsIGhvb2sgZGlyZWN0aXZlLlxuICAgKi9cbiAgYW5ndWxhci5tb2R1bGUoJ29uc2VuJykuZGlyZWN0aXZlKCdvbnNQdWxsSG9vaycsIGZ1bmN0aW9uKCRvbnNlbiwgUHVsbEhvb2tWaWV3KSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHJlc3RyaWN0OiAnRScsXG4gICAgICByZXBsYWNlOiBmYWxzZSxcbiAgICAgIHNjb3BlOiB0cnVlLFxuXG4gICAgICBjb21waWxlOiBmdW5jdGlvbihlbGVtZW50LCBhdHRycykge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgIHByZTogZnVuY3Rpb24oc2NvcGUsIGVsZW1lbnQsIGF0dHJzKSB7XG4gICAgICAgICAgICB2YXIgcHVsbEhvb2sgPSBuZXcgUHVsbEhvb2tWaWV3KHNjb3BlLCBlbGVtZW50LCBhdHRycyk7XG5cbiAgICAgICAgICAgICRvbnNlbi5kZWNsYXJlVmFyQXR0cmlidXRlKGF0dHJzLCBwdWxsSG9vayk7XG4gICAgICAgICAgICAkb25zZW4ucmVnaXN0ZXJFdmVudEhhbmRsZXJzKHB1bGxIb29rLCAnY2hhbmdlc3RhdGUgZGVzdHJveScpO1xuICAgICAgICAgICAgZWxlbWVudC5kYXRhKCdvbnMtcHVsbC1ob29rJywgcHVsbEhvb2spO1xuXG4gICAgICAgICAgICBzY29wZS4kb24oJyRkZXN0cm95JywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgIHB1bGxIb29rLl9ldmVudHMgPSB1bmRlZmluZWQ7XG4gICAgICAgICAgICAgIGVsZW1lbnQuZGF0YSgnb25zLXB1bGwtaG9vaycsIHVuZGVmaW5lZCk7XG4gICAgICAgICAgICAgIHNjb3BlID0gZWxlbWVudCA9IGF0dHJzID0gbnVsbDtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH0sXG4gICAgICAgICAgcG9zdDogZnVuY3Rpb24oc2NvcGUsIGVsZW1lbnQpIHtcbiAgICAgICAgICAgICRvbnNlbi5maXJlQ29tcG9uZW50RXZlbnQoZWxlbWVudFswXSwgJ2luaXQnKTtcbiAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgICB9XG4gICAgfTtcbiAgfSk7XG5cbn0pKCk7XG4iLCIvKipcbiAqIEBlbGVtZW50IG9ucy1yYWRpb1xuICovXG5cbihmdW5jdGlvbigpe1xuICAndXNlIHN0cmljdCc7XG5cbiAgYW5ndWxhci5tb2R1bGUoJ29uc2VuJykuZGlyZWN0aXZlKCdvbnNSYWRpbycsIGZ1bmN0aW9uKCRwYXJzZSkge1xuICAgIHJldHVybiB7XG4gICAgICByZXN0cmljdDogJ0UnLFxuICAgICAgcmVwbGFjZTogZmFsc2UsXG4gICAgICBzY29wZTogZmFsc2UsXG5cbiAgICAgIGxpbms6IGZ1bmN0aW9uKHNjb3BlLCBlbGVtZW50LCBhdHRycykge1xuICAgICAgICBsZXQgZWwgPSBlbGVtZW50WzBdO1xuXG4gICAgICAgIGNvbnN0IG9uQ2hhbmdlID0gKCkgPT4ge1xuICAgICAgICAgICRwYXJzZShhdHRycy5uZ01vZGVsKS5hc3NpZ24oc2NvcGUsIGVsLnZhbHVlKTtcbiAgICAgICAgICBhdHRycy5uZ0NoYW5nZSAmJiBzY29wZS4kZXZhbChhdHRycy5uZ0NoYW5nZSk7XG4gICAgICAgICAgc2NvcGUuJHBhcmVudC4kZXZhbEFzeW5jKCk7XG4gICAgICAgIH07XG5cbiAgICAgICAgaWYgKGF0dHJzLm5nTW9kZWwpIHtcbiAgICAgICAgICBzY29wZS4kd2F0Y2goYXR0cnMubmdNb2RlbCwgdmFsdWUgPT4gZWwuY2hlY2tlZCA9IHZhbHVlID09PSBlbC52YWx1ZSk7XG4gICAgICAgICAgZWxlbWVudC5vbignY2hhbmdlJywgb25DaGFuZ2UpO1xuICAgICAgICB9XG5cbiAgICAgICAgc2NvcGUuJG9uKCckZGVzdHJveScsICgpID0+IHtcbiAgICAgICAgICBlbGVtZW50Lm9mZignY2hhbmdlJywgb25DaGFuZ2UpO1xuICAgICAgICAgIHNjb3BlID0gZWxlbWVudCA9IGF0dHJzID0gZWwgPSBudWxsO1xuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9O1xuICB9KTtcbn0pKCk7XG4iLCIoZnVuY3Rpb24oKXtcbiAgJ3VzZSBzdHJpY3QnO1xuXG4gIGFuZ3VsYXIubW9kdWxlKCdvbnNlbicpLmRpcmVjdGl2ZSgnb25zUmFuZ2UnLCBmdW5jdGlvbigkcGFyc2UpIHtcbiAgICByZXR1cm4ge1xuICAgICAgcmVzdHJpY3Q6ICdFJyxcbiAgICAgIHJlcGxhY2U6IGZhbHNlLFxuICAgICAgc2NvcGU6IGZhbHNlLFxuXG4gICAgICBsaW5rOiBmdW5jdGlvbihzY29wZSwgZWxlbWVudCwgYXR0cnMpIHtcblxuICAgICAgICBjb25zdCBvbklucHV0ID0gKCkgPT4ge1xuICAgICAgICAgIGNvbnN0IHNldCA9ICRwYXJzZShhdHRycy5uZ01vZGVsKS5hc3NpZ247XG5cbiAgICAgICAgICBzZXQoc2NvcGUsIGVsZW1lbnRbMF0udmFsdWUpO1xuICAgICAgICAgIGlmIChhdHRycy5uZ0NoYW5nZSkge1xuICAgICAgICAgICAgc2NvcGUuJGV2YWwoYXR0cnMubmdDaGFuZ2UpO1xuICAgICAgICAgIH1cbiAgICAgICAgICBzY29wZS4kcGFyZW50LiRldmFsQXN5bmMoKTtcbiAgICAgICAgfTtcblxuICAgICAgICBpZiAoYXR0cnMubmdNb2RlbCkge1xuICAgICAgICAgIHNjb3BlLiR3YXRjaChhdHRycy5uZ01vZGVsLCAodmFsdWUpID0+IHtcbiAgICAgICAgICAgIGVsZW1lbnRbMF0udmFsdWUgPSB2YWx1ZTtcbiAgICAgICAgICB9KTtcblxuICAgICAgICAgIGVsZW1lbnQub24oJ2lucHV0Jywgb25JbnB1dCk7XG4gICAgICAgIH1cblxuICAgICAgICBzY29wZS4kb24oJyRkZXN0cm95JywgKCkgPT4ge1xuICAgICAgICAgIGVsZW1lbnQub2ZmKCdpbnB1dCcsIG9uSW5wdXQpO1xuICAgICAgICAgIHNjb3BlID0gZWxlbWVudCA9IGF0dHJzID0gbnVsbDtcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfTtcbiAgfSk7XG59KSgpO1xuIiwiKGZ1bmN0aW9uKCkge1xuICAndXNlIHN0cmljdCc7XG5cbiAgYW5ndWxhci5tb2R1bGUoJ29uc2VuJykuZGlyZWN0aXZlKCdvbnNSaXBwbGUnLCBmdW5jdGlvbigkb25zZW4sIEdlbmVyaWNWaWV3KSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHJlc3RyaWN0OiAnRScsXG4gICAgICBsaW5rOiBmdW5jdGlvbihzY29wZSwgZWxlbWVudCwgYXR0cnMpIHtcbiAgICAgICAgR2VuZXJpY1ZpZXcucmVnaXN0ZXIoc2NvcGUsIGVsZW1lbnQsIGF0dHJzLCB7dmlld0tleTogJ29ucy1yaXBwbGUnfSk7XG4gICAgICAgICRvbnNlbi5maXJlQ29tcG9uZW50RXZlbnQoZWxlbWVudFswXSwgJ2luaXQnKTtcbiAgICAgIH1cbiAgICB9O1xuICB9KTtcbn0pKCk7XG4iLCIvKipcbiAqIEBlbGVtZW50IG9ucy1zY29wZVxuICogQGNhdGVnb3J5IHV0aWxcbiAqIEBkZXNjcmlwdGlvblxuICogICBbZW5dQWxsIGNoaWxkIGVsZW1lbnRzIHVzaW5nIHRoZSBcInZhclwiIGF0dHJpYnV0ZSB3aWxsIGJlIGF0dGFjaGVkIHRvIHRoZSBzY29wZSBvZiB0aGlzIGVsZW1lbnQuWy9lbl1cbiAqICAgW2phXVwidmFyXCLlsZ7mgKfjgpLkvb/jgaPjgabjgYTjgovlhajjgabjga7lrZDopoHntKDjga52aWV344Kq44OW44K444Kn44Kv44OI44Gv44CB44GT44Gu6KaB57Sg44GuQW5ndWxhckpT44K544Kz44O844OX44Gr6L+95Yqg44GV44KM44G+44GZ44CCWy9qYV1cbiAqIEBleGFtcGxlXG4gKiA8b25zLWxpc3Q+XG4gKiAgIDxvbnMtbGlzdC1pdGVtIG9ucy1zY29wZSBuZy1yZXBlYXQ9XCJpdGVtIGluIGl0ZW1zXCI+XG4gKiAgICAgPG9ucy1jYXJvdXNlbCB2YXI9XCJjYXJvdXNlbFwiPlxuICogICAgICAgPG9ucy1jYXJvdXNlbC1pdGVtIG5nLWNsaWNrPVwiY2Fyb3VzZWwubmV4dCgpXCI+XG4gKiAgICAgICAgIHt7IGl0ZW0gfX1cbiAqICAgICAgIDwvb25zLWNhcm91c2VsLWl0ZW0+XG4gKiAgICAgICA8L29ucy1jYXJvdXNlbC1pdGVtIG5nLWNsaWNrPVwiY2Fyb3VzZWwucHJldigpXCI+XG4gKiAgICAgICAgIC4uLlxuICogICAgICAgPC9vbnMtY2Fyb3VzZWwtaXRlbT5cbiAqICAgICA8L29ucy1jYXJvdXNlbD5cbiAqICAgPC9vbnMtbGlzdC1pdGVtPlxuICogPC9vbnMtbGlzdD5cbiAqL1xuXG4oZnVuY3Rpb24oKSB7XG4gICd1c2Ugc3RyaWN0JztcblxuICB2YXIgbW9kdWxlID0gYW5ndWxhci5tb2R1bGUoJ29uc2VuJyk7XG5cbiAgbW9kdWxlLmRpcmVjdGl2ZSgnb25zU2NvcGUnLCBmdW5jdGlvbigkb25zZW4pIHtcbiAgICByZXR1cm4ge1xuICAgICAgcmVzdHJpY3Q6ICdBJyxcbiAgICAgIHJlcGxhY2U6IGZhbHNlLFxuICAgICAgdHJhbnNjbHVkZTogZmFsc2UsXG4gICAgICBzY29wZTogZmFsc2UsXG5cbiAgICAgIGxpbms6IGZ1bmN0aW9uKHNjb3BlLCBlbGVtZW50KSB7XG4gICAgICAgIGVsZW1lbnQuZGF0YSgnX3Njb3BlJywgc2NvcGUpO1xuXG4gICAgICAgIHNjb3BlLiRvbignJGRlc3Ryb3knLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICBlbGVtZW50LmRhdGEoJ19zY29wZScsIHVuZGVmaW5lZCk7XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH07XG4gIH0pO1xufSkoKTtcbiIsIi8qKlxuICogQGVsZW1lbnQgb25zLXNlYXJjaC1pbnB1dFxuICovXG5cbihmdW5jdGlvbigpe1xuICAndXNlIHN0cmljdCc7XG5cbiAgYW5ndWxhci5tb2R1bGUoJ29uc2VuJykuZGlyZWN0aXZlKCdvbnNTZWFyY2hJbnB1dCcsIGZ1bmN0aW9uKCRwYXJzZSkge1xuICAgIHJldHVybiB7XG4gICAgICByZXN0cmljdDogJ0UnLFxuICAgICAgcmVwbGFjZTogZmFsc2UsXG4gICAgICBzY29wZTogZmFsc2UsXG5cbiAgICAgIGxpbms6IGZ1bmN0aW9uKHNjb3BlLCBlbGVtZW50LCBhdHRycykge1xuICAgICAgICBsZXQgZWwgPSBlbGVtZW50WzBdO1xuXG4gICAgICAgIGNvbnN0IG9uSW5wdXQgPSAoKSA9PiB7XG4gICAgICAgICAgJHBhcnNlKGF0dHJzLm5nTW9kZWwpLmFzc2lnbihzY29wZSwgZWwudHlwZSA9PT0gJ251bWJlcicgPyBOdW1iZXIoZWwudmFsdWUpIDogZWwudmFsdWUpO1xuICAgICAgICAgIGF0dHJzLm5nQ2hhbmdlICYmIHNjb3BlLiRldmFsKGF0dHJzLm5nQ2hhbmdlKTtcbiAgICAgICAgICBzY29wZS4kcGFyZW50LiRldmFsQXN5bmMoKTtcbiAgICAgICAgfTtcblxuICAgICAgICBpZiAoYXR0cnMubmdNb2RlbCkge1xuICAgICAgICAgIHNjb3BlLiR3YXRjaChhdHRycy5uZ01vZGVsLCAodmFsdWUpID0+IHtcbiAgICAgICAgICAgIGlmICh0eXBlb2YgdmFsdWUgIT09ICd1bmRlZmluZWQnICYmIHZhbHVlICE9PSBlbC52YWx1ZSkge1xuICAgICAgICAgICAgICBlbC52YWx1ZSA9IHZhbHVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgZWxlbWVudC5vbignaW5wdXQnLCBvbklucHV0KVxuICAgICAgICB9XG5cbiAgICAgICAgc2NvcGUuJG9uKCckZGVzdHJveScsICgpID0+IHtcbiAgICAgICAgICBlbGVtZW50Lm9mZignaW5wdXQnLCBvbklucHV0KVxuICAgICAgICAgIHNjb3BlID0gZWxlbWVudCA9IGF0dHJzID0gZWwgPSBudWxsO1xuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9O1xuICB9KTtcbn0pKCk7XG4iLCIvKipcbiAqIEBlbGVtZW50IG9ucy1zZWdtZW50XG4gKi9cblxuLyoqXG4gKiBAYXR0cmlidXRlIHZhclxuICogQGluaXRvbmx5XG4gKiBAdHlwZSB7U3RyaW5nfVxuICogQGRlc2NyaXB0aW9uXG4gKiAgIFtlbl1WYXJpYWJsZSBuYW1lIHRvIHJlZmVyIHRoaXMgc2VnbWVudC5bL2VuXVxuICogICBbamFd44GT44Gu44K/44OW44OQ44O844KS5Y+C54Wn44GZ44KL44Gf44KB44Gu5ZCN5YmN44KS5oyH5a6a44GX44G+44GZ44CCWy9qYV1cbiAqL1xuXG4vKipcbiAqIEBhdHRyaWJ1dGUgb25zLXBvc3RjaGFuZ2VcbiAqIEBpbml0b25seVxuICogQHR5cGUge0V4cHJlc3Npb259XG4gKiBAZGVzY3JpcHRpb25cbiAqICBbZW5dQWxsb3dzIHlvdSB0byBzcGVjaWZ5IGN1c3RvbSBiZWhhdmlvciB3aGVuIHRoZSBcInBvc3RjaGFuZ2VcIiBldmVudCBpcyBmaXJlZC5bL2VuXVxuICogIFtqYV1cInBvc3RjaGFuZ2VcIuOCpOODmeODs+ODiOOBjOeZuueBq+OBleOCjOOBn+aZguOBruaMmeWLleOCkueLrOiHquOBq+aMh+WumuOBp+OBjeOBvuOBmeOAglsvamFdXG4gKi9cblxuKGZ1bmN0aW9uKCkge1xuICAndXNlIHN0cmljdCc7XG5cbiAgYW5ndWxhci5tb2R1bGUoJ29uc2VuJykuZGlyZWN0aXZlKCdvbnNTZWdtZW50JywgZnVuY3Rpb24oJG9uc2VuLCBHZW5lcmljVmlldykge1xuICAgIHJldHVybiB7XG4gICAgICByZXN0cmljdDogJ0UnLFxuICAgICAgbGluazogZnVuY3Rpb24oc2NvcGUsIGVsZW1lbnQsIGF0dHJzKSB7XG4gICAgICAgIHZhciB2aWV3ID0gR2VuZXJpY1ZpZXcucmVnaXN0ZXIoc2NvcGUsIGVsZW1lbnQsIGF0dHJzLCB7dmlld0tleTogJ29ucy1zZWdtZW50J30pO1xuICAgICAgICAkb25zZW4uZmlyZUNvbXBvbmVudEV2ZW50KGVsZW1lbnRbMF0sICdpbml0Jyk7XG4gICAgICAgICRvbnNlbi5yZWdpc3RlckV2ZW50SGFuZGxlcnModmlldywgJ3Bvc3RjaGFuZ2UnKTtcbiAgICAgIH1cbiAgICB9O1xuICB9KTtcblxufSkoKTtcbiIsIi8qKlxuICogQGVsZW1lbnQgb25zLXNlbGVjdFxuICovXG5cbi8qKlxuICogQG1ldGhvZCBvblxuICogQHNpZ25hdHVyZSBvbihldmVudE5hbWUsIGxpc3RlbmVyKVxuICogQGRlc2NyaXB0aW9uXG4gKiAgIFtlbl1BZGQgYW4gZXZlbnQgbGlzdGVuZXIuWy9lbl1cbiAqICAgW2phXeOCpOODmeODs+ODiOODquOCueODiuODvOOCkui/veWKoOOBl+OBvuOBmeOAglsvamFdXG4gKiBAcGFyYW0ge1N0cmluZ30gZXZlbnROYW1lXG4gKiAgIFtlbl1OYW1lIG9mIHRoZSBldmVudC5bL2VuXVxuICogICBbamFd44Kk44OZ44Oz44OI5ZCN44KS5oyH5a6a44GX44G+44GZ44CCWy9qYV1cbiAqIEBwYXJhbSB7RnVuY3Rpb259IGxpc3RlbmVyXG4gKiAgIFtlbl1GdW5jdGlvbiB0byBleGVjdXRlIHdoZW4gdGhlIGV2ZW50IGlzIHRyaWdnZXJlZC5bL2VuXVxuICogICBbamFd44GT44Gu44Kk44OZ44Oz44OI44GM55m654Gr44GV44KM44Gf6Zqb44Gr5ZG844Gz5Ye644GV44KM44KL6Zai5pWw44Kq44OW44K444Kn44Kv44OI44KS5oyH5a6a44GX44G+44GZ44CCWy9qYV1cbiAqL1xuXG4vKipcbiAqIEBtZXRob2Qgb25jZVxuICogQHNpZ25hdHVyZSBvbmNlKGV2ZW50TmFtZSwgbGlzdGVuZXIpXG4gKiBAZGVzY3JpcHRpb25cbiAqICBbZW5dQWRkIGFuIGV2ZW50IGxpc3RlbmVyIHRoYXQncyBvbmx5IHRyaWdnZXJlZCBvbmNlLlsvZW5dXG4gKiAgW2phXeS4gOW6puOBoOOBkeWRvOOBs+WHuuOBleOCjOOCi+OCpOODmeODs+ODiOODquOCueODiuODvOOCkui/veWKoOOBl+OBvuOBmeOAglsvamFdXG4gKiBAcGFyYW0ge1N0cmluZ30gZXZlbnROYW1lXG4gKiAgIFtlbl1OYW1lIG9mIHRoZSBldmVudC5bL2VuXVxuICogICBbamFd44Kk44OZ44Oz44OI5ZCN44KS5oyH5a6a44GX44G+44GZ44CCWy9qYV1cbiAqIEBwYXJhbSB7RnVuY3Rpb259IGxpc3RlbmVyXG4gKiAgIFtlbl1GdW5jdGlvbiB0byBleGVjdXRlIHdoZW4gdGhlIGV2ZW50IGlzIHRyaWdnZXJlZC5bL2VuXVxuICogICBbamFd44Kk44OZ44Oz44OI44GM55m654Gr44GX44Gf6Zqb44Gr5ZG844Gz5Ye644GV44KM44KL6Zai5pWw44Kq44OW44K444Kn44Kv44OI44KS5oyH5a6a44GX44G+44GZ44CCWy9qYV1cbiAqL1xuXG4vKipcbiAqIEBtZXRob2Qgb2ZmXG4gKiBAc2lnbmF0dXJlIG9mZihldmVudE5hbWUsIFtsaXN0ZW5lcl0pXG4gKiBAZGVzY3JpcHRpb25cbiAqICBbZW5dUmVtb3ZlIGFuIGV2ZW50IGxpc3RlbmVyLiBJZiB0aGUgbGlzdGVuZXIgaXMgbm90IHNwZWNpZmllZCBhbGwgbGlzdGVuZXJzIGZvciB0aGUgZXZlbnQgdHlwZSB3aWxsIGJlIHJlbW92ZWQuWy9lbl1cbiAqICBbamFd44Kk44OZ44Oz44OI44Oq44K544OK44O844KS5YmK6Zmk44GX44G+44GZ44CC44KC44GX44Kk44OZ44Oz44OI44Oq44K544OK44O844KS5oyH5a6a44GX44Gq44GL44Gj44Gf5aC05ZCI44Gr44Gv44CB44Gd44Gu44Kk44OZ44Oz44OI44Gr57SQ44Gl44GP5YWo44Gm44Gu44Kk44OZ44Oz44OI44Oq44K544OK44O844GM5YmK6Zmk44GV44KM44G+44GZ44CCWy9qYV1cbiAqIEBwYXJhbSB7U3RyaW5nfSBldmVudE5hbWVcbiAqICAgW2VuXU5hbWUgb2YgdGhlIGV2ZW50LlsvZW5dXG4gKiAgIFtqYV3jgqTjg5njg7Pjg4jlkI3jgpLmjIflrprjgZfjgb7jgZnjgIJbL2phXVxuICogQHBhcmFtIHtGdW5jdGlvbn0gbGlzdGVuZXJcbiAqICAgW2VuXUZ1bmN0aW9uIHRvIGV4ZWN1dGUgd2hlbiB0aGUgZXZlbnQgaXMgdHJpZ2dlcmVkLlsvZW5dXG4gKiAgIFtqYV3liYrpmaTjgZnjgovjgqTjg5njg7Pjg4jjg6rjgrnjg4rjg7zjgpLmjIflrprjgZfjgb7jgZnjgIJbL2phXVxuICovXG5cbihmdW5jdGlvbiAoKSB7XG4gICd1c2Ugc3RyaWN0JztcblxuICBhbmd1bGFyLm1vZHVsZSgnb25zZW4nKVxuICAuZGlyZWN0aXZlKCdvbnNTZWxlY3QnLCBmdW5jdGlvbiAoJHBhcnNlLCAkb25zZW4sIEdlbmVyaWNWaWV3KSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHJlc3RyaWN0OiAnRScsXG4gICAgICByZXBsYWNlOiBmYWxzZSxcbiAgICAgIHNjb3BlOiBmYWxzZSxcblxuICAgICAgbGluazogZnVuY3Rpb24gKHNjb3BlLCBlbGVtZW50LCBhdHRycykge1xuICAgICAgICBjb25zdCBvbklucHV0ID0gKCkgPT4ge1xuICAgICAgICAgIGNvbnN0IHNldCA9ICRwYXJzZShhdHRycy5uZ01vZGVsKS5hc3NpZ247XG5cbiAgICAgICAgICBzZXQoc2NvcGUsIGVsZW1lbnRbMF0udmFsdWUpO1xuICAgICAgICAgIGlmIChhdHRycy5uZ0NoYW5nZSkge1xuICAgICAgICAgICAgc2NvcGUuJGV2YWwoYXR0cnMubmdDaGFuZ2UpO1xuICAgICAgICAgIH1cbiAgICAgICAgICBzY29wZS4kcGFyZW50LiRldmFsQXN5bmMoKTtcbiAgICAgICAgfTtcblxuICAgICAgICBpZiAoYXR0cnMubmdNb2RlbCkge1xuICAgICAgICAgIHNjb3BlLiR3YXRjaChhdHRycy5uZ01vZGVsLCAodmFsdWUpID0+IHtcbiAgICAgICAgICAgIGVsZW1lbnRbMF0udmFsdWUgPSB2YWx1ZTtcbiAgICAgICAgICB9KTtcblxuICAgICAgICAgIGVsZW1lbnQub24oJ2lucHV0Jywgb25JbnB1dCk7XG4gICAgICAgIH1cblxuICAgICAgICBzY29wZS4kb24oJyRkZXN0cm95JywgKCkgPT4ge1xuICAgICAgICAgIGVsZW1lbnQub2ZmKCdpbnB1dCcsIG9uSW5wdXQpO1xuICAgICAgICAgIHNjb3BlID0gZWxlbWVudCA9IGF0dHJzID0gbnVsbDtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgR2VuZXJpY1ZpZXcucmVnaXN0ZXIoc2NvcGUsIGVsZW1lbnQsIGF0dHJzLCB7IHZpZXdLZXk6ICdvbnMtc2VsZWN0JyB9KTtcbiAgICAgICAgJG9uc2VuLmZpcmVDb21wb25lbnRFdmVudChlbGVtZW50WzBdLCAnaW5pdCcpO1xuICAgICAgfVxuICAgIH07XG4gIH0pXG59KSgpO1xuIiwiLyoqXG4gKiBAZWxlbWVudCBvbnMtc3BlZWQtZGlhbFxuICovXG5cbi8qKlxuICogQGF0dHJpYnV0ZSB2YXJcbiAqIEBpbml0b25seVxuICogQHR5cGUge1N0cmluZ31cbiAqIEBkZXNjcmlwdGlvblxuICogICBbZW5dVmFyaWFibGUgbmFtZSB0byByZWZlciB0aGUgc3BlZWQgZGlhbC5bL2VuXVxuICogICBbamFd44GT44Gu44K544OU44O844OJ44OA44Kk44Ki44Or44KS5Y+C54Wn44GZ44KL44Gf44KB44Gu5aSJ5pWw5ZCN44KS44GX44Gm44GX44G+44GZ44CCWy9qYV1cbiAqL1xuXG4vKipcbiAqIEBhdHRyaWJ1dGUgb25zLW9wZW5cbiAqIEBpbml0b25seVxuICogQHR5cGUge0V4cHJlc3Npb259XG4gKiBAZGVzY3JpcHRpb25cbiAqICBbZW5dQWxsb3dzIHlvdSB0byBzcGVjaWZ5IGN1c3RvbSBiZWhhdmlvciB3aGVuIHRoZSBcIm9wZW5cIiBldmVudCBpcyBmaXJlZC5bL2VuXVxuICogIFtqYV1cIm9wZW5cIuOCpOODmeODs+ODiOOBjOeZuueBq+OBleOCjOOBn+aZguOBruaMmeWLleOCkueLrOiHquOBq+aMh+WumuOBp+OBjeOBvuOBmeOAglsvamFdXG4gKi9cblxuLyoqXG4gKiBAYXR0cmlidXRlIG9ucy1jbG9zZVxuICogQGluaXRvbmx5XG4gKiBAdHlwZSB7RXhwcmVzc2lvbn1cbiAqIEBkZXNjcmlwdGlvblxuICogIFtlbl1BbGxvd3MgeW91IHRvIHNwZWNpZnkgY3VzdG9tIGJlaGF2aW9yIHdoZW4gdGhlIFwiY2xvc2VcIiBldmVudCBpcyBmaXJlZC5bL2VuXVxuICogIFtqYV1cImNsb3NlXCLjgqTjg5njg7Pjg4jjgYznmbrngavjgZXjgozjgZ/mmYLjga7mjJnli5XjgpLni6zoh6rjgavmjIflrprjgafjgY3jgb7jgZnjgIJbL2phXVxuICovXG5cbi8qKlxuICogQG1ldGhvZCBvbmNlXG4gKiBAc2lnbmF0dXJlIG9uY2UoZXZlbnROYW1lLCBsaXN0ZW5lcilcbiAqIEBkZXNjcmlwdGlvblxuICogIFtlbl1BZGQgYW4gZXZlbnQgbGlzdGVuZXIgdGhhdCdzIG9ubHkgdHJpZ2dlcmVkIG9uY2UuWy9lbl1cbiAqICBbamFd5LiA5bqm44Gg44GR5ZG844Gz5Ye644GV44KM44KL44Kk44OZ44Oz44OI44Oq44K544OK44KS6L+95Yqg44GX44G+44GZ44CCWy9qYV1cbiAqIEBwYXJhbSB7U3RyaW5nfSBldmVudE5hbWVcbiAqICAgW2VuXU5hbWUgb2YgdGhlIGV2ZW50LlsvZW5dXG4gKiAgIFtqYV3jgqTjg5njg7Pjg4jlkI3jgpLmjIflrprjgZfjgb7jgZnjgIJbL2phXVxuICogQHBhcmFtIHtGdW5jdGlvbn0gbGlzdGVuZXJcbiAqICAgW2VuXUZ1bmN0aW9uIHRvIGV4ZWN1dGUgd2hlbiB0aGUgZXZlbnQgaXMgdHJpZ2dlcmVkLlsvZW5dXG4gKiAgIFtqYV3jgqTjg5njg7Pjg4jjgYznmbrngavjgZfjgZ/pmpvjgavlkbzjgbPlh7rjgZXjgozjgovplqLmlbDjgqrjg5bjgrjjgqfjgq/jg4jjgpLmjIflrprjgZfjgb7jgZnjgIJbL2phXVxuICovXG5cbi8qKlxuICogQG1ldGhvZCBvZmZcbiAqIEBzaWduYXR1cmUgb2ZmKGV2ZW50TmFtZSwgW2xpc3RlbmVyXSlcbiAqIEBkZXNjcmlwdGlvblxuICogIFtlbl1SZW1vdmUgYW4gZXZlbnQgbGlzdGVuZXIuIElmIHRoZSBsaXN0ZW5lciBpcyBub3Qgc3BlY2lmaWVkIGFsbCBsaXN0ZW5lcnMgZm9yIHRoZSBldmVudCB0eXBlIHdpbGwgYmUgcmVtb3ZlZC5bL2VuXVxuICogIFtqYV3jgqTjg5njg7Pjg4jjg6rjgrnjg4rjg7zjgpLliYrpmaTjgZfjgb7jgZnjgILjgoLjgZfjgqTjg5njg7Pjg4jjg6rjgrnjg4rjg7zjgYzmjIflrprjgZXjgozjgarjgYvjgaPjgZ/loLTlkIjjgavjga/jgIHjgZ3jga7jgqTjg5njg7Pjg4jjgavntJDku5jjgYTjgabjgYTjgovjgqTjg5njg7Pjg4jjg6rjgrnjg4rjg7zjgYzlhajjgabliYrpmaTjgZXjgozjgb7jgZnjgIJbL2phXVxuICogQHBhcmFtIHtTdHJpbmd9IGV2ZW50TmFtZVxuICogICBbZW5dTmFtZSBvZiB0aGUgZXZlbnQuWy9lbl1cbiAqICAgW2phXeOCpOODmeODs+ODiOWQjeOCkuaMh+WumuOBl+OBvuOBmeOAglsvamFdXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBsaXN0ZW5lclxuICogICBbZW5dRnVuY3Rpb24gdG8gZXhlY3V0ZSB3aGVuIHRoZSBldmVudCBpcyB0cmlnZ2VyZWQuWy9lbl1cbiAqICAgW2phXeOCpOODmeODs+ODiOOBjOeZuueBq+OBl+OBn+mam+OBq+WRvOOBs+WHuuOBleOCjOOCi+mWouaVsOOCquODluOCuOOCp+OCr+ODiOOCkuaMh+WumuOBl+OBvuOBmeOAglsvamFdXG4gKi9cblxuLyoqXG4gKiBAbWV0aG9kIG9uXG4gKiBAc2lnbmF0dXJlIG9uKGV2ZW50TmFtZSwgbGlzdGVuZXIpXG4gKiBAZGVzY3JpcHRpb25cbiAqICAgW2VuXUFkZCBhbiBldmVudCBsaXN0ZW5lci5bL2VuXVxuICogICBbamFd44Kk44OZ44Oz44OI44Oq44K544OK44O844KS6L+95Yqg44GX44G+44GZ44CCWy9qYV1cbiAqIEBwYXJhbSB7U3RyaW5nfSBldmVudE5hbWVcbiAqICAgW2VuXU5hbWUgb2YgdGhlIGV2ZW50LlsvZW5dXG4gKiAgIFtqYV3jgqTjg5njg7Pjg4jlkI3jgpLmjIflrprjgZfjgb7jgZnjgIJbL2phXVxuICogQHBhcmFtIHtGdW5jdGlvbn0gbGlzdGVuZXJcbiAqICAgW2VuXUZ1bmN0aW9uIHRvIGV4ZWN1dGUgd2hlbiB0aGUgZXZlbnQgaXMgdHJpZ2dlcmVkLlsvZW5dXG4gKiAgIFtqYV3jgqTjg5njg7Pjg4jjgYznmbrngavjgZfjgZ/pmpvjgavlkbzjgbPlh7rjgZXjgozjgovplqLmlbDjgqrjg5bjgrjjgqfjgq/jg4jjgpLmjIflrprjgZfjgb7jgZnjgIJbL2phXVxuICovXG5cbihmdW5jdGlvbigpIHtcbiAgJ3VzZSBzdHJpY3QnO1xuXG4gIHZhciBtb2R1bGUgPSBhbmd1bGFyLm1vZHVsZSgnb25zZW4nKTtcblxuICBtb2R1bGUuZGlyZWN0aXZlKCdvbnNTcGVlZERpYWwnLCBmdW5jdGlvbigkb25zZW4sIFNwZWVkRGlhbFZpZXcpIHtcbiAgICByZXR1cm4ge1xuICAgICAgcmVzdHJpY3Q6ICdFJyxcbiAgICAgIHJlcGxhY2U6IGZhbHNlLFxuICAgICAgc2NvcGU6IGZhbHNlLFxuICAgICAgdHJhbnNjbHVkZTogZmFsc2UsXG5cbiAgICAgIGNvbXBpbGU6IGZ1bmN0aW9uKGVsZW1lbnQsIGF0dHJzKSB7XG5cbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uKHNjb3BlLCBlbGVtZW50LCBhdHRycykge1xuICAgICAgICAgIHZhciBzcGVlZERpYWwgPSBuZXcgU3BlZWREaWFsVmlldyhzY29wZSwgZWxlbWVudCwgYXR0cnMpO1xuXG4gICAgICAgICAgZWxlbWVudC5kYXRhKCdvbnMtc3BlZWQtZGlhbCcsIHNwZWVkRGlhbCk7XG5cbiAgICAgICAgICAkb25zZW4ucmVnaXN0ZXJFdmVudEhhbmRsZXJzKHNwZWVkRGlhbCwgJ29wZW4gY2xvc2UnKTtcbiAgICAgICAgICAkb25zZW4uZGVjbGFyZVZhckF0dHJpYnV0ZShhdHRycywgc3BlZWREaWFsKTtcblxuICAgICAgICAgIHNjb3BlLiRvbignJGRlc3Ryb3knLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHNwZWVkRGlhbC5fZXZlbnRzID0gdW5kZWZpbmVkO1xuICAgICAgICAgICAgZWxlbWVudC5kYXRhKCdvbnMtc3BlZWQtZGlhbCcsIHVuZGVmaW5lZCk7XG4gICAgICAgICAgICBlbGVtZW50ID0gbnVsbDtcbiAgICAgICAgICB9KTtcblxuICAgICAgICAgICRvbnNlbi5maXJlQ29tcG9uZW50RXZlbnQoZWxlbWVudFswXSwgJ2luaXQnKTtcbiAgICAgICAgfTtcbiAgICAgIH0sXG5cbiAgICB9O1xuICB9KTtcblxufSkoKTtcblxuIiwiLyoqXG4gKiBAZWxlbWVudCBvbnMtc3BsaXR0ZXItY29udGVudFxuICovXG5cbi8qKlxuICogQGF0dHJpYnV0ZSB2YXJcbiAqIEBpbml0b25seVxuICogQHR5cGUge1N0cmluZ31cbiAqIEBkZXNjcmlwdGlvblxuICogICBbZW5dVmFyaWFibGUgbmFtZSB0byByZWZlciB0aGlzIHNwbGl0dGVyIGNvbnRlbnQuWy9lbl1cbiAqICAgW2phXeOBk+OBruOCueODl+ODquODg+OCv+ODvOOCs+ODs+ODneODvOODjeODs+ODiOOCkuWPgueFp+OBmeOCi+OBn+OCgeOBruWQjeWJjeOCkuaMh+WumuOBl+OBvuOBmeOAglsvamFdXG4gKi9cblxuLyoqXG4gKiBAYXR0cmlidXRlIG9ucy1kZXN0cm95XG4gKiBAaW5pdG9ubHlcbiAqIEB0eXBlIHtFeHByZXNzaW9ufVxuICogQGRlc2NyaXB0aW9uXG4gKiAgW2VuXUFsbG93cyB5b3UgdG8gc3BlY2lmeSBjdXN0b20gYmVoYXZpb3Igd2hlbiB0aGUgXCJkZXN0cm95XCIgZXZlbnQgaXMgZmlyZWQuWy9lbl1cbiAqICBbamFdXCJkZXN0cm95XCLjgqTjg5njg7Pjg4jjgYznmbrngavjgZXjgozjgZ/mmYLjga7mjJnli5XjgpLni6zoh6rjgavmjIflrprjgafjgY3jgb7jgZnjgIJbL2phXVxuICovXG4oZnVuY3Rpb24oKSB7XG4gICd1c2Ugc3RyaWN0JztcblxuICB2YXIgbGFzdFJlYWR5ID0gd2luZG93Lm9ucy5lbGVtZW50cy5TcGxpdHRlckNvbnRlbnQucmV3cml0YWJsZXMucmVhZHk7XG4gIHdpbmRvdy5vbnMuZWxlbWVudHMuU3BsaXR0ZXJDb250ZW50LnJld3JpdGFibGVzLnJlYWR5ID0gb25zLl93YWl0RGlyZXRpdmVJbml0KCdvbnMtc3BsaXR0ZXItY29udGVudCcsIGxhc3RSZWFkeSk7XG5cbiAgYW5ndWxhci5tb2R1bGUoJ29uc2VuJykuZGlyZWN0aXZlKCdvbnNTcGxpdHRlckNvbnRlbnQnLCBmdW5jdGlvbigkY29tcGlsZSwgU3BsaXR0ZXJDb250ZW50LCAkb25zZW4pIHtcbiAgICByZXR1cm4ge1xuICAgICAgcmVzdHJpY3Q6ICdFJyxcblxuICAgICAgY29tcGlsZTogZnVuY3Rpb24oZWxlbWVudCwgYXR0cnMpIHtcblxuICAgICAgICByZXR1cm4gZnVuY3Rpb24oc2NvcGUsIGVsZW1lbnQsIGF0dHJzKSB7XG5cbiAgICAgICAgICB2YXIgdmlldyA9IG5ldyBTcGxpdHRlckNvbnRlbnQoc2NvcGUsIGVsZW1lbnQsIGF0dHJzKTtcblxuICAgICAgICAgICRvbnNlbi5kZWNsYXJlVmFyQXR0cmlidXRlKGF0dHJzLCB2aWV3KTtcbiAgICAgICAgICAkb25zZW4ucmVnaXN0ZXJFdmVudEhhbmRsZXJzKHZpZXcsICdkZXN0cm95Jyk7XG5cbiAgICAgICAgICBlbGVtZW50LmRhdGEoJ29ucy1zcGxpdHRlci1jb250ZW50Jywgdmlldyk7XG5cbiAgICAgICAgICBlbGVtZW50WzBdLnBhZ2VMb2FkZXIgPSAkb25zZW4uY3JlYXRlUGFnZUxvYWRlcih2aWV3KTtcblxuICAgICAgICAgIHNjb3BlLiRvbignJGRlc3Ryb3knLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHZpZXcuX2V2ZW50cyA9IHVuZGVmaW5lZDtcbiAgICAgICAgICAgIGVsZW1lbnQuZGF0YSgnb25zLXNwbGl0dGVyLWNvbnRlbnQnLCB1bmRlZmluZWQpO1xuICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgJG9uc2VuLmZpcmVDb21wb25lbnRFdmVudChlbGVtZW50WzBdLCAnaW5pdCcpO1xuICAgICAgICB9O1xuICAgICAgfVxuICAgIH07XG4gIH0pO1xufSkoKTtcbiIsIi8qKlxuICogQGVsZW1lbnQgb25zLXNwbGl0dGVyLXNpZGVcbiAqL1xuXG4vKipcbiAqIEBhdHRyaWJ1dGUgdmFyXG4gKiBAaW5pdG9ubHlcbiAqIEB0eXBlIHtTdHJpbmd9XG4gKiBAZGVzY3JpcHRpb25cbiAqICAgW2VuXVZhcmlhYmxlIG5hbWUgdG8gcmVmZXIgdGhpcyBzcGxpdHRlciBzaWRlLlsvZW5dXG4gKiAgIFtqYV3jgZPjga7jgrnjg5fjg6rjg4Pjgr/jg7zjgrPjg7Pjg53jg7zjg43jg7Pjg4jjgpLlj4LnhafjgZnjgovjgZ/jgoHjga7lkI3liY3jgpLmjIflrprjgZfjgb7jgZnjgIJbL2phXVxuICovXG5cbi8qKlxuICogQGF0dHJpYnV0ZSBvbnMtZGVzdHJveVxuICogQGluaXRvbmx5XG4gKiBAdHlwZSB7RXhwcmVzc2lvbn1cbiAqIEBkZXNjcmlwdGlvblxuICogIFtlbl1BbGxvd3MgeW91IHRvIHNwZWNpZnkgY3VzdG9tIGJlaGF2aW9yIHdoZW4gdGhlIFwiZGVzdHJveVwiIGV2ZW50IGlzIGZpcmVkLlsvZW5dXG4gKiAgW2phXVwiZGVzdHJveVwi44Kk44OZ44Oz44OI44GM55m654Gr44GV44KM44Gf5pmC44Gu5oyZ5YuV44KS54us6Ieq44Gr5oyH5a6a44Gn44GN44G+44GZ44CCWy9qYV1cbiAqL1xuXG4vKipcbiAqIEBhdHRyaWJ1dGUgb25zLXByZW9wZW5cbiAqIEBpbml0b25seVxuICogQHR5cGUge0V4cHJlc3Npb259XG4gKiBAZGVzY3JpcHRpb25cbiAqICBbZW5dQWxsb3dzIHlvdSB0byBzcGVjaWZ5IGN1c3RvbSBiZWhhdmlvciB3aGVuIHRoZSBcInByZW9wZW5cIiBldmVudCBpcyBmaXJlZC5bL2VuXVxuICogIFtqYV1cInByZW9wZW5cIuOCpOODmeODs+ODiOOBjOeZuueBq+OBleOCjOOBn+aZguOBruaMmeWLleOCkueLrOiHquOBq+aMh+WumuOBp+OBjeOBvuOBmeOAglsvamFdXG4gKi9cblxuLyoqXG4gKiBAYXR0cmlidXRlIG9ucy1wcmVjbG9zZVxuICogQGluaXRvbmx5XG4gKiBAdHlwZSB7RXhwcmVzc2lvbn1cbiAqIEBkZXNjcmlwdGlvblxuICogIFtlbl1BbGxvd3MgeW91IHRvIHNwZWNpZnkgY3VzdG9tIGJlaGF2aW9yIHdoZW4gdGhlIFwicHJlY2xvc2VcIiBldmVudCBpcyBmaXJlZC5bL2VuXVxuICogIFtqYV1cInByZWNsb3NlXCLjgqTjg5njg7Pjg4jjgYznmbrngavjgZXjgozjgZ/mmYLjga7mjJnli5XjgpLni6zoh6rjgavmjIflrprjgafjgY3jgb7jgZnjgIJbL2phXVxuICovXG5cbi8qKlxuICogQGF0dHJpYnV0ZSBvbnMtcG9zdG9wZW5cbiAqIEBpbml0b25seVxuICogQHR5cGUge0V4cHJlc3Npb259XG4gKiBAZGVzY3JpcHRpb25cbiAqICBbZW5dQWxsb3dzIHlvdSB0byBzcGVjaWZ5IGN1c3RvbSBiZWhhdmlvciB3aGVuIHRoZSBcInBvc3RvcGVuXCIgZXZlbnQgaXMgZmlyZWQuWy9lbl1cbiAqICBbamFdXCJwb3N0b3Blblwi44Kk44OZ44Oz44OI44GM55m654Gr44GV44KM44Gf5pmC44Gu5oyZ5YuV44KS54us6Ieq44Gr5oyH5a6a44Gn44GN44G+44GZ44CCWy9qYV1cbiAqL1xuXG4vKipcbiAqIEBhdHRyaWJ1dGUgb25zLXBvc3RjbG9zZVxuICogQGluaXRvbmx5XG4gKiBAdHlwZSB7RXhwcmVzc2lvbn1cbiAqIEBkZXNjcmlwdGlvblxuICogIFtlbl1BbGxvd3MgeW91IHRvIHNwZWNpZnkgY3VzdG9tIGJlaGF2aW9yIHdoZW4gdGhlIFwicG9zdGNsb3NlXCIgZXZlbnQgaXMgZmlyZWQuWy9lbl1cbiAqICBbamFdXCJwb3N0Y2xvc2VcIuOCpOODmeODs+ODiOOBjOeZuueBq+OBleOCjOOBn+aZguOBruaMmeWLleOCkueLrOiHquOBq+aMh+WumuOBp+OBjeOBvuOBmeOAglsvamFdXG4gKi9cblxuLyoqXG4gKiBAYXR0cmlidXRlIG9ucy1tb2RlY2hhbmdlXG4gKiBAaW5pdG9ubHlcbiAqIEB0eXBlIHtFeHByZXNzaW9ufVxuICogQGRlc2NyaXB0aW9uXG4gKiAgW2VuXUFsbG93cyB5b3UgdG8gc3BlY2lmeSBjdXN0b20gYmVoYXZpb3Igd2hlbiB0aGUgXCJtb2RlY2hhbmdlXCIgZXZlbnQgaXMgZmlyZWQuWy9lbl1cbiAqICBbamFdXCJtb2RlY2hhbmdlXCLjgqTjg5njg7Pjg4jjgYznmbrngavjgZXjgozjgZ/mmYLjga7mjJnli5XjgpLni6zoh6rjgavmjIflrprjgafjgY3jgb7jgZnjgIJbL2phXVxuICovXG4oZnVuY3Rpb24oKSB7XG4gICd1c2Ugc3RyaWN0JztcblxuICB2YXIgbGFzdFJlYWR5ID0gd2luZG93Lm9ucy5lbGVtZW50cy5TcGxpdHRlclNpZGUucmV3cml0YWJsZXMucmVhZHk7XG4gIHdpbmRvdy5vbnMuZWxlbWVudHMuU3BsaXR0ZXJTaWRlLnJld3JpdGFibGVzLnJlYWR5ID0gb25zLl93YWl0RGlyZXRpdmVJbml0KCdvbnMtc3BsaXR0ZXItc2lkZScsIGxhc3RSZWFkeSk7XG5cbiAgYW5ndWxhci5tb2R1bGUoJ29uc2VuJykuZGlyZWN0aXZlKCdvbnNTcGxpdHRlclNpZGUnLCBmdW5jdGlvbigkY29tcGlsZSwgU3BsaXR0ZXJTaWRlLCAkb25zZW4pIHtcbiAgICByZXR1cm4ge1xuICAgICAgcmVzdHJpY3Q6ICdFJyxcblxuICAgICAgY29tcGlsZTogZnVuY3Rpb24oZWxlbWVudCwgYXR0cnMpIHtcblxuICAgICAgICByZXR1cm4gZnVuY3Rpb24oc2NvcGUsIGVsZW1lbnQsIGF0dHJzKSB7XG5cbiAgICAgICAgICB2YXIgdmlldyA9IG5ldyBTcGxpdHRlclNpZGUoc2NvcGUsIGVsZW1lbnQsIGF0dHJzKTtcblxuICAgICAgICAgICRvbnNlbi5kZWNsYXJlVmFyQXR0cmlidXRlKGF0dHJzLCB2aWV3KTtcbiAgICAgICAgICAkb25zZW4ucmVnaXN0ZXJFdmVudEhhbmRsZXJzKHZpZXcsICdkZXN0cm95IHByZW9wZW4gcHJlY2xvc2UgcG9zdG9wZW4gcG9zdGNsb3NlIG1vZGVjaGFuZ2UnKTtcblxuICAgICAgICAgIGVsZW1lbnQuZGF0YSgnb25zLXNwbGl0dGVyLXNpZGUnLCB2aWV3KTtcblxuICAgICAgICAgIGVsZW1lbnRbMF0ucGFnZUxvYWRlciA9ICRvbnNlbi5jcmVhdGVQYWdlTG9hZGVyKHZpZXcpO1xuXG4gICAgICAgICAgc2NvcGUuJG9uKCckZGVzdHJveScsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgdmlldy5fZXZlbnRzID0gdW5kZWZpbmVkO1xuICAgICAgICAgICAgZWxlbWVudC5kYXRhKCdvbnMtc3BsaXR0ZXItc2lkZScsIHVuZGVmaW5lZCk7XG4gICAgICAgICAgfSk7XG5cbiAgICAgICAgICAkb25zZW4uZmlyZUNvbXBvbmVudEV2ZW50KGVsZW1lbnRbMF0sICdpbml0Jyk7XG4gICAgICAgIH07XG4gICAgICB9XG4gICAgfTtcbiAgfSk7XG59KSgpO1xuIiwiLyoqXG4gKiBAZWxlbWVudCBvbnMtc3BsaXR0ZXJcbiAqL1xuXG4vKipcbiAqIEBhdHRyaWJ1dGUgdmFyXG4gKiBAaW5pdG9ubHlcbiAqIEB0eXBlIHtTdHJpbmd9XG4gKiBAZGVzY3JpcHRpb25cbiAqICAgW2VuXVZhcmlhYmxlIG5hbWUgdG8gcmVmZXIgdGhpcyBzcGxpdHRlci5bL2VuXVxuICogICBbamFd44GT44Gu44K544OX44Oq44OD44K/44O844Kz44Oz44Od44O844ON44Oz44OI44KS5Y+C54Wn44GZ44KL44Gf44KB44Gu5ZCN5YmN44KS5oyH5a6a44GX44G+44GZ44CCWy9qYV1cbiAqL1xuXG4vKipcbiAqIEBhdHRyaWJ1dGUgb25zLWRlc3Ryb3lcbiAqIEBpbml0b25seVxuICogQHR5cGUge0V4cHJlc3Npb259XG4gKiBAZGVzY3JpcHRpb25cbiAqICBbZW5dQWxsb3dzIHlvdSB0byBzcGVjaWZ5IGN1c3RvbSBiZWhhdmlvciB3aGVuIHRoZSBcImRlc3Ryb3lcIiBldmVudCBpcyBmaXJlZC5bL2VuXVxuICogIFtqYV1cImRlc3Ryb3lcIuOCpOODmeODs+ODiOOBjOeZuueBq+OBleOCjOOBn+aZguOBruaMmeWLleOCkueLrOiHquOBq+aMh+WumuOBp+OBjeOBvuOBmeOAglsvamFdXG4gKi9cblxuLyoqXG4gKiBAbWV0aG9kIG9uXG4gKiBAc2lnbmF0dXJlIG9uKGV2ZW50TmFtZSwgbGlzdGVuZXIpXG4gKiBAZGVzY3JpcHRpb25cbiAqICAgW2VuXUFkZCBhbiBldmVudCBsaXN0ZW5lci5bL2VuXVxuICogICBbamFd44Kk44OZ44Oz44OI44Oq44K544OK44O844KS6L+95Yqg44GX44G+44GZ44CCWy9qYV1cbiAqIEBwYXJhbSB7U3RyaW5nfSBldmVudE5hbWVcbiAqICAgW2VuXU5hbWUgb2YgdGhlIGV2ZW50LlsvZW5dXG4gKiAgIFtqYV3jgqTjg5njg7Pjg4jlkI3jgpLmjIflrprjgZfjgb7jgZnjgIJbL2phXVxuICogQHBhcmFtIHtGdW5jdGlvbn0gbGlzdGVuZXJcbiAqICAgW2VuXUZ1bmN0aW9uIHRvIGV4ZWN1dGUgd2hlbiB0aGUgZXZlbnQgaXMgdHJpZ2dlcmVkLlsvZW5dXG4gKiAgIFtqYV3jgZPjga7jgqTjg5njg7Pjg4jjgYznmbrngavjgZXjgozjgZ/pmpvjgavlkbzjgbPlh7rjgZXjgozjgovplqLmlbDjgqrjg5bjgrjjgqfjgq/jg4jjgpLmjIflrprjgZfjgb7jgZnjgIJbL2phXVxuICovXG5cbi8qKlxuICogQG1ldGhvZCBvbmNlXG4gKiBAc2lnbmF0dXJlIG9uY2UoZXZlbnROYW1lLCBsaXN0ZW5lcilcbiAqIEBkZXNjcmlwdGlvblxuICogIFtlbl1BZGQgYW4gZXZlbnQgbGlzdGVuZXIgdGhhdCdzIG9ubHkgdHJpZ2dlcmVkIG9uY2UuWy9lbl1cbiAqICBbamFd5LiA5bqm44Gg44GR5ZG844Gz5Ye644GV44KM44KL44Kk44OZ44Oz44OI44Oq44K544OK44O844KS6L+95Yqg44GX44G+44GZ44CCWy9qYV1cbiAqIEBwYXJhbSB7U3RyaW5nfSBldmVudE5hbWVcbiAqICAgW2VuXU5hbWUgb2YgdGhlIGV2ZW50LlsvZW5dXG4gKiAgIFtqYV3jgqTjg5njg7Pjg4jlkI3jgpLmjIflrprjgZfjgb7jgZnjgIJbL2phXVxuICogQHBhcmFtIHtGdW5jdGlvbn0gbGlzdGVuZXJcbiAqICAgW2VuXUZ1bmN0aW9uIHRvIGV4ZWN1dGUgd2hlbiB0aGUgZXZlbnQgaXMgdHJpZ2dlcmVkLlsvZW5dXG4gKiAgIFtqYV3jgqTjg5njg7Pjg4jjgYznmbrngavjgZfjgZ/pmpvjgavlkbzjgbPlh7rjgZXjgozjgovplqLmlbDjgqrjg5bjgrjjgqfjgq/jg4jjgpLmjIflrprjgZfjgb7jgZnjgIJbL2phXVxuICovXG5cbi8qKlxuICogQG1ldGhvZCBvZmZcbiAqIEBzaWduYXR1cmUgb2ZmKGV2ZW50TmFtZSwgW2xpc3RlbmVyXSlcbiAqIEBkZXNjcmlwdGlvblxuICogIFtlbl1SZW1vdmUgYW4gZXZlbnQgbGlzdGVuZXIuIElmIHRoZSBsaXN0ZW5lciBpcyBub3Qgc3BlY2lmaWVkIGFsbCBsaXN0ZW5lcnMgZm9yIHRoZSBldmVudCB0eXBlIHdpbGwgYmUgcmVtb3ZlZC5bL2VuXVxuICogIFtqYV3jgqTjg5njg7Pjg4jjg6rjgrnjg4rjg7zjgpLliYrpmaTjgZfjgb7jgZnjgILjgoLjgZfjgqTjg5njg7Pjg4jjg6rjgrnjg4rjg7zjgpLmjIflrprjgZfjgarjgYvjgaPjgZ/loLTlkIjjgavjga/jgIHjgZ3jga7jgqTjg5njg7Pjg4jjgavntJDjgaXjgY/lhajjgabjga7jgqTjg5njg7Pjg4jjg6rjgrnjg4rjg7zjgYzliYrpmaTjgZXjgozjgb7jgZnjgIJbL2phXVxuICogQHBhcmFtIHtTdHJpbmd9IGV2ZW50TmFtZVxuICogICBbZW5dTmFtZSBvZiB0aGUgZXZlbnQuWy9lbl1cbiAqICAgW2phXeOCpOODmeODs+ODiOWQjeOCkuaMh+WumuOBl+OBvuOBmeOAglsvamFdXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBsaXN0ZW5lclxuICogICBbZW5dRnVuY3Rpb24gdG8gZXhlY3V0ZSB3aGVuIHRoZSBldmVudCBpcyB0cmlnZ2VyZWQuWy9lbl1cbiAqICAgW2phXeWJiumZpOOBmeOCi+OCpOODmeODs+ODiOODquOCueODiuODvOOCkuaMh+WumuOBl+OBvuOBmeOAglsvamFdXG4gKi9cblxuKGZ1bmN0aW9uKCkge1xuICAndXNlIHN0cmljdCc7XG5cbiAgYW5ndWxhci5tb2R1bGUoJ29uc2VuJykuZGlyZWN0aXZlKCdvbnNTcGxpdHRlcicsIGZ1bmN0aW9uKCRjb21waWxlLCBTcGxpdHRlciwgJG9uc2VuKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHJlc3RyaWN0OiAnRScsXG4gICAgICBzY29wZTogdHJ1ZSxcblxuICAgICAgY29tcGlsZTogZnVuY3Rpb24oZWxlbWVudCwgYXR0cnMpIHtcblxuICAgICAgICByZXR1cm4gZnVuY3Rpb24oc2NvcGUsIGVsZW1lbnQsIGF0dHJzKSB7XG5cbiAgICAgICAgICB2YXIgc3BsaXR0ZXIgPSBuZXcgU3BsaXR0ZXIoc2NvcGUsIGVsZW1lbnQsIGF0dHJzKTtcblxuICAgICAgICAgICRvbnNlbi5kZWNsYXJlVmFyQXR0cmlidXRlKGF0dHJzLCBzcGxpdHRlcik7XG4gICAgICAgICAgJG9uc2VuLnJlZ2lzdGVyRXZlbnRIYW5kbGVycyhzcGxpdHRlciwgJ2Rlc3Ryb3knKTtcblxuICAgICAgICAgIGVsZW1lbnQuZGF0YSgnb25zLXNwbGl0dGVyJywgc3BsaXR0ZXIpO1xuXG4gICAgICAgICAgc2NvcGUuJG9uKCckZGVzdHJveScsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgc3BsaXR0ZXIuX2V2ZW50cyA9IHVuZGVmaW5lZDtcbiAgICAgICAgICAgIGVsZW1lbnQuZGF0YSgnb25zLXNwbGl0dGVyJywgdW5kZWZpbmVkKTtcbiAgICAgICAgICB9KTtcblxuICAgICAgICAgICRvbnNlbi5maXJlQ29tcG9uZW50RXZlbnQoZWxlbWVudFswXSwgJ2luaXQnKTtcbiAgICAgICAgfTtcbiAgICAgIH1cbiAgICB9O1xuICB9KTtcbn0pKCk7XG4iLCIvKipcbiAqIEBlbGVtZW50IG9ucy1zd2l0Y2hcbiAqL1xuXG4vKipcbiAqIEBhdHRyaWJ1dGUgdmFyXG4gKiBAaW5pdG9ubHlcbiAqIEB0eXBlIHtTdHJpbmd9XG4gKiBAZGVzY3JpcHRpb25cbiAqICAgW2VuXVZhcmlhYmxlIG5hbWUgdG8gcmVmZXIgdGhpcyBzd2l0Y2guWy9lbl1cbiAqICAgW2phXUphdmFTY3JpcHTjgYvjgonlj4LnhafjgZnjgovjgZ/jgoHjga7lpInmlbDlkI3jgpLmjIflrprjgZfjgb7jgZnjgIJbL2phXVxuICovXG5cbi8qKlxuICogQG1ldGhvZCBvblxuICogQHNpZ25hdHVyZSBvbihldmVudE5hbWUsIGxpc3RlbmVyKVxuICogQGRlc2NyaXB0aW9uXG4gKiAgIFtlbl1BZGQgYW4gZXZlbnQgbGlzdGVuZXIuWy9lbl1cbiAqICAgW2phXeOCpOODmeODs+ODiOODquOCueODiuODvOOCkui/veWKoOOBl+OBvuOBmeOAglsvamFdXG4gKiBAcGFyYW0ge1N0cmluZ30gZXZlbnROYW1lXG4gKiAgIFtlbl1OYW1lIG9mIHRoZSBldmVudC5bL2VuXVxuICogICBbamFd44Kk44OZ44Oz44OI5ZCN44KS5oyH5a6a44GX44G+44GZ44CCWy9qYV1cbiAqIEBwYXJhbSB7RnVuY3Rpb259IGxpc3RlbmVyXG4gKiAgIFtlbl1GdW5jdGlvbiB0byBleGVjdXRlIHdoZW4gdGhlIGV2ZW50IGlzIHRyaWdnZXJlZC5bL2VuXVxuICogICBbamFd44GT44Gu44Kk44OZ44Oz44OI44GM55m654Gr44GV44KM44Gf6Zqb44Gr5ZG844Gz5Ye644GV44KM44KL6Zai5pWw44Kq44OW44K444Kn44Kv44OI44KS5oyH5a6a44GX44G+44GZ44CCWy9qYV1cbiAqL1xuXG4vKipcbiAqIEBtZXRob2Qgb25jZVxuICogQHNpZ25hdHVyZSBvbmNlKGV2ZW50TmFtZSwgbGlzdGVuZXIpXG4gKiBAZGVzY3JpcHRpb25cbiAqICBbZW5dQWRkIGFuIGV2ZW50IGxpc3RlbmVyIHRoYXQncyBvbmx5IHRyaWdnZXJlZCBvbmNlLlsvZW5dXG4gKiAgW2phXeS4gOW6puOBoOOBkeWRvOOBs+WHuuOBleOCjOOCi+OCpOODmeODs+ODiOODquOCueODiuODvOOCkui/veWKoOOBl+OBvuOBmeOAglsvamFdXG4gKiBAcGFyYW0ge1N0cmluZ30gZXZlbnROYW1lXG4gKiAgIFtlbl1OYW1lIG9mIHRoZSBldmVudC5bL2VuXVxuICogICBbamFd44Kk44OZ44Oz44OI5ZCN44KS5oyH5a6a44GX44G+44GZ44CCWy9qYV1cbiAqIEBwYXJhbSB7RnVuY3Rpb259IGxpc3RlbmVyXG4gKiAgIFtlbl1GdW5jdGlvbiB0byBleGVjdXRlIHdoZW4gdGhlIGV2ZW50IGlzIHRyaWdnZXJlZC5bL2VuXVxuICogICBbamFd44Kk44OZ44Oz44OI44GM55m654Gr44GX44Gf6Zqb44Gr5ZG844Gz5Ye644GV44KM44KL6Zai5pWw44Kq44OW44K444Kn44Kv44OI44KS5oyH5a6a44GX44G+44GZ44CCWy9qYV1cbiAqL1xuXG4vKipcbiAqIEBtZXRob2Qgb2ZmXG4gKiBAc2lnbmF0dXJlIG9mZihldmVudE5hbWUsIFtsaXN0ZW5lcl0pXG4gKiBAZGVzY3JpcHRpb25cbiAqICBbZW5dUmVtb3ZlIGFuIGV2ZW50IGxpc3RlbmVyLiBJZiB0aGUgbGlzdGVuZXIgaXMgbm90IHNwZWNpZmllZCBhbGwgbGlzdGVuZXJzIGZvciB0aGUgZXZlbnQgdHlwZSB3aWxsIGJlIHJlbW92ZWQuWy9lbl1cbiAqICBbamFd44Kk44OZ44Oz44OI44Oq44K544OK44O844KS5YmK6Zmk44GX44G+44GZ44CC44KC44GX44Kk44OZ44Oz44OI44Oq44K544OK44O844KS5oyH5a6a44GX44Gq44GL44Gj44Gf5aC05ZCI44Gr44Gv44CB44Gd44Gu44Kk44OZ44Oz44OI44Gr57SQ44Gl44GP5YWo44Gm44Gu44Kk44OZ44Oz44OI44Oq44K544OK44O844GM5YmK6Zmk44GV44KM44G+44GZ44CCWy9qYV1cbiAqIEBwYXJhbSB7U3RyaW5nfSBldmVudE5hbWVcbiAqICAgW2VuXU5hbWUgb2YgdGhlIGV2ZW50LlsvZW5dXG4gKiAgIFtqYV3jgqTjg5njg7Pjg4jlkI3jgpLmjIflrprjgZfjgb7jgZnjgIJbL2phXVxuICogQHBhcmFtIHtGdW5jdGlvbn0gbGlzdGVuZXJcbiAqICAgW2VuXUZ1bmN0aW9uIHRvIGV4ZWN1dGUgd2hlbiB0aGUgZXZlbnQgaXMgdHJpZ2dlcmVkLlsvZW5dXG4gKiAgIFtqYV3liYrpmaTjgZnjgovjgqTjg5njg7Pjg4jjg6rjgrnjg4rjg7zjgpLmjIflrprjgZfjgb7jgZnjgIJbL2phXVxuICovXG5cbihmdW5jdGlvbigpe1xuICAndXNlIHN0cmljdCc7XG5cbiAgYW5ndWxhci5tb2R1bGUoJ29uc2VuJykuZGlyZWN0aXZlKCdvbnNTd2l0Y2gnLCBmdW5jdGlvbigkb25zZW4sIFN3aXRjaFZpZXcpIHtcbiAgICByZXR1cm4ge1xuICAgICAgcmVzdHJpY3Q6ICdFJyxcbiAgICAgIHJlcGxhY2U6IGZhbHNlLFxuICAgICAgc2NvcGU6IHRydWUsXG5cbiAgICAgIGxpbms6IGZ1bmN0aW9uKHNjb3BlLCBlbGVtZW50LCBhdHRycykge1xuXG4gICAgICAgIGlmIChhdHRycy5uZ0NvbnRyb2xsZXIpIHtcbiAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1RoaXMgZWxlbWVudCBjYW5cXCd0IGFjY2VwdCBuZy1jb250cm9sbGVyIGRpcmVjdGl2ZS4nKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciBzd2l0Y2hWaWV3ID0gbmV3IFN3aXRjaFZpZXcoZWxlbWVudCwgc2NvcGUsIGF0dHJzKTtcbiAgICAgICAgJG9uc2VuLmFkZE1vZGlmaWVyTWV0aG9kc0ZvckN1c3RvbUVsZW1lbnRzKHN3aXRjaFZpZXcsIGVsZW1lbnQpO1xuXG4gICAgICAgICRvbnNlbi5kZWNsYXJlVmFyQXR0cmlidXRlKGF0dHJzLCBzd2l0Y2hWaWV3KTtcbiAgICAgICAgZWxlbWVudC5kYXRhKCdvbnMtc3dpdGNoJywgc3dpdGNoVmlldyk7XG5cbiAgICAgICAgJG9uc2VuLmNsZWFuZXIub25EZXN0cm95KHNjb3BlLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICBzd2l0Y2hWaWV3Ll9ldmVudHMgPSB1bmRlZmluZWQ7XG4gICAgICAgICAgJG9uc2VuLnJlbW92ZU1vZGlmaWVyTWV0aG9kcyhzd2l0Y2hWaWV3KTtcbiAgICAgICAgICBlbGVtZW50LmRhdGEoJ29ucy1zd2l0Y2gnLCB1bmRlZmluZWQpO1xuICAgICAgICAgICRvbnNlbi5jbGVhckNvbXBvbmVudCh7XG4gICAgICAgICAgICBlbGVtZW50OiBlbGVtZW50LFxuICAgICAgICAgICAgc2NvcGU6IHNjb3BlLFxuICAgICAgICAgICAgYXR0cnM6IGF0dHJzXG4gICAgICAgICAgfSk7XG4gICAgICAgICAgZWxlbWVudCA9IGF0dHJzID0gc2NvcGUgPSBudWxsO1xuICAgICAgICB9KTtcblxuICAgICAgICAkb25zZW4uZmlyZUNvbXBvbmVudEV2ZW50KGVsZW1lbnRbMF0sICdpbml0Jyk7XG4gICAgICB9XG4gICAgfTtcbiAgfSk7XG59KSgpO1xuIiwiLyoqXG4gKiBAZWxlbWVudCBvbnMtdGFiYmFyXG4gKi9cblxuLyoqXG4gKiBAYXR0cmlidXRlIHZhclxuICogQGluaXRvbmx5XG4gKiBAdHlwZSB7U3RyaW5nfVxuICogQGRlc2NyaXB0aW9uXG4gKiAgIFtlbl1WYXJpYWJsZSBuYW1lIHRvIHJlZmVyIHRoaXMgdGFiIGJhci5bL2VuXVxuICogICBbamFd44GT44Gu44K/44OW44OQ44O844KS5Y+C54Wn44GZ44KL44Gf44KB44Gu5ZCN5YmN44KS5oyH5a6a44GX44G+44GZ44CCWy9qYV1cbiAqL1xuXG4vKipcbiAqIEBhdHRyaWJ1dGUgb25zLXJlYWN0aXZlXG4gKiBAaW5pdG9ubHlcbiAqIEB0eXBlIHtFeHByZXNzaW9ufVxuICogQGRlc2NyaXB0aW9uXG4gKiAgW2VuXUFsbG93cyB5b3UgdG8gc3BlY2lmeSBjdXN0b20gYmVoYXZpb3Igd2hlbiB0aGUgXCJyZWFjdGl2ZVwiIGV2ZW50IGlzIGZpcmVkLlsvZW5dXG4gKiAgW2phXVwicmVhY3RpdmVcIuOCpOODmeODs+ODiOOBjOeZuueBq+OBleOCjOOBn+aZguOBruaMmeWLleOCkueLrOiHquOBq+aMh+WumuOBp+OBjeOBvuOBmeOAglsvamFdXG4gKi9cblxuLyoqXG4gKiBAYXR0cmlidXRlIG9ucy1wcmVjaGFuZ2VcbiAqIEBpbml0b25seVxuICogQHR5cGUge0V4cHJlc3Npb259XG4gKiBAZGVzY3JpcHRpb25cbiAqICBbZW5dQWxsb3dzIHlvdSB0byBzcGVjaWZ5IGN1c3RvbSBiZWhhdmlvciB3aGVuIHRoZSBcInByZWNoYW5nZVwiIGV2ZW50IGlzIGZpcmVkLlsvZW5dXG4gKiAgW2phXVwicHJlY2hhbmdlXCLjgqTjg5njg7Pjg4jjgYznmbrngavjgZXjgozjgZ/mmYLjga7mjJnli5XjgpLni6zoh6rjgavmjIflrprjgafjgY3jgb7jgZnjgIJbL2phXVxuICovXG5cbi8qKlxuICogQGF0dHJpYnV0ZSBvbnMtcG9zdGNoYW5nZVxuICogQGluaXRvbmx5XG4gKiBAdHlwZSB7RXhwcmVzc2lvbn1cbiAqIEBkZXNjcmlwdGlvblxuICogIFtlbl1BbGxvd3MgeW91IHRvIHNwZWNpZnkgY3VzdG9tIGJlaGF2aW9yIHdoZW4gdGhlIFwicG9zdGNoYW5nZVwiIGV2ZW50IGlzIGZpcmVkLlsvZW5dXG4gKiAgW2phXVwicG9zdGNoYW5nZVwi44Kk44OZ44Oz44OI44GM55m654Gr44GV44KM44Gf5pmC44Gu5oyZ5YuV44KS54us6Ieq44Gr5oyH5a6a44Gn44GN44G+44GZ44CCWy9qYV1cbiAqL1xuXG4vKipcbiAqIEBhdHRyaWJ1dGUgb25zLWluaXRcbiAqIEBpbml0b25seVxuICogQHR5cGUge0V4cHJlc3Npb259XG4gKiBAZGVzY3JpcHRpb25cbiAqICBbZW5dQWxsb3dzIHlvdSB0byBzcGVjaWZ5IGN1c3RvbSBiZWhhdmlvciB3aGVuIGEgcGFnZSdzIFwiaW5pdFwiIGV2ZW50IGlzIGZpcmVkLlsvZW5dXG4gKiAgW2phXeODmuODvOOCuOOBrlwiaW5pdFwi44Kk44OZ44Oz44OI44GM55m654Gr44GV44KM44Gf5pmC44Gu5oyZ5YuV44KS54us6Ieq44Gr5oyH5a6a44Gn44GN44G+44GZ44CCWy9qYV1cbiAqL1xuXG4vKipcbiAqIEBhdHRyaWJ1dGUgb25zLXNob3dcbiAqIEBpbml0b25seVxuICogQHR5cGUge0V4cHJlc3Npb259XG4gKiBAZGVzY3JpcHRpb25cbiAqICBbZW5dQWxsb3dzIHlvdSB0byBzcGVjaWZ5IGN1c3RvbSBiZWhhdmlvciB3aGVuIGEgcGFnZSdzIFwic2hvd1wiIGV2ZW50IGlzIGZpcmVkLlsvZW5dXG4gKiAgW2phXeODmuODvOOCuOOBrlwic2hvd1wi44Kk44OZ44Oz44OI44GM55m654Gr44GV44KM44Gf5pmC44Gu5oyZ5YuV44KS54us6Ieq44Gr5oyH5a6a44Gn44GN44G+44GZ44CCWy9qYV1cbiAqL1xuXG4vKipcbiAqIEBhdHRyaWJ1dGUgb25zLWhpZGVcbiAqIEBpbml0b25seVxuICogQHR5cGUge0V4cHJlc3Npb259XG4gKiBAZGVzY3JpcHRpb25cbiAqICBbZW5dQWxsb3dzIHlvdSB0byBzcGVjaWZ5IGN1c3RvbSBiZWhhdmlvciB3aGVuIGEgcGFnZSdzIFwiaGlkZVwiIGV2ZW50IGlzIGZpcmVkLlsvZW5dXG4gKiAgW2phXeODmuODvOOCuOOBrlwiaGlkZVwi44Kk44OZ44Oz44OI44GM55m654Gr44GV44KM44Gf5pmC44Gu5oyZ5YuV44KS54us6Ieq44Gr5oyH5a6a44Gn44GN44G+44GZ44CCWy9qYV1cbiAqL1xuXG4vKipcbiAqIEBhdHRyaWJ1dGUgb25zLWRlc3Ryb3lcbiAqIEBpbml0b25seVxuICogQHR5cGUge0V4cHJlc3Npb259XG4gKiBAZGVzY3JpcHRpb25cbiAqICBbZW5dQWxsb3dzIHlvdSB0byBzcGVjaWZ5IGN1c3RvbSBiZWhhdmlvciB3aGVuIGEgcGFnZSdzIFwiZGVzdHJveVwiIGV2ZW50IGlzIGZpcmVkLlsvZW5dXG4gKiAgW2phXeODmuODvOOCuOOBrlwiZGVzdHJveVwi44Kk44OZ44Oz44OI44GM55m654Gr44GV44KM44Gf5pmC44Gu5oyZ5YuV44KS54us6Ieq44Gr5oyH5a6a44Gn44GN44G+44GZ44CCWy9qYV1cbiAqL1xuXG5cbi8qKlxuICogQG1ldGhvZCBvblxuICogQHNpZ25hdHVyZSBvbihldmVudE5hbWUsIGxpc3RlbmVyKVxuICogQGRlc2NyaXB0aW9uXG4gKiAgIFtlbl1BZGQgYW4gZXZlbnQgbGlzdGVuZXIuWy9lbl1cbiAqICAgW2phXeOCpOODmeODs+ODiOODquOCueODiuODvOOCkui/veWKoOOBl+OBvuOBmeOAglsvamFdXG4gKiBAcGFyYW0ge1N0cmluZ30gZXZlbnROYW1lXG4gKiAgIFtlbl1OYW1lIG9mIHRoZSBldmVudC5bL2VuXVxuICogICBbamFd44Kk44OZ44Oz44OI5ZCN44KS5oyH5a6a44GX44G+44GZ44CCWy9qYV1cbiAqIEBwYXJhbSB7RnVuY3Rpb259IGxpc3RlbmVyXG4gKiAgIFtlbl1GdW5jdGlvbiB0byBleGVjdXRlIHdoZW4gdGhlIGV2ZW50IGlzIHRyaWdnZXJlZC5bL2VuXVxuICogICBbamFd44GT44Gu44Kk44OZ44Oz44OI44GM55m654Gr44GV44KM44Gf6Zqb44Gr5ZG844Gz5Ye644GV44KM44KL6Zai5pWw44Kq44OW44K444Kn44Kv44OI44KS5oyH5a6a44GX44G+44GZ44CCWy9qYV1cbiAqL1xuXG4vKipcbiAqIEBtZXRob2Qgb25jZVxuICogQHNpZ25hdHVyZSBvbmNlKGV2ZW50TmFtZSwgbGlzdGVuZXIpXG4gKiBAZGVzY3JpcHRpb25cbiAqICBbZW5dQWRkIGFuIGV2ZW50IGxpc3RlbmVyIHRoYXQncyBvbmx5IHRyaWdnZXJlZCBvbmNlLlsvZW5dXG4gKiAgW2phXeS4gOW6puOBoOOBkeWRvOOBs+WHuuOBleOCjOOCi+OCpOODmeODs+ODiOODquOCueODiuODvOOCkui/veWKoOOBl+OBvuOBmeOAglsvamFdXG4gKiBAcGFyYW0ge1N0cmluZ30gZXZlbnROYW1lXG4gKiAgIFtlbl1OYW1lIG9mIHRoZSBldmVudC5bL2VuXVxuICogICBbamFd44Kk44OZ44Oz44OI5ZCN44KS5oyH5a6a44GX44G+44GZ44CCWy9qYV1cbiAqIEBwYXJhbSB7RnVuY3Rpb259IGxpc3RlbmVyXG4gKiAgIFtlbl1GdW5jdGlvbiB0byBleGVjdXRlIHdoZW4gdGhlIGV2ZW50IGlzIHRyaWdnZXJlZC5bL2VuXVxuICogICBbamFd44Kk44OZ44Oz44OI44GM55m654Gr44GX44Gf6Zqb44Gr5ZG844Gz5Ye644GV44KM44KL6Zai5pWw44Kq44OW44K444Kn44Kv44OI44KS5oyH5a6a44GX44G+44GZ44CCWy9qYV1cbiAqL1xuXG4vKipcbiAqIEBtZXRob2Qgb2ZmXG4gKiBAc2lnbmF0dXJlIG9mZihldmVudE5hbWUsIFtsaXN0ZW5lcl0pXG4gKiBAZGVzY3JpcHRpb25cbiAqICBbZW5dUmVtb3ZlIGFuIGV2ZW50IGxpc3RlbmVyLiBJZiB0aGUgbGlzdGVuZXIgaXMgbm90IHNwZWNpZmllZCBhbGwgbGlzdGVuZXJzIGZvciB0aGUgZXZlbnQgdHlwZSB3aWxsIGJlIHJlbW92ZWQuWy9lbl1cbiAqICBbamFd44Kk44OZ44Oz44OI44Oq44K544OK44O844KS5YmK6Zmk44GX44G+44GZ44CC44KC44GX44Kk44OZ44Oz44OI44Oq44K544OK44O844KS5oyH5a6a44GX44Gq44GL44Gj44Gf5aC05ZCI44Gr44Gv44CB44Gd44Gu44Kk44OZ44Oz44OI44Gr57SQ44Gl44GP5YWo44Gm44Gu44Kk44OZ44Oz44OI44Oq44K544OK44O844GM5YmK6Zmk44GV44KM44G+44GZ44CCWy9qYV1cbiAqIEBwYXJhbSB7U3RyaW5nfSBldmVudE5hbWVcbiAqICAgW2VuXU5hbWUgb2YgdGhlIGV2ZW50LlsvZW5dXG4gKiAgIFtqYV3jgqTjg5njg7Pjg4jlkI3jgpLmjIflrprjgZfjgb7jgZnjgIJbL2phXVxuICogQHBhcmFtIHtGdW5jdGlvbn0gbGlzdGVuZXJcbiAqICAgW2VuXUZ1bmN0aW9uIHRvIGV4ZWN1dGUgd2hlbiB0aGUgZXZlbnQgaXMgdHJpZ2dlcmVkLlsvZW5dXG4gKiAgIFtqYV3liYrpmaTjgZnjgovjgqTjg5njg7Pjg4jjg6rjgrnjg4rjg7zjgpLmjIflrprjgZfjgb7jgZnjgIJbL2phXVxuICovXG5cbihmdW5jdGlvbigpIHtcbiAgJ3VzZSBzdHJpY3QnO1xuXG4gIHZhciBsYXN0UmVhZHkgPSB3aW5kb3cub25zLmVsZW1lbnRzLlRhYmJhci5yZXdyaXRhYmxlcy5yZWFkeTtcbiAgd2luZG93Lm9ucy5lbGVtZW50cy5UYWJiYXIucmV3cml0YWJsZXMucmVhZHkgPSBvbnMuX3dhaXREaXJldGl2ZUluaXQoJ29ucy10YWJiYXInLCBsYXN0UmVhZHkpO1xuXG4gIGFuZ3VsYXIubW9kdWxlKCdvbnNlbicpLmRpcmVjdGl2ZSgnb25zVGFiYmFyJywgZnVuY3Rpb24oJG9uc2VuLCAkY29tcGlsZSwgJHBhcnNlLCBUYWJiYXJWaWV3KSB7XG5cbiAgICByZXR1cm4ge1xuICAgICAgcmVzdHJpY3Q6ICdFJyxcblxuICAgICAgcmVwbGFjZTogZmFsc2UsXG4gICAgICBzY29wZTogdHJ1ZSxcblxuICAgICAgbGluazogZnVuY3Rpb24oc2NvcGUsIGVsZW1lbnQsIGF0dHJzLCBjb250cm9sbGVyKSB7XG4gICAgICAgIHZhciB0YWJiYXJWaWV3ID0gbmV3IFRhYmJhclZpZXcoc2NvcGUsIGVsZW1lbnQsIGF0dHJzKTtcbiAgICAgICAgJG9uc2VuLmFkZE1vZGlmaWVyTWV0aG9kc0ZvckN1c3RvbUVsZW1lbnRzKHRhYmJhclZpZXcsIGVsZW1lbnQpO1xuXG4gICAgICAgICRvbnNlbi5yZWdpc3RlckV2ZW50SGFuZGxlcnModGFiYmFyVmlldywgJ3JlYWN0aXZlIHByZWNoYW5nZSBwb3N0Y2hhbmdlIGluaXQgc2hvdyBoaWRlIGRlc3Ryb3knKTtcblxuICAgICAgICBlbGVtZW50LmRhdGEoJ29ucy10YWJiYXInLCB0YWJiYXJWaWV3KTtcbiAgICAgICAgJG9uc2VuLmRlY2xhcmVWYXJBdHRyaWJ1dGUoYXR0cnMsIHRhYmJhclZpZXcpO1xuXG4gICAgICAgIHNjb3BlLiRvbignJGRlc3Ryb3knLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICB0YWJiYXJWaWV3Ll9ldmVudHMgPSB1bmRlZmluZWQ7XG4gICAgICAgICAgJG9uc2VuLnJlbW92ZU1vZGlmaWVyTWV0aG9kcyh0YWJiYXJWaWV3KTtcbiAgICAgICAgICBlbGVtZW50LmRhdGEoJ29ucy10YWJiYXInLCB1bmRlZmluZWQpO1xuICAgICAgICB9KTtcblxuICAgICAgICAkb25zZW4uZmlyZUNvbXBvbmVudEV2ZW50KGVsZW1lbnRbMF0sICdpbml0Jyk7XG4gICAgICB9XG4gICAgfTtcbiAgfSk7XG59KSgpO1xuIiwiKGZ1bmN0aW9uKCkge1xuICAndXNlIHN0cmljdCc7XG5cbiAgYW5ndWxhci5tb2R1bGUoJ29uc2VuJylcbiAgICAuZGlyZWN0aXZlKCdvbnNUYWInLCB0YWIpXG4gICAgLmRpcmVjdGl2ZSgnb25zVGFiYmFySXRlbScsIHRhYik7IC8vIGZvciBCQ1xuXG4gIGZ1bmN0aW9uIHRhYigkb25zZW4sIEdlbmVyaWNWaWV3KSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHJlc3RyaWN0OiAnRScsXG4gICAgICBsaW5rOiBmdW5jdGlvbihzY29wZSwgZWxlbWVudCwgYXR0cnMpIHtcbiAgICAgICAgdmFyIHZpZXcgPSBHZW5lcmljVmlldy5yZWdpc3RlcihzY29wZSwgZWxlbWVudCwgYXR0cnMsIHt2aWV3S2V5OiAnb25zLXRhYid9KTtcbiAgICAgICAgZWxlbWVudFswXS5wYWdlTG9hZGVyID0gJG9uc2VuLmNyZWF0ZVBhZ2VMb2FkZXIodmlldyk7XG5cbiAgICAgICAgJG9uc2VuLmZpcmVDb21wb25lbnRFdmVudChlbGVtZW50WzBdLCAnaW5pdCcpO1xuICAgICAgfVxuICAgIH07XG4gIH1cbn0pKCk7XG4iLCIoZnVuY3Rpb24oKXtcbiAgJ3VzZSBzdHJpY3QnO1xuXG4gIGFuZ3VsYXIubW9kdWxlKCdvbnNlbicpLmRpcmVjdGl2ZSgnb25zVGVtcGxhdGUnLCBmdW5jdGlvbigkdGVtcGxhdGVDYWNoZSkge1xuICAgIHJldHVybiB7XG4gICAgICByZXN0cmljdDogJ0UnLFxuICAgICAgdGVybWluYWw6IHRydWUsXG4gICAgICBjb21waWxlOiBmdW5jdGlvbihlbGVtZW50KSB7XG4gICAgICAgIHZhciBjb250ZW50ID0gZWxlbWVudFswXS50ZW1wbGF0ZSB8fCBlbGVtZW50Lmh0bWwoKTtcbiAgICAgICAgJHRlbXBsYXRlQ2FjaGUucHV0KGVsZW1lbnQuYXR0cignaWQnKSwgY29udGVudCk7XG4gICAgICB9XG4gICAgfTtcbiAgfSk7XG59KSgpO1xuIiwiLyoqXG4gKiBAZWxlbWVudCBvbnMtdG9hc3RcbiAqL1xuXG4vKipcbiAqIEBhdHRyaWJ1dGUgdmFyXG4gKiBAaW5pdG9ubHlcbiAqIEB0eXBlIHtTdHJpbmd9XG4gKiBAZGVzY3JpcHRpb25cbiAqICBbZW5dVmFyaWFibGUgbmFtZSB0byByZWZlciB0aGlzIHRvYXN0IGRpYWxvZy5bL2VuXVxuICogIFtqYV3jgZPjga7jg4jjg7zjgrnjg4jjgpLlj4LnhafjgZnjgovjgZ/jgoHjga7lkI3liY3jgpLmjIflrprjgZfjgb7jgZnjgIJbL2phXVxuICovXG5cbi8qKlxuICogQGF0dHJpYnV0ZSBvbnMtcHJlc2hvd1xuICogQGluaXRvbmx5XG4gKiBAdHlwZSB7RXhwcmVzc2lvbn1cbiAqIEBkZXNjcmlwdGlvblxuICogIFtlbl1BbGxvd3MgeW91IHRvIHNwZWNpZnkgY3VzdG9tIGJlaGF2aW9yIHdoZW4gdGhlIFwicHJlc2hvd1wiIGV2ZW50IGlzIGZpcmVkLlsvZW5dXG4gKiAgW2phXVwicHJlc2hvd1wi44Kk44OZ44Oz44OI44GM55m654Gr44GV44KM44Gf5pmC44Gu5oyZ5YuV44KS54us6Ieq44Gr5oyH5a6a44Gn44GN44G+44GZ44CCWy9qYV1cbiAqL1xuXG4vKipcbiAqIEBhdHRyaWJ1dGUgb25zLXByZWhpZGVcbiAqIEBpbml0b25seVxuICogQHR5cGUge0V4cHJlc3Npb259XG4gKiBAZGVzY3JpcHRpb25cbiAqICBbZW5dQWxsb3dzIHlvdSB0byBzcGVjaWZ5IGN1c3RvbSBiZWhhdmlvciB3aGVuIHRoZSBcInByZWhpZGVcIiBldmVudCBpcyBmaXJlZC5bL2VuXVxuICogIFtqYV1cInByZWhpZGVcIuOCpOODmeODs+ODiOOBjOeZuueBq+OBleOCjOOBn+aZguOBruaMmeWLleOCkueLrOiHquOBq+aMh+WumuOBp+OBjeOBvuOBmeOAglsvamFdXG4gKi9cblxuLyoqXG4gKiBAYXR0cmlidXRlIG9ucy1wb3N0c2hvd1xuICogQGluaXRvbmx5XG4gKiBAdHlwZSB7RXhwcmVzc2lvbn1cbiAqIEBkZXNjcmlwdGlvblxuICogIFtlbl1BbGxvd3MgeW91IHRvIHNwZWNpZnkgY3VzdG9tIGJlaGF2aW9yIHdoZW4gdGhlIFwicG9zdHNob3dcIiBldmVudCBpcyBmaXJlZC5bL2VuXVxuICogIFtqYV1cInBvc3RzaG93XCLjgqTjg5njg7Pjg4jjgYznmbrngavjgZXjgozjgZ/mmYLjga7mjJnli5XjgpLni6zoh6rjgavmjIflrprjgafjgY3jgb7jgZnjgIJbL2phXVxuICovXG5cbi8qKlxuICogQGF0dHJpYnV0ZSBvbnMtcG9zdGhpZGVcbiAqIEBpbml0b25seVxuICogQHR5cGUge0V4cHJlc3Npb259XG4gKiBAZGVzY3JpcHRpb25cbiAqICBbZW5dQWxsb3dzIHlvdSB0byBzcGVjaWZ5IGN1c3RvbSBiZWhhdmlvciB3aGVuIHRoZSBcInBvc3RoaWRlXCIgZXZlbnQgaXMgZmlyZWQuWy9lbl1cbiAqICBbamFdXCJwb3N0aGlkZVwi44Kk44OZ44Oz44OI44GM55m654Gr44GV44KM44Gf5pmC44Gu5oyZ5YuV44KS54us6Ieq44Gr5oyH5a6a44Gn44GN44G+44GZ44CCWy9qYV1cbiAqL1xuXG4vKipcbiAqIEBhdHRyaWJ1dGUgb25zLWRlc3Ryb3lcbiAqIEBpbml0b25seVxuICogQHR5cGUge0V4cHJlc3Npb259XG4gKiBAZGVzY3JpcHRpb25cbiAqICBbZW5dQWxsb3dzIHlvdSB0byBzcGVjaWZ5IGN1c3RvbSBiZWhhdmlvciB3aGVuIHRoZSBcImRlc3Ryb3lcIiBldmVudCBpcyBmaXJlZC5bL2VuXVxuICogIFtqYV1cImRlc3Ryb3lcIuOCpOODmeODs+ODiOOBjOeZuueBq+OBleOCjOOBn+aZguOBruaMmeWLleOCkueLrOiHquOBq+aMh+WumuOBp+OBjeOBvuOBmeOAglsvamFdXG4gKi9cblxuLyoqXG4gKiBAbWV0aG9kIG9uXG4gKiBAc2lnbmF0dXJlIG9uKGV2ZW50TmFtZSwgbGlzdGVuZXIpXG4gKiBAZGVzY3JpcHRpb25cbiAqICAgW2VuXUFkZCBhbiBldmVudCBsaXN0ZW5lci5bL2VuXVxuICogICBbamFd44Kk44OZ44Oz44OI44Oq44K544OK44O844KS6L+95Yqg44GX44G+44GZ44CCWy9qYV1cbiAqIEBwYXJhbSB7U3RyaW5nfSBldmVudE5hbWVcbiAqICAgW2VuXU5hbWUgb2YgdGhlIGV2ZW50LlsvZW5dXG4gKiAgIFtqYV3jgqTjg5njg7Pjg4jlkI3jgpLmjIflrprjgZfjgb7jgZnjgIJbL2phXVxuICogQHBhcmFtIHtGdW5jdGlvbn0gbGlzdGVuZXJcbiAqICAgW2VuXUZ1bmN0aW9uIHRvIGV4ZWN1dGUgd2hlbiB0aGUgZXZlbnQgaXMgdHJpZ2dlcmVkLlsvZW5dXG4gKiAgIFtqYV3jgqTjg5njg7Pjg4jjgYznmbrngavjgZXjgozjgZ/pmpvjgavlkbzjgbPlh7rjgZXjgozjgovjgrPjg7zjg6vjg5Djg4Pjgq/jgpLmjIflrprjgZfjgb7jgZnjgIJbL2phXVxuICovXG5cbi8qKlxuICogQG1ldGhvZCBvbmNlXG4gKiBAc2lnbmF0dXJlIG9uY2UoZXZlbnROYW1lLCBsaXN0ZW5lcilcbiAqIEBkZXNjcmlwdGlvblxuICogIFtlbl1BZGQgYW4gZXZlbnQgbGlzdGVuZXIgdGhhdCdzIG9ubHkgdHJpZ2dlcmVkIG9uY2UuWy9lbl1cbiAqICBbamFd5LiA5bqm44Gg44GR5ZG844Gz5Ye644GV44KM44KL44Kk44OZ44Oz44OI44Oq44K544OK44O844KS6L+95Yqg44GX44G+44GZ44CCWy9qYV1cbiAqIEBwYXJhbSB7U3RyaW5nfSBldmVudE5hbWVcbiAqICAgW2VuXU5hbWUgb2YgdGhlIGV2ZW50LlsvZW5dXG4gKiAgIFtqYV3jgqTjg5njg7Pjg4jlkI3jgpLmjIflrprjgZfjgb7jgZnjgIJbL2phXVxuICogQHBhcmFtIHtGdW5jdGlvbn0gbGlzdGVuZXJcbiAqICAgW2VuXUZ1bmN0aW9uIHRvIGV4ZWN1dGUgd2hlbiB0aGUgZXZlbnQgaXMgdHJpZ2dlcmVkLlsvZW5dXG4gKiAgIFtqYV3jgqTjg5njg7Pjg4jjgYznmbrngavjgZfjgZ/pmpvjgavlkbzjgbPlh7rjgZXjgozjgovjgrPjg7zjg6vjg5Djg4Pjgq/jgpLmjIflrprjgZfjgb7jgZnjgIJbL2phXVxuICovXG5cbi8qKlxuICogQG1ldGhvZCBvZmZcbiAqIEBzaWduYXR1cmUgb2ZmKGV2ZW50TmFtZSwgW2xpc3RlbmVyXSlcbiAqIEBkZXNjcmlwdGlvblxuICogIFtlbl1SZW1vdmUgYW4gZXZlbnQgbGlzdGVuZXIuIElmIHRoZSBsaXN0ZW5lciBpcyBub3Qgc3BlY2lmaWVkIGFsbCBsaXN0ZW5lcnMgZm9yIHRoZSBldmVudCB0eXBlIHdpbGwgYmUgcmVtb3ZlZC5bL2VuXVxuICogIFtqYV3jgqTjg5njg7Pjg4jjg6rjgrnjg4rjg7zjgpLliYrpmaTjgZfjgb7jgZnjgILjgoLjgZdsaXN0ZW5lcuODkeODqeODoeODvOOCv+OBjOaMh+WumuOBleOCjOOBquOBi+OBo+OBn+WgtOWQiOOAgeOBneOBruOCpOODmeODs+ODiOOBruODquOCueODiuODvOOBjOWFqOOBpuWJiumZpOOBleOCjOOBvuOBmeOAglsvamFdXG4gKiBAcGFyYW0ge1N0cmluZ30gZXZlbnROYW1lXG4gKiAgIFtlbl1OYW1lIG9mIHRoZSBldmVudC5bL2VuXVxuICogICBbamFd44Kk44OZ44Oz44OI5ZCN44KS5oyH5a6a44GX44G+44GZ44CCWy9qYV1cbiAqIEBwYXJhbSB7RnVuY3Rpb259IGxpc3RlbmVyXG4gKiAgIFtlbl1GdW5jdGlvbiB0byBleGVjdXRlIHdoZW4gdGhlIGV2ZW50IGlzIHRyaWdnZXJlZC5bL2VuXVxuICogICBbamFd5YmK6Zmk44GZ44KL44Kk44OZ44Oz44OI44Oq44K544OK44O844Gu6Zai5pWw44Kq44OW44K444Kn44Kv44OI44KS5rih44GX44G+44GZ44CCWy9qYV1cbiAqL1xuXG4oZnVuY3Rpb24oKSB7XG4gICd1c2Ugc3RyaWN0JztcblxuICAvKipcbiAgICogVG9hc3QgZGlyZWN0aXZlLlxuICAgKi9cbiAgYW5ndWxhci5tb2R1bGUoJ29uc2VuJykuZGlyZWN0aXZlKCdvbnNUb2FzdCcsIGZ1bmN0aW9uKCRvbnNlbiwgVG9hc3RWaWV3KSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHJlc3RyaWN0OiAnRScsXG4gICAgICByZXBsYWNlOiBmYWxzZSxcbiAgICAgIHNjb3BlOiB0cnVlLFxuICAgICAgdHJhbnNjbHVkZTogZmFsc2UsXG5cbiAgICAgIGNvbXBpbGU6IGZ1bmN0aW9uKGVsZW1lbnQsIGF0dHJzKSB7XG5cbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICBwcmU6IGZ1bmN0aW9uKHNjb3BlLCBlbGVtZW50LCBhdHRycykge1xuICAgICAgICAgICAgdmFyIHRvYXN0ID0gbmV3IFRvYXN0VmlldyhzY29wZSwgZWxlbWVudCwgYXR0cnMpO1xuXG4gICAgICAgICAgICAkb25zZW4uZGVjbGFyZVZhckF0dHJpYnV0ZShhdHRycywgdG9hc3QpO1xuICAgICAgICAgICAgJG9uc2VuLnJlZ2lzdGVyRXZlbnRIYW5kbGVycyh0b2FzdCwgJ3ByZXNob3cgcHJlaGlkZSBwb3N0c2hvdyBwb3N0aGlkZSBkZXN0cm95Jyk7XG4gICAgICAgICAgICAkb25zZW4uYWRkTW9kaWZpZXJNZXRob2RzRm9yQ3VzdG9tRWxlbWVudHModG9hc3QsIGVsZW1lbnQpO1xuXG4gICAgICAgICAgICBlbGVtZW50LmRhdGEoJ29ucy10b2FzdCcsIHRvYXN0KTtcbiAgICAgICAgICAgIGVsZW1lbnQuZGF0YSgnX3Njb3BlJywgc2NvcGUpO1xuXG4gICAgICAgICAgICBzY29wZS4kb24oJyRkZXN0cm95JywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgIHRvYXN0Ll9ldmVudHMgPSB1bmRlZmluZWQ7XG4gICAgICAgICAgICAgICRvbnNlbi5yZW1vdmVNb2RpZmllck1ldGhvZHModG9hc3QpO1xuICAgICAgICAgICAgICBlbGVtZW50LmRhdGEoJ29ucy10b2FzdCcsIHVuZGVmaW5lZCk7XG4gICAgICAgICAgICAgIGVsZW1lbnQgPSBudWxsO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfSxcbiAgICAgICAgICBwb3N0OiBmdW5jdGlvbihzY29wZSwgZWxlbWVudCkge1xuICAgICAgICAgICAgJG9uc2VuLmZpcmVDb21wb25lbnRFdmVudChlbGVtZW50WzBdLCAnaW5pdCcpO1xuICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICAgIH1cbiAgICB9O1xuICB9KTtcblxufSkoKTtcbiIsIi8qKlxuICogQGVsZW1lbnQgb25zLXRvb2xiYXItYnV0dG9uXG4gKi9cblxuLyoqXG4gKiBAYXR0cmlidXRlIHZhclxuICogQGluaXRvbmx5XG4gKiBAdHlwZSB7U3RyaW5nfVxuICogQGRlc2NyaXB0aW9uXG4gKiAgIFtlbl1WYXJpYWJsZSBuYW1lIHRvIHJlZmVyIHRoaXMgYnV0dG9uLlsvZW5dXG4gKiAgIFtqYV3jgZPjga7jg5zjgr/jg7PjgpLlj4LnhafjgZnjgovjgZ/jgoHjga7lkI3liY3jgpLmjIflrprjgZfjgb7jgZnjgIJbL2phXVxuICovXG4oZnVuY3Rpb24oKXtcbiAgJ3VzZSBzdHJpY3QnO1xuICB2YXIgbW9kdWxlID0gYW5ndWxhci5tb2R1bGUoJ29uc2VuJyk7XG5cbiAgbW9kdWxlLmRpcmVjdGl2ZSgnb25zVG9vbGJhckJ1dHRvbicsIGZ1bmN0aW9uKCRvbnNlbiwgR2VuZXJpY1ZpZXcpIHtcbiAgICByZXR1cm4ge1xuICAgICAgcmVzdHJpY3Q6ICdFJyxcbiAgICAgIHNjb3BlOiBmYWxzZSxcbiAgICAgIGxpbms6IHtcbiAgICAgICAgcHJlOiBmdW5jdGlvbihzY29wZSwgZWxlbWVudCwgYXR0cnMpIHtcbiAgICAgICAgICB2YXIgdG9vbGJhckJ1dHRvbiA9IG5ldyBHZW5lcmljVmlldyhzY29wZSwgZWxlbWVudCwgYXR0cnMpO1xuICAgICAgICAgIGVsZW1lbnQuZGF0YSgnb25zLXRvb2xiYXItYnV0dG9uJywgdG9vbGJhckJ1dHRvbik7XG4gICAgICAgICAgJG9uc2VuLmRlY2xhcmVWYXJBdHRyaWJ1dGUoYXR0cnMsIHRvb2xiYXJCdXR0b24pO1xuXG4gICAgICAgICAgJG9uc2VuLmFkZE1vZGlmaWVyTWV0aG9kc0ZvckN1c3RvbUVsZW1lbnRzKHRvb2xiYXJCdXR0b24sIGVsZW1lbnQpO1xuXG4gICAgICAgICAgJG9uc2VuLmNsZWFuZXIub25EZXN0cm95KHNjb3BlLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHRvb2xiYXJCdXR0b24uX2V2ZW50cyA9IHVuZGVmaW5lZDtcbiAgICAgICAgICAgICRvbnNlbi5yZW1vdmVNb2RpZmllck1ldGhvZHModG9vbGJhckJ1dHRvbik7XG4gICAgICAgICAgICBlbGVtZW50LmRhdGEoJ29ucy10b29sYmFyLWJ1dHRvbicsIHVuZGVmaW5lZCk7XG4gICAgICAgICAgICBlbGVtZW50ID0gbnVsbDtcblxuICAgICAgICAgICAgJG9uc2VuLmNsZWFyQ29tcG9uZW50KHtcbiAgICAgICAgICAgICAgc2NvcGU6IHNjb3BlLFxuICAgICAgICAgICAgICBhdHRyczogYXR0cnMsXG4gICAgICAgICAgICAgIGVsZW1lbnQ6IGVsZW1lbnQsXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHNjb3BlID0gZWxlbWVudCA9IGF0dHJzID0gbnVsbDtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfSxcbiAgICAgICAgcG9zdDogZnVuY3Rpb24oc2NvcGUsIGVsZW1lbnQsIGF0dHJzKSB7XG4gICAgICAgICAgJG9uc2VuLmZpcmVDb21wb25lbnRFdmVudChlbGVtZW50WzBdLCAnaW5pdCcpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfTtcbiAgfSk7XG59KSgpO1xuIiwiLyoqXG4gKiBAZWxlbWVudCBvbnMtdG9vbGJhclxuICovXG5cbi8qKlxuICogQGF0dHJpYnV0ZSB2YXJcbiAqIEBpbml0b25seVxuICogQHR5cGUge1N0cmluZ31cbiAqIEBkZXNjcmlwdGlvblxuICogIFtlbl1WYXJpYWJsZSBuYW1lIHRvIHJlZmVyIHRoaXMgdG9vbGJhci5bL2VuXVxuICogIFtqYV3jgZPjga7jg4Tjg7zjg6vjg5Djg7zjgpLlj4LnhafjgZnjgovjgZ/jgoHjga7lkI3liY3jgpLmjIflrprjgZfjgb7jgZnjgIJbL2phXVxuICovXG4oZnVuY3Rpb24oKSB7XG4gICd1c2Ugc3RyaWN0JztcblxuICBhbmd1bGFyLm1vZHVsZSgnb25zZW4nKS5kaXJlY3RpdmUoJ29uc1Rvb2xiYXInLCBmdW5jdGlvbigkb25zZW4sIEdlbmVyaWNWaWV3KSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHJlc3RyaWN0OiAnRScsXG5cbiAgICAgIC8vIE5PVEU6IFRoaXMgZWxlbWVudCBtdXN0IGNvZXhpc3RzIHdpdGggbmctY29udHJvbGxlci5cbiAgICAgIC8vIERvIG5vdCB1c2UgaXNvbGF0ZWQgc2NvcGUgYW5kIHRlbXBsYXRlJ3MgbmctdHJhbnNjbHVkZS5cbiAgICAgIHNjb3BlOiBmYWxzZSxcbiAgICAgIHRyYW5zY2x1ZGU6IGZhbHNlLFxuXG4gICAgICBjb21waWxlOiBmdW5jdGlvbihlbGVtZW50KSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgcHJlOiBmdW5jdGlvbihzY29wZSwgZWxlbWVudCwgYXR0cnMpIHtcbiAgICAgICAgICAgIC8vIFRPRE86IFJlbW92ZSB0aGlzIGRpcnR5IGZpeCFcbiAgICAgICAgICAgIGlmIChlbGVtZW50WzBdLm5vZGVOYW1lID09PSAnb25zLXRvb2xiYXInKSB7XG4gICAgICAgICAgICAgIEdlbmVyaWNWaWV3LnJlZ2lzdGVyKHNjb3BlLCBlbGVtZW50LCBhdHRycywge3ZpZXdLZXk6ICdvbnMtdG9vbGJhcid9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9LFxuICAgICAgICAgIHBvc3Q6IGZ1bmN0aW9uKHNjb3BlLCBlbGVtZW50LCBhdHRycykge1xuICAgICAgICAgICAgJG9uc2VuLmZpcmVDb21wb25lbnRFdmVudChlbGVtZW50WzBdLCAnaW5pdCcpO1xuICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICAgIH1cbiAgICB9O1xuICB9KTtcblxufSkoKTtcbiIsIi8qXG5Db3B5cmlnaHQgMjAxMy0yMDE1IEFTSUFMIENPUlBPUkFUSU9OXG5cbkxpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG55b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG5Zb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcblxuICAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG5cblVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbmRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbldJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxubGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG5cbiovXG5cbihmdW5jdGlvbigpe1xuICAndXNlIHN0cmljdCc7XG5cbiAgdmFyIG1vZHVsZSA9IGFuZ3VsYXIubW9kdWxlKCdvbnNlbicpO1xuXG4gIC8qKlxuICAgKiBJbnRlcm5hbCBzZXJ2aWNlIGNsYXNzIGZvciBmcmFtZXdvcmsgaW1wbGVtZW50YXRpb24uXG4gICAqL1xuICBtb2R1bGUuZmFjdG9yeSgnJG9uc2VuJywgZnVuY3Rpb24oJHJvb3RTY29wZSwgJHdpbmRvdywgJGNhY2hlRmFjdG9yeSwgJGRvY3VtZW50LCAkdGVtcGxhdGVDYWNoZSwgJGh0dHAsICRxLCAkY29tcGlsZSwgJG9uc0dsb2JhbCwgQ29tcG9uZW50Q2xlYW5lcikge1xuXG4gICAgdmFyICRvbnNlbiA9IGNyZWF0ZU9uc2VuU2VydmljZSgpO1xuICAgIHZhciBNb2RpZmllclV0aWwgPSAkb25zR2xvYmFsLl9pbnRlcm5hbC5Nb2RpZmllclV0aWw7XG5cbiAgICByZXR1cm4gJG9uc2VuO1xuXG4gICAgZnVuY3Rpb24gY3JlYXRlT25zZW5TZXJ2aWNlKCkge1xuICAgICAgcmV0dXJuIHtcblxuICAgICAgICBESVJFQ1RJVkVfVEVNUExBVEVfVVJMOiAndGVtcGxhdGVzJyxcblxuICAgICAgICBjbGVhbmVyOiBDb21wb25lbnRDbGVhbmVyLFxuXG4gICAgICAgIHV0aWw6ICRvbnNHbG9iYWwuX3V0aWwsXG5cbiAgICAgICAgRGV2aWNlQmFja0J1dHRvbkhhbmRsZXI6ICRvbnNHbG9iYWwuX2ludGVybmFsLmRiYkRpc3BhdGNoZXIsXG5cbiAgICAgICAgX2RlZmF1bHREZXZpY2VCYWNrQnV0dG9uSGFuZGxlcjogJG9uc0dsb2JhbC5fZGVmYXVsdERldmljZUJhY2tCdXR0b25IYW5kbGVyLFxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAcmV0dXJuIHtPYmplY3R9XG4gICAgICAgICAqL1xuICAgICAgICBnZXREZWZhdWx0RGV2aWNlQmFja0J1dHRvbkhhbmRsZXI6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgIHJldHVybiB0aGlzLl9kZWZhdWx0RGV2aWNlQmFja0J1dHRvbkhhbmRsZXI7XG4gICAgICAgIH0sXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIEBwYXJhbSB7T2JqZWN0fSB2aWV3XG4gICAgICAgICAqIEBwYXJhbSB7RWxlbWVudH0gZWxlbWVudFxuICAgICAgICAgKiBAcGFyYW0ge0FycmF5fSBtZXRob2ROYW1lc1xuICAgICAgICAgKiBAcmV0dXJuIHtGdW5jdGlvbn0gQSBmdW5jdGlvbiB0aGF0IGRpc3Bvc2UgYWxsIGRyaXZpbmcgbWV0aG9kcy5cbiAgICAgICAgICovXG4gICAgICAgIGRlcml2ZU1ldGhvZHM6IGZ1bmN0aW9uKHZpZXcsIGVsZW1lbnQsIG1ldGhvZE5hbWVzKSB7XG4gICAgICAgICAgbWV0aG9kTmFtZXMuZm9yRWFjaChmdW5jdGlvbihtZXRob2ROYW1lKSB7XG4gICAgICAgICAgICB2aWV3W21ldGhvZE5hbWVdID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgIHJldHVybiBlbGVtZW50W21ldGhvZE5hbWVdLmFwcGx5KGVsZW1lbnQsIGFyZ3VtZW50cyk7XG4gICAgICAgICAgICB9O1xuICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgcmV0dXJuIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgbWV0aG9kTmFtZXMuZm9yRWFjaChmdW5jdGlvbihtZXRob2ROYW1lKSB7XG4gICAgICAgICAgICAgIHZpZXdbbWV0aG9kTmFtZV0gPSBudWxsO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB2aWV3ID0gZWxlbWVudCA9IG51bGw7XG4gICAgICAgICAgfTtcbiAgICAgICAgfSxcblxuICAgICAgICAvKipcbiAgICAgICAgICogQHBhcmFtIHtDbGFzc30ga2xhc3NcbiAgICAgICAgICogQHBhcmFtIHtBcnJheX0gcHJvcGVydGllc1xuICAgICAgICAgKi9cbiAgICAgICAgZGVyaXZlUHJvcGVydGllc0Zyb21FbGVtZW50OiBmdW5jdGlvbihrbGFzcywgcHJvcGVydGllcykge1xuICAgICAgICAgIHByb3BlcnRpZXMuZm9yRWFjaChmdW5jdGlvbihwcm9wZXJ0eSkge1xuICAgICAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KGtsYXNzLnByb3RvdHlwZSwgcHJvcGVydHksIHtcbiAgICAgICAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2VsZW1lbnRbMF1bcHJvcGVydHldO1xuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICBzZXQ6IGZ1bmN0aW9uKHZhbHVlKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2VsZW1lbnRbMF1bcHJvcGVydHldID0gdmFsdWU7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tcmV0dXJuLWFzc2lnblxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfSxcblxuICAgICAgICAvKipcbiAgICAgICAgICogQHBhcmFtIHtPYmplY3R9IHZpZXdcbiAgICAgICAgICogQHBhcmFtIHtFbGVtZW50fSBlbGVtZW50XG4gICAgICAgICAqIEBwYXJhbSB7QXJyYXl9IGV2ZW50TmFtZXNcbiAgICAgICAgICogQHBhcmFtIHtGdW5jdGlvbn0gW21hcF1cbiAgICAgICAgICogQHJldHVybiB7RnVuY3Rpb259IEEgZnVuY3Rpb24gdGhhdCBjbGVhciBhbGwgZXZlbnQgbGlzdGVuZXJzXG4gICAgICAgICAqL1xuICAgICAgICBkZXJpdmVFdmVudHM6IGZ1bmN0aW9uKHZpZXcsIGVsZW1lbnQsIGV2ZW50TmFtZXMsIG1hcCkge1xuICAgICAgICAgIG1hcCA9IG1hcCB8fCBmdW5jdGlvbihkZXRhaWwpIHsgcmV0dXJuIGRldGFpbDsgfTtcbiAgICAgICAgICBldmVudE5hbWVzID0gW10uY29uY2F0KGV2ZW50TmFtZXMpO1xuICAgICAgICAgIHZhciBsaXN0ZW5lcnMgPSBbXTtcblxuICAgICAgICAgIGV2ZW50TmFtZXMuZm9yRWFjaChmdW5jdGlvbihldmVudE5hbWUpIHtcbiAgICAgICAgICAgIHZhciBsaXN0ZW5lciA9IGZ1bmN0aW9uKGV2ZW50KSB7XG4gICAgICAgICAgICAgIG1hcChldmVudC5kZXRhaWwgfHwge30pO1xuICAgICAgICAgICAgICB2aWV3LmVtaXQoZXZlbnROYW1lLCBldmVudCk7XG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgbGlzdGVuZXJzLnB1c2gobGlzdGVuZXIpO1xuICAgICAgICAgICAgZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKGV2ZW50TmFtZSwgbGlzdGVuZXIsIGZhbHNlKTtcbiAgICAgICAgICB9KTtcblxuICAgICAgICAgIHJldHVybiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIGV2ZW50TmFtZXMuZm9yRWFjaChmdW5jdGlvbihldmVudE5hbWUsIGluZGV4KSB7XG4gICAgICAgICAgICAgIGVsZW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcihldmVudE5hbWUsIGxpc3RlbmVyc1tpbmRleF0sIGZhbHNlKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgdmlldyA9IGVsZW1lbnQgPSBsaXN0ZW5lcnMgPSBtYXAgPSBudWxsO1xuICAgICAgICAgIH07XG4gICAgICAgIH0sXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIEByZXR1cm4ge0Jvb2xlYW59XG4gICAgICAgICAqL1xuICAgICAgICBpc0VuYWJsZWRBdXRvU3RhdHVzQmFyRmlsbDogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgcmV0dXJuICEhJG9uc0dsb2JhbC5fY29uZmlnLmF1dG9TdGF0dXNCYXJGaWxsO1xuICAgICAgICB9LFxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAcmV0dXJuIHtCb29sZWFufVxuICAgICAgICAgKi9cbiAgICAgICAgc2hvdWxkRmlsbFN0YXR1c0JhcjogJG9uc0dsb2JhbC5zaG91bGRGaWxsU3RhdHVzQmFyLFxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBhY3Rpb25cbiAgICAgICAgICovXG4gICAgICAgIGF1dG9TdGF0dXNCYXJGaWxsOiAkb25zR2xvYmFsLmF1dG9TdGF0dXNCYXJGaWxsLFxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAcGFyYW0ge09iamVjdH0gZGlyZWN0aXZlXG4gICAgICAgICAqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IHBhZ2VFbGVtZW50XG4gICAgICAgICAqIEBwYXJhbSB7RnVuY3Rpb259IGNhbGxiYWNrXG4gICAgICAgICAqL1xuICAgICAgICBjb21waWxlQW5kTGluazogZnVuY3Rpb24odmlldywgcGFnZUVsZW1lbnQsIGNhbGxiYWNrKSB7XG4gICAgICAgICAgY29uc3QgbGluayA9ICRjb21waWxlKHBhZ2VFbGVtZW50KTtcbiAgICAgICAgICBjb25zdCBwYWdlU2NvcGUgPSB2aWV3Ll9zY29wZS4kbmV3KCk7XG5cbiAgICAgICAgICAvKipcbiAgICAgICAgICAgKiBPdmVyd3JpdGUgcGFnZSBzY29wZS5cbiAgICAgICAgICAgKi9cbiAgICAgICAgICBhbmd1bGFyLmVsZW1lbnQocGFnZUVsZW1lbnQpLmRhdGEoJ19zY29wZScsIHBhZ2VTY29wZSk7XG5cbiAgICAgICAgICBwYWdlU2NvcGUuJGV2YWxBc3luYyhmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIGNhbGxiYWNrKHBhZ2VFbGVtZW50KTsgLy8gQXR0YWNoIGFuZCBwcmVwYXJlXG4gICAgICAgICAgICBsaW5rKHBhZ2VTY29wZSk7IC8vIFJ1biB0aGUgY29udHJvbGxlclxuICAgICAgICAgIH0pO1xuICAgICAgICB9LFxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAcGFyYW0ge09iamVjdH0gdmlld1xuICAgICAgICAgKiBAcmV0dXJuIHtPYmplY3R9IHBhZ2VMb2FkZXJcbiAgICAgICAgICovXG4gICAgICAgIGNyZWF0ZVBhZ2VMb2FkZXI6IGZ1bmN0aW9uKHZpZXcpIHtcbiAgICAgICAgICByZXR1cm4gbmV3ICRvbnNHbG9iYWwuUGFnZUxvYWRlcihcbiAgICAgICAgICAgICh7cGFnZSwgcGFyZW50fSwgZG9uZSkgPT4ge1xuICAgICAgICAgICAgICAkb25zR2xvYmFsLl9pbnRlcm5hbC5nZXRQYWdlSFRNTEFzeW5jKHBhZ2UpLnRoZW4oaHRtbCA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5jb21waWxlQW5kTGluayhcbiAgICAgICAgICAgICAgICAgIHZpZXcsXG4gICAgICAgICAgICAgICAgICAkb25zR2xvYmFsLl91dGlsLmNyZWF0ZUVsZW1lbnQoaHRtbCksXG4gICAgICAgICAgICAgICAgICBlbGVtZW50ID0+IGRvbmUocGFyZW50LmFwcGVuZENoaWxkKGVsZW1lbnQpKVxuICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGVsZW1lbnQgPT4ge1xuICAgICAgICAgICAgICBlbGVtZW50Ll9kZXN0cm95KCk7XG4gICAgICAgICAgICAgIGlmIChhbmd1bGFyLmVsZW1lbnQoZWxlbWVudCkuZGF0YSgnX3Njb3BlJykpIHtcbiAgICAgICAgICAgICAgICBhbmd1bGFyLmVsZW1lbnQoZWxlbWVudCkuZGF0YSgnX3Njb3BlJykuJGRlc3Ryb3koKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICk7XG4gICAgICAgIH0sXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIEBwYXJhbSB7T2JqZWN0fSBwYXJhbXNcbiAgICAgICAgICogQHBhcmFtIHtTY29wZX0gW3BhcmFtcy5zY29wZV1cbiAgICAgICAgICogQHBhcmFtIHtqcUxpdGV9IFtwYXJhbXMuZWxlbWVudF1cbiAgICAgICAgICogQHBhcmFtIHtBcnJheX0gW3BhcmFtcy5lbGVtZW50c11cbiAgICAgICAgICogQHBhcmFtIHtBdHRyaWJ1dGVzfSBbcGFyYW1zLmF0dHJzXVxuICAgICAgICAgKi9cbiAgICAgICAgY2xlYXJDb21wb25lbnQ6IGZ1bmN0aW9uKHBhcmFtcykge1xuICAgICAgICAgIGlmIChwYXJhbXMuc2NvcGUpIHtcbiAgICAgICAgICAgIENvbXBvbmVudENsZWFuZXIuZGVzdHJveVNjb3BlKHBhcmFtcy5zY29wZSk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgaWYgKHBhcmFtcy5hdHRycykge1xuICAgICAgICAgICAgQ29tcG9uZW50Q2xlYW5lci5kZXN0cm95QXR0cmlidXRlcyhwYXJhbXMuYXR0cnMpO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGlmIChwYXJhbXMuZWxlbWVudCkge1xuICAgICAgICAgICAgQ29tcG9uZW50Q2xlYW5lci5kZXN0cm95RWxlbWVudChwYXJhbXMuZWxlbWVudCk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgaWYgKHBhcmFtcy5lbGVtZW50cykge1xuICAgICAgICAgICAgcGFyYW1zLmVsZW1lbnRzLmZvckVhY2goZnVuY3Rpb24oZWxlbWVudCkge1xuICAgICAgICAgICAgICBDb21wb25lbnRDbGVhbmVyLmRlc3Ryb3lFbGVtZW50KGVsZW1lbnQpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfVxuICAgICAgICB9LFxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAcGFyYW0ge2pxTGl0ZX0gZWxlbWVudFxuICAgICAgICAgKiBAcGFyYW0ge1N0cmluZ30gbmFtZVxuICAgICAgICAgKi9cbiAgICAgICAgZmluZEVsZW1lbnRlT2JqZWN0OiBmdW5jdGlvbihlbGVtZW50LCBuYW1lKSB7XG4gICAgICAgICAgcmV0dXJuIGVsZW1lbnQuaW5oZXJpdGVkRGF0YShuYW1lKTtcbiAgICAgICAgfSxcblxuICAgICAgICAvKipcbiAgICAgICAgICogQHBhcmFtIHtTdHJpbmd9IHBhZ2VcbiAgICAgICAgICogQHJldHVybiB7UHJvbWlzZX1cbiAgICAgICAgICovXG4gICAgICAgIGdldFBhZ2VIVE1MQXN5bmM6IGZ1bmN0aW9uKHBhZ2UpIHtcbiAgICAgICAgICB2YXIgY2FjaGUgPSAkdGVtcGxhdGVDYWNoZS5nZXQocGFnZSk7XG5cbiAgICAgICAgICBpZiAoY2FjaGUpIHtcbiAgICAgICAgICAgIHZhciBkZWZlcnJlZCA9ICRxLmRlZmVyKCk7XG5cbiAgICAgICAgICAgIHZhciBodG1sID0gdHlwZW9mIGNhY2hlID09PSAnc3RyaW5nJyA/IGNhY2hlIDogY2FjaGVbMV07XG4gICAgICAgICAgICBkZWZlcnJlZC5yZXNvbHZlKHRoaXMubm9ybWFsaXplUGFnZUhUTUwoaHRtbCkpO1xuXG4gICAgICAgICAgICByZXR1cm4gZGVmZXJyZWQucHJvbWlzZTtcblxuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gJGh0dHAoe1xuICAgICAgICAgICAgICB1cmw6IHBhZ2UsXG4gICAgICAgICAgICAgIG1ldGhvZDogJ0dFVCdcbiAgICAgICAgICAgIH0pLnRoZW4oZnVuY3Rpb24ocmVzcG9uc2UpIHtcbiAgICAgICAgICAgICAgdmFyIGh0bWwgPSByZXNwb25zZS5kYXRhO1xuXG4gICAgICAgICAgICAgIHJldHVybiB0aGlzLm5vcm1hbGl6ZVBhZ2VIVE1MKGh0bWwpO1xuICAgICAgICAgICAgfS5iaW5kKHRoaXMpKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0sXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIEBwYXJhbSB7U3RyaW5nfSBodG1sXG4gICAgICAgICAqIEByZXR1cm4ge1N0cmluZ31cbiAgICAgICAgICovXG4gICAgICAgIG5vcm1hbGl6ZVBhZ2VIVE1MOiBmdW5jdGlvbihodG1sKSB7XG4gICAgICAgICAgaHRtbCA9ICgnJyArIGh0bWwpLnRyaW0oKTtcblxuICAgICAgICAgIGlmICghaHRtbC5tYXRjaCgvXjxvbnMtcGFnZS8pKSB7XG4gICAgICAgICAgICBodG1sID0gJzxvbnMtcGFnZSBfbXV0ZWQ+JyArIGh0bWwgKyAnPC9vbnMtcGFnZT4nO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIHJldHVybiBodG1sO1xuICAgICAgICB9LFxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBDcmVhdGUgbW9kaWZpZXIgdGVtcGxhdGVyIGZ1bmN0aW9uLiBUaGUgbW9kaWZpZXIgdGVtcGxhdGVyIGdlbmVyYXRlIGNzcyBjbGFzc2VzIGJvdW5kIG1vZGlmaWVyIG5hbWUuXG4gICAgICAgICAqXG4gICAgICAgICAqIEBwYXJhbSB7T2JqZWN0fSBhdHRyc1xuICAgICAgICAgKiBAcGFyYW0ge0FycmF5fSBbbW9kaWZpZXJzXSBhbiBhcnJheSBvZiBhcHBlbmRpeCBtb2RpZmllclxuICAgICAgICAgKiBAcmV0dXJuIHtGdW5jdGlvbn1cbiAgICAgICAgICovXG4gICAgICAgIGdlbmVyYXRlTW9kaWZpZXJUZW1wbGF0ZXI6IGZ1bmN0aW9uKGF0dHJzLCBtb2RpZmllcnMpIHtcbiAgICAgICAgICB2YXIgYXR0ck1vZGlmaWVycyA9IGF0dHJzICYmIHR5cGVvZiBhdHRycy5tb2RpZmllciA9PT0gJ3N0cmluZycgPyBhdHRycy5tb2RpZmllci50cmltKCkuc3BsaXQoLyArLykgOiBbXTtcbiAgICAgICAgICBtb2RpZmllcnMgPSBhbmd1bGFyLmlzQXJyYXkobW9kaWZpZXJzKSA/IGF0dHJNb2RpZmllcnMuY29uY2F0KG1vZGlmaWVycykgOiBhdHRyTW9kaWZpZXJzO1xuXG4gICAgICAgICAgLyoqXG4gICAgICAgICAgICogQHJldHVybiB7U3RyaW5nfSB0ZW1wbGF0ZSBlZy4gJ29ucy1idXR0b24tLSonLCAnb25zLWJ1dHRvbi0tKl9faXRlbSdcbiAgICAgICAgICAgKiBAcmV0dXJuIHtTdHJpbmd9XG4gICAgICAgICAgICovXG4gICAgICAgICAgcmV0dXJuIGZ1bmN0aW9uKHRlbXBsYXRlKSB7XG4gICAgICAgICAgICByZXR1cm4gbW9kaWZpZXJzLm1hcChmdW5jdGlvbihtb2RpZmllcikge1xuICAgICAgICAgICAgICByZXR1cm4gdGVtcGxhdGUucmVwbGFjZSgnKicsIG1vZGlmaWVyKTtcbiAgICAgICAgICAgIH0pLmpvaW4oJyAnKTtcbiAgICAgICAgICB9O1xuICAgICAgICB9LFxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBBZGQgbW9kaWZpZXIgbWV0aG9kcyB0byB2aWV3IG9iamVjdCBmb3IgY3VzdG9tIGVsZW1lbnRzLlxuICAgICAgICAgKlxuICAgICAgICAgKiBAcGFyYW0ge09iamVjdH0gdmlldyBvYmplY3RcbiAgICAgICAgICogQHBhcmFtIHtqcUxpdGV9IGVsZW1lbnRcbiAgICAgICAgICovXG4gICAgICAgIGFkZE1vZGlmaWVyTWV0aG9kc0ZvckN1c3RvbUVsZW1lbnRzOiBmdW5jdGlvbih2aWV3LCBlbGVtZW50KSB7XG4gICAgICAgICAgdmFyIG1ldGhvZHMgPSB7XG4gICAgICAgICAgICBoYXNNb2RpZmllcjogZnVuY3Rpb24obmVlZGxlKSB7XG4gICAgICAgICAgICAgIHZhciB0b2tlbnMgPSBNb2RpZmllclV0aWwuc3BsaXQoZWxlbWVudC5hdHRyKCdtb2RpZmllcicpKTtcbiAgICAgICAgICAgICAgbmVlZGxlID0gdHlwZW9mIG5lZWRsZSA9PT0gJ3N0cmluZycgPyBuZWVkbGUudHJpbSgpIDogJyc7XG5cbiAgICAgICAgICAgICAgcmV0dXJuIE1vZGlmaWVyVXRpbC5zcGxpdChuZWVkbGUpLnNvbWUoZnVuY3Rpb24obmVlZGxlKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRva2Vucy5pbmRleE9mKG5lZWRsZSkgIT0gLTE7XG4gICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSxcblxuICAgICAgICAgICAgcmVtb3ZlTW9kaWZpZXI6IGZ1bmN0aW9uKG5lZWRsZSkge1xuICAgICAgICAgICAgICBuZWVkbGUgPSB0eXBlb2YgbmVlZGxlID09PSAnc3RyaW5nJyA/IG5lZWRsZS50cmltKCkgOiAnJztcblxuICAgICAgICAgICAgICB2YXIgbW9kaWZpZXIgPSBNb2RpZmllclV0aWwuc3BsaXQoZWxlbWVudC5hdHRyKCdtb2RpZmllcicpKS5maWx0ZXIoZnVuY3Rpb24odG9rZW4pIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdG9rZW4gIT09IG5lZWRsZTtcbiAgICAgICAgICAgICAgfSkuam9pbignICcpO1xuXG4gICAgICAgICAgICAgIGVsZW1lbnQuYXR0cignbW9kaWZpZXInLCBtb2RpZmllcik7XG4gICAgICAgICAgICB9LFxuXG4gICAgICAgICAgICBhZGRNb2RpZmllcjogZnVuY3Rpb24obW9kaWZpZXIpIHtcbiAgICAgICAgICAgICAgZWxlbWVudC5hdHRyKCdtb2RpZmllcicsIGVsZW1lbnQuYXR0cignbW9kaWZpZXInKSArICcgJyArIG1vZGlmaWVyKTtcbiAgICAgICAgICAgIH0sXG5cbiAgICAgICAgICAgIHNldE1vZGlmaWVyOiBmdW5jdGlvbihtb2RpZmllcikge1xuICAgICAgICAgICAgICBlbGVtZW50LmF0dHIoJ21vZGlmaWVyJywgbW9kaWZpZXIpO1xuICAgICAgICAgICAgfSxcblxuICAgICAgICAgICAgdG9nZ2xlTW9kaWZpZXI6IGZ1bmN0aW9uKG1vZGlmaWVyKSB7XG4gICAgICAgICAgICAgIGlmICh0aGlzLmhhc01vZGlmaWVyKG1vZGlmaWVyKSkge1xuICAgICAgICAgICAgICAgIHRoaXMucmVtb3ZlTW9kaWZpZXIobW9kaWZpZXIpO1xuICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMuYWRkTW9kaWZpZXIobW9kaWZpZXIpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfTtcblxuICAgICAgICAgIGZvciAodmFyIG1ldGhvZCBpbiBtZXRob2RzKSB7XG4gICAgICAgICAgICBpZiAobWV0aG9kcy5oYXNPd25Qcm9wZXJ0eShtZXRob2QpKSB7XG4gICAgICAgICAgICAgIHZpZXdbbWV0aG9kXSA9IG1ldGhvZHNbbWV0aG9kXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH0sXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIEFkZCBtb2RpZmllciBtZXRob2RzIHRvIHZpZXcgb2JqZWN0LlxuICAgICAgICAgKlxuICAgICAgICAgKiBAcGFyYW0ge09iamVjdH0gdmlldyBvYmplY3RcbiAgICAgICAgICogQHBhcmFtIHtTdHJpbmd9IHRlbXBsYXRlXG4gICAgICAgICAqIEBwYXJhbSB7anFMaXRlfSBlbGVtZW50XG4gICAgICAgICAqL1xuICAgICAgICBhZGRNb2RpZmllck1ldGhvZHM6IGZ1bmN0aW9uKHZpZXcsIHRlbXBsYXRlLCBlbGVtZW50KSB7XG4gICAgICAgICAgdmFyIF90ciA9IGZ1bmN0aW9uKG1vZGlmaWVyKSB7XG4gICAgICAgICAgICByZXR1cm4gdGVtcGxhdGUucmVwbGFjZSgnKicsIG1vZGlmaWVyKTtcbiAgICAgICAgICB9O1xuXG4gICAgICAgICAgdmFyIGZucyA9IHtcbiAgICAgICAgICAgIGhhc01vZGlmaWVyOiBmdW5jdGlvbihtb2RpZmllcikge1xuICAgICAgICAgICAgICByZXR1cm4gZWxlbWVudC5oYXNDbGFzcyhfdHIobW9kaWZpZXIpKTtcbiAgICAgICAgICAgIH0sXG5cbiAgICAgICAgICAgIHJlbW92ZU1vZGlmaWVyOiBmdW5jdGlvbihtb2RpZmllcikge1xuICAgICAgICAgICAgICBlbGVtZW50LnJlbW92ZUNsYXNzKF90cihtb2RpZmllcikpO1xuICAgICAgICAgICAgfSxcblxuICAgICAgICAgICAgYWRkTW9kaWZpZXI6IGZ1bmN0aW9uKG1vZGlmaWVyKSB7XG4gICAgICAgICAgICAgIGVsZW1lbnQuYWRkQ2xhc3MoX3RyKG1vZGlmaWVyKSk7XG4gICAgICAgICAgICB9LFxuXG4gICAgICAgICAgICBzZXRNb2RpZmllcjogZnVuY3Rpb24obW9kaWZpZXIpIHtcbiAgICAgICAgICAgICAgdmFyIGNsYXNzZXMgPSBlbGVtZW50LmF0dHIoJ2NsYXNzJykuc3BsaXQoL1xccysvKSxcbiAgICAgICAgICAgICAgICAgIHBhdHQgPSB0ZW1wbGF0ZS5yZXBsYWNlKCcqJywgJy4nKTtcblxuICAgICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGNsYXNzZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICB2YXIgY2xzID0gY2xhc3Nlc1tpXTtcblxuICAgICAgICAgICAgICAgIGlmIChjbHMubWF0Y2gocGF0dCkpIHtcbiAgICAgICAgICAgICAgICAgIGVsZW1lbnQucmVtb3ZlQ2xhc3MoY2xzKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICBlbGVtZW50LmFkZENsYXNzKF90cihtb2RpZmllcikpO1xuICAgICAgICAgICAgfSxcblxuICAgICAgICAgICAgdG9nZ2xlTW9kaWZpZXI6IGZ1bmN0aW9uKG1vZGlmaWVyKSB7XG4gICAgICAgICAgICAgIHZhciBjbHMgPSBfdHIobW9kaWZpZXIpO1xuICAgICAgICAgICAgICBpZiAoZWxlbWVudC5oYXNDbGFzcyhjbHMpKSB7XG4gICAgICAgICAgICAgICAgZWxlbWVudC5yZW1vdmVDbGFzcyhjbHMpO1xuICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGVsZW1lbnQuYWRkQ2xhc3MoY2xzKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH07XG5cbiAgICAgICAgICB2YXIgYXBwZW5kID0gZnVuY3Rpb24ob2xkRm4sIG5ld0ZuKSB7XG4gICAgICAgICAgICBpZiAodHlwZW9mIG9sZEZuICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgICByZXR1cm4gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIG9sZEZuLmFwcGx5KG51bGwsIGFyZ3VtZW50cykgfHwgbmV3Rm4uYXBwbHkobnVsbCwgYXJndW1lbnRzKTtcbiAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIHJldHVybiBuZXdGbjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9O1xuXG4gICAgICAgICAgdmlldy5oYXNNb2RpZmllciA9IGFwcGVuZCh2aWV3Lmhhc01vZGlmaWVyLCBmbnMuaGFzTW9kaWZpZXIpO1xuICAgICAgICAgIHZpZXcucmVtb3ZlTW9kaWZpZXIgPSBhcHBlbmQodmlldy5yZW1vdmVNb2RpZmllciwgZm5zLnJlbW92ZU1vZGlmaWVyKTtcbiAgICAgICAgICB2aWV3LmFkZE1vZGlmaWVyID0gYXBwZW5kKHZpZXcuYWRkTW9kaWZpZXIsIGZucy5hZGRNb2RpZmllcik7XG4gICAgICAgICAgdmlldy5zZXRNb2RpZmllciA9IGFwcGVuZCh2aWV3LnNldE1vZGlmaWVyLCBmbnMuc2V0TW9kaWZpZXIpO1xuICAgICAgICAgIHZpZXcudG9nZ2xlTW9kaWZpZXIgPSBhcHBlbmQodmlldy50b2dnbGVNb2RpZmllciwgZm5zLnRvZ2dsZU1vZGlmaWVyKTtcbiAgICAgICAgfSxcblxuICAgICAgICAvKipcbiAgICAgICAgICogUmVtb3ZlIG1vZGlmaWVyIG1ldGhvZHMuXG4gICAgICAgICAqXG4gICAgICAgICAqIEBwYXJhbSB7T2JqZWN0fSB2aWV3IG9iamVjdFxuICAgICAgICAgKi9cbiAgICAgICAgcmVtb3ZlTW9kaWZpZXJNZXRob2RzOiBmdW5jdGlvbih2aWV3KSB7XG4gICAgICAgICAgdmlldy5oYXNNb2RpZmllciA9IHZpZXcucmVtb3ZlTW9kaWZpZXIgPVxuICAgICAgICAgICAgdmlldy5hZGRNb2RpZmllciA9IHZpZXcuc2V0TW9kaWZpZXIgPVxuICAgICAgICAgICAgdmlldy50b2dnbGVNb2RpZmllciA9IHVuZGVmaW5lZDtcbiAgICAgICAgfSxcblxuICAgICAgICAvKipcbiAgICAgICAgICogRGVmaW5lIGEgdmFyaWFibGUgdG8gSmF2YVNjcmlwdCBnbG9iYWwgc2NvcGUgYW5kIEFuZ3VsYXJKUyBzY29wZSBhcyAndmFyJyBhdHRyaWJ1dGUgbmFtZS5cbiAgICAgICAgICpcbiAgICAgICAgICogQHBhcmFtIHtPYmplY3R9IGF0dHJzXG4gICAgICAgICAqIEBwYXJhbSBvYmplY3RcbiAgICAgICAgICovXG4gICAgICAgIGRlY2xhcmVWYXJBdHRyaWJ1dGU6IGZ1bmN0aW9uKGF0dHJzLCBvYmplY3QpIHtcbiAgICAgICAgICBpZiAodHlwZW9mIGF0dHJzLnZhciA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgICAgIHZhciB2YXJOYW1lID0gYXR0cnMudmFyO1xuICAgICAgICAgICAgdGhpcy5fZGVmaW5lVmFyKHZhck5hbWUsIG9iamVjdCk7XG4gICAgICAgICAgfVxuICAgICAgICB9LFxuXG4gICAgICAgIF9yZWdpc3RlckV2ZW50SGFuZGxlcjogZnVuY3Rpb24oY29tcG9uZW50LCBldmVudE5hbWUpIHtcbiAgICAgICAgICB2YXIgY2FwaXRhbGl6ZWRFdmVudE5hbWUgPSBldmVudE5hbWUuY2hhckF0KDApLnRvVXBwZXJDYXNlKCkgKyBldmVudE5hbWUuc2xpY2UoMSk7XG5cbiAgICAgICAgICBjb21wb25lbnQub24oZXZlbnROYW1lLCBmdW5jdGlvbihldmVudCkge1xuICAgICAgICAgICAgJG9uc2VuLmZpcmVDb21wb25lbnRFdmVudChjb21wb25lbnQuX2VsZW1lbnRbMF0sIGV2ZW50TmFtZSwgZXZlbnQgJiYgZXZlbnQuZGV0YWlsKTtcblxuICAgICAgICAgICAgdmFyIGhhbmRsZXIgPSBjb21wb25lbnQuX2F0dHJzWydvbnMnICsgY2FwaXRhbGl6ZWRFdmVudE5hbWVdO1xuICAgICAgICAgICAgaWYgKGhhbmRsZXIpIHtcbiAgICAgICAgICAgICAgY29tcG9uZW50Ll9zY29wZS4kZXZhbChoYW5kbGVyLCB7JGV2ZW50OiBldmVudH0pO1xuICAgICAgICAgICAgICBjb21wb25lbnQuX3Njb3BlLiRldmFsQXN5bmMoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KTtcbiAgICAgICAgfSxcblxuICAgICAgICAvKipcbiAgICAgICAgICogUmVnaXN0ZXIgZXZlbnQgaGFuZGxlcnMgZm9yIGF0dHJpYnV0ZXMuXG4gICAgICAgICAqXG4gICAgICAgICAqIEBwYXJhbSB7T2JqZWN0fSBjb21wb25lbnRcbiAgICAgICAgICogQHBhcmFtIHtTdHJpbmd9IGV2ZW50TmFtZXNcbiAgICAgICAgICovXG4gICAgICAgIHJlZ2lzdGVyRXZlbnRIYW5kbGVyczogZnVuY3Rpb24oY29tcG9uZW50LCBldmVudE5hbWVzKSB7XG4gICAgICAgICAgZXZlbnROYW1lcyA9IGV2ZW50TmFtZXMudHJpbSgpLnNwbGl0KC9cXHMrLyk7XG5cbiAgICAgICAgICBmb3IgKHZhciBpID0gMCwgbCA9IGV2ZW50TmFtZXMubGVuZ3RoOyBpIDwgbDsgaSsrKSB7XG4gICAgICAgICAgICB2YXIgZXZlbnROYW1lID0gZXZlbnROYW1lc1tpXTtcbiAgICAgICAgICAgIHRoaXMuX3JlZ2lzdGVyRXZlbnRIYW5kbGVyKGNvbXBvbmVudCwgZXZlbnROYW1lKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0sXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIEByZXR1cm4ge0Jvb2xlYW59XG4gICAgICAgICAqL1xuICAgICAgICBpc0FuZHJvaWQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgIHJldHVybiAhISR3aW5kb3cubmF2aWdhdG9yLnVzZXJBZ2VudC5tYXRjaCgvYW5kcm9pZC9pKTtcbiAgICAgICAgfSxcblxuICAgICAgICAvKipcbiAgICAgICAgICogQHJldHVybiB7Qm9vbGVhbn1cbiAgICAgICAgICovXG4gICAgICAgIGlzSU9TOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICByZXR1cm4gISEkd2luZG93Lm5hdmlnYXRvci51c2VyQWdlbnQubWF0Y2goLyhpcGFkfGlwaG9uZXxpcG9kIHRvdWNoKS9pKTtcbiAgICAgICAgfSxcblxuICAgICAgICAvKipcbiAgICAgICAgICogQHJldHVybiB7Qm9vbGVhbn1cbiAgICAgICAgICovXG4gICAgICAgIGlzV2ViVmlldzogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgcmV0dXJuICRvbnNHbG9iYWwuaXNXZWJWaWV3KCk7XG4gICAgICAgIH0sXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIEByZXR1cm4ge0Jvb2xlYW59XG4gICAgICAgICAqL1xuICAgICAgICBpc0lPUzdhYm92ZTogKGZ1bmN0aW9uKCkge1xuICAgICAgICAgIHZhciB1YSA9ICR3aW5kb3cubmF2aWdhdG9yLnVzZXJBZ2VudDtcbiAgICAgICAgICB2YXIgbWF0Y2ggPSB1YS5tYXRjaCgvKGlQYWR8aVBob25lfGlQb2QgdG91Y2gpOy4qQ1BVLipPUyAoXFxkKylfKFxcZCspL2kpO1xuXG4gICAgICAgICAgdmFyIHJlc3VsdCA9IG1hdGNoID8gcGFyc2VGbG9hdChtYXRjaFsyXSArICcuJyArIG1hdGNoWzNdKSA+PSA3IDogZmFsc2U7XG5cbiAgICAgICAgICByZXR1cm4gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgICAgICAgIH07XG4gICAgICAgIH0pKCksXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIEZpcmUgYSBuYW1lZCBldmVudCBmb3IgYSBjb21wb25lbnQuIFRoZSB2aWV3IG9iamVjdCwgaWYgaXQgZXhpc3RzLCBpcyBhdHRhY2hlZCB0byBldmVudC5jb21wb25lbnQuXG4gICAgICAgICAqXG4gICAgICAgICAqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IFtkb21dXG4gICAgICAgICAqIEBwYXJhbSB7U3RyaW5nfSBldmVudCBuYW1lXG4gICAgICAgICAqL1xuICAgICAgICBmaXJlQ29tcG9uZW50RXZlbnQ6IGZ1bmN0aW9uKGRvbSwgZXZlbnROYW1lLCBkYXRhKSB7XG4gICAgICAgICAgZGF0YSA9IGRhdGEgfHwge307XG5cbiAgICAgICAgICB2YXIgZXZlbnQgPSBkb2N1bWVudC5jcmVhdGVFdmVudCgnSFRNTEV2ZW50cycpO1xuXG4gICAgICAgICAgZm9yICh2YXIga2V5IGluIGRhdGEpIHtcbiAgICAgICAgICAgIGlmIChkYXRhLmhhc093blByb3BlcnR5KGtleSkpIHtcbiAgICAgICAgICAgICAgZXZlbnRba2V5XSA9IGRhdGFba2V5XTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG5cbiAgICAgICAgICBldmVudC5jb21wb25lbnQgPSBkb20gP1xuICAgICAgICAgICAgYW5ndWxhci5lbGVtZW50KGRvbSkuZGF0YShkb20ubm9kZU5hbWUudG9Mb3dlckNhc2UoKSkgfHwgbnVsbCA6IG51bGw7XG4gICAgICAgICAgZXZlbnQuaW5pdEV2ZW50KGRvbS5ub2RlTmFtZS50b0xvd2VyQ2FzZSgpICsgJzonICsgZXZlbnROYW1lLCB0cnVlLCB0cnVlKTtcblxuICAgICAgICAgIGRvbS5kaXNwYXRjaEV2ZW50KGV2ZW50KTtcbiAgICAgICAgfSxcblxuICAgICAgICAvKipcbiAgICAgICAgICogRGVmaW5lIGEgdmFyaWFibGUgdG8gSmF2YVNjcmlwdCBnbG9iYWwgc2NvcGUgYW5kIEFuZ3VsYXJKUyBzY29wZS5cbiAgICAgICAgICpcbiAgICAgICAgICogVXRpbC5kZWZpbmVWYXIoJ2ZvbycsICdmb28tdmFsdWUnKTtcbiAgICAgICAgICogLy8gPT4gd2luZG93LmZvbyBhbmQgJHNjb3BlLmZvbyBpcyBub3cgJ2Zvby12YWx1ZSdcbiAgICAgICAgICpcbiAgICAgICAgICogVXRpbC5kZWZpbmVWYXIoJ2Zvby5iYXInLCAnZm9vLWJhci12YWx1ZScpO1xuICAgICAgICAgKiAvLyA9PiB3aW5kb3cuZm9vLmJhciBhbmQgJHNjb3BlLmZvby5iYXIgaXMgbm93ICdmb28tYmFyLXZhbHVlJ1xuICAgICAgICAgKlxuICAgICAgICAgKiBAcGFyYW0ge1N0cmluZ30gbmFtZVxuICAgICAgICAgKiBAcGFyYW0gb2JqZWN0XG4gICAgICAgICAqL1xuICAgICAgICBfZGVmaW5lVmFyOiBmdW5jdGlvbihuYW1lLCBvYmplY3QpIHtcbiAgICAgICAgICB2YXIgbmFtZXMgPSBuYW1lLnNwbGl0KC9cXC4vKTtcblxuICAgICAgICAgIGZ1bmN0aW9uIHNldChjb250YWluZXIsIG5hbWVzLCBvYmplY3QpIHtcbiAgICAgICAgICAgIHZhciBuYW1lO1xuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBuYW1lcy5sZW5ndGggLSAxOyBpKyspIHtcbiAgICAgICAgICAgICAgbmFtZSA9IG5hbWVzW2ldO1xuICAgICAgICAgICAgICBpZiAoY29udGFpbmVyW25hbWVdID09PSB1bmRlZmluZWQgfHwgY29udGFpbmVyW25hbWVdID09PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgY29udGFpbmVyW25hbWVdID0ge307XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgY29udGFpbmVyID0gY29udGFpbmVyW25hbWVdO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBjb250YWluZXJbbmFtZXNbbmFtZXMubGVuZ3RoIC0gMV1dID0gb2JqZWN0O1xuXG4gICAgICAgICAgICBpZiAoY29udGFpbmVyW25hbWVzW25hbWVzLmxlbmd0aCAtIDFdXSAhPT0gb2JqZWN0KSB7XG4gICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignQ2Fubm90IHNldCB2YXI9XCInICsgb2JqZWN0Ll9hdHRycy52YXIgKyAnXCIgYmVjYXVzZSBpdCB3aWxsIG92ZXJ3cml0ZSBhIHJlYWQtb25seSB2YXJpYWJsZS4nKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG5cbiAgICAgICAgICBpZiAob25zLmNvbXBvbmVudEJhc2UpIHtcbiAgICAgICAgICAgIHNldChvbnMuY29tcG9uZW50QmFzZSwgbmFtZXMsIG9iamVjdCk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgdmFyIGdldFNjb3BlID0gZnVuY3Rpb24oZWwpIHtcbiAgICAgICAgICAgIHJldHVybiBhbmd1bGFyLmVsZW1lbnQoZWwpLmRhdGEoJ19zY29wZScpO1xuICAgICAgICAgIH07XG5cbiAgICAgICAgICB2YXIgZWxlbWVudCA9IG9iamVjdC5fZWxlbWVudFswXTtcblxuICAgICAgICAgIC8vIEN1cnJlbnQgZWxlbWVudCBtaWdodCBub3QgaGF2ZSBkYXRhKCdfc2NvcGUnKVxuICAgICAgICAgIGlmIChlbGVtZW50Lmhhc0F0dHJpYnV0ZSgnb25zLXNjb3BlJykpIHtcbiAgICAgICAgICAgIHNldChnZXRTY29wZShlbGVtZW50KSB8fCBvYmplY3QuX3Njb3BlLCBuYW1lcywgb2JqZWN0KTtcbiAgICAgICAgICAgIGVsZW1lbnQgPSBudWxsO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIC8vIEFuY2VzdG9yc1xuICAgICAgICAgIHdoaWxlIChlbGVtZW50LnBhcmVudEVsZW1lbnQpIHtcbiAgICAgICAgICAgIGVsZW1lbnQgPSBlbGVtZW50LnBhcmVudEVsZW1lbnQ7XG4gICAgICAgICAgICBpZiAoZWxlbWVudC5oYXNBdHRyaWJ1dGUoJ29ucy1zY29wZScpKSB7XG4gICAgICAgICAgICAgIHNldChnZXRTY29wZShlbGVtZW50KSwgbmFtZXMsIG9iamVjdCk7XG4gICAgICAgICAgICAgIGVsZW1lbnQgPSBudWxsO1xuICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgZWxlbWVudCA9IG51bGw7XG5cbiAgICAgICAgICAvLyBJZiBubyBvbnMtc2NvcGUgZWxlbWVudCB3YXMgZm91bmQsIGF0dGFjaCB0byAkcm9vdFNjb3BlLlxuICAgICAgICAgIHNldCgkcm9vdFNjb3BlLCBuYW1lcywgb2JqZWN0KTtcbiAgICAgICAgfVxuICAgICAgfTtcbiAgICB9XG5cbiAgfSk7XG59KSgpO1xuIiwiLypcbkNvcHlyaWdodCAyMDEzLTIwMTUgQVNJQUwgQ09SUE9SQVRJT05cblxuTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbnlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbllvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuXG4gICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcblxuVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG5TZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG5saW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cblxuKi9cblxuKGZ1bmN0aW9uKCl7XG4gICd1c2Ugc3RyaWN0JztcblxuICB2YXIgbW9kdWxlID0gYW5ndWxhci5tb2R1bGUoJ29uc2VuJyk7XG5cbiAgdmFyIENvbXBvbmVudENsZWFuZXIgPSB7XG4gICAgLyoqXG4gICAgICogQHBhcmFtIHtqcUxpdGV9IGVsZW1lbnRcbiAgICAgKi9cbiAgICBkZWNvbXBvc2VOb2RlOiBmdW5jdGlvbihlbGVtZW50KSB7XG4gICAgICB2YXIgY2hpbGRyZW4gPSBlbGVtZW50LnJlbW92ZSgpLmNoaWxkcmVuKCk7XG4gICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGNoaWxkcmVuLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIENvbXBvbmVudENsZWFuZXIuZGVjb21wb3NlTm9kZShhbmd1bGFyLmVsZW1lbnQoY2hpbGRyZW5baV0pKTtcbiAgICAgIH1cbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogQHBhcmFtIHtBdHRyaWJ1dGVzfSBhdHRyc1xuICAgICAqL1xuICAgIGRlc3Ryb3lBdHRyaWJ1dGVzOiBmdW5jdGlvbihhdHRycykge1xuICAgICAgYXR0cnMuJCRlbGVtZW50ID0gbnVsbDtcbiAgICAgIGF0dHJzLiQkb2JzZXJ2ZXJzID0gbnVsbDtcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogQHBhcmFtIHtqcUxpdGV9IGVsZW1lbnRcbiAgICAgKi9cbiAgICBkZXN0cm95RWxlbWVudDogZnVuY3Rpb24oZWxlbWVudCkge1xuICAgICAgZWxlbWVudC5yZW1vdmUoKTtcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogQHBhcmFtIHtTY29wZX0gc2NvcGVcbiAgICAgKi9cbiAgICBkZXN0cm95U2NvcGU6IGZ1bmN0aW9uKHNjb3BlKSB7XG4gICAgICBzY29wZS4kJGxpc3RlbmVycyA9IHt9O1xuICAgICAgc2NvcGUuJCR3YXRjaGVycyA9IG51bGw7XG4gICAgICBzY29wZSA9IG51bGw7XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIEBwYXJhbSB7U2NvcGV9IHNjb3BlXG4gICAgICogQHBhcmFtIHtGdW5jdGlvbn0gZm5cbiAgICAgKi9cbiAgICBvbkRlc3Ryb3k6IGZ1bmN0aW9uKHNjb3BlLCBmbikge1xuICAgICAgdmFyIGNsZWFyID0gc2NvcGUuJG9uKCckZGVzdHJveScsIGZ1bmN0aW9uKCkge1xuICAgICAgICBjbGVhcigpO1xuICAgICAgICBmbi5hcHBseShudWxsLCBhcmd1bWVudHMpO1xuICAgICAgfSk7XG4gICAgfVxuICB9O1xuXG4gIG1vZHVsZS5mYWN0b3J5KCdDb21wb25lbnRDbGVhbmVyJywgZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIENvbXBvbmVudENsZWFuZXI7XG4gIH0pO1xuXG4gIC8vIG92ZXJyaWRlIGJ1aWx0aW4gbmctKGV2ZW50bmFtZSkgZGlyZWN0aXZlc1xuICAoZnVuY3Rpb24oKSB7XG4gICAgdmFyIG5nRXZlbnREaXJlY3RpdmVzID0ge307XG4gICAgJ2NsaWNrIGRibGNsaWNrIG1vdXNlZG93biBtb3VzZXVwIG1vdXNlb3ZlciBtb3VzZW91dCBtb3VzZW1vdmUgbW91c2VlbnRlciBtb3VzZWxlYXZlIGtleWRvd24ga2V5dXAga2V5cHJlc3Mgc3VibWl0IGZvY3VzIGJsdXIgY29weSBjdXQgcGFzdGUnLnNwbGl0KCcgJykuZm9yRWFjaChcbiAgICAgIGZ1bmN0aW9uKG5hbWUpIHtcbiAgICAgICAgdmFyIGRpcmVjdGl2ZU5hbWUgPSBkaXJlY3RpdmVOb3JtYWxpemUoJ25nLScgKyBuYW1lKTtcbiAgICAgICAgbmdFdmVudERpcmVjdGl2ZXNbZGlyZWN0aXZlTmFtZV0gPSBbJyRwYXJzZScsIGZ1bmN0aW9uKCRwYXJzZSkge1xuICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBjb21waWxlOiBmdW5jdGlvbigkZWxlbWVudCwgYXR0cikge1xuICAgICAgICAgICAgICB2YXIgZm4gPSAkcGFyc2UoYXR0cltkaXJlY3RpdmVOYW1lXSk7XG4gICAgICAgICAgICAgIHJldHVybiBmdW5jdGlvbihzY29wZSwgZWxlbWVudCwgYXR0cikge1xuICAgICAgICAgICAgICAgIHZhciBsaXN0ZW5lciA9IGZ1bmN0aW9uKGV2ZW50KSB7XG4gICAgICAgICAgICAgICAgICBzY29wZS4kYXBwbHkoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgICAgIGZuKHNjb3BlLCB7JGV2ZW50OiBldmVudH0pO1xuICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICBlbGVtZW50Lm9uKG5hbWUsIGxpc3RlbmVyKTtcblxuICAgICAgICAgICAgICAgIENvbXBvbmVudENsZWFuZXIub25EZXN0cm95KHNjb3BlLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAgIGVsZW1lbnQub2ZmKG5hbWUsIGxpc3RlbmVyKTtcbiAgICAgICAgICAgICAgICAgIGVsZW1lbnQgPSBudWxsO1xuXG4gICAgICAgICAgICAgICAgICBDb21wb25lbnRDbGVhbmVyLmRlc3Ryb3lTY29wZShzY29wZSk7XG4gICAgICAgICAgICAgICAgICBzY29wZSA9IG51bGw7XG5cbiAgICAgICAgICAgICAgICAgIENvbXBvbmVudENsZWFuZXIuZGVzdHJveUF0dHJpYnV0ZXMoYXR0cik7XG4gICAgICAgICAgICAgICAgICBhdHRyID0gbnVsbDtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9O1xuICAgICAgICB9XTtcblxuICAgICAgICBmdW5jdGlvbiBkaXJlY3RpdmVOb3JtYWxpemUobmFtZSkge1xuICAgICAgICAgIHJldHVybiBuYW1lLnJlcGxhY2UoLy0oW2Etel0pL2csIGZ1bmN0aW9uKG1hdGNoZXMpIHtcbiAgICAgICAgICAgIHJldHVybiBtYXRjaGVzWzFdLnRvVXBwZXJDYXNlKCk7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICApO1xuICAgIG1vZHVsZS5jb25maWcoZnVuY3Rpb24oJHByb3ZpZGUpIHtcbiAgICAgIHZhciBzaGlmdCA9IGZ1bmN0aW9uKCRkZWxlZ2F0ZSkge1xuICAgICAgICAkZGVsZWdhdGUuc2hpZnQoKTtcbiAgICAgICAgcmV0dXJuICRkZWxlZ2F0ZTtcbiAgICAgIH07XG4gICAgICBPYmplY3Qua2V5cyhuZ0V2ZW50RGlyZWN0aXZlcykuZm9yRWFjaChmdW5jdGlvbihkaXJlY3RpdmVOYW1lKSB7XG4gICAgICAgICRwcm92aWRlLmRlY29yYXRvcihkaXJlY3RpdmVOYW1lICsgJ0RpcmVjdGl2ZScsIFsnJGRlbGVnYXRlJywgc2hpZnRdKTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICAgIE9iamVjdC5rZXlzKG5nRXZlbnREaXJlY3RpdmVzKS5mb3JFYWNoKGZ1bmN0aW9uKGRpcmVjdGl2ZU5hbWUpIHtcbiAgICAgIG1vZHVsZS5kaXJlY3RpdmUoZGlyZWN0aXZlTmFtZSwgbmdFdmVudERpcmVjdGl2ZXNbZGlyZWN0aXZlTmFtZV0pO1xuICAgIH0pO1xuICB9KSgpO1xufSkoKTtcbiIsIi8vIGNvbmZpcm0gdG8gdXNlIGpxTGl0ZVxuaWYgKHdpbmRvdy5qUXVlcnkgJiYgYW5ndWxhci5lbGVtZW50ID09PSB3aW5kb3cualF1ZXJ5KSB7XG4gIGNvbnNvbGUud2FybignT25zZW4gVUkgcmVxdWlyZSBqcUxpdGUuIExvYWQgalF1ZXJ5IGFmdGVyIGxvYWRpbmcgQW5ndWxhckpTIHRvIGZpeCB0aGlzIGVycm9yLiBqUXVlcnkgbWF5IGJyZWFrIE9uc2VuIFVJIGJlaGF2aW9yLicpOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLWNvbnNvbGVcbn1cbiIsIi8qXG5Db3B5cmlnaHQgMjAxMy0yMDE1IEFTSUFMIENPUlBPUkFUSU9OXG5cbkxpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG55b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG5Zb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcblxuICAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG5cblVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbmRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbldJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxubGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG5cbiovXG5cbk9iamVjdC5rZXlzKG9ucy5ub3RpZmljYXRpb24pLmZpbHRlcihuYW1lID0+ICEvXl8vLnRlc3QobmFtZSkpLmZvckVhY2gobmFtZSA9PiB7XG4gIGNvbnN0IG9yaWdpbmFsTm90aWZpY2F0aW9uID0gb25zLm5vdGlmaWNhdGlvbltuYW1lXTtcblxuICBvbnMubm90aWZpY2F0aW9uW25hbWVdID0gKG1lc3NhZ2UsIG9wdGlvbnMgPSB7fSkgPT4ge1xuICAgIHR5cGVvZiBtZXNzYWdlID09PSAnc3RyaW5nJyA/IChvcHRpb25zLm1lc3NhZ2UgPSBtZXNzYWdlKSA6IChvcHRpb25zID0gbWVzc2FnZSk7XG5cbiAgICBjb25zdCBjb21waWxlID0gb3B0aW9ucy5jb21waWxlO1xuICAgIGxldCAkZWxlbWVudDtcblxuICAgIG9wdGlvbnMuY29tcGlsZSA9IGVsZW1lbnQgPT4ge1xuICAgICAgJGVsZW1lbnQgPSBhbmd1bGFyLmVsZW1lbnQoY29tcGlsZSA/IGNvbXBpbGUoZWxlbWVudCkgOiBlbGVtZW50KTtcbiAgICAgIHJldHVybiBvbnMuJGNvbXBpbGUoJGVsZW1lbnQpKCRlbGVtZW50LmluamVjdG9yKCkuZ2V0KCckcm9vdFNjb3BlJykpO1xuICAgIH07XG5cbiAgICBvcHRpb25zLmRlc3Ryb3kgPSAoKSA9PiB7XG4gICAgICAkZWxlbWVudC5kYXRhKCdfc2NvcGUnKS4kZGVzdHJveSgpO1xuICAgICAgJGVsZW1lbnQgPSBudWxsO1xuICAgIH07XG5cbiAgICByZXR1cm4gb3JpZ2luYWxOb3RpZmljYXRpb24ob3B0aW9ucyk7XG4gIH07XG59KTtcbiIsIi8qXG5Db3B5cmlnaHQgMjAxMy0yMDE1IEFTSUFMIENPUlBPUkFUSU9OXG5cbkxpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG55b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG5Zb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcblxuICAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG5cblVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbmRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbldJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxubGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG5cbiovXG5cbihmdW5jdGlvbigpe1xuICAndXNlIHN0cmljdCc7XG5cbiAgYW5ndWxhci5tb2R1bGUoJ29uc2VuJykucnVuKGZ1bmN0aW9uKCR0ZW1wbGF0ZUNhY2hlKSB7XG4gICAgdmFyIHRlbXBsYXRlcyA9IHdpbmRvdy5kb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCdzY3JpcHRbdHlwZT1cInRleHQvb25zLXRlbXBsYXRlXCJdJyk7XG5cbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRlbXBsYXRlcy5sZW5ndGg7IGkrKykge1xuICAgICAgdmFyIHRlbXBsYXRlID0gYW5ndWxhci5lbGVtZW50KHRlbXBsYXRlc1tpXSk7XG4gICAgICB2YXIgaWQgPSB0ZW1wbGF0ZS5hdHRyKCdpZCcpO1xuICAgICAgaWYgKHR5cGVvZiBpZCA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgJHRlbXBsYXRlQ2FjaGUucHV0KGlkLCB0ZW1wbGF0ZS50ZXh0KCkpO1xuICAgICAgfVxuICAgIH1cbiAgfSk7XG5cbn0pKCk7XG4iXSwibmFtZXMiOlsiZm5UZXN0IiwidGVzdCIsIkJhc2VDbGFzcyIsImV4dGVuZCIsInByb3BzIiwiX3N1cGVyIiwicHJvdG90eXBlIiwicHJvdG8iLCJPYmplY3QiLCJjcmVhdGUiLCJuYW1lIiwiZm4iLCJ0bXAiLCJyZXQiLCJhcHBseSIsImFyZ3VtZW50cyIsIm5ld0NsYXNzIiwiaW5pdCIsImhhc093blByb3BlcnR5IiwiU3ViQ2xhc3MiLCJFbXB0eUNsYXNzIiwiY29uc3RydWN0b3IiLCJDbGFzcyIsIm9ucyIsIm1vZHVsZSIsImFuZ3VsYXIiLCJ3YWl0T25zZW5VSUxvYWQiLCJ1bmxvY2tPbnNlblVJIiwiX3JlYWR5TG9jayIsImxvY2siLCJydW4iLCIkY29tcGlsZSIsIiRyb290U2NvcGUiLCJkb2N1bWVudCIsInJlYWR5U3RhdGUiLCJhZGRFdmVudExpc3RlbmVyIiwiYm9keSIsImFwcGVuZENoaWxkIiwiY3JlYXRlRWxlbWVudCIsIkVycm9yIiwiJG9uIiwiaW5pdEFuZ3VsYXJNb2R1bGUiLCJ2YWx1ZSIsIiRvbnNlbiIsIiRxIiwiX29uc2VuU2VydmljZSIsIl9xU2VydmljZSIsIndpbmRvdyIsImNvbnNvbGUiLCJhbGVydCIsImluaXRUZW1wbGF0ZUNhY2hlIiwiJHRlbXBsYXRlQ2FjaGUiLCJfaW50ZXJuYWwiLCJnZXRUZW1wbGF0ZUhUTUxBc3luYyIsInBhZ2UiLCJjYWNoZSIsImdldCIsIlByb21pc2UiLCJyZXNvbHZlIiwiaW5pdE9uc2VuRmFjYWRlIiwiY29tcG9uZW50QmFzZSIsImJvb3RzdHJhcCIsImRlcHMiLCJpc0FycmF5IiwidW5kZWZpbmVkIiwiY29uY2F0IiwiZG9jIiwiZG9jdW1lbnRFbGVtZW50IiwiZmluZFBhcmVudENvbXBvbmVudFVudGlsIiwiZG9tIiwiZWxlbWVudCIsIkhUTUxFbGVtZW50IiwidGFyZ2V0IiwiaW5oZXJpdGVkRGF0YSIsImZpbmRDb21wb25lbnQiLCJzZWxlY3RvciIsInF1ZXJ5U2VsZWN0b3IiLCJkYXRhIiwibm9kZU5hbWUiLCJ0b0xvd2VyQ2FzZSIsImNvbXBpbGUiLCJzY29wZSIsIl9nZXRPbnNlblNlcnZpY2UiLCJfd2FpdERpcmV0aXZlSW5pdCIsImVsZW1lbnROYW1lIiwibGFzdFJlYWR5IiwiY2FsbGJhY2siLCJsaXN0ZW4iLCJyZW1vdmVFdmVudExpc3RlbmVyIiwiY3JlYXRlRWxlbWVudE9yaWdpbmFsIiwidGVtcGxhdGUiLCJvcHRpb25zIiwibGluayIsInBhcmVudFNjb3BlIiwiJG5ldyIsIiRldmFsQXN5bmMiLCJnZXRTY29wZSIsImUiLCJ0YWdOYW1lIiwicmVzdWx0IiwiYXBwZW5kIiwidGhlbiIsInJlc29sdmVMb2FkaW5nUGxhY2VIb2xkZXJPcmlnaW5hbCIsInJlc29sdmVMb2FkaW5nUGxhY2VIb2xkZXIiLCJyZXNvbHZlTG9hZGluZ1BsYWNlaG9sZGVyIiwicmVzb2x2ZUxvYWRpbmdQbGFjZWhvbGRlck9yaWdpbmFsIiwiZG9uZSIsInNldEltbWVkaWF0ZSIsIl9zZXR1cExvYWRpbmdQbGFjZUhvbGRlcnMiLCJmYWN0b3J5IiwiQWN0aW9uU2hlZXRWaWV3IiwiYXR0cnMiLCJfc2NvcGUiLCJfZWxlbWVudCIsIl9hdHRycyIsIl9jbGVhckRlcml2aW5nTWV0aG9kcyIsImRlcml2ZU1ldGhvZHMiLCJfY2xlYXJEZXJpdmluZ0V2ZW50cyIsImRlcml2ZUV2ZW50cyIsImRldGFpbCIsImFjdGlvblNoZWV0IiwiYmluZCIsIl9kZXN0cm95IiwiZW1pdCIsInJlbW92ZSIsIm1peGluIiwiZGVyaXZlUHJvcGVydGllc0Zyb21FbGVtZW50IiwiQWxlcnREaWFsb2dWaWV3IiwiYWxlcnREaWFsb2ciLCJDYXJvdXNlbFZpZXciLCJjYXJvdXNlbCIsIkRpYWxvZ1ZpZXciLCJkaWFsb2ciLCJGYWJWaWV3IiwiR2VuZXJpY1ZpZXciLCJzZWxmIiwiZGlyZWN0aXZlT25seSIsIm1vZGlmaWVyVGVtcGxhdGUiLCJhZGRNb2RpZmllck1ldGhvZHMiLCJhZGRNb2RpZmllck1ldGhvZHNGb3JDdXN0b21FbGVtZW50cyIsImNsZWFuZXIiLCJvbkRlc3Ryb3kiLCJfZXZlbnRzIiwicmVtb3ZlTW9kaWZpZXJNZXRob2RzIiwiY2xlYXJDb21wb25lbnQiLCJyZWdpc3RlciIsInZpZXciLCJ2aWV3S2V5IiwiZGVjbGFyZVZhckF0dHJpYnV0ZSIsImRlc3Ryb3kiLCJub29wIiwiZGlyZWN0aXZlQXR0cmlidXRlcyIsIkFuZ3VsYXJMYXp5UmVwZWF0RGVsZWdhdGUiLCJ1c2VyRGVsZWdhdGUiLCJ0ZW1wbGF0ZUVsZW1lbnQiLCJfcGFyZW50U2NvcGUiLCJmb3JFYWNoIiwicmVtb3ZlQXR0cmlidXRlIiwiYXR0ciIsIl9saW5rZXIiLCJjbG9uZU5vZGUiLCJpdGVtIiwiX3VzZXJEZWxlZ2F0ZSIsImNvbmZpZ3VyZUl0ZW1TY29wZSIsIkZ1bmN0aW9uIiwiZGVzdHJveUl0ZW1TY29wZSIsImNyZWF0ZUl0ZW1Db250ZW50IiwiaW5kZXgiLCJfcHJlcGFyZUl0ZW1FbGVtZW50IiwiX2FkZFNwZWNpYWxQcm9wZXJ0aWVzIiwiX3VzaW5nQmluZGluZyIsImNsb25lZCIsImkiLCJsYXN0IiwiY291bnRJdGVtcyIsIiRkZXN0cm95IiwiTGF6eVJlcGVhdERlbGVnYXRlIiwiTGF6eVJlcGVhdFZpZXciLCJsaW5rZXIiLCIkZXZhbCIsIm9uc0xhenlSZXBlYXQiLCJpbnRlcm5hbERlbGVnYXRlIiwiX3Byb3ZpZGVyIiwiTGF6eVJlcGVhdFByb3ZpZGVyIiwicGFyZW50Tm9kZSIsInJlZnJlc2giLCIkd2F0Y2giLCJfb25DaGFuZ2UiLCIkcGFyc2UiLCJNb2RhbFZpZXciLCJtb2RhbCIsIk5hdmlnYXRvclZpZXciLCJfcHJldmlvdXNQYWdlU2NvcGUiLCJfYm91bmRPblByZXBvcCIsIl9vblByZXBvcCIsIm9uIiwibmF2aWdhdG9yIiwiZXZlbnQiLCJwYWdlcyIsImxlbmd0aCIsIm9mZiIsIlBhZ2VWaWV3IiwiX2NsZWFyTGlzdGVuZXIiLCJkZWZpbmVQcm9wZXJ0eSIsIm9uRGV2aWNlQmFja0J1dHRvbiIsIl91c2VyQmFja0J1dHRvbkhhbmRsZXIiLCJfZW5hYmxlQmFja0J1dHRvbkhhbmRsZXIiLCJuZ0RldmljZUJhY2tCdXR0b24iLCJuZ0luZmluaXRlU2Nyb2xsIiwib25JbmZpbml0ZVNjcm9sbCIsIl9vbkRldmljZUJhY2tCdXR0b24iLCIkZXZlbnQiLCJsYXN0RXZlbnQiLCJQb3BvdmVyVmlldyIsInBvcG92ZXIiLCJQdWxsSG9va1ZpZXciLCJwdWxsSG9vayIsIm9uQWN0aW9uIiwibmdBY3Rpb24iLCIkZG9uZSIsIlNwZWVkRGlhbFZpZXciLCJTcGxpdHRlckNvbnRlbnQiLCJsb2FkIiwiX3BhZ2VTY29wZSIsIlNwbGl0dGVyU2lkZSIsInNpZGUiLCJTcGxpdHRlciIsInByb3AiLCJTd2l0Y2hWaWV3IiwiX2NoZWNrYm94IiwiX3ByZXBhcmVOZ01vZGVsIiwibmdNb2RlbCIsInNldCIsImFzc2lnbiIsIiRwYXJlbnQiLCJjaGVja2VkIiwibmdDaGFuZ2UiLCJUYWJiYXJWaWV3IiwiVG9hc3RWaWV3IiwidG9hc3QiLCJkaXJlY3RpdmUiLCJmaXJlQ29tcG9uZW50RXZlbnQiLCJyZWdpc3RlckV2ZW50SGFuZGxlcnMiLCJDb21wb25lbnRDbGVhbmVyIiwiY29udHJvbGxlciIsInRyYW5zY2x1ZGUiLCJiYWNrQnV0dG9uIiwibmdDbGljayIsIm9uQ2xpY2siLCJkZXN0cm95U2NvcGUiLCJkZXN0cm95QXR0cmlidXRlcyIsImJ1dHRvbiIsImRpc2FibGVkIiwiJGxhc3QiLCJ1dGlsIiwiZmluZFBhcmVudCIsIl9zd2lwZXIiLCJoYXNBdHRyaWJ1dGUiLCJlbCIsIm9uQ2hhbmdlIiwiaXNSZWFkeSIsIiRicm9hZGNhc3QiLCJmYWIiLCJFVkVOVFMiLCJzcGxpdCIsInNjb3BlRGVmIiwicmVkdWNlIiwiZGljdCIsInRpdGxpemUiLCJzdHIiLCJjaGFyQXQiLCJ0b1VwcGVyQ2FzZSIsInNsaWNlIiwiXyIsImhhbmRsZXIiLCJ0eXBlIiwiZ2VzdHVyZURldGVjdG9yIiwiX2dlc3R1cmVEZXRlY3RvciIsImpvaW4iLCJpY29uIiwiaW5kZXhPZiIsIiRvYnNlcnZlIiwiX3VwZGF0ZSIsIiRvbnNHbG9iYWwiLCJjc3MiLCJ1cGRhdGUiLCJvcmllbnRhdGlvbiIsInVzZXJPcmllbnRhdGlvbiIsIm9uc0lmT3JpZW50YXRpb24iLCJnZXRMYW5kc2NhcGVPclBvcnRyYWl0IiwiaXNQb3J0cmFpdCIsInBsYXRmb3JtIiwiZ2V0UGxhdGZvcm1TdHJpbmciLCJ1c2VyUGxhdGZvcm0iLCJ1c2VyUGxhdGZvcm1zIiwib25zSWZQbGF0Zm9ybSIsInRyaW0iLCJ1c2VyQWdlbnQiLCJtYXRjaCIsImlzT3BlcmEiLCJvcGVyYSIsImlzRmlyZWZveCIsIkluc3RhbGxUcmlnZ2VyIiwiaXNTYWZhcmkiLCJ0b1N0cmluZyIsImNhbGwiLCJpc0VkZ2UiLCJpc0Nocm9tZSIsImNocm9tZSIsImlzSUUiLCJkb2N1bWVudE1vZGUiLCJvbklucHV0IiwiTnVtYmVyIiwiY29tcGlsZUZ1bmN0aW9uIiwic2hvdyIsImRpc3BTaG93IiwiZGlzcEhpZGUiLCJvblNob3ciLCJvbkhpZGUiLCJvbkluaXQiLCJ2aXNpYmxlIiwic29mdHdhcmVLZXlib2FyZCIsIl92aXNpYmxlIiwibGF6eVJlcGVhdCIsIm9uc0xvYWRpbmdQbGFjZWhvbGRlciIsIl9yZXNvbHZlTG9hZGluZ1BsYWNlaG9sZGVyIiwiY29udGVudEVsZW1lbnQiLCJlbGVtZW50cyIsIk5hdmlnYXRvciIsInJld3JpdGFibGVzIiwicmVhZHkiLCJwYWdlTG9hZGVyIiwiY3JlYXRlUGFnZUxvYWRlciIsImZpcmVQYWdlSW5pdEV2ZW50IiwiZiIsImlzQXR0YWNoZWQiLCJmaXJlQWN0dWFsUGFnZUluaXRFdmVudCIsImNyZWF0ZUV2ZW50IiwiaW5pdEV2ZW50IiwiZGlzcGF0Y2hFdmVudCIsInBvc3RMaW5rIiwic3BlZWREaWFsIiwic3BsaXR0ZXIiLCJuZ0NvbnRyb2xsZXIiLCJzd2l0Y2hWaWV3IiwiVGFiYmFyIiwidGFiYmFyVmlldyIsInRhYiIsImNvbnRlbnQiLCJodG1sIiwicHV0IiwidG9vbGJhckJ1dHRvbiIsIiR3aW5kb3ciLCIkY2FjaGVGYWN0b3J5IiwiJGRvY3VtZW50IiwiJGh0dHAiLCJjcmVhdGVPbnNlblNlcnZpY2UiLCJNb2RpZmllclV0aWwiLCJfdXRpbCIsImRiYkRpc3BhdGNoZXIiLCJfZGVmYXVsdERldmljZUJhY2tCdXR0b25IYW5kbGVyIiwibWV0aG9kTmFtZXMiLCJtZXRob2ROYW1lIiwia2xhc3MiLCJwcm9wZXJ0aWVzIiwicHJvcGVydHkiLCJldmVudE5hbWVzIiwibWFwIiwibGlzdGVuZXJzIiwiZXZlbnROYW1lIiwibGlzdGVuZXIiLCJwdXNoIiwiX2NvbmZpZyIsImF1dG9TdGF0dXNCYXJGaWxsIiwic2hvdWxkRmlsbFN0YXR1c0JhciIsInBhZ2VFbGVtZW50IiwicGFnZVNjb3BlIiwiUGFnZUxvYWRlciIsInBhcmVudCIsImdldFBhZ2VIVE1MQXN5bmMiLCJjb21waWxlQW5kTGluayIsInBhcmFtcyIsImRlc3Ryb3lFbGVtZW50IiwiZGVmZXJyZWQiLCJkZWZlciIsIm5vcm1hbGl6ZVBhZ2VIVE1MIiwicHJvbWlzZSIsInJlc3BvbnNlIiwibW9kaWZpZXJzIiwiYXR0ck1vZGlmaWVycyIsIm1vZGlmaWVyIiwicmVwbGFjZSIsIm1ldGhvZHMiLCJuZWVkbGUiLCJ0b2tlbnMiLCJzb21lIiwiZmlsdGVyIiwidG9rZW4iLCJoYXNNb2RpZmllciIsInJlbW92ZU1vZGlmaWVyIiwiYWRkTW9kaWZpZXIiLCJtZXRob2QiLCJfdHIiLCJmbnMiLCJoYXNDbGFzcyIsInJlbW92ZUNsYXNzIiwiYWRkQ2xhc3MiLCJjbGFzc2VzIiwicGF0dCIsImNscyIsIm9sZEZuIiwibmV3Rm4iLCJzZXRNb2RpZmllciIsInRvZ2dsZU1vZGlmaWVyIiwib2JqZWN0IiwidmFyIiwidmFyTmFtZSIsIl9kZWZpbmVWYXIiLCJjb21wb25lbnQiLCJjYXBpdGFsaXplZEV2ZW50TmFtZSIsImwiLCJfcmVnaXN0ZXJFdmVudEhhbmRsZXIiLCJpc1dlYlZpZXciLCJ1YSIsInBhcnNlRmxvYXQiLCJrZXkiLCJuYW1lcyIsImNvbnRhaW5lciIsInBhcmVudEVsZW1lbnQiLCJjaGlsZHJlbiIsImRlY29tcG9zZU5vZGUiLCIkJGVsZW1lbnQiLCIkJG9ic2VydmVycyIsIiQkbGlzdGVuZXJzIiwiJCR3YXRjaGVycyIsImNsZWFyIiwibmdFdmVudERpcmVjdGl2ZXMiLCJkaXJlY3RpdmVOYW1lIiwiZGlyZWN0aXZlTm9ybWFsaXplIiwiJGVsZW1lbnQiLCIkYXBwbHkiLCJtYXRjaGVzIiwiY29uZmlnIiwiJHByb3ZpZGUiLCJzaGlmdCIsIiRkZWxlZ2F0ZSIsImtleXMiLCJkZWNvcmF0b3IiLCJqUXVlcnkiLCJ3YXJuIiwibm90aWZpY2F0aW9uIiwib3JpZ2luYWxOb3RpZmljYXRpb24iLCJtZXNzYWdlIiwiaW5qZWN0b3IiLCJ0ZW1wbGF0ZXMiLCJxdWVyeVNlbGVjdG9yQWxsIiwiaWQiLCJ0ZXh0Il0sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUFBOzs7OztBQUtBLENBQUMsWUFBVztNQUVOQSxTQUFTLE1BQU1DLElBQU4sQ0FBVyxZQUFVOztHQUFyQixJQUErQixZQUEvQixHQUE4QyxJQUEzRDs7O1dBR1NDLFNBQVQsR0FBb0I7OztZQUdWQyxNQUFWLEdBQW1CLFVBQVNDLEtBQVQsRUFBZ0I7UUFDN0JDLFNBQVMsS0FBS0MsU0FBbEI7Ozs7UUFJSUMsUUFBUUMsT0FBT0MsTUFBUCxDQUFjSixNQUFkLENBQVo7OztTQUdLLElBQUlLLElBQVQsSUFBaUJOLEtBQWpCLEVBQXdCOztZQUVoQk0sSUFBTixJQUFjLE9BQU9OLE1BQU1NLElBQU4sQ0FBUCxLQUF1QixVQUF2QixJQUNaLE9BQU9MLE9BQU9LLElBQVAsQ0FBUCxJQUF1QixVQURYLElBQ3lCVixPQUFPQyxJQUFQLENBQVlHLE1BQU1NLElBQU4sQ0FBWixD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
