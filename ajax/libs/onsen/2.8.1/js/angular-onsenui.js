/* angular-onsenui v2.8.1 - 2017-11-15 */

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
  "use strict";

  var fnTest = /xyz/.test(function () {
    xyz;
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
  'use strict';

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
  'use strict';

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
  'use strict';

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
  'use strict';

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

    $onsen.derivePropertiesFromElement(CarouselView, ['centered', 'overscrollable', 'disabled', 'autoScroll', 'swipeable', 'autoScrollRatio', 'itemCount']);

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
  'use strict';

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
  'use strict';

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
  'use strict';

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
  'use strict';

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
  'use strict';

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

        var internalDelegate = new AngularLazyRepeatDelegate(userDelegate, element[0], element.scope());

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
  'use strict';

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
    $onsen.derivePropertiesFromElement(ModalView, ['onDeviceBackButton']);

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
  'use strict';

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
    $onsen.derivePropertiesFromElement(NavigatorView, ['pages', 'topPage']);

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
  'use strict';

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
  'use strict';

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
    $onsen.derivePropertiesFromElement(PopoverView, ['cancelable', 'disabled', 'onDeviceBackButton']);

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
  'use strict';

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
    $onsen.derivePropertiesFromElement(PullHookView, ['state', 'pullDistance', 'height', 'thresholdHeight', 'disabled']);

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
  'use strict';

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
  'use strict';

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
  'use strict';

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
    $onsen.derivePropertiesFromElement(SplitterSide, ['page', 'mode', 'isOpen']);

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
  'use strict';

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

    ['left', 'right', 'content', 'mask'].forEach(function (prop, i) {
      Object.defineProperty(Splitter.prototype, prop, {
        get: function get() {
          var tagName = 'ons-splitter-' + (i < 2 ? 'side' : prop);
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
  'use strict';

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
    $onsen.derivePropertiesFromElement(SwitchView, ['disabled', 'checked', 'checkbox']);

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
  'use strict';

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
  'use strict';

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
  'use strict';

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
  'use strict';

  /**
   * Action sheet directive.
   */

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
  'use strict';

  /**
   * Alert dialog directive.
   */

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
  'use strict';

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
  'use strict';

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
  'use strict';

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
  'use strict';

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
  'use strict';

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
  'use strict';

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
  'use strict';

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
  'use strict';

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
  'use strict';

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
  'use strict';

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
  'use strict';

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
  'use strict';

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
  'use strict';

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
  'use strict';

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
  'use strict';

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
  'use strict';

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
  'use strict';

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
  'use strict';

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
  'use strict';

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
  'use strict';

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
  'use strict';

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
  'use strict';

  /**
   * Modal directive.
   */

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
  'use strict';

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
  'use strict';

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
  'use strict';

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
  'use strict';

  /**
   * Pull hook directive.
   */

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
  'use strict';

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
  'use strict';

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
  'use strict';

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
  'use strict';

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
  'use strict';

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
  'use strict';

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
  'use strict';

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
  'use strict';

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
 * @attribute ons-destroy
 * @initonly
 * @type {Expression}
 * @description
 *  [en]Allows you to specify custom behavior when the "destroy" event is fired.[/en]
 *  [ja]"destroy"イベントが発火された時の挙動を独自に指定できます。[/ja]
 */
(function () {
  'use strict';

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
  'use strict';

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
 *   [en]Variable name to refer this split view.[/en]
 *   [ja]このスプリットビューコンポーネントを参照するための名前を指定します。[/ja]
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
  'use strict';

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
  'use strict';

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
  'use strict';

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
  'use strict';

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
  'use strict';

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
  'use strict';

  /**
   * Toast directive.
   */

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
  'use strict';

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
  'use strict';

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
  'use strict';

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

          // Attach to ancestor with ons-scope attribute.
          var element = object._element[0];

          while (element.parentNode) {
            if (element.hasAttribute('ons-scope')) {
              set(angular.element(element).data('_scope'), names, object);
              element = null;
              return;
            }

            element = element.parentNode;
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
  'use strict';

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
  'use strict';

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYW5ndWxhci1vbnNlbnVpLmpzIiwic291cmNlcyI6WyIuLi8uLi9iaW5kaW5ncy9hbmd1bGFyMS92ZW5kb3IvY2xhc3MuanMiLCIuLi8uLi9iaW5kaW5ncy9hbmd1bGFyMS9qcy9vbnNlbi5qcyIsIi4uLy4uL2JpbmRpbmdzL2FuZ3VsYXIxL3ZpZXdzL2FjdGlvblNoZWV0LmpzIiwiLi4vLi4vYmluZGluZ3MvYW5ndWxhcjEvdmlld3MvYWxlcnREaWFsb2cuanMiLCIuLi8uLi9iaW5kaW5ncy9hbmd1bGFyMS92aWV3cy9jYXJvdXNlbC5qcyIsIi4uLy4uL2JpbmRpbmdzL2FuZ3VsYXIxL3ZpZXdzL2RpYWxvZy5qcyIsIi4uLy4uL2JpbmRpbmdzL2FuZ3VsYXIxL3ZpZXdzL2ZhYi5qcyIsIi4uLy4uL2JpbmRpbmdzL2FuZ3VsYXIxL3ZpZXdzL2dlbmVyaWMuanMiLCIuLi8uLi9iaW5kaW5ncy9hbmd1bGFyMS92aWV3cy9sYXp5UmVwZWF0RGVsZWdhdGUuanMiLCIuLi8uLi9iaW5kaW5ncy9hbmd1bGFyMS92aWV3cy9sYXp5UmVwZWF0LmpzIiwiLi4vLi4vYmluZGluZ3MvYW5ndWxhcjEvdmlld3MvbW9kYWwuanMiLCIuLi8uLi9iaW5kaW5ncy9hbmd1bGFyMS92aWV3cy9uYXZpZ2F0b3IuanMiLCIuLi8uLi9iaW5kaW5ncy9hbmd1bGFyMS92aWV3cy9wYWdlLmpzIiwiLi4vLi4vYmluZGluZ3MvYW5ndWxhcjEvdmlld3MvcG9wb3Zlci5qcyIsIi4uLy4uL2JpbmRpbmdzL2FuZ3VsYXIxL3ZpZXdzL3B1bGxIb29rLmpzIiwiLi4vLi4vYmluZGluZ3MvYW5ndWxhcjEvdmlld3Mvc3BlZWREaWFsLmpzIiwiLi4vLi4vYmluZGluZ3MvYW5ndWxhcjEvdmlld3Mvc3BsaXR0ZXJDb250ZW50LmpzIiwiLi4vLi4vYmluZGluZ3MvYW5ndWxhcjEvdmlld3Mvc3BsaXR0ZXJTaWRlLmpzIiwiLi4vLi4vYmluZGluZ3MvYW5ndWxhcjEvdmlld3Mvc3BsaXR0ZXIuanMiLCIuLi8uLi9iaW5kaW5ncy9hbmd1bGFyMS92aWV3cy9zd2l0Y2guanMiLCIuLi8uLi9iaW5kaW5ncy9hbmd1bGFyMS92aWV3cy90YWJiYXIuanMiLCIuLi8uLi9iaW5kaW5ncy9hbmd1bGFyMS92aWV3cy90b2FzdC5qcyIsIi4uLy4uL2JpbmRpbmdzL2FuZ3VsYXIxL2RpcmVjdGl2ZXMvYWN0aW9uU2hlZXRCdXR0b24uanMiLCIuLi8uLi9iaW5kaW5ncy9hbmd1bGFyMS9kaXJlY3RpdmVzL2FjdGlvblNoZWV0LmpzIiwiLi4vLi4vYmluZGluZ3MvYW5ndWxhcjEvZGlyZWN0aXZlcy9hbGVydERpYWxvZy5qcyIsIi4uLy4uL2JpbmRpbmdzL2FuZ3VsYXIxL2RpcmVjdGl2ZXMvYmFja0J1dHRvbi5qcyIsIi4uLy4uL2JpbmRpbmdzL2FuZ3VsYXIxL2RpcmVjdGl2ZXMvYm90dG9tVG9vbGJhci5qcyIsIi4uLy4uL2JpbmRpbmdzL2FuZ3VsYXIxL2RpcmVjdGl2ZXMvYnV0dG9uLmpzIiwiLi4vLi4vYmluZGluZ3MvYW5ndWxhcjEvZGlyZWN0aXZlcy9jYXJkLmpzIiwiLi4vLi4vYmluZGluZ3MvYW5ndWxhcjEvZGlyZWN0aXZlcy9jYXJvdXNlbC5qcyIsIi4uLy4uL2JpbmRpbmdzL2FuZ3VsYXIxL2RpcmVjdGl2ZXMvY2hlY2tib3guanMiLCIuLi8uLi9iaW5kaW5ncy9hbmd1bGFyMS9kaXJlY3RpdmVzL2RpYWxvZy5qcyIsIi4uLy4uL2JpbmRpbmdzL2FuZ3VsYXIxL2RpcmVjdGl2ZXMvZHVtbXlGb3JJbml0LmpzIiwiLi4vLi4vYmluZGluZ3MvYW5ndWxhcjEvZGlyZWN0aXZlcy9mYWIuanMiLCIuLi8uLi9iaW5kaW5ncy9hbmd1bGFyMS9kaXJlY3RpdmVzL2dlc3R1cmVEZXRlY3Rvci5qcyIsIi4uLy4uL2JpbmRpbmdzL2FuZ3VsYXIxL2RpcmVjdGl2ZXMvaWNvbi5qcyIsIi4uLy4uL2JpbmRpbmdzL2FuZ3VsYXIxL2RpcmVjdGl2ZXMvaWZPcmllbnRhdGlvbi5qcyIsIi4uLy4uL2JpbmRpbmdzL2FuZ3VsYXIxL2RpcmVjdGl2ZXMvaWZQbGF0Zm9ybS5qcyIsIi4uLy4uL2JpbmRpbmdzL2FuZ3VsYXIxL2RpcmVjdGl2ZXMvaW5wdXQuanMiLCIuLi8uLi9iaW5kaW5ncy9hbmd1bGFyMS9kaXJlY3RpdmVzL2tleWJvYXJkLmpzIiwiLi4vLi4vYmluZGluZ3MvYW5ndWxhcjEvZGlyZWN0aXZlcy9sYXp5UmVwZWF0LmpzIiwiLi4vLi4vYmluZGluZ3MvYW5ndWxhcjEvZGlyZWN0aXZlcy9saXN0SGVhZGVyLmpzIiwiLi4vLi4vYmluZGluZ3MvYW5ndWxhcjEvZGlyZWN0aXZlcy9saXN0SXRlbS5qcyIsIi4uLy4uL2JpbmRpbmdzL2FuZ3VsYXIxL2RpcmVjdGl2ZXMvbGlzdC5qcyIsIi4uLy4uL2JpbmRpbmdzL2FuZ3VsYXIxL2RpcmVjdGl2ZXMvbGlzdFRpdGxlLmpzIiwiLi4vLi4vYmluZGluZ3MvYW5ndWxhcjEvZGlyZWN0aXZlcy9sb2FkaW5nUGxhY2Vob2xkZXIuanMiLCIuLi8uLi9iaW5kaW5ncy9hbmd1bGFyMS9kaXJlY3RpdmVzL21vZGFsLmpzIiwiLi4vLi4vYmluZGluZ3MvYW5ndWxhcjEvZGlyZWN0aXZlcy9uYXZpZ2F0b3IuanMiLCIuLi8uLi9iaW5kaW5ncy9hbmd1bGFyMS9kaXJlY3RpdmVzL3BhZ2UuanMiLCIuLi8uLi9iaW5kaW5ncy9hbmd1bGFyMS9kaXJlY3RpdmVzL3BvcG92ZXIuanMiLCIuLi8uLi9iaW5kaW5ncy9hbmd1bGFyMS9kaXJlY3RpdmVzL3B1bGxIb29rLmpzIiwiLi4vLi4vYmluZGluZ3MvYW5ndWxhcjEvZGlyZWN0aXZlcy9yYWRpby5qcyIsIi4uLy4uL2JpbmRpbmdzL2FuZ3VsYXIxL2RpcmVjdGl2ZXMvcmFuZ2UuanMiLCIuLi8uLi9iaW5kaW5ncy9hbmd1bGFyMS9kaXJlY3RpdmVzL3JpcHBsZS5qcyIsIi4uLy4uL2JpbmRpbmdzL2FuZ3VsYXIxL2RpcmVjdGl2ZXMvc2NvcGUuanMiLCIuLi8uLi9iaW5kaW5ncy9hbmd1bGFyMS9kaXJlY3RpdmVzL3NlYXJjaElucHV0LmpzIiwiLi4vLi4vYmluZGluZ3MvYW5ndWxhcjEvZGlyZWN0aXZlcy9zZWdtZW50LmpzIiwiLi4vLi4vYmluZGluZ3MvYW5ndWxhcjEvZGlyZWN0aXZlcy9zZWxlY3QuanMiLCIuLi8uLi9iaW5kaW5ncy9hbmd1bGFyMS9kaXJlY3RpdmVzL3NwZWVkRGlhbC5qcyIsIi4uLy4uL2JpbmRpbmdzL2FuZ3VsYXIxL2RpcmVjdGl2ZXMvc3BsaXR0ZXJDb250ZW50LmpzIiwiLi4vLi4vYmluZGluZ3MvYW5ndWxhcjEvZGlyZWN0aXZlcy9zcGxpdHRlclNpZGUuanMiLCIuLi8uLi9iaW5kaW5ncy9hbmd1bGFyMS9kaXJlY3RpdmVzL3NwbGl0dGVyLmpzIiwiLi4vLi4vYmluZGluZ3MvYW5ndWxhcjEvZGlyZWN0aXZlcy9zd2l0Y2guanMiLCIuLi8uLi9iaW5kaW5ncy9hbmd1bGFyMS9kaXJlY3RpdmVzL3RhYmJhci5qcyIsIi4uLy4uL2JpbmRpbmdzL2FuZ3VsYXIxL2RpcmVjdGl2ZXMvdGFiLmpzIiwiLi4vLi4vYmluZGluZ3MvYW5ndWxhcjEvZGlyZWN0aXZlcy90ZW1wbGF0ZS5qcyIsIi4uLy4uL2JpbmRpbmdzL2FuZ3VsYXIxL2RpcmVjdGl2ZXMvdG9hc3QuanMiLCIuLi8uLi9iaW5kaW5ncy9hbmd1bGFyMS9kaXJlY3RpdmVzL3Rvb2xiYXJCdXR0b24uanMiLCIuLi8uLi9iaW5kaW5ncy9hbmd1bGFyMS9kaXJlY3RpdmVzL3Rvb2xiYXIuanMiLCIuLi8uLi9iaW5kaW5ncy9hbmd1bGFyMS9zZXJ2aWNlcy9vbnNlbi5qcyIsIi4uLy4uL2JpbmRpbmdzL2FuZ3VsYXIxL3NlcnZpY2VzL2NvbXBvbmVudENsZWFuZXIuanMiLCIuLi8uLi9iaW5kaW5ncy9hbmd1bGFyMS9qcy9zZXR1cC5qcyIsIi4uLy4uL2JpbmRpbmdzL2FuZ3VsYXIxL2pzL25vdGlmaWNhdGlvbi5qcyIsIi4uLy4uL2JpbmRpbmdzL2FuZ3VsYXIxL2pzL3RlbXBsYXRlTG9hZGVyLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIi8qIFNpbXBsZSBKYXZhU2NyaXB0IEluaGVyaXRhbmNlIGZvciBFUyA1LjFcbiAqIGJhc2VkIG9uIGh0dHA6Ly9lam9obi5vcmcvYmxvZy9zaW1wbGUtamF2YXNjcmlwdC1pbmhlcml0YW5jZS9cbiAqICAoaW5zcGlyZWQgYnkgYmFzZTIgYW5kIFByb3RvdHlwZSlcbiAqIE1JVCBMaWNlbnNlZC5cbiAqL1xuKGZ1bmN0aW9uKCkge1xuICBcInVzZSBzdHJpY3RcIjtcbiAgdmFyIGZuVGVzdCA9IC94eXovLnRlc3QoZnVuY3Rpb24oKXt4eXo7fSkgPyAvXFxiX3N1cGVyXFxiLyA6IC8uKi87XG5cbiAgLy8gVGhlIGJhc2UgQ2xhc3MgaW1wbGVtZW50YXRpb24gKGRvZXMgbm90aGluZylcbiAgZnVuY3Rpb24gQmFzZUNsYXNzKCl7fVxuXG4gIC8vIENyZWF0ZSBhIG5ldyBDbGFzcyB0aGF0IGluaGVyaXRzIGZyb20gdGhpcyBjbGFzc1xuICBCYXNlQ2xhc3MuZXh0ZW5kID0gZnVuY3Rpb24ocHJvcHMpIHtcbiAgICB2YXIgX3N1cGVyID0gdGhpcy5wcm90b3R5cGU7XG5cbiAgICAvLyBTZXQgdXAgdGhlIHByb3RvdHlwZSB0byBpbmhlcml0IGZyb20gdGhlIGJhc2UgY2xhc3NcbiAgICAvLyAoYnV0IHdpdGhvdXQgcnVubmluZyB0aGUgaW5pdCBjb25zdHJ1Y3RvcilcbiAgICB2YXIgcHJvdG8gPSBPYmplY3QuY3JlYXRlKF9zdXBlcik7XG5cbiAgICAvLyBDb3B5IHRoZSBwcm9wZXJ0aWVzIG92ZXIgb250byB0aGUgbmV3IHByb3RvdHlwZVxuICAgIGZvciAodmFyIG5hbWUgaW4gcHJvcHMpIHtcbiAgICAgIC8vIENoZWNrIGlmIHdlJ3JlIG92ZXJ3cml0aW5nIGFuIGV4aXN0aW5nIGZ1bmN0aW9uXG4gICAgICBwcm90b1tuYW1lXSA9IHR5cGVvZiBwcm9wc1tuYW1lXSA9PT0gXCJmdW5jdGlvblwiICYmXG4gICAgICAgIHR5cGVvZiBfc3VwZXJbbmFtZV0gPT0gXCJmdW5jdGlvblwiICYmIGZuVGVzdC50ZXN0KHByb3BzW25hbWVdKVxuICAgICAgICA/IChmdW5jdGlvbihuYW1lLCBmbil7XG4gICAgICAgICAgICByZXR1cm4gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgIHZhciB0bXAgPSB0aGlzLl9zdXBlcjtcblxuICAgICAgICAgICAgICAvLyBBZGQgYSBuZXcgLl9zdXBlcigpIG1ldGhvZCB0aGF0IGlzIHRoZSBzYW1lIG1ldGhvZFxuICAgICAgICAgICAgICAvLyBidXQgb24gdGhlIHN1cGVyLWNsYXNzXG4gICAgICAgICAgICAgIHRoaXMuX3N1cGVyID0gX3N1cGVyW25hbWVdO1xuXG4gICAgICAgICAgICAgIC8vIFRoZSBtZXRob2Qgb25seSBuZWVkIHRvIGJlIGJvdW5kIHRlbXBvcmFyaWx5LCBzbyB3ZVxuICAgICAgICAgICAgICAvLyByZW1vdmUgaXQgd2hlbiB3ZSdyZSBkb25lIGV4ZWN1dGluZ1xuICAgICAgICAgICAgICB2YXIgcmV0ID0gZm4uYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICAgICAgICAgICAgdGhpcy5fc3VwZXIgPSB0bXA7XG5cbiAgICAgICAgICAgICAgcmV0dXJuIHJldDtcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgfSkobmFtZSwgcHJvcHNbbmFtZV0pXG4gICAgICAgIDogcHJvcHNbbmFtZV07XG4gICAgfVxuXG4gICAgLy8gVGhlIG5ldyBjb25zdHJ1Y3RvclxuICAgIHZhciBuZXdDbGFzcyA9IHR5cGVvZiBwcm90by5pbml0ID09PSBcImZ1bmN0aW9uXCJcbiAgICAgID8gcHJvdG8uaGFzT3duUHJvcGVydHkoXCJpbml0XCIpXG4gICAgICAgID8gcHJvdG8uaW5pdCAvLyBBbGwgY29uc3RydWN0aW9uIGlzIGFjdHVhbGx5IGRvbmUgaW4gdGhlIGluaXQgbWV0aG9kXG4gICAgICAgIDogZnVuY3Rpb24gU3ViQ2xhc3MoKXsgX3N1cGVyLmluaXQuYXBwbHkodGhpcywgYXJndW1lbnRzKTsgfVxuICAgICAgOiBmdW5jdGlvbiBFbXB0eUNsYXNzKCl7fTtcblxuICAgIC8vIFBvcHVsYXRlIG91ciBjb25zdHJ1Y3RlZCBwcm90b3R5cGUgb2JqZWN0XG4gICAgbmV3Q2xhc3MucHJvdG90eXBlID0gcHJvdG87XG5cbiAgICAvLyBFbmZvcmNlIHRoZSBjb25zdHJ1Y3RvciB0byBiZSB3aGF0IHdlIGV4cGVjdFxuICAgIHByb3RvLmNvbnN0cnVjdG9yID0gbmV3Q2xhc3M7XG5cbiAgICAvLyBBbmQgbWFrZSB0aGlzIGNsYXNzIGV4dGVuZGFibGVcbiAgICBuZXdDbGFzcy5leHRlbmQgPSBCYXNlQ2xhc3MuZXh0ZW5kO1xuXG4gICAgcmV0dXJuIG5ld0NsYXNzO1xuICB9O1xuXG4gIC8vIGV4cG9ydFxuICB3aW5kb3cuQ2xhc3MgPSBCYXNlQ2xhc3M7XG59KSgpO1xuIiwiLypcbkNvcHlyaWdodCAyMDEzLTIwMTUgQVNJQUwgQ09SUE9SQVRJT05cblxuTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbnlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbllvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuXG4gICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcblxuVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG5TZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG5saW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cblxuKi9cblxuLyoqXG4gKiBAb2JqZWN0IG9uc1xuICogQGRlc2NyaXB0aW9uXG4gKiAgIFtqYV1PbnNlbiBVSeOBp+WIqeeUqOOBp+OBjeOCi+OCsOODreODvOODkOODq+OBquOCquODluOCuOOCp+OCr+ODiOOBp+OBmeOAguOBk+OBruOCquODluOCuOOCp+OCr+ODiOOBr+OAgUFuZ3VsYXJKU+OBruOCueOCs+ODvOODl+OBi+OCieWPgueFp+OBmeOCi+OBk+OBqOOBjOOBp+OBjeOBvuOBmeOAgiBbL2phXVxuICogICBbZW5dQSBnbG9iYWwgb2JqZWN0IHRoYXQncyB1c2VkIGluIE9uc2VuIFVJLiBUaGlzIG9iamVjdCBjYW4gYmUgcmVhY2hlZCBmcm9tIHRoZSBBbmd1bGFySlMgc2NvcGUuWy9lbl1cbiAqL1xuXG4oZnVuY3Rpb24ob25zKXtcbiAgJ3VzZSBzdHJpY3QnO1xuXG4gIHZhciBtb2R1bGUgPSBhbmd1bGFyLm1vZHVsZSgnb25zZW4nLCBbXSk7XG4gIGFuZ3VsYXIubW9kdWxlKCdvbnNlbi5kaXJlY3RpdmVzJywgWydvbnNlbiddKTsgLy8gZm9yIEJDXG5cbiAgLy8gSlMgR2xvYmFsIGZhY2FkZSBmb3IgT25zZW4gVUkuXG4gIGluaXRPbnNlbkZhY2FkZSgpO1xuICB3YWl0T25zZW5VSUxvYWQoKTtcbiAgaW5pdEFuZ3VsYXJNb2R1bGUoKTtcbiAgaW5pdFRlbXBsYXRlQ2FjaGUoKTtcblxuICBmdW5jdGlvbiB3YWl0T25zZW5VSUxvYWQoKSB7XG4gICAgdmFyIHVubG9ja09uc2VuVUkgPSBvbnMuX3JlYWR5TG9jay5sb2NrKCk7XG4gICAgbW9kdWxlLnJ1bihmdW5jdGlvbigkY29tcGlsZSwgJHJvb3RTY29wZSkge1xuICAgICAgLy8gZm9yIGluaXRpYWxpemF0aW9uIGhvb2suXG4gICAgICBpZiAoZG9jdW1lbnQucmVhZHlTdGF0ZSA9PT0gJ2xvYWRpbmcnIHx8IGRvY3VtZW50LnJlYWR5U3RhdGUgPT0gJ3VuaW5pdGlhbGl6ZWQnKSB7XG4gICAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdET01Db250ZW50TG9hZGVkJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdvbnMtZHVtbXktZm9yLWluaXQnKSk7XG4gICAgICAgIH0pO1xuICAgICAgfSBlbHNlIGlmIChkb2N1bWVudC5ib2R5KSB7XG4gICAgICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnb25zLWR1bW15LWZvci1pbml0JykpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdJbnZhbGlkIGluaXRpYWxpemF0aW9uIHN0YXRlLicpO1xuICAgICAgfVxuXG4gICAgICAkcm9vdFNjb3BlLiRvbignJG9ucy1yZWFkeScsIHVubG9ja09uc2VuVUkpO1xuICAgIH0pO1xuICB9XG5cbiAgZnVuY3Rpb24gaW5pdEFuZ3VsYXJNb2R1bGUoKSB7XG4gICAgbW9kdWxlLnZhbHVlKCckb25zR2xvYmFsJywgb25zKTtcbiAgICBtb2R1bGUucnVuKGZ1bmN0aW9uKCRjb21waWxlLCAkcm9vdFNjb3BlLCAkb25zZW4sICRxKSB7XG4gICAgICBvbnMuX29uc2VuU2VydmljZSA9ICRvbnNlbjtcbiAgICAgIG9ucy5fcVNlcnZpY2UgPSAkcTtcblxuICAgICAgJHJvb3RTY29wZS5vbnMgPSB3aW5kb3cub25zO1xuICAgICAgJHJvb3RTY29wZS5jb25zb2xlID0gd2luZG93LmNvbnNvbGU7XG4gICAgICAkcm9vdFNjb3BlLmFsZXJ0ID0gd2luZG93LmFsZXJ0O1xuXG4gICAgICBvbnMuJGNvbXBpbGUgPSAkY29tcGlsZTtcbiAgICB9KTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGluaXRUZW1wbGF0ZUNhY2hlKCkge1xuICAgIG1vZHVsZS5ydW4oZnVuY3Rpb24oJHRlbXBsYXRlQ2FjaGUpIHtcbiAgICAgIGNvbnN0IHRtcCA9IG9ucy5faW50ZXJuYWwuZ2V0VGVtcGxhdGVIVE1MQXN5bmM7XG5cbiAgICAgIG9ucy5faW50ZXJuYWwuZ2V0VGVtcGxhdGVIVE1MQXN5bmMgPSAocGFnZSkgPT4ge1xuICAgICAgICBjb25zdCBjYWNoZSA9ICR0ZW1wbGF0ZUNhY2hlLmdldChwYWdlKTtcblxuICAgICAgICBpZiAoY2FjaGUpIHtcbiAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKGNhY2hlKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICByZXR1cm4gdG1wKHBhZ2UpO1xuICAgICAgICB9XG4gICAgICB9O1xuICAgIH0pO1xuICB9XG5cbiAgZnVuY3Rpb24gaW5pdE9uc2VuRmFjYWRlKCkge1xuICAgIG9ucy5fb25zZW5TZXJ2aWNlID0gbnVsbDtcblxuICAgIC8vIE9iamVjdCB0byBhdHRhY2ggY29tcG9uZW50IHZhcmlhYmxlcyB0byB3aGVuIHVzaW5nIHRoZSB2YXI9XCIuLi5cIiBhdHRyaWJ1dGUuXG4gICAgLy8gQ2FuIGJlIHNldCB0byBudWxsIHRvIGF2b2lkIHBvbGx1dGluZyB0aGUgZ2xvYmFsIHNjb3BlLlxuICAgIG9ucy5jb21wb25lbnRCYXNlID0gd2luZG93O1xuXG4gICAgLyoqXG4gICAgICogQG1ldGhvZCBib290c3RyYXBcbiAgICAgKiBAc2lnbmF0dXJlIGJvb3RzdHJhcChbbW9kdWxlTmFtZSwgW2RlcGVuZGVuY2llc11dKVxuICAgICAqIEBkZXNjcmlwdGlvblxuICAgICAqICAgW2phXU9uc2VuIFVJ44Gu5Yid5pyf5YyW44KS6KGM44GE44G+44GZ44CCQW5ndWxhci5qc+OBrm5nLWFwcOWxnuaAp+OCkuWIqeeUqOOBmeOCi+OBk+OBqOeEoeOBl+OBq09uc2VuIFVJ44KS6Kqt44G/6L6844KT44Gn5Yid5pyf5YyW44GX44Gm44GP44KM44G+44GZ44CCWy9qYV1cbiAgICAgKiAgIFtlbl1Jbml0aWFsaXplIE9uc2VuIFVJLiBDYW4gYmUgdXNlZCB0byBsb2FkIE9uc2VuIFVJIHdpdGhvdXQgdXNpbmcgdGhlIDxjb2RlPm5nLWFwcDwvY29kZT4gYXR0cmlidXRlIGZyb20gQW5ndWxhckpTLlsvZW5dXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IFttb2R1bGVOYW1lXVxuICAgICAqICAgW2VuXUFuZ3VsYXJKUyBtb2R1bGUgbmFtZS5bL2VuXVxuICAgICAqICAgW2phXUFuZ3VsYXIuanPjgafjga7jg6Ljgrjjg6Xjg7zjg6vlkI1bL2phXVxuICAgICAqIEBwYXJhbSB7QXJyYXl9IFtkZXBlbmRlbmNpZXNdXG4gICAgICogICBbZW5dTGlzdCBvZiBBbmd1bGFySlMgbW9kdWxlIGRlcGVuZGVuY2llcy5bL2VuXVxuICAgICAqICAgW2phXeS+neWtmOOBmeOCi0FuZ3VsYXIuanPjga7jg6Ljgrjjg6Xjg7zjg6vlkI3jga7phY3liJdbL2phXVxuICAgICAqIEByZXR1cm4ge09iamVjdH1cbiAgICAgKiAgIFtlbl1BbiBBbmd1bGFySlMgbW9kdWxlIG9iamVjdC5bL2VuXVxuICAgICAqICAgW2phXUFuZ3VsYXJKU+OBrk1vZHVsZeOCquODluOCuOOCp+OCr+ODiOOCkuihqOOBl+OBvuOBmeOAglsvamFdXG4gICAgICovXG4gICAgb25zLmJvb3RzdHJhcCA9IGZ1bmN0aW9uKG5hbWUsIGRlcHMpIHtcbiAgICAgIGlmIChhbmd1bGFyLmlzQXJyYXkobmFtZSkpIHtcbiAgICAgICAgZGVwcyA9IG5hbWU7XG4gICAgICAgIG5hbWUgPSB1bmRlZmluZWQ7XG4gICAgICB9XG5cbiAgICAgIGlmICghbmFtZSkge1xuICAgICAgICBuYW1lID0gJ215T25zZW5BcHAnO1xuICAgICAgfVxuXG4gICAgICBkZXBzID0gWydvbnNlbiddLmNvbmNhdChhbmd1bGFyLmlzQXJyYXkoZGVwcykgPyBkZXBzIDogW10pO1xuICAgICAgdmFyIG1vZHVsZSA9IGFuZ3VsYXIubW9kdWxlKG5hbWUsIGRlcHMpO1xuXG4gICAgICB2YXIgZG9jID0gd2luZG93LmRvY3VtZW50O1xuICAgICAgaWYgKGRvYy5yZWFkeVN0YXRlID09ICdsb2FkaW5nJyB8fCBkb2MucmVhZHlTdGF0ZSA9PSAndW5pbml0aWFsaXplZCcgfHwgZG9jLnJlYWR5U3RhdGUgPT0gJ2ludGVyYWN0aXZlJykge1xuICAgICAgICBkb2MuYWRkRXZlbnRMaXN0ZW5lcignRE9NQ29udGVudExvYWRlZCcsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgIGFuZ3VsYXIuYm9vdHN0cmFwKGRvYy5kb2N1bWVudEVsZW1lbnQsIFtuYW1lXSk7XG4gICAgICAgIH0sIGZhbHNlKTtcbiAgICAgIH0gZWxzZSBpZiAoZG9jLmRvY3VtZW50RWxlbWVudCkge1xuICAgICAgICBhbmd1bGFyLmJvb3RzdHJhcChkb2MuZG9jdW1lbnRFbGVtZW50LCBbbmFtZV0pO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdJbnZhbGlkIHN0YXRlJyk7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBtb2R1bGU7XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIEBtZXRob2QgZmluZFBhcmVudENvbXBvbmVudFVudGlsXG4gICAgICogQHNpZ25hdHVyZSBmaW5kUGFyZW50Q29tcG9uZW50VW50aWwobmFtZSwgW2RvbV0pXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IG5hbWVcbiAgICAgKiAgIFtlbl1OYW1lIG9mIGNvbXBvbmVudCwgaS5lLiAnb25zLXBhZ2UnLlsvZW5dXG4gICAgICogICBbamFd44Kz44Oz44Od44O844ON44Oz44OI5ZCN44KS5oyH5a6a44GX44G+44GZ44CC5L6L44GI44Gwb25zLXBhZ2XjgarjganjgpLmjIflrprjgZfjgb7jgZnjgIJbL2phXVxuICAgICAqIEBwYXJhbSB7T2JqZWN0L2pxTGl0ZS9IVE1MRWxlbWVudH0gW2RvbV1cbiAgICAgKiAgIFtlbl0kZXZlbnQsIGpxTGl0ZSBvciBIVE1MRWxlbWVudCBvYmplY3QuWy9lbl1cbiAgICAgKiAgIFtqYV0kZXZlbnTjgqrjg5bjgrjjgqfjgq/jg4jjgIFqcUxpdGXjgqrjg5bjgrjjgqfjgq/jg4jjgIFIVE1MRWxlbWVudOOCquODluOCuOOCp+OCr+ODiOOBruOBhOOBmuOCjOOBi+OCkuaMh+WumuOBp+OBjeOBvuOBmeOAglsvamFdXG4gICAgICogQHJldHVybiB7T2JqZWN0fVxuICAgICAqICAgW2VuXUNvbXBvbmVudCBvYmplY3QuIFdpbGwgcmV0dXJuIG51bGwgaWYgbm8gY29tcG9uZW50IHdhcyBmb3VuZC5bL2VuXVxuICAgICAqICAgW2phXeOCs+ODs+ODneODvOODjeODs+ODiOOBruOCquODluOCuOOCp+OCr+ODiOOCkui/lOOBl+OBvuOBmeOAguOCguOBl+OCs+ODs+ODneODvOODjeODs+ODiOOBjOimi+OBpOOBi+OCieOBquOBi+OBo+OBn+WgtOWQiOOBq+OBr251bGzjgpLov5TjgZfjgb7jgZnjgIJbL2phXVxuICAgICAqIEBkZXNjcmlwdGlvblxuICAgICAqICAgW2VuXUZpbmQgcGFyZW50IGNvbXBvbmVudCBvYmplY3Qgb2YgPGNvZGU+ZG9tPC9jb2RlPiBlbGVtZW50LlsvZW5dXG4gICAgICogICBbamFd5oyH5a6a44GV44KM44GfZG9t5byV5pWw44Gu6Kaq6KaB57Sg44KS44Gf44Gp44Gj44Gm44Kz44Oz44Od44O844ON44Oz44OI44KS5qSc57Si44GX44G+44GZ44CCWy9qYV1cbiAgICAgKi9cbiAgICBvbnMuZmluZFBhcmVudENvbXBvbmVudFVudGlsID0gZnVuY3Rpb24obmFtZSwgZG9tKSB7XG4gICAgICB2YXIgZWxlbWVudDtcbiAgICAgIGlmIChkb20gaW5zdGFuY2VvZiBIVE1MRWxlbWVudCkge1xuICAgICAgICBlbGVtZW50ID0gYW5ndWxhci5lbGVtZW50KGRvbSk7XG4gICAgICB9IGVsc2UgaWYgKGRvbSBpbnN0YW5jZW9mIGFuZ3VsYXIuZWxlbWVudCkge1xuICAgICAgICBlbGVtZW50ID0gZG9tO1xuICAgICAgfSBlbHNlIGlmIChkb20udGFyZ2V0KSB7XG4gICAgICAgIGVsZW1lbnQgPSBhbmd1bGFyLmVsZW1lbnQoZG9tLnRhcmdldCk7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBlbGVtZW50LmluaGVyaXRlZERhdGEobmFtZSk7XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIEBtZXRob2QgZmluZENvbXBvbmVudFxuICAgICAqIEBzaWduYXR1cmUgZmluZENvbXBvbmVudChzZWxlY3RvciwgW2RvbV0pXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IHNlbGVjdG9yXG4gICAgICogICBbZW5dQ1NTIHNlbGVjdG9yWy9lbl1cbiAgICAgKiAgIFtqYV1DU1Pjgrvjg6zjgq/jgr/jg7zjgpLmjIflrprjgZfjgb7jgZnjgIJbL2phXVxuICAgICAqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IFtkb21dXG4gICAgICogICBbZW5dRE9NIGVsZW1lbnQgdG8gc2VhcmNoIGZyb20uWy9lbl1cbiAgICAgKiAgIFtqYV3mpJzntKLlr77osaHjgajjgZnjgotET03opoHntKDjgpLmjIflrprjgZfjgb7jgZnjgIJbL2phXVxuICAgICAqIEByZXR1cm4ge09iamVjdC9udWxsfVxuICAgICAqICAgW2VuXUNvbXBvbmVudCBvYmplY3QuIFdpbGwgcmV0dXJuIG51bGwgaWYgbm8gY29tcG9uZW50IHdhcyBmb3VuZC5bL2VuXVxuICAgICAqICAgW2phXeOCs+ODs+ODneODvOODjeODs+ODiOOBruOCquODluOCuOOCp+OCr+ODiOOCkui/lOOBl+OBvuOBmeOAguOCguOBl+OCs+ODs+ODneODvOODjeODs+ODiOOBjOimi+OBpOOBi+OCieOBquOBi+OBo+OBn+WgtOWQiOOBq+OBr251bGzjgpLov5TjgZfjgb7jgZnjgIJbL2phXVxuICAgICAqIEBkZXNjcmlwdGlvblxuICAgICAqICAgW2VuXUZpbmQgY29tcG9uZW50IG9iamVjdCB1c2luZyBDU1Mgc2VsZWN0b3IuWy9lbl1cbiAgICAgKiAgIFtqYV1DU1Pjgrvjg6zjgq/jgr/jgpLkvb/jgaPjgabjgrPjg7Pjg53jg7zjg43jg7Pjg4jjga7jgqrjg5bjgrjjgqfjgq/jg4jjgpLmpJzntKLjgZfjgb7jgZnjgIJbL2phXVxuICAgICAqL1xuICAgIG9ucy5maW5kQ29tcG9uZW50ID0gZnVuY3Rpb24oc2VsZWN0b3IsIGRvbSkge1xuICAgICAgdmFyIHRhcmdldCA9IChkb20gPyBkb20gOiBkb2N1bWVudCkucXVlcnlTZWxlY3RvcihzZWxlY3Rvcik7XG4gICAgICByZXR1cm4gdGFyZ2V0ID8gYW5ndWxhci5lbGVtZW50KHRhcmdldCkuZGF0YSh0YXJnZXQubm9kZU5hbWUudG9Mb3dlckNhc2UoKSkgfHwgbnVsbCA6IG51bGw7XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIEBtZXRob2QgY29tcGlsZVxuICAgICAqIEBzaWduYXR1cmUgY29tcGlsZShkb20pXG4gICAgICogQHBhcmFtIHtIVE1MRWxlbWVudH0gZG9tXG4gICAgICogICBbZW5dRWxlbWVudCB0byBjb21waWxlLlsvZW5dXG4gICAgICogICBbamFd44Kz44Oz44OR44Kk44Or44GZ44KL6KaB57Sg44KS5oyH5a6a44GX44G+44GZ44CCWy9qYV1cbiAgICAgKiBAZGVzY3JpcHRpb25cbiAgICAgKiAgIFtlbl1Db21waWxlIE9uc2VuIFVJIGNvbXBvbmVudHMuWy9lbl1cbiAgICAgKiAgIFtqYV3pgJrluLjjga5IVE1M44Gu6KaB57Sg44KST25zZW4gVUnjga7jgrPjg7Pjg53jg7zjg43jg7Pjg4jjgavjgrPjg7Pjg5HjgqTjg6vjgZfjgb7jgZnjgIJbL2phXVxuICAgICAqL1xuICAgIG9ucy5jb21waWxlID0gZnVuY3Rpb24oZG9tKSB7XG4gICAgICBpZiAoIW9ucy4kY29tcGlsZSkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ29ucy4kY29tcGlsZSgpIGlzIG5vdCByZWFkeS4gV2FpdCBmb3IgaW5pdGlhbGl6YXRpb24gd2l0aCBvbnMucmVhZHkoKS4nKTtcbiAgICAgIH1cblxuICAgICAgaWYgKCEoZG9tIGluc3RhbmNlb2YgSFRNTEVsZW1lbnQpKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcignRmlyc3QgYXJndW1lbnQgbXVzdCBiZSBhbiBpbnN0YW5jZSBvZiBIVE1MRWxlbWVudC4nKTtcbiAgICAgIH1cblxuICAgICAgdmFyIHNjb3BlID0gYW5ndWxhci5lbGVtZW50KGRvbSkuc2NvcGUoKTtcbiAgICAgIGlmICghc2NvcGUpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdBbmd1bGFySlMgU2NvcGUgaXMgbnVsbC4gQXJndW1lbnQgRE9NIGVsZW1lbnQgbXVzdCBiZSBhdHRhY2hlZCBpbiBET00gZG9jdW1lbnQuJyk7XG4gICAgICB9XG5cbiAgICAgIG9ucy4kY29tcGlsZShkb20pKHNjb3BlKTtcbiAgICB9O1xuXG4gICAgb25zLl9nZXRPbnNlblNlcnZpY2UgPSBmdW5jdGlvbigpIHtcbiAgICAgIGlmICghdGhpcy5fb25zZW5TZXJ2aWNlKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcignJG9uc2VuIGlzIG5vdCBsb2FkZWQsIHdhaXQgZm9yIG9ucy5yZWFkeSgpLicpO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gdGhpcy5fb25zZW5TZXJ2aWNlO1xuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gZWxlbWVudE5hbWVcbiAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBsYXN0UmVhZHlcbiAgICAgKiBAcmV0dXJuIHtGdW5jdGlvbn1cbiAgICAgKi9cbiAgICBvbnMuX3dhaXREaXJldGl2ZUluaXQgPSBmdW5jdGlvbihlbGVtZW50TmFtZSwgbGFzdFJlYWR5KSB7XG4gICAgICByZXR1cm4gZnVuY3Rpb24oZWxlbWVudCwgY2FsbGJhY2spIHtcbiAgICAgICAgaWYgKGFuZ3VsYXIuZWxlbWVudChlbGVtZW50KS5kYXRhKGVsZW1lbnROYW1lKSkge1xuICAgICAgICAgIGxhc3RSZWFkeShlbGVtZW50LCBjYWxsYmFjayk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdmFyIGxpc3RlbiA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgbGFzdFJlYWR5KGVsZW1lbnQsIGNhbGxiYWNrKTtcbiAgICAgICAgICAgIGVsZW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcihlbGVtZW50TmFtZSArICc6aW5pdCcsIGxpc3RlbiwgZmFsc2UpO1xuICAgICAgICAgIH07XG4gICAgICAgICAgZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKGVsZW1lbnROYW1lICsgJzppbml0JywgbGlzdGVuLCBmYWxzZSk7XG4gICAgICAgIH1cbiAgICAgIH07XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIEBtZXRob2QgY3JlYXRlRWxlbWVudFxuICAgICAqIEBzaWduYXR1cmUgY3JlYXRlRWxlbWVudCh0ZW1wbGF0ZSwgW29wdGlvbnNdKVxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSB0ZW1wbGF0ZVxuICAgICAqICAgW2VuXUVpdGhlciBhbiBIVE1MIGZpbGUgcGF0aCwgYW4gYDxvbnMtdGVtcGxhdGU+YCBpZCBvciBhbiBIVE1MIHN0cmluZyBzdWNoIGFzIGAnPGRpdiBpZD1cImZvb1wiPmhvZ2U8L2Rpdj4nYC5bL2VuXVxuICAgICAqICAgW2phXVsvamFdXG4gICAgICogQHBhcmFtIHtPYmplY3R9IFtvcHRpb25zXVxuICAgICAqICAgW2VuXVBhcmFtZXRlciBvYmplY3QuWy9lbl1cbiAgICAgKiAgIFtqYV3jgqrjg5fjgrfjg6fjg7PjgpLmjIflrprjgZnjgovjgqrjg5bjgrjjgqfjgq/jg4jjgIJbL2phXVxuICAgICAqIEBwYXJhbSB7Qm9vbGVhbnxIVE1MRWxlbWVudH0gW29wdGlvbnMuYXBwZW5kXVxuICAgICAqICAgW2VuXVdoZXRoZXIgb3Igbm90IHRoZSBlbGVtZW50IHNob3VsZCBiZSBhdXRvbWF0aWNhbGx5IGFwcGVuZGVkIHRvIHRoZSBET00uICBEZWZhdWx0cyB0byBgZmFsc2VgLiBJZiBgdHJ1ZWAgdmFsdWUgaXMgZ2l2ZW4sIGBkb2N1bWVudC5ib2R5YCB3aWxsIGJlIHVzZWQgYXMgdGhlIHRhcmdldC5bL2VuXVxuICAgICAqICAgW2phXVsvamFdXG4gICAgICogQHBhcmFtIHtIVE1MRWxlbWVudH0gW29wdGlvbnMuaW5zZXJ0QmVmb3JlXVxuICAgICAqICAgW2VuXVJlZmVyZW5jZSBub2RlIHRoYXQgYmVjb21lcyB0aGUgbmV4dCBzaWJsaW5nIG9mIHRoZSBuZXcgbm9kZSAoYG9wdGlvbnMuYXBwZW5kYCBlbGVtZW50KS5bL2VuXVxuICAgICAqICAgW2phXVsvamFdXG4gICAgICogQHBhcmFtIHtPYmplY3R9IFtvcHRpb25zLnBhcmVudFNjb3BlXVxuICAgICAqICAgW2VuXVBhcmVudCBzY29wZSBvZiB0aGUgZWxlbWVudC4gVXNlZCB0byBiaW5kIG1vZGVscyBhbmQgYWNjZXNzIHNjb3BlIG1ldGhvZHMgZnJvbSB0aGUgZWxlbWVudC4gUmVxdWlyZXMgYXBwZW5kIG9wdGlvbi5bL2VuXVxuICAgICAqICAgW2phXVsvamFdXG4gICAgICogQHJldHVybiB7SFRNTEVsZW1lbnR8UHJvbWlzZX1cbiAgICAgKiAgIFtlbl1JZiB0aGUgcHJvdmlkZWQgdGVtcGxhdGUgd2FzIGFuIGlubGluZSBIVE1MIHN0cmluZywgaXQgcmV0dXJucyB0aGUgbmV3IGVsZW1lbnQuIE90aGVyd2lzZSwgaXQgcmV0dXJucyBhIHByb21pc2UgdGhhdCByZXNvbHZlcyB0byB0aGUgbmV3IGVsZW1lbnQuWy9lbl1cbiAgICAgKiAgIFtqYV1bL2phXVxuICAgICAqIEBkZXNjcmlwdGlvblxuICAgICAqICAgW2VuXUNyZWF0ZSBhIG5ldyBlbGVtZW50IGZyb20gYSB0ZW1wbGF0ZS4gQm90aCBpbmxpbmUgSFRNTCBhbmQgZXh0ZXJuYWwgZmlsZXMgYXJlIHN1cHBvcnRlZCBhbHRob3VnaCB0aGUgcmV0dXJuIHZhbHVlIGRpZmZlcnMuIElmIHRoZSBlbGVtZW50IGlzIGFwcGVuZGVkIGl0IHdpbGwgYWxzbyBiZSBjb21waWxlZCBieSBBbmd1bGFySlMgKG90aGVyd2lzZSwgYG9ucy5jb21waWxlYCBzaG91bGQgYmUgbWFudWFsbHkgdXNlZCkuWy9lbl1cbiAgICAgKiAgIFtqYV1bL2phXVxuICAgICAqL1xuICAgIGNvbnN0IGNyZWF0ZUVsZW1lbnRPcmlnaW5hbCA9IG9ucy5jcmVhdGVFbGVtZW50O1xuICAgIG9ucy5jcmVhdGVFbGVtZW50ID0gKHRlbXBsYXRlLCBvcHRpb25zID0ge30pID0+IHtcbiAgICAgIGNvbnN0IGxpbmsgPSBlbGVtZW50ID0+IHtcbiAgICAgICAgaWYgKG9wdGlvbnMucGFyZW50U2NvcGUpIHtcbiAgICAgICAgICBvbnMuJGNvbXBpbGUoYW5ndWxhci5lbGVtZW50KGVsZW1lbnQpKShvcHRpb25zLnBhcmVudFNjb3BlLiRuZXcoKSk7XG4gICAgICAgICAgb3B0aW9ucy5wYXJlbnRTY29wZS4kZXZhbEFzeW5jKCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgb25zLmNvbXBpbGUoZWxlbWVudCk7XG4gICAgICAgIH1cbiAgICAgIH07XG5cbiAgICAgIGNvbnN0IGdldFNjb3BlID0gZSA9PiBhbmd1bGFyLmVsZW1lbnQoZSkuZGF0YShlLnRhZ05hbWUudG9Mb3dlckNhc2UoKSkgfHwgZTtcbiAgICAgIGNvbnN0IHJlc3VsdCA9IGNyZWF0ZUVsZW1lbnRPcmlnaW5hbCh0ZW1wbGF0ZSwgeyBhcHBlbmQ6ICEhb3B0aW9ucy5wYXJlbnRTY29wZSwgbGluaywgLi4ub3B0aW9ucyB9KTtcblxuICAgICAgcmV0dXJuIHJlc3VsdCBpbnN0YW5jZW9mIFByb21pc2UgPyByZXN1bHQudGhlbihnZXRTY29wZSkgOiBnZXRTY29wZShyZXN1bHQpO1xuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBAbWV0aG9kIGNyZWF0ZUFsZXJ0RGlhbG9nXG4gICAgICogQHNpZ25hdHVyZSBjcmVhdGVBbGVydERpYWxvZyhwYWdlLCBbb3B0aW9uc10pXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IHBhZ2VcbiAgICAgKiAgIFtlbl1QYWdlIG5hbWUuIENhbiBiZSBlaXRoZXIgYW4gSFRNTCBmaWxlIG9yIGFuIDxvbnMtdGVtcGxhdGU+IGNvbnRhaW5pbmcgYSA8b25zLWFsZXJ0LWRpYWxvZz4gY29tcG9uZW50LlsvZW5dXG4gICAgICogICBbamFdcGFnZeOBrlVSTOOBi+OAgeOCguOBl+OBj+OBr29ucy10ZW1wbGF0ZeOBp+Wuo+iogOOBl+OBn+ODhuODs+ODl+ODrOODvOODiOOBrmlk5bGe5oCn44Gu5YCk44KS5oyH5a6a44Gn44GN44G+44GZ44CCWy9qYV1cbiAgICAgKiBAcGFyYW0ge09iamVjdH0gW29wdGlvbnNdXG4gICAgICogICBbZW5dUGFyYW1ldGVyIG9iamVjdC5bL2VuXVxuICAgICAqICAgW2phXeOCquODl+OCt+ODp+ODs+OCkuaMh+WumuOBmeOCi+OCquODluOCuOOCp+OCr+ODiOOAglsvamFdXG4gICAgICogQHBhcmFtIHtPYmplY3R9IFtvcHRpb25zLnBhcmVudFNjb3BlXVxuICAgICAqICAgW2VuXVBhcmVudCBzY29wZSBvZiB0aGUgZGlhbG9nLiBVc2VkIHRvIGJpbmQgbW9kZWxzIGFuZCBhY2Nlc3Mgc2NvcGUgbWV0aG9kcyBmcm9tIHRoZSBkaWFsb2cuWy9lbl1cbiAgICAgKiAgIFtqYV3jg4DjgqTjgqLjg63jgrDlhoXjgafliKnnlKjjgZnjgovopqrjgrnjgrPjg7zjg5fjgpLmjIflrprjgZfjgb7jgZnjgILjg4DjgqTjgqLjg63jgrDjgYvjgonjg6Ljg4fjg6vjgoTjgrnjgrPjg7zjg5fjga7jg6Hjgr3jg4Pjg4njgavjgqLjgq/jgrvjgrnjgZnjgovjga7jgavkvb/jgYTjgb7jgZnjgILjgZPjga7jg5Hjg6njg6Hjg7zjgr/jga9Bbmd1bGFySlPjg5DjgqTjg7Pjg4fjgqPjg7PjgrDjgafjga7jgb/liKnnlKjjgafjgY3jgb7jgZnjgIJbL2phXVxuICAgICAqIEByZXR1cm4ge1Byb21pc2V9XG4gICAgICogICBbZW5dUHJvbWlzZSBvYmplY3QgdGhhdCByZXNvbHZlcyB0byB0aGUgYWxlcnQgZGlhbG9nIGNvbXBvbmVudCBvYmplY3QuWy9lbl1cbiAgICAgKiAgIFtqYV3jg4DjgqTjgqLjg63jgrDjga7jgrPjg7Pjg53jg7zjg43jg7Pjg4jjgqrjg5bjgrjjgqfjgq/jg4jjgpLop6PmsbrjgZnjgotQcm9taXNl44Kq44OW44K444Kn44Kv44OI44KS6L+U44GX44G+44GZ44CCWy9qYV1cbiAgICAgKiBAZGVzY3JpcHRpb25cbiAgICAgKiAgIFtlbl1DcmVhdGUgYSBhbGVydCBkaWFsb2cgaW5zdGFuY2UgZnJvbSBhIHRlbXBsYXRlLiBUaGlzIG1ldGhvZCB3aWxsIGJlIGRlcHJlY2F0ZWQgaW4gZmF2b3Igb2YgYG9ucy5jcmVhdGVFbGVtZW50YC5bL2VuXVxuICAgICAqICAgW2phXeODhuODs+ODl+ODrOODvOODiOOBi+OCieOCouODqeODvOODiOODgOOCpOOCouODreOCsOOBruOCpOODs+OCueOCv+ODs+OCueOCkueUn+aIkOOBl+OBvuOBmeOAglsvamFdXG4gICAgICovXG5cbiAgICAvKipcbiAgICAgKiBAbWV0aG9kIGNyZWF0ZURpYWxvZ1xuICAgICAqIEBzaWduYXR1cmUgY3JlYXRlRGlhbG9nKHBhZ2UsIFtvcHRpb25zXSlcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gcGFnZVxuICAgICAqICAgW2VuXVBhZ2UgbmFtZS4gQ2FuIGJlIGVpdGhlciBhbiBIVE1MIGZpbGUgb3IgYW4gPG9ucy10ZW1wbGF0ZT4gY29udGFpbmluZyBhIDxvbnMtZGlhbG9nPiBjb21wb25lbnQuWy9lbl1cbiAgICAgKiAgIFtqYV1wYWdl44GuVVJM44GL44CB44KC44GX44GP44Gvb25zLXRlbXBsYXRl44Gn5a6j6KiA44GX44Gf44OG44Oz44OX44Os44O844OI44GuaWTlsZ7mgKfjga7lgKTjgpLmjIflrprjgafjgY3jgb7jgZnjgIJbL2phXVxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBbb3B0aW9uc11cbiAgICAgKiAgIFtlbl1QYXJhbWV0ZXIgb2JqZWN0LlsvZW5dXG4gICAgICogICBbamFd44Kq44OX44K344On44Oz44KS5oyH5a6a44GZ44KL44Kq44OW44K444Kn44Kv44OI44CCWy9qYV1cbiAgICAgKiBAcGFyYW0ge09iamVjdH0gW29wdGlvbnMucGFyZW50U2NvcGVdXG4gICAgICogICBbZW5dUGFyZW50IHNjb3BlIG9mIHRoZSBkaWFsb2cuIFVzZWQgdG8gYmluZCBtb2RlbHMgYW5kIGFjY2VzcyBzY29wZSBtZXRob2RzIGZyb20gdGhlIGRpYWxvZy5bL2VuXVxuICAgICAqICAgW2phXeODgOOCpOOCouODreOCsOWGheOBp+WIqeeUqOOBmeOCi+imquOCueOCs+ODvOODl+OCkuaMh+WumuOBl+OBvuOBmeOAguODgOOCpOOCouODreOCsOOBi+OCieODouODh+ODq+OChOOCueOCs+ODvOODl+OBruODoeOCveODg+ODieOBq+OCouOCr+OCu+OCueOBmeOCi+OBruOBq+S9v+OBhOOBvuOBmeOAguOBk+OBruODkeODqeODoeODvOOCv+OBr0FuZ3VsYXJKU+ODkOOCpOODs+ODh+OCo+ODs+OCsOOBp+OBruOBv+WIqeeUqOOBp+OBjeOBvuOBmeOAglsvamFdXG4gICAgICogQHJldHVybiB7UHJvbWlzZX1cbiAgICAgKiAgIFtlbl1Qcm9taXNlIG9iamVjdCB0aGF0IHJlc29sdmVzIHRvIHRoZSBkaWFsb2cgY29tcG9uZW50IG9iamVjdC5bL2VuXVxuICAgICAqICAgW2phXeODgOOCpOOCouODreOCsOOBruOCs+ODs+ODneODvOODjeODs+ODiOOCquODluOCuOOCp+OCr+ODiOOCkuino+axuuOBmeOCi1Byb21pc2Xjgqrjg5bjgrjjgqfjgq/jg4jjgpLov5TjgZfjgb7jgZnjgIJbL2phXVxuICAgICAqIEBkZXNjcmlwdGlvblxuICAgICAqICAgW2VuXUNyZWF0ZSBhIGRpYWxvZyBpbnN0YW5jZSBmcm9tIGEgdGVtcGxhdGUuIFRoaXMgbWV0aG9kIHdpbGwgYmUgZGVwcmVjYXRlZCBpbiBmYXZvciBvZiBgb25zLmNyZWF0ZUVsZW1lbnRgLlsvZW5dXG4gICAgICogICBbamFd44OG44Oz44OX44Os44O844OI44GL44KJ44OA44Kk44Ki44Ot44Kw44Gu44Kk44Oz44K544K/44Oz44K544KS55Sf5oiQ44GX44G+44GZ44CCWy9qYV1cbiAgICAgKi9cblxuICAgIC8qKlxuICAgICAqIEBtZXRob2QgY3JlYXRlUG9wb3ZlclxuICAgICAqIEBzaWduYXR1cmUgY3JlYXRlUG9wb3ZlcihwYWdlLCBbb3B0aW9uc10pXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IHBhZ2VcbiAgICAgKiAgIFtlbl1QYWdlIG5hbWUuIENhbiBiZSBlaXRoZXIgYW4gSFRNTCBmaWxlIG9yIGFuIDxvbnMtdGVtcGxhdGU+IGNvbnRhaW5pbmcgYSA8b25zLWRpYWxvZz4gY29tcG9uZW50LlsvZW5dXG4gICAgICogICBbamFdcGFnZeOBrlVSTOOBi+OAgeOCguOBl+OBj+OBr29ucy10ZW1wbGF0ZeOBp+Wuo+iogOOBl+OBn+ODhuODs+ODl+ODrOODvOODiOOBrmlk5bGe5oCn44Gu5YCk44KS5oyH5a6a44Gn44GN44G+44GZ44CCWy9qYV1cbiAgICAgKiBAcGFyYW0ge09iamVjdH0gW29wdGlvbnNdXG4gICAgICogICBbZW5dUGFyYW1ldGVyIG9iamVjdC5bL2VuXVxuICAgICAqICAgW2phXeOCquODl+OCt+ODp+ODs+OCkuaMh+WumuOBmeOCi+OCquODluOCuOOCp+OCr+ODiOOAglsvamFdXG4gICAgICogQHBhcmFtIHtPYmplY3R9IFtvcHRpb25zLnBhcmVudFNjb3BlXVxuICAgICAqICAgW2VuXVBhcmVudCBzY29wZSBvZiB0aGUgZGlhbG9nLiBVc2VkIHRvIGJpbmQgbW9kZWxzIGFuZCBhY2Nlc3Mgc2NvcGUgbWV0aG9kcyBmcm9tIHRoZSBkaWFsb2cuWy9lbl1cbiAgICAgKiAgIFtqYV3jg4DjgqTjgqLjg63jgrDlhoXjgafliKnnlKjjgZnjgovopqrjgrnjgrPjg7zjg5fjgpLmjIflrprjgZfjgb7jgZnjgILjg4DjgqTjgqLjg63jgrDjgYvjgonjg6Ljg4fjg6vjgoTjgrnjgrPjg7zjg5fjga7jg6Hjgr3jg4Pjg4njgavjgqLjgq/jgrvjgrnjgZnjgovjga7jgavkvb/jgYTjgb7jgZnjgILjgZPjga7jg5Hjg6njg6Hjg7zjgr/jga9Bbmd1bGFySlPjg5DjgqTjg7Pjg4fjgqPjg7PjgrDjgafjga7jgb/liKnnlKjjgafjgY3jgb7jgZnjgIJbL2phXVxuICAgICAqIEByZXR1cm4ge1Byb21pc2V9XG4gICAgICogICBbZW5dUHJvbWlzZSBvYmplY3QgdGhhdCByZXNvbHZlcyB0byB0aGUgcG9wb3ZlciBjb21wb25lbnQgb2JqZWN0LlsvZW5dXG4gICAgICogICBbamFd44Od44OD44OX44Kq44O844OQ44O844Gu44Kz44Oz44Od44O844ON44Oz44OI44Kq44OW44K444Kn44Kv44OI44KS6Kej5rG644GZ44KLUHJvbWlzZeOCquODluOCuOOCp+OCr+ODiOOCkui/lOOBl+OBvuOBmeOAglsvamFdXG4gICAgICogQGRlc2NyaXB0aW9uXG4gICAgICogICBbZW5dQ3JlYXRlIGEgcG9wb3ZlciBpbnN0YW5jZSBmcm9tIGEgdGVtcGxhdGUuIFRoaXMgbWV0aG9kIHdpbGwgYmUgZGVwcmVjYXRlZCBpbiBmYXZvciBvZiBgb25zLmNyZWF0ZUVsZW1lbnRgLlsvZW5dXG4gICAgICogICBbamFd44OG44Oz44OX44Os44O844OI44GL44KJ44Od44OD44OX44Kq44O844OQ44O844Gu44Kk44Oz44K544K/44Oz44K544KS55Sf5oiQ44GX44G+44GZ44CCWy9qYV1cbiAgICAgKi9cblxuICAgIC8qKlxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBwYWdlXG4gICAgICovXG4gICAgY29uc3QgcmVzb2x2ZUxvYWRpbmdQbGFjZUhvbGRlck9yaWdpbmFsID0gb25zLnJlc29sdmVMb2FkaW5nUGxhY2VIb2xkZXI7XG4gICAgb25zLnJlc29sdmVMb2FkaW5nUGxhY2Vob2xkZXIgPSBwYWdlID0+IHtcbiAgICAgIHJldHVybiByZXNvbHZlTG9hZGluZ1BsYWNlaG9sZGVyT3JpZ2luYWwocGFnZSwgKGVsZW1lbnQsIGRvbmUpID0+IHtcbiAgICAgICAgb25zLmNvbXBpbGUoZWxlbWVudCk7XG4gICAgICAgIGFuZ3VsYXIuZWxlbWVudChlbGVtZW50KS5zY29wZSgpLiRldmFsQXN5bmMoKCkgPT4gc2V0SW1tZWRpYXRlKGRvbmUpKTtcbiAgICAgIH0pO1xuICAgIH07XG5cbiAgICBvbnMuX3NldHVwTG9hZGluZ1BsYWNlSG9sZGVycyA9IGZ1bmN0aW9uKCkge1xuICAgICAgLy8gRG8gbm90aGluZ1xuICAgIH07XG4gIH1cblxufSkod2luZG93Lm9ucyA9IHdpbmRvdy5vbnMgfHwge30pO1xuIiwiLypcbkNvcHlyaWdodCAyMDEzLTIwMTUgQVNJQUwgQ09SUE9SQVRJT05cblxuTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbnlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbllvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuXG4gICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcblxuVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG5TZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG5saW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cblxuKi9cblxuKGZ1bmN0aW9uKCkge1xuICAndXNlIHN0cmljdCc7XG5cbiAgdmFyIG1vZHVsZSA9IGFuZ3VsYXIubW9kdWxlKCdvbnNlbicpO1xuXG4gIG1vZHVsZS5mYWN0b3J5KCdBY3Rpb25TaGVldFZpZXcnLCBmdW5jdGlvbigkb25zZW4pIHtcblxuICAgIHZhciBBY3Rpb25TaGVldFZpZXcgPSBDbGFzcy5leHRlbmQoe1xuXG4gICAgICAvKipcbiAgICAgICAqIEBwYXJhbSB7T2JqZWN0fSBzY29wZVxuICAgICAgICogQHBhcmFtIHtqcUxpdGV9IGVsZW1lbnRcbiAgICAgICAqIEBwYXJhbSB7T2JqZWN0fSBhdHRyc1xuICAgICAgICovXG4gICAgICBpbml0OiBmdW5jdGlvbihzY29wZSwgZWxlbWVudCwgYXR0cnMpIHtcbiAgICAgICAgdGhpcy5fc2NvcGUgPSBzY29wZTtcbiAgICAgICAgdGhpcy5fZWxlbWVudCA9IGVsZW1lbnQ7XG4gICAgICAgIHRoaXMuX2F0dHJzID0gYXR0cnM7XG5cbiAgICAgICAgdGhpcy5fY2xlYXJEZXJpdmluZ01ldGhvZHMgPSAkb25zZW4uZGVyaXZlTWV0aG9kcyh0aGlzLCB0aGlzLl9lbGVtZW50WzBdLCBbXG4gICAgICAgICAgJ3Nob3cnLCAnaGlkZScsICd0b2dnbGUnXG4gICAgICAgIF0pO1xuXG4gICAgICAgIHRoaXMuX2NsZWFyRGVyaXZpbmdFdmVudHMgPSAkb25zZW4uZGVyaXZlRXZlbnRzKHRoaXMsIHRoaXMuX2VsZW1lbnRbMF0sIFtcbiAgICAgICAgICAncHJlc2hvdycsICdwb3N0c2hvdycsICdwcmVoaWRlJywgJ3Bvc3RoaWRlJywgJ2NhbmNlbCdcbiAgICAgICAgXSwgZnVuY3Rpb24oZGV0YWlsKSB7XG4gICAgICAgICAgaWYgKGRldGFpbC5hY3Rpb25TaGVldCkge1xuICAgICAgICAgICAgZGV0YWlsLmFjdGlvblNoZWV0ID0gdGhpcztcbiAgICAgICAgICB9XG4gICAgICAgICAgcmV0dXJuIGRldGFpbDtcbiAgICAgICAgfS5iaW5kKHRoaXMpKTtcblxuICAgICAgICB0aGlzLl9zY29wZS4kb24oJyRkZXN0cm95JywgdGhpcy5fZGVzdHJveS5iaW5kKHRoaXMpKTtcbiAgICAgIH0sXG5cbiAgICAgIF9kZXN0cm95OiBmdW5jdGlvbigpIHtcbiAgICAgICAgdGhpcy5lbWl0KCdkZXN0cm95Jyk7XG5cbiAgICAgICAgdGhpcy5fZWxlbWVudC5yZW1vdmUoKTtcbiAgICAgICAgdGhpcy5fY2xlYXJEZXJpdmluZ01ldGhvZHMoKTtcbiAgICAgICAgdGhpcy5fY2xlYXJEZXJpdmluZ0V2ZW50cygpO1xuXG4gICAgICAgIHRoaXMuX3Njb3BlID0gdGhpcy5fYXR0cnMgPSB0aGlzLl9lbGVtZW50ID0gbnVsbDtcbiAgICAgIH1cblxuICAgIH0pO1xuXG4gICAgTWljcm9FdmVudC5taXhpbihBY3Rpb25TaGVldFZpZXcpO1xuICAgICRvbnNlbi5kZXJpdmVQcm9wZXJ0aWVzRnJvbUVsZW1lbnQoQWN0aW9uU2hlZXRWaWV3LCBbJ2Rpc2FibGVkJywgJ2NhbmNlbGFibGUnLCAndmlzaWJsZScsICdvbkRldmljZUJhY2tCdXR0b24nXSk7XG5cbiAgICByZXR1cm4gQWN0aW9uU2hlZXRWaWV3O1xuICB9KTtcbn0pKCk7XG4iLCIvKlxuQ29weXJpZ2h0IDIwMTMtMjAxNSBBU0lBTCBDT1JQT1JBVElPTlxuXG5MaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xueW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG5cbiAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuXG5Vbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG5kaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG5XSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cblNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbmxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuXG4qL1xuXG4oZnVuY3Rpb24oKSB7XG4gICd1c2Ugc3RyaWN0JztcblxuICB2YXIgbW9kdWxlID0gYW5ndWxhci5tb2R1bGUoJ29uc2VuJyk7XG5cbiAgbW9kdWxlLmZhY3RvcnkoJ0FsZXJ0RGlhbG9nVmlldycsIGZ1bmN0aW9uKCRvbnNlbikge1xuXG4gICAgdmFyIEFsZXJ0RGlhbG9nVmlldyA9IENsYXNzLmV4dGVuZCh7XG5cbiAgICAgIC8qKlxuICAgICAgICogQHBhcmFtIHtPYmplY3R9IHNjb3BlXG4gICAgICAgKiBAcGFyYW0ge2pxTGl0ZX0gZWxlbWVudFxuICAgICAgICogQHBhcmFtIHtPYmplY3R9IGF0dHJzXG4gICAgICAgKi9cbiAgICAgIGluaXQ6IGZ1bmN0aW9uKHNjb3BlLCBlbGVtZW50LCBhdHRycykge1xuICAgICAgICB0aGlzLl9zY29wZSA9IHNjb3BlO1xuICAgICAgICB0aGlzLl9lbGVtZW50ID0gZWxlbWVudDtcbiAgICAgICAgdGhpcy5fYXR0cnMgPSBhdHRycztcblxuICAgICAgICB0aGlzLl9jbGVhckRlcml2aW5nTWV0aG9kcyA9ICRvbnNlbi5kZXJpdmVNZXRob2RzKHRoaXMsIHRoaXMuX2VsZW1lbnRbMF0sIFtcbiAgICAgICAgICAnc2hvdycsICdoaWRlJ1xuICAgICAgICBdKTtcblxuICAgICAgICB0aGlzLl9jbGVhckRlcml2aW5nRXZlbnRzID0gJG9uc2VuLmRlcml2ZUV2ZW50cyh0aGlzLCB0aGlzLl9lbGVtZW50WzBdLCBbXG4gICAgICAgICAgJ3ByZXNob3cnLFxuICAgICAgICAgICdwb3N0c2hvdycsXG4gICAgICAgICAgJ3ByZWhpZGUnLFxuICAgICAgICAgICdwb3N0aGlkZScsXG4gICAgICAgICAgJ2NhbmNlbCdcbiAgICAgICAgXSwgZnVuY3Rpb24oZGV0YWlsKSB7XG4gICAgICAgICAgaWYgKGRldGFpbC5hbGVydERpYWxvZykge1xuICAgICAgICAgICAgZGV0YWlsLmFsZXJ0RGlhbG9nID0gdGhpcztcbiAgICAgICAgICB9XG4gICAgICAgICAgcmV0dXJuIGRldGFpbDtcbiAgICAgICAgfS5iaW5kKHRoaXMpKTtcblxuICAgICAgICB0aGlzLl9zY29wZS4kb24oJyRkZXN0cm95JywgdGhpcy5fZGVzdHJveS5iaW5kKHRoaXMpKTtcbiAgICAgIH0sXG5cbiAgICAgIF9kZXN0cm95OiBmdW5jdGlvbigpIHtcbiAgICAgICAgdGhpcy5lbWl0KCdkZXN0cm95Jyk7XG5cbiAgICAgICAgdGhpcy5fZWxlbWVudC5yZW1vdmUoKTtcblxuICAgICAgICB0aGlzLl9jbGVhckRlcml2aW5nTWV0aG9kcygpO1xuICAgICAgICB0aGlzLl9jbGVhckRlcml2aW5nRXZlbnRzKCk7XG5cbiAgICAgICAgdGhpcy5fc2NvcGUgPSB0aGlzLl9hdHRycyA9IHRoaXMuX2VsZW1lbnQgPSBudWxsO1xuICAgICAgfVxuXG4gICAgfSk7XG5cbiAgICBNaWNyb0V2ZW50Lm1peGluKEFsZXJ0RGlhbG9nVmlldyk7XG4gICAgJG9uc2VuLmRlcml2ZVByb3BlcnRpZXNGcm9tRWxlbWVudChBbGVydERpYWxvZ1ZpZXcsIFsnZGlzYWJsZWQnLCAnY2FuY2VsYWJsZScsICd2aXNpYmxlJywgJ29uRGV2aWNlQmFja0J1dHRvbiddKTtcblxuICAgIHJldHVybiBBbGVydERpYWxvZ1ZpZXc7XG4gIH0pO1xufSkoKTtcbiIsIi8qXG5Db3B5cmlnaHQgMjAxMy0yMDE1IEFTSUFMIENPUlBPUkFUSU9OXG5cbkxpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG55b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG5Zb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcblxuICAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG5cblVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbmRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbldJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxubGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG5cbiovXG5cbihmdW5jdGlvbigpIHtcbiAgJ3VzZSBzdHJpY3QnO1xuXG4gIHZhciBtb2R1bGUgPSBhbmd1bGFyLm1vZHVsZSgnb25zZW4nKTtcblxuICBtb2R1bGUuZmFjdG9yeSgnQ2Fyb3VzZWxWaWV3JywgZnVuY3Rpb24oJG9uc2VuKSB7XG5cbiAgICAvKipcbiAgICAgKiBAY2xhc3MgQ2Fyb3VzZWxWaWV3XG4gICAgICovXG4gICAgdmFyIENhcm91c2VsVmlldyA9IENsYXNzLmV4dGVuZCh7XG5cbiAgICAgIC8qKlxuICAgICAgICogQHBhcmFtIHtPYmplY3R9IHNjb3BlXG4gICAgICAgKiBAcGFyYW0ge2pxTGl0ZX0gZWxlbWVudFxuICAgICAgICogQHBhcmFtIHtPYmplY3R9IGF0dHJzXG4gICAgICAgKi9cbiAgICAgIGluaXQ6IGZ1bmN0aW9uKHNjb3BlLCBlbGVtZW50LCBhdHRycykge1xuICAgICAgICB0aGlzLl9lbGVtZW50ID0gZWxlbWVudDtcbiAgICAgICAgdGhpcy5fc2NvcGUgPSBzY29wZTtcbiAgICAgICAgdGhpcy5fYXR0cnMgPSBhdHRycztcblxuICAgICAgICB0aGlzLl9zY29wZS4kb24oJyRkZXN0cm95JywgdGhpcy5fZGVzdHJveS5iaW5kKHRoaXMpKTtcblxuICAgICAgICB0aGlzLl9jbGVhckRlcml2aW5nTWV0aG9kcyA9ICRvbnNlbi5kZXJpdmVNZXRob2RzKHRoaXMsIGVsZW1lbnRbMF0sIFtcbiAgICAgICAgICAnc2V0QWN0aXZlSW5kZXgnLCAnZ2V0QWN0aXZlSW5kZXgnLCAnbmV4dCcsICdwcmV2JywgJ3JlZnJlc2gnLCAnZmlyc3QnLCAnbGFzdCdcbiAgICAgICAgXSk7XG5cbiAgICAgICAgdGhpcy5fY2xlYXJEZXJpdmluZ0V2ZW50cyA9ICRvbnNlbi5kZXJpdmVFdmVudHModGhpcywgZWxlbWVudFswXSwgWydyZWZyZXNoJywgJ3Bvc3RjaGFuZ2UnLCAnb3ZlcnNjcm9sbCddLCBmdW5jdGlvbihkZXRhaWwpIHtcbiAgICAgICAgICBpZiAoZGV0YWlsLmNhcm91c2VsKSB7XG4gICAgICAgICAgICBkZXRhaWwuY2Fyb3VzZWwgPSB0aGlzO1xuICAgICAgICAgIH1cbiAgICAgICAgICByZXR1cm4gZGV0YWlsO1xuICAgICAgICB9LmJpbmQodGhpcykpO1xuICAgICAgfSxcblxuICAgICAgX2Rlc3Ryb3k6IGZ1bmN0aW9uKCkge1xuICAgICAgICB0aGlzLmVtaXQoJ2Rlc3Ryb3knKTtcblxuICAgICAgICB0aGlzLl9jbGVhckRlcml2aW5nRXZlbnRzKCk7XG4gICAgICAgIHRoaXMuX2NsZWFyRGVyaXZpbmdNZXRob2RzKCk7XG5cbiAgICAgICAgdGhpcy5fZWxlbWVudCA9IHRoaXMuX3Njb3BlID0gdGhpcy5fYXR0cnMgPSBudWxsO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgTWljcm9FdmVudC5taXhpbihDYXJvdXNlbFZpZXcpO1xuXG4gICAgJG9uc2VuLmRlcml2ZVByb3BlcnRpZXNGcm9tRWxlbWVudChDYXJvdXNlbFZpZXcsIFtcbiAgICAgICdjZW50ZXJlZCcsICdvdmVyc2Nyb2xsYWJsZScsICdkaXNhYmxlZCcsICdhdXRvU2Nyb2xsJywgJ3N3aXBlYWJsZScsICdhdXRvU2Nyb2xsUmF0aW8nLCAnaXRlbUNvdW50J1xuICAgIF0pO1xuXG4gICAgcmV0dXJuIENhcm91c2VsVmlldztcbiAgfSk7XG59KSgpO1xuIiwiLypcbkNvcHlyaWdodCAyMDEzLTIwMTUgQVNJQUwgQ09SUE9SQVRJT05cblxuTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbnlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbllvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuXG4gICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcblxuVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG5TZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG5saW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cblxuKi9cblxuKGZ1bmN0aW9uKCkge1xuICAndXNlIHN0cmljdCc7XG5cbiAgdmFyIG1vZHVsZSA9IGFuZ3VsYXIubW9kdWxlKCdvbnNlbicpO1xuXG4gIG1vZHVsZS5mYWN0b3J5KCdEaWFsb2dWaWV3JywgZnVuY3Rpb24oJG9uc2VuKSB7XG5cbiAgICB2YXIgRGlhbG9nVmlldyA9IENsYXNzLmV4dGVuZCh7XG5cbiAgICAgIGluaXQ6IGZ1bmN0aW9uKHNjb3BlLCBlbGVtZW50LCBhdHRycykge1xuICAgICAgICB0aGlzLl9zY29wZSA9IHNjb3BlO1xuICAgICAgICB0aGlzLl9lbGVtZW50ID0gZWxlbWVudDtcbiAgICAgICAgdGhpcy5fYXR0cnMgPSBhdHRycztcblxuICAgICAgICB0aGlzLl9jbGVhckRlcml2aW5nTWV0aG9kcyA9ICRvbnNlbi5kZXJpdmVNZXRob2RzKHRoaXMsIHRoaXMuX2VsZW1lbnRbMF0sIFtcbiAgICAgICAgICAnc2hvdycsICdoaWRlJ1xuICAgICAgICBdKTtcblxuICAgICAgICB0aGlzLl9jbGVhckRlcml2aW5nRXZlbnRzID0gJG9uc2VuLmRlcml2ZUV2ZW50cyh0aGlzLCB0aGlzLl9lbGVtZW50WzBdLCBbXG4gICAgICAgICAgJ3ByZXNob3cnLFxuICAgICAgICAgICdwb3N0c2hvdycsXG4gICAgICAgICAgJ3ByZWhpZGUnLFxuICAgICAgICAgICdwb3N0aGlkZScsXG4gICAgICAgICAgJ2NhbmNlbCdcbiAgICAgICAgXSwgZnVuY3Rpb24oZGV0YWlsKSB7XG4gICAgICAgICAgaWYgKGRldGFpbC5kaWFsb2cpIHtcbiAgICAgICAgICAgIGRldGFpbC5kaWFsb2cgPSB0aGlzO1xuICAgICAgICAgIH1cbiAgICAgICAgICByZXR1cm4gZGV0YWlsO1xuICAgICAgICB9LmJpbmQodGhpcykpO1xuXG4gICAgICAgIHRoaXMuX3Njb3BlLiRvbignJGRlc3Ryb3knLCB0aGlzLl9kZXN0cm95LmJpbmQodGhpcykpO1xuICAgICAgfSxcblxuICAgICAgX2Rlc3Ryb3k6IGZ1bmN0aW9uKCkge1xuICAgICAgICB0aGlzLmVtaXQoJ2Rlc3Ryb3knKTtcblxuICAgICAgICB0aGlzLl9lbGVtZW50LnJlbW92ZSgpO1xuICAgICAgICB0aGlzLl9jbGVhckRlcml2aW5nTWV0aG9kcygpO1xuICAgICAgICB0aGlzLl9jbGVhckRlcml2aW5nRXZlbnRzKCk7XG5cbiAgICAgICAgdGhpcy5fc2NvcGUgPSB0aGlzLl9hdHRycyA9IHRoaXMuX2VsZW1lbnQgPSBudWxsO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgTWljcm9FdmVudC5taXhpbihEaWFsb2dWaWV3KTtcbiAgICAkb25zZW4uZGVyaXZlUHJvcGVydGllc0Zyb21FbGVtZW50KERpYWxvZ1ZpZXcsIFsnZGlzYWJsZWQnLCAnY2FuY2VsYWJsZScsICd2aXNpYmxlJywgJ29uRGV2aWNlQmFja0J1dHRvbiddKTtcblxuICAgIHJldHVybiBEaWFsb2dWaWV3O1xuICB9KTtcbn0pKCk7XG4iLCIvKlxuQ29weXJpZ2h0IDIwMTMtMjAxNSBBU0lBTCBDT1JQT1JBVElPTlxuXG5MaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xueW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG5cbiAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuXG5Vbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG5kaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG5XSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cblNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbmxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuXG4qL1xuXG4oZnVuY3Rpb24oKSB7XG4gICd1c2Ugc3RyaWN0JztcblxuICB2YXIgbW9kdWxlID0gYW5ndWxhci5tb2R1bGUoJ29uc2VuJyk7XG5cbiAgbW9kdWxlLmZhY3RvcnkoJ0ZhYlZpZXcnLCBmdW5jdGlvbigkb25zZW4pIHtcblxuICAgIC8qKlxuICAgICAqIEBjbGFzcyBGYWJWaWV3XG4gICAgICovXG4gICAgdmFyIEZhYlZpZXcgPSBDbGFzcy5leHRlbmQoe1xuXG4gICAgICAvKipcbiAgICAgICAqIEBwYXJhbSB7T2JqZWN0fSBzY29wZVxuICAgICAgICogQHBhcmFtIHtqcUxpdGV9IGVsZW1lbnRcbiAgICAgICAqIEBwYXJhbSB7T2JqZWN0fSBhdHRyc1xuICAgICAgICovXG4gICAgICBpbml0OiBmdW5jdGlvbihzY29wZSwgZWxlbWVudCwgYXR0cnMpIHtcbiAgICAgICAgdGhpcy5fZWxlbWVudCA9IGVsZW1lbnQ7XG4gICAgICAgIHRoaXMuX3Njb3BlID0gc2NvcGU7XG4gICAgICAgIHRoaXMuX2F0dHJzID0gYXR0cnM7XG5cbiAgICAgICAgdGhpcy5fc2NvcGUuJG9uKCckZGVzdHJveScsIHRoaXMuX2Rlc3Ryb3kuYmluZCh0aGlzKSk7XG5cbiAgICAgICAgdGhpcy5fY2xlYXJEZXJpdmluZ01ldGhvZHMgPSAkb25zZW4uZGVyaXZlTWV0aG9kcyh0aGlzLCBlbGVtZW50WzBdLCBbXG4gICAgICAgICAgJ3Nob3cnLCAnaGlkZScsICd0b2dnbGUnXG4gICAgICAgIF0pO1xuICAgICAgfSxcblxuICAgICAgX2Rlc3Ryb3k6IGZ1bmN0aW9uKCkge1xuICAgICAgICB0aGlzLmVtaXQoJ2Rlc3Ryb3knKTtcbiAgICAgICAgdGhpcy5fY2xlYXJEZXJpdmluZ01ldGhvZHMoKTtcblxuICAgICAgICB0aGlzLl9lbGVtZW50ID0gdGhpcy5fc2NvcGUgPSB0aGlzLl9hdHRycyA9IG51bGw7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICAkb25zZW4uZGVyaXZlUHJvcGVydGllc0Zyb21FbGVtZW50KEZhYlZpZXcsIFtcbiAgICAgICdkaXNhYmxlZCcsICd2aXNpYmxlJ1xuICAgIF0pO1xuXG4gICAgTWljcm9FdmVudC5taXhpbihGYWJWaWV3KTtcblxuICAgIHJldHVybiBGYWJWaWV3O1xuICB9KTtcbn0pKCk7XG4iLCIvKlxuQ29weXJpZ2h0IDIwMTMtMjAxNSBBU0lBTCBDT1JQT1JBVElPTlxuXG5MaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xueW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG5cbiAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuXG5Vbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG5kaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG5XSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cblNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbmxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuXG4qL1xuXG4oZnVuY3Rpb24oKXtcbiAgJ3VzZSBzdHJpY3QnO1xuXG4gIGFuZ3VsYXIubW9kdWxlKCdvbnNlbicpLmZhY3RvcnkoJ0dlbmVyaWNWaWV3JywgZnVuY3Rpb24oJG9uc2VuKSB7XG5cbiAgICB2YXIgR2VuZXJpY1ZpZXcgPSBDbGFzcy5leHRlbmQoe1xuXG4gICAgICAvKipcbiAgICAgICAqIEBwYXJhbSB7T2JqZWN0fSBzY29wZVxuICAgICAgICogQHBhcmFtIHtqcUxpdGV9IGVsZW1lbnRcbiAgICAgICAqIEBwYXJhbSB7T2JqZWN0fSBhdHRyc1xuICAgICAgICogQHBhcmFtIHtPYmplY3R9IFtvcHRpb25zXVxuICAgICAgICogQHBhcmFtIHtCb29sZWFufSBbb3B0aW9ucy5kaXJlY3RpdmVPbmx5XVxuICAgICAgICogQHBhcmFtIHtGdW5jdGlvbn0gW29wdGlvbnMub25EZXN0cm95XVxuICAgICAgICogQHBhcmFtIHtTdHJpbmd9IFtvcHRpb25zLm1vZGlmaWVyVGVtcGxhdGVdXG4gICAgICAgKi9cbiAgICAgIGluaXQ6IGZ1bmN0aW9uKHNjb3BlLCBlbGVtZW50LCBhdHRycywgb3B0aW9ucykge1xuICAgICAgICB2YXIgc2VsZiA9IHRoaXM7XG4gICAgICAgIG9wdGlvbnMgPSB7fTtcblxuICAgICAgICB0aGlzLl9lbGVtZW50ID0gZWxlbWVudDtcbiAgICAgICAgdGhpcy5fc2NvcGUgPSBzY29wZTtcbiAgICAgICAgdGhpcy5fYXR0cnMgPSBhdHRycztcblxuICAgICAgICBpZiAob3B0aW9ucy5kaXJlY3RpdmVPbmx5KSB7XG4gICAgICAgICAgaWYgKCFvcHRpb25zLm1vZGlmaWVyVGVtcGxhdGUpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignb3B0aW9ucy5tb2RpZmllclRlbXBsYXRlIGlzIHVuZGVmaW5lZC4nKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgJG9uc2VuLmFkZE1vZGlmaWVyTWV0aG9kcyh0aGlzLCBvcHRpb25zLm1vZGlmaWVyVGVtcGxhdGUsIGVsZW1lbnQpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICRvbnNlbi5hZGRNb2RpZmllck1ldGhvZHNGb3JDdXN0b21FbGVtZW50cyh0aGlzLCBlbGVtZW50KTtcbiAgICAgICAgfVxuXG4gICAgICAgICRvbnNlbi5jbGVhbmVyLm9uRGVzdHJveShzY29wZSwgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgc2VsZi5fZXZlbnRzID0gdW5kZWZpbmVkO1xuICAgICAgICAgICRvbnNlbi5yZW1vdmVNb2RpZmllck1ldGhvZHMoc2VsZik7XG5cbiAgICAgICAgICBpZiAob3B0aW9ucy5vbkRlc3Ryb3kpIHtcbiAgICAgICAgICAgIG9wdGlvbnMub25EZXN0cm95KHNlbGYpO1xuICAgICAgICAgIH1cblxuICAgICAgICAgICRvbnNlbi5jbGVhckNvbXBvbmVudCh7XG4gICAgICAgICAgICBzY29wZTogc2NvcGUsXG4gICAgICAgICAgICBhdHRyczogYXR0cnMsXG4gICAgICAgICAgICBlbGVtZW50OiBlbGVtZW50XG4gICAgICAgICAgfSk7XG5cbiAgICAgICAgICBzZWxmID0gZWxlbWVudCA9IHNlbGYuX2VsZW1lbnQgPSBzZWxmLl9zY29wZSA9IHNjb3BlID0gc2VsZi5fYXR0cnMgPSBhdHRycyA9IG9wdGlvbnMgPSBudWxsO1xuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIC8qKlxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBzY29wZVxuICAgICAqIEBwYXJhbSB7anFMaXRlfSBlbGVtZW50XG4gICAgICogQHBhcmFtIHtPYmplY3R9IGF0dHJzXG4gICAgICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnNcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gb3B0aW9ucy52aWV3S2V5XG4gICAgICogQHBhcmFtIHtCb29sZWFufSBbb3B0aW9ucy5kaXJlY3RpdmVPbmx5XVxuICAgICAqIEBwYXJhbSB7RnVuY3Rpb259IFtvcHRpb25zLm9uRGVzdHJveV1cbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gW29wdGlvbnMubW9kaWZpZXJUZW1wbGF0ZV1cbiAgICAgKi9cbiAgICBHZW5lcmljVmlldy5yZWdpc3RlciA9IGZ1bmN0aW9uKHNjb3BlLCBlbGVtZW50LCBhdHRycywgb3B0aW9ucykge1xuICAgICAgdmFyIHZpZXcgPSBuZXcgR2VuZXJpY1ZpZXcoc2NvcGUsIGVsZW1lbnQsIGF0dHJzLCBvcHRpb25zKTtcblxuICAgICAgaWYgKCFvcHRpb25zLnZpZXdLZXkpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdvcHRpb25zLnZpZXdLZXkgaXMgcmVxdWlyZWQuJyk7XG4gICAgICB9XG5cbiAgICAgICRvbnNlbi5kZWNsYXJlVmFyQXR0cmlidXRlKGF0dHJzLCB2aWV3KTtcbiAgICAgIGVsZW1lbnQuZGF0YShvcHRpb25zLnZpZXdLZXksIHZpZXcpO1xuXG4gICAgICB2YXIgZGVzdHJveSA9IG9wdGlvbnMub25EZXN0cm95IHx8IGFuZ3VsYXIubm9vcDtcbiAgICAgIG9wdGlvbnMub25EZXN0cm95ID0gZnVuY3Rpb24odmlldykge1xuICAgICAgICBkZXN0cm95KHZpZXcpO1xuICAgICAgICBlbGVtZW50LmRhdGEob3B0aW9ucy52aWV3S2V5LCBudWxsKTtcbiAgICAgIH07XG5cbiAgICAgIHJldHVybiB2aWV3O1xuICAgIH07XG5cbiAgICBNaWNyb0V2ZW50Lm1peGluKEdlbmVyaWNWaWV3KTtcblxuICAgIHJldHVybiBHZW5lcmljVmlldztcbiAgfSk7XG59KSgpO1xuIiwiLypcbkNvcHlyaWdodCAyMDEzLTIwMTUgQVNJQUwgQ09SUE9SQVRJT05cblxuTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbnlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbllvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuXG4gICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcblxuVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG5TZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG5saW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cblxuKi9cblxuKGZ1bmN0aW9uKCl7XG4gICd1c2Ugc3RyaWN0JztcblxuICBhbmd1bGFyLm1vZHVsZSgnb25zZW4nKS5mYWN0b3J5KCdBbmd1bGFyTGF6eVJlcGVhdERlbGVnYXRlJywgZnVuY3Rpb24oJGNvbXBpbGUpIHtcblxuICAgIGNvbnN0IGRpcmVjdGl2ZUF0dHJpYnV0ZXMgPSBbJ29ucy1sYXp5LXJlcGVhdCcsICdvbnM6bGF6eTpyZXBlYXQnLCAnb25zX2xhenlfcmVwZWF0JywgJ2RhdGEtb25zLWxhenktcmVwZWF0JywgJ3gtb25zLWxhenktcmVwZWF0J107XG4gICAgY2xhc3MgQW5ndWxhckxhenlSZXBlYXREZWxlZ2F0ZSBleHRlbmRzIG9ucy5faW50ZXJuYWwuTGF6eVJlcGVhdERlbGVnYXRlIHtcbiAgICAgIC8qKlxuICAgICAgICogQHBhcmFtIHtPYmplY3R9IHVzZXJEZWxlZ2F0ZVxuICAgICAgICogQHBhcmFtIHtFbGVtZW50fSB0ZW1wbGF0ZUVsZW1lbnRcbiAgICAgICAqIEBwYXJhbSB7U2NvcGV9IHBhcmVudFNjb3BlXG4gICAgICAgKi9cbiAgICAgIGNvbnN0cnVjdG9yKHVzZXJEZWxlZ2F0ZSwgdGVtcGxhdGVFbGVtZW50LCBwYXJlbnRTY29wZSkge1xuICAgICAgICBzdXBlcih1c2VyRGVsZWdhdGUsIHRlbXBsYXRlRWxlbWVudCk7XG4gICAgICAgIHRoaXMuX3BhcmVudFNjb3BlID0gcGFyZW50U2NvcGU7XG5cbiAgICAgICAgZGlyZWN0aXZlQXR0cmlidXRlcy5mb3JFYWNoKGF0dHIgPT4gdGVtcGxhdGVFbGVtZW50LnJlbW92ZUF0dHJpYnV0ZShhdHRyKSk7XG4gICAgICAgIHRoaXMuX2xpbmtlciA9ICRjb21waWxlKHRlbXBsYXRlRWxlbWVudCA/IHRlbXBsYXRlRWxlbWVudC5jbG9uZU5vZGUodHJ1ZSkgOiBudWxsKTtcbiAgICAgIH1cblxuICAgICAgY29uZmlndXJlSXRlbVNjb3BlKGl0ZW0sIHNjb3BlKXtcbiAgICAgICAgaWYgKHRoaXMuX3VzZXJEZWxlZ2F0ZS5jb25maWd1cmVJdGVtU2NvcGUgaW5zdGFuY2VvZiBGdW5jdGlvbikge1xuICAgICAgICAgIHRoaXMuX3VzZXJEZWxlZ2F0ZS5jb25maWd1cmVJdGVtU2NvcGUoaXRlbSwgc2NvcGUpO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGRlc3Ryb3lJdGVtU2NvcGUoaXRlbSwgZWxlbWVudCl7XG4gICAgICAgIGlmICh0aGlzLl91c2VyRGVsZWdhdGUuZGVzdHJveUl0ZW1TY29wZSBpbnN0YW5jZW9mIEZ1bmN0aW9uKSB7XG4gICAgICAgICAgdGhpcy5fdXNlckRlbGVnYXRlLmRlc3Ryb3lJdGVtU2NvcGUoaXRlbSwgZWxlbWVudCk7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgX3VzaW5nQmluZGluZygpIHtcbiAgICAgICAgaWYgKHRoaXMuX3VzZXJEZWxlZ2F0ZS5jb25maWd1cmVJdGVtU2NvcGUpIHtcbiAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLl91c2VyRGVsZWdhdGUuY3JlYXRlSXRlbUNvbnRlbnQpIHtcbiAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cblxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ2BsYXp5LXJlcGVhdGAgZGVsZWdhdGUgb2JqZWN0IGlzIHZhZ3VlLicpO1xuICAgICAgfVxuXG4gICAgICBsb2FkSXRlbUVsZW1lbnQoaW5kZXgsIGRvbmUpIHtcbiAgICAgICAgdGhpcy5fcHJlcGFyZUl0ZW1FbGVtZW50KGluZGV4LCAoe2VsZW1lbnQsIHNjb3BlfSkgPT4ge1xuICAgICAgICAgIGRvbmUoe2VsZW1lbnQsIHNjb3BlfSk7XG4gICAgICAgIH0pO1xuICAgICAgfVxuXG4gICAgICBfcHJlcGFyZUl0ZW1FbGVtZW50KGluZGV4LCBkb25lKSB7XG4gICAgICAgIGNvbnN0IHNjb3BlID0gdGhpcy5fcGFyZW50U2NvcGUuJG5ldygpO1xuICAgICAgICB0aGlzLl9hZGRTcGVjaWFsUHJvcGVydGllcyhpbmRleCwgc2NvcGUpO1xuXG4gICAgICAgIGlmICh0aGlzLl91c2luZ0JpbmRpbmcoKSkge1xuICAgICAgICAgIHRoaXMuY29uZmlndXJlSXRlbVNjb3BlKGluZGV4LCBzY29wZSk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLl9saW5rZXIoc2NvcGUsIChjbG9uZWQpID0+IHtcbiAgICAgICAgICBsZXQgZWxlbWVudCA9IGNsb25lZFswXTtcbiAgICAgICAgICBpZiAoIXRoaXMuX3VzaW5nQmluZGluZygpKSB7XG4gICAgICAgICAgICBlbGVtZW50ID0gdGhpcy5fdXNlckRlbGVnYXRlLmNyZWF0ZUl0ZW1Db250ZW50KGluZGV4LCBlbGVtZW50KTtcbiAgICAgICAgICAgICRjb21waWxlKGVsZW1lbnQpKHNjb3BlKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBkb25lKHtlbGVtZW50LCBzY29wZX0pO1xuICAgICAgICB9KTtcbiAgICAgIH1cblxuICAgICAgLyoqXG4gICAgICAgKiBAcGFyYW0ge051bWJlcn0gaW5kZXhcbiAgICAgICAqIEBwYXJhbSB7T2JqZWN0fSBzY29wZVxuICAgICAgICovXG4gICAgICBfYWRkU3BlY2lhbFByb3BlcnRpZXMoaSwgc2NvcGUpIHtcbiAgICAgICAgY29uc3QgbGFzdCA9IHRoaXMuY291bnRJdGVtcygpIC0gMTtcbiAgICAgICAgYW5ndWxhci5leHRlbmQoc2NvcGUsIHtcbiAgICAgICAgICAkaW5kZXg6IGksXG4gICAgICAgICAgJGZpcnN0OiBpID09PSAwLFxuICAgICAgICAgICRsYXN0OiBpID09PSBsYXN0LFxuICAgICAgICAgICRtaWRkbGU6IGkgIT09IDAgJiYgaSAhPT0gbGFzdCxcbiAgICAgICAgICAkZXZlbjogaSAlIDIgPT09IDAsXG4gICAgICAgICAgJG9kZDogaSAlIDIgPT09IDFcbiAgICAgICAgfSk7XG4gICAgICB9XG5cbiAgICAgIHVwZGF0ZUl0ZW0oaW5kZXgsIGl0ZW0pIHtcbiAgICAgICAgaWYgKHRoaXMuX3VzaW5nQmluZGluZygpKSB7XG4gICAgICAgICAgaXRlbS5zY29wZS4kZXZhbEFzeW5jKCgpID0+IHRoaXMuY29uZmlndXJlSXRlbVNjb3BlKGluZGV4LCBpdGVtLnNjb3BlKSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgc3VwZXIudXBkYXRlSXRlbShpbmRleCwgaXRlbSk7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgLyoqXG4gICAgICAgKiBAcGFyYW0ge051bWJlcn0gaW5kZXhcbiAgICAgICAqIEBwYXJhbSB7T2JqZWN0fSBpdGVtXG4gICAgICAgKiBAcGFyYW0ge09iamVjdH0gaXRlbS5zY29wZVxuICAgICAgICogQHBhcmFtIHtFbGVtZW50fSBpdGVtLmVsZW1lbnRcbiAgICAgICAqL1xuICAgICAgZGVzdHJveUl0ZW0oaW5kZXgsIGl0ZW0pIHtcbiAgICAgICAgaWYgKHRoaXMuX3VzaW5nQmluZGluZygpKSB7XG4gICAgICAgICAgdGhpcy5kZXN0cm95SXRlbVNjb3BlKGluZGV4LCBpdGVtLnNjb3BlKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBzdXBlci5kZXN0cm95SXRlbShpbmRleCwgaXRlbS5lbGVtZW50KTtcbiAgICAgICAgfVxuICAgICAgICBpdGVtLnNjb3BlLiRkZXN0cm95KCk7XG4gICAgICB9XG5cbiAgICAgIGRlc3Ryb3koKSB7XG4gICAgICAgIHN1cGVyLmRlc3Ryb3koKTtcbiAgICAgICAgdGhpcy5fc2NvcGUgPSBudWxsO1xuICAgICAgfVxuXG4gICAgfVxuXG4gICAgcmV0dXJuIEFuZ3VsYXJMYXp5UmVwZWF0RGVsZWdhdGU7XG4gIH0pO1xufSkoKTtcbiIsIi8qXG5Db3B5cmlnaHQgMjAxMy0yMDE1IEFTSUFMIENPUlBPUkFUSU9OXG5cbkxpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG55b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG5Zb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcblxuICAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG5cblVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbmRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbldJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxubGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG5cbiovXG5cbihmdW5jdGlvbigpe1xuICAndXNlIHN0cmljdCc7XG4gIHZhciBtb2R1bGUgPSBhbmd1bGFyLm1vZHVsZSgnb25zZW4nKTtcblxuICBtb2R1bGUuZmFjdG9yeSgnTGF6eVJlcGVhdFZpZXcnLCBmdW5jdGlvbihBbmd1bGFyTGF6eVJlcGVhdERlbGVnYXRlKSB7XG5cbiAgICB2YXIgTGF6eVJlcGVhdFZpZXcgPSBDbGFzcy5leHRlbmQoe1xuXG4gICAgICAvKipcbiAgICAgICAqIEBwYXJhbSB7T2JqZWN0fSBzY29wZVxuICAgICAgICogQHBhcmFtIHtqcUxpdGV9IGVsZW1lbnRcbiAgICAgICAqIEBwYXJhbSB7T2JqZWN0fSBhdHRyc1xuICAgICAgICovXG4gICAgICBpbml0OiBmdW5jdGlvbihzY29wZSwgZWxlbWVudCwgYXR0cnMsIGxpbmtlcikge1xuICAgICAgICB0aGlzLl9lbGVtZW50ID0gZWxlbWVudDtcbiAgICAgICAgdGhpcy5fc2NvcGUgPSBzY29wZTtcbiAgICAgICAgdGhpcy5fYXR0cnMgPSBhdHRycztcbiAgICAgICAgdGhpcy5fbGlua2VyID0gbGlua2VyO1xuXG4gICAgICAgIHZhciB1c2VyRGVsZWdhdGUgPSB0aGlzLl9zY29wZS4kZXZhbCh0aGlzLl9hdHRycy5vbnNMYXp5UmVwZWF0KTtcblxuICAgICAgICB2YXIgaW50ZXJuYWxEZWxlZ2F0ZSA9IG5ldyBBbmd1bGFyTGF6eVJlcGVhdERlbGVnYXRlKHVzZXJEZWxlZ2F0ZSwgZWxlbWVudFswXSwgZWxlbWVudC5zY29wZSgpKTtcblxuICAgICAgICB0aGlzLl9wcm92aWRlciA9IG5ldyBvbnMuX2ludGVybmFsLkxhenlSZXBlYXRQcm92aWRlcihlbGVtZW50WzBdLnBhcmVudE5vZGUsIGludGVybmFsRGVsZWdhdGUpO1xuXG4gICAgICAgIC8vIEV4cG9zZSByZWZyZXNoIG1ldGhvZCB0byB1c2VyLlxuICAgICAgICB1c2VyRGVsZWdhdGUucmVmcmVzaCA9IHRoaXMuX3Byb3ZpZGVyLnJlZnJlc2guYmluZCh0aGlzLl9wcm92aWRlcik7XG5cbiAgICAgICAgZWxlbWVudC5yZW1vdmUoKTtcblxuICAgICAgICAvLyBSZW5kZXIgd2hlbiBudW1iZXIgb2YgaXRlbXMgY2hhbmdlLlxuICAgICAgICB0aGlzLl9zY29wZS4kd2F0Y2goaW50ZXJuYWxEZWxlZ2F0ZS5jb3VudEl0ZW1zLmJpbmQoaW50ZXJuYWxEZWxlZ2F0ZSksIHRoaXMuX3Byb3ZpZGVyLl9vbkNoYW5nZS5iaW5kKHRoaXMuX3Byb3ZpZGVyKSk7XG5cbiAgICAgICAgdGhpcy5fc2NvcGUuJG9uKCckZGVzdHJveScsICgpID0+IHtcbiAgICAgICAgICB0aGlzLl9lbGVtZW50ID0gdGhpcy5fc2NvcGUgPSB0aGlzLl9hdHRycyA9IHRoaXMuX2xpbmtlciA9IG51bGw7XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgcmV0dXJuIExhenlSZXBlYXRWaWV3O1xuICB9KTtcbn0pKCk7XG4iLCIvKlxuQ29weXJpZ2h0IDIwMTMtMjAxNSBBU0lBTCBDT1JQT1JBVElPTlxuXG5MaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xueW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG5cbiAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuXG5Vbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG5kaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG5XSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cblNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbmxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuXG4qL1xuXG4oZnVuY3Rpb24oKSB7XG4gICd1c2Ugc3RyaWN0JztcblxuICB2YXIgbW9kdWxlID0gYW5ndWxhci5tb2R1bGUoJ29uc2VuJyk7XG5cbiAgbW9kdWxlLmZhY3RvcnkoJ01vZGFsVmlldycsIGZ1bmN0aW9uKCRvbnNlbiwgJHBhcnNlKSB7XG5cbiAgICB2YXIgTW9kYWxWaWV3ID0gQ2xhc3MuZXh0ZW5kKHtcbiAgICAgIF9lbGVtZW50OiB1bmRlZmluZWQsXG4gICAgICBfc2NvcGU6IHVuZGVmaW5lZCxcblxuICAgICAgaW5pdDogZnVuY3Rpb24oc2NvcGUsIGVsZW1lbnQsIGF0dHJzKSB7XG4gICAgICAgIHRoaXMuX3Njb3BlID0gc2NvcGU7XG4gICAgICAgIHRoaXMuX2VsZW1lbnQgPSBlbGVtZW50O1xuICAgICAgICB0aGlzLl9hdHRycyA9IGF0dHJzO1xuICAgICAgICB0aGlzLl9zY29wZS4kb24oJyRkZXN0cm95JywgdGhpcy5fZGVzdHJveS5iaW5kKHRoaXMpKTtcblxuICAgICAgICB0aGlzLl9jbGVhckRlcml2aW5nTWV0aG9kcyA9ICRvbnNlbi5kZXJpdmVNZXRob2RzKHRoaXMsIHRoaXMuX2VsZW1lbnRbMF0sIFsgJ3Nob3cnLCAnaGlkZScsICd0b2dnbGUnIF0pO1xuXG4gICAgICAgIHRoaXMuX2NsZWFyRGVyaXZpbmdFdmVudHMgPSAkb25zZW4uZGVyaXZlRXZlbnRzKHRoaXMsIHRoaXMuX2VsZW1lbnRbMF0sIFtcbiAgICAgICAgICAncHJlc2hvdycsICdwb3N0c2hvdycsICdwcmVoaWRlJywgJ3Bvc3RoaWRlJyxcbiAgICAgICAgXSwgZnVuY3Rpb24oZGV0YWlsKSB7XG4gICAgICAgICAgaWYgKGRldGFpbC5tb2RhbCkge1xuICAgICAgICAgICAgZGV0YWlsLm1vZGFsID0gdGhpcztcbiAgICAgICAgICB9XG4gICAgICAgICAgcmV0dXJuIGRldGFpbDtcbiAgICAgICAgfS5iaW5kKHRoaXMpKTtcbiAgICAgIH0sXG5cbiAgICAgIF9kZXN0cm95OiBmdW5jdGlvbigpIHtcbiAgICAgICAgdGhpcy5lbWl0KCdkZXN0cm95Jywge3BhZ2U6IHRoaXN9KTtcblxuICAgICAgICB0aGlzLl9lbGVtZW50LnJlbW92ZSgpO1xuICAgICAgICB0aGlzLl9jbGVhckRlcml2aW5nTWV0aG9kcygpO1xuICAgICAgICB0aGlzLl9jbGVhckRlcml2aW5nRXZlbnRzKCk7XG4gICAgICAgIHRoaXMuX2V2ZW50cyA9IHRoaXMuX2VsZW1lbnQgPSB0aGlzLl9zY29wZSA9IHRoaXMuX2F0dHJzID0gbnVsbDtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIE1pY3JvRXZlbnQubWl4aW4oTW9kYWxWaWV3KTtcbiAgICAkb25zZW4uZGVyaXZlUHJvcGVydGllc0Zyb21FbGVtZW50KE1vZGFsVmlldywgWydvbkRldmljZUJhY2tCdXR0b24nXSk7XG5cblxuICAgIHJldHVybiBNb2RhbFZpZXc7XG4gIH0pO1xuXG59KSgpO1xuIiwiLypcbkNvcHlyaWdodCAyMDEzLTIwMTUgQVNJQUwgQ09SUE9SQVRJT05cblxuTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbnlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbllvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuXG4gICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcblxuVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG5TZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG5saW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cblxuKi9cblxuKGZ1bmN0aW9uKCkge1xuICAndXNlIHN0cmljdCc7XG5cbiAgdmFyIG1vZHVsZSA9IGFuZ3VsYXIubW9kdWxlKCdvbnNlbicpO1xuXG4gIG1vZHVsZS5mYWN0b3J5KCdOYXZpZ2F0b3JWaWV3JywgZnVuY3Rpb24oJGNvbXBpbGUsICRvbnNlbikge1xuXG4gICAgLyoqXG4gICAgICogTWFuYWdlcyB0aGUgcGFnZSBuYXZpZ2F0aW9uIGJhY2tlZCBieSBwYWdlIHN0YWNrLlxuICAgICAqXG4gICAgICogQGNsYXNzIE5hdmlnYXRvclZpZXdcbiAgICAgKi9cbiAgICB2YXIgTmF2aWdhdG9yVmlldyA9IENsYXNzLmV4dGVuZCh7XG5cbiAgICAgIC8qKlxuICAgICAgICogQG1lbWJlciB7anFMaXRlfSBPYmplY3RcbiAgICAgICAqL1xuICAgICAgX2VsZW1lbnQ6IHVuZGVmaW5lZCxcblxuICAgICAgLyoqXG4gICAgICAgKiBAbWVtYmVyIHtPYmplY3R9IE9iamVjdFxuICAgICAgICovXG4gICAgICBfYXR0cnM6IHVuZGVmaW5lZCxcblxuICAgICAgLyoqXG4gICAgICAgKiBAbWVtYmVyIHtPYmplY3R9XG4gICAgICAgKi9cbiAgICAgIF9zY29wZTogdW5kZWZpbmVkLFxuXG4gICAgICAvKipcbiAgICAgICAqIEBwYXJhbSB7T2JqZWN0fSBzY29wZVxuICAgICAgICogQHBhcmFtIHtqcUxpdGV9IGVsZW1lbnQganFMaXRlIE9iamVjdCB0byBtYW5hZ2Ugd2l0aCBuYXZpZ2F0b3JcbiAgICAgICAqIEBwYXJhbSB7T2JqZWN0fSBhdHRyc1xuICAgICAgICovXG4gICAgICBpbml0OiBmdW5jdGlvbihzY29wZSwgZWxlbWVudCwgYXR0cnMpIHtcblxuICAgICAgICB0aGlzLl9lbGVtZW50ID0gZWxlbWVudCB8fCBhbmd1bGFyLmVsZW1lbnQod2luZG93LmRvY3VtZW50LmJvZHkpO1xuICAgICAgICB0aGlzLl9zY29wZSA9IHNjb3BlIHx8IHRoaXMuX2VsZW1lbnQuc2NvcGUoKTtcbiAgICAgICAgdGhpcy5fYXR0cnMgPSBhdHRycztcbiAgICAgICAgdGhpcy5fcHJldmlvdXNQYWdlU2NvcGUgPSBudWxsO1xuXG4gICAgICAgIHRoaXMuX2JvdW5kT25QcmVwb3AgPSB0aGlzLl9vblByZXBvcC5iaW5kKHRoaXMpO1xuICAgICAgICB0aGlzLl9lbGVtZW50Lm9uKCdwcmVwb3AnLCB0aGlzLl9ib3VuZE9uUHJlcG9wKTtcblxuICAgICAgICB0aGlzLl9zY29wZS4kb24oJyRkZXN0cm95JywgdGhpcy5fZGVzdHJveS5iaW5kKHRoaXMpKTtcblxuICAgICAgICB0aGlzLl9jbGVhckRlcml2aW5nRXZlbnRzID0gJG9uc2VuLmRlcml2ZUV2ZW50cyh0aGlzLCBlbGVtZW50WzBdLCBbXG4gICAgICAgICAgJ3ByZXB1c2gnLCAncG9zdHB1c2gnLCAncHJlcG9wJyxcbiAgICAgICAgICAncG9zdHBvcCcsICdpbml0JywgJ3Nob3cnLCAnaGlkZScsICdkZXN0cm95J1xuICAgICAgICBdLCBmdW5jdGlvbihkZXRhaWwpIHtcbiAgICAgICAgICBpZiAoZGV0YWlsLm5hdmlnYXRvcikge1xuICAgICAgICAgICAgZGV0YWlsLm5hdmlnYXRvciA9IHRoaXM7XG4gICAgICAgICAgfVxuICAgICAgICAgIHJldHVybiBkZXRhaWw7XG4gICAgICAgIH0uYmluZCh0aGlzKSk7XG5cbiAgICAgICAgdGhpcy5fY2xlYXJEZXJpdmluZ01ldGhvZHMgPSAkb25zZW4uZGVyaXZlTWV0aG9kcyh0aGlzLCBlbGVtZW50WzBdLCBbXG4gICAgICAgICAgJ2luc2VydFBhZ2UnLFxuICAgICAgICAgICdyZW1vdmVQYWdlJyxcbiAgICAgICAgICAncHVzaFBhZ2UnLFxuICAgICAgICAgICdicmluZ1BhZ2VUb3AnLFxuICAgICAgICAgICdwb3BQYWdlJyxcbiAgICAgICAgICAncmVwbGFjZVBhZ2UnLFxuICAgICAgICAgICdyZXNldFRvUGFnZScsXG4gICAgICAgICAgJ2NhblBvcFBhZ2UnXG4gICAgICAgIF0pO1xuICAgICAgfSxcblxuICAgICAgX29uUHJlcG9wOiBmdW5jdGlvbihldmVudCkge1xuICAgICAgICB2YXIgcGFnZXMgPSBldmVudC5kZXRhaWwubmF2aWdhdG9yLnBhZ2VzO1xuICAgICAgICBhbmd1bGFyLmVsZW1lbnQocGFnZXNbcGFnZXMubGVuZ3RoIC0gMl0pLmRhdGEoJ19zY29wZScpLiRldmFsQXN5bmMoKTtcbiAgICAgIH0sXG5cbiAgICAgIF9kZXN0cm95OiBmdW5jdGlvbigpIHtcbiAgICAgICAgdGhpcy5lbWl0KCdkZXN0cm95Jyk7XG4gICAgICAgIHRoaXMuX2NsZWFyRGVyaXZpbmdFdmVudHMoKTtcbiAgICAgICAgdGhpcy5fY2xlYXJEZXJpdmluZ01ldGhvZHMoKTtcbiAgICAgICAgdGhpcy5fZWxlbWVudC5vZmYoJ3ByZXBvcCcsIHRoaXMuX2JvdW5kT25QcmVwb3ApO1xuICAgICAgICB0aGlzLl9lbGVtZW50ID0gdGhpcy5fc2NvcGUgPSB0aGlzLl9hdHRycyA9IG51bGw7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICBNaWNyb0V2ZW50Lm1peGluKE5hdmlnYXRvclZpZXcpO1xuICAgICRvbnNlbi5kZXJpdmVQcm9wZXJ0aWVzRnJvbUVsZW1lbnQoTmF2aWdhdG9yVmlldywgWydwYWdlcycsICd0b3BQYWdlJ10pO1xuXG4gICAgcmV0dXJuIE5hdmlnYXRvclZpZXc7XG4gIH0pO1xufSkoKTtcbiIsIi8qXG5Db3B5cmlnaHQgMjAxMy0yMDE1IEFTSUFMIENPUlBPUkFUSU9OXG5cbkxpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG55b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG5Zb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcblxuICAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG5cblVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbmRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbldJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxubGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG5cbiovXG5cbihmdW5jdGlvbigpIHtcbiAgJ3VzZSBzdHJpY3QnO1xuXG4gIHZhciBtb2R1bGUgPSBhbmd1bGFyLm1vZHVsZSgnb25zZW4nKTtcblxuICBtb2R1bGUuZmFjdG9yeSgnUGFnZVZpZXcnLCBmdW5jdGlvbigkb25zZW4sICRwYXJzZSkge1xuXG4gICAgdmFyIFBhZ2VWaWV3ID0gQ2xhc3MuZXh0ZW5kKHtcbiAgICAgIGluaXQ6IGZ1bmN0aW9uKHNjb3BlLCBlbGVtZW50LCBhdHRycykge1xuICAgICAgICB0aGlzLl9zY29wZSA9IHNjb3BlO1xuICAgICAgICB0aGlzLl9lbGVtZW50ID0gZWxlbWVudDtcbiAgICAgICAgdGhpcy5fYXR0cnMgPSBhdHRycztcblxuICAgICAgICB0aGlzLl9jbGVhckxpc3RlbmVyID0gc2NvcGUuJG9uKCckZGVzdHJveScsIHRoaXMuX2Rlc3Ryb3kuYmluZCh0aGlzKSk7XG5cbiAgICAgICAgdGhpcy5fY2xlYXJEZXJpdmluZ0V2ZW50cyA9ICRvbnNlbi5kZXJpdmVFdmVudHModGhpcywgZWxlbWVudFswXSwgWydpbml0JywgJ3Nob3cnLCAnaGlkZScsICdkZXN0cm95J10pO1xuXG4gICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0aGlzLCAnb25EZXZpY2VCYWNrQnV0dG9uJywge1xuICAgICAgICAgIGdldDogKCkgPT4gdGhpcy5fZWxlbWVudFswXS5vbkRldmljZUJhY2tCdXR0b24sXG4gICAgICAgICAgc2V0OiB2YWx1ZSA9PiB7XG4gICAgICAgICAgICBpZiAoIXRoaXMuX3VzZXJCYWNrQnV0dG9uSGFuZGxlcikge1xuICAgICAgICAgICAgICB0aGlzLl9lbmFibGVCYWNrQnV0dG9uSGFuZGxlcigpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5fdXNlckJhY2tCdXR0b25IYW5kbGVyID0gdmFsdWU7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICBpZiAodGhpcy5fYXR0cnMubmdEZXZpY2VCYWNrQnV0dG9uIHx8IHRoaXMuX2F0dHJzLm9uRGV2aWNlQmFja0J1dHRvbikge1xuICAgICAgICAgIHRoaXMuX2VuYWJsZUJhY2tCdXR0b25IYW5kbGVyKCk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMuX2F0dHJzLm5nSW5maW5pdGVTY3JvbGwpIHtcbiAgICAgICAgICB0aGlzLl9lbGVtZW50WzBdLm9uSW5maW5pdGVTY3JvbGwgPSAoZG9uZSkgPT4ge1xuICAgICAgICAgICAgJHBhcnNlKHRoaXMuX2F0dHJzLm5nSW5maW5pdGVTY3JvbGwpKHRoaXMuX3Njb3BlKShkb25lKTtcbiAgICAgICAgICB9O1xuICAgICAgICB9XG4gICAgICB9LFxuXG4gICAgICBfZW5hYmxlQmFja0J1dHRvbkhhbmRsZXI6IGZ1bmN0aW9uKCkge1xuICAgICAgICB0aGlzLl91c2VyQmFja0J1dHRvbkhhbmRsZXIgPSBhbmd1bGFyLm5vb3A7XG4gICAgICAgIHRoaXMuX2VsZW1lbnRbMF0ub25EZXZpY2VCYWNrQnV0dG9uID0gdGhpcy5fb25EZXZpY2VCYWNrQnV0dG9uLmJpbmQodGhpcyk7XG4gICAgICB9LFxuXG4gICAgICBfb25EZXZpY2VCYWNrQnV0dG9uOiBmdW5jdGlvbigkZXZlbnQpIHtcbiAgICAgICAgdGhpcy5fdXNlckJhY2tCdXR0b25IYW5kbGVyKCRldmVudCk7XG5cbiAgICAgICAgLy8gbmctZGV2aWNlLWJhY2tidXR0b25cbiAgICAgICAgaWYgKHRoaXMuX2F0dHJzLm5nRGV2aWNlQmFja0J1dHRvbikge1xuICAgICAgICAgICRwYXJzZSh0aGlzLl9hdHRycy5uZ0RldmljZUJhY2tCdXR0b24pKHRoaXMuX3Njb3BlLCB7JGV2ZW50OiAkZXZlbnR9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIG9uLWRldmljZS1iYWNrYnV0dG9uXG4gICAgICAgIC8qIGpzaGludCBpZ25vcmU6c3RhcnQgKi9cbiAgICAgICAgaWYgKHRoaXMuX2F0dHJzLm9uRGV2aWNlQmFja0J1dHRvbikge1xuICAgICAgICAgIHZhciBsYXN0RXZlbnQgPSB3aW5kb3cuJGV2ZW50O1xuICAgICAgICAgIHdpbmRvdy4kZXZlbnQgPSAkZXZlbnQ7XG4gICAgICAgICAgbmV3IEZ1bmN0aW9uKHRoaXMuX2F0dHJzLm9uRGV2aWNlQmFja0J1dHRvbikoKTsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby1uZXctZnVuY1xuICAgICAgICAgIHdpbmRvdy4kZXZlbnQgPSBsYXN0RXZlbnQ7XG4gICAgICAgIH1cbiAgICAgICAgLyoganNoaW50IGlnbm9yZTplbmQgKi9cbiAgICAgIH0sXG5cbiAgICAgIF9kZXN0cm95OiBmdW5jdGlvbigpIHtcbiAgICAgICAgdGhpcy5fY2xlYXJEZXJpdmluZ0V2ZW50cygpO1xuXG4gICAgICAgIHRoaXMuX2VsZW1lbnQgPSBudWxsO1xuICAgICAgICB0aGlzLl9zY29wZSA9IG51bGw7XG5cbiAgICAgICAgdGhpcy5fY2xlYXJMaXN0ZW5lcigpO1xuICAgICAgfVxuICAgIH0pO1xuICAgIE1pY3JvRXZlbnQubWl4aW4oUGFnZVZpZXcpO1xuXG4gICAgcmV0dXJuIFBhZ2VWaWV3O1xuICB9KTtcbn0pKCk7XG5cbiIsIi8qXG5Db3B5cmlnaHQgMjAxMy0yMDE1IEFTSUFMIENPUlBPUkFUSU9OXG5cbkxpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG55b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG5Zb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcblxuICAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG5cblVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbmRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbldJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxubGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG5cbiovXG5cbihmdW5jdGlvbigpe1xuICAndXNlIHN0cmljdCc7XG5cbiAgYW5ndWxhci5tb2R1bGUoJ29uc2VuJykuZmFjdG9yeSgnUG9wb3ZlclZpZXcnLCBmdW5jdGlvbigkb25zZW4pIHtcblxuICAgIHZhciBQb3BvdmVyVmlldyA9IENsYXNzLmV4dGVuZCh7XG5cbiAgICAgIC8qKlxuICAgICAgICogQHBhcmFtIHtPYmplY3R9IHNjb3BlXG4gICAgICAgKiBAcGFyYW0ge2pxTGl0ZX0gZWxlbWVudFxuICAgICAgICogQHBhcmFtIHtPYmplY3R9IGF0dHJzXG4gICAgICAgKi9cbiAgICAgIGluaXQ6IGZ1bmN0aW9uKHNjb3BlLCBlbGVtZW50LCBhdHRycykge1xuICAgICAgICB0aGlzLl9lbGVtZW50ID0gZWxlbWVudDtcbiAgICAgICAgdGhpcy5fc2NvcGUgPSBzY29wZTtcbiAgICAgICAgdGhpcy5fYXR0cnMgPSBhdHRycztcblxuICAgICAgICB0aGlzLl9zY29wZS4kb24oJyRkZXN0cm95JywgdGhpcy5fZGVzdHJveS5iaW5kKHRoaXMpKTtcblxuICAgICAgICB0aGlzLl9jbGVhckRlcml2aW5nTWV0aG9kcyA9ICRvbnNlbi5kZXJpdmVNZXRob2RzKHRoaXMsIHRoaXMuX2VsZW1lbnRbMF0sIFtcbiAgICAgICAgICAnc2hvdycsICdoaWRlJ1xuICAgICAgICBdKTtcblxuICAgICAgICB0aGlzLl9jbGVhckRlcml2aW5nRXZlbnRzID0gJG9uc2VuLmRlcml2ZUV2ZW50cyh0aGlzLCB0aGlzLl9lbGVtZW50WzBdLCBbXG4gICAgICAgICAgJ3ByZXNob3cnLFxuICAgICAgICAgICdwb3N0c2hvdycsXG4gICAgICAgICAgJ3ByZWhpZGUnLFxuICAgICAgICAgICdwb3N0aGlkZSdcbiAgICAgICAgXSwgZnVuY3Rpb24oZGV0YWlsKSB7XG4gICAgICAgICAgaWYgKGRldGFpbC5wb3BvdmVyKSB7XG4gICAgICAgICAgICBkZXRhaWwucG9wb3ZlciA9IHRoaXM7XG4gICAgICAgICAgfVxuICAgICAgICAgIHJldHVybiBkZXRhaWw7XG4gICAgICAgIH0uYmluZCh0aGlzKSk7XG4gICAgICB9LFxuXG4gICAgICBfZGVzdHJveTogZnVuY3Rpb24oKSB7XG4gICAgICAgIHRoaXMuZW1pdCgnZGVzdHJveScpO1xuXG4gICAgICAgIHRoaXMuX2NsZWFyRGVyaXZpbmdNZXRob2RzKCk7XG4gICAgICAgIHRoaXMuX2NsZWFyRGVyaXZpbmdFdmVudHMoKTtcblxuICAgICAgICB0aGlzLl9lbGVtZW50LnJlbW92ZSgpO1xuXG4gICAgICAgIHRoaXMuX2VsZW1lbnQgPSB0aGlzLl9zY29wZSA9IG51bGw7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICBNaWNyb0V2ZW50Lm1peGluKFBvcG92ZXJWaWV3KTtcbiAgICAkb25zZW4uZGVyaXZlUHJvcGVydGllc0Zyb21FbGVtZW50KFBvcG92ZXJWaWV3LCBbJ2NhbmNlbGFibGUnLCAnZGlzYWJsZWQnLCAnb25EZXZpY2VCYWNrQnV0dG9uJ10pO1xuXG5cbiAgICByZXR1cm4gUG9wb3ZlclZpZXc7XG4gIH0pO1xufSkoKTtcbiIsIi8qXG5Db3B5cmlnaHQgMjAxMy0yMDE1IEFTSUFMIENPUlBPUkFUSU9OXG5cbkxpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG55b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG5Zb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcblxuICAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG5cblVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbmRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbldJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxubGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG5cbiovXG5cbihmdW5jdGlvbigpe1xuICAndXNlIHN0cmljdCc7XG4gIHZhciBtb2R1bGUgPSBhbmd1bGFyLm1vZHVsZSgnb25zZW4nKTtcblxuICBtb2R1bGUuZmFjdG9yeSgnUHVsbEhvb2tWaWV3JywgZnVuY3Rpb24oJG9uc2VuLCAkcGFyc2UpIHtcblxuICAgIHZhciBQdWxsSG9va1ZpZXcgPSBDbGFzcy5leHRlbmQoe1xuXG4gICAgICBpbml0OiBmdW5jdGlvbihzY29wZSwgZWxlbWVudCwgYXR0cnMpIHtcbiAgICAgICAgdGhpcy5fZWxlbWVudCA9IGVsZW1lbnQ7XG4gICAgICAgIHRoaXMuX3Njb3BlID0gc2NvcGU7XG4gICAgICAgIHRoaXMuX2F0dHJzID0gYXR0cnM7XG5cbiAgICAgICAgdGhpcy5fY2xlYXJEZXJpdmluZ0V2ZW50cyA9ICRvbnNlbi5kZXJpdmVFdmVudHModGhpcywgdGhpcy5fZWxlbWVudFswXSwgW1xuICAgICAgICAgICdjaGFuZ2VzdGF0ZScsXG4gICAgICAgIF0sIGRldGFpbCA9PiB7XG4gICAgICAgICAgaWYgKGRldGFpbC5wdWxsSG9vaykge1xuICAgICAgICAgICAgZGV0YWlsLnB1bGxIb29rID0gdGhpcztcbiAgICAgICAgICB9XG4gICAgICAgICAgcmV0dXJuIGRldGFpbDtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgdGhpcy5vbignY2hhbmdlc3RhdGUnLCAoKSA9PiB0aGlzLl9zY29wZS4kZXZhbEFzeW5jKCkpO1xuXG4gICAgICAgIHRoaXMuX2VsZW1lbnRbMF0ub25BY3Rpb24gPSBkb25lID0+IHtcbiAgICAgICAgICBpZiAodGhpcy5fYXR0cnMubmdBY3Rpb24pIHtcbiAgICAgICAgICAgIHRoaXMuX3Njb3BlLiRldmFsKHRoaXMuX2F0dHJzLm5nQWN0aW9uLCB7JGRvbmU6IGRvbmV9KTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5vbkFjdGlvbiA/IHRoaXMub25BY3Rpb24oZG9uZSkgOiBkb25lKCk7XG4gICAgICAgICAgfVxuICAgICAgICB9O1xuXG4gICAgICAgIHRoaXMuX3Njb3BlLiRvbignJGRlc3Ryb3knLCB0aGlzLl9kZXN0cm95LmJpbmQodGhpcykpO1xuICAgICAgfSxcblxuICAgICAgX2Rlc3Ryb3k6IGZ1bmN0aW9uKCkge1xuICAgICAgICB0aGlzLmVtaXQoJ2Rlc3Ryb3knKTtcblxuICAgICAgICB0aGlzLl9jbGVhckRlcml2aW5nRXZlbnRzKCk7XG5cbiAgICAgICAgdGhpcy5fZWxlbWVudCA9IHRoaXMuX3Njb3BlID0gdGhpcy5fYXR0cnMgPSBudWxsO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgTWljcm9FdmVudC5taXhpbihQdWxsSG9va1ZpZXcpO1xuICAgICRvbnNlbi5kZXJpdmVQcm9wZXJ0aWVzRnJvbUVsZW1lbnQoUHVsbEhvb2tWaWV3LCBbJ3N0YXRlJywgJ3B1bGxEaXN0YW5jZScsICdoZWlnaHQnLCAndGhyZXNob2xkSGVpZ2h0JywgJ2Rpc2FibGVkJ10pO1xuXG4gICAgcmV0dXJuIFB1bGxIb29rVmlldztcbiAgfSk7XG59KSgpO1xuIiwiLypcbkNvcHlyaWdodCAyMDEzLTIwMTUgQVNJQUwgQ09SUE9SQVRJT05cblxuTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbnlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbllvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuXG4gICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcblxuVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG5TZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG5saW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cblxuKi9cblxuKGZ1bmN0aW9uKCkge1xuICAndXNlIHN0cmljdCc7XG5cbiAgdmFyIG1vZHVsZSA9IGFuZ3VsYXIubW9kdWxlKCdvbnNlbicpO1xuXG4gIG1vZHVsZS5mYWN0b3J5KCdTcGVlZERpYWxWaWV3JywgZnVuY3Rpb24oJG9uc2VuKSB7XG5cbiAgICAvKipcbiAgICAgKiBAY2xhc3MgU3BlZWREaWFsVmlld1xuICAgICAqL1xuICAgIHZhciBTcGVlZERpYWxWaWV3ID0gQ2xhc3MuZXh0ZW5kKHtcblxuICAgICAgLyoqXG4gICAgICAgKiBAcGFyYW0ge09iamVjdH0gc2NvcGVcbiAgICAgICAqIEBwYXJhbSB7anFMaXRlfSBlbGVtZW50XG4gICAgICAgKiBAcGFyYW0ge09iamVjdH0gYXR0cnNcbiAgICAgICAqL1xuICAgICAgaW5pdDogZnVuY3Rpb24oc2NvcGUsIGVsZW1lbnQsIGF0dHJzKSB7XG4gICAgICAgIHRoaXMuX2VsZW1lbnQgPSBlbGVtZW50O1xuICAgICAgICB0aGlzLl9zY29wZSA9IHNjb3BlO1xuICAgICAgICB0aGlzLl9hdHRycyA9IGF0dHJzO1xuXG4gICAgICAgIHRoaXMuX3Njb3BlLiRvbignJGRlc3Ryb3knLCB0aGlzLl9kZXN0cm95LmJpbmQodGhpcykpO1xuXG4gICAgICAgIHRoaXMuX2NsZWFyRGVyaXZpbmdNZXRob2RzID0gJG9uc2VuLmRlcml2ZU1ldGhvZHModGhpcywgZWxlbWVudFswXSwgW1xuICAgICAgICAgICdzaG93JywgJ2hpZGUnLCAnc2hvd0l0ZW1zJywgJ2hpZGVJdGVtcycsICdpc09wZW4nLCAndG9nZ2xlJywgJ3RvZ2dsZUl0ZW1zJ1xuICAgICAgICBdKTtcblxuICAgICAgICB0aGlzLl9jbGVhckRlcml2aW5nRXZlbnRzID0gJG9uc2VuLmRlcml2ZUV2ZW50cyh0aGlzLCBlbGVtZW50WzBdLCBbJ29wZW4nLCAnY2xvc2UnXSkuYmluZCh0aGlzKTtcbiAgICAgIH0sXG5cbiAgICAgIF9kZXN0cm95OiBmdW5jdGlvbigpIHtcbiAgICAgICAgdGhpcy5lbWl0KCdkZXN0cm95Jyk7XG5cbiAgICAgICAgdGhpcy5fY2xlYXJEZXJpdmluZ0V2ZW50cygpO1xuICAgICAgICB0aGlzLl9jbGVhckRlcml2aW5nTWV0aG9kcygpO1xuXG4gICAgICAgIHRoaXMuX2VsZW1lbnQgPSB0aGlzLl9zY29wZSA9IHRoaXMuX2F0dHJzID0gbnVsbDtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIE1pY3JvRXZlbnQubWl4aW4oU3BlZWREaWFsVmlldyk7XG5cbiAgICAkb25zZW4uZGVyaXZlUHJvcGVydGllc0Zyb21FbGVtZW50KFNwZWVkRGlhbFZpZXcsIFtcbiAgICAgICdkaXNhYmxlZCcsICd2aXNpYmxlJywgJ2lubGluZSdcbiAgICBdKTtcblxuICAgIHJldHVybiBTcGVlZERpYWxWaWV3O1xuICB9KTtcbn0pKCk7XG4iLCIvKlxuQ29weXJpZ2h0IDIwMTMtMjAxNSBBU0lBTCBDT1JQT1JBVElPTlxuXG5MaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xueW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG5cbiAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuXG5Vbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG5kaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG5XSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cblNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbmxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuXG4qL1xuKGZ1bmN0aW9uKCkge1xuICAndXNlIHN0cmljdCc7XG5cbiAgYW5ndWxhci5tb2R1bGUoJ29uc2VuJykuZmFjdG9yeSgnU3BsaXR0ZXJDb250ZW50JywgZnVuY3Rpb24oJG9uc2VuLCAkY29tcGlsZSkge1xuXG4gICAgdmFyIFNwbGl0dGVyQ29udGVudCA9IENsYXNzLmV4dGVuZCh7XG5cbiAgICAgIGluaXQ6IGZ1bmN0aW9uKHNjb3BlLCBlbGVtZW50LCBhdHRycykge1xuICAgICAgICB0aGlzLl9lbGVtZW50ID0gZWxlbWVudDtcbiAgICAgICAgdGhpcy5fc2NvcGUgPSBzY29wZTtcbiAgICAgICAgdGhpcy5fYXR0cnMgPSBhdHRycztcblxuICAgICAgICB0aGlzLmxvYWQgPSB0aGlzLl9lbGVtZW50WzBdLmxvYWQuYmluZCh0aGlzLl9lbGVtZW50WzBdKTtcbiAgICAgICAgc2NvcGUuJG9uKCckZGVzdHJveScsIHRoaXMuX2Rlc3Ryb3kuYmluZCh0aGlzKSk7XG4gICAgICB9LFxuXG4gICAgICBfZGVzdHJveTogZnVuY3Rpb24oKSB7XG4gICAgICAgIHRoaXMuZW1pdCgnZGVzdHJveScpO1xuICAgICAgICB0aGlzLl9lbGVtZW50ID0gdGhpcy5fc2NvcGUgPSB0aGlzLl9hdHRycyA9IHRoaXMubG9hZCA9IHRoaXMuX3BhZ2VTY29wZSA9IG51bGw7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICBNaWNyb0V2ZW50Lm1peGluKFNwbGl0dGVyQ29udGVudCk7XG4gICAgJG9uc2VuLmRlcml2ZVByb3BlcnRpZXNGcm9tRWxlbWVudChTcGxpdHRlckNvbnRlbnQsIFsncGFnZSddKTtcblxuICAgIHJldHVybiBTcGxpdHRlckNvbnRlbnQ7XG4gIH0pO1xufSkoKTtcbiIsIi8qXG5Db3B5cmlnaHQgMjAxMy0yMDE1IEFTSUFMIENPUlBPUkFUSU9OXG5cbkxpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG55b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG5Zb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcblxuICAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG5cblVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbmRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbldJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxubGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG5cbiovXG4oZnVuY3Rpb24oKSB7XG4gICd1c2Ugc3RyaWN0JztcblxuICBhbmd1bGFyLm1vZHVsZSgnb25zZW4nKS5mYWN0b3J5KCdTcGxpdHRlclNpZGUnLCBmdW5jdGlvbigkb25zZW4sICRjb21waWxlKSB7XG5cbiAgICB2YXIgU3BsaXR0ZXJTaWRlID0gQ2xhc3MuZXh0ZW5kKHtcblxuICAgICAgaW5pdDogZnVuY3Rpb24oc2NvcGUsIGVsZW1lbnQsIGF0dHJzKSB7XG4gICAgICAgIHRoaXMuX2VsZW1lbnQgPSBlbGVtZW50O1xuICAgICAgICB0aGlzLl9zY29wZSA9IHNjb3BlO1xuICAgICAgICB0aGlzLl9hdHRycyA9IGF0dHJzO1xuXG4gICAgICAgIHRoaXMuX2NsZWFyRGVyaXZpbmdNZXRob2RzID0gJG9uc2VuLmRlcml2ZU1ldGhvZHModGhpcywgdGhpcy5fZWxlbWVudFswXSwgW1xuICAgICAgICAgICdvcGVuJywgJ2Nsb3NlJywgJ3RvZ2dsZScsICdsb2FkJ1xuICAgICAgICBdKTtcblxuICAgICAgICB0aGlzLl9jbGVhckRlcml2aW5nRXZlbnRzID0gJG9uc2VuLmRlcml2ZUV2ZW50cyh0aGlzLCBlbGVtZW50WzBdLCBbXG4gICAgICAgICAgJ21vZGVjaGFuZ2UnLCAncHJlb3BlbicsICdwcmVjbG9zZScsICdwb3N0b3BlbicsICdwb3N0Y2xvc2UnXG4gICAgICAgIF0sIGRldGFpbCA9PiBkZXRhaWwuc2lkZSA/IGFuZ3VsYXIuZXh0ZW5kKGRldGFpbCwge3NpZGU6IHRoaXN9KSA6IGRldGFpbCk7XG5cbiAgICAgICAgc2NvcGUuJG9uKCckZGVzdHJveScsIHRoaXMuX2Rlc3Ryb3kuYmluZCh0aGlzKSk7XG4gICAgICB9LFxuXG4gICAgICBfZGVzdHJveTogZnVuY3Rpb24oKSB7XG4gICAgICAgIHRoaXMuZW1pdCgnZGVzdHJveScpO1xuXG4gICAgICAgIHRoaXMuX2NsZWFyRGVyaXZpbmdNZXRob2RzKCk7XG4gICAgICAgIHRoaXMuX2NsZWFyRGVyaXZpbmdFdmVudHMoKTtcblxuICAgICAgICB0aGlzLl9lbGVtZW50ID0gdGhpcy5fc2NvcGUgPSB0aGlzLl9hdHRycyA9IG51bGw7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICBNaWNyb0V2ZW50Lm1peGluKFNwbGl0dGVyU2lkZSk7XG4gICAgJG9uc2VuLmRlcml2ZVByb3BlcnRpZXNGcm9tRWxlbWVudChTcGxpdHRlclNpZGUsIFsncGFnZScsICdtb2RlJywgJ2lzT3BlbiddKTtcblxuICAgIHJldHVybiBTcGxpdHRlclNpZGU7XG4gIH0pO1xufSkoKTtcbiIsIi8qXG5Db3B5cmlnaHQgMjAxMy0yMDE1IEFTSUFMIENPUlBPUkFUSU9OXG5cbkxpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG55b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG5Zb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcblxuICAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG5cblVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbmRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbldJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxubGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG5cbiovXG4oZnVuY3Rpb24oKSB7XG4gICd1c2Ugc3RyaWN0JztcblxuICBhbmd1bGFyLm1vZHVsZSgnb25zZW4nKS5mYWN0b3J5KCdTcGxpdHRlcicsIGZ1bmN0aW9uKCRvbnNlbikge1xuXG4gICAgdmFyIFNwbGl0dGVyID0gQ2xhc3MuZXh0ZW5kKHtcbiAgICAgIGluaXQ6IGZ1bmN0aW9uKHNjb3BlLCBlbGVtZW50LCBhdHRycykge1xuICAgICAgICB0aGlzLl9lbGVtZW50ID0gZWxlbWVudDtcbiAgICAgICAgdGhpcy5fc2NvcGUgPSBzY29wZTtcbiAgICAgICAgdGhpcy5fYXR0cnMgPSBhdHRycztcbiAgICAgICAgc2NvcGUuJG9uKCckZGVzdHJveScsIHRoaXMuX2Rlc3Ryb3kuYmluZCh0aGlzKSk7XG4gICAgICB9LFxuXG4gICAgICBfZGVzdHJveTogZnVuY3Rpb24oKSB7XG4gICAgICAgIHRoaXMuZW1pdCgnZGVzdHJveScpO1xuICAgICAgICB0aGlzLl9lbGVtZW50ID0gdGhpcy5fc2NvcGUgPSB0aGlzLl9hdHRycyA9IG51bGw7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICBNaWNyb0V2ZW50Lm1peGluKFNwbGl0dGVyKTtcbiAgICAkb25zZW4uZGVyaXZlUHJvcGVydGllc0Zyb21FbGVtZW50KFNwbGl0dGVyLCBbJ29uRGV2aWNlQmFja0J1dHRvbiddKTtcblxuICAgIFsnbGVmdCcsICdyaWdodCcsICdjb250ZW50JywgJ21hc2snXS5mb3JFYWNoKChwcm9wLCBpKSA9PiB7XG4gICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoU3BsaXR0ZXIucHJvdG90eXBlLCBwcm9wLCB7XG4gICAgICAgIGdldDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgIHZhciB0YWdOYW1lID0gYG9ucy1zcGxpdHRlci0ke2kgPCAyID8gJ3NpZGUnIDogcHJvcH1gO1xuICAgICAgICAgIHJldHVybiBhbmd1bGFyLmVsZW1lbnQodGhpcy5fZWxlbWVudFswXVtwcm9wXSkuZGF0YSh0YWdOYW1lKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICByZXR1cm4gU3BsaXR0ZXI7XG4gIH0pO1xufSkoKTtcbiIsIi8qXG5Db3B5cmlnaHQgMjAxMy0yMDE1IEFTSUFMIENPUlBPUkFUSU9OXG5cbkxpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG55b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG5Zb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcblxuICAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG5cblVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbmRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbldJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxubGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG5cbiovXG5cbihmdW5jdGlvbigpe1xuICAndXNlIHN0cmljdCc7XG5cbiAgYW5ndWxhci5tb2R1bGUoJ29uc2VuJykuZmFjdG9yeSgnU3dpdGNoVmlldycsIGZ1bmN0aW9uKCRwYXJzZSwgJG9uc2VuKSB7XG5cbiAgICB2YXIgU3dpdGNoVmlldyA9IENsYXNzLmV4dGVuZCh7XG5cbiAgICAgIC8qKlxuICAgICAgICogQHBhcmFtIHtqcUxpdGV9IGVsZW1lbnRcbiAgICAgICAqIEBwYXJhbSB7T2JqZWN0fSBzY29wZVxuICAgICAgICogQHBhcmFtIHtPYmplY3R9IGF0dHJzXG4gICAgICAgKi9cbiAgICAgIGluaXQ6IGZ1bmN0aW9uKGVsZW1lbnQsIHNjb3BlLCBhdHRycykge1xuICAgICAgICB0aGlzLl9lbGVtZW50ID0gZWxlbWVudDtcbiAgICAgICAgdGhpcy5fY2hlY2tib3ggPSBhbmd1bGFyLmVsZW1lbnQoZWxlbWVudFswXS5xdWVyeVNlbGVjdG9yKCdpbnB1dFt0eXBlPWNoZWNrYm94XScpKTtcbiAgICAgICAgdGhpcy5fc2NvcGUgPSBzY29wZTtcblxuICAgICAgICB0aGlzLl9wcmVwYXJlTmdNb2RlbChlbGVtZW50LCBzY29wZSwgYXR0cnMpO1xuXG4gICAgICAgIHRoaXMuX3Njb3BlLiRvbignJGRlc3Ryb3knLCAoKSA9PiB7XG4gICAgICAgICAgdGhpcy5lbWl0KCdkZXN0cm95Jyk7XG4gICAgICAgICAgdGhpcy5fZWxlbWVudCA9IHRoaXMuX2NoZWNrYm94ID0gdGhpcy5fc2NvcGUgPSBudWxsO1xuICAgICAgICB9KTtcbiAgICAgIH0sXG5cbiAgICAgIF9wcmVwYXJlTmdNb2RlbDogZnVuY3Rpb24oZWxlbWVudCwgc2NvcGUsIGF0dHJzKSB7XG4gICAgICAgIGlmIChhdHRycy5uZ01vZGVsKSB7XG4gICAgICAgICAgdmFyIHNldCA9ICRwYXJzZShhdHRycy5uZ01vZGVsKS5hc3NpZ247XG5cbiAgICAgICAgICBzY29wZS4kcGFyZW50LiR3YXRjaChhdHRycy5uZ01vZGVsLCB2YWx1ZSA9PiB7XG4gICAgICAgICAgICB0aGlzLmNoZWNrZWQgPSAhIXZhbHVlO1xuICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgdGhpcy5fZWxlbWVudC5vbignY2hhbmdlJywgZSA9PiB7XG4gICAgICAgICAgICBzZXQoc2NvcGUuJHBhcmVudCwgdGhpcy5jaGVja2VkKTtcblxuICAgICAgICAgICAgaWYgKGF0dHJzLm5nQ2hhbmdlKSB7XG4gICAgICAgICAgICAgIHNjb3BlLiRldmFsKGF0dHJzLm5nQ2hhbmdlKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgc2NvcGUuJHBhcmVudC4kZXZhbEFzeW5jKCk7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9KTtcblxuICAgIE1pY3JvRXZlbnQubWl4aW4oU3dpdGNoVmlldyk7XG4gICAgJG9uc2VuLmRlcml2ZVByb3BlcnRpZXNGcm9tRWxlbWVudChTd2l0Y2hWaWV3LCBbJ2Rpc2FibGVkJywgJ2NoZWNrZWQnLCAnY2hlY2tib3gnXSk7XG5cbiAgICByZXR1cm4gU3dpdGNoVmlldztcbiAgfSk7XG59KSgpO1xuIiwiLypcbkNvcHlyaWdodCAyMDEzLTIwMTUgQVNJQUwgQ09SUE9SQVRJT05cblxuTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbnlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbllvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuXG4gICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcblxuVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG5TZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG5saW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cblxuKi9cblxuKGZ1bmN0aW9uKCkge1xuICAndXNlIHN0cmljdCc7XG5cbiAgdmFyIG1vZHVsZSA9IGFuZ3VsYXIubW9kdWxlKCdvbnNlbicpO1xuXG4gIG1vZHVsZS5mYWN0b3J5KCdUYWJiYXJWaWV3JywgZnVuY3Rpb24oJG9uc2VuKSB7XG4gICAgdmFyIFRhYmJhclZpZXcgPSBDbGFzcy5leHRlbmQoe1xuXG4gICAgICBpbml0OiBmdW5jdGlvbihzY29wZSwgZWxlbWVudCwgYXR0cnMpIHtcbiAgICAgICAgaWYgKGVsZW1lbnRbMF0ubm9kZU5hbWUudG9Mb3dlckNhc2UoKSAhPT0gJ29ucy10YWJiYXInKSB7XG4gICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdcImVsZW1lbnRcIiBwYXJhbWV0ZXIgbXVzdCBiZSBhIFwib25zLXRhYmJhclwiIGVsZW1lbnQuJyk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLl9zY29wZSA9IHNjb3BlO1xuICAgICAgICB0aGlzLl9lbGVtZW50ID0gZWxlbWVudDtcbiAgICAgICAgdGhpcy5fYXR0cnMgPSBhdHRycztcblxuICAgICAgICB0aGlzLl9zY29wZS4kb24oJyRkZXN0cm95JywgdGhpcy5fZGVzdHJveS5iaW5kKHRoaXMpKTtcblxuICAgICAgICB0aGlzLl9jbGVhckRlcml2aW5nRXZlbnRzID0gJG9uc2VuLmRlcml2ZUV2ZW50cyh0aGlzLCBlbGVtZW50WzBdLCBbXG4gICAgICAgICAgJ3JlYWN0aXZlJywgJ3Bvc3RjaGFuZ2UnLCAncHJlY2hhbmdlJywgJ2luaXQnLCAnc2hvdycsICdoaWRlJywgJ2Rlc3Ryb3knXG4gICAgICAgIF0pO1xuXG4gICAgICAgIHRoaXMuX2NsZWFyRGVyaXZpbmdNZXRob2RzID0gJG9uc2VuLmRlcml2ZU1ldGhvZHModGhpcywgZWxlbWVudFswXSwgW1xuICAgICAgICAgICdzZXRBY3RpdmVUYWInLFxuICAgICAgICAgICdzaG93JyxcbiAgICAgICAgICAnaGlkZScsXG4gICAgICAgICAgJ3NldFRhYmJhclZpc2liaWxpdHknLFxuICAgICAgICAgICdnZXRBY3RpdmVUYWJJbmRleCcsXG4gICAgICAgIF0pO1xuICAgICAgfSxcblxuICAgICAgX2Rlc3Ryb3k6IGZ1bmN0aW9uKCkge1xuICAgICAgICB0aGlzLmVtaXQoJ2Rlc3Ryb3knKTtcblxuICAgICAgICB0aGlzLl9jbGVhckRlcml2aW5nRXZlbnRzKCk7XG4gICAgICAgIHRoaXMuX2NsZWFyRGVyaXZpbmdNZXRob2RzKCk7XG5cbiAgICAgICAgdGhpcy5fZWxlbWVudCA9IHRoaXMuX3Njb3BlID0gdGhpcy5fYXR0cnMgPSBudWxsO1xuICAgICAgfVxuICAgIH0pO1xuICAgIE1pY3JvRXZlbnQubWl4aW4oVGFiYmFyVmlldyk7XG5cbiAgICByZXR1cm4gVGFiYmFyVmlldztcbiAgfSk7XG5cbn0pKCk7XG4iLCIvKlxuQ29weXJpZ2h0IDIwMTMtMjAxNSBBU0lBTCBDT1JQT1JBVElPTlxuXG5MaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xueW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG5cbiAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuXG5Vbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG5kaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG5XSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cblNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbmxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuXG4qL1xuXG4oZnVuY3Rpb24oKSB7XG4gICd1c2Ugc3RyaWN0JztcblxuICB2YXIgbW9kdWxlID0gYW5ndWxhci5tb2R1bGUoJ29uc2VuJyk7XG5cbiAgbW9kdWxlLmZhY3RvcnkoJ1RvYXN0VmlldycsIGZ1bmN0aW9uKCRvbnNlbikge1xuXG4gICAgdmFyIFRvYXN0VmlldyA9IENsYXNzLmV4dGVuZCh7XG5cbiAgICAgIC8qKlxuICAgICAgICogQHBhcmFtIHtPYmplY3R9IHNjb3BlXG4gICAgICAgKiBAcGFyYW0ge2pxTGl0ZX0gZWxlbWVudFxuICAgICAgICogQHBhcmFtIHtPYmplY3R9IGF0dHJzXG4gICAgICAgKi9cbiAgICAgIGluaXQ6IGZ1bmN0aW9uKHNjb3BlLCBlbGVtZW50LCBhdHRycykge1xuICAgICAgICB0aGlzLl9zY29wZSA9IHNjb3BlO1xuICAgICAgICB0aGlzLl9lbGVtZW50ID0gZWxlbWVudDtcbiAgICAgICAgdGhpcy5fYXR0cnMgPSBhdHRycztcblxuICAgICAgICB0aGlzLl9jbGVhckRlcml2aW5nTWV0aG9kcyA9ICRvbnNlbi5kZXJpdmVNZXRob2RzKHRoaXMsIHRoaXMuX2VsZW1lbnRbMF0sIFtcbiAgICAgICAgICAnc2hvdycsICdoaWRlJywgJ3RvZ2dsZSdcbiAgICAgICAgXSk7XG5cbiAgICAgICAgdGhpcy5fY2xlYXJEZXJpdmluZ0V2ZW50cyA9ICRvbnNlbi5kZXJpdmVFdmVudHModGhpcywgdGhpcy5fZWxlbWVudFswXSwgW1xuICAgICAgICAgICdwcmVzaG93JyxcbiAgICAgICAgICAncG9zdHNob3cnLFxuICAgICAgICAgICdwcmVoaWRlJyxcbiAgICAgICAgICAncG9zdGhpZGUnXG4gICAgICAgIF0sIGZ1bmN0aW9uKGRldGFpbCkge1xuICAgICAgICAgIGlmIChkZXRhaWwudG9hc3QpIHtcbiAgICAgICAgICAgIGRldGFpbC50b2FzdCA9IHRoaXM7XG4gICAgICAgICAgfVxuICAgICAgICAgIHJldHVybiBkZXRhaWw7XG4gICAgICAgIH0uYmluZCh0aGlzKSk7XG5cbiAgICAgICAgdGhpcy5fc2NvcGUuJG9uKCckZGVzdHJveScsIHRoaXMuX2Rlc3Ryb3kuYmluZCh0aGlzKSk7XG4gICAgICB9LFxuXG4gICAgICBfZGVzdHJveTogZnVuY3Rpb24oKSB7XG4gICAgICAgIHRoaXMuZW1pdCgnZGVzdHJveScpO1xuXG4gICAgICAgIHRoaXMuX2VsZW1lbnQucmVtb3ZlKCk7XG5cbiAgICAgICAgdGhpcy5fY2xlYXJEZXJpdmluZ01ldGhvZHMoKTtcbiAgICAgICAgdGhpcy5fY2xlYXJEZXJpdmluZ0V2ZW50cygpO1xuXG4gICAgICAgIHRoaXMuX3Njb3BlID0gdGhpcy5fYXR0cnMgPSB0aGlzLl9lbGVtZW50ID0gbnVsbDtcbiAgICAgIH1cblxuICAgIH0pO1xuXG4gICAgTWljcm9FdmVudC5taXhpbihUb2FzdFZpZXcpO1xuICAgICRvbnNlbi5kZXJpdmVQcm9wZXJ0aWVzRnJvbUVsZW1lbnQoVG9hc3RWaWV3LCBbJ3Zpc2libGUnLCAnb25EZXZpY2VCYWNrQnV0dG9uJ10pO1xuXG4gICAgcmV0dXJuIFRvYXN0VmlldztcbiAgfSk7XG59KSgpO1xuIiwiKGZ1bmN0aW9uKCkge1xuICAndXNlIHN0cmljdCc7XG5cbiAgYW5ndWxhci5tb2R1bGUoJ29uc2VuJykuZGlyZWN0aXZlKCdvbnNBY3Rpb25TaGVldEJ1dHRvbicsIGZ1bmN0aW9uKCRvbnNlbiwgR2VuZXJpY1ZpZXcpIHtcbiAgICByZXR1cm4ge1xuICAgICAgcmVzdHJpY3Q6ICdFJyxcbiAgICAgIGxpbms6IGZ1bmN0aW9uKHNjb3BlLCBlbGVtZW50LCBhdHRycykge1xuICAgICAgICBHZW5lcmljVmlldy5yZWdpc3RlcihzY29wZSwgZWxlbWVudCwgYXR0cnMsIHt2aWV3S2V5OiAnb25zLWFjdGlvbi1zaGVldC1idXR0b24nfSk7XG4gICAgICAgICRvbnNlbi5maXJlQ29tcG9uZW50RXZlbnQoZWxlbWVudFswXSwgJ2luaXQnKTtcbiAgICAgIH1cbiAgICB9O1xuICB9KTtcblxufSkoKTtcbiIsIi8qKlxuICogQGVsZW1lbnQgb25zLWFjdGlvbi1zaGVldFxuICovXG5cbi8qKlxuICogQGF0dHJpYnV0ZSB2YXJcbiAqIEBpbml0b25seVxuICogQHR5cGUge1N0cmluZ31cbiAqIEBkZXNjcmlwdGlvblxuICogIFtlbl1WYXJpYWJsZSBuYW1lIHRvIHJlZmVyIHRoaXMgYWN0aW9uIHNoZWV0LlsvZW5dXG4gKiAgW2phXeOBk+OBruOCouOCr+OCt+ODp+ODs+OCt+ODvOODiOOCkuWPgueFp+OBmeOCi+OBn+OCgeOBruWQjeWJjeOCkuaMh+WumuOBl+OBvuOBmeOAglsvamFdXG4gKi9cblxuLyoqXG4gKiBAYXR0cmlidXRlIG9ucy1wcmVzaG93XG4gKiBAaW5pdG9ubHlcbiAqIEB0eXBlIHtFeHByZXNzaW9ufVxuICogQGRlc2NyaXB0aW9uXG4gKiAgW2VuXUFsbG93cyB5b3UgdG8gc3BlY2lmeSBjdXN0b20gYmVoYXZpb3Igd2hlbiB0aGUgXCJwcmVzaG93XCIgZXZlbnQgaXMgZmlyZWQuWy9lbl1cbiAqICBbamFdXCJwcmVzaG93XCLjgqTjg5njg7Pjg4jjgYznmbrngavjgZXjgozjgZ/mmYLjga7mjJnli5XjgpLni6zoh6rjgavmjIflrprjgafjgY3jgb7jgZnjgIJbL2phXVxuICovXG5cbi8qKlxuICogQGF0dHJpYnV0ZSBvbnMtcHJlaGlkZVxuICogQGluaXRvbmx5XG4gKiBAdHlwZSB7RXhwcmVzc2lvbn1cbiAqIEBkZXNjcmlwdGlvblxuICogIFtlbl1BbGxvd3MgeW91IHRvIHNwZWNpZnkgY3VzdG9tIGJlaGF2aW9yIHdoZW4gdGhlIFwicHJlaGlkZVwiIGV2ZW50IGlzIGZpcmVkLlsvZW5dXG4gKiAgW2phXVwicHJlaGlkZVwi44Kk44OZ44Oz44OI44GM55m654Gr44GV44KM44Gf5pmC44Gu5oyZ5YuV44KS54us6Ieq44Gr5oyH5a6a44Gn44GN44G+44GZ44CCWy9qYV1cbiAqL1xuXG4vKipcbiAqIEBhdHRyaWJ1dGUgb25zLXBvc3RzaG93XG4gKiBAaW5pdG9ubHlcbiAqIEB0eXBlIHtFeHByZXNzaW9ufVxuICogQGRlc2NyaXB0aW9uXG4gKiAgW2VuXUFsbG93cyB5b3UgdG8gc3BlY2lmeSBjdXN0b20gYmVoYXZpb3Igd2hlbiB0aGUgXCJwb3N0c2hvd1wiIGV2ZW50IGlzIGZpcmVkLlsvZW5dXG4gKiAgW2phXVwicG9zdHNob3dcIuOCpOODmeODs+ODiOOBjOeZuueBq+OBleOCjOOBn+aZguOBruaMmeWLleOCkueLrOiHquOBq+aMh+WumuOBp+OBjeOBvuOBmeOAglsvamFdXG4gKi9cblxuLyoqXG4gKiBAYXR0cmlidXRlIG9ucy1wb3N0aGlkZVxuICogQGluaXRvbmx5XG4gKiBAdHlwZSB7RXhwcmVzc2lvbn1cbiAqIEBkZXNjcmlwdGlvblxuICogIFtlbl1BbGxvd3MgeW91IHRvIHNwZWNpZnkgY3VzdG9tIGJlaGF2aW9yIHdoZW4gdGhlIFwicG9zdGhpZGVcIiBldmVudCBpcyBmaXJlZC5bL2VuXVxuICogIFtqYV1cInBvc3RoaWRlXCLjgqTjg5njg7Pjg4jjgYznmbrngavjgZXjgozjgZ/mmYLjga7mjJnli5XjgpLni6zoh6rjgavmjIflrprjgafjgY3jgb7jgZnjgIJbL2phXVxuICovXG5cbi8qKlxuICogQGF0dHJpYnV0ZSBvbnMtZGVzdHJveVxuICogQGluaXRvbmx5XG4gKiBAdHlwZSB7RXhwcmVzc2lvbn1cbiAqIEBkZXNjcmlwdGlvblxuICogIFtlbl1BbGxvd3MgeW91IHRvIHNwZWNpZnkgY3VzdG9tIGJlaGF2aW9yIHdoZW4gdGhlIFwiZGVzdHJveVwiIGV2ZW50IGlzIGZpcmVkLlsvZW5dXG4gKiAgW2phXVwiZGVzdHJveVwi44Kk44OZ44Oz44OI44GM55m654Gr44GV44KM44Gf5pmC44Gu5oyZ5YuV44KS54us6Ieq44Gr5oyH5a6a44Gn44GN44G+44GZ44CCWy9qYV1cbiAqL1xuXG4vKipcbiAqIEBtZXRob2Qgb25cbiAqIEBzaWduYXR1cmUgb24oZXZlbnROYW1lLCBsaXN0ZW5lcilcbiAqIEBkZXNjcmlwdGlvblxuICogICBbZW5dQWRkIGFuIGV2ZW50IGxpc3RlbmVyLlsvZW5dXG4gKiAgIFtqYV3jgqTjg5njg7Pjg4jjg6rjgrnjg4rjg7zjgpLov73liqDjgZfjgb7jgZnjgIJbL2phXVxuICogQHBhcmFtIHtTdHJpbmd9IGV2ZW50TmFtZVxuICogICBbZW5dTmFtZSBvZiB0aGUgZXZlbnQuWy9lbl1cbiAqICAgW2phXeOCpOODmeODs+ODiOWQjeOCkuaMh+WumuOBl+OBvuOBmeOAglsvamFdXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBsaXN0ZW5lclxuICogICBbZW5dRnVuY3Rpb24gdG8gZXhlY3V0ZSB3aGVuIHRoZSBldmVudCBpcyB0cmlnZ2VyZWQuWy9lbl1cbiAqICAgW2phXeOCpOODmeODs+ODiOOBjOeZuueBq+OBleOCjOOBn+mam+OBq+WRvOOBs+WHuuOBleOCjOOCi+OCs+ODvOODq+ODkOODg+OCr+OCkuaMh+WumuOBl+OBvuOBmeOAglsvamFdXG4gKi9cblxuLyoqXG4gKiBAbWV0aG9kIG9uY2VcbiAqIEBzaWduYXR1cmUgb25jZShldmVudE5hbWUsIGxpc3RlbmVyKVxuICogQGRlc2NyaXB0aW9uXG4gKiAgW2VuXUFkZCBhbiBldmVudCBsaXN0ZW5lciB0aGF0J3Mgb25seSB0cmlnZ2VyZWQgb25jZS5bL2VuXVxuICogIFtqYV3kuIDluqbjgaDjgZHlkbzjgbPlh7rjgZXjgozjgovjgqTjg5njg7Pjg4jjg6rjgrnjg4rjg7zjgpLov73liqDjgZfjgb7jgZnjgIJbL2phXVxuICogQHBhcmFtIHtTdHJpbmd9IGV2ZW50TmFtZVxuICogICBbZW5dTmFtZSBvZiB0aGUgZXZlbnQuWy9lbl1cbiAqICAgW2phXeOCpOODmeODs+ODiOWQjeOCkuaMh+WumuOBl+OBvuOBmeOAglsvamFdXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBsaXN0ZW5lclxuICogICBbZW5dRnVuY3Rpb24gdG8gZXhlY3V0ZSB3aGVuIHRoZSBldmVudCBpcyB0cmlnZ2VyZWQuWy9lbl1cbiAqICAgW2phXeOCpOODmeODs+ODiOOBjOeZuueBq+OBl+OBn+mam+OBq+WRvOOBs+WHuuOBleOCjOOCi+OCs+ODvOODq+ODkOODg+OCr+OCkuaMh+WumuOBl+OBvuOBmeOAglsvamFdXG4gKi9cblxuLyoqXG4gKiBAbWV0aG9kIG9mZlxuICogQHNpZ25hdHVyZSBvZmYoZXZlbnROYW1lLCBbbGlzdGVuZXJdKVxuICogQGRlc2NyaXB0aW9uXG4gKiAgW2VuXVJlbW92ZSBhbiBldmVudCBsaXN0ZW5lci4gSWYgdGhlIGxpc3RlbmVyIGlzIG5vdCBzcGVjaWZpZWQgYWxsIGxpc3RlbmVycyBmb3IgdGhlIGV2ZW50IHR5cGUgd2lsbCBiZSByZW1vdmVkLlsvZW5dXG4gKiAgW2phXeOCpOODmeODs+ODiOODquOCueODiuODvOOCkuWJiumZpOOBl+OBvuOBmeOAguOCguOBl2xpc3RlbmVy44OR44Op44Oh44O844K/44GM5oyH5a6a44GV44KM44Gq44GL44Gj44Gf5aC05ZCI44CB44Gd44Gu44Kk44OZ44Oz44OI44Gu44Oq44K544OK44O844GM5YWo44Gm5YmK6Zmk44GV44KM44G+44GZ44CCWy9qYV1cbiAqIEBwYXJhbSB7U3RyaW5nfSBldmVudE5hbWVcbiAqICAgW2VuXU5hbWUgb2YgdGhlIGV2ZW50LlsvZW5dXG4gKiAgIFtqYV3jgqTjg5njg7Pjg4jlkI3jgpLmjIflrprjgZfjgb7jgZnjgIJbL2phXVxuICogQHBhcmFtIHtGdW5jdGlvbn0gbGlzdGVuZXJcbiAqICAgW2VuXUZ1bmN0aW9uIHRvIGV4ZWN1dGUgd2hlbiB0aGUgZXZlbnQgaXMgdHJpZ2dlcmVkLlsvZW5dXG4gKiAgIFtqYV3liYrpmaTjgZnjgovjgqTjg5njg7Pjg4jjg6rjgrnjg4rjg7zjga7plqLmlbDjgqrjg5bjgrjjgqfjgq/jg4jjgpLmuKHjgZfjgb7jgZnjgIJbL2phXVxuICovXG5cbihmdW5jdGlvbigpIHtcbiAgJ3VzZSBzdHJpY3QnO1xuXG4gIC8qKlxuICAgKiBBY3Rpb24gc2hlZXQgZGlyZWN0aXZlLlxuICAgKi9cbiAgYW5ndWxhci5tb2R1bGUoJ29uc2VuJykuZGlyZWN0aXZlKCdvbnNBY3Rpb25TaGVldCcsIGZ1bmN0aW9uKCRvbnNlbiwgQWN0aW9uU2hlZXRWaWV3KSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHJlc3RyaWN0OiAnRScsXG4gICAgICByZXBsYWNlOiBmYWxzZSxcbiAgICAgIHNjb3BlOiB0cnVlLFxuICAgICAgdHJhbnNjbHVkZTogZmFsc2UsXG5cbiAgICAgIGNvbXBpbGU6IGZ1bmN0aW9uKGVsZW1lbnQsIGF0dHJzKSB7XG5cbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICBwcmU6IGZ1bmN0aW9uKHNjb3BlLCBlbGVtZW50LCBhdHRycykge1xuICAgICAgICAgICAgdmFyIGFjdGlvblNoZWV0ID0gbmV3IEFjdGlvblNoZWV0VmlldyhzY29wZSwgZWxlbWVudCwgYXR0cnMpO1xuXG4gICAgICAgICAgICAkb25zZW4uZGVjbGFyZVZhckF0dHJpYnV0ZShhdHRycywgYWN0aW9uU2hlZXQpO1xuICAgICAgICAgICAgJG9uc2VuLnJlZ2lzdGVyRXZlbnRIYW5kbGVycyhhY3Rpb25TaGVldCwgJ3ByZXNob3cgcHJlaGlkZSBwb3N0c2hvdyBwb3N0aGlkZSBkZXN0cm95Jyk7XG4gICAgICAgICAgICAkb25zZW4uYWRkTW9kaWZpZXJNZXRob2RzRm9yQ3VzdG9tRWxlbWVudHMoYWN0aW9uU2hlZXQsIGVsZW1lbnQpO1xuXG4gICAgICAgICAgICBlbGVtZW50LmRhdGEoJ29ucy1hY3Rpb24tc2hlZXQnLCBhY3Rpb25TaGVldCk7XG5cbiAgICAgICAgICAgIHNjb3BlLiRvbignJGRlc3Ryb3knLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgYWN0aW9uU2hlZXQuX2V2ZW50cyA9IHVuZGVmaW5lZDtcbiAgICAgICAgICAgICAgJG9uc2VuLnJlbW92ZU1vZGlmaWVyTWV0aG9kcyhhY3Rpb25TaGVldCk7XG4gICAgICAgICAgICAgIGVsZW1lbnQuZGF0YSgnb25zLWFjdGlvbi1zaGVldCcsIHVuZGVmaW5lZCk7XG4gICAgICAgICAgICAgIGVsZW1lbnQgPSBudWxsO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfSxcbiAgICAgICAgICBwb3N0OiBmdW5jdGlvbihzY29wZSwgZWxlbWVudCkge1xuICAgICAgICAgICAgJG9uc2VuLmZpcmVDb21wb25lbnRFdmVudChlbGVtZW50WzBdLCAnaW5pdCcpO1xuICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICAgIH1cbiAgICB9O1xuICB9KTtcblxufSkoKTtcbiIsIi8qKlxuICogQGVsZW1lbnQgb25zLWFsZXJ0LWRpYWxvZ1xuICovXG5cbi8qKlxuICogQGF0dHJpYnV0ZSB2YXJcbiAqIEBpbml0b25seVxuICogQHR5cGUge1N0cmluZ31cbiAqIEBkZXNjcmlwdGlvblxuICogIFtlbl1WYXJpYWJsZSBuYW1lIHRvIHJlZmVyIHRoaXMgYWxlcnQgZGlhbG9nLlsvZW5dXG4gKiAgW2phXeOBk+OBruOCouODqeODvOODiOODgOOCpOOCouODreOCsOOCkuWPgueFp+OBmeOCi+OBn+OCgeOBruWQjeWJjeOCkuaMh+WumuOBl+OBvuOBmeOAglsvamFdXG4gKi9cblxuLyoqXG4gKiBAYXR0cmlidXRlIG9ucy1wcmVzaG93XG4gKiBAaW5pdG9ubHlcbiAqIEB0eXBlIHtFeHByZXNzaW9ufVxuICogQGRlc2NyaXB0aW9uXG4gKiAgW2VuXUFsbG93cyB5b3UgdG8gc3BlY2lmeSBjdXN0b20gYmVoYXZpb3Igd2hlbiB0aGUgXCJwcmVzaG93XCIgZXZlbnQgaXMgZmlyZWQuWy9lbl1cbiAqICBbamFdXCJwcmVzaG93XCLjgqTjg5njg7Pjg4jjgYznmbrngavjgZXjgozjgZ/mmYLjga7mjJnli5XjgpLni6zoh6rjgavmjIflrprjgafjgY3jgb7jgZnjgIJbL2phXVxuICovXG5cbi8qKlxuICogQGF0dHJpYnV0ZSBvbnMtcHJlaGlkZVxuICogQGluaXRvbmx5XG4gKiBAdHlwZSB7RXhwcmVzc2lvbn1cbiAqIEBkZXNjcmlwdGlvblxuICogIFtlbl1BbGxvd3MgeW91IHRvIHNwZWNpZnkgY3VzdG9tIGJlaGF2aW9yIHdoZW4gdGhlIFwicHJlaGlkZVwiIGV2ZW50IGlzIGZpcmVkLlsvZW5dXG4gKiAgW2phXVwicHJlaGlkZVwi44Kk44OZ44Oz44OI44GM55m654Gr44GV44KM44Gf5pmC44Gu5oyZ5YuV44KS54us6Ieq44Gr5oyH5a6a44Gn44GN44G+44GZ44CCWy9qYV1cbiAqL1xuXG4vKipcbiAqIEBhdHRyaWJ1dGUgb25zLXBvc3RzaG93XG4gKiBAaW5pdG9ubHlcbiAqIEB0eXBlIHtFeHByZXNzaW9ufVxuICogQGRlc2NyaXB0aW9uXG4gKiAgW2VuXUFsbG93cyB5b3UgdG8gc3BlY2lmeSBjdXN0b20gYmVoYXZpb3Igd2hlbiB0aGUgXCJwb3N0c2hvd1wiIGV2ZW50IGlzIGZpcmVkLlsvZW5dXG4gKiAgW2phXVwicG9zdHNob3dcIuOCpOODmeODs+ODiOOBjOeZuueBq+OBleOCjOOBn+aZguOBruaMmeWLleOCkueLrOiHquOBq+aMh+WumuOBp+OBjeOBvuOBmeOAglsvamFdXG4gKi9cblxuLyoqXG4gKiBAYXR0cmlidXRlIG9ucy1wb3N0aGlkZVxuICogQGluaXRvbmx5XG4gKiBAdHlwZSB7RXhwcmVzc2lvbn1cbiAqIEBkZXNjcmlwdGlvblxuICogIFtlbl1BbGxvd3MgeW91IHRvIHNwZWNpZnkgY3VzdG9tIGJlaGF2aW9yIHdoZW4gdGhlIFwicG9zdGhpZGVcIiBldmVudCBpcyBmaXJlZC5bL2VuXVxuICogIFtqYV1cInBvc3RoaWRlXCLjgqTjg5njg7Pjg4jjgYznmbrngavjgZXjgozjgZ/mmYLjga7mjJnli5XjgpLni6zoh6rjgavmjIflrprjgafjgY3jgb7jgZnjgIJbL2phXVxuICovXG5cbi8qKlxuICogQGF0dHJpYnV0ZSBvbnMtZGVzdHJveVxuICogQGluaXRvbmx5XG4gKiBAdHlwZSB7RXhwcmVzc2lvbn1cbiAqIEBkZXNjcmlwdGlvblxuICogIFtlbl1BbGxvd3MgeW91IHRvIHNwZWNpZnkgY3VzdG9tIGJlaGF2aW9yIHdoZW4gdGhlIFwiZGVzdHJveVwiIGV2ZW50IGlzIGZpcmVkLlsvZW5dXG4gKiAgW2phXVwiZGVzdHJveVwi44Kk44OZ44Oz44OI44GM55m654Gr44GV44KM44Gf5pmC44Gu5oyZ5YuV44KS54us6Ieq44Gr5oyH5a6a44Gn44GN44G+44GZ44CCWy9qYV1cbiAqL1xuXG4vKipcbiAqIEBtZXRob2Qgb25cbiAqIEBzaWduYXR1cmUgb24oZXZlbnROYW1lLCBsaXN0ZW5lcilcbiAqIEBkZXNjcmlwdGlvblxuICogICBbZW5dQWRkIGFuIGV2ZW50IGxpc3RlbmVyLlsvZW5dXG4gKiAgIFtqYV3jgqTjg5njg7Pjg4jjg6rjgrnjg4rjg7zjgpLov73liqDjgZfjgb7jgZnjgIJbL2phXVxuICogQHBhcmFtIHtTdHJpbmd9IGV2ZW50TmFtZVxuICogICBbZW5dTmFtZSBvZiB0aGUgZXZlbnQuWy9lbl1cbiAqICAgW2phXeOCpOODmeODs+ODiOWQjeOCkuaMh+WumuOBl+OBvuOBmeOAglsvamFdXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBsaXN0ZW5lclxuICogICBbZW5dRnVuY3Rpb24gdG8gZXhlY3V0ZSB3aGVuIHRoZSBldmVudCBpcyB0cmlnZ2VyZWQuWy9lbl1cbiAqICAgW2phXeOCpOODmeODs+ODiOOBjOeZuueBq+OBleOCjOOBn+mam+OBq+WRvOOBs+WHuuOBleOCjOOCi+OCs+ODvOODq+ODkOODg+OCr+OCkuaMh+WumuOBl+OBvuOBmeOAglsvamFdXG4gKi9cblxuLyoqXG4gKiBAbWV0aG9kIG9uY2VcbiAqIEBzaWduYXR1cmUgb25jZShldmVudE5hbWUsIGxpc3RlbmVyKVxuICogQGRlc2NyaXB0aW9uXG4gKiAgW2VuXUFkZCBhbiBldmVudCBsaXN0ZW5lciB0aGF0J3Mgb25seSB0cmlnZ2VyZWQgb25jZS5bL2VuXVxuICogIFtqYV3kuIDluqbjgaDjgZHlkbzjgbPlh7rjgZXjgozjgovjgqTjg5njg7Pjg4jjg6rjgrnjg4rjg7zjgpLov73liqDjgZfjgb7jgZnjgIJbL2phXVxuICogQHBhcmFtIHtTdHJpbmd9IGV2ZW50TmFtZVxuICogICBbZW5dTmFtZSBvZiB0aGUgZXZlbnQuWy9lbl1cbiAqICAgW2phXeOCpOODmeODs+ODiOWQjeOCkuaMh+WumuOBl+OBvuOBmeOAglsvamFdXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBsaXN0ZW5lclxuICogICBbZW5dRnVuY3Rpb24gdG8gZXhlY3V0ZSB3aGVuIHRoZSBldmVudCBpcyB0cmlnZ2VyZWQuWy9lbl1cbiAqICAgW2phXeOCpOODmeODs+ODiOOBjOeZuueBq+OBl+OBn+mam+OBq+WRvOOBs+WHuuOBleOCjOOCi+OCs+ODvOODq+ODkOODg+OCr+OCkuaMh+WumuOBl+OBvuOBmeOAglsvamFdXG4gKi9cblxuLyoqXG4gKiBAbWV0aG9kIG9mZlxuICogQHNpZ25hdHVyZSBvZmYoZXZlbnROYW1lLCBbbGlzdGVuZXJdKVxuICogQGRlc2NyaXB0aW9uXG4gKiAgW2VuXVJlbW92ZSBhbiBldmVudCBsaXN0ZW5lci4gSWYgdGhlIGxpc3RlbmVyIGlzIG5vdCBzcGVjaWZpZWQgYWxsIGxpc3RlbmVycyBmb3IgdGhlIGV2ZW50IHR5cGUgd2lsbCBiZSByZW1vdmVkLlsvZW5dXG4gKiAgW2phXeOCpOODmeODs+ODiOODquOCueODiuODvOOCkuWJiumZpOOBl+OBvuOBmeOAguOCguOBl2xpc3RlbmVy44OR44Op44Oh44O844K/44GM5oyH5a6a44GV44KM44Gq44GL44Gj44Gf5aC05ZCI44CB44Gd44Gu44Kk44OZ44Oz44OI44Gu44Oq44K544OK44O844GM5YWo44Gm5YmK6Zmk44GV44KM44G+44GZ44CCWy9qYV1cbiAqIEBwYXJhbSB7U3RyaW5nfSBldmVudE5hbWVcbiAqICAgW2VuXU5hbWUgb2YgdGhlIGV2ZW50LlsvZW5dXG4gKiAgIFtqYV3jgqTjg5njg7Pjg4jlkI3jgpLmjIflrprjgZfjgb7jgZnjgIJbL2phXVxuICogQHBhcmFtIHtGdW5jdGlvbn0gbGlzdGVuZXJcbiAqICAgW2VuXUZ1bmN0aW9uIHRvIGV4ZWN1dGUgd2hlbiB0aGUgZXZlbnQgaXMgdHJpZ2dlcmVkLlsvZW5dXG4gKiAgIFtqYV3liYrpmaTjgZnjgovjgqTjg5njg7Pjg4jjg6rjgrnjg4rjg7zjga7plqLmlbDjgqrjg5bjgrjjgqfjgq/jg4jjgpLmuKHjgZfjgb7jgZnjgIJbL2phXVxuICovXG5cbihmdW5jdGlvbigpIHtcbiAgJ3VzZSBzdHJpY3QnO1xuXG4gIC8qKlxuICAgKiBBbGVydCBkaWFsb2cgZGlyZWN0aXZlLlxuICAgKi9cbiAgYW5ndWxhci5tb2R1bGUoJ29uc2VuJykuZGlyZWN0aXZlKCdvbnNBbGVydERpYWxvZycsIGZ1bmN0aW9uKCRvbnNlbiwgQWxlcnREaWFsb2dWaWV3KSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHJlc3RyaWN0OiAnRScsXG4gICAgICByZXBsYWNlOiBmYWxzZSxcbiAgICAgIHNjb3BlOiB0cnVlLFxuICAgICAgdHJhbnNjbHVkZTogZmFsc2UsXG5cbiAgICAgIGNvbXBpbGU6IGZ1bmN0aW9uKGVsZW1lbnQsIGF0dHJzKSB7XG5cbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICBwcmU6IGZ1bmN0aW9uKHNjb3BlLCBlbGVtZW50LCBhdHRycykge1xuICAgICAgICAgICAgdmFyIGFsZXJ0RGlhbG9nID0gbmV3IEFsZXJ0RGlhbG9nVmlldyhzY29wZSwgZWxlbWVudCwgYXR0cnMpO1xuXG4gICAgICAgICAgICAkb25zZW4uZGVjbGFyZVZhckF0dHJpYnV0ZShhdHRycywgYWxlcnREaWFsb2cpO1xuICAgICAgICAgICAgJG9uc2VuLnJlZ2lzdGVyRXZlbnRIYW5kbGVycyhhbGVydERpYWxvZywgJ3ByZXNob3cgcHJlaGlkZSBwb3N0c2hvdyBwb3N0aGlkZSBkZXN0cm95Jyk7XG4gICAgICAgICAgICAkb25zZW4uYWRkTW9kaWZpZXJNZXRob2RzRm9yQ3VzdG9tRWxlbWVudHMoYWxlcnREaWFsb2csIGVsZW1lbnQpO1xuXG4gICAgICAgICAgICBlbGVtZW50LmRhdGEoJ29ucy1hbGVydC1kaWFsb2cnLCBhbGVydERpYWxvZyk7XG4gICAgICAgICAgICBlbGVtZW50LmRhdGEoJ19zY29wZScsIHNjb3BlKTtcblxuICAgICAgICAgICAgc2NvcGUuJG9uKCckZGVzdHJveScsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICBhbGVydERpYWxvZy5fZXZlbnRzID0gdW5kZWZpbmVkO1xuICAgICAgICAgICAgICAkb25zZW4ucmVtb3ZlTW9kaWZpZXJNZXRob2RzKGFsZXJ0RGlhbG9nKTtcbiAgICAgICAgICAgICAgZWxlbWVudC5kYXRhKCdvbnMtYWxlcnQtZGlhbG9nJywgdW5kZWZpbmVkKTtcbiAgICAgICAgICAgICAgZWxlbWVudCA9IG51bGw7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9LFxuICAgICAgICAgIHBvc3Q6IGZ1bmN0aW9uKHNjb3BlLCBlbGVtZW50KSB7XG4gICAgICAgICAgICAkb25zZW4uZmlyZUNvbXBvbmVudEV2ZW50KGVsZW1lbnRbMF0sICdpbml0Jyk7XG4gICAgICAgICAgfVxuICAgICAgICB9O1xuICAgICAgfVxuICAgIH07XG4gIH0pO1xuXG59KSgpO1xuIiwiKGZ1bmN0aW9uKCl7XG4gICd1c2Ugc3RyaWN0JztcbiAgdmFyIG1vZHVsZSA9IGFuZ3VsYXIubW9kdWxlKCdvbnNlbicpO1xuXG4gIG1vZHVsZS5kaXJlY3RpdmUoJ29uc0JhY2tCdXR0b24nLCBmdW5jdGlvbigkb25zZW4sICRjb21waWxlLCBHZW5lcmljVmlldywgQ29tcG9uZW50Q2xlYW5lcikge1xuICAgIHJldHVybiB7XG4gICAgICByZXN0cmljdDogJ0UnLFxuICAgICAgcmVwbGFjZTogZmFsc2UsXG5cbiAgICAgIGNvbXBpbGU6IGZ1bmN0aW9uKGVsZW1lbnQsIGF0dHJzKSB7XG5cbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICBwcmU6IGZ1bmN0aW9uKHNjb3BlLCBlbGVtZW50LCBhdHRycywgY29udHJvbGxlciwgdHJhbnNjbHVkZSkge1xuICAgICAgICAgICAgdmFyIGJhY2tCdXR0b24gPSBHZW5lcmljVmlldy5yZWdpc3RlcihzY29wZSwgZWxlbWVudCwgYXR0cnMsIHtcbiAgICAgICAgICAgICAgdmlld0tleTogJ29ucy1iYWNrLWJ1dHRvbidcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICBpZiAoYXR0cnMubmdDbGljaykge1xuICAgICAgICAgICAgICBlbGVtZW50WzBdLm9uQ2xpY2sgPSBhbmd1bGFyLm5vb3A7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHNjb3BlLiRvbignJGRlc3Ryb3knLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgYmFja0J1dHRvbi5fZXZlbnRzID0gdW5kZWZpbmVkO1xuICAgICAgICAgICAgICAkb25zZW4ucmVtb3ZlTW9kaWZpZXJNZXRob2RzKGJhY2tCdXR0b24pO1xuICAgICAgICAgICAgICBlbGVtZW50ID0gbnVsbDtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICBDb21wb25lbnRDbGVhbmVyLm9uRGVzdHJveShzY29wZSwgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgIENvbXBvbmVudENsZWFuZXIuZGVzdHJveVNjb3BlKHNjb3BlKTtcbiAgICAgICAgICAgICAgQ29tcG9uZW50Q2xlYW5lci5kZXN0cm95QXR0cmlidXRlcyhhdHRycyk7XG4gICAgICAgICAgICAgIGVsZW1lbnQgPSBzY29wZSA9IGF0dHJzID0gbnVsbDtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH0sXG4gICAgICAgICAgcG9zdDogZnVuY3Rpb24oc2NvcGUsIGVsZW1lbnQpIHtcbiAgICAgICAgICAgICRvbnNlbi5maXJlQ29tcG9uZW50RXZlbnQoZWxlbWVudFswXSwgJ2luaXQnKTtcbiAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgICB9XG4gICAgfTtcbiAgfSk7XG59KSgpO1xuIiwiKGZ1bmN0aW9uKCl7XG4gICd1c2Ugc3RyaWN0JztcblxuICBhbmd1bGFyLm1vZHVsZSgnb25zZW4nKS5kaXJlY3RpdmUoJ29uc0JvdHRvbVRvb2xiYXInLCBmdW5jdGlvbigkb25zZW4sIEdlbmVyaWNWaWV3KSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHJlc3RyaWN0OiAnRScsXG4gICAgICBsaW5rOiB7XG4gICAgICAgIHByZTogZnVuY3Rpb24oc2NvcGUsIGVsZW1lbnQsIGF0dHJzKSB7XG4gICAgICAgICAgR2VuZXJpY1ZpZXcucmVnaXN0ZXIoc2NvcGUsIGVsZW1lbnQsIGF0dHJzLCB7XG4gICAgICAgICAgICB2aWV3S2V5OiAnb25zLWJvdHRvbVRvb2xiYXInXG4gICAgICAgICAgfSk7XG4gICAgICAgIH0sXG5cbiAgICAgICAgcG9zdDogZnVuY3Rpb24oc2NvcGUsIGVsZW1lbnQsIGF0dHJzKSB7XG4gICAgICAgICAgJG9uc2VuLmZpcmVDb21wb25lbnRFdmVudChlbGVtZW50WzBdLCAnaW5pdCcpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfTtcbiAgfSk7XG5cbn0pKCk7XG5cbiIsIlxuLyoqXG4gKiBAZWxlbWVudCBvbnMtYnV0dG9uXG4gKi9cblxuKGZ1bmN0aW9uKCl7XG4gICd1c2Ugc3RyaWN0JztcblxuICBhbmd1bGFyLm1vZHVsZSgnb25zZW4nKS5kaXJlY3RpdmUoJ29uc0J1dHRvbicsIGZ1bmN0aW9uKCRvbnNlbiwgR2VuZXJpY1ZpZXcpIHtcbiAgICByZXR1cm4ge1xuICAgICAgcmVzdHJpY3Q6ICdFJyxcbiAgICAgIGxpbms6IGZ1bmN0aW9uKHNjb3BlLCBlbGVtZW50LCBhdHRycykge1xuICAgICAgICB2YXIgYnV0dG9uID0gR2VuZXJpY1ZpZXcucmVnaXN0ZXIoc2NvcGUsIGVsZW1lbnQsIGF0dHJzLCB7XG4gICAgICAgICAgdmlld0tleTogJ29ucy1idXR0b24nXG4gICAgICAgIH0pO1xuXG4gICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShidXR0b24sICdkaXNhYmxlZCcsIHtcbiAgICAgICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9lbGVtZW50WzBdLmRpc2FibGVkO1xuICAgICAgICAgIH0sXG4gICAgICAgICAgc2V0OiBmdW5jdGlvbih2YWx1ZSkge1xuICAgICAgICAgICAgcmV0dXJuICh0aGlzLl9lbGVtZW50WzBdLmRpc2FibGVkID0gdmFsdWUpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgICRvbnNlbi5maXJlQ29tcG9uZW50RXZlbnQoZWxlbWVudFswXSwgJ2luaXQnKTtcbiAgICAgIH1cbiAgICB9O1xuICB9KTtcblxuXG5cbn0pKCk7XG4iLCIoZnVuY3Rpb24oKSB7XG4gICd1c2Ugc3RyaWN0JztcblxuICBhbmd1bGFyLm1vZHVsZSgnb25zZW4nKS5kaXJlY3RpdmUoJ29uc0NhcmQnLCBmdW5jdGlvbigkb25zZW4sIEdlbmVyaWNWaWV3KSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHJlc3RyaWN0OiAnRScsXG4gICAgICBsaW5rOiBmdW5jdGlvbihzY29wZSwgZWxlbWVudCwgYXR0cnMpIHtcbiAgICAgICAgR2VuZXJpY1ZpZXcucmVnaXN0ZXIoc2NvcGUsIGVsZW1lbnQsIGF0dHJzLCB7dmlld0tleTogJ29ucy1jYXJkJ30pO1xuICAgICAgICAkb25zZW4uZmlyZUNvbXBvbmVudEV2ZW50KGVsZW1lbnRbMF0sICdpbml0Jyk7XG4gICAgICB9XG4gICAgfTtcbiAgfSk7XG5cbn0pKCk7XG4iLCIvKipcbiAqIEBlbGVtZW50IG9ucy1jYXJvdXNlbFxuICogQGRlc2NyaXB0aW9uXG4gKiAgIFtlbl1DYXJvdXNlbCBjb21wb25lbnQuWy9lbl1cbiAqICAgW2phXeOCq+ODq+ODvOOCu+ODq+OCkuihqOekuuOBp+OBjeOCi+OCs+ODs+ODneODvOODjeODs+ODiOOAglsvamFdXG4gKiBAY29kZXBlbiB4YmJ6T1FcbiAqIEBndWlkZSBVc2luZ0Nhcm91c2VsXG4gKiAgIFtlbl1MZWFybiBob3cgdG8gdXNlIHRoZSBjYXJvdXNlbCBjb21wb25lbnQuWy9lbl1cbiAqICAgW2phXWNhcm91c2Vs44Kz44Oz44Od44O844ON44Oz44OI44Gu5L2/44GE5pa5Wy9qYV1cbiAqIEBleGFtcGxlXG4gKiA8b25zLWNhcm91c2VsIHN0eWxlPVwid2lkdGg6IDEwMCU7IGhlaWdodDogMjAwcHhcIj5cbiAqICAgPG9ucy1jYXJvdXNlbC1pdGVtPlxuICogICAgLi4uXG4gKiAgIDwvb25zLWNhcm91c2VsLWl0ZW0+XG4gKiAgIDxvbnMtY2Fyb3VzZWwtaXRlbT5cbiAqICAgIC4uLlxuICogICA8L29ucy1jYXJvdXNlbC1pdGVtPlxuICogPC9vbnMtY2Fyb3VzZWw+XG4gKi9cblxuLyoqXG4gKiBAYXR0cmlidXRlIHZhclxuICogQGluaXRvbmx5XG4gKiBAdHlwZSB7U3RyaW5nfVxuICogQGRlc2NyaXB0aW9uXG4gKiAgIFtlbl1WYXJpYWJsZSBuYW1lIHRvIHJlZmVyIHRoaXMgY2Fyb3VzZWwuWy9lbl1cbiAqICAgW2phXeOBk+OBruOCq+ODq+ODvOOCu+ODq+OCkuWPgueFp+OBmeOCi+OBn+OCgeOBruWkieaVsOWQjeOCkuaMh+WumuOBl+OBvuOBmeOAglsvamFdXG4gKi9cblxuLyoqXG4gKiBAYXR0cmlidXRlIG9ucy1wb3N0Y2hhbmdlXG4gKiBAaW5pdG9ubHlcbiAqIEB0eXBlIHtFeHByZXNzaW9ufVxuICogQGRlc2NyaXB0aW9uXG4gKiAgW2VuXUFsbG93cyB5b3UgdG8gc3BlY2lmeSBjdXN0b20gYmVoYXZpb3Igd2hlbiB0aGUgXCJwb3N0Y2hhbmdlXCIgZXZlbnQgaXMgZmlyZWQuWy9lbl1cbiAqICBbamFdXCJwb3N0Y2hhbmdlXCLjgqTjg5njg7Pjg4jjgYznmbrngavjgZXjgozjgZ/mmYLjga7mjJnli5XjgpLni6zoh6rjgavmjIflrprjgafjgY3jgb7jgZnjgIJbL2phXVxuICovXG5cbi8qKlxuICogQGF0dHJpYnV0ZSBvbnMtcmVmcmVzaFxuICogQGluaXRvbmx5XG4gKiBAdHlwZSB7RXhwcmVzc2lvbn1cbiAqIEBkZXNjcmlwdGlvblxuICogIFtlbl1BbGxvd3MgeW91IHRvIHNwZWNpZnkgY3VzdG9tIGJlaGF2aW9yIHdoZW4gdGhlIFwicmVmcmVzaFwiIGV2ZW50IGlzIGZpcmVkLlsvZW5dXG4gKiAgW2phXVwicmVmcmVzaFwi44Kk44OZ44Oz44OI44GM55m654Gr44GV44KM44Gf5pmC44Gu5oyZ5YuV44KS54us6Ieq44Gr5oyH5a6a44Gn44GN44G+44GZ44CCWy9qYV1cbiAqL1xuXG4vKipcbiAqIEBhdHRyaWJ1dGUgb25zLW92ZXJzY3JvbGxcbiAqIEBpbml0b25seVxuICogQHR5cGUge0V4cHJlc3Npb259XG4gKiBAZGVzY3JpcHRpb25cbiAqICBbZW5dQWxsb3dzIHlvdSB0byBzcGVjaWZ5IGN1c3RvbSBiZWhhdmlvciB3aGVuIHRoZSBcIm92ZXJzY3JvbGxcIiBldmVudCBpcyBmaXJlZC5bL2VuXVxuICogIFtqYV1cIm92ZXJzY3JvbGxcIuOCpOODmeODs+ODiOOBjOeZuueBq+OBleOCjOOBn+aZguOBruaMmeWLleOCkueLrOiHquOBq+aMh+WumuOBp+OBjeOBvuOBmeOAglsvamFdXG4gKi9cblxuLyoqXG4gKiBAYXR0cmlidXRlIG9ucy1kZXN0cm95XG4gKiBAaW5pdG9ubHlcbiAqIEB0eXBlIHtFeHByZXNzaW9ufVxuICogQGRlc2NyaXB0aW9uXG4gKiAgW2VuXUFsbG93cyB5b3UgdG8gc3BlY2lmeSBjdXN0b20gYmVoYXZpb3Igd2hlbiB0aGUgXCJkZXN0cm95XCIgZXZlbnQgaXMgZmlyZWQuWy9lbl1cbiAqICBbamFdXCJkZXN0cm95XCLjgqTjg5njg7Pjg4jjgYznmbrngavjgZXjgozjgZ/mmYLjga7mjJnli5XjgpLni6zoh6rjgavmjIflrprjgafjgY3jgb7jgZnjgIJbL2phXVxuICovXG5cbi8qKlxuICogQG1ldGhvZCBvbmNlXG4gKiBAc2lnbmF0dXJlIG9uY2UoZXZlbnROYW1lLCBsaXN0ZW5lcilcbiAqIEBkZXNjcmlwdGlvblxuICogIFtlbl1BZGQgYW4gZXZlbnQgbGlzdGVuZXIgdGhhdCdzIG9ubHkgdHJpZ2dlcmVkIG9uY2UuWy9lbl1cbiAqICBbamFd5LiA5bqm44Gg44GR5ZG844Gz5Ye644GV44KM44KL44Kk44OZ44Oz44OI44Oq44K544OK44KS6L+95Yqg44GX44G+44GZ44CCWy9qYV1cbiAqIEBwYXJhbSB7U3RyaW5nfSBldmVudE5hbWVcbiAqICAgW2VuXU5hbWUgb2YgdGhlIGV2ZW50LlsvZW5dXG4gKiAgIFtqYV3jgqTjg5njg7Pjg4jlkI3jgpLmjIflrprjgZfjgb7jgZnjgIJbL2phXVxuICogQHBhcmFtIHtGdW5jdGlvbn0gbGlzdGVuZXJcbiAqICAgW2VuXUZ1bmN0aW9uIHRvIGV4ZWN1dGUgd2hlbiB0aGUgZXZlbnQgaXMgdHJpZ2dlcmVkLlsvZW5dXG4gKiAgIFtqYV3jgqTjg5njg7Pjg4jjgYznmbrngavjgZfjgZ/pmpvjgavlkbzjgbPlh7rjgZXjgozjgovplqLmlbDjgqrjg5bjgrjjgqfjgq/jg4jjgpLmjIflrprjgZfjgb7jgZnjgIJbL2phXVxuICovXG5cbi8qKlxuICogQG1ldGhvZCBvZmZcbiAqIEBzaWduYXR1cmUgb2ZmKGV2ZW50TmFtZSwgW2xpc3RlbmVyXSlcbiAqIEBkZXNjcmlwdGlvblxuICogIFtlbl1SZW1vdmUgYW4gZXZlbnQgbGlzdGVuZXIuIElmIHRoZSBsaXN0ZW5lciBpcyBub3Qgc3BlY2lmaWVkIGFsbCBsaXN0ZW5lcnMgZm9yIHRoZSBldmVudCB0eXBlIHdpbGwgYmUgcmVtb3ZlZC5bL2VuXVxuICogIFtqYV3jgqTjg5njg7Pjg4jjg6rjgrnjg4rjg7zjgpLliYrpmaTjgZfjgb7jgZnjgILjgoLjgZfjgqTjg5njg7Pjg4jjg6rjgrnjg4rjg7zjgYzmjIflrprjgZXjgozjgarjgYvjgaPjgZ/loLTlkIjjgavjga/jgIHjgZ3jga7jgqTjg5njg7Pjg4jjgavntJDku5jjgYTjgabjgYTjgovjgqTjg5njg7Pjg4jjg6rjgrnjg4rjg7zjgYzlhajjgabliYrpmaTjgZXjgozjgb7jgZnjgIJbL2phXVxuICogQHBhcmFtIHtTdHJpbmd9IGV2ZW50TmFtZVxuICogICBbZW5dTmFtZSBvZiB0aGUgZXZlbnQuWy9lbl1cbiAqICAgW2phXeOCpOODmeODs+ODiOWQjeOCkuaMh+WumuOBl+OBvuOBmeOAglsvamFdXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBsaXN0ZW5lclxuICogICBbZW5dRnVuY3Rpb24gdG8gZXhlY3V0ZSB3aGVuIHRoZSBldmVudCBpcyB0cmlnZ2VyZWQuWy9lbl1cbiAqICAgW2phXeOCpOODmeODs+ODiOOBjOeZuueBq+OBl+OBn+mam+OBq+WRvOOBs+WHuuOBleOCjOOCi+mWouaVsOOCquODluOCuOOCp+OCr+ODiOOCkuaMh+WumuOBl+OBvuOBmeOAglsvamFdXG4gKi9cblxuLyoqXG4gKiBAbWV0aG9kIG9uXG4gKiBAc2lnbmF0dXJlIG9uKGV2ZW50TmFtZSwgbGlzdGVuZXIpXG4gKiBAZGVzY3JpcHRpb25cbiAqICAgW2VuXUFkZCBhbiBldmVudCBsaXN0ZW5lci5bL2VuXVxuICogICBbamFd44Kk44OZ44Oz44OI44Oq44K544OK44O844KS6L+95Yqg44GX44G+44GZ44CCWy9qYV1cbiAqIEBwYXJhbSB7U3RyaW5nfSBldmVudE5hbWVcbiAqICAgW2VuXU5hbWUgb2YgdGhlIGV2ZW50LlsvZW5dXG4gKiAgIFtqYV3jgqTjg5njg7Pjg4jlkI3jgpLmjIflrprjgZfjgb7jgZnjgIJbL2phXVxuICogQHBhcmFtIHtGdW5jdGlvbn0gbGlzdGVuZXJcbiAqICAgW2VuXUZ1bmN0aW9uIHRvIGV4ZWN1dGUgd2hlbiB0aGUgZXZlbnQgaXMgdHJpZ2dlcmVkLlsvZW5dXG4gKiAgIFtqYV3jgqTjg5njg7Pjg4jjgYznmbrngavjgZfjgZ/pmpvjgavlkbzjgbPlh7rjgZXjgozjgovplqLmlbDjgqrjg5bjgrjjgqfjgq/jg4jjgpLmjIflrprjgZfjgb7jgZnjgIJbL2phXVxuICovXG5cbihmdW5jdGlvbigpIHtcbiAgJ3VzZSBzdHJpY3QnO1xuXG4gIHZhciBtb2R1bGUgPSBhbmd1bGFyLm1vZHVsZSgnb25zZW4nKTtcblxuICBtb2R1bGUuZGlyZWN0aXZlKCdvbnNDYXJvdXNlbCcsIGZ1bmN0aW9uKCRvbnNlbiwgQ2Fyb3VzZWxWaWV3KSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHJlc3RyaWN0OiAnRScsXG4gICAgICByZXBsYWNlOiBmYWxzZSxcblxuICAgICAgLy8gTk9URTogVGhpcyBlbGVtZW50IG11c3QgY29leGlzdHMgd2l0aCBuZy1jb250cm9sbGVyLlxuICAgICAgLy8gRG8gbm90IHVzZSBpc29sYXRlZCBzY29wZSBhbmQgdGVtcGxhdGUncyBuZy10cmFuc2NsdWRlLlxuICAgICAgc2NvcGU6IGZhbHNlLFxuICAgICAgdHJhbnNjbHVkZTogZmFsc2UsXG5cbiAgICAgIGNvbXBpbGU6IGZ1bmN0aW9uKGVsZW1lbnQsIGF0dHJzKSB7XG5cbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uKHNjb3BlLCBlbGVtZW50LCBhdHRycykge1xuICAgICAgICAgIHZhciBjYXJvdXNlbCA9IG5ldyBDYXJvdXNlbFZpZXcoc2NvcGUsIGVsZW1lbnQsIGF0dHJzKTtcblxuICAgICAgICAgIGVsZW1lbnQuZGF0YSgnb25zLWNhcm91c2VsJywgY2Fyb3VzZWwpO1xuXG4gICAgICAgICAgJG9uc2VuLnJlZ2lzdGVyRXZlbnRIYW5kbGVycyhjYXJvdXNlbCwgJ3Bvc3RjaGFuZ2UgcmVmcmVzaCBvdmVyc2Nyb2xsIGRlc3Ryb3knKTtcbiAgICAgICAgICAkb25zZW4uZGVjbGFyZVZhckF0dHJpYnV0ZShhdHRycywgY2Fyb3VzZWwpO1xuXG4gICAgICAgICAgc2NvcGUuJG9uKCckZGVzdHJveScsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgY2Fyb3VzZWwuX2V2ZW50cyA9IHVuZGVmaW5lZDtcbiAgICAgICAgICAgIGVsZW1lbnQuZGF0YSgnb25zLWNhcm91c2VsJywgdW5kZWZpbmVkKTtcbiAgICAgICAgICAgIGVsZW1lbnQgPSBudWxsO1xuICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgJG9uc2VuLmZpcmVDb21wb25lbnRFdmVudChlbGVtZW50WzBdLCAnaW5pdCcpO1xuICAgICAgICB9O1xuICAgICAgfSxcblxuICAgIH07XG4gIH0pO1xuXG4gIG1vZHVsZS5kaXJlY3RpdmUoJ29uc0Nhcm91c2VsSXRlbScsIGZ1bmN0aW9uKCRvbnNlbikge1xuICAgIHJldHVybiB7XG4gICAgICByZXN0cmljdDogJ0UnLFxuICAgICAgY29tcGlsZTogZnVuY3Rpb24oZWxlbWVudCwgYXR0cnMpIHtcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uKHNjb3BlLCBlbGVtZW50LCBhdHRycykge1xuICAgICAgICAgIGlmIChzY29wZS4kbGFzdCkge1xuICAgICAgICAgICAgY29uc3QgY2Fyb3VzZWwgPSAkb25zZW4udXRpbC5maW5kUGFyZW50KGVsZW1lbnRbMF0sICdvbnMtY2Fyb3VzZWwnKTtcbiAgICAgICAgICAgIGNhcm91c2VsLl9zd2lwZXIuaW5pdCh7XG4gICAgICAgICAgICAgIHN3aXBlYWJsZTogY2Fyb3VzZWwuaGFzQXR0cmlidXRlKCdzd2lwZWFibGUnKSxcbiAgICAgICAgICAgICAgYXV0b1JlZnJlc2g6IGNhcm91c2VsLmhhc0F0dHJpYnV0ZSgnYXV0by1yZWZyZXNoJylcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICAgIH1cbiAgICB9O1xuICB9KTtcblxufSkoKTtcblxuIiwiLyoqXG4gKiBAZWxlbWVudCBvbnMtY2hlY2tib3hcbiAqL1xuXG4oZnVuY3Rpb24oKXtcbiAgJ3VzZSBzdHJpY3QnO1xuXG4gIGFuZ3VsYXIubW9kdWxlKCdvbnNlbicpLmRpcmVjdGl2ZSgnb25zQ2hlY2tib3gnLCBmdW5jdGlvbigkcGFyc2UpIHtcbiAgICByZXR1cm4ge1xuICAgICAgcmVzdHJpY3Q6ICdFJyxcbiAgICAgIHJlcGxhY2U6IGZhbHNlLFxuICAgICAgc2NvcGU6IGZhbHNlLFxuXG4gICAgICBsaW5rOiBmdW5jdGlvbihzY29wZSwgZWxlbWVudCwgYXR0cnMpIHtcbiAgICAgICAgbGV0IGVsID0gZWxlbWVudFswXTtcblxuICAgICAgICBjb25zdCBvbkNoYW5nZSA9ICgpID0+IHtcbiAgICAgICAgICAkcGFyc2UoYXR0cnMubmdNb2RlbCkuYXNzaWduKHNjb3BlLCBlbC5jaGVja2VkKTtcbiAgICAgICAgICBhdHRycy5uZ0NoYW5nZSAmJiBzY29wZS4kZXZhbChhdHRycy5uZ0NoYW5nZSk7XG4gICAgICAgICAgc2NvcGUuJHBhcmVudC4kZXZhbEFzeW5jKCk7XG4gICAgICAgIH07XG5cbiAgICAgICAgaWYgKGF0dHJzLm5nTW9kZWwpIHtcbiAgICAgICAgICBzY29wZS4kd2F0Y2goYXR0cnMubmdNb2RlbCwgdmFsdWUgPT4gZWwuY2hlY2tlZCA9IHZhbHVlKTtcbiAgICAgICAgICBlbGVtZW50Lm9uKCdjaGFuZ2UnLCBvbkNoYW5nZSk7XG4gICAgICAgIH1cblxuICAgICAgICBzY29wZS4kb24oJyRkZXN0cm95JywgKCkgPT4ge1xuICAgICAgICAgIGVsZW1lbnQub2ZmKCdjaGFuZ2UnLCBvbkNoYW5nZSk7XG4gICAgICAgICAgc2NvcGUgPSBlbGVtZW50ID0gYXR0cnMgPSBlbCA9IG51bGw7XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH07XG4gIH0pO1xufSkoKTtcbiIsIi8qKlxuICogQGVsZW1lbnQgb25zLWRpYWxvZ1xuICovXG5cbi8qKlxuICogQGF0dHJpYnV0ZSB2YXJcbiAqIEBpbml0b25seVxuICogQHR5cGUge1N0cmluZ31cbiAqIEBkZXNjcmlwdGlvblxuICogIFtlbl1WYXJpYWJsZSBuYW1lIHRvIHJlZmVyIHRoaXMgZGlhbG9nLlsvZW5dXG4gKiAgW2phXeOBk+OBruODgOOCpOOCouODreOCsOOCkuWPgueFp+OBmeOCi+OBn+OCgeOBruWQjeWJjeOCkuaMh+WumuOBl+OBvuOBmeOAglsvamFdXG4gKi9cblxuLyoqXG4gKiBAYXR0cmlidXRlIG9ucy1wcmVzaG93XG4gKiBAaW5pdG9ubHlcbiAqIEB0eXBlIHtFeHByZXNzaW9ufVxuICogQGRlc2NyaXB0aW9uXG4gKiAgW2VuXUFsbG93cyB5b3UgdG8gc3BlY2lmeSBjdXN0b20gYmVoYXZpb3Igd2hlbiB0aGUgXCJwcmVzaG93XCIgZXZlbnQgaXMgZmlyZWQuWy9lbl1cbiAqICBbamFdXCJwcmVzaG93XCLjgqTjg5njg7Pjg4jjgYznmbrngavjgZXjgozjgZ/mmYLjga7mjJnli5XjgpLni6zoh6rjgavmjIflrprjgafjgY3jgb7jgZnjgIJbL2phXVxuICovXG5cbi8qKlxuICogQGF0dHJpYnV0ZSBvbnMtcHJlaGlkZVxuICogQGluaXRvbmx5XG4gKiBAdHlwZSB7RXhwcmVzc2lvbn1cbiAqIEBkZXNjcmlwdGlvblxuICogIFtlbl1BbGxvd3MgeW91IHRvIHNwZWNpZnkgY3VzdG9tIGJlaGF2aW9yIHdoZW4gdGhlIFwicHJlaGlkZVwiIGV2ZW50IGlzIGZpcmVkLlsvZW5dXG4gKiAgW2phXVwicHJlaGlkZVwi44Kk44OZ44Oz44OI44GM55m654Gr44GV44KM44Gf5pmC44Gu5oyZ5YuV44KS54us6Ieq44Gr5oyH5a6a44Gn44GN44G+44GZ44CCWy9qYV1cbiAqL1xuXG4vKipcbiAqIEBhdHRyaWJ1dGUgb25zLXBvc3RzaG93XG4gKiBAaW5pdG9ubHlcbiAqIEB0eXBlIHtFeHByZXNzaW9ufVxuICogQGRlc2NyaXB0aW9uXG4gKiAgW2VuXUFsbG93cyB5b3UgdG8gc3BlY2lmeSBjdXN0b20gYmVoYXZpb3Igd2hlbiB0aGUgXCJwb3N0c2hvd1wiIGV2ZW50IGlzIGZpcmVkLlsvZW5dXG4gKiAgW2phXVwicG9zdHNob3dcIuOCpOODmeODs+ODiOOBjOeZuueBq+OBleOCjOOBn+aZguOBruaMmeWLleOCkueLrOiHquOBq+aMh+WumuOBp+OBjeOBvuOBmeOAglsvamFdXG4gKi9cblxuLyoqXG4gKiBAYXR0cmlidXRlIG9ucy1wb3N0aGlkZVxuICogQGluaXRvbmx5XG4gKiBAdHlwZSB7RXhwcmVzc2lvbn1cbiAqIEBkZXNjcmlwdGlvblxuICogIFtlbl1BbGxvd3MgeW91IHRvIHNwZWNpZnkgY3VzdG9tIGJlaGF2aW9yIHdoZW4gdGhlIFwicG9zdGhpZGVcIiBldmVudCBpcyBmaXJlZC5bL2VuXVxuICogIFtqYV1cInBvc3RoaWRlXCLjgqTjg5njg7Pjg4jjgYznmbrngavjgZXjgozjgZ/mmYLjga7mjJnli5XjgpLni6zoh6rjgavmjIflrprjgafjgY3jgb7jgZnjgIJbL2phXVxuICovXG5cbi8qKlxuICogQGF0dHJpYnV0ZSBvbnMtZGVzdHJveVxuICogQGluaXRvbmx5XG4gKiBAdHlwZSB7RXhwcmVzc2lvbn1cbiAqIEBkZXNjcmlwdGlvblxuICogIFtlbl1BbGxvd3MgeW91IHRvIHNwZWNpZnkgY3VzdG9tIGJlaGF2aW9yIHdoZW4gdGhlIFwiZGVzdHJveVwiIGV2ZW50IGlzIGZpcmVkLlsvZW5dXG4gKiAgW2phXVwiZGVzdHJveVwi44Kk44OZ44Oz44OI44GM55m654Gr44GV44KM44Gf5pmC44Gu5oyZ5YuV44KS54us6Ieq44Gr5oyH5a6a44Gn44GN44G+44GZ44CCWy9qYV1cbiAqL1xuXG4vKipcbiAqIEBtZXRob2Qgb25cbiAqIEBzaWduYXR1cmUgb24oZXZlbnROYW1lLCBsaXN0ZW5lcilcbiAqIEBkZXNjcmlwdGlvblxuICogICBbZW5dQWRkIGFuIGV2ZW50IGxpc3RlbmVyLlsvZW5dXG4gKiAgIFtqYV3jgqTjg5njg7Pjg4jjg6rjgrnjg4rjg7zjgpLov73liqDjgZfjgb7jgZnjgIJbL2phXVxuICogQHBhcmFtIHtTdHJpbmd9IGV2ZW50TmFtZVxuICogICBbZW5dTmFtZSBvZiB0aGUgZXZlbnQuWy9lbl1cbiAqICAgW2phXeOCpOODmeODs+ODiOWQjeOCkuaMh+WumuOBl+OBvuOBmeOAglsvamFdXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBsaXN0ZW5lclxuICogICBbZW5dRnVuY3Rpb24gdG8gZXhlY3V0ZSB3aGVuIHRoZSBldmVudCBpcyB0cmlnZ2VyZWQuWy9lbl1cbiAqICAgW2phXeOCpOODmeODs+ODiOOBjOeZuueBq+OBl+OBn+mam+OBq+WRvOOBs+WHuuOBleOCjOOCi+mWouaVsOOCquODluOCuOOCp+OCr+ODiOOCkuaMh+WumuOBl+OBvuOBmeOAglsvamFdXG4gKi9cblxuLyoqXG4gKiBAbWV0aG9kIG9uY2VcbiAqIEBzaWduYXR1cmUgb25jZShldmVudE5hbWUsIGxpc3RlbmVyKVxuICogQGRlc2NyaXB0aW9uXG4gKiAgW2VuXUFkZCBhbiBldmVudCBsaXN0ZW5lciB0aGF0J3Mgb25seSB0cmlnZ2VyZWQgb25jZS5bL2VuXVxuICogIFtqYV3kuIDluqbjgaDjgZHlkbzjgbPlh7rjgZXjgozjgovjgqTjg5njg7Pjg4jjg6rjgrnjg4rjgpLov73liqDjgZfjgb7jgZnjgIJbL2phXVxuICogQHBhcmFtIHtTdHJpbmd9IGV2ZW50TmFtZVxuICogICBbZW5dTmFtZSBvZiB0aGUgZXZlbnQuWy9lbl1cbiAqICAgW2phXeOCpOODmeODs+ODiOWQjeOCkuaMh+WumuOBl+OBvuOBmeOAglsvamFdXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBsaXN0ZW5lclxuICogICBbZW5dRnVuY3Rpb24gdG8gZXhlY3V0ZSB3aGVuIHRoZSBldmVudCBpcyB0cmlnZ2VyZWQuWy9lbl1cbiAqICAgW2phXeOCpOODmeODs+ODiOOBjOeZuueBq+OBl+OBn+mam+OBq+WRvOOBs+WHuuOBleOCjOOCi+mWouaVsOOCquODluOCuOOCp+OCr+ODiOOCkuaMh+WumuOBl+OBvuOBmeOAglsvamFdXG4gKi9cblxuLyoqXG4gKiBAbWV0aG9kIG9mZlxuICogQHNpZ25hdHVyZSBvZmYoZXZlbnROYW1lLCBbbGlzdGVuZXJdKVxuICogQGRlc2NyaXB0aW9uXG4gKiAgW2VuXVJlbW92ZSBhbiBldmVudCBsaXN0ZW5lci4gSWYgdGhlIGxpc3RlbmVyIGlzIG5vdCBzcGVjaWZpZWQgYWxsIGxpc3RlbmVycyBmb3IgdGhlIGV2ZW50IHR5cGUgd2lsbCBiZSByZW1vdmVkLlsvZW5dXG4gKiAgW2phXeOCpOODmeODs+ODiOODquOCueODiuODvOOCkuWJiumZpOOBl+OBvuOBmeOAguOCguOBl+OCpOODmeODs+ODiOODquOCueODiuODvOOBjOaMh+WumuOBleOCjOOBquOBi+OBo+OBn+WgtOWQiOOBq+OBr+OAgeOBneOBruOCpOODmeODs+ODiOOBq+e0kOS7mOOBhOOBpuOBhOOCi+OCpOODmeODs+ODiOODquOCueODiuODvOOBjOWFqOOBpuWJiumZpOOBleOCjOOBvuOBmeOAglsvamFdXG4gKiBAcGFyYW0ge1N0cmluZ30gZXZlbnROYW1lXG4gKiAgIFtlbl1OYW1lIG9mIHRoZSBldmVudC5bL2VuXVxuICogICBbamFd44Kk44OZ44Oz44OI5ZCN44KS5oyH5a6a44GX44G+44GZ44CCWy9qYV1cbiAqIEBwYXJhbSB7RnVuY3Rpb259IGxpc3RlbmVyXG4gKiAgIFtlbl1GdW5jdGlvbiB0byBleGVjdXRlIHdoZW4gdGhlIGV2ZW50IGlzIHRyaWdnZXJlZC5bL2VuXVxuICogICBbamFd44Kk44OZ44Oz44OI44GM55m654Gr44GX44Gf6Zqb44Gr5ZG844Gz5Ye644GV44KM44KL6Zai5pWw44Kq44OW44K444Kn44Kv44OI44KS5oyH5a6a44GX44G+44GZ44CCWy9qYV1cbiAqL1xuKGZ1bmN0aW9uKCkge1xuICAndXNlIHN0cmljdCc7XG5cbiAgYW5ndWxhci5tb2R1bGUoJ29uc2VuJykuZGlyZWN0aXZlKCdvbnNEaWFsb2cnLCBmdW5jdGlvbigkb25zZW4sIERpYWxvZ1ZpZXcpIHtcbiAgICByZXR1cm4ge1xuICAgICAgcmVzdHJpY3Q6ICdFJyxcbiAgICAgIHNjb3BlOiB0cnVlLFxuICAgICAgY29tcGlsZTogZnVuY3Rpb24oZWxlbWVudCwgYXR0cnMpIHtcblxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgIHByZTogZnVuY3Rpb24oc2NvcGUsIGVsZW1lbnQsIGF0dHJzKSB7XG5cbiAgICAgICAgICAgIHZhciBkaWFsb2cgPSBuZXcgRGlhbG9nVmlldyhzY29wZSwgZWxlbWVudCwgYXR0cnMpO1xuICAgICAgICAgICAgJG9uc2VuLmRlY2xhcmVWYXJBdHRyaWJ1dGUoYXR0cnMsIGRpYWxvZyk7XG4gICAgICAgICAgICAkb25zZW4ucmVnaXN0ZXJFdmVudEhhbmRsZXJzKGRpYWxvZywgJ3ByZXNob3cgcHJlaGlkZSBwb3N0c2hvdyBwb3N0aGlkZSBkZXN0cm95Jyk7XG4gICAgICAgICAgICAkb25zZW4uYWRkTW9kaWZpZXJNZXRob2RzRm9yQ3VzdG9tRWxlbWVudHMoZGlhbG9nLCBlbGVtZW50KTtcblxuICAgICAgICAgICAgZWxlbWVudC5kYXRhKCdvbnMtZGlhbG9nJywgZGlhbG9nKTtcbiAgICAgICAgICAgIHNjb3BlLiRvbignJGRlc3Ryb3knLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgZGlhbG9nLl9ldmVudHMgPSB1bmRlZmluZWQ7XG4gICAgICAgICAgICAgICRvbnNlbi5yZW1vdmVNb2RpZmllck1ldGhvZHMoZGlhbG9nKTtcbiAgICAgICAgICAgICAgZWxlbWVudC5kYXRhKCdvbnMtZGlhbG9nJywgdW5kZWZpbmVkKTtcbiAgICAgICAgICAgICAgZWxlbWVudCA9IG51bGw7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9LFxuXG4gICAgICAgICAgcG9zdDogZnVuY3Rpb24oc2NvcGUsIGVsZW1lbnQpIHtcbiAgICAgICAgICAgICRvbnNlbi5maXJlQ29tcG9uZW50RXZlbnQoZWxlbWVudFswXSwgJ2luaXQnKTtcbiAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgICB9XG4gICAgfTtcbiAgfSk7XG5cbn0pKCk7XG4iLCIoZnVuY3Rpb24oKSB7XG4gICd1c2Ugc3RyaWN0JztcblxuICB2YXIgbW9kdWxlID0gYW5ndWxhci5tb2R1bGUoJ29uc2VuJyk7XG5cbiAgbW9kdWxlLmRpcmVjdGl2ZSgnb25zRHVtbXlGb3JJbml0JywgZnVuY3Rpb24oJHJvb3RTY29wZSkge1xuICAgIHZhciBpc1JlYWR5ID0gZmFsc2U7XG5cbiAgICByZXR1cm4ge1xuICAgICAgcmVzdHJpY3Q6ICdFJyxcbiAgICAgIHJlcGxhY2U6IGZhbHNlLFxuXG4gICAgICBsaW5rOiB7XG4gICAgICAgIHBvc3Q6IGZ1bmN0aW9uKHNjb3BlLCBlbGVtZW50KSB7XG4gICAgICAgICAgaWYgKCFpc1JlYWR5KSB7XG4gICAgICAgICAgICBpc1JlYWR5ID0gdHJ1ZTtcbiAgICAgICAgICAgICRyb290U2NvcGUuJGJyb2FkY2FzdCgnJG9ucy1yZWFkeScpO1xuICAgICAgICAgIH1cbiAgICAgICAgICBlbGVtZW50LnJlbW92ZSgpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfTtcbiAgfSk7XG5cbn0pKCk7XG4iLCIvKipcbiAqIEBlbGVtZW50IG9ucy1mYWJcbiAqL1xuXG4vKipcbiAqIEBhdHRyaWJ1dGUgdmFyXG4gKiBAaW5pdG9ubHlcbiAqIEB0eXBlIHtTdHJpbmd9XG4gKiBAZGVzY3JpcHRpb25cbiAqICAgW2VuXVZhcmlhYmxlIG5hbWUgdG8gcmVmZXIgdGhlIGZsb2F0aW5nIGFjdGlvbiBidXR0b24uWy9lbl1cbiAqICAgW2phXeOBk+OBruODleODreODvOODhuOCo+ODs+OCsOOCouOCr+OCt+ODp+ODs+ODnOOCv+ODs+OCkuWPgueFp+OBmeOCi+OBn+OCgeOBruWkieaVsOWQjeOCkuOBl+OBpuOBl+OBvuOBmeOAglsvamFdXG4gKi9cblxuKGZ1bmN0aW9uKCkge1xuICAndXNlIHN0cmljdCc7XG5cbiAgdmFyIG1vZHVsZSA9IGFuZ3VsYXIubW9kdWxlKCdvbnNlbicpO1xuXG4gIG1vZHVsZS5kaXJlY3RpdmUoJ29uc0ZhYicsIGZ1bmN0aW9uKCRvbnNlbiwgRmFiVmlldykge1xuICAgIHJldHVybiB7XG4gICAgICByZXN0cmljdDogJ0UnLFxuICAgICAgcmVwbGFjZTogZmFsc2UsXG4gICAgICBzY29wZTogZmFsc2UsXG4gICAgICB0cmFuc2NsdWRlOiBmYWxzZSxcblxuICAgICAgY29tcGlsZTogZnVuY3Rpb24oZWxlbWVudCwgYXR0cnMpIHtcblxuICAgICAgICByZXR1cm4gZnVuY3Rpb24oc2NvcGUsIGVsZW1lbnQsIGF0dHJzKSB7XG4gICAgICAgICAgdmFyIGZhYiA9IG5ldyBGYWJWaWV3KHNjb3BlLCBlbGVtZW50LCBhdHRycyk7XG5cbiAgICAgICAgICBlbGVtZW50LmRhdGEoJ29ucy1mYWInLCBmYWIpO1xuXG4gICAgICAgICAgJG9uc2VuLmRlY2xhcmVWYXJBdHRyaWJ1dGUoYXR0cnMsIGZhYik7XG5cbiAgICAgICAgICBzY29wZS4kb24oJyRkZXN0cm95JywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBlbGVtZW50LmRhdGEoJ29ucy1mYWInLCB1bmRlZmluZWQpO1xuICAgICAgICAgICAgZWxlbWVudCA9IG51bGw7XG4gICAgICAgICAgfSk7XG5cbiAgICAgICAgICAkb25zZW4uZmlyZUNvbXBvbmVudEV2ZW50KGVsZW1lbnRbMF0sICdpbml0Jyk7XG4gICAgICAgIH07XG4gICAgICB9LFxuXG4gICAgfTtcbiAgfSk7XG5cbn0pKCk7XG5cbiIsIihmdW5jdGlvbigpIHtcbiAgJ3VzZSBzdHJpY3QnO1xuXG4gIHZhciBFVkVOVFMgPVxuICAgICgnZHJhZyBkcmFnbGVmdCBkcmFncmlnaHQgZHJhZ3VwIGRyYWdkb3duIGhvbGQgcmVsZWFzZSBzd2lwZSBzd2lwZWxlZnQgc3dpcGVyaWdodCAnICtcbiAgICAgICdzd2lwZXVwIHN3aXBlZG93biB0YXAgZG91YmxldGFwIHRvdWNoIHRyYW5zZm9ybSBwaW5jaCBwaW5jaGluIHBpbmNob3V0IHJvdGF0ZScpLnNwbGl0KC8gKy8pO1xuXG4gIGFuZ3VsYXIubW9kdWxlKCdvbnNlbicpLmRpcmVjdGl2ZSgnb25zR2VzdHVyZURldGVjdG9yJywgZnVuY3Rpb24oJG9uc2VuKSB7XG5cbiAgICB2YXIgc2NvcGVEZWYgPSBFVkVOVFMucmVkdWNlKGZ1bmN0aW9uKGRpY3QsIG5hbWUpIHtcbiAgICAgIGRpY3RbJ25nJyArIHRpdGxpemUobmFtZSldID0gJyYnO1xuICAgICAgcmV0dXJuIGRpY3Q7XG4gICAgfSwge30pO1xuXG4gICAgZnVuY3Rpb24gdGl0bGl6ZShzdHIpIHtcbiAgICAgIHJldHVybiBzdHIuY2hhckF0KDApLnRvVXBwZXJDYXNlKCkgKyBzdHIuc2xpY2UoMSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHtcbiAgICAgIHJlc3RyaWN0OiAnRScsXG4gICAgICBzY29wZTogc2NvcGVEZWYsXG5cbiAgICAgIC8vIE5PVEU6IFRoaXMgZWxlbWVudCBtdXN0IGNvZXhpc3RzIHdpdGggbmctY29udHJvbGxlci5cbiAgICAgIC8vIERvIG5vdCB1c2UgaXNvbGF0ZWQgc2NvcGUgYW5kIHRlbXBsYXRlJ3MgbmctdHJhbnNjbHVkZS5cbiAgICAgIHJlcGxhY2U6IGZhbHNlLFxuICAgICAgdHJhbnNjbHVkZTogdHJ1ZSxcblxuICAgICAgY29tcGlsZTogZnVuY3Rpb24oZWxlbWVudCwgYXR0cnMpIHtcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uIGxpbmsoc2NvcGUsIGVsZW1lbnQsIGF0dHJzLCBfLCB0cmFuc2NsdWRlKSB7XG5cbiAgICAgICAgICB0cmFuc2NsdWRlKHNjb3BlLiRwYXJlbnQsIGZ1bmN0aW9uKGNsb25lZCkge1xuICAgICAgICAgICAgZWxlbWVudC5hcHBlbmQoY2xvbmVkKTtcbiAgICAgICAgICB9KTtcblxuICAgICAgICAgIHZhciBoYW5kbGVyID0gZnVuY3Rpb24oZXZlbnQpIHtcbiAgICAgICAgICAgIHZhciBhdHRyID0gJ25nJyArIHRpdGxpemUoZXZlbnQudHlwZSk7XG5cbiAgICAgICAgICAgIGlmIChhdHRyIGluIHNjb3BlRGVmKSB7XG4gICAgICAgICAgICAgIHNjb3BlW2F0dHJdKHskZXZlbnQ6IGV2ZW50fSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfTtcblxuICAgICAgICAgIHZhciBnZXN0dXJlRGV0ZWN0b3I7XG5cbiAgICAgICAgICBzZXRJbW1lZGlhdGUoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBnZXN0dXJlRGV0ZWN0b3IgPSBlbGVtZW50WzBdLl9nZXN0dXJlRGV0ZWN0b3I7XG4gICAgICAgICAgICBnZXN0dXJlRGV0ZWN0b3Iub24oRVZFTlRTLmpvaW4oJyAnKSwgaGFuZGxlcik7XG4gICAgICAgICAgfSk7XG5cbiAgICAgICAgICAkb25zZW4uY2xlYW5lci5vbkRlc3Ryb3koc2NvcGUsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgZ2VzdHVyZURldGVjdG9yLm9mZihFVkVOVFMuam9pbignICcpLCBoYW5kbGVyKTtcbiAgICAgICAgICAgICRvbnNlbi5jbGVhckNvbXBvbmVudCh7XG4gICAgICAgICAgICAgIHNjb3BlOiBzY29wZSxcbiAgICAgICAgICAgICAgZWxlbWVudDogZWxlbWVudCxcbiAgICAgICAgICAgICAgYXR0cnM6IGF0dHJzXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIGdlc3R1cmVEZXRlY3Rvci5lbGVtZW50ID0gc2NvcGUgPSBlbGVtZW50ID0gYXR0cnMgPSBudWxsO1xuICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgJG9uc2VuLmZpcmVDb21wb25lbnRFdmVudChlbGVtZW50WzBdLCAnaW5pdCcpO1xuICAgICAgICB9O1xuICAgICAgfVxuICAgIH07XG4gIH0pO1xufSkoKTtcblxuIiwiXG4vKipcbiAqIEBlbGVtZW50IG9ucy1pY29uXG4gKi9cblxuXG4oZnVuY3Rpb24oKSB7XG4gICd1c2Ugc3RyaWN0JztcblxuICBhbmd1bGFyLm1vZHVsZSgnb25zZW4nKS5kaXJlY3RpdmUoJ29uc0ljb24nLCBmdW5jdGlvbigkb25zZW4sIEdlbmVyaWNWaWV3KSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHJlc3RyaWN0OiAnRScsXG5cbiAgICAgIGNvbXBpbGU6IGZ1bmN0aW9uKGVsZW1lbnQsIGF0dHJzKSB7XG5cbiAgICAgICAgaWYgKGF0dHJzLmljb24uaW5kZXhPZigne3snKSAhPT0gLTEpIHtcbiAgICAgICAgICBhdHRycy4kb2JzZXJ2ZSgnaWNvbicsICgpID0+IHtcbiAgICAgICAgICAgIHNldEltbWVkaWF0ZSgoKSA9PiBlbGVtZW50WzBdLl91cGRhdGUoKSk7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gKHNjb3BlLCBlbGVtZW50LCBhdHRycykgPT4ge1xuICAgICAgICAgIEdlbmVyaWNWaWV3LnJlZ2lzdGVyKHNjb3BlLCBlbGVtZW50LCBhdHRycywge1xuICAgICAgICAgICAgdmlld0tleTogJ29ucy1pY29uJ1xuICAgICAgICAgIH0pO1xuICAgICAgICAgIC8vICRvbnNlbi5maXJlQ29tcG9uZW50RXZlbnQoZWxlbWVudFswXSwgJ2luaXQnKTtcbiAgICAgICAgfTtcblxuICAgICAgfVxuXG4gICAgfTtcbiAgfSk7XG5cbn0pKCk7XG5cbiIsIi8qKlxuICogQGVsZW1lbnQgb25zLWlmLW9yaWVudGF0aW9uXG4gKiBAY2F0ZWdvcnkgY29uZGl0aW9uYWxcbiAqIEBkZXNjcmlwdGlvblxuICogICBbZW5dQ29uZGl0aW9uYWxseSBkaXNwbGF5IGNvbnRlbnQgZGVwZW5kaW5nIG9uIHNjcmVlbiBvcmllbnRhdGlvbi4gVmFsaWQgdmFsdWVzIGFyZSBwb3J0cmFpdCBhbmQgbGFuZHNjYXBlLiBEaWZmZXJlbnQgZnJvbSBvdGhlciBjb21wb25lbnRzLCB0aGlzIGNvbXBvbmVudCBpcyB1c2VkIGFzIGF0dHJpYnV0ZSBpbiBhbnkgZWxlbWVudC5bL2VuXVxuICogICBbamFd55S76Z2i44Gu5ZCR44GN44Gr5b+c44GY44Gm44Kz44Oz44OG44Oz44OE44Gu5Yi25b6h44KS6KGM44GE44G+44GZ44CCcG9ydHJhaXTjgoLjgZfjgY/jga9sYW5kc2NhcGXjgpLmjIflrprjgafjgY3jgb7jgZnjgILjgZnjgbnjgabjga7opoHntKDjga7lsZ7mgKfjgavkvb/nlKjjgafjgY3jgb7jgZnjgIJbL2phXVxuICogQHNlZWFsc28gb25zLWlmLXBsYXRmb3JtIFtlbl1vbnMtaWYtcGxhdGZvcm0gY29tcG9uZW50Wy9lbl1bamFdb25zLWlmLXBsYXRmb3Jt44Kz44Oz44Od44O844ON44Oz44OIWy9qYV1cbiAqIEBleGFtcGxlXG4gKiA8ZGl2IG9ucy1pZi1vcmllbnRhdGlvbj1cInBvcnRyYWl0XCI+XG4gKiAgIDxwPlRoaXMgd2lsbCBvbmx5IGJlIHZpc2libGUgaW4gcG9ydHJhaXQgbW9kZS48L3A+XG4gKiA8L2Rpdj5cbiAqL1xuXG4vKipcbiAqIEBhdHRyaWJ1dGUgb25zLWlmLW9yaWVudGF0aW9uXG4gKiBAaW5pdG9ubHlcbiAqIEB0eXBlIHtTdHJpbmd9XG4gKiBAZGVzY3JpcHRpb25cbiAqICAgW2VuXUVpdGhlciBcInBvcnRyYWl0XCIgb3IgXCJsYW5kc2NhcGVcIi5bL2VuXVxuICogICBbamFdcG9ydHJhaXTjgoLjgZfjgY/jga9sYW5kc2NhcGXjgpLmjIflrprjgZfjgb7jgZnjgIJbL2phXVxuICovXG5cbihmdW5jdGlvbigpe1xuICAndXNlIHN0cmljdCc7XG5cbiAgdmFyIG1vZHVsZSA9IGFuZ3VsYXIubW9kdWxlKCdvbnNlbicpO1xuXG4gIG1vZHVsZS5kaXJlY3RpdmUoJ29uc0lmT3JpZW50YXRpb24nLCBmdW5jdGlvbigkb25zZW4sICRvbnNHbG9iYWwpIHtcbiAgICByZXR1cm4ge1xuICAgICAgcmVzdHJpY3Q6ICdBJyxcbiAgICAgIHJlcGxhY2U6IGZhbHNlLFxuXG4gICAgICAvLyBOT1RFOiBUaGlzIGVsZW1lbnQgbXVzdCBjb2V4aXN0cyB3aXRoIG5nLWNvbnRyb2xsZXIuXG4gICAgICAvLyBEbyBub3QgdXNlIGlzb2xhdGVkIHNjb3BlIGFuZCB0ZW1wbGF0ZSdzIG5nLXRyYW5zY2x1ZGUuXG4gICAgICB0cmFuc2NsdWRlOiBmYWxzZSxcbiAgICAgIHNjb3BlOiBmYWxzZSxcblxuICAgICAgY29tcGlsZTogZnVuY3Rpb24oZWxlbWVudCkge1xuICAgICAgICBlbGVtZW50LmNzcygnZGlzcGxheScsICdub25lJyk7XG5cbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uKHNjb3BlLCBlbGVtZW50LCBhdHRycykge1xuICAgICAgICAgIGF0dHJzLiRvYnNlcnZlKCdvbnNJZk9yaWVudGF0aW9uJywgdXBkYXRlKTtcbiAgICAgICAgICAkb25zR2xvYmFsLm9yaWVudGF0aW9uLm9uKCdjaGFuZ2UnLCB1cGRhdGUpO1xuXG4gICAgICAgICAgdXBkYXRlKCk7XG5cbiAgICAgICAgICAkb25zZW4uY2xlYW5lci5vbkRlc3Ryb3koc2NvcGUsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgJG9uc0dsb2JhbC5vcmllbnRhdGlvbi5vZmYoJ2NoYW5nZScsIHVwZGF0ZSk7XG5cbiAgICAgICAgICAgICRvbnNlbi5jbGVhckNvbXBvbmVudCh7XG4gICAgICAgICAgICAgIGVsZW1lbnQ6IGVsZW1lbnQsXG4gICAgICAgICAgICAgIHNjb3BlOiBzY29wZSxcbiAgICAgICAgICAgICAgYXR0cnM6IGF0dHJzXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIGVsZW1lbnQgPSBzY29wZSA9IGF0dHJzID0gbnVsbDtcbiAgICAgICAgICB9KTtcblxuICAgICAgICAgIGZ1bmN0aW9uIHVwZGF0ZSgpIHtcbiAgICAgICAgICAgIHZhciB1c2VyT3JpZW50YXRpb24gPSAoJycgKyBhdHRycy5vbnNJZk9yaWVudGF0aW9uKS50b0xvd2VyQ2FzZSgpO1xuICAgICAgICAgICAgdmFyIG9yaWVudGF0aW9uID0gZ2V0TGFuZHNjYXBlT3JQb3J0cmFpdCgpO1xuXG4gICAgICAgICAgICBpZiAodXNlck9yaWVudGF0aW9uID09PSAncG9ydHJhaXQnIHx8IHVzZXJPcmllbnRhdGlvbiA9PT0gJ2xhbmRzY2FwZScpIHtcbiAgICAgICAgICAgICAgaWYgKHVzZXJPcmllbnRhdGlvbiA9PT0gb3JpZW50YXRpb24pIHtcbiAgICAgICAgICAgICAgICBlbGVtZW50LmNzcygnZGlzcGxheScsICcnKTtcbiAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBlbGVtZW50LmNzcygnZGlzcGxheScsICdub25lJyk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG5cbiAgICAgICAgICBmdW5jdGlvbiBnZXRMYW5kc2NhcGVPclBvcnRyYWl0KCkge1xuICAgICAgICAgICAgcmV0dXJuICRvbnNHbG9iYWwub3JpZW50YXRpb24uaXNQb3J0cmFpdCgpID8gJ3BvcnRyYWl0JyA6ICdsYW5kc2NhcGUnO1xuICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICAgIH1cbiAgICB9O1xuICB9KTtcbn0pKCk7XG5cbiIsIi8qKlxuICogQGVsZW1lbnQgb25zLWlmLXBsYXRmb3JtXG4gKiBAY2F0ZWdvcnkgY29uZGl0aW9uYWxcbiAqIEBkZXNjcmlwdGlvblxuICogICAgW2VuXUNvbmRpdGlvbmFsbHkgZGlzcGxheSBjb250ZW50IGRlcGVuZGluZyBvbiB0aGUgcGxhdGZvcm0gLyBicm93c2VyLiBWYWxpZCB2YWx1ZXMgYXJlIFwib3BlcmFcIiwgXCJmaXJlZm94XCIsIFwic2FmYXJpXCIsIFwiY2hyb21lXCIsIFwiaWVcIiwgXCJlZGdlXCIsIFwiYW5kcm9pZFwiLCBcImJsYWNrYmVycnlcIiwgXCJpb3NcIiBhbmQgXCJ3cFwiLlsvZW5dXG4gKiAgICBbamFd44OX44Op44OD44OI44OV44Kp44O844Og44KE44OW44Op44Km44K244O844Gr5b+c44GY44Gm44Kz44Oz44OG44Oz44OE44Gu5Yi25b6h44KS44GK44GT44Gq44GE44G+44GZ44CCb3BlcmEsIGZpcmVmb3gsIHNhZmFyaSwgY2hyb21lLCBpZSwgZWRnZSwgYW5kcm9pZCwgYmxhY2tiZXJyeSwgaW9zLCB3cOOBruOBhOOBmuOCjOOBi+OBruWApOOCkuepuueZveWMuuWIh+OCiuOBp+ikh+aVsOaMh+WumuOBp+OBjeOBvuOBmeOAglsvamFdXG4gKiBAc2VlYWxzbyBvbnMtaWYtb3JpZW50YXRpb24gW2VuXW9ucy1pZi1vcmllbnRhdGlvbiBjb21wb25lbnRbL2VuXVtqYV1vbnMtaWYtb3JpZW50YXRpb27jgrPjg7Pjg53jg7zjg43jg7Pjg4hbL2phXVxuICogQGV4YW1wbGVcbiAqIDxkaXYgb25zLWlmLXBsYXRmb3JtPVwiYW5kcm9pZFwiPlxuICogICAuLi5cbiAqIDwvZGl2PlxuICovXG5cbi8qKlxuICogQGF0dHJpYnV0ZSBvbnMtaWYtcGxhdGZvcm1cbiAqIEB0eXBlIHtTdHJpbmd9XG4gKiBAaW5pdG9ubHlcbiAqIEBkZXNjcmlwdGlvblxuICogICBbZW5dT25lIG9yIG11bHRpcGxlIHNwYWNlIHNlcGFyYXRlZCB2YWx1ZXM6IFwib3BlcmFcIiwgXCJmaXJlZm94XCIsIFwic2FmYXJpXCIsIFwiY2hyb21lXCIsIFwiaWVcIiwgXCJlZGdlXCIsIFwiYW5kcm9pZFwiLCBcImJsYWNrYmVycnlcIiwgXCJpb3NcIiBvciBcIndwXCIuWy9lbl1cbiAqICAgW2phXVwib3BlcmFcIiwgXCJmaXJlZm94XCIsIFwic2FmYXJpXCIsIFwiY2hyb21lXCIsIFwiaWVcIiwgXCJlZGdlXCIsIFwiYW5kcm9pZFwiLCBcImJsYWNrYmVycnlcIiwgXCJpb3NcIiwgXCJ3cFwi44Gu44GE44Ga44KM44GL56m655m95Yy65YiH44KK44Gn6KSH5pWw5oyH5a6a44Gn44GN44G+44GZ44CCWy9qYV1cbiAqL1xuXG4oZnVuY3Rpb24oKSB7XG4gICd1c2Ugc3RyaWN0JztcblxuICB2YXIgbW9kdWxlID0gYW5ndWxhci5tb2R1bGUoJ29uc2VuJyk7XG5cbiAgbW9kdWxlLmRpcmVjdGl2ZSgnb25zSWZQbGF0Zm9ybScsIGZ1bmN0aW9uKCRvbnNlbikge1xuICAgIHJldHVybiB7XG4gICAgICByZXN0cmljdDogJ0EnLFxuICAgICAgcmVwbGFjZTogZmFsc2UsXG5cbiAgICAgIC8vIE5PVEU6IFRoaXMgZWxlbWVudCBtdXN0IGNvZXhpc3RzIHdpdGggbmctY29udHJvbGxlci5cbiAgICAgIC8vIERvIG5vdCB1c2UgaXNvbGF0ZWQgc2NvcGUgYW5kIHRlbXBsYXRlJ3MgbmctdHJhbnNjbHVkZS5cbiAgICAgIHRyYW5zY2x1ZGU6IGZhbHNlLFxuICAgICAgc2NvcGU6IGZhbHNlLFxuXG4gICAgICBjb21waWxlOiBmdW5jdGlvbihlbGVtZW50KSB7XG4gICAgICAgIGVsZW1lbnQuY3NzKCdkaXNwbGF5JywgJ25vbmUnKTtcblxuICAgICAgICB2YXIgcGxhdGZvcm0gPSBnZXRQbGF0Zm9ybVN0cmluZygpO1xuXG4gICAgICAgIHJldHVybiBmdW5jdGlvbihzY29wZSwgZWxlbWVudCwgYXR0cnMpIHtcbiAgICAgICAgICBhdHRycy4kb2JzZXJ2ZSgnb25zSWZQbGF0Zm9ybScsIGZ1bmN0aW9uKHVzZXJQbGF0Zm9ybSkge1xuICAgICAgICAgICAgaWYgKHVzZXJQbGF0Zm9ybSkge1xuICAgICAgICAgICAgICB1cGRhdGUoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KTtcblxuICAgICAgICAgIHVwZGF0ZSgpO1xuXG4gICAgICAgICAgJG9uc2VuLmNsZWFuZXIub25EZXN0cm95KHNjb3BlLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICRvbnNlbi5jbGVhckNvbXBvbmVudCh7XG4gICAgICAgICAgICAgIGVsZW1lbnQ6IGVsZW1lbnQsXG4gICAgICAgICAgICAgIHNjb3BlOiBzY29wZSxcbiAgICAgICAgICAgICAgYXR0cnM6IGF0dHJzXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIGVsZW1lbnQgPSBzY29wZSA9IGF0dHJzID0gbnVsbDtcbiAgICAgICAgICB9KTtcblxuICAgICAgICAgIGZ1bmN0aW9uIHVwZGF0ZSgpIHtcbiAgICAgICAgICAgIHZhciB1c2VyUGxhdGZvcm1zID0gYXR0cnMub25zSWZQbGF0Zm9ybS50b0xvd2VyQ2FzZSgpLnRyaW0oKS5zcGxpdCgvXFxzKy8pO1xuICAgICAgICAgICAgaWYgKHVzZXJQbGF0Zm9ybXMuaW5kZXhPZihwbGF0Zm9ybS50b0xvd2VyQ2FzZSgpKSA+PSAwKSB7XG4gICAgICAgICAgICAgIGVsZW1lbnQuY3NzKCdkaXNwbGF5JywgJ2Jsb2NrJyk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICBlbGVtZW50LmNzcygnZGlzcGxheScsICdub25lJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9O1xuXG4gICAgICAgIGZ1bmN0aW9uIGdldFBsYXRmb3JtU3RyaW5nKCkge1xuXG4gICAgICAgICAgaWYgKG5hdmlnYXRvci51c2VyQWdlbnQubWF0Y2goL0FuZHJvaWQvaSkpIHtcbiAgICAgICAgICAgIHJldHVybiAnYW5kcm9pZCc7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgaWYgKChuYXZpZ2F0b3IudXNlckFnZW50Lm1hdGNoKC9CbGFja0JlcnJ5L2kpKSB8fCAobmF2aWdhdG9yLnVzZXJBZ2VudC5tYXRjaCgvUklNIFRhYmxldCBPUy9pKSkgfHwgKG5hdmlnYXRvci51c2VyQWdlbnQubWF0Y2goL0JCMTAvaSkpKSB7XG4gICAgICAgICAgICByZXR1cm4gJ2JsYWNrYmVycnknO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGlmIChuYXZpZ2F0b3IudXNlckFnZW50Lm1hdGNoKC9pUGhvbmV8aVBhZHxpUG9kL2kpKSB7XG4gICAgICAgICAgICByZXR1cm4gJ2lvcyc7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgaWYgKG5hdmlnYXRvci51c2VyQWdlbnQubWF0Y2goL1dpbmRvd3MgUGhvbmV8SUVNb2JpbGV8V1BEZXNrdG9wL2kpKSB7XG4gICAgICAgICAgICByZXR1cm4gJ3dwJztcbiAgICAgICAgICB9XG5cbiAgICAgICAgICAvLyBPcGVyYSA4LjArIChVQSBkZXRlY3Rpb24gdG8gZGV0ZWN0IEJsaW5rL3Y4LXBvd2VyZWQgT3BlcmEpXG4gICAgICAgICAgdmFyIGlzT3BlcmEgPSAhIXdpbmRvdy5vcGVyYSB8fCBuYXZpZ2F0b3IudXNlckFnZW50LmluZGV4T2YoJyBPUFIvJykgPj0gMDtcbiAgICAgICAgICBpZiAoaXNPcGVyYSkge1xuICAgICAgICAgICAgcmV0dXJuICdvcGVyYSc7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgdmFyIGlzRmlyZWZveCA9IHR5cGVvZiBJbnN0YWxsVHJpZ2dlciAhPT0gJ3VuZGVmaW5lZCc7ICAgLy8gRmlyZWZveCAxLjArXG4gICAgICAgICAgaWYgKGlzRmlyZWZveCkge1xuICAgICAgICAgICAgcmV0dXJuICdmaXJlZm94JztcbiAgICAgICAgICB9XG5cbiAgICAgICAgICB2YXIgaXNTYWZhcmkgPSBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwod2luZG93LkhUTUxFbGVtZW50KS5pbmRleE9mKCdDb25zdHJ1Y3RvcicpID4gMDtcbiAgICAgICAgICAvLyBBdCBsZWFzdCBTYWZhcmkgMys6IFwiW29iamVjdCBIVE1MRWxlbWVudENvbnN0cnVjdG9yXVwiXG4gICAgICAgICAgaWYgKGlzU2FmYXJpKSB7XG4gICAgICAgICAgICByZXR1cm4gJ3NhZmFyaSc7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgdmFyIGlzRWRnZSA9IG5hdmlnYXRvci51c2VyQWdlbnQuaW5kZXhPZignIEVkZ2UvJykgPj0gMDtcbiAgICAgICAgICBpZiAoaXNFZGdlKSB7XG4gICAgICAgICAgICByZXR1cm4gJ2VkZ2UnO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIHZhciBpc0Nocm9tZSA9ICEhd2luZG93LmNocm9tZSAmJiAhaXNPcGVyYSAmJiAhaXNFZGdlOyAvLyBDaHJvbWUgMStcbiAgICAgICAgICBpZiAoaXNDaHJvbWUpIHtcbiAgICAgICAgICAgIHJldHVybiAnY2hyb21lJztcbiAgICAgICAgICB9XG5cbiAgICAgICAgICB2YXIgaXNJRSA9IC8qQGNjX29uIUAqL2ZhbHNlIHx8ICEhZG9jdW1lbnQuZG9jdW1lbnRNb2RlOyAvLyBBdCBsZWFzdCBJRTZcbiAgICAgICAgICBpZiAoaXNJRSkge1xuICAgICAgICAgICAgcmV0dXJuICdpZSc7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgcmV0dXJuICd1bmtub3duJztcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH07XG4gIH0pO1xufSkoKTtcbiIsIi8qKlxuICogQGVsZW1lbnQgb25zLWlucHV0XG4gKi9cblxuKGZ1bmN0aW9uKCl7XG4gICd1c2Ugc3RyaWN0JztcblxuICBhbmd1bGFyLm1vZHVsZSgnb25zZW4nKS5kaXJlY3RpdmUoJ29uc0lucHV0JywgZnVuY3Rpb24oJHBhcnNlKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHJlc3RyaWN0OiAnRScsXG4gICAgICByZXBsYWNlOiBmYWxzZSxcbiAgICAgIHNjb3BlOiBmYWxzZSxcblxuICAgICAgbGluazogZnVuY3Rpb24oc2NvcGUsIGVsZW1lbnQsIGF0dHJzKSB7XG4gICAgICAgIGxldCBlbCA9IGVsZW1lbnRbMF07XG5cbiAgICAgICAgY29uc3Qgb25JbnB1dCA9ICgpID0+IHtcbiAgICAgICAgICAkcGFyc2UoYXR0cnMubmdNb2RlbCkuYXNzaWduKHNjb3BlLCBlbC50eXBlID09PSAnbnVtYmVyJyA/IE51bWJlcihlbC52YWx1ZSkgOiBlbC52YWx1ZSk7XG4gICAgICAgICAgYXR0cnMubmdDaGFuZ2UgJiYgc2NvcGUuJGV2YWwoYXR0cnMubmdDaGFuZ2UpO1xuICAgICAgICAgIHNjb3BlLiRwYXJlbnQuJGV2YWxBc3luYygpO1xuICAgICAgICB9O1xuXG4gICAgICAgIGlmIChhdHRycy5uZ01vZGVsKSB7XG4gICAgICAgICAgc2NvcGUuJHdhdGNoKGF0dHJzLm5nTW9kZWwsICh2YWx1ZSkgPT4ge1xuICAgICAgICAgICAgaWYgKHR5cGVvZiB2YWx1ZSAhPT0gJ3VuZGVmaW5lZCcgJiYgdmFsdWUgIT09IGVsLnZhbHVlKSB7XG4gICAgICAgICAgICAgIGVsLnZhbHVlID0gdmFsdWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSk7XG5cbiAgICAgICAgICBlbGVtZW50Lm9uKCdpbnB1dCcsIG9uSW5wdXQpXG4gICAgICAgIH1cblxuICAgICAgICBzY29wZS4kb24oJyRkZXN0cm95JywgKCkgPT4ge1xuICAgICAgICAgIGVsZW1lbnQub2ZmKCdpbnB1dCcsIG9uSW5wdXQpXG4gICAgICAgICAgc2NvcGUgPSBlbGVtZW50ID0gYXR0cnMgPSBlbCA9IG51bGw7XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH07XG4gIH0pO1xufSkoKTtcbiIsIi8qKlxuICogQGVsZW1lbnQgb25zLWtleWJvYXJkLWFjdGl2ZVxuICogQGNhdGVnb3J5IGZvcm1cbiAqIEBkZXNjcmlwdGlvblxuICogICBbZW5dXG4gKiAgICAgQ29uZGl0aW9uYWxseSBkaXNwbGF5IGNvbnRlbnQgZGVwZW5kaW5nIG9uIGlmIHRoZSBzb2Z0d2FyZSBrZXlib2FyZCBpcyB2aXNpYmxlIG9yIGhpZGRlbi5cbiAqICAgICBUaGlzIGNvbXBvbmVudCByZXF1aXJlcyBjb3Jkb3ZhIGFuZCB0aGF0IHRoZSBjb20uaW9uaWMua2V5Ym9hcmQgcGx1Z2luIGlzIGluc3RhbGxlZC5cbiAqICAgWy9lbl1cbiAqICAgW2phXVxuICogICAgIOOCveODleODiOOCpuOCp+OCouOCreODvOODnOODvOODieOBjOihqOekuuOBleOCjOOBpuOBhOOCi+OBi+OBqeOBhuOBi+OBp+OAgeOCs+ODs+ODhuODs+ODhOOCkuihqOekuuOBmeOCi+OBi+OBqeOBhuOBi+OCkuWIh+OCiuabv+OBiOOCi+OBk+OBqOOBjOWHuuadpeOBvuOBmeOAglxuICogICAgIOOBk+OBruOCs+ODs+ODneODvOODjeODs+ODiOOBr+OAgUNvcmRvdmHjgoRjb20uaW9uaWMua2V5Ym9hcmTjg5fjg6njgrDjgqTjg7PjgpLlv4XopoHjgajjgZfjgb7jgZnjgIJcbiAqICAgWy9qYV1cbiAqIEBleGFtcGxlXG4gKiA8ZGl2IG9ucy1rZXlib2FyZC1hY3RpdmU+XG4gKiAgIFRoaXMgd2lsbCBvbmx5IGJlIGRpc3BsYXllZCBpZiB0aGUgc29mdHdhcmUga2V5Ym9hcmQgaXMgb3Blbi5cbiAqIDwvZGl2PlxuICogPGRpdiBvbnMta2V5Ym9hcmQtaW5hY3RpdmU+XG4gKiAgIFRoZXJlIGlzIGFsc28gYSBjb21wb25lbnQgdGhhdCBkb2VzIHRoZSBvcHBvc2l0ZS5cbiAqIDwvZGl2PlxuICovXG5cbi8qKlxuICogQGF0dHJpYnV0ZSBvbnMta2V5Ym9hcmQtYWN0aXZlXG4gKiBAZGVzY3JpcHRpb25cbiAqICAgW2VuXVRoZSBjb250ZW50IG9mIHRhZ3Mgd2l0aCB0aGlzIGF0dHJpYnV0ZSB3aWxsIGJlIHZpc2libGUgd2hlbiB0aGUgc29mdHdhcmUga2V5Ym9hcmQgaXMgb3Blbi5bL2VuXVxuICogICBbamFd44GT44Gu5bGe5oCn44GM44Gk44GE44Gf6KaB57Sg44Gv44CB44K944OV44OI44Km44Kn44Ki44Kt44O844Oc44O844OJ44GM6KGo56S644GV44KM44Gf5pmC44Gr5Yid44KB44Gm6KGo56S644GV44KM44G+44GZ44CCWy9qYV1cbiAqL1xuXG4vKipcbiAqIEBhdHRyaWJ1dGUgb25zLWtleWJvYXJkLWluYWN0aXZlXG4gKiBAZGVzY3JpcHRpb25cbiAqICAgW2VuXVRoZSBjb250ZW50IG9mIHRhZ3Mgd2l0aCB0aGlzIGF0dHJpYnV0ZSB3aWxsIGJlIHZpc2libGUgd2hlbiB0aGUgc29mdHdhcmUga2V5Ym9hcmQgaXMgaGlkZGVuLlsvZW5dXG4gKiAgIFtqYV3jgZPjga7lsZ7mgKfjgYzjgaTjgYTjgZ/opoHntKDjga/jgIHjgr3jg5Xjg4jjgqbjgqfjgqLjgq3jg7zjg5zjg7zjg4njgYzpmqDjgozjgabjgYTjgovmmYLjga7jgb/ooajnpLrjgZXjgozjgb7jgZnjgIJbL2phXVxuICovXG5cbihmdW5jdGlvbigpIHtcbiAgJ3VzZSBzdHJpY3QnO1xuXG4gIHZhciBtb2R1bGUgPSBhbmd1bGFyLm1vZHVsZSgnb25zZW4nKTtcblxuICB2YXIgY29tcGlsZUZ1bmN0aW9uID0gZnVuY3Rpb24oc2hvdywgJG9uc2VuKSB7XG4gICAgcmV0dXJuIGZ1bmN0aW9uKGVsZW1lbnQpIHtcbiAgICAgIHJldHVybiBmdW5jdGlvbihzY29wZSwgZWxlbWVudCwgYXR0cnMpIHtcbiAgICAgICAgdmFyIGRpc3BTaG93ID0gc2hvdyA/ICdibG9jaycgOiAnbm9uZScsXG4gICAgICAgICAgICBkaXNwSGlkZSA9IHNob3cgPyAnbm9uZScgOiAnYmxvY2snO1xuXG4gICAgICAgIHZhciBvblNob3cgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICBlbGVtZW50LmNzcygnZGlzcGxheScsIGRpc3BTaG93KTtcbiAgICAgICAgfTtcblxuICAgICAgICB2YXIgb25IaWRlID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgZWxlbWVudC5jc3MoJ2Rpc3BsYXknLCBkaXNwSGlkZSk7XG4gICAgICAgIH07XG5cbiAgICAgICAgdmFyIG9uSW5pdCA9IGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgICBpZiAoZS52aXNpYmxlKSB7XG4gICAgICAgICAgICBvblNob3coKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgb25IaWRlKCk7XG4gICAgICAgICAgfVxuICAgICAgICB9O1xuXG4gICAgICAgIG9ucy5zb2Z0d2FyZUtleWJvYXJkLm9uKCdzaG93Jywgb25TaG93KTtcbiAgICAgICAgb25zLnNvZnR3YXJlS2V5Ym9hcmQub24oJ2hpZGUnLCBvbkhpZGUpO1xuICAgICAgICBvbnMuc29mdHdhcmVLZXlib2FyZC5vbignaW5pdCcsIG9uSW5pdCk7XG5cbiAgICAgICAgaWYgKG9ucy5zb2Z0d2FyZUtleWJvYXJkLl92aXNpYmxlKSB7XG4gICAgICAgICAgb25TaG93KCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgb25IaWRlKCk7XG4gICAgICAgIH1cblxuICAgICAgICAkb25zZW4uY2xlYW5lci5vbkRlc3Ryb3koc2NvcGUsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgIG9ucy5zb2Z0d2FyZUtleWJvYXJkLm9mZignc2hvdycsIG9uU2hvdyk7XG4gICAgICAgICAgb25zLnNvZnR3YXJlS2V5Ym9hcmQub2ZmKCdoaWRlJywgb25IaWRlKTtcbiAgICAgICAgICBvbnMuc29mdHdhcmVLZXlib2FyZC5vZmYoJ2luaXQnLCBvbkluaXQpO1xuXG4gICAgICAgICAgJG9uc2VuLmNsZWFyQ29tcG9uZW50KHtcbiAgICAgICAgICAgIGVsZW1lbnQ6IGVsZW1lbnQsXG4gICAgICAgICAgICBzY29wZTogc2NvcGUsXG4gICAgICAgICAgICBhdHRyczogYXR0cnNcbiAgICAgICAgICB9KTtcbiAgICAgICAgICBlbGVtZW50ID0gc2NvcGUgPSBhdHRycyA9IG51bGw7XG4gICAgICAgIH0pO1xuICAgICAgfTtcbiAgICB9O1xuICB9O1xuXG4gIG1vZHVsZS5kaXJlY3RpdmUoJ29uc0tleWJvYXJkQWN0aXZlJywgZnVuY3Rpb24oJG9uc2VuKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHJlc3RyaWN0OiAnQScsXG4gICAgICByZXBsYWNlOiBmYWxzZSxcbiAgICAgIHRyYW5zY2x1ZGU6IGZhbHNlLFxuICAgICAgc2NvcGU6IGZhbHNlLFxuICAgICAgY29tcGlsZTogY29tcGlsZUZ1bmN0aW9uKHRydWUsICRvbnNlbilcbiAgICB9O1xuICB9KTtcblxuICBtb2R1bGUuZGlyZWN0aXZlKCdvbnNLZXlib2FyZEluYWN0aXZlJywgZnVuY3Rpb24oJG9uc2VuKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHJlc3RyaWN0OiAnQScsXG4gICAgICByZXBsYWNlOiBmYWxzZSxcbiAgICAgIHRyYW5zY2x1ZGU6IGZhbHNlLFxuICAgICAgc2NvcGU6IGZhbHNlLFxuICAgICAgY29tcGlsZTogY29tcGlsZUZ1bmN0aW9uKGZhbHNlLCAkb25zZW4pXG4gICAgfTtcbiAgfSk7XG59KSgpO1xuIiwiLyoqXG4gKiBAZWxlbWVudCBvbnMtbGF6eS1yZXBlYXRcbiAqIEBkZXNjcmlwdGlvblxuICogICBbZW5dXG4gKiAgICAgVXNpbmcgdGhpcyBjb21wb25lbnQgYSBsaXN0IHdpdGggbWlsbGlvbnMgb2YgaXRlbXMgY2FuIGJlIHJlbmRlcmVkIHdpdGhvdXQgYSBkcm9wIGluIHBlcmZvcm1hbmNlLlxuICogICAgIEl0IGRvZXMgdGhhdCBieSBcImxhemlseVwiIGxvYWRpbmcgZWxlbWVudHMgaW50byB0aGUgRE9NIHdoZW4gdGhleSBjb21lIGludG8gdmlldyBhbmRcbiAqICAgICByZW1vdmluZyBpdGVtcyBmcm9tIHRoZSBET00gd2hlbiB0aGV5IGFyZSBub3QgdmlzaWJsZS5cbiAqICAgWy9lbl1cbiAqICAgW2phXVxuICogICAgIOOBk+OBruOCs+ODs+ODneODvOODjeODs+ODiOWGheOBp+aPj+eUu+OBleOCjOOCi+OCouOCpOODhuODoOOBrkRPTeimgee0oOOBruiqreOBv+i+vOOBv+OBr+OAgeeUu+mdouOBq+imi+OBiOOBneOBhuOBq+OBquOBo+OBn+aZguOBvuOBp+iHquWLleeahOOBq+mBheW7tuOBleOCjOOAgVxuICogICAgIOeUu+mdouOBi+OCieimi+OBiOOBquOBj+OBquOBo+OBn+WgtOWQiOOBq+OBr+OBneOBruimgee0oOOBr+WLleeahOOBq+OCouODs+ODreODvOODieOBleOCjOOBvuOBmeOAglxuICogICAgIOOBk+OBruOCs+ODs+ODneODvOODjeODs+ODiOOCkuS9v+OBhuOBk+OBqOOBp+OAgeODkeODleOCqeODvOODnuODs+OCueOCkuWKo+WMluOBleOBm+OCi+OBk+OBqOeEoeOBl+OBq+W3qOWkp+OBquaVsOOBruimgee0oOOCkuaPj+eUu+OBp+OBjeOBvuOBmeOAglxuICogICBbL2phXVxuICogQGNvZGVwZW4gUXdyR0JtXG4gKiBAZ3VpZGUgVXNpbmdMYXp5UmVwZWF0XG4gKiAgIFtlbl1Ib3cgdG8gdXNlIExhenkgUmVwZWF0Wy9lbl1cbiAqICAgW2phXeODrOOCpOOCuOODvOODquODlOODvOODiOOBruS9v+OBhOaWuVsvamFdXG4gKiBAZXhhbXBsZVxuICogPHNjcmlwdD5cbiAqICAgb25zLmJvb3RzdHJhcCgpXG4gKlxuICogICAuY29udHJvbGxlcignTXlDb250cm9sbGVyJywgZnVuY3Rpb24oJHNjb3BlKSB7XG4gKiAgICAgJHNjb3BlLk15RGVsZWdhdGUgPSB7XG4gKiAgICAgICBjb3VudEl0ZW1zOiBmdW5jdGlvbigpIHtcbiAqICAgICAgICAgLy8gUmV0dXJuIG51bWJlciBvZiBpdGVtcy5cbiAqICAgICAgICAgcmV0dXJuIDEwMDAwMDA7XG4gKiAgICAgICB9LFxuICpcbiAqICAgICAgIGNhbGN1bGF0ZUl0ZW1IZWlnaHQ6IGZ1bmN0aW9uKGluZGV4KSB7XG4gKiAgICAgICAgIC8vIFJldHVybiB0aGUgaGVpZ2h0IG9mIGFuIGl0ZW0gaW4gcGl4ZWxzLlxuICogICAgICAgICByZXR1cm4gNDU7XG4gKiAgICAgICB9LFxuICpcbiAqICAgICAgIGNvbmZpZ3VyZUl0ZW1TY29wZTogZnVuY3Rpb24oaW5kZXgsIGl0ZW1TY29wZSkge1xuICogICAgICAgICAvLyBJbml0aWFsaXplIHNjb3BlXG4gKiAgICAgICAgIGl0ZW1TY29wZS5pdGVtID0gJ0l0ZW0gIycgKyAoaW5kZXggKyAxKTtcbiAqICAgICAgIH0sXG4gKlxuICogICAgICAgZGVzdHJveUl0ZW1TY29wZTogZnVuY3Rpb24oaW5kZXgsIGl0ZW1TY29wZSkge1xuICogICAgICAgICAvLyBPcHRpb25hbCBtZXRob2QgdGhhdCBpcyBjYWxsZWQgd2hlbiBhbiBpdGVtIGlzIHVubG9hZGVkLlxuICogICAgICAgICBjb25zb2xlLmxvZygnRGVzdHJveWVkIGl0ZW0gd2l0aCBpbmRleDogJyArIGluZGV4KTtcbiAqICAgICAgIH1cbiAqICAgICB9O1xuICogICB9KTtcbiAqIDwvc2NyaXB0PlxuICpcbiAqIDxvbnMtbGlzdCBuZy1jb250cm9sbGVyPVwiTXlDb250cm9sbGVyXCI+XG4gKiAgIDxvbnMtbGlzdC1pdGVtIG9ucy1sYXp5LXJlcGVhdD1cIk15RGVsZWdhdGVcIj5cbiAqICAgICB7eyBpdGVtIH19XG4gKiAgIDwvb25zLWxpc3QtaXRlbT5cbiAqIDwvb25zLWxpc3Q+XG4gKi9cblxuLyoqXG4gKiBAYXR0cmlidXRlIG9ucy1sYXp5LXJlcGVhdFxuICogQHR5cGUge0V4cHJlc3Npb259XG4gKiBAaW5pdG9ubHlcbiAqIEBkZXNjcmlwdGlvblxuICogIFtlbl1BIGRlbGVnYXRlIG9iamVjdCwgY2FuIGJlIGVpdGhlciBhbiBvYmplY3QgYXR0YWNoZWQgdG8gdGhlIHNjb3BlICh3aGVuIHVzaW5nIEFuZ3VsYXJKUykgb3IgYSBub3JtYWwgSmF2YVNjcmlwdCB2YXJpYWJsZS5bL2VuXVxuICogIFtqYV3opoHntKDjga7jg63jg7zjg4njgIHjgqLjg7Pjg63jg7zjg4njgarjganjga7lh6bnkIbjgpLlp5TorbLjgZnjgovjgqrjg5bjgrjjgqfjgq/jg4jjgpLmjIflrprjgZfjgb7jgZnjgIJBbmd1bGFySlPjga7jgrnjgrPjg7zjg5fjga7lpInmlbDlkI3jgoTjgIHpgJrluLjjga5KYXZhU2NyaXB044Gu5aSJ5pWw5ZCN44KS5oyH5a6a44GX44G+44GZ44CCWy9qYV1cbiAqL1xuXG4vKipcbiAqIEBwcm9wZXJ0eSBkZWxlZ2F0ZS5jb25maWd1cmVJdGVtU2NvcGVcbiAqIEB0eXBlIHtGdW5jdGlvbn1cbiAqIEBkZXNjcmlwdGlvblxuICogICBbZW5dRnVuY3Rpb24gd2hpY2ggcmVjaWV2ZXMgYW4gaW5kZXggYW5kIHRoZSBzY29wZSBmb3IgdGhlIGl0ZW0uIENhbiBiZSB1c2VkIHRvIGNvbmZpZ3VyZSB2YWx1ZXMgaW4gdGhlIGl0ZW0gc2NvcGUuWy9lbl1cbiAqICAgW2phXVsvamFdXG4gKi9cblxuKGZ1bmN0aW9uKCkge1xuICAndXNlIHN0cmljdCc7XG5cbiAgdmFyIG1vZHVsZSA9IGFuZ3VsYXIubW9kdWxlKCdvbnNlbicpO1xuXG4gIC8qKlxuICAgKiBMYXp5IHJlcGVhdCBkaXJlY3RpdmUuXG4gICAqL1xuICBtb2R1bGUuZGlyZWN0aXZlKCdvbnNMYXp5UmVwZWF0JywgZnVuY3Rpb24oJG9uc2VuLCBMYXp5UmVwZWF0Vmlldykge1xuICAgIHJldHVybiB7XG4gICAgICByZXN0cmljdDogJ0EnLFxuICAgICAgcmVwbGFjZTogZmFsc2UsXG4gICAgICBwcmlvcml0eTogMTAwMCxcbiAgICAgIHRlcm1pbmFsOiB0cnVlLFxuXG4gICAgICBjb21waWxlOiBmdW5jdGlvbihlbGVtZW50LCBhdHRycykge1xuICAgICAgICByZXR1cm4gZnVuY3Rpb24oc2NvcGUsIGVsZW1lbnQsIGF0dHJzKSB7XG4gICAgICAgICAgdmFyIGxhenlSZXBlYXQgPSBuZXcgTGF6eVJlcGVhdFZpZXcoc2NvcGUsIGVsZW1lbnQsIGF0dHJzKTtcblxuICAgICAgICAgIHNjb3BlLiRvbignJGRlc3Ryb3knLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHNjb3BlID0gZWxlbWVudCA9IGF0dHJzID0gbGF6eVJlcGVhdCA9IG51bGw7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH07XG4gICAgICB9XG4gICAgfTtcbiAgfSk7XG5cbn0pKCk7XG4iLCIoZnVuY3Rpb24oKSB7XG4gICd1c2Ugc3RyaWN0JztcblxuICBhbmd1bGFyLm1vZHVsZSgnb25zZW4nKS5kaXJlY3RpdmUoJ29uc0xpc3RIZWFkZXInLCBmdW5jdGlvbigkb25zZW4sIEdlbmVyaWNWaWV3KSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHJlc3RyaWN0OiAnRScsXG4gICAgICBsaW5rOiBmdW5jdGlvbihzY29wZSwgZWxlbWVudCwgYXR0cnMpIHtcbiAgICAgICAgR2VuZXJpY1ZpZXcucmVnaXN0ZXIoc2NvcGUsIGVsZW1lbnQsIGF0dHJzLCB7dmlld0tleTogJ29ucy1saXN0LWhlYWRlcid9KTtcbiAgICAgICAgJG9uc2VuLmZpcmVDb21wb25lbnRFdmVudChlbGVtZW50WzBdLCAnaW5pdCcpO1xuICAgICAgfVxuICAgIH07XG4gIH0pO1xuXG59KSgpO1xuIiwiKGZ1bmN0aW9uKCkge1xuICAndXNlIHN0cmljdCc7XG5cbiAgYW5ndWxhci5tb2R1bGUoJ29uc2VuJykuZGlyZWN0aXZlKCdvbnNMaXN0SXRlbScsIGZ1bmN0aW9uKCRvbnNlbiwgR2VuZXJpY1ZpZXcpIHtcbiAgICByZXR1cm4ge1xuICAgICAgcmVzdHJpY3Q6ICdFJyxcbiAgICAgIGxpbms6IGZ1bmN0aW9uKHNjb3BlLCBlbGVtZW50LCBhdHRycykge1xuICAgICAgICBHZW5lcmljVmlldy5yZWdpc3RlcihzY29wZSwgZWxlbWVudCwgYXR0cnMsIHt2aWV3S2V5OiAnb25zLWxpc3QtaXRlbSd9KTtcbiAgICAgICAgJG9uc2VuLmZpcmVDb21wb25lbnRFdmVudChlbGVtZW50WzBdLCAnaW5pdCcpO1xuICAgICAgfVxuICAgIH07XG4gIH0pO1xufSkoKTtcbiIsIihmdW5jdGlvbigpIHtcbiAgJ3VzZSBzdHJpY3QnO1xuXG4gIGFuZ3VsYXIubW9kdWxlKCdvbnNlbicpLmRpcmVjdGl2ZSgnb25zTGlzdCcsIGZ1bmN0aW9uKCRvbnNlbiwgR2VuZXJpY1ZpZXcpIHtcbiAgICByZXR1cm4ge1xuICAgICAgcmVzdHJpY3Q6ICdFJyxcbiAgICAgIGxpbms6IGZ1bmN0aW9uKHNjb3BlLCBlbGVtZW50LCBhdHRycykge1xuICAgICAgICBHZW5lcmljVmlldy5yZWdpc3RlcihzY29wZSwgZWxlbWVudCwgYXR0cnMsIHt2aWV3S2V5OiAnb25zLWxpc3QnfSk7XG4gICAgICAgICRvbnNlbi5maXJlQ29tcG9uZW50RXZlbnQoZWxlbWVudFswXSwgJ2luaXQnKTtcbiAgICAgIH1cbiAgICB9O1xuICB9KTtcblxufSkoKTtcbiIsIihmdW5jdGlvbigpIHtcbiAgJ3VzZSBzdHJpY3QnO1xuXG4gIGFuZ3VsYXIubW9kdWxlKCdvbnNlbicpLmRpcmVjdGl2ZSgnb25zTGlzdFRpdGxlJywgZnVuY3Rpb24oJG9uc2VuLCBHZW5lcmljVmlldykge1xuICAgIHJldHVybiB7XG4gICAgICByZXN0cmljdDogJ0UnLFxuICAgICAgbGluazogZnVuY3Rpb24oc2NvcGUsIGVsZW1lbnQsIGF0dHJzKSB7XG4gICAgICAgIEdlbmVyaWNWaWV3LnJlZ2lzdGVyKHNjb3BlLCBlbGVtZW50LCBhdHRycywge3ZpZXdLZXk6ICdvbnMtbGlzdC10aXRsZSd9KTtcbiAgICAgICAgJG9uc2VuLmZpcmVDb21wb25lbnRFdmVudChlbGVtZW50WzBdLCAnaW5pdCcpO1xuICAgICAgfVxuICAgIH07XG4gIH0pO1xuXG59KSgpO1xuIiwiLyoqXG4gKiBAZWxlbWVudCBvbnMtbG9hZGluZy1wbGFjZWhvbGRlclxuICogQGNhdGVnb3J5IHV0aWxcbiAqIEBkZXNjcmlwdGlvblxuICogICBbZW5dRGlzcGxheSBhIHBsYWNlaG9sZGVyIHdoaWxlIHRoZSBjb250ZW50IGlzIGxvYWRpbmcuWy9lbl1cbiAqICAgW2phXU9uc2VuIFVJ44GM6Kqt44G/6L6844G+44KM44KL44G+44Gn44Gr6KGo56S644GZ44KL44OX44Os44O844K544Ob44Or44OA44O844KS6KGo54++44GX44G+44GZ44CCWy9qYV1cbiAqIEBleGFtcGxlXG4gKiA8ZGl2IG9ucy1sb2FkaW5nLXBsYWNlaG9sZGVyPVwicGFnZS5odG1sXCI+XG4gKiAgIExvYWRpbmcuLi5cbiAqIDwvZGl2PlxuICovXG5cbi8qKlxuICogQGF0dHJpYnV0ZSBvbnMtbG9hZGluZy1wbGFjZWhvbGRlclxuICogQGluaXRvbmx5XG4gKiBAdHlwZSB7U3RyaW5nfVxuICogQGRlc2NyaXB0aW9uXG4gKiAgIFtlbl1UaGUgdXJsIG9mIHRoZSBwYWdlIHRvIGxvYWQuWy9lbl1cbiAqICAgW2phXeiqreOBv+i+vOOCgOODmuODvOOCuOOBrlVSTOOCkuaMh+WumuOBl+OBvuOBmeOAglsvamFdXG4gKi9cblxuKGZ1bmN0aW9uKCl7XG4gICd1c2Ugc3RyaWN0JztcblxuICBhbmd1bGFyLm1vZHVsZSgnb25zZW4nKS5kaXJlY3RpdmUoJ29uc0xvYWRpbmdQbGFjZWhvbGRlcicsIGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiB7XG4gICAgICByZXN0cmljdDogJ0EnLFxuICAgICAgbGluazogZnVuY3Rpb24oc2NvcGUsIGVsZW1lbnQsIGF0dHJzKSB7XG4gICAgICAgIGlmIChhdHRycy5vbnNMb2FkaW5nUGxhY2Vob2xkZXIpIHtcbiAgICAgICAgICBvbnMuX3Jlc29sdmVMb2FkaW5nUGxhY2Vob2xkZXIoZWxlbWVudFswXSwgYXR0cnMub25zTG9hZGluZ1BsYWNlaG9sZGVyLCBmdW5jdGlvbihjb250ZW50RWxlbWVudCwgZG9uZSkge1xuICAgICAgICAgICAgb25zLmNvbXBpbGUoY29udGVudEVsZW1lbnQpO1xuICAgICAgICAgICAgc2NvcGUuJGV2YWxBc3luYyhmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgc2V0SW1tZWRpYXRlKGRvbmUpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9O1xuICB9KTtcbn0pKCk7XG4iLCIvKipcbiAqIEBlbGVtZW50IG9ucy1tb2RhbFxuICovXG5cbi8qKlxuICogQGF0dHJpYnV0ZSB2YXJcbiAqIEB0eXBlIHtTdHJpbmd9XG4gKiBAaW5pdG9ubHlcbiAqIEBkZXNjcmlwdGlvblxuICogICBbZW5dVmFyaWFibGUgbmFtZSB0byByZWZlciB0aGlzIG1vZGFsLlsvZW5dXG4gKiAgIFtqYV3jgZPjga7jg6Ljg7zjg4Djg6vjgpLlj4LnhafjgZnjgovjgZ/jgoHjga7lkI3liY3jgpLmjIflrprjgZfjgb7jgZnjgIJbL2phXVxuICovXG5cbi8qKlxuICogQGF0dHJpYnV0ZSBvbnMtcHJlc2hvd1xuICogQGluaXRvbmx5XG4gKiBAdHlwZSB7RXhwcmVzc2lvbn1cbiAqIEBkZXNjcmlwdGlvblxuICogIFtlbl1BbGxvd3MgeW91IHRvIHNwZWNpZnkgY3VzdG9tIGJlaGF2aW9yIHdoZW4gdGhlIFwicHJlc2hvd1wiIGV2ZW50IGlzIGZpcmVkLlsvZW5dXG4gKiAgW2phXVwicHJlc2hvd1wi44Kk44OZ44Oz44OI44GM55m654Gr44GV44KM44Gf5pmC44Gu5oyZ5YuV44KS54us6Ieq44Gr5oyH5a6a44Gn44GN44G+44GZ44CCWy9qYV1cbiAqL1xuXG4vKipcbiAqIEBhdHRyaWJ1dGUgb25zLXByZWhpZGVcbiAqIEBpbml0b25seVxuICogQHR5cGUge0V4cHJlc3Npb259XG4gKiBAZGVzY3JpcHRpb25cbiAqICBbZW5dQWxsb3dzIHlvdSB0byBzcGVjaWZ5IGN1c3RvbSBiZWhhdmlvciB3aGVuIHRoZSBcInByZWhpZGVcIiBldmVudCBpcyBmaXJlZC5bL2VuXVxuICogIFtqYV1cInByZWhpZGVcIuOCpOODmeODs+ODiOOBjOeZuueBq+OBleOCjOOBn+aZguOBruaMmeWLleOCkueLrOiHquOBq+aMh+WumuOBp+OBjeOBvuOBmeOAglsvamFdXG4gKi9cblxuLyoqXG4gKiBAYXR0cmlidXRlIG9ucy1wb3N0c2hvd1xuICogQGluaXRvbmx5XG4gKiBAdHlwZSB7RXhwcmVzc2lvbn1cbiAqIEBkZXNjcmlwdGlvblxuICogIFtlbl1BbGxvd3MgeW91IHRvIHNwZWNpZnkgY3VzdG9tIGJlaGF2aW9yIHdoZW4gdGhlIFwicG9zdHNob3dcIiBldmVudCBpcyBmaXJlZC5bL2VuXVxuICogIFtqYV1cInBvc3RzaG93XCLjgqTjg5njg7Pjg4jjgYznmbrngavjgZXjgozjgZ/mmYLjga7mjJnli5XjgpLni6zoh6rjgavmjIflrprjgafjgY3jgb7jgZnjgIJbL2phXVxuICovXG5cbi8qKlxuICogQGF0dHJpYnV0ZSBvbnMtcG9zdGhpZGVcbiAqIEBpbml0b25seVxuICogQHR5cGUge0V4cHJlc3Npb259XG4gKiBAZGVzY3JpcHRpb25cbiAqICBbZW5dQWxsb3dzIHlvdSB0byBzcGVjaWZ5IGN1c3RvbSBiZWhhdmlvciB3aGVuIHRoZSBcInBvc3RoaWRlXCIgZXZlbnQgaXMgZmlyZWQuWy9lbl1cbiAqICBbamFdXCJwb3N0aGlkZVwi44Kk44OZ44Oz44OI44GM55m654Gr44GV44KM44Gf5pmC44Gu5oyZ5YuV44KS54us6Ieq44Gr5oyH5a6a44Gn44GN44G+44GZ44CCWy9qYV1cbiAqL1xuXG4vKipcbiAqIEBhdHRyaWJ1dGUgb25zLWRlc3Ryb3lcbiAqIEBpbml0b25seVxuICogQHR5cGUge0V4cHJlc3Npb259XG4gKiBAZGVzY3JpcHRpb25cbiAqICBbZW5dQWxsb3dzIHlvdSB0byBzcGVjaWZ5IGN1c3RvbSBiZWhhdmlvciB3aGVuIHRoZSBcImRlc3Ryb3lcIiBldmVudCBpcyBmaXJlZC5bL2VuXVxuICogIFtqYV1cImRlc3Ryb3lcIuOCpOODmeODs+ODiOOBjOeZuueBq+OBleOCjOOBn+aZguOBruaMmeWLleOCkueLrOiHquOBq+aMh+WumuOBp+OBjeOBvuOBmeOAglsvamFdXG4gKi9cblxuKGZ1bmN0aW9uKCkge1xuICAndXNlIHN0cmljdCc7XG5cbiAgLyoqXG4gICAqIE1vZGFsIGRpcmVjdGl2ZS5cbiAgICovXG4gIGFuZ3VsYXIubW9kdWxlKCdvbnNlbicpLmRpcmVjdGl2ZSgnb25zTW9kYWwnLCBmdW5jdGlvbigkb25zZW4sIE1vZGFsVmlldykge1xuICAgIHJldHVybiB7XG4gICAgICByZXN0cmljdDogJ0UnLFxuICAgICAgcmVwbGFjZTogZmFsc2UsXG5cbiAgICAgIC8vIE5PVEU6IFRoaXMgZWxlbWVudCBtdXN0IGNvZXhpc3RzIHdpdGggbmctY29udHJvbGxlci5cbiAgICAgIC8vIERvIG5vdCB1c2UgaXNvbGF0ZWQgc2NvcGUgYW5kIHRlbXBsYXRlJ3MgbmctdHJhbnNjbHVkZS5cbiAgICAgIHNjb3BlOiBmYWxzZSxcbiAgICAgIHRyYW5zY2x1ZGU6IGZhbHNlLFxuXG4gICAgICBjb21waWxlOiAoZWxlbWVudCwgYXR0cnMpID0+IHtcblxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgIHByZTogZnVuY3Rpb24oc2NvcGUsIGVsZW1lbnQsIGF0dHJzKSB7XG4gICAgICAgICAgICB2YXIgbW9kYWwgPSBuZXcgTW9kYWxWaWV3KHNjb3BlLCBlbGVtZW50LCBhdHRycyk7XG4gICAgICAgICAgICAkb25zZW4uYWRkTW9kaWZpZXJNZXRob2RzRm9yQ3VzdG9tRWxlbWVudHMobW9kYWwsIGVsZW1lbnQpO1xuXG4gICAgICAgICAgICAkb25zZW4uZGVjbGFyZVZhckF0dHJpYnV0ZShhdHRycywgbW9kYWwpO1xuICAgICAgICAgICAgJG9uc2VuLnJlZ2lzdGVyRXZlbnRIYW5kbGVycyhtb2RhbCwgJ3ByZXNob3cgcHJlaGlkZSBwb3N0c2hvdyBwb3N0aGlkZSBkZXN0cm95Jyk7XG4gICAgICAgICAgICBlbGVtZW50LmRhdGEoJ29ucy1tb2RhbCcsIG1vZGFsKTtcblxuICAgICAgICAgICAgc2NvcGUuJG9uKCckZGVzdHJveScsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAkb25zZW4ucmVtb3ZlTW9kaWZpZXJNZXRob2RzKG1vZGFsKTtcbiAgICAgICAgICAgICAgZWxlbWVudC5kYXRhKCdvbnMtbW9kYWwnLCB1bmRlZmluZWQpO1xuICAgICAgICAgICAgICBtb2RhbCA9IGVsZW1lbnQgPSBzY29wZSA9IGF0dHJzID0gbnVsbDtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH0sXG5cbiAgICAgICAgICBwb3N0OiBmdW5jdGlvbihzY29wZSwgZWxlbWVudCkge1xuICAgICAgICAgICAgJG9uc2VuLmZpcmVDb21wb25lbnRFdmVudChlbGVtZW50WzBdLCAnaW5pdCcpO1xuICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICAgIH1cbiAgICB9O1xuICB9KTtcbn0pKCk7XG4iLCIvKipcbiAqIEBlbGVtZW50IG9ucy1uYXZpZ2F0b3JcbiAqIEBleGFtcGxlXG4gKiA8b25zLW5hdmlnYXRvciBhbmltYXRpb249XCJzbGlkZVwiIHZhcj1cImFwcC5uYXZpXCI+XG4gKiAgIDxvbnMtcGFnZT5cbiAqICAgICA8b25zLXRvb2xiYXI+XG4gKiAgICAgICA8ZGl2IGNsYXNzPVwiY2VudGVyXCI+VGl0bGU8L2Rpdj5cbiAqICAgICA8L29ucy10b29sYmFyPlxuICpcbiAqICAgICA8cCBzdHlsZT1cInRleHQtYWxpZ246IGNlbnRlclwiPlxuICogICAgICAgPG9ucy1idXR0b24gbW9kaWZpZXI9XCJsaWdodFwiIG5nLWNsaWNrPVwiYXBwLm5hdmkucHVzaFBhZ2UoJ3BhZ2UuaHRtbCcpO1wiPlB1c2g8L29ucy1idXR0b24+XG4gKiAgICAgPC9wPlxuICogICA8L29ucy1wYWdlPlxuICogPC9vbnMtbmF2aWdhdG9yPlxuICpcbiAqIDxvbnMtdGVtcGxhdGUgaWQ9XCJwYWdlLmh0bWxcIj5cbiAqICAgPG9ucy1wYWdlPlxuICogICAgIDxvbnMtdG9vbGJhcj5cbiAqICAgICAgIDxkaXYgY2xhc3M9XCJjZW50ZXJcIj5UaXRsZTwvZGl2PlxuICogICAgIDwvb25zLXRvb2xiYXI+XG4gKlxuICogICAgIDxwIHN0eWxlPVwidGV4dC1hbGlnbjogY2VudGVyXCI+XG4gKiAgICAgICA8b25zLWJ1dHRvbiBtb2RpZmllcj1cImxpZ2h0XCIgbmctY2xpY2s9XCJhcHAubmF2aS5wb3BQYWdlKCk7XCI+UG9wPC9vbnMtYnV0dG9uPlxuICogICAgIDwvcD5cbiAqICAgPC9vbnMtcGFnZT5cbiAqIDwvb25zLXRlbXBsYXRlPlxuICovXG5cbi8qKlxuICogQGF0dHJpYnV0ZSB2YXJcbiAqIEBpbml0b25seVxuICogQHR5cGUge1N0cmluZ31cbiAqIEBkZXNjcmlwdGlvblxuICogIFtlbl1WYXJpYWJsZSBuYW1lIHRvIHJlZmVyIHRoaXMgbmF2aWdhdG9yLlsvZW5dXG4gKiAgW2phXeOBk+OBruODiuODk+OCsuODvOOCv+ODvOOCkuWPgueFp+OBmeOCi+OBn+OCgeOBruWQjeWJjeOCkuaMh+WumuOBl+OBvuOBmeOAglsvamFdXG4gKi9cblxuLyoqXG4gKiBAYXR0cmlidXRlIG9ucy1wcmVwdXNoXG4gKiBAaW5pdG9ubHlcbiAqIEB0eXBlIHtFeHByZXNzaW9ufVxuICogQGRlc2NyaXB0aW9uXG4gKiAgW2VuXUFsbG93cyB5b3UgdG8gc3BlY2lmeSBjdXN0b20gYmVoYXZpb3Igd2hlbiB0aGUgXCJwcmVwdXNoXCIgZXZlbnQgaXMgZmlyZWQuWy9lbl1cbiAqICBbamFdXCJwcmVwdXNoXCLjgqTjg5njg7Pjg4jjgYznmbrngavjgZXjgozjgZ/mmYLjga7mjJnli5XjgpLni6zoh6rjgavmjIflrprjgafjgY3jgb7jgZnjgIJbL2phXVxuICovXG5cbi8qKlxuICogQGF0dHJpYnV0ZSBvbnMtcHJlcG9wXG4gKiBAaW5pdG9ubHlcbiAqIEB0eXBlIHtFeHByZXNzaW9ufVxuICogQGRlc2NyaXB0aW9uXG4gKiAgW2VuXUFsbG93cyB5b3UgdG8gc3BlY2lmeSBjdXN0b20gYmVoYXZpb3Igd2hlbiB0aGUgXCJwcmVwb3BcIiBldmVudCBpcyBmaXJlZC5bL2VuXVxuICogIFtqYV1cInByZXBvcFwi44Kk44OZ44Oz44OI44GM55m654Gr44GV44KM44Gf5pmC44Gu5oyZ5YuV44KS54us6Ieq44Gr5oyH5a6a44Gn44GN44G+44GZ44CCWy9qYV1cbiAqL1xuXG4vKipcbiAqIEBhdHRyaWJ1dGUgb25zLXBvc3RwdXNoXG4gKiBAaW5pdG9ubHlcbiAqIEB0eXBlIHtFeHByZXNzaW9ufVxuICogQGRlc2NyaXB0aW9uXG4gKiAgW2VuXUFsbG93cyB5b3UgdG8gc3BlY2lmeSBjdXN0b20gYmVoYXZpb3Igd2hlbiB0aGUgXCJwb3N0cHVzaFwiIGV2ZW50IGlzIGZpcmVkLlsvZW5dXG4gKiAgW2phXVwicG9zdHB1c2hcIuOCpOODmeODs+ODiOOBjOeZuueBq+OBleOCjOOBn+aZguOBruaMmeWLleOCkueLrOiHquOBq+aMh+WumuOBp+OBjeOBvuOBmeOAglsvamFdXG4gKi9cblxuLyoqXG4gKiBAYXR0cmlidXRlIG9ucy1wb3N0cG9wXG4gKiBAaW5pdG9ubHlcbiAqIEB0eXBlIHtFeHByZXNzaW9ufVxuICogQGRlc2NyaXB0aW9uXG4gKiAgW2VuXUFsbG93cyB5b3UgdG8gc3BlY2lmeSBjdXN0b20gYmVoYXZpb3Igd2hlbiB0aGUgXCJwb3N0cG9wXCIgZXZlbnQgaXMgZmlyZWQuWy9lbl1cbiAqICBbamFdXCJwb3N0cG9wXCLjgqTjg5njg7Pjg4jjgYznmbrngavjgZXjgozjgZ/mmYLjga7mjJnli5XjgpLni6zoh6rjgavmjIflrprjgafjgY3jgb7jgZnjgIJbL2phXVxuICovXG5cbi8qKlxuICogQGF0dHJpYnV0ZSBvbnMtaW5pdFxuICogQGluaXRvbmx5XG4gKiBAdHlwZSB7RXhwcmVzc2lvbn1cbiAqIEBkZXNjcmlwdGlvblxuICogIFtlbl1BbGxvd3MgeW91IHRvIHNwZWNpZnkgY3VzdG9tIGJlaGF2aW9yIHdoZW4gYSBwYWdlJ3MgXCJpbml0XCIgZXZlbnQgaXMgZmlyZWQuWy9lbl1cbiAqICBbamFd44Oa44O844K444GuXCJpbml0XCLjgqTjg5njg7Pjg4jjgYznmbrngavjgZXjgozjgZ/mmYLjga7mjJnli5XjgpLni6zoh6rjgavmjIflrprjgafjgY3jgb7jgZnjgIJbL2phXVxuICovXG5cbi8qKlxuICogQGF0dHJpYnV0ZSBvbnMtc2hvd1xuICogQGluaXRvbmx5XG4gKiBAdHlwZSB7RXhwcmVzc2lvbn1cbiAqIEBkZXNjcmlwdGlvblxuICogIFtlbl1BbGxvd3MgeW91IHRvIHNwZWNpZnkgY3VzdG9tIGJlaGF2aW9yIHdoZW4gYSBwYWdlJ3MgXCJzaG93XCIgZXZlbnQgaXMgZmlyZWQuWy9lbl1cbiAqICBbamFd44Oa44O844K444GuXCJzaG93XCLjgqTjg5njg7Pjg4jjgYznmbrngavjgZXjgozjgZ/mmYLjga7mjJnli5XjgpLni6zoh6rjgavmjIflrprjgafjgY3jgb7jgZnjgIJbL2phXVxuICovXG5cbi8qKlxuICogQGF0dHJpYnV0ZSBvbnMtaGlkZVxuICogQGluaXRvbmx5XG4gKiBAdHlwZSB7RXhwcmVzc2lvbn1cbiAqIEBkZXNjcmlwdGlvblxuICogIFtlbl1BbGxvd3MgeW91IHRvIHNwZWNpZnkgY3VzdG9tIGJlaGF2aW9yIHdoZW4gYSBwYWdlJ3MgXCJoaWRlXCIgZXZlbnQgaXMgZmlyZWQuWy9lbl1cbiAqICBbamFd44Oa44O844K444GuXCJoaWRlXCLjgqTjg5njg7Pjg4jjgYznmbrngavjgZXjgozjgZ/mmYLjga7mjJnli5XjgpLni6zoh6rjgavmjIflrprjgafjgY3jgb7jgZnjgIJbL2phXVxuICovXG5cbi8qKlxuICogQGF0dHJpYnV0ZSBvbnMtZGVzdHJveVxuICogQGluaXRvbmx5XG4gKiBAdHlwZSB7RXhwcmVzc2lvbn1cbiAqIEBkZXNjcmlwdGlvblxuICogIFtlbl1BbGxvd3MgeW91IHRvIHNwZWNpZnkgY3VzdG9tIGJlaGF2aW9yIHdoZW4gYSBwYWdlJ3MgXCJkZXN0cm95XCIgZXZlbnQgaXMgZmlyZWQuWy9lbl1cbiAqICBbamFd44Oa44O844K444GuXCJkZXN0cm95XCLjgqTjg5njg7Pjg4jjgYznmbrngavjgZXjgozjgZ/mmYLjga7mjJnli5XjgpLni6zoh6rjgavmjIflrprjgafjgY3jgb7jgZnjgIJbL2phXVxuICovXG5cbi8qKlxuICogQG1ldGhvZCBvblxuICogQHNpZ25hdHVyZSBvbihldmVudE5hbWUsIGxpc3RlbmVyKVxuICogQGRlc2NyaXB0aW9uXG4gKiAgIFtlbl1BZGQgYW4gZXZlbnQgbGlzdGVuZXIuWy9lbl1cbiAqICAgW2phXeOCpOODmeODs+ODiOODquOCueODiuODvOOCkui/veWKoOOBl+OBvuOBmeOAglsvamFdXG4gKiBAcGFyYW0ge1N0cmluZ30gZXZlbnROYW1lXG4gKiAgIFtlbl1OYW1lIG9mIHRoZSBldmVudC5bL2VuXVxuICogICBbamFd44Kk44OZ44Oz44OI5ZCN44KS5oyH5a6a44GX44G+44GZ44CCWy9qYV1cbiAqIEBwYXJhbSB7RnVuY3Rpb259IGxpc3RlbmVyXG4gKiAgIFtlbl1GdW5jdGlvbiB0byBleGVjdXRlIHdoZW4gdGhlIGV2ZW50IGlzIHRyaWdnZXJlZC5bL2VuXVxuICogICBbamFd44GT44Gu44Kk44OZ44Oz44OI44GM55m654Gr44GV44KM44Gf6Zqb44Gr5ZG844Gz5Ye644GV44KM44KL6Zai5pWw44Kq44OW44K444Kn44Kv44OI44KS5oyH5a6a44GX44G+44GZ44CCWy9qYV1cbiAqL1xuXG4vKipcbiAqIEBtZXRob2Qgb25jZVxuICogQHNpZ25hdHVyZSBvbmNlKGV2ZW50TmFtZSwgbGlzdGVuZXIpXG4gKiBAZGVzY3JpcHRpb25cbiAqICBbZW5dQWRkIGFuIGV2ZW50IGxpc3RlbmVyIHRoYXQncyBvbmx5IHRyaWdnZXJlZCBvbmNlLlsvZW5dXG4gKiAgW2phXeS4gOW6puOBoOOBkeWRvOOBs+WHuuOBleOCjOOCi+OCpOODmeODs+ODiOODquOCueODiuODvOOCkui/veWKoOOBl+OBvuOBmeOAglsvamFdXG4gKiBAcGFyYW0ge1N0cmluZ30gZXZlbnROYW1lXG4gKiAgIFtlbl1OYW1lIG9mIHRoZSBldmVudC5bL2VuXVxuICogICBbamFd44Kk44OZ44Oz44OI5ZCN44KS5oyH5a6a44GX44G+44GZ44CCWy9qYV1cbiAqIEBwYXJhbSB7RnVuY3Rpb259IGxpc3RlbmVyXG4gKiAgIFtlbl1GdW5jdGlvbiB0byBleGVjdXRlIHdoZW4gdGhlIGV2ZW50IGlzIHRyaWdnZXJlZC5bL2VuXVxuICogICBbamFd44Kk44OZ44Oz44OI44GM55m654Gr44GX44Gf6Zqb44Gr5ZG844Gz5Ye644GV44KM44KL6Zai5pWw44Kq44OW44K444Kn44Kv44OI44KS5oyH5a6a44GX44G+44GZ44CCWy9qYV1cbiAqL1xuXG4vKipcbiAqIEBtZXRob2Qgb2ZmXG4gKiBAc2lnbmF0dXJlIG9mZihldmVudE5hbWUsIFtsaXN0ZW5lcl0pXG4gKiBAZGVzY3JpcHRpb25cbiAqICBbZW5dUmVtb3ZlIGFuIGV2ZW50IGxpc3RlbmVyLiBJZiB0aGUgbGlzdGVuZXIgaXMgbm90IHNwZWNpZmllZCBhbGwgbGlzdGVuZXJzIGZvciB0aGUgZXZlbnQgdHlwZSB3aWxsIGJlIHJlbW92ZWQuWy9lbl1cbiAqICBbamFd44Kk44OZ44Oz44OI44Oq44K544OK44O844KS5YmK6Zmk44GX44G+44GZ44CC44KC44GX44Kk44OZ44Oz44OI44Oq44K544OK44O844KS5oyH5a6a44GX44Gq44GL44Gj44Gf5aC05ZCI44Gr44Gv44CB44Gd44Gu44Kk44OZ44Oz44OI44Gr57SQ44Gl44GP5YWo44Gm44Gu44Kk44OZ44Oz44OI44Oq44K544OK44O844GM5YmK6Zmk44GV44KM44G+44GZ44CCWy9qYV1cbiAqIEBwYXJhbSB7U3RyaW5nfSBldmVudE5hbWVcbiAqICAgW2VuXU5hbWUgb2YgdGhlIGV2ZW50LlsvZW5dXG4gKiAgIFtqYV3jgqTjg5njg7Pjg4jlkI3jgpLmjIflrprjgZfjgb7jgZnjgIJbL2phXVxuICogQHBhcmFtIHtGdW5jdGlvbn0gbGlzdGVuZXJcbiAqICAgW2VuXUZ1bmN0aW9uIHRvIGV4ZWN1dGUgd2hlbiB0aGUgZXZlbnQgaXMgdHJpZ2dlcmVkLlsvZW5dXG4gKiAgIFtqYV3liYrpmaTjgZnjgovjgqTjg5njg7Pjg4jjg6rjgrnjg4rjg7zjgpLmjIflrprjgZfjgb7jgZnjgIJbL2phXVxuICovXG5cbihmdW5jdGlvbigpIHtcbiAgJ3VzZSBzdHJpY3QnO1xuXG4gIHZhciBsYXN0UmVhZHkgPSB3aW5kb3cub25zLmVsZW1lbnRzLk5hdmlnYXRvci5yZXdyaXRhYmxlcy5yZWFkeTtcbiAgd2luZG93Lm9ucy5lbGVtZW50cy5OYXZpZ2F0b3IucmV3cml0YWJsZXMucmVhZHkgPSBvbnMuX3dhaXREaXJldGl2ZUluaXQoJ29ucy1uYXZpZ2F0b3InLCBsYXN0UmVhZHkpO1xuXG4gIGFuZ3VsYXIubW9kdWxlKCdvbnNlbicpLmRpcmVjdGl2ZSgnb25zTmF2aWdhdG9yJywgZnVuY3Rpb24oTmF2aWdhdG9yVmlldywgJG9uc2VuKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHJlc3RyaWN0OiAnRScsXG5cbiAgICAgIC8vIE5PVEU6IFRoaXMgZWxlbWVudCBtdXN0IGNvZXhpc3RzIHdpdGggbmctY29udHJvbGxlci5cbiAgICAgIC8vIERvIG5vdCB1c2UgaXNvbGF0ZWQgc2NvcGUgYW5kIHRlbXBsYXRlJ3MgbmctdHJhbnNjbHVkZS5cbiAgICAgIHRyYW5zY2x1ZGU6IGZhbHNlLFxuICAgICAgc2NvcGU6IHRydWUsXG5cbiAgICAgIGNvbXBpbGU6IGZ1bmN0aW9uKGVsZW1lbnQpIHtcblxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgIHByZTogZnVuY3Rpb24oc2NvcGUsIGVsZW1lbnQsIGF0dHJzLCBjb250cm9sbGVyKSB7XG4gICAgICAgICAgICB2YXIgdmlldyA9IG5ldyBOYXZpZ2F0b3JWaWV3KHNjb3BlLCBlbGVtZW50LCBhdHRycyk7XG5cbiAgICAgICAgICAgICRvbnNlbi5kZWNsYXJlVmFyQXR0cmlidXRlKGF0dHJzLCB2aWV3KTtcbiAgICAgICAgICAgICRvbnNlbi5yZWdpc3RlckV2ZW50SGFuZGxlcnModmlldywgJ3ByZXB1c2ggcHJlcG9wIHBvc3RwdXNoIHBvc3Rwb3AgaW5pdCBzaG93IGhpZGUgZGVzdHJveScpO1xuXG4gICAgICAgICAgICBlbGVtZW50LmRhdGEoJ29ucy1uYXZpZ2F0b3InLCB2aWV3KTtcblxuICAgICAgICAgICAgZWxlbWVudFswXS5wYWdlTG9hZGVyID0gJG9uc2VuLmNyZWF0ZVBhZ2VMb2FkZXIodmlldyk7XG5cbiAgICAgICAgICAgIHNjb3BlLiRvbignJGRlc3Ryb3knLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgdmlldy5fZXZlbnRzID0gdW5kZWZpbmVkO1xuICAgICAgICAgICAgICBlbGVtZW50LmRhdGEoJ29ucy1uYXZpZ2F0b3InLCB1bmRlZmluZWQpO1xuICAgICAgICAgICAgICBzY29wZSA9IGVsZW1lbnQgPSBudWxsO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICB9LFxuICAgICAgICAgIHBvc3Q6IGZ1bmN0aW9uKHNjb3BlLCBlbGVtZW50LCBhdHRycykge1xuICAgICAgICAgICAgJG9uc2VuLmZpcmVDb21wb25lbnRFdmVudChlbGVtZW50WzBdLCAnaW5pdCcpO1xuICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICAgIH1cbiAgICB9O1xuICB9KTtcbn0pKCk7XG4iLCIvKipcbiAqIEBlbGVtZW50IG9ucy1wYWdlXG4gKi9cblxuLyoqXG4gKiBAYXR0cmlidXRlIHZhclxuICogQGluaXRvbmx5XG4gKiBAdHlwZSB7U3RyaW5nfVxuICogQGRlc2NyaXB0aW9uXG4gKiAgIFtlbl1WYXJpYWJsZSBuYW1lIHRvIHJlZmVyIHRoaXMgcGFnZS5bL2VuXVxuICogICBbamFd44GT44Gu44Oa44O844K444KS5Y+C54Wn44GZ44KL44Gf44KB44Gu5ZCN5YmN44KS5oyH5a6a44GX44G+44GZ44CCWy9qYV1cbiAqL1xuXG4vKipcbiAqIEBhdHRyaWJ1dGUgbmctaW5maW5pdGUtc2Nyb2xsXG4gKiBAaW5pdG9ubHlcbiAqIEB0eXBlIHtTdHJpbmd9XG4gKiBAZGVzY3JpcHRpb25cbiAqICAgW2VuXVBhdGggb2YgdGhlIGZ1bmN0aW9uIHRvIGJlIGV4ZWN1dGVkIG9uIGluZmluaXRlIHNjcm9sbGluZy4gVGhlIHBhdGggaXMgcmVsYXRpdmUgdG8gJHNjb3BlLiBUaGUgZnVuY3Rpb24gcmVjZWl2ZXMgYSBkb25lIGNhbGxiYWNrIHRoYXQgbXVzdCBiZSBjYWxsZWQgd2hlbiBpdCdzIGZpbmlzaGVkLlsvZW5dXG4gKiAgIFtqYV1bL2phXVxuICovXG5cbi8qKlxuICogQGF0dHJpYnV0ZSBvbi1kZXZpY2UtYmFjay1idXR0b25cbiAqIEB0eXBlIHtFeHByZXNzaW9ufVxuICogQGRlc2NyaXB0aW9uXG4gKiAgIFtlbl1BbGxvd3MgeW91IHRvIHNwZWNpZnkgY3VzdG9tIGJlaGF2aW9yIHdoZW4gdGhlIGJhY2sgYnV0dG9uIGlzIHByZXNzZWQuWy9lbl1cbiAqICAgW2phXeODh+ODkOOCpOOCueOBruODkOODg+OCr+ODnOOCv+ODs+OBjOaKvOOBleOCjOOBn+aZguOBruaMmeWLleOCkuioreWumuOBp+OBjeOBvuOBmeOAglsvamFdXG4gKi9cblxuLyoqXG4gKiBAYXR0cmlidXRlIG5nLWRldmljZS1iYWNrLWJ1dHRvblxuICogQGluaXRvbmx5XG4gKiBAdHlwZSB7RXhwcmVzc2lvbn1cbiAqIEBkZXNjcmlwdGlvblxuICogICBbZW5dQWxsb3dzIHlvdSB0byBzcGVjaWZ5IGN1c3RvbSBiZWhhdmlvciB3aXRoIGFuIEFuZ3VsYXJKUyBleHByZXNzaW9uIHdoZW4gdGhlIGJhY2sgYnV0dG9uIGlzIHByZXNzZWQuWy9lbl1cbiAqICAgW2phXeODh+ODkOOCpOOCueOBruODkOODg+OCr+ODnOOCv+ODs+OBjOaKvOOBleOCjOOBn+aZguOBruaMmeWLleOCkuioreWumuOBp+OBjeOBvuOBmeOAgkFuZ3VsYXJKU+OBrmV4cHJlc3Npb27jgpLmjIflrprjgafjgY3jgb7jgZnjgIJbL2phXVxuICovXG5cbi8qKlxuICogQGF0dHJpYnV0ZSBvbnMtaW5pdFxuICogQGluaXRvbmx5XG4gKiBAdHlwZSB7RXhwcmVzc2lvbn1cbiAqIEBkZXNjcmlwdGlvblxuICogIFtlbl1BbGxvd3MgeW91IHRvIHNwZWNpZnkgY3VzdG9tIGJlaGF2aW9yIHdoZW4gdGhlIFwiaW5pdFwiIGV2ZW50IGlzIGZpcmVkLlsvZW5dXG4gKiAgW2phXVwiaW5pdFwi44Kk44OZ44Oz44OI44GM55m654Gr44GV44KM44Gf5pmC44Gu5oyZ5YuV44KS54us6Ieq44Gr5oyH5a6a44Gn44GN44G+44GZ44CCWy9qYV1cbiAqL1xuXG4vKipcbiAqIEBhdHRyaWJ1dGUgb25zLXNob3dcbiAqIEBpbml0b25seVxuICogQHR5cGUge0V4cHJlc3Npb259XG4gKiBAZGVzY3JpcHRpb25cbiAqICBbZW5dQWxsb3dzIHlvdSB0byBzcGVjaWZ5IGN1c3RvbSBiZWhhdmlvciB3aGVuIHRoZSBcInNob3dcIiBldmVudCBpcyBmaXJlZC5bL2VuXVxuICogIFtqYV1cInNob3dcIuOCpOODmeODs+ODiOOBjOeZuueBq+OBleOCjOOBn+aZguOBruaMmeWLleOCkueLrOiHquOBq+aMh+WumuOBp+OBjeOBvuOBmeOAglsvamFdXG4gKi9cblxuLyoqXG4gKiBAYXR0cmlidXRlIG9ucy1oaWRlXG4gKiBAaW5pdG9ubHlcbiAqIEB0eXBlIHtFeHByZXNzaW9ufVxuICogQGRlc2NyaXB0aW9uXG4gKiAgW2VuXUFsbG93cyB5b3UgdG8gc3BlY2lmeSBjdXN0b20gYmVoYXZpb3Igd2hlbiB0aGUgXCJoaWRlXCIgZXZlbnQgaXMgZmlyZWQuWy9lbl1cbiAqICBbamFdXCJoaWRlXCLjgqTjg5njg7Pjg4jjgYznmbrngavjgZXjgozjgZ/mmYLjga7mjJnli5XjgpLni6zoh6rjgavmjIflrprjgafjgY3jgb7jgZnjgIJbL2phXVxuICovXG5cbi8qKlxuICogQGF0dHJpYnV0ZSBvbnMtZGVzdHJveVxuICogQGluaXRvbmx5XG4gKiBAdHlwZSB7RXhwcmVzc2lvbn1cbiAqIEBkZXNjcmlwdGlvblxuICogIFtlbl1BbGxvd3MgeW91IHRvIHNwZWNpZnkgY3VzdG9tIGJlaGF2aW9yIHdoZW4gdGhlIFwiZGVzdHJveVwiIGV2ZW50IGlzIGZpcmVkLlsvZW5dXG4gKiAgW2phXVwiZGVzdHJveVwi44Kk44OZ44Oz44OI44GM55m654Gr44GV44KM44Gf5pmC44Gu5oyZ5YuV44KS54us6Ieq44Gr5oyH5a6a44Gn44GN44G+44GZ44CCWy9qYV1cbiAqL1xuXG4oZnVuY3Rpb24oKSB7XG4gICd1c2Ugc3RyaWN0JztcblxuICB2YXIgbW9kdWxlID0gYW5ndWxhci5tb2R1bGUoJ29uc2VuJyk7XG5cbiAgbW9kdWxlLmRpcmVjdGl2ZSgnb25zUGFnZScsIGZ1bmN0aW9uKCRvbnNlbiwgUGFnZVZpZXcpIHtcblxuICAgIGZ1bmN0aW9uIGZpcmVQYWdlSW5pdEV2ZW50KGVsZW1lbnQpIHtcbiAgICAgIC8vIFRPRE86IHJlbW92ZSBkaXJ0eSBmaXhcbiAgICAgIHZhciBpID0gMCwgZiA9IGZ1bmN0aW9uKCkge1xuICAgICAgICBpZiAoaSsrIDwgMTUpICB7XG4gICAgICAgICAgaWYgKGlzQXR0YWNoZWQoZWxlbWVudCkpIHtcbiAgICAgICAgICAgICRvbnNlbi5maXJlQ29tcG9uZW50RXZlbnQoZWxlbWVudCwgJ2luaXQnKTtcbiAgICAgICAgICAgIGZpcmVBY3R1YWxQYWdlSW5pdEV2ZW50KGVsZW1lbnQpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBpZiAoaSA+IDEwKSB7XG4gICAgICAgICAgICAgIHNldFRpbWVvdXQoZiwgMTAwMCAvIDYwKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIHNldEltbWVkaWF0ZShmKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdGYWlsIHRvIGZpcmUgXCJwYWdlaW5pdFwiIGV2ZW50LiBBdHRhY2ggXCJvbnMtcGFnZVwiIGVsZW1lbnQgdG8gdGhlIGRvY3VtZW50IGFmdGVyIGluaXRpYWxpemF0aW9uLicpO1xuICAgICAgICB9XG4gICAgICB9O1xuXG4gICAgICBmKCk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZmlyZUFjdHVhbFBhZ2VJbml0RXZlbnQoZWxlbWVudCkge1xuICAgICAgdmFyIGV2ZW50ID0gZG9jdW1lbnQuY3JlYXRlRXZlbnQoJ0hUTUxFdmVudHMnKTtcbiAgICAgIGV2ZW50LmluaXRFdmVudCgncGFnZWluaXQnLCB0cnVlLCB0cnVlKTtcbiAgICAgIGVsZW1lbnQuZGlzcGF0Y2hFdmVudChldmVudCk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gaXNBdHRhY2hlZChlbGVtZW50KSB7XG4gICAgICBpZiAoZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50ID09PSBlbGVtZW50KSB7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgfVxuICAgICAgcmV0dXJuIGVsZW1lbnQucGFyZW50Tm9kZSA/IGlzQXR0YWNoZWQoZWxlbWVudC5wYXJlbnROb2RlKSA6IGZhbHNlO1xuICAgIH1cblxuICAgIHJldHVybiB7XG4gICAgICByZXN0cmljdDogJ0UnLFxuXG4gICAgICAvLyBOT1RFOiBUaGlzIGVsZW1lbnQgbXVzdCBjb2V4aXN0cyB3aXRoIG5nLWNvbnRyb2xsZXIuXG4gICAgICAvLyBEbyBub3QgdXNlIGlzb2xhdGVkIHNjb3BlIGFuZCB0ZW1wbGF0ZSdzIG5nLXRyYW5zY2x1ZGUuXG4gICAgICB0cmFuc2NsdWRlOiBmYWxzZSxcbiAgICAgIHNjb3BlOiB0cnVlLFxuXG4gICAgICBjb21waWxlOiBmdW5jdGlvbihlbGVtZW50LCBhdHRycykge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgIHByZTogZnVuY3Rpb24oc2NvcGUsIGVsZW1lbnQsIGF0dHJzKSB7XG4gICAgICAgICAgICB2YXIgcGFnZSA9IG5ldyBQYWdlVmlldyhzY29wZSwgZWxlbWVudCwgYXR0cnMpO1xuXG4gICAgICAgICAgICAkb25zZW4uZGVjbGFyZVZhckF0dHJpYnV0ZShhdHRycywgcGFnZSk7XG4gICAgICAgICAgICAkb25zZW4ucmVnaXN0ZXJFdmVudEhhbmRsZXJzKHBhZ2UsICdpbml0IHNob3cgaGlkZSBkZXN0cm95Jyk7XG5cbiAgICAgICAgICAgIGVsZW1lbnQuZGF0YSgnb25zLXBhZ2UnLCBwYWdlKTtcbiAgICAgICAgICAgICRvbnNlbi5hZGRNb2RpZmllck1ldGhvZHNGb3JDdXN0b21FbGVtZW50cyhwYWdlLCBlbGVtZW50KTtcblxuICAgICAgICAgICAgZWxlbWVudC5kYXRhKCdfc2NvcGUnLCBzY29wZSk7XG5cbiAgICAgICAgICAgICRvbnNlbi5jbGVhbmVyLm9uRGVzdHJveShzY29wZSwgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgIHBhZ2UuX2V2ZW50cyA9IHVuZGVmaW5lZDtcbiAgICAgICAgICAgICAgJG9uc2VuLnJlbW92ZU1vZGlmaWVyTWV0aG9kcyhwYWdlKTtcbiAgICAgICAgICAgICAgZWxlbWVudC5kYXRhKCdvbnMtcGFnZScsIHVuZGVmaW5lZCk7XG4gICAgICAgICAgICAgIGVsZW1lbnQuZGF0YSgnX3Njb3BlJywgdW5kZWZpbmVkKTtcblxuICAgICAgICAgICAgICAkb25zZW4uY2xlYXJDb21wb25lbnQoe1xuICAgICAgICAgICAgICAgIGVsZW1lbnQ6IGVsZW1lbnQsXG4gICAgICAgICAgICAgICAgc2NvcGU6IHNjb3BlLFxuICAgICAgICAgICAgICAgIGF0dHJzOiBhdHRyc1xuICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgc2NvcGUgPSBlbGVtZW50ID0gYXR0cnMgPSBudWxsO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfSxcblxuICAgICAgICAgIHBvc3Q6IGZ1bmN0aW9uIHBvc3RMaW5rKHNjb3BlLCBlbGVtZW50LCBhdHRycykge1xuICAgICAgICAgICAgZmlyZVBhZ2VJbml0RXZlbnQoZWxlbWVudFswXSk7XG4gICAgICAgICAgfVxuICAgICAgICB9O1xuICAgICAgfVxuICAgIH07XG4gIH0pO1xufSkoKTtcbiIsIi8qKlxuICogQGVsZW1lbnQgb25zLXBvcG92ZXJcbiAqL1xuXG4vKipcbiAqIEBhdHRyaWJ1dGUgdmFyXG4gKiBAaW5pdG9ubHlcbiAqIEB0eXBlIHtTdHJpbmd9XG4gKiBAZGVzY3JpcHRpb25cbiAqICBbZW5dVmFyaWFibGUgbmFtZSB0byByZWZlciB0aGlzIHBvcG92ZXIuWy9lbl1cbiAqICBbamFd44GT44Gu44Od44OD44OX44Kq44O844OQ44O844KS5Y+C54Wn44GZ44KL44Gf44KB44Gu5ZCN5YmN44KS5oyH5a6a44GX44G+44GZ44CCWy9qYV1cbiAqL1xuXG4vKipcbiAqIEBhdHRyaWJ1dGUgb25zLXByZXNob3dcbiAqIEBpbml0b25seVxuICogQHR5cGUge0V4cHJlc3Npb259XG4gKiBAZGVzY3JpcHRpb25cbiAqICBbZW5dQWxsb3dzIHlvdSB0byBzcGVjaWZ5IGN1c3RvbSBiZWhhdmlvciB3aGVuIHRoZSBcInByZXNob3dcIiBldmVudCBpcyBmaXJlZC5bL2VuXVxuICogIFtqYV1cInByZXNob3dcIuOCpOODmeODs+ODiOOBjOeZuueBq+OBleOCjOOBn+aZguOBruaMmeWLleOCkueLrOiHquOBq+aMh+WumuOBp+OBjeOBvuOBmeOAglsvamFdXG4gKi9cblxuLyoqXG4gKiBAYXR0cmlidXRlIG9ucy1wcmVoaWRlXG4gKiBAaW5pdG9ubHlcbiAqIEB0eXBlIHtFeHByZXNzaW9ufVxuICogQGRlc2NyaXB0aW9uXG4gKiAgW2VuXUFsbG93cyB5b3UgdG8gc3BlY2lmeSBjdXN0b20gYmVoYXZpb3Igd2hlbiB0aGUgXCJwcmVoaWRlXCIgZXZlbnQgaXMgZmlyZWQuWy9lbl1cbiAqICBbamFdXCJwcmVoaWRlXCLjgqTjg5njg7Pjg4jjgYznmbrngavjgZXjgozjgZ/mmYLjga7mjJnli5XjgpLni6zoh6rjgavmjIflrprjgafjgY3jgb7jgZnjgIJbL2phXVxuICovXG5cbi8qKlxuICogQGF0dHJpYnV0ZSBvbnMtcG9zdHNob3dcbiAqIEBpbml0b25seVxuICogQHR5cGUge0V4cHJlc3Npb259XG4gKiBAZGVzY3JpcHRpb25cbiAqICBbZW5dQWxsb3dzIHlvdSB0byBzcGVjaWZ5IGN1c3RvbSBiZWhhdmlvciB3aGVuIHRoZSBcInBvc3RzaG93XCIgZXZlbnQgaXMgZmlyZWQuWy9lbl1cbiAqICBbamFdXCJwb3N0c2hvd1wi44Kk44OZ44Oz44OI44GM55m654Gr44GV44KM44Gf5pmC44Gu5oyZ5YuV44KS54us6Ieq44Gr5oyH5a6a44Gn44GN44G+44GZ44CCWy9qYV1cbiAqL1xuXG4vKipcbiAqIEBhdHRyaWJ1dGUgb25zLXBvc3RoaWRlXG4gKiBAaW5pdG9ubHlcbiAqIEB0eXBlIHtFeHByZXNzaW9ufVxuICogQGRlc2NyaXB0aW9uXG4gKiAgW2VuXUFsbG93cyB5b3UgdG8gc3BlY2lmeSBjdXN0b20gYmVoYXZpb3Igd2hlbiB0aGUgXCJwb3N0aGlkZVwiIGV2ZW50IGlzIGZpcmVkLlsvZW5dXG4gKiAgW2phXVwicG9zdGhpZGVcIuOCpOODmeODs+ODiOOBjOeZuueBq+OBleOCjOOBn+aZguOBruaMmeWLleOCkueLrOiHquOBq+aMh+WumuOBp+OBjeOBvuOBmeOAglsvamFdXG4gKi9cblxuLyoqXG4gKiBAYXR0cmlidXRlIG9ucy1kZXN0cm95XG4gKiBAaW5pdG9ubHlcbiAqIEB0eXBlIHtFeHByZXNzaW9ufVxuICogQGRlc2NyaXB0aW9uXG4gKiAgW2VuXUFsbG93cyB5b3UgdG8gc3BlY2lmeSBjdXN0b20gYmVoYXZpb3Igd2hlbiB0aGUgXCJkZXN0cm95XCIgZXZlbnQgaXMgZmlyZWQuWy9lbl1cbiAqICBbamFdXCJkZXN0cm95XCLjgqTjg5njg7Pjg4jjgYznmbrngavjgZXjgozjgZ/mmYLjga7mjJnli5XjgpLni6zoh6rjgavmjIflrprjgafjgY3jgb7jgZnjgIJbL2phXVxuICovXG5cbi8qKlxuICogQG1ldGhvZCBvblxuICogQHNpZ25hdHVyZSBvbihldmVudE5hbWUsIGxpc3RlbmVyKVxuICogQGRlc2NyaXB0aW9uXG4gKiAgIFtlbl1BZGQgYW4gZXZlbnQgbGlzdGVuZXIuWy9lbl1cbiAqICAgW2phXeOCpOODmeODs+ODiOODquOCueODiuODvOOCkui/veWKoOOBl+OBvuOBmeOAglsvamFdXG4gKiBAcGFyYW0ge1N0cmluZ30gZXZlbnROYW1lXG4gKiAgIFtlbl1OYW1lIG9mIHRoZSBldmVudC5bL2VuXVxuICogICBbamFd44Kk44OZ44Oz44OI5ZCN44KS5oyH5a6a44GX44G+44GZ44CCWy9qYV1cbiAqIEBwYXJhbSB7RnVuY3Rpb259IGxpc3RlbmVyXG4gKiAgIFtlbl1GdW5jdGlvbiB0byBleGVjdXRlIHdoZW4gdGhlIGV2ZW50IGlzIHRyaWdnZXJlZC5bL2VuXVxuICogICBbamFd44GT44Gu44Kk44OZ44Oz44OI44GM55m654Gr44GV44KM44Gf6Zqb44Gr5ZG844Gz5Ye644GV44KM44KL6Zai5pWw44Kq44OW44K444Kn44Kv44OI44KS5oyH5a6a44GX44G+44GZ44CCWy9qYV1cbiAqL1xuXG4vKipcbiAqIEBtZXRob2Qgb25jZVxuICogQHNpZ25hdHVyZSBvbmNlKGV2ZW50TmFtZSwgbGlzdGVuZXIpXG4gKiBAZGVzY3JpcHRpb25cbiAqICBbZW5dQWRkIGFuIGV2ZW50IGxpc3RlbmVyIHRoYXQncyBvbmx5IHRyaWdnZXJlZCBvbmNlLlsvZW5dXG4gKiAgW2phXeS4gOW6puOBoOOBkeWRvOOBs+WHuuOBleOCjOOCi+OCpOODmeODs+ODiOODquOCueODiuODvOOCkui/veWKoOOBl+OBvuOBmeOAglsvamFdXG4gKiBAcGFyYW0ge1N0cmluZ30gZXZlbnROYW1lXG4gKiAgIFtlbl1OYW1lIG9mIHRoZSBldmVudC5bL2VuXVxuICogICBbamFd44Kk44OZ44Oz44OI5ZCN44KS5oyH5a6a44GX44G+44GZ44CCWy9qYV1cbiAqIEBwYXJhbSB7RnVuY3Rpb259IGxpc3RlbmVyXG4gKiAgIFtlbl1GdW5jdGlvbiB0byBleGVjdXRlIHdoZW4gdGhlIGV2ZW50IGlzIHRyaWdnZXJlZC5bL2VuXVxuICogICBbamFd44Kk44OZ44Oz44OI44GM55m654Gr44GX44Gf6Zqb44Gr5ZG844Gz5Ye644GV44KM44KL6Zai5pWw44Kq44OW44K444Kn44Kv44OI44KS5oyH5a6a44GX44G+44GZ44CCWy9qYV1cbiAqL1xuXG4vKipcbiAqIEBtZXRob2Qgb2ZmXG4gKiBAc2lnbmF0dXJlIG9mZihldmVudE5hbWUsIFtsaXN0ZW5lcl0pXG4gKiBAZGVzY3JpcHRpb25cbiAqICBbZW5dUmVtb3ZlIGFuIGV2ZW50IGxpc3RlbmVyLiBJZiB0aGUgbGlzdGVuZXIgaXMgbm90IHNwZWNpZmllZCBhbGwgbGlzdGVuZXJzIGZvciB0aGUgZXZlbnQgdHlwZSB3aWxsIGJlIHJlbW92ZWQuWy9lbl1cbiAqICBbamFd44Kk44OZ44Oz44OI44Oq44K544OK44O844KS5YmK6Zmk44GX44G+44GZ44CC44KC44GX44Kk44OZ44Oz44OI44Oq44K544OK44O844KS5oyH5a6a44GX44Gq44GL44Gj44Gf5aC05ZCI44Gr44Gv44CB44Gd44Gu44Kk44OZ44Oz44OI44Gr57SQ44Gl44GP5YWo44Gm44Gu44Kk44OZ44Oz44OI44Oq44K544OK44O844GM5YmK6Zmk44GV44KM44G+44GZ44CCWy9qYV1cbiAqIEBwYXJhbSB7U3RyaW5nfSBldmVudE5hbWVcbiAqICAgW2VuXU5hbWUgb2YgdGhlIGV2ZW50LlsvZW5dXG4gKiAgIFtqYV3jgqTjg5njg7Pjg4jlkI3jgpLmjIflrprjgZfjgb7jgZnjgIJbL2phXVxuICogQHBhcmFtIHtGdW5jdGlvbn0gbGlzdGVuZXJcbiAqICAgW2VuXUZ1bmN0aW9uIHRvIGV4ZWN1dGUgd2hlbiB0aGUgZXZlbnQgaXMgdHJpZ2dlcmVkLlsvZW5dXG4gKiAgIFtqYV3liYrpmaTjgZnjgovjgqTjg5njg7Pjg4jjg6rjgrnjg4rjg7zjgpLmjIflrprjgZfjgb7jgZnjgIJbL2phXVxuICovXG5cbihmdW5jdGlvbigpe1xuICAndXNlIHN0cmljdCc7XG5cbiAgdmFyIG1vZHVsZSA9IGFuZ3VsYXIubW9kdWxlKCdvbnNlbicpO1xuXG4gIG1vZHVsZS5kaXJlY3RpdmUoJ29uc1BvcG92ZXInLCBmdW5jdGlvbigkb25zZW4sIFBvcG92ZXJWaWV3KSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHJlc3RyaWN0OiAnRScsXG4gICAgICByZXBsYWNlOiBmYWxzZSxcbiAgICAgIHNjb3BlOiB0cnVlLFxuICAgICAgY29tcGlsZTogZnVuY3Rpb24oZWxlbWVudCwgYXR0cnMpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICBwcmU6IGZ1bmN0aW9uKHNjb3BlLCBlbGVtZW50LCBhdHRycykge1xuXG4gICAgICAgICAgICB2YXIgcG9wb3ZlciA9IG5ldyBQb3BvdmVyVmlldyhzY29wZSwgZWxlbWVudCwgYXR0cnMpO1xuXG4gICAgICAgICAgICAkb25zZW4uZGVjbGFyZVZhckF0dHJpYnV0ZShhdHRycywgcG9wb3Zlcik7XG4gICAgICAgICAgICAkb25zZW4ucmVnaXN0ZXJFdmVudEhhbmRsZXJzKHBvcG92ZXIsICdwcmVzaG93IHByZWhpZGUgcG9zdHNob3cgcG9zdGhpZGUgZGVzdHJveScpO1xuICAgICAgICAgICAgJG9uc2VuLmFkZE1vZGlmaWVyTWV0aG9kc0ZvckN1c3RvbUVsZW1lbnRzKHBvcG92ZXIsIGVsZW1lbnQpO1xuXG4gICAgICAgICAgICBlbGVtZW50LmRhdGEoJ29ucy1wb3BvdmVyJywgcG9wb3Zlcik7XG5cbiAgICAgICAgICAgIHNjb3BlLiRvbignJGRlc3Ryb3knLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgcG9wb3Zlci5fZXZlbnRzID0gdW5kZWZpbmVkO1xuICAgICAgICAgICAgICAkb25zZW4ucmVtb3ZlTW9kaWZpZXJNZXRob2RzKHBvcG92ZXIpO1xuICAgICAgICAgICAgICBlbGVtZW50LmRhdGEoJ29ucy1wb3BvdmVyJywgdW5kZWZpbmVkKTtcbiAgICAgICAgICAgICAgZWxlbWVudCA9IG51bGw7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9LFxuXG4gICAgICAgICAgcG9zdDogZnVuY3Rpb24oc2NvcGUsIGVsZW1lbnQpIHtcbiAgICAgICAgICAgICRvbnNlbi5maXJlQ29tcG9uZW50RXZlbnQoZWxlbWVudFswXSwgJ2luaXQnKTtcbiAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgICB9XG4gICAgfTtcbiAgfSk7XG59KSgpO1xuXG4iLCIvKipcbiAqIEBlbGVtZW50IG9ucy1wdWxsLWhvb2tcbiAqIEBleGFtcGxlXG4gKiA8c2NyaXB0PlxuICogICBvbnMuYm9vdHN0cmFwKClcbiAqXG4gKiAgIC5jb250cm9sbGVyKCdNeUNvbnRyb2xsZXInLCBmdW5jdGlvbigkc2NvcGUsICR0aW1lb3V0KSB7XG4gKiAgICAgJHNjb3BlLml0ZW1zID0gWzMsIDIgLDFdO1xuICpcbiAqICAgICAkc2NvcGUubG9hZCA9IGZ1bmN0aW9uKCRkb25lKSB7XG4gKiAgICAgICAkdGltZW91dChmdW5jdGlvbigpIHtcbiAqICAgICAgICAgJHNjb3BlLml0ZW1zLnVuc2hpZnQoJHNjb3BlLml0ZW1zLmxlbmd0aCArIDEpO1xuICogICAgICAgICAkZG9uZSgpO1xuICogICAgICAgfSwgMTAwMCk7XG4gKiAgICAgfTtcbiAqICAgfSk7XG4gKiA8L3NjcmlwdD5cbiAqXG4gKiA8b25zLXBhZ2UgbmctY29udHJvbGxlcj1cIk15Q29udHJvbGxlclwiPlxuICogICA8b25zLXB1bGwtaG9vayB2YXI9XCJsb2FkZXJcIiBuZy1hY3Rpb249XCJsb2FkKCRkb25lKVwiPlxuICogICAgIDxzcGFuIG5nLXN3aXRjaD1cImxvYWRlci5zdGF0ZVwiPlxuICogICAgICAgPHNwYW4gbmctc3dpdGNoLXdoZW49XCJpbml0aWFsXCI+UHVsbCBkb3duIHRvIHJlZnJlc2g8L3NwYW4+XG4gKiAgICAgICA8c3BhbiBuZy1zd2l0Y2gtd2hlbj1cInByZWFjdGlvblwiPlJlbGVhc2UgdG8gcmVmcmVzaDwvc3Bhbj5cbiAqICAgICAgIDxzcGFuIG5nLXN3aXRjaC13aGVuPVwiYWN0aW9uXCI+TG9hZGluZyBkYXRhLiBQbGVhc2Ugd2FpdC4uLjwvc3Bhbj5cbiAqICAgICA8L3NwYW4+XG4gKiAgIDwvb25zLXB1bGwtaG9vaz5cbiAqICAgPG9ucy1saXN0PlxuICogICAgIDxvbnMtbGlzdC1pdGVtIG5nLXJlcGVhdD1cIml0ZW0gaW4gaXRlbXNcIj5cbiAqICAgICAgIEl0ZW0gI3t7IGl0ZW0gfX1cbiAqICAgICA8L29ucy1saXN0LWl0ZW0+XG4gKiAgIDwvb25zLWxpc3Q+XG4gKiA8L29ucy1wYWdlPlxuICovXG5cbi8qKlxuICogQGF0dHJpYnV0ZSB2YXJcbiAqIEBpbml0b25seVxuICogQHR5cGUge1N0cmluZ31cbiAqIEBkZXNjcmlwdGlvblxuICogICBbZW5dVmFyaWFibGUgbmFtZSB0byByZWZlciB0aGlzIGNvbXBvbmVudC5bL2VuXVxuICogICBbamFd44GT44Gu44Kz44Oz44Od44O844ON44Oz44OI44KS5Y+C54Wn44GZ44KL44Gf44KB44Gu5ZCN5YmN44KS5oyH5a6a44GX44G+44GZ44CCWy9qYV1cbiAqL1xuXG4vKipcbiAqIEBhdHRyaWJ1dGUgbmctYWN0aW9uXG4gKiBAaW5pdG9ubHlcbiAqIEB0eXBlIHtFeHByZXNzaW9ufVxuICogQGRlc2NyaXB0aW9uXG4gKiAgIFtlbl1Vc2UgdG8gc3BlY2lmeSBjdXN0b20gYmVoYXZpb3Igd2hlbiB0aGUgcGFnZSBpcyBwdWxsZWQgZG93bi4gQSA8Y29kZT4kZG9uZTwvY29kZT4gZnVuY3Rpb24gaXMgYXZhaWxhYmxlIHRvIHRlbGwgdGhlIGNvbXBvbmVudCB0aGF0IHRoZSBhY3Rpb24gaXMgY29tcGxldGVkLlsvZW5dXG4gKiAgIFtqYV1wdWxsIGRvd27jgZfjgZ/jgajjgY3jga7mjK/jgovoiJ7jgYTjgpLmjIflrprjgZfjgb7jgZnjgILjgqLjgq/jgrfjg6fjg7PjgYzlrozkuobjgZfjgZ/mmYLjgavjga88Y29kZT4kZG9uZTwvY29kZT7plqLmlbDjgpLlkbzjgbPlh7rjgZfjgb7jgZnjgIJbL2phXVxuICovXG5cbi8qKlxuICogQGF0dHJpYnV0ZSBvbnMtY2hhbmdlc3RhdGVcbiAqIEBpbml0b25seVxuICogQHR5cGUge0V4cHJlc3Npb259XG4gKiBAZGVzY3JpcHRpb25cbiAqICBbZW5dQWxsb3dzIHlvdSB0byBzcGVjaWZ5IGN1c3RvbSBiZWhhdmlvciB3aGVuIHRoZSBcImNoYW5nZXN0YXRlXCIgZXZlbnQgaXMgZmlyZWQuWy9lbl1cbiAqICBbamFdXCJjaGFuZ2VzdGF0ZVwi44Kk44OZ44Oz44OI44GM55m654Gr44GV44KM44Gf5pmC44Gu5oyZ5YuV44KS54us6Ieq44Gr5oyH5a6a44Gn44GN44G+44GZ44CCWy9qYV1cbiAqL1xuXG4vKipcbiAqIEBtZXRob2Qgb25cbiAqIEBzaWduYXR1cmUgb24oZXZlbnROYW1lLCBsaXN0ZW5lcilcbiAqIEBkZXNjcmlwdGlvblxuICogICBbZW5dQWRkIGFuIGV2ZW50IGxpc3RlbmVyLlsvZW5dXG4gKiAgIFtqYV3jgqTjg5njg7Pjg4jjg6rjgrnjg4rjg7zjgpLov73liqDjgZfjgb7jgZnjgIJbL2phXVxuICogQHBhcmFtIHtTdHJpbmd9IGV2ZW50TmFtZVxuICogICBbZW5dTmFtZSBvZiB0aGUgZXZlbnQuWy9lbl1cbiAqICAgW2phXeOCpOODmeODs+ODiOWQjeOCkuaMh+WumuOBl+OBvuOBmeOAglsvamFdXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBsaXN0ZW5lclxuICogICBbZW5dRnVuY3Rpb24gdG8gZXhlY3V0ZSB3aGVuIHRoZSBldmVudCBpcyB0cmlnZ2VyZWQuWy9lbl1cbiAqICAgW2phXeOBk+OBruOCpOODmeODs+ODiOOBjOeZuueBq+OBleOCjOOBn+mam+OBq+WRvOOBs+WHuuOBleOCjOOCi+mWouaVsOOCquODluOCuOOCp+OCr+ODiOOCkuaMh+WumuOBl+OBvuOBmeOAglsvamFdXG4gKi9cblxuLyoqXG4gKiBAbWV0aG9kIG9uY2VcbiAqIEBzaWduYXR1cmUgb25jZShldmVudE5hbWUsIGxpc3RlbmVyKVxuICogQGRlc2NyaXB0aW9uXG4gKiAgW2VuXUFkZCBhbiBldmVudCBsaXN0ZW5lciB0aGF0J3Mgb25seSB0cmlnZ2VyZWQgb25jZS5bL2VuXVxuICogIFtqYV3kuIDluqbjgaDjgZHlkbzjgbPlh7rjgZXjgozjgovjgqTjg5njg7Pjg4jjg6rjgrnjg4rjg7zjgpLov73liqDjgZfjgb7jgZnjgIJbL2phXVxuICogQHBhcmFtIHtTdHJpbmd9IGV2ZW50TmFtZVxuICogICBbZW5dTmFtZSBvZiB0aGUgZXZlbnQuWy9lbl1cbiAqICAgW2phXeOCpOODmeODs+ODiOWQjeOCkuaMh+WumuOBl+OBvuOBmeOAglsvamFdXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBsaXN0ZW5lclxuICogICBbZW5dRnVuY3Rpb24gdG8gZXhlY3V0ZSB3aGVuIHRoZSBldmVudCBpcyB0cmlnZ2VyZWQuWy9lbl1cbiAqICAgW2phXeOCpOODmeODs+ODiOOBjOeZuueBq+OBl+OBn+mam+OBq+WRvOOBs+WHuuOBleOCjOOCi+mWouaVsOOCquODluOCuOOCp+OCr+ODiOOCkuaMh+WumuOBl+OBvuOBmeOAglsvamFdXG4gKi9cblxuLyoqXG4gKiBAbWV0aG9kIG9mZlxuICogQHNpZ25hdHVyZSBvZmYoZXZlbnROYW1lLCBbbGlzdGVuZXJdKVxuICogQGRlc2NyaXB0aW9uXG4gKiAgW2VuXVJlbW92ZSBhbiBldmVudCBsaXN0ZW5lci4gSWYgdGhlIGxpc3RlbmVyIGlzIG5vdCBzcGVjaWZpZWQgYWxsIGxpc3RlbmVycyBmb3IgdGhlIGV2ZW50IHR5cGUgd2lsbCBiZSByZW1vdmVkLlsvZW5dXG4gKiAgW2phXeOCpOODmeODs+ODiOODquOCueODiuODvOOCkuWJiumZpOOBl+OBvuOBmeOAguOCguOBl+OCpOODmeODs+ODiOODquOCueODiuODvOOCkuaMh+WumuOBl+OBquOBi+OBo+OBn+WgtOWQiOOBq+OBr+OAgeOBneOBruOCpOODmeODs+ODiOOBq+e0kOOBpeOBj+WFqOOBpuOBruOCpOODmeODs+ODiOODquOCueODiuODvOOBjOWJiumZpOOBleOCjOOBvuOBmeOAglsvamFdXG4gKiBAcGFyYW0ge1N0cmluZ30gZXZlbnROYW1lXG4gKiAgIFtlbl1OYW1lIG9mIHRoZSBldmVudC5bL2VuXVxuICogICBbamFd44Kk44OZ44Oz44OI5ZCN44KS5oyH5a6a44GX44G+44GZ44CCWy9qYV1cbiAqIEBwYXJhbSB7RnVuY3Rpb259IGxpc3RlbmVyXG4gKiAgIFtlbl1GdW5jdGlvbiB0byBleGVjdXRlIHdoZW4gdGhlIGV2ZW50IGlzIHRyaWdnZXJlZC5bL2VuXVxuICogICBbamFd5YmK6Zmk44GZ44KL44Kk44OZ44Oz44OI44Oq44K544OK44O844KS5oyH5a6a44GX44G+44GZ44CCWy9qYV1cbiAqL1xuXG4oZnVuY3Rpb24oKSB7XG4gICd1c2Ugc3RyaWN0JztcblxuICAvKipcbiAgICogUHVsbCBob29rIGRpcmVjdGl2ZS5cbiAgICovXG4gIGFuZ3VsYXIubW9kdWxlKCdvbnNlbicpLmRpcmVjdGl2ZSgnb25zUHVsbEhvb2snLCBmdW5jdGlvbigkb25zZW4sIFB1bGxIb29rVmlldykge1xuICAgIHJldHVybiB7XG4gICAgICByZXN0cmljdDogJ0UnLFxuICAgICAgcmVwbGFjZTogZmFsc2UsXG4gICAgICBzY29wZTogdHJ1ZSxcblxuICAgICAgY29tcGlsZTogZnVuY3Rpb24oZWxlbWVudCwgYXR0cnMpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICBwcmU6IGZ1bmN0aW9uKHNjb3BlLCBlbGVtZW50LCBhdHRycykge1xuICAgICAgICAgICAgdmFyIHB1bGxIb29rID0gbmV3IFB1bGxIb29rVmlldyhzY29wZSwgZWxlbWVudCwgYXR0cnMpO1xuXG4gICAgICAgICAgICAkb25zZW4uZGVjbGFyZVZhckF0dHJpYnV0ZShhdHRycywgcHVsbEhvb2spO1xuICAgICAgICAgICAgJG9uc2VuLnJlZ2lzdGVyRXZlbnRIYW5kbGVycyhwdWxsSG9vaywgJ2NoYW5nZXN0YXRlIGRlc3Ryb3knKTtcbiAgICAgICAgICAgIGVsZW1lbnQuZGF0YSgnb25zLXB1bGwtaG9vaycsIHB1bGxIb29rKTtcblxuICAgICAgICAgICAgc2NvcGUuJG9uKCckZGVzdHJveScsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICBwdWxsSG9vay5fZXZlbnRzID0gdW5kZWZpbmVkO1xuICAgICAgICAgICAgICBlbGVtZW50LmRhdGEoJ29ucy1wdWxsLWhvb2snLCB1bmRlZmluZWQpO1xuICAgICAgICAgICAgICBzY29wZSA9IGVsZW1lbnQgPSBhdHRycyA9IG51bGw7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9LFxuICAgICAgICAgIHBvc3Q6IGZ1bmN0aW9uKHNjb3BlLCBlbGVtZW50KSB7XG4gICAgICAgICAgICAkb25zZW4uZmlyZUNvbXBvbmVudEV2ZW50KGVsZW1lbnRbMF0sICdpbml0Jyk7XG4gICAgICAgICAgfVxuICAgICAgICB9O1xuICAgICAgfVxuICAgIH07XG4gIH0pO1xuXG59KSgpO1xuIiwiLyoqXG4gKiBAZWxlbWVudCBvbnMtcmFkaW9cbiAqL1xuXG4oZnVuY3Rpb24oKXtcbiAgJ3VzZSBzdHJpY3QnO1xuXG4gIGFuZ3VsYXIubW9kdWxlKCdvbnNlbicpLmRpcmVjdGl2ZSgnb25zUmFkaW8nLCBmdW5jdGlvbigkcGFyc2UpIHtcbiAgICByZXR1cm4ge1xuICAgICAgcmVzdHJpY3Q6ICdFJyxcbiAgICAgIHJlcGxhY2U6IGZhbHNlLFxuICAgICAgc2NvcGU6IGZhbHNlLFxuXG4gICAgICBsaW5rOiBmdW5jdGlvbihzY29wZSwgZWxlbWVudCwgYXR0cnMpIHtcbiAgICAgICAgbGV0IGVsID0gZWxlbWVudFswXTtcblxuICAgICAgICBjb25zdCBvbkNoYW5nZSA9ICgpID0+IHtcbiAgICAgICAgICAkcGFyc2UoYXR0cnMubmdNb2RlbCkuYXNzaWduKHNjb3BlLCBlbC52YWx1ZSk7XG4gICAgICAgICAgYXR0cnMubmdDaGFuZ2UgJiYgc2NvcGUuJGV2YWwoYXR0cnMubmdDaGFuZ2UpO1xuICAgICAgICAgIHNjb3BlLiRwYXJlbnQuJGV2YWxBc3luYygpO1xuICAgICAgICB9O1xuXG4gICAgICAgIGlmIChhdHRycy5uZ01vZGVsKSB7XG4gICAgICAgICAgc2NvcGUuJHdhdGNoKGF0dHJzLm5nTW9kZWwsIHZhbHVlID0+IGVsLmNoZWNrZWQgPSB2YWx1ZSA9PT0gZWwudmFsdWUpO1xuICAgICAgICAgIGVsZW1lbnQub24oJ2NoYW5nZScsIG9uQ2hhbmdlKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHNjb3BlLiRvbignJGRlc3Ryb3knLCAoKSA9PiB7XG4gICAgICAgICAgZWxlbWVudC5vZmYoJ2NoYW5nZScsIG9uQ2hhbmdlKTtcbiAgICAgICAgICBzY29wZSA9IGVsZW1lbnQgPSBhdHRycyA9IGVsID0gbnVsbDtcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfTtcbiAgfSk7XG59KSgpO1xuIiwiKGZ1bmN0aW9uKCl7XG4gICd1c2Ugc3RyaWN0JztcblxuICBhbmd1bGFyLm1vZHVsZSgnb25zZW4nKS5kaXJlY3RpdmUoJ29uc1JhbmdlJywgZnVuY3Rpb24oJHBhcnNlKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHJlc3RyaWN0OiAnRScsXG4gICAgICByZXBsYWNlOiBmYWxzZSxcbiAgICAgIHNjb3BlOiBmYWxzZSxcblxuICAgICAgbGluazogZnVuY3Rpb24oc2NvcGUsIGVsZW1lbnQsIGF0dHJzKSB7XG5cbiAgICAgICAgY29uc3Qgb25JbnB1dCA9ICgpID0+IHtcbiAgICAgICAgICBjb25zdCBzZXQgPSAkcGFyc2UoYXR0cnMubmdNb2RlbCkuYXNzaWduO1xuXG4gICAgICAgICAgc2V0KHNjb3BlLCBlbGVtZW50WzBdLnZhbHVlKTtcbiAgICAgICAgICBpZiAoYXR0cnMubmdDaGFuZ2UpIHtcbiAgICAgICAgICAgIHNjb3BlLiRldmFsKGF0dHJzLm5nQ2hhbmdlKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgc2NvcGUuJHBhcmVudC4kZXZhbEFzeW5jKCk7XG4gICAgICAgIH07XG5cbiAgICAgICAgaWYgKGF0dHJzLm5nTW9kZWwpIHtcbiAgICAgICAgICBzY29wZS4kd2F0Y2goYXR0cnMubmdNb2RlbCwgKHZhbHVlKSA9PiB7XG4gICAgICAgICAgICBlbGVtZW50WzBdLnZhbHVlID0gdmFsdWU7XG4gICAgICAgICAgfSk7XG5cbiAgICAgICAgICBlbGVtZW50Lm9uKCdpbnB1dCcsIG9uSW5wdXQpO1xuICAgICAgICB9XG5cbiAgICAgICAgc2NvcGUuJG9uKCckZGVzdHJveScsICgpID0+IHtcbiAgICAgICAgICBlbGVtZW50Lm9mZignaW5wdXQnLCBvbklucHV0KTtcbiAgICAgICAgICBzY29wZSA9IGVsZW1lbnQgPSBhdHRycyA9IG51bGw7XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH07XG4gIH0pO1xufSkoKTtcbiIsIihmdW5jdGlvbigpIHtcbiAgJ3VzZSBzdHJpY3QnO1xuXG4gIGFuZ3VsYXIubW9kdWxlKCdvbnNlbicpLmRpcmVjdGl2ZSgnb25zUmlwcGxlJywgZnVuY3Rpb24oJG9uc2VuLCBHZW5lcmljVmlldykge1xuICAgIHJldHVybiB7XG4gICAgICByZXN0cmljdDogJ0UnLFxuICAgICAgbGluazogZnVuY3Rpb24oc2NvcGUsIGVsZW1lbnQsIGF0dHJzKSB7XG4gICAgICAgIEdlbmVyaWNWaWV3LnJlZ2lzdGVyKHNjb3BlLCBlbGVtZW50LCBhdHRycywge3ZpZXdLZXk6ICdvbnMtcmlwcGxlJ30pO1xuICAgICAgICAkb25zZW4uZmlyZUNvbXBvbmVudEV2ZW50KGVsZW1lbnRbMF0sICdpbml0Jyk7XG4gICAgICB9XG4gICAgfTtcbiAgfSk7XG59KSgpO1xuIiwiLyoqXG4gKiBAZWxlbWVudCBvbnMtc2NvcGVcbiAqIEBjYXRlZ29yeSB1dGlsXG4gKiBAZGVzY3JpcHRpb25cbiAqICAgW2VuXUFsbCBjaGlsZCBlbGVtZW50cyB1c2luZyB0aGUgXCJ2YXJcIiBhdHRyaWJ1dGUgd2lsbCBiZSBhdHRhY2hlZCB0byB0aGUgc2NvcGUgb2YgdGhpcyBlbGVtZW50LlsvZW5dXG4gKiAgIFtqYV1cInZhclwi5bGe5oCn44KS5L2/44Gj44Gm44GE44KL5YWo44Gm44Gu5a2Q6KaB57Sg44Gudmlld+OCquODluOCuOOCp+OCr+ODiOOBr+OAgeOBk+OBruimgee0oOOBrkFuZ3VsYXJKU+OCueOCs+ODvOODl+OBq+i/veWKoOOBleOCjOOBvuOBmeOAglsvamFdXG4gKiBAZXhhbXBsZVxuICogPG9ucy1saXN0PlxuICogICA8b25zLWxpc3QtaXRlbSBvbnMtc2NvcGUgbmctcmVwZWF0PVwiaXRlbSBpbiBpdGVtc1wiPlxuICogICAgIDxvbnMtY2Fyb3VzZWwgdmFyPVwiY2Fyb3VzZWxcIj5cbiAqICAgICAgIDxvbnMtY2Fyb3VzZWwtaXRlbSBuZy1jbGljaz1cImNhcm91c2VsLm5leHQoKVwiPlxuICogICAgICAgICB7eyBpdGVtIH19XG4gKiAgICAgICA8L29ucy1jYXJvdXNlbC1pdGVtPlxuICogICAgICAgPC9vbnMtY2Fyb3VzZWwtaXRlbSBuZy1jbGljaz1cImNhcm91c2VsLnByZXYoKVwiPlxuICogICAgICAgICAuLi5cbiAqICAgICAgIDwvb25zLWNhcm91c2VsLWl0ZW0+XG4gKiAgICAgPC9vbnMtY2Fyb3VzZWw+XG4gKiAgIDwvb25zLWxpc3QtaXRlbT5cbiAqIDwvb25zLWxpc3Q+XG4gKi9cblxuKGZ1bmN0aW9uKCkge1xuICAndXNlIHN0cmljdCc7XG5cbiAgdmFyIG1vZHVsZSA9IGFuZ3VsYXIubW9kdWxlKCdvbnNlbicpO1xuXG4gIG1vZHVsZS5kaXJlY3RpdmUoJ29uc1Njb3BlJywgZnVuY3Rpb24oJG9uc2VuKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHJlc3RyaWN0OiAnQScsXG4gICAgICByZXBsYWNlOiBmYWxzZSxcbiAgICAgIHRyYW5zY2x1ZGU6IGZhbHNlLFxuICAgICAgc2NvcGU6IGZhbHNlLFxuXG4gICAgICBsaW5rOiBmdW5jdGlvbihzY29wZSwgZWxlbWVudCkge1xuICAgICAgICBlbGVtZW50LmRhdGEoJ19zY29wZScsIHNjb3BlKTtcblxuICAgICAgICBzY29wZS4kb24oJyRkZXN0cm95JywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgZWxlbWVudC5kYXRhKCdfc2NvcGUnLCB1bmRlZmluZWQpO1xuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9O1xuICB9KTtcbn0pKCk7XG4iLCIvKipcbiAqIEBlbGVtZW50IG9ucy1zZWFyY2gtaW5wdXRcbiAqL1xuXG4oZnVuY3Rpb24oKXtcbiAgJ3VzZSBzdHJpY3QnO1xuXG4gIGFuZ3VsYXIubW9kdWxlKCdvbnNlbicpLmRpcmVjdGl2ZSgnb25zU2VhcmNoSW5wdXQnLCBmdW5jdGlvbigkcGFyc2UpIHtcbiAgICByZXR1cm4ge1xuICAgICAgcmVzdHJpY3Q6ICdFJyxcbiAgICAgIHJlcGxhY2U6IGZhbHNlLFxuICAgICAgc2NvcGU6IGZhbHNlLFxuXG4gICAgICBsaW5rOiBmdW5jdGlvbihzY29wZSwgZWxlbWVudCwgYXR0cnMpIHtcbiAgICAgICAgbGV0IGVsID0gZWxlbWVudFswXTtcblxuICAgICAgICBjb25zdCBvbklucHV0ID0gKCkgPT4ge1xuICAgICAgICAgICRwYXJzZShhdHRycy5uZ01vZGVsKS5hc3NpZ24oc2NvcGUsIGVsLnR5cGUgPT09ICdudW1iZXInID8gTnVtYmVyKGVsLnZhbHVlKSA6IGVsLnZhbHVlKTtcbiAgICAgICAgICBhdHRycy5uZ0NoYW5nZSAmJiBzY29wZS4kZXZhbChhdHRycy5uZ0NoYW5nZSk7XG4gICAgICAgICAgc2NvcGUuJHBhcmVudC4kZXZhbEFzeW5jKCk7XG4gICAgICAgIH07XG5cbiAgICAgICAgaWYgKGF0dHJzLm5nTW9kZWwpIHtcbiAgICAgICAgICBzY29wZS4kd2F0Y2goYXR0cnMubmdNb2RlbCwgKHZhbHVlKSA9PiB7XG4gICAgICAgICAgICBpZiAodHlwZW9mIHZhbHVlICE9PSAndW5kZWZpbmVkJyAmJiB2YWx1ZSAhPT0gZWwudmFsdWUpIHtcbiAgICAgICAgICAgICAgZWwudmFsdWUgPSB2YWx1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KTtcblxuICAgICAgICAgIGVsZW1lbnQub24oJ2lucHV0Jywgb25JbnB1dClcbiAgICAgICAgfVxuXG4gICAgICAgIHNjb3BlLiRvbignJGRlc3Ryb3knLCAoKSA9PiB7XG4gICAgICAgICAgZWxlbWVudC5vZmYoJ2lucHV0Jywgb25JbnB1dClcbiAgICAgICAgICBzY29wZSA9IGVsZW1lbnQgPSBhdHRycyA9IGVsID0gbnVsbDtcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfTtcbiAgfSk7XG59KSgpO1xuIiwiLyoqXG4gKiBAZWxlbWVudCBvbnMtc2VnbWVudFxuICovXG5cbi8qKlxuICogQGF0dHJpYnV0ZSB2YXJcbiAqIEBpbml0b25seVxuICogQHR5cGUge1N0cmluZ31cbiAqIEBkZXNjcmlwdGlvblxuICogICBbZW5dVmFyaWFibGUgbmFtZSB0byByZWZlciB0aGlzIHNlZ21lbnQuWy9lbl1cbiAqICAgW2phXeOBk+OBruOCv+ODluODkOODvOOCkuWPgueFp+OBmeOCi+OBn+OCgeOBruWQjeWJjeOCkuaMh+WumuOBl+OBvuOBmeOAglsvamFdXG4gKi9cblxuLyoqXG4gKiBAYXR0cmlidXRlIG9ucy1wb3N0Y2hhbmdlXG4gKiBAaW5pdG9ubHlcbiAqIEB0eXBlIHtFeHByZXNzaW9ufVxuICogQGRlc2NyaXB0aW9uXG4gKiAgW2VuXUFsbG93cyB5b3UgdG8gc3BlY2lmeSBjdXN0b20gYmVoYXZpb3Igd2hlbiB0aGUgXCJwb3N0Y2hhbmdlXCIgZXZlbnQgaXMgZmlyZWQuWy9lbl1cbiAqICBbamFdXCJwb3N0Y2hhbmdlXCLjgqTjg5njg7Pjg4jjgYznmbrngavjgZXjgozjgZ/mmYLjga7mjJnli5XjgpLni6zoh6rjgavmjIflrprjgafjgY3jgb7jgZnjgIJbL2phXVxuICovXG5cbihmdW5jdGlvbigpIHtcbiAgJ3VzZSBzdHJpY3QnO1xuXG4gIGFuZ3VsYXIubW9kdWxlKCdvbnNlbicpLmRpcmVjdGl2ZSgnb25zU2VnbWVudCcsIGZ1bmN0aW9uKCRvbnNlbiwgR2VuZXJpY1ZpZXcpIHtcbiAgICByZXR1cm4ge1xuICAgICAgcmVzdHJpY3Q6ICdFJyxcbiAgICAgIGxpbms6IGZ1bmN0aW9uKHNjb3BlLCBlbGVtZW50LCBhdHRycykge1xuICAgICAgICB2YXIgdmlldyA9IEdlbmVyaWNWaWV3LnJlZ2lzdGVyKHNjb3BlLCBlbGVtZW50LCBhdHRycywge3ZpZXdLZXk6ICdvbnMtc2VnbWVudCd9KTtcbiAgICAgICAgJG9uc2VuLmZpcmVDb21wb25lbnRFdmVudChlbGVtZW50WzBdLCAnaW5pdCcpO1xuICAgICAgICAkb25zZW4ucmVnaXN0ZXJFdmVudEhhbmRsZXJzKHZpZXcsICdwb3N0Y2hhbmdlJyk7XG4gICAgICB9XG4gICAgfTtcbiAgfSk7XG5cbn0pKCk7XG4iLCIvKipcbiAqIEBlbGVtZW50IG9ucy1zZWxlY3RcbiAqL1xuXG4vKipcbiAqIEBtZXRob2Qgb25cbiAqIEBzaWduYXR1cmUgb24oZXZlbnROYW1lLCBsaXN0ZW5lcilcbiAqIEBkZXNjcmlwdGlvblxuICogICBbZW5dQWRkIGFuIGV2ZW50IGxpc3RlbmVyLlsvZW5dXG4gKiAgIFtqYV3jgqTjg5njg7Pjg4jjg6rjgrnjg4rjg7zjgpLov73liqDjgZfjgb7jgZnjgIJbL2phXVxuICogQHBhcmFtIHtTdHJpbmd9IGV2ZW50TmFtZVxuICogICBbZW5dTmFtZSBvZiB0aGUgZXZlbnQuWy9lbl1cbiAqICAgW2phXeOCpOODmeODs+ODiOWQjeOCkuaMh+WumuOBl+OBvuOBmeOAglsvamFdXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBsaXN0ZW5lclxuICogICBbZW5dRnVuY3Rpb24gdG8gZXhlY3V0ZSB3aGVuIHRoZSBldmVudCBpcyB0cmlnZ2VyZWQuWy9lbl1cbiAqICAgW2phXeOBk+OBruOCpOODmeODs+ODiOOBjOeZuueBq+OBleOCjOOBn+mam+OBq+WRvOOBs+WHuuOBleOCjOOCi+mWouaVsOOCquODluOCuOOCp+OCr+ODiOOCkuaMh+WumuOBl+OBvuOBmeOAglsvamFdXG4gKi9cblxuLyoqXG4gKiBAbWV0aG9kIG9uY2VcbiAqIEBzaWduYXR1cmUgb25jZShldmVudE5hbWUsIGxpc3RlbmVyKVxuICogQGRlc2NyaXB0aW9uXG4gKiAgW2VuXUFkZCBhbiBldmVudCBsaXN0ZW5lciB0aGF0J3Mgb25seSB0cmlnZ2VyZWQgb25jZS5bL2VuXVxuICogIFtqYV3kuIDluqbjgaDjgZHlkbzjgbPlh7rjgZXjgozjgovjgqTjg5njg7Pjg4jjg6rjgrnjg4rjg7zjgpLov73liqDjgZfjgb7jgZnjgIJbL2phXVxuICogQHBhcmFtIHtTdHJpbmd9IGV2ZW50TmFtZVxuICogICBbZW5dTmFtZSBvZiB0aGUgZXZlbnQuWy9lbl1cbiAqICAgW2phXeOCpOODmeODs+ODiOWQjeOCkuaMh+WumuOBl+OBvuOBmeOAglsvamFdXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBsaXN0ZW5lclxuICogICBbZW5dRnVuY3Rpb24gdG8gZXhlY3V0ZSB3aGVuIHRoZSBldmVudCBpcyB0cmlnZ2VyZWQuWy9lbl1cbiAqICAgW2phXeOCpOODmeODs+ODiOOBjOeZuueBq+OBl+OBn+mam+OBq+WRvOOBs+WHuuOBleOCjOOCi+mWouaVsOOCquODluOCuOOCp+OCr+ODiOOCkuaMh+WumuOBl+OBvuOBmeOAglsvamFdXG4gKi9cblxuLyoqXG4gKiBAbWV0aG9kIG9mZlxuICogQHNpZ25hdHVyZSBvZmYoZXZlbnROYW1lLCBbbGlzdGVuZXJdKVxuICogQGRlc2NyaXB0aW9uXG4gKiAgW2VuXVJlbW92ZSBhbiBldmVudCBsaXN0ZW5lci4gSWYgdGhlIGxpc3RlbmVyIGlzIG5vdCBzcGVjaWZpZWQgYWxsIGxpc3RlbmVycyBmb3IgdGhlIGV2ZW50IHR5cGUgd2lsbCBiZSByZW1vdmVkLlsvZW5dXG4gKiAgW2phXeOCpOODmeODs+ODiOODquOCueODiuODvOOCkuWJiumZpOOBl+OBvuOBmeOAguOCguOBl+OCpOODmeODs+ODiOODquOCueODiuODvOOCkuaMh+WumuOBl+OBquOBi+OBo+OBn+WgtOWQiOOBq+OBr+OAgeOBneOBruOCpOODmeODs+ODiOOBq+e0kOOBpeOBj+WFqOOBpuOBruOCpOODmeODs+ODiOODquOCueODiuODvOOBjOWJiumZpOOBleOCjOOBvuOBmeOAglsvamFdXG4gKiBAcGFyYW0ge1N0cmluZ30gZXZlbnROYW1lXG4gKiAgIFtlbl1OYW1lIG9mIHRoZSBldmVudC5bL2VuXVxuICogICBbamFd44Kk44OZ44Oz44OI5ZCN44KS5oyH5a6a44GX44G+44GZ44CCWy9qYV1cbiAqIEBwYXJhbSB7RnVuY3Rpb259IGxpc3RlbmVyXG4gKiAgIFtlbl1GdW5jdGlvbiB0byBleGVjdXRlIHdoZW4gdGhlIGV2ZW50IGlzIHRyaWdnZXJlZC5bL2VuXVxuICogICBbamFd5YmK6Zmk44GZ44KL44Kk44OZ44Oz44OI44Oq44K544OK44O844KS5oyH5a6a44GX44G+44GZ44CCWy9qYV1cbiAqL1xuXG4oZnVuY3Rpb24gKCkge1xuICAndXNlIHN0cmljdCc7XG5cbiAgYW5ndWxhci5tb2R1bGUoJ29uc2VuJylcbiAgLmRpcmVjdGl2ZSgnb25zU2VsZWN0JywgZnVuY3Rpb24gKCRwYXJzZSwgJG9uc2VuLCBHZW5lcmljVmlldykge1xuICAgIHJldHVybiB7XG4gICAgICByZXN0cmljdDogJ0UnLFxuICAgICAgcmVwbGFjZTogZmFsc2UsXG4gICAgICBzY29wZTogZmFsc2UsXG5cbiAgICAgIGxpbms6IGZ1bmN0aW9uIChzY29wZSwgZWxlbWVudCwgYXR0cnMpIHtcbiAgICAgICAgY29uc3Qgb25JbnB1dCA9ICgpID0+IHtcbiAgICAgICAgICBjb25zdCBzZXQgPSAkcGFyc2UoYXR0cnMubmdNb2RlbCkuYXNzaWduO1xuXG4gICAgICAgICAgc2V0KHNjb3BlLCBlbGVtZW50WzBdLnZhbHVlKTtcbiAgICAgICAgICBpZiAoYXR0cnMubmdDaGFuZ2UpIHtcbiAgICAgICAgICAgIHNjb3BlLiRldmFsKGF0dHJzLm5nQ2hhbmdlKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgc2NvcGUuJHBhcmVudC4kZXZhbEFzeW5jKCk7XG4gICAgICAgIH07XG5cbiAgICAgICAgaWYgKGF0dHJzLm5nTW9kZWwpIHtcbiAgICAgICAgICBzY29wZS4kd2F0Y2goYXR0cnMubmdNb2RlbCwgKHZhbHVlKSA9PiB7XG4gICAgICAgICAgICBlbGVtZW50WzBdLnZhbHVlID0gdmFsdWU7XG4gICAgICAgICAgfSk7XG5cbiAgICAgICAgICBlbGVtZW50Lm9uKCdpbnB1dCcsIG9uSW5wdXQpO1xuICAgICAgICB9XG5cbiAgICAgICAgc2NvcGUuJG9uKCckZGVzdHJveScsICgpID0+IHtcbiAgICAgICAgICBlbGVtZW50Lm9mZignaW5wdXQnLCBvbklucHV0KTtcbiAgICAgICAgICBzY29wZSA9IGVsZW1lbnQgPSBhdHRycyA9IG51bGw7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIEdlbmVyaWNWaWV3LnJlZ2lzdGVyKHNjb3BlLCBlbGVtZW50LCBhdHRycywgeyB2aWV3S2V5OiAnb25zLXNlbGVjdCcgfSk7XG4gICAgICAgICRvbnNlbi5maXJlQ29tcG9uZW50RXZlbnQoZWxlbWVudFswXSwgJ2luaXQnKTtcbiAgICAgIH1cbiAgICB9O1xuICB9KVxufSkoKTtcbiIsIi8qKlxuICogQGVsZW1lbnQgb25zLXNwZWVkLWRpYWxcbiAqL1xuXG4vKipcbiAqIEBhdHRyaWJ1dGUgdmFyXG4gKiBAaW5pdG9ubHlcbiAqIEB0eXBlIHtTdHJpbmd9XG4gKiBAZGVzY3JpcHRpb25cbiAqICAgW2VuXVZhcmlhYmxlIG5hbWUgdG8gcmVmZXIgdGhlIHNwZWVkIGRpYWwuWy9lbl1cbiAqICAgW2phXeOBk+OBruOCueODlOODvOODieODgOOCpOOCouODq+OCkuWPgueFp+OBmeOCi+OBn+OCgeOBruWkieaVsOWQjeOCkuOBl+OBpuOBl+OBvuOBmeOAglsvamFdXG4gKi9cblxuLyoqXG4gKiBAYXR0cmlidXRlIG9ucy1vcGVuXG4gKiBAaW5pdG9ubHlcbiAqIEB0eXBlIHtFeHByZXNzaW9ufVxuICogQGRlc2NyaXB0aW9uXG4gKiAgW2VuXUFsbG93cyB5b3UgdG8gc3BlY2lmeSBjdXN0b20gYmVoYXZpb3Igd2hlbiB0aGUgXCJvcGVuXCIgZXZlbnQgaXMgZmlyZWQuWy9lbl1cbiAqICBbamFdXCJvcGVuXCLjgqTjg5njg7Pjg4jjgYznmbrngavjgZXjgozjgZ/mmYLjga7mjJnli5XjgpLni6zoh6rjgavmjIflrprjgafjgY3jgb7jgZnjgIJbL2phXVxuICovXG5cbi8qKlxuICogQGF0dHJpYnV0ZSBvbnMtY2xvc2VcbiAqIEBpbml0b25seVxuICogQHR5cGUge0V4cHJlc3Npb259XG4gKiBAZGVzY3JpcHRpb25cbiAqICBbZW5dQWxsb3dzIHlvdSB0byBzcGVjaWZ5IGN1c3RvbSBiZWhhdmlvciB3aGVuIHRoZSBcImNsb3NlXCIgZXZlbnQgaXMgZmlyZWQuWy9lbl1cbiAqICBbamFdXCJjbG9zZVwi44Kk44OZ44Oz44OI44GM55m654Gr44GV44KM44Gf5pmC44Gu5oyZ5YuV44KS54us6Ieq44Gr5oyH5a6a44Gn44GN44G+44GZ44CCWy9qYV1cbiAqL1xuXG4vKipcbiAqIEBtZXRob2Qgb25jZVxuICogQHNpZ25hdHVyZSBvbmNlKGV2ZW50TmFtZSwgbGlzdGVuZXIpXG4gKiBAZGVzY3JpcHRpb25cbiAqICBbZW5dQWRkIGFuIGV2ZW50IGxpc3RlbmVyIHRoYXQncyBvbmx5IHRyaWdnZXJlZCBvbmNlLlsvZW5dXG4gKiAgW2phXeS4gOW6puOBoOOBkeWRvOOBs+WHuuOBleOCjOOCi+OCpOODmeODs+ODiOODquOCueODiuOCkui/veWKoOOBl+OBvuOBmeOAglsvamFdXG4gKiBAcGFyYW0ge1N0cmluZ30gZXZlbnROYW1lXG4gKiAgIFtlbl1OYW1lIG9mIHRoZSBldmVudC5bL2VuXVxuICogICBbamFd44Kk44OZ44Oz44OI5ZCN44KS5oyH5a6a44GX44G+44GZ44CCWy9qYV1cbiAqIEBwYXJhbSB7RnVuY3Rpb259IGxpc3RlbmVyXG4gKiAgIFtlbl1GdW5jdGlvbiB0byBleGVjdXRlIHdoZW4gdGhlIGV2ZW50IGlzIHRyaWdnZXJlZC5bL2VuXVxuICogICBbamFd44Kk44OZ44Oz44OI44GM55m654Gr44GX44Gf6Zqb44Gr5ZG844Gz5Ye644GV44KM44KL6Zai5pWw44Kq44OW44K444Kn44Kv44OI44KS5oyH5a6a44GX44G+44GZ44CCWy9qYV1cbiAqL1xuXG4vKipcbiAqIEBtZXRob2Qgb2ZmXG4gKiBAc2lnbmF0dXJlIG9mZihldmVudE5hbWUsIFtsaXN0ZW5lcl0pXG4gKiBAZGVzY3JpcHRpb25cbiAqICBbZW5dUmVtb3ZlIGFuIGV2ZW50IGxpc3RlbmVyLiBJZiB0aGUgbGlzdGVuZXIgaXMgbm90IHNwZWNpZmllZCBhbGwgbGlzdGVuZXJzIGZvciB0aGUgZXZlbnQgdHlwZSB3aWxsIGJlIHJlbW92ZWQuWy9lbl1cbiAqICBbamFd44Kk44OZ44Oz44OI44Oq44K544OK44O844KS5YmK6Zmk44GX44G+44GZ44CC44KC44GX44Kk44OZ44Oz44OI44Oq44K544OK44O844GM5oyH5a6a44GV44KM44Gq44GL44Gj44Gf5aC05ZCI44Gr44Gv44CB44Gd44Gu44Kk44OZ44Oz44OI44Gr57SQ5LuY44GE44Gm44GE44KL44Kk44OZ44Oz44OI44Oq44K544OK44O844GM5YWo44Gm5YmK6Zmk44GV44KM44G+44GZ44CCWy9qYV1cbiAqIEBwYXJhbSB7U3RyaW5nfSBldmVudE5hbWVcbiAqICAgW2VuXU5hbWUgb2YgdGhlIGV2ZW50LlsvZW5dXG4gKiAgIFtqYV3jgqTjg5njg7Pjg4jlkI3jgpLmjIflrprjgZfjgb7jgZnjgIJbL2phXVxuICogQHBhcmFtIHtGdW5jdGlvbn0gbGlzdGVuZXJcbiAqICAgW2VuXUZ1bmN0aW9uIHRvIGV4ZWN1dGUgd2hlbiB0aGUgZXZlbnQgaXMgdHJpZ2dlcmVkLlsvZW5dXG4gKiAgIFtqYV3jgqTjg5njg7Pjg4jjgYznmbrngavjgZfjgZ/pmpvjgavlkbzjgbPlh7rjgZXjgozjgovplqLmlbDjgqrjg5bjgrjjgqfjgq/jg4jjgpLmjIflrprjgZfjgb7jgZnjgIJbL2phXVxuICovXG5cbi8qKlxuICogQG1ldGhvZCBvblxuICogQHNpZ25hdHVyZSBvbihldmVudE5hbWUsIGxpc3RlbmVyKVxuICogQGRlc2NyaXB0aW9uXG4gKiAgIFtlbl1BZGQgYW4gZXZlbnQgbGlzdGVuZXIuWy9lbl1cbiAqICAgW2phXeOCpOODmeODs+ODiOODquOCueODiuODvOOCkui/veWKoOOBl+OBvuOBmeOAglsvamFdXG4gKiBAcGFyYW0ge1N0cmluZ30gZXZlbnROYW1lXG4gKiAgIFtlbl1OYW1lIG9mIHRoZSBldmVudC5bL2VuXVxuICogICBbamFd44Kk44OZ44Oz44OI5ZCN44KS5oyH5a6a44GX44G+44GZ44CCWy9qYV1cbiAqIEBwYXJhbSB7RnVuY3Rpb259IGxpc3RlbmVyXG4gKiAgIFtlbl1GdW5jdGlvbiB0byBleGVjdXRlIHdoZW4gdGhlIGV2ZW50IGlzIHRyaWdnZXJlZC5bL2VuXVxuICogICBbamFd44Kk44OZ44Oz44OI44GM55m654Gr44GX44Gf6Zqb44Gr5ZG844Gz5Ye644GV44KM44KL6Zai5pWw44Kq44OW44K444Kn44Kv44OI44KS5oyH5a6a44GX44G+44GZ44CCWy9qYV1cbiAqL1xuXG4oZnVuY3Rpb24oKSB7XG4gICd1c2Ugc3RyaWN0JztcblxuICB2YXIgbW9kdWxlID0gYW5ndWxhci5tb2R1bGUoJ29uc2VuJyk7XG5cbiAgbW9kdWxlLmRpcmVjdGl2ZSgnb25zU3BlZWREaWFsJywgZnVuY3Rpb24oJG9uc2VuLCBTcGVlZERpYWxWaWV3KSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHJlc3RyaWN0OiAnRScsXG4gICAgICByZXBsYWNlOiBmYWxzZSxcbiAgICAgIHNjb3BlOiBmYWxzZSxcbiAgICAgIHRyYW5zY2x1ZGU6IGZhbHNlLFxuXG4gICAgICBjb21waWxlOiBmdW5jdGlvbihlbGVtZW50LCBhdHRycykge1xuXG4gICAgICAgIHJldHVybiBmdW5jdGlvbihzY29wZSwgZWxlbWVudCwgYXR0cnMpIHtcbiAgICAgICAgICB2YXIgc3BlZWREaWFsID0gbmV3IFNwZWVkRGlhbFZpZXcoc2NvcGUsIGVsZW1lbnQsIGF0dHJzKTtcblxuICAgICAgICAgIGVsZW1lbnQuZGF0YSgnb25zLXNwZWVkLWRpYWwnLCBzcGVlZERpYWwpO1xuXG4gICAgICAgICAgJG9uc2VuLnJlZ2lzdGVyRXZlbnRIYW5kbGVycyhzcGVlZERpYWwsICdvcGVuIGNsb3NlJyk7XG4gICAgICAgICAgJG9uc2VuLmRlY2xhcmVWYXJBdHRyaWJ1dGUoYXR0cnMsIHNwZWVkRGlhbCk7XG5cbiAgICAgICAgICBzY29wZS4kb24oJyRkZXN0cm95JywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBzcGVlZERpYWwuX2V2ZW50cyA9IHVuZGVmaW5lZDtcbiAgICAgICAgICAgIGVsZW1lbnQuZGF0YSgnb25zLXNwZWVkLWRpYWwnLCB1bmRlZmluZWQpO1xuICAgICAgICAgICAgZWxlbWVudCA9IG51bGw7XG4gICAgICAgICAgfSk7XG5cbiAgICAgICAgICAkb25zZW4uZmlyZUNvbXBvbmVudEV2ZW50KGVsZW1lbnRbMF0sICdpbml0Jyk7XG4gICAgICAgIH07XG4gICAgICB9LFxuXG4gICAgfTtcbiAgfSk7XG5cbn0pKCk7XG5cbiIsIi8qKlxuICogQGVsZW1lbnQgb25zLXNwbGl0dGVyLWNvbnRlbnRcbiAqL1xuXG4vKipcbiAqIEBhdHRyaWJ1dGUgb25zLWRlc3Ryb3lcbiAqIEBpbml0b25seVxuICogQHR5cGUge0V4cHJlc3Npb259XG4gKiBAZGVzY3JpcHRpb25cbiAqICBbZW5dQWxsb3dzIHlvdSB0byBzcGVjaWZ5IGN1c3RvbSBiZWhhdmlvciB3aGVuIHRoZSBcImRlc3Ryb3lcIiBldmVudCBpcyBmaXJlZC5bL2VuXVxuICogIFtqYV1cImRlc3Ryb3lcIuOCpOODmeODs+ODiOOBjOeZuueBq+OBleOCjOOBn+aZguOBruaMmeWLleOCkueLrOiHquOBq+aMh+WumuOBp+OBjeOBvuOBmeOAglsvamFdXG4gKi9cbihmdW5jdGlvbigpIHtcbiAgJ3VzZSBzdHJpY3QnO1xuXG4gIHZhciBsYXN0UmVhZHkgPSB3aW5kb3cub25zLmVsZW1lbnRzLlNwbGl0dGVyQ29udGVudC5yZXdyaXRhYmxlcy5yZWFkeTtcbiAgd2luZG93Lm9ucy5lbGVtZW50cy5TcGxpdHRlckNvbnRlbnQucmV3cml0YWJsZXMucmVhZHkgPSBvbnMuX3dhaXREaXJldGl2ZUluaXQoJ29ucy1zcGxpdHRlci1jb250ZW50JywgbGFzdFJlYWR5KTtcblxuICBhbmd1bGFyLm1vZHVsZSgnb25zZW4nKS5kaXJlY3RpdmUoJ29uc1NwbGl0dGVyQ29udGVudCcsIGZ1bmN0aW9uKCRjb21waWxlLCBTcGxpdHRlckNvbnRlbnQsICRvbnNlbikge1xuICAgIHJldHVybiB7XG4gICAgICByZXN0cmljdDogJ0UnLFxuXG4gICAgICBjb21waWxlOiBmdW5jdGlvbihlbGVtZW50LCBhdHRycykge1xuXG4gICAgICAgIHJldHVybiBmdW5jdGlvbihzY29wZSwgZWxlbWVudCwgYXR0cnMpIHtcblxuICAgICAgICAgIHZhciB2aWV3ID0gbmV3IFNwbGl0dGVyQ29udGVudChzY29wZSwgZWxlbWVudCwgYXR0cnMpO1xuXG4gICAgICAgICAgJG9uc2VuLmRlY2xhcmVWYXJBdHRyaWJ1dGUoYXR0cnMsIHZpZXcpO1xuICAgICAgICAgICRvbnNlbi5yZWdpc3RlckV2ZW50SGFuZGxlcnModmlldywgJ2Rlc3Ryb3knKTtcblxuICAgICAgICAgIGVsZW1lbnQuZGF0YSgnb25zLXNwbGl0dGVyLWNvbnRlbnQnLCB2aWV3KTtcblxuICAgICAgICAgIGVsZW1lbnRbMF0ucGFnZUxvYWRlciA9ICRvbnNlbi5jcmVhdGVQYWdlTG9hZGVyKHZpZXcpO1xuXG4gICAgICAgICAgc2NvcGUuJG9uKCckZGVzdHJveScsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgdmlldy5fZXZlbnRzID0gdW5kZWZpbmVkO1xuICAgICAgICAgICAgZWxlbWVudC5kYXRhKCdvbnMtc3BsaXR0ZXItY29udGVudCcsIHVuZGVmaW5lZCk7XG4gICAgICAgICAgfSk7XG5cbiAgICAgICAgICAkb25zZW4uZmlyZUNvbXBvbmVudEV2ZW50KGVsZW1lbnRbMF0sICdpbml0Jyk7XG4gICAgICAgIH07XG4gICAgICB9XG4gICAgfTtcbiAgfSk7XG59KSgpO1xuIiwiLyoqXG4gKiBAZWxlbWVudCBvbnMtc3BsaXR0ZXItc2lkZVxuICovXG5cbi8qKlxuICogQGF0dHJpYnV0ZSBvbnMtZGVzdHJveVxuICogQGluaXRvbmx5XG4gKiBAdHlwZSB7RXhwcmVzc2lvbn1cbiAqIEBkZXNjcmlwdGlvblxuICogIFtlbl1BbGxvd3MgeW91IHRvIHNwZWNpZnkgY3VzdG9tIGJlaGF2aW9yIHdoZW4gdGhlIFwiZGVzdHJveVwiIGV2ZW50IGlzIGZpcmVkLlsvZW5dXG4gKiAgW2phXVwiZGVzdHJveVwi44Kk44OZ44Oz44OI44GM55m654Gr44GV44KM44Gf5pmC44Gu5oyZ5YuV44KS54us6Ieq44Gr5oyH5a6a44Gn44GN44G+44GZ44CCWy9qYV1cbiAqL1xuXG4vKipcbiAqIEBhdHRyaWJ1dGUgb25zLXByZW9wZW5cbiAqIEBpbml0b25seVxuICogQHR5cGUge0V4cHJlc3Npb259XG4gKiBAZGVzY3JpcHRpb25cbiAqICBbZW5dQWxsb3dzIHlvdSB0byBzcGVjaWZ5IGN1c3RvbSBiZWhhdmlvciB3aGVuIHRoZSBcInByZW9wZW5cIiBldmVudCBpcyBmaXJlZC5bL2VuXVxuICogIFtqYV1cInByZW9wZW5cIuOCpOODmeODs+ODiOOBjOeZuueBq+OBleOCjOOBn+aZguOBruaMmeWLleOCkueLrOiHquOBq+aMh+WumuOBp+OBjeOBvuOBmeOAglsvamFdXG4gKi9cblxuLyoqXG4gKiBAYXR0cmlidXRlIG9ucy1wcmVjbG9zZVxuICogQGluaXRvbmx5XG4gKiBAdHlwZSB7RXhwcmVzc2lvbn1cbiAqIEBkZXNjcmlwdGlvblxuICogIFtlbl1BbGxvd3MgeW91IHRvIHNwZWNpZnkgY3VzdG9tIGJlaGF2aW9yIHdoZW4gdGhlIFwicHJlY2xvc2VcIiBldmVudCBpcyBmaXJlZC5bL2VuXVxuICogIFtqYV1cInByZWNsb3NlXCLjgqTjg5njg7Pjg4jjgYznmbrngavjgZXjgozjgZ/mmYLjga7mjJnli5XjgpLni6zoh6rjgavmjIflrprjgafjgY3jgb7jgZnjgIJbL2phXVxuICovXG5cbi8qKlxuICogQGF0dHJpYnV0ZSBvbnMtcG9zdG9wZW5cbiAqIEBpbml0b25seVxuICogQHR5cGUge0V4cHJlc3Npb259XG4gKiBAZGVzY3JpcHRpb25cbiAqICBbZW5dQWxsb3dzIHlvdSB0byBzcGVjaWZ5IGN1c3RvbSBiZWhhdmlvciB3aGVuIHRoZSBcInBvc3RvcGVuXCIgZXZlbnQgaXMgZmlyZWQuWy9lbl1cbiAqICBbamFdXCJwb3N0b3Blblwi44Kk44OZ44Oz44OI44GM55m654Gr44GV44KM44Gf5pmC44Gu5oyZ5YuV44KS54us6Ieq44Gr5oyH5a6a44Gn44GN44G+44GZ44CCWy9qYV1cbiAqL1xuXG4vKipcbiAqIEBhdHRyaWJ1dGUgb25zLXBvc3RjbG9zZVxuICogQGluaXRvbmx5XG4gKiBAdHlwZSB7RXhwcmVzc2lvbn1cbiAqIEBkZXNjcmlwdGlvblxuICogIFtlbl1BbGxvd3MgeW91IHRvIHNwZWNpZnkgY3VzdG9tIGJlaGF2aW9yIHdoZW4gdGhlIFwicG9zdGNsb3NlXCIgZXZlbnQgaXMgZmlyZWQuWy9lbl1cbiAqICBbamFdXCJwb3N0Y2xvc2VcIuOCpOODmeODs+ODiOOBjOeZuueBq+OBleOCjOOBn+aZguOBruaMmeWLleOCkueLrOiHquOBq+aMh+WumuOBp+OBjeOBvuOBmeOAglsvamFdXG4gKi9cblxuLyoqXG4gKiBAYXR0cmlidXRlIG9ucy1tb2RlY2hhbmdlXG4gKiBAaW5pdG9ubHlcbiAqIEB0eXBlIHtFeHByZXNzaW9ufVxuICogQGRlc2NyaXB0aW9uXG4gKiAgW2VuXUFsbG93cyB5b3UgdG8gc3BlY2lmeSBjdXN0b20gYmVoYXZpb3Igd2hlbiB0aGUgXCJtb2RlY2hhbmdlXCIgZXZlbnQgaXMgZmlyZWQuWy9lbl1cbiAqICBbamFdXCJtb2RlY2hhbmdlXCLjgqTjg5njg7Pjg4jjgYznmbrngavjgZXjgozjgZ/mmYLjga7mjJnli5XjgpLni6zoh6rjgavmjIflrprjgafjgY3jgb7jgZnjgIJbL2phXVxuICovXG4oZnVuY3Rpb24oKSB7XG4gICd1c2Ugc3RyaWN0JztcblxuICB2YXIgbGFzdFJlYWR5ID0gd2luZG93Lm9ucy5lbGVtZW50cy5TcGxpdHRlclNpZGUucmV3cml0YWJsZXMucmVhZHk7XG4gIHdpbmRvdy5vbnMuZWxlbWVudHMuU3BsaXR0ZXJTaWRlLnJld3JpdGFibGVzLnJlYWR5ID0gb25zLl93YWl0RGlyZXRpdmVJbml0KCdvbnMtc3BsaXR0ZXItc2lkZScsIGxhc3RSZWFkeSk7XG5cbiAgYW5ndWxhci5tb2R1bGUoJ29uc2VuJykuZGlyZWN0aXZlKCdvbnNTcGxpdHRlclNpZGUnLCBmdW5jdGlvbigkY29tcGlsZSwgU3BsaXR0ZXJTaWRlLCAkb25zZW4pIHtcbiAgICByZXR1cm4ge1xuICAgICAgcmVzdHJpY3Q6ICdFJyxcblxuICAgICAgY29tcGlsZTogZnVuY3Rpb24oZWxlbWVudCwgYXR0cnMpIHtcblxuICAgICAgICByZXR1cm4gZnVuY3Rpb24oc2NvcGUsIGVsZW1lbnQsIGF0dHJzKSB7XG5cbiAgICAgICAgICB2YXIgdmlldyA9IG5ldyBTcGxpdHRlclNpZGUoc2NvcGUsIGVsZW1lbnQsIGF0dHJzKTtcblxuICAgICAgICAgICRvbnNlbi5kZWNsYXJlVmFyQXR0cmlidXRlKGF0dHJzLCB2aWV3KTtcbiAgICAgICAgICAkb25zZW4ucmVnaXN0ZXJFdmVudEhhbmRsZXJzKHZpZXcsICdkZXN0cm95IHByZW9wZW4gcHJlY2xvc2UgcG9zdG9wZW4gcG9zdGNsb3NlIG1vZGVjaGFuZ2UnKTtcblxuICAgICAgICAgIGVsZW1lbnQuZGF0YSgnb25zLXNwbGl0dGVyLXNpZGUnLCB2aWV3KTtcblxuICAgICAgICAgIGVsZW1lbnRbMF0ucGFnZUxvYWRlciA9ICRvbnNlbi5jcmVhdGVQYWdlTG9hZGVyKHZpZXcpO1xuXG4gICAgICAgICAgc2NvcGUuJG9uKCckZGVzdHJveScsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgdmlldy5fZXZlbnRzID0gdW5kZWZpbmVkO1xuICAgICAgICAgICAgZWxlbWVudC5kYXRhKCdvbnMtc3BsaXR0ZXItc2lkZScsIHVuZGVmaW5lZCk7XG4gICAgICAgICAgfSk7XG5cbiAgICAgICAgICAkb25zZW4uZmlyZUNvbXBvbmVudEV2ZW50KGVsZW1lbnRbMF0sICdpbml0Jyk7XG4gICAgICAgIH07XG4gICAgICB9XG4gICAgfTtcbiAgfSk7XG59KSgpO1xuIiwiLyoqXG4gKiBAZWxlbWVudCBvbnMtc3BsaXR0ZXJcbiAqL1xuXG4vKipcbiAqIEBhdHRyaWJ1dGUgdmFyXG4gKiBAaW5pdG9ubHlcbiAqIEB0eXBlIHtTdHJpbmd9XG4gKiBAZGVzY3JpcHRpb25cbiAqICAgW2VuXVZhcmlhYmxlIG5hbWUgdG8gcmVmZXIgdGhpcyBzcGxpdCB2aWV3LlsvZW5dXG4gKiAgIFtqYV3jgZPjga7jgrnjg5fjg6rjg4Pjg4jjg5Pjg6Xjg7zjgrPjg7Pjg53jg7zjg43jg7Pjg4jjgpLlj4LnhafjgZnjgovjgZ/jgoHjga7lkI3liY3jgpLmjIflrprjgZfjgb7jgZnjgIJbL2phXVxuICovXG5cbi8qKlxuICogQGF0dHJpYnV0ZSBvbnMtZGVzdHJveVxuICogQGluaXRvbmx5XG4gKiBAdHlwZSB7RXhwcmVzc2lvbn1cbiAqIEBkZXNjcmlwdGlvblxuICogIFtlbl1BbGxvd3MgeW91IHRvIHNwZWNpZnkgY3VzdG9tIGJlaGF2aW9yIHdoZW4gdGhlIFwiZGVzdHJveVwiIGV2ZW50IGlzIGZpcmVkLlsvZW5dXG4gKiAgW2phXVwiZGVzdHJveVwi44Kk44OZ44Oz44OI44GM55m654Gr44GV44KM44Gf5pmC44Gu5oyZ5YuV44KS54us6Ieq44Gr5oyH5a6a44Gn44GN44G+44GZ44CCWy9qYV1cbiAqL1xuXG4vKipcbiAqIEBtZXRob2Qgb25cbiAqIEBzaWduYXR1cmUgb24oZXZlbnROYW1lLCBsaXN0ZW5lcilcbiAqIEBkZXNjcmlwdGlvblxuICogICBbZW5dQWRkIGFuIGV2ZW50IGxpc3RlbmVyLlsvZW5dXG4gKiAgIFtqYV3jgqTjg5njg7Pjg4jjg6rjgrnjg4rjg7zjgpLov73liqDjgZfjgb7jgZnjgIJbL2phXVxuICogQHBhcmFtIHtTdHJpbmd9IGV2ZW50TmFtZVxuICogICBbZW5dTmFtZSBvZiB0aGUgZXZlbnQuWy9lbl1cbiAqICAgW2phXeOCpOODmeODs+ODiOWQjeOCkuaMh+WumuOBl+OBvuOBmeOAglsvamFdXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBsaXN0ZW5lclxuICogICBbZW5dRnVuY3Rpb24gdG8gZXhlY3V0ZSB3aGVuIHRoZSBldmVudCBpcyB0cmlnZ2VyZWQuWy9lbl1cbiAqICAgW2phXeOBk+OBruOCpOODmeODs+ODiOOBjOeZuueBq+OBleOCjOOBn+mam+OBq+WRvOOBs+WHuuOBleOCjOOCi+mWouaVsOOCquODluOCuOOCp+OCr+ODiOOCkuaMh+WumuOBl+OBvuOBmeOAglsvamFdXG4gKi9cblxuLyoqXG4gKiBAbWV0aG9kIG9uY2VcbiAqIEBzaWduYXR1cmUgb25jZShldmVudE5hbWUsIGxpc3RlbmVyKVxuICogQGRlc2NyaXB0aW9uXG4gKiAgW2VuXUFkZCBhbiBldmVudCBsaXN0ZW5lciB0aGF0J3Mgb25seSB0cmlnZ2VyZWQgb25jZS5bL2VuXVxuICogIFtqYV3kuIDluqbjgaDjgZHlkbzjgbPlh7rjgZXjgozjgovjgqTjg5njg7Pjg4jjg6rjgrnjg4rjg7zjgpLov73liqDjgZfjgb7jgZnjgIJbL2phXVxuICogQHBhcmFtIHtTdHJpbmd9IGV2ZW50TmFtZVxuICogICBbZW5dTmFtZSBvZiB0aGUgZXZlbnQuWy9lbl1cbiAqICAgW2phXeOCpOODmeODs+ODiOWQjeOCkuaMh+WumuOBl+OBvuOBmeOAglsvamFdXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBsaXN0ZW5lclxuICogICBbZW5dRnVuY3Rpb24gdG8gZXhlY3V0ZSB3aGVuIHRoZSBldmVudCBpcyB0cmlnZ2VyZWQuWy9lbl1cbiAqICAgW2phXeOCpOODmeODs+ODiOOBjOeZuueBq+OBl+OBn+mam+OBq+WRvOOBs+WHuuOBleOCjOOCi+mWouaVsOOCquODluOCuOOCp+OCr+ODiOOCkuaMh+WumuOBl+OBvuOBmeOAglsvamFdXG4gKi9cblxuLyoqXG4gKiBAbWV0aG9kIG9mZlxuICogQHNpZ25hdHVyZSBvZmYoZXZlbnROYW1lLCBbbGlzdGVuZXJdKVxuICogQGRlc2NyaXB0aW9uXG4gKiAgW2VuXVJlbW92ZSBhbiBldmVudCBsaXN0ZW5lci4gSWYgdGhlIGxpc3RlbmVyIGlzIG5vdCBzcGVjaWZpZWQgYWxsIGxpc3RlbmVycyBmb3IgdGhlIGV2ZW50IHR5cGUgd2lsbCBiZSByZW1vdmVkLlsvZW5dXG4gKiAgW2phXeOCpOODmeODs+ODiOODquOCueODiuODvOOCkuWJiumZpOOBl+OBvuOBmeOAguOCguOBl+OCpOODmeODs+ODiOODquOCueODiuODvOOCkuaMh+WumuOBl+OBquOBi+OBo+OBn+WgtOWQiOOBq+OBr+OAgeOBneOBruOCpOODmeODs+ODiOOBq+e0kOOBpeOBj+WFqOOBpuOBruOCpOODmeODs+ODiOODquOCueODiuODvOOBjOWJiumZpOOBleOCjOOBvuOBmeOAglsvamFdXG4gKiBAcGFyYW0ge1N0cmluZ30gZXZlbnROYW1lXG4gKiAgIFtlbl1OYW1lIG9mIHRoZSBldmVudC5bL2VuXVxuICogICBbamFd44Kk44OZ44Oz44OI5ZCN44KS5oyH5a6a44GX44G+44GZ44CCWy9qYV1cbiAqIEBwYXJhbSB7RnVuY3Rpb259IGxpc3RlbmVyXG4gKiAgIFtlbl1GdW5jdGlvbiB0byBleGVjdXRlIHdoZW4gdGhlIGV2ZW50IGlzIHRyaWdnZXJlZC5bL2VuXVxuICogICBbamFd5YmK6Zmk44GZ44KL44Kk44OZ44Oz44OI44Oq44K544OK44O844KS5oyH5a6a44GX44G+44GZ44CCWy9qYV1cbiAqL1xuXG4oZnVuY3Rpb24oKSB7XG4gICd1c2Ugc3RyaWN0JztcblxuICBhbmd1bGFyLm1vZHVsZSgnb25zZW4nKS5kaXJlY3RpdmUoJ29uc1NwbGl0dGVyJywgZnVuY3Rpb24oJGNvbXBpbGUsIFNwbGl0dGVyLCAkb25zZW4pIHtcbiAgICByZXR1cm4ge1xuICAgICAgcmVzdHJpY3Q6ICdFJyxcbiAgICAgIHNjb3BlOiB0cnVlLFxuXG4gICAgICBjb21waWxlOiBmdW5jdGlvbihlbGVtZW50LCBhdHRycykge1xuXG4gICAgICAgIHJldHVybiBmdW5jdGlvbihzY29wZSwgZWxlbWVudCwgYXR0cnMpIHtcblxuICAgICAgICAgIHZhciBzcGxpdHRlciA9IG5ldyBTcGxpdHRlcihzY29wZSwgZWxlbWVudCwgYXR0cnMpO1xuXG4gICAgICAgICAgJG9uc2VuLmRlY2xhcmVWYXJBdHRyaWJ1dGUoYXR0cnMsIHNwbGl0dGVyKTtcbiAgICAgICAgICAkb25zZW4ucmVnaXN0ZXJFdmVudEhhbmRsZXJzKHNwbGl0dGVyLCAnZGVzdHJveScpO1xuXG4gICAgICAgICAgZWxlbWVudC5kYXRhKCdvbnMtc3BsaXR0ZXInLCBzcGxpdHRlcik7XG5cbiAgICAgICAgICBzY29wZS4kb24oJyRkZXN0cm95JywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBzcGxpdHRlci5fZXZlbnRzID0gdW5kZWZpbmVkO1xuICAgICAgICAgICAgZWxlbWVudC5kYXRhKCdvbnMtc3BsaXR0ZXInLCB1bmRlZmluZWQpO1xuICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgJG9uc2VuLmZpcmVDb21wb25lbnRFdmVudChlbGVtZW50WzBdLCAnaW5pdCcpO1xuICAgICAgICB9O1xuICAgICAgfVxuICAgIH07XG4gIH0pO1xufSkoKTtcbiIsIi8qKlxuICogQGVsZW1lbnQgb25zLXN3aXRjaFxuICovXG5cbi8qKlxuICogQGF0dHJpYnV0ZSB2YXJcbiAqIEBpbml0b25seVxuICogQHR5cGUge1N0cmluZ31cbiAqIEBkZXNjcmlwdGlvblxuICogICBbZW5dVmFyaWFibGUgbmFtZSB0byByZWZlciB0aGlzIHN3aXRjaC5bL2VuXVxuICogICBbamFdSmF2YVNjcmlwdOOBi+OCieWPgueFp+OBmeOCi+OBn+OCgeOBruWkieaVsOWQjeOCkuaMh+WumuOBl+OBvuOBmeOAglsvamFdXG4gKi9cblxuLyoqXG4gKiBAbWV0aG9kIG9uXG4gKiBAc2lnbmF0dXJlIG9uKGV2ZW50TmFtZSwgbGlzdGVuZXIpXG4gKiBAZGVzY3JpcHRpb25cbiAqICAgW2VuXUFkZCBhbiBldmVudCBsaXN0ZW5lci5bL2VuXVxuICogICBbamFd44Kk44OZ44Oz44OI44Oq44K544OK44O844KS6L+95Yqg44GX44G+44GZ44CCWy9qYV1cbiAqIEBwYXJhbSB7U3RyaW5nfSBldmVudE5hbWVcbiAqICAgW2VuXU5hbWUgb2YgdGhlIGV2ZW50LlsvZW5dXG4gKiAgIFtqYV3jgqTjg5njg7Pjg4jlkI3jgpLmjIflrprjgZfjgb7jgZnjgIJbL2phXVxuICogQHBhcmFtIHtGdW5jdGlvbn0gbGlzdGVuZXJcbiAqICAgW2VuXUZ1bmN0aW9uIHRvIGV4ZWN1dGUgd2hlbiB0aGUgZXZlbnQgaXMgdHJpZ2dlcmVkLlsvZW5dXG4gKiAgIFtqYV3jgZPjga7jgqTjg5njg7Pjg4jjgYznmbrngavjgZXjgozjgZ/pmpvjgavlkbzjgbPlh7rjgZXjgozjgovplqLmlbDjgqrjg5bjgrjjgqfjgq/jg4jjgpLmjIflrprjgZfjgb7jgZnjgIJbL2phXVxuICovXG5cbi8qKlxuICogQG1ldGhvZCBvbmNlXG4gKiBAc2lnbmF0dXJlIG9uY2UoZXZlbnROYW1lLCBsaXN0ZW5lcilcbiAqIEBkZXNjcmlwdGlvblxuICogIFtlbl1BZGQgYW4gZXZlbnQgbGlzdGVuZXIgdGhhdCdzIG9ubHkgdHJpZ2dlcmVkIG9uY2UuWy9lbl1cbiAqICBbamFd5LiA5bqm44Gg44GR5ZG844Gz5Ye644GV44KM44KL44Kk44OZ44Oz44OI44Oq44K544OK44O844KS6L+95Yqg44GX44G+44GZ44CCWy9qYV1cbiAqIEBwYXJhbSB7U3RyaW5nfSBldmVudE5hbWVcbiAqICAgW2VuXU5hbWUgb2YgdGhlIGV2ZW50LlsvZW5dXG4gKiAgIFtqYV3jgqTjg5njg7Pjg4jlkI3jgpLmjIflrprjgZfjgb7jgZnjgIJbL2phXVxuICogQHBhcmFtIHtGdW5jdGlvbn0gbGlzdGVuZXJcbiAqICAgW2VuXUZ1bmN0aW9uIHRvIGV4ZWN1dGUgd2hlbiB0aGUgZXZlbnQgaXMgdHJpZ2dlcmVkLlsvZW5dXG4gKiAgIFtqYV3jgqTjg5njg7Pjg4jjgYznmbrngavjgZfjgZ/pmpvjgavlkbzjgbPlh7rjgZXjgozjgovplqLmlbDjgqrjg5bjgrjjgqfjgq/jg4jjgpLmjIflrprjgZfjgb7jgZnjgIJbL2phXVxuICovXG5cbi8qKlxuICogQG1ldGhvZCBvZmZcbiAqIEBzaWduYXR1cmUgb2ZmKGV2ZW50TmFtZSwgW2xpc3RlbmVyXSlcbiAqIEBkZXNjcmlwdGlvblxuICogIFtlbl1SZW1vdmUgYW4gZXZlbnQgbGlzdGVuZXIuIElmIHRoZSBsaXN0ZW5lciBpcyBub3Qgc3BlY2lmaWVkIGFsbCBsaXN0ZW5lcnMgZm9yIHRoZSBldmVudCB0eXBlIHdpbGwgYmUgcmVtb3ZlZC5bL2VuXVxuICogIFtqYV3jgqTjg5njg7Pjg4jjg6rjgrnjg4rjg7zjgpLliYrpmaTjgZfjgb7jgZnjgILjgoLjgZfjgqTjg5njg7Pjg4jjg6rjgrnjg4rjg7zjgpLmjIflrprjgZfjgarjgYvjgaPjgZ/loLTlkIjjgavjga/jgIHjgZ3jga7jgqTjg5njg7Pjg4jjgavntJDjgaXjgY/lhajjgabjga7jgqTjg5njg7Pjg4jjg6rjgrnjg4rjg7zjgYzliYrpmaTjgZXjgozjgb7jgZnjgIJbL2phXVxuICogQHBhcmFtIHtTdHJpbmd9IGV2ZW50TmFtZVxuICogICBbZW5dTmFtZSBvZiB0aGUgZXZlbnQuWy9lbl1cbiAqICAgW2phXeOCpOODmeODs+ODiOWQjeOCkuaMh+WumuOBl+OBvuOBmeOAglsvamFdXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBsaXN0ZW5lclxuICogICBbZW5dRnVuY3Rpb24gdG8gZXhlY3V0ZSB3aGVuIHRoZSBldmVudCBpcyB0cmlnZ2VyZWQuWy9lbl1cbiAqICAgW2phXeWJiumZpOOBmeOCi+OCpOODmeODs+ODiOODquOCueODiuODvOOCkuaMh+WumuOBl+OBvuOBmeOAglsvamFdXG4gKi9cblxuKGZ1bmN0aW9uKCl7XG4gICd1c2Ugc3RyaWN0JztcblxuICBhbmd1bGFyLm1vZHVsZSgnb25zZW4nKS5kaXJlY3RpdmUoJ29uc1N3aXRjaCcsIGZ1bmN0aW9uKCRvbnNlbiwgU3dpdGNoVmlldykge1xuICAgIHJldHVybiB7XG4gICAgICByZXN0cmljdDogJ0UnLFxuICAgICAgcmVwbGFjZTogZmFsc2UsXG4gICAgICBzY29wZTogdHJ1ZSxcblxuICAgICAgbGluazogZnVuY3Rpb24oc2NvcGUsIGVsZW1lbnQsIGF0dHJzKSB7XG5cbiAgICAgICAgaWYgKGF0dHJzLm5nQ29udHJvbGxlcikge1xuICAgICAgICAgIHRocm93IG5ldyBFcnJvcignVGhpcyBlbGVtZW50IGNhblxcJ3QgYWNjZXB0IG5nLWNvbnRyb2xsZXIgZGlyZWN0aXZlLicpO1xuICAgICAgICB9XG5cbiAgICAgICAgdmFyIHN3aXRjaFZpZXcgPSBuZXcgU3dpdGNoVmlldyhlbGVtZW50LCBzY29wZSwgYXR0cnMpO1xuICAgICAgICAkb25zZW4uYWRkTW9kaWZpZXJNZXRob2RzRm9yQ3VzdG9tRWxlbWVudHMoc3dpdGNoVmlldywgZWxlbWVudCk7XG5cbiAgICAgICAgJG9uc2VuLmRlY2xhcmVWYXJBdHRyaWJ1dGUoYXR0cnMsIHN3aXRjaFZpZXcpO1xuICAgICAgICBlbGVtZW50LmRhdGEoJ29ucy1zd2l0Y2gnLCBzd2l0Y2hWaWV3KTtcblxuICAgICAgICAkb25zZW4uY2xlYW5lci5vbkRlc3Ryb3koc2NvcGUsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgIHN3aXRjaFZpZXcuX2V2ZW50cyA9IHVuZGVmaW5lZDtcbiAgICAgICAgICAkb25zZW4ucmVtb3ZlTW9kaWZpZXJNZXRob2RzKHN3aXRjaFZpZXcpO1xuICAgICAgICAgIGVsZW1lbnQuZGF0YSgnb25zLXN3aXRjaCcsIHVuZGVmaW5lZCk7XG4gICAgICAgICAgJG9uc2VuLmNsZWFyQ29tcG9uZW50KHtcbiAgICAgICAgICAgIGVsZW1lbnQ6IGVsZW1lbnQsXG4gICAgICAgICAgICBzY29wZTogc2NvcGUsXG4gICAgICAgICAgICBhdHRyczogYXR0cnNcbiAgICAgICAgICB9KTtcbiAgICAgICAgICBlbGVtZW50ID0gYXR0cnMgPSBzY29wZSA9IG51bGw7XG4gICAgICAgIH0pO1xuXG4gICAgICAgICRvbnNlbi5maXJlQ29tcG9uZW50RXZlbnQoZWxlbWVudFswXSwgJ2luaXQnKTtcbiAgICAgIH1cbiAgICB9O1xuICB9KTtcbn0pKCk7XG4iLCIvKipcbiAqIEBlbGVtZW50IG9ucy10YWJiYXJcbiAqL1xuXG4vKipcbiAqIEBhdHRyaWJ1dGUgdmFyXG4gKiBAaW5pdG9ubHlcbiAqIEB0eXBlIHtTdHJpbmd9XG4gKiBAZGVzY3JpcHRpb25cbiAqICAgW2VuXVZhcmlhYmxlIG5hbWUgdG8gcmVmZXIgdGhpcyB0YWIgYmFyLlsvZW5dXG4gKiAgIFtqYV3jgZPjga7jgr/jg5bjg5Djg7zjgpLlj4LnhafjgZnjgovjgZ/jgoHjga7lkI3liY3jgpLmjIflrprjgZfjgb7jgZnjgIJbL2phXVxuICovXG5cbi8qKlxuICogQGF0dHJpYnV0ZSBvbnMtcmVhY3RpdmVcbiAqIEBpbml0b25seVxuICogQHR5cGUge0V4cHJlc3Npb259XG4gKiBAZGVzY3JpcHRpb25cbiAqICBbZW5dQWxsb3dzIHlvdSB0byBzcGVjaWZ5IGN1c3RvbSBiZWhhdmlvciB3aGVuIHRoZSBcInJlYWN0aXZlXCIgZXZlbnQgaXMgZmlyZWQuWy9lbl1cbiAqICBbamFdXCJyZWFjdGl2ZVwi44Kk44OZ44Oz44OI44GM55m654Gr44GV44KM44Gf5pmC44Gu5oyZ5YuV44KS54us6Ieq44Gr5oyH5a6a44Gn44GN44G+44GZ44CCWy9qYV1cbiAqL1xuXG4vKipcbiAqIEBhdHRyaWJ1dGUgb25zLXByZWNoYW5nZVxuICogQGluaXRvbmx5XG4gKiBAdHlwZSB7RXhwcmVzc2lvbn1cbiAqIEBkZXNjcmlwdGlvblxuICogIFtlbl1BbGxvd3MgeW91IHRvIHNwZWNpZnkgY3VzdG9tIGJlaGF2aW9yIHdoZW4gdGhlIFwicHJlY2hhbmdlXCIgZXZlbnQgaXMgZmlyZWQuWy9lbl1cbiAqICBbamFdXCJwcmVjaGFuZ2VcIuOCpOODmeODs+ODiOOBjOeZuueBq+OBleOCjOOBn+aZguOBruaMmeWLleOCkueLrOiHquOBq+aMh+WumuOBp+OBjeOBvuOBmeOAglsvamFdXG4gKi9cblxuLyoqXG4gKiBAYXR0cmlidXRlIG9ucy1wb3N0Y2hhbmdlXG4gKiBAaW5pdG9ubHlcbiAqIEB0eXBlIHtFeHByZXNzaW9ufVxuICogQGRlc2NyaXB0aW9uXG4gKiAgW2VuXUFsbG93cyB5b3UgdG8gc3BlY2lmeSBjdXN0b20gYmVoYXZpb3Igd2hlbiB0aGUgXCJwb3N0Y2hhbmdlXCIgZXZlbnQgaXMgZmlyZWQuWy9lbl1cbiAqICBbamFdXCJwb3N0Y2hhbmdlXCLjgqTjg5njg7Pjg4jjgYznmbrngavjgZXjgozjgZ/mmYLjga7mjJnli5XjgpLni6zoh6rjgavmjIflrprjgafjgY3jgb7jgZnjgIJbL2phXVxuICovXG5cbi8qKlxuICogQGF0dHJpYnV0ZSBvbnMtaW5pdFxuICogQGluaXRvbmx5XG4gKiBAdHlwZSB7RXhwcmVzc2lvbn1cbiAqIEBkZXNjcmlwdGlvblxuICogIFtlbl1BbGxvd3MgeW91IHRvIHNwZWNpZnkgY3VzdG9tIGJlaGF2aW9yIHdoZW4gYSBwYWdlJ3MgXCJpbml0XCIgZXZlbnQgaXMgZmlyZWQuWy9lbl1cbiAqICBbamFd44Oa44O844K444GuXCJpbml0XCLjgqTjg5njg7Pjg4jjgYznmbrngavjgZXjgozjgZ/mmYLjga7mjJnli5XjgpLni6zoh6rjgavmjIflrprjgafjgY3jgb7jgZnjgIJbL2phXVxuICovXG5cbi8qKlxuICogQGF0dHJpYnV0ZSBvbnMtc2hvd1xuICogQGluaXRvbmx5XG4gKiBAdHlwZSB7RXhwcmVzc2lvbn1cbiAqIEBkZXNjcmlwdGlvblxuICogIFtlbl1BbGxvd3MgeW91IHRvIHNwZWNpZnkgY3VzdG9tIGJlaGF2aW9yIHdoZW4gYSBwYWdlJ3MgXCJzaG93XCIgZXZlbnQgaXMgZmlyZWQuWy9lbl1cbiAqICBbamFd44Oa44O844K444GuXCJzaG93XCLjgqTjg5njg7Pjg4jjgYznmbrngavjgZXjgozjgZ/mmYLjga7mjJnli5XjgpLni6zoh6rjgavmjIflrprjgafjgY3jgb7jgZnjgIJbL2phXVxuICovXG5cbi8qKlxuICogQGF0dHJpYnV0ZSBvbnMtaGlkZVxuICogQGluaXRvbmx5XG4gKiBAdHlwZSB7RXhwcmVzc2lvbn1cbiAqIEBkZXNjcmlwdGlvblxuICogIFtlbl1BbGxvd3MgeW91IHRvIHNwZWNpZnkgY3VzdG9tIGJlaGF2aW9yIHdoZW4gYSBwYWdlJ3MgXCJoaWRlXCIgZXZlbnQgaXMgZmlyZWQuWy9lbl1cbiAqICBbamFd44Oa44O844K444GuXCJoaWRlXCLjgqTjg5njg7Pjg4jjgYznmbrngavjgZXjgozjgZ/mmYLjga7mjJnli5XjgpLni6zoh6rjgavmjIflrprjgafjgY3jgb7jgZnjgIJbL2phXVxuICovXG5cbi8qKlxuICogQGF0dHJpYnV0ZSBvbnMtZGVzdHJveVxuICogQGluaXRvbmx5XG4gKiBAdHlwZSB7RXhwcmVzc2lvbn1cbiAqIEBkZXNjcmlwdGlvblxuICogIFtlbl1BbGxvd3MgeW91IHRvIHNwZWNpZnkgY3VzdG9tIGJlaGF2aW9yIHdoZW4gYSBwYWdlJ3MgXCJkZXN0cm95XCIgZXZlbnQgaXMgZmlyZWQuWy9lbl1cbiAqICBbamFd44Oa44O844K444GuXCJkZXN0cm95XCLjgqTjg5njg7Pjg4jjgYznmbrngavjgZXjgozjgZ/mmYLjga7mjJnli5XjgpLni6zoh6rjgavmjIflrprjgafjgY3jgb7jgZnjgIJbL2phXVxuICovXG5cblxuLyoqXG4gKiBAbWV0aG9kIG9uXG4gKiBAc2lnbmF0dXJlIG9uKGV2ZW50TmFtZSwgbGlzdGVuZXIpXG4gKiBAZGVzY3JpcHRpb25cbiAqICAgW2VuXUFkZCBhbiBldmVudCBsaXN0ZW5lci5bL2VuXVxuICogICBbamFd44Kk44OZ44Oz44OI44Oq44K544OK44O844KS6L+95Yqg44GX44G+44GZ44CCWy9qYV1cbiAqIEBwYXJhbSB7U3RyaW5nfSBldmVudE5hbWVcbiAqICAgW2VuXU5hbWUgb2YgdGhlIGV2ZW50LlsvZW5dXG4gKiAgIFtqYV3jgqTjg5njg7Pjg4jlkI3jgpLmjIflrprjgZfjgb7jgZnjgIJbL2phXVxuICogQHBhcmFtIHtGdW5jdGlvbn0gbGlzdGVuZXJcbiAqICAgW2VuXUZ1bmN0aW9uIHRvIGV4ZWN1dGUgd2hlbiB0aGUgZXZlbnQgaXMgdHJpZ2dlcmVkLlsvZW5dXG4gKiAgIFtqYV3jgZPjga7jgqTjg5njg7Pjg4jjgYznmbrngavjgZXjgozjgZ/pmpvjgavlkbzjgbPlh7rjgZXjgozjgovplqLmlbDjgqrjg5bjgrjjgqfjgq/jg4jjgpLmjIflrprjgZfjgb7jgZnjgIJbL2phXVxuICovXG5cbi8qKlxuICogQG1ldGhvZCBvbmNlXG4gKiBAc2lnbmF0dXJlIG9uY2UoZXZlbnROYW1lLCBsaXN0ZW5lcilcbiAqIEBkZXNjcmlwdGlvblxuICogIFtlbl1BZGQgYW4gZXZlbnQgbGlzdGVuZXIgdGhhdCdzIG9ubHkgdHJpZ2dlcmVkIG9uY2UuWy9lbl1cbiAqICBbamFd5LiA5bqm44Gg44GR5ZG844Gz5Ye644GV44KM44KL44Kk44OZ44Oz44OI44Oq44K544OK44O844KS6L+95Yqg44GX44G+44GZ44CCWy9qYV1cbiAqIEBwYXJhbSB7U3RyaW5nfSBldmVudE5hbWVcbiAqICAgW2VuXU5hbWUgb2YgdGhlIGV2ZW50LlsvZW5dXG4gKiAgIFtqYV3jgqTjg5njg7Pjg4jlkI3jgpLmjIflrprjgZfjgb7jgZnjgIJbL2phXVxuICogQHBhcmFtIHtGdW5jdGlvbn0gbGlzdGVuZXJcbiAqICAgW2VuXUZ1bmN0aW9uIHRvIGV4ZWN1dGUgd2hlbiB0aGUgZXZlbnQgaXMgdHJpZ2dlcmVkLlsvZW5dXG4gKiAgIFtqYV3jgqTjg5njg7Pjg4jjgYznmbrngavjgZfjgZ/pmpvjgavlkbzjgbPlh7rjgZXjgozjgovplqLmlbDjgqrjg5bjgrjjgqfjgq/jg4jjgpLmjIflrprjgZfjgb7jgZnjgIJbL2phXVxuICovXG5cbi8qKlxuICogQG1ldGhvZCBvZmZcbiAqIEBzaWduYXR1cmUgb2ZmKGV2ZW50TmFtZSwgW2xpc3RlbmVyXSlcbiAqIEBkZXNjcmlwdGlvblxuICogIFtlbl1SZW1vdmUgYW4gZXZlbnQgbGlzdGVuZXIuIElmIHRoZSBsaXN0ZW5lciBpcyBub3Qgc3BlY2lmaWVkIGFsbCBsaXN0ZW5lcnMgZm9yIHRoZSBldmVudCB0eXBlIHdpbGwgYmUgcmVtb3ZlZC5bL2VuXVxuICogIFtqYV3jgqTjg5njg7Pjg4jjg6rjgrnjg4rjg7zjgpLliYrpmaTjgZfjgb7jgZnjgILjgoLjgZfjgqTjg5njg7Pjg4jjg6rjgrnjg4rjg7zjgpLmjIflrprjgZfjgarjgYvjgaPjgZ/loLTlkIjjgavjga/jgIHjgZ3jga7jgqTjg5njg7Pjg4jjgavntJDjgaXjgY/lhajjgabjga7jgqTjg5njg7Pjg4jjg6rjgrnjg4rjg7zjgYzliYrpmaTjgZXjgozjgb7jgZnjgIJbL2phXVxuICogQHBhcmFtIHtTdHJpbmd9IGV2ZW50TmFtZVxuICogICBbZW5dTmFtZSBvZiB0aGUgZXZlbnQuWy9lbl1cbiAqICAgW2phXeOCpOODmeODs+ODiOWQjeOCkuaMh+WumuOBl+OBvuOBmeOAglsvamFdXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBsaXN0ZW5lclxuICogICBbZW5dRnVuY3Rpb24gdG8gZXhlY3V0ZSB3aGVuIHRoZSBldmVudCBpcyB0cmlnZ2VyZWQuWy9lbl1cbiAqICAgW2phXeWJiumZpOOBmeOCi+OCpOODmeODs+ODiOODquOCueODiuODvOOCkuaMh+WumuOBl+OBvuOBmeOAglsvamFdXG4gKi9cblxuKGZ1bmN0aW9uKCkge1xuICAndXNlIHN0cmljdCc7XG5cbiAgdmFyIGxhc3RSZWFkeSA9IHdpbmRvdy5vbnMuZWxlbWVudHMuVGFiYmFyLnJld3JpdGFibGVzLnJlYWR5O1xuICB3aW5kb3cub25zLmVsZW1lbnRzLlRhYmJhci5yZXdyaXRhYmxlcy5yZWFkeSA9IG9ucy5fd2FpdERpcmV0aXZlSW5pdCgnb25zLXRhYmJhcicsIGxhc3RSZWFkeSk7XG5cbiAgYW5ndWxhci5tb2R1bGUoJ29uc2VuJykuZGlyZWN0aXZlKCdvbnNUYWJiYXInLCBmdW5jdGlvbigkb25zZW4sICRjb21waWxlLCAkcGFyc2UsIFRhYmJhclZpZXcpIHtcblxuICAgIHJldHVybiB7XG4gICAgICByZXN0cmljdDogJ0UnLFxuXG4gICAgICByZXBsYWNlOiBmYWxzZSxcbiAgICAgIHNjb3BlOiB0cnVlLFxuXG4gICAgICBsaW5rOiBmdW5jdGlvbihzY29wZSwgZWxlbWVudCwgYXR0cnMsIGNvbnRyb2xsZXIpIHtcbiAgICAgICAgdmFyIHRhYmJhclZpZXcgPSBuZXcgVGFiYmFyVmlldyhzY29wZSwgZWxlbWVudCwgYXR0cnMpO1xuICAgICAgICAkb25zZW4uYWRkTW9kaWZpZXJNZXRob2RzRm9yQ3VzdG9tRWxlbWVudHModGFiYmFyVmlldywgZWxlbWVudCk7XG5cbiAgICAgICAgJG9uc2VuLnJlZ2lzdGVyRXZlbnRIYW5kbGVycyh0YWJiYXJWaWV3LCAncmVhY3RpdmUgcHJlY2hhbmdlIHBvc3RjaGFuZ2UgaW5pdCBzaG93IGhpZGUgZGVzdHJveScpO1xuXG4gICAgICAgIGVsZW1lbnQuZGF0YSgnb25zLXRhYmJhcicsIHRhYmJhclZpZXcpO1xuICAgICAgICAkb25zZW4uZGVjbGFyZVZhckF0dHJpYnV0ZShhdHRycywgdGFiYmFyVmlldyk7XG5cbiAgICAgICAgc2NvcGUuJG9uKCckZGVzdHJveScsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgIHRhYmJhclZpZXcuX2V2ZW50cyA9IHVuZGVmaW5lZDtcbiAgICAgICAgICAkb25zZW4ucmVtb3ZlTW9kaWZpZXJNZXRob2RzKHRhYmJhclZpZXcpO1xuICAgICAgICAgIGVsZW1lbnQuZGF0YSgnb25zLXRhYmJhcicsIHVuZGVmaW5lZCk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgICRvbnNlbi5maXJlQ29tcG9uZW50RXZlbnQoZWxlbWVudFswXSwgJ2luaXQnKTtcbiAgICAgIH1cbiAgICB9O1xuICB9KTtcbn0pKCk7XG4iLCIoZnVuY3Rpb24oKSB7XG4gICd1c2Ugc3RyaWN0JztcblxuICBhbmd1bGFyLm1vZHVsZSgnb25zZW4nKVxuICAgIC5kaXJlY3RpdmUoJ29uc1RhYicsIHRhYilcbiAgICAuZGlyZWN0aXZlKCdvbnNUYWJiYXJJdGVtJywgdGFiKTsgLy8gZm9yIEJDXG5cbiAgZnVuY3Rpb24gdGFiKCRvbnNlbiwgR2VuZXJpY1ZpZXcpIHtcbiAgICByZXR1cm4ge1xuICAgICAgcmVzdHJpY3Q6ICdFJyxcbiAgICAgIGxpbms6IGZ1bmN0aW9uKHNjb3BlLCBlbGVtZW50LCBhdHRycykge1xuICAgICAgICB2YXIgdmlldyA9IEdlbmVyaWNWaWV3LnJlZ2lzdGVyKHNjb3BlLCBlbGVtZW50LCBhdHRycywge3ZpZXdLZXk6ICdvbnMtdGFiJ30pO1xuICAgICAgICBlbGVtZW50WzBdLnBhZ2VMb2FkZXIgPSAkb25zZW4uY3JlYXRlUGFnZUxvYWRlcih2aWV3KTtcblxuICAgICAgICAkb25zZW4uZmlyZUNvbXBvbmVudEV2ZW50KGVsZW1lbnRbMF0sICdpbml0Jyk7XG4gICAgICB9XG4gICAgfTtcbiAgfVxufSkoKTtcbiIsIihmdW5jdGlvbigpe1xuICAndXNlIHN0cmljdCc7XG5cbiAgYW5ndWxhci5tb2R1bGUoJ29uc2VuJykuZGlyZWN0aXZlKCdvbnNUZW1wbGF0ZScsIGZ1bmN0aW9uKCR0ZW1wbGF0ZUNhY2hlKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHJlc3RyaWN0OiAnRScsXG4gICAgICB0ZXJtaW5hbDogdHJ1ZSxcbiAgICAgIGNvbXBpbGU6IGZ1bmN0aW9uKGVsZW1lbnQpIHtcbiAgICAgICAgdmFyIGNvbnRlbnQgPSBlbGVtZW50WzBdLnRlbXBsYXRlIHx8IGVsZW1lbnQuaHRtbCgpO1xuICAgICAgICAkdGVtcGxhdGVDYWNoZS5wdXQoZWxlbWVudC5hdHRyKCdpZCcpLCBjb250ZW50KTtcbiAgICAgIH1cbiAgICB9O1xuICB9KTtcbn0pKCk7XG4iLCIvKipcbiAqIEBlbGVtZW50IG9ucy10b2FzdFxuICovXG5cbi8qKlxuICogQGF0dHJpYnV0ZSB2YXJcbiAqIEBpbml0b25seVxuICogQHR5cGUge1N0cmluZ31cbiAqIEBkZXNjcmlwdGlvblxuICogIFtlbl1WYXJpYWJsZSBuYW1lIHRvIHJlZmVyIHRoaXMgdG9hc3QgZGlhbG9nLlsvZW5dXG4gKiAgW2phXeOBk+OBruODiOODvOOCueODiOOCkuWPgueFp+OBmeOCi+OBn+OCgeOBruWQjeWJjeOCkuaMh+WumuOBl+OBvuOBmeOAglsvamFdXG4gKi9cblxuLyoqXG4gKiBAYXR0cmlidXRlIG9ucy1wcmVzaG93XG4gKiBAaW5pdG9ubHlcbiAqIEB0eXBlIHtFeHByZXNzaW9ufVxuICogQGRlc2NyaXB0aW9uXG4gKiAgW2VuXUFsbG93cyB5b3UgdG8gc3BlY2lmeSBjdXN0b20gYmVoYXZpb3Igd2hlbiB0aGUgXCJwcmVzaG93XCIgZXZlbnQgaXMgZmlyZWQuWy9lbl1cbiAqICBbamFdXCJwcmVzaG93XCLjgqTjg5njg7Pjg4jjgYznmbrngavjgZXjgozjgZ/mmYLjga7mjJnli5XjgpLni6zoh6rjgavmjIflrprjgafjgY3jgb7jgZnjgIJbL2phXVxuICovXG5cbi8qKlxuICogQGF0dHJpYnV0ZSBvbnMtcHJlaGlkZVxuICogQGluaXRvbmx5XG4gKiBAdHlwZSB7RXhwcmVzc2lvbn1cbiAqIEBkZXNjcmlwdGlvblxuICogIFtlbl1BbGxvd3MgeW91IHRvIHNwZWNpZnkgY3VzdG9tIGJlaGF2aW9yIHdoZW4gdGhlIFwicHJlaGlkZVwiIGV2ZW50IGlzIGZpcmVkLlsvZW5dXG4gKiAgW2phXVwicHJlaGlkZVwi44Kk44OZ44Oz44OI44GM55m654Gr44GV44KM44Gf5pmC44Gu5oyZ5YuV44KS54us6Ieq44Gr5oyH5a6a44Gn44GN44G+44GZ44CCWy9qYV1cbiAqL1xuXG4vKipcbiAqIEBhdHRyaWJ1dGUgb25zLXBvc3RzaG93XG4gKiBAaW5pdG9ubHlcbiAqIEB0eXBlIHtFeHByZXNzaW9ufVxuICogQGRlc2NyaXB0aW9uXG4gKiAgW2VuXUFsbG93cyB5b3UgdG8gc3BlY2lmeSBjdXN0b20gYmVoYXZpb3Igd2hlbiB0aGUgXCJwb3N0c2hvd1wiIGV2ZW50IGlzIGZpcmVkLlsvZW5dXG4gKiAgW2phXVwicG9zdHNob3dcIuOCpOODmeODs+ODiOOBjOeZuueBq+OBleOCjOOBn+aZguOBruaMmeWLleOCkueLrOiHquOBq+aMh+WumuOBp+OBjeOBvuOBmeOAglsvamFdXG4gKi9cblxuLyoqXG4gKiBAYXR0cmlidXRlIG9ucy1wb3N0aGlkZVxuICogQGluaXRvbmx5XG4gKiBAdHlwZSB7RXhwcmVzc2lvbn1cbiAqIEBkZXNjcmlwdGlvblxuICogIFtlbl1BbGxvd3MgeW91IHRvIHNwZWNpZnkgY3VzdG9tIGJlaGF2aW9yIHdoZW4gdGhlIFwicG9zdGhpZGVcIiBldmVudCBpcyBmaXJlZC5bL2VuXVxuICogIFtqYV1cInBvc3RoaWRlXCLjgqTjg5njg7Pjg4jjgYznmbrngavjgZXjgozjgZ/mmYLjga7mjJnli5XjgpLni6zoh6rjgavmjIflrprjgafjgY3jgb7jgZnjgIJbL2phXVxuICovXG5cbi8qKlxuICogQGF0dHJpYnV0ZSBvbnMtZGVzdHJveVxuICogQGluaXRvbmx5XG4gKiBAdHlwZSB7RXhwcmVzc2lvbn1cbiAqIEBkZXNjcmlwdGlvblxuICogIFtlbl1BbGxvd3MgeW91IHRvIHNwZWNpZnkgY3VzdG9tIGJlaGF2aW9yIHdoZW4gdGhlIFwiZGVzdHJveVwiIGV2ZW50IGlzIGZpcmVkLlsvZW5dXG4gKiAgW2phXVwiZGVzdHJveVwi44Kk44OZ44Oz44OI44GM55m654Gr44GV44KM44Gf5pmC44Gu5oyZ5YuV44KS54us6Ieq44Gr5oyH5a6a44Gn44GN44G+44GZ44CCWy9qYV1cbiAqL1xuXG4vKipcbiAqIEBtZXRob2Qgb25cbiAqIEBzaWduYXR1cmUgb24oZXZlbnROYW1lLCBsaXN0ZW5lcilcbiAqIEBkZXNjcmlwdGlvblxuICogICBbZW5dQWRkIGFuIGV2ZW50IGxpc3RlbmVyLlsvZW5dXG4gKiAgIFtqYV3jgqTjg5njg7Pjg4jjg6rjgrnjg4rjg7zjgpLov73liqDjgZfjgb7jgZnjgIJbL2phXVxuICogQHBhcmFtIHtTdHJpbmd9IGV2ZW50TmFtZVxuICogICBbZW5dTmFtZSBvZiB0aGUgZXZlbnQuWy9lbl1cbiAqICAgW2phXeOCpOODmeODs+ODiOWQjeOCkuaMh+WumuOBl+OBvuOBmeOAglsvamFdXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBsaXN0ZW5lclxuICogICBbZW5dRnVuY3Rpb24gdG8gZXhlY3V0ZSB3aGVuIHRoZSBldmVudCBpcyB0cmlnZ2VyZWQuWy9lbl1cbiAqICAgW2phXeOCpOODmeODs+ODiOOBjOeZuueBq+OBleOCjOOBn+mam+OBq+WRvOOBs+WHuuOBleOCjOOCi+OCs+ODvOODq+ODkOODg+OCr+OCkuaMh+WumuOBl+OBvuOBmeOAglsvamFdXG4gKi9cblxuLyoqXG4gKiBAbWV0aG9kIG9uY2VcbiAqIEBzaWduYXR1cmUgb25jZShldmVudE5hbWUsIGxpc3RlbmVyKVxuICogQGRlc2NyaXB0aW9uXG4gKiAgW2VuXUFkZCBhbiBldmVudCBsaXN0ZW5lciB0aGF0J3Mgb25seSB0cmlnZ2VyZWQgb25jZS5bL2VuXVxuICogIFtqYV3kuIDluqbjgaDjgZHlkbzjgbPlh7rjgZXjgozjgovjgqTjg5njg7Pjg4jjg6rjgrnjg4rjg7zjgpLov73liqDjgZfjgb7jgZnjgIJbL2phXVxuICogQHBhcmFtIHtTdHJpbmd9IGV2ZW50TmFtZVxuICogICBbZW5dTmFtZSBvZiB0aGUgZXZlbnQuWy9lbl1cbiAqICAgW2phXeOCpOODmeODs+ODiOWQjeOCkuaMh+WumuOBl+OBvuOBmeOAglsvamFdXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBsaXN0ZW5lclxuICogICBbZW5dRnVuY3Rpb24gdG8gZXhlY3V0ZSB3aGVuIHRoZSBldmVudCBpcyB0cmlnZ2VyZWQuWy9lbl1cbiAqICAgW2phXeOCpOODmeODs+ODiOOBjOeZuueBq+OBl+OBn+mam+OBq+WRvOOBs+WHuuOBleOCjOOCi+OCs+ODvOODq+ODkOODg+OCr+OCkuaMh+WumuOBl+OBvuOBmeOAglsvamFdXG4gKi9cblxuLyoqXG4gKiBAbWV0aG9kIG9mZlxuICogQHNpZ25hdHVyZSBvZmYoZXZlbnROYW1lLCBbbGlzdGVuZXJdKVxuICogQGRlc2NyaXB0aW9uXG4gKiAgW2VuXVJlbW92ZSBhbiBldmVudCBsaXN0ZW5lci4gSWYgdGhlIGxpc3RlbmVyIGlzIG5vdCBzcGVjaWZpZWQgYWxsIGxpc3RlbmVycyBmb3IgdGhlIGV2ZW50IHR5cGUgd2lsbCBiZSByZW1vdmVkLlsvZW5dXG4gKiAgW2phXeOCpOODmeODs+ODiOODquOCueODiuODvOOCkuWJiumZpOOBl+OBvuOBmeOAguOCguOBl2xpc3RlbmVy44OR44Op44Oh44O844K/44GM5oyH5a6a44GV44KM44Gq44GL44Gj44Gf5aC05ZCI44CB44Gd44Gu44Kk44OZ44Oz44OI44Gu44Oq44K544OK44O844GM5YWo44Gm5YmK6Zmk44GV44KM44G+44GZ44CCWy9qYV1cbiAqIEBwYXJhbSB7U3RyaW5nfSBldmVudE5hbWVcbiAqICAgW2VuXU5hbWUgb2YgdGhlIGV2ZW50LlsvZW5dXG4gKiAgIFtqYV3jgqTjg5njg7Pjg4jlkI3jgpLmjIflrprjgZfjgb7jgZnjgIJbL2phXVxuICogQHBhcmFtIHtGdW5jdGlvbn0gbGlzdGVuZXJcbiAqICAgW2VuXUZ1bmN0aW9uIHRvIGV4ZWN1dGUgd2hlbiB0aGUgZXZlbnQgaXMgdHJpZ2dlcmVkLlsvZW5dXG4gKiAgIFtqYV3liYrpmaTjgZnjgovjgqTjg5njg7Pjg4jjg6rjgrnjg4rjg7zjga7plqLmlbDjgqrjg5bjgrjjgqfjgq/jg4jjgpLmuKHjgZfjgb7jgZnjgIJbL2phXVxuICovXG5cbihmdW5jdGlvbigpIHtcbiAgJ3VzZSBzdHJpY3QnO1xuXG4gIC8qKlxuICAgKiBUb2FzdCBkaXJlY3RpdmUuXG4gICAqL1xuICBhbmd1bGFyLm1vZHVsZSgnb25zZW4nKS5kaXJlY3RpdmUoJ29uc1RvYXN0JywgZnVuY3Rpb24oJG9uc2VuLCBUb2FzdFZpZXcpIHtcbiAgICByZXR1cm4ge1xuICAgICAgcmVzdHJpY3Q6ICdFJyxcbiAgICAgIHJlcGxhY2U6IGZhbHNlLFxuICAgICAgc2NvcGU6IHRydWUsXG4gICAgICB0cmFuc2NsdWRlOiBmYWxzZSxcblxuICAgICAgY29tcGlsZTogZnVuY3Rpb24oZWxlbWVudCwgYXR0cnMpIHtcblxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgIHByZTogZnVuY3Rpb24oc2NvcGUsIGVsZW1lbnQsIGF0dHJzKSB7XG4gICAgICAgICAgICB2YXIgdG9hc3QgPSBuZXcgVG9hc3RWaWV3KHNjb3BlLCBlbGVtZW50LCBhdHRycyk7XG5cbiAgICAgICAgICAgICRvbnNlbi5kZWNsYXJlVmFyQXR0cmlidXRlKGF0dHJzLCB0b2FzdCk7XG4gICAgICAgICAgICAkb25zZW4ucmVnaXN0ZXJFdmVudEhhbmRsZXJzKHRvYXN0LCAncHJlc2hvdyBwcmVoaWRlIHBvc3RzaG93IHBvc3RoaWRlIGRlc3Ryb3knKTtcbiAgICAgICAgICAgICRvbnNlbi5hZGRNb2RpZmllck1ldGhvZHNGb3JDdXN0b21FbGVtZW50cyh0b2FzdCwgZWxlbWVudCk7XG5cbiAgICAgICAgICAgIGVsZW1lbnQuZGF0YSgnb25zLXRvYXN0JywgdG9hc3QpO1xuICAgICAgICAgICAgZWxlbWVudC5kYXRhKCdfc2NvcGUnLCBzY29wZSk7XG5cbiAgICAgICAgICAgIHNjb3BlLiRvbignJGRlc3Ryb3knLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgdG9hc3QuX2V2ZW50cyA9IHVuZGVmaW5lZDtcbiAgICAgICAgICAgICAgJG9uc2VuLnJlbW92ZU1vZGlmaWVyTWV0aG9kcyh0b2FzdCk7XG4gICAgICAgICAgICAgIGVsZW1lbnQuZGF0YSgnb25zLXRvYXN0JywgdW5kZWZpbmVkKTtcbiAgICAgICAgICAgICAgZWxlbWVudCA9IG51bGw7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9LFxuICAgICAgICAgIHBvc3Q6IGZ1bmN0aW9uKHNjb3BlLCBlbGVtZW50KSB7XG4gICAgICAgICAgICAkb25zZW4uZmlyZUNvbXBvbmVudEV2ZW50KGVsZW1lbnRbMF0sICdpbml0Jyk7XG4gICAgICAgICAgfVxuICAgICAgICB9O1xuICAgICAgfVxuICAgIH07XG4gIH0pO1xuXG59KSgpO1xuIiwiLyoqXG4gKiBAZWxlbWVudCBvbnMtdG9vbGJhci1idXR0b25cbiAqL1xuXG4vKipcbiAqIEBhdHRyaWJ1dGUgdmFyXG4gKiBAaW5pdG9ubHlcbiAqIEB0eXBlIHtTdHJpbmd9XG4gKiBAZGVzY3JpcHRpb25cbiAqICAgW2VuXVZhcmlhYmxlIG5hbWUgdG8gcmVmZXIgdGhpcyBidXR0b24uWy9lbl1cbiAqICAgW2phXeOBk+OBruODnOOCv+ODs+OCkuWPgueFp+OBmeOCi+OBn+OCgeOBruWQjeWJjeOCkuaMh+WumuOBl+OBvuOBmeOAglsvamFdXG4gKi9cbihmdW5jdGlvbigpe1xuICAndXNlIHN0cmljdCc7XG4gIHZhciBtb2R1bGUgPSBhbmd1bGFyLm1vZHVsZSgnb25zZW4nKTtcblxuICBtb2R1bGUuZGlyZWN0aXZlKCdvbnNUb29sYmFyQnV0dG9uJywgZnVuY3Rpb24oJG9uc2VuLCBHZW5lcmljVmlldykge1xuICAgIHJldHVybiB7XG4gICAgICByZXN0cmljdDogJ0UnLFxuICAgICAgc2NvcGU6IGZhbHNlLFxuICAgICAgbGluazoge1xuICAgICAgICBwcmU6IGZ1bmN0aW9uKHNjb3BlLCBlbGVtZW50LCBhdHRycykge1xuICAgICAgICAgIHZhciB0b29sYmFyQnV0dG9uID0gbmV3IEdlbmVyaWNWaWV3KHNjb3BlLCBlbGVtZW50LCBhdHRycyk7XG4gICAgICAgICAgZWxlbWVudC5kYXRhKCdvbnMtdG9vbGJhci1idXR0b24nLCB0b29sYmFyQnV0dG9uKTtcbiAgICAgICAgICAkb25zZW4uZGVjbGFyZVZhckF0dHJpYnV0ZShhdHRycywgdG9vbGJhckJ1dHRvbik7XG5cbiAgICAgICAgICAkb25zZW4uYWRkTW9kaWZpZXJNZXRob2RzRm9yQ3VzdG9tRWxlbWVudHModG9vbGJhckJ1dHRvbiwgZWxlbWVudCk7XG5cbiAgICAgICAgICAkb25zZW4uY2xlYW5lci5vbkRlc3Ryb3koc2NvcGUsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgdG9vbGJhckJ1dHRvbi5fZXZlbnRzID0gdW5kZWZpbmVkO1xuICAgICAgICAgICAgJG9uc2VuLnJlbW92ZU1vZGlmaWVyTWV0aG9kcyh0b29sYmFyQnV0dG9uKTtcbiAgICAgICAgICAgIGVsZW1lbnQuZGF0YSgnb25zLXRvb2xiYXItYnV0dG9uJywgdW5kZWZpbmVkKTtcbiAgICAgICAgICAgIGVsZW1lbnQgPSBudWxsO1xuXG4gICAgICAgICAgICAkb25zZW4uY2xlYXJDb21wb25lbnQoe1xuICAgICAgICAgICAgICBzY29wZTogc2NvcGUsXG4gICAgICAgICAgICAgIGF0dHJzOiBhdHRycyxcbiAgICAgICAgICAgICAgZWxlbWVudDogZWxlbWVudCxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgc2NvcGUgPSBlbGVtZW50ID0gYXR0cnMgPSBudWxsO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9LFxuICAgICAgICBwb3N0OiBmdW5jdGlvbihzY29wZSwgZWxlbWVudCwgYXR0cnMpIHtcbiAgICAgICAgICAkb25zZW4uZmlyZUNvbXBvbmVudEV2ZW50KGVsZW1lbnRbMF0sICdpbml0Jyk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9O1xuICB9KTtcbn0pKCk7XG4iLCIvKipcbiAqIEBlbGVtZW50IG9ucy10b29sYmFyXG4gKi9cblxuLyoqXG4gKiBAYXR0cmlidXRlIHZhclxuICogQGluaXRvbmx5XG4gKiBAdHlwZSB7U3RyaW5nfVxuICogQGRlc2NyaXB0aW9uXG4gKiAgW2VuXVZhcmlhYmxlIG5hbWUgdG8gcmVmZXIgdGhpcyB0b29sYmFyLlsvZW5dXG4gKiAgW2phXeOBk+OBruODhOODvOODq+ODkOODvOOCkuWPgueFp+OBmeOCi+OBn+OCgeOBruWQjeWJjeOCkuaMh+WumuOBl+OBvuOBmeOAglsvamFdXG4gKi9cbihmdW5jdGlvbigpIHtcbiAgJ3VzZSBzdHJpY3QnO1xuXG4gIGFuZ3VsYXIubW9kdWxlKCdvbnNlbicpLmRpcmVjdGl2ZSgnb25zVG9vbGJhcicsIGZ1bmN0aW9uKCRvbnNlbiwgR2VuZXJpY1ZpZXcpIHtcbiAgICByZXR1cm4ge1xuICAgICAgcmVzdHJpY3Q6ICdFJyxcblxuICAgICAgLy8gTk9URTogVGhpcyBlbGVtZW50IG11c3QgY29leGlzdHMgd2l0aCBuZy1jb250cm9sbGVyLlxuICAgICAgLy8gRG8gbm90IHVzZSBpc29sYXRlZCBzY29wZSBhbmQgdGVtcGxhdGUncyBuZy10cmFuc2NsdWRlLlxuICAgICAgc2NvcGU6IGZhbHNlLFxuICAgICAgdHJhbnNjbHVkZTogZmFsc2UsXG5cbiAgICAgIGNvbXBpbGU6IGZ1bmN0aW9uKGVsZW1lbnQpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICBwcmU6IGZ1bmN0aW9uKHNjb3BlLCBlbGVtZW50LCBhdHRycykge1xuICAgICAgICAgICAgLy8gVE9ETzogUmVtb3ZlIHRoaXMgZGlydHkgZml4IVxuICAgICAgICAgICAgaWYgKGVsZW1lbnRbMF0ubm9kZU5hbWUgPT09ICdvbnMtdG9vbGJhcicpIHtcbiAgICAgICAgICAgICAgR2VuZXJpY1ZpZXcucmVnaXN0ZXIoc2NvcGUsIGVsZW1lbnQsIGF0dHJzLCB7dmlld0tleTogJ29ucy10b29sYmFyJ30pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0sXG4gICAgICAgICAgcG9zdDogZnVuY3Rpb24oc2NvcGUsIGVsZW1lbnQsIGF0dHJzKSB7XG4gICAgICAgICAgICAkb25zZW4uZmlyZUNvbXBvbmVudEV2ZW50KGVsZW1lbnRbMF0sICdpbml0Jyk7XG4gICAgICAgICAgfVxuICAgICAgICB9O1xuICAgICAgfVxuICAgIH07XG4gIH0pO1xuXG59KSgpO1xuIiwiLypcbkNvcHlyaWdodCAyMDEzLTIwMTUgQVNJQUwgQ09SUE9SQVRJT05cblxuTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbnlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbllvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuXG4gICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcblxuVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG5TZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG5saW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cblxuKi9cblxuKGZ1bmN0aW9uKCl7XG4gICd1c2Ugc3RyaWN0JztcblxuICB2YXIgbW9kdWxlID0gYW5ndWxhci5tb2R1bGUoJ29uc2VuJyk7XG5cbiAgLyoqXG4gICAqIEludGVybmFsIHNlcnZpY2UgY2xhc3MgZm9yIGZyYW1ld29yayBpbXBsZW1lbnRhdGlvbi5cbiAgICovXG4gIG1vZHVsZS5mYWN0b3J5KCckb25zZW4nLCBmdW5jdGlvbigkcm9vdFNjb3BlLCAkd2luZG93LCAkY2FjaGVGYWN0b3J5LCAkZG9jdW1lbnQsICR0ZW1wbGF0ZUNhY2hlLCAkaHR0cCwgJHEsICRjb21waWxlLCAkb25zR2xvYmFsLCBDb21wb25lbnRDbGVhbmVyKSB7XG5cbiAgICB2YXIgJG9uc2VuID0gY3JlYXRlT25zZW5TZXJ2aWNlKCk7XG4gICAgdmFyIE1vZGlmaWVyVXRpbCA9ICRvbnNHbG9iYWwuX2ludGVybmFsLk1vZGlmaWVyVXRpbDtcblxuICAgIHJldHVybiAkb25zZW47XG5cbiAgICBmdW5jdGlvbiBjcmVhdGVPbnNlblNlcnZpY2UoKSB7XG4gICAgICByZXR1cm4ge1xuXG4gICAgICAgIERJUkVDVElWRV9URU1QTEFURV9VUkw6ICd0ZW1wbGF0ZXMnLFxuXG4gICAgICAgIGNsZWFuZXI6IENvbXBvbmVudENsZWFuZXIsXG5cbiAgICAgICAgdXRpbDogJG9uc0dsb2JhbC5fdXRpbCxcblxuICAgICAgICBEZXZpY2VCYWNrQnV0dG9uSGFuZGxlcjogJG9uc0dsb2JhbC5faW50ZXJuYWwuZGJiRGlzcGF0Y2hlcixcblxuICAgICAgICBfZGVmYXVsdERldmljZUJhY2tCdXR0b25IYW5kbGVyOiAkb25zR2xvYmFsLl9kZWZhdWx0RGV2aWNlQmFja0J1dHRvbkhhbmRsZXIsXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIEByZXR1cm4ge09iamVjdH1cbiAgICAgICAgICovXG4gICAgICAgIGdldERlZmF1bHREZXZpY2VCYWNrQnV0dG9uSGFuZGxlcjogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgcmV0dXJuIHRoaXMuX2RlZmF1bHREZXZpY2VCYWNrQnV0dG9uSGFuZGxlcjtcbiAgICAgICAgfSxcblxuICAgICAgICAvKipcbiAgICAgICAgICogQHBhcmFtIHtPYmplY3R9IHZpZXdcbiAgICAgICAgICogQHBhcmFtIHtFbGVtZW50fSBlbGVtZW50XG4gICAgICAgICAqIEBwYXJhbSB7QXJyYXl9IG1ldGhvZE5hbWVzXG4gICAgICAgICAqIEByZXR1cm4ge0Z1bmN0aW9ufSBBIGZ1bmN0aW9uIHRoYXQgZGlzcG9zZSBhbGwgZHJpdmluZyBtZXRob2RzLlxuICAgICAgICAgKi9cbiAgICAgICAgZGVyaXZlTWV0aG9kczogZnVuY3Rpb24odmlldywgZWxlbWVudCwgbWV0aG9kTmFtZXMpIHtcbiAgICAgICAgICBtZXRob2ROYW1lcy5mb3JFYWNoKGZ1bmN0aW9uKG1ldGhvZE5hbWUpIHtcbiAgICAgICAgICAgIHZpZXdbbWV0aG9kTmFtZV0gPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIGVsZW1lbnRbbWV0aG9kTmFtZV0uYXBwbHkoZWxlbWVudCwgYXJndW1lbnRzKTtcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgfSk7XG5cbiAgICAgICAgICByZXR1cm4gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBtZXRob2ROYW1lcy5mb3JFYWNoKGZ1bmN0aW9uKG1ldGhvZE5hbWUpIHtcbiAgICAgICAgICAgICAgdmlld1ttZXRob2ROYW1lXSA9IG51bGw7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHZpZXcgPSBlbGVtZW50ID0gbnVsbDtcbiAgICAgICAgICB9O1xuICAgICAgICB9LFxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAcGFyYW0ge0NsYXNzfSBrbGFzc1xuICAgICAgICAgKiBAcGFyYW0ge0FycmF5fSBwcm9wZXJ0aWVzXG4gICAgICAgICAqL1xuICAgICAgICBkZXJpdmVQcm9wZXJ0aWVzRnJvbUVsZW1lbnQ6IGZ1bmN0aW9uKGtsYXNzLCBwcm9wZXJ0aWVzKSB7XG4gICAgICAgICAgcHJvcGVydGllcy5mb3JFYWNoKGZ1bmN0aW9uKHByb3BlcnR5KSB7XG4gICAgICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoa2xhc3MucHJvdG90eXBlLCBwcm9wZXJ0eSwge1xuICAgICAgICAgICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5fZWxlbWVudFswXVtwcm9wZXJ0eV07XG4gICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgIHNldDogZnVuY3Rpb24odmFsdWUpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5fZWxlbWVudFswXVtwcm9wZXJ0eV0gPSB2YWx1ZTsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby1yZXR1cm4tYXNzaWduXG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9LFxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAcGFyYW0ge09iamVjdH0gdmlld1xuICAgICAgICAgKiBAcGFyYW0ge0VsZW1lbnR9IGVsZW1lbnRcbiAgICAgICAgICogQHBhcmFtIHtBcnJheX0gZXZlbnROYW1lc1xuICAgICAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBbbWFwXVxuICAgICAgICAgKiBAcmV0dXJuIHtGdW5jdGlvbn0gQSBmdW5jdGlvbiB0aGF0IGNsZWFyIGFsbCBldmVudCBsaXN0ZW5lcnNcbiAgICAgICAgICovXG4gICAgICAgIGRlcml2ZUV2ZW50czogZnVuY3Rpb24odmlldywgZWxlbWVudCwgZXZlbnROYW1lcywgbWFwKSB7XG4gICAgICAgICAgbWFwID0gbWFwIHx8IGZ1bmN0aW9uKGRldGFpbCkgeyByZXR1cm4gZGV0YWlsOyB9O1xuICAgICAgICAgIGV2ZW50TmFtZXMgPSBbXS5jb25jYXQoZXZlbnROYW1lcyk7XG4gICAgICAgICAgdmFyIGxpc3RlbmVycyA9IFtdO1xuXG4gICAgICAgICAgZXZlbnROYW1lcy5mb3JFYWNoKGZ1bmN0aW9uKGV2ZW50TmFtZSkge1xuICAgICAgICAgICAgdmFyIGxpc3RlbmVyID0gZnVuY3Rpb24oZXZlbnQpIHtcbiAgICAgICAgICAgICAgbWFwKGV2ZW50LmRldGFpbCB8fCB7fSk7XG4gICAgICAgICAgICAgIHZpZXcuZW1pdChldmVudE5hbWUsIGV2ZW50KTtcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICBsaXN0ZW5lcnMucHVzaChsaXN0ZW5lcik7XG4gICAgICAgICAgICBlbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoZXZlbnROYW1lLCBsaXN0ZW5lciwgZmFsc2UpO1xuICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgcmV0dXJuIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgZXZlbnROYW1lcy5mb3JFYWNoKGZ1bmN0aW9uKGV2ZW50TmFtZSwgaW5kZXgpIHtcbiAgICAgICAgICAgICAgZWxlbWVudC5yZW1vdmVFdmVudExpc3RlbmVyKGV2ZW50TmFtZSwgbGlzdGVuZXJzW2luZGV4XSwgZmFsc2UpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB2aWV3ID0gZWxlbWVudCA9IGxpc3RlbmVycyA9IG1hcCA9IG51bGw7XG4gICAgICAgICAgfTtcbiAgICAgICAgfSxcblxuICAgICAgICAvKipcbiAgICAgICAgICogQHJldHVybiB7Qm9vbGVhbn1cbiAgICAgICAgICovXG4gICAgICAgIGlzRW5hYmxlZEF1dG9TdGF0dXNCYXJGaWxsOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICByZXR1cm4gISEkb25zR2xvYmFsLl9jb25maWcuYXV0b1N0YXR1c0JhckZpbGw7XG4gICAgICAgIH0sXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIEByZXR1cm4ge0Jvb2xlYW59XG4gICAgICAgICAqL1xuICAgICAgICBzaG91bGRGaWxsU3RhdHVzQmFyOiAkb25zR2xvYmFsLnNob3VsZEZpbGxTdGF0dXNCYXIsXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIEBwYXJhbSB7RnVuY3Rpb259IGFjdGlvblxuICAgICAgICAgKi9cbiAgICAgICAgYXV0b1N0YXR1c0JhckZpbGw6ICRvbnNHbG9iYWwuYXV0b1N0YXR1c0JhckZpbGwsXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIEBwYXJhbSB7T2JqZWN0fSBkaXJlY3RpdmVcbiAgICAgICAgICogQHBhcmFtIHtIVE1MRWxlbWVudH0gcGFnZUVsZW1lbnRcbiAgICAgICAgICogQHBhcmFtIHtGdW5jdGlvbn0gY2FsbGJhY2tcbiAgICAgICAgICovXG4gICAgICAgIGNvbXBpbGVBbmRMaW5rOiBmdW5jdGlvbih2aWV3LCBwYWdlRWxlbWVudCwgY2FsbGJhY2spIHtcbiAgICAgICAgICBjb25zdCBsaW5rID0gJGNvbXBpbGUocGFnZUVsZW1lbnQpO1xuICAgICAgICAgIGNvbnN0IHBhZ2VTY29wZSA9IHZpZXcuX3Njb3BlLiRuZXcoKTtcblxuICAgICAgICAgIC8qKlxuICAgICAgICAgICAqIE92ZXJ3cml0ZSBwYWdlIHNjb3BlLlxuICAgICAgICAgICAqL1xuICAgICAgICAgIGFuZ3VsYXIuZWxlbWVudChwYWdlRWxlbWVudCkuZGF0YSgnX3Njb3BlJywgcGFnZVNjb3BlKTtcblxuICAgICAgICAgIHBhZ2VTY29wZS4kZXZhbEFzeW5jKGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgY2FsbGJhY2socGFnZUVsZW1lbnQpOyAvLyBBdHRhY2ggYW5kIHByZXBhcmVcbiAgICAgICAgICAgIGxpbmsocGFnZVNjb3BlKTsgLy8gUnVuIHRoZSBjb250cm9sbGVyXG4gICAgICAgICAgfSk7XG4gICAgICAgIH0sXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIEBwYXJhbSB7T2JqZWN0fSB2aWV3XG4gICAgICAgICAqIEByZXR1cm4ge09iamVjdH0gcGFnZUxvYWRlclxuICAgICAgICAgKi9cbiAgICAgICAgY3JlYXRlUGFnZUxvYWRlcjogZnVuY3Rpb24odmlldykge1xuICAgICAgICAgIHJldHVybiBuZXcgJG9uc0dsb2JhbC5QYWdlTG9hZGVyKFxuICAgICAgICAgICAgKHtwYWdlLCBwYXJlbnR9LCBkb25lKSA9PiB7XG4gICAgICAgICAgICAgICRvbnNHbG9iYWwuX2ludGVybmFsLmdldFBhZ2VIVE1MQXN5bmMocGFnZSkudGhlbihodG1sID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLmNvbXBpbGVBbmRMaW5rKFxuICAgICAgICAgICAgICAgICAgdmlldyxcbiAgICAgICAgICAgICAgICAgICRvbnNHbG9iYWwuX3V0aWwuY3JlYXRlRWxlbWVudChodG1sKSxcbiAgICAgICAgICAgICAgICAgIGVsZW1lbnQgPT4gZG9uZShwYXJlbnQuYXBwZW5kQ2hpbGQoZWxlbWVudCkpXG4gICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZWxlbWVudCA9PiB7XG4gICAgICAgICAgICAgIGVsZW1lbnQuX2Rlc3Ryb3koKTtcbiAgICAgICAgICAgICAgaWYgKGFuZ3VsYXIuZWxlbWVudChlbGVtZW50KS5kYXRhKCdfc2NvcGUnKSkge1xuICAgICAgICAgICAgICAgIGFuZ3VsYXIuZWxlbWVudChlbGVtZW50KS5kYXRhKCdfc2NvcGUnKS4kZGVzdHJveSgpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgKTtcbiAgICAgICAgfSxcblxuICAgICAgICAvKipcbiAgICAgICAgICogQHBhcmFtIHtPYmplY3R9IHBhcmFtc1xuICAgICAgICAgKiBAcGFyYW0ge1Njb3BlfSBbcGFyYW1zLnNjb3BlXVxuICAgICAgICAgKiBAcGFyYW0ge2pxTGl0ZX0gW3BhcmFtcy5lbGVtZW50XVxuICAgICAgICAgKiBAcGFyYW0ge0FycmF5fSBbcGFyYW1zLmVsZW1lbnRzXVxuICAgICAgICAgKiBAcGFyYW0ge0F0dHJpYnV0ZXN9IFtwYXJhbXMuYXR0cnNdXG4gICAgICAgICAqL1xuICAgICAgICBjbGVhckNvbXBvbmVudDogZnVuY3Rpb24ocGFyYW1zKSB7XG4gICAgICAgICAgaWYgKHBhcmFtcy5zY29wZSkge1xuICAgICAgICAgICAgQ29tcG9uZW50Q2xlYW5lci5kZXN0cm95U2NvcGUocGFyYW1zLnNjb3BlKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBpZiAocGFyYW1zLmF0dHJzKSB7XG4gICAgICAgICAgICBDb21wb25lbnRDbGVhbmVyLmRlc3Ryb3lBdHRyaWJ1dGVzKHBhcmFtcy5hdHRycyk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgaWYgKHBhcmFtcy5lbGVtZW50KSB7XG4gICAgICAgICAgICBDb21wb25lbnRDbGVhbmVyLmRlc3Ryb3lFbGVtZW50KHBhcmFtcy5lbGVtZW50KTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBpZiAocGFyYW1zLmVsZW1lbnRzKSB7XG4gICAgICAgICAgICBwYXJhbXMuZWxlbWVudHMuZm9yRWFjaChmdW5jdGlvbihlbGVtZW50KSB7XG4gICAgICAgICAgICAgIENvbXBvbmVudENsZWFuZXIuZGVzdHJveUVsZW1lbnQoZWxlbWVudCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9XG4gICAgICAgIH0sXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIEBwYXJhbSB7anFMaXRlfSBlbGVtZW50XG4gICAgICAgICAqIEBwYXJhbSB7U3RyaW5nfSBuYW1lXG4gICAgICAgICAqL1xuICAgICAgICBmaW5kRWxlbWVudGVPYmplY3Q6IGZ1bmN0aW9uKGVsZW1lbnQsIG5hbWUpIHtcbiAgICAgICAgICByZXR1cm4gZWxlbWVudC5pbmhlcml0ZWREYXRhKG5hbWUpO1xuICAgICAgICB9LFxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAcGFyYW0ge1N0cmluZ30gcGFnZVxuICAgICAgICAgKiBAcmV0dXJuIHtQcm9taXNlfVxuICAgICAgICAgKi9cbiAgICAgICAgZ2V0UGFnZUhUTUxBc3luYzogZnVuY3Rpb24ocGFnZSkge1xuICAgICAgICAgIHZhciBjYWNoZSA9ICR0ZW1wbGF0ZUNhY2hlLmdldChwYWdlKTtcblxuICAgICAgICAgIGlmIChjYWNoZSkge1xuICAgICAgICAgICAgdmFyIGRlZmVycmVkID0gJHEuZGVmZXIoKTtcblxuICAgICAgICAgICAgdmFyIGh0bWwgPSB0eXBlb2YgY2FjaGUgPT09ICdzdHJpbmcnID8gY2FjaGUgOiBjYWNoZVsxXTtcbiAgICAgICAgICAgIGRlZmVycmVkLnJlc29sdmUodGhpcy5ub3JtYWxpemVQYWdlSFRNTChodG1sKSk7XG5cbiAgICAgICAgICAgIHJldHVybiBkZWZlcnJlZC5wcm9taXNlO1xuXG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiAkaHR0cCh7XG4gICAgICAgICAgICAgIHVybDogcGFnZSxcbiAgICAgICAgICAgICAgbWV0aG9kOiAnR0VUJ1xuICAgICAgICAgICAgfSkudGhlbihmdW5jdGlvbihyZXNwb25zZSkge1xuICAgICAgICAgICAgICB2YXIgaHRtbCA9IHJlc3BvbnNlLmRhdGE7XG5cbiAgICAgICAgICAgICAgcmV0dXJuIHRoaXMubm9ybWFsaXplUGFnZUhUTUwoaHRtbCk7XG4gICAgICAgICAgICB9LmJpbmQodGhpcykpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSxcblxuICAgICAgICAvKipcbiAgICAgICAgICogQHBhcmFtIHtTdHJpbmd9IGh0bWxcbiAgICAgICAgICogQHJldHVybiB7U3RyaW5nfVxuICAgICAgICAgKi9cbiAgICAgICAgbm9ybWFsaXplUGFnZUhUTUw6IGZ1bmN0aW9uKGh0bWwpIHtcbiAgICAgICAgICBodG1sID0gKCcnICsgaHRtbCkudHJpbSgpO1xuXG4gICAgICAgICAgaWYgKCFodG1sLm1hdGNoKC9ePG9ucy1wYWdlLykpIHtcbiAgICAgICAgICAgIGh0bWwgPSAnPG9ucy1wYWdlIF9tdXRlZD4nICsgaHRtbCArICc8L29ucy1wYWdlPic7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgcmV0dXJuIGh0bWw7XG4gICAgICAgIH0sXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIENyZWF0ZSBtb2RpZmllciB0ZW1wbGF0ZXIgZnVuY3Rpb24uIFRoZSBtb2RpZmllciB0ZW1wbGF0ZXIgZ2VuZXJhdGUgY3NzIGNsYXNzZXMgYm91bmQgbW9kaWZpZXIgbmFtZS5cbiAgICAgICAgICpcbiAgICAgICAgICogQHBhcmFtIHtPYmplY3R9IGF0dHJzXG4gICAgICAgICAqIEBwYXJhbSB7QXJyYXl9IFttb2RpZmllcnNdIGFuIGFycmF5IG9mIGFwcGVuZGl4IG1vZGlmaWVyXG4gICAgICAgICAqIEByZXR1cm4ge0Z1bmN0aW9ufVxuICAgICAgICAgKi9cbiAgICAgICAgZ2VuZXJhdGVNb2RpZmllclRlbXBsYXRlcjogZnVuY3Rpb24oYXR0cnMsIG1vZGlmaWVycykge1xuICAgICAgICAgIHZhciBhdHRyTW9kaWZpZXJzID0gYXR0cnMgJiYgdHlwZW9mIGF0dHJzLm1vZGlmaWVyID09PSAnc3RyaW5nJyA/IGF0dHJzLm1vZGlmaWVyLnRyaW0oKS5zcGxpdCgvICsvKSA6IFtdO1xuICAgICAgICAgIG1vZGlmaWVycyA9IGFuZ3VsYXIuaXNBcnJheShtb2RpZmllcnMpID8gYXR0ck1vZGlmaWVycy5jb25jYXQobW9kaWZpZXJzKSA6IGF0dHJNb2RpZmllcnM7XG5cbiAgICAgICAgICAvKipcbiAgICAgICAgICAgKiBAcmV0dXJuIHtTdHJpbmd9IHRlbXBsYXRlIGVnLiAnb25zLWJ1dHRvbi0tKicsICdvbnMtYnV0dG9uLS0qX19pdGVtJ1xuICAgICAgICAgICAqIEByZXR1cm4ge1N0cmluZ31cbiAgICAgICAgICAgKi9cbiAgICAgICAgICByZXR1cm4gZnVuY3Rpb24odGVtcGxhdGUpIHtcbiAgICAgICAgICAgIHJldHVybiBtb2RpZmllcnMubWFwKGZ1bmN0aW9uKG1vZGlmaWVyKSB7XG4gICAgICAgICAgICAgIHJldHVybiB0ZW1wbGF0ZS5yZXBsYWNlKCcqJywgbW9kaWZpZXIpO1xuICAgICAgICAgICAgfSkuam9pbignICcpO1xuICAgICAgICAgIH07XG4gICAgICAgIH0sXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIEFkZCBtb2RpZmllciBtZXRob2RzIHRvIHZpZXcgb2JqZWN0IGZvciBjdXN0b20gZWxlbWVudHMuXG4gICAgICAgICAqXG4gICAgICAgICAqIEBwYXJhbSB7T2JqZWN0fSB2aWV3IG9iamVjdFxuICAgICAgICAgKiBAcGFyYW0ge2pxTGl0ZX0gZWxlbWVudFxuICAgICAgICAgKi9cbiAgICAgICAgYWRkTW9kaWZpZXJNZXRob2RzRm9yQ3VzdG9tRWxlbWVudHM6IGZ1bmN0aW9uKHZpZXcsIGVsZW1lbnQpIHtcbiAgICAgICAgICB2YXIgbWV0aG9kcyA9IHtcbiAgICAgICAgICAgIGhhc01vZGlmaWVyOiBmdW5jdGlvbihuZWVkbGUpIHtcbiAgICAgICAgICAgICAgdmFyIHRva2VucyA9IE1vZGlmaWVyVXRpbC5zcGxpdChlbGVtZW50LmF0dHIoJ21vZGlmaWVyJykpO1xuICAgICAgICAgICAgICBuZWVkbGUgPSB0eXBlb2YgbmVlZGxlID09PSAnc3RyaW5nJyA/IG5lZWRsZS50cmltKCkgOiAnJztcblxuICAgICAgICAgICAgICByZXR1cm4gTW9kaWZpZXJVdGlsLnNwbGl0KG5lZWRsZSkuc29tZShmdW5jdGlvbihuZWVkbGUpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdG9rZW5zLmluZGV4T2YobmVlZGxlKSAhPSAtMTtcbiAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9LFxuXG4gICAgICAgICAgICByZW1vdmVNb2RpZmllcjogZnVuY3Rpb24obmVlZGxlKSB7XG4gICAgICAgICAgICAgIG5lZWRsZSA9IHR5cGVvZiBuZWVkbGUgPT09ICdzdHJpbmcnID8gbmVlZGxlLnRyaW0oKSA6ICcnO1xuXG4gICAgICAgICAgICAgIHZhciBtb2RpZmllciA9IE1vZGlmaWVyVXRpbC5zcGxpdChlbGVtZW50LmF0dHIoJ21vZGlmaWVyJykpLmZpbHRlcihmdW5jdGlvbih0b2tlbikge1xuICAgICAgICAgICAgICAgIHJldHVybiB0b2tlbiAhPT0gbmVlZGxlO1xuICAgICAgICAgICAgICB9KS5qb2luKCcgJyk7XG5cbiAgICAgICAgICAgICAgZWxlbWVudC5hdHRyKCdtb2RpZmllcicsIG1vZGlmaWVyKTtcbiAgICAgICAgICAgIH0sXG5cbiAgICAgICAgICAgIGFkZE1vZGlmaWVyOiBmdW5jdGlvbihtb2RpZmllcikge1xuICAgICAgICAgICAgICBlbGVtZW50LmF0dHIoJ21vZGlmaWVyJywgZWxlbWVudC5hdHRyKCdtb2RpZmllcicpICsgJyAnICsgbW9kaWZpZXIpO1xuICAgICAgICAgICAgfSxcblxuICAgICAgICAgICAgc2V0TW9kaWZpZXI6IGZ1bmN0aW9uKG1vZGlmaWVyKSB7XG4gICAgICAgICAgICAgIGVsZW1lbnQuYXR0cignbW9kaWZpZXInLCBtb2RpZmllcik7XG4gICAgICAgICAgICB9LFxuXG4gICAgICAgICAgICB0b2dnbGVNb2RpZmllcjogZnVuY3Rpb24obW9kaWZpZXIpIHtcbiAgICAgICAgICAgICAgaWYgKHRoaXMuaGFzTW9kaWZpZXIobW9kaWZpZXIpKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5yZW1vdmVNb2RpZmllcihtb2RpZmllcik7XG4gICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5hZGRNb2RpZmllcihtb2RpZmllcik7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9O1xuXG4gICAgICAgICAgZm9yICh2YXIgbWV0aG9kIGluIG1ldGhvZHMpIHtcbiAgICAgICAgICAgIGlmIChtZXRob2RzLmhhc093blByb3BlcnR5KG1ldGhvZCkpIHtcbiAgICAgICAgICAgICAgdmlld1ttZXRob2RdID0gbWV0aG9kc1ttZXRob2RdO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfSxcblxuICAgICAgICAvKipcbiAgICAgICAgICogQWRkIG1vZGlmaWVyIG1ldGhvZHMgdG8gdmlldyBvYmplY3QuXG4gICAgICAgICAqXG4gICAgICAgICAqIEBwYXJhbSB7T2JqZWN0fSB2aWV3IG9iamVjdFxuICAgICAgICAgKiBAcGFyYW0ge1N0cmluZ30gdGVtcGxhdGVcbiAgICAgICAgICogQHBhcmFtIHtqcUxpdGV9IGVsZW1lbnRcbiAgICAgICAgICovXG4gICAgICAgIGFkZE1vZGlmaWVyTWV0aG9kczogZnVuY3Rpb24odmlldywgdGVtcGxhdGUsIGVsZW1lbnQpIHtcbiAgICAgICAgICB2YXIgX3RyID0gZnVuY3Rpb24obW9kaWZpZXIpIHtcbiAgICAgICAgICAgIHJldHVybiB0ZW1wbGF0ZS5yZXBsYWNlKCcqJywgbW9kaWZpZXIpO1xuICAgICAgICAgIH07XG5cbiAgICAgICAgICB2YXIgZm5zID0ge1xuICAgICAgICAgICAgaGFzTW9kaWZpZXI6IGZ1bmN0aW9uKG1vZGlmaWVyKSB7XG4gICAgICAgICAgICAgIHJldHVybiBlbGVtZW50Lmhhc0NsYXNzKF90cihtb2RpZmllcikpO1xuICAgICAgICAgICAgfSxcblxuICAgICAgICAgICAgcmVtb3ZlTW9kaWZpZXI6IGZ1bmN0aW9uKG1vZGlmaWVyKSB7XG4gICAgICAgICAgICAgIGVsZW1lbnQucmVtb3ZlQ2xhc3MoX3RyKG1vZGlmaWVyKSk7XG4gICAgICAgICAgICB9LFxuXG4gICAgICAgICAgICBhZGRNb2RpZmllcjogZnVuY3Rpb24obW9kaWZpZXIpIHtcbiAgICAgICAgICAgICAgZWxlbWVudC5hZGRDbGFzcyhfdHIobW9kaWZpZXIpKTtcbiAgICAgICAgICAgIH0sXG5cbiAgICAgICAgICAgIHNldE1vZGlmaWVyOiBmdW5jdGlvbihtb2RpZmllcikge1xuICAgICAgICAgICAgICB2YXIgY2xhc3NlcyA9IGVsZW1lbnQuYXR0cignY2xhc3MnKS5zcGxpdCgvXFxzKy8pLFxuICAgICAgICAgICAgICAgICAgcGF0dCA9IHRlbXBsYXRlLnJlcGxhY2UoJyonLCAnLicpO1xuXG4gICAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgY2xhc3Nlcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgIHZhciBjbHMgPSBjbGFzc2VzW2ldO1xuXG4gICAgICAgICAgICAgICAgaWYgKGNscy5tYXRjaChwYXR0KSkge1xuICAgICAgICAgICAgICAgICAgZWxlbWVudC5yZW1vdmVDbGFzcyhjbHMpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgIGVsZW1lbnQuYWRkQ2xhc3MoX3RyKG1vZGlmaWVyKSk7XG4gICAgICAgICAgICB9LFxuXG4gICAgICAgICAgICB0b2dnbGVNb2RpZmllcjogZnVuY3Rpb24obW9kaWZpZXIpIHtcbiAgICAgICAgICAgICAgdmFyIGNscyA9IF90cihtb2RpZmllcik7XG4gICAgICAgICAgICAgIGlmIChlbGVtZW50Lmhhc0NsYXNzKGNscykpIHtcbiAgICAgICAgICAgICAgICBlbGVtZW50LnJlbW92ZUNsYXNzKGNscyk7XG4gICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgZWxlbWVudC5hZGRDbGFzcyhjbHMpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfTtcblxuICAgICAgICAgIHZhciBhcHBlbmQgPSBmdW5jdGlvbihvbGRGbiwgbmV3Rm4pIHtcbiAgICAgICAgICAgIGlmICh0eXBlb2Ygb2xkRm4gIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICAgIHJldHVybiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gb2xkRm4uYXBwbHkobnVsbCwgYXJndW1lbnRzKSB8fCBuZXdGbi5hcHBseShudWxsLCBhcmd1bWVudHMpO1xuICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgcmV0dXJuIG5ld0ZuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH07XG5cbiAgICAgICAgICB2aWV3Lmhhc01vZGlmaWVyID0gYXBwZW5kKHZpZXcuaGFzTW9kaWZpZXIsIGZucy5oYXNNb2RpZmllcik7XG4gICAgICAgICAgdmlldy5yZW1vdmVNb2RpZmllciA9IGFwcGVuZCh2aWV3LnJlbW92ZU1vZGlmaWVyLCBmbnMucmVtb3ZlTW9kaWZpZXIpO1xuICAgICAgICAgIHZpZXcuYWRkTW9kaWZpZXIgPSBhcHBlbmQodmlldy5hZGRNb2RpZmllciwgZm5zLmFkZE1vZGlmaWVyKTtcbiAgICAgICAgICB2aWV3LnNldE1vZGlmaWVyID0gYXBwZW5kKHZpZXcuc2V0TW9kaWZpZXIsIGZucy5zZXRNb2RpZmllcik7XG4gICAgICAgICAgdmlldy50b2dnbGVNb2RpZmllciA9IGFwcGVuZCh2aWV3LnRvZ2dsZU1vZGlmaWVyLCBmbnMudG9nZ2xlTW9kaWZpZXIpO1xuICAgICAgICB9LFxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBSZW1vdmUgbW9kaWZpZXIgbWV0aG9kcy5cbiAgICAgICAgICpcbiAgICAgICAgICogQHBhcmFtIHtPYmplY3R9IHZpZXcgb2JqZWN0XG4gICAgICAgICAqL1xuICAgICAgICByZW1vdmVNb2RpZmllck1ldGhvZHM6IGZ1bmN0aW9uKHZpZXcpIHtcbiAgICAgICAgICB2aWV3Lmhhc01vZGlmaWVyID0gdmlldy5yZW1vdmVNb2RpZmllciA9XG4gICAgICAgICAgICB2aWV3LmFkZE1vZGlmaWVyID0gdmlldy5zZXRNb2RpZmllciA9XG4gICAgICAgICAgICB2aWV3LnRvZ2dsZU1vZGlmaWVyID0gdW5kZWZpbmVkO1xuICAgICAgICB9LFxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBEZWZpbmUgYSB2YXJpYWJsZSB0byBKYXZhU2NyaXB0IGdsb2JhbCBzY29wZSBhbmQgQW5ndWxhckpTIHNjb3BlIGFzICd2YXInIGF0dHJpYnV0ZSBuYW1lLlxuICAgICAgICAgKlxuICAgICAgICAgKiBAcGFyYW0ge09iamVjdH0gYXR0cnNcbiAgICAgICAgICogQHBhcmFtIG9iamVjdFxuICAgICAgICAgKi9cbiAgICAgICAgZGVjbGFyZVZhckF0dHJpYnV0ZTogZnVuY3Rpb24oYXR0cnMsIG9iamVjdCkge1xuICAgICAgICAgIGlmICh0eXBlb2YgYXR0cnMudmFyID09PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgdmFyIHZhck5hbWUgPSBhdHRycy52YXI7XG4gICAgICAgICAgICB0aGlzLl9kZWZpbmVWYXIodmFyTmFtZSwgb2JqZWN0KTtcbiAgICAgICAgICB9XG4gICAgICAgIH0sXG5cbiAgICAgICAgX3JlZ2lzdGVyRXZlbnRIYW5kbGVyOiBmdW5jdGlvbihjb21wb25lbnQsIGV2ZW50TmFtZSkge1xuICAgICAgICAgIHZhciBjYXBpdGFsaXplZEV2ZW50TmFtZSA9IGV2ZW50TmFtZS5jaGFyQXQoMCkudG9VcHBlckNhc2UoKSArIGV2ZW50TmFtZS5zbGljZSgxKTtcblxuICAgICAgICAgIGNvbXBvbmVudC5vbihldmVudE5hbWUsIGZ1bmN0aW9uKGV2ZW50KSB7XG4gICAgICAgICAgICAkb25zZW4uZmlyZUNvbXBvbmVudEV2ZW50KGNvbXBvbmVudC5fZWxlbWVudFswXSwgZXZlbnROYW1lLCBldmVudCAmJiBldmVudC5kZXRhaWwpO1xuXG4gICAgICAgICAgICB2YXIgaGFuZGxlciA9IGNvbXBvbmVudC5fYXR0cnNbJ29ucycgKyBjYXBpdGFsaXplZEV2ZW50TmFtZV07XG4gICAgICAgICAgICBpZiAoaGFuZGxlcikge1xuICAgICAgICAgICAgICBjb21wb25lbnQuX3Njb3BlLiRldmFsKGhhbmRsZXIsIHskZXZlbnQ6IGV2ZW50fSk7XG4gICAgICAgICAgICAgIGNvbXBvbmVudC5fc2NvcGUuJGV2YWxBc3luYygpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pO1xuICAgICAgICB9LFxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBSZWdpc3RlciBldmVudCBoYW5kbGVycyBmb3IgYXR0cmlidXRlcy5cbiAgICAgICAgICpcbiAgICAgICAgICogQHBhcmFtIHtPYmplY3R9IGNvbXBvbmVudFxuICAgICAgICAgKiBAcGFyYW0ge1N0cmluZ30gZXZlbnROYW1lc1xuICAgICAgICAgKi9cbiAgICAgICAgcmVnaXN0ZXJFdmVudEhhbmRsZXJzOiBmdW5jdGlvbihjb21wb25lbnQsIGV2ZW50TmFtZXMpIHtcbiAgICAgICAgICBldmVudE5hbWVzID0gZXZlbnROYW1lcy50cmltKCkuc3BsaXQoL1xccysvKTtcblxuICAgICAgICAgIGZvciAodmFyIGkgPSAwLCBsID0gZXZlbnROYW1lcy5sZW5ndGg7IGkgPCBsOyBpKyspIHtcbiAgICAgICAgICAgIHZhciBldmVudE5hbWUgPSBldmVudE5hbWVzW2ldO1xuICAgICAgICAgICAgdGhpcy5fcmVnaXN0ZXJFdmVudEhhbmRsZXIoY29tcG9uZW50LCBldmVudE5hbWUpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSxcblxuICAgICAgICAvKipcbiAgICAgICAgICogQHJldHVybiB7Qm9vbGVhbn1cbiAgICAgICAgICovXG4gICAgICAgIGlzQW5kcm9pZDogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgcmV0dXJuICEhJHdpbmRvdy5uYXZpZ2F0b3IudXNlckFnZW50Lm1hdGNoKC9hbmRyb2lkL2kpO1xuICAgICAgICB9LFxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAcmV0dXJuIHtCb29sZWFufVxuICAgICAgICAgKi9cbiAgICAgICAgaXNJT1M6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgIHJldHVybiAhISR3aW5kb3cubmF2aWdhdG9yLnVzZXJBZ2VudC5tYXRjaCgvKGlwYWR8aXBob25lfGlwb2QgdG91Y2gpL2kpO1xuICAgICAgICB9LFxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAcmV0dXJuIHtCb29sZWFufVxuICAgICAgICAgKi9cbiAgICAgICAgaXNXZWJWaWV3OiBmdW5jdGlvbigpIHtcbiAgICAgICAgICByZXR1cm4gJG9uc0dsb2JhbC5pc1dlYlZpZXcoKTtcbiAgICAgICAgfSxcblxuICAgICAgICAvKipcbiAgICAgICAgICogQHJldHVybiB7Qm9vbGVhbn1cbiAgICAgICAgICovXG4gICAgICAgIGlzSU9TN2Fib3ZlOiAoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgdmFyIHVhID0gJHdpbmRvdy5uYXZpZ2F0b3IudXNlckFnZW50O1xuICAgICAgICAgIHZhciBtYXRjaCA9IHVhLm1hdGNoKC8oaVBhZHxpUGhvbmV8aVBvZCB0b3VjaCk7LipDUFUuKk9TIChcXGQrKV8oXFxkKykvaSk7XG5cbiAgICAgICAgICB2YXIgcmVzdWx0ID0gbWF0Y2ggPyBwYXJzZUZsb2F0KG1hdGNoWzJdICsgJy4nICsgbWF0Y2hbM10pID49IDcgOiBmYWxzZTtcblxuICAgICAgICAgIHJldHVybiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgICAgICAgfTtcbiAgICAgICAgfSkoKSxcblxuICAgICAgICAvKipcbiAgICAgICAgICogRmlyZSBhIG5hbWVkIGV2ZW50IGZvciBhIGNvbXBvbmVudC4gVGhlIHZpZXcgb2JqZWN0LCBpZiBpdCBleGlzdHMsIGlzIGF0dGFjaGVkIHRvIGV2ZW50LmNvbXBvbmVudC5cbiAgICAgICAgICpcbiAgICAgICAgICogQHBhcmFtIHtIVE1MRWxlbWVudH0gW2RvbV1cbiAgICAgICAgICogQHBhcmFtIHtTdHJpbmd9IGV2ZW50IG5hbWVcbiAgICAgICAgICovXG4gICAgICAgIGZpcmVDb21wb25lbnRFdmVudDogZnVuY3Rpb24oZG9tLCBldmVudE5hbWUsIGRhdGEpIHtcbiAgICAgICAgICBkYXRhID0gZGF0YSB8fCB7fTtcblxuICAgICAgICAgIHZhciBldmVudCA9IGRvY3VtZW50LmNyZWF0ZUV2ZW50KCdIVE1MRXZlbnRzJyk7XG5cbiAgICAgICAgICBmb3IgKHZhciBrZXkgaW4gZGF0YSkge1xuICAgICAgICAgICAgaWYgKGRhdGEuaGFzT3duUHJvcGVydHkoa2V5KSkge1xuICAgICAgICAgICAgICBldmVudFtrZXldID0gZGF0YVtrZXldO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cblxuICAgICAgICAgIGV2ZW50LmNvbXBvbmVudCA9IGRvbSA/XG4gICAgICAgICAgICBhbmd1bGFyLmVsZW1lbnQoZG9tKS5kYXRhKGRvbS5ub2RlTmFtZS50b0xvd2VyQ2FzZSgpKSB8fCBudWxsIDogbnVsbDtcbiAgICAgICAgICBldmVudC5pbml0RXZlbnQoZG9tLm5vZGVOYW1lLnRvTG93ZXJDYXNlKCkgKyAnOicgKyBldmVudE5hbWUsIHRydWUsIHRydWUpO1xuXG4gICAgICAgICAgZG9tLmRpc3BhdGNoRXZlbnQoZXZlbnQpO1xuICAgICAgICB9LFxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBEZWZpbmUgYSB2YXJpYWJsZSB0byBKYXZhU2NyaXB0IGdsb2JhbCBzY29wZSBhbmQgQW5ndWxhckpTIHNjb3BlLlxuICAgICAgICAgKlxuICAgICAgICAgKiBVdGlsLmRlZmluZVZhcignZm9vJywgJ2Zvby12YWx1ZScpO1xuICAgICAgICAgKiAvLyA9PiB3aW5kb3cuZm9vIGFuZCAkc2NvcGUuZm9vIGlzIG5vdyAnZm9vLXZhbHVlJ1xuICAgICAgICAgKlxuICAgICAgICAgKiBVdGlsLmRlZmluZVZhcignZm9vLmJhcicsICdmb28tYmFyLXZhbHVlJyk7XG4gICAgICAgICAqIC8vID0+IHdpbmRvdy5mb28uYmFyIGFuZCAkc2NvcGUuZm9vLmJhciBpcyBub3cgJ2Zvby1iYXItdmFsdWUnXG4gICAgICAgICAqXG4gICAgICAgICAqIEBwYXJhbSB7U3RyaW5nfSBuYW1lXG4gICAgICAgICAqIEBwYXJhbSBvYmplY3RcbiAgICAgICAgICovXG4gICAgICAgIF9kZWZpbmVWYXI6IGZ1bmN0aW9uKG5hbWUsIG9iamVjdCkge1xuICAgICAgICAgIHZhciBuYW1lcyA9IG5hbWUuc3BsaXQoL1xcLi8pO1xuXG4gICAgICAgICAgZnVuY3Rpb24gc2V0KGNvbnRhaW5lciwgbmFtZXMsIG9iamVjdCkge1xuICAgICAgICAgICAgdmFyIG5hbWU7XG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IG5hbWVzLmxlbmd0aCAtIDE7IGkrKykge1xuICAgICAgICAgICAgICBuYW1lID0gbmFtZXNbaV07XG4gICAgICAgICAgICAgIGlmIChjb250YWluZXJbbmFtZV0gPT09IHVuZGVmaW5lZCB8fCBjb250YWluZXJbbmFtZV0gPT09IG51bGwpIHtcbiAgICAgICAgICAgICAgICBjb250YWluZXJbbmFtZV0gPSB7fTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICBjb250YWluZXIgPSBjb250YWluZXJbbmFtZV07XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGNvbnRhaW5lcltuYW1lc1tuYW1lcy5sZW5ndGggLSAxXV0gPSBvYmplY3Q7XG5cbiAgICAgICAgICAgIGlmIChjb250YWluZXJbbmFtZXNbbmFtZXMubGVuZ3RoIC0gMV1dICE9PSBvYmplY3QpIHtcbiAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdDYW5ub3Qgc2V0IHZhcj1cIicgKyBvYmplY3QuX2F0dHJzLnZhciArICdcIiBiZWNhdXNlIGl0IHdpbGwgb3ZlcndyaXRlIGEgcmVhZC1vbmx5IHZhcmlhYmxlLicpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cblxuICAgICAgICAgIGlmIChvbnMuY29tcG9uZW50QmFzZSkge1xuICAgICAgICAgICAgc2V0KG9ucy5jb21wb25lbnRCYXNlLCBuYW1lcywgb2JqZWN0KTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICAvLyBBdHRhY2ggdG8gYW5jZXN0b3Igd2l0aCBvbnMtc2NvcGUgYXR0cmlidXRlLlxuICAgICAgICAgIHZhciBlbGVtZW50ID0gb2JqZWN0Ll9lbGVtZW50WzBdO1xuXG4gICAgICAgICAgd2hpbGUgKGVsZW1lbnQucGFyZW50Tm9kZSkge1xuICAgICAgICAgICAgaWYgKGVsZW1lbnQuaGFzQXR0cmlidXRlKCdvbnMtc2NvcGUnKSkge1xuICAgICAgICAgICAgICBzZXQoYW5ndWxhci5lbGVtZW50KGVsZW1lbnQpLmRhdGEoJ19zY29wZScpLCBuYW1lcywgb2JqZWN0KTtcbiAgICAgICAgICAgICAgZWxlbWVudCA9IG51bGw7XG4gICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgZWxlbWVudCA9IGVsZW1lbnQucGFyZW50Tm9kZTtcbiAgICAgICAgICB9XG4gICAgICAgICAgZWxlbWVudCA9IG51bGw7XG5cbiAgICAgICAgICAvLyBJZiBubyBvbnMtc2NvcGUgZWxlbWVudCB3YXMgZm91bmQsIGF0dGFjaCB0byAkcm9vdFNjb3BlLlxuICAgICAgICAgIHNldCgkcm9vdFNjb3BlLCBuYW1lcywgb2JqZWN0KTtcbiAgICAgICAgfVxuICAgICAgfTtcbiAgICB9XG5cbiAgfSk7XG59KSgpO1xuIiwiLypcbkNvcHlyaWdodCAyMDEzLTIwMTUgQVNJQUwgQ09SUE9SQVRJT05cblxuTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbnlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbllvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuXG4gICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcblxuVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG5TZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG5saW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cblxuKi9cblxuKGZ1bmN0aW9uKCl7XG4gICd1c2Ugc3RyaWN0JztcblxuICB2YXIgbW9kdWxlID0gYW5ndWxhci5tb2R1bGUoJ29uc2VuJyk7XG5cbiAgdmFyIENvbXBvbmVudENsZWFuZXIgPSB7XG4gICAgLyoqXG4gICAgICogQHBhcmFtIHtqcUxpdGV9IGVsZW1lbnRcbiAgICAgKi9cbiAgICBkZWNvbXBvc2VOb2RlOiBmdW5jdGlvbihlbGVtZW50KSB7XG4gICAgICB2YXIgY2hpbGRyZW4gPSBlbGVtZW50LnJlbW92ZSgpLmNoaWxkcmVuKCk7XG4gICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGNoaWxkcmVuLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIENvbXBvbmVudENsZWFuZXIuZGVjb21wb3NlTm9kZShhbmd1bGFyLmVsZW1lbnQoY2hpbGRyZW5baV0pKTtcbiAgICAgIH1cbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogQHBhcmFtIHtBdHRyaWJ1dGVzfSBhdHRyc1xuICAgICAqL1xuICAgIGRlc3Ryb3lBdHRyaWJ1dGVzOiBmdW5jdGlvbihhdHRycykge1xuICAgICAgYXR0cnMuJCRlbGVtZW50ID0gbnVsbDtcbiAgICAgIGF0dHJzLiQkb2JzZXJ2ZXJzID0gbnVsbDtcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogQHBhcmFtIHtqcUxpdGV9IGVsZW1lbnRcbiAgICAgKi9cbiAgICBkZXN0cm95RWxlbWVudDogZnVuY3Rpb24oZWxlbWVudCkge1xuICAgICAgZWxlbWVudC5yZW1vdmUoKTtcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogQHBhcmFtIHtTY29wZX0gc2NvcGVcbiAgICAgKi9cbiAgICBkZXN0cm95U2NvcGU6IGZ1bmN0aW9uKHNjb3BlKSB7XG4gICAgICBzY29wZS4kJGxpc3RlbmVycyA9IHt9O1xuICAgICAgc2NvcGUuJCR3YXRjaGVycyA9IG51bGw7XG4gICAgICBzY29wZSA9IG51bGw7XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIEBwYXJhbSB7U2NvcGV9IHNjb3BlXG4gICAgICogQHBhcmFtIHtGdW5jdGlvbn0gZm5cbiAgICAgKi9cbiAgICBvbkRlc3Ryb3k6IGZ1bmN0aW9uKHNjb3BlLCBmbikge1xuICAgICAgdmFyIGNsZWFyID0gc2NvcGUuJG9uKCckZGVzdHJveScsIGZ1bmN0aW9uKCkge1xuICAgICAgICBjbGVhcigpO1xuICAgICAgICBmbi5hcHBseShudWxsLCBhcmd1bWVudHMpO1xuICAgICAgfSk7XG4gICAgfVxuICB9O1xuXG4gIG1vZHVsZS5mYWN0b3J5KCdDb21wb25lbnRDbGVhbmVyJywgZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIENvbXBvbmVudENsZWFuZXI7XG4gIH0pO1xuXG4gIC8vIG92ZXJyaWRlIGJ1aWx0aW4gbmctKGV2ZW50bmFtZSkgZGlyZWN0aXZlc1xuICAoZnVuY3Rpb24oKSB7XG4gICAgdmFyIG5nRXZlbnREaXJlY3RpdmVzID0ge307XG4gICAgJ2NsaWNrIGRibGNsaWNrIG1vdXNlZG93biBtb3VzZXVwIG1vdXNlb3ZlciBtb3VzZW91dCBtb3VzZW1vdmUgbW91c2VlbnRlciBtb3VzZWxlYXZlIGtleWRvd24ga2V5dXAga2V5cHJlc3Mgc3VibWl0IGZvY3VzIGJsdXIgY29weSBjdXQgcGFzdGUnLnNwbGl0KCcgJykuZm9yRWFjaChcbiAgICAgIGZ1bmN0aW9uKG5hbWUpIHtcbiAgICAgICAgdmFyIGRpcmVjdGl2ZU5hbWUgPSBkaXJlY3RpdmVOb3JtYWxpemUoJ25nLScgKyBuYW1lKTtcbiAgICAgICAgbmdFdmVudERpcmVjdGl2ZXNbZGlyZWN0aXZlTmFtZV0gPSBbJyRwYXJzZScsIGZ1bmN0aW9uKCRwYXJzZSkge1xuICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBjb21waWxlOiBmdW5jdGlvbigkZWxlbWVudCwgYXR0cikge1xuICAgICAgICAgICAgICB2YXIgZm4gPSAkcGFyc2UoYXR0cltkaXJlY3RpdmVOYW1lXSk7XG4gICAgICAgICAgICAgIHJldHVybiBmdW5jdGlvbihzY29wZSwgZWxlbWVudCwgYXR0cikge1xuICAgICAgICAgICAgICAgIHZhciBsaXN0ZW5lciA9IGZ1bmN0aW9uKGV2ZW50KSB7XG4gICAgICAgICAgICAgICAgICBzY29wZS4kYXBwbHkoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgICAgIGZuKHNjb3BlLCB7JGV2ZW50OiBldmVudH0pO1xuICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICBlbGVtZW50Lm9uKG5hbWUsIGxpc3RlbmVyKTtcblxuICAgICAgICAgICAgICAgIENvbXBvbmVudENsZWFuZXIub25EZXN0cm95KHNjb3BlLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAgIGVsZW1lbnQub2ZmKG5hbWUsIGxpc3RlbmVyKTtcbiAgICAgICAgICAgICAgICAgIGVsZW1lbnQgPSBudWxsO1xuXG4gICAgICAgICAgICAgICAgICBDb21wb25lbnRDbGVhbmVyLmRlc3Ryb3lTY29wZShzY29wZSk7XG4gICAgICAgICAgICAgICAgICBzY29wZSA9IG51bGw7XG5cbiAgICAgICAgICAgICAgICAgIENvbXBvbmVudENsZWFuZXIuZGVzdHJveUF0dHJpYnV0ZXMoYXR0cik7XG4gICAgICAgICAgICAgICAgICBhdHRyID0gbnVsbDtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9O1xuICAgICAgICB9XTtcblxuICAgICAgICBmdW5jdGlvbiBkaXJlY3RpdmVOb3JtYWxpemUobmFtZSkge1xuICAgICAgICAgIHJldHVybiBuYW1lLnJlcGxhY2UoLy0oW2Etel0pL2csIGZ1bmN0aW9uKG1hdGNoZXMpIHtcbiAgICAgICAgICAgIHJldHVybiBtYXRjaGVzWzFdLnRvVXBwZXJDYXNlKCk7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICApO1xuICAgIG1vZHVsZS5jb25maWcoZnVuY3Rpb24oJHByb3ZpZGUpIHtcbiAgICAgIHZhciBzaGlmdCA9IGZ1bmN0aW9uKCRkZWxlZ2F0ZSkge1xuICAgICAgICAkZGVsZWdhdGUuc2hpZnQoKTtcbiAgICAgICAgcmV0dXJuICRkZWxlZ2F0ZTtcbiAgICAgIH07XG4gICAgICBPYmplY3Qua2V5cyhuZ0V2ZW50RGlyZWN0aXZlcykuZm9yRWFjaChmdW5jdGlvbihkaXJlY3RpdmVOYW1lKSB7XG4gICAgICAgICRwcm92aWRlLmRlY29yYXRvcihkaXJlY3RpdmVOYW1lICsgJ0RpcmVjdGl2ZScsIFsnJGRlbGVnYXRlJywgc2hpZnRdKTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICAgIE9iamVjdC5rZXlzKG5nRXZlbnREaXJlY3RpdmVzKS5mb3JFYWNoKGZ1bmN0aW9uKGRpcmVjdGl2ZU5hbWUpIHtcbiAgICAgIG1vZHVsZS5kaXJlY3RpdmUoZGlyZWN0aXZlTmFtZSwgbmdFdmVudERpcmVjdGl2ZXNbZGlyZWN0aXZlTmFtZV0pO1xuICAgIH0pO1xuICB9KSgpO1xufSkoKTtcbiIsIi8vIGNvbmZpcm0gdG8gdXNlIGpxTGl0ZVxuaWYgKHdpbmRvdy5qUXVlcnkgJiYgYW5ndWxhci5lbGVtZW50ID09PSB3aW5kb3cualF1ZXJ5KSB7XG4gIGNvbnNvbGUud2FybignT25zZW4gVUkgcmVxdWlyZSBqcUxpdGUuIExvYWQgalF1ZXJ5IGFmdGVyIGxvYWRpbmcgQW5ndWxhckpTIHRvIGZpeCB0aGlzIGVycm9yLiBqUXVlcnkgbWF5IGJyZWFrIE9uc2VuIFVJIGJlaGF2aW9yLicpOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLWNvbnNvbGVcbn1cbiIsIi8qXG5Db3B5cmlnaHQgMjAxMy0yMDE1IEFTSUFMIENPUlBPUkFUSU9OXG5cbkxpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG55b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG5Zb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcblxuICAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG5cblVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbmRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbldJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxubGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG5cbiovXG5cbk9iamVjdC5rZXlzKG9ucy5ub3RpZmljYXRpb24pLmZpbHRlcihuYW1lID0+ICEvXl8vLnRlc3QobmFtZSkpLmZvckVhY2gobmFtZSA9PiB7XG4gIGNvbnN0IG9yaWdpbmFsTm90aWZpY2F0aW9uID0gb25zLm5vdGlmaWNhdGlvbltuYW1lXTtcblxuICBvbnMubm90aWZpY2F0aW9uW25hbWVdID0gKG1lc3NhZ2UsIG9wdGlvbnMgPSB7fSkgPT4ge1xuICAgIHR5cGVvZiBtZXNzYWdlID09PSAnc3RyaW5nJyA/IChvcHRpb25zLm1lc3NhZ2UgPSBtZXNzYWdlKSA6IChvcHRpb25zID0gbWVzc2FnZSk7XG5cbiAgICBjb25zdCBjb21waWxlID0gb3B0aW9ucy5jb21waWxlO1xuICAgIGxldCAkZWxlbWVudDtcblxuICAgIG9wdGlvbnMuY29tcGlsZSA9IGVsZW1lbnQgPT4ge1xuICAgICAgJGVsZW1lbnQgPSBhbmd1bGFyLmVsZW1lbnQoY29tcGlsZSA/IGNvbXBpbGUoZWxlbWVudCkgOiBlbGVtZW50KTtcbiAgICAgIHJldHVybiBvbnMuJGNvbXBpbGUoJGVsZW1lbnQpKCRlbGVtZW50LmluamVjdG9yKCkuZ2V0KCckcm9vdFNjb3BlJykpO1xuICAgIH07XG5cbiAgICBvcHRpb25zLmRlc3Ryb3kgPSAoKSA9PiB7XG4gICAgICAkZWxlbWVudC5kYXRhKCdfc2NvcGUnKS4kZGVzdHJveSgpO1xuICAgICAgJGVsZW1lbnQgPSBudWxsO1xuICAgIH07XG5cbiAgICByZXR1cm4gb3JpZ2luYWxOb3RpZmljYXRpb24ob3B0aW9ucyk7XG4gIH07XG59KTtcbiIsIi8qXG5Db3B5cmlnaHQgMjAxMy0yMDE1IEFTSUFMIENPUlBPUkFUSU9OXG5cbkxpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG55b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG5Zb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcblxuICAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG5cblVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbmRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbldJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxubGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG5cbiovXG5cbihmdW5jdGlvbigpe1xuICAndXNlIHN0cmljdCc7XG5cbiAgYW5ndWxhci5tb2R1bGUoJ29uc2VuJykucnVuKGZ1bmN0aW9uKCR0ZW1wbGF0ZUNhY2hlKSB7XG4gICAgdmFyIHRlbXBsYXRlcyA9IHdpbmRvdy5kb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCdzY3JpcHRbdHlwZT1cInRleHQvb25zLXRlbXBsYXRlXCJdJyk7XG5cbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRlbXBsYXRlcy5sZW5ndGg7IGkrKykge1xuICAgICAgdmFyIHRlbXBsYXRlID0gYW5ndWxhci5lbGVtZW50KHRlbXBsYXRlc1tpXSk7XG4gICAgICB2YXIgaWQgPSB0ZW1wbGF0ZS5hdHRyKCdpZCcpO1xuICAgICAgaWYgKHR5cGVvZiBpZCA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgJHRlbXBsYXRlQ2FjaGUucHV0KGlkLCB0ZW1wbGF0ZS50ZXh0KCkpO1xuICAgICAgfVxuICAgIH1cbiAgfSk7XG5cbn0pKCk7XG4iXSwibmFtZXMiOlsiZm5UZXN0IiwidGVzdCIsIkJhc2VDbGFzcyIsImV4dGVuZCIsInByb3BzIiwiX3N1cGVyIiwicHJvdG90eXBlIiwicHJvdG8iLCJPYmplY3QiLCJjcmVhdGUiLCJuYW1lIiwiZm4iLCJ0bXAiLCJyZXQiLCJhcHBseSIsImFyZ3VtZW50cyIsIm5ld0NsYXNzIiwiaW5pdCIsImhhc093blByb3BlcnR5IiwiU3ViQ2xhc3MiLCJFbXB0eUNsYXNzIiwiY29uc3RydWN0b3IiLCJDbGFzcyIsIm9ucyIsIm1vZHVsZSIsImFuZ3VsYXIiLCJ3YWl0T25zZW5VSUxvYWQiLCJ1bmxvY2tPbnNlblVJIiwiX3JlYWR5TG9jayIsImxvY2siLCJydW4iLCIkY29tcGlsZSIsIiRyb290U2NvcGUiLCJkb2N1bWVudCIsInJlYWR5U3RhdGUiLCJhZGRFdmVudExpc3RlbmVyIiwiYm9keSIsImFwcGVuZENoaWxkIiwiY3JlYXRlRWxlbWVudCIsIkVycm9yIiwiJG9uIiwiaW5pdEFuZ3VsYXJNb2R1bGUiLCJ2YWx1ZSIsIiRvbnNlbiIsIiRxIiwiX29uc2VuU2VydmljZSIsIl9xU2VydmljZSIsIndpbmRvdyIsImNvbnNvbGUiLCJhbGVydCIsImluaXRUZW1wbGF0ZUNhY2hlIiwiJHRlbXBsYXRlQ2FjaGUiLCJfaW50ZXJuYWwiLCJnZXRUZW1wbGF0ZUhUTUxBc3luYyIsInBhZ2UiLCJjYWNoZSIsImdldCIsIlByb21pc2UiLCJyZXNvbHZlIiwiaW5pdE9uc2VuRmFjYWRlIiwiY29tcG9uZW50QmFzZSIsImJvb3RzdHJhcCIsImRlcHMiLCJpc0FycmF5IiwidW5kZWZpbmVkIiwiY29uY2F0IiwiZG9jIiwiZG9jdW1lbnRFbGVtZW50IiwiZmluZFBhcmVudENvbXBvbmVudFVudGlsIiwiZG9tIiwiZWxlbWVudCIsIkhUTUxFbGVtZW50IiwidGFyZ2V0IiwiaW5oZXJpdGVkRGF0YSIsImZpbmRDb21wb25lbnQiLCJzZWxlY3RvciIsInF1ZXJ5U2VsZWN0b3IiLCJkYXRhIiwibm9kZU5hbWUiLCJ0b0xvd2VyQ2FzZSIsImNvbXBpbGUiLCJzY29wZSIsIl9nZXRPbnNlblNlcnZpY2UiLCJfd2FpdERpcmV0aXZlSW5pdCIsImVsZW1lbnROYW1lIiwibGFzdFJlYWR5IiwiY2FsbGJhY2siLCJsaXN0ZW4iLCJyZW1vdmVFdmVudExpc3RlbmVyIiwiY3JlYXRlRWxlbWVudE9yaWdpbmFsIiwidGVtcGxhdGUiLCJvcHRpb25zIiwibGluayIsInBhcmVudFNjb3BlIiwiJG5ldyIsIiRldmFsQXN5bmMiLCJnZXRTY29wZSIsImUiLCJ0YWdOYW1lIiwicmVzdWx0IiwiYXBwZW5kIiwidGhlbiIsInJlc29sdmVMb2FkaW5nUGxhY2Vob2xkZXIiLCJyZXNvbHZlTG9hZGluZ1BsYWNlaG9sZGVyT3JpZ2luYWwiLCJkb25lIiwic2V0SW1tZWRpYXRlIiwiX3NldHVwTG9hZGluZ1BsYWNlSG9sZGVycyIsImZhY3RvcnkiLCJBY3Rpb25TaGVldFZpZXciLCJhdHRycyIsIl9zY29wZSIsIl9lbGVtZW50IiwiX2F0dHJzIiwiX2NsZWFyRGVyaXZpbmdNZXRob2RzIiwiZGVyaXZlTWV0aG9kcyIsIl9jbGVhckRlcml2aW5nRXZlbnRzIiwiZGVyaXZlRXZlbnRzIiwiZGV0YWlsIiwiYWN0aW9uU2hlZXQiLCJiaW5kIiwiX2Rlc3Ryb3kiLCJlbWl0IiwicmVtb3ZlIiwibWl4aW4iLCJkZXJpdmVQcm9wZXJ0aWVzRnJvbUVsZW1lbnQiLCJBbGVydERpYWxvZ1ZpZXciLCJhbGVydERpYWxvZyIsIkNhcm91c2VsVmlldyIsImNhcm91c2VsIiwiRGlhbG9nVmlldyIsImRpYWxvZyIsIkZhYlZpZXciLCJHZW5lcmljVmlldyIsInNlbGYiLCJkaXJlY3RpdmVPbmx5IiwibW9kaWZpZXJUZW1wbGF0ZSIsImFkZE1vZGlmaWVyTWV0aG9kcyIsImFkZE1vZGlmaWVyTWV0aG9kc0ZvckN1c3RvbUVsZW1lbnRzIiwiY2xlYW5lciIsIm9uRGVzdHJveSIsIl9ldmVudHMiLCJyZW1vdmVNb2RpZmllck1ldGhvZHMiLCJjbGVhckNvbXBvbmVudCIsInJlZ2lzdGVyIiwidmlldyIsInZpZXdLZXkiLCJkZWNsYXJlVmFyQXR0cmlidXRlIiwiZGVzdHJveSIsIm5vb3AiLCJkaXJlY3RpdmVBdHRyaWJ1dGVzIiwiQW5ndWxhckxhenlSZXBlYXREZWxlZ2F0ZSIsInVzZXJEZWxlZ2F0ZSIsInRlbXBsYXRlRWxlbWVudCIsIl9wYXJlbnRTY29wZSIsImZvckVhY2giLCJyZW1vdmVBdHRyaWJ1dGUiLCJhdHRyIiwiX2xpbmtlciIsImNsb25lTm9kZSIsIml0ZW0iLCJfdXNlckRlbGVnYXRlIiwiY29uZmlndXJlSXRlbVNjb3BlIiwiRnVuY3Rpb24iLCJkZXN0cm95SXRlbVNjb3BlIiwiY3JlYXRlSXRlbUNvbnRlbnQiLCJpbmRleCIsIl9wcmVwYXJlSXRlbUVsZW1lbnQiLCJfYWRkU3BlY2lhbFByb3BlcnRpZXMiLCJfdXNpbmdCaW5kaW5nIiwiY2xvbmVkIiwiaSIsImxhc3QiLCJjb3VudEl0ZW1zIiwiJGRlc3Ryb3kiLCJMYXp5UmVwZWF0RGVsZWdhdGUiLCJMYXp5UmVwZWF0VmlldyIsImxpbmtlciIsIiRldmFsIiwib25zTGF6eVJlcGVhdCIsImludGVybmFsRGVsZWdhdGUiLCJfcHJvdmlkZXIiLCJMYXp5UmVwZWF0UHJvdmlkZXIiLCJwYXJlbnROb2RlIiwicmVmcmVzaCIsIiR3YXRjaCIsIl9vbkNoYW5nZSIsIiRwYXJzZSIsIk1vZGFsVmlldyIsIm1vZGFsIiwiTmF2aWdhdG9yVmlldyIsIl9wcmV2aW91c1BhZ2VTY29wZSIsIl9ib3VuZE9uUHJlcG9wIiwiX29uUHJlcG9wIiwib24iLCJuYXZpZ2F0b3IiLCJldmVudCIsInBhZ2VzIiwibGVuZ3RoIiwib2ZmIiwiUGFnZVZpZXciLCJfY2xlYXJMaXN0ZW5lciIsImRlZmluZVByb3BlcnR5Iiwib25EZXZpY2VCYWNrQnV0dG9uIiwiX3VzZXJCYWNrQnV0dG9uSGFuZGxlciIsIl9lbmFibGVCYWNrQnV0dG9uSGFuZGxlciIsIm5nRGV2aWNlQmFja0J1dHRvbiIsIm5nSW5maW5pdGVTY3JvbGwiLCJvbkluZmluaXRlU2Nyb2xsIiwiX29uRGV2aWNlQmFja0J1dHRvbiIsIiRldmVudCIsImxhc3RFdmVudCIsIlBvcG92ZXJWaWV3IiwicG9wb3ZlciIsIlB1bGxIb29rVmlldyIsInB1bGxIb29rIiwib25BY3Rpb24iLCJuZ0FjdGlvbiIsIiRkb25lIiwiU3BlZWREaWFsVmlldyIsIlNwbGl0dGVyQ29udGVudCIsImxvYWQiLCJfcGFnZVNjb3BlIiwiU3BsaXR0ZXJTaWRlIiwic2lkZSIsIlNwbGl0dGVyIiwicHJvcCIsIlN3aXRjaFZpZXciLCJfY2hlY2tib3giLCJfcHJlcGFyZU5nTW9kZWwiLCJuZ01vZGVsIiwic2V0IiwiYXNzaWduIiwiJHBhcmVudCIsImNoZWNrZWQiLCJuZ0NoYW5nZSIsIlRhYmJhclZpZXciLCJUb2FzdFZpZXciLCJ0b2FzdCIsImRpcmVjdGl2ZSIsImZpcmVDb21wb25lbnRFdmVudCIsInJlZ2lzdGVyRXZlbnRIYW5kbGVycyIsIkNvbXBvbmVudENsZWFuZXIiLCJjb250cm9sbGVyIiwidHJhbnNjbHVkZSIsImJhY2tCdXR0b24iLCJuZ0NsaWNrIiwib25DbGljayIsImRlc3Ryb3lTY29wZSIsImRlc3Ryb3lBdHRyaWJ1dGVzIiwiYnV0dG9uIiwiZGlzYWJsZWQiLCIkbGFzdCIsInV0aWwiLCJmaW5kUGFyZW50IiwiX3N3aXBlciIsImhhc0F0dHJpYnV0ZSIsImVsIiwib25DaGFuZ2UiLCJpc1JlYWR5IiwiJGJyb2FkY2FzdCIsImZhYiIsIkVWRU5UUyIsInNwbGl0Iiwic2NvcGVEZWYiLCJyZWR1Y2UiLCJkaWN0IiwidGl0bGl6ZSIsInN0ciIsImNoYXJBdCIsInRvVXBwZXJDYXNlIiwic2xpY2UiLCJfIiwiaGFuZGxlciIsInR5cGUiLCJnZXN0dXJlRGV0ZWN0b3IiLCJfZ2VzdHVyZURldGVjdG9yIiwiam9pbiIsImljb24iLCJpbmRleE9mIiwiJG9ic2VydmUiLCJfdXBkYXRlIiwiJG9uc0dsb2JhbCIsImNzcyIsInVwZGF0ZSIsIm9yaWVudGF0aW9uIiwidXNlck9yaWVudGF0aW9uIiwib25zSWZPcmllbnRhdGlvbiIsImdldExhbmRzY2FwZU9yUG9ydHJhaXQiLCJpc1BvcnRyYWl0IiwicGxhdGZvcm0iLCJnZXRQbGF0Zm9ybVN0cmluZyIsInVzZXJQbGF0Zm9ybSIsInVzZXJQbGF0Zm9ybXMiLCJvbnNJZlBsYXRmb3JtIiwidHJpbSIsInVzZXJBZ2VudCIsIm1hdGNoIiwiaXNPcGVyYSIsIm9wZXJhIiwiaXNGaXJlZm94IiwiSW5zdGFsbFRyaWdnZXIiLCJpc1NhZmFyaSIsInRvU3RyaW5nIiwiY2FsbCIsImlzRWRnZSIsImlzQ2hyb21lIiwiY2hyb21lIiwiaXNJRSIsImRvY3VtZW50TW9kZSIsIm9uSW5wdXQiLCJOdW1iZXIiLCJjb21waWxlRnVuY3Rpb24iLCJzaG93IiwiZGlzcFNob3ciLCJkaXNwSGlkZSIsIm9uU2hvdyIsIm9uSGlkZSIsIm9uSW5pdCIsInZpc2libGUiLCJzb2Z0d2FyZUtleWJvYXJkIiwiX3Zpc2libGUiLCJsYXp5UmVwZWF0Iiwib25zTG9hZGluZ1BsYWNlaG9sZGVyIiwiX3Jlc29sdmVMb2FkaW5nUGxhY2Vob2xkZXIiLCJjb250ZW50RWxlbWVudCIsImVsZW1lbnRzIiwiTmF2aWdhdG9yIiwicmV3cml0YWJsZXMiLCJyZWFkeSIsInBhZ2VMb2FkZXIiLCJjcmVhdGVQYWdlTG9hZGVyIiwiZmlyZVBhZ2VJbml0RXZlbnQiLCJmIiwiaXNBdHRhY2hlZCIsImZpcmVBY3R1YWxQYWdlSW5pdEV2ZW50IiwiY3JlYXRlRXZlbnQiLCJpbml0RXZlbnQiLCJkaXNwYXRjaEV2ZW50IiwicG9zdExpbmsiLCJzcGVlZERpYWwiLCJzcGxpdHRlciIsIm5nQ29udHJvbGxlciIsInN3aXRjaFZpZXciLCJUYWJiYXIiLCJ0YWJiYXJWaWV3IiwidGFiIiwiY29udGVudCIsImh0bWwiLCJwdXQiLCJ0b29sYmFyQnV0dG9uIiwiJHdpbmRvdyIsIiRjYWNoZUZhY3RvcnkiLCIkZG9jdW1lbnQiLCIkaHR0cCIsImNyZWF0ZU9uc2VuU2VydmljZSIsIk1vZGlmaWVyVXRpbCIsIl91dGlsIiwiZGJiRGlzcGF0Y2hlciIsIl9kZWZhdWx0RGV2aWNlQmFja0J1dHRvbkhhbmRsZXIiLCJtZXRob2ROYW1lcyIsIm1ldGhvZE5hbWUiLCJrbGFzcyIsInByb3BlcnRpZXMiLCJwcm9wZXJ0eSIsImV2ZW50TmFtZXMiLCJtYXAiLCJsaXN0ZW5lcnMiLCJldmVudE5hbWUiLCJsaXN0ZW5lciIsInB1c2giLCJfY29uZmlnIiwiYXV0b1N0YXR1c0JhckZpbGwiLCJzaG91bGRGaWxsU3RhdHVzQmFyIiwicGFnZUVsZW1lbnQiLCJwYWdlU2NvcGUiLCJQYWdlTG9hZGVyIiwicGFyZW50IiwiZ2V0UGFnZUhUTUxBc3luYyIsImNvbXBpbGVBbmRMaW5rIiwicGFyYW1zIiwiZGVzdHJveUVsZW1lbnQiLCJkZWZlcnJlZCIsImRlZmVyIiwibm9ybWFsaXplUGFnZUhUTUwiLCJwcm9taXNlIiwicmVzcG9uc2UiLCJtb2RpZmllcnMiLCJhdHRyTW9kaWZpZXJzIiwibW9kaWZpZXIiLCJyZXBsYWNlIiwibWV0aG9kcyIsIm5lZWRsZSIsInRva2VucyIsInNvbWUiLCJmaWx0ZXIiLCJ0b2tlbiIsImhhc01vZGlmaWVyIiwicmVtb3ZlTW9kaWZpZXIiLCJhZGRNb2RpZmllciIsIm1ldGhvZCIsIl90ciIsImZucyIsImhhc0NsYXNzIiwicmVtb3ZlQ2xhc3MiLCJhZGRDbGFzcyIsImNsYXNzZXMiLCJwYXR0IiwiY2xzIiwib2xkRm4iLCJuZXdGbiIsInNldE1vZGlmaWVyIiwidG9nZ2xlTW9kaWZpZXIiLCJvYmplY3QiLCJ2YXIiLCJ2YXJOYW1lIiwiX2RlZmluZVZhciIsImNvbXBvbmVudCIsImNhcGl0YWxpemVkRXZlbnROYW1lIiwibCIsIl9yZWdpc3RlckV2ZW50SGFuZGxlciIsImlzV2ViVmlldyIsInVhIiwicGFyc2VGbG9hdCIsImtleSIsIm5hbWVzIiwiY29udGFpbmVyIiwiY2hpbGRyZW4iLCJkZWNvbXBvc2VOb2RlIiwiJCRlbGVtZW50IiwiJCRvYnNlcnZlcnMiLCIkJGxpc3RlbmVycyIsIiQkd2F0Y2hlcnMiLCJjbGVhciIsIm5nRXZlbnREaXJlY3RpdmVzIiwiZGlyZWN0aXZlTmFtZSIsImRpcmVjdGl2ZU5vcm1hbGl6ZSIsIiRlbGVtZW50IiwiJGFwcGx5IiwibWF0Y2hlcyIsImNvbmZpZyIsIiRwcm92aWRlIiwic2hpZnQiLCIkZGVsZWdhdGUiLCJrZXlzIiwiZGVjb3JhdG9yIiwialF1ZXJ5Iiwid2FybiIsIm5vdGlmaWNhdGlvbiIsIm9yaWdpbmFsTm90aWZpY2F0aW9uIiwibWVzc2FnZSIsImluamVjdG9yIiwidGVtcGxhdGVzIiwicXVlcnlTZWxlY3RvckFsbCIsImlkIiwidGV4dCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFBQTs7Ozs7QUFLQSxDQUFDLFlBQVc7OztNQUVOQSxTQUFTLE1BQU1DLElBQU4sQ0FBVyxZQUFVOztHQUFyQixJQUErQixZQUEvQixHQUE4QyxJQUEzRDs7O1dBR1NDLFNBQVQsR0FBb0I7OztZQUdWQyxNQUFWLEdBQW1CLFVBQVNDLEtBQVQsRUFBZ0I7UUFDN0JDLFNBQVMsS0FBS0MsU0FBbEI7Ozs7UUFJSUMsUUFBUUMsT0FBT0MsTUFBUCxDQUFjSixNQUFkLENBQVo7OztTQUdLLElBQUlLLElBQVQsSUFBaUJOLEtBQWpCLEVBQXdCOztZQUVoQk0sSUFBTixJQUFjLE9BQU9OLE1BQU1NLElBQU4sQ0FBUCxLQUF1QixVQUF2QixJQUNaLE9BQU9MLE9BQU9LLElBQVAsQ0FBUCxJQUF1QixVQURYLElBQ3lCVixPQUFPQyxJQUFQLENBQVlHLE1BQU1NLElBQU4sQ0FBWixDQUR6QixHQUVULFVBQVNBLElBQVQsRUFBZUMsRUFBZixFQUFrQjtlQUNWLFlBQVc7Y0FDWkMsTUFBTSxLQUFLUCxNQUFmOzs7O2VBSUtBLE1BQUwsR0FBY0EsT0FBT0ssSUFBUCxDQUFkOzs7O2NBSUlHLE1BQU1GLEdBQUdHLEtBQUgsQ0FBUyxJQUFULEVBQWVDLFNBQWYsQ0FBVjtlQUNLVixNQUFMLEdBQWNPLEdBQWQ7O2lCQUVPQyxHQUFQO1NBWkY7T0FERixDQWVHSCxJQWZILEVBZVNOLE1BQU1NLElBQU4s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
